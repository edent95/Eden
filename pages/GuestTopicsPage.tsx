/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  Bookmark,
  Brain,
  Copy,
  Database,
  GitBranch,
  Layers,
  MessageSquare,
  Plus,
  Search,
  SearchCheck,
  Send,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
} from 'lucide-react';
import { HeaderControls } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';

const GUEST_TOPIC_STORAGE_KEY = 'eden-guest-topic-board';

type GuestTopicEntry = {
  id: string;
  kind: 'topic' | 'comment';
  name: string;
  topic: string;
  message: string;
  createdAt: string;
};

const readStoredGuestTopics = (): GuestTopicEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(GUEST_TOPIC_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is GuestTopicEntry => {
      return (
        item &&
        typeof item.id === 'string' &&
        (item.kind === 'topic' || item.kind === 'comment') &&
        typeof item.name === 'string' &&
        typeof item.topic === 'string' &&
        typeof item.message === 'string' &&
        typeof item.createdAt === 'string'
      );
    });
  } catch {
    return [];
  }
};

const writeStoredGuestTopics = (entries: GuestTopicEntry[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(GUEST_TOPIC_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore storage failures
  }
};

type TopicMarketQuestion = {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  tone: 'mint' | 'amber' | 'blue' | 'pink' | 'violet';
  categoryKey: 'all' | 'llm-wiki' | 'ai-workflow' | 'systems' | 'content' | 'signals';
  category: Record<Language, string>;
  title: Record<Language, string>;
  outcomes: Array<{
    label: Record<Language, string>;
    probability: number;
  }>;
  volume: string;
  cadence?: Record<Language, string>;
};

const topicMarketQuestions: TopicMarketQuestion[] = [
  {
    id: 'wiki-memory-boundary',
    icon: Database,
    tone: 'mint',
    categoryKey: 'llm-wiki',
    category: { en: 'LLM Wiki', zh: 'LLM Wiki' },
    title: {
      en: 'What should an LLM-maintained wiki remember?',
      zh: 'LLM 维护的 wiki 应该记住什么？',
    },
    outcomes: [
      { label: { en: 'Reusable workflows', zh: '可复用流程' }, probability: 82 },
      { label: { en: 'Claims and decisions', zh: '关键判断' }, probability: 74 },
    ],
    volume: '128 answers',
    cadence: { en: 'Weekly', zh: '每周' },
  },
  {
    id: 'workflow-breakpoint',
    icon: GitBranch,
    tone: 'blue',
    categoryKey: 'ai-workflow',
    category: { en: 'AI workflow', zh: 'AI 工作流' },
    title: {
      en: 'Where do AI workflows break first in real projects?',
      zh: 'AI 工作流在真实项目里最先卡在哪里？',
    },
    outcomes: [
      { label: { en: 'Bad context', zh: '上下文太差' }, probability: 68 },
      { label: { en: 'No verification', zh: '没有验证' }, probability: 61 },
    ],
    volume: '94 answers',
  },
  {
    id: 'system-worthy-work',
    icon: Layers,
    tone: 'amber',
    categoryKey: 'systems',
    category: { en: 'Systems', zh: '系统化' },
    title: {
      en: 'Which scattered work should become a reusable system?',
      zh: '哪些散乱工作最应该变成可复用系统？',
    },
    outcomes: [
      { label: { en: 'Repeated reports', zh: '重复报表' }, probability: 89 },
      { label: { en: 'Project handoff', zh: '项目交接' }, probability: 76 },
    ],
    volume: '211 answers',
    cadence: { en: 'NEW', zh: 'NEW' },
  },
  {
    id: 'essay-or-tool',
    icon: Brain,
    tone: 'violet',
    categoryKey: 'content',
    category: { en: 'Content', zh: '内容' },
    title: {
      en: 'Should this idea become an essay, a tool, or a wiki page?',
      zh: '一个想法应该变成文章、工具，还是 wiki page？',
    },
    outcomes: [
      { label: { en: 'Wiki page', zh: 'Wiki page' }, probability: 57 },
      { label: { en: 'Tool', zh: '工具' }, probability: 31 },
    ],
    volume: '76 answers',
  },
  {
    id: 'worth-answering',
    icon: SearchCheck,
    tone: 'pink',
    categoryKey: 'signals',
    category: { en: 'Topic signal', zh: '选题信号' },
    title: {
      en: 'Is this question worth answering publicly?',
      zh: '这个问题值得公开回答吗？',
    },
    outcomes: [
      { label: { en: 'Yes, public answer', zh: '值得公开回答' }, probability: 73 },
      { label: { en: 'Private note only', zh: '只适合私下记录' }, probability: 19 },
    ],
    volume: '52 answers',
  },
  {
    id: 'source-summary',
    icon: MessageSquare,
    tone: 'mint',
    categoryKey: 'llm-wiki',
    category: { en: 'LLM Wiki', zh: 'LLM Wiki' },
    title: {
      en: 'Should raw sources be summarized before synthesis?',
      zh: 'Raw source 需要先 summary 再 synthesis 吗？',
    },
    outcomes: [
      { label: { en: 'Always summarize first', zh: '永远先 summary' }, probability: 64 },
      { label: { en: 'Only for long sources', zh: '长 source 才需要' }, probability: 28 },
    ],
    volume: '37 answers',
  },
  {
    id: 'agent-handoff',
    icon: UserRound,
    tone: 'blue',
    categoryKey: 'ai-workflow',
    category: { en: 'AI workflow', zh: 'AI 工作流' },
    title: {
      en: 'What makes an agent handoff actually useful?',
      zh: '什么样的 agent handoff 才真的有用？',
    },
    outcomes: [
      { label: { en: 'Concrete changed files', zh: '清楚列出改动文件' }, probability: 81 },
      { label: { en: 'Known risks', zh: '明确剩余风险' }, probability: 69 },
    ],
    volume: '143 answers',
    cadence: { en: 'Weekly', zh: '每周' },
  },
  {
    id: 'proof-through-builds',
    icon: TrendingUp,
    tone: 'amber',
    categoryKey: 'signals',
    category: { en: 'Topic signal', zh: '选题信号' },
    title: {
      en: 'Does proof through builds beat a traditional portfolio?',
      zh: '用真实 build 证明，是否比传统 portfolio 更有力？',
    },
    outcomes: [
      { label: { en: 'Yes, stronger signal', zh: '是，更强信号' }, probability: 91 },
      { label: { en: 'Depends on reader', zh: '看受众' }, probability: 22 },
    ],
    volume: '188 answers',
  },
];

const formatGuestTopicDate = (value: string, language: Language) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const GuestTopicsPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [entries, setEntries] = React.useState<GuestTopicEntry[]>(() => readStoredGuestTopics());
  const [activeCategory, setActiveCategory] = React.useState<TopicMarketQuestion['categoryKey']>('llm-wiki');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [guestName, setGuestName] = React.useState('');
  const [newTopic, setNewTopic] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const displayName = guestName.trim() || (isZh ? 'Guest 访客' : 'Guest');
  const storedEntries = entries.slice(0, 6);
  const categoryItems: Array<{ key: TopicMarketQuestion['categoryKey']; label: Record<Language, string> }> = [
    { key: 'all', label: { en: 'All', zh: 'All' } },
    { key: 'llm-wiki', label: { en: 'LLM Wiki', zh: 'LLM Wiki' } },
    { key: 'ai-workflow', label: { en: 'AI Workflow', zh: 'AI 工作流' } },
    { key: 'systems', label: { en: 'Systems', zh: '系统化' } },
    { key: 'content', label: { en: 'Content', zh: '内容' } },
    { key: 'signals', label: { en: 'Signals', zh: '信号' } },
  ];
  const marketNavItems = [
    { key: 'all', label: isZh ? 'Trending' : 'Trending' },
    { key: 'llm-wiki', label: 'LLM Wiki' },
    { key: 'ai-workflow', label: isZh ? 'AI 工作流' : 'AI Workflow' },
    { key: 'systems', label: isZh ? '系统化' : 'Systems' },
    { key: 'content', label: isZh ? '内容' : 'Content' },
    { key: 'signals', label: isZh ? '选题信号' : 'Signals' },
  ] satisfies Array<{ key: TopicMarketQuestion['categoryKey']; label: string }>;
  const filteredQuestions = topicMarketQuestions.filter((item) => {
    const haystack = [
      item.category[language],
      item.title[language],
      ...item.outcomes.map((outcome) => outcome.label[language]),
    ].join(' ').toLowerCase();
    const categoryMatches = activeCategory === 'all' || item.categoryKey === activeCategory;
    const searchMatches = !searchTerm.trim() || haystack.includes(searchTerm.trim().toLowerCase());
    return categoryMatches && searchMatches;
  });
  const activeCategoryLabel = categoryItems.find((item) => item.key === activeCategory)?.label[language] ?? 'All';

  const saveEntries = (nextEntries: GuestTopicEntry[]) => {
    setEntries(nextEntries);
    writeStoredGuestTopics(nextEntries);
  };

  const handleMarketAnswer = (question: TopicMarketQuestion, outcomeLabel: string, side: 'Yes' | 'No') => {
    const nextEntry: GuestTopicEntry = {
      id: `answer-${Date.now()}`,
      kind: 'comment',
      name: displayName,
      topic: question.title[language],
      message: `${outcomeLabel} — ${side}`,
      createdAt: new Date().toISOString(),
    };
    saveEntries([nextEntry, ...entries]);
  };

  const handleCreateTopic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const topic = newTopic.trim();
    if (!topic) return;
    const nextEntry: GuestTopicEntry = {
      id: `topic-${Date.now()}`,
      kind: 'topic',
      name: displayName,
      topic: isZh ? 'Guest 新问题' : 'Guest new question',
      message: topic,
      createdAt: new Date().toISOString(),
    };
    saveEntries([nextEntry, ...entries]);
    setNewTopic('');
  };

  const handleCopyBoard = async () => {
    const summary = entries
      .map((entry) => {
        const label = entry.kind === 'topic' ? 'Topic' : 'Answer';
        return `[${label}] ${entry.topic}\nFrom: ${entry.name}\n${entry.message}`;
      })
      .join('\n\n');
    const fallbackText = summary || (isZh ? '目前还没有本地留言。' : 'No local submissions yet.');
    try {
      await navigator.clipboard.writeText(fallbackText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page-shell topics-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <header className="topics-market-topbar">
        <div className="topics-market-brand">
          <a href={homeHref} className="topics-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
            <span>{isZh ? '主页' : 'Home'}</span>
          </a>
          <strong>Eden Markets</strong>
        </div>
        <label className="topics-market-search">
          <Search size={21} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={isZh ? 'Search topics...' : 'Search topics...'}
          />
        </label>
        <a href="#how-it-works" className="topics-help-link">
          <SearchCheck size={16} />
          {isZh ? 'How it works' : 'How it works'}
        </a>
        <div className="topics-market-actions">
          <a href="#create-topic" className="topics-login-link">{isZh ? 'Guest' : 'Guest'}</a>
          <a href="#create-topic" className="topics-signup-button">{isZh ? 'New Topic' : 'New Topic'}</a>
          <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
        </div>
      </header>

      <nav className="topics-market-nav" aria-label={isZh ? 'Topic categories' : 'Topic categories'}>
        {marketNavItems.map((item, index) => (
          <button
            key={item.key}
            type="button"
            className={activeCategory === item.key ? 'topics-market-nav-active' : ''}
            onClick={() => setActiveCategory(item.key)}
          >
            {index === 0 && <TrendingUp size={16} />}
            {item.label}
          </button>
        ))}
      </nav>

      <main className="topics-market-shell">
        <aside className="topics-market-sidebar" aria-label={isZh ? 'Categories' : 'Categories'}>
          {categoryItems.map((item) => {
            const count = item.key === 'all'
              ? topicMarketQuestions.length
              : topicMarketQuestions.filter((question) => question.categoryKey === item.key).length;
            return (
              <button
                key={item.key}
                type="button"
                className={activeCategory === item.key ? 'topics-sidebar-active' : ''}
                onClick={() => setActiveCategory(item.key)}
              >
                <span>{item.label[language]}</span>
                <strong>{count}</strong>
              </button>
            );
          })}
          <form id="create-topic" className="topics-create-card" onSubmit={handleCreateTopic}>
            <p className="topics-mini-label">{isZh ? 'Guest market' : 'Guest market'}</p>
            <label>
              <span>{isZh ? '名字' : 'Name'}</span>
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder={isZh ? 'Guest' : 'Guest'}
              />
            </label>
            <label>
              <span>{isZh ? '新问题' : 'New question'}</span>
              <textarea
                value={newTopic}
                onChange={(event) => setNewTopic(event.target.value)}
                placeholder={isZh ? '留下一个新的 topic...' : 'Leave a new topic...'}
                rows={4}
              />
            </label>
            <button type="submit">
              <Plus size={16} />
              {isZh ? 'Create' : 'Create'}
            </button>
          </form>
        </aside>

        <section className="topics-market-main" id="topic-market">
          <div className="topics-market-main-head">
            <div>
              <p>{isZh ? 'Markets / Knowledge systems' : 'Markets / Knowledge systems'}</p>
              <h1>{activeCategoryLabel}</h1>
            </div>
            <div className="topics-market-tools" aria-hidden>
              <Search size={22} />
              <SlidersHorizontal size={22} />
              <Bookmark size={22} />
            </div>
          </div>

          <div className="topics-card-grid">
            {filteredQuestions.map((question) => {
              const Icon = question.icon;
              return (
                <article key={question.id} className={`topics-market-card topics-tone-${question.tone}`}>
                  <div className="topics-market-card-head">
                    <span className="topics-market-icon" aria-hidden>
                      <Icon size={25} strokeWidth={2.25} />
                    </span>
                    <h2>{question.title[language]}</h2>
                  </div>
                  <div className="topics-outcome-list">
                    {question.outcomes.map((outcome) => (
                      <div key={outcome.label.en} className="topics-outcome-row">
                        <span className="topics-outcome-label">{outcome.label[language]}</span>
                        <strong>{outcome.probability}%</strong>
                        <button type="button" className="topics-yes-button" onClick={() => handleMarketAnswer(question, outcome.label[language], 'Yes')}>
                          Yes
                        </button>
                        <button type="button" className="topics-no-button" onClick={() => handleMarketAnswer(question, outcome.label[language], 'No')}>
                          No
                        </button>
                      </div>
                    ))}
                  </div>
                  <footer className="topics-market-card-footer">
                    <span>{question.volume}</span>
                    {question.cadence && <span>{question.cadence[language]}</span>}
                    <Bookmark size={18} />
                  </footer>
                </article>
              );
            })}

            <form className="topics-market-card topics-create-market-card" onSubmit={handleCreateTopic}>
              <div className="topics-market-card-head">
                <span className="topics-market-icon" aria-hidden>
                  <Plus size={25} strokeWidth={2.25} />
                </span>
                <h2>{isZh ? '你想让 Eden 回答什么？' : 'What should Eden answer next?'}</h2>
              </div>
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder={isZh ? 'Guest / 你的名字' : 'Guest / your name'}
              />
              <textarea
                value={newTopic}
                onChange={(event) => setNewTopic(event.target.value)}
                placeholder={isZh ? '写一个新问题，或补充你想讨论的 topic。' : 'Write a new question or topic you want to discuss.'}
                rows={5}
              />
              <button type="submit" className="topics-create-market-button">
                <Send size={17} />
                {isZh ? '提交新问题' : 'Submit question'}
              </button>
              <footer className="topics-market-card-footer">
                <span>{isZh ? 'Stored locally' : 'Stored locally'}</span>
                <Bookmark size={18} />
              </footer>
            </form>
          </div>

          <section id="local-board" className="topics-local-board">
            <div className="topics-local-head">
              <div>
                <p>{isZh ? 'Local activity' : 'Local activity'}</p>
                <h2>{isZh ? '这台浏览器里的回答。' : 'Answers in this browser.'}</h2>
              </div>
              <button type="button" onClick={handleCopyBoard}>
                <Copy size={16} />
                {copied ? (isZh ? '已复制' : 'Copied') : isZh ? '复制给 Eden' : 'Copy'}
              </button>
            </div>

            <div className="topics-local-list">
              {storedEntries.length > 0 ? (
                storedEntries.map((entry) => (
                  <article key={entry.id}>
                    <span>{entry.kind === 'topic' ? (isZh ? 'Guest topic' : 'Guest topic') : isZh ? 'Answer' : 'Answer'}</span>
                    <h3>{entry.topic}</h3>
                    <p>{entry.message}</p>
                    <small>
                      <UserRound size={14} />
                      {entry.name} · {formatGuestTopicDate(entry.createdAt, language)}
                    </small>
                  </article>
                ))
              ) : (
                <div className="topics-empty-state">
                  <MessageSquare size={24} />
                  <p>
                    {isZh
                      ? '还没有本地回答。点击任一卡片的 Yes / No，或创建新问题。'
                      : 'No local answers yet. Click Yes / No on any card, or create a new question.'}
                  </p>
                </div>
              )}
            </div>

            <div id="how-it-works" className="topics-note-panel">
              <p className="topics-mini-label">{isZh ? 'Persistence note' : 'Persistence note'}</p>
              <p>
                {isZh
                  ? '当前版本不连接数据库，所以不同访客之间不会互相看到回答。要做真正公开 topic market，下一步需要接 Firebase / Supabase / GitHub Issues / Formspree 这类持久化层。'
                  : 'This version does not connect to a database, so different visitors will not see each other’s answers. A public topic market needs Firebase, Supabase, GitHub Issues, or a form service next.'}
              </p>
              <a href={homeHref}>{isZh ? '返回主页' : 'Back home'} <span aria-hidden>›</span></a>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};
