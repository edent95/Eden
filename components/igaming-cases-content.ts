/**
 * `/igaming/cases` and `/igaming/cases/:slug` — field notes from Eden's own
 * iGaming work, rewritten from the drafts in `iGaming/`.
 *
 * Anonymisation rules for everything in this file (decided 2026-09-23):
 * no employer, brand, operator, partner or colleague names; no country names;
 * no absolute player counts, budgets or commercial terms. Relative results the
 * owner chose to keep (the +120% month-on-month FTD move, the ~NPR 10M monthly
 * volume) stay, and each case states plainly what it does not prove.
 *
 * These pages are the one place `/igaming` links to a past project: a case may
 * link to `/etreporthub`, which grew out of the same daily-report work. The
 * `/igaming` key-points and full pages still link to no past projects.
 */

import type { IGamingLocalized } from './igaming-content';

const L = (en: string, zh: string): IGamingLocalized => ({ en, zh });

export type CaseBlock =
  | { kind: 'p'; text: IGamingLocalized }
  | { kind: 'h'; text: IGamingLocalized }
  | { kind: 'callout'; title: IGamingLocalized; body: IGamingLocalized }
  /** A → B → C, rendered as engraved pills. */
  | { kind: 'path'; steps: IGamingLocalized[] }
  /** Numbered cards in a row. */
  | { kind: 'chain'; items: Array<{ title: IGamingLocalized; body: IGamingLocalized }> }
  | { kind: 'cards'; items: Array<{ title: IGamingLocalized; body: IGamingLocalized }> }
  | { kind: 'table'; head: IGamingLocalized[]; rows: IGamingLocalized[][] }
  | { kind: 'list'; items: IGamingLocalized[] }
  /** One headline figure with its caveat. */
  | { kind: 'stat'; value: string; label: IGamingLocalized; note: IGamingLocalized };

export type IGamingCase = {
  slug: string;
  number: string;
  /** Section id on `/igaming/full` this case sits closest to. */
  fullSection: 'starter' | 'promotions' | 'workflow' | 'reporting' | 'b2b' | 'troubleshooting';
  banner: 'table' | 'chips' | 'loop' | 'ledger' | 'gears' | 'compass';
  datePublished: string;
  dateModified: string;
  title: IGamingLocalized;
  /** Shorter title for cards and the browser tab. */
  shortTitle: IGamingLocalized;
  tags: IGamingLocalized[];
  standfirst: IGamingLocalized;
  anonymisation: IGamingLocalized;
  blocks: CaseBlock[];
  lessons: IGamingLocalized[];
  limits: IGamingLocalized;
  /** Extra links beyond the matching full-page section. */
  related?: Array<{ href: 'etreporthub'; label: IGamingLocalized }>;
};

export const IGAMING_CASES: IGamingCase[] = [
  {
    slug: 'ftd-growth',
    number: '01',
    fullSection: 'promotions',
    banner: 'chips',
    datePublished: '2026-09-23',
    dateModified: '2026-09-23',
    title: L(
      'Layered promotions and a funnel: +120% month-on-month FTD',
      '促销分层加漏斗思考：首存人数月环比 +120%',
    ),
    shortTitle: L('+120% month-on-month FTD', '首存月环比 +120%'),
    tags: [L('Operator side', 'Operator 这边'), L('Acquisition', '获客'), L('Promotions', '促销'), L('FTD', 'FTD')],
    standfirst: L(
      'An operator-side project. The goal was never more registrations — it was turning more of them into first-time depositors, by treating a promotion as a system rather than an offer.',
      '一个 operator 这边的项目。目标从来不是更多注册，而是让更多注册变成首次存款；做法是把促销当成一套系统，而不是一个优惠。',
    ),
    anonymisation: L(
      'Company, brand, absolute FTD volume, campaign spend and commercial terms are withheld. The +120% month-on-month move is kept because it is part of the original work record.',
      '公司、品牌、首存绝对人数、投放预算与商业条款均不公开。月环比 +120% 保留，因为它是当时工作记录的一部分。',
    ),
    blocks: [
      { kind: 'h', text: L('Registration is not the finish line', '注册不是终点') },
      {
        kind: 'p',
        text: L(
          'The easiest mistake in acquisition is optimising the part of the funnel you can see. A campaign can produce traffic and registrations and still fail commercially, because the player never takes the next step.',
          '获客最容易犯的错，是只优化看得见的那一段漏斗。一个活动可以带来流量和注册，商业上却是失败的——因为玩家没有走下一步。',
        ),
      },
      {
        kind: 'path',
        steps: [L('Traffic', '流量'), L('Registration', '注册'), L('Offer / trigger', '优惠 / 触发'), L('Deposit', '存款'), L('FTD', 'FTD')],
      },
      {
        kind: 'p',
        text: L(
          'So the question stopped being “how do we get more registrations?” and became “how do we improve the path from registration to first deposit without treating every player as if they need the same incentive?”',
          '所以问题不再是「怎么拿到更多注册」，而是「怎么改善从注册到首存这一段，而且不把所有玩家当成需要同一个优惠的人」。',
        ),
      },
      { kind: 'h', text: L('Layer the mechanics around the funnel', '把机制分层套在漏斗上') },
      {
        kind: 'chain',
        items: [
          { title: L('Acquisition', '获客'), body: L('Paid social and brand activity built the top of the funnel; the measure downstream was FTD quality, not traffic.', '付费社媒与品牌动作撑起漏斗顶部；往下看的指标是首存质量，不是流量。') },
          { title: L('Promotion architecture', '促销架构'), body: L('Several mechanics instead of one generic bonus, so different players could enter at different points.', '用多种机制，而不是一个通用奖金，让不同玩家从不同入口进来。') },
          { title: L('Automated free spins', '自动发免费局'), body: L('A delivery system replaced manual handling, so rewards could follow behaviour instead of a person’s queue.', '用发放系统取代人工处理，奖励跟着行为走，而不是排队等人操作。') },
          { title: L('Behavioural triggers', '行为触发'), body: L('Delivery responded to what the player actually did in the funnel.', '发放跟着玩家在漏斗里的真实动作走。') },
          { title: L('Reporting', '报表'), body: L('The movement that counted was registration → FTD, not reach or registration count.', '真正要看的是注册 → 首存这一段，不是曝光或注册数。') },
          { title: L('Repeatability', '可复制'), body: L('The campaign was turned into templates so the next brand did not start from zero.', '把活动沉淀成模板，下一个品牌不用从零开始。') },
        ],
      },
      {
        kind: 'callout',
        title: L('A promotion is not an offer', '促销不是一个优惠'),
        body: L(
          'It is eligibility + trigger + reward + delivery + player action + measurement. Miss any one of those and the mechanic still “exists” while nothing moves.',
          '它是资格 + 触发 + 奖励 + 发放 + 玩家行为 + 衡量。少任何一环，机制照样「存在」，但什么都不会动。',
        ),
      },
      { kind: 'h', text: L('The result', '结果') },
      {
        kind: 'stat',
        value: '100 → 220',
        label: L('Indexed FTD, previous month = 100', '首存指数，上个月 = 100'),
        note: L(
          'A +120% month-on-month increase, shown as an index because absolute volumes are confidential. No fabricated player counts.',
          '也就是月环比 +120%。绝对数字属于商业机密，所以用指数表示，不编造玩家人数。',
        ),
      },
    ],
    lessons: [
      L('FTD is a funnel outcome: acquisition, registration flow, payments, KYC and promotions all move it.', 'FTD 是漏斗的结果：获客、注册流程、支付、KYC 和促销都会影响它。'),
      L('Do not judge a promotion by claims alone. Tie the mechanic to the behaviour it is supposed to change.', '不要只看申领数判断促销。把机制和它要改变的行为对上。'),
      L('Automation matters once promotions scale; manual delivery is where repeatability dies.', '促销一旦规模化，自动化就重要了；人工发放是可复制性死掉的地方。'),
      L('One mechanic is not a strategy. The layer that works is how mechanics, triggers, channels and player stages fit together.', '一个机制不叫策略。真正起作用的是机制、触发、渠道和玩家阶段怎么配合。'),
      L('Build the reusable system after the campaign, while the reasoning is still fresh.', '活动结束后趁记忆还新，把可复用的部分整理出来。'),
    ],
    limits: L(
      'The +120% is an observed campaign-period result, not a controlled experiment. Several acquisition and promotional changes ran at once, so attributing all of it to free spins, one API mechanic or any single change would overstate the evidence.',
      '+120% 是活动期间观察到的结果，不是对照实验。当时获客和促销有多项改动同时在跑，把增长全部归因给免费局、某一个 API 机制或任何单一改动，都超出了证据能支持的范围。',
    ),
    related: [{ href: 'etreporthub', label: L('The reporting habit behind it became ETReportHub', '背后那套报表习惯后来变成 ETReportHub') }],
  },
  {
    slug: 'new-market-localisation',
    number: '02',
    fullSection: 'troubleshooting',
    banner: 'compass',
    datePublished: '2026-09-23',
    dateModified: '2026-09-23',
    title: L(
      'Localisation is not translation: taking a brand into a new market',
      '本地化不是翻译：把一个品牌带进新市场',
    ),
    shortTitle: L('New-market localisation', '新市场本地化'),
    tags: [L('Market launch', '市场启动'), L('Payments', '支付'), L('Community', '社群'), L('Operations', '运营')],
    standfirst: L(
      'Helping an iGaming business enter a new market. The real question was never whether the site had the local language — it was whether a player could actually deposit, and whether anyone was there to catch the problems.',
      '协助一个 iGaming 业务进入新市场。真正的问题从来不是网站有没有当地语言，而是玩家到底能不能顺利存款，以及出了问题有没有人接得住。',
    ),
    anonymisation: L(
      'Brand, partners, commercial terms, country and absolute player data are withheld; the market is called “Market A”. The recorded monthly volume is kept as an order of magnitude.',
      '品牌、合作方、商业条件、国家与绝对玩家数据均不公开，市场统称「市场 A」。当时记录的月交易量按量级保留。',
    ),
    blocks: [
      { kind: 'h', text: L('Six layers, not one', '本地化是六层，不是一层') },
      {
        kind: 'p',
        text: L(
          'Translation is the surface. Underneath it, a market only starts running when payments, local community, acquisition, promotions, operations and data all adapt to what is actually true there.',
          '翻译只是表层。底下还要支付、本地社群、获客、促销、运营和数据都贴合当地的真实情况，一个市场才算开始运转。',
        ),
      },
      {
        kind: 'path',
        steps: [L('Market', '市场'), L('Payments', '支付'), L('Community', '本地社群'), L('Acquisition', '获客'), L('Promotions', '促销'), L('Ops and data', '运营与数据')],
      },
      {
        kind: 'cards',
        items: [
          { title: L('Payments', '支付'), body: L('If a curious player cannot deposit, the traffic and registrations above it are wasted. Coverage, success rate, speed and local habit all matter.', '玩家有兴趣却存不了款，上面的流量和注册就白费了。覆盖、成功率、速度和当地习惯都要看。') },
          { title: L('Local community', '本地社群'), body: L('Trust comes from different places in different markets. Local channels and habits often beat translating the same ad.', '不同市场的信任来源不同。当地渠道和习惯，往往比把同一套广告翻译过去更有效。') },
          { title: L('Acquisition', '获客'), body: L('Registrations alone prove nothing. Follow verification, deposit and whether those players were worth anything later.', '只看注册量说明不了什么。要跟到验证、存款，以及这些玩家后来值不值钱。') },
          { title: L('Promotions', '促销'), body: L('Design them against local payment habits, product preference and budget — not by copying another market’s bonus table.', '按当地支付习惯、产品偏好和预算设计，而不是照搬别的市场的奖金表。') },
          { title: L('Operations', '运营'), body: L('Failed payments, complaints, eligibility questions and withdrawal issues need an owner. Launch day is not the end.', '支付失败、投诉、资格问题、提款问题都要有人负责。上线那天不是结束。') },
          { title: L('Data', '数据'), body: L('Put traffic, registration, FTD, deposits, activity, bonus cost and incidents on one chain, so you can see which layer broke.', '把流量、注册、FTD、存款、活跃、奖金成本和异常放在同一条链上，才看得出是哪一层断了。') },
        ],
      },
      { kind: 'h', text: L('Why payments is the first place I look', '为什么我先查支付') },
      {
        kind: 'p',
        text: L(
          'A newcomer sees FTD drop and blames marketing. But FTD sits at the end of a longer funnel, and most of that funnel has nothing to do with the ad.',
          '新人看到 FTD 掉了，第一反应是怪营销。但 FTD 位于一条更长的漏斗末端，而这条漏斗的大部分跟广告无关。',
        ),
      },
      {
        kind: 'path',
        steps: [L('Traffic', '流量'), L('Registration', '注册'), L('Verification', '验证'), L('Deposit attempt', '存款尝试'), L('Payment success', '支付成功'), L('FTD', 'FTD')],
      },
      {
        kind: 'callout',
        title: L('Stable traffic, falling first deposits', '流量稳定，首存却在掉'),
        body: L(
          'Then the answer is not “ad quality dropped”. Payment methods, success rate, verification friction and onboarding all belong in the investigation first.',
          '这种情况下答案不是「广告质量下降」。支付方式、支付成功率、验证卡点和新手引导，都该先进入排查范围。',
        ),
      },
      { kind: 'h', text: L('The result, and the thing worth keeping', '结果，以及真正值得留下的东西') },
      {
        kind: 'stat',
        value: '≈ NPR 10M',
        label: L('Monthly transaction volume reached in Market A', '市场 A 后来达到的月交易量'),
        note: L(
          'A recorded business outcome, not proof that any single layer caused it: payments, acquisition, promotions, market conditions and execution all moved together.',
          '这是记录下来的业务结果，不代表某一层单独造成了它：支付、获客、促销、市场环境和执行是一起动的。',
        ),
      },
      {
        kind: 'p',
        text: L(
          'What outlasted the market itself was the method. The same sequence was reused to open other markets in the region: not the same ads or the same bonus, but the same questions asked in the same order.',
          '比这个市场活得更久的是方法。同一套顺序后来被复用到同区域的其他市场：复制的不是广告或奖金，而是同样的问题、同样的先后顺序。',
        ),
      },
      {
        kind: 'table',
        head: [L('Layer', '层'), L('The question every new market has to answer again', '每个新市场都要重新回答的问题')],
        rows: [
          [L('Payments', '支付'), L('What do players actually use? What is the success rate? How does withdrawal feel?', '玩家实际用什么？成功率怎样？提款体验怎样？')],
          [L('Channels', '渠道'), L('Where are the users, and which sources bring players worth keeping?', '用户在哪里？哪些来源带来值得留的玩家？')],
          [L('Product', '产品'), L('Which products and games get accepted here?', '哪些产品和游戏在这里更容易被接受？')],
          [L('Promotions', '促销'), L('Which incentive is attractive and still commercially sustainable?', '什么优惠有吸引力，同时商业上撑得住？')],
          [L('Operations', '运营'), L('Who handles problems, and how do they escalate across teams?', '问题谁处理？跨团队怎么升级？')],
          [L('Data', '数据'), L('Which numbers tell you about funnel, player quality and market health?', '用什么指标判断漏斗、玩家质量和市场健康度？')],
        ],
      },
    ],
    lessons: [
      L('Translation is the thinnest layer of localisation.', '翻译是本地化里最薄的一层。'),
      L('Payment reality decides how much of your marketing survives.', '支付的实际情况，决定你的营销有多少能活下来。'),
      L('Trust is local: the channel that works elsewhere may not exist here.', '信任是本地的：别处有效的渠道，这里可能根本不存在。'),
      L('A market is launched when someone owns the problems, not when the ads go live.', '有人接住问题，市场才算启动，不是广告上线那天。'),
      L('The reusable asset is the order of questions, not the campaign.', '可复用的是提问的顺序，不是那个活动。'),
    ],
    limits: L(
      'The recorded volume cannot be used to claim that payment localisation alone produced it, and Market A’s performance does not transfer to other countries. Conditions, channels, product, budget, competition and execution all differ. What travels is the diagnostic framework.',
      '这个交易量不能用来声称「支付本地化单独造成了它」，市场 A 的表现也不能直接套到别的国家。环境、渠道、产品、预算、竞争和执行都不一样。能带走的是那套诊断框架。',
    ),
  },
  {
    slug: 'provider-promotion-at-scale',
    number: '03',
    fullSection: 'promotions',
    banner: 'gears',
    datePublished: '2026-09-23',
    dateModified: '2026-09-23',
    title: L(
      'One promotion, 50+ operators: where the complexity actually comes from',
      '一个活动，50+ operator：复杂度到底从哪里来',
    ),
    shortTitle: L('Promotion across 50+ operators', '50+ operator 的促销协调'),
    tags: [L('Provider side', 'Provider 这边'), L('Promotions', '促销'), L('B2B', 'B2B'), L('Campaign ops', '活动运营')],
    standfirst: L(
      'On the provider side, the same campaign mechanic goes out to many operators at once. The work is not sending it fifty times — it is managing fifty variants without losing track of which one is real.',
      '在 provider 这边，同一个活动机制要同时发给很多 operator。工作不是发五十次，而是管理五十个变体，还要随时知道哪一个是真的能跑。',
    ),
    anonymisation: L(
      'Operator names, the former employer, budgets, commercial terms and internal materials are withheld. “50+” describes the scale of coordination, not a published result.',
      'Operator 名称、前公司、预算、商业条款与内部资料均不公开。「50+」描述的是协调规模，不是公开的业绩结果。',
    ),
    blocks: [
      { kind: 'h', text: L('The same campaign is not the same launch', '同一个活动，不等于同一次上线') },
      {
        kind: 'p',
        text: L(
          'From outside it looks linear: the provider builds the promotion, sends the pack to the operator, the operator publishes it. At scale that picture breaks, because the mechanic is the only part that stays the same.',
          '从外面看，流程是直线的：provider 做好活动，把资料发给 operator，operator 上线。规模一大这张图就崩了，因为保持不变的只有机制本身。',
        ),
      },
      {
        kind: 'path',
        steps: [L('Mechanic', '机制'), L('Operator', 'Operator'), L('Market', '市场'), L('Currency', '币种'), L('Games', '游戏'), L('T&C', '条款'), L('Assets', '素材'), L('Launch', '上线'), L('Report', '报表')],
      },
      {
        kind: 'p',
        text: L(
          'Any field on that chain that is not aligned produces the same outcome: the campaign is “ready” on paper while a player cannot actually take part.',
          '这条链上任何一个字段没对齐，结果都一样：活动在纸面上「已就绪」，玩家实际上却参与不了。',
        ),
      },
      { kind: 'h', text: L('What has to be confirmed per operator', '每个 operator 要确认什么') },
      {
        kind: 'cards',
        items: [
          { title: L('Operator / brand', 'Operator / 品牌'), body: L('Group-level agreement does not mean every brand under it is launching.', '集团层面同意，不等于旗下每个品牌都会上。') },
          { title: L('Market', '市场'), body: L('Which markets take part, and do the games, promotion and terms apply there?', '哪些市场参加？游戏、促销和条款在那里适用吗？') },
          { title: L('Currency', '币种'), body: L('Is the operator’s currency supported, and does the reward value display correctly?', '支持该 operator 的币种吗？奖励价值显示对不对？') },
          { title: L('Eligible games', '适用游戏'), body: L('Which game IDs, and does the operator already have them in the right configuration?', '哪些 game ID？operator 是否已经有这些游戏、配置对不对？') },
          { title: L('Dates', '日期'), body: L('Start, end, time zone and claim window — otherwise “the same day” means two different things.', '开始、结束、时区、领取窗口——否则双方说的「同一天」不是同一段时间。') },
          { title: L('Funding and caps', '出资与上限'), body: L('Who pays, is there a budget pool, an allocation per operator, a campaign cap?', '谁出钱？有没有预算池、每家的额度、活动上限？') },
          { title: L('Max payout and rules', '最高支付与规则'), body: L('Limits and eligibility have to reach the T&C, not just the deal conversation.', '限制和资格要写进条款，不能只停在谈判的对话里。') },
          { title: L('Assets', '素材'), body: L('Banners, sizes, copy, game art, links and localised versions — complete, or the launch slips.', '横幅、尺寸、文案、游戏素材、链接和本地化版本，缺一样上线就要拖。') },
        ],
      },
      { kind: 'h', text: L('Why it turns into a tracker', '为什么最后一定会变成一张表') },
      {
        kind: 'p',
        text: L(
          'With a few operators, chat history and memory are enough. Past a certain number, “I remember he confirmed” stops being a working method, and the only fix is one agreed place where status lives.',
          'Operator 少的时候，聊天记录和记忆够用。过了某个数量，「我记得他确认过」就不再是一种工作方式，唯一的解法是有一个大家都认的状态来源。',
        ),
      },
      {
        kind: 'table',
        head: [L('Operator', 'Operator'), L('Market', '市场'), L('Mechanic', '机制'), L('Assets', '素材'), L('Status', '状态')],
        rows: [
          [L('Operator A', 'Operator A'), L('Market 1', '市场 1'), L('Free spins', '免费局'), L('Ready', '已齐'), L('In QA', 'QA 中')],
          [L('Operator B', 'Operator B'), L('Market 2', '市场 2'), L('Tournament', '锦标赛'), L('Pending', '待补'), L('Waiting', '等待中')],
          [L('Operator C', 'Operator C'), L('Market 1', '市场 1'), L('Cash drop', '随机掉落'), L('Ready', '已齐'), L('Live', '已上线')],
        ],
      },
      {
        kind: 'callout',
        title: L('Structure only, not real operator data', '仅为结构示例，不是真实 operator 数据'),
        body: L(
          'The point is the columns: identity, market, mechanic, assets, status. Coordination points grow faster than operator count, because one operator can bring several brands, markets and currencies.',
          '重点是这几列：身份、市场、机制、素材、状态。协调点的增长比 operator 数量更快，因为一家可能带着好几个品牌、市场和币种。',
        ),
      },
      { kind: 'h', text: L('The two sides are watching different things', '两边看的其实是不同的东西') },
      {
        kind: 'table',
        head: [L('Provider cares about', 'Provider 更关心'), L('Operator cares about', 'Operator 更关心')],
        rows: [
          [L('Game exposure and usage', '游戏曝光与使用'), L('Whether players are actually interested', '玩家有没有兴趣')],
          [L('Turnover and activity on its games', '自己游戏上的流水与活跃'), L('Whether it is worth the placement and resource', '值不值得给版位和资源')],
          [L('New-release promotion', '新游戏推广'), L('Cost, player value, commercial result', '成本、玩家价值与商业结果')],
          [L('Campaign adoption across operators', '有多少 operator 采用'), L('How simple it is to run, and how risky', '执行简不简单、风险可不可控')],
        ],
      },
      {
        kind: 'p',
        text: L(
          'So a good provider promotion is not only a well-built mechanic. It is the provider’s goal translated into something the operator is willing to execute and the player can actually join.',
          '所以一个好的 provider 促销，不只是机制做得好，而是把 provider 的目标，翻译成 operator 愿意执行、玩家真的参与得了的东西。',
        ),
      },
    ],
    lessons: [
      L('Approved is not live. Commercial agreement is where the process starts.', 'Approved 不等于 Live。商务同意只是流程的开始。'),
      L('A master campaign has to allow operator-level variation, or people patch it by hand forever.', '一个主活动必须允许 operator 层面的变体，不然就要一直靠人工补洞。'),
      L('Without one agreed status source, scale turns into guesswork.', '没有唯一的状态来源，规模一大就变成猜。'),
      L('Participation count is not success. Go back to the objective, cost, turnover, GGR and later behaviour.', '参加人数不等于成功。回到目标、成本、流水、GGR 和后续行为。'),
      L('Provider operations is translation work between commercial, product, marketing, tech and operator reality.', 'Provider 运营本质上是翻译工作：在商务、产品、营销、技术和 operator 的现实之间翻译。'),
    ],
    limits: L(
      '“50+ operators” describes the coordination scale I worked at, not a published performance claim. Results per operator are not disclosed, and there is no consistent dataset here to argue that one mechanic beats another everywhere. What survives is the coordination framework.',
      '「50+ operator」描述的是我当时协调的规模，不是公开的业绩声明。每家的活动结果不公开，这里也没有统一的数据去论证某个机制在所有地方都更好。能沉淀下来的是这套协调框架。',
    ),
    related: [{ href: 'etreporthub', label: L('The same tracking habit later became ETReportHub', '同一套跟踪习惯后来变成 ETReportHub') }],
  },
  {
    slug: 'operator-to-provider',
    number: '04',
    fullSection: 'b2b',
    banner: 'loop',
    datePublished: '2026-09-23',
    dateModified: '2026-09-23',
    title: L(
      'From operator to provider: what only makes sense after doing both',
      '从 operator 到 provider：两边都做过才看懂的事',
    ),
    shortTitle: L('Operator, then provider', '先 operator，后 provider'),
    tags: [L('B2C → B2B', 'B2C → B2B'), L('Account management', '客户经营'), L('Career', '职业路径')],
    standfirst: L(
      'I did not meet this industry through a B2B sales deck. I came up on the operator side — players, FTD, CRM, retention — and only after moving to the provider side did I see that both sides discuss the same industry while asking different questions.',
      '我不是从 B2B 的销售简报认识这个行业的。我是从 operator 这边做上来的——玩家、FTD、CRM、留存。转到 provider 之后才发现：两边每天讨论同一个行业，问的却常常不是同一个问题。',
    ),
    anonymisation: L(
      'Employers, brands, operators and partners are withheld. This is a comparison of two working perspectives, not a description of any one company’s structure.',
      '雇主、品牌、operator 与合作方均不公开。这是两种工作视角的对比，不是任何一家公司的组织结构描述。',
    ),
    blocks: [
      { kind: 'h', text: L('The customer changed', '「客户」换人了') },
      {
        kind: 'table',
        head: [L('Operator side', 'Operator 这边'), L('Provider side', 'Provider 这边')],
        rows: [
          [L('The customer is the player', '客户是玩家'), L('The customer is the operator', '客户是 operator')],
          [L('How do we get them to register, deposit, play, come back?', '怎么让玩家注册、存款、玩、回来？'), L('How do we get them integrated, live, promoting, and still using it?', '怎么让 operator 接入、上线、推广，并持续使用？')],
          [L('FTD, deposits, retention, GGR', 'FTD、存款、留存、GGR'), L('Adoption, turnover, GGR, game mix, campaign activity', '采用率、流水、GGR、游戏组合、活动情况')],
          [L('A promotion is a reason for the player', '促销是给玩家的理由'), L('A promotion is also how a provider pushes its product', '促销同时是 provider 推产品的工具')],
          [L('Payment failure kills conversion', '支付失败会杀掉转化'), L('Integration failure kills adoption', '对接失败会杀掉采用率')],
          [L('CRM manages the player lifecycle', 'CRM 管理玩家生命周期'), L('Account management manages the operator lifecycle', '客户经营管理 operator 生命周期')],
        ],
      },
      {
        kind: 'callout',
        title: L('The same shape underneath', '底下是同一个形状'),
        body: L(
          'B2C turns a stranger into a long-term player; B2B turns a prospect into a live, growing account. Different subject, same acquire → activate → retain → grow.',
          'B2C 把陌生人变成长期玩家；B2B 把潜在客户变成已上线、还在长大的账户。对象不同，但都是 acquire → activate → retain → grow。',
        ),
      },
      { kind: 'h', text: L('Having been an operator changed my discovery', '做过 operator，我的需求了解方式变了') },
      {
        kind: 'p',
        text: L(
          'Without operator experience, discovery slides into a product tour: here are our games, features and promotions. Coming from the other side, four questions come first.',
          '没有 operator 经验，需求了解很容易滑成产品介绍：我们有什么游戏、什么功能、什么促销。从那一边走过来，会先问四个问题。',
        ),
      },
      {
        kind: 'chain',
        items: [
          { title: L('Which markets?', '你的市场是什么？'), body: L('Different markets mean different players, currency, payments, product and regulatory reality.', '不同市场意味着不同玩家、币种、支付、产品和监管现实。') },
          { title: L('What is broken?', '你现在的问题是什么？'), body: L('Missing content, missing promotion, weak conversion, no differentiation — or the integration itself.', '缺内容、缺促销、转化差、没差异化，还是对接本身有问题。') },
          { title: L('How do you measure it?', '你怎么衡量成功？'), body: L('Turnover, GGR, active players, FTD, retention — or simply visibility at launch.', '流水、GGR、活跃玩家、FTD、留存，还是单纯要上线曝光。') },
          { title: L('Who executes?', '谁真正执行？'), body: L('After commercial says yes, product, marketing, operations and tech still have to make it live.', '商务点头之后，产品、营销、运营和技术还要把它变成 live。') },
        ],
      },
      { kind: 'h', text: L('Signed ≠ integrated ≠ live ≠ performing', 'Signed ≠ 已对接 ≠ 已上线 ≠ 有表现') },
      {
        kind: 'path',
        steps: [L('Signed', '签约'), L('Integrated', '已对接'), L('Configured', '已配置'), L('Live', '已上线'), L('Visible', '看得见'), L('Played', '有人玩'), L('Growing', '在增长')],
      },
      {
        kind: 'p',
        text: L(
          'A signed contract does not mean players can see the game. Integration done does not mean the operator gave it placement. Live does not mean anyone plays it. Each step can need a different team to pick it up.',
          '合同签了，不代表玩家看得到游戏。对接完成，不代表 operator 给了版位。上线了，也不代表有人玩。每一层都可能要换一个团队接手。',
        ),
      },
      { kind: 'h', text: L('Where the two sides actually overlap', '两边真正重叠的地方') },
      {
        kind: 'cards',
        items: [
          { title: L('Lifecycle thinking', '生命周期'), body: L('Players have a lifecycle; so does an operator account. Acquisition is not the end.', '玩家有生命周期，operator 账户也有。拿下不等于结束。') },
          { title: L('Conversion thinking', '转化'), body: L('Registration → FTD is a funnel; lead → live account is a funnel too.', '注册 → FTD 是漏斗；线索 → 上线客户也是漏斗。') },
          { title: L('Retention thinking', '留存'), body: L('Players return for continued value; operators keep giving resource for the same reason.', '玩家因为持续有价值才回来；operator 继续给资源也是同一个理由。') },
          { title: L('Reporting thinking', '报表'), body: L('A number is a result. The question is always why it moved and who acts next.', '数字只是结果。问题永远是：为什么变了？下一步谁行动？') },
          { title: L('Promotion thinking', '促销'), body: L('A promotion is not giving things away; it buys a change in behaviour at a cost.', '促销不是送东西，是用成本换一个行为改变。') },
          { title: L('Operations thinking', '运营'), body: L('An idea is finished only once it is configured, QA’d, live, tracked and reviewed.', '一个想法只有被配置、QA、上线、追踪并复盘之后，才算完成。') },
        ],
      },
      {
        kind: 'callout',
        title: L('What B2C really gave B2B', 'B2C 真正给 B2B 的东西'),
        body: L(
          'Not better selling. When an operator asks for free spins, I do not stop at the mechanic: eligibility, game ID, currency, round value, expiry, CRM exposure, budget, reporting — and how they will judge it afterwards.',
          '不是更会卖。当 operator 问免费局时，我不会停在机制：资格、game ID、币种、单局价值、有效期、CRM 曝光、预算、报表，以及结束后他们会怎么看结果。',
        ),
      },
    ],
    lessons: [
      L('A provider’s product has to survive inside the operator’s reality, not inside the supplier’s deck.', 'Provider 的产品要在 operator 的现实里活下来，而不是在供应商自己的简报里成立。'),
      L('Ask what the operator will have to execute before offering what you want to provide.', '先问 operator 最后必须执行什么，再谈你想提供什么。'),
      L('An RTP question is never only a number: configuration, environment, market and setup sit behind it.', 'RTP 的问题从来不只是一个数字：背后是配置、环境、市场和设置。'),
      L('Account growth is retention work, and retention is operational before it is relational.', '客户增长是留存工作，而留存首先是运营，其次才是关系。'),
      L('Two perspectives beat one: the overlap is where the system becomes visible.', '两种视角胜过一种：重叠的地方，才看得见整个系统。'),
    ],
    limits: L(
      'This is a comparison drawn from one career path. Companies, markets, licences, platforms and product types move the boundaries of each role, so it should be read as a framework for comparing perspectives, not as an industry standard.',
      '这是从一条职业路径上得出的对比。公司、市场、牌照、平台和产品类型都会改变各个角色的职责边界，所以它是一个比较视角的框架，不是行业标准。',
    ),
  },
];

export const IGAMING_CASES_INDEX = {
  kicker: L('iGaming · Field notes', 'iGaming · 实战案例'),
  claim: L('What the work actually looked like.', '这些活，实际做起来是什么样。'),
  standfirst: L(
    'Anonymised case studies from my own operator-side and provider-side work: what the problem was, how I investigated it, what got built, and what each case does not prove.',
    '来自我自己在 operator 和 provider 两边工作的匿名案例：问题是什么、我怎么查、最后做了什么，以及每个案例不能证明什么。',
  ),
  rule: {
    title: L('The rule for these pages', '这些页面的规矩'),
    body: L(
      'Nothing is invented for SEO. Where there are facts, the facts are written; where the record is thin, only the framework is written. Employers, brands, operators, partners, countries, budgets and commercial terms stay out.',
      '不为了 SEO 编造事件。有事实的写事实，资料不足的只写框架。雇主、品牌、operator、合作方、国家、预算和商业条款一律不写。',
    ),
  },
  moreTitle: L('More field notes are being written', '还有更多案例在写'),
  moreBody: L(
    'Next up: multi-brand CRM calendars, what a provider checks behind an RTP request, multi-currency operator onboarding, reactivation, lobby rollout, promotion reporting, gift-code systems, and how a B2B exhibition actually works.',
    '接下来会写：多品牌 CRM 日历、operator 问「能不能换 RTP」时 provider 要确认什么、多币种 operator 接入、玩家召回、大厅上线、活动复盘、礼品码系统，以及 B2B 展会实际怎么跑。',
  ),
  backToIgaming: L('Back to the starter pack', '返回入门包'),
  readCase: L('Read the case', '看这个案例'),
  caseLabel: L('Case', '案例'),
};
