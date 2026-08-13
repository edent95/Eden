---
id: button-feedback
type: wiki
route: /wiki/button-feedback
order: 3
status: published
---

# Click button feedback is part of trust

中文标题：Click button feedback 是信任的一部分

The JSON block below is the structured bilingual source consumed by the site compiler.

```json
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
  ]
}
```
