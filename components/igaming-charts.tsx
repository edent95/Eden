import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { IGamingLocalized } from './igaming-content';

/**
 * Interactive figures for the `/igaming/<guide>` explainers, placed in a guide
 * with a `{ kind: 'widget' }` block. Every number here is illustrative and
 * matches the worked example in the surrounding text.
 *
 * Colour roles (validated with the dataviz palette checker, light #faf5e8 and
 * dark #0d100d surfaces, all-pairs): --viz-1 felt green, --viz-2 gold,
 * --viz-3 blue — defined in `styles/pages/igaming.css` under `.ig-viz`.
 * Red never sits next to green (fails deutan/protan); deductions and negatives
 * use gold plus a sign in the label.
 */

export type IGamingWidgetId = 'ggr-waterfall' | 'rtp-convergence' | 'channel-value' | 'slot-planner' | 'wagering-cost';

type Translate = (value: IGamingLocalized) => string;

const L = (en: string, zh: string): IGamingLocalized => ({ en, zh });
const fmt = (value: number) => Math.round(value).toLocaleString('en-US');
const compact = (value: number) => (Math.abs(value) >= 1000 ? `${value / 1000}K` : `${value}`);

/** Tracks the rendered width so SVG text stays at real pixel size on phones. */
function useWidth(fallback = 640) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

type Tip = { x: number; y: number; value: string; label: string; extra?: string } | null;

function Tooltip({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div className="ig-viz-tip" style={{ left: tip.x, top: tip.y }} role="status">
      <strong>{tip.value}</strong>
      <span>{tip.label}</span>
      {tip.extra ? <span>{tip.extra}</span> : null}
    </div>
  );
}

/** Column path with a 4px rounded data-end and a square baseline. */
function columnPath(x: number, width: number, top: number, bottom: number, roundTop: boolean) {
  const r = Math.min(4, Math.abs(bottom - top) / 2, width / 2);
  if (roundTop) {
    return `M${x},${bottom} V${top + r} Q${x},${top} ${x + r},${top} H${x + width - r} Q${x + width},${top} ${x + width},${top + r} V${bottom} Z`;
  }
  return `M${x},${top} V${bottom - r} Q${x},${bottom} ${x + r},${bottom} H${x + width - r} Q${x + width},${bottom} ${x + width},${bottom - r} V${top} Z`;
}

function niceStep(max: number) {
  const steps = [1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000];
  return steps.find((step) => max / step <= 5) ?? 100000;
}

/* ------------------------------------------------------------------ */
/* 1. GGR vs NGR: drag hold % and bonus cost, watch net deposits stay put */

const GGR_TURNOVER = 400_000;
const GGR_NET_DEPOSITS = 20_000;

const ggrText = {
  title: L('Same day, change two inputs', '同一天，改两个数字'),
  hold: L('Hold %', 'Hold %'),
  bonus: L('Bonus cost', '奖金成本'),
  net: L('Net deposits', '净存款'),
  ggr: L('GGR', 'GGR'),
  bonusBar: L('Bonus cost', '奖金成本'),
  ngr: L('NGR', 'NGR'),
  legendCash: L('Payment ledger', '支付账'),
  legendGame: L('Game ledger', '游戏账'),
  legendDeduct: L('Deduction', '扣除'),
  reset: L('Reset to the example', '回到示例'),
  table: L('Show the numbers', '看数字'),
  note: L(
    'Turnover stays at 400,000 and deposits minus withdrawals at 20,000. GGR = turnover × hold; NGR = GGR − bonus cost. Illustrative figures.',
    '流水固定 400,000,存款减提款固定 20,000。GGR = 流水 × hold;NGR = GGR − 奖金成本。示例数字。',
  ),
};

function GgrWaterfall({ t }: { t: Translate }) {
  const [hold, setHold] = useState(4);
  const [bonus, setBonus] = useState(3000);
  const [tip, setTip] = useState<Tip>(null);
  const [ref, width] = useWidth();

  const ggr = (GGR_TURNOVER * hold) / 100;
  const ngr = ggr - bonus;
  const height = 276;
  // Bottom room for a value label under a negative bar plus the category label below it.
  const pad = { top: 28, right: 12, bottom: 50, left: 44 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const max = Math.max(GGR_NET_DEPOSITS, ggr, 4000);
  const min = Math.min(0, ngr);
  const step = niceStep(max - min);
  const top = Math.ceil(max / step) * step;
  const bottom = Math.floor(min / step) * step;
  const y = (value: number) => pad.top + ((top - value) / (top - bottom)) * plotH;
  const ticks: number[] = [];
  for (let value = bottom; value <= top + 0.5; value += step) ticks.push(value);

  const bars = [
    { key: 'net', label: t(ggrText.net), from: 0, to: GGR_NET_DEPOSITS, role: 'cash', shown: fmt(GGR_NET_DEPOSITS) },
    { key: 'ggr', label: t(ggrText.ggr), from: 0, to: ggr, role: 'game', shown: fmt(ggr) },
    { key: 'bonus', label: t(ggrText.bonusBar), from: ggr, to: ngr, role: 'deduct', shown: bonus ? `−${fmt(bonus)}` : '0' },
    { key: 'ngr', label: t(ggrText.ngr), from: 0, to: ngr, role: 'game', shown: fmt(ngr) },
  ];
  const band = plotW / bars.length;
  const barW = Math.min(56, band * 0.5);
  const fill = (role: string) => (role === 'cash' ? 'var(--viz-3)' : role === 'game' ? 'var(--viz-1)' : 'var(--viz-2)');

  return (
    <div className="ig-viz-body">
      <div className="ig-viz-controls">
        <label>
          <span>{t(ggrText.hold)} <strong>{hold.toFixed(1)}%</strong></span>
          <input type="range" min={0.5} max={8} step={0.1} value={hold} onChange={(event) => setHold(Number(event.target.value))} />
        </label>
        <label>
          <span>{t(ggrText.bonus)} <strong>{fmt(bonus)}</strong></span>
          <input type="range" min={0} max={12000} step={500} value={bonus} onChange={(event) => setBonus(Number(event.target.value))} />
        </label>
        <button type="button" className="ig-viz-button" onClick={() => { setHold(4); setBonus(3000); }}>{t(ggrText.reset)}</button>
      </div>
      <ul className="ig-viz-legend">
        <li><i style={{ background: 'var(--viz-3)' }} />{t(ggrText.legendCash)}</li>
        <li><i style={{ background: 'var(--viz-1)' }} />{t(ggrText.legendGame)}</li>
        <li><i style={{ background: 'var(--viz-2)' }} />{t(ggrText.legendDeduct)}</li>
      </ul>
      <div ref={ref} className="ig-viz-plot" onPointerLeave={() => setTip(null)}>
        <svg width={width} height={height} role="img" aria-label={`${t(ggrText.net)} ${fmt(GGR_NET_DEPOSITS)}, GGR ${fmt(ggr)}, ${t(ggrText.bonusBar)} ${fmt(bonus)}, NGR ${fmt(ngr)}`}>
          {ticks.map((value) => (
            <g key={value}>
              <line x1={pad.left} x2={width - pad.right} y1={y(value)} y2={y(value)} className={value === 0 ? 'ig-viz-zero' : 'ig-viz-grid'} />
              <text x={pad.left - 8} y={y(value)} dy="0.32em" textAnchor="end" className="ig-viz-tick">{compact(value)}</text>
            </g>
          ))}
          {bars.map((bar, index) => {
            const x = pad.left + band * index + (band - barW) / 2;
            const hi = Math.max(bar.from, bar.to);
            const lo = Math.min(bar.from, bar.to);
            const negative = bar.role !== 'deduct' && bar.to < 0;
            const path = bar.role === 'deduct'
              ? columnPath(x, barW, y(hi), Math.max(y(lo), y(hi) + 1), false)
              : columnPath(x, barW, y(hi), y(lo), !negative);
            const labelY = bar.role === 'deduct' ? y(lo) + 14 : negative ? y(lo) + 14 : y(hi) - 8;
            const show = () => setTip({ x: x + barW / 2, y: y(hi) - 12, value: bar.shown, label: bar.label });
            return (
              <g key={bar.key} tabIndex={0} onPointerEnter={show} onFocus={show} onBlur={() => setTip(null)} className="ig-viz-mark">
                <rect x={pad.left + band * index} y={pad.top} width={band} height={plotH} fill="transparent" />
                {hi !== lo ? <path d={path} fill={fill(bar.role)} /> : null}
                <text x={x + barW / 2} y={labelY} textAnchor="middle" className="ig-viz-value">{bar.shown}</text>
                <text x={x + barW / 2} y={height - 8} textAnchor="middle" className="ig-viz-label">{bar.label}</text>
              </g>
            );
          })}
          {/* connectors: GGR top → bonus start, bonus end → NGR top */}
          <line className="ig-viz-connector" x1={pad.left + band * 1 + (band + barW) / 2} x2={pad.left + band * 2 + (band - barW) / 2} y1={y(ggr)} y2={y(ggr)} />
          <line className="ig-viz-connector" x1={pad.left + band * 2 + (band + barW) / 2} x2={pad.left + band * 3 + (band - barW) / 2} y1={y(ngr)} y2={y(ngr)} />
        </svg>
        <Tooltip tip={tip} />
      </div>
      <p className="ig-viz-note">{t(ggrText.note)}</p>
      <details className="ig-viz-table">
        <summary>{t(ggrText.table)}</summary>
        <table>
          <tbody>
            <tr><th scope="row">Turnover</th><td>{fmt(GGR_TURNOVER)}</td></tr>
            <tr><th scope="row">{t(ggrText.net)}</th><td>{fmt(GGR_NET_DEPOSITS)}</td></tr>
            <tr><th scope="row">GGR ({hold.toFixed(1)}%)</th><td>{fmt(ggr)}</td></tr>
            <tr><th scope="row">{t(ggrText.bonusBar)}</th><td>−{fmt(bonus)}</td></tr>
            <tr><th scope="row">NGR</th><td>{fmt(ngr)}</td></tr>
          </tbody>
        </table>
      </details>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. RTP: simulated sessions converge into the 95% band as spins grow */

/**
 * Paytable with mean 0.96 and standard deviation ≈ 4.94 × stake — the
 * "medium volatility" assumption the RTP guide's range table uses.
 * Multipliers and probabilities: 100× 0.2%, 20× 1%, 5× 4%, 1× 20%, 0.5× 32%, 0 otherwise.
 */
const PAYTABLE: Array<[number, number]> = [[0.002, 100], [0.01, 20], [0.04, 5], [0.2, 1], [0.32, 0.5]];
const RTP_SD = 5;
const RTP_DESIGN = 0.96;
const RTP_MIN_SPINS = 100;
const RTP_MAX_SPINS = 100_000;
const RTP_SESSIONS = 12;
const RTP_POINTS = 90;

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const RTP_CHECKPOINTS = Array.from({ length: RTP_POINTS }, (_, index) => Math.round(
  RTP_MIN_SPINS * (RTP_MAX_SPINS / RTP_MIN_SPINS) ** (index / (RTP_POINTS - 1)),
));

function simulateSessions(seed: number): number[][] {
  const random = mulberry32(seed);
  return Array.from({ length: RTP_SESSIONS }, () => {
    const series: number[] = [];
    let paid = 0;
    let spin = 0;
    for (const checkpoint of RTP_CHECKPOINTS) {
      while (spin < checkpoint) {
        let u = random();
        for (const [probability, multiplier] of PAYTABLE) {
          if (u < probability) { paid += multiplier; break; }
          u -= probability;
        }
        spin += 1;
      }
      series.push(paid / spin);
    }
    return series;
  });
}

const rtpText = {
  rerun: L('Run 12 new sessions', '重跑 12 局'),
  band: L('95% range (maths)', '95% 范围(理论)'),
  design: L('Design RTP 96%', '设计 RTP 96%'),
  sessions: L('Simulated sessions', '模拟的玩家'),
  spins: L('spins', '局'),
  range: L('95% range', '95% 范围'),
  spread: L('These 12 sessions', '这 12 局'),
  axis: L('Number of spins (log scale)', '局数(对数刻度)'),
  note: L(
    'Each grey line is one simulated player on a 96% slot (bet 1, medium volatility), tracking observed RTP = winnings ÷ turnover as spins accumulate. Early on, lines run off the chart; by 100,000 spins they sit inside a narrow band. Lines are clipped to 50–150%.',
    '每条灰线是一个模拟玩家在 RTP 96% 的老虎机上(每注 1,中等波动),随着局数增加，实际 RTP(派彩 ÷ 流水)怎么变。刚开始线会冲出图外;到 10 万局，都落进一条窄带。图只画 50%–150%。',
  ),
};

function RtpConvergence({ t }: { t: Translate }) {
  const [seed, setSeed] = useState(20261110);
  const [hover, setHover] = useState<number | null>(null);
  const [ref, width] = useWidth();
  const sessions = useMemo(() => simulateSessions(seed), [seed]);

  const height = 300;
  const pad = { top: 16, right: 14, bottom: 42, left: 44 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const lo = 0.5;
  const hi = 1.5;
  const logMin = Math.log10(RTP_MIN_SPINS);
  const logMax = Math.log10(RTP_MAX_SPINS);
  const x = (spins: number) => pad.left + ((Math.log10(spins) - logMin) / (logMax - logMin)) * plotW;
  const y = (rtp: number) => pad.top + ((hi - Math.min(hi, Math.max(lo, rtp))) / (hi - lo)) * plotH;
  const half = (spins: number) => (1.96 * RTP_SD) / Math.sqrt(spins);

  const bandTop = RTP_CHECKPOINTS.map((n) => `${x(n)},${y(RTP_DESIGN + half(n))}`);
  const bandBottom = RTP_CHECKPOINTS.slice().reverse().map((n) => `${x(n)},${y(RTP_DESIGN - half(n))}`);
  const clipId = `rtp-clip-${seed}`;

  const onMove = (event: React.PointerEvent<SVGRectElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const share = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    setHover(Math.round(share * (RTP_POINTS - 1)));
  };
  const hoverSpins = hover === null ? null : RTP_CHECKPOINTS[hover];
  const values = hover === null ? [] : sessions.map((series) => series[hover]);
  const pct = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <div className="ig-viz-body">
      <div className="ig-viz-controls">
        <button type="button" className="ig-viz-button" onClick={() => setSeed((value) => value + 1)}>{t(rtpText.rerun)}</button>
      </div>
      <ul className="ig-viz-legend">
        <li><i className="is-wash" />{t(rtpText.band)}</li>
        <li><i className="is-line" style={{ background: 'var(--viz-1)' }} />{t(rtpText.design)}</li>
        <li><i className="is-line" style={{ background: 'var(--viz-muted)' }} />{t(rtpText.sessions)}</li>
      </ul>
      <div ref={ref} className="ig-viz-plot">
        <svg width={width} height={height} role="img" aria-label={t(rtpText.note)}>
          <defs>
            <clipPath id={clipId}><rect x={pad.left} y={pad.top} width={plotW} height={plotH} /></clipPath>
          </defs>
          {[0.5, 0.75, 1, 1.25, 1.5].map((value) => (
            <g key={value}>
              <line x1={pad.left} x2={width - pad.right} y1={y(value)} y2={y(value)} className="ig-viz-grid" />
              <text x={pad.left - 8} y={y(value)} dy="0.32em" textAnchor="end" className="ig-viz-tick">{Math.round(value * 100)}%</text>
            </g>
          ))}
          {[100, 1000, 10000, 100000].map((value) => (
            <text key={value} x={x(value)} y={height - 24} textAnchor={value === RTP_MAX_SPINS ? 'end' : value === RTP_MIN_SPINS ? 'start' : 'middle'} className="ig-viz-tick">{fmt(value)}</text>
          ))}
          <text x={pad.left + plotW / 2} y={height - 6} textAnchor="middle" className="ig-viz-label">{t(rtpText.axis)}</text>
          <g clipPath={`url(#${clipId})`}>
            <polygon points={[...bandTop, ...bandBottom].join(' ')} className="ig-viz-band" />
            {sessions.map((series, index) => (
              <polyline key={index} points={series.map((value, point) => `${x(RTP_CHECKPOINTS[point])},${y(value)}`).join(' ')} className="ig-viz-path" />
            ))}
            <line x1={pad.left} x2={width - pad.right} y1={y(RTP_DESIGN)} y2={y(RTP_DESIGN)} className="ig-viz-design" />
          </g>
          {hoverSpins !== null ? (
            <line x1={x(hoverSpins)} x2={x(hoverSpins)} y1={pad.top} y2={pad.top + plotH} className="ig-viz-crosshair" />
          ) : null}
          <rect
            x={pad.left} y={pad.top} width={plotW} height={plotH} fill="transparent"
            onPointerMove={onMove} onPointerLeave={() => setHover(null)}
            tabIndex={0}
            onFocus={() => setHover(RTP_POINTS - 1)} onBlur={() => setHover(null)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') setHover((value) => Math.max(0, (value ?? RTP_POINTS - 1) - 3));
              if (event.key === 'ArrowRight') setHover((value) => Math.min(RTP_POINTS - 1, (value ?? 0) + 3));
            }}
            aria-label={t(rtpText.axis)}
          />
        </svg>
        {hoverSpins !== null ? (
          <Tooltip tip={{
            x: Math.min(Math.max(x(hoverSpins), 90), width - 90),
            y: pad.top + 8,
            value: `${fmt(hoverSpins)} ${t(rtpText.spins)}`,
            label: `${t(rtpText.range)}: ${pct(RTP_DESIGN - half(hoverSpins))} – ${pct(RTP_DESIGN + half(hoverSpins))}`,
            extra: `${t(rtpText.spread)}: ${pct(Math.min(...values))} – ${pct(Math.max(...values))}`,
          }} />
        ) : null}
      </div>
      <p className="ig-viz-note">{t(rtpText.note)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Marketing report: rank by CPA, then by value after cost */

const CHANNELS = [
  { name: L('Channel A', '渠道 A'), cpa: 40, ngr: 25 },
  { name: L('Channel B', '渠道 B'), cpa: 90, ngr: 120 },
  { name: L('Channel C', '渠道 C'), cpa: 150, ngr: 210 },
];

const channelText = {
  sortCpa: L('Rank by CPA', '按 CPA 排'),
  sortValue: L('Rank by value after cost', '按扣成本后的价值排'),
  cpa: L('CPA (cost per first depositor)', 'CPA(每个首存的成本)'),
  ngr: L('30-day NGR per first depositor', '每个首存 30 天的 NGR'),
  value: L('Value after cost (NGR − CPA)', '扣成本后的价值(NGR − CPA)'),
  note: L(
    'Invented figures. Ranked by CPA, Channel A looks best; ranked by what a depositor is worth after their cost, it is the only one that loses money.',
    '编的数字。按 CPA 排，渠道 A 看起来最好;按「首存玩家扣掉获客成本后值多少」排，它是唯一亏钱的。',
  ),
};

function ChannelValue({ t }: { t: Translate }) {
  const [sortBy, setSortBy] = useState<'cpa' | 'value'>('cpa');
  const rows = CHANNELS
    .map((channel) => ({ ...channel, value: channel.ngr - channel.cpa }))
    .sort((a, b) => (sortBy === 'cpa' ? a.cpa - b.cpa : b.value - a.value));
  const maxCost = Math.max(...CHANNELS.map((channel) => Math.max(channel.cpa, channel.ngr)));
  const maxAbs = Math.max(...rows.map((row) => Math.abs(row.value)));

  const panel = (title: IGamingLocalized, pick: (row: typeof rows[number]) => number, color: string, diverging = false) => (
    <div className="ig-viz-panel">
      <h4>{t(title)}</h4>
      <ol>
        {rows.map((row, index) => {
          const value = pick(row);
          const share = diverging ? (Math.abs(value) / maxAbs) * 50 : (value / maxCost) * 100;
          return (
            <li key={row.name.en} title={`${t(row.name)}: ${value}`}>
              <span className="ig-viz-row-label"><em>{index + 1}.</em> {t(row.name)}</span>
              <span className={`ig-viz-row-track${diverging ? ' is-diverging' : ''}`}>
                <span
                  className={`ig-viz-row-bar${diverging && value < 0 ? ' is-negative' : ''}`}
                  style={diverging
                    ? { width: `${share}%`, left: value < 0 ? `${50 - share}%` : '50%', background: value < 0 ? 'var(--viz-2)' : color }
                    : { width: `${share}%`, background: color }}
                />
              </span>
              <span className="ig-viz-row-value">{value > 0 && diverging ? '+' : ''}{value}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );

  return (
    <div className="ig-viz-body">
      <div className="ig-viz-controls" role="group">
        <button type="button" className={`ig-viz-button${sortBy === 'cpa' ? ' is-active' : ''}`} aria-pressed={sortBy === 'cpa'} onClick={() => setSortBy('cpa')}>{t(channelText.sortCpa)}</button>
        <button type="button" className={`ig-viz-button${sortBy === 'value' ? ' is-active' : ''}`} aria-pressed={sortBy === 'value'} onClick={() => setSortBy('value')}>{t(channelText.sortValue)}</button>
      </div>
      <div className="ig-viz-panels">
        {panel(channelText.cpa, (row) => row.cpa, 'var(--viz-3)')}
        {panel(channelText.ngr, (row) => row.ngr, 'var(--viz-1)')}
        {panel(channelText.value, (row) => row.value, 'var(--viz-1)', true)}
      </div>
      <p className="ig-viz-note">{t(channelText.note)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Provider promotions: first-come-first-served vs matching all deals */

const SLOT_COUNT = 3;
const PROVIDERS = ['A', 'B', 'C'] as const;
type Accepts = Record<(typeof PROVIDERS)[number], number[]>;
const SLOT_EXAMPLE: Accepts = { A: [1], B: [1, 2], C: [1, 2] };
const SLOT_FIXED: Accepts = { A: [1], B: [1, 2, 3], C: [1, 2] };
const PROVIDER_COLOR: Record<string, string> = { A: 'var(--viz-1)', B: 'var(--viz-2)', C: 'var(--viz-3)' };

function firstComeFirstServed(accepts: Accepts) {
  const taken = new Map<number, string>();
  for (const provider of PROVIDERS) {
    const slot = [...accepts[provider]].sort((a, b) => a - b).find((candidate) => !taken.has(candidate));
    if (slot) taken.set(slot, provider);
  }
  return taken;
}

/** Tries every assignment (3 providers × 3 slots is tiny) and keeps the one that places the most deals. */
function matchAll(accepts: Accepts) {
  let best = new Map<number, string>();
  const walk = (index: number, taken: Map<number, string>) => {
    if (taken.size > best.size) best = new Map(taken);
    if (index === PROVIDERS.length) return;
    const provider = PROVIDERS[index];
    for (const slot of [...accepts[provider]].sort((a, b) => a - b)) {
      if (taken.has(slot)) continue;
      taken.set(slot, provider);
      walk(index + 1, taken);
      taken.delete(slot);
    }
    walk(index + 1, taken);
  };
  walk(0, new Map());
  return best;
}

const slotText = {
  intro: L('Tick the lobby positions each deal accepts.', '勾选每笔交易能接受的大厅位置。'),
  provider: L('Provider', '供应商'),
  position: L('Position', '位置'),
  example: L('Article example', '文中例子'),
  fix: L('B accepts 1–3', 'B 接受 1–3 位'),
  fcfs: L('First come, first served', '先到先得'),
  matched: L('Matched together', '一起排'),
  empty: L('empty', '空'),
  conflict: L('no slot left — conflict', '没位置了——冲突'),
  allFit: L('All deals fit.', '全部放得下。'),
  note: L(
    'Deals are taken in order A, B, C. First-come-first-served gives each the best free slot it accepts; matching tries every combination before saying no.',
    '交易按 A、B、C 的顺序来。先到先得：每家拿它能接受的、还空着的最好位置;一起排：试过所有组合再说放不下。',
  ),
};

function SlotPlanner({ t }: { t: Translate }) {
  const [accepts, setAccepts] = useState<Accepts>(SLOT_EXAMPLE);
  const toggle = (provider: (typeof PROVIDERS)[number], slot: number) => setAccepts((current) => {
    const has = current[provider].includes(slot);
    return { ...current, [provider]: has ? current[provider].filter((value) => value !== slot) : [...current[provider], slot] };
  });
  const fcfs = firstComeFirstServed(accepts);
  const matched = matchAll(accepts);

  const lobby = (title: IGamingLocalized, taken: Map<number, string>) => {
    const placed = new Set(taken.values());
    const missing = PROVIDERS.filter((provider) => !placed.has(provider));
    return (
      <div className="ig-viz-lobby">
        <h4>{t(title)}</h4>
        <ol>
          {Array.from({ length: SLOT_COUNT }, (_, index) => {
            const provider = taken.get(index + 1);
            return (
              <li key={index} className={provider ? 'is-filled' : ''} style={provider ? { background: PROVIDER_COLOR[provider], color: provider === 'B' ? '#1a1406' : '#fff' } : undefined}>
                <span>#{index + 1}</span>
                <strong>{provider ?? t(slotText.empty)}</strong>
              </li>
            );
          })}
        </ol>
        <p className={missing.length ? 'is-conflict' : 'is-ok'}>
          {missing.length
            ? missing.map((provider) => `${provider}: ${t(slotText.conflict)}`).join(' · ')
            : t(slotText.allFit)}
        </p>
      </div>
    );
  };

  return (
    <div className="ig-viz-body">
      <div className="ig-viz-controls">
        <button type="button" className="ig-viz-button" onClick={() => setAccepts(SLOT_EXAMPLE)}>{t(slotText.example)}</button>
        <button type="button" className="ig-viz-button" onClick={() => setAccepts(SLOT_FIXED)}>{t(slotText.fix)}</button>
      </div>
      <p className="ig-viz-note">{t(slotText.intro)}</p>
      <div className="ig-viz-table-scroll">
        <table className="ig-viz-grid-table">
          <thead>
            <tr>
              <th scope="col">{t(slotText.provider)}</th>
              {Array.from({ length: SLOT_COUNT }, (_, index) => <th key={index} scope="col">{t(slotText.position)} {index + 1}</th>)}
            </tr>
          </thead>
          <tbody>
            {PROVIDERS.map((provider) => (
              <tr key={provider}>
                <th scope="row"><i style={{ background: PROVIDER_COLOR[provider] }} />{provider}</th>
                {Array.from({ length: SLOT_COUNT }, (_, index) => (
                  <td key={index}>
                    <input
                      type="checkbox"
                      checked={accepts[provider].includes(index + 1)}
                      onChange={() => toggle(provider, index + 1)}
                      aria-label={`${provider} — ${t(slotText.position)} ${index + 1}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ig-viz-lobbies">
        {lobby(slotText.fcfs, fcfs)}
        {lobby(slotText.matched, matched)}
      </div>
      <p className="ig-viz-note">{t(slotText.note)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Wagering: what a bonus really costs, simulated player by player */

const WAGER_MULTIPLIERS = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const WAGER_CAPS = [0, 10, 5, 3];
const WAGER_UKGC_CAP = 10;

/**
 * One bonus, many players. Each starts with a bonus-only balance and bets 1
 * per spin on the PAYTABLE game (scaled to the chosen RTP) until the largest
 * requested requirement is met or the balance can no longer cover a bet.
 * The same players are read off at every multiplier in one pass (common random
 * numbers), so the curve is smooth and the current point sits on it.
 * Finishers withdraw their balance, limited by the max-conversion cap.
 * Returns the operator's expected cost per bonus and share who finish, per multiplier.
 */
function simulateWagering(bonus: number, multipliers: number[], rtp: number, cap: number, players: number, seed: number) {
  const random = mulberry32(seed);
  const scale = rtp / RTP_DESIGN;
  const sorted = [...new Set(multipliers)].sort((a, b) => a - b);
  const needs = sorted.map((m) => m * bonus);
  const limit = cap > 0 ? cap * bonus : Infinity;
  const paid = sorted.map(() => 0);
  const finished = sorted.map(() => 0);
  for (let player = 0; player < players; player += 1) {
    let balance = bonus;
    let staked = 0;
    let next = 0;
    while (next < needs.length) {
      while (next < needs.length && staked >= needs[next]) {
        paid[next] += Math.min(balance, limit);
        finished[next] += 1;
        next += 1;
      }
      if (next >= needs.length || balance < 1) break;
      balance -= 1;
      staked += 1;
      let u = random();
      for (const [probability, payout] of PAYTABLE) {
        if (u < probability) { balance += payout * scale; break; }
        u -= probability;
      }
    }
  }
  return new Map(sorted.map((m, index) => [m, { cost: paid[index] / players, finished: finished[index] / players }]));
}

const wagerText = {
  bonus: L('Bonus', '奖金'),
  multiplier: L('Wagering requirement', '流水倍数'),
  rtp: L('Game RTP', '游戏 RTP'),
  cap: L('Max conversion', '最多可提现'),
  noCap: L('No cap', '不设上限'),
  capOption: L('× bonus', '倍奖金'),
  turnover: L('Bets required', '需要下注'),
  simple: L('Simple formula', '简单公式'),
  simulated: L('Simulated cost', '模拟成本'),
  finished: L('Players who finish', '完成流水的玩家'),
  simpleHint: L('bonus − house edge × bets required', '奖金 − 庄家优势 × 需要下注'),
  simulatedHint: L('per bonus, 10,000 simulated players', '每份奖金，模拟 10,000 个玩家'),
  ofBonus: L('of the bonus', '占奖金'),
  axisX: L('Wagering requirement (× bonus)', '流水倍数(× 奖金)'),
  axisY: L('Expected cost per bonus', '每份奖金的预期成本'),
  legendSim: L('Simulated', '模拟'),
  legendSimple: L('Simple formula', '简单公式'),
  legendCap: L('GB cap: 10×', '英国上限:10 倍'),
  note: L(
    'Assumes a bonus-only balance, a bet of 1 per spin, every game counting 100%, a medium-volatility slot and no expiry. Real offers add game weighting, max-bet rules and deposits; treat the output as a direction, not a price.',
    '假设：只有奖金余额、每注 1、所有游戏 100% 计入流水、中等波动的老虎机、没有过期时间。真实优惠还有游戏权重、最大下注和存款这些条件；结果看方向，不当报价。',
  ),
};

function WageringCost({ t }: { t: Translate }) {
  const [bonus, setBonus] = useState(20);
  const [multiplier, setMultiplier] = useState(10);
  const [rtpPct, setRtpPct] = useState(96);
  const [cap, setCap] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [ref, width] = useWidth();
  const rtp = rtpPct / 100;

  const results = useMemo(
    () => simulateWagering(bonus, [...WAGER_MULTIPLIERS, multiplier], rtp, cap, 10000, 7),
    [bonus, multiplier, rtp, cap],
  );
  const point = results.get(multiplier) ?? { cost: 0, finished: 0 };
  const curve = WAGER_MULTIPLIERS.map((m) => ({ m, cost: results.get(m)?.cost ?? 0 }));
  const simple = (m: number) => Math.max(0, bonus - (1 - rtp) * m * bonus);

  const height = 240;
  const pad = { top: 16, right: 14, bottom: 42, left: 44 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const x = (m: number) => pad.left + ((m - 1) / 49) * plotW;
  const y = (value: number) => pad.top + (1 - value / bonus) * plotH;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((share) => share * bonus);
  const simplePoints = WAGER_MULTIPLIERS.flatMap((m, index) => {
    const pts = [`${x(m)},${y(simple(m))}`];
    // add the kink where the simple formula hits zero so the line bends in the right place
    const zeroAt = 1 / (1 - rtp);
    const next = WAGER_MULTIPLIERS[index + 1];
    if (next && m < zeroAt && next > zeroAt) pts.push(`${x(zeroAt)},${y(0)}`);
    return pts;
  });
  const hovered = hover === null ? null : curve[hover];
  const pct = (value: number) => `${Math.round((value / bonus) * 100)}%`;
  const money = (value: number) => value.toFixed(2);

  return (
    <div className="ig-viz-body">
      <div className="ig-viz-controls">
        <label>
          <span>{t(wagerText.bonus)} <strong>{bonus}</strong></span>
          <input type="range" min={10} max={100} step={10} value={bonus} onChange={(event) => setBonus(Number(event.target.value))} />
        </label>
        <label>
          <span>{t(wagerText.multiplier)} <strong>{multiplier}×</strong></span>
          <input type="range" min={1} max={50} step={1} value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))} />
        </label>
        <label>
          <span>{t(wagerText.rtp)} <strong>{rtpPct}%</strong></span>
          <input type="range" min={92} max={98} step={1} value={rtpPct} onChange={(event) => setRtpPct(Number(event.target.value))} />
        </label>
        <label>
          <span>{t(wagerText.cap)}</span>
          <select className="ig-viz-select" value={cap} onChange={(event) => setCap(Number(event.target.value))}>
            {WAGER_CAPS.map((value) => (
              <option key={value} value={value}>{value === 0 ? t(wagerText.noCap) : `${value} ${t(wagerText.capOption)}`}</option>
            ))}
          </select>
        </label>
      </div>
      <dl className="ig-viz-stats">
        <div><dt>{t(wagerText.turnover)}</dt><dd>{fmt(bonus * multiplier)}</dd></div>
        <div><dt>{t(wagerText.simple)}</dt><dd>{money(simple(multiplier))}</dd><span>{t(wagerText.simpleHint)}</span></div>
        <div><dt>{t(wagerText.simulated)}</dt><dd>{money(point.cost)} <small>· {pct(point.cost)} {t(wagerText.ofBonus)}</small></dd><span>{t(wagerText.simulatedHint)}</span></div>
        <div><dt>{t(wagerText.finished)}</dt><dd>{Math.round(point.finished * 100)}%</dd></div>
      </dl>
      <ul className="ig-viz-legend">
        <li><i className="is-line" style={{ background: 'var(--viz-1)' }} />{t(wagerText.legendSim)}</li>
        <li><i className="is-line" style={{ background: 'var(--viz-3)' }} />{t(wagerText.legendSimple)}</li>
        <li><i className="is-line is-dashed-key" />{t(wagerText.legendCap)}</li>
      </ul>
      <div ref={ref} className="ig-viz-plot">
        <svg width={width} height={height} role="img" aria-label={`${t(wagerText.axisY)}: ${curve.map((c) => `${c.m}× ${money(c.cost)}`).join(', ')}`}>
          {ticks.map((value) => (
            <g key={value}>
              <line x1={pad.left} x2={width - pad.right} y1={y(value)} y2={y(value)} className={value === 0 ? 'ig-viz-zero' : 'ig-viz-grid'} />
              <text x={pad.left - 8} y={y(value)} dy="0.32em" textAnchor="end" className="ig-viz-tick">{Number.isInteger(value) ? value : value.toFixed(1)}</text>
            </g>
          ))}
          {[1, 10, 20, 30, 40, 50].map((m) => (
            <text key={m} x={x(m)} y={height - 24} textAnchor={m === 1 ? 'start' : m === 50 ? 'end' : 'middle'} className="ig-viz-tick">{m}×</text>
          ))}
          <text x={pad.left + plotW / 2} y={height - 6} textAnchor="middle" className="ig-viz-label">{t(wagerText.axisX)}</text>
          <line x1={x(WAGER_UKGC_CAP)} x2={x(WAGER_UKGC_CAP)} y1={pad.top} y2={pad.top + plotH} className="ig-viz-marker" />
          <polyline points={simplePoints.join(' ')} className="ig-viz-line" style={{ stroke: 'var(--viz-3)' }} />
          <polyline points={curve.map((c) => `${x(c.m)},${y(c.cost)}`).join(' ')} className="ig-viz-line" style={{ stroke: 'var(--viz-1)' }} />
          <circle cx={x(multiplier)} cy={y(point.cost)} r={5} className="ig-viz-dot" style={{ fill: 'var(--viz-1)' }} />
          {hovered ? <line x1={x(hovered.m)} x2={x(hovered.m)} y1={pad.top} y2={pad.top + plotH} className="ig-viz-crosshair" /> : null}
          <rect
            x={pad.left} y={pad.top} width={plotW} height={plotH} fill="transparent" tabIndex={0}
            aria-label={t(wagerText.axisX)}
            onPointerMove={(event) => {
              const box = event.currentTarget.getBoundingClientRect();
              const m = 1 + ((event.clientX - box.left) / box.width) * 49;
              let best = 0;
              WAGER_MULTIPLIERS.forEach((value, index) => { if (Math.abs(value - m) < Math.abs(WAGER_MULTIPLIERS[best] - m)) best = index; });
              setHover(best);
            }}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(WAGER_MULTIPLIERS.indexOf(10))}
            onBlur={() => setHover(null)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') setHover((value) => Math.max(0, (value ?? 0) - 1));
              if (event.key === 'ArrowRight') setHover((value) => Math.min(WAGER_MULTIPLIERS.length - 1, (value ?? 0) + 1));
            }}
          />
        </svg>
        {hovered ? (
          <Tooltip tip={{
            x: Math.min(Math.max(x(hovered.m), 90), width - 90),
            y: pad.top + 8,
            value: `${hovered.m}×`,
            label: `${t(wagerText.legendSim)}: ${money(hovered.cost)} (${pct(hovered.cost)})`,
            extra: `${t(wagerText.legendSimple)}: ${money(simple(hovered.m))}`,
          }} />
        ) : null}
      </div>
      <p className="ig-viz-note">{t(wagerText.note)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function IGamingWidget({ widget, title, caption, t }: {
  widget: IGamingWidgetId;
  title: IGamingLocalized;
  caption: IGamingLocalized;
  t: Translate;
}) {
  return (
    <figure className="ig-viz">
      <figcaption>
        <strong>{t(title)}</strong>
        <span>{t(caption)}</span>
      </figcaption>
      {widget === 'ggr-waterfall' ? <GgrWaterfall t={t} /> : null}
      {widget === 'rtp-convergence' ? <RtpConvergence t={t} /> : null}
      {widget === 'channel-value' ? <ChannelValue t={t} /> : null}
      {widget === 'slot-planner' ? <SlotPlanner t={t} /> : null}
      {widget === 'wagering-cost' ? <WageringCost t={t} /> : null}
    </figure>
  );
}
