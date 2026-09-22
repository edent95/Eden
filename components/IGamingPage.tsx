import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  IGAMING_PAGE,
  IGAMING_UNLOCK_PARAM,
  IGAMING_UNLOCK_VALUE,
  type IGamingCard,
  type IGamingLocalized,
} from './igaming-content';
import { IGamingEngravedBanner } from './css-art/index';

type Lang = 'en' | 'zh';

/**
 * `/igaming` — an iGaming starter pack: roles, game floor, terms, money flow,
 * provider and operator promotions, Eden's reporting / campaign / CRM workflow,
 * and the daily-report metrics. The homepage Mini Coin Slot links here after a
 * visitor's tenth round; the page is also public and indexed. Copy lives in
 * `igaming-content.ts` and is prerendered too. No contact details and no links to
 * past projects, by the owner's request.
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

  const cards = (items: IGamingCard[], className: string) => (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.title.en}>
          <h4>{t(item.title)}</h4>
          <p>{t(item.body)}</p>
          {item.note ? <small>{t(item.note)}</small> : null}
        </li>
      ))}
    </ul>
  );

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
          <nav className="igaming-toc" aria-label={language === 'zh' ? '本页目录' : 'On this page'}>
            {page.toc.map((item, index) => (
              <a key={item.id} href={`#${item.id}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {t(item.label)}
              </a>
            ))}
          </nav>
        </header>

        <section className="igaming-section" id="starter" aria-labelledby="igaming-starter">
          <div className="igaming-banner"><IGamingEngravedBanner variant="table" label={t(page.bannerLabels.starter)} /></div>
          <h2 id="igaming-starter">{t(page.starterTitle)}</h2>
          <p className="igaming-lead">{t(page.starterLead)}</p>

          <h3>{t(page.rolesTitle)}</h3>
          {cards(page.roles, 'igaming-grid is-three')}

          <h3>{t(page.floorTitle)}</h3>
          {cards(page.floor, 'igaming-grid is-three is-floor')}

          <h3>{t(page.termsTitle)}</h3>
          <dl className="igaming-terms">
            {page.terms.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{t(item.body)}</dd>
              </div>
            ))}
          </dl>

          <h3>{t(page.moneyTitle)}</h3>
          <ol className="igaming-chain">
            {page.money.map((item) => (
              <li key={item.title.en}>
                <strong>{t(item.title)}</strong>
                <p>{t(item.body)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="igaming-section" id="promotions" aria-labelledby="igaming-promotions">
          <div className="igaming-banner"><IGamingEngravedBanner variant="chips" label={t(page.bannerLabels.promotions)} /></div>
          <h2 id="igaming-promotions">{t(page.promotionsTitle)}</h2>
          <p className="igaming-lead">{t(page.promotionsLead)}</p>

          <h3>{t(page.providerTitle)}</h3>
          {cards(page.providerPromos, 'igaming-grid is-two is-promo')}

          <h3>{t(page.operatorTitle)}</h3>
          {cards(page.operatorPromos, 'igaming-grid is-three is-compact')}
        </section>

        <section className="igaming-section" id="workflow" aria-labelledby="igaming-workflow">
          <div className="igaming-banner"><IGamingEngravedBanner variant="loop" label={t(page.bannerLabels.workflow)} /></div>
          <h2 id="igaming-workflow">{t(page.workflowTitle)}</h2>
          <p className="igaming-lead">{t(page.workflowLead)}</p>

          {page.flows.map((flow) => (
            <div key={flow.id} className={`igaming-flow is-${flow.id}`}>
              <div className="igaming-flow-head">
                <h3>{t(flow.title)}</h3>
                <span>{t(flow.when)}</span>
              </div>
              <ol>
                {flow.steps.map((step, index) => (
                  <li key={step.title.en}>
                    <span className="igaming-step-index">{index + 1}</span>
                    <h4>{t(step.title)}</h4>
                    <p>{t(step.body)}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        <section className="igaming-section" id="reporting" aria-labelledby="igaming-reporting">
          <div className="igaming-banner"><IGamingEngravedBanner variant="ledger" label={t(page.bannerLabels.reporting)} /></div>
          <h2 id="igaming-reporting">{t(page.reportingTitle)}</h2>
          <p className="igaming-lead">{t(page.reportingLead)}</p>

          <div className="igaming-table-scroll">
            <table className="igaming-metrics">
              <thead>
                <tr>
                  <th scope="col">{t(page.metricsHead.name)}</th>
                  <th scope="col">{t(page.metricsHead.definition)}</th>
                  <th scope="col">{t(page.metricsHead.why)}</th>
                </tr>
              </thead>
              <tbody>
                {page.metrics.map((metric) => (
                  <tr key={metric.name.en}>
                    <th scope="row">{t(metric.name)}</th>
                    <td>{t(metric.definition)}</td>
                    <td>{t(metric.why)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>{t(page.trapsTitle)}</h3>
          {cards(page.traps, 'igaming-grid is-two is-traps')}
        </section>

        <section className="igaming-closing" aria-labelledby="igaming-closing">
          <h2 id="igaming-closing">{t(page.closingTitle)}</h2>
          <p>{t(page.closingBody)}</p>
        </section>
      </main>
    </div>
  );
};

export default IGamingPage;
