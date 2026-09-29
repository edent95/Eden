import React from 'react';
import type { CssArtComponent } from './index';
import { curvePoints, kaleidoDataUri, kaleidoSvg, pathOf, type KaleidoCurve, type KaleidoSpec } from '../../app/kaleido';

/* ---- /igaming hero stage (styles/css-art/igaming-hero.css, `.hs`) ----
   The key-points hero as a lit, layered banknote stage, every line computed:
   · back   — two guilloché families (a hypotrochoid and an epitrochoid, each drawn
              as rotated copies) turning against each other, so their overlap makes
              a slowly flowing moiré; sun rays and φ-spaced construction circles
              with a golden spiral r = a·e^(bθ), b = ln φ ÷ (π/2);
   · middle — two half-cut mandalas at the left and right edges, like the portrait
              ovals of a note, filled with a metallic gradient that turns with the
              pointer; the title sits in a pool of soft light, never on lines;
   · front  — casino chips, two playing cards and gold coins floating in the corners,
              each casting a soft shadow that moves away from the light.
   The whole plate tilts in 3D toward the pointer (layers at different depths give
   the parallax), a specular highlight follows it, and a foil glint sweeps the frame.
   Pointer depth runs for fine pointers only; everything is still under reduced motion. */

const MOIRE_A: KaleidoCurve = { kind: 'hypo', R: 8, r: 3, d: 5 };
const MOIRE_B: KaleidoCurve = { kind: 'epi', R: 7, r: 2, d: 3.4 };
const MEDAL_L: KaleidoSpec = { pos: 'center', size: 0, top: 0, primary: { kind: 'hypo', R: 10, r: 3, d: 6 }, family: { kind: 'epi', R: 7, r: 2, d: 3 }, copies: 6 };
const MEDAL_R: KaleidoSpec = { pos: 'center', size: 0, top: 0, primary: { kind: 'epi', R: 9, r: 4, d: 7 }, family: { kind: 'hypo', R: 11, r: 3, d: 5 }, copies: 7 };
const CHIP_FACE: KaleidoSpec = { pos: 'center', size: 0, top: 0, primary: { kind: 'rose', k: 5, n: 2 }, family: { kind: 'hypo', R: 6, r: 1, d: 2 }, copies: 4 };
const MASK_PALETTE = { ink: 'rgba(0,0,0,0.6)', foil: 'rgba(0,0,0,1)', faint: 'rgba(0,0,0,0.28)' };

const PHI = (1 + Math.sqrt(5)) / 2;

const goldenSpiral = () => {
  const b = Math.log(PHI) / (Math.PI / 2);
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= 900; i += 1) {
    const th = -6 * Math.PI + (i / 900) * 7.6 * Math.PI;
    const r = 4 * Math.exp(b * th);
    pts.push([r * Math.cos(th), r * Math.sin(th)]);
  }
  return pathOf(pts);
};

// a spade, from two cubic lobes and a flared stem — a shape, not a glyph
const SPADE = 'M0 -46C18 -26 44 -12 44 10C44 28 26 36 10 26C12 36 18 44 26 48L-26 48C-18 44 -12 36 -10 26C-26 36 -44 28 -44 10C-44 -12 -18 -26 0 -46Z';

// {5/2} star for the coins
const STAR5 = pathOf(Array.from({ length: 6 }, (_, i): [number, number] => {
  const a = ((i * 2) % 5) * ((2 * Math.PI) / 5);
  return [40 * Math.sin(a), -40 * Math.cos(a)];
}));

type Obj = { kind: 'chip' | 'chips' | 'card-back' | 'card-face' | 'coin'; x: number; y: number; z: number; s: number; r: number; tone?: string; bob: number };

// corners only: the centre column belongs to the headline and the buttons
const OBJECTS: Obj[] = [
  { kind: 'chips', x: 7, y: 16, z: 90, s: 10.5, r: -18, tone: 'green', bob: 7.5 },
  { kind: 'coin', x: 15, y: 30, z: 60, s: 5.2, r: 24, bob: 6.2 },
  { kind: 'card-back', x: 88, y: 13, z: 70, s: 9.5, r: 16, bob: 8.4 },
  { kind: 'card-face', x: 93, y: 20, z: 110, s: 9.5, r: 30, bob: 9.1 },
  { kind: 'chip', x: 90, y: 80, z: 100, s: 9, r: 12, tone: 'red', bob: 6.8 },
  { kind: 'coin', x: 80, y: 88, z: 70, s: 6, r: -12, bob: 7.7 },
  { kind: 'chip', x: 8, y: 84, z: 80, s: 8, r: 40, tone: 'ink', bob: 8.1 },
];

const style = (vars: Record<string, string | number>) => vars as React.CSSProperties;

export const IGamingHeroStage: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const raw = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');

  const geo = React.useMemo(() => ({
    a: pathOf(curvePoints(MOIRE_A, 480)),
    b: pathOf(curvePoints(MOIRE_B, 480)),
    spiral: goldenSpiral(),
    medalL: kaleidoDataUri(kaleidoSvg(MEDAL_L, MASK_PALETTE, false)),
    medalR: kaleidoDataUri(kaleidoSvg(MEDAL_R, MASK_PALETTE, false)),
    chipFace: kaleidoDataUri(kaleidoSvg(CHIP_FACE, MASK_PALETTE, false)),
  }), []);

  // pointer relative to the stage, −1 … 1, eased so the plate settles instead of snapping
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!(window.matchMedia?.('(pointer: fine)').matches ?? false)) return undefined;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    const paint = () => {
      frame = 0;
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      el.style.setProperty('--hs-x', current.x.toFixed(3));
      el.style.setProperty('--hs-y', current.y.toFixed(3));
      if (Math.abs(target.x - current.x) > 0.002 || Math.abs(target.y - current.y) > 0.002) frame = requestAnimationFrame(paint);
    };
    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1));
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const family = (id: string, d: string, copies: number, step: number) => (
    <>
      <defs><path id={id} d={d} /></defs>
      {Array.from({ length: copies }, (_, i) => <use key={i} href={`#${id}`} transform={`rotate(${(i * step).toFixed(2)})`} />)}
    </>
  );

  return (
    <div ref={ref} className="hs" aria-hidden style={style({ '--hs-medal-l': geo.medalL, '--hs-medal-r': geo.medalR, '--hs-chip-face': geo.chipFace })}>
      <div className="hs-tilt">
        <div className="hs-layer hs-paper" />
        <div className="hs-layer hs-back">
          <svg className="hs-moire is-a" viewBox="-500 -500 1000 1000">{family(`hsa${raw}`, geo.a, 16, 360 / 8 / 16)}</svg>
          <svg className="hs-moire is-b" viewBox="-500 -500 1000 1000">{family(`hsb${raw}`, geo.b, 14, 360 / 7 / 14)}</svg>
        </div>
        <div className="hs-layer hs-rays" />
        <div className="hs-layer hs-construct">
          <svg viewBox="-500 -310 1000 620" preserveAspectRatio="xMidYMid slice">
            {[300, 300 / PHI, 300 / PHI ** 2, 300 / PHI ** 3, 300 / PHI ** 4].map((r) => <circle key={r} r={r} className="hs-ring" />)}
            {[0, 30, 60, 90, 120, 150].map((a) => <line key={a} x1={-560} y1={0} x2={560} y2={0} transform={`rotate(${a})`} className="hs-ray-line" />)}
            <path d={geo.spiral} className="hs-spiral" />
          </svg>
        </div>
        <div className="hs-layer hs-medals">
          <i className="hs-medal is-l" />
          <i className="hs-medal is-r" />
        </div>
        <div className="hs-layer hs-pool" />
        <div className="hs-layer hs-front">
          {OBJECTS.map((o, i) => (
            <div key={i} className={`hs-obj is-${o.kind}${o.tone ? ` is-${o.tone}` : ''}`} style={style({ '--x': `${o.x}%`, '--y': `${o.y}%`, '--z': o.z, '--s': `${o.s}cqi`, '--r': `${o.r}deg`, '--bob': `${o.bob}s`, '--i': i })}>
              <i className="hs-shadow" />
              <div className="hs-body">
                {o.kind === 'chips' && <i className="hs-chip-disc is-under" />}
                {(o.kind === 'chip' || o.kind === 'chips') && <i className="hs-chip-disc"><i className="hs-chip-face" /></i>}
                {o.kind === 'coin' && (
                  <i className="hs-coin">
                    <svg viewBox="-50 -50 100 100"><path d={STAR5} className="hs-coin-star" /><circle r={44} className="hs-coin-ring" /></svg>
                  </i>
                )}
                {o.kind === 'card-back' && <i className="hs-card is-back" />}
                {o.kind === 'card-face' && (
                  <i className="hs-card is-face">
                    <svg viewBox="-60 -84 120 168">
                      <path d={SPADE} className="hs-spade" />
                      <path d={SPADE} className="hs-spade is-pip" transform="translate(-42 -62) scale(0.2)" />
                      <path d={SPADE} className="hs-spade is-pip" transform="translate(42 62) rotate(180) scale(0.2)" />
                    </svg>
                  </i>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="hs-layer hs-spec" />
        <div className="hs-layer hs-vignette" />
        <div className="hs-layer hs-grain" />
      </div>
    </div>
  );
};

/** Registry preview: the stage in a 16:9 box inked with the /igaming palette. */
export const IGamingHeroStageArt: CssArtComponent = ({ label }) => (
  <div className="igaming-page" role="img" aria-label={label} style={{ position: 'relative', aspectRatio: '16 / 9', isolation: 'isolate', borderRadius: 18 }}>
    <IGamingHeroStage />
  </div>
);
