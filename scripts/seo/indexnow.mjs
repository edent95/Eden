#!/usr/bin/env node
/**
 * IndexNow: tell Bing (and the other IndexNow engines) which URLs just changed.
 *
 * Runs in deploy.yml after GitHub Pages is live. It reads the *live* sitemap.xml,
 * keeps the URLs whose <lastmod> is within the last few days (Asia/Kuala_Lumpur),
 * and POSTs them to api.indexnow.org. `--all` submits every sitemap URL (use once
 * after setup, or via the workflow_dispatch input). `--dry-run` prints, sends nothing.
 *
 * The key is public by design: IndexNow proves ownership by fetching
 * https://eden-tan.com/<key>.txt, which lives in public/.
 */

export const INDEXNOW_KEY = 'af44999cbbdceebf567cd94d54165943';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** Parse <url><loc>…</loc><lastmod>…</lastmod></url> blocks from a sitemap. */
export function parseSitemap(xml) {
  const out = [];
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? '';
    if (loc) out.push({ loc, lastmod });
  }
  return out;
}

/** YYYY-MM-DD in Kuala Lumpur, `daysAgo` days before `now`. */
export function klDate(now, daysAgo = 0) {
  const d = new Date(now.getTime() - daysAgo * 86_400_000);
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' });
}

export function selectUrls(entries, { all = false, since = '' } = {}) {
  const picked = all ? entries : entries.filter((e) => e.lastmod.slice(0, 10) >= since);
  return [...new Set(picked.map((e) => e.loc))];
}

async function fetchText(url, tries = 6) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) return await res.text();
      last = new Error(`${url} → HTTP ${res.status}`);
    } catch (err) {
      last = err;
    }
    await new Promise((r) => setTimeout(r, 10_000));
  }
  throw last;
}

async function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const dryRun = args.includes('--dry-run');
  const daysArg = args.find((a) => a.startsWith('--days='));
  const days = daysArg ? Number(daysArg.slice(7)) : 3;
  const site = (process.env.SITE_URL || 'https://eden-tan.com').replace(/\/$/, '');
  const host = new URL(site).host;
  const keyLocation = `${site}/${INDEXNOW_KEY}.txt`;

  // Pages may take a moment to serve the new build; wait until the key file answers.
  const key = (await fetchText(keyLocation)).trim();
  if (key !== INDEXNOW_KEY) throw new Error(`${keyLocation} does not contain the IndexNow key`);

  const entries = parseSitemap(await fetchText(`${site}/sitemap.xml`));
  const since = klDate(new Date(), days);
  const urlList = selectUrls(entries, { all, since }).slice(0, 10_000);
  console.log(`IndexNow: ${urlList.length}/${entries.length} sitemap URLs ${all ? '(all)' : `with lastmod >= ${since}`}`);
  for (const u of urlList) console.log(`  ${u}`);
  if (urlList.length === 0 || dryRun) return;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation, urlList }),
  });
  // 200 = accepted, 202 = accepted, key validation pending.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow → HTTP ${res.status} ${await res.text()}`);
  }
  console.log(`IndexNow → HTTP ${res.status}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
