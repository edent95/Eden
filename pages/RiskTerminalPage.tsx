import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls, joinBasePath, type Language, type Theme, type ThemePreference } from '../app/shared';

// Same four words as /brand-guide#brand-philosophy, each answered by what the tool actually does.
const riskTerminalPrinciples = [
  {
    title: { en: 'Clarity', zh: '清晰' },
    copy: {
      en: 'Every view opens with the verdict and the next move.',
      zh: '每一页先给结论和下一步。',
    },
  },
  {
    title: { en: 'Restraint', zh: '克制' },
    copy: {
      en: 'Only the numbers that change the decision: limit, reserve, risk of ruin.',
      zh: '只看会改变决定的数：上限、备用金、赔光机会。',
    },
  },
  {
    title: { en: 'Depth', zh: '层级' },
    copy: {
      en: '10,000 numbers on one map. Darker means a bigger payout.',
      zh: '一万个号码画成一张地图，颜色越深赔越多。',
    },
  },
  {
    title: { en: 'Trust', zh: '信任' },
    copy: {
      en: 'Simulate 30,000 draws and backtest old results before moving money.',
      zh: '先让电脑开奖三万次、用旧开奖回测，再动钱。',
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
  const observerRef = React.useRef<ResizeObserver | null>(null);
  const [frameHeight, setFrameHeight] = React.useState<number>();

  // The tool is a self-contained page in public/embeds (same origin): hand it the site theme and
  // grow the frame to its content so the page scrolls once, not twice.
  const syncFrame = React.useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc?.documentElement) return;
    doc.documentElement.classList.add('embedded');
    if (doc.documentElement.dataset.theme !== theme) doc.documentElement.dataset.theme = theme;
  }, [theme]);

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
          <p className="risk-terminal-kicker">Interactive tool · 4D</p>
          <h1 className="risk-terminal-hero-title font-display">4D Risk Terminal</h1>
          <p className="risk-terminal-hero-subtitle">
            {isZh ? '一万个号码，先找出会让你赔光的那一个。' : '10,000 numbers. Find the one that could wipe you out.'}
          </p>
          <p className="risk-terminal-hero-copy">
            {isZh
              ? '把一期 4D 下注变成一张风险地图，再告诉你下一步。'
              : 'One draw of 4D bets, turned into a risk map and a next step.'}
          </p>
          <div className="risk-terminal-actions">
            <a href="#terminal" className="risk-terminal-cta">
              {isZh ? '开始试算' : 'Run the numbers'} <span aria-hidden>›</span>
            </a>
            <a href="#philosophy" className="risk-terminal-cta risk-terminal-cta-muted">
              {isZh ? '先看想法' : 'How it thinks'} <span aria-hidden>›</span>
            </a>
          </div>
        </header>

        <section id="philosophy" className="risk-terminal-section" aria-labelledby="risk-terminal-philosophy-title">
          <div className="risk-terminal-section-head">
            <p className="risk-terminal-kicker">01 / How it thinks</p>
            <h2 id="risk-terminal-philosophy-title" className="risk-terminal-section-title font-display">
              {isZh ? '先稳，再赚。' : 'Stable first. Profit second.'}
            </h2>
            <p className="risk-terminal-section-copy">
              {isZh ? '界面只回答一个问题：这期赔不赔得起。' : 'The interface answers one question: can this draw hurt you?'}
            </p>
          </div>
          <article className="risk-terminal-manifesto">
            <div>
              <p className="risk-terminal-index">Manifesto</p>
              <h3 className="font-display">
                {isZh ? '不管开哪个字，赔的都差不多。' : 'Whatever number comes up, the payout looks about the same.'}
              </h3>
            </div>
            <p>
              {isZh
                ? '太重的字交给上家，空位留给轻的字。每期都稳稳赚到水钱，不会因为一个字开出来就大亏。'
                : 'Lay off the heavy numbers, fill the light ones. The margin arrives every draw instead of one hit wiping it out.'}
            </p>
          </article>
          <div className="risk-terminal-principles">
            {riskTerminalPrinciples.map((item, index) => (
              <article key={item.title.en} className="risk-terminal-principle">
                <p className="risk-terminal-index">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h3 className="font-display">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="terminal" className="risk-terminal-section" aria-labelledby="risk-terminal-tool-title">
          <div className="risk-terminal-section-head">
            <p className="risk-terminal-kicker">02 / Terminal</p>
            <h2 id="risk-terminal-tool-title" className="risk-terminal-section-title font-display">
              {isZh ? '开始试算。' : 'Run the numbers.'}
            </h2>
            <p className="risk-terminal-section-copy">
              {isZh
                ? '示例数据，只在你的浏览器里算。'
                : 'Sample data. Everything runs in your browser. The tool itself is in Chinese.'}
            </p>
          </div>
          <div className="risk-terminal-stage">
            <iframe
              ref={frameRef}
              src={joinBasePath(baseUrl, 'embeds/4d-risk-terminal.html')}
              title="4D Risk Terminal"
              onLoad={handleLoad}
              style={frameHeight ? { height: frameHeight } : undefined}
            />
          </div>
        </section>
      </main>
    </div>
  );
};
