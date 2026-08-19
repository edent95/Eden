export type SeoLanguage = 'en' | 'zh';

export type RouteSeo = {
  path: string;
  priority: string;
  index?: boolean;
  sitemap?: boolean;
  title: Record<SeoLanguage, string>;
  desc: Record<SeoLanguage, string>;
};

/** All route HTML was materially regenerated on this date. Update when SEO-visible content changes. */
export const SITE_CONTENT_LASTMOD = '2026-08-19';

export const HOME_TITLE: Record<SeoLanguage, string> = {
  en: 'Eden Tan | Build systems from chaos.',
  zh: 'Eden Tan | 从混乱中建立系统',
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
      en: 'Discover genuinely pet-friendly places, verify real policies, save pet profiles and visit memories, and add trusted local context with Jiju.',
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
      en: 'A proposal to turn Jiju.pet into a local discovery platform with scene-based search, real-life filters, and a larger market.',
      zh: 'Jiju.pet 从宠物友好目录转型为本地生活探索平台的提案：按场景搜索、真实生活筛选、更大市场——Eden Tan。',
    },
  },
  {
    path: '/project',
    priority: '0.9',
    title: {
      en: 'Projects | Eden Tan',
      zh: '作品 | Eden Tan',
    },
    desc: {
      en: 'An app shelf of everything Eden Tan has built: Jiju, Friday Poker Club, ETReportHub, Film Gallery, and Conway’s Game of Life.',
      zh: 'Eden Tan 做过的作品列表：Jiju、Friday Poker Club、ETReportHub、Film Gallery 以及 Conway’s Game of Life。',
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
      en: 'ETReportHub turns Transaction and Customer Excel files into KPI, member, channel, trend, brand comparison, and CRM-ready workflows.',
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
      en: 'A personal knowledge base for reusable build skills: Vite, feedback, Firebase persistence, audio UX, RAG, and product judgment.',
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
    path: '/film-gallery',
    priority: '0.8',
    title: {
      en: 'Film Gallery | Eden Tan',
      zh: 'Film Gallery 胶片图库 | Eden Tan',
    },
    desc: {
      en: 'Fifteen film photographs by Eden Tan—streets, water, buildings, temples, and people—shot across three cameras on Kodak Gold 200 and 400.',
      zh: 'Eden Tan 的十五张胶片记录：街道、水岸、建筑、庙宇与人物，使用三台相机及 Kodak Gold 200、400 拍摄。',
    },
  },
  {
    path: '/notes',
    priority: '0.8',
    title: {
      en: 'Notes | Essays and build notes by Eden Tan',
      zh: 'Notes | Eden Tan 的文章与构建笔记',
    },
    desc: {
      en: 'Published essays and build notes by Eden Tan on products, AI, human behavior, and turning messy realities into useful systems.',
      zh: 'Eden Tan 发布的文章与构建笔记，关于产品、AI、人的行为，以及怎样把混乱慢慢变成可用的系统。',
    },
  },
  {
    path: '/notes/korea-2026-crash',
    priority: '0.7',
    title: { en: 'Korea\'s 2026 market crash | Eden Tan', zh: '「疯牛」撞墙：韩国股市 2026 | Eden Tan' },
    desc: { en: 'Korea\'s market nearly doubled, then suffered a record monthly fall while exports hit a high—a lesson in why price and value differ.', zh: '韩国股市半年翻倍后又创下史上最大单月跌幅，而同月出口却创新高。一堂关于「价格不等于价值」的公开课。' },
  },
  {
    path: '/notes/mbi-case',
    priority: '0.7',
    title: { en: 'MBI and the coin that “only goes up” | Eden Tan', zh: '旧骗局，新外衣：MBI 与那枚「会一直涨」的币 | Eden Tan' },
    desc: { en: 'How Penang\'s MBI dressed a coin-and-recruit money game as an O2O tech company—and the three questions that expose a Ponzi scheme.', zh: '槟城 MBI 把「虚拟币＋拉人头」的 money game 包装成 O2O 科技公司。戳穿任何庞氏骗局的三个老问题，照样一戳就破——不管外衣换成什么加密币新词。' },
  },
  {
    path: '/notes/carrian-case',
    priority: '0.7',
    title: { en: 'The Carrian fraud case | Eden Tan', zh: '一座建在借来的钱上的帝国：佳宁案 | Eden Tan' },
    desc: { en: 'The Carrian fraud as a lesson in mistaking “looks rich” for real value: a borrowed-money empire, an auditor\'s murder, and a bank in crisis.', zh: '用 1980 年代佳宁案讲一个道理：把「看起来有钱」当成「真的有价值」的错觉——两百多家公司的帝国建在借来的钱上，一名核数师被杀，一家国家银行几近崩溃。' },
  },
  {
    path: '/notes/modern-finance-ponzi',
    priority: '0.7',
    title: { en: 'Is modern finance a Ponzi scheme? | Eden Tan', zh: '现代金融是庞氏骗局吗 | Eden Tan' },
    desc: { en: 'A first-principles comparison of Ponzi schemes, modern money, and debt—and whether debt grows faster than future productive capacity.', zh: '把「庞氏骗局」拆开，逐条对照现代货币与债务：它只沾了一条，真正该问的是债务是否涨得比未来能做出的真东西还快。' },
  },
  {
    path: '/notes/what-is-wealth',
    priority: '0.7',
    title: { en: 'What is wealth, really? | Eden Tan', zh: '财富到底是什么 | Eden Tan' },
    desc: { en: 'A first-principles essay on wealth: money is a ledger, debt sells the future, and wealth may mean control over productive capacity.', zh: '一篇第一性原理长文，把「财富」拆到底：钱只是记账，债务卖的是未来，而未来的财富可能等于你能控制多少生产能力。' },
  },
  {
    path: '/notes/turn-chaos-into-systems',
    priority: '0.7',
    title: { en: 'Turn chaos into systems | Eden Tan', zh: '把混乱变成系统 | Eden Tan' },
    desc: { en: 'Why the value of a system is not automation itself, but making repeated confusion unnecessary.', zh: 'System 的价值不是 automation 本身，而是让同一种混乱不需要发生第二次。' },
  },
  {
    path: '/notes/judgment-is-not-more-information',
    priority: '0.7',
    title: { en: 'Judgment is not knowing more | Eden Tan', zh: '判断不是知道更多 | Eden Tan' },
    desc: { en: 'More data does not automatically create better decisions. Judgment begins by deciding what matters.', zh: '更多 data 不会自动带来更好的决定。判断从决定什么才重要开始。' },
  },
  {
    path: '/notes/human-nature-is-a-design-condition',
    priority: '0.7',
    title: { en: 'Human nature is a design condition | Eden Tan', zh: '人性不是借口，是设计条件 | Eden Tan' },
    desc: { en: 'Good products and systems are designed for real human behavior, not ideal users.', zh: '好的产品与系统应该设计在真实人性上，而不是只适合理想中的用户。' },
  },
  {
    path: '/notes/win-before-you-fight',
    priority: '0.7',
    title: { en: 'Win before you fight | Eden Tan', zh: '先胜后战 | Eden Tan' },
    desc: { en: 'Strategy is deciding which battlefield deserves your effort before entering it.', zh: 'Strategy 是在行动之前先决定，哪个 battlefield 值得你用力。' },
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
      en: 'Life OS | Build the long-term base map, then ask about now',
      zh: 'Life OS | 先建立长期底图，再问当下的问题',
    },
    desc: {
      en: 'A personal system that cross-reads BaZi, I Ching, elemental profiles, and tarot into a traceable base map and action strategy.',
      zh: '一个把八字、易经、元素画像与塔罗记录交叉阅读成同一张可溯源底图的个人系统——元素画像、当前阶段、行动策略，以及可复制的 Agent prompt 包。',
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
      en: 'A living guide for Eden\'s human-and-systems brand: thesis, layout, Home media, typography, voice, visual assets, motion, and implementation rules.',
      zh: '一份持续更新的 Brand Guide，整理 Eden 的人与系统主张、版式、首页媒体、字体、语气、视觉资产、动效和实现规则。',
    },
  },
  {
    path: '/topics',
    priority: '0.7',
    index: false,
    sitemap: false,
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
    path: '/penneys-game',
    priority: '0.6',
    title: {
      en: "Penney's Game | Non-transitive coin game",
      zh: "Penney's Game 硬币骗局 | 非传递性硬币游戏 · 闯关与全球排行榜",
    },
    desc: {
      en: "Play Penney's Game through five levels, a timed ranked mode, a global leaderboard, and a lab with exact Conway leading-numbers probability.",
      zh: "玩 Penney's Game：五关筹码对赌战役、限时盲选排位赛与全球排行榜，以及可以把任意对局跑到 Conway leading-numbers 精确概率的实验室。",
    },
  },
  {
    path: '/conways-game-of-life',
    priority: '0.8',
    title: {
      en: "Conway's Game of Life | Interactive B3/S23 Life Board",
      zh: "Conway's Game of Life | B3/S23 互动生命棋盘",
    },
    desc: {
      en: "An interactive Conway's Game of Life board using B3/S23, with editable cells, live simulation, and classic Glider, R-pentomino, and Pulsar seeds.",
      zh: '一个使用 B3/S23 的二维 Conway 生命棋盘，可编辑细胞、实时演化，并载入 Glider、R-pentomino 与 Pulsar 经典图案。',
    },
  },
  {
    path: '/cellular-automata-lab',
    priority: '0.7',
    title: {
      en: 'Cellular Automata Lab | 256 Elementary Rules',
      zh: 'Cellular Automata Lab | 256 个一维元胞自动机规则',
    },
    desc: {
      en: 'A browser for all 256 elementary cellular automata rules, with live previews, binary readouts, I Ching mappings, and a 16-by-16 rule index.',
      zh: '一个 256 elementary cellular automata rules 浏览器，包含实时预览、二进制读数、易经映射与 16×16 规则索引。',
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

export function localizedCanonicalRoutePath(path: string, language: SeoLanguage): string {
  const canonical = canonicalRoutePath(path);
  return language === 'zh'
    ? canonical === '/' ? '/zh/' : `/zh${canonical}`
    : canonical;
}

export function stripLocaleFromRoutePath(path: string): { path: string; language: SeoLanguage } {
  const normalized = normalizeRoutePath(path);
  if (normalized === '/zh') return { path: '/', language: 'zh' };
  if (normalized.startsWith('/zh/')) {
    return { path: normalizeRoutePath(normalized.slice(3)), language: 'zh' };
  }
  return { path: normalized, language: 'en' };
}

export function routeSeoForPath(path: string): RouteSeo | undefined {
  const normalized = normalizeRoutePath(path);
  return ROUTE_SEO.find((route) => route.path === normalized);
}
