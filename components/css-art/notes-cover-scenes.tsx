import React from 'react';

/* ---- Notes cover scenes (styles/css-art/notes-covers.css) ----
   Each Note gets its own mid-ground hero and near-ground props inside the
   grimoire cover (NotesGrimoireCover). 'book' is the original floating
   grimoire; every other variant draws an object that retells the note's
   subject. Everything is CSS: tone, stipple and grain, no outlines. */

export type NotesCoverVariant =
  | 'book' | 'rivers' | 'coin-tower' | 'coin-spin' | 'chart-wall' | 'balance' | 'hourglass'
  | 'maze' | 'lens' | 'gears' | 'chess' | 'button' | 'vinyl' | 'chest' | 'bolt';

export type NotesCoverNear = 'desk' | 'coins' | 'scrolls';

export const NOTES_COVER_VARIANTS: readonly NotesCoverVariant[] = [
  'book', 'rivers', 'coin-tower', 'coin-spin', 'chart-wall', 'balance', 'hourglass',
  'maze', 'lens', 'gears', 'chess', 'button', 'vinyl', 'chest', 'bolt',
];

export const NOTES_COVER_NEAR: Record<NotesCoverVariant, NotesCoverNear> = {
  book: 'desk', rivers: 'scrolls', 'coin-tower': 'coins', 'coin-spin': 'coins', 'chart-wall': 'coins',
  balance: 'coins', hourglass: 'desk', maze: 'scrolls', lens: 'desk', gears: 'scrolls', chess: 'desk',
  button: 'scrolls', vinyl: 'desk', chest: 'coins', bolt: 'scrolls',
};

const v = (name: string, value: string | number) => ({ [name]: value }) as React.CSSProperties;

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const Stack: React.FC<{ h: number; x: number; lean?: number; cls?: string }> = ({ h, x, lean = 0, cls = '' }) => (
  <span className={`cv-stack ${cls}`} style={{ left: `${x}%`, ...v('--h', `${h}cqi`), ...v('--lean', `${lean}deg`) }}>
    <span className="cv-stack-body cv-stip cv-grain" />
    <span className="cv-stack-top" />
  </span>
);

const heroes: Record<Exclude<NotesCoverVariant, 'book'>, React.ReactNode> = {
  // three rivers pour from three ledges into one basin
  rivers: (
    <span className="cv-hero cv-rivers">
      {[0, 1, 2].map((i) => (
        <span key={i} className={`cv-fall f${i}`}>
          <span className="cv-ledge cv-stip cv-grain" /><span className="cv-water" />
        </span>
      ))}
      <span className="cv-basin cv-stip cv-grain" /><span className="cv-pool" />
      {[0, 1, 2].map((i) => <span key={`r${i}`} className="cv-ripple" style={v('--i', i)} />)}
    </span>
  ),
  // an empire of borrowed money: coin stacks, the tallest leaning
  'coin-tower': (
    <span className="cv-hero cv-tower">
      <Stack h={8} x={12} /><Stack h={13} x={30} /><Stack h={19} x={50} /><Stack h={25} x={70} lean={9} cls="is-lean" />
      <span className="cv-crack" />
    </span>
  ),
  // the coin that "only goes up", spinning over a pyramid of smaller coins
  'coin-spin': (
    <span className="cv-hero cv-spin">
      <span className="cv-coin3d">
        {range(5).map((i) => <span key={i} className="cv-coin-layer" style={v('--z', i)} />)}
        <span className="cv-coin-face front" /><span className="cv-coin-face back" />
      </span>
      {[[1, 0], [2, 1], [3, 2], [4, 3]].map(([count, row]) => range(count).map((i) => (
        <span key={`${row}-${i}`} className="cv-pcoin" style={{ ...v('--row', row), ...v('--col', i - (count - 1) / 2) }} />
      )))}
    </span>
  ),
  // the mad bull: candles climb, then hit the wall
  'chart-wall': (
    <span className="cv-hero cv-chart">
      {[6, 9, 8, 12, 15, 19, 23, 14, 8].map((h, i) => (
        <span key={i} className={`cv-candle${i >= 7 ? ' is-down' : ''}`} style={{ ...v('--i', i), ...v('--h', `${h}cqi`) }}>
          <span className="cv-wick" /><span className="cv-body cv-grain" /><span className="cv-side" />
        </span>
      ))}
      <span className="cv-wall cv-stip cv-grain" />
    </span>
  ),
  // a balance: money on one pan, a growing seedling (future output) on the other
  balance: (
    <span className="cv-hero cv-balance">
      <span className="cv-post cv-grain" /><span className="cv-foot cv-stip" />
      <span className="cv-beam">
        <span className="cv-bar" />
        <span className="cv-pan left"><span className="cv-string" /><span className="cv-dish cv-stip" /><Stack h={5} x={34} /></span>
        <span className="cv-pan right"><span className="cv-string" /><span className="cv-dish cv-stip" /><span className="cv-sprout"><span className="cv-stem" /><span className="cv-leaf l" /><span className="cv-leaf r" /></span></span>
      </span>
      <span className="cv-finial" />
    </span>
  ),
  // wealth as time: a great hourglass with coins orbiting it
  hourglass: (
    <span className="cv-hero cv-glass">
      <span className="cv-cap top cv-stip cv-grain" /><span className="cv-cap bot cv-stip cv-grain" />
      <span className="cv-pillar l" /><span className="cv-pillar r" />
      <span className="cv-bulb" /><span className="cv-sand-top" /><span className="cv-sand-bot" /><span className="cv-stream" />
      <span className="cv-orbit">{range(3).map((i) => <span key={i} className="cv-ocoin" style={v('--i', i)} />)}</span>
    </span>
  ),
  // human nature as terrain: a maze on a tilted plane, one golden path through it
  maze: (
    <span className="cv-hero cv-maze">
      <span className="cv-plane">
        {[[0, 0, 100, 5], [0, 95, 100, 5], [0, 0, 5, 80], [95, 20, 5, 80], [18, 18, 5, 62], [18, 18, 40, 5], [36, 36, 5, 64], [54, 18, 5, 45], [54, 58, 28, 5], [72, 0, 5, 42], [72, 76, 5, 24]].map(([x, y, w, h], i) => (
          <span key={i} className="cv-wallseg" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />
        ))}
        <span className="cv-path" />
      </span>
    </span>
  ),
  // judgment: a lens over a field of data points
  lens: (
    <span className="cv-hero cv-lens">
      <span className="cv-field" />
      <span className="cv-magnifier">
        <span className="cv-glass-in" /><span className="cv-rim" /><span className="cv-handle cv-stip cv-grain" />
      </span>
    </span>
  ),
  // chaos into systems: two meshing gears turning in opposite directions
  gears: (
    <span className="cv-hero cv-gears">
      <span className="cv-gear big"><span className="cv-teeth" /><span className="cv-disc cv-stip cv-grain" /><span className="cv-hub" /></span>
      <span className="cv-gear small"><span className="cv-teeth" /><span className="cv-disc cv-stip cv-grain" /><span className="cv-hub" /></span>
      {range(5).map((i) => <span key={i} className="cv-shard" style={v('--i', i)} />)}
    </span>
  ),
  // win before you fight: a board in perspective and a few pieces
  chess: (
    <span className="cv-hero cv-chess">
      <span className="cv-board cv-grain" />
      {[[30, 62, 0], [48, 70, 0], [64, 58, 1], [42, 50, 2]].map(([x, y, kind], i) => (
        <span key={i} className={`cv-piece k${kind}`} style={{ left: `${x}%`, top: `${y}%` }}><span className="cv-piece-body cv-stip" /></span>
      ))}
    </span>
  ),
  // button feedback: a big button presses, ripples answer
  button: (
    <span className="cv-hero cv-button">
      {[0, 1, 2].map((i) => <span key={i} className="cv-wave" style={v('--i', i)} />)}
      <span className="cv-housing cv-stip cv-grain" />
      <span className="cv-cap-wrap"><span className="cv-cap-side" /><span className="cv-cap-top" /></span>
    </span>
  ),
  // background music: a spinning record, a tonearm and notes drifting up
  vinyl: (
    <span className="cv-hero cv-vinyl">
      <span className="cv-plinth cv-stip cv-grain" />
      <span className="cv-deck"><span className="cv-record" /></span>
      <span className="cv-arm"><span className="cv-arm-rod" /><span className="cv-arm-head" /></span>
      {range(3).map((i) => <span key={i} className="cv-note" style={v('--i', i)} />)}
    </span>
  ),
  // lifetime storage: a chest, lid ajar, coins inside, a golden keyhole
  chest: (
    <span className="cv-hero cv-chest">
      <span className="cv-chest-in" />
      {range(4).map((i) => <span key={i} className="cv-glint" style={v('--i', i)} />)}
      <span className="cv-lid cv-stip cv-grain" />
      <span className="cv-front cv-stip cv-grain" /><span className="cv-side cv-grain" />
      <span className="cv-band a" /><span className="cv-band b" /><span className="cv-keyhole" />
    </span>
  ),
  // vite: a bolt strikes a stack of modules
  bolt: (
    <span className="cv-hero cv-bolt">
      {[[20, 62], [44, 62], [68, 62], [32, 36], [56, 36], [44, 10]].map(([x, y], i) => (
        <span key={i} className="cv-cube" style={{ left: `${x}%`, top: `${y}%`, ...v('--i', i) }}>
          <span className="cv-cube-top" /><span className="cv-cube-l cv-grain" /><span className="cv-cube-r cv-stip" />
        </span>
      ))}
      <span className="cv-strike" />
    </span>
  ),
};

export const NotesCoverHero: React.FC<{ variant: Exclude<NotesCoverVariant, 'book'> }> = ({ variant }) => (
  <>
    <span className="ng-book-shadow cv-hero-shadow" />
    {heroes[variant]}
  </>
);

export const NotesCoverNearProps: React.FC<{ set: Exclude<NotesCoverNear, 'desk'> }> = ({ set }) =>
  set === 'coins' ? (
    <span className="cv-near cv-near-coins">
      <Stack h={6} x={8} /><Stack h={10} x={30} /><Stack h={4} x={52} />
      <span className="cv-loose" style={{ left: '72%' }} /><span className="cv-loose" style={{ left: '84%', rotate: '12deg' }} />
    </span>
  ) : (
    <span className="cv-near cv-near-scrolls">
      <span className="cv-scroll s1 cv-stip cv-grain" /><span className="cv-scroll s2 cv-stip cv-grain" />
      <span className="cv-inkwell cv-stip cv-grain" /><span className="cv-quill" />
    </span>
  );
