---
id: conway-game-of-life-patterns-explained
type: essay
route: /notes/conway-game-of-life-patterns-explained
order: 14
published: 2026-10-26
updated: 2026-10-26
status: published
---

# Still, pulsing, moving: the three species of Life

中文标题：不动、脉动、移动：Life 里的三种生物

The JSON block below is the structured bilingual source consumed by the site compiler.

```json
{
  "slug": "conway-game-of-life-patterns-explained",
  "cover": "lens",
  "title": {
    "en": "Still, pulsing, moving: the three species of Life",
    "zh": "不动、脉动、移动：Life 里的三种生物"
  },
  "summary": {
    "en": "Conway's Game of Life has four rules and no plan, yet it fills up with recognisable creatures. Still lifes never change, oscillators repeat, spaceships travel. Learn the three species and a chaotic board becomes readable.",
    "zh": "Conway's Game of Life 只有四条规则，没有任何设计，却会长出一眼认得出的生物。静物永远不变，振荡子会重复，飞船会移动。认得这三种，一张乱糟糟的棋盘就读得懂了。"
  },
  "category": {
    "en": "Systems",
    "zh": "系统"
  },
  "thesis": {
    "en": "You do not read a Life board cell by cell. You read it by species: what stays, what repeats, and what moves.",
    "zh": "Life 的棋盘不是一格一格读的，是按物种读的：什么不动、什么重复、什么在移动。"
  },
  "sources": [
    "Martin Gardner, Mathematical Games, Scientific American (October 1970)",
    "Elwyn Berlekamp, John Conway and Richard Guy, Winning Ways for your Mathematical Plays (1982)",
    "Eden Tan, Conway's Game of Life and the Cellular Automata Lab"
  ],
  "references": [
    {
      "id": "1",
      "url": "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life",
      "label": {
        "en": "Conway's Game of Life (Wikipedia): devised by John Conway in 1970 and published in Martin Gardner's October 1970 column; the four rules, still lifes, oscillators, the Gosper glider gun and Turing completeness.",
        "zh": "Conway's Game of Life（维基百科）：John Conway 1970 年设计，同年 10 月刊登在 Martin Gardner 的专栏；四条规则、静物、振荡子、Gosper glider gun 与图灵完备。"
      }
    },
    {
      "id": "2",
      "url": "https://eden-tan.com/conways-game-of-life",
      "label": {
        "en": "Eden Tan — Conway's Game of Life: a playable B3/S23 board to try every pattern in this note.",
        "zh": "Eden Tan — Conway's Game of Life：可以玩的 B3/S23 棋盘，本文每个图案都能自己摆上去试。"
      }
    }
  ],
  "storyboard": [
    {
      "motif": "phyllotaxis",
      "kind": "method",
      "beat": {
        "en": "Each cell counts its eight neighbours. Three brings a dead cell to life, two or three keeps a live one alive, anything else means death or empty.",
        "zh": "每个格子数它的八个邻居。死格有三个就活过来，活格有两个或三个就活下去，其他情况就死掉或继续空着。"
      }
    },
    {
      "motif": "penrose",
      "kind": "fact",
      "beat": {
        "en": "A still life is a pattern whose next generation is exactly itself. In the block every live cell has three neighbours and no empty cell nearby has three.",
        "zh": "静物，是下一代和自己一模一样的图案。方块里每个活格都有三个邻居，旁边没有任何一个空格刚好有三个。"
      }
    },
    {
      "motif": "lissajous",
      "kind": "fact",
      "beat": {
        "en": "The blinker turns from a row of three into a column of three and back. Period two. Larger oscillators take three, fifteen, or many more generations to come home.",
        "zh": "闪烁子从一横排三格变成一直排三格，再变回去，周期是二。更大的振荡子要三代、十五代，甚至更多代才回到原样。"
      }
    },
    {
      "motif": "spiral",
      "kind": "fact",
      "beat": {
        "en": "The glider is five cells that, after four generations, are the same shape one step further along the diagonal. It carries a pattern across the board.",
        "zh": "滑翔机是五个格子，四代之后还是同一个形状，只是沿对角线挪了一格。它把一个图案搬过整张棋盘。"
      }
    },
    {
      "motif": "mandelbrot",
      "kind": "principle",
      "beat": {
        "en": "A random board burns down to a few percent of its cells: blocks, beehives, blinkers, and gliders flying off. The same parts, arranged with care, can compute anything.",
        "zh": "一张随机棋盘会烧到只剩百分之几的格子：方块、蜂巢、闪烁子，还有飞走的滑翔机。同样这些零件，用心排列，就能计算任何东西。"
      }
    }
  ],
  "sections": [
    {
      "title": {
        "en": "Four rules, no plan",
        "zh": "四条规则，没有设计"
      },
      "paragraphs": {
        "en": [
          "John Conway devised the Game of Life in 1970, and Martin Gardner introduced it to the world in his Scientific American column that October.[[1]] The board is a grid of cells, each alive or dead, and every cell looks at its eight neighbours.",
          "There are four rules. A live cell with fewer than two live neighbours dies. A live cell with two or three survives. A live cell with more than three dies. A dead cell with exactly three becomes alive. ==Nothing in those rules mentions shapes, yet the board fills with shapes that behave like species, and naming them is how you read the board.=="
        ],
        "zh": [
          "John Conway 在 1970 年设计了 Game of Life，同年 10 月 Martin Gardner 在 Scientific American 的专栏把它介绍给全世界。[[1]] 棋盘是一格一格的细胞，每格不是活就是死，每格都看它周围的八个邻居。",
          "规则只有四条。活格的活邻居少于两个，死。活格有两个或三个，活下去。活格多于三个，死。死格刚好有三个，活过来。==这四条规则里没有提到任何形状，棋盘上却长满了像物种一样的形状；认得它们，就是读懂棋盘的方法。=="
        ]
      }
    },
    {
      "title": {
        "en": "Still lifes: nothing changes",
        "zh": "静物：什么都不变"
      },
      "paragraphs": {
        "en": [
          "A still life is a pattern whose next generation is exactly the same as the current one: no cell dies and no cell is born. ==For that to happen, every live cell needs two or three live neighbours, and no dead cell may have exactly three.==",
          "The block is the simplest: a 2 by 2 square. Each of its four cells has three live neighbours, so all survive, and every empty cell around it touches at most two, so nothing is born. The beehive is six cells in a stretched hexagon. Each live cell has exactly two neighbours; the two empty cells inside it have five, the empty cells outside have at most two, none have three, so not a single cell changes. The loaf, the boat and the tub work the same way. Still lifes are the debris a chaotic board leaves behind once it settles."
        ],
        "zh": [
          "静物，是下一代和这一代完全一样的图案：没有格子死，也没有格子生。==要做到这样，每个活格都要有两个或三个活邻居，而且没有任何一个死格刚好有三个。==",
          "最简单的是方块：一个 2 乘 2 的正方形。四个格子各有三个活邻居，全部活下去；周围每个空格最多只碰到两个，所以什么都不会生出来。蜂巢是六个格子排成的拉长六边形。每个活格刚好两个邻居；中间那两个空格各有五个，外面的空格最多两个，没有一个是三，所以一个格子都不会变。面包（loaf）、小船（boat）、浴缸（tub）都是同样的道理。静物，是一张混乱的棋盘安定下来之后留下的残骸。"
        ]
      }
    },
    {
      "title": {
        "en": "Oscillators: a heartbeat in place",
        "zh": "振荡子：在原地跳动的心"
      },
      "paragraphs": {
        "en": [
          "An oscillator returns to its starting shape after a fixed number of generations, its period, without moving anywhere. The blinker is a row of three cells. The two end cells have only one neighbour each and die; the centre has two and survives; the cells directly above and below the centre each see three and are born. The row becomes a column, and one generation later the column becomes a row again.",
          "==Period two is only the start: the toad and the beacon also repeat every two generations, the pulsar every three, and the pentadecathlon every fifteen.==[[1]] Oscillators give the board a rhythm. A frozen picture can tell you where cells are; it cannot tell you which ones are pulsing."
        ],
        "zh": [
          "振荡子在固定的代数之后回到原来的形状，这个代数叫周期，而且它不会移动。闪烁子是一横排三个格子。两端各只有一个邻居，死掉；中间那格有两个，活下去；正上方和正下方的空格各看到三个，生出来。横排变成直排，再过一代，直排又变回横排。",
          "==周期二只是开始：蟾蜍（toad）和信标（beacon）也是每两代重复一次，脉冲星（pulsar）每三代，十五项全能（pentadecathlon）每十五代。==[[1]] 振荡子给棋盘加上了节奏。一张静止的截图能告诉你格子在哪里，却看不出哪些格子在跳动。"
        ]
      }
    },
    {
      "title": {
        "en": "Spaceships: patterns that travel",
        "zh": "飞船：会移动的图案"
      },
      "paragraphs": {
        "en": [
          "A spaceship returns to its own shape, but somewhere else. The glider is five cells; after four generations it has the same shape, shifted one cell diagonally. The lightweight spaceship moves along a row instead, twice as fast. ==A spaceship is how information crosses a Life board: an arrangement of cells carried from one place to another.==",
          "Conway offered fifty dollars in 1970 to anyone who could prove or disprove that a pattern can grow without limit. That November a team led by Bill Gosper at MIT won it with the glider gun, a pattern that fires a new glider every thirty generations forever.[[1]] Endless growth turned out to need nothing more than a machine for making spaceships."
        ],
        "zh": [
          "飞船也会回到自己的形状，只是换了地方。滑翔机是五个格子；四代之后形状一样，沿对角线挪了一格。轻型飞船（lightweight spaceship）则是沿着一横排走，速度是滑翔机的两倍。==飞船就是信息穿过 Life 棋盘的方式：一组排列好的格子，从一个地方被搬到另一个地方。==",
          "Conway 在 1970 年悬赏五十美元，征求证明或否定「图案可以无限长大」。同年 11 月，Bill Gosper 带领的 MIT 团队用 glider gun 拿下了奖金：这个图案每三十代就射出一架新的滑翔机，永远不停。[[1]] 原来无限的成长，只需要一台会制造飞船的机器。"
        ]
      }
    },
    {
      "title": {
        "en": "From soup to ash, and to computation",
        "zh": "从一锅汤到一堆灰，再到计算"
      },
      "paragraphs": {
        "en": [
          "Fill a board at random and the first generations are a boil of births and deaths. Then it burns down. In one simple run, a half-filled 256 by 256 board with wrapped edges kept only about three percent of its cells alive after 4,000 generations, and the most common leftovers were blocks, beehives and blinkers, with gliders flying off. You can watch the same thing happen on the Life board.[[2]]",
          "The same parts, arranged on purpose, do far more. In Winning Ways (1982), Berlekamp, Conway and Guy showed how streams of gliders, guns and carefully placed still lifes can act as wires and logic gates, which makes Life capable of universal computation. ==The cost of that power is that, in general, you cannot predict a pattern's future without running it.== The one-dimensional version of this idea, with 256 rules that fit in a byte, is in [[note:elementary-cellular-automata-256-rules|256 rules, one byte each]]."
        ],
        "zh": [
          "随机把棋盘填满，头几代是一锅不停生生死死的沸汤。然后它会慢慢烧完。在一次简单的模拟里，一张填了一半、边界相连的 256 乘 256 棋盘，跑了 4,000 代之后，只剩大约百分之三的格子还活着；留下来最多的是方块、蜂巢和闪烁子，还有几架飞走的滑翔机。你也可以在 Life 棋盘上看着同一件事发生。[[2]]",
          "同样的零件，刻意排好，能做的事多得多。Berlekamp、Conway 和 Guy 在 Winning Ways（1982）里说明了，一串串滑翔机、glider gun 和摆好位置的静物，可以当成电线和逻辑闸，所以 Life 能做通用计算。==这种能力的代价是：一般来说，不把一个图案跑起来，就没办法预测它的未来。==这个想法的一维版本，256 条规则刚好装进一个 byte，写在[[note:elementary-cellular-automata-256-rules|《256 条规则，每条一个 byte》]]。"
        ]
      }
    }
  ]
}
```
