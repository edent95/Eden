import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls, type Language, type Theme, type ThemePreference } from '../app/shared';

// the terminal carries the whole simulation engine, so it loads as its own chunk
const RiskTerminal = React.lazy(() => import('../components/fourd/RiskTerminal'));

export const RiskTerminalPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';

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
          <p className="rt-kicker">Interactive tool · 4D</p>
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
            <a href="#terminal" className="rt-btn rt-btn-lg">
              {isZh ? '开始试算' : 'Run the numbers'} <span aria-hidden>›</span>
            </a>
          </div>
          <p className="risk-terminal-hero-note">
            {isZh ? '示例数据 · 只在你的浏览器里算' : 'Sample data · runs in your browser · the tool itself is in Chinese'}
          </p>
        </header>

        <div id="terminal" className="risk-terminal-stage">
          <React.Suspense fallback={<p className="rt-busy">{isZh ? '正在载入…' : 'Loading…'}</p>}>
            <RiskTerminal theme={theme} />
          </React.Suspense>
        </div>
      </main>
    </div>
  );
};
