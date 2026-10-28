import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IGAMING_RESUME, type ResumeHref } from './igaming-resume-content';
import type { IGamingLocalized } from './igaming-content';
import { IGamingSeal } from './css-art/index';
import { IGamingBannerStage, IGamingHeroStage } from './css-art/igaming-hero-stage';
import { KaleidoFrame } from './css-art/kaleido-frame';
import { kaleidoSpecFor } from '../app/kaleido-routes';

type Lang = 'en' | 'zh';

/**
 * `/igaming/resume` — the recruiter-facing page: positioning, the published
 * figures with links to their cases, three strengths, a capability map, a
 * 90-day new-market plan and how Eden works. Reuses the key-points page's
 * engraved print language (`.igaming-summary`); its own layout lives under
 * `.igaming-resume` in `styles/pages/igaming.css`. Copy: `igaming-resume-content.ts`.
 */
const IGamingResumePage: React.FC<{
  language: Lang;
  igamingHref: string;
  fullHref: string;
  casesHref: string;
  etReportHubHref: string;
  controls: React.ReactNode;
}> = ({ language, igamingHref, fullHref, casesHref, etReportHubHref, controls }) => {
  const t = (value: IGamingLocalized) => value[language];
  const page = IGAMING_RESUME;
  const hrefFor = (href: ResumeHref) => {
    if (href === 'etreporthub') return etReportHubHref;
    if (href.startsWith('case:')) return `${casesHref}/${href.slice('case:'.length)}`;
    return `${fullHref}#${href.slice('full:'.length)}`;
  };

  return (
    <div className={`igaming-page igaming-summary igaming-resume${language === 'zh' ? ' is-zh' : ''}`}>
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={igamingHref} className="project-home-back igaming-back">
          <ArrowLeft size={16} aria-hidden="true" />
          {t(page.back)}
        </a>
        {controls}
      </nav>

      <main className="igaming-main">
        <header className="igaming-hero">
          <IGamingHeroStage />
          <KaleidoFrame spec={kaleidoSpecFor('/igaming/resume')} />
          <p className="igaming-kicker">{t(page.kicker)}</p>
          <h1>{t(page.claim)}</h1>
          <p className="igaming-standfirst">{t(page.standfirst)}</p>
          <p className="igaming-resume-difference">{t(page.difference)}</p>
        </header>

        <section className="igaming-resume-proof" aria-labelledby="igaming-resume-proof">
          <h2 id="igaming-resume-proof" className="igaming-resume-label">{t(page.proofTitle)}</h2>
          <ul>
            {page.proof.map((item) => (
              <li key={item.value}>
                <a href={hrefFor(item.href)}>
                  <strong>{item.value}</strong>
                  <span>{t(item.label)}</span>
                  <small>{t(item.note)}</small>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <h2 className="igaming-resume-label igaming-resume-heading">{t(page.strengthsTitle)}</h2>
        <div className="igaming-points igaming-resume-strengths">
          {page.strengths.map((item) => (
            <section key={item.number} className="igaming-point" aria-labelledby={`igaming-resume-${item.number}`}>
              <KaleidoFrame spec={kaleidoSpecFor(`/igaming/resume/${item.number}`)} />
              <div className="igaming-point-banner">
                <IGamingBannerStage variant={item.banner} label={t(item.title)} hoverRoot=".igaming-point" />
              </div>
              <p className="igaming-point-number">{item.number}</p>
              <h2 id={`igaming-resume-${item.number}`}>{t(item.title)}</h2>
              <p className="igaming-point-line">{t(item.line)}</p>
              <ol className="igaming-point-list">
                {item.points.map((point) => (
                  <li key={point.title.en}>
                    <strong>{t(point.title)}</strong>
                    <p>{t(point.body)}</p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <section className="igaming-resume-block" aria-labelledby="igaming-resume-map">
          <h2 id="igaming-resume-map">{t(page.mapTitle)}</h2>
          <p className="igaming-resume-lead">{t(page.mapLine)}</p>
          <div className="igaming-table-scroll">
            <table className="igaming-metrics igaming-resume-map">
              <thead>
                <tr>
                  {page.mapHead.map((cell) => <th key={cell.en} scope="col">{t(cell)}</th>)}
                </tr>
              </thead>
              <tbody>
                {page.map.map((row) => (
                  <tr key={row.area.en}>
                    <th scope="row">{t(row.area)}</th>
                    <td>{t(row.value)}</td>
                    <td><a href={hrefFor(row.href)}>{t(row.evidence)} <span aria-hidden="true">→</span></a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="igaming-resume-block" aria-labelledby="igaming-resume-plan">
          <h2 id="igaming-resume-plan">{t(page.planTitle)}</h2>
          <p className="igaming-resume-lead">{t(page.planLine)}</p>
          <ol className="igaming-resume-plan">
            {page.plan.map((step) => (
              <li key={step.phase.en}>
                <p className="igaming-resume-phase">{t(step.phase)}</p>
                <h3>{t(step.title)}</h3>
                <ul>
                  {step.items.map((entry) => <li key={entry.en}>{t(entry)}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="igaming-resume-block" aria-labelledby="igaming-resume-work">
          <h2 id="igaming-resume-work">{t(page.workTitle)}</h2>
          <ul className="igaming-resume-work">
            {page.work.map((item) => (
              <li key={item.title.en}>
                <strong>{t(item.title)}</strong>
                <p>{t(item.body)}</p>
              </li>
            ))}
          </ul>
          <p className="igaming-resume-note">{t(page.confidentiality)}</p>
        </section>

        <section className="igaming-closing" aria-labelledby="igaming-resume-closing">
          <div className="igaming-seal"><IGamingSeal label={t(page.sealLabel)} /></div>
          <h2 id="igaming-resume-closing">{t(page.closingTitle)}</h2>
          <p>{t(page.closingBody)}</p>
          <div className="igaming-case-links">
            <a href={igamingHref} className="igaming-full-cta">
              {t(page.openStarter)}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={casesHref} className="igaming-point-more">
              {t(page.openCases)} <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IGamingResumePage;
