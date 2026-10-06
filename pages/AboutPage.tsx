import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls, joinBasePath, type Language, type Theme, type ThemePreference } from '../app/shared';
import { ABOUT_EMAIL, ABOUT_LINKEDIN, ABOUT_PAGE } from '../components/about-content';

export const AboutPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const href = (path: string) => joinBasePath(baseUrl, path.replace(/^\//, ''));
  const { closing } = ABOUT_PAGE;

  return (
    <div className="page-shell about-page min-h-screen">
      <div className="about-topbar">
        <a href={homeHref} className="about-back-link inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} />
          {isZh ? '返回主页' : 'Back to Home'}
        </a>
        <HeaderControls
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      </div>

      <main className="about-main">
        <header className="about-hero">
          <p className="about-kicker">{ABOUT_PAGE.kicker[language]}</p>
          <h1 className="about-title">{ABOUT_PAGE.title[language]}</h1>
          <p className="about-lede">{ABOUT_PAGE.lede[language]}</p>
        </header>

        {ABOUT_PAGE.sections.map((section) => (
          <section key={section.id} id={section.id} className="about-section" aria-labelledby={`about-${section.id}`}>
            <p className="about-label">{section.label[language]}</p>
            <h2 id={`about-${section.id}`}>{section.title[language]}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.en} className="about-paragraph">{paragraph[language]}</p>
            ))}
            {'pull' in section && section.pull ? (
              <blockquote className="about-pull">{section.pull[language]}</blockquote>
            ) : null}
            {'links' in section && section.links ? (
              <ul className="about-links">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <a href={href(link.path)} className="about-link">
                      <strong>{link.name[language]}</strong>
                      <span>{link.text[language]}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="about-section about-closing" aria-labelledby="about-closing">
          <p className="about-label">{closing.label[language]}</p>
          <h2 id="about-closing">{closing.title[language]}</h2>
          <p className="about-paragraph">{closing.body[language]}</p>
          <div className="about-actions">
            <a className="about-button" href={`mailto:${ABOUT_EMAIL}`}>{closing.email[language]}</a>
            <a className="about-text-cta" href={ABOUT_LINKEDIN} target="_blank" rel="noreferrer">{closing.linkedin[language]} <span aria-hidden>›</span></a>
            <a className="about-text-cta" href={href('/notes')}>{closing.notes[language]} <span aria-hidden>›</span></a>
            <a className="about-text-cta" href={href('/project')}>{closing.projects[language]} <span aria-hidden>›</span></a>
          </div>
        </section>
      </main>
    </div>
  );
};
