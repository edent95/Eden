import React from 'react';

/**
 * `/igaming/atlas` optical night scenes (engraved-scenes, optical variant; ported from the
 * skill's `templates/optical.html`). One SVG plate per scene, viewBox 1600 × 700, sliced to
 * the frame: night sky, 40 construction rays and a one-point perspective floor, all aimed at
 * the scene's focus. Objects are thin gold outlines over 35° hatch; light is the subject.
 * No people, no text. Geometry is computed once at module load; styles in
 * `styles/pages/igaming-atlas-scenes.css`.
 *
 * - hero      one method, four kinds: a gold ray enters a prism and splits into four topic beams.
 * - chain     provider → me → merchant → players: six rays arrive, two pass the lens (me),
 *             go through the merchant's arch and land as pools on the floor (players).
 * - mirrors   A Rules & cost: one promise bounces between two mirrors, every bounce one more
 *             place it must hold (copy, back office, support, payout…).
 * - gates     B Partners & delivery: light from the vanishing point passes three gates, which
 *             light up near to far: every hand-off checked.
 * - lamps     C Players & service: two lamps, two beams; where their pools overlap is brightest:
 *             page, system and support telling one story.
 * - lens      D Data & evidence: a convex lens gathers parallel light into one focus over a
 *             small stand of bars: look closer before you believe it.
 */
export type AtlasOpticalKind = 'hero' | 'chain' | 'mirrors' | 'gates' | 'lamps' | 'lens';

const VB_W = 1600;
const VB_H = 700;
const HORIZON = 400;
const PHI = (1 + Math.sqrt(5)) / 2;

type Attrs = Record<string, string | number | undefined | false>;
const attrs = (o: Attrs) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== false)
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join(' ');
const el = (tag: string, o: Attrs = {}, kids: string | string[] = '') =>
  `<${tag} ${attrs(o)}>${Array.isArray(kids) ? kids.join('') : kids}</${tag}>`;
const f1 = (n: number) => Number(n.toFixed(1));

const FLOOR_Y = [400, 412, 427, 446, 470, 500, 538, 586, 646];
const FLOOR_X = Array.from({ length: 21 }, (_, i) => (i - 10) * 160);
const FADE: Record<string, [number, number, number, number]> = { r: [0, 0, 1, 0], l: [1, 0, 0, 0], d: [0, 0, 0, 1], u: [0, 1, 0, 0] };

/** Shared plate: sky, rays, floor, hatch patterns and four fade masks, all around `vp`. */
function plate(id: string, vp: [number, number], children: string[]): string {
  const cx = `${(vp[0] / VB_W) * 100}%`;
  const cy = `${(vp[1] / VB_H) * 100}%`;
  const fades = Object.entries(FADE).map(
    ([dir, [x1, y1, x2, y2]]) =>
      el('linearGradient', { id: `${id}-fade-${dir}`, x1, y1, x2, y2 }, [
        el('stop', { offset: 0, 'stop-color': '#fff', 'stop-opacity': 1 }),
        el('stop', { offset: 0.7, 'stop-color': '#fff', 'stop-opacity': 0.55 }),
        el('stop', { offset: 1, 'stop-color': '#fff', 'stop-opacity': 0.12 }),
      ]) + el('mask', { id: `${id}-mask-${dir}`, maskContentUnits: 'objectBoundingBox' }, el('rect', { width: 1, height: 1, fill: `url(#${id}-fade-${dir})` })),
  );
  const rays = Array.from({ length: 40 }, (_, i) => {
    const a = (i / 40) * Math.PI * 2;
    return el('line', { x1: vp[0], y1: vp[1], x2: f1(vp[0] + Math.cos(a) * 1500), y2: f1(vp[1] + Math.sin(a) * 1500) });
  });
  return el('svg', { class: 'ao-svg', viewBox: `0 0 ${VB_W} ${VB_H}`, preserveAspectRatio: 'xMidYMid slice' }, [
    el('defs', {}, [
      el('radialGradient', { id: `${id}-sky`, cx, cy, r: '75%' }, [
        el('stop', { offset: 0, style: 'stop-color: var(--pb-glow)' }),
        el('stop', { offset: 0.45, style: 'stop-color: var(--pb-sky)' }),
        el('stop', { offset: 1, style: 'stop-color: var(--pb-deep)' }),
      ]),
      el('pattern', { id: `${id}-hatch`, width: 8, height: 8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(35)' }, el('line', { x1: 0, y1: 0, x2: 0, y2: 8, class: 'cb-hatch-line' })),
      el('pattern', { id: `${id}-beam-hatch`, width: 9, height: 9, patternUnits: 'userSpaceOnUse' }, el('line', { x1: 0, y1: 0, x2: 0, y2: 9, class: 'cb-beam-hatch-line' })),
      ...fades,
    ]),
    el('rect', { width: VB_W, height: VB_H, fill: `url(#${id}-sky)` }),
    el('g', { class: 'ao-rays' }, rays),
    el('g', { class: 'ao-floor' }, [
      ...FLOOR_Y.map((y) => el('line', { x1: 0, y1: y, x2: VB_W, y2: y })),
      ...FLOOR_X.map((dx) => el('line', { x1: f1(vp[0] + dx * 0.25), y1: HORIZON, x2: f1(vp[0] + dx * 2.2), y2: VB_H })),
    ]),
    ...children,
  ]);
}

/** A beam: translucent colour + vertical hatch, fading along its direction. */
const beam = (id: string, points: string, fade: string, color = 'var(--pb-acc)', strong = false) =>
  el('g', { mask: `url(#${id}-mask-${fade})`, class: `cb-beam${strong ? ' is-strong' : ''}`, style: `--c: ${color}` }, [
    el('polygon', { points, class: 'cb-beam-fill' }),
    el('polygon', { points, fill: `url(#${id}-beam-hatch)` }),
  ]);

/** Incoming light: a flowing gold dash over a soft glow. */
const ray = (x1: number, y1: number, x2: number, y2: number, dim = false) =>
  el('g', { class: dim ? 'cb-ray-wrap is-dim' : 'cb-ray-wrap' }, [el('line', { x1, y1, x2, y2, class: 'cb-ray-glow' }), el('line', { x1, y1, x2, y2, class: 'cb-ray' })]);

const lensPath = (x: number, top: number, bottom: number, bulge: number) => {
  const mid = (top + bottom) / 2;
  return `M ${x} ${top} Q ${x + bulge} ${mid} ${x} ${bottom} Q ${x - bulge} ${mid} ${x} ${top} Z`;
};

const archPath = (cx: number, base: number, w: number, h: number) => {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const top = base - h;
  return `M ${x0} ${base} L ${x0} ${top + w / 2} A ${w / 2} ${w / 2} 0 0 1 ${x1} ${top + w / 2} L ${x1} ${base}`;
};

const frame = () => [
  el('rect', { x: 18, y: 18, width: VB_W - 36, height: VB_H - 36, rx: 10, class: 'hb-frame' }),
  el('rect', { x: 28, y: 28, width: VB_W - 56, height: VB_H - 56, rx: 6, class: 'hb-frame is-inner' }),
];

// ───────── hero: prism, one gold ray in, four topic beams out ─────────
const F: [number, number] = [611, 294]; // prism centroid at the golden point (38.2%, 42%)
const PRISM = { apex: [611, 160], left: [501, 360], right: [721, 360] };
const ENTRY = [546, 288];
const EXIT = [674, 276];
const HERO_Y = [120, 250, 380, 510];
const HERO_HALF = 58;
const ROSETTE = Array.from({ length: 24 }, (_, i) => i * 7.5);
const SPIRAL = (() => {
  const a = 3.2;
  const pts: string[] = [];
  for (let k = 0; k <= 280; k += 1) {
    const th = (k / 280) * Math.PI * 4.5;
    const r = a * PHI ** ((2 * th) / Math.PI);
    pts.push(`${k ? 'L' : 'M'} ${(F[0] + r * Math.cos(-th)).toFixed(1)} ${(F[1] + r * Math.sin(-th)).toFixed(1)}`);
  }
  return pts.join(' ');
})();
const RING_IN = 236;
const RING_OUT = Math.round(RING_IN * PHI);

function hero(id: string) {
  const prism = `${PRISM.apex.join(',')} ${PRISM.left.join(',')} ${PRISM.right.join(',')}`;
  const hatch = Array.from({ length: 14 }, (_, i) => {
    const t = (i + 1) / 15;
    return el('line', {
      x1: f1(PRISM.apex[0] + (PRISM.right[0] - PRISM.apex[0]) * t),
      y1: f1(PRISM.apex[1] + (PRISM.right[1] - PRISM.apex[1]) * t),
      x2: f1(PRISM.left[0] + (PRISM.right[0] - PRISM.left[0]) * t),
      y2: PRISM.left[1],
      class: 'hb-prism-hatch',
    });
  });
  const beamPoints = (i: number) => {
    const s0 = EXIT[1] + (i - 1.5) * 5;
    return `${EXIT[0]},${s0 - 2.5} ${VB_W},${HERO_Y[i] - HERO_HALF} ${VB_W},${HERO_Y[i] + HERO_HALF} ${EXIT[0]},${s0 + 2.5}`;
  };
  return plate(id, F, [
    el('defs', {}, [
      el('linearGradient', { id: `${id}-beam-fade`, x1: 0, x2: 1, y1: 0, y2: 0 }, [
        el('stop', { offset: 0, 'stop-color': '#fff', 'stop-opacity': 1 }),
        el('stop', { offset: 0.75, 'stop-color': '#fff', 'stop-opacity': 0.55 }),
        el('stop', { offset: 1, 'stop-color': '#fff', 'stop-opacity': 0.2 }),
      ]),
      el('mask', { id: `${id}-beams` }, el('rect', { width: VB_W, height: VB_H, fill: `url(#${id}-beam-fade)` })),
    ]),
    el('g', { class: 'cb-line cb-dash' }, [
      el('line', { x1: VB_W * 0.382, y1: 0, x2: VB_W * 0.382, y2: VB_H }),
      el('line', { x1: VB_W * 0.618, y1: 0, x2: VB_W * 0.618, y2: VB_H }),
      el('line', { x1: 0, y1: F[1], x2: VB_W, y2: F[1] }),
    ]),
    el('circle', { cx: F[0], cy: F[1], r: RING_IN, class: 'hb-ring' }),
    el('circle', { cx: F[0], cy: F[1], r: RING_IN + 14, class: 'hb-ticks' }),
    el('circle', { cx: F[0], cy: F[1], r: RING_OUT, class: 'hb-ring' }),
    el('circle', { cx: F[0], cy: F[1], r: RING_OUT - 14, class: 'hb-ticks is-fine' }),
    el('g', { class: 'hb-rosette', style: `transform-origin: ${F[0]}px ${F[1]}px` }, ROSETTE.map((deg) => el('ellipse', { cx: F[0], cy: F[1], rx: 176, ry: 62, transform: `rotate(${deg} ${F[0]} ${F[1]})` }))),
    el('path', { d: SPIRAL, class: 'hb-spiral' }),
    el('g', { class: 'cb-line' }, [
      el('ellipse', { cx: F[0], cy: 492, rx: 520, ry: 66 }),
      el('ellipse', { cx: F[0], cy: 486, rx: 360, ry: 44 }),
      el('ellipse', { cx: F[0], cy: 480, rx: 210, ry: 25 }),
    ]),
    el('g', { mask: `url(#${id}-beams)` }, HERO_Y.map((_, i) => el('g', { class: 'hb-col', 'data-col': i, style: `animation-delay: ${i * 1.1}s` }, [
      el('polygon', { points: beamPoints(i), class: 'hb-col-fill' }),
      el('polygon', { points: beamPoints(i), fill: `url(#${id}-beam-hatch)` }),
    ]))),
    el('line', { x1: 0, y1: ENTRY[1] + 4, x2: ENTRY[0], y2: ENTRY[1], class: 'cb-ray-glow' }),
    el('line', { x1: 0, y1: ENTRY[1] + 4, x2: ENTRY[0], y2: ENTRY[1], class: 'cb-ray' }),
    el('line', { x1: ENTRY[0], y1: ENTRY[1], x2: EXIT[0], y2: EXIT[1], class: 'hb-ray-mid' }),
    el('polygon', { points: prism, class: 'hb-prism-body' }),
    ...hatch,
    el('polygon', { points: prism, class: 'cb-edge' }),
    el('ellipse', { cx: F[0], cy: F[1] - 50, rx: 170, ry: 54, transform: `rotate(-14 ${F[0]} ${F[1] - 50})`, class: 'hb-halo' }),
    el('ellipse', { cx: F[0], cy: F[1] - 20, rx: 130, ry: 40, transform: `rotate(22 ${F[0]} ${F[1] - 20})`, class: 'hb-halo is-reverse' }),
    ...frame(),
  ]);
}

// ───────── chain: six rays in, two through the lens (me), through the arch (merchant), onto the floor (players) ─────────
const CH_LENS = { x: 611, top: 150, bottom: 450, bulge: 76 };
const CH_IN = [130, 200, 270, 330, 400, 470];
const CH_PASS = [1, 3];
const CH_ARCH = { cx: 1090, base: 560, w: 190, h: 300 };
const CH_POOLS = [
  [1090, 610, 150, 28],
  [900, 660, 110, 22],
  [1290, 664, 120, 22],
];

function chain(id: string) {
  const lx = CH_LENS.x;
  const mid = (CH_LENS.top + CH_LENS.bottom) / 2;
  const hitY = (y: number) => mid + (y - mid) * 0.62;
  const a = CH_ARCH;
  const open = { top: a.base - a.h + a.w / 2 + 20, bottom: a.base - 20 };
  const lens = lensPath(lx, CH_LENS.top, CH_LENS.bottom, CH_LENS.bulge);
  return plate(id, [lx, mid], [
    el('g', { class: 'cb-line' }, [
      el('circle', { cx: lx, cy: mid, r: 240 }),
      el('line', { x1: 120, y1: mid, x2: 1480, y2: mid, class: 'cb-dash' }),
    ]),
    // six offers arrive; four stop at the lens, two go through
    ...CH_IN.map((y, i) => ray(70, y, lx - 26, f1(hitY(y)), !CH_PASS.includes(i))),
    ...CH_IN.map((y) => el('circle', { cx: 70, cy: y, r: 7, class: 'cb-node' })),
    ...CH_IN.filter((_, i) => !CH_PASS.includes(i)).map((y) => el('circle', { cx: lx - 26, cy: f1(hitY(y)), r: 5, class: 'cb-node is-stop' })),
    beam(id, `${lx + 24},${mid - 8} ${a.cx},${open.top} ${a.cx},${open.bottom} ${lx + 24},${mid + 8}`, 'r', 'var(--pb-gold)', true),
    beam(id, `${a.cx - a.w / 2 + 16},${open.top + 40} ${a.cx + a.w / 2 - 16},${open.top + 40} ${a.cx + 330},${VB_H} ${a.cx - 300},${VB_H}`, 'd', 'var(--pb-acc)', true),
    ...CH_POOLS.map(([cx, cy, rx, ry]) => el('ellipse', { cx, cy, rx, ry, class: 'cb-pool', style: '--c: var(--pb-acc)' })),
    el('path', { d: lens, fill: `url(#${id}-hatch)`, class: 'cb-body' }),
    el('path', { d: lens, class: 'cb-edge' }),
    el('circle', { cx: lx, cy: mid, r: 12, class: 'cb-accent-fill' }),
    el('circle', { cx: lx, cy: mid, r: 12, class: 'cb-pulse' }),
    // the merchant's arch, double-ruled
    el('path', { d: archPath(a.cx, a.base, a.w, a.h), class: 'cb-edge' }),
    el('path', { d: archPath(a.cx, a.base - 14, a.w - 28, a.h - 14), class: 'cb-line' }),
    el('line', { x1: a.cx - a.w / 2 - 30, y1: a.base, x2: a.cx + a.w / 2 + 30, y2: a.base, class: 'cb-edge' }),
    ...frame(),
  ]);
}

// ───────── A · mirrors: one promise, many bounces ─────────
const MIRROR_TOP = 150;
const MIRROR_BOTTOM = 490;
const BOUNCE_X0 = 340;
const BOUNCE_STEP = 96;
const BOUNCES = Array.from({ length: 10 }, (_, i) => [BOUNCE_X0 + i * BOUNCE_STEP, i % 2 === 0 ? MIRROR_BOTTOM : MIRROR_TOP]);

function mirrors(id: string) {
  const first = BOUNCES[0];
  const last = BOUNCES[BOUNCES.length - 1];
  const path = BOUNCES.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const left = BOUNCE_X0 - 80;
  const width = BOUNCE_STEP * 9 + 160;
  return plate(id, [800, 320], [
    ...[MIRROR_TOP, MIRROR_BOTTOM].map((y, i) => el('g', {}, [
      el('rect', { x: left, y: i === 0 ? y - 26 : y, width, height: 26, fill: `url(#${id}-hatch)`, class: 'cb-body' }),
      el('line', { x1: left, y1: y, x2: left + width, y2: y, class: 'cb-edge' }),
    ])),
    ray(0, MIRROR_TOP + 40, first[0], first[1]),
    ...BOUNCES.slice(1).map(([x, y], i) => {
      const [x0, y0] = BOUNCES[i];
      const mix = Math.round(100 - (i / 8) * 85);
      return el('line', { x1: x0, y1: y0, x2: x, y2: y, class: 'cb-bounce', style: `--c: color-mix(in srgb, var(--pb-acc) ${mix}%, var(--pb-gold))` });
    }),
    el('path', { d: path, class: 'cb-flow' }),
    beam(id, `${last[0]},${last[1] - 3} ${VB_W},${last[1] + 120} ${VB_W},${last[1] + 260} ${last[0]},${last[1] + 3}`, 'r', 'var(--pb-gold)'),
    ...BOUNCES.map(([x, y], i) => el('circle', { cx: x, cy: y, r: i === 0 ? 13 : 6, class: i === 0 ? 'cb-accent-fill' : 'cb-node' })),
    el('circle', { cx: first[0], cy: first[1], r: 13, class: 'cb-pulse' }),
    ...frame(),
  ]);
}

// ───────── B · gates: three checks, near to far ─────────
const ROAD_VP: [number, number] = [800, 250];
const ROAD_HALF = 520;
const GATES = [590, 450, 370].map((base) => {
  const roadWidth = (2 * ROAD_HALF * (base - ROAD_VP[1])) / (VB_H - ROAD_VP[1]);
  const w = roadWidth * 0.42;
  return { base, w, h: w * 1.5, s: w / 330 };
});

function gates(id: string) {
  const [vx, vy] = ROAD_VP;
  const near = GATES[0];
  return plate(id, ROAD_VP, [
    el('polygon', { points: `${vx - 6},${vy} ${vx + 6},${vy} ${vx + ROAD_HALF},${VB_H} ${vx - ROAD_HALF},${VB_H}`, fill: `url(#${id}-hatch)`, class: 'cb-road' }),
    el('line', { x1: vx, y1: vy, x2: vx - ROAD_HALF, y2: VB_H, class: 'cb-edge' }),
    el('line', { x1: vx, y1: vy, x2: vx + ROAD_HALF, y2: VB_H, class: 'cb-edge' }),
    beam(id, `${vx - 4},${vy} ${vx + 4},${vy} ${f1(vx + near.w / 2)},${near.base} ${f1(vx - near.w / 2)},${near.base}`, 'd', undefined, true),
    beam(id, `${f1(vx - near.w / 2)},${near.base} ${f1(vx + near.w / 2)},${near.base} ${f1(vx + near.w)},${VB_H} ${f1(vx - near.w)},${VB_H}`, 'd'),
    el('circle', { cx: vx, cy: vy, r: 11, class: 'cb-accent-fill' }),
    el('circle', { cx: vx, cy: vy, r: 11, class: 'cb-pulse' }),
    el('circle', { cx: vx, cy: vy, r: 44, class: 'cb-line cb-dash' }),
    ...GATES.slice().reverse().map((g, i) => el('g', { class: 'cb-gate', style: `animation-delay: ${(2 - i) * 1.2}s` }, [
      el('path', { d: archPath(vx, g.base, f1(g.w), f1(g.h)), class: 'cb-edge cb-gate-edge', style: `stroke-width: ${f1(2.4 * g.s + 0.6)}` }),
      el('path', { d: archPath(vx, f1(g.base - 14 * g.s), f1(g.w - 28 * g.s), f1(g.h - 14 * g.s)), class: 'cb-line' }),
    ])),
    ...frame(),
  ]);
}

// ───────── C · lamps: two beams, one bright overlap ─────────
const LAMP_A = [430, 90];
const LAMP_B = [1170, 90];
const POOL_A = [710, 540];
const POOL_B = [890, 540];
const POOL_RX = 230;
const POOL_RY = 52;

function lamps(id: string) {
  return plate(id, [800, 330], [
    el('defs', {}, el('clipPath', { id: `${id}-pool` }, el('ellipse', { cx: POOL_A[0], cy: POOL_A[1], rx: POOL_RX, ry: POOL_RY }))),
    el('g', { class: 'cb-ripples' }, [60, 120, 180, 240, 300, 360].map((r) => el('circle', { cx: 800, cy: 330, r }))),
    el('g', { class: 'cb-screen' }, [
      beam(id, `${LAMP_A[0] - 8},${LAMP_A[1]} ${LAMP_A[0] + 8},${LAMP_A[1]} ${POOL_A[0] + POOL_RX},${POOL_A[1]} ${POOL_A[0] - POOL_RX},${POOL_A[1]}`, 'd', 'var(--pb-acc)', true),
      beam(id, `${LAMP_B[0] - 8},${LAMP_B[1]} ${LAMP_B[0] + 8},${LAMP_B[1]} ${POOL_B[0] + POOL_RX},${POOL_B[1]} ${POOL_B[0] - POOL_RX},${POOL_B[1]}`, 'd', 'var(--pb-gold)', true),
    ]),
    el('ellipse', { cx: POOL_A[0], cy: POOL_A[1], rx: POOL_RX, ry: POOL_RY, class: 'cb-pool', style: '--c: var(--pb-acc)' }),
    el('ellipse', { cx: POOL_B[0], cy: POOL_B[1], rx: POOL_RX, ry: POOL_RY, class: 'cb-pool', style: '--c: var(--pb-gold)' }),
    el('ellipse', { cx: POOL_B[0], cy: POOL_B[1], rx: POOL_RX, ry: POOL_RY, 'clip-path': `url(#${id}-pool)`, class: 'cb-accent-soft is-bright' }),
    ...[LAMP_A, LAMP_B].map(([x, y]) => el('g', {}, [
      el('line', { x1: x, y1: 0, x2: x, y2: y - 22, class: 'cb-line' }),
      el('path', { d: `M ${x - 34} ${y + 6} Q ${x} ${y - 46} ${x + 34} ${y + 6} Z`, fill: `url(#${id}-hatch)`, class: 'cb-body' }),
      el('path', { d: `M ${x - 34} ${y + 6} Q ${x} ${y - 46} ${x + 34} ${y + 6} Z`, class: 'cb-edge' }),
      el('circle', { cx: x, cy: y + 4, r: 9, class: 'cb-accent-fill' }),
    ])),
    el('line', { x1: 800, y1: 60, x2: 800, y2: 640, class: 'cb-line cb-dash' }),
    ...frame(),
  ]);
}

// ───────── D · lens: parallel light gathered to one focus over a stand of bars ─────────
const LENS_X = 700;
const LENS_TOP = 140;
const LENS_BOTTOM = 500;
const FOCUS = [1080, 320];
const BARS = [
  [1020, 46],
  [1062, 92],
  [1104, 64],
  [1146, 120],
];

function lens(id: string) {
  const body = lensPath(LENS_X, LENS_TOP, LENS_BOTTOM, 90);
  const floor = 560;
  return plate(id, [LENS_X, 320], [
    el('g', { class: 'cb-line' }, [
      el('circle', { cx: LENS_X, cy: 320, r: 240 }),
      el('line', { x1: 200, y1: 320, x2: 1400, y2: 320, class: 'cb-dash' }),
      el('line', { x1: FOCUS[0], y1: 80, x2: FOCUS[0], y2: 600, class: 'cb-dash' }),
    ]),
    beam(id, `0,${LENS_TOP + 20} ${LENS_X},${LENS_TOP + 20} ${LENS_X},${LENS_BOTTOM - 20} 0,${LENS_BOTTOM - 20}`, 'l', 'var(--pb-gold)'),
    ...[180, 250, 320, 390, 460].map((y) => ray(0, y, LENS_X - 30, y)),
    beam(id, `${LENS_X},${LENS_TOP + 20} ${FOCUS[0]},${FOCUS[1] - 4} ${FOCUS[0]},${FOCUS[1] + 4} ${LENS_X},${LENS_BOTTOM - 20}`, 'r', undefined, true),
    beam(id, `${FOCUS[0]},${FOCUS[1] - 4} ${VB_W},${FOCUS[1] - 160} ${VB_W},${FOCUS[1] + 160} ${FOCUS[0]},${FOCUS[1] + 4}`, 'r'),
    el('path', { d: body, fill: `url(#${id}-hatch)`, class: 'cb-body' }),
    el('path', { d: body, class: 'cb-edge' }),
    ...BARS.map(([x, h]) => el('g', {}, [
      el('rect', { x: x - 15, y: floor - h, width: 30, height: h, fill: `url(#${id}-hatch)`, class: 'cb-body' }),
      el('rect', { x: x - 15, y: floor - h, width: 30, height: h, class: 'cb-bar' }),
    ])),
    el('line', { x1: 990, y1: floor, x2: 1176, y2: floor, class: 'cb-edge' }),
    el('circle', { cx: FOCUS[0], cy: FOCUS[1], r: 12, class: 'cb-accent-fill' }),
    el('circle', { cx: FOCUS[0], cy: FOCUS[1], r: 12, class: 'cb-pulse' }),
    ...frame(),
  ]);
}

const RENDER: Record<AtlasOpticalKind, (id: string) => string> = { hero, chain, mirrors, gates, lamps, lens };
const CACHE = new Map<AtlasOpticalKind, string>();
const markup = (kind: AtlasOpticalKind) => {
  if (!CACHE.has(kind)) CACHE.set(kind, RENDER[kind](`ao-${kind}`));
  return CACHE.get(kind) as string;
};

const AtlasOptical: React.FC<{ kind: AtlasOpticalKind; accent?: string; className?: string }> = ({ kind, accent, className }) => (
  <div
    className={`atlas-optical is-${kind}${className ? ` ${className}` : ''}`}
    data-accent={accent}
    aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: markup(kind) }}
  />
);

export default AtlasOptical;
