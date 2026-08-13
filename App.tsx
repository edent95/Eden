/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { applyPageSeo } from './seo';
import ProductStorePage from './components/ProductStorePage';
import PenneysGamePage from './components/PenneysGamePage';
import type { CssArtComponent } from './components/css-art/index';
import {
  elementalIconCssArtItems,
  getHomeSelectedWorkBannerByTitle,
  getProjectCssArtByProjectTitle,
  homeInterestCssArtItems,
  homeSelectedWorkBannerItems,
  homeSystemCssArtItems,
  officeIconCssArtItems,
  projectCssArtItems,
} from './css-art.registry';
import {
  FilmGalleryCssIcon,
  HomeArchiveEvolutionTotem,
  HomeBaguaMirrorTotem,
  HomeGramophoneTotem,
  HomeJijuCatScene,
  PenneyCoinCssIcon,
  ProjectsCrmCssIcon,
  ProjectsEtReportCssIcon,
  ProjectsJijuCssIcon,
  ProjectsLifeOsCssIcon,
  ProjectsPokerCssIcon,
  WikiBackgroundMusicCssIcon,
  WikiButtonFeedbackCssIcon,
  WikiFirebaseStorageCssIcon,
  WikiRagFlowCssIcon,
  WikiSkillsCssIcon,
  WikiViteCssIcon,
} from './components/css-art/index';
import { 
  Bookmark,
  Brain,
  Linkedin, 
  ExternalLink,
  Download,
  Database,
  GitBranch,
  Layers,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Clock3,
  Copy,
  MessageSquare,
  MoonStar,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  SunMedium,
  Pause,
  Play,
  RotateCcw,
  SearchCheck,
  TrendingUp,
  UserRound
} from 'lucide-react';

type Language = 'en' | 'zh';
type Theme = 'light' | 'dark';
type ThemePreference = Theme | 'auto';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FlatEmoji: React.FC<{
  emoji: string;
  size?: 'sm' | 'md' | 'lg';
  bob?: boolean;
  tilt?: boolean;
  delayMs?: number;
  className?: string;
}> = ({ emoji, size = 'md', bob = true, tilt = false, delayMs = 0, className = '' }) => {
  const sizeClass = size === 'sm' ? 'flat-emoji-sm' : size === 'lg' ? 'flat-emoji-lg' : 'flat-emoji';
  const motion = tilt ? 'emoji-tilt' : bob ? 'emoji-bob' : '';
  return (
    <span
      className={`${sizeClass} ${motion} ${className}`.trim()}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
      aria-hidden
    >
      {emoji}
    </span>
  );
};

const jijuBuildFromZeroToOne = [
  {
    phase: { en: 'Phase 01 · Foundation', zh: '阶段 01 · 基础稳定化' },
    chapterVoice: {
      en: 'What scared me then wasn’t missing features—it was the silent drop-off when someone opened the app and nothing held.',
      zh: '那一阵子我最怕的不是缺功能，是用户第一次点开就卡住——那种无声的流失，比被骂还难受。',
    },
    emoji: '🧱',
    when: { en: 'Mar 25 - Apr 2, 2026', zh: '2026/03/25 - 2026/04/02' },
    why: {
      en: 'Before shipping anything new, I had to stop recurring reliability failures that were quietly burning trust.',
      zh: '在加新功能之前，我得先止住那些反复发生、却一直在偷走信任的稳定性问题。',
    },
    thinking: {
      en: 'I ranked fixes by user-loss risk first: auth instability, permission drift, and route inconsistency.',
      zh: '我按“最容易流失用户”的顺序下手：登录不稳、权限漂移、路由不一致。',
    },
    planning: {
      en: 'I split the work into three tracks: auth bootstrap, data/storage rules, and route/error resilience.',
      zh: '我把工作拆成三条线：认证启动、数据/存储规则、路由/错误韧性。',
    },
    solving: {
      en: [
        'Fixed first-login race conditions so profile creation was not interrupted.',
        'Aligned Firestore and Storage boundaries with real-world read/write paths.',
        'Stabilized error-page and route behavior across environments.',
      ],
      zh: [
        '修复首次登录竞态，避免 profile 写入中途被打断。',
        '对齐 Firestore 与 Storage 的权限边界和真实读写路径。',
        '稳定错误页与路由行为，减少环境差异导致的异常。',
      ],
    },
    outcome: {
      en: 'The product moved from fragile to dependable, so iteration speed no longer depended on luck.',
      zh: '产品从“能跑但脆”进到“可依赖可迭代”，后续速度不再靠运气。',
    },
  },
  {
    phase: { en: 'Phase 02 · Core Journey Completion', zh: '阶段 02 · 主路径闭环' },
    chapterVoice: {
      en: 'Once features lit up, I realized lit modules aren’t a journey—I had to wire an ending people could actually reach.',
      zh: '功能一个个亮灯之后，我才发现：灯亮了，路没接通。得让别人能真的走到终点。',
    },
    emoji: '🧭',
    when: { en: 'Apr 2 - Apr 7, 2026', zh: '2026/04/02 - 2026/04/07' },
    why: {
      en: 'Having modules on-screen did not mean users could actually finish the journey.',
      zh: '功能都在，不代表用户真的走得到终点。',
    },
    thinking: {
      en: 'I optimized for end-to-end completion rate, not feature count.',
      zh: '我盯的是端到端完成率，不是“又多了几个功能”。',
    },
    planning: {
      en: 'I mapped and repaired each critical step in Home -> Discovery -> Detail -> Review/Check-in -> Passport/Community.',
      zh: '我逐段修复主路径：Home -> Discovery -> Detail -> Review/Check-in -> Passport/Community。',
    },
    solving: {
      en: [
        'Extended onboarding into a coherent multi-step process.',
        'Added pet photo framing controls to solve real usability pain.',
        'Connected sanctuary routes and actions into a predictable loop.',
      ],
      zh: [
        '把 onboarding 扩成连贯的多步骤引导。',
        '加入宠物照片构图控制，解决真实使用痛点。',
        '打通 Sanctuary 入口与动作，形成可预期闭环。',
      ],
    },
    outcome: {
      en: 'The experience became connected and finishable instead of fragmented and easy to abandon.',
      zh: '体验从碎片化变成可连贯完成，不再走到一半就散掉。',
    },
  },
  {
    phase: { en: 'Phase 03 · Analytics Foundation', zh: '阶段 03 · 分析体系打底' },
    chapterVoice: {
      en: 'I wanted visibility—not how busy I was, but where people hesitated and where they quietly left.',
      zh: '我开始想要「看见」：不是看见自己多忙，而是看见用户在第几步犹豫、在第几步离开。',
    },
    emoji: '📊',
    when: { en: 'Apr 7 - Apr 8, 2026', zh: '2026/04/07 - 2026/04/08' },
    why: {
      en: 'I needed behavioral visibility before making product decisions with confidence.',
      zh: '我要先看见真实行为，决策才有把握。',
    },
    thinking: {
      en: 'If a journey is not observable, it is not optimizable.',
      zh: '一条路径看不见，就谈不上优化。',
    },
    planning: {
      en: 'I aligned event models across product actions, analytics pipelines, and attribution.',
      zh: '我统一了产品动作、分析管线与归因事件模型。',
    },
    solving: {
      en: [
        'Upgraded analytics from script-level loading to journey-level SPA tracking.',
        'Implemented source-aware CompleteRegistration instrumentation.',
        'Maintained semantic consistency between front-end and backend event records.',
      ],
      zh: [
        '把埋点从“挂脚本”升级到“按用户旅程跟踪 SPA 行为”。',
        '打通带来源参数的 CompleteRegistration 事件。',
        '保持前端与后端事件语义一致，便于分析与运营联读。',
      ],
    },
    outcome: {
      en: 'Decisions shifted from assumptions to measurable behavior and repeatable checks.',
      zh: '决策从“猜”转到“可观测、可复核”的判断方式。',
    },
  },
  {
    phase: { en: 'Phase 04 · Mobile UX Hardening', zh: '阶段 04 · 移动端体验加固' },
    chapterVoice: {
      en: 'Desktop forgives a lot; on a small screen, every extra pixel can feel like an argument.',
      zh: '桌面把一切说得很轻巧；一换到小屏，每个多出来的摩擦都像在跟人作对。',
    },
    emoji: '📱',
    when: { en: 'Apr 7 - Apr 14, 2026', zh: '2026/04/07 - 2026/04/14' },
    why: {
      en: 'Mobile friction was directly hurting activation and install success.',
      zh: '移动端摩擦正在直接拖慢激活和安装转化。',
    },
    thinking: {
      en: 'Small mobile friction compounds into large retention loss.',
      zh: '手机上的小摩擦，最后会变成大的留存损失。',
    },
    planning: {
      en: 'I focused on install flow clarity, modal accessibility, and first-session guidance.',
      zh: '我聚焦安装引导清晰度、弹层可达性、首次会话引导。',
    },
    solving: {
      en: [
        'Refined iOS install guidance by browser context.',
        'Fixed modal spacing and stacking issues on smaller screens.',
        'Reduced first-screen cognitive load with progressive disclosure.',
      ],
      zh: [
        '按浏览器上下文优化 iOS 安装引导。',
        '修复小屏下弹层留白与层级遮挡问题。',
        '用渐进式信息披露降低首屏认知负担。',
      ],
    },
    outcome: {
      en: 'First-session mobile flow became clearer, lighter, and easier to complete.',
      zh: '移动端首会话更清楚、更轻、更容易走完关键动作。',
    },
  },
  {
    phase: { en: 'Phase 05 · Sanctuary Productization', zh: '阶段 05 · Sanctuary 产品化' },
    chapterVoice: {
      en: 'Sanctuary couldn’t stay a noble sentence—it needed a door you could open, a loop you could finish, and a signal that something moved.',
      zh: 'Sanctuary 不能只是好看的一句使命——它得让人点得进去、走得完，还知道自己帮上了什么。',
    },
    emoji: '🐾',
    when: { en: 'Apr 2 - Apr 10, 2026', zh: '2026/04/02 - 2026/04/10' },
    why: {
      en: 'Sanctuary had to work as a real loop, not stay as a well-written concept page.',
      zh: 'Sanctuary 不能停在理念页，必须跑成真实闭环。',
    },
    thinking: {
      en: 'A module is real only when users can enter, act, and see impact.',
      zh: '用户进得去、动得了、看得到影响，模块才算真的存在。',
    },
    planning: {
      en: 'I staged the build as routing -> performance -> interactions -> visible impact.',
      zh: '我按“路由 -> 性能 -> 交互 -> 可见影响”分阶段落地。',
    },
    solving: {
      en: [
        'Normalized sanctuary entry routing and legacy action compatibility.',
        'Reduced heavy initial reads and staged non-critical data fetches.',
        'Linked user actions to public-facing impact signals.',
      ],
      zh: [
        '统一 Sanctuary 入口路由并兼容历史 action。',
        '减轻首屏重查询，非关键数据延后加载。',
        '把用户动作映射成可见的公益影响信号。',
      ],
    },
    outcome: {
      en: 'Sanctuary became an operating loop that carries both user value and trust value.',
      zh: 'Sanctuary 从概念升级成可运行闭环，同时承载用户价值与信任价值。',
    },
  },
  {
    phase: { en: 'Phase 06 · SEO Architecture', zh: '阶段 06 · SEO 结构升级' },
    chapterVoice: {
      en: 'Volume mattered less than being findable—I worked on the map that makes searchers feel they landed in the right room.',
      zh: '写得多不如被找得到。我就去做那张让人搜进来时觉得「嗯，来对了」的地图。',
    },
    emoji: '🔍',
    when: { en: 'Apr 9 - Apr 13, 2026', zh: '2026/04/09 - 2026/04/13' },
    why: {
      en: 'Discovery bottlenecks came from structural gaps, not content quantity.',
      zh: '发现增长的瓶颈主要在结构，不在“内容不够多”。',
    },
    thinking: {
      en: 'Search growth depends on intent coverage plus internal authority flow.',
      zh: '搜索增长靠两件事：意图覆盖和站内权重流动。',
    },
    planning: {
      en: 'I expanded high-intent answer surfaces and redistributed high-value internal links.',
      zh: '我扩展高意图答案页，并重排高价值内链分发。',
    },
    solving: {
      en: [
        'Expanded answer-page coverage for dog/cafe/location intents.',
        'Improved internal linking from homepage, blog, and profile routes.',
        'Validated build and sitemap after each structural change.',
      ],
      zh: [
        '补齐狗狗/咖啡馆/地点意图的答案页覆盖。',
        '强化首页、博客与详情页到核心页面的内链导流。',
        '每次结构调整后都校验 build 与 sitemap。',
      ],
    },
    outcome: {
      en: 'Discovery quality improved through stronger relevance, cleaner structure, and better crawl paths.',
      zh: '相关性、结构和抓取路径一起变稳后，整体发现质量明显上升。',
    },
  },
  {
    phase: { en: 'Phase 07 · Backoffice Safety', zh: '阶段 07 · 后台操作安全' },
    chapterVoice: {
      en: 'The backoffice is a kitchen—one clumsy move seasons the whole dining room. I narrowed the blast radius of honest mistakes.',
      zh: '后台像厨房：一失手，前台整桌菜都变味。我想把「手滑」的伤害关小一点。',
    },
    emoji: '🛡️',
    when: { en: 'Apr 13 - Apr 15, 2026', zh: '2026/04/13 - 2026/04/15' },
    why: {
      en: 'Broad BO save writes were overwriting valid production settings too easily.',
      zh: '后台整包写入太容易覆盖线上有效配置，风险不可接受。',
    },
    thinking: {
      en: 'Operational safety has to be designed into write behavior itself.',
      zh: '操作安全必须写进机制本身，不靠“大家小心点”。',
    },
    planning: {
      en: 'I replaced full-object writes with scoped patch writes in risk-prone areas.',
      zh: '我把高风险区域从整包写入改为 patch 局部写入。',
    },
    solving: {
      en: [
        'Migrated settings saves from spread-based writes to patch updates.',
        'Protected banner/logo/avatar references from accidental reset.',
        'Kept operations fast while reducing cross-field blast radius.',
      ],
      zh: [
        '把 settings 保存从 spread 回写迁移到 patch 更新。',
        '保护 banner/logo/avatar 引用，避免误清空。',
        '在保持效率的同时降低跨字段误伤半径。',
      ],
    },
    outcome: {
      en: 'Backoffice became safer for daily operations without slowing teams down.',
      zh: '后台日常操作更安全，同时不牺牲交付速度。',
    },
  },
  {
    phase: { en: 'Phase 08 · Documentation System', zh: '阶段 08 · 文档与记忆系统' },
    chapterVoice: {
      en: 'Chats sink; memory blurs. I kept logs like leaving breathing room for a future me who would forget the heat of today.',
      zh: '聊天记录会沉，脑子会忘。我只好认真写日志——像给未来的自己留一口气。',
    },
    emoji: '📚',
    when: { en: 'Mar 25 - Present', zh: '2026/03/25 - 至今' },
    why: {
      en: 'I wanted decisions to compound over time, not disappear in temporary chats.',
      zh: '我希望决策能复利沉淀，而不是沉在临时对话里。',
    },
    thinking: {
      en: 'Documentation is execution infrastructure, not administrative overhead.',
      zh: '文档是执行基础设施，不是“额外行政工作”。',
    },
    planning: {
      en: 'I enforced a strict log pattern: what changed, why, impact, and next.',
      zh: '我强制执行日志结构：改了什么、为什么、影响、下一步。',
    },
    solving: {
      en: [
        'Maintained high-frequency structured logs for every real change.',
        'Promoted stable truths into persistent memory and digest pages.',
        'Compressed old logs into summaries while preserving strategic context.',
      ],
      zh: [
        '高频记录每一次真实改动并结构化归档。',
        '把稳定结论升级到长期 Memory 与 Digest 页面。',
        '压缩旧日志为摘要，同时保留战略上下文。',
      ],
    },
    outcome: {
      en: 'The project gained a durable memory layer that makes future decisions faster and cleaner.',
      zh: '项目形成可持续调用的记忆层，后续决策更快也更干净。',
    },
  },
  {
    phase: { en: 'Phase 09 · Build Philosophy', zh: '阶段 09 · 构建哲学' },
    chapterVoice: {
      en: 'By chapter nine, the honest line is: I mind repeating the same hole more than I mind moving slowly.',
      zh: '写到第九段，我其实想说的是：我不怕慢，我怕同一个坑踩两次还当姿势好看。',
    },
    emoji: '💡',
    when: { en: 'Current', zh: '当前进行中' },
    why: {
      en: 'I want readers to see how I make decisions, not only what I shipped.',
      zh: '我希望别人看到的不只是产出，还有我怎么判断、怎么推进。',
    },
    thinking: {
      en: 'I optimize for truth, continuity, and repeatability over short-term vanity wins.',
      zh: '我优先真相、连续性、可复用性，不追短期好看的成绩单。',
    },
    planning: {
      en: 'For each cycle: detect root cause -> define minimal stable fix -> validate -> document -> scale.',
      zh: '每轮循环：找根因 -> 定最小稳定解 -> 验证 -> 记录 -> 扩展。',
    },
    solving: {
      en: [
        'Prioritize structural stability before cosmetic acceleration.',
        'Make each release observable through behavior, analytics, or ops signals.',
        'Design each fix so the next iteration becomes easier.',
      ],
      zh: [
        '先修结构稳定，再做表层加速。',
        '让每次发布都可通过行为、分析或运营信号被观测。',
        '每个修复都要降低下一轮迭代成本。',
      ],
    },
    outcome: {
      en: 'jiju.pet now evolves as a compounding system, not a one-off build artifact.',
      zh: 'jiju.pet 正在以“可复利系统”持续演进，而不是一次性作品。',
    },
  },
];

const decisionDna = [
  {
    emoji: '🧱',
    trait: { en: 'Stability before expansion', zh: '先稳定，再扩张' },
    detail: {
      en: 'I do not chase visible wins while core reliability is unstable. I fix failure points first.',
      zh: '当核心可靠性不稳时，我不会追求表面成果；先止损、先修基础。',
    },
  },
  {
    emoji: '🧭',
    trait: { en: 'Journey completion before feature breadth', zh: '先保证闭环，再谈功能广度' },
    detail: {
      en: 'I prioritize whether users can complete key flows from start to finish.',
      zh: '我优先判断用户能否从头到尾走完关键路径。',
    },
  },
  {
    emoji: '📝',
    trait: { en: 'Every change is documented for reuse', zh: '每次改动都沉淀可复用知识' },
    detail: {
      en: 'I capture why, impact, and next actions so future decisions become faster and cleaner.',
      zh: '我记录原因、影响与下一步，让后续决策更快、更干净。',
    },
  },
];

const jijuKnowledgeHighlights = [
  {
    emoji: '🐾',
    title: { en: 'Product Positioning', zh: '产品定位' },
    points: {
      en: [
        'jiju.pet is positioned as a Malaysia-first pet lifestyle platform, not only a cafe listing product.',
        'The core loop combines discovery, policy trust, real pet records, community interaction, and sanctuary impact.',
        'The primary journey is continuously optimized as: Home -> Discovery -> Cafe Detail -> Review/Check-in -> Passport/Community.',
      ],
      zh: [
        'jiju.pet 的定位是马来西亚优先的宠物生活平台，而不只是咖啡馆列表产品。',
        '核心闭环融合了地点发现、规则信任、真实宠物档案、社区互动与 Sanctuary 影响反馈。',
        '主路径长期优化为：Home -> Discovery -> Cafe Detail -> Review/Check-in -> Passport/Community。',
      ],
    },
  },
  {
    emoji: '⚙️',
    title: { en: 'Execution System', zh: '执行系统' },
    points: {
      en: [
        'Build decisions are log-driven: every real change captures what changed, why, impact, and next action.',
        'Stable conclusions are promoted into long-term memory pages to prevent repeated rework.',
        'This creates a compounding workflow where documentation works as execution infrastructure.',
      ],
      zh: [
        '构建决策采用日志驱动：每次真实改动都记录改动内容、原因、影响与下一步。',
        '稳定结论会升级到长期记忆页，避免重复返工。',
        '因此形成了“文档即执行基础设施”的复利工作流。',
      ],
    },
  },
  {
    emoji: '🔒',
    title: { en: 'Trust and Safety Priorities', zh: '信任与安全优先级' },
    points: {
      en: [
        'Information accuracy is treated as the platform trust layer, not a cosmetic moderation feature.',
        'User data is separated into private profile, public profile, and referral records for safer boundaries.',
        'Backoffice safety is enforced with patch-based settings writes, role boundaries, and audit traceability.',
      ],
      zh: [
        'Information Accuracy 被定义为信任层，而不是装饰性的审核功能。',
        '用户数据拆分为私有主档、公开投影、推荐记录，边界更安全。',
        '后台通过 patch 写入、角色边界与审计轨迹来保障操作安全。',
      ],
    },
  },
  {
    emoji: '📈',
    title: { en: 'Growth and Analytics', zh: '增长与分析' },
    points: {
      en: [
        'Analytics now tracks real user behavior across page, tag, cafe view, and save/unsave actions.',
        'GTM, GA4, and Firestore events are aligned to support both marketing visibility and ops decisions.',
        'A weekly analytics SOP is used to prevent silent tracking drift and ID replacement risks.',
      ],
      zh: [
        '分析链路已覆盖 page、tag、cafe view 与 save/unsave 等真实用户行为。',
        'GTM、GA4 与 Firestore 事件语义已对齐，兼顾营销与运营决策。',
        '通过每周巡检 SOP 降低埋点漂移与 ID 被替换的风险。',
      ],
    },
  },
  {
    emoji: '🎨',
    title: { en: 'Design and Experience Principles', zh: '设计与体验原则' },
    points: {
      en: [
        'Design direction is aesthetic-first, mobile-first, and performance-conscious with restrained interaction.',
        'The interface is designed to feel calm and editorial, while keeping flows actionable and low-friction.',
        'The product favors durable systems over short-term visual wins.',
      ],
      zh: [
        '设计方向坚持 aesthetic-first、mobile-first、性能优先与克制交互。',
        '界面强调平静、编辑感与低摩擦可执行路径。',
        '产品优先可持续系统，不追求短期视觉胜利。',
      ],
    },
  },
  {
    emoji: '🤝',
    title: { en: 'Community and Sanctuary Direction', zh: '社区与 Sanctuary 方向' },
    points: {
      en: [
        'The long-term model is community co-building: users contribute, verify, and improve shared pet knowledge.',
        'Contribution is designed to connect with real-world support loops such as sanctuary resources and care.',
        'The goal is a trusted ecosystem that compounds online information into offline impact.',
      ],
      zh: [
        '长期模式是社区共建：用户共同贡献、校验并完善宠物生活知识。',
        '贡献机制会连接到现实支持闭环，如 Sanctuary 物资与照护。',
        '目标是把线上信息复利转化为线下真实影响的信任生态。',
      ],
    },
  },
];

const jijuArchiveReviewTracks = [
  {
    label: { en: 'Phase 1', zh: '阶段 1' },
    title: { en: 'From idea to operating system', zh: '从想法变成系统' },
    copy: {
      en: 'Jiju started by defining the core memory layer, user data boundaries, BO permissions, and the main user path. The early lesson was that Community, Profile, Passport, Quest, and Backoffice are not side modules; they are the platform structure.',
      zh: 'Jiju 先把核心记忆库、用户数据边界、BO 权限和主路径搭起来。早期结论很清楚：Community、Profile、Passport、Quest、Backoffice 都不是附属功能，而是长期平台结构。',
    },
  },
  {
    label: { en: 'Phase 2', zh: '阶段 2' },
    title: { en: 'From listing to trust layer', zh: '从地点列表进入信任层' },
    copy: {
      en: 'Cafe data stopped being only name, address, and pet policy. Visit reality, verification trust, editorial context, user submission, owner invite, and BO review became one information chain.',
      zh: 'Cafe 不再只是名字、地址和 pet policy。visit reality、verification trust、editorial context、用户提交、owner invite、BO 审核开始形成同一条资料链。',
    },
  },
  {
    label: { en: 'Phase 3', zh: '阶段 3' },
    title: { en: 'From SPA to routed public surface', zh: '从纯 SPA 进入公开路由结构' },
    copy: {
      en: 'As SEO and public pages grew, routing needed a clearer source of truth. Vike-owned routes, route registry, guide pages, best pages, answers, and cafe profiles turned search growth into architecture work.',
      zh: 'SEO 和公开页面变多后，路由需要更清楚的事实源。Vike-owned routes、route registry、guides、best pages、answers、cafe profiles 让搜索增长变成架构工作。',
    },
  },
  {
    label: { en: 'Phase 4', zh: '阶段 4' },
    title: { en: 'From memory to guardrails', zh: '从靠记忆变成机械护栏' },
    copy: {
      en: 'The project eventually turned repeated mistakes into scripts and gates: npm run verify, route checks, env boundary checks, no generic PWA service worker checks, CI, Docker smoke tests, and data-table standards.',
      zh: '后期真正的升级，是把重复踩坑变成脚本和闸门：npm run verify、route checks、env boundary checks、no generic PWA service worker、CI、Docker smoke test、Data Table 标准。',
    },
  },
];

const jijuOperatingModel = [
  {
    title: { en: 'Raw truth', zh: '真实资料' },
    lines: {
      en: ['Cafe policy details', 'Owner-provided updates', 'User reports and corrections', 'Last verification context'],
      zh: ['Cafe policy 细节', 'Owner-provided 更新', '用户回报与纠错', '最后验证时间与来源'],
    },
  },
  {
    title: { en: 'Trust workflow', zh: '信任工作流' },
    lines: {
      en: ['Add Cafe input', 'Owner invite link', 'BO review and edit', 'Public cafe profile output'],
      zh: ['Add Cafe 输入', 'Owner invite link', 'BO 审核与编辑', '公开 Cafe Profile 输出'],
    },
  },
  {
    title: { en: 'Growth surface', zh: '增长表层' },
    lines: {
      en: ['City hubs', 'Pet-type best pages', 'Answer pages', 'Cafe profiles ready for AI/search citation'],
      zh: ['City hubs', '宠物类型 best pages', 'Answer pages', '可被 AI/search 引用的 Cafe Profile'],
    },
  },
];

const jijuSkillCards = [
  {
    title: { en: 'Memory Bootstrap', zh: 'Memory Bootstrap' },
    copy: {
      en: 'Start with Home, Memory, Agent Knowledge Digest, soul.md, then log.md when timeline matters. Logs are history; Memory and Digest hold stable truth.',
      zh: '启动顺序固定为 Home、Memory、Agent Knowledge Digest、soul.md；需要时间线时再读 log.md。log 记录历史，Memory / Digest 才放稳定事实。',
    },
  },
  {
    title: { en: 'Frontend + BO Linkage', zh: '前台 + BO 联动' },
    copy: {
      en: 'Every frontend change asks whether BO, shared types, services, rules, review state, and operations entry points also need to change.',
      zh: '每次前台改动都要问：BO、shared types、services、rules、审核状态、运营入口是否也要同步。',
    },
  },
  {
    title: { en: 'Alignment Checklist', zh: 'Alignment Checklist' },
    copy: {
      en: 'For Cafe Profile, Add Cafe, and BO Edit, each field is checked for input, display, public/private status, BO-only logic, and owner-provided availability.',
      zh: 'Cafe Profile、Add Cafe、BO Edit 三边字段逐项检查：能不能填、能不能展示、是否公开、是否 BO-only、owner 能不能提供。',
    },
  },
  {
    title: { en: 'Mechanical Verify Guardrails', zh: 'Mechanical Verify Guardrails' },
    copy: {
      en: 'The project does not trust agent memory alone. It converts boundaries into repeatable verify scripts and CI gates.',
      zh: '项目不只相信 agent 记忆，而是把边界变成可重复执行的 verify scripts 和 CI gates。',
    },
  },
  {
    title: { en: 'Live Demo Reuse', zh: 'Live Demo Reuse' },
    copy: {
      en: 'Input and output demos reuse real AddCafePage and CafeDetailPage components, so demo problems expose real product problems.',
      zh: 'input demo / output demo 直接复用真实 AddCafePage 和 CafeDetailPage，让 demo 暴露的问题就是真实页面的问题。',
    },
  },
  {
    title: { en: 'Graceful Degradation', zh: 'Graceful Degradation' },
    copy: {
      en: 'When an external API path becomes unavailable, the product removes false affordance, keeps manual operations, and returns clear unavailable states.',
      zh: '外部 API 路径不可用时，不硬做假入口；下线错误按钮，保留手动运营，并返回清楚的 unavailable 状态。',
    },
  },
];

const jijuPhilosophyPoints = [
  {
    title: { en: 'Product philosophy', zh: '产品哲学' },
    copy: {
      en: 'Jiju helps pet owners make calmer decisions before going out. The asset is not quantity; it is policy detail, verification context, community correction, and operational maintainability.',
      zh: 'Jiju 帮养宠的人在出门前做出更安心的判断。核心资产不是数量，而是规则细节、验证语境、社区纠错和可持续运营。',
    },
  },
  {
    title: { en: 'Design philosophy', zh: '设计哲学' },
    copy: {
      en: 'The product should feel like a gentle pet world entrance: aesthetic-first, low-noise, mobile-first, with micro-interactions that feel like touch rather than button decoration.',
      zh: '产品应该像一个温柔的宠物世界入口：美感优先、低噪音、手机优先，微交互像触碰，不像按钮装饰。',
    },
  },
  {
    title: { en: 'Engineering philosophy', zh: '工程哲学' },
    copy: {
      en: 'A complex AI-built product cannot be maintained by memory. It needs route facts, env helpers, Firestore payload cleaning, BO rules, CI gates, and startup protocols.',
      zh: '复杂 AI-built 产品不能靠记忆维护。它需要 route facts、env helpers、Firestore payload 清理、BO 规则、CI 闸门和启动协议。',
    },
  },
  {
    title: { en: 'Content philosophy', zh: '内容哲学' },
    copy: {
      en: 'Content should answer real questions with source-informed boundaries. It should be useful to users, Google, and AI answers without pretending every place was personally visited.',
      zh: '内容要带着事实边界回答真实问题。它要同时对用户、Google、AI answer 有用，但不假装每个地点都亲访过。',
    },
  },
];

const filmGalleryPhotos = [
  {
    src: '/film-gallery/film-gallery-1.png',
    alt: {
      en: 'Film photograph of a street receding into soft depth, everyday scale',
      zh: '胶片街景，景深将路面与街景分成柔和层次',
    },
    caption: {
      en: 'A quiet street read in layers: a soft near plane, honest everyday scale, no staging.',
      zh: '用景深把街面读成层次：前景柔和，日常尺度，非摆拍场面。',
    },
  },
  {
    src: '/film-gallery/film-gallery-2.png',
    alt: { en: 'Hazy city skyline on film, layered grays and blues', zh: '胶片中的城市天际线，灰蓝层次' },
    caption: {
      en: 'Humid air over the city—haze and distance rendered as believable, restrained tones.',
      zh: '城市上空的湿气与距离，被胶片压成克制、可信的灰与蓝。',
    },
  },
  {
    src: '/film-gallery/film-gallery-3.png',
    alt: { en: 'Tall building on film, glass catching a sliver of light', zh: '高塔与玻璃上一道细光' },
    caption: {
      en: 'A vertical study: weight, edge, and a thin strip of light along glass.',
      zh: '竖向的体量与边线，玻璃上的一条薄光把材质说清楚。',
    },
  },
  {
    src: '/film-gallery/film-gallery-4.png',
    alt: { en: 'Calm waterfront, soft highlights on open water', zh: '平静水面与细碎高光' },
    caption: {
      en: 'Open water, small speculars, and a horizon line that gives the eye a place to rest.',
      zh: '开阔水面、细碎高光，与一条让视线能落稳的水平线。',
    },
  },
  {
    src: '/film-gallery/film-gallery-5.png',
    alt: { en: 'Film frame with a gentle light leak along the edge of the scene', zh: '画缘一道柔和的漏光' },
    caption: {
      en: 'A light leak that reads like a mark of process—kept, not “fixed out.”',
      zh: '漏光像流程留下的签名：保留，而不是当成失误修掉。',
    },
  },
  {
    src: '/film-gallery/film-gallery-6.png',
    alt: { en: 'Ornate temple details softened by emulsion grain', zh: '庙宇细部在颗粒中变得可信' },
    caption: {
      en: 'Carving and shadow held in grain: detail that would go plastic if over-sharpened.',
      zh: '雕刻与阴影像嵌在乳剂里，过度锐化才会显“塑料”。',
    },
  },
  {
    src: '/film-gallery/film-gallery-7.png',
    alt: { en: 'Mountain haze, long tonal gradients in the distance', zh: '远山与漫开的空气感' },
    caption: {
      en: 'Atmosphere over drama—distance carried by long, quiet tonal ramps.',
      zh: '不追求戏剧性，靠长调子把远距托成可感的空气。',
    },
  },
  {
    src: '/film-gallery/film-gallery-8.png',
    alt: { en: 'Coastal view of a city, modest color separation on film', zh: '海岸线上的城市，色彩关系克制' },
    caption: {
      en: 'A coastal read of the city, color kept modest and believable in mixed light.',
      zh: '混合光里读海岸城市，色彩不抢戏，但站得住。',
    },
  },
  {
    src: '/film-gallery/film-gallery-9.png',
    alt: { en: 'Open horizon where sea and sky meet under heavy clouds', zh: '重云下海天相接的开阔线' },
    caption: {
      en: 'A simple split between water and weather—room left for the eye to move.',
      zh: '水与天的交界故意留到最简，好让视线有路可走。',
    },
  },
  {
    src: '/film-gallery/film-gallery-10.png',
    alt: { en: 'Geometric city scene, bicycle as a clear visual anchor', zh: '城市几何，单车作视觉锚点' },
    caption: {
      en: 'Geometry in the block: a wheel, a line, a center that orders the rest of the frame.',
      zh: '街区里的几何：一轮、一线，用清晰的重心把余下元素收住。',
    },
  },
  {
    src: '/film-gallery/film-gallery-11.png',
    alt: { en: 'Candid people by the sea, unposed', zh: '水边未加导演的日常一瞬' },
    caption: {
      en: 'A candid exchange at the water’s edge—ordinary, and meant to stay that way.',
      zh: '水边的寻常交谈，刻意保留不必“升格”的平凡。',
    },
  },
  {
    src: '/film-gallery/film-gallery-12.jpg',
    alt: { en: 'Cargo ship crossing calm water beneath a wide cloudy sky', zh: '货船驶过平静水面，城市与云层铺在远方' },
    caption: {
      en: 'A small vessel under an enormous sky, with the city held quietly along the horizon.',
      zh: '一艘小船压在辽阔云层之下，城市安静地停在水平线上。',
    },
  },
  {
    src: '/film-gallery/film-gallery-13.jpg',
    alt: { en: 'Candid portrait in a warmly lit restaurant', zh: '暖色餐馆里戴墨镜男子的抓拍肖像' },
    caption: {
      en: 'A candid portrait held by warm light, shadow, and the grain of an evening indoors.',
      zh: '暖光、阴影与夜里的颗粒，共同托住一张没有摆拍感的肖像。',
    },
  },
  {
    src: '/film-gallery/film-gallery-14.jpg',
    alt: { en: 'Dim temple altar illuminated by red lanterns and candles', zh: '红灯与烛光照亮幽暗的庙宇内殿' },
    caption: {
      en: 'An interior carried by low light: red lamps, carved surfaces, and pools of reflection.',
      zh: '低光里的内殿，由红灯、雕刻与一小片反光慢慢显形。',
    },
  },
  {
    src: '/film-gallery/film-gallery-15.jpg',
    alt: { en: 'Ornate temple roofline crowned by twin dragon sculptures', zh: '双龙雕塑立于色彩鲜明的庙宇屋脊' },
    caption: {
      en: 'Twin dragons and a crowded roofline cut cleanly against an open pale sky.',
      zh: '双龙与密集屋脊切在清淡天空上，繁复却保持清楚。',
    },
  },
];

const filmGalleryCameras = [
  {
    name: 'Konica Auto S2',
    frameNumbers: [1, 2, 6, 7, 8, 9, 10, 11],
  },
  { name: 'Rolleiflex Old Standard (Model 621)', frameNumbers: [3, 4, 5] },
  { name: 'Zeiss Ikon Contessa 35', frameNumbers: [12, 13, 14, 15] },
];

const filmGalleryStocks = [
  { name: 'Kodak Gold 200', frameNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
  { name: 'Kodak Gold 400', frameNumbers: [14, 15] },
];

const filmGalleryFrames = filmGalleryPhotos
  .map((photo, index) => ({ photo, frameNumber: index + 1 }))
  .reverse();

type AiProjectSystem = {
  eyebrow: Record<Language, string>;
  title: string;
  status: Record<Language, string>;
  role: Record<Language, string>;
  summary: Record<Language, string>;
  system: Record<Language, string>;
  href: string;
  external?: string;
};

const aiProjectSystems: AiProjectSystem[] = [
  {
    eyebrow: { en: 'Main Build', zh: '主构建' },
    title: 'Jiju',
    status: { en: 'Building', zh: '构建中' },
    role: { en: 'Pet-friendly discovery system', zh: '宠物友好发现系统' },
    summary: {
      en: 'A pet-friendly discovery platform starting in Penang. Get the place data, the “where we went” memories, and a small map you can actually trust right first — worry about expanding later.',
      zh: '从槟城起步的宠物友好发现平台。先把地点资料、出门的记忆、还有一张靠得住的小地图做好——扩张的事以后再说。',
    },
    system: {
      en: 'Discovery logic, place data, pet-parent memory loop, mobile UX, growth narrative.',
      zh: '发现逻辑、地点资料、养宠出门记忆回路、移动端体验和增长叙事。',
    },
    href: 'jiju',
    external: 'https://jiju.pet',
  },
  {
    eyebrow: { en: 'Game System', zh: '游戏系统' },
    title: 'Friday Poker Club',
    status: { en: 'Prototype', zh: '原型中' },
    role: { en: 'Browser table host', zh: '浏览器牌桌主机' },
    summary: {
      en: 'A browser Hold’em table for private games — room codes, invite links, blinds, buy-ins, a shared pot, and table voice if you want it.',
      zh: '给熟人桌用的浏览器德州牌桌——房间口令、邀请链接、盲注、买入、共享底池，想开语音就开。',
    },
    system: {
      en: 'Realtime sync, room state, clear action UI, host overhead reduction, game-flow structure.',
      zh: '实时同步、房间状态、清楚行动 UI、降低主持人解释成本和游戏流程结构。',
    },
    href: 'poker',
    external: 'https://poker.edentan.site/',
  },
  {
    eyebrow: { en: 'AI Build System', zh: 'AI 构建系统' },
    title: 'ETReportHub',
    status: { en: 'Active build', zh: '构建中' },
    role: { en: 'Daily Report OS', zh: '日报数据系统' },
    summary: {
      en: 'A daily-report data system for iGaming operators and aggregators. It turns Excel, members, channels, trends, brand comparison, and CRM export into one reviewable dashboard.',
      zh: '给 iGaming operator / aggregator 的日报数据系统。把 Excel、会员、渠道、趋势、品牌对比和 CRM export 放进同一个可复盘的 dashboard。',
    },
    system: {
      en: 'Transaction + Customer Excel, SQLite / IndexedDB, Performance / Members / Channels / Trends, CRM export, Wide Excel, System Guide.',
      zh: 'Transaction + Customer Excel、SQLite / IndexedDB、Performance / Members / Channels / Trends、CRM export、Wide Excel、System Guide。',
    },
    href: 'etreporthub',
  },
];

const aiProjectSharedLogic = [
  {
    title: { en: 'Messy input', zh: '一团乱的输入' },
    copy: {
      en: 'Raw behavior, Excel dumps, place data, game rooms, user journeys, and whatever ops scribbled down.',
      zh: '原始行为、Excel 导出、地点资料、游戏房间、用户路径，还有运营随手记的那些。',
    },
  },
  {
    title: { en: 'System layer', zh: '系统层' },
    copy: {
      en: 'Rules, data models, UI states, workflows, cache boundaries — the repeatable logic sitting underneath.',
      zh: '规则、数据模型、UI 状态、工作流、缓存边界——底下那套能反复用的逻辑。',
    },
  },
  {
    title: { en: 'Useful output', zh: '能用的输出' },
    copy: {
      en: 'Dashboards, discovery maps, action queues, build notes, and decisions you can actually go back and review.',
      zh: '仪表盘、发现地图、行动队列、构建记录，还有真的能回头复盘的判断。',
    },
  },
] as const;

const etReportHubValueProps = [
  {
    title: { en: 'Excel chaos becomes one source of truth', zh: 'Excel 混乱变成单一事实层' },
    copy: {
      en: 'Transaction and Customer exports are ingested, normalized, and kept under clear import rules instead of being copied across fragile spreadsheets.',
      zh: 'Transaction 与 Customer 导出会被导入、标准化，并按清楚规则保存，不再靠脆弱的 Excel 来回复制。',
    },
  },
  {
    title: { en: 'Operators see what changed', zh: '运营看得出发生了什么' },
    copy: {
      en: 'Performance, members, channels, trends, and brand comparison views turn daily reporting into decisions instead of manual checking.',
      zh: 'Performance、Members、Channels、Trends 和品牌对比，把日常报表从手动检查变成可判断的视图。',
    },
  },
  {
    title: { en: 'CRM becomes the next action layer', zh: 'CRM 变成下一步行动层' },
    copy: {
      en: 'Member segments, risk signals, retention buckets, and CRM export prepare the system for follow-up workflows.',
      zh: '会员分群、风险信号、留存区间和 CRM export，让系统能继续接上后续跟进工作流。',
    },
  },
] as const;

const etReportHubModules = [
  {
    title: 'Data Ingest',
    copy: {
      en: 'Upload Transaction and Customer Excel files, detect import type, validate quirks, and preserve customer export history without double-counting lifetime totals.',
      zh: '上传 Transaction 与 Customer Excel，识别导入类型，处理资料怪异点，并保留 Customer export 历史，避免 lifetime totals 被重复相加。',
    },
  },
  {
    title: 'Performance',
    copy: {
      en: 'Daily, weekly, and overall performance views with deposit, withdraw, net deposit, transaction count, and comparison mode.',
      zh: '每日、每周、整体业绩视图，包含 deposit、withdraw、net deposit、交易次数和对比模式。',
    },
  },
  {
    title: 'Members',
    copy: {
      en: 'Member lifetime KPIs, recency buckets, retention thresholds, risk rules, segment analysis, and CRM-ready export.',
      zh: '会员 lifetime KPI、活跃区间、留存阈值、风险规则、分群分析和可用于 CRM 的导出。',
    },
  },
  {
    title: 'Channels',
    copy: {
      en: 'Referrer-to-channel mapping, unknown referrer handling, channel comparison, and trend charts for acquisition quality.',
      zh: 'Referrer 到渠道映射、未知 referrer 处理、渠道对比和 acquisition quality 趋势图。',
    },
  },
  {
    title: 'Trends',
    copy: {
      en: 'Trend buckets from transaction data and customer snapshots, including active members, net movement, and compact date labels.',
      zh: '基于交易数据和 customer snapshots 的趋势区间，包含活跃会员、净变化和更清楚的日期标签。',
    },
  },
  {
    title: 'System Guide',
    copy: {
      en: 'A built-in operating manual explaining data flow, formulas, conversion logic, dashboard rules, and brand/product guide.',
      zh: '内置系统说明，解释数据流、公式、转换逻辑、dashboard 规则和品牌 / 产品规范。',
    },
  },
] as const;

const etReportHubSkillProof = [
  {
    title: { en: 'Data architecture', zh: '数据架构' },
    copy: {
      en: 'The SQLite tables, import rules, brand scoping, and snapshot logic are all built around how messy the real exports actually are — not around some clean demo file.',
      zh: 'SQLite 表、导入规则、品牌隔离、snapshot 逻辑，全是照着真实导出有多乱来设计的——不是对着一份干净的 demo 文件做的。',
    },
  },
  {
    title: { en: 'Product thinking', zh: '产品思考' },
    copy: {
      en: 'Daily / Weekly / Overall were three pages quietly doing the same job, so I folded them into one Performance page — and kept the old links alive so nobody got lost.',
      zh: 'Daily / Weekly / Overall 三个页面其实在干同一件事，干脆收成一个 Performance 页——旧导航还留着能用，免得有人找不到路。',
    },
  },
  {
    title: { en: 'UX for operators', zh: '运营 UX' },
    copy: {
      en: 'Then all the stuff operators actually ask for: diagnostics, date filters, chart switches, sortable tables, and feedback that doesn’t flash at people who hate motion.',
      zh: '然后是运营真正会要的那些东西：diagnostics、日期筛选、图表切换、可排序表格，还有照顾怕闪的人的 reduced-motion 反馈。',
    },
  },
  {
    title: { en: 'Performance engineering', zh: '性能工程' },
    copy: {
      en: 'When it got heavy I added a derived-data cache, made it refresh only the block that changed, and built a Docker/backend mode for the bigger workflows. Nothing grinds.',
      zh: '数据一多就加了 derived-data cache、只刷新有变动的那一块，还有给大工作流用的 Docker/backend mode。不卡。',
    },
  },
] as const;

const etReportHubAudience = [
  {
    title: { en: 'Operators', zh: 'Operators' },
    copy: { en: 'Need daily KPI clarity without rebuilding the same Excel report manually.', zh: '需要每天看清 KPI，但不想一直手动重做同一份 Excel。' },
  },
  {
    title: { en: 'Aggregators', zh: 'Aggregators' },
    copy: { en: 'Need multi-brand views, channel quality, member analysis, and exportable operating data.', zh: '需要多品牌视图、渠道质量、会员分析和可导出的运营数据。' },
  },
  {
    title: { en: 'Growth teams', zh: 'Growth teams' },
    copy: { en: 'Need to connect reporting, retention, CRM segmentation, and follow-up actions.', zh: '需要把报表、留存、CRM 分群和后续跟进行动接起来。' },
  },
] as const;

const etReportHubFaq = [
  {
    q: { en: 'Is this only a dashboard?', zh: '这只是 dashboard 吗？' },
    a: {
      en: 'No. The dashboard is the visible layer. The product also includes import rules, normalized storage, cache strategy, diagnostics, export logic, and a system guide.',
      zh: '不是。Dashboard 只是可见层。产品还包含导入规则、标准化存储、缓存策略、诊断、导出逻辑和系统说明。',
    },
  },
  {
    q: { en: 'Can it work without a heavy backend?', zh: '没有重 backend 可以跑吗？' },
    a: {
      en: 'Yes. The current system supports browser-side IndexedDB/sql.js and an optional local Python backend for Docker uploads, cache refresh, and wide Excel export.',
      zh: '可以。当前系统支持浏览器端 IndexedDB/sql.js，也支持可选本地 Python backend，用于 Docker 上传、cache refresh 和宽表 Excel 导出。',
    },
  },
  {
    q: { en: 'Where does AI fit?', zh: 'AI 放在哪里？' },
    a: {
      en: 'AI fits best after the data layer is stable: report explanation, anomaly review, CRM next-action suggestions, and operator workflow assistance.',
      zh: 'AI 最适合接在稳定数据层之后：报表解释、异常复盘、CRM 下一步建议和运营工作流辅助。',
    },
  },
] as const;

const etReportHubBuyerPain = [
  {
    title: { en: 'Daily reporting takes too many hands', zh: '日报太依赖人工' },
    copy: {
      en: 'Every day someone downloads files, checks formulas, compares brands, and explains the same numbers again. The work repeats, but the system does not improve.',
      zh: '每天都有人下载文件、检查公式、对比品牌、解释同样的数字。工作一直重复，但系统没有变聪明。',
    },
  },
  {
    title: { en: 'Excel becomes the hidden risk', zh: 'Excel 变成隐藏风险' },
    copy: {
      en: 'One wrong paste, one missing filter, one duplicated customer total, and the team may make decisions from a broken report.',
      zh: '一次贴错、一个筛选漏掉、一个会员总数重复，团队就可能根据错误报表做判断。',
    },
  },
  {
    title: { en: 'CRM cannot move without clean data', zh: 'CRM 没有干净数据就跑不动' },
    copy: {
      en: 'Retention, segmentation, risk review, and follow-up actions need a trusted data layer before AI or CRM workflows can help.',
      zh: '留存、分群、风险复盘和跟进行动，都需要可信的数据层。没有这层，AI 或 CRM 只会放大混乱。',
    },
  },
] as const;

const etReportHubSalesOutcomes = [
  {
    label: { en: 'Decision speed', zh: '判断更快' },
    metric: { en: 'Same-day clarity', zh: '当天看清楚' },
    copy: {
      en: 'Operators can see performance, members, channels, trends, and brand comparison without rebuilding the report from scratch.',
      zh: '运营不需要从零重做报表，就能看 Performance、Members、Channels、Trends 和品牌对比。',
    },
  },
  {
    label: { en: 'Data trust', zh: '数据更可信' },
    metric: { en: 'One operating layer', zh: '一层事实来源' },
    copy: {
      en: 'Transaction and Customer files are imported under rules, normalized, reviewed, and kept ready for export.',
      zh: 'Transaction 与 Customer 文件按规则导入、标准化、复盘，并保持可导出状态。',
    },
  },
  {
    label: { en: 'CRM readiness', zh: '可接 CRM' },
    metric: { en: 'Next action ready', zh: '下一步可行动' },
    copy: {
      en: 'The system prepares member segments, retention signals, risk buckets, and exports for follow-up workflows.',
      zh: '系统准备会员分群、留存信号、风险区间和导出资料，让后续跟进有基础。',
    },
  },
] as const;

const etReportHubSalesDeliverables = [
  {
    title: { en: 'Data import system', zh: '数据导入系统' },
    copy: {
      en: 'Transaction and Customer Excel ingest with validation rules, import history, brand scope, and cleaner storage.',
      zh: 'Transaction 与 Customer Excel 导入，包含验证规则、导入历史、品牌范围和更干净的储存层。',
    },
  },
  {
    title: { en: 'Operator dashboard', zh: '运营仪表盘' },
    copy: {
      en: 'Performance, Members, Channels, Trends, Compare Brands, diagnostics, and export-friendly report views.',
      zh: 'Performance、Members、Channels、Trends、Compare Brands、诊断和可导出的报表视图。',
    },
  },
  {
    title: { en: 'CRM-ready export layer', zh: 'CRM-ready 导出层' },
    copy: {
      en: 'Member segments, activity buckets, retention signals, and export structures that can feed later CRM workflows.',
      zh: '会员分群、活跃区间、留存信号和可接后续 CRM 工作流的导出结构。',
    },
  },
  {
    title: { en: 'System guide and handover', zh: '系统说明与交接' },
    copy: {
      en: 'A practical guide explaining data flow, formulas, conversion rules, dashboard logic, and operating limits.',
      zh: '实用说明文件，解释数据流、公式、转换规则、dashboard 逻辑和系统边界。',
    },
  },
] as const;

const etReportHubSalesProofStats = [
  {
    value: { en: '2-4 hrs/day', zh: '2-4 小时/天' },
    label: {
      en: 'Typical manual Excel reporting time that can be compressed.',
      zh: '常见 Excel 整理时间可被压缩。',
    },
  },
  {
    value: { en: '1 upload', zh: '1 次上传' },
    label: {
      en: 'Refresh daily, weekly, member, channel, and trend reports.',
      zh: '自动更新日报、周报、会员、渠道与趋势。',
    },
  },
  {
    value: { en: 'Private deployment', zh: '私有部署' },
    label: {
      en: 'Customer data can stay in the customer environment.',
      zh: '客户数据可保存在自己的系统环境。',
    },
  },
] as const;

const etReportHubSavingsRows = [
  {
    problem: { en: 'Manual daily handling of Transaction and Customer Excel', zh: '每天手工整理 Transaction 和 Customer Excel' },
    solution: { en: 'Automatic normalization, deduplication, and daily/weekly/overall reporting', zh: '上传后自动标准化、去重、生成日报/周报/总报表' },
    improvement: { en: 'Save 2-4 hours/day and reduce human errors', zh: '省 2-4 小时/天，减少人为错算' },
  },
  {
    problem: { en: 'No clear list of registered members who have not deposited', zh: '不知道哪些会员注册了但还没存款' },
    solution: { en: 'Non-conversion member filter + CRM export', zh: 'Non-conversion member filter + CRM export' },
    improvement: { en: 'Give CRM a clear daily follow-up list', zh: '让 CRM 每天有明确跟进名单' },
  },
  {
    problem: { en: 'Bonus is given, but over-giving is hard to spot', zh: 'Bonus 给出去，但不知道有没有过量' },
    solution: { en: 'Track Bonus Total, Bonus Ratio, Margin, Win Loss, and withdrawal risk', zh: '看 Bonus Total、Bonus Ratio、Margin、Win Loss、提款风险' },
    improvement: { en: 'Reduce promotion budget leakage', zh: '减少促销预算浪费' },
  },
  {
    problem: { en: 'Channels are judged only by registration count', zh: '渠道只看注册数，不知道质量' },
    solution: { en: 'Channel Analysis shows deposit, withdrawal, net, bonus, and conversion', zh: 'Channel Analysis 看存款、提款、净存款、Bonus、转化率' },
    improvement: { en: 'Move budget toward higher-quality channels', zh: '把预算集中到有质量的渠道' },
  },
  {
    problem: { en: 'Management asks for numbers and the team re-pulls Excel', zh: '老板临时问数据，团队要重新拉 Excel' },
    solution: { en: 'Performance, Member, Trend, and Brand Comparison are in one dashboard', zh: 'Performance、Member、Trend、Brand Comparison 都在 Dashboard' },
    improvement: { en: 'Faster review and less report waiting time', zh: '管理层复盘更快，少等报表' },
  },
  {
    problem: { en: 'Browser cleanup or device changes can break reporting history', zh: '清浏览器或换电脑怕数据不见' },
    solution: { en: 'Server daily_report.db, backup download, restore, and audit log', zh: '服务器 daily_report.db、备份下载、恢复、audit log' },
    improvement: { en: 'Lower data loss and operation risk', zh: '降低数据丢失和操作风险' },
  },
] as const;

const etReportHubIncludedRows = [
  {
    module: 'Data Ingest',
    included: { en: 'Transaction Excel, Customer Excel, brand selection, and Customer snapshot date.', zh: 'Transaction Excel、Customer Excel、品牌选择、Customer 快照日期。' },
    angle: { en: 'You just upload the file and you’re done. No more rebuilding a whole Excel from scratch every morning.', zh: '每天就上传一下，完事。不用再从头拼一整份 Excel。' },
  },
  {
    module: 'Normalize & SQLite',
    included: { en: 'Deduplication, field normalization, Bank Detail JSON conversion, daily_report.db.', zh: '去重、标准化字段、Bank Detail JSON 转换、daily_report.db。' },
    angle: { en: 'All those messy Excel files turn into one database you can actually search whenever.', zh: '一堆乱七八糟的 Excel，变成一个想查就查的数据库。' },
  },
  {
    module: 'Performance Report',
    included: { en: 'Daily, Weekly, Overall, deposit, withdrawal, net deposit, and transaction details.', zh: 'Daily、Weekly、Overall、存款、提款、净存款、交易明细。' },
    angle: { en: 'Boss asks for the numbers? They’re already there. Nobody scrambles to pull a spreadsheet.', zh: '老板临时问业绩，打开就有，不用让人手忙脚乱重拉数据。' },
  },
  {
    module: 'Member Analysis',
    included: { en: 'Lifetime deposit, withdrawal, bonus, LTV, last login, last deposit, and risk level.', zh: '累计存款、提款、Bonus、LTV、最近登录、最近存款、风险等级。' },
    angle: { en: 'You can see where every member stands — who’s worth chasing and who to leave for now.', zh: '每个会员什么状态一目了然，谁该跟、谁先放着，清清楚楚。' },
  },
  {
    module: 'CRM Export',
    included: { en: 'Non-conversion members, filters, search, User ID, Name, and Phone export.', zh: 'Non-conversion member、筛选、搜索、User ID、Name、Phone 导出。' },
    angle: { en: 'Your CRM team gets a ready-made list every day instead of guessing who to call.', zh: 'CRM 每天有现成名单可以打，不用靠感觉乱找人。' },
  },
  {
    module: 'Bonus Control',
    included: { en: 'Bonus Total, Bonus Ratio, Margin, Win Loss, and withdrawal risk.', zh: 'Bonus Total、Bonus Ratio、Margin、Win Loss、提款风险。' },
    angle: { en: 'See at a glance if you’re handing out too much bonus — basically whether money’s leaking.', zh: '一眼看出 bonus 是不是发太多了，钱有没有白送出去。' },
  },
  {
    module: 'Channel Analysis',
    included: { en: 'Referrer / Channel conversion, deposit, withdrawal, bonus, and net result.', zh: 'Referrer / Channel 转化、存款、提款、Bonus、净结果。' },
    angle: { en: 'Stop judging channels by sign-up count. See which ones actually bring real money in.', zh: '别只看注册多少，看出哪个渠道是真带钱进来的。' },
  },
  {
    module: 'Trend Analysis',
    included: { en: 'Daily, weekly, monthly trends, active members, amount movement, and retention signals.', zh: '日/周/月趋势、活跃会员、金额走势、留存观察。' },
    angle: { en: 'You see where things are heading, not just today’s one-day number.', zh: '看的是走势往哪走，不是盯着今天这一天的数字瞎激动。' },
  },
  {
    module: 'Brand Comparison',
    included: { en: 'Multi-brand comparison, metric selection, and timeline trends.', zh: '多品牌对比、指标选择、时间线趋势。' },
    angle: { en: 'Running a few brands or sites? Line them up side by side and spot which one’s dragging.', zh: '手上有好几个品牌/站点的话，摆一起一比，就知道哪个在拖后腿。' },
  },
  {
    module: 'Segment Analysis',
    included: { en: 'Member segments, behavior buckets, deposit/login recency, and action groups.', zh: '会员分群、行为 bucket、存款 / 登录 recency 和可行动人群。' },
    angle: { en: 'Slices your members into groups you can actually act on — ops and CRM just grab and go.', zh: '把一堆会员拆成一组组能直接动手的人群，运营和 CRM 拿了就能用。' },
  },
  {
    module: 'Wide Excel Export',
    included: { en: 'Export familiar wide-format Excel reports for teams that still need spreadsheet handoff.', zh: '导出客户熟悉的宽表格式，方便继续用 Excel 交接。' },
    angle: { en: 'Team still loves Excel? Fine — it exports the wide format they know, minus the manual assembly.', zh: '团队还想用 Excel？照样导给你，只是不用再手工拼了。' },
  },
  {
    module: 'Database Backup',
    included: { en: 'Download/restore daily_report.db, pre-restore backup, and cache refresh.', zh: '下载 / 恢复 daily_report.db、恢复前备份和缓存刷新。' },
    angle: { en: 'Clear your browser or switch laptops — the data’s still there, nothing vanishes overnight.', zh: '清个浏览器、换台电脑，数据照样在，不会一夜回到解放前。' },
  },
  {
    module: 'User Permission',
    included: { en: 'Users, roles, permissions, upload/export/settings limits.', zh: '用户、角色、权限、上传 / 导出 / 设置限制。' },
    angle: { en: 'You decide who can look, edit, upload, or export. No free-for-all.', zh: '谁能看、谁能改、谁能导出，老板说了算，不怕乱。' },
  },
  {
    module: 'Audit Log',
    included: { en: 'Login, upload, restore, and user action records.', zh: '登录、上传、恢复和用户操作记录。' },
    angle: { en: 'Something breaks? Check the log — no more going around asking “did you touch this?”', zh: '出事了能翻记录查，不用一个个问「是不是你动的」。' },
  },
  {
    module: 'Private Deployment',
    included: { en: 'Customer server, Docker, domain, and license options.', zh: '客户自己的 server / Docker / domain / license 选项。' },
    angle: { en: 'Your data sits on your own machine — not parked in some public SaaS.', zh: '数据放你自己机器上，不用交给什么公开 SaaS 保管。' },
  },
  {
    module: 'Training & Handover',
    included: { en: 'English/Chinese guides, FAQ, and handover checklist.', zh: '中英文操作文档、FAQ 和 handover checklist。' },
    angle: { en: 'We don’t just hand it over and disappear — your team actually learns to run it daily.', zh: '交付完不是丢给你自己摸，是带到团队真的会每天用为止。' },
  },
] as const;

const etReportHubRoiCards = [
  { label: { en: 'Monthly labor cost saved', zh: '每月节省人工成本' }, value: 'RM1,625' },
  { label: { en: 'Monthly estimated impact', zh: '每月可改善金额' }, value: 'RM2,725' },
  { label: { en: 'One-time launch package', zh: '一次性上线套餐' }, value: 'RM4,890' },
  { label: { en: '3-month net impact estimate', zh: '3 个月净影响估算' }, value: 'RM3,285' },
  { label: { en: 'Estimated payback', zh: '估算回本时间' }, value: { en: 'About 1.8 months', zh: '约 1.8 个月' } },
] as const;

const etReportHubPricing = [
  {
    name: { en: 'Launch Package', zh: '上线套餐' },
    price: 'RM4,890',
    suffix: { en: ' one-time', zh: ' 一次性' },
    bestFor: {
      en: 'Best for teams that already have stable Transaction / Customer exports and want a working daily-report system deployed quickly.',
      zh: '适合已经有稳定 Transaction / Customer 导出、想尽快上线一套日报系统的团队。',
    },
    points: {
      en: ['Private deployment, basic training, and daily reporting workflow', 'Transaction and Customer Excel import, dashboard, CRM-ready export, and handover guide', 'Optional maintenance, upgrades, and support can be quoted separately'],
      zh: ['包含私有部署、基础培训和日常报表流程', '包含 Transaction / Customer Excel 导入、dashboard、CRM-ready 导出和交接说明', '后续维护、升级和 support 可另外报价'],
    },
  },
] as const;

const etReportHubSalesFaq = [
  {
    q: { en: 'Why buy this instead of keeping Excel?', zh: '为什么不继续用 Excel？' },
    a: {
      en: 'Excel is fine for checking one file. It becomes expensive when the team needs repeatable imports, member logic, brand comparison, CRM export, and daily decision history.',
      zh: 'Excel 适合看单个文件。但当团队需要重复导入、会员逻辑、品牌对比、CRM 导出和每日判断记录时，它的隐藏成本会越来越高。',
    },
  },
  {
    q: { en: 'What does RM4,890 include?', zh: 'RM4,890 包含什么？' },
    a: {
      en: 'It covers the launch package: practical deployment, basic training, daily reporting workflow, and handover. Ongoing support boundaries can be quoted separately based on data volume, hosting, and team process.',
      zh: '它包含上线套餐：实际部署、基础培训、日常报表流程和交接。持续 support 边界可根据数据量、hosting 和团队流程另外报价。',
    },
  },
  {
    q: { en: 'Who should not buy it yet?', zh: '什么团队暂时不适合买？' },
    a: {
      en: 'If reporting is still casual, data exports are inconsistent, or the team does not review daily numbers, start by fixing the reporting habit first.',
      zh: '如果报表还很随意、导出格式不稳定，或团队本身不看每日数字，应该先整理报表习惯，再上系统。',
    },
  },
] as const;

const pokerValueProps = [
  {
    title: { en: 'It lives in a link', zh: '一条链接就是一张桌' },
    copy: {
      en: 'Open a table in the browser, drop the link in the group chat, and we’re playing tonight. No app to install, no account to create, none of that.',
      zh: '浏览器开桌，把链接丢进群里，今晚就开打。不用下载、不用注册，没有那一堆「先创建账号」的步骤。',
    },
  },
  {
    title: { en: 'Nobody online? The bots got you', zh: '没人在线？Bot 陪你' },
    copy: {
      en: 'A solo table starts full — three bots already sitting there, ready to lose to you. Or not. Great for killing time, or “practicing.”',
      zh: '单人桌直接满座，三个 Bot 已经坐好，等着输给你。或者不输。打发时间，或者假装自己在「练牌」。',
    },
  },
  {
    title: { en: 'Mic on, it’s a real table', zh: '开麦，它就是张真桌' },
    copy: {
      en: 'Turn on table voice and it stops being a quiet web page. Same trash talk as sitting around the actual table — just without the drive home.',
      zh: '打开同桌语音，它就不再是个安静的网页。还是那些垃圾话，跟真的围着桌子坐一样——只是不用开车回家。',
    },
  },
] as const;

const pokerModules = [
  {
    title: 'Real Hold’em',
    copy: {
      en: 'The whole hand: blinds, flop-turn-river, the pot, and a showdown that lights up your best five. It’s the actual game, not a toy.',
      zh: '完整的一手：盲注、翻牌转牌河牌、底池，摊牌时帮你把最大的五张点亮。是真的牌，不是玩具。',
    },
  },
  {
    title: 'Bots on tap',
    copy: {
      en: 'Solo room, three bots already seated (Alpha, Dealer, Shark). One tap and you’re in a hand. No waiting around.',
      zh: '单人房，三个 Bot 已经坐好（Alpha、Dealer、Shark）。一点就进局，不用干等。',
    },
  },
  {
    title: 'Open a public table',
    copy: {
      en: 'Spin up a room, share the link, and the host taps Start once the crew shows up. Then it’s just us.',
      zh: '开个公开房，把链接发出去，人到齐了房主点「开始」。然后就是我们自己人。',
    },
  },
  {
    title: 'The 8/9 side game',
    copy: {
      en: 'A little side bet riding next to the main hand — two extra cards chasing 8 or 9. Pure chaos, pure fun.',
      zh: '正局旁边挂着的小边注——多发两张牌，去凑 8 或 9。纯混乱，纯好玩。',
    },
  },
] as const;

const pokerAvatarGroupIntro = {
  en: 'This is not just a poker table. It is a strange crew of gamblers, leaders, protectors, kings, drifters, and walking system bugs. Some bring calculation. Some bring chaos. Some bring loyalty. Some bring luck. Some bring trouble for no reason. Alone, they are just players. Together, they become a story.',
  zh: '这不只是一张 poker table。这是一群很奇怪的人组成的江湖局。有赌徒，有老大，有守护者，有王者，有浪人，也有会走路的系统漏洞。有人带来计算，有人带来混乱，有人带来义气，有人带来好运，也有人什么都没做就带来麻烦。单独看，他们只是玩家。坐在一起，他们就变成一场故事。',
} as const;

const pokerAvatarGuide = [
  {
    id: 'jf',
    code: { en: 'The Covered King', zh: '被罩住的王' },
    phrase: { en: 'Backed by luck, protected by fate', zh: '输有靠山，命有后路' },
    tags: { en: 'Protected Gambler / Risk Taker / Lucky Survivor / Confidence Player', zh: '受保护的赌徒 / 风险玩家 / 幸运生还者 / 自信型玩家' },
    intro: {
      en: 'He is not always the most dangerous player at the table, but he plays with a strange kind of confidence. Even when the game turns against him, he never looks completely defeated. There is always a feeling that someone, somewhere, somehow, will help him recover. He is the type who dares to move forward because deep inside, he believes he will not fall alone.',
      zh: '他不一定是牌桌上最危险的人，但他身上有一种很奇怪的安全感。就算局势对他不利，他也不会真的像完全被打垮。你总会感觉，他背后好像还有一条路，还有一个机会，还有某种力量会把他拉回来。他是那种敢往前冲的人，因为他心里相信，自己不会真的一个人倒下。',
    },
  },
  {
    id: 'ph',
    code: { en: 'Cover Bee', zh: '补锅蜂后' },
    phrase: { en: 'Covers the loss, controls the game', zh: '补得了局，控得住场' },
    tags: { en: 'Problem Solver / Silent Controller / Strategic Mind / Support Queen', zh: '问题解决者 / 静默控场者 / 策略型头脑 / 支援女王' },
    intro: {
      en: 'Cover Bee is not just a nickname. It is a whole personality. She is sharp, calm, and naturally good at handling problems. When others panic, she calculates. When others fall into chaos, she cleans up the mess. She does not need to be the loudest person in the room. Her power comes from control, timing, and knowing exactly when to step in.',
      zh: 'Cover Bee 不只是一个外号，而是一种人格。她聪明、冷静，很会处理问题。别人慌的时候，她在算。别人乱的时候，她在收拾局面。她不需要成为房间里最大声的人，因为她的力量不在声音，而在控制力、时机感，以及知道什么时候该出手。',
    },
  },
  {
    id: 'zm',
    code: { en: 'Blackbeard', zh: '黑胡子团长' },
    phrase: { en: 'Loyal heart, iron table presence', zh: '义字当头，镇场如山' },
    tags: { en: 'Group Leader / Loyal Captain / Table Authority / Justice Energy', zh: '团队领袖 / 义气船长 / 牌桌权威 / 正气能量' },
    intro: {
      en: 'Blackbeard is the kind of person who naturally becomes the center of the group. He does not need to force respect. His presence already carries weight. He has loyalty, justice, and the kind of old-school energy that makes people feel the table is under control. When he is around, the game feels less like a random poker night and more like a crew gathered under one captain.',
      zh: 'Blackbeard 是那种很自然会变成团体中心的人。他不需要刻意让人尊重他，因为他的存在本身就有重量。他讲义气，也讲正气，身上有一种老派江湖的气场。只要他在，整个牌桌就不会太乱。那一刻，这不太像普通的 poker night，更像一群人聚在一个船长底下，准备开一场江湖局。',
    },
  },
  {
    id: 'yt',
    code: { en: 'The Silent Shield', zh: '静默之盾' },
    phrase: { en: 'Quiet strength, holding everything together', zh: '不争其名，撑起全局' },
    tags: { en: 'Quiet Support / Family Core / Steady Heart / Hidden Strength', zh: '安静支援 / 家庭核心 / 稳定之心 / 隐藏力量' },
    intro: {
      en: 'The Silent Shield is not the type who fights for attention. But behind many stable things, there is usually someone like her. Calm, kind, responsible, and quietly strong. She does not need to stand in front to prove her value. Her strength is in holding things together when no one else notices the pressure.',
      zh: 'The Silent Shield 不是那种会抢存在感的人。但很多稳定的东西背后，通常都会有一个像她这样的人。冷静、善良、有责任感，而且是安静地强。她不需要站在最前面证明自己的价值，因为她的力量在于，当别人没有注意到压力的时候，她已经默默把很多东西撑住了。',
    },
  },
  {
    id: 'ben',
    code: { en: 'The Gambling King', zh: '赌博之王' },
    phrase: { en: 'Born to bet, built to rise', zh: '赌性入骨，财气冲天' },
    tags: { en: 'High Roller / Number Hunter / Risk Lover / Chaos Maker', zh: '高额玩家 / 数字猎人 / 风险爱好者 / 混乱制造者' },
    intro: {
      en: 'The Gambling King lives like every chance has a hidden number behind it. Cards, numbers, risk, timing, opportunity. If there is a game, he can smell it. If there is a possibility to multiply, he will look at it twice. He is not a safe player. He brings heat, risk, and sudden madness to the table. At his peak, he had the kind of cash power that made people remember the story.',
      zh: 'The Gambling King 活得像每一个机会背后都有一个隐藏数字。牌、号码、风险、时机、机会，只要有一点概率味道，他就会闻到。只要有翻倍的可能，他就会多看两眼。他不是安全型玩家，他带来的是热度、风险和突然失控的疯狂。他巅峰的时候，有那种让人记得住故事的现金实力。',
    },
  },
  {
    id: 'pat',
    code: { en: 'The Reluctant Prince', zh: '不想继承的太子' },
    phrase: { en: 'Born with backup, choosing his own path', zh: '身有退路，心走己路' },
    tags: { en: 'Humble Prince / Self-Made Spirit / Low-Key Wealth / Gentle Player', zh: '低调太子 / 自立精神 / 隐形富贵 / 温和玩家' },
    intro: {
      en: 'The Reluctant Prince has the background, but not the attitude. He could have lived like someone who was born with a safety net, but he does not carry himself like that. He is kind, shy, and surprisingly humble. There is something funny about him: if he does not work hard, he might still have something to inherit. But instead of acting like a spoiled prince, he moves more like someone trying to prove he can stand on his own.',
      zh: 'The Reluctant Prince 有背景，但没有那种背景人的架子。他明明可以活得像一个天生有安全网的人，但他偏偏不是那种姿态。他善良、害羞，而且意外地谦虚。他最有趣的地方是，如果他不努力，可能真的要回去继承点什么。但他没有演成被宠坏的太子爷，反而更像一个想证明自己可以靠自己站起来的人。',
    },
  },
  {
    id: 'jq',
    code: { en: 'The Probability Breaker', zh: '小概率破坏者' },
    phrase: { en: 'Defies the odds, protects what matters', zh: '破开概率，护住所爱' },
    tags: { en: 'System Bug / Rare Event Magnet / Loyal Protector / Unpredictable Luck', zh: '系统漏洞 / 小概率磁铁 / 忠诚守护者 / 不可预测运气' },
    intro: {
      en: 'The Probability Breaker feels like a walking system bug. Things that rarely happen seem to happen around him. Strange timing, weird outcomes, unlikely situations. Somehow, probability bends when he enters the story. But behind the comedy of strange luck, there is a loyal side too. He is protective, dependable, and the kind of person who will stand firmly for the people he cares about.',
      zh: 'The Probability Breaker 像一个会走路的系统漏洞。很少发生的事情，好像总会在他附近发生。奇怪的时间点、离谱的结果、小概率的状况，只要他进入故事，概率好像就会开始弯掉。但在这些奇怪运气的喜剧感背后，他也有很忠诚的一面。他保护欲强，可靠，而且会为了自己在乎的人站稳。',
    },
  },
  {
    id: 'teik',
    code: { en: 'The Poker Professor', zh: '扑克教授' },
    phrase: { en: 'Long-term king, tested by downfall', zh: '长胜为王，败后见真' },
    tags: { en: 'Poker Master / Calm Thinker / Long-Term Winner / Fallen King', zh: '扑克高手 / 冷静思考者 / 长期赢家 / 低谷王者' },
    intro: {
      en: 'The Poker Professor is not built on noise. He is calm, steady, and hard to read. His strength is not luck, but patience, calculation, and long-term control. At his peak, he had a legendary record of not losing for years. But even kings meet their low points. And that is what makes his story better. Because the real question is not whether he once ruled the table. The real question is whether he can rise again.',
      zh: 'The Poker Professor 不是靠声音建立存在感的人。他冷静、沉稳，很难被看穿。他的强项不是运气，而是耐性、计算和长期控制。巅峰时期，他有过好几年没输钱的传奇记录。但再强的王，也会遇到低谷。而这反而让他的故事更好看。真正的问题不是他曾经有没有统治过牌桌，而是他跌下来之后，还能不能重新站起来。',
    },
  },
  {
    id: 'ed',
    code: { en: 'The Shameless Drifter', zh: '不要脸浪人' },
    phrase: { en: 'No job, no shame, full freedom', zh: '无业有道，骗酒成仙' },
    tags: { en: 'Free Spirit / Shameless Genius / Drink Hustler / Table Clown', zh: '自由灵魂 / 不要脸天才 / 骗酒高手 / 牌桌小丑' },
    intro: {
      en: 'The Shameless Drifter does not live by normal rules. While others chase money, status, and structure, he somehow turns freedom into a lifestyle. He has no serious title, no heavy image, and almost no shame. But that is exactly his power. He can turn a table into a stage, a drink into an opportunity, and a joke into survival. He may not look like a winner on paper. But somehow, people still envy the way he lives.',
      zh: 'The Shameless Drifter 不按普通规则生活。别人追钱、身份和稳定结构，他却 somehow 把自由活成了一种生活方式。他没有很正式的 title，没有沉重的人设，也几乎没有什么脸皮。但这正是他的力量。他可以把一张桌子变成舞台，把一杯酒变成机会，把一个笑话变成生存方式。他在纸面上看起来可能不像赢家，但偏偏有人会羡慕他那种活法。',
    },
  },
] as const;

const pokerStoryIntro = {
  en: 'Not a scoreboard. Just the nights worth remembering — a wedding, a brutal river, and a $5 side-pot that ended like a movie.',
  zh: '不是战绩榜，只是几个值得记住的夜晚——一场婚礼、一条狠 river，还有一局 5 块起手、像电影一样收尾的散钱平分。',
} as const;

const pokerStories = [
  {
    date: '2024-05-26',
    title: { en: 'Cap married Shield', zh: '团长娶了阿盾' },
    body: {
      en: 'Before any of this was a poker night, it was a wedding. Cap married Shield — the loudest loyalty and the steadiest calm, same name on the same day. Ever since, the crew has had a married couple at its center, and every game is really just an excuse to get the same people back to the same table.',
      zh: '在这群人变成牌局之前，先有了一场婚礼。团长娶了阿盾——最响的义气配最稳的安静，同一天签下同一个名字。从那以后，桌子正中央就坐着一对夫妻；说到底，后来每一场牌，都只是把同一群人重新喊回同一张桌的理由。',
    },
  },
  {
    date: '2026-05-28',
    title: { en: 'The river that turned twice', zh: 'river 上反转两次的那夜' },
    body: {
      en: 'All night the river belonged to Lucky — the last card kept saving him. Then the board gave him a straight, and he shoved all-in against Prince’s three Aces. For one second Lucky had won. Then the river paired the board and turned those Aces into a full house — the hand was lifted right out of his hands. By the end, Gambler, Lucky, and Prince each sat on their own stack: three players, one quiet stand-off. Closing scene — Drifter wandered over with $5, pulled Prince into a side-pot split, and walked away $40 up.',
      zh: '整晚的 river 都站在罩仔这边——最后一张牌总在救他。后来桌面给了他一个顺子，他直接 all-in 推向太子手里的三条 A。有那么一秒，罩仔已经赢了。然后 river 把桌面配成对子，把那三条 A 变成葫芦——到手的牌被生生抬走。到最后，赌仔、罩仔、太子各坐一摞筹码：三家鼎立，安静对峙。收尾一幕——浪子揣着 5 块钱晃过来，把太子拉进一局散钱平分，转身就多赚了 40 块。',
    },
  },
] as const;

const wikiEntries = [
  {
    slug: 'vite',
    eyebrow: { en: 'Build skill', zh: '构建技能' },
    title: { en: 'Vite as the vibe-coding engine', zh: 'Vite 作为 vibe coding 的引擎' },
    summary: {
      en: 'Vite is useful because it protects the build flow: fast dev server, fast HMR, simple config, and a production build that still forces reality checks.',
      zh: 'Vite 好用的地方，不只是快，而是它保护了构建心流：dev server 快、HMR 快、配置轻，同时 production build 仍然会逼你面对真实问题。',
    },
    thesis: {
      en: 'For full vibe coding, use Vite as the fast loop, but keep a separate gate for typecheck, build, route checks, and broken-asset checks.',
      zh: '如果是 fully vibe coding，Vite 应该负责“快速循环”，但必须另外保留 typecheck、build、路由检查和资源检查这道门。',
    },
    sections: [
      {
        title: { en: 'Why I adopted it', zh: '为什么我会用 Vite' },
        points: {
          en: [
            'Jiju became too large to keep iterating comfortably without a faster build loop.',
            'The project needed clearer modular boundaries so UI, routes, assets, Firebase logic, and public pages could be changed without the whole app feeling tangled.',
            'Vite helped turn a heavy project into smaller feedback zones: change one page, one component, one asset path, then verify quickly.',
          ],
          zh: [
            '我会用 Vite，是因为 Jiju 项目变得太庞大，继续用慢反馈的方式迭代会一直出问题。',
            '项目需要更清楚的区块边界，让 UI、routes、assets、Firebase logic 和 public pages 不要全部缠在一起。',
            'Vite 帮我把一个很重的项目拆成更小的反馈区：改一个页面、一个组件、一个资源路径，然后快速验证。',
          ],
        },
      },
      {
        title: { en: 'Why it feels good', zh: '为什么它适合 vibe coding' },
        points: {
          en: [
            'Cold start is fast because dev does not bundle the whole app first.',
            'HMR keeps visual iteration alive, especially when adjusting UI, motion, copy, and microfeedback with AI.',
            'The config surface is small enough that AI can reason about the project without fighting a large custom bundler setup.',
          ],
          zh: [
            '冷启动快，因为开发环境不需要先把整个 app 打包完。',
            'HMR 让视觉迭代不中断，尤其适合和 AI 高频调整 UI、动效、文案和微反馈。',
            '配置面足够小，AI 比较容易理解项目，不会先卡在一大套自定义 bundler 配置里。',
          ],
        },
      },
      {
        title: { en: 'The traps', zh: '真正要小心的缺点' },
        points: {
          en: [
            'Dev and production are not identical: dev uses native ESM plus esbuild behavior, while production uses Rollup.',
            'Vite transpiles TypeScript quickly, but it does not typecheck by itself.',
            'Large component trees can create a local network waterfall during dev because many modules are requested separately.',
            'Dependency cache can create stale-behavior bugs; clearing `node_modules/.vite` or running with `--force` is sometimes necessary.',
            'Old CommonJS packages or dynamic require patterns can still create compatibility work.',
          ],
          zh: [
            '开发环境和生产环境不完全一样：dev 是 native ESM 加 esbuild 行为，production 是 Rollup 打包。',
            'Vite 会快速转译 TypeScript，但它本身不负责 typecheck。',
            '大型组件树在 dev 下可能形成本地 network waterfall，因为浏览器会分开请求很多模块。',
            '依赖缓存会制造“看起来像幽灵”的旧行为；有时要清 `node_modules/.vite` 或用 `--force` 重跑。',
            '老旧 CommonJS 包、动态 require、旧 SDK 仍然可能需要额外兼容处理。',
          ],
        },
      },
      {
        title: { en: 'How to use it for full vibe coding', zh: 'fully vibe coding 时怎么用' },
        points: {
          en: [
            'Let `npm run dev` stay non-blocking: it should show the UI quickly and keep HMR smooth.',
            'Do not rely on the dev server as proof of correctness; run `npm run typecheck` and `npm run build` before treating a change as done.',
            'Use TypeScript as AI context, not as a wall during exploration. Prefer fixing types later in a dedicated pass instead of scattering `@ts-ignore`.',
            'Use stable imports and route helpers. Path aliases are useful, but only if the repo is structured around them consistently.',
            'Keep Firebase or backend access in a small number of service files so AI can hold the data model in context.',
            'Check real assets and public routes after changes. A passing UI can still hide broken images, wrong base paths, or missing public files.',
          ],
          zh: [
            '让 `npm run dev` 保持不阻断：它的任务是快速显示 UI，并让 HMR 顺。',
            '不要把 dev server 正常当成正确证明；完成前一定跑 `npm run typecheck` 和 `npm run build`。',
            'TypeScript 应该作为 AI 理解代码库的地图，不是探索阶段的墙。不要到处撒 `@ts-ignore`，更好的做法是最后集中修类型。',
            'import 和 route helper 要稳定。alias 很有用，但前提是整个 repo 真的按这个结构维护。',
            'Firebase 或后端访问集中在少数 service 文件里，让 AI 能一次读懂数据模型。',
            '改完要检查真实资源和公开路由。UI 能跑，不代表图片、base path、public files 都没断。',
          ],
        },
      },
      {
        title: { en: 'Rule of thumb', zh: '我的使用原则' },
        points: {
          en: [
            'Vite is excellent for speed, but speed must be paired with a release checklist.',
            'During exploration, optimize for flow. Before handoff, optimize for truth.',
            'The best Vite setup for AI work is boring: predictable dev server, explicit routes, clean services, and repeatable checks.',
          ],
          zh: [
            'Vite 非常适合速度，但速度必须配一套发布检查。',
            '探索时优化心流；交付前优化真实性。',
            '最适合 AI 协作的 Vite 架构其实要无聊：dev server 可预测、路由明确、service 清楚、检查可重复。',
          ],
        },
      },
    ],
  },
  {
    slug: 'background-music',
    eyebrow: { en: 'Experience layer', zh: '体验层' },
    title: { en: 'Background music changes the room', zh: 'Background music 会改变整张桌的气氛' },
    summary: {
      en: 'A poker table is not only rules and cards. Ambient sound makes the browser feel less empty and more like a shared room.',
      zh: '一张 poker table 不只是规则和牌。背景音乐会让浏览器不那么空，像真的有一个共同空间。',
    },
    thesis: {
      en: 'Music should support the table mood without stealing control from the player.',
      zh: '音乐应该支撑牌桌气氛，但不能把控制权从玩家手里拿走。',
    },
    sections: [
      {
        title: { en: 'UX rules', zh: 'UX 规则' },
        points: {
          en: [
            'Make sound optional and visibly controllable.',
            'Remember the player preference instead of resetting the mood every visit.',
            'Use background music as presence, not as decoration.',
          ],
          zh: [
            '声音必须可选，而且控制入口要看得见。',
            '记住玩家偏好，不要每次进来都重置气氛。',
            '背景音乐的作用是制造存在感，不是单纯装饰。',
          ],
        },
      },
      {
        title: { en: 'Why it matters here', zh: '为什么这项目需要它' },
        points: {
          en: [
            'The game is social, so silence can make the table feel unfinished.',
            'A calm loop helps solo BOT mode feel less like a test screen.',
            'Sound gives the table rhythm while people wait for the next action.',
          ],
          zh: [
            '这个游戏是社交场，完全安静会让桌子像还没做完。',
            '轻一点的循环音乐，会让单人 BOT 模式不像测试页面。',
            '声音能给等待下一步动作的空档一点节奏。',
          ],
        },
      },
    ],
  },
  {
    slug: 'button-feedback',
    eyebrow: { en: 'Interaction skill', zh: '交互技能' },
    title: { en: 'Click button feedback is part of trust', zh: 'Click button feedback 是信任的一部分' },
    summary: {
      en: 'In a realtime card game, a button that does not answer back feels broken even when the code works.',
      zh: '在实时牌局里，一个点了没反应的按钮，就算代码没坏，用户也会觉得坏了。',
    },
    thesis: {
      en: 'Every important action needs an immediate signal: pressed, loading, accepted, blocked, or failed.',
      zh: '每个重要操作都要马上给信号：已按下、处理中、已接受、被挡住、或失败。',
    },
    sections: [
      {
        title: { en: 'Signals to design', zh: '要设计的信号' },
        points: {
          en: [
            'Pressed state: the button should physically respond.',
            'Pending state: remote actions need loading or disabled feedback.',
            'Result state: users should know whether the table accepted the action.',
          ],
          zh: [
            '按下状态：按钮要有物理反馈感。',
            '等待状态：远端动作需要 loading 或 disabled feedback。',
            '结果状态：用户要知道牌桌有没有接收这个动作。',
          ],
        },
      },
      {
        title: { en: 'Reusable lesson', zh: '可复用结论' },
        points: {
          en: [
            'Feedback prevents double clicks and confused retries.',
            'Small motion and sound can make the table feel alive.',
            'The best microinteraction is the one that removes doubt.',
          ],
          zh: [
            '反馈可以减少重复点击和乱重试。',
            '小动效和声音能让桌子变得更有生命感。',
            '最好的微交互，是把用户的怀疑拿掉。',
          ],
        },
      },
    ],
  },
  {
    slug: 'firebase-lifetime-storage',
    eyebrow: { en: 'Data memory', zh: '数据记忆' },
    title: { en: 'Firebase lifetime storage as table memory', zh: 'Firebase lifetime storage 是牌桌记忆' },
    summary: {
      en: 'Firebase turns a browser game from temporary screen state into a table that can survive refreshes, reconnects, and shared links.',
      zh: 'Firebase 让浏览器游戏不只是临时画面状态，而是一张能承受刷新、重连和分享链接的桌。',
    },
    thesis: {
      en: 'Realtime storage is not just where data sits. It defines what the table remembers and what must be cleaned up.',
      zh: 'Realtime storage 不只是放数据的地方。它决定牌桌记住什么，也决定什么必须被清掉。',
    },
    sections: [
      {
        title: { en: 'What it protects', zh: '它保护什么' },
        points: {
          en: [
            'Room state can persist beyond one browser session.',
            'Players can rejoin without the table losing the shared context.',
            'Host-started public tables have a durable source of truth.',
          ],
          zh: [
            '房间状态可以活过一次浏览器 session。',
            '玩家重连时，牌桌不会丢掉共同上下文。',
            '房主开的公开桌有一个稳定的 truth source。',
          ],
        },
      },
      {
        title: { en: 'Design caution', zh: '设计提醒' },
        points: {
          en: [
            'Lifetime storage still needs cleanup rules.',
            'Game state should be shaped like a schema, not scattered flags.',
            'Persistence is a product decision, not only a backend decision.',
          ],
          zh: [
            'Lifetime storage 也需要 cleanup 规则。',
            '游戏状态要像 schema，不要散成一堆 flag。',
            '持久化是产品决策，不只是后端决策。',
          ],
        },
      },
    ],
  },
  {
    slug: 'skills',
    eyebrow: { en: 'Skills map', zh: '技能地图' },
    title: { en: 'Reusable skills across projects', zh: '跨项目可复用 skills' },
    summary: {
      en: 'Every project should be able to produce reusable skills: build loops, UX decisions, data patterns, and product judgment that can move into the next project.',
      zh: '每个项目都应该能产出可复用 skills：构建循环、UX 判断、数据模式、产品判断，都应该能迁移到下一个项目。',
    },
    thesis: {
      en: 'The point of the knowledge base is to turn scattered build pain into reusable operating memory, then make that memory one click away from becoming a skill.',
      zh: '知识库的重点，是把分散的构建痛点变成可复用的操作记忆，最后让这些记忆可以 one click 变成 skill。',
    },
    sections: [
      {
        title: { en: 'Hard skills', zh: '硬技能' },
        points: {
          en: [
            'Vite release loop: dev speed, build checks, route/base-path discipline.',
            'Firebase realtime memory: rooms, game state, reconnects, cleanup logic.',
            'UX implementation: audio controls, button states, loading states, table feedback.',
          ],
          zh: [
            'Vite 发布循环：开发速度、build 检查、route/base path 纪律。',
            'Firebase 实时记忆：房间、牌局状态、重连、cleanup 逻辑。',
            'UX 实作：声音控制、按钮状态、loading 状态、牌桌反馈。',
          ],
        },
      },
      {
        title: { en: 'Product skills', zh: '产品技能' },
        points: {
          en: [
            'Know which details make a browser game feel like a real room.',
            'Use the crew story as product context, not just decorative copy.',
            'Keep project learnings fileable so they compound into the next build.',
          ],
          zh: [
            '判断哪些细节会让浏览器游戏像真的房间。',
            '把这群人的故事当产品上下文，不只是装饰文案。',
            '把项目经验沉淀成可归档内容，让下一次 build 变快。',
          ],
        },
      },
      {
        title: { en: 'Basic requirements for a skill', zh: '一个 skill 的基本要求' },
        points: {
          en: [
            'It must have a clear trigger situation: when should this skill be suggested or used?',
            'It must contain a reusable rule: what judgment should transfer to another project?',
            'It must include executable steps: what should the user or agent do next?',
            'It must include checks: how do we know the skill was applied correctly?',
            'It must name the source project: where did this skill come from?',
            'It must name anti-patterns: what should this skill prevent people from doing?',
            'It must have tags for classification, retrieval, and future auto-suggestion.',
          ],
          zh: [
            '必须有清楚的触发场景：什么情况下应该推荐或使用这个 skill？',
            '必须有可复用规则：这个判断如何迁移到另一个项目？',
            '必须有可执行步骤：user 或 agent 下一步具体做什么？',
            '必须有检查方式：怎么知道这个 skill 用对了？',
            '必须写明来源项目：这个 skill 是从哪个真实项目里长出来的？',
            '必须写明反模式：这个 skill 要防止别人犯什么错？',
            '必须有 tags，用来分类、检索和未来自动推荐。',
          ],
        },
      },
      {
        title: { en: 'What still needs to be added', zh: '我觉得还需要补的东西' },
        points: {
          en: [
            'Each skill should record source project, trigger situation, reusable rule, anti-pattern, and proof from the build.',
            'A skill is not a diary note. It needs a repeatable action pattern: when to use it, what to check, and what output it should create.',
            'The wiki should separate raw observation, refined principle, and executable skill so future users do not confuse memory with instruction.',
          ],
          zh: [
            '每个 skill 都应该记录来源项目、触发场景、可复用规则、反模式，以及来自真实 build 的证据。',
            'skill 不是日记。它必须有可重复动作：什么时候用、检查什么、最后产出什么。',
            'wiki 要分清 raw observation、refined principle 和 executable skill，不然后续 user 会把记忆和指令混在一起。',
          ],
        },
      },
      {
        title: { en: 'One-click skillization flow', zh: 'one click 变成 skills 的流程' },
        points: {
          en: [
            'Step 1: user highlights or selects a wiki note, build log, bug fix, or project decision.',
            'Step 2: the system extracts the skill candidate: trigger, context, rule, steps, warnings, examples, source link, and confidence.',
            'Step 3: the user sees a preview card before saving. One click should never silently publish a skill without review.',
            'Step 4: after approval, save it as a Skill Card with tags like Vite, Firebase, UX feedback, routing, analytics, or deployment.',
            'Step 5: future project pages can pull those Skill Cards back in when the same trigger appears.',
          ],
          zh: [
            'Step 1：user 选中一段 wiki note、build log、bug fix 或项目决策。',
            'Step 2：系统抽取 skill candidate：触发场景、上下文、原则、步骤、风险、例子、来源链接和信心分。',
            'Step 3：保存前先给 preview card。one click 不应该无声发布 skill，必须让 user 过目。',
            'Step 4：确认后存成 Skill Card，并打上 Vite、Firebase、UX feedback、routing、analytics、deployment 等标签。',
            'Step 5：未来其他项目遇到同类触发场景时，可以把这些 Skill Card 自动拉回来。',
          ],
        },
      },
      {
        title: { en: 'Minimum data shape', zh: '最小数据结构' },
        points: {
          en: [
            'title: the skill name, written as an action, not a vague topic.',
            'trigger: the situation where this skill should be suggested.',
            'reusableRule: the principle or judgment that should transfer across projects.',
            'procedure: the repeatable execution steps.',
            'checks: how to verify the skill was applied correctly.',
            'sourceProject: the project where this skill was learned.',
            'antiPatterns: the mistakes this skill should prevent.',
            'tags: categories for retrieval, filtering, and auto-suggestion.',
            'sources: links back to the original project note or build log.',
            'status: draft, reviewed, active, retired, or superseded.',
          ],
          zh: [
            'title：skill 名称，要写成动作，不要只是模糊主题。',
            'trigger：什么情况应该推荐这个 skill。',
            'reusableRule：可以跨项目迁移的原则或判断。',
            'procedure：可重复执行步骤。',
            'checks：怎么验证这个 skill 用对了。',
            'sourceProject：这个 skill 是从哪个项目里学到的。',
            'antiPatterns：这个 skill 要防止的错误做法。',
            'tags：用于检索、筛选和自动推荐的分类标签。',
            'sources：回链到原始项目笔记或 build log。',
            'status：draft、reviewed、active、retired 或 superseded。',
          ],
        },
      },
    ],
  },
  {
    slug: 'rag-flow',
    eyebrow: { en: 'Knowledge architecture', zh: '知识架构' },
    title: { en: 'Tag Registry and RAG flow', zh: 'Tag Registry 与 RAG flow' },
    summary: {
      en: 'RAG is useful for retrieval and suggestion, but the source of truth should stay in structured wiki notes, Skill Cards, and a controlled tag registry.',
      zh: 'RAG 适合做检索和推荐，但 source of truth 应该留在结构化 wiki notes、Skill Cards 和受控 tag registry 里。',
    },
    thesis: {
      en: 'Do not dump everything into a vector database. Build a clean knowledge layer first, then use RAG as the retrieval layer on top.',
      zh: '不要一开始就把所有东西丢进 vector database。先把知识层整理干净，再把 RAG 放在上面做检索层。',
    },
    sections: [
      {
        title: { en: 'The full flow', zh: '完整 flow' },
        points: {
          en: [
            'Raw Sources / Build Logs: immutable input and ground truth.',
            'Curated Wiki Notes: human-readable synthesis and reusable principles.',
            'Skill Cards: executable knowledge with trigger, rule, steps, checks, source project, anti-patterns, and tags.',
            'Tag Registry: controlled vocabulary for source project, tech, skill type, workflow stage, artifact type, status, and maturity.',
            'Embedding Index / RAG: retrieval layer that uses text similarity plus tag metadata filters.',
            'Query / Suggest / Auto Skill Recall: user asks a question or enters a project context, then the system recalls relevant Skill Cards.',
          ],
          zh: [
            'Raw Sources / Build Logs：不可随意改动的输入和事实来源。',
            'Curated Wiki Notes：人能读懂的整理、综合和可复用原则。',
            'Skill Cards：可执行知识，包含触发场景、规则、步骤、检查、来源项目、反模式和 tags。',
            'Tag Registry：受控标签表，管理 source project、tech、skill type、workflow stage、artifact type、status 和 maturity。',
            'Embedding Index / RAG：检索层，用语义相似度加 tag metadata filters 找内容。',
            'Query / Suggest / Auto Skill Recall：user 提问或进入项目上下文时，系统召回相关 Skill Cards。',
          ],
        },
      },
      {
        title: { en: 'Tag Registry rules', zh: 'Tag Registry 规则' },
        points: {
          en: [
            'Tags should have ids like `tech:vite`, `project:jiju`, `skill-type:ux-feedback`, not loose hashtags.',
            'Each tag needs label, type, aliases, description, parent, status, and optional replacement.',
            'Tags classify and filter. They should not replace the actual skill content.',
            'Retire or merge duplicate tags instead of letting the registry drift.',
          ],
          zh: [
            'Tags 应该有稳定 id，例如 `tech:vite`、`project:jiju`、`skill-type:ux-feedback`，不要变成随手写 hashtag。',
            '每个 tag 需要 label、type、aliases、description、parent、status 和 optional replacement。',
            'Tags 负责分类和过滤，不能替代 skill 正文。',
            '重复 tags 要 retired 或 merge，不要让 registry 慢慢漂移。',
          ],
        },
      },
      {
        title: { en: 'Why RAG fits', zh: '为什么适合 RAG' },
        points: {
          en: [
            'RAG can answer questions like: have I solved a similar Vite build problem before?',
            'RAG can recommend skills when a new project context matches old triggers.',
            'RAG can help extract draft Skill Cards from build logs, bug fixes, and wiki notes.',
            'The vector database should not be the source of truth. It should be regenerated from structured cards and notes.',
          ],
          zh: [
            'RAG 可以回答：我以前有没有解决过类似的 Vite build 问题？',
            '当新项目上下文匹配旧触发场景时，RAG 可以推荐相关 skills。',
            'RAG 可以从 build logs、bug fixes 和 wiki notes 里辅助抽取 draft Skill Cards。',
            'Vector database 不应该是 source of truth。它应该从结构化 cards 和 notes 重新生成。',
          ],
        },
      },
      {
        title: { en: 'Implementation order', zh: '实现顺序' },
        points: {
          en: [
            'Start with `/wiki`, `/wiki/skills`, `/tag-registry`, and `/skill-cards` as structured data.',
            'Normalize tags before embedding content.',
            'Embed Skill Card fields and use tags as metadata filters.',
            'Return source links with every answer so the user can inspect the original note.',
            'Keep every generated skill in draft until reviewed.',
          ],
          zh: [
            '先把 `/wiki`、`/wiki/skills`、`/tag-registry` 和 `/skill-cards` 做成结构化数据。',
            '先规范 tags，再做 embedding。',
            '对 Skill Card 字段做 embedding，同时用 tags 做 metadata filters。',
            '每次回答都带 source links，让 user 能回看原始 note。',
            '所有生成的 skill 先进入 draft，review 后才 active。',
          ],
        },
      },
    ],
  },
] as const;

const lifeVideos = [
  {
    title: { en: 'Pulau Tioman', zh: '刁曼岛' },
    href: 'https://www.youtube.com/watch?v=WMqBLHCMtps',
    embedSrc: 'https://www.youtube.com/embed/WMqBLHCMtps',
    thumbnailSrc: 'https://i.ytimg.com/vi/WMqBLHCMtps/hqdefault.jpg',
  },
  {
    title: { en: 'Desaru Surfing', zh: '迪沙鲁冲浪' },
    href: 'https://www.youtube.com/watch?v=Ingu-WLZWhA',
    embedSrc: 'https://www.youtube.com/embed/Ingu-WLZWhA',
    thumbnailSrc: 'https://i.ytimg.com/vi/Ingu-WLZWhA/hqdefault.jpg',
  },
  {
    title: { en: 'Pulau Kapas', zh: '棉花岛' },
    href: 'https://www.youtube.com/watch?v=qC8KuD9n14g',
    embedSrc: 'https://www.youtube.com/embed/qC8KuD9n14g',
    thumbnailSrc: 'https://i.ytimg.com/vi/qC8KuD9n14g/hqdefault.jpg',
  },
];

const previousProjectsData = [
  {
    title: {
      en: 'Promotion & Account Manager at Titan Group',
      zh: 'Titan Group｜推广与客户经理',
    },
    period: { en: '2024 - 2026', zh: '2024 - 2026' },
    points: {
      en: [
        'Helped partners and clients get API integrations, campaign tools, and onboarding sorted — and fixed things when they broke.',
        'Planned and ran campaign structures, including the trial incentives and how the bonuses actually worked.',
        'Kept track of who applied and which partners joined; put the campaign assets and announcements together and got them out.',
        'Ran the logistics for SiGMA and other expos — travel, meetings, booth needs, and chasing all the follow-ups after.',
        'Kept the paperwork tidy: request tracking, promo status, and the test-account workflow.',
        'Wrote the group announcements, gathered feedback from ops, and pushed issues to whoever needed to fix them.',
        'Worked with finance, design, and tech to ship campaigns faster and cleaner.',
      ],
      zh: [
        '帮合作伙伴和客户把 API 对接、活动工具、上线培训搞定——出问题就去排查。',
        '策划并落地活动结构，包含试用激励，还有奖金到底怎么玩。',
        '盯着谁报名、哪些合作方参与；活动素材和公告做好、发出去。',
        '统筹 SiGMA 和其他展会的后勤——行程、会议、展位需求，还有会后一个个跟进。',
        '把文档理整齐：请求跟踪、活动状态、测试账号流程。',
        '写群公告，收集运营反馈，有问题就升级给对应团队。',
        '跟财务、设计、技术一起，把活动做得更快、更干净。',
      ],
    },
    relatedLinks: [
      {
        label: { en: 'Mix & Match 1+1 Bonus key', zh: 'Mix & Match 1+1 Bonus key' },
        href: '/mnm11.html',
      },
      {
        label: { en: 'Promotion Page (Campaign Board)', zh: 'Promotion 页面（活动总览）' },
        href: '/Promotion%20Page.html',
      },
    ],
  },
  {
    title: {
      en: 'Senior Marketing Specialist at Job Social Malaysia',
      zh: 'Job Social Malaysia｜高级营销专员',
    },
    period: { en: '2023 - 2024', zh: '2023 - 2024' },
    points: {
      en: [
        'Built an automated Excel brand-report system for the outsourced marketing analysis.',
        'Made promotion retention planning easier to see — week by week and month by month.',
        'Set up a simple way to work through problems: spot it, dig into it, fix it.',
        'Kept the operational reports running — Facebook Ad ROI, Promotion & VIP, the monthly overall, game analysis, and the abnormal-list tracking.',
        'Standardized how reports were laid out so decisions could happen faster and cleaner.',
      ],
      zh: [
        '搭了一套自动化 Excel 品牌报告系统，撑外包营销分析。',
        '把活动留存规划做得更看得清——周和月都一目了然。',
        '建了一套处理问题的简单流程：发现、分析、解决。',
        '维护那些运营报表——Facebook 广告 ROI、活动与 VIP、月度总览、游戏分析、异常名单跟踪。',
        '统一报表结构，让决策更快、更干净。',
      ],
    },
  },
  {
    title: {
      en: 'Digital Marketing Manager at Atlantis Agency',
      zh: 'Atlantis Agency｜数字营销经理',
    },
    period: { en: '2021 - 2023', zh: '2021 - 2023' },
    points: {
      en: [
        'Led the UI/UX direction and built a whole new website structure from scratch.',
        'Got desktop and mobile to feel like the same brand, not two different sites.',
        'Made a handoff-ready prototype so the build team and I were actually on the same page.',
      ],
      zh: [
        '主导 UI/UX 方向，从零搭了一整个新网站结构。',
        '把桌面端和移动端拉到同一个品牌感，而不是两个不一样的站。',
        '做了能直接交接的原型，让研发和我真的在同一页上。',
      ],
    },
    relatedLinks: [
      {
        label: { en: 'UI/UX Prototype (Adobe XD)', zh: 'UI/UX 原型（Adobe XD）' },
        href: 'https://xd.adobe.com/view/26a08b2d-feb3-429e-9c76-45cf3eed8274-73f3/',
      },
    ],
  },
  {
    title: {
      en: 'Social Media Marketing Specialist at Black Sire Technology',
      zh: 'Black Sire Technology｜社交媒体营销专员',
    },
    period: { en: '2018 - 2021', zh: '2018 - 2021' },
    points: {
      en: [
        'Soccerking: made the content, planned the brand strategy, and read the Facebook insights.',
        'Built post-type systems for traffic, highlights, engagement, and shareable info albums.',
        'Ran the Like / Share / Tag and campaign-style traffic loops to grow the page.',
        'Facebook Ads: collecting leads, growing page likes, and pulling traffic to landing pages.',
        'Ran a gamified landing-page idea to get more clicks and deeper interaction.',
      ],
      zh: [
        'Soccerking：内容自己做、品牌策略自己规划、Facebook 数据自己看。',
        '搭帖子类型体系，覆盖引流、高光、互动和可分享的资讯相册。',
        '跑点赞/分享/标注和活动式流量闭环，把主页做起来。',
        'Facebook 广告：收潜客、涨粉、把流量拉到落地页。',
        '落地了一个游戏化活动页的想法，提升点击和互动深度。',
      ],
    },
    relatedLinks: [
      {
        label: { en: 'Soccerking Project', zh: 'Soccerking 项目' },
        href: '/archive/soccerking-project',
      },
    ],
  },
];

const archivedWorks = [
  {
    slug: '11-bonus-key-combo-builder',
    title: {
      en: '1+1 Bonus Key Combo Builder · Internal ops tool',
      zh: '1+1 奖金密钥组合构建器｜内部运营工具',
    },
    origin: {
      en: 'Archived from an internal utility I ran on a former domain—built for campaign ops who lived in combinations, not slides.',
      zh: '归档自曾托管在旧域名上的内部小工具：给天天和「组合、申领、条款」打交道的活动运营用，而不是给幻灯片用。',
    },
    summary: {
      en: '“1+1” style promos sound simple until you are in a hurry: the wrong pairing, a duplicate claim, or a top-slot rule that only surfaces after publish. This page was a working surface to assemble provider mixes with constraints baked in—so the team could see conflicts before they became customer-facing mistakes.',
      zh: '「1+1」听起来很轻巧，真正急的时候才会踩雷：配错合作方、重复申领、或置顶位规则要上线后才发现。这个页面是把「能申领的组合」放在一张可操作的桌面上——让冲突尽量出在发布前，而不是出在客诉里。',
    },
    sections: [
      {
        heading: { en: 'What was actually broken', zh: '当时真正卡在哪' },
        points: {
          en: [
            'Combinations were often negotiated in chat and spreadsheets—fast to type, slow to audit, easy to contradict a week later.',
            'Duplicate claims and incompatible top placements were the expensive mistakes; they rarely looked “urgent” until finance or support pinged you.',
            'Without a shared object model, “what is allowed” lived in tribal knowledge instead of something the whole desk could point at.',
          ],
          zh: [
            '组合常在聊天与表格里拼出来——打得快，难审计，过两周就容易和口头约定打架。',
            '重复申领、置顶位不兼容这类问题，成本很高，却往往要等到财务或客服找来才显得「急」。',
            '没有共用的对象模型时，「到底能不能这样配」会变成小圈子经验，而不是全组能对齐的参照。',
          ],
        },
      },
      {
        heading: { en: 'How the UI encoded the rules', zh: '界面怎么把规则写死' },
        points: {
          en: [
            'Partner-first layout: cards, tier visibility, and claim actions were the spine—not decorative chrome.',
            'Used-partner state prevented “double-tap” mistakes when the same provider had already been committed in a flow.',
            'A top-position slot model checked ranking compatibility before the combo was treated as final—cheap insurance against late surprises.',
            'Combo counts and slot occupancy updated in-page so operators always knew whether a mix was still “open” or already full.',
            'The goal was a repeatable claim-and-track rhythm: same desk, same object language, fewer one-off hero saves.',
          ],
          zh: [
            '以合作方为骨架：卡片、层级可见性、申领动作是主轴，而不是堆装饰。',
            '「已使用合作方」状态用来挡住流程里重复点选——减少同一供应方被误绑两次。',
            '置顶位槽位在「视为定稿」前就做排序兼容性校验——用便宜的前置检查换晚场惊吓。',
            '组合数量与槽位占用实时落在页面上，运营随时知道这套配方还能不能塞、是不是已经满。',
            '目标是一条可重复的申领与跟踪节奏：同一套对象语言，少几次靠个人救火。',
          ],
        },
      },
      {
        heading: { en: 'Partner catalog and clause context', zh: '合作方清单与条款语境' },
        points: {
          en: [
            'Each row was not just a logo—it carried the operational clauses that actually change behavior: top-placement requirements, banner obligations, campaign text, and other T&C hooks.',
            'Full partner set captured in the builder included Rich Gaming, Evo888H5, MegaH5, WF Gaming, EpicWin, UU Slots, AFB, Advant Play, 888King, BT Gaming, Creative Gaming, BNG, Joker, Meta Gaming, CP Games, PEGASUS, CrowdPlay, RSG, PlayStar, Mancala Gaming, and ClotPlay.',
            'I biased the product toward execution safety and auditability—if it looked boring, that usually meant fewer midnight messages.',
          ],
          zh: [
            '每一行不只是 logo，而是带着会改变行为的条款语境：置顶要求、横幅义务、活动文案与其它 T&C 挂钩。',
            '工具内覆盖的合作方集合包括：Rich Gaming、Evo888H5、MegaH5、WF Gaming、EpicWin、UU Slots、AFB、Advant Play、888King、BT Gaming、Creative Gaming、BNG、Joker、Meta Gaming、CP Games、PEGASUS、CrowdPlay、RSG、PlayStar、Mancala Gaming、ClotPlay 等。',
            '我刻意把产品偏向「执行安全、可审计」——界面若显得朴素，通常意味着半夜少几条消息。',
          ],
        },
      },
    ],
  },
  {
    slug: 'atlantis-ui-ux-prototype',
    title: { en: 'Atlantis Website UI/UX Prototype', zh: 'Atlantis 网站 UI/UX 原型' },
    origin: { en: 'Archived from previous Adobe XD prototype link.', zh: '归档自历史 Adobe XD 原型链接。' },
    summary: {
      en: 'This record preserves the design intent of the Atlantis website revamp for both desktop and mobile experiences.',
      zh: '本记录保留 Atlantis 网站改版在桌面端与移动端的设计意图。',
    },
    externalLink: 'https://xd.adobe.com/view/26a08b2d-feb3-429e-9c76-45cf3eed8274-73f3/',
    externalLabel: { en: 'Open Adobe XD Prototype', zh: '打开 Adobe XD 原型' },
    sections: [
      {
        heading: { en: 'Design Direction', zh: '设计方向' },
        points: {
          en: [
            'Rebuilt the website structure to improve clarity, hierarchy, and conversion flow.',
            'Aligned desktop and mobile layouts under one coherent brand language.',
            'Prioritized practical navigation and content readability for marketing audiences.',
          ],
          zh: [
            '重构网站结构，提升清晰度、层级与转化路径。',
            '在统一品牌语言下对齐桌面与移动布局。',
            '优先保证实用导航与营销受众的可读性。',
          ],
        },
      },
      {
        heading: { en: 'Execution Context', zh: '落地语境' },
        points: {
          en: [
            'Used as a handoff artifact for implementation and stakeholder alignment.',
            'Captured a full-site UX baseline before engineering delivery.',
            'Served as the reference layer for iterative visual refinement.',
          ],
          zh: [
            '作为交付物，用于研发落地与干系人对齐。',
            '在工程交付前沉淀全站 UX 基线。',
            '作为后续视觉迭代的对照层。',
          ],
        },
      },
    ],
  },
  {
    slug: 'soccerking-project',
    title: { en: 'Soccerking · Football Social Content', zh: 'Soccerking｜足球社媒内容' },
    origin: {
      en: 'Archived from my Black Sire chapter (~2018–2021). Soccerking was one of the pages I lived in daily.',
      zh: '归档自 Black Sire 时期（约 2018–2021）。Soccerking 是我当时几乎天天盯的主页之一。',
    },
    summary: {
      en: 'Match days are noisy; the real fight is the few hours after the final whistle when attention is still warm. I helped the team see content as three different jobs—pull people in, get them to react, give them something worth sharing—then wired that into templates and cadence so we were not improvising in the group chat every night.',
      zh: '比赛日很吵，真正的窗口往往在终场后那几小时——热度还在，手却容易乱。我做的是帮团队用「三种帖子、三件不同的活」来看内容：谁负责把人拉进来，谁负责让人点赞留言，谁适合被转发；再落到模板和排期上，避免每晚在群里临时救火。',
    },
    imageGallery: [
      {
        src: '/archive-images/soccerking/icon.png',
        alt: { en: 'Soccerking project icon', zh: 'Soccerking 项目图标' },
        caption: { en: 'Brand mark used on the page at the time.', zh: '当时页面使用的品牌图标。' },
      },
      {
        src: '/archive-images/soccerking/P1.png',
        alt: { en: 'Soccerking content planning or type overview screenshot', zh: 'Soccerking 内容规划或类型总览截图' },
        caption: { en: 'How post types sat next to each other in planning.', zh: '规划里几种帖子如何并排对齐。' },
      },
      {
        src: '/archive-images/soccerking/P2.png',
        alt: { en: 'Soccerking link or highlight post example', zh: 'Soccerking 链接或高光帖示例' },
        caption: { en: 'Link-style surface for traffic and highlight distribution.', zh: '偏链接形态：承接引流与高光分发。' },
      },
      {
        src: '/archive-images/soccerking/P3.png',
        alt: { en: 'Soccerking photo post or engagement layout', zh: 'Soccerking 图片帖或互动版式' },
        caption: { en: 'Photo-led layout tuned for comments and lightweight actions.', zh: '偏图片形态：引导评论与轻互动。' },
      },
      {
        src: '/archive-images/soccerking/P4.png',
        alt: { en: 'Soccerking album or informative carousel', zh: 'Soccerking 相册或可分享资讯' },
        caption: { en: 'Album / carousel pattern for shareable explainers.', zh: '相册 / 轮播：适合可转发的资讯向内容。' },
      },
      {
        src: '/archive-images/soccerking/P5.png',
        alt: { en: 'Soccerking template, workflow, or campaign capture', zh: 'Soccerking 模板、流程或活动截图' },
        caption: { en: 'Template or workflow capture from the post-match sprint.', zh: '赛后抢发阶段的模板或流程留底。' },
      },
    ],
    sections: [
      {
        heading: { en: 'What was actually broken', zh: '当时真正卡在哪' },
        points: {
          en: [
            'One-off “big idea” posts could spike reach, but they did not teach the team what to do next Tuesday.',
            'Link, photo, and album formats were all in use, yet the why behind each format was fuzzy—so priorities argued instead of compounding.',
            'After matches, speed mattered; without a shared template, quality swung between hero saves and silent gaps.',
          ],
          zh: [
            '偶尔一条「爆款」能带来峰值，但团队不知道下周二该复制什么。',
            '链接、图片、相册都在用，但各自要解决的题不清楚，容易在群里争优先级而不是叠加效果。',
            '赛后窗口短，没有共用模板时，质量就会在「神救场」和「空窗」之间摇摆。',
          ],
        },
      },
      {
        heading: { en: 'Three post types, three jobs', zh: '三种帖子，三件不同的活' },
        points: {
          en: [
            'Link posts: pull traffic in and ship highlights while search and share intent is still hot.',
            'Photo posts: earn Reacts and comments with clear, low-friction prompts—not decoration for its own sake.',
            'Album posts: package explainers people can forward; built for saves and reshares, not just impressions.',
            'Naming the job before naming the creative kept briefs shorter and reviews less emotional.',
          ],
          zh: [
            '链接帖：在搜索与分享意愿还在时，把人带进来并把高光送出去。',
            '图片帖：用清晰、低摩擦的引导换互动——图不是为好看而堆。',
            '相册帖：把资讯包成「愿意转给好友」的形态，看重收藏与转发，而不只是曝光。',
            '先讲清楚「这条帖要干什么」，再谈创意，Brief 会短很多，争执也少很多。',
          ],
        },
      },
      {
        heading: { en: 'Cadence, templates, and what we watched', zh: '排期、模板，以及我们看什么数' },
        points: {
          en: [
            'Match-led rhythm: templates shortened the path from full-time to publish so the page did not go quiet when everyone was tired.',
            'Facebook Page insights framed which post type earned reach versus depth; we used that to adjust the mix, not to chase a single vanity metric.',
            'Paid and organic loops (likes, shares, tags, landing experiments) sat beside this system—I treated ads as acceleration, not a replacement for clear organic jobs.',
          ],
          zh: [
            '比赛驱动节奏：模板把「终场 → 发出」的路径压短，避免大家累了主页却断更。',
            '主页洞察用来看「哪种帖型在吃 reach、哪种在吃深度」，用来调比例，而不是盯单一虚荣指标。',
            '点赞、分享、标注与落地实验等付费/活动闭环叠在这套之上——我把广告当放大器，而不是替代清晰的有机分工。',
          ],
        },
      },
    ],
  },
];

const normalizePath = (value: string) => {
  if (!value) return '/';
  const trimmed = value.replace(/\/+$/, '');
  return trimmed || '/';
};

const joinBasePath = (base: string, path: string) => {
  const safeBase = base.endsWith('/') ? base : `${base}/`;
  const safePath = path.replace(/^\/+/, '');
  return `${safeBase}${safePath}`;
};

const resolveAssetPath = (base: string, value: string) => {
  if (/^(?:[a-z]+:)?\/\//i.test(value)) return value;
  return joinBasePath(base, value);
};

const LANGUAGE_STORAGE_KEY = 'eden-portfolio-language';
const THEME_STORAGE_KEY = 'eden-portfolio-theme';
const GUEST_TOPIC_STORAGE_KEY = 'eden-guest-topic-board';
const AUTO_THEME_DAY_START_HOUR = 7;
const AUTO_THEME_NIGHT_START_HOUR = 19;

type GuestTopicEntry = {
  id: string;
  kind: 'topic' | 'comment';
  name: string;
  topic: string;
  message: string;
  createdAt: string;
};

const readStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (raw === 'en' || raw === 'zh') return raw;
  } catch {
    // ignore (private mode, storage disabled, etc.)
  }
  return null;
};

const resolveThemeFromLocalTime = (date = new Date()): Theme => {
  const hour = date.getHours();
  return hour >= AUTO_THEME_DAY_START_HOUR && hour < AUTO_THEME_NIGHT_START_HOUR ? 'light' : 'dark';
};

const readStoredThemePreference = (): ThemePreference => {
  if (typeof window === 'undefined') return 'auto';
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === 'auto' || raw === 'light' || raw === 'dark') return raw;
  } catch {
    // ignore (private mode, storage disabled, etc.)
  }
  return 'auto';
};

const readStoredGuestTopics = (): GuestTopicEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(GUEST_TOPIC_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is GuestTopicEntry => {
      return (
        item &&
        typeof item.id === 'string' &&
        (item.kind === 'topic' || item.kind === 'comment') &&
        typeof item.name === 'string' &&
        typeof item.topic === 'string' &&
        typeof item.message === 'string' &&
        typeof item.createdAt === 'string'
      );
    });
  } catch {
    return [];
  }
};

const writeStoredGuestTopics = (entries: GuestTopicEntry[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(GUEST_TOPIC_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore storage failures
  }
};

const LanguageToggle: React.FC<{
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  compactOnSelection?: boolean;
}> = ({ language, setLanguage, compactOnSelection = false }) => {
  const [isExpanded, setIsExpanded] = React.useState(() => !compactOnSelection);

  React.useEffect(() => {
    setIsExpanded(!compactOnSelection);
  }, [compactOnSelection, language]);

  const isCompact = compactOnSelection && !isExpanded;
  const options = [
    { value: 'en' as const, label: 'English', visibleLabel: <span>EN</span> },
    {
      value: 'zh' as const,
      label: '中文',
      visibleLabel: <><span className="header-language-label-full">中文</span><span className="header-language-label-short hidden" aria-hidden="true">中</span></>,
    },
  ];

  return (
    <div className={`header-language-toggle inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1${isCompact ? ' header-toggle-collapsed' : ''}`}>
      {options.map((option) => {
        const isActive = language === option.value;
        const isHidden = isCompact && !isActive;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (isCompact && isActive) {
                setIsExpanded(true);
                return;
              }

              setLanguage(option.value);
              if (compactOnSelection) setIsExpanded(false);
            }}
            className={`header-language-option rounded-full px-3 py-1 text-xs font-semibold ${
              isActive ? 'bg-eden-mint text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }${isHidden ? ' header-toggle-option-hidden' : ''}`}
            aria-label={isCompact && isActive ? `${option.label}，显示语言选项` : `Switch language to ${option.label}`}
            aria-pressed={isActive}
            aria-expanded={compactOnSelection && isActive ? isExpanded : undefined}
            aria-hidden={isHidden || undefined}
            tabIndex={isHidden ? -1 : undefined}
          >
            {option.visibleLabel}
          </button>
        );
      })}
    </div>
  );
};

const ThemeToggle: React.FC<{
  language: Language;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
  compactOnSelection?: boolean;
}> = ({ language, themePreference, theme, setThemePreference, compactOnSelection = false }) => {
  const [isExpanded, setIsExpanded] = React.useState(() => !compactOnSelection);
  const options = [
    {
      value: 'auto' as const,
      label: language === 'zh' ? '自动' : 'Auto',
      icon: Clock3,
      activeClass: 'bg-eden-mint text-stone-900 shadow-sm',
    },
    {
      value: 'light' as const,
      label: language === 'zh' ? '浅色' : 'Light',
      icon: SunMedium,
      activeClass: 'bg-stone-200 text-stone-900 shadow-sm',
    },
    {
      value: 'dark' as const,
      label: language === 'zh' ? '深色' : 'Dark',
      icon: MoonStar,
      activeClass: 'bg-stone-900 text-white shadow-sm',
    },
  ] as const;

  const autoStatus =
    themePreference === 'auto'
      ? language === 'zh'
        ? `按本地时间自动切换，目前为${theme === 'dark' ? '深色' : '浅色'}`
        : `Automatically switches by local time, currently ${theme}`
      : undefined;

  React.useEffect(() => {
    setIsExpanded(!compactOnSelection);
  }, [compactOnSelection, themePreference]);

  const isCompact = compactOnSelection && !isExpanded;

  return (
    <div
      className={`header-theme-toggle inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1${isCompact ? ' header-toggle-collapsed' : ''}`}
      title={autoStatus}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = themePreference === option.value;
        const isHidden = isCompact && !isActive;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (isCompact && isActive) {
                setIsExpanded(true);
                return;
              }

              setThemePreference(option.value);
              if (compactOnSelection) setIsExpanded(false);
            }}
            className={`header-theme-option inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              isActive ? option.activeClass : 'text-stone-600 hover:text-stone-900'
            }${isHidden ? ' header-toggle-option-hidden' : ''}`}
            aria-pressed={isActive}
            aria-expanded={compactOnSelection && isActive ? isExpanded : undefined}
            aria-hidden={isHidden || undefined}
            tabIndex={isHidden ? -1 : undefined}
            aria-label={
              language === 'zh'
                ? `${option.label}${isActive ? '，目前已选择' : ''}`
                : `${option.label}${isActive ? ', currently selected' : ''}`
            }
            title={
              isCompact && isActive
                ? language === 'zh' ? '显示主题选项' : 'Show theme options'
                : option.value === 'auto'
                ? autoStatus
                : language === 'zh'
                  ? `切换到${option.label}`
                  : `Switch to ${option.label}`
            }
          >
            <Icon size={13} />
            <span className="header-theme-label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const HeaderControls: React.FC<{
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
  compactThemeOnSelection?: boolean;
  compactLanguageOnSelection?: boolean;
}> = ({ language, setLanguage, themePreference, theme, setThemePreference, compactThemeOnSelection = true, compactLanguageOnSelection = true }) => (
  <div className="header-controls flex items-center gap-3">
    <ThemeToggle
      language={language}
      themePreference={themePreference}
      theme={theme}
      setThemePreference={setThemePreference}
      compactOnSelection={compactThemeOnSelection}
    />
    <LanguageToggle language={language} setLanguage={setLanguage} compactOnSelection={compactLanguageOnSelection} />
  </div>
);

type TopicMarketQuestion = {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  tone: 'mint' | 'amber' | 'blue' | 'pink' | 'violet';
  categoryKey: 'all' | 'llm-wiki' | 'ai-workflow' | 'systems' | 'content' | 'signals';
  category: Record<Language, string>;
  title: Record<Language, string>;
  outcomes: Array<{
    label: Record<Language, string>;
    probability: number;
  }>;
  volume: string;
  cadence?: Record<Language, string>;
};

const topicMarketQuestions: TopicMarketQuestion[] = [
  {
    id: 'wiki-memory-boundary',
    icon: Database,
    tone: 'mint',
    categoryKey: 'llm-wiki',
    category: { en: 'LLM Wiki', zh: 'LLM Wiki' },
    title: {
      en: 'What should an LLM-maintained wiki remember?',
      zh: 'LLM 维护的 wiki 应该记住什么？',
    },
    outcomes: [
      { label: { en: 'Reusable workflows', zh: '可复用流程' }, probability: 82 },
      { label: { en: 'Claims and decisions', zh: '关键判断' }, probability: 74 },
    ],
    volume: '128 answers',
    cadence: { en: 'Weekly', zh: '每周' },
  },
  {
    id: 'workflow-breakpoint',
    icon: GitBranch,
    tone: 'blue',
    categoryKey: 'ai-workflow',
    category: { en: 'AI workflow', zh: 'AI 工作流' },
    title: {
      en: 'Where do AI workflows break first in real projects?',
      zh: 'AI 工作流在真实项目里最先卡在哪里？',
    },
    outcomes: [
      { label: { en: 'Bad context', zh: '上下文太差' }, probability: 68 },
      { label: { en: 'No verification', zh: '没有验证' }, probability: 61 },
    ],
    volume: '94 answers',
  },
  {
    id: 'system-worthy-work',
    icon: Layers,
    tone: 'amber',
    categoryKey: 'systems',
    category: { en: 'Systems', zh: '系统化' },
    title: {
      en: 'Which scattered work should become a reusable system?',
      zh: '哪些散乱工作最应该变成可复用系统？',
    },
    outcomes: [
      { label: { en: 'Repeated reports', zh: '重复报表' }, probability: 89 },
      { label: { en: 'Project handoff', zh: '项目交接' }, probability: 76 },
    ],
    volume: '211 answers',
    cadence: { en: 'NEW', zh: 'NEW' },
  },
  {
    id: 'essay-or-tool',
    icon: Brain,
    tone: 'violet',
    categoryKey: 'content',
    category: { en: 'Content', zh: '内容' },
    title: {
      en: 'Should this idea become an essay, a tool, or a wiki page?',
      zh: '一个想法应该变成文章、工具，还是 wiki page？',
    },
    outcomes: [
      { label: { en: 'Wiki page', zh: 'Wiki page' }, probability: 57 },
      { label: { en: 'Tool', zh: '工具' }, probability: 31 },
    ],
    volume: '76 answers',
  },
  {
    id: 'worth-answering',
    icon: SearchCheck,
    tone: 'pink',
    categoryKey: 'signals',
    category: { en: 'Topic signal', zh: '选题信号' },
    title: {
      en: 'Is this question worth answering publicly?',
      zh: '这个问题值得公开回答吗？',
    },
    outcomes: [
      { label: { en: 'Yes, public answer', zh: '值得公开回答' }, probability: 73 },
      { label: { en: 'Private note only', zh: '只适合私下记录' }, probability: 19 },
    ],
    volume: '52 answers',
  },
  {
    id: 'source-summary',
    icon: MessageSquare,
    tone: 'mint',
    categoryKey: 'llm-wiki',
    category: { en: 'LLM Wiki', zh: 'LLM Wiki' },
    title: {
      en: 'Should raw sources be summarized before synthesis?',
      zh: 'Raw source 需要先 summary 再 synthesis 吗？',
    },
    outcomes: [
      { label: { en: 'Always summarize first', zh: '永远先 summary' }, probability: 64 },
      { label: { en: 'Only for long sources', zh: '长 source 才需要' }, probability: 28 },
    ],
    volume: '37 answers',
  },
  {
    id: 'agent-handoff',
    icon: UserRound,
    tone: 'blue',
    categoryKey: 'ai-workflow',
    category: { en: 'AI workflow', zh: 'AI 工作流' },
    title: {
      en: 'What makes an agent handoff actually useful?',
      zh: '什么样的 agent handoff 才真的有用？',
    },
    outcomes: [
      { label: { en: 'Concrete changed files', zh: '清楚列出改动文件' }, probability: 81 },
      { label: { en: 'Known risks', zh: '明确剩余风险' }, probability: 69 },
    ],
    volume: '143 answers',
    cadence: { en: 'Weekly', zh: '每周' },
  },
  {
    id: 'proof-through-builds',
    icon: TrendingUp,
    tone: 'amber',
    categoryKey: 'signals',
    category: { en: 'Topic signal', zh: '选题信号' },
    title: {
      en: 'Does proof through builds beat a traditional portfolio?',
      zh: '用真实 build 证明，是否比传统 portfolio 更有力？',
    },
    outcomes: [
      { label: { en: 'Yes, stronger signal', zh: '是，更强信号' }, probability: 91 },
      { label: { en: 'Depends on reader', zh: '看受众' }, probability: 22 },
    ],
    volume: '188 answers',
  },
];

const formatGuestTopicDate = (value: string, language: Language) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const GuestTopicsPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [entries, setEntries] = React.useState<GuestTopicEntry[]>(() => readStoredGuestTopics());
  const [activeCategory, setActiveCategory] = React.useState<TopicMarketQuestion['categoryKey']>('llm-wiki');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [guestName, setGuestName] = React.useState('');
  const [newTopic, setNewTopic] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const displayName = guestName.trim() || (isZh ? 'Guest 访客' : 'Guest');
  const storedEntries = entries.slice(0, 6);
  const categoryItems: Array<{ key: TopicMarketQuestion['categoryKey']; label: Record<Language, string> }> = [
    { key: 'all', label: { en: 'All', zh: 'All' } },
    { key: 'llm-wiki', label: { en: 'LLM Wiki', zh: 'LLM Wiki' } },
    { key: 'ai-workflow', label: { en: 'AI Workflow', zh: 'AI 工作流' } },
    { key: 'systems', label: { en: 'Systems', zh: '系统化' } },
    { key: 'content', label: { en: 'Content', zh: '内容' } },
    { key: 'signals', label: { en: 'Signals', zh: '信号' } },
  ];
  const marketNavItems = [
    { key: 'all', label: isZh ? 'Trending' : 'Trending' },
    { key: 'llm-wiki', label: 'LLM Wiki' },
    { key: 'ai-workflow', label: isZh ? 'AI 工作流' : 'AI Workflow' },
    { key: 'systems', label: isZh ? '系统化' : 'Systems' },
    { key: 'content', label: isZh ? '内容' : 'Content' },
    { key: 'signals', label: isZh ? '选题信号' : 'Signals' },
  ] satisfies Array<{ key: TopicMarketQuestion['categoryKey']; label: string }>;
  const filteredQuestions = topicMarketQuestions.filter((item) => {
    const haystack = [
      item.category[language],
      item.title[language],
      ...item.outcomes.map((outcome) => outcome.label[language]),
    ].join(' ').toLowerCase();
    const categoryMatches = activeCategory === 'all' || item.categoryKey === activeCategory;
    const searchMatches = !searchTerm.trim() || haystack.includes(searchTerm.trim().toLowerCase());
    return categoryMatches && searchMatches;
  });
  const activeCategoryLabel = categoryItems.find((item) => item.key === activeCategory)?.label[language] ?? 'All';

  const saveEntries = (nextEntries: GuestTopicEntry[]) => {
    setEntries(nextEntries);
    writeStoredGuestTopics(nextEntries);
  };

  const handleMarketAnswer = (question: TopicMarketQuestion, outcomeLabel: string, side: 'Yes' | 'No') => {
    const nextEntry: GuestTopicEntry = {
      id: `answer-${Date.now()}`,
      kind: 'comment',
      name: displayName,
      topic: question.title[language],
      message: `${outcomeLabel} — ${side}`,
      createdAt: new Date().toISOString(),
    };
    saveEntries([nextEntry, ...entries]);
  };

  const handleCreateTopic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const topic = newTopic.trim();
    if (!topic) return;
    const nextEntry: GuestTopicEntry = {
      id: `topic-${Date.now()}`,
      kind: 'topic',
      name: displayName,
      topic: isZh ? 'Guest 新问题' : 'Guest new question',
      message: topic,
      createdAt: new Date().toISOString(),
    };
    saveEntries([nextEntry, ...entries]);
    setNewTopic('');
  };

  const handleCopyBoard = async () => {
    const summary = entries
      .map((entry) => {
        const label = entry.kind === 'topic' ? 'Topic' : 'Answer';
        return `[${label}] ${entry.topic}\nFrom: ${entry.name}\n${entry.message}`;
      })
      .join('\n\n');
    const fallbackText = summary || (isZh ? '目前还没有本地留言。' : 'No local submissions yet.');
    try {
      await navigator.clipboard.writeText(fallbackText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page-shell topics-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <header className="topics-market-topbar">
        <div className="topics-market-brand">
          <a href={homeHref} className="topics-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
            <span>{isZh ? '主页' : 'Home'}</span>
          </a>
          <strong>Eden Markets</strong>
        </div>
        <label className="topics-market-search">
          <Search size={21} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={isZh ? 'Search topics...' : 'Search topics...'}
          />
        </label>
        <a href="#how-it-works" className="topics-help-link">
          <SearchCheck size={16} />
          {isZh ? 'How it works' : 'How it works'}
        </a>
        <div className="topics-market-actions">
          <a href="#create-topic" className="topics-login-link">{isZh ? 'Guest' : 'Guest'}</a>
          <a href="#create-topic" className="topics-signup-button">{isZh ? 'New Topic' : 'New Topic'}</a>
          <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
        </div>
      </header>

      <nav className="topics-market-nav" aria-label={isZh ? 'Topic categories' : 'Topic categories'}>
        {marketNavItems.map((item, index) => (
          <button
            key={item.key}
            type="button"
            className={activeCategory === item.key ? 'topics-market-nav-active' : ''}
            onClick={() => setActiveCategory(item.key)}
          >
            {index === 0 && <TrendingUp size={16} />}
            {item.label}
          </button>
        ))}
      </nav>

      <main className="topics-market-shell">
        <aside className="topics-market-sidebar" aria-label={isZh ? 'Categories' : 'Categories'}>
          {categoryItems.map((item) => {
            const count = item.key === 'all'
              ? topicMarketQuestions.length
              : topicMarketQuestions.filter((question) => question.categoryKey === item.key).length;
            return (
              <button
                key={item.key}
                type="button"
                className={activeCategory === item.key ? 'topics-sidebar-active' : ''}
                onClick={() => setActiveCategory(item.key)}
              >
                <span>{item.label[language]}</span>
                <strong>{count}</strong>
              </button>
            );
          })}
          <form id="create-topic" className="topics-create-card" onSubmit={handleCreateTopic}>
            <p className="topics-mini-label">{isZh ? 'Guest market' : 'Guest market'}</p>
            <label>
              <span>{isZh ? '名字' : 'Name'}</span>
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder={isZh ? 'Guest' : 'Guest'}
              />
            </label>
            <label>
              <span>{isZh ? '新问题' : 'New question'}</span>
              <textarea
                value={newTopic}
                onChange={(event) => setNewTopic(event.target.value)}
                placeholder={isZh ? '留下一个新的 topic...' : 'Leave a new topic...'}
                rows={4}
              />
            </label>
            <button type="submit">
              <Plus size={16} />
              {isZh ? 'Create' : 'Create'}
            </button>
          </form>
        </aside>

        <section className="topics-market-main" id="topic-market">
          <div className="topics-market-main-head">
            <div>
              <p>{isZh ? 'Markets / Knowledge systems' : 'Markets / Knowledge systems'}</p>
              <h1>{activeCategoryLabel}</h1>
            </div>
            <div className="topics-market-tools" aria-hidden>
              <Search size={22} />
              <SlidersHorizontal size={22} />
              <Bookmark size={22} />
            </div>
          </div>

          <div className="topics-card-grid">
            {filteredQuestions.map((question) => {
              const Icon = question.icon;
              return (
                <article key={question.id} className={`topics-market-card topics-tone-${question.tone}`}>
                  <div className="topics-market-card-head">
                    <span className="topics-market-icon" aria-hidden>
                      <Icon size={25} strokeWidth={2.25} />
                    </span>
                    <h2>{question.title[language]}</h2>
                  </div>
                  <div className="topics-outcome-list">
                    {question.outcomes.map((outcome) => (
                      <div key={outcome.label.en} className="topics-outcome-row">
                        <span className="topics-outcome-label">{outcome.label[language]}</span>
                        <strong>{outcome.probability}%</strong>
                        <button type="button" className="topics-yes-button" onClick={() => handleMarketAnswer(question, outcome.label[language], 'Yes')}>
                          Yes
                        </button>
                        <button type="button" className="topics-no-button" onClick={() => handleMarketAnswer(question, outcome.label[language], 'No')}>
                          No
                        </button>
                      </div>
                    ))}
                  </div>
                  <footer className="topics-market-card-footer">
                    <span>{question.volume}</span>
                    {question.cadence && <span>{question.cadence[language]}</span>}
                    <Bookmark size={18} />
                  </footer>
                </article>
              );
            })}

            <form className="topics-market-card topics-create-market-card" onSubmit={handleCreateTopic}>
              <div className="topics-market-card-head">
                <span className="topics-market-icon" aria-hidden>
                  <Plus size={25} strokeWidth={2.25} />
                </span>
                <h2>{isZh ? '你想让 Eden 回答什么？' : 'What should Eden answer next?'}</h2>
              </div>
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder={isZh ? 'Guest / 你的名字' : 'Guest / your name'}
              />
              <textarea
                value={newTopic}
                onChange={(event) => setNewTopic(event.target.value)}
                placeholder={isZh ? '写一个新问题，或补充你想讨论的 topic。' : 'Write a new question or topic you want to discuss.'}
                rows={5}
              />
              <button type="submit" className="topics-create-market-button">
                <Send size={17} />
                {isZh ? '提交新问题' : 'Submit question'}
              </button>
              <footer className="topics-market-card-footer">
                <span>{isZh ? 'Stored locally' : 'Stored locally'}</span>
                <Bookmark size={18} />
              </footer>
            </form>
          </div>

          <section id="local-board" className="topics-local-board">
            <div className="topics-local-head">
              <div>
                <p>{isZh ? 'Local activity' : 'Local activity'}</p>
                <h2>{isZh ? '这台浏览器里的回答。' : 'Answers in this browser.'}</h2>
              </div>
              <button type="button" onClick={handleCopyBoard}>
                <Copy size={16} />
                {copied ? (isZh ? '已复制' : 'Copied') : isZh ? '复制给 Eden' : 'Copy'}
              </button>
            </div>

            <div className="topics-local-list">
              {storedEntries.length > 0 ? (
                storedEntries.map((entry) => (
                  <article key={entry.id}>
                    <span>{entry.kind === 'topic' ? (isZh ? 'Guest topic' : 'Guest topic') : isZh ? 'Answer' : 'Answer'}</span>
                    <h3>{entry.topic}</h3>
                    <p>{entry.message}</p>
                    <small>
                      <UserRound size={14} />
                      {entry.name} · {formatGuestTopicDate(entry.createdAt, language)}
                    </small>
                  </article>
                ))
              ) : (
                <div className="topics-empty-state">
                  <MessageSquare size={24} />
                  <p>
                    {isZh
                      ? '还没有本地回答。点击任一卡片的 Yes / No，或创建新问题。'
                      : 'No local answers yet. Click Yes / No on any card, or create a new question.'}
                  </p>
                </div>
              )}
            </div>

            <div id="how-it-works" className="topics-note-panel">
              <p className="topics-mini-label">{isZh ? 'Persistence note' : 'Persistence note'}</p>
              <p>
                {isZh
                  ? '当前版本不连接数据库，所以不同访客之间不会互相看到回答。要做真正公开 topic market，下一步需要接 Firebase / Supabase / GitHub Issues / Formspree 这类持久化层。'
                  : 'This version does not connect to a database, so different visitors will not see each other’s answers. A public topic market needs Firebase, Supabase, GitHub Issues, or a form service next.'}
              </p>
              <a href={homeHref}>{isZh ? '返回主页' : 'Back home'} <span aria-hidden>›</span></a>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

const ProjectCssGalleryPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';

  return (
    <div className="page-shell projects-page project-css-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="projects-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={projectsHref} className="projects-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="project-css-hero py-16 text-center md:py-24">
            <p className="projects-kicker mx-auto">{isZh ? 'CSS art / Icon system' : 'CSS art / Icon system'}</p>
            <h1 className="project-css-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '把站内 CSS 图腾集中看。' : 'A review board for Eden CSS art.'}
            </h1>
            <p className="project-css-subtitle mx-auto mt-5">
              {isZh
                ? '这里集中检查 Projects app icon、banner archive、System Files 和 Interests 图腾，统一看动效、比例、light / dark mode 和维护边界。'
                : 'This page gathers Projects app icons, the banner archive, System Files, and Interests visuals for reviewing motion, ratio, light/dark mode, and maintenance boundaries.'}
            </p>
          </header>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Projects page' : 'Projects page'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? 'Projects 里的 4 个 app icon' : 'The 4 app icons from Projects'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '这些是 framed app icon，有固定底和 1:1 比例。' : 'These are framed app icons with a fixed background and a 1:1 ratio.'}
              </p>
            </div>
          </section>

          <section className="project-css-board">
            {projectCssArtItems.map((item) => {
              const Icon = item.Component;
              const project = aiProjectSystems.find((candidate) => candidate.title === item.projectTitle);

              return (
                <article key={item.id} className="project-css-card">
                  <div className="project-css-icon-stage">
                    <Icon label={item.label[language]} />
                  </div>
                  <div className="project-css-card-copy">
                    <p className="projects-card-eyebrow">
                      {project ? project.eyebrow[language] : isZh ? 'Projects page' : 'Projects page'}
                    </p>
                    <h2 className="font-display text-3xl font-bold tracking-tight">{item.title}</h2>
                    <p>{project ? project.role[language] : item.copy[language]}</p>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Banner archive' : 'Banner archive'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? '首页的 5 张项目 banner' : 'Five project banners from Home'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '统一 16:9 比例，表达数据判断、本地发现、人生记录、细胞自动机与胶片观察。' : 'One 16:9 system for data decisions, local discovery, life records, cellular automata, and film observation.'}
              </p>
            </div>
            <div className="project-css-banner-grid">
              {homeSelectedWorkBannerItems.map((item) => {
                const Banner = item.Component;
                return (
                  <article key={item.id} className="project-css-banner-card">
                    <div className="project-css-banner-stage">
                      <Banner label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">Banner archive</p>
                      <h2 className="font-display text-3xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Home / System Files' : 'Home / System Files'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? '主页系统文件里的两个 CSS' : 'Two CSS pieces from Home System Files'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '这里补上你点名的 Projects Hub 和 Life OS RPG System。' : 'This adds the requested Projects Hub and Life OS RPG System visuals.'}
              </p>
            </div>
            <div className="project-css-board project-css-home-board">
              {homeSystemCssArtItems.map((item) => {
                const Icon = item.Component;

                return (
                  <article key={item.id} className="project-css-card project-css-home-card">
                    <div className="project-css-icon-stage project-css-home-icon-stage">
                      <Icon label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">{isZh ? 'Home / System Files' : 'Home / System Files'}</p>
                      <h2 className="font-display text-3xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Home / Interests' : 'Home / Interests'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? 'Interests 里的视觉图标' : 'Visual icons from Interests'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '图腾保持透明底；有明确产品入口的项目可以使用固定底 app icon。' : 'Totems keep transparent backgrounds; projects with a clear product entry can use a framed app icon.'}
              </p>
            </div>
            <div className="project-css-totem-grid">
              {homeInterestCssArtItems.map((item) => {
                const Icon = item.Component;

                return (
                  <article key={item.id} className="project-css-totem-card">
                    <div className="project-css-totem-stage">
                      <Icon label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">{isZh ? 'Home / Interests' : 'Home / Interests'}</p>
                      <h2 className="font-display text-2xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Office / Framed app icons' : 'Office / Framed app icons'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? '6 个办公系统 1:1 CSS icon' : '6 office-system 1:1 CSS icons'}
              </h2>
              <p className="project-css-section-copy">
                {isZh
                  ? '根据 System Files 的克制图标语言和 framed app icon 规则设计：平面底、轻微层次、慢速动效。'
                  : 'Designed from the System Files visual language and framed app-icon rules: flat surface, quiet depth, and slow motion.'}
              </p>
            </div>
            <div className="project-css-office-grid">
              {officeIconCssArtItems.map((item) => {
                const Icon = item.Component;

                return (
                  <article key={item.id} className="project-css-card project-css-office-card">
                    <div className="project-css-icon-stage project-css-office-icon-stage">
                      <Icon label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">{isZh ? 'Office icon' : 'Office icon'}</p>
                      <h2 className="font-display text-2xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Elemental / 1:1 CSS' : 'Elemental / 1:1 CSS'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? '元素 1:1 CSS icons' : 'Elemental 1:1 CSS icons'}
              </h2>
              <p className="project-css-section-copy">
                {isZh
                  ? '一组更 flat 的 framed 元素图标：火是大块火焰，水是清楚水滴，风是柔和风带。'
                  : 'A flatter framed elemental set: fire is a bold flame, water is a clear droplet, and wind is soft gust bands.'}
              </p>
            </div>
            <div className="project-css-office-grid project-css-elemental-grid">
              {elementalIconCssArtItems.map((item) => {
                const Icon = item.Component;

                return (
                  <article key={item.id} className="project-css-card project-css-office-card project-css-elemental-card">
                    <div className="project-css-icon-stage project-css-office-icon-stage project-css-elemental-icon-stage">
                      <Icon label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">{isZh ? 'Elemental icon' : 'Elemental icon'}</p>
                      <h2 className="font-display text-2xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-impact">
            <p className="projects-kicker">{isZh ? 'Impact' : 'Impact'}</p>
            <p>
              {isZh
                ? '影响仍然很小：这页只复用现有 CSS 组件，不改 Home 或 `/projects` 的原页面结构。页面设置为 noindex / 不进 sitemap，默认只作为直达检查页。'
                : 'Impact remains low: this page only reuses existing CSS components and does not change the original Home or `/projects` page structure. It is noindex / excluded from the sitemap by default, intended as a direct review page.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <a href={homeHref} className="projects-text-cta">
                {isZh ? '返回主页' : 'Back home'} <span aria-hidden>›</span>
              </a>
              <a href={homeHref} className="projects-text-cta projects-text-cta-muted">
                {isZh ? '回到主页' : 'Back to Home'} <span aria-hidden>›</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const ProjectsFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const jijuHref = joinBasePath(baseUrl, 'jiju-pet');
  const etReportHubHref = joinBasePath(baseUrl, 'etreporthub');
  const etReportHubSalesHref = joinBasePath(baseUrl, 'etreporthub-sales');
  const pokerHref = joinBasePath(baseUrl, 'poker');

  return (
    <div className="page-shell projects-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="projects-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={homeHref} className="projects-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection
              compactLanguageOnSelection
            />
          </div>

          <header className="projects-hero py-16 md:py-24">
            <p className="projects-kicker">{isZh ? 'Projects / AI Build Systems' : 'Projects / AI Build Systems'}</p>
            <h1 className="projects-title mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Different builds. Same stubborn habit.' : 'Different builds. Same stubborn habit.'}
            </h1>
            <p className="projects-subtitle mt-5">
              {isZh
                ? 'Jiju、Friday Poker Club 和 ETReportHub。项目不一样，底下其实每次都是同一招：把一团乱的输入，变成真的能用的 system。'
                : 'Jiju, Friday Poker Club, and ETReportHub. Different projects, but underneath it’s the same move every time: take messy input and turn it into something you can actually use.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-5">
              <a href="#project-stack" className="projects-text-cta">
                {isZh ? '看项目合集' : 'View stack'} <span aria-hidden>›</span>
              </a>
              <a href="#etreporthub" className="projects-text-cta projects-text-cta-muted">
                {isZh ? '看 ETReportHub' : 'View ETReportHub'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section className="projects-bundle-panel">
            <div className="projects-bundle-copy">
              <p className="projects-kicker">{isZh ? 'Build operating system' : 'Build operating system'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '与其说是项目列表，不如说是我一直在搭的几套系统。' : 'Not really a project list — more a few systems I keep building.'}
              </h2>
              <p>
                {isZh
                  ? '不想把作品平铺成一张清单。这里留下的是三种一直重复出现的动作：发现、一起玩，以及把资料变成判断。'
                  : 'This is not a flat portfolio list. These builds repeat three moves: discovery, shared play, and turning information into judgment.'}
              </p>
            </div>
            <div className="projects-bundle-grid">
              {aiProjectSharedLogic.map((item) => (
                <article key={item.title.en} className="projects-logic-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="project-stack" className="projects-section py-16 md:py-24">
            <div className="projects-section-head">
              <p className="projects-kicker">{isZh ? 'Project stack' : 'Project stack'}</p>
              <h2 className="projects-section-title font-display font-bold tracking-tight">
                {isZh ? '三个慢慢长成系统的东西。' : 'Three things slowly turning into real systems.'}
              </h2>
            </div>
            <div className="projects-grid mt-12">
              {aiProjectSystems.map((project) => {
                const isJiju = project.href === 'jiju';
                const isETReportHub = project.title === 'ETReportHub';
                const isPoker = project.title === 'Friday Poker Club';
                const cardClassName = ['projects-card', isJiju ? 'projects-card-jiju' : ''].filter(Boolean).join(' ');
                const titleClassName = [
                  'projects-card-title font-display font-bold tracking-tight',
                  isETReportHub ? 'projects-card-title-compact' : '',
                  isPoker ? 'projects-card-title-stacked' : '',
                ].filter(Boolean).join(' ');
                const projectCssArt = getProjectCssArtByProjectTitle(project.title);
                const ProjectIcon = projectCssArt?.Component;
                const projectIcon = ProjectIcon ? <ProjectIcon label={projectCssArt.label[language]} /> : null;
                return (
                  <article key={project.title} id={project.href} className={cardClassName}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="projects-card-eyebrow">{project.eyebrow[language]}</p>
                      <span className="projects-status">{project.status[language]}</span>
                    </div>
                    <div className="projects-card-identity mt-5">
                      <div className="projects-card-icon-slot">{projectIcon}</div>
                      <div>
                        <div className="projects-card-title-row">
                          <h3 className={titleClassName}>
                            {isETReportHub ? (
                              <>
                                <span>ETReport</span>
                                <span>Hub</span>
                              </>
                            ) : (
                              project.title
                            )}
                          </h3>
                        </div>
                        <p className="projects-card-role">{project.role[language]}</p>
                      </div>
                    </div>
                    <p className="projects-card-summary">{project.summary[language]}</p>
                    <div className="projects-system-line">
                      <p className="projects-card-eyebrow">{isZh ? 'System layer' : 'System layer'}</p>
                      <p>{project.system[language]}</p>
                    </div>
                    <div className="projects-card-actions">
                      {isJiju && (
                        <a href={jijuHref} className="projects-text-cta">
                          {isZh ? '看构建记录' : 'View build log'} <span aria-hidden>›</span>
                        </a>
                      )}
                      {isPoker && (
                        <a href={pokerHref} className="projects-text-cta">
                          {isZh ? '看产品页' : 'View product page'} <span aria-hidden>›</span>
                        </a>
                      )}
                      {isETReportHub && (
                        <a href={etReportHubHref} className="projects-text-cta">
                          {isZh ? '看产品页' : 'View product page'} <span aria-hidden>›</span>
                        </a>
                      )}
                      {isETReportHub && (
                        <a href={etReportHubSalesHref} className="projects-text-cta projects-text-cta-muted">
                          {isZh ? '看售卖页' : 'View sales page'} <span aria-hidden>›</span>
                        </a>
                      )}
                      {project.external && (
                        <a
                          href={project.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects-text-cta projects-text-cta-muted"
                        >
                          {isZh ? '打开项目' : 'Open project'} <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="etreporthub" className="projects-section py-16 md:py-24">
            <div className="projects-section-head">
              <p className="projects-kicker">{isZh ? 'ETReportHub readout' : 'ETReportHub readout'}</p>
              <h2 className="projects-section-title font-display font-bold tracking-tight">
                {isZh ? '从导入，到分析，到下一步行动。' : 'From ingest, to analysis, to next action.'}
              </h2>
              <p className="projects-section-copy">
                {isZh
                  ? 'ETReportHub 的价值不是把数字排漂亮，而是把每天最容易出错的资料流变成可追踪、可解释、可导出、可以继续行动的系统。'
                  : 'ETReportHub is not about making numbers look pretty. It turns a fragile daily data flow into something traceable, explainable, exportable, and ready for the next action.'}
              </p>
            </div>
            <div className="projects-readout-grid mt-12">
              {(isZh
                ? [
                    ['Product Promise', '少一点人工对表，多一点可判断的运营系统。'],
                    ['Data Trust', 'Transaction 与 Customer Excel 按规则导入、标准化，并保留可复盘的资料层。'],
                    ['Operating Views', 'Performance、Members、Channels、Trends 和品牌对比，把日报变成判断。'],
                    ['Next Action', '会员分群、风险信号与留存区间，把资料变成下一步可以执行的动作。'],
                  ]
                : [
                    ['Product Promise', 'Less manual checking. More operating judgment.'],
                    ['Data Trust', 'Transaction and Customer Excel files are imported under rules, normalized, and kept reviewable.'],
                    ['Operating Views', 'Performance, Members, Channels, Trends, and brand comparison turn daily reporting into decisions.'],
                    ['Next Action', 'Member segments, risk signals, and retention buckets turn the data into a clear next move.'],
                  ]
              ).map(([label, copy]) => (
                <article key={label} className="projects-readout-card">
                  <p className="projects-card-eyebrow">{label}</p>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

type ProductSibling = {
  id: string;
  name: string;
  path: string;
  iconLabel: string;
  Icon: React.FC<{ label: string }>;
  blurb: { en: string; zh: string };
};

/** Cross-links shown in the "You might also like" row on every product page. */
const productSiblings: ProductSibling[] = [
  {
    id: 'life-os',
    name: 'Life OS',
    path: 'life-os',
    iconLabel: 'Life OS CSS app icon',
    Icon: ProjectsLifeOsCssIcon,
    blurb: { en: 'Build the long-term base map first. Then ask about right now.', zh: '先建立长期底图，再问当下的问题。' },
  },
  {
    id: 'etreporthub',
    name: 'ETReportHub',
    path: 'etreporthub',
    iconLabel: 'ETReportHub CSS app icon',
    Icon: ProjectsEtReportCssIcon,
    blurb: { en: 'Turn daily Excel into clear operating decisions.', zh: '把每日 Excel 变成清楚的运营判断。' },
  },
  {
    id: 'jiju',
    name: 'Jiju',
    path: 'jiju-pet',
    iconLabel: 'Jiju CSS app icon',
    Icon: ProjectsJijuCssIcon,
    blurb: { en: 'Find places that truly work for you and your pet.', zh: '找到真正适合你和宠物一起去的地方。' },
  },
  {
    id: 'poker',
    name: 'Friday Poker Club',
    path: 'poker',
    iconLabel: 'Friday Poker Club CSS app icon',
    Icon: ProjectsPokerCssIcon,
    blurb: { en: 'No place to book. Just bring the crew back.', zh: '不用约地点。把那群人叫回来就好。' },
  },
];

const productSiblingCards = (baseUrl: string, excludeId: string) =>
  productSiblings
    .filter((item) => item.id !== excludeId)
    .map((item) => ({
      href: joinBasePath(baseUrl, item.path),
      name: item.name,
      blurb: item.blurb,
      icon: <item.Icon label={item.iconLabel} />,
    }));

const ETReportHubFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  salesHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, salesHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const demoUrl = 'https://edent95.github.io/daily-report-dashboard/demo/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsEtReportCssIcon label="ETReportHub CSS app icon" />}
      name="ETReportHub"
      kicker={{ en: 'Data analytics · Business tool', zh: '数据分析 · 商业工具' }}
      tagline={{ en: 'Turn daily Excel into clear operating decisions.', zh: '把每日 Excel 变成清楚的运营判断。' }}
      meta={{ en: 'Private deployment · Local SQLite · Excel in, decisions out', zh: '私有部署 · 本地 SQLite · Excel 进，判断出' }}
      primary={{ href: demoUrl, external: true, label: { en: 'View demo', zh: '查看 Demo' } }}
      secondary={{ href: salesHref, label: { en: 'Launch offer', zh: '上线方案' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: demoUrl,
        domain: 'edent95.github.io/daily-report-dashboard/demo',
        title: { en: 'Interactive ETReportHub demo', zh: 'ETReportHub 互动 Demo' },
        caption: { en: 'The public demo, running right here. Open it in a new tab for the full workspace.', zh: '公开 Demo 直接跑在这里。想看完整工作区，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'ETReportHub is a data system for operations teams that still depend on daily Excel exports. It turns separate transaction and member files into one repeatable review workflow—without rebuilding formulas, reconciling numbers, and assembling reports every morning.', zh: 'ETReportHub 是为每日依赖 Excel 的运营团队设计的数据系统。它把分散的交易与会员文件整理成统一、可重复检查的工作流，让团队不必每天重新复制公式、对数字和拼报表。' } },
        { kind: 'p', text: { en: 'The point is not another dashboard. It is knowing sooner what changed, which members need action, where a channel is losing efficiency, and what the team should handle first.', zh: '重点不是多一个 Dashboard。重点是让团队更快知道：业绩哪里变了、哪些会员需要行动、哪个渠道正在失去效率，以及今天应该先处理什么。' } },
        { kind: 'h', text: { en: 'How it works', zh: '每天怎么用' } },
        { kind: 'steps', items: [
          { title: { en: 'Upload', zh: '上传' }, text: { en: 'Drop in the daily Transaction file and the latest Customer export.', zh: '拖入每日 Transaction 与最新 Customer 文件。' } },
          { title: { en: 'Reconcile', zh: '整理' }, text: { en: 'The system checks fields, resolves members, and prevents double counting.', zh: '系统校验字段、匹配会员并避免重复计算。' } },
          { title: { en: 'Decide', zh: '判断' }, text: { en: 'Review performance, members, channels, and trends for the signals that matter.', zh: '从业绩、会员、渠道和趋势里找到异常与机会。' } },
          { title: { en: 'Act', zh: '行动' }, text: { en: 'Export the report or the CRM audience with a clear next action.', zh: '导出报表或 CRM 名单，让下一步有明确对象。' } },
        ] },
        { kind: 'h', text: { en: 'What it changes day to day', zh: '它每天改变了什么' } },
        { kind: 'p', text: { en: 'The daily work happens once. Upload the Transaction and Customer Excel, and the system cleans, reconciles, and refreshes the reports instead of asking someone to redo it by hand.', zh: '每天的活只做一遍。上传 Transaction 与 Customer Excel，系统自动整理、去重并更新报表，而不是让人再手工做一次。' } },
        { kind: 'p', text: { en: 'What changed comes first. Deposits, withdrawals, net deposit, active members, and channel movement live in one decision surface, so the morning starts with the difference rather than the data entry.', zh: '先看到哪里不对。存款、提款、净存款、活跃会员和渠道变化集中在同一个判断界面，早上从「差异」开始，而不是从「录入」开始。' } },
        { kind: 'callout', label: { en: 'From report to action', zh: '从报表到行动' }, text: { en: 'Filter members by risk, activity, deposit recency, and conversion status—then export that exact list as the next CRM action instead of describing it in a meeting.', zh: '用风险、活跃度、存款时间和转化状态筛选会员，再把这份名单直接导出成下一个 CRM 动作，而不是在会议上口头描述。' } },
        { kind: 'p', text: { en: 'The familiar handoff stays. Management can still receive the Excel they expect, while the operations team gets a clearer dashboard for the daily review. Nobody has to be retrained into a new ritual.', zh: '熟悉的交付方式保留下来。管理层仍然可以收到他们习惯的 Excel，运营团队同时拥有更清楚的 Dashboard。没有人需要被重新训练成另一套仪式。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Data boundary', zh: '数据边界' }, text: { en: 'ETReportHub uses local SQLite and is designed for private deployment. Operational data does not need to enter a public cloud just to become visible in a dashboard. Access, audit, and exports remain inside the team’s own operating boundary.', zh: 'ETReportHub 使用本地 SQLite 保存整理后的数据，并为私有部署设计。原始运营资料不需要为了看 Dashboard 而进入公共云端。权限、审计与导出仍然属于团队自己的工作边界。' } },
      ]}
      faq={[
        { q: { en: 'What files does it take?', zh: '它接受什么文件？' }, a: { en: 'The daily Transaction export and the latest Customer export, both as Excel. Those are the files most operations teams already produce, so nothing upstream has to change.', zh: '每日 Transaction 导出和最新 Customer 导出，都是 Excel。这些本来就是大多数运营团队已经在产出的文件，上游流程不用改。' } },
        { q: { en: 'Where is my data stored?', zh: '数据存在哪里？' }, a: { en: 'In a local SQLite database inside your own deployment. Raw operational data does not have to leave your environment to become visible in a dashboard.', zh: '存在你自己部署环境里的本地 SQLite 数据库。原始运营数据不需要离开你的环境，就能在 Dashboard 上看到。' } },
        { q: { en: 'Does it replace our Excel reports?', zh: '它会取代我们的 Excel 报表吗？' }, a: { en: 'Only if you want it to. Export back to Excel stays supported, so management keeps the format they know while the team reviews the dashboard.', zh: '除非你希望如此。导出回 Excel 仍然支持，管理层保留熟悉的格式，团队则看 Dashboard 做复盘。' } },
        { q: { en: 'What happens if a member appears in two files?', zh: '同一个会员出现在两份文件里怎么办？' }, a: { en: 'The reconcile step matches members and prevents double counting, which is the part that usually breaks a hand-built spreadsheet.', zh: '整理步骤会匹配会员并避免重复计算——这恰好是手工表格最容易出错的地方。' } },
        { q: { en: 'Can I try it before deploying?', zh: '可以先试再部署吗？' }, a: { en: 'Yes. The public demo above runs the real interface with sample data, so you can walk the workflow before any deployment conversation.', zh: '可以。上面的公开 Demo 用示例数据跑真实界面，你可以先走一遍流程，再谈部署。' } },
        { q: { en: 'How do I get it running for my team?', zh: '怎么让我的团队用上？' }, a: { en: 'The launch offer page covers scope, deployment, and what a rollout looks like in practice.', zh: '上线方案页面写了范围、部署方式，以及实际推行会是什么样子。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Business intelligence and operations analytics', zh: '商业智能与运营分析' }],
        [{ en: 'Input', zh: '输入格式' }, { en: 'Transaction / Customer Excel', zh: 'Transaction / Customer Excel' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Performance · Members · Channels · Trends · CRM export', zh: '业绩 · 会员 · 渠道 · 趋势 · CRM 导出' }],
        [{ en: 'Storage', zh: '存储' }, { en: 'Local SQLite', zh: '本地 SQLite' }],
        [{ en: 'Deployment', zh: '部署方式' }, { en: 'Private deployment with local database', zh: '私有部署，本地数据库' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'etreporthub')}
    />
  );
};

const ETReportHubLegacyFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  salesHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, salesHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const tour = isZh
    ? [
        ['📋', '① 老板给你 Excel', '每天两份表：交易明细 + 会员名单'],
        ['📥', '② 拖进系统', '系统自动看懂、对账、去重'],
        ['🗄️', '③ 存进保险箱', 'SQLite 数据库保存当前状态和月度趋势快照'],
        ['📊', '④ 自动出报表', '业绩、会员、趋势全自动算'],
        ['📤', '⑤ 一键发老板', '导出熟悉格式的 Excel'],
        ['🧹', '⑥ 每月扫一次', '半年前的旧数据贴 warm 标签，不删，为上云预热'],
      ]
    : [
        ['📋', '① Boss hands you Excel', 'Two daily files: transactions + members'],
        ['📥', '② Drop into system', 'Auto-parsed, reconciled, deduped'],
        ['🗄️', '③ Locked in vault', 'SQLite stores current state and monthly trend snapshots'],
        ['📊', '④ Auto reports', 'Performance, members, trends — all computed'],
        ['📤', '⑤ Send to boss', 'Export back to familiar Excel'],
        ['🧹', '⑥ Monthly sweep', 'Old rows tagged as warm, not deleted, just prepped for the cloud'],
      ];
  const featureMap = isZh
    ? [
        ['数据导入', 'Excel 拖放上传、Customer 类型选择、SQLite 手动加载、后端上传、导入诊断、宽表 Excel 导出。', '后端可用时直接写 daily_report.db 并刷新 dashboard_cache.json；没有后端时写浏览器缓存 SQLite。'],
        ['业绩报表', 'Daily / Weekly / Overall 合并在同一页；交易明细可搜索、排序、导出；支持对比模式和会员存款 recency bucket。', '交易明细严格按交易日期；存款 recency bucket 是会员行为 cohort，点击打开会员明细弹窗。'],
        ['会员分析', '会员累计数据、风险分布、登录/存款 recency、留存、No Conversion 筛选、分页会员列表、CRM 导出。', 'Recency / retention 用全部当前非排除会员；No Conversion = Last Deposit Date 为空。'],
        ['分群分析', '按风险、层级、登录 recency、存款 recency、渠道、推荐人切分会员；支持分群明细弹窗。', '明细弹窗支持搜索、排序和导出，导出跟随当前弹窗搜索/排序。'],
        ['渠道分析', 'ReferrerID 归类、Unknown Referrers、渠道配置、渠道对比、ROI、注册转化、渠道明细弹窗。', '渠道配置在 Unknown Referrers 下方；新增渠道显示在最上方；默认只显示前 3 个渠道。'],
        ['趋势分析', '按日/周/月查看存款、提款、净存款、活跃会员和会员行为 bucket。', '活跃会员走势来自交易活动，并通过 user_id、phone+name、unique phone fallback 解析会员。'],
        ['品牌对比', '跨 brand 查看会员数、存款、提款、净存款、平均值和 bonus 等指标。', '所有 SQLite join 和导出都必须带 brand_id，避免跨品牌重复行。'],
        ['系统设置', '主题、语言、表格字段、图表指标、风险阈值、留存基准、recency bucket、排除会员、渠道设置。', '大部分设置按 brand 存储；会影响派生缓存并触发相关区块重算。'],
        ['系统管理', '用户、角色、权限、审计日志；审计 Metadata 显示白话文，中英文同步。', '审计日志 append-only；银行资料查看、渠道编辑、上传、导出、登录失败、改密等关键动作会记录。'],
      ]
    : [
        ['Data Ingest', 'Excel drag/drop upload, Customer type selection, manual SQLite load, backend upload, import diagnostics, and wide Excel export.', 'When backend is available, writes daily_report.db and refreshes dashboard_cache.json; otherwise writes browser-cached SQLite.'],
        ['Performance', 'Daily / Weekly / Overall live in one page; transaction details are searchable, sortable, and exportable; comparison mode and deposit-recency buckets are supported.', 'Transaction details are transaction-date based; deposit-recency buckets are member behavior cohorts and open member detail modals.'],
        ['Member Analysis', 'Member lifetime metrics, risk distribution, login/deposit recency, retention, No Conversion filter, paged member table, and CRM export.', 'Recency / retention use all current non-excluded members; No Conversion = blank Last Deposit Date.'],
        ['Segment Analysis', 'Segments members by risk, tier, login recency, deposit recency, channel, and referrer; segment detail modals are supported.', 'Detail modals support search, sorting, and export that follows the modal state.'],
        ['Channel Analysis', 'ReferrerID mapping, Unknown Referrers, Channel Setup, channel comparison, ROI, deposit conversion, and channel detail modals.', 'Channel Setup sits below Unknown Referrers; new channels appear at the top; only the first 3 channels show by default.'],
        ['Trend Analysis', 'Daily/weekly/monthly trends for deposits, withdrawals, net deposit, active members, and member behavior buckets.', 'Active-member trend comes from transaction activity and resolves members by user_id, phone+name, and unique phone fallback.'],
        ['Brand Comparison', 'Compares member counts, deposits, withdrawals, net deposit, averages, and bonus across brands.', 'All SQLite joins and exports must remain brand-scoped to prevent cross-brand duplication.'],
        ['System Settings', 'Theme, language, table fields, chart metrics, risk thresholds, retention basis, recency buckets, exclusions, and channel setup.', 'Most settings are brand-scoped and invalidate derived caches where needed.'],
        ['System Management', 'Users, roles, permissions, and audit logs; audit metadata is shown as human-readable text in both languages.', 'Audit log is append-only; bank views, channel edits, uploads, exports, login failures, password resets, and other key actions are recorded.'],
      ];
  const businessRules = isZh
    ? [
        ['Today / 日期锚点', '优先使用后端 /api/health 的 GMT+8 日期；没有后端时才 fallback 到最新交易日期，再 fallback 到浏览器 GMT+8。'],
        ['Customer 是 Lifetime 当前状态', 'Customer Excel 覆盖当前会员状态；绝对不能把多个 Customer 批次相加。Lifetime + date_to 只用于批次记录和月度趋势快照。'],
        ['Transaction 可叠加', 'Transaction 用 brand_id + transaction_id 去重，重复上传同一笔不会重复计算。'],
        ['提款是负数', '净存款和 Company Win Loss 都使用 Deposit Total + Withdaw Total；看起来一样不是 bug。'],
        ['行为 cohort 不等于交易明细', '会员/业绩中的登录或存款 recency bucket 是会员行为分析，不代表当前交易表应该有同样行数。'],
        ['弹窗表格规则', '所有明细弹窗 table 都应有搜索、排序，并且导出必须跟随当前弹窗搜索/排序。'],
      ]
    : [
        ['Today / date anchor', 'Prefer backend /api/health GMT+8 date; fallback to latest transaction date, then browser GMT+8.'],
        ['Customer is latest Lifetime state', 'Customer Excel overwrites current member state; never add Customer batches together. Lifetime + date_to is used for import history and monthly trend snapshots.'],
        ['Transaction append/upsert', 'Transactions dedupe by brand_id + transaction_id, so re-uploading the same transaction does not double count.'],
        ['Withdraw is negative', 'Net Deposit and Company Win Loss both use Deposit Total + Withdaw Total; matching values are not a bug.'],
        ['Behavior cohort is not transaction detail', 'Login/deposit recency buckets are member behavior analysis and do not imply the transaction table has the same number of rows.'],
        ['Modal table rule', 'Every detail modal table should have search, sorting, and export that follows the current modal search/sort.'],
      ];
  const dailyUpload = isZh
    ? [
        ['Transaction', '按 brand_id + transaction_id append/upsert；重复上传同一笔交易不会重复计算。', '趋势、业绩和交易明细永远按真实交易日期回看。'],
        ['Current Members', 'Customer Lifetime 文件更新 customers / customer_metrics 当前状态。', 'Dashboard 默认看到的是最新会员状态，不把历史批次金额相加。'],
        ['Monthly Trend Snapshot', 'Lifetime + date_to 会写入 customer_metrics_monthly，用于趋势和批次追踪；日常会员分析只看最新当前状态。', '保留 Customer 批次边界，同时让日常页面保持简单稳定。'],
      ]
    : [
        ['Transaction', 'Append/upsert by brand_id + transaction_id; re-uploading the same transaction does not double count.', 'Trends, Performance, and transaction details remain tied to true transaction dates.'],
        ['Current Members', 'The Customer Lifetime file updates current customers / customer_metrics state.', 'The Dashboard default view uses the latest member state and never adds Customer batches together.'],
        ['Monthly Trend Snapshot', 'Lifetime + date_to writes customer_metrics_monthly for trends and batch tracking; daily Member Analysis uses the latest current state.', 'Keeps Customer batch boundaries while keeping daily pages simple and stable.'],
      ];
  const operatingLoop = isZh
    ? [
        ['01', '上传 Transaction / Customer Excel。', '后端写 DB、刷新 cache、显示导入诊断；Transaction 去重叠加，Customer 更新当前状态并记录批次。', '如果有 unmatched / bank JSON error，先修数据再重传。'],
        ['02', '进入 Performance 检查 Today / Weekly / Overall。', '日期使用 GMT+8 anchor；交易明细按交易日期；recency bucket 可打开会员明细。', '用明细弹窗搜索、排序、导出需要跟进的会员。'],
        ['03', '进入 Member Analysis 选 No Conversion / 风险 / recency。', '会员列表分页显示，但导出读取完整筛选结果。', '下载 CRM 或筛选会员 CSV 做 conversion / retention campaign。'],
        ['04', '进入 Channel Analysis 修 Unknown Referrers。', 'Channel Setup 就在 Unknown Referrers 下方；新增渠道在最上方，默认只显示 3 个。', '保存规则后刷新渠道表现、转化率和 ROI。'],
        ['05', '使用 System Management 审计后台动作。', 'Metadata 显示白话文；原始 JSON 保留在 tooltip / CSV。', '需要调查时按 Action / User / Brand / 时间过滤并导出 CSV。'],
      ]
    : [
        ['01', 'Upload Transaction / Customer Excel.', 'Backend writes DB, refreshes cache, and shows diagnostics; Transaction dedupes/appends, while Customer updates current state and records the batch.', 'If unmatched rows or bank JSON errors exist, repair data and re-upload.'],
        ['02', 'Review Today / Weekly / Overall in Performance.', 'Dates use the GMT+8 anchor; transaction details follow transaction date; recency buckets open member details.', 'Use modal search/sort/export for members that need follow-up.'],
        ['03', 'Use Member Analysis filters such as No Conversion, risk, and recency.', 'The table is paged, but exports read the full filtered result set.', 'Download CRM or filtered member CSV for conversion / retention campaigns.'],
        ['04', 'Use Channel Analysis to resolve Unknown Referrers.', 'Channel Setup sits below Unknown Referrers; new channels appear first and only 3 show by default.', 'Save rules to refresh channel performance, conversion, and ROI.'],
        ['05', 'Audit operations in System Management.', 'Metadata is shown in plain language; raw JSON remains available in tooltip / CSV.', 'Filter by Action / User / Brand / time and export CSV when investigating.'],
      ];
  const flowBranches = isZh
    ? [
        ['Admin 上传 Excel', '每天上传 Transaction Excel；有 Customer Excel 时也一起上传。本地后端可直接接收原始 Excel 文件。'],
        ['Transaction Excel', '读取每一笔交易明细，标准化日期、金额、状态、Type，并用 User Name + Mobile / Phone fallback 匹配 user_id。'],
        ['Transaction Append / Upsert', '用 brand_id + transaction_id 去重；重复上传不会重复计算，transactions 表可持续叠加。'],
        ['Customer Excel', '代表 BO 导出的当前会员状态，不直接累加。Bank Detail JSON 会拆成 bank_details。'],
        ['Customer 类型', 'Unknown / Date Range / Lifetime。只有 Lifetime + date_to 会写入 customer_metrics_monthly。'],
        ['daily_report.db', 'SQLite 存储干净数据、最新会员指标、交易明细和月度快照；后端写入后同步刷新 dashboard_cache.json。'],
        ['Dashboard / Export', 'Dashboard 读取 SQLite 显示 Daily / Weekly / Overall / Members / Channels / Trends；export_wide.py 导出老板熟悉的 Excel 宽表。'],
      ]
    : [
        ['Admin uploads Excel', 'Transaction Excel can be uploaded daily; Customer Excel is uploaded when available. The local backend can receive the original Excel files directly.'],
        ['Transaction Excel', 'Reads each transaction record, normalizes dates, amounts, status, and type, and resolves user_id by User Name + Mobile with phone fallback.'],
        ['Transaction Append / Upsert', 'Deduplicates by brand_id + transaction_id so repeated uploads do not double count; the transactions table keeps accumulating records.'],
        ['Customer Excel', 'Represents the current BO member state and is not blindly accumulated. Bank Detail JSON is split into bank_details.'],
        ['Customer type', 'Unknown / Date Range / Lifetime. Only Lifetime + date_to writes into customer_metrics_monthly.'],
        ['daily_report.db', 'SQLite stores clean data, latest member metrics, transactions, and monthly snapshots; backend writes also refresh dashboard_cache.json.'],
        ['Dashboard / Export', 'Dashboard reads SQLite for Daily / Weekly / Overall / Members / Channels / Trends; export_wide.py creates the familiar wide Excel report.'],
      ];
  const completeNodeMap = isZh
    ? [
        {
          label: 'INPUT',
          title: '输入与接收',
          tone: 'brand',
          nodes: [
            ['01', 'Admin 上传', '每天上传 Transaction Excel；有 Customer Excel 时也一起上传。'],
            ['02', '后端 API / fallback', '优先走 /api/upload 写本地数据库；后端不可用时才使用浏览器 SQLite fallback。'],
          ],
        },
        {
          label: 'TRANSACTION PIPELINE',
          title: '交易流水链路',
          tone: 'success',
          nodes: [
            ['03', 'Transaction Excel', '交易明细是可叠加流水，负责真实交易日期、金额、状态和用户资料。'],
            ['04', 'Convert / Normalize', '标准化日期、金额、Type、status，并用 User Name + Mobile / Phone fallback 匹配 user_id。'],
            ['05', 'Append / Upsert', '用 brand_id + transaction_id 去重；重复上传同一笔不会重复计算。'],
            ['06', 'transactions', '写入 SQLite transactions 表，后续报表、趋势、明细和导出都从这里取交易事实。'],
          ],
        },
        {
          label: 'CUSTOMER PIPELINE',
          title: '会员当前状态链路',
          tone: 'warning',
          nodes: [
            ['07', 'Customer Excel', 'Customer 代表 BO 当前会员状态，不把多个批次金额相加。'],
            ['08', 'Convert / Normalize', '标准化会员字段；Bank Detail JSON 拆成 bank_details，坏 JSON 进入错误文件。'],
            ['09', 'Classify Export', 'Customer 类型为 Unknown / Date Range / Lifetime；只有 Lifetime + date_to 进入月度快照。'],
            ['10', 'Overwrite Current', '覆盖 customers + customer_metrics 的当前会员状态，让 Dashboard 默认看最新状态。'],
            ['11', 'Monthly Snapshot', '写入 customer_metrics_monthly，保留 Lifetime 批次边界和月度趋势。'],
          ],
        },
        {
          label: 'UNIFIED OUTPUT',
          title: '统一输出与维护',
          tone: 'neutral',
          nodes: [
            ['12', 'daily_report.db', 'SQLite 保存干净数据、当前会员指标、交易明细、银行资料和月度快照，并刷新 dashboard_cache.json。'],
            ['13', 'Dashboard', '读取 SQLite / cache，输出 Performance、Members、Channels、Trends、Brand Comparison。'],
            ['14', 'Excel Export', 'export_wide.py 或 /api/export/wide 输出老板熟悉的 Excel 宽表；CRM / Audit 也可导出。'],
            ['15', 'Tier Maintenance', 'tier_data.py 每月把 6 个月以上旧行标记为 warm；查询和导出仍默认看全表，为上云分区预留。'],
          ],
        },
      ]
    : [
        {
          label: 'INPUT',
          title: 'Input and receiving',
          tone: 'brand',
          nodes: [
            ['01', 'Admin Upload', 'Admins upload Transaction Excel daily; Customer Excel is uploaded when available.'],
            ['02', 'Backend API / fallback', 'Prefer /api/upload into the local database; use browser SQLite fallback only when backend is unavailable.'],
          ],
        },
        {
          label: 'TRANSACTION PIPELINE',
          title: 'Transaction pipeline',
          tone: 'success',
          nodes: [
            ['03', 'Transaction Excel', 'Transaction is the appendable ledger for true transaction date, amount, status, and user profile fields.'],
            ['04', 'Convert / Normalize', 'Normalize dates, amounts, Type, status, and resolve user_id through User Name + Mobile / Phone fallback.'],
            ['05', 'Append / Upsert', 'Dedupe by brand_id + transaction_id so repeated uploads do not double count.'],
            ['06', 'transactions', 'Write into SQLite transactions; reports, trends, details, and exports read transaction facts from here.'],
          ],
        },
        {
          label: 'CUSTOMER PIPELINE',
          title: 'Current member-state pipeline',
          tone: 'warning',
          nodes: [
            ['07', 'Customer Excel', 'Customer represents the current BO member state and must not be summed across batches.'],
            ['08', 'Convert / Normalize', 'Normalize member fields; split Bank Detail JSON into bank_details and send bad JSON to an error file.'],
            ['09', 'Classify Export', 'Customer type is Unknown / Date Range / Lifetime; only Lifetime + date_to writes monthly snapshots.'],
            ['10', 'Overwrite Current', 'Overwrite customers + customer_metrics so Dashboard defaults to the latest member state.'],
            ['11', 'Monthly Snapshot', 'Write customer_metrics_monthly to preserve Lifetime batch boundaries and monthly trends.'],
          ],
        },
        {
          label: 'UNIFIED OUTPUT',
          title: 'Unified output and maintenance',
          tone: 'neutral',
          nodes: [
            ['12', 'daily_report.db', 'SQLite stores clean data, current member metrics, transactions, bank details, and monthly snapshots, then refreshes dashboard_cache.json.'],
            ['13', 'Dashboard', 'Reads SQLite / cache and renders Performance, Members, Channels, Trends, and Brand Comparison.'],
            ['14', 'Excel Export', 'export_wide.py or /api/export/wide outputs the familiar wide Excel; CRM / Audit can also export.'],
            ['15', 'Tier Maintenance', 'tier_data.py marks rows older than 6 months as warm; queries and exports still read all data while preparing cloud partitioning.'],
          ],
        },
      ];
  const convertRows = isZh
    ? [
        ['Bank Detail JSON → bank_details', 'scripts/build_db.py · insert_bank_details()', '后台 ETL 把 Customer Excel 的 Bank Detail JSON 拆成独立银行账户表；坏 JSON 会写入 bank_details_errors.csv。'],
        ['API upload → SQLite', 'scripts/backend.py · /api/upload', '本地后端接收原始 Excel，调用 import_customer_export.py / import_transactions.py 写入 daily_report.db，再刷新 dashboard_cache.json。'],
        ['Browser upload → bank_details', 'assets/sqlite_loader.js · writeBrand()', 'Dashboard 内上传 Excel 时，也会把 Bank Detail 拆进 SQLite 的 bank_details。'],
        ['Customer row normalize', 'assets/app.js · normalizeCustomer()', '前端 fallback 模式会标准化 Customer 字段，并用 Deposit Total + Withdaw Total 计算 Win Loss。'],
        ['Transaction row normalize', 'assets/app.js · normalizeTransaction()', '前端 fallback 模式会标准化交易 ID、金额、日期、状态和用户资料。'],
      ]
    : [
        ['Bank Detail JSON → bank_details', 'scripts/build_db.py · insert_bank_details()', 'Backend ETL splits Customer Excel Bank Detail JSON into a separate bank account table; bad JSON goes to bank_details_errors.csv.'],
        ['API upload → SQLite', 'scripts/backend.py · /api/upload', 'The local backend receives raw Excel files, calls import_customer_export.py / import_transactions.py, writes daily_report.db, then refreshes dashboard_cache.json.'],
        ['Browser upload → bank_details', 'assets/sqlite_loader.js · writeBrand()', 'When Excel is uploaded inside the dashboard, Bank Detail is also split into SQLite bank_details.'],
        ['Customer row normalize', 'assets/app.js · normalizeCustomer()', 'Frontend fallback mode normalizes Customer fields and derives Win Loss as Deposit Total + Withdaw Total.'],
        ['Transaction row normalize', 'assets/app.js · normalizeTransaction()', 'Frontend fallback mode normalizes transaction ID, amount, dates, status, and user profile fields.'],
      ];
  const sqliteTables = isZh
    ? [
        ['customers', '会员基本资料'],
        ['bank_details', '银行资料，拆自 Bank Detail JSON'],
        ['transactions', '交易明细，带 tier 列：hot / warm'],
        ['customer_exports', 'Customer 上传批次'],
        ['customer_export_metrics', '每个批次的会员统计，带 tier 列'],
        ['customer_metrics_monthly', 'Lifetime 月度快照'],
      ]
    : [
        ['customers', 'Member attributes'],
        ['bank_details', 'Bank accounts parsed from Bank Detail JSON'],
        ['transactions', 'Transaction records with tier column: hot / warm'],
        ['customer_exports', 'Customer upload batches'],
        ['customer_export_metrics', 'Member metrics per batch with tier column'],
        ['customer_metrics_monthly', 'Lifetime monthly snapshots'],
      ];
  const optimization = isZh
    ? [
        ['当前瓶颈', 'Classic-script 全局协作仍存在加载顺序风险；会员分析的 risk、retention、bucket 仍重；Customer 最新状态、批次记录和 lifetime snapshot 的边界不能被优化破坏。'],
        ['已做优化', 'derivedMetricsCache、dashboard_cache.json、SQLite 规范化、分页窗口、局部刷新、页面拆分、reduced-motion 反馈已经落地。'],
        ['后续优先级', '继续把更重的聚合推进 SQLite / backend；补轻量 browser smoke test；系统性验证 390px / tablet / desktop 下的上传、报表、会员、渠道、趋势和 System Flow。'],
      ]
    : [
        ['Current bottlenecks', 'Classic-script globals still carry load-order risk; risk, retention, and bucket calculations remain heavy; Customer current state, import batches, and lifetime snapshots cannot be merged for speed.'],
        ['Completed optimizations', 'derivedMetricsCache, dashboard_cache.json, normalized SQLite, paged table windows, local refreshes, page splitting, and reduced-motion feedback are already in place.'],
        ['Live next priorities', 'Push heavier aggregation into SQLite/backend, add lightweight browser smoke tests, and verify Upload, Performance, Members, Channels, Trends, and System Flow at 390px / tablet / desktop.'],
      ];

  return (
    <div className="page-shell etreport-page etreport-product-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={projectsHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-store-hero">
            <div className="etreport-store-icon"><ProjectsEtReportCssIcon label="ETReportHub CSS app icon" /></div>
            <div className="etreport-store-intro">
              <p className="etreport-kicker">{isZh ? '数据分析 · 商业工具' : 'Data Analytics · Business Tool'}</p>
              <h1>ETReportHub</h1>
              <p className="etreport-store-tagline">{isZh ? '把每日 Excel 变成清楚的运营判断。' : 'Turn daily Excel into clear operating decisions.'}</p>
              <p className="etreport-store-byline">{isZh ? '由 Eden Tan 设计与构建' : 'Designed and built by Eden Tan'}</p>
              <div className="etreport-store-actions">
                <a href={salesHref} className="etreport-store-get">{isZh ? '查看方案' : 'View offer'}</a>
                <a href="#flow-map" className="etreport-text-cta">{isZh ? '了解系统' : 'Explore system'} <span aria-hidden>›</span></a>
              </div>
            </div>
          </header>

          <div className="etreport-store-facts" aria-label={isZh ? '产品资料' : 'Product information'}>
            <div><span>{isZh ? '工作流' : 'Workflow'}</span><strong>{isZh ? '每日上传' : 'Daily ingest'}</strong></div>
            <div><span>{isZh ? '存储' : 'Storage'}</span><strong>Local SQLite</strong></div>
            <div><span>{isZh ? '输出' : 'Outputs'}</span><strong>Dashboard + CRM</strong></div>
            <div><span>{isZh ? '部署' : 'Deployment'}</span><strong>{isZh ? '私有环境' : 'Private environment'}</strong></div>
          </div>

          <section className="etreport-store-gallery" aria-label={isZh ? '产品界面预览' : 'Product interface previews'}>
            {[
              [isZh ? '今天的业务，一眼看懂。' : 'See today’s business at a glance.', 'performance'],
              [isZh ? '找到需要行动的会员。' : 'Find the members who need action.', 'members'],
              [isZh ? '让渠道表现可以比较。' : 'Make channel performance comparable.', 'channels'],
            ].map(([caption, tone], index) => (
              <article className={`etreport-store-shot etreport-store-shot-${tone}`} key={tone}>
                <p>{caption}</p>
                <div className="etreport-shot-window" aria-hidden="true">
                  <div className="etreport-shot-sidebar"><i /><i /><i /><i /></div>
                  <div className="etreport-shot-canvas"><span>ETReportHub</span><b /><b /><b /><em /><em /></div>
                </div>
                <small>0{index + 1}</small>
              </article>
            ))}
          </section>

          <section className="etreport-console-panel">
            <div className="etreport-console-copy">
              <p className="etreport-kicker">{isZh ? '60 秒看懂这个系统' : '60-second tour'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '把每天两份 Excel，变成可复盘的运营层。' : 'Two daily Excel files become a reviewable operating layer.'}
              </h2>
              <p>
                {isZh
                  ? 'Transaction 负责真实交易流水，Customer 负责当前会员状态。系统把它们写进 SQLite，生成 Dashboard、趋势、会员分析、渠道分析和老板熟悉的 Excel 导出。'
                  : 'Transaction carries the real ledger. Customer carries current member state. The system writes both into SQLite, then generates dashboards, trends, member analysis, channel analysis, and familiar Excel exports.'}
              </p>
            </div>
            <div className="etreport-console-metrics">
              {[
                ['Input', 'Transaction + Customer Excel'],
                ['Storage', 'daily_report.db + dashboard_cache.json'],
                ['Reports', 'Performance / Members / Channels / Trends'],
                ['Export', 'CRM CSV / Wide Excel / Audit CSV'],
              ].map(([label, value]) => (
                <div key={label} className="etreport-console-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section id="flow-map" className="etreport-section py-16 md:py-24">
            <div className="etreport-tour-grid">
              {tour.map(([emoji, title, body]) => (
                <article key={title} className="etreport-value-card etreport-tour-card">
                  <div className="etreport-tour-emoji">{emoji}</div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="etreport-callout mt-8">
              {isZh
                ? '一句话总结：把 Excel 变成报表，数据存自己电脑；每天上传 Customer 会更新当前会员状态，Transaction 继续按交易 ID 去重叠加。'
                : 'In one line: Excel becomes reports and data stays on your computer; daily Customer uploads update current member state while Transactions keep append/upsert semantics.'}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '1. 系统目的' : '1. System Purpose'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? 'Excel 进来，SQLite 接住，Dashboard 输出判断。' : 'Excel comes in, SQLite holds it, Dashboard turns it into judgment.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '这个系统把 Admin 每天上传的 Excel 数据转换成结构化 SQLite 数据库，然后 Dashboard 从数据库读取数据，生成 Daily Report、Weekly Report、Overall Report、Member Analysis 和导出报表。'
                  : 'This system converts the daily Excel files uploaded by admins into a structured SQLite database. The dashboard then reads from that database to generate Daily, Weekly, Overall, Member Analysis, and export reports.'}
              </p>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '当前功能地图' : 'Current Feature Map'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '每个页面都有明确的数据责任。' : 'Every page owns a clear data responsibility.'}
              </h2>
            </div>
            <div className="etreport-table-wrap mt-12">
              <table className="etreport-system-table">
                <thead>
                  <tr>
                    <th>{isZh ? '模块' : 'Module'}</th>
                    <th>{isZh ? '核心功能' : 'Core features'}</th>
                    <th>{isZh ? '关键规则 / 输出' : 'Rules / outputs'}</th>
                  </tr>
                </thead>
                <tbody>
                  {featureMap.map(([module, features, rules]) => (
                    <tr key={module}>
                      <td><strong>{module}</strong></td>
                      <td>{features}</td>
                      <td>{rules}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="rules" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '当前业务规则' : 'Current Business Rules'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '这些规则比 UI 表象更重要，不能随意改。' : 'These rules matter more than the UI surface and must not drift.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {businessRules.map(([title, body]) => (
                <article key={title} className="etreport-proof-card">
                  <p className="etreport-card-eyebrow">{title}</p>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Daily Upload Flow' : 'Daily Upload Flow'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '日常导入只守住两个边界。' : 'Daily import keeps two boundaries clean.'}
              </h2>
            </div>
            <div className="etreport-table-wrap mt-12">
              <table className="etreport-system-table">
                <thead>
                  <tr>
                    <th>{isZh ? '层' : 'Layer'}</th>
                    <th>{isZh ? '每天上传时发生什么' : 'What happens on daily upload'}</th>
                    <th>{isZh ? '为什么需要' : 'Why it matters'}</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyUpload.map(([layer, action, why]) => (
                    <tr key={layer}>
                      <td><strong>{layer}</strong></td>
                      <td>{action}</td>
                      <td>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '运营闭环' : 'Operating Loop'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '从每日上传到 campaign 下载。' : 'From daily upload to campaign-ready exports.'}
              </h2>
            </div>
            <div className="etreport-table-wrap mt-12">
              <table className="etreport-system-table">
                <thead>
                  <tr>
                    <th>{isZh ? '步骤' : 'Step'}</th>
                    <th>{isZh ? '操作' : 'Action'}</th>
                    <th>{isZh ? '系统反馈' : 'System response'}</th>
                    <th>{isZh ? '下一步' : 'Next action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {operatingLoop.map(([step, action, response, next]) => (
                    <tr key={step}>
                      <td><strong>{step}</strong></td>
                      <td>{action}</td>
                      <td>{response}</td>
                      <td>{next}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '系统架构总览图' : 'System Architecture Flow'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '上传、存储、报表和导出的完整数据流。' : 'Full data flow across upload, storage, reporting, and export.'}
              </h2>
            </div>
            <div className="etreport-flow-board mt-12">
              {[
                ['01', isZh ? '输入' : 'Input', isZh ? 'Admin 上传 Excel，系统优先走本地 API；没有后端时才落到浏览器 fallback。' : 'Admins upload Excel files. The system prefers the local API and uses browser fallback only when needed.'],
                ['02', 'Transaction', isZh ? '按 brand_id + transaction_id 叠加 / 更新，重复上传不会重复计算。' : 'Append/upsert by brand_id + transaction_id so repeated uploads do not double count.'],
                ['03', 'Customer', isZh ? 'Customer 是 Lifetime；更新当前会员状态，并按 date_to 保留月度趋势快照。' : 'Customer is Lifetime; update current member state and keep monthly trend snapshots by date_to.'],
                ['04', isZh ? '输出' : 'Output', isZh ? 'SQLite 与 dashboard_cache 汇总后，供 Dashboard、分析页和 Excel 导出使用。' : 'SQLite plus dashboard_cache feed the Dashboard, analysis pages, and Excel export.'],
                ['05', isZh ? '维护' : 'Maintenance', isZh ? '每月跑 tier_data.py，把 6 个月以上旧行标记为 warm；查询与导出仍看全表。' : 'Run tier_data.py monthly to mark rows older than 6 months as warm; queries and exports still see the full table.'],
              ].map(([step, title, body]) => (
                <article key={step} className="etreport-flow-node">
                  <span>{step}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '完整节点图' : 'Complete Node Map'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '把原始 System Flow 的节点完整放回页面。' : 'The original System Flow nodes, kept intact in Eden’s layout.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '这张 map 不是 UI 装饰，而是系统边界：哪些数据可以叠加、哪些数据只能覆盖、哪些地方做转换、哪些输出必须可审计。'
                  : 'This map is not decoration. It defines the system boundary: what can append, what must overwrite, where conversion happens, and which outputs must remain auditable.'}
              </p>
            </div>
            <div className="etreport-node-map mt-12">
              {completeNodeMap.map((group) => (
                <article key={group.label} className={`etreport-node-column etreport-node-column-${group.tone}`}>
                  <div className="etreport-node-column-head">
                    <span>{group.label}</span>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="etreport-node-list">
                    {group.nodes.map(([step, title, body]) => (
                      <div key={`${group.label}-${step}`} className="etreport-node-item">
                        <span className="etreport-node-step">{step}</span>
                        <div>
                          <h4>{title}</h4>
                          <p>{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '流程细节' : 'Flow Details'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '每个分支的实际处理规则。' : 'Processing rules for each branch.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {flowBranches.map(([title, body]) => (
                <article key={title} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Convert 发生在哪里' : 'Where Convert Happens'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? 'Excel 原始字段进入 SQLite 前会先被标准化。' : 'Raw Excel fields are normalized before entering SQLite.'}
              </h2>
            </div>
            <div className="etreport-table-wrap mt-12">
              <table className="etreport-system-table">
                <thead>
                  <tr>
                    <th>{isZh ? '转换内容' : 'Conversion'}</th>
                    <th>{isZh ? '位置' : 'Location'}</th>
                    <th>{isZh ? '说明' : 'Notes'}</th>
                  </tr>
                </thead>
                <tbody>
                  {convertRows.map(([conversion, location, notes]) => (
                    <tr key={conversion}>
                      <td><strong>{conversion}</strong></td>
                      <td><code>{location}</code></td>
                      <td>{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-faq-panel">
              <div>
                <p className="etreport-kicker">{isZh ? 'SQLite + Win Loss' : 'SQLite + Win Loss'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '主表、分层存储和核心公式。' : 'Main tables, tiered storage, and the core formula.'}
                </h2>
                <p>
                  {isZh
                    ? '默认 tier=hot；scripts/tier_data.py 把 6 个月以上旧数据标记为 warm。所有查询/导出默认看全表，行为不变，为将来上云的分区/压缩预留。'
                    : 'Default tier=hot; scripts/tier_data.py marks rows older than 6 months as warm. All queries/exports read the full table by default, preserving behavior while preparing for future cloud partitioning/compression.'}
                </p>
              </div>
              <div className="etreport-faq-list">
                {sqliteTables.map(([table, meaning]) => (
                  <article key={table} className="etreport-faq-item">
                    <h3 className="font-display text-2xl font-bold tracking-tight"><code>{table}</code></h3>
                    <p>{meaning}</p>
                  </article>
                ))}
                <article className="etreport-faq-item">
                  <h3 className="font-display text-2xl font-bold tracking-tight">Company Win Loss = Deposit Total + Withdaw Total</h3>
                  <p>{isZh ? 'Withdraw 在数据里是负数，所以这里使用加法。Excel 的 Win Loss 只作为后台校验参考。' : 'Withdraw is stored as a negative value, so the formula uses addition. Excel Win Loss is only a backend validation reference.'}</p>
                </article>
              </div>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '系统优化路线图' : 'System Optimization Roadmap'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '当前瓶颈、已完成优化和仍待处理的真实优先级。' : 'Current bottlenecks, completed work, and live priorities.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {optimization.map(([title, body]) => (
                <article key={title} className="etreport-audience-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section pb-20 pt-10">
            <div className="etreport-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '这不是单页说明。它是系统边界。' : 'This is not a one-page explainer. It is the system boundary.'}
              </h2>
              <p>
                {isZh
                  ? 'System Flow 的价值是把数据语义、导入规则、报表边界、导出逻辑和未来优化路径写清楚。Eden 站这里只负责把它讲得更清楚、更像一个可对外展示的产品系统。'
                  : 'The value of System Flow is making data semantics, import rules, report boundaries, export logic, and future optimization paths explicit. This Eden page keeps that logic, but presents it as a public product system.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={salesHref} className="etreport-text-cta">
                  {isZh ? '看售卖页' : 'View sales page'} <span aria-hidden>›</span>
                </a>
                <a href={projectsHref} className="etreport-text-cta">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
                <a href={homeHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const ETReportHubSalesPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  productHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, productHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const linkedinHref = 'https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/';

  return (
    <div className="page-shell etreport-page etreport-sales-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={productHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回 ETReportHub' : 'Back to ETReportHub'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-hero py-16 text-center md:py-24">
            <p className="etreport-kicker mx-auto">{isZh ? 'ETReportHub / Sales Page' : 'ETReportHub / Sales Page'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Stop paying people to rebuild the same report every day.' : 'Stop paying people to rebuild the same report every day.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? 'ETReportHub 是给 iGaming operator / aggregator 的日报数据系统。它把 Transaction、Customer、会员、渠道、趋势、品牌对比和 CRM export 变成一个可复盘的运营层。'
                : 'ETReportHub is a daily-report data system for iGaming operators and aggregators. It turns Transaction, Customer, members, channels, trends, brand comparison, and CRM export into one reviewable operating layer.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#pricing" className="etreport-text-cta">
                {isZh ? '看价格' : 'View pricing'} <span aria-hidden>›</span>
              </a>
              <a href="#why-buy" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '为什么要买' : 'Why buy it'} <span aria-hidden>›</span>
              </a>
              <a href="#roi" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '算 ROI' : 'ROI logic'} <span aria-hidden>›</span>
              </a>
            </div>
            <div className="etreport-sales-proof-grid mx-auto mt-10">
              {etReportHubSalesProofStats.map((item) => (
                <article key={item.value.en} className="etreport-sales-proof-card">
                  <strong>{item.value[language]}</strong>
                  <span>{item.label[language]}</span>
                </article>
              ))}
            </div>
          </header>

          <section className="etreport-sales-hero-panel">
            <div>
              <p className="etreport-kicker">{isZh ? 'Buyer problem' : 'Buyer problem'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '报表不是小事。它决定团队每天相信什么。' : 'Reporting is not a small task. It decides what the team believes every day.'}
              </h2>
            </div>
            <div className="etreport-sales-price-strip">
              <div>
                <p>{isZh ? '上线套餐' : 'Launch package'}</p>
                <strong>RM4,890</strong>
                <span>{isZh ? '一次性' : 'one-time'}</span>
              </div>
            </div>
          </section>

          <section id="why-buy" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Why clients buy' : 'Why clients buy'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '客户买的不是页面，是少出错、少拖延、少靠人记。' : 'Clients are not buying a page. They are buying fewer errors, less delay, and less memory work.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {etReportHubBuyerPain.map((item) => (
                <article key={item.title.en} className="etreport-value-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="roi" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'ROI logic' : 'ROI logic'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '现场算给客户看：RM4,890 是否划算？' : 'Show the customer if RM4,890 makes sense.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '下面是保守估算，不是保证收益。假设每天省 2.5 小时、人工成本 RM25/小时、每月 26 个工作日，再加上 Bonus 控制和 CRM 跟进价值。'
                  : 'This is a conservative estimate, not a guaranteed return. It assumes 2.5 reporting hours saved per day, RM25/hour labor cost, 26 working days, plus bonus control and CRM follow-up value.'}
              </p>
            </div>
            <div className="etreport-roi-grid mt-12">
              {etReportHubRoiCards.map((item) => (
                <article key={item.label.en} className="etreport-roi-card">
                  <p className="etreport-card-eyebrow">{item.label[language]}</p>
                  <strong>{typeof item.value === 'string' ? item.value : item.value[language]}</strong>
                </article>
              ))}
            </div>
            <p className="etreport-roi-note">
              {isZh
                ? '销售讲法：说白了，一天省 2-4 小时，CRM 跟得上、bonus 不乱发，RM4,890 不只是买一个页面——是把原本烂在 Excel 和拍脑袋决定里的钱，捞回来。'
                : 'Sales angle: real talk — save 2-4 hours a day, keep CRM on top of it, stop over-handing bonus, and RM4,890 is not just buying a page. It is clawing back money that was quietly leaking into Excel and guesswork.'}
            </p>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What changes after buying' : 'What changes after buying'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '从每天整理数据，变成每天判断动作。' : 'Move from arranging data every day to deciding actions every day.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {etReportHubSalesOutcomes.map((item) => (
                <article key={item.label.en} className="etreport-sales-outcome-card">
                  <p className="etreport-card-eyebrow">{item.label[language]}</p>
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.metric[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Savings map' : 'Savings map'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '把卖点讲成客户每天会遇到的问题。' : 'Frame the value around the customer’s daily operating pain.'}
              </h2>
            </div>
            <div className="etreport-sales-table mt-12">
              <table>
                <thead>
                  <tr>
                    <th>{isZh ? '客户现在的问题' : 'Current customer problem'}</th>
                    <th>{isZh ? '系统怎么解决' : 'How the system helps'}</th>
                    <th>{isZh ? '可节省 / 改善' : 'Savings / improvement'}</th>
                  </tr>
                </thead>
                <tbody>
                  {etReportHubSavingsRows.map((row) => (
                    <tr key={row.problem.en}>
                      <td>{row.problem[language]}</td>
                      <td>{row.solution[language]}</td>
                      <td>{row.improvement[language]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What you get' : 'What you get'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '一套把日报、会员和 CRM 前置数据接起来的系统。' : 'A system connecting daily reports, member data, and CRM-ready outputs.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {etReportHubSalesDeliverables.map((item) => (
                <article key={item.title.en} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Included stack' : 'Included stack'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '系统里面有什么？' : 'What is included?'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '把功能讲成一个完整 BO operating stack：从上传、清洗、报表、CRM 行动，到备份、权限和上线交付。'
                  : 'Position it as a complete BO operating stack: upload, cleaning, reporting, CRM action, backup, access control, and handover.'}
              </p>
            </div>
            <div className="etreport-sales-table mt-12">
              <table>
                <thead>
                  <tr>
                    <th>{isZh ? '模块' : 'Module'}</th>
                    <th>{isZh ? '包含内容' : 'Included'}</th>
                    <th>{isZh ? '销售讲法' : 'Sales angle'}</th>
                  </tr>
                </thead>
                <tbody>
                  {etReportHubIncludedRows.map((row) => (
                    <tr key={row.module}>
                      <td>{row.module}</td>
                      <td>{row.included[language]}</td>
                      <td>{row.angle[language]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="pricing" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Pricing' : 'Pricing'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '一个清楚的上线价格。先把系统跑起来。' : 'One clear launch price. Get the system running first.'}
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-5">
              {etReportHubPricing.map((plan) => (
                <article key={plan.name.en} className="etreport-pricing-card">
                  <p className="etreport-card-eyebrow">{plan.name[language]}</p>
                  <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <strong className="font-display text-5xl font-bold tracking-tight md:text-7xl">{plan.price}</strong>
                    <span className="pb-2 text-lg font-semibold text-stone-500">{plan.suffix[language]}</span>
                  </div>
                  <p className="mt-5 text-lg font-semibold leading-snug text-stone-800">{plan.bestFor[language]}</p>
                  <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-stone-700">
                    {plan.points[language].map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-eden-mint" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-faq-panel">
              <div>
                <p className="etreport-kicker">{isZh ? 'Before buying' : 'Before buying'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '适合买，也要买得清楚。' : 'Buy it only when the operating problem is real.'}
                </h2>
              </div>
              <div className="etreport-faq-list">
                {etReportHubSalesFaq.map((item) => (
                  <article key={item.q.en} className="etreport-faq-item">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.q[language]}</h3>
                    <p>{item.a[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="etreport-section pb-20 pt-10">
            <div className="etreport-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '如果日报已经影响收入判断，就不要继续靠手感。' : 'If daily reports affect revenue decisions, do not keep relying on feel.'}
              </h2>
              <p>
                {isZh
                  ? '适合已经有稳定 Transaction / Customer 导出、需要更清楚 KPI、会员、渠道和 CRM 前置数据的团队。先谈数据结构，再谈部署方式。'
                  : 'Best for teams with stable Transaction / Customer exports that need clearer KPI, member, channel, and CRM-ready data. Start with data structure, then decide deployment.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={linkedinHref} target="_blank" rel="noreferrer" className="etreport-text-cta">
                  {isZh ? '联系讨论' : 'Discuss on LinkedIn'} <span aria-hidden>›</span>
                </a>
                <a href={productHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '看产品页' : 'View product page'} <span aria-hidden>›</span>
                </a>
                <a href={projectsHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
                <a href={homeHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const PokerFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const playUrl = 'https://poker.edentan.site/';
  const installUrl = 'https://poker.edentan.site/?install=1';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsPokerCssIcon label="Friday Poker Club CSS app icon" />}
      name="Friday Poker Club"
      kicker={{ en: 'Multiplayer game · Private table', zh: '多人游戏 · 私人牌局' }}
      tagline={{ en: 'No place to book. Just bring the crew back.', zh: '不用约地点。把那群人叫回来就好。' }}
      meta={{ en: 'Free · Play chips only · Runs in any browser', zh: '免费 · 只有娱乐筹码 · 浏览器直接开局' }}
      primary={{ href: playUrl, external: true, label: { en: 'Open a table', zh: '开一局' } }}
      secondary={{ href: installUrl, external: true, icon: <Download size={16} />, label: { en: 'Install app', zh: '安装 App' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: playUrl,
        domain: 'poker.edentan.site',
        title: { en: 'Interactive Friday Poker Club table', zh: 'Friday Poker Club 互动牌桌' },
        caption: { en: 'This is the real table, running right here. Open it in a new tab to bring the crew in.', zh: '这就是真的牌桌，直接跑在这里。想叫人来，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Friday Poker Club started with a simple problem: we still wanted to play, but not every Friday came with a host, a place, or the patience to install another game app. So I built a browser table—open a room, send the link, take a seat.', zh: 'Friday Poker Club 起点很简单：我们还是想一起打牌，但不是每个周五都有人能提供地点，也不是每个人都想安装另一个游戏 App。于是我做了一张浏览器牌桌——开房、发链接、坐下，就可以开始。' } },
        { kind: 'p', text: { en: 'I did not build it as a poker platform chasing strangers. It is for people who already know one another. Realtime play is the structure; the reason to return is the jokes, mistakes, silences, and moments that become part of the group later.', zh: '我没有把它做成一个追求陌生人流量的扑克平台。它服务的是已经认识彼此的人。实时牌局只是结构；真正让人回来的是桌边的玩笑、失误、沉默和那些之后还会被提起的瞬间。' } },
        { kind: 'h', text: { en: 'How it works', zh: '怎么玩' } },
        { kind: 'steps', items: [
          { title: { en: 'Host', zh: '开房' }, text: { en: 'Choose the table and stakes, then create a private room.', zh: '选择桌型和盲注，建立一个私人房间。' } },
          { title: { en: 'Invite', zh: '邀请' }, text: { en: 'Send one link to the crew. Nothing to install.', zh: '把链接发给那群人，不需要安装。' } },
          { title: { en: 'Buy in', zh: '买入' }, text: { en: 'Choose the stack, take a seat, and wait for the host.', zh: '选好筹码坐下，等待房主开局。' } },
          { title: { en: 'Keep the story', zh: '继续故事' }, text: { en: 'Play the hand, then remember the moment worth retelling.', zh: '打完这一手，再把值得讲的瞬间留下。' } },
        ] },
        { kind: 'h', text: { en: 'Designed for private games', zh: '为熟人局做的选择' } },
        { kind: 'p', text: { en: 'You should not have to wait until everyone is free. Open a room and drop the link in the group. Late arrivals and reconnects get absorbed by the table instead of forcing the whole night to restart.', zh: '不用等到所有人都有空。开一个房间，把链接丢进群里。有人晚到、有人重连，牌桌都应该接得住，而不是整局重来。' } },
        { kind: 'p', text: { en: 'It should feel like a home game, not a casino. The host starts, friends buy in, and the table keeps the conversation alive. It has the rules a real game needs without the pressure mechanics designed to keep people betting.', zh: '它应该像熟人局，不像线上赌场。房主开桌、朋友买入、桌边聊天。界面保留真正需要的规则，但不加入催促下注或制造焦虑的机制。' } },
        { kind: 'callout', label: { en: 'Note', zh: '注意' }, text: { en: 'Every action should feel certain. A bet confirms, the turn is obvious, and the room says what it is waiting for. Fewer misunderstandings make a better night.', zh: '每个动作都要让人放心。下注有没有成功、现在轮到谁、房间在等什么，都用清楚的状态回应。少一次误会，牌局就顺一点。' } },
        { kind: 'p', text: { en: 'And it should remember the people, not only the cards. We do not need another leaderboard to flex. What deserves to stay is who said what, when the whole table laughed, and why everyone wants another game.', zh: '它记住的应该是人，不只是牌。我们不需要另一份战绩炫耀榜。真正值得保存的是谁说了什么、哪一刻全桌笑了，以及下一次为什么还想再来。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Play chips only', zh: '只有娱乐筹码' }, text: { en: 'Invite links control who enters, and the host decides when the game begins. Chips have no cash value, and there is no deposit or withdrawal. The system can remember table state without turning a night between friends into public performance or financial play.', zh: '邀请链接决定谁能进来，房主决定何时开桌。筹码没有现金价值，也没有充值或提现。系统可以记住牌局状态，但不应该把朋友之间的晚上变成公开表演或金钱交易。' } },
      ]}
      faq={[
        { q: { en: 'Do I need to install anything?', zh: '需要安装什么吗？' }, a: { en: 'No. It runs in any modern browser—open the link and take a seat. If you would rather have it on your home screen, the Install app button adds it as a standalone app.', zh: '不需要。它跑在任何现代浏览器里——打开链接就能坐下。如果你想放到主屏幕，点「安装 App」就会变成独立应用。' } },
        { q: { en: 'Is real money involved?', zh: '会牵涉真钱吗？' }, a: { en: 'Never. Chips are play chips with no cash value. There is no deposit, no withdrawal, and no payout of any kind.', zh: '完全不会。筹码是娱乐筹码，没有现金价值。没有充值、没有提现，也没有任何形式的派彩。' } },
        { q: { en: 'Can strangers find my table?', zh: '陌生人会找到我的牌桌吗？' }, a: { en: 'No. Rooms are private and reachable only through the invite link you send. The host still decides when the hand actually begins.', zh: '不会。房间是私人的，只能通过你发出的邀请链接进入。何时真正开牌，仍然由房主决定。' } },
        { q: { en: 'What happens if someone loses connection?', zh: '有人断线了会怎样？' }, a: { en: 'The table keeps its state. A player who drops can reopen the link and return to the same seat and stack instead of restarting the night.', zh: '牌桌会保留状态。掉线的人重新打开链接，就能回到原来的座位和筹码，而不是整晚重来。' } },
        { q: { en: 'Is there voice chat?', zh: '有语音吗？' }, a: { en: 'Voice is optional. Some nights the group talks the whole way through; some nights nobody turns it on. The table works either way.', zh: '语音是可选的。有些晚上大家一路在聊，有些晚上没人开。牌桌两种情况都能用。' } },
        { q: { en: 'What is it built with?', zh: '用什么做的？' }, a: { en: 'A responsive browser table with Firebase keeping seats, actions, and reconnects in sync. There are build notes in the wiki if you want the details.', zh: '一张响应式浏览器牌桌，用 Firebase 让座位、动作和重连保持同步。想看细节的话，wiki 里有开发笔记。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Private multiplayer game', zh: '私人多人游戏' }],
        [{ en: 'Game', zh: '游戏' }, { en: 'Texas Hold’em · 8/9 mini game', zh: 'Texas Hold’em · 8/9 小游戏' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Rooms · Invites · Buy-ins · Realtime table · Optional voice', zh: '房间 · 邀请 · 买入 · 实时牌桌 · 可选语音' }],
        [{ en: 'Realtime', zh: '同步' }, { en: 'Firebase', zh: 'Firebase' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive browser table', zh: '响应式浏览器牌桌' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'poker')}
    />
  );
};

const PokerLegacyFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const playUrl = 'https://poker.edentan.site/';
  const wikiHref = joinBasePath(baseUrl, 'wiki');

  return (
    <div className="page-shell etreport-page poker-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={projectsHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-hero py-16 text-center md:py-24">
            <p className="etreport-kicker mx-auto">{isZh ? 'Friday Poker Club' : 'Friday Poker Club'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '周五夜，还是那群人，现在装进一条链接里。' : 'Friday night, same crew, now in a link.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? '一张浏览器德州桌，做出来就是让我们这群人能一直打下去——没人需要当东道主、装软件，或者开车去谁家。筹码是假的，故事是真的。'
                : 'A browser poker table built so our crew can keep playing — nobody has to host, install anything, or drive to anyone’s place. The chips are fake. The stories are not.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href={playUrl} target="_blank" rel="noopener noreferrer" className="etreport-text-cta">
                {isZh ? '开一局' : 'Open a table'} <ExternalLink size={15} />
              </a>
              <a href="#avatar-guide" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '认识这群人' : 'Meet the crew'} <span aria-hidden>›</span>
              </a>
              <a href="#story" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '看桌上故事' : 'Read the stories'} <span aria-hidden>›</span>
              </a>
              <a href="#knowledge" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '看知识库' : 'Open the knowledge base'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section id="how" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '怎么玩' : 'How it works'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '开个链接就能打，没那么多规矩。' : 'Open a link and play. No fuss.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {pokerValueProps.map((item) => (
                <article key={item.title.en} className="etreport-value-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="modules" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '桌上能干嘛' : 'What you can do' }</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '真的德州，加一点乱来。' : 'Real Hold’em, plus a little chaos.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {pokerModules.map((item) => (
                <article key={item.title} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="knowledge" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Knowledge base' : 'Knowledge base'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '这张牌桌，也是一组可复用 skills。' : 'This table is also a reusable skill archive.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? 'Friday Poker Club 不只是一条游戏链接。它把 Vite、背景音乐、按钮反馈、Firebase lifetime storage 和产品判断，沉淀成以后能继续复用的 skills。'
                  : 'Friday Poker Club is not only a game link. It turns Vite, background music, button feedback, Firebase lifetime storage, and product judgment into reusable skills for the wider knowledge base.'}
              </p>
            </div>
            <div className="poker-wiki-grid mt-12">
              {wikiEntries.map((entry) => (
                <a key={entry.slug} href={joinBasePath(baseUrl, `wiki/${entry.slug}`)} className={`poker-wiki-card ${getWikiToneClassName(entry.slug)}`}>
                  <WikiEntryVisual entry={entry} language={language} />
                  <span className="poker-wiki-eyebrow">{entry.eyebrow[language]}</span>
                  <h3 className="poker-wiki-card-title">{entry.title[language]}</h3>
                  <p>{entry.summary[language]}</p>
                  <span className="poker-wiki-link">{isZh ? '打开笔记' : 'Open note'} <span aria-hidden>›</span></span>
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-5">
              <a href={wikiHref} className="etreport-text-cta">
                {isZh ? '打开知识库总览' : 'Open knowledge index'} <span aria-hidden>›</span>
              </a>
            </div>
          </section>

          <section id="avatar-guide" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Avatar guide' : 'Avatar guide'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '坐在桌上的人，本身就是故事。' : 'The people at the table are the story.'}
              </h2>
              <p className="etreport-section-copy">{pokerAvatarGroupIntro[language]}</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {pokerAvatarGuide.map((item) => (
                <article key={item.id} className="poker-avatar-card">
                  <div className="poker-avatar-portrait">
                    <img
                      src={joinBasePath(baseUrl, `poker-avatars/${item.id}.png`)}
                      alt={`${item.code.en} — ${item.code.zh}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="poker-avatar-body">
                    <h3 className="poker-avatar-name">{item.code[language]}</h3>
                    <p className="poker-avatar-phrase">“{item.phrase[language]}”</p>
                    <p className="poker-avatar-tags">{item.tags[language]}</p>
                    <p className="poker-avatar-intro">{item.intro[language]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="story" className="etreport-section py-16 md:py-24">
            <div className="poker-story-panel">
              <div className="poker-story-head">
                <p className="etreport-kicker">{isZh ? 'Story log' : 'Story log'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '在这张桌上发生过的故事。' : 'Stories that happened at this table.'}
                </h2>
                <p className="poker-story-intro">{pokerStoryIntro[language]}</p>
              </div>
              <div className="poker-story-list">
                {pokerStories.map((item) => (
                  <article key={item.date} className="poker-story-item">
                    <p className="poker-story-date">{item.date}</p>
                    <h3 className="poker-story-title font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {item.title[language]}
                    </h3>
                    <p className="poker-story-body">{item.body[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="etreport-section pb-20 pt-10">
            <div className="etreport-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '别光看了，开一局吧。' : 'Stop reading. Open a hand.'}
              </h2>
              <p>
                {isZh
                  ? 'poker.edentan.site 一点就进。单人桌秒开，公开桌等人到齐房主点开始。筹码是假的，赢了别太得意——故事才是真的。'
                  : 'poker.edentan.site, one click and you’re in. Solo tables start instantly, public ones start when the crew shows up. The chips are fake — don’t get too smug. The stories are what stick.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={playUrl} target="_blank" rel="noopener noreferrer" className="etreport-text-cta">
                  {isZh ? '打开 poker.edentan.site' : 'Open poker.edentan.site'} <ExternalLink size={15} />
                </a>
                <a href={projectsHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
                <a href={homeHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

type WikiEntry = (typeof wikiEntries)[number];

const getWikiToneClassName = (slug: WikiEntry['slug']) => `wiki-tone wiki-tone-${slug}`;

const wikiCssIconBySlug: Record<WikiEntry['slug'], CssArtComponent> = {
  vite: WikiViteCssIcon,
  'background-music': WikiBackgroundMusicCssIcon,
  'button-feedback': WikiButtonFeedbackCssIcon,
  'firebase-lifetime-storage': WikiFirebaseStorageCssIcon,
  skills: WikiSkillsCssIcon,
  'rag-flow': WikiRagFlowCssIcon,
};

const WikiEntryVisual: React.FC<{
  entry: WikiEntry;
  language: Language;
  variant?: 'card' | 'note';
}> = ({ entry, language, variant = 'card' }) => {
  const Icon = wikiCssIconBySlug[entry.slug];
  const baseClassName = variant === 'note' ? 'poker-wiki-note-visual' : 'poker-wiki-visual';

  return (
    <span className={`${baseClassName} poker-wiki-css-icon`}>
      <Icon label={entry.title[language]} />
    </span>
  );
};

type SkillDraft = {
  id: string;
  sourceSlug: string;
  title: string;
  trigger: string;
  reusableRule: string;
  procedure: string[];
  checks: string[];
  sourceProject: string;
  antiPatterns: string[];
  sources: string[];
  tags: string[];
  status: 'draft' | 'reviewed' | 'active' | 'retired' | 'superseded';
  createdAt: string;
};

const SKILL_DRAFTS_STORAGE_KEY = 'eden-wiki-skill-drafts';

const readStoredSkillDrafts = (): SkillDraft[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SKILL_DRAFTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStoredSkillDrafts = (drafts: SkillDraft[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SKILL_DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    // ignore local persistence failures
  }
};

const wikiSkillTagsBySlug: Record<string, string[]> = {
  vite: ['Vite', 'React', 'TypeScript', 'Build loop', 'AI workflow'],
  'background-music': ['UX', 'Audio', 'Presence', 'Game feel'],
  'button-feedback': ['UX feedback', 'Microinteraction', 'Realtime UI'],
  'firebase-lifetime-storage': ['Firebase', 'Realtime state', 'Storage', 'Schema'],
  skills: ['Knowledge base', 'Skill design', 'Workflow'],
  'rag-flow': ['RAG', 'Tag registry', 'Knowledge architecture', 'Metadata'],
};

const wikiSourceProjectBySlug: Record<string, string> = {
  vite: 'Jiju / Friday Poker Club / Eden Vite apps',
  'background-music': 'Friday Poker Club',
  'button-feedback': 'Friday Poker Club',
  'firebase-lifetime-storage': 'Friday Poker Club',
  skills: 'Eden Knowledge Base',
  'rag-flow': 'Eden Knowledge Base',
};

const wikiAntiPatternsBySlug: Record<string, Record<Language, string[]>> = {
  vite: {
    en: [
      'Treating Vite dev server success as production proof.',
      'Skipping typecheck because the page appears to work.',
      'Ignoring broken assets or route/base-path issues until deployment.',
    ],
    zh: [
      '把 Vite dev server 正常当成 production 正确证明。',
      '因为页面能跑就跳过 typecheck。',
      '等到部署时才处理 broken assets、route 或 base path 问题。',
    ],
  },
  'background-music': {
    en: [
      'Autoplaying sound without visible control.',
      'Using music as decoration instead of mood support.',
      'Forgetting to remember the user sound preference.',
    ],
    zh: [
      '没有明显控制入口就自动播放声音。',
      '把音乐当装饰，而不是支撑场景气氛。',
      '不记住用户的声音偏好。',
    ],
  },
  'button-feedback': {
    en: [
      'Letting a click feel silent after a realtime action.',
      'Allowing repeated clicks while a remote action is pending.',
      'Showing no accepted, blocked, or failed state after the action.',
    ],
    zh: [
      '实时动作点了之后没有任何反馈。',
      '远端动作 pending 时仍允许用户重复点击。',
      '动作后不显示已接受、被挡住或失败状态。',
    ],
  },
  'firebase-lifetime-storage': {
    en: [
      'Persisting everything without cleanup rules.',
      'Letting game state become scattered flags instead of a schema.',
      'Treating persistence as only a backend concern.',
    ],
    zh: [
      '什么都持久化，但没有 cleanup 规则。',
      '让游戏状态散成一堆 flags，而不是形成 schema。',
      '把持久化只当后端问题，不当产品决策。',
    ],
  },
  skills: {
    en: [
      'Saving notes as skills without trigger, procedure, checks, or source.',
      'Publishing generated skills without user review.',
      'Mixing raw memory with executable instruction.',
    ],
    zh: [
      '把普通笔记直接当 skill 存，缺少触发场景、步骤、检查和来源。',
      'AI 生成后不经 user review 就发布 skill。',
      '把 raw memory 和 executable instruction 混在一起。',
    ],
  },
  'rag-flow': {
    en: [
      'Using a vector database as the source of truth.',
      'Letting tags become uncontrolled hashtags.',
      'Returning RAG answers without source links or metadata filters.',
    ],
    zh: [
      '把 vector database 当成 source of truth。',
      '让 tags 变成不受控的 hashtags。',
      'RAG 回答不带 source links，也不使用 metadata filters。',
    ],
  },
};

const createSkillDraftFromWikiEntry = (entry: WikiEntry, language: Language, sourceHref: string): SkillDraft => {
  const firstSection = entry.sections[0];
  const secondSection = entry.sections[1];
  const procedure = firstSection?.points[language].slice(0, 4) ?? [entry.thesis[language]];
  const checks = secondSection?.points[language].slice(0, 4) ?? [entry.summary[language]];

  return {
    id: `${entry.slug}-${Date.now()}`,
    sourceSlug: entry.slug,
    title: entry.title[language],
    trigger: entry.summary[language],
    reusableRule: entry.thesis[language],
    procedure,
    checks,
    sourceProject: wikiSourceProjectBySlug[entry.slug] ?? 'Eden Knowledge Base',
    antiPatterns: wikiAntiPatternsBySlug[entry.slug]?.[language] ?? [entry.summary[language]],
    sources: [sourceHref],
    tags: wikiSkillTagsBySlug[entry.slug] ?? ['Wiki', 'Reusable skill'],
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
};

const WikiPage: React.FC<{
  entry?: WikiEntry;
  homeHref: string;
  projectsHref: string;
  pokerHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ entry, homeHref, projectsHref, pokerHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const wikiHref = joinBasePath(baseUrl, 'wiki');
  const notesHref = joinBasePath(baseUrl, 'notes');
  const isPublishedNote = Boolean(entry && publishedNotes.some((note) => note.href === `wiki/${entry.slug}`));
  const [skillDrafts, setSkillDrafts] = React.useState<SkillDraft[]>(() => readStoredSkillDrafts());
  const latestDraft = entry ? skillDrafts.find((draft) => draft.sourceSlug === entry.slug) : undefined;
  const isSkillsIndex = !entry || entry.slug === 'skills';
  const highlightSections = entry
    ? entry.sections.slice(0, 3).map((section) => ({
        title: section.title[language],
        point: section.points[language][0],
      }))
    : [];

  const handleTurnIntoSkill = () => {
    if (!entry) return;
    const sourceHref = joinBasePath(baseUrl, `wiki/${entry.slug}`);
    const nextDraft = createSkillDraftFromWikiEntry(entry, language, sourceHref);
    const nextDrafts = [nextDraft, ...skillDrafts.filter((draft) => draft.sourceSlug !== entry.slug)];
    setSkillDrafts(nextDrafts);
    writeStoredSkillDrafts(nextDrafts);
  };

  if (entry && isPublishedNote) {
    return (
      <div className={`page-shell notes-article-page ${getWikiToneClassName(entry.slug)} min-h-screen`}>
        <main className="notes-article-main">
          <div className="notes-article-island">
            <div className="notes-topbar">
              <a href={notesHref} className="notes-back-link">
                <ArrowLeft size={17} />
                {isZh ? '返回 Notes' : 'Back to Notes'}
              </a>
              <HeaderControls
                language={language}
                setLanguage={setLanguage}
                themePreference={themePreference}
                theme={theme}
                setThemePreference={setThemePreference}
                compactThemeOnSelection
                compactLanguageOnSelection
              />
            </div>

            <header className="notes-article-hero">
              <div className="notes-article-mark">
                <WikiEntryVisual entry={entry} language={language} variant="note" />
              </div>
              <p className="notes-eyebrow">{entry.eyebrow[language]}</p>
              <h1>{entry.title[language]}</h1>
              <p className="notes-article-deck">{entry.summary[language]}</p>
            </header>

            <article className="notes-article-body">
              <blockquote className="notes-article-thesis">
                <span>{isZh ? 'Core thesis' : 'Core thesis'}</span>
                <p>{entry.thesis[language]}</p>
              </blockquote>

              <div className="notes-article-sections">
                {entry.sections.map((section, index) => (
                  <section key={section.title.en} className="notes-article-section">
                    <div className="notes-article-section-number">{String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <h2>{section.title[language]}</h2>
                      <div className="notes-article-points">
                        {section.points[language].map((point) => <p key={point}>{point}</p>)}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <footer className="notes-article-footer">
              <p>{isZh ? '继续阅读 Eden 的文章与 build notes' : "Keep reading Eden's essays and build notes"}</p>
              <a href={notesHref}>{isZh ? '回到全部 Notes' : 'View all Notes'} <span aria-hidden>→</span></a>
            </footer>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell etreport-page poker-page wiki-page poker-wiki-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={pokerHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回 Poker page' : 'Back to Poker page'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-hero poker-wiki-hero py-16 text-center md:py-24">
            <p className="etreport-kicker mx-auto">
              {entry ? entry.eyebrow[language] : isZh ? 'Eden Knowledge Base' : 'Eden Knowledge Base'}
            </p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {entry ? entry.title[language] : isZh ? '把项目经验做成可复用知识库。' : 'Turning project experience into reusable knowledge.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {entry
                ? entry.summary[language]
                : isZh
                  ? '这里记录多个项目里真正可复用的东西：Vite 构建经验、声音体验、按钮反馈、Firebase lifetime storage，以及这些东西如何变成 skills。'
                  : 'A place for reusable knowledge across projects: Vite build practice, sound experience, button feedback, Firebase lifetime storage, and the skills behind them.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href={wikiHref} className="etreport-text-cta">
                {isZh ? '知识库总览' : 'Knowledge index'} <span aria-hidden>›</span>
              </a>
              <a href={projectsHref} className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
              </a>
              <a href={homeHref} className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          {entry ? (
            <article className={`poker-wiki-note ${getWikiToneClassName(entry.slug)}`}>
              <div className="poker-wiki-note-lead">
                <WikiEntryVisual entry={entry} language={language} variant="note" />
                <div>
                  <p className="etreport-kicker">{isZh ? 'Core thesis' : 'Core thesis'}</p>
                  <blockquote className="wiki-quote-bar">
                    <p>{entry.thesis[language]}</p>
                  </blockquote>
                </div>
              </div>
              <div className="wiki-skill-action">
                <div>
                  <p className="etreport-kicker">{isZh ? 'Skill candidate' : 'Skill candidate'}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {isZh ? '把这篇 note 变成 Skill Card' : 'Turn this note into a Skill Card'}
                  </h3>
                  <p>
                    {isZh
                      ? '生成 draft，先看重点字段，再决定要不要保留。'
                      : 'Create a draft. Review the key fields before keeping it.'}
                  </p>
                </div>
                <button type="button" className="wiki-skill-button" onClick={handleTurnIntoSkill}>
                  {latestDraft ? (isZh ? '重新生成 Skill' : 'Regenerate skill') : isZh ? 'Turn into Skill' : 'Turn into Skill'}
                </button>
              </div>
              {latestDraft && (
                <div className="wiki-skill-preview">
                  <div className="wiki-skill-preview-head">
                    <p className="etreport-kicker">{isZh ? 'Draft Skill Card' : 'Draft Skill Card'}</p>
                    <span>{latestDraft.status}</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-tight">{latestDraft.title}</h3>
                  <div className="wiki-skill-summary-grid">
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '触发场景' : 'Trigger'}</strong>
                      {latestDraft.trigger}
                    </p>
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '可复用规则' : 'Reusable rule'}</strong>
                      {latestDraft.reusableRule ?? entry.thesis[language]}
                    </p>
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '来源项目' : 'Source project'}</strong>
                      {latestDraft.sourceProject ?? wikiSourceProjectBySlug[entry.slug] ?? 'Eden Knowledge Base'}
                    </p>
                  </div>
                  <div className="wiki-skill-preview-grid">
                    <div>
                      <h4>{isZh ? '执行步骤' : 'Procedure'}</h4>
                      <ul>
                        {latestDraft.procedure.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '检查方式' : 'Checks'}</h4>
                      <ul>
                        {latestDraft.checks.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '反模式' : 'Anti-patterns'}</h4>
                      <ul>
                        {(latestDraft.antiPatterns ?? wikiAntiPatternsBySlug[entry.slug]?.[language] ?? []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '来源链接' : 'Sources'}</h4>
                      <ul>
                        {latestDraft.sources.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="wiki-skill-tags">
                    {latestDraft.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="wiki-key-points">
                <p className="etreport-kicker">{isZh ? 'Key points' : 'Key points'}</p>
                <div className="wiki-key-point-grid">
                  {highlightSections.map((section) => (
                    <section key={section.title} className="wiki-key-point-card">
                      <h3 className="font-display text-2xl font-bold tracking-tight">{section.title}</h3>
                      <p>{section.point}</p>
                    </section>
                  ))}
                </div>
              </div>
              <details className="wiki-detail-drawer">
                <summary>{isZh ? '展开完整笔记' : 'Show full note'}</summary>
                <div className="poker-wiki-note-sections">
                  {entry.sections.map((section) => (
                    <section key={section.title.en} className="poker-wiki-note-section">
                      <h3 className="font-display text-2xl font-bold tracking-tight">{section.title[language]}</h3>
                      <ul>
                        {section.points[language].map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </details>
              {isSkillsIndex && skillDrafts.length > 0 && (
                <div className="wiki-skill-library">
                  <p className="etreport-kicker">{isZh ? 'Local skill drafts' : 'Local skill drafts'}</p>
                  <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                    {isZh ? '你已经生成的 Skill Cards。' : 'Skill Cards generated from the wiki.'}
                  </h2>
                  <div className="wiki-skill-library-grid">
                    {skillDrafts.map((draft) => (
                      <article key={draft.id} className="wiki-skill-library-card">
                        <div className="wiki-skill-preview-head">
                          <p>{draft.sourceSlug}</p>
                          <span>{draft.status}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold tracking-tight">{draft.title}</h3>
                        <p><strong>{isZh ? '触发场景：' : 'Trigger: '}</strong>{draft.trigger}</p>
                        <p><strong>{isZh ? '来源项目：' : 'Source project: '}</strong>{draft.sourceProject ?? wikiSourceProjectBySlug[draft.sourceSlug] ?? 'Eden Knowledge Base'}</p>
                        <div className="wiki-skill-tags">
                          {draft.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ) : (
            <section className="etreport-section pb-20">
              <div className="poker-wiki-index-panel">
                <div>
                  <p className="etreport-kicker">{isZh ? 'Wiki operating model' : 'Wiki operating model'}</p>
                  <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                    {isZh ? '从一次 build，变成长期记忆。' : 'From one build into long-term memory.'}
                  </h2>
                </div>
                <p>
                  {isZh
                    ? '这不是把项目写成展示页，而是把“学到什么、为什么重要、下次怎么复用”存成可回看的页面。以后每个项目都可以这样变成自己的知识库。'
                    : 'This is not just a project showcase. It stores what was learned, why it matters, and how to reuse it next time. Every future project can become part of the same personal knowledge base.'}
                </p>
              </div>
              <div className="poker-wiki-grid mt-12">
                {wikiEntries.map((item) => (
                  <a key={item.slug} href={joinBasePath(baseUrl, `wiki/${item.slug}`)} className={`poker-wiki-card ${getWikiToneClassName(item.slug)}`}>
                    <WikiEntryVisual entry={item} language={language} />
                    <span className="poker-wiki-eyebrow">{item.eyebrow[language]}</span>
                    <h3 className="poker-wiki-card-title">{item.title[language]}</h3>
                    <p>{item.summary[language]}</p>
                    <span className="poker-wiki-link">{isZh ? '打开笔记' : 'Open note'} <span aria-hidden>›</span></span>
                  </a>
                ))}
              </div>
              {isSkillsIndex && skillDrafts.length > 0 && (
                <div className="wiki-skill-library">
                  <p className="etreport-kicker">{isZh ? 'Local skill drafts' : 'Local skill drafts'}</p>
                  <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                    {isZh ? '你已经生成的 Skill Cards。' : 'Skill Cards generated from the wiki.'}
                  </h2>
                  <div className="wiki-skill-library-grid">
                    {skillDrafts.map((draft) => (
                      <article key={draft.id} className="wiki-skill-library-card">
                        <div className="wiki-skill-preview-head">
                          <p>{draft.sourceSlug}</p>
                          <span>{draft.status}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold tracking-tight">{draft.title}</h3>
                        <p><strong>{isZh ? '触发场景：' : 'Trigger: '}</strong>{draft.trigger}</p>
                        <p><strong>{isZh ? '来源项目：' : 'Source project: '}</strong>{draft.sourceProject ?? wikiSourceProjectBySlug[draft.sourceSlug] ?? 'Eden Knowledge Base'}</p>
                        <div className="wiki-skill-tags">
                          {draft.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

const crmConsoleRows: ReadonlyArray<readonly [string, { en: string; zh: string }]> = [
  ['Storage', { en: 'One normalized Postgres database', zh: '一个标准化 Postgres 数据库' }],
  ['Search', { en: 'pgvector semantic index', zh: 'pgvector 语义索引' }],
  ['Security', { en: 'RBAC + encrypted credentials', zh: 'RBAC + 加密凭证' }],
  ['Migrations', { en: '9 phases just to retire old columns', zh: '9 个阶段，只为退役旧字段' }],
];

const crmValueProps = [
  {
    title: { en: 'One brain, not 40 spreadsheets', zh: '一个大脑，不是 40 张表' },
    copy: {
      en: 'Every game provider, merchant, vendor account, login, rate, and coverage rule lives in one place. The pile of Excel files that used to run the business? Gone. It all got eaten.',
      zh: '每个游戏供应商、商户、供应商账号、登录、费率、地区规则，全塞进同一个地方。以前撑着整个生意的那堆 Excel？没了。全被吃掉了。',
    },
  },
  {
    title: { en: 'Everything is wired together', zh: '全都连在一起' },
    copy: {
      en: 'Providers link to vendors, vendors to merchants, merchants to accounts, accounts to products. Click one thing and the whole web lights up. Nothing floats alone anymore.',
      zh: '供应商连供应商账号，账号连商户，商户连产品，一层扣一层。点一个，整张网都亮起来。没有东西再孤零零飘着。',
    },
  },
  {
    title: { en: 'It remembers (and it tells on you)', zh: '它记得住（还会打小报告）' },
    copy: {
      en: 'Audit logs, encrypted credentials, role locks. Sales literally cannot see the cost rate. Something breaks, you check the log instead of asking the room “who touched this?”',
      zh: '审计日志、加密凭证、角色锁。销售根本看不到成本费率。出事了翻日志，而不是对着全屋问「谁动了这个？」',
    },
  },
] as const;

const crmWildFeatures = [
  {
    title: 'An AI that reads your providers',
    copy: {
      en: 'A pgvector embedding layer indexes every provider so you can search them by meaning, not exact spelling. Yes, the back-office tool has a semantic brain bolted on. No, nobody strictly needed it.',
      zh: '一层 pgvector 向量索引把每个供应商都嵌进去，你可以按「意思」搜，而不是拼对名字。对，一个后台工具硬是装了个语义大脑。对，没人非要它不可。',
    },
  },
  {
    title: 'A database normalized into oblivion',
    copy: {
      en: 'Nine phases of migration — freeze the legacy writes, blank the columns, archive them forever, guard the drop, run a readiness report, THEN delete. All to retire a few old columns without losing a byte. Overkill is the whole personality.',
      zh: '九个阶段的迁移——先冻结旧写入、清空列、永久归档、加删除护栏、跑就绪报告，然后才删。全是为了退役几列旧字段，还一个字节都不丢。过度工程就是它的人格。',
    },
  },
  {
    title: 'A country parser with trust issues',
    copy: {
      en: 'It reads messy “restricted countries” text and pulls out real ISO codes. The catch: two-letter matching is case-SENSITIVE, because otherwise “in” becomes India, “no” becomes Norway, and “at” becomes Austria. It has been burned before.',
      zh: '它读乱糟糟的「限制国家」文字，抠出真正的 ISO 代码。关键是：两位字母匹配区分大小写，否则「in」变印度、「no」变挪威、「at」变奥地利。它被坑过，记仇了。',
    },
  },
  {
    title: 'Locks on everything',
    copy: {
      en: 'Role-based access, encrypted master and sub-agent logins that never travel in plaintext, and a cost-rate secrecy rule enforced on the server so the frontend can’t leak it even if it tried.',
      zh: '基于角色的权限、永不明文传输的主账号与子账号加密登录，还有在服务器端强制的成本费率保密规则——前端就算想泄露也泄不出去。',
    },
  },
  {
    title: 'A golden-ratio design system nobody requested',
    copy: {
      en: 'φ ≈ 1.618 column splits, a φ-stepped spacing rhythm, a hash-to-color chip palette, and a live brandbook page that renders every design token as real components. An internal admin tool. With a brandbook. Sure.',
      zh: 'φ ≈ 1.618 的分栏、按 φ 递进的间距节奏、用哈希生成颜色的标签盘，还有一个把每个设计 token 都渲染成真组件的「品牌手册」页。一个内部后台工具。还配品牌手册。行吧。',
    },
  },
  {
    title: 'Day / Night mode that swaps colors for fun',
    copy: {
      en: 'Flip to Night and the palette does a complementary swap — green becomes blue, yellow becomes purple — across every chip, KPI, and badge. Then a whole saga of fighting Chrome’s force-dark from inverting the light theme behind our backs.',
      zh: '切到夜间，整个配色做互补翻转——绿变蓝、黄变紫——覆盖每个标签、KPI、徽章。然后还有一整段跟 Chrome 强制深色模式斗智斗勇、不让它偷偷把白天主题反色的血泪史。',
    },
  },
] as const;

const crmStoryIntro = {
  en: 'This was supposed to be “a place to keep track of our providers.” Read the build log and it clearly lost the plot somewhere around phase three. A few scenes from the rampage.',
  zh: '这本来只是「一个记录我们供应商的地方」。翻翻构建日志，大概在第三阶段就已经玩脱了。下面是这场暴走里的几个名场面。',
} as const;

const crmStories = [
  {
    date: 'Migration day',
    title: { en: 'The night a fuzzy matcher saved the import', zh: '模糊匹配救回整场导入的那一夜' },
    body: {
      en: 'The Excel importer kept choking on provider names that were written half a dozen different ways and didn’t match anything cleanly. So a four-tier name matcher got built — exact, strip-the-code, strip-the-parens, then split-on-slash-and-match-every-piece. One re-run later, a big chunk of rows that were about to be dropped quietly walked back into the database. Nobody clapped. The matcher didn’t need applause.',
      zh: '导入器一直被那些写法五花八门、怎么都对不上的供应商名字噎住。于是写了个四层匹配——精确、去代码、去括号、再按斜杠拆开逐段匹配。重跑一次，一大批本来要被悄悄丢掉的行，自己走回了数据库。没人鼓掌。匹配器也不需要掌声。',
    },
  },
  {
    date: 'The bug',
    title: { en: '“in” means India now', zh: '从此「in」就是印度' },
    body: {
      en: 'The country parser matched two-letter ISO codes case-insensitively, which sounds fine until the word “in” inside a sentence quietly tags an entry as restricted in India. And “no” as Norway. And “at” as Austria. The fix: make two-letter matching case-SENSITIVE, UPPER-only. Long country names stay relaxed; the tiny codes now have to shout. A pile of free-text mush turned into clean, structured country tags.',
      zh: '国家解析器原本不分大小写匹配两位 ISO 代码，听起来没事——直到句子里的「in」悄悄把某条记录标成「限制于印度」。还有「no」变挪威、「at」变奥地利。修法：两位匹配改成区分大小写、只认大写。长国名照样随意；小代码现在必须喊出来。一堆自由文本，就这样变成了干净、结构化的国家标签。',
    },
  },
  {
    date: 'Phase 9c',
    title: { en: 'The most ceremonial DELETE in history', zh: '史上最讲排场的一次 DELETE' },
    body: {
      en: 'To drop a handful of legacy columns, the database first froze new writes to them, blanked the values, copied everything into a permanent archive table, added a guard script that refuses to run if anything still depends on them, demanded a readiness report come back green, AND a 24-hour window with zero legacy traffic — and only THEN ran the migration that said `DROP COLUMN`. Deleting a column has never been treated with more respect.',
      zh: '为了删掉几列旧字段，数据库先冻结了对它们的新写入、清空数值、把一切复制进一张永久归档表、加了个「只要还有东西依赖就拒绝运行」的护栏脚本、要求就绪报告亮绿灯、还要 24 小时零旧流量——然后才跑那句 `DROP COLUMN`。删一列字段，从没被这么郑重对待过。',
    },
  },
] as const;

const CONWAY_LIFE_COLUMNS = 36;
const CONWAY_LIFE_ROWS = 24;
const CONWAY_LIFE_CELL_COUNT = CONWAY_LIFE_COLUMNS * CONWAY_LIFE_ROWS;

type ConwayLifePattern = 'glider' | 'r-pentomino' | 'pulsar';

const CONWAY_LIFE_PATTERNS: Record<ConwayLifePattern, readonly [number, number][]> = {
  glider: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
  'r-pentomino': [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]],
  pulsar: [
    [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
    [0, 2], [5, 2], [7, 2], [12, 2],
    [0, 3], [5, 3], [7, 3], [12, 3],
    [0, 4], [5, 4], [7, 4], [12, 4],
    [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
    [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
    [0, 8], [5, 8], [7, 8], [12, 8],
    [0, 9], [5, 9], [7, 9], [12, 9],
    [0, 10], [5, 10], [7, 10], [12, 10],
    [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12],
  ],
};

const createConwayLifeBoard = (pattern: ConwayLifePattern = 'pulsar'): boolean[] => {
  const board = Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => false);
  const coordinates = CONWAY_LIFE_PATTERNS[pattern];
  const patternWidth = Math.max(...coordinates.map(([x]) => x)) + 1;
  const patternHeight = Math.max(...coordinates.map(([, y]) => y)) + 1;
  const startX = Math.floor((CONWAY_LIFE_COLUMNS - patternWidth) / 2);
  const startY = Math.floor((CONWAY_LIFE_ROWS - patternHeight) / 2);

  coordinates.forEach(([x, y]) => {
    board[(startY + y) * CONWAY_LIFE_COLUMNS + startX + x] = true;
  });

  return board;
};

const createRandomConwayLifeBoard = (): boolean[] =>
  Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => Math.random() < 0.22);

const evolveConwayLifeBoard = (board: readonly boolean[]): boolean[] =>
  board.map((isAlive, index) => {
    const row = Math.floor(index / CONWAY_LIFE_COLUMNS);
    const column = index % CONWAY_LIFE_COLUMNS;
    let neighbors = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        if (rowOffset === 0 && columnOffset === 0) continue;
        const nextRow = row + rowOffset;
        const nextColumn = column + columnOffset;
        if (nextRow < 0 || nextRow >= CONWAY_LIFE_ROWS || nextColumn < 0 || nextColumn >= CONWAY_LIFE_COLUMNS) continue;
        if (board[nextRow * CONWAY_LIFE_COLUMNS + nextColumn]) neighbors += 1;
      }
    }

    return isAlive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
  });

const ELEMENTARY_RULE_COUNT = 256;
const ELEMENTARY_MAIN_WIDTH = 128;
const ELEMENTARY_MAIN_HEIGHT = 72;
const ELEMENTARY_THUMB_WIDTH = 24;
const ELEMENTARY_THUMB_HEIGHT = 14;
const FEATURED_ELEMENTARY_RULES = [30, 90, 110, 184] as const;
const ELEMENTARY_NEIGHBORHOODS = ['111', '110', '101', '100', '011', '010', '001', '000'] as const;
const I_CHING_TRIGRAMS = [
  { bits: '111', name: { en: 'Qian', zh: '乾' }, symbol: '☰', nature: { en: 'Heaven', zh: '天' } },
  { bits: '110', name: { en: 'Dui', zh: '兑' }, symbol: '☱', nature: { en: 'Lake', zh: '泽' } },
  { bits: '101', name: { en: 'Li', zh: '离' }, symbol: '☲', nature: { en: 'Fire', zh: '火' } },
  { bits: '100', name: { en: 'Zhen', zh: '震' }, symbol: '☳', nature: { en: 'Thunder', zh: '雷' } },
  { bits: '011', name: { en: 'Xun', zh: '巽' }, symbol: '☴', nature: { en: 'Wind', zh: '风' } },
  { bits: '010', name: { en: 'Kan', zh: '坎' }, symbol: '☵', nature: { en: 'Water', zh: '水' } },
  { bits: '001', name: { en: 'Gen', zh: '艮' }, symbol: '☶', nature: { en: 'Mountain', zh: '山' } },
  { bits: '000', name: { en: 'Kun', zh: '坤' }, symbol: '☷', nature: { en: 'Earth', zh: '地' } },
] as const;

const getIChingTrigram = (bits: string) => I_CHING_TRIGRAMS.find((item) => item.bits === bits) ?? I_CHING_TRIGRAMS[0];

const I_CHING_HEXAGRAMS = [
  { number: 1, bits: '111111', name: { en: 'Qian', zh: '乾' } },
  { number: 2, bits: '000000', name: { en: 'Kun', zh: '坤' } },
  { number: 3, bits: '100010', name: { en: 'Zhun', zh: '屯' } },
  { number: 4, bits: '010001', name: { en: 'Meng', zh: '蒙' } },
  { number: 5, bits: '111010', name: { en: 'Xu', zh: '需' } },
  { number: 6, bits: '010111', name: { en: 'Song', zh: '讼' } },
  { number: 7, bits: '010000', name: { en: 'Shi', zh: '师' } },
  { number: 8, bits: '000010', name: { en: 'Bi', zh: '比' } },
  { number: 9, bits: '111011', name: { en: 'Xiao Xu', zh: '小畜' } },
  { number: 10, bits: '110111', name: { en: 'Lu', zh: '履' } },
  { number: 11, bits: '111000', name: { en: 'Tai', zh: '泰' } },
  { number: 12, bits: '000111', name: { en: 'Pi', zh: '否' } },
  { number: 13, bits: '101111', name: { en: 'Tong Ren', zh: '同人' } },
  { number: 14, bits: '111101', name: { en: 'Da You', zh: '大有' } },
  { number: 15, bits: '001000', name: { en: 'Qian', zh: '谦' } },
  { number: 16, bits: '000100', name: { en: 'Yu', zh: '豫' } },
  { number: 17, bits: '100110', name: { en: 'Sui', zh: '随' } },
  { number: 18, bits: '011001', name: { en: 'Gu', zh: '蛊' } },
  { number: 19, bits: '110000', name: { en: 'Lin', zh: '临' } },
  { number: 20, bits: '000011', name: { en: 'Guan', zh: '观' } },
  { number: 21, bits: '100101', name: { en: 'Shi He', zh: '噬嗑' } },
  { number: 22, bits: '101001', name: { en: 'Bi', zh: '贲' } },
  { number: 23, bits: '000001', name: { en: 'Bo', zh: '剥' } },
  { number: 24, bits: '100000', name: { en: 'Fu', zh: '复' } },
  { number: 25, bits: '100111', name: { en: 'Wu Wang', zh: '无妄' } },
  { number: 26, bits: '111001', name: { en: 'Da Xu', zh: '大畜' } },
  { number: 27, bits: '100001', name: { en: 'Yi', zh: '颐' } },
  { number: 28, bits: '011110', name: { en: 'Da Guo', zh: '大过' } },
  { number: 29, bits: '010010', name: { en: 'Kan', zh: '坎' } },
  { number: 30, bits: '101101', name: { en: 'Li', zh: '离' } },
  { number: 31, bits: '001110', name: { en: 'Xian', zh: '咸' } },
  { number: 32, bits: '011100', name: { en: 'Heng', zh: '恒' } },
  { number: 33, bits: '001111', name: { en: 'Dun', zh: '遁' } },
  { number: 34, bits: '111100', name: { en: 'Da Zhuang', zh: '大壮' } },
  { number: 35, bits: '000101', name: { en: 'Jin', zh: '晋' } },
  { number: 36, bits: '101000', name: { en: 'Ming Yi', zh: '明夷' } },
  { number: 37, bits: '101011', name: { en: 'Jia Ren', zh: '家人' } },
  { number: 38, bits: '110101', name: { en: 'Kui', zh: '睽' } },
  { number: 39, bits: '001010', name: { en: 'Jian', zh: '蹇' } },
  { number: 40, bits: '010100', name: { en: 'Xie', zh: '解' } },
  { number: 41, bits: '110001', name: { en: 'Sun', zh: '损' } },
  { number: 42, bits: '100011', name: { en: 'Yi', zh: '益' } },
  { number: 43, bits: '111110', name: { en: 'Guai', zh: '夬' } },
  { number: 44, bits: '011111', name: { en: 'Gou', zh: '姤' } },
  { number: 45, bits: '000110', name: { en: 'Cui', zh: '萃' } },
  { number: 46, bits: '011000', name: { en: 'Sheng', zh: '升' } },
  { number: 47, bits: '010110', name: { en: 'Kun', zh: '困' } },
  { number: 48, bits: '011010', name: { en: 'Jing', zh: '井' } },
  { number: 49, bits: '101110', name: { en: 'Ge', zh: '革' } },
  { number: 50, bits: '011101', name: { en: 'Ding', zh: '鼎' } },
  { number: 51, bits: '100100', name: { en: 'Zhen', zh: '震' } },
  { number: 52, bits: '001001', name: { en: 'Gen', zh: '艮' } },
  { number: 53, bits: '001011', name: { en: 'Jian', zh: '渐' } },
  { number: 54, bits: '110100', name: { en: 'Gui Mei', zh: '归妹' } },
  { number: 55, bits: '101100', name: { en: 'Feng', zh: '丰' } },
  { number: 56, bits: '001101', name: { en: 'Lu', zh: '旅' } },
  { number: 57, bits: '011011', name: { en: 'Xun', zh: '巽' } },
  { number: 58, bits: '110110', name: { en: 'Dui', zh: '兑' } },
  { number: 59, bits: '010011', name: { en: 'Huan', zh: '涣' } },
  { number: 60, bits: '110010', name: { en: 'Jie', zh: '节' } },
  { number: 61, bits: '110011', name: { en: 'Zhong Fu', zh: '中孚' } },
  { number: 62, bits: '001100', name: { en: 'Xiao Guo', zh: '小过' } },
  { number: 63, bits: '101010', name: { en: 'Ji Ji', zh: '既济' } },
  { number: 64, bits: '010101', name: { en: 'Wei Ji', zh: '未济' } },
] as const;

const I_CHING_RULE_YAO_POSITIONS = [1, 4, 2, 8, 5, 7] as const;
const I_CHING_RULE_VARIANT_POSITIONS = [3, 6] as const;

const createIChingRuleVariant = (hexagramBits: string, variantBits: string) => {
  const ruleBits = Array.from({ length: 8 }, () => '0');
  I_CHING_RULE_YAO_POSITIONS.forEach((position, index) => {
    ruleBits[position - 1] = hexagramBits[index] ?? '0';
  });
  I_CHING_RULE_VARIANT_POSITIONS.forEach((position, index) => {
    ruleBits[position - 1] = variantBits[index] ?? '0';
  });
  return Number.parseInt(ruleBits.join(''), 2);
};

const getRuleIChingMapping = (rule: number) => {
  const ruleBits = rule.toString(2).padStart(8, '0');
  const hexagramBits = I_CHING_RULE_YAO_POSITIONS.map((position) => ruleBits[position - 1]).join('');
  const variantBits = I_CHING_RULE_VARIANT_POSITIONS.map((position) => ruleBits[position - 1]).join('');
  const hexagram = I_CHING_HEXAGRAMS.find((item) => item.bits === hexagramBits) ?? I_CHING_HEXAGRAMS[0];
  const groupRules = ['00', '01', '10', '11']
    .map((bits) => createIChingRuleVariant(hexagramBits, bits))
    .sort((first, second) => first - second);

  return { ruleBits, hexagramBits, variantBits, hexagram, groupRules };
};

const createElementaryRuleCells = (rule: number, width: number, height: number, offset = 0): boolean[] => {
  let row = Array.from({ length: width }, (_, index) => index === Math.floor(width / 2));
  const cells: boolean[] = [];

  for (let y = 0; y < offset; y += 1) {
    row = row.map((center, x) => {
      const left = row[(x - 1 + width) % width];
      const right = row[(x + 1) % width];
      const neighborhood = (left ? 4 : 0) | (center ? 2 : 0) | (right ? 1 : 0);
      return ((rule >> neighborhood) & 1) === 1;
    });
  }

  for (let y = 0; y < height; y += 1) {
    cells.push(...row);
    row = row.map((center, x) => {
      const left = row[(x - 1 + width) % width];
      const right = row[(x + 1) % width];
      const neighborhood = (left ? 4 : 0) | (center ? 2 : 0) | (right ? 1 : 0);
      return ((rule >> neighborhood) & 1) === 1;
    });
  }

  return cells;
};

const createElementaryRuleSvgDataUri = (rule: number, width: number, height: number, offset = 0): string => {
  const cells = createElementaryRuleCells(rule, width, height, offset);
  const rects: string[] = [];

  cells.forEach((active, index) => {
    if (!active) return;
    const x = index % width;
    const y = Math.floor(index / width);
    rects.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges"><rect width="${width}" height="${height}" fill="white"/><g fill="black">${rects.join('')}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const ElementaryRulePattern: React.FC<{
  rule: number;
  width: number;
  height: number;
  offset?: number;
  className?: string;
}> = ({ rule, width, height, offset = 0, className = '' }) => {
  const backgroundImage = React.useMemo(
    () => createElementaryRuleSvgDataUri(rule, width, height, offset),
    [rule, width, height, offset],
  );

  return (
    <div
      className={`elementary-rule-grid ${className}`.trim()}
      style={
        {
          '--rule-columns': width,
          backgroundImage,
        } as React.CSSProperties
      }
      aria-hidden
    />
  );
};

const ElementaryRuleThumb: React.FC<{
  rule: number;
  selected: boolean;
  onSelect: (rule: number) => void;
  ariaLabel?: string;
}> = ({ rule, selected, onSelect, ariaLabel }) => (
  <button
    type="button"
    className={`elementary-rule-thumb ${selected ? 'is-selected' : ''}`}
    onClick={() => onSelect(rule)}
    aria-pressed={selected}
    aria-label={ariaLabel ?? `Rule ${rule}`}
  >
    <ElementaryRulePattern rule={rule} width={ELEMENTARY_THUMB_WIDTH} height={ELEMENTARY_THUMB_HEIGHT} className="elementary-rule-thumb-grid" />
    <span>{String(rule).padStart(3, '0')}</span>
  </button>
);

const IChingRuleReadout: React.FC<{ rule: number; language: Language }> = ({ rule, language }) => {
  const { hexagramBits, variantBits, hexagram, groupRules } = getRuleIChingMapping(rule);
  const lowerBits = hexagramBits.slice(0, 3);
  const upperBits = hexagramBits.slice(3, 6);
  const lower = getIChingTrigram(lowerBits);
  const upper = getIChingTrigram(upperBits);
  const yangCount = [...hexagramBits].filter((bit) => bit === '1').length;
  const visualLines = [...hexagramBits].reverse();
  const variantNumber = Number.parseInt(variantBits, 2) + 1;
  const isZh = language === 'zh';

  return (
    <div className="iching-rule-readout">
      <div className="iching-rule-head">
        <div>
          <p className="elementary-rule-label">{isZh ? '实验性易经映射' : 'Experimental I Ching mapping'}</p>
          <p className="iching-hexagram-name">
            {String(hexagram.number).padStart(2, '0')} · {hexagram.name[language]}
          </p>
        </div>
        <strong>{upper.symbol}{lower.symbol}</strong>
      </div>
      <div className="iching-hexagram-lines" aria-label={isZh ? '六爻卦象' : 'Six-line hexagram'}>
        {visualLines.map((bit, index) => (
          <span key={`${bit}-${index}`} className={bit === '1' ? 'is-yang' : 'is-yin'} />
        ))}
      </div>
      <div className="iching-trigram-grid">
        <div>
          <span>{isZh ? '下卦 · 初爻向上' : 'Lower · bottom-up'}</span>
          <b>{lower.name[language]} / {lower.nature[language]} · {lowerBits}</b>
        </div>
        <div>
          <span>{isZh ? '上卦 · 四爻向上' : 'Upper · bottom-up'}</span>
          <b>{upper.name[language]} / {upper.nature[language]} · {upperBits}</b>
        </div>
        <div>
          <span>{isZh ? '六爻卦码' : 'Six yao bits'}</span>
          <b>{hexagramBits} · {yangCount}/6 {isZh ? '阳' : 'yang'}</b>
        </div>
        <div>
          <span>Variant</span>
          <b>{variantBits} · {variantNumber}/4</b>
        </div>
      </div>
      <div className="iching-rule-path">
        <span>{isZh ? '取爻位置' : 'Yao positions'}</span>
        <b>1 → 4 → 2 → 8 → 5 → 7</b>
        <small>{isZh ? 'Rule 输出位置 3 与 6 组成 Variant。' : 'Rule output positions 3 and 6 form the variant.'}</small>
      </div>
      <div className="iching-rule-group" aria-label={isZh ? '同卦的四条 Rule' : 'Four rules in the same hexagram group'}>
        {groupRules.map((groupRule) => (
          <span key={groupRule} className={groupRule === rule ? 'is-current' : undefined}>Rule {groupRule}</span>
        ))}
      </div>
      <p className="iching-rule-note">
        {isZh
          ? '这是 8-bit Rule 与六爻之间的实验性结构映射，不代表传统占卜、吉凶或 Rule 的固有卦义。'
          : 'This is an experimental structural mapping between an 8-bit rule and six yao—not a traditional divination or an intrinsic meaning of the rule.'}
      </p>
      <a
        className="iching-rule-source"
        href="https://doi.org/10.1016/j.jum.2022.11.001"
        target="_blank"
        rel="noreferrer"
      >
        {isZh ? '查看映射研究 ↗' : 'Read the mapping research ↗'}
      </a>
    </div>
  );
};

const ElementaryRuleViewer: React.FC<{
  rule: number;
  generation: number;
  language: Language;
  ruleBrowser: React.ReactNode;
  playbackControls: React.ReactNode;
}> = ({ rule, generation, language, ruleBrowser, playbackControls }) => {
  const binary = rule.toString(2).padStart(8, '0');
  const isZh = language === 'zh';

  return (
    <section className="cellular-lab-workspace" aria-label={isZh ? `Rule ${rule} 实验台` : `Rule ${rule} workspace`}>
      <aside className="cellular-rule-browser" aria-label={isZh ? '规则浏览器' : 'Rule browser'}>
        {ruleBrowser}
      </aside>

      <div className="cellular-rule-preview">
        <div className="cellular-preview-meta">
          <span>Rule {String(rule).padStart(3, '0')}</span>
          <span>{isZh ? '世代' : 'Generation'} {generation}</span>
        </div>
        <div
          className="elementary-rule-stage"
          aria-label={isZh ? `一维元胞自动机 Rule ${rule}，世代 ${generation}` : `Elementary cellular automata rule ${rule}, generation ${generation}`}
        >
          <ElementaryRulePattern
            rule={rule}
            width={ELEMENTARY_MAIN_WIDTH}
            height={ELEMENTARY_MAIN_HEIGHT}
            offset={generation}
            className="elementary-rule-main-grid"
          />
        </div>
        <div className="cellular-playback-controls" aria-label={isZh ? '播放控制' : 'Playback controls'}>
          {playbackControls}
        </div>
      </div>

      <aside className="elementary-rule-readout">
        <div className="elementary-rule-primary-readout">
          <div>
            <p className="elementary-rule-label">Rule</p>
            <strong>{String(rule).padStart(3, '0')}</strong>
          </div>
          <div>
            <p className="elementary-rule-label">Binary</p>
            <code>{binary}</code>
          </div>
        </div>
        <div className="elementary-neighborhoods">
          {ELEMENTARY_NEIGHBORHOODS.map((neighborhood, index) => (
            <div key={neighborhood}>
              <span>{neighborhood}</span>
              <i className={binary[index] === '1' ? 'is-active' : undefined} />
            </div>
          ))}
        </div>
        <details className="iching-rule-details">
          <summary>
            <span>{isZh ? 'Advanced / 实验性易经映射' : 'Advanced / Experimental I Ching mapping'}</span>
            <span aria-hidden>+</span>
          </summary>
          <IChingRuleReadout rule={rule} language={language} />
        </details>
      </aside>
    </section>
  );
};

const ConwayGameOfLifeFullPage: React.FC<{
  homeHref: string;
  labHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, labHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [board, setBoard] = React.useState<boolean[]>(() => createConwayLifeBoard());
  const [generation, setGeneration] = React.useState(0);
  const [isMobileMenu, setIsMobileMenu] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches,
  );
  const [isRunning, setIsRunning] = React.useState(() =>
    typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  React.useEffect(() => {
    const mobileMenuQuery = window.matchMedia('(max-width: 640px)');
    const updateMobileMenu = () => setIsMobileMenu(mobileMenuQuery.matches);
    updateMobileMenu();
    mobileMenuQuery.addEventListener('change', updateMobileMenu);
    return () => mobileMenuQuery.removeEventListener('change', updateMobileMenu);
  }, []);

  React.useEffect(() => {
    if (!isRunning) return undefined;
    const intervalId = window.setInterval(() => {
      setBoard((currentBoard) => evolveConwayLifeBoard(currentBoard));
      setGeneration((currentGeneration) => currentGeneration + 1);
    }, 240);
    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const step = () => {
    setBoard((currentBoard) => evolveConwayLifeBoard(currentBoard));
    setGeneration((currentGeneration) => currentGeneration + 1);
  };

  const loadPattern = (pattern: ConwayLifePattern) => {
    setBoard(createConwayLifeBoard(pattern));
    setGeneration(0);
    setIsRunning(false);
  };

  const population = board.reduce((total, isAlive) => total + (isAlive ? 1 : 0), 0);

  return (
    <div className="page-shell conway-page conway-life-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="conway-rules-page">
        <div className="conway-rules-shell">
          <div className="conway-rules-topbar">
            <div className="conway-topbar-actions">
              <a href={homeHref} className="conway-back-link inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft size={16} />
                {isZh ? '返回主页' : 'Back to Home'}
              </a>
            </div>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection={isMobileMenu}
              compactLanguageOnSelection={isMobileMenu}
            />
          </div>

          <header className="conway-rules-header conway-life-header">
            <div className="conway-rules-identity">
              <div className="conway-rules-app-icon">
                <ProjectsCrmCssIcon label={isZh ? "Conway's Game of Life CSS app 图标" : "Conway's Game of Life CSS app icon"} />
              </div>
              <div className="conway-rules-copy">
                <p className="conway-kicker">B3 / S23 · Two-dimensional cellular automaton</p>
                <h1 className="conway-rules-title font-display font-bold tracking-tight">
                  Conway’s Game of Life
                </h1>
                <p className="conway-rules-subtitle">
                  {isZh
                    ? '几条简单规则，也能长出意想不到的生命。点亮细胞，然后看秩序自己出现。'
                    : 'Small rules. Unexpected life. Turn on a few cells, then watch order appear on its own.'}
                </p>
              </div>
            </div>
          </header>

          <div className="conway-life-console">
            <div>
              <span>{isZh ? '世代' : 'Generation'}</span>
              <strong>{generation}</strong>
            </div>
            <div>
              <span>{isZh ? '活细胞' : 'Population'}</span>
              <strong>{population}</strong>
            </div>
            <div>
              <span>{isZh ? '规则' : 'Rule'}</span>
              <strong>B3 / S23</strong>
            </div>
            <div className="conway-rules-controls">
              <button type="button" className="conway-control-button" onClick={() => setIsRunning((value) => !value)}>
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                <span>{isRunning ? (isZh ? '暂停' : 'Pause') : isZh ? '运行' : 'Run'}</span>
              </button>
              <button type="button" className="conway-control-button conway-control-button-muted" onClick={step} disabled={isRunning}>
                <ArrowRight size={16} />
                <span>{isZh ? '单步' : 'Step'}</span>
              </button>
              <button type="button" className="conway-control-button conway-control-button-muted" onClick={() => loadPattern('pulsar')}>
                <RotateCcw size={16} />
                <span>{isZh ? '重置' : 'Reset'}</span>
              </button>
              <button
                type="button"
                className="conway-control-button conway-control-button-muted"
                onClick={() => {
                  setBoard(Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => false));
                  setGeneration(0);
                  setIsRunning(false);
                }}
              >
                <span>{isZh ? '清空' : 'Clear'}</span>
              </button>
              <button
                type="button"
                className="conway-control-button conway-control-button-muted"
                onClick={() => {
                  setBoard(createRandomConwayLifeBoard());
                  setGeneration(0);
                  setIsRunning(false);
                }}
              >
                <span>{isZh ? '随机' : 'Random'}</span>
              </button>
            </div>
          </div>

          <section className="conway-life-layout" aria-label={isZh ? 'Conway 二维生命棋盘' : "Conway's two-dimensional life board"}>
            <div className="conway-life-stage">
              <div
                className="conway-life-grid"
                style={{ '--life-column-count': CONWAY_LIFE_COLUMNS } as React.CSSProperties}
                role="grid"
                aria-label={isZh ? '点击格子切换细胞生死' : 'Click cells to toggle life and death'}
              >
                {board.map((isAlive, index) => {
                  const row = Math.floor(index / CONWAY_LIFE_COLUMNS) + 1;
                  const column = (index % CONWAY_LIFE_COLUMNS) + 1;
                  return (
                    <button
                      key={index}
                      type="button"
                      role="gridcell"
                      className={isAlive ? 'is-alive' : undefined}
                      aria-pressed={isAlive}
                      aria-label={isZh ? `第 ${row} 行第 ${column} 列，${isAlive ? '存活' : '死亡'}` : `Row ${row}, column ${column}, ${isAlive ? 'alive' : 'dead'}`}
                      onClick={() => setBoard((currentBoard) => currentBoard.map((cell, cellIndex) => cellIndex === index ? !cell : cell))}
                    />
                  );
                })}
              </div>
            </div>

            <aside className="conway-life-sidebar">
              <div>
                <p className="conway-kicker">{isZh ? '经典图案' : 'Classic seeds'}</p>
                <div className="conway-life-patterns">
                  <button type="button" onClick={() => loadPattern('glider')}>Glider</button>
                  <button type="button" onClick={() => loadPattern('r-pentomino')}>R-pentomino</button>
                  <button type="button" onClick={() => loadPattern('pulsar')}>Pulsar</button>
                </div>
              </div>
              <div className="conway-life-rules">
                <p className="conway-kicker">{isZh ? '四条规则' : 'Four rules'}</p>
                <ol>
                  <li><b>01</b><span>{isZh ? '活细胞少于 2 个邻居，死亡。' : 'A live cell with fewer than 2 neighbors dies.'}</span></li>
                  <li><b>02</b><span>{isZh ? '活细胞有 2 或 3 个邻居，存活。' : 'A live cell with 2 or 3 neighbors survives.'}</span></li>
                  <li><b>03</b><span>{isZh ? '活细胞多于 3 个邻居，死亡。' : 'A live cell with more than 3 neighbors dies.'}</span></li>
                  <li><b>04</b><span>{isZh ? '死细胞恰好有 3 个邻居，诞生。' : 'A dead cell with exactly 3 neighbors is born.'}</span></li>
                </ol>
              </div>
              <a href={labHref} className="conway-lab-link">
                <span>{isZh ? '探索相关系统' : 'Explore the related system'}</span>
                <strong>Cellular Automata Lab <ArrowRight size={16} /></strong>
              </a>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
};

const CellularAutomataLabFullPage: React.FC<{
  homeHref: string;
  conwayHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, conwayHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [selectedRule, setSelectedRule] = React.useState(() => {
    if (typeof window === 'undefined') return 30;
    const rawRuleParam = new URLSearchParams(window.location.search).get('rule');
    if (rawRuleParam === null || rawRuleParam.trim() === '') return 30;
    const ruleParam = Number(rawRuleParam);
    return Number.isInteger(ruleParam) && ruleParam >= 0 && ruleParam < ELEMENTARY_RULE_COUNT ? ruleParam : 30;
  });
  const [generation, setGeneration] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(() =>
    typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [speedMs, setSpeedMs] = React.useState(720);
  const [ruleSearch, setRuleSearch] = React.useState('');
  const [searchMessage, setSearchMessage] = React.useState('');
  const [isPageVisible, setIsPageVisible] = React.useState(() =>
    typeof document === 'undefined' || !document.hidden,
  );

  const visibleRules = React.useMemo(() => {
    const query = ruleSearch.trim();
    const rules = Array.from({ length: ELEMENTARY_RULE_COUNT }, (_, rule) => rule);
    return query ? rules.filter((rule) => String(rule).includes(query)) : rules;
  }, [ruleSearch]);

  React.useEffect(() => {
    if (!isRunning || !isPageVisible) return undefined;
    const intervalId = window.setInterval(() => {
      setGeneration((currentGeneration) => currentGeneration + 1);
    }, speedMs);

    return () => window.clearInterval(intervalId);
  }, [isPageVisible, isRunning, speedMs]);

  React.useEffect(() => {
    const handleVisibilityChange = () => setIsPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  React.useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = () => {
      if (reducedMotionQuery.matches) setIsRunning(false);
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotion);
    return () => reducedMotionQuery.removeEventListener('change', handleReducedMotion);
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('rule', String(selectedRule));
    const query = params.toString();
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  }, [selectedRule]);

  const selectRule = (rule: number) => {
    setSelectedRule(rule);
    setGeneration(0);
    setSearchMessage('');
  };

  const jumpToRule = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ruleSearch.trim() === '') {
      setSearchMessage(isZh ? '请输入 0–255 之间的整数。' : 'Enter a whole number from 0–255.');
      return;
    }
    const rule = Number(ruleSearch);
    if (!Number.isInteger(rule) || rule < 0 || rule >= ELEMENTARY_RULE_COUNT) {
      setSearchMessage(isZh ? '请输入 0–255 之间的整数。' : 'Enter a whole number from 0–255.');
      return;
    }
    selectRule(rule);
    setRuleSearch('');
  };

  const ruleBrowser = (
    <>
      <div className="cellular-rule-browser-head">
        <div>
          <p className="elementary-rule-label">{isZh ? '规则浏览器' : 'Rule browser'}</p>
          <strong>{visibleRules.length} / {ELEMENTARY_RULE_COUNT}</strong>
        </div>
        <form className="cellular-rule-search" onSubmit={jumpToRule}>
          <label htmlFor="cellular-rule-search">{isZh ? '跳到规则' : 'Jump to rule'}</label>
          <div>
            <input
              id="cellular-rule-search"
              value={ruleSearch}
              onChange={(event) => {
                setRuleSearch(event.target.value.replace(/\D/g, '').slice(0, 3));
                setSearchMessage('');
              }}
              inputMode="numeric"
              autoComplete="off"
              placeholder="0–255"
            />
            <button type="submit">{isZh ? '前往' : 'Go'}</button>
          </div>
          <span className="cellular-rule-search-message" role="status">{searchMessage}</span>
        </form>
      </div>

      <div className="elementary-featured-rules" aria-label={isZh ? '常见规则' : 'Featured rules'}>
        {FEATURED_ELEMENTARY_RULES.map((rule) => (
          <button
            key={rule}
            type="button"
            className={selectedRule === rule ? 'is-selected' : ''}
            onClick={() => selectRule(rule)}
            aria-label={isZh ? `精选 Rule ${rule}` : `Featured Rule ${rule}`}
            aria-pressed={selectedRule === rule}
          >
            Rule {rule}
          </button>
        ))}
      </div>

      <div className="cellular-rule-scroll">
        <div className="elementary-rule-index" aria-label={isZh ? '一维元胞自动机规则列表' : 'Elementary cellular automata rule list'}>
          {visibleRules.map((rule) => (
            <ElementaryRuleThumb key={rule} rule={rule} selected={selectedRule === rule} onSelect={selectRule} />
          ))}
        </div>
      </div>
    </>
  );

  const playbackControls = (
    <>
      <div className="cellular-playback-actions">
        <button type="button" className="conway-control-button" onClick={() => setIsRunning((value) => !value)}>
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          <span>{isRunning ? (isZh ? '暂停' : 'Pause') : isZh ? '运行' : 'Run'}</span>
        </button>
        <button
          type="button"
          className="conway-control-button conway-control-button-muted"
          onClick={() => setGeneration((currentGeneration) => currentGeneration + 1)}
          disabled={isRunning}
        >
          <ArrowRight size={16} />
          <span>{isZh ? '单步' : 'Step'}</span>
        </button>
        <button
          type="button"
          className="conway-control-button conway-control-button-muted"
          onClick={() => setGeneration(0)}
        >
          <RotateCcw size={16} />
          <span>{isZh ? '重置' : 'Reset'}</span>
        </button>
      </div>
      <div className="cellular-speed-group" aria-label={isZh ? '播放速度' : 'Playback speed'}>
        {[{ label: '0.5×', value: 1440 }, { label: '1×', value: 720 }, { label: '2×', value: 360 }].map((speed) => (
          <button
            key={speed.value}
            type="button"
            className={speedMs === speed.value ? 'is-selected' : ''}
            aria-pressed={speedMs === speed.value}
            onClick={() => setSpeedMs(speed.value)}
          >
            {speed.label}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div className="page-shell conway-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="conway-rules-page">
        <div className="conway-rules-shell">
          <div className="conway-rules-topbar">
            <div className="conway-topbar-links">
              <a href={homeHref} className="conway-back-link inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft size={16} />
                {isZh ? '返回主页' : 'Back to Home'}
              </a>
              <a href={conwayHref} className="conway-back-link text-sm font-medium">
                Conway’s Game of Life
              </a>
            </div>
          <HeaderControls
            language={language}
            setLanguage={setLanguage}
            themePreference={themePreference}
            theme={theme}
            setThemePreference={setThemePreference}
          />
          </div>

          <header className="conway-rules-header">
            <div className="conway-rules-identity">
              <div className="conway-rules-app-icon">
                <ProjectsCrmCssIcon label={isZh ? "Conway's Game of Life CSS app 图标" : "Conway's Game of Life CSS app icon"} />
              </div>
              <div className="conway-rules-copy">
                <p className="conway-kicker">One-dimensional rule explorer</p>
                <h1 className="conway-rules-title font-display font-bold tracking-tight">
                  Cellular Automata Lab
                </h1>
                <p className="conway-rules-subtitle">
                  {isZh
                    ? '探索全部 256 个一维元胞自动机规则：每个 8-bit 规则，都会长成不同的黑白秩序。'
                    : 'Explore all 256 elementary cellular automata: each 8-bit rule grows into a different black-and-white order.'}
                </p>
              </div>
            </div>
          </header>

          <ElementaryRuleViewer
            rule={selectedRule}
            generation={generation}
            language={language}
            ruleBrowser={ruleBrowser}
            playbackControls={playbackControls}
          />
        </div>
      </main>
    </div>
  );
};

const CrmFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';

  return (
    <div className="page-shell etreport-page poker-page crm-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={projectsHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-hero py-16 text-center md:py-24">
            <p className="etreport-kicker mx-auto">{isZh ? 'CRM Intelligence System' : 'CRM Intelligence System'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '本来只想要个表格。结果搭了个大脑。' : 'We wanted a spreadsheet. We built a brain.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? '一个后台 CRM：把一整门生意从一堆乱到犯法的 Excel 里捞出来——供应商、商户、账号、费率、地区规则——整理成一个连在一起的数据库，然后就一发不可收拾了。状态：据说还「在设计中」。'
                : 'A back-office CRM that pulls a whole business out of a pile of criminally messy Excel — providers, merchants, accounts, rates, coverage rules — and wires it into one connected database. Then it kept going. Status: allegedly still “in design.”'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#crm-stack" className="etreport-text-cta">
                {isZh ? '看它吃了什么' : 'See what it ate'} <span aria-hidden>›</span>
              </a>
              <a href="#crm-wild" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '没人要它做的功能' : 'Things nobody asked for'} <span aria-hidden>›</span>
              </a>
              <a href="#crm-story" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '几个名场面' : 'A few war stories'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section id="crm-stack" className="etreport-console-panel">
            <div className="etreport-console-copy">
              <p className="etreport-kicker">{isZh ? 'What it ate' : 'What it ate'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '它把整个生意从 Excel 里吃了进去。' : 'It ate the whole business out of Excel.'}
              </h2>
              <p>
                {isZh
                  ? '供应商、供应商账号、商户、产品、登录、费率、地区规则——以前散在几十张表里，现在全在一个标准化的 Postgres 数据库里，连着审计日志、加密和权限。'
                  : 'Providers, vendors, merchants, products, logins, rates, coverage rules — once scattered across dozens of sheets, now in one normalized Postgres database with audit logs, encryption, and access control bolted on.'}
              </p>
            </div>
            <div className="etreport-console-metrics">
              {crmConsoleRows.map(([label, value]) => (
                <div key={label} className="etreport-console-row">
                  <span>{label}</span>
                  <strong>{value[language]}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What it actually is' : 'What it actually is'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '说白了，它是这门生意的操作大脑。' : 'Basically, it’s the operating brain for the whole business.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {crmValueProps.map((item) => (
                <article key={item.title.en} className="etreport-value-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="crm-wild" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Built anyway' : 'Built anyway'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '没人要求，但它就是有的东西。' : 'Things nobody asked for, but it has anyway.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {crmWildFeatures.map((item) => (
                <article key={item.title} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="crm-story" className="etreport-section py-16 md:py-24">
            <div className="poker-story-panel">
              <div className="poker-story-head">
                <p className="etreport-kicker">{isZh ? 'Build log, dramatized' : 'Build log, dramatized'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '从「记录供应商」到完全玩脱。' : 'From “track our providers” to total chaos.'}
                </h2>
                <p className="poker-story-intro">{crmStoryIntro[language]}</p>
              </div>
              <div className="poker-story-list">
                {crmStories.map((item) => (
                  <article key={item.title.en} className="poker-story-item">
                    <p className="poker-story-date">{item.date}</p>
                    <h3 className="poker-story-title font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {item.title[language]}
                    </h3>
                    <p className="poker-story-body">{item.body[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="etreport-section pb-20 pt-10">
            <div className="etreport-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '它没有公开链接。它住在某台机器的 localhost 上，过得很好。' : 'There’s no public link. It lives on a localhost somewhere, thriving.'}
              </h2>
              <p>
                {isZh
                  ? '这是内部后台工具——管的是真实的供应商、商户和账号，所以不对外开。它最能说明的不是「会不会做 CRM」，而是愿不愿意为了一个干净的数据库，把一件小事做到过度认真。'
                  : 'It’s an internal back-office tool — it manages real providers, merchants, and accounts, so it stays private. What it really shows isn’t “can you build a CRM,” it’s the willingness to take one small thing way too seriously for the sake of a clean database.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={projectsHref} className="etreport-text-cta">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
                <a href={homeHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const FilmGalleryFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const filmStripRef = React.useRef<HTMLDivElement>(null);
  const [installPrompt, setInstallPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches,
  );
  const [isDownloading, setIsDownloading] = React.useState(false);

  React.useEffect(() => {
    const captureInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const markInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', captureInstallPrompt);
    window.addEventListener('appinstalled', markInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
      window.removeEventListener('appinstalled', markInstalled);
    };
  }, []);

  const scrollFilmStrip = (direction: -1 | 1) => {
    const strip = filmStripRef.current;
    if (!strip) return;
    strip.scrollBy({
      left: direction * Math.min(strip.clientWidth * 0.82, 760),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const installFilmGallery = async () => {
    if (isInstalled) return;
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') setIsInstalled(true);
      setInstallPrompt(null);
      return;
    }
    window.alert(
      isZh
        ? '如果浏览器没有弹出安装视窗：iPhone / iPad 请点分享，再选择「加入主画面」；Safari 桌面版请选择 File → Add to Dock。'
        : 'If no install window appears: on iPhone or iPad, tap Share → Add to Home Screen. In desktop Safari, choose File → Add to Dock.',
    );
  };

  const downloadFilmGallery = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const offlinePhotos = await Promise.all(filmGalleryFrames.map(async ({ photo, frameNumber }) => {
        const response = await fetch(resolveAssetPath(baseUrl, photo.src));
        if (!response.ok) throw new Error(`Unable to download frame ${frameNumber}`);
        const blob = await response.blob();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
        const camera = filmGalleryCameras.find((item) => item.frameNumbers.includes(frameNumber));
        const stock = filmGalleryStocks.find((item) => item.frameNumbers.includes(frameNumber));
        return { frameNumber, dataUrl, alt: photo.alt[language], caption: photo.caption[language], camera: camera?.name ?? '', stock: stock?.name ?? '' };
      }));
      const galleryData = JSON.stringify(offlinePhotos).replace(/</g, '\\u003c');
      const offlineHtml = `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Film Gallery — Eden Tan</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f3ef;color:#171411;font-family:system-ui,-apple-system,sans-serif}.wrap{width:min(1080px,100%);margin:auto;padding:clamp(24px,6vw,80px)}.k{font:700 12px ui-monospace,monospace;letter-spacing:.15em;text-transform:uppercase;color:#766f68}h1{font-size:clamp(56px,12vw,138px);line-height:.88;letter-spacing:-.07em;margin:22px 0 28px}.intro{max-width:720px;font-size:clamp(18px,2.4vw,28px);line-height:1.25;color:#514c47}.gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(24px,4vw,52px);margin-top:80px}figure{margin:0}img{display:block;width:100%;height:auto;border-radius:18px;background:#171411}figcaption{display:grid;gap:7px;padding-top:14px}.n{font:700 12px ui-monospace,monospace;color:#176b87}.gear{font-size:13px;color:#766f68}.cap{font-size:15px;line-height:1.5}@media(max-width:680px){.gallery{grid-template-columns:1fr;margin-top:48px}h1{font-size:58px}}
</style></head><body><main class="wrap"><p class="k">15 frames · 3 cameras · 2 film stocks</p><h1>Film Gallery</h1><p class="intro">Fifteen records of stopping to look: streets, water, buildings, temples, and people who happened to enter the frame.</p><section class="gallery" id="gallery"></section></main><script>
var photos=${galleryData},root=document.getElementById('gallery');photos.forEach(function(p){var f=document.createElement('figure'),img=document.createElement('img'),c=document.createElement('figcaption'),n=document.createElement('span'),g=document.createElement('span'),d=document.createElement('span');img.src=p.dataUrl;img.alt=p.alt;n.className='n';n.textContent=String(p.frameNumber).padStart(2,'0');g.className='gear';g.textContent=p.camera+' · '+p.stock;d.className='cap';d.textContent=p.caption;c.append(n,g,d);f.append(img,c);root.appendChild(f)});
</script></body></html>`;
      const file = new Blob([offlineHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'film-gallery-offline.html';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.alert(isZh ? '照片下载失败，请确认网络后再试一次。' : 'The photos could not be downloaded. Check your connection and try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="page-shell film-gallery-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="film-gallery-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="film-gallery-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="film-gallery-hero py-16 text-center md:py-24">
            <p className="film-gallery-kicker mx-auto">
              {isZh
                ? `${filmGalleryPhotos.length} 格 · 3 台相机 · 2 种胶卷`
                : `${filmGalleryPhotos.length} frames · 3 cameras · 2 film stocks`}
            </p>
            <h1 className="film-gallery-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Film Gallery' : 'Film Gallery'}
            </h1>
            <p className="film-gallery-subtitle mx-auto mt-5">
              {isZh
                ? '它不太像作品集，更像十五次停下来看的记录：街道、水岸、建筑、庙宇，以及偶然走进画面的人。'
                : 'Less a portfolio than fifteen records of stopping to look: streets, water, buildings, temples, and people who happened to enter the frame.'}
            </p>
            <p className="film-gallery-copy mx-auto mt-5">
              {isZh
                ? '使用 Konica Auto S2、Rolleiflex Old Standard (Model 621) 与 Zeiss Ikon Contessa 35 拍摄，胶卷为 Kodak Gold 200 和 400。每张照片下方保留当时使用的相机与胶卷。'
                : 'Shot on the Konica Auto S2, Rolleiflex Old Standard (Model 621), and Zeiss Ikon Contessa 35 with Kodak Gold 200 and 400. The camera and film stock stay with each frame below.'}
            </p>
            <div className="film-gallery-app-actions">
              <button type="button" onClick={installFilmGallery} disabled={isInstalled}>
                <Plus size={16} />
                <span>{isInstalled ? (isZh ? '已安装' : 'Installed') : isZh ? '安装 App' : 'Install app'}</span>
              </button>
              <button type="button" className="is-primary" onClick={downloadFilmGallery} disabled={isDownloading}>
                <Download size={16} />
                <span>{isDownloading ? (isZh ? '正在打包照片…' : 'Packing photos…') : isZh ? '下载离线版' : 'Download offline'}</span>
              </button>
            </div>
          </header>

          <section className="film-gallery-section pb-16 md:pb-24">
            <div className="film-gallery-section-header">
              <div className="film-gallery-section-head">
                <p className="film-gallery-kicker">
                  {isZh
                    ? `横向胶卷 / ${filmGalleryPhotos.length} 格`
                    : `Horizontal roll / ${filmGalleryPhotos.length} frames`}
                </p>
                <h2 className="film-gallery-section-title font-display font-bold tracking-tight">
                  {isZh ? '沿着胶卷，从左看到右。' : 'Follow the roll from left to right.'}
                </h2>
              </div>
              <div className="film-gallery-strip-actions">
                <p>{isZh ? '拖动、滑动，或使用方向键。' : 'Drag, swipe, or use the arrow controls.'}</p>
                <div>
                  <button type="button" onClick={() => scrollFilmStrip(-1)} aria-label={isZh ? '向左看上一组照片' : 'Scroll to previous film frames'}>
                    <ArrowLeft size={19} />
                  </button>
                  <button type="button" onClick={() => scrollFilmStrip(1)} aria-label={isZh ? '向右看下一组照片' : 'Scroll to next film frames'}>
                    <ArrowRight size={19} />
                  </button>
                </div>
              </div>
            </div>

            <div className="film-gallery-strip-shell mt-12">
              <div
                ref={filmStripRef}
                className="film-gallery-strip"
                role="region"
                aria-label={isZh ? '可横向滚动的胶片照片' : 'Horizontally scrollable film photographs'}
                tabIndex={0}
              >
              {filmGalleryFrames.map(({ photo, frameNumber }, index) => {
                const camera = filmGalleryCameras.find((item) => item.frameNumbers.includes(frameNumber));
                const stock = filmGalleryStocks.find((item) => item.frameNumbers.includes(frameNumber));

                return (
                  <figure
                    key={photo.src}
                    className="film-gallery-frame"
                  >
                    <div className="film-gallery-negative">
                      <img
                        src={resolveAssetPath(baseUrl, photo.src)}
                        alt={photo.alt[language]}
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    </div>
                    <figcaption>
                      <span className="film-gallery-frame-index">{String(frameNumber).padStart(2, '0')}</span>
                      {camera && stock ? (
                        <span className="film-gallery-frame-gear">
                          <span>{camera.name}</span>
                          <span aria-hidden="true">·</span>
                          <span>{stock.name}</span>
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                );
              })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const LifeFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [featuredVideo, ...archiveVideos] = lifeVideos;

  return (
    <div className="page-shell life-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="life-shell mx-auto">
          <div className="life-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="life-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="life-hero py-16 text-center md:py-24">
            <p className="life-kicker mx-auto">{isZh ? 'Life Notes / Video field' : 'Life Notes / Video field'}</p>
            <h1 className="life-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '出门的时候，系统先安静下来。' : 'When life leaves the desk.'}
            </h1>
            <p className="life-subtitle mx-auto mt-5">
              {isZh
                ? '不是旅行广告，也不是打卡清单。只是把海、风、岛和路上的片段，收进一个可以回看的生活档案。'
                : 'Not travel advertising. Not a checklist. A small archive of sea, wind, islands, and the parts of life worth replaying.'}
            </p>
            <div className="life-hero-actions mt-7 flex flex-wrap justify-center gap-5">
              <a href="#life-feature" className="life-text-cta">
                {isZh ? '看主片段' : 'Watch feature'} <span aria-hidden>›</span>
              </a>
              <a href="#life-archive" className="life-text-cta life-text-cta-muted">
                {isZh ? '看全部档案' : 'View archive'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section id="life-feature" className="life-feature-grid">
            <div className="life-feature-copy">
              <p className="life-kicker">{isZh ? 'Featured field note' : 'Featured field note'}</p>
              <h2 className="font-display font-bold tracking-tight">{featuredVideo.title[language]}</h2>
              <p>
                {isZh
                  ? '先放最大的一段。让画面比说明更早出现，页面只负责给它一个安静的观看位置。'
                  : 'The first clip gets the largest stage. Let the footage arrive before the explanation, with the page giving it a quiet place to breathe.'}
              </p>
              <a href={featuredVideo.href} target="_blank" rel="noopener noreferrer" className="life-text-cta">
                {isZh ? '在 YouTube 打开' : 'Open on YouTube'} <ExternalLink size={15} />
              </a>
            </div>
            <div className="life-feature-stage">
              <iframe
                src={featuredVideo.embedSrc}
                title={`${featuredVideo.title[language]} YouTube player`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>

          <section id="life-archive" className="life-section py-16 md:py-24">
            <div className="life-section-head">
              <p className="life-kicker">{isZh ? 'Small archive' : 'Small archive'}</p>
              <h2 className="life-section-title font-display font-bold tracking-tight">
                {isZh ? '留下来的，不一定是最完整的旅程。' : 'The saved parts are not always the whole trip.'}
              </h2>
              <p className="life-section-copy">
                {isZh
                  ? '这些片段更像生活里的样本：一个海岛、一段浪、一种离开日常之后身体重新醒来的节奏。'
                  : 'These clips work like field samples: an island, a wave, a rhythm where the body wakes up outside the usual routine.'}
              </p>
            </div>
            <div className="life-archive-grid mt-12">
              {archiveVideos.map((video, index) => (
                <article key={video.href} className="life-video-card">
                  <a href={video.href} target="_blank" rel="noopener noreferrer" className="life-video-thumb" aria-label={`${isZh ? '在 YouTube 打开' : 'Open on YouTube'} ${video.title[language]}`}>
                    <img src={video.thumbnailSrc} alt="" loading="lazy" />
                    <span className="life-play-mark" aria-hidden>
                      <span />
                    </span>
                  </a>
                  <div className="life-video-copy">
                    <p className="life-video-index">{String(index + 2).padStart(2, '0')}</p>
                    <h3 className="font-display font-bold tracking-tight">{video.title[language]}</h3>
                    <a href={video.href} target="_blank" rel="noopener noreferrer" className="life-text-cta life-text-cta-muted">
                      {isZh ? '在 YouTube 打开' : 'Open on YouTube'} <ExternalLink size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="life-note">
            <p className="life-kicker">{isZh ? 'Editorial rule' : 'Editorial rule'}</p>
            <p>
              {isZh
                ? 'Life 页面不需要解释太多。画面负责记忆，文字只负责给它一个位置。'
                : 'The Life page does not need to explain too much. Footage holds the memory. Words only give it a place.'}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

const brandGuidePrinciples = [
  {
    title: { en: 'Clarity', zh: '清晰' },
    copy: {
      en: 'One page. One point. One next step.',
      zh: '一页一个重点，一个下一步。',
    },
  },
  {
    title: { en: 'Restraint', zh: '克制' },
    copy: {
      en: 'Remove what does not help the reader decide.',
      zh: '删掉不能帮助判断的东西。',
    },
  },
  {
    title: { en: 'Depth', zh: '层级' },
    copy: {
      en: 'Use size, space, and real visuals.',
      zh: '用尺寸、留白和真实视觉。',
    },
  },
  {
    title: { en: 'Trust', zh: '信任' },
    copy: {
      en: 'Make it feel stable before asking for action.',
      zh: '先稳定，再行动。',
    },
  },
] as const;

const brandGuideDetailRules = [
  {
    title: { en: 'Whitespace shortens the decision path', zh: '留白缩短判断路径' },
    copy: {
      en: 'Let the main idea breathe.',
      zh: '让主信息有呼吸。',
    },
  },
  {
    title: { en: 'Radius creates a shared touch language', zh: '圆角统一触感' },
    copy: {
      en: 'Use one radius scale.',
      zh: '使用同一套圆角 scale。',
    },
  },
  {
    title: { en: 'Color must earn its place', zh: '颜色必须有来源' },
    copy: {
      en: 'Use color only when it explains.',
      zh: '颜色只在能解释时使用。',
    },
  },
  {
    title: { en: 'Short copy keeps the page decisive', zh: '短文案让页面更果断' },
    copy: {
      en: 'Say the point fast.',
      zh: '快速说重点。',
    },
  },
  {
    title: { en: 'Sharp visuals carry proof', zh: '清楚视觉承载证明' },
    copy: {
      en: 'Use real, sharp proof.',
      zh: '用真实、清楚的证明。',
    },
  },
  {
    title: { en: 'Motion explains, never distracts', zh: '动效解释，不抢戏' },
    copy: {
      en: 'Move only what helps.',
      zh: '只动有帮助的东西。',
    },
  },
] as const;

const brandGuidePalette = [
  {
    name: { en: 'Paper', zh: 'Paper' },
    hex: '#ffffff',
    role: { en: 'Primary canvas', zh: '主画布' },
    usage: { en: 'Main page background.', zh: '主页面背景。' },
  },
  {
    name: { en: 'Soft', zh: 'Soft' },
    hex: '#f5f5f7',
    role: { en: 'Section band', zh: '章节底色' },
    usage: { en: 'Quiet section surface.', zh: '安静的 section 底色。' },
  },
  {
    name: { en: 'Muted', zh: 'Muted' },
    hex: '#6e6e73',
    role: { en: 'Secondary voice', zh: '次级语气' },
    usage: { en: 'Support text and labels.', zh: '辅助文字和标签。' },
  },
  {
    name: { en: 'Ink', zh: 'Ink' },
    hex: '#111113',
    role: { en: 'Primary text', zh: '主文字' },
    usage: { en: 'Headlines and key text.', zh: '标题和重点文字。' },
  },
  {
    name: { en: 'Deep', zh: 'Deep' },
    hex: '#050505',
    role: { en: 'Inverted emphasis', zh: '反色重点' },
    usage: { en: 'Rare high-contrast moments.', zh: '少量高对比时刻。' },
  },
  {
    name: { en: 'Line', zh: 'Line' },
    hex: '#d9d9df',
    role: { en: 'Quiet divider', zh: '安静分隔' },
    usage: { en: 'Borders and dividers.', zh: '边框和分隔线。' },
  },
] as const;

const brandGuideAccent = [
  {
    name: { en: 'Eden Mint / Pink', zh: 'Eden Mint / Pink' },
    hex: { light: '#7bdcb5', dark: '#dc6f82' },
    role: { en: 'Primary by theme', zh: '跟随主题的主品牌色' },
    usage: {
      en: 'Mint in light mode. Pink in dark mode.',
      zh: '浅色用 Mint，深色用 Pink。',
    },
  },
  {
    name: { en: 'System Amber / Blue', zh: 'System Amber / Blue' },
    hex: { light: '#ffa340ed', dark: '#6fa4f0e6' },
    role: { en: 'Secondary by theme', zh: '跟随主题的系统辅助色' },
    usage: {
      en: 'Small system states and secondary signals.',
      zh: '小面积系统状态和次级信号。',
    },
  },
  {
    name: { en: 'Dream Purple', zh: 'Dream Purple' },
    hex: { light: '#a78bfa', dark: '#c4b5fd' },
    role: { en: 'Action color', zh: '行动色' },
    usage: {
      en: 'Links and action cues.',
      zh: '链接和行动提示。',
    },
  },
  {
    name: { en: 'Sky Tint', zh: 'Sky Tint' },
    hex: { light: '#dcebf8', dark: '#dcebf8' },
    role: { en: 'Cool support', zh: '冷色辅助' },
    usage: {
      en: 'Cool support tint.',
      zh: '冷色辅助。',
    },
  },
  {
    name: { en: 'Gold Tint', zh: 'Gold Tint' },
    hex: { light: '#f4dfb9', dark: '#f4dfb9' },
    role: { en: 'Warm support', zh: '暖色辅助' },
    usage: {
      en: 'Warm support tint.',
      zh: '暖色辅助。',
    },
  },
  {
    name: { en: 'Pink Tint', zh: 'Pink Tint' },
    hex: { light: '#f6d9d8', dark: '#f6d9d8' },
    role: { en: 'Human signal', zh: '人味信号' },
    usage: {
      en: 'Softer human moments.',
      zh: '柔和的人感时刻。',
    },
  },
  {
    name: { en: 'Green Tint', zh: 'Green Tint' },
    hex: { light: '#dcebd9', dark: '#dcebd9' },
    role: { en: 'System signal', zh: '系统信号' },
    usage: {
      en: 'Stable system signal.',
      zh: '稳定系统信号。',
    },
  },
] as const;

const brandGuideTypography = [
  {
    name: 'MiSans',
    role: { en: 'Primary typeface', zh: '主字体' },
    sample: { en: 'Build order from complexity.', zh: 'Build order from complexity.' },
    detail: {
      en: 'Use everywhere except system labels.',
      zh: '除系统标签外都用它。',
    },
  },
  {
    name: 'MiSans VF',
    role: { en: 'Weight system', zh: '字重系统' },
    sample: {
      en: 'Light / Regular / Medium / Semibold / Bold',
      zh: 'Light / Regular / Medium / Semibold / Bold',
    },
    detail: {
      en: 'Use weight for hierarchy.',
      zh: '用字重做层级。',
    },
  },
  {
    name: 'JetBrains Mono',
    role: { en: 'System voice', zh: '系统声线' },
    sample: { en: 'STATUS / CURRENTLY BUILDING / 2026', zh: 'STATUS / CURRENTLY BUILDING / 2026' },
    detail: { en: 'Use for labels and status text.', zh: '用于标签和状态文字。' },
  },
] as const;

const brandGuideRhythm = [
  {
    title: { en: 'Hero', zh: '首屏' },
    copy: {
      en: 'One claim. One action.',
      zh: '一个判断，一个行动。',
    },
  },
  {
    title: { en: 'Sections', zh: '章节' },
    copy: {
      en: 'One idea per section.',
      zh: '一个 section 一个想法。',
    },
  },
  {
    title: { en: 'Grids', zh: '网格' },
    copy: {
      en: 'Editorial grids use 2 / 1 columns. The Home media shelf uses 4 / 2 / 1.',
      zh: '内容网格用 2 / 1 栏；首页媒体入口用 4 / 2 / 1 栏。',
    },
  },
  {
    title: { en: 'Fluid page gutters', zh: '流体页面边距' },
    copy: {
      en: 'Use responsive gutters. Do not hard-cap the whole page.',
      zh: '使用响应式 gutter，不给整页设固定 max-width。',
    },
  },
] as const;

const brandGuideLayoutRules = [
  {
    title: { en: 'Use the available width', zh: '使用可用宽度' },
    copy: {
      en: 'Let sections and grids fill the page gutter.',
      zh: 'Section 和 grid 直接用到页面 gutter。',
    },
  },
  {
    title: { en: 'Two columns by default', zh: '默认两栏' },
    copy: {
      en: 'Two on desktop. One on mobile.',
      zh: '桌面两栏，手机一栏。',
    },
  },
  {
    title: { en: 'One visual, one idea', zh: '一个视觉，一个意思' },
    copy: {
      en: 'Art direction must explain the content.',
      zh: '视觉必须解释内容。',
    },
  },
  {
    title: { en: 'Cards need a reason', zh: '卡片要有理由' },
    copy: {
      en: 'Use cards for grouping, not decoration.',
      zh: '卡片用来分组，不是装饰。',
    },
  },
  {
    title: { en: 'Type follows its container', zh: '字号跟随容器' },
    copy: {
      en: 'Use clamp and container units when cards resize.',
      zh: '卡片缩放时用 clamp 和 container units。',
    },
  },
  {
    title: { en: 'Preserve the image', zh: '保留完整画面' },
    copy: {
      en: 'Contain by default. Crop only with intent.',
      zh: '默认完整显示，只在有意构图时裁切。',
    },
  },
] as const;

const brandGuideLayoutNumbers = [
  {
    value: { en: '44px', zh: '44px' },
    label: { en: 'Button / input minimum height.', zh: '按钮、输入框最小高度。' },
  },
  {
    value: { en: '2 max', zh: '最多 2 个' },
    label: { en: 'Hero buttons: primary + secondary.', zh: 'Hero 按钮：主按钮 + 次按钮。' },
  },
  {
    value: { en: '0.98-1.08', zh: '0.98-1.08' },
    label: { en: 'Large headline line-height ratio.', zh: '大标题行高比例。' },
  },
  {
    value: { en: '80-160px', zh: '80-160px' },
    label: { en: 'Desktop section top / bottom spacing.', zh: '桌面 section 上下留白。' },
  },
  {
    value: { en: '48-96px', zh: '48-96px' },
    label: { en: 'Mobile section top / bottom spacing.', zh: '手机 section 上下留白。' },
  },
  {
    value: { en: '16-24px', zh: '16-24px' },
    label: { en: 'Compact card inside padding.', zh: '紧凑卡片内部留白。' },
  },
  {
    value: { en: '24-32px', zh: '24-32px' },
    label: { en: 'Normal content card radius.', zh: '普通内容卡片圆角。' },
  },
  {
    value: { en: '20–48px', zh: '20–48px' },
    label: { en: 'Responsive page gutter. No global content cap.', zh: '响应式页面边距，不限制整页最大宽度。' },
  },
  {
    value: { en: '16:9', zh: '16:9' },
    label: { en: 'Home media banner aspect ratio.', zh: '首页媒体 banner 固定比例。' },
  },
  {
    value: { en: '4 / 2 / 1', zh: '4 / 2 / 1' },
    label: { en: 'Home media columns: desktop / tablet / mobile.', zh: '首页媒体栏数：桌面 / 平板 / 手机。' },
  },
  {
    value: { en: '1480px', zh: '1480px' },
    label: { en: 'Home media shelf maximum width.', zh: '首页媒体入口最大宽度。' },
  },
  {
    value: { en: '40px', zh: '40px' },
    label: { en: 'Home banner CTA minimum height.', zh: '首页 banner CTA 最小高度。' },
  },
] as const;

const brandGuideVoicePairs = [
  {
    avoid: { en: 'I build AI products.', zh: '我会做 AI 产品。' },
    prefer: {
      en: 'Turn scattered work into reusable systems.',
      zh: '把散落的工作变成可复用系统。',
    },
  },
  {
    avoid: { en: 'A visionary brand.', zh: '一个有远见的品牌。' },
    prefer: {
      en: 'Knowledge should compound.',
      zh: '知识应该复利。',
    },
  },
  {
    avoid: { en: 'Empowering people to transform their future.', zh: '赋能每个人改变未来。' },
    prefer: {
      en: 'Make the next move clear.',
      zh: '让下一步变清楚。',
    },
  },
] as const;

const brandGuideUseCases = [
  {
    title: { en: 'Home', zh: 'Home' },
    copy: {
      en: 'Lead with the point of view. Then use six material-backed 16:9 doors into products, systems, and lived work.',
      zh: '先说清观点，再用 6 个有真实素材的 16:9 入口，带人进入产品、系统与真实经历。',
    },
  },
  {
    title: { en: 'Projects', zh: 'Projects' },
    copy: { en: 'Problem, architecture, operations, proof, workflow.', zh: '问题、架构、运作、证明、流程。' },
  },
  {
    title: { en: 'Galleries', zh: '图库' },
    copy: { en: 'Keep the frame intact. Put factual metadata below.', zh: '保留完整画面，事实 metadata 放在图片下方。' },
  },
  {
    title: { en: 'Wiki', zh: 'Wiki' },
    copy: { en: 'Save durable knowledge, not one-shot answers.', zh: '保存可复用知识，不留一次性答案。' },
  },
  {
    title: { en: 'Interactive tools', zh: '互动工具' },
    copy: { en: 'One task at a time. Feedback must be immediate.', zh: '一次一个任务，反馈必须立即。' },
  },
  {
    title: { en: 'Story logs', zh: '故事记录' },
    copy: { en: 'Real moment first. Technical detail second.', zh: '真实时刻优先，技术细节其后。' },
  },
] as const;

const brandGuideHomeMediaRules = [
  {
    title: { en: 'Six live doors', zh: '6 个真实入口' },
    copy: {
      en: 'The current Home shelf contains six active destinations. Do not ship a placeholder card.',
      zh: '当前首页有 6 个可进入的目标。没有真实素材，就不要上线 placeholder 卡片。',
    },
  },
  {
    title: { en: 'Material first', zh: '真实素材优先' },
    copy: {
      en: 'Use a real image, a prepared video, or registered CSS art. Each medium must carry the project on its own.',
      zh: '使用真实图片、处理过的视频或已注册的 CSS art；每种媒介都必须能独立承载项目。',
    },
  },
  {
    title: { en: 'One responsive ratio', zh: '统一响应式比例' },
    copy: {
      en: 'Keep every card at 16:9. Use 4 / 2 / 1 columns, a 1480px cap, and 12px desktop gaps.',
      zh: '所有卡片保持 16:9；使用 4 / 2 / 1 栏、1480px 上限与 12px 桌面间距。',
    },
  },
  {
    title: { en: 'Action replaces labels', zh: '行动取代标签' },
    copy: {
      en: 'Linked banners reveal one centered white CTA. No tag, title, or description sits on the banner surface.',
      zh: '可点击 banner 只显示一个居中的白色 CTA；画面上不放 tag、title 或 description。',
    },
  },
  {
    title: { en: 'Loops stay quiet', zh: '循环视频保持安静' },
    copy: {
      en: 'Background videos are short, muted, looping, inline, and paired with a poster. Reduced motion falls back to the poster.',
      zh: '背景视频要短、静音、循环、内联，并配 poster；reduced motion 时回到静态 poster。',
    },
  },
  {
    title: { en: 'Viewing is intentional', zh: '完整观看要主动触发' },
    copy: {
      en: 'Long-form video with sound opens from an explicit Watch now action. It never autoplays inside the shelf.',
      zh: '带声音的完整影片由明确的“立即观看”触发，不在媒体入口中自动播放。',
    },
  },
] as const;

const brandGuideAssetRules = [
  {
    title: { en: 'App icons are framed', zh: 'App icon 有固定外框' },
    copy: {
      en: 'Square, rounded, and stable at small sizes.',
      zh: '正方形、圆角，小尺寸也要稳定。',
    },
  },
  {
    title: { en: 'Totems stay transparent', zh: '图腾保持透明底' },
    copy: {
      en: 'No forced app-icon frame or heavy outer box.',
      zh: '不强加 app icon 底或厚重外框。',
    },
  },
  {
    title: { en: 'Home banners use real material', zh: '首页 Banner 使用真实素材' },
    copy: {
      en: 'Use image, video, or registered CSS art in a stable 16:9 frame. No public placeholder.',
      zh: '在稳定的 16:9 画框中使用图片、视频或已注册 CSS art；公开页不放 placeholder。',
    },
  },
  {
    title: { en: 'Video needs a fallback', zh: '视频必须有 fallback' },
    copy: {
      en: 'Every loop needs a poster and a reduced-motion state.',
      zh: '每个循环视频都要有 poster 与 reduced-motion 状态。',
    },
  },
  {
    title: { en: 'CSS art comes from the registry', zh: 'CSS art 从 registry 取用' },
    copy: {
      en: 'Reuse the registered 16:9 component instead of copying its markup into Home.',
      zh: '复用已注册的 16:9 component，不把内部 markup 复制进 Home。',
    },
  },
  {
    title: { en: 'Photography keeps its frame', zh: '摄影保留原构图' },
    copy: {
      en: 'Use contain by default. Keep camera and film notes below.',
      zh: '默认 contain，相机与胶卷资讯放在图下。',
    },
  },
] as const;

const brandGuideCategories = [
  {
    name: { en: 'Foundation', zh: '基础层' },
    scope: { en: 'Start here', zh: '先看这里' },
    items: {
      en: ['Core thesis', 'Layout defaults', 'Size reference'],
      zh: ['核心主张', '版式默认值', '尺寸参考'],
    },
  },
  {
    name: { en: 'Surface system', zh: '表层系统' },
    scope: { en: 'Build the page', zh: '用于页面搭建' },
    items: {
      en: ['Theme colors', 'Typography', 'Home media system', 'Motion boundaries'],
      zh: ['主题色', '字体层级', '首页媒体系统', '动效边界'],
    },
  },
  {
    name: { en: 'Content usage', zh: '内容用法' },
    scope: { en: 'Apply by page type', zh: '按页面类型使用' },
    items: {
      en: ['Homepage', 'Project pages', 'Galleries', 'Wiki and stories'],
      zh: ['首页', '项目页', '图库', 'Wiki 与故事'],
    },
  },
] as const;

const brandGuideStoryRules = [
  {
    title: { en: 'Log the moment, not the score', zh: '记录时刻，不是战绩' },
    copy: {
      en: 'Remember the moment.',
      zh: '记住那个瞬间。',
    },
  },
  {
    title: { en: 'Only what really happened', zh: '只写真的' },
    copy: {
      en: 'Do not invent drama.',
      zh: '不要编戏剧效果。',
    },
  },
  {
    title: { en: 'Nicknames, not epic titles', zh: '用小名，别中二' },
    copy: {
      en: 'Use short names.',
      zh: '用短称呼。',
    },
  },
  {
    title: { en: 'Short, but cinematic', zh: '短，但有画面' },
    copy: {
      en: 'One beat per paragraph.',
      zh: '一段一个画面。',
    },
  },
  {
    title: { en: 'People first, details second', zh: '先有人，再有细节' },
    copy: {
      en: 'People carry the story.',
      zh: '人撑起故事。',
    },
  },
  {
    title: { en: 'Not a technical report', zh: '不是技术报告' },
    copy: {
      en: 'No jargon. No flexing.',
      zh: '不堆术语，不自夸。',
    },
  },
] as const;

const brandGuideStoryExample = {
  avoid: {
    en: 'The protagonist entered a dramatic conflict with the opposing archetype.',
    zh: '主角与对立原型进入戏剧性冲突。',
  },
  prefer: {
    en: 'He made the move. Everyone at the table went quiet.',
    zh: '他做了那个决定。桌边突然安静下来。',
  },
} as const;

const brandGuideMotionRules = [
  {
    title: { en: 'Object motion first', zh: '先动实体物件' },
    copy: {
      en: 'Move visible objects.',
      zh: '动可见物件。',
    },
  },
  {
    title: { en: 'Transform and opacity first', zh: '优先 transform 和 opacity' },
    copy: {
      en: 'Keep layout geometry stable.',
      zh: '保持布局尺寸稳定。',
    },
  },
  {
    title: { en: 'No ambient background motion', zh: '不做背景氛围动效' },
    copy: {
      en: 'No drifting glow, scan line, or card fade.',
      zh: '不用漂移 glow、扫描线或 card fade。',
    },
  },
  {
    title: { en: 'Preserve reduced motion', zh: '保留 reduced motion' },
    copy: {
      en: 'Support `prefers-reduced-motion`.',
      zh: '支持 `prefers-reduced-motion`。',
    },
  },
  {
    title: { en: 'Hover is a quiet cue', zh: 'Hover 只做轻提示' },
    copy: {
      en: 'Media may scale to 1.025 while the centered CTA appears.',
      zh: '媒体最多放大到 1.025，同时显示居中 CTA。',
    },
  },
  {
    title: { en: 'Loop video is background motion', zh: '循环视频属于背景动效' },
    copy: {
      en: 'Keep it silent and short. The content remains understandable from its poster.',
      zh: '保持短且静音；只看 poster 也必须能理解内容。',
    },
  },
] as const;

const brandGuideCssRules = [
  {
    title: { en: 'Material before entry', zh: '有素材才有入口' },
    copy: {
      en: 'A public Home banner requires an image, video, or registered CSS art asset.',
      zh: '公开首页 banner 必须有图片、视频或已注册 CSS art 资产。',
    },
  },
  {
    title: { en: 'Navigable media gets a CTA', zh: '可导航媒体必须有 CTA' },
    copy: {
      en: 'Use one centered action pill and an accessible link label. Do not fake a button on a dead card.',
      zh: '使用一个居中行动按钮与可访问 link label；不能在无链接卡片上伪装按钮。',
    },
  },
  {
    title: { en: 'Prepare video for the web', zh: '视频先为网页处理' },
    copy: {
      en: 'Use H.264, yuv420p, fast-start, muted background loops, and an explicit poster.',
      zh: '使用 H.264、yuv420p、fast-start、静音背景循环与明确 poster。',
    },
  },
  {
    title: { en: 'No background or card fade', zh: '不要 background / card fade' },
    copy: {
      en: 'No glow, scan lines, or card fades.',
      zh: '不要 glow、扫描线、card fade。',
    },
  },
  {
    title: { en: 'Solid category language', zh: '分类用实色系统' },
    copy: {
      en: 'Use rails, dots, chips, and borders.',
      zh: '用线、点、chip、border。',
    },
  },
  {
    title: { en: 'Registry before reuse', zh: '复用前先查 registry' },
    copy: {
      en: 'Reuse CSS art through `css-art.registry.ts`.',
      zh: '通过 `css-art.registry.ts` 复用 CSS art。',
    },
  },
  {
    title: { en: 'Separate art from layout', zh: '视觉与布局分离' },
    copy: {
      en: 'Art in `styles/css-art`; layout in `styles/pages`.',
      zh: 'Art 放 `styles/css-art`，layout 放 `styles/pages`。',
    },
  },
  {
    title: { en: 'Stable wrapper geometry', zh: '外层几何要稳定' },
    copy: {
      en: 'Every visual needs a fixed size or aspect ratio.',
      zh: '每个视觉都要有固定尺寸或比例。',
    },
  },
  {
    title: { en: 'Theme and motion are required', zh: '主题与减少动效是必须项' },
    copy: {
      en: 'Public visuals support light, dark, and reduced motion.',
      zh: '公开页视觉必须支持 light、dark 和 reduced motion。',
    },
  },
] as const;

const LifeOsFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const appUrl = 'https://edent95.github.io/8g-master/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsLifeOsCssIcon label="Life OS CSS app icon" />}
      name="Life OS"
      kicker={{ en: 'Personal system · Self-knowledge', zh: '个人系统 · 自我认识' }}
      tagline={{ en: 'Build the long-term base map first. Then ask about right now.', zh: '先建立长期底图，再问当下的问题。' }}
      meta={{ en: 'Free · Runs in any browser · Chinese interface', zh: '免费 · 浏览器直接打开 · 中文界面' }}
      primary={{ href: appUrl, external: true, label: { en: 'Open Life OS', zh: '打开 Life OS' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: appUrl,
        domain: 'edent95.github.io/8g-master',
        title: { en: 'Interactive Life OS star map', zh: 'Life OS 互动星图' },
        caption: { en: 'The live app, running right here. Open it in a new tab to build your own base map.', zh: '真实应用直接跑在这里。想建立自己的底图，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Most self-knowledge tools answer one question at a time, and every answer starts from zero. Life OS flips the order: it builds a long-term base map from your birth data first, then lets you ask situational questions against something that does not move.', zh: '大多数自我认识的工具都是一次回答一个问题，而且每次都从零开始。Life OS 把顺序倒过来：先用出生资料建立一张长期底图，之后所有当下的提问，都有一个不会晃动的参照。' } },
        { kind: 'p', text: { en: 'The map is assembled by cross-reading several traditional systems—BaZi, I Ching hexagrams, elemental profiling, and tarot records—and surfacing where they agree. What you read is an element profile, a current phase, a confidence level, and an action strategy, each traceable back to the evidence behind it.', zh: '这张底图由多个传统系统交叉阅读组成——八字、易经卦象、元素画像、塔罗记录——并把它们互相重合的部分提上来。你看到的是元素画像、当前阶段、置信度和行动策略，每一条都能追回它背后的证据。' } },
        { kind: 'h', text: { en: 'How it works', zh: '怎么使用' } },
        { kind: 'steps', items: [
          { title: { en: 'Build the base map', zh: '建立底图' }, text: { en: 'Enter birth date, time, and place. The system runs a time correction and generates your long-term profile.', zh: '输入出生日期、时间与地点。系统会做时间校正，并生成你的长期底图。' } },
          { title: { en: 'Read the profile', zh: '读画像' }, text: { en: 'Element profile, main axes, current phase, and a stated confidence level—not a fixed identity label.', zh: '元素画像、主元素、当前阶段和明确标出的置信度——不是一个固定的身份标签。' } },
          { title: { en: 'Ask about now', zh: '问当下' }, text: { en: 'Pick from question categories—self, timing, work, money, relationships, shadow, tactics—and read against the map.', zh: '从问题分类里选一个——自我、时机、事业、金钱、关系、阴影、当下战术——对着底图来读。' } },
          { title: { en: 'Take the evidence with you', zh: '带走证据' }, text: { en: 'Copy the whole thing as a prompt pack and keep asking inside any AI agent you already use.', zh: '把整份资料复制成 prompt 包，拿到你已经在用的任何 AI agent 里继续问。' } },
        ] },
        { kind: 'h', text: { en: 'What makes it different', zh: '它和别的不一样在哪' } },
        { kind: 'p', text: { en: 'It shows its work. Every conclusion sits on top of a visible evidence trail—which system said it, and how many of them agreed. When systems disagree, the confidence number drops instead of the disagreement quietly disappearing.', zh: '它把过程摊开。每一个结论上面都有一条可见的证据链——哪个系统说的、有几个系统同意。当系统之间不一致时，置信度会下降，而不是让分歧悄悄消失。' } },
        { kind: 'callout', label: { en: 'A map, not a label', zh: '这是底图，不是标签' }, text: { en: 'The profile describes the way you most often operate right now—the combination you reach for by default. It is a current tendency, not a fixed identity, and it is meant to be re-read as your situation changes.', zh: '画像描述的是你现在最常用的运作方式，是你默认会伸手去拿的那个组合。它是当前的倾向，不是固定身份，也本来就该在处境改变时重新读一次。' } },
        { kind: 'p', text: { en: 'It also refuses to lock you in. The Ask Agent panel packages your map and its evidence into a prompt you can paste anywhere, so the reading stays useful even outside this tool.', zh: '它也不想把你锁住。「问 Agent」会把你的底图和证据打包成一段可以贴到任何地方的 prompt，让这份阅读在这个工具之外依然有用。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Not prediction', zh: '不是预测' }, text: { en: 'Life OS is a framing and reflection tool, not fortune telling. It does not forecast events, and nothing here should stand in for medical, legal, or financial advice. Read the output as a prompt for your own thinking, not a verdict.', zh: 'Life OS 是一个整理与反思的工具，不是算命。它不预测事件，也不应该拿来代替医疗、法律或财务上的专业意见。把输出当成让你自己继续想下去的提示，而不是判决。' } },
      ]}
      faq={[
        { q: { en: 'Is this fortune telling?', zh: '这是算命吗？' }, a: { en: 'No. It compiles traditional systems into a readable profile with visible sources and a confidence level. It is built for reflection and framing—what tends to be true about how you operate—not for predicting what will happen.', zh: '不是。它把几个传统系统整理成一份可读、可溯源、带置信度的画像。它是拿来反思和整理的——关于你通常怎么运作——而不是拿来预测会发生什么。' } },
        { q: { en: 'What information do I need to provide?', zh: '需要提供什么资料？' }, a: { en: 'Birth date, time, place, and gender. The more accurate the birth time, the more stable the corrected base map—the system applies a time correction before building anything.', zh: '出生日期、时间、地点和性别。出生时间越准，校正后的底图越稳——系统会先做时间校正，再开始生成。' } },
        { q: { en: 'Why build a base map before asking questions?', zh: '为什么要先建底图再提问？' }, a: { en: 'A single question tends to get answered by whatever mood you are in that day. The base map is the part that does not move, so situational answers have something to be measured against.', zh: '单独一个问题，答案很容易被你当天的情绪带走。底图是不会动的那部分，当下的答案才有东西可以对照。' } },
        { q: { en: 'What is the Ask Agent panel?', zh: '「问 Agent」是什么？' }, a: { en: 'It packages your profile and its underlying evidence into a copyable prompt. Paste it into whichever AI you already use and keep the conversation going there—the reading is not trapped inside this tool.', zh: '它把你的画像和背后的证据打包成一段可复制的 prompt。贴到你已经在用的任何 AI 里继续聊——这份阅读不会被困在这个工具里。' } },
        { q: { en: 'Is the interface in Chinese?', zh: '界面是中文的吗？' }, a: { en: 'Yes. Life OS is currently a Chinese-language app, including the readings and the generated prompt packs.', zh: '是的。Life OS 目前是中文应用，包括阅读内容和生成的 prompt 包。' } },
        { q: { en: 'Which systems does it read from?', zh: '它读的是哪些系统？' }, a: { en: 'BaZi, I Ching hexagrams, elemental profiling, and tarot records. Conclusions with agreement across several systems are weighted higher than anything a single system says alone.', zh: '八字、易经卦象、元素画像和塔罗记录。在多个系统之间重合的结论，权重会高于任何单一系统自己说的话。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Personal system and self-knowledge', zh: '个人系统与自我认识' }],
        [{ en: 'Systems read', zh: '读取系统' }, { en: 'BaZi · I Ching · Element profile · Tarot records', zh: '八字 · 易经卦象 · 元素画像 · 塔罗记录' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Star map · Base map · Ask · Records', zh: '星图 · 个人底图 · 提问 · 记录' }],
        [{ en: 'Output', zh: '输出' }, { en: 'Element profile · Current phase · Action strategy · Agent prompt pack', zh: '元素画像 · 当前阶段 · 行动策略 · Agent prompt 包' }],
        [{ en: 'Interface', zh: '界面语言' }, { en: 'Chinese', zh: '中文' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive web app', zh: '响应式 Web App' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'life-os')}
    />
  );
};

const BrandGuideFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const faviconSrc = joinBasePath(baseUrl, 'favicon.svg');

  return (
    <div className="page-shell brand-guide-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="brand-guide-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="brand-guide-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="brand-guide-hero py-16 text-center md:py-24">
            <p className="brand-guide-kicker mx-auto">
              {isZh ? 'Brand Guide' : 'Brand Guide'}
            </p>
            <h1 className="brand-guide-hero-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '品牌指南' : 'Brand Guide'}
            </h1>
            <p className="brand-guide-hero-subtitle mx-auto mt-5">
              {isZh
                ? '从混乱中建立系统。'
                : 'Build systems from chaos.'}
            </p>
            <p className="brand-guide-hero-copy mx-auto mt-5">
              {isZh
                ? '把复杂的人类行为与混乱现实，转化为真正有用的产品、数据与 AI 系统。'
                : 'I turn complex human behavior and messy realities into useful products, data, and AI systems.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#brand-philosophy" className="brand-guide-cta">
                {isZh ? '看核心哲学' : 'View philosophy'} <span aria-hidden>›</span>
              </a>
              <a href="#brand-rules" className="brand-guide-cta brand-guide-cta-muted">
                {isZh ? '看执行规则' : 'View rules'} <span aria-hidden>›</span>
              </a>
            </div>
            <div className="brand-guide-signature mx-auto mt-12">
              <div className="brand-guide-mark">
                <img src={faviconSrc} alt="" width={72} height={72} />
              </div>
              <div>
                <p className="brand-guide-signature-label">{isZh ? '执行句 / Operating line' : 'Operating line'}</p>
                <p className="brand-guide-signature-line font-display font-bold tracking-tight">
                  <span>Build order from</span>
                  <span>complexity.</span>
                </p>
              </div>
            </div>
          </header>

          <section className="brand-guide-classification py-12 md:py-16" aria-labelledby="brand-guide-classification-title">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? 'Guide map' : 'Guide map'}</p>
              <h2 id="brand-guide-classification-title" className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '按顺序使用。' : 'Use it in order.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '先规则，再视觉，再应用。'
                  : 'Rules first. Visuals second. Application last.'}
              </p>
            </div>
            <div className="brand-guide-category-grid mt-10">
              {brandGuideCategories.map((category, index) => (
                <article key={category.name.en} className={`brand-guide-category-card brand-guide-category-${index + 1}`}>
                  <p className="brand-guide-card-index">{category.scope[language]}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{category.name[language]}</h3>
                  <ul>
                    {category.items[language].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-philosophy" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '01 / Core philosophy' : '01 / Core philosophy'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '内容先行。' : 'Content first.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '界面服务判断，不抢内容。'
                  : 'The interface supports the point.'}
              </p>
            </div>
            <article className="brand-guide-manifesto mt-12">
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Manifesto' : 'Manifesto'}</p>
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  {isZh ? '先让知识留下来。' : 'Make knowledge durable first.'}
                </h3>
              </div>
              <p>
                {isZh
                  ? '内容要能沉淀、复用、继续生长。界面只负责让这件事更清楚。'
                  : 'Content should persist, stay reusable, and keep growing. The interface only makes that easier to understand.'}
              </p>
            </article>
            <div className="brand-guide-principle-grid mt-5 grid gap-4 md:grid-cols-4">
              {brandGuidePrinciples.map((item, index) => (
                <article key={item.title.en} className="brand-guide-principle-card">
                  <p className="brand-guide-card-index">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-detail-grid mt-8">
              {brandGuideDetailRules.map((item) => (
                <article key={item.title.en} className="brand-guide-detail-item">
                  <h3>{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-rules" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '02 / Design rules' : '02 / Design rules'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '页面规则。' : 'Page rules.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '默认按这些做。'
                  : 'Use these as defaults.'}
              </p>
            </div>
            <div className="brand-guide-layout-grid mt-12">
              {brandGuideLayoutRules.map((item, index) => (
                <article key={item.title.en} className={`brand-guide-layout-card brand-guide-layout-card-${index + 1}`}>
                  <p className="brand-guide-card-index">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '03 / Layout numbers' : '03 / Layout numbers'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '页面尺寸参考。' : 'Page size reference.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '做页面时先用这些值。'
                  : 'Use these values first when building pages.'}
              </p>
            </div>
            <div className="brand-guide-layout-spec-grid mt-8">
              {brandGuideLayoutNumbers.map((item) => (
                <article key={item.value.en} className="brand-guide-layout-spec-card">
                  <b>{item.value[language]}</b>
                  <p>{item.label[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '04 / Visual system' : '04 / Visual system'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '颜色只做信号。' : 'Color is signal.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? 'Mint / Pink 随主题切换。Amber / Blue 是系统辅助。Dream Purple 负责行动。'
                  : 'Mint / Pink switch with theme. Amber / Blue support system states. Dream Purple carries action.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="brand-guide-color-board">
                {brandGuidePalette.map((row) => (
                  <article key={row.hex} className="brand-guide-swatch">
                    <span className="brand-guide-swatch-chip" style={{ backgroundColor: row.hex }} />
                    <div>
                      <p className="brand-guide-card-index">{row.hex}</p>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{row.name[language]}</h3>
                      <p><strong>{row.role[language]}</strong> · {row.usage[language]}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="brand-guide-color-board brand-guide-accent-board">
                {brandGuideAccent.map((row) => (
                  <article key={row.name.en} className="brand-guide-swatch">
                    <span
                      className="brand-guide-swatch-chip"
                      style={{ backgroundColor: row.hex[theme] }}
                    />
                    <div>
                      <p className="brand-guide-card-index">{row.hex[theme]}</p>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{row.name[language]}</h3>
                      <p><strong>{row.role[language]}</strong> · {row.usage[language]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '05 / Type and rhythm' : '05 / Type and rhythm'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '少用字体变化。' : 'Keep type simple.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '标题、正文、标签，三层够了。'
                  : 'Display, body, label. That is enough.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {brandGuideTypography.map((item) => (
                <article key={item.name} className="brand-guide-type-card">
                  <p className="brand-guide-card-index">{item.name}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.role[language]}</h3>
                  <p className={item.name === 'JetBrains Mono' ? 'font-mono' : 'font-display text-2xl font-bold'}>
                    {item.sample[language]}
                  </p>
                  <p>{item.detail[language]}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {brandGuideRhythm.map((item) => (
                <article key={item.title.en} className="brand-guide-rhythm-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-voice" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '06 / Voice' : '06 / Voice'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '说清楚能帮什么。' : 'Make the help clear.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '少说自己，多说结果。'
                  : 'Less about me. More about the result.'}
              </p>
            </div>
            <div className="mt-12 space-y-4">
              {brandGuideVoicePairs.map((pair) => (
                <article key={pair.avoid.en} className="brand-guide-voice-row">
                  <div>
                    <p className="brand-guide-card-index">{isZh ? 'Avoid' : 'Avoid'}</p>
                    <p>{pair.avoid[language]}</p>
                  </div>
                  <div>
                    <p className="brand-guide-card-index">{isZh ? 'Prefer' : 'Prefer'}</p>
                    <p>{pair.prefer[language]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '07 / Application' : '07 / Application'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '每页都要清楚。' : 'Every page must be clear.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '不同页面可以有不同构图，但都要回到清楚、可复用、有证据。'
                  : 'Pages may use different compositions, but they return to clarity, reuse, and proof.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideUseCases.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '当前首页 / Home media system' : 'Current Home / Media system'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideHomeMediaRules.map((item) => (
                  <article key={item.title.en} className="brand-guide-rule-card">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '视觉资产 / Asset types' : 'Visual assets / Asset types'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideAssetRules.map((item) => (
                  <article key={item.title.en} className="brand-guide-rule-card">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="brand-story" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '08 / Story content' : '08 / Story content'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '故事写真实时刻。' : 'Stories record real moments.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '短、真、有画面。'
                  : 'Short, true, visual.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideStoryRules.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <article className="brand-guide-voice-row mt-5">
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Avoid' : 'Avoid'}</p>
                <p>{brandGuideStoryExample.avoid[language]}</p>
              </div>
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Prefer' : 'Prefer'}</p>
                <p>{brandGuideStoryExample.prefer[language]}</p>
              </div>
            </article>
          </section>

          <section id="brand-motion" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '09 / Motion language' : '09 / Motion language'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '动效要轻。' : 'Motion stays light.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '动实体物件，不动背景气氛。'
                  : 'Move objects, not atmosphere.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideMotionRules.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '当前实现规则 / Current implementation' : 'Current implementation rules'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideCssRules.map((item, index) => (
                  <article key={item.title.en} className={`brand-guide-rule-card brand-guide-rule-${index + 1}`}>
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <p className="pb-10 text-center text-xs text-stone-500">
            {isZh
              ? '最后对齐：2026-07-21 · 以当前首页、代码库和 log.md 为准。'
              : 'Last reconciled: 21 Jul 2026 · Source: current Home + repo + log.md.'}
          </p>
        </div>
      </main>
    </div>
  );
};

const ArchivedWorkPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  work: (typeof archivedWorks)[number];
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, work, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  return (
    <div className="page-shell min-h-screen text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <section className="motion-card mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              {isZh ? '归档项目' : 'Archived Work'}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              {work.title[language]}
            </h1>
            <p className="mt-4 text-sm text-stone-500">{work.origin[language]}</p>
            <p className="mt-4 text-base leading-relaxed text-stone-700">{work.summary[language]}</p>
            {work.externalLink && (
              <a
                href={work.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
              >
                {work.externalLabel?.[language] ?? (isZh ? '打开原始链接' : 'Open Source Link')}
                <ExternalLink size={14} />
              </a>
            )}
            {work.imagePath && (
              <figure className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                <img
                  src={resolveAssetPath(baseUrl, work.imagePath)}
                  alt={work.imageAlt?.[language] ?? `${work.title[language]} archived visual`}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
                {work.imageCaption && (
                  <figcaption className="border-t border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
                    {work.imageCaption[language]}
                  </figcaption>
                )}
              </figure>
            )}
            {work.imageGallery && work.imageGallery.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {work.imageGallery.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                    <img
                      src={resolveAssetPath(baseUrl, image.src)}
                      alt={image.alt[language]}
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />
                    {image.caption && (
                      <figcaption className="border-t border-stone-200 bg-white px-3 py-2 text-sm text-stone-600">
                        {image.caption[language]}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </section>

          <div className="mt-6 space-y-5">
            {work.sections.map((section) => (
              <section key={section.heading.en} className="motion-card rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-stone-900">{section.heading[language]}</h2>
                <ul className="mt-4 space-y-2 text-stone-700">
                  {section.points[language].map((point, pointIndex) => (
                    <li key={`${section.heading.en}-${pointIndex}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {work.references && work.references.length > 0 && (
              <section className="motion-card rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  {isZh ? '来源参考' : 'Source References'}
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {work.references.map((reference) => (
                    <a
                      key={reference.href}
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                    >
                      {reference.label[language]}
                      <ExternalLink size={13} />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const PreviousProjectsFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  return (
    <div className="page-shell min-h-screen text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <div className="motion-card mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              {isZh ? '历史项目档案' : 'Previous Project Archive'}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              {isZh ? '之前都做过些什么' : 'Stuff I’ve worked on'}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-stone-600">
              {isZh
                ? '把这些年做过的项目都摊在这里，每段在干嘛、解决了什么，尽量讲清楚，不堆漂亮话。'
                : 'Everything I’ve worked on over the years, laid out here — what each role was actually about and what it fixed, in plain terms, minus the résumé polish.'}
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {previousProjectsData.map((project, index) => (
              <section key={project.title.en} className="motion-card rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">
                    {project.title[language]}
                  </h2>
                  <span className="rounded bg-stone-100 px-2 py-1 font-mono text-xs text-stone-500">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '时间线' : 'Timeline'}
                </p>
                <p className="mt-1 text-base leading-relaxed text-stone-700">{project.period[language]}</p>
                <ul className="mt-4 space-y-2 text-stone-700">
                  {project.points[language].map((point, pointIndex) => (
                    <li key={`${project.title.en}-${pointIndex}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {project.relatedLinks && project.relatedLinks.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                      {isZh ? '相关项目' : 'Related Works'}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {project.relatedLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href.startsWith('/') ? joinBasePath(baseUrl, link.href) : link.href}
                          target={link.href.startsWith('/') ? undefined : '_blank'}
                          rel={link.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                        >
                          {link.label[language]}
                          <ExternalLink size={13} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const JijuPetFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const jijuUrl = 'https://jiju.pet/';
  const jijuInstallUrl = 'https://jiju.pet/?install=1';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsJijuCssIcon label="Jiju CSS app icon" />}
      name="Jiju"
      kicker={{ en: 'Local discovery · Pet life', zh: '本地发现 · 宠物生活' }}
      tagline={{ en: 'Find places that truly work for you and your pet.', zh: '找到真正适合你和宠物一起去的地方。' }}
      meta={{ en: 'Free · Starting in Penang · Runs in any browser', zh: '免费 · 从 Penang 开始 · 浏览器直接打开' }}
      primary={{ href: jijuUrl, external: true, label: { en: 'Open Jiju', zh: '打开 Jiju' } }}
      secondary={{ href: jijuInstallUrl, external: true, icon: <Download size={16} />, label: { en: 'Install app', zh: '安装 App' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: jijuUrl,
        domain: 'jiju.pet',
        title: { en: 'Interactive Jiju website', zh: 'Jiju 互动网站' },
        caption: { en: 'The live site, running right here. Open it in a new tab to search your own area.', zh: '真实网站直接跑在这里。想搜自己的区域，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Jiju is a local discovery system built around real life with pets. It helps pet parents understand place policies, space, and lived experience before leaving—and gives every outing a place to be remembered.', zh: 'Jiju 是一个围绕真实宠物生活建立的本地发现系统。它帮助宠物主人在出门前看懂地点政策、空间条件与实际体验，也让每次到访成为可以保存和回看的共同记忆。' } },
        { kind: 'p', text: { en: 'The goal is not the largest directory. It is information worth trusting: whether a place genuinely welcomes pets, which pets it works for, where they can stay, and whether conditions have changed since the last visit.', zh: '目标不是收集最多地点，而是让资料值得相信：这个地方是否真的欢迎宠物、适合哪种宠物、应该坐哪里，以及最近的情况有没有改变。' } },
        { kind: 'h', text: { en: 'How it works', zh: '怎么使用' } },
        { kind: 'steps', items: [
          { title: { en: 'Discover', zh: '发现' }, text: { en: 'Start with location, pet needs, and the real situation you are planning for.', zh: '按地点、宠物需求和真实场景开始探索。' } },
          { title: { en: 'Check', zh: '确认' }, text: { en: 'Review policy, space, facilities, and community records before leaving.', zh: '先查看政策、空间、设施与社区记录。' } },
          { title: { en: 'Visit', zh: '到访' }, text: { en: 'Arrive with clearer expectations and enjoy a real outing together.', zh: '带着更清楚的预期，完成一次真实出门。' } },
          { title: { en: 'Remember', zh: '记录' }, text: { en: 'Save the memory, improve the listing, and help the next pet parent.', zh: '留下回忆、补充资料，并帮助下一位宠物主人。' } },
        ] },
        { kind: 'h', text: { en: 'What Jiju is built around', zh: 'Jiju 围绕什么建立' } },
        { kind: 'p', text: { en: 'Discovery works through real needs, not ratings alone. Indoor or outdoor, pet policy, space, and the on-site reality should all be clear before you decide to go.', zh: '发现是用真实需求驱动的，不只看星级。室内或户外、宠物政策、空间和现场体验，都应该在你决定出门前就说清楚。' } },
        { kind: 'p', text: { en: 'Trust comes from cross-checking. Place details, merchant policies, and community records verify one another, which reduces the gap between a listing and the real visit.', zh: '信任来自互相验证。地点资料、商家政策与社区记录彼此校对，减少「到了才发现不适合」的落差。' } },
        { kind: 'callout', label: { en: 'Memory', zh: '记忆' }, text: { en: 'Each pet gets a real profile, so the places you visited, the experiences you shared, and how they grew over time all stay in one place.', zh: '每只宠物都有真实档案，把去过的地方、共同经历和成长过程都保存在同一个地方。' } },
        { kind: 'p', text: { en: 'Community keeps it alive. People contribute places, update conditions, and record sanctuary impact, so the knowledge improves through use instead of aging quietly.', zh: '社区让它活着。用户贡献地点、补充情况并记录 Sanctuary impact，让资料随着使用持续变好，而不是慢慢过期。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Trust boundary', zh: '信任边界' }, text: { en: 'Pets are real identities, not content props. Pet profiles, photos, and community activity need clear permission boundaries, and changing place conditions should be updated instead of misleading the next visit.', zh: '宠物是真实身份，不是内容道具。宠物档案、照片和社区互动需要清楚的权限边界；地点变动应该被更新，而不是让旧资料一直误导下一次出门。' } },
      ]}
      faq={[
        { q: { en: 'Which city does Jiju cover?', zh: 'Jiju 覆盖哪个城市？' }, a: { en: 'It starts in Penang, Malaysia. Depth matters more than reach here—one city with information you can actually rely on is worth more than ten with thin listings.', zh: '目前从马来西亚 Penang 开始。这里深度比覆盖面重要——一个城市里可靠的资料，胜过十个城市的空壳列表。' } },
        { q: { en: 'How is this different from a maps search?', zh: '和地图搜索有什么不同？' }, a: { en: 'A maps result tells you a place exists. Jiju tells you whether it works for your pet: the policy, the space, where they can sit, and what recent visitors actually found.', zh: '地图告诉你有这个地方。Jiju 告诉你它适不适合你的宠物：政策、空间、可以待在哪，以及最近去过的人实际看到什么。' } },
        { q: { en: 'Do I need an account?', zh: '需要注册吗？' }, a: { en: 'You can browse and search without one. An account is for the parts that belong to you—pet profiles, saved places, and visit records.', zh: '浏览和搜索不需要。账号是为了那些属于你的部分——宠物档案、收藏地点和到访记录。' } },
        { q: { en: 'Can I add or correct a place?', zh: '我可以新增或更正地点吗？' }, a: { en: 'Yes. Contributions are the point. A place that changed its policy is worth reporting, because the next pet parent is the one who benefits.', zh: '可以，贡献本来就是重点。地点改了政策就值得回报，因为下一个宠物主人会因此受益。' } },
        { q: { en: 'Is there an app to install?', zh: '有 App 可以安装吗？' }, a: { en: 'Jiju is a responsive web app, so it works in any browser. The Install app button adds it to your home screen as a standalone app.', zh: 'Jiju 是响应式 Web App，任何浏览器都能用。点「安装 App」就会加到主屏幕，变成独立应用。' } },
        { q: { en: 'What is Sanctuary impact?', zh: 'Sanctuary impact 是什么？' }, a: { en: 'It is a record of community contribution around rescue and shelter work, kept alongside the discovery data rather than treated as a separate campaign.', zh: '这是关于救助与收容工作的社区贡献记录，和发现数据放在一起，而不是当成另一场独立活动。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Local discovery and pet life', zh: '本地发现与宠物生活' }],
        [{ en: 'Current city', zh: '当前城市' }, { en: 'Penang, Malaysia', zh: '马来西亚 Penang' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Discovery · Place profiles · Pet profiles · Visits · Community', zh: '发现 · 地点档案 · 宠物档案 · 到访 · 社区' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive web app', zh: '响应式 Web App' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'jiju')}
    />
  );
};

const JijuPetLegacyFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const jijuSystemCards = isZh
    ? [
        { title: 'Discovery', copy: '把宠物友好地点从零散资讯整理成可探索的小地图。' },
        { title: 'Trust', copy: '用地点政策、真实记录和后台安全机制建立信任层。' },
        { title: 'Memory', copy: '让带宠出门不只是一次消费，而是能被记录和回看的经历。' },
        { title: 'Community', copy: '让用户贡献、验证和 Sanctuary impact 逐步形成复利。' },
      ]
    : [
        { title: 'Discovery', copy: 'Turn scattered pet-friendly information into a map people can actually explore.' },
        { title: 'Trust', copy: 'Build trust through place policy, real records, and safer backoffice operations.' },
        { title: 'Memory', copy: 'Make outings more than transactions by giving them a place to be remembered.' },
        { title: 'Community', copy: 'Let contribution, verification, and sanctuary impact compound over time.' },
      ];
  const jijuProofPoints = isZh
    ? [
        ['Started', 'Penang first'],
        ['Core loop', 'Discover -> Visit -> Record -> Contribute'],
        ['Current focus', 'Trust, mobile UX, analytics, community'],
        ['Build style', 'Log-driven, measurable, iterative'],
      ]
    : [
        ['Started', 'Penang first'],
        ['Core loop', 'Discover -> Visit -> Record -> Contribute'],
        ['Current focus', 'Trust, mobile UX, analytics, community'],
        ['Build style', 'Log-driven, measurable, iterative'],
      ];

  return (
    <div className="page-shell jiju-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="jiju-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="jiju-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="jiju-hero py-16 text-center md:py-24">
            <p className="jiju-kicker mx-auto">{isZh ? 'Jiju.pet / Pet-friendly discovery system' : 'Jiju.pet / Pet-friendly discovery system'}</p>
            <h1 className="jiju-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'A trusted pet life platform, starting from a smaller map.' : 'A trusted pet life platform, starting from a smaller map.'}
            </h1>
            <p className="jiju-subtitle mx-auto mt-5">
              {isZh
                ? 'Jiju 不是普通 pet-friendly cafe list。它正在从地点目录进化成一套围绕可信资料、真实宠物档案、社区共建、回访成长和后台运营的宠物生活平台。'
                : 'Jiju is not a normal pet-friendly cafe list. It is evolving from a place directory into a pet life platform around trusted information, real pet profiles, community contribution, revisit growth, and backoffice operations.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="https://jiju.pet" target="_blank" rel="noopener noreferrer" className="jiju-text-cta">
                {isZh ? '打开 jiju.pet' : 'Open jiju.pet'} <ExternalLink size={15} />
              </a>
              <a href="#build-log" className="jiju-text-cta jiju-text-cta-muted">
                {isZh ? '看构建记录' : 'View build log'} <span aria-hidden>›</span>
              </a>
              <a href={joinBasePath(import.meta.env.BASE_URL || '/', 'jiju-revamp')} className="jiju-text-cta jiju-text-cta-muted">
                {isZh ? '看转型提案' : 'View revamp proposal'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section className="jiju-product-panel">
            <div className="jiju-product-copy">
              <p className="jiju-kicker">{isZh ? 'Product system' : 'Product system'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '不是咖啡馆列表。是一套宠物出门系统。' : 'Not a cafe list. A system for pet outings.'}
              </h2>
              <p>
                {isZh
                  ? 'Jiju.pet 的核心不是把地点堆起来，而是让养宠的人更快判断：哪里能去、规则是否可信、这次出门值不值得留下记录，后台能不能长期维护，社区能不能一起把资料变得更准。'
                  : 'The point is not to pile up places. Jiju.pet helps pet parents decide where to go, whether the policy is trustworthy, whether the outing is worth remembering, whether operations can maintain it, and whether the community can make the map more accurate over time.'}
              </p>
            </div>
            <div className="jiju-proof-grid">
              {jijuProofPoints.map(([label, value]) => (
                <div key={label} className="jiju-proof-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Archive review' : 'Archive review'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '这次复盘看到的，不是功能不会做，而是边界开始漂移。' : 'The review revealed boundary drift, not a lack of features.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '基于项目 log、Memory、Agent Knowledge Digest、设计理念、soul 与 AGENTS 的整理，Jiju 的真正变化是：把感觉变成规则，把 bug fix 变成系统，把聊天判断沉淀成可复用 SOP。'
                  : 'Based on the project log, Memory, Agent Knowledge Digest, design notes, soul, and AGENTS, the real shift is turning instinct into rules, bug fixes into systems, and chat decisions into reusable SOPs.'}
              </p>
            </div>
            <div className="jiju-review-track mt-12">
              {jijuArchiveReviewTracks.map((item) => (
                <article key={item.label.en} className="jiju-review-card">
                  <span>{item.label[language]}</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'What it becomes' : 'What it becomes'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '地点、信任、记忆和社区，放进同一个产品循环。' : 'Places, trust, memory, and community in one product loop.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {jijuSystemCards.map((item) => (
                <article key={item.title} className="jiju-system-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Operating model' : 'Operating model'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '可信度不是一个按钮，是资料链路。' : 'Trust is not a button. It is an information chain.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh
                  ? 'Information Accuracy 不是普通纠错入口，而是平台信任资产。Add Cafe、owner form、BO review、Cafe Profile、SEO/AEO 页面要读同一套事实。'
                  : 'Information Accuracy is not a cosmetic correction feature. Add Cafe, owner forms, BO review, Cafe Profile, and SEO/AEO pages need to read from the same facts.'}
              </p>
            </div>
            <div className="jiju-operating-grid mt-12">
              {jijuOperatingModel.map((group) => (
                <article key={group.title.en} className="jiju-operating-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{group.title[language]}</h3>
                  <ul>
                    {group.lines[language].map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Decision DNA' : 'Decision DNA'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '构建方式比功能清单更重要。' : 'The build method matters more than the feature list.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {decisionDna.map((item) => (
                <article key={item.trait.en} className="jiju-dna-card">
                  <p className="jiju-card-emoji">{item.emoji}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.trait[language]}</h3>
                  <p>{item.detail[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'System notes' : 'System notes'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '从知识库抽出的核心系统。' : 'Core systems extracted from the build archive.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '这部分保留原本知识摘要，但排版变成更容易扫描的系统文件。'
                  : 'This keeps the original knowledge summary, but turns it into scannable system files.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {jijuKnowledgeHighlights.map((section) => (
                <article key={section.title.en} className="jiju-note-card">
                  <div className="flex items-center gap-3">
                    <span className="jiju-card-emoji">{section.emoji}</span>
                    <h3 className="font-display text-2xl font-bold tracking-tight">{section.title[language]}</h3>
                  </div>
                  <ul>
                    {section.points[language].map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Reusable methods' : 'Reusable methods'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '后来沉淀下来的，不只是 Jiju 技术债，而是一组可复用 skills。' : 'What remained was not only Jiju technical debt, but reusable build skills.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '这些方法解决的是 agent 反复踩坑、前后台不同步、demo 变假、外部服务失效、路由与 SEO 漂移等长期问题。'
                  : 'These methods address repeated agent mistakes, frontend/backoffice drift, fake demos, external-service failure, and route/SEO drift.'}
              </p>
            </div>
            <div className="jiju-skill-grid mt-12">
              {jijuSkillCards.map((item) => (
                <article key={item.title.en} className="jiju-skill-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Project philosophy' : 'Project philosophy'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? 'Jiju 最重要的复盘，不是功能，而是判断标准。' : 'The most important Jiju review is not about features, but judgment.'}
              </h2>
            </div>
            <div className="jiju-philosophy-list mt-12">
              {jijuPhilosophyPoints.map((item) => (
                <article key={item.title.en} className="jiju-philosophy-row">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="build-log" className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Build log' : 'Build log'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '从地基，到今天的写法。' : 'From foundation to how the system compounds.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '每一段都保留原本的判断结构：为什么做、怎么想、怎么落地、最后换来什么。'
                  : 'Each chapter keeps the original decision structure: why it mattered, how I thought, how I executed, and what changed.'}
              </p>
            </div>
            <div className="mt-12 space-y-5">
              {jijuBuildFromZeroToOne.map((item, index) => (
                <article key={item.phase.en} className="jiju-chapter-card">
                  <div className="jiju-chapter-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="jiju-chapter-main">
                    <p className="jiju-chapter-phase">{item.phase[language]}</p>
                    <h3 className="font-display text-3xl font-bold tracking-tight">{item.chapterVoice[language]}</h3>
                    <div className="jiju-chapter-grid">
                      <div>
                        <span>{isZh ? 'When' : 'When'}</span>
                        <p>{item.when[language]}</p>
                      </div>
                      <div>
                        <span>{isZh ? 'Why' : 'Why'}</span>
                        <p>{item.why[language]}</p>
                      </div>
                      <div>
                        <span>{isZh ? 'Thinking' : 'Thinking'}</span>
                        <p>{item.thinking[language]}</p>
                      </div>
                      <div>
                        <span>{isZh ? 'Planning' : 'Planning'}</span>
                        <p>{item.planning[language]}</p>
                      </div>
                    </div>
                    <div className="jiju-solving">
                      <span>{isZh ? 'Problem solving' : 'Problem solving'}</span>
                      <ul>
                        {item.solving[language].map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="jiju-outcome">
                      <span>{isZh ? 'Outcome' : 'Outcome'}</span>
                      <p>{item.outcome[language]}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const JijuRevampFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const revampBase = import.meta.env.BASE_URL || '/';

  const sceneEntries = isZh
    ? ['现在吃 lunch', '去 cafe 办公', '带宠物', '好停车', '看 promo', '本地最爱', 'Michelin 但本地认可', '下雨天去哪']
    : ['Lunch now', 'Work from cafe', 'Bringing my pet', 'Easy parking', 'Show me promos', 'Local favorites', 'Michelin but local-approved', 'Rainy-day spot'];

  const proofPoints: [string, string][] = isZh
    ? [
        ['Was', '宠物友好地点目录'],
        ['Now', '场景化本地探索引擎'],
        ['Core question', 'Where should we go today?'],
        ['Start', '一个城市 · 100 个地点 · 8 个 filter'],
      ]
    : [
        ['Was', 'Pet-friendly place directory'],
        ['Now', 'Context-based local discovery engine'],
        ['Core question', 'Where should we go today?'],
        ['Start', 'One city · 100 places · 8 filters'],
      ];

  const mapShows = isZh
    ? ['Name', 'Address', 'Rating（星级）', 'Opening hour', 'Reviews（嘈杂、游客化）']
    : ['Name', 'Address', 'Rating (stars)', 'Opening hour', 'Reviews (noisy, touristy)'];

  const jijuAnswers = isZh
    ? ['适合 laptop work 吗？有 plug / 稳 WiFi 吗？', 'Parking 难吗？冷气够吗？吵不吵？', '能坐久吗？午餐便宜吗？有 lunch set 吗？', '适合一个人 / date / 带宠物吗？', 'food 是真好吃还是只是环境美？local 会回访吗？']
    : ['Good for laptop work? Power plug & stable WiFi?', 'Parking hard? Aircon strong? Noisy?', 'Can sit long? Cheap lunch? Lunch set?', 'Good for solo / date / pets?', 'Actually tasty or just pretty? Will locals return?'];

  const problemCards = isZh
    ? [
        { label: '01 / Maps', title: '地图太宽泛', copy: 'Google Map 有评分和位置,但答不了场景:plug、parking、能不能坐久、有没有 lunch set、本地认不认。' },
        { label: '02 / Reviews', title: '评论太游客化', copy: '太网红、太多假 review、太情绪化。4.5 星不代表它适合你今天的目的。' },
        { label: '03 / Context', title: '没有场景标签', copy: '不知道 parking、不知道能不能坐久、不知道 local 是否真去、不知道 promo 是否还 active。' },
      ]
    : [
        { label: '01 / Maps', title: 'Maps are too broad', copy: 'Ratings and locations, but no scene: plugs, parking, sit-long, lunch sets, or local approval.' },
        { label: '02 / Reviews', title: 'Reviews are too touristy', copy: 'Too influencer-driven, too many fake reviews, too emotional. 4.5 stars does not mean right for today.' },
        { label: '03 / Context', title: 'No scene tags', copy: 'No parking info, no sit-long info, no signal on whether locals actually go or if a promo is still active.' },
      ];

  const categoryCards = isZh
    ? [
        { title: 'Eat', note: '流量最大', tags: ['Lunch set', 'Local favorite', 'Michelin / Bib', 'Cheap good food', 'Date night', 'Solo meal', 'Family dinner', 'Supper', 'Hidden gem', 'Trap warning'] },
        { title: 'Work', note: 'Google Map 查不到', tags: ['Power plug', 'WiFi', 'Quiet', 'Can sit long', 'Good coffee', 'Big table', 'Parking easy', 'Aircon strong', 'Laptop friendly', 'Meeting friendly'] },
        { title: 'Chill', note: '适合内容化', tags: ['Afternoon cafe', 'Rainy day', 'With friend', 'First date', 'Healing place', 'Good view', 'Walkable', 'Photo spot', 'Weekend half-day'] },
        { title: 'Pet', note: '保留差异化,做强 filter', tags: ['Indoor allowed', 'Outdoor only', 'Cat friendly', 'Dog friendly', 'Water bowl', 'Pet menu', 'Walking area', 'Spacious', 'Pet-friendly staff'] },
        { title: 'Promo', note: '每天有人搜', tags: ['Lunch set', 'Coffee promo', 'Student promo', 'Weekday deal', 'Happy hour', 'Buy 1 free 1', 'Set under RM20', 'New opening'] },
      ]
    : [
        { title: 'Eat', note: 'Highest traffic', tags: ['Lunch set', 'Local favorite', 'Michelin / Bib', 'Cheap good food', 'Date night', 'Solo meal', 'Family dinner', 'Supper', 'Hidden gem', 'Trap warning'] },
        { title: 'Work', note: 'Hard to find on Maps', tags: ['Power plug', 'WiFi', 'Quiet', 'Can sit long', 'Good coffee', 'Big table', 'Parking easy', 'Aircon strong', 'Laptop friendly', 'Meeting friendly'] },
        { title: 'Chill', note: 'Great for content', tags: ['Afternoon cafe', 'Rainy day', 'With friend', 'First date', 'Healing place', 'Good view', 'Walkable', 'Photo spot', 'Weekend half-day'] },
        { title: 'Pet', note: 'Differentiation, as a filter', tags: ['Indoor allowed', 'Outdoor only', 'Cat friendly', 'Dog friendly', 'Water bowl', 'Pet menu', 'Walking area', 'Spacious', 'Pet-friendly staff'] },
        { title: 'Promo', note: 'Searched daily', tags: ['Lunch set', 'Coffee promo', 'Student promo', 'Weekday deal', 'Happy hour', 'Buy 1 free 1', 'Set under RM20', 'New opening'] },
      ];

  const scoreRows: [string, number][] = [
    ['Food', 8.5],
    ['Comfort', 7.8],
    ['Parking', 6.5],
    ['Work-friendly', 9.0],
    ['Pet-friendly', 7.0],
    ['Value', 8.2],
    ['Local approval', 8.8],
  ];

  const profileRows = isZh
    ? [
        ['Area', 'Georgetown'],
        ['Best for', 'Laptop work / brunch / 安静下午'],
        ['Price', 'RM20–40'],
        ['Parking', 'Medium difficulty'],
        ['Power plug', 'Yes, limited'],
        ['WiFi', 'Stable'],
        ['Can sit long', 'Yes'],
        ['Pet-friendly', 'Outdoor only'],
        ['Lunch set', 'Weekday 12pm–3pm'],
        ['Local verdict', '适合办公,食物普通但咖啡稳'],
        ['Avoid', 'Weekend 2pm–5pm'],
        ['Best time', 'Weekday morning'],
      ]
    : [
        ['Area', 'Georgetown'],
        ['Best for', 'Laptop work / brunch / quiet afternoon'],
        ['Price', 'RM20–40'],
        ['Parking', 'Medium difficulty'],
        ['Power plug', 'Yes, limited'],
        ['WiFi', 'Stable'],
        ['Can sit long', 'Yes'],
        ['Pet-friendly', 'Outdoor only'],
        ['Lunch set', 'Weekday 12pm–3pm'],
        ['Local verdict', 'Good to work, food average, coffee reliable'],
        ['Avoid', 'Weekend 2pm–5pm'],
        ['Best time', 'Weekday morning'],
      ];

  const todaysPicks = isZh
    ? ['Best lunch set under RM20', '有 plug & parking 的 cafe', 'Local 认可的 Michelin 地点', '本周末宠物友好去处', '今天适合办公的安静地点']
    : ['Best lunch set under RM20', 'Cafes with plug & parking', 'Local-approved Michelin spots', 'Pet-friendly places this weekend', 'Quiet places to work today'];

  const mvpFilters = ['Lunch set', 'Work-friendly', 'Power plug', 'Easy parking', 'Pet-friendly', 'Local favorite', 'Date-friendly', 'Promo available'];

  const mvpCards = isZh
    ? [
        { title: 'Phase 1 · 做有用的数据', lines: ['先做一个城市 / 区域:Penang、KL、PJ、Georgetown、Mont Kiara、Bangsar。', '先做 100 个地点,每个比 Google Map 更有用。', '上 8 个 filter 与 Place Profile。'] },
        { title: 'Phase 2 · 上线场景探索', lines: ['场景入口首页 + 搜索/筛选。', 'SEO landing pages 与本地指南。', 'TikTok / IG / community submission 做增长。'] },
        { title: 'Phase 3 · 验证商户', lines: ['接触 cafe / 餐厅更新资料与 lunch set。', '早期免费 verified listing。', '收集用户与商户反馈。'] },
        { title: 'Phase 4 · 变现', lines: ['Featured placement 与 promo 页。', 'Merchant dashboard。', '扩展城市与垂类,验证后再考虑换域名。'] },
      ]
    : [
        { title: 'Phase 1 · Build useful data', lines: ['One city/area first: Penang, KL, PJ, Georgetown, Mont Kiara, Bangsar.', '100 places, each more useful than Google Maps.', 'Ship 8 filters and the Place Profile.'] },
        { title: 'Phase 2 · Launch scene discovery', lines: ['Scene-entry homepage + search/filter.', 'SEO landing pages and local guides.', 'Grow via TikTok / IG / community submissions.'] },
        { title: 'Phase 3 · Merchant validation', lines: ['Approach cafes/restaurants for profiles and lunch sets.', 'Free verified listing for early merchants.', 'Collect user and merchant feedback.'] },
        { title: 'Phase 4 · Monetization', lines: ['Featured placement and promo pages.', 'Merchant dashboard.', 'Expand cities/verticals; revisit domain after validation.'] },
      ];

  const businessCards = isZh
    ? [
        { title: 'Featured listing', copy: '商户付费出现在相关场景。' },
        { title: 'Promo placement', copy: 'Lunch set、限时优惠在 promo 入口曝光。' },
        { title: 'Merchant subscription', copy: '商户订阅管理资料与表现。' },
        { title: 'Verified place badge', copy: '核验 plug / parking / 宠物政策 / promo。' },
        { title: 'Work-friendly badge', copy: 'Cafe 办公友好认证,强差异化。' },
        { title: 'Local guide sponsorship', copy: '赞助本地指南与清单文。' },
        { title: 'Pet-friendly premium', copy: '宠物友好高信任类别 + 活动。' },
        { title: 'Data insights', copy: '给商户的客流与场景数据。' },
      ]
    : [
        { title: 'Featured listing', copy: 'Merchants pay to appear in relevant scenes.' },
        { title: 'Promo placement', copy: 'Lunch sets and limited deals in the promo entry.' },
        { title: 'Merchant subscription', copy: 'Subscription to manage profile and performance.' },
        { title: 'Verified place badge', copy: 'Verify plug / parking / pet policy / promo.' },
        { title: 'Work-friendly badge', copy: 'Cafe work-friendly certification — strong edge.' },
        { title: 'Local guide sponsorship', copy: 'Sponsor local guides and listicles.' },
        { title: 'Pet-friendly premium', copy: 'High-trust pet category plus events.' },
        { title: 'Data insights', copy: 'Footfall and scene data for merchants.' },
      ];

  const domainCards = isZh
    ? [
        { title: 'A · 继续 jiju.pet', lines: ['品牌解释变宽:从 pet-friendly 扩到 places worth visiting。', '缺点:新用户可能误会只跟宠物有关。'] },
        { title: 'B · 买新主域名', lines: ['jiju.my / jiju.place / jiju.city / gojiju.com / jiju.guide。', 'jiju.pet 变成其中一个频道。最干净。'] },
        { title: 'C · 先 MVP 再换', lines: ['先用 jiju.pet 做 MVP,验证场景搜索。', '最现实:先别纠结 domain。'] },
      ]
    : [
        { title: 'A · Keep jiju.pet', lines: ['Widen the brand: pet-friendly to places worth visiting.', 'Risk: new users assume it is pet-only.'] },
        { title: 'B · Buy a new domain', lines: ['jiju.my / jiju.place / jiju.city / gojiju.com / jiju.guide.', 'jiju.pet becomes one channel. Cleanest.'] },
        { title: 'C · MVP first, switch later', lines: ['Use jiju.pet for the MVP, validate scene search.', 'Most realistic: do not over-think the domain yet.'] },
      ];

  const founderRows = isZh
    ? [
        { role: 'Eden · 系统', copy: '标签系统、搜索、推荐、地点 database、scoring、merchant dashboard、user submission、AI recommendation、SEO landing pages。' },
        { role: 'Partner · 增长', copy: '去店里验证、拍短视频、跟商家谈 promo、拿 lunch set、做 cafe work list、本地推荐、merchant onboarding、TikTok series、社区探店。' },
        { role: 'Shared', copy: '品牌方向、变现策略、重大支出、股权、合作条款、融资与扩张。' },
      ]
    : [
        { role: 'Eden · Systems', copy: 'Tagging, search, recommendation, place database, scoring, merchant dashboard, user submission, AI recommendation, SEO landing pages.' },
        { role: 'Partner · Growth', copy: 'On-site verification, short videos, merchant promo deals, lunch-set info, cafe-work lists, local picks, merchant onboarding, TikTok series, community outings.' },
        { role: 'Shared', copy: 'Brand direction, monetization, major spend, equity, partnership terms, fundraising, expansion.' },
      ];

  const sloganCards = isZh
    ? [
        { title: 'Find places worth visiting', copy: '强调“值得去”。' },
        { title: 'Where should we go today?', copy: '直接命中脑内问题,最强。' },
        { title: 'Local spots, real context', copy: '强调本地与真实场景。' },
        { title: '今天去哪里？', copy: '中文感,生活化。' },
      ]
    : [
        { title: 'Find places worth visiting', copy: 'Emphasizes “worth it”.' },
        { title: 'Where should we go today?', copy: 'Hits the in-head question. Strongest.' },
        { title: 'Local spots, real context', copy: 'Emphasizes local + real scenes.' },
        { title: '今天去哪里？', copy: 'A local, lived-in Chinese voice.' },
      ];

  return (
    <div className="page-shell jiju-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="jiju-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={homeHref} className="jiju-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="jiju-hero py-16 text-center md:py-24">
            <p className="jiju-kicker mx-auto">{isZh ? 'Jiju / 本地人也会用的去处指南' : 'Jiju / A local discovery guide for places worth visiting'}</p>
            <h1 className="jiju-title mx-auto mt-5 font-display font-bold tracking-tight">Where should we go today?</h1>
            <p className="jiju-subtitle mx-auto mt-5">
              {isZh
                ? '不是普通 review site,也不是 pet-friendly app。Jiju 用真实生活需求帮你决定去哪:lunch set、laptop cafe、plug、parking、promo、宠物友好,以及本地人真的认可的食物。'
                : 'Not a review site, not a pet-friendly app. Jiju helps you decide where to go by real-life needs: lunch sets, laptop cafes, plugs, parking, promos, pet-friendly spots, and food locals actually approve.'}
            </p>
            <div className="jiju-scene-chips">
              {sceneEntries.map((label) => (
                <span key={label} className="jiju-scene-chip">{label}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="https://jiju.pet" target="_blank" rel="noopener noreferrer" className="jiju-text-cta">
                {isZh ? '打开 jiju.pet' : 'Open jiju.pet'} <ExternalLink size={15} />
              </a>
              <a href="#mvp" className="jiju-text-cta jiju-text-cta-muted">
                {isZh ? '看 MVP 计划' : 'View MVP plan'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section className="jiju-product-panel">
            <div className="jiju-product-copy">
              <p className="jiju-kicker">{isZh ? 'Positioning' : 'Positioning'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '卖的是“场景”,不是“地点”。' : 'It sells the scene, not the place.'}
              </h2>
              <p>
                {isZh
                  ? 'Google Map 是地点数据库。Jiju 要做的是场景数据库——把同一家店拆成「适不适合现在的我」。从 niche directory 变成 lifestyle utility:where to go, based on mood, need, time, budget, and lifestyle。'
                  : 'Google Maps is a place database. Jiju is a scene database — breaking each place into “does it fit me right now”. From a niche directory into a lifestyle utility: where to go, based on mood, need, time, budget, and lifestyle.'}
              </p>
            </div>
            <div className="jiju-proof-grid">
              {proofPoints.map(([label, value]) => (
                <div key={label} className="jiju-proof-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Same cafe, different data' : 'Same cafe, different data'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '同一家 cafe,在 Jiju 里被拆成可回答的问题。' : 'The same cafe, broken into questions Jiju can answer.'}
              </h2>
            </div>
            <div className="jiju-split-grid mt-12">
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? 'Google Map 显示' : 'Google Maps shows'}</h3>
                <ul>
                  {mapShows.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? 'Jiju 回答' : 'Jiju answers'}</h3>
                <ul>
                  {jijuAnswers.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'The problem' : 'The problem'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '人们搜的不是“餐厅”,是“情境”。' : 'People do not search for restaurants. They search for situations.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '今天 lunch 去哪、哪里能办公、哪里好 parking、本地人觉得哪里真的好——现有工具回答不了。'
                  : 'Where to eat now, where to work, where parking is easy, what locals actually rate — existing tools cannot answer.'}
              </p>
            </div>
            <div className="jiju-review-track mt-12">
              {problemCards.map((item) => (
                <article key={item.label} className="jiju-review-card">
                  <span>{item.label}</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? '5 main categories' : '5 main categories'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Eat · Work · Chill · Pet · Promo</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '五个主分类,每个都有很具体的标签。Pet 保留为强 filter,而不是唯一主轴。'
                  : 'Five main categories, each with concrete tags. Pet stays a strong filter, not the only axis.'}
              </p>
            </div>
            <div className="jiju-cat-grid mt-12">
              {categoryCards.map((cat) => (
                <article key={cat.title} className="jiju-cat-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{cat.title}</h3>
                  <p className="jiju-kicker">{cat.note}</p>
                  <div className="jiju-tag-row">
                    {cat.tags.map((tag) => (
                      <span key={tag} className="jiju-tag">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Jiju Fit Score' : 'Jiju Fit Score'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '不只显示 rating,显示“适不适合你”。' : 'Not just a rating — a fit score.'}
              </h2>
            </div>
            <div className="jiju-score-card mt-12">
              <div className="jiju-score-grid">
                {scoreRows.map(([label, value]) => (
                  <div key={label} className="jiju-score-row">
                    <span>{label}</span>
                    <div className="jiju-score-bar">
                      <div className="jiju-score-fill" style={{ width: `${value * 10}%` }} />
                    </div>
                    <strong>{value.toFixed(1)}</strong>
                  </div>
                ))}
              </div>
              <p className="jiju-score-summary">
                Best for weekday laptop work and affordable lunch set, but parking gets difficult after 12:30pm.
              </p>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Place Profile' : 'Place Profile'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '资料像数据库,比 Google Map 更有用。' : 'Each profile reads like a database, more useful than Maps.'}
              </h2>
            </div>
            <div className="jiju-profile-card mt-12">
              {profileRows.map(([label, value]) => (
                <div key={label} className="jiju-profile-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Differentiation' : 'Differentiation'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Not just highly rated. Actually useful.</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? 'Michelin / Google / Tripadvisor / 小红书都太游客化、太网红化、太多假 review、没有场景标签。Jiju 的差异化是 Local Context:plug、parking、能不能坐久、local 是否真去、promo 是否还 active。'
                  : 'Michelin / Google / Tripadvisor / XHS are too touristy, too influencer-driven, too many fake reviews, no scene tags. Jiju’s edge is Local Context: plugs, parking, sit-long, whether locals really go, and whether the promo is still active.'}
              </p>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Homepage concept' : 'Homepage concept'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '首页是场景入口,不是地图。' : 'The homepage is a scene entry, not a map.'}
              </h2>
            </div>
            <div className="jiju-split-grid mt-12">
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? '第一屏 · 场景按钮' : 'First screen · scene buttons'}</h3>
                <div className="jiju-tag-row">
                  {sceneEntries.map((label) => (
                    <span key={label} className="jiju-tag">{label}</span>
                  ))}
                </div>
              </article>
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">Today&apos;s useful picks</h3>
                <ul>
                  {todaysPicks.map((pick) => (
                    <li key={pick}>{pick}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section id="mvp" className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'MVP plan' : 'MVP plan'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '不要做整个 Malaysia。先做透一个城市。' : 'Do not do all of Malaysia. Nail one city first.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '第一版只做 8 个 filter:' : 'V1 ships only 8 filters:'}
              </p>
              <div className="jiju-tag-row">
                {mvpFilters.map((f) => (
                  <span key={f} className="jiju-tag">{f}</span>
                ))}
              </div>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {mvpCards.map((item) => (
                <article key={item.title} className="jiju-note-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <ul>
                    {item.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Business model' : 'Business model'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '日常高频,变现方式比 pet directory 多。' : 'Daily frequency, more monetization than a pet directory.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '用户每周用,而不是只有带宠物时才用。' : 'Used weekly, not only when bringing a pet.'}
              </p>
            </div>
            <div className="jiju-skill-grid mt-12">
              {businessCards.map((item) => (
                <article key={item.title} className="jiju-skill-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Domain strategy' : 'Domain strategy'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '.pet 还是新域名?先验证再决定。' : '.pet or a new domain? Validate first.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '当下结论:先别纠结 domain,先验证有没有人真的用场景搜索。' : 'For now: do not over-think the domain, validate that people actually use scene search.'}
              </p>
            </div>
            <div className="jiju-operating-grid mt-12">
              {domainCards.map((group) => (
                <article key={group.title} className="jiju-operating-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{group.title}</h3>
                  <ul>
                    {group.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Founder roles' : 'Founder roles'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? 'Eden 做系统,partner 做真实增长。' : 'Eden builds systems; partner drives real-world growth.'}
              </h2>
            </div>
            <div className="jiju-philosophy-list mt-12">
              {founderRows.map((item) => (
                <article key={item.role} className="jiju-philosophy-row">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.role}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Slogan & brand' : 'Slogan & brand'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Local places, filtered by real-life needs.</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '不看星级、不看网红、不看广告——看我现在饿了、要坐着工作、怕 parking、带宠物、想省钱、想吃 local 觉得真好吃的、不想踩雷。'
                  : 'Not stars, not influencers, not ads — but: I am hungry now, I need to sit and work, I dread parking, I have my pet, I want to save, I want food locals actually love, I do not want to get burned.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {sloganCards.map((item) => (
                <article key={item.title} className="jiju-system-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <a href={joinBasePath(revampBase, 'jiju-pet')} className="jiju-text-cta jiju-text-cta-muted mt-10 inline-flex">
              {isZh ? '看 Jiju.pet 构建记录' : 'View the Jiju.pet build log'} <span aria-hidden>›</span>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
};

type ActiveBuildSkill = {
  label: string;
  kind: 'hard' | 'soft';
};

const activeBuildSkillSets = {
  jiju: {
    en: [
      { label: 'Product & GTM', kind: 'hard' },
      { label: 'React / TypeScript', kind: 'hard' },
      { label: 'Firebase', kind: 'hard' },
      { label: 'Maps & geo', kind: 'hard' },
      { label: 'SEO & content', kind: 'hard' },
      { label: 'Ops delivery', kind: 'hard' },
      { label: 'User empathy', kind: 'soft' },
      { label: 'Stakeholder alignment', kind: 'soft' },
    ],
    zh: [
      { label: '产品与 GTM', kind: 'hard' },
      { label: 'React / TypeScript', kind: 'hard' },
      { label: 'Firebase', kind: 'hard' },
      { label: '地图与地理', kind: 'hard' },
      { label: 'SEO 与内容', kind: 'hard' },
      { label: '运营落地', kind: 'hard' },
      { label: '用户同理心', kind: 'soft' },
      { label: '跨方对齐', kind: 'soft' },
    ],
  },
  poker: {
    en: [
      { label: 'React / TypeScript', kind: 'hard' },
      { label: 'Realtime rooms', kind: 'hard' },
      { label: 'Hold’em lobby & stakes', kind: 'hard' },
      { label: 'Voice & RTDB signaling', kind: 'hard' },
      { label: 'i18n', kind: 'hard' },
      { label: 'Host UX', kind: 'hard' },
      { label: 'Facilitation', kind: 'soft' },
      { label: 'Clear communication', kind: 'soft' },
    ],
    zh: [
      { label: 'React / TypeScript', kind: 'hard' },
      { label: '实时房间', kind: 'hard' },
      { label: '德州大厅与盲注', kind: 'hard' },
      { label: '语音与 RTDB 信令', kind: 'hard' },
      { label: '国际化', kind: 'hard' },
      { label: '主持人体验', kind: 'hard' },
      { label: '引导能力', kind: 'soft' },
      { label: '清晰沟通', kind: 'soft' },
    ],
  },
  marketing: {
    en: [
      { label: 'Growth strategy', kind: 'hard' },
      { label: 'Performance marketing', kind: 'hard' },
      { label: 'Funnel optimization', kind: 'hard' },
      { label: 'CRM & lifecycle', kind: 'hard' },
      { label: 'Analytics', kind: 'hard' },
      { label: 'Cross-functional delivery', kind: 'hard' },
      { label: 'Ownership', kind: 'soft' },
      { label: 'Decision making', kind: 'soft' },
    ],
    zh: [
      { label: '增长战略', kind: 'hard' },
      { label: '效果营销', kind: 'hard' },
      { label: '漏斗优化', kind: 'hard' },
      { label: 'CRM 与生命周期', kind: 'hard' },
      { label: '数据分析', kind: 'hard' },
      { label: '跨职能交付', kind: 'hard' },
      { label: '主人翁意识', kind: 'soft' },
      { label: '决策判断', kind: 'soft' },
    ],
  },
} as const;

const ActiveBuildSkillRow: React.FC<{ isZh: boolean; skills: readonly ActiveBuildSkill[] }> = ({ isZh, skills }) => (
  <div className="mt-3">
    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
      <FlatEmoji emoji="🏷️" size="sm" bob={false} tilt />
      {isZh ? '技能' : 'Skills'}
    </p>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={`${skill.label}-${skill.kind}`}
          className={`rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-eden-mint/50 hover:shadow-sm ${
            skill.kind === 'soft' ? 'text-teal-700' : 'text-stone-700'
          }`}
        >
          {skill.label}
        </span>
      ))}
    </div>
  </div>
);

type HomeCopy = { en: string; zh: string };

const homeCollageItems: Array<{
  title: string;
  tone: string;
  image?: string;
  video?: string;
  imageAlt?: HomeCopy;
  cssArtProjectTitle?: string;
  href?: string;
  linkLabel?: HomeCopy;
  ctaLabel?: HomeCopy;
}> = [
  {
    title: 'Life OS',
    tone: 'starmap',
    image: 'home-banners/life-os-banner-poster.jpg',
    video: 'home-banners/life-os-banner.mp4',
    imageAlt: { en: 'A lone figure standing inside a glowing rune circle on a mountain summit as a dragon descends through storm clouds', zh: '一个人站在山巅发光的符阵中，巨龙穿过风暴云层俯冲而下' },
    href: 'life-os',
    linkLabel: { en: 'Open the Life OS product page', zh: '打开 Life OS 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'ETReportHub',
    tone: 'ocean',
    image: 'home-banners/etreporthub-banner-poster.jpg',
    video: 'home-banners/etreporthub-banner.mp4',
    imageAlt: { en: 'ETReportHub cinematic operations banner', zh: 'ETReportHub 电影感运营场景 banner' },
    href: 'etreporthub',
    linkLabel: { en: 'Open the ETReportHub product page', zh: '打开 ETReportHub 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'What is Wealth',
    tone: 'wealth',
    image: 'home-banners/what-is-wealth-banner-poster.jpg',
    video: 'home-banners/what-is-wealth-banner.mp4',
    imageAlt: { en: 'US dollar bills drifting in slow motion onto dark marble against a warm golden background', zh: '美元纸币在暖金色光晕中缓缓飘落到深色大理石台面上' },
    href: 'notes/what-is-wealth',
    linkLabel: { en: 'Read the essay: What is wealth, really?', zh: '阅读文章：财富到底是什么' },
    ctaLabel: { en: 'Read the essay', zh: '阅读文章' },
  },
  {
    title: 'Jiju',
    tone: 'coral',
    image: 'home-banners/jiju-adventure-seo.jpg',
    video: 'home-banners/jiju-home-banner.mp4',
    imageAlt: { en: 'Jiju adventure cat navigating an old harbor street with a map and compass', zh: 'Jiju 冒险猫拿着地图与指南针探索旧港街道' },
    href: 'jiju-pet',
    linkLabel: { en: 'Open the Jiju product page', zh: '打开 Jiju 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'Friday Poker Club',
    tone: 'poker',
    image: 'home-banners/friday-poker-club.jpg',
    imageAlt: { en: 'Friday Poker Club private poker table in a dark vintage club', zh: 'Friday Poker Club 深色复古私人牌桌场景' },
    href: 'poker',
    linkLabel: { en: 'Open the Friday Poker Club product page', zh: '打开 Friday Poker Club 产品页面' },
    ctaLabel: { en: 'Play now', zh: '立即开玩' },
  },
  {
    title: "Conway's Game of Life",
    tone: 'conway',
    cssArtProjectTitle: "Conway's Game of Life",
    href: 'conways-game-of-life',
    linkLabel: { en: "Open Conway's Game of Life", zh: "打开 Conway's Game of Life" },
    ctaLabel: { en: 'Play now', zh: '立即开玩' },
  },
  {
    title: 'Diving / Ocean',
    tone: 'sea',
    image: 'home-banners/diving-ocean-banner-poster.jpg',
    video: 'home-banners/diving-ocean-banner.mp4',
    imageAlt: { en: 'A massive ocean wave rising above the sea', zh: '海面上升起的巨大浪潮' },
    href: 'videos/pulau-kapas.mp4',
    linkLabel: { en: 'Watch the Pulau Kapas ocean film', zh: '观看 Pulau Kapas 海洋影片' },
    ctaLabel: { en: 'Watch now', zh: '立即观看' },
  },
  {
    title: 'Film Gallery',
    tone: 'film',
    image: 'home-banners/film-gallery-banner-poster.jpg',
    video: 'home-banners/film-gallery-banner.mp4',
    imageAlt: { en: 'A vintage twin-lens reflex camera revealing film reels through its viewfinder', zh: '复古双反相机的取景器里映出转动的胶片卷轴' },
    href: 'film-gallery',
    linkLabel: { en: 'Open Film Gallery', zh: '打开 Film Gallery' },
    ctaLabel: { en: 'View gallery', zh: '查看图库' },
  },
];

/**
 * The collage cards ride a compositor-driven marquee, and IntersectionObserver does not
 * reliably recompute while a transform animation runs on the compositor — a card can
 * slide fully into view without a single callback, which left its video paused forever.
 * getBoundingClientRect does see the animated transform, so every collage video registers
 * a sampler here and one shared rAF loop checks them at ~400ms intervals. rAF is the right
 * clock for this: it stops on its own when the page is hidden (unlike setInterval, which
 * merely gets throttled) and it is in step with the animation it is sampling.
 */
const collageVideoSamplers = new Set<() => void>();
let collageSamplerFrame = 0;
let collageSamplerLast = 0;

const runCollageSamplers = (now: number) => {
  collageSamplerFrame = window.requestAnimationFrame(runCollageSamplers);
  if (now - collageSamplerLast < 400) return;
  collageSamplerLast = now;
  collageVideoSamplers.forEach((sample) => sample());
};

const registerCollageVideoSampler = (sample: () => void) => {
  collageVideoSamplers.add(sample);
  if (!collageSamplerFrame) {
    collageSamplerFrame = window.requestAnimationFrame(runCollageSamplers);
  }
  return () => {
    collageVideoSamplers.delete(sample);
    if (collageVideoSamplers.size === 0 && collageSamplerFrame) {
      window.cancelAnimationFrame(collageSamplerFrame);
      collageSamplerFrame = 0;
    }
  };
};

const HomeCollageVideo: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Safari checks both the muted property and the content attribute before
    // allowing inline autoplay.
    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');

    const shouldPlay = () => {
      if (motionQuery.matches || document.hidden) return false;
      const rect = video.getBoundingClientRect();
      // zero-sized means a stylesheet hid it, not that it scrolled away
      if (rect.width === 0 || rect.height === 0) return false;
      return rect.right > 0 && rect.left < window.innerWidth && rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const syncPlayback = () => {
      if (shouldPlay()) {
        void video.play().catch(() => undefined);
      } else if (!video.paused) {
        video.pause();
      }
    };

    syncPlayback();
    const unregister = registerCollageVideoSampler(syncPlayback);
    motionQuery.addEventListener('change', syncPlayback);
    video.addEventListener('canplay', syncPlayback);
    // rAF stops while the page is hidden, so pausing has to be driven by the event
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      unregister();
      motionQuery.removeEventListener('change', syncPlayback);
      video.removeEventListener('canplay', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="eden-collage-video"
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

type HomeCollageItem = (typeof homeCollageItems)[number];

const HomeCollageCard: React.FC<{ item: HomeCollageItem; language: Language; baseUrl: string; duplicate?: boolean }> = ({ item, language, baseUrl, duplicate = false }) => {
  const cssArt = item.cssArtProjectTitle ? getHomeSelectedWorkBannerByTitle(item.cssArtProjectTitle) : undefined;
  const CssArt = cssArt?.Component;
  const cardContent = (
    <>
      {CssArt ? (
        <CssArt label={cssArt?.label[language] ?? item.title} />
      ) : item.video ? (
        <>
          {item.image ? (
            <img
              className="eden-collage-image"
              src={resolveAssetPath(baseUrl, item.image)}
              alt={item.imageAlt?.[language] ?? item.title}
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <HomeCollageVideo
            src={resolveAssetPath(baseUrl, item.video)}
            poster={item.image ? resolveAssetPath(baseUrl, item.image) : undefined}
          />
        </>
      ) : item.image ? (
        <img
          className="eden-collage-image"
          src={resolveAssetPath(baseUrl, item.image)}
          alt={item.imageAlt?.[language] ?? item.title}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="eden-placeholder-art" aria-hidden="true"><i /><i /><i /></div>
      )}
      <div className="eden-collage-reveal">
        {item.href ? (
          <span className="eden-collage-cta">{item.ctaLabel?.[language] ?? (language === 'zh' ? '了解更多' : 'Learn more')}</span>
        ) : (
          <h3>{item.title}</h3>
        )}
      </div>
    </>
  );

  return item.href ? (
    <a
      className={`eden-collage-card tone-${item.tone}`}
      href={resolveAssetPath(baseUrl, item.href)}
      aria-label={item.linkLabel?.[language] ?? item.title}
      tabIndex={duplicate ? -1 : undefined}
    >
      {cardContent}
    </a>
  ) : (
    <article className={`eden-collage-card tone-${item.tone}`} tabIndex={duplicate ? -1 : 0}>
      {cardContent}
    </article>
  );
};

/**
 * One marquee row. The items are rendered twice so a -50% translate loops seamlessly.
 * The duplicate run stays clickable — do NOT mark it `inert`, that removes it from hit
 * testing and half the visible cards stop responding — it is only hidden from the
 * accessibility tree and the tab order, so the real run is the one keyboard users reach.
 * The drift pauses on hover and focus so cards can actually be clicked.
 */
const HomeCollageRow: React.FC<{
  items: HomeCollageItem[];
  language: Language;
  baseUrl: string;
  direction: 'left' | 'right';
}> = ({ items, language, baseUrl, direction }) => (
  <div className={`eden-collage-row eden-collage-row-${direction}`}>
    <div className="eden-collage-track">
      {[0, 1].map((run) => (
        <div className="eden-collage-run" key={run} aria-hidden={run === 1 || undefined}>
          {items.map((item) => (
            <HomeCollageCard key={item.title} item={item} language={language} baseUrl={baseUrl} duplicate={run === 1} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const HomeCollage: React.FC<{ language: Language; baseUrl: string }> = ({ language, baseUrl }) => (
  <div className="eden-collage" aria-label={language === 'zh' ? 'Eden 的项目与生活观察拼贴' : "Eden's work and field-note collage"}>
    <HomeCollageRow items={homeCollageItems.slice(0, 4)} language={language} baseUrl={baseUrl} direction="left" />
    <HomeCollageRow items={homeCollageItems.slice(4)} language={language} baseUrl={baseUrl} direction="right" />
  </div>
);

type SiteEssayNote = {
  slug: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  category: Record<Language, string>;
  thesis: Record<Language, string>;
  sources: string[];
  sections: Array<{
    title: Record<Language, string>;
    paragraphs: Record<Language, string[]>;
  }>;
  // Optional link back to the full original source page (served from public/).
  originalSource?: { url: string; label: Record<Language, string> };
  // Optional reference list. Paragraphs may embed [[n]] tokens that link to the
  // matching reference id, and each reference renders a ↩ backlink to that spot.
  references?: Array<{ id: string; url: string; label: Record<Language, string> }>;
  // Optional note shown under the references. Falls back to a generic line.
  referencesNote?: Record<Language, string>;
};

const siteEssayNotes: SiteEssayNote[] = [
  {
    slug: 'korea-2026-crash',
    title: { en: 'The "mad bull" hits a wall: Korea\'s 2026 market, and the gap between price and value', zh: '「疯牛」撞墙：韩国股市 2026，一堂价格与价值的公开课' },
    summary: {
      en: 'In the first half of 2026 Korea had the best-performing market in the world, nearly doubling in six months—everyone was talking about getting rich. Then in July it hit a wall, posting its largest monthly drop on record. The strangest part: that same month, Korea\'s exports hit an all-time high.',
      zh: '2026 上半年，韩国股市是全世界涨得最猛的市场，半年几乎翻倍，所有人都在聊财富自由。然后 7 月它一头撞墙——创下史上最大单月跌幅。最耐人寻味的是：同一个月，韩国的出口反而创了新高。',
    },
    category: { en: 'Money & real value', zh: '钱与真实价值' },
    thesis: {
      en: 'Price and value were never the same thing. Korea\'s chips, AI demand, and exports were all real—but price ran far ahead of value on emotion and leverage. The real business barely moved; what went wild was the price.',
      zh: '价格和价值从来就不是一回事：韩国的芯片、AI、出口都是真的，可价格被情绪和杠杆推得远远跑在价值前面——真实的生意没怎么变，疯狂变化的一直是价格。',
    },
    sources: ['CNBC · 跌入熊市', 'Bloomberg · KOSPI +100%', 'KED · 黑色星期一', 'Bloomberg · 出口新高', 'Eastern Herald · 追缴潮', 'Motley Fool · 迷因股'],
    originalSource: {
      url: 'korea-2026-crash-full.html',
      label: { en: 'Read the full original essay', zh: '阅读完整原文（白话版）' },
    },
    references: [
      { id: '1', url: 'https://www.cnbc.com/2026/07/09/kospi-bear-territory-ai-samsung-skhynix-chipmakers.html', label: { en: 'CNBC (July 2026) — the KOSPI fell from the world\'s best-performing market into a bear market, led down by chip stocks (Samsung, SK Hynix), with circuit breakers tripped several times that year.', zh: 'CNBC（2026 年 7 月）：KOSPI 由全球表现最好的市场跌入熊市，芯片股（三星、SK 海力士）领跌，年内多次触发熔断。' } },
      { id: '2', url: 'https://finance.yahoo.com/markets/world-indices/articles/south-koreas-kospi-surges-100-121544935.html', label: { en: 'Yahoo Finance / Bloomberg — South Korea\'s KOSPI surged ~100% in 2026 on a chip-stock rally, one of the best-performing markets that year.', zh: 'Yahoo Finance / Bloomberg：KOSPI 在 2026 年因芯片股大涨而近乎翻倍，为当年全球表现最好的股市之一。' } },
      { id: '3', url: 'https://www.kedglobal.com/korean-stock-market/newsView/ked202607130010', label: { en: 'KED Global (July 13, 2026) — the KOSPI plunged nearly 9% in a day and slipped below 7,000 amid a chip rout; combined with other reports, July was the KOSPI\'s largest monthly drop on record (~23%).', zh: 'KED Global（2026 年 7 月 13 日）：7 月 13 日 KOSPI 单日重挫近 9%、跌破 7,000 点，芯片股与杠杆型 ETF 加剧跌势；结合多家报道，7 月为 KOSPI 史上最大单月跌幅（约 23%）。' } },
      { id: '4', url: 'https://www.bloomberg.com/news/articles/2026-07-21/south-korea-s-early-exports-jump-to-july-record-on-ai-led-gains', label: { en: 'Bloomberg (July 21, 2026) — South Korea\'s early-July exports jumped to a record on AI-led demand.', zh: 'Bloomberg（2026 年 7 月 21 日）：韩国 7 月出口在 AI 相关需求带动下创同期新高。' } },
      { id: '5', url: 'https://easternherald.com/2026/07/20/south-korea-margin-loans-retail-investors-kospi-crash/', label: { en: 'The Eastern Herald (July 2026) — about 1.2 million margin accounts faced calls and many retail investors were force-liquidated; other reports note the president\'s emergency intervention. Retail and liquidation figures vary by source.', zh: 'The Eastern Herald（2026 年 7 月）：约 120 万个融资（保证金）账户面临追缴，大量散户被强制平仓；另有报道称总统出面紧急干预。散户与强平数字各来源略有差异。' } },
      { id: '6', url: 'https://www.fool.com/investing/2026/07/26/kospi-trading-like-a-meme-stock-sp-500-nasdaq-next/', label: { en: 'The Motley Fool (July 26, 2026) — commentary that the KOSPI was "trading like a meme stock," warning U.S. indexes could face similar risk.', zh: 'The Motley Fool（2026 年 7 月 26 日）：评论 KOSPI 的暴涨暴跌「像迷因股」，并提醒美股或面临类似风险。' } },
    ],
    referencesNote: {
      en: 'These are the sources for the figures. Market numbers (daily/monthly moves, margin-call and forced-liquidation sizes) vary by source and shift with the market; this uses the more authoritative public reporting with dates. This is fact-gathering and reflection only, not investment advice.',
      zh: '以上是文中数据的出处。市场数字（单日/单月涨跌、追缴与强平规模）不同来源略有出入，且随行情变动，本文取较权威公开报道并注明时点。本文只作事实梳理与观念探讨，不构成任何投资建议。',
    },
    sections: [
      {
        title: { en: 'Two numbers from the same month', zh: '同一个月的两个数字' },
        paragraphs: {
          en: ['Look at two numbers from the same month. In July 2026 Korea\'s stock market (the KOSPI) posted its largest monthly fall on record, down about 23%[[3]]. Also in July 2026, Korea\'s exports hit an all-time high[[4]].', 'A country\'s real business—exports—was booming, even setting records, while its share prices halved in the very same month. Set side by side, those two numbers are already a lesson.'],
          zh: ['先看两个数字，它们发生在同一个月。2026 年 7 月，韩国股市（KOSPI）创下历史上最大单月跌幅，跌了约 23%[[3]]。也是在 2026 年 7 月，韩国的出口创下历史新高[[4]]。', '一个国家真实的生意（出口）红红火火、甚至创纪录，可它股票的价格却在同一个月腰斩式暴跌。这两个数字摆在一起，本身就是一堂课。'],
        },
      },
      {
        title: { en: 'The "mad bull"', zh: '那头「疯牛」' },
        paragraphs: {
          en: ['First, the mania before July. In 2026 the AI boom drove money worldwide toward chips, and Korea held Samsung and SK Hynix—the two most central suppliers of AI memory chips. Capital flooded in. The KOSPI surged, breaking 6,300 in February and nearly doubling in six months (up about 100%), the best-performing market in the world that year[[2]]; even Goldman Sachs was calling for new highs.', 'A familiar mood filled the market—"this time is different," "AI is the future," "get on board before it\'s too late." Many ordinary people put in not just their savings but borrowed money on leverage, hoping to multiply the gains. The bull earned a nickname: the "mad bull."'],
          zh: ['先说 7 月之前的疯狂。2026 年，AI 热潮把全世界的钱往芯片上赶，而韩国手握三星和 SK 海力士——全球 AI 内存芯片最核心的两家供应商，资金像潮水一样涌进。KOSPI 一路狂飙，2 月破 6,300 点，半年里差不多翻了一倍（涨约 100%），成了当年全球表现最好的股市[[2]]，连高盛都在喊还会创新高。', '市场弥漫着熟悉的气氛——「这次不一样」「AI 是未来」「再不上车就晚了」。很多普通人不只把积蓄投进去，还借钱加杠杆，想让赚的钱再翻几倍。这头牛，被大家叫做「疯牛」（mad bull）。'],
        },
      },
      {
        title: { en: 'Hitting the wall, and the leverage backlash', zh: '撞墙，与杠杆的反噬' },
        paragraphs: {
          en: ['In July the bull hit the wall. Chip stocks pulled back hard—AI hype had pushed Samsung and SK Hynix valuations too high, so any tremor cut deep. On "Black Monday," July 13, the KOSPI plunged nearly 9% in a day and broke below 7,000[[3]]; the world\'s hottest market officially entered a bear market, down about 26% from its peak[[1]]. How fast? Korea\'s circuit breakers—which halt trading after a steep drop—were reportedly tripped as many as seven times that year, though a circuit breaker is normally a once-in-years event[[1]].', 'What turned the fall into a stampede was leverage. Anyone who had borrowed to buy in got a margin call once prices crossed a line—add cash now, or be force-sold. In this round, reportedly about 1.2 million margin accounts faced calls and around 360,000 retail investors were force-liquidated, wiped out[[5]]. Forced selling drove prices lower, and lower prices triggered still more forced selling—a downward death spiral, so out of control that even Korea\'s president stepped in with emergency intervention[[5]].', 'Leverage is double-edged: on the way up it makes you richer faster; on the way down it forces you out at the bottom, in the ugliest way. And here it shares a quiet trait with the scams we discussed before—what they amplify is never value, but price and emotion.'],
          zh: ['7 月，牛撞墙了。芯片股大幅回调——AI 概念把三星、SK 海力士的估值推得太高，一旦风吹草动，跌起来同样凶。7 月 13 日「黑色星期一」，KOSPI 单日暴跌近 9%、跌破 7,000 点[[3]]；那个曾经全球最牛的市场正式跌进熊市，从高点算下来跌约 26%[[1]]。跌得多急？年内韩国股市的熔断机制据报道已被触发七次之多——而熔断本来是几年难得一见的极端事件[[1]]。', '真正把下跌变成踩踏的是杠杆。牛市里借钱买股票的人，一旦股价跌破某条线就会收到券商「追缴保证金」通知——马上补钱，不然强制卖出。据报道这一轮约有 120 万个融资账户面临追缴，约 36 万名散户被强制平仓、血本无归[[5]]。而强制卖出把股价砸得更低，更低又触发更多强制卖出——一个往下的死亡螺旋；跌势失控到连韩国总统都出面紧急干预[[5]]。', '杠杆是双刃剑：涨时让你赚得更快，跌时逼你在最低点、用最惨的方式离场。这一点，和我们之前聊过的那些骗局有个隐秘的共同点——它们放大的，都不是价值，而是价格和情绪。'],
        },
      },
      {
        title: { en: 'Back to those two numbers: price is not value', zh: '回到那两个数字：价格不等于价值' },
        paragraphs: {
          en: ['Back to the opening contrast. Same country, same month: it sells chips and does real business, genuinely making money, exports setting records—yet its share price halved at the same time. Why? Because price and value were never the same thing.', 'A company\'s real value is how much it actually earns and makes—usually slow to change. But its share price is set by something else: how much people are willing to pay for it right now. And that "willing" gets shoved around by emotion, leverage, and "is there anyone left to buy," so within weeks it can detach entirely from real value—detaching upward is a bubble, downward is panic. Korea got both: in the first half AI and exports were real, but price ran far ahead of value; in July the mood flipped and price crashed well below where it should have sat. The real business barely moved; what kept going wild was the price.'],
          zh: ['回到开头那个对比。同一个国家、同一个月：它卖芯片、做生意，真的在赚钱，出口实打实创新高；可股票价格却在同一时间腰斩。为什么？因为价格和价值，从来就不是一回事。', '一家公司真实的价值，是它实实在在能赚多少钱、做出多少东西——变化通常缓慢。但股票的价格，由另一件事决定：此时此刻市场上的人愿意用多高的价钱买它。而这个「愿意」，被情绪、杠杆、「还有没有人接盘」推来推去，可以在几周内和真实价值完全脱节——往上脱节是泡沫，往下脱节是恐慌。韩国这次两头都占了：上半年 AI 和出口是真的，但价格被推得远远跑在价值前面；7 月情绪一转，价格又狠狠跌破本该有的位置。真实的生意没怎么变，疯狂变化的一直是价格。'],
        },
      },
      {
        title: { en: 'A lesson worth more than the scams', zh: '这堂课，比骗局更值得记住' },
        paragraphs: {
          en: ['I\'ve written about [[note:carrian-case|Carrian]] and [[note:mbi-case|MBI]]—those were outright fakes, nothing real underneath. Korea is different, and precisely because it is different, it is worth remembering more: here the chips are real, the AI demand is real, the companies genuinely make money. A perfectly legitimate market with strong fundamentals can still have its price inflated into a bubble, and still crash. With a scam you can at least screen by "is it fake"; but when the thing is real and the story is real, and only the price has been blown too far, most people cannot tell—they read "price is rising" as "value is rising," and pile in at the top, on leverage.', 'So whether you face a scam or a real-but-overheated market, what protects you is a variant of the same question: am I buying the solid value of this business, or just betting that "someone behind me will pay a higher price for my bag"? If the former, a short-term drop lets you sleep, because the value is still there. If the latter, you are playing something close to a [[note:modern-finance-ponzi|money game]]—your profit is the next person\'s money, and whether you get out whole depends on not being the last to hold the baton.', 'One more thing: this lesson is not only Korea\'s. As the same AI boom lifts U.S. stocks and tech shares worldwide, "price running far ahead of value" is worth keeping in mind at all times. Some analysts said outright that the KOSPI was "trading like a meme stock," and warned that another market could be next[[6]].'],
          zh: ['我之前写过[[note:carrian-case|佳宁]]、写过[[note:mbi-case|MBI]]——那些是彻头彻尾的假东西，底下压根没有真实价值。韩国这次不一样，也正因为不一样，更值得记住：这里的芯片是真的、AI 需求是真的、公司是真赚钱的。一个完全正当、基本面很好的市场，价格照样能被吹成泡沫，也照样能崩。骗局你还能靠「它是不是假的」来识别；可当东西是真的、故事也是真的，唯一被吹过头的只是「价格」时，绝大多数人分不清——他们会把「价格在涨」直接当成「价值在涨」，然后在最高点加着杠杆冲进去。', '所以无论面对骗局，还是一个真实但过热的市场，能保护你的是同一个问题的变体：我现在买的，是这门生意实实在在的价值，还是只是在赌「后面有人愿意用更高的价钱接我的盘」？如果是前者，价格短期跌了你睡得着，因为价值还在；如果是后者，那你玩的本质上和[[note:modern-finance-ponzi|money game]]没差多少——你赚的是下一个人的钱，能不能全身而退，取决于你是不是最后一个接棒的人。', '顺便一句：这堂课不只是韩国的。当 AI 热潮同样在推高美股、推高全世界科技股时，「价格远远跑在价值前面」这件事值得每个人时时放在心里。有分析师直接说，韩国股市这阵子「炒得像迷因股」，还提醒——下一个可能就轮到别的市场[[6]]。'],
        },
      },
    ],
  },
  {
    slug: 'mbi-case',
    title: { en: 'Old scam, new clothes: MBI and the coin that "only goes up"', zh: '旧骗局，新外衣：MBI 与那枚「会一直涨」的币' },
    summary: {
      en: 'A self-issued coin said to "only go up," a tangible online mall, and a line like "you\'ll regret missing this forever"—Penang\'s MBI pulled in the money of about two million people with this kit. Take it apart, though, and inside is a trick that has not changed in centuries.',
      zh: '一枚自家发行、号称「只涨不跌」的虚拟币，一个看得见摸得着的线上商城，再加一句「错过这次你会后悔一辈子」——马来西亚槟城的 MBI，用这套东西吸走了大约两百万人的钱。可你把它拆开，里面装的是一个几百年都没变过的老套路。',
    },
    category: { en: 'Money & real value', zh: '钱与真实价值' },
    thesis: {
      en: 'The scam\'s outer clothes keep upgrading—postal coupons, property, crypto—but the core barely changes: pay old entrants with new ones\' money, nothing real underneath, kept alive by confidence and fresh cash.',
      zh: '骗局的外衣一直在升级——邮票、地产、加密币，但内核几乎一模一样：拿新人的钱付旧人、底下没有真实价值、靠信心和新钱续命。',
    },
    sources: ['The Edge · MBI 案', 'SCMP · Jho Low 2', 'Bangkok Post · 引渡', 'SCMP · 跨境追赃'],
    originalSource: {
      url: 'mbi-case-full.html',
      label: { en: 'Read the full original essay', zh: '阅读完整原文（白话版）' },
    },
    references: [
      { id: '1', url: 'https://theedgemalaysia.com/node/787385', label: { en: 'The Edge Malaysia on the MBI case. MBI (Mobility Beyond Imagination) was founded in Penang around 2012 by Tedy Teow, running on a self-issued coin and the M Mall O2O marketplace; by ~2016 it had spread to China, Taiwan, Japan and New Zealand; in May 2017 Bank Negara seized it and froze accounts, recovering only ~RM177m; by 2025 the Ops Northern Star operation had seized or frozen ~RM6.6bn of related assets.', zh: '《The Edge Malaysia》关于 MBI 案：约 2012 年由张誉发在槟城创办，以自家虚拟币与 M Mall（O2O 商城）运作，2016 年前后扩张至中国、台湾、日本、新西兰；2017 年 5 月国行查封冻结账户，仅追回约 1.77 亿令吉；2025 年 Ops Northern Star 行动累计查扣冻结相关资产约 66 亿令吉。' } },
      { id: '2', url: 'https://www.scmp.com/week-asia/people/article/3276381/how-tedy-teow-malaysian-fraudster-dubbed-jho-low-2-allegedly-swindled-millions', label: { en: 'South China Morning Post — how Tedy Teow, dubbed "Jho Low 2," allegedly swindled millions. Recounts an investor putting money in after a seminar, "millions of victims across Asia," and the nickname.', zh: '《South China Morning Post》：记述受害者在投资说明会后投入资金、「数百万受害者遍布亚洲」，以及张誉发被称为「Jho Low 2」。' } },
      { id: '3', url: 'https://www.bangkokpost.com/thailand/general/2852908/thailand-extradites-malaysian-fugitive-to-china-over-us-14-billion-cryptocurrency-scam', label: { en: 'Bangkok Post — Thailand extradited Teow to China in August 2024, where he faces charges over a cryptocurrency pyramid scheme worth about US$14bn.', zh: '《Bangkok Post》：泰国 2024 年 8 月将张誉发引渡至中国，中方就一宗涉及约 140 亿美元的加密货币传销骗局对其提出指控。' } },
      { id: '4', url: 'https://www.scmp.com/week-asia/people/article/3314016/us900-million-seized-china-helps-malaysia-dismantle-tedy-teows-scam-empire', label: { en: 'South China Morning Post — about US$900m seized as China helped Malaysia dismantle Teow\'s scam empire through cross-border cooperation.', zh: '《South China Morning Post》：报道中马跨境合作追赃，查扣资产约达 9 亿美元。' } },
    ],
    referencesNote: {
      en: 'Reported figures vary by source (charged amounts, transaction flows, victims\' reported losses); this uses the more authoritative public reporting and gives ranges. Parts of the case remain before the courts—this piece explains the pattern and does not pronounce guilt on any living person.',
      zh: '涉案金额因口径不同（起诉金额、交易流水、受害者报案损失）各方有差异，本文取较权威的公开报道并标明范围。案件部分仍在司法程序中，本文旨在解释套路，不对在世个人作有罪定论。',
    },
    sections: [
      {
        title: { en: 'A seminar, and what MBI was', zh: '一场招商大会，以及 MBI 是什么' },
        paragraphs: {
          en: ['In 2016, an investor named Randy Ang sat through an investment seminar. Speakers painted overnight riches—one said that if you followed along you would go "from driving an ordinary car to driving a Ferrari." Afterward he put in a five-figure sum[[2]]. The company was MBI, and you can guess the rest: the money was gone. Alongside him, an estimated two million people handed over their cash, across Malaysia and China.', 'MBI—Mobility Beyond Imagination—started in Penang around 2012, founded by Tedy Teow[[1]]. The mechanics, taken apart, are just three steps: you pay in for a "package," anywhere from a few thousand to hundreds of thousands; you receive a self-issued coin (often called GRC) said to only ever rise; and you recruit more people, earning more the larger your downline. By step three the red light should be on—isn\'t this just pyramid recruiting? It is. But what made MBI truly dangerous was the respectable-looking skin it wrapped around this.'],
          zh: ['2016 年，投资者 Randy Ang 去听了一场投资说明会。台上讲师描绘一夜致富，有人说跟着做你会「从开普通车变成开法拉利」。会开完，他投进一笔五位数的钱[[2]]。他投的公司叫 MBI，后来的事你大概猜到了：钱没了。和他一起交钱的，据估计约有两百万人，遍布马来西亚和中国。', 'MBI 全名 Mobility Beyond Imagination，约 2012 年从槟城起家，创办人张誉发（Tedy Teow）[[1]]。玩法拆开只有三步：一、你交钱买「配套」，几千到几十万不等；二、你拿到一枚它自家发行的虚拟币（外界常提到 GRC），号称只涨不跌；三、你拉更多人进来，下线越多赚得越多。看到第三步就该亮红灯——这不就是拉人头传销吗？没错，但 MBI 真正害人的地方，是给它套了一层看起来很正当的皮。'],
        },
      },
      {
        title: { en: 'The skin was called M Mall', zh: '那层皮，叫 M Mall' },
        paragraphs: {
          en: ['If it were only a coin and recruiting, anyone slightly wary would walk. So MBI built M Mall—an online-to-offline shopping mall (they called it O2O). Its job was to answer the deadliest question: why is your coin worth anything? MBI\'s answer: because you can use it—spend the coin in M Mall, backed by real shops and real merchants, so the coin has "real value behind it."', 'This step is the soul of the whole scheme: dressing a recruit-and-coin money game as an "O2O tech company with a real business." It is exactly the move [[note:carrian-case|Carrian]] used—real property deals masking the fact that everything underneath was borrowed money—using a visible "real business" to blur a hollow core. But the mall could not hold up the coin: real trade in M Mall was tiny next to the flood of money pouring in. The coin "rose" not because the mall earned anything, but because there were always new people willing to buy in at a higher price.'],
          zh: ['如果只是发币、拉人头，稍有警惕的人就会跑。所以 MBI 搭了一个 M Mall——线上线下打通的购物商城（他们叫 O2O）。它的作用是回答那个最要命的问题：你这枚币，凭什么值钱？MBI 的答案是：因为它能用——你能拿币在 M Mall 消费，我们背后有真实商城、真实商家，所以这币有「真实价值支撑」。', '这一步是整个骗局的灵魂：把一个「拉人头＋虚拟币」的 money game，包装成「有实体业务的 O2O 科技公司」。这和[[note:carrian-case|佳宁]]当年用真实的地产交易掩盖底下全是借来的钱，是一模一样的手法——用一个你看得见的「真生意」，模糊掉底下那个空洞的本质。但商城撑不起那枚币：M Mall 真实的买卖，跟外面涌进来的天量资金比小得可怜。币之所以「涨」，从来不是商城赚了钱，而是后面一直有新人愿意用更高的价格接盘。'],
        },
      },
      {
        title: { en: 'Hold up the three old questions, and it shows', zh: '拿三个老问题一套，就现形' },
        paragraphs: {
          en: ['In [[note:modern-finance-ponzi|Is modern finance a Ponzi scheme]] I laid out three old questions for telling whether something is a money game. Applied to MBI, it is almost a clean sweep. Where do returns come from? Early entrants\' "returns" come mainly from later entrants\' money. Is anything real there? The coin has no matching real value; M Mall cannot support its scale. Does it collapse if new money stops? The moment recruits dry up and everyone cashes out at once, the coin price and the whole pool crash.', 'Three for three. So however much it talks of "blockchain," "O2O," and "the digital economy," at its bones it is a money game. And it expanded startlingly: by around 2016 it had reached China, Taiwan, Japan, and New Zealand[[1]], with China worst hit and victims later estimated near two million—Teow was even nicknamed "Jho Low 2" by the press[[2]].'],
          zh: ['我在[[note:modern-finance-ponzi|《现代金融，是一场庞氏骗局吗》]]里讲过判断一个东西是不是 money game 的三个老问题。套 MBI 几乎逐条命中：回报从哪来？早加入者的「回报」主要来自后加入者的钱。有没有真东西？那枚币背后没有对应的真实价值，M Mall 撑不起它的体量。断了新钱会崩吗？只要新人一停、大家一起套现，币价和整个盘子就崩。', '三条全中。所以不管它讲多少「区块链」「O2O」「数字经济」的新词，骨子里就是一场 money game。而它扩张惊人：2016 年前后触角已伸到中国、台湾、日本、新西兰[[1]]，重灾区是中国，受害者后来估计约两百万，张誉发也被媒体戏称为「Jho Low 2」、第二个刘特佐[[2]]。'],
        },
      },
      {
        title: { en: 'Collapse and the manhunt', zh: '崩塌与追捕' },
        paragraphs: {
          en: ['Paper cannot wrap fire, and neither can a crypto skin. In May 2017 Malaysia\'s central bank (Bank Negara) seized MBI and froze accounts—but the money had long scattered, and only about RM177m was recovered; MBI was placed on the central bank\'s financial alert list[[1]].', 'Teow fled to Thailand and kept operating. He was arrested there in July 2022 and extradited to China in August 2024—where the charges involve a crypto pyramid scheme worth some US$14bn[[3]]. Asset recovery continues: in 2025 the operation code-named Ops Northern Star had seized or frozen about RM6.6bn, and those arrested even included property tycoons with Datuk and Tan Sri titles; reports that year also said cross-border seizures, with China\'s help, reached about US$900m[[4]].'],
          zh: ['纸包不住火，加密币的皮也一样。2017 年 5 月，马来西亚国家银行（Bank Negara）查封 MBI、冻结账户，但钱早已四散，只追回约 1.77 亿令吉，MBI 也被列入国行金融警示名单[[1]]。', '张誉发逃到泰国继续经营。2022 年 7 月在泰国被捕；2024 年 8 月被引渡到中国受审——中方指控涉及一个金额高达约 140 亿美元的加密货币传销骗局[[3]]。追赃仍在继续：2025 年代号 Ops Northern Star 的行动累计查扣冻结约 66 亿令吉，被捕者中甚至有拿督、丹斯里级的产业大亨；同年也有报道称在中国协助下跨境查扣资产约 9 亿美元[[4]]。'],
        },
      },
      {
        title: { en: 'The clothes keep changing; the core never does', zh: '皮一直在换，芯从来没变' },
        paragraphs: {
          en: ['Put MBI beside [[note:carrian-case|Carrian]], and even beside Charles Ponzi a century ago, and you see something scary and useful: the scam\'s clothes keep upgrading while the core barely changes. The clothes differ by era—Ponzi used postal coupons, Carrian used property, MBI used crypto and a mall; the core never moves—pay old entrants with new ones\' money, nothing real underneath, kept alive by confidence and fresh cash.', 'New clothes work so well because they exploit two very ordinary human traits: not understanding—crypto, blockchain, O2O; the less people grasp it, the easier they are cowed by "this is high tech, this is the future"—and fear of missing out—"everyone else is earning and only I haven\'t boarded," the best fuel any money game has. So protecting yourself is not about chasing new concepts and learning which coin is real (you never finish; tomorrow brings new words), but returning to the three oldest, plainest questions: is my return earned by the business or paid from newcomers\' money? Is there anything real behind it to support the value it claims? If no new people come tomorrow, does it still run?', 'These three need no blockchain knowledge and no ability to read a balance sheet, yet they cut through almost any money game—whatever the skin: stamps, property, or a coin that supposedly "only goes up." Because in the end, whether a coin keeps rising never depends on how lovely its story is, but on one cold thing: whether someone behind you will still take your bag at a higher price. When the buyers run out, the prettiest story cannot pay out a cent.'],
          zh: ['把 MBI 和[[note:carrian-case|佳宁]]、甚至一百年前的查尔斯·庞氏摆在一起，你会看到一件挺可怕又挺有用的事：骗局的外衣一直在升级，内核几乎一模一样。外衣每个时代不同——庞氏用邮票票券、佳宁用地产、MBI 用加密币和商城；内核从来没变——拿新人的钱付旧人、底下没有真实价值、靠信心和新钱续命。', '新外衣特别好用，因为它利用两种最普通的人性：一是看不懂——加密币、区块链、O2O，越听不懂越容易被「这是高科技、是未来」唬住；二是怕错过——「别人都在赚，就我没上车」的焦虑，是所有 money game 最好的燃料。所以保护自己的方法不是去追新概念、学分辨哪个币真哪个假（那永远学不完，明天又有新词），而是回到那三个最老最土的问题：回报是生意真赚来的，还是后面新人的钱？背后有没有真东西撑起它宣称的价值？明天没有新人进来，它还转得下去吗？', '这三个问题不需要你懂区块链，也不需要你会看财报，却能戳穿几乎所有 money game——不管那层皮是邮票、地产，还是一枚号称「只会涨」的币。因为说到底，一枚币会不会一直涨，不取决于它讲了多动听的故事，而取决于一件很冷的事：后面还有没有人愿意用更高的价钱接你的盘。接盘的人没了，故事再漂亮也一分钱兑现不了。'],
        },
      },
    ],
  },
  {
    slug: 'carrian-case',
    title: { en: 'An empire built on borrowed money: the Carrian case', zh: '一座建在借来的钱上的帝国：佳宁案' },
    summary: {
      en: 'In 1983 a body turned up in a Hong Kong banana grove—an auditor a Malaysian bank had sent to check the books. His death exposed the largest fraud Hong Kong had seen: a 200-company empire that looked like it could turn stone into gold, yet was almost hollow underneath.',
      zh: '1983 年，香港大埔一片香蕉林里发现一具尸体，死者是马来西亚银行派来查账的核数师。他的死扯出当年香港最大的一场骗局——一个横跨两百多家公司、看起来点石成金的商业帝国，底下却几乎是空的。',
    },
    category: { en: 'Money & real value', zh: '钱与真实价值' },
    thesis: {
      en: 'Carrian punctures a mistake we make daily—treating "looks rich" as "is genuinely valuable." However glamorous the balance sheet, underneath there is either real output, or just borrowed money and other people\'s belief.',
      zh: '佳宁戳破的是一个我们每天都在犯的错觉——把「看起来有钱」当成「真的有价值」；账面再风光，底下要么垫着真东西，要么只是借来的钱和大家的相信。',
    },
    sources: ['ICAC · 佳宁案纪录', '维基 · 陈松青', 'Cilisos · 裕民风波', 'UPI · 1987 审讯', 'SCMP · 律师溺亡'],
    originalSource: {
      url: 'carrian-case-full.html',
      label: { en: 'Read the full original essay', zh: '阅读完整原文（白话版）' },
    },
    references: [
      { id: '1', url: 'https://www.icac.org.hk/icac/landmarkcase/carrian/schi/index.html', label: { en: 'Hong Kong ICAC — the Carrian Group fraud. Records the 1980 Gammon House deal (~HK$998m in, ~HK$1.68bn resale), a share-price peak of HK$17.9 in Nov 1980, 200+ companies, the Jan 1983 suspension and Oct 1983 winding-up (Hong Kong\'s largest corporate failure then), a 17-year probe over ~HK$6.6bn with 4 million pages of evidence, and George Tan\'s 1996 guilty plea.', zh: '香港廉政公署（ICAC）《神话的幻灭——佳宁集团诈骗案》：记载 1980 年金门大厦交易（约 9.98 亿港元买入、约 16.8 亿港元转售）、1980 年 11 月股价见 17.9 港元高位、旗下逾 200 家公司、1983 年 1 月停牌、10 月清盘（当时香港最大公司倒闭案）、廉署专案 17 年涉款约 66 亿港元、证物 400 万页，以及陈松青 1996 年认罪。' } },
      { id: '2', url: 'https://en.wikipedia.org/wiki/George_Tan', label: { en: 'George Tan Soon-gin (Wikipedia). Born 1933, civil-engineering background, bankrupt in Singapore in the 1960s, moved to Hong Kong in 1972; took over and renamed Carrian in the late 1970s; acquitted after a 19-month trial in 1987; pleaded guilty to conspiracy to defraud in 1996 over BMF secret loans (~US$238m), jailed 3 years, released 1998.', zh: '陈松青（George Tan Soon-gin），英文维基百科：1933 年生，土木工程背景，1960 年代在新加坡破产，1972 年赴港；1970 年代末接手并改名佳宁；1987 年经 19 个月审讯获判无罪；1996 年就约 2.38 亿美元裕民银行秘密贷款认串谋诈骗罪，判囚 3 年，1998 年获释。' } },
      { id: '3', url: 'https://cilisos.my/how-the-mysterious-death-of-an-auditor-in-1983-lead-to-malaysias-first-banking-scandal/', label: { en: 'The Jalil Ibrahim killing and the BMF affair (Cilisos). Sent by Malaysia\'s Bumiputra bank in late 1982 to investigate loans to Carrian, Ibrahim was murdered in July 1983, his body found in a New Territories banana grove; BMF lent the Carrian group ~RM2.5bn; after the collapse Malaysia injected RM600m, then had Petronas buy 90% of Bumiputra for ~RM933m and absorb ~RM1.2bn of bad debt.', zh: '核数师 Jalil Ibrahim 命案与裕民银行（BMF）风波（Cilisos 综合报道）：他 1982 年底被马来西亚裕民银行派往香港调查对佳宁的贷款，1983 年 7 月遇害，尸体在新界香蕉园被发现；裕民财务借予佳宁系约 25 亿马币；崩盘后马来西亚政府先注资 6 亿马币，1984 年再由 Petronas 约 9.33 亿马币买下九成股权、吸收约 12 亿马币坏账。' } },
      { id: '4', url: 'https://www.upi.com/Archives/1987/09/15/Hong-Kong-fraud-trial-thrown-out/4829558676800/', label: { en: 'UPI archive (1987) — the ~19-month Carrian fraud trial was thrown out by the judge, and Tan was acquitted at the time.', zh: 'UPI 档案（1987）：历时约 19 个月的佳宁诈骗审讯被法官叫停，陈松青当时获判无罪。' } },
      { id: '5', url: 'https://www.scmp.com/article/35624/drowning-linked-carrian-probe', label: { en: 'South China Morning Post — a senior legal adviser close to Carrian was found drowned in his own pool, a death linked to the Carrian investigation.', zh: '南华早报（SCMP）：一名与佳宁关系密切的资深法律顾问被发现溺死于自家泳池，其死亡与佳宁案调查相关联。' } },
    ],
    sections: [
      {
        title: { en: 'A body in the banana grove', zh: '香蕉林里的尸体' },
        paragraphs: {
          en: ['In July 1983, Jalil Ibrahim, an auditor at Malaysia\'s Bumiputra bank, vanished in Hong Kong. Head office had sent him to find out one thing: why the Hong Kong subsidiary had lent so much money to a single company. He never finished—his body was found in a banana grove in Tai Po, a bathrobe cord around his neck[[3]].', 'Tracing the case back from that body, investigators in both places slowly saw the truth: the company that had borrowed those astronomical sums, the toast of the city, owed almost all of its glamour to borrowed money. The company was Carrian.'],
          zh: ['1983 年 7 月，马来西亚裕民银行的核数师 Jalil Ibrahim 在香港失踪。总行派他来查一件事：香港的子公司为什么把那么多钱借给同一家公司。他没能查完——人们在大埔一片香蕉林里找到他的尸体，脖子上勒着一条浴袍带子[[3]]。', '顺着这具尸体往回查，两地的人才慢慢看清：那家借走天量资金、当时红得发紫的公司，风光几乎全是借来的。这家公司，叫佳宁。'],
        },
      },
      {
        title: { en: 'The man who seemed to turn stone into gold', zh: '那个「点石成金」的人' },
        paragraphs: {
          en: ['The lead was George Tan, born 1933, a civil engineer who ran construction in Singapore and Malaysia—going bankrupt once—before arriving in Hong Kong in 1972 as a mere project manager at a property firm[[2]]. He knew how to buy land cheap in a down market: once buying a plot for HK$2.5m and flipping it to the government for HK$6.2m within a year, building his first fortune and his name.', 'What made him an overnight legend was one building: in January 1980 Carrian bought Central\'s Gammon House for about HK$998m, then months later announced a resale for HK$1.68bn[[1]]. Nearly HK$700m of paper profit in months stunned the whole city. On that halo Carrian expanded wildly into shipping, tourism, insurance, property, and finance—over 200 companies at its peak, spanning the Asia-Pacific and North America.'],
          zh: ['主角陈松青，1933 年生，土木工程背景，1960 年代在新马做工程、还破过产，1972 年到香港，起初只是地产公司的工程经理[[2]]。他懂得在楼市低迷时低价买地——曾用 250 万港元买地，一年内 620 万转手卖给政府，攒下第一桶金和名声。', '真正让他一夜封神的是一栋楼：1980 年 1 月，佳宁用约 9.98 亿港元买下中环金门大厦，几个月后宣布以 16.8 亿港元转手[[1]]。账面几个月赚近 7 亿，整个香港被镇住。借着这股光环，佳宁疯狂扩张到航运、旅游、保险、地产、金融，巅峰时旗下两百多家公司，横跨亚太和北美。'],
        },
      },
      {
        title: { en: 'Where did the money come from?', zh: '钱，到底从哪来？' },
        paragraphs: {
          en: ['The market kept guessing where Tan\'s money came from—a mysterious tycoon? An overseas syndicate? The truth was less romantic: most of it was borrowed. The heaviest line ran from Malaysia—Bumiputra Malaysia Finance (BMF), the Hong Kong arm of the state bank, lent the Carrian group about RM2.5bn[[3]].', 'That recolors the Gammon House legend: the "HK$700m in months" was largely borrowed money used to prop asset prices higher, layer by layer, as a show for the market. It looked like value creation but was mostly moving borrowed money around—a gleaming empire whose foundation was other people\'s money. As long as the money kept coming and the market kept believing, it kept turning.'],
          zh: ['市场一直猜：陈松青的钱从哪来？神秘富豪，还是海外财团？真相没那么浪漫——绝大部分是借来的。借得最狠的一条线来自马来西亚裕民银行在港的子公司「裕民财务」（BMF），前后借给佳宁系约 25 亿马币[[3]]。', '于是金门大厦的神话味道就变了：所谓「几个月赚 7 亿」，很大程度是用一笔笔借来的钱把资产价格一层层垫高、做给市场看。它看起来在创造价值，其实大多数时候只是在搬运借来的钱——一座金光闪闪的帝国，地基却是别人的钱。只要钱一直借得到、市场一直相信，它就能一直转。'],
        },
      },
      {
        title: { en: 'The cracks, and the collapse on two shores', zh: '裂缝，与两地一起塌' },
        paragraphs: {
          en: ['But money is not borrowed forever, and markets do not believe forever. In 1982 Hong Kong property cooled, and uncertainty from the Sino-British talks over Hong Kong\'s future pushed asset prices down. For an empire living on "borrow new, prop assets," this was fatal: as buildings fell, collateral lost value, new money stopped coming, and old debts came due one by one[[1]].', 'Around the same time, Bumiputra\'s head office grew suspicious and sent auditor Ibrahim to investigate. He had just rejected a roughly US$4m loan Carrian urgently needed, and had written in his notes that the bank "has been used, exploited to make money for political purposes"[[3]]. Then came the opening scene. The case dragged in another strange death—a senior Carrian legal adviser found drowned in his own pool[[5]].', 'Carrian was suspended in January 1983 and wound up that October—Hong Kong\'s largest corporate collapse at the time, leaving almost nothing real behind. Malaysia was dragged under: about RM2.5bn turned to bad debt, pushing Bumiputra to the brink; the government injected RM600m, then in 1984 had Petronas buy 90% for about RM933m and absorb some RM1.2bn of bad loans[[3]]. A Hong Kong company\'s paper prosperity was, in the end, patched with Malaysian taxpayers\' money.'],
          zh: ['但钱不会永远借得到，市场也不会永远相信。1982 年香港楼市转冷，加上中英关于香港前途谈判的不确定，资产价格下行。对一个靠「借新钱、垫高资产」活着的帝国，这是致命的：楼一跌，抵押品不值钱，新钱借不进来，旧债却一笔笔到期[[1]]。', '差不多同时，裕民总行起疑，派核数师 Ibrahim 来查。据披露，他遇害前刚否决一笔佳宁急需的、约 400 万美元的贷款，还在笔记里写下「这家银行一直被人利用，被用来为政治目的赚钱」[[3]]。然后就有了开头那一幕。命案还牵出另一桩离奇死亡——佳宁一位资深法律顾问被发现溺死在自家泳池[[5]]。', '1983 年 1 月佳宁停牌，10 月清盘，成为当时香港最大公司倒闭案，帝国几乎没留下真东西。真正被拖下水的是马来西亚：约 25 亿马币成坏账，把裕民银行推到破产边缘；政府先注资 6 亿马币，1984 年再让 Petronas 约 9.33 亿马币买下九成股份、吞约 12 亿马币坏账[[3]]。一家香港公司账面上的繁荣，最后用马来西亚纳税人的钱去填窟窿。'],
        },
      },
      {
        title: { en: 'Seventeen years for a three-year sentence—and the lesson', zh: '十七年换三年，以及它教我们的事' },
        paragraphs: {
          en: ['The ending is just as rueful. The ICAC probe ran 17 years, involved about HK$6.6bn, and produced four million pages of evidence[[1]]; the 19-month fraud trial in 1987 still collapsed when the judge halted it and Tan was acquitted[[4]]; only in 1996 did he admit two counts of conspiracy to defraud, drawing a three-year sentence, and he was out by 1998[[2]]. A fraud that toppled Hong Kong\'s largest company, nearly sank a national bank, and was indirectly tied to a killing cost its mastermind three years.', 'But what Carrian really punctures is a mistake we make daily: treating "looks rich" as "is genuinely valuable." That line of thinking is the same one running through [[note:what-is-wealth|What is wealth]] and [[note:modern-finance-ponzi|Is modern finance a Ponzi scheme]]—money is only a record; what matters is whether there is anything real underneath.', 'So Carrian leaves a plain, easily-forgotten question: the "wealth" in front of you—a company, a building, a person\'s net worth—what sits underneath it? Real things that were made, or just borrowed money and shared belief? Money can be faked, prices propped, confidence inflated; real value cannot. It was either produced, or it was not.'],
          zh: ['结局同样让人唏嘘。廉署专案历时 17 年、涉款约 66 亿港元、证物四百万页[[1]]；1987 年那场打了 19 个月的诈骗审讯还是崩了，法官叫停，陈松青一度获判无罪[[4]]；直到 1996 年他才认了两项串谋诈骗罪，判囚三年，1998 年出狱[[2]]。搞垮香港最大公司、几乎拖垮一家国家银行、还间接连着一条人命的骗局，主谋最后蹲了三年。', '但佳宁真正戳破的，是一个我们每天都在犯的错觉：把「看起来有钱」当成「真的有价值」。这条思路和[[note:what-is-wealth|《财富到底是什么》]]、[[note:modern-finance-ponzi|《现代金融是庞氏骗局吗》]]是同一路——钱只是记录，真正重要的是底下有没有真东西。', '所以佳宁留下的是一个朴素又容易被忘记的问题：你眼前这份「财富」——一家公司、一栋楼、一个人的身家——底下垫着的，是真实做出来的东西，还是只是借来的钱和大家的相信？钱可以造假、价格可以垫高、信心可以吹起来，但真实价值不会：它要么被做出来了，要么没有。'],
        },
      },
    ],
  },
  {
    slug: 'modern-finance-ponzi',
    title: { en: 'Is modern finance a Ponzi scheme?', zh: '现代金融是庞氏骗局吗' },
    summary: {
      en: '"Government debt, pensions, paper money—isn\'t this just a Ponzi scheme?" People say it every day. Rather than rush to agree or disagree, I first want to take the term "Ponzi scheme" apart and see it clearly.',
      zh: '「国债、养老金、纸币……这不就是个庞氏骗局吗？」这句话每天都有人在说。我不急着反驳，也不急着附和，只想先把「庞氏骗局」这个词好好拆开看清楚。',
    },
    category: { en: 'Money & the future', zh: '钱与未来' },
    thesis: {
      en: 'By definition modern finance is not a Ponzi scheme—it only shares the "borrow new to repay old" trait. The sharper question is not "is it a scam" but "is debt growing faster than the real things the future can produce?"',
      zh: '按定义，现代金融不是庞氏骗局——它只沾了「借新还旧」这一条；真正该问的不是「是不是骗局」，而是「债，是不是涨得比未来能做出的真东西还快」。',
    },
    sources: ['SEC · 庞氏骗局定义', 'Smithsonian · 庞氏本尊', 'Britannica · 麦道夫', 'ICAC · 佳宁案', '英格兰银行 · 货币创造', '美联储 · 大衰退'],
    originalSource: {
      url: 'modern-finance-ponzi-full.html',
      label: { en: 'Read the full original essay', zh: '阅读完整原文（白话版）' },
    },
    references: [
      { id: '1', url: 'https://www.investor.gov/protect-your-investments/fraud/types-fraud/ponzi-scheme', label: { en: 'SEC / Investor.gov — Ponzi Scheme. A fraud that pays earlier investors with money taken from newer ones; there is little or no real return, and it collapses once new money dries up or too many investors cash out.', zh: '美国证券交易委员会（SEC）/ Investor.gov《庞氏骗局》：拿新投资者的钱付给老投资者的骗局，几乎没有真实收益，一旦拉不到新人或大量赎回就会崩溃。' } },
      { id: '2', url: 'https://www.smithsonianmag.com/history/in-ponzi-we-trust-64016168/', label: { en: 'Smithsonian Magazine — In Ponzi We Trust. Charles Ponzi\'s 1920 scheme promised 50% in 45 days via postal-coupon arbitrage; ~40,000 people gave him ~$15m in eight months; the real coupons were worth $61; investors recovered under 30 cents on the dollar.', zh: 'Smithsonian《In Ponzi We Trust》：庞氏 1920 年承诺「45 天回报 50%」，号称靠国际邮政票券套利；八个月募得约 1500 万美元，真实票券仅值 61 美元，投资者每美元拿回不到 30 美分。' } },
      { id: '3', url: 'https://www.britannica.com/biography/Bernie-Madoff', label: { en: 'Encyclopædia Britannica — Bernie Madoff. About $65bn on paper, the largest Ponzi scheme in history, which collapsed amid concentrated redemptions during the 2008 crisis.', zh: '《大英百科》伯纳德·麦道夫：账面约 650 亿美元，史上最大庞氏骗局，2008 年危机中因集中赎回而崩溃。' } },
      { id: '4', url: 'https://www.icac.org.hk/icac/landmarkcase/carrian/schi/index.html', label: { en: 'Hong Kong ICAC — the Carrian Group case. George Tan built a 200-company empire on bank loans and a fabricated property windfall; it collapsed in 1983 as Hong Kong\'s largest corporate failure then. Strictly corporate fraud, not a textbook Ponzi, but it shares the "glamorous surface, nothing real underneath" core.', zh: '香港廉政公署（ICAC）佳宁案：陈松青靠银行贷款与制造出的地产暴利假象撑起两百多家公司，1983 年崩盘，为当时香港最大公司破产案。严格说是公司诈骗而非标准庞氏，但共享「账面繁荣、底下无真实价值」的核心。' } },
      { id: '5', url: 'https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy', label: { en: 'Bank of England — Money Creation in the Modern Economy (2014). A bank loan creates a matching deposit (new money), and that lending can fund real production and investment—the key difference from a Ponzi scheme.', zh: '英格兰银行《现代经济中的货币创造》（2014）：银行放贷会同时造出等额存款（新钱），而这些钱可以为真实的生产和投资出力——这正是它和庞氏骗局最不一样的地方。' } },
      { id: '6', url: 'https://www.federalreservehistory.org/essays/great-recession-and-its-aftermath', label: { en: 'Federal Reserve History — The Great Recession and Its Aftermath. The 2007–2009 crisis turned on mass mortgage defaults and a collapse of trust between institutions—money and confidence seizing up, not "cash being less than debt."', zh: '美联储历史《大衰退及其余波》：2007–2009 危机核心是大量房贷违约加上金融机构彼此不再信任、资金一下子流不动——是钱和信心断掉，而非「现金少于债务」。' } },
    ],
    sections: [
      {
        title: { en: 'First, see what a Ponzi scheme actually is', zh: '先看清「庞氏骗局」长什么样' },
        paragraphs: {
          en: ['Boston, 1920. The Italian immigrant Charles Ponzi promised "50% profit in 45 days," claiming to arbitrage international postal reply coupons. Money poured in—about 40,000 people handed him roughly $15m in eight months[[2]]. But the business did not exist: the coupons were worth all of $61, and the "profits" early investors received were simply later investors\' principal. The moment the papers exposed it, the whole thing collapsed and people recovered under 30 cents on the dollar.', 'The U.S. securities regulator (SEC) puts it bluntly: a Ponzi scheme pays earlier investors with money taken from newer ones[[1]]. Broken down, it has three inseparable traits—returns come from later entrants rather than real earnings; nothing real is produced, so money just changes hands; and it must eventually collapse, because it needs ever more new money to survive.', 'Madoff, which blew up in 2008, is the textbook version—about $65bn on paper, the largest in history[[3]]. Hong Kong\'s 1980s [[note:carrian-case|Carrian affair]][[4]] was closer to corporate fraud, but shared the deadly trait: a glamorous surface with almost nothing real underneath, kept alive only by fresh borrowed money.'],
          zh: ['1920 年的波士顿，意大利移民查尔斯·庞氏承诺「45 天翻回一半利润」，说靠买卖国际邮政票券套利。钱像潮水涌进来，八个月里约四万人交给他约 1500 万美元[[2]]。可那门生意根本不存在——事后清点，票券只值 61 美元，早来的人拿到的「利润」全是后来者的本金。报纸一戳破就当场塌掉，最后每一块钱拿回不到三毛。', '美国证券监管机构 SEC 的定义很干脆：庞氏骗局就是「拿新来的人的钱，去付给早来的人」的骗局[[1]]。拆细一点，它有三个缺一不可的特点——一、回报来自后面的人，不是真赚来的；二、背后没做出任何真东西，钱只在人之间转手；三、它迟早一定塌，因为需要的新钱只会越来越多。', '2008 年爆掉的麦道夫案是标准版本，账面约 650 亿美元，史上最大[[3]]；1980 年代香港的[[note:carrian-case|佳宁案]][[4]]则更像公司诈骗，但共享那个最要命的特征——账面风光，底下几乎没有真东西，全靠不断借来的新钱续命。'],
        },
      },
      {
        title: { en: 'Hold the three traits up against modern finance', zh: '把三条架到现代金融头上' },
        paragraphs: {
          en: ['Trait one—returns funded by later entrants—modern finance does resemble. Governments and banks routinely "borrow new to repay old," and pensions often pay one generation with the contributions of the next. The suspicion is not baseless.', 'But trait two decides it: is anything real produced? A Ponzi scheme produces nothing; modern lending can. A bank lends you a million, you build a factory, and the factory makes products and services that did not exist before—that extra value is genuinely made, not moved out of someone else\'s pocket[[5]]. A Ponzi only ever splits the same cake; lending can grow the cake—the same line I draw in [[note:what-is-wealth|What is wealth]]: money only keeps score, and the ability to meet needs is the real wealth.', 'Trait three—must it inevitably collapse? A Ponzi is a mathematical dead end, needing ever-faster inflows. The modern system has no deadline forcing all debt repaid at once: money keeps circulating, lending creates it and repayment destroys it, and governments still hold taxes, interest rates, and printing. It can break—but from money suddenly not flowing and confidence vanishing, not from arithmetic. 2008 was exactly that[[6]].'],
          zh: ['第一条，回报靠后面的人的钱——这一条现代金融有点像。政府和银行常「借新还旧」，养老金也常是这一代交的钱直接发给上一代。所以怀疑的人，直觉不是没道理。', '但真正定输赢的是第二条：背后有没有做出真东西。庞氏骗局什么都没有；而现代借贷能做出真东西——银行借你 100 万建工厂，工厂产出原本不存在的产品和服务，这多出来的价值是被真正「做」出来的，不是从别人口袋里挪来的[[5]]。庞氏永远只在分同一块蛋糕，借贷有机会把蛋糕做大——这也是[[note:what-is-wealth|《财富到底是什么》]]里那条底层分界：钱只记账，能满足需求的能力才是财富。', '第三条，它是不是迟早一定塌？庞氏是算得出来的死局，需要新钱越来越快地涌入。现代体系没有「某天必须一次性还清所有债」这条死线：钱可以一直转，借贷造钱、还钱消钱，政府还有加税、调息、印钱等办法。它会出事，但原因不是算术，而是钱突然流不动、信心突然消失——2008 年就是这样[[6]]。'],
        },
      },
      {
        title: { en: 'The verdict—and a far more interesting "but"', zh: '结论，以及那个更有意思的「但是」' },
        paragraphs: {
          en: ['On all three, the answer is clear: strictly by definition, modern finance is not a Ponzi scheme. It only brushes trait one ("borrow new to repay old"); the decisive traits two and three do not hold.', 'But there is a "but" far more interesting than "scam or not": modern finance and a Ponzi share one weak point—both depend on the future. A Ponzi needs more newcomers to buy in; modern finance needs people to keep working, consuming, paying taxes, producing, and trusting the system. The difference is that the Ponzi\'s bet on the future is a fraud, while modern finance\'s is a real dependency. It does not lie or steal, but it does wager on one thing: that the future will produce more real things than today.'],
          zh: ['三条比下来，答案清楚：认真按定义讲，现代金融不是庞氏骗局。它只沾了第一条「借新还旧」的边，而最要命的第二、第三条都不成立。', '但这里有个比「是不是骗局」有意思得多的「但是」：现代金融和庞氏骗局确实有一个共同的命门——都指望未来。庞氏指望未来有更多新人接盘；现代金融指望未来还有人工作、消费、纳税、生产，还愿意相信这套东西。差别是：庞氏的「指望未来」是骗局，现代金融的「指望未来」是一种真实的依赖——它不偷不骗，但确实押了一个宝：未来会比今天做出更多真东西。'],
        },
      },
      {
        title: { en: 'Why "it\'s a Ponzi scheme" is a lazy line', zh: '为什么「这是庞氏骗局」是句偷懒的话' },
        paragraphs: {
          en: ['That is why blurting "it\'s just a Ponzi scheme" is a trap: it is too easy to refute. The other side only has to say "borrowed money can build real things," "governments have tools," or "there is no arithmetic deadline," and your whole point collapses—sliding the debate from "what is wrong with this system" into a shouting match over "is it a scam," which you are bound to lose.', 'The sharper question: is our debt growing faster than the real things the future can produce? If borrowed money becomes factories, technology, and education, it holds; if it only pushes asset prices higher, covers spending, and pays interest on old debt, then debt compounds while real output lags—that is how bubbles inflate. This framing contains no "scam" at all, yet goes straight to the heart: the scarcity is not cash, but whether the future\'s real output can honor the promises made today.'],
          zh: ['正因如此，张口就喊「这就是庞氏骗局」是个陷阱：它太好反驳了。对方只要说「借来的钱能做出真东西」「政府有的是办法」「它没有算术死线」，你整个论点就塌了，讨论会从「这个体系有什么毛病」滑向「它算不算骗局」的口水战——而这场架你注定输。', '更聪明的问法是：我们欠下的债，是不是正在涨得比未来能做出来的真东西还快？借来的钱若变成工厂、技术、教育，它撑得住；若只是把房价股价越推越高、填补花销、给旧债付利息，那债越滚越多、真东西却没跟上，泡沫就是这么吹起来的。这个问法一个「骗局」都没有，却直接戳到心脏：不是钱不够，而是未来能做出的真东西，够不够兑现今天许下的承诺。'],
        },
      },
      {
        title: { en: "Don't rush to slap on a label", zh: '别急着贴标签' },
        paragraphs: {
          en: ['"Ponzi scheme" is a label that stops thought—once applied, the discussion ends: believe or don\'t, no middle ground. The better move is the opposite: peel off the scary label, take the word apart, see what pieces it is made of, and check each against reality. Do that and you find modern finance is not a scam, but it does stand on one enormous assumption—that the future will be richer. That assumption is not a lie, but it is not a given either.', 'A Ponzi scheme cheats you of money; modern finance truly wagers on the future. So rather than "is it a scam," the question worth keeping is this: if what it stakes everything on is the belief that the future will produce more than today, does that belief still hold in an age of falling birth rates and AI rewriting how things get made?'],
          zh: ['「庞氏骗局」是个会让人停止思考的标签，一贴上去讨论就结束了——要么信要么不信，没有中间地带。更值得做的恰恰相反：先撕下吓人的标签，把词拆开，看清它由哪几块拼成，再一块块对照现实。拆完你会发现：现代金融不是骗局，但它确实站在一个巨大的假设上——未来会更富有。这个假设不是谎话，但也不是天经地义。', '庞氏骗局骗的是钱，现代金融真正赌的是未来。所以比起「它是不是一场骗局」，更值得问：如果它押上的是「未来会比今天做出更多东西」这个信念，那在人越生越少、AI 又在改写整个生产方式的年代，这个信念还站得住吗？'],
        },
      },
    ],
  },
  {
    slug: 'what-is-wealth',
    title: { en: 'What is wealth, really?', zh: '财富到底是什么' },
    summary: {
      en: 'Too many people are busy predicting bonds, AI, and house prices. I wanted to do something dumber: take the word "wealth" apart layer by layer, and see what is left at the very bottom.',
      zh: '预测美债、AI、房价的人已经太多。我想做件更笨的事：把「财富」这个词一层层拆开，看看最底下到底剩下什么。',
    },
    category: { en: 'First principles', zh: '第一性原理' },
    thesis: {
      en: 'Money is not wealth—the ability to meet needs is. And the further out you look, wealth becomes how much future productive capacity you can control.',
      zh: '钱不是财富，能满足需求的能力才是；越往未来，财富越等于你能控制多少未来的生产能力。',
    },
    sources: ['英格兰银行 · 货币创造', 'IIF 全球债务监测', 'Pew 全球生育趋势', 'NBER · Generative AI at Work', 'CBO / IMF 财政展望'],
    referencesNote: {
      en: 'These are the sources for the factual claims. The extrapolations—future wealth leaning toward energy, compute, or AI—are my own reasoning, not cited here.',
      zh: '以上是文章「事实」部分的来源。「推演」部分（未来财富更偏能源、算力或 AI）只是顺着逻辑的推测，不在此列。',
    },
    originalSource: {
      url: 'what-is-wealth-full.html',
      label: { en: 'Read the full original essay', zh: '阅读完整原文（白话版）' },
    },
    references: [
      { id: '1', url: 'https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy', label: { en: 'Bank of England — Money Creation in the Modern Economy (2014 Q1 Bulletin). A bank loan creates a matching deposit—new money—and repaying it destroys that money.', zh: '英格兰银行《现代经济中的货币创造》（2014 Q1 公报）：银行放贷会同时创造等额存款，也就是新钱；还贷则消灭这些钱。' } },
      { id: '2', url: 'https://www.iif.com/Products/Global-Debt-Monitor', label: { en: 'IIF Global Debt Monitor — global debt reached a record ~$348tn by the end of 2025.', zh: 'IIF《全球债务监测》：截至 2025 年底，全球债务总额约 348 万亿美元，创历史新高。' } },
      { id: '3', url: 'https://www.pewresearch.org/short-reads/2025/08/15/5-facts-about-global-fertility-trends/', label: { en: 'Pew Research Center — 5 facts about global fertility trends (2025). Replacement fertility is ~2.1 children per woman; most regions now sit below it.', zh: '皮尤研究中心《关于全球生育趋势的 5 个事实》（2025）：更替水平约为每名女性 2.1 个孩子，多数地区已低于此。' } },
      { id: '4', url: 'https://www.federalreservehistory.org/essays/great-recession-and-its-aftermath', label: { en: 'Federal Reserve History — The Great Recession and Its Aftermath. The 2007–2009 crisis turned on subprime defaults and a collapse of trust between institutions.', zh: '美联储历史《大衰退及其余波》：2007–2009 危机核心是次贷违约，以及金融机构之间信任崩溃、银行间市场冻结。' } },
      { id: '5', url: 'https://www.nber.org/papers/w31161', label: { en: 'Brynjolfsson, Li & Raymond — Generative AI at Work (NBER w31161). Measured ~14% average productivity gains for support agents; the "5×/10×" figure is my extrapolation, not the finding.', zh: 'Brynjolfsson、Li、Raymond《Generative AI at Work》（NBER w31161）：客服平均生产力约提升 14%；文中「放大 5 倍、10 倍」是我的推演，不是实测结论。' } },
      { id: '6', url: 'https://www.cbo.gov/publication/61187', label: { en: 'CBO — The Long-Term Budget Outlook: 2025–2055. Aging and mandatory spending keep pushing public debt up; the IMF Fiscal Monitor tracks the same pressure.', zh: 'CBO《长期预算展望 2025–2055》：人口老龄化与强制性支出持续推高政府债务；IMF《财政监测》亦跟踪各国财政可持续性。' } },
    ],
    sections: [
      {
        title: { en: 'Assumption 1: money is wealth', zh: '假设一：钱，就是财富' },
        paragraphs: {
          en: ['Suppose only two people are left on Earth. You have $10bn; the other person has only clean water, enough food, and a solar panel. Who is richer? The answer is obvious—your $10bn is worth something for one reason only: someone else is still willing to trade real things for it. The moment that person leaves, the cash is just paper.', 'Money, taken apart, is only an agreed medium for keeping accounts. It cannot be eaten, drunk, or burned for power. Gold, dollars, yuan—all of it runs on belief. So wealth is not money; it is the ability to meet needs. Money is just the tool you use to trade for that ability. It records wealth, but it is not wealth itself.'],
          zh: ['假设地球上只剩两个人。你有 100 亿美金，另一个人只有干净的水、够吃的食物和一块太阳能板。谁更有钱？答案很明显——你手上那 100 亿值钱，唯一的原因是「还有别人愿意拿东西跟你换」。那个人一走，钞票就只是一堆纸。', '钱拆开看，只是大家约定用来记账的交换媒介，本身不能吃、不能喝、不能发电。黄金、美元、人民币都一样，靠的是信念。所以财富的本质不是钱，而是能满足需求的能力。钱只是换这种能力时用的工具，它记录财富，却不是财富本身。'],
        },
      },
      {
        title: { en: 'Assumption 2: debt is just owing money', zh: '假设二：债务，就是欠钱' },
        paragraphs: {
          en: ['A modern bank loan mostly creates money from nothing: lending you 100 does not move it out of someone else\'s deposit—it is written into existence the moment the loan is made, and destroyed when you repay (the Bank of England says exactly this)[[1]]. Which raises the classic suspicion: the bank created 100 but wants 110 back, so where does the extra 10 come from? Is this a [[note:modern-finance-ponzi|Ponzi scheme]] waiting to blow up?', 'Half right, half wrong. The bank never has to print that 10: the same money changes hands many times a year, and when you borrow 100 to buy a machine that makes something worth 150, the extra value comes from labor, skill, energy, and demand—money just puts a price on it. So debt never borrows money; it borrows the future. Borrowing 100 today is a bet that you can produce more than 100 of real things later.', 'That is why the real danger is not "not enough cash to repay." Global debt reached roughly $348tn by the end of 2025[[2]], but the other end of every debt is someone\'s asset—repay it all at once and those assets vanish too. The system breaks when cash flow and confidence snap together, which is close to what happened in 2008[[4]].'],
          zh: ['现代银行放贷基本是凭空创造钱——借你 100 不是从别人存款搬来的，而是在放贷那一刻记出来的，你还清时这笔钱又被消掉（英格兰银行自己就是这么解释的）[[1]]。于是有人怀疑：银行造了 100，却要你还 110，多出来的 10 从哪来？这会不会是迟早爆的[[note:modern-finance-ponzi|庞氏骗局]]？', '一半对，一半错。那个 10 不用银行再印：同一笔钱一年能转很多手，你借 100 买机器做出价值 150 的东西，多出来的价值是劳动、技术、能源和需求一起做出来的，钱只是给它标价。所以债务借的从来不是钱，是未来——你今天借 100，其实在赌未来能做出超过 100 的真东西。', '也因此，这套体系真正的危险不是「现金不够还债」。全球债务到 2025 年底已约 348 万亿美元[[2]]，但每一笔债的另一头都挂着某人的一笔资产，全部还清资产也会一起蒸发。它真正会爆的时刻，是现金流和信心一起断掉那一刻——2008 年就接近这样[[4]]。'],
        },
      },
      {
        title: { en: 'Assumption 3: growth is forever, and it runs on people', zh: '假设三：经济会一直涨，而且靠「人」' },
        paragraphs: {
          en: ['For thousands of years growth almost never lost, because it kept running the same chain: more people → more production → more consumption → more GDP. The whole credit system ultimately rests on there always being people to work, consume, pay taxes, and borrow. But if the birth rate stays below replacement (about 2.1 children per woman)[[3]] for a long time—fewer workers and borrowers, but more retirees and welfare spending[[6]]—does that chain start to loosen?', 'Don\'t rush the conclusion, because one variable can rewrite the whole chain—AI. We used to assume GDP ≈ people × productivity per person; if AI multiplies one person\'s output many times over[[5]], the formula becomes GDP ≈ people × (AI-amplified productivity). As long as the multiplier climbs faster than population falls, fewer people need not mean a weaker economy. So whether low birth rates break the system is an open question with no answer yet.', 'AI is two sides of one coin. Zoomed out, it may rescue growth; zoomed in, it tears open a gap: when one person can do the work of twenty, the other nineteen jobs disappear at the same moment. The pie has not shrunk, but the number of people who get a slice—who have income—has. The formula can save growth but not distribution, and it pushes an old question, buried under growth for centuries, back to center stage: how should wealth be divided?'],
          zh: ['几千年来增长几乎没输过，因为它一直走同一条链：更多人 → 更多生产 → 更多消费 → 更多 GDP。整套信用体系，最后都押在「未来一直有人去工作、消费、纳税、借钱」上。可如果出生率长期低于更替水平（约每名女性 2.1 个）[[3]]，未来干活和借钱的人变少，退休与福利支出却越来越多[[6]]，这条链会不会松掉？', '别急着下结论，因为有个可能改写整条链的变量——AI。过去我们默认 GDP ≈ 人口 × 每个人的生产力；如果 AI 把一个人的生产力放大很多倍[[5]]，公式就变成 GDP ≈ 人口 ×（被 AI 放大的生产力）。只要倍数涨得比人口跌得快，人少就未必等于经济差。所以少子化会不会让系统崩，是个还没答案的开放问题。', 'AI 是一枚硬币的两面。往大了看，它可能救了增长；往小了看，它同时撕开一道口子：一个人能顶二十个人，剩下十九个人的工作也在同一刻没了。蛋糕没变小，但能分到蛋糕、也就是有收入的人变少了。这个公式救得了增长，救不了分配——它把一个被增长盖了几百年的老问题重新推到台面正中央：财富到底该怎么分。'],
        },
      },
      {
        title: { en: 'What counts as a real asset now', zh: '拆完之后：真正的资产是什么' },
        paragraphs: {
          en: ['Across history, the "unit of wealth" keeps upgrading: grain → gold → currency → credit → data → and maybe AI next. Each upgrade pushes the carrier of wealth one step closer to productive capacity itself. Follow that direction and future wealth may increasingly equal one thing: how much future productive capacity you can control.', 'Feel it another way: $10bn in cash versus a 100GW power plant, a million GPUs, or a million AI agents—which is worth more? Many AI companies have already answered with their actions; they are fighting over compute, not gold. Energy, compute, robots, AI, knowledge, organizational ability, trust, attention—these are the underlying assets. Money is just the tool that keeps their accounts afterward.', 'But there is a twist: if AI, robots, and energy all become nearly unlimited, the last truly scarce thing may circle back to people—not people as labor, but human experience, creation, trust, attention, and feeling. AI can copy almost everything, except actually living a life in your place.'],
          zh: ['人类历史上，「财富的单位」一直在升级：粮食 → 黄金 → 货币 → 信用 → 数据 → 也许下一站是 AI。每升级一次，都是把财富的载体往「更接近生产能力本身」推一步。顺着看，未来的财富可能越来越等于一件事：你能控制多少未来的生产能力。', '换个方式感受：100 亿现金和一座 100GW 电厂、100 万块 GPU、100 万个 AI Agent 比，哪个更值钱？很多 AI 公司已经用行动回答——它们抢的是算力，不是黄金。能源、算力、机器人、AI、知识、组织能力、信任、注意力，这些才是底层资产，钱只是事后给它们记账的工具。', '但这里有个反转：如果未来 AI、机器人、能源都近乎无限，最后真正稀缺的，可能又回到「人」——不是当劳动力的人，而是人的体验、创造、信任、注意力和情感。因为 AI 几乎能复制一切，唯独没办法替你真正地活一辈子。'],
        },
      },
      {
        title: { en: 'A posture, not a prediction', zh: '结尾：一种姿态，而不是预测' },
        paragraphs: {
          en: ['I am not going to hand over a clean verdict that future wealth will definitely be energy or compute. Two kinds of things live in this essay and should be kept apart: some are facts (how money is created, how debt circulates, population trends), and some are my extrapolation (that future wealth may lean toward energy, compute, or AI). Blending the two is exactly why so much "future prediction" fails to survive time.', 'And what I care about was never "will it blow up," but "what new system will it become." Institutions rarely wait for a full collapse before changing; more often they adjust the rules bit by bit—through inflation, debt restructuring, taxes, welfare, and monetary policy—slowly redistributing the pressure. First principles is not a prediction machine. It is a posture: take something you thought you understood, break it down until it cannot be broken further, and ask what is left.'],
          zh: ['我不打算给一个干脆的结论说未来财富一定是能源还是算力。文章里有两种东西要分清：有些是事实（货币怎么被造出来、债怎么转、人口趋势），有些是我的推演（未来财富可能更偏能源、算力或 AI）。把两者搅在一起，正是很多「预测未来」经不起时间检验的原因。', '而且我在意的从来不是「会不会爆」，而是「会变成什么样的新系统」。制度很少等到彻底崩了才改，它更常一点点调规则——靠通胀、债务重组、税制、福利、货币政策，把压力慢慢重新分出去。第一性原理不是预测机器，它是一种姿态：把你以为早就懂的东西拆到不能再拆，然后问一句——它还剩下什么。'],
        },
      },
    ],
  },
  {
    slug: 'turn-chaos-into-systems',
    title: { en: 'Turn chaos into systems', zh: '把混乱变成系统' },
    summary: {
      en: 'The point of a system is not to look sophisticated. It is to make the same confusion unnecessary the second time.',
      zh: 'System 不是为了显得复杂。它真正的价值，是让同一种混乱不需要发生第二次。',
    },
    category: { en: 'System thinking', zh: '系统思考' },
    thesis: {
      en: 'Automation is not the value. Removing repeated confusion is the value.',
      zh: 'Automation 不是价值。减少重复的混乱，才是价值。',
    },
    sources: ['数字会说话', '营销管理', '商弈'],
    sections: [
      {
        title: { en: 'The same fire should not need saving twice', zh: '同样的火，不应该救第二次' },
        paragraphs: {
          en: ['I used to think capable people knew more, reacted faster, and could answer anything immediately. Building dashboards, products, and AI changed that view.', 'Real capability is not endless firefighting. It is turning a repeated problem into a rule, a workflow, or a boundary so the same fire does not return.'],
          zh: ['我以前会觉得，厉害的人就是知道很多、反应很快、什么问题都能马上回答。后来做 Dashboard、product 和 AI，我才发现，不是这样。', '真正厉害的不是一直救火。是把重复出现的问题变成规则、workflow 或 boundary，让同样的火不需要再救第二次。'],
        },
      },
      {
        title: { en: 'Separate input, judgment, and action', zh: '先分开输入、判断与行动' },
        paragraphs: {
          en: ['Messy work usually mixes three things together: what enters the system, how it is judged, and what action should follow.', 'A spreadsheet is not always messy because of Excel. Sometimes every person simply means something different when they use the same number. A team that keeps asking questions may not be weak; the system may never have explained what happened, why it matters, and what comes next.'],
          zh: ['很多工作看起来很乱，其实只是三个东西没有被分开：输入是什么，中间用什么规则判断，最后要产生什么行动。', 'Excel 很乱，不一定是 Excel 的问题。可能是每个人对同一个数字有不同定义。团队一直追问，也不一定是他们不会。可能是 system 从来没有告诉他们：发生了什么、为什么发生、下一步应该做什么。'],
        },
      },
      {
        title: { en: 'Where a system should appear', zh: 'System 应该出现在哪里' },
        paragraphs: {
          en: ['Look for work that repeats daily, judgment that depends on one person remembering, information nobody understands after its owner leaves, and mistakes that should only happen once.', 'A good system keeps complexity inside and gives clarity to the person outside. It should let people spend less attention on unimportant repetition and more on the judgment that still needs a human.'],
          zh: ['我现在会找四种地方：每天都在重复的动作、只能靠某个人记得的判断、人一离开就没人看得懂的资料，以及理论上不该发生第二次的错误。', '好的 system 会把复杂留在里面，把清楚交给外面的人。它让人少想一点不重要的重复，把注意力留给真正需要判断的地方。'],
        },
      },
    ],
  },
  {
    slug: 'judgment-is-not-more-information',
    title: { en: 'Judgment is not knowing more', zh: '判断不是知道更多' },
    summary: {
      en: 'More data does not automatically produce a better decision. Often the missing piece is deciding what matters.',
      zh: '更多 data 不会自动带来更好的决定。很多时候缺的不是资料，而是先决定什么才重要。',
    },
    category: { en: 'Data & judgment', zh: '数据与判断' },
    thesis: {
      en: 'Information tells you what happened. Judgment decides what you are willing to trade next.',
      zh: 'Information 告诉你发生了什么。Judgment 决定你接下来愿意牺牲什么。',
    },
    sources: ['数字会说话', '薛兆丰的经济学讲义', '营销管理'],
    sections: [
      {
        title: { en: 'The “so what?” problem', zh: '那个 So what 的问题' },
        paragraphs: {
          en: ['Data creates an easy illusion: one more chart, one more metric, and the answer will appear. But a dashboard can hold a hundred numbers and still leave the user asking, “So what?”', 'Numbers show that something moved. Judgment places that movement inside context. A sales drop might come from traffic, conversion, stock, seasonality, or an unusually strong previous month.'],
          zh: ['Data 很容易让人产生一种错觉：只要再多看一点，就会更接近答案。但 dashboard 可以放一百个数字，用户最后还是会问：So what？', '数字只能告诉你某个东西发生了变化。真正的判断，是把这个变化放进 context。Sales 掉了，可能是流量、conversion、库存、淡季，甚至只是上个月刚好太好。'],
        },
      },
      {
        title: { en: 'Four questions behind a number', zh: '一个数字后面的四个问题' },
        paragraphs: {
          en: ['Ask what it is compared with, why it changed, who is affected, and whether it deserves action now.', 'Good analysis does not deliver the most information. It shortens the distance between seeing and deciding.'],
          zh: ['看到一个数字，至少要问四件事：跟谁比、为什么变、影响谁，以及现在值得行动还是继续观察。', '好的分析不是给最多 information。它是帮人缩短从「看到」到「决定」之间的距离。'],
        },
      },
      {
        title: { en: 'A small decision format', zh: '一个很小的判断格式' },
        paragraphs: {
          en: ['Write four lines: Signal — what changed? Context — why does it matter? Trade-off — what will action cost? Next move — what is the smallest safe step?', 'If those four lines are impossible to write, more data may not be the answer. The problem itself may still be unclear.'],
          zh: ['我会先写四句话：Signal，什么变了？Context，为什么值得注意？Trade-off，行动会牺牲什么？Next move，现在最小、最安全的下一步是什么？', '如果四句话写不出来，可能还不需要更多 data。可能只是问题本身还没想清楚。'],
        },
      },
    ],
  },
  {
    slug: 'human-nature-is-a-design-condition',
    title: { en: 'Human nature is a design condition', zh: '人性不是借口，是设计条件' },
    summary: {
      en: 'People forget, protect themselves, and take easier paths. Good systems are designed for those realities, not ideal users.',
      zh: '人会忘记、保护自己，也会走比较容易的路。好的 system 应该设计在这些现实上。',
    },
    category: { en: 'Human systems', zh: '人与系统' },
    thesis: {
      en: 'Do not design a system that only ideal people can use correctly.',
      zh: '不要设计一个只有理想中的人才会用对的 system。',
    },
    sources: ['人性的弱点', '商弈', '七个习惯'],
    sections: [
      {
        title: { en: 'Blaming people is not a design', zh: '怪人，不是一种设计' },
        paragraphs: {
          en: ['Management language often sounds like this: the employee is not proactive, the user has no patience, the team cannot execute. These statements may be true, but they do not solve anything.', 'When the same failure repeats, blaming the person is often a way to avoid designing the system.'],
          zh: ['做 management 的时候，我们很喜欢说：这个人不够主动、那个用户没有耐心、这个团队执行力不行。可能都是真的，但没有什么用。', '如果一个问题会不断重复，单纯怪人，通常只是在逃避 system design。'],
        },
      },
      {
        title: { en: 'Design for real behavior', zh: '设计在真实行为上' },
        paragraphs: {
          en: ['People forget, protect their status, follow the easier path, and copy others under uncertainty. These are not bugs. They are operating conditions.', 'An unclear button produces random clicks. Unclear ownership makes teams wait. Rewards based only on outcomes make people beautify numbers. Punishing every mistake teaches people to hide problems.'],
          zh: ['人会懒、会忘记、会保护自己、会选择比较容易的路，也会在不确定的时候跟着别人走。这些不是 bug，而是 operating condition。', '按钮不清楚，用户就会乱点。责任不清楚，团队就会互相等。奖励只看结果，人就会把数字做漂亮。犯错只会被骂，人就会开始隐藏问题。'],
        },
      },
      {
        title: { en: 'Four questions about behavior', zh: '关于行为的四个问题' },
        paragraphs: {
          en: ['What immediate benefit does the action give? What does the person fear losing? Which path is easiest? When something fails, does the system help correction or encourage concealment?', 'Understanding human nature is not permission to manipulate. It is a way to make fewer assumptions, blame less, and build something people can actually use.'],
          zh: ['我会问：这个动作对他有什么好处？他最怕失去什么？最容易走的路是哪一条？出错时，system 会帮助修正，还是鼓励隐藏？', '理解人性，不是为了 manipulate people。是为了少一点假设，少一点责怪，多一点真的可以用的设计。'],
        },
      },
    ],
  },
  {
    slug: 'win-before-you-fight',
    title: { en: 'Win before you fight', zh: '先胜后战' },
    summary: {
      en: 'Strategy is not about pushing harder. It is deciding which battlefield deserves your effort before you enter it.',
      zh: 'Strategy 不是教你怎样更用力，而是在进去之前先决定，哪个 battlefield 值得你用力。',
    },
    category: { en: 'Strategy', zh: '策略' },
    thesis: {
      en: 'Strategy does not teach you to push harder. It teaches you where effort is not worth spending.',
      zh: 'Strategy 不是教你怎样更用力。是教你哪里不值得用力。',
    },
    sources: ['孙子兵法', '厚黑学', '不完美人生经验法则'],
    sections: [
      {
        title: { en: 'Moving fast into a bad game', zh: '很快地走进一个烂局' },
        paragraphs: {
          en: ['Action is often confused with speed. I used to think the same way. Later I learned that some speed only gets you into a bad game faster.', 'Effective action is not a hard fight every time. Avoid starting when you are weakest, the other side is strongest, and the rules already work against you.'],
          zh: ['很多人把行动力理解成：想到就做，越快越好。我以前也会这样。后来才发现，有些快只是很快地走进一个烂局。', '真正有效的行动，不是每一次都 hard fight。是尽量不要在自己最弱、对方最强、规则又不利的时候开战。'],
        },
      },
      {
        title: { en: 'Define the win condition first', zh: '先定义什么叫赢' },
        paragraphs: {
          en: ['Before acting, ask what winning means, who set the battlefield rules, what resources each side controls, whether another entry exists, and how you leave if the worst case happens.', 'Proving yourself, defeating someone, and getting the result are three different goals. They may look similar, but they demand very different moves.'],
          zh: ['行动之前，先问：我真正要赢的是什么？规则是谁定的？双方有什么筹码？正面打不过有没有别的入口？最坏情况发生时怎么退？', '想证明自己、想赢过某个人、想拿到结果，是三个不同目标。看起来很像，却会导向完全不同的动作。'],
        },
      },
      {
        title: { en: 'Six moves, not two', zh: '不是只有打与不打' },
        paragraphs: {
          en: ['A situation offers at least six moves: fight directly, go around, delay, retreat, change the field, or form an alliance.', 'The highest-risk mistake is fighting a battle with no upside just to prove courage. Maturity is not winning every fight. It is knowing which fight deserves to become yours.'],
          zh: ['一个局至少有六种动作：正打、绕打、拖、退、换场、结盟。不是只有「打」和「不打」。', '最危险的动作，是为了证明自己勇敢，在一个没有 upside 的地方硬碰。成熟不是每一场都赢，而是越来越清楚，哪一场值得成为自己的战争。'],
        },
      },
    ],
  },
];

const publishedNotes = [
  ...siteEssayNotes.map((note) => ({
    title: note.title,
    summary: note.summary,
    category: note.category,
    href: `notes/${note.slug}`,
  })),
  {
    title: { en: 'Button feedback is part of the system', zh: '按钮反馈，本来就是系统的一部分' },
    summary: {
      en: 'Pressed, pending, accepted, blocked, and failed: what a realtime interface needs to say after a click.',
      zh: '按下、等待、接受、阻挡与失败：一个 realtime interface 在 click 之后应该说清楚什么。',
    },
    category: { en: 'Interaction', zh: '交互' },
    href: 'wiki/button-feedback',
  },
  {
    title: { en: 'Background music changes the room', zh: 'Background music 会改变一个房间' },
    summary: {
      en: 'Why optional sound can make a browser poker table feel shared, present, and alive.',
      zh: '为什么可控的声音，会让 browser poker table 更像一个大家真的在场的空间。',
    },
    category: { en: 'Experience', zh: '体验' },
    href: 'wiki/background-music',
  },
  {
    title: { en: 'Firebase as durable table memory', zh: '用 Firebase 留住牌桌的记忆' },
    summary: {
      en: 'Rooms, reconnects, public games, and cleanup logic behind a table that needs to remember.',
      zh: '房间、重连、公开游戏与 cleanup logic：一张需要记得事情的牌桌，是怎样被搭起来的。',
    },
    category: { en: 'Build note', zh: '构建笔记' },
    href: 'wiki/firebase-lifetime-storage',
  },
  {
    title: { en: 'The Vite skills that survived the build', zh: '真正留到最后的 Vite skills' },
    summary: {
      en: 'A practical release loop covering local development, routes, assets, environment values, and production checks.',
      zh: '从 local development、routes、assets、environment values 到 production checks 的实用 release loop。',
    },
    category: { en: 'Engineering', zh: '工程' },
    href: 'wiki/vite',
  },
];

const NotesPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';

  return (
    <div className="page-shell notes-page min-h-screen">
      <main className="notes-main">
        <div className="notes-island">
          <div className="notes-topbar">
            <a href={homeHref} className="notes-back-link">
              <ArrowLeft size={17} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection
              compactLanguageOnSelection
            />
          </div>

          <header className="notes-hero">
            <p className="notes-eyebrow">Notes by Eden</p>
            <h1>{isZh ? '一些值得留下来的想法' : 'Ideas worth keeping around'}</h1>
            <p className="notes-intro">
              {isZh
                ? '这里放我发布的文章、build notes，还有那些做着做着才想明白的东西。关于 product、AI、人的行为，以及怎样把混乱慢慢变成 system。'
                : 'Published essays, build notes, and the things I only understood after making them. About products, AI, human behavior, and turning messy realities into systems.'}
            </p>
          </header>

          <section className="notes-index" aria-labelledby="notes-index-title">
            <div className="notes-index-heading">
              <h2 id="notes-index-title">{isZh ? '已发布' : 'Published'}</h2>
              <span>{publishedNotes.length.toString().padStart(2, '0')}</span>
            </div>
            <div className="notes-list">
              {publishedNotes.map((note) => (
                <a key={note.href} className="notes-entry" href={joinBasePath(baseUrl, note.href)}>
                  <span className="notes-entry-category">{note.category[language]}</span>
                  <div>
                    <h3>{note.title[language]}</h3>
                    <p>{note.summary[language]}</p>
                  </div>
                  <span className="notes-entry-arrow" aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Split an essay paragraph on inline tokens and render each one:
//   [[n]]                     → a superscript citation that jumps to reference n
//                               (and carries an id so the reference can link back).
//   [[note:slug|display]]     → an internal link to another note (/notes/<slug>).
// Plain text segments are returned unchanged.
const renderEssayParagraph = (
  text: string,
  slug: string,
  language: Language,
  baseUrl: string,
  seenCites: Set<string>,
): React.ReactNode[] =>
  text.split(/(\[\[(?:note:[^\]]+|\d+)\]\])/g).map((part, index) => {
    const citeMatch = part.match(/^\[\[(\d+)\]\]$/);
    if (citeMatch) {
      const refId = citeMatch[1];
      // A reference may be cited more than once; only the first occurrence carries
      // the anchor id so ids stay unique and the reference's ↩ lands on first mention.
      const isFirst = !seenCites.has(refId);
      if (isFirst) seenCites.add(refId);
      return (
        <sup key={`cite-${index}`} className="notes-cite" {...(isFirst ? { id: `cite-${slug}-${refId}` } : {})}>
          <a href={`#ref-${slug}-${refId}`} aria-label={language === 'zh' ? `参考资料 ${refId}` : `Reference ${refId}`}>{refId}</a>
        </sup>
      );
    }
    const linkMatch = part.match(/^\[\[note:([^|\]]+)\|([^\]]+)\]\]$/);
    if (linkMatch) {
      const [, targetSlug, label] = linkMatch;
      return (
        <a key={`link-${index}`} className="notes-inline-link" href={joinBasePath(baseUrl, `notes/${targetSlug}`)}>{label}</a>
      );
    }
    return part;
  });

const SiteEssayNotePage: React.FC<{
  note: SiteEssayNote;
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ note, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const notesHref = joinBasePath(baseUrl, 'notes');
  // Tracks which reference numbers have been rendered, so repeated citations don't
  // emit duplicate anchor ids. Fresh per render (and per language switch).
  const citeSeen = new Set<string>();

  return (
    <div className="page-shell notes-article-page min-h-screen">
      <main className="notes-article-main">
        <div className="notes-article-island">
          <div className="notes-topbar">
            <a href={notesHref} className="notes-back-link">
              <ArrowLeft size={17} />
              {isZh ? '返回 Notes' : 'Back to Notes'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection
              compactLanguageOnSelection
            />
          </div>

          <header className="notes-article-hero">
            <div className="notes-article-mark notes-essay-mark" aria-hidden>ET</div>
            <p className="notes-eyebrow">{note.category[language]}</p>
            <h1>{note.title[language]}</h1>
            <p className="notes-article-deck">{note.summary[language]}</p>
            <div className="notes-article-sources" aria-label={isZh ? '来源书目' : 'Source books'}>
              {note.sources.map((source) => <span key={source}>{source}</span>)}
            </div>
            {note.originalSource && (
              <a
                className="notes-source-original"
                href={resolveAssetPath(baseUrl, note.originalSource.url)}
                target="_blank"
                rel="noopener"
              >
                {note.originalSource.label[language]}
                <span aria-hidden> ↗</span>
              </a>
            )}
          </header>

          <article className="notes-article-body">
            <blockquote className="notes-article-thesis">
              <span>Core thesis</span>
              <p>{note.thesis[language]}</p>
            </blockquote>
            <div className="notes-article-sections">
              {note.sections.map((section, index) => (
                <section key={section.title.en} className="notes-article-section">
                  <div className="notes-article-section-number">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h2>{section.title[language]}</h2>
                    <div className="notes-article-points">
                      {section.paragraphs[language].map((paragraph) => <p key={paragraph}>{renderEssayParagraph(paragraph, note.slug, language, baseUrl, citeSeen)}</p>)}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </article>

          {note.references && note.references.length > 0 && (
            <section className="notes-article-references" aria-label={isZh ? '参考资料' : 'References'}>
              <h2>{isZh ? '参考资料' : 'References'}</h2>
              <ol>
                {note.references.map((ref) => (
                  <li key={ref.id} id={`ref-${note.slug}-${ref.id}`}>
                    <span className="notes-ref-body">
                      {ref.label[language]}{' '}
                      <a className="notes-ref-link" href={ref.url} target="_blank" rel="noopener">{isZh ? '查看来源' : 'Source'} ↗</a>
                    </span>
                    <a className="notes-ref-back" href={`#cite-${note.slug}-${ref.id}`} aria-label={isZh ? '返回正文' : 'Back to text'}>↩</a>
                  </li>
                ))}
              </ol>
              <p className="notes-ref-note">
                {note.referencesNote
                  ? note.referencesNote[language]
                  : (isZh
                    ? '以上是文章「事实」部分的来源；文中的判断与推演仅代表作者个人观点。'
                    : 'These are the sources for the factual claims; any judgments and extrapolations are the author\'s own view.')}
              </p>
            </section>
          )}

          <footer className="notes-article-footer">
            <p>{isZh ? '继续阅读 Eden 的文章与 build notes' : "Keep reading Eden's essays and build notes"}</p>
            <a href={notesHref}>{isZh ? '回到全部 Notes' : 'View all Notes'} <span aria-hidden>→</span></a>
          </footer>
        </div>
      </main>
    </div>
  );
};

const iconPromptProducts = [
  {
    id: 'etreporthub',
    name: 'ETReportHub',
    color: '#176B87',
    style: 'precise geometric line icons, consistent 2px rounded strokes, transparent background, deep ocean blue #176B87, warm white #F5F3EF, and one restrained sunset-orange #E8683A signal accent; analytical, calm, reliable, operational',
    batches: [
      ['Product facts', ['operations team reviewing one shared dashboard', 'spreadsheet entering through an import arrow', 'local database cylinder with a small home marker', 'dashboard connected to a CRM user profile']],
      ['Core capabilities', ['two daily spreadsheets merging into one organized system tray', 'business trend line with one highlighted change signal', 'member profile with a precise action target', 'dashboard transforming into a clean exported spreadsheet']],
      ['Daily workflow', ['uploading an Excel sheet', 'two mismatched data rows reconciling into one checked row', 'dashboard signal resolving into one decision arrow', 'selected CRM audience moving into an outbound action']],
      ['System layer', ['database protected by a clear local-data boundary', 'three stacked layers for input, database, and dashboard', 'interactive demo window with a cursor', 'launch action connecting a dashboard to an operating team']],
    ],
  },
  {
    id: 'jiju',
    name: 'Jiju',
    color: '#388E63',
    style: 'warm organic line icons, consistent 2px rounded strokes, transparent background, sage green #388E63, charcoal #343633, and a small sunlight-yellow #F0C96A accent; friendly, trustworthy, curious, calm',
    batches: [
      ['Product facts', ['Penang island coastline with one location marker', 'curved discovery path leading to a place', 'cat silhouette combined with a profile card', 'location marker inside an open memory book']],
      ['Core capabilities', ['cat following a path toward a discovered place', 'verified location marker with a small pet silhouette', 'pet silhouette beside a saved visit photo', 'three pet-and-human profiles connected around one location']],
      ['Outing workflow', ['magnifying lens revealing a pet-friendly place', 'place card with verified pet-policy indicators', 'person and pet moving together toward a location', 'bookmarked place connected to a pet memory card']],
      ['Trust system', ['pet profile protected inside a soft shield', 'three connected layers for place data, pet identity, and visit memory', 'interactive local-discovery map with a cursor', 'open-door destination welcoming a person and pet']],
    ],
  },
  {
    id: 'poker',
    name: 'Friday Poker Club',
    color: '#176447',
    style: 'confident geometric line icons, consistent 2px rounded strokes, transparent background, dark table green #176447, warm cream #F1EDE3, charcoal #111B18, and restrained muted red #C95B55 accents; private home game, familiar group ritual, never casino-like',
    batches: [
      ['Product facts', ['four seat markers around a private oval table', 'two understated Hold’em cards at the table center', 'four table positions connected by a realtime sync signal', 'browser window containing a small poker table']],
      ['Private-game design', ['private link transforming into a poker table', 'four familiar friend profiles around one shared table', 'confirmed poker action with a visible turn indicator', 'speech bubble and memory marker beside the table']],
      ['Table workflow', ['highlighted host seat controlling a four-seat table', 'private invite link moving toward three friends', 'play-chip stack moving toward one empty seat with no currency symbol', 'story card containing a table and four friend markers']],
      ['Room system', ['private table enclosed by a boundary and small lock', 'three stacked layers for room, realtime table, and shared memory', 'interactive browser table with a cursor', 'open table with an invitation arrow bringing the crew back']],
    ],
  },
] as const;

const buildFourGridPrompt = (product: typeof iconPromptProducts[number], batch: typeof product.batches[number]) => `Create one cohesive 2×2 icon sheet for ${product.name}.

The sheet must contain exactly four separate icons:
1. ${batch[1][0]}
2. ${batch[1][1]}
3. ${batch[1][2]}
4. ${batch[1][3]}

Visual system: ${product.style}.

Layout requirements: arrange the four icons in a precise 2×2 grid with equal cell sizes and generous spacing. Each icon must be centered, fully visible, isolated, and easy to crop into an individual square asset. Keep identical scale, stroke width, corner radius, spacing, and visual weight across all four cells. No dividers and no surrounding card or app-icon container.

Output requirements: transparent background, flat vector-quality rendering, crisp edges, readable at 32px and 48px, no text, letters, numbers, labels, emoji, watermark, gradients, glow, glass effect, 3D rendering, or excessive detail.`;

const iconPromptPreviewIcons: Record<string, React.ElementType[][]> = {
  etreporthub: [
    [UserRound, Download, Database, TrendingUp],
    [Download, TrendingUp, SearchCheck, ExternalLink],
    [Download, GitBranch, ArrowRight, Send],
    [Database, Layers, ExternalLink, UserRound],
  ],
  jiju: [
    [MapPin, Search, UserRound, Bookmark],
    [Search, SearchCheck, Bookmark, UserRound],
    [Search, SearchCheck, MapPin, Bookmark],
    [UserRound, Layers, ExternalLink, MapPin],
  ],
  poker: [
    [UserRound, Layers, GitBranch, Play],
    [ExternalLink, UserRound, MessageSquare, Bookmark],
    [SlidersHorizontal, Send, Plus, MessageSquare],
    [GitBranch, Layers, ExternalLink, Play],
  ],
};

const iconPromptProductNotes: Record<string, string> = {
  etreporthub: 'Operational clarity · data movement · decision signals',
  jiju: 'Local discovery · pet identity · trusted memories',
  poker: 'Private ritual · familiar crew · shared table moments',
};

type ProjectAppEntry = {
  id: string;
  name: string;
  href: string;
  caption: Record<Language, string>;
  Icon: React.FC<{ label: string }>;
};

const ProjectHomePage: React.FC<{
  homeHref: string;
  jijuHref: string;
  pokerHref: string;
  etReportHubHref: string;
  filmGalleryHref: string;
  conwayHref: string;
  penneyHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({
  homeHref,
  jijuHref,
  pokerHref,
  etReportHubHref,
  filmGalleryHref,
  conwayHref,
  penneyHref,
  language,
  setLanguage,
  themePreference,
  theme,
  setThemePreference,
}) => {
  const isZh = language === 'zh';
  const projectApps: ProjectAppEntry[] = [
    {
      id: 'jiju',
      name: 'Jiju',
      href: jijuHref,
      caption: { en: 'Local discovery', zh: '本地发现' },
      Icon: ProjectsJijuCssIcon,
    },
    {
      id: 'poker',
      name: 'Friday Poker Club',
      href: pokerHref,
      caption: { en: 'Private table', zh: '私人牌局' },
      Icon: ProjectsPokerCssIcon,
    },
    {
      id: 'etreporthub',
      name: 'ETReportHub',
      href: etReportHubHref,
      caption: { en: 'Daily data layer', zh: '每日数据层' },
      Icon: ProjectsEtReportCssIcon,
    },
    {
      id: 'film-gallery',
      name: 'Film Gallery',
      href: filmGalleryHref,
      caption: { en: 'Film archive', zh: '胶片档案' },
      Icon: FilmGalleryCssIcon,
    },
    {
      id: 'conways-game-of-life',
      name: "Conway's Game of Life",
      href: conwayHref,
      caption: { en: 'Cellular automata', zh: '细胞自动机' },
      Icon: ProjectsCrmCssIcon,
    },
    {
      id: 'penneys-game',
      name: "Penney's Game",
      href: penneyHref,
      caption: { en: 'Non-transitive odds', zh: '非传递概率' },
      Icon: PenneyCoinCssIcon,
    },
  ];

  return (
    <div className="page-shell project-home-page">
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={homeHref} className="project-home-back inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} />
          {isZh ? '返回主页' : 'Back home'}
        </a>
        <HeaderControls
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      </nav>

      <main className="project-home-main">
        <header className="project-home-hero">
          <p className="project-home-kicker">{isZh ? '作品 · Projects' : 'Work · Projects'}</p>
          <h1>{isZh ? '打开任何一个 app。' : 'Open any app.'}</h1>
          <p className="project-home-lede">
            {isZh
              ? '每一个图标都是一个真的做出来、还在跑的东西。点进去看它在解决什么问题。'
              : 'Every icon is something real that got built and still runs. Tap one to see the problem it solves.'}
          </p>
        </header>

        <section className="project-home-grid" aria-label={isZh ? '项目 app 列表' : 'Project apps'}>
          {projectApps.map((app) => (
            <a key={app.id} className="project-home-app" href={app.href} title={app.name}>
              <span className="project-home-app-icon">
                <app.Icon label={isZh ? `${app.name} CSS app 图标` : `${app.name} CSS app icon`} />
              </span>
              <span className="project-home-app-name">{app.name}</span>
              <span className="project-home-app-caption">{app.caption[language]}</span>
            </a>
          ))}
        </section>

        <nav className="project-home-dock" aria-label={isZh ? '快捷入口' : 'Quick links'}>
          <a href={homeHref} className="project-home-dock-link">{isZh ? '主页' : 'Home'}</a>
          <a href={jijuHref} className="project-home-dock-link">{isZh ? '实验室' : 'Lab'}</a>
          <a href={`${homeHref}#about`} className="project-home-dock-link">{isZh ? '关于' : 'About'}</a>
        </nav>
      </main>
    </div>
  );
};

const IconPromptsPage: React.FC<{ homeHref: string }> = ({ homeHref }) => {
  const [copied, setCopied] = React.useState<string | null>(null);
  const [activeProductId, setActiveProductId] = React.useState(iconPromptProducts[0].id);
  const activeProduct = iconPromptProducts.find((product) => product.id === activeProductId) ?? iconPromptProducts[0];

  const writeToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const didCopy = document.execCommand('copy');
    textarea.remove();
    if (!didCopy) throw new Error('Clipboard unavailable');
  };

  const copyPrompt = async (id: string, prompt: string) => {
    try {
      await writeToClipboard(prompt);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => current === id ? null : current), 1600);
    } catch {
      setCopied(`error-${id}`);
      window.setTimeout(() => setCopied((current) => current === `error-${id}` ? null : current), 2200);
    }
  };

  const copyAllPrompts = () => {
    const promptSet = activeProduct.batches
      .map((batch, index) => `PROMPT ${index + 1} · ${batch[0].toUpperCase()}\n\n${buildFourGridPrompt(activeProduct, batch)}`)
      .join('\n\n────────────────────\n\n');
    copyPrompt(`${activeProduct.id}-all`, promptSet);
  };

  return (
    <div className="page-shell icon-prompts-page">
      <main><div className="icon-prompts-island">
        <header className="icon-prompts-hero">
          <a href={homeHref} className="icon-prompts-back"><ArrowLeft size={16} /> Back home</a>
          <p>Icon prompt studio</p>
          <h1>Design the system<br />before the icons.</h1>
          <span>三个产品，十二组四宫格 Prompt。先统一视觉语法，再让 agent 一次生成 4 枚可以直接拆分的产品图标。</span>
        </header>

        <nav className="icon-prompts-switcher" aria-label="Choose a product icon system">
          <div className="icon-prompts-tabs" role="tablist" aria-label="Products">
            {iconPromptProducts.map((product) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeProduct.id === product.id}
                aria-controls="active-icon-prompt-system"
                className={activeProduct.id === product.id ? 'is-active' : ''}
                key={product.id}
                style={{ '--tab-accent': product.color } as React.CSSProperties}
                onClick={() => setActiveProductId(product.id)}
              >
                <i aria-hidden />
                {product.name}
              </button>
            ))}
          </div>
          <button className="icon-prompts-copy-all" type="button" onClick={copyAllPrompts}>
            <Copy size={15} />
            {copied === `${activeProduct.id}-all` ? 'Copied all' : copied === `error-${activeProduct.id}-all` ? 'Copy failed' : 'Copy all four'}
          </button>
        </nav>

        <section
          id="active-icon-prompt-system"
          className="icon-prompts-product"
          style={{ '--prompt-accent': activeProduct.color } as React.CSSProperties}
        >
          <div className="icon-prompts-product-head">
            <div>
              <p>Selected product system</p>
              <h2>{activeProduct.name}</h2>
            </div>
            <span>{iconPromptProductNotes[activeProduct.id]}</span>
          </div>

          <div className="icon-prompts-grid">
            {activeProduct.batches.map((batch, index) => {
              const id = `${activeProduct.id}-${index}`;
              const prompt = buildFourGridPrompt(activeProduct, batch);
              const previewIcons = iconPromptPreviewIcons[activeProduct.id][index];
              return (
                <article className="icon-prompt-card" key={id}>
                  <div className="icon-prompt-card-head">
                    <span>0{index + 1}</span>
                    <h3>{batch[0]}</h3>
                    <button type="button" onClick={() => copyPrompt(id, prompt)} aria-label={`Copy ${batch[0]} prompt`}>
                      <Copy size={15} />
                      {copied === id ? 'Copied' : copied === `error-${id}` ? 'Try again' : 'Copy'}
                    </button>
                  </div>

                  <div className="icon-prompt-preview" aria-hidden>
                    {previewIcons.map((PreviewIcon, itemIndex) => (
                      <div className="icon-prompt-preview-cell" key={`${id}-preview-${itemIndex}`}>
                        <span>0{itemIndex + 1}</span>
                        <PreviewIcon size={38} strokeWidth={1.65} />
                      </div>
                    ))}
                  </div>

                  <ol>
                    {batch[1].map((item) => <li key={item}>{item}</li>)}
                  </ol>

                  <details className="icon-prompt-details">
                    <summary><span>View full production prompt</span><ArrowRight size={16} /></summary>
                    <pre>{prompt}</pre>
                  </details>
                </article>
              );
            })}
          </div>
        </section>
      </div></main>
    </div>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = React.useState<Language>(() => readStoredLanguage() ?? 'en');
  const [themePreference, setThemePreference] = React.useState<ThemePreference>(() => readStoredThemePreference());
  const [autoTheme, setAutoTheme] = React.useState<Theme>(() => resolveThemeFromLocalTime());

  React.useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  React.useEffect(() => {
    if (themePreference !== 'auto') return;
    const updateAutoTheme = () => setAutoTheme(resolveThemeFromLocalTime());
    updateAutoTheme();
    const intervalId = window.setInterval(updateAutoTheme, 60_000);
    const handleVisibilityChange = () => {
      if (!document.hidden) updateAutoTheme();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [themePreference]);

  const theme = themePreference === 'auto' ? autoTheme : themePreference;

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    } catch {
      // ignore
    }
  }, [theme, themePreference]);

  const isZh = language === 'zh';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const homeHref = baseUrl;
  const fullPageHref = joinBasePath(baseUrl, 'jiju-pet');
  const projectsHref = homeHref;
  const etReportHubHref = joinBasePath(baseUrl, 'etreporthub');
  const etReportHubSalesHref = joinBasePath(baseUrl, 'etreporthub-sales');
  const pokerHref = joinBasePath(baseUrl, 'poker');
  const filmGalleryHref = joinBasePath(baseUrl, 'film-gallery');
  const notesHref = joinBasePath(baseUrl, 'notes');
  const lifeHref = joinBasePath(baseUrl, 'life');
  const brandGuideHref = joinBasePath(baseUrl, 'brand-guide');
  const topicsHref = joinBasePath(baseUrl, 'topics');
  const conwayHref = joinBasePath(baseUrl, 'conways-game-of-life');
  const penneyHref = joinBasePath(baseUrl, 'penneys-game');
  const projectHomeHref = joinBasePath(baseUrl, 'project');
  const cellularAutomataLabHref = joinBasePath(baseUrl, 'cellular-automata-lab');
  const homeSystemFiles: Array<{
    title: string;
    copy: string;
    href: string;
    cta: string;
    visual?: 'jiju' | 'poker' | 'etreporthub' | 'crm';
  }> = isZh
    ? [
        {
          title: 'Jiju Knowledge System',
          copy: '把地点、场景和真实出门经验整理成可查询的本地发现系统。',
          href: fullPageHref,
          cta: '看 Jiju 复盘',
          visual: 'jiju',
        },
        {
          title: 'Friday Poker Club',
          copy: '给熟人局使用的浏览器牌桌，处理房间、邀请、买入和游戏流程。',
          href: pokerHref,
          cta: '看 Poker Club',
          visual: 'poker',
        },
        {
          title: 'ETReportHub',
          copy: '把每日 Excel、会员、渠道和趋势变成可复盘的运营数据层。',
          href: etReportHubHref,
          cta: '看 ETReportHub',
          visual: 'etreporthub',
        },
      ]
    : [
        {
          title: 'Jiju Knowledge System',
          copy: 'A local discovery system that turns places, scenes, and real outings into usable knowledge.',
          href: fullPageHref,
          cta: 'Read Jiju review',
          visual: 'jiju',
        },
        {
          title: 'Friday Poker Club',
          copy: 'A browser poker table for private games, with rooms, invites, buy-ins, and game flow.',
          href: pokerHref,
          cta: 'Open Poker Club',
          visual: 'poker',
        },
        {
          title: 'ETReportHub',
          copy: 'A daily-report data layer for Excel, members, channels, trends, and reviewable operations.',
          href: etReportHubHref,
          cta: 'Open ETReportHub',
          visual: 'etreporthub',
        },
      ];
  const homeInterestLinks: Array<{ title: string; href: string; visual?: 'bagua-mirror' | 'gramophone' | 'conway-magic-circle' | 'archive-evolution' }> = isZh
    ? [
        { title: 'Film Gallery', href: filmGalleryHref, visual: 'gramophone' },
        { title: 'Topic Board', href: topicsHref, visual: 'archive-evolution' },
        { title: 'Pattern Archive', href: 'https://edent95.github.io/8g/', visual: 'bagua-mirror' },
        { title: "Conway's Game of Life", href: conwayHref, visual: 'conway-magic-circle' },
      ]
    : [
        { title: 'Film Gallery', href: filmGalleryHref, visual: 'gramophone' },
        { title: 'Topic Board', href: topicsHref, visual: 'archive-evolution' },
        { title: 'Pattern Archive', href: 'https://edent95.github.io/8g/', visual: 'bagua-mirror' },
        { title: "Conway's Game of Life", href: conwayHref, visual: 'conway-magic-circle' },
      ];
  const currentPath = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/';
  const normalizedBase = normalizePath(baseUrl);
  const pathWithoutBase =
    normalizedBase !== '/' && currentPath.startsWith(normalizedBase)
      ? normalizePath(currentPath.slice(normalizedBase.length))
      : currentPath;

  React.useEffect(() => {
    if (pathWithoutBase !== '/analog-tech') return;
    const nextPath = joinBasePath(baseUrl, 'film-gallery');
    window.history.replaceState(
      window.history.state,
      '',
      `${nextPath}${window.location.search}${window.location.hash}`,
    );
  }, [baseUrl, pathWithoutBase]);

  const isJijuPetFullPage = pathWithoutBase === '/jiju-pet';
  const isJijuRevampFullPage = pathWithoutBase === '/jiju-revamp';
  const isProjectCssGalleryPage = pathWithoutBase === '/project-css';
  const isETReportHubFullPage = pathWithoutBase === '/etreporthub';
  const isETReportHubSalesPage = pathWithoutBase === '/etreporthub-sales';
  const isPokerFullPage = pathWithoutBase === '/poker';
  const wikiSlug = pathWithoutBase.startsWith('/wiki/')
    ? pathWithoutBase.replace('/wiki/', '')
    : '';
  const activeWikiEntry = wikiEntries.find((item) => item.slug === wikiSlug);
  const isWikiPage = pathWithoutBase === '/wiki' || Boolean(activeWikiEntry);
  const isFilmGalleryFullPage = pathWithoutBase === '/film-gallery' || pathWithoutBase === '/analog-tech';
  const siteEssaySlug = pathWithoutBase.startsWith('/notes/') ? pathWithoutBase.replace('/notes/', '') : '';
  const activeSiteEssay = siteEssayNotes.find((note) => note.slug === siteEssaySlug);
  const isNotesPage = pathWithoutBase === '/notes';
  const isLifeOsFullPage = pathWithoutBase === '/life-os';
  const isLifeFullPage = pathWithoutBase === '/life';
  const isBrandGuideFullPage = pathWithoutBase === '/brand-guide';
  const isTopicsFullPage = pathWithoutBase === '/topics';
  const isConwayGameOfLifeFullPage = pathWithoutBase === '/conways-game-of-life';
  const isPenneysGamePage = pathWithoutBase === '/penneys-game';
  const isCellularAutomataLabFullPage = pathWithoutBase === '/cellular-automata-lab';
  const isProjectHomePage = pathWithoutBase === '/project';
  const isIconPromptsPage = pathWithoutBase === '/icon-prompts';
  const archivedWorkSlug = pathWithoutBase.startsWith('/archive/')
    ? pathWithoutBase.replace('/archive/', '')
    : '';
  const activeArchivedWork = archivedWorks.find((item) => item.slug === archivedWorkSlug);
  const seoPath = pathWithoutBase === '/analog-tech' ? '/film-gallery' : pathWithoutBase;

  React.useEffect(() => {
    applyPageSeo(seoPath, language, activeArchivedWork);
  }, [seoPath, language, activeArchivedWork]);

  if (isJijuPetFullPage) {
    return (
      <JijuPetFullPage
        homeHref={homeHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isJijuRevampFullPage) {
    return (
      <JijuRevampFullPage
        homeHref={homeHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }


  if (isProjectCssGalleryPage) {
    return (
      <ProjectCssGalleryPage
        homeHref={homeHref}
        projectsHref={projectsHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isETReportHubFullPage) {
    return (
      <ETReportHubFullPage
        homeHref={homeHref}
        projectsHref={projectsHref}
        salesHref={etReportHubSalesHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isETReportHubSalesPage) {
    return (
      <ETReportHubSalesPage
        homeHref={homeHref}
        projectsHref={projectsHref}
        productHref={etReportHubHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isPokerFullPage) {
    return (
      <PokerFullPage
        homeHref={homeHref}
        projectsHref={projectsHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isWikiPage) {
    return (
      <WikiPage
        entry={activeWikiEntry}
        homeHref={homeHref}
        projectsHref={projectsHref}
        pokerHref={pokerHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }


  if (isFilmGalleryFullPage) {
    return (
      <FilmGalleryFullPage
        homeHref={homeHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (activeSiteEssay) {
    return (
      <SiteEssayNotePage
        note={activeSiteEssay}
        homeHref={homeHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isNotesPage) {
    return (
      <NotesPage
        homeHref={homeHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isLifeFullPage) {
    return (
      <LifeFullPage
        homeHref={homeHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isLifeOsFullPage) {
    return (
      <LifeOsFullPage
        homeHref={homeHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isBrandGuideFullPage) {
    return (
      <BrandGuideFullPage
        homeHref={homeHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isTopicsFullPage) {
    return (
      <GuestTopicsPage
        homeHref={homeHref}
        projectsHref={projectsHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isPenneysGamePage) {
    return (
      <PenneysGamePage
        isZh={isZh}
        homeHref={homeHref}
        conwayHref={conwayHref}
        controls={
          <HeaderControls
            language={language}
            setLanguage={setLanguage}
            themePreference={themePreference}
            theme={theme}
            setThemePreference={setThemePreference}
            compactThemeOnSelection
            compactLanguageOnSelection
          />
        }
      />
    );
  }

  if (isConwayGameOfLifeFullPage) {
    return (
      <ConwayGameOfLifeFullPage
        homeHref={homeHref}
        labHref={cellularAutomataLabHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isCellularAutomataLabFullPage) {
    return (
      <CellularAutomataLabFullPage
        homeHref={homeHref}
        conwayHref={conwayHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isProjectHomePage) {
    return (
      <ProjectHomePage
        homeHref={homeHref}
        jijuHref={fullPageHref}
        pokerHref={pokerHref}
        etReportHubHref={etReportHubHref}
        filmGalleryHref={filmGalleryHref}
        conwayHref={conwayHref}
        penneyHref={penneyHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isIconPromptsPage) {
    return <IconPromptsPage homeHref={homeHref} />;
  }

  if (activeArchivedWork) {
    return (
      <ArchivedWorkPage
        homeHref={homeHref}
        baseUrl={baseUrl}
        work={activeArchivedWork}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  return (
    <div className="page-shell eden-home">
      <nav className="eden-home-nav" aria-label="Primary navigation">
        <div className="eden-home-island eden-nav-inner">
          <a href={homeHref} className="eden-wordmark">Eden Tan</a>
          <div className="eden-nav-actions">
            <HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} compactThemeOnSelection compactLanguageOnSelection />
          </div>
        </div>
      </nav>

      <main>
        <motion.section className="eden-hero eden-home-island" initial="initial" animate="animate" variants={staggerContainer}>
          <motion.p variants={fadeIn} className="eden-eyebrow">EDEN · HUMAN SYSTEMS & PRODUCT</motion.p>
          <motion.h1 variants={fadeIn}>
            {isZh ? <><span>从混乱中</span><br /><span>建立系统</span></> : <><span>Build systems</span><br /><span>from chaos.</span></>}
          </motion.h1>
          <motion.p variants={fadeIn} className="eden-hero-copy">
            {isZh ? '我把复杂的人性、行为与现实问题，转化成可以被理解、验证和使用的数据、产品与 AI 系统。' : 'I turn complex human behavior and messy realities into useful products, data, and AI systems.'}
          </motion.p>
          <motion.div variants={fadeIn} className="eden-hero-actions">
            <a className="eden-button" href={projectHomeHref}>{isZh ? '探索我的作品' : 'Explore my work'}</a>
            <a className="eden-text-link" href={fullPageHref}>{isZh ? '进入我的个人实验室' : 'Enter my personal lab'} <span>→</span></a>
          </motion.div>
        </motion.section>

        <section className="eden-collage-section" id="work">
          <HomeCollage language={language} baseUrl={baseUrl} />
        </section>

        <section className="eden-about eden-home-island" id="about">
          <div className="eden-about-photo">
            <img
              src={joinBasePath(baseUrl, 'images/eden-environmental-portrait.jpg')}
              alt={isZh ? 'Eden 在暖色室内空间中的胶片环境人像' : 'Film portrait of Eden in a warm interior space'}
              loading="lazy"
            />
          </div>
          <div className="eden-about-copy">
            <p className="eden-section-label">01 · About Eden</p>
            <h2>{isZh ? <>嗨，我是 Eden</> : <>Hey, I’m Eden.</>}</h2>
            <div className="eden-about-body eden-about-body-compact">
              {isZh ? (
                <>
                  <p>大多数人收集知识。我收集模式。</p>
                  <p>我探索 AI、产品增长、营销、心理学、哲学和符号系统，是为了找到它们共同的结构。</p>
                  <p>我相信，复杂往往只是一个翻译问题。我的工作，是把散落的想法整理成清晰的系统——通过软件、AI 智能体、文章，以及 Jiju 这样的产品。</p>
                  <p>技术不是终点，而是一种语言，用来表达我们对现实更好的理解。</p>
                  <p>我建立框架，帮助人们更清楚地看见自己、自己的事业和这个世界。</p>
                  <p className="eden-about-now"><strong>因为一旦看见系统，你就能改变它。</strong></p>
                </>
              ) : (
                <>
                  <p>Most people collect knowledge. I collect patterns.</p>
                  <p>I explore AI, product growth, marketing, psychology, philosophy, and symbolic systems to find the structures they share.</p>
                  <p>I believe complexity is often a translation problem. My work turns scattered ideas into clear systems—through software, AI agents, essays, and products like Jiju.</p>
                  <p>Technology is not the destination. It is a language for expressing better models of reality.</p>
                  <p>I build frameworks that help people see themselves, their businesses, and the world more clearly.</p>
                  <p className="eden-about-now"><strong>Because once you can see the system, you can change it.</strong></p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="eden-footer"><div className="eden-home-island"><div><strong>EDEN</strong><p>Building systems for people, products, and uncertain futures.</p></div><div className="eden-footer-links"><a href="mailto:hello@edentan.site">Email</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/edent95" target="_blank" rel="noreferrer">GitHub</a><a href={notesHref}>Notes</a></div></div></footer>
    </div>
  );
};

export default App;
