/**
 * `/igaming/atlas` — the public, anonymised version of Eden's iGaming knowledge base:
 * eleven method cards around one core skill, the evidence timeline, the seven decision
 * questions, and the consulting services they support. Source of truth is the private
 * knowledge base; this file keeps only the methods. No employer, brand, provider or
 * merchant names, no real rates or terms, no file paths. Prerendered by
 * `seo-static-content.ts`.
 */
export type AtlasLocalized = { en: string; zh: string };
const L = (en: string, zh: string): AtlasLocalized => ({ en, zh });

export type AtlasClusterKey = 'promise' | 'player' | 'partner' | 'evidence';

export type AtlasCard = {
  id: string;
  cluster: AtlasClusterKey;
  title: AtlasLocalized;
  gist: AtlasLocalized;
  picture: AtlasLocalized;
  checks: AtlasLocalized[];
  limit: AtlasLocalized;
};

export const ATLAS_CLUSTERS: Array<{ key: AtlasClusterKey; name: AtlasLocalized; ids: string[] }> = [
  { key: 'promise', name: L('Promises & rules', '承诺与规则'), ids: ['01', '09'] },
  { key: 'player', name: L('Players & service', '玩家与服务'), ids: ['03', '05'] },
  { key: 'partner', name: L('Partners & delivery', '商业与交付'), ids: ['02', '11', '07'] },
  { key: 'evidence', name: L('Data & evidence', 'data 与证据'), ids: ['04', '06', '08', '10'] },
];

export const ATLAS_CARDS: AtlasCard[] = [
  {
    id: '01',
    cluster: 'promise',
    title: L('One offer, every language, the same rule', '一个 promotion，每种语言都是同一条规则'),
    gist: L(
      'A promotion is not a poster. The copy players read, the back-office setup, the support script, the reward calculation and the payout must all say the same thing, in every language.',
      '一项 promotion 不是一张海报。玩家看到的文案、back office 配置、CS 说明、奖励计算与发放，在每一种语言里都必须是同一件事。',
    ),
    picture: L(
      'Think of two coupons: one says "ten purchases in your birthday month", the other "ten purchases in the past year". That is not a translation style; it decides who qualifies. Drafts in three languages can each read smoothly and still disagree on eligibility, game category or percentage.',
      '想象两张优惠券：一张写「生日当月买十次」，另一张写「过去一年买十次」。这不是翻译风格不同，而是决定了谁有资格。三种语言的稿子可以各自都很通顺，却在资格、游戏类别或比例上互相矛盾。',
    ),
    checks: [
      L('Line the languages up field by field: identity and region → start and end → eligibility and exclusions → minimum, cap and calculation base → products and wallets → wagering → claim, verification and payout → expiry and disputes.', '把各语言逐项排在同一行比：campaign 与地区 → 起止时间 → 资格与排除 → 最低金额、上限与计算基数 → 产品与 wallet → wagering requirement → 申请、核验与发放 → 过期与争议。'),
      L('Any difference is a new version with a number, not a quiet edit to one language.', '任何一项不同都记为新版本并编号，不能只悄悄改其中一种语言。'),
      L('"The English version prevails" settles disputes; it does not stop players reading their own language. Fix the text anyway.', '「以英文版为准」只决定争议怎么判，玩家仍按自己的语言理解。文字照样要修到一致。'),
    ],
    limit: L('Built from historical drafts. It shows the drafts disagreed, not that a live page was wrong.', '来自历史草稿。只能说明草稿之间不一致，不代表上线页面出了错。'),
  },
  {
    id: '02',
    cluster: 'partner',
    title: L('"The provider supports it" is only step one', '「provider 支持」只是第一步'),
    gist: L(
      'A feature existing is not the same as it being usable. Ask separately: does the current integration support it, is this merchant entitled, which placement or time slot does it need, can the commercial terms all hold at once, who approves, and who delivers after launch.',
      '功能存在不等于能用。要分开问：现有接入能不能用、这个 merchant 有没有权限、需要哪个位置或时段、商业条件能不能同时成立、谁批准、上线后谁负责兑现。',
    ),
    picture: L(
      'Picture a shopping mall window: two brands both want the single main entrance spot. Each deal is attractive on its own; you still cannot promise both.',
      '想象商场橱窗：两个品牌都要唯一的正门位置。各自的条件都很划算，你还是不能两个都答应。',
    ),
    checks: [
      L('Keep one condition sheet per offer: provider and product, mechanic, technical dependency, merchant eligibility, placement, cost, validity, approver, delivery status.', '每个方案一张条件表：provider 与产品、campaign 机制、技术依赖、merchant 资格、展示资源、成本、有效期、批准人、交付状态。'),
      L('A blank field is "unknown", never "allowed by default".', '空白字段是「未知」，不是「默认允许」。'),
      L('Two offers that need the same exclusive slot are decided together, before anyone promises either.', '争同一个排他位置的两个方案要放在一起决定，在任何一方承诺之前。'),
    ],
    limit: L('The allocation tool behind this card was a prototype; it did not cover every contract.', '这张卡背后的分配工具是 prototype，没有覆盖所有合同。'),
  },
  {
    id: '03',
    cluster: 'player',
    title: L('Define the player state before you message anyone', '先定义 user 状态，再决定要不要联系'),
    gist: L(
      'Registered, first deposit, active, gone quiet, asking for help: these are different events. "Do not contact" is a valid branch, not a failure.',
      '注册、FTD、活跃、长期未回访、提出服务问题，是不同的事件。「不联系」也是一个正确的分支，不是失败。',
    ),
    picture: L(
      'Journey maps that put the observation window, email events, support follow-up and rewards on one page turn what each team privately knows into states everyone can discuss.',
      '把观察窗口、邮件事件、CS 跟进和奖励画在同一张图上，就把各团队各自掌握的信息变成了大家能一起讨论的状态。',
    ),
    checks: [
      L('Trigger event and data source.', '触发事件与 data 来源。'),
      L('Observation window and the condition that allows contact.', '观察时间，以及允许联系的条件。'),
      L('What help the player actually needs.', 'user 实际需要什么帮助。'),
      L('The condition that stops contact, the owner, and the next review date.', '停止联系的条件、负责人与下一次复核时间。'),
    ],
    limit: L('Older flows that kept adding offers based on wins and losses are kept only as reflection material, never as a method.', '旧流程里按输赢继续追加 promotion 的节点，只作为反思材料，不作为方法。'),
  },
  {
    id: '04',
    cluster: 'evidence',
    title: L('A report label does not guarantee the formula', 'report 上的名字不保证公式正确'),
    gist: L(
      'Before reading a number, trace its numerator, denominator, currency, time window, sign and raw data range. A column called ROI may not be a profit return at all.',
      '看一个数之前，先追它的分子、分母、币种、时间窗、正负号和原始 data 范围。一栏叫 ROI 的数字，可能根本不是利润回报。',
    ),
    picture: L(
      'Registrations, first deposits, activity, deposits, stakes, rewards and channel cost often sit on one sheet. Ratios get familiar names; month-on-month comparisons quietly include an unfinished month or a second currency.',
      '注册、FTD、活跃、存款、投注、奖励和 channel 成本经常放在同一张表上。比率被安上熟悉的名字；跨月比较悄悄包含了没结束的月份或另一种货币。',
    ),
    checks: [
      L('Metric card: the question it answers, formula, unit and currency, period, de-duplication rule, data owner, and the usual misreading.', 'metric card：回答什么问题、计算式、单位和币种、统计周期、去重规则、data 负责人、常见误读。'),
      L('People are not events, deposits are not revenue, clicks are not first deposits.', '人数不是次数，存款不是收入，点击不是 FTD。'),
      L('Without a control or attribution evidence, do not write "the campaign drove growth".', '没有对照和归因证据，不写「campaign 带来增长」。'),
    ],
    limit: L('A method card. It certifies no historical profit or growth figure.', '这是方法卡，不认证任何历史利润或增长数字。'),
  },
  {
    id: '05',
    cluster: 'player',
    title: L('Wallets, rewards and support: "where is it now?"', 'wallet、奖励与 CS：「现在到哪一步了」'),
    gist: L(
      'For the player a campaign is not finished when the back office is configured. They need to know which wallet holds the money, when the reward lands, why they cannot withdraw yet, and who fixes an error.',
      '对玩家来说，back office 设好了 campaign 也没有结束。他需要知道钱在哪个 wallet、奖励什么时候到、为什么还不能提款、出错了找谁。',
    ),
    picture: L(
      'Page plans split registration, deposit, transfer, withdrawal, bet history and reward status into screens; the support Q&A lists the same moments as complaints. Read together, a marketing promise turns into a chain of player actions and explanations.',
      '页面规划把注册、存款、转点、提款、投注记录、奖励状态拆成一个个页面；CS 问答把同样的时刻列成一条条投诉。两者对照，营销承诺就变成了一连串 user 操作和服务解释。',
    ),
    checks: [
      L('Every important state answers: where am I, what happens next, how long, who can help.', '每个重要状态都回答：我在哪一步、下一步是什么、要等多久、谁能处理。'),
      L('Page text, system status and the support script must match. Internal terms are not answers.', '页面文字、系统状态和 CS 口径要对应；内部术语不是答案。'),
      L('Support scripts state facts the player can check, never unprovable reassurance such as "we are the most trusted".', 'CS script 只写玩家能核实的事实，不写「我们最可信」这类无法证明的安抚。'),
    ],
    limit: L('Shows the requirements existed; it does not prove every screen shipped or lifted conversion.', '说明这些需求存在，不证明每个页面都上线了或提升了 conversion。'),
  },
  {
    id: '06',
    cluster: 'evidence',
    title: L('Channels and content have levels of evidence', 'channel 与内容的证据层级'),
    gist: L(
      'Reach, click, registration, first deposit and long-term activity are different levels. Content is the same: "we tested this" must answer how, when, and where the result is.',
      '触达、点击、注册、FTD、长期活跃是不同层级。内容也一样：写了「我们测试过」，就要说得出怎么测、何时测、结果在哪。',
    ),
    picture: L(
      'Weekly reports mixed paid ads, SMS, messaging apps, email and calls. One page logged bounced email; another separated clicks from registrations. Clean the data before you compare channels.',
      '周报里混着广告、短信、即时通讯、邮件和电话。一页记着退信问题，另一页把点击和注册分开记。先处理 data 质量，再比较 channel。',
    ),
    checks: [
      L('Name the level a number belongs to before comparing two channels.', '比较两个 channel 之前，先说清数字属于哪一层。'),
      L('First-person review claims need a test record behind them.', '第一人称的评测说法，背后要有测试记录。'),
      L('Old channel efficiency is not today\'s channel efficiency.', '过去的 channel 效率不代表今天。'),
    ],
    limit: L('No current keyword or channel research is included here.', '这里没有做当前的关键词或 channel 研究。'),
  },
  {
    id: '07',
    cluster: 'partner',
    title: L('Cross-team delivery: every hand-off must be checkable', '跨团队交付：每个交接点都要能验证'),
    gist: L(
      'From idea to something a player can claim, content, calculation, design, back office, support, payments and the public page hand over in order. Each hand-off needs a verifiable input and a done state.',
      '从想法到玩家能领取，内容、计算、设计、back office、CS、支付和对外页面要按顺序交接。每个交接点都要有可验证的输入和完成状态。',
    ),
    picture: L(
      'A monthly routine ran research → calculation → copy → design → upload → back-office setup, with support, payments, third parties or logistics depending on the reward. Exhibition checklists put materials, site, video, owner and deadline on one page.',
      '月度流程是研究 → 计算 → 写稿 → 设计 → 上传 → back office 设置，再按奖励类型交给 CS、支付、第三方或物流。展会清单把物料、网站、视频、负责人和截止日放在一页。',
    ),
    checks: [
      L('Approved rule version and artwork version.', '已批准的规则版本与图文版本。'),
      L('Back-office setup, test account and test result.', 'back office 设置、test account 与测试结果。'),
      L('Support explanation, payout owner, exception handling, end or take-down time.', 'CS 解释、发放责任人、异常处理、结束或撤下时间。'),
      L('One field unconfirmed means not launched. No "close enough".', '有一项没确认就是没上线，不凭「差不多」宣布上线。'),
    ],
    limit: L('Checklists show how work was organised, not commercial results.', '清单说明工作怎么组织，不代表商业结果。'),
  },
  {
    id: '08',
    cluster: 'evidence',
    title: L('A prototype is not a result', 'prototype 不等于成果'),
    gist: L(
      'Plan, working prototype, approved rule, live record and checked result are five different kinds of evidence. A prototype is valuable because it exposes conflicts before money is spent; it is still not an outcome.',
      '计划、可操作 prototype、获批规则、上线记录、核对过的结果，是五种不同的证据。prototype 的价值在于花钱之前就暴露冲突，但它本身不是成果。',
    ),
    picture: L(
      'A prototype can show cost and reward maths, sharing and a mini-game while its starting balance and thresholds disagree and its back-office binding is still a TODO. A landing brief asked for a participant counter that always went up. Both are lessons in stopping unsupported numbers before launch.',
      '一个 prototype 可以展示成本与奖励计算、分享机制和小游戏，同时起始余额和门槛互相矛盾、back office 绑定还是 TODO。一份 landing page 需求要求展示只会往上涨的参与人数。两者都是「上线前挡住无来源数字」的教材。',
    ),
    checks: [
      L('Evidence ladder: idea → prototype → approved rule → live record → checked result.', '证据梯度：想法 → prototype → 获批规则 → 上线记录 → 核对过的结果。'),
      L('Without a live record, call it a design or a prototype.', '没有上线记录，就只称「设计」或「prototype」。'),
      L('A number without a source never becomes social proof.', '没有来源的数字，不当作社会证明展示。'),
    ],
    limit: L('Only the last rung allows careful talk of impact, and even then correlation is not causation.', '只有最后一级才能谨慎谈影响，而且相关不等于因果。'),
  },
  {
    id: '09',
    cluster: 'promise',
    title: L('Wheels and red packets: price the expected cost first', '转盘与红包：上线前先算期望成本'),
    gist: L(
      'A spin-the-wheel or lucky-draw campaign is a probability table, not a fun banner. Before launch, know the expected cost of one entry, whether the top prize will really be drawn, and whether the worst case breaks the budget.',
      '转盘、红包、抽奖不是好玩的海报，而是一张概率表。上线前要知道每次参与的期望成本、头奖会不会真的被抽到、最坏情况会不会击穿预算。',
    ),
    picture: L(
      'Like a scratch card: printing "phone" on one prize does not mean stocking one phone, but at 0.5% with a thousand players a day, that is five phones a day.',
      '像刮刮卡：印一个「手机」大奖不代表只准备一部；概率 0.5%、一天一千人刮，就是一天五部。',
    ),
    checks: [
      L('Probabilities add up to 100%, including "try again".', '各格概率加起来是 100%，包括「谢谢参与」。'),
      L('Expected cost = Σ(prize × probability) × expected entries.', '期望成本 = Σ(奖额 × 概率) × 预计参与次数。'),
      L('Cap the top prize or accept that it will be won; never advertise a prize nobody can draw.', '头奖设数量上限，或接受它真会出现；不要宣传一个永远抽不到的奖。'),
      L('When stage odds change, the player-facing rules change with them.', '分阶段调概率时，玩家看到的规则同步更新。'),
    ],
    limit: L('A cost model only. It is not advice on making people deposit more, and draw promotions are regulated differently by market.', '只讲成本模型，不讲怎样让人多充值；有奖促销在不同市场受不同法规约束。'),
  },
  {
    id: '10',
    cluster: 'evidence',
    title: L('The structure of a brand health check', '品牌运营体检的结构'),
    gist: L(
      'Diagnosing a brand runs in one order: current data → segments → operations experience → ranked recommendations → timeline and team KPIs. Every page answers one decision.',
      '诊断一个品牌按固定顺序：现状 data → 分段 → 运营体验 → 排序后的建议 → 时间线与各团队 KPI。每一页回答一个决定。',
    ),
    picture: L(
      'A fifty-page review looked at two markets separately: registration versus first deposit, unique depositors, deposits and withdrawals, game-type preference and contribution, spending power, segment call lists, promotion results, and processing times, then proposed channels, site changes, promotions and KPIs per team.',
      '一份五十多页的报告把两个市场分开看：注册与 FTD、独立存款人数、存提款、游戏类型偏好与贡献、消费力、segment 名单、促销结果、处理时长，再提出 channel、网站、促销建议和各团队 KPI。',
    ),
    checks: [
      L('Current state: where does the funnel drop most?', '现状：funnel 哪一段掉得最多？'),
      L('Segments: which markets, products and players carry the value?', '分段：哪些市场、产品、user 贡献主要价值？'),
      L('Experience: deposit and withdrawal times, top support questions.', '体验：存提款时长、CS 高频问题。'),
      L('Five to eight recommendations ranked by impact and cost, each with an owner and a KPI.', '按影响和成本排序的五到八条建议，每条有负责人和 KPI。'),
    ],
    limit: L('"Healthy" thresholds in old reports had no source and are not industry benchmarks. Tactics aimed at players who are losing are blocked, not reused.', '旧报告里的「健康线」没有来源，不是行业基准。针对输钱玩家的打法要挡掉，不复用。'),
  },
  {
    id: '11',
    cluster: 'partner',
    title: L('Six offers in, two offers out', '六选二：别把所有 promotion 都给 merchant'),
    gist: L(
      'When a provider hands over six promotion offers, pass two to the merchant. Too many options and the merchant stalls, or says yes to everything and executes none of it well.',
      'provider 给了六个 promotion offer，只挑两个给 merchant。选项太多，merchant 会拖着不决定，或者全部想要、最后哪个都做不好。',
    ),
    picture: L(
      'A menu with sixty dishes freezes the table; a waiter who recommends two signatures gets an order. The person curating does half the merchant\'s thinking for them.',
      '六十道菜的菜单让人点不下去；服务员推荐两道招牌，客人很快就决定了。做筛选的人替 merchant 先做掉一半的判断。',
    ),
    checks: [
      L('Fit: the merchant\'s players, market and currency.', '合适：merchant 的玩家、市场和货币。'),
      L('Feasible: placement, integration and staff the merchant actually has.', '做得到：merchant 真有的 placement、接入和人手。'),
      L('Compatible: the two do not compete for the same slot, period or players.', '不打架：两个方案不争同一个位置、时段或玩家。'),
      L('Measurable: a clear metric and data source afterwards. Two, not one, so the merchant decides by comparing.', '看得出效果：事后有清楚的指标和 data 来源。给两个而不是一个，让 merchant 在比较中做决定。'),
    ],
    limit: L('Eden\'s own practice, stated first-hand; acceptance rates were not recorded.', 'Eden 本人的做法，本人陈述；当时的采用率没有记录。'),
  },
];

export const ATLAS_ERAS: Array<{ year: string; title: AtlasLocalized; body: AtlasLocalized; ids: string[]; now?: boolean }> = [
  { year: '2020', title: L('Campaign rules in many languages', 'campaign 与多语言规则'), body: L('Campaign collections, multilingual terms and support handling: rich detail, and visible version drift.', 'campaign 汇编、多语言条款与 CS 处理：细节很多，也看得到版本漂移。'), ids: ['01'] },
  { year: '2021', title: L('Agency side', '代理商阶段'), body: L('Serving operator brands as an agency: rebrands, three-language terms and support scripts, reward probability tables, a full brand health check.', '以代理商身份服务 operator 品牌：品牌改版、三语条款与 CS script、奖励概率表、完整的品牌体检报告。'), ids: ['09', '10', '05', '03'] },
  { year: '2022', title: L('Running operations', '运营体系'), body: L('CRM and page flows, monthly routines, weekly reports: acquisition, pages, support, back office and retention joined into one system.', 'CRM 与页面流程、月度流程、周报：把获客、页面、CS、back office 和留存连成一套。'), ids: ['03', '04', '05', '06', '07'] },
  { year: '2024', title: L('Reporting', 'report'), body: L('Monthly reporting and the dimensions behind it.', '月度 report 与它背后的维度。'), ids: ['04'] },
  { year: '2025', title: L('Provider-side B2B', 'B2B provider 推广'), body: L('Provider conditions, merchant offers, promotion prototypes and exhibitions: surfacing conflicts before anyone promises. Six offers in, two out.', 'provider 条件、merchant 方案、推广 prototype 与展会：在承诺之前把冲突摆出来。六选二。'), ids: ['02', '11', '07', '08'] },
  { year: '2026', title: L('From files to a system', '从文件到体系'), body: L('Thousands of old working files reduced to methods, a handbook and consulting work.', '几千份旧工作文件，整理成方法、手册与顾问服务。'), ids: ['08'], now: true },
];

export const ATLAS_STEPS: Array<{ q: AtlasLocalized; a: AtlasLocalized }> = [
  { q: L('Can this offer be promised to players?', '这个 campaign 能对玩家承诺吗？'), a: L('Who can join, in which region and wallet, from when to when, how it is calculated, the cap and exclusions, who pays out and who handles disputes. Compare every language line by line. Outcomes are only three: consistent and approved, go to testing; fields missing, return to the owner; contradictions, pause and name one rule owner. Never guess the approver\'s answer.', '谁能参加、在哪个地区和 wallet、何时开始结束、怎么算、上限和排除、谁发放谁处理争议。各语言逐行对照。结论只有三种：一致且获批，进入测试；缺字段，退回负责人；有矛盾，暂停承诺并指定一位规则负责人裁定。不替批准人猜答案。') },
  { q: L('Is the provider feature really usable?', 'provider 的功能真的能用吗？'), a: L('Does it exist, does the current integration support it, is the merchant entitled, is the placement free, what are cost and validity, who approves? Separate "technically possible" from "commercially promisable". Any unknown stays "to confirm" and nothing is promised.', '功能存在吗、现有接入支持吗、merchant 有权限吗、位置被占了吗、成本和有效期是什么、谁批准？把「技术上可做」和「商业上可答应」分开。任何一项未知就记为待确认，不向客户承诺。') },
  { q: L('What is the next step in this player\'s journey?', '这个 user 下一步是什么？'), a: L('Which verifiable state is the player in, what is the reason to contact, how long is the window, when do we stop, who handles service issues? If the data source, contact condition or stop condition is unclear, do not automate the message.', 'user 处在哪个可验证的状态、联系的理由是什么、观察窗口多长、何时停止、谁处理服务问题？data 来源、联系条件或停止条件说不清，就不要自动发送。') },
  { q: L('Does this report support the conclusion?', 'report 数字能支持这个结论吗？'), a: L('What question does the metric answer; are numerator, denominator, de-duplication, currency, window, cost and refunds consistent? Discuss change only when the definition is traceable; otherwise fix the definition first.', '指标回答什么问题；分子、分母、去重、币种、时间窗、成本和退款是否一致？口径可追溯才讨论变化，否则先修定义。') },
  { q: L('Can this page or prototype count as a result?', '这个页面或 prototype 能当成果吗？'), a: L('Idea, working prototype, approved rule, live, or checked result? Each level needs its own evidence. Contradictory numbers inside a prototype are a finding, not a win.', '是想法、prototype、获批规则、已上线，还是结果已核对？每一级要有自己的证据。prototype 里互相矛盾的数字是一项发现，不是成绩。') },
  { q: L('How do I hand this decision to the next person?', '这个决定怎么交给下一个人？'), a: L('Nine fields: the question, evidence visible then, what was missing, options, trade-off, approver, version adopted, verification result, and the date or condition for review. Keep my recommendation separate from the team\'s decision. Unknown is written as "unknown".', '九项：问题、当时可见的证据、尚缺的信息、可选方案、取舍、批准人、采用版本、验证结果、重审日期或条件。我的建议和团队最终决定分开记。未知就写「未知」。') },
  { q: L('When do I stop digging through old material?', '什么时候停止整理旧资料？'), a: L('When an old draft has no reliable end date, label it "historical terms, current status unverified" and stop. Go back to the original only to publish, review a result or reuse a clause.', '旧稿没有可靠的结束日期，标为「历史条款，现状未核」就停。只有要公开引用、复盘结果或复用条款时，才回到原件核对。') },
];

export const ATLAS_SERVICES: Array<{ name: AtlasLocalized; pain: AtlasLocalized; out: AtlasLocalized[]; time: AtlasLocalized; ids: string[] }> = [
  { name: L('Promotion terms audit', '促销条款体检'), pain: L('Multilingual terms disagree, support cannot explain them, players complain.', '多语言条款不一致、CS 解释不了、玩家投诉。'), out: [L('Clause-by-clause comparison: eligibility, amounts, products, wagering, dates, exclusions', '逐条对照表：资格、金额、产品、turnover、时间、排除'), L('Conflict list and proposed fixes', '冲突清单与修订建议')], time: L('3–5 days per 10 campaigns', '3–5 天 · 每批 10 个 campaign'), ids: ['01', '05', '09'] },
  { name: L('Reporting definitions review', 'report 口径体检'), pain: L('Teams\' numbers never match; ROI and retention mean different things to different people.', '各部门数字对不上，ROI、留存各说各话。'), out: [L('Metric cards: numerator, denominator, currency, window, de-duplication', 'metric card：分子、分母、币种、时间窗、去重'), L('A report structure the next person can use', '下一个人也能用的 report 结构')], time: L('1–2 weeks', '1–2 周'), ids: ['04', '06', '10'] },
  { name: L('Provider offer triage', 'provider 条件梳理'), pain: L('Too many provider incentives, clashing placements, promises nobody can keep.', 'provider 激励太多、placement 冲突、承诺了做不到。'), out: [L('Condition sheet and resource-conflict map', '条件表与资源冲突图'), L('A pre-commitment checklist and the two offers worth taking', '承诺前检查清单，以及值得接的那两个方案')], time: L('1–2 weeks', '1–2 周'), ids: ['02', '07', '11'] },
  { name: L('Brand operations health check', '品牌运营体检'), pain: L('A new brand or a relaunch, and no agreement on what to fix first.', '新品牌或改版，不知道先改什么。'), out: [L('Funnel diagnosis and segments', 'funnel 诊断与 segment'), L('Deposit, withdrawal and support experience', '存提款与 CS 体验'), L('Ranked recommendations with team KPIs', '排序后的建议与各团队 KPI')], time: L('2–4 weeks', '2–4 周'), ids: ['03', '04', '05', '10'] },
];

export const ATLAS_PAGE = {
  back: L('iGaming', 'iGaming'),
  kicker: L('iGaming / Knowledge atlas', 'iGaming / 知识地图'),
  claimLead: L('Before a promise becomes a problem,', '在承诺变成问题之前，'),
  claimFoil: L('find the gaps.', '先找到断点。'),
  standfirst: L(
    'Eleven working methods from operator and provider work. The offers are history. The method still works.',
    '十一个工作方法，来自 operator 与 provider 两端。旧 promotion 已成历史，方法还能用。',
  ),
  ctaPrimary: L('Open the map', '打开地图'),
  ctaSecondary: L('See services', '看服务'),
  ledger: [
    { value: '11', label: L('method cards', '张方法卡') },
    { value: '7', label: L('decision questions', '个决策问题') },
    { value: '6', label: L('years in the files', '年的工作资料') },
    { value: '4', label: L('consulting services', '项顾问服务') },
  ],
  core: L('Shared facts', '拼出共同事实'),
  sections: {
    map: { kicker: L('01 / Map', '01 / 地图'), title: L('One core. Eleven methods.', '一个核心，十一个方法。'), lede: L('Tap a seal to open a card. Pick a service to see what it uses.', '点圆章打开卡片，点服务看它用到哪几张。') },
    time: { kicker: L('02 / Timeline', '02 / 时间线'), title: L('Six years in the files.', '文件里的六年。'), lede: L('Stages by document date, not a full CV.', '按资料日期排列，不是完整履历。') },
    steps: { kicker: L('03 / Questions', '03 / 七问'), title: L('Seven questions before any decision.', '做决定前，先问这七个问题。'), lede: L('Ask them in order.', '按顺序问。') },
    services: { kicker: L('04 / Services', '04 / 服务'), title: L('Where the methods become work.', '方法变成服务。'), lede: L('Fixed scope. Fixed deliverables.', '固定范围，固定交付。') },
  },
  allServices: L('All', '全部'),
  legendNote: L('Gold dashes join cards used by the same service · numbers match the cards below', '金色虚线连起同一项服务用到的卡 · 编号对应下方卡片'),
  cardLabels: { practice: L('How it shows up', '在工作里的样子'), checks: L('Check before you commit', '承诺前要核对'), limit: L('What this does not prove', '这张卡不能证明什么'), services: L('Used in', '用在哪些服务'), eras: L('From', '出自哪个阶段'), close: L('Close', '关闭') },
  boundaries: L(
    'What I do not take on: tactics aimed at players who are losing, fabricated social proof, legal or licensing opinions, or raw player data. Former employers, brands and providers are never named.',
    '我不接的事：针对输钱玩家的打法、编造的社会证明、法律或牌照意见、玩家原始 data。不点名任何前雇主、品牌或 provider。',
  ),
  next: L('Read the anonymised case studies', '读匿名案例'),
  starter: L('Back to the starter pack', '回到入门包'),
};

/** Every card as plain paragraphs, for the prerendered static body. */
export function atlasCardPlain(card: AtlasCard, lang: 'en' | 'zh'): string[] {
  return [card.gist[lang], card.picture[lang], ...card.checks.map((c) => `• ${c[lang]}`), card.limit[lang]];
}
