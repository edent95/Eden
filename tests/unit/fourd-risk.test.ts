import assert from 'node:assert/strict';
import test from 'node:test';
import {
  N, OPS, SAMPLE_SEED, classify, computeBook, defaultOdds, defaultProviders, parseBookCsv, parseHistory,
  gross1, keepAllPlan, resultInput, sampleBook, settle, simulate, stats, worstCase, type Config,
} from '../../services/fourdRisk.ts';

const config = (limit: number): Config => {
  const s = sampleBook(SAMPLE_SEED);
  return {
    B: s.B, S: s.S, odds: OPS.map(defaultOdds), providers: defaultProviders(),
    limit, reserve: 250000, opCost: 1000, seed: SAMPLE_SEED, sims: 2000, horizon: 156, ruinTarget: 0.01,
  };
};

test('sample book splits RM 100K across the three operators', () => {
  const bk = computeBook(config(Infinity), Infinity);
  assert.ok(Math.abs(bk.T - 100000) < 1000, `total ${bk.T}`);
  assert.deepEqual(bk.active, [0, 1, 2]);
});

test('no limit keeps everything; a limit only hands on the excess', () => {
  const all = computeBook(config(Infinity), Infinity);
  assert.equal(all.U, 0);
  const capped = computeBook(config(50000), 50000);
  assert.ok(capped.U > 0 && capped.U < capped.T);
  for (let i = 0; i < capped.L[0].length; i++) assert.ok(capped.L[0][i] <= 50000 + 0.5);
});

test('the exact worst case is never beaten by a simulated draw', () => {
  const cfg = config(50000), bk = computeBook(cfg, cfg.limit);
  const st = stats(simulate(bk, 2000, cfg.seed)), w = worstCase(bk);
  assert.ok(w.profit <= st.min, `worst ${w.profit} vs simulated ${st.min}`);
});

test('settling the worst draw reproduces the worst-case result', () => {
  const cfg = config(50000), bk = computeBook(cfg, cfg.limit), w = worstCase(bk);
  const inputs = OPS.map((_, op) => resultInput(w.byOp[op].map((x) => x.num)));
  const res = settle(cfg, bk, inputs);
  assert.equal(res.problems.length, 0);
  assert.ok('profit' in res && Math.abs(res.profit - w.profit) < 1e-6);
});

test('number patterns: earlier classes win', () => {
  assert.equal(classify(8888), 0);
  assert.equal(classify(1234), 1);
  assert.equal(classify(1212), 2);
  assert.equal(classify(1988), 3);
  assert.equal(classify(815), 4);
  assert.equal(classify(4096), 5);
});

test('imports read operators by name and skip bad rows', () => {
  const book = parseBookCsv('号码,Big,Small,公司\n8888,500,200,M\n8888,1,0,magnum\n1234,10,5,Toto\nxx,1,1,M', 1);
  assert.equal(book.rows, 3);
  assert.equal(book.bad, 1);
  assert.equal(book.B[8888], 501);
  assert.equal(book.S[2 * N + 1234], 5);

  const nums = Array.from({ length: 23 }, (_, i) => String(i * 7).padStart(4, '0')).join(' ');
  const hist = parseHistory(`2026-10-18, M, ${nums}\n2026-10-18, DMC, ${nums}\n2026-10-18, X, ${nums}\n2026-10-19, T, 1 2 3`);
  assert.equal(hist.rows.length, 2);
  assert.deepEqual(hist.rows.map((r) => r.op), [0, 1]);
  assert.deepEqual(hist.bad, [3, 4]);
});

test('keeping everything: the stop line makes the worst draw fit the reserve, pushing keeps it there', () => {
  const cfg = config(Infinity), k = keepAllPlan(cfg);
  assert.ok(k.before.worst < -cfg.reserve, 'the sample book cannot carry everything');
  assert.ok(Number.isFinite(k.X) && k.X > 0);
  assert.ok(k.after.worst >= -cfg.reserve && k.pushed.worst >= -cfg.reserve, `${k.after.worst} / ${k.pushed.worst}`);
  for (const x of k.stops) assert.ok(gross1(cfg, x.i) > k.X && x.cut > 0 && Math.abs(x.max + x.cut - x.now) < 1e-6);
  assert.ok(Math.abs(k.stops.reduce((s, x) => s + x.cut, 0) - k.cutTotal) < 1e-6);
  assert.ok(k.add.total <= k.cutTotal + 1e-6);
});

test('keeping everything with a reserve that already covers the worst draw stops nothing', () => {
  const k = keepAllPlan({ ...config(Infinity), reserve: 1e9 });
  assert.equal(k.X, Infinity);
  assert.equal(k.stops.length, 0);
});
