/* This file is generated from the Wiki Markdown sources by scripts/wiki/build.mjs. */
/* Edit the Markdown sources, then run npm run wiki:build. */

export type SiteEssayNoteData = {
  slug: string;
  title: Record<'en' | 'zh', string>;
  summary: Record<'en' | 'zh', string>;
  category: Record<'en' | 'zh', string>;
  thesis: Record<'en' | 'zh', string>;
  datePublished: string;
  dateModified: string;
  sources: string[];
  sections: Array<{
    title: Record<'en' | 'zh', string>;
    paragraphs: Record<'en' | 'zh', string[]>;
  }>;
  originalSource?: { url: string; label: Record<'en' | 'zh', string> };
  storySource?: { url: string; label: Record<'en' | 'zh', string> };
  references?: Array<{ id: string; url: string; label: Record<'en' | 'zh', string> }>;
  referencesNote?: Record<'en' | 'zh', string>;
};

export const wikiEntries = [
  {
    "slug": "vite",
    "eyebrow": {
      "en": "Build skill",
      "zh": "构建技能"
    },
    "title": {
      "en": "Vite as the vibe-coding engine",
      "zh": "Vite 作为 vibe coding 的引擎"
    },
    "summary": {
      "en": "Vite is useful because it protects the build flow: fast dev server, fast HMR, simple config, and a production build that still forces reality checks.",
      "zh": "Vite 好用的地方，不只是快，而是它保护了构建心流：dev server 快、HMR 快、配置轻，同时 production build 仍然会逼你面对真实问题。"
    },
    "thesis": {
      "en": "For full vibe coding, use Vite as the fast loop, but keep a separate gate for typecheck, build, route checks, and broken-asset checks.",
      "zh": "如果是 fully vibe coding，Vite 应该负责“快速循环”，但必须另外保留 typecheck、build、路由检查和资源检查这道门。"
    },
    "sections": [
      {
        "title": {
          "en": "Why I adopted it",
          "zh": "为什么我会用 Vite"
        },
        "points": {
          "en": [
            "Jiju became too large to keep iterating comfortably without a faster build loop.",
            "The project needed clearer modular boundaries so UI, routes, assets, Firebase logic, and public pages could be changed without the whole app feeling tangled.",
            "Vite helped turn a heavy project into smaller feedback zones: change one page, one component, one asset path, then verify quickly."
          ],
          "zh": [
            "我会用 Vite，是因为 Jiju 项目变得太庞大，继续用慢反馈的方式迭代会一直出问题。",
            "项目需要更清楚的区块边界，让 UI、routes、assets、Firebase logic 和 public pages 不要全部缠在一起。",
            "Vite 帮我把一个很重的项目拆成更小的反馈区：改一个页面、一个组件、一个资源路径，然后快速验证。"
          ]
        }
      },
      {
        "title": {
          "en": "Why it feels good",
          "zh": "为什么它适合 vibe coding"
        },
        "points": {
          "en": [
            "Cold start is fast because dev does not bundle the whole app first.",
            "HMR keeps visual iteration alive, especially when adjusting UI, motion, copy, and microfeedback with AI.",
            "The config surface is small enough that AI can reason about the project without fighting a large custom bundler setup."
          ],
          "zh": [
            "冷启动快，因为开发环境不需要先把整个 app 打包完。",
            "HMR 让视觉迭代不中断，尤其适合和 AI 高频调整 UI、动效、文案和微反馈。",
            "配置面足够小，AI 比较容易理解项目，不会先卡在一大套自定义 bundler 配置里。"
          ]
        }
      },
      {
        "title": {
          "en": "The traps",
          "zh": "真正要小心的缺点"
        },
        "points": {
          "en": [
            "Dev and production are not identical: dev uses native ESM plus esbuild behavior, while production uses Rollup.",
            "Vite transpiles TypeScript quickly, but it does not typecheck by itself.",
            "Large component trees can create a local network waterfall during dev because many modules are requested separately.",
            "Dependency cache can create stale-behavior bugs; clearing `node_modules/.vite` or running with `--force` is sometimes necessary.",
            "Old CommonJS packages or dynamic require patterns can still create compatibility work."
          ],
          "zh": [
            "开发环境和生产环境不完全一样：dev 是 native ESM 加 esbuild 行为，production 是 Rollup 打包。",
            "Vite 会快速转译 TypeScript，但它本身不负责 typecheck。",
            "大型组件树在 dev 下可能形成本地 network waterfall，因为浏览器会分开请求很多模块。",
            "依赖缓存会制造“看起来像幽灵”的旧行为；有时要清 `node_modules/.vite` 或用 `--force` 重跑。",
            "老旧 CommonJS 包、动态 require、旧 SDK 仍然可能需要额外兼容处理。"
          ]
        }
      },
      {
        "title": {
          "en": "How to use it for full vibe coding",
          "zh": "fully vibe coding 时怎么用"
        },
        "points": {
          "en": [
            "Let `npm run dev` stay non-blocking: it should show the UI quickly and keep HMR smooth.",
            "Do not rely on the dev server as proof of correctness; run `npm run typecheck` and `npm run build` before treating a change as done.",
            "Use TypeScript as AI context, not as a wall during exploration. Prefer fixing types later in a dedicated pass instead of scattering `@ts-ignore`.",
            "Use stable imports and route helpers. Path aliases are useful, but only if the repo is structured around them consistently.",
            "Keep Firebase or backend access in a small number of service files so AI can hold the data model in context.",
            "Check real assets and public routes after changes. A passing UI can still hide broken images, wrong base paths, or missing public files."
          ],
          "zh": [
            "让 `npm run dev` 保持不阻断：它的任务是快速显示 UI，并让 HMR 顺。",
            "不要把 dev server 正常当成正确证明；完成前一定跑 `npm run typecheck` 和 `npm run build`。",
            "TypeScript 应该作为 AI 理解代码库的地图，不是探索阶段的墙。不要到处撒 `@ts-ignore`，更好的做法是最后集中修类型。",
            "import 和 route helper 要稳定。alias 很有用，但前提是整个 repo 真的按这个结构维护。",
            "Firebase 或后端访问集中在少数 service 文件里，让 AI 能一次读懂数据模型。",
            "改完要检查真实资源和公开路由。UI 能跑，不代表图片、base path、public files 都没断。"
          ]
        }
      },
      {
        "title": {
          "en": "Rule of thumb",
          "zh": "我的使用原则"
        },
        "points": {
          "en": [
            "Vite is excellent for speed, but speed must be paired with a release checklist.",
            "During exploration, optimize for flow. Before handoff, optimize for truth.",
            "The best Vite setup for AI work is boring: predictable dev server, explicit routes, clean services, and repeatable checks."
          ],
          "zh": [
            "Vite 非常适合速度，但速度必须配一套发布检查。",
            "探索时优化心流；交付前优化真实性。",
            "最适合 AI 协作的 Vite 架构其实要无聊：dev server 可预测、路由明确、service 清楚、检查可重复。"
          ]
        }
      }
    ],
    "datePublished": "2026-06-24",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "background-music",
    "eyebrow": {
      "en": "Experience layer",
      "zh": "体验层"
    },
    "title": {
      "en": "Background music changes the room",
      "zh": "Background music 会改变整张桌的气氛"
    },
    "summary": {
      "en": "A poker table is not only rules and cards. Ambient sound makes the browser feel less empty and more like a shared room.",
      "zh": "一张 poker table 不只是规则和牌。背景音乐会让浏览器不那么空，像真的有一个共同空间。"
    },
    "thesis": {
      "en": "Music should support the table mood without stealing control from the player.",
      "zh": "音乐应该支撑牌桌气氛，但不能把控制权从玩家手里拿走。"
    },
    "sections": [
      {
        "title": {
          "en": "UX rules",
          "zh": "UX 规则"
        },
        "points": {
          "en": [
            "Make sound optional and visibly controllable.",
            "Remember the player preference instead of resetting the mood every visit.",
            "Use background music as presence, not as decoration."
          ],
          "zh": [
            "声音必须可选，而且控制入口要看得见。",
            "记住玩家偏好，不要每次进来都重置气氛。",
            "背景音乐的作用是制造存在感，不是单纯装饰。"
          ]
        }
      },
      {
        "title": {
          "en": "Why it matters here",
          "zh": "为什么这项目需要它"
        },
        "points": {
          "en": [
            "The game is social, so silence can make the table feel unfinished.",
            "A calm loop helps solo BOT mode feel less like a test screen.",
            "Sound gives the table rhythm while people wait for the next action."
          ],
          "zh": [
            "这个游戏是社交场，完全安静会让桌子像还没做完。",
            "轻一点的循环音乐，会让单人 BOT 模式不像测试页面。",
            "声音能给等待下一步动作的空档一点节奏。"
          ]
        }
      }
    ],
    "datePublished": "2026-06-24",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "button-feedback",
    "eyebrow": {
      "en": "Interaction skill",
      "zh": "交互技能"
    },
    "title": {
      "en": "Click button feedback is part of trust",
      "zh": "Click button feedback 是信任的一部分"
    },
    "summary": {
      "en": "In a realtime card game, a button that does not answer back feels broken even when the code works.",
      "zh": "在实时牌局里，一个点了没反应的按钮，就算代码没坏，用户也会觉得坏了。"
    },
    "thesis": {
      "en": "Every important action needs an immediate signal: pressed, loading, accepted, blocked, or failed.",
      "zh": "每个重要操作都要马上给信号：已按下、处理中、已接受、被挡住、或失败。"
    },
    "sections": [
      {
        "title": {
          "en": "Signals to design",
          "zh": "要设计的信号"
        },
        "points": {
          "en": [
            "Pressed state: the button should physically respond.",
            "Pending state: remote actions need loading or disabled feedback.",
            "Result state: users should know whether the table accepted the action."
          ],
          "zh": [
            "按下状态：按钮要有物理反馈感。",
            "等待状态：远端动作需要 loading 或 disabled feedback。",
            "结果状态：用户要知道牌桌有没有接收这个动作。"
          ]
        }
      },
      {
        "title": {
          "en": "Reusable lesson",
          "zh": "可复用结论"
        },
        "points": {
          "en": [
            "Feedback prevents double clicks and confused retries.",
            "Small motion and sound can make the table feel alive.",
            "The best microinteraction is the one that removes doubt."
          ],
          "zh": [
            "反馈可以减少重复点击和乱重试。",
            "小动效和声音能让桌子变得更有生命感。",
            "最好的微交互，是把用户的怀疑拿掉。"
          ]
        }
      }
    ],
    "datePublished": "2026-06-24",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "firebase-lifetime-storage",
    "eyebrow": {
      "en": "Data memory",
      "zh": "数据记忆"
    },
    "title": {
      "en": "Firebase lifetime storage as table memory",
      "zh": "Firebase lifetime storage 是牌桌记忆"
    },
    "summary": {
      "en": "Firebase turns a browser game from temporary screen state into a table that can survive refreshes, reconnects, and shared links.",
      "zh": "Firebase 让浏览器游戏不只是临时画面状态，而是一张能承受刷新、重连和分享链接的桌。"
    },
    "thesis": {
      "en": "Realtime storage is not just where data sits. It defines what the table remembers and what must be cleaned up.",
      "zh": "Realtime storage 不只是放数据的地方。它决定牌桌记住什么，也决定什么必须被清掉。"
    },
    "sections": [
      {
        "title": {
          "en": "What it protects",
          "zh": "它保护什么"
        },
        "points": {
          "en": [
            "Room state can persist beyond one browser session.",
            "Players can rejoin without the table losing the shared context.",
            "Host-started public tables have a durable source of truth."
          ],
          "zh": [
            "房间状态可以活过一次浏览器 session。",
            "玩家重连时，牌桌不会丢掉共同上下文。",
            "房主开的公开桌有一个稳定的 truth source。"
          ]
        }
      },
      {
        "title": {
          "en": "Design caution",
          "zh": "设计提醒"
        },
        "points": {
          "en": [
            "Lifetime storage still needs cleanup rules.",
            "Game state should be shaped like a schema, not scattered flags.",
            "Persistence is a product decision, not only a backend decision."
          ],
          "zh": [
            "Lifetime storage 也需要 cleanup 规则。",
            "游戏状态要像 schema，不要散成一堆 flag。",
            "持久化是产品决策，不只是后端决策。"
          ]
        }
      }
    ],
    "datePublished": "2026-06-24",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "skills",
    "eyebrow": {
      "en": "Skills map",
      "zh": "技能地图"
    },
    "title": {
      "en": "Reusable skills across projects",
      "zh": "跨项目可复用 skills"
    },
    "summary": {
      "en": "Every project should be able to produce reusable skills: build loops, UX decisions, data patterns, and product judgment that can move into the next project.",
      "zh": "每个项目都应该能产出可复用 skills：构建循环、UX 判断、数据模式、产品判断，都应该能迁移到下一个项目。"
    },
    "thesis": {
      "en": "The point of the knowledge base is to turn scattered build pain into reusable operating memory, then make that memory one click away from becoming a skill.",
      "zh": "知识库的重点，是把分散的构建痛点变成可复用的操作记忆，最后让这些记忆可以 one click 变成 skill。"
    },
    "sections": [
      {
        "title": {
          "en": "Hard skills",
          "zh": "硬技能"
        },
        "points": {
          "en": [
            "Vite release loop: dev speed, build checks, route/base-path discipline.",
            "Firebase realtime memory: rooms, game state, reconnects, cleanup logic.",
            "UX implementation: audio controls, button states, loading states, table feedback."
          ],
          "zh": [
            "Vite 发布循环：开发速度、build 检查、route/base path 纪律。",
            "Firebase 实时记忆：房间、牌局状态、重连、cleanup 逻辑。",
            "UX 实作：声音控制、按钮状态、loading 状态、牌桌反馈。"
          ]
        }
      },
      {
        "title": {
          "en": "Product skills",
          "zh": "产品技能"
        },
        "points": {
          "en": [
            "Know which details make a browser game feel like a real room.",
            "Use the crew story as product context, not just decorative copy.",
            "Keep project learnings fileable so they compound into the next build."
          ],
          "zh": [
            "判断哪些细节会让浏览器游戏像真的房间。",
            "把这群人的故事当产品上下文，不只是装饰文案。",
            "把项目经验沉淀成可归档内容，让下一次 build 变快。"
          ]
        }
      },
      {
        "title": {
          "en": "Basic requirements for a skill",
          "zh": "一个 skill 的基本要求"
        },
        "points": {
          "en": [
            "It must have a clear trigger situation: when should this skill be suggested or used?",
            "It must contain a reusable rule: what judgment should transfer to another project?",
            "It must include executable steps: what should the user or agent do next?",
            "It must include checks: how do we know the skill was applied correctly?",
            "It must name the source project: where did this skill come from?",
            "It must name anti-patterns: what should this skill prevent people from doing?",
            "It must have tags for classification, retrieval, and future auto-suggestion."
          ],
          "zh": [
            "必须有清楚的触发场景：什么情况下应该推荐或使用这个 skill？",
            "必须有可复用规则：这个判断如何迁移到另一个项目？",
            "必须有可执行步骤：user 或 agent 下一步具体做什么？",
            "必须有检查方式：怎么知道这个 skill 用对了？",
            "必须写明来源项目：这个 skill 是从哪个真实项目里长出来的？",
            "必须写明反模式：这个 skill 要防止别人犯什么错？",
            "必须有 tags，用来分类、检索和未来自动推荐。"
          ]
        }
      },
      {
        "title": {
          "en": "What still needs to be added",
          "zh": "我觉得还需要补的东西"
        },
        "points": {
          "en": [
            "Each skill should record source project, trigger situation, reusable rule, anti-pattern, and proof from the build.",
            "A skill is not a diary note. It needs a repeatable action pattern: when to use it, what to check, and what output it should create.",
            "The wiki should separate raw observation, refined principle, and executable skill so future users do not confuse memory with instruction."
          ],
          "zh": [
            "每个 skill 都应该记录来源项目、触发场景、可复用规则、反模式，以及来自真实 build 的证据。",
            "skill 不是日记。它必须有可重复动作：什么时候用、检查什么、最后产出什么。",
            "wiki 要分清 raw observation、refined principle 和 executable skill，不然后续 user 会把记忆和指令混在一起。"
          ]
        }
      },
      {
        "title": {
          "en": "One-click skillization flow",
          "zh": "one click 变成 skills 的流程"
        },
        "points": {
          "en": [
            "Step 1: user highlights or selects a wiki note, build log, bug fix, or project decision.",
            "Step 2: the system extracts the skill candidate: trigger, context, rule, steps, warnings, examples, source link, and confidence.",
            "Step 3: the user sees a preview card before saving. One click should never silently publish a skill without review.",
            "Step 4: after approval, save it as a Skill Card with tags like Vite, Firebase, UX feedback, routing, analytics, or deployment.",
            "Step 5: future project pages can pull those Skill Cards back in when the same trigger appears."
          ],
          "zh": [
            "Step 1：user 选中一段 wiki note、build log、bug fix 或项目决策。",
            "Step 2：系统抽取 skill candidate：触发场景、上下文、原则、步骤、风险、例子、来源链接和信心分。",
            "Step 3：保存前先给 preview card。one click 不应该无声发布 skill，必须让 user 过目。",
            "Step 4：确认后存成 Skill Card，并打上 Vite、Firebase、UX feedback、routing、analytics、deployment 等标签。",
            "Step 5：未来其他项目遇到同类触发场景时，可以把这些 Skill Card 自动拉回来。"
          ]
        }
      },
      {
        "title": {
          "en": "Minimum data shape",
          "zh": "最小数据结构"
        },
        "points": {
          "en": [
            "title: the skill name, written as an action, not a vague topic.",
            "trigger: the situation where this skill should be suggested.",
            "reusableRule: the principle or judgment that should transfer across projects.",
            "procedure: the repeatable execution steps.",
            "checks: how to verify the skill was applied correctly.",
            "sourceProject: the project where this skill was learned.",
            "antiPatterns: the mistakes this skill should prevent.",
            "tags: categories for retrieval, filtering, and auto-suggestion.",
            "sources: links back to the original project note or build log.",
            "status: draft, reviewed, active, retired, or superseded."
          ],
          "zh": [
            "title：skill 名称，要写成动作，不要只是模糊主题。",
            "trigger：什么情况应该推荐这个 skill。",
            "reusableRule：可以跨项目迁移的原则或判断。",
            "procedure：可重复执行步骤。",
            "checks：怎么验证这个 skill 用对了。",
            "sourceProject：这个 skill 是从哪个项目里学到的。",
            "antiPatterns：这个 skill 要防止的错误做法。",
            "tags：用于检索、筛选和自动推荐的分类标签。",
            "sources：回链到原始项目笔记或 build log。",
            "status：draft、reviewed、active、retired 或 superseded。"
          ]
        }
      }
    ],
    "datePublished": "2026-06-24",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "rag-flow",
    "eyebrow": {
      "en": "Knowledge architecture",
      "zh": "知识架构"
    },
    "title": {
      "en": "Tag Registry and RAG flow",
      "zh": "Tag Registry 与 RAG flow"
    },
    "summary": {
      "en": "RAG is useful for retrieval and suggestion, but the source of truth should stay in structured wiki notes, Skill Cards, and a controlled tag registry.",
      "zh": "RAG 适合做检索和推荐，但 source of truth 应该留在结构化 wiki notes、Skill Cards 和受控 tag registry 里。"
    },
    "thesis": {
      "en": "Do not dump everything into a vector database. Build a clean knowledge layer first, then use RAG as the retrieval layer on top.",
      "zh": "不要一开始就把所有东西丢进 vector database。先把知识层整理干净，再把 RAG 放在上面做检索层。"
    },
    "sections": [
      {
        "title": {
          "en": "The full flow",
          "zh": "完整 flow"
        },
        "points": {
          "en": [
            "Raw Sources / Build Logs: immutable input and ground truth.",
            "Curated Wiki Notes: human-readable synthesis and reusable principles.",
            "Skill Cards: executable knowledge with trigger, rule, steps, checks, source project, anti-patterns, and tags.",
            "Tag Registry: controlled vocabulary for source project, tech, skill type, workflow stage, artifact type, status, and maturity.",
            "Embedding Index / RAG: retrieval layer that uses text similarity plus tag metadata filters.",
            "Query / Suggest / Auto Skill Recall: user asks a question or enters a project context, then the system recalls relevant Skill Cards."
          ],
          "zh": [
            "Raw Sources / Build Logs：不可随意改动的输入和事实来源。",
            "Curated Wiki Notes：人能读懂的整理、综合和可复用原则。",
            "Skill Cards：可执行知识，包含触发场景、规则、步骤、检查、来源项目、反模式和 tags。",
            "Tag Registry：受控标签表，管理 source project、tech、skill type、workflow stage、artifact type、status 和 maturity。",
            "Embedding Index / RAG：检索层，用语义相似度加 tag metadata filters 找内容。",
            "Query / Suggest / Auto Skill Recall：user 提问或进入项目上下文时，系统召回相关 Skill Cards。"
          ]
        }
      },
      {
        "title": {
          "en": "Tag Registry rules",
          "zh": "Tag Registry 规则"
        },
        "points": {
          "en": [
            "Tags should have ids like `tech:vite`, `project:jiju`, `skill-type:ux-feedback`, not loose hashtags.",
            "Each tag needs label, type, aliases, description, parent, status, and optional replacement.",
            "Tags classify and filter. They should not replace the actual skill content.",
            "Retire or merge duplicate tags instead of letting the registry drift."
          ],
          "zh": [
            "Tags 应该有稳定 id，例如 `tech:vite`、`project:jiju`、`skill-type:ux-feedback`，不要变成随手写 hashtag。",
            "每个 tag 需要 label、type、aliases、description、parent、status 和 optional replacement。",
            "Tags 负责分类和过滤，不能替代 skill 正文。",
            "重复 tags 要 retired 或 merge，不要让 registry 慢慢漂移。"
          ]
        }
      },
      {
        "title": {
          "en": "Why RAG fits",
          "zh": "为什么适合 RAG"
        },
        "points": {
          "en": [
            "RAG can answer questions like: have I solved a similar Vite build problem before?",
            "RAG can recommend skills when a new project context matches old triggers.",
            "RAG can help extract draft Skill Cards from build logs, bug fixes, and wiki notes.",
            "The vector database should not be the source of truth. It should be regenerated from structured cards and notes."
          ],
          "zh": [
            "RAG 可以回答：我以前有没有解决过类似的 Vite build 问题？",
            "当新项目上下文匹配旧触发场景时，RAG 可以推荐相关 skills。",
            "RAG 可以从 build logs、bug fixes 和 wiki notes 里辅助抽取 draft Skill Cards。",
            "Vector database 不应该是 source of truth。它应该从结构化 cards 和 notes 重新生成。"
          ]
        }
      },
      {
        "title": {
          "en": "Implementation order",
          "zh": "实现顺序"
        },
        "points": {
          "en": [
            "Start with `/wiki`, `/wiki/skills`, `/tag-registry`, and `/skill-cards` as structured data.",
            "Normalize tags before embedding content.",
            "Embed Skill Card fields and use tags as metadata filters.",
            "Return source links with every answer so the user can inspect the original note.",
            "Keep every generated skill in draft until reviewed."
          ],
          "zh": [
            "先把 `/wiki`、`/wiki/skills`、`/tag-registry` 和 `/skill-cards` 做成结构化数据。",
            "先规范 tags，再做 embedding。",
            "对 Skill Card 字段做 embedding，同时用 tags 做 metadata filters。",
            "每次回答都带 source links，让 user 能回看原始 note。",
            "所有生成的 skill 先进入 draft，review 后才 active。"
          ]
        }
      }
    ],
    "datePublished": "2026-06-24",
    "dateModified": "2026-08-14"
  }
] as const;

export const siteEssayNotes: SiteEssayNoteData[] = [
  {
    "slug": "bible-israel-us-evidence-map",
    "title": {
      "en": "Three rivers, one confluence: the Bible, Israel, and America's Middle East politics",
      "zh": "三条河，一个汇流口：《圣经》、以色列与美国的中东政治"
    },
    "summary": {
      "en": "Is the Bible a war plan for the Middle East? I checked the claim against public records. Scripture really does shape two political movements, one in Israel and one in America. It does not draw a straight line to the Iraq War. And read through the I Ching and the Daodejing, every force in this story turns out to hold its opposite inside it.",
      "zh": "《圣经》是不是中东战争的计划书？我把这个说法和公开档案逐条对照。经文确实塑造了两股真实的政治力量，一股在以色列，一股在美国；但它和伊拉克战争之间画不出直线。再用《易经》和《道德经》的眼光看，这个故事里的每一股力量，内部都含着自己的反面。"
    },
    "category": {
      "en": "Evidence & history",
      "zh": "证据与历史"
    },
    "thesis": {
      "en": "Religion supplies worldviews, not war plans. Three rivers with different sources, Israeli religious Zionism, American Christian Zionism, and U.S. strategic interest, meet in U.S. Middle East policy without anyone controlling anyone. The real danger is not God but anyone who declares themselves pure white.",
      "zh": "宗教提供的是世界观，不是作战计划。以色列宗教锡安主义、美国基督教锡安主义、美国战略利益，三条源头不同的河在美国中东政策上汇流，却没有谁控制谁。真正危险的不是神，而是宣布自己纯白无瑕的人。"
    },
    "sources": [
      "Pew Research",
      "PNAS 2007",
      "Times of Israel",
      "CNN · 2018",
      "VOA · 2005",
      "易经 · 道德经"
    ],
    "originalSource": {
      "url": "bible-israel-us-evidence-map-full.html",
      "label": {
        "en": "Open the full evidence map (network, photos, sources)",
        "zh": "打开完整证据地图（关系网、照片、来源）"
      }
    },
    "storySource": {
      "url": "bible-israel-us-story.html",
      "label": {
        "en": "Watch the storyboard version (Chinese)",
        "zh": "看故事看板：三条河"
      }
    },
    "references": [
      {
        "id": "1",
        "url": "https://www.myjewishlearning.com/article/secular-zionism/",
        "label": {
          "en": "My Jewish Learning — Secular Zionism: Theodor Herzl articulated political Zionism in largely secular terms and expected a secular state.",
          "zh": "My Jewish Learning — 世俗锡安主义：Herzl 以世俗、政治的语言提出锡安主义，设想的是世俗国家。"
        }
      },
      {
        "id": "2",
        "url": "https://www.myjewishlearning.com/article/gush-emunim/",
        "label": {
          "en": "My Jewish Learning — Gush Emunim: founded in 1974 by followers of Rabbi Zvi Yehuda Kook; built West Bank settlements, often ahead of government policy.",
          "zh": "My Jewish Learning — 信仰者集团：1974 年由 Zvi Yehuda Kook 拉比的追随者成立，常抢在政府政策之前在西岸建定居点。"
        }
      },
      {
        "id": "3",
        "url": "https://www.timesofisrael.com/religious-zionism-coalition-deal-settlement-growth-changes-to-discrimination-laws/",
        "label": {
          "en": "Times of Israel — the 2022 Likud–Religious Zionism coalition deal commits to formulating a policy applying sovereignty to Judea and Samaria.",
          "zh": "Times of Israel — 2022 年利库德与宗教锡安主义党的联合执政协议，承诺推动对犹地亚和撒玛利亚适用主权的政策。"
        }
      },
      {
        "id": "4",
        "url": "https://www.timesofisrael.com/pms-office-says-its-preposterous-to-say-invoking-amalek-was-a-genocide-call/",
        "label": {
          "en": "Times of Israel — the Prime Minister's Office says reading Netanyahu's October 2023 Amalek reference as a genocide call is preposterous; South Africa cited it at the ICJ.",
          "zh": "Times of Israel — 总理办公室称把内塔尼亚胡 2023 年 10 月引用「亚玛力」解读为种族灭绝号召是荒谬的；南非在国际法院引用了这句话。"
        }
      },
      {
        "id": "5",
        "url": "https://www.pewresearch.org/short-reads/2013/10/03/more-white-evangelicals-than-american-jews-say-god-gave-israel-to-the-jewish-people/",
        "label": {
          "en": "Pew Research Center (2013) — 82% of white evangelicals vs. 40% of American Jews say God gave the land of Israel to the Jewish people.",
          "zh": "Pew 研究中心（2013）：82% 的美国白人福音派、40% 的美国犹太人相信神把以色列之地赐给了犹太人。"
        }
      },
      {
        "id": "6",
        "url": "https://edition.cnn.com/2018/05/13/politics/hagee-jeffress-us-embassy-jerusalem/index.html",
        "label": {
          "en": "CNN (May 2018) — evangelical pastors Robert Jeffress and John Hagee, founder of Christians United for Israel, delivered the prayers at the opening of the U.S. embassy in Jerusalem.",
          "zh": "CNN（2018 年 5 月）：福音派牧师 Robert Jeffress 与 CUFI 创办人 John Hagee 在美国驻耶路撒冷使馆启用典礼上祷告。"
        }
      },
      {
        "id": "7",
        "url": "https://www.voanews.com/a/a-13-2005-10-06-voa66/301119.html",
        "label": {
          "en": "VOA (October 2005) — the White House called \"absurd\" a Palestinian minister's recollection that Bush said God told him to end tyranny in Iraq; the minister later called it a figure of speech.",
          "zh": "VOA（2005 年 10 月）：白宫称巴勒斯坦外长转述的「神叫布什结束伊拉克暴政」一说「荒谬」；转述者后来也说那是比喻。"
        }
      },
      {
        "id": "8",
        "url": "https://www.pnas.org/doi/10.1073/pnas.0701768104",
        "label": {
          "en": "Ginges, Atran, Medin and Shikaki, PNAS (2007) — among Israelis and Palestinians, material incentives to compromise on sacred values increased outrage and support for violence; symbolic concessions reduced it.",
          "zh": "Ginges、Atran、Medin、Shikaki，PNAS（2007）：在以色列人和巴勒斯坦人中，用物质利益换取神圣价值上的妥协，反而增加愤怒和对暴力的支持；象征性让步则降低之。"
        }
      }
    ],
    "referencesNote": {
      "en": "Classical texts quoted: I Ching (Xici I; Qian, top line); Daodejing chapters 2, 30, 31 and 42; Isaiah 2:4; 1 Samuel 15; Quran 5:32. Photos in the full evidence map are from Wikimedia Commons, public domain or credited under their licenses. This checks public evidence; it is not a judgment on any religion, people, or person.",
      "zh": "引用经典：《易经·系辞上》《乾卦》上九；《道德经》第二、三十、三十一、四十二章；《以赛亚书》2:4；《撒母耳记上》15；《古兰经》5:32。完整证据地图里的照片来自 Wikimedia Commons，均为公有领域或按授权署名。本文只核查公开证据，不评判任何宗教、民族或个人。"
    },
    "sections": [
      {
        "title": {
          "en": "Two sentences that get blurred",
          "zh": "两句常被混在一起的话"
        },
        "paragraphs": {
          "en": [
            "After tracing the road to the Iraq War in [[note:iraq-war-evidence-map|the last evidence map]], the next question people ask is whether the Bible sits underneath all of it.",
            "Start by separating two sentences. \"Religion gives people a worldview\" has a great deal of evidence behind it. \"The Bible is a war plan\" has none. Most of the confusion comes from sliding from the first to the second."
          ],
          "zh": [
            "在[[note:iraq-war-evidence-map|上一张证据地图]]追完伊拉克战争的来路之后，常有人再往下问一层：这一切的底下，是不是《圣经》？",
            "先把两句话分开。「宗教给人一套世界观」，有大量证据。「《圣经》是战争计划书」，没有。多数混乱，都来自从第一句悄悄滑到第二句。"
          ]
        }
      },
      {
        "title": {
          "en": "The first river: religious Zionism in Israel",
          "zh": "第一条河：以色列的宗教锡安主义"
        },
        "paragraphs": {
          "en": [
            "Modern Zionism began as a secular movement; Herzl imagined a secular state[[1]]. Religious Zionism grew alongside it. After 1967, followers of Rabbi Zvi Yehuda Kook read the captured land as a step toward redemption and in 1974 founded Gush Emunim, which built West Bank settlements, often ahead of government policy[[2]].",
            "That current now sits inside government. The 2022 coalition deal with the Religious Zionism party commits to a policy of applying sovereignty to \"Judea and Samaria,\" the biblical names for the West Bank[[3]]. In October 2023 Netanyahu told troops to \"remember what Amalek has done to you\"; South Africa cited the line at the ICJ, and Israel said it referred to Hamas[[4]]. The quote is real; its meaning is contested."
          ],
          "zh": [
            "现代锡安主义的起点是世俗的，Herzl 设想的是一个世俗国家[[1]]。宗教锡安主义是并行发展的另一支。1967 年后，Zvi Yehuda Kook 拉比的追随者把新得的土地解读为救赎的一步，1974 年成立「信仰者集团」，常常抢在政府政策之前在西岸建定居点[[2]]。",
            "这股力量今天在政府里。2022 年与宗教锡安主义党签的联合执政协议，写明要推动对「犹地亚和撒玛利亚」适用主权，那是约旦河西岸的圣经名称[[3]]。2023 年 10 月，内塔尼亚胡对部队说「要记得亚玛力人向你所做的」；南非在国际法院引用这句话，以色列说指的是哈马斯[[4]]。原句是真的，含义有争议。"
          ]
        }
      },
      {
        "title": {
          "en": "The second river: Christian Zionism in America",
          "zh": "第二条河：美国的基督教锡安主义"
        },
        "paragraphs": {
          "en": [
            "Pew found that 82% of white American evangelicals believe God gave the land of Israel to the Jewish people, against 40% of American Jews[[5]]. That single number breaks the model \"U.S. support for Israel equals Jewish control of America\": the strongest believers in the theology are Christians.",
            "The belief has institutions. John Hagee founded Christians United for Israel in 2006, and when the U.S. embassy opened in Jerusalem in 2018, the two prayers were given by evangelical pastors, Hagee and Robert Jeffress[[6]]. One of them had said Jews cannot be saved without Christ. Allies can want the same policy for different ultimate reasons."
          ],
          "zh": [
            "Pew 的调查显示，82% 的美国白人福音派相信神把以色列之地赐给了犹太人，美国犹太人只有 40%[[5]]。光这一个数字，就推翻了「美国亲以色列 = 犹太人控制美国」的模型：最相信这套神学的，是基督徒。",
            "这种信仰有组织。John Hagee 在 2006 年创立「基督徒团结支持以色列」；2018 年美国驻耶路撒冷使馆启用，站上台祷告的是两位福音派牧师，Hagee 和 Robert Jeffress[[6]]。其中一位曾说犹太人不信基督就不能得救。盟友可以要同一个政策，终极理由却不同。"
          ]
        }
      },
      {
        "title": {
          "en": "The third river, and the line that cannot be drawn",
          "zh": "第三条河，以及画不出来的那条线"
        },
        "paragraphs": {
          "en": [
            "The third river needs no scripture at all: Gulf security, energy routes, Iran, bases, alliances, and the neoconservative case for regime change. Its public documents speak of national security and American power, not theology.",
            "The claim that God told Bush to invade Iraq rests on one Palestinian minister's recollection; the White House called it absurd, and the minister later called it a figure of speech[[7]]. So the line \"Bible → Iraq War\" cannot be drawn. The three rivers do meet, in U.S. Middle East policy, but confluence is not control."
          ],
          "zh": [
            "第三条河完全不需要经文：海湾安全、能源航道、伊朗、军事基地、盟友体系，再加上新保守派的政权更替主张。它的公开文件讲的是国家安全和美国力量，不是神学。",
            "「神叫布什打伊拉克」只来自一位巴勒斯坦外长的回忆；白宫称之为荒谬，转述者后来也说那是比喻[[7]]。所以「《圣经》→ 伊拉克战争」这条线画不出来。三条河确实在美国中东政策上相遇，但汇流不等于控制。"
          ]
        }
      },
      {
        "title": {
          "en": "Where religion really changes a conflict",
          "zh": "宗教真正改变冲突的地方"
        },
        "paragraphs": {
          "en": [
            "Ordinary interests can be split: one side offers a million, the other wants two, and they meet at one and a half. \"This land was given by God\" has no one-and-a-half version. A 2007 PNAS study found that offering money to compromise on sacred values made Israelis and Palestinians angrier, while symbolic concessions calmed them[[8]].",
            "Delete every religion tomorrow and refugees, occupation, borders, settlements, Jerusalem, Gaza, statehood and water are all still there. Religion is not a sufficient explanation of the conflict. It can be an amplifier."
          ],
          "zh": [
            "普通利益可以分：一边出 100 万，一边要 200 万，最后在 150 万成交。「这是神给的地」没有 150 万的版本。2007 年一项 PNAS 研究发现，对神圣价值给钱让人妥协，以色列人和巴勒斯坦人都更愤怒；象征性的让步反而让人平静[[8]]。",
            "就算明天删掉所有宗教，难民、占领、边界、定居点、耶路撒冷、加沙、建国、水资源都还在。宗教不是冲突的充分解释，但它可能是放大器。"
          ]
        }
      },
      {
        "title": {
          "en": "Black within white, white within black",
          "zh": "黑中有白，白中有黑"
        },
        "paragraphs": {
          "en": [
            "The I Ching says \"one yin, one yang: that is the Way,\" and in the taiji diagram each half carries a dot of the other. The point is not that good and bad are balanced, but that each side already contains its opposite. Pure black and pure white are not the normal state.",
            "Read this story that way and every force is mixed. The same Bible says \"beat swords into plowshares\" and \"destroy Amalek.\" Rabin commanded the army in 1967, signed the Oslo Accords, and was killed by a religious nationalist. The neoconservatives wrote \"spread democracy\" and got a war whose reasons collapsed. The real question is not whether religion is good or bad, but which half people choose to justify what they already want to do."
          ],
          "zh": [
            "《易经》说「一阴一阳之谓道」。太极图里，黑的一半有个白点，白的一半有个黑点。它说的不是好坏各半，而是任何一方里面本来就含着另一方。纯黑和纯白都不是常态。",
            "这样看这个故事，每股力量都是混合的。同一部《圣经》里，有「将刀打成犁头」，也有「灭绝亚玛力」。拉宾是 1967 年的总参谋长，也签了奥斯陆协议，最后死于一个宗教民族主义者之手。新保守派写着「推广民主」，换来一场理由不成立的战争。真正该问的不是宗教好不好，而是人会挑哪一半，去为已经想做的事找理由。"
          ]
        }
      },
      {
        "title": {
          "en": "The danger of declaring yourself pure white",
          "zh": "宣布自己纯白的危险"
        },
        "paragraphs": {
          "en": [
            "The Daodejing warns that once everyone knows beauty as beauty, ugliness is already there. Raise any value to absolute truth, whether God, nation, revolution, security, or even perfect peace, and its opponents become enemies of that truth. The flags differ; the structure is the same.",
            "The I Ching's top line of Qian reads \"the dragon that climbs too high will have regrets,\" and the Daodejing calls weapons \"instruments of ill omen, used only when there is no choice.\" The danger is not God. It is anyone who announces they speak for absolute truth. Black within white is normal; whoever claims to be pure white deserves a second look."
          ],
          "zh": [
            "《道德经》说：「天下皆知美之为美，斯恶已。」把任何一个价值抬成绝对真理，神、国家、革命、安全，甚至绝对的和平，反对它的人就成了真理的敌人。旗帜不同，结构一样。",
            "《易经》乾卦上九是「亢龙有悔」；《道德经》说「兵者不祥之器，不得已而用之」。危险的不是神，而是宣布自己代表绝对真理的人。黑中有白是常态；谁说自己是纯白的，就多看他一眼。"
          ]
        }
      }
    ],
    "datePublished": "2026-09-29",
    "dateModified": "2026-09-29"
  },
  {
    "slug": "iraq-war-evidence-map",
    "title": {
      "en": "Overlap is not command: an evidence map of neocons, Israel's right, and the Iraq War",
      "zh": "人员重叠不等于指挥链：新保守派、以色列右翼与伊拉克战争的证据地图"
    },
    "summary": {
      "en": "The 2003 Iraq War is often told as a chain of command running from Israel through American neoconservatives to the White House. I checked each link against public records. The overlap of people and ideas is documented. The chain of command is not.",
      "zh": "2003 年伊拉克战争常被说成一条指挥链：以色列下令，美国新保守派执行，白宫照办。我把每一环都拿去和公开档案核对。人员与思想的重叠有白纸黑字，指挥链没有。"
    },
    "category": {
      "en": "Evidence & history",
      "zh": "证据与历史"
    },
    "thesis": {
      "en": "The same few people did write a 1996 strategy paper for Israel's new government, sign 1998 letters urging Saddam's removal, and then take posts under Bush. That is documented overlap. Turning it into \"Israel gave the order\" requires evidence nobody has produced.",
      "zh": "同一小批人确实写过 1996 年给以色列新政府的战略建议，签过 1998 年要求推翻萨达姆的公开信，后来又在布什政府任职。这是有文件可查的重叠。把它说成「以色列下的命令」，需要一份至今没人拿得出来的证据。"
    },
    "sources": [
      "Clinton Library · PNAC",
      "GovInfo · Iraq Liberation Act",
      "9/11 Commission",
      "Senate Intelligence Committee",
      "DoD Inspector General",
      "Duelfer Report",
      "U.S. DOJ · Franklin"
    ],
    "originalSource": {
      "url": "iraq-war-evidence-map-full.html",
      "label": {
        "en": "Open the full evidence map (network, photos, sources)",
        "zh": "打开完整证据地图（关系网、照片、来源）"
      }
    },
    "storySource": {
      "url": "iraq-war-story.html",
      "label": {
        "en": "Watch the storyboard version (Chinese)",
        "zh": "看故事看板：一场战争的七年前奏"
      }
    },
    "references": [
      {
        "id": "1",
        "url": "https://en.wikipedia.org/wiki/A_Clean_Break:_A_New_Strategy_for_Securing_the_Realm",
        "label": {
          "en": "A Clean Break (1996) — study group led by Richard Perle at IASPS for Benjamin Netanyahu's incoming government; participants included Douglas Feith and David and Meyrav Wurmser. Never adopted as Israeli government policy. Background index; cross-check against archived copies of the original text.",
          "zh": "《A Clean Break》（1996）：以色列智库 IASPS 的研究组撰写，Richard Perle 领头，写给内塔尼亚胡的新政府，参与者包括 Douglas Feith、David 与 Meyrav Wurmser。从未被以色列政府正式采纳。此为背景索引，应与原文存档交叉核对。"
        }
      },
      {
        "id": "2",
        "url": "https://www.clintonlibrary.gov/research/archives/finding-aids/project-new-american-century-pnac",
        "label": {
          "en": "Clinton Presidential Library — PNAC's January 26, 1998 fax to President Clinton, sent by William Kristol, urging that U.S. policy aim at removing Saddam Hussein.",
          "zh": "克林顿总统图书馆：PNAC 于 1998 年 1 月 26 日由 William Kristol 传真克林顿总统，要求美国政策以推翻萨达姆为目标。"
        }
      },
      {
        "id": "3",
        "url": "https://www.globalsecurity.org/wmd/library/news/iraq/1998/980526-pnac.htm",
        "label": {
          "en": "PNAC letter of May 29, 1998 to Speaker Gingrich and Majority Leader Lott; signers include Abrams, Bolton, Kagan, Kristol, Perle, Rumsfeld, and Wolfowitz (GlobalSecurity mirror).",
          "zh": "PNAC 1998 年 5 月 29 日致众议院议长 Gingrich 与参议院多数党领袖 Lott 的信，签名者包括 Abrams、Bolton、Kagan、Kristol、Perle、Rumsfeld、Wolfowitz（GlobalSecurity 镜像）。"
        }
      },
      {
        "id": "4",
        "url": "https://www.govinfo.gov/content/pkg/PLAW-105publ338/html/PLAW-105publ338.htm",
        "label": {
          "en": "Iraq Liberation Act, Public Law 105-338 (October 31, 1998) — Sec. 3 makes supporting the removal of Saddam's regime U.S. policy; Sec. 8 states the Act does not authorize the use of U.S. armed forces.",
          "zh": "《伊拉克解放法》，公法 105-338（1998 年 10 月 31 日）：第 3 条把支持推翻萨达姆政权定为美国政策；第 8 条明写本法不授权动用美军。"
        }
      },
      {
        "id": "5",
        "url": "https://www.9-11commission.gov/report/911Report_Ch2.htm",
        "label": {
          "en": "9/11 Commission Report, Chapter 2 — reports of Iraq–al Qaeda contacts, but \"no evidence that these or the earlier contacts ever developed into a collaborative operational relationship.\"",
          "zh": "9·11 委员会报告第 2 章：有伊拉克与基地组织接触的报道，但「没有证据显示这些接触发展成协同作战关系」。"
        }
      },
      {
        "id": "6",
        "url": "https://www.armscontrol.org/act/2008-08/senate-committee-completes-iraq-intel-probe",
        "label": {
          "en": "Senate Intelligence Committee Phase II reports (June 5, 2008), summarized by the Arms Control Association — several prewar public statements were not supported by the intelligence; approved 10–5 with Republican dissent.",
          "zh": "参议院情报委员会第二阶段报告（2008 年 6 月 5 日），Arms Control Association 摘要：多项战前公开说法没有得到情报支持；以 10 比 5 通过，部分共和党委员反对。"
        }
      },
      {
        "id": "7",
        "url": "https://www.csmonitor.com/2007/0209/p99s01-duts.html",
        "label": {
          "en": "Christian Science Monitor (February 2007) — the Pentagon inspector general found Feith's office produced alternative Iraq–al Qaeda assessments at odds with the intelligence community: \"inappropriate\" but not illegal.",
          "zh": "Christian Science Monitor（2007 年 2 月）：国防部监察长认定 Feith 的办公室制作了与情报界共识不一致的伊拉克—基地组织另类评估，做法「不恰当」但不违法。"
        }
      },
      {
        "id": "8",
        "url": "https://www.armscontrol.org/act/2004-11/duelfer-disproves-us-wmd-claims",
        "label": {
          "en": "Arms Control Association on the 2004 Duelfer (Iraq Survey Group) report — Iraq had destroyed its stockpiles after 1991; no existing WMD stockpiles were found. Chemical munitions later found were pre-1991 remnants.",
          "zh": "Arms Control Association 关于 2004 年 Duelfer 报告（伊拉克调查组）：伊拉克 1991 年后已销毁库存，未找到现存 WMD 库存。后来发现的化学弹药都是 1991 年以前的遗留物。"
        }
      },
      {
        "id": "9",
        "url": "https://www.justice.gov/archive/opa/pr/2005/May/05_crm_238.htm",
        "label": {
          "en": "U.S. Department of Justice (May 4, 2005) — Lawrence Franklin, an Iran desk analyst in the Office of the Secretary of Defense, charged with disclosing classified national defense information. He later pleaded guilty; his sentence was cut in 2009 after charges against two former AIPAC lobbyists were dropped.",
          "zh": "美国司法部（2005 年 5 月 4 日）：国防部长办公室伊朗科分析员 Lawrence Franklin 被控泄露机密国防信息。他后来认罪；2009 年两名 AIPAC 前游说人员被撤诉后，他的刑期被大幅减轻。"
        }
      }
    ],
    "referencesNote": {
      "en": "Official archives come first; press summaries are used where the primary site blocked automated reading (the Senate committee pages). Photos in the full evidence map are from Wikimedia Commons, public domain or credited under their CC licenses. This is a check of public evidence, not a verdict on any person.",
      "zh": "优先使用官方档案；参议院委员会网站拒绝自动读取，那部分用媒体摘要核对。完整证据地图里的照片来自 Wikimedia Commons，均为公有领域或按 CC 授权署名。本文只核查公开证据，不评判任何个人。"
    },
    "sections": [
      {
        "title": {
          "en": "The story people tell",
          "zh": "流传的说法"
        },
        "paragraphs": {
          "en": [
            "A familiar version goes like this: Israel wanted Saddam gone, American neoconservatives carried the plan into Washington, and the Bush administration went to war on their behalf. It is tidy, and it names villains.",
            "I took a document that makes this case in evidence-map form and checked every link against public records: letters, laws, official biographies, and the government's own post-war reviews. The goal was simple: sort each claim into documented, reasonable inference, or unsupported."
          ],
          "zh": [
            "常见的版本是这样的：以色列想除掉萨达姆，美国新保守派把计划带进华盛顿，布什政府替他们打了这场仗。故事很整齐，坏人也很清楚。",
            "我拿一份用「证据地图」形式整理这个说法的文件，把每一环都和公开档案对了一遍：公开信、法律、官方履历，以及政府自己在战后做的复盘。目的很简单：把每个说法分成三类，有文件可查的、合理推论的、没有证据的。"
          ]
        }
      },
      {
        "title": {
          "en": "What the documents show",
          "zh": "文件能证明什么"
        },
        "paragraphs": {
          "en": [
            "In 1996 a study group led by Richard Perle wrote \"A Clean Break\" for Netanyahu's new government. Douglas Feith and David Wurmser took part. It called removing Saddam an important strategic objective. Israel never adopted it as policy[[1]].",
            "In 1998 the Project for a New American Century asked President Clinton, then congressional leaders, to make Saddam's removal U.S. policy. The signers included Rumsfeld, Wolfowitz, Bolton, Abrams, Perle, Kristol, and Kagan[[2]][[3]]. That October, Congress passed the Iraq Liberation Act, which made regime change official policy but explicitly did not authorize U.S. troops[[4]].",
            "From 2001, several of these people held posts under Bush: Rumsfeld at Defense, Wolfowitz as his deputy, Feith running defense policy, Bolton at State, Abrams at the National Security Council, and Wurmser moving from State to Cheney's office. Perle chaired an advisory board rather than holding an executive post. Every one of these links is on paper."
          ],
          "zh": [
            "1996 年，Richard Perle 带领的研究组为内塔尼亚胡的新政府写了《A Clean Break》，Douglas Feith 和 David Wurmser 都参与了。报告把推翻萨达姆称为重要的战略目标。以色列从未把它采纳为政策[[1]]。",
            "1998 年，智库 PNAC 先后写信给克林顿总统和国会领袖，要求把推翻萨达姆定为美国政策。签名者包括 Rumsfeld、Wolfowitz、Bolton、Abrams、Perle、Kristol、Kagan[[2]][[3]]。同年 10 月国会通过《伊拉克解放法》，把政权更替写进政策，但明文不授权出兵[[4]]。",
            "2001 年起，这批人里有好几位进了布什政府：Rumsfeld 任国防部长，Wolfowitz 任副部长，Feith 主管国防政策，Bolton 在国务院，Abrams 在国家安全委员会，Wurmser 从国务院转到切尼的办公室。Perle 担任的是咨询委员会主席，不是行政职务。这些关系每一条都有文件。"
          ]
        }
      },
      {
        "title": {
          "en": "What the war's own reviews found",
          "zh": "战后复盘发现了什么"
        },
        "paragraphs": {
          "en": [
            "The two main public reasons for war did not hold up. The 9/11 Commission found contacts between Iraq and al Qaeda but no collaborative operational relationship[[5]]. The Duelfer report found no existing WMD stockpiles; the old chemical munitions found later dated from before 1991[[8]].",
            "The Senate Intelligence Committee concluded that several prewar statements were not supported by the intelligence, though the vote split 10–5[[6]]. The Pentagon's inspector general found that Feith's office pushed alternative intelligence assessments to senior leaders: inappropriate, not illegal[[7]]. That is the strongest evidence that this network shaped the case for war, and it is still influence, not command.",
            "One case is often stretched further than it goes. Lawrence Franklin, a Pentagon Iran analyst, was charged with leaking classified information and pleaded guilty[[9]]. It is a real case about one person. It does not show that a whole policy network was an espionage ring."
          ],
          "zh": [
            "两条主要的开战理由都没站住。9·11 委员会发现伊拉克和基地组织有过接触，但没有协同作战关系[[5]]。Duelfer 报告没有找到现存的 WMD 库存，后来发现的旧化学弹药都是 1991 年以前生产的[[8]]。",
            "参议院情报委员会认定多项战前说法没有得到情报支持，不过投票是 10 比 5[[6]]。国防部监察长认定 Feith 的办公室把另类情报评估送给了高层：不恰当，但不违法[[7]]。这是「这批人影响了开战论证」最有力的证据，但它证明的仍然是影响，不是指挥。",
            "有一桩案子常被说过头。国防部伊朗科分析员 Lawrence Franklin 被控泄露机密并认罪[[9]]。这是一个人的真实案件，证明不了整个政策网络是间谍网。"
          ]
        }
      },
      {
        "title": {
          "en": "Where the evidence stops",
          "zh": "证据停在哪里"
        },
        "paragraphs": {
          "en": [
            "What no public record shows is the chain itself: an order from Israel, neoconservatives carrying it out, a president under someone else's control. There is no memo, no meeting record, no line of obedience. The 1996 paper was not even Israeli policy.",
            "Take Israel out of the picture and the United States still had its own long road against Saddam: the 1991 Gulf War, sanctions, weapons inspections, Clinton-era strikes, and the 1998 law. Take the neoconservatives out and we cannot know whether the war would have happened the same way. They were an important variable, but nobody can honestly assign them a percentage.",
            "And one line should be drawn hard: the conduct of specific officials cannot be stretched into a claim about Jewish people as a group. That is not an inference from evidence. It is an old antisemitic story wearing new clothes."
          ],
          "zh": [
            "没有任何公开档案能证明的，恰恰是那条链本身：以色列下令，新保守派执行，总统被人控制。没有备忘录，没有会议记录，没有服从关系。1996 年那份报告连以色列的政策都不是。",
            "把以色列拿掉，美国自己也有一条很长的倒萨路：1991 年海湾战争、制裁、武器核查、克林顿时期的空袭、1998 年的法律。把新保守派拿掉，我们没法知道战争会不会照样发生。他们是重要变量，但没人能诚实地给他们算出一个百分比。",
            "还有一条线必须划清：具体官员的行为，不能扩大成对整个犹太族群的指控。这不是从证据推出的结论，而是一个换了新衣服的反犹老故事。"
          ]
        }
      },
      {
        "title": {
          "en": "The honest model",
          "zh": "诚实的解释"
        },
        "paragraphs": {
          "en": [
            "The account that fits the record has several causes, not one: U.S. strategic interests, a decade of regime-change policy, a neoconservative policy network, partial convergence with Israel's right, the shock of 9/11, decisions by Bush, Cheney, and Rumsfeld, and prewar intelligence that was wrong and selectively presented.",
            "The overlap of people is a fact. The chain of command is a story. Keeping those two apart is the only way to see where this war actually came from. The full evidence map linked on this page has the relationship network, photos of each person, a timeline, and every source; the story version walks through the same facts as a narrative."
          ],
          "zh": [
            "和档案对得上的解释是多因素的，不是单一原因：美国自身的战略利益，十年累积的政权更替政策，新保守派政策网络，和以色列右翼的部分立场重合，9·11 的冲击，布什、切尼、拉姆斯菲尔德的决策，以及出了错、又被选择性呈现的战前情报。",
            "人员重叠是事实，指挥链是故事。把这两件事分开，才看得清这场战争真正从哪里来。本页链接的完整证据地图里有关系网、每个人的照片、时间线和全部来源；故事版则把同样的事实按时间讲成一个故事。"
          ]
        }
      }
    ],
    "datePublished": "2026-09-29",
    "dateModified": "2026-09-29"
  },
  {
    "slug": "korea-2026-crash",
    "title": {
      "en": "The \"mad bull\" hits a wall: Korea's 2026 market, and the gap between price and value",
      "zh": "「疯牛」撞墙：韩国股市 2026，一堂价格与价值的公开课"
    },
    "summary": {
      "en": "In the first half of 2026 Korea had the best-performing market in the world, nearly doubling in six months—everyone was talking about getting rich. Then in July it hit a wall, posting its largest monthly drop on record. The strangest part: that same month, Korea's exports hit an all-time high.",
      "zh": "2026 上半年，韩国股市是全世界涨得最猛的市场，半年几乎翻倍，所有人都在聊财富自由。然后 7 月它一头撞墙——创下史上最大单月跌幅。最耐人寻味的是：同一个月，韩国的出口反而创了新高。"
    },
    "category": {
      "en": "Money & real value",
      "zh": "钱与真实价值"
    },
    "thesis": {
      "en": "Price and value were never the same thing. Korea's chips, AI demand, and exports were all real—but price ran far ahead of value on emotion and leverage. The real business barely moved; what went wild was the price.",
      "zh": "价格和价值从来就不是一回事：韩国的芯片、AI、出口都是真的，可价格被情绪和杠杆推得远远跑在价值前面——真实的生意没怎么变，疯狂变化的一直是价格。"
    },
    "sources": [
      "CNBC · 跌入熊市",
      "Bloomberg · KOSPI +100%",
      "KED · 黑色星期一",
      "Bloomberg · 出口新高",
      "Eastern Herald · 追缴潮",
      "Motley Fool · 迷因股"
    ],
    "originalSource": {
      "url": "korea-2026-crash-full.html",
      "label": {
        "en": "Read the full original essay",
        "zh": "阅读完整原文（白话版）"
      }
    },
    "references": [
      {
        "id": "1",
        "url": "https://www.cnbc.com/2026/07/09/kospi-bear-territory-ai-samsung-skhynix-chipmakers.html",
        "label": {
          "en": "CNBC (July 2026) — the KOSPI fell from the world's best-performing market into a bear market, led down by chip stocks (Samsung, SK Hynix), with circuit breakers tripped several times that year.",
          "zh": "CNBC（2026 年 7 月）：KOSPI 由全球表现最好的市场跌入熊市，芯片股（三星、SK 海力士）领跌，年内多次触发熔断。"
        }
      },
      {
        "id": "2",
        "url": "https://finance.yahoo.com/markets/world-indices/articles/south-koreas-kospi-surges-100-121544935.html",
        "label": {
          "en": "Yahoo Finance / Bloomberg — South Korea's KOSPI surged ~100% in 2026 on a chip-stock rally, one of the best-performing markets that year.",
          "zh": "Yahoo Finance / Bloomberg：KOSPI 在 2026 年因芯片股大涨而近乎翻倍，为当年全球表现最好的股市之一。"
        }
      },
      {
        "id": "3",
        "url": "https://www.kedglobal.com/korean-stock-market/newsView/ked202607130010",
        "label": {
          "en": "KED Global (July 13, 2026) — the KOSPI plunged nearly 9% in a day and slipped below 7,000 amid a chip rout; combined with other reports, July was the KOSPI's largest monthly drop on record (~23%).",
          "zh": "KED Global（2026 年 7 月 13 日）：7 月 13 日 KOSPI 单日重挫近 9%、跌破 7,000 点，芯片股与杠杆型 ETF 加剧跌势；结合多家报道，7 月为 KOSPI 史上最大单月跌幅（约 23%）。"
        }
      },
      {
        "id": "4",
        "url": "https://www.bloomberg.com/news/articles/2026-07-21/south-korea-s-early-exports-jump-to-july-record-on-ai-led-gains",
        "label": {
          "en": "Bloomberg (July 21, 2026) — South Korea's early-July exports jumped to a record on AI-led demand.",
          "zh": "Bloomberg（2026 年 7 月 21 日）：韩国 7 月出口在 AI 相关需求带动下创同期新高。"
        }
      },
      {
        "id": "5",
        "url": "https://easternherald.com/2026/07/20/south-korea-margin-loans-retail-investors-kospi-crash/",
        "label": {
          "en": "The Eastern Herald (July 2026) — about 1.2 million margin accounts faced calls and many retail investors were force-liquidated; other reports note the president's emergency intervention. Retail and liquidation figures vary by source.",
          "zh": "The Eastern Herald（2026 年 7 月）：约 120 万个融资（保证金）账户面临追缴，大量散户被强制平仓；另有报道称总统出面紧急干预。散户与强平数字各来源略有差异。"
        }
      },
      {
        "id": "6",
        "url": "https://www.fool.com/investing/2026/07/26/kospi-trading-like-a-meme-stock-sp-500-nasdaq-next/",
        "label": {
          "en": "The Motley Fool (July 26, 2026) — commentary that the KOSPI was \"trading like a meme stock,\" warning U.S. indexes could face similar risk.",
          "zh": "The Motley Fool（2026 年 7 月 26 日）：评论 KOSPI 的暴涨暴跌「像迷因股」，并提醒美股或面临类似风险。"
        }
      }
    ],
    "referencesNote": {
      "en": "These are the sources for the figures. Market numbers (daily/monthly moves, margin-call and forced-liquidation sizes) vary by source and shift with the market; this uses the more authoritative public reporting with dates. This is fact-gathering and reflection only, not investment advice.",
      "zh": "以上是文中数据的出处。市场数字（单日/单月涨跌、追缴与强平规模）不同来源略有出入，且随行情变动，本文取较权威公开报道并注明时点。本文只作事实梳理与观念探讨，不构成任何投资建议。"
    },
    "sections": [
      {
        "title": {
          "en": "Two numbers from the same month",
          "zh": "同一个月的两个数字"
        },
        "paragraphs": {
          "en": [
            "Look at two numbers from the same month. In July 2026 Korea's stock market (the KOSPI) posted its largest monthly fall on record, down about 23%[[3]]. Also in July 2026, Korea's exports hit an all-time high[[4]].",
            "A country's real business—exports—was booming, even setting records, while its share prices halved in the very same month. Set side by side, those two numbers are already a lesson."
          ],
          "zh": [
            "先看两个数字，它们发生在同一个月。2026 年 7 月，韩国股市（KOSPI）创下历史上最大单月跌幅，跌了约 23%[[3]]。也是在 2026 年 7 月，韩国的出口创下历史新高[[4]]。",
            "一个国家真实的生意（出口）红红火火、甚至创纪录，可它股票的价格却在同一个月腰斩式暴跌。这两个数字摆在一起，本身就是一堂课。"
          ]
        }
      },
      {
        "title": {
          "en": "The \"mad bull\"",
          "zh": "那头「疯牛」"
        },
        "paragraphs": {
          "en": [
            "First, the mania before July. In 2026 the AI boom drove money worldwide toward chips, and Korea held Samsung and SK Hynix—the two most central suppliers of AI memory chips. Capital flooded in. The KOSPI surged, breaking 6,300 in February and nearly doubling in six months (up about 100%), the best-performing market in the world that year[[2]]; even Goldman Sachs was calling for new highs.",
            "A familiar mood filled the market—\"this time is different,\" \"AI is the future,\" \"get on board before it's too late.\" Many ordinary people put in not just their savings but borrowed money on leverage, hoping to multiply the gains. The bull earned a nickname: the \"mad bull.\""
          ],
          "zh": [
            "先说 7 月之前的疯狂。2026 年，AI 热潮把全世界的钱往芯片上赶，而韩国手握三星和 SK 海力士——全球 AI 内存芯片最核心的两家供应商，资金像潮水一样涌进。KOSPI 一路狂飙，2 月破 6,300 点，半年里差不多翻了一倍（涨约 100%），成了当年全球表现最好的股市[[2]]，连高盛都在喊还会创新高。",
            "市场弥漫着熟悉的气氛——「这次不一样」「AI 是未来」「再不上车就晚了」。很多普通人不只把积蓄投进去，还借钱加杠杆，想让赚的钱再翻几倍。这头牛，被大家叫做「疯牛」（mad bull）。"
          ]
        }
      },
      {
        "title": {
          "en": "Hitting the wall, and the leverage backlash",
          "zh": "撞墙，与杠杆的反噬"
        },
        "paragraphs": {
          "en": [
            "In July the bull hit the wall. Chip stocks pulled back hard—AI hype had pushed Samsung and SK Hynix valuations too high, so any tremor cut deep. On \"Black Monday,\" July 13, the KOSPI plunged nearly 9% in a day and broke below 7,000[[3]]; the world's hottest market officially entered a bear market, down about 26% from its peak[[1]]. How fast? Korea's circuit breakers—which halt trading after a steep drop—were reportedly tripped as many as seven times that year, though a circuit breaker is normally a once-in-years event[[1]].",
            "What turned the fall into a stampede was leverage. Anyone who had borrowed to buy in got a margin call once prices crossed a line—add cash now, or be force-sold. In this round, reportedly about 1.2 million margin accounts faced calls and around 360,000 retail investors were force-liquidated, wiped out[[5]]. Forced selling drove prices lower, and lower prices triggered still more forced selling—a downward death spiral, so out of control that even Korea's president stepped in with emergency intervention[[5]].",
            "Leverage is double-edged: on the way up it makes you richer faster; on the way down it forces you out at the bottom, in the ugliest way. And here it shares a quiet trait with the scams we discussed before—what they amplify is never value, but price and emotion."
          ],
          "zh": [
            "7 月，牛撞墙了。芯片股大幅回调——AI 概念把三星、SK 海力士的估值推得太高，一旦风吹草动，跌起来同样凶。7 月 13 日「黑色星期一」，KOSPI 单日暴跌近 9%、跌破 7,000 点[[3]]；那个曾经全球最牛的市场正式跌进熊市，从高点算下来跌约 26%[[1]]。跌得多急？年内韩国股市的熔断机制据报道已被触发七次之多——而熔断本来是几年难得一见的极端事件[[1]]。",
            "真正把下跌变成踩踏的是杠杆。牛市里借钱买股票的人，一旦股价跌破某条线就会收到券商「追缴保证金」通知——马上补钱，不然强制卖出。据报道这一轮约有 120 万个融资账户面临追缴，约 36 万名散户被强制平仓、血本无归[[5]]。而强制卖出把股价砸得更低，更低又触发更多强制卖出——一个往下的死亡螺旋；跌势失控到连韩国总统都出面紧急干预[[5]]。",
            "杠杆是双刃剑：涨时让你赚得更快，跌时逼你在最低点、用最惨的方式离场。这一点，和我们之前聊过的那些骗局有个隐秘的共同点——它们放大的，都不是价值，而是价格和情绪。"
          ]
        }
      },
      {
        "title": {
          "en": "Back to those two numbers: price is not value",
          "zh": "回到那两个数字：价格不等于价值"
        },
        "paragraphs": {
          "en": [
            "Back to the opening contrast. Same country, same month: it sells chips and does real business, genuinely making money, exports setting records—yet its share price halved at the same time. Why? Because price and value were never the same thing.",
            "A company's real value is how much it actually earns and makes—usually slow to change. But its share price is set by something else: how much people are willing to pay for it right now. And that \"willing\" gets shoved around by emotion, leverage, and \"is there anyone left to buy,\" so within weeks it can detach entirely from real value—detaching upward is a bubble, downward is panic. Korea got both: in the first half AI and exports were real, but price ran far ahead of value; in July the mood flipped and price crashed well below where it should have sat. The real business barely moved; what kept going wild was the price."
          ],
          "zh": [
            "回到开头那个对比。同一个国家、同一个月：它卖芯片、做生意，真的在赚钱，出口实打实创新高；可股票价格却在同一时间腰斩。为什么？因为价格和价值，从来就不是一回事。",
            "一家公司真实的价值，是它实实在在能赚多少钱、做出多少东西——变化通常缓慢。但股票的价格，由另一件事决定：此时此刻市场上的人愿意用多高的价钱买它。而这个「愿意」，被情绪、杠杆、「还有没有人接盘」推来推去，可以在几周内和真实价值完全脱节——往上脱节是泡沫，往下脱节是恐慌。韩国这次两头都占了：上半年 AI 和出口是真的，但价格被推得远远跑在价值前面；7 月情绪一转，价格又狠狠跌破本该有的位置。真实的生意没怎么变，疯狂变化的一直是价格。"
          ]
        }
      },
      {
        "title": {
          "en": "A lesson worth more than the scams",
          "zh": "这堂课，比骗局更值得记住"
        },
        "paragraphs": {
          "en": [
            "I've written about [[note:carrian-case|Carrian]] and [[note:mbi-case|MBI]]—those were outright fakes, nothing real underneath. Korea is different, and precisely because it is different, it is worth remembering more: here the chips are real, the AI demand is real, the companies genuinely make money. A perfectly legitimate market with strong fundamentals can still have its price inflated into a bubble, and still crash. With a scam you can at least screen by \"is it fake\"; but when the thing is real and the story is real, and only the price has been blown too far, most people cannot tell—they read \"price is rising\" as \"value is rising,\" and pile in at the top, on leverage.",
            "So whether you face a scam or a real-but-overheated market, what protects you is a variant of the same question: am I buying the solid value of this business, or just betting that \"someone behind me will pay a higher price for my bag\"? If the former, a short-term drop lets you sleep, because the value is still there. If the latter, you are playing something close to a [[note:modern-finance-ponzi|money game]]—your profit is the next person's money, and whether you get out whole depends on not being the last to hold the baton.",
            "One more thing: this lesson is not only Korea's. As the same AI boom lifts U.S. stocks and tech shares worldwide, \"price running far ahead of value\" is worth keeping in mind at all times. Some analysts said outright that the KOSPI was \"trading like a meme stock,\" and warned that another market could be next[[6]]."
          ],
          "zh": [
            "我之前写过[[note:carrian-case|佳宁]]、写过[[note:mbi-case|MBI]]——那些是彻头彻尾的假东西，底下压根没有真实价值。韩国这次不一样，也正因为不一样，更值得记住：这里的芯片是真的、AI 需求是真的、公司是真赚钱的。一个完全正当、基本面很好的市场，价格照样能被吹成泡沫，也照样能崩。骗局你还能靠「它是不是假的」来识别；可当东西是真的、故事也是真的，唯一被吹过头的只是「价格」时，绝大多数人分不清——他们会把「价格在涨」直接当成「价值在涨」，然后在最高点加着杠杆冲进去。",
            "所以无论面对骗局，还是一个真实但过热的市场，能保护你的是同一个问题的变体：我现在买的，是这门生意实实在在的价值，还是只是在赌「后面有人愿意用更高的价钱接我的盘」？如果是前者，价格短期跌了你睡得着，因为价值还在；如果是后者，那你玩的本质上和[[note:modern-finance-ponzi|money game]]没差多少——你赚的是下一个人的钱，能不能全身而退，取决于你是不是最后一个接棒的人。",
            "顺便一句：这堂课不只是韩国的。当 AI 热潮同样在推高美股、推高全世界科技股时，「价格远远跑在价值前面」这件事值得每个人时时放在心里。有分析师直接说，韩国股市这阵子「炒得像迷因股」，还提醒——下一个可能就轮到别的市场[[6]]。"
          ]
        }
      }
    ],
    "datePublished": "2026-07-29",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "mbi-case",
    "title": {
      "en": "Old scam, new clothes: MBI and the coin that \"only goes up\"",
      "zh": "旧骗局，新外衣：MBI 与那枚「会一直涨」的币"
    },
    "summary": {
      "en": "A self-issued coin said to \"only go up,\" a tangible online mall, and a line like \"you'll regret missing this forever\"—Penang's MBI pulled in the money of about two million people with this kit. Take it apart, though, and inside is a trick that has not changed in centuries.",
      "zh": "一枚自家发行、号称「只涨不跌」的虚拟币，一个看得见摸得着的线上商城，再加一句「错过这次你会后悔一辈子」——马来西亚槟城的 MBI，用这套东西吸走了大约两百万人的钱。可你把它拆开，里面装的是一个几百年都没变过的老套路。"
    },
    "category": {
      "en": "Money & real value",
      "zh": "钱与真实价值"
    },
    "thesis": {
      "en": "The scam's outer clothes keep upgrading—postal coupons, property, crypto—but the core barely changes: pay old entrants with new ones' money, nothing real underneath, kept alive by confidence and fresh cash.",
      "zh": "骗局的外衣一直在升级——邮票、地产、加密币，但内核几乎一模一样：拿新人的钱付旧人、底下没有真实价值、靠信心和新钱续命。"
    },
    "sources": [
      "The Edge · MBI 案",
      "SCMP · Jho Low 2",
      "Bangkok Post · 引渡",
      "SCMP · 跨境追赃"
    ],
    "originalSource": {
      "url": "mbi-case-full.html",
      "label": {
        "en": "Read the full original essay",
        "zh": "阅读完整原文（白话版）"
      }
    },
    "references": [
      {
        "id": "1",
        "url": "https://theedgemalaysia.com/node/787385",
        "label": {
          "en": "The Edge Malaysia on the MBI case. MBI (Mobility Beyond Imagination) was founded in Penang around 2012 by Tedy Teow, running on a self-issued coin and the M Mall O2O marketplace; by ~2016 it had spread to China, Taiwan, Japan and New Zealand; in May 2017 Bank Negara seized it and froze accounts, recovering only ~RM177m; by 2025 the Ops Northern Star operation had seized or frozen ~RM6.6bn of related assets.",
          "zh": "《The Edge Malaysia》关于 MBI 案：约 2012 年由张誉发在槟城创办，以自家虚拟币与 M Mall（O2O 商城）运作，2016 年前后扩张至中国、台湾、日本、新西兰；2017 年 5 月国行查封冻结账户，仅追回约 1.77 亿令吉；2025 年 Ops Northern Star 行动累计查扣冻结相关资产约 66 亿令吉。"
        }
      },
      {
        "id": "2",
        "url": "https://www.scmp.com/week-asia/people/article/3276381/how-tedy-teow-malaysian-fraudster-dubbed-jho-low-2-allegedly-swindled-millions",
        "label": {
          "en": "South China Morning Post — how Tedy Teow, dubbed \"Jho Low 2,\" allegedly swindled millions. Recounts an investor putting money in after a seminar, \"millions of victims across Asia,\" and the nickname.",
          "zh": "《South China Morning Post》：记述受害者在投资说明会后投入资金、「数百万受害者遍布亚洲」，以及张誉发被称为「Jho Low 2」。"
        }
      },
      {
        "id": "3",
        "url": "https://www.bangkokpost.com/thailand/general/2852908/thailand-extradites-malaysian-fugitive-to-china-over-us-14-billion-cryptocurrency-scam",
        "label": {
          "en": "Bangkok Post — Thailand extradited Teow to China in August 2024, where he faces charges over a cryptocurrency pyramid scheme worth about US$14bn.",
          "zh": "《Bangkok Post》：泰国 2024 年 8 月将张誉发引渡至中国，中方就一宗涉及约 140 亿美元的加密货币传销骗局对其提出指控。"
        }
      },
      {
        "id": "4",
        "url": "https://www.scmp.com/week-asia/people/article/3314016/us900-million-seized-china-helps-malaysia-dismantle-tedy-teows-scam-empire",
        "label": {
          "en": "South China Morning Post — about US$900m seized as China helped Malaysia dismantle Teow's scam empire through cross-border cooperation.",
          "zh": "《South China Morning Post》：报道中马跨境合作追赃，查扣资产约达 9 亿美元。"
        }
      }
    ],
    "referencesNote": {
      "en": "Reported figures vary by source (charged amounts, transaction flows, victims' reported losses); this uses the more authoritative public reporting and gives ranges. Parts of the case remain before the courts—this piece explains the pattern and does not pronounce guilt on any living person.",
      "zh": "涉案金额因口径不同（起诉金额、交易流水、受害者报案损失）各方有差异，本文取较权威的公开报道并标明范围。案件部分仍在司法程序中，本文旨在解释套路，不对在世个人作有罪定论。"
    },
    "sections": [
      {
        "title": {
          "en": "A seminar, and what MBI was",
          "zh": "一场招商大会，以及 MBI 是什么"
        },
        "paragraphs": {
          "en": [
            "In 2016, an investor named Randy Ang sat through an investment seminar. Speakers painted overnight riches—one said that if you followed along you would go \"from driving an ordinary car to driving a Ferrari.\" Afterward he put in a five-figure sum[[2]]. The company was MBI, and you can guess the rest: the money was gone. Alongside him, an estimated two million people handed over their cash, across Malaysia and China.",
            "MBI—Mobility Beyond Imagination—started in Penang around 2012, founded by Tedy Teow[[1]]. The mechanics, taken apart, are just three steps: you pay in for a \"package,\" anywhere from a few thousand to hundreds of thousands; you receive a self-issued coin (often called GRC) said to only ever rise; and you recruit more people, earning more the larger your downline. By step three the red light should be on—isn't this just pyramid recruiting? It is. But what made MBI truly dangerous was the respectable-looking skin it wrapped around this."
          ],
          "zh": [
            "2016 年，投资者 Randy Ang 去听了一场投资说明会。台上讲师描绘一夜致富，有人说跟着做你会「从开普通车变成开法拉利」。会开完，他投进一笔五位数的钱[[2]]。他投的公司叫 MBI，后来的事你大概猜到了：钱没了。和他一起交钱的，据估计约有两百万人，遍布马来西亚和中国。",
            "MBI 全名 Mobility Beyond Imagination，约 2012 年从槟城起家，创办人张誉发（Tedy Teow）[[1]]。玩法拆开只有三步：一、你交钱买「配套」，几千到几十万不等；二、你拿到一枚它自家发行的虚拟币（外界常提到 GRC），号称只涨不跌；三、你拉更多人进来，下线越多赚得越多。看到第三步就该亮红灯——这不就是拉人头传销吗？没错，但 MBI 真正害人的地方，是给它套了一层看起来很正当的皮。"
          ]
        }
      },
      {
        "title": {
          "en": "The skin was called M Mall",
          "zh": "那层皮，叫 M Mall"
        },
        "paragraphs": {
          "en": [
            "If it were only a coin and recruiting, anyone slightly wary would walk. So MBI built M Mall—an online-to-offline shopping mall (they called it O2O). Its job was to answer the deadliest question: why is your coin worth anything? MBI's answer: because you can use it—spend the coin in M Mall, backed by real shops and real merchants, so the coin has \"real value behind it.\"",
            "This step is the soul of the whole scheme: dressing a recruit-and-coin money game as an \"O2O tech company with a real business.\" It is exactly the move [[note:carrian-case|Carrian]] used—real property deals masking the fact that everything underneath was borrowed money—using a visible \"real business\" to blur a hollow core. But the mall could not hold up the coin: real trade in M Mall was tiny next to the flood of money pouring in. The coin \"rose\" not because the mall earned anything, but because there were always new people willing to buy in at a higher price."
          ],
          "zh": [
            "如果只是发币、拉人头，稍有警惕的人就会跑。所以 MBI 搭了一个 M Mall——线上线下打通的购物商城（他们叫 O2O）。它的作用是回答那个最要命的问题：你这枚币，凭什么值钱？MBI 的答案是：因为它能用——你能拿币在 M Mall 消费，我们背后有真实商城、真实商家，所以这币有「真实价值支撑」。",
            "这一步是整个骗局的灵魂：把一个「拉人头＋虚拟币」的 money game，包装成「有实体业务的 O2O 科技公司」。这和[[note:carrian-case|佳宁]]当年用真实的地产交易掩盖底下全是借来的钱，是一模一样的手法——用一个你看得见的「真生意」，模糊掉底下那个空洞的本质。但商城撑不起那枚币：M Mall 真实的买卖，跟外面涌进来的天量资金比小得可怜。币之所以「涨」，从来不是商城赚了钱，而是后面一直有新人愿意用更高的价格接盘。"
          ]
        }
      },
      {
        "title": {
          "en": "Hold up the three old questions, and it shows",
          "zh": "拿三个老问题一套，就现形"
        },
        "paragraphs": {
          "en": [
            "In [[note:modern-finance-ponzi|Is modern finance a Ponzi scheme]] I laid out three old questions for telling whether something is a money game. Applied to MBI, it is almost a clean sweep. Where do returns come from? Early entrants' \"returns\" come mainly from later entrants' money. Is anything real there? The coin has no matching real value; M Mall cannot support its scale. Does it collapse if new money stops? The moment recruits dry up and everyone cashes out at once, the coin price and the whole pool crash.",
            "Three for three. So however much it talks of \"blockchain,\" \"O2O,\" and \"the digital economy,\" at its bones it is a money game. And it expanded startlingly: by around 2016 it had reached China, Taiwan, Japan, and New Zealand[[1]], with China worst hit and victims later estimated near two million—Teow was even nicknamed \"Jho Low 2\" by the press[[2]]."
          ],
          "zh": [
            "我在[[note:modern-finance-ponzi|《现代金融，是一场庞氏骗局吗》]]里讲过判断一个东西是不是 money game 的三个老问题。套 MBI 几乎逐条命中：回报从哪来？早加入者的「回报」主要来自后加入者的钱。有没有真东西？那枚币背后没有对应的真实价值，M Mall 撑不起它的体量。断了新钱会崩吗？只要新人一停、大家一起套现，币价和整个盘子就崩。",
            "三条全中。所以不管它讲多少「区块链」「O2O」「数字经济」的新词，骨子里就是一场 money game。而它扩张惊人：2016 年前后触角已伸到中国、台湾、日本、新西兰[[1]]，重灾区是中国，受害者后来估计约两百万，张誉发也被媒体戏称为「Jho Low 2」、第二个刘特佐[[2]]。"
          ]
        }
      },
      {
        "title": {
          "en": "Collapse and the manhunt",
          "zh": "崩塌与追捕"
        },
        "paragraphs": {
          "en": [
            "Paper cannot wrap fire, and neither can a crypto skin. In May 2017 Malaysia's central bank (Bank Negara) seized MBI and froze accounts—but the money had long scattered, and only about RM177m was recovered; MBI was placed on the central bank's financial alert list[[1]].",
            "Teow fled to Thailand and kept operating. He was arrested there in July 2022 and extradited to China in August 2024—where the charges involve a crypto pyramid scheme worth some US$14bn[[3]]. Asset recovery continues: in 2025 the operation code-named Ops Northern Star had seized or frozen about RM6.6bn, and those arrested even included property tycoons with Datuk and Tan Sri titles; reports that year also said cross-border seizures, with China's help, reached about US$900m[[4]]."
          ],
          "zh": [
            "纸包不住火，加密币的皮也一样。2017 年 5 月，马来西亚国家银行（Bank Negara）查封 MBI、冻结账户，但钱早已四散，只追回约 1.77 亿令吉，MBI 也被列入国行金融警示名单[[1]]。",
            "张誉发逃到泰国继续经营。2022 年 7 月在泰国被捕；2024 年 8 月被引渡到中国受审——中方指控涉及一个金额高达约 140 亿美元的加密货币传销骗局[[3]]。追赃仍在继续：2025 年代号 Ops Northern Star 的行动累计查扣冻结约 66 亿令吉，被捕者中甚至有拿督、丹斯里级的产业大亨；同年也有报道称在中国协助下跨境查扣资产约 9 亿美元[[4]]。"
          ]
        }
      },
      {
        "title": {
          "en": "The clothes keep changing; the core never does",
          "zh": "皮一直在换，芯从来没变"
        },
        "paragraphs": {
          "en": [
            "Put MBI beside [[note:carrian-case|Carrian]], and even beside Charles Ponzi a century ago, and you see something scary and useful: the scam's clothes keep upgrading while the core barely changes. The clothes differ by era—Ponzi used postal coupons, Carrian used property, MBI used crypto and a mall; the core never moves—pay old entrants with new ones' money, nothing real underneath, kept alive by confidence and fresh cash.",
            "New clothes work so well because they exploit two very ordinary human traits: not understanding—crypto, blockchain, O2O; the less people grasp it, the easier they are cowed by \"this is high tech, this is the future\"—and fear of missing out—\"everyone else is earning and only I haven't boarded,\" the best fuel any money game has. So protecting yourself is not about chasing new concepts and learning which coin is real (you never finish; tomorrow brings new words), but returning to the three oldest, plainest questions: is my return earned by the business or paid from newcomers' money? Is there anything real behind it to support the value it claims? If no new people come tomorrow, does it still run?",
            "These three need no blockchain knowledge and no ability to read a balance sheet, yet they cut through almost any money game—whatever the skin: stamps, property, or a coin that supposedly \"only goes up.\" Because in the end, whether a coin keeps rising never depends on how lovely its story is, but on one cold thing: whether someone behind you will still take your bag at a higher price. When the buyers run out, the prettiest story cannot pay out a cent."
          ],
          "zh": [
            "把 MBI 和[[note:carrian-case|佳宁]]、甚至一百年前的查尔斯·庞氏摆在一起，你会看到一件挺可怕又挺有用的事：骗局的外衣一直在升级，内核几乎一模一样。外衣每个时代不同——庞氏用邮票票券、佳宁用地产、MBI 用加密币和商城；内核从来没变——拿新人的钱付旧人、底下没有真实价值、靠信心和新钱续命。",
            "新外衣特别好用，因为它利用两种最普通的人性：一是看不懂——加密币、区块链、O2O，越听不懂越容易被「这是高科技、是未来」唬住；二是怕错过——「别人都在赚，就我没上车」的焦虑，是所有 money game 最好的燃料。所以保护自己的方法不是去追新概念、学分辨哪个币真哪个假（那永远学不完，明天又有新词），而是回到那三个最老最土的问题：回报是生意真赚来的，还是后面新人的钱？背后有没有真东西撑起它宣称的价值？明天没有新人进来，它还转得下去吗？",
            "这三个问题不需要你懂区块链，也不需要你会看财报，却能戳穿几乎所有 money game——不管那层皮是邮票、地产，还是一枚号称「只会涨」的币。因为说到底，一枚币会不会一直涨，不取决于它讲了多动听的故事，而取决于一件很冷的事：后面还有没有人愿意用更高的价钱接你的盘。接盘的人没了，故事再漂亮也一分钱兑现不了。"
          ]
        }
      }
    ],
    "datePublished": "2026-07-29",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "carrian-case",
    "title": {
      "en": "An empire built on borrowed money: the Carrian case",
      "zh": "一座建在借来的钱上的帝国：佳宁案"
    },
    "summary": {
      "en": "In 1983 a body turned up in a Hong Kong banana grove—an auditor a Malaysian bank had sent to check the books. His death exposed the largest fraud Hong Kong had seen: a 200-company empire that looked like it could turn stone into gold, yet was almost hollow underneath.",
      "zh": "1983 年，香港大埔一片香蕉林里发现一具尸体，死者是马来西亚银行派来查账的核数师。他的死扯出当年香港最大的一场骗局——一个横跨两百多家公司、看起来点石成金的商业帝国，底下却几乎是空的。"
    },
    "category": {
      "en": "Money & real value",
      "zh": "钱与真实价值"
    },
    "thesis": {
      "en": "Carrian punctures a mistake we make daily—treating \"looks rich\" as \"is genuinely valuable.\" However glamorous the balance sheet, underneath there is either real output, or just borrowed money and other people's belief.",
      "zh": "佳宁戳破的是一个我们每天都在犯的错觉——把「看起来有钱」当成「真的有价值」；账面再风光，底下要么垫着真东西，要么只是借来的钱和大家的相信。"
    },
    "sources": [
      "ICAC · 佳宁案纪录",
      "维基 · 陈松青",
      "Cilisos · 裕民风波",
      "UPI · 1987 审讯",
      "SCMP · 律师溺亡"
    ],
    "originalSource": {
      "url": "carrian-case-full.html",
      "label": {
        "en": "Read the full original essay",
        "zh": "阅读完整原文（白话版）"
      }
    },
    "references": [
      {
        "id": "1",
        "url": "https://www.icac.org.hk/icac/landmarkcase/carrian/schi/index.html",
        "label": {
          "en": "Hong Kong ICAC — the Carrian Group fraud. Records the 1980 Gammon House deal (~HK$998m in, ~HK$1.68bn resale), a share-price peak of HK$17.9 in Nov 1980, 200+ companies, the Jan 1983 suspension and Oct 1983 winding-up (Hong Kong's largest corporate failure then), a 17-year probe over ~HK$6.6bn with 4 million pages of evidence, and George Tan's 1996 guilty plea.",
          "zh": "香港廉政公署（ICAC）《神话的幻灭——佳宁集团诈骗案》：记载 1980 年金门大厦交易（约 9.98 亿港元买入、约 16.8 亿港元转售）、1980 年 11 月股价见 17.9 港元高位、旗下逾 200 家公司、1983 年 1 月停牌、10 月清盘（当时香港最大公司倒闭案）、廉署专案 17 年涉款约 66 亿港元、证物 400 万页，以及陈松青 1996 年认罪。"
        }
      },
      {
        "id": "2",
        "url": "https://en.wikipedia.org/wiki/George_Tan",
        "label": {
          "en": "George Tan Soon-gin (Wikipedia). Born 1933, civil-engineering background, bankrupt in Singapore in the 1960s, moved to Hong Kong in 1972; took over and renamed Carrian in the late 1970s; acquitted after a 19-month trial in 1987; pleaded guilty to conspiracy to defraud in 1996 over BMF secret loans (~US$238m), jailed 3 years, released 1998.",
          "zh": "陈松青（George Tan Soon-gin），英文维基百科：1933 年生，土木工程背景，1960 年代在新加坡破产，1972 年赴港；1970 年代末接手并改名佳宁；1987 年经 19 个月审讯获判无罪；1996 年就约 2.38 亿美元裕民银行秘密贷款认串谋诈骗罪，判囚 3 年，1998 年获释。"
        }
      },
      {
        "id": "3",
        "url": "https://cilisos.my/how-the-mysterious-death-of-an-auditor-in-1983-lead-to-malaysias-first-banking-scandal/",
        "label": {
          "en": "The Jalil Ibrahim killing and the BMF affair (Cilisos). Sent by Malaysia's Bumiputra bank in late 1982 to investigate loans to Carrian, Ibrahim was murdered in July 1983, his body found in a New Territories banana grove; BMF lent the Carrian group ~RM2.5bn; after the collapse Malaysia injected RM600m, then had Petronas buy 90% of Bumiputra for ~RM933m and absorb ~RM1.2bn of bad debt.",
          "zh": "核数师 Jalil Ibrahim 命案与裕民银行（BMF）风波（Cilisos 综合报道）：他 1982 年底被马来西亚裕民银行派往香港调查对佳宁的贷款，1983 年 7 月遇害，尸体在新界香蕉园被发现；裕民财务借予佳宁系约 25 亿马币；崩盘后马来西亚政府先注资 6 亿马币，1984 年再由 Petronas 约 9.33 亿马币买下九成股权、吸收约 12 亿马币坏账。"
        }
      },
      {
        "id": "4",
        "url": "https://www.upi.com/Archives/1987/09/15/Hong-Kong-fraud-trial-thrown-out/4829558676800/",
        "label": {
          "en": "UPI archive (1987) — the ~19-month Carrian fraud trial was thrown out by the judge, and Tan was acquitted at the time.",
          "zh": "UPI 档案（1987）：历时约 19 个月的佳宁诈骗审讯被法官叫停，陈松青当时获判无罪。"
        }
      },
      {
        "id": "5",
        "url": "https://www.scmp.com/article/35624/drowning-linked-carrian-probe",
        "label": {
          "en": "South China Morning Post — a senior legal adviser close to Carrian was found drowned in his own pool, a death linked to the Carrian investigation.",
          "zh": "南华早报（SCMP）：一名与佳宁关系密切的资深法律顾问被发现溺死于自家泳池，其死亡与佳宁案调查相关联。"
        }
      }
    ],
    "sections": [
      {
        "title": {
          "en": "A body in the banana grove",
          "zh": "香蕉林里的尸体"
        },
        "paragraphs": {
          "en": [
            "In July 1983, Jalil Ibrahim, an auditor at Malaysia's Bumiputra bank, vanished in Hong Kong. Head office had sent him to find out one thing: why the Hong Kong subsidiary had lent so much money to a single company. He never finished—his body was found in a banana grove in Tai Po, a bathrobe cord around his neck[[3]].",
            "Tracing the case back from that body, investigators in both places slowly saw the truth: the company that had borrowed those astronomical sums, the toast of the city, owed almost all of its glamour to borrowed money. The company was Carrian."
          ],
          "zh": [
            "1983 年 7 月，马来西亚裕民银行的核数师 Jalil Ibrahim 在香港失踪。总行派他来查一件事：香港的子公司为什么把那么多钱借给同一家公司。他没能查完——人们在大埔一片香蕉林里找到他的尸体，脖子上勒着一条浴袍带子[[3]]。",
            "顺着这具尸体往回查，两地的人才慢慢看清：那家借走天量资金、当时红得发紫的公司，风光几乎全是借来的。这家公司，叫佳宁。"
          ]
        }
      },
      {
        "title": {
          "en": "The man who seemed to turn stone into gold",
          "zh": "那个「点石成金」的人"
        },
        "paragraphs": {
          "en": [
            "The lead was George Tan, born 1933, a civil engineer who ran construction in Singapore and Malaysia—going bankrupt once—before arriving in Hong Kong in 1972 as a mere project manager at a property firm[[2]]. He knew how to buy land cheap in a down market: once buying a plot for HK$2.5m and flipping it to the government for HK$6.2m within a year, building his first fortune and his name.",
            "What made him an overnight legend was one building: in January 1980 Carrian bought Central's Gammon House for about HK$998m, then months later announced a resale for HK$1.68bn[[1]]. Nearly HK$700m of paper profit in months stunned the whole city. On that halo Carrian expanded wildly into shipping, tourism, insurance, property, and finance—over 200 companies at its peak, spanning the Asia-Pacific and North America."
          ],
          "zh": [
            "主角陈松青，1933 年生，土木工程背景，1960 年代在新马做工程、还破过产，1972 年到香港，起初只是地产公司的工程经理[[2]]。他懂得在楼市低迷时低价买地——曾用 250 万港元买地，一年内 620 万转手卖给政府，攒下第一桶金和名声。",
            "真正让他一夜封神的是一栋楼：1980 年 1 月，佳宁用约 9.98 亿港元买下中环金门大厦，几个月后宣布以 16.8 亿港元转手[[1]]。账面几个月赚近 7 亿，整个香港被镇住。借着这股光环，佳宁疯狂扩张到航运、旅游、保险、地产、金融，巅峰时旗下两百多家公司，横跨亚太和北美。"
          ]
        }
      },
      {
        "title": {
          "en": "Where did the money come from?",
          "zh": "钱，到底从哪来？"
        },
        "paragraphs": {
          "en": [
            "The market kept guessing where Tan's money came from—a mysterious tycoon? An overseas syndicate? The truth was less romantic: most of it was borrowed. The heaviest line ran from Malaysia—Bumiputra Malaysia Finance (BMF), the Hong Kong arm of the state bank, lent the Carrian group about RM2.5bn[[3]].",
            "That recolors the Gammon House legend: the \"HK$700m in months\" was largely borrowed money used to prop asset prices higher, layer by layer, as a show for the market. It looked like value creation but was mostly moving borrowed money around—a gleaming empire whose foundation was other people's money. As long as the money kept coming and the market kept believing, it kept turning."
          ],
          "zh": [
            "市场一直猜：陈松青的钱从哪来？神秘富豪，还是海外财团？真相没那么浪漫——绝大部分是借来的。借得最狠的一条线来自马来西亚裕民银行在港的子公司「裕民财务」（BMF），前后借给佳宁系约 25 亿马币[[3]]。",
            "于是金门大厦的神话味道就变了：所谓「几个月赚 7 亿」，很大程度是用一笔笔借来的钱把资产价格一层层垫高、做给市场看。它看起来在创造价值，其实大多数时候只是在搬运借来的钱——一座金光闪闪的帝国，地基却是别人的钱。只要钱一直借得到、市场一直相信，它就能一直转。"
          ]
        }
      },
      {
        "title": {
          "en": "The cracks, and the collapse on two shores",
          "zh": "裂缝，与两地一起塌"
        },
        "paragraphs": {
          "en": [
            "But money is not borrowed forever, and markets do not believe forever. In 1982 Hong Kong property cooled, and uncertainty from the Sino-British talks over Hong Kong's future pushed asset prices down. For an empire living on \"borrow new, prop assets,\" this was fatal: as buildings fell, collateral lost value, new money stopped coming, and old debts came due one by one[[1]].",
            "Around the same time, Bumiputra's head office grew suspicious and sent auditor Ibrahim to investigate. He had just rejected a roughly US$4m loan Carrian urgently needed, and had written in his notes that the bank \"has been used, exploited to make money for political purposes\"[[3]]. Then came the opening scene. The case dragged in another strange death—a senior Carrian legal adviser found drowned in his own pool[[5]].",
            "Carrian was suspended in January 1983 and wound up that October—Hong Kong's largest corporate collapse at the time, leaving almost nothing real behind. Malaysia was dragged under: about RM2.5bn turned to bad debt, pushing Bumiputra to the brink; the government injected RM600m, then in 1984 had Petronas buy 90% for about RM933m and absorb some RM1.2bn of bad loans[[3]]. A Hong Kong company's paper prosperity was, in the end, patched with Malaysian taxpayers' money."
          ],
          "zh": [
            "但钱不会永远借得到，市场也不会永远相信。1982 年香港楼市转冷，加上中英关于香港前途谈判的不确定，资产价格下行。对一个靠「借新钱、垫高资产」活着的帝国，这是致命的：楼一跌，抵押品不值钱，新钱借不进来，旧债却一笔笔到期[[1]]。",
            "差不多同时，裕民总行起疑，派核数师 Ibrahim 来查。据披露，他遇害前刚否决一笔佳宁急需的、约 400 万美元的贷款，还在笔记里写下「这家银行一直被人利用，被用来为政治目的赚钱」[[3]]。然后就有了开头那一幕。命案还牵出另一桩离奇死亡——佳宁一位资深法律顾问被发现溺死在自家泳池[[5]]。",
            "1983 年 1 月佳宁停牌，10 月清盘，成为当时香港最大公司倒闭案，帝国几乎没留下真东西。真正被拖下水的是马来西亚：约 25 亿马币成坏账，把裕民银行推到破产边缘；政府先注资 6 亿马币，1984 年再让 Petronas 约 9.33 亿马币买下九成股份、吞约 12 亿马币坏账[[3]]。一家香港公司账面上的繁荣，最后用马来西亚纳税人的钱去填窟窿。"
          ]
        }
      },
      {
        "title": {
          "en": "Seventeen years for a three-year sentence—and the lesson",
          "zh": "十七年换三年，以及它教我们的事"
        },
        "paragraphs": {
          "en": [
            "The ending is just as rueful. The ICAC probe ran 17 years, involved about HK$6.6bn, and produced four million pages of evidence[[1]]; the 19-month fraud trial in 1987 still collapsed when the judge halted it and Tan was acquitted[[4]]; only in 1996 did he admit two counts of conspiracy to defraud, drawing a three-year sentence, and he was out by 1998[[2]]. A fraud that toppled Hong Kong's largest company, nearly sank a national bank, and was indirectly tied to a killing cost its mastermind three years.",
            "But what Carrian really punctures is a mistake we make daily: treating \"looks rich\" as \"is genuinely valuable.\" That line of thinking is the same one running through [[note:what-is-wealth|What is wealth]] and [[note:modern-finance-ponzi|Is modern finance a Ponzi scheme]]—money is only a record; what matters is whether there is anything real underneath.",
            "So Carrian leaves a plain, easily-forgotten question: the \"wealth\" in front of you—a company, a building, a person's net worth—what sits underneath it? Real things that were made, or just borrowed money and shared belief? Money can be faked, prices propped, confidence inflated; real value cannot. It was either produced, or it was not."
          ],
          "zh": [
            "结局同样让人唏嘘。廉署专案历时 17 年、涉款约 66 亿港元、证物四百万页[[1]]；1987 年那场打了 19 个月的诈骗审讯还是崩了，法官叫停，陈松青一度获判无罪[[4]]；直到 1996 年他才认了两项串谋诈骗罪，判囚三年，1998 年出狱[[2]]。搞垮香港最大公司、几乎拖垮一家国家银行、还间接连着一条人命的骗局，主谋最后蹲了三年。",
            "但佳宁真正戳破的，是一个我们每天都在犯的错觉：把「看起来有钱」当成「真的有价值」。这条思路和[[note:what-is-wealth|《财富到底是什么》]]、[[note:modern-finance-ponzi|《现代金融是庞氏骗局吗》]]是同一路——钱只是记录，真正重要的是底下有没有真东西。",
            "所以佳宁留下的是一个朴素又容易被忘记的问题：你眼前这份「财富」——一家公司、一栋楼、一个人的身家——底下垫着的，是真实做出来的东西，还是只是借来的钱和大家的相信？钱可以造假、价格可以垫高、信心可以吹起来，但真实价值不会：它要么被做出来了，要么没有。"
          ]
        }
      }
    ],
    "datePublished": "2026-07-27",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "modern-finance-ponzi",
    "title": {
      "en": "Is modern finance a Ponzi scheme?",
      "zh": "现代金融是庞氏骗局吗"
    },
    "summary": {
      "en": "\"Government debt, pensions, paper money—isn't this just a Ponzi scheme?\" People say it every day. Rather than rush to agree or disagree, I first want to take the term \"Ponzi scheme\" apart and see it clearly.",
      "zh": "「国债、养老金、纸币……这不就是个庞氏骗局吗？」这句话每天都有人在说。我不急着反驳，也不急着附和，只想先把「庞氏骗局」这个词好好拆开看清楚。"
    },
    "category": {
      "en": "Money & the future",
      "zh": "钱与未来"
    },
    "thesis": {
      "en": "By definition modern finance is not a Ponzi scheme—it only shares the \"borrow new to repay old\" trait. The sharper question is not \"is it a scam\" but \"is debt growing faster than the real things the future can produce?\"",
      "zh": "按定义，现代金融不是庞氏骗局——它只沾了「借新还旧」这一条；真正该问的不是「是不是骗局」，而是「债，是不是涨得比未来能做出的真东西还快」。"
    },
    "sources": [
      "SEC · 庞氏骗局定义",
      "Smithsonian · 庞氏本尊",
      "Britannica · 麦道夫",
      "ICAC · 佳宁案",
      "英格兰银行 · 货币创造",
      "美联储 · 大衰退"
    ],
    "originalSource": {
      "url": "modern-finance-ponzi-full.html",
      "label": {
        "en": "Read the full original essay",
        "zh": "阅读完整原文（白话版）"
      }
    },
    "references": [
      {
        "id": "1",
        "url": "https://www.investor.gov/protect-your-investments/fraud/types-fraud/ponzi-scheme",
        "label": {
          "en": "SEC / Investor.gov — Ponzi Scheme. A fraud that pays earlier investors with money taken from newer ones; there is little or no real return, and it collapses once new money dries up or too many investors cash out.",
          "zh": "美国证券交易委员会（SEC）/ Investor.gov《庞氏骗局》：拿新投资者的钱付给老投资者的骗局，几乎没有真实收益，一旦拉不到新人或大量赎回就会崩溃。"
        }
      },
      {
        "id": "2",
        "url": "https://www.smithsonianmag.com/history/in-ponzi-we-trust-64016168/",
        "label": {
          "en": "Smithsonian Magazine — In Ponzi We Trust. Charles Ponzi's 1920 scheme promised 50% in 45 days via postal-coupon arbitrage; ~40,000 people gave him ~$15m in eight months; the real coupons were worth $61; investors recovered under 30 cents on the dollar.",
          "zh": "Smithsonian《In Ponzi We Trust》：庞氏 1920 年承诺「45 天回报 50%」，号称靠国际邮政票券套利；八个月募得约 1500 万美元，真实票券仅值 61 美元，投资者每美元拿回不到 30 美分。"
        }
      },
      {
        "id": "3",
        "url": "https://www.britannica.com/biography/Bernie-Madoff",
        "label": {
          "en": "Encyclopædia Britannica — Bernie Madoff. About $65bn on paper, the largest Ponzi scheme in history, which collapsed amid concentrated redemptions during the 2008 crisis.",
          "zh": "《大英百科》伯纳德·麦道夫：账面约 650 亿美元，史上最大庞氏骗局，2008 年危机中因集中赎回而崩溃。"
        }
      },
      {
        "id": "4",
        "url": "https://www.icac.org.hk/icac/landmarkcase/carrian/schi/index.html",
        "label": {
          "en": "Hong Kong ICAC — the Carrian Group case. George Tan built a 200-company empire on bank loans and a fabricated property windfall; it collapsed in 1983 as Hong Kong's largest corporate failure then. Strictly corporate fraud, not a textbook Ponzi, but it shares the \"glamorous surface, nothing real underneath\" core.",
          "zh": "香港廉政公署（ICAC）佳宁案：陈松青靠银行贷款与制造出的地产暴利假象撑起两百多家公司，1983 年崩盘，为当时香港最大公司破产案。严格说是公司诈骗而非标准庞氏，但共享「账面繁荣、底下无真实价值」的核心。"
        }
      },
      {
        "id": "5",
        "url": "https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy",
        "label": {
          "en": "Bank of England — Money Creation in the Modern Economy (2014). A bank loan creates a matching deposit (new money), and that lending can fund real production and investment—the key difference from a Ponzi scheme.",
          "zh": "英格兰银行《现代经济中的货币创造》（2014）：银行放贷会同时造出等额存款（新钱），而这些钱可以为真实的生产和投资出力——这正是它和庞氏骗局最不一样的地方。"
        }
      },
      {
        "id": "6",
        "url": "https://www.federalreservehistory.org/essays/great-recession-and-its-aftermath",
        "label": {
          "en": "Federal Reserve History — The Great Recession and Its Aftermath. The 2007–2009 crisis turned on mass mortgage defaults and a collapse of trust between institutions—money and confidence seizing up, not \"cash being less than debt.\"",
          "zh": "美联储历史《大衰退及其余波》：2007–2009 危机核心是大量房贷违约加上金融机构彼此不再信任、资金一下子流不动——是钱和信心断掉，而非「现金少于债务」。"
        }
      }
    ],
    "sections": [
      {
        "title": {
          "en": "First, see what a Ponzi scheme actually is",
          "zh": "先看清「庞氏骗局」长什么样"
        },
        "paragraphs": {
          "en": [
            "Boston, 1920. The Italian immigrant Charles Ponzi promised \"50% profit in 45 days,\" claiming to arbitrage international postal reply coupons. Money poured in—about 40,000 people handed him roughly $15m in eight months[[2]]. But the business did not exist: the coupons were worth all of $61, and the \"profits\" early investors received were simply later investors' principal. The moment the papers exposed it, the whole thing collapsed and people recovered under 30 cents on the dollar.",
            "The U.S. securities regulator (SEC) puts it bluntly: a Ponzi scheme pays earlier investors with money taken from newer ones[[1]]. Broken down, it has three inseparable traits—returns come from later entrants rather than real earnings; nothing real is produced, so money just changes hands; and it must eventually collapse, because it needs ever more new money to survive.",
            "Madoff, which blew up in 2008, is the textbook version—about $65bn on paper, the largest in history[[3]]. Hong Kong's 1980s [[note:carrian-case|Carrian affair]][[4]] was closer to corporate fraud, but shared the deadly trait: a glamorous surface with almost nothing real underneath, kept alive only by fresh borrowed money."
          ],
          "zh": [
            "1920 年的波士顿，意大利移民查尔斯·庞氏承诺「45 天翻回一半利润」，说靠买卖国际邮政票券套利。钱像潮水涌进来，八个月里约四万人交给他约 1500 万美元[[2]]。可那门生意根本不存在——事后清点，票券只值 61 美元，早来的人拿到的「利润」全是后来者的本金。报纸一戳破就当场塌掉，最后每一块钱拿回不到三毛。",
            "美国证券监管机构 SEC 的定义很干脆：庞氏骗局就是「拿新来的人的钱，去付给早来的人」的骗局[[1]]。拆细一点，它有三个缺一不可的特点——一、回报来自后面的人，不是真赚来的；二、背后没做出任何真东西，钱只在人之间转手；三、它迟早一定塌，因为需要的新钱只会越来越多。",
            "2008 年爆掉的麦道夫案是标准版本，账面约 650 亿美元，史上最大[[3]]；1980 年代香港的[[note:carrian-case|佳宁案]][[4]]则更像公司诈骗，但共享那个最要命的特征——账面风光，底下几乎没有真东西，全靠不断借来的新钱续命。"
          ]
        }
      },
      {
        "title": {
          "en": "Hold the three traits up against modern finance",
          "zh": "把三条架到现代金融头上"
        },
        "paragraphs": {
          "en": [
            "Trait one—returns funded by later entrants—modern finance does resemble. Governments and banks routinely \"borrow new to repay old,\" and pensions often pay one generation with the contributions of the next. The suspicion is not baseless.",
            "But trait two decides it: is anything real produced? A Ponzi scheme produces nothing; modern lending can. A bank lends you a million, you build a factory, and the factory makes products and services that did not exist before—that extra value is genuinely made, not moved out of someone else's pocket[[5]]. A Ponzi only ever splits the same cake; lending can grow the cake—the same line I draw in [[note:what-is-wealth|What is wealth]]: money only keeps score, and the ability to meet needs is the real wealth.",
            "Trait three—must it inevitably collapse? A Ponzi is a mathematical dead end, needing ever-faster inflows. The modern system has no deadline forcing all debt repaid at once: money keeps circulating, lending creates it and repayment destroys it, and governments still hold taxes, interest rates, and printing. It can break—but from money suddenly not flowing and confidence vanishing, not from arithmetic. 2008 was exactly that[[6]]."
          ],
          "zh": [
            "第一条，回报靠后面的人的钱——这一条现代金融有点像。政府和银行常「借新还旧」，养老金也常是这一代交的钱直接发给上一代。所以怀疑的人，直觉不是没道理。",
            "但真正定输赢的是第二条：背后有没有做出真东西。庞氏骗局什么都没有；而现代借贷能做出真东西——银行借你 100 万建工厂，工厂产出原本不存在的产品和服务，这多出来的价值是被真正「做」出来的，不是从别人口袋里挪来的[[5]]。庞氏永远只在分同一块蛋糕，借贷有机会把蛋糕做大——这也是[[note:what-is-wealth|《财富到底是什么》]]里那条底层分界：钱只记账，能满足需求的能力才是财富。",
            "第三条，它是不是迟早一定塌？庞氏是算得出来的死局，需要新钱越来越快地涌入。现代体系没有「某天必须一次性还清所有债」这条死线：钱可以一直转，借贷造钱、还钱消钱，政府还有加税、调息、印钱等办法。它会出事，但原因不是算术，而是钱突然流不动、信心突然消失——2008 年就是这样[[6]]。"
          ]
        }
      },
      {
        "title": {
          "en": "The verdict—and a far more interesting \"but\"",
          "zh": "结论，以及那个更有意思的「但是」"
        },
        "paragraphs": {
          "en": [
            "On all three, the answer is clear: strictly by definition, modern finance is not a Ponzi scheme. It only brushes trait one (\"borrow new to repay old\"); the decisive traits two and three do not hold.",
            "But there is a \"but\" far more interesting than \"scam or not\": modern finance and a Ponzi share one weak point—both depend on the future. A Ponzi needs more newcomers to buy in; modern finance needs people to keep working, consuming, paying taxes, producing, and trusting the system. The difference is that the Ponzi's bet on the future is a fraud, while modern finance's is a real dependency. It does not lie or steal, but it does wager on one thing: that the future will produce more real things than today."
          ],
          "zh": [
            "三条比下来，答案清楚：认真按定义讲，现代金融不是庞氏骗局。它只沾了第一条「借新还旧」的边，而最要命的第二、第三条都不成立。",
            "但这里有个比「是不是骗局」有意思得多的「但是」：现代金融和庞氏骗局确实有一个共同的命门——都指望未来。庞氏指望未来有更多新人接盘；现代金融指望未来还有人工作、消费、纳税、生产，还愿意相信这套东西。差别是：庞氏的「指望未来」是骗局，现代金融的「指望未来」是一种真实的依赖——它不偷不骗，但确实押了一个宝：未来会比今天做出更多真东西。"
          ]
        }
      },
      {
        "title": {
          "en": "Why \"it's a Ponzi scheme\" is a lazy line",
          "zh": "为什么「这是庞氏骗局」是句偷懒的话"
        },
        "paragraphs": {
          "en": [
            "That is why blurting \"it's just a Ponzi scheme\" is a trap: it is too easy to refute. The other side only has to say \"borrowed money can build real things,\" \"governments have tools,\" or \"there is no arithmetic deadline,\" and your whole point collapses—sliding the debate from \"what is wrong with this system\" into a shouting match over \"is it a scam,\" which you are bound to lose.",
            "The sharper question: is our debt growing faster than the real things the future can produce? If borrowed money becomes factories, technology, and education, it holds; if it only pushes asset prices higher, covers spending, and pays interest on old debt, then debt compounds while real output lags—that is how bubbles inflate. This framing contains no \"scam\" at all, yet goes straight to the heart: the scarcity is not cash, but whether the future's real output can honor the promises made today."
          ],
          "zh": [
            "正因如此，张口就喊「这就是庞氏骗局」是个陷阱：它太好反驳了。对方只要说「借来的钱能做出真东西」「政府有的是办法」「它没有算术死线」，你整个论点就塌了，讨论会从「这个体系有什么毛病」滑向「它算不算骗局」的口水战——而这场架你注定输。",
            "更聪明的问法是：我们欠下的债，是不是正在涨得比未来能做出来的真东西还快？借来的钱若变成工厂、技术、教育，它撑得住；若只是把房价股价越推越高、填补花销、给旧债付利息，那债越滚越多、真东西却没跟上，泡沫就是这么吹起来的。这个问法一个「骗局」都没有，却直接戳到心脏：不是钱不够，而是未来能做出的真东西，够不够兑现今天许下的承诺。"
          ]
        }
      },
      {
        "title": {
          "en": "Don't rush to slap on a label",
          "zh": "别急着贴标签"
        },
        "paragraphs": {
          "en": [
            "\"Ponzi scheme\" is a label that stops thought—once applied, the discussion ends: believe or don't, no middle ground. The better move is the opposite: peel off the scary label, take the word apart, see what pieces it is made of, and check each against reality. Do that and you find modern finance is not a scam, but it does stand on one enormous assumption—that the future will be richer. That assumption is not a lie, but it is not a given either.",
            "A Ponzi scheme cheats you of money; modern finance truly wagers on the future. So rather than \"is it a scam,\" the question worth keeping is this: if what it stakes everything on is the belief that the future will produce more than today, does that belief still hold in an age of falling birth rates and AI rewriting how things get made?"
          ],
          "zh": [
            "「庞氏骗局」是个会让人停止思考的标签，一贴上去讨论就结束了——要么信要么不信，没有中间地带。更值得做的恰恰相反：先撕下吓人的标签，把词拆开，看清它由哪几块拼成，再一块块对照现实。拆完你会发现：现代金融不是骗局，但它确实站在一个巨大的假设上——未来会更富有。这个假设不是谎话，但也不是天经地义。",
            "庞氏骗局骗的是钱，现代金融真正赌的是未来。所以比起「它是不是一场骗局」，更值得问：如果它押上的是「未来会比今天做出更多东西」这个信念，那在人越生越少、AI 又在改写整个生产方式的年代，这个信念还站得住吗？"
          ]
        }
      }
    ],
    "datePublished": "2026-07-27",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "what-is-wealth",
    "title": {
      "en": "What is wealth, really?",
      "zh": "财富到底是什么"
    },
    "summary": {
      "en": "Too many people are busy predicting bonds, AI, and house prices. I wanted to do something dumber: take the word \"wealth\" apart layer by layer, and see what is left at the very bottom.",
      "zh": "预测美债、AI、房价的人已经太多。我想做件更笨的事：把「财富」这个词一层层拆开，看看最底下到底剩下什么。"
    },
    "category": {
      "en": "First principles",
      "zh": "第一性原理"
    },
    "thesis": {
      "en": "Money is not wealth—the ability to meet needs is. And the further out you look, wealth becomes how much future productive capacity you can control.",
      "zh": "钱不是财富，能满足需求的能力才是；越往未来，财富越等于你能控制多少未来的生产能力。"
    },
    "sources": [
      "英格兰银行 · 货币创造",
      "IIF 全球债务监测",
      "Pew 全球生育趋势",
      "NBER · Generative AI at Work",
      "CBO / IMF 财政展望"
    ],
    "referencesNote": {
      "en": "These are the sources for the factual claims. The extrapolations—future wealth leaning toward energy, compute, or AI—are my own reasoning, not cited here.",
      "zh": "以上是文章「事实」部分的来源。「推演」部分（未来财富更偏能源、算力或 AI）只是顺着逻辑的推测，不在此列。"
    },
    "originalSource": {
      "url": "what-is-wealth-full.html",
      "label": {
        "en": "Read the full original essay",
        "zh": "阅读完整原文（白话版）"
      }
    },
    "references": [
      {
        "id": "1",
        "url": "https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy",
        "label": {
          "en": "Bank of England — Money Creation in the Modern Economy (2014 Q1 Bulletin). A bank loan creates a matching deposit—new money—and repaying it destroys that money.",
          "zh": "英格兰银行《现代经济中的货币创造》（2014 Q1 公报）：银行放贷会同时创造等额存款，也就是新钱；还贷则消灭这些钱。"
        }
      },
      {
        "id": "2",
        "url": "https://www.iif.com/Products/Global-Debt-Monitor",
        "label": {
          "en": "IIF Global Debt Monitor — global debt reached a record ~$348tn by the end of 2025.",
          "zh": "IIF《全球债务监测》：截至 2025 年底，全球债务总额约 348 万亿美元，创历史新高。"
        }
      },
      {
        "id": "3",
        "url": "https://www.pewresearch.org/short-reads/2025/08/15/5-facts-about-global-fertility-trends/",
        "label": {
          "en": "Pew Research Center — 5 facts about global fertility trends (2025). Replacement fertility is ~2.1 children per woman; most regions now sit below it.",
          "zh": "皮尤研究中心《关于全球生育趋势的 5 个事实》（2025）：更替水平约为每名女性 2.1 个孩子，多数地区已低于此。"
        }
      },
      {
        "id": "4",
        "url": "https://www.federalreservehistory.org/essays/great-recession-and-its-aftermath",
        "label": {
          "en": "Federal Reserve History — The Great Recession and Its Aftermath. The 2007–2009 crisis turned on subprime defaults and a collapse of trust between institutions.",
          "zh": "美联储历史《大衰退及其余波》：2007–2009 危机核心是次贷违约，以及金融机构之间信任崩溃、银行间市场冻结。"
        }
      },
      {
        "id": "5",
        "url": "https://www.nber.org/papers/w31161",
        "label": {
          "en": "Brynjolfsson, Li & Raymond — Generative AI at Work (NBER w31161). Measured ~14% average productivity gains for support agents; the \"5×/10×\" figure is my extrapolation, not the finding.",
          "zh": "Brynjolfsson、Li、Raymond《Generative AI at Work》（NBER w31161）：客服平均生产力约提升 14%；文中「放大 5 倍、10 倍」是我的推演，不是实测结论。"
        }
      },
      {
        "id": "6",
        "url": "https://www.cbo.gov/publication/61187",
        "label": {
          "en": "CBO — The Long-Term Budget Outlook: 2025–2055. Aging and mandatory spending keep pushing public debt up; the IMF Fiscal Monitor tracks the same pressure.",
          "zh": "CBO《长期预算展望 2025–2055》：人口老龄化与强制性支出持续推高政府债务；IMF《财政监测》亦跟踪各国财政可持续性。"
        }
      }
    ],
    "sections": [
      {
        "title": {
          "en": "Assumption 1: money is wealth",
          "zh": "假设一：钱，就是财富"
        },
        "paragraphs": {
          "en": [
            "Suppose only two people are left on Earth. You have $10bn; the other person has only clean water, enough food, and a solar panel. Who is richer? The answer is obvious—your $10bn is worth something for one reason only: someone else is still willing to trade real things for it. The moment that person leaves, the cash is just paper.",
            "Money, taken apart, is only an agreed medium for keeping accounts. It cannot be eaten, drunk, or burned for power. Gold, dollars, yuan—all of it runs on belief. So wealth is not money; it is the ability to meet needs. Money is just the tool you use to trade for that ability. It records wealth, but it is not wealth itself."
          ],
          "zh": [
            "假设地球上只剩两个人。你有 100 亿美金，另一个人只有干净的水、够吃的食物和一块太阳能板。谁更有钱？答案很明显——你手上那 100 亿值钱，唯一的原因是「还有别人愿意拿东西跟你换」。那个人一走，钞票就只是一堆纸。",
            "钱拆开看，只是大家约定用来记账的交换媒介，本身不能吃、不能喝、不能发电。黄金、美元、人民币都一样，靠的是信念。所以财富的本质不是钱，而是能满足需求的能力。钱只是换这种能力时用的工具，它记录财富，却不是财富本身。"
          ]
        }
      },
      {
        "title": {
          "en": "Assumption 2: debt is just owing money",
          "zh": "假设二：债务，就是欠钱"
        },
        "paragraphs": {
          "en": [
            "A modern bank loan mostly creates money from nothing: lending you 100 does not move it out of someone else's deposit—it is written into existence the moment the loan is made, and destroyed when you repay (the Bank of England says exactly this)[[1]]. Which raises the classic suspicion: the bank created 100 but wants 110 back, so where does the extra 10 come from? Is this a [[note:modern-finance-ponzi|Ponzi scheme]] waiting to blow up?",
            "Half right, half wrong. The bank never has to print that 10: the same money changes hands many times a year, and when you borrow 100 to buy a machine that makes something worth 150, the extra value comes from labor, skill, energy, and demand—money just puts a price on it. So debt never borrows money; it borrows the future. Borrowing 100 today is a bet that you can produce more than 100 of real things later.",
            "That is why the real danger is not \"not enough cash to repay.\" Global debt reached roughly $348tn by the end of 2025[[2]], but the other end of every debt is someone's asset—repay it all at once and those assets vanish too. The system breaks when cash flow and confidence snap together, which is close to what happened in 2008[[4]]."
          ],
          "zh": [
            "现代银行放贷基本是凭空创造钱——借你 100 不是从别人存款搬来的，而是在放贷那一刻记出来的，你还清时这笔钱又被消掉（英格兰银行自己就是这么解释的）[[1]]。于是有人怀疑：银行造了 100，却要你还 110，多出来的 10 从哪来？这会不会是迟早爆的[[note:modern-finance-ponzi|庞氏骗局]]？",
            "一半对，一半错。那个 10 不用银行再印：同一笔钱一年能转很多手，你借 100 买机器做出价值 150 的东西，多出来的价值是劳动、技术、能源和需求一起做出来的，钱只是给它标价。所以债务借的从来不是钱，是未来——你今天借 100，其实在赌未来能做出超过 100 的真东西。",
            "也因此，这套体系真正的危险不是「现金不够还债」。全球债务到 2025 年底已约 348 万亿美元[[2]]，但每一笔债的另一头都挂着某人的一笔资产，全部还清资产也会一起蒸发。它真正会爆的时刻，是现金流和信心一起断掉那一刻——2008 年就接近这样[[4]]。"
          ]
        }
      },
      {
        "title": {
          "en": "Assumption 3: growth is forever, and it runs on people",
          "zh": "假设三：经济会一直涨，而且靠「人」"
        },
        "paragraphs": {
          "en": [
            "For thousands of years growth almost never lost, because it kept running the same chain: more people → more production → more consumption → more GDP. The whole credit system ultimately rests on there always being people to work, consume, pay taxes, and borrow. But if the birth rate stays below replacement (about 2.1 children per woman)[[3]] for a long time—fewer workers and borrowers, but more retirees and welfare spending[[6]]—does that chain start to loosen?",
            "Don't rush the conclusion, because one variable can rewrite the whole chain—AI. We used to assume GDP ≈ people × productivity per person; if AI multiplies one person's output many times over[[5]], the formula becomes GDP ≈ people × (AI-amplified productivity). As long as the multiplier climbs faster than population falls, fewer people need not mean a weaker economy. So whether low birth rates break the system is an open question with no answer yet.",
            "AI is two sides of one coin. Zoomed out, it may rescue growth; zoomed in, it tears open a gap: when one person can do the work of twenty, the other nineteen jobs disappear at the same moment. The pie has not shrunk, but the number of people who get a slice—who have income—has. The formula can save growth but not distribution, and it pushes an old question, buried under growth for centuries, back to center stage: how should wealth be divided?"
          ],
          "zh": [
            "几千年来增长几乎没输过，因为它一直走同一条链：更多人 → 更多生产 → 更多消费 → 更多 GDP。整套信用体系，最后都押在「未来一直有人去工作、消费、纳税、借钱」上。可如果出生率长期低于更替水平（约每名女性 2.1 个）[[3]]，未来干活和借钱的人变少，退休与福利支出却越来越多[[6]]，这条链会不会松掉？",
            "别急着下结论，因为有个可能改写整条链的变量——AI。过去我们默认 GDP ≈ 人口 × 每个人的生产力；如果 AI 把一个人的生产力放大很多倍[[5]]，公式就变成 GDP ≈ 人口 ×（被 AI 放大的生产力）。只要倍数涨得比人口跌得快，人少就未必等于经济差。所以少子化会不会让系统崩，是个还没答案的开放问题。",
            "AI 是一枚硬币的两面。往大了看，它可能救了增长；往小了看，它同时撕开一道口子：一个人能顶二十个人，剩下十九个人的工作也在同一刻没了。蛋糕没变小，但能分到蛋糕、也就是有收入的人变少了。这个公式救得了增长，救不了分配——它把一个被增长盖了几百年的老问题重新推到台面正中央：财富到底该怎么分。"
          ]
        }
      },
      {
        "title": {
          "en": "What counts as a real asset now",
          "zh": "拆完之后：真正的资产是什么"
        },
        "paragraphs": {
          "en": [
            "Across history, the \"unit of wealth\" keeps upgrading: grain → gold → currency → credit → data → and maybe AI next. Each upgrade pushes the carrier of wealth one step closer to productive capacity itself. Follow that direction and future wealth may increasingly equal one thing: how much future productive capacity you can control.",
            "Feel it another way: $10bn in cash versus a 100GW power plant, a million GPUs, or a million AI agents—which is worth more? Many AI companies have already answered with their actions; they are fighting over compute, not gold. Energy, compute, robots, AI, knowledge, organizational ability, trust, attention—these are the underlying assets. Money is just the tool that keeps their accounts afterward.",
            "But there is a twist: if AI, robots, and energy all become nearly unlimited, the last truly scarce thing may circle back to people—not people as labor, but human experience, creation, trust, attention, and feeling. AI can copy almost everything, except actually living a life in your place."
          ],
          "zh": [
            "人类历史上，「财富的单位」一直在升级：粮食 → 黄金 → 货币 → 信用 → 数据 → 也许下一站是 AI。每升级一次，都是把财富的载体往「更接近生产能力本身」推一步。顺着看，未来的财富可能越来越等于一件事：你能控制多少未来的生产能力。",
            "换个方式感受：100 亿现金和一座 100GW 电厂、100 万块 GPU、100 万个 AI Agent 比，哪个更值钱？很多 AI 公司已经用行动回答——它们抢的是算力，不是黄金。能源、算力、机器人、AI、知识、组织能力、信任、注意力，这些才是底层资产，钱只是事后给它们记账的工具。",
            "但这里有个反转：如果未来 AI、机器人、能源都近乎无限，最后真正稀缺的，可能又回到「人」——不是当劳动力的人，而是人的体验、创造、信任、注意力和情感。因为 AI 几乎能复制一切，唯独没办法替你真正地活一辈子。"
          ]
        }
      },
      {
        "title": {
          "en": "A posture, not a prediction",
          "zh": "结尾：一种姿态，而不是预测"
        },
        "paragraphs": {
          "en": [
            "I am not going to hand over a clean verdict that future wealth will definitely be energy or compute. Two kinds of things live in this essay and should be kept apart: some are facts (how money is created, how debt circulates, population trends), and some are my extrapolation (that future wealth may lean toward energy, compute, or AI). Blending the two is exactly why so much \"future prediction\" fails to survive time.",
            "And what I care about was never \"will it blow up,\" but \"what new system will it become.\" Institutions rarely wait for a full collapse before changing; more often they adjust the rules bit by bit—through inflation, debt restructuring, taxes, welfare, and monetary policy—slowly redistributing the pressure. First principles is not a prediction machine. It is a posture: take something you thought you understood, break it down until it cannot be broken further, and ask what is left."
          ],
          "zh": [
            "我不打算给一个干脆的结论说未来财富一定是能源还是算力。文章里有两种东西要分清：有些是事实（货币怎么被造出来、债怎么转、人口趋势），有些是我的推演（未来财富可能更偏能源、算力或 AI）。把两者搅在一起，正是很多「预测未来」经不起时间检验的原因。",
            "而且我在意的从来不是「会不会爆」，而是「会变成什么样的新系统」。制度很少等到彻底崩了才改，它更常一点点调规则——靠通胀、债务重组、税制、福利、货币政策，把压力慢慢重新分出去。第一性原理不是预测机器，它是一种姿态：把你以为早就懂的东西拆到不能再拆，然后问一句——它还剩下什么。"
          ]
        }
      }
    ],
    "datePublished": "2026-07-27",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "turn-chaos-into-systems",
    "title": {
      "en": "Turn chaos into systems",
      "zh": "把混乱变成系统"
    },
    "summary": {
      "en": "The point of a system is not to look sophisticated. It is to make the same confusion unnecessary the second time.",
      "zh": "System 不是为了显得复杂。它真正的价值，是让同一种混乱不需要发生第二次。"
    },
    "category": {
      "en": "System thinking",
      "zh": "系统思考"
    },
    "thesis": {
      "en": "Automation is not the value. Removing repeated confusion is the value.",
      "zh": "Automation 不是价值。减少重复的混乱，才是价值。"
    },
    "sources": [
      "数字会说话",
      "营销管理",
      "商弈"
    ],
    "sections": [
      {
        "title": {
          "en": "The same fire should not need saving twice",
          "zh": "同样的火，不应该救第二次"
        },
        "paragraphs": {
          "en": [
            "I used to think capable people knew more, reacted faster, and could answer anything immediately. Building dashboards, products, and AI changed that view.",
            "Real capability is not endless firefighting. It is turning a repeated problem into a rule, a workflow, or a boundary so the same fire does not return."
          ],
          "zh": [
            "我以前会觉得，厉害的人就是知道很多、反应很快、什么问题都能马上回答。后来做 Dashboard、product 和 AI，我才发现，不是这样。",
            "真正厉害的不是一直救火。是把重复出现的问题变成规则、workflow 或 boundary，让同样的火不需要再救第二次。"
          ]
        }
      },
      {
        "title": {
          "en": "Separate input, judgment, and action",
          "zh": "先分开输入、判断与行动"
        },
        "paragraphs": {
          "en": [
            "Messy work usually mixes three things together: what enters the system, how it is judged, and what action should follow.",
            "A spreadsheet is not always messy because of Excel. Sometimes every person simply means something different when they use the same number. A team that keeps asking questions may not be weak; the system may never have explained what happened, why it matters, and what comes next."
          ],
          "zh": [
            "很多工作看起来很乱，其实只是三个东西没有被分开：输入是什么，中间用什么规则判断，最后要产生什么行动。",
            "Excel 很乱，不一定是 Excel 的问题。可能是每个人对同一个数字有不同定义。团队一直追问，也不一定是他们不会。可能是 system 从来没有告诉他们：发生了什么、为什么发生、下一步应该做什么。"
          ]
        }
      },
      {
        "title": {
          "en": "Where a system should appear",
          "zh": "System 应该出现在哪里"
        },
        "paragraphs": {
          "en": [
            "Look for work that repeats daily, judgment that depends on one person remembering, information nobody understands after its owner leaves, and mistakes that should only happen once.",
            "A good system keeps complexity inside and gives clarity to the person outside. It should let people spend less attention on unimportant repetition and more on the judgment that still needs a human."
          ],
          "zh": [
            "我现在会找四种地方：每天都在重复的动作、只能靠某个人记得的判断、人一离开就没人看得懂的资料，以及理论上不该发生第二次的错误。",
            "好的 system 会把复杂留在里面，把清楚交给外面的人。它让人少想一点不重要的重复，把注意力留给真正需要判断的地方。"
          ]
        }
      }
    ],
    "datePublished": "2026-07-21",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "judgment-is-not-more-information",
    "title": {
      "en": "Judgment is not knowing more",
      "zh": "判断不是知道更多"
    },
    "summary": {
      "en": "More data does not automatically produce a better decision. Often the missing piece is deciding what matters.",
      "zh": "更多 data 不会自动带来更好的决定。很多时候缺的不是资料，而是先决定什么才重要。"
    },
    "category": {
      "en": "Data & judgment",
      "zh": "数据与判断"
    },
    "thesis": {
      "en": "Information tells you what happened. Judgment decides what you are willing to trade next.",
      "zh": "Information 告诉你发生了什么。Judgment 决定你接下来愿意牺牲什么。"
    },
    "sources": [
      "数字会说话",
      "薛兆丰的经济学讲义",
      "营销管理"
    ],
    "sections": [
      {
        "title": {
          "en": "The “so what?” problem",
          "zh": "那个 So what 的问题"
        },
        "paragraphs": {
          "en": [
            "Data creates an easy illusion: one more chart, one more metric, and the answer will appear. But a dashboard can hold a hundred numbers and still leave the user asking, “So what?”",
            "Numbers show that something moved. Judgment places that movement inside context. A sales drop might come from traffic, conversion, stock, seasonality, or an unusually strong previous month."
          ],
          "zh": [
            "Data 很容易让人产生一种错觉：只要再多看一点，就会更接近答案。但 dashboard 可以放一百个数字，用户最后还是会问：So what？",
            "数字只能告诉你某个东西发生了变化。真正的判断，是把这个变化放进 context。Sales 掉了，可能是流量、conversion、库存、淡季，甚至只是上个月刚好太好。"
          ]
        }
      },
      {
        "title": {
          "en": "Four questions behind a number",
          "zh": "一个数字后面的四个问题"
        },
        "paragraphs": {
          "en": [
            "Ask what it is compared with, why it changed, who is affected, and whether it deserves action now.",
            "Good analysis does not deliver the most information. It shortens the distance between seeing and deciding."
          ],
          "zh": [
            "看到一个数字，至少要问四件事：跟谁比、为什么变、影响谁，以及现在值得行动还是继续观察。",
            "好的分析不是给最多 information。它是帮人缩短从「看到」到「决定」之间的距离。"
          ]
        }
      },
      {
        "title": {
          "en": "A small decision format",
          "zh": "一个很小的判断格式"
        },
        "paragraphs": {
          "en": [
            "Write four lines: Signal — what changed? Context — why does it matter? Trade-off — what will action cost? Next move — what is the smallest safe step?",
            "If those four lines are impossible to write, more data may not be the answer. The problem itself may still be unclear."
          ],
          "zh": [
            "我会先写四句话：Signal，什么变了？Context，为什么值得注意？Trade-off，行动会牺牲什么？Next move，现在最小、最安全的下一步是什么？",
            "如果四句话写不出来，可能还不需要更多 data。可能只是问题本身还没想清楚。"
          ]
        }
      }
    ],
    "datePublished": "2026-07-21",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "human-nature-is-a-design-condition",
    "title": {
      "en": "Human nature is a design condition",
      "zh": "人性不是借口，是设计条件"
    },
    "summary": {
      "en": "People forget, protect themselves, and take easier paths. Good systems are designed for those realities, not ideal users.",
      "zh": "人会忘记、保护自己，也会走比较容易的路。好的 system 应该设计在这些现实上。"
    },
    "category": {
      "en": "Human systems",
      "zh": "人与系统"
    },
    "thesis": {
      "en": "Do not design a system that only ideal people can use correctly.",
      "zh": "不要设计一个只有理想中的人才会用对的 system。"
    },
    "sources": [
      "人性的弱点",
      "商弈",
      "七个习惯"
    ],
    "sections": [
      {
        "title": {
          "en": "Blaming people is not a design",
          "zh": "怪人，不是一种设计"
        },
        "paragraphs": {
          "en": [
            "Management language often sounds like this: the employee is not proactive, the user has no patience, the team cannot execute. These statements may be true, but they do not solve anything.",
            "When the same failure repeats, blaming the person is often a way to avoid designing the system."
          ],
          "zh": [
            "做 management 的时候，我们很喜欢说：这个人不够主动、那个用户没有耐心、这个团队执行力不行。可能都是真的，但没有什么用。",
            "如果一个问题会不断重复，单纯怪人，通常只是在逃避 system design。"
          ]
        }
      },
      {
        "title": {
          "en": "Design for real behavior",
          "zh": "设计在真实行为上"
        },
        "paragraphs": {
          "en": [
            "People forget, protect their status, follow the easier path, and copy others under uncertainty. These are not bugs. They are operating conditions.",
            "An unclear button produces random clicks. Unclear ownership makes teams wait. Rewards based only on outcomes make people beautify numbers. Punishing every mistake teaches people to hide problems."
          ],
          "zh": [
            "人会懒、会忘记、会保护自己、会选择比较容易的路，也会在不确定的时候跟着别人走。这些不是 bug，而是 operating condition。",
            "按钮不清楚，用户就会乱点。责任不清楚，团队就会互相等。奖励只看结果，人就会把数字做漂亮。犯错只会被骂，人就会开始隐藏问题。"
          ]
        }
      },
      {
        "title": {
          "en": "Four questions about behavior",
          "zh": "关于行为的四个问题"
        },
        "paragraphs": {
          "en": [
            "What immediate benefit does the action give? What does the person fear losing? Which path is easiest? When something fails, does the system help correction or encourage concealment?",
            "Understanding human nature is not permission to manipulate. It is a way to make fewer assumptions, blame less, and build something people can actually use."
          ],
          "zh": [
            "我会问：这个动作对他有什么好处？他最怕失去什么？最容易走的路是哪一条？出错时，system 会帮助修正，还是鼓励隐藏？",
            "理解人性，不是为了 manipulate people。是为了少一点假设，少一点责怪，多一点真的可以用的设计。"
          ]
        }
      }
    ],
    "datePublished": "2026-07-21",
    "dateModified": "2026-08-14"
  },
  {
    "slug": "win-before-you-fight",
    "title": {
      "en": "Win before you fight",
      "zh": "先胜后战"
    },
    "summary": {
      "en": "Strategy is not about pushing harder. It is deciding which battlefield deserves your effort before you enter it.",
      "zh": "Strategy 不是教你怎样更用力，而是在进去之前先决定，哪个 battlefield 值得你用力。"
    },
    "category": {
      "en": "Strategy",
      "zh": "策略"
    },
    "thesis": {
      "en": "Strategy does not teach you to push harder. It teaches you where effort is not worth spending.",
      "zh": "Strategy 不是教你怎样更用力。是教你哪里不值得用力。"
    },
    "sources": [
      "孙子兵法",
      "厚黑学",
      "不完美人生经验法则"
    ],
    "sections": [
      {
        "title": {
          "en": "Moving fast into a bad game",
          "zh": "很快地走进一个烂局"
        },
        "paragraphs": {
          "en": [
            "Action is often confused with speed. I used to think the same way. Later I learned that some speed only gets you into a bad game faster.",
            "Effective action is not a hard fight every time. Avoid starting when you are weakest, the other side is strongest, and the rules already work against you."
          ],
          "zh": [
            "很多人把行动力理解成：想到就做，越快越好。我以前也会这样。后来才发现，有些快只是很快地走进一个烂局。",
            "真正有效的行动，不是每一次都 hard fight。是尽量不要在自己最弱、对方最强、规则又不利的时候开战。"
          ]
        }
      },
      {
        "title": {
          "en": "Define the win condition first",
          "zh": "先定义什么叫赢"
        },
        "paragraphs": {
          "en": [
            "Before acting, ask what winning means, who set the battlefield rules, what resources each side controls, whether another entry exists, and how you leave if the worst case happens.",
            "Proving yourself, defeating someone, and getting the result are three different goals. They may look similar, but they demand very different moves."
          ],
          "zh": [
            "行动之前，先问：我真正要赢的是什么？规则是谁定的？双方有什么筹码？正面打不过有没有别的入口？最坏情况发生时怎么退？",
            "想证明自己、想赢过某个人、想拿到结果，是三个不同目标。看起来很像，却会导向完全不同的动作。"
          ]
        }
      },
      {
        "title": {
          "en": "Six moves, not two",
          "zh": "不是只有打与不打"
        },
        "paragraphs": {
          "en": [
            "A situation offers at least six moves: fight directly, go around, delay, retreat, change the field, or form an alliance.",
            "The highest-risk mistake is fighting a battle with no upside just to prove courage. Maturity is not winning every fight. It is knowing which fight deserves to become yours."
          ],
          "zh": [
            "一个局至少有六种动作：正打、绕打、拖、退、换场、结盟。不是只有「打」和「不打」。",
            "最危险的动作，是为了证明自己勇敢，在一个没有 upside 的地方硬碰。成熟不是每一场都赢，而是越来越清楚，哪一场值得成为自己的战争。"
          ]
        }
      }
    ],
    "datePublished": "2026-07-21",
    "dateModified": "2026-08-14"
  }
];
