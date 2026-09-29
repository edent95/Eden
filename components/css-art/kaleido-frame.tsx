import React from 'react';
import { curvePoints, pathOf, type KaleidoSpec } from '../../app/kaleido';

/* ---- Kaleido frame (styles/css-art/kaleido.css, `.kf`) ----
   A card border in the site's mandala language, computed rather than drawn:
   two hairline rounded rectangles with a guilloché band between them — two
   sine waves in opposite phase, y = ±A·sin(2πx/λ), λ fitted so every edge holds
   whole periods — beads on the points where the waves cross (every fourth one
   gold), and at each corner a small rosette made of the page's own emblem curves.
   Place it as the first child of a `position: relative` card. */

const INSET = 7;     // band centre line, px from the card edge
const AMP = 3.2;     // wave amplitude
const WAVE = 22;     // target wavelength
const CORNER = 22;   // straight-edge run left to each corner rosette

const wavePath = (len: number, phase: number) => {
  const run = Math.max(0, len - CORNER * 2);
  const periods = Math.max(1, Math.round(run / WAVE));
  const lambda = run / periods;
  const steps = periods * 16;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = (i / steps) * run;
    pts.push([CORNER + x, AMP * Math.sin((2 * Math.PI * x) / lambda + phase)]);
  }
  return { d: pathOf(pts), lambda, periods, run };
};

/** The frame follows the card's own border-radius, so it matches at every breakpoint. */
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
    ? { outer: pathOf(curvePoints(spec.family, 9.5)), inner: pathOf(curvePoints(spec.primary, 6)) }
    : null), [spec]);

  const edge = (len: number, transform: string, key: string) => {
    const a = wavePath(len, 0);
    const b = wavePath(len, Math.PI);
    const beads = Array.from({ length: a.periods * 2 + 1 }, (_, i) => (
      <circle key={i} cx={CORNER + (i * a.lambda) / 2} cy={0} r={i % 4 === 0 ? 1.6 : 0.8} className={i % 4 === 0 ? 'kf-bead is-gold' : 'kf-bead'} />
    ));
    return (
      <g key={key} transform={transform}>
        <path d={a.d} className="kf-wave" />
        <path d={b.d} className="kf-wave" />
        {beads}
      </g>
    );
  };

  return (
    <svg ref={ref} className="kf" width={w} height={h} viewBox={`0 0 ${w || 1} ${h || 1}`} aria-hidden>
      {w > 0 && (
        <>
          <rect x={0.5} y={0.5} width={w - 1} height={h - 1} rx={radius} className="kf-line" />
          <rect x={INSET * 2} y={INSET * 2} width={w - INSET * 4} height={h - INSET * 4} rx={Math.max(4, radius - INSET * 2)} className="kf-line is-faint" />
          {edge(w - INSET * 2, `translate(${INSET} ${INSET})`, 'top')}
          {edge(w - INSET * 2, `translate(${w - INSET} ${h - INSET}) rotate(180)`, 'bottom')}
          {edge(h - INSET * 2, `translate(${w - INSET} ${INSET}) rotate(90)`, 'right')}
          {edge(h - INSET * 2, `translate(${INSET} ${h - INSET}) rotate(-90)`, 'left')}
          {rosette && [[INSET + 10, INSET + 10], [w - INSET - 10, INSET + 10], [w - INSET - 10, h - INSET - 10], [INSET + 10, h - INSET - 10]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r={11} className="kf-disc" />
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
