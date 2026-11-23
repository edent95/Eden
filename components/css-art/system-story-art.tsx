import React from 'react';
import type { CssArtComponent } from './index';

/* ---- "How it works" illustrations for /dr-racing, /etreporthub and /life-os
   (styles/css-art/system-story.css, `.ssart`) — same rules as the Jiju set (jiju-story-art.tsx):
   · Fibonacci golden-rectangle canvases: banner 610 × 233 (377 golden rectangle + 233 square, seam
     at 610/φ, the stamp on the golden point (377, 144)); spots 89 × 55;
   · sizes and radii are Fibonacci numbers; circles, rounded rectangles, straight polygons and
     circular arcs only — no Bézier curves;
   · no outlines: flat fills, layered by the three φ tones of one hue (main `fK`, tint `fKt`, deep `fKd`);
   · colour: each product's brand colour turned by the golden angle (137.5°) in OKLCH, six hues
     k = 0…5, set per product by `.ssart-drracing` / `.ssart-etreport` / `.ssart-lifeos`.
   No words inside the art. Empty label = decorative (aria-hidden). Loops stop under reduced motion. */

const a11y = (label: string) => (label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const });
type P = { x: number; y: number };

/* ---------- primitives ---------- */

const Tick: React.FC<P & { r?: number; k?: number; className?: string }> = ({ x, y, r = 5, k = 1, className = '' }) => (
  <g transform={`translate(${x} ${y})`}>
    <g className={className}>
      <circle r={r} className={`f${k}`} />
      <path d={`M${-r * 0.44} 0 L${-r * 0.12} ${r * 0.36} L${r * 0.48} ${-r * 0.32}`} className="ssart-tick" style={{ strokeWidth: Math.max(1.4, r * 0.34) }} />
    </g>
  </g>
);

const Cross: React.FC<P & { r?: number; k?: number }> = ({ x, y, r = 5, k = 5 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} className={`f${k}`} />
    <g transform="rotate(45)"><rect x={-r * 0.55} y={-r * 0.14} width={r * 1.1} height={r * 0.28} rx={r * 0.14} className="fp" /></g>
    <g transform="rotate(-45)"><rect x={-r * 0.55} y={-r * 0.14} width={r * 1.1} height={r * 0.28} rx={r * 0.14} className="fp" /></g>
  </g>
);

/** Little helper robot, 21 × 35. */
const Robot: React.FC<P & { k?: number }> = ({ x, y, k = 4 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="9.5" y="-6" width="2" height="6" rx="1" className={`f${k}d`} />
    <circle cx="10.5" cy="-7" r="3" className="f0" />
    <rect width="21" height="13" rx="5" className={`f${k}t`} />
    <circle cx="7" cy="6.5" r="2" className={`f${k}d`} />
    <circle cx="14" cy="6.5" r="2" className={`f${k}d`} />
    <rect x="3" y="15" width="15" height="13" rx="3" className={`f${k}`} />
    <rect x="5" y="30" width="3" height="5" rx="1.5" className={`f${k}d`} />
    <rect x="13" y="30" width="3" height="5" rx="1.5" className={`f${k}d`} />
  </g>
);

/** Person, 21 wide × 55 tall; origin top-left of the head box. */
const Person: React.FC<P & { k?: number }> = ({ x, y, k = 1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle cx="10.5" cy="8" r="8" className="fskin" />
    <rect x="2.5" y="-2" width="16" height="6" rx="3" className={`f${k}d`} />
    <rect x="0" y="18" width="21" height="34" rx="8" className={`f${k}`} />
    <rect x="2" y="50" width="6" height="18" rx="3" className={`f${k}d`} />
    <rect x="13" y="50" width="6" height="18" rx="3" className={`f${k}d`} />
  </g>
);

/** Document / sheet, w × h, lines in tint of k. */
const Sheet: React.FC<P & { w?: number; h?: number; k?: number; lines?: number; grid?: boolean }> = ({ x, y, w = 21, h = 34, k = 0, lines = 3, grid = false }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="3" className="fp" />
    <rect x="3" y="4" width={w * 0.5} height="3" rx="1.5" className={`f${k}`} />
    {grid
      ? Array.from({ length: 3 }, (_, row) => Array.from({ length: 3 }, (_, col) => (
          <rect key={`${row}-${col}`} x={3 + col * ((w - 6) / 3)} y={10 + row * 6} width={(w - 6) / 3 - 1.5} height="4" rx="1" className={row === 0 ? `f${k}t` : 'fl'} />
        )))
      : Array.from({ length: lines }, (_, index) => (
          <rect key={index} x="3" y={10 + index * 6} width={w - 6 - (index % 2) * 5} height="2.5" rx="1.25" className="fl" />
        ))}
  </g>
);

/** Magnifier: two filled circles + bar (no outline). */
const Lens: React.FC<P & { r?: number; k?: number; className?: string }> = ({ x, y, r = 8, k = 4, className = '' }) => (
  <g transform={`translate(${x} ${y})`}>
    <g className={className}>
      <g transform="rotate(-45)"><rect x={-r * 0.3} y={r * 0.7} width={r * 0.6} height={r * 1.2} rx={r * 0.3} className={`f${k}d`} /></g>
      <circle r={r} className={`f${k}d`} />
      <circle r={r * 0.68} className={`f${k}t`} />
    </g>
  </g>
);

/** Laptop, 89 wide. */
const Laptop: React.FC<P & { k?: number; children?: React.ReactNode }> = ({ x, y, k = 4, children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="89" height="58" rx="5" className="fnd" />
    <rect x="5" y="5" width="79" height="48" rx="3" className="fs" />
    {children}
    <polygon points={`-11,58 100,58 108,65 -19,65`} className={`f${k}`} />
  </g>
);

/** Bank: pediment + 3 columns, 34 wide. */
const Bank: React.FC<P & { k?: number }> = ({ x, y, k = 2 }) => (
  <g transform={`translate(${x} ${y})`}>
    <polygon points="17,0 34,10 0,10" className={`f${k}d`} />
    <rect x="2" y="10" width="30" height="3" className={`f${k}`} />
    {[5, 15, 25].map((cx) => <rect key={cx} x={cx} y="14" width="4" height="15" rx="1" className={`f${k}t`} />)}
    <rect x="0" y="29" width="34" height="5" rx="1" className={`f${k}`} />
  </g>
);

/** Motorbike, 55 wide, origin = ground line left. */
const Bike: React.FC<P & { k?: number }> = ({ x, y, k = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle cx="11" cy="-11" r="11" className="fnd" />
    <circle cx="11" cy="-11" r="5" className="fp" />
    <circle cx="44" cy="-11" r="11" className="fnd" />
    <circle cx="44" cy="-11" r="5" className="fp" />
    <polygon points="11,-13 21,-29 40,-29 47,-13" className={`f${k}`} />
    <rect x="18" y="-34" width="18" height="6" rx="3" className={`f${k}d`} />
    <rect x="43" y="-39" width="3" height="13" rx="1.5" className="fnd" />
    <rect x="41" y="-41" width="10" height="3" rx="1.5" className="fnd" />
  </g>
);

/** Database / storage drum, 34 wide. */
const Drum: React.FC<P & { k?: number }> = ({ x, y, k = 4 }) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2].map((index) => (
      <g key={index}>
        <rect x="0" y={index * 11} width="34" height="13" rx="6.5" className={index === 0 ? `f${k}` : `f${k}d`} />
        <rect x="5" y={index * 11 + 5} width="13" height="3" rx="1.5" className={`f${k}t`} />
      </g>
    ))}
  </g>
);

/** Padlock, 21 wide. */
const Lock: React.FC<P & { k?: number }> = ({ x, y, k = 3 }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M4 13 V8 A6.5 6.5 0 0 1 17 8 V13 H13.5 V8 A3 3 0 0 0 7.5 8 V13 Z" className={`f${k}d`} />
    <rect x="0" y="12" width="21" height="17" rx="4" className={`f${k}`} />
    <circle cx="10.5" cy="19" r="2.5" className={`f${k}d`} />
    <rect x="9.5" y="20" width="2" height="5" rx="1" className={`f${k}d`} />
  </g>
);

/** Bar chart on a card, w = 55. */
const Bars: React.FC<P & { values: number[]; k?: number; hi?: number }> = ({ x, y, values, k = 0, hi = -1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="55" height="34" rx="4" className="fp" />
    {values.map((value, index) => (
      <rect key={index} x={6 + index * 9} y={29 - value} width="6" height={value} rx="2" className={index === hi ? `f${k}` : `f${k}t`} />
    ))}
  </g>
);

const MoonSun: React.FC<P & { moon?: boolean }> = ({ x, y, moon = false }) => (
  moon ? (
    <g transform={`translate(${x} ${y})`}>
      <circle r="21" className="fmoon" />
      <circle cx="13" cy="-8" r="18" className="fn" />
    </g>
  ) : (
    <g transform={`translate(${x} ${y})`}>
      <g className="ssart-spin">
        {Array.from({ length: 8 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 45})`}><rect x="-1.5" y="-21" width="3" height="5" rx="1.5" className="fsun" /></g>
        ))}
      </g>
      <circle r="13" className="fsun" />
    </g>
  )
);

const Stars: React.FC = () => (
  <>
    {[[110, 34], [178, 21], [233, 55], [300, 30], [34, 110], [340, 89], [150, 89]].map(([cx, cy], index) => (
      <circle key={index} cx={cx} cy={cy} r={index % 2 ? 1.5 : 2.5} className={`fmoon ssart-star ssart-star-${index % 3}`} />
    ))}
  </>
);

/** Stamp on the seam, at the golden point. */
const SeamStamp: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <g transform="translate(377 144)">
    <g className="ssart-stamp">
      <circle r="21" className="f1t" />
      <circle r="13" className="f1" />
      {children ?? <path d="M-5.5 0 L-1.5 4 L6 -4.5" className="ssart-tick" style={{ strokeWidth: 3 }} />}
    </g>
  </g>
);

const Frame: React.FC<{ label: string; kind: string; children: React.ReactNode }> = ({ label, kind, children }) => (
  <svg className={`ssart ssart-${kind} ssart-banner`} viewBox="0 0 610 233" {...a11y(label)}>
    <defs><clipPath id={`ssart-frame-${kind}`}><rect width="610" height="233" rx="21" /></clipPath></defs>
    <g clipPath={`url(#ssart-frame-${kind})`}>{children}</g>
  </svg>
);

const Spot: React.FC<{ label: string; kind: string; k: number; children: React.ReactNode }> = ({ label, kind, k, children }) => (
  <svg className={`ssart ssart-${kind} ssart-spot`} viewBox="0 0 89 55" {...a11y(label)}>
    <rect width="89" height="55" rx="8" className={`f${k}t ssart-bg`} />
    {children}
  </svg>
);

/* ================= DrRacing ================= */

export const DrRacingStoryBanner: CssArtComponent = ({ label }) => (
  <Frame label={label} kind="drracing">
    {/* back office: golden rectangle */}
    <rect width="377" height="233" className="f4t ssart-bg" />
    <circle cx="144" cy="144" r="144" className="f4t ssart-glowdisc" />
    <rect x="0" y="178" width="377" height="55" className="fground ssart-bg" />
    <Person x={34} y={110} k={4} />
    <Laptop x={68} y={115} k={4}>
      <rect x="11" y="11" width="34" height="5" rx="2.5" className="f0" />
      <rect x="11" y="22" width="55" height="5" rx="2.5" className="f4t" />
      <rect x="11" y="33" width="42" height="5" rx="2.5" className="f4t" />
    </Laptop>
    <g className="ssart-fly"><Sheet x={160} y={120} w={21} h={26} k={0} /></g>
    <Bank x={215} y={55} k={2} />
    <Bank x={262} y={89} k={2} />
    <Bank x={309} y={55} k={2} />
    <Cross x={249} y={55} r={6} k={0} />
    <Cross x={296} y={89} r={6} k={0} />
    <Tick x={343} y={55} r={6} className="ssart-pop" />
    {/* showroom: square */}
    <rect x="377" width="233" height="233" className="fday ssart-bg" />
    <rect x="377" y="178" width="233" height="55" className="fground ssart-bg" />
    <MoonSun x={576} y={34} />
    <rect x="455" y="55" width="144" height="123" rx="5" className="f0t" />
    <rect x="455" y="55" width="144" height="13" rx="5" className="f0" />
    <g className="ssart-bob"><Bike x={500} y={178} k={0} /></g>
    <Person x={431} y={110} k={1} />
    <g transform="translate(470 140)"><g className="ssart-key"><circle r="5" className="f3" /><rect x="3" y="-1.5" width="10" height="3" rx="1.5" className="f3" /></g></g>
    <SeamStamp />
  </Frame>
);

export const DrRacingBeliefQuiet: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="drracing" k={0}>
    <rect x="8" y="8" width="47" height="39" rx="5" className="fp" />
    {[0, 1, 2].map((index) => (
      <rect key={index} x="13" y={13 + index * 11} width="37" height="8" rx="3" className={index === 0 ? 'f0 ssart-glow' : 'fl'} />
    ))}
    <circle cx="71" cy="27" r="13" className="f0d" />
    <circle cx="71" cy="27" r="10" className="fp" />
    <g transform="translate(71 27)"><g className="ssart-spin-slow"><rect x="-1" y="-8" width="2" height="8" rx="1" className="f0d" /></g></g>
    <rect x="70" y="26" width="7" height="2" rx="1" className="f0d" />
  </Spot>
);

export const DrRacingBeliefUseful: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="drracing" k={1}>
    <Bars x={8} y={11} values={[8, 13, 21, 13]} k={1} hi={2} />
    <Lens x={66} y={24} r={8} k={1} className="ssart-scan" />
  </Spot>
);

export const DrRacingBeliefRecord: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="drracing" k={2}>
    <rect x="29" y="3" width="31" height="49" rx="6" className="fnd" />
    <rect x="32" y="8" width="25" height="39" rx="3" className="fp" />
    {[0, 1, 2].map((index) => (
      <rect key={index} x={35} y={12 + index * 9} width={index === 1 ? 19 : 13} height="6" rx="3" className={index === 1 ? 'f2 ssart-glow' : 'f2t'} />
    ))}
    <circle cx="64" cy="35" r="5" className="f0 ssart-pop" />
  </Spot>
);

export const DrRacingBeliefAsk: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="drracing" k={3}>
    <Lock x={13} y={13} k={3} />
    <Person x={55} y={8} k={4} />
    <g transform="translate(78 16)"><g className="ssart-wave"><rect x="0" y="0" width="5" height="13" rx="2.5" className="fskin" /></g></g>
  </Spot>
);

export const DrRacingBeliefVerified: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="drracing" k={4}>
    <rect x="13" y="5" width="39" height="45" rx="4" className="fp" />
    {[0, 1, 2].map((index) => (
      <g key={index}>
        <Tick x={21} y={15 + index * 12} r={4} k={1} />
        <rect x="29" y={13.5 + index * 12} width="16" height="3" rx="1.5" className="fl" />
      </g>
    ))}
    <Lens x={66} y={33} r={8} k={4} className="ssart-scan" />
  </Spot>
);

/* ================= ETReportHub ================= */

export const ETReportStoryBanner: CssArtComponent = ({ label }) => (
  <Frame label={label} kind="etreport">
    <rect width="377" height="233" className="f0t ssart-bg" />
    <circle cx="144" cy="144" r="144" className="f0t ssart-glowdisc" />
    <rect x="0" y="178" width="377" height="55" className="fground ssart-bg" />
    <Person x={21} y={110} k={0} />
    <g className="ssart-fly"><Sheet x={55} y={89} w={34} h={42} k={2} grid /></g>
    <g className="ssart-fly ssart-fly-2"><Sheet x={89} y={110} w={34} h={42} k={1} grid /></g>
    {/* funnel: straight polygon */}
    <polygon points="144,89 233,89 204,134 173,134" className="f0" />
    <rect x="173" y="134" width="31" height="13" className="f0d" />
    <Tick x={189} y={110} r={8} k={2} className="ssart-pop" />
    <Drum x={262} y={123} k={5} />
    <rect x="204" y="139" width="55" height="3" rx="1.5" className="f0d" />
    <rect x="296" y="140" width="55" height="3" rx="1.5" className="f0d" />
    {/* square: the report */}
    <rect x="377" width="233" height="233" className="fday ssart-bg" />
    <rect x="377" y="178" width="233" height="55" className="fground ssart-bg" />
    <MoonSun x={576} y={34} />
    <rect x="418" y="55" width="144" height="110" rx="8" className="fnd" />
    <rect x="426" y="63" width="128" height="94" rx="5" className="fs" />
    <rect x="434" y="71" width="55" height="13" rx="3" className="f2" />
    {[13, 21, 34, 21, 55].map((value, index) => (
      <rect key={index} x={436 + index * 21} y={149 - value} width="13" height={value} rx="3" className={index === 4 ? 'f2 ssart-grow' : 'f0t ssart-grow'} style={{ animationDelay: `${index * 0.12}s` }} />
    ))}
    <rect x="480" y="165" width="21" height="13" className="fnd" />
    <rect x="463" y="175" width="55" height="5" rx="2.5" className="fnd" />
    <SeamStamp />
  </Frame>
);

export const ETReportBeliefAnswer: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="etreport" k={0}>
    <rect x="8" y="8" width="47" height="39" rx="5" className="fp" />
    <rect x="13" y="13" width="21" height="13" rx="3" className="f0" />
    <rect x="13" y="31" width="34" height="3" rx="1.5" className="fl" />
    <rect x="13" y="38" width="21" height="3" rx="1.5" className="fl" />
    <g className="ssart-pop-up"><polygon points="71,13 81,26 74,26 74,42 68,42 68,26 61,26" className="f2" /></g>
  </Spot>
);

export const ETReportBeliefCompute: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="etreport" k={1}>
    <rect x="13" y="13" width="13" height="34" rx="3" className="f5" />
    <rect x="34" y="26" width="13" height="21" rx="3" className="f1" />
    <rect x="52" y="27" width="8" height="3" rx="1.5" className="f1d" />
    <rect x="52" y="33" width="8" height="3" rx="1.5" className="f1d" />
    <rect x="64" y="34" width="13" height="13" rx="3" className="f2 ssart-grow" />
  </Spot>
);

export const ETReportBeliefLatest: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="etreport" k={2}>
    <g opacity="0.38"><Sheet x={13} y={13} w={34} h={34} k={2} grid /></g>
    <g opacity="0.62"><Sheet x={21} y={9} w={34} h={34} k={2} grid /></g>
    <Sheet x={29} y={5} w={34} h={34} k={2} grid />
    <Tick x={66} y={10} r={6} k={2} className="ssart-pop" />
  </Spot>
);

export const ETReportBeliefStop: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="etreport" k={3}>
    <g className="ssart-bump"><Sheet x={8} y={11} w={26} h={34} k={3} /></g>
    <rect x="42" y="8" width="5" height="39" rx="2.5" className="f3d" />
    <rect x="47" y="13" width="34" height="8" rx="2" className="f3" />
    <rect x="55" y="13" width="8" height="8" className="fp" />
    <rect x="71" y="13" width="8" height="8" className="fp" />
    <Cross x={63} y={36} r={8} k={3} />
  </Spot>
);

export const ETReportBeliefLocal: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="etreport" k={4}>
    <polygon points="44,5 76,26 12,26" className="f4d" />
    <rect x="18" y="26" width="52" height="26" className="fp" />
    <Drum x={27} y={28} k={4} />
    <Lock x={62} y={23} k={1} />
  </Spot>
);

/* ================= LifeOs ================= */

export const LifeOsStoryBanner: CssArtComponent = ({ label }) => (
  <Frame label={label} kind="lifeos">
    <rect width="377" height="233" className="fn" />
    <circle cx="233" cy="178" r="144" className="fng" />
    <MoonSun x={55} y={55} moon />
    <Stars />
    <rect x="0" y="178" width="377" height="55" className="fnd" />
    {/* the home machine: a small box with a heartbeat */}
    <rect x="178" y="110" width="89" height="68" rx="8" className="f4d" />
    <rect x="186" y="118" width="73" height="34" rx="4" className="fs" />
    <path d="M190 135 H205 L210 125 L216 145 L222 130 L226 135 H255" className="ssart-beat" />
    <circle cx="196" cy="165" r="3" className="f1 ssart-glow" />
    <rect x="207" y="163" width="34" height="4" rx="2" className="f4" />
    <g className="ssart-fly"><Sheet x={110} y={118} w={26} h={34} k={0} /></g>
    <Lock x={296} y={130} k={3} />
    {/* day: the monthly letter */}
    <rect x="377" width="233" height="233" className="fday ssart-bg" />
    <rect x="377" y="178" width="233" height="55" className="fground ssart-bg" />
    <MoonSun x={576} y={34} />
    <Person x={440} y={110} k={2} />
    <g className="ssart-bob">
      <rect x="476" y="110" width="55" height="34" rx="4" className="fp" />
      <polygon points="476,110 503,131 531,110" className="f0t" />
      <circle cx="503" cy="131" r="5" className="f0" />
    </g>
    <SeamStamp>
      <g transform="translate(-6 -8) scale(0.58)"><Lock x={0} y={0} k={1} /></g>
    </SeamStamp>
  </Frame>
);

export const LifeOsBeliefNatal: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="lifeos" k={0}>
    <rect x="8" y="8" width="34" height="42" rx="3" className="f0d" />
    <rect x="11" y="8" width="31" height="42" rx="3" className="f0" />
    <circle cx="26" cy="27" r="8" className="f0t" />
    <Lock x={30} y={30} k={0} />
    <g className="ssart-bump"><rect x="55" y="16" width="26" height="21" rx="4" className="fp" /><rect x="60" y="22" width="16" height="3" rx="1.5" className="f2" /><rect x="60" y="28" width="10" height="3" rx="1.5" className="fl" /></g>
  </Spot>
);

export const LifeOsBeliefIndependent: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="lifeos" k={1}>
    <circle cx="21" cy="27" r="13" className="f1" />
    <circle cx="29" cy="27" r="13" className="f1d" opacity="0.62" />
    <rect x="43" y="25" width="5" height="3" rx="1.5" className="f1d" />
    <circle cx="61" cy="20" r="8" className="f2" />
    <circle cx="74" cy="34" r="8" className="f4" />
    <Tick x={74} y={13} r={5} k={1} className="ssart-pop" />
  </Spot>
);

export const LifeOsBeliefBarnum: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="lifeos" k={2}>
    <rect x="8" y="11" width="31" height="34" rx="4" className="fp" />
    <rect x="13" y="17" width="21" height="3" rx="1.5" className="f2" />
    <rect x="13" y="24" width="16" height="3" rx="1.5" className="fl" />
    <path d="M44 21 A8 8 0 0 1 60 21" className="ssart-arc" />
    <polygon points="57,17 63,21 57,25" className="f2d" />
    <g className="ssart-flip"><rect x="63" y="11" width="21" height="34" rx="4" className="f2" /><rect x="68" y="18" width="11" height="3" rx="1.5" className="fp" /></g>
  </Spot>
);

export const LifeOsBeliefLocal: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="lifeos" k={3}>
    <g className="ssart-fly-short"><Sheet x={8} y={13} w={21} h={29} k={3} /></g>
    <polygon points="55,5 81,21 29,21" className="f3d" />
    <rect x="34" y="21" width="42" height="29" className="fp" />
    <rect x="42" y="29" width="26" height="13" rx="3" className="f3" />
    <circle cx="48" cy="35" r="2" className="fp ssart-glow" />
  </Spot>
);

export const LifeOsBeliefPropose: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="lifeos" k={4}>
    <Robot x={8} y={13} k={1} />
    <rect x="31" y="21" width="21" height="13" rx="3" className="fp" />
    <rect x="34" y="25" width="10" height="2" rx="1" className="f4" />
    <g className="ssart-press"><rect x="62" y="5" width="8" height="13" rx="3" className="f0d" /><rect x="57" y="17" width="18" height="5" rx="2" className="f0d" /></g>
    <Tick x={66} y={39} r={8} k={1} className="ssart-pop" />
  </Spot>
);
