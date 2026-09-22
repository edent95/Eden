/**
 * `/igaming` copy — shared by the React page (`components/IGamingPage.tsx`) and the
 * static prerender (`seo-static-content.ts`), so the crawlable body cannot drift from
 * what visitors see. The page carries no contact details and no links to past projects.
 */

export type IGamingLocalized = { en: string; zh: string };

const L = (en: string, zh: string): IGamingLocalized => ({ en, zh });

/** Query flag the homepage Mini Coin Slot appends after ten rounds. */
export const IGAMING_UNLOCK_PARAM = 'from';
export const IGAMING_UNLOCK_VALUE = 'coin-slot';

export type IGamingService = {
  id: string;
  title: IGamingLocalized;
  body: IGamingLocalized;
};

export const IGAMING_PAGE = {
  kicker: L('iGaming · Operator systems', 'iGaming · 运营系统'),
  unlocked: L(
    'You got here by finishing ten rounds of the Mini Coin Slot. That little table is a working sample of this work.',
    '你是玩满十局 Mini Coin Slot 才走到这里的。那张小牌桌，就是这类工作的一个可运行样本。',
  ),
  claim: L('Run the house on evidence, not on feel.', '用证据经营，而不是靠感觉。'),
  standfirst: L(
    'I build the systems iGaming operators and aggregators run on every day: daily reporting, campaign and bonus tooling, and player-facing features the server can defend.',
    '我给 iGaming operator 和 aggregator 做每天都要用的系统：日报数据、活动与奖金工具，以及由服务端把关的玩家端功能。',
  ),
  cta: L('See what I build', '看我做什么'),

  leaksTitle: L('Where the money leaks', '钱漏在哪里'),
  leaks: [
    {
      title: L('Reports rebuilt by hand', '报表每天手工重做'),
      body: L(
        'Every morning someone re-exports the Transaction and Customer sheets and rebuilds the same report. It is slow, and one wrong filter changes what the team believes that day.',
        '每天早上有人重新导出 Transaction 与 Customer 表，重做同一份报表。慢，而且一个筛选错了，团队当天相信的数字就错了。',
      ),
    },
    {
      title: L('Promos negotiated in chat', '活动规则在聊天里谈'),
      body: L(
        'Bonus combos, partner mixes, and top-slot rules live in chat and spreadsheets. The mistakes surface after publish, as duplicate claims and support tickets.',
        '奖金组合、合作方搭配、置顶位规则都散在聊天和表格里。错误要等上线后才冒出来：重复申领、客服工单。',
      ),
    },
    {
      title: L('Features the browser decides', '由浏览器决定的功能'),
      body: L(
        'A game or leaderboard that trusts the client is a feature someone will eventually farm. Outcomes, quotas, and rankings belong on the server.',
        '信任客户端的小游戏或排行榜，迟早会有人来刷。结果、额度和排名应该由服务端决定。',
      ),
    },
  ],

  servicesTitle: L('What I build', '我做什么'),
  services: [
    {
      id: 'reporting',
      title: L('Daily reporting and CRM data', '日报数据与 CRM'),
      body: L(
        'Excel in, decisions out. Transaction and Customer files become KPIs, member analysis, channel and brand comparison, and CRM-ready exports, on a private deployment.',
        'Excel 进，判断出。Transaction 与 Customer 文件变成 KPI、会员分析、渠道与品牌对比，以及可直接接 CRM 的导出，全部私有部署。',
      ),
    },
    {
      id: 'campaigns',
      title: L('Campaign and bonus operations', '活动与奖金运营工具'),
      body: L(
        'Tools that encode the rules before publish: which partners can pair, which top slots are compatible, which claims are already used.',
        '把规则在上线前写进工具：哪些合作方能搭配、哪些置顶位兼容、哪些申领已经用过。',
      ),
    },
    {
      id: 'games',
      title: L('Player-facing games and leaderboards', '玩家端小游戏与排行榜'),
      body: L(
        'Small games with the trust boundary in the right place: server-generated rounds, a daily quota, a qualification gate before the board, and no raw IPs stored.',
        '把信任边界放对位置的小游戏：回合由服务端生成、每日额度、上榜前的资格门槛，而且不保存原始 IP。',
      ),
    },
    {
      id: 'pages',
      title: L('Campaign and landing pages', '活动页与落地页'),
      body: L(
        'Mobile-first promotion pages and site revamps that keep campaign terms readable and the path to action short.',
        '移动端优先的活动页与网站改版：活动条款读得懂，行动路径够短。',
      ),
    },
  ] as IGamingService[],

  processTitle: L('How an engagement runs', '合作怎么进行'),
  process: [
    {
      step: '01',
      title: L('Map', '摸清'),
      body: L(
        'Start from your real files and rules: the exports, the campaign terms, and who checks what each day.',
        '从你真实的文件和规则开始：导出表、活动条款、每天谁核对什么。',
      ),
    },
    {
      step: '02',
      title: L('Build', '搭建'),
      body: L(
        'Ship the smallest system that removes the daily manual step. Private deployment: your operator data stays in your environment.',
        '先交付能去掉每日手工步骤的最小系统。私有部署：运营数据留在你自己的环境里。',
      ),
    },
    {
      step: '03',
      title: L('Hand over', '交接'),
      body: L(
        'Training, user permissions, and an audit log, so the system keeps running without me online.',
        '培训、用户权限和审计日志，让系统不依赖我在线也能跑。',
      ),
    },
  ],

  back: L('Back to home', '返回首页'),
};
