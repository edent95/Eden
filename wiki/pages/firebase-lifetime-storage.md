---
id: firebase-lifetime-storage
type: wiki
route: /wiki/firebase-lifetime-storage
order: 4
status: published
---

# Firebase lifetime storage as table memory

中文标题：Firebase lifetime storage 是牌桌记忆

The JSON block below is the structured bilingual source consumed by the site compiler.

```json
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
  ]
}
```
