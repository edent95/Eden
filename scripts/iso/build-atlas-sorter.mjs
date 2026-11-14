/**
 * Builds the `/igaming/atlas` "six in, two out" figure (anatomy skill): an offer sorter
 * on a bench. Six offer tokens wait on a track; four check stations (fit, feasible,
 * compatible, measurable) probe each token in turn; a token that fails is pushed into
 * the reject tray under that station, and only two reach the merchant's cradle.
 *
 * Static art is precomputed here with the anatomy kit (`iso-kit.mjs`, copied from the
 * skill) and written to `components/atlas-sorter-art.ts`; the moving parts (tokens,
 * probes) are drawn once at rest and moved by `IGamingAtlasSorter.tsx` with translations
 * along the same projection. Run: `node scripts/iso/build-atlas-sorter.mjs`.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as k from './iso-kit.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', '..', 'components', 'atlas-sorter-art.ts');

const WIDTH = 760;
const HEIGHT = 330;

// World: x along the track, y toward the viewer (reject trays), z up. ~1 unit = 1 mm.
const PLATE = { x: -150, y: -42, w: 300, d: 92, r: 8 };
const PLATE_H = 10;
const FOOT_H = 6;
const BED = { x: -132, y: -9, w: 206, d: 18, r: 2 };
const BED_H = 2;
const TOKEN_R = 6;
const TOKEN_H = 2.6;
const STATIONS = [-36, -6, 24, 54];
const COLUMN_Y = -24;
const ARM_Z = 30;
const PROBE_REST = 18; // tip height at rest
const PROBE_CONTACT = BED_H + TOKEN_H + 0.2;
const BIN_Y = 24;
const BIN = (sx) => ({ x: sx - 10, y: BIN_Y - 9, w: 20, d: 18, r: 2.5 });
const BIN_H = 4;
const CRADLE = { x: 80, y: -12, w: 50, d: 24, r: 3 };
const CRADLE_H = 3;
const QUEUE = [-60, -74, -88, -102, -116, -130].map((x) => x + 4); // first to go is index 0
const ACCEPT = [94, 116];

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [STATIONS[0], COLUMN_Y, ARM_Z + 6], [STATIONS[3], COLUMN_Y, ARM_Z + 6]],
  WIDTH,
  HEIGHT,
  { pad: 14, azimuth: 60 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 18))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: 'lo' }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: 'mid' }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: 'mid' }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: 'lo' }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(''), { tone: 'lo' }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.55 }));
  // ruler strip along the near edge
  const strip = { x: -126, y: PLATE.y + PLATE.d - 14, w: 178, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: 'lo', crease: 'none' }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  out.push(D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], { size: 0.45 }));
  // label plate with three rule lines (stands for printed text)
  const label = { x: 92, y: 22, w: 34, d: 18, r: 1.5 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3, 0.3), { tone: 'mid' }));
  [5, 9, 13].forEach((dy, i) => out.push(L(k.lineOnTop([label.x + 4, label.y + dy], [label.x + (i === 2 ? 20 : 30), label.y + dy], 0.8, P), { tone: 'lo', free: true })));
  out.push(D(k.corners(label, 2).map(([x, y]) => at([x, y, 0.8])), { size: 0.4 }));
  return out.join('');
}

function track() {
  const out = [];
  out.push(S(k.slabOf(BED, 0, BED_H, P, 3, 0.4), { tone: 'mid' }));
  out.push(L(k.lineOnTop([BED.x + 3, 0], [BED.x + BED.w - 3, 0], BED_H, P), { tone: 'faint' }));
  for (const y of [-9.5, 7.5]) {
    out.push(S(k.slabOf({ x: BED.x, y, w: BED.w, d: 2, r: 0.6 }, BED_H, 1.2, P, 2), { tone: 'mid', crease: 'none' }));
    out.push(D([BED.x + 4, BED.x + BED.w / 2, BED.x + BED.w - 4].map((x) => at([x, y + 1, BED_H + 1.2])), { size: 0.35 }));
  }
  // end stop at the feed end, with a knurled crank
  out.push(S(k.slabOf({ x: BED.x - 6, y: -11, w: 6, d: 22, r: 1.2 }, 0, 8, P, 3, 0.5), { tone: 'mid' }));
  out.push(S(k.cylinder(BED.x - 3, 15, 4, 0, 5, P, 24), { tone: 'mid' }));
  out.push(L(k.knurl(BED.x - 3, 15, 4, 0, 5, 24, P), { tone: 'lo' }));
  out.push(D([at([BED.x - 3, 15, 5])], { size: 0.5, tone: 'hi' }));
  return out.join('');
}

function columns() {
  const out = [];
  STATIONS.forEach((sx, i) => {
    out.push(S(k.slabOf({ x: sx - 6, y: COLUMN_Y - 6, w: 12, d: 12, r: 2 }, 0, 3, P, 4, 0.5), { tone: 'mid' }));
    out.push(D(k.corners({ x: sx - 6, y: COLUMN_Y - 6, w: 12, d: 12 }, 2).map(([x, y]) => at([x, y, 3])), { size: 0.4 }));
    out.push(S(k.cylinder(sx, COLUMN_Y, 2.6, 3, ARM_Z - 3, P, 24), { tone: 'mid', crease: 'none' }));
    out.push(L([12, 22].map((z) => k.sideArc(sx, COLUMN_Y, 2.6, z, P, 12)).join(''), { tone: 'faint' }));
    void i;
  });
  return out.join('');
}

function bins() {
  const out = [];
  STATIONS.forEach((sx) => {
    const b = BIN(sx);
    out.push(S(k.slabOf(b, 0, BIN_H, P, 4, 0.5), { tone: 'mid' }));
    out.push(S(k.slabOf(k.insetPlan(b, 2), BIN_H - 1.2, 0.01, P, 3), { tone: 'lo', crease: 'none', flat: true }));
    out.push(L(k.planOutline(k.insetPlan(b, 2), BIN_H, P, 3), { tone: 'lo' }));
    // chute lip from the track edge into the tray
    out.push(S(k.slabOf({ x: sx - 5, y: 9.5, w: 10, d: 5.5, r: 0.6 }, 0, BED_H + 0.4, P, 2), { tone: 'lo' }));
  });
  return out.join('');
}

function cradle() {
  const out = [];
  out.push(S(k.slabOf(CRADLE, 0, CRADLE_H, P, 5, 0.6), { tone: 'hi', crease: 'lo' }));
  out.push(L(k.planOutline(k.insetPlan(CRADLE, 2.5), CRADLE_H, P, 4), { tone: 'lo' }));
  ACCEPT.forEach((x) => out.push(L(k.ring(x, 0, TOKEN_R + 1, CRADLE_H, P, 32), { tone: 'mid' })));
  out.push(D(k.corners(CRADLE, 3).map(([x, y]) => at([x, y, CRADLE_H])), { size: 0.45 }));
  // a short ramp from the track end onto the cradle
  out.push(S(k.slabOf({ x: BED.x + BED.w, y: -6, w: CRADLE.x - BED.x - BED.w, d: 12, r: 0.6 }, 0, CRADLE_H, P, 2), { tone: 'mid', crease: 'none' }));
  return out.join('');
}

function arms() {
  const out = [];
  STATIONS.forEach((sx, i) => {
    const arm = { x: sx - 3.5, y: COLUMN_Y - 3.5, w: 7, d: -COLUMN_Y + 6, r: 1.6 };
    out.push(S(k.cylinder(sx, COLUMN_Y, 3.4, ARM_Z - 2, 2, P, 24), { tone: 'mid' }));
    out.push(S(k.slabOf(arm, ARM_Z, 3.4, P, 3, 0.4), { tone: 'mid' }));
    // station number as dots on the arm (1–4), no text
    const dots = Array.from({ length: i + 1 }, (_, n) => at([sx, COLUMN_Y + 4 + n * 3.2, ARM_Z + 3.4]));
    out.push(D(dots, { size: 0.75, tone: 'hi' }));
    // guide bushing for the probe
    out.push(S(k.cylinder(sx, 0, 2.6, ARM_Z - 3, 3, P, 24), { tone: 'mid' }));
    out.push(L(k.knurl(sx, 0, 2.6, ARM_Z - 3, ARM_Z, 20, P), { tone: 'lo' }));
  });
  return out.join('');
}

/** One probe per station, drawn with its tip at PROBE_REST; the live layer moves it down. */
function probe(sx, i) {
  const rod = S(k.cylinder(sx, 0, 1.1, PROBE_REST + 2, ARM_Z - PROBE_REST, P, 16), { tone: 'mid', crease: 'none' });
  const tip = S(k.cylinder(sx, 0, 2.2, PROBE_REST, 2, P, 20), { tone: 'hi', className: 'as-probe-tip' });
  return `<g data-probe="${i}">${rod}${tip}</g>`;
}

function token(i) {
  const body = S(k.cylinder(0, 0, TOKEN_R, 0, TOKEN_H, P, 40, 0.3), { tone: 'hi', crease: 'lo', className: 'as-token' });
  const edge = L(k.knurl(0, 0, TOKEN_R, 0, TOKEN_H, 40, P, 0.5), { tone: 'lo' });
  const face = L(k.ring(0, 0, TOKEN_R - 1.8, TOKEN_H, P, 32), { tone: 'mid' });
  const pip = D([at([0, 0, TOKEN_H])], { size: 0.7, tone: 'hi' });
  // drawn at the world origin; the live layer translates it to (x, y, z) with translateAlong
  return `<g data-token="${i}">${body}${edge}${face}${pip}</g>`;
}

const tokenLayer = `<g data-tokens>${QUEUE.map((_, i) => token(i)).join('')}</g>`;

// Defs: engraved hatch for side faces (densest = darkest shade) and a soft halo.
const hatch = (id, gap, angle, tone) =>
  `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${gap}" height="${gap}" patternTransform="rotate(${angle})"><rect width="${gap}" height="${gap}" class="as-hatch-ground"/><line x1="0" y1="0" x2="0" y2="${gap}" class="as-hatch-line" data-tone="${tone}"/></pattern>`;
const defs = `<defs>${hatch('as-h0', 1.6, 45, 'hi')}${hatch('as-h1', 2.2, 45, 'mid')}${hatch('as-h2', 3, 45, 'mid')}${hatch('as-h3', 4, 45, 'lo')}</defs>`;

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  className: 'as-svg',
  label:
    'An offer sorter on a bench: six tokens wait on a track, four check stations probe each one in turn, failing tokens are pushed into the tray under the station that stopped them, and two tokens reach the merchant cradle at the end.',
  body: [
    defs,
    plate(),
    columns(),
    track(),
    bins(),
    cradle(),
    tokenLayer,
    arms(),
    ...STATIONS.map((sx, i) => probe(sx, i)),
  ],
});

const shifted = svg;

const meta = {
  P,
  stations: STATIONS,
  queue: QUEUE,
  accept: ACCEPT,
  binY: BIN_Y,
  bed: BED_H,
  binTop: BIN_H,
  cradleTop: CRADLE_H,
  probeRest: PROBE_REST,
  probeContact: PROBE_CONTACT,
};

writeFileSync(
  OUT,
  `/* Generated by scripts/iso/build-atlas-sorter.mjs — do not edit by hand. */\n` +
    `export const SORTER_META = ${JSON.stringify(meta)} as const;\n` +
    `export const SORTER_SVG = ${JSON.stringify(shifted)};\n`,
);
console.log('wrote', OUT, Math.round(shifted.length / 1024), 'KB');
