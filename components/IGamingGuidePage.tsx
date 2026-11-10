import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IGAMING_PAGE, type IGamingLocalized } from './igaming-content';
import { IGAMING_GUIDE_LABELS as labels, type IGamingGuide } from './igaming-guides-content';
import { renderIGamingBlock } from './igaming-blocks';
import { IGamingEngravedBanner, IGamingHeroPlate } from './css-art/index';

type Lang = 'en' | 'zh';

/**
 * One `/igaming/<guide>` explainer. Same engraved print language and block
 * renderer as the field notes; copy lives in `igaming-guides-content.ts`.
 * Order is fixed: answer → plain words → body → checklist → limits → sources → onward links.
 */
const IGamingGuidePage: React.FC<{
  language: Lang;
  guide: IGamingGuide;
  /** Every guide with its href; the current one is filtered out for “More guides”. */
  guideLinks: Array<{ guide: IGamingGuide; href: string }>;
  igamingHref: string;
  fullHref: string;
  casesHref: string;
  controls: React.ReactNode;
}> = ({ language, guide, guideLinks, igamingHref, fullHref, casesHref, controls }) => {
  const t = (value: IGamingLocalized) => value[language];

  return (
    <div className={`igaming-page igaming-case igaming-guide${language === 'zh' ? ' is-zh' : ''}`}>
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={igamingHref} className="project-home-back igaming-back">
          <ArrowLeft size={16} aria-hidden="true" />
          {t(labels.backToIgaming)}
        </a>
        {controls}
      </nav>
      <main className="igaming-main">
        <header className="igaming-hero is-case">
          <IGamingHeroPlate />
          <p className="igaming-kicker">{t(labels.kicker)}</p>
          <h1>{t(guide.title)}</h1>
          <p className="igaming-standfirst">{t(guide.standfirst)}</p>
          <span className="igaming-case-tags">
            {guide.tags.map((tag) => <span key={tag.en}>{t(tag)}</span>)}
          </span>
        </header>

        <aside className="igaming-callout igaming-case-rule">
          <p>{t(guide.answer)}</p>
        </aside>

        <section className="igaming-plain" aria-labelledby="igaming-plain-title">
          <h2 id="igaming-plain-title" className="igaming-plain-kicker">{t(labels.plainKicker)}</h2>
          <p className="igaming-plain-scene">{t(guide.plain.scene)}</p>
          <dl className="igaming-plain-terms">
            <div className="igaming-plain-head" aria-hidden="true">
              <span>{t(labels.plainTermHead)}</span>
              <span>{t(labels.plainEverydayHead)}</span>
            </div>
            {guide.plain.terms.map((row) => (
              <div key={row.term.en}>
                <dt>{t(row.term)}</dt>
                <dd>{t(row.everyday)}</dd>
              </div>
            ))}
          </dl>
          <p className="igaming-plain-takeaway">{t(guide.plain.takeaway)}</p>
        </section>

        <div className="igaming-banner">
          <IGamingEngravedBanner variant={guide.banner} label={t(IGAMING_PAGE.bannerLabels[guide.fullSection])} />
        </div>

        <section className="igaming-section igaming-case-body">
          {guide.blocks.map((item, key) => renderIGamingBlock(item, key, t))}

          <h2>{t(labels.checklistTitle)}</h2>
          <ul className="igaming-case-lessons">
            {guide.checklist.map((item) => <li key={item.en}>{t(item)}</li>)}
          </ul>

          <aside className="igaming-callout is-limits">
            <strong>{t(labels.limitsTitle)}</strong>
            <p>{t(guide.limits)}</p>
          </aside>

          <h2 id="references">{t(labels.sourcesTitle)}</h2>
          <p className="igaming-guide-sources-note">{t(labels.sourcesNote)}</p>
          <ol className="igaming-guide-sources">
            {guide.sources.map((source, index) => (
              <li key={source.url} id={`reference-${index + 1}`}>
                <span className="igaming-guide-source-number">[{index + 1}]</span>
                <span className="igaming-guide-source-entry">
                  {language === 'zh' ? (
                    <>
                      {source.publisher}. <cite>{source.title}</cite>[EB/OL]. {source.year === 'n.d.' ? '' : `${source.year}`}[{t(labels.sourcesAccessed)}].{' '}
                    </>
                  ) : (
                    <>
                      {source.publisher}, “<cite>{source.title}</cite>,” {source.year}. [Online]. Available:{' '}
                    </>
                  )}
                  <a href={source.url} target="_blank" rel="noopener">{source.url}</a>
                  {language === 'zh' ? '' : ` [Accessed: ${t(labels.sourcesAccessed)}].`}
                </span>
                <span className="igaming-guide-source-supports">{t(source.supports)}</span>
              </li>
            ))}
          </ol>
        </section>

        <aside className="igaming-full-panel">
          <h2>{t(labels.keepReading)}</h2>
          <p>{t(labels.keepReadingBody)}</p>
          <div className="igaming-case-links">
            <a href={`${fullHref}#${guide.fullSection}`} className="igaming-full-cta">
              {t(labels.readSection)}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={casesHref} className="igaming-point-more">
              {t(labels.readCases)} <span aria-hidden="true">→</span>
            </a>
          </div>
          <h3>{t(labels.moreGuides)}</h3>
          <div className="igaming-case-links">
            {guideLinks
              .filter((entry) => entry.guide.path !== guide.path)
              .map(({ guide: other, href }) => (
                <a key={other.path} href={href} className="igaming-point-more">
                  {t(other.shortTitle)} <span aria-hidden="true">→</span>
                </a>
              ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default IGamingGuidePage;
