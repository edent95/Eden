/**
 * `/igaming/resume` — the page Eden sends to recruiters and hiring teams before an
 * interview. The starter pack (`/igaming`, `/igaming/full`) shows what Eden knows;
 * this page answers "what can you build for my company?".
 *
 * Same anonymisation rules as `igaming-cases-content.ts`: no employer, brand,
 * operator, market or partner names, no absolute volumes, budgets or commercial
 * terms. Every figure here is one already published in a case, and links to it.
 * Compensation is deliberately not on the page — that belongs in the conversation.
 * The route is `index: false` / `sitemap: false`: reachable by link only.
 */

import type { IGamingLocalized } from './igaming-content';

const L = (en: string, zh: string): IGamingLocalized => ({ en, zh });

/** Where a proof row points. `case:<slug>` → `/igaming/cases/<slug>`, `full:<id>` → `/igaming/full#<id>`. */
export type ResumeHref = `case:${string}` | `full:${string}` | 'etreporthub';

export const IGAMING_RESUME = {
  back: L('iGaming starter pack', 'iGaming 入门包'),
  kicker: L('For hiring teams', '给招聘方'),
  claim: L('Beyond marketing. From acquisition to market expansion.', '不只做营销：从获客一路做到开拓新市场'),
  standfirst: L(
    '7+ years across B2C and B2B iGaming, combining acquisition, retention, commercial operations and hands-on technical work to help a business grow — especially one entering a new market.',
    '7 年以上 iGaming 经验，B2C 与 B2B 两边都做过：获客、留存、商务运营，加上能自己动手的技术能力，帮一门生意成长，尤其是正在进入新市场的那一种。',
  ),
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

  planTitle: L('If you are entering a new market: my first 90 days', '如果你正要进新市场：我的头 90 天'),
  planLine: L(
    'A starting shape, not a script. It changes after the first conversations with your team.',
    '这是起点的形状，不是剧本；和你的团队聊过之后会调整。',
  ),
  plan: [
    {
      phase: L('Days 1–30', '第 1–30 天'),
      title: L('Map the ground', '摸清地形'),
      items: [
        L('Payment coverage, success rate and local deposit habits', '支付覆盖、成功率与当地存款习惯'),
        L('Local channels, partners and affiliates worth talking to', '值得接触的当地渠道、合作方与 affiliate'),
        L('A baseline funnel and one daily report everyone reads', '一条基准漏斗，加一份所有人都看的日报'),
      ],
    },
    {
      phase: L('Days 31–60', '第 31–60 天'),
      title: L('Build the acquisition network', '搭起获客网络'),
      items: [
        L('First partners live, on CPA / revenue-share terms that fit the market', '首批合作方上线，CPA / revenue share 条款贴合当地'),
        L('Promotions designed around local payment and product habits', '按当地支付与产品习惯设计促销'),
        L('An owner for failed payments, complaints and eligibility questions', '支付失败、投诉、资格问题都有明确负责人'),
      ],
    },
    {
      phase: L('Days 61–90', '第 61–90 天'),
      title: L('Scale what works', '把有效的放大'),
      items: [
        L('Budget moved to channels by FTD quality, not volume', '按首存质量而不是量来分配预算'),
        L('Launches turned into templates the team can repeat', '把上线流程做成团队能重复用的模板'),
        L('A weekly review with commercial, product and operations', '与商务、产品、运营每周一起复盘'),
      ],
    },
  ],

  workTitle: L('How I work', '我的工作方式'),
  work: [
    { title: L('Fully remote', '全远程'), body: L('Used to async work across time zones, with written handovers and clear owners.', '习惯跨时区异步协作，书面交接，责任到人。') },
    { title: L('B2B contract friendly', '可以 B2B 合同合作'), body: L('Comfortable with a retainer plus agreed performance goals.', '可以接受固定月费加双方约定的绩效目标。') },
    { title: L('Across functions', '跨职能'), body: L('Marketing, operations, commercial and tech in one conversation, not four handoffs.', '市场、运营、商务、技术在一次对话里谈清楚，而不是交接四次。') },
  ],

  confidentiality: L(
    'Employer, brand and market names and absolute volumes are left out on purpose. I am happy to walk through the detail in an interview, within confidentiality limits.',
    '雇主、品牌、市场名称和绝对数字都特意略去。面试时可以在保密范围内细聊。',
  ),

  closingTitle: L('Next step: a 30-minute call', '下一步：聊 30 分钟'),
  closingBody: L(
    'If this matches what your team needs, reply to the message that brought you here and we can find a time.',
    '如果这和你的团队需要的对得上，直接回复把你带到这里的那条消息，我们约个时间。',
  ),
  openStarter: L('Read the starter pack', '读入门包'),
  openCases: L('Read the field notes', '读实战案例'),
  sealLabel: L('Eden Tan · iGaming', 'Eden Tan · iGaming'),
};
