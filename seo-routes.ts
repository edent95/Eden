export type SeoLanguage = 'en' | 'zh';

export type RouteSeo = {
  path: string;
  priority: string;
  index?: boolean;
  sitemap?: boolean;
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
    path: '/projects',
    priority: '0.9',
    title: {
      en: 'Projects | AI Build Systems by Eden Tan',
      zh: 'Projects | Eden Tan 的 AI 构建系统',
    },
    desc: {
      en: 'Jiju, Friday Poker Club, ETReportHub, and CRM: active AI build systems and product systems by Eden Tan, grouped by one operating logic.',
      zh: 'Jiju、Friday Poker Club、ETReportHub 和 CRM：Eden Tan 当前的 AI 构建系统与产品系统，以同一套操作逻辑整理。',
    },
  },
  {
    path: '/etreporthub',
    priority: '0.8',
    title: {
      en: 'ETReportHub | Daily Report OS by Eden Tan',
      zh: 'ETReportHub | Eden Tan 的日报数据系统',
    },
    desc: {
      en: 'ETReportHub is an iGaming daily-report data system that turns Transaction and Customer Excel files into KPI, member, channel, trend, brand comparison, and CRM-ready workflows.',
      zh: 'ETReportHub 是 iGaming 日报数据系统，把 Transaction 与 Customer Excel 转成 KPI、会员、渠道、趋势、品牌对比和可接 CRM 的工作流。',
    },
  },
  {
    path: '/etreporthub-sales',
    priority: '0.8',
    title: {
      en: 'ETReportHub Pricing | RM960/month or RM19,888 buyout',
      zh: 'ETReportHub 售卖页 | RM960/月或 RM19,888 买断',
    },
    desc: {
      en: 'Why iGaming operators and aggregators should buy ETReportHub: daily report clarity, Excel risk reduction, CRM-ready exports, RM960/month or RM19,888 buyout.',
      zh: '为什么 iGaming operator 和 aggregator 应该购买 ETReportHub：日报清晰度、降低 Excel 风险、CRM-ready 导出，RM960/月或 RM19,888 买断。',
    },
  },
  {
    path: '/poker',
    priority: '0.8',
    title: {
      en: 'Friday Poker Club | Browser Hold’em table host by Eden Tan',
      zh: 'Friday Poker Club | Eden Tan 的浏览器德州牌桌主机',
    },
    desc: {
      en: 'Friday Poker Club is a Firebase-realtime Hold’em host: solo BOT and public host-started tables, stakes-aware buy-ins, invite links, optional in-table voice, and an 8/9 mini game.',
      zh: 'Friday Poker Club 是基于 Firebase 实时数据库的德州牌桌主机：单人 BOT 房与公开房主开桌、盲注感买入、邀请链接、可选语音和 8/9 小游戏。',
    },
  },
  {
    path: '/crm',
    priority: '0.8',
    title: {
      en: 'CRM Intelligence System | A back-office CRM build by Eden Tan',
      zh: 'CRM Intelligence System | Eden Tan 的后台 CRM 构建',
    },
    desc: {
      en: 'A back-office CRM that pulls a whole business out of messy Excel — providers, merchants, accounts, rates — into one normalized Postgres database, with AI semantic search, RBAC, encrypted credentials, and a golden-ratio design system.',
      zh: '一个后台 CRM：把一整门生意从混乱 Excel 里整理进一个标准化 Postgres 数据库——供应商、商户、账号、费率——配 AI 语义搜索、RBAC、加密凭证和黄金比例设计系统。',
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
      en: 'Film Gallery | Eden Tan',
      zh: 'Film Gallery 胶片图库 | Eden Tan',
    },
    desc: {
      en: 'A quiet film archive from Eden Tan: selected frames of light, grain, waterlines, buildings, and analog attention without frame-by-frame captions.',
      zh: 'Eden Tan 的安静胶片档案：关于光、颗粒、水岸、建筑与模拟注意力的选片，不再逐张解释。',
    },
  },
  {
    path: '/life',
    priority: '0.8',
    index: false,
    sitemap: false,
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
      en: 'Eden Tan Brand System | Apple-inspired editorial clarity',
      zh: 'Eden Tan 品牌操作系统 | Apple 式清晰度',
    },
    desc: {
      en: 'A practical brand operating guide for Eden Tan: Apple-inspired clarity, systems thinking, typography, color, voice, layout rhythm, and page application rules.',
      zh: 'Eden Tan 的品牌操作指南：结合 Apple 式清晰度与系统思考，整理字体、色彩、语气、版式节奏和页面应用规则。',
    },
  },
  {
    path: '/conways-game-of-life',
    priority: '0.8',
    title: {
      en: "Conway's Game of Life | 256 Elementary Cellular Automata Rules",
      zh: "Conway's Game of Life | 256 个一维元胞自动机规则",
    },
    desc: {
      en: 'A black-and-white browser for all 256 elementary cellular automata rules, with live rule previews, binary rule readouts, and a 16-by-16 rule index.',
      zh: '一个黑白 256 elementary cellular automata rules 浏览器，包含实时规则预览、二进制规则读数和 16×16 规则索引。',
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
