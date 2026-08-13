import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { ROUTE_SEO } from '../../seo-routes.ts';
import { exists, fail, pass, root } from './lib.mjs';

const problems = [];
const required = [
  'dist/index.html',
  'dist/404.html',
  'dist/operator-menu.html',
  'dist/sitemap.xml',
  'dist/robots.txt',
  'dist/site.webmanifest',
  'dist/film-gallery.webmanifest',
  'dist/conway.webmanifest',
  'dist/sw.js',
];

for (const file of required) {
  if (!exists(file)) problems.push(`Missing build artifact ${file}`);
}

if (problems.length === 0) {
  const html = readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  const operatorMenu = readFileSync(path.join(root, 'dist/operator-menu.html'), 'utf8');
  const redirect = readFileSync(path.join(root, 'dist/404.html'), 'utf8');
  const sitemap = readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8');
  const assets = new Set(readdirSync(path.join(root, 'dist/assets')));

  for (const match of html.matchAll(/(?:src|href)="\/assets\/([^"?#]+)[^" ]*"/g)) {
    if (!assets.has(match[1])) problems.push(`index.html references missing asset ${match[1]}`);
  }
  if (redirect.includes('__PATH_SEGMENTS_TO_KEEP__')) {
    problems.push('dist/404.html still contains its unresolved path placeholder');
  }
  for (const command of ['npm run task:new', 'npm run ready', 'npm run publish']) {
    if (!operatorMenu.includes(command)) problems.push(`operator-menu.html is missing ${command}`);
  }
  for (const route of ROUTE_SEO.filter((entry) => entry.sitemap !== false)) {
    const expected = route.path === '/' ? 'https://edentan.site/' : `https://edentan.site${route.path}`;
    if (!sitemap.includes(`<loc>${expected}</loc>`)) {
      problems.push(`sitemap.xml is missing ${route.path}`);
    }
  }
  for (const manifest of ['site.webmanifest', 'film-gallery.webmanifest', 'conway.webmanifest']) {
    try {
      JSON.parse(readFileSync(path.join(root, 'dist', manifest), 'utf8'));
    } catch {
      problems.push(`${manifest} is not valid JSON`);
    }
  }
}

if (problems.length > 0) fail('Built-site smoke check failed:', problems);
else pass('Production artifacts, assets, manifests, redirect, and sitemap passed smoke checks');
