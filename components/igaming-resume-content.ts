/**
 * `/igaming/resume` — the page Eden sends to recruiters and hiring teams before an
 * interview. The starter pack (`/igaming`, `/igaming/full`) shows what Eden knows;
 * this page answers "what can you build for my company?".
 *
 * Same anonymisation rules as `igaming-cases-content.ts`: no employer, brand,
 * operator, market or partner names, no absolute volumes, budgets or commercial
 * terms. Every figure here is one already published in a case, and links to it.
 * Compensation is deliberately not on the page — that belongs in the conversation.
 * Job titles, dates, location, languages and contact come from Eden's own LinkedIn
 * profile (read 2026-11-18); employers stay unnamed and are described by type.
 * Since 2026-11-18 this is the job-search page (provider-side roles first) and
 * `/igaming` links to it from its first screen.
 */

import type { IGamingLocalized } from './igaming-content';

const L = (en: string, zh: string): IGamingLocalized => ({ en, zh });

/** Where a proof row points. `case:<slug>` → `/igaming/cases/<slug>`, `full:<id>` → `/igaming/full#<id>`. */
export type ResumeHref = `case:${string}` | `full:${string}` | 'etreporthub';

export const IGAMING_RESUME = {
  back: L('iGaming starter pack', 'iGaming 入门包'),
  kicker: L('For hiring teams', '给招聘方'),
  claim: L('Promotions and partner operations, from the provider side.', '做 provider 端的促销与合作方运营'),
  standfirst: L(
    'Account Manager & Promotion Manager at a B2B gaming platform, after operator-side lifecycle marketing. I plan and run promotions across 50+ operators, set up partner accounts, write the T&Cs, and report what each campaign returned.',
    'B2B 游戏平台的 Account Manager & Promotion Manager,之前在 operator 端做生命周期营销。我策划并执行覆盖 50+ 个 operator 的促销，开合作方账号，写条款，再把每个活动的回报报出来。',
  ),
  roles: L(
    'Open to provider-side roles in promotions, account management and partner marketing, and to operator-side CRM and retention.',
    '在找 provider 端的促销、Account Management、合作方营销职位;operator 端的 CRM 与留存也可以。',
  ),
  availability: L('Available now · Penang, Malaysia · remote or hybrid', '可以马上上班 · 马来西亚槟城 · 远程或混合办公'),
  email: 'd.tytern@gmail.com',
  linkedin: 'https://www.linkedin.com/in/edentan95/',
  emailLabel: L('Email me', '写信给我'),
  linkedinLabel: L('LinkedIn', 'LinkedIn'),

  historyTitle: L('Where I have worked', '工作经历'),
  historyHead: [L('When', '时间'), L('Role', '职位'), L('Where', '在哪里')],
  history: [
    {
      when: L('Nov 2024 – Jan 2026', '2024.11 – 2026.01'),
      role: L('Account Manager & Promotion Manager', 'Account Manager & Promotion Manager'),
      where: L('B2B gaming platform, provider side. Promotions for 50+ operators, partner onboarding, T&Cs, go-live coordination, trade shows.', 'B2B 游戏平台,provider 端。50+ 个 operator 的促销、合作方开户、条款、上线协调、展会。'),
    },
    {
      when: L('Mar 2023 – Nov 2024', '2023.03 – 2024.11'),
      role: L('Senior Marketing Specialist', 'Senior Marketing Specialist'),
      where: L('Same group, operator side. Monthly brand reports, segmentation, acquisition, retention and reactivation across three consumer brands.', '同一集团,operator 端。三个品牌的月报、分群、获客、留存与召回。'),
    },
    {
      when: L('Nov 2021 – Jan 2023', '2021.11 – 2023.01'),
      role: L('Digital Marketing Manager', 'Digital Marketing Manager'),
      where: L('Digital agency, Kuala Lumpur. Brand guidelines, promotional collateral, ad budget, sales reporting.', '数字代理商，吉隆坡。品牌规范、推广物料、广告预算、销售报表。'),
    },
    {
      when: L('Jun 2018 – Nov 2020', '2018.06 – 2020.11'),
      role: L('Social Media Marketing Specialist', 'Social Media Marketing Specialist'),
      where: L('iGaming tech company, Penang. End-to-end campaign marketing, content strategy, Facebook ads, performance reports, client pitches.', '槟城的 iGaming 科技公司。端到端活动营销、内容策略、Facebook 广告、成效报告、客户提案。'),
    },
    {
      when: L('2017 – 2018, 2021', '2017 – 2018、2021'),
      role: L('Sales & marketing, then brand manager', '销售与营销，之后做品牌经理'),
      where: L('Two companies in Penang. Digital marketing strategy, content, product portfolios and KPIs.', '槟城两家公司。数字营销策略、内容、产品线与 KPI。'),
    },
  ],
  difference: L(
    'The starter pack shows what I know. This page shows what I would build for you.',
    '入门包展示我懂什么；这一页讲我能替你建起什么。',
  ),

  proofTitle: L('In numbers', '用数字说'),
  proof: [
    {
      value: '7+',
      label: L('years in iGaming', '年 iGaming 经验'),
      note: L('Operator side first, then provider side.', '先在 operator 这边，后到 provider 那边。'),
      href: 'case:operator-to-provider' as ResumeHref,
    },
    {
      value: '+120%',
      label: L('month-on-month FTD', '首存人数月环比'),
      note: L('Observed over a campaign period; several changes ran at once.', '活动期间观察到的结果，同期有多项改动。'),
      href: 'case:ftd-growth' as ResumeHref,
    },
    {
      value: '50+',
      label: L('operators on one promotion', '个 operator 同跑一个活动'),
      note: L('Provider-side coordination: fields, dates, funding, assets.', 'Provider 这边的协调：字段、日期、出资、素材。'),
      href: 'case:provider-promotion-at-scale' as ResumeHref,
    },
    {
      value: 'B2C + B2B',
      label: L('both sides of the deal', '交易的两边都做过'),
      note: L('I know what the operator needs and what the provider sells.', '知道 operator 要什么，也知道 provider 卖什么。'),
      href: 'full:b2b' as ResumeHref,
    },
  ],

  strengthsTitle: L('Why hire me', '为什么找我'),
  strengths: [
    {
      number: '01',
      banner: 'compass' as const,
      title: L('I understand both sides of the business', '我懂这门生意的两边'),
      line: L(
        'Operators buy traffic, content and payments; providers and aggregators sell into them. I have sat on both sides of that table.',
        'Operator 买流量、内容和支付；provider 与 aggregator 卖给他们。这张桌子的两边我都坐过。',
      ),
      points: [
        { title: L('Operator (B2C)', 'Operator(B2C)'), body: L('Acquisition, first deposit, retention, CRM and the daily numbers behind them.', '获客、首存、留存、CRM，以及背后每天的数字。') },
        { title: L('Provider / aggregator (B2B)', 'Provider / aggregator(B2B)'), body: L('Discovery, commercial terms, integration and growing an account after go-live.', '需求了解、商务条款、对接，以及上线后把客户做大。') },
        { title: L('Commercial models', '商业模式'), body: L('Revenue share, CPA and hybrid deals, and what each one rewards.', 'Revenue share、CPA 与混合方案，以及每种方案在鼓励什么。') },
      ],
    },
    {
      number: '02',
      banner: 'gears' as const,
      title: L('I build systems, not just campaigns', '我建系统，不只做活动'),
      line: L(
        'A campaign ends; a system keeps paying. I turn one-off work into templates, trackers and reports the next brand can reuse.',
        '活动会结束，系统会一直回本。我把一次性的工作沉淀成下一个品牌能直接用的模板、追踪表和报表。',
      ),
      points: [
        { title: L('Promotion architecture', '促销架构'), body: L('Layered mechanics and behavioural triggers instead of one generic bonus.', '分层机制加行为触发，而不是一个通用奖金。') },
        { title: L('Reporting', '报表'), body: L('Traffic → registration → FTD → value on one chain, so you can see which layer broke.', '流量 → 注册 → 首存 → 价值放在同一条链上，看得出哪一层断了。') },
        { title: L('Process at scale', '规模化流程'), body: L('One tracker that keeps 50+ operators on the same dates, terms and assets.', '一张表让 50+ 个 operator 对齐同一套日期、条款和素材。') },
      ],
    },
    {
      number: '03',
      banner: 'ledger' as const,
      title: L('I bridge business and technology', '我能在业务和技术之间搭桥'),
      line: L(
        'I talk to marketing, operations, commercial and engineering in their own terms — and I build working tools myself, using AI to move faster.',
        '我能用市场、运营、商务和技术各自的语言沟通，也会自己动手做能用的工具，用 AI 提速。',
      ),
      points: [
        { title: L('Daily report system', '日报系统'), body: L('ETReportHub grew out of real daily-report work: one place for the numbers a team checks every morning.', 'ETReportHub 来自真实的日报工作：把团队每天早上要看的数字放在一个地方。') },
        { title: L('AI-assisted automation', 'AI 辅助自动化'), body: L('Repetitive checks, exports and reports become scripts instead of spreadsheets passed around.', '重复的检查、导出和报表变成脚本，而不是传来传去的表格。') },
        { title: L('This site', '这个网站'), body: L('Designed and built by me, including the starter pack and field notes you can read here.', '由我自己设计和开发，包括这里能读到的入门包和实战案例。') },
      ],
    },
  ],

  mapTitle: L('What you get, and where to check it', '你能得到什么，去哪里验证'),
  mapLine: L('Every row links to the evidence, so you do not have to take my word for it.', '每一行都链到证据，不用只听我说。'),
  mapHead: [L('Area', '领域'), L('What it means for your team', '对你的团队意味着什么'), L('Evidence', '证据')],
  map: [
    {
      area: L('B2C acquisition & retention', 'B2C 获客与留存'),
      value: L('A funnel measured by FTD quality, not traffic or registrations.', '按首存质量衡量的漏斗，而不是看流量或注册数。'),
      evidence: L('Case 01', '案例 01'),
      href: 'case:ftd-growth' as ResumeHref,
    },
    {
      area: L('New-market entry', '进入新市场'),
      value: L('Payments checked first, local channels over translated ads, an owner for every failure path.', '先查支付；用当地渠道而不是翻译广告；每条出错路径都有人负责。'),
      evidence: L('Case 02', '案例 02'),
      href: 'case:new-market-localisation' as ResumeHref,
    },
    {
      area: L('B2B commercial & partnerships', 'B2B 商务与合作'),
      value: L('Discovery → negotiation → integration → account growth, with terms that reward the right behaviour.', '需求了解 → 谈判 → 对接 → 客户成长，条款鼓励对的行为。'),
      evidence: L('Case 04', '案例 04'),
      href: 'case:operator-to-provider' as ResumeHref,
    },
    {
      area: L('Partner coordination at scale', '规模化合作协调'),
      value: L('Many partners launched on the same terms without anything falling through.', '很多合作方按同一套条款上线，不漏一项。'),
      evidence: L('Case 03', '案例 03'),
      href: 'case:provider-promotion-at-scale' as ResumeHref,
    },
    {
      area: L('Data-driven growth', '数据驱动增长'),
      value: L('FTD, GGR, NGR and bonus ratio read together, in a daily report people actually use.', 'FTD、GGR、NGR、奖金占比放在一起看，做成大家真的会用的日报。'),
      evidence: L('Reporting guide', '报表指南'),
      href: 'full:reporting' as ResumeHref,
    },
    {
      area: L('AI-assisted tooling', 'AI 辅助工具'),
      value: L('Reports and checks automated, so the team spends time on decisions.', '报表和检查自动化，团队把时间花在决策上。'),
      evidence: L('ETReportHub', 'ETReportHub'),
      href: 'etreporthub' as ResumeHref,
    },
  ],

  planTitle: L('My first 90 days in a promotions role', '进一个促销岗位，我的头 90 天'),
  planLine: L(
    'A starting shape, not a script. It changes after the first conversations with your team.',
    '这是起点的形状，不是剧本；和你的团队聊过之后会调整。',
  ),
  plan: [
    {
      phase: L('Days 1–30', '第 1–30 天'),
      title: L('Learn the catalogue and the partners', '摸清产品和合作方'),
      items: [
        L('Every live promotion, its terms and its owner, in one tracker', '所有在跑的促销、条款和负责人，放进一张追踪表'),
        L('Which operators bring volume, which need help, and why', '哪些 operator 带量，哪些需要帮忙，为什么'),
        L('A baseline report: participation, turnover and cost per campaign', '一份基准报表：每个活动的参与、流水和成本'),
      ],
    },
    {
      phase: L('Days 31–60', '第 31–60 天'),
      title: L('Run one full campaign cycle', '完整跑一轮活动'),
      items: [
        L('Plan → T&Cs → setup → placement check → go-live → report', '策划 → 条款 → 设置 → 检查版位 → 上线 → 报表'),
        L('Placement and test accounts checked like a player before launch', '上线前像玩家一样检查版位和测试账号'),
        L('Merchant feedback logged, not lost in chat', 'Merchant 的反馈记下来，不散在聊天里'),
      ],
    },
    {
      phase: L('Days 61–90', '第 61–90 天'),
      title: L('Turn it into a system', '做成系统'),
      items: [
        L('Launches turned into templates and checklists the team can repeat', '把上线流程做成团队能重复用的模板和清单'),
        L('A monthly ROI review per campaign type', '每月按活动类型复盘 ROI'),
        L('A shorter path from idea to live', '从想法到上线的路更短'),
      ],
    },
  ],

  workTitle: L('How I work', '我的工作方式'),
  work: [
    { title: L('Remote or hybrid', '远程或混合办公'), body: L('Based in Penang, Malaysia. Used to async work across time zones, with written handovers and clear owners.', '人在马来西亚槟城。习惯跨时区异步协作，书面交接，责任到人。') },
    { title: L('Five languages', '五种语言'), body: L('English, Mandarin, Malay, Cantonese and Hokkien.', '英文、华语、马来文、粤语、福建话。') },
    { title: L('Across functions', '跨职能'), body: L('Marketing, operations, commercial and tech in one conversation, not four handoffs.', '市场、运营、商务、技术在一次对话里谈清楚，而不是交接四次。') },
  ],

  confidentiality: L(
    'Employer, brand and market names and absolute volumes are left out on purpose. I am happy to walk through the detail in an interview, within confidentiality limits.',
    '雇主、品牌、市场名称和绝对数字都特意略去。面试时可以在保密范围内细聊。',
  ),

  closingTitle: L('Next step: a 30-minute call', '下一步：聊 30 分钟'),
  closingBody: L(
    'If this matches what your team needs, email me or message me on LinkedIn and we can find a time.',
    '如果这和你的团队需要的对得上，写信给我或在 LinkedIn 找我，我们约个时间。',
  ),
  openStarter: L('Read the starter pack', '读入门包'),
  openCases: L('Read the field notes', '读实战案例'),
  sealLabel: L('Eden Tan · iGaming', 'Eden Tan · iGaming'),
};
