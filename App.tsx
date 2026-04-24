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
  ArrowLeft
} from 'lucide-react';

type Language = 'en' | 'zh';

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

const AnalogTechFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}> = ({ homeHref, baseUrl, language, setLanguage }) => {
  const isZh = language === 'zh';
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
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
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
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
              <figure key={photo.src} className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
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
}> = ({ homeHref, language, setLanguage }) => {
  const isZh = language === 'zh';
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
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
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
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
              <section key={video.href} className="rounded-2xl border border-stone-200 bg-white p-5 md:p-6 shadow-sm">
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
    hex: '#7bdcb5',
    usage: {
      en: 'Accent mint · selection, language toggle, quote rail, emoji tile rim, footer hovers',
      zh: '薄荷强调 · 文本划选、语言切换、引用竖线、emoji 细边、页脚链接悬停',
    },
  },
  {
    bg: 'bg-eden-amber',
    border: 'border-amber-700/30',
    text: 'text-stone-900',
    hex: '#ffa340ed',
    usage: {
      en: 'Accent amber (with alpha) · “Present” chips, flat-emoji hover rim, primary CTA focus ring',
      zh: '琥珀强调（含透明度）·「进行中」标签、emoji 悬停描边、主按钮焦点环',
    },
  },
] as const;

const BrandGuideFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}> = ({ homeHref, baseUrl, language, setLanguage }) => {
  const isZh = language === 'zh';
  const faviconSrc = joinBasePath(baseUrl, 'favicon.svg');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
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
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <header className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="🧱" size="md" bob />
              {isZh ? '色彩' : 'Color'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {isZh
                ? '全站以 Tailwind `stone` 阶为主轴；另有两枚品牌强调色（薄荷 / 琥珀，含透明度）用于状态、划选与轻点缀，不抢 stone 的编辑基调。'
                : 'Stone remains the spine. Two accent swatches—mint and amber (with alpha)—signal status, selection, and light highlights without breaking the editorial calm.'}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
              {isZh ? '中性阶（stone）' : 'Neutral ramp (stone)'}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                  key={row.hex}
                  className={`flex gap-3 rounded-xl border ${row.border} p-4 ${row.bg}`}
                >
                  <div className={`min-w-0 flex-1 text-sm ${row.text}`}>
                    <p className="font-mono text-xs opacity-90">{row.hex}</p>
                    <p className="mt-1 font-medium leading-snug">{row.usage[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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
                  ? '强调色 Token：`eden-mint`（#7bdcb5）、`eden-amber`（#ffa340ed）—在 `index.css` 的 `@theme` 注册，可用 `bg-eden-mint`、`border-eden-amber` 等工具类。'
                  : 'Accent tokens: `eden-mint` (#7bdcb5) and `eden-amber` (#ffa340ed) are registered in `@theme` inside `index.css`—use utilities like `bg-eden-mint` and `border-eden-amber`.'}
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold text-stone-900">
              <FlatEmoji emoji="🌀" size="md" bob />
              {isZh ? '动效与无障碍' : 'Motion & accessibility'}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-stone-700">
              {(isZh
                ? [
                    '动效宜轻：`emoji-bob`、`chapter-voice-enter` 级别即可。',
                    '尊重 `prefers-reduced-motion`：动画与 hover 缩放会关闭。',
                    '装饰性 emoji 使用 `aria-hidden`，避免屏幕阅读器重复读表情。',
                  ]
                : [
                    'Keep motion subtle: `emoji-bob`, `chapter-voice-enter` scale is enough.',
                    'Honor `prefers-reduced-motion`: animations and hover scaling disable automatically.',
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
}> = ({ homeHref, baseUrl, work, language, setLanguage }) => {
  const isZh = language === 'zh';
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
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
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
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
              <section key={section.heading.en} className="rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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
              <section className="rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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
}> = ({ homeHref, baseUrl, language, setLanguage }) => {
  const isZh = language === 'zh';
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
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
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
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
              <section key={project.title.en} className="rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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
}> = ({ homeHref, language, setLanguage }) => {
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
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
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
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
                  className="min-w-[88%] snap-start rounded-2xl border border-stone-200 bg-gradient-to-b from-stone-50/70 to-white p-6 shadow-sm outline outline-1 -outline-offset-1 outline-stone-200/80 ring-1 ring-stone-900/[0.04] transition-shadow duration-300 hover:shadow-md md:min-w-[560px] md:p-7 lg:min-w-[620px]"
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
      { label: 'Game rules design', kind: 'hard' },
      { label: 'i18n', kind: 'hard' },
      { label: 'Host UX', kind: 'hard' },
      { label: 'Asset pipeline', kind: 'hard' },
      { label: 'Facilitation', kind: 'soft' },
      { label: 'Clear communication', kind: 'soft' },
    ],
    zh: [
      { label: 'React / TypeScript', kind: 'hard' },
      { label: '实时房间', kind: 'hard' },
      { label: '规则与机制设计', kind: 'hard' },
      { label: '国际化', kind: 'hard' },
      { label: '主持人体验', kind: 'hard' },
      { label: '素材流程', kind: 'hard' },
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

  React.useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const isZh = language === 'zh';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const fullPageHref = joinBasePath(baseUrl, 'jiju-pet');
  const previousProjectsHref = joinBasePath(baseUrl, 'previous-projects');
  const analogTechHref = joinBasePath(baseUrl, 'analog-tech');
  const lifeHref = joinBasePath(baseUrl, 'life');
  const brandGuideHref = joinBasePath(baseUrl, 'brand-guide');
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
    return <JijuPetFullPage homeHref={homeHref} language={language} setLanguage={setLanguage} />;
  }

  if (isPreviousProjectsFullPage) {
    return (
      <PreviousProjectsFullPage
        homeHref={homeHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  if (isAnalogTechFullPage) {
    return <AnalogTechFullPage homeHref={homeHref} baseUrl={baseUrl} language={language} setLanguage={setLanguage} />;
  }

  if (isLifeFullPage) {
    return <LifeFullPage homeHref={homeHref} language={language} setLanguage={setLanguage} />;
  }

  if (isBrandGuideFullPage) {
    return (
      <BrandGuideFullPage
        homeHref={homeHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
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
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-eden-mint/30 selection:text-stone-900">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-eden-mint/35 bg-stone-50/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-tight">Eden Tan</div>
          <div className="flex items-center gap-3">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <a href="https://drive.google.com/uc?export=download&id=1bidz8DdSkgYu2KrsKUXnfR04J8EUo3IZ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white ring-2 ring-transparent transition-all hover:bg-stone-800 hover:ring-eden-amber/55 focus-visible:outline-none focus-visible:ring-eden-amber/60">
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
          <motion.div variants={fadeIn} className="mb-6 inline-flex items-center gap-2 rounded-full border border-eden-mint/45 bg-eden-mint/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-stone-800">
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
                    Poker Power Card
                    <a
                      href="https://poker-power-card-3abea.web.app/"
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
                    ? '熟人局的快乐，一半在牌，一半在规矩怎么好玩又不吵翻。Poker Power Card 是给实桌加的一层「力量牌」：房间口令进场，Hero / Magic / Trap / Control 四类效果叠在真实发牌节奏上；法力、轮次、图库和素材下载，都是为了让主持人少费口舌、玩家多留在当下。'
                    : 'Half the fun of a home game is the cards; the other half is house rules that stay playful without turning into arguments. Poker Power Card adds a hosted layer of themed power cards—Hero, Magic, Trap, Control—on top of live play, with room codes, pacing, a searchable gallery, and assets so hosts spend less energy explaining and players stay in the moment.'}
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
              className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm"
            >
              <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-bold text-stone-900">
                <FlatEmoji emoji="🧭" size="md" tilt />
                {isZh ? '兴趣方向' : 'Interests'}
              </h2>
              
              <div className="space-y-6">
                <motion.div variants={fadeIn}>
                  <div className="mb-2 flex items-center gap-2 font-bold text-stone-900">
                    <FlatEmoji emoji="🔮" size="sm" bob />
                    <a
                      href="https://edent95.github.io/8g/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-stone-600"
                    >
                      <span>{isZh ? '玄学与命理' : 'Metaphysics'}</span>
                      <ExternalLink size={14} className="text-stone-400" />
                    </a>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {isZh
                      ? '长期实践八字、紫微斗数与易经，并将其视作古代数据系统进行结构化研究。公开笔记见 8G。'
                      : 'Applied study of Bazi, Zi Wei Dou Shu, and I Ching as ancient data systems. Public notes on 8G.'}
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
              className="rounded-2xl border border-eden-mint/25 bg-stone-900 p-8 text-stone-50 shadow-sm ring-1 ring-eden-mint/15"
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
