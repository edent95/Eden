import { siteEssayNotes, wikiEntries } from './generated/content.ts';
import {
  canonicalRoutePath,
  localizedCanonicalRoutePath,
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

const GENERIC_CONTEXT: Record<string, Localized> = {
  '/': {
    en: 'This site connects product systems, build evidence, essays, and a durable knowledge base. The recurring work is turning scattered inputs into structures people can understand and use.',
    zh: '这个网站把产品系统、构建证据、文章与可持续维护的知识库连在一起。反复出现的工作，是把散乱输入变成可以理解、验证和使用的结构。',
  },
  '/project': {
    en: 'The work spans local discovery, private social play, operations data, personal systems, and interactive experiments. Each build is documented as a system rather than a decorative portfolio tile.',
    zh: '这些作品覆盖本地发现、熟人互动、运营数据、个人系统与互动实验。每个项目都按真实系统来记录，而不是只做成装饰性的作品卡片。',
  },
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

export function getStaticRouteContent(route: RouteSeo, language: SeoLanguage): StaticRouteContent {
  if (route.path === '/wiki') {
    return {
      eyebrow: language === 'zh' ? '可复用构建知识' : 'Reusable build knowledge',
      heading: displayTitle(route, language),
      summary: route.desc[language],
      thesis: language === 'zh'
        ? '把从项目中学到的东西整理成可复用、可查证、可继续维护的知识。'
        : 'Turn lessons from real projects into reusable, verifiable, maintainable knowledge.',
      sections: wikiEntries.map((entry) => ({
        title: entry.title[language],
        paragraphs: [entry.summary[language], entry.thesis[language]],
      })),
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
  } else if (route.path.startsWith('/archive/')) {
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
  const image = `${siteBase}/og-image.jpg`;
  const person = {
    '@type': 'Person',
    '@id': `${siteBase}/#eden-tan`,
    name: 'Eden Tan',
    url: `${siteBase}/`,
    image,
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
      { '@type': 'ProfilePage', '@id': canonical, url: canonical, name: content.heading, description: content.summary, mainEntity: person, dateModified: SITE_CONTENT_LASTMOD },
      person,
    );
  } else if (route.path.startsWith('/notes/')) {
    graph.push({
      '@type': 'BlogPosting', '@id': `${canonical}#article`, url: canonical,
      headline: content.heading, description: content.summary, image,
      author: { '@id': person['@id'] }, publisher: { '@id': person['@id'] },
      dateModified: SITE_CONTENT_LASTMOD, inLanguage: language === 'zh' ? 'zh-Hans' : 'en',
    }, person);
  } else if (route.path.startsWith('/wiki/')) {
    graph.push({
      '@type': 'TechArticle', '@id': `${canonical}#article`, url: canonical,
      headline: content.heading, description: content.summary, image,
      author: { '@id': person['@id'] }, dateModified: SITE_CONTENT_LASTMOD,
      inLanguage: language === 'zh' ? 'zh-Hans' : 'en',
    }, person);
  } else {
    graph.push({
      '@type': route.path === '/film-gallery' ? 'ImageGallery' : 'WebPage',
      '@id': canonical, url: canonical, name: content.heading, description: content.summary,
      image, dateModified: SITE_CONTENT_LASTMOD, inLanguage: language === 'zh' ? 'zh-Hans' : 'en',
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
