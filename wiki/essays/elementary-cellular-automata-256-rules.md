---
id: elementary-cellular-automata-256-rules
type: essay
route: /notes/elementary-cellular-automata-256-rules
order: 11
published: 2026-10-12
updated: 2026-10-12
status: published
---

# 256 rules, one byte each

中文标题：256 条规则，每条一个 byte

The JSON block below is the structured bilingual source consumed by the site compiler.

```json
{
  "slug": "elementary-cellular-automata-256-rules",
  "cover": "gears",
  "title": {
    "en": "256 rules, one byte each",
    "zh": "256 条规则，每条一个 byte"
  },
  "summary": {
    "en": "Elementary cellular automata look like a toy: a row of black and white cells and a lookup table. Read one rule number bit by bit and you see why such small rules can be boring, periodic, chaotic or even universal.",
    "zh": "Elementary cellular automata 看起来像玩具：一排黑白格子加一张查表。把一个 rule number 逐位读懂，就会明白为什么这么小的规则，可以无聊、可以周期、可以混沌，甚至可以通用计算。"
  },
  "category": {
    "en": "Systems",
    "zh": "系统"
  },
  "thesis": {
    "en": "A rule is not its description. The same eight-bit table can stay silent forever or compute anything; you only find out by running it.",
    "zh": "规则不等于它的描述。同样是八个 bit 的查表，可以永远安静，也可以计算任何东西；只有跑起来才知道。"
  },
  "sources": [
    "Stephen Wolfram, Statistical Mechanics of Cellular Automata (1983)",
    "Matthew Cook, Universality in Elementary Cellular Automata (2004)",
    "Eden Tan, Conway's Game of Life and the Cellular Automata Lab"
  ],
  "references": [
    {
      "id": "1",
      "url": "https://en.wikipedia.org/wiki/Elementary_cellular_automaton",
      "label": {
        "en": "Elementary cellular automaton (Wikipedia): the 8 neighbourhood patterns, the Wolfram code numbering 0–255, and the 88 rules left after mirror and complement symmetry.",
        "zh": "Elementary cellular automaton（维基百科）：8 种邻域、0–255 的 Wolfram code 编号，以及镜像与黑白互换之后剩下的 88 条不等价规则。"
      }
    },
    {
      "id": "2",
      "url": "https://en.wikipedia.org/wiki/Rule_30",
      "label": {
        "en": "Rule 30 (Wikipedia): binary 00011110, chaotic growth from a single cell, and its centre column used as a pseudo-random generator.",
        "zh": "Rule 30（维基百科）：二进制 00011110，从单个细胞长出混沌图案，中间那一列被拿来当伪随机数。"
      }
    },
    {
      "id": "3",
      "url": "https://en.wikipedia.org/wiki/Rule_110",
      "label": {
        "en": "Rule 110 (Wikipedia): binary 01101110, localized structures that collide, and Matthew Cook's proof (published 2004) that it is Turing complete.",
        "zh": "Rule 110（维基百科）：二进制 01101110，会互相碰撞的局部结构，以及 Matthew Cook 证明它图灵完备（2004 年发表）。"
      }
    },
    {
      "id": "4",
      "url": "https://eden-tan.com/conways-game-of-life",
      "label": {
        "en": "Eden Tan — Conway's Game of Life: a playable B3/S23 board, then the walk from 8 neighbourhoods to 256 rules and the I Ching bridge.",
        "zh": "Eden Tan — Conway's Game of Life：可以玩的 B3/S23 棋盘，再从 8 种邻域走到 256 条规则与《易经》的桥梁。"
      }
    },
    {
      "id": "5",
      "url": "https://eden-tan.com/cellular-automata-lab",
      "label": {
        "en": "Eden Tan — Cellular Automata Lab: type any rule number and watch it run.",
        "zh": "Eden Tan — 元胞自动机实验室：输入任何 rule number，看它跑起来。"
      }
    }
  ],
  "storyboard": [
    {
      "motif": "phyllotaxis",
      "kind": "method",
      "beat": {
        "en": "Each cell looks at itself and its two neighbours: three bits, eight possible patterns. A rule only has to say black or white for each of the eight, so a whole world fits in one byte.",
        "zh": "每个细胞只看自己和左右两个邻居：三个 bit，八种可能。规则只要对这八种各说一句黑或白，一个世界就装进一个 byte。"
      }
    },
    {
      "motif": "spiral",
      "kind": "example",
      "beat": {
        "en": "Write the eight answers in a fixed order and read them as a binary number. 00011110 is 30, and that is literally what Rule 30 means.",
        "zh": "把八个答案按固定顺序写下，当成二进制数来读。00011110 就是 30，Rule 30 的名字就是这么来的。"
      }
    },
    {
      "motif": "mandelbrot",
      "kind": "fact",
      "beat": {
        "en": "Run them from a single black cell and they split into families: some die out, some repeat, Rule 90 draws a Sierpinski triangle, Rule 30 looks random, Rule 110 grows structures that collide.",
        "zh": "从一个黑格开始跑，它们分成几种家族：有的死掉，有的重复，Rule 90 画出 Sierpinski 三角，Rule 30 看起来随机，Rule 110 长出会互相碰撞的结构。"
      }
    },
    {
      "motif": "penrose",
      "kind": "principle",
      "beat": {
        "en": "Flip left and right, or swap black and white, and many rules turn out to be the same rule in disguise. 256 shrinks to 88 genuinely different ones.",
        "zh": "左右翻转、黑白互换，很多规则其实是同一条规则换了衣服。256 条缩成 88 条真正不同的规则。"
      }
    },
    {
      "motif": "lissajous",
      "kind": "action",
      "beat": {
        "en": "You cannot read the future from the table. Type a number into the lab, run it, and let the picture tell you what kind of rule it is.",
        "zh": "从查表里读不出未来。把一个数字输进实验室，跑起来，让图案告诉你这是哪一种规则。"
      }
    }
  ],
  "sections": [
    {
      "title": {
        "en": "Eight neighbourhoods, one byte",
        "zh": "八种邻域，一个 byte"
      },
      "paragraphs": {
        "en": [
          "Take a row of cells, each black or white. To get the next row, every cell looks at three cells above it: its left neighbour, itself and its right neighbour. Three cells with two states each give 2 × 2 × 2 = 8 possible patterns, from 111 down to 000.",
          "A rule is nothing more than an answer for each of those eight patterns: black or white, which makes 2⁸ = 256 possible rules. ==Eight yes-or-no answers is exactly one byte, so every rule fits in a single number from 0 to 255.==[[1]]"
        ],
        "zh": [
          "拿一排格子，每格不是黑就是白。下一排怎么来？每个格子看上一排的三个格：左邻、自己、右邻。三个格、每格两种状态，一共 2 × 2 × 2 = 8 种组合，从 111 一路到 000。",
          "一条规则，就只是对这八种组合各给一个答案：黑或白，所以一共只有 2⁸ = 256 条规则。==八个是非题刚好是一个 byte，每一条规则都能写成 0 到 255 之间的一个数字。==[[1]]"
        ]
      }
    },
    {
      "title": {
        "en": "How to read a rule number",
        "zh": "怎么读一个 rule number"
      },
      "paragraphs": {
        "en": [
          "Wolfram's convention lists the eight neighbourhoods in descending order, 111, 110, 101, 100, 011, 010, 001, 000, and writes the new cell under each. For Rule 30 the answers are 0, 0, 0, 1, 1, 1, 1, 0.",
          "==Read those eight answers as a binary number, 00011110, and you get 30: the name of the rule is its own lookup table.==[[2]] The same trick works backwards. Rule 204 is 11001100, which copies the middle cell and changes nothing; Rule 0 turns everything white in one step."
        ],
        "zh": [
          "Wolfram 的写法是把八种邻域从大到小排开：111、110、101、100、011、010、001、000，再在每一种下面写出新格子的颜色。Rule 30 的答案是 0、0、0、1、1、1、1、0。",
          "==把这八个答案当成二进制数 00011110 来读，就是 30：规则的名字，就是它自己的查表。==[[2]] 反过来也一样。Rule 204 是 11001100，永远照抄中间那格，什么都不变；Rule 0 一步就把所有格子变白。"
        ]
      }
    },
    {
      "title": {
        "en": "Same size, very different worlds",
        "zh": "同样大小，完全不同的世界"
      },
      "paragraphs": {
        "en": [
          "Start each rule from a single black cell and the 256 tables stop looking alike. Many die out or freeze. Some settle into stripes that repeat. Rule 90, which sets each cell to its left neighbour XOR its right neighbour, draws a perfect Sierpinski triangle.",
          "Rule 30 grows a pattern whose right side never seems to settle; its centre column is irregular enough to have been used as a random-number generator. ==Rule 110 grows localized structures that travel and collide, and Matthew Cook proved those collisions can carry out any computation.==[[3]] Wolfram grouped the behaviours into four classes: uniform, periodic, chaotic and complex."
        ],
        "zh": [
          "让每条规则都从一个黑格开始跑，这 256 张表就不再长得一样。很多规则很快死掉或冻住。有的变成一直重复的条纹。Rule 90 让每个格子等于左邻 XOR 右邻，画出来是一个完整的 Sierpinski 三角。",
          "Rule 30 长出来的图案，右半边好像永远不会安定；它中间那一列不规则到被拿来当随机数用。==Rule 110 会长出会移动、会碰撞的局部结构，而 Matthew Cook 证明了这些碰撞可以完成任何计算。==[[3]] Wolfram 把这些行为分成四类：均匀、周期、混沌、复杂。"
        ]
      }
    },
    {
      "title": {
        "en": "256 is really 88",
        "zh": "256 其实是 88"
      },
      "paragraphs": {
        "en": [
          "Mirror a rule left to right and you get a rule that behaves the same, just facing the other way. Swap every black for white and you get the same behaviour in negative. Rule 30, for example, mirrors into Rule 86.",
          "==Once mirror images and colour swaps are counted as one, the 256 rules collapse into 88 genuinely different ones.==[[1]] The number of names was never the number of ideas; most of the list is the same idea seen from another side."
        ],
        "zh": [
          "把一条规则左右镜像，得到的规则行为一样，只是方向反过来。把黑白全部互换，得到的是同一种行为的负片。比如 Rule 30 镜像过来就是 Rule 86。",
          "==把镜像和黑白互换都算成同一条之后，256 条规则只剩 88 条真正不同的。==[[1]] 名字的数量从来不等于想法的数量；清单里大部分，是同一个想法换个角度看。"
        ]
      }
    },
    {
      "title": {
        "en": "Run it to know it",
        "zh": "跑起来才知道"
      },
      "paragraphs": {
        "en": [
          "What stays with me is the gap between how small the rule is and how hard it is to predict. You can hold Rule 30 or Rule 110 in your head, yet in general there is no shortcut that tells you what row one million looks like without computing the rows before it.",
          "==The fastest way to understand a rule is not to stare at its table but to run it.== The Cellular Automata Lab lets you type any number from 0 to 255 and watch it unfold,[[5]] and the Conway's Game of Life page takes the same idea into two dimensions.[[4]]"
        ],
        "zh": [
          "最让我在意的，是规则之小和它难以预测之间的落差。Rule 30、Rule 110 都能完整记在脑子里，可是一般来说，没有捷径能让你不算前面每一行，就知道第一百万行长什么样。",
          "==理解一条规则最快的方法，不是盯着它的查表，而是把它跑起来。==在元胞自动机实验室输入 0 到 255 之间任何一个数字，就能看它展开，[[5]] 而 Conway's Game of Life 那一页把同一个想法带到二维。[[4]]"
        ]
      }
    }
  ]
}
```
