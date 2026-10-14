import React from 'react';
import { kaleidoSpecFor } from '../app/kaleido-routes';
import { KaleidoFrame } from './css-art/kaleido-frame';
import PukimonDemoStage from './PukimonDemoStage';

/**
 * 首页 #pukimon：文案在上，下面一张卡片 —— Pukimon 公开版（原创角色）的实时演示，
 * 点「开始」全屏开打。舞台本身在 components/PukimonDemoStage.tsx，/pukimon 页面的舞台也用它。
 */

type Props = { isZh: boolean; baseUrl: string; pukimonHref: string };

const HomePukimonGame: React.FC<Props> = ({ isZh, baseUrl, pukimonHref }) => {
  const t = (en: string, zh: string) => (isZh ? zh : en);

  return (
    <section className="eden-pukimon eden-home-island" id="pukimon">
      <div className="eden-pukimon-copy">
        <p className="eden-section-label">{t('Real-time arena · Pukimon', '实时擂台 · Pukimon')}</p>
        <h2 className={isZh ? 'is-zh' : undefined}>
          {isZh ? <>不是回合制，<br />手慢就挨打</> : <>Not turn-based.<br />Slow hands lose.</>}
        </h2>
        <div className="eden-pukimon-body">
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
          <p className="eden-pukimon-thesis">
            <strong>{t('Below, the computer is playing itself. Press start and take over.', '下面是电脑在自己打。点开始，换你上。')}</strong>
          </p>
        </div>
      </div>

      <div className="eden-pukimon-arena">
        <KaleidoFrame spec={kaleidoSpecFor('/')} />
        <PukimonDemoStage isZh={isZh} baseUrl={baseUrl} className="eden-pukimon-stage kf-box" />
        <p className="eden-pukimon-meta">
          <span>{t('Fullscreen · keyboard, gamepad or touch', '全屏开打 · 键盘、手柄、触屏都行')}</span>
          <a href={pukimonHref}>{t('About Pukimon', 'Pukimon 介绍页')}</a>
        </p>
      </div>
    </section>
  );
};

export default HomePukimonGame;
