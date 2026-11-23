/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A faux phone showing what a visitor sees once a shop is live on Jiju: the card, a highlight,
// and — the point of the whole pipeline — the exact source quote and who checked it.
// The shop is fictional ("Kafe Contoh" = "Example Cafe" in Malay); numbers are illustrative.
// Motion: the highlight opens to reveal its source while on screen; reduced motion shows it open.

import React from 'react';
import { BadgeCheck, Clock, ExternalLink, MapPin } from 'lucide-react';
import { JijuStorefrontArt } from './css-art/jiju-story-art';
import type { EpText } from './ProductStorePage';

type Props = { isZh: boolean };
const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);

export const JijuPhoneCard: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const node = ref.current;
    if (typeof window === 'undefined' || !node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    let timer = 0;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (!timer) {
          setOpen(false);
          timer = window.setInterval(() => setOpen((value) => !value), 2600);
        }
      } else if (timer) {
        window.clearInterval(timer);
        timer = 0;
        setOpen(true);
      }
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => { observer.disconnect(); if (timer) window.clearInterval(timer); };
  }, []);

  return (
    <figure className="jjc-figure jjph-figure">
      <p className="jjc-figure-title">{pick(isZh, { en: 'What a visitor finally sees', zh: '最后，访客看到的样子' })}</p>
      <div className="jjph-layout">
        <div ref={ref} className="jjph-phone" aria-hidden="true">
          <div className="jjph-notch" />
          <div className="jjph-screen">
            <JijuStorefrontArt label="" />
            <div className="jjph-body">
              <p className="jjph-name">Kafe Contoh</p>
              <p className="jjph-meta"><span><MapPin size={11} /> George Town</span><span><Clock size={11} /> {pick(isZh, { en: 'Open 8am–6pm', zh: '营业 8am–6pm' })}</span></p>
              <div className="jjph-chips">
                <span className="jjph-chip jjph-chip-on">{pick(isZh, { en: 'Specialty coffee', zh: '精品咖啡' })}</span>
                <span className="jjph-chip">{pick(isZh, { en: 'Pets outdoor', zh: '宠物可坐户外' })}</span>
              </div>
              <div className={`jjph-highlight${open ? ' is-open' : ''}`}>
                <p className="jjph-highlight-title">★ {pick(isZh, { en: 'Roasts its own beans every week', zh: '每周自己烘豆' })}</p>
                <div className="jjph-source">
                  <p className="jjph-quote">“We roast our own beans every Tuesday.”</p>
                  <p className="jjph-from"><ExternalLink size={10} /> {pick(isZh, { en: 'Shop’s own website', zh: '店家官网' })}</p>
                  <p className="jjph-checked"><BadgeCheck size={11} /> {pick(isZh, { en: 'Checked by a person · 23 Nov', zh: '人工核对 · 11 月 23 日' })}</p>
                </div>
              </div>
              <div className="jjph-blank">
                <span>{pick(isZh, { en: 'Set lunch', zh: '午市套餐' })}</span>
                <em>{pick(isZh, { en: 'not confirmed yet', zh: '还没核实' })}</em>
              </div>
            </div>
          </div>
        </div>
        <ul className="jjph-notes">
          <li><span>1</span>{pick(isZh, { en: 'Labels appear only when the shop’s own words say so.', zh: '标签只有店家原话写明了才出现。' })}</li>
          <li><span>2</span>{pick(isZh, { en: 'Every highlight opens to its source: the exact quote and where it came from.', zh: '每个亮点都能点开看出处：原话，以及来自哪里。' })}</li>
          <li><span>3</span>{pick(isZh, { en: 'The date is when a person checked it — never a machine.', zh: '日期是人核对的那天 —— 不是机器。' })}</li>
          <li><span>4</span>{pick(isZh, { en: 'What we could not verify says so, instead of guessing.', zh: '查不到的就直说还没核实，不去猜。' })}</li>
        </ul>
      </div>
      <figcaption>
        {pick(isZh, {
          en: 'Illustration with a made-up shop (“Kafe Contoh” means “Example Cafe” in Malay).',
          zh: '示意图，店名是虚构的（「Kafe Contoh」在马来文里就是「示例咖啡馆」）。',
        })}
      </figcaption>
    </figure>
  );
};
