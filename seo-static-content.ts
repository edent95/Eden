import { asiaIgamingUrl, localizedCanonicalRoutePath, type SeoLanguage } from './seo-routes.ts';
import { WIKI_INDEX, wikiTopics } from './components/wiki-content.ts';
import { wikiEntries } from './generated/content.ts';
import { MIYA_PRIVACY, miyaPlainText, type MiyaBlock } from './components/miya-privacy-content.ts';
import { MIYA_BRAND, miyaBrandPlain } from './components/miya-brand-content.ts';
import { IGAMING_HUB } from './components/igaming-hub-content.ts';
import { ABOUT_PAGE, aboutLinkLine } from './components/about-content.ts';
import { IGAMING_CASES, IGAMING_CASES_INDEX, type CaseBlock, type IGamingCase } from './components/igaming-cases-content.ts';

type Localized = Record<SeoLanguage, string>;

/** A crawlable link under a static section. `href` is absolute, or a path on this site starting with `/`. */
export type StaticLink = { label: Localized; href: Localized };

export type StaticRouteCopy = {
  eyebrow: Localized;
  thesis?: Localized;
  sections: Array<{ title: Localized; paragraphs: Localized[]; links?: StaticLink[] }>;
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

const joinLocalized = (cells: Localized[], en: string, zh: string): Localized => ({
  en: cells.map((cell) => cell.en).join(en),
  zh: cells.map((cell) => cell.zh).join(zh),
});
const titledLocalized = (title: Localized, body: Localized): Localized => ({
  en: `${title.en}: ${body.en}`,
  zh: `${title.zh}：${body.zh}`,
});

/** Flattens one `/igaming` article block into static paragraphs (same blocks the React pages render). */
function igamingBlockParagraphs(item: CaseBlock): Localized[] {
  switch (item.kind) {
    case 'p':
    case 'h':
      return [item.text];
    case 'callout':
      return [titledLocalized(item.title, item.body)];
    case 'path':
      return [joinLocalized(item.steps, ' → ', ' → ')];
    case 'chain':
    case 'cards':
      return item.items.map((entry) => titledLocalized(entry.title, entry.body));
    case 'table':
      return item.rows.map((row) => joinLocalized(row, ' — ', ' — '));
    case 'list':
      return item.items;
    case 'stat':
      return [{
        en: `${item.value} — ${item.label.en}. ${item.note.en}`,
        zh: `${item.value} —— ${item.label.zh}。${item.note.zh}`,
      }];
    case 'widget':
      return [titledLocalized(item.title, item.caption)];
    default:
      return [];
  }
}

/** Static body for one /igaming/cases/:slug field note, from the same copy the page renders. */
function igamingCaseStaticCopy(study: IGamingCase): StaticRouteCopy {
  const join = joinLocalized;
  return {
    eyebrow: IGAMING_CASES_INDEX.kicker,
    thesis: study.shortTitle,
    sections: [
      {
        title: study.title,
        paragraphs: [study.standfirst, study.anonymisation, join(study.tags, ' · ', ' · ')],
      },
      { title: { en: 'The case', zh: '案例' }, paragraphs: study.blocks.flatMap(igamingBlockParagraphs) },
      { title: { en: 'What it taught me', zh: '学到什么' }, paragraphs: study.lessons },
      { title: { en: 'What this case does not prove', zh: '这个案例不能证明什么' }, paragraphs: [study.limits] },
    ],
  };
}

/** Static body for the /igaming/cases index. */
function igamingCasesIndexStaticCopy(): StaticRouteCopy {
  const page = IGAMING_CASES_INDEX;
  return {
    eyebrow: page.kicker,
    thesis: page.claim,
    sections: [
      { title: page.kicker, paragraphs: [page.standfirst, page.rule.body] },
      ...IGAMING_CASES.map((study) => ({
        title: study.shortTitle,
        paragraphs: [study.standfirst, study.limits],
      })),
      { title: page.moreTitle, paragraphs: [page.moreBody] },
    ],
  };
}

/**
 * Static body for the /igaming hub, from the same copy the React page renders
 * (`components/igaming-hub-content.ts`). The starter pack and guides moved to Asia iGaming on
 * 2026-11-25; their old paths are `movedTo` redirect pages and have no static copy here.
 */
function igamingHubStaticCopy(): StaticRouteCopy {
  const page = IGAMING_HUB;
  const local = (path: string): Localized => ({
    en: localizedCanonicalRoutePath(path, 'en'),
    zh: localizedCanonicalRoutePath(path, 'zh'),
  });
  return {
    eyebrow: page.kicker,
    thesis: page.claim,
    sections: page.sections.map((section, index) => ({
      title: section.title,
      paragraphs: index === 0 ? [page.standfirst, ...section.paragraphs] : section.paragraphs,
      links: section.links.map((link) => ({
        label: link.label,
        href: link.href === 'cases'
          ? local('/igaming/cases')
          : { en: asiaIgamingUrl(link.href.slice('asia:'.length), 'en'), zh: asiaIgamingUrl(link.href.slice('asia:'.length), 'zh') },
      })),
    })),
  };
}

/**
 * Hand-written static body copy for routes whose substance lives in React data
 * rather than in `wiki/`. Every fact here mirrors what the live page renders
 * (product modules, numbers, section order); keep the two in step when a page changes.
 * Wiki/Notes articles come from `generated/content.ts`; the Wiki hub combines those notes with its shared index copy.
 * `/project/miya`, `/igaming` (hub) and the `/igaming/cases` pages are the exceptions: they are generated from
 * `components/miya-privacy-content.ts` / `components/igaming-hub-content.ts` / `components/igaming-cases-content.ts`, the same copy
 * the React pages render, so the static text cannot drift.
 */
/** Static body for /project/miya/brand, generated from the same copy the React page renders. */
function miyaBrandStaticCopy(): StaticRouteCopy {
  const b = MIYA_BRAND;
  const plain = (value: Localized): Localized => ({ en: miyaBrandPlain(value.en), zh: miyaBrandPlain(value.zh) });
  const rules = (list: ReadonlyArray<{ title: Localized; copy: Localized }>) =>
    list.map((rule) => L(`${rule.title.en}: ${miyaBrandPlain(rule.copy.en)}`, `${rule.title.zh}：${miyaBrandPlain(rule.copy.zh)}`));
  return {
    eyebrow: b.kicker,
    thesis: b.subtitle,
    sections: [
      { title: b.title, paragraphs: [b.copy] },
      {
        title: b.voice.title,
        paragraphs: [
          b.voice.copy,
          ...b.voice.pairs.map((pair) => L(`${pair.ctx.en}: “${pair.prefer.en}”, not “${pair.avoid.en}”`, `${pair.ctx.zh}：写「${pair.prefer.zh}」，不写「${pair.avoid.zh}」`)),
          ...rules(b.voice.rules),
          ...b.voice.boundaries.flatMap((item) => [L(`${item.title.en}: ${item.copy.en}`, `${item.title.zh}：${item.copy.zh}`), item.quote]),
        ],
      },
      { title: b.name.title, paragraphs: [b.name.copy] },
      {
        title: b.color.title,
        paragraphs: [
          b.color.copy,
          ...b.color.groups.map((group) => L(
            `${group.title.en}: ${group.swatches.map((s) => `${s.name} ${s.light}/${s.dark}`).join(', ')}.`,
            `${group.title.zh}：${group.swatches.map((s) => `${s.name} ${s.light}/${s.dark}`).join('，')}。`,
          )),
          ...rules(b.color.rules),
        ],
      },
      { title: b.type.title, paragraphs: [b.type.copy, ...rules(b.type.rules)] },
      { title: b.space.title, paragraphs: [b.space.copy, ...rules(b.space.rules)] },
      { title: b.logo.title, paragraphs: [b.logo.copy, ...b.logo.marks.map((mark) => L(`${mark.title.en}: ${mark.copy.en}`, `${mark.title.zh}：${mark.copy.zh}`))] },
      { title: b.icons.title, paragraphs: [b.icons.copy, ...b.icons.motifs.map((m) => L(`${m.name.en}: ${m.formula.en}`, `${m.name.zh}：${m.formula.zh}`)), ...rules(b.icons.rules)] },
      { title: b.motion.title, paragraphs: [b.motion.copy, ...rules(b.motion.rules)] },
      { title: b.tools.title, paragraphs: [b.tools.copy, ...b.tools.list.map((tool) => L(`${tool.skill}: ${tool.copy.en}`, `${tool.skill}：${tool.copy.zh}`))] },
    ].map((section) => ({ title: section.title, paragraphs: section.paragraphs.map(plain) })),
  };
}

/** Static body for /about, generated from the same copy the React page renders. */
function aboutStaticCopy(): StaticRouteCopy {
  const page = ABOUT_PAGE;
  return {
    eyebrow: page.kicker,
    thesis: page.title,
    sections: [
      { title: L('About Eden Tan', '关于 Eden Tan'), paragraphs: [page.lede] },
      ...page.sections.map((section) => ({
        title: section.title,
        paragraphs: [
          ...section.paragraphs,
          ...('pull' in section && section.pull ? [section.pull] : []),
          ...('links' in section && section.links
            ? section.links.map((link) => L(aboutLinkLine(link, 'en'), aboutLinkLine(link, 'zh')))
            : []),
        ],
      })),
      { title: page.closing.title, paragraphs: [page.closing.body] },
    ],
  };
}

export const ROUTE_STATIC_COPY: Record<string, StaticRouteCopy> = {
  '/wiki': {
    eyebrow: L('EDEN / WIKI', 'EDEN / WIKI'),
    sections: [
      { title: WIKI_INDEX.topicsTitle, paragraphs: [WIKI_INDEX.topicsIntro] },
      ...wikiTopics.map((note) => ({ title: note.title, paragraphs: [note.summary] })),
      { title: WIKI_INDEX.buildTitle, paragraphs: [WIKI_INDEX.buildIntro] },
      ...wikiEntries.map((entry) => ({ title: entry.title, paragraphs: [entry.summary] })),
      { title: WIKI_INDEX.relationshipTitle, paragraphs: [WIKI_INDEX.relationshipCopy] },
    ],
  },
  '/project/miya': miyaStaticCopy(),
  '/project/miya/brand': miyaBrandStaticCopy(),
  '/about': aboutStaticCopy(),
  '/igaming': igamingHubStaticCopy(),
  '/igaming/cases': igamingCasesIndexStaticCopy(),
  ...Object.fromEntries(IGAMING_CASES.map((study) => [`/igaming/cases/${study.slug}`, igamingCaseStaticCopy(study)])),

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
            'Eden Tan builds products, data tools, and AI systems out of messy human situations: a pet-friendly discovery app, a private poker table, a daily-report engine for operations teams, a motorcycle-loan dashboard, and a personal Life OS. Each one is documented here as a working system, with the reasoning kept next to the build.',
            'Eden Tan 从混乱的人性与现实场景里做出产品、数据工具与 AI 系统：宠物友好地点发现 app、熟人局牌桌、运营团队的日报数据引擎、摩托车贷款仪表台，以及一套个人 Life OS。每一个都以真实运行中的系统来记录，思考过程与构建证据放在一起。',
          ),
          L(
            'The site has three layers that link to each other. Projects hold the builds. Notes hold the essays on systems, judgment, strategy, and money. The Wiki connects those essays by theme and keeps practical build notes as a second layer.',
            '网站分三层，彼此互链：Projects 放作品；Notes 放关于系统、判断、策略与金钱的文章；Wiki 按主题连接文章，并在第二层保留可查阅的构建经验。',
          ),
        ],
      },
      {
        title: L('Where to start', '从哪里开始'),
        paragraphs: [
          L(
            'Read the essay on turning chaos into systems first, then open any app on the Projects shelf.',
            '先读「把混乱变成系统」这篇文章，再从 Projects 货架打开任何一个 app。',
          ),
        ],
      },
    ],
  },

  '/project': {
    eyebrow: L('Work · Projects', '作品 · Projects'),
    thesis: L(
      'Every icon is something real that got built and still runs.',
      '都是用心做的',
    ),
    sections: [
      {
        title: L('Nine apps on the shelf', '货架上的九个 app'),
        paragraphs: [
          L(
            'Jiju is local discovery for people with pets, starting in Penang. Friday Poker Club is a private browser Hold’em table for a fixed crew. ETReportHub is the daily data layer that turns Transaction and Customer Excel files into operating decisions. Life OS cross-reads BaZi, I Ching, elemental profiles, and tarot into one traceable long-term base map, then answers questions about right now against it. Dr Racing runs a motorcycle dealership’s loan pipeline from lead to delivery.',
            'Jiju 是从 Penang 起步、给养宠物的人用的本地发现工具。Friday Poker Club 是给固定一群人开的浏览器德州牌桌。ETReportHub 是把 Transaction 与 Customer Excel 变成运营判断的每日数据层。Life OS 把八字、易经、元素画像与塔罗交叉阅读成一张可溯源的长期底图，再对着它回答当下的问题。Dr Racing 是摩托车行从 lead 到交车的贷款流水线。',
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
        title: L('How AI runs Jiju now', 'Jiju 现在怎么由 AI 自动跑'),
        paragraphs: [
          L(
            'Jiju began in January 2026 as pair-coding with an AI. By November 2026 most daily work runs on agents at night: five Grok bots find places, deals and events through the Jiju API with daily quotas; a local gemma4 model on Ollama reads sources and proposes highlights; code checks every quote word for word against an https source; Claude reviews the rest against each tag definition; and new places or prices wait for a human to confirm. 847 places are published across 12 regions of Malaysia and Singapore.',
            'Jiju 从 2026 年 1 月跟 AI 一起写代码开始。到 2026 年 11 月，日常的活大多由 agent 在夜里做：五个 Grok bot 按每日份额经 Jiju API 找地点、优惠和活动；本机 Ollama 上的 gemma4 读来源、提议卖点；代码逐字核对每句引文都在 https 来源里；Claude 按标签定义复核；新地点和价格等人确认。马来西亚与新加坡 12 个州 / 地区共上架 847 家。',
          ),
          L(
            'Code is written by Claude Code and Codex, each change in its own git worktree, audited read-only by agy, checked on a self-hosted CI runner, and merged automatically once every check passes. 435 pull requests had merged by 23 November 2026. Claude runs on a subscription and every other source stays on a free tier with hard daily caps.',
            '代码由 Claude Code 与 Codex 写，每个改动一个独立 git worktree，agy 做只读体检，检查跑在自托管 CI runner 上，全部通过就自动合并，截至 2026-11-23 已合并 435 个 PR。Claude 用订阅，其余来源都守在免费档并写死每日上限。',
          ),
        ],
      },
      {
        title: L('Where it runs', '在哪里运行'),
        paragraphs: [
          L(
            'Jiju is free, started in Penang, Malaysia with depth over reach, and runs in any browser as a responsive web app that can be installed to the home screen from jiju.pet.',
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
        title: L('Video tutorial', '视频教程'),
        paragraphs: [
          L(
            'Four short lessons, about eight minutes in total with Chinese subtitles and demo data: signing in and navigation; the daily upload of Transaction and Customer Excel with the import checks; reading daily, weekly, and compare-mode reports and exporting them; and member, segment, channel, trend, and brand-comparison analysis. Each lesson lists its key steps beside the video.',
            '4 段短视频，合计约 8 分钟，中文字幕、演示数据：登录与界面导航；每日上传 Transaction 与 Customer Excel 及导入检查；每日、每周、对比模式报表的查看与导出；会员、分群、渠道、趋势与品牌对比分析。每课都列出操作要点。',
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

  '/igaming-ai': {
    eyebrow: L('B2B iGaming automation', 'B2B iGaming 自动化'),
    thesis: L(
      'Autopilot with a trust dial: operations that run by themselves, stay in plain sight, and go only as far as you let them.',
      '一个会自己转、人看得见、放手有档位的运营系统。',
    ),
    sections: [
      {
        title: L('The same directory, two names for each row', '同一个名录，每一行换个名字'),
        paragraphs: [
          L(
            'Jiju runs a directory of places, merchants, events and promotions. On the B2B side of iGaming the rows are the same: a merchant becomes a provider or merchant, merchant details become provider information, shop deals and events become provider promotions, and a shop’s logo and links become the merchant brand. Every row goes through the same steps — collect, check, publish, update, expire.',
            'Jiju 经营一个名录：地点、店家、活动、优惠。换到 iGaming 的 B2B，每一行都对得上：店家对应 provider / merchant，店家资料对应 provider information，店家优惠与活动对应 provider promotion，店家的 logo 与链接对应 merchant brand。每一行走的都是同样几步 —— 收资料、核对、上架、更新、过期下架。',
          ),
        ],
      },
      {
        title: L('Six problems, one loop', '六个问题，一个闭环'),
        paragraphs: [
          L(
            'A B2B iGaming team leaks time in six places: onboarding a signed operator, keeping the game catalogue the same across operators, launching one promotion to many operators (50 operators × 8 fields is 400 confirmations), answering support, building reports by hand, and noticing a dropping account only at month-end. One loop — intake, configure, check, go live, report, watch — covers all six, with money, terms and relationships kept with people.',
            'B2B iGaming 团队在六个地方漏时间：签下的 operator 迟迟上不了线、游戏目录在各家之间对不上、一个活动发给很多家（50 家 × 8 个字段就是 400 个确认）、客服重复回答、报表人手做、掉量的客户到月底才发现。一个闭环 —— 进来、配置、把关、上线、报表、巡查 —— 管住这六件事，钱、条款和关系留在人手里。',
          ),
          L(
            'What it is worth: a typical seven-person B2B team (JobStreet Malaysia median pay read 26 Nov 2026, plus employer EPF, SOCSO and EIS) costs about RM 35,841 a month; the engine costs about RM 1,544 a month to run today. The engine already keeps the Jiju directory true — 944 live places, 108 back-office tools and 2,381 auto-merged changes between September and November 2026; the iGaming modules are built on it to the buyer’s process.',
            '值多少：一个常见的七人 B2B 团队（JobStreet 马来西亚 2026-11-26 读取的月薪中位数，加雇主 EPF、SOCSO、EIS）每月约 RM 35,841；引擎现在每月运行成本约 RM 1,544。引擎已经在让 Jiju 名录保持准确 —— 944 家上线地点、108 个后台工具、2026 年 9–11 月 2,381 个自动合并的改动；iGaming 模块在它上面按买方流程搭。',
          ),
        ],
        links: [
          { label: L('The engine on Jiju', 'Jiju 上的引擎'), href: L('/jiju-autopilot', '/zh/jiju-autopilot') },
        ],
      },
      {
        title: L('The dashboard: Now, Record, Loops', '仪表台：现在、对象、回路'),
        paragraphs: [
          L(
            'Underneath is the record layer an aggregator keeps: provider, integration line, account, operator and promotion, linked, with sensitive columns locked by role — the cost rate is removed on the server for every role but one, providers and operators see each other only by alias, and the AI assistant reads provider information only. On top of the records the engine has three layers, each already running in a live system. Machines move records forward in a closed loop (Jiju). People take over on one pipeline per record, where each role sees its own step, a checklist gates the hand-over and a failed check becomes one plain next step (Dr Racing, a dealership’s daily tool). A third layer says where things stopped and how much is automatic: every item names who holds it, and a stuck step becomes one decision on the Now screen.',
            '最底下是聚合商手上的记录层：provider、接入线路、接入帐号、operator、promotion 互相连着，敏感栏位按角色上锁 —— 成本价除了一个角色之外在服务器就拿掉，provider 和 operator 互相只看到代号，AI 助手只读 provider 资料。记录之上，引擎有三层，每一层都已经在一个正在跑的系统里。机器用闭环把记录往前推（Jiju）。人在每条记录的流水线上接手：每个角色只看自己那一步，清单齐了才放行，没过的检查变成一句清楚的下一步（Dr Racing，一家车行每天在用的工具）。第三层回答哪里断了、自动到哪一档：每件事都写明球在谁那里，卡住的一步变成「现在」画面上的一个决定。',
          ),
          L(
            'Automation comes in three levels — watch, propose, auto. Every loop starts on watch; it asks to go automatic only after ten approvals in a row, unchanged. Anything that spends money or messages a real person — promotion go-live, bulk messages to operators, sell rates, terms and disputes — is capped at propose.',
            '自动化分三档：只看、提议、自动。每条回路从「只看」开始，要连续十次原样通过，才会问能不能升到自动。会花钱、会给真人发消息的 —— 促销上线、群发给 operator、售价、条款与争议 —— 最高只到「提议」。',
          ),
        ],
        links: [
          { label: L('The pipeline at a dealership', '车行的流水线仪表台'), href: L('/dr-racing', '/zh/dr-racing') },
        ],
      },
    ],
  },
  '/jiju-autopilot': {
    eyebrow: L('Full automation system · For sale', '全自动系统 · 可出售'),
    thesis: L(
      'A places directory that keeps itself true — run by one person and a crew of machines.',
      '一个自己保持准确的地点名录 —— 一个人加一群机器在跑。',
    ),
    sections: [
      {
        title: L('Six problems, one closed loop', '六个维度的问题，一个闭环'),
        paragraphs: [
          L(
            'A directory goes wrong in six ways at once: coverage (new places nobody tells you about), completeness (no hours, no photos), accuracy (who says it is true), being found on Google, reach on social media, and freshness (closed shops still listed). Jiju Autopilot runs one loop — discover, fill in, check, go live, share, watch — and what the watch finds goes back to the start, while a control room runs the schedule and repairs the code.',
            '名录会同时在六个维度上出问题：覆盖（新店没人告诉你）、完整（没营业时间、没照片）、准确（谁说这是真的）、在 Google 上被搜到、社媒声量、时效（店关了还挂着）。Jiju Autopilot 用一个闭环解决：发现、补齐、把关、上线、分享、巡查，巡查发现的变化回到起点；控制室负责排程、修代码。',
          ),
          L(
            'What it is worth: in the 30 days to 26 Nov 2026 the machines found 1,616 places, stored 1,202 photos, checked 795 links, published 230 promos and 87 events and merged 389 code changes — about 139 working days by hand at assumed minutes per task. A traditional team of seven (JobStreet Malaysia median pay, November 2026, plus employer EPF, SOCSO and EIS) would cost about RM 29,289 a month; the system’s subscriptions, cloud and domains cost about RM 1,544.',
            '值多少：截至 2026-11-26 的 30 天里，机器发现 1,616 个地点、存了 1,202 张照片、核对 795 条链接、上线 230 个优惠和 87 个活动、合并 389 个代码改动 —— 按假设的每件分钟数，人手约要 139 个工作日。七个人的传统团队（JobStreet 马来西亚 2026 年 11 月薪资中位数，加雇主 EPF、SOCSO、EIS）每月约 RM 29,289；系统的订阅、云端与域名每月约 RM 1,544。',
          ),
          L(
            'Search data for jiju.pet (Google Search Console, 26 Nov 2026): 195,939 impressions and 523 clicks in the last 28 days, up from 38,024 and 180 in the 28 days before; weekly impressions grew from 223 in the first week of June to 80,407 in the week of 16 November; 76 % of clicks land on place pages the loop built, and organic search brought 48 of 51 key actions in GA4.',
            'jiju.pet 的搜索数据（Google Search Console，2026-11-26）：最近 28 天展示 195,939 次、点击 523 次，前 28 天是 38,024 次和 180 次；每周展示从 6 月第一周的 223 次长到 11 月 16 日那周的 80,407 次；76% 的点击落在闭环做出来的地点页上；GA4 里 51 次关键行动有 48 次来自自然搜索。',
          ),
        ],
      },
      {
        title: L('The ten machines', '十台机器'),
        paragraphs: [
          L(
            'Jiju (jiju.pet) lists 944 live pet-friendly places in Malaysia and Singapore (26 Nov 2026). News from five outlets is read every hour and events with an official source publish themselves. Five Grok bots pull research tasks from a queue ranked by gap size and search demand, with daily caps and a nightly check that every copied quote is still on its page. All agents read and write through 108 back-office tools that preview before every write and log every change.',
            'Jiju（jiju.pet）收录马来西亚和新加坡 944 家上线的宠物友好地点（2026-11-26）。每小时读 5 家媒体，有官方来源的活动自己上线。5 个 Grok bot 从按缺口大小和搜索需求排序的队列里领任务，有每日上限，每晚核对抄来的原话还在不在网页上。所有 agent 都经 108 个后台工具读写，写之前先预演，每笔改动都记录。',
          ),
          L(
            'A place goes live by itself when name, opening hours, description, a stored photo and a location are complete; every Monday a quarter of live places is checked against Google’s business status and closed ones drop back to draft, never deleted. Photos are copied with their source, links are ranked by trust and patrolled daily, owners confirm their details on WhatsApp at most five a day, and confirmed fields are locked against bots.',
            '名字、营业时间、说明、自存照片、位置五项齐了，地点自己上线；每周一拿四分之一的上线地点对 Google 营业状态，倒闭的退回草稿、从不删除。照片连出处一起复制，链接按可信度排序并每天巡查，店主在 WhatsApp 上确认资料（一天最多五家），确认过的栏位 bot 改不了。',
          ),
          L(
            'A control-room dashboard runs every job on a schedule, has AI write code fixes that a second AI reviews, runs the tests on a Mac at home and merges green changes itself (2,381 merges since 18 Sep 2026). Social posts are written by a local model, drawn as cards and posted through Meta’s official API, one a day.',
            '控制室面板按时间表跑所有任务：AI 写代码修复、另一个 AI 审，测试在家里的 Mac 上跑，全绿的改动自己合并（2026-09-18 起合并 2,381 次）。社媒帖子由本机模型写、画成卡片、经 Meta 官方接口发出，一天一帖。',
          ),
        ],
        links: [
          { label: L('Jiju itself', 'Jiju 本身'), href: L('/jiju-pet', '/zh/jiju-pet') },
          { label: L('jiju.pet', 'jiju.pet'), href: L('https://jiju.pet/', 'https://jiju.pet/') },
        ],
      },
    ],
  },
  '/dr-racing': {
    eyebrow: L('Loan operations · Dealership tool', '贷款运营 · 车行工具'),
    thesis: L(
      'Run a motorcycle dealership from first lead to delivered bike.',
      '把摩托车行从第一条 lead 到交车，放进同一个仪表台。',
    ),
    sections: [
      {
        title: L('How a deal moves', '一单生意怎么走'),
        paragraphs: [
          L(
            'Lead, application, bank rounds, delivery, settlement. Leads arrive from TikTok, Facebook, Instagram, Google, the public website, and walk-ins, each through the salesperson’s own tracked link. A loan or cash application collects the IC, payslips, bank account, the bike, and the installment plan. Admin can submit to several banks at once; each bank round records the outcome, and a rejection comes back as a reject code translated into a plain next step. An approved deal opens a delivery checklist where Operations orders the bike and each role records its own step with files attached; the bike is delivered only when every step is done. Settlement checks payments against deposit plus cash, syncs invoices and receipts to the accounting ledger, and pays commission by tier plan.',
            'Lead、申请、银行轮次、交车、结算。Lead 来自 TikTok、Facebook、Instagram、Google、公开官网和到店客人，各自经由 sales 自己的追踪链接；贷款或现金申请收集 IC、薪资单、银行户口、车型与分期方案；需要时可以同时送几家银行，每一轮银行结果都记录下来，被拒时 reject code 会被翻译成一句清楚的下一步；批准后打开交车 checklist，Operations 订车，每个角色附上文件记录自己那一步，全部完成才能交车；结算时按订金加现金核对收款，发票和收据同步到会计账本，佣金按分级方案计算。',
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
            'Modules: Task Inbox, Applications, Leads, Delivery, Stock, Finance, Commissions, and a staff Handbook, with four roles (Sales, Admin, Operations Manager, Super Admin). Each role sees its own inbox, and whoever owns the next step gets a phone push. The dashboard also tracks WhatsApp clicks by channel, monthly marketing spend, stock and bikes to source, staff attendance, each deal’s fees and costs, commissions, and an audit log. New staff learn from recorded walkthrough videos of the current flow, chaptered by role.',
            '模块：Task Inbox、Applications、Leads、交车、库存、财务、佣金和员工手册；四种角色：Sales、Admin、Operations Manager、Super Admin，各自有自己的待办，轮到谁就推送到谁的手机。仪表台同时追踪各渠道的 WhatsApp 点击、每月营销支出、库存与待订的车、员工出勤、每单的费用与成本、佣金与审计日志。新员工看按角色分章节的操作录像学习当前流程。',
          ),
        ],
      },
      {
        title: L('Numbers the owner can check', '老板看得到、也核得了的数字'),
        paragraphs: [
          L(
            'Super Admin gets an analytics page: what each deal made, which models sell and which earn. A Banks tab shows each bank’s approval rate, how many days it takes to answer, and its most common reject reasons. Every number opens the list of deals it was counted from.',
            'Super Admin 有一页数据分析：每单赚多少、哪个车型好卖、哪个车型赚钱。银行那一栏列出每家银行的批准率、平均几天回复、最常见的拒绝原因。每个数字都能点开，看到它是从哪几单算出来的。',
          ),
          L(
            'The shop’s public website, dr-racing.com, lives in the same codebase: the server hands search engines complete pages, twenty-odd Malay articles answer what buyers search for, and every WhatsApp button goes through a tracked link.',
            '车行官网 dr-racing.com 也在同一套代码里：服务器直接把完整网页交给搜索引擎，二十多篇马来文文章回答买车的人会搜的问题，每个 WhatsApp 按钮都走追踪链接。',
          ),
        ],
      },
      {
        title: L('The money has to add up', '钱一定要对得上'),
        paragraphs: [
          L(
            'Every fee and cost on the delivery checklist goes straight into that deal’s profit and loss. Dates follow the Malaysian day rather than UTC. Each invoice and receipt is saved with its own key before it goes to the accounting ledger and is resent until the ledger confirms it, so a retry never records a payment twice. Every record carries a version number, so when two people edit the same deal the second one is told instead of silently overwriting the first.',
            '交车 checklist 里的每一笔费用和成本直接进这一单的盈亏；日期按马来西亚的一天来算，不按 UTC。每张发票和收据送去会计账本之前先存好单号和内容，没确认收到就一直重发，重试不会多记一笔。每条记录都带版本号，两个人同时改同一单，后存的人会被告知，不会悄悄盖掉对方的改动。',
          ),
        ],
      },
      {
        title: L('Security is not a hidden button', '安全不是把按钮藏起来'),
        paragraphs: [
          L(
            'Which staff member can see which customer is decided by nearly 3,000 lines of database rules on the server, re-tested role by role on every change. In November 2026 three rounds of attack-style testing in an isolated sandbox (access control, injection, request flooding, SSRF, XSS, business-flow abuse) found nothing reproducible. The database, files and staff accounts are snapshotted daily and each snapshot is checked to be complete.',
            '哪个员工能看哪些客户，由服务器上将近 3000 行的数据库规则决定，每次改动都按角色整套重测。2026 年 11 月在隔离的测试环境里做了三轮模拟攻击（越权、注入、狂刷请求、SSRF、XSS、钻业务流程的空子），没有一个能重现的漏洞。数据库、文件和员工账号每天快照，每一份都核验完整。',
          ),
        ],
      },
      {
        title: L('How it is built', '怎么做出来的'),
        paragraphs: [
          L(
            'More than 300 merged PRs since work began on 30 June 2026, 110 unit test files and 23 end-to-end specs. Every change passes the same gate on the laptop, before push, and in CI; only a green gate merges, and the security rules deploy themselves after the merge and are read back from production to confirm they match.',
            '2026 年 6 月 30 日开工以来合并了 300 多个 PR，有 110 个单元测试文件和 23 套端到端测试。每个改动在本机、推送前、CI 上都过同一道关卡，全部通过才能合并；合并后安全规则自动上线，再从正式环境读回来核对。',
          ),
        ],
      },
      {
        title: L('Deployment and demo', '部署与 demo'),
        paragraphs: [
          L(
            'Production runs on Firebase App Hosting with Firestore security rules tested in CI, staff sign-in with an authenticator code, and nightly verified backups; the interface is available in Chinese, English, and Malay. The public demo embedded on this page (October 2026 build) runs on fixed anonymized data with no login and resets on reload; phone push, file uploads, and the ledger sync are off in the demo, and November additions such as several banks at once and the analytics page are not in it yet.',
            '生产环境跑在 Firebase App Hosting，Firestore 安全规则在 CI 里测试，员工用验证器动态码登录，数据每晚备份并核验；界面提供中文、英文与马来文。页面内嵌的公开 demo（2026 年 10 月版本）使用固定的匿名数据，无需登录，刷新即重置；手机推送、文件上传和账本同步在 demo 里是关的；同时送几家银行、数据分析这些 11 月才加的功能，demo 里还没有。',
          ),
        ],
      },
    ],
  },

  '/poker': {
    eyebrow: L('Multiplayer game · Table for the crew', '多人游戏 · 给那群人的牌桌'),
    thesis: L(
      'No place to book. Just bring the crew back.',
      '不用约地点。把那群人叫回来就好。',
    ),
    sections: [
      {
        title: L('What is on the table', '桌上有什么'),
        paragraphs: [
          L(
            'Texas Hold’em in cash-game form: up to nine seats, blinds at 2/4/10/20, a $50 minimum buy-in, all-in and side pots, an optional nine-second action clock, and practice bots when the table is short.',
            '德州扑克，现金局形式：最多九座、盲注 2/4/10/20、最低买入 $50、支持全下与边池、可选 9 秒行动倒数，人不够时可以加练习机器人。',
          ),
          L(
            'Six mini games sit next to it — 8/9, Niu Niu, Chinese Poker, Blackjack, Penney’s Game with its own leaderboard, and Wheel of Changes — plus four party games that need no buy-in, and a Visual Chip mode that tracks stacks, bets, pot and settlement while you deal physical cards.',
            '旁边还有六个小游戏——8/9、牛牛、十三水、21 点、有自己排行榜的硬币骗局，以及大衍之轮——加上四个不用买入的派对游戏，还有一个「实体牌局记筹码」模式：你们用真牌打，它记筹码、下注、底池和结算。',
          ),
        ],
      },
      {
        title: L('How joining works', '怎么进来'),
        paragraphs: [
          L(
            'Open a room, send the invite link, buy in and sit down. Guest entry works without an account; signing in with Google keeps chips, avatar and record across devices. While a table is active it is also listed in the shared lobby and there is no room password, so the invite link is the convenient way in, not a lock on the door.',
            '开房、发邀请链接、买入、坐下。可以直接访客进入；用 Google 登录能让筹码、头像和记录跨设备保留。牌桌活跃期间也会列在公共大厅里，而且没有房间密码，所以邀请链接是方便自己人进来的入口，不是门锁。',
          ),
          L(
            'Seats and stacks persist, so a dropped player reopens the link and returns to the same seat instead of restarting the night. Tables with nobody active clear themselves after ten minutes.',
            '座位和筹码都留着，掉线的人重开链接就回到原位，不用整晚重来。十分钟没人活动的牌桌会自己清掉。',
          ),
        ],
      },
      {
        title: L('Built for a crew, not a casino', '为熟人局，不是赌场'),
        paragraphs: [
          L(
            'Chips are play chips: no cash value, no deposit, no withdrawal, no purchases, and free unlimited top-ups. The Player Record keeps lifetime buy-ins, the day’s result and a session history filtered by table type, so the group has something to argue about.',
            '筹码是娱乐筹码：没有现金价值、没有充值提现、没有内购，补充免费且无限。玩家资金记录保留累计买入、当日输赢和可按桌型筛选的对局历史，让大家有得互相吐槽。',
          ),
          L(
            'Table state syncs directly between the players’ browsers, which is fast and free but readable by a determined player, so the table is built for people who already trust each other. In-table chat and optional peer-to-peer voice, report and block, nickname and chat filtering, in-app account deletion and a public legal page cover the rest.',
            '牌局状态直接在各人的浏览器之间同步，快且不花钱，但存心的人能读到，所以这张桌子是给本来就互相信任的人用的。其余部分由桌内聊天与可选点对点语音、举报与屏蔽、昵称和聊天过滤、app 内删除账号，以及一个公开的法律页面来覆盖。',
          ),
        ],
      },
      {
        title: L('Where it runs', '在哪里运行'),
        paragraphs: [
          L(
            'A mobile-first browser table at poker.eden-tan.com, installable as a PWA, in Chinese and English. React and TypeScript on the front, Firebase Realtime Database for seats, actions and reconnects, WebRTC for table voice.',
            'poker.eden-tan.com 上一张移动优先的浏览器牌桌，可安装为 PWA，界面中英双语。前端是 React 与 TypeScript，座位、动作与重连由 Firebase Realtime Database 同步，桌内语音走 WebRTC。',
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
    eyebrow: L('Natal data · Real-life records', '命理数据 · 现实记录'),
    thesis: L('Is fate fixed? Let the data answer.', '命运是不是注定的？让数据来回答。'),
    sections: [
      {
        title: L('Why it exists', '为什么做它'),
        paragraphs: [
          L(
            'Fortune telling is either sold as destiny or dismissed as superstition, and almost nobody checks it. LifeOs exists to test, with data, whether a person\u2019s life is written in advance: compute the natal chart once and lock it, record what actually happens with dates, then score every hit and every miss.',
            '算命、命理，要么被包装成天命，要么被一句迷信打发掉，几乎没有人认真验证。LifeOs 就是为了用数据检验一个人的命运是不是注定的：本命盘只算一次并锁定，把现实里真正发生的事连同日期记下来，再对每一次命中和落空打分。',
          ),
          L(
            'The working hypothesis: natal systems match real outcomes about 73% of the time, and the remaining 27% is where people change their own course. These numbers are under test, not a finished result, and will be revised as more lives are recorded.',
            '目前的工作假设：命理对现实结果的吻合率约 73%，剩下约 27% 是人真正能改变自己命运的空间。这两个数字正在检验中，不是定案的结论，记录的人生越多，会被修正得越准。',
          ),
        ],
      },
      {
        title: L('What it reads', '它读什么'),
        paragraphs: [
          L(
            'Birth date, time and place go in, and eight natal systems run separately: BaZi, Zi Wei Dou Shu with its flying stars, the natal I Ching hexagram, numerology, Human Design, Gene Keys, Western astrology and Vedic astrology. Each keeps its own sources and its own stated uncertainty.',
            '输入出生日期、时间与地点，八套本命系统各自独立运行：八字、紫微斗数（含四化飞星）、易经本命卦、数字学、人类图、基因钥匙、西洋占星、吠陀占星。每一套各自保留出处，也各自标明不确定之处。',
          ),
          L(
            'The systems are never blended into one score, never treated as votes, and no new personality theory is invented on top of them. Where they disagree, the disagreement stays visible. Tarot sits in a separate inquiry layer for one-off questions and never writes back into the chart.',
            '八套系统不会被混成一个分数、不会被拿来投票，上面也不会另造一套人格理论。彼此矛盾的地方，矛盾会留在那里。塔罗在独立的问事层，用来问一次性的事，永远不会回写本命盘。',
          ),
        ],
      },
      {
        title: L('What is inside', '里面有什么'),
        paragraphs: [
          L(
            'The main modules are the eight-chapter life manual, a four-situation personality analysis, the BaZi multi-model page where five methods answer side by side, the Zi Wei chart-data page with twelve palaces and rotation views, how to use yourself, deep reading, the tarot desk, life in months, the life journal, and a daily line written for you.',
            '主要模块：八章的人生说明书、四场景的性格分析、五种方法并排作答的八字多模型、含十二宫与转宫视角的紫微资料页、怎么使用自己、深度解读、塔罗提问台、人生月份、人生手帐，以及每天写给你的一句话。',
          ),
          L(
            'The tarot desk uses the full 78-card Rider–Waite–Smith deck across seven spreads, from a single card to the whole deck. A question locks on submission and is archived, so you can come back and mark what actually happened.',
            '塔罗提问台用完整 78 张 Rider–Waite–Smith 牌，七种牌阵，从单张到整副。问题一提交就锁定并归档，之后你可以回来标记实际发生了什么。',
          ),
        ],
      },
      {
        title: L('How it runs', '怎么运行'),
        paragraphs: [
          L(
            'A responsive web app, installable as a PWA, in Chinese and English, with public guide pages also in Traditional Chinese. Google or Apple sign-in is required to build a profile, and signing in includes consent to an anonymous public case library. Data is local-first but syncs to your own cloud account, and readings are generated server-side.',
            '响应式 Web App，可安装为 PWA，界面有中文与英文，公开指南页另有繁體中文。建立档案需要 Google 或 Apple 登录，登录同时包含对匿名公开命例库的同意。资料 local-first，但会同步到你自己的云端账号，解读在服务器端生成。',
          ),
          L(
            'The free plan is free forever and turns every reading into a one-tap copyable instruction for any chat assistant, including narrower packs for BaZi only, Zi Wei only, or a rotated chart. An online plan at $7.99 a month or $59 a year, and top-up credits at $2.99 for 10, are announced but not switched on; until then in-app readings run on a free daily quota.',
            '免费版永久免费，把每次解读变成可一键复制的指令，贴到任何聊天助手里继续问，也有只看八字、只看紫微或转宫盘的窄版本。在线版 $7.99 / 月或 $59 / 年、加购点数 $2.99 / 10 点已公布但尚未开启；在此之前，应用内解读按每日免费额度使用。',
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
            'Color is signal: six base tokens from Paper to Deep, with Eden Mint as the light-mode accent and an orange accent in dark mode. Type stays simple; motion stays light and lives on visible objects rather than on backgrounds.',
            '颜色只做信号：从 Paper 到 Deep 六个基础 token，浅色模式的强调色是 Eden Mint，深色模式用橙色。字体少变化；动效要轻，放在可见物件上，而不是背景上。',
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
