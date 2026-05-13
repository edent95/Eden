/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Client-side SEO updates for the SPA. Search engines that execute JavaScript
 * (e.g. Google) will read these after hydration; index.html still carries
 * a sensible no-JS fallback.
 */

export type SeoLanguage = 'en' | 'zh';

type ArchivedWork = {
  slug: string;
  title: { en: string; zh: string };
  summary: { en: string; zh: string };
};

export const OG_IMAGE_FILE = 'og-image.jpg' as const;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Shown with og / twitter; keep stable for a single shared OG art file. */
const OG_IMAGE_ALT: Record<SeoLanguage, string> = {
  en: 'Eden Tan — Systems Architect and Digital Strategist; portfolio share preview (1200×630).',
  zh: 'Eden Tan 个人站分享预览图：系统架构与数字战略（1200×630）。',
};

/** Max length for meta description (search snippets). */
const DESC_MAX = 160;

function trimDesc(s: string, max = DESC_MAX): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  return (sp > 40 ? cut.slice(0, sp) : cut).trimEnd() + '…';
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(prop: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', prop);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkRel(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Root URL including trailing slash, e.g. `https://user.github.io/Eden/`
 */
export function resolveSiteRootUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  if (fromEnv) {
    return fromEnv.replace(/\/?$/, '/');
  }
  if (typeof window !== 'undefined') {
    return new URL(import.meta.env.BASE_URL, window.location.origin).href;
  }
  return '';
}

function joinPath(root: string, pathWithoutBase: string): string {
  const r = root.replace(/\/?$/, '/');
  if (pathWithoutBase === '/' || pathWithoutBase === '') {
    return r.replace(/\/?$/, '/');
  }
  const p = pathWithoutBase.replace(/^\/+/, '');
  return r + p;
}

const HOME_TITLE = {
  en: 'Eden Tan | Systems Architect & Digital Strategist',
  zh: 'Eden Tan | 系统架构与数字战略',
} as const;

const HOME_DESC = {
  en: 'Eden Tan — systems architect and digital strategist based in Malaysia. Product growth, Jiju.pet, and long-form build narratives from zero to one.',
  zh: 'Eden Tan，常驻马来西亚的系统架构与数字战略方向实践者。作品含 Jiju.pet 等从 0 到 1 的构建记录与可复盘的增长链路。',
} as const;

const PAGE_COPY: Record<
  string,
  { title: { en: string; zh: string }; desc: { en: string; zh: string } }
> = {
  '/jiju-pet': {
    title: {
      en: 'Jiju.pet build log | Eden Tan',
      zh: 'Jiju.pet 构建记录 | Eden Tan',
    },
    desc: {
      en: 'How Jiju.pet went from fragile to shippable: auth, routes, analytics, and mobile UX — a structured zero-to-one operating log by Eden Tan.',
      zh: 'Jiju.pet 从易碎到可交付的过程：认证、路由、埋点与移动端体验加固——Eden Tan 的阶段性构建实录。',
    },
  },
  '/previous-projects': {
    title: {
      en: 'Project archive | Eden Tan',
      zh: '项目归档 | Eden Tan',
    },
    desc: {
      en: 'Selected projects, roles, and long-form case notes from Eden Tan’s marketing and product work across regions.',
      zh: 'Eden Tan 过往项目、角色与跨地区营销／产品向案例要点的归档页。',
    },
  },
  '/analog-tech': {
    title: {
      en: 'Analog Tech gallery | Eden Tan',
      zh: 'Analog Tech 图库 | Eden Tan',
    },
    desc: {
      en: 'Analog film gallery—streets, coast, architecture: 11 frames from Eden Tan’s archive, written as an honest log of light and emulsion, not a polished deck.',
      zh: 'Eden Tan 的胶片选集：街景、水岸、建筑与海岸；以颗粒、漏光与软高光为可读材质，共 11 张私人选片。',
    },
  },
  '/life': {
    title: {
      en: 'Life | Eden Tan',
      zh: 'Life | Eden Tan',
    },
    desc: {
      en: 'Life — short video and personal notes collection by Eden Tan.',
      zh: 'Life 相关短片与个人向记录，by Eden Tan。',
    },
  },
  '/brand-guide': {
    title: {
      en: 'Brand guide | Eden Tan portfolio',
      zh: '品牌指南 | Eden Tan 个人站',
    },
    desc: {
      en: 'Typography, color, voice, and motion rules for the Eden portfolio site: a practical brand guide for collaborators.',
      zh: '个人作品站的品牌规范：字体、色板、语气与动效约定，供协作与延展使用。',
    },
  },
};

function homeJsonLd(siteRoot: string) {
  const z = (s: string) => s.replace(/\/$/, '');
  const root = siteRoot.replace(/\/?$/, '/');
  const imageUrl = new URL(OG_IMAGE_FILE, root).href;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Eden Tan',
        url: z(siteRoot) + '/',
        description: HOME_DESC.en,
        inLanguage: ['en', 'zh'],
        image: imageUrl,
      },
      {
        '@type': 'Person',
        name: 'Eden Tan',
        url: z(siteRoot) + '/',
        image: imageUrl,
        jobTitle: 'Systems Architect & Digital Strategist',
        address: { '@type': 'PostalAddress', addressCountry: 'MY' },
        sameAs: ['https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/'],
      },
    ],
  };
}

let jsonLdNode: HTMLScriptElement | null = null;

function setOrRemoveJsonLd(home: boolean, siteRoot: string) {
  if (jsonLdNode && jsonLdNode.parentNode) {
    jsonLdNode.remove();
    jsonLdNode = null;
  }
  if (!home) return;
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.id = 'eden-site-json-ld';
  el.text = JSON.stringify(homeJsonLd(siteRoot));
  document.head.appendChild(el);
  jsonLdNode = el;
}

export function getPageSeo(
  pathWithoutBase: string,
  language: SeoLanguage,
  activeArchived: ArchivedWork | undefined
): { title: string; description: string } {
  const key = pathWithoutBase === '' ? '/' : pathWithoutBase.startsWith('/')
    ? pathWithoutBase
    : `/${pathWithoutBase}`;
  const lang = language === 'zh' ? 'zh' : 'en';

  if (activeArchived) {
    return {
      title: `${activeArchived.title[lang]} | Eden Tan`,
      description: trimDesc(activeArchived.summary[lang]),
    };
  }

  if (key === '/' || key === '') {
    return { title: HOME_TITLE[lang], description: trimDesc(HOME_DESC[lang]) };
  }

  const copy = PAGE_COPY[key];
  if (copy) {
    return { title: copy.title[lang], description: trimDesc(copy.desc[lang]) };
  }

  return { title: HOME_TITLE[lang], description: trimDesc(HOME_DESC[lang]) };
}

/**
 * Update document title, description, Open Graph, Twitter, canonical, html[lang], and home JSON-LD.
 */
export function applyPageSeo(
  pathWithoutBase: string,
  language: SeoLanguage,
  activeArchived: ArchivedWork | undefined
) {
  const { title, description } = getPageSeo(pathWithoutBase, language, activeArchived);
  const siteRoot = resolveSiteRootUrl();
  const canonical = siteRoot ? joinPath(siteRoot, pathWithoutBase) : '';
  const loc = language === 'zh' ? 'zh_CN' : 'en_US';
  const lang: SeoLanguage = language === 'zh' ? 'zh' : 'en';
  const ogImageAlt = OG_IMAGE_ALT[lang];
  const ogImage =
    siteRoot
      ? new URL(OG_IMAGE_FILE, siteRoot).href
      : '';

  document.title = title;
  document.documentElement.lang = language === 'zh' ? 'zh-Hans' : 'en';

  setMetaName('description', description);
  setMetaName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', title);
  setMetaName('twitter:description', description);

  setMetaProperty('og:type', 'website');
  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:site_name', 'Eden Tan');
  setMetaProperty('og:locale', loc);
  if (canonical) {
    setMetaProperty('og:url', canonical);
    setLinkRel('canonical', canonical);
  }
  if (ogImage) {
    setMetaName('twitter:image', ogImage);
    setMetaName('twitter:image:alt', ogImageAlt);
    setMetaProperty('og:image', ogImage);
    setMetaProperty('og:image:type', 'image/jpeg');
    setMetaProperty('og:image:width', String(OG_IMAGE_WIDTH));
    setMetaProperty('og:image:height', String(OG_IMAGE_HEIGHT));
    setMetaProperty('og:image:alt', ogImageAlt);
  }

  const isHome =
    (!pathWithoutBase || pathWithoutBase === '/') && !activeArchived;
  if (siteRoot) {
    setOrRemoveJsonLd(isHome, siteRoot);
  }
}
