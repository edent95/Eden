import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  IGAMING_PAGE,
  IGAMING_SUMMARY,
  IGAMING_UNLOCK_PARAM,
  IGAMING_UNLOCK_VALUE,
  type IGamingLocalized,
} from './igaming-content';
import { IGamingEngravedBanner, IGamingHeroPlate, IGamingSeal } from './css-art/index';

type Lang = 'en' | 'zh';

/**
 * `/igaming` — the key-points version of the iGaming starter pack: six sections,
 * three points each, and a way into the matching section of the full page
 * (`/igaming/full`) for readers who want the detail. The homepage Mini Coin Slot
 * links here after a visitor's tenth round. Same engraved print language as the
 * full page; copy lives in `igaming-content.ts` and is prerendered too.
 */
const IGamingSummaryPage: React.FC<{
  language: Lang;
  homeHref: string;
  fullHref: string;
  controls: React.ReactNode;
}> = ({ language, homeHref, fullHref, controls }) => {
  const t = (value: IGamingLocalized) => value[language];
  const page = IGAMING_SUMMARY;
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    setUnlocked(new URLSearchParams(window.location.search).get(IGAMING_UNLOCK_PARAM) === IGAMING_UNLOCK_VALUE);
  }, []);

  return (
    <div className={`igaming-page igaming-summary${language === 'zh' ? ' is-zh' : ''}`}>
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={homeHref} className="project-home-back igaming-back">
          <ArrowLeft size={16} aria-hidden="true" />
          {t(page.back)}
        </a>
        {controls}
      </nav>

      <main className="igaming-main">
        <header className="igaming-hero">
          <IGamingHeroPlate />
          {unlocked ? <p className="igaming-unlocked">{t(IGAMING_PAGE.unlocked)}</p> : null}
          <p className="igaming-kicker">{t(page.kicker)}</p>
          <h1>{t(page.claim)}</h1>
          <p className="igaming-standfirst">{t(page.standfirst)}</p>
          <nav className="igaming-toc" aria-label={language === 'zh' ? '本页目录' : 'On this page'}>
            {page.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                <span>{section.number}</span>
                {t(section.title)}
              </a>
            ))}
          </nav>
          <a href={fullHref} className="igaming-full-cta">
            {t(page.openFull)}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </header>

        <div className="igaming-points">
          {page.sections.map((section) => (
            <section key={section.id} id={section.id} className="igaming-point" aria-labelledby={`igaming-point-${section.id}`}>
              <div className="igaming-point-banner">
                <IGamingEngravedBanner variant={section.banner} label={t(IGAMING_PAGE.bannerLabels[section.id])} />
              </div>
              <p className="igaming-point-number">{section.number}</p>
              <h2 id={`igaming-point-${section.id}`}>{t(section.title)}</h2>
              <p className="igaming-point-line">{t(section.line)}</p>
              <ol className="igaming-point-list">
                {section.points.map((point) => (
                  <li key={point.title.en}>
                    <strong>{t(point.title)}</strong>
                    <p>{t(point.body)}</p>
                  </li>
                ))}
              </ol>
              <a className="igaming-point-more" href={`${fullHref}#${section.id}`}>
                {t(page.readSection)} <span aria-hidden="true">→</span>
              </a>
            </section>
          ))}
        </div>

        <aside className="igaming-full-panel">
          <h2>{t(page.fullTitle)}</h2>
          <p>{t(page.fullBody)}</p>
          <a href={fullHref} className="igaming-full-cta">
            {t(page.openFull)}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </aside>

        <section className="igaming-closing" aria-labelledby="igaming-closing">
          <div className="igaming-seal"><IGamingSeal label={t(IGAMING_PAGE.sealLabel)} /></div>
          <h2 id="igaming-closing">{t(page.closingTitle)}</h2>
          <p>{t(page.closingBody)}</p>
        </section>
      </main>
    </div>
  );
};

export default IGamingSummaryPage;
