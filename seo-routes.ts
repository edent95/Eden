export type SeoLanguage = 'en' | 'zh';

export type RouteSeo = {
  path: string;
  priority: string;
  title: Record<SeoLanguage, string>;
  desc: Record<SeoLanguage, string>;
};

export const HOME_TITLE: Record<SeoLanguage, string> = {
  en: 'Eden Tan | Systems Architect & Digital Strategist',
  zh: 'Eden Tan | 系统架构与数字战略',
};

export const HOME_DESC: Record<SeoLanguage, string> = {
  en: 'Eden Tan is a Malaysia-based product and growth strategist building Jiju.pet, portfolio systems, and zero-to-one digital products across marketing, analytics, and UX.',
  zh: 'Eden Tan，马来西亚产品与增长策略实践者，作品涵盖 Jiju.pet、营销分析、UX 原型与从 0 到 1 的数字产品构建。',
};

export const ROUTE_SEO: RouteSeo[] = [
  {
    path: '/',
    priority: '1',
    title: HOME_TITLE,
    desc: HOME_DESC,
  },
  {
    path: '/jiju-pet',
    priority: '0.8',
    title: {
      en: 'Jiju.pet build log | Eden Tan',
      zh: 'Jiju.pet 构建记录 | Eden Tan',
    },
    desc: {
      en: 'How Jiju.pet went from fragile to shippable: auth, routes, analytics, and mobile UX — a structured zero-to-one operating log by Eden Tan.',
      zh: 'Jiju.pet 从易碎到可交付的过程：认证、路由、埋点与移动端体验加固——Eden Tan 的阶段性构建实录。',
    },
  },
  {
    path: '/previous-projects',
    priority: '0.8',
    title: {
      en: 'Project archive | Eden Tan',
      zh: '项目归档 | Eden Tan',
    },
    desc: {
      en: 'Selected projects, roles, and long-form case notes from Eden Tan’s marketing and product work across regions.',
      zh: 'Eden Tan 过往项目、角色与跨地区营销／产品向案例要点的归档页。',
    },
  },
  {
    path: '/analog-tech',
    priority: '0.8',
    title: {
      en: 'Analog Tech gallery | Eden Tan',
      zh: 'Analog Tech 图库 | Eden Tan',
    },
    desc: {
      en: 'Analog film gallery—streets, coast, architecture: 11 frames from Eden Tan’s archive, written as an honest log of light and emulsion, not a polished deck.',
      zh: 'Eden Tan 的胶片选集：街景、水岸、建筑与海岸；以颗粒、漏光与软高光为可读材质，共 11 张私人选片。',
    },
  },
  {
    path: '/life',
    priority: '0.8',
    title: {
      en: 'Life | Eden Tan',
      zh: 'Life | Eden Tan',
    },
    desc: {
      en: 'Life — short video and personal notes collection by Eden Tan.',
      zh: 'Life 相关短片与个人向记录，by Eden Tan。',
    },
  },
  {
    path: '/life-os',
    priority: '0.8',
    title: {
      en: 'Life OS RPG Character System | Eden Tan',
      zh: '人生 RPG 能力系统 | Eden Tan',
    },
    desc: {
      en: 'A mystic-tech RPG character card, ability map, debuff system, and growth route for reading personality, experience, desire, shadow, and next upgrade moves.',
      zh: '一个神秘科技风 RPG 角色卡、能力地图、Debuff 系统与成长路线，把人格、经历、欲望、阴影和下一步升级方式转成可读面板。',
    },
  },
  {
    path: '/brand-guide',
    priority: '0.8',
    title: {
      en: 'Brand guide | Eden Tan portfolio',
      zh: '品牌指南 | Eden Tan 个人站',
    },
    desc: {
      en: 'Typography, color, voice, and motion rules for the Eden portfolio site: a practical brand guide for collaborators.',
      zh: '个人作品站的品牌规范：字体、色板、语气与动效约定，供协作与延展使用。',
    },
  },
  {
    path: '/archive/11-bonus-key-combo-builder',
    priority: '0.7',
    title: {
      en: '1+1 Bonus Key Combo Builder | Eden Tan',
      zh: '1+1 Bonus Key 组合工具 | Eden Tan',
    },
    desc: {
      en: 'A campaign operations tool from Eden Tan’s project archive, designed to help agents plan compliant provider combinations and use 1+1 Bonus Key capacity clearly.',
      zh: 'Eden Tan 项目归档中的活动运营工具，用于帮助代理清楚规划合规供应商组合，并用满 1+1 Bonus Key 名额。',
    },
  },
  {
    path: '/archive/atlantis-ui-ux-prototype',
    priority: '0.7',
    title: {
      en: 'Atlantis Website UI/UX Prototype | Eden Tan',
      zh: 'Atlantis 网站 UI/UX 原型 | Eden Tan',
    },
    desc: {
      en: 'A UI/UX prototype case note from Eden Tan’s project archive, covering structure, interface direction, and website experience planning.',
      zh: 'Eden Tan 项目归档中的 UI/UX 原型案例，记录网站结构、界面方向与体验规划。',
    },
  },
  {
    path: '/archive/soccerking-project',
    priority: '0.7',
    title: {
      en: 'Soccerking Social Content Project | Eden Tan',
      zh: 'Soccerking 社媒内容项目 | Eden Tan',
    },
    desc: {
      en: 'A social content and marketing operations case note from Eden Tan’s archive, covering brand strategy, Facebook insights, and campaign execution.',
      zh: 'Eden Tan 项目归档中的社媒与营销运营案例，覆盖品牌策略、Facebook 洞察与活动执行。',
    },
  },
];

export const PAGE_COPY = ROUTE_SEO.reduce<Record<string, Pick<RouteSeo, 'title' | 'desc'>>>(
  (acc, route) => {
    if (route.path !== '/') {
      acc[route.path] = { title: route.title, desc: route.desc };
    }
    return acc;
  },
  {},
);

export function normalizeRoutePath(path: string): string {
  if (!path) return '/';
  const normalized = `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return normalized === '/' ? '/' : normalized;
}

export function canonicalRoutePath(path: string): string {
  const normalized = normalizeRoutePath(path);
  return normalized === '/' ? '/' : `${normalized}/`;
}

export function routeSeoForPath(path: string): RouteSeo | undefined {
  const normalized = normalizeRoutePath(path);
  return ROUTE_SEO.find((route) => route.path === normalized);
}
