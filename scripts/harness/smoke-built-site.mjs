import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import {
  localizedCanonicalRoutePath,
  ROUTE_SEO,
  SITE_CONTENT_LASTMOD,
} from '../../seo-routes.ts';
import { routeOutputPath } from '../../seo-prerender.ts';
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

function routeArtifact(route, language) {
  return `dist/${routeOutputPath(route, language)}`;
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
    for (const language of ['en', 'zh']) {
      const artifact = routeArtifact(route, language);
      if (!exists(artifact)) {
        problems.push(`Missing static route artifact ${artifact}`);
        continue;
      }
      const routeHtml = readFileSync(path.join(root, artifact), 'utf8');
      const canonical = `${expectedSiteUrl}${localizedCanonicalRoutePath(route.path, language)}`;
      const expectedRobots = route.index === false
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
      const expectedLang = language === 'zh' ? 'zh-Hans' : 'en';
      if (!routeHtml.includes(`<html lang="${expectedLang}">`) || routeHtml.includes(`<html lang="${expectedLang}">>`)) {
        problems.push(`${artifact} has a malformed html element`);
      }
      if (!routeHtml.includes(`<title>${escapeHtml(route.title[language])}</title>`)) {
        problems.push(`${artifact} has the wrong static title`);
      }
      if (!routeHtml.includes(`<meta name="description" content="${escapeHtml(route.desc[language])}" />`)) {
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
      for (const hreflang of ['en', 'zh-Hans', 'x-default']) {
        if (!routeHtml.includes(`rel="alternate" hreflang="${hreflang}"`)) {
          problems.push(`${artifact} is missing hreflang ${hreflang}`);
        }
      }
      if ((routeHtml.match(/<h1[\s>]/g) ?? []).length !== 1) {
        problems.push(`${artifact} must contain exactly one static h1`);
      }
      if (!routeHtml.includes('type="application/ld+json"') || !routeHtml.includes('BreadcrumbList')) {
        problems.push(`${artifact} is missing static JSON-LD or BreadcrumbList`);
      }
      const staticBlock = routeHtml.match(/<div class="seo-prerender">([\s\S]*?)<\/div>\s*<\/div>/)?.[1] ?? '';
      const plainText = staticBlock.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const minimumStaticCharacters = language === 'zh' ? 220 : 300;
      if (plainText.length < minimumStaticCharacters) {
        problems.push(`${artifact} static body is too thin (${plainText.length} characters)`);
      }
      if ((staticBlock.match(/<a\s+[^>]*href=/g) ?? []).length < 2) {
        problems.push(`${artifact} has fewer than two crawlable static links`);
      }
    }
  }
  for (const route of ROUTE_SEO.filter((entry) => entry.sitemap !== false)) {
    for (const language of ['en', 'zh']) {
      const expected = `${expectedSiteUrl}${localizedCanonicalRoutePath(route.path, language)}`;
      if (!sitemap.includes(`<loc>${expected}</loc>`)) {
        problems.push(`sitemap.xml is missing ${language} ${route.path}`);
      }
    }
  }
  if (!sitemap.includes(`<lastmod>${SITE_CONTENT_LASTMOD}</lastmod>`)) problems.push('sitemap.xml is missing accurate lastmod');
  if (!sitemap.includes('xmlns:xhtml=') || !sitemap.includes('hreflang="zh-Hans"')) {
    problems.push('sitemap.xml is missing language alternates');
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
