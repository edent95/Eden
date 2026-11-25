import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { IGamingLocalized } from './igaming-content';
import { IGAMING_HUB, type IGamingHubHref } from './igaming-hub-content';
import { IGamingHeroStage } from './css-art/igaming-hero-stage';
import { KaleidoFrame } from './css-art/kaleido-frame';
import { kaleidoSpecFor } from '../app/kaleido-routes';
import { asiaIgamingUrl } from '../seo-routes';

type Lang = 'en' | 'zh';

/**
 * `/igaming` — hub page. The starter pack and guides moved to Asia iGaming (asiaigaming.com) on
 * 2026-11-25; this page says so and links to that site, the field notes and the résumé.
 * Same engraved print language as the pages that stayed; copy lives in `igaming-hub-content.ts`
 * and is prerendered from the same object.
 */
const IGamingHubPage: React.FC<{
  language: Lang;
  homeHref: string;
  casesHref: string;
  resumeHref: string;
  controls: React.ReactNode;
}> = ({ language, homeHref, casesHref, resumeHref, controls }) => {
  const t = (value: IGamingLocalized) => value[language];
  const page = IGAMING_HUB;
  const hrefFor = (href: IGamingHubHref) => {
    if (href === 'cases') return casesHref;
    if (href === 'resume') return resumeHref;
    return asiaIgamingUrl(href.slice('asia:'.length), language);
  };

  return (
    <div className={`igaming-page igaming-summary igaming-hub${language === 'zh' ? ' is-zh' : ''}`}>
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={homeHref} className="project-home-back igaming-back">
          <ArrowLeft size={16} aria-hidden="true" />
          {t(page.back)}
        </a>
        {controls}
      </nav>

      <main className="igaming-main">
        <header className="igaming-hero">
          <IGamingHeroStage />
          <KaleidoFrame spec={kaleidoSpecFor('/igaming')} />
          <p className="igaming-kicker">{t(page.kicker)}</p>
          <h1>{t(page.claim)}</h1>
          <p className="igaming-standfirst">{t(page.standfirst)}</p>
          <a href={asiaIgamingUrl('/', language)} className="igaming-full-cta">
            {t(page.openAsia)}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </header>

        {page.sections.map((section) => (
          <aside key={section.id} className="igaming-full-panel" aria-labelledby={`igaming-hub-${section.id}`}>
            <h2 id={`igaming-hub-${section.id}`}>{t(section.title)}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph.en}>{t(paragraph)}</p>)}
            {section.links.length > 0 ? (
              <div className="igaming-case-links">
                {section.links.map((link) => (link.primary ? (
                  <a key={link.href} href={hrefFor(link.href)} className="igaming-full-cta">
                    {t(link.label)}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                ) : (
                  <a key={link.href} href={hrefFor(link.href)} className="igaming-point-more">
                    {t(link.label)} <span aria-hidden="true">→</span>
                  </a>
                )))}
              </div>
            ) : null}
          </aside>
        ))}
      </main>
    </div>
  );
};

export default IGamingHubPage;
