import { ROUTE_SEO } from '../../seo-routes.ts';
import { exists, fail, pass, read } from './lib.mjs';

const app = read('App.tsx');
const readme = read('README.md');
const seen = new Set();
const problems = [];

function hasImplementedRoute(route) {
  if (route === '/') return true;
  if (route.startsWith('/notes/')) {
    return app.includes(`slug: '${route.slice('/notes/'.length)}'`);
  }
  if (route.startsWith('/wiki/')) {
    return app.includes(`slug: '${route.slice('/wiki/'.length)}'`);
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
  if (!hasImplementedRoute(route.path)) {
    problems.push(`${route.path} is registered but no matching App.tsx route/data entry was found`);
  }
  if (!hasReadmeRoute(route.path)) {
    problems.push(`${route.path} is registered but not documented in README.md`);
  }
}

for (const match of readme.matchAll(/`(\.github\/workflows\/[^`]+\.ya?ml)`/g)) {
  if (!exists(match[1])) problems.push(`README.md points to missing workflow ${match[1]}`);
}

if (problems.length > 0) fail('Route/documentation contract failed:', problems);
else pass(`${ROUTE_SEO.length} route contracts are implemented and documented`);
