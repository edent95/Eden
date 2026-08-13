---
id: rag-flow
type: wiki
route: /wiki/rag-flow
order: 6
status: published
---

# Tag Registry and RAG flow

中文标题：Tag Registry 与 RAG flow

The JSON block below is the structured bilingual source consumed by the site compiler.

```json
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
  ]
}
```
