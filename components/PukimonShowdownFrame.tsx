import React from 'react';

/**
 * 「赤红 vs 青绿」三回合演出的舞台（首页 #pukimon 和 /pukimon 顶部）：用 iframe 嵌另一个网域上的演出网站
 * （Pukimon 项目 npm run showdown:deploy → Cloudflare Pages 项目 pukimon-showdown）。
 * 游戏在另一个网域跑，Chrome 会放进单独的进程，演出卡也不会拖慢这一页的滚动和按钮；Eden 也不用背那几 MB 的包。
 * 「开声音」在 iframe 里面：浏览器的用户手势不会从这一页传进跨网域的 iframe。
 * 到了视野附近才给 iframe 网址（才开始下载）；滚出视野、切到后台就 postMessage({ run: false }) 让它停下省电。
 * 系统设了「减少动态效果」时不放，只给一个链接。本机测试可以用 VITE_PUKIMON_SHOWDOWN_URL 换成本机的地址。
 */

export const PUKIMON_SHOWDOWN_URL: string =
  (import.meta.env.VITE_PUKIMON_SHOWDOWN_URL as string | undefined) || 'https://pukimon-showdown.pages.dev/';

type Props = { isZh: boolean; className?: string };

const PukimonShowdownFrame: React.FC<Props> = ({ isZh, className }) => {
  const t = (en: string, zh: string) => (isZh ? zh : en);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLIFrameElement>(null);
  const visibleRef = React.useRef(false);
  const [state, setState] = React.useState<'idle' | 'loading' | 'ready' | 'off'>('idle');
  const src = PUKIMON_SHOWDOWN_URL + (isZh ? '' : (PUKIMON_SHOWDOWN_URL.includes('?') ? '&' : '?') + 'lang=en');

  const sync = React.useCallback(() => {
    frameRef.current?.contentWindow?.postMessage({ run: visibleRef.current && !document.hidden }, '*');
  }, []);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('off');
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) setState((s) => (s === 'idle' ? 'loading' : s));
        sync();
      },
      { rootMargin: '240px 0px' },
    );
    io.observe(stage);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [sync]);

  return (
    <div className={`pukimon-stage${className ? ` ${className}` : ''}`} ref={stageRef} data-state={state}>
      {state !== 'idle' && state !== 'off' && (
        <iframe
          ref={frameRef}
          className="pukimon-frame"
          src={src}
          title={t('Pukimon: Red vs Blue, three rounds', 'Pukimon：赤红 vs 青绿 三回合')}
          allow="autoplay; fullscreen"
          onLoad={() => { setState('ready'); sync(); }}
        />
      )}
      {state === 'loading' && <p className="pukimon-note">{t('Loading the arena…', '擂台载入中…')}</p>}
      {state === 'off' && (
        <p className="pukimon-note">
          <a href={src} target="_blank" rel="noreferrer">{t('Open the three-round battle', '打开三回合演出')}</a>
        </p>
      )}
    </div>
  );
};

export default PukimonShowdownFrame;
