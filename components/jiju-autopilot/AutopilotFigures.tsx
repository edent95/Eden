/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Figures for /jiju-autopilot (the Jiju full-automation system, for buyers). Same motion rules as the
// system-story set: reveal on scroll, loop only while visible, reduced motion shows the end state.
// Layout CSS: styles/pages/jiju-autopilot.css (.jap-*), reusing .jjc-figure / .jjc-hbar from jiju-charts.css.

import React from 'react';
import { Check } from 'lucide-react';
import { useCountUp, type EpText } from '../ProductStorePage';
import { useLoopStep } from '../system-story/SystemStory';

const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);

/* ---------- 1. The whole machine: eight stations, a dot walks through them ---------- */

export type ApStation = { id: string; icon: React.ReactNode; name: EpText; text: EpText; href: string };

export const ApSystemMap: React.FC<{ isZh: boolean; title: EpText; stations: ApStation[]; caption: EpText }> = ({ isZh, title, stations, caption }) => {
  const ref = React.useRef<HTMLOListElement | null>(null);
  // Reduced motion: every station lit (the end state).
  const step = useLoopStep(ref, stations.length + 2, 1300, stations.length + 1);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <ol
        ref={ref}
        className="jap-map"
        aria-label={stations.map((station, index) => `${index + 1}. ${pick(isZh, station.name)}: ${pick(isZh, station.text)}`).join(' ')}
      >
        {stations.map((station, index) => (
          <li key={station.id} className={`jap-map-stop${index < step ? ' is-done' : ''}${index === step ? ' is-current' : ''}`}>
            <a href={station.href}>
              <span className="jap-map-no" aria-hidden="true">{index + 1}</span>
              <span className="jap-map-icon" aria-hidden="true">{station.icon}</span>
              <strong>{pick(isZh, station.name)}</strong>
              <span className="jap-map-text">{pick(isZh, station.text)}</span>
            </a>
          </li>
        ))}
      </ol>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 2. The publish gate: five items tick one by one, then the place goes live ---------- */

export const ApPublishGate: React.FC<{ isZh: boolean; title: EpText; items: { name: EpText; rule: EpText }[]; live: EpText; caption: EpText }> = ({ isZh, title, items, live, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const phase = useLoopStep(ref, items.length + 3, 800, items.length + 2);
  const done = Math.min(phase, items.length);
  const isLive = done === items.length;
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div
        ref={ref}
        className="jap-gate"
        role="img"
        aria-label={`${items.map((item) => `${pick(isZh, item.name)}: ${pick(isZh, item.rule)}`).join('; ')} → ${pick(isZh, live)}`}
      >
        <ol className="jap-gate-list" aria-hidden="true">
          {items.map((item, index) => (
            <li key={item.name.en} className={`jap-gate-item${index < done ? ' is-done' : ''}`}>
              <span className="jap-gate-check"><Check size={14} /></span>
              <strong>{pick(isZh, item.name)}</strong>
              <span>{pick(isZh, item.rule)}</span>
            </li>
          ))}
        </ol>
        <div className={`jap-gate-live${isLive ? ' is-live' : ''}`} aria-hidden="true">
          <span className="jap-gate-dot" />
          {pick(isZh, live)}
        </div>
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 3. Horizontal bars that grow when scrolled into view ---------- */

export const ApBars: React.FC<{ isZh: boolean; title: EpText; note?: EpText; rows: { label: EpText; value: number; lead?: boolean }[]; caption: EpText }> = ({ isZh, title, note, rows, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 1600);
  const max = Math.max(...rows.map((row) => row.value));
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}{note && <span>{pick(isZh, note)}</span>}</p>
      <div ref={ref} className="jjc-hbars jap-bars" role="img" aria-label={rows.map((row) => `${pick(isZh, row.label)} ${row.value}`).join(', ')}>
        {rows.map((row) => (
          <div key={row.label.en} className={`jjc-hbar${row.lead ? ' is-lead' : ''}`} aria-hidden="true">
            <span className="jjc-hbar-label">{pick(isZh, row.label)}</span>
            <span className="jjc-hbar-track">
              <span className="jjc-hbar-fill" style={{ width: `${(row.value / max) * 100 * progress}%` }} />
            </span>
            <span className="jjc-hbar-value">{Math.round(row.value * progress).toLocaleString('en-US')}</span>
          </div>
        ))}
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 4. "Who may decide": automatic vs waits-for-a-person, side by side ---------- */

export const ApSplit: React.FC<{ isZh: boolean; title: EpText; auto: EpText[]; human: EpText[]; caption: EpText; heads?: [EpText, EpText] }> = ({ isZh, title, auto, human, caption, heads }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 1400);
  const shownAuto = Math.ceil(progress * auto.length);
  const shownHuman = Math.ceil(progress * human.length);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div ref={ref} className="jap-split">
        <div className="jap-split-col">
          <p className="jap-split-head">{pick(isZh, heads?.[0] ?? { en: 'Happens by itself', zh: '自己发生' })}</p>
          <ul>
            {auto.map((item, index) => <li key={item.en} className={index < shownAuto ? 'is-in' : ''}>{pick(isZh, item)}</li>)}
          </ul>
        </div>
        <div className="jap-split-col is-human">
          <p className="jap-split-head">{pick(isZh, heads?.[1] ?? { en: 'Waits for a person', zh: '等人决定' })}</p>
          <ul>
            {human.map((item, index) => <li key={item.en} className={index < shownHuman ? 'is-in' : ''}>{pick(isZh, item)}</li>)}
          </ul>
        </div>
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};
