/**
 * `/igaming/<guide>` — standalone explainers in the iGaming knowledge cluster.
 *
 * A guide answers one reader question completely: direct answer first, then
 * definitions, a worked example, common misreads, and a checklist. The full
 * starter pack (`/igaming/full`) keeps the short definitions and links here.
 *
 * Rules for everything in this file:
 * - Worked numbers are illustrative and say so; they are not from any operator.
 * - Same anonymisation as the field notes: no employer, brand, partner or country.
 * - Where definitions differ by contract or regulator, say that instead of
 *   presenting one company's convention as the industry rule.
 *
 * Each guide is its own explicit route in `App.tsx` and `seo-routes.ts`.
 */

import type { IGamingLocalized } from './igaming-content';
import type { CaseBlock, IGamingCase } from './igaming-cases-content';

const L = (en: string, zh: string): IGamingLocalized => ({ en, zh });

export type IGamingGuide = {
  /** Route path without base or locale, e.g. `/igaming/ggr-vs-ngr`. */
  path: string;
  /** Section id on `/igaming/full` this guide expands. */
  fullSection: IGamingCase['fullSection'];
  banner: IGamingCase['banner'];
  title: IGamingLocalized;
  shortTitle: IGamingLocalized;
  tags: IGamingLocalized[];
  standfirst: IGamingLocalized;
  /** The two-line answer a reader came for, shown before anything else. */
  answer: IGamingLocalized;
  blocks: CaseBlock[];
  checklist: IGamingLocalized[];
  limits: IGamingLocalized;
};

export const IGAMING_GUIDE_LABELS = {
  kicker: L('iGaming · Guide', 'iGaming · 专题'),
  answerTitle: L('Short answer', '一句话答案'),
  checklistTitle: L('Before you trust the number, ask', '相信这个数字之前，先问'),
  limitsTitle: L('What this guide does not cover', '这篇不涵盖什么'),
  keepReading: L('Keep reading', '继续读下去'),
  keepReadingBody: L(
    'The short definitions sit in the full starter pack; the field notes show the same numbers in real work.',
    '简短定义在入门包完整版里；实战案例里能看到这些数字在真实工作中的样子。',
  ),
  readSection: L('Read the matching section', '看完整版对应那一节'),
  readCases: L('Field notes', '实战案例'),
  backToIgaming: L('Back to iGaming', '返回 iGaming'),
  guidePrefix: L('Guide: ', '专题：'),
  moreGuides: L('More guides', '更多专题'),
};

export const GGR_VS_NGR_GUIDE: IGamingGuide = {
  path: '/igaming/ggr-vs-ngr',
  fullSection: 'reporting',
  banner: 'ledger',
  title: L(
    'GGR vs NGR vs Turnover vs Net Deposits: what each iGaming number actually measures',
    'GGR、NGR、流水与净存款：每个 iGaming 数字到底在量什么',
  ),
  shortTitle: L('GGR vs NGR vs Turnover', 'GGR、NGR 与流水'),
  tags: [L('Reporting', '报表'), L('Metrics', '指标'), L('Promotions', '促销'), L('Beginner', '入门')],
  standfirst: L(
    'Four numbers sit at the top of almost every iGaming report. On the same day they rarely agree — and that is not a bug. Each one answers a different question.',
    '几乎每份 iGaming 报表顶上都是这四个数字。同一天里它们很少对得上——这不是 bug。每个数字回答的是不同的问题。',
  ),
  answer: L(
    'Turnover is how much was bet. GGR is what the house kept from those bets. NGR is GGR after bonus cost and whatever else the contract deducts. Net deposits is cash in minus cash out.',
    '流水（turnover）是总共下注了多少。GGR 是这些下注里庄家留下多少。NGR 是 GGR 扣掉奖金成本，以及合同规定的其他扣项。净存款是进来的钱减去出去的钱。',
  ),
  blocks: [
    { kind: 'h', text: L('The four definitions', '四个定义') },
    {
      kind: 'table',
      head: [L('Metric', '指标'), L('Formula', '算法'), L('The question it answers', '它回答的问题')],
      rows: [
        [L('Turnover (handle)', '流水（turnover / handle）'), L('Sum of all stakes', '所有下注额相加'), L('How much playing happened?', '玩得有多活跃？')],
        [L('GGR', 'GGR（博彩毛收入）'), L('Stakes − winnings paid', '下注 − 派彩'), L('How much did the games win?', '游戏本身赢了多少？')],
        [L('NGR', 'NGR（博彩净收入）'), L('GGR − bonus cost − contract deductions', 'GGR − 奖金成本 − 合同扣项'), L('How much win is left after we paid to get it?', '扣掉为赢这笔钱付出的成本，还剩多少？')],
        [L('Net deposits', '净存款'), L('Deposits − withdrawals', '存款 − 提款'), L('How much cash actually came in?', '实际进来多少现金？')],
      ],
    },
    {
      kind: 'p',
      text: L(
        'Turnover and GGR come from the game ledger. Net deposits comes from the payment ledger. NGR sits on top of GGR and depends on definitions someone signed. Mixing the two ledgers is where most reporting arguments start.',
        '流水和 GGR 来自游戏账；净存款来自支付账；NGR 叠在 GGR 上面，取决于某份签了字的定义。把两本账混在一起，是大部分报表争论的起点。',
      ),
    },

    { kind: 'h', text: L('One day, four numbers (illustrative)', '同一天，四个数字（示例）') },
    {
      kind: 'p',
      text: L(
        'The figures below are invented to show the arithmetic. They are not from any operator.',
        '下面的数字是为了演示算法编的，不来自任何 operator。',
      ),
    },
    {
      kind: 'table',
      head: [L('Line', '项目'), L('Amount', '金额'), L('How it is derived', '怎么来的')],
      rows: [
        [L('Deposits', '存款'), L('50,000', '50,000'), L('Cash players paid in', '玩家存进来的现金')],
        [L('Withdrawals', '提款'), L('30,000', '30,000'), L('Cash paid back out', '付出去的现金')],
        [L('Net deposits', '净存款'), L('20,000', '20,000'), L('50,000 − 30,000', '50,000 − 30,000')],
        [L('Turnover', '流水'), L('400,000', '400,000'), L('The same balances bet again and again', '同一批余额被反复下注')],
        [L('Winnings paid', '派彩'), L('384,000', '384,000'), L('Returned to players on those bets', '这些下注返还给玩家的')],
        [L('GGR', 'GGR'), L('16,000', '16,000'), L('400,000 − 384,000 (hold 4.0%)', '400,000 − 384,000（hold 4.0%）')],
        [L('Bonus cost', '奖金成本'), L('3,000', '3,000'), L('Bonus counted as cost under this example’s rule', '按本例口径计入成本的奖金')],
        [L('NGR', 'NGR'), L('13,000', '13,000'), L('16,000 − 3,000 (no other deductions here)', '16,000 − 3,000（本例不扣其他项）')],
      ],
    },
    {
      kind: 'cards',
      items: [
        {
          title: L('Turnover is 8× deposits', '流水是存款的 8 倍'),
          body: L('That is normal. A balance is bet, partly won back, and bet again. Turnover measures activity, not money received.', '这很正常。余额被下注、赢回一部分、再下注。流水量的是活跃度，不是收到的钱。'),
        },
        {
          title: L('GGR ≠ net deposits', 'GGR ≠ 净存款'),
          body: L('20,000 came in, the games won 16,000. Before bonus, the 4,000 gap is still sitting in player wallets — and can be withdrawn tomorrow.', '进来 20,000，游戏赢了 16,000。不算奖金，差的 4,000 还在玩家钱包里——明天可能就被提走。'),
        },
        {
          title: L('NGR is the honest win', 'NGR 才是实打实的赢'),
          body: L('3,000 of the 16,000 was effectively paid back as bonus. A day with high GGR and a high bonus line can be a weak day.', '16,000 里有 3,000 实际上以奖金形式还了回去。GGR 高、奖金也高的一天，可能是很弱的一天。'),
        },
      ],
    },
    {
      kind: 'callout',
      title: L('Hold % is the bridge', 'Hold % 是连接两者的桥'),
      body: L(
        'Hold = GGR ÷ turnover. A slot with 96% RTP has a theoretical hold of about 4% over a very large number of spins. On a single day one big win can push hold — and GGR — below zero. Read hold over weeks and per game, not per day.',
        'Hold = GGR ÷ 流水。RTP 96% 的老虎机，理论 hold 大约 4%，但那是在极大量的局数上。单独一天，一个大奖就能把 hold 和 GGR 打成负数。看 hold 要按周、按游戏看，不要按天下结论。',
      ),
    },

    { kind: 'h', text: L('Which number for which decision', '哪个决定用哪个数字') },
    {
      kind: 'table',
      head: [L('If you need to know…', '想知道的是……'), L('Look at', '看哪个'), L('Watch out for', '要注意')],
      rows: [
        [L('Did a tournament drive play?', '锦标赛有没有带动游戏？'), L('Turnover on those games', '那些游戏的流水'), L('Compare with the weeks before, not with GGR', '跟活动前几周比，不要跟 GGR 比')],
        [L('How did the games perform?', '游戏表现如何？'), L('GGR and hold %', 'GGR 与 hold %'), L('Short windows swing on single wins', '时间窗口短，单个大奖就会让它大起大落')],
        [L('Are promotions worth it?', '促销值不值？'), L('NGR vs GGR gap, bonus ratio', 'NGR 与 GGR 的差距、奖金比例'), L('When bonus is counted: credited, wagered or converted', '奖金什么时候算成本：发出、下注，还是转成现金')],
        [L('How much cash do we have to work with?', '手上有多少现金可用？'), L('Net deposits', '净存款'), L('Pending withdrawals and player balances', '待处理提款与玩家余额')],
        [L('What will a provider invoice?', 'Provider 会按什么开账单？'), L('Usually GGR on its games', '通常是它的游戏产生的 GGR'), L('Some contracts allow bonus or jackpot deductions', '有些合同允许扣奖金或 jackpot')],
        [L('What will an affiliate be paid on?', 'Affiliate 按什么分成？'), L('Usually NGR', '通常是 NGR'), L('NGR as defined in that agreement, not in your report', '以那份合同里定义的 NGR 为准，不是你报表里的')],
      ],
    },

    { kind: 'h', text: L('Common misreads', '常见误读') },
    {
      kind: 'list',
      items: [
        L('Calling turnover “revenue”. A big turnover number says players were busy, not that the business earned it.', '把流水叫成「收入」。流水大只说明玩家很忙，不代表生意赚到了。'),
        L('Reading net deposits as profit. Money in player wallets has not been won yet.', '把净存款当利润。还在玩家钱包里的钱，还没有被赢走。'),
        L('Judging a game or a day on hold %. One jackpot day is variance, not a broken game.', '用 hold % 评判一个游戏或一天。出一次 jackpot 的那天是波动，不是游戏坏了。'),
        L('Comparing NGR across companies or partners. Two NGR figures are only comparable if their deductions match.', '拿不同公司或合作方的 NGR 直接比。两个 NGR 只有在扣项一致时才能比。'),
        L('Treating “withdrawals are negative” as an error. Some reports store withdrawals as negative numbers, so net deposit is deposit plus withdrawal.', '把「提款是负数」当错误。有些报表把提款存成负数，所以净存款是存款加提款。'),
      ],
    },
    {
      kind: 'callout',
      title: L('Sportsbook is different', '体育投注不一样'),
      body: L(
        'Bets can be placed today and settled next week. Decide whether turnover counts at placement or settlement, and remember that GGR only exists for settled bets — open bets are still undecided.',
        '今天下的注可能下周才结算。先定好流水按下注时算还是按结算时算；也记住 GGR 只存在于已结算的注单——未结算的注还没有输赢。',
      ),
    },
  ],
  checklist: [
    L('Which deductions make up NGR here: bonus only, or also tax, payment fees, platform fees?', '这里的 NGR 扣了哪些：只扣奖金，还是还扣税、支付手续费、平台费？'),
    L('When is a bonus counted as cost: when credited, when wagered, or when converted to cash?', '奖金什么时候算成本：发出时、下注时，还是转成现金时？'),
    L('What time zone and cut-off defines “a day”?', '「一天」按哪个时区、几点切分？'),
    L('Are cancelled, voided or refunded bets removed from turnover?', '取消、作废或退款的注单有没有从流水里扣掉？'),
    L('Are jackpot contributions and jackpot wins inside GGR or reported separately?', 'Jackpot 的抽成和中奖算在 GGR 里，还是单独列？'),
    L('Are withdrawals stored as positive or negative numbers?', '提款存成正数还是负数？'),
    L('Is everything in one currency, and at whose exchange rate?', '是不是都换成同一个币种？用谁的汇率？'),
  ],
  limits: L(
    'Definitions here follow common industry usage. Your contract, regulator or finance team may define NGR, bonus cost or a reporting day differently — their definition wins. Gaming tax rules vary by jurisdiction and are not covered. All numbers on this page are illustrative.',
    '这里的定义按行业常见用法。你的合同、监管机构或财务团队对 NGR、奖金成本或报表日的定义可能不同——以他们的为准。各地博彩税规则不同，这篇不涵盖。本页所有数字都是示例。',
  ),
};


export const PROVIDER_PROMOTIONS_GUIDE: IGamingGuide = {
  path: '/igaming/provider-promotions',
  fullSection: 'b2b',
  banner: 'gears',
  title: L(
    'How game provider promotions work: what the provider gives, and what the operator owes',
    '游戏供应商促销怎么运作：供应商给什么，运营商要还什么',
  ),
  shortTitle: L('How provider promotions work', '供应商促销怎么运作'),
  tags: [L('B2B', 'B2B'), L('Provider side', 'Provider 这边'), L('Promotions', '促销'), L('Commercial terms', '商业条款')],
  standfirst: L(
    'A provider promotion usually holds two deals at once: a reward the player sees, and a commercial trade between two businesses that the player never sees. Most launch problems come from reading one as the other.',
    '一个供应商促销里通常装着两笔交易：一笔是玩家看得到的奖励，另一笔是两家公司之间的商业交换，玩家永远看不到。上线时的大部分问题，都是把其中一笔当成了另一笔。',
  ),
  answer: L(
    'The provider offers money or a fee benefit — free rounds, a prize pool, a fee-free period, a revenue-share discount. In return the operator owes visibility and work: lobby positions, banners, a set number of campaigns, a working demo. The offer is only as good as both sides of that trade being written down and checkable.',
    '供应商出钱或给费用优惠——免费局、奖池、免费期、分成折扣。作为交换，运营商要给曝光和人力：大厅位置、横幅、指定数量的活动、可用的试玩账号。这个优惠值不值，取决于交换的两边是不是都写清楚、都能检查。',
  ),
  blocks: [
    { kind: 'h', text: L('Two layers in one campaign', '一个活动里的两层') },
    {
      kind: 'p',
      text: L(
        'A provider (the game studio) wants its titles played. An operator (the casino brand) wants offers that bring players back without wrecking its margin. An aggregator sits between many of each. When a provider “runs a promotion”, it can mean a player-facing mechanic, a commercial incentive for the operator, or both bundled in one announcement.',
        '供应商（游戏工作室）希望自己的游戏有人玩。运营商（面向玩家的娱乐场品牌）想要能把玩家拉回来、又不吃掉利润的优惠。聚合商夹在很多家供应商和很多家运营商中间。供应商说「我们在做促销」，可能是一个面向玩家的机制，可能是给运营商的商业激励，也可能两者捆在同一则公告里。',
      ),
    },
    {
      kind: 'table',
      head: [L('Offer', '优惠'), L('Who sees it', '谁看得到'), L('What the provider gives', '供应商给什么'), L('What to pin down', '要先钉死什么')],
      rows: [
        [L('Free rounds', '免费局'), L('Player', '玩家'), L('A number of funded spins on chosen games', '指定游戏上若干局由供应商出资的免费旋转'), L('Bet value per round, expiry, wagering on winnings, which games', '每局下注额、有效期、赢钱的流水要求、哪些游戏')],
        [L('Tournament / cash drop', '锦标赛 / 现金掉落'), L('Player', '玩家'), L('A prize pool and the ranking or trigger engine', '奖池，以及排名或触发的系统'), L('Qualifying bet, period and time zone, prize cap, who settles', '合格下注、活动时段与时区、奖金上限、谁结算')],
        [L('Fee-free period', '免费期'), L('Operator', '运营商'), L('No platform or royalty fee for a set period', '一段时间内免收平台费或分成费'), L('Which fee exactly, what starts the clock, what ends it early', '具体免哪一项费用、什么事件开始计时、什么情况提前结束')],
        [L('Second account / “1+1”', '第二个账户 / 「1+1」'), L('Operator', '运营商'), L('An extra account or key on better terms next to the normal one', '在正常账户旁边多给一个条件更好的账户或 key'), L('How the two accounts may be used, and what must be shown for each', '两个账户各自怎么用、各自要展示什么')],
        [L('Revenue-share discount', '分成折扣'), L('Operator', '运营商'), L('A lower percentage on GGR for a period', '一段时间内按更低比例收 GGR 分成'), L('The base, the games covered, negative-GGR treatment, the settlement month', '计算基数、覆盖哪些游戏、GGR 为负时怎么算、哪个月结算')],
        [L('Multi-period rebate', '分期返利'), L('Operator', '运营商'), L('A percentage returned across several months', '分几个月返还的一定比例'), L('Separate monthly rates, or one rebate split across months?', '是每个月各一个费率，还是一笔返利分几个月发？')],
      ],
    },
    {
      kind: 'p',
      text: L(
        'The top two rows change what the player experiences. The bottom four change what the operator pays. They need different owners: player-facing rules go through the operator’s promotion and compliance review; commercial terms go through whoever signs the invoice.',
        '上面两行改变的是玩家的体验，下面四行改变的是运营商要付多少钱。它们需要不同的负责人：面向玩家的规则要过运营商的促销与合规审核；商业条款由签发票的那个人负责。',
      ),
    },

    { kind: 'h', text: L('The trade: incentive for visibility', '交换的本质：激励换曝光') },
    {
      kind: 'p',
      text: L(
        'Commercial incentives are rarely free. A fee waiver or discount almost always comes with obligations, because the provider is buying attention in a lobby full of competing games.',
        '商业激励很少是白给的。免费期或折扣几乎都附带义务，因为供应商买的是注意力——在一个挤满竞品游戏的大厅里。',
      ),
    },
    {
      kind: 'cards',
      items: [
        { title: L('Position', '位置'), body: L('“Top three in the lobby” — on which page, which category, which device, for how long?', '「大厅前三」——哪一页、哪个分类、什么设备、维持多久？') },
        { title: L('Banners', '横幅'), body: L('Homepage slider, pop-up, in-category tile. Each is a separate deliverable with its own size and dates.', '首页轮播、弹窗、分类里的图块。每一种都是单独的交付物，有自己的尺寸和日期。') },
        { title: L('Campaigns', '活动'), body: L('A required number of operator promotions on the provider’s games during the period.', '期间内要在该供应商游戏上做满指定数量的运营商活动。') },
        { title: L('Demo access', '试玩账号'), body: L('A working demo or test account so the provider can check its games are live and placed.', '一个能用的试玩或测试账号，让供应商自己检查游戏有没有上线、位置对不对。') },
        { title: L('Notification', '通知'), body: L('Telling the provider when the placement is live — and keeping proof that it was received.', '位置上线时通知供应商，并留下对方已收到的凭证。') },
        { title: L('Consequences', '违约后果'), body: L('What happens on a breach: a warning first, then losing the benefit or paying a fee. Read this before signing.', '违约会怎样：先警告，然后失去优惠或补交费用。签之前先读这一条。') },
      ],
    },
    {
      kind: 'callout',
      title: L('From the field', '来自实战'),
      body: L(
        'When I ran B2B promotions at an aggregator, almost every commercial offer from a provider came with a placement condition attached. The offers were easy to sell. The hard part was that several of them asked for the same few lobby positions.',
        '我在聚合商负责 B2B 促销时，几乎每个供应商的商业优惠都附带位置条件。这些优惠本身很好推，难的是好几家要的都是大厅里同样那几个位置。',
      ),
    },

    { kind: 'h', text: L('When two deals want the same slot', '两笔交易抢同一个位置') },
    {
      kind: 'p',
      text: L(
        'Each placement deal looks fine on its own. Together they can be impossible. An operator with one top slot cannot promise “position 1” to two providers. The check has to happen before the second yes, not when someone screenshots the lobby. Example below is illustrative.',
        '每一笔位置交易单独看都没问题，放在一起就可能做不到。运营商只有一个最好的位置，就不能同时答应两家供应商「第一位」。检查要在说第二个「好」之前做，而不是等有人截图大厅时才发现。下面的例子是示例。',
      ),
    },
    {
      kind: 'table',
      head: [L('Deal', '交易'), L('Acceptable positions', '可接受的位置'), L('Assignment', '分配结果')],
      rows: [
        [L('Provider A', '供应商 A'), L('1 only', '只能第 1 位'), L('1', '第 1 位')],
        [L('Provider B', '供应商 B'), L('1 or 2', '第 1 或第 2 位'), L('2', '第 2 位')],
        [L('Provider C (new request)', '供应商 C（新请求）'), L('1 or 2', '第 1 或第 2 位'), L('No slot left — conflict', '没有位置了——冲突')],
        [L('Provider C, if B accepts 1–3', '如果 B 接受第 1–3 位，C 再来'), L('1 or 2', '第 1 或第 2 位'), L('A → 1, C → 2, B → 3: all fit', 'A → 1，C → 2，B → 3：全部放得下')],
      ],
    },
    {
      kind: 'p',
      text: L(
        'The last row is the useful one. Whether a new deal fits can depend on renegotiating an old one, and filling slots first-come-first-served can wrongly say “no”. Formally this is a matching problem: each deal must be matched to a different position from its acceptable list. With a handful of deals a spreadsheet works; once there are many, a small tool that runs the match before you commit pays for itself. I built one for exactly this: each offer lists its acceptable positions, positions already promised are locked, and the checker says whether a new offer can still be accepted.',
        '最后一行才是重点。新交易放不放得下，可能取决于重谈旧交易；按先来先占的方式填位置，会错误地得出「放不下」。用正式的说法，这是一个匹配问题：每笔交易要分到一个不同的、在它可接受清单里的位置。交易只有几笔时用表格就行；交易一多，在答应之前先跑一次匹配的小工具很快就值回来。我就为这件事做过一个：每个优惠列出可接受的位置，已承诺的位置锁定，检查器告诉你新优惠还能不能接。',
      ),
    },

    { kind: 'h', text: L('Price the benefit before you compare offers', '比较优惠之前，先算清它值多少') },
    {
      kind: 'list',
      items: [
        L('A “50% GGR discount” is half of one fee line, not 50% more profit. Other costs and player behaviour do not change.', '「GGR 五折」是某一项费用减半，不是利润多 50%。其他成本和玩家行为都没变。'),
        L('A fee-free month is worth the fee you would have paid on that month’s activity — small if the games are new and barely played.', '一个月免费期值多少，等于那个月的活动本来要交的费用——游戏刚上、几乎没人玩的话，就很小。'),
        L('The same 1% means very different money on turnover and on GGR. Ask for the base before the rate.', '同样是 1%，按流水算和按 GGR 算是完全不同的金额。先问基数，再看费率。'),
        L('The cost of the obligations is real: a top slot given to one provider is a slot not given to another, or to your own promotion.', '义务也有成本：给了一家供应商的头部位置，就不能给另一家，也不能给你自己的活动。'),
      ],
    },
    {
      kind: 'callout',
      title: L('One page per offer', '一个优惠一页'),
      body: L(
        'Write each offer as two columns: what we receive, and what we owe — with the date each starts, who checks it, and what evidence counts. If a line cannot be placed in either column, it is not agreed yet.',
        '把每个优惠写成两栏：我们得到什么，我们欠什么——每一项都写上开始日期、谁来检查、什么算证据。放不进任何一栏的条款，就是还没谈妥。',
      ),
    },
  ],
  checklist: [
    L('Is this a player-facing reward, a commercial incentive, or both — and who owns each part?', '这是面向玩家的奖励、商业激励，还是两者都有？每一部分谁负责？'),
    L('Which fee, on which base, for which games, is being waived or discounted?', '减免或打折的是哪一项费用？按什么基数？覆盖哪些游戏？'),
    L('What event starts the benefit: signing, technical go-live, or campaign start?', '什么事件开始计算优惠：签约、技术上线，还是活动开始？'),
    L('What exactly must we show — page, category, device, position, duration?', '我们具体要展示什么——哪一页、哪个分类、什么设备、第几位、多久？'),
    L('Do these positions clash with anything we have already promised?', '这些位置会不会和我们已经答应别人的冲突？'),
    L('What counts as proof of placement, and who accepts it?', '什么算位置达标的证据？谁认可？'),
    L('What happens on a breach, and is there a correction period?', '违约会怎样？有没有补救期？'),
  ],
  limits: L(
    'Offer names such as “1+1”, “free period” or “GGR discount” are labels that differ by provider and contract; always read the actual terms. Player-facing promotions must also meet the rules of each market and the operator’s responsible-gambling policy, which this guide does not cover. All examples are illustrative.',
    '「1+1」「免费期」「GGR 折扣」这类名称，每家供应商、每份合同的意思都可能不同，一定要看实际条款。面向玩家的促销还必须符合各市场的法规和运营商的负责任博彩政策，这篇不涵盖。所有例子都是示例。',
  ),
};

export const PROMOTION_LAUNCH_CHECKLIST_GUIDE: IGamingGuide = {
  path: '/igaming/promotion-launch-checklist',
  fullSection: 'promotions',
  banner: 'chips',
  title: L(
    'iGaming promotion launch checklist: from “approved” to actually live',
    'iGaming 活动上线清单：从「批了」到真的能用',
  ),
  shortTitle: L('Promotion launch checklist', '活动上线清单'),
  tags: [L('Promotions', '促销'), L('Operations', '运营'), L('Checklist', '清单'), L('Localisation', '本地化')],
  standfirst: L(
    'A promotion is not ready because the banner is ready. It is ready when the rule, the copy in every language, the back-office setup, the support script and the payout all describe the same offer — and someone has checked it as a player would.',
    '横幅做好了，不代表活动准备好了。规则、每一种语言的文案、后台设置、客服话术和派奖，全部描述同一个优惠，而且有人以玩家的身份走过一遍——那才算准备好。',
  ),
  answer: L(
    'Split “live” into four states — technically live, tested, approved, benefit started — and give each an owner and a date. Then check that the five places a promotion lives agree with each other. Then claim it yourself before players do.',
    '把「上线」拆成四个状态——技术上线、测试通过、审批通过、优惠生效——每个都要有负责人和日期。然后检查活动存在的五个地方是否说同一件事。最后在玩家之前，自己先领一次。',
  ),
  blocks: [
    { kind: 'h', text: L('“Live” is four different things', '「上线」其实是四件事') },
    {
      kind: 'table',
      head: [L('State', '状态'), L('What it means', '意思'), L('Who confirms', '谁确认'), L('Evidence', '证据')],
      rows: [
        [L('Technically live', '技术上线'), L('The integration or game is reachable in production', '对接或游戏在正式环境里可以访问'), L('Tech / integration', '技术 / 对接'), L('Release note with scope', '带范围说明的上线通知')],
        [L('Tested', '测试通过'), L('Launch, play, bonus credit and reporting were checked', '进入游戏、游玩、奖励入账和报表都检查过'), L('QA or the campaign owner', '测试或活动负责人'), L('Test record and open issues', '测试记录与未解决问题')],
        [L('Approved', '审批通过'), L('The offer and its terms are signed off for this brand and market', '优惠和条款已为这个品牌、这个市场批准'), L('Commercial / compliance', '商务 / 合规'), L('Written approval with conditions', '附条件的书面批准')],
        [L('Benefit started', '优惠生效'), L('Players can claim, or the commercial benefit is counting', '玩家可以领取，或商业优惠开始计算'), L('Campaign owner', '活动负责人'), L('Agreed start date and time zone', '约定的开始日期与时区')],
      ],
    },
    {
      kind: 'callout',
      title: L('From the field', '来自实战'),
      body: L(
        'One partner integration was announced live while testing was still open, and the partner asked to push back the start of its free-fee period. Both sides were saying “live” and meaning different things. Splitting the four states and writing down which one starts the benefit clock turned an argument into a date everyone could check.',
        '有一家合作方的对接被宣布「已上线」，但测试还没结束，对方又要求推迟免费期的开始时间。两边都在说「上线」，指的却不是同一件事。把四个状态拆开，写清楚哪一个启动优惠的计时，争论就变成了一个大家都能核对的日期。',
      ),
    },

    { kind: 'h', text: L('The five places a promotion lives', '活动存在的五个地方') },
    {
      kind: 'cards',
      items: [
        { title: L('The rule', '规则'), body: L('Eligibility, qualifying action, reward, cap, wagering, expiry, exclusions.', '资格、达标动作、奖励、上限、流水要求、有效期、排除范围。') },
        { title: L('The copy', '文案'), body: L('Banner, landing page and T&Cs — in every language you publish.', '横幅、落地页和条款——每一种发布的语言。') },
        { title: L('The setup', '后台设置'), body: L('Bonus engine, game list, currency, dates and time zone in the back office.', '后台里的奖金引擎、游戏清单、币种、日期和时区。') },
        { title: L('The support script', '客服话术'), body: L('What agents say when a reward has not arrived, and when to escalate.', '奖励没到账时客服怎么说、什么时候往上报。') },
        { title: L('The payout', '派奖'), body: L('Who credits the reward, when, and how prizes outside the wallet are delivered.', '谁发奖励、什么时候发、钱包以外的奖品怎么送到。') },
      ],
    },
    {
      kind: 'p',
      text: L(
        'If any two disagree, the player will find it first. The classic case: the banner says “all slots”, the bonus engine tracks a fixed game list. The first support ticket arrives an hour after launch.',
        '只要其中两个对不上，最先发现的一定是玩家。经典例子：横幅写「所有老虎机」，奖金引擎只追踪一份固定的游戏清单。上线一小时后，第一张客服工单就来了。',
      ),
    },

    { kind: 'h', text: L('Translation is a rules check, not a grammar check', '翻译是在核对规则，不是在核对语法') },
    {
      kind: 'p',
      text: L(
        'Multilingual terms drift. A limit added late to the English version never reaches the Chinese one; a period written as “7 days” in one language becomes “one week from claim” in another. Line the versions up clause by clause on these fields:',
        '多语言条款会悄悄走样。后来加进英文版的限制，没有同步到中文版；一种语言写「7 天」，另一种写成「领取后一周」。把各个版本逐条对齐，核对这些字段：',
      ),
    },
    {
      kind: 'table',
      head: [L('Field', '字段'), L('Check that every language says the same', '每种语言都要一致')],
      rows: [
        [L('Eligibility', '资格'), L('Who can claim, including new vs existing players and excluded countries or payment methods', '谁能领，包括新老玩家，以及排除的国家或支付方式')],
        [L('Period', '时段'), L('Start, end, time zone, and when the claim window closes', '开始、结束、时区，以及领取窗口什么时候关')],
        [L('Calculation base', '计算基数'), L('Percentage of what: deposit, net loss, turnover', '是什么的百分比：存款、净输、流水')],
        [L('Cap and minimum', '上限与门槛'), L('Maximum reward, minimum deposit or bet', '最高奖励、最低存款或下注')],
        [L('Wagering', '流水要求'), L('Multiplier, on what amount, which games count and at what weight', '几倍、按什么金额算、哪些游戏算、各算多少比例')],
        [L('Exclusions', '排除'), L('Games, bet types or other offers that cannot be combined', '不能叠加的游戏、下注类型或其他优惠')],
        [L('Consequence', '违规后果'), L('What happens to winnings if a rule is broken', '违反规则时赢的钱怎么处理')],
      ],
    },

    { kind: 'h', text: L('The pre-launch checklist', '上线前清单') },
    {
      kind: 'table',
      head: [L('Check', '检查项'), L('Evidence to keep', '要留的证据'), L('If it is not resolved', '如果还没解决')],
      rows: [
        [L('Games and accounts are eligible', '游戏和账户都符合资格'), L('Approved game IDs and brand list', '批准的游戏 ID 和品牌清单'), L('Hold the affected scope only', '只暂停受影响的部分')],
        [L('The mechanic works in this setup', '机制在这个配置里能跑'), L('A test claim on a real account type', '用真实类型的账户测一次领取'), L('Do not announce a date', '不要先公布日期')],
        [L('Terms are approved', '条款已批准'), L('Final T&C version with approval', '最终版条款与批准记录'), L('Publish nothing player-facing', '面向玩家的内容一律不发')],
        [L('All languages agree', '各语言一致'), L('Clause-by-clause comparison', '逐条对照表'), L('Fix before the banner goes up', '横幅上之前改好')],
        [L('Dates and time zone agree', '日期和时区一致'), L('One schedule everyone signed', '大家都确认过的同一份时间表'), L('Pick one and tell everyone', '定一个，通知所有人')],
        [L('Support is briefed', '客服已交接'), L('Script, FAQ and escalation owner', '话术、FAQ 和升级负责人'), L('Delay launch rather than improvise', '宁可推迟上线，也不要临场发挥')],
        [L('Reporting can see it', '报表看得到'), L('Promo code or tag visible in the report', '报表里能看到活动代码或标签'), L('Agree how results will be read before launch', '上线前先约定结果怎么看')],
      ],
    },

    { kind: 'h', text: L('Launch day: claim it like a player', '上线当天：像玩家一样领一次') },
    {
      kind: 'path',
      steps: [L('See the banner', '看到横幅'), L('Read the terms', '读条款'), L('Opt in or deposit', '报名或存款'), L('Play an eligible game', '玩一个适用游戏'), L('Receive the reward', '收到奖励'), L('Ask support a question', '问客服一个问题')],
    },
    {
      kind: 'p',
      text: L(
        'Do it on mobile and desktop, in each language, with a test account that matches the target audience. Then repeat a short check 24 and 48 hours later: claims are arriving, rewards are landing, and the ticket queue has no new pattern.',
        '手机、电脑各走一次，每种语言各走一次，用一个和目标人群相符的测试账户。之后在 24 小时、48 小时再做一次简短检查：有人在领、奖励有到账、工单里没有出现新的同类问题。',
      ),
    },
  ],
  checklist: [
    L('Which of the four “live” states are actually done, with a date for each?', '四个「上线」状态里，哪些真的完成了？各自的日期是什么？'),
    L('Do the rule, copy, setup, support script and payout describe the same offer?', '规则、文案、后台设置、客服话术和派奖，描述的是同一个优惠吗？'),
    L('Has someone compared every language version clause by clause?', '有人逐条对比过每个语言版本吗？'),
    L('Is “a day” defined by one time zone and cut-off?', '「一天」是不是按同一个时区、同一个切分点？'),
    L('Can support answer “where is my reward?” without asking the campaign owner?', '客服能不能不问活动负责人，就回答「我的奖励在哪」？'),
    L('Can the report isolate this promotion from everything else running?', '报表能不能把这个活动和同时进行的其他活动分开？'),
  ],
  limits: L(
    'This checklist covers operational readiness. It does not replace legal or compliance review, and the rules for advertising bonuses differ by market. Responsible-gambling controls — limits, exclusions, who must not be targeted — always take priority over a launch date.',
    '这份清单管的是运营上的准备。它不能代替法务或合规审核，各市场对奖金广告的规定也不同。负责任博彩的控制——限额、自我排除、哪些人不能被推送——永远优先于上线日期。',
  ),
};

export const CRM_PLAYER_LIFECYCLE_GUIDE: IGamingGuide = {
  path: '/igaming/crm-player-lifecycle',
  fullSection: 'workflow',
  banner: 'loop',
  title: L(
    'iGaming CRM: map the player lifecycle with clear states and stop rules',
    'iGaming CRM：用清楚的状态和停止规则画出玩家生命周期',
  ),
  shortTitle: L('CRM and the player lifecycle', 'CRM 与玩家生命周期'),
  tags: [L('CRM', 'CRM'), L('Retention', '留存'), L('Lifecycle', '生命周期'), L('Responsible gambling', '负责任博彩')],
  standfirst: L(
    'Good CRM is not more messages. It is knowing which state a player is in, how long they have been there, and whether anything should be sent at all.',
    '好的 CRM 不是发更多消息，而是知道玩家现在处在哪个状态、在这个状态待了多久，以及到底该不该发任何东西。',
  ),
  answer: L(
    'Define a small set of player states, each with a time window. Let the state decide the message — or decide that no message is right. Every flow needs an exit: a reason to stop, and signals that override marketing entirely.',
    '定义少数几个玩家状态，每个都带时间窗口。让状态决定发什么——或者决定什么都不发。每条流程都要有出口：停下来的理由，以及能完全压过营销的信号。',
  ),
  blocks: [
    { kind: 'h', text: L('States, not campaigns', '先有状态，再有活动') },
    {
      kind: 'p',
      text: L(
        'Most CRM calendars start from campaigns: a weekend reload, a monthly newsletter, a holiday offer. The player receives all of them whatever they did last week. Start from the player instead. The states below are a common starting set; the windows are illustrative and should come from your own data.',
        '大部分 CRM 日程表是从活动出发的：周末充值优惠、月度通讯、节日活动。不管玩家上周做了什么，全都会收到。换个起点，从玩家出发。下面是一套常见的起步状态；时间窗口只是示例，应该用你自己的数据来定。',
      ),
    },
    {
      kind: 'table',
      head: [L('State', '状态'), L('Definition (example window)', '定义（示例窗口）'), L('What helps', '什么有帮助'), L('When to stop', '什么时候停')],
      rows: [
        [L('Registered, no deposit', '已注册未存款'), L('Signed up within the last 7 days, no successful deposit', '7 天内注册，没有成功存款'), L('Help finishing setup: verification, payment methods, where to get help', '帮他完成设置：验证、支付方式、哪里求助'), L('After the window, or on opt-out', '窗口结束，或玩家退订')],
        [L('First deposit', '首存'), L('First successful deposit in the last 7 days', '7 天内完成首次成功存款'), L('Clear explanation of any welcome offer and how withdrawal works', '把欢迎优惠和提款方式讲清楚'), L('Once onboarding questions are answered', '新手问题回答完')],
        [L('Active', '活跃'), L('Played in the last 14 days', '14 天内有游戏'), L('Service messages, relevant new games, account information', '服务类消息、相关的新游戏、账户信息'), L('Keep volume low — active players need little', '保持低频——活跃玩家不需要太多')],
        [L('Lapsing', '流失中'), L('No play for 15–30 days after being active', '活跃后 15–30 天没有游戏'), L('One relevant reminder, not a bonus ladder', '一次相关的提醒，而不是一层层加码的奖金'), L('No response after one or two touches', '一两次触达后没有回应')],
        [L('Dormant', '沉睡'), L('No play for 30+ days', '30 天以上没有游戏'), L('A low-frequency check-in, or nothing', '低频问候，或者什么都不发'), L('Default to stop; re-enter only on their own return', '默认停止；玩家自己回来才重新进入')],
        [L('Protected', '受保护'), L('Self-excluded, limit set, opted out, or showing risk signals', '自我排除、设了限额、退订，或出现风险信号'), L('No marketing at all; service and safer-gambling contact only', '不发任何营销；只做服务和更安全博彩相关的联系'), L('Overrides every other state', '压过所有其他状态')],
      ],
    },

    { kind: 'h', text: L('Event messages and calendar messages', '事件消息与日历消息') },
    {
      kind: 'cards',
      items: [
        { title: L('One-time, event-driven', '一次性，事件触发'), body: L('Registration, first deposit, first withdrawal, VIP upgrade. Sent because something just happened; mostly service, not selling.', '注册、首存、首次提款、VIP 升级。因为某件事刚发生才发；多数是服务，不是推销。') },
        { title: L('Recurring, calendar-driven', '周期性，日历触发'), body: L('Monthly summaries, scheduled newsletters. Sent to a state, never to the whole list by default.', '月度汇总、定期通讯。发给某个状态的人，默认不发给整份名单。') },
        { title: L('No action needed', '不需要动作'), body: L('A real branch in the flow. Many players in many states should receive nothing this week — and that is a decision, not a gap.', '流程里真实存在的一条分支。很多状态里的很多玩家，这周什么都不该收到——这是一个决定，不是漏掉。') },
      ],
    },
    {
      kind: 'callout',
      title: L('From the field', '来自实战'),
      body: L(
        'On the operator side I mapped customer journeys as flowcharts: registration, a first-deposit window, then active and inactive branches, with one-time and monthly email tracks kept apart. The most useful box on those maps turned out to be the plainest one: “No action needed”. Writing it down stopped the habit of sending everyone everything.',
        '在运营商那边，我把客户旅程画成流程图：注册、首存窗口，然后分出活跃和不活跃两条线，一次性邮件和月度邮件分开走。后来发现图上最有用的，反而是最朴素的那一格：「不需要动作」。把它写下来，就戒掉了「什么都发给所有人」的习惯。',
      ),
    },

    { kind: 'h', text: L('Lines a CRM flow should never cross', 'CRM 流程永远不该越过的线') },
    {
      kind: 'list',
      items: [
        L('Never trigger an offer from a loss. “You lost, here is more to play with” pushes the people most at risk.', '永远不要因为玩家输了就触发优惠。「你输了，再给你一点筹码」推的正是最有风险的那群人。'),
        L('Never imply a way to win. Tips, “hot games” or demo results do not predict real-money outcomes.', '永远不要暗示有赢的方法。技巧、「热门游戏」或试玩结果都不能预测真钱的结果。'),
        L('Respect consent per channel. Opting out of SMS is not permission to switch to messaging apps.', '按渠道尊重授权。退订短信，不等于允许你改用通讯软件联系。'),
        L('Let protection signals win automatically. A self-exclusion or deposit limit must remove the player from every marketing flow at once, not at the next list refresh.', '让保护信号自动优先。自我排除或存款限额一出现，就要立刻把玩家移出所有营销流程，而不是等下一次名单更新。'),
      ],
    },

    { kind: 'h', text: L('How to know if it worked', '怎么知道有没有用') },
    {
      kind: 'p',
      text: L(
        'Opens and clicks show that a message was seen, not that it changed anything. To measure the effect of a flow, hold back a random slice of each state that receives nothing, and compare the two groups over the same window. Read the difference — not the total — and include the cost of any bonus in it.',
        '打开和点击只说明消息被看到了，不说明它改变了什么。要衡量一条流程的效果，就在每个状态里随机留出一小部分人什么都不发，在同一个时间窗口比较两组。看差值而不是总数，并且把奖金成本算进去。',
      ),
    },
    {
      kind: 'table',
      head: [L('Number', '数字'), L('What it tells you', '它说明什么'), L('What it does not', '它不能说明什么')],
      rows: [
        [L('Open / click rate', '打开率 / 点击率'), L('The message reached and interested someone', '消息送到了，有人感兴趣'), L('Whether behaviour changed', '行为有没有改变')],
        [L('Return rate in the sent group', '发送组的回流率'), L('How many came back', '有多少人回来了'), L('How many would have come back anyway', '本来就会回来的有多少')],
        [L('Sent minus holdout', '发送组减对照组'), L('The effect of the flow', '这条流程的效果'), L('Long-term value, unless you keep watching', '长期价值——除非你持续观察')],
        [L('Bonus cost per returning player', '每个回流玩家的奖金成本'), L('What the effect cost', '这个效果花了多少'), L('Whether the player stayed', '玩家有没有留下来')],
      ],
    },
  ],
  checklist: [
    L('Does every player sit in exactly one state, with a time window?', '每个玩家是不是只处在一个状态里，而且有时间窗口？'),
    L('Does every flow have a “no action” branch and an exit?', '每条流程都有「不需要动作」的分支和出口吗？'),
    L('Do protection signals remove a player from marketing immediately?', '保护信号能不能立刻把玩家移出营销？'),
    L('Is consent checked per channel before every send?', '每次发送前，有没有按渠道检查授权？'),
    L('Is any message triggered by a loss? Remove it.', '有没有哪条消息是因为玩家输钱才触发的？删掉。'),
    L('Is there a holdout group, and is bonus cost counted in the result?', '有没有对照组？结果里有没有算上奖金成本？'),
  ],
  limits: L(
    'State windows here are examples; derive yours from your own player data. Marketing consent, contact rules and safer-gambling obligations are set by each jurisdiction and licence — follow those over anything in this guide. This guide does not cover VIP programme economics.',
    '这里的状态窗口只是示例；请用自己的玩家数据来定。营销授权、联系规则和更安全博彩的义务由各司法辖区和牌照规定——一律以它们为准。这篇不涵盖 VIP 计划的经济账。',
  ),
};

/** Every `/igaming/<guide>`, in reading order. Each also needs its own literal branch in `App.tsx`. */
export const IGAMING_GUIDES: IGamingGuide[] = [
  GGR_VS_NGR_GUIDE,
  PROVIDER_PROMOTIONS_GUIDE,
  PROMOTION_LAUNCH_CHECKLIST_GUIDE,
  CRM_PLAYER_LIFECYCLE_GUIDE,
];
