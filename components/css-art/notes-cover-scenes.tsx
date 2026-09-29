import React from 'react';
import {
  CoverBalanceArt, CoverBoltArt, CoverBookArt, CoverButtonArt, CoverChartArt, CoverChessArt, CoverChestArt,
  CoverCoinSpinArt, CoverCoinTowerArt, CoverGearsArt, CoverHourglassArt, CoverLensArt, CoverMazeArt,
  CoverRiversArt, CoverVinylArt,
} from './notes-cover-art';

/* ---- Notes cover scenes (styles/css-art/notes-covers.css) ----
   Each Note gets its own mid-ground hero and near-ground props inside the
   grimoire cover (NotesGrimoireCover). Every variant draws an object that retells the note's
   subject as formula line art (notes-cover-art.tsx); the near props stay CSS
   (tone, stipple and grain, no outlines). */

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

const Stack: React.FC<{ h: number; x: number; lean?: number; cls?: string }> = ({ h, x, lean = 0, cls = '' }) => (
  <span className={`cv-stack ${cls}`} style={{ left: `${x}%`, ...v('--h', `${h}cqi`), ...v('--lean', `${lean}deg`) }}>
    <span className="cv-stack-body cv-stip cv-grain" />
    <span className="cv-stack-top" />
  </span>
);

// every hero is formula line art (notes-cover-art.tsx), one per note's story
const heroes: Record<NotesCoverVariant, React.FC> = {
  book: CoverBookArt, // an open book whose pages fan as curves, an evidence network above
  rivers: CoverRiversArt, // three rivers fall into one basin and spiral to its centre
  'coin-tower': CoverCoinTowerArt, // an empire of borrowed money: coin stacks, the tallest leaning and cracked
  'coin-spin': CoverCoinSpinArt, // the coin that "only goes up", spinning over a recruitment pyramid
  'chart-wall': CoverChartArt, // the mad bull: an exponential climb hits a wall and shatters
  balance: CoverBalanceArt, // money on one pan, a sprouting fern (future output) on the other
  hourglass: CoverHourglassArt, // wealth as time: a ruled hyperboloid hourglass, sand as dots
  maze: CoverMazeArt, // human nature as terrain: a labyrinth with one golden way in
  lens: CoverLensArt, // judgment: many rays through one lens, a caustic, one focus
  gears: CoverGearsArt, // chaos into systems: a Lorenz attractor fed through gears into a clean sine
  chess: CoverChessArt, // win before you fight: a board in perspective, a turned king, a knight's path
  button: CoverButtonArt, // button feedback: a key pressed into a damped ripple surface
  vinyl: CoverVinylArt, // background music: a groove spiral, a tonearm, sound as Fourier partial sums
  chest: CoverChestArt, // lifetime storage: an open chest, a honeycomb of cells lit from inside
  bolt: CoverBoltArt, // vite: a branching bolt by midpoint displacement, with speed streaks
};

export const NotesCoverHero: React.FC<{ variant: NotesCoverVariant }> = ({ variant }) => {
  const Hero = heroes[variant];
  return (
    <>
      <span className="ng-book-shadow cv-hero-shadow" />
      <span className="cv-hero cv-art"><Hero /></span>
    </>
  );
};

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
