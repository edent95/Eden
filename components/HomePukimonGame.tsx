import React from 'react';
import PukimonShowdownFrame from './PukimonShowdownFrame';

/**
 * 首页 #pukimon，紧接在 hero 后面，是首页的大横幅（照 Apple Services 页的排法）：
 * 只有「赤红 vs 青绿」三回合演出（照剧本打、只能看，右上角开声音），撑满宽度，不配任何文字（用户要求）；
 * 下面才是会漂移的作品卡片（app/home-collage.tsx）。
 * 舞台是 components/PukimonShowdownFrame.tsx（iframe 嵌另一个网域上的演出网站），/pukimon 页面顶部也是同一个。
 */

type Props = { isZh: boolean; baseUrl: string; pukimonHref: string };

const HomePukimonGame: React.FC<Props> = ({ isZh }) => (
  <section className="eden-pukimon" id="pukimon" aria-label={isZh ? 'Pukimon 实时对战演出' : 'Pukimon live battle'}>
    <div className="eden-pukimon-arena">
      <PukimonShowdownFrame isZh={isZh} className="eden-pukimon-stage" />
    </div>
  </section>
);

export default HomePukimonGame;
