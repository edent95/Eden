import React from 'react';

/**
 * `/igaming/atlas` engraved vignettes (golden-engraving language): CSS-only plates in the
 * page's one bronze ink, no people, no text. One maths motif each:
 * - provider: three reel windows at 1 : φ
 * - merchant: a portico whose steps shrink by φ
 * - player: a twelve-insert chip with a φ pentagram at its centre
 * - middle: vesica piscis, two equal circles whose centres sit one radius apart (Eden between two sides)
 * Decorative only (aria-hidden); styles in `igaming-atlas.css` under `.atlas-eng`.
 */
export type AtlasEngravingKind = 'provider' | 'merchant' | 'player' | 'middle';

const Subject: React.FC<{ kind: AtlasEngravingKind }> = ({ kind }) => {
  if (kind === 'provider') {
    return (
      <>
        <span className="ae-cab" />
        <span className="ae-reel is-l"><span className="ae-sym is-dia" /></span>
        <span className="ae-reel is-m"><span className="ae-sym is-star" /></span>
        <span className="ae-reel is-r"><span className="ae-sym is-ring" /></span>
        <span className="ae-payline" />
        <span className="ae-lever" />
        <span className="ae-knob" />
      </>
    );
  }
  if (kind === 'merchant') {
    return (
      <>
        <span className="ae-ped" />
        <span className="ae-arch" />
        <span className="ae-col is-1" />
        <span className="ae-col is-2" />
        <span className="ae-col is-3" />
        <span className="ae-col is-4" />
        <span className="ae-door" />
        <span className="ae-step is-1" />
        <span className="ae-step is-2" />
        <span className="ae-step is-3" />
      </>
    );
  }
  if (kind === 'player') {
    return (
      <>
        <span className="ae-chip" />
        <span className="ae-chip-edge" />
        <span className="ae-chip-in" />
        <span className="ae-penta" />
      </>
    );
  }
  return (
    <>
      <span className="ae-circle is-a" />
      <span className="ae-circle is-b" />
      <span className="ae-lens"><span /></span>
    </>
  );
};

const AtlasEngraving: React.FC<{ kind: AtlasEngravingKind }> = ({ kind }) => (
  <div className={`atlas-eng is-${kind}`} aria-hidden="true">
    <span className="ae-plate" />
    <span className="ae-glow" />
    <span className="ae-rosette" />
    <span className="ae-ring" />
    <span className="ae-golden" />
    <span className="ae-window" />
    <Subject kind={kind} />
  </div>
);

export default AtlasEngraving;
