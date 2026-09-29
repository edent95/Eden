// Site-wide "kaleidoscope" skeleton: every page gets its own symmetric math emblem
// (spirograph curves, Maurer roses, guilloché families) with the formula engraved on
// its rim, drawn behind the page content on `.page-shell::after` (styles/css-art/kaleido.css).
// Everything is computed here from the formulas — no images, no hand-drawn paths.

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

export const formulaOf = (curve: KaleidoCurve): string => {
  switch (curve.kind) {
    case 'hypo': return `x = (R−r)cos t + d·cos((R−r)t/r) · R:r:d = ${curve.R}:${curve.r}:${curve.d}`;
    case 'epi': return `x = (R+r)cos t − d·cos((R+r)t/r) · R:r:d = ${curve.R}:${curve.r}:${curve.d}`;
    case 'maurer': return `r = sin(${curve.n}θ) · θₖ = k·${curve.deg}° · k = 0…360`;
    default: return `r = cos(${curve.k}${curve.n ? `/${curve.n}` : ''} · θ)`;
  }
};

export type KaleidoPalette = { ink: string; foil: string; faint: string };

export const KALEIDO_PALETTE: Record<'light' | 'dark', KaleidoPalette> = {
  light: { ink: 'rgba(40,52,44,0.34)', foil: 'rgba(184,134,47,0.9)', faint: 'rgba(40,52,44,0.12)' },
  dark: { ink: 'rgba(239,232,218,0.22)', foil: 'rgba(242,207,122,0.85)', faint: 'rgba(239,232,218,0.08)' },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** A standalone SVG document (for a data URI) with SMIL draw-in and slow rotation. */
export const kaleidoSvg = (spec: KaleidoSpec, palette: KaleidoPalette, animate: boolean): string => {
  const family = pathOf(curvePoints(spec.family, 150));
  const primary = pathOf(curvePoints(spec.primary, 132));
  // Maurer roses are 360 chords: drawn at spirograph weight they fill into a solid blot
  const dense = spec.primary.kind === 'maurer';
  const step = 360 / Math.max(1, spec.copies) / 3;
  const copies = Array.from({ length: spec.copies }, (_, i) =>
    `<path d="${family}" transform="rotate(${(i * step).toFixed(2)})"/>`).join('');
  const rim = esc(`${formulaOf(spec.primary)}  ✦  ${formulaOf(spec.family)}  ✦  `).repeat(2);
  const draw = animate
    ? '<animate attributeName="stroke-dashoffset" from="1" to="0" dur="3.2s" fill="freeze" calcMode="spline" keySplines="0.45 0 0.25 1" keyTimes="0;1"/>'
    : '';
  const spin = (dur: number, dir: 1 | -1) => (animate
    ? `<animateTransform attributeName="transform" type="rotate" from="0" to="${360 * dir}" dur="${dur}s" repeatCount="indefinite"/>`
    : '');
  const circles = [150, 150 / 1.618, 150 / 2.618, 150 / 4.236]
    .map((r) => `<circle r="${r.toFixed(2)}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-190 -190 380 380">`
    + `<defs><path id="rim" d="M0 -172 A172 172 0 1 1 -0.01 -172"/></defs>`
    + `<g fill="none" stroke="${palette.faint}" stroke-width="0.6">${circles}</g>`
    + `<g fill="none" stroke="${palette.ink}" stroke-width="0.55">${spin(260, 1)}${copies}</g>`
    + `<g fill="none" stroke="${palette.foil}" stroke-width="${dense ? 0.55 : 1.5}" opacity="${dense ? 0.7 : 1}" stroke-linecap="round"><path d="${primary}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${animate ? 1 : 0}">${draw}</path></g>`
    + `<g fill="${palette.ink}" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="9.5" letter-spacing="0.8">${spin(360, -1)}<text><textPath href="#rim">${rim}</textPath></text></g>`
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
