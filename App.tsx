/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Instagram, 
  Youtube, 
  ExternalLink,
  Download,
  Briefcase,
  GraduationCap,
  Compass,
  Camera,
  Brain,
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

const jijuBuildFromZeroToOne = [
  {
    phase: { en: 'Phase 01 · Foundation', zh: '阶段 01 · 基础稳定化' },
    when: { en: 'Mar 25 - Apr 2, 2026', zh: '2026/03/25 - 2026/04/02' },
    why: {
      en: 'I had to eliminate recurring reliability failures before scaling features.',
      zh: '在扩功能前，我必须先消除反复出现的稳定性故障。',
    },
    thinking: {
      en: 'I prioritized the highest user-loss risks first: auth instability, permission drift, and route inconsistency.',
      zh: '我先处理最会造成用户流失的风险：登录不稳、权限漂移、路由不一致。',
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
      en: 'The product moved from fragile to dependable, enabling faster iteration.',
      zh: '产品从“能跑但脆弱”变成“可依赖可迭代”的状态。',
    },
  },
  {
    phase: { en: 'Phase 02 · Core Journey Completion', zh: '阶段 02 · 主路径闭环' },
    when: { en: 'Apr 2 - Apr 7, 2026', zh: '2026/04/02 - 2026/04/07' },
    why: {
      en: 'Feature availability was not equal to journey completion.',
      zh: '“有功能”不等于“用户能完整走完流程”。',
    },
    thinking: {
      en: 'I optimized for end-to-end flow completion, not feature quantity.',
      zh: '我优化的是端到端完成率，而不是功能数量。',
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
      en: 'User experience became connected and finishable, not fragmented.',
      zh: '用户体验从碎片化变成连贯、可完成的流程。',
    },
  },
  {
    phase: { en: 'Phase 03 · Analytics Foundation', zh: '阶段 03 · 分析体系打底' },
    when: { en: 'Apr 7 - Apr 8, 2026', zh: '2026/04/07 - 2026/04/08' },
    why: {
      en: 'I needed behavioral visibility to make better product decisions.',
      zh: '我需要先看见真实行为，才能做更准确的产品决策。',
    },
    thinking: {
      en: 'If I cannot observe a journey, I cannot improve it.',
      zh: '看不见路径，就无法优化路径。',
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
      en: 'Decisions shifted from assumptions to measurable user behavior.',
      zh: '决策从经验猜测，转向可观测、可验证的数据判断。',
    },
  },
  {
    phase: { en: 'Phase 04 · Mobile UX Hardening', zh: '阶段 04 · 移动端体验加固' },
    when: { en: 'Apr 7 - Apr 14, 2026', zh: '2026/04/07 - 2026/04/14' },
    why: {
      en: 'Mobile friction was blocking activation and install success.',
      zh: '移动端摩擦正在直接阻碍激活与安装转化。',
    },
    thinking: {
      en: 'Minor mobile friction creates major retention loss.',
      zh: '移动端的小摩擦，会放大成留存流失。',
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
      en: 'The mobile first-session experience became clearer and easier to complete.',
      zh: '移动端首会话更清晰，完成关键动作更顺畅。',
    },
  },
  {
    phase: { en: 'Phase 05 · Sanctuary Productization', zh: '阶段 05 · Sanctuary 产品化' },
    when: { en: 'Apr 2 - Apr 10, 2026', zh: '2026/04/02 - 2026/04/10' },
    why: {
      en: 'Sanctuary needed to function as a real user loop, not a conceptual page.',
      zh: 'Sanctuary 必须成为真实可运行闭环，而不是概念页。',
    },
    thinking: {
      en: 'A module is only real if users can enter, act, and see impact.',
      zh: '用户能进入、能行动、能看到影响，模块才算真实存在。',
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
      en: 'Sanctuary became a functioning product loop with user and trust value.',
      zh: 'Sanctuary 从概念模块升级为有用户价值与信任价值的闭环。',
    },
  },
  {
    phase: { en: 'Phase 06 · SEO Architecture', zh: '阶段 06 · SEO 结构升级' },
    when: { en: 'Apr 9 - Apr 13, 2026', zh: '2026/04/09 - 2026/04/13' },
    why: {
      en: 'Discovery bottlenecks came from structure gaps, not content volume gaps.',
      zh: '增长瓶颈主要来自结构缺口，而不是内容数量不足。',
    },
    thinking: {
      en: 'Search growth depends on intent coverage and internal authority flow.',
      zh: '搜索增长依赖意图覆盖与站内权重流动。',
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
      en: 'Discovery quality improved through stronger relevance and site structure.',
      zh: '通过更强相关性与更稳结构，整体发现质量明显提升。',
    },
  },
  {
    phase: { en: 'Phase 07 · Backoffice Safety', zh: '阶段 07 · 后台操作安全' },
    when: { en: 'Apr 13 - Apr 15, 2026', zh: '2026/04/13 - 2026/04/15' },
    why: {
      en: 'Broad BO save writes were overwriting valid production settings.',
      zh: '后台整包写入会覆盖线上有效配置，风险过高。',
    },
    thinking: {
      en: 'Operational safety must be built into write behavior.',
      zh: '操作安全必须体现在写入机制本身。',
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
      en: 'Backoffice became significantly safer for daily use.',
      zh: '后台日常操作安全性显著提升。',
    },
  },
  {
    phase: { en: 'Phase 08 · Documentation System', zh: '阶段 08 · 文档与记忆系统' },
    when: { en: 'Mar 25 - Present', zh: '2026/03/25 - 至今' },
    why: {
      en: 'I wanted decisions to compound, not disappear into temporary chats.',
      zh: '我希望决策可复利沉淀，而不是消失在临时对话里。',
    },
    thinking: {
      en: 'Documentation is execution infrastructure, not admin overhead.',
      zh: '文档是执行基础设施，不是管理负担。',
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
      en: 'The project gained a durable memory layer that speeds future decisions.',
      zh: '项目形成可持续调用的记忆层，后续决策速度更快。',
    },
  },
  {
    phase: { en: 'Phase 09 · Build Philosophy', zh: '阶段 09 · 构建哲学' },
    when: { en: 'Current', zh: '当前进行中' },
    why: {
      en: 'I want readers to understand how I think, not just what I shipped.',
      zh: '我希望别人看到的不只是产出，更是我如何判断与执行。',
    },
    thinking: {
      en: 'I optimize for truth, continuity, and repeatability over short-term vanity.',
      zh: '我优先真相、连续性、可复用性，而不是短期展示效果。',
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
      en: 'jiju.pet evolves as a compounding system, not a one-off build.',
      zh: 'jiju.pet 以“可复利系统”持续演进，而不是一次性开发。',
    },
  },
];

const decisionDna = [
  {
    trait: { en: 'Stability before expansion', zh: '先稳定，再扩张' },
    detail: {
      en: 'I do not chase visible wins while core reliability is unstable. I fix failure points first.',
      zh: '当核心可靠性不稳时，我不会追求表面成果；先止损、先修基础。',
    },
  },
  {
    trait: { en: 'Journey completion before feature breadth', zh: '先保证闭环，再谈功能广度' },
    detail: {
      en: 'I prioritize whether users can complete key flows from start to finish.',
      zh: '我优先判断用户能否从头到尾走完关键路径。',
    },
  },
  {
    trait: { en: 'Every change is documented for reuse', zh: '每次改动都沉淀可复用知识' },
    detail: {
      en: 'I capture why, impact, and next actions so future decisions become faster and cleaner.',
      zh: '我记录原因、影响与下一步，让后续决策更快、更干净。',
    },
  },
];

const jijuKnowledgeHighlights = [
  {
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
    alt: { en: 'Analog street photography scene', zh: '胶片街景摄影' },
    caption: { en: 'Street perspective captured on analog film.', zh: '胶片质感下的街景透视。' },
  },
  {
    src: '/analog-tech/analog-tech-2.png',
    alt: { en: 'Analog city skyline scene', zh: '胶片城市天际线' },
    caption: { en: 'City skyline and weather texture on film grain.', zh: '天际线与天气层次在颗粒中的呈现。' },
  },
  {
    src: '/analog-tech/analog-tech-3.png',
    alt: { en: 'Analog tower photograph', zh: '胶片高塔建筑' },
    caption: { en: 'Urban architecture study on analog film.', zh: '胶片记录的城市建筑观察。' },
  },
  {
    src: '/analog-tech/analog-tech-4.png',
    alt: { en: 'Analog waterfront scene', zh: '胶片滨水场景' },
    caption: { en: 'Waterfront perspective with soft film highlights.', zh: '柔和高光下的滨水视角。' },
  },
  {
    src: '/analog-tech/analog-tech-5.png',
    alt: { en: 'Analog garden and light leak scene', zh: '胶片花园与漏光' },
    caption: { en: 'Natural texture and light leak character from film.', zh: '自然纹理与胶片漏光气质。' },
  },
  {
    src: '/analog-tech/analog-tech-6.png',
    alt: { en: 'Analog temple architecture detail', zh: '胶片庙宇建筑细节' },
    caption: { en: 'Architectural detail and texture captured in film grain.', zh: '颗粒中保留的建筑细节与材质。' },
  },
  {
    src: '/analog-tech/analog-tech-7.png',
    alt: { en: 'Analog mountain landscape', zh: '胶片山景' },
    caption: { en: 'Atmospheric landscape depth from analog exposure.', zh: '曝光层次带来的空气感与景深。' },
  },
  {
    src: '/analog-tech/analog-tech-8.png',
    alt: { en: 'Analog city coastline scene', zh: '胶片城市海岸线' },
    caption: { en: 'Coastal city framing with film color response.', zh: '胶片色彩响应下的海岸城市构图。' },
  },
  {
    src: '/analog-tech/analog-tech-9.png',
    alt: { en: 'Analog sea and sky horizon', zh: '胶片海天交界' },
    caption: { en: 'Open horizon composition under dynamic cloud layers.', zh: '云层变化下的开阔海平线构图。' },
  },
  {
    src: '/analog-tech/analog-tech-10.png',
    alt: { en: 'Analog geometric frame and bicycle scene', zh: '胶片几何构图与单车' },
    caption: { en: 'Geometric urban composition with strong visual center.', zh: '强视觉中心的城市几何构图。' },
  },
  {
    src: '/analog-tech/analog-tech-11.png',
    alt: { en: 'Analog candid portrait by the sea', zh: '胶片海边抓拍人像' },
    caption: { en: 'Candid social moment documented on analog film.', zh: '胶片记录的海边日常瞬间。' },
  },
];

const lifeVideos = [
  {
    title: { en: 'Pulau Tioman', zh: '刁曼岛' },
    href: 'https://www.youtube.com/watch?v=WMqBLHCMtps',
    thumbnailSrc: 'https://i.ytimg.com/vi/WMqBLHCMtps/hqdefault.jpg',
  },
  {
    title: { en: 'Desaru Surfing', zh: '迪沙鲁冲浪' },
    href: 'https://www.youtube.com/watch?v=Ingu-WLZWhA',
    thumbnailSrc: 'https://i.ytimg.com/vi/Ingu-WLZWhA/hqdefault.jpg',
  },
  {
    title: { en: 'Pulau Kapas', zh: '棉花岛' },
    href: 'https://www.youtube.com/watch?v=qC8KuD9n14g',
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
        label: { en: '1+1 Bonus Key Combo Builder', zh: '1+1 奖金密钥组合构建器' },
        href: '/archive/11-bonus-key-combo-builder',
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
    title: { en: '1+1 Bonus Key Combo Builder', zh: '1+1 奖金密钥组合构建器' },
    origin: { en: 'Archived from my former domain.', zh: '归档自我曾使用的域名项目。' },
    summary: {
      en: 'An internal utility page for planning provider combinations, ranking constraints, and claim-ready campaign mixes.',
      zh: '内部工具页：用于规划供应商组合、排序约束与可申领的活动配方。',
    },
    sections: [
      {
        heading: { en: 'Purpose and Use Case', zh: '用途与场景' },
        points: {
          en: [
            'Help campaign operators quickly assemble promotion combinations.',
            'Reduce manual errors when selecting and pairing partner campaigns.',
            'Create a repeatable workflow for claim and tracking operations.',
          ],
          zh: [
            '帮助活动运营快速拼出可用的活动组合。',
            '降低选择与合作方配对时的人工失误。',
            '形成可重复的申领与跟踪工作流。',
          ],
        },
      },
      {
        heading: { en: 'Interface and Logic Preserved', zh: '界面与逻辑（保留）' },
        points: {
          en: [
            'Interface centered around partner cards, tier visibility, and combo claim actions.',
            'Included used-partner state controls to prevent duplicate claim mistakes.',
            'Top-position slot model enforced ranking compatibility before final selection.',
            'Campaign combo count and slot occupancy were continuously updated in-page.',
          ],
          zh: [
            '界面以合作方卡片、层级可见性与组合申领动作为中心。',
            '包含「已使用合作方」状态，避免重复申领错误。',
            '置顶位槽位模型在最终选择前校验排序兼容性。',
            '活动组合数量与槽位占用会在页面内持续更新。',
          ],
        },
      },
      {
        heading: { en: 'Partner Scope Captured', zh: '已覆盖的合作方范围' },
        points: {
          en: [
            'Partner set includes Rich Gaming, Evo888H5, MegaH5, WF Gaming, EpicWin, UU Slots, AFB, Advant Play, 888King, BT Gaming, Creative Gaming, BNG, Joker, Meta Gaming, CP Games, PEGASUS, CrowdPlay, RSG, PlayStar, Mancala Gaming, and ClotPlay.',
            'Each partner record carried T&C context such as top-placement requirements, banner obligations, and campaign clauses.',
            'Operational behavior focused on execution safety, not visual marketing.',
          ],
          zh: [
            '合作方集合包含 Rich Gaming、Evo888H5、MegaH5、WF Gaming、EpicWin、UU Slots、AFB、Advant Play、888King、BT Gaming、Creative Gaming、BNG、Joker、Meta Gaming、CP Games、PEGASUS、CrowdPlay、RSG、PlayStar、Mancala Gaming、ClotPlay 等。',
            '每条合作方记录附带条款语境，如置顶要求、横幅义务与活动条款。',
            '操作逻辑优先保证执行安全，而非视觉营销展示。',
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
    title: { en: 'Soccerking Content System', zh: 'Soccerking 内容体系' },
    origin: { en: 'Archived from my former domain.', zh: '归档自我曾使用的域名项目。' },
    summary: {
      en: 'A social content operation framework designed to attract traffic, improve engagement, and increase brand awareness.',
      zh: '面向社媒运营的内容框架：引流、提升互动并强化品牌认知。',
    },
    imageGallery: [
      {
        src: '/archive-images/soccerking/icon.png',
        alt: { en: 'Soccerking project icon', zh: 'Soccerking 项目图标' },
        caption: { en: 'Original Soccerking project icon.', zh: '原始 Soccerking 项目图标。' },
      },
      {
        src: '/archive-images/soccerking/P1.png',
        alt: { en: 'Soccerking archive visual P1', zh: 'Soccerking 归档图 P1' },
      },
      {
        src: '/archive-images/soccerking/P2.png',
        alt: { en: 'Soccerking archive visual P2', zh: 'Soccerking 归档图 P2' },
      },
      {
        src: '/archive-images/soccerking/P3.png',
        alt: { en: 'Soccerking archive visual P3', zh: 'Soccerking 归档图 P3' },
      },
      {
        src: '/archive-images/soccerking/P4.png',
        alt: { en: 'Soccerking archive visual P4', zh: 'Soccerking 归档图 P4' },
      },
      {
        src: '/archive-images/soccerking/P5.png',
        alt: { en: 'Soccerking archive visual P5', zh: 'Soccerking 归档图 P5' },
      },
    ],
    sections: [
      {
        heading: { en: 'Content Strategy Framework', zh: '内容策略框架' },
        points: {
          en: [
            'Link posts for traffic acquisition and game-highlight distribution.',
            'Photo posts for engagement actions and conversation triggers.',
            'Album posts for shareable informative content and audience expansion.',
            'Template-driven post production to accelerate turnaround after match end.',
          ],
          zh: [
            '链接帖：引流与比赛高光分发。',
            '图片帖：引导互动动作与话题触发。',
            '相册帖：可分享资讯内容与受众扩张。',
            '模板化生产：缩短赛后出稿时间。',
          ],
        },
      },
      {
        heading: { en: 'Campaign Objective', zh: '活动目标' },
        points: {
          en: [
            'Increase traffic and brand exposure with structured content cadence.',
            'Drive stronger ROI by matching post types to audience behavior patterns.',
            'Use repeatable templates to accelerate publishing after matches.',
          ],
          zh: [
            '以结构化排期提升流量与品牌曝光。',
            '按受众行为匹配帖子类型，提升 ROI。',
            '用可复用模板加速赛后发布。',
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

const LanguageToggle: React.FC<{
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}> = ({ language, setLanguage }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1">
    <button
      type="button"
      onClick={() => setLanguage('en')}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        language === 'en' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
      }`}
    >
      EN
    </button>
    <button
      type="button"
      onClick={() => setLanguage('zh')}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        language === 'zh' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
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
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-stone-900 selection:text-white">
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
              {isZh ? '这里是我模拟摄影档案中的一组精选作品。' : 'A small collection from my analog photography archive.'}
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
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-stone-900 selection:text-white">
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
                <a
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 block overflow-hidden rounded-xl border border-stone-200 bg-black"
                >
                  <div className="relative aspect-video w-full">
                    <img
                      src={video.thumbnailSrc}
                      alt={`${video.title[language]} thumbnail`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-stone-900 shadow">
                        {isZh ? '在 YouTube 播放' : 'Play on YouTube'}
                        <ExternalLink size={14} />
                      </span>
                    </div>
                  </div>
                </a>
              </section>
            ))}
          </div>
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
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-stone-900 selection:text-white">
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
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-stone-900 selection:text-white">
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
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-stone-900 selection:text-white">
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
                  {isZh ? '持续构建与实战经验' : 'Active Build & Experience'}
                </p>
                <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
                  {isZh ? 'Jiju.pet：从 0 到 1' : 'Jiju.pet: From 0 to 1'}
                </h1>
              </div>
              <a
                href="https://jiju.pet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
              >
                {isZh ? '打开 jiju.pet' : 'Open jiju.pet'}
                <ExternalLink size={14} />
              </a>
            </div>

            <p className="mt-6 text-base leading-relaxed text-stone-600">
              {isZh
                ? '这是我的真实构建叙事日志。我希望读者不仅看到我做了什么，也能看懂我是怎么做、什么时候做、为什么这样做。'
                : 'This is my personal build log narrative. I wrote it so readers can understand what I built, how I built it, when each decision happened, and why each step mattered.'}
            </p>
          </div>

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              {isZh ? '决策 DNA' : 'Decision DNA'}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 md:text-3xl">
              {isZh ? '我的思考、规划与执行方式' : 'How I think, plan, and execute'}
            </h2>
            <div className="mt-5 space-y-4">
              {decisionDna.map((item) => (
                <div key={item.trait.en} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-base font-semibold text-stone-900">{item.trait[language]}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-700">{item.detail[language]}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              {isZh ? '知识摘要' : 'Knowledge Summary'}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 md:text-3xl">
              {isZh ? '来自 Jiju 知识库的核心要点' : 'Core points extracted from my Jiju knowledge base'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {isZh
                ? '这部分提炼自目前全部 Jiju 笔记内容，覆盖产品记忆、运营 SOP、后台结构、治理文档与完整变更日志。'
                : 'This summary is distilled from all current Jiju notes, including product memory, operating SOPs, backoffice structures, governance docs, and full change logs.'}
            </p>
            <div className="mt-5 space-y-4">
              {jijuKnowledgeHighlights.map((section) => (
                <section key={section.title.en} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <h3 className="text-base font-semibold text-stone-900">{section.title[language]}</h3>
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
                  {isZh ? '阶段时间轴' : 'Phase Timeline'}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-stone-900 md:text-3xl">
                  {isZh ? 'Phase 01 到 09' : 'Phase 01 to 09'}
                </h2>
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                {isZh ? '左右滑动查看' : 'Swipe left to right'}
              </p>
            </div>

            <div className="mt-4 -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3">
            {jijuBuildFromZeroToOne.map((item, index) => (
                <section
                  key={item.phase.en}
                  className="min-w-[88%] snap-start rounded-2xl border border-stone-200 bg-white p-6 shadow-sm md:min-w-[560px] md:p-7 lg:min-w-[620px]"
                >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">
                    {item.phase[language]}
                  </h2>
                  <span className="rounded bg-stone-100 px-2 py-1 font-mono text-xs text-stone-500">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '时间' : 'When'}
                </p>
                <p className="mt-1 text-base leading-relaxed text-stone-700">{item.when[language]}</p>

                <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '为什么做' : 'Why'}
                </p>
                <p className="mt-1 text-base leading-relaxed text-stone-700">{item.why[language]}</p>

                <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '思考判断' : 'Thinking'}
                </p>
                <p className="mt-1 text-base leading-relaxed text-stone-700">{item.thinking[language]}</p>

                <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '规划方案' : 'Planning'}
                </p>
                <p className="mt-1 text-base leading-relaxed text-stone-700">{item.planning[language]}</p>

                <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '问题解决' : 'Problem Solving'}
                </p>
                <ul className="mt-2 space-y-2 text-stone-700">
                  {item.solving[language].map((step, stepIndex) => (
                    <li key={`${item.phase.en}-${stepIndex}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 rounded-lg bg-stone-100 px-3 py-2 text-sm text-stone-700">
                  <span className="font-semibold">{isZh ? '结果：' : 'Outcome:'}</span> {item.outcome[language]}
                </p>
                </section>
            ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = React.useState<Language>('zh');
  const isZh = language === 'zh';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const fullPageHref = joinBasePath(baseUrl, 'jiju-pet');
  const previousProjectsHref = joinBasePath(baseUrl, 'previous-projects');
  const analogTechHref = joinBasePath(baseUrl, 'analog-tech');
  const lifeHref = joinBasePath(baseUrl, 'life');
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
  const archivedWorkSlug = pathWithoutBase.startsWith('/archive/')
    ? pathWithoutBase.replace('/archive/', '')
    : '';
  const activeArchivedWork = archivedWorks.find((item) => item.slug === archivedWorkSlug);

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
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-900 selection:text-white">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-tight">Eden Tan</div>
          <div className="flex items-center gap-3">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <a href="https://drive.google.com/uc?export=download&id=1bidz8DdSkgYu2KrsKUXnfR04J8EUo3IZ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-stone-800 transition-colors">
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
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200 text-stone-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
            <MapPin size={14} /> {isZh ? '马来西亚' : 'Malaysia Based'}
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="font-display text-5xl md:text-7xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
            {isZh ? (
              <>
                系统架构设计者。<br />
                数字战略执行者。<br />
                <span className="text-stone-400">技术探索者。</span>
              </>
            ) : (
              <>
                Systems Architect.<br />
                Digital Strategist.<br />
                <span className="text-stone-400">Tech Explorer.</span>
              </>
            )}
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl text-stone-600 max-w-2xl mb-10 leading-relaxed">
            {isZh
              ? '我是一名数字战略执行者，拥有 7 年以上经验，专注于构建可扩展的增长系统、结构化活动运营流程，以及可衡量的跨渠道执行框架。'
              : 'I am a digital strategist with 7+ years of experience building scalable growth systems, structured campaign operations, and measurable cross-channel execution frameworks.'}
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 mb-12">
            <a href="https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-200 rounded-full text-stone-700 hover:bg-stone-900 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://www.youtube.com/@DanielTan95" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-200 rounded-full text-stone-700 hover:bg-stone-900 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
            <a href="https://www.instagram.com/eden___j/" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-200 rounded-full text-stone-700 hover:bg-stone-900 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
          </motion.div>

          <motion.blockquote variants={fadeIn} className="border-l-4 border-stone-300 pl-6 py-2">
            <p className="font-display text-xl text-stone-500 italic">
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
                <div className="p-2 bg-stone-200 rounded-lg text-stone-700"><Briefcase size={24} /></div>
                <h2 className="font-display text-3xl font-bold text-stone-900">
                  {isZh ? '持续构建与实战经验' : 'Active Build & Experience'}
                </h2>
              </motion.div>

              <motion.div variants={fadeIn} className="mb-12 group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    Jiju.pet 
                    <a href="https://jiju.pet" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <span className="text-sm font-mono text-stone-500 bg-stone-200 px-2 py-1 rounded">
                    {isZh ? '进行中' : 'Present'}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {isZh
                    ? '一个完整的宠物友好生态系统，帮助宠物主人在槟城、雪兰莪与新加坡进行地点发现、体验记录与持续探索。'
                    : 'A comprehensive pet-friendly ecosystem designed to help owners discover and log adventures across Penang, Selangor, and Singapore.'}
                </p>

                <a
                  href={fullPageHref}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  {isZh ? '查看构建日志' : 'View log'}
                  <ExternalLink size={14} />
                </a>

              </motion.div>

              <motion.div variants={fadeIn} className="group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-stone-900">
                    {isZh ? '营销与增长负责人' : 'Marketing Executive'}
                  </h3>
                  <span className="text-sm font-mono text-stone-500 bg-stone-200 px-2 py-1 rounded">
                    {isZh ? '7+ 年' : '7+ Years'}
                  </span>
                </div>
                <p className="text-stone-500 font-medium mb-3">
                  {isZh ? '数字平台运营' : 'Digital Platform Operations'}
                </p>
                <p className="text-stone-600 leading-relaxed">
                  {isZh
                    ? '在高压业务环境中，搭建增长基础并执行覆盖获客、激活、留存与运营交付的全漏斗方案。'
                    : 'Built strategic growth foundations and executed full-funnel campaigns across acquisition, activation, retention, and operational delivery in high-pressure environments.'}
                </p>
                <a
                  href={previousProjectsHref}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  {isZh ? '历史项目' : 'Previous project'}
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
                <div className="p-2 bg-stone-200 rounded-lg text-stone-700"><GraduationCap size={24} /></div>
                <h2 className="font-display text-3xl font-bold text-stone-900">
                  {isZh ? '关键里程碑' : 'Milestones'}
                </h2>
              </motion.div>

              <div className="space-y-8 border-l-2 border-stone-200 pl-6 ml-3 relative">
                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="text-lg font-bold text-stone-900">
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
                  <h3 className="text-lg font-bold text-stone-900">
                    {isZh ? '进阶开放水域潜水证书' : 'Advanced Open Water Certification'}
                  </h3>
                  <p className="text-stone-500 text-sm mb-1">PADI · April 2024</p>
                  <p className="text-stone-600 text-sm">
                    {isZh ? '认证教练：Ong Wei Lun | Burger Dive Team Sdn Bhd' : 'Certified by Ong Wei Lun | Burger Dive Team Sdn Bhd'}
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="text-lg font-bold text-stone-900">
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
                  <h3 className="text-lg font-bold text-stone-900">
                    {isZh ? '数字营销基础认证' : 'The Fundamental of Digital Marketing'}
                  </h3>
                  <p className="text-stone-500 text-sm mb-1">Google · Issued Dec 2019</p>
                  <p className="text-stone-600 text-sm">Credential ID: DH9 XZ6 YTE</p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="text-lg font-bold text-stone-900">
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
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">
                {isZh ? '兴趣方向' : 'Interests'}
              </h2>
              
              <div className="space-y-6">
                <motion.div variants={fadeIn}>
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2">
                    <Brain size={18} className="text-stone-500" /> {isZh ? '玄学与命理' : 'Metaphysics'}
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {isZh
                      ? '长期实践八字、紫微斗数与易经，并将其视作古代数据系统进行结构化研究。'
                      : 'Applied study of Bazi, Zi Wei Dou Shu, and I Ching as ancient data systems.'}
                  </p>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2">
                    <Camera size={18} className="text-stone-500" />
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
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2">
                    <Compass size={18} className="text-stone-500" />
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
              className="bg-stone-900 text-stone-50 p-8 rounded-2xl shadow-sm"
            >
              <h2 className="font-display text-xl font-bold mb-6">{isZh ? '联系我' : 'Connect'}</h2>
              <div className="space-y-4">
                <a href="https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href="https://www.youtube.com/@DanielTan95" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors">
                  <Youtube size={18} /> YouTube
                </a>
                <a href="https://www.instagram.com/eden___j/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors">
                  <Instagram size={18} /> Instagram
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
      </footer>
    </div>
  );
};

export default App;
