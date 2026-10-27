import React from 'react';
import { kaleidoSpecFor } from '../app/kaleido-routes';
import { KaleidoFrame } from './css-art/kaleido-frame';
import PukimonDemoStage from './PukimonDemoStage';

/**
 * 首页 #pukimon：文案在上，下面一张卡片 —— 「赤红 vs 青绿」三回合演出（public/pukimon-showdown，照剧本打、只能看），
 * 右上角开声音。舞台本身在 components/PukimonDemoStage.tsx（showdown），/pukimon 页面顶部的舞台也是同一个。
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
              'Three Pokémon a side, fought live on a 45° arena: move, dodge, jump over ground attacks, chain combos, and clash attacks head-on.',
              '一人三只宝可梦，在 45° 斜视角的场地上实时对打：走位、闪避、跳起来躲地面攻击，接连招，招式正面对撞。',
            )}
          </p>
          <p>
            {t(
              'Below is a scripted three-round battle in the engine: Nidorino vs Gengar from the Red and Blue opening, Mew vs Mewtwo on New Island, and Charizard vs Blastoise, to an original theme.',
              '下面是用游戏引擎照剧本打的三回合：红 / 蓝版开场的尼多力诺 vs 耿鬼、新岛上的梦幻 vs 超梦，最后喷火龙 vs 水箭龟，配原创开场曲。',
            )}
          </p>
          <p className="eden-pukimon-thesis">
            <strong>{t('Turn the sound on at the top right.', '右上角开声音。')}</strong>
          </p>
        </div>
      </div>

      <div className="eden-pukimon-arena">
        <KaleidoFrame spec={kaleidoSpecFor('/')} />
        <PukimonDemoStage isZh={isZh} baseUrl={baseUrl} className="eden-pukimon-stage kf-box" showdown />
        <p className="eden-pukimon-meta">
          <span>{t('Red vs Blue · three rounds · watch only', '赤红 vs 青绿 · 三回合 · 只能看')}</span>
          <a href={pukimonHref}>{t('About Pukimon', 'Pukimon 介绍页')}</a>
        </p>
      </div>
    </section>
  );
};

export default HomePukimonGame;
