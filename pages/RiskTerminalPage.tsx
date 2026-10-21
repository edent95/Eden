import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls, joinBasePath, type Language, type Theme, type ThemePreference } from '../app/shared';

const riskTerminalNotes = [
  {
    title: { en: 'Sample data', zh: '示例数据' },
    copy: {
      en: 'Every bet, draw, and contract on this page is made up.',
      zh: '页面上的下注、开奖和合同都是假的。',
    },
  },
  {
    title: { en: 'Stays in your browser', zh: '只在浏览器里算' },
    copy: {
      en: 'Imported CSV files are never uploaded.',
      zh: '导入的 CSV 不会上传到任何地方。',
    },
  },
  {
    title: { en: 'Answer first', zh: '先给结论' },
    copy: {
      en: 'Each view opens with the decision, then the proof.',
      zh: '每一页先说该怎么做，再给电脑算出的证据。',
    },
  },
] as const;

export const RiskTerminalPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const frameRef = React.useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = React.useState<number>();

  // The tool is a self-contained page in public/embeds (same origin): hand it the site theme and
  // grow the frame to its content so the page scrolls once, not twice.
  const syncFrame = React.useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc?.documentElement) return;
    doc.documentElement.classList.add('embedded');
    if (doc.documentElement.dataset.theme !== theme) doc.documentElement.dataset.theme = theme;
  }, [theme]);

  const observerRef = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => { syncFrame(); }, [syncFrame]);
  React.useEffect(() => () => observerRef.current?.disconnect(), []);

  const handleLoad = React.useCallback(() => {
    syncFrame();
    const doc = frameRef.current?.contentDocument;
    if (!doc?.body) return;
    // body, not documentElement: the root is at least as tall as the frame, so it would never shrink back
    const measure = () => setFrameHeight(Math.ceil(doc.body.getBoundingClientRect().height));
    measure();
    observerRef.current?.disconnect();
    observerRef.current = new ResizeObserver(measure);
    observerRef.current.observe(doc.body);
  }, [syncFrame]);

  return (
    <div className="page-shell risk-terminal-page min-h-screen">
      <div className="risk-terminal-topbar">
        <a href={homeHref} className="risk-terminal-back-link inline-flex items-center gap-2 text-sm font-medium">
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

      <main className="risk-terminal-main">
        <header className="risk-terminal-hero">
          <p className="risk-terminal-kicker">{isZh ? 'Interactive tool · 4D' : 'Interactive tool · 4D'}</p>
          <h1 className="risk-terminal-title">
            {isZh ? '一万个号码，先找出会让你赔光的那一个。' : '10,000 numbers. Find the one that could wipe you out.'}
          </h1>
          <p className="risk-terminal-lede">
            {isZh
              ? '4D Risk Terminal 把一期 4D 下注变成一张风险地图：哪些字太重、开中要赔多少、每个号码的上限该定多少。电脑先替你开奖几万次，再告诉你下一步。'
              : '4D Risk Terminal turns one draw of 4D bets into a risk map: which numbers carry too much, what a hit would cost, and where to set each limit. It simulates tens of thousands of draws before telling you the next move.'}
          </p>
          <ul className="risk-terminal-notes">
            {riskTerminalNotes.map((note) => (
              <li key={note.title.en}>
                <strong>{note.title[language]}</strong>
                <span>{note.copy[language]}</span>
              </li>
            ))}
          </ul>
        </header>

        <section className="risk-terminal-stage" aria-label={isZh ? '4D 风险试算台' : '4D Risk Terminal'}>
          {isZh ? null : (
            <p className="risk-terminal-lang-note">The tool itself is in Chinese.</p>
          )}
          <iframe
            ref={frameRef}
            src={joinBasePath(baseUrl, 'embeds/4d-risk-terminal.html')}
            title="4D Risk Terminal"
            onLoad={handleLoad}
            style={frameHeight ? { height: frameHeight } : undefined}
          />
        </section>
      </main>
    </div>
  );
};
