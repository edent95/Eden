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

export const FilmGalleryCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="film-app-icon" role="img" aria-label={label}>
    <span className="film-app-strip">
      <span className="film-app-perforations perforations-top" />
      <span className="film-app-perforations perforations-bottom" />
    </span>
    <span className="film-app-frame">
      <span className="film-app-sun" />
      <span className="film-app-horizon horizon-back" />
      <span className="film-app-horizon horizon-front" />
    </span>
    <span className="film-app-reel reel-left"><i /><i /><i /></span>
    <span className="film-app-reel reel-right"><i /><i /><i /></span>
    <span className="film-app-counter">11</span>
  </div>
);

export const HomeFilmGalleryBanner: React.FC<{ label: string }> = ({ label }) => (
  <div className="film-gallery-banner" role="img" aria-label={label}>
    <span className="film-banner-strip" aria-hidden="true">
      <span className="film-banner-perforations perforations-top">
        {Array.from({ length: 14 }, (_, index) => <i key={`top-${index}`} style={{ left: `${3 + index * 7.2}%` }} />)}
      </span>
      <span className="film-banner-perforations perforations-bottom">
        {Array.from({ length: 14 }, (_, index) => <i key={`bottom-${index}`} style={{ left: `${3 + index * 7.2}%` }} />)}
      </span>
      <span className="film-banner-frame frame-a">
        <i className="film-banner-sun" />
        <i className="film-banner-horizon horizon-back" />
        <i className="film-banner-horizon horizon-front" />
      </span>
      <span className="film-banner-frame frame-b">
        <i className="film-banner-arch arch-a" />
        <i className="film-banner-arch arch-b" />
        <i className="film-banner-floor" />
      </span>
      <span className="film-banner-frame frame-c">
        <i className="film-banner-moon" />
        <i className="film-banner-roof roof-back" />
        <i className="film-banner-roof roof-front" />
      </span>
    </span>
    <span className="film-banner-reel reel-left" aria-hidden="true"><i /><i /><i /></span>
    <span className="film-banner-reel reel-right" aria-hidden="true"><i /><i /><i /></span>
    <span className="film-banner-counter" aria-hidden="true">15 FRAMES</span>
  </div>
);

export const HomeEdwinDashboardBanner: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-work-banner home-work-dashboard" role="img" aria-label={label}>
    <span className="home-work-dashboard-window" />
    <span className="home-work-dashboard-topbar" />
    <span className="home-work-dashboard-dot dot-a" />
    <span className="home-work-dashboard-dot dot-b" />
    <span className="home-work-dashboard-dot dot-c" />
    <span className="home-work-dashboard-sidebar" />
    <span className="home-work-dashboard-nav nav-a" />
    <span className="home-work-dashboard-nav nav-b" />
    <span className="home-work-dashboard-nav nav-c" />
    <span className="home-work-dashboard-metric metric-a" />
    <span className="home-work-dashboard-metric metric-b" />
    <span className="home-work-dashboard-metric metric-c" />
    <span className="home-work-dashboard-grid" />
    <span className="home-work-dashboard-bar bar-a" />
    <span className="home-work-dashboard-bar bar-b" />
    <span className="home-work-dashboard-bar bar-c" />
    <span className="home-work-dashboard-bar bar-d" />
    <span className="home-work-dashboard-trend trend-a" />
    <span className="home-work-dashboard-trend trend-b" />
    <span className="home-work-dashboard-trend trend-c" />
    <span className="home-work-dashboard-signal" />
  </div>
);

export const HomeJijuDiscoveryBanner: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-work-banner home-work-jiju" role="img" aria-label={label}>
    <span className="home-work-jiju-map" />
    <span className="home-work-jiju-block block-a" />
    <span className="home-work-jiju-block block-b" />
    <span className="home-work-jiju-block block-c" />
    <span className="home-work-jiju-road road-a" />
    <span className="home-work-jiju-road road-b" />
    <span className="home-work-jiju-route route-a" />
    <span className="home-work-jiju-route route-b" />
    <span className="home-work-jiju-route route-c" />
    <span className="home-work-jiju-pin pin-a" />
    <span className="home-work-jiju-pin pin-b" />
    <span className="home-work-jiju-traveler" />
    <span className="home-work-jiju-card" />
    <span className="home-work-jiju-cat-body" />
    <span className="home-work-jiju-cat-tail" />
    <span className="home-work-jiju-cat-head" />
    <span className="home-work-jiju-cat-ear ear-a" />
    <span className="home-work-jiju-cat-ear ear-b" />
    <span className="home-work-jiju-verified" />
  </div>
);

export const HomeLifeDatasetBanner: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-work-banner home-work-life-data" role="img" aria-label={label}>
    <span className="home-work-life-grid" />
    <span className="home-work-life-axis axis-x" />
    <span className="home-work-life-axis axis-y" />
    <span className="home-work-life-card card-a" />
    <span className="home-work-life-card card-b" />
    <span className="home-work-life-card card-c" />
    <span className="home-work-life-line line-a" />
    <span className="home-work-life-line line-b" />
    <span className="home-work-life-line line-c" />
    <span className="home-work-life-node node-a" />
    <span className="home-work-life-node node-b" />
    <span className="home-work-life-node node-c" />
    <span className="home-work-life-node node-d" />
    <span className="home-work-life-orbit" />
    <span className="home-work-life-core" />
    <span className="home-work-life-marker" />
  </div>
);

export const HomeConwayGameBanner: React.FC<{ label: string }> = ({ label }) => (
  <div className="home-conway-banner" role="img" aria-label={label}>
    <span className="home-conway-board" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => (
        <span key={`v-${index}`} className="home-conway-grid-line line-v" style={{ left: `${(index + 1) * 10}%` }} />
      ))}
      {Array.from({ length: 7 }, (_, index) => (
        <span key={`h-${index}`} className="home-conway-grid-line line-h" style={{ top: `${(index + 1) * 12.5}%` }} />
      ))}
      {Array.from({ length: 12 }, (_, index) => (
        <span key={`cell-${index}`} className={`home-conway-live-cell cell-${index + 1}`} />
      ))}
    </span>
    <span className="home-conway-sigil" aria-hidden="true">
      <span className="home-conway-ring ring-outer" />
      <span className="home-conway-ring ring-middle" />
      <span className="home-conway-ring ring-inner" />
      <span className="home-conway-axis axis-x" />
      <span className="home-conway-axis axis-y" />
      <span className="home-conway-diamond" />
      <span className="home-conway-core" />
      <span className="home-conway-node node-a" />
      <span className="home-conway-node node-b" />
      <span className="home-conway-node node-c" />
      <span className="home-conway-node node-d" />
      <span className="home-conway-orbit"><i /></span>
    </span>
    <span className="home-conway-glider" aria-hidden="true">
      <i className="glider-a" />
      <i className="glider-b" />
      <i className="glider-c" />
      <i className="glider-d" />
      <i className="glider-e" />
    </span>
    <span className="home-conway-rule" aria-hidden="true">B3 / S23</span>
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

export const ProjectsMiyaCssIcon: CssArtComponent = ({ label }) => (
  <div className="projects-card-icon projects-miya-css-icon" role="img" aria-label={label}>
    <span className="projects-miya-ring" />
    <span className="projects-miya-heart" />
    <span className="projects-miya-pulse" />
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

export const ProjectsDrRacingCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-drracing-css-icon" role="img" aria-label={label}>
    <span className="projects-drracing-dial" />
    <span className="projects-drracing-tick tick-a" />
    <span className="projects-drracing-tick tick-b" />
    <span className="projects-drracing-tick tick-c" />
    <span className="projects-drracing-tick tick-d" />
    <span className="projects-drracing-tick tick-e" />
    <span className="projects-drracing-redline" />
    <span className="projects-drracing-needle" />
    <span className="projects-drracing-hub" />
    <span className="projects-drracing-speedline line-a" />
    <span className="projects-drracing-speedline line-b" />
    <span className="projects-drracing-speedline line-c" />
  </div>
);

export const ProjectsLifeOsCssIcon: React.FC<{ label: string }> = ({ label }) => (
  <div className="projects-card-icon projects-life-os-css-icon" role="img" aria-label={label}>
    <span className="projects-life-os-orbit orbit-outer" />
    <span className="projects-life-os-orbit orbit-middle" />
    <span className="projects-life-os-orbit orbit-inner" />
    <span className="projects-life-os-node node-a" />
    <span className="projects-life-os-node node-b" />
    <span className="projects-life-os-node node-c" />
    <span className="projects-life-os-core">
      <span className="projects-life-os-core-ring" />
      <span className="projects-life-os-core-dot" />
    </span>
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

const OfficeIconFrame: React.FC<{ label: string; tone: string; children: React.ReactNode }> = ({ label, tone, children }) => (
  <div className={`projects-card-icon office-icon office-${tone}-icon`} role="img" aria-label={label}>
    <span className="office-icon-surface" />
    {children}
  </div>
);

export const OfficeCalendarCssIcon: CssArtComponent = ({ label }) => (
  <OfficeIconFrame label={label} tone="calendar">
    <span className="office-calendar-page" />
    <span className="office-calendar-bind bind-a" />
    <span className="office-calendar-bind bind-b" />
    <span className="office-calendar-header" />
    <span className="office-calendar-date date-a" />
    <span className="office-calendar-date date-b" />
    <span className="office-calendar-date date-c" />
    <span className="office-calendar-date date-d" />
  </OfficeIconFrame>
);

export const OfficeInboxCssIcon: CssArtComponent = ({ label }) => (
  <OfficeIconFrame label={label} tone="inbox">
    <span className="office-inbox-paper paper-back" />
    <span className="office-inbox-paper paper-front" />
    <span className="office-inbox-tray" />
    <span className="office-inbox-lip" />
  </OfficeIconFrame>
);

export const OfficeReportCssIcon: CssArtComponent = ({ label }) => (
  <OfficeIconFrame label={label} tone="report">
    <span className="office-report-sheet" />
    <span className="office-report-bar bar-a" />
    <span className="office-report-bar bar-b" />
    <span className="office-report-bar bar-c" />
    <span className="office-report-check" />
  </OfficeIconFrame>
);

export const OfficeTeamBoardCssIcon: CssArtComponent = ({ label }) => (
  <OfficeIconFrame label={label} tone="team">
    <span className="office-team-board" />
    <span className="office-team-card card-a" />
    <span className="office-team-card card-b" />
    <span className="office-team-card card-c" />
    <span className="office-team-pin pin-a" />
    <span className="office-team-pin pin-b" />
  </OfficeIconFrame>
);

export const OfficeContractCssIcon: CssArtComponent = ({ label }) => (
  <OfficeIconFrame label={label} tone="contract">
    <span className="office-contract-paper" />
    <span className="office-contract-mark" />
    <span className="office-contract-pen" />
    <span className="office-contract-seal" />
  </OfficeIconFrame>
);

export const OfficeWorkflowCssIcon: CssArtComponent = ({ label }) => (
  <OfficeIconFrame label={label} tone="workflow">
    <span className="office-workflow-line line-a" />
    <span className="office-workflow-line line-b" />
    <span className="office-workflow-node node-a" />
    <span className="office-workflow-node node-b" />
    <span className="office-workflow-node node-c" />
    <span className="office-workflow-wand" />
    <span className="office-workflow-spark spark-a" />
    <span className="office-workflow-spark spark-b" />
  </OfficeIconFrame>
);

const MathIconFrame: React.FC<{ label: string; tone: string; children: React.ReactNode }> = ({ label, tone, children }) => (
  <div className={`projects-card-icon math-magic-icon math-${tone}-icon`} role="img" aria-label={label}>
    <span className="math-magic-aura" />
    <span className="math-magic-ring ring-outer" />
    <span className="math-magic-ring ring-inner" />
    {children}
  </div>
);

export const MathPrimeSigilCssIcon: CssArtComponent = ({ label }) => (
  <MathIconFrame label={label} tone="prime">
    <span className="math-prime-number">7</span>
    <span className="math-prime-tick tick-a" />
    <span className="math-prime-tick tick-b" />
  </MathIconFrame>
);

export const MathVectorGateCssIcon: CssArtComponent = ({ label }) => (
  <MathIconFrame label={label} tone="vector">
    <span className="math-vector-plane" />
    <span className="math-vector-arrow arrow-a" />
    <span className="math-vector-arrow arrow-b" />
  </MathIconFrame>
);

export const MathIntegralSpellCssIcon: CssArtComponent = ({ label }) => (
  <MathIconFrame label={label} tone="integral">
    <span className="math-integral-symbol">∫</span>
    <span className="math-integral-area" />
  </MathIconFrame>
);

export const MathPiOrbCssIcon: CssArtComponent = ({ label }) => (
  <MathIconFrame label={label} tone="pi">
    <span className="math-pi-orb" />
    <span className="math-pi-symbol">π</span>
    <span className="math-pi-moon moon-a" />
    <span className="math-pi-moon moon-b" />
  </MathIconFrame>
);

export const MathFractalRuneCssIcon: CssArtComponent = ({ label }) => (
  <MathIconFrame label={label} tone="fractal">
    <span className="math-fractal-branch branch-a" />
    <span className="math-fractal-branch branch-b" />
    <span className="math-fractal-branch branch-c" />
    <span className="math-fractal-node node-a" />
    <span className="math-fractal-node node-b" />
    <span className="math-fractal-node node-c" />
  </MathIconFrame>
);

export const MathMatrixPortalCssIcon: CssArtComponent = ({ label }) => (
  <MathIconFrame label={label} tone="matrix">
    <span className="math-matrix-bracket bracket-left" />
    <span className="math-matrix-bracket bracket-right" />
    <span className="math-matrix-cell cell-a" />
    <span className="math-matrix-cell cell-b" />
    <span className="math-matrix-cell cell-c" />
    <span className="math-matrix-core" />
  </MathIconFrame>
);

const ElementIconFrame: React.FC<{ label: string; tone: string; children: React.ReactNode }> = ({ label, tone, children }) => (
  <div className={`projects-card-icon element-icon element-${tone}-icon`} role="img" aria-label={label}>
    <span className="element-base-glow" />
    {children}
  </div>
);

export const ElementFireCssIcon: CssArtComponent = ({ label }) => (
  <ElementIconFrame label={label} tone="fire">
    <span className="fire-element-flame flame-back" />
    <span className="fire-element-flame flame-mid" />
    <span className="fire-element-flame flame-front" />
    <span className="fire-element-ember ember-a" />
    <span className="fire-element-ember ember-b" />
  </ElementIconFrame>
);

export const ElementWaterCssIcon: CssArtComponent = ({ label }) => (
  <ElementIconFrame label={label} tone="water">
    <span className="water-element-drop drop-back" />
    <span className="water-element-drop drop-front" />
    <span className="water-element-bubble bubble-a" />
    <span className="water-element-bubble bubble-b" />
    <span className="water-element-bubble bubble-c" />
  </ElementIconFrame>
);

export const ElementWindCssIcon: CssArtComponent = ({ label }) => (
  <ElementIconFrame label={label} tone="wind">
    <span className="wind-element-gust gust-a" />
    <span className="wind-element-gust gust-b" />
    <span className="wind-element-gust gust-c" />
    <span className="wind-element-leaf leaf-a" />
    <span className="wind-element-leaf leaf-b" />
  </ElementIconFrame>
);

export const PenneyCoinCssIcon: CssArtComponent = ({ label }) => (
  <div className="projects-card-icon penney-coin-css-icon" role="img" aria-label={label}>
    <span className="penney-icon-coin coin-back" />
    <span className="penney-icon-coin coin-front" />
    <span className="penney-icon-mark mark-heads" />
    <span className="penney-icon-mark mark-tails" />
    <span className="penney-icon-arrow" />
  </div>
);

/* ---- Engraved line language specimens (brand guide, 2026-09-17) ---- */

export type EngravedTone = 'ink' | 'rose' | 'bronze' | 'violet' | 'teal' | 'indigo';

/** Four-step hatching scale: paper → single hatch → cross hatch → dense cross hatch. */
export const EngravedHatchScale: React.FC<{ label: string; tone?: EngravedTone }> = ({ label, tone = 'ink' }) => (
  <div className={`engraved-art engraved-hatch-scale engraved-tone-${tone}`} role="img" aria-label={label}>
    <span className="engraved-hatch-step step-0" />
    <span className="engraved-hatch-step step-1" />
    <span className="engraved-hatch-step step-2" />
    <span className="engraved-hatch-step step-3" />
  </div>
);

/** Guilloché rosette: three offset ring families rotating slowly, with a double-rule medal. */
export const EngravedRosette: React.FC<{ label: string; tone?: EngravedTone }> = ({ label, tone = 'ink' }) => (
  <div className={`engraved-art engraved-rosette engraved-tone-${tone}`} role="img" aria-label={label}>
    <span className="engraved-rosette-rays" />
    <span className="engraved-rosette-rings" />
    <span className="engraved-rosette-medal" />
    <span className="engraved-rosette-core" />
  </div>
);

/** Eye of Horus drawn only with hatching and double rules. */
export const EngravedEye: React.FC<{ label: string; tone?: EngravedTone }> = ({ label, tone = 'ink' }) => (
  <div className={`engraved-art engraved-eye engraved-tone-${tone}`} role="img" aria-label={label}>
    <span className="engraved-eye-frame" />
    <span className="engraved-eye-brow" />
    <span className="engraved-eye-lid" />
    <span className="engraved-eye-white">
      <span className="engraved-eye-iris" />
    </span>
    <span className="engraved-eye-tail" />
    <span className="engraved-eye-drop" />
    <span className="engraved-eye-stem" />
    <span className="engraved-eye-curl" />
    <span className="engraved-eye-curl-end" />
  </div>
);

/** Banknote-style border: guilloché chain, scalloped inner rule, corner rosettes. */
export const EngravedBorder: React.FC<{ label: string; tone?: EngravedTone }> = ({ label, tone = 'ink' }) => (
  <div className={`engraved-art engraved-border engraved-tone-${tone}`} role="img" aria-label={label}>
    <span className="engraved-border-band top" />
    <span className="engraved-border-band bottom" />
    <span className="engraved-border-corner c1" />
    <span className="engraved-border-corner c2" />
    <span className="engraved-border-corner c3" />
    <span className="engraved-border-corner c4" />
    <span className="engraved-border-golden" />
  </div>
);

/* ---- iGaming section banners (/igaming, 2026-09-22) ---- */

export type IGamingBannerVariant = 'table' | 'chips' | 'loop' | 'ledger';

const IGAMING_BANNER_TONE: Record<IGamingBannerVariant, EngravedTone> = {
  table: 'ink',
  chips: 'bronze',
  loop: 'teal',
  ledger: 'indigo',
};

/**
 * 16:5 engraved plate for one /igaming section. The subject sits on the golden
 * point; each variant carries one maths motif (37-pocket wheel, φ-scaled chips,
 * lemniscate loop, Fibonacci ledger). Tone comes from the engraved-line inks.
 */
export const IGamingEngravedBanner: React.FC<{ label: string; variant: IGamingBannerVariant }> = ({ label, variant }) => (
  <div
    className={`engraved-art engraved-igaming is-${variant} engraved-tone-${IGAMING_BANNER_TONE[variant]}`}
    role="img"
    aria-label={label}
  >
    <span className="engraved-ig-strip" />
    <span className="engraved-ig-golden" />
    <span className="engraved-ig-rays" />
    <span className="engraved-ig-guilloche" />
    {variant === 'table' ? (
      <>
        <span className="engraved-ig-ring r1" />
        <span className="engraved-ig-wheel" />
        <span className="engraved-ig-wheel-bowl" />
        <span className="engraved-ig-wheel-orbit" />
        <span className="engraved-ig-wheel-hub" />
      </>
    ) : null}
    {variant === 'chips' ? (
      <>
        <span className="engraved-ig-chip s1" />
        <span className="engraved-ig-chip s2" />
        <span className="engraved-ig-chip s3" />
        <span className="engraved-ig-chip main" />
        <span className="engraved-ig-spark k1" />
        <span className="engraved-ig-spark k2" />
        <span className="engraved-ig-spark k3" />
      </>
    ) : null}
    {variant === 'loop' ? (
      <>
        <span className="engraved-ig-loop-inner left" />
        <span className="engraved-ig-loop-inner right" />
        <span className="engraved-ig-loop left" />
        <span className="engraved-ig-loop right" />
        <span className="engraved-ig-loop-rule left" />
        <span className="engraved-ig-loop-rule right" />
        <span className="engraved-ig-runner left" />
        <span className="engraved-ig-runner right" />
        <span className="engraved-ig-knot" />
      </>
    ) : null}
    {variant === 'ledger' ? (
      <>
        <span className="engraved-ig-ledger" />
        <span className="engraved-ig-bar b1" />
        <span className="engraved-ig-bar b2" />
        <span className="engraved-ig-bar b3" />
        <span className="engraved-ig-bar b4" />
        <span className="engraved-ig-bar b5" />
        <span className="engraved-ig-trend" />
        <span className="engraved-ig-baseline" />
      </>
    ) : null}
  </div>
);

export const IGamingTableBanner: CssArtComponent = ({ label }) => <IGamingEngravedBanner label={label} variant="table" />;
export const IGamingChipsBanner: CssArtComponent = ({ label }) => <IGamingEngravedBanner label={label} variant="chips" />;
export const IGamingLoopBanner: CssArtComponent = ({ label }) => <IGamingEngravedBanner label={label} variant="loop" />;
export const IGamingLedgerBanner: CssArtComponent = ({ label }) => <IGamingEngravedBanner label={label} variant="ledger" />;

/* ---- /igaming "game floor" card art (2026-09-22) ---- */

export type IGamingFloorVariant = 'slots' | 'live' | 'rng' | 'sports' | 'fishing' | 'lottery';

const IGAMING_FLOOR_TONE: Record<IGamingFloorVariant, EngravedTone> = {
  slots: 'bronze',
  live: 'ink',
  rng: 'indigo',
  sports: 'teal',
  fishing: 'teal',
  lottery: 'rose',
};

/** 16:9 engraved card art for one game type on the /igaming floor, each with one small loop. */
export const IGamingFloorArt: React.FC<{ label: string; variant: IGamingFloorVariant }> = ({ label, variant }) => (
  <div
    className={`engraved-art engraved-floor is-${variant} engraved-tone-${IGAMING_FLOOR_TONE[variant]}`}
    role="img"
    aria-label={label}
  >
    <span className="engraved-ig-rays" />
    <span className="engraved-ig-guilloche" />
    {variant === 'slots' ? (
      <>
        <span className="engraved-fl-cabinet" />
        <span className="engraved-fl-reel r1" />
        <span className="engraved-fl-reel r2" />
        <span className="engraved-fl-reel r3" />
        <span className="engraved-fl-payline" />
      </>
    ) : null}
    {variant === 'live' ? (
      <>
        <span className="engraved-fl-felt" />
        <span className="engraved-fl-card back" />
        <span className="engraved-fl-card face" />
      </>
    ) : null}
    {variant === 'rng' ? (
      <>
        <span className="engraved-fl-die d1" />
        <span className="engraved-fl-die d2" />
      </>
    ) : null}
    {variant === 'sports' ? (
      <>
        <span className="engraved-fl-pitch" />
        <span className="engraved-fl-shadow" />
        <span className="engraved-fl-ball" />
      </>
    ) : null}
    {variant === 'fishing' ? (
      <>
        <span className="engraved-fl-fish f1" />
        <span className="engraved-fl-fish f2" />
        <span className="engraved-fl-fish f3" />
        <span className="engraved-fl-reticle" />
      </>
    ) : null}
    {variant === 'lottery' ? (
      <>
        <span className="engraved-fl-crash" />
        <span className="engraved-fl-lotto l1" />
        <span className="engraved-fl-lotto l2" />
        <span className="engraved-fl-lotto l3" />
        <span className="engraved-fl-lotto l4" />
      </>
    ) : null}
  </div>
);

export const IGamingSlotsArt: CssArtComponent = ({ label }) => <IGamingFloorArt label={label} variant="slots" />;
export const IGamingLiveArt: CssArtComponent = ({ label }) => <IGamingFloorArt label={label} variant="live" />;
export const IGamingRngArt: CssArtComponent = ({ label }) => <IGamingFloorArt label={label} variant="rng" />;
export const IGamingSportsArt: CssArtComponent = ({ label }) => <IGamingFloorArt label={label} variant="sports" />;
export const IGamingFishingArt: CssArtComponent = ({ label }) => <IGamingFloorArt label={label} variant="fishing" />;
export const IGamingLotteryArt: CssArtComponent = ({ label }) => <IGamingFloorArt label={label} variant="lottery" />;
