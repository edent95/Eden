// Site-wide "kaleidoscope" skeleton: every page gets its own symmetric mandala
// (spirograph curves, Maurer roses, guilloché families at the heart; rings of petals,
// scallops, beads and a star polygon around them), drawn behind the page content on
// `.page-shell::after` (styles/css-art/kaleido.css). The formulas only generate the
// shapes — no text is drawn; the design is lines, dots and shapes.

export type KaleidoCurve =
  | { kind: 'hypo'; R: number; r: number; d: number }      // hypotrochoid
  | { kind: 'epi'; R: number; r: number; d: number }       // epitrochoid
  | { kind: 'maurer'; n: number; deg: number }             // Maurer rose
  | { kind: 'rose'; k: number; n?: number };               // rose r = cos(k/n · θ)

export type KaleidoSpec = {
  primary: KaleidoCurve;
  /** guilloché family: this curve drawn `copies` times, each rotated a little further */
  family: KaleidoCurve;
  copies: number;
  /** 'center' sits behind a centred hero, 'right' beside a left-aligned one,
   *  'corner' tucks into the top-right corner of the page */
  pos: 'center' | 'right' | 'corner';
  /** emblem opacity, default 1 */
  opacity?: number;
  /** strength of the page grid + grain behind this page, default 1 */
  texture?: number;
  size: number;   // px
  top: number;    // px from the top of the page
};

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const n2 = (v: number) => (Math.abs(v) < 0.005 ? '0' : v.toFixed(2));

/** Points of a curve, scaled so its farthest point sits on radius `radius`. */
export const curvePoints = (curve: KaleidoCurve, radius: number): Array<[number, number]> => {
  const pts: Array<[number, number]> = [];
  if (curve.kind === 'hypo' || curve.kind === 'epi') {
    const { R, r, d } = curve;
    const turns = r / gcd(R, r);
    const steps = Math.min(2400, Math.round(360 * turns));
    for (let i = 0; i <= steps; i += 1) {
      const t = (i / steps) * Math.PI * 2 * turns;
      const x = curve.kind === 'hypo'
        ? (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)
        : (R + r) * Math.cos(t) - d * Math.cos(((R + r) / r) * t);
      const y = curve.kind === 'hypo'
        ? (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)
        : (R + r) * Math.sin(t) - d * Math.sin(((R + r) / r) * t);
      pts.push([x, y]);
    }
  } else if (curve.kind === 'maurer') {
    for (let k = 0; k <= 360; k += 1) {
      const th = ((k * curve.deg) * Math.PI) / 180;
      const rr = Math.sin(curve.n * th);
      pts.push([rr * Math.cos(th), rr * Math.sin(th)]);
    }
  } else {
    const n = curve.n ?? 1;
    const period = Math.PI * 2 * n;
    for (let i = 0; i <= 1440; i += 1) {
      const th = (i / 1440) * period;
      const rr = Math.cos((curve.k / n) * th);
      pts.push([rr * Math.cos(th), rr * Math.sin(th)]);
    }
  }
  const max = Math.max(...pts.map(([x, y]) => Math.hypot(x, y))) || 1;
  return pts.map(([x, y]) => [(x / max) * radius, (y / max) * radius]);
};

export const pathOf = (pts: Array<[number, number]>) =>
  `M${pts.map(([x, y]) => `${n2(x)} ${n2(y)}`).join('L')}`;

export type KaleidoPalette = { ink: string; foil: string; faint: string };

export const KALEIDO_PALETTE: Record<'light' | 'dark', KaleidoPalette> = {
  light: { ink: 'rgba(40,52,44,0.36)', foil: 'rgba(184,134,47,0.85)', faint: 'rgba(40,52,44,0.18)' },
  dark: { ink: 'rgba(239,232,218,0.3)', foil: 'rgba(242,207,122,0.75)', faint: 'rgba(239,232,218,0.14)' },
};

/** Rotational order of a curve: how many times its pattern repeats around the centre. */
export const symmetryOf = (curve: KaleidoCurve): number => {
  let n: number;
  if (curve.kind === 'hypo' || curve.kind === 'epi') n = curve.R / gcd(curve.R, curve.r);
  else if (curve.kind === 'maurer') n = curve.n % 2 ? curve.n : curve.n * 2;
  else n = curve.k % 2 ? curve.k : curve.k * 2;
  while (n < 8) n *= 2;
  return Math.min(n, 24);
};

const f2 = (v: number) => v.toFixed(2);
const polar = (r: number, a: number): [number, number] => [r * Math.sin(a), -r * Math.cos(a)];

/** A standalone SVG mandala (for a data URI) with SMIL draw-in and slow counter-rotating rings. */
export const kaleidoSvg = (spec: KaleidoSpec, palette: KaleidoPalette, animate: boolean): string => {
  const N = symmetryOf(spec.primary);
  const step = (Math.PI * 2) / N;
  const family = pathOf(curvePoints(spec.family, 88));
  const primary = pathOf(curvePoints(spec.primary, 72));
  // Maurer roses are 360 chords: drawn at spirograph weight they fill into a solid blot
  const dense = spec.primary.kind === 'maurer';
  const famStep = 360 / Math.max(1, spec.copies) / 3;
  const copies = Array.from({ length: spec.copies }, (_, i) =>
    `<path d="${family}" transform="rotate(${(i * famStep).toFixed(2)})"/>`).join('');
  const draw = animate
    ? '<animate attributeName="stroke-dashoffset" from="1" to="0" dur="3.2s" fill="freeze" calcMode="spline" keySplines="0.45 0 0.25 1" keyTimes="0;1"/>'
    : '';
  const spin = (dur: number, dir: 1 | -1) => (animate
    ? `<animateTransform attributeName="transform" type="rotate" from="0" to="${360 * dir}" dur="${dur}s" repeatCount="indefinite"/>`
    : '');
  const rings = [178, 168, 150, 118, 88, 40, 14].map((r) => `<circle r="${r}"/>`).join('');

  // beads: 4N dots on the outer rim, every fourth one a larger gold bead
  const beads = Array.from({ length: N * 4 }, (_, i) => {
    const [x, y] = polar(173, (i * step) / 4);
    return i % 4 ? `<circle cx="${f2(x)}" cy="${f2(y)}" r="0.9" fill="${palette.ink}"/>`
      : `<circle cx="${f2(x)}" cy="${f2(y)}" r="2.1" fill="${palette.foil}"/>`;
  }).join('');
  // scallops: 2N overlapping circles strung on r = 159 (a flower-of-life band)
  const sr = 159 * Math.sin(Math.PI / (2 * N)) * 1.3;
  const scallops = Array.from({ length: N * 2 }, (_, i) => {
    const [x, y] = polar(159, (i * step) / 2);
    return `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(sr)}"/>`;
  }).join('');
  // petals: N vesicae from r = 118 to 150, a vein down each, a gold dot at each tip;
  // a second, offset row from 92 to 128 sits between them
  const petal = (r0: number, r1: number, widthK: number) => {
    const mid = (r0 + r1) / 2;
    const w = mid * Math.sin(step / 2) * widthK;
    return `M0 ${-r0}Q${f2(w)} ${-mid} 0 ${-r1}Q${f2(-w)} ${-mid} 0 ${-r0}Z`;
  };
  const outerPetal = petal(118, 150, 1.05);
  const innerPetal = petal(92, 128, 0.8);
  const petals = Array.from({ length: N }, (_, i) => {
    const a = (i * 360) / N;
    return `<g transform="rotate(${f2(a)})"><path d="${outerPetal}"/><path d="M0 -121L0 -146" opacity="0.6"/></g>`;
  }).join('');
  const innerPetals = Array.from({ length: N }, (_, i) => `<path d="${innerPetal}" transform="rotate(${f2((i + 0.5) * (360 / N))})"/>`).join('');
  const tips = Array.from({ length: N }, (_, i) => {
    const [x, y] = polar(153.5, i * step);
    const [bx, by] = polar(118, i * step);
    return `<circle cx="${f2(x)}" cy="${f2(y)}" r="1.7"/><circle cx="${f2(bx)}" cy="${f2(by)}" r="1.4"/>`;
  }).join('');
  // star polygon {N/k} through the petal bases
  let k = Math.max(2, Math.round(N * 0.3));
  while (gcd(N, k) !== 1 && k > 1) k -= 1;
  const star = `M${Array.from({ length: N + 1 }, (_, i) => polar(118, ((i * k) % N) * step).map(f2).join(' ')).join('L')}`;
  // spokes between the heart and the star, and N seeds around the centre
  const spokes = Array.from({ length: N * 2 }, (_, i) => {
    const [x0, y0] = polar(40, (i * step) / 2);
    const [x1, y1] = polar(i % 2 ? 58 : 88, (i * step) / 2);
    return `M${f2(x0)} ${f2(y0)}L${f2(x1)} ${f2(y1)}`;
  }).join('');
  const seeds = Array.from({ length: N }, (_, i) => {
    const [x, y] = polar(27, i * step);
    return `<circle cx="${f2(x)}" cy="${f2(y)}" r="1.5"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-190 -190 380 380">`
    + `<g fill="none" stroke="${palette.faint}" stroke-width="0.6">${rings}</g>`
    + `<g>${spin(420, -1)}${beads}<g fill="none" stroke="${palette.faint}" stroke-width="0.55">${scallops}</g></g>`
    + `<g fill="none" stroke="${palette.ink}" stroke-width="0.6">${spin(600, 1)}${petals}<g stroke="${palette.faint}">${innerPetals}</g></g>`
    + `<path d="${star}" fill="none" stroke="${palette.faint}" stroke-width="0.6"/>`
    + `<g fill="${palette.foil}">${tips}</g>`
    + `<path d="${spokes}" stroke="${palette.faint}" stroke-width="0.5"/>`
    + `<g fill="none" stroke="${palette.ink}" stroke-width="0.5">${spin(260, 1)}${copies}</g>`
    + `<g fill="none" stroke="${palette.foil}" stroke-width="${dense ? 0.55 : 0.95}" opacity="${dense ? 0.7 : 1}" stroke-linecap="round"><path d="${primary}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${animate ? 1 : 0}">${draw}</path></g>`
    + `<g fill="${palette.ink}">${seeds}</g><circle r="3" fill="${palette.foil}"/>`
    + `</svg>`;
};

export const kaleidoDataUri = (svg: string) => `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;

/** A small divider rosette in the page's own symmetry: the guilloché curve with the
 *  principal curve inside it, for the section dividers (kaleido.css). */
export const kaleidoDividerSvg = (spec: KaleidoSpec, palette: KaleidoPalette): string => {
  const outer = pathOf(curvePoints(spec.family, 28));
  const inner = pathOf(curvePoints(spec.primary, 16));
  const dense = spec.primary.kind === 'maurer';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 -32 64 64">`
    + `<circle r="30" fill="none" stroke="${palette.faint}" stroke-width="0.6"/>`
    + `<path d="${outer}" fill="none" stroke="${palette.ink}" stroke-width="0.6"/>`
    + `<path d="${inner}" fill="none" stroke="${palette.foil}" stroke-width="${dense ? 0.35 : 0.9}"/>`
    + `<circle r="1.6" fill="${palette.foil}"/>`
    + `</svg>`;
};
