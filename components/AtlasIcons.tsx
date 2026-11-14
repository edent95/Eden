import React from 'react';

/**
 * `/igaming/atlas` method-card icons, golden logic (same construction as the Jiju icon set):
 * a 24 grid with guides at 24/φ² and 24/φ; every circle, corner and arc uses
 * R = 9·φ^-k (9, 5.56, 3.44, 2.13, 1.31, 0.81); line width φ. One ink (currentColor) for the
 * solid body, the card paper colour for details cut into it, and one gold accent per icon
 * (brand: one ink, colour only where it explains). Transparent ground, no frame.
 */
const PHI = (1 + Math.sqrt(5)) / 2;
const R = [9, 9 / PHI, 9 / PHI ** 2, 9 / PHI ** 3, 9 / PHI ** 4, 9 / PHI ** 5].map((r) => Number(r.toFixed(2)));
const [R0, R1, R2, R3, R4] = R;
const SW = Number(PHI.toFixed(3));

type Icon = () => React.ReactElement;

const ICONS: Record<string, Icon> = {
  // 01 one rule in every language: two versions stacked, one row lines up across both (gold)
  '01': () => (
    <>
      <rect x={8.5} y={3} width={R1 * 2} height={R0 + R1} rx={R4} className="gi-l" />
      <rect x={4} y={6.5} width={R1 * 2} height={R0 + R1} rx={R4} className="gi-s" />
      <path d="M6.5 11h6.1M6.5 18h4.2" className="gi-n" />
      <path d="M6.5 14.5h13.1" className="gi-al" />
    </>
  ),
  // 02 "provider supports it" is step one: a plug — it exists, it is not yet connected
  '02': () => (
    <>
      <path d={`M${12 - R2} 4.5v4M${12 + R2} 4.5v4`} className="gi-l" />
      <rect x={12 - R1} y={8.5} width={R1 * 2} height={R1 * 1.4} rx={R4} className="gi-s" />
      <path d={`M12 ${8.5 + R1 * 1.4}v${R2}`} className="gi-l" />
      <circle cx={12} cy={21} r={R3} className="gi-a" />
    </>
  ),
  // 03 player state before contact: a bell, with a status dot (not contacting is an answer)
  '03': () => (
    <>
      <path d={`M${12 - R1} 16.5V${12}a${R1} ${R1} 0 0 1 ${R1 * 2} 0v4.5z`} className="gi-s" />
      <path d="M5 16.5h14" className="gi-l" />
      <circle cx={12} cy={19.4} r={R3 * 0.8} className="gi-s" />
      <circle cx={18} cy={5.5} r={R3} className="gi-a" />
    </>
  ),
  // 04 a label is not a formula: numerator over denominator, the bar in gold
  '04': () => (
    <>
      <rect x={12 - R2 * 1.2} y={3.5} width={R2 * 2.4} height={R1} rx={R4} className="gi-s" />
      <path d="M4.5 12h15" className="gi-al" />
      <rect x={12 - R2 * 1.2} y={20.5 - R1} width={R2 * 2.4} height={R1} rx={R4} className="gi-s" />
    </>
  ),
  // 05 wallet, rewards, support: a wallet whose clasp holds the reward (gold)
  '05': () => (
    <>
      <rect x={3} y={6.5} width={18} height={R0 + R2} rx={R3} className="gi-s" />
      <path d="M3 10.5h10" className="gi-n" />
      <rect x={14} y={10.5} width={7} height={R1} rx={R4} className="gi-p" />
      <circle cx={17.5} cy={10.5 + R1 / 2} r={R4} className="gi-a" />
    </>
  ),
  // 06 channels have levels of evidence: a funnel with one level marked
  '06': () => (
    <>
      <path d="M3 4.5h18l-6.5 8v7l-5 2v-9z" className="gi-s" />
      <path d="M6.5 8.5h11" className="gi-al" />
    </>
  ),
  // 07 every hand-off checkable: a checklist board, the last tick in gold
  '07': () => (
    <>
      <rect x={4.5} y={3} width={15} height={18} rx={R3} className="gi-s" />
      <path d="M7.3 8l1.2 1.2 2-2.4M7.3 12.5l1.2 1.2 2-2.4M12.2 8.2h4.8M12.2 12.7h4.8M12.2 17.2h4.8" className="gi-n" />
      <path d="M7.3 17l1.2 1.2 2-2.4" className="gi-al" />
    </>
  ),
  // 08 a prototype is not a result: the evidence ladder, only the top step counts
  '08': () => (
    <>
      <path d="M3 21v-4h4.5v-4.2H12V8.6h4.5V4.5H21V21z" className="gi-s" />
      <circle cx={18.75} cy={2.6} r={R4} className="gi-a" />
    </>
  ),
  // 09 wheels: price the expected cost — a roulette wheel, the ball in the rare pocket
  '09': () => (
    <>
      <circle cx={12} cy={12} r={R0} className="gi-s" />
      <circle cx={12} cy={12} r={R1} className="gi-n" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
        return <path key={i} d={`M${(12 + Math.cos(a) * R1).toFixed(2)} ${(12 + Math.sin(a) * R1).toFixed(2)}L${(12 + Math.cos(a) * (R0 - 1)).toFixed(2)} ${(12 + Math.sin(a) * (R0 - 1)).toFixed(2)}`} className="gi-n thin" />;
      })}
      <circle cx={12} cy={12} r={R4} className="gi-p" />
      <circle cx={12} cy={12 - (R0 + R1) / 2} r={R4} className="gi-a" />
    </>
  ),
  // 10 brand health check: a pulse across a panel, the trace in gold
  '10': () => (
    <>
      <rect x={3} y={4.5} width={18} height={15} rx={R3} className="gi-s" />
      <path d="M5.5 12.5H9l1.5-3.6 2.5 7 1.5-3.4h4" className="gi-al" />
    </>
  ),
  // 11 six in, two out: two cards picked, the front one marked in gold
  '11': () => (
    <>
      <rect x={4} y={4} width={R1 * 1.6} height={R0 + R2} rx={R4} transform="rotate(-12 8.5 10.2)" className="gi-s" />
      <rect x={10} y={6.5} width={R1 * 1.6} height={R0 + R2} rx={R4} transform="rotate(10 14.5 12.7)" className="gi-p gi-pl" />
      <path d={`M14.5 ${12.7 - R2}l${R2 * 0.7} ${R2}-${R2 * 0.7} ${R2}-${R2 * 0.7}-${R2}z`} transform="rotate(10 14.5 12.7)" className="gi-a" />
    </>
  ),
};

const AtlasIcon: React.FC<{ id: string; size?: number; className?: string }> = ({ id, size = 24, className }) => {
  const Draw = ICONS[id];
  if (!Draw) return null;
  return (
    <svg
      className={`atlas-icon${className ? ` ${className}` : ''}`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ '--gi-sw': SW } as React.CSSProperties}
    >
      <Draw />
    </svg>
  );
};

export default AtlasIcon;
