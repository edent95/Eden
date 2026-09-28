import React from 'react';
import type { Language } from '../app/shared';

// Shared reading layer for every Notes article (essays under /notes/:slug and
// published Wiki notes). It adds the "Notes format" motion: a reading progress
// bar, a section map whose marker slides to the section being read, scroll
// reveals, key-sentence highlighter sweeps, and a recap checklist. Everything is
// driven by classes on concrete objects; CSS lives in styles/pages/notes.css and
// switches off under prefers-reduced-motion.

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Marks `.notes-reveal` elements inside `rootRef` with `is-in` once they scroll into
 * view, and returns the index of the `[data-note-section]` currently being read.
 */
export const useNotesReading = (rootRef: React.RefObject<HTMLElement | null>, resetKey: string) => {
  const [active, setActive] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const revealables = Array.prototype.slice.call(root.querySelectorAll('.notes-reveal')) as HTMLElement[];
    if (!('IntersectionObserver' in window) || reduceMotion()) {
      revealables.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    // Hide only after JS is known to run, so content is never stuck invisible.
    root.classList.add('notes-motion-ready');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    revealables.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove('notes-motion-ready');
    };
  }, [rootRef, resetKey]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const sections = Array.prototype.slice.call(root.querySelectorAll('[data-note-section]')) as HTMLElement[];
    let frame = 0;
    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      const line = window.innerHeight * 0.4;
      let current = -1;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= line) current = index;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [rootRef, resetKey]);

  return { active, progress };
};

export const NotesReadingBar: React.FC<{
  titles: string[];
  active: number;
  progress: number;
  language: Language;
  sectionId: (index: number) => string;
}> = ({ titles, active, progress, language, sectionId }) => {
  const isZh = language === 'zh';
  const shown = active >= 0;
  const current = shown ? titles[active] : '';
  return (
    <div className={`notes-readbar${shown ? ' is-shown' : ''}`} aria-hidden={!shown}>
      <div className="notes-readbar-track"><i style={{ transform: `scaleX(${progress})` }} /></div>
      <div className="notes-readbar-row">
        <span className="notes-readbar-count">
          {String(Math.max(active, 0) + 1).padStart(2, '0')}
          <em> / {String(titles.length).padStart(2, '0')}</em>
        </span>
        <span className="notes-readbar-title" key={current}>{current}</span>
        <nav className="notes-readbar-dots" aria-label={isZh ? '本文章节' : 'Sections'}>
          {titles.map((title, index) => (
            <a
              key={title}
              href={`#${sectionId(index)}`}
              className={index === active ? 'is-active' : index < active ? 'is-done' : ''}
              aria-label={title}
              tabIndex={shown ? 0 : -1}
            />
          ))}
          <span
            className="notes-readbar-marker"
            style={{ transform: `translateX(calc(${Math.max(active, 0)} * var(--notes-dot-step)))` }}
          />
        </nav>
      </div>
    </div>
  );
};

export const NotesRecap: React.FC<{ titles: string[]; language: Language; sectionId: (index: number) => string }> = ({
  titles,
  language,
  sectionId,
}) => (
  <section className="notes-recap notes-reveal" aria-label={language === 'zh' ? '本文要点' : 'What you just read'}>
    <p className="notes-recap-kicker">{language === 'zh' ? '你刚读完' : 'What you just read'}</p>
    <ol>
      {titles.map((title, index) => (
        <li key={title} style={{ '--i': index } as React.CSSProperties}>
          <span className="notes-recap-tick" aria-hidden>✓</span>
          <a href={`#${sectionId(index)}`}>{title}</a>
        </li>
      ))}
    </ol>
  </section>
);

/** Splits `==key sentence==` markers out of a paragraph; other text goes through `renderRest`. */
export const renderKeySentences = (
  text: string,
  renderRest: (part: string, keyPrefix: string) => React.ReactNode,
): React.ReactNode[] =>
  text.split(/(==[^=]+==)/g).filter(Boolean).map((part, index) => {
    const match = part.match(/^==([^=]+)==$/);
    if (match) {
      return <mark key={`key-${index}`} className="notes-key">{renderRest(match[1], `k${index}`)}</mark>;
    }
    return <React.Fragment key={`t-${index}`}>{renderRest(part, `t${index}`)}</React.Fragment>;
  });
