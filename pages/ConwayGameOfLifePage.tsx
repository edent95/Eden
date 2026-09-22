/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { HeaderControls } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { ProjectsCrmCssIcon } from '../components/css-art/index';
import { I_CHING_TRIGRAMS } from './i-ching';

const CONWAY_LIFE_COLUMNS = 36;

const CONWAY_LIFE_ROWS = 24;

const CONWAY_LIFE_CELL_COUNT = CONWAY_LIFE_COLUMNS * CONWAY_LIFE_ROWS;

type ConwayLifePattern = 'glider' | 'r-pentomino' | 'pulsar';

const CONWAY_LIFE_PATTERNS: Record<ConwayLifePattern, readonly [number, number][]> = {
  glider: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
  'r-pentomino': [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]],
  pulsar: [
    [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
    [0, 2], [5, 2], [7, 2], [12, 2],
    [0, 3], [5, 3], [7, 3], [12, 3],
    [0, 4], [5, 4], [7, 4], [12, 4],
    [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
    [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
    [0, 8], [5, 8], [7, 8], [12, 8],
    [0, 9], [5, 9], [7, 9], [12, 9],
    [0, 10], [5, 10], [7, 10], [12, 10],
    [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12],
  ],
};

const createConwayLifeBoard = (pattern: ConwayLifePattern = 'pulsar'): boolean[] => {
  const board = Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => false);
  const coordinates = CONWAY_LIFE_PATTERNS[pattern];
  const patternWidth = Math.max(...coordinates.map(([x]) => x)) + 1;
  const patternHeight = Math.max(...coordinates.map(([, y]) => y)) + 1;
  const startX = Math.floor((CONWAY_LIFE_COLUMNS - patternWidth) / 2);
  const startY = Math.floor((CONWAY_LIFE_ROWS - patternHeight) / 2);

  coordinates.forEach(([x, y]) => {
    board[(startY + y) * CONWAY_LIFE_COLUMNS + startX + x] = true;
  });

  return board;
};

const createRandomConwayLifeBoard = (): boolean[] =>
  Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => Math.random() < 0.22);

const evolveConwayLifeBoard = (board: readonly boolean[]): boolean[] =>
  board.map((isAlive, index) => {
    const row = Math.floor(index / CONWAY_LIFE_COLUMNS);
    const column = index % CONWAY_LIFE_COLUMNS;
    let neighbors = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        if (rowOffset === 0 && columnOffset === 0) continue;
        const nextRow = row + rowOffset;
        const nextColumn = column + columnOffset;
        if (nextRow < 0 || nextRow >= CONWAY_LIFE_ROWS || nextColumn < 0 || nextColumn >= CONWAY_LIFE_COLUMNS) continue;
        if (board[nextRow * CONWAY_LIFE_COLUMNS + nextColumn]) neighbors += 1;
      }
    }

    return isAlive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
  });

export const ConwayGameOfLifeFullPage: React.FC<{
  homeHref: string;
  labHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, labHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [board, setBoard] = React.useState<boolean[]>(() => createConwayLifeBoard());
  const [generation, setGeneration] = React.useState(0);
  const [isMobileMenu, setIsMobileMenu] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches,
  );
  const [isRunning, setIsRunning] = React.useState(() =>
    typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  React.useEffect(() => {
    const mobileMenuQuery = window.matchMedia('(max-width: 640px)');
    const updateMobileMenu = () => setIsMobileMenu(mobileMenuQuery.matches);
    updateMobileMenu();
    mobileMenuQuery.addEventListener('change', updateMobileMenu);
    return () => mobileMenuQuery.removeEventListener('change', updateMobileMenu);
  }, []);

  React.useEffect(() => {
    if (!isRunning) return undefined;
    const intervalId = window.setInterval(() => {
      setBoard((currentBoard) => evolveConwayLifeBoard(currentBoard));
      setGeneration((currentGeneration) => currentGeneration + 1);
    }, 240);
    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const step = () => {
    setBoard((currentBoard) => evolveConwayLifeBoard(currentBoard));
    setGeneration((currentGeneration) => currentGeneration + 1);
  };

  const loadPattern = (pattern: ConwayLifePattern) => {
    setBoard(createConwayLifeBoard(pattern));
    setGeneration(0);
    setIsRunning(false);
  };

  const population = board.reduce((total, isAlive) => total + (isAlive ? 1 : 0), 0);

  return (
    <div className="page-shell conway-page conway-life-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="conway-rules-page">
        <div className="conway-rules-shell">
          <div className="conway-rules-topbar">
            <div className="conway-topbar-actions">
              <a href={homeHref} className="conway-back-link inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft size={16} />
                {isZh ? '返回主页' : 'Back to Home'}
              </a>
            </div>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection={isMobileMenu}
              compactLanguageOnSelection={isMobileMenu}
            />
          </div>

          <header className="conway-rules-header conway-life-header">
            <div className="conway-rules-identity">
              <div className="conway-rules-app-icon">
                <ProjectsCrmCssIcon label={isZh ? "Conway's Game of Life CSS app 图标" : "Conway's Game of Life CSS app icon"} />
              </div>
              <div className="conway-rules-copy">
                <p className="conway-kicker">B3 / S23 · Two-dimensional cellular automaton</p>
                <h1 className="conway-rules-title font-display font-bold tracking-tight">
                  Conway’s Game of Life
                </h1>
                <p className="conway-rules-subtitle">
                  {isZh
                    ? '几条简单规则，也能长出意想不到的生命。点亮细胞，然后看秩序自己出现。'
                    : 'Small rules. Unexpected life. Turn on a few cells, then watch order appear on its own.'}
                </p>
              </div>
            </div>
          </header>

          <div className="conway-life-console">
            <div>
              <span>{isZh ? '世代' : 'Generation'}</span>
              <strong>{generation}</strong>
            </div>
            <div>
              <span>{isZh ? '活细胞' : 'Population'}</span>
              <strong>{population}</strong>
            </div>
            <div>
              <span>{isZh ? '规则' : 'Rule'}</span>
              <strong>B3 / S23</strong>
            </div>
            <div className="conway-rules-controls">
              <button type="button" className="conway-control-button" onClick={() => setIsRunning((value) => !value)}>
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                <span>{isRunning ? (isZh ? '暂停' : 'Pause') : isZh ? '运行' : 'Run'}</span>
              </button>
              <button type="button" className="conway-control-button conway-control-button-muted" onClick={step} disabled={isRunning}>
                <ArrowRight size={16} />
                <span>{isZh ? '单步' : 'Step'}</span>
              </button>
              <button type="button" className="conway-control-button conway-control-button-muted" onClick={() => loadPattern('pulsar')}>
                <RotateCcw size={16} />
                <span>{isZh ? '重置' : 'Reset'}</span>
              </button>
              <button
                type="button"
                className="conway-control-button conway-control-button-muted"
                onClick={() => {
                  setBoard(Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => false));
                  setGeneration(0);
                  setIsRunning(false);
                }}
              >
                <span>{isZh ? '清空' : 'Clear'}</span>
              </button>
              <button
                type="button"
                className="conway-control-button conway-control-button-muted"
                onClick={() => {
                  setBoard(createRandomConwayLifeBoard());
                  setGeneration(0);
                  setIsRunning(false);
                }}
              >
                <span>{isZh ? '随机' : 'Random'}</span>
              </button>
            </div>
          </div>

          <section className="conway-life-layout" aria-label={isZh ? 'Conway 二维生命棋盘' : "Conway's two-dimensional life board"}>
            <div className="conway-life-stage">
              <div
                className="conway-life-grid"
                style={{ '--life-column-count': CONWAY_LIFE_COLUMNS } as React.CSSProperties}
                role="grid"
                aria-label={isZh ? '点击格子切换细胞生死' : 'Click cells to toggle life and death'}
              >
                {board.map((isAlive, index) => {
                  const row = Math.floor(index / CONWAY_LIFE_COLUMNS) + 1;
                  const column = (index % CONWAY_LIFE_COLUMNS) + 1;
                  return (
                    <button
                      key={index}
                      type="button"
                      role="gridcell"
                      className={isAlive ? 'is-alive' : undefined}
                      aria-pressed={isAlive}
                      aria-label={isZh ? `第 ${row} 行第 ${column} 列，${isAlive ? '存活' : '死亡'}` : `Row ${row}, column ${column}, ${isAlive ? 'alive' : 'dead'}`}
                      onClick={() => setBoard((currentBoard) => currentBoard.map((cell, cellIndex) => cellIndex === index ? !cell : cell))}
                    />
                  );
                })}
              </div>
            </div>

            <aside className="conway-life-sidebar">
              <div>
                <p className="conway-kicker">{isZh ? '经典图案' : 'Classic seeds'}</p>
                <div className="conway-life-patterns">
                  <button type="button" onClick={() => loadPattern('glider')}>Glider</button>
                  <button type="button" onClick={() => loadPattern('r-pentomino')}>R-pentomino</button>
                  <button type="button" onClick={() => loadPattern('pulsar')}>Pulsar</button>
                </div>
              </div>
              <div className="conway-life-rules">
                <p className="conway-kicker">{isZh ? '四条规则' : 'Four rules'}</p>
                <ol>
                  <li><b>01</b><span>{isZh ? '活细胞少于 2 个邻居，死亡。' : 'A live cell with fewer than 2 neighbors dies.'}</span></li>
                  <li><b>02</b><span>{isZh ? '活细胞有 2 或 3 个邻居，存活。' : 'A live cell with 2 or 3 neighbors survives.'}</span></li>
                  <li><b>03</b><span>{isZh ? '活细胞多于 3 个邻居，死亡。' : 'A live cell with more than 3 neighbors dies.'}</span></li>
                  <li><b>04</b><span>{isZh ? '死细胞恰好有 3 个邻居，诞生。' : 'A dead cell with exactly 3 neighbors is born.'}</span></li>
                </ol>
              </div>
              <a href={labHref} className="conway-lab-link">
                <span>{isZh ? '探索相关系统' : 'Explore the related system'}</span>
                <strong>Cellular Automata Lab <ArrowRight size={16} /></strong>
              </a>
            </aside>
          </section>

          <section className="conway-binary-essay" aria-labelledby="conway-binary-title">
            <header className="conway-binary-header">
              <p className="conway-kicker">{isZh ? '二元世界' : 'Binary worlds'}</p>
              <h2 id="conway-binary-title" className="conway-binary-title font-display">
                {isZh ? '两个符号，足以长出一个宇宙。' : 'Two symbols are enough to grow a universe.'}
              </h2>
              <p className="conway-binary-lead">
                {isZh
                  ? 'Conway 的棋盘把每个细胞压缩成一个判断：生或死。《易经》把每一爻压缩成阴或阳。它们不是同一套思想，却从同一种最小结构出发。'
                  : "Conway's board compresses every cell into one decision: alive or dead. The I Ching compresses every line into yin or yang. They are not the same system, but they begin with the same minimal structure."}
              </p>
              <p className="conway-binary-thesis">
                {isZh ? '真正互通的，不是解释，而是组合。' : 'What connects them is not interpretation, but combination.'}
              </p>
            </header>

            <div className="conway-binary-chapter conway-binary-alphabet">
              <div className="conway-binary-chapter-copy">
                <p className="conway-binary-index">01 / {isZh ? '共同字母表' : 'Shared alphabet'}</p>
                <h3>{isZh ? '底层编码的互通' : 'The common code underneath'}</h3>
                <p>
                  {isZh
                    ? '在细胞自动机里，0 与 1 存储死亡和生存；在卦象里，断开的阴爻与连续的阳爻记录阴与阳。当一个位置只有两种可能，它承载的信息量就是一个 bit。'
                    : 'In cellular automata, 0 and 1 store dead and alive. In the hexagrams, a broken yin line and an unbroken yang line record yin and yang. When one position has only two possibilities, it carries one bit of information.'}
                </p>
              </div>

              <div className="conway-state-ledger" aria-label={isZh ? '二进制、细胞状态与阴阳的形式对应' : 'Formal pairing of binary, cell states, yin, and yang'}>
                <div>
                  <code>0</code>
                  <span className="conway-state-cell" aria-hidden />
                  <span className="conway-yao is-yin" aria-hidden />
                  <span>{isZh ? '死亡 · 阴' : 'Dead · Yin'}</span>
                </div>
                <div>
                  <code>1</code>
                  <span className="conway-state-cell is-alive" aria-hidden />
                  <span className="conway-yao is-yang" aria-hidden />
                  <span>{isZh ? '生存 · 阳' : 'Alive · Yang'}</span>
                </div>
              </div>
            </div>

            <div className="conway-binary-chapter conway-binary-space">
              <div className="conway-binary-chapter-copy">
                <p className="conway-binary-index">02 / {isZh ? '状态空间' : 'State space'}</p>
                <h3>{isZh ? '从 8 到 64，再到 256' : 'From 8 to 64, then 256'}</h3>
                <p>
                  {isZh
                    ? '同一套二元组合，在不同问题里会长成不同的数学空间。八卦、六十四卦与 Elementary Cellular Automata 的规则表，在这里相遇。'
                    : 'The same binary combinatorics grows into different mathematical spaces for different questions. This is where the trigrams, the 64 hexagrams, and Elementary Cellular Automata rule tables meet.'}
                </p>
              </div>

              <div className="conway-power-grid">
                <article>
                  <strong>2<sup>3</sup> = 8</strong>
                  <span>{isZh ? '三个输入' : 'Three inputs'}</span>
                  <p>{isZh ? '左邻、自身、右邻各有 0 / 1 两态，组成 000—111 八种局部邻域。' : 'Left, self, and right each hold 0 or 1, producing eight local neighborhoods from 000 to 111.'}</p>
                </article>
                <article>
                  <strong>2<sup>6</sup> = 64</strong>
                  <span>{isZh ? '六个位置' : 'Six positions'}</span>
                  <p>{isZh ? '上下两个三爻卦以 8 × 8 组合成六十四卦，也就是 64 个六位二元状态。' : 'Two three-line trigrams combine as 8 × 8 to form 64 hexagrams: 64 six-bit states.'}</p>
                </article>
                <article>
                  <strong>2<sup>8</sup> = 256</strong>
                  <span>{isZh ? '八个输出' : 'Eight outputs'}</span>
                  <p>{isZh ? '规则表要为八种邻域各指定 0 或 1，因此共有 256 种 Elementary Rules。' : 'A rule table assigns 0 or 1 to each of eight neighborhoods, creating 256 Elementary Rules.'}</p>
                </article>
              </div>

              <div className="conway-trigram-map" aria-label={isZh ? '八种三位二元状态与八卦的形式配对' : 'Formal pairing of eight three-bit states with the eight trigrams'}>
                {I_CHING_TRIGRAMS.map((trigram) => (
                  <div key={trigram.bits}>
                    <code>{trigram.bits}</code>
                    <strong aria-hidden>{trigram.symbol}</strong>
                    <span>{trigram.name[language]} · {trigram.nature[language]}</span>
                  </div>
                ))}
              </div>
              <p className="conway-binary-note">
                {isZh
                  ? '这里采用阳 = 1、阴 = 0 的约定，展示的是形式上的一一配对。六十四卦描述的是 2⁶ 个状态；256 条 Elementary Rules 描述的是八种输入各自如何输出。两者共享组合数学，但不是同一种自动机。'
                  : 'This uses yang = 1 and yin = 0 as a formal one-to-one pairing. The 64 hexagrams describe 2⁶ states; the 256 Elementary Rules describe how each of eight inputs produces an output. They share combinatorics, but they are not the same automaton.'}
              </p>
            </div>

            <div className="conway-binary-chapter conway-leibniz-bridge">
              <div className="conway-binary-chapter-copy">
                <p className="conway-binary-index">03 / {isZh ? '历史桥梁' : 'Historical bridge'}</p>
                <h3>{isZh ? '莱布尼茨看见了这次相遇' : 'Leibniz saw the systems meet'}</h3>
                <p>
                  {isZh
                    ? '莱布尼茨不是从《易经》发明二进制：二进制在先，跨文化的辨认在后。白晋把邵雍体系中的伏羲六十四卦图寄给他；在阴 = 0、阳 = 1，并采用特定读爻方向时，六十四种组合可以读成 0—63。'
                    : 'Leibniz did not invent binary from the I Ching: the binary system came first, and the cross-cultural recognition came later. Joachim Bouvet sent him the Fuxi hexagram diagram associated with Shao Yong; with yin = 0, yang = 1, and a particular reading direction, its 64 combinations can be read as 0–63.'}
                </p>
              </div>

              <ol className="conway-bridge-timeline">
                <li>
                  <span>{isZh ? '此前' : 'Before'}</span>
                  <p>{isZh ? '莱布尼茨已经形成只用 0 与 1 的二进制算术。' : 'Leibniz had already developed arithmetic using only 0 and 1.'}</p>
                </li>
                <li>
                  <span>1701</span>
                  <p>{isZh ? '白晋从北京寄来伏羲六十四卦图，并指出形式上的相似。' : 'Bouvet sent the Fuxi hexagram diagram from Beijing and pointed out the formal resemblance.'}</p>
                </li>
                <li>
                  <span>1703</span>
                  <p>{isZh ? '莱布尼茨在《二进制算术的阐释》中公开写下这条联系。' : 'Leibniz published the connection in his Explanation of Binary Arithmetic.'}</p>
                </li>
              </ol>

              <div className="conway-bridge-caveat">
                <p>
                  {isZh
                    ? '历史事实是：这场相遇确实发生过。更克制的结论是：它证明了两套符号系统可以共享二元结构，不证明《易经》预言了计算机，也不代表常用的文王卦序就是 0—63。'
                    : 'The historical fact is that this encounter happened. The more careful conclusion is that two symbolic systems can share a binary structure—not that the I Ching predicted computers, or that the standard King Wen sequence is a 0–63 count.'}
                </p>
                <div className="conway-bridge-sources">
                  <a href="https://philo-labo.fr/fichiers/Leibniz%20-%20Arithmetique%20binaire.pdf" target="_blank" rel="noreferrer">
                    {isZh ? '莱布尼茨 1703 原文 ↗' : 'Leibniz’s 1703 paper ↗'}
                  </a>
                  <a href="https://www.leibniz-translations.com/fuxi" target="_blank" rel="noreferrer">
                    {isZh ? '伏羲卦图通信译文 ↗' : 'Fuxi correspondence translation ↗'}
                  </a>
                  <a href={labHref}>{isZh ? '进入 256 Rules 实验室 →' : 'Open the 256 Rules Lab →'}</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
