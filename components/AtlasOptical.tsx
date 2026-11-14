import React from 'react';

/**
 * `/igaming/atlas` optical night scenes (engraved-scenes, optical variant; base ported from the
 * skill's `templates/optical.html`). One SVG plate per scene, viewBox 1600 × 700, sliced to
 * the frame: night sky, 40 construction rays and a one-point perspective floor aimed at the
 * focus. Light is the subject; every object comes from the card content it illustrates
 * (no people, no text). Geometry is computed once at module load; styles in
 * `styles/pages/igaming-atlas-scenes.css`.
 *
 * - hero      one promotion, four kinds of problem: a coupon shines into a prism; four beams
 *             end on the four topics' objects (prize wheel, two coupons, phone, bar chart).
 * - chain     provider → me → merchant → players (basics): six coupons leave a game cabinet,
 *             two pass the lens (me) into the two placement slots of the merchant's site, whose
 *             light falls on the players' phones.
 * - rules     A, cards 01 + 09: three versions of one rule (EN / ZH / MS) on one beam, one row
 *             out of line and lit (the gap); a prize wheel whose rare top slice pours onto a
 *             coin stack (expected cost).
 * - deals     B, cards 11 + 02 + 07: six offer coupons reach a filter, two get through and pass
 *             four hand-off check rings.
 * - service   C, cards 03 + 05: a phone with a wallet and a reward progress track; a support
 *             headset and the back-office server shine on the same step (one story).
 * - evidence  D, cards 04 + 08: a report's tallest bar is focused by a lens into a fraction
 *             (numerator over denominator), then climbs a five-step evidence ladder.
 */
export type AtlasOpticalKind = 'hero' | 'chain' | 'rules' | 'deals' | 'service' | 'evidence';

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
    el('rect', { x: 18, y: 18, width: VB_W - 36, height: VB_H - 36, rx: 10, class: 'hb-frame' }),
    el('rect', { x: 28, y: 28, width: VB_W - 56, height: VB_H - 56, rx: 6, class: 'hb-frame is-inner' }),
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

/** An object drawn as hatch fill + glowing gold edge (or an accent edge). */
const solid = (id: string, tag: string, o: Attrs, accent = false) =>
  el(tag, { ...o, fill: `url(#${id}-hatch)`, class: 'cb-body' }) + el(tag, { ...o, class: accent ? 'cb-edge is-accent' : 'cb-edge' });
/** An opaque object: night fill (hides what is behind) + edge. */
const card = (tag: string, o: Attrs, accent = false) =>
  el(tag, { ...o, class: 'cb-card' }) + el(tag, { ...o, class: accent ? 'cb-edge is-accent' : 'cb-edge' });

const lensPath = (x: number, top: number, bottom: number, bulge: number) => {
  const mid = (top + bottom) / 2;
  return `M ${x} ${top} Q ${x + bulge} ${mid} ${x} ${bottom} Q ${x - bulge} ${mid} ${x} ${top} Z`;
};

/** Promotion coupon: rounded ticket with a notch on each side and a perforation. */
function couponPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(10, h / 5);
  const n = h / 6;
  const cy = y + h / 2;
  return `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${cy - n} A ${n} ${n} 0 0 0 ${x + w} ${cy + n} V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + h - r} V ${cy + n} A ${n} ${n} 0 0 0 ${x} ${cy - n} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}
const coupon = (x: number, y: number, w: number, h: number, accent = false, dim = false) =>
  el('g', { class: dim ? 'is-dim' : undefined }, [
    card('path', { d: couponPath(x, y, w, h) }, accent),
    el('line', { x1: f1(x + w * 0.3), y1: y + 6, x2: f1(x + w * 0.3), y2: y + h - 6, class: 'cb-line cb-perf' }),
    el('circle', { cx: f1(x + w * 0.65), cy: f1(y + h / 2), r: f1(h * 0.16), class: accent ? 'cb-dot is-accent' : 'cb-dot' }),
  ]);

/** Phone outline with a screen; `steps` draws a reward progress track (done / current / to do). */
function phone(x: number, y: number, w: number, h: number, steps = 0, current = -1) {
  const r = w * 0.16;
  const inset = w * 0.07;
  const out = [card('rect', { x, y, width: w, height: h, rx: f1(r) }), el('rect', { x: f1(x + inset), y: f1(y + inset * 2.2), width: f1(w - inset * 2), height: f1(h - inset * 4.4), rx: f1(r * 0.4), class: 'cb-line' }), el('line', { x1: f1(x + w * 0.4), y1: f1(y + inset * 1.1), x2: f1(x + w * 0.6), y2: f1(y + inset * 1.1), class: 'cb-line' })];
  if (steps) {
    const ty = y + h * 0.66;
    const x0 = x + w * 0.2;
    const step = (w * 0.6) / (steps - 1);
    out.push(el('line', { x1: f1(x0), y1: f1(ty), x2: f1(x0 + step * (steps - 1)), y2: f1(ty), class: 'cb-line' }));
    for (let i = 0; i < steps; i += 1) {
      const cls = i < current ? 'cb-dot' : i === current ? 'cb-dot is-accent' : 'cb-dot is-open';
      out.push(el('circle', { cx: f1(x0 + step * i), cy: f1(ty), r: f1(w * 0.045), class: cls }));
    }
  }
  return out.join('');
}

/** Prize wheel: rim, ten spokes, a thin lit slice for the rare top prize, pointer on top. */
function wheel(id: string, cx: number, cy: number, r: number, spin = true) {
  const spokes = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return el('line', { x1: cx, y1: cy, x2: f1(cx + Math.cos(a) * r), y2: f1(cy + Math.sin(a) * r), class: 'cb-line' });
  });
  const a0 = -Math.PI / 2 - 0.05;
  const a1 = -Math.PI / 2 + 0.05;
  const slice = `M ${cx} ${cy} L ${f1(cx + Math.cos(a0) * r)} ${f1(cy + Math.sin(a0) * r)} A ${r} ${r} 0 0 1 ${f1(cx + Math.cos(a1) * r)} ${f1(cy + Math.sin(a1) * r)} Z`;
  const body = el('g', { class: spin ? 'cb-spin' : undefined, style: `transform-origin: ${cx}px ${cy}px` }, [
    el('circle', { cx, cy, r, fill: `url(#${id}-hatch)`, class: 'cb-body is-faint' }),
    ...spokes,
    el('path', { d: slice, class: 'cb-slice' }),
    el('circle', { cx, cy, r: f1(r * 0.62), class: 'cb-line' }),
  ]);
  return [
    body,
    el('circle', { cx, cy, r, class: 'cb-edge' }),
    el('circle', { cx, cy, r: f1(r * 0.12), class: 'cb-edge' }),
    el('path', { d: `M ${cx - r * 0.09} ${f1(cy - r - r * 0.16)} L ${cx + r * 0.09} ${f1(cy - r - r * 0.16)} L ${cx} ${f1(cy - r + r * 0.06)} Z`, class: 'cb-pointer' }),
  ].join('');
}

/** Bar chart: bars on a baseline; `hi` is the index drawn in the accent. */
const bars = (x: number, base: number, w: number, gap: number, heights: number[], hi = -1) =>
  [
    ...heights.map((h, i) => card('rect', { x: x + i * (w + gap), y: base - h, width: w, height: h }, i === hi)),
    el('line', { x1: x - gap, y1: base, x2: x + heights.length * (w + gap), y2: base, class: 'cb-edge' }),
  ].join('');

// ───────── hero: a coupon shines into the prism; four topic beams end on four topic objects ─────────
const F: [number, number] = [611, 294];
const PRISM = { apex: [611, 160], left: [501, 360], right: [721, 360] };
const ENTRY = [546, 288];
const EXIT = [674, 276];
const HERO_Y = [120, 250, 380, 510];
const HERO_HALF = 58;
const ICON_X = 1390;
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

function heroIcon(id: string, i: number, cx: number, cy: number) {
  const ring = el('circle', { cx, cy, r: 50, class: 'cb-icon-ring', style: `--c: var(--pb-${'abcd'[i]})` });
  const back = el('circle', { cx, cy, r: 50, class: 'cb-card' });
  let body = '';
  if (i === 0) body = wheel(id, cx, cy, 28, false);
  if (i === 1) body = coupon(cx - 30, cy - 26, 52, 30) + coupon(cx - 18, cy - 4, 52, 30, true);
  if (i === 2) body = phone(cx - 17, cy - 30, 34, 60, 3, 1);
  if (i === 3) body = bars(cx - 24, cy + 22, 10, 6, [18, 34, 26], 1);
  return back + body + ring;
}

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
    return `${EXIT[0]},${s0 - 2.5} ${ICON_X},${HERO_Y[i] - HERO_HALF * 0.8} ${ICON_X},${HERO_Y[i] + HERO_HALF * 0.8} ${EXIT[0]},${s0 + 2.5}`;
  };
  return plate(id, F, [
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
    el('g', {}, HERO_Y.map((_, i) => el('g', { class: 'hb-col', 'data-col': i, style: `animation-delay: ${i * 1.1}s` }, [
      el('polygon', { points: beamPoints(i), class: 'hb-col-fill' }),
      el('polygon', { points: beamPoints(i), fill: `url(#${id}-beam-hatch)` }),
    ]))),
    // the promotion that gets split: a coupon on the left
    coupon(150, 236, 210, 116, true),
    el('line', { x1: 360, y1: ENTRY[1] + 4, x2: ENTRY[0], y2: ENTRY[1], class: 'cb-ray-glow' }),
    el('line', { x1: 360, y1: ENTRY[1] + 4, x2: ENTRY[0], y2: ENTRY[1], class: 'cb-ray' }),
    el('line', { x1: ENTRY[0], y1: ENTRY[1], x2: EXIT[0], y2: EXIT[1], class: 'hb-ray-mid' }),
    el('polygon', { points: prism, class: 'hb-prism-body' }),
    ...hatch,
    el('polygon', { points: prism, class: 'cb-edge' }),
    el('ellipse', { cx: F[0], cy: F[1] - 50, rx: 170, ry: 54, transform: `rotate(-14 ${F[0]} ${F[1] - 50})`, class: 'hb-halo' }),
    ...HERO_Y.map((y, i) => heroIcon(id, i, ICON_X + 50, y)),
  ]);
}

// ───────── chain (basics): game cabinet → six coupons → lens (me) → site's two slots → phones ─────────
const CH_LENS = { x: 640, top: 160, bottom: 460, bulge: 76 };
const CH_IN = [190, 240, 290, 340, 390, 440];
const CH_PASS = [1, 3];
const SITE = { x: 930, y: 120, w: 380, h: 330 };
const SLOTS = [
  { x: 960, y: 190, w: 320, h: 92 },
  { x: 960, y: 300, w: 320, h: 92 },
];
const CH_PHONES = [
  [1000, 520, 62, 112],
  [1150, 540, 62, 112],
  [1300, 520, 62, 112],
];

function chain(id: string) {
  const lx = CH_LENS.x;
  const mid = (CH_LENS.top + CH_LENS.bottom) / 2;
  const hitY = (y: number) => mid + (y - mid) * 0.62;
  const lens = lensPath(lx, CH_LENS.top, CH_LENS.bottom, CH_LENS.bulge);
  const cab = { x: 90, y: 150, w: 150, h: 330 };
  return plate(id, [lx, mid], [
    el('g', { class: 'cb-line' }, [el('circle', { cx: lx, cy: mid, r: 220 }), el('line', { x1: 120, y1: mid, x2: 1480, y2: mid, class: 'cb-dash' })]),
    // provider: a game cabinet with three reels
    card('rect', { x: cab.x, y: cab.y, width: cab.w, height: cab.h, rx: 16 }),
    solid(id, 'rect', { x: cab.x + 14, y: cab.y + 14, width: cab.w - 28, height: 46, rx: 8 }),
    ...[0, 1, 2].map((i) => card('rect', { x: cab.x + 20 + i * 38, y: cab.y + 92, width: 30, height: 60, rx: 5 }, i === 1)),
    el('line', { x1: cab.x + 14, y1: cab.y + 122, x2: cab.x + cab.w - 14, y2: cab.y + 122, class: 'cb-line' }),
    el('rect', { x: cab.x + 30, y: cab.y + 200, width: cab.w - 60, height: 14, rx: 7, class: 'cb-line' }),
    el('line', { x1: cab.x + cab.w + 10, y1: cab.y + 60, x2: cab.x + cab.w + 10, y2: cab.y + 150, class: 'cb-edge' }),
    el('circle', { cx: cab.x + cab.w + 10, cy: cab.y + 52, r: 10, class: 'cb-dot is-accent' }),
    // six offers leave as coupons; four stop at the lens, two go through
    ...CH_IN.map((y, i) => ray(330, y, lx - 26, f1(hitY(y)), !CH_PASS.includes(i))),
    ...CH_IN.map((y, i) => coupon(262, y - 15, 62, 30, CH_PASS.includes(i), !CH_PASS.includes(i))),
    ...CH_IN.filter((_, i) => !CH_PASS.includes(i)).map((y) => el('circle', { cx: lx - 26, cy: f1(hitY(y)), r: 5, class: 'cb-node is-stop' })),
    beam(id, `${lx + 24},${mid - 10} ${SLOTS[0].x},${SLOTS[0].y + 10} ${SLOTS[0].x},${SLOTS[0].y + SLOTS[0].h - 10} ${lx + 24},${mid - 2}`, 'r', 'var(--pb-gold)', true),
    beam(id, `${lx + 24},${mid + 2} ${SLOTS[1].x},${SLOTS[1].y + 10} ${SLOTS[1].x},${SLOTS[1].y + SLOTS[1].h - 10} ${lx + 24},${mid + 10}`, 'r', 'var(--pb-gold)', true),
    el('path', { d: lens, fill: `url(#${id}-hatch)`, class: 'cb-body' }),
    el('path', { d: lens, class: 'cb-edge' }),
    el('circle', { cx: lx, cy: mid, r: 12, class: 'cb-accent-fill' }),
    el('circle', { cx: lx, cy: mid, r: 12, class: 'cb-pulse' }),
    // merchant: a website, its two placement slots lit by the two offers
    beam(id, `${SITE.x + 60},${SITE.y + SITE.h} ${SITE.x + SITE.w - 60},${SITE.y + SITE.h} ${SITE.x + SITE.w + 140},${VB_H} ${SITE.x - 120},${VB_H}`, 'd', 'var(--pb-acc)', true),
    card('rect', { x: SITE.x, y: SITE.y, width: SITE.w, height: SITE.h, rx: 14 }),
    el('line', { x1: SITE.x, y1: SITE.y + 44, x2: SITE.x + SITE.w, y2: SITE.y + 44, class: 'cb-line' }),
    ...[0, 1, 2].map((i) => el('circle', { cx: SITE.x + 24 + i * 22, cy: SITE.y + 22, r: 6, class: 'cb-dot is-open' })),
    ...SLOTS.map((s) => el('rect', { x: s.x, y: s.y, width: s.w, height: s.h, rx: 8, class: 'cb-slot' })),
    ...SLOTS.map((s) => el('rect', { x: s.x, y: s.y, width: s.w, height: s.h, rx: 8, class: 'cb-edge is-accent' })),
    el('line', { x1: SITE.x + 30, y1: SITE.y + SITE.h - 26, x2: SITE.x + 190, y2: SITE.y + SITE.h - 26, class: 'cb-line' }),
    // players: phones on the floor in the site's light
    ...CH_PHONES.map(([x, y, w, h], i) => phone(x, y, w, h, 3, i === 1 ? 2 : 1)),
  ]);
}

// ───────── A · rules: three versions of one rule on one beam, one row out of line; a wheel and its cost ─────────
const SHEETS = [
  { x: 560, y: 120 },
  { x: 480, y: 150 },
  { x: 400, y: 180 },
];
const SHEET_W = 230;
const SHEET_H = 330;
const ROW_Y = 300;
const WHEEL = { cx: 1190, cy: 270, r: 140 };

function rules(id: string) {
  const sheets = SHEETS.map((s, k) => {
    const rows = Array.from({ length: 8 }, (_, i) => {
      const y = s.y + 44 + i * 34;
      const len = [0.8, 0.62, 0.74, 0.55, 0.7, 0.66, 0.5, 0.6][(i + k) % 8];
      return el('line', { x1: s.x + 24, y1: y, x2: f1(s.x + 24 + (SHEET_W - 48) * len), y2: y, class: 'cb-line' });
    });
    return card('rect', { x: s.x, y: s.y, width: SHEET_W, height: SHEET_H, rx: 10 }) + rows.join('');
  });
  const front = SHEETS[2];
  const gapY = front.y + 44 + 3 * 34; // row 4 of the front sheet sits on the beam
  return plate(id, [611, ROW_Y], [
    ray(0, ROW_Y, front.x + 30, ROW_Y),
    ...sheets,
    // the gap: on the front version this row is longer and offset; it lights up
    el('rect', { x: front.x + 18, y: gapY - 12, width: SHEET_W - 36, height: 24, rx: 6, class: 'cb-gap' }),
    el('line', { x1: front.x + 60, y1: gapY, x2: front.x + SHEET_W - 22, y2: gapY, class: 'cb-edge is-accent' }),
    el('line', { x1: front.x + 30, y1: ROW_Y, x2: SHEETS[0].x + SHEET_W + 40, y2: ROW_Y, class: 'cb-thread' }),
    el('circle', { cx: front.x + SHEET_W - 22, cy: gapY, r: 9, class: 'cb-accent-fill' }),
    el('circle', { cx: front.x + SHEET_W - 22, cy: gapY, r: 9, class: 'cb-pulse' }),
    // the wheel: a rare top slice, its light pours down onto the coin stack
    el('line', { x1: WHEEL.cx, y1: WHEEL.cy, x2: WHEEL.cx - 90, y2: 480, class: 'cb-edge' }),
    el('line', { x1: WHEEL.cx, y1: WHEEL.cy, x2: WHEEL.cx + 90, y2: 480, class: 'cb-edge' }),
    beam(id, `${WHEEL.cx - 10},${WHEEL.cy - WHEEL.r + 4} ${WHEEL.cx + 10},${WHEEL.cy - WHEEL.r + 4} ${WHEEL.cx + 150},${600} ${WHEEL.cx + 30},${600}`, 'd', 'var(--pb-acc)', true),
    wheel(id, WHEEL.cx, WHEEL.cy, WHEEL.r, false),
    ...Array.from({ length: 6 }, (_, i) => el('g', {}, [
      el('ellipse', { cx: WHEEL.cx + 90, cy: 610 - i * 18, rx: 64, ry: 15, class: 'cb-coin' }),
      el('ellipse', { cx: WHEEL.cx + 90, cy: 610 - i * 18, rx: 42, ry: 9, class: 'cb-line' }),
    ])),
  ]);
}

// ───────── B · deals: six coupons, a filter lets two through, four hand-off rings ─────────
const DEAL_Y = Array.from({ length: 6 }, (_, i) => 130 + i * 78);
const DEAL_PASS = [1, 3];
const FILTER_X = 640;
const OPENINGS = [305, 375];
const BLOCK_AT = [170, 235, 445, 510];
const RINGS = [820, 990, 1160, 1330];

function deals(id: string) {
  const targets: number[] = [];
  let b = 0;
  let p = 0;
  DEAL_Y.forEach((_, i) => targets.push(DEAL_PASS.includes(i) ? OPENINGS[p++] : BLOCK_AT[b++]));
  const bar = (y0: number, y1: number) => solid(id, 'rect', { x: FILTER_X - 12, y: y0, width: 24, height: y1 - y0, rx: 4 });
  return plate(id, [FILTER_X, 340], [
    ...DEAL_Y.map((y, i) => ray(310, y + 2, FILTER_X - 14, targets[i], !DEAL_PASS.includes(i))),
    ...DEAL_Y.map((y, i) => coupon(110, y - 26, 190, 56, DEAL_PASS.includes(i), !DEAL_PASS.includes(i))),
    bar(110, OPENINGS[0] - 18),
    bar(OPENINGS[0] + 18, OPENINGS[1] - 18),
    bar(OPENINGS[1] + 18, 580),
    ...BLOCK_AT.map((y) => el('circle', { cx: FILTER_X - 14, cy: y, r: 6, class: 'cb-node is-stop' })),
    ...OPENINGS.map((y) => beam(id, `${FILTER_X + 12},${y - 7} ${VB_W},${y - 12} ${VB_W},${y + 12} ${FILTER_X + 12},${y + 7}`, 'r', 'var(--pb-acc)', true)),
    ...RINGS.map((x, i) => el('g', { class: 'cb-gate', style: `animation-delay: ${i * 0.9}s` }, [
      el('circle', { cx: x, cy: 340, r: 64, class: 'cb-edge' }),
      el('circle', { cx: x, cy: 340, r: 52, class: 'cb-line' }),
      el('circle', { cx: x, cy: 254, r: 16, class: 'cb-card' }),
      el('path', { d: `M ${x - 7} 254 L ${x - 2} 260 L ${x + 8} 247`, class: 'cb-tick' }),
      el('line', { x1: x, y1: 404, x2: x, y2: 520, class: 'cb-line' }),
    ])),
    el('circle', { cx: FILTER_X, cy: 340, r: 10, class: 'cb-accent-fill' }),
  ]);
}

// ───────── C · service: a phone with a wallet and a progress track; headset and server light the same step ─────────
const PH = { x: 690, y: 210, w: 220, h: 420 };
const PH_STEP = 2;

function service(id: string) {
  const ty = PH.y + PH.h * 0.66;
  const x0 = PH.x + PH.w * 0.2;
  const step = (PH.w * 0.6) / 3;
  const target = [x0 + step * PH_STEP, ty];
  const head = [330, 170];
  const rack = { x: 1220, y: 80, w: 130, h: 170 };
  return plate(id, [target[0], target[1]], [
    el('g', { class: 'cb-ripples' }, [60, 120, 180, 240, 300].map((r) => el('circle', { cx: f1(target[0]), cy: f1(target[1]), r }))),
    el('g', { class: 'cb-screen' }, [
      beam(id, `${head[0] - 10},${head[1] + 50} ${head[0] + 30},${head[1] + 40} ${f1(target[0] + 12)},${f1(target[1])} ${f1(target[0] - 12)},${f1(target[1] + 8)}`, 'r', 'var(--pb-acc)', true),
      beam(id, `${rack.x},${rack.y + rack.h - 20} ${rack.x + 40},${rack.y + rack.h} ${f1(target[0] + 12)},${f1(target[1] + 8)} ${f1(target[0] - 12)},${f1(target[1])}`, 'l', 'var(--pb-gold)', true),
    ]),
    // support: a headset
    el('path', { d: `M ${head[0] - 62} ${head[1] + 10} A 62 62 0 0 1 ${head[0] + 62} ${head[1] + 10}`, class: 'cb-edge' }),
    card('rect', { x: head[0] - 76, y: head[1] + 4, width: 28, height: 52, rx: 10 }),
    card('rect', { x: head[0] + 48, y: head[1] + 4, width: 28, height: 52, rx: 10 }),
    el('path', { d: `M ${head[0] - 62} ${head[1] + 54} Q ${head[0] - 50} ${head[1] + 96} ${head[0]} ${head[1] + 92}`, class: 'cb-edge' }),
    el('circle', { cx: head[0] + 4, cy: head[1] + 92, r: 7, class: 'cb-accent-fill' }),
    // the system: a back-office server
    card('rect', { x: rack.x, y: rack.y, width: rack.w, height: rack.h, rx: 10 }),
    ...[0, 1, 2, 3].map((i) => el('line', { x1: rack.x + 16, y1: rack.y + 30 + i * 36, x2: rack.x + rack.w - 40, y2: rack.y + 30 + i * 36, class: 'cb-line' })),
    ...[0, 1, 2, 3].map((i) => el('circle', { cx: rack.x + rack.w - 22, cy: rack.y + 30 + i * 36, r: 5, class: i === 2 ? 'cb-dot is-accent' : 'cb-dot' })),
    // the page: the player's phone, a wallet, and where the reward is now
    phone(PH.x, PH.y, PH.w, PH.h, 4, PH_STEP),
    card('rect', { x: PH.x + 50, y: PH.y + 90, width: 120, height: 80, rx: 12 }),
    el('path', { d: `M ${PH.x + 50} ${PH.y + 112} H ${PH.x + 170}`, class: 'cb-line' }),
    card('rect', { x: PH.x + 130, y: PH.y + 120, width: 40, height: 28, rx: 6 }, true),
    el('circle', { cx: f1(target[0]), cy: f1(target[1]), r: 20, class: 'cb-accent-soft is-bright' }),
    el('circle', { cx: f1(target[0]), cy: f1(target[1]), r: 10, class: 'cb-pulse' }),
  ]);
}

// ───────── D · evidence: a report bar → lens → fraction → five-step evidence ladder ─────────
const REPORT = { x: 110, y: 150, w: 330, h: 370 };
const EV_LENS = { x: 640, top: 170, bottom: 470 };
const FRAC = [930, 320];
const LADDER = { x: 1110, base: 610, w: 76, rise: 62 };

function evidence(id: string) {
  const mid = (EV_LENS.top + EV_LENS.bottom) / 2;
  const top = [LADDER.x + LADDER.w * 4.5, LADDER.base - LADDER.rise * 5];
  const lens = lensPath(EV_LENS.x, EV_LENS.top, EV_LENS.bottom, 80);
  const stairs = Array.from({ length: 5 }, (_, i) => {
    const x = LADDER.x + i * LADDER.w;
    const h = LADDER.rise * (i + 1);
    return card('rect', { x, y: LADDER.base - h, width: LADDER.w, height: h }, i === 4);
  });
  return plate(id, [EV_LENS.x, mid], [
    el('g', { class: 'cb-line' }, [el('circle', { cx: EV_LENS.x, cy: mid, r: 220 }), el('line', { x1: 120, y1: mid, x2: 1480, y2: mid, class: 'cb-dash' })]),
    // the report: header rule, bars, the one called "ROI" in the accent
    card('rect', { x: REPORT.x, y: REPORT.y, width: REPORT.w, height: REPORT.h, rx: 12 }),
    el('line', { x1: REPORT.x + 24, y1: REPORT.y + 44, x2: REPORT.x + 200, y2: REPORT.y + 44, class: 'cb-line' }),
    el('line', { x1: REPORT.x + 24, y1: REPORT.y + 70, x2: REPORT.x + 140, y2: REPORT.y + 70, class: 'cb-line' }),
    bars(REPORT.x + 40, REPORT.y + REPORT.h - 40, 40, 16, [90, 150, 110, 210, 170], 3),
    ...[200, 260, 320].map((y) => ray(REPORT.x + REPORT.w, y, EV_LENS.x - 30, y)),
    beam(id, `${EV_LENS.x + 10},${EV_LENS.top + 40} ${FRAC[0]},${FRAC[1] - 4} ${FRAC[0]},${FRAC[1] + 4} ${EV_LENS.x + 10},${EV_LENS.bottom - 40}`, 'r', undefined, true),
    el('path', { d: lens, fill: `url(#${id}-hatch)`, class: 'cb-body' }),
    el('path', { d: lens, class: 'cb-edge' }),
    // numerator over denominator at the focus
    card('rect', { x: FRAC[0] - 34, y: FRAC[1] - 70, width: 68, height: 44, rx: 6 }),
    el('line', { x1: FRAC[0] - 56, y1: FRAC[1], x2: FRAC[0] + 56, y2: FRAC[1], class: 'cb-edge is-accent' }),
    card('rect', { x: FRAC[0] - 34, y: FRAC[1] + 26, width: 68, height: 44, rx: 6 }),
    el('circle', { cx: FRAC[0], cy: FRAC[1], r: 10, class: 'cb-accent-fill' }),
    el('circle', { cx: FRAC[0], cy: FRAC[1], r: 10, class: 'cb-pulse' }),
    // the evidence ladder: idea → prototype → approved → live → checked; light only reaches the top when checked
    beam(id, `${FRAC[0] + 56},${FRAC[1] - 3} ${f1(top[0] - 20)},${f1(top[1] - 6)} ${f1(top[0] + 20)},${f1(top[1] + 6)} ${FRAC[0] + 56},${FRAC[1] + 3}`, 'r', 'var(--pb-gold)'),
    ...stairs,
    ...Array.from({ length: 5 }, (_, i) => el('circle', { cx: LADDER.x + i * LADDER.w + LADDER.w / 2, cy: LADDER.base - LADDER.rise * (i + 1), r: i === 4 ? 9 : 5, class: i === 4 ? 'cb-accent-fill' : 'cb-node' })),
  ]);
}

const RENDER: Record<AtlasOpticalKind, (id: string) => string> = { hero, chain, rules, deals, service, evidence };
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
