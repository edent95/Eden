/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { HeaderControls, joinBasePath } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import {
  WikiBackgroundMusicCssIcon,
  WikiButtonFeedbackCssIcon,
  WikiFirebaseStorageCssIcon,
  WikiRagFlowCssIcon,
  WikiSkillsCssIcon,
  WikiViteCssIcon,
} from '../components/css-art/index';
import type { CssArtComponent } from '../components/css-art/index';
import { wikiEntries } from '../generated/content';
import { publishedNotes } from './published-notes';

type WikiEntry = (typeof wikiEntries)[number];

export const getWikiToneClassName = (slug: WikiEntry['slug']) => `wiki-tone wiki-tone-${slug}`;

const wikiCssIconBySlug: Record<WikiEntry['slug'], CssArtComponent> = {
  vite: WikiViteCssIcon,
  'background-music': WikiBackgroundMusicCssIcon,
  'button-feedback': WikiButtonFeedbackCssIcon,
  'firebase-lifetime-storage': WikiFirebaseStorageCssIcon,
  skills: WikiSkillsCssIcon,
  'rag-flow': WikiRagFlowCssIcon,
};

export const WikiEntryVisual: React.FC<{
  entry: WikiEntry;
  language: Language;
  variant?: 'card' | 'note';
}> = ({ entry, language, variant = 'card' }) => {
  const Icon = wikiCssIconBySlug[entry.slug];
  const baseClassName = variant === 'note' ? 'poker-wiki-note-visual' : 'poker-wiki-visual';

  return (
    <span className={`${baseClassName} poker-wiki-css-icon`}>
      <Icon label={entry.title[language]} />
    </span>
  );
};

type SkillDraft = {
  id: string;
  sourceSlug: string;
  title: string;
  trigger: string;
  reusableRule: string;
  procedure: string[];
  checks: string[];
  sourceProject: string;
  antiPatterns: string[];
  sources: string[];
  tags: string[];
  status: 'draft' | 'reviewed' | 'active' | 'retired' | 'superseded';
  createdAt: string;
};

const SKILL_DRAFTS_STORAGE_KEY = 'eden-wiki-skill-drafts';

const readStoredSkillDrafts = (): SkillDraft[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SKILL_DRAFTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStoredSkillDrafts = (drafts: SkillDraft[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SKILL_DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    // ignore local persistence failures
  }
};

const wikiSkillTagsBySlug: Record<string, string[]> = {
  vite: ['Vite', 'React', 'TypeScript', 'Build loop', 'AI workflow'],
  'background-music': ['UX', 'Audio', 'Presence', 'Game feel'],
  'button-feedback': ['UX feedback', 'Microinteraction', 'Realtime UI'],
  'firebase-lifetime-storage': ['Firebase', 'Realtime state', 'Storage', 'Schema'],
  skills: ['Knowledge base', 'Skill design', 'Workflow'],
  'rag-flow': ['RAG', 'Tag registry', 'Knowledge architecture', 'Metadata'],
};

const wikiSourceProjectBySlug: Record<string, string> = {
  vite: 'Jiju / Friday Poker Club / Eden Vite apps',
  'background-music': 'Friday Poker Club',
  'button-feedback': 'Friday Poker Club',
  'firebase-lifetime-storage': 'Friday Poker Club',
  skills: 'Eden Knowledge Base',
  'rag-flow': 'Eden Knowledge Base',
};

const wikiAntiPatternsBySlug: Record<string, Record<Language, string[]>> = {
  vite: {
    en: [
      'Treating Vite dev server success as production proof.',
      'Skipping typecheck because the page appears to work.',
      'Ignoring broken assets or route/base-path issues until deployment.',
    ],
    zh: [
      '把 Vite dev server 正常当成 production 正确证明。',
      '因为页面能跑就跳过 typecheck。',
      '等到部署时才处理 broken assets、route 或 base path 问题。',
    ],
  },
  'background-music': {
    en: [
      'Autoplaying sound without visible control.',
      'Using music as decoration instead of mood support.',
      'Forgetting to remember the user sound preference.',
    ],
    zh: [
      '没有明显控制入口就自动播放声音。',
      '把音乐当装饰，而不是支撑场景气氛。',
      '不记住用户的声音偏好。',
    ],
  },
  'button-feedback': {
    en: [
      'Letting a click feel silent after a realtime action.',
      'Allowing repeated clicks while a remote action is pending.',
      'Showing no accepted, blocked, or failed state after the action.',
    ],
    zh: [
      '实时动作点了之后没有任何反馈。',
      '远端动作 pending 时仍允许用户重复点击。',
      '动作后不显示已接受、被挡住或失败状态。',
    ],
  },
  'firebase-lifetime-storage': {
    en: [
      'Persisting everything without cleanup rules.',
      'Letting game state become scattered flags instead of a schema.',
      'Treating persistence as only a backend concern.',
    ],
    zh: [
      '什么都持久化，但没有 cleanup 规则。',
      '让游戏状态散成一堆 flags，而不是形成 schema。',
      '把持久化只当后端问题，不当产品决策。',
    ],
  },
  skills: {
    en: [
      'Saving notes as skills without trigger, procedure, checks, or source.',
      'Publishing generated skills without user review.',
      'Mixing raw memory with executable instruction.',
    ],
    zh: [
      '把普通笔记直接当 skill 存，缺少触发场景、步骤、检查和来源。',
      'AI 生成后不经 user review 就发布 skill。',
      '把 raw memory 和 executable instruction 混在一起。',
    ],
  },
  'rag-flow': {
    en: [
      'Using a vector database as the source of truth.',
      'Letting tags become uncontrolled hashtags.',
      'Returning RAG answers without source links or metadata filters.',
    ],
    zh: [
      '把 vector database 当成 source of truth。',
      '让 tags 变成不受控的 hashtags。',
      'RAG 回答不带 source links，也不使用 metadata filters。',
    ],
  },
};

const createSkillDraftFromWikiEntry = (entry: WikiEntry, language: Language, sourceHref: string): SkillDraft => {
  const firstSection = entry.sections[0];
  const secondSection = entry.sections[1];
  const procedure = firstSection?.points[language].slice(0, 4) ?? [entry.thesis[language]];
  const checks = secondSection?.points[language].slice(0, 4) ?? [entry.summary[language]];

  return {
    id: `${entry.slug}-${Date.now()}`,
    sourceSlug: entry.slug,
    title: entry.title[language],
    trigger: entry.summary[language],
    reusableRule: entry.thesis[language],
    procedure,
    checks,
    sourceProject: wikiSourceProjectBySlug[entry.slug] ?? 'Eden Knowledge Base',
    antiPatterns: wikiAntiPatternsBySlug[entry.slug]?.[language] ?? [entry.summary[language]],
    sources: [sourceHref],
    tags: wikiSkillTagsBySlug[entry.slug] ?? ['Wiki', 'Reusable skill'],
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
};

export const WikiPage: React.FC<{
  entry?: WikiEntry;
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ entry, homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const wikiHref = joinBasePath(baseUrl, 'wiki');
  const notesHref = joinBasePath(baseUrl, 'notes');
  const isPublishedNote = Boolean(entry && publishedNotes.some((note) => note.href === `wiki/${entry.slug}`));
  const [skillDrafts, setSkillDrafts] = React.useState<SkillDraft[]>(() => readStoredSkillDrafts());
  const latestDraft = entry ? skillDrafts.find((draft) => draft.sourceSlug === entry.slug) : undefined;
  const isSkillsIndex = !entry || entry.slug === 'skills';
  const highlightSections = entry
    ? entry.sections.slice(0, 3).map((section) => ({
        title: section.title[language],
        point: section.points[language][0],
      }))
    : [];

  const handleTurnIntoSkill = () => {
    if (!entry) return;
    const sourceHref = joinBasePath(baseUrl, `wiki/${entry.slug}`);
    const nextDraft = createSkillDraftFromWikiEntry(entry, language, sourceHref);
    const nextDrafts = [nextDraft, ...skillDrafts.filter((draft) => draft.sourceSlug !== entry.slug)];
    setSkillDrafts(nextDrafts);
    writeStoredSkillDrafts(nextDrafts);
  };

  if (entry && isPublishedNote) {
    return (
      <div className={`page-shell notes-article-page ${getWikiToneClassName(entry.slug)} min-h-screen`}>
        <main className="notes-article-main">
          <div className="notes-article-island">
            <div className="notes-topbar">
              <a href={wikiHref} className="notes-back-link">
                <ArrowLeft size={17} />
                {isZh ? '返回知识库' : 'Back to Wiki'}
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
              <div className="notes-article-mark">
                <WikiEntryVisual entry={entry} language={language} variant="note" />
              </div>
              <p className="notes-eyebrow">{entry.eyebrow[language]}</p>
              <h1>{entry.title[language]}</h1>
              <p className="notes-article-deck">{entry.summary[language]}</p>
            </header>

            <article className="notes-article-body">
              <blockquote className="notes-article-thesis">
                <span>{isZh ? 'Core thesis' : 'Core thesis'}</span>
                <p>{entry.thesis[language]}</p>
              </blockquote>

              <div className="notes-article-sections">
                {entry.sections.map((section, index) => (
                  <section key={section.title.en} className="notes-article-section">
                    <div className="notes-article-section-number">{String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <h2>{section.title[language]}</h2>
                      <div className="notes-article-points">
                        {section.points[language].map((point) => <p key={point}>{point}</p>)}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <footer className="notes-article-footer">
              <p>{isZh ? '继续阅读 Eden 的文章与 build notes' : "Keep reading Eden's essays and build notes"}</p>
              <a href={notesHref}>{isZh ? '回到全部 Notes' : 'View all Notes'} <span aria-hidden>→</span></a>
            </footer>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`page-shell wiki-page min-h-screen ${entry ? "etreport-page poker-page poker-wiki-page" : "wiki-index-page"}`}>
      <main className="wiki-main px-5 py-8 md:px-8 md:py-10">
        <div className="wiki-island mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={entry ? wikiHref : homeHref} className="wiki-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {entry ? (isZh ? '返回知识库' : 'Back to Wiki') : (isZh ? '返回首页' : 'Back home')}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="wiki-hero">
            <p className="wiki-eyebrow">{entry ? entry.eyebrow[language] : 'EDEN / WIKI'}</p>
            <h1>{entry ? entry.title[language] : isZh ? <>让经验，<br />成为下一次的起点。</> : <>A little wiser.<br />With every build.</>}</h1>
            <p className="wiki-hero-copy">
              {entry ? entry.summary[language] : isZh
                ? '构建时遇到的问题，解决后留下的方法。把散落在项目里的经验，整理成可以反复使用的知识。'
                : 'Problems met while building. Methods kept after solving them. A growing collection of knowledge to carry into the next project.'}
            </p>
            {!entry && <a className="wiki-text-link" href="#wiki-library">{isZh ? '浏览知识库' : 'Explore the library'} <ArrowDownRight size={17} aria-hidden="true" /></a>}
          </header>

          {entry ? (
            <article className={`poker-wiki-note ${getWikiToneClassName(entry.slug)}`}>
              <div className="poker-wiki-note-lead">
                <WikiEntryVisual entry={entry} language={language} variant="note" />
                <div>
                  <p className="etreport-kicker">{isZh ? 'Core thesis' : 'Core thesis'}</p>
                  <blockquote className="wiki-quote-bar">
                    <p>{entry.thesis[language]}</p>
                  </blockquote>
                </div>
              </div>
              <div className="wiki-skill-action">
                <div>
                  <p className="etreport-kicker">{isZh ? 'Skill candidate' : 'Skill candidate'}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {isZh ? '把这篇 note 变成 Skill Card' : 'Turn this note into a Skill Card'}
                  </h3>
                  <p>
                    {isZh
                      ? '生成 draft，先看重点字段，再决定要不要保留。'
                      : 'Create a draft. Review the key fields before keeping it.'}
                  </p>
                </div>
                <button type="button" className="wiki-skill-button" onClick={handleTurnIntoSkill}>
                  {latestDraft ? (isZh ? '重新生成 Skill' : 'Regenerate skill') : isZh ? 'Turn into Skill' : 'Turn into Skill'}
                </button>
              </div>
              {latestDraft && (
                <div className="wiki-skill-preview">
                  <div className="wiki-skill-preview-head">
                    <p className="etreport-kicker">{isZh ? 'Draft Skill Card' : 'Draft Skill Card'}</p>
                    <span>{latestDraft.status}</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-tight">{latestDraft.title}</h3>
                  <div className="wiki-skill-summary-grid">
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '触发场景' : 'Trigger'}</strong>
                      {latestDraft.trigger}
                    </p>
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '可复用规则' : 'Reusable rule'}</strong>
                      {latestDraft.reusableRule ?? entry.thesis[language]}
                    </p>
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '来源项目' : 'Source project'}</strong>
                      {latestDraft.sourceProject ?? wikiSourceProjectBySlug[entry.slug] ?? 'Eden Knowledge Base'}
                    </p>
                  </div>
                  <div className="wiki-skill-preview-grid">
                    <div>
                      <h4>{isZh ? '执行步骤' : 'Procedure'}</h4>
                      <ul>
                        {latestDraft.procedure.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '检查方式' : 'Checks'}</h4>
                      <ul>
                        {latestDraft.checks.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '反模式' : 'Anti-patterns'}</h4>
                      <ul>
                        {(latestDraft.antiPatterns ?? wikiAntiPatternsBySlug[entry.slug]?.[language] ?? []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '来源链接' : 'Sources'}</h4>
                      <ul>
                        {latestDraft.sources.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="wiki-skill-tags">
                    {latestDraft.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="wiki-key-points">
                <p className="etreport-kicker">{isZh ? 'Key points' : 'Key points'}</p>
                <div className="wiki-key-point-grid">
                  {highlightSections.map((section) => (
                    <section key={section.title} className="wiki-key-point-card">
                      <h3 className="font-display text-2xl font-bold tracking-tight">{section.title}</h3>
                      <p>{section.point}</p>
                    </section>
                  ))}
                </div>
              </div>
              <details className="wiki-detail-drawer">
                <summary>{isZh ? '展开完整笔记' : 'Show full note'}</summary>
                <div className="poker-wiki-note-sections">
                  {entry.sections.map((section) => (
                    <section key={section.title.en} className="poker-wiki-note-section">
                      <h3 className="font-display text-2xl font-bold tracking-tight">{section.title[language]}</h3>
                      <ul>
                        {section.points[language].map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </details>
              {isSkillsIndex && skillDrafts.length > 0 && (
                <div className="wiki-skill-library">
                  <p className="etreport-kicker">{isZh ? 'Local skill drafts' : 'Local skill drafts'}</p>
                  <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                    {isZh ? '你已经生成的 Skill Cards。' : 'Skill Cards generated from the wiki.'}
                  </h2>
                  <div className="wiki-skill-library-grid">
                    {skillDrafts.map((draft) => (
                      <article key={draft.id} className="wiki-skill-library-card">
                        <div className="wiki-skill-preview-head">
                          <p>{draft.sourceSlug}</p>
                          <span>{draft.status}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold tracking-tight">{draft.title}</h3>
                        <p><strong>{isZh ? '触发场景：' : 'Trigger: '}</strong>{draft.trigger}</p>
                        <p><strong>{isZh ? '来源项目：' : 'Source project: '}</strong>{draft.sourceProject ?? wikiSourceProjectBySlug[draft.sourceSlug] ?? 'Eden Knowledge Base'}</p>
                        <div className="wiki-skill-tags">
                          {draft.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ) : (
            <section className="wiki-library" id="wiki-library" aria-labelledby="wiki-library-title">
              <div className="wiki-library-heading">
                <h2 id="wiki-library-title">{isZh ? '构建中的知识' : 'Knowledge from the work'}</h2>
                <span>{String(wikiEntries.length).padStart(2, '0')} {isZh ? '篇笔记' : 'notes'}</span>
              </div>
              <div className="wiki-entry-grid">
                {wikiEntries.map((item, index) => (
                  <a key={item.slug} href={joinBasePath(baseUrl, `wiki/${item.slug}`)} className="wiki-entry">
                    <div className="wiki-entry-meta">
                      <span>{String(index + 1).padStart(2, '0')} / {item.eyebrow[language]}</span>
                      <div className="wiki-entry-icon" aria-hidden="true"><WikiEntryVisual entry={item} language={language} /></div>
                    </div>
                    <h3>{item.title[language]}</h3>
                    <p>{item.summary[language]}</p>
                    <span className="wiki-entry-link">{isZh ? '阅读笔记' : 'Read note'} <ArrowUpRight size={17} aria-hidden="true" /></span>
                  </a>
                ))}
              </div>
              <div className="wiki-colophon">
                <div>
                  <p className="wiki-eyebrow">{isZh ? '持续积累' : 'A growing body of knowledge'}</p>
                  <h2>{isZh ? '做过的事，留下可用的东西。' : 'Keep what the work teaches you.'}</h2>
                </div>
                <div>
                  <p>{isZh
                    ? '每篇笔记保留学到了什么、为什么重要、下次怎么复用。原始资料保持不变，Wiki 由 LLM 持续整理，经过检查的方法再成为可执行的 Skill。'
                    : 'Each note keeps what was learned, why it matters, and how to reuse it. Original sources stay intact; the LLM maintains the wiki. Checked methods can become executable skills.'}</p>
                  <div className="wiki-footer-links">
                    <a className="wiki-text-link" href={notesHref}>{isZh ? '阅读 Notes' : 'Read Notes'} <ArrowUpRight size={16} aria-hidden="true" /></a>
                    <a className="wiki-text-link" href={joinBasePath(baseUrl, 'project')}>{isZh ? '探索项目' : 'Explore projects'} <ArrowUpRight size={16} aria-hidden="true" /></a>
                  </div>
                </div>
              </div>
              {isSkillsIndex && skillDrafts.length > 0 && (
                <div className="wiki-skill-library">
                  <p className="etreport-kicker">{isZh ? 'Local skill drafts' : 'Local skill drafts'}</p>
                  <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                    {isZh ? '你已经生成的 Skill Cards。' : 'Skill Cards generated from the wiki.'}
                  </h2>
                  <div className="wiki-skill-library-grid">
                    {skillDrafts.map((draft) => (
                      <article key={draft.id} className="wiki-skill-library-card">
                        <div className="wiki-skill-preview-head">
                          <p>{draft.sourceSlug}</p>
                          <span>{draft.status}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold tracking-tight">{draft.title}</h3>
                        <p><strong>{isZh ? '触发场景：' : 'Trigger: '}</strong>{draft.trigger}</p>
                        <p><strong>{isZh ? '来源项目：' : 'Source project: '}</strong>{draft.sourceProject ?? wikiSourceProjectBySlug[draft.sourceSlug] ?? 'Eden Knowledge Base'}</p>
                        <div className="wiki-skill-tags">
                          {draft.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
