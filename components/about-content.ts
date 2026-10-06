// /about — the human behind the systems. Essay-style, not a résumé: thesis first,
// story second, proof through builds, then the archive and one clear next step.
// The React page (pages/AboutPage.tsx) and the static SEO body (seo-static-content.ts)
// both render from this one copy, so they cannot drift apart.
// Only facts the site already states elsewhere; no employers, markets or numbers
// beyond what the iGaming case studies publish.

type Localized = { en: string; zh: string };

const L = (en: string, zh: string): Localized => ({ en, zh });

export type AboutLink = { path: string; name: Localized; text: Localized };

export type AboutSection = {
  id: string;
  label: Localized;
  title: Localized;
  paragraphs: Localized[];
  pull?: Localized;
  links?: AboutLink[];
};

export const ABOUT_EMAIL = 'd.tytern@gmail.com';
export const ABOUT_LINKEDIN = 'https://www.linkedin.com/in/edentan95/';

export const ABOUT_PAGE = {
  kicker: L('About · Eden Tan', '关于 · Eden Tan'),
  title: L('Most problems aren’t hard. They’re scattered.', '多数问题不难，只是散。'),
  lede: L(
    'I’m Eden. I turn messy human behavior into systems people can actually run: software, AI workflows, reports and essays. This is not a résumé. It is how I think, and the work that shows it.',
    '我是 Eden。我把乱糟糟的人和事，整理成真的跑得起来的系统：软件、AI 工作流、报表，还有文章。这一页不是简历，是我怎么想事情，以及能证明它的作品。',
  ),
  sections: [
    {
      id: 'pattern',
      label: L('01 · The pattern', '01 · 我一直看到的事'),
      title: L('Nobody drew the system yet.', '只是还没人把系统画出来。'),
      paragraphs: [
        L('Most teams don’t lack information. They lack a shape for it.', '多数团队不缺信息，缺的是信息的形状。'),
        L(
          'The same question gets asked every Monday. The same spreadsheet gets rebuilt every month. The next new hire makes the same mistake as the last one.',
          '同一个问题每周一再问一次。同一张表每个月再做一次。新来的人，再犯一次上一个人犯过的错。',
        ),
        L(
          'That is rarely a people problem. It is a system nobody has drawn yet. Once you can see it, you can change it.',
          '这很少是人的问题，是一个还没人画出来的系统。看得清，就改得了。',
        ),
      ],
      pull: L(
        'Automation is not the value. Removing repeated confusion is the value.',
        '自动化本身不是价值，消除反复出现的混乱才是。',
      ),
    },
    {
      id: 'story',
      label: L('02 · How I got here', '02 · 我怎么走到这里'),
      title: L('I learned systems by running them every day.', '系统是我每天跑出来的。'),
      paragraphs: [
        L(
          'I learned cadence by running a football social page every single day for about three years. Match days set the rhythm, templates kept it alive, and ads only accelerated what already worked.',
          '节奏感，是我每天经营一个足球社群专页、连续大约三年练出来的。比赛日定节拍，模板让它活下去，广告只是放大本来就有效的东西。',
        ),
        L(
          'Then iGaming. I came up on the operator side: players, first deposits, CRM, retention. Every morning started with a report and one question: what changed, and why?',
          '然后进了 iGaming。我从 operator 端做起：玩家、首存、CRM、留存。每天早上从一份报表和一个问题开始：什么变了？为什么？',
        ),
        L(
          'Later I moved to the provider side and coordinated promotions across 50+ operators. Seeing the same industry from both ends taught me the most useful thing I know.',
          '后来我转到 provider 端，协调 50+ 个 operator 的促销。从两头看同一个行业，教会了我最有用的一件事。',
        ),
        L(
          'Somewhere along the way I stopped waiting for the right tool and started building it.',
          '走着走着，我不再等别人做出对的工具，开始自己做。',
        ),
      ],
      pull: L(
        'Two perspectives beat one. The overlap is where the system becomes visible.',
        '两个视角胜过一个。重叠的地方，系统才看得见。',
      ),
    },
    {
      id: 'beliefs',
      label: L('03 · What I believe', '03 · 我相信的事'),
      title: L('Five rules I keep coming back to.', '我反复回到的五条规则。'),
      paragraphs: [
        L(
          'Each one started as a mistake, mine or someone else’s. Each one has an essay behind it.',
          '每一条都来自一次犯错，我的或别人的。每一条背后都有一篇文章。',
        ),
      ],
      links: [
        {
          path: '/notes/turn-chaos-into-systems',
          name: L('Turn chaos into systems.', '把混乱变成系统。'),
          text: L('If the same confusion comes back twice, it deserves a structure.', '同一个混乱出现第二次，就值得一个结构。'),
        },
        {
          path: '/notes/human-nature-is-a-design-condition',
          name: L('Human nature is a design condition.', '人性不是借口，是设计条件。'),
          text: L('Don’t design a system that only ideal people can use correctly.', '不要设计一个只有理想的人才用得对的系统。'),
        },
        {
          path: '/notes/judgment-is-not-more-information',
          name: L('Judgment is not knowing more.', '判断不是知道更多。'),
          text: L('Information tells you what happened. Judgment decides what you are willing to trade next.', '信息告诉你发生了什么；判断决定你下一步愿意拿什么去换。'),
        },
        {
          path: '/notes/win-before-you-fight',
          name: L('Win before you fight.', '先胜后战。'),
          text: L('Strategy teaches you where effort is not worth spending.', '策略教你的，是哪里不值得用力。'),
        },
        {
          path: '/igaming',
          name: L('Trace it to a number.', '追到一个数字。'),
          text: L('Every decision should trace back to a number someone can check.', '每个决定，都应该追得到一个别人能核对的数字。'),
        },
      ],
    },
    {
      id: 'proof',
      label: L('04 · Proof, not promises', '04 · 用作品说话'),
      title: L('Things I built that still run.', '做出来、到现在还在跑的东西。'),
      paragraphs: [
        L(
          'Every one of these started as a real problem someone had. None of them is a mock-up.',
          '每一个都来自某个人真的遇到的问题，没有一个是摆着看的样稿。',
        ),
      ],
      links: [
        {
          path: '/etreporthub',
          name: L('ETReportHub', 'ETReportHub'),
          text: L('Excel in, decisions out: a daily-report engine for iGaming teams.', 'Excel 进，决策出：给 iGaming 团队的日报引擎。'),
        },
        {
          path: '/jiju-pet',
          name: L('Jiju', 'Jiju'),
          text: L('Pet-friendly local discovery. I build the system; a partner drives real-world growth.', '宠物友好的本地探索。我做系统，合伙人跑线下增长。'),
        },
        {
          path: '/poker',
          name: L('Friday Poker Club', 'Friday Poker Club'),
          text: L('A browser Hold’em table for a private crew.', '给熟人局用的浏览器德州牌桌。'),
        },
        {
          path: '/dr-racing',
          name: L('Dr Racing', 'Dr Racing'),
          text: L('A loan-pipeline dashboard for a motorcycle dealership.', '给摩托车行用的贷款进度仪表台。'),
        },
        {
          path: '/life-os',
          name: L('LifeOs', 'LifeOs'),
          text: L('Eight natal systems read into a plain-language life manual.', '八套本命系统，写成一本白话人生说明书。'),
        },
        {
          path: '/project/miya',
          name: L('MiYa', 'MiYa'),
          text: L('An iOS health report whose data never leaves your phone.', '数据不离开手机的 iOS 健康报告。'),
        },
      ],
    },
    {
      id: 'writing',
      label: L('05 · What I write about', '05 · 我写什么'),
      title: L('Three threads, one question: how do systems fail people?', '三条线，一个问题：系统怎么辜负人？'),
      paragraphs: [
        L(
          'Systems and judgment: how scattered work becomes structure, and why knowing more rarely helps you decide.',
          '系统与判断：散乱的工作怎么变成结构，以及为什么知道更多很少帮你做决定。',
        ),
        L(
          'Money and manias: what wealth actually is, and how schemes like Carrian and MBI keep coming back in new clothes.',
          '金钱与狂热：财富到底是什么，佳宁、MBI 这类骗局怎么一次次换衣服回来。',
        ),
        L(
          'People without a state: refugees and statelessness, mapped from evidence rather than slogans.',
          '没有国家的人：难民与无国籍，用证据而不是口号来画。',
        ),
      ],
      links: [
        { path: '/notes', name: L('All notes', '全部文章'), text: L('Essays and evidence maps.', '长文与证据地图。') },
        { path: '/igaming/cases', name: L('iGaming field notes', 'iGaming 实战案例'), text: L('Anonymised cases from both sides of the industry.', '行业两端的匿名案例。') },
        { path: '/wiki', name: L('Knowledge base', '知识库'), text: L('Reusable build skills and the RAG flow behind this site.', '可复用的构建技能，以及这个网站背后的 RAG 流程。') },
      ],
    },
    {
      id: 'off-desk',
      label: L('06 · Off the desk', '06 · 桌子以外'),
      title: L('Same instinct, different toys.', '同一种好奇，换几样玩具。'),
      paragraphs: [
        L(
          'I shoot Kodak Gold film. I play with cellular automata and coin-flip paradoxes. It is the same habit as the work: look for the rule underneath the noise.',
          '我拍 Kodak Gold 胶片，也玩细胞自动机和抛硬币悖论。跟工作是同一个习惯：在噪音底下找规则。',
        ),
      ],
      links: [
        { path: '/film-gallery', name: L('Film Gallery', '胶片图库'), text: L('Photographs on Kodak Gold.', 'Kodak Gold 拍的照片。') },
        { path: '/conways-game-of-life', name: L('Game of Life', '生命游戏'), text: L('Simple rules, endless patterns.', '规则很简单，图案没有尽头。') },
        { path: '/penneys-game', name: L('Penney’s Game', 'Penney’s Game'), text: L('A coin game that looks fair and isn’t.', '一个看起来公平、其实不公平的硬币游戏。') },
      ],
    },
  ] satisfies AboutSection[],
  closing: {
    label: L('07 · Next step', '07 · 下一步'),
    title: L('Is your business too messy to read?', '你的公司乱到自己都看不懂？'),
    body: L(
      'Send it to me. I’ll draw the system, and you will probably see something about yourself on the way.',
      '拿来给我。我帮你把系统画出来，顺便，你大概也会看清楚自己。',
    ),
    email: L('Email me', '写信给我'),
    linkedin: L('LinkedIn', 'LinkedIn'),
    notes: L('Read the notes', '先看文章'),
    projects: L('Open the projects', '看看作品'),
  },
};

/** Plain-text paragraphs for the static SEO body. */
export function aboutLinkLine(link: AboutLink, lang: 'en' | 'zh'): string {
  return `${link.name[lang]} ${link.text[lang]}`;
}
