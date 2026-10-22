import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls, type Language, type Theme, type ThemePreference } from '../app/shared';

// what the page does for an agent, in their words; the terminal below answers each in order
const HELP: Array<[[string, string], [string, string]]> = [
  [['最惨会亏多少', '跟你的备用金比，一眼看出这期赔不赔得起。'], ['The worst draw', 'Set against your float, so you see at once whether you can pay it.']],
  [['哪几个字太重', '告诉你哪些字要停收，哪些要交给上家。'], ['Which numbers are too heavy', 'Which ones to stop taking and which to pass to your upline.']],
  [['每个字自己留多少', '帮你定上限，算好少赚多少、少冒多少险。'], ['How much to keep per number', 'A limit, with what it costs you in profit and saves you in risk.']],
  [['开奖后对账', '算清这期赚亏，提醒你哪个上家的合同没讲清楚。'], ['Settling after the draw', 'Profit or loss for the draw, and which upline contract is not clear yet.']],
];

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
            {isZh ? '开卖前把这期的下注放进来，我们帮你算清楚：' : 'Put in this draw’s bets before sales close. We work out:'}
          </p>
          <ol className="risk-terminal-help">
            {HELP.map(([zh, en], i) => (
              <li key={i}>
                <span className="risk-terminal-help-index">{String(i + 1).padStart(2, '0')}</span>
                <b>{isZh ? zh[0] : en[0]}</b>
                <span>{isZh ? zh[1] : en[1]}</span>
              </li>
            ))}
          </ol>
          <div className="risk-terminal-actions">
            <a href="#terminal" className="rt-btn rt-btn-lg">
              {isZh ? '用示例看一遍' : 'Walk through the sample'} <span aria-hidden>›</span>
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
