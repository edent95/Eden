---
id: penneys-game-probability-intuition
type: essay
route: /notes/penneys-game-probability-intuition
order: 13
published: 2026-10-26
updated: 2026-10-26
status: published
---

# Penney's game: why the second player wins

中文标题：Penney's game：为什么后手稳赢

The JSON block below is the structured bilingual source consumed by the site compiler.

```json
{
  "slug": "penneys-game-probability-intuition",
  "cover": "coin-spin",
  "title": {
    "en": "Penney's game: why the second player wins",
    "zh": "Penney's game：为什么后手稳赢"
  },
  "summary": {
    "en": "Every run of three coin flips is equally likely, yet in Penney's game the player who chooses second can always pick a sequence that tends to appear first, winning at least two times in three. Here is the reply rule, the full table checked by exact calculation, and Conway's trick for computing any match-up.",
    "zh": "三次抛硬币的每一种结果机会都一样，可是在 Penney's game 里，后选的人永远能挑到一个比较早出现的序列，至少三次赢两次。这里有后手的应对法则、逐行精确核算过的整张表，以及 Conway 算任何一局胜率的方法。"
  },
  "category": {
    "en": "Probability",
    "zh": "概率"
  },
  "thesis": {
    "en": "Equally likely is not the same as equally early. In a race between patterns, what matters is how each pattern overlaps the other.",
    "zh": "机会一样，不等于来得一样早。序列赛跑时，决定胜负的是两个序列怎么互相重叠。"
  },
  "sources": [
    "Walter Penney, Journal of Recreational Mathematics (October 1969)",
    "L. J. Guibas and A. M. Odlyzko, String overlaps, pattern matching, and nontransitive games (1981)",
    "Elwyn Berlekamp, John Conway and Richard Guy, Winning Ways for your Mathematical Plays",
    "Martin Gardner, Time Travel and Other Mathematical Bewilderments (1988)"
  ],
  "references": [
    {
      "id": "1",
      "url": "https://en.wikipedia.org/wiki/Penney%27s_game",
      "label": {
        "en": "Penney's game (Wikipedia): Walter Penney's 1969 game, the reply rule for three-flip sequences, the odds table, and Guibas and Odlyzko's result for longer sequences.",
        "zh": "Penney's game（维基百科）：Walter Penney 1969 年提出的游戏、三次序列的后手法则、胜率表，以及 Guibas 与 Odlyzko 对更长序列的结果。"
      }
    },
    {
      "id": "2",
      "url": "https://eden-tan.com/penneys-game",
      "label": {
        "en": "Eden Tan — Penney's Game: play the levels, then use the lab to compute any match-up exactly with Conway's leading numbers.",
        "zh": "Eden Tan — Penney's Game：先闯关，再用实验室以 Conway 的 leading numbers 精确算出任何一局的胜率。"
      }
    }
  ],
  "storyboard": [
    {
      "motif": "phyllotaxis",
      "kind": "idea",
      "beat": {
        "en": "Any three flips in a row come out HHH one time in eight, and THH one time in eight. The race is not about how often a pattern happens, but which one shows up first.",
        "zh": "连续三次抛硬币，出现 HHH 的机会是八分之一，THH 也是八分之一。赛跑比的不是谁出现得多，而是谁先出现。"
      }
    },
    {
      "motif": "spiral",
      "kind": "method",
      "beat": {
        "en": "Take the first player's first two flips, and put the opposite of their middle flip in front. HHT becomes THH; HTH becomes HHT.",
        "zh": "拿先手序列的前两个，在前面补上先手中间那个的相反面。HHT 变成 THH，HTH 变成 HHT。"
      }
    },
    {
      "motif": "mandelbrot",
      "kind": "fact",
      "beat": {
        "en": "Run the rule on all eight choices and the second player wins with 7/8, 3/4 or 2/3. Never less than two times in three.",
        "zh": "把法则套在八种选择上，后手的胜率是 7/8、3/4 或 2/3。永远不低于三次赢两次。"
      }
    },
    {
      "motif": "penrose",
      "kind": "principle",
      "beat": {
        "en": "THH beats HHT, HHT beats HTT, HTT beats TTH, and TTH beats THH. Like rock, paper, scissors, there is no best sequence, only a best reply.",
        "zh": "THH 赢 HHT，HHT 赢 HTT，HTT 赢 TTH，TTH 又赢回 THH。像剪刀石头布一样，没有最强的序列，只有最好的回应。"
      }
    },
    {
      "motif": "catenoid",
      "kind": "method",
      "beat": {
        "en": "Conway turned the odds into arithmetic: compare how each sequence overlaps itself and the other, write each overlap as a binary number, subtract.",
        "zh": "Conway 把胜率变成算术：比较每个序列和自己、和对方怎么重叠，把每种重叠写成一个二进制数，再相减。"
      }
    },
    {
      "motif": "lissajous",
      "kind": "warning",
      "beat": {
        "en": "The edge needs sequences of three or more and a fair coin. With two flips, or a coin that lands heads four times in five, the second player's sure thing disappears.",
        "zh": "这个优势要求序列至少三个、硬币公平。只有两个，或者硬币五次有四次正面，后手的必胜就消失了。"
      }
    }
  ],
  "sections": [
    {
      "title": {
        "en": "Equally likely, not equally early",
        "zh": "机会一样，不等于来得一样早"
      },
      "paragraphs": {
        "en": [
          "Flip a fair coin three times and every outcome, HHH or HTH or THH, has the same chance: one in eight. If two people each bet on a pattern for one block of three flips, nobody has an edge.",
          "Penney's game, introduced by Walter Penney in 1969,[[1]] changes one thing. Each player picks a three-flip pattern, then the coin is flipped again and again, and whoever's pattern appears first in the running stream wins. ==Once the patterns race in one continuous stream, equal chances stop meaning equal speed, and the player who chooses second can always use that.=="
        ],
        "zh": [
          "公平的硬币抛三次，每一种结果，HHH 也好、HTH 也好、THH 也好，机会都一样：八分之一。如果两个人各押一个序列、只比一组三次，谁都没有优势。",
          "Walter Penney 在 1969 年提出的这个游戏，[[1]] 只改了一件事：两人各挑一个三次的序列，然后一直抛下去，谁的序列先在这一长串结果里出现，谁就赢。==一旦序列是在同一串结果里赛跑，机会一样就不再等于速度一样，而后选的人永远可以利用这一点。=="
        ]
      }
    },
    {
      "title": {
        "en": "The reply rule",
        "zh": "后手的应对法则"
      },
      "paragraphs": {
        "en": [
          "The second player sees the first player's pattern before choosing. Call the first player's flips one, two, three. The reply is: the opposite of flip two, followed by flips one and two.",
          "==In short: copy the first player's first two flips and put the opposite of their middle flip in front.== Against HHT you play THH; against HTH you play HHT; against TTT you play HTT. A common mistake is to flip the first symbol instead of the middle one. That gives THT against HHT, which wins only 3/8 of the time, worse than a coin toss."
        ],
        "zh": [
          "后手是看过先手的序列之后才选。把先手的三次叫做第一、第二、第三个。后手的回应是：第二个的相反面，接着第一个和第二个。",
          "==简单说：抄先手的前两个，在前面补上先手中间那个的相反面。==先手 HHT，你就选 THH；先手 HTH，你就选 HHT；先手 TTT，你就选 HTT。常见的错误是把第一个反过来，而不是中间那个：那样对 HHT 会选出 THT，胜率只有 3/8，比猜硬币还差。"
        ]
      }
    },
    {
      "title": {
        "en": "The whole table, checked",
        "zh": "整张表，逐行核过"
      },
      "paragraphs": {
        "en": [
          "Here are all eight match-ups, with the second player's chance of winning. Against HHH, THH wins 7/8. Against HHT, THH wins 3/4. Against HTH, HHT wins 2/3. Against HTT, HHT wins 2/3. Against THH, TTH wins 2/3. Against THT, TTH wins 2/3. Against TTH, HTT wins 3/4. Against TTT, HTT wins 7/8. Each of these was computed exactly, and in every case the reply given by the rule is also the best possible reply.",
          "The extreme case is the easiest to see. HHH can only win if the very first three flips are HHH, which happens one time in eight. If a tail appears anywhere before that, then the first run of three heads must come right after a tail, and that tail plus two heads is THH, already finished. ==So the second player is never worse than two wins in three, and against HHH or TTT it is seven in eight.=="
        ],
        "zh": [
          "八种对局全部列出来，数字是后手的胜率。先手 HHH，后手 THH 赢 7/8；先手 HHT，THH 赢 3/4；先手 HTH，HHT 赢 2/3；先手 HTT，HHT 赢 2/3；先手 THH，TTH 赢 2/3；先手 THT，TTH 赢 2/3；先手 TTH，HTT 赢 3/4；先手 TTT，HTT 赢 7/8。每一行都是精确算出来的，而且每一行里，法则给出的回应也正好是所有选择里最好的那一个。",
          "最极端的那一行最好懂。HHH 只有在头三次刚好是 HHH 时才会赢，机会是八分之一。只要在那之前出现过一次反面，第一次出现的三连正面前面一定紧贴着一个反面，那个反面加上两个正面就是 THH，已经先完成了。==所以后手最差也有三次赢两次，碰上 HHH 或 TTT 更是八次赢七次。=="
        ]
      }
    },
    {
      "title": {
        "en": "No best sequence, only a best reply",
        "zh": "没有最强的序列，只有最好的回应"
      },
      "paragraphs": {
        "en": [
          "Part of the intuition comes from waiting times. On average you wait 14 flips to see HHH, 10 to see HTH, and 8 to see THH. A pattern that overlaps itself, like HHH, tends to arrive in clumps, so its first appearance comes late.",
          "But waiting time cannot be the whole story, because the wins go in a circle. THH beats HHT 3/4 of the time, HHT beats HTT 2/3, HTT beats TTH 3/4, and TTH beats THH 2/3. ==The relation is non-transitive, like rock, paper, scissors: there is no strongest sequence to pick first, only a best answer to whatever was picked.=="
        ],
        "zh": [
          "一部分直觉来自等待时间。平均要抛 14 次才看到 HHH，10 次看到 HTH，8 次看到 THH。像 HHH 这种和自己重叠的序列，出现时往往扎堆，所以第一次出现会比较晚。",
          "可是等待时间解释不了全部，因为胜负会绕成一个圈。THH 以 3/4 赢 HHT，HHT 以 2/3 赢 HTT，HTT 以 3/4 赢 TTH，TTH 又以 2/3 赢回 THH。==这种关系没有传递性，就像剪刀石头布：先选的人没有最强的序列可挑，只有针对对方的最好回应。=="
        ]
      }
    },
    {
      "title": {
        "en": "Conway's leading numbers",
        "zh": "Conway 的 leading numbers"
      },
      "paragraphs": {
        "en": [
          "John Conway found a way to compute any match-up by hand, described in Winning Ways and in Martin Gardner's writing. For two patterns A and B, write a correlation A:B. Slide B under A: at each position of A, ask whether the rest of A, from that position to the end, matches the start of B. Write 1 for yes and 0 for no, and read the digits as a binary number.",
          "==The odds that B appears before A are (A:A minus A:B) to (B:B minus B:A).== For A as HHH and B as THH: A:A is 111, or 7; A:B is 000, or 0; B:B is 100, or 4; B:A is 011, or 3. The odds are 7 to 1, which is 7/8, matching the table. The lab on the Penney's Game page does this for any pair you choose.[[2]]"
        ],
        "zh": [
          "John Conway 找到一种可以手算任何一局的方法，收在 Winning Ways 里，也出现在 Martin Gardner 的文章中。对两个序列 A 和 B，定义一个相关数 A:B：把 B 垫在 A 下面一格一格挪，在 A 的每一个位置问一次：A 从这里到结尾的部分，是不是正好等于 B 的开头？是就写 1，不是就写 0，再把这串数字当成二进制数来读。",
          "==B 比 A 先出现的赔率，是（A:A 减 A:B）比（B:B 减 B:A）。==以 A 为 HHH、B 为 THH：A:A 是 111，也就是 7；A:B 是 000，也就是 0；B:B 是 100，也就是 4；B:A 是 011，也就是 3。赔率是 7 比 1，也就是 7/8，和表上一样。Penney's Game 那一页的实验室，可以替你算任何一对序列。[[2]]"
        ]
      }
    },
    {
      "title": {
        "en": "Where the edge stops",
        "zh": "优势在哪里消失"
      },
      "paragraphs": {
        "en": [
          "The edge has limits, and they are worth knowing. For patterns of length three or more, Guibas and Odlyzko proved in 1981 that the second player always has a winning reply, built from the first player's first symbols with one symbol added in front.[[1]] For length two it fails: against HT or TH, the best reply only ties at one half.",
          "It also depends on a fair coin. ==If the coin lands heads four times in five, THH beats HHH only 61 times in 125, under one half, so the first player's HHH becomes the favourite.== The lesson travels beyond coins: when events race in a stream, ask how the patterns overlap, and ask whether the process is really as fair as you assumed."
        ],
        "zh": [
          "这个优势有边界，值得知道。序列长度是三或以上时，Guibas 和 Odlyzko 在 1981 年证明了后手永远有一个会赢的回应，做法是拿先手开头的几个符号，在前面补上一个。[[1]] 长度只有二的时候就不成立：先手选 HT 或 TH，后手最好也只能打平，各一半。",
          "它也要求硬币公平。==如果硬币五次有四次正面，THH 对 HHH 只剩 125 次赢 61 次，不到一半，先手的 HHH 反而成了热门。==这个教训不只适用于硬币：事件在一串过程里赛跑时，先问这些模式怎么重叠，也要问这个过程是不是真的像你以为的那么公平。"
        ]
      }
    }
  ]
}
```
