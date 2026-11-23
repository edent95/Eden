import React from 'react';
import type { CssArtComponent } from './index';

/** Decorative when used next to text that already says the same thing (empty label). */
const a11y = (label: string) => (label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const });

/* ---- /jiju-pet "How Jiju runs itself" illustrations (styles/css-art/jiju-story.css, `.jjart`) ----
   Flat, friendly spot art for non-technical readers, in the product page's palette:
   one accent (mint in light mode, orange in dark), ink, paper and a night blue.
   · JijuNightDayArt  — banner: at night little AI helpers carry shop cards into a laptop while a
                        checker robot inspects them; a morning stamp in the middle; by day a person
                        and the Jiju black cat walk to a shop while a phone shows a verified card.
   · JijuBelief*Art   — one small scene per rule on the page (decide / source / blank / check / save).
   · JijuStorefrontArt — the storefront used as the "photo" in the phone mock-up.
   No words inside the art (the page around it is bilingual); every motion loop stops under
   prefers-reduced-motion. */

const Robot: React.FC<{ x: number; y: number; className?: string; scale?: number }> = ({ x, y, className = '', scale = 1 }) => (
  <g className={`jjart-robot ${className}`} transform={`translate(${x} ${y}) scale(${scale})`}>
    <line x1="10" y1="-6" x2="10" y2="0" className="jjart-stroke" />
    <circle cx="10" cy="-8" r="2.4" className="jjart-accent" />
    <rect x="0" y="0" width="20" height="15" rx="5" className="jjart-robot-head" />
    <circle cx="6.5" cy="7.5" r="1.9" className="jjart-eye" />
    <circle cx="13.5" cy="7.5" r="1.9" className="jjart-eye" />
    <rect x="2" y="17" width="16" height="13" rx="4" className="jjart-robot-body" />
    <rect x="4" y="31" width="4" height="5" rx="1.5" className="jjart-robot-leg" />
    <rect x="12" y="31" width="4" height="5" rx="1.5" className="jjart-robot-leg" />
  </g>
);

const Card: React.FC<{ x: number; y: number; className?: string; check?: boolean }> = ({ x, y, className = '', check = false }) => (
  <g className={`jjart-card ${className}`} transform={`translate(${x} ${y})`}>
    <rect width="22" height="16" rx="3" className="jjart-card-bg" />
    <rect x="4" y="4" width="10" height="2.4" rx="1.2" className="jjart-card-line" />
    <rect x="4" y="9" width="14" height="2.4" rx="1.2" className="jjart-card-line" />
    {check && (
      <g transform="translate(16 -4)">
        <circle r="5" className="jjart-accent" />
        <path d="M-2.2 0 L-0.6 1.8 L2.4 -1.6" className="jjart-check" />
      </g>
    )}
  </g>
);

const Cat: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g className="jjart-cat" transform={`translate(${x} ${y})`}>
    <path d="M30 6 C40 0 42 -10 36 -14" className="jjart-cat-tail" />
    <ellipse cx="18" cy="8" rx="15" ry="8" className="jjart-cat-body" />
    <circle cx="4" cy="-2" r="7.5" className="jjart-cat-body" />
    <path d="M-2 -6 L-1 -14 L4 -8 Z M5 -8 L10 -14 L10 -5 Z" className="jjart-cat-body" />
    <circle cx="1.5" cy="-2.5" r="1.3" className="jjart-cat-eye" />
    <circle cx="6.5" cy="-2.5" r="1.3" className="jjart-cat-eye" />
    <rect x="6" y="13" width="3.5" height="6" rx="1.5" className="jjart-cat-body" />
    <rect x="25" y="13" width="3.5" height="6" rx="1.5" className="jjart-cat-body" />
  </g>
);

export const JijuNightDayArt: CssArtComponent = ({ label }) => (
  <svg className="jjart jjart-nightday" viewBox="0 0 640 260" {...a11y(label)}>
    <defs>
      <linearGradient id="jjart-night-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" className="jjart-stop-night-top" />
        <stop offset="1" className="jjart-stop-night-bottom" />
      </linearGradient>
      <linearGradient id="jjart-day-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" className="jjart-stop-day-top" />
        <stop offset="1" className="jjart-stop-day-bottom" />
      </linearGradient>
      <clipPath id="jjart-frame"><rect width="640" height="260" rx="22" /></clipPath>
    </defs>
    <g clipPath="url(#jjart-frame)">
      {/* skies */}
      <rect width="640" height="260" fill="url(#jjart-day-sky)" />
      <path d="M0 0 H330 C300 70 360 150 316 260 H0 Z" fill="url(#jjart-night-sky)" />

      {/* night: moon and stars */}
      <circle cx="62" cy="52" r="20" className="jjart-moon" />
      <circle cx="72" cy="45" r="17" className="jjart-moon-cut" />
      {[[120, 30], [180, 58], [236, 26], [270, 84], [40, 110], [150, 96]].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r={index % 2 ? 1.8 : 2.4} className={`jjart-star jjart-star-${index % 3}`} />
      ))}

      {/* night: desk, laptop and helpers */}
      <rect x="0" y="206" width="330" height="54" className="jjart-desk" />
      <g className="jjart-laptop">
        <rect x="168" y="128" width="104" height="70" rx="7" className="jjart-laptop-lid" />
        <rect x="175" y="135" width="90" height="56" rx="4" className="jjart-screen" />
        <rect x="183" y="144" width="40" height="5" rx="2.5" className="jjart-screen-line" />
        <rect x="183" y="156" width="62" height="5" rx="2.5" className="jjart-screen-line" />
        <rect x="183" y="168" width="52" height="5" rx="2.5" className="jjart-screen-line" />
        <circle cx="253" cy="171" r="7" className="jjart-accent jjart-screen-tick" />
        <path d="M249.6 171 L252 173.6 L256.6 168.6" className="jjart-check" />
        <path d="M156 198 H284 L290 206 H150 Z" className="jjart-laptop-base" />
      </g>
      <g className="jjart-helpers" transform="translate(0 -32) scale(1.15)">
        <g className="jjart-bob jjart-bob-1"><Robot x={28} y={168} /><Card x={46} y={170} className="jjart-carry" /></g>
        <g className="jjart-bob jjart-bob-2"><Robot x={84} y={168} /><Card x={102} y={170} className="jjart-carry" /></g>
        <Card x={120} y={150} className="jjart-fly" />
      </g>
      <g className="jjart-checker">
        <Robot x={286} y={168} />
        <g className="jjart-magnifier">
          <circle cx="282" cy="160" r="8" className="jjart-glass" />
          <line x1="288" y1="166" x2="294" y2="173" className="jjart-stroke jjart-stroke-thick" />
        </g>
      </g>

      {/* morning stamp on the seam */}
      <g transform="translate(322 118)">
        <g className="jjart-stamp">
          <circle r="24" className="jjart-stamp-ring" />
          <circle r="17" className="jjart-accent" />
          <path d="M-7 0 L-2 5 L8 -6" className="jjart-check jjart-check-big" />
        </g>
      </g>

      {/* day: sun, ground, shop, person and cat */}
      <g className="jjart-sun" transform="translate(586 54)">
        <g className="jjart-sun-rays">
          {Array.from({ length: 10 }, (_, index) => (
            <rect key={index} x="-2" y="-34" width="4" height="9" rx="2" transform={`rotate(${index * 36})`} className="jjart-sun-ray" />
          ))}
        </g>
        <circle r="19" className="jjart-sun-core" />
      </g>
      <rect x="316" y="214" width="324" height="46" className="jjart-ground" />
      <g className="jjart-shop">
        <rect x="486" y="118" width="120" height="96" rx="4" className="jjart-shop-wall" />
        <path d="M478 108 H614 L606 128 H486 Z" className="jjart-awning-base" />
        {Array.from({ length: 6 }, (_, index) => (
          <path key={index} d={`M${486 + index * 20} 128 a10 8 0 0 0 20 0`} className={index % 2 ? 'jjart-awning-a' : 'jjart-awning-b'} />
        ))}
        <rect x="498" y="146" width="44" height="34" rx="3" className="jjart-window" />
        <path d="M502 176 l10 -12 l8 8 l6 -6 l12 10" className="jjart-window-shine" />
        <rect x="556" y="150" width="34" height="64" rx="3" className="jjart-door" />
        <circle cx="584" cy="184" r="2" className="jjart-accent" />
        <rect x="490" y="96" width="44" height="10" rx="3" className="jjart-sign" />
      </g>
      <g className="jjart-walk">
        <g className="jjart-person">
          <circle cx="410" cy="140" r="11" className="jjart-person-head" />
          <path d="M398 160 Q410 150 422 160 L426 204 H394 Z" className="jjart-person-body" />
          <rect x="398" y="202" width="8" height="14" rx="3" className="jjart-person-body" />
          <rect x="413" y="202" width="8" height="14" rx="3" className="jjart-person-body" />
          <rect x="424" y="166" width="14" height="22" rx="3" className="jjart-phone" />
          <rect x="426.5" y="169" width="9" height="15" rx="1.5" className="jjart-phone-screen" />
        </g>
        <Cat x={444} y={198} />
      </g>
      <g className="jjart-popcard"><Card x={428} y={124} check /></g>
    </g>
  </svg>
);

/* ---------- belief spot illustrations (96 × 72) ---------- */

const Spot: React.FC<{ label: string; kind: string; children: React.ReactNode }> = ({ label, kind, children }) => (
  <svg className={`jjart jjart-spot jjart-spot-${kind}`} viewBox="0 0 96 72" {...a11y(label)}>
    <rect width="96" height="72" rx="14" className="jjart-spot-bg" />
    {children}
  </svg>
);

export const JijuBeliefDecideArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="decide">
    <Robot x={12} y={26} />
    <Card x={34} y={34} />
    <g className="jjart-press">
      <rect x="64" y="10" width="10" height="16" rx="3" className="jjart-ink-fill" />
      <rect x="58" y="25" width="22" height="7" rx="2" className="jjart-ink-fill" />
    </g>
    <g transform="translate(69 50)">
      <g className="jjart-press-mark">
        <circle r="9" className="jjart-accent" />
        <path d="M-3.6 0 L-1 2.8 L4 -2.6" className="jjart-check" />
      </g>
    </g>
  </Spot>
);

export const JijuBeliefSourceArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="source">
    <path d="M10 14 H44 a6 6 0 0 1 6 6 V36 a6 6 0 0 1 -6 6 H24 L16 50 V42 H10 a6 6 0 0 1 -6 -6 V20 a6 6 0 0 1 6 -6 Z" className="jjart-bubble" />
    <path d="M16 24 q0 -4 4 -4 M16 24 v6 h5 v-6 h-5 M27 24 q0 -4 4 -4 M27 24 v6 h5 v-6 h-5" className="jjart-quote" />
    <path d="M50 36 C58 36 58 30 62 30" className="jjart-dots" />
    <rect x="60" y="10" width="28" height="40" rx="4" className="jjart-page" />
    <rect x="65" y="16" width="16" height="3" rx="1.5" className="jjart-card-line" />
    <rect x="64" y="27" width="20" height="6" rx="2" className="jjart-accent jjart-highlight" />
    <rect x="65" y="38" width="14" height="3" rx="1.5" className="jjart-card-line" />
    <rect x="12" y="56" width="72" height="5" rx="2.5" className="jjart-shadow" />
  </Spot>
);

export const JijuBeliefBlankArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="blank">
    <rect x="14" y="12" width="52" height="46" rx="6" className="jjart-page" />
    <rect x="21" y="20" width="30" height="4" rx="2" className="jjart-card-line" />
    <rect x="21" y="29" width="38" height="4" rx="2" className="jjart-card-line" />
    <rect x="21" y="39" width="38" height="11" rx="3" className="jjart-blank-box" />
    <rect x="25" y="42" width="1.6" height="5" className="jjart-caret" />
    <g className="jjart-pencil" transform="translate(74 18) rotate(30)">
      <rect x="-3.5" y="0" width="7" height="30" rx="2" className="jjart-pencil-body" />
      <path d="M-3.5 30 L0 37 L3.5 30 Z" className="jjart-ink-fill" />
    </g>
    <path d="M66 26 L86 50 M86 26 L66 50" className="jjart-cross" />
  </Spot>
);

export const JijuBeliefCheckArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="check">
    <Robot x={6} y={26} scale={0.9} />
    <g transform="translate(26 36) rotate(-35)">
      <g className="jjart-pen">
        <rect x="-2" y="-14" width="4" height="14" rx="1.5" className="jjart-pencil-body" />
      </g>
    </g>
    <rect x="30" y="20" width="32" height="38" rx="4" className="jjart-page" />
    <rect x="35" y="27" width="20" height="3" rx="1.5" className="jjart-card-line" />
    <rect x="35" y="35" width="22" height="3" rx="1.5" className="jjart-card-line" />
    <rect x="35" y="43" width="14" height="3" rx="1.5" className="jjart-card-line" />
    <Robot x={70} y={26} scale={0.9} />
    <g className="jjart-scan">
      <circle cx="52" cy="34" r="7" className="jjart-glass" />
      <line x1="57" y1="39" x2="63" y2="45" className="jjart-stroke jjart-stroke-thick" />
    </g>
  </Spot>
);

export const JijuBeliefSaveArt: CssArtComponent = ({ label }) => (
  <Spot label={label} kind="save">
    <circle cx="80" cy="16" r="7" className="jjart-moon" />
    <circle cx="84" cy="13" r="6" className="jjart-spot-moon-cut" />
    <ellipse cx="42" cy="42" rx="24" ry="17" className="jjart-pig" />
    <circle cx="22" cy="40" r="7" className="jjart-pig" />
    <ellipse cx="17" cy="41" rx="3.4" ry="4" className="jjart-pig-snout" />
    <path d="M30 26 L34 18 L39 26 Z" className="jjart-pig" />
    <circle cx="25" cy="36" r="1.4" className="jjart-eye-dark" />
    <rect x="30" y="54" width="6" height="8" rx="2" className="jjart-pig" />
    <rect x="48" y="54" width="6" height="8" rx="2" className="jjart-pig" />
    <rect x="38" y="26" width="12" height="3" rx="1.5" className="jjart-slot" />
    <g className="jjart-coin">
      <circle cx="44" cy="14" r="6" className="jjart-coin-face" />
      <rect x="43" y="10.5" width="2" height="7" rx="1" className="jjart-coin-mark" />
    </g>
  </Spot>
);

/* ---------- storefront used inside the phone mock-up ---------- */

export const JijuStorefrontArt: CssArtComponent = ({ label }) => (
  <svg className="jjart jjart-storefront" viewBox="0 0 240 120" {...a11y(label)}>
    <rect width="240" height="120" className="jjart-stop-day-fill" />
    <g className="jjart-sun" transform="translate(206 26)">
      <circle r="12" className="jjart-sun-core" />
    </g>
    <rect x="0" y="100" width="240" height="20" className="jjart-ground" />
    <rect x="50" y="36" width="140" height="66" rx="4" className="jjart-shop-wall" />
    <path d="M42 26 H198 L190 44 H50 Z" className="jjart-awning-base" />
    {Array.from({ length: 7 }, (_, index) => (
      <path key={index} d={`M${50 + index * 20} 44 a10 8 0 0 0 20 0`} className={index % 2 ? 'jjart-awning-a' : 'jjart-awning-b'} />
    ))}
    <rect x="62" y="60" width="62" height="34" rx="3" className="jjart-window" />
    <g className="jjart-steam">
      <path d="M84 72 q-3 -5 0 -9 M93 72 q-3 -5 0 -9" className="jjart-steam-line" />
    </g>
    <rect x="80" y="74" width="22" height="14" rx="3" className="jjart-cup" />
    <rect x="138" y="58" width="40" height="44" rx="3" className="jjart-door" />
    <circle cx="170" cy="82" r="2" className="jjart-accent" />
    <Cat x={18} y={100} />
  </svg>
);
