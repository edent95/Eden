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
  openGuide: L('Guide: GGR vs NGR vs Turnover', '专题：GGR、NGR 与流水的区别'),
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

export const IGAMING_GUIDES: IGamingGuide[] = [GGR_VS_NGR_GUIDE];
