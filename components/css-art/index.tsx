import React from 'react';

export type CssArtComponent = React.FC<{ label: string }>;

export const HomeProjectsBlueprintIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-projects-blueprint-icon" role="img" aria-label={label}>
    <span className="home-blueprint-grid" />
    <span className="home-blueprint-sheet" />
    <span className="home-blueprint-frame" />
    <span className="home-blueprint-plan plan-a" />
    <span className="home-blueprint-plan plan-b" />
    <span className="home-blueprint-plan plan-c" />
    <span className="home-blueprint-dimension dimension-x" />
    <span className="home-blueprint-dimension dimension-y" />
    <span className="home-blueprint-node node-a" />
    <span className="home-blueprint-node node-b" />
    <span className="home-blueprint-scan" />
  </div>
);

export const HomeJijuCatScene: React.FC = () => (
  <div className="jiju-cat-scene" aria-hidden="true">
    <span className="jiju-sun" />
    <span className="jiju-star s1" />
    <span className="jiju-star s2" />
    <span className="jiju-star s3" />
    <span className="jiju-cloud jiju-cloud-a" />
    <span className="jiju-cloud jiju-cloud-b" />
    <span className="jiju-butterfly">
      <span className="wing left" />
      <span className="wing right" />
    </span>
    <span className="jiju-leaf" />
    <div className="jiju-ground" />
    <span className="jiju-grass g1" />
    <span className="jiju-grass g2" />
    <span className="jiju-grass g3" />
    <span className="jiju-paw p1" />
    <span className="jiju-paw p2" />
    <span className="jiju-paw p3" />
    <span className="jiju-paw p4" />
    <div className="jiju-cat">
      <span className="jiju-dust" />
      <div className="jiju-cat-face">
        <div className="jiju-cat-bob">
          <span className="jiju-cat-tail" />
          <span className="jiju-cat-body" />
          <span className="jiju-cat-head">
            <span className="jiju-cat-ear left" />
            <span className="jiju-cat-ear right" />
            <span className="jiju-cat-eye" />
            <span className="jiju-cat-whisker w1" />
            <span className="jiju-cat-whisker w2" />
            <span className="jiju-cat-tongue" />
          </span>
          <span className="jiju-cat-leg leg1" />
          <span className="jiju-cat-leg leg2" />
          <span className="jiju-cat-leg leg3" />
          <span className="jiju-cat-leg leg4" />
        </div>
      </div>
    </div>
    <div className="jiju-cat jiju-cat-cameo">
      <span className="jiju-dust" />
      <div className="jiju-cat-face">
        <div className="jiju-cat-bob">
          <span className="jiju-cat-tail" />
          <span className="jiju-cat-body" />
          <span className="jiju-cat-head">
            <span className="jiju-cat-ear left" />
            <span className="jiju-cat-ear right" />
            <span className="jiju-cat-eye" />
            <span className="jiju-cat-whisker w1" />
            <span className="jiju-cat-whisker w2" />
          </span>
          <span className="jiju-cat-leg leg1" />
          <span className="jiju-cat-leg leg2" />
          <span className="jiju-cat-leg leg3" />
          <span className="jiju-cat-leg leg4" />
        </div>
      </div>
    </div>
  </div>
);

export const HomeLifeMagicIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-life-magic-icon" role="img" aria-label={label}>
    <span className="home-life-magic-aura" />
    <span className="home-life-magic-heart" />
    <span className="home-life-magic-ring ring-outer" />
    <span className="home-life-magic-ring ring-inner" />
    <span className="home-life-magic-geometry geometry-a" />
    <span className="home-life-magic-geometry geometry-b" />
    <span className="home-life-magic-axis axis-x" />
    <span className="home-life-magic-axis axis-y" />
    <span className="home-life-magic-node node-a" />
    <span className="home-life-magic-node node-b" />
    <span className="home-life-magic-node node-c" />
    <span className="home-life-magic-spark spark-a" />
    <span className="home-life-magic-spark spark-b" />
  </div>
);

export const HomeBaguaMirrorTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-bagua-totem" role="img" aria-label={label}>
    <span className="home-bagua-ring ring-outer" />
    <span className="home-bagua-ring ring-inner" />
    <span className="home-bagua-yinyang">
      <span className="home-bagua-dot dot-light" />
      <span className="home-bagua-dot dot-dark" />
    </span>
    {Array.from({ length: 8 }, (_, index) => (
      <span key={index} className={`home-bagua-trigram trigram-${index + 1}`}>
        <span />
        <span />
        <span />
      </span>
    ))}
    <span className="home-bagua-glint" />
  </div>
);

export const HomeGramophoneTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-gramophone-totem" role="img" aria-label={label}>
    <span className="home-gramophone-wave wave-a" />
    <span className="home-gramophone-wave wave-b" />
    <span className="home-gramophone-horn-neck" />
    <span className="home-gramophone-horn-bell" />
    <span className="home-gramophone-horn-ribs" />
    <span className="home-gramophone-horn-mouth" />
    <span className="home-gramophone-base" />
    <span className="home-gramophone-base-panel" />
    <span className="home-gramophone-crank" />
    <span className="home-gramophone-platter" />
    <span className="home-gramophone-record" />
    <span className="home-gramophone-label" />
    <span className="home-gramophone-arm" />
    <span className="home-gramophone-needle" />
  </div>
);

export const HomePowerUpTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-power-totem" role="img" aria-label={label}>
    <span className="home-power-aura aura-back" />
    <span className="home-power-aura aura-front" />
    <span className="home-power-body" />
    <span className="home-power-belt" />
    <span className="home-power-face" />
    <span className="home-power-hair hair-dark">
      <span className="lock lock-a" />
      <span className="lock lock-b" />
      <span className="lock lock-c" />
      <span className="lock lock-d" />
      <span className="lock lock-e" />
    </span>
    <span className="home-power-hair hair-gold">
      <span className="lock lock-a" />
      <span className="lock lock-b" />
      <span className="lock lock-c" />
      <span className="lock lock-d" />
      <span className="lock lock-e" />
    </span>
    <span className="home-power-spark spark-a" />
    <span className="home-power-spark spark-b" />
  </div>
);

export const HomePyramidBreakTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-pyramid-totem" role="img" aria-label={label}>
    <span className="home-pyramid-impact" />
    <span className="home-pyramid-wave" />
    <span className="home-pyramid-block block-a" />
    <span className="home-pyramid-block block-b" />
    <span className="home-pyramid-block block-c" />
    <span className="home-pyramid-block block-d" />
    <span className="home-pyramid-block block-e" />
    <span className="home-pyramid-block block-f" />
    <span className="home-pyramid-block block-g" />
    <span className="home-pyramid-block block-h" />
    <span className="home-pyramid-crack crack-a" />
    <span className="home-pyramid-crack crack-b" />
    <span className="home-pyramid-pixel pixel-a" />
    <span className="home-pyramid-pixel pixel-b" />
    <span className="home-pyramid-pixel pixel-c" />
  </div>
);

export const HomeArchiveEvolutionTotem: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-archive-evolution-totem" role="img" aria-label={label}>
    <span className="home-archive-small-beast">
      <span className="home-archive-small-tail" />
      <span className="home-archive-small-body" />
      <span className="home-archive-small-head" />
      <span className="home-archive-small-eye" />
      <span className="home-archive-small-claw claw-a" />
      <span className="home-archive-small-claw claw-b" />
    </span>
    <span className="home-archive-fire-dragon">
      <span className="home-archive-dragon-wing wing-a" />
      <span className="home-archive-dragon-wing wing-b" />
      <span className="home-archive-dragon-tail" />
      <span className="home-archive-dragon-tail-flame" />
      <span className="home-archive-dragon-body" />
      <span className="home-archive-dragon-neck" />
      <span className="home-archive-dragon-head" />
      <span className="home-archive-dragon-horn horn-a" />
      <span className="home-archive-dragon-horn horn-b" />
      <span className="home-archive-dragon-eye" />
      <span className="home-archive-dragon-claw claw-a" />
      <span className="home-archive-dragon-claw claw-b" />
      <span className="home-archive-dragon-breath" />
    </span>
    <span className="home-archive-evolution-spark spark-a" />
    <span className="home-archive-evolution-spark spark-b" />
  </div>
);

export const ProjectsJijuCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-jiju-css-icon" role="img" aria-label={label}>
    <span className="projects-jiju-icon-sun" />
    <span className="projects-jiju-icon-cloud cloud-a" />
    <span className="projects-jiju-icon-cloud cloud-b" />
    <span className="projects-jiju-icon-ground" />
    <span className="projects-jiju-icon-grass grass-a" />
    <span className="projects-jiju-icon-grass grass-b" />
    <span className="projects-jiju-icon-cat">
      <span className="projects-jiju-icon-tail" />
      <span className="projects-jiju-icon-body" />
      <span className="projects-jiju-icon-head">
        <span className="projects-jiju-icon-ear left" />
        <span className="projects-jiju-icon-ear right" />
        <span className="projects-jiju-icon-eye" />
        <span className="projects-jiju-icon-whisker w1" />
        <span className="projects-jiju-icon-whisker w2" />
      </span>
      <span className="projects-jiju-icon-leg leg-a" />
      <span className="projects-jiju-icon-leg leg-b" />
      <span className="projects-jiju-icon-leg leg-c" />
      <span className="projects-jiju-icon-leg leg-d" />
    </span>
  </div>
);

export const ProjectsPokerCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-poker-css-icon" role="img" aria-label={label}>
    <span className="projects-poker-table" />
    <span className="projects-poker-table-rim" />
    <span className="projects-poker-card card-a">
      <span className="projects-poker-rank rank-top">A</span>
      <span className="projects-poker-suit suit-spade" />
      <span className="projects-poker-rank rank-bottom">A</span>
    </span>
    <span className="projects-poker-card card-b">
      <span className="projects-poker-rank rank-top">A</span>
      <span className="projects-poker-suit suit-heart" />
      <span className="projects-poker-rank rank-bottom">A</span>
    </span>
  </div>
);

export const ProjectsEtReportCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-etreport-css-icon" role="img" aria-label={label}>
    <span className="projects-etreport-topbar" />
    <span className="projects-etreport-dot dot-a" />
    <span className="projects-etreport-dot dot-b" />
    <span className="projects-etreport-dot dot-c" />
    <span className="projects-etreport-grid" />
    <span className="projects-etreport-bar bar-a" />
    <span className="projects-etreport-bar bar-b" />
    <span className="projects-etreport-bar bar-c" />
    <span className="projects-etreport-bar bar-d" />
    <span className="projects-etreport-line" />
    <span className="projects-etreport-scan" />
  </div>
);

export const ProjectsCrmCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-crm-css-icon" role="img" aria-label={label}>
    <span className="projects-crm-ring ring-outer" />
    <span className="projects-crm-ring ring-middle" />
    <span className="projects-crm-ring ring-inner" />
    <span className="projects-crm-polygon polygon-octagon" />
    <span className="projects-crm-polygon polygon-hexagon" />
    <span className="projects-crm-axis axis-x" />
    <span className="projects-crm-axis axis-y" />
    <span className="projects-crm-triangle triangle-a" />
    <span className="projects-crm-triangle triangle-b" />
    <span className="projects-crm-tick tick-a" />
    <span className="projects-crm-tick tick-b" />
    <span className="projects-crm-tick tick-c" />
    <span className="projects-crm-tick tick-d" />
    <span className="projects-crm-node node-a" />
    <span className="projects-crm-node node-b" />
    <span className="projects-crm-node node-c" />
    <span className="projects-crm-node node-d" />
    <span className="projects-crm-glyph glyph-a" />
    <span className="projects-crm-glyph glyph-b" />
    <span className="projects-crm-core" />
    <span className="projects-crm-orbit" />
  </div>
);

export const WikiRagFlowCssIcon: CssArtComponent = ({ label }) => (
  <div className="wiki-rag-flow-icon" role="img" aria-label={label}>
    <span className="wiki-rag-flow-cloud cloud-a" />
    <span className="wiki-rag-flow-cloud cloud-b" />
    <span className="wiki-rag-flow-shelf" />
    <span className="wiki-rag-flow-note note-back" />
    <span className="wiki-rag-flow-note note-front" />
    <span className="wiki-rag-flow-tag tag-a" />
    <span className="wiki-rag-flow-tag tag-b" />
    <span className="wiki-rag-flow-search" />
  </div>
);

const WikiTopicIconFrame: React.FC<{ label: string; tone: string }> = ({ label, tone }) => (
  <div className={`wiki-topic-icon wiki-topic-${tone}`} role="img" aria-label={label}>
    <span className="wiki-topic-base" />
    <span className="wiki-topic-mark mark-a" />
    <span className="wiki-topic-mark mark-b" />
    <span className="wiki-topic-mark mark-c" />
    <span className="wiki-topic-signal signal-a" />
    <span className="wiki-topic-signal signal-b" />
  </div>
);

export const WikiViteCssIcon: CssArtComponent = ({ label }) => (
  <WikiTopicIconFrame label={label} tone="vite" />
);

export const WikiBackgroundMusicCssIcon: CssArtComponent = ({ label }) => (
  <WikiTopicIconFrame label={label} tone="music" />
);

export const WikiButtonFeedbackCssIcon: CssArtComponent = ({ label }) => (
  <WikiTopicIconFrame label={label} tone="button" />
);

export const WikiFirebaseStorageCssIcon: CssArtComponent = ({ label }) => (
  <WikiTopicIconFrame label={label} tone="firebase" />
);

export const WikiSkillsCssIcon: CssArtComponent = ({ label }) => (
  <WikiTopicIconFrame label={label} tone="skills" />
);

const fallbackFrameStyle: React.CSSProperties = {
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  aspectRatio: '1 / 1',
  minWidth: 0,
  overflow: 'hidden',
  borderRadius: '1.25rem',
  background: 'color-mix(in srgb, var(--theme-surface-muted) 76%, transparent)',
  boxShadow: 'inset 0 0 0 1px rgb(120 113 108 / 0.14)',
};

const fallbackGlyphStyle: React.CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: '58%',
  aspectRatio: '1 / 1',
  borderRadius: '999px',
  fontSize: 'clamp(2rem, 6vw, 4rem)',
  background: 'rgb(var(--theme-mint-glow) / 0.16)',
  color: 'var(--theme-text-primary)',
};

const CssArtGlyph: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="projects-card-icon css-art-fallback-icon" style={fallbackFrameStyle} role="img" aria-label={label}>
    <span style={fallbackGlyphStyle} aria-hidden>
      {children}
    </span>
  </div>
);

export const OfficeCalendarCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>▣</CssArtGlyph>;
export const OfficeInboxCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>▤</CssArtGlyph>;
export const OfficeReportCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>▦</CssArtGlyph>;
export const OfficeTeamBoardCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>▧</CssArtGlyph>;
export const OfficeContractCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>✎</CssArtGlyph>;
export const OfficeWorkflowCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>⌁</CssArtGlyph>;

export const MathPrimeSigilCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>7</CssArtGlyph>;
export const MathVectorGateCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>→</CssArtGlyph>;
export const MathIntegralSpellCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>∫</CssArtGlyph>;
export const MathPiOrbCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>π</CssArtGlyph>;
export const MathFractalRuneCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>⌬</CssArtGlyph>;
export const MathMatrixPortalCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>[]</CssArtGlyph>;

export const ElementFireCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>火</CssArtGlyph>;
export const ElementWaterCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>水</CssArtGlyph>;
export const ElementWindCssIcon: CssArtComponent = ({ label }) => <CssArtGlyph label={label}>风</CssArtGlyph>;
