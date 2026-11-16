import assert from 'node:assert/strict';
import test from 'node:test';
import { siteEssayNotes, wikiEntries } from '../../generated/content.ts';
import { WIKI_INDEX, wikiTopics } from '../../components/wiki-content.ts';
import { OG_IMAGES, ROUTE_SEO, SITE_CONTENT_LASTMOD } from '../../seo-routes.ts';
import {
  buildStaticJsonLd,
  cleanInlineTokens,
  getStaticRouteContent,
  META_DESCRIPTION_LIMITS,
  routeDates,
  routeMetaDescription,
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

test('hub dates include linked articles and edits to the Wiki index itself', () => {
  const newestEssay = siteEssayNotes.map((entry) => entry.dateModified).sort().at(-1);
  assert.equal(routeLastmod(route('/notes')), newestEssay);
  const newestLinked = [...wikiTopics, ...wikiEntries].map((entry) => entry.dateModified).sort().at(-1);
  assert.equal(routeLastmod({ ...route('/wiki'), dateModified: '2000-01-01' }), newestLinked);
  assert.equal(routeLastmod({ ...route('/wiki'), dateModified: '2099-01-01' }), '2099-01-01');
});

test('Wiki leads with four existing Notes and retains the technical routes in both languages', () => {
  const slugs = [
    'turn-chaos-into-systems',
    'judgment-is-not-more-information',
    'human-nature-is-a-design-condition',
    'win-before-you-fight',
  ];
  assert.deepEqual(wikiTopics.map((note) => note.slug), slugs);
  for (const note of wikiTopics) {
    assert.equal(note, siteEssayNotes.find((entry) => entry.slug === note.slug));
    assert.notEqual(route(`/notes/${note.slug}`).index, false);
  }
  for (const language of ['en', 'zh'] as const) {
    const content = getStaticRouteContent(route('/wiki'), language);
    assert.equal(content.summary, WIKI_INDEX.summary[language]);
    assert.deepEqual(content.sections.slice(1, 5).map((section) => section.title), wikiTopics.map((note) => note.title[language]));
    assert.equal(content.sections[5].title, WIKI_INDEX.buildTitle[language]);
    assert.deepEqual(content.related.slice(0, 4).map((entry) => entry.path), slugs.map((slug) => `/notes/${slug}`));
    for (const entry of wikiEntries) {
      assert.ok(content.related.some((related) => related.path === `/wiki/${entry.slug}`));
      assert.ok(content.sections.some((section) => section.title === entry.title[language]));
    }
  }
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

test('static note copy strips Notes-format tokens (key sentences, citations, note links)', () => {
  assert.equal(
    cleanInlineTokens('A ==key sentence==[[2]] and [[note:mbi-case|MBI]] here.'),
    'A key sentence and MBI here.',
  );
  for (const note of siteEssayNotes) {
    const content = getStaticRouteContent(route(`/notes/${note.slug}`), 'zh');
    const body = JSON.stringify(content);
    assert.ok(!body.includes('=='), `${note.slug} static body leaks a == mark`);
  }
});

test('meta descriptions lead with the hand-written desc and stay inside the length limits', () => {
  for (const entry of ROUTE_SEO.filter((item) => item.index !== false)) {
    for (const language of ['en', 'zh'] as const) {
      const description = routeMetaDescription(entry, language);
      const base = entry.desc[language].trim();
      assert.ok(description.startsWith(base.replace(/[.。]$/, '')), `${entry.path} ${language} keeps its desc first`);
      if (description !== base) {
        assert.ok(description.length <= META_DESCRIPTION_LIMITS[language].max, `${entry.path} ${language} too long: ${description.length}`);
      }
      assert.doesNotMatch(description, /==|\[\[/, `${entry.path} ${language} leaks inline tokens`);
    }
  }
});

test('short descriptions are topped up from the page body with whole sentences', () => {
  const korea = route('/notes/korea-2026-crash');
  const zh = routeMetaDescription(korea, 'zh');
  assert.ok(korea.desc.zh.length < META_DESCRIPTION_LIMITS.zh.min, 'fixture is still short by hand');
  assert.ok(zh.length >= META_DESCRIPTION_LIMITS.zh.min, `zh topped up: ${zh}`);
  assert.match(zh, /[。！？]$/);
  // Long enough already: unchanged.
  const home = route('/');
  assert.equal(routeMetaDescription(home, 'en'), home.desc.en);
});

test('key pages carry hand-written descriptions long enough on their own', () => {
  for (const path of ['/wiki', '/notes', '/notes/turn-chaos-into-systems', '/notes/judgment-is-not-more-information',
    '/notes/human-nature-is-a-design-condition', '/notes/win-before-you-fight']) {
    const entry = route(path);
    assert.ok(entry.desc.en.length >= META_DESCRIPTION_LIMITS.en.min, `${path} en ${entry.desc.en.length}`);
    assert.ok(entry.desc.zh.length >= META_DESCRIPTION_LIMITS.zh.min, `${path} zh ${entry.desc.zh.length}`);
  }
});
