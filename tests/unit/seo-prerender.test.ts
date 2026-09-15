import assert from 'node:assert/strict';
import test from 'node:test';
import { siteEssayNotes, wikiEntries } from '../../generated/content.ts';
import { OG_IMAGES, ROUTE_SEO, SITE_CONTENT_LASTMOD } from '../../seo-routes.ts';
import {
  buildStaticJsonLd,
  getStaticRouteContent,
  routeDates,
  routeLastmod,
  routeOgImage,
  routeOgType,
} from '../../seo-prerender.ts';

const SITE = 'https://eden-tan.com';
const route = (path: string) => {
  const found = ROUTE_SEO.find((entry) => entry.path === path);
  assert.ok(found, `${path} is registered`);
  return found;
};
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

test('notes and wiki dates come from Markdown frontmatter, not the site-level date', () => {
  const essay = siteEssayNotes.find((entry) => entry.slug === 'turn-chaos-into-systems');
  assert.ok(essay);
  assert.deepEqual(routeDates(route('/notes/turn-chaos-into-systems')), {
    published: essay.datePublished,
    modified: essay.dateModified,
  });
  const wiki = wikiEntries.find((entry) => entry.slug === 'vite');
  assert.ok(wiki);
  assert.equal(routeLastmod(route('/wiki/vite')), wiki.dateModified);
});

test('hub routes are as fresh as their newest child', () => {
  const newestEssay = siteEssayNotes.map((entry) => entry.dateModified).sort().at(-1);
  assert.equal(routeLastmod(route('/notes')), newestEssay);
  const newestWiki = wikiEntries.map((entry) => entry.dateModified).sort().at(-1);
  assert.equal(routeLastmod(route('/wiki')), newestWiki);
});

test('every route resolves to ordered ISO dates and the sitemap is not stuck on one date', () => {
  const lastmods = new Set<string>();
  for (const entry of ROUTE_SEO) {
    const dates = routeDates(entry);
    assert.match(dates.published, isoDate, `${entry.path} published`);
    assert.match(dates.modified, isoDate, `${entry.path} modified`);
    assert.ok(dates.modified >= dates.published, `${entry.path} modified >= published`);
    assert.ok(dates.modified <= SITE_CONTENT_LASTMOD, `${entry.path} modified <= SITE_CONTENT_LASTMOD`);
    if (entry.sitemap !== false) lastmods.add(dates.modified);
  }
  assert.ok(lastmods.size > 1, 'lastmod varies across sitemap routes');
});

test('article JSON-LD carries datePublished and dateModified', () => {
  const graph = buildStaticJsonLd(route('/notes/what-is-wealth'), 'en', SITE)['@graph'];
  const article = graph.find((node) => node['@type'] === 'BlogPosting');
  assert.ok(article);
  const dates = routeDates(route('/notes/what-is-wealth'));
  assert.equal(article.datePublished, dates.published);
  assert.equal(article.dateModified, dates.modified);
  assert.equal(article.image, `${SITE}/${OG_IMAGES['notes-finance'].file}`);
});

test('share type and image follow the route family', () => {
  assert.equal(routeOgType(route('/notes/what-is-wealth')), 'article');
  assert.equal(routeOgType(route('/wiki/vite')), 'article');
  assert.equal(routeOgType(route('/poker')), 'website');
  assert.equal(routeOgType(route('/')), 'website');
  assert.equal(routeOgImage(route('/poker'), 'en', SITE).url, `${SITE}/og/poker.jpg`);
  assert.equal(routeOgImage(route('/'), 'zh', SITE).url, `${SITE}/og-image.jpg`);
  assert.equal(routeOgImage(route('/wiki/vite'), 'en', SITE).alt, OG_IMAGES.poker.alt.en);
});

test('indexable project pages no longer share one static template', () => {
  const seen = new Map<string, string>();
  for (const entry of ROUTE_SEO.filter((item) => item.index !== false)) {
    for (const language of ['en', 'zh'] as const) {
      const content = getStaticRouteContent(entry, language);
      const key = `${language}:${content.sections.map((section) => section.title).sort().join('|')}`;
      assert.ok(!seen.has(key), `${entry.path} (${language}) repeats the H2 set of ${seen.get(key)}`);
      seen.set(key, entry.path);
      if (entry.path.startsWith('/wiki/')) continue; // bullet-style skill notes are short by design
      const body = content.sections.flatMap((section) => section.paragraphs).join(' ');
      assert.ok(body.length >= (language === 'zh' ? 150 : 500), `${entry.path} (${language}) body is ${body.length} chars`);
    }
  }
});
