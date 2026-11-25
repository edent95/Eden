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
  textWidth,
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
        assert.ok(textWidth(description) <= META_DESCRIPTION_LIMITS[language].max, `${entry.path} ${language} too wide: ${textWidth(description)}`);
      }
      assert.doesNotMatch(description, /==|\[\[/, `${entry.path} ${language} leaks inline tokens`);
    }
  }
});

test('short descriptions are topped up from the page body with whole sentences', () => {
  const korea = route('/notes/korea-2026-crash');
  const zh = routeMetaDescription(korea, 'zh');
  assert.ok(textWidth(korea.desc.zh) < META_DESCRIPTION_LIMITS.zh.min, 'fixture is still short by hand');
  assert.ok(textWidth(zh) >= META_DESCRIPTION_LIMITS.zh.min, `zh topped up: ${zh}`);
  assert.ok(textWidth(zh) <= META_DESCRIPTION_LIMITS.zh.max, `zh top-up stays inside the width: ${zh}`);
  assert.match(zh, /[。！？]$/);
  // Long enough already: unchanged.
  const home = route('/');
  assert.equal(routeMetaDescription(home, 'en'), home.desc.en);
});

test('textWidth counts 汉字 and fullwidth marks as 2, everything else as 1 (personal-dashboard seo_rules.py)', () => {
  assert.equal(textWidth('Eden Tan'), 8);
  assert.equal(textWidth('系统'), 4);
  assert.equal(textWidth('，。「」：！'), 12);
  assert.equal(textWidth('ＡＢ１'), 6); // fullwidth Latin / digits
  assert.equal(textWidth('“’…·—é'), 6); // ambiguous / neutral punctuation stays 1
  assert.equal(textWidth('한글かな'), 8);
  assert.equal(textWidth('🎲'), 2); // one code point, not two UTF-16 units
  assert.equal(textWidth('iGaming 品牌'), 12);
});

test('every indexable page lands in 110–160 of display width in both languages (search snippet yardstick)', () => {
  for (const entry of ROUTE_SEO.filter((item) => item.index !== false && item.sitemap !== false)) {
    for (const language of ['en', 'zh'] as const) {
      const width = textWidth(routeMetaDescription(entry, language));
      assert.ok(width >= 110 && width <= 160, `${entry.path} ${language} is ${width} wide`);
    }
  }
});

test('top-up never repeats a clause the description already says', () => {
  for (const entry of ROUTE_SEO.filter((item) => item.index !== false)) {
    const description = routeMetaDescription(entry, 'zh');
    const added = description.slice(entry.desc.zh.trim().length);
    for (const clause of added.split(/[，、；：—。！？]/).map((part) => part.replace(/[\s\p{P}]/gu, ''))) {
      if (clause.length < 6) continue;
      assert.ok(!entry.desc.zh.replace(/[\s\p{P}]/gu, '').includes(clause), `${entry.path} repeats 「${clause}」`);
    }
  }
});

test('key pages carry hand-written descriptions long enough on their own', () => {
  for (const path of ['/wiki', '/notes', '/notes/turn-chaos-into-systems', '/notes/judgment-is-not-more-information',
    '/notes/human-nature-is-a-design-condition', '/notes/win-before-you-fight']) {
    const entry = route(path);
    assert.ok(textWidth(entry.desc.en) >= META_DESCRIPTION_LIMITS.en.min, `${path} en ${textWidth(entry.desc.en)}`);
    assert.ok(textWidth(entry.desc.zh) >= META_DESCRIPTION_LIMITS.zh.min, `${path} zh ${textWidth(entry.desc.zh)}`);
  }
});

test('pages moved to Asia iGaming map to the right URL in both languages and stay out of discovery', async () => {
  const { asiaIgamingUrl, keepUtmQuery, movedRedirectUrl, movedRouteUrl } = await import('../../seo-routes.ts');
  const expected: Record<string, string> = {
    '/igaming/full': '/guide/',
    '/igaming/ggr-vs-ngr': '/ggr-vs-ngr/',
    '/igaming/provider-promotions': '/provider-promotions/',
    '/igaming/promotion-launch-checklist': '/promotion-launch-checklist/',
    '/igaming/crm-player-lifecycle': '/crm-player-lifecycle/',
    '/igaming/marketing-report-beyond-cpa': '/marketing-report-beyond-cpa/',
    '/igaming/rtp-explained': '/rtp-explained/',
    '/igaming/wagering-requirements': '/wagering-requirements/',
    '/igaming/atlas': '/atlas/',
  };
  const moved = ROUTE_SEO.filter((entry) => entry.movedTo !== undefined);
  assert.deepEqual(Object.fromEntries(moved.map((entry) => [entry.path, entry.movedTo])), expected);
  for (const entry of moved) {
    assert.equal(entry.index, false, `${entry.path} is noindex`);
    assert.equal(entry.sitemap, false, `${entry.path} is out of the sitemap`);
    assert.equal(movedRouteUrl(entry, 'en'), `https://asiaigaming.com${expected[entry.path]}`);
    assert.equal(movedRouteUrl(entry, 'zh'), `https://asiaigaming.com/zh${expected[entry.path]}`);
  }
  // What stays: the hub, the field notes and the résumé.
  for (const path of ['/igaming', '/igaming/cases', '/igaming/cases/ftd-growth', '/igaming/resume']) {
    assert.equal(movedRouteUrl(route(path), 'en'), undefined, `${path} stays on eden-tan.com`);
  }
  assert.equal(asiaIgamingUrl('/', 'zh'), 'https://asiaigaming.com/zh/');
  assert.equal(asiaIgamingUrl('/guide', 'en'), 'https://asiaigaming.com/guide/');

  // Boot-time redirect: path mapping only; utm_* is kept, everything else (and the hash) is dropped.
  assert.equal(movedRedirectUrl('/igaming/full/', '/'), 'https://asiaigaming.com/guide/');
  assert.equal(movedRedirectUrl('/zh/igaming/atlas', '/'), 'https://asiaigaming.com/zh/atlas/');
  assert.equal(movedRedirectUrl('/Eden/zh/igaming/rtp-explained/', '/Eden/'), 'https://asiaigaming.com/zh/rtp-explained/');
  assert.equal(
    movedRedirectUrl('/igaming/ggr-vs-ngr/', '/', '?utm_source=li&from=coin-slot&UTM_campaign=a%20b&p=x'),
    'https://asiaigaming.com/ggr-vs-ngr/?utm_source=li&UTM_campaign=a+b',
  );
  assert.equal(keepUtmQuery('?notrack=1'), '');
  for (const path of ['/igaming', '/igaming/', '/zh/igaming/cases/', '/igaming/resume', '/igaming/cases/ftd-growth', '/', '/notes']) {
    assert.equal(movedRedirectUrl(path, '/'), undefined, `${path} is not redirected`);
  }
});

test('the /igaming hub links to Asia iGaming, the field notes and the résumé, in the reader’s language', () => {
  for (const language of ['en', 'zh'] as const) {
    const content = getStaticRouteContent(route('/igaming'), language);
    const links = content.sections.flatMap((section) => section.links ?? []).map((link) => link.href);
    const zh = language === 'zh' ? '/zh' : '';
    assert.ok(links.includes(`https://asiaigaming.com${zh}/`), `${language} links to Asia iGaming`);
    assert.ok(links.includes(`${zh}/igaming/cases/`), `${language} links to the field notes`);
    assert.ok(links.includes(`${zh}/igaming/resume/`), `${language} links to the résumé`);
    assert.ok(!content.related.some((entry) => entry.movedTo), 'no related link to a moved page');
  }
});
