import React from 'react';
import type { CssArtComponent, IGamingBannerVariant } from './index';
import { IGAMING_BANNER_TONE, IGamingEngravedBanner } from './index';
import { curvePoints, kaleidoDataUri, kaleidoSvg, pathOf, type KaleidoCurve, type KaleidoSpec } from '../../app/kaleido';

/* ---- /igaming lit stages (styles/css-art/igaming-hero.css, `.hs`) ----
   Layered, lit banknote stages, every line computed:
   · back   — two guilloché families (a hypotrochoid and an epitrochoid, each drawn
              as rotated copies) turning against each other, so their overlap makes
              a slowly flowing moiré;
   · middle — (hero) sun rays, φ-spaced circles with a golden spiral
              r = a·e^(bθ), b = ln φ ÷ (π/2), and two half-cut mandala ovals in a
              pointer-lit metallic gradient; (card banners) the engraved subject,
              lifted off the paper with a cast shadow;
   · a pool of soft light where the headline / subject sits, never lines;
   · front  — (hero) two playing cards floating in the top-right corner, casting a
              shadow that moves away from the light.
   The plate tilts in 3D toward the pointer — the whole window for the hero, only
   while hovering the card for a banner — so layers at different depths separate;
   a specular highlight follows it, with a vignette and grain on top.
   Pointer depth runs for fine pointers only; everything is still under reduced motion. */

const MASK_PALETTE = { ink: 'rgba(0,0,0,0.6)', foil: 'rgba(0,0,0,1)', faint: 'rgba(0,0,0,0.28)' };
const PHI = (1 + Math.sqrt(5)) / 2;

const spec = (primary: KaleidoCurve, family: KaleidoCurve, copies: number): KaleidoSpec =>
  ({ pos: 'center', size: 0, top: 0, primary, family, copies });

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

type Obj = { kind: 'card-back' | 'card-face'; x: number; y: number; z: number; s: number; r: number; bob: number };

const style = (vars: Record<string, string | number>) => vars as React.CSSProperties;

/** Eased pointer (−1 … 1) written as --hs-x / --hs-y on the stage. `window`: relative
 *  to the stage wherever the pointer is; `hover`: only while over `hoverRoot`. */
const useStagePointer = (ref: React.RefObject<HTMLDivElement | null>, mode: 'window' | 'hover', hoverRoot?: string) => {
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
      current.x += (target.x - current.x) * 0.09;
      current.y += (target.y - current.y) * 0.09;
      el.style.setProperty('--hs-x', current.x.toFixed(3));
      el.style.setProperty('--hs-y', current.y.toFixed(3));
      if (Math.abs(target.x - current.x) > 0.002 || Math.abs(target.y - current.y) > 0.002) frame = requestAnimationFrame(paint);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1));
      schedule();
    };
    const onLeave = () => { target.x = 0; target.y = 0; schedule(); };
    const host: HTMLElement | Window = mode === 'window' ? window : ((hoverRoot && el.closest<HTMLElement>(hoverRoot)) || el);
    host.addEventListener('pointermove', onMove as EventListener, { passive: true });
    if (mode === 'hover') host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove as EventListener);
      host.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, mode, hoverRoot]);
};

/** The moiré back layer: two formula families as rotated copies of one path each. */
const Moire: React.FC<{ a: KaleidoCurve; b: KaleidoCurve }> = ({ a, b }) => {
  const raw = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const paths = React.useMemo(() => ({ a: pathOf(curvePoints(a, 480)), b: pathOf(curvePoints(b, 480)) }), [a, b]);
  const family = (id: string, d: string, copies: number, step: number) => (
    <>
      <defs><path id={id} d={d} /></defs>
      {Array.from({ length: copies }, (_, i) => <use key={i} href={`#${id}`} transform={`rotate(${(i * step).toFixed(2)})`} />)}
    </>
  );
  return (
    <div className="hs-layer hs-back">
      <svg className="hs-moire is-a" viewBox="-500 -500 1000 1000">{family(`hsa${raw}`, paths.a, 16, 360 / 8 / 16)}</svg>
      <svg className="hs-moire is-b" viewBox="-500 -500 1000 1000">{family(`hsb${raw}`, paths.b, 14, 360 / 7 / 14)}</svg>
    </div>
  );
};

const Overlays: React.FC = () => (
  <>
    <div className="hs-spec" />
    <div className="hs-vignette" />
    <div className="hs-grain" />
  </>
);

/* ---------- hero ---------- */

const HERO_A: KaleidoCurve = { kind: 'hypo', R: 8, r: 3, d: 5 };
const HERO_B: KaleidoCurve = { kind: 'epi', R: 7, r: 2, d: 3.4 };
const MEDAL_L = spec({ kind: 'hypo', R: 10, r: 3, d: 6 }, { kind: 'epi', R: 7, r: 2, d: 3 }, 6);
const MEDAL_R = spec({ kind: 'epi', R: 9, r: 4, d: 7 }, { kind: 'hypo', R: 11, r: 3, d: 5 }, 7);

// the top-right corner only: the centre column belongs to the headline and the buttons
const OBJECTS: Obj[] = [
  { kind: 'card-back', x: 87, y: 14, z: 70, s: 10, r: 14, bob: 8.4 },
  { kind: 'card-face', x: 92.5, y: 21, z: 110, s: 10, r: 30, bob: 9.1 },
];

export const IGamingHeroStage: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  useStagePointer(ref, 'window');
  const geo = React.useMemo(() => ({
    spiral: goldenSpiral(),
    medalL: kaleidoDataUri(kaleidoSvg(MEDAL_L, MASK_PALETTE, false)),
    medalR: kaleidoDataUri(kaleidoSvg(MEDAL_R, MASK_PALETTE, false)),
  }), []);

  return (
    <div ref={ref} className="hs is-hero" aria-hidden style={style({ '--hs-medal-l': geo.medalL, '--hs-medal-r': geo.medalR })}>
      <div className="hs-tilt">
        <div className="hs-layer hs-paper" />
        <Moire a={HERO_A} b={HERO_B} />
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
            <div key={i} className={`hs-obj is-${o.kind}`} style={style({ '--x': `${o.x}%`, '--y': `${o.y}%`, '--z': o.z, '--s': `${o.s}cqi`, '--r': `${o.r}deg`, '--bob': `${o.bob}s`, '--i': i })}>
              <i className="hs-shadow" />
              <div className="hs-body">
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
      </div>
      <Overlays />
    </div>
  );
};

/* ---------- card banners ---------- */

// each banner gets its own pair of curves, so the six moirés all differ
const BANNER_CURVES: Record<IGamingBannerVariant, [KaleidoCurve, KaleidoCurve]> = {
  table: [{ kind: 'hypo', R: 7, r: 3, d: 4 }, { kind: 'epi', R: 5, r: 1, d: 2 }],
  chips: [{ kind: 'epi', R: 6, r: 1, d: 2.5 }, { kind: 'hypo', R: 9, r: 4, d: 3 }],
  loop: [{ kind: 'hypo', R: 5, r: 2, d: 3 }, { kind: 'epi', R: 8, r: 3, d: 2 }],
  ledger: [{ kind: 'hypo', R: 11, r: 4, d: 6 }, { kind: 'epi', R: 4, r: 1, d: 1.4 }],
  gears: [{ kind: 'epi', R: 9, r: 2, d: 3 }, { kind: 'hypo', R: 6, r: 1, d: 2.2 }],
  compass: [{ kind: 'hypo', R: 8, r: 3, d: 5 }, { kind: 'epi', R: 7, r: 4, d: 3 }],
};

/** A card banner on its own small lit stage: the engraved subject (paper removed) floats
 *  over a moiré of this banner's curves, lifted by a cast shadow, and the stage tilts
 *  toward the pointer while the card (`hoverRoot`) is hovered. */
export const IGamingBannerStage: React.FC<{ variant: IGamingBannerVariant; label: string; hoverRoot?: string }> = ({ variant, label, hoverRoot }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useStagePointer(ref, 'hover', hoverRoot);
  const [a, b] = BANNER_CURVES[variant];
  return (
    <div ref={ref} className={`hs is-banner engraved-tone-${IGAMING_BANNER_TONE[variant]}`}>
      <div className="hs-tilt">
        <div className="hs-layer hs-paper" aria-hidden />
        <Moire a={a} b={b} />
        <div className="hs-layer hs-pool" />
        <div className="hs-subject">
          <IGamingEngravedBanner variant={variant} label={label} />
        </div>
      </div>
      <Overlays />
    </div>
  );
};

/** Registry preview: the hero stage in a 16:9 box inked with the /igaming palette. */
export const IGamingHeroStageArt: CssArtComponent = ({ label }) => (
  <div className="igaming-page" role="img" aria-label={label} style={{ position: 'relative', aspectRatio: '16 / 9', isolation: 'isolate', borderRadius: 18 }}>
    <IGamingHeroStage />
  </div>
);
