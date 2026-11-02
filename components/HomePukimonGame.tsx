import React from 'react';
import PukimonShowdownFrame from './PukimonShowdownFrame';

/**
 * 首页 #pukimon，紧接在 hero 后面，是首页的大横幅（照 Apple Services 页的排法）：
 * 上面居中一段短文案和「了解更多」，下面是撑满宽度的「赤红 vs 青绿」三回合演出（照剧本打、只能看，
 * 右上角开声音），再下面才是会漂移的作品卡片（app/home-collage.tsx）。
 * 舞台是 components/PukimonShowdownFrame.tsx（iframe 嵌另一个网域上的演出网站），/pukimon 页面顶部也是同一个；
 * iframe 要能点（开声音），所以文案不能压在舞台上，只能放在上面。
 */

type Props = { isZh: boolean; baseUrl: string; pukimonHref: string };

const HomePukimonGame: React.FC<Props> = ({ isZh, pukimonHref }) => {
  const t = (en: string, zh: string) => (isZh ? zh : en);

  return (
    <section className="eden-pukimon" id="pukimon" aria-labelledby="eden-pukimon-title">
      <div className="eden-pukimon-copy eden-home-island">
        <p className="eden-section-label">{t('Real-time arena · Pukimon', '实时擂台 · Pukimon')}</p>
        <h2 id="eden-pukimon-title" className={isZh ? 'is-zh' : undefined}>
          {isZh ? <>不是回合制，<br />手慢就挨打</> : <>Not turn-based.<br />Slow hands lose.</>}
        </h2>
        <p className="eden-pukimon-lead">
          {t(
            'Three Pokémon a side, fought live on a 45° arena: move, dodge, jump over ground attacks, chain combos, and clash attacks head-on.',
            '一人三只宝可梦，在 45° 斜视角的场地上实时对打：走位、闪避、跳起来躲地面攻击，接连招，招式正面对撞。',
          )}
        </p>
        <a className="eden-pukimon-more" href={pukimonHref}>{t('Learn more', '了解更多')}</a>
      </div>

      <div className="eden-pukimon-arena">
        <PukimonShowdownFrame isZh={isZh} className="eden-pukimon-stage" />
        <p className="eden-pukimon-meta">
          {t(
            'Above: a scripted three-round battle in the engine — Nidorino vs Gengar, Mew vs Mewtwo, Charizard vs Blastoise. Watch only; turn the sound on at the top right.',
            '上面是用游戏引擎照剧本打的三回合：尼多力诺 vs 耿鬼、梦幻 vs 超梦、喷火龙 vs 水箭龟。只能看，右上角开声音。',
          )}
        </p>
      </div>
    </section>
  );
};

export default HomePukimonGame;
