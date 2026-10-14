import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { mountDaja } from '../services/dajaGame';

/**
 * /daja — Daja 实时擂台对战的独立页面：舞台占满顶栏以下的视口。
 * 游戏包与接口见 services/dajaGame.ts；首页的预览 + 全屏开打在 components/HomeDajaGame.tsx。
 */

export type DajaPageProps = {
  isZh: boolean;
  controls: React.ReactNode;
  homeHref: string;
  /** 站点 base（import.meta.env.BASE_URL），用来拼 public/daja 的地址。 */
  baseUrl: string;
};

const DajaPage: React.FC<DajaPageProps> = ({ isZh, controls, homeHref, baseUrl }) => {
  const t = (en: string, zh: string) => (isZh ? zh : en);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<'loading' | 'ready' | 'missing'>('loading');

  React.useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    return mountDaja(box, baseUrl, { query: window.location.search }, (state) => setStatus(state));
  }, [baseUrl]);

  return (
    <div className="page-shell daja-page">
      <div className="daja-topbar">
        <a href={homeHref} className="daja-back-link inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} />
          {t('Back to Home', '返回主页')}
        </a>
        <h1 className="daja-title">Daja</h1>
        {controls}
      </div>
      <main className="daja-stage" aria-busy={status === 'loading'}>
        {/* React 不往这个 div 里渲染任何东西：游戏容器是 mountDaja 手动挂进去的 */}
        <div className="daja-mount" ref={boxRef} />
        {status === 'loading' && <p className="daja-note">{t('Loading the arena…', '擂台载入中…')}</p>}
        {status === 'missing' && <p className="daja-note">{t('The arena is unavailable right now.', '擂台暂时打不开。')}</p>}
      </main>
    </div>
  );
};

export default DajaPage;
