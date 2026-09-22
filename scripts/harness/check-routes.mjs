import { OG_IMAGES, ROUTE_SEO, SITE_CONTENT_LASTMOD } from '../../seo-routes.ts';
import { ROUTE_STATIC_COPY } from '../../seo-static-content.ts';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { exists, fail, pass, read, root } from './lib.mjs';

// Route branches stay in App.tsx; archive entries are data in pages/archived-works.ts.
const app = read('App.tsx');
const archivedWorks = read('pages/archived-works.ts');
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
    return archivedWorks.includes(`slug: '${route.slice('/archive/'.length)}'`);
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
    problems.push(`${route.path} is registered but no matching App.tsx route branch or pages/archived-works.ts entry was found`);
  }
  if (!hasReadmeRoute(route.path)) {
    problems.push(`${route.path} is registered but not documented in README.md`);
  }
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
if (!isoDate.test(SITE_CONTENT_LASTMOD)) {
  problems.push('SITE_CONTENT_LASTMOD must be an ISO date');
}

for (const route of ROUTE_SEO) {
  const isContentRoute = route.path.startsWith('/wiki/') || route.path.startsWith('/notes/');
  for (const field of ['datePublished', 'dateModified']) {
    if (route[field] !== undefined && !isoDate.test(route[field])) {
      problems.push(`${route.path} ${field} must be an ISO date`);
    }
  }
  if (isContentRoute && (route.datePublished || route.dateModified)) {
    problems.push(`${route.path} takes its dates from Markdown frontmatter; remove datePublished/dateModified from the registry`);
  }
  if (!isContentRoute && !route.datePublished) {
    problems.push(`${route.path} needs a datePublished in seo-routes.ts`);
  }
  if (route.datePublished && route.dateModified && route.dateModified < route.datePublished) {
    problems.push(`${route.path} dateModified is earlier than datePublished`);
  }
  if (route.dateModified && route.dateModified > SITE_CONTENT_LASTMOD) {
    problems.push(`${route.path} dateModified ${route.dateModified} is newer than SITE_CONTENT_LASTMOD ${SITE_CONTENT_LASTMOD}; bump the site date`);
  }
  if (route.og && !OG_IMAGES[route.og]) problems.push(`${route.path} references unknown share image ${route.og}`);
  const hasOwnStaticBody = ['/wiki', '/notes', '/conways-game-of-life'].includes(route.path);
  if (!isContentRoute && !hasOwnStaticBody && route.index !== false && !ROUTE_STATIC_COPY[route.path]) {
    problems.push(`${route.path} is indexable but has no entry in seo-static-content.ts`);
  }
}

for (const [key, image] of Object.entries(OG_IMAGES)) {
  if (!exists(`public/${image.file}`)) problems.push(`share image ${key} is missing public/${image.file}`);
}
for (const routePath of Object.keys(ROUTE_STATIC_COPY)) {
  if (!ROUTE_SEO.some((route) => route.path === routePath)) {
    problems.push(`seo-static-content.ts has copy for unregistered route ${routePath}`);
  }
}

const registeredPaths = new Set(ROUTE_SEO.map((route) => route.path));
const allowedAliases = new Set(['/analog-tech']);
for (const match of app.matchAll(/pathWithoutBase\s*===\s*'([^']+)'/g)) {
  if (!registeredPaths.has(match[1]) && !allowedAliases.has(match[1])) {
    problems.push(`${match[1]} is implemented in App.tsx but missing from seo-routes.ts`);
  }
}

// Each route page in pages/*.tsx is its own lazy chunk. A page importing another page would
// merge the two chunks, and nothing live may import the unrouted pages/legacy/ files.
const pageComponentFiles = new Set(
  readdirSync(path.join(root, 'pages')).filter((file) => file.endsWith('.tsx')).map((file) => file.replace(/\.tsx$/, '')),
);
for (const file of ['App.tsx', ...[...pageComponentFiles].map((name) => `pages/${name}.tsx`)]) {
  for (const match of read(file).matchAll(/from '([^']+)'|import\('([^']+)'\)/g)) {
    const specifier = match[1] ?? match[2];
    if (specifier.includes('legacy/')) problems.push(`${file} imports unrouted legacy module ${specifier}`);
    if (file.startsWith('pages/') && specifier.startsWith('./') && pageComponentFiles.has(specifier.slice(2))) {
      problems.push(`${file} imports page module ${specifier}; move the shared piece into app/ or a pages/*.ts data file`);
    }
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
