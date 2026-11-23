/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Animated figures for the /jiju-pet "How Jiju runs itself" section.
// Every number is read from the Jiju / personal-dashboard repos on 2026-11-23:
//   places by region  personal-dashboard data/jiju/snapshot/stats.json (snapshot 2026-11-23, published places)
//   tag funnel        personal-dashboard data/jiju-outreach/tag-proposals.json (first run 2026-11-21)
//   lunch funnel      personal-dashboard docs/modules/jiju-lunch-research.md (first sample)
//   night shift       personal-dashboard dashboard.config.json jobs + Jiju scripts/translate-nightly.ts
// Bars grow once when scrolled into view (useCountUp honours prefers-reduced-motion); the two
// looping diagrams step with useLoopStep and stop when scrolled away or under reduced motion.

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

/* ---------- 1. Published places by region (bars) ---------- */

const REGIONS: { label: EpText; value: number }[] = [
  { label: { en: 'Penang', zh: 'Penang' }, value: 362 },
  { label: { en: 'Selangor', zh: 'Selangor' }, value: 134 },
  { label: { en: 'Kuala Lumpur', zh: 'Kuala Lumpur' }, value: 122 },
  { label: { en: 'Johor', zh: 'Johor' }, value: 111 },
  { label: { en: 'Singapore', zh: 'Singapore' }, value: 54 },
  { label: { en: '7 other states', zh: '其余 7 个州' }, value: 64 },
];

export const JijuRegionBars: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 1600);
  const max = Math.max(...REGIONS.map((row) => row.value));
  const total = REGIONS.reduce((sum, row) => sum + row.value, 0);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">
        {pick(isZh, { en: 'Published places, by region', zh: '已上架的地点，按地区' })}
        <span>{pick(isZh, { en: `${total} in total`, zh: `共 ${total} 家` })}</span>
      </p>
      <div ref={ref} className="jjc-hbars" role="img" aria-label={REGIONS.map((row) => `${pick(isZh, row.label)} ${row.value}`).join(', ')}>
        {REGIONS.map((row, index) => (
          <div key={row.label.en} className={`jjc-hbar${index === 0 ? ' is-lead' : ''}`} aria-hidden="true">
            <span className="jjc-hbar-label">{pick(isZh, row.label)}</span>
            <span className="jjc-hbar-track">
              <span className="jjc-hbar-fill" style={{ width: `${(row.value / max) * 100 * progress}%` }} />
            </span>
            <span className="jjc-hbar-value">{Math.round(row.value * progress)}</span>
          </div>
        ))}
      </div>
      <figcaption>
        {pick(isZh, {
          en: 'Snapshot of the live database on 23 Nov 2026. Penang is where Jiju started and is still the deepest; the other 7 are Perak, Kedah, Melaka, Pahang, Sarawak, Sabah and Negeri Sembilan.',
          zh: '2026 年 11 月 23 日正式资料库的快照。Penang 是起点，到现在也最深；其余 7 个州是 Perak、Kedah、Melaka、Pahang、Sarawak、Sabah、Negeri Sembilan。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 2. How one place gets onto Jiju (looping diagram) ---------- */

const FLOW: { stage: EpText; who: EpText }[] = [
  { stage: { en: 'Find', zh: '找' }, who: { en: '5 Grok bots', zh: '5 个 Grok bot' } },
  { stage: { en: 'Rules', zh: '规则' }, who: { en: 'exact quote?', zh: '有原话吗' } },
  { stage: { en: 'Local AI', zh: '本机模型' }, who: { en: 'gemma4 · night', zh: 'gemma4 · 夜里' } },
  { stage: { en: 'Claude', zh: 'Claude' }, who: { en: 'review', zh: '复核' } },
  { stage: { en: 'Eden', zh: 'Eden' }, who: { en: 'confirm', zh: '确认' } },
  { stage: { en: 'Live', zh: '上线' }, who: { en: 'jiju.pet', zh: 'jiju.pet' } },
];

// Phases walk the token through the six stops, then hold on "live" for two beats.
const FLOW_STOP = [0, 1, 2, 3, 4, 5, 5, 5];

export const JijuPlaceFlow: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const phase = useLoopStep(ref, FLOW_STOP.length, 1100, FLOW_STOP.length - 1);
  const stop = FLOW_STOP[phase];
  const last = FLOW.length - 1;
  return (
    <figure className="jjc-figure">
      <div
        ref={ref}
        className="jjc-flow"
        role="img"
        aria-label={pick(isZh, {
          en: 'Animated diagram: five Grok bots find a place; rules look for an exact quote; a local model reads the sources at night; Claude reviews; Eden confirms; the place goes live on jiju.pet. Anything without a quote or rejected by Claude stops there.',
          zh: '动画示意：5 个 Grok bot 找到一家店；规则先找原话；本机模型夜里读来源；Claude 复核；Eden 确认；上线到 jiju.pet。没有原话、或被 Claude 打回的，就停在那一步。',
        })}
      >
        <div className="jjc-flow-track" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${FLOW.length}, minmax(0, 1fr))` }}>
          <span className="jjc-flow-rail" />
          <span className="jjc-flow-rail-fill" style={{ transform: `scaleX(${stop / last})` }} />
          <span className="jjc-flow-token-lane" style={{ transform: `translateX(${(stop * 100) / FLOW.length}%)` }}>
            <span className="jjc-flow-token" />
          </span>
          {FLOW.map((item, index) => (
            <div key={item.stage.en} className={`jjc-flow-stop${index <= stop ? ' is-reached' : ''}${index === stop ? ' is-here' : ''}`}>
              <span className="jjc-flow-dot" />
              <span className="jjc-flow-label">{pick(isZh, item.stage)}</span>
              <span className="jjc-flow-who">{pick(isZh, item.who)}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption>
        {pick(isZh, {
          en: 'Illustration of the path a new place or fact takes. A step that fails does not pass a weaker version along: no quote means no tag, a Claude rejection means no highlight.',
          zh: '示意：一家新店或一条新资料走的路。哪一步没过，就不会带着「打折版」往下走：没有原话就不贴标签，Claude 打回就不写卖点。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 3. What survives the checks (funnels) ---------- */

const FUNNELS: { title: EpText; rows: { label: EpText; value: number }[] }[] = [
  {
    title: { en: 'Tags, first night (21–22 Nov)', zh: '标签，第一晚（11 月 21–22 日）' },
    rows: [
      { label: { en: 'Rules found a quote', zh: '规则找到原话' }, value: 60 },
      { label: { en: 'Claude agreed', zh: 'Claude 同意' }, value: 22 },
    ],
  },
  {
    title: { en: 'Lunch sets, first sample', zh: '午市套餐，第一批' },
    rows: [
      { label: { en: 'Places with a website', zh: '有官网的地点' }, value: 155 },
      { label: { en: 'Price found & checked', zh: '找到价格并通过' }, value: 9 },
      { label: { en: 'At or under RM / S$20', zh: 'RM / S$20 以内' }, value: 3 },
    ],
  },
];

export const JijuCheckFunnels: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 1800);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, { en: 'Most of what the machines propose is thrown away', zh: '机器提出来的，大部分被丢掉' })}</p>
      <div ref={ref} className="jjc-funnels">
        {FUNNELS.map((funnel) => {
          const max = funnel.rows[0].value;
          return (
            <div
              key={funnel.title.en}
              className="jjc-funnel"
              role="img"
              aria-label={`${pick(isZh, funnel.title)}: ${funnel.rows.map((row) => `${pick(isZh, row.label)} ${row.value}`).join(', ')}`}
            >
              <p className="jjc-funnel-title">{pick(isZh, funnel.title)}</p>
              {funnel.rows.map((row, index) => (
                <div key={row.label.en} className={`jjc-funnel-row${index === funnel.rows.length - 1 ? ' is-kept' : ''}`} aria-hidden="true">
                  <span className="jjc-funnel-text">
                    <strong>{Math.round(row.value * progress)}</strong> {pick(isZh, row.label)}
                  </span>
                  <span className="jjc-funnel-track">
                    <span className="jjc-funnel-bar" style={{ width: `${Math.max(1.5, (row.value / max) * 100) * progress}%` }} />
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <figcaption>
        {pick(isZh, {
          en: 'Counted from the run records. The tag job is still preview-only until 25 Nov; lunch submissions stay switched off until the pass rate is worth it.',
          zh: '按运行记录实数。标签任务到 11 月 25 日之前只预览不写；午市套餐的自动提交还关着，等通过率值得再开。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 4. The night shift (looping checklist) ---------- */

const NIGHT: { at: string; job: EpText; where: EpText }[] = [
  { at: '00:40', job: { en: 'Find sourced highlights for each place', zh: '给每家找有出处的卖点' }, where: { en: 'M4 · gemma4 → Claude', zh: 'M4 · gemma4 → Claude' } },
  { at: '01:30', job: { en: 'Research 40 places on the web', zh: '上网查 40 家' }, where: { en: 'M4 · Claude', zh: 'M4 · Claude' } },
  { at: '02:00', job: { en: 'Lunch-set prices · translate new copy', zh: '午市套餐价格 · 翻译新文字' }, where: { en: 'M4 · gemma4 / qwen3.8', zh: 'M4 · gemma4 / qwen3.8' } },
  { at: '02:40', job: { en: 'Tags: specialty coffee, organic, eco', zh: '标签：精品咖啡、有机、环保' }, where: { en: 'M4 · rules → Claude', zh: 'M4 · 规则 → Claude' } },
  { at: '03:00', job: { en: 'Promo agent, up to 15 shops', zh: '优惠 agent，最多 15 家' }, where: { en: 'M4 · gemma4', zh: 'M4 · gemma4' } },
  { at: '03:40', job: { en: 'Snapshot of the whole database', zh: '整个资料库拍快照' }, where: { en: 'M1', zh: 'M1' } },
  { at: '04:30', job: { en: 'Around the web: 30 places · promo / holiday watch', zh: '网上怎么说：30 家 · 优惠 / 放假巡查' }, where: { en: 'M1', zh: 'M1' } },
  { at: '05:10', job: { en: 'Write place descriptions', zh: '写地点介绍' }, where: { en: 'M4 · gemma4', zh: 'M4 · gemma4' } },
  { at: '06:10', job: { en: 'Food news: check new shops (≤ 30 / day)', zh: '美食新闻：核对新店（每天 ≤ 30）' }, where: { en: 'Places API, free tier', zh: 'Places API 免费档' } },
];

export const JijuNightShift: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLOListElement | null>(null);
  // 0..n = that many jobs done, then hold two beats on "morning".
  const phase = useLoopStep(ref, NIGHT.length + 3, 650, NIGHT.length + 2);
  const done = Math.min(phase, NIGHT.length);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">
        {pick(isZh, { en: 'While Eden sleeps', zh: 'Eden 睡觉的时候' })}
        <span>{pick(isZh, { en: 'Malaysia time', zh: '马来西亚时间' })}</span>
      </p>
      <ol
        ref={ref}
        className="jjc-night"
        aria-label={NIGHT.map((row) => `${row.at} ${pick(isZh, row.job)} (${pick(isZh, row.where)})`).join('; ')}
      >
        {NIGHT.map((row, index) => (
          <li key={row.at + row.job.en} className={`jjc-night-row${index < done ? ' is-done' : ''}${index === done ? ' is-running' : ''}`} aria-hidden="true">
            <span className="jjc-night-at">{row.at}</span>
            <span className="jjc-night-check">✓</span>
            <span className="jjc-night-job">{pick(isZh, row.job)}</span>
            <span className="jjc-night-where">{pick(isZh, row.where)}</span>
          </li>
        ))}
        <li className={`jjc-night-row jjc-night-morning${done === NIGHT.length ? ' is-done' : ''}`} aria-hidden="true">
          <span className="jjc-night-at">{pick(isZh, { en: 'AM', zh: '早上' })}</span>
          <span className="jjc-night-check">✓</span>
          <span className="jjc-night-job">{pick(isZh, { en: 'A short queue of things to confirm', zh: '一小排等确认的事' })}</span>
          <span className="jjc-night-where">Eden</span>
        </li>
      </ol>
      <figcaption>
        {pick(isZh, {
          en: 'Scheduled jobs as configured on 23 Nov 2026. Heavy local-model work only runs at night on mains power, and steps aside to a smaller model if the laptop is in use.',
          zh: '2026 年 11 月 23 日实际配置的定时任务。重的本机模型活只在夜里、插着电时跑；电脑有人在用就让给小模型。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 5. How a code change ships (looping gate) ---------- */

const SHIP: EpText[] = [
  { en: 'Own worktree', zh: '独立 worktree' },
  { en: 'Claude Code / Codex write', zh: 'Claude Code / Codex 写' },
  { en: 'Second-model review', zh: '另一家模型审' },
  { en: 'CI on the home M1', zh: '家里 M1 跑 CI' },
  { en: 'Auto-merge', zh: '自动合并' },
];

export const JijuShipGate: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLOListElement | null>(null);
  const phase = useLoopStep(ref, SHIP.length + 3, 750, SHIP.length + 2);
  const passed = Math.min(phase, SHIP.length);
  return (
    <figure className="jjc-figure">
      <ol
        ref={ref}
        className="jjc-gate"
        aria-label={pick(isZh, {
          en: 'Every code change: its own worktree, written by Claude Code or Codex, reviewed by a second model, checked by CI on the home M1, auto-merged, and merging deploys it.',
          zh: '每个代码改动：独立 worktree，由 Claude Code 或 Codex 写，另一家模型审，家里 M1 跑 CI，自动合并，合并即上线。',
        })}
      >
        {SHIP.map((step, index) => (
          <li key={step.en} className={`jjc-gate-step${index < passed ? ' is-passed' : ''}${index === passed ? ' is-running' : ''}`} aria-hidden="true">
            <span className="jjc-gate-check">✓</span>
            {pick(isZh, step)}
          </li>
        ))}
        <li className={`jjc-gate-step jjc-gate-done${passed === SHIP.length ? ' is-passed' : ''}`} aria-hidden="true">
          {pick(isZh, { en: 'Merge = deploy', zh: '合并即上线' })}
        </li>
      </ol>
      <figcaption>
        {pick(isZh, {
          en: '435 Jiju pull requests merged as of 23 Nov 2026; 371 of them by this automation since 18 Sep (262 through GitHub’s native auto-merge). agy runs read-only whole-repo audits on the side; what it finds becomes a task that Claude verifies before anyone fixes it.',
          zh: '截至 2026 年 11 月 23 日，Jiju 已合并 435 个 PR；9 月 18 日以来其中 371 个由这套自动化合并（262 个经 GitHub 原生 auto-merge）。agy 在旁边做只读的全仓体检，查到的问题变成任务，先由 Claude 核实再修。',
        })}
      </figcaption>
    </figure>
  );
};
