import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  IGAMING_PAGE,
  IGAMING_UNLOCK_PARAM,
  IGAMING_UNLOCK_VALUE,
  type IGamingCallout,
  type IGamingCard,
  type IGamingFlow,
  type IGamingLocalized,
  type IGamingPath,
  type IGamingTable,
  type IGamingTerm,
} from './igaming-content';
import { IGamingEngravedBanner, IGamingFloorArt } from './css-art/index';

type Lang = 'en' | 'zh';

/**
 * `/igaming` — an iGaming starter pack: roles, game floor, terms, money flow,
 * provider and operator promotions, Eden's reporting / campaign / CRM workflow,
 * the daily-report metrics, the B2B side, and symptom-first troubleshooting. The homepage Mini Coin Slot links here after a
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
          {item.art ? (
            <div className="igaming-card-art">
              <IGamingFloorArt variant={item.art.key} label={t(item.art.label)} />
            </div>
          ) : null}
          <h4>{t(item.title)}</h4>
          <p>{t(item.body)}</p>
          {item.note ? <small>{t(item.note)}</small> : null}
        </li>
      ))}
    </ul>
  );

  const flow = (item: IGamingFlow) => (
    <div key={item.id} className={`igaming-flow is-${item.id}`}>
      <div className="igaming-flow-head">
        <h3>{t(item.title)}</h3>
        <span>{t(item.when)}</span>
      </div>
      <ol>
        {item.steps.map((step, index) => (
          <li key={step.title.en}>
            <span className="igaming-step-index">{index + 1}</span>
            <h4>{t(step.title)}</h4>
            <p>{t(step.body)}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  const chain = (items: IGamingCard[]) => (
    <ol className="igaming-chain">
      {items.map((item) => (
        <li key={item.title.en}>
          <strong>{t(item.title)}</strong>
          <p>{t(item.body)}</p>
        </li>
      ))}
    </ol>
  );

  const callout = (item: IGamingCallout) => (
    <aside className="igaming-callout">
      <strong>{t(item.title)}</strong>
      <p>{t(item.body)}</p>
    </aside>
  );

  const terms = (items: IGamingTerm[]) => (
    <dl className="igaming-terms">
      {items.map((item) => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{t(item.body)}</dd>
        </div>
      ))}
    </dl>
  );

  const table = (data: IGamingTable) => (
    <div className="igaming-table-scroll">
      <table className="igaming-metrics">
        <thead>
          <tr>
            {data.head.map((cell) => <th key={cell.en} scope="col">{t(cell)}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.rows.map(([rowHead, ...cells]) => (
            <tr key={rowHead.en}>
              <th scope="row">{t(rowHead)}</th>
              {cells.map((cell) => <td key={cell.en}>{t(cell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const path = (steps: IGamingLocalized[]) => (
    <ol className="igaming-path">
      {steps.map((step) => <li key={step.en}>{t(step)}</li>)}
    </ol>
  );

  const paths = (items: IGamingPath[]) => (
    <ul className="igaming-grid is-two is-paths">
      {items.map((item) => (
        <li key={item.title.en}>
          <h4>{t(item.title)}</h4>
          {path(item.steps)}
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

          <h3>{t(page.journeyTitle)}</h3>
          {chain(page.journey)}
          {callout(page.journeyNote)}

          <h3>{t(page.termsTitle)}</h3>
          <p className="igaming-sublead">{t(page.termsLead)}</p>
          {terms(page.terms)}

          <h3>{t(page.moneyTitle)}</h3>
          {chain(page.money)}
          {callout(page.moneyNote)}

          <h3>{t(page.riskTitle)}</h3>
          <p className="igaming-sublead">{t(page.riskLead)}</p>
          {cards(page.risk, 'igaming-grid is-three is-risk')}

          <h3>{t(page.firstMonthTitle)}</h3>
          <p className="igaming-sublead">{t(page.firstMonthLead)}</p>
          {table(page.firstMonth)}
          {callout(page.newcomerRule)}
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

          {page.flows.map(flow)}
        </section>

        <section className="igaming-section" id="reporting" aria-labelledby="igaming-reporting">
          <div className="igaming-banner"><IGamingEngravedBanner variant="ledger" label={t(page.bannerLabels.reporting)} /></div>
          <h2 id="igaming-reporting">{t(page.reportingTitle)}</h2>
          <p className="igaming-lead">{t(page.reportingLead)}</p>

          {table({
            head: [page.metricsHead.name, page.metricsHead.definition, page.metricsHead.why],
            rows: page.metrics.map((metric) => [metric.name, metric.definition, metric.why]),
          })}
          {callout(page.reportingNote)}

          <h3>{t(page.trapsTitle)}</h3>
          {cards(page.traps, 'igaming-grid is-two is-traps')}
        </section>

        <section className="igaming-section" id="b2b" aria-labelledby="igaming-b2b">
          <div className="igaming-banner"><IGamingEngravedBanner variant="gears" label={t(page.bannerLabels.b2b)} /></div>
          <h2 id="igaming-b2b">{t(page.b2bTitle)}</h2>
          <p className="igaming-lead">{t(page.b2bLead)}</p>

          <h3>{t(page.b2bMapTitle)}</h3>
          {cards(page.b2bMap, 'igaming-grid is-three')}

          {flow(page.dealFlow)}
          {callout(page.dealNote)}

          <h3>{t(page.stakeholdersTitle)}</h3>
          <p className="igaming-sublead">{t(page.stakeholdersLead)}</p>
          {table(page.stakeholders)}

          <h3>{t(page.qualifyTitle)}</h3>
          <p className="igaming-sublead">{t(page.qualifyLead)}</p>
          {cards(page.qualify, 'igaming-grid is-three is-compact')}

          <h3>{t(page.commercialTitle)}</h3>
          <p className="igaming-sublead">{t(page.commercialLead)}</p>
          {cards(page.commercialModels, 'igaming-grid is-three is-compact')}

          <h3>{t(page.contractTitle)}</h3>
          {cards(page.contract, 'igaming-grid is-three is-compact')}

          {flow(page.integrationFlow)}

          <h3>{t(page.providerOpsTitle)}</h3>
          {cards(page.providerOps, 'igaming-grid is-three is-compact')}

          <h3>{t(page.aggregatorOpsTitle)}</h3>
          <p className="igaming-sublead">{t(page.aggregatorOpsLead)}</p>
          {cards(page.aggregatorOps, 'igaming-grid is-three is-compact')}

          {callout(page.sponsorNote)}
          {flow(page.providerCampaignFlow)}

          <h3>{t(page.growthTitle)}</h3>
          <p className="igaming-sublead">{t(page.growthLead)}</p>
          {chain(page.pipeline)}
          {cards(page.accountWork, 'igaming-grid is-three is-compact')}

          <h3>{t(page.b2bScoreTitle)}</h3>
          <p className="igaming-sublead">{t(page.b2bScoreLead)}</p>
          {cards(page.b2bScore, 'igaming-grid is-three is-compact')}

          <h3>{t(page.techTitle)}</h3>
          <p className="igaming-sublead">{t(page.techLead)}</p>
          {terms(page.techTerms)}

          {flow(page.incidentFlow)}
          {callout(page.incidentNote)}

          <h3>{t(page.mistakesTitle)}</h3>
          <ul className="igaming-list">
            {page.mistakes.map((item) => <li key={item.en}>{t(item)}</li>)}
          </ul>

          <h3>{t(page.firstQuarterTitle)}</h3>
          <p className="igaming-sublead">{t(page.firstQuarterLead)}</p>
          {table(page.firstQuarter)}
          {callout(page.b2bRule)}
        </section>

        <section className="igaming-section" id="troubleshooting" aria-labelledby="igaming-troubleshooting">
          <div className="igaming-banner"><IGamingEngravedBanner variant="compass" label={t(page.bannerLabels.troubleshooting)} /></div>
          <h2 id="igaming-troubleshooting">{t(page.troubleshootingTitle)}</h2>
          <p className="igaming-lead">{t(page.troubleshootingLead)}</p>

          <h3>{t(page.graphTitle)}</h3>
          <p className="igaming-sublead">{t(page.graphLead)}</p>
          {path(page.funnel)}
          <dl className="igaming-terms is-relations">
            {page.ftdRelations.map((item) => (
              <div key={item.label.en}>
                <dt>{t(item.label)}</dt>
                <dd>{t(item.body)}</dd>
              </div>
            ))}
          </dl>

          <h3>{t(page.symptomsTitle)}</h3>
          {paths(page.symptoms)}

          <h3>{t(page.playbooksTitle)}</h3>
          {paths(page.playbooks)}

          <h3>{t(page.ownersTitle)}</h3>
          {table(page.owners)}
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
