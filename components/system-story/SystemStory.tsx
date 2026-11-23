/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Data-driven "how it works behind the scenes" figures for product pages, written for readers with
// no AI / IT background (system-story skill). The Jiju page was the first one (components/JijuStory.tsx);
// this is the same set made generic so /dr-racing, /life-os and /etreporthub feed it their own data
// (components/system-story/stories/*.ts). Layout CSS is shared with Jiju: styles/pages/jiju-charts.css
// (.jjc-* / .jjs-*). Motion: reveal on scroll, loops only while visible, reduced motion shows the end.

import React from 'react';
import { Bot } from 'lucide-react';
import { useCountUp, type EpText } from '../ProductStorePage';

export type SsArt = React.FC<{ label: string }>;
export type SsBelief = { Art: SsArt; title: EpText; text: EpText };
export type SsJourneyStep = { icon: React.ReactNode; you: EpText; behind: EpText };
export type SsFlowNode = {
  id: string;
  kind: 'start' | 'step' | 'ask' | 'end';
  text: EpText;
  down?: EpText;
  side?: { id: string; label: EpText; text: EpText };
};
export type SsExample = { title: EpText; path: string[] };
export type SsScheduleRow = { at: string | EpText; job: EpText; where: EpText };
export type SsTerm = { icon: React.ReactNode; term: EpText; text: EpText };

type Base = { isZh: boolean };
const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);
const at = (isZh: boolean, value: string | EpText) => (typeof value === 'string' ? value : pick(isZh, value));

const useLoopStep = (ref: React.RefObject<HTMLElement | null>, count: number, ms: number, still: number) => {
  const [step, setStep] = React.useState(still);
  React.useEffect(() => {
    const node = ref.current;
    if (typeof window === 'undefined' || !node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setStep(still);
      return;
    }
    let timer = 0;
    const stop = () => { if (timer) window.clearInterval(timer); timer = 0; };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (!timer) {
          setStep(0);
          timer = window.setInterval(() => setStep((value) => (value + 1) % count), ms);
        }
      } else {
        stop();
      }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => { observer.disconnect(); stop(); };
  }, [ref, count, ms, still]);
  return step;
};

/** Banner illustration with a one-line caption under it. */
export const SsHero: React.FC<Base & { Art: SsArt; label: EpText; caption: EpText }> = ({ isZh, Art, label, caption }) => (
  <figure className="jjs-hero-art">
    <Art label={pick(isZh, label)} />
    <figcaption>{pick(isZh, caption)}</figcaption>
  </figure>
);

export const SsBeliefs: React.FC<Base & { title: EpText; items: SsBelief[] }> = ({ isZh, title, items }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 1400);
  const shown = Math.ceil(progress * items.length);
  return (
    <figure className="jjc-figure jjs-beliefs-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div ref={ref} className="jjs-beliefs">
        {items.map((belief, index) => (
          <article key={belief.title.en} className={`jjs-belief${index < shown ? ' is-in' : ''}`}>
            <span className="jjs-belief-art"><belief.Art label="" /></span>
            <h3>{pick(isZh, belief.title)}</h3>
            <p>{pick(isZh, belief.text)}</p>
          </article>
        ))}
      </div>
    </figure>
  );
};

export const SsJourney: React.FC<Base & { title: EpText; youLabel: EpText; steps: SsJourneyStep[]; caption: EpText }> = ({ isZh, title, youLabel, steps, caption }) => {
  const ref = React.useRef<HTMLOListElement | null>(null);
  const active = useLoopStep(ref, steps.length, 2200, -1);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">
        {pick(isZh, title)}
        <span className="jjs-legend">
          <i className="jjs-dot jjs-dot-you" aria-hidden="true" />{pick(isZh, youLabel)}
          <i className="jjs-dot jjs-dot-behind" aria-hidden="true" />{pick(isZh, { en: 'behind the scenes', zh: '幕后' })}
        </span>
      </p>
      <ol
        ref={ref}
        className="jjs-journey"
        aria-label={steps.map((step, index) => `${index + 1}. ${pick(isZh, step.you)} — ${pick(isZh, step.behind)}`).join(' ')}
      >
        {steps.map((step, index) => (
          <li key={step.you.en} className={`jjs-journey-step${index === active ? ' is-active' : ''}`} aria-hidden="true">
            <span className="jjs-journey-no">{index + 1}</span>
            <div className="jjs-journey-you">
              <span className="jjs-journey-icon">{step.icon}</span>
              <strong>{pick(isZh, step.you)}</strong>
            </div>
            <div className="jjs-journey-behind">
              <Bot size={15} aria-hidden="true" />
              <span>{pick(isZh, step.behind)}</span>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

export const SsFlow: React.FC<Base & { title: EpText; nodes: SsFlowNode[]; examples: SsExample[]; ariaLabel: EpText; caption: EpText }> = ({ isZh, title, nodes, examples, ariaLabel, caption }) => {
  const frames = React.useMemo(() => examples.flatMap((example, exampleIndex) => [
    ...example.path.map((_, stepIndex) => ({ exampleIndex, stepIndex })),
    { exampleIndex, stepIndex: example.path.length - 1 },
  ]), [examples]);
  const ref = React.useRef<HTMLDivElement | null>(null);
  // Reduced motion pins the end of example 1 (the full path).
  const frameIndex = useLoopStep(ref, frames.length, 900, examples[0].path.length);
  const frame = frames[frameIndex] ?? frames[frames.length - 1];
  const example = examples[frame.exampleIndex];
  const visited = new Set(example.path.slice(0, frame.stepIndex + 1));
  const current = example.path[frame.stepIndex];
  const state = (id: string) => `${visited.has(id) ? ' is-visited' : ''}${current === id ? ' is-current' : ''}`;
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <p className="jjs-example" aria-live="off">{pick(isZh, example.title)}</p>
      <div ref={ref} className="jjs-flow" role="img" aria-label={pick(isZh, ariaLabel)}>
        {nodes.map((node, index) => (
          <div key={node.id} className="jjs-flow-row" aria-hidden="true">
            <div className={`jjs-node jjs-node-${node.kind}${state(node.id)}`}>
              {node.kind === 'ask' && <span className="jjs-node-q">?</span>}
              {pick(isZh, node.text)}
            </div>
            {node.side && (
              <div className={`jjs-side${state(node.side.id)}`}>
                <span className="jjs-side-label">{pick(isZh, node.side.label)} →</span>
                <span className="jjs-side-box">{pick(isZh, node.side.text)}</span>
              </div>
            )}
            {index < nodes.length - 1 && (
              <span className={`jjs-flow-arrow${visited.has(nodes[index + 1].id) ? ' is-visited' : ''}`}>
                {node.down ? pick(isZh, node.down) : ''}
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

export const SsSchedule: React.FC<Base & { title: EpText; note: EpText; rows: SsScheduleRow[]; last: { at: EpText; job: EpText; where: EpText }; caption: EpText }> = ({ isZh, title, note, rows, last, caption }) => {
  const ref = React.useRef<HTMLOListElement | null>(null);
  const phase = useLoopStep(ref, rows.length + 3, 650, rows.length + 2);
  const done = Math.min(phase, rows.length);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}<span>{pick(isZh, note)}</span></p>
      <ol ref={ref} className="jjc-night" aria-label={rows.map((row) => `${at(isZh, row.at)} ${pick(isZh, row.job)} (${pick(isZh, row.where)})`).join('; ')}>
        {rows.map((row, index) => (
          <li key={row.job.en} className={`jjc-night-row${index < done ? ' is-done' : ''}${index === done ? ' is-running' : ''}`} aria-hidden="true">
            <span className="jjc-night-at">{at(isZh, row.at)}</span>
            <span className="jjc-night-check">✓</span>
            <span className="jjc-night-job">{pick(isZh, row.job)}</span>
            <span className="jjc-night-where">{pick(isZh, row.where)}</span>
          </li>
        ))}
        <li className={`jjc-night-row jjc-night-morning${done === rows.length ? ' is-done' : ''}`} aria-hidden="true">
          <span className="jjc-night-at">{pick(isZh, last.at)}</span>
          <span className="jjc-night-check">✓</span>
          <span className="jjc-night-job">{pick(isZh, last.job)}</span>
          <span className="jjc-night-where">{pick(isZh, last.where)}</span>
        </li>
      </ol>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

export const SsGlossary: React.FC<Base & { terms: SsTerm[] }> = ({ isZh, terms }) => (
  <figure className="jjc-figure">
    <p className="jjc-figure-title">{pick(isZh, { en: 'Words on this page, in plain language', zh: '这一段用到的词，白话版' })}</p>
    <dl className="jjs-terms">
      {terms.map((term) => (
        <div key={term.term.en} className="jjs-term">
          <dt><span aria-hidden="true">{term.icon}</span>{pick(isZh, term.term)}</dt>
          <dd>{pick(isZh, term.text)}</dd>
        </div>
      ))}
    </dl>
  </figure>
);
