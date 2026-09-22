import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  IGAMING_PAGE,
  IGAMING_UNLOCK_PARAM,
  IGAMING_UNLOCK_VALUE,
  type IGamingLocalized,
} from './igaming-content';

type Lang = 'en' | 'zh';

/**
 * `/igaming` — B2B services page for iGaming operators and aggregators.
 * The homepage Mini Coin Slot links here after a visitor's tenth round; the page is
 * also public and indexed. Copy lives in `igaming-content.ts` and is prerendered too.
 * No contact details and no links to past projects, by the owner's request.
 */
const IGamingPage: React.FC<{
  language: Lang;
  homeHref: string;
  controls: React.ReactNode;
}> = ({ language, homeHref, controls }) => {
  const t = (value: IGamingLocalized) => value[language];
  const page = IGAMING_PAGE;
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    setUnlocked(new URLSearchParams(window.location.search).get(IGAMING_UNLOCK_PARAM) === IGAMING_UNLOCK_VALUE);
  }, []);

  return (
    <div className={`igaming-page${language === 'zh' ? ' is-zh' : ''}`}>
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={homeHref} className="project-home-back igaming-back">
          <ArrowLeft size={16} aria-hidden="true" />
          {t(page.back)}
        </a>
        {controls}
      </nav>

      <main className="igaming-main">
        <header className="igaming-hero">
          {unlocked ? <p className="igaming-unlocked">{t(page.unlocked)}</p> : null}
          <p className="igaming-kicker">{t(page.kicker)}</p>
          <h1>{t(page.claim)}</h1>
          <p className="igaming-standfirst">{t(page.standfirst)}</p>
          <div className="igaming-hero-actions">
            <a className="igaming-text-link" href="#services">
              {t(page.cta)} <span aria-hidden="true">›</span>
            </a>
          </div>
        </header>

        <section className="igaming-section" aria-labelledby="igaming-leaks">
          <h2 id="igaming-leaks">{t(page.leaksTitle)}</h2>
          <ol className="igaming-leaks">
            {page.leaks.map((leak, index) => (
              <li key={leak.title.en}>
                <span className="igaming-leak-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{t(leak.title)}</h3>
                <p>{t(leak.body)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="igaming-section" id="services" aria-labelledby="igaming-services">
          <h2 id="igaming-services">{t(page.servicesTitle)}</h2>
          <div className="igaming-services">
            {page.services.map((service) => (
              <article key={service.id} className={`igaming-service is-${service.id}`}>
                <h3>{t(service.title)}</h3>
                <p>{t(service.body)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="igaming-section" aria-labelledby="igaming-process">
          <h2 id="igaming-process">{t(page.processTitle)}</h2>
          <ol className="igaming-process">
            {page.process.map((item) => (
              <li key={item.step}>
                <span>{item.step}</span>
                <h3>{t(item.title)}</h3>
                <p>{t(item.body)}</p>
              </li>
            ))}
          </ol>
        </section>

      </main>
    </div>
  );
};

export default IGamingPage;
