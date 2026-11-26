import React from 'react';
import type { CssArtComponent } from './index';

/* ---- /jiju-pet "How Jiju runs itself" illustrations (styles/css-art/jiju-story.css, `.jjart`) ----
   Drawn by the golden-ratio rules of the Jiju brand (golden-design-system skill):
   · canvases are Fibonacci golden rectangles — banner 610 × 233 (night = 377 × 233 golden rectangle,
     day = 233 × 233 square, seam at 610/φ), spots 89 × 55, storefront 233 × 144;
   · sizes and radii are Fibonacci numbers (2 3 5 8 13 21 34 55 89 …); shapes are circles,
     rounded rectangles and straight polygons — no Bézier curves;
   · no outlines: flat fills only, separated by the three φ tones of one hue (main / tint / deep);
   · colours are Jiju's golden-angle palette (amber #F59E0B, hue + k × 137.5° in OKLCH):
     amber, sky, rose, leaf, iris, coral — each belief spot leads with one hue, in that order.
   No words inside the art (the page around it is bilingual). An empty label makes the art
   decorative (aria-hidden). Every loop stops under prefers-reduced-motion. */

/** Decorative when used next to text that already says the same thing (empty label). */
const a11y = (label: string) => (label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const });

/** Helper robot, 21 wide × 42 tall, origin at the top-left of the head. */
const Robot: React.FC<{ x: number; y: number; className?: string }> = ({ x, y, className = '' }) => (
  <g className={`jjart-robot ${className}`} transform={`translate(${x} ${y})`}>
    <rect x="9.5" y="-6" width="2" height="6" rx="1" className="f-iris-deep" />
    <circle cx="10.5" cy="-7" r="3" className="f-amber" />
    <rect x="0" y="0" width="21" height="13" rx="5" className="f-iris-tint" />
    <circle cx="7" cy="6.5" r="2" className="f-iris-deep" />
    <circle cx="14" cy="6.5" r="2" className="f-iris-deep" />
    <rect x="3" y="15" width="15" height="13" rx="3" className="f-iris" />
    <rect x="5" y="30" width="3" height="5" rx="1.5" className="f-iris-deep" />
    <rect x="13" y="30" width="3" height="5" rx="1.5" className="f-iris-deep" />
  </g>
);

/** Shop card, 21 × 13; optional verified badge (leaf). */
const Card: React.FC<{ x: number; y: number; className?: string; check?: boolean }> = ({ x, y, className = '', check = false }) => (
  <g className={`jjart-card ${className}`} transform={`translate(${x} ${y})`}>
    <rect width="21" height="13" rx="3" className="f-paper" />
    <rect x="3" y="3" width="8" height="2" rx="1" className="f-sky" />
    <rect x="3" y="8" width="13" height="2" rx="1" className="f-line" />
    {check && (
      <g transform="translate(19 -2)">
        <circle r="5" className="f-leaf" />
        <path d="M-2.2 0 L-0.6 1.8 L2.4 -1.6" className="jjart-tick" />
      </g>
    )}
  </g>
);

/** The Jiju black cat with amber eyes, 34 wide; origin at the paws' baseline, left. */
const Cat: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g className="jjart-cat" transform={`translate(${x} ${y})`}>
    <g className="jjart-cat-tail"><rect x="29" y="-21" width="3" height="13" rx="1.5" className="f-cat" /></g>
    <rect x="5" y="-16" width="26" height="13" rx="6.5" className="f-cat" />
    <circle cx="8" cy="-18" r="8" className="f-cat" />
    <polygon points="1,-21 2,-29 7,-24" className="f-cat" />
    <polygon points="9,-24 14,-29 15,-21" className="f-cat" />
    <circle cx="5" cy="-18" r="1.6" className="f-amber" />
    <circle cx="11" cy="-18" r="1.6" className="f-amber" />
    <rect x="8" y="-5" width="3" height="5" rx="1.5" className="f-cat" />
    <rect x="24" y="-5" width="3" height="5" rx="1.5" className="f-cat" />
  </g>
);

/** Magnifier lens built from two filled circles (no outline), handle a rotated bar. */
const Lens: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 8 }) => (
  <g transform={`translate(${x} ${y})`}>
    <g transform="rotate(-45)"><rect x={-r * 0.3} y={r * 0.7} width={r * 0.6} height={r * 1.2} rx={r * 0.3} className="f-iris-deep" /></g>
    <circle r={r} className="f-iris-deep" />
    <circle r={r * 0.68} className="f-sky-tint" />
  </g>
);

/** Shopfront with a scalloped awning; 89 wide (Fibonacci). Origin top-left of the awning. */
const Shop: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g className="jjart-shop" transform={`translate(${x} ${y})`}>
    <rect x="0" y="8" width="89" height="81" className="f-amber-tint" />
    {/* scallops first, the awning bar on top: only their lower halves show */}
    {Array.from({ length: 6 }, (_, index) => (
      <circle key={index} cx={-5 + 8.25 + index * 16.5} cy="13" r="8.25" className={index % 2 ? 'f-coral-tint' : 'f-coral'} />
    ))}
    <rect x="-5" y="0" width="99" height="13" rx="3" className="f-coral" />
    <rect x="8" y="34" width="34" height="21" rx="3" className="f-sky-tint" />
    <rect x="18" y="42" width="13" height="10" rx="2" className="f-paper" />
    <circle cx="24.5" cy="38" r="2" className="f-sky jjart-steam" />
    <rect x="55" y="34" width="21" height="55" rx="3" className="f-leaf" />
    <circle cx="71" cy="63" r="2" className="f-leaf-deep" />
    <rect x="8" y="64" width="34" height="5" rx="2.5" className="f-amber" />
  </g>
);

export const JijuNightDayArt: CssArtComponent = ({ label }) => (
  <svg className="jjart jjart-nightday" viewBox="0 0 610 233" {...a11y(label)}>
    <defs>
      <clipPath id="jjart-frame"><rect width="610" height="233" rx="21" /></clipPath>
    </defs>
    <g clipPath="url(#jjart-frame)">
      {/* night: golden rectangle 377 × 233 */}
      <rect width="377" height="233" className="f-night" />
      <circle cx="233" cy="144" r="144" className="f-night-glow" />
      <circle cx="55" cy="55" r="21" className="f-amber-tint" />
      <circle cx="68" cy="47" r="18" className="f-night" />
      {[[110, 34], [178, 21], [233, 55], [300, 30], [34, 110], [340, 89], [150, 89]].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r={index % 2 ? 1.5 : 2.5} className={`f-amber-tint jjart-star jjart-star-${index % 3}`} />
      ))}
      <rect x="0" y="178" width="377" height="55" className="f-night-deep" />

      {/* laptop on the golden line x = 377/φ ≈ 233 */}
      <g className="jjart-laptop">
        <rect x="189" y="115" width="89" height="58" rx="5" className="f-night-deep" />
        <rect x="194" y="120" width="79" height="48" rx="3" className="f-screen" />
        <rect x="202" y="128" width="34" height="5" rx="2.5" className="f-sky" />
        <rect x="202" y="139" width="55" height="5" rx="2.5" className="f-iris-tint" />
        <rect x="202" y="150" width="42" height="5" rx="2.5" className="f-iris-tint" />
        <g transform="translate(260 152)"><g className="jjart-screen-tick"><circle r="6" className="f-leaf" /><path d="M-2.6 0 L-0.7 2.1 L2.8 -1.9" className="jjart-tick" /></g></g>
        <polygon points="178,173 289,173 297,180 170,180" className="f-iris" />
      </g>
      <g className="jjart-helpers">
        <g className="jjart-bob jjart-bob-1"><Robot x={34} y={143} /><Card x={55} y={150} /></g>
        <g className="jjart-bob jjart-bob-2"><Robot x={97} y={143} /><Card x={118} y={150} /></g>
        <Card x={145} y={128} className="jjart-fly" />
      </g>
      <g className="jjart-checker">
        <Robot x={316} y={143} />
        <g className="jjart-magnifier"><Lens x={306} y={136} r={8} /></g>
      </g>

      {/* day: 233 × 233 square */}
      <rect x="377" width="233" height="233" className="f-day" />
      <rect x="377" y="178" width="233" height="55" className="f-ground" />
      <g transform="translate(576 34)">
        <g className="jjart-sun-rays">
          {Array.from({ length: 8 }, (_, index) => (
            <g key={index} transform={`rotate(${index * 45})`}><rect x="-1.5" y="-21" width="3" height="5" rx="1.5" className="f-amber" /></g>
          ))}
        </g>
        <circle r="13" className="f-amber" />
      </g>
      <Shop x={500} y={89} />
      <g className="jjart-walk">
        <circle cx="433" cy="118" r="8" className="f-coral-tint" />
        <rect x="425" y="108" width="16" height="6" rx="3" className="f-iris-deep" />
        <rect x="423" y="128" width="21" height="34" rx="8" className="f-sky" />
        <rect x="425" y="160" width="6" height="18" rx="3" className="f-iris-deep" />
        <rect x="436" y="160" width="6" height="18" rx="3" className="f-iris-deep" />
        <rect x="441" y="136" width="8" height="13" rx="2" className="f-iris-deep" />
        <rect x="442.5" y="138" width="5" height="8" rx="1" className="f-leaf-tint" />
        <Cat x={455} y={178} />
      </g>
      <g className="jjart-popcard"><Card x={444} y={104} check /></g>

      {/* morning stamp on the seam, at the golden point (610/φ, 233/φ) */}
      <g transform="translate(377 144)">
        <g className="jjart-stamp">
          <circle r="21" className="f-leaf-tint" />
          <circle r="13" className="f-leaf" />
          <path d="M-5.5 0 L-1.5 4 L6 -4.5" className="jjart-tick jjart-tick-big" />
        </g>
      </g>
    </g>
  </svg>
);

/* ---------- belief spot illustrations (89 × 55 golden rectangle) ---------- */

const Spot: React.FC<{ label: string; kind: string; hue: string; children: React.ReactNode }> = ({ label, kind, hue, children }) => (
  <svg className={`jjart jjart-spot jjart-spot-${kind}`} viewBox="0 0 89 55" {...a11y(label)}>
    <rect width="89" height="55" rx="8" className={`f-${hue}-tint`} />
    {children}
  </svg>
);

export const JijuBeliefDecideArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="decide" hue="amber">
    <Robot x={8} y={13} />
    <Card x={27} y={21} />
    <g className="jjart-press">
      <rect x="60" y="5" width="8" height="13" rx="3" className="f-amber-deep" />
      <rect x="55" y="17" width="18" height="5" rx="2" className="f-amber-deep" />
    </g>
    <g transform="translate(64 39)"><g className="jjart-press-mark"><circle r="8" className="f-leaf" /><path d="M-3.4 0 L-1 2.6 L3.8 -2.6" className="jjart-tick" /></g></g>
  </Spot>
);

export const JijuBeliefSourceArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="source" hue="sky">
    <rect x="5" y="8" width="34" height="21" rx="5" className="f-paper" />
    <polygon points="11,28 11,36 19,28" className="f-paper" />
    <circle cx="16" cy="19" r="3" className="f-sky" /><rect x="13" y="14" width="3" height="5" rx="1.5" className="f-sky" />
    <circle cx="27" cy="19" r="3" className="f-sky" /><rect x="24" y="14" width="3" height="5" rx="1.5" className="f-sky" />
    {[43, 47, 51].map((cx) => <circle key={cx} cx={cx} cy="21" r="1.2" className="f-sky-deep jjart-dot" />)}
    <rect x="55" y="5" width="26" height="42" rx="3" className="f-paper" />
    <rect x="59" y="10" width="13" height="3" rx="1.5" className="f-line" />
    <rect x="58" y="18" width="21" height="8" rx="2" className="f-amber jjart-highlight" />
    <rect x="59" y="31" width="16" height="3" rx="1.5" className="f-line" />
    <rect x="59" y="38" width="10" height="3" rx="1.5" className="f-line" />
  </Spot>
);

export const JijuBeliefBlankArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="blank" hue="rose">
    <rect x="8" y="5" width="47" height="45" rx="5" className="f-paper" />
    <rect x="14" y="11" width="21" height="3" rx="1.5" className="f-rose" />
    <rect x="14" y="19" width="34" height="3" rx="1.5" className="f-line" />
    <rect x="14" y="28" width="34" height="13" rx="3" className="f-rose-tint jjart-blank-field" />
    <rect x="18" y="31" width="1.6" height="7" className="f-rose-deep jjart-caret" />
    <g transform="translate(70 8) rotate(30)">
      <rect x="-3" y="0" width="6" height="26" rx="2" className="f-amber" />
      <polygon points="-3,26 0,32 3,26" className="f-amber-deep" />
    </g>
    <g transform="translate(70 28) rotate(45)"><rect x="-13" y="-1.5" width="26" height="3" rx="1.5" className="f-coral-deep" /></g>
    <g transform="translate(70 28) rotate(-45)"><rect x="-13" y="-1.5" width="26" height="3" rx="1.5" className="f-coral-deep" /></g>
  </Spot>
);

export const JijuBeliefCheckArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="check" hue="leaf">
    <Robot x={3} y={13} />
    <g transform="translate(26 30) rotate(-35)"><g className="jjart-pen"><rect x="-1.5" y="-13" width="3" height="13" rx="1.5" className="f-amber" /></g></g>
    <rect x="29" y="8" width="29" height="39" rx="3" className="f-paper" />
    <rect x="33" y="14" width="18" height="3" rx="1.5" className="f-leaf" />
    <rect x="33" y="21" width="21" height="3" rx="1.5" className="f-line" />
    <rect x="33" y="28" width="13" height="3" rx="1.5" className="f-line" />
    <Robot x={64} y={13} />
    <g className="jjart-scan"><Lens x={50} y={24} r={6} /></g>
  </Spot>
);

export const JijuBeliefSaveArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="save" hue="iris">
    <circle cx="76" cy="12" r="5" className="f-amber" />
    <circle cx="79" cy="10" r="4.4" className="f-iris-tint" />
    <circle cx="44" cy="32" r="15" className="f-rose" />
    <circle cx="28" cy="32" r="8" className="f-rose" />
    <circle cx="24" cy="33" r="3" className="f-rose-deep" />
    <polygon points="34,20 37,13 41,19" className="f-rose" />
    <circle cx="28" cy="29" r="1.3" className="f-iris-deep" />
    <rect x="35" y="44" width="5" height="7" rx="2" className="f-rose-deep" />
    <rect x="49" y="44" width="5" height="7" rx="2" className="f-rose-deep" />
    <rect x="40" y="18" width="10" height="2.5" rx="1.25" className="f-rose-deep" />
    <g className="jjart-coin">
      <circle cx="45" cy="8" r="5" className="f-amber" />
      <rect x="44" y="5" width="2" height="6" rx="1" className="f-amber-deep" />
    </g>
  </Spot>
);

/* ---------- storefront used inside the phone mock-up (233 × 144) ---------- */

export const JijuStorefrontArt: CssArtComponent = ({ label }) => (
  <svg className="jjart jjart-storefront" viewBox="0 0 233 144" {...a11y(label)}>
    <rect width="233" height="144" className="f-day" />
    <circle cx="199" cy="34" r="13" className="f-amber" />
    <rect x="0" y="123" width="233" height="21" className="f-ground" />
    <Shop x={72} y={34} />
    <Cat x={21} y={123} />
  </svg>
);

/* ---------- /jiju-autopilot banner: the closed loop (610 × 233) ----------
   Left, a 377 × 233 golden rectangle: one loop of six stations (discover → fill → check → publish →
   share → watch) on a ring of radius 89 around the Jiju cat, with a dot running round it. Right, the
   233 × 233 square: a search box over Fibonacci bars (13 → 89) that grow — the loop being found on
   search. A trail of dots crosses the seam at 377 from the "publish" station to the bars. */

const LOOP_CX = 189;
const LOOP_CY = 116;
const LOOP_R = 89;
const loopAt = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [LOOP_CX + LOOP_R * Math.cos(rad), LOOP_CY + LOOP_R * Math.sin(rad)];
};

export const JijuLoopArt: CssArtComponent = ({ label }) => {
  const [fx, fy] = loopAt(0);
  return (
    <svg className="jjart jjart-loop" viewBox="0 0 610 233" {...a11y(label)}>
      <defs>
        <clipPath id="jjart-loop-frame"><rect width="610" height="233" rx="21" /></clipPath>
      </defs>
      <g clipPath="url(#jjart-loop-frame)">
        {/* the loop: golden rectangle 377 × 233 */}
        <rect width="377" height="233" className="f-ground" />
        <circle cx={LOOP_CX} cy={LOOP_CY} r="55" className="f-amber-tint jjart-loop-core" />
        {Array.from({ length: 34 }, (_, index) => {
          const [cx, cy] = loopAt((index * 360) / 34);
          return <circle key={index} cx={cx} cy={cy} r="2" className="f-amber jjart-loop-track" />;
        })}

        {/* six stations, clockwise from the right */}
        <g transform={`translate(${fx} ${fy})`}>{/* publish: a shopfront */}
          <circle r="21" className="f-coral" />
          <rect x="-10" y="-5" width="21" height="13" rx="2" className="f-paper" />
          <rect x="-12" y="-9" width="25" height="5" rx="2.5" className="f-coral-deep" />
          <rect x="-3" y="0" width="7" height="8" rx="1.5" className="f-coral-tint" />
        </g>
        <g transform={`translate(${loopAt(60).join(' ')})`}>{/* share: a speech bubble */}
          <circle r="21" className="f-rose" />
          <rect x="-11" y="-8" width="21" height="13" rx="5" className="f-paper" />
          <polygon points="-6,4 -2,4 -8,10" className="f-paper" />
          <circle cx="-4" cy="-1.5" r="1.6" className="f-rose-deep" />
          <circle cx="0" cy="-1.5" r="1.6" className="f-rose-deep" />
          <circle cx="4" cy="-1.5" r="1.6" className="f-rose-deep" />
        </g>
        <g transform={`translate(${loopAt(120).join(' ')})`}>{/* watch: an eye */}
          <circle r="21" className="f-sky" />
          <rect x="-13" y="-6" width="26" height="13" rx="6.5" className="f-paper" />
          <circle cx="0" cy="0.5" r="5" className="f-sky-deep" />
          <circle cx="1.5" cy="-1" r="1.5" className="f-paper" />
        </g>
        <g transform={`translate(${loopAt(180).join(' ')})`}>{/* discover: a news card */}
          <circle r="21" className="f-amber" />
          <rect x="-10" y="-8" width="21" height="16" rx="3" className="f-paper" />
          <rect x="-7" y="-5" width="8" height="3" rx="1.5" className="f-amber-deep" />
          <rect x="-7" y="0" width="14" height="2" rx="1" className="f-line" />
          <rect x="-7" y="4" width="11" height="2" rx="1" className="f-line" />
        </g>
        <g transform={`translate(${loopAt(240).join(' ')})`}>{/* fill: a robot head */}
          <circle r="21" className="f-iris" />
          <rect x="-1" y="-14" width="2" height="5" rx="1" className="f-iris-deep" />
          <circle cx="0" cy="-14" r="2.5" className="f-amber" />
          <rect x="-10.5" y="-8" width="21" height="16" rx="5" className="f-paper" />
          <circle cx="-4" cy="0" r="2" className="f-iris-deep" />
          <circle cx="4" cy="0" r="2" className="f-iris-deep" />
        </g>
        <g transform={`translate(${loopAt(300).join(' ')})`}>{/* check: a tick */}
          <circle r="21" className="f-leaf" />
          <path d="M-6.5 0 L-2 4.5 L7 -5" className="jjart-tick jjart-tick-big" />
        </g>

        {/* the runner: a dot that goes round the loop */}
        <g transform={`translate(${LOOP_CX} ${LOOP_CY})`}>
          <g className="jjart-loop-orbit">
            <circle cx={LOOP_R} cy="0" r="5" className="f-amber-deep" />
          </g>
        </g>

        {/* the Jiju cat sits in the middle of the loop */}
        <Cat x={172} y={132} />

        {/* trail across the seam: from "publish" to the search bars */}
        {[0, 1, 2, 3, 4].map((index) => (
          <circle key={index} cx={fx + 34 + index * 13} cy={fy} r="2" className={`f-sky-deep jjart-trail jjart-trail-${index}`} />
        ))}

        {/* found on search: a 233 × 233 square */}
        <rect x="377" width="233" height="233" className="f-day" />
        <rect x="403" y="34" width="181" height="34" rx="17" className="f-paper" />
        <Lens x={424} y={51} r={8} />
        <rect x="443" y="48" width="89" height="5" rx="2.5" className="f-line" />
        <rect x="535" y="45" width="2" height="12" rx="1" className="f-iris-deep jjart-caret" />
        <rect x="377" y="199" width="233" height="34" className="f-ground" />
        {[13, 21, 34, 55, 89].map((height, index) => (
          <rect
            key={height}
            x={413 + index * 34}
            y={199 - height}
            width="21"
            height={height}
            rx="5"
            className={`${index === 4 ? 'f-amber' : index > 1 ? 'f-iris' : 'f-sky'} jjart-grow jjart-grow-${index}`}
          />
        ))}
        <g transform="translate(559 89)">
          <g className="jjart-loop-spark"><circle r="5" className="f-amber" /><circle r="2" className="f-paper" /></g>
        </g>
      </g>
    </svg>
  );
};
