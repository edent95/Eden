import { siteEssayNotes, wikiEntries } from './generated/content.ts';
import { ROUTE_STATIC_COPY } from './seo-static-content.ts';
import {
  canonicalRoutePath,
  localizedCanonicalRoutePath,
  OG_IMAGES,
  ROUTE_SEO,
  SITE_CONTENT_LASTMOD,
  type RouteSeo,
  type SeoLanguage,
} from './seo-routes.ts';

type Localized = Record<SeoLanguage, string>;

type StaticSection = {
  title: string;
  paragraphs: string[];
};

export type StaticRouteContent = {
  eyebrow: string;
  heading: string;
  summary: string;
  thesis?: string;
  sections: StaticSection[];
  related: RouteSeo[];
};

const CLUSTERS: Array<{ prefix?: string; paths: string[] }> = [
  {
    paths: [
      '/', '/project', '/jiju-pet', '/jiju-revamp', '/etreporthub', '/etreporthub-sales',
      '/poker', '/film-gallery', '/life-os', '/brand-guide',
      '/archive/11-bonus-key-combo-builder', '/archive/atlantis-ui-ux-prototype',
      '/archive/soccerking-project',
    ],
  },
  { prefix: '/wiki/', paths: ['/wiki', '/notes/turn-chaos-into-systems', '/notes/judgment-is-not-more-information'] },
  { prefix: '/notes/', paths: ['/notes', '/wiki', '/notes/turn-chaos-into-systems'] },
  {
    paths: ['/penneys-game', '/conways-game-of-life', '/cellular-automata-lab', '/wiki/rag-flow'],
  },
];

/** Fallback context for routes with neither Markdown content nor an entry in `ROUTE_STATIC_COPY` (noindex utility pages). */
const GENERIC_CONTEXT: Record<string, Localized> = {
  '/wiki': {
    en: 'The Wiki keeps reusable build knowledge outside chat history. Each page records a thesis, practical rules, failure modes, and the project evidence behind it.',
    zh: 'Wiki 把可复用的构建知识留在聊天记录之外。每一页都保留核心判断、实用规则、失败模式与背后的项目证据。',
  },
  '/notes': {
    en: 'These essays develop a connected body of thought around systems, judgment, strategy, finance, human behavior, and building with AI.',
    zh: '这些文章围绕系统、判断、策略、金融、人性与 AI 构建，逐渐形成一套彼此关联的思考体系。',
  },
};

function cleanInlineTokens(value: string): string {
  return value
    .replace(/\[\[note:[^|\]]+\|([^\]]+)\]\]/g, '$1')
    .replace(/\[\[\d+\]\]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function displayTitle(route: RouteSeo, language: SeoLanguage): string {
  return route.title[language].split(' | ')[0].trim();
}

function clusterFor(path: string): string[] {
  const cluster = CLUSTERS.find((item) => item.paths.includes(path) || (item.prefix && path.startsWith(item.prefix)));
  return cluster?.paths ?? ['/', '/project', '/wiki', '/notes'];
}

function relatedRoutes(route: RouteSeo): RouteSeo[] {
  const candidates = [
    ...clusterFor(route.path),
    route.path.startsWith('/wiki/') ? '/wiki' : '',
    route.path.startsWith('/notes/') ? '/notes' : '',
    '/',
  ];
  const unique = [...new Set(candidates)].filter((path) => path && path !== route.path);
  return unique
    .map((path) => ROUTE_SEO.find((entry) => entry.path === path))
    .filter((entry): entry is RouteSeo => Boolean(entry) && entry.index !== false)
    .slice(0, 5);
}

export type RouteDates = { published: string; modified: string };

function contentDatesFor(route: RouteSeo): RouteDates | undefined {
  if (route.path.startsWith('/wiki/')) {
    const entry = wikiEntries.find((item) => item.slug === route.path.slice('/wiki/'.length));
    return entry ? { published: entry.datePublished, modified: entry.dateModified } : undefined;
  }
  if (route.path.startsWith('/notes/')) {
    const entry = siteEssayNotes.find((item) => item.slug === route.path.slice('/notes/'.length));
    return entry ? { published: entry.datePublished, modified: entry.dateModified } : undefined;
  }
  return undefined;
}

function latestIsoDate(dates: string[], fallback: string): string {
  return dates.reduce((latest, date) => (date > latest ? date : latest), fallback);
}

/**
 * Freshness per route, so sitemap `lastmod` and JSON-LD dates are driven by content:
 * - Wiki / Notes articles: frontmatter `published` / `updated` from the Markdown source.
 * - `/wiki` and `/notes` hubs: modified = the newest child article.
 * - Homepage: modified = `SITE_CONTENT_LASTMOD` (the site-level regeneration date).
 * - Everything else: the registry's own `datePublished` / `dateModified`, falling back to
 *   `SITE_CONTENT_LASTMOD` when a route has no date of its own.
 */
export function routeDates(route: RouteSeo): RouteDates {
  const fromContent = contentDatesFor(route);
  if (fromContent) return fromContent;
  const published = route.datePublished ?? SITE_CONTENT_LASTMOD;
  if (route.path === '/wiki') {
    return { published, modified: latestIsoDate(wikiEntries.map((entry) => entry.dateModified), published) };
  }
  if (route.path === '/notes') {
    return { published, modified: latestIsoDate(siteEssayNotes.map((entry) => entry.dateModified), published) };
  }
  if (route.path === '/') return { published, modified: SITE_CONTENT_LASTMOD };
  return { published, modified: route.dateModified ?? SITE_CONTENT_LASTMOD };
}

export function routeLastmod(route: RouteSeo): string {
  return routeDates(route).modified;
}

/** Notes and Wiki articles are `article` for Open Graph; every other route stays `website`. */
export function routeOgType(route: RouteSeo): 'article' | 'website' {
  return route.path.startsWith('/notes/') || route.path.startsWith('/wiki/') ? 'article' : 'website';
}

export function routeOgImage(route: RouteSeo, language: SeoLanguage, siteBase: string) {
  const image = OG_IMAGES[route.og ?? 'site'];
  return { file: image.file, url: `${siteBase}/${image.file}`, alt: image.alt[language] };
}

export function getStaticRouteContent(route: RouteSeo, language: SeoLanguage): StaticRouteContent {
  if (route.path === '/conways-game-of-life') {
    return {
      eyebrow: language === 'zh' ? 'B3 / S23 · 二元世界' : 'B3 / S23 · Binary worlds',
      heading: displayTitle(route, language),
      summary: route.desc[language],
      thesis: language === 'zh'
        ? '真正互通的，不是解释，而是组合：两个状态足以长出复杂系统。'
        : 'What connects the systems is not interpretation, but combination: two states are enough to grow complexity.',
      sections: language === 'zh' ? [
        {
          title: '底层编码的互通',
          paragraphs: [
            'Conway 的细胞只有死亡 0 与生存 1；卦象的每一爻只有阴与阳。它们不是同一套思想，但每个位置都从两个可能开始，承载一个 bit 的信息。',
          ],
        },
        {
          title: '从 8 到 64，再到 256',
          paragraphs: [
            '一维细胞自动机观察左邻、自身、右邻三个二元输入，因此有 2³ = 8 种局部邻域，可与八种三爻状态作形式配对。',
            '上下两个三爻卦以 8 × 8 组合成 2⁶ = 64 个六爻状态；而规则表要为八种邻域各指定 0 或 1，因此产生 2⁸ = 256 条 Elementary Rules。两者共享组合数学，但不是同一种自动机。',
          ],
        },
        {
          title: '莱布尼茨的历史桥梁',
          paragraphs: [
            '二进制体系在先，跨文化辨认在后。白晋把邵雍体系中的伏羲六十四卦图寄给莱布尼茨；在阴 = 0、阳 = 1 和特定读爻方向下，六十四种组合可以读成 0—63。莱布尼茨在 1703 年的《二进制算术的阐释》中公开写下这条联系。',
            '这证明两套符号系统可以共享二元结构，不证明《易经》预言了计算机，也不代表常用的文王卦序就是 0—63。',
          ],
        },
      ] : [
        {
          title: 'The common code underneath',
          paragraphs: [
            "Conway's cells are dead 0 or alive 1; every hexagram line is yin or yang. They are not the same system of thought, but each position begins with two possibilities and carries one bit of information.",
          ],
        },
        {
          title: 'From 8 to 64, then 256',
          paragraphs: [
            'An elementary cellular automaton reads three binary inputs—left, self, and right—so it has 2³ = 8 local neighborhoods, which can be paired formally with eight three-line trigram states.',
            'Two trigrams combine as 8 × 8 into 2⁶ = 64 six-line states. A rule table assigns 0 or 1 to each of eight neighborhoods, producing 2⁸ = 256 Elementary Rules. The systems share combinatorics, but they are not the same automaton.',
          ],
        },
        {
          title: "Leibniz's historical bridge",
          paragraphs: [
            "The binary system came first; the cross-cultural recognition came later. Bouvet sent Leibniz the Fuxi hexagram diagram associated with Shao Yong. With yin = 0, yang = 1, and a particular reading direction, its 64 combinations can be read as 0–63. Leibniz published the connection in his 1703 Explanation of Binary Arithmetic.",
            'This shows that two symbolic systems can share a binary structure—not that the I Ching predicted computers, or that the standard King Wen sequence is a 0–63 count.',
          ],
        },
      ],
      related: relatedRoutes(route),
    };
  }

  if (route.path === '/wiki') {
    return {
      eyebrow: 'EDEN / WIKI',
      heading: language === 'zh' ? '让经验，成为下一次的起点。' : 'A little wiser. With every build.',
      summary: language === 'zh'
        ? '构建时遇到的问题，解决后留下的方法。把散落在项目里的经验，整理成可以反复使用的知识。'
        : 'Problems met while building. Methods kept after solving them. A growing collection of knowledge to carry into the next project.',
      thesis: language === 'zh'
        ? '把从项目中学到的东西整理成可复用、可查证、可继续维护的知识。'
        : 'Turn lessons from real projects into reusable, verifiable, maintainable knowledge.',
      sections: [...wikiEntries.map((entry) => ({
        title: entry.title[language],
        paragraphs: [entry.summary[language], entry.thesis[language]],
      })), {
        title: language === 'zh' ? '做过的事，留下可用的东西。' : 'Keep what the work teaches you.',
        paragraphs: [language === 'zh'
          ? '每篇笔记保留学到了什么、为什么重要、下次怎么复用。原始资料保持不变，Wiki 由 LLM 持续整理，经过检查的方法再成为可执行的 Skill。'
          : 'Each note keeps what was learned, why it matters, and how to reuse it. Original sources stay intact; the LLM maintains the wiki. Checked methods can become executable skills.'],
      }],
      related: ROUTE_SEO.filter((entry) => entry.path.startsWith('/wiki/') && entry.index !== false),
    };
  }

  if (route.path === '/notes') {
    return {
      eyebrow: language === 'zh' ? 'Eden 的文章' : 'Notes by Eden',
      heading: language === 'zh' ? '一些值得留下来的想法' : 'Ideas worth keeping around',
      summary: route.desc[language],
      thesis: language === 'zh'
        ? '文章不是一次性内容，而是持续生长的判断与知识档案。'
        : 'Essays are not disposable content; they are a growing archive of judgment and knowledge.',
      sections: siteEssayNotes.map((entry) => ({
        title: entry.title[language],
        paragraphs: [entry.summary[language], entry.thesis[language]],
      })),
      related: ROUTE_SEO.filter((entry) => entry.path.startsWith('/notes/') && entry.index !== false),
    };
  }

  const wikiSlug = route.path.startsWith('/wiki/') ? route.path.slice('/wiki/'.length) : '';
  const wiki = wikiEntries.find((entry) => entry.slug === wikiSlug);
  if (wiki) {
    return {
      eyebrow: wiki.eyebrow[language],
      heading: wiki.title[language],
      summary: wiki.summary[language],
      thesis: wiki.thesis[language],
      sections: wiki.sections.map((section) => ({
        title: section.title[language],
        paragraphs: section.points[language].map(cleanInlineTokens),
      })),
      related: relatedRoutes(route),
    };
  }

  const noteSlug = route.path.startsWith('/notes/') ? route.path.slice('/notes/'.length) : '';
  const note = siteEssayNotes.find((entry) => entry.slug === noteSlug);
  if (note) {
    return {
      eyebrow: note.category[language],
      heading: note.title[language],
      summary: note.summary[language],
      thesis: note.thesis[language],
      sections: note.sections.map((section) => ({
        title: section.title[language],
        paragraphs: section.paragraphs[language].map(cleanInlineTokens),
      })),
      related: relatedRoutes(route),
    };
  }

  const copy = ROUTE_STATIC_COPY[route.path];
  if (copy) {
    return {
      eyebrow: copy.eyebrow[language],
      heading: displayTitle(route, language),
      summary: route.desc[language],
      thesis: copy.thesis?.[language],
      sections: copy.sections.map((section) => ({
        title: section.title[language],
        paragraphs: section.paragraphs.map((paragraph) => paragraph[language]),
      })),
      related: relatedRoutes(route),
    };
  }

  const context = GENERIC_CONTEXT[route.path]?.[language] ?? (
    language === 'zh'
      ? '这页记录一个真实项目、工具或工作系统：它解决什么问题、怎样形成，以及它与其他构建和知识页面之间的关系。'
      : 'This page documents a real project, tool, or working system: the problem it addresses, how it took shape, and how it connects to the wider body of builds and knowledge.'
  );
  const sectionTitle = language === 'zh' ? '这页包含什么' : 'What this page contains';
  const clusterTitle = language === 'zh' ? '继续探索' : 'Continue exploring';
  return {
    eyebrow: route.path === '/' ? 'Eden Tan' : language === 'zh' ? '项目与知识系统' : 'Projects and knowledge systems',
    heading: displayTitle(route, language),
    summary: route.desc[language],
    thesis: route.path === '/'
      ? language === 'zh' ? '知识应该持续复利，而不是在一次回答后消失。' : 'Knowledge should compound instead of disappearing after one answer.'
      : undefined,
    sections: [
      { title: sectionTitle, paragraphs: [context, route.desc[language]] },
      {
        title: clusterTitle,
        paragraphs: [language === 'zh'
          ? '相关页面通过可抓取的普通链接连接，让项目证据、文章与 Wiki 不再是彼此孤立的页面。'
          : 'Related pages use ordinary crawlable links, connecting project evidence, essays, and Wiki knowledge instead of leaving them as isolated pages.'],
      },
    ],
    related: relatedRoutes(route),
  };
}

function breadcrumbItems(route: RouteSeo, language: SeoLanguage, siteBase: string) {
  const items: Array<{ name: string; url: string }> = [
    { name: language === 'zh' ? '主页' : 'Home', url: `${siteBase}${localizedCanonicalRoutePath('/', language)}` },
  ];
  if (route.path.startsWith('/wiki/') || route.path === '/wiki') {
    if (route.path !== '/wiki') items.push({ name: 'Wiki', url: `${siteBase}${localizedCanonicalRoutePath('/wiki', language)}` });
  } else if (route.path.startsWith('/notes/') || route.path === '/notes') {
    if (route.path !== '/notes') items.push({ name: 'Notes', url: `${siteBase}${localizedCanonicalRoutePath('/notes', language)}` });
  } else if (route.path.startsWith('/archive/') || route.path.startsWith('/project/')) {
    items.push({ name: language === 'zh' ? '作品' : 'Projects', url: `${siteBase}${localizedCanonicalRoutePath('/project', language)}` });
  }
  if (route.path !== '/') {
    items.push({ name: displayTitle(route, language), url: `${siteBase}${localizedCanonicalRoutePath(route.path, language)}` });
  }
  return items;
}

export function buildStaticJsonLd(route: RouteSeo, language: SeoLanguage, siteBase: string) {
  const content = getStaticRouteContent(route, language);
  const canonical = `${siteBase}${localizedCanonicalRoutePath(route.path, language)}`;
  const image = routeOgImage(route, language, siteBase).url;
  const dates = routeDates(route);
  const person = {
    '@type': 'Person',
    '@id': `${siteBase}/#eden-tan`,
    name: 'Eden Tan',
    url: `${siteBase}/`,
    image: `${siteBase}/${OG_IMAGES.site.file}`,
    jobTitle: 'Systems Architect & Digital Strategist',
    sameAs: [
      'https://github.com/edent95',
      'https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/',
    ],
  };
  const breadcrumbs = breadcrumbItems(route, language, siteBase);
  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem', position: index + 1, name: item.name, item: item.url,
      })),
    },
  ];

  if (route.path === '/') {
    graph.push(
      { '@type': 'WebSite', '@id': `${siteBase}/#website`, name: 'Eden Tan', url: `${siteBase}/`, inLanguage: ['en', 'zh-Hans'] },
      {
        '@type': 'ProfilePage', '@id': canonical, url: canonical, name: content.heading, description: content.summary,
        mainEntity: person, datePublished: dates.published, dateModified: dates.modified,
      },
      person,
    );
  } else if (route.path.startsWith('/notes/')) {
    graph.push({
      '@type': 'BlogPosting', '@id': `${canonical}#article`, url: canonical,
      headline: content.heading, description: content.summary, image,
      author: { '@id': person['@id'] }, publisher: { '@id': person['@id'] },
      datePublished: dates.published, dateModified: dates.modified,
      inLanguage: language === 'zh' ? 'zh-Hans' : 'en',
    }, person);
  } else if (route.path.startsWith('/wiki/')) {
    graph.push({
      '@type': 'TechArticle', '@id': `${canonical}#article`, url: canonical,
      headline: content.heading, description: content.summary, image,
      author: { '@id': person['@id'] }, datePublished: dates.published, dateModified: dates.modified,
      inLanguage: language === 'zh' ? 'zh-Hans' : 'en',
    }, person);
  } else {
    graph.push({
      '@type': route.path === '/film-gallery' ? 'ImageGallery' : 'WebPage',
      '@id': canonical, url: canonical, name: content.heading, description: content.summary,
      image, datePublished: dates.published, dateModified: dates.modified,
      inLanguage: language === 'zh' ? 'zh-Hans' : 'en',
      author: { '@id': person['@id'] },
    }, person);
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function buildStaticBreadcrumbs(route: RouteSeo, language: SeoLanguage, siteBase: string) {
  return breadcrumbItems(route, language, siteBase);
}

export function routeOutputPath(route: RouteSeo, language: SeoLanguage): string {
  const canonical = localizedCanonicalRoutePath(route.path, language);
  return canonical === '/' ? 'index.html' : `${canonical.replace(/^\//, '')}index.html`;
}

export function languageAlternateUrl(route: RouteSeo, language: SeoLanguage, siteBase: string): string {
  return `${siteBase}${localizedCanonicalRoutePath(route.path, language)}`;
}

export function logicalCanonicalPath(route: RouteSeo): string {
  return canonicalRoutePath(route.path);
}
