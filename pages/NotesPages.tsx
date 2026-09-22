/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls, joinBasePath, resolveAssetPath } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { publishedNotes } from './published-notes';

type SiteEssayNote = {
  slug: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  category: Record<Language, string>;
  thesis: Record<Language, string>;
  sources: string[];
  sections: Array<{
    title: Record<Language, string>;
    paragraphs: Record<Language, string[]>;
  }>;
  // Optional link back to the full original source page (served from public/).
  originalSource?: { url: string; label: Record<Language, string> };
  // Optional reference list. Paragraphs may embed [[n]] tokens that link to the
  // matching reference id, and each reference renders a ↩ backlink to that spot.
  references?: Array<{ id: string; url: string; label: Record<Language, string> }>;
  // Optional note shown under the references. Falls back to a generic line.
  referencesNote?: Record<Language, string>;
};

export const NotesPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';

  return (
    <div className="page-shell notes-page min-h-screen">
      <main className="notes-main">
        <div className="notes-island">
          <div className="notes-topbar">
            <a href={homeHref} className="notes-back-link">
              <ArrowLeft size={17} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection
              compactLanguageOnSelection
            />
          </div>

          <header className="notes-hero">
            <p className="notes-eyebrow">Notes by Eden</p>
            <h1>{isZh ? '一些值得留下来的想法' : 'Ideas worth keeping around'}</h1>
            <p className="notes-intro">
              {isZh
                ? '这里放我发布的文章、build notes，还有那些做着做着才想明白的东西。关于 product、AI、人的行为，以及怎样把混乱慢慢变成 system。'
                : 'Published essays, build notes, and the things I only understood after making them. About products, AI, human behavior, and turning messy realities into systems.'}
            </p>
          </header>

          <section className="notes-index" aria-labelledby="notes-index-title">
            <div className="notes-index-heading">
              <h2 id="notes-index-title">{isZh ? '已发布' : 'Published'}</h2>
              <span>{publishedNotes.length.toString().padStart(2, '0')}</span>
            </div>
            <div className="notes-list">
              {publishedNotes.map((note) => (
                <a key={note.href} className="notes-entry" href={joinBasePath(baseUrl, note.href)}>
                  <span className="notes-entry-category">{note.category[language]}</span>
                  <div>
                    <h3>{note.title[language]}</h3>
                    <p>{note.summary[language]}</p>
                  </div>
                  <span className="notes-entry-arrow" aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Split an essay paragraph on inline tokens and render each one:
//   [[n]]                     → a superscript citation that jumps to reference n
//                               (and carries an id so the reference can link back).
//   [[note:slug|display]]     → an internal link to another note (/notes/<slug>).
// Plain text segments are returned unchanged.
const renderEssayParagraph = (
  text: string,
  slug: string,
  language: Language,
  baseUrl: string,
  seenCites: Set<string>,
): React.ReactNode[] =>
  text.split(/(\[\[(?:note:[^\]]+|\d+)\]\])/g).map((part, index) => {
    const citeMatch = part.match(/^\[\[(\d+)\]\]$/);
    if (citeMatch) {
      const refId = citeMatch[1];
      // A reference may be cited more than once; only the first occurrence carries
      // the anchor id so ids stay unique and the reference's ↩ lands on first mention.
      const isFirst = !seenCites.has(refId);
      if (isFirst) seenCites.add(refId);
      return (
        <sup key={`cite-${index}`} className="notes-cite" {...(isFirst ? { id: `cite-${slug}-${refId}` } : {})}>
          <a href={`#ref-${slug}-${refId}`} aria-label={language === 'zh' ? `参考资料 ${refId}` : `Reference ${refId}`}>{refId}</a>
        </sup>
      );
    }
    const linkMatch = part.match(/^\[\[note:([^|\]]+)\|([^\]]+)\]\]$/);
    if (linkMatch) {
      const [, targetSlug, label] = linkMatch;
      return (
        <a key={`link-${index}`} className="notes-inline-link" href={joinBasePath(baseUrl, `notes/${targetSlug}`)}>{label}</a>
      );
    }
    return part;
  });

export const SiteEssayNotePage: React.FC<{
  note: SiteEssayNote;
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ note, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const notesHref = joinBasePath(baseUrl, 'notes');
  // Tracks which reference numbers have been rendered, so repeated citations don't
  // emit duplicate anchor ids. Fresh per render (and per language switch).
  const citeSeen = new Set<string>();

  return (
    <div className="page-shell notes-article-page min-h-screen">
      <main className="notes-article-main">
        <div className="notes-article-island">
          <div className="notes-topbar">
            <a href={notesHref} className="notes-back-link">
              <ArrowLeft size={17} />
              {isZh ? '返回 Notes' : 'Back to Notes'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection
              compactLanguageOnSelection
            />
          </div>

          <header className="notes-article-hero">
            <div className="notes-article-mark notes-essay-mark" aria-hidden>ET</div>
            <p className="notes-eyebrow">{note.category[language]}</p>
            <h1>{note.title[language]}</h1>
            <p className="notes-article-deck">{note.summary[language]}</p>
            <div className="notes-article-sources" aria-label={isZh ? '来源书目' : 'Source books'}>
              {note.sources.map((source) => <span key={source}>{source}</span>)}
            </div>
            {note.originalSource && (
              <a
                className="notes-source-original"
                href={resolveAssetPath(baseUrl, note.originalSource.url)}
                target="_blank"
                rel="noopener"
              >
                {note.originalSource.label[language]}
                <span aria-hidden> ↗</span>
              </a>
            )}
          </header>

          <article className="notes-article-body">
            <blockquote className="notes-article-thesis">
              <span>Core thesis</span>
              <p>{note.thesis[language]}</p>
            </blockquote>
            <div className="notes-article-sections">
              {note.sections.map((section, index) => (
                <section key={section.title.en} className="notes-article-section">
                  <div className="notes-article-section-number">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h2>{section.title[language]}</h2>
                    <div className="notes-article-points">
                      {section.paragraphs[language].map((paragraph) => <p key={paragraph}>{renderEssayParagraph(paragraph, note.slug, language, baseUrl, citeSeen)}</p>)}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </article>

          {note.references && note.references.length > 0 && (
            <section className="notes-article-references" aria-label={isZh ? '参考资料' : 'References'}>
              <h2>{isZh ? '参考资料' : 'References'}</h2>
              <ol>
                {note.references.map((ref) => (
                  <li key={ref.id} id={`ref-${note.slug}-${ref.id}`}>
                    <span className="notes-ref-body">
                      {ref.label[language]}{' '}
                      <a className="notes-ref-link" href={ref.url} target="_blank" rel="noopener">{isZh ? '查看来源' : 'Source'} ↗</a>
                    </span>
                    <a className="notes-ref-back" href={`#cite-${note.slug}-${ref.id}`} aria-label={isZh ? '返回正文' : 'Back to text'}>↩</a>
                  </li>
                ))}
              </ol>
              <p className="notes-ref-note">
                {note.referencesNote
                  ? note.referencesNote[language]
                  : (isZh
                    ? '以上是文章「事实」部分的来源；文中的判断与推演仅代表作者个人观点。'
                    : 'These are the sources for the factual claims; any judgments and extrapolations are the author\'s own view.')}
              </p>
            </section>
          )}

          <footer className="notes-article-footer">
            <p>{isZh ? '继续阅读 Eden 的文章与 build notes' : "Keep reading Eden's essays and build notes"}</p>
            <a href={notesHref}>{isZh ? '回到全部 Notes' : 'View all Notes'} <span aria-hidden>→</span></a>
          </footer>
        </div>
      </main>
    </div>
  );
};
