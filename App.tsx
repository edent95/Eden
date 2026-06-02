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
  SunMedium
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

const lifeOsCharacterPortrait = '/life-os-character/life-rpg-character.png';
const lifeOsLoadoutBanner = '/life-os-character/wind-pattern-analyst-loadout-banner.png';

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
        'Partner and client coordination for API integrations, campaign tooling, onboarding, and troubleshooting.',
        'Planned and executed campaign structures, including trial incentives and bonus mechanics.',
        'Tracked applications and partner participation; prepared and distributed campaign assets and announcements.',
        'Managed event logistics for SiGMA and related exhibitions, including travel, meetings, booth needs, and follow-up actions.',
        'Maintained structured documentation for request tracking, promotion status, and test-account workflows.',
        'Drafted group announcements, collected operational feedback, and escalated issues to relevant teams.',
        'Worked across finance, design, and technical teams to improve campaign delivery quality and speed.',
      ],
      zh: [
        '协调合作伙伴与客户，推进 API 对接、活动工具、上线培训与问题排查。',
        '策划并落地活动结构，包含试用激励与奖金机制设计。',
        '跟踪报名与合作方参与情况；制作并分发活动素材与公告。',
        '统筹 SiGMA 及相关展会后勤，含行程、会议、展位需求与会后跟进。',
        '维护请求跟踪、活动状态与测试账号流程的结构化文档。',
        '撰写群组公告，收集运营反馈并升级至相关团队。',
        '联动财务、设计与技术团队，提升活动交付质量与速度。',
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
        'Built an automated Excel brand report system for outsourced marketing analysis.',
        'Improved promotion retention planning with clearer weekly and monthly visibility.',
        'Built structured problem analysis workflows: discover, analyze, and solve.',
        'Maintained operational reports including Facebook Ad ROI, Promotion & VIP report, overall monthly report, game analysis report, and abnormal list tracking.',
        'Standardized reporting structure so decision-making could be faster and cleaner.',
      ],
      zh: [
        '搭建自动化 Excel 品牌报告体系，支撑外包营销分析。',
        '以更清晰的周/月视图改进活动留存规划。',
        '建立结构化问题分析流程：发现、分析、解决。',
        '维护运营报表，含 Facebook 广告 ROI、活动与 VIP 报表、月度总览、游戏分析与异常名单跟踪。',
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
        'Led UI/UX direction and built a new website structure from scratch.',
        'Aligned desktop and mobile experiences under one consistent brand system.',
        'Created a practical handoff-ready prototype flow for implementation alignment.',
      ],
      zh: [
        '主导 UI/UX 方向，从零搭建新网站信息架构。',
        '在统一品牌体系下对齐桌面端与移动端体验。',
        '输出可交付的原型流程，便于研发对齐落地。',
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
        'Soccerking: content generation, brand strategy planning, and Facebook insight analysis.',
        'Built post-type systems for traffic, highlight distribution, engagement, and shareable informative albums.',
        'Executed Like / Share / Tag and campaign-style traffic loops to strengthen page growth.',
        'Facebook Ads: lead collection, page-like growth, and traffic acquisition to landing pages.',
        'Ran a gamified campaign landing concept to increase click-through and interaction depth.',
      ],
      zh: [
        'Soccerking：内容生产、品牌策略规划与 Facebook 数据洞察分析。',
        '搭建帖子类型体系，覆盖引流、高光分发、互动与可分享资讯相册。',
        '执行点赞/分享/标注及活动式流量闭环，强化主页增长。',
        'Facebook 广告：潜客收集、涨粉与落地页引流。',
        '落地游戏化活动页概念，提升点击与互动深度。',
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
              {isZh ? '模拟科技' : 'Analog Tech'}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              {isZh ? '胶片图库' : 'Film Gallery'}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-700">
              {isZh
                ? '我仍用 35mm 与部分中画幅做日常练习。这一角是档案里的私人选集：街面、水岸、山海之间与零星建筑，不是为 brief 而铺陈；更像把「如何在场」用化学与曝光诚实写下来。'
                : 'I still keep a 35mm and occasional medium-format practice. This is a private edit from that archive: streets, waterlines, the coast, and a few building studies—less a “portfolio deck,” more an honest log of how attention lands on a frame.'}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {isZh
                ? '乳剂带来的颗粒、漏光与软高光，我都当作可读的材质，不是必须修掉的杂讯。下面 11 张，按情绪与结构线索挑出来，不追求“唯一正确”的完整系列。'
                : 'Soft highlights, uneven grain, and the occasional light leak are part of the material for me, not glitches to erase. The eleven images below are chosen for line and mood rather than a single, exhaustive “set.”'}
            </p>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {analogTechGalleryPhotos.map((photo) => (
              <figure key={photo.src} className="motion-card overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <img
                  src={resolveAssetPath(baseUrl, photo.src)}
                  alt={photo.alt[language]}
                  className="h-80 w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="px-4 py-3 text-sm text-stone-600">{photo.caption[language]}</figcaption>
              </figure>
            ))}
          </div>
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
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{isZh ? '生活' : 'Life'}</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              {isZh ? '探索视频档案' : 'Adventure Video Archive'}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-700">
              {isZh ? '记录旅行与水上活动片段的个人视频集合。' : 'A personal collection of travel and water activity moments.'}
            </p>
          </section>

          <div className="mt-6 space-y-5">
            {lifeVideos.map((video) => (
              <section key={video.href} className="motion-card rounded-2xl border border-stone-200 bg-white p-5 md:p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold text-stone-900">{video.title[language]}</h2>
                  <a
                    href={video.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
                  >
                    {isZh ? '在 YouTube 打开' : 'Open on YouTube'}
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-black">
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={video.embedSrc}
                      title={`${video.title[language]} YouTube player`}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </section>
            ))}
          </div>
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
      className={`${sizeClass} flex-none rounded-xl border border-stone-200 bg-stone-900 object-cover shadow-sm ring-1 ring-eden-mint/15`}
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
  <figure className={`relative mt-5 overflow-hidden rounded-xl border border-stone-200 bg-stone-900 shadow-sm ${className}`}>
    <div className="aspect-[16/9] w-full sm:aspect-[8/3]">
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </div>
    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/55 to-transparent px-3 pb-3 pt-12 text-white sm:px-4 sm:pb-4 sm:pt-16">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-eden-amber sm:text-[10px] sm:tracking-[0.28em]">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-stone-100 sm:text-sm">{caption}</p>
    </figcaption>
  </figure>
);

const LifeOsHudShapes: React.FC<{ variant?: 'hero' | 'panel' }> = ({ variant = 'panel' }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
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
  <details id={id} className="group motion-card relative mt-4 scroll-mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm backdrop-blur sm:mt-6">
    <LifeOsHudShapes variant="hero" />
    <summary className="relative z-10 flex cursor-pointer list-none items-start justify-between gap-3 p-4 transition-colors hover:bg-eden-mint/10 sm:gap-4 md:p-6 [&::-webkit-details-marker]:hidden">
      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 sm:text-[10px] sm:tracking-[0.28em]">
          CHAPTER-{index} · {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-stone-900 sm:text-2xl md:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-stone-600 sm:text-sm">{body}</p>
      </div>
      <span className="mt-1 flex h-9 w-12 flex-none items-center justify-center rounded-xl border border-eden-amber/30 bg-eden-amber/10 font-mono text-[10px] font-bold uppercase tracking-wider text-stone-800 transition-colors group-open:border-stone-700 group-open:bg-stone-900 group-open:text-stone-50 sm:h-10 sm:w-14">
        {`Open`}
      </span>
    </summary>
    <div className="relative z-10 border-t border-stone-200 px-3 pb-4 sm:px-4 sm:pb-5 md:px-5 md:pb-6">
      {children}
    </div>
  </details>
);

const LifeOsRadarPanel: React.FC<{
  stats: ReadonlyArray<{ key: string; value: number }>;
  ariaLabel: string;
  centerPrimary: string;
  centerSecondary: string;
  tone?: 'mint' | 'amber';
  compact?: boolean;
  className?: string;
}> = ({ stats, ariaLabel, centerPrimary, centerSecondary, tone = 'mint', compact = false, className = '' }) => {
  const center = 110;
  const radius = 76;
  const accent = tone === 'mint' ? 'rgb(123,220,181)' : 'rgb(255,163,64)';
  const accentSoft = tone === 'mint' ? 'rgba(123,220,181,0.34)' : 'rgba(255,163,64,0.28)';
  const point = (index: number, value: number) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / stats.length;
    const scaledRadius = (radius * value) / 100;
    return `${center + Math.cos(angle) * scaledRadius},${center + Math.sin(angle) * scaledRadius}`;
  };
  const gridPoint = (index: number, scale: number) => point(index, scale);
  const shapePoints = stats.map((stat, index) => point(index, stat.value)).join(' ');
  const gradientId = `life-os-radar-${tone}-${stats.map((stat) => stat.key).join('-').toLowerCase()}`;

  return (
    <div className={`relative mx-auto w-full ${compact ? 'max-w-[220px]' : 'max-w-[310px]'} overflow-hidden rounded-2xl border border-stone-800/70 bg-stone-950 p-2 text-white shadow-inner sm:p-3 ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:18px_18px] opacity-35" />
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
            fill={scale === 100 ? 'rgba(255,255,255,0.025)' : 'none'}
            stroke="rgba(214,211,209,0.22)"
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
            stroke="rgba(214,211,209,0.18)"
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
                fill="rgb(245,245,244)"
              fontSize={compact ? '7' : '8'}
                fontWeight="800"
              >
                {stat.key}
              </text>
            </g>
          );
        })}
        <circle cx={center} cy={center} r={compact ? '21' : '24'} fill="rgba(28,25,23,0.86)" stroke="rgba(209,171,91,0.62)" />
        <text x={center} y={center - 2} textAnchor="middle" fill="rgb(255,255,255)" fontSize={compact ? '15' : '17'} fontWeight="800">
          {centerPrimary}
        </text>
        <text x={center} y={center + 13} textAnchor="middle" fill="rgb(214,211,209)" fontSize="7" letterSpacing="1.5">
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
  const endDate = new Date(birthDate.getFullYear() + maxLevel, birthDate.getMonth(), birthDate.getDate());
  const today = new Date();
  const currentLevel =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ? 1
      : 0);
  const lifeProgress = Math.min(
    100,
    Math.max(0, ((today.getTime() - birthDate.getTime()) / (endDate.getTime() - birthDate.getTime())) * 100)
  );
  const heroRadarStats = [
    { key: 'INS', label: { en: 'Insight', zh: '洞察' }, value: 92 },
    { key: 'STR', label: { en: 'Strategy', zh: '策略' }, value: 90 },
    { key: 'EXP', label: { en: 'Expression', zh: '表达' }, value: 87 },
    { key: 'FRE', label: { en: 'Freedom', zh: '自由' }, value: 95 },
    { key: 'ADP', label: { en: 'Adapt', zh: '适应' }, value: 88 },
    { key: 'STA', label: { en: 'Stability', zh: '稳定' }, value: 64 },
  ] as const;
  const radarCenter = 110;
  const radarRadius = 76;
  const radarPoint = (index: number, value: number) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / heroRadarStats.length;
    const radius = (radarRadius * value) / 100;
    return `${radarCenter + Math.cos(angle) * radius},${radarCenter + Math.sin(angle) * radius}`;
  };
  const radarGridPoint = (index: number, scale: number) => radarPoint(index, scale);
  const radarShapePoints = heroRadarStats.map((stat, index) => radarPoint(index, stat.value)).join(' ');
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
    <div className="page-shell min-h-screen text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-3 pb-28 pt-8 sm:px-5 sm:pb-16 md:px-6 md:py-16">
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

          <header className="motion-card relative mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white p-3 shadow-sm backdrop-blur sm:mt-8 sm:p-5 md:p-8">
            <LifeOsHudShapes variant="hero" />
            <div className="relative z-10 grid gap-4 sm:gap-6 lg:grid-cols-[0.85fr_1.15fr_0.85fr]">
              <section className="relative order-1 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
                <LifeOsHudShapes />
                <div className="mx-auto max-w-[280px] overflow-hidden rounded-2xl border border-eden-mint/35 bg-stone-900 shadow-[0_0_44px_rgba(123,220,181,0.18)] lg:max-w-none">
                  <img
                    src={lifeOsCharacterPortrait}
                    alt={isZh ? 'RPG 角色照片' : 'RPG character portrait'}
                    loading="eager"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 sm:mt-5 sm:text-xs sm:tracking-[0.28em]">
                  🃏 {isZh ? 'RPG 角色档案' : 'RPG Character Profile'}
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
                  {isZh ? '风之解析者' : 'Wind Pattern Analyst'}
                </h1>
                <p className="mt-1 font-display text-lg text-stone-700 sm:text-xl">
                  🌬️ {isZh ? '流浪策略师' : 'Wandering Strategist'}
                </p>
                <div className="mt-4 space-y-2 text-sm text-stone-700 sm:mt-5">
                  <p><span className="text-stone-500">⚔️ Class</span> · {isZh ? 'Wandering Strategist / 流浪策略师' : 'Wandering Strategist'}</p>
                  <p><span className="text-stone-500">🧬 Sub Class</span> · {isZh ? '人性模式分析者' : 'Human Pattern Analyst'}</p>
                  <p><span className="text-stone-500">🜁 Element</span> · Wind + Metal / 风 + 金</p>
                  <p><span className="text-stone-500">🧭 Alignment</span> · Chaotic Insightful</p>
                  <div className="rounded-xl border border-eden-amber/30 bg-white px-3 py-3">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-stone-500">✦ Level</p>
                        <p className="mt-1 font-semibold text-stone-900">
                          LV {currentLevel} / {maxLevel}
                        </p>
                      </div>
                      <p className="font-mono text-xs text-stone-500">{lifeProgress.toFixed(1)}%</p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-eden-mint via-eden-amber to-stone-900"
                        style={{ width: `${lifeProgress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between gap-3 font-mono text-[10px] uppercase tracking-wider text-stone-500">
                      <span>{isZh ? '1995 出生' : 'Spawn 1995'}</span>
                      <span>{isZh ? '80 年时间轴' : '80Y Timeline'}</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="relative order-3 flex flex-col justify-between overflow-hidden rounded-2xl border border-eden-mint/25 bg-eden-mint/10 p-4 sm:p-5 lg:order-2">
                <LifeOsHudShapes />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 sm:text-xs sm:tracking-[0.28em]">
                    🌀 {isZh ? '背景故事' : 'Character Prologue'}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 sm:text-3xl md:text-4xl">
                    {isZh ? '风之解析者' : 'Wind Pattern Analyst'}
                  </h2>
                  <p className="mt-3 font-display text-lg leading-relaxed text-stone-900 sm:mt-4 sm:text-xl">
                    {isZh
                      ? '不是从稳定路线里走出来的角色，更像是在混乱现场醒来的观察者。'
                      : 'Not a character born from a stable route. More like an observer waking inside noisy fields and unfinished systems.'}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-stone-700">
                    {isZh
                      ? '市场的噪音、关系的暗流、产品里还没成形的需求、生活中反复出现的模式，都会变成观察世界的线索。'
                      : 'Market noise, social undercurrents, unformed product needs, and repeating life patterns become clues for reading the world.'}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {isZh
                      ? '武器不是硬碰，而是观察、拆解、命名和重组。风负责进入不同场域，金属负责把混乱切成结构。'
                      : 'The weapon is not direct force. It is observation, decomposition, naming, and reconstruction. Wind enters different fields. Metal cuts chaos into structure.'}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                    {(isZh
                      ? [
                          ['Role', '观察 / 拆解 / 重组'],
                          ['Mode', '风入局，金成形'],
                          ['Quest', '把混乱转成可用系统'],
                          ['Risk', '分散、过热、抗拒无效规则'],
                        ]
                      : [
                          ['Role', 'Observe / Decode / Rebuild'],
                          ['Mode', 'Wind enters. Metal structures.'],
                          ['Quest', 'Turn chaos into usable systems'],
                          ['Risk', 'Scatter, overheat, resist weak rules'],
                        ]
                    ).map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-stone-300/40 bg-stone-950/10 px-3 py-2 shadow-inner backdrop-blur-sm">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">{label}</p>
                        <p className="mt-1 font-medium text-stone-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <blockquote className="mt-5 border-l-2 border-eden-amber/60 pl-4 font-display text-lg leading-relaxed text-stone-900 sm:mt-6 sm:text-xl">
                  {isZh
                    ? '主线不是证明自己很特别，而是把混乱的人生经验，变成可以被别人使用的力量。'
                    : 'The main quest is not to prove uniqueness. It is to turn chaotic lived experience into power other people can use.'}
                </blockquote>
              </section>

              <section className="relative order-2 overflow-hidden rounded-2xl border border-eden-amber/30 bg-eden-amber/10 p-4 sm:p-5 lg:order-3">
                <LifeOsHudShapes />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 sm:text-xs sm:tracking-[0.28em]">
                  🔮 {isZh ? '能力雷达' : 'Ability Radar'}
                </p>
                <div className="relative mx-auto mt-4 max-w-[310px] rounded-2xl border border-stone-200 bg-stone-950 p-2 text-white shadow-inner sm:p-3 lg:max-w-none">
                  <svg viewBox="0 0 220 220" role="img" aria-label={isZh ? '核心属性雷达图' : 'Core stats radar chart'} className="h-auto w-full">
                    <defs>
                      <radialGradient id="life-os-radar-glow" cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor="rgba(123,220,181,0.35)" />
                        <stop offset="100%" stopColor="rgba(209,171,91,0.04)" />
                      </radialGradient>
                    </defs>
                    {[25, 50, 75, 100].map((scale) => (
                      <polygon
                        key={scale}
                        points={heroRadarStats.map((_, index) => radarGridPoint(index, scale)).join(' ')}
                        fill={scale === 100 ? 'rgba(255,255,255,0.02)' : 'none'}
                        stroke="rgba(214,211,209,0.22)"
                        strokeWidth="1"
                      />
                    ))}
                    {heroRadarStats.map((_, index) => (
                      <line
                        key={index}
                        x1={radarCenter}
                        y1={radarCenter}
                        x2={radarGridPoint(index, 100).split(',')[0]}
                        y2={radarGridPoint(index, 100).split(',')[1]}
                        stroke="rgba(214,211,209,0.18)"
                        strokeWidth="1"
                      />
                    ))}
                    <polygon points={radarShapePoints} fill="url(#life-os-radar-glow)" stroke="rgb(123,220,181)" strokeWidth="2" />
                    {heroRadarStats.map((stat, index) => {
                      const [x, y] = radarPoint(index, stat.value).split(',');
                      const [labelX, labelY] = radarGridPoint(index, 116).split(',');

                      return (
                        <g key={stat.key}>
                          <circle cx={x} cy={y} r="3.5" fill="rgb(209,171,91)" stroke="rgb(255,255,255)" strokeWidth="1" />
                          <text
                            x={labelX}
                            y={labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="rgb(245,245,244)"
                            fontSize="9"
                            fontWeight="700"
                          >
                            {stat.label[language]}
                          </text>
                        </g>
                      );
                    })}
                    <circle cx={radarCenter} cy={radarCenter} r="23" fill="rgba(28,25,23,0.82)" stroke="rgba(209,171,91,0.6)" />
                    <text x={radarCenter} y={radarCenter - 2} textAnchor="middle" fill="rgb(255,255,255)" fontSize="18" fontWeight="800">
                      {powerScore}
                    </text>
                    <text x={radarCenter} y={radarCenter + 13} textAnchor="middle" fill="rgb(214,211,209)" fontSize="7" letterSpacing="1.5">
                      POWER
                    </text>
                  </svg>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {heroRadarStats.map((stat) => (
                    <span key={stat.key} className="rounded-full border border-eden-amber/30 bg-white px-3 py-1 text-stone-700">
                      {stat.key} · {stat.value}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-stone-600">
                  {isZh
                    ? '雷达图只显示倾向、能量强度和维护难度，不代表好坏。'
                    : 'The radar shows tendency, energy intensity, and maintenance difficulty. It does not judge good or bad.'}
                </p>
              </section>
            </div>
          </header>

          <section className="motion-card relative mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-stone-950 p-3 text-white shadow-sm sm:mt-6 sm:p-4">
            <LifeOsHudShapes variant="hero" />
            <div className="relative z-10 flex items-center justify-between gap-3 px-1">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-eden-amber">
                  {isZh ? 'Game Menu' : 'Game Menu'}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold text-white">
                  {isZh ? '选择阅读章节' : 'Choose a chapter'}
                </h2>
              </div>
              <span className="rounded-full border border-eden-mint/30 bg-eden-mint/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-eden-mint">
                4 Files
              </span>
            </div>
            <div className="relative z-10 mt-4 flex snap-x gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
              {lifeOsGameMenu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`min-w-[76%] snap-center rounded-2xl border p-4 transition-transform hover:-translate-y-0.5 md:min-w-0 ${
                    item.tone === 'mint'
                      ? 'border-eden-mint/30 bg-eden-mint/10'
                      : 'border-eden-amber/30 bg-eden-amber/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="rounded-lg border border-white/15 bg-white/10 px-2 py-1 font-mono text-[10px] text-stone-200">
                      FILE-{item.code}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 min-h-[48px] text-xs leading-relaxed text-stone-300">{item.body}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-eden-amber">
                    {item.action} →
                  </p>
                </a>
              ))}
            </div>
          </section>

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
                  <figure className="mx-auto mt-4 max-w-[260px] overflow-hidden rounded-2xl border border-eden-amber/30 bg-stone-950 shadow-sm lg:max-w-none">
                    <img
                      src={lifeOsLoadoutBanner}
                      alt={isZh ? '风之解析者角色 Loadout 竖向横幅' : 'Wind Pattern Analyst character loadout vertical banner'}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover lg:aspect-[1/2]"
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
                      <div key={signal.code} className="overflow-hidden rounded-xl border border-stone-200 bg-white p-3">
                        <figure className="overflow-hidden rounded-lg border border-eden-amber/25 bg-stone-950">
                          <img
                            src={signal.banner}
                            alt={isZh ? `${signal.title.zh} 信号横幅` : `${signal.title.en} signal banner`}
                            loading="lazy"
                            className="aspect-[16/9] w-full object-cover sm:aspect-[8/3]"
                          />
                        </figure>
                        <div className="flex items-start justify-between gap-3">
                          <div className="mt-3 flex items-center gap-2">
                            <LifeOsIcon src={signal.icon} alt={signal.title[language]} size="sm" />
                            <div>
                              <h3 className="font-display text-base font-bold text-stone-900">{signal.title[language]}</h3>
                              <p className="font-mono text-[10px] uppercase tracking-wider text-stone-500">{signal.code}</p>
                            </div>
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
              <div className="flex rounded-2xl border border-stone-200 bg-stone-950 p-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-300">
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
            <div className="relative z-10 mt-4 flex snap-x gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
              {lifeRpgActiveSkills.map((skill) => (
                <details
                  key={skill.name.en}
                  className="group min-w-[82%] snap-center overflow-hidden rounded-2xl border border-eden-amber/30 bg-stone-950 shadow-sm md:min-w-0"
                >
                  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <figure className="relative overflow-hidden">
                      <img
                        src={skill.banner}
                        alt={isZh ? `${skill.name.zh} 技能横幅` : `${skill.name.en} skill banner`}
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                      <div className="absolute left-3 top-3 flex items-center gap-2">
                        <LifeOsIcon src={skill.icon} alt={skill.name[language]} size="sm" />
                        <span className="rounded-lg border border-eden-amber/40 bg-eden-amber px-2 py-1 font-mono text-xs font-bold text-stone-950">
                          {skill.level}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-eden-amber">
                          {skill.level} ACTIVE SPELL
                        </p>
                        <h3 className="mt-1 font-display text-xl font-bold text-white">✦ {skill.name[language]}</h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-200">{skill.bannerCaption[language]}</p>
                      </div>
                    </figure>
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-stone-950 px-3 py-3 text-xs text-stone-300">
                      <span className="uppercase tracking-wider">{skill.type[language]}</span>
                      <span className="rounded-full border border-white/15 px-2 py-1 font-mono text-[10px] text-eden-mint group-open:border-stone-600 group-open:bg-stone-800 group-open:text-stone-100">
                        {isZh ? '展开' : 'Open'}
                      </span>
                    </div>
                  </summary>
                  <dl className="grid gap-2 border-t border-white/10 bg-white p-3 text-sm sm:p-4">
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
                  <details key={skill.name.en} className="group overflow-hidden rounded-2xl border border-eden-mint/25 bg-stone-950 shadow-sm">
                    <summary className="cursor-pointer list-none p-3 text-center [&::-webkit-details-marker]:hidden">
                      <div className="mx-auto w-fit rounded-2xl border border-eden-mint/25 bg-eden-mint/10 p-2">
                        <LifeOsIcon src={skill.icon} alt={skill.name[language]} size="md" />
                      </div>
                      <h3 className="mt-3 font-display text-sm font-bold leading-tight text-white sm:text-base">🌬️ {skill.name[language]}</h3>
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-eden-mint group-open:text-eden-amber">
                        {isZh ? '被动常驻' : 'Passive Aura'}
                      </p>
                    </summary>
                    <div className="border-t border-white/10 bg-white p-3 text-xs leading-relaxed">
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
                  <details key={debuff.name.en} className="group overflow-hidden rounded-2xl border border-eden-amber/30 bg-stone-950 shadow-sm">
                    <summary className="grid cursor-pointer grid-cols-[64px_1fr_auto] items-center gap-3 p-3 [&::-webkit-details-marker]:hidden">
                      <LifeOsIcon src={debuff.icon} alt={debuff.name[language]} size="md" />
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-eden-amber">
                          {isZh ? 'Shadow Debuff' : 'Shadow Debuff'}
                        </p>
                        <h3 className="mt-1 font-display text-base font-bold text-white">🕳️ {debuff.name[language]}</h3>
                      </div>
                      <span className="rounded-full border border-white/15 px-2 py-1 font-mono text-[10px] text-stone-300 group-open:border-stone-600 group-open:bg-stone-800 group-open:text-stone-100">
                        !!
                      </span>
                    </summary>
                    <div className="grid gap-2 border-t border-white/10 bg-white p-3 text-xs leading-relaxed text-stone-700">
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
              <span className="hidden rounded-2xl border border-eden-mint/25 bg-stone-950 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-eden-mint sm:inline-flex">
                4 Routes
              </span>
            </div>
            <div className="relative z-10 mt-4 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
              {lifeRpgSkillTrees.map((tree) => (
                <article key={tree.title.en} className="overflow-hidden rounded-2xl border border-eden-mint/25 bg-stone-950 shadow-sm">
                  <div className="relative aspect-square overflow-hidden border-b border-eden-mint/20 bg-stone-900">
                    <img
                      src={tree.banner}
                      alt={`${tree.title[language]} ${isZh ? '成长路线方形视觉' : 'growth route square banner'}`}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 min-h-[72px] bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-3">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-eden-amber">
                        {isZh ? 'SKILL TREE ROUTE' : 'SKILL TREE ROUTE'}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-white">🧭 {tree.title[language]}</h3>
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
                                : 'border-eden-mint bg-stone-950 shadow-[0_0_12px_rgba(123,220,181,0.35)]'
                            }`}
                          />
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-stone-400">
                            NODE-{String(index + 1).padStart(2, '0')}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-stone-100">{node}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-stone-300">
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
      <nav className="fixed inset-x-3 bottom-3 z-50 rounded-3xl border border-stone-700/80 bg-stone-950/94 p-2 shadow-2xl backdrop-blur md:hidden">
        <div className="grid grid-cols-4 gap-1">
          {lifeOsGameMenu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-2 py-2 text-center transition-colors hover:bg-white/10"
              aria-label={item.title}
            >
              <span className="block text-lg leading-none">{item.icon}</span>
              <span className="mt-1 block truncate font-mono text-[9px] uppercase tracking-[0.08em] text-stone-300">
                {item.code}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

const brandGuidePalette = [
  {
    bg: 'bg-stone-50',
    border: 'border-stone-200',
    text: 'text-stone-900',
    hex: '#fafaf9',
    usage: { en: 'Primary canvas · page background', zh: '主画布 · 页面背景' },
  },
  {
    bg: 'bg-stone-200',
    border: 'border-stone-300',
    text: 'text-stone-800',
    hex: '#e7e5e4',
    usage: { en: 'Pills, emoji tiles, soft fills', zh: '胶囊标签、emoji 方底、柔和填充' },
  },
  {
    bg: 'bg-stone-600',
    border: 'border-stone-500',
    text: 'text-white',
    hex: '#57534e',
    usage: { en: 'Secondary emphasis (sparingly)', zh: '次级强调（少用）' },
  },
  {
    bg: 'bg-stone-900',
    border: 'border-stone-900',
    text: 'text-stone-50',
    hex: '#1c1917',
    usage: { en: 'Primary text, primary buttons, inverted panels', zh: '主文案、主按钮、反色块' },
  },
] as const;

const brandGuideAccent = [
  {
    bg: 'bg-eden-mint',
    border: 'border-teal-700/25',
    text: 'text-stone-900',
    hex: { light: '#7bdcb5', dark: '#dc6f82' },
    usage: {
      en: 'Accent mint / dark-mode red complement · selection, language toggle, quote rail, accent glow',
      zh: '薄荷强调 / 暗色红系补色 · 文本划选、语言切换、引用竖线、强调 glow',
    },
  },
  {
    bg: 'bg-eden-amber',
    border: 'border-amber-700/30',
    text: 'text-stone-900',
    hex: { light: '#ffa340ed', dark: '#6fa4f0e6' },
    usage: {
      en: 'Accent amber / dark-mode blue complement · “Present” chips, emoji rims, CTA focus rings',
      zh: '琥珀强调 / 暗色蓝系补色 ·「进行中」标签、emoji 描边、主按钮焦点环',
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

          <header className="motion-card mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-start gap-4">
              <FlatEmoji emoji="🎨" size="lg" bob />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {isZh ? '站点识别' : 'Site identity'}
                </p>
                <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
                  {isZh ? '品牌指南' : 'Brand guide'}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
                  {isZh
                    ? '这份页面把 Eden 作品集站的视觉与语气收成一份「对内对外都能用」的说明：偏编辑感、低饱和 stone、叙事先于口号。第三方若要引用样式，请以这里为准。'
                    : 'A single reference for how this portfolio looks and sounds: editorial calm, low-saturation stone, narrative before slogans. Use this page as the source of truth when aligning visuals or copy.'}
                </p>
              </div>
            </div>
          </header>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="✨" size="md" tilt />
              {isZh ? '品牌内核' : 'Brand essence'}
            </h2>
            <ul className="mt-4 space-y-2 text-stone-700">
              {(isZh
                ? [
                    '知识系统感：像杂志排版，而不是典型 SaaS 营销站。',
                    '真诚叙事：先场景与判断，再能力标签；少用空泛「赋能」。',
                    '留白与层级：标题用 display 字体，正文保持可读行宽。',
                    '轻趣味：扁平底 emoji + 轻动效点缀，不抢正文。',
                  ]
                : [
                    'Knowledge-system feel: editorial layout, not generic SaaS marketing chrome.',
                    'Honest narrative: context and judgment before capability labels; avoid empty “empowerment” language.',
                    'Hierarchy and air: display type for headings, comfortable measure for body copy.',
                    'Light play: flat emoji tiles and gentle motion as accents, never competing with the text.',
                  ]
              ).map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="🧱" size="md" bob />
              {isZh ? '色彩' : 'Color'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {isZh
                ? '全站以 Tailwind `stone` 阶为主轴；另有两枚品牌强调色（薄荷 / 琥珀，含透明度）用于状态、划选与轻点缀，不抢 stone 的编辑基调。主题默认按用户本地时间自动切换：07:00–18:59 为浅色，19:00–06:59 为深色。到了暗色模式，这两枚强调色会切到补色变体：mint 转红系，amber 转蓝系。'
                : 'Stone remains the spine. Two accent swatches—mint and amber (with alpha)—signal status, selection, and light highlights without breaking the editorial calm. Theme defaults to local-time auto switching: 7:00 AM-6:59 PM stays light, 7:00 PM-6:59 AM turns dark. In dark mode, those accents switch to complementary variants: mint moves red, amber moves blue.'}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
              {isZh ? '中性阶（stone）' : 'Neutral ramp (stone)'}
            </p>
            <div className="theme-preview-neutral mt-3 grid gap-3 sm:grid-cols-2">
              {brandGuidePalette.map((row) => (
                <div
                  key={row.hex}
                  className={`flex gap-3 rounded-xl border ${row.border} p-4 ${row.bg}`}
                >
                  <div className={`min-w-0 flex-1 text-sm ${row.text}`}>
                    <p className="font-mono text-xs opacity-80">{row.hex}</p>
                    <p className="mt-1 font-medium leading-snug">{row.usage[language]}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-stone-500">
              {isZh ? '品牌强调色' : 'Brand accents'}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {brandGuideAccent.map((row) => (
                <div
                  key={row.hex.light}
                  className={`flex gap-3 rounded-xl border ${row.border} p-4 ${row.bg}`}
                >
                  <div className={`min-w-0 flex-1 text-sm ${row.text}`}>
                    <p className="font-mono text-xs opacity-90">{row.hex[theme]}</p>
                    <p className="mt-1 font-medium leading-snug">{row.usage[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="🔤" size="md" tilt />
              {isZh ? '字体' : 'Typography'}
            </h2>
            <div className="mt-4 space-y-4 text-sm text-stone-700">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-stone-500">Space Grotesk · display</p>
                <p className="font-display mt-2 text-2xl font-bold text-stone-900">
                  {isZh ? '标题与引用：干净、略具编辑性格。' : 'Headlines & pull quotes: clean, slightly editorial.'}
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-stone-500">Inter · sans</p>
                <p className="mt-2 text-base leading-relaxed">
                  {isZh
                    ? '正文与 UI：中性、易读；避免过细字重导致灰度不足。'
                    : 'Body and UI: neutral and readable; avoid ultra-light weights that lose contrast.'}
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-stone-500">JetBrains Mono · mono</p>
                <p className="mt-2 font-mono text-sm text-stone-700">
                  {isZh ? '标签、时间、状态：小写宽、与 stone-500 标签搭配。' : 'Labels, dates, and status chips: wide, paired with stone-500 meta text.'}
                </p>
              </div>
            </div>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="🔖" size="md" bob />
              {isZh ? '标志与图标' : 'Logo & mark'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {isZh
                ? '站点字标为「Eden Tan」全名，使用 display 字重；图形标为圆角方底上的「E」字母标（见 favicon）。'
                : 'Wordmark is the full name “Eden Tan” in display weight; the pictogram is a rounded-square “E” mark (see favicon).'}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <img
                src={faviconSrc}
                alt=""
                width={64}
                height={64}
                className="rounded-2xl border border-stone-200 bg-white p-1 shadow-sm"
              />
              <div className="font-display text-3xl font-bold tracking-tight text-stone-900">Eden Tan</div>
            </div>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="📐" size="md" tilt />
              {isZh ? '版式与形状' : 'Layout & shape'}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-stone-700">
              {(isZh
                ? [
                    '主内容宽约 `max-w-4xl`（内页）或 `max-w-5xl`（主页），两侧留白。',
                    '卡片：`rounded-2xl` + `border-stone-200` + 轻阴影；避免重投影。',
                    '分隔：细边线优于粗分割条；时间轴可用左侧竖线 + 圆点。',
                    '顶栏可用极淡 `border-eden-mint` 作为品牌线，不抢内容。',
                  ]
                : [
                    'Main column: about `max-w-4xl` on inner pages, `max-w-5xl` on home—keep generous margins.',
                    'Cards: `rounded-2xl`, `border-stone-200`, subtle shadow—skip heavy drop shadows.',
                    'Dividers: hairline borders over thick bands; timelines use a left rail with dots.',
                    'The fixed nav can carry a whisper-thin `border-eden-mint` brand line—keep it subtle.',
                  ]
              ).map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="💡" size="md" tilt />
              {isZh ? '背景系统' : 'Background system'}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '底纸层' : 'Paper layer'}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {isZh
                    ? '全站用 `page-shell::before` 承接底纸纹理：细网格、淡线和轻高光。它负责材质感，不负责戏剧性。'
                    : 'Use `page-shell::before` for the paper texture: fine grid, hairlines, and a soft highlight. It carries materiality, not drama.'}
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '灯光层' : 'Light layer'}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {isZh
                    ? '`page-shell::after` 负责会动的 radial light。暗色模式下走补色逻辑：mint 对应红灯，amber 对应蓝灯。'
                    : '`page-shell::after` owns the moving radial lights. In dark mode, those lights follow the complementary system: mint becomes red, amber becomes blue.'}
                </p>
              </div>
            </div>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="🧩" size="md" bob />
              {isZh ? '组件习惯' : 'Component habits'}
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <FlatEmoji emoji="🗺️" delayMs={0} />
                <FlatEmoji emoji="✨" delayMs={120} />
                <span className="text-sm text-stone-600">
                  {isZh ? '`.flat-emoji` + `emoji-bob` / `emoji-tilt`（见 `index.css`）' : '`.flat-emoji` + `emoji-bob` / `emoji-tilt` (see `index.css`)'}
                </span>
              </div>
              <p className="text-sm text-stone-600">
                {isZh
                  ? '强调色 Token：`eden-mint` 与 `eden-amber` 在 `index.css` 的 `@theme` 注册；主题默认是 `自动 / 浅色 / 深色` 三态，其中自动模式按用户本地时间切换，dark mode 下补色版本会自动生效（mint -> red，amber -> blue）。'
                  : 'Accent tokens `eden-mint` and `eden-amber` are registered in `@theme` inside `index.css`; theme now supports Auto / Light / Dark, with Auto following the user’s local time. When dark mode is active, complementary variants apply automatically (mint -> red, amber -> blue).'}
              </p>
              <p className="text-sm text-stone-600">
                {isZh
                  ? '可复用动效类：页面根容器用 `page-shell`，主要卡片用 `motion-card`，轻强调可挂 `motion-accent`。当前 `motion-card` 自带顶边扫光和底部 bloom。'
                  : 'Reusable motion classes: use `page-shell` on page roots, `motion-card` on major cards, and `motion-accent` for restrained emphasis. The current `motion-card` also carries a top-edge flare and a low bloom.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700">
                  {isZh ? '示例标签' : 'Sample chip'}
                </span>
                <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-white">
                  {isZh ? '主按钮语气' : 'Primary CTA tone'}
                </span>
              </div>
              <div className="rounded-2xl bg-stone-900 p-5 text-stone-100">
                <p className="font-display text-lg font-bold">{isZh ? '反色联系块' : 'Inverted connect panel'}</p>
                <p className="mt-2 text-sm text-stone-400">
                  {isZh ? '用于侧栏强调链接；文字层级用 stone-50 / stone-400。' : 'For sidebar emphasis; use stone-50 / stone-400 for hierarchy.'}
                </p>
              </div>
            </div>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="💬" size="md" tilt />
              {isZh ? '语气与写作' : 'Voice & writing'}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '更贴近' : 'Prefer'}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-stone-700">
                  {(isZh
                    ? ['具体场景与时间点', '短句 + 可接话的留白', '先承认再建议']
                    : ['Concrete scenes and timestamps', 'Short lines with room to respond', 'Acknowledge, then advise']
                  ).map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '尽量避开' : 'Avoid'}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-stone-700">
                  {(isZh
                    ? ['堆叠抽象大词', '成功学金句压场', '客服腔 / 主持稿腔']
                    : ['Stacks of abstract buzzwords', 'Motivational poster quotes', 'Support-script or host-script tone']
                  ).map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="🌀" size="md" bob />
              {isZh ? '动效与无障碍' : 'Motion & accessibility'}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-stone-700">
              {(isZh
                ? [
                    '动效分三层：页面进入（`page-enter`）、卡片反馈（`motion-card`）、背景灯光（`light-orbit` / `light-pulse`）。',
                    '当前节奏：背景灯约 `38s` 漂移、`11s` 呼吸；主题切换 `320ms`；卡片 hover `420ms`；底部 bloom `520ms`；页面淡入 `480ms`。',
                    '卡片顶边扫光使用 `background-size: 300%`，亮带从右往左走，再慢慢漂回去；它应该像远处的光，不像贴在卡片上的高亮条。',
                    '尊重 `prefers-reduced-motion`：背景灯、入场、hover 浮起、emoji 动画都会关闭。',
                    '装饰性 emoji 使用 `aria-hidden`，避免屏幕阅读器重复读表情。',
                  ]
                : [
                    'Motion works in three layers: page entry (`page-enter`), card feedback (`motion-card`), and ambient background lights (`light-orbit` / `light-pulse`).',
                    'Current pacing: ambient lights drift at about `38s` with an `11s` breath; theme transitions run at `320ms`; card hover at `420ms`; bottom bloom at `520ms`; page entry at `480ms`.',
                    'The card-edge flare uses `background-size: 300%`, drifting from right to left and then back again. It should feel like distant light passing by, not a pasted-on highlight.',
                    'Honor `prefers-reduced-motion`: lights, entry, hover lift, and emoji animations all disable automatically.',
                    'Decorative emojis use `aria-hidden` so assistive tech is not flooded with glyph names.',
                  ]
              ).map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-8 text-center text-xs text-stone-500">
            {isZh ? '最后更新以代码库与 log 为准。' : 'For the latest changes, follow the repo and `log.md`.'}
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
              {isZh ? '完整职业项目记录' : 'Full Career Project Records'}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-stone-600">
              {isZh
                ? '这个页面整理了我过往项目档案的完整结构，并保留每个阶段背后的执行语境。'
                : 'This page clones the full content structure from my previous project archive and preserves the operational context behind each stage of work.'}
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
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {isZh ? '手上还在长的几件事' : 'What I am building now'}
                </p>
                <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
                  {isZh ? 'Jiju.pet：从 0 到 1' : 'Jiju.pet: From 0 to 1'}
                </h1>
              </div>
              <a
                href="https://jiju.pet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white ring-2 ring-transparent transition-all hover:bg-stone-800 hover:ring-eden-amber/55 focus-visible:outline-none focus-visible:ring-eden-amber/60"
              >
                {isZh ? '打开 jiju.pet' : 'Open jiju.pet'}
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <FlatEmoji emoji="🐾" delayMs={0} />
              <FlatEmoji emoji="📖" delayMs={160} />
              <FlatEmoji emoji="✨" delayMs={320} />
            </div>

            <p className="mt-6 text-base leading-relaxed text-stone-600">
              {isZh
                ? '这一页不是修好才拿出来展示的故事，而是我边做边记录的现场版本。你会先看到我反复使用的三条决策 DNA，再看知识摘要，最后进入九段连载：每段先一句旁白，再拆当时为什么这样判断、怎么落地、最后换来什么。'
                : 'This page is not a polished retrospective. It is the live operating log: three decision habits I keep repeating, a distilled knowledge summary, then nine chapters in sequence. Each chapter opens with a short voice-over, followed by why I chose that path, how I executed, and what changed.'}
            </p>
          </div>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              {isZh ? '决策 DNA' : 'Decision DNA'}
            </p>
            <h2 className="mt-2 flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900 md:text-3xl">
              <FlatEmoji emoji="🧬" size="lg" bob />
              {isZh ? '我的思考、规划与执行方式' : 'How I think, plan, and execute'}
            </h2>
            <div className="mt-5 space-y-4">
              {decisionDna.map((item, dnaIndex) => (
                <div
                  key={item.trait.en}
                  className="flex gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 transition-shadow duration-300 hover:shadow-md"
                >
                  <FlatEmoji emoji={item.emoji} size="sm" bob delayMs={dnaIndex * 140} />
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-stone-900">{item.trait[language]}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-700">{item.detail[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="motion-card mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              {isZh ? '知识摘要' : 'Knowledge Summary'}
            </p>
            <h2 className="mt-2 flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900 md:text-3xl">
              <FlatEmoji emoji="📚" size="lg" tilt />
              {isZh ? '来自 Jiju 知识库的核心要点' : 'Core points extracted from my Jiju knowledge base'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {isZh
                ? '这部分从 Jiju 当前全部笔记里抽出了“最常被反复验证”的要点，覆盖产品定位、执行体系、安全边界、增长分析、设计原则与社区方向。'
                : 'This section distills the most repeatedly validated points from current Jiju notes: product positioning, execution system, safety boundaries, growth analytics, design principles, and community direction.'}
            </p>
            <div className="mt-5 space-y-4">
              {jijuKnowledgeHighlights.map((section) => (
                <section
                  key={section.title.en}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-4 transition-shadow duration-300 hover:shadow-md"
                >
                  <h3 className="flex items-center gap-2 text-base font-semibold text-stone-900">
                    <FlatEmoji emoji={section.emoji} size="sm" bob={false} tilt />
                    {section.title[language]}
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm text-stone-700">
                    {section.points[language].map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <div className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '九段连载' : 'Nine chapters'}
                </p>
                <h2 className="mt-1 flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900 md:text-3xl">
                  <FlatEmoji emoji="🎞️" size="lg" bob />
                  {isZh ? '从地基，到今天的写法' : 'From foundation to how I build now'}
                </h2>
              </div>
              <p className="max-w-xs text-xs font-medium leading-relaxed text-stone-500 md:text-right">
                {isZh
                  ? '左右滑动阅读。每张卡都是同一结构：旁白开场 -> 当时判断 -> 方案落地 -> 结果变化。'
                  : 'Swipe horizontally. Every card follows the same rhythm: voice-over -> decision logic -> execution -> outcome.'}
              </p>
            </div>

            <div className="mt-4 -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3">
            {jijuBuildFromZeroToOne.map((item, index) => (
                <section
                  key={item.phase.en}
                  className="motion-card min-w-[88%] snap-start rounded-2xl border border-stone-200 bg-gradient-to-b from-stone-50/70 to-white p-6 shadow-sm outline outline-1 -outline-offset-1 outline-stone-200/80 ring-1 ring-stone-900/[0.04] transition-shadow duration-300 hover:shadow-md md:min-w-[560px] md:p-7 lg:min-w-[620px]"
                >
                <div className="flex items-start justify-between gap-3 border-b border-dashed border-stone-200/90 pb-4">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <FlatEmoji emoji={item.emoji} bob delayMs={index * 120} />
                    <h2 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">
                      {item.phase[language]}
                    </h2>
                  </div>
                  <span className="shrink-0 rounded-lg border border-amber-700/20 bg-gradient-to-br from-eden-amber/40 to-amber-100/50 px-2.5 py-1 font-mono text-xs font-semibold text-amber-950 tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-eden-mint/30 bg-gradient-to-br from-eden-mint/25 via-stone-50/90 to-white p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] outline outline-1 -outline-offset-1 outline-eden-mint/20">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-teal-900/80">
                    <span aria-hidden>💬</span>
                    {isZh ? '旁白' : 'Voice'}
                  </p>
                  <p className="chapter-voice-enter mt-2 border-l-[3px] border-eden-mint pl-3 text-base leading-relaxed text-stone-700">
                    {item.chapterVoice[language]}
                  </p>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-stone-200/90 bg-white outline outline-1 -outline-offset-1 outline-amber-700/10 ring-1 ring-amber-700/[0.06]">
                  <p className="flex items-center gap-2 border-b border-amber-700/10 bg-gradient-to-r from-eden-amber/15 to-amber-50/40 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-amber-950/90">
                    <span aria-hidden>🧩</span>
                    {isZh ? '背景与判断' : 'Context & judgment'}
                  </p>
                  <div className="divide-y divide-stone-200/80">
                    <div className="px-3 py-3">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-900/70">
                        <span aria-hidden>📅</span>
                        {isZh ? '时间' : 'When'}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-stone-700">{item.when[language]}</p>
                    </div>
                    <div className="px-3 py-3">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-900/70">
                        <span aria-hidden>🎯</span>
                        {isZh ? '为什么做' : 'Why'}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-stone-700">{item.why[language]}</p>
                    </div>
                    <div className="px-3 py-3">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-900/70">
                        <span aria-hidden>💭</span>
                        {isZh ? '思考判断' : 'Thinking'}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-stone-700">{item.thinking[language]}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-stone-200/90 bg-white outline outline-1 -outline-offset-1 outline-teal-700/12 ring-1 ring-teal-800/[0.05]">
                  <p className="flex items-center gap-2 border-b border-eden-mint/20 bg-gradient-to-r from-eden-mint/20 to-stone-50/80 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-teal-950/80">
                    <span aria-hidden>🛠️</span>
                    {isZh ? '规划与执行' : 'Plan & execution'}
                  </p>
                  <div className="space-y-0 divide-y divide-stone-200/80">
                    <div className="px-3 py-3">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-900/70">
                        <span aria-hidden>🗺️</span>
                        {isZh ? '规划方案' : 'Planning'}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-stone-700">{item.planning[language]}</p>
                    </div>
                    <div className="px-3 py-3">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-900/70">
                        <span aria-hidden>✅</span>
                        {isZh ? '问题解决' : 'Problem Solving'}
                      </p>
                      <ul className="mt-2 space-y-2 text-stone-700">
                        {item.solving[language].map((step, stepIndex) => (
                          <li key={`${item.phase.en}-${stepIndex}`} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-eden-mint shadow-[0_0_0_1px_rgba(15,23,20,0.08)]" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-eden-mint/40 bg-gradient-to-br from-eden-mint/15 via-stone-50/95 to-white px-3 py-3.5 text-sm text-stone-800 outline outline-1 -outline-offset-1 outline-eden-mint/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)]">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-teal-900/85">
                    <span aria-hidden>🌱</span>
                    {isZh ? '结果' : 'Outcome'}
                  </p>
                  <p className="mt-1.5 leading-relaxed text-stone-800">{item.outcome[language]}</p>
                </div>
                </section>
            ))}
            </div>
          </div>
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
  const previousProjectsHref = joinBasePath(baseUrl, 'previous-projects');
  const analogTechHref = joinBasePath(baseUrl, 'analog-tech');
  const lifeOsHref = joinBasePath(baseUrl, 'life-os');
  const lifeHref = joinBasePath(baseUrl, 'life');
  const brandGuideHref = joinBasePath(baseUrl, 'brand-guide');
  const resumeHref = 'https://drive.google.com/uc?export=download&id=1PRXj4BwpeAX_7F9H2PJumG0slIEZmLZ0';
  const homeHref = baseUrl;
  const currentPath = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/';
  const normalizedBase = normalizePath(baseUrl);
  const pathWithoutBase =
    normalizedBase !== '/' && currentPath.startsWith(normalizedBase)
      ? normalizePath(currentPath.slice(normalizedBase.length))
      : currentPath;
  const isJijuPetFullPage = pathWithoutBase === '/jiju-pet';
  const isPreviousProjectsFullPage = pathWithoutBase === '/previous-projects';
  const isAnalogTechFullPage = pathWithoutBase === '/analog-tech';
  const isLifeOsFullPage = pathWithoutBase === '/life-os';
  const isLifeFullPage = pathWithoutBase === '/life';
  const isBrandGuideFullPage = pathWithoutBase === '/brand-guide';
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
    <div className="page-shell min-h-screen text-stone-800 font-sans selection:bg-eden-mint/30 selection:text-stone-900">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-eden-mint/35 bg-stone-50/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-tight">Eden Tan</div>
          <div className="flex items-center gap-3">
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
            <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white ring-2 ring-transparent transition-all hover:bg-stone-800 hover:ring-eden-amber/55 focus-visible:outline-none focus-visible:ring-eden-amber/60">
              <Download size={16} />
              <span>{isZh ? '简历' : 'Resume'}</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <motion.section 
          className="mb-24"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="motion-accent mb-6 inline-flex items-center gap-2 rounded-full border border-eden-mint/45 bg-eden-mint/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-stone-800">
            <MapPin size={14} className="text-stone-700" /> {isZh ? '马来西亚' : 'Malaysia Based'}
          </motion.div>

          <motion.div variants={fadeIn} className="mb-6 flex flex-wrap gap-2">
            <FlatEmoji emoji="🗺️" delayMs={0} />
            <FlatEmoji emoji="🐾" delayMs={180} />
            <FlatEmoji emoji="✨" delayMs={360} />
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="font-display text-5xl md:text-7xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
            {isZh ? (
              <>
                系统架构设计者。<br />
                数字战略执行者。<br />
                <span className="text-stone-400">也爱把想法丢进真实场景里试试。</span>
              </>
            ) : (
              <>
                Systems Architect.<br />
                Digital Strategist.<br />
                <span className="text-stone-400">Still stress-testing ideas in the real world.</span>
              </>
            )}
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl text-stone-600 max-w-2xl mb-10 leading-relaxed">
            {isZh
              ? '我大部分时间在做一件事：把「增长」从口号拆成能跑、能测、也敢复盘的一条链路。若你也带过从 0 到 1 的东西，你会懂那种——白天对齐预期、晚上改路由、还要说服自己「这一步值得」的感觉。下面是我还在写的故事；你可以挑感兴趣的往下翻。'
              : 'Most weeks, I help teams turn growth from a slogan into something that ships, can be measured, and can be reviewed without shame. If you have ever owned a zero-to-one thread, you know the mix of aligning expectations, fixing routes at night, and convincing yourself the next step still matters. This page is a few stories I am still writing—read whatever pulls you in.'}
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 mb-12">
            <a href="https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-stone-200 p-3 text-stone-700 transition-colors hover:bg-eden-mint hover:text-stone-900">
              <Linkedin size={20} />
            </a>
          </motion.div>

          <motion.blockquote variants={fadeIn} className="border-l-4 border-stone-300 pl-6 py-2">
            <p className="font-display text-xl text-stone-500 italic leading-relaxed">
              {isZh
                ? '"那些疯狂到认为自己可以改变世界的人，最后真的改变了世界。"'
                : '"The people who are crazy enough to think they can change the world are the ones who do."'}
            </p>
          </motion.blockquote>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Left Column */}
          <div className="md:col-span-2 space-y-24">
            
            {/* Active Build */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
                <FlatEmoji emoji="🧰" size="lg" tilt />
                <h2 className="font-display text-3xl font-bold text-stone-900">
                  {isZh ? '手上还在长的几件事' : 'What I am building now'}
                </h2>
              </motion.div>

              <motion.div variants={fadeIn} className="mb-12 group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-stone-900">
                    <FlatEmoji emoji="🐾" size="sm" bob delayMs={0} />
                    Jiju.pet 
                    <a href="https://jiju.pet" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <span className="rounded border border-eden-amber/45 bg-eden-amber/35 px-2 py-1 font-mono text-sm font-medium text-stone-900">
                    {isZh ? '进行中' : 'Present'}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {isZh
                    ? '养宠的人，常常不是不够爱，而是信息太散：这家店真的欢迎毛孩吗？那次出门值不值得记下来？Jiju.pet 是我在槟城、雪兰莪和新加坡之间，试着把「带牠出门」变小、变清楚的一条路径——像给回忆多一个放得稳的抽屉。'
                    : 'Pet parents rarely run out of love—they run out of trustworthy, structured information: which places truly welcome pets, and which outings deserve to be remembered. Jiju.pet is my attempt to make pet-friendly discovery and memory-keeping smaller, clearer, and repeatable across Penang, Selangor, and Singapore.'}
                </p>
                <ActiveBuildSkillRow isZh={isZh} skills={activeBuildSkillSets.jiju[isZh ? 'zh' : 'en']} />

                <a
                  href={fullPageHref}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  {isZh ? '看我怎么一路改到能上线' : 'View log'}
                  <ExternalLink size={14} />
                </a>

              </motion.div>

              <motion.div variants={fadeIn} className="mb-12 group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-stone-900">
                    <FlatEmoji emoji="🃏" size="sm" bob delayMs={80} />
                    Friday Poker Club
                    <a
                      href="https://pokerpowercard--poker-power-card-3abea.asia-southeast1.hosted.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-stone-900 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <span className="rounded border border-eden-amber/45 bg-eden-amber/35 px-2 py-1 font-mono text-sm font-medium text-stone-900">
                    {isZh ? '进行中' : 'Present'}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {isZh
                    ? '熟人桌常常需要一个「兼发牌、兼规则、兼气氛」的人。Friday Poker Club 是跑在浏览器里的同桌主机：房间口令与邀请链、按盲注与买入进桌的德州大厅、Firebase 实时同步让所有人看到同一套底池与街段，可选同桌语音；界面优先让人一眼看懂该谁动、该下多少——把解释成本从主持人身上挪开，把时间留在上牌。'
                    : 'Home games need someone to be part dealer, part referee, and part host. Friday Poker Club is a browser-based table host: room codes and invite links, a Hold’em lobby with blinds and buy-ins, Firebase realtime sync so everyone shares the same pot and streets, optional voice between seats, and a UI that favors legible actions over ceremony—less overhead for the host, more time actually playing.'}
                </p>
                <ActiveBuildSkillRow isZh={isZh} skills={activeBuildSkillSets.poker[isZh ? 'zh' : 'en']} />
              </motion.div>

              <motion.div variants={fadeIn} className="group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-stone-900">
                    <FlatEmoji emoji="📈" size="sm" bob delayMs={160} />
                    {isZh ? '营销与增长负责人' : 'Marketing Executive'}
                  </h3>
                  <span className="rounded border border-eden-mint/45 bg-eden-mint/30 px-2 py-1 font-mono text-sm font-medium text-stone-900">
                    {isZh ? '7+ 年' : '7+ Years'}
                  </span>
                </div>
                <p className="text-stone-500 font-medium mb-3">
                  {isZh ? '数字平台里的增长与交付' : 'Growth and delivery on digital platforms'}
                </p>
                <p className="text-stone-600 leading-relaxed">
                  {isZh
                    ? '增长最容易变成「报表很好看，现场很慌乱」。我那几年做的，多是先把漏斗哪一段在漏人看清楚，再谈投放、创意和运营能不能接得住。压力还在，但至少大家知道卡在哪一格。'
                    : 'Growth work quietly turns into great dashboards and messy reality. For several years my focus was naming which stage leaked people first—then aligning acquisition, creative, and operations so the story on the slide matched what the team could actually deliver.'}
                </p>
                <ActiveBuildSkillRow isZh={isZh} skills={activeBuildSkillSets.marketing[isZh ? 'zh' : 'en']} />
                <a
                  href={previousProjectsHref}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  {isZh ? '想看我以前完整接过的案子和时间线' : 'Older projects & timeline'}
                  <ExternalLink size={14} />
                </a>
              </motion.div>
            </motion.section>

            {/* Education & Certifications */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
                <FlatEmoji emoji="🎓" size="lg" bob />
                <h2 className="font-display text-3xl font-bold text-stone-900">
                  {isZh ? '后来回头看，挺关键的节点' : 'Milestones that still matter'}
                </h2>
              </motion.div>

              <div className="space-y-8 border-l-2 border-stone-200 pl-6 ml-3 relative">
                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
                    <FlatEmoji emoji="🐾" size="sm" bob />
                    {isZh ? 'Jiju.pet 创始人' : 'Founder, Jiju.pet'}
                  </h3>
                  <p className="text-stone-500 text-sm mb-1">{isZh ? 'Jiju.pet · 2026年1月' : 'Jiju.pet · January 2026'}</p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {isZh
                      ? '从产品与执行两端搭一条「宠物友好信息与回忆」可被反复走通的路径——先让一小块区域里的事情足够干净、可追溯，再往更大的地图扩。'
                      : 'Driving Jiju end-to-end: a repeatable path toward trustworthy pet-friendly discovery and remembered outings—clear in a small geography first, expandable from there.'}
                  </p>
                  <a
                    href="https://jiju.pet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    jiju.pet
                    <ExternalLink size={14} />
                  </a>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
                    <FlatEmoji emoji="🧠" size="sm" bob={false} tilt />
                    {isZh ? '门萨会员' : 'Mensa Membership'}
                  </h3>
                  <p className="text-stone-500 text-sm mb-1">August 2025</p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {isZh
                      ? '门萨（Mensa）是国际性非营利高智商社团，须在认可的标准化智商测验中达到规定分数方可入会。'
                      : 'Mensa is a nonprofit high-IQ society—you qualify through supervised, standardized tests that place you in the top percentiles.'}
                  </p>
                  <a
                    href="https://www.mensa.org/about-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    {isZh ? '了解门萨（官网）' : 'About Mensa (official)'}
                    <ExternalLink size={14} />
                  </a>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
                    <FlatEmoji emoji="🤿" size="sm" bob />
                    {isZh ? '进阶开放水域潜水证书' : 'Advanced Open Water Certification'}
                  </h3>
                  <p className="text-stone-500 text-sm mb-1">PADI · April 2024</p>
                  <p className="text-stone-600 text-sm">
                    {isZh ? '认证教练：Ong Wei Lun | Burger Dive Team Sdn Bhd' : 'Certified by Ong Wei Lun | Burger Dive Team Sdn Bhd'}
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
                    <FlatEmoji emoji="🏛️" size="sm" tilt />
                    {isZh ? '新兴经济体中的创业学' : 'Entrepreneurship in Emerging Economies'}
                  </h3>
                  <p className="text-stone-500 text-sm mb-1">HarvardX · May 2020</p>
                  <a
                    href="https://courses.edx.org/certificates/44fdae87f71e4844a7ebe3377dc3e86b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    {isZh ? '查看证书' : 'View Certificate'}
                    <ExternalLink size={14} />
                  </a>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
                    <FlatEmoji emoji="🔎" size="sm" bob />
                    {isZh ? '数字营销基础认证' : 'The Fundamental of Digital Marketing'}
                  </h3>
                  <p className="text-stone-500 text-sm mb-1">Google · Issued Dec 2019</p>
                  <p className="text-stone-600 text-sm">Credential ID: DH9 XZ6 YTE</p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
                    <FlatEmoji emoji="📜" size="sm" tilt />
                    {isZh ? '市场营销高级文凭' : 'Executive Diploma in Marketing'}
                  </h3>
                  <p className="text-stone-500 text-sm mb-1">London Examination Board · 2016 – 2018</p>
                </motion.div>
              </div>
            </motion.section>

          </div>

          {/* Right Column */}
          <div className="space-y-12">
            
            {/* Interests */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="motion-card bg-white p-8 rounded-2xl border border-stone-200 shadow-sm"
            >
              <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-bold text-stone-900">
                <FlatEmoji emoji="🧭" size="md" tilt />
                {isZh ? '兴趣方向' : 'Interests'}
              </h2>
              
              <div className="space-y-6">
                <motion.div variants={fadeIn}>
                  <div className="mb-2 flex items-center gap-2 font-bold text-stone-900">
                    <FlatEmoji emoji="🧩" size="sm" bob />
                    <a
                      href="https://edent95.github.io/8g/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-stone-600"
                    >
                      <span>{isZh ? 'Pattern Archive' : 'Pattern Archive'}</span>
                      <ExternalLink size={14} className="text-stone-400" />
                    </a>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {isZh
                      ? '长期研究人类行为、选择模式、关系结构和旧系统如何被重新整理成现代框架。公开笔记见 8G。'
                      : 'A long-running archive on human behavior, choice patterns, relationship structure, and how older frameworks can become modern systems.'}
                  </p>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <div className="mb-2 flex items-center gap-2 font-bold text-stone-900">
                    <FlatEmoji emoji="📷" size="sm" bob delayMs={100} />
                    <a
                      href={analogTechHref}
                      className="inline-flex items-center gap-2 transition-colors hover:text-stone-600"
                    >
                      <span>{isZh ? '模拟科技' : 'Analog Tech'}</span>
                      <ExternalLink size={14} className="text-stone-400" />
                    </a>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {isZh
                      ? '收藏 Rolleiflex 相机与机械留声机，长期关注模拟技术的工艺与质感。'
                      : 'Collector of Rolleiflex cameras and mechanical gramophones.'}
                  </p>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <div className="mb-2 flex items-center gap-2 font-bold text-stone-900">
                    <FlatEmoji emoji="🧬" size="sm" tilt />
                    <a
                      href={lifeOsHref}
                      className="inline-flex items-center gap-2 transition-colors hover:text-stone-600"
                    >
                      <span>Life OS</span>
                      <ExternalLink size={14} className="text-stone-400" />
                    </a>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {isZh
                      ? '把人格、经历、欲望、阴影和能力转译成 RPG 角色卡、技能系统与成长路线。'
                      : 'A life RPG character system that turns personality, experience, desire, shadow, and ability into skills, debuffs, and upgrade paths.'}
                  </p>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <div className="mb-2 flex items-center gap-2 font-bold text-stone-900">
                    <FlatEmoji emoji="🌊" size="sm" tilt />
                    <a
                      href={lifeHref}
                      className="inline-flex items-center gap-2 transition-colors hover:text-stone-600"
                    >
                      <span>{isZh ? '生活' : 'Life'}</span>
                      <ExternalLink size={14} className="text-stone-400" />
                    </a>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {isZh
                      ? '持证潜水员，同时热爱米酒酿造与生态缸搭建。'
                      : 'Certified Scuba Diver, Homebrewer (Rice Wine), and Terrarium enthusiast.'}
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Quick Links */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="motion-card rounded-2xl border border-eden-mint/25 bg-stone-900 p-8 text-stone-50 shadow-sm ring-1 ring-eden-mint/15"
            >
              <h2 className="mb-6 font-display text-xl font-bold">{isZh ? '联系我' : 'Connect'}</h2>
              <div className="space-y-4">
                <a href="https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-400 transition-colors hover:text-eden-mint">
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 py-8 text-center text-stone-500 text-sm">
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
