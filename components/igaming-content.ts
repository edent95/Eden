/**
 * `/igaming` copy — shared by the React page (`components/IGamingPage.tsx`) and the
 * static prerender (`seo-static-content.ts`), so the crawlable body cannot drift from
 * what visitors see.
 *
 * The page is an iGaming primer: who sits at the table, the game floor, the words,
 * how money moves, the promotions providers and operators run, and the daily
 * reporting / campaign / CRM workflow Eden ran. By the owner's request it carries no
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

export const IGAMING_PAGE = {
  kicker: L('iGaming · Starter pack', 'iGaming · 入门包'),
  unlocked: L(
    'You got here by finishing ten rounds of the Mini Coin Slot. You have seen the house win. This is how the house actually runs.',
    '你是玩满十局 Mini Coin Slot 才走到这里的。你已经见过庄家赢，这一页讲庄家实际上怎么运作。',
  ),
  claim: L('Put iGaming on the table.', '把 iGaming 摊开在台面上。'),
  standfirst: L(
    'Most people only see the lobby. Behind it sit providers, aggregators, wallets, promotions, and a daily report that decides what the team believes. This is the starter pack, written from the operator’s desk.',
    '大多数人只看到大厅。大厅后面是 provider、aggregator、钱包、促销，以及每天决定团队相信什么的那份日报。这是一份入门包，从 operator 的桌子这边写。',
  ),
  toc: [
    { id: 'starter', label: L('Starter pack', '入门包') },
    { id: 'promotions', label: L('Promotions', '促销类型') },
    { id: 'workflow', label: L('My workflow', '我的工作流程') },
    { id: 'reporting', label: L('Reporting', '报表') },
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

  termsTitle: L('Words you will hear', '会听到的术语'),
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
  trapsTitle: L('Traps I learned to check first', '我学会先查的坑'),
  traps: [
    { title: L('Withdrawals are negative', '提款是负数'), body: L('So net deposit is deposit plus withdrawal. When it matches company win/loss, that is not a bug.', '所以净存款是存款加提款。它和公司输赢一样时，不是 bug。') },
    { title: L('One person, many IDs', '一个人，多个账号'), body: L('Count active members after resolving by user ID, then phone and name, or growth is inflated.', '活跃会员要先按 user ID、再按电话+姓名合并后再数，否则增长会被高估。') },
    { title: L('Brands must stay separate', '品牌要分开算'), body: L('Every join and export stays scoped to one brand, or members get counted twice.', '每一次关联和导出都限定在单一品牌内，否则会员会被重复计算。') },
    { title: L('Cohorts are not transactions', '分群不等于交易明细'), body: L('A recency bucket counts members, not rows. The two tables will not match, and should not.', 'Recency 分组数的是会员，不是交易行。两张表对不上，也本来就不该对上。') },
    { title: L('Good deposits can hide bonus', '好看的存款可能藏着奖金'), body: L('Always read deposit next to bonus ratio before calling a week good.', '说这周好之前，永远把存款和奖金比例放在一起看。') },
  ] as IGamingCard[],

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
  },
  back: L('Back to home', '返回首页'),
};
