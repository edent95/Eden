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
  en: 'Eden Tan | Human, interpreted. Systems, built.',
  zh: 'Eden Tan | 理解人，建立系统',
};

export const HOME_DESC: Record<SeoLanguage, string> = {
  en: 'Eden Tan turns complex human behavior and messy realities into useful products, data, and AI systems.',
  zh: 'Eden Tan 把复杂的人性、行为与现实问题，转化成可以被理解、验证和使用的数据、产品与 AI 系统。',
};

export const ROUTE_SEO: RouteSeo[] = [
  {
    path: '/',
    priority: '1',
    title: HOME_TITLE,
    desc: HOME_DESC,
  },
  {
    path: '/icon-prompts',
    priority: '0.1',
    index: false,
    sitemap: false,
    title: {
      en: 'Product Icon Prompt Studio | Eden Tan',
      zh: '产品 Icon Prompt Studio | Eden Tan',
    },
    desc: {
      en: 'A private prompt workspace for generating coordinated 2×2 product icon grids.',
      zh: '用于生成统一产品四宫格图标的隐藏 Prompt 工作页。',
    },
  },
  {
    path: '/jiju-pet',
    priority: '0.8',
    title: {
      en: 'Jiju | Trusted pet-friendly local discovery',
      zh: 'Jiju | 值得相信的宠物友好地点发现',
    },
    desc: {
      en: 'Discover genuinely pet-friendly places, check real policies and conditions, keep pet profiles and visit memories, and contribute trusted local context with Jiju.',
      zh: '用 Jiju 发现真正宠物友好的地点，确认真实政策与现场条件，保存宠物档案和到访记忆，并共同补充可信的本地资料。',
    },
  },
  {
    path: '/jiju-revamp',
    priority: '0.7',
    title: {
      en: 'Jiju.pet revamp | From pet-friendly to local discovery',
      zh: 'Jiju.pet 转型提案 | 从宠物友好到本地生活探索',
    },
    desc: {
      en: 'A revamp proposal turning Jiju.pet from a pet-friendly directory into a local discovery platform: scene-based search, real-life filters, and a larger market — by Eden Tan.',
      zh: 'Jiju.pet 从宠物友好目录转型为本地生活探索平台的提案：按场景搜索、真实生活筛选、更大市场——Eden Tan。',
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
    path: '/project-css',
    priority: '0.5',
    index: false,
    sitemap: false,
    title: {
      en: 'Project CSS Icons | Eden Tan',
      zh: 'Project CSS Icons | Eden Tan',
    },
    desc: {
      en: 'A direct review page for Eden Tan’s animated CSS art across Projects, Home system files, and Home interests.',
      zh: '一个直达检查页，用来集中查看 Eden Tan 在 Projects、主页系统文件和主页兴趣区里的动态 CSS 图腾。',
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
      en: 'ETReportHub Pricing | RM4,890 launch package',
      zh: 'ETReportHub 售卖页 | RM4,890 上线套餐',
    },
    desc: {
      en: 'Why iGaming operators and aggregators should buy ETReportHub: daily report clarity, Excel risk reduction, CRM-ready exports, and an RM4,890 launch package.',
      zh: '为什么 iGaming operator 和 aggregator 应该购买 ETReportHub：日报清晰度、降低 Excel 风险、CRM-ready 导出，以及 RM4,890 上线套餐。',
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
      en: 'A browser Hold’em table for private games: create a room, invite the crew, buy in, play in realtime, and keep the stories that happen around the table.',
      zh: '为熟人局设计的浏览器德州牌桌：创建房间、邀请朋友、买入、实时开局，并留下那群人在桌边发生的故事。',
    },
  },
  {
    path: '/wiki',
    priority: '0.7',
    title: {
      en: 'Eden Knowledge Base | Reusable build skills',
      zh: 'Eden 知识库 | 可复用构建技能',
    },
    desc: {
      en: 'A personal knowledge base for reusable build skills across Eden projects: Vite, background music, button feedback, Firebase lifetime storage, and product judgment.',
      zh: 'Eden 的个人知识库，沉淀跨项目可复用构建技能：Vite、背景音乐、按钮反馈、Firebase lifetime storage 和产品判断。',
    },
  },
  {
    path: '/wiki/vite',
    priority: '0.6',
    title: {
      en: 'Practical Vite Skills | Friday Poker Club',
      zh: '实用 Vite 技能 | Friday Poker Club',
    },
    desc: {
      en: 'A build note on the practical Vite skills learned from Friday Poker Club: dev loop, routing, assets, env values, and production build checks.',
      zh: 'Friday Poker Club 的 Vite 构建笔记：dev loop、路由、资源、环境变量和 production build 检查。',
    },
  },
  {
    path: '/wiki/background-music',
    priority: '0.6',
    title: {
      en: 'Background Music UX | Friday Poker Club',
      zh: 'Background Music UX | Friday Poker Club',
    },
    desc: {
      en: 'A UX note on why optional background music matters in a browser poker table and how it changes the feeling of a shared room.',
      zh: '一篇 UX 笔记：为什么可控的背景音乐会影响浏览器 poker table 的空间感与共同在场感。',
    },
  },
  {
    path: '/wiki/button-feedback',
    priority: '0.6',
    title: {
      en: 'Button Feedback UX | Friday Poker Club',
      zh: 'Button Feedback UX | Friday Poker Club',
    },
    desc: {
      en: 'A UX note on click button feedback in realtime game interfaces: pressed, pending, accepted, blocked, and failed states.',
      zh: '实时游戏界面的按钮反馈笔记：按下、等待、接受、阻挡与失败状态。',
    },
  },
  {
    path: '/wiki/firebase-lifetime-storage',
    priority: '0.6',
    title: {
      en: 'Firebase Lifetime Storage | Friday Poker Club',
      zh: 'Firebase Lifetime Storage | Friday Poker Club',
    },
    desc: {
      en: 'A build note on using Firebase as durable table memory for rooms, reconnects, host-started public games, and cleanup logic.',
      zh: '一篇构建笔记：用 Firebase 作为牌桌长期记忆，支撑房间、重连、公开房主开桌与 cleanup 逻辑。',
    },
  },
  {
    path: '/wiki/skills',
    priority: '0.6',
    title: {
      en: 'Friday Poker Club Skills Map | Eden Tan',
      zh: 'Friday Poker Club Skills Map | Eden Tan',
    },
    desc: {
      en: 'The reusable skill map behind Friday Poker Club: Vite release loop, Firebase realtime memory, UX feedback, audio controls, and product judgment.',
      zh: 'Friday Poker Club 背后的可复用技能地图：Vite release loop、Firebase realtime memory、UX feedback、声音控制与产品判断。',
    },
  },
  {
    path: '/wiki/rag-flow',
    priority: '0.6',
    title: {
      en: 'Tag Registry and RAG Flow | Eden Knowledge Base',
      zh: 'Tag Registry 与 RAG Flow | Eden 知识库',
    },
    desc: {
      en: 'The knowledge architecture for Eden’s reusable skills: structured wiki notes, Skill Cards, controlled tags, embedding index, and RAG-based recall.',
      zh: 'Eden 可复用 skills 的知识架构：结构化 wiki notes、Skill Cards、受控 tags、embedding index 和 RAG 召回。',
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
    path: '/film-gallery',
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
      en: 'Brand Guide | Visual, voice, layout, and motion rules',
      zh: 'Brand Guide | 视觉、语气、版式与动效规则',
    },
    desc: {
      en: 'A living brand guide for a compounding knowledge system: thesis, layout, theme colors, typography, voice, visual assets, motion, and implementation rules.',
      zh: '一份持续更新的 Brand Guide，整理知识复利主张、版式、主题色、字体、语气、视觉资产、动效和实现规则。',
    },
  },
  {
    path: '/topics',
    priority: '0.7',
    title: {
      en: 'Topic Market | Question board for Eden',
      zh: 'Topic Market | Eden 的问题市场',
    },
    desc: {
      en: 'A lightweight topic market where each card is one question with one icon, and the answer control changes by question type.',
      zh: '一个轻量 topic market：一张卡一个问题和 icon，回答控件按问题类型变化。',
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
