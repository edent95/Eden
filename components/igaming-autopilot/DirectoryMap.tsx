/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The bridge figure on /igaming-ai (owner, 2026-11-26): Jiju runs a directory — places, merchants,
// events, promotions — and each row maps one-to-one onto a provider directory (provider / merchant,
// provider information, provider promotion, merchant brand). Rows light up one at a time while on screen,
// then the shared verbs appear; reduced motion shows everything lit. Styles: .igap-map-* in
// styles/pages/jiju-autopilot.css.

import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { EpText } from '../ProductStorePage';
import { useLoopStep } from '../system-story/SystemStory';
import type { ApHue } from '../jiju-autopilot/AutopilotFigures';

const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);

export type DirectoryMapRow = { id: string; hue: ApHue; jiju: EpText; jijuNote: EpText; igaming: EpText; igamingNote: EpText };

export const DirectoryMap: React.FC<{
  isZh: boolean;
  title: EpText;
  heads: [EpText, EpText];
  rows: DirectoryMapRow[];
  verbs: EpText[];
  conclusion: EpText;
  ariaLabel: EpText;
  caption: EpText;
}> = ({ isZh, title, heads, rows, verbs, conclusion, ariaLabel, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  // steps 0..n-1 light one row each, step n lights the shared verbs and holds one extra beat
  const total = rows.length + 2;
  const step = useLoopStep(ref, total, 1500, total - 1);
  return (
    <figure className="jjc-figure igap-map-figure">
      <p className="igap-map-title">{pick(isZh, title)}</p>
      <div ref={ref} className="igap-map" role="img" aria-label={pick(isZh, ariaLabel)}>
        <div className="igap-map-head" aria-hidden="true">
          <span>{pick(isZh, heads[0])}</span>
          <span />
          <span>{pick(isZh, heads[1])}</span>
        </div>
        {rows.map((row, index) => (
          <div key={row.id} aria-hidden="true" className={`igap-map-row jap-hue-${row.hue}${step >= index ? ' is-in' : ''}${step === index ? ' is-now' : ''}`}>
            <div className="igap-map-cell">
              <strong>{pick(isZh, row.jiju)}</strong>
              <small>{pick(isZh, row.jijuNote)}</small>
            </div>
            <ArrowRight className="igap-map-arrow" size={18} />
            <div className="igap-map-cell is-igaming">
              <strong>{pick(isZh, row.igaming)}</strong>
              <small>{pick(isZh, row.igamingNote)}</small>
            </div>
          </div>
        ))}
        <div aria-hidden="true" className={`igap-map-verbs${step >= rows.length ? ' is-in' : ''}`}>
          <ol>
            {verbs.map((verb) => <li key={verb.en}>{pick(isZh, verb)}</li>)}
          </ol>
          <p>{pick(isZh, conclusion)}</p>
        </div>
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};
