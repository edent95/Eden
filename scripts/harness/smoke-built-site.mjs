import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import {
  localizedCanonicalRoutePath,
  ROUTE_SEO,
} from '../../seo-routes.ts';
import {
  routeDates,
  routeLastmod,
  routeOgImage,
  routeOgType,
  routeOutputPath,
} from '../../seo-prerender.ts';
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
  'dist/eden-home-app-icon.svg',
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
  const robots = readFileSync(path.join(root, 'dist/robots.txt'), 'utf8');
  const assets = new Set(readdirSync(path.join(root, 'dist/assets')));
  const staticHeadingSets = new Map();

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
  if (!robots.includes('Disallow: /*?p=')) {
    problems.push('robots.txt does not disallow the /?p= SPA shim');
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
      const dates = routeDates(route);
      const ogImage = routeOgImage(route, language, expectedSiteUrl);
      const ogType = routeOgType(route);
      if (!exists(`dist/${ogImage.file}`)) problems.push(`${artifact} points at a missing share image ${ogImage.file}`);
      if (!routeHtml.includes(`<meta property="og:image" content="${ogImage.url}" />`)) {
        problems.push(`${artifact} has the wrong og:image`);
      }
      if (!routeHtml.includes(`<meta property="og:type" content="${ogType}" />`)) {
        problems.push(`${artifact} has the wrong og:type`);
      }
      if (ogType === 'article') {
        if (!routeHtml.includes(`<meta property="article:published_time" content="${dates.published}" />`)) {
          problems.push(`${artifact} is missing article:published_time`);
        }
        if (!routeHtml.includes(`"datePublished":"${dates.published}"`)) {
          problems.push(`${artifact} JSON-LD is missing datePublished ${dates.published}`);
        }
      }
      if (!routeHtml.includes(`"dateModified":"${dates.modified}"`)) {
        problems.push(`${artifact} JSON-LD dateModified does not match ${dates.modified}`);
      }
      const staticBlock = routeHtml.match(/<div class="seo-prerender">([\s\S]*?)<\/div>\s*<\/div>/)?.[1] ?? '';
      const plainText = staticBlock.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      // Indexable routes must carry real substance; hidden utility routes only need the shell,
      // and Wiki skill notes are bullet-style by design.
      const minimumStaticCharacters = route.index === false || route.path.startsWith('/wiki/')
        ? (language === 'zh' ? 220 : 300)
        : (language === 'zh' ? 400 : 900);
      if (plainText.length < minimumStaticCharacters) {
        problems.push(`${artifact} static body is too thin (${plainText.length} characters)`);
      }
      if (route.index !== false) {
        const headings = [...staticBlock.matchAll(/<h2>([^<]*)<\/h2>/g)].map((match) => match[1]).sort().join(' | ');
        const duplicate = staticHeadingSets.get(`${language}:${headings}`);
        if (duplicate) {
          problems.push(`${artifact} repeats the static H2 template of ${duplicate}`);
        } else {
          staticHeadingSets.set(`${language}:${headings}`, artifact);
        }
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
  for (const route of ROUTE_SEO.filter((entry) => entry.sitemap !== false)) {
    for (const language of ['en', 'zh']) {
      const loc = `${expectedSiteUrl}${localizedCanonicalRoutePath(route.path, language)}`;
      const block = sitemap.match(new RegExp(`<loc>${loc.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}</loc>\\s*<lastmod>([^<]+)</lastmod>`));
      if (!block) problems.push(`sitemap.xml has no lastmod for ${loc}`);
      else if (block[1] !== routeLastmod(route)) {
        problems.push(`sitemap.xml lastmod for ${loc} is ${block[1]}, expected ${routeLastmod(route)}`);
      }
    }
  }
  if (new Set(sitemap.match(/<lastmod>[^<]+<\/lastmod>/g) ?? []).size < 2) {
    problems.push('sitemap.xml lastmod is identical on every URL; freshness must come from content');
  }
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
