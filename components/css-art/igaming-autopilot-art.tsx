import React from 'react';
import type { CssArtComponent } from './index';

/* ---- /igaming-ai banner (styles/css-art/jiju-story.css, `.jjart` palette) ----
   Same golden-ratio rules as the Jiju story art: 610 × 233 banner = a 377 × 233 golden rectangle
   plus a 233 × 233 square, seam at 610/φ; Fibonacci sizes; circles, rounded rectangles and straight
   polygons only; flat fills, no outlines; Jiju's golden-angle palette.
   Left: the provider hub (a chip) in the middle of a ring of eight operator screens, with packets
   running out along the spokes and screens ticking as they go live. Right: one checklist card that
   ticks row by row — the last row waits for a person — and a "live" pill. No words inside the art. */

const a11y = (label: string) => (label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const });

const CX = 189;
const CY = 116;
const R = 89;
const HUES = ['amber', 'sky', 'leaf', 'rose', 'iris', 'coral', 'sky', 'leaf'];

export const IGamingAutopilotArt: CssArtComponent = ({ label }) => (
  <svg className="jjart jjart-igloop" viewBox="0 0 610 233" {...a11y(label)}>
    <defs>
      <clipPath id="jjart-igloop-frame"><rect width="610" height="233" rx="21" /></clipPath>
    </defs>
    <g clipPath="url(#jjart-igloop-frame)">
      {/* the loop: golden rectangle 377 × 233 */}
      <rect width="377" height="233" className="f-iris-tint" />
      <circle cx={CX} cy={CY} r="55" className="f-paper jjart-igloop-core" />
      {Array.from({ length: 34 }, (_, index) => {
        const rad = (index * 2 * Math.PI) / 34;
        return <circle key={index} cx={CX + R * Math.cos(rad)} cy={CY + R * Math.sin(rad)} r="2" className="f-iris jjart-loop-track" />;
      })}

      {/* packets run out along the spokes (outer g places, inner g moves) */}
      {HUES.map((hue, index) => (
        <g key={`p${index}`} transform={`translate(${CX} ${CY}) rotate(${index * 45})`}>
          <g className={`jjart-igloop-packet jjart-igloop-packet-${index}`}>
            <circle cx="0" cy="0" r="3" className={`f-${hue}-deep`} />
          </g>
        </g>
      ))}

      {/* eight operator screens on the ring */}
      {HUES.map((hue, index) => {
        const rad = (index * Math.PI) / 4;
        const x = CX + R * Math.cos(rad);
        const y = CY + R * Math.sin(rad);
        return (
          <g key={`s${index}`} transform={`translate(${x - 17} ${y - 13})`}>
            <rect width="34" height="26" rx="5" className={`f-${hue}`} />
            <rect x="3" y="7" width="28" height="16" rx="3" className="f-paper" />
            <rect x="6" y="11" width="13" height="3" rx="1.5" className={`f-${hue}-tint`} />
            <rect x="6" y="17" width="21" height="3" rx="1.5" className="f-line" />
            <g transform="translate(31 0)">
              <g className={`jjart-igloop-tick jjart-igloop-tick-${index}`}>
                <circle r="6" className="f-leaf" />
                <path d="M-2.6 0 L-0.7 2.1 L2.8 -1.9" className="jjart-tick" />
              </g>
            </g>
          </g>
        );
      })}

      {/* the provider hub: a chip */}
      <g transform={`translate(${CX} ${CY})`}>
        <g className="jjart-igloop-chip">
          <circle r="34" className="f-coral" />
          {Array.from({ length: 8 }, (_, index) => (
            <g key={index} transform={`rotate(${index * 45})`}><rect x="-3" y="-34" width="6" height="8" rx="2" className="f-paper" /></g>
          ))}
          <circle r="21" className="f-coral-tint" />
          <circle r="13" className="f-coral" />
          <circle r="5" className="f-paper" />
        </g>
      </g>

      {/* trail across the seam */}
      {[0, 1, 2, 3, 4].map((index) => (
        <circle key={`t${index}`} cx={CX + R + 25 + index * 13} cy={CY} r="2" className={`f-iris-deep jjart-trail jjart-trail-${index}`} />
      ))}

      {/* one checklist: a 233 × 233 square */}
      <rect x="377" width="233" height="233" className="f-day" />
      <rect x="403" y="21" width="181" height="157" rx="13" className="f-paper" />
      <rect x="403" y="21" width="181" height="21" rx="10.5" className="f-coral" />
      <rect x="403" y="31" width="181" height="11" className="f-coral" />
      {[0, 1, 2, 3, 4].map((index) => {
        const y = 60 + index * 26;
        const waits = index === 4;
        return (
          <g key={`r${index}`}>
            <g transform={`translate(423 ${y})`}>
              <g className={`jjart-igloop-row jjart-igloop-row-${index}`}>
                <circle r="8" className={waits ? 'f-amber' : 'f-leaf'} />
                {waits
                  ? <circle r="3" className="f-paper" />
                  : <path d="M-3.4 0 L-1 2.6 L3.6 -2.4" className="jjart-tick" />}
              </g>
            </g>
            <rect x="439" y={y - 3} width={[89, 55, 110, 76, 63][index]} height="5" rx="2.5" className="f-line" />
            <rect x="557" y={y - 3} width="13" height="5" rx="2.5" className={waits ? 'f-amber-tint' : 'f-leaf-tint'} />
          </g>
        );
      })}
      <rect x="377" y="199" width="233" height="34" className="f-ground" />
      <g transform="translate(493 199)">
        <g className="jjart-igloop-live">
          <rect x="-34" y="-11" width="68" height="21" rx="10.5" className="f-leaf" />
          <circle cx="-21" cy="-0.5" r="4" className="f-paper" />
          <rect x="-13" y="-3" width="34" height="5" rx="2.5" className="f-paper" />
        </g>
      </g>
    </g>
  </svg>
);

/** Square page icon (89 × 89): the provider chip inside a ring of eight operator dots. */
export const IGamingAutopilotIcon: CssArtComponent = ({ label }) => (
  <svg className="jjart jjart-igicon" viewBox="0 0 89 89" {...a11y(label)}>
    <rect width="89" height="89" rx="21" className="f-iris-tint" />
    {HUES.map((hue, index) => {
      const rad = (index * Math.PI) / 4;
      return <circle key={index} cx={44.5 + 34 * Math.cos(rad)} cy={44.5 + 34 * Math.sin(rad)} r="5" className={`f-${hue}`} />;
    })}
    <g transform="translate(44.5 44.5)">
      <circle r="21" className="f-coral" />
      {Array.from({ length: 8 }, (_, index) => (
        <g key={index} transform={`rotate(${index * 45})`}><rect x="-2" y="-21" width="4" height="5" rx="1.5" className="f-paper" /></g>
      ))}
      <circle r="13" className="f-coral-tint" />
      <circle r="8" className="f-coral" />
      <circle r="3" className="f-paper" />
    </g>
  </svg>
);
