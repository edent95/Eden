// 4D Risk Terminal engine: a bookmaker's view of one 4D draw across three operators.
// Pure functions over a Config (no DOM), so the page and the unit tests share it.
// Book arrays are indexed op * N + number.

export const N = 10000;
export const OPS = [
  { id: 'M', name: 'Magnum' },
  { id: 'K', name: '大马彩 DMC' },
  { id: 'T', name: '多多 Toto' },
] as const;
export const NO = OPS.length;
export const TOT = NO * N;
export const PRIZE = ['头奖', '二奖', '三奖', '特别奖', '安慰奖'] as const;
export const COUNT = [1, 1, 1, 10, 10];
export const SLOT_TYPE: number[] = Array.from({ length: 23 }, (_, i) => (i < 3 ? i : i < 13 ? 3 : 4));
export const DRAWS_PER_MONTH = 13; // Wed / Sat / Sun draws, about 13 a month
export const YEAR_DRAWS = 156; // 3 draws a week
export const SWEEP_CAPS = [0, 5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 75000, 100000, 125000, 150000, 200000, 300000, 500000, 1000000, Infinity];
export const SWEEP_SIMS = 30000;
export const SAMPLE_SEED = 20261021;

export type Odds = { big: number[]; small: number[] };
export type Provider = { name: string; comm: number; fee: number; cap: number; confirmed: boolean };
export type Config = {
  B: Float64Array;
  S: Float64Array;
  odds: Odds[];
  providers: Provider[];
  limit: number;
  reserve: number;
  opCost: number;
  seed: number;
  sims: number;
  horizon: number;
  ruinTarget: number;
};

export const pad = (n: number) => String(n).padStart(4, '0');
export const opOf = (i: number) => Math.floor(i / N);
export const numOf = (i: number) => i % N;
export const tag = (i: number) => `${OPS[opOf(i)].id}·${pad(numOf(i))}`;

// ---------- formatting ----------
export const rm = (v: number) => (v < 0 ? '−' : '') + 'RM ' + Math.round(Math.abs(v)).toLocaleString('en-US');
export const rmK = (v: number) => {
  const a = Math.abs(v), s = v < 0 ? '−' : '';
  if (a >= 1e6) return s + 'RM ' + (a / 1e6).toFixed(a >= 1e7 ? 1 : 2) + 'M';
  if (a >= 1e4) return s + 'RM ' + (a / 1e3).toFixed(a >= 1e5 ? 0 : 1) + 'K';
  return rm(v);
};
export const pct = (v: number, d = 1) => (v * 100).toFixed(d) + '%';
export const tone = (v: number) => (v >= 0 ? 'pos' : 'neg');
export const oneIn = (p: number) => (p <= 0 ? '几乎不会' : p >= 0.5 ? `约 ${Math.round(p * 10)} / 10` : `大约每 ${Math.round(1 / p).toLocaleString()} 次有 1 次`);
export const limLabel = (l: number) => (l === 0 ? '0(全部交给上家)' : l === Infinity ? '不设上限(全部自己留)' : rmK(l));
export const perMonth = (x: number) => x * DRAWS_PER_MONTH;

// ---------- PRNG ----------
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const defaultOdds = (): Odds => ({ big: [2500, 1000, 500, 180, 60], small: [3500, 2000, 1000, 0, 0] });
export const defaultProviders = (): Provider[] => [
  { name: '上家 A', comm: 0.08, fee: 0.01, cap: 50000, confirmed: true },
  { name: '上家 B', comm: 0.05, fee: 0.005, cap: 100000, confirmed: false },
];

// ---------- sample book ----------
function sampleOp(seed: number, total: number, fixed: Record<number, [number, number]>) {
  const r = rng(seed), B = new Float64Array(N), S = new Float64Array(N);
  const gauss = () => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
  const add = (n: number, amt: number) => { const b = amt * (0.6 + 0.25 * r()); B[n] += b; S[n] += amt - b; };
  for (let n = 0; n < N; n++) if (r() < 0.55) add(n, Math.exp(1.0 + 0.9 * gauss()));
  for (let d = 0; d < 10; d++) add(d * 1111, 60 + r() * 90);
  [123, 1234, 2345, 3456, 4567, 5678, 6789, 9876, 8765, 7654, 6543, 5432, 4321, 3210].forEach((n) => add(n, 30 + r() * 50));
  for (let y = 1950; y <= 2012; y++) add(y, 6 + r() * 14);
  for (let m = 1; m <= 12; m++) for (let d = 1; d <= 31; d++) { add(m * 100 + d, 2 + r() * 4); add(d * 100 + m, 1 + r() * 3); }
  [1688, 1314, 5201, 6688, 8899, 3388, 1168, 8168, 9988, 2828, 5888, 8988, 1818, 3838, 6868, 8668, 1668, 2688, 3168].forEach((n) => add(n, 25 + r() * 60));
  for (let a = 0; a < 10; a++) for (let b = 0; b < 10; b++) if (a !== b) add(a * 1010 + b * 101, 4 + r() * 8);
  let rest = 0, fixedSum = 0;
  for (let n = 0; n < N; n++) if (!(n in fixed)) rest += B[n] + S[n];
  for (const k in fixed) fixedSum += fixed[k][0] + fixed[k][1];
  const scale = (total - fixedSum) / rest;
  for (let n = 0; n < N; n++) {
    if (n in fixed) { B[n] = fixed[n][0]; S[n] = fixed[n][1]; continue; }
    B[n] = Math.round(B[n] * scale); S[n] = Math.round(S[n] * scale);
  }
  return { B, S };
}

export function sampleBook(seed = SAMPLE_SEED) {
  const B = new Float64Array(TOT), S = new Float64Array(TOT);
  const plan: Array<[number, Record<number, [number, number]>]> = [
    [45000, { 8888: [500, 200], 1234: [280, 120], 1688: [100, 50], 7777: [180, 60], 9999: [50, 0] }],
    [20000, {}],
    [35000, { 8888: [260, 90] }],
  ];
  plan.forEach(([total, fixed], op) => { const s = sampleOp(seed + op * 7919, total, fixed); B.set(s.B, op * N); S.set(s.S, op * N); });
  return { B, S };
}

export const gross1 = (cfg: Config, i: number) => { const o = cfg.odds[opOf(i)]; return o.big[0] * cfg.B[i] + o.small[0] * cfg.S[i]; };
export const stake = (cfg: Config, i: number) => cfg.B[i] + cfg.S[i];

// ---------- allocation + liability ----------
export type Book = ReturnType<typeof computeBook>;
export function computeBook(cfg: Config, limit: number) {
  const { B, S } = cfg;
  const f = new Float64Array(TOT), opT = new Float64Array(NO);
  let want = 0, T = 0, overGross = 0;
  for (let i = 0; i < TOT; i++) {
    const o = cfg.odds[opOf(i)], L1 = o.big[0] * B[i] + o.small[0] * S[i];
    f[i] = L1 <= limit || L1 === 0 ? 1 : limit / L1;
    if (L1 > limit) overGross++;
    want += (1 - f[i]) * (B[i] + S[i]);
    T += B[i] + S[i]; opT[opOf(i)] += B[i] + S[i];
  }
  const capTot = cfg.providers.reduce((s, p) => s + p.cap, 0);
  const ratio = want > capTot ? capTot / want : 1;
  const Br = new Float64Array(TOT), Sr = new Float64Array(TOT), Bt = new Float64Array(TOT), St = new Float64Array(TOT);
  const L = PRIZE.map(() => new Float64Array(TOT));
  const opR = new Float64Array(NO), opE = new Float64Array(NO);
  let R = 0, overRet = 0, Ecl = 0;
  for (let i = 0; i < TOT; i++) {
    const op = opOf(i), o = cfg.odds[op], tf = (1 - f[i]) * ratio;
    Bt[i] = B[i] * tf; St[i] = S[i] * tf; Br[i] = B[i] - Bt[i]; Sr[i] = S[i] - St[i];
    R += Br[i] + Sr[i]; opR[op] += Br[i] + Sr[i];
    for (let k = 0; k < 5; k++) { const v = o.big[k] * Br[i] + o.small[k] * Sr[i]; L[k][i] = v; const e = (v * COUNT[k]) / N; Ecl += e; opE[op] += e; }
    if (L[0][i] > limit + 0.5) overRet++;
  }
  const U = T - R;
  const alloc = cfg.providers.map((p) => ({ name: p.name, U: 0, comm: 0, fee: 0, confirmed: p.confirmed }));
  let rem = U;
  for (const i of providerOrder(cfg)) {
    const take = Math.min(rem, cfg.providers[i].cap);
    alloc[i].U = take; alloc[i].comm = take * cfg.providers[i].comm; alloc[i].fee = take * cfg.providers[i].fee; rem -= take;
  }
  const comm = alloc.reduce((s, a) => s + a.comm, 0), fee = alloc.reduce((s, a) => s + a.fee, 0);
  const base = R + comm - fee - cfg.opCost;
  const active: number[] = []; for (let op = 0; op < NO; op++) if (opT[op] > 0) active.push(op);
  return { limit, T, R, U, Br, Sr, Bt, St, L, alloc, comm, fee, base, Ecl, Eprofit: base - Ecl, forced: want - want * ratio, overGross, overRet, opT, opR, opE, active };
}

// providers fill by net commission, best first
function providerOrder(cfg: Config) {
  return cfg.providers.map((_, i) => i).sort((a, b) => (cfg.providers[b].comm - cfg.providers[b].fee) - (cfg.providers[a].comm - cfg.providers[a].fee));
}

export function allocFor(cfg: Config, U: number) {
  const out: Array<{ p: Provider; take: number }> = []; let rem = U;
  for (const i of providerOrder(cfg)) { const p = cfg.providers[i], take = Math.min(rem, p.cap); if (take > 0) out.push({ p, take }); rem -= take; }
  return { out, left: rem };
}

// ---------- Monte Carlo ----------
export function simulate(bk: Book, sims: number, seed: number) {
  const r = rng(seed), out = new Float64Array(sims), mark = new Uint32Array(TOT), L = bk.L;
  for (let s = 0; s < sims; s++) {
    const stamp = s + 1; let c = 0;
    for (const op of bk.active) {
      const off = op * N;
      for (let i = 0; i < 23; i++) {
        let x; do { x = off + ((r() * N) | 0); } while (mark[x] === stamp);
        mark[x] = stamp; c += L[SLOT_TYPE[i]][x];
      }
    }
    out[s] = bk.base - c;
  }
  return out;
}

export type Stats = ReturnType<typeof stats>;
export function stats(p: Float64Array) {
  const s = Float64Array.from(p).sort(), n = s.length;
  let sum = 0, loss = 0; for (let i = 0; i < n; i++) { sum += s[i]; if (s[i] < 0) loss++; }
  const q = (a: number) => s[Math.min(n - 1, Math.max(0, Math.floor(a * (n - 1))))];
  const k = Math.max(1, Math.floor(n * 0.01)); let es = 0; for (let i = 0; i < k; i++) es += s[i];
  return { mean: sum / n, pLoss: loss / n, q05: q(0.05), q01: q(0.01), q50: q(0.5), es99: es / k, min: s[0], sorted: s, n };
}

export function ruin(p: Float64Array, capital: number, horizon: number, paths: number, seed: number) {
  const r = rng(seed ^ 0x9e3779b9), n = p.length; let ruined = 0;
  for (let k = 0; k < paths; k++) {
    let c = capital;
    for (let t = 0; t < horizon; t++) { c += p[(r() * n) | 0]; if (c < 0) { ruined++; break; } }
  }
  return ruined / paths;
}

// draws (out of sorted profits) that lose at least `amt`
export function countLoss(sorted: Float64Array, amt: number) {
  let lo = 0, hi = sorted.length;
  while (lo < hi) { const m = (lo + hi) >> 1; if (sorted[m] <= -amt) lo = m + 1; else hi = m; }
  return lo;
}

// ---------- exact worst case: per operator, assign the 23 prize slots to distinct numbers (Hungarian) ----------
function topK(arr: Float64Array, off: number, k: number) {
  const vals: number[] = [], idx: number[] = [];
  for (let n = 0; n < N; n++) {
    const v = arr[off + n];
    if (vals.length < k || v > vals[vals.length - 1]) {
      let j = vals.length; while (j > 0 && vals[j - 1] < v) j--;
      vals.splice(j, 0, v); idx.splice(j, 0, n);
      if (vals.length > k) { vals.pop(); idx.pop(); }
    }
  }
  return idx;
}

export type WorstSlot = { op: number; slot: number; type: number; num: number; pay: number };
function worstOp(bk: Book, op: number): WorstSlot[] {
  const off = op * N, cand = new Set<number>();
  for (let k = 0; k < 5; k++) topK(bk.L[k], off, 23).forEach((n) => cand.add(n));
  const cols = [...cand], n = 23, m = cols.length;
  const a = (i: number, j: number) => -bk.L[SLOT_TYPE[i - 1]][off + cols[j - 1]];
  const u = new Float64Array(n + 1), v = new Float64Array(m + 1), p = new Int32Array(m + 1), way = new Int32Array(m + 1);
  for (let i = 1; i <= n; i++) {
    p[0] = i; let j0 = 0;
    const minv = new Float64Array(m + 1).fill(Infinity), used = new Uint8Array(m + 1);
    do {
      used[j0] = 1; const i0 = p[j0]; let delta = Infinity, j1 = 0;
      for (let j = 1; j <= m; j++) if (!used[j]) {
        const cur = a(i0, j) - u[i0] - v[j];
        if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
        if (minv[j] < delta) { delta = minv[j]; j1 = j; }
      }
      for (let j = 0; j <= m; j++) if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta;
      j0 = j1;
    } while (p[j0] !== 0);
    do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
  }
  const assign: WorstSlot[] = [];
  for (let j = 1; j <= m; j++) if (p[j]) { const slot = p[j] - 1, num = cols[j - 1]; assign.push({ op, slot, type: SLOT_TYPE[slot], num, pay: bk.L[SLOT_TYPE[slot]][off + num] }); }
  return assign.sort((x, y) => x.slot - y.slot);
}

export type Worst = ReturnType<typeof worstCase>;
export function worstCase(bk: Book) {
  const byOp: Record<number, WorstSlot[]> = {}; let claims = 0;
  for (const op of bk.active) { byOp[op] = worstOp(bk, op); claims += byOp[op].reduce((s, x) => s + x.pay, 0); }
  return { byOp, claims, profit: bk.base - claims };
}

// ---------- how often ----------
export function lnGamma(z: number): number {
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1; let x = c[0]; for (let i = 1; i < 9; i++) x += c[i] / (z + i);
  const t = z + 7.5; return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
const lnC = (n: number, k: number) => lnGamma(n + 1) - lnGamma(k + 1) - lnGamma(n - k + 1);
// chance of one exact result (1st/2nd/3rd in order, specials and consolations as sets) for every operator at once, as a power of ten
export function worstLog10(ops: number) { return Math.round((ops * (Math.log(N) + Math.log(N - 1) + Math.log(N - 2) + lnC(N - 3, 10) + lnC(N - 13, 10))) / Math.LN10); }
export const UNIVERSE = '就算从宇宙诞生开始每周开 3 期，到今天也只开了约 2 万亿期(10¹²)';
export function yearsText(every: number) {
  const yrs = every / YEAR_DRAWS;
  return yrs >= 1 ? `约 ${yrs >= 10 ? Math.round(yrs).toLocaleString() : yrs.toFixed(1)} 年 1 次` : `约 ${Math.max(1, Math.round(every / DRAWS_PER_MONTH))} 个月 1 次`;
}
export function freqLong(cnt: number, n: number) {
  if (!cnt) return `电脑开了 ${n.toLocaleString()} 期，一次都没碰到`;
  const every = n / cnt;
  return `大约每 ${Math.round(every).toLocaleString()} 期 1 次(${yearsText(every)})`;
}
export const freqShort = (cnt: number, n: number) => (cnt ? yearsText(n / cnt) : `${Math.round(n / 10000)} 万期没碰到`);

// ---------- full run for the current limit ----------
export type Run = { book: Book; sim: Stats; worst: Worst; ruinP: number };
export function runCurrent(cfg: Config): Run {
  const book = computeBook(cfg, cfg.limit);
  const raw = simulate(book, cfg.sims, cfg.seed);
  return { book, sim: stats(raw), worst: worstCase(book), ruinP: ruin(raw, cfg.reserve, cfg.horizon, 3000, cfg.seed) };
}

// ---------- limit sweep + plans ----------
function monthly(raw: Float64Array, seed: number) {
  const r = rng(seed ^ 0x2545f491), n = raw.length, M = 3000, out = new Float64Array(M);
  for (let m = 0; m < M; m++) { let s = 0; for (let k = 0; k < DRAWS_PER_MONTH; k++) s += raw[(r() * n) | 0]; out[m] = s; }
  out.sort();
  let loss = 0; for (let i = 0; i < M; i++) if (out[i] < 0) loss++;
  const k = Math.max(1, Math.floor(M * 0.01)); let es = 0; for (let i = 0; i < k; i++) es += out[i];
  return { mP10: out[Math.floor(0.1 * (M - 1))], mLoss: loss / M, mES99: es / k };
}

export type SweepRow = ReturnType<typeof evalLimit>;
export function evalLimit(cfg: Config, limit: number) {
  const bk = computeBook(cfg, limit), raw = simulate(bk, SWEEP_SIMS, cfg.seed), st = stats(raw), w = worstCase(bk);
  const row = {
    limit, R: bk.R, U: bk.U, Ecl: bk.Ecl, forced: bk.forced, E: bk.Eprofit, pLoss: st.pLoss, var99: st.q01, es99: st.es99, worst: w.profit,
    ruin: ruin(raw, cfg.reserve, cfg.horizon, 2000, cfg.seed), ...monthly(raw, cfg.seed),
    ops: bk.active.length, n: raw.length, T: bk.T, base: bk.base, claimsW: w.claims,
    nHalf: countLoss(st.sorted, cfg.reserve / 2), nAll: countLoss(st.sorted, cfg.reserve), ok: false,
  };
  row.ok = PLAN_BY_ID.balanced.rule(row, cfg);
  return row;
}

export type PlanId = 'safe' | 'balanced' | 'monthly' | 'risky';
export type Plan = {
  id: PlanId;
  name: string;
  tag: string;
  badge?: string;
  rule: (r: SweepRow, cfg: Config) => boolean;
  promise: (cfg: Config) => string;
  why: (r: SweepRow, cfg: Config) => string;
};
export const PLANS: Plan[] = [
  {
    id: 'safe', name: '保险一点', tag: '赚少一点，几乎不会出事',
    rule: (r, c) => -r.worst <= 0.5 * c.reserve && r.ruin <= 0.001,
    promise: (c) => `就算开出理论上最惨的号码，也只用掉一半以内的备用金(${rmK(c.reserve / 2)})。连续做一年，赔光的机会几乎是零(0.1% 以下)。`,
    why: (r, c) => (-r.worst > 0.5 * c.reserve ? `最惨的一期会亏 ${rmK(-r.worst)},超过备用金的一半` : `一年内赔光的机会有 ${pct(r.ruin, 1)}`),
  },
  {
    id: 'balanced', name: '平衡', tag: '最惨的一期也赔得起', badge: '建议',
    rule: (r, c) => -r.worst <= c.reserve && r.ruin <= c.ruinTarget,
    promise: (c) => `就算开出理论上最惨的号码，备用金 ${rmK(c.reserve)} 也赔得起。连续做一年，赔光的机会不超过 ${pct(c.ruinTarget, 1)}。`,
    why: (r, c) => (-r.worst > c.reserve ? `最惨的一期会亏 ${rmK(-r.worst)},备用金赔不起` : `一年内赔光的机会有 ${pct(r.ruin, 1)}`),
  },
  {
    id: 'monthly', name: '每月赚最多', tag: '看每个月的收入，不怕偶尔一期大亏',
    rule: (r, c) => -r.mES99 <= c.reserve && r.ruin <= 0.05,
    promise: () => '不管理论上最惨的那一期，只看每个月：最倒霉的 1% 月份平均亏损不超过备用金;连续做一年，赔光的机会不超过 5%。在这个前提下每月平均赚最多。',
    why: (r, c) => (-r.mES99 > c.reserve ? `最倒霉的 1% 月份平均会亏 ${rmK(-r.mES99)},超过备用金` : `一年内赔光的机会有 ${pct(r.ruin, 1)}`),
  },
  {
    id: 'risky', name: '高风险派', tag: '全部自己留，平均最高，可能一次赔光',
    rule: (r) => r.limit === Infinity,
    promise: () => '不设上限，客人的下注全部自己留，一分钱都不交给上家。',
    why: () => '',
  },
];
export const PLAN_BY_ID = Object.fromEntries(PLANS.map((p) => [p.id, p])) as Record<PlanId, Plan>;

export const sweepKey = (cfg: Config, bookVer: number) => JSON.stringify([bookVer, cfg.odds, cfg.providers, cfg.reserve, cfg.opCost, cfg.seed, cfg.horizon, cfg.ruinTarget]);
export const runSweep = (cfg: Config): SweepRow[] => SWEEP_CAPS.map((l) => evalLimit(cfg, l));
export function pickPlan(cfg: Config, sweep: SweepRow[] | null, id: PlanId) {
  if (!sweep) return null;
  const ok = sweep.filter((r) => PLAN_BY_ID[id].rule(r, cfg));
  return ok.length ? ok.reduce((a, b) => (b.E > a.E + 1e-6 ? b : a)) : null;
}

// ---------- the house view: is the book flat enough to earn the edge steadily ----------
// a number is "on the line" when its first-prize payout equals the per-number cap
export function houseLimit(cfg: Config, sweep: SweepRow[] | null) {
  if (cfg.limit > 0 && cfg.limit !== Infinity) return { lim: cfg.limit, from: '你现在的上限' };
  const b = pickPlan(cfg, sweep, 'balanced');
  if (b && b.limit > 0 && b.limit !== Infinity) return { lim: b.limit, from: '「平衡」的上限' };
  return { lim: 50000, from: 'RM 50K(你现在没设上限，先拿这个比)' };
}

export type Scan = ReturnType<typeof houseScan>;
export function houseScan(cfg: Config, lim: number) {
  const ops = OPS.map((_, op) => {
    let T = 0, B = 0, g = 0;
    for (let n = 0; n < N; n++) { const i = op * N + n; T += stake(cfg, i); B += cfg.B[i]; g += gross1(cfg, i); }
    const per = T ? g / T : cfg.odds[op].big[0] * 0.7 + cfg.odds[op].small[0] * 0.3;
    return { op, T, bShare: T ? B / T : 0.7, line: lim / per, heavy: 0, ok: 0, light: 0, zero: 0, excess: 0, room: 0 };
  });
  const ratio = new Float64Array(TOT);
  for (let i = 0; i < TOT; i++) {
    const o = ops[opOf(i)], v = stake(cfg, i), r = gross1(cfg, i) / lim; ratio[i] = r;
    if (r > 1) { o.heavy++; o.excess += v * (1 - 1 / r); }
    else { if (r >= 0.5) o.ok++; else { o.light++; if (v === 0) o.zero++; } o.room += Math.max(0, o.line - v); }
  }
  return { ops, ratio };
}

// ---------- number patterns ----------
export const CATS = [
  { name: '四个一样', ex: '8888' },
  { name: '顺子', ex: '1234、4321' },
  { name: '成双', ex: '1212、1122、1221' },
  { name: '年份', ex: '1988、2008' },
  { name: '日期', ex: '0815、1508' },
  { name: '其他', ex: '' },
];
// earlier classes win
export function classify(n: number) {
  const d = pad(n), v = [...d].map(Number);
  if (v.every((x) => x === v[0])) return 0;
  if (v.every((x, i) => !i || x === v[i - 1] + 1) || v.every((x, i) => !i || x === v[i - 1] - 1)) return 1;
  if ((d[0] === d[1] && d[2] === d[3]) || (d[0] === d[2] && d[1] === d[3]) || (d[0] === d[3] && d[1] === d[2])) return 2;
  if ((n >= 1950 && n <= 1999) || (n >= 2000 && n <= 2026)) return 3;
  const a = Math.floor(n / 100), b = n % 100;
  if ((a >= 1 && a <= 12 && b >= 1 && b <= 31) || (b >= 1 && b <= 12 && a >= 1 && a <= 31)) return 4;
  return 5;
}
export const CAT_OF = Uint8Array.from({ length: N }, (_, n) => classify(n));
export const CAT_SIZE = CATS.map((_, c) => CAT_OF.reduce((s, x) => s + (x === c ? 1 : 0), 0));

// how full each pattern class is, measured against the line (1x = exactly on the line)
export function catStats(cfg: Config, scan: Scan) {
  const cats = CATS.map((c) => ({ ...c, v: 0, n: 0, heavy: 0, light: 0, excess: 0, room: 0, money: 0, x: 0 }));
  for (let i = 0; i < TOT; i++) {
    const c = cats[CAT_OF[numOf(i)]], o = scan.ops[opOf(i)], v = stake(cfg, i), r = scan.ratio[i];
    c.v += v / o.line; c.n++; c.money += v;
    if (r > 1) { c.heavy++; c.excess += v * (1 - 1 / r); } else { if (r < 0.5) c.light++; c.room += Math.max(0, o.line - v); }
  }
  cats.forEach((c) => { c.x = c.v / c.n; });
  return cats;
}
export const catCall = (x: number) => (x > 1.2 ? { word: '太多', tone: 'neg' } : x >= 0.5 ? { word: '刚好', tone: 'pos' } : x >= 0.2 ? { word: '有点不够', tone: 'warn' } : { word: '很不够', tone: 'open' });

// same money, but the excess on heavy numbers moved onto numbers with room under the line
export function evenScenario(cfg: Config, lim: number, scan: Scan) {
  const B = Float64Array.from(cfg.B), S = Float64Array.from(cfg.S);
  for (const o of scan.ops) {
    const move = Math.min(o.excess, o.room); if (!move) continue;
    for (let n = 0; n < N; n++) {
      const i = o.op * N + n, r = scan.ratio[i], v = stake(cfg, i);
      if (r > 1) { const keep = 1 - (1 - 1 / r) * (move / o.excess); B[i] *= keep; S[i] *= keep; }
      else { const add = (Math.max(0, o.line - v) / o.room) * move; B[i] += add * o.bShare; S[i] += add * (1 - o.bShare); }
    }
  }
  const run = (c: Config) => { const bk = computeBook(c, lim); return { bk, st: stats(simulate(bk, SWEEP_SIMS, c.seed)), w: worstCase(bk) }; };
  return { now: run(cfg), even: run({ ...cfg, B, S }), moved: scan.ops.reduce((s, o) => s + Math.min(o.excess, o.room), 0) };
}

// ---------- keep everything: no upline, so the excess is refused instead of passed on ----------
// The stop line X is the highest first-prize payout a number may carry such that the exact worst draw,
// with every heavier number cut back to X, still fits in the reserve. Numbers over X are "拿掉";
// the money they would have brought is then offered to numbers still under the line ("加"),
// as much of it as keeps the worst draw inside the reserve.
const solo = (cfg: Config): Config => ({ ...cfg, providers: [], limit: Infinity });
function cutTo(cfg: Config, X: number) {
  const B = Float64Array.from(cfg.B), S = Float64Array.from(cfg.S);
  for (let i = 0; i < TOT; i++) { const g = gross1(cfg, i); if (g > X) { const f = X / g; B[i] *= f; S[i] *= f; } }
  return { ...cfg, B, S };
}
const worstProfit = (cfg: Config) => worstCase(computeBook(cfg, Infinity)).profit;

export type KeepAll = ReturnType<typeof keepAllPlan>;
export function keepAllPlan(cfg: Config) {
  const base = solo(cfg), fits = (c: Config) => worstProfit(c) >= -cfg.reserve;
  let maxG = 0; for (let i = 0; i < TOT; i++) maxG = Math.max(maxG, gross1(base, i));
  let X = Infinity;
  if (!fits(base)) {
    let lo = 0, hi = maxG;
    for (let k = 0; k < 24; k++) { const m = (lo + hi) / 2; if (fits(cutTo(base, m))) lo = m; else hi = m; }
    X = Math.floor(lo / 100) * 100;
  }
  const cut = X === Infinity ? base : cutTo(base, X);

  const stops: Array<{ i: number; now: number; max: number; cut: number }> = [];
  if (X !== Infinity) for (let i = 0; i < TOT; i++) {
    const g = gross1(base, i); if (g <= X) continue;
    const now = stake(base, i), max = (now * X) / g; stops.push({ i, now, max, cut: now - max });
  }
  stops.sort((a, b) => b.cut - a.cut);
  const cutTotal = stops.reduce((s, x) => s + x.cut, 0);

  // offer the refused money to numbers below the line, per operator, in proportion to their room;
  // halve it until the worst draw still fits
  const lim = X === Infinity ? houseLimit(cfg, null).lim : X;
  const scan = houseScan(cut, lim);
  const offer = (frac: number) => {
    const B = Float64Array.from(cut.B), S = Float64Array.from(cut.S), byCat = CATS.map(() => 0);
    const opCut = OPS.map(() => 0); stops.forEach((x) => { opCut[opOf(x.i)] += x.cut; });
    for (const o of scan.ops) {
      const move = Math.min(opCut[o.op], o.room) * frac; if (!move) continue;
      for (let n = 0; n < N; n++) {
        const i = o.op * N + n, room = Math.max(0, o.line - stake(cut, i)); if (!room || scan.ratio[i] > 1) continue;
        const a = (room / o.room) * move; B[i] += a * o.bShare; S[i] += a * (1 - o.bShare); byCat[CAT_OF[n]] += a;
      }
    }
    return { cfg: { ...cut, B, S }, byCat };
  };
  let frac = 1, pushed = offer(1);
  while (frac > 0.01 && !fits(pushed.cfg)) { frac /= 2; pushed = offer(frac); }
  if (!fits(pushed.cfg)) { frac = 0; pushed = offer(0); }
  const addTotal = pushed.byCat.reduce((s, x) => s + x, 0);

  return {
    X, stops, cutTotal,
    before: evalLimit(base, Infinity),
    after: evalLimit(cut, Infinity),
    pushed: evalLimit(pushed.cfg, Infinity),
    add: { total: addTotal, frac, byCat: CATS.map((c, k) => ({ ...c, add: pushed.byCat[k] })).filter((c) => c.add > 1).sort((a, b) => b.add - a.add) },
  };
}

// ---------- the book itself ----------
export function topBy(fn: (i: number) => number, k: number) {
  const out: Array<[number, number]> = [];
  for (let i = 0; i < TOT; i++) { const v = fn(i); if (v > 0) out.push([v, i]); }
  return out.sort((a, b) => b[0] - a[0]).slice(0, k).map((x) => x[1]);
}
export function countActive(cfg: Config) { let c = 0; for (let i = 0; i < TOT; i++) if (stake(cfg, i) > 0) c++; return c; }
export const evenVerdict = (r: number) => (r >= 0.6 ? { word: '算平均', tone: 'pos' } : r >= 0.3 ? { word: '有点集中', tone: 'warn' } : { word: '很集中', tone: 'neg' });
export const BUCKETS: Array<[number, number]> = [[0, 5], [5, 10], [10, 20], [20, 50], [50, 100], [100, 300], [300, Infinity]];

export function bookStats(cfg: Config, ops: number[]) {
  const items: Array<[number, number]> = []; let total = 0, big = 0;
  for (const op of ops) for (let n = 0; n < N; n++) {
    const i = op * N + n, v = stake(cfg, i);
    if (v > 0) { items.push([v, i]); total += v; big += cfg.B[i]; }
  }
  items.sort((a, b) => b[0] - a[0]);
  const A = items.length;
  if (!A) return null;
  let cum = 0, halfN = 0; for (const [v] of items) { cum += v; halfN++; if (cum >= total / 2) break; }
  const shareTop = (k: number) => items.slice(0, k).reduce((s, x) => s + x[0], 0) / total;
  const marks = [10, 100, 1000].filter((k) => k < A).map((k) => ({ label: `最重的 ${k.toLocaleString()} 个字`, share: shareTop(k), even: k / A }));
  marks.push({ label: `最重的 ${halfN.toLocaleString()} 个字`, share: cum / total, even: halfN / A });
  const buckets = BUCKETS.map(([lo, hi]) => { let c = 0, m = 0; for (const [v] of items) if (v >= lo && v < hi) { c++; m += v; } return { lo, hi, c, m }; });
  const cm = CATS.map(() => ({ a: 0, m: 0 }));
  for (const [v, i] of items) { const c = CAT_OF[numOf(i)]; cm[c].a++; cm[c].m += v; }
  return {
    items, total, big, A, halfN, universe: ops.length * N, median: items[Math.floor(A / 2)][0], avg: total / A,
    verdict: evenVerdict(halfN / (A / 2)), marks, buckets, cm,
  };
}

// ---------- history / backtest ----------
export type Draw = { id: string; op: number; nums: number[] };
export function parseOp(s: string) {
  const t = s.toLowerCase().replace(/[^a-z0-9一-鿿]/g, '');
  if (/^(m|mg|magnum)/.test(t)) return 0;
  if (/^(k|kuda|d|dmc|damacai|pmp|大马彩)/.test(t)) return 1;
  if (/^(t|st|toto|sportstoto|多多)/.test(t)) return 2;
  return -1;
}
export function parseHistory(text: string) {
  const rows: Draw[] = [], bad: number[] = []; let lineNo = 0;
  for (const line of text.split(/\r?\n/)) {
    lineNo++;
    const t = line.trim(); if (!t) continue;
    const parts = t.split(/[\s,;]+/).filter(Boolean);
    if (parts.length < 3) { bad.push(lineNo); continue; }
    const op = parseOp(parts[1]);
    if (op < 0) { if (lineNo > 1) bad.push(lineNo); continue; }
    const nums = parts.slice(2).filter((x) => /^\d{1,4}$/.test(x)).map(Number);
    if (nums.length !== 23 || new Set(nums).size !== 23) { bad.push(lineNo); continue; }
    rows.push({ id: parts[0], op, nums });
  }
  return { rows, bad };
}
export function syntheticHistory(seed: number) {
  const r = rng(seed ^ 0x5bd1e995), rows: Draw[] = [];
  const d = new Date(Date.UTC(2023, 0, 1)), end = Date.UTC(2026, 9, 19);
  for (; d.getTime() <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const wd = d.getUTCDay(); if (wd !== 0 && wd !== 3 && wd !== 6) continue;
    const id = d.toISOString().slice(0, 10);
    for (let op = 0; op < NO; op++) {
      const seen = new Set<number>(), nums: number[] = [];
      while (nums.length < 23) { const x = (r() * N) | 0; if (!seen.has(x)) { seen.add(x); nums.push(x); } }
      rows.push({ id, op, nums });
    }
  }
  return rows;
}

export type Backtest = ReturnType<typeof runBacktest>;
export function runBacktest(cfg: Config, bk: Book, history: Draw[]) {
  const byId = new Map<string, Record<number, number[]>>();
  for (const h of history) { if (!byId.has(h.id)) byId.set(h.id, {}); byId.get(h.id)![h.op] = h.nums; }
  const ids = [...byId.keys()].sort();
  const draws: Array<{ id: string; profit: number; claims: number; top: { op: number; n: number; k: number; pay: number } | null }> = [];
  let skipped = 0;
  for (const id of ids) {
    const res = byId.get(id)!;
    if (!bk.active.every((op) => res[op])) { skipped++; continue; }
    let claims = 0, top: { op: number; n: number; k: number; pay: number } | null = null;
    for (const op of bk.active) res[op].forEach((n, s) => {
      const k = SLOT_TYPE[s], pay = bk.L[k][op * N + n]; claims += pay;
      if (!top || pay > top.pay) top = { op, n, k, pay };
    });
    draws.push({ id, profit: bk.base - claims, claims, top });
  }
  let cum = 0, peak = 0, maxDD = 0, minCum = 0, loss = 0;
  const cumArr = draws.map((d) => {
    cum += d.profit; if (d.profit < 0) loss++;
    peak = Math.max(peak, cum); maxDD = Math.max(maxDD, peak - cum); minCum = Math.min(minCum, cum);
    return cum;
  });
  const sorted = Float64Array.from(draws.map((d) => d.profit)).sort();
  const n = draws.length;
  return { draws, cumArr, total: cum, mean: n ? cum / n : 0, lossFreq: n ? loss / n : 0, maxDD, minCapital: cfg.reserve + minCum, worst: n ? sorted[0] : 0, q01: n ? sorted[Math.floor(0.01 * (n - 1))] : 0, n, skipped, totalDates: ids.length };
}

function gammaQ(a: number, x: number) {
  if (x <= 0) return 1;
  const lg = -x + a * Math.log(x) - lnGamma(a);
  if (x < a + 1) {
    let ap = a, sum = 1 / a, del = sum;
    for (let i = 0; i < 500; i++) { ap++; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-14) break; }
    return 1 - sum * Math.exp(lg);
  }
  const tiny = 1e-300; let b = x + 1 - a, c = 1 / tiny, d = 1 / b, h = d;
  for (let i = 1; i < 500; i++) {
    const an = -i * (i - a); b += 2;
    d = an * d + b; if (Math.abs(d) < tiny) d = tiny;
    c = b + an / c; if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-14) break;
  }
  return Math.exp(lg) * h;
}
// chi-square of digit frequency per position across every winning number
export function uniformity(history: Draw[]) {
  const cnt = [0, 1, 2, 3].map(() => new Float64Array(10)), hits = new Uint32Array(N); let total = 0;
  for (const h of history) for (const n of h.nums) { const s = pad(n); for (let p = 0; p < 4; p++) cnt[p][+s[p]]++; hits[n]++; total++; }
  const e = total / 10;
  const pos = cnt.map((c) => { let chi = 0, lo = Infinity, hi = 0; for (let d = 0; d < 10; d++) { chi += (c[d] - e) ** 2 / e; lo = Math.min(lo, c[d]); hi = Math.max(hi, c[d]); } return { chi, p: gammaQ(4.5, chi / 2), lo, hi }; });
  let maxHit = 0, maxN = 0; for (let n = 0; n < N; n++) if (hits[n] > maxHit) { maxHit = hits[n]; maxN = n; }
  return { pos, total, maxHit, maxN, expHit: total / N, e };
}

// ---------- imports ----------
export function parseBookCsv(text: string, defOp: number) {
  const B = new Float64Array(TOT), S = new Float64Array(TOT); let rows = 0, bad = 0;
  text.split(/\r?\n/).forEach((line, li) => {
    const t = line.trim(); if (!t) return;
    const parts = t.split(/[,\t;]/).map((x) => x.trim());
    if (li === 0 && !/^\d/.test(parts[0])) return;
    const b = parseFloat(parts[1] || '0'), s = parseFloat(parts[2] || '0');
    const op = parts[3] ? parseOp(parts[3]) : defOp;
    if (!/^\d{1,4}$/.test(parts[0]) || op < 0 || !Number.isFinite(b) || !Number.isFinite(s) || b < 0 || s < 0) { bad++; return; }
    const i = op * N + parseInt(parts[0], 10); B[i] += b; S[i] += s; rows++;
  });
  return { B, S, rows, bad };
}

// ---------- settlement ----------
export const parseNums = (s: string) => (String(s).match(/\d{1,4}/g) || []).map(Number);
export type ResultInput = { r1: string; r2: string; r3: string; sp: string; co: string };
export const resultNums = (r: ResultInput) => [
  ...parseNums(r.r1).slice(0, 1), ...parseNums(r.r2).slice(0, 1), ...parseNums(r.r3).slice(0, 1), ...parseNums(r.sp).slice(0, 10), ...parseNums(r.co).slice(0, 10),
];
export const resultInput = (nums: number[]): ResultInput => ({
  r1: pad(nums[0]), r2: pad(nums[1]), r3: pad(nums[2]), sp: nums.slice(3, 13).map(pad).join(' '), co: nums.slice(13, 23).map(pad).join(' '),
});
export function randomDraw(seed: number) {
  const r = rng(seed), seen = new Set<number>(), out: number[] = [];
  while (out.length < 23) { const x = (r() * N) | 0; if (!seen.has(x)) { seen.add(x); out.push(x); } }
  return out;
}

export function settle(cfg: Config, bk: Book, inputs: ResultInput[]) {
  const problems: string[] = [], results: Record<number, number[]> = {};
  for (const op of bk.active) {
    const nums = resultNums(inputs[op]);
    if (nums.length !== 23) problems.push(`${OPS[op].name} 要填 23 个号码，现在只有 ${nums.length} 个`);
    else if (new Set(nums).size !== 23) problems.push(`${OPS[op].name} 有号码重复了`);
    else results[op] = nums;
  }
  if (problems.length) return { problems } as const;
  let retPay = 0, trPay = 0;
  const win: Array<{ op: number; n: number; k: number; rp: number; tp: number; stake: number }> = [], opPay: Record<number, number> = {};
  for (const op of bk.active) {
    const o = cfg.odds[op]; opPay[op] = 0;
    results[op].forEach((n, s) => {
      const i = op * N + n, k = SLOT_TYPE[s], rp = bk.L[k][i], tp = o.big[k] * bk.Bt[i] + o.small[k] * bk.St[i];
      retPay += rp; trPay += tp; opPay[op] += rp; win.push({ op, n, k, rp, tp, stake: stake(cfg, i) });
    });
  }
  const profit = bk.R + bk.comm - retPay - bk.fee - cfg.opCost;
  const recon = bk.alloc.map((a) => {
    const share = bk.U ? a.U / bk.U : 0, claims = trPay * share;
    return { ...a, claims, net: a.U - a.comm + a.fee - claims };
  });
  return { problems: [] as string[], retPay, trPay, win, opPay, profit, recon };
}
