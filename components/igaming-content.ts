/**
 * `/igaming` copy — shared by the React page (`components/IGamingPage.tsx`) and the
 * static prerender (`seo-static-content.ts`), so the crawlable body cannot drift from
 * what visitors see.
 *
 * The page is an iGaming primer: who sits at the table, the game floor, the words,
 * how money moves, the promotions providers and operators run, the daily
 * reporting / campaign / CRM workflow Eden ran, the B2B side that sells to operators,
 * and symptom-first troubleshooting. Sections 01 additions, 05 and 06 come from
 * Eden's own starter-pack / B2B / knowledge-base drafts (2026-09-23). By the owner's request it carries no
 * contact details and does not name or link past projects. Workflow facts come from
 * that real work (Transaction + Customer exports, negative withdrawals, brand-scoped
 * joins, recency buckets, 1+1 provider combos); industry numbers are stated as typical
 * ranges, not guarantees.
 */

export type IGamingLocalized = { en: string; zh: string };

const L = (en: string, zh: string): IGamingLocalized => ({ en, zh });

/** Query flag the homepage Mini Coin Slot appends after ten rounds. */
export const IGAMING_UNLOCK_PARAM = 'from';
export const IGAMING_UNLOCK_VALUE = 'coin-slot';

/** Engraved card art keys for the game floor (drawn by `IGamingFloorArt` in components/css-art). */
export type IGamingFloorArtKey = 'slots' | 'live' | 'rng' | 'sports' | 'fishing' | 'lottery';

export type IGamingCard = {
  title: IGamingLocalized;
  body: IGamingLocalized;
  note?: IGamingLocalized;
  art?: { key: IGamingFloorArtKey; label: IGamingLocalized };
};
export type IGamingTerm = { term: string; body: IGamingLocalized };
export type IGamingFlow = { id: string; title: IGamingLocalized; when: IGamingLocalized; steps: IGamingCard[] };
export type IGamingMetric = { name: IGamingLocalized; definition: IGamingLocalized; why: IGamingLocalized };
export type IGamingCallout = { title: IGamingLocalized; body: IGamingLocalized };
export type IGamingPath = { title: IGamingLocalized; steps: IGamingLocalized[] };
export type IGamingRelation = { label: IGamingLocalized; body: IGamingLocalized };
/** A simple table: `head` is the column labels, each row's first cell is the row header. */
export type IGamingTable = { head: IGamingLocalized[]; rows: IGamingLocalized[][] };

/** Route of the full starter pack; `/igaming` itself is the key-points page. */
export const IGAMING_FULL_PATH = 'igaming/full';

export const IGAMING_PAGE = {
  kicker: L('iGaming · Full starter pack', 'iGaming · 完整版入门包'),
  unlocked: L(
    'You got here by finishing ten rounds of the Mini Coin Slot. You have seen the house win. This is how the house actually runs.',
    '你是玩满十局 Mini Coin Slot 才走到这里的。你已经见过庄家赢，这一页讲庄家实际上怎么运作。',
  ),
  claim: L('Put iGaming on the table.', '把 iGaming 摊开在台面上。'),
  standfirst: L(
    'Most people only see the lobby. Behind it sit providers, aggregators, wallets, promotions, a daily report that decides what the team believes, and a whole B2B market selling to the operator. This is the starter pack, written from the operator’s desk.',
    '大多数人只看到大厅。大厅后面是 provider、aggregator、钱包、促销、每天决定团队相信什么的那份日报，还有一整个卖东西给 operator 的 B2B 市场。这是一份入门包，从 operator 的桌子这边写。',
  ),
  toc: [
    { id: 'starter', label: L('Starter pack', '入门包') },
    { id: 'promotions', label: L('Promotions', '促销类型') },
    { id: 'workflow', label: L('My workflow', '我的工作流程') },
    { id: 'reporting', label: L('Reporting', '报表') },
    { id: 'b2b', label: L('B2B', 'B2B') },
    { id: 'troubleshooting', label: L('Troubleshooting', '排查') },
  ],

  /* 01 · Starter pack ------------------------------------------------ */

  starterTitle: L('01 · Starter pack', '01 · 入门包'),
  starterLead: L(
    'Four things to know before any report makes sense: who sits at the table, what is on the floor, the words everyone uses, and where the money goes.',
    '看懂任何报表之前，先知道四件事：谁在桌上、场子里有什么、大家嘴里的术语，以及钱往哪里走。',
  ),

  rolesTitle: L('Who sits at the table', '谁在桌上'),
  roles: [
    {
      title: L('Operator', 'Operator（运营商）'),
      body: L(
        'The brand players see. Owns the player account, the deposits and withdrawals, the promotions, and the customer service.',
        '玩家看到的那个品牌。拥有玩家账户、存提款、促销和客服。',
      ),
    },
    {
      title: L('Game provider', 'Game provider（游戏商）'),
      body: L(
        'The studio that builds the games and runs the RNG and the maths. Usually paid a share of the GGR its games produce.',
        '做游戏、跑 RNG 和数学模型的工作室。通常按它的游戏产生的 GGR 抽成。',
      ),
    },
    {
      title: L('Aggregator', 'Aggregator（聚合商）'),
      body: L(
        'One integration that plugs an operator into many providers through a single wallet API, and takes its own cut.',
        '一次对接，让 operator 通过同一个钱包 API 接上很多 provider，自己也抽一层。',
      ),
    },
    {
      title: L('Platform / back office', '平台 / 后台'),
      body: L(
        'Player accounts, wallet, bonus engine, and the exports the daily report is built from.',
        '玩家账户、钱包、奖金引擎，以及日报要用的那些导出表。',
      ),
    },
    {
      title: L('Payments', '支付'),
      body: L(
        'Deposit and withdrawal channels. Speed of withdrawal is one of the strongest trust signals a brand has.',
        '存款和提款渠道。提款速度是一个品牌最强的信任信号之一。',
      ),
    },
    {
      title: L('Affiliates and agents', '代理与推广'),
      body: L(
        'Bring players in and are paid per first depositor or as a revenue share. They show up in reports as referrers and channels.',
        '把玩家带进来，按首存人数或分成拿钱。在报表里它们是 referrer 和渠道。',
      ),
    },
  ] as IGamingCard[],

  floorTitle: L('The game floor', '场子里有什么'),
  floor: [
    {
      title: L('Slots', '老虎机 Slots'),
      art: { key: 'slots', label: L('Engraved slot machine with three spinning reels', '三条滚轴转动的凹版老虎机') },
      body: L('Most of the catalogue and most of the turnover. Maths set by the provider.', '游戏库和流水的大头。数学模型由 provider 设定。'),
      note: L('RTP typically 94–97%', 'RTP 通常 94–97%'),
    },
    {
      title: L('Live casino', '真人娱乐 Live casino'),
      art: { key: 'live', label: L('Engraved playing cards dealt onto a table edge', '发到桌边的凹版扑克牌') },
      body: L('Real dealers on stream: baccarat, roulette, blackjack, sic bo, game shows.', '真人荷官直播：百家乐、轮盘、21 点、骰宝、游戏秀。'),
      note: L('Baccarat banker edge ≈ 1.06%', '百家乐押庄的庄家优势约 1.06%'),
    },
    {
      title: L('RNG table games', '电子桌游 RNG table'),
      art: { key: 'rng', label: L('Engraved dice tumbling', '翻滚的凹版骰子') },
      body: L('The same table games, dealt by a random number generator instead of a person.', '同样的桌游，由随机数生成器发牌，而不是真人。'),
      note: L('European roulette edge 2.7%', '欧式轮盘优势 2.7%'),
    },
    {
      title: L('Sportsbook', '体育 Sportsbook'),
      art: { key: 'sports', label: L('Engraved football bouncing on a pitch line', '在球场中线上弹跳的凹版足球') },
      body: L('Pre-match and in-play betting. The margin is built into the odds, not into a machine.', '赛前和滚球投注。利润藏在赔率里，而不是机器里。'),
      note: L('Margin priced into odds', '利润算进赔率'),
    },
    {
      title: L('Fishing and arcade', '捕鱼与街机'),
      art: { key: 'fishing', label: L('Engraved fish swimming through a reticle', '游过准星的凹版鱼群') },
      body: L('Shooting-style games popular across Asia; they feel like skill, the maths is still set by the provider.', '在亚洲很流行的射击类游戏；玩起来像技术，数学模型仍由 provider 决定。'),
      note: L('Feels like skill, priced like a slot', '像技术，定价像老虎机'),
    },
    {
      title: L('Lottery and fast games', '彩票与快速游戏'),
      art: { key: 'lottery', label: L('Engraved lottery balls and a crash curve', '凹版彩票球与 crash 曲线') },
      body: L('4D and number draws, plus crash and instant games with rounds that last seconds.', '4D 与数字开奖，以及几秒一局的 crash 和即开游戏。'),
      note: L('Short rounds, high frequency', '局短、频率高'),
    },
  ] as IGamingCard[],

  journeyTitle: L('Follow one player', '跟着一个玩家走一遍'),
  journey: [
    { title: L('Traffic', '流量'), body: L('Arrives from SEO, an affiliate, an ad, or a friend.', '从 SEO、代理、广告或朋友那里来。') },
    { title: L('Register', '注册'), body: L('Opens an account and passes the checks the market requires.', '开户，并通过所在市场要求的验证。') },
    { title: L('First deposit', '首存'), body: L('Becomes an FTD: the first real signal of value.', '成为 FTD，第一个真正有价值的信号。') },
    { title: L('Play', '下注'), body: L('Every bet adds to turnover; results settle into GGR.', '每一注都算进流水，输赢结算成 GGR。') },
    { title: L('Withdraw', '提款'), body: L('Takes money out. How fast it lands decides trust.', '把钱提出去。到账快慢决定信任。') },
    { title: L('Return or churn', '回来或流失'), body: L('Comes back and is retained, or goes quiet and churns.', '回来成为留存，或沉默下去成为流失。') },
  ] as IGamingCard[],
  journeyNote: {
    title: L('Registrations up, FTD flat', '注册涨了，FTD 没动'),
    body: L(
      'Before blaming acquisition, check traffic quality, verification friction, payment success, onboarding, and whether the offer is clear.',
      '先别怪获客。依次查流量质量、验证卡点、支付成功率、新手引导，以及优惠有没有讲清楚。',
    ),
  } as IGamingCallout,

  termsTitle: L('Words you will hear', '会听到的术语'),
  termsLead: L(
    'Learn the words, then confirm how your company defines each one. The same name can hide a different formula.',
    '先学会这些词，再确认你公司怎么定义每一个。同一个名字，背后可能是不同的算法。',
  ),
  terms: [
    { term: 'RTP', body: L('Return to player: the share of all bets a game pays back over the long run. 96% RTP means 4% stays with the house.', '返还率：长期来看游戏把所有投注的多少比例还给玩家。RTP 96% 表示 4% 留给庄家。') },
    { term: 'House edge', body: L('The other side of RTP. Small per bet, certain over volume.', 'RTP 的另一面。每一注很小，量大了就是确定的。') },
    { term: 'Volatility', body: L('How the RTP arrives: many small wins, or long dry spells and rare big hits.', 'RTP 以什么方式到达：很多小赢，还是长时间不中、偶尔大奖。') },
    { term: 'Turnover', body: L('Total amount bet. Also called handle. The same money can be bet many times.', '总投注额，也叫 handle。同一笔钱可以被反复下注很多次。') },
    { term: 'GGR', body: L('Gross gaming revenue: bets minus wins. The game view of “how much we won”.', '博彩毛收入：投注减去派彩。从游戏角度看「我们赢了多少」。') },
    { term: 'NGR', body: L('Net gaming revenue: GGR minus bonus cost and, depending on the contract, other deductions.', '博彩净收入：GGR 减去奖金成本，按合同可能再扣其他项目。') },
    { term: 'Net deposit', body: L('Deposits minus withdrawals. The cash view of “how much we won”.', '存款减提款。从现金角度看「我们赢了多少」。') },
    { term: 'FTD', body: L('First-time depositor. The moment a registration becomes a player.', '首次存款的玩家。注册变成真正玩家的那一刻。') },
    { term: 'Rollover', body: L('Wagering requirement: how many times a bonus must be bet before it can be withdrawn.', '流水要求：奖金要下注多少倍才能提款。') },
    { term: 'Rebate', body: L('A percentage of turnover (or of losses) paid back to the player, usually daily or weekly.', '按流水（或输额）的一定比例返还给玩家，通常按日或按周。') },
    { term: 'Bonus ratio', body: L('Bonus given out compared with deposits. The quickest way to see if promotions are buying growth or burning margin.', '发出的奖金相对存款的比例。最快看出促销是在买增长还是在烧利润。') },
    { term: 'LTV', body: L('Lifetime value: what a player has deposited, withdrawn, and cost in bonus over their whole history.', '终身价值：一个玩家整个历史里的存款、提款和奖金成本。') },
    { term: 'ARPU / ARPPU', body: L('Average revenue per user, and per paying user. Check which revenue and which users the company means.', '每用户平均收入、每付费用户平均收入。先确认公司说的是哪种收入、哪群用户。') },
    { term: 'Active player', body: L('A player who meets the company’s own activity rule. The rule differs everywhere, so ask.', '符合公司自己活跃定义的玩家。每家定义都不同，要问清楚。') },
    { term: 'Retention', body: L('Players who come back or stay active across a defined window.', '在一个限定时间窗口内回来或保持活跃的玩家。') },
    { term: 'CPA', body: L('Cost per acquisition: a fixed payment to an affiliate for each qualifying depositor.', '按获客付费：每带来一个达标的存款玩家，付给代理一笔固定金额。') },
    { term: 'Revenue share', body: L('Commission as an agreed share of a defined revenue. Hybrid deals mix it with CPA.', '按约定比例分一部分定义好的收入。Hybrid 合约把它和 CPA 混着用。') },
    { term: 'Negative carryover', body: L('Whether an affiliate’s negative month is carried into the next. It depends on the contract.', '代理某个月结算为负时，要不要结转到下个月。看合同。') },
    { term: 'KYC', body: L('Know your customer: identity and eligibility checks.', 'Know your customer：身份与资格验证。') },
    { term: 'PSP', body: L('Payment service provider: the rails deposits and withdrawals run on.', '支付服务商：存提款走的那条通道。') },
  ] as IGamingTerm[],

  moneyTitle: L('How money moves', '钱怎么走'),
  money: [
    { title: L('Deposit', '存款'), body: L('Player pays in through a payment channel.', '玩家通过支付渠道入金。') },
    { title: L('Wallet', '钱包'), body: L('Balance sits in the operator wallet, plus any bonus.', '余额进入 operator 钱包，加上奖金。') },
    { title: L('Bets and wins', '投注与派彩'), body: L('Each spin or hand moves money to the provider and back.', '每一转、每一手，钱在 provider 和钱包之间来回。') },
    { title: L('GGR', 'GGR'), body: L('Bets minus wins, per provider and per game.', '投注减派彩，按 provider、按游戏算。') },
    { title: L('Deductions', '扣除'), body: L('Bonus cost, provider share, payment fees, affiliate commission.', '奖金成本、provider 分成、支付手续费、代理佣金。') },
    { title: L('Margin', '利润'), body: L('What is left. Everything above is what the daily report watches.', '剩下的部分。上面每一步都是日报在盯的东西。') },
  ] as IGamingCard[],
  moneyNote: {
    title: L('Deposit ≠ Turnover ≠ GGR', '存款 ≠ 流水 ≠ GGR'),
    body: L(
      'A player can deposit 100 and bet the same balance over and over until turnover reaches 500. Each number answers a different question.',
      '玩家存 100，可以拿同一笔余额反复下注，直到流水到 500。三个数字回答的是三个不同的问题。',
    ),
  } as IGamingCallout,

  riskTitle: L('Controls that sit next to growth', '跟增长放在一起的控制'),
  riskLead: L(
    'Growth needs controls. What is required depends on the jurisdiction and the licence.',
    '增长需要控制。具体要求取决于司法管辖区和牌照。',
  ),
  risk: [
    { title: L('KYC and age checks', 'KYC 与年龄验证'), body: L('Confirm who the player is and that they are allowed to play.', '确认玩家是谁，以及对方是否被允许玩。') },
    { title: L('AML and source of funds', 'AML 与资金来源'), body: L('Anti-money-laundering controls, plus a closer look at where money comes from when required.', '反洗钱控制；需要时再进一步查资金来源。') },
    { title: L('Responsible gambling', '负责任博彩'), body: L('Deposit limits, time-outs, self-exclusion, and the rules that trigger them.', '存款上限、冷静期、自我排除，以及触发它们的规则。') },
    { title: L('Multi-accounting and bonus abuse', '多开与薅奖金'), body: L('One person, many accounts, farming the same welcome offer.', '一个人开多个账号，反复领同一个首存优惠。') },
    { title: L('Payment fraud and chargebacks', '支付欺诈与拒付'), body: L('Stolen cards, disputed deposits, and deposits reversed after play.', '盗卡、争议存款，以及玩完之后被撤回的存款。') },
    { title: L('Collusion and false positives', '串通与误判'), body: L('Players working together at a table, and the honest players a strict rule catches by mistake.', '牌桌上几个人合伙，以及规则太严时误伤的正常玩家。') },
  ] as IGamingCard[],

  firstMonthTitle: L('Your first 30 days', '你的前 30 天'),
  firstMonthLead: L('Build a mental map instead of memorising acronyms.', '先建立一张脑内地图，而不是背缩写。'),
  firstMonth: {
    head: [L('Period', '时间'), L('Focus', '重点'), L('Outcome', '做到什么')],
    rows: [
      [L('Week 1', '第 1 周'), L('Industry, products, player journey', '行业、产品、玩家路径'), L('Explain who does what and trace one player end to end.', '讲得出谁做什么，并把一个玩家从头追到尾。')],
      [L('Week 2', '第 2 周'), L('Money, metrics, promotions', '钱、指标、促销'), L('Read a basic report without mixing up deposit, turnover, and GGR.', '看一份基础报表，不把存款、流水和 GGR 搞混。')],
      [L('Week 3', '第 3 周'), L('Marketing, CRM, affiliates, payments', '营销、CRM、代理、支付'), L('Trace the acquisition and retention funnels.', '追得出获客和留存两条漏斗。')],
      [L('Week 4', '第 4 周'), L('Risk, compliance, reporting, operations, B2B', '风控、合规、报表、运营、B2B'), L('Investigate a simple anomaly and know who owns the next action.', '查一个简单的异常，并知道下一步归谁。')],
    ],
  } as IGamingTable,
  newcomerRule: {
    title: L('The newcomer rule', '新人守则'),
    body: L(
      'When you see a metric, ask: what does it measure, how is it calculated, what period does it cover, and what decision is it supposed to support?',
      '看到一个指标，先问四件事：它量的是什么？怎么算？覆盖哪段时间？它要支持哪个决定？',
    ),
  } as IGamingCallout,

  /* 02 · Promotions -------------------------------------------------- */

  promotionsTitle: L('02 · Promotions', '02 · 促销类型'),
  promotionsLead: L(
    'Two budgets fund promotions. Providers pay to get their games played; operators pay to get players to deposit and stay. Knowing whose money it is tells you how to read the result.',
    '促销由两笔预算支付。Provider 花钱让自己的游戏被玩；operator 花钱让玩家存款并留下来。先知道是谁的钱，才知道结果该怎么看。',
  ),
  providerTitle: L('What providers usually run', 'Provider 通常做的促销'),
  providerPromos: [
    {
      title: L('Tournaments', '锦标赛 Tournament'),
      body: L('A leaderboard over a set period on the provider’s games, ranked by win multiplier, total win, or turnover. Often network-wide across many operators.', '在一段时间内、限定 provider 的游戏上排行榜，按赢分倍数、总赢额或流水排名。常常跨很多 operator 一起跑。'),
      note: L('Read it by: turnover on those games vs the weeks before', '怎么看：这些游戏的流水对比活动前几周'),
    },
    {
      title: L('Cash drops', '随机掉落 Cash drop'),
      body: L('Random cash prizes that land on qualifying bets during the campaign window.', '活动期间，符合条件的投注会随机掉落现金奖。'),
      note: L('Read it by: how many active players took part', '怎么看：多少活跃玩家参与了'),
    },
    {
      title: L('Free spins / free rounds', '免费旋转 Free rounds'),
      body: L('Rounds credited on a specific game, funded by the provider for a launch or used by the operator as a bonus. Winnings usually carry a rollover.', '在指定游戏上发放的免费局数，provider 为新游戏出钱，或由 operator 当奖金用。赢到的钱通常带流水要求。'),
      note: L('Read it by: how many moved on to real-money play', '怎么看：有多少人接着用真钱玩'),
    },
    {
      title: L('Network jackpots', '联网奖池 Jackpot'),
      body: L('A progressive pool shared by many operators. “Must-drop” versions guarantee a win before a set time or amount.', '很多 operator 共享的累积奖池。「必中」版本保证在某个时间或金额前开出。'),
      note: L('Read it by: turnover when the pool is near its drop point', '怎么看：奖池接近必中点时的流水'),
    },
    {
      title: L('New game launches', '新游戏上线'),
      body: L('A package around a release: free rounds, a lobby banner, sometimes a mini tournament.', '围绕新游戏的一整套：免费局、大厅横幅，有时加一个小型锦标赛。'),
      note: L('Read it by: first-week players and whether they stay', '怎么看：第一周玩家数，以及他们有没有留下'),
    },
    {
      title: L('Red packets and festive drops', '红包与节庆掉落'),
      body: L('Angpao-style random rewards around Chinese New Year, Raya, and other festivals, common across Southeast Asia.', '农历新年、开斋节等节庆时的红包式随机奖励，在东南亚很常见。'),
      note: L('Read it by: returning players in the festive week', '怎么看：节庆那一周回来的玩家'),
    },
    {
      title: L('Missions', '任务 Missions'),
      body: L('Complete tasks on named games, such as a number of spins or a win multiplier, to unlock a reward.', '在指定游戏上完成任务（例如转够多少次、赢到多少倍）来解锁奖励。'),
      note: L('Read it by: completion rate and cost per completion', '怎么看：完成率与每次完成的成本'),
    },
    {
      title: L('Placement deals and 1+1 combos', '置顶位交换与 1+1 组合'),
      body: L('Providers fund a bonus in exchange for visibility: a top slot in the lobby, a banner, set campaign text. In a 1+1 combo the player picks a pair of providers, and every provider’s terms have to fit together.', 'Provider 出奖金，换取曝光：大厅置顶位、横幅、指定活动文案。1+1 组合里玩家选一对 provider，而每一家的条款都要能拼在一起。'),
      note: L('Read it by: duplicate claims and clashing top-slot rules before publish', '怎么看：上线前就查重复申领和置顶规则冲突'),
    },
  ] as IGamingCard[],
  operatorTitle: L('What operators run on top', 'Operator 自己加的促销'),
  operatorPromos: [
    { title: L('Welcome bonus', '首存奖金'), body: L('A match on the first deposit, with a rollover.', '首存按比例赠送，带流水要求。') },
    { title: L('Reload', '续存奖金'), body: L('Smaller matches on later deposits to pull players back.', '之后的存款给较小的赠送，把玩家拉回来。') },
    { title: L('Rebate / cashback', '返水 / 返还'), body: L('A slice of turnover or losses paid back daily or weekly.', '按流水或输额的一部分，按日或按周返还。') },
    { title: L('Referral', '推荐奖励'), body: L('A reward when an invited friend makes a first deposit.', '邀请的朋友完成首存后给奖励。') },
    { title: L('VIP tiers', 'VIP 等级'), body: L('Better rebates, faster withdrawals, and a personal host as players climb.', '等级越高，返水越好、提款越快、有专属客服。') },
    { title: L('Check-ins and birthdays', '签到与生日礼'), body: L('Small, regular reasons to log in.', '小而规律的登录理由。') },
  ] as IGamingCard[],

  /* 03 · Workflow ------------------------------------------------------ */

  workflowTitle: L('03 · My workflow', '03 · 我的工作流程'),
  workflowLead: L(
    'This is the loop I ran on the operator side. Three flows, one rule: every decision should trace back to a number someone can check.',
    '这是我在 operator 这边跑的循环。三条流程，一条规则：每个决定都要能追溯到一个别人查得到的数字。',
  ),
  flows: [
    {
      id: 'daily',
      title: L('Daily report', '每日报表'),
      when: L('Every morning', '每天早上'),
      steps: [
        { title: L('Export', '导出'), body: L('Pull the Transaction and Customer sheets from the back office.', '从后台导出 Transaction 和 Customer 两张表。') },
        { title: L('Normalize', '清洗'), body: L('Fix dates and IDs, keep withdrawals as negative values, resolve one person across IDs by user ID, then phone and name.', '统一日期和 ID，提款保留为负数，一个人多个账号时按 user ID、再按电话+姓名合并。') },
        { title: L('Performance', '业绩'), body: L('Deposit, withdrawal, net deposit, and transaction count, daily, weekly, and overall.', '存款、提款、净存款、交易笔数，按日、按周、整体。') },
        { title: L('Members', '会员'), body: L('New and active members, registrations with no deposit yet, login and deposit recency, risk level.', '新会员和活跃会员、注册了还没存款的人、登录与存款 recency、风险等级。') },
        { title: L('Channels and brands', '渠道与品牌'), body: L('Referrer mapping, conversion and ROI per channel, and the same numbers side by side for each brand.', 'Referrer 对应、每个渠道的转化与 ROI，以及各品牌同口径并排比较。') },
        { title: L('Decide', '判断'), body: L('Start from what changed since yesterday, not from data entry. The output is a short action list.', '从「和昨天比哪里变了」开始，而不是从录入开始。产出是一张短短的行动清单。') },
      ],
    },
    {
      id: 'campaign',
      title: L('Campaign launch', '活动上线'),
      when: L('Every new promotion', '每一个新活动'),
      steps: [
        { title: L('Read the deal', '看清合作条件'), body: L('What the provider funds, and what it asks back: top slot, banner, campaign text.', 'Provider 出什么，要回什么：置顶位、横幅、活动文案。') },
        { title: L('Build the combo', '搭组合'), body: L('Check which providers can pair, which are already used, and whether top-slot rules clash.', '查哪些 provider 能配对、哪些已经用过、置顶规则会不会冲突。') },
        { title: L('Write the terms', '写条款'), body: L('Eligible games, rollover, claim limits, dates. Clear enough for support to quote.', '适用游戏、流水、申领上限、日期。写到客服能直接照念。') },
        { title: L('Publish', '上线'), body: L('Banner, placement, and campaign page go live together.', '横幅、位置和活动页一起上线。') },
        { title: L('Track', '跟踪'), body: L('Claims, duplicate claims, and bonus total, day by day.', '每天跟申领数、重复申领和奖金总额。') },
        { title: L('Review', '复盘'), body: L('Bonus ratio and margin against the weeks before. Keep, change, or kill.', '奖金比例和利润对比活动前几周。保留、调整，或砍掉。') },
      ],
    },
    {
      id: 'crm',
      title: L('CRM loop', 'CRM 循环'),
      when: L('Every week', '每周'),
      steps: [
        { title: L('Segment', '分群'), body: L('By risk, tier, login recency, deposit recency, channel, and referrer.', '按风险、等级、登录 recency、存款 recency、渠道和 referrer 分群。') },
        { title: L('Export the list', '导出名单'), body: L('Export the exact filtered list instead of describing it in a meeting.', '直接导出筛好的名单，而不是在会议上口头描述。') },
        { title: L('Act', '执行'), body: L('A message or an offer matched to the segment, such as a reload for players who went quiet.', '按分群配消息或优惠，例如给沉默玩家一个续存奖金。') },
        { title: L('Measure', '衡量'), body: L('The next daily report shows whether the segment came back, and at what bonus cost.', '下一份日报就能看到这群人有没有回来、花了多少奖金。') },
      ],
    },
  ] as IGamingFlow[],

  /* 04 · Reporting ----------------------------------------------------- */

  reportingTitle: L('04 · Reporting', '04 · 报表'),
  reportingLead: L(
    'The daily report is the operation’s memory. These are the numbers it carried, and what each one is for.',
    '日报是整个运营的记忆。下面是它承载的数字，以及每一个用来干什么。',
  ),
  metricsHead: { name: L('Metric', '指标'), definition: L('What it is', '是什么'), why: L('Why it matters', '为什么重要') },
  metrics: [
    { name: L('Deposit / Withdrawal', '存款 / 提款'), definition: L('Money in and money out, per day and per member.', '每天、每个会员的入金和出金。'), why: L('The cash pulse of the brand.', '品牌的现金脉搏。') },
    { name: L('Net deposit', '净存款'), definition: L('Deposit total plus withdrawal total, with withdrawals stored as negatives.', '存款总额加提款总额（提款以负数存储）。'), why: L('The cash view of company win/loss.', '从现金角度看公司输赢。') },
    { name: L('Transaction count', '交易笔数'), definition: L('Number of deposits and withdrawals.', '存款与提款的笔数。'), why: L('Separates many small players from a few large ones.', '区分是很多小玩家还是少数大玩家。') },
    { name: L('Active members', '活跃会员'), definition: L('Members with transactions in the period, resolved across duplicate IDs.', '期间内有交易的会员，跨重复账号合并后计算。'), why: L('Growth that is real, not registrations.', '真实的增长，而不是注册数。') },
    { name: L('No conversion', '未转化'), definition: L('Registered members with no deposit date yet.', '已注册但还没有存款日期的会员。'), why: L('The cheapest audience for a first-deposit push.', '推首存成本最低的一群人。') },
    { name: L('Recency buckets', 'Recency 分组'), definition: L('Members grouped by days since last login and last deposit.', '按距离上次登录、上次存款的天数分组。'), why: L('Shows who is drifting before they are gone.', '在玩家流失前看出谁在走远。') },
    { name: L('Bonus total / ratio', '奖金总额 / 比例'), definition: L('Bonus given out, and bonus compared with deposits.', '发出的奖金，以及奖金相对存款的比例。'), why: L('Whether promotions buy growth or burn margin.', '促销是在买增长，还是在烧利润。') },
    { name: L('Channel ROI', '渠道 ROI'), definition: L('Deposits, withdrawals, bonus, and net result per referrer or channel.', '每个 referrer / 渠道的存款、提款、奖金和净结果。'), why: L('Which sources bring players worth keeping.', '哪些来源带来值得留下的玩家。') },
    { name: L('Brand comparison', '品牌对比'), definition: L('The same metrics side by side for every brand.', '同一套指标，所有品牌并排。'), why: L('One brand’s good week can hide another’s bad one.', '一个品牌的好周可能掩盖另一个品牌的坏周。') },
  ] as IGamingMetric[],
  reportingNote: {
    title: L('GGR dropped. Now what?', 'GGR 掉了，然后呢？'),
    body: L(
      'Check turnover, actives, deposits, FTD, channel mix, provider and game movement, bonus cost, and unusual player results. The number starts the investigation; it does not end it.',
      '依次查流水、活跃、存款、FTD、渠道组合、provider 与游戏变化、奖金成本，以及个别玩家的异常输赢。数字是调查的起点，不是结论。',
    ),
  } as IGamingCallout,
  trapsTitle: L('Traps I learned to check first', '我学会先查的坑'),
  traps: [
    { title: L('Withdrawals are negative', '提款是负数'), body: L('So net deposit is deposit plus withdrawal. When it matches company win/loss, that is not a bug.', '所以净存款是存款加提款。它和公司输赢一样时，不是 bug。') },
    { title: L('One person, many IDs', '一个人，多个账号'), body: L('Count active members after resolving by user ID, then phone and name, or growth is inflated.', '活跃会员要先按 user ID、再按电话+姓名合并后再数，否则增长会被高估。') },
    { title: L('Brands must stay separate', '品牌要分开算'), body: L('Every join and export stays scoped to one brand, or members get counted twice.', '每一次关联和导出都限定在单一品牌内，否则会员会被重复计算。') },
    { title: L('Cohorts are not transactions', '分群不等于交易明细'), body: L('A recency bucket counts members, not rows. The two tables will not match, and should not.', 'Recency 分组数的是会员，不是交易行。两张表对不上，也本来就不该对上。') },
    { title: L('Good deposits can hide bonus', '好看的存款可能藏着奖金'), body: L('Always read deposit next to bonus ratio before calling a week good.', '说这周好之前，永远把存款和奖金比例放在一起看。') },
  ] as IGamingCard[],

  /* 05 · B2B ---------------------------------------------------------- */

  b2bTitle: L('05 · The B2B side', '05 · B2B 这一边'),
  b2bLead: L(
    'Everything above is the operator’s view. Behind it is a second market: companies selling content, platforms, payments, and tools to operators. Here the signed deal is only the start; integration, promotions, and account growth decide whether it becomes a live business.',
    '上面都是 operator 的视角。它背后还有第二个市场：把内容、平台、支付和工具卖给 operator 的公司。在这里，签约只是开始；对接、促销和客户经营，决定它能不能变成真正在跑的生意。',
  ),
  b2bMapTitle: L('Who sells what to whom', '谁卖什么给谁'),
  b2bMap: [
    { title: L('Operator, the buyer', 'Operator（买方）'), body: L('Buys technology, content, payments, and services to run a player-facing brand.', '买技术、内容、支付和服务，用来经营一个面向玩家的品牌。') },
    { title: L('Game provider', 'Game provider（游戏商）'), body: L('Supplies games and the promotional mechanics that come with them.', '供应游戏内容，以及配套的促销机制。') },
    { title: L('Aggregator', 'Aggregator（聚合商）'), body: L('Distributes many providers through one integration layer.', '通过一层对接，分发很多家 provider。') },
    { title: L('Platform / PAM', 'Platform / PAM（平台）'), body: L('Supplies the core: player accounts, wallet, bonus engine, and back office.', '供应核心：玩家账户、钱包、奖金引擎和后台。') },
    { title: L('PSP / payments', 'PSP / 支付'), body: L('Supplies transaction rails and local payment coverage.', '供应交易通道和本地支付覆盖。') },
    { title: L('CRM, data, and SaaS', 'CRM、数据与 SaaS'), body: L('Supplies engagement, analytics, automation, fraud, and operations tooling.', '供应触达、分析、自动化、反欺诈和运营工具。') },
  ] as IGamingCard[],

  dealFlow: {
    id: 'deal',
    title: L('How a deal starts', '一单生意怎么开始'),
    when: L('Problem first, demo later', '先问题，后 demo'),
    steps: [
      { title: L('Market need', '市场需求'), body: L('The operator wants a market, a product, or a capability.', 'Operator 想进一个市场、上一个产品，或补一项能力。') },
      { title: L('Discovery', '了解需求'), body: L('Learn their brands, markets, licences, traffic, stack, and priorities.', '弄清楚对方的品牌、市场、牌照、流量、技术栈和优先级。') },
      { title: L('Fit', '确认匹配'), body: L('Confirm product, technical, and commercial compatibility.', '确认产品、技术和商务三方面都对得上。') },
      { title: L('Demo', '演示'), body: L('Show only the workflows this buyer cares about.', '只演示这个买家在意的流程。') },
      { title: L('Proposal', '方案'), body: L('Scope, commercials, responsibilities, and assumptions.', '范围、商务条件、双方责任和前提假设。') },
      { title: L('Decision', '拍板'), body: L('Business, technical, compliance, and legal stakeholders align.', '业务、技术、合规和法务几方意见对齐。') },
    ],
  } as IGamingFlow,
  dealNote: {
    title: L('Not “Want a demo?”', '别一开口就问「要不要 demo？」'),
    body: L(
      'Ask first: which markets do you operate in, what are you trying to improve, what stack do you run, and what is missing today? Then decide whether a demo is useful.',
      '先问：你们在哪些市场？想改善什么？用什么技术栈？现在缺什么？问完再决定 demo 有没有用。',
    ),
  } as IGamingCallout,

  stakeholdersTitle: L('The client is several people', '「客户」其实是好几个人'),
  stakeholdersLead: L(
    'Each one cares about something different, so each one needs a different demo.',
    '每个人在意的东西不同，所以每个人要看的 demo 也不同。',
  ),
  stakeholders: {
    head: [L('Who', '角色'), L('Cares about', '在意什么'), L('Show them', '给他们看什么')],
    rows: [
      [L('Owner / C-level', '老板 / C-level'), L('Commercial impact, speed, risk, strategic fit', '商业影响、速度、风险、战略契合'), L('Outcome, differentiation, economics, implementation risk', '结果、差异化、账算不算得过来、落地风险')],
      [L('Product', '产品'), L('Content quality, roadmap, player experience', '内容质量、路线图、玩家体验'), L('Catalogue, UX, configuration, roadmap', '游戏库、UX、配置、路线图')],
      [L('Marketing', '营销'), L('Campaigns, visibility, assets, promo mechanics', '活动、曝光、素材、促销机制'), L('Campaign tools, assets, promotion workflow', '活动工具、素材、促销流程')],
      [L('Operations', '运营'), L('Configuration, reporting, support, daily workflow', '配置、报表、支持、日常流程'), L('Back office, reports, controls, support flow', '后台、报表、控制项、支持流程')],
      [L('Tech', '技术'), L('API, integration, environments, reliability', 'API、对接、环境、稳定性'), L('Architecture, API, error handling, environments, monitoring', '架构、API、错误处理、环境、监控')],
      [L('Finance / legal / compliance', '财务 / 法务 / 合规'), L('Pricing, settlement, contract, regulatory fit', '定价、结算、合同、监管契合'), L('Commercial logic, reconciliation, settlement visibility', '商务逻辑、对账、结算透明度')],
    ],
  } as IGamingTable,

  qualifyTitle: L('Qualify before you chase', '先筛选，再追'),
  qualifyLead: L('Not every lead deserves the same time. Six questions sort them.', '不是每条线索都值得花一样的时间。六个问题筛一遍。'),
  qualify: [
    { title: L('Market', '市场'), body: L('Where does the operator actually operate?', '对方实际在哪些市场运营？') },
    { title: L('Licence', '牌照'), body: L('Can the product legally be supplied there?', '产品在那里能合法供应吗？') },
    { title: L('Product fit', '产品匹配'), body: L('Do they need what you sell?', '对方需要你卖的东西吗？') },
    { title: L('Technical fit', '技术匹配'), body: L('Can both stacks integrate?', '两边的技术栈接得上吗？') },
    { title: L('Commercial fit', '商务匹配'), body: L('Is there realistic volume or value?', '有没有实际的量或价值？') },
    { title: L('Timing', '时机'), body: L('An active project, or only information gathering?', '是正在推进的项目，还是只是收集资料？') },
  ] as IGamingCard[],

  commercialTitle: L('How the money is structured', '钱怎么谈'),
  commercialLead: L(
    'Know what creates revenue and what creates cost. The sales deck gets attention; the contract defines reality.',
    '搞清楚什么带来收入、什么带来成本。销售简报吸引注意，合同才定义现实。',
  ),
  commercialModels: [
    { title: L('Revenue share', '分成'), body: L('An agreed percentage of a defined revenue base.', '按约定比例，分一个定义好的收入基数。') },
    { title: L('Fixed fee', '固定费用'), body: L('Recurring or one-off, independent of gaming results.', '按期或一次性收取，跟游戏输赢无关。') },
    { title: L('Setup / integration fee', '接入 / 对接费'), body: L('Charged for onboarding or technical work.', '为接入或技术工作收取。') },
    { title: L('Minimum guarantee', '保底'), body: L('A minimum commercial commitment under agreed terms.', '按约定条款的最低商务承诺。') },
    { title: L('Tiered pricing', '阶梯价'), body: L('Economics change when volume crosses set bands.', '量跨过某个区间，价格就跟着变。') },
    { title: L('Custom deal', '定制方案'), body: L('Hybrids, bundles, and market-specific structures are common.', '混合、打包、按市场定制的结构都很常见。') },
  ] as IGamingCard[],
  contractTitle: L('What the contract must pin down', '合同要钉死的六件事'),
  contract: [
    { title: L('Commercial definition', '商务定义'), body: L('Exactly which number the percentage or fee applies to.', '比例或费用到底作用在哪个数字上。') },
    { title: L('Territory', '地域'), body: L('Approved markets, brands, domains, or entities.', '批准的市场、品牌、域名或主体。') },
    { title: L('Term and renewal', '期限与续约'), body: L('How long it runs, how it renews, how it ends.', '合约多长、怎么续、怎么终止。') },
    { title: L('Payment terms', '付款条款'), body: L('Invoice, currency, settlement, and due dates.', '发票、币种、结算和到期日。') },
    { title: L('SLA', 'SLA'), body: L('Service levels, and who supports what.', '服务水准，以及谁负责支持什么。') },
    { title: L('Liability and compliance', '责任与合规'), body: L('Responsibilities, restrictions, and required controls.', '双方责任、限制条件和必须有的控制。') },
  ] as IGamingCard[],

  integrationFlow: {
    id: 'integration',
    title: L('Integration lifecycle', '对接周期'),
    when: L('Signed does not mean live', '签约不等于上线'),
    steps: [
      { title: L('Kickoff', '启动会'), body: L('Owners, scope, markets, and a target launch date.', '负责人、范围、市场和目标上线日。') },
      { title: L('Documentation', '文档'), body: L('API, credentials, environments, configuration.', 'API、凭证、环境、配置。') },
      { title: L('Development', '开发'), body: L('Both sides build the connections they own.', '双方各自把自己负责的连接做好。') },
      { title: L('Testing / UAT', '测试 / UAT'), body: L('Validate flows, errors, wallet, reporting, and edge cases.', '验证流程、报错、钱包、报表和边界情况。') },
      { title: L('Certification', '认证'), body: L('Complete the required product and compliance checks.', '完成必须的产品与合规检查。') },
      { title: L('Production', '生产上线'), body: L('Deploy, smoke-test, and watch the live environment.', '部署、冒烟测试，并盯住线上环境。') },
    ],
  } as IGamingFlow,

  providerOpsTitle: L('Running a provider relationship', '跟 provider 的日常'),
  providerOps: [
    { title: L('Game catalogue', '游戏目录'), body: L('Titles, IDs, categories, availability.', '游戏名、ID、分类、可用性。') },
    { title: L('RTP and configuration', 'RTP 与配置'), body: L('Approved configurations and the operator’s setup.', '获批的配置，以及 operator 那边的设置。') },
    { title: L('Currency', '币种'), body: L('Supported currencies and denominations.', '支持的币种和面额。') },
    { title: L('Launch calendar', '上线日历'), body: L('New releases and the markets they reach.', '新游戏，以及能在哪些市场上线。') },
    { title: L('Maintenance', '维护'), body: L('Incidents, planned downtime, version changes.', '故障、计划停机、版本更新。') },
    { title: L('Reporting', '报表'), body: L('Turnover, GGR, players, games, and markets, per operator.', '按 operator 看流水、GGR、玩家、游戏、市场。') },
  ] as IGamingCard[],
  aggregatorOpsTitle: L('What an aggregator adds', '多一层 aggregator 意味着什么'),
  aggregatorOpsLead: L('Aggregation simplifies distribution but adds another relationship layer.', '聚合让分发变简单，但也多了一层关系。'),
  aggregatorOps: [
    { title: L('Provider onboarding', 'Provider 接入'), body: L('The aggregator connects and maintains each supplier.', 'Aggregator 负责接上并维护每一家供应商。') },
    { title: L('Operator integration', 'Operator 对接'), body: L('The operator connects once to reach many suppliers.', 'Operator 接一次，就能接到很多供应商。') },
    { title: L('Content mapping', '内容映射'), body: L('Game IDs, categories, metadata, assets.', '游戏 ID、分类、元数据、素材。') },
    { title: L('Commercial routing', '账怎么走'), body: L('The contract decides who bills whom.', '合同决定谁向谁开账单。') },
    { title: L('Incident routing', '故障怎么传'), body: L('Support may pass through the aggregator before it reaches the provider.', '支持请求可能要先经过 aggregator，才到 provider。') },
    { title: L('Market availability', '市场可用性'), body: L('Access still depends on supplier and jurisdiction rules.', '能不能上，仍取决于供应商和当地规则。') },
  ] as IGamingCard[],

  sponsorNote: {
    title: L('Operator asks: “What can you sponsor?”', 'Operator 问：「你们能赞助什么？」'),
    body: L(
      'Before answering, define market, brand, dates, eligible games, mechanic, budget cap, who funds it, assets, reporting, and what success means. Otherwise a “free promotion” becomes an operations problem later.',
      '回答之前，先定下：市场、品牌、日期、适用游戏、机制、预算上限、谁出钱、素材、报表，以及怎样算成功。不然「免费促销」之后就会变成运营问题。',
    ),
  } as IGamingCallout,
  providerCampaignFlow: {
    id: 'provider-campaign',
    title: L('Provider campaign', 'Provider 活动'),
    when: L('Vague ownership breaks good promotions', '归属不清，好活动也会翻车'),
    steps: [
      { title: L('Objective', '目标'), body: L('Launch, exposure, turnover, retention, or reactivation?', '新游戏、曝光、流水、留存，还是召回？') },
      { title: L('Eligibility', '资格'), body: L('Brand, market, player, game, and date rules.', '品牌、市场、玩家、游戏和日期规则。') },
      { title: L('Funding', '出资'), body: L('Who pays, and what is the cap?', '谁出钱，上限多少？') },
      { title: L('Assets', '素材'), body: L('Banners, copy, game links, localisation.', '横幅、文案、游戏链接、本地化。') },
      { title: L('Tracking', '跟踪'), body: L('Agree the success metrics before launch.', '上线前就定好成功指标。') },
      { title: L('Reconciliation', '对账'), body: L('Confirm winners, cost, results, and invoicing afterwards.', '结束后确认中奖名单、成本、结果和开票。') },
    ],
  } as IGamingFlow,

  growthTitle: L('After go-live: grow the account', '上线之后：把客户做大'),
  growthLead: L(
    'A live client is the start of the account, not the end. Pipeline is a sequence of evidence, not optimistic labels, and B2B retention is operational, not only relational.',
    '客户上线是经营的开始，不是结束。Pipeline 是一串证据，不是乐观的标签；B2B 的留存靠运营，不只靠关系。',
  ),
  pipeline: [
    { title: L('Lead', '线索'), body: L('An identifiable potential customer.', '一个认得出来的潜在客户。') },
    { title: L('Qualified', '已筛选'), body: L('Fit and opportunity are credible enough to pursue.', '匹配度和机会可信到值得追。') },
    { title: L('Discovery / demo', '需求 / demo'), body: L('Needs and product fit are being validated.', '正在验证需求和产品匹配。') },
    { title: L('Commercial', '商务'), body: L('Pricing and deal structure are under discussion.', '正在谈价格和合作结构。') },
    { title: L('Contract / integration', '合同 / 对接'), body: L('Legal or technical execution is underway.', '法务或技术执行进行中。') },
    { title: L('Live / expansion', '上线 / 扩展'), body: L('In production, moving into growth and retention.', '已上线，进入增长与留存。') },
  ] as IGamingCard[],
  accountWork: [
    { title: L('Regular check-in', '定期沟通'), body: L('Priorities, issues, and upcoming launches.', '优先级、问题和即将上线的东西。') },
    { title: L('Performance review', '业绩复盘'), body: L('Volume, growth, game mix, campaign results.', '量、增长、游戏组合、活动结果。') },
    { title: L('Escalation', '升级处理'), body: L('Coordinate technical and operational incidents.', '协调技术和运营故障。') },
    { title: L('More content, brands, markets', '更多内容、品牌、市场'), body: L('Grow catalogue adoption, then sister brands and newly approved markets.', '先提高游戏库的使用率，再扩到集团内其他品牌和新批准的市场。') },
    { title: L('Better placement', '更好的位置'), body: L('Earn visibility with evidence, not by asking.', '用数据争取曝光，而不是靠开口要。') },
    { title: L('Cross-sell', '交叉销售'), body: L('Introduce other products only when there is fit.', '只有真的匹配时才推其他产品。') },
  ] as IGamingCard[],

  b2bScoreTitle: L('B2B scorecard', 'B2B 记分卡'),
  b2bScoreLead: L('Different B2B products need different scorecards.', '不同的 B2B 产品，要用不同的记分卡。'),
  b2bScore: [
    { title: L('Revenue', '收入'), body: L('Supplier revenue under the agreed commercial model.', '按约定商务模式算出的供应商收入。') },
    { title: L('Turnover / GGR', '流水 / GGR'), body: L('The operator activity underneath, where relevant.', '底下 operator 的实际活动量（适用时）。') },
    { title: L('Active players', '活跃玩家'), body: L('How many people the supplied content reaches and holds.', '供应的内容触达、留住了多少人。') },
    { title: L('Game / product mix', '游戏 / 产品组合'), body: L('Which products actually create volume.', '到底是哪些产品在贡献量。') },
    { title: L('Operator growth', 'Operator 增长'), body: L('Movement by brand, market, or account.', '按品牌、市场或客户看变化。') },
    { title: L('Campaign lift', '活动增量'), body: L('Agreed campaign metrics against a meaningful baseline.', '约定的活动指标，对比一个有意义的基准。') },
  ] as IGamingCard[],

  techTitle: L('Enough technical language', '够用的技术语言'),
  techLead: L('You do not need to be an engineer, but you must speak enough of the language to route a problem.', '你不必是工程师，但要会说够用的技术语言，才能把问题转给对的人。'),
  techTerms: [
    { term: 'API', body: L('A structured way for systems to request and exchange data.', '系统之间按固定格式请求和交换资料的方式。') },
    { term: 'Webhook', body: L('An event one system sends to another when something happens. Also called a callback.', '某件事发生时，一个系统主动发给另一个系统的通知，也叫 callback。') },
    { term: 'Credential', body: L('The secret key a system uses to prove who it is.', '系统用来证明身份的密钥。') },
    { term: 'Sandbox', body: L('A non-production environment for testing. Also called staging.', '测试用的非生产环境，也叫 staging。') },
    { term: 'Production', body: L('The live environment serving real players and transactions.', '服务真实玩家和交易的线上环境。') },
    { term: 'Seamless wallet', body: L('The operator keeps one balance; the provider debits and credits it bet by bet.', 'Operator 只有一个余额，provider 每一注直接扣款和派彩。') },
    { term: 'Transfer wallet', body: L('Money moves into a separate provider balance before play and back after.', '玩之前把钱转进 provider 的独立余额，玩完再转回来。') },
    { term: 'Round / Txn ID', body: L('The IDs that let two teams find the same bet in two systems.', '让两个团队在两套系统里找到同一注的 ID。') },
    { term: 'Settlement', body: L('When and how a bet’s result is finalised and paid.', '一注的结果什么时候、怎样最终确定并派彩。') },
    { term: 'Error codes', body: L('Logs and codes: the evidence for diagnosing an integration problem.', '日志和错误码：诊断对接问题的证据。') },
  ] as IGamingTerm[],

  incidentFlow: {
    id: 'incident',
    title: L('Incident', '故障处理'),
    when: L('How you behave is part of the product', '出事时的表现，也是产品的一部分'),
    steps: [
      { title: L('Confirm scope', '确认范围'), body: L('One game, provider, brand, market, or everyone?', '一个游戏、一家 provider、一个品牌、一个市场，还是全部？') },
      { title: L('Collect evidence', '收集证据'), body: L('Timestamp, IDs, request, response, and screenshots where useful.', '时间戳、ID、请求、响应，必要时截图。') },
      { title: L('Set severity', '定级'), body: L('Business impact decides urgency.', '按业务影响决定紧急程度。') },
      { title: L('Route to owner', '找到负责人'), body: L('Operator, aggregator, provider, platform, or payments.', 'Operator、aggregator、provider、平台，还是支付。') },
      { title: L('Communicate', '沟通'), body: L('Status, impact, and when the next update comes.', '现状、影响，以及下次什么时候更新。') },
      { title: L('Postmortem', '复盘'), body: L('Root cause, fix, and prevention once resolved.', '解决后写清根因、修复和预防。') },
    ],
  } as IGamingFlow,
  incidentNote: {
    title: L('Never guess during an incident', '故障时不要猜'),
    body: L(
      'Separate confirmed facts, current impact, investigation status, and the next update. Fast communication helps; confident speculation does not.',
      '把已确认的事实、当前影响、排查进度和下次更新分开讲。沟通快有用，笃定地猜没用。',
    ),
  } as IGamingCallout,

  mistakesTitle: L('Busy, but not useful', '看起来很忙，其实没产出'),
  mistakes: [
    L('Pitching before discovery.', '还没了解需求就开始推销。'),
    L('Calling every logo a qualified lead.', '把每个认识的品牌都当成合格线索。'),
    L('Promising technical capability before confirming it.', '技术能力还没确认就先承诺。'),
    L('Launching promotions without tracking or funding rules.', '没有跟踪和出资规则就上活动。'),
    L('Treating a signed contract as revenue already earned.', '把签了的合同当成已经到手的收入。'),
    L('Only contacting clients when you want something.', '只有要东西的时候才联系客户。'),
  ] as IGamingLocalized[],

  firstQuarterTitle: L('Your first 90 days in B2B', '你在 B2B 的前 90 天'),
  firstQuarterLead: L('Become commercially useful without making promises you cannot verify.', '在不乱承诺的前提下，变得对生意有用。'),
  firstQuarter: {
    head: [L('Period', '时间'), L('Focus', '重点'), L('Outcome', '做到什么')],
    rows: [
      [L('Days 1–30', '第 1–30 天'), L('Product, ecosystem, commercial model, terminology', '产品、生态、商务模式、术语'), L('Explain your product, customer, integration, and revenue model without hiding behind jargon.', '不躲在术语后面，讲清楚你的产品、客户、对接方式和收入模式。')],
      [L('Days 31–60', '第 31–60 天'), L('Discovery, demos, pipeline, integration, reporting', '需求了解、demo、pipeline、对接、报表'), L('Run a useful discovery call, tailor a demo, and know where each account really sits.', '开一场有用的需求会，做一场量身定做的 demo，知道每个客户真正走到哪一步。')],
      [L('Days 61–90', '第 61–90 天'), L('Account growth, campaigns, incidents, expansion', '客户增长、活动、故障、扩展'), L('Own follow-ups, coordinate internal teams, and turn live accounts into measurable activity.', '自己跟进、协调内部团队，把已上线的客户变成量得出来的活动。')],
    ],
  } as IGamingTable,
  b2bRule: {
    title: L('The B2B rule', 'B2B 守则'),
    body: L(
      'Your job is not to know every answer at once. It is to understand the question, know who owns the answer, verify it, say it clearly, and move the account forward without creating risk.',
      '你的工作不是马上知道所有答案，而是听懂问题、知道答案归谁、核实、讲清楚，然后在不制造风险的前提下把客户往前推。',
    ),
  } as IGamingCallout,

  /* 06 · Troubleshooting ----------------------------------------------- */

  troubleshootingTitle: L('06 · When a number moves', '06 · 数字动了怎么办'),
  troubleshootingLead: L(
    'Search by symptom, not by terminology. Each path is an order to check things in; each playbook is a checklist that turns knowledge into repeatable work.',
    '按症状查，而不是按术语查。每条路径是检查的先后顺序；每个 playbook 是一张把知识变成可重复工作的清单。',
  ),
  graphTitle: L('One number, many connections', '一个数字，连着很多东西'),
  graphLead: L('A glossary tells you what FTD means. The useful part is what it touches.', '术语表告诉你 FTD 是什么。有用的是它连着什么。'),
  funnel: [L('Traffic', '流量'), L('Registration', '注册'), L('FTD', 'FTD'), L('Deposit', '存款'), L('Turnover', '流水'), L('GGR', 'GGR'), L('NGR', 'NGR')],
  ftdRelations: [
    { label: L('Affected by', '受什么影响'), body: L('KYC, payment success, onboarding.', 'KYC、支付成功率、新手引导。') },
    { label: L('Attributed to', '归因到'), body: L('Affiliate, paid media, SEO, agent.', '代理、付费广告、SEO、agent。') },
    { label: L('Used in', '用在哪里'), body: L('CPA, conversion, acquisition reporting.', 'CPA、转化率、获客报表。') },
    { label: L('Do not confuse with', '别搞混'), body: L('Registration, or a deposit attempt that failed.', '注册，或者一次没成功的存款尝试。') },
  ] as IGamingRelation[],

  symptomsTitle: L('Start from the symptom', '从症状开始查'),
  symptoms: [
    { title: L('FTD suddenly dropped', 'FTD 突然掉了'), steps: [L('Traffic', '流量'), L('Registration', '注册'), L('KYC', 'KYC'), L('Deposit attempts', '存款尝试'), L('Success rate', '成功率'), L('PSP status', 'PSP 状态')] },
    { title: L('GGR suddenly negative', 'GGR 突然变负'), steps: [L('Large winner', '大额赢家'), L('Product', '产品'), L('Game', '游戏'), L('Provider', 'Provider'), L('Turnover', '流水'), L('Settlement', '结算')] },
    { title: L('Game will not launch', '游戏打不开'), steps: [L('Game ID', '游戏 ID'), L('Currency', '币种'), L('Market', '市场'), L('Provider', 'Provider'), L('Maintenance', '维护'), L('Integration', '对接')] },
    { title: L('Promotion not credited', '优惠没到账'), steps: [L('Eligibility', '资格'), L('Requirement', '条件'), L('Game', '游戏'), L('Expiry', '有效期'), L('Bonus engine', '奖金引擎'), L('Player', '玩家')] },
    { title: L('Deposit success dropped', '存款成功率下降'), steps: [L('Method', '支付方式'), L('PSP', 'PSP'), L('Bank response', '银行回应'), L('Market', '市场'), L('Routing', '路由'), L('Incident', '故障')] },
    { title: L('Withdrawal pending', '提款卡住'), steps: [L('KYC', 'KYC'), L('Risk review', '风控审核'), L('Approval', '审批'), L('Method', '支付方式'), L('Processor', '处理方'), L('Communication', '沟通')] },
  ] as IGamingPath[],
  playbooksTitle: L('Playbooks', 'Playbook 清单'),
  playbooks: [
    { title: L('Launch a provider promotion', '上线 provider 活动'), steps: [L('Objective', '目标'), L('Funding', '出资'), L('Games', '游戏'), L('Market', '市场'), L('Dates', '日期'), L('T&C', '条款'), L('Assets', '素材'), L('Tracking', '跟踪'), L('QA', 'QA'), L('Report', '报告'), L('Reconcile', '对账')] },
    { title: L('Launch a new provider', '接入新 provider'), steps: [L('Commercial', '商务'), L('Integration', '对接'), L('Config', '配置'), L('UAT', 'UAT'), L('Metadata', '元数据'), L('Placement', '位置'), L('Smoke test', '冒烟测试'), L('Monitor', '监控')] },
    { title: L('Handle an incident', '处理故障'), steps: [L('Scope', '范围'), L('Evidence', '证据'), L('Severity', '定级'), L('Owner', '负责人'), L('Communication', '沟通'), L('Resolution', '解决'), L('Postmortem', '复盘')] },
    { title: L('Investigate a daily report', '查一份日报'), steps: [L('Compare', '对比'), L('Segment', '分群'), L('Anomaly', '异常'), L('Validate', '验证'), L('Driver', '驱动因素'), L('Action', '行动')] },
    { title: L('CRM campaign QA', 'CRM 活动 QA'), steps: [L('Audience', '受众'), L('Exclusions', '排除名单'), L('Offer', '优惠'), L('Channel', '渠道'), L('Links', '链接'), L('Dates', '日期'), L('Localisation', '本地化'), L('Tracking', '跟踪'), L('Test', '测试')] },
    { title: L('B2B discovery', 'B2B 需求了解'), steps: [L('Market', '市场'), L('Licence', '牌照'), L('Stack', '技术栈'), L('Problem', '问题'), L('Fit', '匹配'), L('Commercials', '商务'), L('Timing', '时机'), L('Next step', '下一步')] },
  ] as IGamingPath[],

  ownersTitle: L('Who owns this?', '这归谁管？'),
  owners: {
    head: [L('Problem', '问题'), L('Primary', '主责'), L('Support', '协助')],
    rows: [
      [L('Withdrawal pending', '提款卡住'), L('Payments / finance', '支付 / 财务'), L('Risk · KYC · support', '风控 · KYC · 客服')],
      [L('Game launch error', '游戏打不开'), L('Product / tech', '产品 / 技术'), L('Provider · aggregator · support', 'Provider · aggregator · 客服')],
      [L('Bonus missing', '奖金没到'), L('CRM / operations', 'CRM / 运营'), L('Platform · support', '平台 · 客服')],
      [L('Provider campaign', 'Provider 活动'), L('Marketing / B2B', '营销 / B2B'), L('Product · CRM · provider', '产品 · CRM · provider')],
      [L('Wrong settlement', '结算错误'), L('Product / operations', '产品 / 运营'), L('Provider · tech · support', 'Provider · 技术 · 客服')],
      [L('Deposit failure', '存款失败'), L('Payments', '支付'), L('PSP · tech · support', 'PSP · 技术 · 客服')],
    ],
  } as IGamingTable,

  closingTitle: L('The edge is maths, not luck.', '优势来自数学，不是运气。'),
  closingBody: L(
    'Every game here has a house edge, so players as a group lose over time. That is exactly why the industry is worth understanding in the open. This page explains how the business runs, not how to win, and it is not an invitation to play. Gambling laws differ by country.',
    '这里每一种游戏都有庄家优势，所以玩家整体长期是输的。正因为这样，这个行业才值得被公开地理解。这一页讲的是生意怎么运作，不是怎么赢，也不是邀请你去玩。各国对博彩的法律不同。',
  ),
  bannerLabels: {
    starter: L('Engraved roulette wheel with 37 pockets on a banknote plate', '钞票版面上的 37 格凹版轮盘'),
    promotions: L('Engraved casino chips shrinking in golden ratio', '按黄金比例递减的凹版筹码'),
    workflow: L('Engraved infinity loop of two hatched rings', '两个排线圆环组成的凹版无限循环'),
    reporting: L('Engraved bar chart in Fibonacci proportion inside a golden rectangle', '黄金矩形里按斐波那契比例排列的凹版柱状图'),
    b2b: L('Engraved pair of meshing gears with 21 and 13 teeth', '21 齿与 13 齿两个咬合的凹版齿轮'),
    troubleshooting: L('Engraved compass rose with a needle searching for north', '指针来回寻找北方的凹版罗盘'),
  },
  sealLabel: L('Engraved guilloché seal with a gold star', '带金色星芒的凹版扭索纹印章'),
  back: L('Back to key points', '返回重点版'),
};


/* ======================================================================
 * `/igaming` — key points. Six sections, three points each, every one
 * opening into the matching section of the full starter pack.
 * ====================================================================== */

export type IGamingSummarySection = {
  /** Anchor id of the matching section on the full page. */
  id: 'starter' | 'promotions' | 'workflow' | 'reporting' | 'b2b' | 'troubleshooting';
  banner: 'table' | 'chips' | 'loop' | 'ledger' | 'gears' | 'compass';
  number: string;
  title: IGamingLocalized;
  line: IGamingLocalized;
  points: IGamingCallout[];
};

export const IGAMING_SUMMARY = {
  kicker: L('iGaming · Key points', 'iGaming · 重点版'),
  claim: IGAMING_PAGE.claim,
  standfirst: L(
    'Six ideas that explain how an iGaming business actually runs. Each one opens into the full starter pack if you want the detail.',
    '六个重点，讲清楚一门 iGaming 生意实际上怎么运作。想看细节，每一节都能点进完整版。',
  ),
  openFull: L('Open the full starter pack', '打开完整版'),
  readSection: L('Read this section', '看这一节完整版'),
  sections: [
    {
      id: 'starter',
      banner: 'table',
      number: '01',
      title: L('Starter pack', '入门包'),
      line: L('Who sits at the table, and where the money goes.', '谁在桌上，钱往哪里走。'),
      points: [
        { title: L('Operator owns the player', 'Operator 拥有玩家'), body: L('Providers own the games; aggregators, platforms, and payments sit in between.', 'Provider 拥有游戏；aggregator、平台和支付夹在中间。') },
        { title: L('Deposit ≠ turnover ≠ GGR', '存款 ≠ 流水 ≠ GGR'), body: L('The same deposit of 100 can be bet until turnover reaches 500.', '同一笔 100 的存款，可以反复下注到流水 500。') },
        { title: L('The edge is built in', '优势是内建的'), body: L('RTP 96% means 4% of all bets stays with the house over time.', 'RTP 96% 表示长期来看所有投注的 4% 留给庄家。') },
      ],
    },
    {
      id: 'promotions',
      banner: 'chips',
      number: '02',
      title: L('Promotions', '促销类型'),
      line: L('Know whose money it is.', '先知道是谁的钱。'),
      points: [
        { title: L('Providers buy play', 'Provider 买的是游戏被玩'), body: L('Tournaments, cash drops, free rounds, and placement deals for their games.', '锦标赛、随机掉落、免费局，以及换置顶位的合作。') },
        { title: L('Operators buy loyalty', 'Operator 买的是留下来'), body: L('Welcome bonus, reload, rebate, referral, and VIP tiers.', '首存奖金、续存、返水、推荐奖励和 VIP 等级。') },
        { title: L('Read it with the bonus ratio', '一定对着奖金比例看'), body: L('Good deposits can hide expensive bonus. Never read one without the other.', '好看的存款可能藏着昂贵的奖金。两个数字永远一起看。') },
      ],
    },
    {
      id: 'workflow',
      banner: 'loop',
      number: '03',
      title: L('My workflow', '我的工作流程'),
      line: L('Every decision traces back to a number someone can check.', '每个决定都要能追溯到一个别人查得到的数字。'),
      points: [
        { title: L('Daily report', '每日报表'), body: L('Export, clean, then start from what changed since yesterday.', '导出、清洗，然后从「和昨天比哪里变了」开始。') },
        { title: L('Campaign launch', '活动上线'), body: L('Terms support can quote, daily claim tracking, then keep, change, or kill.', '条款写到客服能照念，每天盯申领，最后保留、调整或砍掉。') },
        { title: L('CRM loop', 'CRM 循环'), body: L('Segment, export the exact list, act, and measure it in the next report.', '分群、导出确切名单、执行，下一份日报就看结果。') },
      ],
    },
    {
      id: 'reporting',
      banner: 'ledger',
      number: '04',
      title: L('Reporting', '报表'),
      line: L('The daily report is the operation’s memory.', '日报是整个运营的记忆。'),
      points: [
        { title: L('Withdrawals are negative', '提款是负数'), body: L('So net deposit is deposit plus withdrawal, and that is not a bug.', '所以净存款是存款加提款，这不是 bug。') },
        { title: L('Merge before you count', '先合并，再数人'), body: L('Resolve duplicate IDs and keep every brand separate, or growth is inflated.', '先合并重复账号、各品牌分开算，否则增长会被高估。') },
        { title: L('A drop starts the investigation', '数字掉了只是起点'), body: L('Turnover, actives, FTD, channels, games, bonus cost: check before you conclude.', '流水、活跃、FTD、渠道、游戏、奖金成本，查完再下结论。') },
      ],
    },
    {
      id: 'b2b',
      banner: 'gears',
      number: '05',
      title: L('The B2B side', 'B2B 这一边'),
      line: L('Signed does not mean live.', '签约不等于上线。'),
      points: [
        { title: L('Discovery before demo', '先了解，再 demo'), body: L('Ask about markets, goals, stack, and gaps before showing anything.', '先问市场、目标、技术栈和缺口，再决定要不要演示。') },
        { title: L('The client is several people', '「客户」是好几个人'), body: L('Owner, product, marketing, ops, tech, and finance each need a different demo.', '老板、产品、营销、运营、技术、财务，每个人要看的 demo 都不同。') },
        { title: L('The contract defines reality', '合同才定义现实'), body: L('Integration, promotions, and account growth turn it into a live business.', '对接、促销和客户经营，才把它变成在跑的生意。') },
      ],
    },
    {
      id: 'troubleshooting',
      banner: 'compass',
      number: '06',
      title: L('When a number moves', '数字动了怎么办'),
      line: L('Search by symptom, not by terminology.', '按症状查，而不是按术语查。'),
      points: [
        { title: L('FTD dropped', 'FTD 掉了'), body: L('Traffic → registration → KYC → deposit attempts → success rate → PSP.', '流量 → 注册 → KYC → 存款尝试 → 成功率 → PSP。') },
        { title: L('Game will not launch', '游戏打不开'), body: L('Game ID → currency → market → provider → maintenance → integration.', '游戏 ID → 币种 → 市场 → provider → 维护 → 对接。') },
        { title: L('Know who owns it', '先知道归谁管'), body: L('Route to the owner with evidence, then communicate without guessing.', '带着证据找到负责人，沟通时不要猜。') },
      ],
    },
  ] as IGamingSummarySection[],
  fullTitle: L('Want the whole table?', '想看整张台面？'),
  fullBody: L(
    'The full starter pack has every role, term, promotion, workflow step, B2B checklist, troubleshooting path, and playbook behind these six points.',
    '完整版里有这六个重点背后的所有角色、术语、促销、工作流程、B2B 清单、排查路径和 playbook。',
  ),
  closingTitle: IGAMING_PAGE.closingTitle,
  closingBody: IGAMING_PAGE.closingBody,
  back: L('Back to home', '返回首页'),
};
