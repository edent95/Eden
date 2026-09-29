import React from 'react';
import {
  catenaryFamily, catenoidBack, catenoidFront, lissaFamily, mandelLemniscates, mandelSet,
  penroseThick, penroseThin, phyllo21, phyllo34, phylloSeeds, spiralArcs, spiralLog, spiralPole, spiralSquares,
} from './notes-math-geometry';
import type { NotesStoryMotif } from './index';

/* ---- Notes math emblems (styles/css-art/notes-emblems.css) ----
   Round plates for the Notes margins: each one plots its motif exactly
   (geometry from scripts/css-art/notes-emblems.py) over a construction grid
   of φ-spaced circles, with the formula engraved around the rim. When
   `active`, the curves draw themselves and a pen point travels the main curve. */

const RIM: Record<NotesStoryMotif, string> = {
  mandelbrot: 'zₙ₊₁ = zₙ² + c  ·  |zₙ(c)| = 2  ·  n = 1 … 7  ·  ',
  spiral: 'r = a·e^(bθ)  ·  b = ln φ ÷ (π/2)  ·  Fₙ₊₁ = Fₙ + Fₙ₋₁  ·  ',
  catenoid: 'r = c·cosh(z/c)  ·  H = (κ₁ + κ₂)/2 = 0  ·  ',
  catenary: 'y = a·cosh(x/a)  ·  s = a·sinh(x/a)  ·  T₀ = ρga  ·  ',
  penrose: 'fat : thin = φ  ·  36° · 72° · 108° · 144°  ·  deflate ×4  ·  ',
  phyllotaxis: 'θₙ = n · 137.508°  ·  rₙ = c√n  ·  13 · 21 · 34  ·  ',
  lissajous: 'x = sin(3t + δ)  ·  y = sin(2t)  ·  δ → δ + π/16  ·  ',
};

const CONSTRUCTION = [96, 96 / 1.618, 96 / 2.618, 96 / 4.236];

const Draw: React.FC<{ d: string; className: string; i?: number }> = ({ d, className, i = 0 }) => (
  <path d={d} pathLength={1} className={`em-draw ${className}`} style={{ '--i': i } as React.CSSProperties} />
);

const Pen: React.FC<{ path: string; dur: number }> = ({ path, dur }) => (
  <circle r={2.8} className="em-pen">
    <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
  </circle>
);

const body = (motif: NotesStoryMotif, ids: { hatch: string; hatch2: string }, active: boolean): React.ReactNode => {
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
      return (
        <>
          <Draw d={catenoidBack} className="em-ink em-faint" i={0} />
          <Draw d={catenoidFront} className="em-ink" i={2} />
          <ellipse cx={0} cy={-66.7} rx={58 * 0.62 * Math.cosh(1 / 0.62)} ry={58 * 0.3 * 0.62 * Math.cosh(1 / 0.62)} className="em-ring" />
          <ellipse cx={0} cy={66.7} rx={58 * 0.62 * Math.cosh(1 / 0.62)} ry={58 * 0.3 * 0.62 * Math.cosh(1 / 0.62)} className="em-ring" />
        </>
      );
    case 'catenary':
      return (
        <>
          {catenaryFamily.map((d, k) => <Draw key={k} d={d} className={k === 3 ? 'em-foil em-bold' : 'em-ink em-faint'} i={k} />)}
          <circle cx={-82} cy={-46} r={3.2} className="em-dot-foil" /><circle cx={82} cy={-46} r={3.2} className="em-dot-foil" />
          {active && <Pen path={catenaryFamily[3]} dur={6} />}
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

export const NotesMathEmblem: React.FC<{ motif: NotesStoryMotif; active?: boolean }> = ({ motif, active = false }) => {
  const raw = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const ids = { hatch: `emh${raw}`, hatch2: `emk${raw}`, clip: `emc${raw}`, ring: `emr${raw}` };
  const rim = RIM[motif].repeat(3);
  return (
    <svg className={`em em-${motif}${active ? ' is-active' : ''}`} viewBox="-110 -110 220 220" aria-hidden>
      <defs>
        <pattern id={ids.hatch} width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="3.2" height="3.2" className="em-pat-bg" /><line x1="0" y1="0" x2="0" y2="3.2" className="em-pat-line" />
        </pattern>
        <pattern id={ids.hatch2} width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <rect width="2.6" height="2.6" className="em-pat-bg2" /><line x1="0" y1="0" x2="0" y2="2.6" className="em-pat-line2" />
        </pattern>
        <clipPath id={ids.clip}><circle r={96} /></clipPath>
        <path id={ids.ring} d="M 0 -102 A 102 102 0 1 1 -0.01 -102" />
      </defs>
      <circle r={109} className="em-rim" />
      <circle r={97} className="em-face" />
      <g className="em-rim-text">
        <text><textPath href={`#${ids.ring}`}>{rim}</textPath></text>
      </g>
      <g clipPath={`url(#${ids.clip})`}>
        <g className="em-construction">
          {CONSTRUCTION.map((r) => <circle key={r} r={r} />)}
          {[0, 30, 60, 90, 120, 150].map((a) => <line key={a} x1={-96} y1={0} x2={96} y2={0} transform={`rotate(${a})`} />)}
        </g>
        {body(motif, ids, active)}
      </g>
    </svg>
  );
};
