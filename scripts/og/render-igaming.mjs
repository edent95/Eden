#!/usr/bin/env node
/**
 * Renders one 1200×630 share card per /igaming route into public/og/igaming/<key>.jpg.
 *
 *   npm run og:igaming                 # every card
 *   npm run og:igaming -- provider     # only keys containing "provider"
 *
 * Starts this repo's Vite dev server on a free port (never 4180, so a running
 * `npm run dev` is untouched), opens scripts/og/igaming-card.html?route=… in the
 * local Chrome, headless, one process per card that exits by itself, then converts
 * the PNG to JPEG with macOS `sips`. Reduced motion is forced so every animated
 * layer sits on its still frame. Run it again whenever an /igaming title changes.
 * The JPEGs are committed; CI never runs this script.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { createServer as createNetServer } from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

// Async on purpose: a sync spawn would freeze this process's event loop, and with it
// the Vite server Chrome is loading the card from.
const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const outDir = path.join(root, 'public/og/igaming');
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome}; set CHROME_PATH.`);
  process.exit(1);
}

const { ROUTE_SEO } = await import(path.join(root, 'seo-routes.ts'));
const filter = process.argv[2] ?? '';
const cards = ROUTE_SEO
  .filter((route) => typeof route.og === 'string' && route.og.startsWith('igaming'))
  .filter((route) => route.og.includes(filter));
if (!cards.length) {
  console.error(`No /igaming share cards match "${filter}".`);
  process.exit(1);
}

const freePort = () => new Promise((resolve, reject) => {
  const probe = createNetServer();
  probe.once('error', reject);
  probe.listen(0, '127.0.0.1', () => {
    const { port } = probe.address();
    probe.close(() => resolve(port));
  });
});

const port = await freePort();
const server = await createServer({
  root,
  configFile: path.join(root, 'vite.config.ts'),
  server: { host: '127.0.0.1', port, strictPort: true, open: false, hmr: false },
  logLevel: 'warn',
});
await server.listen();
const work = mkdtempSync(path.join(tmpdir(), 'eden-og-'));
mkdirSync(outDir, { recursive: true });

try {
  for (const route of cards) {
    const url = `http://127.0.0.1:${port}/scripts/og/igaming-card.html?route=${encodeURIComponent(route.path)}`;
    const png = path.join(work, `${route.og}.png`);
    const jpg = path.join(outDir, `${route.og}.jpg`);
    await run(chrome, [
      '--headless=new',
      `--user-data-dir=${path.join(work, 'profile')}`,
      '--no-first-run',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--force-prefers-reduced-motion',
      '--window-size=1200,630',
      '--virtual-time-budget=12000',
      `--screenshot=${png}`,
      url,
    ], { timeout: 90_000 });
    await run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '86', png, '--out', jpg]);
    console.log(`✓ ${path.relative(root, jpg)}  ←  ${route.path}`);
  }
} finally {
  await server.close();
  rmSync(work, { recursive: true, force: true });
}
