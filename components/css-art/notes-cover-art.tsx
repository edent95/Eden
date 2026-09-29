import React from 'react';
import { curvePoints, pathOf } from '../../app/kaleido';

/* ---- Notes cover line-art heroes (styles/css-art/notes-covers.css, `.cvx`) ----
   Cover heroes drawn as engravings from formulas instead of stacked blocks:
   bundles of hairlines (one curve repeated with small offsets reads as a
   silk ribbon), dotted construction, gold foil only where the story turns.
   Lines draw themselves in (pathLength = 1) and one foil stroke keeps flowing. */

type Pt = [number, number];
const P = (pts: Pt[]) => pathOf(pts);
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ---------- confluence: three rivers fall into one basin and spiral to its centre ---------- */

const BASIN_Y = 78;       // basin centre (screen)
const SQUASH = 0.4;       // the basin is seen from above at an angle: y scaled by this
const RIM = 150;
const STRANDS = 7;
const ARMS = [-90, -150, -30].map((d) => (d * Math.PI) / 180); // enter at the back rim
const SOURCES: Pt[] = [[0, -150], [-128, -128], [128, -128]];

const toScreen = ([x, y]: Pt): Pt => [x, BASIN_Y + y * SQUASH];

// a logarithmic spiral arm r = R·e^(−kθ), each strand a hair wider or narrower
const spiralArm = (phi0: number, j: number): Pt[] => {
  const k = 0.3;
  return range(241).map((i) => {
    const th = (i / 240) * 3.4 * Math.PI;
    const r = RIM * spread(j) * Math.exp(-k * th);
    const a = phi0 + th;
    return toScreen([r * Math.cos(a), r * Math.sin(a)]);
  });
};

const spread = (j: number) => 1 + 0.03 * (j - (STRANDS - 1) / 2);

// a falling river: a cubic from its source that leaves straight down and arrives on the
// rim along the spiral's own tangent, so each strand runs on into its spiral strand
const fall = (src: Pt, phi0: number, j: number): Pt[] => {
  const r = RIM * spread(j);
  const k = 0.3;
  const end = toScreen([r * Math.cos(phi0), r * Math.sin(phi0)]);
  const tx = r * (-k * Math.cos(phi0) - Math.sin(phi0));
  const ty = r * (-k * Math.sin(phi0) + Math.cos(phi0)) * SQUASH;
  const len = Math.hypot(tx, ty) || 1;
  const start: Pt = [src[0] + (j - (STRANDS - 1) / 2) * 1.8, src[1] + 12];
  const c1: Pt = [start[0], start[1] + 70];
  const c2: Pt = [end[0] - (tx / len) * 80, end[1] - (ty / len) * 80];
  return range(61).map((i) => {
    const t = i / 60;
    const u = 1 - t;
    return [
      u * u * u * start[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * end[0],
      u * u * u * start[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * end[1],
    ];
  });
};

const RIVERS = (() => {
  const arms = ARMS.map((phi0) => range(STRANDS).map((j) => P(spiralArm(phi0, j))));
  const falls = ARMS.map((phi0, a) => range(STRANDS).map((j) => P(fall(SOURCES[a], phi0, j))));
  const ripples = [RIM, RIM * 0.78, RIM * 0.56, RIM * 0.34].map((r) =>
    P(range(121).map((i) => toScreen([r * Math.cos((i / 120) * 2 * Math.PI), r * Math.sin((i / 120) * 2 * Math.PI)]))));
  const rosette = P(curvePoints({ kind: 'hypo', R: 5, r: 3, d: 2.6 }, 9));
  return { arms, falls, ripples, rosette };
})();

export const CoverRiversArt: React.FC = () => (
  <svg className="cvx cvx-rivers" viewBox="-190 -175 380 330" aria-hidden>
    {RIVERS.ripples.map((d, i) => <path key={i} d={d} className={`cvx-dots${i === 0 ? ' is-rim' : ''}`} />)}
    {RIVERS.falls.map((bundle, a) => bundle.map((d, j) => (
      <path key={`f${a}${j}`} d={d} pathLength={1} className={`cvx-draw cvx-hair${a === 0 ? ' is-foil' : ''}`} style={{ '--i': a * STRANDS + j } as React.CSSProperties} />
    )))}
    {RIVERS.arms.map((bundle, a) => bundle.map((d, j) => (
      <path key={`s${a}${j}`} d={d} pathLength={1} className={`cvx-draw cvx-hair${a === 0 ? ' is-foil' : ''}`} style={{ '--i': 21 + a * STRANDS + j } as React.CSSProperties} />
    )))}
    {/* the flow: a foil glint travels down each river and into the spiral */}
    {RIVERS.arms.map((bundle, a) => (
      <g key={`flow${a}`}>
        <path d={RIVERS.falls[a][3]} pathLength={1} className="cvx-flow" style={{ '--i': a } as React.CSSProperties} />
        <path d={bundle[3]} pathLength={1} className="cvx-flow is-spiral" style={{ '--i': a } as React.CSSProperties} />
      </g>
    ))}
    {SOURCES.map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        <circle r={11} className="cvx-disc" />
        <path d={RIVERS.rosette} className="cvx-rosette" />
        <circle r={1.8} className="cvx-foil-dot" />
      </g>
    ))}
    <circle cx={0} cy={BASIN_Y} r={3.2} className="cvx-foil-dot" />
  </svg>
);

/* ---------- the mad bull: an exponential climb that hits a wall and shatters ---------- */

const X0 = 18;
const IMPACT_X = 286;
const BASE = 272;
const rise = (x: number) => BASE - 12 * Math.exp((x - X0) / 86);
const IMPACT_Y = rise(IMPACT_X);
const BUNDLE = 9;

const CHART = (() => {
  const strands = range(BUNDLE).map((j) => {
    const off = (j - (BUNDLE - 1) / 2) * 2.3;
    return P(range(121).map((i) => {
      const x = X0 + (i / 120) * (IMPACT_X - X0);
      return [x, rise(x) + off * (0.35 + (x - X0) / (IMPACT_X - X0))];
    }));
  });
  const shards = range(6).map((j) => {
    const back = 34 + j * 17;
    const drop = BASE - 6 - IMPACT_Y - j * 7;
    const pts: Pt[] = range(41).map((i) => {
      const t = i / 40;
      return [IMPACT_X - 3 - back * t, IMPACT_Y + j * 2.2 + drop * t * t];
    });
    return { d: P(pts), end: pts[pts.length - 1] };
  });
  const candles = range(13).map((i) => {
    const x = X0 + 10 + i * 20;
    const y = rise(x);
    return { x, y, body: 6 + (i % 3) * 2.5, wick: 10 + (i % 4) * 3 };
  });
  const burst = range(16).map((i) => {
    const a = (i / 16) * 2 * Math.PI;
    const r0 = 6;
    const r1 = i % 2 ? 16 : 28;
    return `M${(IMPACT_X + r0 * Math.cos(a)).toFixed(2)} ${(IMPACT_Y + r0 * Math.sin(a)).toFixed(2)}L${(IMPACT_X + r1 * Math.cos(a)).toFixed(2)} ${(IMPACT_Y + r1 * Math.sin(a)).toFixed(2)}`;
  }).join('');
  return { strands, shards, candles, burst };
})();

export const CoverChartArt: React.FC = () => {
  const raw = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const hatch = `cvh${raw}`;
  return (
    <svg className="cvx cvx-chart" viewBox="0 0 380 300" aria-hidden>
      <defs>
        <pattern id={hatch} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="4" className="cvx-hatch" />
        </pattern>
      </defs>
      {/* construction: golden-ratio verticals and a dotted baseline */}
      {[0.382, 0.618].map((f) => <line key={f} x1={380 * f} y1={18} x2={380 * f} y2={BASE} className="cvx-construct" />)}
      <line x1={8} y1={BASE + 4} x2={372} y2={BASE + 4} className="cvx-dots is-rim" />
      {/* the wall: a hatched slab with courses of fine waves */}
      <rect x={IMPACT_X + 4} y={24} width={40} height={BASE - 20} rx={2} fill={`url(#${hatch})`} className="cvx-wall" />
      {range(11).map((i) => {
        const y = 36 + i * 22;
        return <path key={i} d={P(range(21).map((k) => [IMPACT_X + 4 + k * 2, y + 1.6 * Math.sin(k * 0.9 + i)]))} className="cvx-course" />;
      })}
      <line x1={IMPACT_X + 4} y1={24} x2={IMPACT_X + 4} y2={BASE + 4} className="cvx-wall-edge" />
      {/* candles along the climb, drawn as hairline bodies on wicks */}
      {CHART.candles.map((c, i) => (
        <g key={i} className="cvx-candle" style={{ '--i': i } as React.CSSProperties}>
          <line x1={c.x} y1={c.y - c.wick} x2={c.x} y2={c.y + c.wick} />
          <rect x={c.x - 3} y={c.y - c.body / 2} width={6} height={c.body} rx={1} className={i > 9 ? 'is-foil' : undefined} />
        </g>
      ))}
      {CHART.strands.map((d, j) => (
        <path key={j} d={d} pathLength={1} className={`cvx-draw cvx-hair${j === 4 ? ' is-foil is-lead' : ''}`} style={{ '--i': j } as React.CSSProperties} />
      ))}
      {/* after impact the bundle breaks into shards that fall back on parabolas */}
      {CHART.shards.map(({ d, end }, j) => (
        <g key={`s${j}`}>
          <path d={d} pathLength={1} className="cvx-draw cvx-hair is-shard" style={{ '--i': 60 + j * 3 } as React.CSSProperties} />
          <circle cx={end[0]} cy={end[1]} r={j % 2 ? 1.4 : 2.2} className="cvx-foil-dot cvx-shard-end" style={{ '--i': j } as React.CSSProperties} />
        </g>
      ))}
      <path d={CHART.burst} className="cvx-burst" />
      <circle cx={IMPACT_X} cy={IMPACT_Y} r={3.4} className="cvx-foil-dot" />
      {/* a pen point keeps climbing the lead curve */}
      <circle r={2.6} className="cvx-pen">
        <animateMotion dur="7s" repeatCount="indefinite" path={CHART.strands[4]} />
      </circle>
    </svg>
  );
};
