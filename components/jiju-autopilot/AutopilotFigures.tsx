/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Figures for /jiju-autopilot (the Jiju full-automation system, for buyers). Same motion rules as the
// system-story set: reveal on scroll, loop only while visible, reduced motion shows the end state.
// Layout CSS: styles/pages/jiju-autopilot.css (.jap-*), reusing .jjc-figure / .jjc-hbar from jiju-charts.css.
// Hues are Jiju's golden-angle palette, one per problem dimension (same order as the banner's stations).

import React from 'react';
import { Check } from 'lucide-react';
import { useCountUp, type EpText } from '../ProductStorePage';
import { useLoopStep } from '../system-story/SystemStory';

const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);
const fmt = (value: number) => Math.round(value).toLocaleString('en-US');

export type ApHue = 'amber' | 'iris' | 'leaf' | 'coral' | 'rose' | 'sky';

/* ---------- 0. The flip: one switch, the same three questions answered by a traditional team and by
   the loop. It flips by itself while on screen until the reader picks a side. ---------- */

export type ApFlipSide = { label: EpText; tone: 'old' | 'new'; items: { value: string; text: EpText }[] };

export const ApFlip: React.FC<{ isZh: boolean; sides: [ApFlipSide, ApFlipSide]; caption: EpText }> = ({ isZh, sides, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const auto = useLoopStep(ref, 2, 3400, 1);
  const [picked, setPicked] = React.useState<number | null>(null);
  const active = picked ?? auto;
  const side = sides[active];
  return (
    <figure className="jjc-figure jap-flip-figure">
      <div ref={ref} className={`jap-flip is-${side.tone}`}>
        <div className="jap-flip-switch" role="group" aria-label={isZh ? '切换对比' : 'Switch the comparison'}>
          {sides.map((item, index) => (
            <button key={item.label.en} type="button" aria-pressed={index === active} className={index === active ? 'is-active' : ''} onClick={() => setPicked(index)}>
              {pick(isZh, item.label)}
            </button>
          ))}
          <span className="jap-flip-thumb" aria-hidden="true" style={{ transform: `translateX(${active * 100}%)` }} />
        </div>
        <dl className="jap-flip-items" aria-live="polite">
          {side.items.map((item) => (
            <div key={item.text.en} className="jap-flip-item">
              <dt>{item.value}</dt>
              <dd>{pick(isZh, item.text)}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 0b. Last 30 days of machine work, turned into working days: one square per person-day ---------- */

export const ApWorkload: React.FC<{
  isZh: boolean;
  title: EpText;
  rows: { icon: React.ReactNode; value: number; text: EpText; minutes: number }[];
  dayLabel: EpText;
  totalText: (days: number, people: string) => EpText;
  caption: EpText;
}> = ({ isZh, title, rows, dayLabel, totalText, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 2600);
  const days = Math.round(rows.reduce((sum, row) => sum + row.value * row.minutes, 0) / 60 / 8);
  const people = (days / 22).toFixed(1);
  const lit = Math.round(days * progress);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div ref={ref} className="jap-work">
        <ul className="jap-work-rows">
          {rows.map((row) => (
            <li key={row.text.en}>
              <span className="jap-work-icon" aria-hidden="true">{row.icon}</span>
              <b>{fmt(row.value * progress)}</b>
              <span>{pick(isZh, row.text)}</span>
              <small>{isZh ? `人手约 ${row.minutes} 分钟 / 件` : `~${row.minutes} min each by hand`}</small>
            </li>
          ))}
        </ul>
        <div className="jap-work-days">
          <div className="jap-work-grid" role="img" aria-label={pick(isZh, totalText(days, people))}>
            {Array.from({ length: days }, (_, index) => <i key={index} className={index < lit ? 'is-on' : ''} />)}
          </div>
          <p className="jap-work-total"><b>{fmt(lit)}</b> {pick(isZh, dayLabel)}</p>
          <p className="jap-work-people">{pick(isZh, totalText(days, people))}</p>
        </div>
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 0c. What a team would cost vs what the system costs, per month ---------- */

export const ApTeamCost: React.FC<{
  isZh: boolean;
  title: EpText;
  heads: [EpText, EpText];
  roles: { role: EpText; monthly: number }[];
  onCost: { rate: number; text: EpText };
  system: { item: EpText; monthly: number }[];
  savedText: EpText;
  caption: EpText;
}> = ({ isZh, title, heads, roles, onCost, system, savedText, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 2400);
  const salaries = roles.reduce((sum, row) => sum + row.monthly, 0);
  const team = Math.round(salaries * (1 + onCost.rate));
  const sys = Math.round(system.reduce((sum, row) => sum + row.monthly, 0));
  const saved = (team - sys) * 12;
  const rm = (value: number) => `RM ${fmt(value)}`;
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div ref={ref} className="jap-cost">
        <div className="jap-cost-col is-old">
          <p className="jap-cost-head">{pick(isZh, heads[0])}</p>
          <ul>
            {roles.map((row, index) => (
              <li key={row.role.en} className={index < Math.ceil(progress * roles.length) ? 'is-in' : ''}>
                <span className="jap-cost-person" aria-hidden="true" />
                <span>{pick(isZh, row.role)}</span>
                <b>{rm(row.monthly)}</b>
              </li>
            ))}
            <li className={`jap-cost-extra${progress >= 1 ? ' is-in' : ''}`}>
              <span />
              <span>{pick(isZh, onCost.text)}</span>
              <b>{rm(team - salaries)}</b>
            </li>
          </ul>
          <p className="jap-cost-sum"><b>{rm(team * progress)}</b>{isZh ? ' / 月' : ' / month'}</p>
        </div>
        <div className="jap-cost-col is-new">
          <p className="jap-cost-head">{pick(isZh, heads[1])}</p>
          <ul>
            {system.map((row, index) => (
              <li key={row.item.en} className={index < Math.ceil(progress * system.length) ? 'is-in' : ''}>
                <span className="jap-cost-dot" aria-hidden="true" />
                <span>{pick(isZh, row.item)}</span>
                <b>{rm(row.monthly)}</b>
              </li>
            ))}
          </ul>
          <p className="jap-cost-sum"><b>{rm(sys * progress)}</b>{isZh ? ' / 月' : ' / month'}</p>
        </div>
      </div>
      <div className="jap-cost-bars" role="img" aria-label={`${pick(isZh, heads[0])} ${rm(team)}; ${pick(isZh, heads[1])} ${rm(sys)}; ${pick(isZh, savedText)} ${rm(saved)}`}>
        <span className="jap-cost-barrow" aria-hidden="true">
          <small>{pick(isZh, heads[0])}</small>
          <span className="jap-cost-bar is-old"><i style={{ transform: `scaleX(${progress})` }} /></span>
        </span>
        <span className="jap-cost-barrow" aria-hidden="true">
          <small>{pick(isZh, heads[1])} · {isZh ? `约 1/${Math.round(team / sys)}` : `about 1/${Math.round(team / sys)}`}</small>
          <span className="jap-cost-bar is-new"><i style={{ transform: `scaleX(${(sys / team) * progress})` }} /></span>
        </span>
        <p className="jap-cost-saved" aria-hidden="true">{pick(isZh, savedText)} <b>{rm(saved * progress)}</b></p>
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 0d. One campaign × many operators: every field to confirm is a dot. The loop checks them
   all, field by field; only the few that fail go to a person. (Which dots fail is illustrative.) ---------- */

export const ApFieldGrid: React.FC<{
  isZh: boolean;
  title: EpText;
  operators: number;
  fields: EpText[];
  stuck: [number, number][];
  handText: EpText;
  loopText: EpText;
  personText: EpText;
  caption: EpText;
}> = ({ isZh, title, operators, fields, stuck, handText, loopText, personText, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 3200);
  const total = operators * fields.length;
  const stuckSet = new Set(stuck.map(([field, op]) => `${field}:${op}`));
  const checked = Math.round(progress * total);
  const passed = total - stuck.length;
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div
        ref={ref}
        className="jap-fields"
        role="img"
        aria-label={`${fmt(total)} ${pick(isZh, handText)}; ${fmt(passed)} ${pick(isZh, loopText)}; ${stuck.length} ${pick(isZh, personText)}`}
      >
        {fields.map((field, f) => (
          <div key={field.en} className="jap-fields-row" aria-hidden="true">
            <span className="jap-fields-name">{pick(isZh, field)}</span>
            <span className="jap-fields-dots" style={{ gridTemplateColumns: `repeat(${operators}, minmax(0, 1fr))` }}>
              {Array.from({ length: operators }, (_, op) => {
                const done = f * operators + op < checked;
                const isStuck = stuckSet.has(`${f}:${op}`);
                return <i key={op} className={done ? (isStuck ? 'is-stuck' : 'is-ok') : ''} />;
              })}
            </span>
          </div>
        ))}
        <div className="jap-fields-sum" aria-hidden="true">
          <p className="is-old"><b>{fmt(total)}</b> {pick(isZh, handText)}</p>
          <p className="is-new"><b>{fmt(Math.min(passed, checked))}</b> {pick(isZh, loopText)}</p>
          <p className="is-person"><b>{progress >= 1 ? stuck.length : 0}</b> {pick(isZh, personText)}</p>
        </div>
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 1. Six problem dimensions: cards turn over one by one, each with a real number ---------- */

export type ApProblem = { id: string; hue: ApHue; icon: React.ReactNode; dim: EpText; pain: EpText; value?: number; unit?: EpText; scale: EpText };

export const ApProblems: React.FC<{ isZh: boolean; items: ApProblem[]; caption: EpText }> = ({ isZh, items, caption }) => {
  const ref = React.useRef<HTMLUListElement | null>(null);
  const progress = useCountUp(ref, 2200);
  const shown = progress * items.length;
  return (
    <figure className="jjc-figure jap-problems-figure">
      <ul ref={ref} className="jap-problems">
        {items.map((item, index) => {
          const local = Math.max(0, Math.min(1, shown - index));
          return (
            <li key={item.id} className={`jap-problem jap-hue-${item.hue}${local > 0 ? ' is-in' : ''}`}>
              <span className="jap-problem-icon" aria-hidden="true">{item.icon}</span>
              <span className="jap-problem-dim">{pick(isZh, item.dim)}</span>
              <strong className="jap-problem-pain">{pick(isZh, item.pain)}</strong>
              <span className="jap-problem-scale">
                {item.value !== undefined && (
                  <>
                    <b aria-hidden="true">{fmt(item.value * local)}{item.unit ? ` ${pick(isZh, item.unit)}` : ''}</b>
                    <span className="jap-sr">{fmt(item.value)}{item.unit ? ` ${pick(isZh, item.unit)}` : ''}</span>
                    {' '}
                  </>
                )}
                {pick(isZh, item.scale)}
              </span>
            </li>
          );
        })}
      </ul>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 2. The closed loop: six stages on a ring, a runner goes round, tap to stop on one ---------- */

export type ApStage = { id: string; hue: ApHue; icon: React.ReactNode; name: EpText; dim: EpText; text: EpText; machines: EpText[] };

export const ApLoop: React.FC<{ isZh: boolean; title: EpText; stages: ApStage[]; center: { title: EpText; text: EpText }; caption: EpText }> = ({ isZh, title, stages, center, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const auto = useLoopStep(ref, stages.length, 2600, 0);
  const [pinned, setPinned] = React.useState<number | null>(null);
  const active = pinned ?? auto;
  const stage = stages[active];
  const turn = 360 / stages.length;
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div ref={ref} className="jap-loop">
        <div className="jap-loop-ring" aria-hidden="true">
          <span className="jap-loop-runner" style={{ transform: `rotate(${active * turn}deg)` }}><i /></span>
        </div>
        <div className="jap-loop-center">
          <strong>{pick(isZh, center.title)}</strong>
          <span>{pick(isZh, center.text)}</span>
        </div>
        {stages.map((item, index) => {
          const angle = ((-90 + index * turn) * Math.PI) / 180;
          return (
            <button
              key={item.id}
              type="button"
              className={`jap-loop-stage jap-hue-${item.hue}${index === active ? ' is-active' : ''}`}
              style={{ left: `${50 + 38 * Math.cos(angle)}%`, top: `${50 + 38 * Math.sin(angle)}%` }}
              aria-pressed={index === active}
              onClick={() => setPinned(pinned === index ? null : index)}
            >
              <span className="jap-loop-disc" aria-hidden="true">{item.icon}</span>
              <span className="jap-loop-name">{index + 1}. {pick(isZh, item.name)}</span>
            </button>
          );
        })}
      </div>
      <div className={`jap-loop-detail jap-hue-${stage.hue}`}>
        <p className="jap-loop-detail-head">
          <span className="jap-chip is-hue">{pick(isZh, stage.dim)}</span>
          <strong>{active + 1}. {pick(isZh, stage.name)}</strong>
        </p>
        <p>{pick(isZh, stage.text)}</p>
        <p className="jap-loop-machines">
          {stage.machines.map((machine) => <span key={machine.en} className="jap-chip">{pick(isZh, machine)}</span>)}
        </p>
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 2b. Traditional company vs the closed loop ----------
   Left: a line of people handing work on; the dot stops and waits at every hand-off and the line ends
   at "goes stale" with no way back. Right: the same six stages as a ring, the dot never stops.
   Below: one row per problem — who does it and how often, in each world. */

export type ApCompareRow = { id: string; hue: ApHue; dim: EpText; old: EpText; loop: EpText };

export const ApCompare: React.FC<{
  isZh: boolean;
  title: EpText;
  heads: [EpText, EpText];
  roles: EpText[];
  stale: EpText;
  wait: EpText;
  stages: { hue: ApHue; name: EpText }[];
  rows: ApCompareRow[];
  caption: EpText;
}> = ({ isZh, title, heads, roles, stale, wait, stages, rows, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  // line: role 0, wait, role 1, wait … role n-1, stale  → 2n steps; reduced motion parks on "stale"
  const lineSteps = roles.length * 2;
  const step = useLoopStep(ref, lineSteps, 1100, lineSteps - 1);
  const atRole = step % 2 === 0 ? step / 2 : -1;
  const waitingAfter = step % 2 === 1 && step < lineSteps - 1 ? (step - 1) / 2 : -1;
  const isStale = step === lineSteps - 1;
  const ring = step % stages.length;
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(listRef, 2000);
  const shown = Math.ceil(progress * rows.length);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div ref={ref} className="jap-vs">
        <div className="jap-vs-side is-old" role="img" aria-label={`${pick(isZh, heads[0])}: ${roles.map((role) => pick(isZh, role)).join(' → ')} → ${pick(isZh, stale)}`}>
          <p className="jap-vs-head" aria-hidden="true">{pick(isZh, heads[0])}</p>
          <ol className="jap-vs-line" aria-hidden="true">
            {roles.map((role, index) => (
              <li key={role.en} className={`${index === atRole ? 'is-current' : ''}${index < atRole || isStale || waitingAfter >= index ? ' is-done' : ''}`}>
                <span className="jap-vs-person" />
                <span className="jap-vs-role">{pick(isZh, role)}</span>
                {index < roles.length - 1 && <span className={`jap-vs-wait${waitingAfter === index ? ' is-on' : ''}`}>{pick(isZh, wait)}</span>}
              </li>
            ))}
            <li className={`jap-vs-stale${isStale ? ' is-on' : ''}`}><span>{pick(isZh, stale)}</span></li>
          </ol>
        </div>
        <div className="jap-vs-side is-loop" role="img" aria-label={`${pick(isZh, heads[1])}: ${stages.map((stage) => pick(isZh, stage.name)).join(' → ')} → ${pick(isZh, stages[0].name)}`}>
          <p className="jap-vs-head" aria-hidden="true">{pick(isZh, heads[1])}</p>
          <div className="jap-vs-ring" aria-hidden="true">
            {stages.map((stage, index) => {
              const angle = ((-90 + index * (360 / stages.length)) * Math.PI) / 180;
              return (
                <span
                  key={stage.name.en}
                  className={`jap-vs-stop jap-hue-${stage.hue}${index === ring ? ' is-current' : ''}`}
                  style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
                >
                  <i />
                  <span>{pick(isZh, stage.name)}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div ref={listRef} className="jap-vs-rows">
        <div className="jap-vs-row is-head" aria-hidden="true">
          <span />
          <span>{pick(isZh, heads[0])}</span>
          <span>{pick(isZh, heads[1])}</span>
        </div>
        {rows.map((row, index) => (
          <div key={row.id} className={`jap-vs-row jap-hue-${row.hue}${index < shown ? ' is-in' : ''}`}>
            <span className="jap-chip is-hue">{pick(isZh, row.dim)}</span>
            <span className="jap-vs-old"><span className="jap-vs-tag">{pick(isZh, heads[0])}: </span><span className="jap-vs-text">{pick(isZh, row.old)}</span></span>
            <span className="jap-vs-new"><span className="jap-vs-tag">{pick(isZh, heads[1])}: </span>{pick(isZh, row.loop)}</span>
          </div>
        ))}
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 3. Dimension × machine grid: which machines cover which problem; rows light up in turn ---------- */

export type ApMatrixCol = { id: string; icon: React.ReactNode; name: EpText };
export type ApMatrixRow = { id: string; hue: ApHue; dim: EpText; cols: string[] };

export const ApMatrix: React.FC<{ isZh: boolean; title: EpText; cols: ApMatrixCol[]; rows: ApMatrixRow[]; caption: EpText }> = ({ isZh, title, cols, rows, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const step = useLoopStep(ref, rows.length + 1, 1500, rows.length);
  const label = rows
    .map((row) => `${pick(isZh, row.dim)}: ${cols.filter((col) => row.cols.includes(col.id)).map((col) => pick(isZh, col.name)).join(', ')}`)
    .join('. ');
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <div ref={ref} className="jap-matrix" role="img" aria-label={label}>
        <div className="jap-matrix-row is-head" aria-hidden="true">
          <span />
          {cols.map((col, index) => <span key={col.id} className="jap-matrix-col" title={pick(isZh, col.name)}>{col.icon}<small>{index + 1}</small></span>)}
        </div>
        {rows.map((row, index) => (
          <div key={row.id} className={`jap-matrix-row jap-hue-${row.hue}${step === rows.length || index === step ? ' is-lit' : ''}${index === step ? ' is-current' : ''}`} aria-hidden="true">
            <span className="jap-matrix-dim">{pick(isZh, row.dim)}</span>
            {cols.map((col) => <span key={col.id} className={`jap-matrix-cell${row.cols.includes(col.id) ? ' is-on' : ''}`}><i /></span>)}
          </div>
        ))}
      </div>
      <ol className="jap-matrix-legend" aria-hidden="true">
        {cols.map((col, index) => <li key={col.id}><small>{index + 1}</small>{col.icon}{pick(isZh, col.name)}</li>)}
      </ol>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 4. Weekly columns that grow when scrolled into view (real series) ---------- */

export const ApColumns: React.FC<{
  isZh: boolean;
  title: EpText;
  note?: EpText;
  values: number[];
  labels: { at: number; text: EpText }[];
  ariaLabel: EpText;
  caption?: EpText;
}> = ({ isZh, title, note, values, labels, ariaLabel, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 1800);
  const max = Math.max(...values);
  const last = values.length - 1;
  return (
    <figure className="jjc-figure jap-cols-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}{note && <span>{pick(isZh, note)}</span>}</p>
      <div ref={ref} className="jap-cols" role="img" aria-label={pick(isZh, ariaLabel)}>
        <span className="jap-cols-peak" aria-hidden="true">{fmt(values[last] * progress)}</span>
        <div className="jap-cols-plot" aria-hidden="true">
          {values.map((value, index) => (
            <span key={index} className={`jap-col${index === last ? ' is-lead' : ''}`}>
              <i style={{ transform: `scaleY(${Math.max(0.004, (value / max) * progress)})` }} />
            </span>
          ))}
        </div>
        <div className="jap-cols-axis" aria-hidden="true">
          {labels.map((label) => (
            <span key={label.at} style={{ left: `${((label.at + 0.5) / values.length) * 100}%` }}>{pick(isZh, label.text)}</span>
          ))}
        </div>
      </div>
      {caption && <figcaption>{pick(isZh, caption)}</figcaption>}
    </figure>
  );
};

/* ---------- 5. The ten machines: pick one, its real rules open underneath ---------- */

export type ApMachine = { id: string; hue: ApHue; icon: React.ReactNode; name: EpText; solves: EpText[]; text: EpText; detail: React.ReactNode; status?: EpText; live?: boolean };

export const ApMachineDeck: React.FC<{ isZh: boolean; machines: ApMachine[]; hint: EpText }> = ({ isZh, machines, hint }) => {
  const [active, setActive] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const machine = machines[active];
  const onKey = (event: React.KeyboardEvent, index: number) => {
    const move = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!move) return;
    event.preventDefault();
    const next = (index + move + machines.length) % machines.length;
    setActive(next);
    tabs.current[next]?.focus();
  };
  return (
    <div className="jap-deck">
      <p className="jap-deck-hint">{pick(isZh, hint)}</p>
      <div className="jap-deck-tabs" role="tablist" aria-label={isZh ? '十台机器' : 'The ten machines'}>
        {machines.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => { tabs.current[index] = node; }}
            type="button"
            role="tab"
            id={`ap-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls="ap-machine-panel"
            tabIndex={index === active ? 0 : -1}
            className={`jap-deck-tab jap-hue-${item.hue}${index === active ? ' is-active' : ''}`}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKey(event, index)}
          >
            <span className="jap-deck-icon" aria-hidden="true">{item.icon}</span>
            <strong>{pick(isZh, item.name)}</strong>
            <span className="jap-deck-solves">{item.solves.map((dim) => pick(isZh, dim)).join(' · ')}</span>
            {item.status && <span className={`jap-status${item.live ? ' is-live' : ''}`}>{pick(isZh, item.status)}</span>}
          </button>
        ))}
      </div>
      <div className={`jap-deck-panel jap-hue-${machine.hue}`} role="tabpanel" id="ap-machine-panel" aria-labelledby={`ap-tab-${machine.id}`}>
        <p className="jap-deck-panel-head">
          <span className="jap-deck-icon" aria-hidden="true">{machine.icon}</span>
          <strong>{pick(isZh, machine.name)}</strong>
          {machine.solves.map((dim) => <span key={dim.en} className="jap-chip is-hue">{pick(isZh, dim)}</span>)}
          {machine.status && <span className={`jap-status${machine.live ? ' is-live' : ''}`}>{pick(isZh, machine.status)}</span>}
        </p>
        <p className="jap-deck-panel-text">{pick(isZh, machine.text)}</p>
        <div key={machine.id}>{machine.detail}</div>
      </div>
    </div>
  );
};

/* ---------- 6. Numbered steps (the same look as the page's own steps block) ---------- */

export const ApSteps: React.FC<{ isZh: boolean; items: { title: EpText; text: EpText }[] }> = ({ isZh, items }) => (
  <ol className="ep-steps">
    {items.map((item) => (
      <li key={item.title.en}>
        <strong>{pick(isZh, item.title)}</strong>
        <p>{pick(isZh, item.text)}</p>
      </li>
    ))}
  </ol>
);

/* ---------- 7. The publish gate: five items tick one by one, then the place goes live ---------- */

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

/* ---------- 8. Horizontal bars that grow when scrolled into view ---------- */

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
            <span className="jjc-hbar-value">{fmt(row.value * progress)}</span>
          </div>
        ))}
      </div>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 9. "Who may decide": automatic vs waits-for-a-person, side by side ---------- */

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
