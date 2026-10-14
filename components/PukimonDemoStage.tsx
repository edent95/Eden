import React from 'react';
import { mountPukimon, type PukimonHandle } from '../services/pukimonGame';
import { openPukimonPlayLayer } from './pukimonPlayLayer';

/**
 * Pukimon 公开版的 16:9 舞台：电脑对电脑的实时演示（静音、低画质、滚出视野就暂停），
 * 点「开始」盖一层全屏从组队开始玩（components/pukimonPlayLayer.ts）。
 * 首页 #pukimon（HomePukimonGame）和 /pukimon 的舞台都用它。
 * 游戏包到了视野附近才下载（约 1.7 MB）；系统设了「减少动态效果」时不放演示，只留「开始」。
 */

type Props = { isZh: boolean; baseUrl: string; className?: string };

const DEMO_QUALITY = 0.6;

const PukimonDemoStage: React.FC<Props> = ({ isZh, baseUrl, className }) => {
  const t = (en: string, zh: string) => (isZh ? zh : en);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const mountRef = React.useRef<HTMLDivElement>(null);
  const demoRef = React.useRef<PukimonHandle | null>(null);
  const visibleRef = React.useRef(false);
  const playingRef = React.useRef(false);
  const [demo, setDemo] = React.useState<'idle' | 'loading' | 'ready' | 'missing' | 'off'>('idle');

  const syncRunning = React.useCallback(() => {
    demoRef.current?.setRunning(visibleRef.current && !playingRef.current && !document.hidden);
  }, []);

  React.useEffect(() => {
    const stage = stageRef.current;
    const box = mountRef.current;
    if (!stage || !box) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDemo('off');
      return undefined;
    }
    let unmount: (() => void) | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !unmount) {
          setDemo('loading');
          unmount = mountPukimon(box, baseUrl, { demo: true, quality: DEMO_QUALITY }, (state, handle) => {
            if (state === 'missing') { setDemo('missing'); return; }
            demoRef.current = handle ?? null;
            handle?.ready.then(() => setDemo('ready'));
            syncRunning();
          });
        }
        syncRunning();
      },
      { rootMargin: '240px 0px' },
    );
    io.observe(stage);
    document.addEventListener('visibilitychange', syncRunning);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', syncRunning);
      demoRef.current = null;
      unmount?.();
    };
  }, [baseUrl, syncRunning]);

  const start = () => {
    if (playingRef.current) return;
    playingRef.current = true;
    syncRunning();
    openPukimonPlayLayer({
      baseUrl,
      isZh,
      onClose: () => { playingRef.current = false; syncRunning(); },
    });
  };

  return (
    <div className={`pukimon-stage${className ? ` ${className}` : ''}`} ref={stageRef} data-state={demo}>
      {/* React 不往这个 div 里渲染任何东西：游戏容器是 mountPukimon 手动挂进去的 */}
      <div className="pukimon-mount" ref={mountRef} aria-hidden="true" />
      <button type="button" className="pukimon-start" onClick={start}>
        <span>{t('Start', '开始')}</span>
      </button>
      {demo === 'loading' && <p className="pukimon-note">{t('Loading the arena…', '擂台载入中…')}</p>}
      {demo === 'missing' && <p className="pukimon-note">{t('The arena is unavailable right now.', '擂台暂时打不开。')}</p>}
    </div>
  );
};

export default PukimonDemoStage;
