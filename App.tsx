/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { applyPageSeo } from './seo';
import { 
  Linkedin, 
  ExternalLink,
  Download,
  MapPin,
  ArrowLeft,
  Clock3,
  MoonStar,
  SunMedium,
  Pause,
  Play,
  RotateCcw
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
    role: { en: 'Daily report dashboard', zh: '日报数据仪表盘' },
    summary: {
      en: 'An iGaming aggregator dashboard that eats Transaction and Customer Excel files, tidies them into SQLite or IndexedDB, and turns a messy day of operations into KPI, member, channel, trend, and brand-comparison views.',
      zh: '一个 iGaming aggregator 日报仪表盘：把 Transaction 和 Customer Excel 吃进去，理进 SQLite 或 IndexedDB，把乱糟糟的一天运营变成 KPI、会员、渠道、趋势和品牌对比的视图。',
    },
    system: {
      en: 'Excel ingest, data normalization, SQLite layer, dashboard cache, multi-brand reports, CRM export, Docker/backend mode.',
      zh: 'Excel 导入、数据标准化、SQLite 层、dashboard cache、多品牌报表、CRM export、Docker/backend 模式。',
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
const AUTO_THEME_DAY_START_HOUR = 7;
const AUTO_THEME_NIGHT_START_HOUR = 19;

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

const HomeProjectsBlueprintIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-projects-blueprint-icon" role="img" aria-label={label}>
    <span className="home-blueprint-grid" />
    <span className="home-blueprint-sheet" />
    <span className="home-blueprint-frame" />
    <span className="home-blueprint-plan plan-a" />
    <span className="home-blueprint-plan plan-b" />
    <span className="home-blueprint-plan plan-c" />
    <span className="home-blueprint-dimension dimension-x" />
    <span className="home-blueprint-dimension dimension-y" />
    <span className="home-blueprint-node node-a" />
    <span className="home-blueprint-node node-b" />
    <span className="home-blueprint-scan" />
  </div>
);

const HomeJijuCatScene: React.FC = () => (
  <div className="jiju-cat-scene" aria-hidden="true">
    <span className="jiju-sun" />
    <span className="jiju-star s1" />
    <span className="jiju-star s2" />
    <span className="jiju-star s3" />
    <span className="jiju-cloud jiju-cloud-a" />
    <span className="jiju-cloud jiju-cloud-b" />
    <span className="jiju-butterfly">
      <span className="wing left" />
      <span className="wing right" />
    </span>
    <span className="jiju-leaf" />
    <div className="jiju-ground" />
    <span className="jiju-grass g1" />
    <span className="jiju-grass g2" />
    <span className="jiju-grass g3" />
    <span className="jiju-paw p1" />
    <span className="jiju-paw p2" />
    <span className="jiju-paw p3" />
    <span className="jiju-paw p4" />
    <div className="jiju-cat">
      <span className="jiju-dust" />
      <div className="jiju-cat-face">
        <div className="jiju-cat-bob">
          <span className="jiju-cat-tail" />
          <span className="jiju-cat-body" />
          <span className="jiju-cat-head">
            <span className="jiju-cat-ear left" />
            <span className="jiju-cat-ear right" />
            <span className="jiju-cat-eye" />
            <span className="jiju-cat-whisker w1" />
            <span className="jiju-cat-whisker w2" />
            <span className="jiju-cat-tongue" />
          </span>
          <span className="jiju-cat-leg leg1" />
          <span className="jiju-cat-leg leg2" />
          <span className="jiju-cat-leg leg3" />
          <span className="jiju-cat-leg leg4" />
        </div>
      </div>
    </div>
    <div className="jiju-cat jiju-cat-cameo">
      <span className="jiju-dust" />
      <div className="jiju-cat-face">
        <div className="jiju-cat-bob">
          <span className="jiju-cat-tail" />
          <span className="jiju-cat-body" />
          <span className="jiju-cat-head">
            <span className="jiju-cat-ear left" />
            <span className="jiju-cat-ear right" />
            <span className="jiju-cat-eye" />
            <span className="jiju-cat-whisker w1" />
            <span className="jiju-cat-whisker w2" />
          </span>
          <span className="jiju-cat-leg leg1" />
          <span className="jiju-cat-leg leg2" />
          <span className="jiju-cat-leg leg3" />
          <span className="jiju-cat-leg leg4" />
        </div>
      </div>
    </div>
  </div>
);

const HomeLifeMagicIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-life-magic-icon" role="img" aria-label={label}>
    <span className="home-life-magic-aura" />
    <span className="home-life-magic-heart" />
    <span className="home-life-magic-ring ring-outer" />
    <span className="home-life-magic-ring ring-inner" />
    <span className="home-life-magic-geometry geometry-a" />
    <span className="home-life-magic-geometry geometry-b" />
    <span className="home-life-magic-axis axis-x" />
    <span className="home-life-magic-axis axis-y" />
    <span className="home-life-magic-node node-a" />
    <span className="home-life-magic-node node-b" />
    <span className="home-life-magic-node node-c" />
    <span className="home-life-magic-spark spark-a" />
    <span className="home-life-magic-spark spark-b" />
  </div>
);

const HomeBaguaMirrorTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-bagua-totem" role="img" aria-label={label}>
    <span className="home-bagua-ring ring-outer" />
    <span className="home-bagua-ring ring-inner" />
    <span className="home-bagua-yinyang">
      <span className="home-bagua-dot dot-light" />
      <span className="home-bagua-dot dot-dark" />
    </span>
    {Array.from({ length: 8 }, (_, index) => (
      <span key={index} className={`home-bagua-trigram trigram-${index + 1}`}>
        <span />
        <span />
        <span />
      </span>
    ))}
    <span className="home-bagua-glint" />
  </div>
);

const HomeGramophoneTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-gramophone-totem" role="img" aria-label={label}>
    <span className="home-gramophone-wave wave-a" />
    <span className="home-gramophone-wave wave-b" />
    <span className="home-gramophone-horn-neck" />
    <span className="home-gramophone-horn-bell" />
    <span className="home-gramophone-horn-ribs" />
    <span className="home-gramophone-horn-mouth" />
    <span className="home-gramophone-base" />
    <span className="home-gramophone-base-panel" />
    <span className="home-gramophone-crank" />
    <span className="home-gramophone-platter" />
    <span className="home-gramophone-record" />
    <span className="home-gramophone-label" />
    <span className="home-gramophone-arm" />
    <span className="home-gramophone-needle" />
  </div>
);

const HomePowerUpTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-power-totem" role="img" aria-label={label}>
    <span className="home-power-aura aura-back" />
    <span className="home-power-aura aura-front" />
    <span className="home-power-body" />
    <span className="home-power-belt" />
    <span className="home-power-face" />
    <span className="home-power-hair hair-dark">
      <span className="lock lock-a" />
      <span className="lock lock-b" />
      <span className="lock lock-c" />
      <span className="lock lock-d" />
      <span className="lock lock-e" />
    </span>
    <span className="home-power-hair hair-gold">
      <span className="lock lock-a" />
      <span className="lock lock-b" />
      <span className="lock lock-c" />
      <span className="lock lock-d" />
      <span className="lock lock-e" />
    </span>
    <span className="home-power-spark spark-a" />
    <span className="home-power-spark spark-b" />
  </div>
);

const HomePyramidBreakTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-pyramid-totem" role="img" aria-label={label}>
    <span className="home-pyramid-impact" />
    <span className="home-pyramid-wave" />
    <span className="home-pyramid-block block-a" />
    <span className="home-pyramid-block block-b" />
    <span className="home-pyramid-block block-c" />
    <span className="home-pyramid-block block-d" />
    <span className="home-pyramid-block block-e" />
    <span className="home-pyramid-block block-f" />
    <span className="home-pyramid-block block-g" />
    <span className="home-pyramid-block block-h" />
    <span className="home-pyramid-crack crack-a" />
    <span className="home-pyramid-crack crack-b" />
    <span className="home-pyramid-pixel pixel-a" />
    <span className="home-pyramid-pixel pixel-b" />
    <span className="home-pyramid-pixel pixel-c" />
  </div>
);

const HomeArchiveEvolutionTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-archive-evolution-totem" role="img" aria-label={label}>
    <span className="home-archive-small-beast">
      <span className="home-archive-small-tail" />
      <span className="home-archive-small-body" />
      <span className="home-archive-small-head" />
      <span className="home-archive-small-eye" />
      <span className="home-archive-small-claw claw-a" />
      <span className="home-archive-small-claw claw-b" />
    </span>
    <span className="home-archive-fire-dragon">
      <span className="home-archive-dragon-wing wing-a" />
      <span className="home-archive-dragon-wing wing-b" />
      <span className="home-archive-dragon-tail" />
      <span className="home-archive-dragon-tail-flame" />
      <span className="home-archive-dragon-body" />
      <span className="home-archive-dragon-neck" />
      <span className="home-archive-dragon-head" />
      <span className="home-archive-dragon-horn horn-a" />
      <span className="home-archive-dragon-horn horn-b" />
      <span className="home-archive-dragon-eye" />
      <span className="home-archive-dragon-claw claw-a" />
      <span className="home-archive-dragon-claw claw-b" />
      <span className="home-archive-dragon-breath" />
    </span>
    <span className="home-archive-evolution-spark spark-a" />
    <span className="home-archive-evolution-spark spark-b" />
  </div>
);

const ProjectsJijuCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-jiju-css-icon" role="img" aria-label={label}>
    <span className="projects-jiju-icon-sun" />
    <span className="projects-jiju-icon-cloud cloud-a" />
    <span className="projects-jiju-icon-cloud cloud-b" />
    <span className="projects-jiju-icon-ground" />
    <span className="projects-jiju-icon-grass grass-a" />
    <span className="projects-jiju-icon-grass grass-b" />
    <span className="projects-jiju-icon-cat">
      <span className="projects-jiju-icon-tail" />
      <span className="projects-jiju-icon-body" />
      <span className="projects-jiju-icon-head">
        <span className="projects-jiju-icon-ear left" />
        <span className="projects-jiju-icon-ear right" />
        <span className="projects-jiju-icon-eye" />
        <span className="projects-jiju-icon-whisker w1" />
        <span className="projects-jiju-icon-whisker w2" />
      </span>
      <span className="projects-jiju-icon-leg leg-a" />
      <span className="projects-jiju-icon-leg leg-b" />
      <span className="projects-jiju-icon-leg leg-c" />
      <span className="projects-jiju-icon-leg leg-d" />
    </span>
  </div>
);

const ProjectsPokerCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-poker-css-icon" role="img" aria-label={label}>
    <span className="projects-poker-table" />
    <span className="projects-poker-table-rim" />
    <span className="projects-poker-card card-a">
      <span className="projects-poker-rank rank-top">A</span>
      <span className="projects-poker-suit suit-spade" />
      <span className="projects-poker-rank rank-bottom">A</span>
    </span>
    <span className="projects-poker-card card-b">
      <span className="projects-poker-rank rank-top">A</span>
      <span className="projects-poker-suit suit-heart" />
      <span className="projects-poker-rank rank-bottom">A</span>
    </span>
  </div>
);

const ProjectsEtReportCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-etreport-css-icon" role="img" aria-label={label}>
    <span className="projects-etreport-topbar" />
    <span className="projects-etreport-dot dot-a" />
    <span className="projects-etreport-dot dot-b" />
    <span className="projects-etreport-dot dot-c" />
    <span className="projects-etreport-grid" />
    <span className="projects-etreport-bar bar-a" />
    <span className="projects-etreport-bar bar-b" />
    <span className="projects-etreport-bar bar-c" />
    <span className="projects-etreport-bar bar-d" />
    <span className="projects-etreport-line" />
    <span className="projects-etreport-scan" />
  </div>
);

const ProjectsCrmCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-crm-css-icon" role="img" aria-label={label}>
    <span className="projects-crm-ring ring-outer" />
    <span className="projects-crm-ring ring-middle" />
    <span className="projects-crm-ring ring-inner" />
    <span className="projects-crm-polygon polygon-octagon" />
    <span className="projects-crm-polygon polygon-hexagon" />
    <span className="projects-crm-axis axis-x" />
    <span className="projects-crm-axis axis-y" />
    <span className="projects-crm-triangle triangle-a" />
    <span className="projects-crm-triangle triangle-b" />
    <span className="projects-crm-tick tick-a" />
    <span className="projects-crm-tick tick-b" />
    <span className="projects-crm-tick tick-c" />
    <span className="projects-crm-tick tick-d" />
    <span className="projects-crm-node node-a" />
    <span className="projects-crm-node node-b" />
    <span className="projects-crm-node node-c" />
    <span className="projects-crm-node node-d" />
    <span className="projects-crm-glyph glyph-a" />
    <span className="projects-crm-glyph glyph-b" />
    <span className="projects-crm-core" />
    <span className="projects-crm-orbit" />
  </div>
);

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
                const projectIcon = isJiju ? (
                  <ProjectsJijuCssIcon label={isZh ? 'Jiju CSS app 图标' : 'Jiju CSS app icon'} />
                ) : isPoker ? (
                  <ProjectsPokerCssIcon label={isZh ? 'Friday Poker Club CSS app 图标' : 'Friday Poker Club CSS app icon'} />
                ) : isETReportHub ? (
                  <ProjectsEtReportCssIcon label={isZh ? 'ETReportHub 数据 CSS app 图标' : 'ETReportHub data CSS app icon'} />
                ) : isCrm ? (
                  <ProjectsCrmCssIcon label={isZh ? 'CRM Intelligence System 魔法阵 CSS app 图标' : 'CRM Intelligence System magic circle CSS app icon'} />
                ) : null;
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
                {isZh ? '我看得出你在做什么。' : 'Yes, I can see what you are building.'}
              </h2>
              <p className="projects-section-copy">
                {isZh
                  ? '看 `Daily Report/log.md` 就知道，ETReportHub 是个 iGaming aggregator 的日报系统，不只是个 dashboard。它已经能做数据导入、SQLite 规范化、多品牌、会员分析、渠道分析、趋势、Compare Brands、System Guide、CRM export、Docker/backend，还有前端性能优化。'
                  : 'Going by `Daily Report/log.md`, ETReportHub is an iGaming aggregator daily-report system — not just a dashboard. It already does data ingest, SQLite normalization, multi-brand views, member and channel analysis, trends, Compare Brands, a System Guide, CRM export, Docker/backend mode, and frontend performance work.'}
              </p>
            </div>
            <div className="projects-readout-grid mt-12">
              {(isZh
                ? [
                    ['Input', 'Transaction + Customer Excel，每天从运营系统导出。'],
                    ['Data Layer', 'SQLite / IndexedDB，把 raw Excel 转成可查询的数据层。'],
                    ['Reports', 'Performance、Members、Channels、Trends、Compare Brands。'],
                    ['CRM Bridge', '会员分群、风险、留存、CRM export，准备接下一步跟进系统。'],
                  ]
                : [
                    ['Input', 'Transaction + Customer Excel exported from operations.'],
                    ['Data Layer', 'SQLite / IndexedDB turns raw Excel into a queryable layer.'],
                    ['Reports', 'Performance, Members, Channels, Trends, and Compare Brands.'],
                    ['CRM Bridge', 'Segments, risk, retention, and CRM export for the next follow-up system.'],
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
            <p className="etreport-kicker mx-auto">{isZh ? 'ETReportHub / Daily Report OS' : 'ETReportHub / Daily Report OS'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Turn messy gaming reports into operating clarity.' : 'Turn messy gaming reports into operating clarity.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? '给 iGaming operator / aggregator 的日报数据系统。把 Excel、会员、渠道、趋势、品牌对比和 CRM export 放进同一个可复盘的 dashboard。'
                : 'A daily-report data system for iGaming operators and aggregators. It turns Excel, members, channels, trends, brand comparison, and CRM export into one reviewable dashboard.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#modules" className="etreport-text-cta">
                {isZh ? '看产品模块' : 'View modules'} <span aria-hidden>›</span>
              </a>
              <a href={salesHref} className="etreport-text-cta">
                {isZh ? '看价格' : 'View pricing'} <span aria-hidden>›</span>
              </a>
              <a href="#skill-proof" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '看 Eden 的能力' : 'View skill proof'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section className="etreport-console-panel">
            <div className="etreport-console-copy">
              <p className="etreport-kicker">{isZh ? 'Product promise' : 'Product promise'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '少一点人工对表，多一点可判断的运营系统。' : 'Less manual checking. More operating judgment.'}
              </h2>
              <p>
                {isZh
                  ? 'ETReportHub 的价值不是把数字排漂亮，而是把每天最容易出错的资料流变成可追踪、可解释、可导出、可继续接 CRM 的系统。'
                  : 'ETReportHub is not about making numbers look pretty. It turns a fragile daily data flow into something traceable, explainable, exportable, and ready for CRM workflows.'}
              </p>
            </div>
            <div className="etreport-console-metrics">
              {(isZh
                ? [
                    ['Input', 'Transaction + Customer Excel'],
                    ['Storage', 'SQLite / IndexedDB'],
                    ['Views', 'Performance / Members / Channels / Trends'],
                    ['Output', 'CRM export / Wide Excel / System Guide'],
                  ]
                : [
                    ['Input', 'Transaction + Customer Excel'],
                    ['Storage', 'SQLite / IndexedDB'],
                    ['Views', 'Performance / Members / Channels / Trends'],
                    ['Output', 'CRM export / Wide Excel / System Guide'],
                  ]
              ).map(([label, value]) => (
                <div key={label} className="etreport-console-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What it sells' : 'What it sells'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '卖的不是 dashboard。卖的是运营清晰度。' : 'It does not sell a dashboard. It sells operating clarity.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {etReportHubValueProps.map((item) => (
                <article key={item.title.en} className="etreport-value-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="modules" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Product modules' : 'Product modules'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '从导入，到分析，到下一步行动。' : 'From ingest, to analysis, to next action.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {etReportHubModules.map((item) => (
                <article key={item.title} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="skill-proof" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Skill proof' : 'Skill proof'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '顺便说，这东西也证明 Eden 真的会 build。' : 'Also — this thing is proof Eden can actually build.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? 'ETReportHub 的重点从来不是“会不会做个页面”。难的是看懂一堆乱七八糟的业务数据、把数据语义理对、做出运营真的肯用的界面，还顺手给以后的 CRM / AI 留了接口。'
                  : 'ETReportHub was never about “can you make a page.” The hard part is reading a pile of messy business data, getting the data semantics right, building UI operators will actually use, and leaving room for CRM and AI later.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {etReportHubSkillProof.map((item) => (
                <article key={item.title.en} className="etreport-proof-card">
                  <p className="etreport-card-eyebrow">{item.title[language]}</p>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Who it is for' : 'Who it is for'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '适合还在用 Excel 扛运营复杂度的团队。' : 'For teams still using Excel to carry operational complexity.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {etReportHubAudience.map((item) => (
                <article key={item.title.en} className="etreport-audience-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-faq-panel">
              <div>
                <p className="etreport-kicker">{isZh ? 'Questions' : 'Questions'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '客户会问的问题，先回答。' : 'Answer the buyer questions first.'}
                </h2>
              </div>
              <div className="etreport-faq-list">
                {etReportHubFaq.map((item) => (
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
                {isZh ? '如果报表已经影响判断，就该系统化。' : 'If reporting affects decisions, it needs a system.'}
              </h2>
              <p>
                {isZh
                  ? 'ETReportHub 可以作为产品、顾问服务或内部工具设计案例来谈。重点是把团队每天重复做、容易错、难复盘的运营动作，变成可维护系统。'
                  : 'ETReportHub can be discussed as a product, consulting direction, or internal-tool design case. The core is turning repeated, error-prone, hard-to-review operations into a maintainable system.'}
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
    title: { en: 'Controlled attention', zh: '控制注意力' },
    copy: {
      en: 'Every screen should carry one clear message. If two ideas compete, split the section.',
      zh: '每一屏只服务一个主信息。两个想法互相抢，就拆成两个区块。',
    },
  },
  {
    title: { en: 'Systems from chaos', zh: '从混乱到系统' },
    copy: {
      en: 'The brand should feel like a calm operating system for messy product, growth, AI, and life questions.',
      zh: '品牌要像一个安静的操作系统，用来整理产品、增长、AI 和人生问题里的混乱。',
    },
  },
  {
    title: { en: 'Human before impressive', zh: '先让人看懂，再让人觉得厉害' },
    copy: {
      en: 'The reader should feel helped before they feel impressed. Capability appears through clarity.',
      zh: '读者先感觉被帮到，再感觉专业。能力要通过清晰度出现。',
    },
  },
] as const;

const brandGuidePalette = [
  {
    name: { en: 'Stone 50', zh: 'Stone 50' },
    hex: '#fafaf9',
    role: { en: 'Primary canvas', zh: '主画布' },
    usage: { en: 'Use for page backgrounds and quiet editorial space.', zh: '用于页面背景和安静的编辑式留白。' },
  },
  {
    name: { en: 'Stone 200', zh: 'Stone 200' },
    hex: '#e7e5e4',
    role: { en: 'Soft structure', zh: '柔和结构' },
    usage: { en: 'Use for subtle dividers, soft fills, and low-volume surfaces.', zh: '用于轻分隔、柔和填充和低存在感表面。' },
  },
  {
    name: { en: 'Stone 600', zh: 'Stone 600' },
    hex: '#57534e',
    role: { en: 'Secondary voice', zh: '次级语气' },
    usage: { en: 'Use for metadata, quiet labels, and supporting copy.', zh: '用于 metadata、安静标签和辅助说明。' },
  },
  {
    name: { en: 'Stone 900', zh: 'Stone 900' },
    hex: '#1c1917',
    role: { en: 'Primary text', zh: '主文字' },
    usage: { en: 'Use for headlines, decisive copy, and rare inverted moments.', zh: '用于标题、决断型文案和少量反色时刻。' },
  },
] as const;

const brandGuideAccent = [
  {
    name: { en: 'Eden Mint', zh: 'Eden Mint' },
    hex: { light: '#7bdcb5', dark: '#dc6f82' },
    role: { en: 'Insight signal', zh: '洞察信号' },
    usage: {
      en: 'Selection, quote rail, insight highlight, subtle glow.',
      zh: '用于文本划选、引用竖线、洞察重点和轻微光感。',
    },
  },
  {
    name: { en: 'Eden Amber', zh: 'Eden Amber' },
    hex: { light: '#ffa340ed', dark: '#6fa4f0e6' },
    role: { en: 'Action signal', zh: '行动信号' },
    usage: {
      en: 'Current status, active states, CTA focus, small moments of energy.',
      zh: '用于当前状态、激活状态、CTA 焦点和少量能量点。',
    },
  },
] as const;

const brandGuideTypography = [
  {
    name: 'Space Grotesk',
    role: { en: 'Display voice', zh: '标题声线' },
    sample: { en: 'I build systems from chaos.', zh: 'I build systems from chaos.' },
    detail: { en: 'Use for hero headlines, section titles, and short high-signal statements.', zh: '用于首屏标题、章节标题和短而有力的判断句。' },
  },
  {
    name: 'Inter',
    role: { en: 'Reading voice', zh: '阅读声线' },
    sample: {
      en: 'Product growth, AI workflows, digital strategy, and long-form build narratives from Malaysia.',
      zh: 'Product growth, AI workflows, digital strategy, and long-form build narratives from Malaysia.',
    },
    detail: { en: 'Use for body copy and interface text. Keep it direct, plain, and easy to scan.', zh: '用于正文和界面文字。保持直接、简单、容易扫描。' },
  },
  {
    name: 'JetBrains Mono',
    role: { en: 'System voice', zh: '系统声线' },
    sample: { en: 'STATUS / CURRENTLY BUILDING / 2026', zh: 'STATUS / CURRENTLY BUILDING / 2026' },
    detail: { en: 'Use for labels, routes, timestamps, and operating-system cues.', zh: '用于标签、路由、时间戳和操作系统感提示。' },
  },
] as const;

const brandGuideRhythm = [
  {
    title: { en: 'Hero', zh: '首屏' },
    copy: {
      en: 'Name, one positioning line, one reader benefit, one large visual or signature statement.',
      zh: '名字、一句定位、一句读者收益，一个大视觉或品牌核心句。',
    },
  },
  {
    title: { en: 'Sections', zh: '章节' },
    copy: {
      en: 'One idea per section. Big title first, then one short paragraph, then proof or example.',
      zh: '一个章节只讲一个想法。先大标题，再短段落，最后给证据或例子。',
    },
  },
  {
    title: { en: 'Grids', zh: '网格' },
    copy: {
      en: 'Use grids only after the story is clear. Two columns on desktop, one column on mobile.',
      zh: '先把故事讲清楚，再用网格。桌面两栏，手机一栏。',
    },
  },
  {
    title: { en: 'Horizontal whitespace', zh: '左右留白' },
    copy: {
      en: 'Do not let content fill the whole desktop width by default. Use a narrow content island, center it, and let the sides stay quiet.',
      zh: '桌面端不要默认把内容铺满。用较窄的内容岛居中，让左右保持安静留白。',
    },
  },
] as const;

const brandGuideVoicePairs = [
  {
    avoid: { en: 'I am good at marketing and AI.', zh: '我很擅长营销和 AI。' },
    prefer: {
      en: 'For teams with messy product ideas or scattered workflows, Eden turns the signals into a usable system.',
      zh: '当产品想法很散、流程很乱时，Eden 把线索整理成能使用的系统。',
    },
  },
  {
    avoid: { en: 'A visionary personal brand.', zh: '一个有远见的个人品牌。' },
    prefer: {
      en: 'A builder archive for product growth, AI workflows, digital strategy, and long-form build notes.',
      zh: '一个记录产品增长、AI 工作流、数字策略和长期构建笔记的 builder archive。',
    },
  },
  {
    avoid: { en: 'Empowering people to transform their future.', zh: '赋能每个人改变未来。' },
    prefer: {
      en: 'Make the next move clearer. Then build the system around it.',
      zh: '先让下一步变清楚，再围绕它建立系统。',
    },
  },
] as const;

const brandGuideUseCases = [
  {
    title: { en: 'Home', zh: 'Home' },
    copy: { en: 'Start with the reader’s messy situation, then show what becomes clear.', zh: '从读者的混乱处境开始，再展示什么会变清楚。' },
  },
  {
    title: { en: 'Projects', zh: 'Projects' },
    copy: { en: 'Show the problem, system, decisions, and output. Do not only show screenshots.', zh: '展示问题、系统、判断和产出。不要只放截图。' },
  },
  {
    title: { en: 'Life OS', zh: 'Life OS' },
    copy: { en: 'Keep the game feeling, but let the content breathe like a premium product page.', zh: '保留游戏感，但让内容像高级产品页一样有呼吸。' },
  },
  {
    title: { en: 'Build Notes', zh: 'Build Notes' },
    copy: { en: 'Every note starts from a concrete chaos, then explains the build logic.', zh: '每篇从一个具体混乱开始，再解释构建逻辑。' },
  },
] as const;

const brandGuideStoryRules = [
  {
    title: { en: 'Log the moment, not the score', zh: '记录时刻，不是战绩' },
    copy: {
      en: 'A story log exists to remember the fun, not to brag about wins. The pot size doesn’t matter — whether the night is worth retelling does.',
      zh: '故事是为了记住好玩的瞬间，不是炫耀输赢。赢多少不重要，那一晚值不值得再讲一次，才重要。',
    },
  },
  {
    title: { en: 'Only what really happened', zh: '只写真的' },
    copy: {
      en: 'You can polish the pacing and the imagery, but the events, people, and outcomes stay true. Never invent drama for effect.',
      zh: '可以润色节奏和画面，但事件、人物、结果必须是真的。不为戏剧效果编故事。',
    },
  },
  {
    title: { en: 'Nicknames, not epic titles', zh: '用小名，别中二' },
    copy: {
      en: 'In the narrative use short nicknames — Cap, Lucky, Prince / 团长、罩仔、太子 — the same in both languages. Save the full character titles for the avatar cards.',
      zh: '正文里用短小名——团长、罩仔、太子 / Cap、Lucky、Prince，中英一致。完整称号留给角色卡，别在故事里堆「被罩住的王」这种。',
    },
  },
  {
    title: { en: 'Short, but cinematic', zh: '短，但有画面' },
    copy: {
      en: 'One beat per paragraph. Let the key moment land — a river card, an all-in — and cut everything else to the bone.',
      zh: '一段讲清一件事。让关键的那一下（一张 river、一次 all-in）落地，其余删到不能再删。',
    },
  },
  {
    title: { en: 'People first, cards second', zh: '先有人，再有牌' },
    copy: {
      en: 'The people at the table are the story. Readers should know the crew first; the hand only matters because of who is holding it.',
      zh: '桌上的人本身就是故事。先让读者认得这群人，那手牌才有意义。',
    },
  },
  {
    title: { en: 'Not a hand history', zh: '不是 hand history' },
    copy: {
      en: 'No jargon dumps, no solver review, no flexing. It should read like a friend retelling the night, not a textbook.',
      zh: '不堆术语、不写成复盘、不自夸。读起来像朋友在讲那晚，而不是教科书。',
    },
  },
] as const;

const brandGuideStoryExample = {
  avoid: {
    en: 'The Covered King shoved his straight all-in against The Reluctant Prince’s three Aces.',
    zh: '被罩住的王把顺子 all-in 推向不想继承的太子的三条 A。',
  },
  prefer: {
    en: 'Lucky shoved his straight all-in against Prince’s three Aces.',
    zh: '罩仔顺子直接 all-in，推向太子手里的三条 A。',
  },
} as const;

const brandGuideMotionRules = [
  {
    title: { en: 'Slow ambient motion', zh: '慢速环境微动' },
    copy: {
      en: 'Use motion like the current homepage background: slow, atmospheric, and easy to ignore until the reader notices it. It should make the page feel alive without asking for attention.',
      zh: '动效参考当前首页背景：慢、轻、有空气感。读者可以不注意它，但注意到时会觉得页面是活的，而不是被打断。',
    },
  },
  {
    title: { en: 'Quiet page entry', zh: '安静入场' },
    copy: {
      en: 'Page entry can soften the first moment, but it should stay brief and precise. Avoid dramatic reveals, bouncing panels, or motion that makes reading wait.',
      zh: '页面入场可以让第一眼更柔和，但必须短、准、克制。不要夸张 reveal、弹跳面板，或让读者等动画播完才阅读。',
    },
  },
  {
    title: { en: 'Motion must belong to the build', zh: '动效要属于产品' },
    copy: {
      en: 'Character, object, or icon motion should carry product meaning, not act as loose decoration. Motion earns its place when it clarifies what the system is doing.',
      zh: '角色、物件或 icon 动效要承载产品含义，不要只是松散装饰。只有当动效能说明系统正在做什么，它才值得留下。',
    },
  },
  {
    title: { en: 'Preserve reduced motion', zh: '保留 reduced motion' },
    copy: {
      en: 'Every ambient or character animation should still respect `prefers-reduced-motion`. The static state must remain composed, not broken.',
      zh: '所有环境或角色动效都要尊重 `prefers-reduced-motion`。静止状态也必须是完整画面，而不是坏掉的动画中间帧。',
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
              {isZh ? 'Brand Operating Guide' : 'Brand Operating Guide'}
            </p>
            <h1 className="brand-guide-hero-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Eden Tan 品牌操作系统' : 'Eden Tan Brand System'}
            </h1>
            <p className="brand-guide-hero-subtitle mx-auto mt-5">
              {isZh
                ? '用 Apple 式清晰度，承载 Eden 的系统思考。'
                : 'Apple-level clarity. Eden-level systems thinking.'}
            </p>
            <p className="brand-guide-hero-copy mx-auto mt-5">
              {isZh
                ? '这个品牌不是普通履历，也不是炫技作品集。它要让读者在很短时间内知道：混乱在哪里，Eden 如何把它变成产品、策略、内容和可复用系统。'
                : 'This is not a normal CV or a portfolio of proof. It helps a reader quickly understand where the chaos is, and how Eden turns it into products, strategy, content, and reusable systems.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#brand-principles" className="brand-guide-cta">
                {isZh ? '看设计原则' : 'View principles'} <span aria-hidden>›</span>
              </a>
              <a href="#brand-voice" className="brand-guide-cta brand-guide-cta-muted">
                {isZh ? '看文案语气' : 'View voice'} <span aria-hidden>›</span>
              </a>
            </div>
            <div className="brand-guide-signature mx-auto mt-12">
              <div className="brand-guide-mark">
                <img src={faviconSrc} alt="" width={72} height={72} />
              </div>
              <div>
                <p className="brand-guide-signature-label">{isZh ? 'Core line' : 'Core line'}</p>
                <p className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  I build systems from chaos.
                </p>
              </div>
            </div>
          </header>

          <section id="brand-principles" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '01 / Design logic' : '01 / Design logic'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? 'Apple 的清晰度，Eden 的系统感。' : 'Apple clarity, Eden systems.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '参考 Apple 的不是外观，而是注意力管理：少说一点，说准一点，让每个区块只负责一个任务。Eden 的部分，是把混乱、行为、策略和产品思考放进这个清晰框架里。'
                  : 'The Apple reference is not the look. It is attention management: say less, say it clearly, and let each section do one job. The Eden layer is the systems lens for chaos, behavior, strategy, and product thinking.'}
              </p>
            </div>
            <div className="brand-guide-principle-grid mt-12 grid gap-4 md:grid-cols-3">
              {brandGuidePrinciples.map((item, index) => (
                <article key={item.title.en} className="brand-guide-principle-card">
                  <p className="brand-guide-card-index">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '02 / Visual system' : '02 / Visual system'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '中性为主，强调色只负责信号。' : 'Neutral first. Accent as signal.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? 'Stone 是品牌底盘。Mint 和 Amber 不是装饰色，而是系统里的状态灯。浅色模式保持薄荷和琥珀；深色模式自动切到红系和蓝系补色。'
                  : 'Stone is the base system. Mint and amber are not decorative colors. They are signal lights. Light mode uses mint and amber; dark mode switches them into red and blue complements.'}
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
              <p className="brand-guide-kicker">{isZh ? '03 / Type and rhythm' : '03 / Type and rhythm'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '字体少一点，层级清楚一点。' : 'Fewer type moves. Clearer hierarchy.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? 'Apple 式页面不靠很多字体大小制造高级感，而是靠稳定比例。Eden 的页面也应该少用字号，靠标题、正文、标签三层完成阅读秩序。'
                  : 'Apple-style pages do not feel premium because of many font sizes. They feel premium because the scale is disciplined. Eden should use a clear display, body, and system-label stack.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {brandGuideTypography.map((item) => (
                <article key={item.name} className="brand-guide-type-card">
                  <p className="brand-guide-card-index">{item.name}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.role[language]}</h3>
                  <p className={item.name === 'JetBrains Mono' ? 'font-mono' : item.name === 'Space Grotesk' ? 'font-display text-2xl font-bold' : ''}>
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
              <p className="brand-guide-kicker">{isZh ? '04 / Voice' : '04 / Voice'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '不要让读者看你很厉害。让读者知道你能帮什么忙。' : 'Do not perform expertise. Make the help obvious.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '文案先接住读者处境，再讲 Eden 的判断，最后给可行动入口。少用连续的 “I”。多用 “For founders...”, “When the work feels messy...”, “This is where...” 这类读者视角句式。'
                  : 'Copy should receive the reader’s situation first, then show Eden’s judgment, then offer a clear next action. Avoid stacked “I” statements. Prefer reader-led lines like “For founders...”, “When the work feels messy...”, and “This is where...”.'}
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
              <p className="brand-guide-kicker">{isZh ? '05 / Application' : '05 / Application'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '每个页面都像一个清楚的产品说明。' : 'Every page behaves like a clear product story.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '少一点框，多一点层级。少一点装饰，多一点判断。页面可以有神秘感，但信息路径必须清楚。'
                  : 'Less framing, more hierarchy. Less decoration, more judgment. The site can feel mysterious, but the information path must stay clear.'}
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
              <p className="brand-guide-kicker">{isZh ? '06 / Story style' : '06 / Story style'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '故事是用来记住好玩的，不是用来炫耀的。' : 'Stories are for remembering the fun, not for flexing.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '站上的 story log（牌桌、生活、日常时刻）都用这一套语气：真实的事，轻松地讲，用小名，留画面，删废话。看 /poker 的 Story log 当样板。'
                  : 'Every story log on the site (the table, life, everyday moments) follows one voice: true events, told loosely, on a nickname basis, kept cinematic, trimmed to the bone. The /poker Story log is the reference.'}
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
              <p className="brand-guide-kicker">{isZh ? '07 / Motion language' : '07 / Motion language'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '动效要像呼吸，不要像表演。' : 'Motion should breathe, not perform.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '当前首页是动效基准：背景慢慢漂、页面轻轻入场，CSS icon 用小幅度、慢节奏的微动传达系统感。未来可以优化 timing 和性能，但不要把这套慢速、克制、有生命感的动效语言删掉或换成通用炫技效果。'
                  : 'The current homepage is the motion reference: the background drifts slowly, the page enters softly, and CSS icons use small, slow motion to carry the system feeling. Future work can refine timing and performance, but should not remove this slow, restrained, living motion language or replace it with generic show effects.'}
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
          </section>

          <p className="pb-10 text-center text-xs text-stone-500">
            {isZh
              ? '设计参考 Apple.com 的高层信息架构逻辑，但视觉、文案和品牌资产属于 Eden Tan 个人站。最后更新以代码库与 log 为准。'
              : 'This guide references Apple.com at the level of information architecture only. Visuals, copy, and brand assets belong to the Eden Tan site. For the latest changes, follow the repo and `log.md`.'}
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
              {isZh ? 'A smaller map for going out with pets.' : 'A smaller map for going out with pets.'}
            </h1>
            <p className="jiju-subtitle mx-auto mt-5">
              {isZh
                ? '从槟城开始，把宠物友好地点、出门记忆、社区贡献和 Sanctuary impact 变成一条更清楚的产品路径。'
                : 'Starting from Penang, Jiju.pet turns pet-friendly places, outing memories, community contribution, and sanctuary impact into one clearer product path.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="https://jiju.pet" target="_blank" rel="noopener noreferrer" className="jiju-text-cta">
                {isZh ? '打开 jiju.pet' : 'Open jiju.pet'} <ExternalLink size={15} />
              </a>
              <a href="#build-log" className="jiju-text-cta jiju-text-cta-muted">
                {isZh ? '看构建记录' : 'View build log'} <span aria-hidden>›</span>
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
                  ? 'Jiju.pet 的核心不是把地点堆起来，而是让养宠的人更快判断：哪里能去、规则是否可信、这次出门值不值得留下记录，以及这个社区能不能一起变得更准。'
                  : 'The point is not to pile up places. Jiju.pet helps pet parents decide where to go, whether the policy is trustworthy, whether the outing is worth remembering, and whether the community can make the map more accurate over time.'}
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
  const conwayHref = joinBasePath(baseUrl, 'conways-game-of-life');
  const resumeHref = 'https://drive.google.com/uc?export=download&id=1PRXj4BwpeAX_7F9H2PJumG0slIEZmLZ0';
  const homeHref = baseUrl;
  const homeChaosSignals = isZh
    ? [
        '产品方向很多，但主线不清楚。',
        'AI 工具到处都是，却没有真正进入工作流。',
        '增长压力很大，但活动、内容和用户路径各跑各的。',
        '运营知道问题存在，却缺一个能复用的系统。',
      ]
    : [
        'Product ideas are everywhere, but the main line is unclear.',
        'AI tools are everywhere, but the workflow is still missing.',
        'Growth pressure is real, but campaigns, content, and user paths run apart.',
        'Operations can feel the problem, but the reusable system is not there yet.',
      ];
  const homeClearOutputs = isZh
    ? [
        { title: 'Product Logic', copy: '把想法整理成用户路径、验证顺序和可上线范围。' },
        { title: 'Growth Structure', copy: '把增长从口号拆成渠道、机制、节奏和复盘。' },
        { title: 'AI Workflow', copy: '把 AI 从工具清单变成小团队真正能使用的流程。' },
        { title: 'Campaign System', copy: '把活动、provider、素材、规则和追踪变成同一张图。' },
        { title: 'Content Engine', copy: '把长期构建过程整理成品牌叙事和可持续输出。' },
      ]
    : [
        { title: 'Product Logic', copy: 'Turn ideas into user paths, validation order, and shippable scope.' },
        { title: 'Growth Structure', copy: 'Break growth into channels, mechanics, rhythm, and review loops.' },
        { title: 'AI Workflow', copy: 'Move AI from a tool list into a workflow a small team can actually use.' },
        { title: 'Campaign System', copy: 'Map campaigns, providers, assets, rules, and tracking into one operating view.' },
        { title: 'Content Engine', copy: 'Turn the build process into brand narrative and sustainable output.' },
      ];
  const homeSystemFiles: Array<{ title: string; copy: string; href: string; cta: string; visual?: 'blueprint' | 'jiju' | 'life-magic' }> = isZh
    ? [
        { title: 'Projects Hub', copy: 'Jiju、Friday Poker Club、ETReportHub 和 CRM 的 AI build systems。', href: projectsHref, cta: '看 Projects', visual: 'blueprint' },
        { title: 'Jiju Growth System', copy: '从槟城开始的宠物友好发现平台，先把小地图做清楚。', href: fullPageHref, cta: '看案例', visual: 'jiju' },
        { title: 'Life OS RPG System', copy: '把人格、经历、能力和阴影转成角色卡、技能与成长路线。', href: lifeOsHref, cta: '打开角色档案', visual: 'life-magic' },
      ]
    : [
        { title: 'Projects Hub', copy: 'AI build systems for Jiju, Friday Poker Club, ETReportHub, and CRM.', href: projectsHref, cta: 'View Projects', visual: 'blueprint' },
        { title: 'Jiju Growth System', copy: 'A pet-friendly discovery platform starting from Penang, built by making the small map clear first.', href: fullPageHref, cta: 'View case', visual: 'jiju' },
        { title: 'Life OS RPG System', copy: 'A character-card system for turning personality, experience, ability, and shadow into upgrade routes.', href: lifeOsHref, cta: 'Open profile', visual: 'life-magic' },
      ];
  const homeCollaborationPaths = isZh
    ? [
        { title: 'Product & Growth Systems', copy: '适合早期创始人，需要产品方向、用户路径、增长逻辑和验证顺序。' },
        { title: 'AI Workflow Design', copy: '适合小团队，需要减少手工、整理知识、建立内部工作流。' },
        { title: 'iGaming Strategy', copy: '适合 operator、aggregator 或 provider，需要活动结构、留存机制和 promotion coordination。' },
      ]
    : [
        { title: 'Product & Growth Systems', copy: 'For early-stage founders who need product direction, user flow, growth logic, and validation order.' },
        { title: 'AI Workflow Design', copy: 'For small teams that need to reduce manual work, organize knowledge, and build internal workflows.' },
        { title: 'iGaming Strategy', copy: 'For operators, aggregators, or providers that need campaign structure, retention mechanics, and promotion coordination.' },
      ];
  const homeInterestLinks: Array<{ title: string; copy: string; href: string; visual?: 'bagua-mirror' | 'gramophone' | 'power-up' | 'pyramid-break' | 'archive-evolution' }> = isZh
    ? [
        { title: 'Life OS', copy: '人生 RPG 能力系统与角色档案。', href: lifeOsHref, visual: 'power-up' },
        { title: 'Analog Tech', copy: '机械、胶片和旧技术的手感。', href: analogTechHref, visual: 'gramophone' },
        { title: 'Pattern Archive', copy: '人类行为、选择模式和旧系统的长期观察档案。', href: 'https://edent95.github.io/8g/', visual: 'bagua-mirror' },
        { title: "Conway's Game of Life", copy: '黑白 256 rules 元胞自动机浏览器。', href: conwayHref, visual: 'pyramid-break' },
      ]
    : [
        { title: 'Life OS', copy: 'A life RPG ability system and character profile.', href: lifeOsHref, visual: 'power-up' },
        { title: 'Analog Tech', copy: 'Mechanical, film, and old-technology texture.', href: analogTechHref, visual: 'gramophone' },
        { title: 'Pattern Archive', copy: 'A long-running archive on human behavior, choice patterns, and old systems.', href: 'https://edent95.github.io/8g/', visual: 'bagua-mirror' },
        { title: "Conway's Game of Life", copy: 'A black-and-white browser for 256 cellular automata rules.', href: conwayHref, visual: 'pyramid-break' },
      ];
  const currentPath = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/';
  const normalizedBase = normalizePath(baseUrl);
  const pathWithoutBase =
    normalizedBase !== '/' && currentPath.startsWith(normalizedBase)
      ? normalizePath(currentPath.slice(normalizedBase.length))
      : currentPath;
  const isJijuPetFullPage = pathWithoutBase === '/jiju-pet';
  const isProjectsFullPage = pathWithoutBase === '/projects';
  const isETReportHubFullPage = pathWithoutBase === '/etreporthub';
  const isETReportHubSalesPage = pathWithoutBase === '/etreporthub-sales';
  const isPokerFullPage = pathWithoutBase === '/poker';
  const isCrmFullPage = pathWithoutBase === '/crm';
  const isPreviousProjectsFullPage = pathWithoutBase === '/previous-projects';
  const isAnalogTechFullPage = pathWithoutBase === '/analog-tech';
  const isLifeOsFullPage = pathWithoutBase === '/life-os';
  const isLifeFullPage = pathWithoutBase === '/life';
  const isBrandGuideFullPage = pathWithoutBase === '/brand-guide';
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
            {isZh ? 'Malaysia · Systems Architect & Digital Strategist' : 'Malaysia · Systems Architect & Digital Strategist'}
          </motion.p>
          <motion.h1 variants={fadeIn} className="home-hero-title mx-auto mt-5 font-display font-bold tracking-tight">
            Eden Tan
          </motion.h1>
          <motion.p variants={fadeIn} className="home-hero-subtitle mx-auto mt-4 font-display font-bold tracking-tight">
            I build systems from chaos.
          </motion.p>
          <motion.p variants={fadeIn} className="home-hero-copy mx-auto mt-5">
            {isZh
              ? 'For founders, operators, and small teams dealing with messy product ideas, scattered workflows, growth pressure, or unclear digital direction.'
              : 'For founders, operators, and small teams dealing with messy product ideas, scattered workflows, growth pressure, or unclear digital direction.'}
          </motion.p>
          <motion.p variants={fadeIn} className="home-hero-support mx-auto mt-3">
            {isZh
              ? 'Product growth, AI workflows, digital strategy, and long-form build narratives from Malaysia.'
              : 'Product growth, AI workflows, digital strategy, and long-form build narratives from Malaysia.'}
          </motion.p>
          <motion.div variants={fadeIn} className="mt-7 flex flex-wrap justify-center gap-5">
            <a href={fullPageHref} className="home-text-cta">
              {isZh ? '看 Jiju.pet' : 'View Jiju.pet'} <span aria-hidden>›</span>
            </a>
            <a href="#work-with-me" className="home-text-cta home-text-cta-muted">
              {isZh ? '合作方式' : 'Work with me'} <span aria-hidden>›</span>
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
            <p className="home-kicker">{isZh ? 'When things feel messy' : 'When things feel messy'}</p>
            <h2 className="home-section-title font-display font-bold tracking-tight">
              {isZh ? '先接住混乱。再开始设计系统。' : 'Start with the mess. Then design the system.'}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {homeChaosSignals.map((item) => (
              <div key={item} className="home-quiet-row">
                <span aria-hidden>✦</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section mx-auto max-w-6xl py-14 md:py-24">
          <div className="home-section-head">
            <p className="home-kicker">{isZh ? 'What becomes clear' : 'What becomes clear'}</p>
            <h2 className="home-section-title font-display font-bold tracking-tight">
              {isZh ? '从想法，到路径，到能复用的操作系统。' : 'From ideas, to paths, to reusable operating systems.'}
            </h2>
            <p className="home-section-copy">
              {isZh
                ? 'Eden 的工作不是把页面做漂亮而已，而是把判断、流程、内容和增长机制整理到同一条链路里。'
                : 'Eden’s work is not just making pages look better. It is turning judgment, workflow, content, and growth mechanics into one usable chain.'}
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {homeClearOutputs.map((item) => (
              <article key={item.title} className="home-output-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section mx-auto max-w-6xl py-14 md:py-24">
          <div className="home-section-head">
            <p className="home-kicker">{isZh ? 'Systems, not claims' : 'Systems, not claims'}</p>
            <h2 className="home-section-title font-display font-bold tracking-tight">
              {isZh ? '如果要了解 Eden，先看系统文件。' : 'To understand Eden, read the system files.'}
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
                <p>{item.copy}</p>
                <a href={item.href} className="home-text-cta">
                  {item.cta} <span aria-hidden>›</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="work-with-me" className="home-section mx-auto max-w-6xl py-14 md:py-24">
          <div className="home-section-head">
            <p className="home-kicker">{isZh ? 'Work with me' : 'Work with me'}</p>
            <h2 className="home-section-title font-display font-bold tracking-tight">
              {isZh ? '适合需要把事情变清楚的人。' : 'For people who need the work to become clearer.'}
            </h2>
            <p className="home-section-copy">
              {isZh
                ? '合作入口不从职位开始，而从你现在面对的混乱开始。'
                : 'The entry point is not a job title. It is the kind of mess you are trying to organize.'}
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {homeCollaborationPaths.map((item) => (
              <article key={item.title} className="home-collab-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-5">
            <a
              href="https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/"
              target="_blank"
              rel="noopener noreferrer"
              className="home-text-cta"
            >
              <Linkedin size={17} /> LinkedIn
            </a>
            <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="home-text-cta home-text-cta-muted">
              <Download size={17} /> {isZh ? '下载简历' : 'Download resume'}
            </a>
          </div>
        </section>

        <section className="home-section mx-auto max-w-6xl py-14 md:py-24">
          <div className="home-section-head">
            <p className="home-kicker">{isZh ? 'Interests' : 'Interests'}</p>
            <h2 className="home-section-title font-display font-bold tracking-tight">
              {isZh ? '系统之外，也保留观察世界的入口。' : 'Outside the system, there are still ways to observe the world.'}
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
                <p>{item.copy}</p>
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
