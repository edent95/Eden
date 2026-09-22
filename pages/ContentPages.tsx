import React from 'react';
import { siteEssayNotes, wikiEntries } from '../generated/content';
import type { CssArtComponent } from '../components/css-art/index';
import { WikiBackgroundMusicCssIcon, WikiButtonFeedbackCssIcon, WikiFirebaseStorageCssIcon, WikiRagFlowCssIcon, WikiSkillsCssIcon, WikiViteCssIcon } from '../components/css-art/index';
import { HeaderControls, joinBasePath, resolveAssetPath, type Language, type Theme, type ThemePreference } from '../app/shared';
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Bookmark, Brain, Copy, Database, GitBranch, Layers, MessageSquare, Plus, Search, SearchCheck, Send, SlidersHorizontal, TrendingUp, UserRound } from 'lucide-react';

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

type WikiEntry = (typeof wikiEntries)[number];

const getWikiToneClassName = (slug: WikiEntry['slug']) => `wiki-tone wiki-tone-${slug}`;

const wikiCssIconBySlug: Record<WikiEntry['slug'], CssArtComponent> = {
  vite: WikiViteCssIcon,
  'background-music': WikiBackgroundMusicCssIcon,
  'button-feedback': WikiButtonFeedbackCssIcon,
  'firebase-lifetime-storage': WikiFirebaseStorageCssIcon,
  skills: WikiSkillsCssIcon,
  'rag-flow': WikiRagFlowCssIcon,
};

const WikiEntryVisual: React.FC<{
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

const publishedNotes = [
  ...siteEssayNotes.map((note) => ({
    title: note.title,
    summary: note.summary,
    category: note.category,
    href: `notes/${note.slug}`,
  })),
  {
    title: { en: 'Button feedback is part of the system', zh: '按钮反馈，本来就是系统的一部分' },
    summary: {
      en: 'Pressed, pending, accepted, blocked, and failed: what a realtime interface needs to say after a click.',
      zh: '按下、等待、接受、阻挡与失败：一个 realtime interface 在 click 之后应该说清楚什么。',
    },
    category: { en: 'Interaction', zh: '交互' },
    href: 'wiki/button-feedback',
  },
  {
    title: { en: 'Background music changes the room', zh: 'Background music 会改变一个房间' },
    summary: {
      en: 'Why optional sound can make a browser poker table feel shared, present, and alive.',
      zh: '为什么可控的声音，会让 browser poker table 更像一个大家真的在场的空间。',
    },
    category: { en: 'Experience', zh: '体验' },
    href: 'wiki/background-music',
  },
  {
    title: { en: 'Firebase as durable table memory', zh: '用 Firebase 留住牌桌的记忆' },
    summary: {
      en: 'Rooms, reconnects, public games, and cleanup logic behind a table that needs to remember.',
      zh: '房间、重连、公开游戏与 cleanup logic：一张需要记得事情的牌桌，是怎样被搭起来的。',
    },
    category: { en: 'Build note', zh: '构建笔记' },
    href: 'wiki/firebase-lifetime-storage',
  },
  {
    title: { en: 'The Vite skills that survived the build', zh: '真正留到最后的 Vite skills' },
    summary: {
      en: 'A practical release loop covering local development, routes, assets, environment values, and production checks.',
      zh: '从 local development、routes、assets、environment values 到 production checks 的实用 release loop。',
    },
    category: { en: 'Engineering', zh: '工程' },
    href: 'wiki/vite',
  },
];

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
