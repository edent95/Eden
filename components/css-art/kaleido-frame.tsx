import React from 'react';
import { curvePoints, pathOf, type KaleidoSpec } from '../../app/kaleido';

/* ---- Kaleido frame (styles/css-art/kaleido.css, `.kf`) ----
   A card border in the site's mandala language, computed rather than drawn:
   three hairline rounded rectangles (the innermost dotted) with a guilloché braid
   between the outer two — a main pair of sine waves in opposite phase,
   y = ±A·sin(2πx/λ), and a fine pair at twice the frequency and half the
   amplitude, λ fitted so every edge holds whole periods — beads where the main
   waves cross (every fourth one gold), a small medallion at the middle of each
   long edge, and at each corner a rosette made of the page's own emblem curves
   over an {8/3} star.
   Place it as the first child of a `position: relative` card; it follows the
   card's own border-radius, so it matches at every breakpoint. */

const INSET = 7;       // band centre line, px from the card edge
const AMP = 3.2;       // main wave amplitude
const WAVE = 22;       // target wavelength
const CORNER = 22;     // straight-edge run left to each corner rosette
const MEDAL = 9;       // half-width kept clear around a mid-edge medallion
const MEDAL_MIN = 260; // edges shorter than this get no medallion

const wave = (from: number, to: number, periods: number, amp: number, phase: number) => {
  const run = to - from;
  const steps = Math.max(8, Math.round(periods * 16));
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = (i / steps) * run;
    pts.push([from + x, amp * Math.sin((2 * Math.PI * periods * x) / run + phase)]);
  }
  return pathOf(pts);
};

// {8/3} star polygon inside each corner disc
const STAR = pathOf(Array.from({ length: 9 }, (_, i): [number, number] => {
  const a = ((i * 3) % 8) * (Math.PI / 4);
  return [9 * Math.sin(a), -9 * Math.cos(a)];
}));

export const KaleidoFrame: React.FC<{ spec: KaleidoSpec | null }> = ({ spec }) => {
  const ref = React.useRef<SVGSVGElement>(null);
  const [size, setSize] = React.useState<[number, number, number]>([0, 0, 0]);

  React.useLayoutEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return undefined;
    const measure = () => setSize([el.offsetWidth, el.offsetHeight, parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0]);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [w, h, radius] = size;
  const rosette = React.useMemo(() => (spec
    ? {
      outer: pathOf(curvePoints(spec.family, 9.5)),
      inner: pathOf(curvePoints(spec.primary, 6)),
      medal: pathOf(curvePoints(spec.primary, 5.5)),
    }
    : null), [spec]);

  const edge = (len: number, transform: string, key: string) => {
    const medal = len >= MEDAL_MIN;
    const mid = len / 2;
    const segs: Array<[number, number]> = medal ? [[CORNER, mid - MEDAL], [mid + MEDAL, len - CORNER]] : [[CORNER, len - CORNER]];
    return (
      <g key={key} transform={transform}>
        {segs.map(([a, b], s) => {
          const periods = Math.max(1, Math.round((b - a) / WAVE));
          const lambda = (b - a) / periods;
          return (
            <g key={s}>
              <path d={wave(a, b, periods * 2, AMP / 2, Math.PI / 2)} className="kf-wave is-fine" />
              <path d={wave(a, b, periods * 2, AMP / 2, -Math.PI / 2)} className="kf-wave is-fine" />
              <path d={wave(a, b, periods, AMP, 0)} className="kf-wave" />
              <path d={wave(a, b, periods, AMP, Math.PI)} className="kf-wave" />
              {Array.from({ length: periods * 2 + 1 }, (_, i) => (
                <circle key={i} cx={a + (i * lambda) / 2} cy={0} r={i % 4 === 0 ? 1.6 : 0.8} className={i % 4 === 0 ? 'kf-bead is-gold' : 'kf-bead'} />
              ))}
            </g>
          );
        })}
        {medal && rosette && (
          <g transform={`translate(${mid} 0)`}>
            <circle r={7.5} className="kf-disc" />
            <path d={rosette.medal} className="kf-rosette-inner" />
            <circle r={1.3} className="kf-bead is-gold" />
          </g>
        )}
      </g>
    );
  };

  const c = INSET + 10;
  return (
    <svg ref={ref} className="kf" width={w} height={h} viewBox={`0 0 ${w || 1} ${h || 1}`} aria-hidden>
      {w > 0 && (
        <>
          <rect x={0.5} y={0.5} width={w - 1} height={h - 1} rx={radius} className="kf-line" />
          <rect x={INSET * 2} y={INSET * 2} width={w - INSET * 4} height={h - INSET * 4} rx={Math.max(3, radius - INSET * 2)} className="kf-line is-faint" />
          <rect x={INSET * 2 + 3} y={INSET * 2 + 3} width={w - INSET * 4 - 6} height={h - INSET * 4 - 6} rx={Math.max(2, radius - INSET * 2 - 3)} className="kf-line is-dotted" />
          {edge(w - INSET * 2, `translate(${INSET} ${INSET})`, 'top')}
          {edge(w - INSET * 2, `translate(${w - INSET} ${h - INSET}) rotate(180)`, 'bottom')}
          {edge(h - INSET * 2, `translate(${w - INSET} ${INSET}) rotate(90)`, 'right')}
          {edge(h - INSET * 2, `translate(${INSET} ${h - INSET}) rotate(-90)`, 'left')}
          {rosette && [[c, c], [w - c, c], [w - c, h - c], [c, h - c]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r={11} className="kf-disc" />
              <path d={STAR} className="kf-star" />
              <g className="kf-rosette">
                <path d={rosette.outer} className="kf-rosette-outer" />
                <path d={rosette.inner} className="kf-rosette-inner" />
              </g>
              <circle r={1.6} className="kf-bead is-gold" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
};
