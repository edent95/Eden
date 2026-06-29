/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { applyPageSeo } from './seo';
import type { CssArtComponent } from './components/css-art/index';
import {
  elementalIconCssArtItems,
  getProjectCssArtByProjectTitle,
  homeInterestCssArtItems,
  homeSystemCssArtItems,
  officeIconCssArtItems,
  projectCssArtItems,
} from './css-art.registry';
import {
  HomeArchiveEvolutionTotem,
  HomeBaguaMirrorTotem,
  HomeGramophoneTotem,
  HomeJijuCatScene,
  HomeLifeMagicIcon,
  HomePowerUpTotem,
  HomeProjectsBlueprintIcon,
  HomePyramidBreakTotem,
  ProjectsJijuCssIcon,
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

const analogTechGalleryPhotos = [
  {
    src: '/analog-tech/analog-tech-1.png',
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
    src: '/analog-tech/analog-tech-2.png',
    alt: { en: 'Hazy city skyline on film, layered grays and blues', zh: '胶片中的城市天际线，灰蓝层次' },
    caption: {
      en: 'Humid air over the city—haze and distance rendered as believable, restrained tones.',
      zh: '城市上空的湿气与距离，被胶片压成克制、可信的灰与蓝。',
    },
  },
  {
    src: '/analog-tech/analog-tech-3.png',
    alt: { en: 'Tall building on film, glass catching a sliver of light', zh: '高塔与玻璃上一道细光' },
    caption: {
      en: 'A vertical study: weight, edge, and a thin strip of light along glass.',
      zh: '竖向的体量与边线，玻璃上的一条薄光把材质说清楚。',
    },
  },
  {
    src: '/analog-tech/analog-tech-4.png',
    alt: { en: 'Calm waterfront, soft highlights on open water', zh: '平静水面与细碎高光' },
    caption: {
      en: 'Open water, small speculars, and a horizon line that gives the eye a place to rest.',
      zh: '开阔水面、细碎高光，与一条让视线能落稳的水平线。',
    },
  },
  {
    src: '/analog-tech/analog-tech-5.png',
    alt: { en: 'Film frame with a gentle light leak along the edge of the scene', zh: '画缘一道柔和的漏光' },
    caption: {
      en: 'A light leak that reads like a mark of process—kept, not “fixed out.”',
      zh: '漏光像流程留下的签名：保留，而不是当成失误修掉。',
    },
  },
  {
    src: '/analog-tech/analog-tech-6.png',
    alt: { en: 'Ornate temple details softened by emulsion grain', zh: '庙宇细部在颗粒中变得可信' },
    caption: {
      en: 'Carving and shadow held in grain: detail that would go plastic if over-sharpened.',
      zh: '雕刻与阴影像嵌在乳剂里，过度锐化才会显“塑料”。',
    },
  },
  {
    src: '/analog-tech/analog-tech-7.png',
    alt: { en: 'Mountain haze, long tonal gradients in the distance', zh: '远山与漫开的空气感' },
    caption: {
      en: 'Atmosphere over drama—distance carried by long, quiet tonal ramps.',
      zh: '不追求戏剧性，靠长调子把远距托成可感的空气。',
    },
  },
  {
    src: '/analog-tech/analog-tech-8.png',
    alt: { en: 'Coastal view of a city, modest color separation on film', zh: '海岸线上的城市，色彩关系克制' },
    caption: {
      en: 'A coastal read of the city, color kept modest and believable in mixed light.',
      zh: '混合光里读海岸城市，色彩不抢戏，但站得住。',
    },
  },
  {
    src: '/analog-tech/analog-tech-9.png',
    alt: { en: 'Open horizon where sea and sky meet under heavy clouds', zh: '重云下海天相接的开阔线' },
    caption: {
      en: 'A simple split between water and weather—room left for the eye to move.',
      zh: '水与天的交界故意留到最简，好让视线有路可走。',
    },
  },
  {
    src: '/analog-tech/analog-tech-10.png',
    alt: { en: 'Geometric city scene, bicycle as a clear visual anchor', zh: '城市几何，单车作视觉锚点' },
    caption: {
      en: 'Geometry in the block: a wheel, a line, a center that orders the rest of the frame.',
      zh: '街区里的几何：一轮、一线，用清晰的重心把余下元素收住。',
    },
  },
  {
    src: '/analog-tech/analog-tech-11.png',
    alt: { en: 'Candid people by the sea, unposed', zh: '水边未加导演的日常一瞬' },
    caption: {
      en: 'A candid exchange at the water’s edge—ordinary, and meant to stay that way.',
      zh: '水边的寻常交谈，刻意保留不必“升格”的平凡。',
    },
  },
];

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
  {
    eyebrow: { en: 'AI Build System', zh: 'AI 构建系统' },
    title: 'CRM Intelligence System',
    status: { en: 'In design', zh: '设计中' },
    role: { en: 'Retention and member workflow layer', zh: '留存与会员工作流层' },
    summary: {
      en: 'A CRM layer going on top of the reporting data: member segments, retention signals, follow-up queues, channel context, and AI helping the operator figure out the next move.',
      zh: '正在往报表数据上面搭的 CRM 层：会员分群、留存信号、跟进队列、渠道语境，还有 AI 帮运营想下一步该干嘛。',
    },
    system: {
      en: 'Member segmentation, risk signals, retention tasks, CRM export logic, operator next-action workflow.',
      zh: '会员分群、风险信号、留存任务、CRM 导出逻辑和运营下一步行动工作流。',
    },
    href: 'crm',
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
  { label: { en: 'After RM960/month fee', zh: '扣除 RM960/月后' }, value: 'RM1,765' },
  { label: { en: '3-month net impact estimate', zh: '3 个月净影响估算' }, value: 'RM5,295' },
  { label: { en: 'RM19,888 buyout estimated payback', zh: '买断 RM19,888 估算回本时间' }, value: { en: 'About 7.3 months', zh: '约 7.3 个月' } },
] as const;

const etReportHubPricing = [
  {
    name: { en: 'Monthly System Access', zh: '月费系统使用' },
    price: 'RM960',
    suffix: { en: '/ month', zh: ' / 月' },
    bestFor: {
      en: 'Minimum 3 months. First term RM2,880. Best for teams that want to validate impact with real data before long-term commitment.',
      zh: '最少 3 个月，首期 RM2,880。适合想先用真实数据验证效果，再决定长期方案的团队。',
    },
    points: {
      en: ['Private deployment, basic training, and daily reporting workflow', 'Can cover ongoing maintenance, updates, and support', 'Suitable for multi-brand or multi-channel operating teams'],
      zh: ['包含私有部署、基础培训和日常报表流程', '可作为持续维护、更新和支持费用', '适合多品牌/多渠道持续运营团队'],
    },
  },
  {
    name: { en: 'Buyout Deployment', zh: '买断部署' },
    price: 'RM19,888',
    suffix: { en: ' one-time', zh: ' 一次性' },
    bestFor: {
      en: 'Best for BO teams confirmed to use it every day. Equal to about 20.7 months of monthly fee.',
      zh: '适合已经确认每天都会使用的 BO 团队。大约等于 20.7 个月月费。',
    },
    points: {
      en: ['One-time system usage buyout for stable long-term customers', 'Average cost drops the longer the customer uses it', 'Optional maintenance / upgrade / support retainer can be added'],
      zh: ['一次买断系统使用权，适合长期稳定客户', '客户长期使用，平均成本逐月下降', '可另配维护 / 升级 / support retainer'],
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
    q: { en: 'Is RM960/month only for software access?', zh: 'RM960/月只是软件使用费吗？' },
    a: {
      en: 'It is positioned as system access plus practical workflow refinement. Exact support boundaries can be confirmed based on data volume, hosting, and team process.',
      zh: '它的定位是系统使用加上实际流程微调。具体 support 边界可以根据数据量、hosting 和团队流程再确认。',
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

const lifeOsIcons = {
  windInfiltration: '/life-os-icons/wind-infiltration.png',
  abstractionEngine: '/life-os-icons/abstraction-engine.png',
  humanPatternScan: '/life-os-icons/human-pattern-scan.png',
  environmentalRewrite: '/life-os-icons/environmental-rewrite.png',
  narrativeAlchemy: '/life-os-icons/narrative-alchemy.png',
  controlledChaos: '/life-os-icons/controlled-chaos.png',
  wandererInstinct: '/life-os-icons/wanderer-instinct.png',
  antiRoutineSystem: '/life-os-icons/anti-routine-system.png',
  socialMirror: '/life-os-icons/social-mirror.png',
  patternMemory: '/life-os-icons/pattern-memory.png',
  boredomDecay: '/life-os-icons/boredom-decay.png',
  overInsight: '/life-os-icons/over-insight.png',
  unfinishedQuestLoop: '/life-os-icons/unfinished-quest-loop.png',
  authorityResistance: '/life-os-icons/authority-resistance.png',
  systemDesign: '/life-os-icons/system-design.png',
  ruleSetterPhase: '/life-os-icons/rule-setter-phase.png',
} as const;

const lifeOsActiveSkillIcons = {
  galeclawSigil: '/life-os-icons/active-galeclaw-sigil.png',
  moonCodexLoom: '/life-os-icons/active-moon-codex-loom.png',
  catsEyeScan: '/life-os-icons/active-cats-eye-scan.png',
  territoryRuneRewrite: '/life-os-icons/active-territory-rune-rewrite.png',
  storyCauldronAlchemy: '/life-os-icons/active-story-cauldron-alchemy.png',
  nineLivesChaosStep: '/life-os-icons/active-nine-lives-chaos-step.png',
} as const;

const lifeOsModuleIcons = {
  softInfiltrationStyle: '/life-os-module-icons/soft-infiltration-style.png',
  ruleSetterPhase: '/life-os-module-icons/rule-setter-phase.png',
  explorerDrive: '/life-os-module-icons/explorer-drive.png',
  lightBladeBuild: '/life-os-module-icons/light-blade-build.png',
  bodyResponseEngine: '/life-os-module-icons/body-response-engine.png',
  chaosCompressionEngine: '/life-os-module-icons/chaos-compression-engine.png',
  wandererInstinct: '/life-os-module-icons/wanderer-instinct.png',
  antiRoutineSystem: '/life-os-module-icons/anti-routine-system.png',
  socialMirror: '/life-os-module-icons/social-mirror.png',
  patternMemory: '/life-os-module-icons/pattern-memory.png',
  boredomDecay: '/life-os-module-icons/boredom-decay.png',
  overInsight: '/life-os-module-icons/over-insight.png',
  unfinishedQuestLoop: '/life-os-module-icons/unfinished-quest-loop.png',
  authorityResistance: '/life-os-module-icons/authority-resistance.png',
} as const;

const lifeOsBanners = {
  passiveSkills: '/life-os-banners/passive-skills-cat-magic.png',
  debuffs: '/life-os-banners/debuff-cat-magic.png',
} as const;

const lifeOsActiveSkillBanners = {
  galeclawSigil: '/life-os-banners/active-galeclaw-sigil.png',
  moonCodexLoom: '/life-os-banners/active-moon-codex-loom.png',
  catsEyeScan: '/life-os-banners/active-cats-eye-scan.png',
  territoryRuneRewrite: '/life-os-banners/active-territory-rune-rewrite.png',
  storyCauldronAlchemy: '/life-os-banners/active-story-cauldron-alchemy.png',
  nineLivesChaosStep: '/life-os-banners/active-nine-lives-chaos-step.png',
} as const;

const lifeOsSignalBanners = {
  softInfiltrationStyle: '/life-os-signal-banners/soft-infiltration-style.png',
  ruleSetterPhase: '/life-os-signal-banners/rule-setter-phase.png',
  explorerDrive: '/life-os-signal-banners/explorer-drive.png',
  lightBladeBuild: '/life-os-signal-banners/light-blade-build.png',
  bodyResponseEngine: '/life-os-signal-banners/body-response-engine.png',
  chaosCompressionEngine: '/life-os-signal-banners/chaos-compression-engine.png',
} as const;

const lifeOsGrowthRouteBanners = {
  strategist: '/life-os-growth-routes/strategist-route.png',
  creator: '/life-os-growth-routes/creator-route.png',
  wanderer: '/life-os-growth-routes/wanderer-route.png',
  architect: '/life-os-growth-routes/architect-route.png',
} as const;

const lifeRpgAttributes = [
  { key: 'INS', label: { en: 'Insight', zh: '洞察力' }, value: 92, note: { en: 'Reads motives, lies, defenses, and relationship structure.', zh: '看穿动机、谎言、防御机制与关系结构。' } },
  { key: 'STR', label: { en: 'Strategy', zh: '策略力' }, value: 90, note: { en: 'Changes the field through small moves and delayed positioning.', zh: '用小动作、小迭代与延迟布局改变局势。' } },
  { key: 'EXP', label: { en: 'Expression', zh: '表达力' }, value: 87, note: { en: 'Turns complex thought into story, content, language, and brand.', zh: '把复杂思想转成故事、内容、语言和品牌。' } },
  { key: 'FRE', label: { en: 'Freedom', zh: '自由欲' }, value: 95, note: { en: 'Needs movement, optionality, and non-traditional life routes.', zh: '强烈需要变化、选择权与非传统人生路线。' } },
  { key: 'ADP', label: { en: 'Adaptability', zh: '适应力' }, value: 88, note: { en: 'Switches across new places, industries, systems, and people.', zh: '能快速切换新场景、新行业、新系统与新人群。' } },
  { key: 'EXE', label: { en: 'Execution', zh: '启动力' }, value: 82, note: { en: 'Moves fast once the body and instinct give a response.', zh: '身体有回应时，能快速启动行动。' } },
  { key: 'STA', label: { en: 'Stability', zh: '稳定度' }, value: 64, note: { en: 'Long maintenance and emotional balance require deliberate systems.', zh: '长期维护与情绪平衡需要刻意设计系统。' } },
  { key: 'TRU', label: { en: 'Trust', zh: '社交信任' }, value: 52, note: { en: 'Trust grows slowly when too much hidden motive is visible.', zh: '看见太多隐藏动机时，信任建立会变慢。' } },
] as const;

const lifeRpgActiveSkills = [
  {
    icon: lifeOsActiveSkillIcons.galeclawSigil,
    banner: lifeOsActiveSkillBanners.galeclawSigil,
    name: { en: 'Galeclaw Sigil', zh: '风爪密印' },
    level: 'S+',
    type: { en: 'Veiled field-control spell', zh: '隐形场域控制法术' },
    cost: { en: 'Patience + repeated paw-steps', zh: '耐心 + 反复轻爪步' },
    effect: { en: 'Leaves quiet wind marks across a field until the room starts following a new route.', zh: '在场域里留下细小风印，直到环境开始按新的路线运行。' },
    scene: { en: 'Long-term positioning, brand seeding, strategic relationships, product adoption.', zh: '长期布局、品牌渗透、策略关系、产品采用。' },
    sideEffect: { en: 'Without a main quest, the cat keeps marking every corridor instead of finishing one path.', zh: '没有主线时，会一直标记新走廊，却没有走完其中一条路。' },
    bannerCaption: { en: 'A wind-cat sigil for slow infiltration. The spell wins by changing the room before anyone notices.', zh: '风猫留下的渗透密印。不是硬碰，而是在别人察觉前改写场域。' },
  },
  {
    icon: lifeOsActiveSkillIcons.moonCodexLoom,
    banner: lifeOsActiveSkillBanners.moonCodexLoom,
    name: { en: 'Moon-Codex Loom', zh: '月影法典织机' },
    level: 'S',
    type: { en: 'Arcane compression spell', zh: '奥术压缩法术' },
    cost: { en: 'Confusion + quiet reading time', zh: '混乱资料 + 安静回看时间' },
    effect: { en: 'Threads scattered signals, memories, and messy notes into one usable spell pattern.', zh: '把分散信号、记忆和混乱笔记织成一个可使用的法术图案。' },
    scene: { en: 'Life OS, strategy writing, product systems, personal knowledge maps.', zh: 'Life OS、策略写作、产品系统、个人知识地图。' },
    sideEffect: { en: 'The loom can keep weaving forever if no artifact is shipped.', zh: '如果没有交付物，织机会一直织下去，产出会被延迟。' },
    bannerCaption: { en: 'The archive spell that turns loose fragments into a usable model.', zh: '把碎片织成模型的档案法术。混乱越多，越需要收束成一张图。' },
  },
  {
    icon: lifeOsActiveSkillIcons.catsEyeScan,
    banner: lifeOsActiveSkillBanners.catsEyeScan,
    name: { en: "Cat's Eye Scan", zh: '猫眼动机扫描' },
    level: 'S',
    type: { en: 'Motive-reading spell', zh: '动机读取法术' },
    cost: { en: 'Mental focus', zh: '精神专注' },
    effect: { en: 'Reads motive, desire, defense, and hidden emotion through tiny behavioral tells.', zh: '从微小行为线索读取动机、欲望、防御和隐藏情绪。' },
    scene: { en: 'Negotiation, people reading, relationship judgment, market analysis, content creation.', zh: '谈判、识人、关系判断、市场分析、内容创作。' },
    sideEffect: { en: 'The eye can turn cold when it sees too many hidden motives.', zh: '看见太多隐藏动机时，猫眼会变冷，耐心下降。' },
    bannerCaption: { en: 'A motive scan spell. It reads the room through posture, silence, desire, and defense.', zh: '读取动机的猫眼法术。它看姿态、沉默、欲望和防御。' },
  },
  {
    icon: lifeOsActiveSkillIcons.territoryRuneRewrite,
    banner: lifeOsActiveSkillBanners.territoryRuneRewrite,
    name: { en: 'Territory Rune Rewrite', zh: '领地符文改写' },
    level: 'S',
    type: { en: 'Room-rule alteration spell', zh: '场域规则改写法术' },
    cost: { en: 'Time and positioning', zh: '时间 + 布局' },
    effect: { en: 'Changes the room by moving runes, routes, and incentives instead of forcing a collision.', zh: '通过移动符文、路线和诱因改变场域，而不是强行正面碰撞。' },
    scene: { en: 'Workplace, brand promotion, business cooperation, community building, content seeding.', zh: '职场、品牌推广、商业合作、社群经营、内容渗透。' },
    sideEffect: { en: 'With no win condition, the spell becomes endless map editing.', zh: '没有胜利条件时，会变成无止境改地图。' },
    bannerCaption: { en: 'A tactical rune spell. Change the path, and the behavior follows.', zh: '战术符文法术。路线被改写后，行为也会跟着改变。' },
  },
  {
    icon: lifeOsActiveSkillIcons.storyCauldronAlchemy,
    banner: lifeOsActiveSkillBanners.storyCauldronAlchemy,
    name: { en: 'Story Cauldron Alchemy', zh: '故事坩埚炼金' },
    level: 'A+',
    type: { en: 'Memory transmutation spell', zh: '记忆转化法术' },
    cost: { en: 'Experience and emotion', zh: '经历 + 情绪' },
    effect: { en: 'Boils pain, relationships, life events, and business observation into stories people can carry.', zh: '把痛苦、关系、人生事件和商业观察熬成别人能带走的故事。' },
    scene: { en: 'Build notes, YouTube, personal site, brand content, philosophical writing.', zh: 'Blog、YouTube、个人网站、品牌内容、哲学表达。' },
    sideEffect: { en: 'Too much heat makes the potion dramatic instead of useful.', zh: '火候太满时，内容会变戏剧化，而不是变有用。' },
    bannerCaption: { en: 'A cauldron spell for turning lived experience into transmissible stories.', zh: '把真实经历熬成可传播故事的坩埚法术。' },
  },
  {
    icon: lifeOsActiveSkillIcons.nineLivesChaosStep,
    banner: lifeOsActiveSkillBanners.nineLivesChaosStep,
    name: { en: 'Nine-Lives Chaos Step', zh: '九命混沌步' },
    level: 'A',
    type: { en: 'Risk-channeling movement spell', zh: '风险导流移动法术' },
    cost: { en: 'Risk tolerance', zh: '风险承受力' },
    effect: { en: 'Steps into unclear fields and turns danger, novelty, and speed into temporary power.', zh: '踏入不清楚的场域，把危险、新鲜感和速度转成短时间爆发力。' },
    scene: { en: 'Travel, startup, new markets, new industries, gray-zone observation.', zh: '旅行、创业、开荒、新行业、新市场、灰区观察。' },
    sideEffect: { en: 'The character may mistake danger for freedom when the storm feels alive.', zh: '当风暴让人觉得活着时，角色容易把危险误认成自由。' },
    bannerCaption: { en: 'A movement spell for uncertain fields. Useful only when risk has a route.', zh: '进入不确定场域的移动法术。风险有路线时才有用。' },
  },
] as const;

const lifeRpgPassiveSkills = [
  {
    icon: lifeOsModuleIcons.wandererInstinct,
    name: { en: 'Wanderer Instinct', zh: '流浪者本能' },
    trigger: { en: 'Entering a new place, crowd, or system.', zh: '进入新地方、新人群或新系统。' },
    effect: { en: 'Adaptation speed rises. Exploration instinct activates.', zh: '适应速度提升，对陌生环境有天然探索欲。' },
    risk: { en: 'Stable life can become boring too quickly.', zh: '稳定生活容易很快变得无聊。' },
  },
  {
    icon: lifeOsModuleIcons.antiRoutineSystem,
    name: { en: 'Anti-Routine System', zh: '反重复系统' },
    trigger: { en: 'Fixed rules, repeated tasks, and low-meaning maintenance.', zh: '固定规则、重复任务与低意义维护。' },
    effect: { en: 'Creativity rises when the character looks for a workaround.', zh: '寻找绕路方案时，创造力会上升。' },
    risk: { en: 'Patience and long-term maintenance drop.', zh: '耐心与长期维护力下降。' },
  },
  {
    icon: lifeOsModuleIcons.socialMirror,
    name: { en: 'Social Mirror', zh: '社交镜像' },
    trigger: { en: 'Different rooms, roles, cultures, or emotional tones.', zh: '不同场域、身份、文化或情绪气氛。' },
    effect: { en: 'Expression shifts quickly. People often feel understood.', zh: '表达方式快速切换，容易让别人觉得被理解。' },
    risk: { en: 'Too much switching can blur the self.', zh: '过度切换会导致自我感模糊。' },
  },
  {
    icon: lifeOsModuleIcons.patternMemory,
    name: { en: 'Pattern Memory', zh: '模式记忆' },
    trigger: { en: 'Repeated relationship, business, or human behavior patterns.', zh: '重复出现的关系、商业或人性模式。' },
    effect: { en: 'Next similar situation is judged faster.', zh: '下一次遇到相似场景时，判断速度提升。' },
    risk: { en: 'May over-suspect people before they prove intent.', zh: '容易在对方证明意图前就过度怀疑。' },
  },
] as const;

const lifeRpgDebuffs = [
  {
    icon: lifeOsModuleIcons.boredomDecay,
    name: { en: 'Boredom Decay', zh: '无聊衰减' },
    trigger: { en: 'Life repeats, work stops growing, or the project loses meaning.', zh: '生活太重复、工作没有成长、项目没有意义。' },
    negative: { en: 'Action -40%. Emotional stability -30%. Escape impulse +50%.', zh: '行动力 -40%，情绪稳定 -30%，逃离冲动 +50%。' },
    release: { en: 'Add a new challenge, environment, target, or stage upgrade.', zh: '加入新挑战、新环境、新目标或阶段性升级。' },
    upgrade: { en: 'Long-term exploration power.', zh: '长期探索力。' },
  },
  {
    icon: lifeOsModuleIcons.overInsight,
    name: { en: 'Over Insight', zh: '过度洞察' },
    trigger: { en: 'Too much is seen, but cannot be said directly.', zh: '看穿别人太多，但不能说出口。' },
    negative: { en: 'Trust decreases. Social fatigue rises. The character cools down or pulls away.', zh: '信任感下降，社交疲劳增加，容易冷掉或疏离。' },
    release: { en: 'Convert the insight into content, systems, consulting, or creation.', zh: '把洞察转成内容、系统、咨询或创作，而不是压在心里。' },
    upgrade: { en: 'Human analysis power.', zh: '人性分析力。' },
  },
  {
    icon: lifeOsModuleIcons.unfinishedQuestLoop,
    name: { en: 'Unfinished Quest Loop', zh: '未完成任务循环' },
    trigger: { en: 'Too many new plans open at the same time.', zh: '同时开启太多新计划。' },
    negative: { en: 'Main quest progress drops. New-project excitement rises. Old-project maintenance drops.', zh: '主线任务进度下降，新项目兴奋度上升，旧项目维护力下降。' },
    release: { en: 'Keep one main quest per stage. Move everything else into side quests.', zh: '每个阶段只保留一个主线任务，其他全部归类为支线。' },
    upgrade: { en: 'Multi-line project management power.', zh: '多线项目管理力。' },
  },
  {
    icon: lifeOsModuleIcons.authorityResistance,
    name: { en: 'Authority Resistance', zh: '权威抗拒' },
    trigger: { en: 'Being managed by low-competence authority or trapped in irrational rules.', zh: '被没能力的人管理，或被不合理制度控制。' },
    negative: { en: 'Obedience drops. Rebellion rises. Creativity rises. Stable cooperation drops.', zh: '服从度下降，反骨值上升，创造力上升，稳定合作下降。' },
    release: { en: 'Choose high-freedom environments or become a rule designer.', zh: '选择高自由度环境，或让自己成为规则制定者。' },
    upgrade: { en: 'System reform power.', zh: '系统改革力。' },
  },
] as const;

const lifeRpgSkillTrees = [
  {
    banner: lifeOsGrowthRouteBanners.strategist,
    title: { en: 'The Strategist', zh: '策略师路线' },
    path: { en: 'Insight -> positioning -> resource alignment -> rule design', zh: '洞察力 → 策略布局 → 资源整合 → 规则制定' },
    directions: { en: 'Marketing strategy, brand consulting, business analysis, product planning, iGaming consulting.', zh: '营销策略、品牌顾问、商业分析、产品策划、iGaming 顾问。' },
    risk: { en: 'Can over-read the field and delay direct action.', zh: '容易过度读局，延迟直接行动。' },
  },
  {
    banner: lifeOsGrowthRouteBanners.creator,
    title: { en: 'The Creator', zh: '创作者路线' },
    path: { en: 'Experience -> point of view -> content system -> personal brand', zh: '个人经历 → 观点表达 → 内容系统 → 个人品牌' },
    directions: { en: 'Build notes, YouTube, personal site, AI short video, philosophical essays.', zh: 'Blog、YouTube、个人网站、AI 短视频、哲学文章。' },
    risk: { en: 'Emotion can make the story louder than the system.', zh: '情绪太满时，故事会盖过系统。' },
  },
  {
    banner: lifeOsGrowthRouteBanners.wanderer,
    title: { en: 'The Wanderer', zh: '流浪者路线' },
    path: { en: 'Travel -> human observation -> cultural understanding -> worldview rebuild', zh: '旅行体验 → 人性观察 → 文化理解 → 世界观重构' },
    directions: { en: 'Digital nomad life, long-term travel, cross-border living, experience-based content.', zh: '数字游民、长期旅行、跨国生活、体验型内容。' },
    risk: { en: 'Freedom can become escape when the main quest is weak.', zh: '主线不清时，自由会变成逃离。' },
  },
  {
    banner: lifeOsGrowthRouteBanners.architect,
    title: { en: 'The Architect', zh: '系统架构者路线' },
    path: { en: 'Messy data -> structure -> model -> product', zh: '混乱资料 → 结构化 → 模型化 → 产品化' },
    directions: { en: 'Personality systems, RPG life maps, upgrade tools, personal operating systems.', zh: '人格系统、RPG 人生地图、升级工具、个人操作系统。' },
    risk: { en: 'The model can keep expanding before the first usable version ships.', zh: '模型会不断扩张，拖慢第一个可用版本。' },
  },
] as const;

const lifeRpgSources = [
  { en: 'Player logs: repeated choices, environments, reactions, and unfinished quests.', zh: '玩家日志：重复选择、环境反应、行动惯性与未完成任务。' },
  { en: 'Behavior loops: pressure triggers, boredom decay, trust patterns, and energy cost.', zh: '行为循环：压力触发、无聊衰减、信任模式与能量消耗。' },
  { en: 'Energy pattern: what creates momentum, drains focus, or causes system overheating.', zh: '能量模式：什么会带来动能、消耗专注，或造成系统过热。' },
  { en: 'Social pattern: how the character reads rooms, mirrors people, and protects trust.', zh: '社交模式：角色如何读懂场域、镜像人群，并保护信任。' },
  { en: 'Money pattern: how concepts become offers, products, leverage, and value.', zh: '赚钱模式：概念如何转成报价、产品、杠杆和价值。' },
  { en: 'Relationship pattern: attraction, distance, loyalty, fatigue, and boundary signals.', zh: '关系模式：吸引、距离、忠诚、疲劳和边界信号。' },
  { en: 'Reality calibration: travel, work history, projects, relationships, and creator output.', zh: '现实校准：旅行、工作经历、项目、关系和创作输出。' },
] as const;

const lifeRpgDecodeSignals = [
  {
    icon: lifeOsModuleIcons.softInfiltrationStyle,
    banner: lifeOsSignalBanners.softInfiltrationStyle,
    emoji: '🌬️',
    code: 'WIND-57',
    title: { en: 'Soft Infiltration Style', zh: '轻量渗透型风格' },
    signal: { en: 'Gentle infiltration, repeated small moves, environmental rewriting.', zh: '渗透、反复小动作、环境权重改写。' },
    output: { en: 'Unlocks Wind Infiltration and strategic patience.', zh: '解锁风之渗透与策略耐心。' },
  },
  {
    icon: lifeOsModuleIcons.ruleSetterPhase,
    banner: lifeOsSignalBanners.ruleSetterPhase,
    emoji: '👑',
    code: 'PHASE-RULE',
    title: { en: 'Rule-Setter Phase', zh: '规则制定阶段' },
    signal: { en: 'The influence stage. Set rules, hold the main quest, move resources toward the core target.', zh: '影响力最强阶段。适合定规则、抓主线、把资源推向核心目标。' },
    output: { en: 'Upgrades from wanderer mode to rule-designer mode.', zh: '从流浪者模式升级成规则制定者模式。' },
  },
  {
    icon: lifeOsModuleIcons.explorerDrive,
    banner: lifeOsSignalBanners.explorerDrive,
    emoji: '5',
    code: 'EXPLORE-05',
    title: { en: 'Explorer Drive', zh: '探索驱动' },
    signal: { en: 'Freedom, movement, experience, and high boredom sensitivity.', zh: '自由、变化、体验，以及很高的无聊敏感度。' },
    output: { en: 'Boosts Freedom and Controlled Chaos. Lowers routine tolerance.', zh: '强化自由欲与可控混乱，降低重复耐受。' },
  },
  {
    icon: lifeOsModuleIcons.lightBladeBuild,
    banner: lifeOsSignalBanners.lightBladeBuild,
    emoji: '🗡️',
    code: 'BLADE-LIGHT',
    title: { en: 'Light Blade Build', zh: '轻刃型配置' },
    signal: { en: 'Pressure can sharpen the blade, but the character needs structure. Too much heat causes burnout.', zh: '压力能磨出锋利度，但角色需要结构承托。过热会导致系统烧干。' },
    output: { en: 'Adds Rule Sense, pressure awareness, and the Overheat Pressure debuff.', zh: '加入规则嗅觉、压力感知与过热压力 Debuff。' },
  },
  {
    icon: lifeOsModuleIcons.bodyResponseEngine,
    banner: lifeOsSignalBanners.bodyResponseEngine,
    emoji: '⚡',
    code: 'BODY-YES',
    title: { en: 'Body Response Engine', zh: '身体回应引擎' },
    signal: { en: 'Energy works best after response. Forcing without a body yes drains the system.', zh: '等身体回应后行动最好。没有身体的 yes，硬做会消耗系统。' },
    output: { en: 'Unlocks Response Mode. Execution activates after a real body yes.', zh: '解锁回应模式。真正有身体 yes 后，启动力才会启动。' },
  },
  {
    icon: lifeOsModuleIcons.chaosCompressionEngine,
    banner: lifeOsSignalBanners.chaosCompressionEngine,
    emoji: '64-47',
    code: 'ABSTRACT',
    title: { en: 'Chaos Compression Engine', zh: '混乱压缩引擎' },
    signal: { en: 'Confusion becomes insight after compression, reflection, and naming.', zh: '混乱经过压缩、回看和命名后，变成洞察。' },
    output: { en: 'Unlocks Abstraction Engine and Narrative Alchemy.', zh: '解锁抽象整合引擎与故事炼金。' },
  },
] as const;

const lifeRpgHiddenParameters = [
  { key: 'BIZ', label: { en: 'Business Sense', zh: '商业嗅觉' }, value: 85, note: { en: 'Turns concepts into value, offers, products, and leverage.', zh: '把概念转成价值、报价、产品和杠杆。' } },
  { key: 'CRT', label: { en: 'Creativity', zh: '创造力' }, value: 89, note: { en: 'Rebuilds messy experience into new content, systems, and expression.', zh: '把混乱经验重组为新内容、新系统和新表达。' } },
  { key: 'RUT', label: { en: 'Routine Tolerance', zh: '重复耐受' }, value: 32, note: { en: 'Low tolerance for fixed loops without meaning or upgrade.', zh: '对没有意义或升级感的固定循环耐受低。' } },
  { key: 'OBY', label: { en: 'System Obedience', zh: '制度服从' }, value: 38, note: { en: 'Obeys systems only when the logic, competence, and stakes make sense.', zh: '只有规则逻辑、能力和代价合理时，才愿意服从系统。' } },
] as const;

const lifeRpgQuestDirectives = [
  { en: 'Primary command: turn scattered ability into one transmissible life system.', zh: '主指令：把分散能力收束成一个可传播的人生系统。' },
  { en: 'Stage tactic: act like a background process that quietly changes the field.', zh: '阶段战术：像后台进程一样，持续且隐蔽地修改环境参数。' },
  { en: 'Win condition: the target environment is reset and the strategy becomes visible.', zh: '胜利条件：目标环境参数被重置，策略可见性被迫提升。' },
  { en: 'Risk warning: too many side quests will drain the main quest.', zh: '风险警告：支线任务太多，会削弱主线进度。' },
] as const;

const lifeRpgWorldPrinciples = [
  {
    emoji: '🌫️',
    title: { en: 'Born from noise', zh: '从噪音中成形' },
    body: {
      en: 'This character did not begin in clean order. The early field was made of unclear signals, shifting rooms, desire, pressure, and unfinished patterns.',
      zh: '这个角色不是从干净秩序里开始。早期场域里有模糊信号、变化的人群、欲望、压力，以及反复出现的未完成模式。',
    },
  },
  {
    emoji: '👁️',
    title: { en: 'Weapon: pattern sight', zh: '武器：模式视野' },
    body: {
      en: 'The first weapon is not force. It is the ability to notice hidden motives, repeated behavior, weak structures, and the story underneath the surface.',
      zh: '第一件武器不是蛮力，而是看见隐藏动机、重复行为、脆弱结构，以及表面之下的故事。',
    },
  },
  {
    emoji: '🜁',
    title: { en: 'Element: Wind + Metal', zh: '元素：风 + 金' },
    body: {
      en: 'Wind opens the door into different worlds. Metal cuts chaos into shape. One moves. One structures. The build only works when both are active.',
      zh: '风负责进入不同世界。金负责把混乱切成结构。一个负责流动，一个负责成形。两者同时启动时，角色才真正可用。',
    },
  },
  {
    emoji: '🧭',
    title: { en: 'Main quest: usable maps', zh: '主线：做出可用地图' },
    body: {
      en: 'The mission is to turn human insight, business strategy, AI workflows, and lived chaos into systems other people can understand and use.',
      zh: '主线任务是把人性洞察、商业策略、AI 工作流和真实混乱，转成别人也能理解和使用的系统。',
    },
  },
] as const;

const lifeRpgFormulaExamples = [
  {
    title: { en: 'Freedom Drive', zh: '自由探索欲' },
    score: 95,
    lines: {
      en: [
        'Explorer drive +15',
        'Adventure hunger +15',
        'Soft infiltration style +15',
        'Creator playfield +10',
        'Mutation loop +10',
        'Real calibration: travel, job changes, risk appetite +20',
        'Conflict correction: real-world constraints -5',
      ],
      zh: [
        '探索驱动 +15',
        '冒险饥饿感 +15',
        '轻量渗透型风格 +15',
        '创作者游乐场 +10',
        '突变循环 +10',
        '现实校准：旅行、换工作、冒险倾向 +20',
        '冲突修正：现实约束 -5',
      ],
    },
  },
  {
    title: { en: 'Stable Execution', zh: '稳定执行' },
    score: 64,
    lines: {
      en: [
        'Response engine +15',
        'High-stakes discipline +15',
        'Pressure buffer +10',
        'Slow-build mode +10',
        'Impatience shadow -15',
        'Low routine tolerance -20',
        'Real calibration: unfinished loops -10',
      ],
      zh: [
        '回应引擎 +15',
        '高压纪律 +15',
        '压力缓冲 +10',
        '慢速建造模式 +10',
        '急躁阴影 -15',
        '重复耐受低 -20',
        '现实校准：三分钟热度 / 未完成循环 -10',
      ],
    },
  },
] as const;

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
}> = ({ language, setLanguage }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1">
    <button
      type="button"
      onClick={() => setLanguage('en')}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        language === 'en' ? 'bg-eden-mint text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
      }`}
    >
      EN
    </button>
    <button
      type="button"
      onClick={() => setLanguage('zh')}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        language === 'zh' ? 'bg-eden-mint text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
      }`}
    >
      中文
    </button>
  </div>
);

const ThemeToggle: React.FC<{
  language: Language;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ language, themePreference, theme, setThemePreference }) => {
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

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1"
      title={autoStatus}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = themePreference === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setThemePreference(option.value)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              isActive ? option.activeClass : 'text-stone-600 hover:text-stone-900'
            }`}
            aria-pressed={isActive}
            title={
              option.value === 'auto'
                ? autoStatus
                : language === 'zh'
                  ? `切换到${option.label}`
                  : `Switch to ${option.label}`
            }
          >
            <Icon size={13} />
            <span>{option.label}</span>
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
}> = ({ language, setLanguage, themePreference, theme, setThemePreference }) => (
  <div className="flex items-center gap-3">
    <ThemeToggle
      language={language}
      themePreference={themePreference}
      theme={theme}
      setThemePreference={setThemePreference}
    />
    <LanguageToggle language={language} setLanguage={setLanguage} />
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
              <a href={projectsHref}>{isZh ? '看系统项目' : 'View systems'} <span aria-hidden>›</span></a>
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
              {isZh ? '返回 Projects' : 'Back to Projects'}
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
                ? '这里放 `/projects` 的四个 app icon，也放 Home 的 System Files 和 Interests 图腾，方便一起看动效、比例、透明底、light / dark mode 和维护边界。'
                : 'This page gathers the four `/projects` app icons plus Home System Files and Interests totems for reviewing motion, ratio, transparent backgrounds, light/dark mode, and maintenance boundaries.'}
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
                {isZh ? 'Interests 里的透明底图腾' : 'Transparent totems from Interests'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '这些按图腾规则展示：透明底，不强行套 app icon 外框。' : 'These follow the totem rule: transparent backgrounds, without forcing an app-icon frame.'}
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
              <a href={projectsHref} className="projects-text-cta">
                {isZh ? '回到 Projects' : 'Back to Projects'} <span aria-hidden>›</span>
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
  const crmHref = joinBasePath(baseUrl, 'crm');
  const projectCssHref = joinBasePath(baseUrl, 'project-css');
  const previousProjectsHref = joinBasePath(baseUrl, 'previous-projects');

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
            />
          </div>

          <header className="projects-hero py-16 text-center md:py-24">
            <p className="projects-kicker mx-auto">{isZh ? 'Projects / AI Build Systems' : 'Projects / AI Build Systems'}</p>
            <h1 className="projects-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Different builds. Same stubborn habit.' : 'Different builds. Same stubborn habit.'}
            </h1>
            <p className="projects-subtitle mx-auto mt-5">
              {isZh
                ? 'Jiju、Friday Poker Club、ETReportHub 和 CRM。项目不一样，底下其实每次都是同一招：把一团乱的输入，变成真的能用的系统。'
                : 'Jiju, Friday Poker Club, ETReportHub, and CRM. Different projects, but underneath it’s the same move every time: take messy input and turn it into something you can actually use.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#project-stack" className="projects-text-cta">
                {isZh ? '看项目合集' : 'View stack'} <span aria-hidden>›</span>
              </a>
              <a href="#etreporthub" className="projects-text-cta projects-text-cta-muted">
                {isZh ? '看 ETReportHub' : 'View ETReportHub'} <span aria-hidden>›</span>
              </a>
              <a href={projectCssHref} className="projects-text-cta projects-text-cta-muted">
                {isZh ? '看 CSS 图标' : 'View CSS icons'} <span aria-hidden>›</span>
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
                  ? '不想把作品平铺成一张清单，所以把几套系统放进同一个叙事里：发现、游戏房、报表、CRM。'
                  : 'Instead of laying everything out flat as a list, this groups the different systems into one story: discovery, game rooms, reporting, and CRM.'}
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
                {isZh ? '四个慢慢长成系统的东西。' : 'Four things slowly turning into real systems.'}
              </h2>
            </div>
            <div className="projects-grid mt-12">
              {aiProjectSystems.map((project) => {
                const isJiju = project.href === 'jiju';
                const isETReportHub = project.title === 'ETReportHub';
                const isPoker = project.title === 'Friday Poker Club';
                const isCrm = project.title === 'CRM Intelligence System';
                const cardClassName = ['projects-card', isJiju ? 'projects-card-jiju' : ''].filter(Boolean).join(' ');
                const titleClassName = [
                  'projects-card-title font-display font-bold tracking-tight',
                  isETReportHub ? 'projects-card-title-compact' : '',
                  isCrm ? 'projects-card-title-long' : '',
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
                      <div className="projects-card-icon-slot">{projectIcon}</div>
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
                      {isCrm && (
                        <a href={crmHref} className="projects-text-cta">
                          {isZh ? '看这个疯东西' : 'See the wild one'} <span aria-hidden>›</span>
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
                  ? 'ETReportHub 的价值不是把数字排漂亮，而是把每天最容易出错的资料流变成可追踪、可解释、可导出、可继续接 CRM 的系统。'
                  : 'ETReportHub is not about making numbers look pretty. It turns a fragile daily data flow into something traceable, explainable, exportable, and ready for CRM workflows.'}
              </p>
            </div>
            <div className="projects-readout-grid mt-12">
              {(isZh
                ? [
                    ['Product Promise', '少一点人工对表，多一点可判断的运营系统。'],
                    ['Data Trust', 'Transaction 与 Customer Excel 按规则导入、标准化，并保留可复盘的资料层。'],
                    ['Operating Views', 'Performance、Members、Channels、Trends 和品牌对比，把日报变成判断。'],
                    ['Next Action', '会员分群、风险信号、留存区间和 CRM export，准备接后续跟进工作流。'],
                  ]
                : [
                    ['Product Promise', 'Less manual checking. More operating judgment.'],
                    ['Data Trust', 'Transaction and Customer Excel files are imported under rules, normalized, and kept reviewable.'],
                    ['Operating Views', 'Performance, Members, Channels, Trends, and brand comparison turn daily reporting into decisions.'],
                    ['Next Action', 'Member segments, risk signals, retention buckets, and CRM export prepare the next follow-up workflow.'],
                  ]
              ).map(([label, copy]) => (
                <article key={label} className="projects-readout-card">
                  <p className="projects-card-eyebrow">{label}</p>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="projects-section py-16 md:py-24">
            <div className="projects-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '旧的留在档案里，正在跑的系统放前台。' : 'Old stuff stays in the archive. The live systems get the front page.'}
              </h2>
              <p>
                {isZh
                  ? '以前那些 iGaming promotion、campaign、UI/UX 的活儿都放在 legacy archive。这个 `/projects` 页只放当前的 AI build systems 和产品。'
                  : 'The older iGaming promotion, campaign, and UI/UX work lives in the legacy archive. This `/projects` page is just for the current AI build systems and products.'}
              </p>
              <a href={previousProjectsHref} className="projects-text-cta">
                {isZh ? '看 legacy archive' : 'View legacy archive'} <span aria-hidden>›</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const ETReportHubFullPage: React.FC<{
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
    <div className="page-shell etreport-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={projectsHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回 Projects' : 'Back to Projects'}
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
            <p className="etreport-kicker mx-auto">{isZh ? 'ETReportHub / System Flow' : 'ETReportHub / System Flow'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Daily Report data system, rebuilt in Eden’s language.' : 'Daily Report data system, rebuilt in Eden’s language.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? '一份面向运营和交付的系统地图：从每日 Excel 上传，到 SQLite 写入、Customer / Transaction 规则、Dashboard 报表、Excel / CRM / Audit 导出，再到优化路线和上云预留。'
                : 'An operator-facing system map: from daily Excel upload to SQLite writes, Customer / Transaction rules, Dashboard reporting, Excel / CRM / Audit exports, optimization priorities, and cloud-readiness groundwork.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#flow-map" className="etreport-text-cta">
                {isZh ? '看系统流程' : 'View system flow'} <span aria-hidden>›</span>
              </a>
              <a href="#rules" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '看业务规则' : 'View rules'} <span aria-hidden>›</span>
              </a>
              <a href={salesHref} className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '看售卖页' : 'View sales page'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

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
                  {isZh ? '回 Projects' : 'Back to Projects'} <span aria-hidden>›</span>
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
                <p>{isZh ? '月费' : 'Monthly'}</p>
                <strong>RM960</strong>
                <span>{isZh ? '/月' : '/month'}</span>
              </div>
              <div>
                <p>{isZh ? '买断' : 'Buyout'}</p>
                <strong>RM19,888</strong>
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
                {isZh ? '现场算给客户看：RM960/月是否划算？' : 'Show the customer if RM960/month makes sense.'}
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
                ? '销售讲法：说白了，一天省 2-4 小时，CRM 跟得上、bonus 不乱发，RM960/月你别当软件费看——那是把原本烂在 Excel 和拍脑袋决定里的钱，捞回来。'
                : 'Sales angle: real talk — save 2-4 hours a day, keep CRM on top of it, stop over-handing bonus, and RM960/month stops feeling like a software bill. It’s clawing back money that was quietly leaking into Excel and guesswork.'}
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
                {isZh ? '两种购买方式。先使用，或直接拥有。' : 'Two ways to buy. Start using it, or own it outright.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
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
                  {isZh ? '回 Projects' : 'Back to Projects'} <span aria-hidden>›</span>
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
              {isZh ? '返回 Projects' : 'Back to Projects'}
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
                  {isZh ? '回 Projects' : 'Back to Projects'} <span aria-hidden>›</span>
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
                {isZh ? '回 Projects' : 'Back to Projects'} <span aria-hidden>›</span>
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

type ConwayHexCell = {
  hexagram: number;
  changedMask: number;
  energy: number;
};

const CONWAY_GRID_SIZE = 8;
const CONWAY_CELL_COUNT = CONWAY_GRID_SIZE * CONWAY_GRID_SIZE;

const conwayNeighborMap = Array.from({ length: CONWAY_CELL_COUNT }, (_, index) => {
  const row = Math.floor(index / CONWAY_GRID_SIZE);
  const col = index % CONWAY_GRID_SIZE;
  const neighbors: number[] = [];

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      if (rowOffset === 0 && colOffset === 0) continue;
      const nextRow = (row + rowOffset + CONWAY_GRID_SIZE) % CONWAY_GRID_SIZE;
      const nextCol = (col + colOffset + CONWAY_GRID_SIZE) % CONWAY_GRID_SIZE;
      neighbors.push(nextRow * CONWAY_GRID_SIZE + nextCol);
    }
  }

  return neighbors;
});

const createConwayInitialCells = (): ConwayHexCell[] =>
  Array.from({ length: CONWAY_CELL_COUNT }, (_, index) => {
    const seed = ((index + 1) * 37 + (index % CONWAY_GRID_SIZE) * 11 + Math.floor(index / CONWAY_GRID_SIZE) * 17) & 63;
    return {
      hexagram: seed,
      changedMask: 0,
      energy: 0,
    };
  });

const evolveConwayHexCells = (cells: ConwayHexCell[]): ConwayHexCell[] =>
  cells.map((cell, index) => {
    let nextHexagram = 0;
    let changedMask = 0;
    let energy = 0;

    for (let lineIndex = 0; lineIndex < 6; lineIndex += 1) {
      const lineMask = 1 << lineIndex;
      const isYang = (cell.hexagram & lineMask) !== 0;
      const neighborYangCount = conwayNeighborMap[index].reduce(
        (count, neighborIndex) => count + ((cells[neighborIndex].hexagram & lineMask) !== 0 ? 1 : 0),
        0,
      );
      const becomesYang = isYang
        ? neighborYangCount === 2 || neighborYangCount === 3 || neighborYangCount === 5
        : neighborYangCount === 3 || neighborYangCount === 6;

      if (becomesYang) nextHexagram |= lineMask;
      if (becomesYang !== isYang) changedMask |= lineMask;
      energy += neighborYangCount;
    }

    return {
      hexagram: nextHexagram,
      changedMask,
      energy,
    };
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
  { bits: '011', name: { en: 'Dui', zh: '兑' }, symbol: '☱', nature: { en: 'Lake', zh: '泽' } },
  { bits: '101', name: { en: 'Li', zh: '离' }, symbol: '☲', nature: { en: 'Fire', zh: '火' } },
  { bits: '001', name: { en: 'Zhen', zh: '震' }, symbol: '☳', nature: { en: 'Thunder', zh: '雷' } },
  { bits: '110', name: { en: 'Xun', zh: '巽' }, symbol: '☴', nature: { en: 'Wind', zh: '风' } },
  { bits: '010', name: { en: 'Kan', zh: '坎' }, symbol: '☵', nature: { en: 'Water', zh: '水' } },
  { bits: '100', name: { en: 'Gen', zh: '艮' }, symbol: '☶', nature: { en: 'Mountain', zh: '山' } },
  { bits: '000', name: { en: 'Kun', zh: '坤' }, symbol: '☷', nature: { en: 'Earth', zh: '地' } },
] as const;

const getIChingTrigram = (bits: string) => I_CHING_TRIGRAMS.find((item) => item.bits === bits) ?? I_CHING_TRIGRAMS[0];

const I_CHING_RULE_PHASES = [
  {
    bits: '00',
    name: { en: 'Still', zh: '静卦' },
    note: { en: 'base hexagram', zh: '基础卦象' },
    changingLines: [] as number[],
  },
  {
    bits: '01',
    name: { en: 'Lower moving', zh: '下卦动' },
    note: { en: 'lines 1-3 are in motion', zh: '一至三爻进入变化' },
    changingLines: [1, 2, 3],
  },
  {
    bits: '10',
    name: { en: 'Upper moving', zh: '上卦动' },
    note: { en: 'lines 4-6 are in motion', zh: '四至六爻进入变化' },
    changingLines: [4, 5, 6],
  },
  {
    bits: '11',
    name: { en: 'Full change', zh: '通卦动' },
    note: { en: 'all six lines are in motion', zh: '六爻全部进入变化' },
    changingLines: [1, 2, 3, 4, 5, 6],
  },
] as const;

const getRuleHexagramBits = (rule: number) => (rule & 63).toString(2).padStart(6, '0');

const getRuleIChingPhase = (rule: number) => I_CHING_RULE_PHASES[rule >> 6] ?? I_CHING_RULE_PHASES[0];

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

const ConwayHexagramGlyph: React.FC<{ cell: ConwayHexCell; index: number }> = ({ cell, index }) => (
  <article
    className="conway-cell"
    style={
      {
        '--energy': cell.energy,
        '--order': index,
      } as React.CSSProperties
    }
    aria-label={`Hexagram cell ${index + 1}, state ${cell.hexagram + 1}`}
  >
    <div className="conway-cell-meta">
      <span>{String(index + 1).padStart(2, '0')}</span>
      <span>{String(cell.hexagram + 1).padStart(2, '0')}</span>
    </div>
    <div className="conway-hexagram" aria-hidden>
      {Array.from({ length: 6 }, (_, visualIndex) => {
        const lineIndex = 5 - visualIndex;
        const lineMask = 1 << lineIndex;
        const isYang = (cell.hexagram & lineMask) !== 0;
        const changed = (cell.changedMask & lineMask) !== 0;
        return (
          <span
            key={lineIndex}
            className={`conway-line ${isYang ? 'conway-line-yang' : 'conway-line-yin'} ${
              changed ? 'conway-line-changing' : ''
            }`}
          />
        );
      })}
    </div>
  </article>
);

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
}> = ({ rule, selected, onSelect }) => (
  <button
    type="button"
    className={`elementary-rule-thumb ${selected ? 'is-selected' : ''}`}
    onClick={() => onSelect(rule)}
    aria-pressed={selected}
    aria-label={`Rule ${rule}`}
  >
    <ElementaryRulePattern rule={rule} width={ELEMENTARY_THUMB_WIDTH} height={ELEMENTARY_THUMB_HEIGHT} className="elementary-rule-thumb-grid" />
    <span>{String(rule).padStart(3, '0')}</span>
  </button>
);

const IChingRuleReadout: React.FC<{ rule: number; binary: string; language: Language }> = ({ rule, binary, language }) => {
  const hexagramBits = getRuleHexagramBits(rule);
  const phase = getRuleIChingPhase(rule);
  const upperBits = hexagramBits.slice(0, 3);
  const lowerBits = hexagramBits.slice(3, 6);
  const lower = getIChingTrigram(lowerBits);
  const upper = getIChingTrigram(upperBits);
  const yangCount = [...hexagramBits].filter((bit) => bit === '1').length;
  const phaseBits = binary.slice(0, 2);
  const changingLines: readonly number[] = phase.changingLines;
  const isZh = language === 'zh';

  return (
    <div className="iching-rule-readout">
      <div className="iching-rule-head">
        <p className="elementary-rule-label">{isZh ? '易经读数' : 'I Ching layer'}</p>
        <strong>{upper.symbol}{lower.symbol}</strong>
      </div>
      <div className="iching-hexagram-lines" aria-label={isZh ? '六爻卦象' : 'Six-line hexagram'}>
        {[...hexagramBits].map((bit, index) => {
          const lineNumber = 6 - index;
          const isChanging = changingLines.includes(lineNumber);
          return (
            <span
              key={`${bit}-${index}`}
              className={`${bit === '1' ? 'is-yang' : 'is-yin'} ${isChanging ? 'is-changing' : ''}`}
            />
          );
        })}
      </div>
      <div className="iching-trigram-grid">
        <div>
          <span>{isZh ? '上卦' : 'Upper'}</span>
          <b>{upper.name[language]} / {upper.nature[language]}</b>
        </div>
        <div>
          <span>{isZh ? '下卦' : 'Lower'}</span>
          <b>{lower.name[language]} / {lower.nature[language]}</b>
        </div>
        <div>
          <span>Phase {phaseBits}</span>
          <b>{phase.name[language]} / {phase.note[language]}</b>
        </div>
        <div>
          <span>{isZh ? '卦码' : 'Hex bits'}</span>
          <b>{hexagramBits}</b>
        </div>
      </div>
      <p className="iching-rule-note">
        {isZh
          ? `阳爻 ${yangCount}/6。Rule 的低 6 位决定六爻；高 2 位决定 phase，所以 000 与 001 会读成不同卦。`
          : `${yangCount}/6 yang lines. The low six rule bits form the hexagram; the high two bits set the phase, so 000 and 001 read differently.`}
      </p>
      <p className="iching-changing-lines">
        {isZh ? '变爻位' : 'Changing lines'}: {changingLines.length ? changingLines.join(' / ') : '0'}
      </p>
    </div>
  );
};

const ElementaryRuleViewer: React.FC<{
  rule: number;
  generation: number;
  language: Language;
}> = ({ rule, generation, language }) => {
  const binary = rule.toString(2).padStart(8, '0');

  return (
    <section className="elementary-rule-viewer" aria-label={`Rule ${rule} preview`}>
      <div
        className="elementary-rule-stage"
        aria-label={`Elementary cellular automata rule ${rule}`}
      >
        <ElementaryRulePattern
          rule={rule}
          width={ELEMENTARY_MAIN_WIDTH}
          height={ELEMENTARY_MAIN_HEIGHT}
          offset={generation}
          className="elementary-rule-main-grid"
        />
      </div>

      <aside className="elementary-rule-readout">
        <div>
          <p className="elementary-rule-label">Rule</p>
          <strong>{String(rule).padStart(3, '0')}</strong>
        </div>
        <div>
          <p className="elementary-rule-label">Binary</p>
          <code>{binary}</code>
        </div>
        <div className="elementary-neighborhoods">
          {ELEMENTARY_NEIGHBORHOODS.map((neighborhood, index) => (
            <div key={neighborhood}>
              <span>{neighborhood}</span>
              <i className={binary[index] === '1' ? 'is-active' : undefined} />
            </div>
          ))}
        </div>
        <IChingRuleReadout rule={rule} binary={binary} language={language} />
      </aside>
    </section>
  );
};

const ConwayGameOfLifeFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [selectedRule, setSelectedRule] = React.useState(30);
  const [generation, setGeneration] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);

  React.useEffect(() => {
    if (!isRunning) return undefined;
    const intervalId = window.setInterval(() => {
      setGeneration((currentGeneration) => currentGeneration + 1);
    }, 720);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const selectRule = (rule: number) => {
    setSelectedRule(rule);
    setGeneration(0);
  };

  return (
    <div className="page-shell conway-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="conway-rules-page">
        <div className="conway-rules-shell">
          <div className="conway-rules-topbar">
            <a href={homeHref} className="conway-back-link inline-flex items-center gap-2 text-sm font-medium">
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

          <header className="conway-rules-header">
            <div className="conway-rules-copy">
              <p className="conway-kicker">Elementary cellular automata</p>
              <h1 className="conway-rules-title font-display font-bold tracking-tight">
                {isZh ? '256 个规则' : '256 rules'}
              </h1>
              <p className="conway-rules-subtitle">
                {isZh
                  ? '把 8-bit 规则转成黑白生长图案：一个规则，一种秩序。'
                  : 'Turn each 8-bit rule into a black-and-white growth pattern: one rule, one order.'}
              </p>
            </div>
            <div className="conway-rules-controls">
              <button type="button" className="conway-control-button" onClick={() => setIsRunning((value) => !value)}>
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                <span>{isRunning ? (isZh ? '暂停' : 'Pause') : isZh ? '继续' : 'Run'}</span>
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
          </header>

          <ElementaryRuleViewer rule={selectedRule} generation={generation} language={language} />

          <div className="elementary-featured-rules" aria-label={isZh ? '常见规则' : 'Featured rules'}>
            {FEATURED_ELEMENTARY_RULES.map((rule) => (
              <button
                key={rule}
                type="button"
                className={selectedRule === rule ? 'is-selected' : ''}
                onClick={() => selectRule(rule)}
              >
                Rule {rule}
              </button>
            ))}
          </div>

          <section className="elementary-rule-index" aria-label={isZh ? '256 个 elementary cellular automata 规则' : '256 elementary cellular automata rules'}>
            {Array.from({ length: ELEMENTARY_RULE_COUNT }, (_, rule) => (
              <ElementaryRuleThumb key={rule} rule={rule} selected={selectedRule === rule} onSelect={selectRule} />
            ))}
          </section>
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
              {isZh ? '返回 Projects' : 'Back to Projects'}
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
                  {isZh ? '回 Projects' : 'Back to Projects'} <span aria-hidden>›</span>
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

const AnalogTechFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const heroPhoto = analogTechGalleryPhotos[0];
  const secondaryPhotos = analogTechGalleryPhotos.slice(1);
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
              {isZh ? 'Analog Tech / Film Archive' : 'Analog Tech / Film Archive'}
            </p>
            <h1 className="film-gallery-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Film Gallery' : 'Film Gallery'}
            </h1>
            <p className="film-gallery-subtitle mx-auto mt-5">
              {isZh
                ? 'A quiet archive of light, grain, waterlines, buildings, and the way attention lands on a frame.'
                : 'A quiet archive of light, grain, waterlines, buildings, and the way attention lands on a frame.'}
            </p>
            <p className="film-gallery-copy mx-auto mt-5">
              {isZh
                ? '这里不解释每张图。只保留画面、顺序和呼吸感。胶片里的颗粒、软高光和偶然漏光，是材料本身，不是需要被修掉的噪音。'
                : 'No frame-by-frame explanation here. Only image, sequence, and breathing room. Grain, soft highlights, and occasional light leaks are treated as material, not noise to remove.'}
            </p>
          </header>

          <section className="film-gallery-feature">
            {heroPhoto && (
              <figure className="film-gallery-hero-frame">
                <img
                  src={resolveAssetPath(baseUrl, heroPhoto.src)}
                  alt={heroPhoto.alt[language]}
                />
              </figure>
            )}
          </section>

          <section className="film-gallery-section py-16 md:py-24">
            <div className="film-gallery-section-head">
              <p className="film-gallery-kicker">{isZh ? 'Selected frames' : 'Selected frames'}</p>
              <h2 className="film-gallery-section-title font-display font-bold tracking-tight">
                {isZh ? '少一点说明，多一点停留。' : 'Less explanation. More looking.'}
              </h2>
            </div>
            <div className="film-gallery-grid mt-12">
              {secondaryPhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  className="film-gallery-frame"
                >
                  <img
                    src={resolveAssetPath(baseUrl, photo.src)}
                    alt={photo.alt[language]}
                    loading="lazy"
                  />
                </figure>
              ))}
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

const LifeOsIcon: React.FC<{ src: string; alt: string; size?: 'sm' | 'md' | 'lg' }> = ({ src, alt, size = 'md' }) => {
  const sizeClass = size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-10 w-10' : 'h-12 w-12';

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`life-os-icon-frame ${sizeClass} flex-none rounded-xl object-cover shadow-sm ring-1 ring-eden-mint/15`}
    />
  );
};

const LifeOsBanner: React.FC<{
  src: string;
  alt: string;
  label: string;
  caption: string;
  className?: string;
}> = ({ src, alt, label, caption, className = '' }) => (
  <figure className={`life-os-banner-frame relative mt-5 overflow-hidden rounded-xl shadow-sm ${className}`}>
    <div className="aspect-[16/9] w-full sm:aspect-[8/3]">
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </div>
    <figcaption className="life-os-banner-caption absolute inset-x-0 bottom-0 px-3 pb-3 pt-12 sm:px-4 sm:pb-4 sm:pt-16">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-eden-amber sm:text-[10px] sm:tracking-[0.28em]">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-stone-800 sm:text-sm">{caption}</p>
    </figcaption>
  </figure>
);

const lifeRpgSignalVisualKeys = {
  'WIND-57': 'wind',
  'PHASE-RULE': 'rule',
  'EXPLORE-05': 'explore',
  'BLADE-LIGHT': 'blade',
  'BODY-YES': 'body',
  ABSTRACT: 'abstract',
} as const;

const getLifeRpgSignalVisualKey = (code: string) =>
  lifeRpgSignalVisualKeys[code as keyof typeof lifeRpgSignalVisualKeys] ?? 'wind';

const LifeRpgSignalCssIcon: React.FC<{
  signal: (typeof lifeRpgDecodeSignals)[number];
  label: string;
}> = ({ signal, label }) => {
  const visualKey = getLifeRpgSignalVisualKey(signal.code);

  return (
    <div className={`life-rpg-signal-css-icon life-rpg-signal-${visualKey}`} role="img" aria-label={label}>
      <span className="life-rpg-signal-grid" />
      <span className="life-rpg-signal-arc life-rpg-signal-arc-a" />
      <span className="life-rpg-signal-arc life-rpg-signal-arc-b" />
      <span className="life-rpg-signal-vector life-rpg-signal-vector-a" />
      <span className="life-rpg-signal-vector life-rpg-signal-vector-b" />
      <span className="life-rpg-signal-node life-rpg-signal-node-a" />
      <span className="life-rpg-signal-node life-rpg-signal-node-b" />
      <span className="life-rpg-signal-node life-rpg-signal-node-c" />
      <span className="life-rpg-signal-icon-orbit" />
      <span className="life-rpg-signal-icon-mark" />
      <span className="life-rpg-signal-icon-core">{signal.emoji}</span>
    </div>
  );
};

const LifeRpgWindInfiltrationStrip: React.FC<{ label: string }> = ({ label }) => (
  <div className="life-rpg-wind-strip" role="img" aria-label={label}>
    <span className="life-rpg-wind-sea" />
    <span className="life-rpg-wind-wave life-rpg-wind-wave-a" />
    <span className="life-rpg-wind-wave life-rpg-wind-wave-b" />
    <span className="life-rpg-wind-mountain life-rpg-wind-mountain-a" />
    <span className="life-rpg-wind-mountain life-rpg-wind-mountain-b" />
    <span className="life-rpg-wind-mountain-snow life-rpg-wind-mountain-snow-a" />
    <span className="life-rpg-wind-mountain-snow life-rpg-wind-mountain-snow-b" />
    <span className="life-rpg-wind-island" />
    <span className="life-rpg-wind-beach" />
    <span className="life-rpg-wind-palm life-rpg-wind-palm-a" />
    <span className="life-rpg-wind-palm life-rpg-wind-palm-b" />
    <span className="life-rpg-wind-cloud-face">
      <span className="life-rpg-wind-cloud-highlight" />
      <span className="life-rpg-wind-cloud-eye life-rpg-wind-cloud-eye-a" />
      <span className="life-rpg-wind-cloud-eye life-rpg-wind-cloud-eye-b" />
      <span className="life-rpg-wind-cloud-nose" />
      <span className="life-rpg-wind-cloud-cheek life-rpg-wind-cloud-cheek-a" />
      <span className="life-rpg-wind-cloud-cheek life-rpg-wind-cloud-cheek-b" />
      <span className="life-rpg-wind-cloud-mouth" />
    </span>
    <span className="life-rpg-wind-cloud-puff life-rpg-wind-cloud-puff-a" />
    <span className="life-rpg-wind-cloud-puff life-rpg-wind-cloud-puff-b" />
    <span className="life-rpg-wind-cloud-puff life-rpg-wind-cloud-puff-c" />
    <span className="life-rpg-wind-cloud-breath life-rpg-wind-cloud-breath-a" />
    <span className="life-rpg-wind-cloud-breath life-rpg-wind-cloud-breath-b" />
    <span className="life-rpg-wind-cloud-breath life-rpg-wind-cloud-breath-c" />
    <span className="life-rpg-wind-spray life-rpg-wind-spray-a" />
    <span className="life-rpg-wind-spray life-rpg-wind-spray-b" />
  </div>
);

const LifeRpgRuleContractStrip: React.FC<{ label: string }> = ({ label }) => (
  <div className="life-rpg-contract-strip" role="img" aria-label={label}>
    <span className="life-rpg-contract-desk" />
    <span className="life-rpg-contract-paper">
      <span className="life-rpg-contract-line life-rpg-contract-line-a" />
      <span className="life-rpg-contract-line life-rpg-contract-line-b" />
      <span className="life-rpg-contract-line life-rpg-contract-line-c" />
      <span className="life-rpg-contract-signature">
        <span className="life-rpg-contract-sign-stroke life-rpg-contract-sign-stroke-a" />
        <span className="life-rpg-contract-sign-stroke life-rpg-contract-sign-stroke-b" />
        <span className="life-rpg-contract-sign-stroke life-rpg-contract-sign-stroke-c" />
        <span className="life-rpg-contract-sign-stroke life-rpg-contract-sign-stroke-d" />
      </span>
    </span>
    <span className="life-rpg-contract-pen" />
    <span className="life-rpg-contract-stamp">
      <span />
    </span>
    <span className="life-rpg-contract-seal" />
  </div>
);

const LifeOsWindEyeSigil: React.FC<{ label: string }> = ({ label }) => (
  <div className="life-os-wind-eye-sigil" role="img" aria-label={label}>
    <span className="life-os-wind-eye-aura aura-a" />
    <span className="life-os-wind-eye-aura aura-b" />
    <span className="life-os-wind-eye-geometry geometry-a" />
    <span className="life-os-wind-eye-geometry geometry-b" />
    <span className="life-os-wind-eye-geometry geometry-c" />
    <span className="life-os-wind-eye-orbit orbit-a" />
    <span className="life-os-wind-eye-orbit orbit-b" />
    <span className="life-os-wind-eye-tick tick-a" />
    <span className="life-os-wind-eye-tick tick-b" />
    <span className="life-os-wind-eye-tick tick-c" />
    <span className="life-os-wind-eye-tick tick-d" />
    <span className="life-os-wind-eye-blade blade-a" />
    <span className="life-os-wind-eye-blade blade-b" />
    <span className="life-os-wind-eye-blade blade-c" />
    <span className="life-os-wind-eye-diamond diamond-a" />
    <span className="life-os-wind-eye-diamond diamond-b" />
    <span className="life-os-wind-eye-diamond diamond-c" />
    <span className="life-os-wind-eye-thread thread-a" />
    <span className="life-os-wind-eye-thread thread-b" />
    <span className="life-os-wind-eye-thread thread-c" />
    <span className="life-os-wind-eye-thread thread-d" />
    <span className="life-os-wind-eye-core">
      <span className="life-os-wind-eye-pupil" />
    </span>
    <span className="life-os-wind-eye-dot dot-a" />
    <span className="life-os-wind-eye-dot dot-b" />
    <span className="life-os-wind-eye-dot dot-c" />
    <span className="life-os-wind-eye-dot dot-d" />
    <span className="life-os-wind-eye-mote mote-a" />
    <span className="life-os-wind-eye-mote mote-b" />
    <span className="life-os-wind-eye-mote mote-c" />
  </div>
);

const LifeOsHudShapes: React.FC<{ variant?: 'hero' | 'panel' }> = ({ variant = 'panel' }) => (
  <div aria-hidden="true" className="life-os-hud-shapes pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
    <span className="absolute left-4 top-4 h-8 w-8 border-l border-t border-eden-mint/35" />
    <span className="absolute right-4 top-4 h-8 w-8 border-r border-t border-eden-amber/35" />
    <span className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-eden-amber/25" />
    <span className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-eden-mint/25" />
    <span className="absolute left-8 bottom-8 h-px w-24 bg-gradient-to-r from-eden-mint/40 to-transparent" />
    <span className="absolute right-10 top-10 h-14 w-px bg-gradient-to-b from-eden-amber/35 to-transparent" />
    {variant === 'hero' && (
      <>
        <span className="absolute left-1/2 top-6 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-eden-mint/35 to-transparent" />
        <span className="absolute bottom-8 right-28 hidden h-12 w-12 rotate-45 border border-eden-amber/20 lg:block" />
        <span className="absolute left-10 top-1/2 grid -translate-y-1/2 grid-cols-1 gap-2">
          <span className="h-1 w-6 bg-eden-mint/30" />
          <span className="h-1 w-4 bg-eden-amber/30" />
          <span className="h-1 w-8 bg-stone-300/50" />
        </span>
      </>
    )}
  </div>
);

const LifeOsDropDown: React.FC<{
  id?: string;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}> = ({ id, index, eyebrow, title, body, children }) => (
  <section id={id} className="life-os-chapter scroll-mt-8 py-16 sm:py-20 md:py-24">
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
        {String(index).padStart(2, '0')} · {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-tight text-stone-900">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
        {body}
      </p>
    </div>
    <div className="mt-10 sm:mt-14">
      {children}
    </div>
  </section>
);

const LifeOsRadarPanel: React.FC<{
  stats: ReadonlyArray<{ key: string; value: number }>;
  ariaLabel: string;
  centerPrimary: string;
  centerSecondary: string;
  theme: Theme;
  tone?: 'mint' | 'amber';
  compact?: boolean;
  className?: string;
}> = ({ stats, ariaLabel, centerPrimary, centerSecondary, theme, tone = 'mint', compact = false, className = '' }) => {
  const isDarkTheme = theme === 'dark';
  const center = 110;
  const radius = 76;
  const accent = tone === 'mint' ? 'rgb(123,220,181)' : 'rgb(255,163,64)';
  const accentSoft = tone === 'mint' ? 'rgba(123,220,181,0.34)' : 'rgba(255,163,64,0.28)';
  const gridFill = isDarkTheme ? 'rgba(255,255,255,0.025)' : 'rgba(28,25,23,0.025)';
  const gridStroke = isDarkTheme ? 'rgba(214,211,209,0.22)' : 'rgba(87,83,78,0.2)';
  const axisStroke = isDarkTheme ? 'rgba(214,211,209,0.18)' : 'rgba(87,83,78,0.16)';
  const labelFill = isDarkTheme ? 'rgb(245,245,244)' : 'rgb(68,64,60)';
  const centerFill = isDarkTheme ? 'rgba(28,25,23,0.86)' : 'rgba(255,255,255,0.78)';
  const centerTextFill = isDarkTheme ? 'rgb(255,255,255)' : 'rgb(28,25,23)';
  const centerSubFill = isDarkTheme ? 'rgb(214,211,209)' : 'rgb(120,113,108)';
  const point = (index: number, value: number) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / stats.length;
    const scaledRadius = (radius * value) / 100;
    return `${center + Math.cos(angle) * scaledRadius},${center + Math.sin(angle) * scaledRadius}`;
  };
  const gridPoint = (index: number, scale: number) => point(index, scale);
  const shapePoints = stats.map((stat, index) => point(index, stat.value)).join(' ');
  const gradientId = `life-os-radar-${tone}-${stats.map((stat) => stat.key).join('-').toLowerCase()}`;

  return (
    <div className={`life-os-radar-frame relative mx-auto w-full ${compact ? 'max-w-[220px]' : 'max-w-[310px]'} overflow-hidden rounded-2xl p-2 shadow-inner sm:p-3 ${className}`}>
      <div className="life-os-radar-grid absolute inset-0 bg-[size:18px_18px] opacity-45" />
      <svg viewBox="0 0 220 220" role="img" aria-label={ariaLabel} className="relative h-auto w-full">
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={accentSoft} />
            <stop offset="100%" stopColor="rgba(209,171,91,0.04)" />
          </radialGradient>
        </defs>
        {[25, 50, 75, 100].map((scale) => (
          <polygon
            key={scale}
            points={stats.map((_, index) => gridPoint(index, scale)).join(' ')}
            fill={scale === 100 ? gridFill : 'none'}
            stroke={gridStroke}
            strokeWidth="1"
          />
        ))}
        {stats.map((_, index) => (
          <line
            key={index}
            x1={center}
            y1={center}
            x2={gridPoint(index, 100).split(',')[0]}
            y2={gridPoint(index, 100).split(',')[1]}
            stroke={axisStroke}
            strokeWidth="1"
          />
        ))}
        <polygon points={shapePoints} fill={`url(#${gradientId})`} stroke={accent} strokeWidth="2" />
        {stats.map((stat, index) => {
          const [x, y] = point(index, stat.value).split(',');
          const [labelX, labelY] = gridPoint(index, 117).split(',');

          return (
            <g key={stat.key}>
              <circle cx={x} cy={y} r="3.5" fill="rgb(209,171,91)" stroke="rgb(255,255,255)" strokeWidth="1" />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={labelFill}
                fontSize={compact ? '7' : '8'}
                fontWeight="800"
              >
                {stat.key}
              </text>
            </g>
          );
        })}
        <circle cx={center} cy={center} r={compact ? '21' : '24'} fill={centerFill} stroke="rgba(209,171,91,0.62)" />
        <text x={center} y={center - 2} textAnchor="middle" fill={centerTextFill} fontSize={compact ? '15' : '17'} fontWeight="800">
          {centerPrimary}
        </text>
        <text x={center} y={center + 13} textAnchor="middle" fill={centerSubFill} fontSize="7" letterSpacing="1.5">
          {centerSecondary}
        </text>
      </svg>
    </div>
  );
};

const LifeOsFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const powerScore = 86;
  const birthDate = new Date(1995, 11, 5);
  const maxLevel = 80;
  const today = new Date();
  const currentLevel =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ? 1
      : 0);
  const lifeOsGameMenu = [
    {
      href: '#life-os-character-file',
      icon: '🃏',
      code: '01',
      title: isZh ? '角色档案' : 'Character File',
      body: isZh ? '先看背景、身份和这套角色面板应该怎么阅读。' : 'Start with origin, identity, and how this character panel should be read.',
      action: isZh ? '进入档案' : 'Enter file',
      tone: 'amber',
    },
    {
      href: '#life-os-stats-console',
      icon: '📊',
      code: '02',
      title: isZh ? '数值控制台' : 'Stats Console',
      body: isZh ? '再看核心属性、隐藏参数、玩家信号和主线任务。' : 'Then read core stats, hidden parameters, player signals, and the main quest.',
      action: isZh ? '查看数值' : 'View stats',
      tone: 'mint',
    },
    {
      href: '#life-os-skill-codex',
      icon: '🛠️',
      code: '03',
      title: isZh ? '技能图鉴' : 'Skill Codex',
      body: isZh ? '主动技能、被动天赋和 Debuff 都在这里展开。' : 'Active spells, passive auras, and debuffs open here.',
      action: isZh ? '打开技能' : 'Open skills',
      tone: 'amber',
    },
    {
      href: '#life-os-upgrade-path',
      icon: '🌿',
      code: '04',
      title: isZh ? '升级路线' : 'Upgrade Path',
      body: isZh ? '最后看成长路线、分数逻辑和这套系统的边界。' : 'Finish with growth routes, score logic, and the system boundary.',
      action: isZh ? '查看路线' : 'View route',
      tone: 'mint',
    },
  ];

  return (
    <div className="life-os-open-layout page-shell min-h-screen text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-4 pb-16 pt-8 sm:px-6 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur transition-colors hover:border-eden-mint/60 hover:text-stone-900"
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

          <header className="life-os-editorial-hero py-16 text-center sm:py-20 md:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
              {isZh ? 'Life RPG Ability System' : 'Life RPG Ability System'}
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-[1.04] tracking-tight text-stone-900">
              {isZh ? '风之解析者' : 'Wind Pattern Analyst'}
            </h1>
            <p className="mx-auto mt-4 max-w-3xl font-display text-[clamp(1.25rem,3vw,2rem)] leading-[1.18] text-stone-700">
              {isZh
                ? '把混乱经验转成可使用系统的 RPG 人生地图。'
                : 'A Life RPG map for turning chaos into usable systems.'}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-base font-medium sm:text-lg">
              <a href="#life-os-skill-codex" className="text-eden-mint transition-colors hover:text-stone-900">
                {isZh ? '查看技能' : 'View skills'} &gt;
              </a>
              <a href="#life-os-upgrade-path" className="text-eden-amber transition-colors hover:text-stone-900">
                {isZh ? '查看路线' : 'View routes'} &gt;
              </a>
            </div>
            <figure className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[2rem] sm:mt-14">
              <LifeOsWindEyeSigil label={isZh ? '风之眼图腾透明底 CSS 动画' : 'Transparent CSS animation of a wind-eye sigil'} />
            </figure>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-y-5 text-center sm:grid-cols-4">
              {(isZh
                ? [
                    ['Level', `LV ${currentLevel} / ${maxLevel}`],
                    ['Power', `${powerScore} / 100`],
                    ['Class', '流浪策略师'],
                    ['Element', '风 + 金'],
                  ]
                : [
                    ['Level', `LV ${currentLevel} / ${maxLevel}`],
                    ['Power', `${powerScore} / 100`],
                    ['Class', 'Wandering Strategist'],
                    ['Element', 'Wind + Metal'],
                  ]
              ).map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">{label}</p>
                  <p className="mt-1 text-base font-medium text-stone-900 sm:text-lg">{value}</p>
                </div>
              ))}
            </div>
          </header>

          <nav className="life-os-editorial-nav mx-auto grid max-w-4xl grid-cols-2 gap-x-4 gap-y-3 py-8 text-center text-sm font-medium sm:grid-cols-4 sm:py-10">
            {lifeOsGameMenu.map((item) => (
              <a key={item.href} href={item.href} className="text-stone-600 transition-colors hover:text-stone-900">
                {item.title} &gt;
              </a>
            ))}
          </nav>

          <LifeOsDropDown
            id="life-os-character-file"
            index="01"
            eyebrow={isZh ? '角色档案' : 'Character File'}
            title={isZh ? '先读角色来源，再进入系统' : 'Read the character file before opening the system'}
            body={isZh ? '这一章负责回答：这个角色是谁、从什么场域成形、这套页面应该怎么读。' : 'This chapter answers who the character is, what field shaped it, and how to read the interface.'}
          >
          <section className="motion-card relative mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur sm:mt-6 sm:p-6">
            <LifeOsHudShapes variant="hero" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                🎴 {isZh ? '角色序章' : 'Character Brief'}
              </p>
              <div className="mt-3 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">
                    {isZh ? '风之解析者，不是从安稳路线里诞生的角色' : 'The Wind Pattern Analyst was not born from a stable route.'}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700">
                    {isZh
                      ? '背景不是稳定工作、固定路线和标准答案，而是长时间穿过复杂场域：商业增长的噪音、关系里的暗流、产品尚未成形的需求、以及生活里一再重复的模式。'
                      : 'The background is not stable work, fixed routes, and standard answers. It is a long walk through complex fields: growth noise, social undercurrents, unformed product needs, and patterns that keep repeating in life.'}
                  </p>
                  <p className="mt-3 rounded-xl border border-eden-amber/30 bg-eden-amber/10 px-4 py-3 text-sm leading-relaxed text-stone-800">
                    {isZh
                      ? '主线不是逃离混乱，而是把混乱翻译成地图：让洞察变成策略，让经历变成系统，让看不见的人性模式，变成可以被使用、测试和传播的力量。'
                      : 'The main quest is not to escape chaos. It is to translate chaos into maps: turn insight into strategy, experience into systems, and invisible human patterns into power that can be used, tested, and shared.'}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {(isZh
                      ? [
                          ['Entry', '混乱现场'],
                          ['Weapon', '观察、命名、重组'],
                          ['Element', 'Wind + Metal'],
                          ['Output', '系统、内容、策略'],
                        ]
                      : [
                          ['Entry', 'Noisy fields'],
                          ['Weapon', 'Observe, name, rebuild'],
                          ['Element', 'Wind + Metal'],
                          ['Output', 'Systems, content, strategy'],
                        ]
                    ).map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">{label}</p>
                        <p className="mt-1 font-semibold text-stone-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {lifeRpgWorldPrinciples.map((principle) => (
                    <article key={principle.title.en} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                      <h3 className="font-display text-lg font-bold text-stone-900">
                        {principle.emoji} {principle.title[language]}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-700">{principle.body[language]}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
          </LifeOsDropDown>

          <LifeOsDropDown
            id="life-os-stats-console"
            index="02"
            eyebrow={isZh ? '数值控制台' : 'Stats Console'}
            title={isZh ? '看懂角色如何运作' : 'Read how the character operates'}
            body={isZh ? '这一章集中放 Loadout、玩家信号、隐藏参数、阶段指令、主线任务和 8 个核心属性。' : 'This chapter contains loadout, player signals, hidden parameters, stage directives, main quest, and eight core stats.'}
          >
          <section className="motion-card relative mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur sm:mt-6 sm:p-6">
            <LifeOsHudShapes variant="hero" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                🎮 {isZh ? '角色解码控制台' : 'Character Decode Console'}
              </p>
              <div className="mt-4 grid gap-4 sm:gap-5 lg:grid-cols-[0.9fr_1.25fr_0.85fr]">
                <article className="rounded-2xl border border-eden-mint/25 bg-stone-50 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    🧾 {isZh ? '角色 Loadout' : 'Character Loadout'}
                  </p>
                  <figure className="life-os-loadout-css-frame mx-auto mt-4 max-w-[260px] lg:max-w-none">
                    <LifeOsWindEyeSigil
                      label={
                        isZh
                          ? '风之解析者角色 Loadout：风之眼图腾透明底 CSS 动画'
                          : 'Wind Pattern Analyst loadout: transparent CSS animation of a wind-eye sigil'
                      }
                    />
                  </figure>
                  <h2 className="mt-4 font-display text-2xl font-bold text-stone-900 sm:text-3xl">
                    {isZh ? '风之解析者' : 'Wind Pattern Analyst'}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700">
                    {isZh
                      ? '不是“被定义成什么”，而是一个以风的方式进入世界，用金属般的结构感切割混乱，把经验转成系统、内容和策略的角色。'
                      : 'Not a fixed identity label. A character who enters through wind, cuts chaos with metal-like structure, and converts experience into systems, content, and strategy.'}
                  </p>
                  <div className="mt-4 grid gap-2 text-xs">
                    {(isZh
                      ? [
                          ['Class', 'Wandering Strategist / 流浪策略师'],
                          ['Element', 'Wind + Metal / 风 + 金'],
                          ['Alignment', 'Chaotic Insightful / 混沌洞察型'],
                          ['Main Quest', '把玩家日志、商业策略和人性洞察转成可使用的人生系统'],
                        ]
                      : [
                          ['Class', 'Wandering Strategist'],
                          ['Element', 'Wind + Metal'],
                          ['Alignment', 'Chaotic Insightful'],
                          ['Main Quest', 'Turn player logs, business strategy, and human insight into a usable life system'],
                        ]
                    ).map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-stone-200 bg-white px-3 py-2">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-stone-500">{label}</p>
                        <p className="mt-1 font-medium text-stone-800">{value}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-eden-amber/30 bg-eden-amber/10 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    🧩 {isZh ? '玩家信号 → RPG 模组' : 'Player Signals -> RPG Modules'}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {lifeRpgDecodeSignals.map((signal) => (
                      <div key={signal.code} className="life-rpg-signal-card overflow-hidden rounded-xl border border-stone-200 bg-white p-4">
                        {signal.code === 'WIND-57' && (
                          <LifeRpgWindInfiltrationStrip
                            label={isZh ? '轻量渗透型风格：风吹过后渗透进结构' : 'Soft Infiltration Style: wind passes through and infiltrates the structure'}
                          />
                        )}
                        {signal.code === 'PHASE-RULE' && (
                          <LifeRpgRuleContractStrip
                            label={isZh ? '规则制定阶段：签署规则契约' : 'Rule-Setter Phase: signing the rule contract'}
                          />
                        )}
                        <div className="life-rpg-signal-card-head flex items-center gap-3">
                          {signal.code !== 'WIND-57' && signal.code !== 'PHASE-RULE' && (
                            <LifeRpgSignalCssIcon signal={signal} label={signal.title[language]} />
                          )}
                            <div>
                              <h3 className="font-display text-base font-bold text-stone-900">{signal.title[language]}</h3>
                              <p className="font-mono text-[10px] uppercase tracking-wider text-stone-500">{signal.code}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-stone-600">📡 {signal.signal[language]}</p>
                        <p className="mt-2 text-xs leading-relaxed text-stone-800">🔓 {signal.output[language]}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-eden-mint/25 bg-eden-mint/10 p-3 sm:p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    🕹️ {isZh ? '隐藏参数' : 'Hidden Parameters'}
                  </p>
                  <div className="mt-3 grid gap-3">
                    <LifeOsRadarPanel
                      stats={lifeRpgHiddenParameters}
                      ariaLabel={isZh ? '隐藏参数雷达图' : 'Hidden parameters radar chart'}
                      centerPrimary="4"
                      centerSecondary="PARAMS"
                      theme={theme}
                      tone="amber"
                      compact
                    />
                    <div className="grid grid-cols-2 gap-2">
                      {lifeRpgHiddenParameters.map((param) => (
                        <div key={param.key} title={param.note[language]} className="rounded-xl border border-stone-200 bg-white px-2.5 py-2">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">{param.key}</p>
                            <p className="font-mono text-sm font-bold text-stone-900">{param.value}</p>
                          </div>
                          <p className="mt-1 truncate text-xs font-semibold text-stone-900">{param.label[language]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </div>

              <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:mt-5 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  🗺️ {isZh ? '当前阶段指令 · 规则制定期' : 'Current Stage Directive · Rule-Setter Phase'}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {lifeRpgQuestDirectives.map((directive, index) => (
                    <div key={directive.en} className="rounded-xl border border-stone-200 bg-white p-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                        QUEST-{String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-stone-700">{directive[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="motion-card relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur sm:p-6">
              <LifeOsHudShapes />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                🗺️ {isZh ? '主线任务' : 'Main Quest'}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-stone-900">
                {isZh ? '把分散能力收束成一个可传播系统' : 'Turn scattered ability into a transmissible system'}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                {isZh
                  ? '真正的问题不是没有能力，而是能力太分散。主线任务是把看穿人性、经历混乱、追求自由、探索世界和研究商业系统的能力，转化成别人能理解、使用和传播的人生系统。'
                  : 'The real problem is not lack of ability. It is scattered ability. The main quest is to turn human insight, chaos experience, freedom seeking, world exploration, and business systems into a life system other people can understand, use, and share.'}
              </p>
            </div>

            <div className="motion-card relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-3 shadow-sm backdrop-blur sm:p-4">
              <LifeOsHudShapes />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                📊 {isZh ? '核心属性' : 'Core Stats'}
              </p>
              <div className="mt-3 grid gap-3 xl:grid-cols-[0.7fr_1.3fr]">
                <LifeOsRadarPanel
                  stats={lifeRpgAttributes}
                  ariaLabel={isZh ? '核心属性雷达图' : 'Core stats radar chart'}
                  centerPrimary="8"
                  centerSecondary="CORE"
                  theme={theme}
                  tone="mint"
                  compact
                />
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
                  {lifeRpgAttributes.map((attr) => (
                    <div key={attr.key} title={attr.note[language]} className="rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">{attr.key}</p>
                        <p className="font-mono text-sm font-bold text-stone-900">{attr.value}</p>
                      </div>
                      <p className="mt-1 truncate text-xs font-semibold text-stone-900">{attr.label[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          </LifeOsDropDown>

          <LifeOsDropDown
            id="life-os-skill-codex"
            index="03"
            eyebrow={isZh ? '技能图鉴' : 'Skill Codex'}
            title={isZh ? '打开技能、天赋和阴影档案' : 'Open spells, auras, and shadow files'}
            body={isZh ? '这一章像手机游戏技能页：先看卡面，再点击展开完整技能说明。' : 'This chapter works like a mobile game skill page: card face first, full file on tap.'}
          >
          <section className="motion-card relative mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur sm:mt-6 sm:p-6">
            <LifeOsHudShapes />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                  🛠️ {isZh ? '主动技能' : 'Active Skills'}
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-700">
                  {isZh
                    ? '主动发动的技能。卡面显示等级、类型和技能图，点开后查看完整战斗说明。'
                    : 'Castable skills. The card face shows rank, type, and art. Open it for the full combat file.'}
                </p>
              </div>
              <div className="life-os-skill-tabs flex rounded-2xl p-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600">
                {['Active', 'Passive', 'Shadow'].map((tab, index) => (
                  <span
                    key={tab}
                    className={`rounded-xl px-2.5 py-1.5 ${index === 0 ? 'bg-eden-amber text-stone-950' : ''}`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative z-10 mt-4 grid gap-3 md:grid-cols-2">
              {lifeRpgActiveSkills.map((skill) => (
                <details
                  key={skill.name.en}
                  className="life-os-codex-card group overflow-hidden rounded-2xl border border-eden-amber/30 shadow-sm"
                >
                  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <figure className="relative overflow-hidden">
                      <img
                        src={skill.banner}
                        alt={isZh ? `${skill.name.zh} 技能横幅` : `${skill.name.en} skill banner`}
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover"
                      />
                      <div className="life-os-image-overlay absolute inset-0" />
                      <div className="absolute left-3 top-3 flex items-center gap-2">
                        <LifeOsIcon src={skill.icon} alt={skill.name[language]} size="sm" />
                        <span className="rounded-lg border border-eden-amber/40 bg-eden-amber px-2 py-1 font-mono text-xs font-bold text-stone-950">
                          {skill.level}
                        </span>
                      </div>
                      <div className="life-os-active-skill-copy absolute inset-x-0 bottom-0 p-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-eden-amber">
                          {skill.level} ACTIVE SPELL
                        </p>
                        <h3 className="mt-1 font-display text-xl font-bold text-stone-900">✦ {skill.name[language]}</h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">{skill.bannerCaption[language]}</p>
                      </div>
                    </figure>
                    <div className="life-os-card-footer flex items-center justify-between gap-3 px-3 py-3 text-xs text-stone-600">
                      <span className="uppercase tracking-wider">{skill.type[language]}</span>
                      <span className="rounded-full border border-stone-300/60 px-2 py-1 font-mono text-[10px] text-stone-700 group-open:border-stone-600 group-open:bg-stone-800 group-open:text-stone-100">
                        {isZh ? '展开' : 'Open'}
                      </span>
                    </div>
                  </summary>
                  <dl className="grid gap-2 border-t border-stone-200 bg-white p-3 text-sm sm:p-4">
                    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3"><dt className="text-stone-500">🔋 {isZh ? '消耗' : 'Cost'}</dt><dd className="mt-1 text-stone-800">{skill.cost[language]}</dd></div>
                    <div className="rounded-xl border border-eden-mint/25 bg-eden-mint/10 p-3"><dt className="text-stone-500">✨ {isZh ? '效果' : 'Effect'}</dt><dd className="mt-1 text-stone-800">{skill.effect[language]}</dd></div>
                    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3"><dt className="text-stone-500">🎯 {isZh ? '适合场景' : 'Best used in'}</dt><dd className="mt-1 text-stone-700">{skill.scene[language]}</dd></div>
                    <div className="rounded-xl border border-eden-amber/30 bg-eden-amber/10 p-3"><dt className="text-stone-500">⚠️ {isZh ? '副作用' : 'Side effect'}</dt><dd className="mt-1 text-stone-700">{skill.sideEffect[language]}</dd></div>
                  </dl>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
            <div className="motion-card relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur sm:p-6">
              <LifeOsHudShapes />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                🌬️ {isZh ? '被动技能' : 'Passive Skills'}
              </p>
              <LifeOsBanner
                src={lifeOsBanners.passiveSkills}
                alt={isZh ? '猫主题复古魔法被动技能横幅' : 'Cat-themed vintage magic passive skills banner'}
                label={isZh ? 'PASSIVE AURA FILE' : 'PASSIVE AURA FILE'}
                caption={isZh ? '不需要刻意发动的能力。像熟睡的魔法猫，后台一直运行。' : 'Talents that do not need to be cast. Quiet background magic that keeps running.'}
              />
              <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5">
                {lifeRpgPassiveSkills.map((skill) => (
                  <details key={skill.name.en} className="life-os-codex-card group overflow-hidden rounded-2xl border border-eden-mint/25 shadow-sm">
                    <summary className="cursor-pointer list-none p-3 text-center [&::-webkit-details-marker]:hidden">
                      <div className="mx-auto w-fit rounded-2xl border border-eden-mint/25 bg-eden-mint/10 p-2">
                        <LifeOsIcon src={skill.icon} alt={skill.name[language]} size="md" />
                      </div>
                      <h3 className="mt-3 font-display text-sm font-bold leading-tight text-stone-900 sm:text-base">🌬️ {skill.name[language]}</h3>
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-eden-mint group-open:text-eden-amber">
                        {isZh ? '被动常驻' : 'Passive Aura'}
                      </p>
                    </summary>
                    <div className="border-t border-stone-200 bg-white p-3 text-xs leading-relaxed">
                      <p className="text-stone-500">{isZh ? '触发' : 'Trigger'} · {skill.trigger[language]}</p>
                      <p className="mt-2 text-stone-800">✨ {skill.effect[language]}</p>
                      <p className="mt-2 rounded-lg border border-eden-amber/25 bg-eden-amber/10 px-2 py-1.5 text-stone-700">
                        ⚠️ {isZh ? '隐藏风险' : 'Hidden risk'} · {skill.risk[language]}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="motion-card relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur sm:p-6">
              <LifeOsHudShapes />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                ⚠️ {isZh ? 'Debuff 阴影系统' : 'Debuff System'}
              </p>
              <LifeOsBanner
                src={lifeOsBanners.debuffs}
                alt={isZh ? '猫主题复古魔法 Debuff 阴影横幅' : 'Cat-themed vintage magic debuff shadow banner'}
                label={isZh ? 'SHADOW CURSE FILE' : 'SHADOW CURSE FILE'}
                caption={isZh ? '限制角色的阴影入口。不是失败，是等待解除和升级的诅咒。' : 'Shadow entries that limit the build. Not failure, but a curse waiting to be released and upgraded.'}
              />
              <div className="mt-4 grid gap-3 sm:mt-5">
                {lifeRpgDebuffs.map((debuff) => (
                  <details key={debuff.name.en} className="life-os-codex-card group overflow-hidden rounded-2xl border border-eden-amber/30 shadow-sm">
                    <summary className="grid cursor-pointer grid-cols-[64px_1fr_auto] items-center gap-3 p-3 [&::-webkit-details-marker]:hidden">
                      <LifeOsIcon src={debuff.icon} alt={debuff.name[language]} size="md" />
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-eden-amber">
                          {isZh ? 'Shadow Debuff' : 'Shadow Debuff'}
                        </p>
                        <h3 className="mt-1 font-display text-base font-bold text-stone-900">🕳️ {debuff.name[language]}</h3>
                      </div>
                      <span className="rounded-full border border-stone-300/60 px-2 py-1 font-mono text-[10px] text-stone-600 group-open:border-stone-600 group-open:bg-stone-800 group-open:text-stone-100">
                        !!
                      </span>
                    </summary>
                    <div className="grid gap-2 border-t border-stone-200 bg-white p-3 text-xs leading-relaxed text-stone-700">
                      <p className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1.5">{isZh ? '触发条件' : 'Trigger'} · {debuff.trigger[language]}</p>
                      <p className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1.5">⚠️ {isZh ? '负面效果' : 'Negative effect'} · {debuff.negative[language]}</p>
                      <p className="rounded-lg border border-eden-mint/25 bg-eden-mint/10 px-2 py-1.5">🔧 {isZh ? '解除方式' : 'Release'} · {debuff.release[language]}</p>
                      <p className="rounded-lg border border-eden-amber/25 bg-eden-amber/10 px-2 py-1.5 text-stone-800">⬆️ {isZh ? '升级后转化' : 'Upgraded into'} · {debuff.upgrade[language]}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
          </LifeOsDropDown>

          <LifeOsDropDown
            id="life-os-upgrade-path"
            index="04"
            eyebrow={isZh ? '升级路线' : 'Upgrade Path'}
            title={isZh ? '决定下一步怎么升级' : 'Decide the next upgrade move'}
            body={isZh ? '这一章放成长路线、数值逻辑和系统边界。重点不是贴标签，而是找到下一步。' : 'This chapter contains growth routes, score logic, and system boundaries. The point is not labels, but the next move.'}
          >
          <section className="motion-card relative mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur sm:mt-6 sm:p-6">
            <LifeOsHudShapes />
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                  🌿 {isZh ? '成长路线 Skill Tree' : 'Growth Routes Skill Tree'}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {isZh ? '每条路线像手游升级线：上方是路线守护图，下方是可升级节点。' : 'Each route reads like a mobile RPG upgrade lane: guardian art first, upgrade nodes below.'}
                </p>
              </div>
              <span className="life-os-route-badge hidden rounded-2xl px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-700 sm:inline-flex">
                4 Routes
              </span>
            </div>
            <div className="relative z-10 mt-4 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
              {lifeRpgSkillTrees.map((tree) => (
                <article key={tree.title.en} className="life-os-route-card overflow-hidden rounded-2xl border border-eden-mint/25 shadow-sm">
                  <div className="life-os-route-art relative aspect-square overflow-hidden border-b border-eden-mint/20">
                    <img
                      src={tree.banner}
                      alt={`${tree.title[language]} ${isZh ? '成长路线方形视觉' : 'growth route square banner'}`}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="life-os-route-overlay absolute inset-x-0 bottom-0 min-h-[72px] p-3">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-eden-amber">
                        {isZh ? 'SKILL TREE ROUTE' : 'SKILL TREE ROUTE'}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-stone-900">🧭 {tree.title[language]}</h3>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="relative ml-2 grid gap-3 border-l border-eden-mint/30 pl-4">
                      {tree.path[language].split(isZh ? ' → ' : ' -> ').map((node, index, nodes) => (
                        <div key={node} className="relative">
                          <span
                            className={`absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border ${
                              index === nodes.length - 1
                                ? 'border-eden-amber bg-eden-amber shadow-[0_0_18px_rgba(255,163,64,0.6)]'
                                : 'border-eden-mint bg-white shadow-[0_0_12px_rgba(123,220,181,0.35)]'
                            }`}
                          />
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-stone-500">
                            NODE-{String(index + 1).padStart(2, '0')}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-stone-800">{node}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs leading-relaxed text-stone-700">
                      {tree.directions[language]}
                    </p>
                    <p className="mt-2 rounded-xl border border-eden-amber/30 bg-eden-amber/10 px-3 py-2 text-xs leading-relaxed text-eden-amber">
                      ⚠️ {isZh ? '主要风险' : 'Main risk'} · {tree.risk[language]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="motion-card relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur sm:p-6">
              <LifeOsHudShapes />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                📜 {isZh ? '玩家信号与数值转换逻辑' : 'Player Signals and Score Logic'}
              </p>
              <div className="mt-4 rounded-xl border border-eden-mint/25 bg-eden-mint/10 p-3 sm:p-4">
                <p className="font-mono text-xs leading-relaxed text-stone-800 sm:text-sm">
                  {isZh
                    ? '能力分数 = 基础倾向 + 重复信号加权 + 现实校准 - 冲突修正'
                    : 'Ability score = base tendency + repeated-signal weight + real-life calibration - conflict correction'}
                </p>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-stone-700">
                {lifeRpgSources.map((source) => (
                  <li key={source.en} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-eden-mint" />
                    <span>{source[language]}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                {isZh
                  ? '现实经历权重最高。所有抽象系统都必须经过真实选择、关系模式、赚钱方式、行动惯性和阶段变化校准。'
                  : 'Real experience carries the highest weight. Every abstract system must be calibrated against real choices, relationship patterns, earning style, action inertia, and life stages.'}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
                {lifeRpgFormulaExamples.map((example) => (
                  <article key={example.title.en} className="rounded-xl border border-eden-amber/30 bg-eden-amber/10 p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-bold text-stone-900">🧮 {example.title[language]}</h3>
                      <span className="font-mono text-lg font-bold text-stone-900">{example.score}/100</span>
                    </div>
                    <ul className="mt-3 space-y-1 text-xs leading-relaxed text-stone-600">
                      {example.lines[language].map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="motion-card relative overflow-hidden rounded-2xl border border-eden-amber/30 bg-white p-4 shadow-sm backdrop-blur sm:p-6">
              <LifeOsHudShapes />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                🔒 {isZh ? '免责声明' : 'Disclaimer'}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-stone-900">
                {isZh ? '不是标签结论，是升级地图' : 'Not a label verdict. An upgrade map.'}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">
                {isZh
                  ? '这不是人格标签，也不是固定结论。它是一张帮助用户看懂自己如何运作的 RPG 地图。'
                  : 'This is not a personality label or a fixed verdict. It is a RPG map for understanding how a character works.'}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone-700">
                {(isZh
                  ? [
                      '不是为了证明任何结局。',
                      '不是为了把人困在标签里。',
                      '重点是看见初始属性、主线任务、隐藏 Debuff 和成长路线。',
                      '最终问题不是“我是什么”，而是“下一步怎么升级”。',
                    ]
                  : [
                      'It is not built to prove any fixed ending.',
                      'It is not built to trap people inside a label.',
                      'The focus is initial stats, main quests, hidden debuffs, and growth routes.',
                      'The final question is not “what am I?” It is “what is the next upgrade move?”',
                    ]
                ).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-eden-amber" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          </LifeOsDropDown>
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
    name: { en: 'Eden Mint', zh: 'Eden Mint' },
    hex: { light: '#7bdcb5', dark: '#7bdcb5' },
    role: { en: 'Primary brand color', zh: '主品牌色' },
    usage: {
      en: 'Primary brand signal.',
      zh: '主品牌信号。',
    },
  },
  {
    name: { en: 'Eden Pink', zh: 'Eden Pink' },
    hex: { light: '#dc6f82', dark: '#dc6f82' },
    role: { en: 'Primary brand color', zh: '主品牌色' },
    usage: {
      en: 'Warm primary counterpart.',
      zh: '温暖的主色对位。',
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
      en: 'Two columns desktop. One column mobile.',
      zh: '桌面两栏，手机一栏。',
    },
  },
  {
    title: { en: 'Horizontal whitespace', zh: '左右留白' },
    copy: {
      en: 'Keep the content island narrow.',
      zh: '内容岛保持窄一点。',
    },
  },
] as const;

const brandGuideLayoutRules = [
  {
    title: { en: 'Radius is a scale', zh: '圆角是一套 scale' },
    copy: {
      en: 'Small, medium, large. Do not improvise.',
      zh: '小、中、大。不要临场乱调。',
    },
  },
  {
    title: { en: 'Whitespace leads', zh: '留白是主体' },
    copy: {
      en: 'Give every section room.',
      zh: '每个 section 都要留空间。',
    },
  },
  {
    title: { en: 'Neutral canvas first', zh: '中性底色优先' },
    copy: {
      en: 'Start with white, soft gray, and black.',
      zh: '先用白、浅灰、黑。',
    },
  },
  {
    title: { en: 'Color comes from content', zh: '颜色来自真实内容' },
    copy: {
      en: 'Color should mean something.',
      zh: '颜色要有意义。',
    },
  },
  {
    title: { en: 'Copy stays short', zh: '文案极短' },
    copy: {
      en: 'Cut every extra sentence.',
      zh: '删掉多余句子。',
    },
  },
  {
    title: { en: 'Components stay light', zh: '组件保持轻' },
    copy: {
      en: 'No heavy borders. No card inside card.',
      zh: '不要重边框，不要 card 套 card。',
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
    value: { en: '1200px+', zh: '1200px+' },
    label: { en: 'Minimum width for hero visuals.', zh: 'Hero 大图建议最小宽度。' },
  },
] as const;

const brandGuideVoicePairs = [
  {
    avoid: { en: 'I am good at marketing and AI.', zh: '我很擅长营销和 AI。' },
    prefer: {
      en: 'Turn messy signals into a usable system.',
      zh: '把混乱线索变成可用系统。',
    },
  },
  {
    avoid: { en: 'A visionary brand.', zh: '一个有远见的品牌。' },
    prefer: {
      en: 'A builder archive for systems and notes.',
      zh: '一个系统和笔记的 builder archive。',
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
    copy: { en: 'Start with the main belief.', zh: '从核心信念开始。' },
  },
  {
    title: { en: 'Projects', zh: 'Projects' },
    copy: { en: 'Show problem, system, output.', zh: '展示问题、系统、产出。' },
  },
  {
    title: { en: 'System Pages', zh: 'System Pages' },
    copy: { en: 'Keep the concept clear.', zh: '概念保持清楚。' },
  },
  {
    title: { en: 'Build Notes', zh: 'Build Notes' },
    copy: { en: 'Start with the real problem.', zh: '从真实问题开始。' },
  },
] as const;

const brandGuideCategories = [
  {
    name: { en: 'Foundation', zh: '基础层' },
    scope: { en: 'Start here', zh: '先看这里' },
    items: {
      en: ['Core philosophy', 'Design rules', 'Layout numbers'],
      zh: ['核心哲学', '设计规则', '版式数字'],
    },
  },
  {
    name: { en: 'Surface system', zh: '表层系统' },
    scope: { en: 'Build the page', zh: '用于页面搭建' },
    items: {
      en: ['Visual system', 'Typography', 'Motion boundaries'],
      zh: ['视觉系统', '字体层级', '动效边界'],
    },
  },
  {
    name: { en: 'Content usage', zh: '内容用法' },
    scope: { en: 'Apply by page type', zh: '按页面类型使用' },
    items: {
      en: ['Homepage', 'Project pages', 'Wiki notes', 'Story logs'],
      zh: ['首页', '项目页', '知识库笔记', '故事记录'],
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
    title: { en: 'Quiet page entry', zh: '安静入场' },
    copy: {
      en: 'Keep entry motion short.',
      zh: '入场动效要短。',
    },
  },
  {
    title: { en: 'Motion must belong to the build', zh: '动效要属于产品' },
    copy: {
      en: 'Motion must explain the product.',
      zh: '动效要解释产品。',
    },
  },
  {
    title: { en: 'Preserve reduced motion', zh: '保留 reduced motion' },
    copy: {
      en: 'Support `prefers-reduced-motion`.',
      zh: '支持 `prefers-reduced-motion`。',
    },
  },
] as const;

const brandGuideCssRules = [
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
    title: { en: 'Rails belong on outlines', zh: '线条放在 box outline' },
    copy: {
      en: 'Keep rails on the outline.',
      zh: '线条放在外框上。',
    },
  },
  {
    title: { en: 'CSS icons over emoji', zh: 'Title icon 用 CSS' },
    copy: {
      en: 'Use CSS icons, not emoji.',
      zh: '用 CSS icon，不用 emoji。',
    },
  },
] as const;

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
                ? '清楚、克制、可信。'
                : 'Clear. Calm. Trustworthy.'}
            </p>
            <p className="brand-guide-hero-copy mx-auto mt-5">
              {isZh
                ? '先讲清楚，再设计。'
                : 'Say it clearly. Then design it.'}
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
                <p className="brand-guide-signature-label">{isZh ? 'Core line' : 'Core line'}</p>
                <p className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  Build order from complexity.
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
                  {isZh ? '少一点，准一点。' : 'Less, but sharper.'}
                </h3>
              </div>
              <p>
                {isZh
                  ? '每个 section 只做一件事。'
                  : 'Each section does one job.'}
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
                  ? 'Mint 和 Pink 是主色。Dream Purple 是行动色。'
                  : 'Mint and Pink are primary. Dream Purple is action.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="brand-guide-color-board">
                {brandGuidePalette.map((row) => (
                  <article key={row.hex} className="brand-guide-swatch">
                    <span className="brand-guide-swatch-chip" style={{ backgroundColor: row.hex }} />
                    <div>
                      <p className="brand-guide-card-index">{row.hex}</p>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{row.role[language]}</h3>
                      <p>{row.usage[language]}</p>
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
                      <h3 className="font-display text-2xl font-bold tracking-tight">{row.role[language]}</h3>
                      <p>{row.usage[language]}</p>
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
                  ? '先问题，再系统，再结果。'
                  : 'Problem. System. Result.'}
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
              <p className="brand-guide-kicker">{isZh ? 'Current CSS rules' : 'Current CSS rules'}</p>
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
              ? '最后更新以代码库和 log 为准。'
              : 'Latest source: repo and `log.md`.'}
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
  const fullPageHref = joinBasePath(baseUrl, 'jiju-pet');
  const projectsHref = joinBasePath(baseUrl, 'projects');
  const etReportHubHref = joinBasePath(baseUrl, 'etreporthub');
  const etReportHubSalesHref = joinBasePath(baseUrl, 'etreporthub-sales');
  const pokerHref = joinBasePath(baseUrl, 'poker');
  const crmHref = joinBasePath(baseUrl, 'crm');
  const previousProjectsHref = joinBasePath(baseUrl, 'previous-projects');
  const analogTechHref = joinBasePath(baseUrl, 'analog-tech');
  const lifeOsHref = joinBasePath(baseUrl, 'life-os');
  const lifeHref = joinBasePath(baseUrl, 'life');
  const brandGuideHref = joinBasePath(baseUrl, 'brand-guide');
  const topicsHref = joinBasePath(baseUrl, 'topics');
  const conwayHref = joinBasePath(baseUrl, 'conways-game-of-life');
  const resumeHref = 'https://drive.google.com/uc?export=download&id=1PRXj4BwpeAX_7F9H2PJumG0slIEZmLZ0';
  const homeHref = baseUrl;
  const homeSystemFiles: Array<{ title: string; href: string; cta: string; visual?: 'blueprint' | 'jiju' | 'life-magic' }> = isZh
    ? [
        { title: 'Projects Hub', href: projectsHref, cta: '看项目系统', visual: 'blueprint' },
        { title: 'Jiju Knowledge System', href: fullPageHref, cta: '看 Jiju 复盘', visual: 'jiju' },
        { title: 'Life OS RPG System', href: lifeOsHref, cta: '打开 Life OS', visual: 'life-magic' },
      ]
    : [
        { title: 'Projects Hub', href: projectsHref, cta: 'View systems', visual: 'blueprint' },
        { title: 'Jiju Knowledge System', href: fullPageHref, cta: 'Read Jiju review', visual: 'jiju' },
        { title: 'Life OS RPG System', href: lifeOsHref, cta: 'Open Life OS', visual: 'life-magic' },
      ];
  const homeInterestLinks: Array<{ title: string; href: string; visual?: 'bagua-mirror' | 'gramophone' | 'power-up' | 'pyramid-break' | 'archive-evolution' }> = isZh
    ? [
        { title: 'Life OS', href: lifeOsHref, visual: 'power-up' },
        { title: 'Analog Tech', href: analogTechHref, visual: 'gramophone' },
        { title: 'Topic Board', href: topicsHref, visual: 'archive-evolution' },
        { title: 'Pattern Archive', href: 'https://edent95.github.io/8g/', visual: 'bagua-mirror' },
        { title: "Conway's Game of Life", href: conwayHref, visual: 'pyramid-break' },
      ]
    : [
        { title: 'Life OS', href: lifeOsHref, visual: 'power-up' },
        { title: 'Analog Tech', href: analogTechHref, visual: 'gramophone' },
        { title: 'Topic Board', href: topicsHref, visual: 'archive-evolution' },
        { title: 'Pattern Archive', href: 'https://edent95.github.io/8g/', visual: 'bagua-mirror' },
        { title: "Conway's Game of Life", href: conwayHref, visual: 'pyramid-break' },
      ];
  const currentPath = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/';
  const normalizedBase = normalizePath(baseUrl);
  const pathWithoutBase =
    normalizedBase !== '/' && currentPath.startsWith(normalizedBase)
      ? normalizePath(currentPath.slice(normalizedBase.length))
      : currentPath;
  const isJijuPetFullPage = pathWithoutBase === '/jiju-pet';
  const isJijuRevampFullPage = pathWithoutBase === '/jiju-revamp';
  const isProjectsFullPage = pathWithoutBase === '/projects';
  const isProjectCssGalleryPage = pathWithoutBase === '/project-css';
  const isETReportHubFullPage = pathWithoutBase === '/etreporthub';
  const isETReportHubSalesPage = pathWithoutBase === '/etreporthub-sales';
  const isPokerFullPage = pathWithoutBase === '/poker';
  const wikiSlug = pathWithoutBase.startsWith('/wiki/')
    ? pathWithoutBase.replace('/wiki/', '')
    : '';
  const activeWikiEntry = wikiEntries.find((item) => item.slug === wikiSlug);
  const isWikiPage = pathWithoutBase === '/wiki' || Boolean(activeWikiEntry);
  const isCrmFullPage = pathWithoutBase === '/crm';
  const isPreviousProjectsFullPage = pathWithoutBase === '/previous-projects';
  const isAnalogTechFullPage = pathWithoutBase === '/analog-tech';
  const isLifeOsFullPage = pathWithoutBase === '/life-os';
  const isLifeFullPage = pathWithoutBase === '/life';
  const isBrandGuideFullPage = pathWithoutBase === '/brand-guide';
  const isTopicsFullPage = pathWithoutBase === '/topics';
  const isConwayGameOfLifeFullPage = pathWithoutBase === '/conways-game-of-life';
  const archivedWorkSlug = pathWithoutBase.startsWith('/archive/')
    ? pathWithoutBase.replace('/archive/', '')
    : '';
  const activeArchivedWork = archivedWorks.find((item) => item.slug === archivedWorkSlug);

  React.useEffect(() => {
    applyPageSeo(pathWithoutBase, language, activeArchivedWork);
  }, [pathWithoutBase, language, activeArchivedWork]);

  if (isJijuPetFullPage) {
    return (
      <JijuPetFullPage
        homeHref={homeHref}
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

  if (isProjectsFullPage) {
    return (
      <ProjectsFullPage
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

  if (isCrmFullPage) {
    return (
      <CrmFullPage
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

  if (isPreviousProjectsFullPage) {
    return (
      <PreviousProjectsFullPage
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

  if (isAnalogTechFullPage) {
    return (
      <AnalogTechFullPage
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

  if (isConwayGameOfLifeFullPage) {
    return (
      <ConwayGameOfLifeFullPage
        homeHref={homeHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
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
    <div className="page-shell home-editorial-page min-h-screen font-sans selection:bg-eden-mint/30 selection:text-stone-900">
      <nav className="home-editorial-nav fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <a href={homeHref} className="font-display text-lg font-bold tracking-tight">
            Eden Tan
          </a>
          <div className="flex items-center gap-3">
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="home-editorial-resume hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold sm:flex"
            >
              <Download size={16} />
              <span>{isZh ? '简历' : 'Resume'}</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="px-5 pb-20 pt-24 md:px-8">
        <motion.section
          className="home-hero mx-auto max-w-6xl py-12 text-center md:py-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.p variants={fadeIn} className="home-kicker mx-auto inline-flex items-center gap-2">
            <MapPin size={14} />
            {isZh ? 'Malaysia · Knowledge systems · Product logic · AI workflows' : 'Malaysia · Knowledge systems · Product logic · AI workflows'}
          </motion.p>
          <motion.h1 variants={fadeIn} className="home-hero-title mx-auto mt-5 font-display font-bold tracking-tight">
            {isZh ? 'Knowledge should compound.' : 'Knowledge should compound.'}
          </motion.h1>
          <motion.p variants={fadeIn} className="home-hero-subtitle mx-auto mt-4 font-display font-bold tracking-tight">
            {isZh ? '把散乱工作，整理成能复用的系统。' : 'I turn scattered work into reusable systems.'}
          </motion.p>
          <motion.p variants={fadeIn} className="home-hero-copy mx-auto mt-5">
            {isZh
              ? 'Eden Tan 设计产品、增长、AI 工作流和知识库结构，让项目经验不会只停在聊天记录、临时判断和一次性交付里。'
              : 'Eden Tan designs product systems, growth logic, AI workflows, and knowledge structures so project learning does not disappear into chat history, one-off decisions, and finished deliverables.'}
          </motion.p>
          <motion.p variants={fadeIn} className="home-hero-support mx-auto mt-3">
            {isZh
              ? '核心不是做更多内容，而是让判断、流程和知识持续累积。'
              : 'The point is not more output. The point is judgment, workflow, and knowledge that keep compounding.'}
          </motion.p>
          <motion.div variants={fadeIn} className="mt-7 flex flex-wrap justify-center gap-5">
            <a href={projectsHref} className="home-text-cta">
              {isZh ? '看系统证明' : 'Read the systems'} <span aria-hidden>›</span>
            </a>
            <a href={brandGuideHref} className="home-text-cta home-text-cta-muted">
              {isZh ? '看品牌指南' : 'Read the brand guide'} <span aria-hidden>›</span>
            </a>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="home-hero-visual mx-auto mt-12"
            role="img"
            aria-label={isZh ? 'Jiju 猫在草地上慢慢走动的 CSS 动画横幅' : 'CSS animated Jiju cat walking across a quiet field'}
          >
            <HomeJijuCatScene />
          </motion.div>
        </motion.section>

        <section className="home-section mx-auto max-w-6xl py-14 md:py-24">
          <div className="home-section-head">
            <p className="home-kicker">{isZh ? 'Proof through builds' : 'Proof through builds'}</p>
            <h2 className="home-section-title font-display font-bold tracking-tight">
              {isZh ? '不要只看介绍。看系统文件。' : 'Do not read the bio first. Read the systems.'}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {homeSystemFiles.map((item) => (
              <article key={item.title} className="home-system-card">
                {item.visual === 'blueprint' && (
                  <HomeProjectsBlueprintIcon label={isZh ? 'Projects Hub 设计图纸 CSS 图标' : 'Projects Hub blueprint CSS icon'} />
                )}
                {item.visual === 'jiju' && (
                  <div className="home-system-project-icon">
                    <ProjectsJijuCssIcon label={isZh ? 'Jiju CSS 图标' : 'Jiju CSS icon'} />
                  </div>
                )}
                {item.visual === 'life-magic' && (
                  <HomeLifeMagicIcon label={isZh ? 'Life OS 心跳魔法阵 CSS 图标' : 'Life OS heartbeat magic circle CSS icon'} />
                )}
                <h3 className="font-display text-3xl font-bold tracking-tight">{item.title}</h3>
                <a href={item.href} className="home-text-cta">
                  {item.cta} <span aria-hidden>›</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section mx-auto max-w-6xl py-14 md:py-24">
          <div className="home-section-head">
            <p className="home-kicker">{isZh ? 'Durable archive' : 'Durable archive'}</p>
            <h2 className="home-section-title font-display font-bold tracking-tight">
              {isZh ? '这些不是杂项，是长期观察入口。' : 'These are not side interests. They are observation loops.'}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homeInterestLinks.map((item) => (
              <a key={item.title} href={item.href} className="home-interest-link">
                {item.visual === 'power-up' && (
                  <HomePowerUpTotem label={isZh ? 'Life OS 黑发变金发能量变身透明底 CSS 图腾' : 'Life OS black hair to golden power-up transparent CSS totem'} />
                )}
                {item.visual === 'gramophone' && (
                  <HomeGramophoneTotem label={isZh ? 'Analog Tech 留声机振动透明底 CSS 图腾' : 'Analog Tech vibrating gramophone transparent CSS totem'} />
                )}
                {item.visual === 'archive-evolution' && (
                  <HomeArchiveEvolutionTotem label={isZh ? 'Pattern Archive 小型爬行动物进化成喷火龙感火龙透明底 CSS 图腾' : 'Pattern Archive small reptile evolving into fire dragon transparent CSS totem'} />
                )}
                {item.visual === 'pyramid-break' && (
                  <HomePyramidBreakTotem label={isZh ? "Conway's Game of Life 金字塔碰坏透明底 CSS 图腾" : "Conway's Game of Life broken pyramid transparent CSS totem"} />
                )}
                {item.visual === 'bagua-mirror' && (
                  <HomeBaguaMirrorTotem label={isZh ? 'Pattern Archive 道教八卦镜透明底 CSS 图腾' : 'Pattern Archive transparent Bagua mirror CSS totem'} />
                )}
                <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                <span className="home-interest-arrow" aria-hidden>›</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer py-10 text-center text-sm">
        <p>
          © {new Date().getFullYear()} Eden Tan. {isZh ? '保留所有权利。' : 'All rights reserved.'}
        </p>
        <p className="mt-4">
          <a
            href={brandGuideHref}
            className="inline-flex items-center gap-2 font-medium text-stone-600 transition-colors hover:text-eden-mint"
          >
            <span className="text-base leading-none" aria-hidden>
              🎨
            </span>
            {isZh ? '品牌指南' : 'Brand guide'}
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
