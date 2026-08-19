import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { canonicalRoutePath, ROUTE_SEO } from '../../seo-routes.ts';
import { exists, fail, pass, root } from './lib.mjs';

const problems = [];
const expectedSiteUrl = 'https://eden-tan.com';
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

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function routeArtifact(route) {
  return route.path === '/'
    ? 'dist/index.html'
    : `dist/${route.path.slice(1)}/index.html`;
}

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
  if (!html.includes(`<meta property="og:image" content="${expectedSiteUrl}/og-image.jpg" />`)) {
    problems.push(`index.html OG image does not use ${expectedSiteUrl}`);
  }
  for (const route of ROUTE_SEO) {
    const artifact = routeArtifact(route);
    if (!exists(artifact)) {
      problems.push(`Missing static route artifact ${artifact}`);
      continue;
    }
    const routeHtml = readFileSync(path.join(root, artifact), 'utf8');
    const canonical = `${expectedSiteUrl}${canonicalRoutePath(route.path)}`;
    const expectedRobots = route.index === false
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    if (!routeHtml.includes('<html lang="en">') || routeHtml.includes('<html lang="en">>')) {
      problems.push(`${artifact} has a malformed html element`);
    }
    if (!routeHtml.includes(`<title>${escapeHtml(route.title.en)}</title>`)) {
      problems.push(`${artifact} has the wrong static title`);
    }
    if (!routeHtml.includes(`<meta name="description" content="${escapeHtml(route.desc.en)}" />`)) {
      problems.push(`${artifact} has the wrong static description`);
    }
    if (!routeHtml.includes(`<meta name="robots" content="${expectedRobots}" />`)) {
      problems.push(`${artifact} has the wrong static robots directive`);
    }
    if (!routeHtml.includes(`<link rel="canonical" href="${canonical}" />`)) {
      problems.push(`${artifact} has the wrong canonical URL`);
    }
    if (!routeHtml.includes(`<meta property="og:url" content="${canonical}" />`)) {
      problems.push(`${artifact} has the wrong static OG URL`);
    }
  }
  for (const route of ROUTE_SEO.filter((entry) => entry.sitemap !== false)) {
    const expected = `${expectedSiteUrl}${canonicalRoutePath(route.path)}`;
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
