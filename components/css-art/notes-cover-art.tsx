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

/* =====================================================================
   The other thirteen covers, same language. Shared helpers first.
   ===================================================================== */

const TAU = Math.PI * 2;
const f = (n: number) => n.toFixed(2);
const seg = (a: Pt, b: Pt) => `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`;
const ell = (cx: number, cy: number, rx: number, ry: number, a0 = 0, a1 = TAU, n = 72): string =>
  P(range(n + 1).map((i) => {
    const a = a0 + ((a1 - a0) * i) / n;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  }));
const css = (vars: Record<string, string | number>) => vars as React.CSSProperties;

// deterministic pseudo-random numbers, so every render draws the same picture
const rng = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Stroke = { d: string; c?: string; i?: number };
const Draw: React.FC<Stroke> = ({ d, c = '', i = 0 }) => (
  <path d={d} pathLength={1} className={`cvx-draw cvx-hair ${c}`} style={css({ '--i': i })} />
);
const Art: React.FC<{ name: string; children: React.ReactNode; defs?: React.ReactNode }> = ({ name, children, defs }) => (
  <svg className={`cvx cvx-${name}`} viewBox="-190 -150 380 300" aria-hidden>
    {defs ? <defs>{defs}</defs> : null}
    {children}
  </svg>
);
const Hatch: React.FC<{ id: string; angle?: number; gap?: number }> = ({ id, angle = 38, gap = 4 }) => (
  <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
    <line x1="0" y1="0" x2="0" y2={gap} className="cvx-hatch" />
  </pattern>
);
const useUid = (prefix: string) => `${prefix}${React.useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

/* ---------- book: an open book whose pages fan as curves, an evidence network above ---------- */

const BOOK = (() => {
  const pages = range(11).flatMap((k) => [-1, 1].map((side) => P(range(41).map((i) => {
    const t = i / 40;
    return [side * 150 * t, 70 + 16 * t - (5 + k * 2.6) * Math.sin(Math.PI * Math.pow(t, 0.8)) - k * 1.1 * t];
  }))));
  const boards = [-1, 1].map((side) => P([[0, 78], [side * 156, 94], [side * 156, 84]]));
  // evidence nodes on a golden-angle spiral above the book
  const nodes: Pt[] = range(14).map((n) => {
    const r = 17 * Math.sqrt(n + 1);
    const a = (n + 1) * 2.39996;
    return [r * Math.cos(a) * 1.7, -48 + r * Math.sin(a) * 0.9];
  });
  const sag = (a: Pt, b: Pt, depth: number) => {
    const m: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + depth];
    return `M${f(a[0])} ${f(a[1])}Q${f(m[0])} ${f(m[1])} ${f(b[0])} ${f(b[1])}`;
  };
  const edges: string[] = [];
  nodes.forEach((p, i) => {
    const near = nodes.slice(0, i).map((q, j) => [Math.hypot(p[0] - q[0], p[1] - q[1]), j] as const).sort((x, y) => x[0] - y[0]).slice(0, 2);
    near.forEach(([dist, j]) => edges.push(sag(p, nodes[j], dist * 0.12)));
  });
  const threads = [0, 4, 9].map((n) => sag([0, 52], nodes[n], 14));
  return { pages, boards, nodes, edges, threads };
})();

export const CoverBookArt: React.FC = () => (
  <Art name="book">
    {BOOK.edges.map((d, i) => <Draw key={`e${i}`} d={d} c="is-faint" i={30 + i} />)}
    {BOOK.threads.map((d, i) => <Draw key={`t${i}`} d={d} c="is-foil" i={24 + i} />)}
    {BOOK.pages.map((d, i) => <Draw key={`p${i}`} d={d} i={i} />)}
    {BOOK.boards.map((d, i) => <Draw key={`b${i}`} d={d} c="is-strong" i={i} />)}
    <line x1={0} y1={52} x2={0} y2={80} className="cvx-spine" />
    {BOOK.nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={[0, 4, 9].includes(i) ? 3 : 1.8} className={[0, 4, 9].includes(i) ? 'cvx-foil-dot cvx-pop' : 'cvx-node cvx-pop'} style={css({ '--i': i })} />)}
  </Art>
);

/* ---------- coin-tower: stacks of coins as engraved cylinders, the tallest leaning and cracked ---------- */

const COIN_RX = 20;
const COIN_RY = 6;
const COIN_H = 5.6;
const TOWER = (() => {
  const stacks = [[-122, 9, 0], [-50, 14, 0], [24, 20, 0], [104, 27, 1]].map(([x0, n, lean]) => {
    const centre = (i: number): Pt => [x0 + (lean ? 0.055 * i * i : 0), 118 - i * COIN_H];
    const fronts = range(n).map((i) => { const [cx, cy] = centre(i); return ell(cx, cy, COIN_RX, COIN_RY, 0, Math.PI, 24); });
    const top = centre(n);
    const sides = [-1, 1].map((s) => P(range(n + 1).map((i) => { const [cx, cy] = centre(i); return [cx + s * COIN_RX, cy]; })));
    return { fronts, top: ell(top[0], top[1], COIN_RX, COIN_RY), sides, lean };
  });
  const r = rng(7);
  const crackPts: Pt[] = range(9).map((i) => [104 + 0.055 * (8 + i) ** 2 - 14 + i * 3.4 + (r() - 0.5) * 6, 118 - (8 + i) * COIN_H + (r() - 0.5) * 3]);
  return { stacks, crack: P(crackPts) };
})();

export const CoverCoinTowerArt: React.FC = () => (
  <Art name="coin-tower">
    <path d={ell(0, 124, 176, 14)} className="cvx-dots is-rim" />
    {TOWER.stacks.map((s, k) => (
      <g key={k}>
        {s.sides.map((d, i) => <Draw key={`s${i}`} d={d} c="is-strong" i={k * 3} />)}
        {s.fronts.map((d, i) => <Draw key={i} d={d} c={s.lean ? 'is-foil' : ''} i={k * 3 + i * 0.4} />)}
        <Draw d={s.top} c="is-foil is-strong" i={k * 3 + 6} />
      </g>
    ))}
    <Draw d={TOWER.crack} c="is-lead" i={50} />
  </Art>
);

/* ---------- coin-spin: a spinning coin (its sweep drawn as a sphere of ellipses) over a recruitment pyramid ---------- */

const SPIN = (() => {
  const sweep = range(12).map((k) => ell(0, -62, 58 * Math.abs(Math.cos((k * Math.PI) / 12)), 58, 0, TAU, 60));
  const rows = [1, 2, 3, 4, 5];
  const coins: Pt[][] = rows.map((n, row) => range(n).map((i) => [(i - (n - 1) / 2) * 44, 24 + row * 25]));
  const links: string[] = [];
  coins.forEach((row, r) => { if (r < coins.length - 1) row.forEach((p, i) => [i, i + 1].forEach((j) => links.push(seg(p, coins[r + 1][j])))); });
  return { sweep, coins, links };
})();

export const CoverCoinSpinArt: React.FC = () => (
  <Art name="coin-spin">
    {SPIN.sweep.map((d, i) => <Draw key={i} d={d} c="is-faint" i={i} />)}
    <g className="cvx-spin"><path d={ell(0, -62, 58, 58)} className="cvx-coin-rim" /><path d={ell(0, -62, 49, 49)} className="cvx-coin-mill" /></g>
    <line x1={0} y1={-4} x2={0} y2={20} className="cvx-dots" />
    {SPIN.links.map((d, i) => <Draw key={`l${i}`} d={d} c="is-faint" i={14 + i * 0.3} />)}
    {SPIN.coins.flat().map(([x, y], i) => (
      <g key={i} className="cvx-pop" style={css({ '--i': i })}>
        <path d={ell(x, y + 2.4, 13, 4.2, 0, Math.PI, 16)} className="cvx-coin-edge" />
        <path d={ell(x, y, 13, 4.2)} className={i === 0 ? 'cvx-coin-top is-foil' : 'cvx-coin-top'} />
      </g>
    ))}
  </Art>
);

/* ---------- balance: money on one pan, a sprouting fern on the other, strings hung as catenaries ---------- */

const BAL = (() => {
  const tilt = (-5 * Math.PI) / 180;
  const pivot: Pt = [0, -64];
  const end = (s: number): Pt => [pivot[0] + s * 128 * Math.cos(tilt), pivot[1] + s * 128 * Math.sin(tilt)];
  const beamWaves = [0, Math.PI].map((ph) => P(range(81).map((i) => {
    const t = i / 80 * 2 - 1;
    const [x, y] = [t * 128 * Math.cos(tilt), pivot[1] + t * 128 * Math.sin(tilt)];
    return [x, y + 2.4 * Math.sin(t * 22 + ph)];
  })));
  const pans = [-1, 1].map((s) => {
    const [ex, ey] = end(s);
    const py = ey + 88;
    const strings = [-1, 0, 1].map((k) => {
      const b: Pt = [ex + k * 30, py];
      const m: Pt = [(ex + b[0]) / 2 + k * 3, (ey + py) / 2];
      return `M${f(ex)} ${f(ey)}Q${f(m[0])} ${f(m[1])} ${f(b[0])} ${f(b[1])}`;
    });
    return { ex, ey, py, strings, bowl: ell(ex, py, 34, 9, 0, Math.PI, 30), rim: ell(ex, py, 34, 9) };
  });
  // the sprout: a stem, a fiddlehead (a golden spiral) and two leaves as vesicae
  const [rx, , rpy] = [pans[1].ex, pans[1].ey, pans[1].py];
  const stem = `M${f(rx)} ${f(rpy - 2)}C${f(rx - 4)} ${f(rpy - 20)} ${f(rx + 6)} ${f(rpy - 34)} ${f(rx)} ${f(rpy - 46)}`;
  const b = Math.log((1 + Math.sqrt(5)) / 2) / (Math.PI / 2);
  const fiddle = P(range(80).map((i) => { const th = -i * 0.12; const r = 9 * Math.exp(b * th); return [rx + r * Math.cos(th) - 9, rpy - 46 + r * Math.sin(th)]; }));
  const leaf = (s: number) => `M${f(rx)} ${f(rpy - 26)}Q${f(rx + s * 14)} ${f(rpy - 40)} ${f(rx + s * 26)} ${f(rpy - 30)}Q${f(rx + s * 12)} ${f(rpy - 20)} ${f(rx)} ${f(rpy - 26)}`;
  const coins = range(5).map((i) => ell(pans[0].ex, pans[0].py - 4 - i * 4.2, 14, 4, 0, TAU, 24));
  return { pivot, beam: seg(end(-1), end(1)), beamWaves, pans, stem, fiddle, leaves: [leaf(-1), leaf(1)], coins };
})();

export const CoverBalanceArt: React.FC = () => (
  <Art name="balance">
    <path d={ell(0, 128, 90, 10)} className="cvx-dots is-rim" />
    <Draw d={`M-40 128L0 116L40 128`} c="is-strong" i={0} />
    <Draw d={`M-3 116L-3 ${BAL.pivot[1]}M3 116L3 ${BAL.pivot[1]}`} c="is-strong" i={1} />
    <Draw d={BAL.beam} c="is-strong" i={3} />
    {BAL.beamWaves.map((d, i) => <Draw key={i} d={d} c="is-foil" i={4 + i} />)}
    {BAL.pans.map((p, k) => (
      <g key={k}>
        {p.strings.map((d, i) => <Draw key={i} d={d} c="is-faint" i={8 + i} />)}
        <Draw d={p.bowl} c="is-strong" i={12} />
        <Draw d={p.rim} i={12} />
      </g>
    ))}
    {BAL.coins.map((d, i) => <Draw key={`c${i}`} d={d} c="is-foil" i={16 + i} />)}
    <Draw d={BAL.stem} c="is-lead" i={20} />
    <Draw d={BAL.fiddle} c="is-foil" i={22} />
    {BAL.leaves.map((d, i) => <Draw key={`v${i}`} d={d} i={24 + i} />)}
    <circle cx={BAL.pivot[0]} cy={BAL.pivot[1]} r={5} className="cvx-disc" /><circle cx={BAL.pivot[0]} cy={BAL.pivot[1]} r={2} className="cvx-foil-dot" />
  </Art>
);

/* ---------- hourglass: a hyperboloid of one sheet ruled by straight lines, sand as dots ---------- */

const GLASS = (() => {
  const R = 78;
  const H = 108;
  const tw = (150 * Math.PI) / 180;
  const top = (a: number): Pt => [R * Math.cos(a), -H + 15 * Math.sin(a)];
  const bot = (a: number): Pt => [R * Math.cos(a), H + 15 * Math.sin(a)];
  const rulings = [1, -1].map((dir) => range(24).map((k) => { const a = (k / 24) * TAU; return seg(top(a), bot(a + dir * tw)); }));
  const neck = R * Math.cos(tw / 2);
  const radius = (y: number) => Math.sqrt(neck ** 2 + (R ** 2 - neck ** 2) * (y / H) ** 2);
  const sand: Pt[] = [];
  const r = rng(11);
  for (let i = 0; i < 260; i += 1) {
    const top = i < 110;
    const y = top ? -12 - r() * 46 : H - 4 - Math.pow(r(), 1.6) * 44;
    const w = top ? radius(y) * 0.86 : Math.min(radius(y) * 0.86, (H - y) * 1.7);
    sand.push([(r() * 2 - 1) * w, y]);
  }
  return { rulings, sand, caps: [ell(0, -H, R + 10, 17), ell(0, -H - 8, R + 10, 17), ell(0, H, R + 10, 17), ell(0, H + 8, R + 10, 17)] };
})();

export const CoverHourglassArt: React.FC = () => (
  <Art name="hourglass">
    <path d={ell(0, 0, 150, 34)} className="cvx-dots is-rim" />
    {GLASS.rulings.map((fam, k) => fam.map((d, i) => <Draw key={`${k}${i}`} d={d} c={k ? 'is-foil is-faint' : 'is-faint'} i={i + k * 6} />))}
    {GLASS.caps.map((d, i) => <Draw key={`c${i}`} d={d} c="is-strong" i={i} />)}
    {[-1, 1].map((s) => <Draw key={`p${s}`} d={seg([s * 88, -104], [s * 88, 112])} c="is-strong" i={2} />)}
    {GLASS.sand.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.1} className="cvx-sand" />)}
    <line x1={0} y1={-10} x2={0} y2={102} className="cvx-stream" />
  </Art>
);

/* ---------- maze: a circular labyrinth seen at an angle, walls with height, one golden way in ---------- */

const MAZE = (() => {
  const SQ = 0.46;
  const CY = 34;
  const WALL = 11;
  const radii = [30, 52, 74, 96, 118, 140];
  const gaps = [1.2, 4.1, 2.3, 5.4, 0.4, 3.3];
  const pt = (r: number, a: number, lift = 0): Pt => [r * Math.cos(a), CY + r * Math.sin(a) * SQ - lift];
  const arc = (r: number, a0: number, a1: number, lift: number) => P(range(90).map((i) => pt(r, a0 + ((a1 - a0) * i) / 89, lift)));
  const walls = radii.flatMap((r, k) => {
    const g = gaps[k];
    const a0 = g + 0.22;
    const a1 = g + TAU - 0.22;
    return [
      { d: arc(r, a0, a1, 0), c: 'is-faint' },
      { d: arc(r, a0, a1, WALL), c: '' },
      { d: seg(pt(r, a0), pt(r, a0, WALL)) + seg(pt(r, a1), pt(r, a1, WALL)), c: 'is-faint' },
    ];
  });
  // the golden way: in through each gap, round the corridor to the next gap
  const way: Pt[] = [pt(158, gaps[5], 4)];
  for (let k = 5; k >= 0; k -= 1) {
    way.push(pt(radii[k], gaps[k], 4));
    const mid = (radii[k] + (radii[k - 1] ?? 0)) / 2;
    const from = gaps[k];
    const to = k > 0 ? gaps[k - 1] : gaps[k] + 1.4;
    let span = to - from;
    if (k % 2) span = span > 0 ? span - TAU : span;
    else span = span < 0 ? span + TAU : span;
    range(40).forEach((i) => way.push(pt(k > 0 ? mid : 10, from + (span * (i + 1)) / 40, 4)));
  }
  return { walls, way: P(way) };
})();

export const CoverMazeArt: React.FC = () => (
  <Art name="maze">
    {MAZE.walls.map((w, i) => <Draw key={i} d={w.d} c={w.c} i={i * 0.5} />)}
    <Draw d={MAZE.way} c="is-lead" i={20} />
    <circle cx={0} cy={30} r={3.4} className="cvx-foil-dot cvx-pop" style={css({ '--i': 30 })} />
  </Art>
);

/* ---------- lens: many rays of information pass a lens; the aberration draws a caustic; one focus ---------- */

const LENS = (() => {
  const rays = range(19).map((k) => {
    const y = -72 + k * 8;
    const focus = 118 - 0.0065 * y * y;
    const slope = -y / focus;
    const x1 = 186;
    return P([[-186, y], [0, y], [x1, y + slope * x1]]);
  });
  const r = rng(5);
  const noise = range(9).map(() => {
    const y0 = (r() - 0.5) * 240;
    const y1 = (r() - 0.5) * 240;
    return seg([-186, y0], [-20, y1]);
  });
  const face = (s: number, k: number) => P(range(41).map((i) => { const t = i / 40 * 2 - 1; return [s * (24 - k * 7) * (1 - t * t), t * 82]; }));
  return { rays, noise, faces: [face(-1, 0), face(1, 0), face(-1, 1), face(1, 1), face(-1, 2), face(1, 2)] };
})();

export const CoverLensArt: React.FC = () => (
  <Art name="lens">
    {LENS.noise.map((d, i) => <Draw key={`n${i}`} d={d} c="is-faint is-dash" i={i} />)}
    {LENS.rays.map((d, i) => <Draw key={i} d={d} c={i === 9 ? 'is-lead' : i % 3 === 0 ? 'is-foil' : ''} i={4 + i * 0.5} />)}
    {LENS.faces.map((d, i) => <Draw key={`f${i}`} d={d} c={i < 2 ? 'is-strong' : 'is-faint'} i={2} />)}
    <g className="cvx-pop" style={css({ '--i': 40 })}>
      <circle cx={118} cy={0} r={4} className="cvx-foil-dot" />
      <path d={range(12).map((i) => { const a = (i / 12) * TAU; const l = i % 2 ? 9 : 16; return seg([118 + 6 * Math.cos(a), 6 * Math.sin(a)], [118 + l * Math.cos(a), l * Math.sin(a)]); }).join('')} className="cvx-burst" />
    </g>
  </Art>
);

/* ---------- gears: a Lorenz attractor (chaos) runs into two meshing gears and leaves as a clean sine ---------- */

const GEARS = (() => {
  let [x, y, z] = [0.1, 0, 0];
  const pts: Pt[] = [];
  for (let i = 0; i < 4200; i += 1) {
    const dt = 0.006;
    const dx = 10 * (y - x);
    const dy = x * (28 - z) - y;
    const dz = x * y - (8 / 3) * z;
    x += dx * dt; y += dy * dt; z += dz * dt;
    if (i > 200 && i % 2 === 0) pts.push([-112 + x * 2.9, 58 - (z - 24) * 2.7]);
  }
  const gear = (cx: number, cy: number, R: number, n: number, phase: number) => P(range(n * 24 + 1).map((i) => {
    const a = (i / (n * 24)) * TAU + phase;
    const r = R + 5.5 * Math.max(-1, Math.min(1, 2.4 * Math.cos(n * (a - phase))));
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }));
  const g1: Pt = [34, -18];
  const g2: Pt = [34 + 80 * Math.cos(0.62), -18 + 80 * Math.sin(0.62)];
  const spokes = (c: Pt, R: number, n: number) => range(n).map((k) => { const a = (k / n) * TAU; return seg([c[0] + 8 * Math.cos(a), c[1] + 8 * Math.sin(a)], [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)]); }).join('');
  const sine = P(range(61).map((i) => { const xx = g2[0] + 34 + i * 1.3; return [xx, g2[1] + 9 * Math.sin(i / 4.2)]; }));
  const feed = `M${f(pts[pts.length - 1][0])} ${f(pts[pts.length - 1][1])}Q${f(-20)} ${f(-70)} ${f(g1[0] - 50)} ${f(g1[1])}`;
  return { lorenz: P(pts), g1, g2, gear1: gear(g1[0], g1[1], 44, 14, 0), gear2: gear(g2[0], g2[1], 30, 10, 0.16), spokes1: spokes(g1, 34, 6), spokes2: spokes(g2, 21, 5), sine, feed };
})();

export const CoverGearsArt: React.FC = () => (
  <Art name="gears">
    <Draw d={GEARS.lorenz} c="is-faint is-fine" i={0} />
    <Draw d={GEARS.feed} c="is-foil is-dash" i={10} />
    <g className="cvx-turn" style={css({ '--dur': '28s' })}>
      <Draw d={GEARS.gear1} c="is-strong" i={4} />
      <Draw d={GEARS.spokes1} c="is-faint" i={6} />
      <path d={ell(GEARS.g1[0], GEARS.g1[1], 30, 30)} className="cvx-dots" />
    </g>
    <g className="cvx-turn is-back" style={css({ '--dur': '20s' })}>
      <Draw d={GEARS.gear2} c="is-foil is-strong" i={8} />
      <Draw d={GEARS.spokes2} c="is-faint" i={9} />
    </g>
    <circle cx={GEARS.g1[0]} cy={GEARS.g1[1]} r={6} className="cvx-disc" /><circle cx={GEARS.g2[0]} cy={GEARS.g2[1]} r={4.5} className="cvx-disc" />
    <Draw d={GEARS.sine} c="is-lead" i={16} />
  </Art>
);

/* ---------- chess: a board in true perspective, a king turned on a lathe, a knight's path in gold ---------- */

const CHESS = (() => {
  const vp: Pt = [0, -260];
  const near = 132;
  const far = 22;
  const depthY = (t: number) => { const zf = 1 / (1 + 2.2 * t); return far + (near - far) * ((zf - 1 / 3.2) / (1 - 1 / 3.2)); };
  const at = (u: number, t: number): Pt => { const y = depthY(t); const k = (y - vp[1]) / (near - vp[1]); return [u * 176 * k, y]; };
  const lines = [
    ...range(9).map((i) => seg(at(-1, i / 8), at(1, i / 8))),
    ...range(9).map((i) => seg(at(-1 + i / 4, 0), at(-1 + i / 4, 1))),
  ];
  const squares: string[] = [];
  range(8).forEach((r) => range(8).forEach((c) => {
    if ((r + c) % 2) return;
    const q = [at(-1 + c / 4, r / 8), at(-1 + (c + 1) / 4, r / 8), at(-1 + (c + 1) / 4, (r + 1) / 8), at(-1 + c / 4, (r + 1) / 8)];
    squares.push(`${P(q)}Z`);
  }));
  const centre = (c: number, r: number) => at(-1 + (c + 0.5) / 4, (r + 0.5) / 8);
  // the king, turned: profile radius as a function of height
  const base = centre(3, 2);
  const prof = (h: number) => 16 - 7 * Math.sin((h / 90) * Math.PI * 0.9) + (h > 70 ? 5 * Math.sin(((h - 70) / 20) * Math.PI) : 0) + (h < 8 ? 4 : 0);
  const rings = range(10).map((i) => { const h = i * 9.5; const r = prof(h); return ell(base[0], base[1] - h, r, r * 0.3, 0, TAU, 40); });
  const sil = [-1, 1].map((s) => P(range(46).map((i) => { const h = i * 2; return [base[0] + s * prof(h), base[1] - h]; })));
  const crown = seg([base[0], base[1] - 90], [base[0], base[1] - 110]) + seg([base[0] - 8, base[1] - 102], [base[0] + 8, base[1] - 102]);
  // a knight's tour fragment: L-moves as arcs
  const tour: Array<[number, number]> = [[1, 0], [2, 2], [4, 3], [6, 4], [5, 6]];
  const hops = tour.slice(1).map(([c, r], i) => {
    const a = centre(...tour[i]);
    const b = centre(c, r);
    const m: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 30];
    return `M${f(a[0])} ${f(a[1])}Q${f(m[0])} ${f(m[1])} ${f(b[0])} ${f(b[1])}`;
  });
  return { lines, squares, rings, sil, crown, hops, stops: tour.map(([c, r]) => centre(c, r)) };
})();

export const CoverChessArt: React.FC = () => {
  const id = useUid('cvc');
  return (
    <Art name="chess" defs={<Hatch id={id} angle={45} gap={3.4} />}>
      {CHESS.squares.map((d, i) => <path key={i} d={d} fill={`url(#${id})`} className="cvx-square cvx-pop" style={css({ '--i': i * 0.3 })} />)}
      {CHESS.lines.map((d, i) => <Draw key={`l${i}`} d={d} c="is-faint" i={i * 0.4} />)}
      {CHESS.hops.map((d, i) => <Draw key={`h${i}`} d={d} c="is-lead" i={24 + i * 2} />)}
      {CHESS.stops.map(([x, y], i) => <circle key={`s${i}`} cx={x} cy={y} r={2.6} className="cvx-foil-dot cvx-pop" style={css({ '--i': 30 + i })} />)}
      {CHESS.sil.map((d, i) => <Draw key={`k${i}`} d={d} c="is-strong" i={14} />)}
      {CHESS.rings.map((d, i) => <Draw key={`r${i}`} d={d} c={i === 0 ? 'is-strong' : 'is-faint'} i={15 + i * 0.4} />)}
      <Draw d={CHESS.crown} c="is-foil is-strong" i={20} />
    </Art>
  );
};

/* ---------- button: a key pressed into a damped ripple surface, feedback arcs above ---------- */

const BUTTON = (() => {
  const CY = 58;
  const rings = range(16).map((k) => {
    const r = 44 + k * 9;
    const z = 16 * Math.exp(-r / 80) * Math.cos(r / 11);
    return { d: ell(0, CY - z, r, r * 0.34, 0, TAU, 80), strong: k % 4 === 0 };
  });
  const arcs = range(3).map((k) => ell(0, -34, 40 + k * 18, 18 + k * 8, Math.PI * 1.15, Math.PI * 1.85, 30));
  return { rings, arcs, CY };
})();

export const CoverButtonArt: React.FC = () => (
  <Art name="button">
    {BUTTON.rings.map((r, i) => <Draw key={i} d={r.d} c={r.strong ? '' : 'is-faint'} i={i * 0.6} />)}
    <Draw d={ell(0, BUTTON.CY, 40, 13.6)} c="is-strong" i={0} />
    <g className="cvx-press">
      <Draw d={`M-32 ${BUTTON.CY - 2}L-32 ${BUTTON.CY - 20}M32 ${BUTTON.CY - 2}L32 ${BUTTON.CY - 20}`} c="is-strong" i={2} />
      <Draw d={ell(0, BUTTON.CY - 2, 32, 11, 0, Math.PI, 30)} c="is-strong" i={2} />
      <Draw d={ell(0, BUTTON.CY - 20, 32, 11)} c="is-foil is-strong" i={3} />
      <Draw d={ell(0, BUTTON.CY - 20, 22, 7.5)} c="is-foil" i={4} />
    </g>
    {BUTTON.arcs.map((d, i) => <path key={`a${i}`} d={d} className="cvx-wave" style={css({ '--i': i })} />)}
  </Art>
);

/* ---------- vinyl: an Archimedean groove spiral seen at an angle, a tonearm, the sound as a square wave's Fourier partial sums ---------- */

const VINYL = (() => {
  const CX = -26;
  const CY = 52;
  const SQ = 0.38;
  const turns = 34;
  const groove = P(range(turns * 60 + 1).map((i) => {
    const th = (i / 60) * TAU;
    const r = 132 - (98 * i) / (turns * 60);
    return [CX + r * Math.cos(th), CY + r * Math.sin(th) * SQ];
  }));
  const needle: Pt = [CX + 104 * Math.cos(-0.35), CY + 104 * Math.sin(-0.35) * SQ];
  const arm = P([[150, -46], [132, 10], needle]);
  // a square wave assembled from its odd-harmonic partial sums, rising from the needle
  const partials = range(5).map((n) => P(range(161).map((i) => {
    const t = i / 160;
    const x = needle[0] - 20 - t * 230;
    let y = 0;
    for (let k = 0; k <= n; k += 1) y += Math.sin((2 * k + 1) * t * 3 * TAU) / (2 * k + 1);
    return [x, needle[1] - 80 - t * 60 + y * 13];
  })));
  return { groove, label: [ell(CX, CY, 30, 30 * SQ), ell(CX, CY, 24, 24 * SQ)], edge: ell(CX, CY + 6, 136, 136 * SQ, 0, Math.PI, 60), rim: ell(CX, CY, 136, 136 * SQ), arm, needle, partials, CX, CY };
})();

export const CoverVinylArt: React.FC = () => (
  <Art name="vinyl">
    <Draw d={VINYL.rim} c="is-strong" i={0} />
    <Draw d={VINYL.edge} c="is-strong" i={0} />
    <Draw d={VINYL.groove} c="is-faint is-fine" i={2} />
    <path d={VINYL.groove} pathLength={1} className="cvx-flow is-groove" />
    {VINYL.label.map((d, i) => <Draw key={i} d={d} c="is-foil is-strong" i={4} />)}
    <circle cx={VINYL.CX} cy={VINYL.CY} r={2.2} className="cvx-foil-dot" />
    <Draw d={VINYL.arm} c="is-strong" i={6} />
    <circle cx={150} cy={-46} r={7} className="cvx-disc" /><circle cx={150} cy={-46} r={2.4} className="cvx-foil-dot" />
    {VINYL.partials.map((d, i) => <Draw key={`p${i}`} d={d} c={i === 4 ? 'is-lead' : 'is-faint'} i={12 + i} />)}
  </Art>
);

/* ---------- chest: an isometric chest, lid open, a honeycomb of stored cells lit from inside ---------- */

const CHEST = (() => {
  const c30 = Math.cos(Math.PI / 6);
  const iso = (x: number, y: number, z: number): Pt => [(x - z) * c30, (x + z) * 0.5 - y + 20];
  const W = 150;
  const D = 92;
  const H = 70;
  const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number) => {
    const v = (x: number, y: number, z: number) => iso(x, y, z);
    return [
      P([v(x0, y0, z1), v(x1, y0, z1), v(x1, y1, z1), v(x0, y1, z1)]) + 'Z',
      P([v(x1, y0, z1), v(x1, y0, z0), v(x1, y1, z0), v(x1, y1, z1)]) + 'Z',
    ];
  };
  const X0 = -W / 2 + 10;
  const Z0 = -D / 2 - 30;
  const [front, side] = box(X0, X0 + W, 0, H, Z0, Z0 + D);
  const planks = range(4).map((k) => { const y = (H / 5) * (k + 1); return seg(iso(X0, y, Z0 + D), iso(X0 + W, y, Z0 + D)) + seg(iso(X0 + W, y, Z0 + D), iso(X0 + W, y, Z0)); });
  const bands = [0.18, 0.82].map((u) => { const x = X0 + W * u; return P([iso(x, 0, Z0 + D), iso(x, H, Z0 + D), iso(x, H, Z0)]); });
  // lid hinged on the back top edge, opened to 118°
  const open = (118 * Math.PI) / 180;
  const lid = P([iso(X0, H, Z0), iso(X0 + W, H, Z0), iso(X0 + W, H + D * Math.sin(open), Z0 - D * Math.cos(Math.PI - open)), iso(X0, H + D * Math.sin(open), Z0 - D * Math.cos(Math.PI - open))]) + 'Z';
  const top = P([iso(X0, H, Z0), iso(X0 + W, H, Z0), iso(X0 + W, H, Z0 + D), iso(X0, H, Z0 + D)]) + 'Z';
  // honeycomb on the inner floor, drawn in iso
  const hex = (cx: number, cz: number, r: number) => P(range(7).map((i) => { const a = (i / 6) * TAU + Math.PI / 6; return iso(cx + r * Math.cos(a), H - 4, cz + r * Math.sin(a)); }));
  const cells: string[] = [];
  range(5).forEach((row) => range(8).forEach((col) => {
    const cx = X0 + 14 + col * 17.3 + (row % 2) * 8.6;
    const cz = Z0 + 12 + row * 15;
    if (cx < X0 + W - 8 && cz < Z0 + D - 8) cells.push(hex(cx, cz, 9));
  }));
  const rays = range(9).map((k) => { const [x, y] = iso(X0 + 18 + k * 15, H, Z0 + D / 2); return seg([x, y - 6], [x, y - 40 - (k % 3) * 18]); });
  const lock = iso(X0 + W / 2, H * 0.6, Z0 + D);
  return { front, side, planks, bands, lid, top, cells, rays, lock };
})();

export const CoverChestArt: React.FC = () => (
  <Art name="chest">
    <Draw d={CHEST.lid} c="is-strong" i={0} />
    <Draw d={CHEST.top} c="is-faint" i={2} />
    {CHEST.cells.map((d, i) => <Draw key={`h${i}`} d={d} c="is-foil is-faint" i={6 + i * 0.25} />)}
    {CHEST.rays.map((d, i) => <path key={`r${i}`} d={d} pathLength={1} className="cvx-ray" style={css({ '--i': i })} />)}
    <Draw d={CHEST.front} c="is-strong" i={1} />
    <Draw d={CHEST.side} c="is-strong" i={1} />
    {CHEST.planks.map((d, i) => <Draw key={`p${i}`} d={d} c="is-faint" i={3 + i} />)}
    {CHEST.bands.map((d, i) => <Draw key={`b${i}`} d={d} c="is-lead" i={8 + i} />)}
    <circle cx={CHEST.lock[0]} cy={CHEST.lock[1]} r={7} className="cvx-disc" /><circle cx={CHEST.lock[0]} cy={CHEST.lock[1]} r={2.4} className="cvx-foil-dot" />
  </Art>
);

/* ---------- bolt: a lightning bolt by midpoint displacement, branching, with speed streaks ---------- */

const BOLT = (() => {
  const r = rng(23);
  const bolt = (a: Pt, b: Pt, depth: number, amp: number): Pt[] => {
    if (depth === 0) return [a, b];
    const m: Pt = [(a[0] + b[0]) / 2 + (r() - 0.5) * amp, (a[1] + b[1]) / 2 + (r() - 0.5) * amp * 0.3];
    return [...bolt(a, m, depth - 1, amp / 2), ...bolt(m, b, depth - 1, amp / 2).slice(1)];
  };
  const main = bolt([70, -150], [-30, 128], 7, 120);
  const branches = [18, 44, 80].map((idx, k) => {
    const start = main[idx];
    return P(bolt(start, [start[0] + (k % 2 ? 70 : -80), start[1] + 70 + k * 10], 5, 50));
  });
  const glow = [-3, 3].map((dx) => P(main.map(([x, y]) => [x + dx, y])));
  const streaks = range(12).map((k) => { const y = -110 + k * 20; const x0 = -186 + (k % 3) * 14; return seg([x0, y], [x0 + 60 + (k * 37) % 70, y]); });
  return { main: P(main), branches, glow, streaks };
})();

export const CoverBoltArt: React.FC = () => (
  <Art name="bolt">
    {BOLT.streaks.map((d, i) => <Draw key={`s${i}`} d={d} c="is-faint is-dash" i={i * 0.5} />)}
    {BOLT.branches.map((d, i) => <Draw key={`b${i}`} d={d} i={12 + i} />)}
    {BOLT.glow.map((d, i) => <Draw key={`g${i}`} d={d} c="is-foil is-faint" i={9} />)}
    <g className="cvx-flash"><Draw d={BOLT.main} c="is-lead" i={8} /></g>
    <path d={ell(-30, 132, 60, 10)} className="cvx-dots is-rim" />
  </Art>
);
