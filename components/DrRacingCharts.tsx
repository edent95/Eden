/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Animated charts for the /dr-racing product page. Every number here is counted from the
// edent95/DrRacing git history on origin/main (2026-11-18); see the log entry for how.
// Bars and lines grow once when scrolled into view (useCountUp, which already honours
// prefers-reduced-motion); the two looping diagrams step with useLoopStep and CSS transitions
// (drracing-charts.css), and stop when scrolled away or when reduced motion is on.

import React from 'react';
import { useCountUp, type EpText } from './ProductStorePage';

type Props = { isZh: boolean };
const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);

/** Steps 0..count-1 every `ms` while the element is on screen; reduced motion pins `still`. */
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
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => { observer.disconnect(); stop(); };
  }, [ref, count, ms, still]);
  return step;
};

/* ---------- 1. How one deal moves (looping diagram, illustrative) ---------- */

const FLOW_STAGES: EpText[] = [
  { en: 'Lead', zh: 'Lead' },
  { en: 'Apply', zh: '申请' },
  { en: 'Banks', zh: '银行' },
  { en: 'Deliver', zh: '交车' },
  { en: 'Settle', zh: '结算' },
];

// Phases: lead, apply, bank A rejects, bank B rejects, bank C approves, deliver, settle, (hold).
const FLOW_STOP = [0, 1, 2, 2, 2, 3, 4, 4];
const BANKS = [
  { name: 'A', ok: false },
  { name: 'B', ok: false },
  { name: 'C', ok: true },
];

export const DrRacingDealFlow: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const phase = useLoopStep(ref, FLOW_STOP.length, 1100, FLOW_STOP.length - 1);
  const stop = FLOW_STOP[phase];
  const banksShown = phase >= 2 ? Math.min(phase - 1, 3) : 0;
  return (
    <figure className="drc-figure">
      <div
        ref={ref}
        className="drc-flow"
        role="img"
        aria-label={pick(isZh, {
          en: 'Animated diagram: a deal moves from lead to application, is sent to three banks at once (two reject, one approves), then goes to delivery and settlement.',
          zh: '动画示意：一单从 lead 走到申请，同时送三家银行（两家拒、一家批），再走到交车和结算。',
        })}
      >
        <div className="drc-flow-track" aria-hidden="true">
          <span className="drc-flow-rail" />
          <span className="drc-flow-rail-fill" style={{ transform: `scaleX(${stop / 4})` }} />
          <span className="drc-flow-token-lane" style={{ transform: `translateX(${stop * 20}%)` }}>
            <span className="drc-flow-token" />
          </span>
          {FLOW_STAGES.map((stage, index) => (
            <div key={stage.en} className={`drc-flow-stop${index <= stop ? ' is-reached' : ''}`}>
              <span className="drc-flow-dot" />
              <span className="drc-flow-label">{pick(isZh, stage)}</span>
              {index === 2 && (
                <span className="drc-flow-banks">
                  {BANKS.map((bank, bankIndex) => (
                    <span
                      key={bank.name}
                      className={`drc-bank ${bank.ok ? 'drc-bank-yes' : 'drc-bank-no'}${bankIndex < banksShown ? ' is-in' : ''}`}
                    >
                      {bank.name} {bank.ok ? '✓' : '✕'}
                    </span>
                  ))}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption>
        {pick(isZh, {
          en: 'Illustration: one file goes to three banks at once; the follow-up card tracks which ones have answered.',
          zh: '示意：一份申请同时送三家银行，跟进卡记着哪几家已经回复。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 2. Changes merged per month (bars) ---------- */

const MONTHS: { label: EpText; value: number; partial?: boolean }[] = [
  { label: { en: 'Jun', zh: '6 月' }, value: 25, partial: true },
  { label: { en: 'Jul', zh: '7 月' }, value: 107 },
  { label: { en: 'Aug', zh: '8 月' }, value: 33 },
  { label: { en: 'Sep', zh: '9 月' }, value: 53 },
  { label: { en: 'Oct', zh: '10 月' }, value: 205 },
  { label: { en: 'Nov', zh: '11 月' }, value: 47, partial: true },
];

export const DrRacingMonthlyChanges: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 1600);
  const max = Math.max(...MONTHS.map((month) => month.value));
  const total = MONTHS.reduce((sum, month) => sum + month.value, 0);
  return (
    <figure className="drc-figure">
      <p className="drc-figure-title">
        {pick(isZh, { en: 'Changes merged into main, per month', zh: '每个月合进正式版本的改动' })}
        <span>{pick(isZh, { en: `${total} in total`, zh: `共 ${total} 个` })}</span>
      </p>
      <div
        ref={ref}
        className="drc-bars"
        role="img"
        aria-label={MONTHS.map((month) => `${pick(isZh, month.label)} ${month.value}`).join(', ')}
      >
        {MONTHS.map((month) => (
          <div key={month.label.en} className={`drc-bar${month.value === max ? ' is-peak' : ''}`} aria-hidden="true">
            <span className="drc-bar-value">{Math.round(month.value * progress)}</span>
            <span className="drc-bar-col" style={{ height: `${(month.value / max) * 100 * progress}%` }} title={`${pick(isZh, month.label)}: ${month.value}`} />
            <span className="drc-bar-label">{pick(isZh, month.label)}{month.partial ? '*' : ''}</span>
          </div>
        ))}
      </div>
      <figcaption>
        {pick(isZh, {
          en: '* June counts one day (work began on 30 June); November runs to the 18th. October is when delivery, stock, the ledger sync and commission tiers all landed.',
          zh: '* 6 月只有一天（6 月 30 日开工）；11 月算到 18 日。10 月最多，是交车 checklist、库存、账本同步、佣金分级一起上线的那个月。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 3. How the safety net grew (two small line charts) ---------- */

// Snapshots of origin/main at each date. rules = firestore.rules + storage.rules lines;
// tests = tests/unit/*.test.ts + tests/e2e/*.spec.ts files.
const GROWTH: { date: string; rules: number; tests: number }[] = [
  { date: '2026-07-15', rules: 313, tests: 0 },
  { date: '2026-07-31', rules: 1589, tests: 7 },
  { date: '2026-08-15', rules: 1765, tests: 12 },
  { date: '2026-08-31', rules: 1765, tests: 15 },
  { date: '2026-09-15', rules: 1765, tests: 15 },
  { date: '2026-09-30', rules: 1985, tests: 38 },
  { date: '2026-10-15', rules: 2123, tests: 68 },
  { date: '2026-10-31', rules: 2751, tests: 114 },
  { date: '2026-11-18', rules: 2913, tests: 133 },
];

const dayIndex = (date: string) => (Date.parse(date) - Date.parse('2026-07-15')) / 86400000;
const LAST_DAY = dayIndex(GROWTH[GROWTH.length - 1].date);

const MiniLine: React.FC<{
  isZh: boolean;
  title: EpText;
  unit: EpText;
  field: 'rules' | 'tests';
  progress: number;
  tone: 'primary' | 'second';
}> = ({ isZh, title, unit, field, progress, tone }) => {
  const W = 300;
  const H = 130;
  const pad = { l: 6, r: 6, t: 14, b: 22 };
  const max = Math.max(...GROWTH.map((row) => row[field]));
  const points = GROWTH.map((row) => ({
    x: pad.l + (dayIndex(row.date) / LAST_DAY) * (W - pad.l - pad.r),
    y: pad.t + (1 - row[field] / max) * (H - pad.t - pad.b),
    row,
  }));
  const path = points.map((p, index) => `${index ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${path} L${points[points.length - 1].x.toFixed(1)},${H - pad.b} L${points[0].x.toFixed(1)},${H - pad.b} Z`;
  const first = GROWTH[0][field];
  const last = GROWTH[GROWTH.length - 1][field];
  const shown = Math.round(first + (last - first) * progress);
  return (
    <div className={`drc-mini drc-mini-${tone}`}>
      <p className="drc-mini-title">{pick(isZh, title)}</p>
      <p className="drc-mini-value">
        <strong>{shown.toLocaleString('en-US')}</strong> <span>{pick(isZh, unit)}</span>
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${pick(isZh, title)}: ${GROWTH.map((row) => `${row.date} ${row[field]}`).join(', ')}`}
      >
        <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} className="drc-axis" />
        <path d={area} className="drc-area" style={{ opacity: progress }} />
        <path d={path} className="drc-line" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - progress }} />
        {points.map((p) => (
          <circle key={p.row.date} cx={p.x} cy={p.y} r={3} className="drc-point" style={{ opacity: progress >= dayIndex(p.row.date) / LAST_DAY ? 1 : 0 }}>
            <title>{`${p.row.date}: ${p.row[field].toLocaleString('en-US')}`}</title>
          </circle>
        ))}
        <text x={pad.l} y={H - 6} className="drc-tick">{isZh ? '7 月中' : 'mid-Jul'}</text>
        <text x={W - pad.r} y={H - 6} className="drc-tick" textAnchor="end">{isZh ? '11 月 18 日' : '18 Nov'}</text>
      </svg>
    </div>
  );
};

export const DrRacingGrowth: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 2200);
  return (
    <figure className="drc-figure">
      <p className="drc-figure-title">{pick(isZh, { en: 'The safety net grew with the features', zh: '功能越多，保护网也跟着长' })}</p>
      <div ref={ref} className="drc-minis">
        <MiniLine isZh={isZh} progress={progress} field="rules" tone="primary" title={{ en: 'Security rules', zh: '安全规则' }} unit={{ en: 'lines', zh: '行' }} />
        <MiniLine isZh={isZh} progress={progress} field="tests" tone="second" title={{ en: 'Automated test files', zh: '自动测试文件' }} unit={{ en: 'files', zh: '个' }} />
      </div>
      <figcaption>
        {pick(isZh, {
          en: 'Counted from the repository at each date: Firestore + Storage rule lines, and unit plus end-to-end test files.',
          zh: '按每个日期的代码实数：Firestore 加 Storage 规则的行数；单元测试加端到端测试的文件数。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 4. The gate every change passes (looping diagram) ---------- */

const GATES: EpText[] = [
  { en: 'Type check', zh: '类型检查' },
  { en: 'Unit tests', zh: '单元测试' },
  { en: 'Build', zh: '打包' },
  { en: 'Real server boots', zh: '真服务器跑起来' },
  { en: 'End-to-end', zh: '端到端测试' },
  { en: 'Security rules', zh: '安全规则' },
];

export const DrRacingGate: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLOListElement | null>(null);
  // 0..6 = that many gates passed, 6..8 hold on "merge".
  const phase = useLoopStep(ref, GATES.length + 3, 700, GATES.length + 2);
  const passed = Math.min(phase, GATES.length);
  return (
    <figure className="drc-figure">
      <ol
        ref={ref}
        className="drc-gate"
        aria-label={pick(isZh, {
          en: 'Every change passes, in order: type check, unit tests, build, booting the real server, end-to-end tests, security rules; only then can it merge.',
          zh: '每个改动依次通过：类型检查、单元测试、打包、真服务器跑起来、端到端测试、安全规则，全部通过才能合并。',
        })}
      >
        {GATES.map((gate, index) => (
          <li key={gate.en} className={`drc-gate-step${index < passed ? ' is-passed' : ''}${index === passed ? ' is-running' : ''}`}>
            <span className="drc-gate-check" aria-hidden="true">✓</span>
            {pick(isZh, gate)}
          </li>
        ))}
        <li className={`drc-gate-step drc-gate-done${passed === GATES.length ? ' is-passed' : ''}`}>
          {pick(isZh, { en: 'Merge', zh: '可以合并' })}
        </li>
      </ol>
      <figcaption>
        {pick(isZh, {
          en: 'The same gate runs on the laptop, before every push and in CI. One red step stops the merge.',
          zh: '同一道关卡在本机、每次推送前、CI 上各跑一次。任何一步变红，就合并不了。',
        })}
      </figcaption>
    </figure>
  );
};
