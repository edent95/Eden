/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LEGACY — not rendered by any route. App.tsx never imports this file, so it is not in the
 * bundle; it is kept only as reference material from an earlier page version. Delete it rather
 * than wiring it back in; live routes are the lazy pages registered in App.tsx.
 */

import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { HeaderControls, joinBasePath } from '../../app/shared';
import type { Language, Theme, ThemePreference } from '../../app/shared';

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

export const JijuPetLegacyFullPage: React.FC<{
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
