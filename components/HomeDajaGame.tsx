import React from 'react';
import { kaleidoSpecFor } from '../app/kaleido-routes';
import { KaleidoFrame } from './css-art/kaleido-frame';
import { mountDaja, type DajaHandle } from '../services/dajaGame';
import { openDajaPlayLayer } from './dajaPlayLayer';

/**
 * 首页 #daja：左边文案，右边一张卡片 —— 电脑对电脑的实时演示（静音、低画质、滚出视野就暂停），
 * 点「开始」盖一层全屏从组队开始玩（components/dajaPlayLayer.ts）。
 * 游戏包到了视野附近才下载（约 1.7 MB）；系统设了「减少动态效果」时不放演示。
 */

type Props = { isZh: boolean; baseUrl: string; dajaHref: string };

const DEMO_QUALITY = 0.6;

const HomeDajaGame: React.FC<Props> = ({ isZh, baseUrl, dajaHref }) => {
  const t = (en: string, zh: string) => (isZh ? zh : en);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const mountRef = React.useRef<HTMLDivElement>(null);
  const demoRef = React.useRef<DajaHandle | null>(null);
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
          unmount = mountDaja(box, baseUrl, { demo: true, quality: DEMO_QUALITY }, (state, handle) => {
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
    openDajaPlayLayer({
      baseUrl,
      isZh,
      onClose: () => { playingRef.current = false; syncRunning(); },
    });
  };

  return (
    <section className="eden-daja eden-home-island" id="daja">
      <div className="eden-daja-copy">
        <p className="eden-section-label">{t('Real-time arena · Daja', '实时擂台 · Daja')}</p>
        <h2 className={isZh ? 'is-zh' : undefined}>
          {isZh ? <>不是回合制，<br />手慢就挨打</> : <>Not turn-based.<br />Slow hands lose.</>}
        </h2>
        <div className="eden-daja-body">
          <p>
            {t(
              'Pick three partners and fight a gym leader live on a 45° arena: move, dodge, jump over ground attacks, and fire four auto-aimed skills.',
              '挑三只伙伴上场，和道馆馆主在 45° 斜视角的场地上实时对打：走位、闪避、跳起来躲地面攻击，四个招式自动瞄准。',
            )}
          </p>
          <p>
            {t(
              'Six original partners, six gyms and a champion, plus a three-way brawl. Keyboard or gamepad on desktop; turn your phone sideways to play.',
              '六只原创伙伴、六座道馆加一位冠军，还有三方混战。电脑上用键盘或手柄，手机横过来就能玩。',
            )}
          </p>
          <p className="eden-daja-thesis">
            <strong>{t('That is the computer playing itself. Press start and take over.', '右边是电脑在自己打。点开始，换你上。')}</strong>
          </p>
        </div>
      </div>

      <div className="eden-daja-arena">
        <KaleidoFrame spec={kaleidoSpecFor('/')} />
        <div className="eden-daja-stage kf-box" ref={stageRef} data-state={demo}>
          {/* React 不往这个 div 里渲染任何东西：游戏容器是 mountDaja 手动挂进去的 */}
          <div className="eden-daja-mount" ref={mountRef} aria-hidden="true" />
          <button type="button" className="eden-daja-start" onClick={start}>
            <span>{t('Start', '开始')}</span>
          </button>
          {demo === 'loading' && <p className="eden-daja-note">{t('Loading the arena…', '擂台载入中…')}</p>}
          {demo === 'missing' && <p className="eden-daja-note">{t('The arena is unavailable right now.', '擂台暂时打不开。')}</p>}
        </div>
        <p className="eden-daja-meta">
          <span>{t('Fullscreen · keyboard, gamepad or touch', '全屏开打 · 键盘、手柄、触屏都行')}</span>
          <a href={dajaHref}>{t('Open as a page', '在独立页面打开')}</a>
        </p>
      </div>
    </section>
  );
};

export default HomeDajaGame;
