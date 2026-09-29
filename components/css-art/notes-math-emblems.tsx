import React from 'react';
import {
  catenaryFamily, catenoidBack, catenoidFront, lissaFamily, mandelLemniscates, mandelSet,
  penroseThick, penroseThin, phyllo21, phyllo34, phylloSeeds, spiralArcs, spiralLog, spiralPole, spiralSquares,
} from './notes-math-geometry';
import type { NotesStoryMotif } from './index';

/* ---- Notes math emblems (styles/css-art/notes-emblems.css) ----
   Round plates for the Notes margins: each one plots its motif exactly
   (geometry from scripts/css-art/notes-emblems.py) over a construction grid
   of φ-spaced circles, inside a rim of beads and ticks (no text). When
   `active`, the curves draw themselves and a pen point travels the main curve. */

// the rim is a ring of beads (every fifth one gold) and tick marks: shapes, not text
const BEADS = Array.from({ length: 60 }, (_, i) => {
  const a = (i / 60) * Math.PI * 2;
  return { x: 103 * Math.sin(a), y: -103 * Math.cos(a), major: i % 5 === 0 };
});

const CONSTRUCTION = [96, 96 / 1.618, 96 / 2.618, 96 / 4.236];
const RING_RX = 58 * 0.62 * Math.cosh(1 / 0.62);
const RING_RY = 0.3 * RING_RX;

const Draw: React.FC<{ d: string; className: string; i?: number }> = ({ d, className, i = 0 }) => (
  <path d={d} pathLength={1} className={`em-draw ${className}`} style={{ '--i': i } as React.CSSProperties} />
);

const Pen: React.FC<{ path: string; dur: number }> = ({ path, dur }) => (
  <circle r={2.8} className="em-pen">
    <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
  </circle>
);

const body = (motif: NotesStoryMotif, ids: { hatch: string; hatch2: string; left: string; right: string }, active: boolean, plate: boolean): React.ReactNode => {
  switch (motif) {
    case 'mandelbrot':
      return (
        <>
          <path d={mandelSet} className="em-fill" fill={`url(#${ids.hatch})`} fillRule="evenodd" />
          {mandelLemniscates.map((d, n) => <Draw key={n} d={d} className={n === 6 ? 'em-foil' : 'em-ink'} i={n} />)}
        </>
      );
    case 'spiral':
      return (
        <>
          <path d={spiralSquares} className="em-grid-line" />
          <Draw d={spiralLog} className="em-ink em-dash" i={1} />
          <Draw d={spiralArcs} className="em-foil em-bold" i={0} />
          <circle cx={spiralPole[0]} cy={spiralPole[1]} r={2.4} className="em-dot-foil" />
          {active && <Pen path={spiralLog} dur={9} />}
        </>
      );
    case 'catenoid':
      // the plate tells the story: pulled too far apart, the film pinches at the waist and snaps into two discs
      return (
        <>
          <g className="em-film">
            <Draw d={catenoidBack} className="em-ink em-faint" i={0} />
            <Draw d={catenoidFront} className="em-ink" i={2} />
          </g>
          {plate && <><ellipse cx={0} cy={-66.7} rx={RING_RX} ry={RING_RY} className="em-disc em-ring-top" /><ellipse cx={0} cy={66.7} rx={RING_RX} ry={RING_RY} className="em-disc em-ring-bot" /></>}
          <ellipse cx={0} cy={-66.7} rx={RING_RX} ry={RING_RY} className="em-ring em-ring-top" />
          <ellipse cx={0} cy={66.7} rx={RING_RX} ry={RING_RY} className="em-ring em-ring-bot" />
        </>
      );
    case 'catenary':
      // the plate tells the story: the principal chain has no middle link, and its halves swing apart
      return (
        <>
          {catenaryFamily.map((d, k) => (k === 3 && plate ? null : <Draw key={k} d={d} className={k === 3 ? 'em-foil em-bold' : 'em-ink em-faint'} i={k} />))}
          {plate && (
            <>
              <g className="em-half em-half-l" clipPath={`url(#${ids.left})`}><Draw d={catenaryFamily[3]} className="em-foil em-bold" i={3} /></g>
              <g className="em-half em-half-r" clipPath={`url(#${ids.right})`}><Draw d={catenaryFamily[3]} className="em-foil em-bold" i={3} /></g>
              <line x1={0} y1={-30} x2={0} y2={10} className="em-gap" />
            </>
          )}
          <circle cx={-82} cy={-46} r={3.2} className="em-dot-foil" /><circle cx={82} cy={-46} r={3.2} className="em-dot-foil" />
          {active && !plate && <Pen path={catenaryFamily[3]} dur={6} />}
        </>
      );
    case 'penrose':
      return (
        <g className="em-grow">
          <path d={penroseThick} fill={`url(#${ids.hatch})`} className="em-tile" />
          <path d={penroseThin} fill={`url(#${ids.hatch2})`} className="em-tile em-tile-thin" />
        </g>
      );
    case 'phyllotaxis':
      return (
        <>
          <Draw d={phyllo21} className="em-ink em-faint" i={0} />
          <Draw d={phyllo34} className="em-foil em-faint" i={2} />
          {phylloSeeds.map(([x, y], n) => (
            <circle key={n} cx={x} cy={y} r={0.9 + 1.9 * Math.sqrt((n + 1) / phylloSeeds.length)} className={`em-seed${[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233].includes(n + 1) ? ' is-fib' : ''}`} style={{ '--n': n } as React.CSSProperties} />
          ))}
        </>
      );
    case 'lissajous':
    default:
      return (
        <>
          {lissaFamily.map((d, k) => <Draw key={k} d={d} className={k === 0 ? 'em-foil em-bold' : 'em-ink em-faint'} i={k} />)}
          {active && <Pen path={lissaFamily[0]} dur={8} />}
        </>
      );
  }
};

/** `emblem`: a round plate with a beaded rim (margins). `plate`: the bare plot, for the storyboard stage. */
export const NotesMathEmblem: React.FC<{ motif: NotesStoryMotif; active?: boolean; variant?: 'emblem' | 'plate' }> = ({ motif, active = false, variant = 'emblem' }) => {
  const plate = variant === 'plate';
  const raw = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const ids = { hatch: `emh${raw}`, hatch2: `emk${raw}`, clip: `emc${raw}`, left: `eml${raw}`, right: `emx${raw}` };
  return (
    <svg className={`em em-${motif}${plate ? ' em-plate' : ''}${active ? ' is-active' : ''}`} viewBox="-110 -110 220 220" aria-hidden>
      <defs>
        <pattern id={ids.hatch} width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="3.2" height="3.2" className="em-pat-bg" /><line x1="0" y1="0" x2="0" y2="3.2" className="em-pat-line" />
        </pattern>
        <pattern id={ids.hatch2} width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <rect width="2.6" height="2.6" className="em-pat-bg2" /><line x1="0" y1="0" x2="0" y2="2.6" className="em-pat-line2" />
        </pattern>
        <clipPath id={ids.clip}><circle r={96} /></clipPath>
        <clipPath id={ids.left}><rect x={-110} y={-110} width={104} height={220} /></clipPath>
        <clipPath id={ids.right}><rect x={6} y={-110} width={104} height={220} /></clipPath>
      </defs>
      {!plate && (
        <>
          <circle r={109} className="em-rim" />
          <circle r={97} className="em-face" />
          <g className="em-beads">
            {BEADS.map(({ x, y, major }, i) => <circle key={i} cx={x} cy={y} r={major ? 2 : 0.8} className={major ? 'is-major' : undefined} />)}
          </g>
        </>
      )}
      <g clipPath={plate ? undefined : `url(#${ids.clip})`}>
        <g className="em-construction">
          {CONSTRUCTION.map((r) => <circle key={r} r={r} />)}
          {[0, 30, 60, 90, 120, 150].map((a) => <line key={a} x1={-96} y1={0} x2={96} y2={0} transform={`rotate(${a})`} />)}
        </g>
        {body(motif, ids, active, plate)}
      </g>
    </svg>
  );
};
