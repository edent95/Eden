import React from 'react';
import type { Language } from '../app/shared';
import { NotesStoryFrame, type NotesStoryMotif } from './css-art/index';

// Notes format · storyboard. An optional per-article strip that retells the
// sections as scenes: each section's key point is classified (method / documented /
// overturned / no evidence / verdict), given a one-line story beat, and drawn as
// an engraved frame (styles/css-art/notes-storyboard.css). One large stage plays
// the selected frame; thumbnails below pick a frame; while reading, the stage
// follows the section being read.

export type NotesStoryKind = 'method' | 'fact' | 'overturned' | 'gap' | 'verdict';

export type NotesStoryFrameData = {
  motif: NotesStoryMotif;
  kind: NotesStoryKind;
  beat: Record<Language, string>;
};

const KIND_LABEL: Record<NotesStoryKind, Record<Language, string>> = {
  method: { en: 'Method', zh: '方法' },
  fact: { en: 'Documented', zh: '有文件' },
  overturned: { en: 'Overturned', zh: '被推翻' },
  gap: { en: 'No evidence', zh: '没有证据' },
  verdict: { en: 'Verdict', zh: '结论' },
};

/** The section's ==key sentence==, with citation / link tokens reduced to plain text. */
export const extractKeySentence = (paragraphs: string[]): string => {
  for (const paragraph of paragraphs) {
    const match = paragraph.match(/==([^=]+)==/);
    if (match) {
      return match[1]
        .replace(/\[\[note:[^|\]]+\|([^\]]+)\]\]/g, '$1')
        .replace(/\[\[\d+\]\]/g, '')
        .trim();
    }
  }
  return '';
};

export const NotesStoryboard: React.FC<{
  frames: NotesStoryFrameData[];
  titles: string[];
  keySentences: string[];
  active: number;
  language: Language;
  sectionId: (index: number) => string;
}> = ({ frames, titles, keySentences, active, language, sectionId }) => {
  const isZh = language === 'zh';
  const [picked, setPicked] = React.useState<number | null>(null);
  const [playing, setPlaying] = React.useState(false);

  // Reading takes over again as soon as the reader moves to another section.
  React.useEffect(() => { setPicked(null); }, [active]);

  const shown = picked ?? (active >= 0 && active < frames.length ? active : 0);

  // Replay the scene's action each time the shown frame changes (state-driven, not autoplay).
  React.useEffect(() => {
    setPlaying(false);
    const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(() => setPlaying(true)));
    return () => window.cancelAnimationFrame(frame);
  }, [shown]);

  const frame = frames[shown];
  if (!frame) return null;
  const count = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="notes-sb notes-reveal" aria-label={isZh ? '本文分镜' : 'Storyboard'}>
      <div className="notes-sb-head">
        <span className="notes-sb-kicker">{isZh ? '本文分镜' : 'Storyboard'}</span>
        <span className="notes-sb-count">{count(shown + 1)}<em> / {count(frames.length)}</em></span>
      </div>

      <div className="notes-sb-stage">
        <NotesStoryFrame key={shown} motif={frame.motif} label={frame.beat[language]} active={playing} stage />
      </div>

      <div className="notes-sb-caption" key={`cap-${shown}`}>
        <p className="notes-sb-meta">
          <span className={`notes-sb-kind kind-${frame.kind}`}>{KIND_LABEL[frame.kind][language]}</span>
          <b>{titles[shown]}</b>
        </p>
        <p className="notes-sb-beat">{frame.beat[language]}</p>
        {keySentences[shown] && <p className="notes-sb-key"><mark className="notes-key">{keySentences[shown]}</mark></p>}
        <a className="notes-sb-jump" href={`#${sectionId(shown)}`}>{isZh ? '读这一节' : 'Read this section'} <span aria-hidden>↓</span></a>
      </div>

      <ol className="notes-sb-strip">
        {frames.map((item, index) => (
          <li key={`${item.motif}-${index}`}>
            <button
              type="button"
              className={index === shown ? 'is-shown' : ''}
              aria-pressed={index === shown}
              aria-label={`${count(index + 1)} ${titles[index]}`}
              onClick={() => setPicked(index)}
            >
              <NotesStoryFrame motif={item.motif} label="" thumb />
              <span className="notes-sb-thumb-label">
                <i className={`kind-${item.kind}`} aria-hidden />
                {count(index + 1)}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
};
