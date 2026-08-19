import { ROUTE_SEO, SITE_CONTENT_LASTMOD } from '../../seo-routes.ts';
import { exists, fail, pass, read } from './lib.mjs';

const app = read('App.tsx');
const readme = read('README.md');
const seen = new Set();
const problems = [];

function hasImplementedRoute(route) {
  if (route === '/') return true;
  if (route.startsWith('/notes/')) {
    return exists(`wiki/essays/${route.slice('/notes/'.length)}.md`);
  }
  if (route.startsWith('/wiki/')) {
    return exists(`wiki/pages/${route.slice('/wiki/'.length)}.md`);
  }
  if (route.startsWith('/archive/')) {
    return app.includes(`slug: '${route.slice('/archive/'.length)}'`);
  }
  return app.includes(`pathWithoutBase === '${route}'`);
}

function hasReadmeRoute(route) {
  if (route.startsWith('/notes/')) return readme.includes('`/notes/:slug`');
  if (route.startsWith('/archive/')) return readme.includes('`/archive/:slug`');
  return readme.includes(`\`${route}\``);
}

for (const route of ROUTE_SEO) {
  if (seen.has(route.path)) problems.push(`Duplicate route registry path: ${route.path}`);
  seen.add(route.path);

  if (route.index === false && route.sitemap !== false) {
    problems.push(`${route.path} is noindex but is still eligible for the sitemap`);
  }
  if (route.title.en.length > 60) {
    problems.push(`${route.path} English title exceeds 60 characters (${route.title.en.length})`);
  }
  if (route.desc.en.length > 160) {
    problems.push(`${route.path} English description exceeds 160 characters (${route.desc.en.length})`);
  }
  if (!hasImplementedRoute(route.path)) {
    problems.push(`${route.path} is registered but no matching App.tsx route/data entry was found`);
  }
  if (!hasReadmeRoute(route.path)) {
    problems.push(`${route.path} is registered but not documented in README.md`);
  }
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(SITE_CONTENT_LASTMOD)) {
  problems.push('SITE_CONTENT_LASTMOD must be an ISO date');
}

const registeredPaths = new Set(ROUTE_SEO.map((route) => route.path));
const allowedAliases = new Set(['/analog-tech']);
for (const match of app.matchAll(/pathWithoutBase\s*===\s*'([^']+)'/g)) {
  if (!registeredPaths.has(match[1]) && !allowedAliases.has(match[1])) {
    problems.push(`${match[1]} is implemented in App.tsx but missing from seo-routes.ts`);
  }
}

for (const [directory, prefix] of [['wiki/pages', '/wiki/'], ['wiki/essays', '/notes/']]) {
  const marker = `${directory}/`;
  for (const route of ROUTE_SEO.filter((entry) => entry.path.startsWith(prefix))) {
    const expectedFile = `${marker}${route.path.slice(prefix.length)}.md`;
    if (!exists(expectedFile)) problems.push(`${route.path} has no Markdown source ${expectedFile}`);
  }
}

for (const match of readme.matchAll(/`(\.github\/workflows\/[^`]+\.ya?ml)`/g)) {
  if (!exists(match[1])) problems.push(`README.md points to missing workflow ${match[1]}`);
}

if (problems.length > 0) fail('Route/documentation contract failed:', problems);
else pass(`${ROUTE_SEO.length} route contracts are implemented and documented`);
