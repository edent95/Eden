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
  /**
   * Plain-words version, shown right after the answer: one everyday scene with
   * small round numbers, then each industry term mapped to that scene.
   * Required — the user asked (2026-11-10) for every guide to read like this.
   */
  plain: IGamingPlain;
  blocks: CaseBlock[];
  checklist: IGamingLocalized[];
  limits: IGamingLocalized;
  /** Primary sources (regulators, standards bodies, official docs) that back the factual claims. */
  sources: IGamingGuideSource[];
};

export type IGamingPlain = {
  scene: IGamingLocalized;
  terms: Array<{ term: IGamingLocalized; everyday: IGamingLocalized }>;
  takeaway: IGamingLocalized;
};

/** One outbound citation. Only primary sources, each checked to resolve before it was added. */
export type IGamingGuideSource = {
  publisher: string;
  title: string;
  url: string;
  /** Publication or last-updated year shown on the page; 'n.d.' when the page carries none. */
  year: string;
  /** What this source backs up on the page, in one line. */
  supports: IGamingLocalized;
};

export const IGAMING_GUIDE_LABELS = {
  kicker: L('iGaming · Guide', 'iGaming · 专题'),
  plainKicker: L('Think of it like this', '打个比方'),
  plainTermHead: L('Industry term', '行业说法'),
  plainEverydayHead: L('In the example', '换成例子里'),
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
  sourcesTitle: L('References', '参考文献'),
  /** Date every reference was last checked to resolve; shown as the access date. */
  sourcesAccessed: L('10 Nov. 2026', '2026-11-10'),
  sourcesNote: L(
    'Bracketed numbers in the text point to the primary sources below. Field notes come from my own work; rules differ by jurisdiction, and these are UK and industry-standard references.',
    '正文中的方括号编号对应下列一手来源。实战部分来自我自己的工作；各地规则不同，这里列的是英国监管机构与行业标准的原文。',
  ),
};

const SOURCE_UKGC_GGY: IGamingGuideSource = {
  publisher: 'UK Gambling Commission',
  title: 'Industry statistics: April 2024 to March 2025',
  url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics-annual-report-financial-year-april-2024-to-march-2025',
  year: '2025',
  supports: L(
    'A regulator reporting market size in gross gambling yield (GGY), the amount operators keep after paying winnings.',
    '监管机构用 GGY(运营者付完奖金后留下的金额)来报告市场规模。',
  ),
};

const SOURCE_UKGC_RTS3: IGamingGuideSource = {
  publisher: 'UK Gambling Commission',
  title: 'Remote gambling and software technical standards — RTS 3: Rules, game descriptions and the likelihood of winning',
  url: 'https://www.gamblingcommission.gov.uk/standards/remote-gambling-and-software-technical-standards/rts-3-rules-game-descriptions-and-the-likelihood-of-winning',
  year: '2024',
  supports: L(
    'Game information must show players how the game works and its house edge or return to player (RTP).',
    '游戏信息必须向玩家说明玩法，以及庄家优势或 RTP。',
  ),
};

const SOURCE_UKGC_LIVE_RTP: IGamingGuideSource = {
  publisher: 'UK Gambling Commission',
  title: 'Testing strategy for compliance with RTS — Live RTP monitoring',
  url: 'https://www.gamblingcommission.gov.uk/manual/testing-strategy-for-compliance-with-remote-gambling-and-software-technical/5-live-rtp-monitoring',
  year: '2023',
  supports: L(
    'Licensees compare actual RTP with the advertised figure, for under- and overpayment, at a frequency set by volume of play.',
    '持牌方要拿实际 RTP 对比标示 RTP,少付多付都要查，频率按游戏量定。',
  ),
};

const SOURCE_GLI_19: IGamingGuideSource = {
  publisher: 'Gaming Laboratories International (GLI)',
  title: 'GLI-19: Standards for Interactive Gaming Systems, v3.0',
  url: 'https://gaminglabs.com/wp-content/uploads/2024/06/GLI-19-Interactive-Gaming-Systems-v3.0.pdf',
  year: '2020',
  supports: L(
    'The test-lab standard games are certified against, including payout percentages and RTP display (section 4.7).',
    '测试实验室认证游戏用的标准，包括返还率与 RTP 显示(第 4.7 节)。',
  ),
};

const SOURCE_UKGC_PROMOTIONS: IGamingGuideSource = {
  publisher: 'UK Gambling Commission',
  title: 'Gambling promotions to be safer and simpler',
  url: 'https://www.gamblingcommission.gov.uk/news/article/gambling-promotions-to-be-safer-and-simpler',
  year: '2025',
  supports: L(
    'Wagering requirements capped at 10 times the bonus and mixed-product promotions banned, in force from 19 January 2026.',
    '奖金流水要求上限为奖金的 10 倍、禁止跨产品捆绑促销，2026 年 1 月 19 日生效。',
  ),
};

const SOURCE_CMA_PROMOTIONS: IGamingGuideSource = {
  publisher: 'Competition and Markets Authority (GOV.UK)',
  title: "Online gambling promotions: do's and don'ts for online gambling firms",
  url: 'https://www.gov.uk/government/publications/online-gambling-promotions-dos-and-donts/online-gambling-promotions-dos-and-donts-for-online-gambling-firms',
  year: '2018',
  supports: L(
    'Terms told clearly and up front, bonus funds distinguishable from own money, and customers free to exit a promotion with their deposit.',
    '条款要清楚、及时讲明，奖金和玩家自己的钱要分得清，玩家随时能带着本金退出促销。',
  ),
};

const SOURCE_UKGC_CUSTOMER_INTERACTION: IGamingGuideSource = {
  publisher: 'UK Gambling Commission',
  title: 'Customer interaction guidance for remote gambling licensees',
  url: 'https://www.gamblingcommission.gov.uk/guidance/customer-interaction-guidance-for-remote-gambling-licensees-formal-guidance/introduction-customer-interaction-guidance-for-remote-gambling-licensees-sr',
  year: '2023',
  supports: L(
    'Operators must identify signs of harm, act on them and evaluate what they did (in effect from 31 October 2023).',
    '运营者要识别伤害迹象、采取行动、评估效果(2023 年 10 月 31 日起生效)。',
  ),
};

const SOURCE_ICO_EMAIL_MARKETING: IGamingGuideSource = {
  publisher: "Information Commissioner's Office (ICO)",
  title: 'Guide to PECR — Electronic mail marketing',
  url: 'https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/',
  year: 'n.d.',
  supports: L(
    'Marketing emails and texts to individuals need specific consent; the "soft opt-in" exception is narrow.',
    '向个人发营销邮件或短信需要明确同意;「soft opt-in」例外范围很窄。',
  ),
};

const SOURCE_GAMSTOP: IGamingGuideSource = {
  publisher: 'GAMSTOP',
  title: 'GAMSTOP — free online self-exclusion scheme',
  url: 'https://www.gamstop.co.uk/',
  year: 'n.d.',
  supports: L(
    'A national self-exclusion scheme: one sign-up blocks a player across participating operators.',
    '全国性的自我排除计划：玩家登记一次，所有参与的运营者都会把他挡在外面。',
  ),
};

const SOURCE_UKGC_SOFTWARE_LICENCE: IGamingGuideSource = {
  publisher: 'UK Gambling Commission',
  title: 'What is gambling software?',
  url: 'https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/what-is-gambling-software',
  year: '2024',
  supports: L(
    'Game providers that make, supply, install or adapt gambling software need their own licence — the B2B side is regulated too.',
    '制作、供应、安装或改动博彩软件的游戏供应商要有自己的牌照——B2B 这一侧同样受监管。',
  ),
};

const SOURCE_GA4_COHORTS: IGamingGuideSource = {
  publisher: 'Google Analytics Help',
  title: '[GA4] Cohort exploration',
  url: 'https://support.google.com/analytics/answer/9670133?hl=en',
  year: 'n.d.',
  supports: L(
    'How a cohort is defined (users grouped by when they first did something) and tracked over later periods.',
    '同期群怎么定义(按第一次做某件事的时间分组),以及之后各期怎么追踪。',
  ),
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
  plain: {
    scene: L(
      'Picture a ring-toss stall at a night market. One evening, players buy 500 of tokens and cash 300 back in at closing. In between they keep throwing — win tokens, throw them again — until 4,000 of throws have gone through. The stall pays out 3,840 in prizes, so it keeps 160. It also gives away 30 of free throws to pull people in.',
      '想象夜市的套圈摊。一晚上，客人一共买了 500 块的代币，收摊前换回 300 块现金。中间大家一直套，赢了代币又接着套，加起来一共套了 4,000 块。摊主赔出 3,840 块的奖品，自己留下 160。为了招客，还送出了 30 块的免费圈。',
    ),
    terms: [
      { term: L('Turnover', '流水'), everyday: L('All the throws: 4,000. It says the stall was busy, not that it earned 4,000.', '一共套了多少：4,000。说明很热闹，不说明赚了 4,000。') },
      { term: L('GGR', 'GGR'), everyday: L('What the stall kept after prizes: 160.', '赔完奖品，摊主留下的：160。') },
      { term: L('NGR', 'NGR'), everyday: L('Minus the free throws: 160 − 30 = 130.', '再扣掉送出去的免费圈：160 − 30 = 130。') },
      { term: L('Net deposits', '净存款'), everyday: L('Cash in minus cash out: 500 − 300 = 200. It is more than 160 because 40 is still in players’ pockets as tokens — they can cash it in tomorrow.', '进来的现金减走掉的现金：500 − 300 = 200。比 160 多，是因为还有 40 块代币在客人手上，明天可能换回去。') },
    ],
    takeaway: L(
      'Four numbers, four questions: how busy was it, how much did the games win, how much was left after the giveaways, and how much cash actually came in.',
      '四个数字，回答四个问题：有多热闹、游戏赢了多少、扣掉赠送还剩多少、真正进来多少现金。',
    ),
  },
  blocks: [
    { kind: 'h', text: L('The four definitions', '四个定义') },
    {
      kind: 'table',
      head: [L('Metric', '指标'), L('Formula', '算法'), L('The question it answers', '它回答的问题')],
      rows: [
        [L('Turnover (handle)', '流水（turnover / handle）'), L('Sum of all stakes', '所有下注额相加'), L('How much playing happened?', '玩得有多活跃？')],
        [L('GGR', 'GGR（博彩毛收入）'), L('Stakes − winnings paid[1]', '下注 − 派彩[1]'), L('How much did the games win?', '游戏本身赢了多少？')],
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
        'Hold = GGR ÷ turnover. A slot with 96% RTP has a theoretical hold of about 4% over a very large number of spins. On a single day one big win can push hold — and GGR — below zero. Read hold over weeks and per game, not per day.[2]',
        'Hold = GGR ÷ 流水。RTP 96% 的老虎机，理论 hold 大约 4%，但那是在极大量的局数上。单独一天，一个大奖就能把 hold 和 GGR 打成负数。看 hold 要按周、按游戏看，不要按天下结论。[2]',
      ),
    },

    {
      kind: 'widget',
      widget: 'ggr-waterfall',
      title: L('Try it: move hold and bonus cost', '动手试：拖动 hold 和奖金成本'),
      caption: L(
        'Net deposits stay at 20,000 whatever the games do. Drag hold down to 1% and GGR falls to 4,000; push bonus cost past GGR and NGR goes negative on a day cash still came in.',
        '不管游戏输赢，净存款都停在 20,000。把 hold 拖到 1%,GGR 只剩 4,000;把奖金成本拖到超过 GGR,NGR 变成负数——而那天现金照样是净流入。',
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
  sources: [SOURCE_UKGC_GGY, SOURCE_UKGC_RTS3],
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
  plain: {
    scene: L(
      'Think of a supermarket. Snack brands want their chips on the shelf right by the entrance. One brand tells the supermarket: “Put us at the entrance for a month and we’ll cut our price.” A second brand offers the same deal — for the same shelf. Each deal is good on its own. You still can’t say yes to both: there is only one entrance shelf.',
      '想象一家超市。零食品牌都想把自己的薯片摆在门口那排货架。某个品牌跟超市说：「把我们摆门口一个月，进货价给你打折。」另一个品牌也开出一样的条件，要的也是同一排。每一单单独看都划算，但门口只有一排，不可能两家都答应。',
    ),
    terms: [
      { term: L('Game provider', '游戏供应商'), everyday: L('The snack brand that makes the product.', '做零食的品牌。') },
      { term: L('Operator', '运营商'), everyday: L('The supermarket shoppers walk into.', '顾客走进去的那家超市。') },
      { term: L('Aggregator', '聚合商'), everyday: L('The wholesaler that supplies many brands to many shops.', '批发商：一头连着很多品牌，一头连着很多超市。') },
      { term: L('Lobby position', '大厅位置'), everyday: L('The shelf spot: entrance, eye level, end of aisle.', '货架位置：门口、齐眼高、走道尽头。') },
      { term: L('Fee waiver for placement', '免费期换位置'), everyday: L('A discount the brand gives in exchange for the good shelf.', '品牌用进货折扣，换一个好货架。') },
    ],
    takeaway: L(
      'A promotion deal is a trade: the brand pays with a discount, the shop pays with shelf space. Write down both sides before you say yes.',
      '促销合作就是一笔交换：品牌用折扣付钱，超市用货架付钱。答应之前，把两边各付什么都写下来。',
    ),
  },
  blocks: [
    { kind: 'h', text: L('Two layers in one campaign', '一个活动里的两层') },
    {
      kind: 'p',
      text: L(
        'A provider (the game studio) wants its titles played. An operator (the casino brand) wants offers that bring players back without wrecking its margin. An aggregator sits between many of each. When a provider “runs a promotion”, it can mean a player-facing mechanic, a commercial incentive for the operator, or both bundled in one announcement.[1]',
        '供应商（游戏工作室）希望自己的游戏有人玩。运营商（面向玩家的娱乐场品牌）想要能把玩家拉回来、又不吃掉利润的优惠。聚合商夹在很多家供应商和很多家运营商中间。供应商说「我们在做促销」，可能是一个面向玩家的机制，可能是给运营商的商业激励，也可能两者捆在同一则公告里。[1]',
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

    {
      kind: 'widget',
      widget: 'slot-planner',
      title: L('Try it: the placement checker', '动手试：位置冲突检查'),
      caption: L(
        'The example above, live. Taking deals one by one leaves C without a slot; matching them together finds room once B accepts position 3. Change the ticks to test your own deals.',
        '上面的例子，可以直接操作。一笔一笔接，C 就没位置;一起排，只要 B 接受第 3 位就都放得下。改勾选，试试你自己的交易。',
      ),
    },
    { kind: 'h', text: L('Price the benefit before you compare offers', '比较优惠之前，先算清它值多少') },
    {
      kind: 'list',
      items: [
        L('A “50% GGR discount” is half of one fee line, not 50% more profit. Other costs and player behaviour do not change.[2]', '「GGR 五折」是某一项费用减半，不是利润多 50%。其他成本和玩家行为都没变。[2]'),
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
  sources: [SOURCE_UKGC_SOFTWARE_LICENCE, SOURCE_UKGC_GGY],
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
  plain: {
    scene: L(
      'A café adds a new drink at half price for its first week. Ask “is it live?” and you can mean four things: the kitchen can make it, someone has tasted it, the owner has approved the price, and the half-price week has started. The drink also lives in five places at once — the recipe, the menu board, the till, what the staff say, and the discount at the counter. If the board says half price and the till charges full price, the customer notices before you do.',
      '咖啡店上了一款新饮品，第一周半价。问一句「上了没有？」,其实可能是四件事：厨房会做了、有人试喝过了、老板批了价钱、半价那一周开始算了。这杯饮品还同时存在五个地方：配方、菜单牌、收银机、店员的说法、柜台的折扣。菜单牌写半价、收银机却收全价，最先发现的一定是客人。',
    ),
    terms: [
      { term: L('Technically live', '技术上线'), everyday: L('The kitchen can make it.', '厨房做得出来。') },
      { term: L('Tested', '测过了'), everyday: L('Someone has tasted it.', '有人试喝过。') },
      { term: L('Approved', '批准了'), everyday: L('The owner signed off the price.', '老板签了价钱。') },
      { term: L('Benefit started', '优惠开始'), everyday: L('The half-price week starts counting.', '半价那一周开始算。') },
      { term: L('Terms, setup and copy agree', '条款、设置、文案一致'), everyday: L('Menu board, till, staff and counter all say the same thing.', '菜单牌、收银机、店员、柜台说的都一样。') },
    ],
    takeaway: L(
      'Before you say “live”, say which of the four you mean — and on launch day, buy one yourself like a customer.',
      '说「上线」之前，先讲清楚是四件事里的哪一件；上线当天，自己当一次客人买一杯。',
    ),
  },
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
        { title: L('The copy', '文案'), body: L('Banner, landing page and T&Cs — in every language you publish.[1]', '横幅、落地页和条款——每一种发布的语言。[1]') },
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
        [L('Wagering', '流水要求'), L('Multiplier, on what amount, which games count and at what weight[2]', '几倍、按什么金额算、哪些游戏算、各算多少比例[2]')],
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
  sources: [SOURCE_CMA_PROMOTIONS, SOURCE_UKGC_PROMOTIONS],
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
  plain: {
    scene: L(
      'Think of a gym. Someone signed up last week and never came in — they need help getting started, not a discount. A regular who trains three times a week doesn’t need a message at all. Someone who stopped coming a month ago might get one friendly check-in, not a text every day. And a member who asked to pause gets nothing until they say otherwise.',
      '想象一间健身房。上周刚报名、一次都没来的人，需要的是有人教他怎么开始，不是打折券。一周来三次的老会员，根本不用发信息给他。一个月没来的人，可以友善地问候一次，不是天天轰炸。主动说要暂停会籍的人，在他自己开口之前，什么都不要发。',
    ),
    terms: [
      { term: L('Player state', '玩家状态'), everyday: L('Where the member is right now: new, regular, drifting away.', '会员现在处在哪个阶段：新来的、常来的、快流失的。') },
      { term: L('“No action needed”', '「不需要动作」'), everyday: L('Leave the regulars alone.', '常来的会员，就别打扰。') },
      { term: L('Stop rule', '停止规则'), everyday: L('A pause request beats any campaign, immediately.', '会员说要暂停，比任何活动都优先，马上生效。') },
      { term: L('Holdout group', '对照组'), everyday: L('Keep a few people off the list to see whether the message changed anything.', '留一小部分人不发，看看发了到底有没有差别。') },
    ],
    takeaway: L(
      'Start from the person, not from the campaign calendar. Sometimes the right message is no message.',
      '从「这个人现在需要什么」出发，不是从活动日历出发。有时候最好的信息，就是不发。',
    ),
  },
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
        L('Never trigger an offer from a loss. “You lost, here is more to play with” pushes the people most at risk.[1]', '永远不要因为玩家输了就触发优惠。「你输了，再给你一点筹码」推的正是最有风险的那群人。[1]'),
        L('Never imply a way to win. Tips, “hot games” or demo results do not predict real-money outcomes.', '永远不要暗示有赢的方法。技巧、「热门游戏」或试玩结果都不能预测真钱的结果。'),
        L('Respect consent per channel. Opting out of SMS is not permission to switch to messaging apps.[2]', '按渠道尊重授权。退订短信，不等于允许你改用通讯软件联系。[2]'),
        L('Let protection signals win automatically. A self-exclusion or deposit limit must remove the player from every marketing flow at once, not at the next list refresh.[3]', '让保护信号自动优先。自我排除或存款限额一出现，就要立刻把玩家移出所有营销流程，而不是等下一次名单更新。[3]'),
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
  sources: [SOURCE_UKGC_CUSTOMER_INTERACTION, SOURCE_ICO_EMAIL_MARKETING, SOURCE_GAMSTOP],
};

export const MARKETING_REPORT_GUIDE: IGamingGuide = {
  path: '/igaming/marketing-report-beyond-cpa',
  fullSection: 'reporting',
  banner: 'ledger',
  title: L(
    'What an iGaming marketing report should explain beyond CPA',
    'iGaming 营销报表除了 CPA，还该讲清楚什么',
  ),
  shortTitle: L('Marketing reports beyond CPA', '营销报表不只看 CPA'),
  tags: [L('Reporting', '报表'), L('Acquisition', '获客'), L('Metrics', '指标'), L('Marketing', '营销')],
  standfirst: L(
    'CPA tells you what a depositor cost. It does not tell you whether that depositor was worth it, whether the count is right, or what to do next. A useful marketing report connects cost to what happened after the first deposit — and says how each number is calculated.',
    'CPA 告诉你一个存款玩家花了多少钱，但不告诉你这个玩家值不值、这个数有没有算对、下一步该做什么。有用的营销报表，要把成本和首存之后发生的事连起来——并且讲清楚每个数字是怎么算的。',
  ),
  answer: L(
    'Put cost next to the whole chain — registrations, first deposits, deposit value, revenue, and who is still playing a month later — on the same cohort. Write each metric’s formula next to its name. Then end every section with what the number suggests you check or change.',
    '把成本放在整条链旁边——注册、首存、存款金额、收入、一个月后还有谁在玩——而且用同一批人来算。每个指标名称旁边写上公式。每一节最后，写这个数字提示你去检查什么、改什么。',
  ),
  plain: {
    scene: L(
      'A tuition centre runs two ads. Ad A gets parents to book a free trial class for 20 per booking — cheap — but most children come once and never return. Ad B costs 60 per booking, but those children stay for a year. Judged on cost per booking, Ad A wins. Judged on who is still enrolled three months later, Ad B wins by a mile.',
      '补习中心打两个广告。广告 A 让家长报名免费试听，每个报名只花 20 块，很便宜，但大多数孩子来一次就不见了。广告 B 每个报名要 60 块，可是这些孩子一读就是一年。只看「每个报名多少钱」,A 赢；看「三个月后还有谁在读」,B 赢很多。',
    ),
    terms: [
      { term: L('CPA / cost per FTD', 'CPA / 每个首存的成本'), everyday: L('Cost per booking.', '每个报名花多少钱。') },
      { term: L('FTD (first-time depositor)', 'FTD(首存玩家)'), everyday: L('A parent who actually paid for the first month.', '真的付了第一个月学费的家长。') },
      { term: L('NGR per FTD', '每个首存的 NGR'), everyday: L('What one student is worth after a few months.', '一个学生读几个月下来值多少。') },
      { term: L('Cohort', '同期群'), everyday: L('Everyone who enquired in March, followed over time.', '把三月来问的人放成一组，一路跟下去看。') },
    ],
    takeaway: L(
      'Cheap to get is not the same as worth getting. Follow the same group of people, not just the calendar month.',
      '便宜拿到，不等于值得拿。跟着同一批人看，不要只看日历上的一个月。',
    ),
  },
  blocks: [
    { kind: 'h', text: L('One chain, many “cost per” numbers', '一条链，很多个「每个多少钱」') },
    {
      kind: 'path',
      steps: [L('Spend', '花费'), L('Clicks', '点击'), L('Registrations', '注册'), L('First deposits', '首存'), L('Deposit value', '存款金额'), L('GGR / NGR', 'GGR / NGR'), L('Still active at day 30', '第 30 天仍活跃')],
    },
    {
      kind: 'table',
      head: [L('Metric', '指标'), L('Formula', '算法'), L('It answers', '它回答'), L('It does not answer', '它不回答')],
      rows: [
        [L('Cost per registration', '每个注册成本'), L('Spend ÷ registrations', '花费 ÷ 注册数'), L('How cheap is the top of the funnel?', '漏斗顶端便不便宜？'), L('Whether anyone deposits', '有没有人会存款')],
        [L('CPA / cost per FTD', 'CPA / 每个首存成本'), L('Spend ÷ first-time depositors', '花费 ÷ 首存人数'), L('What one new depositor cost', '一个新存款玩家花了多少'), L('What that depositor is worth', '这个玩家值多少')],
        [L('Average first deposit', '平均首存金额'), L('FTD amount ÷ FTDs', '首存总额 ÷ 首存人数'), L('How big the first commitment is', '第一笔投入有多大'), L('Whether they come back', '他们会不会回来')],
        [L('NGR per FTD (30 days)', '每个首存玩家 30 天 NGR'), L('NGR from the cohort ÷ its FTDs', '这批人的 NGR ÷ 首存人数'), L('What the cohort earned so far', '这批人目前带来了多少'), L('Lifetime value', '终身价值')],
        [L('Payback', '回本'), L('Cumulative cohort NGR ÷ spend', '这批人累计 NGR ÷ 花费'), L('Has the spend come back yet?', '花的钱回来了没有？'), L('Whether it will keep coming', '之后会不会继续回来')],
        [L('Day-30 active rate', '第 30 天活跃率'), L('Active at day 30 ÷ FTDs', '第 30 天仍活跃 ÷ 首存人数'), L('Did they stay?', '他们留下来了吗？'), L('Why they left', '为什么离开')],
      ],
    },
    {
      kind: 'p',
      text: L(
        'A channel with a high CPA can be the best channel. A channel with a low CPA can be the most expensive one, if its depositors make one small deposit and disappear — or claim a bonus and leave.',
        'CPA 高的渠道，可能是最好的渠道。CPA 低的渠道，也可能是最贵的——如果它带来的玩家只存一小笔就消失，或者领了奖金就走。',
      ),
    },

    {
      kind: 'widget',
      widget: 'channel-value',
      title: L('Try it: rank the same three channels two ways', '动手试：同样三个渠道，两种排法'),
      caption: L(
        'Switch the ranking. The cheapest channel by CPA is the only one whose depositors are worth less than they cost.',
        '切换排序。CPA 最便宜的渠道，是唯一一个首存玩家价值低于获客成本的。',
      ),
    },
    { kind: 'h', text: L('A metric name is not a definition', '指标名称不等于定义') },
    {
      kind: 'callout',
      title: L('From the field', '来自实战'),
      body: L(
        'Reviewing an old marketing budget workbook, I found a column labelled “ROI (money spent to earn 1 unit)”. Its formula divided one cost line by average deposit per registration. Whatever it measured, it was not return on investment — and anyone reading only the header would have compared it with real ROI figures from other reports.',
        '翻一份旧的营销预算表时，我看到一栏叫「ROI（赚 1 块要花多少）」。它的公式是拿某一项成本，除以每个注册的平均存款。不管它量的是什么，都不是投资回报率——而只看表头的人，会把它拿去和其他报表里真正的 ROI 比较。',
      ),
    },
    {
      kind: 'list',
      items: [
        L('Write the formula under every header, in words. “FTD = first successful deposit in the period, by deposit date.”', '每个表头下面用文字写公式。「首存 = 期间内第一次成功存款，按存款日期算」。'),
        L('Count people and count transactions in different columns. “Deposits” can mean either.', '人数和笔数分开两栏。「存款」两种意思都可能。'),
        L('State the sign convention. Is GGR shown from the house side or the player side? Are withdrawals negative?', '写清楚正负号。GGR 是站在庄家这边还是玩家这边？提款是不是负数？'),
        L('Do not call deposits “revenue”. Cash in is not money won.[1]', '不要把存款叫「收入」。进来的现金，不等于赢到的钱。[1]'),
      ],
    },

    { kind: 'h', text: L('Calendar month vs cohort (illustrative)', '自然月 vs 同批人（示例）') },
    {
      kind: 'p',
      text: L(
        'The figures below are invented. Registrations in March and first deposits in March are not the same people: some March depositors registered in February.',
        '下面的数字是编的。三月的注册和三月的首存不是同一批人：有些三月首存的人，是二月注册的。',
      ),
    },
    {
      kind: 'table',
      head: [L('View', '看法'), L('Registrations', '注册'), L('FTDs', '首存'), L('Conversion', '转化率')],
      rows: [
        [L('Calendar: everything that happened in March', '自然月：三月发生的所有事'), L('2,000', '2,000'), L('700', '700'), L('35%', '35%')],
        [L('Cohort: March registrations, FTD within 14 days', '同批人：三月注册、14 天内首存'), L('2,000', '2,000'), L('520', '520'), L('26%', '26%')],
      ],
    },
    {
      kind: 'p',
      text: L(
        'The calendar view looks better because it borrows depositors from February’s campaign. If March spend changed, only the cohort view tells you whether March’s traffic converted. Use calendar views for cash and operations; use cohorts to judge a campaign or a channel.[2]',
        '自然月的数字比较好看，因为它借用了二月活动带来的首存。如果三月的花费有变化，只有同批人的看法能告诉你三月的流量到底转化得怎样。现金和运营用自然月看；评判一个活动或渠道，用同批人看。[2]',
      ),
    },

    { kind: 'h', text: L('What each section of the report should end with', '报表每一节最后应该写什么') },
    {
      kind: 'cards',
      items: [
        { title: L('What changed', '变了什么'), body: L('Against which period, on which cohort, in which currency and time zone.', '和哪一段比？用哪一批人？什么币种、什么时区？') },
        { title: L('Where in the chain', '链上哪一环'), body: L('Registration, verification, deposit attempt, deposit success, or later activity.', '注册、验证、存款尝试、存款成功，还是之后的活跃。') },
        { title: L('What to check next', '下一步查什么'), body: L('A tracking change, a payment issue, a traffic mix shift, a bonus being farmed.', '追踪设置变了？支付出问题？流量结构变了？奖金被薅？') },
      ],
    },
    {
      kind: 'callout',
      title: L('Duplicate and bonus-only accounts', '重复账户与只为奖金来的账户'),
      body: L(
        'A cheap channel full of duplicate accounts or players who only claim the welcome offer will look excellent on CPA and terrible on NGR per FTD. Keep a column for accounts flagged by risk review, and read channel results with it.',
        '一个充满重复账户、或只来领欢迎优惠的玩家的便宜渠道，CPA 看起来很漂亮，每个首存玩家的 NGR 却很难看。留一栏放被风控标记的账户，看渠道结果时一起看。',
      ),
    },
  ],
  checklist: [
    L('Is each metric’s formula written next to its name?', '每个指标的公式，都写在名称旁边了吗？'),
    L('Are people and transactions counted separately?', '人数和笔数是不是分开算？'),
    L('Is conversion measured on a cohort with a fixed window?', '转化率是不是用同一批人、固定窗口来算？'),
    L('Does the report go past the first deposit — NGR and activity after 30 days?', '报表有没有越过首存——看到 30 天后的 NGR 和活跃？'),
    L('Are GGR and withdrawal signs stated?', 'GGR 和提款的正负号写清楚了吗？'),
    L('Are risk-flagged accounts visible per channel?', '每个渠道被风控标记的账户看得到吗？'),
    L('Does every section end with a next action?', '每一节最后有没有写下一步？'),
  ],
  limits: L(
    'Windows (14 days, 30 days) and formulas here are examples; use the definitions your finance team and partners have agreed. Affiliate CPA and revenue-share terms are defined by each contract. All numbers on this page are illustrative.',
    '这里的窗口（14 天、30 天）和公式都是示例；以你的财务团队与合作方约定的定义为准。代理的 CPA 与分成条款以各自合同为准。本页所有数字都是示例。',
  ),
  sources: [SOURCE_UKGC_GGY, SOURCE_GA4_COHORTS],
};

export const RTP_EXPLAINED_GUIDE: IGamingGuide = {
  path: '/igaming/rtp-explained',
  fullSection: 'starter',
  banner: 'table',
  title: L(
    'RTP explained for operators: theoretical return, observed return, and why a week of data proves little',
    '给运营者的 RTP 解释：理论返还、实际返还，以及为什么一周的数据证明不了什么',
  ),
  shortTitle: L('RTP explained', 'RTP 是什么'),
  tags: [L('RTP', 'RTP'), L('Games', '游戏'), L('Variance', '波动'), L('Beginner', '入门')],
  standfirst: L(
    'RTP is the most quoted number about a slot and one of the most misread. It is a property of the game’s maths over an enormous number of rounds — not a forecast for a player, a day, or a promotion.',
    'RTP 是老虎机最常被引用的数字，也是最常被误读的数字之一。它是游戏数学在极大量局数上的性质——不是对某个玩家、某一天或某个活动的预测。',
  ),
  answer: L(
    'Theoretical RTP is what a game is designed to pay back over the long run; 96% means 4% theoretical hold. Observed RTP is winnings ÷ turnover for the period you measured, and on small samples it can land far from the design. Judge a game or an RTP change on enough rounds, not on one week’s GGR.',
    '理论 RTP 是游戏设计上长期会返还的比例；96% 表示理论 hold 是 4%。实际 RTP 是你量的那段时间里 派彩 ÷ 流水，样本小的时候可能离设计值很远。评判一个游戏或一次 RTP 调整，要看足够的局数，而不是一周的 GGR。',
  ),
  plain: {
    scene: L(
      'Flip a fair coin 10 times and getting 7 heads is no surprise. Flip it 10,000 times and you will land very close to half. RTP works the same way: a 96% slot pays back about 96 of every 100 bet — averaged over millions of spins. One week of one game is the 10-flip version.',
      '一个公平的硬币丢 10 次，出 7 次正面一点也不奇怪；丢 1 万次，就会非常接近一半。RTP 也是这样：RTP 96% 的老虎机，每下注 100 大约返还 96——但那是几百万局之后的平均。一个游戏一周的数据，就像只丢了 10 次。',
    ),
    terms: [
      { term: L('Theoretical RTP', '理论 RTP'), everyday: L('The coin is fair: half and half by design.', '硬币本身是公平的：设计上就是一半一半。') },
      { term: L('Observed RTP', '实际 RTP'), everyday: L('What you actually got in your flips.', '你真的丢出来的结果。') },
      { term: L('Hold', 'Hold'), everyday: L('The house’s share: 100 − 96 = 4 of every 100, in the long run.', '庄家留下的那份：长期来看每 100 留 4。') },
      { term: L('Sample size', '样本量'), everyday: L('How many times you flipped.', '你丢了几次。') },
    ],
    takeaway: L(
      'A strange week is usually the coin, not a broken game. Count the spins before you judge.',
      '某一周数字很怪，多半是运气，不是游戏坏了。下结论之前，先数一数局数。',
    ),
  },
  blocks: [
    { kind: 'h', text: L('Two RTPs', '两个 RTP') },
    {
      kind: 'table',
      head: [L('', ''), L('Theoretical RTP', '理论 RTP'), L('Observed RTP', '实际 RTP')],
      rows: [
        [L('Where it comes from', '从哪来'), L('The game’s maths and certified configuration', '游戏数学与认证过的配置'), L('Winnings paid ÷ turnover in your data', '你数据里的 派彩 ÷ 流水')],
        [L('Changes when', '什么时候会变'), L('A different configuration is deployed', '换了另一套配置'), L('Every round', '每一局')],
        [L('Good for', '适合用来'), L('Comparing games, pricing, compliance', '比较游戏、定价、合规'), L('Monitoring, spotting real faults over large samples[1]', '监控，以及在大样本上发现真正的异常[1]')],
        [L('Misused as', '常被误用成'), L('A promise to a player', '对玩家的承诺'), L('A verdict after a few days', '几天后的定论')],
      ],
    },
    {
      kind: 'p',
      text: L(
        'Hold is the other side: hold = GGR ÷ turnover = 1 − observed RTP. A game with 96% theoretical RTP has about 4% theoretical hold. Jackpot contributions are often counted inside the RTP figure, which matters when you compare a jackpot game with a non-jackpot one.',
        'Hold 是另一面：hold = GGR ÷ 流水 = 1 − 实际 RTP。理论 RTP 96% 的游戏，理论 hold 大约 4%。Jackpot 的抽成通常算在 RTP 里，拿 jackpot 游戏和非 jackpot 游戏比较时要注意。',
      ),
    },

    { kind: 'h', text: L('How far observed RTP can drift (illustrative)', '实际 RTP 会偏多远（示例）') },
    {
      kind: 'p',
      text: L(
        'Assume a 96% game where the payout of a single spin has a standard deviation of 5× the stake — a medium-volatility slot. The range below is roughly where observed RTP lands 95% of the time. Higher volatility widens every row.',
        '假设一个 96% 的游戏，单局派彩的标准差是下注额的 5 倍——一个中等波动的老虎机。下面的范围大约是实际 RTP 95% 的时候会落在的区间。波动越高，每一行都越宽。',
      ),
    },
    {
      kind: 'table',
      head: [L('Spins measured', '统计的局数'), L('Typical range of observed RTP', '实际 RTP 的常见范围'), L('What you can conclude', '能得出什么结论')],
      rows: [
        [L('1,000', '1,000'), L('about 64% – 128%', '约 64% – 128%'), L('Nothing about the game', '对游戏本身得不出任何结论')],
        [L('100,000', '100,000'), L('about 92.8% – 99.2%', '约 92.8% – 99.2%'), L('Rough sense; still noisy', '有个大概；仍然很吵')],
        [L('10,000,000', '10,000,000'), L('about 95.7% – 96.3%', '约 95.7% – 96.3%'), L('Close to the design', '接近设计值')],
      ],
    },
    {
      kind: 'p',
      text: L(
        'The width shrinks with the square root of the number of spins: a hundred times more data gives a range ten times narrower. A single big win can dominate a small sample, which is why one game’s GGR can swing negative on a quiet day without anything being broken.',
        '范围随局数的平方根收窄：数据多一百倍，范围窄十倍。小样本里，一个大奖就能主导结果——所以某个游戏的 GGR 在冷清的一天变成负数，不代表有什么东西坏了。',
      ),
    },

    {
      kind: 'widget',
      widget: 'rtp-convergence',
      title: L('Try it: 12 players, one 96% slot', '动手试：12 个玩家，同一台 96% 的老虎机'),
      caption: L(
        'Hover or tab across the chart to read the range at any number of spins, and rerun to see a different set of sessions. The shaded band is the same maths as the table above.',
        '把鼠标移到图上(或用 Tab 键),看任意局数下的范围;点「重跑」换一批玩家。阴影带和上面那张表是同一套算法。',
      ),
    },
    { kind: 'h', text: L('Choosing or changing an RTP configuration', '选择或调整 RTP 配置') },
    {
      kind: 'p',
      text: L(
        'Many games are certified in several RTP versions. A lower setting raises theoretical hold per bet, but players may play less, and some markets set minimum RTPs or require the setting to be disclosed. Any change must be an approved configuration, and the terms shown to players must match it.[2][3]',
        '很多游戏有几套认证过的 RTP 版本。设得低一点，每注的理论 hold 会上升，但玩家可能玩得少；有些市场规定最低 RTP，或要求公开显示。任何调整都必须是获批的配置，而且给玩家看的说明要和它一致。[2][3]',
      ),
    },
    {
      kind: 'callout',
      title: L('From the field', '来自实战'),
      body: L(
        'When a provider offered RTP adjustment support as a selling point to operators, my first question was how anyone would know it had worked. A higher-hold configuration and a good week look the same in a short GGR report. We looked at sample size, game mix and player mix first, and discussed a small conditional rebate to share the risk while the data built up.',
        '有家供应商把「协助调整 RTP」当成卖点推给运营商时，我的第一个问题是：怎么知道它有效？在短期的 GGR 报表里，hold 更高的配置和一个运气好的星期看起来一模一样。我们先看样本量、游戏组合和玩家组合，再讨论用一个小额的有条件返利，在数据累积期间分担风险。',
      ),
    },
    {
      kind: 'list',
      items: [
        L('Compare before and after on turnover-weighted hold, not on GGR alone — GGR also moves with volume.', '前后比较看按流水加权的 hold，不要只看 GGR——GGR 也会随流水量变。'),
        L('Keep the game mix fixed, or compare per game.', '保持游戏组合不变，或者按游戏分开比。'),
        L('Watch activity too. A higher hold that cuts play time can lower GGR.', '也要看活跃度。hold 升高但游戏时长下降，GGR 可能反而变低。'),
        L('Decide the evaluation window before the change, not after seeing the numbers.', '在调整之前就定好评估窗口，不要看到数字后才定。'),
      ],
    },
  ],
  checklist: [
    L('Is this theoretical RTP or observed RTP?', '这是理论 RTP 还是实际 RTP？'),
    L('How many rounds is the observed figure based on?', '实际数字是基于多少局？'),
    L('Is jackpot contribution inside or outside the RTP?', 'Jackpot 抽成算在 RTP 里面还是外面？'),
    L('Is the configuration certified and approved for this market?', '这套配置在这个市场有认证、获批吗？'),
    L('Do player-facing game rules show the RTP actually deployed?', '给玩家看的游戏规则，显示的是实际部署的 RTP 吗？'),
    L('Was the evaluation window fixed before the change?', '评估窗口是不是在调整前就定好了？'),
  ],
  limits: L(
    'The range table assumes a standard deviation of 5× stake per spin and a normal approximation; real games differ, and high-volatility or jackpot games need far more rounds. Minimum RTP and disclosure rules vary by jurisdiction. RTP describes a game, not a way to predict or improve any player’s result.',
    '范围表假设单局标准差是下注额的 5 倍，并用正态近似；真实游戏各不相同，高波动或 jackpot 游戏需要多得多的局数。最低 RTP 与公开要求因司法辖区而异。RTP 描述的是游戏，不是预测或改善任何玩家结果的方法。',
  ),
  sources: [SOURCE_UKGC_LIVE_RTP, SOURCE_UKGC_RTS3, SOURCE_GLI_19],
};

export const WAGERING_GUIDE: IGamingGuide = {
  path: '/igaming/wagering-requirements',
  fullSection: 'promotions',
  banner: 'chips',
  title: L(
    'Wagering requirements explained: how bonus wagering works and what a bonus really costs',
    '流水要求是什么：奖金流水怎么算，一份奖金到底花多少钱',
  ),
  shortTitle: L('Wagering requirements & bonus cost', '流水要求与奖金成本'),
  tags: [L('Bonuses', '奖金'), L('Promotions', '促销'), L('Pricing', '定价'), L('Calculator', '计算器')],
  standfirst: L(
    'A bonus has a face value, a formula value and a real cost, and the three rarely agree. This guide explains the terms that decide the cost, why the usual formula undershoots, and lets you price a bonus yourself.',
    '一份奖金有面额、有公式算出来的成本，也有真实成本，三者很少一致。这篇讲清楚决定成本的条款、为什么常用公式会算少，并且让你自己算一份奖金。',
  ),
  answer: L(
    'A wagering requirement is the amount a player must bet before bonus money, or winnings made with it, can be withdrawn: a 20 bonus at 10× means 200 of bets. For the operator a bonus costs less than its face value but more than “bonus − house edge × required bets”, because most players run out before finishing and the cost is driven by the few who win big.',
    '流水要求是玩家在提取奖金(或用奖金赢到的钱)之前必须下注的金额：20 的奖金、10 倍流水，就是要下注 200。对运营者来说，一份奖金的成本低于面额，但高于「奖金 − 庄家优势 × 要求下注额」——因为大多数玩家在完成前就输光了，成本主要来自少数赢了大奖的人。',
  ),
  plain: {
    scene: L(
      'An arcade gives you 20 free tokens, with one rule: you can only swap your prize tickets for cash after you have played 200 tokens’ worth. Most kids run out of tokens long before 200, so the arcade pays nothing. A few hit a big prize along the way, finish the 200, and cash out far more than 20. Those few are where the cost comes from.',
      '游戏厅送你 20 个免费代币，规定只有一条：要先玩满 200 个代币的量，才能把赢到的彩票换成现金。大多数小孩远远没玩到 200 就把代币用完了，游戏厅一分钱都不用付。但有少数人中途中了大奖，玩满 200 之后换走的远不止 20。成本就是从这少数人身上来的。',
    ),
    terms: [
      { term: L('Bonus', '奖金'), everyday: L('The 20 free tokens.', '送的 20 个代币。') },
      { term: L('Wagering requirement (10×)', '流水要求(10 倍)'), everyday: L('Play 200 tokens’ worth before cashing out.', '先玩满 200 个代币，才能换现金。') },
      { term: L('House edge', '庄家优势'), everyday: L('Every play, the machine keeps a little on average.', '每玩一次，平均都被机器吃掉一点。') },
      { term: L('Max conversion', '最多可提现'), everyday: L('“You can cash out at most 100” — a cap for the lucky few.', '「最多只能换 100」——给那少数幸运儿封顶。') },
    ],
    takeaway: L(
      'Most bonuses cost little; a few cost a lot. Price for the few, not for the average player.',
      '大多数奖金花不了多少，少数几份很贵。定价时要算那少数人，不是只算平均玩家。',
    ),
  },
  blocks: [
    { kind: 'h', text: L('How a wagering requirement works', '流水要求怎么运作') },
    {
      kind: 'p',
      text: L(
        'Take a 20 bonus with a 10× requirement. The player must place 200 of bets before the bonus balance becomes withdrawable cash. At a bet of 1 that is 200 spins. Until then the bonus, and anything won with it, is locked; withdraw early and it is forfeited. Six terms decide how expensive that promise is:',
        '以 20 的奖金、10 倍流水为例。玩家要先下注 200,奖金余额才变成可提取的现金。每注 1,就是 200 局。在那之前，奖金和用它赢到的钱都是锁住的；提前提款，奖金就作废。决定这份承诺有多贵的，是下面六项条款：',
      ),
    },
    {
      kind: 'table',
      head: [L('Term', '条款'), L('What it says', '它规定什么'), L('How it moves the cost', '它怎样影响成本')],
      rows: [
        [L('Base', '计算基数'), L('Multiplier applies to the bonus only, or to deposit + bonus', '倍数乘在奖金上，还是乘在存款 + 奖金上'), L('On deposit + bonus, a matched offer needs twice the bets', '乘在存款 + 奖金上，配额优惠要下注的金额翻倍')],
        [L('Multiplier', '倍数'), L('How many times the base must be bet', '基数要下注几遍'), L('Higher means fewer players finish — but the bonus gets cheaper more slowly than it looks', '越高，完成的人越少——但成本降得比看起来慢')],
        [L('Game weighting', '游戏权重'), L('Share of each bet that counts, e.g. slots 100%, table games less', '每注算进流水的比例，例如老虎机 100%、桌游更低'), L('Low-edge games count less, so the requirement cannot be cleared cheaply', '低优势的游戏算得少，玩家没法用便宜的方式刷完')],
        [L('Max bet', '最大下注'), L('Largest stake allowed while wagering', '流水期间允许的最大单注'), L('Stops a few huge bets from clearing the requirement in one swing', '防止几注大额下注一次刷完')],
        [L('Max conversion', '最多可提现'), L('Cap on what can be withdrawn from the bonus', '这份奖金最多能提走多少'), L('Cuts off the expensive tail — usually the strongest lever', '砍掉最贵的那条尾巴——通常是最有力的一项')],
        [L('Expiry', '有效期'), L('Days allowed to finish', '完成流水的天数'), L('Unfinished bonuses lapse', '没完成的奖金到期作废')],
      ],
    },
    {
      kind: 'callout',
      title: L('Bonus money is not the player’s money', '奖金不是玩家自己的钱'),
      body: L(
        'Wagering terms restrict bonus funds, not the deposit. Players should be able to tell bonus balance from their own, see the significant conditions before they opt in, and leave a promotion with their remaining deposit.[2]',
        '流水条款限制的是奖金，不是存款。玩家应该分得清奖金余额和自己的钱，在参加之前看到重要条件，并且可以带着剩余的存款退出活动。[2]',
      ),
    },
    { kind: 'h', text: L('What a bonus really costs', '一份奖金到底花多少钱') },
    {
      kind: 'p',
      text: L(
        'The usual shortcut is: cost ≈ bonus − house edge × required bets. On a 96% game, a 20 bonus at 10× gives 20 − 4% × 200 = 12. At 35× the same formula says the bonus costs nothing at all.',
        '常用的简便算法是：成本 ≈ 奖金 − 庄家优势 × 要求下注额。在 96% 的游戏上，20 的奖金、10 倍流水：20 − 4% × 200 = 12。到 35 倍，同一个公式会说这份奖金一分钱都不花。',
      ),
    },
    {
      kind: 'p',
      text: L(
        'The shortcut assumes every player bets the full 200. They do not: most run out of bonus balance first, and a player who has stopped betting stops paying the house edge. The real cost is bonus − house edge × what players actually bet. In the simulation below, fewer than one player in five finishes and the average player bets less than half of the required 200, so the 10× bonus costs about 17, not 12 — and the “free” 35× bonus still costs about 14.',
        '这个算法假设每个玩家都下满 200。其实不会：大多数人在那之前就把奖金输光了，而不再下注的玩家，也就不再贡献庄家优势。真实成本是 奖金 − 庄家优势 × 玩家实际下注额。下面的模拟里，完成流水的玩家不到五分之一，平均每人下注不到要求的 200 的一半，所以 10 倍的奖金成本约 17,不是 12;而公式说「免费」的 35 倍奖金，成本仍有约 14。',
      ),
    },
    {
      kind: 'widget',
      widget: 'wagering-cost',
      title: L('Try it: price a bonus', '动手试：给一份奖金定价'),
      caption: L(
        'Move the multiplier, RTP and max conversion. Green is the simulated cost per bonus; blue is the simple formula. The gap is the money the formula leaves out.',
        '拖动流水倍数、RTP,换「最多可提现」。绿线是模拟出来的每份奖金成本，蓝线是简便公式。两条线之间的差，就是公式漏算的钱。',
      ),
    },
    { kind: 'h', text: L('What actually moves the cost', '真正影响成本的是什么') },
    {
      kind: 'list',
      items: [
        L(
          'Max conversion is the strongest lever. The cost comes from the few players who land a big win while wagering. With a 5× cap, the 10× bonus drops from about 17 to about 13, and a 35× bonus from about 14 to about 7.5.',
          '「最多可提现」是最有力的一项。成本来自少数在流水期间中了大奖的玩家。设 5 倍上限，10 倍流水的奖金从约 17 降到约 13;35 倍的从约 14 降到约 7.5。',
        ),
        L(
          'The multiplier matters less than it looks. Going from 35× to 10× raises the cost of a 20 bonus only from about 14 to about 17, because more players finish but most still run out.',
          '倍数的影响比看起来小。从 35 倍降到 10 倍，一份 20 的奖金成本只从约 14 升到约 17——完成的人变多了，但大多数人还是会先输光。',
        ),
        L(
          'RTP and weighting matter at the margin. On the same 10× bonus, a 94% game gives about 15 and a 97% game about 17.3.',
          'RTP 和游戏权重影响边际。同样 10 倍流水，94% 的游戏约 15,97% 的约 17.3。',
        ),
        L(
          'Price from claims, not from the formula. Once a bonus has run, the cost per claim in your own data beats any model, including this one.',
          '用实际领取的数据定价，不用公式。活动跑过一次之后，你自己数据里的「每次领取成本」比任何模型都准，包括这一个。',
        ),
      ],
    },
    { kind: 'h', text: L('What the 10× cap changes in Great Britain', '英国 10 倍上限改变了什么') },
    {
      kind: 'p',
      text: L(
        'Since 19 January 2026, Great Britain licensees may not set wagering requirements above 10 times the bonus, and promotions that make players mix products — bet on sport to unlock slot spins, for example — are banned. The high multiplier was never as cheap as the formula suggested, and now it is gone. The levers left are bonus size, the game list, expiry and caps, and each must be stated clearly before the player opts in.[1]',
        '从 2026 年 1 月 19 日起，英国持牌方设定的流水要求不得超过奖金的 10 倍，要求玩家跨产品参与的促销(例如下注体育才能解锁老虎机免费旋转)也被禁止。高倍数本来就没有公式说的那么便宜，现在也用不了了。剩下能调的是奖金大小、游戏范围、有效期和各种上限，而且每一项都要在玩家参加之前讲清楚。[1]',
      ),
    },
    {
      kind: 'callout',
      title: L('Count the cost once, in one place', '成本只算一次，只算在一个地方'),
      body: L(
        'Decide whether bonus cost enters NGR when it is credited, wagered or converted to cash, and write the rule next to the report. The same bonus counted at credit and again at conversion is the most common way NGR goes wrong.',
        '定下奖金成本在什么时候进 NGR:发放时、下注时，还是转成现金时，并把规则写在报表旁边。同一份奖金在发放时算一次、转现时又算一次，是 NGR 出错最常见的原因。',
      ),
    },
  ],
  checklist: [
    L('Is the multiplier on the bonus, or on deposit + bonus?', '倍数乘在奖金上，还是存款 + 奖金上？'),
    L('Which games count towards wagering, and at what weight?', '哪些游戏算流水，各算多少比例？'),
    L('Are max bet and max conversion shown before the player opts in?', '最大下注和最多可提现，玩家参加之前看得到吗？'),
    L('Can a player leave the promotion with their deposit at any time?', '玩家能不能随时带着存款退出活动？'),
    L('What did the last similar bonus cost per claim in our own data?', '上一个类似的奖金，在我们自己的数据里每次领取花了多少？'),
    L('When does bonus cost enter NGR in our reports?', '我们的报表里，奖金成本什么时候进 NGR？'),
  ],
  limits: L(
    'The calculator simulates a bonus-only balance, a bet of 1 per spin, 100% game weighting, no expiry and one medium-volatility slot (standard deviation about 5× the stake), as in the RTP guide. Real offers combine deposits, weighting and max-bet rules, and player behaviour is not random play. This is not legal advice; the 10× cap and mixed-product ban apply to Great Britain licensees, and other jurisdictions set their own rules. All figures are illustrative.',
    '计算器模拟的是：只有奖金余额、每注 1、游戏 100% 计入、没有有效期，以及一台中等波动的老虎机(标准差约为下注额 5 倍，与 RTP 专题同一假设)。真实优惠会叠加存款、权重和最大下注规则，玩家行为也不是随机下注。这里不构成法律意见；10 倍上限和跨产品禁令只适用于英国持牌方，其他司法辖区规则各不相同。所有数字都是示例。',
  ),
  sources: [SOURCE_UKGC_PROMOTIONS, SOURCE_CMA_PROMOTIONS],
};

/** Every `/igaming/<guide>`, in reading order. Each also needs its own literal branch in `App.tsx`. */
export const IGAMING_GUIDES: IGamingGuide[] = [
  GGR_VS_NGR_GUIDE,
  PROVIDER_PROMOTIONS_GUIDE,
  PROMOTION_LAUNCH_CHECKLIST_GUIDE,
  CRM_PLAYER_LIFECYCLE_GUIDE,
  MARKETING_REPORT_GUIDE,
  RTP_EXPLAINED_GUIDE,
  WAGERING_GUIDE,
];
