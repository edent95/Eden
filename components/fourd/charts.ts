// Canvas charts for the 4D Risk Terminal. Colours are read from the page's CSS variables at draw
// time, so a theme flip only needs a redraw. Hover text goes through `onTip` (null hides it).
import {
  N, OPS, PLANS, pad, rm, rmK, limLabel, capOf, perMonth, oneIn, freqShort, pickPlan,
  type Backtest, type Book, type Config, type SweepRow,
} from '../../services/fourdRisk';

export type Tip = (e: MouseEvent | null, lines?: string[]) => void;
type Palette = ReturnType<typeof readPalette>;

export function readPalette(el: Element) {
  const cs = getComputedStyle(el), v = (name: string) => cs.getPropertyValue(name).trim();
  return {
    ink: v('--rt-ink'), muted: v('--rt-muted'), soft: v('--rt-soft'), line: v('--rt-line'), page: v('--rt-paper'),
    primary: v('--rt-primary'), danger: v('--rt-danger'), success: v('--rt-success'), bar: v('--rt-bar'), area: v('--rt-area'),
    heat: [v('--rt-heat-0'), v('--rt-heat-1'), v('--rt-heat-2'), v('--rt-heat-3'), v('--rt-heat-4')],
    font: getComputedStyle(el).fontFamily,
  };
}

function setup(cv: HTMLCanvasElement, h: number) {
  const dpr = window.devicePixelRatio || 1, w = cv.clientWidth;
  cv.style.height = h + 'px';
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  const ctx = cv.getContext('2d')!; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w };
}

function niceTicks(lo: number, hi: number, count: number) {
  const span = hi - lo || 1, step0 = span / count, mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 2.5, 5, 10].map((x) => x * mag).find((x) => x >= step0)!;
  const out: number[] = []; for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(v);
  return out;
}
const axisNum = (t: number) => rmK(t).replace('RM ', '');
const font = (p: Palette, size = 11, weight = 400) => `${weight} ${size}px ${p.font}`;

export type Marker = { v: number; label: string; color: string };
export function drawHist(cv: HTMLCanvasElement, h: number, p: Palette, sorted: Float64Array, onTip: Tip, opts: {
  lo?: number; hi?: number; bins?: number; clipHi?: boolean; color?: (mid: number) => string; markers?: Marker[];
}) {
  const { ctx, w } = setup(cv, h);
  const n = sorted.length, lo = opts.lo ?? sorted[Math.floor(n * 0.0005)], hi = opts.hi ?? sorted[Math.floor(n * 0.9995)];
  const bins = opts.bins || 60, bw = (hi - lo) / bins || 1, cnt = new Float64Array(bins);
  for (let i = 0; i < n; i++) { if (opts.clipHi && sorted[i] > hi) continue; let b = Math.floor((sorted[i] - lo) / bw); b = Math.max(0, Math.min(bins - 1, b)); cnt[b]++; }
  const maxC = Math.max(...cnt) / n || 1;
  const padL = 44, padR = 8, padT = 22, padB = 22, pw = w - padL - padR, ph = h - padT - padB;
  const X = (v: number) => padL + ((v - lo) / (hi - lo)) * pw, Y = (q: number) => padT + ph - (q / maxC) * ph;
  ctx.font = font(p); ctx.fillStyle = p.muted; ctx.strokeStyle = p.line; ctx.lineWidth = 1;
  niceTicks(0, maxC * 100, 3).forEach((t) => { const y = Math.round(Y(t / 100)) + 0.5; ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke(); ctx.textAlign = 'right'; ctx.fillText(t.toFixed(t < 1 ? 1 : 0) + '%', padL - 6, y + 3); });
  ctx.textAlign = 'center';
  niceTicks(lo, hi, Math.max(3, Math.floor(pw / 90))).forEach((t) => ctx.fillText(axisNum(t), X(t), h - 6));
  for (let b = 0; b < bins; b++) {
    const x0 = X(lo + b * bw), x1 = X(lo + (b + 1) * bw), mid = lo + (b + 0.5) * bw;
    ctx.fillStyle = opts.color ? opts.color(mid) : p.bar;
    const y = Y(cnt[b] / n); ctx.fillRect(x0 + 0.5, y, Math.max(1, x1 - x0 - 1), padT + ph - y);
  }
  let lastX = -Infinity, row = 0;
  (opts.markers || []).forEach((mk) => {
    if (mk.v < lo || mk.v > hi) return;
    const x = Math.round(X(mk.v)) + 0.5; ctx.strokeStyle = mk.color; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(x, padT - 4); ctx.lineTo(x, padT + ph); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = mk.color; const right = x > w - 80; ctx.textAlign = right ? 'right' : 'left'; ctx.font = font(p, 11, 600);
    // labels closer than a label's width stack instead of overlapping
    const tw = ctx.measureText(mk.label).width, x0 = right ? x - 4 - tw : x + 4;
    row = x0 < lastX + 6 ? row + 1 : 0; lastX = Math.max(lastX, x0 + tw);
    ctx.fillText(mk.label, x + (right ? -4 : 4), padT - 8 + row * 14);
  });
  cv.onmousemove = (e) => {
    const mx = e.clientX - cv.getBoundingClientRect().left, b = Math.floor(((mx - padL) / pw) * bins);
    if (b < 0 || b >= bins) return onTip(null);
    onTip(e, [`${rmK(lo + b * bw)} 到 ${rmK(lo + (b + 1) * bw)}`, oneIn(cnt[b] / n)]);
  };
  cv.onmouseleave = () => onTip(null);
}

// x is log-scaled: the first limits differ by thousands, the last by millions
export function drawFrontier(cv: HTMLCanvasElement, h: number, p: Palette, rows: SweepRow[], cfg: Config, sweep: SweepRow[], onTip: Tip) {
  const { ctx, w } = setup(cv, h);
  const lx = (v: number) => Math.log10(1 + Math.max(0, v) / 1000);
  const pts = rows.map((r) => ({ loss: Math.max(0, -r.es99), y: perMonth(r.E), r }));
  const xMaxLoss = Math.max(...pts.map((q) => q.loss), 1000);
  const x1 = lx(xMaxLoss) * 1.06, ys = pts.map((q) => q.y);
  const yLo = Math.min(0, ...ys), y1 = Math.max(...ys) * 1.12 || 1;
  const padL = 52, padR = 16, padT = 16, padB = 38, pw = w - padL - padR, ph = h - padT - padB;
  const X = (loss: number) => padL + (lx(loss) / x1) * pw, Y = (v: number) => padT + ph - ((v - yLo) / (y1 - yLo)) * ph;
  ctx.font = font(p); ctx.strokeStyle = p.line; ctx.fillStyle = p.muted; ctx.lineWidth = 1;
  niceTicks(yLo, y1, 4).forEach((t) => { const y = Math.round(Y(t)) + 0.5; ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke(); ctx.textAlign = 'right'; ctx.fillText(axisNum(t), padL - 6, y + 4); });
  ctx.textAlign = 'center';
  [0, 1000, 10000, 100000, 1000000, 10000000].filter((t) => t <= xMaxLoss * 1.06).forEach((t) => {
    const x = Math.round(X(t)) + 0.5;
    ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, padT + ph); ctx.stroke();
    ctx.fillText(t >= 1e6 ? t / 1e6 + 'M' : t >= 1e3 ? t / 1e3 + 'K' : '0', x, padT + ph + 15);
  });
  ctx.fillText('倒霉时(最差 1% 的期)平均亏多少 →', padL + pw / 2, h - 4);
  ctx.save(); ctx.translate(12, padT + ph / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('平均每月赚 →', 0, 0); ctx.restore();
  ctx.strokeStyle = p.muted; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.5; ctx.beginPath();
  pts.forEach((q, i) => (i ? ctx.lineTo(X(q.loss), Y(q.y)) : ctx.moveTo(X(q.loss), Y(q.y)))); ctx.stroke(); ctx.globalAlpha = 1; ctx.lineWidth = 1;
  pts.forEach((q) => {
    const cur = q.r.limit === cfg.limit;
    ctx.fillStyle = cur ? p.ink : q.r.ok ? p.primary : p.bar;
    ctx.beginPath(); ctx.arc(X(q.loss), Y(q.y), cur ? 6 : 4, 0, Math.PI * 2); ctx.fill();
  });
  // name the points the four plans picked; alternate above / below so neighbours don't collide
  ctx.font = font(p, 11, 600);
  PLANS.map((pl) => [pl, pickPlan(cfg, sweep, pl.id)] as const).filter(([, r]) => r).forEach(([pl, r], i) => {
    const q = pts.find((x) => x.r.limit === r!.limit); if (!q) return;
    const x = X(q.loss), y = Y(q.y), above = i % 2 === 0;
    const tw = ctx.measureText(pl.name).width + 14, th = 20;
    const lx0 = Math.min(Math.max(x - tw / 2, padL), w - padR - tw), ly0 = above ? y - 14 - th : y + 14;
    ctx.fillStyle = p.page; ctx.strokeStyle = p.line;
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(lx0, ly0, tw, th, 10); else ctx.rect(lx0, ly0, tw, th); ctx.fill(); ctx.stroke();
    ctx.fillStyle = p.ink; ctx.textAlign = 'left'; ctx.fillText(pl.name, lx0 + 7, ly0 + 14);
  });
  cv.onmousemove = (e) => {
    const rect = cv.getBoundingClientRect(), mx = e.clientX - rect.left, my = e.clientY - rect.top;
    let hit: (typeof pts)[number] | null = null, bd = 196;
    pts.forEach((q) => { const d = (X(q.loss) - mx) ** 2 + (Y(q.y) - my) ** 2; if (d < bd) { bd = d; hit = q; } });
    if (!hit) return onTip(null);
    const r = (hit as (typeof pts)[number]).r;
    onTip(e, [`上限 ${limLabel(r.limit)}`, `平均每月赚 ${rm(perMonth(r.E))}`, `倒霉时平均 ${rm(r.es99)}`, `一期亏光备用金:${freqShort(r.nAll, r.n)}`]);
  };
  cv.onmouseleave = () => onTip(null);
}

export function drawCum(cv: HTMLCanvasElement, h: number, p: Palette, r: Backtest, onTip: Tip) {
  const { ctx, w } = setup(cv, h);
  const ys = r.cumArr, n = ys.length; if (!n) return;
  const lo = Math.min(0, ...ys), hi = Math.max(0, ...ys) || 1;
  const padL = 56, padR = 12, padT = 12, padB = 24, pw = w - padL - padR, ph = h - padT - padB;
  const X = (i: number) => padL + (n === 1 ? pw / 2 : (i / (n - 1)) * pw), Y = (v: number) => padT + ph - ((v - lo) / (hi - lo || 1)) * ph;
  ctx.font = font(p); ctx.strokeStyle = p.line; ctx.fillStyle = p.muted;
  niceTicks(lo, hi, 4).forEach((t) => { const y = Math.round(Y(t)) + 0.5; ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke(); ctx.textAlign = 'right'; ctx.fillText(axisNum(t), padL - 6, y + 3); });
  ctx.textAlign = 'center';
  const step = Math.max(1, Math.floor(n / Math.max(2, Math.floor(pw / 110))));
  for (let i = 0; i < n; i += step) ctx.fillText(r.draws[i].id.slice(0, 7), X(i), h - 6);
  const y0 = Y(0);
  ctx.beginPath(); ctx.moveTo(X(0), y0); ys.forEach((v, i) => ctx.lineTo(X(i), Y(v))); ctx.lineTo(X(n - 1), y0); ctx.closePath();
  ctx.fillStyle = p.area; ctx.fill();
  ctx.beginPath(); ys.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v)))); ctx.strokeStyle = p.ink; ctx.lineWidth = 1.5; ctx.stroke(); ctx.lineWidth = 1;
  ctx.strokeStyle = p.muted; ctx.beginPath(); ctx.moveTo(padL, Math.round(y0) + 0.5); ctx.lineTo(w - padR, Math.round(y0) + 0.5); ctx.stroke();
  const worst10 = [...r.draws.keys()].sort((a, b) => r.draws[a].profit - r.draws[b].profit).slice(0, 10);
  ctx.fillStyle = p.danger;
  worst10.forEach((i) => { if (r.draws[i].profit < 0) { ctx.beginPath(); ctx.arc(X(i), Y(ys[i]), 3, 0, Math.PI * 2); ctx.fill(); } });
  cv.onmousemove = (e) => {
    const mx = e.clientX - cv.getBoundingClientRect().left, i = Math.round(((mx - padL) / pw) * (n - 1));
    if (i < 0 || i >= n) return onTip(null);
    const d = r.draws[i];
    onTip(e, [d.id, `这期 ${rm(d.profit)}`, `到这期一共 ${rm(ys[i])}`]);
  };
  cv.onmouseleave = () => onTip(null);
}

// sorted payout ratios against the line, log-log, so the few heavy numbers and the long light tail both show
export function drawShape(cv: HTMLCanvasElement, h: number, p: Palette, ratio: Float64Array, onTip: Tip) {
  const { ctx, w } = setup(cv, h);
  const v = Float64Array.from(ratio).sort().reverse(), n = v.length;
  const padL = 48, padR = 10, padT = 14, padB = 24, pw = w - padL - padR, ph = h - padT - padB;
  const yMax = Math.max(4, v[0]), lyLo = Math.log10(0.05), lyHi = Math.log10(yMax * 1.15);
  const Y = (r: number) => padT + ph - ((Math.log10(Math.max(r, 0.05)) - lyLo) / (lyHi - lyLo)) * ph;
  const X = (rank: number) => padL + (Math.log10(rank) / Math.log10(n)) * pw;
  ctx.font = font(p); ctx.fillStyle = p.muted; ctx.strokeStyle = p.line; ctx.lineWidth = 1;
  [0.1, 0.5, 1, 5, 10, 50, 100].filter((t) => t <= yMax * 1.15).forEach((t) => { const y = Math.round(Y(t)) + 0.5; ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke(); ctx.textAlign = 'right'; ctx.fillText(t + ' 倍', padL - 6, y + 3); });
  ctx.textAlign = 'center';
  [1, 10, 100, 1000, 10000].filter((t) => t <= n).forEach((t) => ctx.fillText(`第 ${t.toLocaleString()} 个`, Math.min(X(t), w - padR - 24), h - 6));
  const y1 = Y(1), col: number[] = [];
  for (let px = 0; px <= pw; px++) { const rank = Math.min(n, Math.max(1, Math.round(Math.pow(n, px / pw)))); col.push(v[rank - 1]); }
  col.forEach((r, px) => { const y = Y(r); ctx.fillStyle = r > 1 ? p.danger : p.area; ctx.fillRect(padL + px, Math.min(y, y1), 1, Math.abs(y - y1)); });
  ctx.strokeStyle = p.ink; ctx.lineWidth = 1.5; ctx.beginPath();
  col.forEach((r, px) => (px ? ctx.lineTo(padL + px, Y(r)) : ctx.moveTo(padL + px, Y(r)))); ctx.stroke();
  ctx.setLineDash([4, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Math.round(y1) + 0.5); ctx.lineTo(w - padR, Math.round(y1) + 0.5); ctx.stroke(); ctx.setLineDash([]);
  ctx.font = font(p, 11, 600); ctx.textAlign = 'right'; ctx.fillStyle = p.ink; ctx.fillText('平线', w - padR - 4, y1 - 6);
  let nh = 0; while (nh < n && v[nh] > 1) nh++;
  ctx.textAlign = 'left'; ctx.font = font(p);
  if (nh) { ctx.fillStyle = p.danger; ctx.fillText(`← 太重 ${nh.toLocaleString()} 个`, X(nh) + 6, y1 - 8); }
  ctx.fillStyle = p.muted; ctx.fillText('还能多收', X(Math.max(nh * 4, 300)), Y(0.25));
  cv.onmousemove = (e) => {
    const px = Math.round(e.clientX - cv.getBoundingClientRect().left - padL);
    if (px < 0 || px > pw) return onTip(null);
    const rank = Math.min(n, Math.max(1, Math.round(Math.pow(n, px / pw)))), r = v[rank - 1];
    onTip(e, [`排第 ${rank.toLocaleString()} 的字`, r > 0 ? `是平线的 ${r < 10 ? r.toFixed(2) : Math.round(r)} 倍` : '没人买']);
  };
  cv.onmouseleave = () => onTip(null);
}

// ---------- 100 × 100 number map ----------
export type HeatMetric = 'ret' | 'gross' | 'stake';
export function heatValue(cfg: Config, bk: Book, op: number, metric: HeatMetric, n: number) {
  const i = op * N + n, o = cfg.odds[op];
  if (metric === 'ret') return bk.L[0][i];
  if (metric === 'gross') return o.big[0] * cfg.B[i] + o.small[0] * cfg.S[i];
  return cfg.B[i] + cfg.S[i];
}
export function liabBand(v: number, limit: number) { if (v <= 0) return 0; const t = v / (limit || 1); return t > 1.0001 ? 4 : t > 0.5 ? 3 : t > 0.1 ? 2 : 1; }

export function heatBands(cfg: Config, bk: Book, op: number, metric: HeatMetric) {
  const vals = Float64Array.from({ length: N }, (_, n) => heatValue(cfg, bk, op, metric, n));
  let cuts = [0, 0, 0];
  if (metric === 'stake') {
    const arr = [...vals].filter((v) => v > 0).sort((a, b) => a - b);
    const q = (x: number) => arr[Math.floor(x * (arr.length - 1))] || 0;
    cuts = [q(0.9), q(0.98), q(0.995)];
  }
  const band = (v: number, n: number) => {
    if (metric !== 'stake') return liabBand(v, capOf(cfg, op * N + n));
    if (v <= 0) return 0;
    return v >= cuts[2] ? 4 : v >= cuts[1] ? 3 : v >= cuts[0] ? 2 : 1;
  };
  const bands = Uint8Array.from(vals, (v, n) => band(v, n)), counts = [0, 0, 0, 0, 0];
  bands.forEach((b) => counts[b]++);
  return { bands, counts, cuts };
}

export function drawHeat(cv: HTMLCanvasElement, p: Palette, bands: Uint8Array, selected: number | null) {
  const size = cv.clientWidth, dpr = window.devicePixelRatio || 1;
  cv.width = Math.round(size * dpr); cv.height = Math.round(size * dpr);
  const ctx = cv.getContext('2d')!; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const c = size / 100, gap = c > 4 ? 1 : 0;
  ctx.fillStyle = p.page; ctx.fillRect(0, 0, size, size);
  for (let n = 0; n < N; n++) { ctx.fillStyle = p.heat[bands[n]]; ctx.fillRect((n % 100) * c, Math.floor(n / 100) * c, c - gap, c - gap); }
  ctx.strokeStyle = p.line;
  for (let i = 10; i < 100; i += 10) { ctx.beginPath(); ctx.moveTo(i * c - gap / 2, 0); ctx.lineTo(i * c - gap / 2, size); ctx.moveTo(0, i * c - gap / 2); ctx.lineTo(size, i * c - gap / 2); ctx.stroke(); }
  if (selected !== null) {
    const sr = Math.floor(selected / 100), sc = selected % 100;
    ctx.strokeStyle = p.ink; ctx.lineWidth = 2; ctx.strokeRect(sc * c - 1, sr * c - 1, c + 1, c + 1); ctx.lineWidth = 1;
  }
}

export function heatCell(cv: HTMLCanvasElement, e: MouseEvent) {
  const rect = cv.getBoundingClientRect(), c = rect.width / 100;
  const col = Math.floor((e.clientX - rect.left) / c), r = Math.floor((e.clientY - rect.top) / c);
  return col < 0 || col > 99 || r < 0 || r > 99 ? -1 : r * 100 + col;
}

export const heatTip = (cfg: Config, bk: Book, op: number, n: number) => {
  const i = op * N + n;
  return [`${OPS[op].id}·${pad(n)}`, `客人下注 ${rm(cfg.B[i] + cfg.S[i])}(Big ${rm(cfg.B[i])} · Small ${rm(cfg.S[i])})`, `开头奖我要赔 ${rm(bk.L[0][i])}`, ...(cfg.caps?.[i] !== undefined ? [`单独上限 ${limLabel(cfg.caps[i])}`] : [])];
};

