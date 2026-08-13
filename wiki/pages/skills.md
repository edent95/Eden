---
id: skills
type: wiki
route: /wiki/skills
order: 5
status: published
---

# Reusable skills across projects

中文标题：跨项目可复用 skills

The JSON block below is the structured bilingual source consumed by the site compiler.

```json
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
  ]
}
```
