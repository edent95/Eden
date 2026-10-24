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
          <p className="rt-kicker">{isZh ? '4D Risk Terminal · 给 4D 代理' : '4D Risk Terminal · for 4D agents'}</p>
          <h1 className="risk-terminal-hero-title font-display">{isZh ? '这期开出来，你赔得起吗？' : 'If this draw goes wrong, can you pay?'}</h1>
          <p className="risk-terminal-hero-subtitle">
            {isZh
              ? '做 4D 代理，怕的不是少赚，是一期开出热门字就把本钱赔光。'
              : 'The danger for a 4D agent is not earning less. It is one hot number wiping out the float.'}
          </p>
          <p className="risk-terminal-hero-copy">
            {isZh
              ? '把这期的下注放进来：先告诉你赔不赔得起，再告诉你上限怎么改、哪些字交给上家。'
              : 'Put in this draw’s bets: first whether you can pay the worst case, then what limit to set and what to pass on.'}
          </p>
          <div className="risk-terminal-actions">
            <a href="#terminal" className="rt-btn rt-btn-lg">
              {isZh ? '看示例的答案' : 'See the sample answer'} <span aria-hidden>↓</span>
            </a>
            <a href="#import" className="rt-btn rt-btn-lg rt-btn-ghost" onClick={() => { if (window.location.hash === '#import') window.dispatchEvent(new HashChangeEvent('hashchange')); }}>
              {isZh ? '放进我的下注' : 'Use my own bets'}
            </a>
          </div>
          <p className="risk-terminal-hero-note">
            {isZh ? '只在你的浏览器里算，下注不会上传' : 'Runs in your browser; your bets are never uploaded · the tool itself is in Chinese'}
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
