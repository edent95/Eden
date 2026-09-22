import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IGAMING_PAGE, IGAMING_SUMMARY, type IGamingLocalized } from './igaming-content';
import { IGAMING_CASES, IGAMING_CASES_INDEX, type CaseBlock, type IGamingCase } from './igaming-cases-content';
import { IGamingEngravedBanner, IGamingHeroPlate, IGamingSeal } from './css-art/index';

type Lang = 'en' | 'zh';

/**
 * `/igaming/cases` (index) and `/igaming/cases/:slug` (one field note).
 * Same engraved print language as `/igaming`; copy and anonymisation rules live in
 * `igaming-cases-content.ts`. These pages are the only part of the iGaming cluster
 * that links to a past project (`/etreporthub`), by the owner's decision.
 */
const IGamingCasesPage: React.FC<{
  language: Lang;
  caseSlug?: string;
  igamingHref: string;
  casesHref: string;
  fullHref: string;
  etReportHubHref: string;
  controls: React.ReactNode;
}> = ({ language, caseSlug, igamingHref, casesHref, fullHref, etReportHubHref, controls }) => {
  const t = (value: IGamingLocalized) => value[language];
  const index = IGAMING_CASES_INDEX;
  const study = caseSlug ? IGAMING_CASES.find((item) => item.slug === caseSlug) : undefined;

  const nav = (href: string, label: IGamingLocalized) => (
    <nav className="project-home-nav" aria-label="Primary navigation">
      <a href={href} className="project-home-back igaming-back">
        <ArrowLeft size={16} aria-hidden="true" />
        {t(label)}
      </a>
      {controls}
    </nav>
  );

  const block = (item: CaseBlock, key: number) => {
    switch (item.kind) {
      case 'h':
        return <h2 key={key}>{t(item.text)}</h2>;
      case 'p':
        return <p key={key} className="igaming-sublead">{t(item.text)}</p>;
      case 'callout':
        return (
          <aside key={key} className="igaming-callout">
            <strong>{t(item.title)}</strong>
            <p>{t(item.body)}</p>
          </aside>
        );
      case 'path':
        return (
          <ol key={key} className="igaming-path">
            {item.steps.map((step) => <li key={step.en}>{t(step)}</li>)}
          </ol>
        );
      case 'chain':
        return (
          <ol key={key} className="igaming-chain">
            {item.items.map((entry) => (
              <li key={entry.title.en}>
                <strong>{t(entry.title)}</strong>
                <p>{t(entry.body)}</p>
              </li>
            ))}
          </ol>
        );
      case 'cards':
        return (
          <ul key={key} className="igaming-grid is-three is-compact">
            {item.items.map((entry) => (
              <li key={entry.title.en}>
                <h4>{t(entry.title)}</h4>
                <p>{t(entry.body)}</p>
              </li>
            ))}
          </ul>
        );
      case 'table':
        return (
          <div key={key} className="igaming-table-scroll">
            <table className="igaming-metrics">
              <thead>
                <tr>{item.head.map((cell) => <th key={cell.en} scope="col">{t(cell)}</th>)}</tr>
              </thead>
              <tbody>
                {item.rows.map(([rowHead, ...cells]) => (
                  <tr key={rowHead.en}>
                    <th scope="row">{t(rowHead)}</th>
                    {cells.map((cell) => <td key={cell.en}>{t(cell)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'list':
        return (
          <ul key={key} className="igaming-list">
            {item.items.map((entry) => <li key={entry.en}>{t(entry)}</li>)}
          </ul>
        );
      case 'stat':
        return (
          <div key={key} className="igaming-case-stat">
            <strong>{item.value}</strong>
            <p className="igaming-case-stat-label">{t(item.label)}</p>
            <p className="igaming-case-stat-note">{t(item.note)}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const caseCard = (item: IGamingCase) => (
    <a key={item.slug} className="igaming-case-card" href={`${casesHref}/${item.slug}`}>
      <span className="igaming-case-card-banner">
        <IGamingEngravedBanner variant={item.banner} label={t(IGAMING_PAGE.bannerLabels[item.fullSection])} />
      </span>
      <span className="igaming-case-card-number">{t(index.caseLabel)} {item.number}</span>
      <h2>{t(item.shortTitle)}</h2>
      <span className="igaming-case-card-line">{t(item.standfirst)}</span>
      <span className="igaming-case-tags">
        {item.tags.map((tag) => <span key={tag.en}>{t(tag)}</span>)}
      </span>
      <span className="igaming-point-more">
        {t(index.readCase)} <span aria-hidden="true">→</span>
      </span>
    </a>
  );

  if (!study) {
    return (
      <div className={`igaming-page igaming-summary${language === 'zh' ? ' is-zh' : ''}`}>
        {nav(igamingHref, index.backToIgaming)}
        <main className="igaming-main">
          <header className="igaming-hero">
            <IGamingHeroPlate />
            <p className="igaming-kicker">{t(index.kicker)}</p>
            <h1>{t(index.claim)}</h1>
            <p className="igaming-standfirst">{t(index.standfirst)}</p>
          </header>

          <aside className="igaming-callout igaming-case-rule">
            <strong>{t(index.rule.title)}</strong>
            <p>{t(index.rule.body)}</p>
          </aside>

          <div className="igaming-case-grid">{IGAMING_CASES.map(caseCard)}</div>

          <aside className="igaming-full-panel">
            <h2>{t(index.moreTitle)}</h2>
            <p>{t(index.moreBody)}</p>
            <a href={fullHref} className="igaming-full-cta">
              {t(IGAMING_SUMMARY.openFull)}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </aside>

          <section className="igaming-closing" aria-labelledby="igaming-closing">
            <div className="igaming-seal"><IGamingSeal label={t(IGAMING_PAGE.sealLabel)} /></div>
            <h2 id="igaming-closing">{t(IGAMING_PAGE.closingTitle)}</h2>
            <p>{t(IGAMING_PAGE.closingBody)}</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={`igaming-page igaming-case${language === 'zh' ? ' is-zh' : ''}`}>
      {nav(casesHref, { en: 'Back to field notes', zh: '返回案例列表' })}
      <main className="igaming-main">
        <header className="igaming-hero is-case">
          <IGamingHeroPlate />
          <p className="igaming-kicker">{t(index.caseLabel)} {study.number} · {t(index.kicker)}</p>
          <h1>{t(study.title)}</h1>
          <p className="igaming-standfirst">{t(study.standfirst)}</p>
          <span className="igaming-case-tags">
            {study.tags.map((tag) => <span key={tag.en}>{t(tag)}</span>)}
          </span>
        </header>

        <div className="igaming-banner">
          <IGamingEngravedBanner variant={study.banner} label={t(IGAMING_PAGE.bannerLabels[study.fullSection])} />
        </div>

        <aside className="igaming-callout igaming-case-rule">
          <strong>{language === 'zh' ? '匿名说明' : 'Anonymisation'}</strong>
          <p>{t(study.anonymisation)}</p>
        </aside>

        <section className="igaming-section igaming-case-body">
          {study.blocks.map(block)}

          <h2>{language === 'zh' ? '我从这个案例学到的' : 'What this case taught me'}</h2>
          <ul className="igaming-case-lessons">
            {study.lessons.map((lesson) => <li key={lesson.en}>{t(lesson)}</li>)}
          </ul>

          <aside className="igaming-callout is-limits">
            <strong>{language === 'zh' ? '这个案例不能证明什么' : 'What this case does not prove'}</strong>
            <p>{t(study.limits)}</p>
          </aside>
        </section>

        <aside className="igaming-full-panel">
          <h2>{language === 'zh' ? '继续读下去' : 'Keep reading'}</h2>
          <p>
            {language === 'zh'
              ? '这个案例背后的行业背景，在入门包完整版对应的一节里。'
              : 'The industry background behind this case sits in the matching section of the full starter pack.'}
          </p>
          <div className="igaming-case-links">
            <a href={`${fullHref}#${study.fullSection}`} className="igaming-full-cta">
              {language === 'zh' ? '看对应那一节' : 'Read that section'}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            {study.related?.map((link) => (
              <a key={link.href} href={etReportHubHref} className="igaming-point-more">
                {t(link.label)} <span aria-hidden="true">→</span>
              </a>
            ))}
            <a href={casesHref} className="igaming-point-more">
              {language === 'zh' ? '看其他案例' : 'Other field notes'} <span aria-hidden="true">→</span>
            </a>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default IGamingCasesPage;
