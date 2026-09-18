import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import {
  MIYA_PRIVACY,
  MIYA_SUPPORT_EMAIL,
  type MiyaBlock,
  type MiyaLocalized,
} from './miya-privacy-content';

type Lang = 'en' | 'zh';

/** Render the tiny inline markup used in `miya-privacy-content.ts`: `**bold**` and `` `code` ``. */
const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
      return <React.Fragment key={index}>{part}</React.Fragment>;
    })}
  </>
);

const Block: React.FC<{ block: MiyaBlock; language: Lang }> = ({ block, language }) => {
  const t = (value: MiyaLocalized) => value[language];
  switch (block.kind) {
    case 'p':
      return <p><Inline text={t(block.text)} /></p>;
    case 'h3':
      return <h3>{t(block.text)}</h3>;
    case 'ul':
      return <ul>{block.items.map((item) => <li key={item.en}><Inline text={t(item)} /></li>)}</ul>;
    case 'table':
      return (
        <div className="miya-privacy-table-scroll">
          <table>
            <thead><tr><th scope="col">{t(block.head[0])}</th><th scope="col">{t(block.head[1])}</th></tr></thead>
            <tbody>
              {block.rows.map(([category, use]) => (
                <tr key={category.en}><td>{t(category)}</td><td>{t(use)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
};

const MiyaMark: React.FC = () => (
  <svg className="miya-privacy-mark-icon" width="30" height="30" viewBox="0 0 26 26" aria-hidden="true">
    <rect width="26" height="26" rx="6" fill="currentColor" />
    <path d="M13 19.4c-.3 0-.5-.1-.7-.3l-4.6-4.4c-1.5-1.5-1.5-3.9 0-5.3 1.4-1.3 3.6-1.2 5 .2l.3.3.3-.3c1.4-1.4 3.6-1.5 5-.2 1.5 1.4 1.5 3.8 0 5.3l-4.6 4.4c-.2.2-.4.3-.7.3z" fill="#ffffff" />
  </svg>
);

/**
 * `/project/miya` — MiYa (iOS) privacy policy and support page.
 * The same copy is prerendered as static HTML (see `seo-static-content.ts`), so
 * App Store Review can read it without JavaScript.
 */
const MiyaPrivacyPage: React.FC<{
  language: Lang;
  projectsHref: string;
  controls: React.ReactNode;
}> = ({ language, projectsHref, controls }) => {
  const isZh = language === 'zh';
  const t = (value: MiyaLocalized) => value[language];
  const page = MIYA_PRIVACY;

  return (
    <div className="page-shell miya-privacy-page">
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={projectsHref} className="project-home-back inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} />
          {isZh ? '全部作品' : 'All projects'}
        </a>
        {controls}
      </nav>

      <main className="miya-privacy-main" lang={isZh ? 'zh-Hans' : 'en'}>
        <header className="miya-privacy-hero">
          <div className="miya-privacy-mark">
            <MiyaMark />
            <span className="miya-privacy-mark-name">MiYa</span>
            <span className="miya-privacy-mark-kind">iOS</span>
          </div>
          <p className="miya-privacy-kicker">{t(page.kicker)}</p>
          <h1>{t(page.title)}</h1>
          <p className="miya-privacy-standfirst">{t(page.standfirst)}</p>
          <dl className="miya-privacy-meta">
            {page.meta.map((item) => (
              <div key={item.label.en}><dt>{t(item.label)}</dt><dd>{t(item.value)}</dd></div>
            ))}
          </dl>
          <a className="miya-privacy-support-link" href={`#${page.contact.id}`}>
            <Mail size={16} aria-hidden="true" />
            {t(page.supportCta)}
          </a>
        </header>

        <div className="miya-privacy-claim">
          <p>{t(page.claim)}</p>
          <p className="miya-privacy-claim-fine">{t(page.claimFine)}</p>
        </div>

        <figure className="miya-privacy-flow-figure">
          <ol className="miya-privacy-flow" aria-label={t(page.flowTitle)}>
            {page.flow.map((node) => (
              <li key={node.label.en} className={node.stop ? 'is-stop' : undefined}>
                <span className="miya-privacy-flow-label">{t(node.label)}</span>
                <span className="miya-privacy-flow-note">{t(node.note)}</span>
              </li>
            ))}
          </ol>
          <figcaption>{t(page.flowCaption)}</figcaption>
        </figure>

        {page.sections.map((section) => (
          <section key={section.id} id={section.id} className="miya-privacy-section">
            <h2>{t(section.title)}</h2>
            {section.blocks.map((block, index) => <Block key={index} block={block} language={language} />)}
          </section>
        ))}

        <section id={page.contact.id} className="miya-privacy-section miya-privacy-contact">
          <h2>{t(page.contact.title)}</h2>
          <p>{t(page.contact.intro)}</p>
          <a className="miya-privacy-email" href={`mailto:${MIYA_SUPPORT_EMAIL}`}>
            <Mail size={18} aria-hidden="true" />
            {MIYA_SUPPORT_EMAIL}
          </a>
          <dl className="miya-privacy-contact-list">
            {page.contact.details.map((item) => (
              <div key={item.label.en}>
                <dt>{t(item.label)}</dt>
                <dd>{item.href ? <a href={item.href}>{t(item.value)}</a> : t(item.value)}</dd>
              </div>
            ))}
          </dl>
          <p className="miya-privacy-footnote">{t(page.contact.footer)}</p>
        </section>
      </main>
    </div>
  );
};

export default MiyaPrivacyPage;
