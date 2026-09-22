import type { SeoLanguage } from './seo-routes.ts';
import { MIYA_PRIVACY, miyaPlainText, type MiyaBlock } from './components/miya-privacy-content.ts';
import { IGAMING_CONTACT_EMAIL, IGAMING_PAGE } from './components/igaming-content.ts';

type Localized = Record<SeoLanguage, string>;

export type StaticRouteCopy = {
  eyebrow: Localized;
  thesis?: Localized;
  sections: Array<{ title: Localized; paragraphs: Localized[] }>;
};

const L = (en: string, zh: string): Localized => ({ en, zh });

/** Flatten the structured MiYa policy (lists, table, sub-headings) into static paragraphs. */
function miyaBlockParagraphs(block: MiyaBlock): Localized[] {
  const plain = (value: Localized): Localized => ({ en: miyaPlainText(value.en), zh: miyaPlainText(value.zh) });
  switch (block.kind) {
    case 'p':
    case 'h3':
      return [plain(block.text)];
    case 'ul':
      return block.items.map((item) => plain({ en: `• ${item.en}`, zh: `• ${item.zh}` }));
    case 'table':
      return block.rows.map(([category, use]) => ({
        en: `${category.en}: ${use.en}`,
        zh: `${category.zh}：${use.zh}`,
      }));
    default:
      return [];
  }
}

/** Static body for /project/miya, generated from the same copy the React page renders. */
function miyaStaticCopy(): StaticRouteCopy {
  const page = MIYA_PRIVACY;
  const meta = page.meta;
  return {
    eyebrow: page.kicker,
    thesis: page.claim,
    sections: [
      {
        title: L('Privacy Policy at a glance', '隐私政策概览'),
        paragraphs: [
          page.standfirst,
          {
            en: meta.map((item) => `${item.label.en}: ${item.value.en}`).join(' · '),
            zh: meta.map((item) => `${item.label.zh}：${item.value.zh}`).join(' · '),
          },
          page.claimFine,
        ],
      },
      {
        title: page.flowTitle,
        paragraphs: [
          {
            en: page.flow.map((node) => `${node.label.en} (${node.note.en})`).join(' → '),
            zh: page.flow.map((node) => `${node.label.zh}（${node.note.zh}）`).join(' → '),
          },
          page.flowCaption,
        ],
      },
      ...page.sections.map((section) => ({
        title: section.title,
        paragraphs: section.blocks.flatMap(miyaBlockParagraphs),
      })),
      {
        title: page.contact.title,
        paragraphs: [
          page.contact.intro,
          ...page.contact.details.map((item) => ({
            en: `${item.label.en}: ${item.value.en}`,
            zh: `${item.label.zh}：${item.value.zh}`,
          })),
          page.contact.footer,
        ],
      },
    ],
  };
}

/** Static body for /igaming, generated from the same copy the React page renders. */
function igamingStaticCopy(): StaticRouteCopy {
  const page = IGAMING_PAGE;
  const titled = (title: Localized, body: Localized): Localized => ({
    en: `${title.en}: ${body.en}`,
    zh: `${title.zh}：${body.zh}`,
  });
  return {
    eyebrow: page.kicker,
    thesis: page.claim,
    sections: [
      { title: page.kicker, paragraphs: [page.standfirst] },
      { title: page.leaksTitle, paragraphs: page.leaks.map((leak) => titled(leak.title, leak.body)) },
      {
        title: page.servicesTitle,
        paragraphs: page.services.map((service) => ({
          en: `${service.title.en}: ${service.body.en} Proof: ${service.proof.en}.`,
          zh: `${service.title.zh}：${service.body.zh} 案例：${service.proof.zh}。`,
        })),
      },
      { title: page.processTitle, paragraphs: page.process.map((item) => titled(item.title, item.body)) },
      {
        title: page.contactTitle,
        paragraphs: [page.contactBody, L(`Email: ${IGAMING_CONTACT_EMAIL}`, `邮件：${IGAMING_CONTACT_EMAIL}`)],
      },
    ],
  };
}

/**
 * Hand-written static body copy for routes whose substance lives in React data
 * rather than in `wiki/`. Every fact here mirrors what the live page renders
 * (product modules, numbers, section order); keep the two in step when a page changes.
 * Wiki and Notes routes do not appear here: their body comes from `generated/content.ts`.
 * `/project/miya` and `/igaming` are the exceptions: they are generated from
 * `components/miya-privacy-content.ts` / `components/igaming-content.ts`, the same copy
 * the React pages render, so the static text cannot drift.
 */
export const ROUTE_STATIC_COPY: Record<string, StaticRouteCopy> = {
  '/project/miya': miyaStaticCopy(),
  '/igaming': igamingStaticCopy(),

  '/': {
    eyebrow: L('Eden Tan', 'Eden Tan'),
    thesis: L(
      'Knowledge should compound instead of disappearing after one answer.',
      '知识应该持续复利，而不是在一次回答后消失。',
    ),
    sections: [
      {
        title: L('What this site is', '这个网站是什么'),
        paragraphs: [
          L(
            'Eden Tan builds products, data tools, and AI systems out of messy human situations: a pet-friendly discovery app, a private poker table, an iGaming daily-report engine, a motorcycle-loan dashboard, and a personal Life OS. Each one is documented here as a working system, with the reasoning kept next to the build.',
            'Eden Tan 从混乱的人性与现实场景里做出产品、数据工具与 AI 系统：宠物友好地点发现 app、熟人局牌桌、iGaming 日报数据引擎、摩托车贷款仪表台，以及一套个人 Life OS。每一个都以真实运行中的系统来记录，思考过程与构建证据放在一起。',
          ),
          L(
            'The site has three layers that link to each other. Projects hold the builds. Notes hold the essays on systems, judgment, strategy, and money. The Wiki holds reusable build skills extracted from those projects so the same lesson does not have to be relearned.',
            '网站分三层，彼此互链：Projects 放作品；Notes 放关于系统、判断、策略与金钱的文章；Wiki 放从这些项目里提炼出来、可以反复使用的构建技能，让同一个教训不必再学一次。',
          ),
        ],
      },
      {
        title: L('Where to start', '从哪里开始'),
        paragraphs: [
          L(
            'Read the essay on turning chaos into systems first, then open any app on the Projects shelf. The homepage also hosts a small Mini Coin Slot built on Penney’s Game, with a daily credit quota and a visitor leaderboard.',
            '先读「把混乱变成系统」这篇文章，再从 Projects 货架打开任何一个 app。首页还有一个基于 Penney’s Game 的 Mini Coin Slot，每天有 credits 上限，并带访客排行榜。',
          ),
        ],
      },
    ],
  },

  '/project': {
    eyebrow: L('Work · Projects', '作品 · Projects'),
    thesis: L(
      'Every icon is something real that got built and still runs.',
      '每一个图标都是一个真的做出来、还在跑的东西。',
    ),
    sections: [
      {
        title: L('Eight apps on the shelf', '货架上的八个 app'),
        paragraphs: [
          L(
            'Jiju is local discovery for people with pets, starting in Penang. Friday Poker Club is a private browser Hold’em table for a fixed crew. ETReportHub is the daily data layer that turns Transaction and Customer Excel files into operating decisions. Dr Racing runs a motorcycle dealership’s loan pipeline from lead to delivery.',
            'Jiju 是从 Penang 起步、给养宠物的人用的本地发现工具。Friday Poker Club 是给固定一群人开的浏览器德州牌桌。ETReportHub 是把 Transaction 与 Customer Excel 变成运营判断的每日数据层。Dr Racing 是摩托车行从 lead 到交车的贷款流水线。',
          ),
          L(
            'Film Gallery is an archive of fifteen film frames from three cameras. Conway’s Game of Life is an interactive B3/S23 board that extends into 256 elementary rules and the I Ching. Penney’s Game turns a non-transitive coin hustle into five levels, a ranked mode, and a probability lab.',
            'Film Gallery 是三台相机拍下的十五格胶片档案。Conway’s Game of Life 是互动的 B3/S23 棋盘，并延伸到 256 条一维规则与《易经》。Penney’s Game 把一个非传递性的硬币骗局做成五个关卡、排位模式与概率实验室。',
          ),
          L(
            'MiYa is an iOS app that turns the health data your Apple Watch and iPhone already recorded into a browsable report, entirely on the device; its privacy policy and support page lives at /project/miya.',
            'MiYa 是一个 iOS app，把 Apple Watch 和 iPhone 已经记录的健康数据在本机整理成可翻看的报告；它的隐私政策与技术支持页在 /project/miya。',
          ),
        ],
      },
      {
        title: L('How the shelf is organized', '货架怎么排'),
        paragraphs: [
          L(
            'The page is an icon grid rather than a wall of cards: tap an app to read the problem it solves, how a deal or a visit moves through it, and the questions people ask before using it. Each product page ends with an information block and links to sibling builds.',
            '这页是图标网格，不是一堵卡片墙：点进一个 app，会看到它解决什么问题、一笔生意或一次到访怎样在系统里流转，以及人们使用前会问的问题。每个产品页最后都有资料区块，并链接到其他作品。',
          ),
          L(
            'Older work lives in the archive: a 1+1 Bonus Key combo builder for campaign operations, an Atlantis website UI/UX prototype, and the Soccerking football social-content project.',
            '更早的工作放在归档：活动运营用的 1+1 Bonus Key 组合工具、Atlantis 网站 UI/UX 原型，以及 Soccerking 足球社媒内容项目。',
          ),
        ],
      },
    ],
  },

  '/jiju-pet': {
    eyebrow: L('Local discovery · Pet life', '本地发现 · 宠物生活'),
    thesis: L(
      'Find places that truly work for you and your pet.',
      '找到真正适合你和宠物一起去的地方。',
    ),
    sections: [
      {
        title: L('How it works', '怎么使用'),
        paragraphs: [
          L(
            'Discover a place, check its real pet policy and on-site conditions, visit, then remember it. Jiju keeps those four steps in one flow so a pet outing does not depend on guesswork or a phone call.',
            '发现地点、确认真实的宠物政策与现场条件、到访、然后记录。Jiju 把这四步放进同一条流程，带宠物出门不再靠猜或打电话问。',
          ),
          L(
            'A maps result tells you a place exists. Jiju tells you whether it works for your pet: the policy, the space, where they can sit, and what recent visitors actually found.',
            '地图告诉你有这个地方。Jiju 告诉你它适不适合你的宠物：政策、空间、能坐哪里，以及最近去过的人实际看到了什么。',
          ),
        ],
      },
      {
        title: L('What Jiju is built around', 'Jiju 围绕什么建立'),
        paragraphs: [
          L(
            'Five modules: Discovery, Place profiles, Pet profiles, Visits, and Community. Every pet gets a real profile, every visit can become a memory, and community contributions feed back into the place record, including a Sanctuary impact record for rescues and shelters.',
            '五个模块：发现、地点档案、宠物档案、到访与社区。每只宠物都有真实档案，每次到访都能变成记忆，社区补充的资料会回流到地点记录，包括给救助与收容所的 Sanctuary impact 记录。',
          ),
          L(
            'Trust comes from cross-checking three sources: the place data, the merchant’s stated policy, and community records. When they disagree, the disagreement is visible instead of averaged away.',
            '可信度来自三方交叉核对：地点资料、商家声明的政策、社区记录。三者不一致时，会把不一致显示出来，而不是平均掉。',
          ),
        ],
      },
      {
        title: L('Where it runs', '在哪里运行'),
        paragraphs: [
          L(
            'Jiju is free, starts in Penang, Malaysia with depth over reach, and runs in any browser as a responsive web app that can be installed to the home screen from jiju.pet.',
            'Jiju 免费，从马来西亚 Penang 开始，先做深再做广；它是响应式 web app，在任何浏览器打开，也可以从 jiju.pet 安装到主画面。',
          ),
        ],
      },
    ],
  },

  '/jiju-revamp': {
    eyebrow: L('Jiju / A local discovery guide for places worth visiting', 'Jiju / 本地人也会用的去处指南'),
    thesis: L(
      'It sells the scene, not the place.',
      '卖的是「场景」，不是「地点」。',
    ),
    sections: [
      {
        title: L('People search for situations, not restaurants', '人们搜的不是「餐厅」，是「情境」'),
        paragraphs: [
          L(
            'The proposal moves Jiju.pet from a pet-friendly directory to a context-based local discovery engine. Google Maps is a place database; Jiju becomes a scene database that breaks each place into the question that matters right now: lunch now, work from a cafe, bringing my pet, easy parking, show me promos, local favorites, a rainy-day spot.',
            '这份提案把 Jiju.pet 从宠物友好目录，转成以情境为核心的本地发现引擎。Google Maps 是地点数据库；Jiju 变成场景数据库，把每个地点拆成此刻真正要问的问题：现在吃午餐、在咖啡馆工作、带宠物、好停车、看促销、本地人常去、下雨天去哪。',
          ),
          L(
            'Five main categories organize the filters: Eat, Work, Chill, Pet, and Promo, each with a short set of real-life tags.',
            '五个主类别组织所有筛选：Eat、Work、Chill、Pet、Promo，每类下面是一小组真实生活标签。',
          ),
        ],
      },
      {
        title: L('A fit score instead of a rating', '不是评分，是「合适度」'),
        paragraphs: [
          L(
            'Each place carries a seven-axis fit score: food, comfort, parking, work-friendly, pet-friendly, value, and local approval. A profile reads like a database row, with area, price range, best hours, and hours to avoid, so the summary can say something useful such as best for weekday laptop work and an affordable lunch set, but parking gets difficult after 12:30pm.',
            '每个地点有七个维度的合适度：食物、舒适、停车、适合工作、适合宠物、性价比、本地认可。档案像一行数据库记录：区域、价位、最佳时段、该避开的时段，所以摘要能说出有用的话，例如「适合工作日带电脑工作和实惠午餐套餐，但 12:30 之后停车会变难」。',
          ),
        ],
      },
      {
        title: L('Nail one city first', '先把一个城市做透'),
        paragraphs: [
          L(
            'The MVP is deliberately small: one city, about 100 places, and 8 filters, delivered in four phases. Daily-frequency use opens more monetization paths than a pet directory, and the domain question (.pet or a new name) is settled by validation rather than preference. Eden builds the system; a partner drives real-world growth.',
            'MVP 刻意做小：一个城市、约 100 个地点、8 个筛选，分四个阶段交付。高频日常使用比宠物目录有更多变现路径；域名用 .pet 还是换新名，交给验证而不是偏好来决定。Eden 负责系统，合作方负责线下增长。',
          ),
        ],
      },
    ],
  },

  '/etreporthub': {
    eyebrow: L('Data analytics · Business tool', '数据分析 · 商业工具'),
    thesis: L(
      'Turn daily Excel into clear operating decisions.',
      '把每日 Excel 变成清楚的运营判断。',
    ),
    sections: [
      {
        title: L('How it works every day', '每天怎么用'),
        paragraphs: [
          L(
            'Upload the daily Transaction Excel and the latest Customer export. ETReportHub reconciles them into a local SQLite database, computes the day’s numbers, and surfaces what changed so the team can decide and act instead of rebuilding a sheet.',
            '上传每日 Transaction Excel 和最新的 Customer 导出。ETReportHub 把它们整理进本地 SQLite 数据库，算出当天的数字，并把变化提出来，团队直接判断和行动，不用再重做一遍表。',
          ),
          L(
            'The point is not another dashboard. It is knowing sooner what changed, which members need action, where a channel is losing efficiency, and what the team should handle first.',
            '重点不是再多一个 dashboard，而是更早知道什么变了、哪些会员需要处理、哪个渠道在失去效率、团队今天该先做什么。',
          ),
        ],
      },
      {
        title: L('What it changes day to day', '它每天改变了什么'),
        paragraphs: [
          L(
            'Five modules: Performance, Members, Channels, Trends, and CRM export. Performance tracks deposits, withdrawals, net deposit, and active members. Members can be filtered by risk, activity, deposit recency, and conversion status, then exported as a CRM-ready list. Channels show where volume moves; Trends show it over time; a wide Excel export stays available for management.',
            '五个模块：Performance、Members、Channels、Trends 与 CRM export。Performance 跟踪存款、提款、净存款与活跃会员；Members 可按风险、活跃度、最近存款与转化状态筛选，再导出成可直接给 CRM 用的名单；Channels 看流量往哪里走，Trends 看时间趋势；管理层仍然可以拿到完整的 Excel 导出。',
          ),
        ],
      },
      {
        title: L('Deployment', '部署方式'),
        paragraphs: [
          L(
            'ETReportHub is deployed privately with local SQLite storage: Excel in, decisions out, and no operator data leaves the deployment. A public demo runs on fixed sample data, and the pricing page explains the RM4,890 launch package.',
            'ETReportHub 私有部署，数据放在本地 SQLite：Excel 进，判断出，运营数据不离开部署环境。公开 demo 用固定示例数据运行；售卖页说明 RM4,890 的上线套餐。',
          ),
        ],
      },
    ],
  },

  '/etreporthub-sales': {
    eyebrow: L('ETReportHub / Sales Page', 'ETReportHub / 售卖页'),
    thesis: L(
      'Stop paying people to rebuild the same report every day.',
      '别再花钱让人每天重做同一份报表。',
    ),
    sections: [
      {
        title: L('Reporting decides what the team believes every day', '报表决定团队每天相信什么'),
        paragraphs: [
          L(
            'Excel is fine for checking one file. It becomes expensive when the team needs repeatable imports, member logic, brand comparison, CRM export, and a daily decision history. Clients are not buying a page; they are buying fewer errors, less delay, and less memory work.',
            'Excel 用来查一个文件没问题。当团队需要可重复的导入、会员逻辑、品牌对比、CRM 导出和每日决策记录时，它就开始变贵。客户买的不是一个页面，而是更少的错误、更少的延迟、更少靠记忆的工作。',
          ),
        ],
      },
      {
        title: L('Does RM4,890 make sense?', 'RM4,890 划不划算'),
        paragraphs: [
          L(
            'The launch package is a one-time RM4,890. The ROI card on the page uses stated assumptions: 2.5 hours a day saved, RM25 an hour, 26 working days. That is about RM1,625 of monthly labor, roughly RM2,725 of monthly impact once faster decisions are counted, and a payback of about 1.8 months.',
            '上线套餐是一次性 RM4,890。页面上的 ROI 卡用明写的假设计算：每天省 2.5 小时、每小时 RM25、每月 26 个工作日。这大约是每月 RM1,625 的人力，算上更快的决策约 RM2,725 的月影响，回本大约 1.8 个月。',
          ),
        ],
      },
      {
        title: L('What is included', '系统里面有什么'),
        paragraphs: [
          L(
            'Sixteen modules ship in the package: Data Ingest, Normalize and SQLite, Performance Report, Member Analysis, CRM Export, Bonus Control, Channel Analysis, Trend Analysis, Brand Comparison, Segment Analysis, Wide Excel Export, Database Backup, User Permission, Audit Log, Private Deployment, and Training and Handover.',
            '套餐包含十六个模块：Data Ingest、Normalize 与 SQLite、Performance Report、Member Analysis、CRM Export、Bonus Control、Channel Analysis、Trend Analysis、Brand Comparison、Segment Analysis、Wide Excel Export、Database Backup、User Permission、Audit Log、Private Deployment，以及 Training 与 Handover。',
          ),
          L(
            'Buy it only when the operating problem is real: if daily reports affect revenue decisions, do not keep relying on feel.',
            '只有运营问题真实存在时才适合买：如果日报影响营收决策，就不要继续靠感觉。',
          ),
        ],
      },
    ],
  },

  '/dr-racing': {
    eyebrow: L('Loan operations · Dealership tool', '贷款运营 · 车行工具'),
    thesis: L(
      'Run the whole motorcycle-loan pipeline in one dashboard.',
      '把摩托车贷款流程放进同一个仪表台。',
    ),
    sections: [
      {
        title: L('How a deal moves', '一单生意怎么走'),
        paragraphs: [
          L(
            'Lead, application, bank rounds, delivery. Leads arrive from TikTok, Facebook, Instagram, Google, and walk-ins. An application collects the IC, payslips, the bike, and the installment plan. Each bank round records the outcome, and a rejection comes back as a reject code translated into a plain next step. Delivery closes the loop with disbursement and commission.',
            'Lead、申请、银行轮次、交车。Lead 来自 TikTok、Facebook、Instagram、Google 和到店客人；申请收集 IC、薪资单、车型与分期方案；每一轮银行结果都记录下来，被拒时 reject code 会被翻译成一句清楚的下一步；交车后放款与佣金结算收尾。',
          ),
          L(
            'Before this system, that pipeline lived in WhatsApp chats, paper files, and each salesperson’s memory. Reject codes become knowledge, so a young salesperson handles a rejection the way the most experienced one would.',
            '在这套系统之前，这条流程散落在 WhatsApp 聊天、纸质文件和每个销售的记忆里。Reject code 变成知识，新销售处理一次被拒，也能像最有经验的人一样。',
          ),
        ],
      },
      {
        title: L('What it changes day to day', '它每天改变了什么'),
        paragraphs: [
          L(
            'Six modules: Task Inbox, Applications, Leads, Analytics, Finance, and Commissions, with four roles (Sales, Admin, Operations Manager, Super Admin). Each role sees its own inbox. The dashboard also tracks WhatsApp clicks by channel, monthly marketing spend, staff attendance, per-deal commissions, and an audit log.',
            '六个模块：Task Inbox、Applications、Leads、Analytics、Finance、Commissions；四种角色：Sales、Admin、Operations Manager、Super Admin，各自有自己的待办。仪表台同时追踪各渠道的 WhatsApp 点击、每月营销支出、员工出勤、每单佣金与审计日志。',
          ),
        ],
      },
      {
        title: L('Deployment and demo', '部署与 demo'),
        paragraphs: [
          L(
            'Production runs on Firebase App Hosting with Firestore security rules tested in CI, and the interface is available in Chinese, English, and Malay. The public demo embedded on this page runs on fixed anonymized data with no login and resets on reload.',
            '生产环境跑在 Firebase App Hosting，Firestore 安全规则在 CI 里测试；界面提供中文、英文与马来文。页面内嵌的公开 demo 使用固定的匿名数据，无需登录，刷新即重置。',
          ),
        ],
      },
    ],
  },

  '/poker': {
    eyebrow: L('Multiplayer game · Private table', '多人游戏 · 私人牌局'),
    thesis: L(
      'No place to book. Just bring the crew back.',
      '不用约地点。把那群人叫回来就好。',
    ),
    sections: [
      {
        title: L('How it works', '怎么玩'),
        paragraphs: [
          L(
            'Host a room, invite the crew with a link, buy in, and play. Friday Poker Club is a Texas Hold’em table that runs in any browser, plus an 8/9 mini game for the nights when a full table is not there. Rooms are private and invite-only, and the host starts the hand.',
            '开房、用链接邀请朋友、买入、开局。Friday Poker Club 是在任何浏览器里都能跑的德州牌桌，另外有一个 8/9 小游戏，给人不齐的晚上。房间私密、只凭邀请进入，由房主发牌开局。',
          ),
          L(
            'Play chips only: there is no cash value, no deposit, and no withdrawal. The product is the shared room, not a stake.',
            '只有游戏筹码：没有现金价值，没有充值，也没有提现。产品是那间大家一起在的房间，不是赌注。',
          ),
        ],
      },
      {
        title: L('Designed for private games', '为熟人局做的选择'),
        paragraphs: [
          L(
            'Five modules: Rooms, Invites, Buy-ins, Realtime table, and optional voice. Firebase keeps the table in sync, so a dropped connection returns a player to the same seat with the same stack instead of a fresh login.',
            '五个模块：房间、邀请、买入、实时牌桌与可选语音。Firebase 负责同步，掉线后回到同一个座位、同一份筹码，而不是重新登录。',
          ),
          L(
            'The build notes behind it are in the Wiki: practical Vite skills, Firebase as lifetime table memory, button feedback states for realtime play, and why optional background music changes the feel of a shared room.',
            '它背后的构建笔记在 Wiki：实用 Vite 技能、把 Firebase 当牌桌长期记忆、实时对局的按钮反馈状态，以及为什么可选的背景音乐会改变共享房间的感觉。',
          ),
        ],
      },
      {
        title: L('The crew and the stories', '那群人与那些故事'),
        paragraphs: [
          L(
            'The table exists for a fixed crew who have played together for years, and the story log records the nights worth retelling: the moment, not the score. Stories follow the site’s story style: only what really happened, short nicknames, people first and cards second.',
            '这张桌子是给一群一起打了好几年的固定朋友；故事日志记录值得再讲一遍的那些夜晚：记时刻，不记比分。故事遵守网站的 story style：只写真实发生的事、用短昵称、人在牌前面。',
          ),
        ],
      },
    ],
  },

  '/film-gallery': {
    eyebrow: L('15 frames · 3 cameras · 2 film stocks', '15 格 · 3 台相机 · 2 种胶卷'),
    thesis: L(
      'Less a portfolio than fifteen records of stopping to look.',
      '它不太像作品集，更像十五次停下来看的记录。',
    ),
    sections: [
      {
        title: L('What is on the roll', '胶卷上有什么'),
        paragraphs: [
          L(
            'Streets, water, buildings, temples, and people who happened to enter the frame: a hazy city skyline, a waterfront, an edge light leak, a temple carving, mountain haze, a coastal city, a sea-and-sky horizon, a geometric block with a bicycle, candid figures by the sea, a cargo ship, a restaurant portrait, a red-lantern altar, and a twin-dragon roofline.',
            '街道、水岸、建筑、庙宇，以及偶然走进画面的人：雾中的城市天际线、水边、边缘漏光、庙宇雕刻、山间雾气、海边城市、海天交界、一栋几何感的楼和一辆单车、海边的抓拍、货船、餐厅里的人像、红灯笼神坛，以及双龙屋脊。',
          ),
        ],
      },
      {
        title: L('Cameras and film', '相机与胶卷'),
        paragraphs: [
          L(
            'Shot on the Konica Auto S2, Rolleiflex Old Standard (Model 621), and Zeiss Ikon Contessa 35 with Kodak Gold 200 and 400. The Konica covers frames 1, 2, and 6 to 11; the Rolleiflex covers frames 3 to 5; the Contessa covers frames 12 to 15. Kodak Gold 200 runs through frame 13, and the last two frames are Gold 400. The camera and film stock stay with each frame.',
            '使用 Konica Auto S2、Rolleiflex Old Standard（Model 621）与 Zeiss Ikon Contessa 35，胶卷是 Kodak Gold 200 与 400。Konica 拍了第 1、2 与 6 到 11 格；Rolleiflex 拍了第 3 到 5 格；Contessa 拍了第 12 到 15 格。Gold 200 用到第 13 格，最后两格是 Gold 400。每一格都标注相机与胶卷。',
          ),
        ],
      },
      {
        title: L('Install or take it offline', '安装或离线带走'),
        paragraphs: [
          L(
            'The gallery reads left to right as a horizontal roll with zero-padded frame numbers. It installs as a standalone web app, and a Download offline button packs all fifteen photos, cameras, film stocks, and captions into a single self-contained HTML file.',
            '图库像一卷横向胶片从左到右阅读，格号补零。它可以安装成独立 web app；「下载离线版」按钮会把十五张照片、相机、胶卷与说明打包成一个自包含的 HTML 文件。',
          ),
        ],
      },
    ],
  },

  '/life-os': {
    eyebrow: L('Personal system · Self-knowledge', '个人系统 · 自我认识'),
    thesis: L(
      'Build the long-term base map first. Then ask about right now.',
      '先建立长期底图，再问当下的问题。',
    ),
    sections: [
      {
        title: L('How it works', '怎么使用'),
        paragraphs: [
          L(
            'Enter a birth date, time, and place, with a time correction, to build the base map. Read the profile. Ask about now. Take the evidence with you. Four modules carry those steps: Star map, Base map, Ask, and Records.',
            '输入出生日期、时间与地点，加上时间校正，建立底图；读画像；问当下；把证据带走。四个模块承载这四步：星图、个人底图、提问、记录。',
          ),
          L(
            'Life OS cross-reads four systems into one traceable map: BaZi, I Ching hexagrams, an elemental profile, and tarot records. The outputs are an element profile, a current phase, an action strategy, and an Agent prompt pack.',
            'Life OS 把四套系统交叉读成同一张可溯源的底图：八字、易经卦象、元素画像与塔罗记录。输出是元素画像、当前阶段、行动策略，以及一份 Agent prompt 包。',
          ),
        ],
      },
      {
        title: L('What makes it different', '它和别的不一样在哪'),
        paragraphs: [
          L(
            'It shows its work. Every conclusion sits on top of a visible evidence trail: which system said it and how many of them agreed. A confidence level drops when systems disagree. Questions fall into seven categories: self, timing, work, money, relationships, shadow, and tactics.',
            '它把过程摆出来。每个结论都放在可见的证据链上：哪套系统说的、几套系统同意。系统之间不一致时，置信度会下降。问题分七类：自我、时机、事业、金钱、关系、阴影、当下战术。',
          ),
          L(
            'The Ask Agent panel exports a copyable prompt pack, so the same base map can be taken to any external AI. It is a map, not a label: not prediction, and not medical, legal, or financial advice.',
            '「Ask Agent」面板导出可复制的 prompt 包，同一张底图可以带去任何外部 AI。这是底图，不是标签：不是预测，也不是医疗、法律或财务建议。',
          ),
        ],
      },
      {
        title: L('Where it runs', '在哪里运行'),
        paragraphs: [
          L(
            'Life OS is free, runs in any browser, and currently has a Chinese interface.',
            'Life OS 免费，在任何浏览器运行，目前是中文界面。',
          ),
        ],
      },
    ],
  },

  '/brand-guide': {
    eyebrow: L('Brand Guide', '品牌指南'),
    thesis: L('Build systems from chaos.', '从混乱中建立系统。'),
    sections: [
      {
        title: L('Use it in order', '按顺序使用'),
        paragraphs: [
          L(
            'Rules first, visuals second, application last. The guide is grouped into a Foundation layer, a Surface system, and Content usage, and runs through nine numbered sections: core philosophy, design rules, layout numbers, visual system, type and rhythm, voice, application, story content, and motion language.',
            '先规则，再视觉，最后应用。指南分为基础层、表层系统与内容用法三组，按九个编号章节展开：核心理念、设计规则、版式数字、视觉系统、字体与节奏、语气、应用、故事内容、动效语言。',
          ),
        ],
      },
      {
        title: L('The numbers pages must follow', '页面必须遵守的数字'),
        paragraphs: [
          L(
            'Buttons and inputs keep a 44px minimum height, a hero carries at most two buttons, headlines sit at 0.98 to 1.08 line height, desktop sections are spaced 80 to 160px and mobile 48 to 96px, cards use 24 to 32px radius, home media banners are 16:9, and grids step from 4 columns on desktop to 2 on tablet and 1 on mobile.',
            '按钮与输入框最小高度 44px；hero 最多两个按钮；标题行高 0.98 到 1.08；桌面段落间距 80 到 160px，移动端 48 到 96px；卡片圆角 24 到 32px；首页媒体横幅 16:9；网格从桌面 4 栏到平板 2 栏、手机 1 栏。',
          ),
          L(
            'Color is signal: six base tokens from Paper to Deep, with Eden Mint as the light-mode accent and a pink accent in dark mode. Type stays simple; motion stays light and lives on visible objects rather than on backgrounds.',
            '颜色只做信号：从 Paper 到 Deep 六个基础 token，浅色模式的强调色是 Eden Mint，深色模式用粉色。字体少变化；动效要轻，放在可见物件上，而不是背景上。',
          ),
        ],
      },
      {
        title: L('Voice and story', '语气与故事'),
        paragraphs: [
          L(
            'Voice makes the help clear with avoid-and-prefer pairs. Story content records real moments: log the moment, not the score; only what actually happened; short nicknames; people first, cards second. The guide is reconciled against the live homepage and the change log.',
            '语气用「避免 / 优先」对照，把能帮什么说清楚。故事内容写真实时刻：记时刻不记比分、只写真实发生的事、用短昵称、人在牌前面。指南会和线上首页与改动日志对齐。',
          ),
        ],
      },
    ],
  },

  '/penneys-game': {
    eyebrow: L('Non-transitive probability · 1969', '非传递概率 · 1969'),
    thesis: L(
      'It looks like a coin toss. It is a hustle, and whoever picks second owns it.',
      '看起来是纯运气，其实是个局，而且后选的那个人稳赢。',
    ),
    sections: [
      {
        title: L('The game', '游戏规则'),
        paragraphs: [
          L(
            'Two players each name a run of heads and tails, then flip until one sequence shows up. Penney’s Game is non-transitive: for every three-flip sequence there is another that beats it, so the second player can always counter. Against ABC, play (not B) + A + B. THH beats HHH seven times out of eight; THHH beats HHHH 15 to 1.',
            '两个人各报一串正反面，然后一直抛，直到其中一串出现。Penney’s Game 是非传递的：任何三位序列都有另一串能压过它，所以后选的人永远能反制。对手选 ABC，你就选「B 的反面 + A + B」。THH 对 HHH 八局赢七局；THHH 对 HHHH 是 15 比 1。',
          ),
        ],
      },
      {
        title: L('Three modes', '三种模式'),
        paragraphs: [
          L(
            'Campaign has five levels with 100 starting chips: Street Warm-up, The Hustle, The Counter, Four-Bit Master, and Clean Sweep, each with a goal and a lesson. Ranked, the Blind Master mode, is a timed blind-pick run: the clock starts at 8 seconds and shrinks to a 3-second floor, with streak bonuses at 5, 10, and 20 and a global leaderboard.',
            '战役有五关，起始 100 筹码：街头热身、被宰、反杀、四位大师、通杀，每关有目标和一条教训。排位是「盲选大师赛」的限时模式：计时从 8 秒开始，最低缩到 3 秒，连胜 5、10、20 有加分，并有全球排行榜。',
          ),
          L(
            'The Lab runs any matchup with 3 or 4 flips: pick both sequences, set the dealer to the optimal counter, and read the exact win probability computed with Conway’s leading-numbers formula alongside a simulation.',
            '实验室可以跑任意 3 位或 4 位的对局：选两串序列，把庄家设成最优反制，读出用 Conway leading-numbers 公式算出的精确胜率，并对照模拟结果。',
          ),
        ],
      },
      {
        title: L('Why it matters', '为什么值得玩'),
        paragraphs: [
          L(
            'The game is a small, checkable lesson in why intuition about fairness fails: the order of picking is the edge. It sits next to Conway’s Game of Life and the Cellular Automata Lab as the site’s interactive mathematics corner.',
            '它是一堂小而可验证的课：为什么关于「公平」的直觉会失效，先后手就是优势。它和 Conway 生命游戏、Cellular Automata Lab 一起，构成这个网站的互动数学角落。',
          ),
        ],
      },
    ],
  },

  '/cellular-automata-lab': {
    eyebrow: L('One-dimensional rule explorer', '一维规则浏览器'),
    thesis: L(
      'Each 8-bit rule grows into a different black-and-white order.',
      '每个 8-bit 规则，都会长成不同的黑白秩序。',
    ),
    sections: [
      {
        title: L('All 256 elementary rules', '全部 256 条一维规则'),
        paragraphs: [
          L(
            'An elementary cellular automaton reads three binary cells (left, self, right), so there are 8 neighborhoods and 2 to the power of 8, or 256, possible rules. The lab renders any of them on a 128 by 72 canvas, with a 16 by 16 rule index of 24 by 14 thumbnails and a jump-to-rule input from 0 to 255. Featured rules are 30, 90, 110, and 184.',
            '一维元胞自动机读取三个二元细胞（左、自身、右），所以有 8 种邻域和 2 的 8 次方即 256 条规则。实验室能在 128 × 72 的画布上渲染任意一条，并提供 16 × 16 的规则索引（24 × 14 缩略图）和 0 到 255 的跳转输入。精选规则是 30、90、110 与 184。',
          ),
        ],
      },
      {
        title: L('Binary readouts and the I Ching', '二进制读数与易经'),
        paragraphs: [
          L(
            'Every rule shows its 8-bit table and a binary readout. A mapping layer pairs the 8 neighborhoods with the eight trigrams and the 64 combinations with the hexagrams, the same combinatorial bridge explained on the Conway’s Game of Life page: shared binary structure, not a claim that the I Ching predicted computers.',
            '每条规则都显示它的 8-bit 规则表和二进制读数。映射层把 8 种邻域对应到八卦，把 64 种组合对应到六十四卦，这是 Conway 生命游戏页面解释过的同一座组合数学桥梁：共享二元结构，而不是声称《易经》预言了计算机。',
          ),
        ],
      },
      {
        title: L('Playback', '播放控制'),
        paragraphs: [
          L(
            'Run, pause, step, and reset at 0.5x, 1x, or 2x speed. The current rule is kept in the URL so a specific pattern can be shared, and playback pauses automatically when the tab is hidden or the visitor prefers reduced motion.',
            '运行、暂停、单步、重置，速度 0.5×、1× 或 2×。当前规则保存在 URL 里，可以分享某个特定图案；切换标签页或系统设置为减少动效时会自动暂停。',
          ),
        ],
      },
    ],
  },

  '/archive/11-bonus-key-combo-builder': {
    eyebrow: L('Archived work · Campaign operations', '归档项目 · 活动运营'),
    thesis: L(
      'If it looked boring, that usually meant fewer midnight messages.',
      '如果它看起来很无聊，通常意味着半夜少几条消息。',
    ),
    sections: [
      {
        title: L('What was actually broken', '当时真正卡在哪'),
        paragraphs: [
          L(
            'Agents planning a 1+1 Bonus Key campaign had to combine providers by hand while respecting top-placement rules, banner obligations, and campaign text clauses. Duplicate claims and incompatible top-placement pairings slipped through, and every mistake surfaced late.',
            '代理在规划 1+1 Bonus Key 活动时，要手动组合供应商，同时遵守置顶规则、banner 义务与活动文案条款。重复领取和不兼容的置顶配对经常漏过去，每个错误都很晚才被发现。',
          ),
        ],
      },
      {
        title: L('How the UI encoded the rules', '界面怎么把规则写死'),
        paragraphs: [
          L(
            'A used-partner state blocks double selection. A top-position slot model validates ranking compatibility before a combo can be finalized, and live combo counts with slot occupancy show how much capacity is left. Each row carries its operational clauses, so the rule is visible where the choice is made.',
            '「已用合作方」状态阻止重复选择；置顶位模型在组合定稿前校验排名兼容性；实时的组合计数与位子占用显示还剩多少名额。每一行带着它的运营条款，规则就显示在做选择的地方。',
          ),
        ],
      },
      {
        title: L('Partner catalog', '合作方清单'),
        paragraphs: [
          L(
            'The catalog covered 21 providers, including Rich Gaming, Evo888H5, MegaH5, WF Gaming, EpicWin, UU Slots, AFB, Advant Play, 888King, BT Gaming, Creative Gaming, BNG, Joker, Meta Gaming, CP Games, PEGASUS, CrowdPlay, RSG, PlayStar, Mancala Gaming, and ClotPlay. The tool was an internal operations aid archived from a former domain and biased toward execution safety and auditability.',
            '清单覆盖 21 家供应商，包括 Rich Gaming、Evo888H5、MegaH5、WF Gaming、EpicWin、UU Slots、AFB、Advant Play、888King、BT Gaming、Creative Gaming、BNG、Joker、Meta Gaming、CP Games、PEGASUS、CrowdPlay、RSG、PlayStar、Mancala Gaming 与 ClotPlay。这是一个从旧域名归档的内部运营工具，取向是执行安全与可审计。',
          ),
        ],
      },
    ],
  },

  '/archive/atlantis-ui-ux-prototype': {
    eyebrow: L('Archived work · UI/UX prototype', '归档项目 · UI/UX 原型'),
    thesis: L(
      'A full-site UX baseline captured before engineering delivery.',
      '在工程交付之前先留下整站的 UX 基线。',
    ),
    sections: [
      {
        title: L('Design direction', '设计方向'),
        paragraphs: [
          L(
            'The prototype rebuilt the Atlantis website structure for clarity, hierarchy, and conversion flow, aligned desktop and mobile under one brand language, and prioritized navigation and readability for marketing audiences.',
            '原型重建了 Atlantis 网站的结构，追求清晰、层级与转化流程；桌面与移动端统一在同一套品牌语言下；导航与可读性优先照顾营销受众。',
          ),
        ],
      },
      {
        title: L('Execution context', '落地语境'),
        paragraphs: [
          L(
            'It served as the handoff artifact for implementation and stakeholder alignment, captured a full-site UX baseline before engineering delivery, and remained the reference layer for iterative visual refinement. The record preserves the design intent of the revamp for both desktop and mobile experiences.',
            '它是实现与利益相关方对齐的交接物，在工程交付之前记录了整站的 UX 基线，并在后续视觉迭代中持续作为参考层。这份记录保存了这次改版在桌面与移动端的设计意图。',
          ),
          L(
            'The archive entry keeps the record deliberately small: two sections of three points each, the origin line, and the prototype link. It is a design-intent record, not a case study with metrics, so nothing is claimed beyond what the prototype itself shows.',
            '这条归档刻意保持精简：两个章节各三个要点、一句来源说明，以及原型链接。它是一份设计意图记录，不是带指标的案例研究，所以不声称原型本身之外的任何结果。',
          ),
        ],
      },
      {
        title: L('Where it came from', '来源'),
        paragraphs: [
          L(
            'Archived from a previous Adobe XD prototype link; the original prototype is still linked from the page.',
            '归档自历史 Adobe XD 原型链接；页面上仍保留原型入口。',
          ),
        ],
      },
    ],
  },

  '/archive/soccerking-project': {
    eyebrow: L('Archived work · Social content', '归档项目 · 社媒内容'),
    thesis: L(
      'Match days are noisy; the real fight is the few hours after the final whistle.',
      '比赛日很吵；真正的战场是终场哨后的那几个小时。',
    ),
    sections: [
      {
        title: L('What was actually broken', '当时真正卡在哪'),
        paragraphs: [
          L(
            'Soccerking was a football page run daily during the Black Sire chapter, roughly 2018 to 2021. Match days produced noise, and the page needed a way to catch attention while it was still warm rather than posting whatever came first.',
            'Soccerking 是 Black Sire 时期（约 2018 到 2021 年）每天经营的足球页面。比赛日充满噪音，页面需要一种在注意力还热的时候接住它的方法，而不是先发什么算什么。',
          ),
        ],
      },
      {
        title: L('Three post types, three jobs', '三种帖子，三件不同的活'),
        paragraphs: [
          L(
            'Link posts carried traffic and highlights. Photo posts collected reactions and comments. Album posts were forwardable explainers built for saves and reshares. Naming the job before naming the creative kept briefs shorter and reviews less emotional.',
            'Link 帖负责流量与集锦；图片帖收集互动与评论；相册帖是可转发的解释型内容，为收藏与再分享而做。先定这条帖子要做的活，再谈创意，brief 更短，审稿也少些情绪。',
          ),
        ],
      },
      {
        title: L('Cadence, templates, and what we watched', '排期、模板，以及我们看什么数'),
        paragraphs: [
          L(
            'A match-led cadence with templates shortened the gap from full time to publish. Facebook Page insights were read for reach against depth, not a single vanity metric, and paid or campaign loops (likes, shares, tags, landing experiments) were treated as acceleration on top of the organic jobs. Six archived images from the page are shown on the route.',
            '以赛事为主线的排期加上模板，缩短了终场到发布的时间。Facebook Page insights 用来对照触达与深度，而不是盯一个虚荣指标；付费与活动循环（点赞、分享、标记、落地页实验）被当作自然内容之上的加速器。页面上展示了六张归档图片。',
          ),
        ],
      },
    ],
  },
};
