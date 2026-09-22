/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const archivedWorks = [
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
