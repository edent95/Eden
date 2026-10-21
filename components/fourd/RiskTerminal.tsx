import React from 'react';
import {
  N, NO, OPS, TOT, PRIZE, COUNT, DRAWS_PER_MONTH, SWEEP_SIMS, SAMPLE_SEED, UNIVERSE, PLANS, PLAN_BY_ID, CATS, CAT_OF, CAT_SIZE,
  pad, tag, opOf, numOf, rm, rmK, pct, tone, limLabel, perMonth, freqShort, freqLong, worstLog10, countLoss, gross1, stake,
  sampleBook, defaultOdds, defaultProviders, runCurrent, runSweep, sweepKey, evalLimit, pickPlan, allocFor,
  houseLimit, houseScan, catStats, catCall, evenScenario, bookStats, topBy, countActive,
  parseHistory, syntheticHistory, runBacktest, uniformity, parseBookCsv, randomDraw, resultInput, settle,
  type Config, type PlanId, type Run, type SweepRow, type Draw, type ResultInput,
} from '../../services/fourdRisk';
import {
  readPalette, drawHist, drawFrontier, drawCum, drawShape, drawHeat, heatBands, heatCell, heatTip, liabBand,
  type HeatMetric, type Tip,
} from './charts';

// 4D Risk Terminal, laid out like /brand-guide#brand-philosophy: five numbered chapters, each opening
// with its point; one Deep card per page for the verdict; soft cards only where they group a choice.

type ChapterId = 'verdict' | 'risk' | 'map' | 'sim' | 'settle';
const CHAPTERS: Array<{ id: ChapterId; en: string; zh: string }> = [
  { id: 'verdict', en: 'Verdict', zh: '结论' },
  { id: 'risk', en: 'Exposure', zh: '风险' },
  { id: 'map', en: 'Map', zh: '号码地图' },
  { id: 'sim', en: 'Simulate', zh: '试算' },
  { id: 'settle', en: 'Settle', zh: '算账与设置' },
];

const store = {
  get(key: string) { try { return window.localStorage.getItem(key); } catch { return null; } },
  set(key: string, value: string) { try { window.localStorage.setItem(key, value); } catch { /* private mode */ } },
};

const initialConfig = (): Config => {
  const s = sampleBook(SAMPLE_SEED);
  return {
    B: s.B, S: s.S, odds: OPS.map(defaultOdds), providers: defaultProviders(),
    limit: 50000, reserve: 250000, opCost: 1000, seed: SAMPLE_SEED, sims: 100000, horizon: 156, ruinTarget: 0.01,
  };
};

const worstOdds = (ops: number) => <>约 10<sup>{worstLog10(ops)}</sup> 期 1 次</>;
const Tone: React.FC<{ v: number; children: React.ReactNode }> = ({ v, children }) => <span className={`rt-${tone(v)}`}>{children}</span>;
const often = (p: number) => (p > 0 ? `大约每 ${Math.round(1 / p).toLocaleString()} 期 1 次` : '几乎不会');

// ---------- small building blocks ----------
const ChapterHead: React.FC<{ index: number; title: string; copy: string }> = ({ index, title, copy }) => {
  const ch = CHAPTERS[index - 1];
  return (
    <header className="rt-chapter-head">
      <p className="rt-kicker">{String(index).padStart(2, '0')} / {ch.en} · {ch.zh}</p>
      <h2 className="rt-chapter-title font-display">{title}</h2>
      <p className="rt-chapter-copy">{copy}</p>
    </header>
  );
};

const Block: React.FC<{ title: string; sub?: React.ReactNode; wide?: boolean; children: React.ReactNode; id?: string }> = ({ title, sub, children, id }) => (
  <section className="rt-block" id={id}>
    <h3 className="rt-block-title">{title}</h3>
    {sub ? <p className="rt-block-sub">{sub}</p> : null}
    {children}
  </section>
);

type StatItem = { k: string; v: React.ReactNode; d?: React.ReactNode };
const Stats: React.FC<{ items: StatItem[] }> = ({ items }) => (
  <dl className="rt-stats">
    {items.map((it) => (
      <div key={it.k} className="rt-stat">
        <dt>{it.k}</dt>
        <dd className="rt-stat-v">{it.v}</dd>
        {it.d ? <dd className="rt-stat-d">{it.d}</dd> : null}
      </div>
    ))}
  </dl>
);

const Table: React.FC<{ head: React.ReactNode[]; rows: Array<{ key: React.Key; cells: React.ReactNode[]; className?: string }>; foot?: React.ReactNode }> = ({ head, rows, foot }) => (
  <div className="rt-table-wrap">
    <table className="rt-table">
      <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r) => <tr key={r.key} className={r.className}>{r.cells.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
    </table>
    {foot ? <p className="rt-note">{foot}</p> : null}
  </div>
);

const Bar: React.FC<{ label: React.ReactNode; fill: number; mark?: number; value: React.ReactNode; tone?: string; thin?: number }> = ({ label, fill, mark, value, tone: t, thin }) => (
  <div className="rt-bar-row">
    <span className="rt-bar-label">{label}</span>
    <span className="rt-bar-track">
      <span className={`rt-bar-fill${t ? ` rt-bar-${t}` : ''}`} style={{ width: `${Math.max(0, Math.min(100, fill))}%` }} />
      {thin !== undefined ? <span className="rt-bar-thin" style={{ width: `${Math.max(0, Math.min(100, thin))}%` }} /> : null}
      {mark !== undefined ? <span className="rt-bar-mark" style={{ left: `${Math.max(0, Math.min(100, mark))}%` }} /> : null}
    </span>
    <span className="rt-bar-value">{value}</span>
  </div>
);

// a share drawn as 100 cells: Paper = what stays with you, primary = what is handed on
const Cells: React.FC<{ share: number; label: string }> = ({ share, label }) => {
  const lit = Math.round(share * 100);
  return (
    <div className="rt-cells" role="img" aria-label={label}>
      {Array.from({ length: 100 }, (_, i) => <span key={i} className={i >= 100 - lit ? 'is-open' : ''} />)}
    </div>
  );
};

type TodoItem = { title: React.ReactNode; why: React.ReactNode; ev: React.ReactNode; actions?: React.ReactNode; done?: boolean };
const Todo: React.FC<{ items: TodoItem[] }> = ({ items }) => (
  <ol className="rt-todo">
    {items.map((it, i) => (
      <li key={i} className={it.done ? 'is-done' : ''}>
        <span className="rt-todo-index">{it.done ? '✓' : String(i + 1).padStart(2, '0')}</span>
        <div>
          <h4>{it.title}</h4>
          <p><span>为什么</span>{it.why}</p>
          <p><span>证据</span>{it.ev}</p>
          {it.actions ? <div className="rt-actions">{it.actions}</div> : null}
        </div>
      </li>
    ))}
  </ol>
);

// a number input that keeps its own text while typing and commits after a pause or on blur
const NumField: React.FC<{ label: string; value: number; onCommit: (v: number) => void; step?: number; min?: number; empty?: string; width?: string }> = ({ label, value, onCommit, step, min = 0, empty, width }) => {
  const shown = value === Infinity ? '' : String(value);
  const [draft, setDraft] = React.useState(shown);
  React.useEffect(() => { setDraft(shown); }, [shown]);
  React.useEffect(() => {
    if (draft === shown) return;
    const t = window.setTimeout(() => {
      if (draft.trim() === '' && empty !== undefined) return onCommit(Infinity);
      const v = parseFloat(draft);
      if (Number.isFinite(v)) onCommit(Math.max(min, v));
    }, 450);
    return () => window.clearTimeout(t);
  }, [draft]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <label className="rt-field" style={width ? { width } : undefined}>
      <span>{label}</span>
      <input type="number" inputMode="decimal" step={step} min={min} value={draft} placeholder={empty} onChange={(e) => setDraft(e.target.value)} />
    </label>
  );
};

const Select: React.FC<{ label: string; value: number | string; onChange: (v: string) => void; options: Array<[string | number, string]> }> = ({ label, value, onChange, options }) => (
  <label className="rt-field">
    <span>{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
    </select>
  </label>
);

const opOptions: Array<[number, string]> = OPS.map((o, i) => [i, `${o.id} · ${o.name}`]);

// ---------- the terminal ----------
const RiskTerminal: React.FC<{ theme: string }> = ({ theme }) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [cfg, setCfg] = React.useState<Config>(initialConfig);
  const [bookVer, setBookVer] = React.useState(0);
  const [sample, setSample] = React.useState(true);
  const [drawId, setDrawId] = React.useState('20261021');
  const [plan, setPlanState] = React.useState<PlanId | null>(() => {
    const p = store.get('4d-plan'); return p && p in PLAN_BY_ID ? (p as PlanId) : null;
  });
  const [chapter, setChapterState] = React.useState<ChapterId>(() => {
    const c = store.get('4d-chapter'); return CHAPTERS.some((x) => x.id === c) ? (c as ChapterId) : 'verdict';
  });
  const [run, setRun] = React.useState<Run | null>(null);
  const [runMs, setRunMs] = React.useState(0);
  const [sweep, setSweep] = React.useState<{ key: string; rows: SweepRow[]; ms: number } | null>(null);
  const [tip, setTipState] = React.useState<{ x: number; y: number; lines: string[] } | null>(null);
  const [heatOp, setHeatOp] = React.useState(0);
  const [heatMetric, setHeatMetric] = React.useState<HeatMetric>('ret');
  const [selected, setSelected] = React.useState(8888);
  const [bookOp, setBookOp] = React.useState(-1);
  const [history, setHistory] = React.useState<Draw[]>([]);
  const [historySynthetic, setHistorySynthetic] = React.useState(false);
  const [histText, setHistText] = React.useState('');
  const [histInfo, setHistInfo] = React.useState('');
  const [csvText, setCsvText] = React.useState('');
  const [impOp, setImpOp] = React.useState(0);
  const [importInfo, setImportInfo] = React.useState('');
  const [results, setResults] = React.useState<ResultInput[]>(() => OPS.map((_, op) => resultInput(randomDraw(SAMPLE_SEED + op))));
  const [sOp, setSOp] = React.useState(0);
  const settleSeed = React.useRef(1);
  const [simDraft, setSimDraft] = React.useState({ sims: '100000', seed: String(SAMPLE_SEED), horizon: '156' });
  const [width, setWidth] = React.useState(0);

  const setPlan = (p: PlanId | null) => { setPlanState(p); store.set('4d-plan', p || ''); };
  const goto = (c: ChapterId, anchor?: string) => {
    setChapterState(c); store.set('4d-chapter', c);
    window.requestAnimationFrame(() => {
      const el = anchor ? document.getElementById(anchor) : rootRef.current;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  };
  const patch = (p: Partial<Config>) => setCfg((c) => ({ ...c, ...p }));
  const setLimit = (l: number) => patch({ limit: l });
  const onTip: Tip = React.useCallback((e, lines) => {
    if (!e || !lines) return setTipState(null);
    setTipState({ x: e.clientX, y: e.clientY, lines });
  }, []);

  // main run for the current limit; deferred a frame so the page paints first
  React.useEffect(() => {
    const t = window.setTimeout(() => { const t0 = performance.now(); setRun(runCurrent(cfg)); setRunMs(Math.round(performance.now() - t0)); }, 16);
    return () => window.clearTimeout(t);
  }, [cfg]);

  // the limit sweep does not depend on the current limit, so picking a plan never re-runs it
  const sKey = sweepKey(cfg, bookVer);
  React.useEffect(() => {
    if (sweep?.key === sKey) return;
    const t = window.setTimeout(() => { const t0 = performance.now(); setSweep({ key: sKey, rows: runSweep(cfg), ms: Math.round(performance.now() - t0) }); }, 60);
    return () => window.clearTimeout(t);
  }, [sKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const rows = sweep?.key === sKey ? sweep.rows : null;

  // a chosen plan follows the sweep: when the sweep lands, move the limit to what the plan picks
  React.useEffect(() => {
    if (!plan || !rows) return;
    const r = pickPlan(cfg, rows, plan);
    if (r && r.limit !== cfg.limit) setLimit(r.limit);
  }, [plan, rows]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const el = rootRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth)); ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const book = run?.book;
  const ready = Boolean(run);
  const palette = React.useMemo(() => (rootRef.current ? readPalette(rootRef.current) : null), [theme, ready, width]); // eslint-disable-line react-hooks/exhaustive-deps

  const lim = houseLimit(cfg, rows);
  const scan = React.useMemo(() => houseScan(cfg, lim.lim), [cfg, lim.lim]);
  const cats = React.useMemo(() => catStats(cfg, scan), [cfg, scan]);
  const even = React.useMemo(() => (chapter === 'risk' || chapter === 'verdict' ? evenScenario(cfg, lim.lim, scan) : null), [chapter, cfg, lim.lim, scan]);
  const bt = React.useMemo(() => (book && history.length ? runBacktest(cfg, book, history) : null), [book, history, cfg]);

  const changeBook = (B: Float64Array, S: Float64Array, isSample: boolean) => { setCfg((c) => ({ ...c, B, S })); setSample(isSample); setBookVer((v) => v + 1); };

  return (
    <div ref={rootRef} className="rt" data-chapter={chapter}>
      <nav className="rt-nav" aria-label="章节">
        <div className="rt-nav-tabs">
          {CHAPTERS.map((c, i) => (
            <button key={c.id} type="button" className={c.id === chapter ? 'is-on' : ''} aria-current={c.id === chapter ? 'page' : undefined} onClick={() => goto(c.id)}>
              <span className="rt-nav-index">{String(i + 1).padStart(2, '0')}</span>{c.zh}
            </button>
          ))}
        </div>
        <p className="rt-nav-status">本期 #{drawId} · {sample ? '示例数据' : '你的下注'} · 上限 {limLabel(cfg.limit)}</p>
      </nav>

      {!run || !book || !palette ? (
        <p className="rt-busy">正在开奖 {cfg.sims.toLocaleString()} 次…</p>
      ) : chapter === 'verdict' ? (
        <Verdict {...{ cfg, run, rows, plan, setPlan, sample, drawId, cats, scan, lim, even, history, historySynthetic, goto }} />
      ) : chapter === 'risk' ? (
        <Risk {...{ cfg, run, rows, cats, scan, lim, even, bookOp, setBookOp, palette, onTip, goto, setSelected, setHeatOp, width }} />
      ) : chapter === 'map' ? (
        <MapChapter {...{ cfg, run, palette, onTip, heatOp, setHeatOp, heatMetric, setHeatMetric, selected, setSelected, width }} />
      ) : chapter === 'sim' ? (
        <Simulate {...{
          cfg, run, rows, sweepMs: sweep?.ms ?? 0, runMs, palette, onTip, width, patch, setPlan, setLimit, goto, setSelected, setHeatOp,
          simDraft, setSimDraft, bt, history, historySynthetic, histText, setHistText, histInfo,
          importHistory: (text: string) => {
            const { rows: h, bad } = parseHistory(text);
            if (!h.length) return setHistInfo(`一行都读不到${bad.length ? `(第 ${bad.slice(0, 5).join('、')} 行格式不对)` : ''}。每行要有日期、公司和 23 个号码`);
            setHistory(h); setHistorySynthetic(false);
            setHistInfo(`放进了 ${h.length} 行${bad.length ? `,有 ${bad.length} 行没读懂(例如第 ${bad.slice(0, 5).join('、')} 行)` : ''}`);
          },
          sampleHistory: () => {
            const h = syntheticHistory(cfg.seed); setHistory(h); setHistorySynthetic(true);
            setHistInfo(`生成了 ${h.length.toLocaleString()} 行假的开奖(2023 年 1 月到 2026 年 10 月，每周三、六、日)`);
          },
        }} />
      ) : (
        <Settle {...{
          cfg, run, patch, setPlan, drawId, setDrawId, results, setResults, sOp, setSOp, csvText, setCsvText, impOp, setImpOp, importInfo,
          randomize: () => { setResults(OPS.map((_, op) => resultInput(randomDraw(cfg.seed + 101 * settleSeed.current++ + op)))); },
          worstDraw: () => { setResults((r) => r.map((x, op) => (run.worst.byOp[op] ? resultInput(run.worst.byOp[op].map((w) => w.num)) : x))); },
          importCsv: (text: string) => {
            const res = parseBookCsv(text, impOp);
            if (!res.rows) return setImportInfo(`一行都读不到${res.bad ? `(${res.bad} 行格式不对)` : ''}。每行要写：号码,Big,Small,公司`);
            changeBook(res.B, res.S, false);
            setImportInfo(`放进了 ${res.rows} 行${res.bad ? `,有 ${res.bad} 行格式不对，没算进去` : ''}`);
          },
          resetSample: () => { const s = sampleBook(SAMPLE_SEED); changeBook(s.B, s.S, true); setImportInfo('已换回示例数据'); },
        }} />
      )}

      {tip ? (
        <div className="rt-tip" style={{ left: Math.min(tip.x + 14, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 300), top: tip.y + 14 }}>
          {tip.lines.map((l, i) => (i ? <span key={i}>{l}</span> : <b key={i}>{l}</b>))}
        </div>
      ) : null}
    </div>
  );
};

// ---------- 01 verdict ----------
const Verdict: React.FC<any> = ({ cfg, run, rows, plan, setPlan, sample, drawId, cats, scan, lim, even, history, historySynthetic, goto }) => {
  const { book, sim, worst, ruinP } = run as Run;
  const c = cfg as Config;
  const recId: PlanId = plan && plan !== 'risky' ? plan : 'balanced';
  const recPicked = rows ? (pickPlan(c, rows, recId) ? recId : 'safe') : recId;
  const rec = rows ? pickPlan(c, rows, recPicked) : null;
  const recName = PLAN_BY_ID[recPicked].name;
  const applied = rec && rec.limit === c.limit;
  const curLoss = Math.max(0, -worst.profit), short = curLoss - c.reserve;
  const hotN = cats.filter((x) => x.x > 1.2).length;
  const keepShare = book.T ? book.R / book.T : 1;

  const headline = short > 0
    ? `这期收了 ${rmK(book.T)},平均会赚，可是钱压在少数字上：最惨的一期会亏 ${rmK(curLoss)},备用金不够。`
    : `这期收了 ${rmK(book.T)},平均每月赚 ${rmK(perMonth(book.Eprofit))},最惨的一期也赔得起。`;
  const summary = [
    `大约每 ${sim.pLoss > 0 ? Math.round(1 / sim.pLoss) : '∞'} 期亏一次`,
    hotN ? `${hotN} 类字收太多` : '没有哪类字收太多',
    `连做一年赔光的机会 ${ruinP > 0 ? pct(ruinP, 2) : '几乎是零'}`,
  ].join(' · ');

  const now: TodoItem[] = [];
  if (rec) {
    const curE = perMonth(book.Eprofit), recE = perMonth(rec.E), dE = recE - curE;
    now.push({
      done: Boolean(applied),
      title: applied ? `上限已经是 ${limLabel(rec.limit)}(「${recName}」),保持` : `把每个字的上限改成 ${limLabel(rec.limit)}(「${recName}」)`,
      why: `这样最惨的一期亏 ${rmK(-rec.worst)},备用金 ${rmK(c.reserve)} 赔得起;${Math.abs(dE) < 1000 ? '平均每月赚的差不多' : dE > 0 ? `平均每月还多赚 ${rmK(dE)}` : `平均每月少赚 ${rmK(-dE)},换来不会一期就倒`}。`,
      ev: applied
        ? `电脑试开奖 ${SWEEP_SIMS.toLocaleString()} 次：平均每月赚 ${rmK(recE)},最惨一期亏 ${rmK(-rec.worst)}。`
        : `现在(${limLabel(c.limit)}):每月赚 ${rmK(curE)},最惨亏 ${rmK(curLoss)}。改了以后：每月赚 ${rmK(recE)},最惨亏 ${rmK(-rec.worst)}。`,
      actions: applied ? null : <button type="button" className="rt-btn" onClick={() => setPlan(recPicked)}>按建议改好</button>,
    });
    if (rec.U > 1) {
      const unconf = c.providers.filter((p) => !p.confirmed && allocFor(c, rec.U).out.some((a) => a.p === p));
      let overN = 0; for (let i = 0; i < TOT; i++) if (gross1(c, i) > rec.limit) overN++;
      now.push({
        title: `把 ${rmK(rec.U)} 交给上家`,
        why: '这是太重的字超过上限的部分。不交的话，这些字一开出来就要你自己赔。',
        ev: <>开头奖要赔超过 {rmK(rec.limit)} 的字有 {overN.toLocaleString()} 个，只交超过的部分。{unconf.length ? <span className="rt-warn">{unconf.map((p) => p.name).join('、')}的合同还没写清楚一定会赔，先签好再交。</span> : null}</>,
        actions: <button type="button" className="rt-link" onClick={() => goto('settle', 'rt-contracts')}>看上家合同 →</button>,
      });
    }
    if (c.reserve < -rec.worst) now.push({ title: `把备用金补到 ${rmK(-rec.worst)}`, why: '备用金不够赔最惨的一期。', ev: `现在 ${rmK(c.reserve)},最惨亏 ${rmK(-rec.worst)}。` });
  }
  const hot = cats.filter((x) => x.x > 1.2).sort((a, b) => b.x - a.x);
  if (hot.length) now.push({
    title: `${hot.map((x) => x.name).join('、')}:每个字收到平线(约 ${rm(scan.ops[0].line)})就停收`,
    why: '客人最爱买这几类，一下子就收太多。最惨的一期就是被它们决定的。',
    ev: hot.map((x) => `${x.name} 平均是平线的 ${x.x.toFixed(1)} 倍，${x.heavy} 个字超过，多出 ${rmK(x.excess)}`).join(';') + '。',
    actions: <button type="button" className="rt-link" onClick={() => goto('risk')}>看哪些字太重 →</button>,
  });

  const next: TodoItem[] = [];
  if (sample) next.push({ title: '换成你自己的下注', why: '现在用的是示例数据，数字只是让你看懂怎么用。', ev: '页面顶上写着「示例数据」。', actions: <button type="button" className="rt-link" onClick={() => goto('settle', 'rt-book')}>去导入 →</button> });
  const cold = cats.filter((x) => x.x < 0.5).sort((a, b) => a.x - b.x);
  if (cold.length && rec && even) {
    const d = perMonth(even.even.bk.Eprofit - even.now.bk.Eprofit);
    const comm = even.now.bk.U ? (even.now.bk.comm - even.now.bk.fee) / even.now.bk.U : 0, edge = even.now.bk.R ? 1 - even.now.bk.Ecl / even.now.bk.R : 0;
    next.push({
      title: `多推冷门的字:${cold.map((x) => x.name).join('、')}`,
      why: `太重的字多出来的钱只能交上家，每 RM100 只赚约 RM${(comm * 100).toFixed(0)} 回扣;落在冷门的字上自己留着，每 RM100 平均赚约 RM${(edge * 100).toFixed(0)}。收到平线为止，最惨的一期也不会更惨。`,
      ev: `${cold.map((x) => `${x.name} 只有平线的 ${x.x.toFixed(2)} 倍`).join(';')}。同样的钱分平均一点，平均每月多赚 ${rmK(d)}。`,
      actions: <button type="button" className="rt-link" onClick={() => goto('risk', 'rt-even')}>看分平均以后会怎样 →</button>,
    });
  }
  const top10 = topBy((i) => stake(c, i), 10).reduce((s, i) => s + stake(c, i), 0);
  next.push({
    title: '每期开卖前、收注中途各看一次这页', why: '客人的下注每天都在变，热门的字会越收越重。',
    ev: `这期最重的 10 个字占了 ${pct(top10 / (book.T || 1))} 的钱，平均的话只该占 ${pct(10 / Math.max(1, countActive(c)), 2)}。`,
    actions: <button type="button" className="rt-link" onClick={() => goto('risk')}>看这期的字 →</button>,
  });
  next.push({
    title: '用以前的开奖结果验证一次', why: '电脑试开奖假设每个号码开出的机会一样。用真的开奖记录跑一次，确认这个上限过去也管用。',
    ev: history.length ? `已经放了 ${history.length.toLocaleString()} 行开奖记录${historySynthetic ? '(假的)' : ''}。` : '还没放开奖记录。',
    actions: <button type="button" className="rt-link" onClick={() => goto('sim', 'rt-backtest')}>去试 →</button>,
  });

  const coverage = worst.profit >= 0 ? Infinity : c.reserve / -worst.profit;
  const alerts: Array<[string, string, React.ReactNode]> = [];
  if (coverage < 1) alerts.push(['crit', '钱不够', <>开出最惨的号码要亏 {rm(-worst.profit)},备用金只有 {rm(c.reserve)},还差 <b>{rm(-worst.profit - c.reserve)}</b>。选「平衡」或「保险一点」就会调到赔得起。</>]);
  if (book.forced > 1) alerts.push(['crit', '上家装不下', `你想交给上家的钱，有 ${rm(book.forced)} 超过上家肯收的上限，只好自己留着。`]);
  if (ruinP > c.ruinTarget) alerts.push(['crit', '可能赔光', `照现在这样连续做 ${c.horizon} 期，赔光备用金的机会是 ${pct(ruinP, 1)},比你能接受的 ${pct(c.ruinTarget, 1)} 高。`]);
  book.alloc.filter((a) => !a.confirmed && a.U > 0).forEach((a) => alerts.push(['warn', '没讲清楚', `你交给${a.name} ${rm(a.U)},可是合同还没写清楚它一定会赔。万一它不赔，这些钱要你自己赔。`]));
  if (book.overRet > 0) alerts.push(['warn', '超过上限', `有 ${book.overRet} 个号码，你自己要赔的钱超过了上限(因为上家装不下)。`]);
  if (book.overGross > 0) alerts.push(['ok', '已处理', `有 ${book.overGross} 个号码下注太多，超过上限的部分已经交给上家。`]);
  if (coverage >= 1) alerts.push(['ok', '钱够', coverage === Infinity ? '就算开出最惨的号码，这期也不会亏。' : `就算开出最惨的号码(亏 ${rm(-worst.profit)}),备用金也够赔，还剩 ${rm(c.reserve + worst.profit)}。`]);
  if (ruinP <= c.ruinTarget) alerts.push(['ok', '不会赔光', `连续做 ${c.horizon} 期，把备用金赔光的机会只有 ${pct(ruinP, 2)}。`]);

  return (
    <section className="rt-chapter" aria-labelledby="rt-ch-verdict">
      <ChapterHead index={1} title="先看这期赔不赔得起。" copy="现在的情况、要准备多少钱、接下来做什么。" />

      <article className="rt-verdict">
        <div className="rt-verdict-text">
          <p className="rt-verdict-eyebrow">本期 #{drawId} · {sample ? '示例数据' : '你的下注'} · 每个字最多赔 {limLabel(c.limit)}</p>
          <h3 id="rt-ch-verdict" className="font-display">{headline}</h3>
          <p className="rt-verdict-summary">{summary}</p>
          <div className="rt-actions">
            {rec && !applied
              ? <button type="button" className="rt-btn" onClick={() => setPlan(recPicked)}>按「{recName}」改好</button>
              : <button type="button" className="rt-btn" onClick={() => goto('map')}>看最危险的号码</button>}
            <button type="button" className="rt-btn rt-btn-ghost" onClick={() => document.getElementById('rt-plans')?.scrollIntoView({ block: 'start' })}>选一种做法</button>
          </div>
        </div>
        <figure className="rt-verdict-cells">
          <Cells share={1 - keepShare} label={`这期收的钱，自己留 ${pct(keepShare, 0)},交给上家 ${pct(1 - keepShare, 0)}`} />
          <figcaption>100 格 = 这期收的钱<br /><span>白：自己留 {pct(keepShare, 0)}</span> · <span className="rt-open">主色：交给上家 {pct(1 - keepShare, 0)}</span></figcaption>
        </figure>
      </article>

      <Block id="rt-plans" title="你想怎么做?" sub="选一种，就按它帮你定「每个号码最多赔多少」。下面会说明怎么算出来的、为什么是它。随时可以换。">
        <Plans cfg={c} rows={rows} plan={plan} setPlan={setPlan} run={run} goto={goto} />
      </Block>

      <Block title="要准备多少、要交出去多少" sub={rec ? `按建议的「${recName}」(每个字最多赔 ${limLabel(rec.limit)})算。` : rows ? '' : '正在比较所有上限…'}>
        {rec ? <Money cfg={c} rec={rec} /> : rows ? <p className="rt-callout rt-crit">在现在的备用金和合同下，没有一种上限能让最惨的一期赔得起。先加备用金，或者找肯多收的上家。</p> : null}
      </Block>

      <div className="rt-two">
        <Block title="现在该怎么做" sub="开卖前、收注的时候做。每一步都写了为什么和电脑算出来的证据。"><Todo items={now} /></Block>
        <Block title="要注意的事" sub="最要紧的排在最上面。">
          <ul className="rt-alerts">
            {alerts.map(([k, l, t], i) => <li key={i} className={`rt-alert rt-alert-${k}`}><span>{l}</span><p>{t}</p></li>)}
          </ul>
        </Block>
      </div>

      <Block title="下一步" sub="做完上面的，接下来几期这样做，让水钱赚得更稳。"><Todo items={next} /></Block>
      <p className="rt-note">平线 = 每个字收到开头奖要赔 {rmK(lim.lim)}({lim.from})为止。</p>
    </section>
  );
};

const Money: React.FC<{ cfg: Config; rec: SweepRow }> = ({ cfg, rec }) => {
  const need = Math.max(0, -rec.worst), enough = cfg.reserve >= need;
  const { out, left } = allocFor(cfg, rec.U), netComm = out.reduce((s, a) => s + a.take * (a.p.comm - a.p.fee), 0);
  let overN = 0, top = -1, topG = 0;
  for (let i = 0; i < TOT; i++) { const g = gross1(cfg, i); if (g > rec.limit) overN++; if (g > topG) { topG = g; top = i; } }
  return (
    <div className="rt-two rt-money">
      <div className="rt-money-item">
        <p className="rt-money-k">需要的备用金</p>
        <p className="rt-money-v">{rm(need)}</p>
        <p className={enough ? 'rt-pos' : 'rt-neg'}>{enough ? `你有 ${rmK(cfg.reserve)},够` : `你只有 ${rmK(cfg.reserve)},还差 ${rmK(need - cfg.reserve)}`}</p>
        <p><b>为什么:</b>备用金要够赔理论上最惨的一期，才不会一期就倒。</p>
        <p><b>证据:</b>三家都开出让你赔最多的号码，最多亏 {rmK(need)}(机会{worstOdds(rec.ops)})。比较常见的倒霉：最差的 1% 期平均亏 {rmK(Math.max(0, -rec.es99))};连做一年赔光的机会{rec.ruin < 0.0005 ? '几乎是零' : ` ${pct(rec.ruin, 2)}`}。</p>
      </div>
      <div className="rt-money-item">
        <p className="rt-money-k">要交给上家</p>
        <p className="rt-money-v">{rm(rec.U)}</p>
        <p>占这期的 {pct(rec.U / (rec.T || 1), 0)}</p>
        <p><b>交给谁:</b>{out.length ? out.map((a, i) => <span key={i}>{i ? ' · ' : ''}{a.p.name} {rmK(a.take)}{a.p.confirmed ? '' : <span className="rt-warn">(合同还没写清楚)</span>}</span>) : '不用交'}{left > 1 ? <span className="rt-neg"> · 还有 {rmK(left)} 上家装不下</span> : null}</p>
        <p><b>为什么:</b>交出去的只是 {overN.toLocaleString()} 个太重的字超过上限的部分{top >= 0 && topG > rec.limit ? `,例如 ${tag(top)} 交 ${pct(1 - rec.limit / topG, 0)}` : ''}。这些字一开出来你赔不起，交出去还能拿回扣约 {rmK(netComm)}。</p>
      </div>
    </div>
  );
};

const Plans: React.FC<{ cfg: Config; rows: SweepRow[] | null; plan: PlanId | null; setPlan: (p: PlanId | null) => void; run: Run; goto: (c: ChapterId, a?: string) => void }> = ({ cfg, rows, plan, setPlan, run, goto }) => {
  if (!rows) return <p className="rt-busy">正在帮你比较四种做法…</p>;
  const same = PLANS.find((p) => { const r = pickPlan(cfg, rows, p.id); return r && r.limit === cfg.limit; });
  return (
    <>
      <div className="rt-plans" role="group" aria-label="选一种做法">
        {PLANS.map((p) => {
          const r = pickPlan(cfg, rows, p.id), on = plan === p.id;
          return (
            <button key={p.id} type="button" className={`rt-plan${on ? ' is-on' : ''}`} aria-pressed={on} disabled={!r} onClick={() => setPlan(p.id)}>
              <span className="rt-plan-head"><span className="rt-plan-name">{p.name}</span>{p.badge ? <span className="rt-plan-badge">{p.badge}</span> : null}</span>
              <span className="rt-plan-tag">{p.tag}</span>
              {r ? (
                <span className="rt-plan-stats">
                  <span><span>平均每月赚</span><b className={`rt-${tone(r.E)}`}>{rmK(perMonth(r.E))}</b></span>
                  <span><span>最惨的一期</span><b>{r.worst < 0 ? '亏 ' + rmK(-r.worst) : '不会亏'}</b></span>
                  <span><span>一期亏光备用金</span><b className={r.nAll ? 'rt-neg' : ''}>{freqShort(r.nAll, r.n)}</b></span>
                </span>
              ) : <span className="rt-plan-stats"><span>现在的条件下做不到</span></span>}
            </button>
          );
        })}
      </div>
      {plan ? <PlanExplain cfg={cfg} rows={rows} id={plan} run={run} goto={goto} /> : (
        <p className="rt-note">还没选。现在用的是「每个号码最多赔 {limLabel(cfg.limit)}」{same ? `,刚好跟「${same.name}」一样` : ',是自己调的'}。</p>
      )}
    </>
  );
};

const PlanExplain: React.FC<{ cfg: Config; rows: SweepRow[]; id: PlanId; run: Run; goto: (c: ChapterId, a?: string) => void }> = ({ cfg, rows, id, run, goto }) => {
  const p = PLAN_BY_ID[id], r = pickPlan(cfg, rows, id);
  if (!r) return <p className="rt-callout rt-crit">现在的备用金和上家条件下，没有一个上限做得到「{p.name}」。多准备一点备用金，或找肯收更多下注的上家，再选一次。</p>;
  const idx = rows.indexOf(r), higher = rows[idx + 1], lower = rows[idx - 1];
  const rejected = rows.filter((x) => !p.rule(x, cfg));
  const firstBad = rows.slice(idx + 1).find((x) => !p.rule(x, cfg));
  const keepPer100 = r.R ? Math.round((100 * (r.R - r.Ecl)) / r.R) : 35;
  const upPer100 = Math.max(...cfg.providers.map((x) => x.comm - x.fee)) * 100;
  // the plan's limit is the live one, so the bigger main simulation gives steadier tail counts
  const live = r.limit === cfg.limit;
  const tail = live ? { n: run.sim.n, half: countLoss(run.sim.sorted, cfg.reserve / 2), all: countLoss(run.sim.sorted, cfg.reserve) } : { n: r.n, half: r.nHalf, all: r.nAll };
  const outcome: Array<[string, React.ReactNode, React.ReactNode]> = [
    ['平均每月赚', <Tone v={r.E}>{rm(perMonth(r.E))}</Tone>, `每期约 ${rm(r.E)},一个月大约开 ${DRAWS_PER_MONTH} 期`],
    ['10 个月里有 9 个月', r.mP10 >= 0 ? `至少赚 ${rmK(r.mP10)}` : <span className="rt-neg">最多亏 {rmK(-r.mP10)}</span>, '比这更差的月份，10 个月里顶多 1 个'],
    ['亏钱的月份', r.mLoss > 0.0005 ? `大约每 ${Math.max(1, Math.round(1 / r.mLoss))} 个月 1 个` : '几乎没有', '单期亏钱很常见，整个月亏钱少很多'],
    ['理论上最惨的一期', r.worst < 0 ? <span className={-r.worst > cfg.reserve ? 'rt-neg' : ''}>亏 {rm(-r.worst)}</span> : '不会亏',
      r.worst < 0 ? <>是备用金的 {(-r.worst / (cfg.reserve || 1)).toFixed(1)} 倍。机会:{worstOdds(r.ops)}。{UNIVERSE},所以这是确认「赔不赔得起」的底线，不会真的碰到。</> : '每个号码都开到最糟也不亏'],
    ['一期亏掉一半备用金', freqShort(tail.half, tail.n), `一期亏 ${rmK(cfg.reserve / 2)} 以上:${freqLong(tail.half, tail.n)}`],
    ['一期就亏光备用金', <span className={tail.all ? 'rt-neg' : ''}>{freqShort(tail.all, tail.n)}</span>, `一期亏 ${rmK(cfg.reserve)} 以上:${freqLong(tail.all, tail.n)}`],
    ['一年内把备用金赔光', r.ruin > 0 ? <span className={r.ruin > 0.01 ? 'rt-neg' : ''}>{pct(r.ruin, 1)}</span> : '几乎不会', `连做 ${cfg.horizon} 期(每周 3 期)`],
  ];
  let how: React.ReactNode, why: React.ReactNode;
  if (id === 'risky') {
    const b = pickPlan(cfg, rows, 'balanced');
    how = (
      <ol>
        <li>不用挑：客人的下注全部自己留，不交给上家。</li>
        <li>自己留着的下注，每 RM100 平均赚回约 RM{keepPer100};交给上家，每 RM100 只拿到约 RM{upPer100.toFixed(1)} 回扣。留得越多，平均赚越多。</li>
        <li>电脑开奖 {SWEEP_SIMS.toLocaleString()} 期，再算出理论上最惨的一期。</li>
      </ol>
    );
    why = (
      <>
        <p>四种做法里平均赚最多，因为每一分钱都按「自己留」的高利润算。</p>
        {b && b !== r ? <p>代价：跟「平衡」比，每月多赚 <b>{rmK(perMonth(r.E - b.E))}</b>,可是最惨的一期多亏 <b>{rmK(b.worst - r.worst)}</b>{-r.worst > cfg.reserve ? `,是备用金的 ${(-r.worst / (cfg.reserve || 1)).toFixed(0)} 倍：真的开出来，备用金一次就赔光` : ''}。</p> : null}
      </>
    );
  } else {
    how = (
      <ol>
        <li>把「每个号码最多赔多少」从 0(全部交给上家)一路试到不设上限，一共 {rows.length} 种。</li>
        <li>每一种都让电脑开奖 {SWEEP_SIMS.toLocaleString()} 期，也算出理论上最惨的一期和一年内赔光的机会。</li>
        <li>不符合「{p.name}」的有 {rejected.length} 种，先拿掉。{firstBad ? `比如上限 ${limLabel(firstBad.limit)}:${p.why(firstBad, cfg)}。` : ''}</li>
        <li>剩下 {rows.length - rejected.length} 种里，平均每月赚最多的是 <b>{limLabel(r.limit)}</b>。</li>
      </ol>
    );
    const share = r.T ? r.U / r.T : 0, all = rows[rows.length - 1];
    const flatWorst = r.base - (1 - share) * all.claimsW;
    why = (
      <>
        {share > 0.001 && all.limit === Infinity ? <p><b>为什么不是每个字都交一样的 %?</b>这个做法整体交出 {pct(share, 0)}。如果每个字都平均交 {pct(share, 0)},每月赚的差不多，可是最惨的一期会亏 <b>{rmK(-flatWorst)}</b>;按字设上限只亏 <b>{rmK(-r.worst)}</b>。危险集中在少数很重的字上：重的字几乎全交出去，轻的字全部自己留。</p> : null}
        <p>自己留着的下注，每 RM100 平均赚回约 RM{keepPer100};交给上家，每 RM100 只拿到约 RM{upPer100.toFixed(1)} 回扣。「{p.name}」就是在它答应你的范围里，尽量多留。</p>
        <ul>
          {higher ? <li>{p.rule(higher, cfg) ? `再高一档(${limLabel(higher.limit)}):每月反而少赚 ${rmK(-perMonth(higher.E - r.E))}。` : `再高一档(${limLabel(higher.limit)}):每月能多赚 ${rmK(perMonth(higher.E - r.E))},可是${p.why(higher, cfg)},不符合「${p.name}」。`}</li> : null}
          {lower ? <li>再低一档({limLabel(lower.limit)}):也符合，但每月少赚 {rmK(perMonth(r.E - lower.E))}。</li> : null}
        </ul>
      </>
    );
  }
  return (
    <div className="rt-explain">
      <div>
        <h4>这个做法答应你</h4>
        <p>{p.promise(cfg)}</p>
        <p>所以每个号码开头奖时，你自己最多赔 <b>{limLabel(r.limit)}</b>,其余交给上家。</p>
        <h4>怎么算出来的</h4>
        {how}
      </div>
      <div>
        <h4>用了以后大概会这样</h4>
        <dl className="rt-outcome">
          {outcome.map(([k, v, d]) => <div key={k}><dt>{k}</dt><dd className="rt-outcome-v">{v}</dd><dd className="rt-outcome-d">{d}</dd></div>)}
        </dl>
        <h4>为什么是它</h4>
        {why}
        <button type="button" className="rt-link" onClick={() => goto('sim', 'rt-sweep')}>看所有上限怎么比 →</button>
      </div>
    </div>
  );
};

// ---------- 02 exposure ----------
const Risk: React.FC<any> = ({ cfg, run, rows, cats, scan, lim, even, bookOp, setBookOp, palette, onTip, goto, setSelected, setHeatOp, width }) => {
  const c = cfg as Config, { book } = run as Run;
  const shapeRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => { if (shapeRef.current) drawShape(shapeRef.current, 260, palette, scan.ratio, onTip); }, [scan, palette, width, onTip]);
  const ops = scan.ops;
  const sum = (k: string) => ops.reduce((s: number, o: any) => s + o[k], 0);
  const lineTxt = ops.map((o: any) => `${OPS[o.op].id} ${rm(o.line)}`).join(' · ');
  const pick = (i: number) => { setSelected(numOf(i)); setHeatOp(opOf(i)); goto('map'); };
  const NumLink: React.FC<{ i: number }> = ({ i }) => <button type="button" className="rt-link rt-num" onClick={() => pick(i)}>{tag(i)}</button>;
  const st = bookStats(c, bookOp < 0 ? OPS.map((_, i) => i) : [bookOp]);

  const pos = (x: number) => ((Math.log10(Math.max(x, 0.05)) + 1.30103) / 2.60206) * 100;
  const top = topBy((i) => book.L[0][i], 10);
  const maxG = Math.max(...top.map((i) => gross1(c, i)), c.limit === Infinity ? 0 : c.limit, 1);
  const heavy = topBy((i) => scan.ratio[i], 15).filter((i) => scan.ratio[i] > 1);
  const verdictWord = st ? st.verdict.word : '';
  const heavyN = sum('heavy'), excess = sum('excess');

  return (
    <section className="rt-chapter">
      <ChapterHead index={2} title="钱压在哪些字上。" copy="庄家要的是：不管开哪个字，赔的都差不多。每个字最好收差不多的钱，不太多，也不太少。" />

      <Stats items={[
        { k: '一共收', v: rmK(book.T), d: OPS.map((o, op) => `${o.id} ${rmK(book.opT[op])}`).join(' · ') },
        { k: '每个字最好收到', v: rm(sum('line') / NO), d: `平线 · ${lineTxt}` },
        { k: '太重的字', v: <span className="rt-neg">{heavyN.toLocaleString()} 个</span>, d: `一共多出 ${rmK(excess)}` },
        { k: '刚刚好', v: `${sum('ok').toLocaleString()} 个`, d: '平线的一半到平线之间' },
        { k: '太轻的字', v: `${sum('light').toLocaleString()} 个`, d: `其中 ${sum('zero').toLocaleString()} 个没人买` },
        { k: '轻的字还能多收', v: rmK(sum('room')), d: '收到平线为止，开头奖也不会超过上限' },
      ]} />

      <Block title="哪一类字太多、哪一类不够?" sub={<>「几倍平线」= 这类字平均收到的钱 ÷ 平线。1 倍最好;超过 1.2 倍算太多，不到 0.5 倍就是还有空位。平线按{lim.from}({rmK(lim.lim)})算。</>}>
        <div className="rt-bars">
          {cats.map((x: any) => {
            const call = catCall(x.x);
            return <Bar key={x.name} label={<>{x.name}<small>{x.ex || ' '}</small></>} fill={pos(x.x)} mark={50} tone={x.x > 1.2 ? 'hot' : x.x >= 0.5 ? 'fine' : 'low'} value={<>{x.x.toFixed(x.x < 1 ? 2 : 1)} 倍<small className={`rt-${call.tone}`}>{call.word}</small></>} />;
          })}
        </div>
      </Block>

      <Block title="这期的字排排队" sub="每个字按收到的钱从多到少排好。虚线是平线：红色是超过平线、太重的部分;平线下面浅色的空位，是轻的字还能多收的钱。">
        <canvas ref={shapeRef} className="rt-canvas" />
      </Block>

      <div className="rt-two">
        <Block title="最危险的 10 个号码" sub="这些号码开头奖要赔多少。浅色是全部客人要赔的，深色是你自己要赔的(其余已交给上家),竖线是你的上限。点号码看地图。">
          <div className="rt-bars">
            {top.map((i) => {
              const g = gross1(c, i), r = book.L[0][i];
              return <Bar key={i} label={<NumLink i={i} />} fill={(r / maxG) * 100} thin={(g / maxG) * 100} mark={c.limit === Infinity ? undefined : (c.limit / maxG) * 100} tone={r > c.limit + 0.5 ? 'hot' : 'ink'} value={rmK(r)} />;
            })}
          </div>
        </Block>
        <Block title="太重的字，要怎么办" sub="最重的 15 个。「多出来」的钱，要么交给上家，要么这期不再收这个字。">
          {heavy.length ? (
            <Table head={['字', '收了', '平线', '多出来', '几倍平线']} rows={heavy.map((i) => {
              const v = stake(c, i), r = scan.ratio[i];
              return { key: i, cells: [<NumLink i={i} />, rm(v), rm(v / r), <span className="rt-neg">{rm(v - v / r)}</span>, `${r.toFixed(1)} 倍`] };
            })} />
          ) : <p className="rt-note">没有字超过平线。</p>}
        </Block>
      </div>

      <Block id="rt-even" title="如果钱分得平均一点，会怎样?" sub="一共收的钱不变，只是把太重的字多出来的钱，改成落在还有空位的轻字上。两种情况各开奖 30,000 次来比较。">
        {even ? (() => {
          const { now, even: ev } = even;
          const row = (k: string, a: number, b: number, fmt: (x: number) => string, better: boolean) => ({ key: k, cells: [k, fmt(a), <span className={better ? 'rt-pos' : ''}>{fmt(b)}</span>] });
          const oft = (p: number) => (p > 0 ? `每 ${Math.round(1 / p)} 期` : '几乎不会');
          const comm = now.bk.U ? (now.bk.comm - now.bk.fee) / now.bk.U : 0, edge = now.bk.R ? 1 - now.bk.Ecl / now.bk.R : 0;
          const hotNames = cats.filter((x: any) => x.x > 1.2).map((x: any) => x.name).join('、') || '热门的字';
          return (
            <div className="rt-two">
              <Table head={['', '现在', '分平均以后']} rows={[
                row('自己留着', now.bk.R, ev.bk.R, rm, ev.bk.R > now.bk.R + 1),
                row('交给上家', now.bk.U, ev.bk.U, rm, false),
                row('平均每月赚', now.bk.Eprofit, ev.bk.Eprofit, (x) => rm(perMonth(x)), ev.bk.Eprofit > now.bk.Eprofit + 1),
                row('多久亏一期', now.st.pLoss, ev.st.pLoss, oft, ev.st.pLoss < now.st.pLoss),
                row('最倒霉的 1% 期平均', now.st.es99, ev.st.es99, rm, ev.st.es99 > now.st.es99 + 1),
                row('理论上最惨的一期', now.w.profit, ev.w.profit, rm, ev.w.profit > now.w.profit + 1),
              ]} />
              <div className="rt-prose">
                <p><b>为什么分平均会多赚?</b>太重的字多出来的 {rm(even.moved)} 只能交给上家，每 RM100 净赚约 RM{(comm * 100).toFixed(0)} 回扣。同样的钱落在轻的字上，你可以自己留着，每 RM100 平均赚约 RM{(edge * 100).toFixed(0)}。最惨的一期由最重的字决定，它们已经顶到上限，所以轻的字收到平线为止，最惨也不会更惨。</p>
                <p><b>怎么做:</b>① 每个字收到平线({lineTxt})就停收，或多出来的交上家。② {hotNames}开卖前就设好每个字最多收多少。③ 很不够的那几类，多推给客人。</p>
                <p className="rt-note">这里假设客人愿意改买轻的字，实际能移多少要看你的客人。</p>
              </div>
            </div>
          );
        })() : <p className="rt-busy">正在比较…</p>}
      </Block>

      <div className="rt-subhead">
        <h3 className="rt-block-title">细看这期的字</h3>
        <Select label="看哪家" value={bookOp} onChange={(v) => setBookOp(+v)} options={[[-1, '三家一起看'], ...opOptions]} />
      </div>
      {!st ? <p className="rt-note">这家这期没有收到字。</p> : (
        <>
          <Stats items={[
            { k: '收了几个字', v: st.A.toLocaleString(), d: `${st.universe.toLocaleString()} 个号码里的 ${pct(st.A / st.universe, 0)}` },
            { k: '一共收', v: rm(st.total), d: `Big ${pct(st.big / st.total, 0)} · Small ${pct(1 - st.big / st.total, 0)}` },
            { k: '每个字平均', v: rm(st.avg), d: `一半的字不到 ${rm(st.median)}` },
            { k: '最重的字', v: tag(st.items[0][1]), d: `${rm(st.items[0][0])},是平均的 ${Math.round(st.items[0][0] / st.avg)} 倍` },
            { k: '一半的钱押在', v: `${st.halfN.toLocaleString()} 个字`, d: `最重的 ${pct(st.halfN / st.A, 0)} 的字` },
            { k: '钱分得平均吗', v: <span className={`rt-${st.verdict.tone}`}>{verdictWord}</span>, d: `平均的话要 ${Math.round(st.A / 2).toLocaleString()} 个字才有一半的钱` },
          ]} />
          <div className="rt-two">
            <Block title="钱是不是平均分?" sub="竖线是「每个字收一样多」时应该占多少。条比竖线长越多，钱就越集中在少数字上。">
              <div className="rt-bars">
                {st.marks.map((m) => <Bar key={m.label} label={m.label} fill={m.share * 100} mark={m.even * 100} tone="ink" value={<>占 {pct(m.share, 1)}<small>平均的话 {pct(m.even, 1)}</small></>} />)}
              </div>
            </Block>
            <Block title="字有多重?" sub="按每个字收了多少钱分档。粗条是这一档有几个字，细线是这一档的钱占全部多少。">
              <div className="rt-bars">
                {st.buckets.map((b) => {
                  const maxC = Math.max(...st.buckets.map((x) => x.c), 1);
                  return <Bar key={b.lo} label={b.hi === Infinity ? `RM ${b.lo} 以上` : b.lo === 0 ? `不到 RM ${b.hi}` : `RM ${b.lo}–${b.hi}`} fill={(b.c / maxC) * 100} thin={(b.m / st.total) * 100} tone="muted" value={<>{b.c.toLocaleString()} 个字<small>钱占 {pct(b.m / st.total, 0)}</small></>} />;
                })}
              </div>
            </Block>
          </div>
          <div className="rt-two">
            <Block title="最重的 20 个字" sub="「我自己赔」按你现在的上限算。">
              <Table head={['字', '一共', '占全部', '哪一类', '开头奖全部要赔', '我自己赔']} rows={st.items.slice(0, 20).map(([v, i]) => ({
                key: i, cells: [<NumLink i={i} />, rm(v), pct(v / st.total, 2), CATS[CAT_OF[numOf(i)]].name, rmK(gross1(c, i)), rmK(book.L[0][i])],
              }))} />
            </Block>
            <Block title="热门的字是哪一类?" sub="「热度」= 这类字收到的钱占比 ÷ 这类字在一万个号码里的占比。1 倍是正常，越高越热门。">
              <Table head={['哪一类', '收到注的字', '收多少钱', '热度']} rows={CATS.map((x, k) => {
                const heat = (st.cm[k].m / st.total) / (CAT_SIZE[k] / N);
                return { key: k, cells: [x.name, `${st.cm[k].a.toLocaleString()} / ${(CAT_SIZE[k] * (bookOp < 0 ? NO : 1)).toLocaleString()}`, rmK(st.cm[k].m), <span className={heat >= 3 ? 'rt-open' : ''}>{heat >= 10 ? Math.round(heat) : heat.toFixed(1)} 倍</span>] };
              })} />
              <Table head={['公司', '客人下注', '自己留着', '平均每期赔', '最惨要赔']} rows={OPS.map((o, op) => ({
                key: op, cells: [o.name, rmK(book.opT[op]), rmK(book.opR[op]), rmK(book.opE[op]), rmK(run.worst.byOp[op] ? run.worst.byOp[op].reduce((s: number, x: any) => s + x.pay, 0) : 0)],
              }))} />
            </Block>
          </div>
          <p className="rt-note">现在导入的是每个字的总额，所以看不到「收了多少张单」「有多少个客人」。要看这些，导入时要改成每张单一行。</p>
        </>
      )}
      {rows ? null : <p className="rt-busy">正在比较所有上限…</p>}
    </section>
  );
};

// ---------- 03 map ----------
const MapChapter: React.FC<any> = ({ cfg, run, palette, onTip, heatOp, setHeatOp, heatMetric, setHeatMetric, selected, setSelected, width }) => {
  const c = cfg as Config, { book } = run as Run;
  const ref = React.useRef<HTMLCanvasElement>(null);
  const heat = React.useMemo(() => heatBands(c, book, heatOp, heatMetric), [c, book, heatOp, heatMetric]);
  React.useEffect(() => { if (ref.current) drawHeat(ref.current, palette, heat.bands, selected); }, [heat, palette, selected, width]);
  const [jump, setJump] = React.useState(pad(selected));
  React.useEffect(() => { setJump(pad(selected)); }, [selected]);

  const i = heatOp * N + selected, o = c.odds[heatOp];
  const B = c.B[i], S = c.S[i], r1 = book.L[0][i], band = liabBand(r1, c.limit);
  const bandName = ['不用赔', '一点点', '要留意', '接近上限', '超过上限'][band];
  const eContrib = PRIZE.reduce((s, _, k) => s + (book.L[k][i] * COUNT[k]) / N, 0);
  const L = c.limit;
  const legend = heatMetric === 'stake'
    ? ['没人买', '买的人少', `比较多 ≥ ${rm(heat.cuts[0])}`, `很多 ≥ ${rm(heat.cuts[1])}`, `最多 ≥ ${rm(heat.cuts[2])}`]
    : ['不用赔', `一点点 ≤ ${rmK(L * 0.1)}`, `要留意 ≤ ${rmK(L * 0.5)}`, `接近上限 ≤ ${rmK(L)}`, `超过上限 ${rmK(L)}`];

  return (
    <section className="rt-chapter">
      <ChapterHead index={3} title="一万个号码，一格一个。" copy="左上角是 0000,一行 100 个，右下角是 9999。颜色越深，这个号码开头奖时你要赔得越多。点一格看详情。" />
      <div className="rt-controls">
        <Select label="哪家公司" value={heatOp} onChange={(v) => setHeatOp(+v)} options={opOptions} />
        <Select label="看什么" value={heatMetric} onChange={(v) => setHeatMetric(v as HeatMetric)} options={[['ret', '开头奖时，我自己要赔多少'], ['gross', '开头奖时，一共要赔多少(交上家前)'], ['stake', '客人在这个号码下了多少钱']]} />
        <label className="rt-field rt-field-short">
          <span>找号码</span>
          <input inputMode="numeric" maxLength={4} value={jump} placeholder="8888" onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); setJump(v); if (v.length === 4) setSelected(+v); }} />
        </label>
      </div>
      <div className="rt-map">
        <div>
          <canvas ref={ref} className="rt-heat" aria-label="号码地图"
            onMouseMove={(e) => { const n = heatCell(e.currentTarget, e.nativeEvent); if (n < 0) return onTip(null); onTip(e.nativeEvent, heatTip(c, book, heatOp, n)); }}
            onMouseLeave={() => onTip(null)}
            onClick={(e) => { const n = heatCell(e.currentTarget, e.nativeEvent); if (n >= 0) setSelected(n); }} />
          <ul className="rt-legend">
            {legend.map((t, k) => <li key={k}><i style={{ background: palette.heat[k] }} />{t} <span>({heat.counts[k].toLocaleString()} 个)</span></li>)}
          </ul>
        </div>
        <article className="rt-detail">
          <p className="rt-kicker">{OPS[heatOp].name} · {bandName}</p>
          <p className="rt-detail-num font-display">{pad(selected)}</p>
          <p className="rt-block-sub">你自己留了这个号码 {B + S > 0 ? pct((book.Br[i] + book.Sr[i]) / (B + S), 0) : '—'} 的下注{c.limit === Infinity ? '' : `;开头奖要赔的钱用掉上限的 ${pct(r1 / (c.limit || 1), 0)}`}。</p>
          <Table head={['', '一共', '自己留', '交给上家']} rows={[
            { key: 'b', cells: ['客人买 Big', rm(B), rm(book.Br[i]), rm(book.Bt[i])] },
            { key: 's', cells: ['客人买 Small', rm(S), rm(book.Sr[i]), rm(book.St[i])] },
          ]} />
          <Table head={['如果开出', '机会多大', '我自己赔', '一共要赔']} rows={PRIZE.map((p, k) => ({
            key: k, className: k === 0 ? 'is-hl' : undefined,
            cells: [p, COUNT[k] === 1 ? '一万次 1 次' : `一万次 ${COUNT[k]} 次`, rm(book.L[k][i]), rm(o.big[k] * B + o.small[k] * S)],
          }))} />
          <p className="rt-formula">开头奖我要赔 = Big {Math.round(book.Br[i])} × {o.big[0]} + Small {Math.round(book.Sr[i])} × {o.small[0]} = {rm(r1)}</p>
          <p className="rt-note">头奖一万次才开 1 次，所以平均每期这个号码只让你赔 {rm(eContrib)}。真的开中了，你一次就要赔 {rm(r1)},是备用金的 {pct(r1 / (c.reserve || 1), 0)}。</p>
        </article>
      </div>
    </section>
  );
};

// ---------- 04 simulate ----------
const Simulate: React.FC<any> = (props) => {
  const { cfg, run, rows, sweepMs, runMs, palette, onTip, width, patch, setPlan, setLimit, goto, setSelected, setHeatOp, simDraft, setSimDraft, bt, history, historySynthetic, histText, setHistText, histInfo, importHistory, sampleHistory } = props;
  const c = cfg as Config, { book, sim, worst, ruinP } = run as Run;
  const payRef = React.useRef<HTMLCanvasElement>(null), profRef = React.useRef<HTMLCanvasElement>(null);
  const frontRef = React.useRef<HTMLCanvasElement>(null), cumRef = React.useRef<HTMLCanvasElement>(null);
  const pay = React.useMemo(() => Float64Array.from(sim.sorted, (x: number) => book.base - x).sort(), [sim, book]);
  const q = (a: number) => pay[Math.floor(a * (pay.length - 1))];
  const P50 = q(0.5), P95 = q(0.95), P99 = q(0.99);
  const tableRows = React.useMemo(() => {
    if (!rows) return null;
    const all = [...rows];
    if (!all.some((r) => r.limit === c.limit)) { all.push(evalLimit(c, c.limit)); all.sort((a, b) => a.limit - b.limit); }
    return all;
  }, [rows, c]);

  React.useEffect(() => {
    if (payRef.current) drawHist(payRef.current, 220, palette, pay, onTip, {
      lo: 0, hi: Math.max(P99, book.base) * 1.08 || 1, bins: 40, clipHi: true,
      color: (v) => (v > book.base ? palette.danger : palette.bar),
      markers: [{ v: P50, label: '一般', color: palette.ink }, { v: P95, label: '20 期 1 次', color: palette.muted }, { v: P99, label: '100 期 1 次', color: palette.danger }],
    });
    if (profRef.current) drawHist(profRef.current, 220, palette, sim.sorted, onTip, {
      bins: 70, color: (v) => (v < 0 ? palette.danger : palette.bar),
      markers: [{ v: sim.q05, label: '20 期最差', color: palette.muted }, { v: sim.q01, label: '100 期最差', color: palette.danger }, { v: 0, label: '0', color: palette.ink }],
    });
    if (frontRef.current && tableRows) drawFrontier(frontRef.current, 300, palette, tableRows, c, rows, onTip);
    if (cumRef.current && bt?.n) drawCum(cumRef.current, 240, palette, bt, onTip);
  }, [pay, sim, palette, width, tableRows, bt, onTip]); // eslint-disable-line react-hooks/exhaustive-deps

  const lossOrGain = (v: number) => (v < 0 ? <span className="rt-neg">亏 {rm(-v)}</span> : <span className="rt-pos">不会亏，还赚 {rm(v)}</span>);
  const metrics: Array<[string, string, React.ReactNode]> = [
    ['平均每期赚多少?', 'Expected Profit', <Tone v={sim.mean}>{rm(sim.mean)}</Tone>],
    ['亏钱的机会有多大?', 'Probability of Loss', `${pct(sim.pLoss, 1)}(${sim.pLoss > 0 ? `大约每 ${Math.round(1 / sim.pLoss)} 期 1 次` : '几乎不会'})`],
    ['20 期里最倒霉那一期?', 'VaR 95%', lossOrGain(sim.q05)],
    ['100 期里最倒霉那一期?', 'VaR 99%', lossOrGain(sim.q01)],
    ['最倒霉的 1% 期，平均?', 'Expected Shortfall 99%', lossOrGain(sim.es99)],
    [`连做 ${c.horizon} 期，会不会赔光 ${rmK(c.reserve)}?`, 'Probability of Ruin', <span className={ruinP > c.ruinTarget ? 'rt-neg' : ''}>{ruinP > 0 ? `机会 ${pct(ruinP, 2)}` : '几乎不会'}</span>],
    [`抽了 ${c.sims.toLocaleString()} 次，最惨的一次?`, 'Maximum Simulated Loss', lossOrGain(sim.min)],
    ['理论上最惨能多惨?', 'Worst Case', lossOrGain(worst.profit)],
    [`一期亏光备用金 ${rmK(c.reserve)}?`, 'P(loss ≥ reserve)', freqLong(countLoss(sim.sorted, c.reserve), sim.n)],
  ];
  const worstRows: Array<{ key: string; cells: React.ReactNode[]; className?: string }> = [];
  for (const op of book.active) {
    const g: Record<number, any[]> = {}; worst.byOp[op].forEach((x: any) => { (g[x.type] = g[x.type] || []).push(x); });
    PRIZE.forEach((p, k) => {
      if (!g[k]) return;
      worstRows.push({ key: `${op}-${k}`, cells: [k === 0 ? OPS[op].name : '', `${p}${COUNT[k] > 1 ? ' × ' + COUNT[k] : ''}`, <span className="rt-num rt-wrap">{g[k].map((x) => pad(x.num)).join(' ')}</span>, rm(g[k].reduce((s, x) => s + x.pay, 0))] });
    });
  }
  worstRows.push({ key: 'sum', className: 'is-hl', cells: ['一共要赔', '', '', rm(worst.claims)] });
  worstRows.push({ key: 'res', className: 'is-hl', cells: ['这期结果', '', '', <Tone v={worst.profit}>{worst.profit < 0 ? '亏 ' + rm(-worst.profit) : '赚 ' + rm(worst.profit)}</Tone>] });
  const allocTop = topBy((i) => stake(c, i), 12);
  const picks = rows ? PLANS.map((p) => [p, pickPlan(c, rows, p.id)] as const) : [];
  const NumLink: React.FC<{ i: number }> = ({ i }) => <button type="button" className="rt-link rt-num" onClick={() => { setSelected(numOf(i)); setHeatOp(opOf(i)); goto('map'); }}>{tag(i)}</button>;

  return (
    <section className="rt-chapter">
      <ChapterHead index={4} title="让电脑先开奖几万次。" copy="看赚亏各有多常见、最惨会多惨、上限该定多少，再拿以前的开奖核对一次。" />

      <Block title="这期要赔多少钱?" sub={<>大多数时候赔 <b>{rmK(q(0.25))} 到 {rmK(q(0.75))}</b>;这期收进来扣掉开销有 <b>{rmK(book.base)}</b>,所以{sim.pLoss < 0.5 ? `一般会赚，大约每 ${Math.max(1, Math.round(1 / Math.max(sim.pLoss, 1e-9))).toLocaleString()} 期亏一次` : '多半会亏'}。</>}>
        <canvas ref={payRef} className="rt-canvas" />
        <Stats items={[
          { k: '一般情况', v: rmK(P50), d: '一半的期数赔得比这少' },
          { k: '20 期里有 1 期', v: <span className={P95 > book.base ? 'rt-neg' : ''}>{rmK(P95)}</span>, d: '会赔到这么多' },
          { k: '100 期里有 1 期', v: <span className={P99 > book.base ? 'rt-neg' : ''}>{rmK(P99)}</span>, d: '会赔到这么多' },
          { k: '最惨最多赔', v: <span className="rt-neg">{rmK(worst.claims)}</span>, d: <>机会{worstOdds(book.active.length)}</> },
        ]} />
        <p className="rt-note">柱子越高越常赔到这么多;红色表示赔得比收得多，这期亏钱。</p>
      </Block>

      <Block title="每期赚多少" sub="电脑像抽签一样，帮每家抽出 23 个号码(头奖、二奖、三奖各 1 个，特别奖、安慰奖各 10 个),算这期赚还是亏。「抽签编号」不变，抽到的号码就一样，拿不同做法来比才公平。">
        <div className="rt-controls">
          {(['sims', 'seed', 'horizon'] as const).map((k) => (
            <label key={k} className="rt-field">
              <span>{k === 'sims' ? '抽几次' : k === 'seed' ? '抽签编号' : '连续做几期(算会不会赔光)'}</span>
              <input type="number" value={simDraft[k]} onChange={(e) => setSimDraft({ ...simDraft, [k]: e.target.value })} />
            </label>
          ))}
          <button type="button" className="rt-btn" onClick={() => patch({
            sims: Math.max(1000, Math.min(1000000, parseInt(simDraft.sims, 10) || 100000)),
            seed: parseInt(simDraft.seed, 10) || 1,
            horizon: Math.max(1, parseInt(simDraft.horizon, 10) || 156),
          })}>重新抽</button>
          <span className="rt-note">抽了 {c.sims.toLocaleString()} 次，用了 {runMs} 毫秒</span>
        </div>
        <div className="rt-two">
          <div>
            <canvas ref={profRef} className="rt-canvas" />
            <p className="rt-note">0 的右边是赚钱，左边(红色)是亏钱。</p>
          </div>
          <Table head={['问题', '答案']} rows={metrics.map(([a, t, b]) => ({ key: t, cells: [<>{a}<span className="rt-term">{t}</span></>, b] }))} />
        </div>
      </Block>

      <Block title="最倒霉会倒霉到什么程度?" sub="不靠抽签，直接算：每家开出来的号码刚好都是让你赔最多的那些，一共要赔多少。真的开奖不可能比这更糟。">
        <Table head={['公司', '奖', '开出这些号码', '我要赔']} rows={worstRows} foot={<>这样开出来的机会:{worstOdds(book.active.length)}。{UNIVERSE},所以它不会真的发生，是确认备用金够不够的底线。</>} />
      </Block>

      <Block id="rt-sweep" title="所有上限，一次比较" sub="每个号码开头奖时，你自己最多赔「上限」这么多，多出来的交给上家(上家给回扣，中奖由上家赔)。上限越高平均赚越多，倒霉时也亏得越狠。下面从 0 一路试到不设上限。">
        <div className="rt-controls">
          <NumField label="最多能接受多大机会把备用金赔光(%)" value={+(c.ruinTarget * 100).toFixed(3)} step={0.5} onCommit={(v) => patch({ ruinTarget: v / 100 })} />
          <span className="rt-note">{rows ? `试了 ${rows.length} 种上限，每种开 ${SWEEP_SIMS.toLocaleString()} 期,${sweepMs} 毫秒` : '正在比较所有上限…'}</span>
        </div>
        {tableRows ? (
          <>
            <Table head={['每个号码最多赔', '自己留', '交给上家', '平均每月赚', '亏钱的月份', '最倒霉 1% 月份', '最惨的一期', '一期亏光备用金', '一年内赔光', '']}
              rows={tableRows.map((s) => ({
                key: String(s.limit), className: s.limit === c.limit ? 'is-hl' : undefined,
                cells: [
                  <>{limLabel(s.limit)}{s.limit === c.limit ? <span className="rt-open"> · 现在用的</span> : null}{picks.filter(([, r]) => r === s).map(([p]) => <span key={p.id} className="rt-pill">{p.name}</span>)}</>,
                  rmK(s.R), <>{rmK(s.U)}{s.forced > 1 ? <span className="rt-warn" title="上家装不下"> !</span> : null}</>,
                  <Tone v={s.E}>{rmK(perMonth(s.E))}</Tone>, pct(s.mLoss, 1), <Tone v={s.mES99}>{rmK(s.mES99)}</Tone>,
                  <span className={-s.worst > c.reserve ? 'rt-neg' : `rt-${tone(s.worst)}`}>{rmK(s.worst)}</span>,
                  <span className={s.nAll ? 'rt-neg' : ''}>{freqShort(s.nAll, s.n)}</span>,
                  <span className={s.ruin > c.ruinTarget ? 'rt-neg' : ''}>{pct(s.ruin, 2)}</span>,
                  s.limit === c.limit ? '' : <button type="button" className="rt-link" onClick={() => { setPlan(null); setLimit(s.limit); }}>用这个</button>,
                ],
              }))}
              foot={<>「最惨的一期」是理论底线，每一行的机会都在 {worstOdds(book.active.length)} 左右，等于不会发生。真正会碰到的坏情况看「一期亏光备用金」。</>} />
            <div className="rt-two">
              <div>
                <h4 className="rt-mini-title">赚得多，还是亏得少?</h4>
                <p className="rt-block-sub">每个点是一种上限。越往左上越好：赚得多，倒霉时亏得少。主色点符合「平衡」,黑点是你现在用的。</p>
                <canvas ref={frontRef} className="rt-canvas" />
              </div>
              <div>
                <h4 className="rt-mini-title">下注最多的号码，现在怎么分</h4>
                <Table head={['号码', '客人下注', '自己留', '交给上家', '开头奖我赔']} rows={allocTop.map((i) => ({
                  key: i, cells: [<NumLink i={i} />, rm(stake(c, i)), rm(book.Br[i] + book.Sr[i]), rm(book.Bt[i] + book.St[i]), rm(book.L[0][i])],
                }))} />
              </div>
            </div>
          </>
        ) : <p className="rt-busy">正在比较所有上限…</p>}
      </Block>

      <Block id="rt-backtest" title="拿以前的开奖来试试" sub={<>把以前开出来的号码一期一期放进来，看如果每一期都收到<b>现在这份下注</b>、用<b>现在的上限</b>,结果是赚还是亏。</>}>
        <p className="rt-formula">日期或期号, 公司(M / K / T), 头奖, 二奖, 三奖, 特别奖 10 个, 安慰奖 10 个{'\n'}2026-10-18, M, 1234, 5678, 9012, 0001 0002 … 0010, 1001 1002 … 1010</p>
        <p className="rt-note">逗号、空格都行;特别奖里的 ---- 会跳过，每行要刚好 23 个号码。同一天要有你所有收注公司的号码，缺了的那天会跳过。</p>
        <textarea className="rt-textarea" value={histText} onChange={(e) => setHistText(e.target.value)} placeholder="2026-10-18, M, 1234, 5678, 9012, ..." />
        <div className="rt-actions">
          <button type="button" className="rt-btn" onClick={() => importHistory(histText)}>放进来</button>
          <FileButton label="选择文件" accept=".csv,.txt,.tsv" onText={(t) => { setHistText(t); importHistory(t); }} />
          <button type="button" className="rt-btn rt-btn-ghost" onClick={sampleHistory}>先用一份假的试试</button>
          <span className="rt-note">{histInfo}</span>
        </div>
        {!history.length ? null : !bt?.n ? (
          <p className="rt-callout rt-crit">放进来的 {bt?.totalDates ?? 0} 天里，没有一天同时有 {book.active.map((op: number) => OPS[op].id).join('、')} 的号码。你收哪几家的注，每天就要放哪几家的号码。</p>
        ) : <BacktestResult {...{ bt, sim, worst, book, history, historySynthetic, cumRef }} />}
      </Block>
    </section>
  );
};

const BacktestResult: React.FC<any> = ({ bt, sim, worst, book, history, historySynthetic, cumRef }) => {
  const u = React.useMemo(() => uniformity(history), [history]);
  const worst10 = [...bt.draws].sort((a: any, b: any) => a.profit - b.profit).slice(0, 10);
  const nTail = (bt.n * COUNT[0]) / N;
  const allOk = u.pos.every((x) => x.p >= 0.01);
  return (
    <>
      {historySynthetic ? <p className="rt-callout rt-warn-box">现在用的是电脑乱生成的假开奖，不是真的开奖号码。放进真的号码以后，下面的数字才算数。</p> : null}
      <Stats items={[
        { k: '试了几期', v: bt.n.toLocaleString(), d: `${bt.draws[0].id} 到 ${bt.draws[bt.n - 1].id}${bt.skipped ? `,有 ${bt.skipped} 天缺号码跳过` : ''}` },
        { k: '一共赚了', v: <Tone v={bt.total}>{rmK(bt.total)}</Tone>, d: '假设每期都收到现在这份下注' },
        { k: '平均每期', v: <Tone v={bt.mean}>{rm(bt.mean)}</Tone>, d: `电脑抽签算的是 ${rm(book.Eprofit)}` },
        { k: '亏钱的期数', v: pct(bt.lossFreq), d: `电脑抽签算的是 ${pct(sim.pLoss)}` },
        { k: '最惨的那一期', v: <Tone v={bt.worst}>{rm(bt.worst)}</Tone>, d: `理论上最惨是 ${rm(worst.profit)}` },
        { k: '从最高点跌最多', v: rm(bt.maxDD), d: bt.minCapital < 0 ? <span className="rt-neg">中途备用金会赔光(最低 {rm(bt.minCapital)})</span> : `备用金最少还剩 ${rm(bt.minCapital)}` },
      ]} />
      <h4 className="rt-mini-title">钱是怎么一期一期累积的</h4>
      <p className="rt-block-sub">线往上走是在赚钱，往下掉是那期亏了。红点是最惨的 10 期。</p>
      <canvas ref={cumRef} className="rt-canvas" />
      <div className="rt-two">
        <div>
          <h4 className="rt-mini-title">最惨的 10 期</h4>
          <Table head={['日期', '这期结果', '一共赔', '赔最多的号码']} rows={worst10.map((d: any) => ({
            key: d.id, cells: [d.id, <Tone v={d.profit}>{rm(d.profit)}</Tone>, rm(d.claims), d.top && d.top.pay > 0 ? `${OPS[d.top.op].id}·${pad(d.top.n)} 中${PRIZE[d.top.k]},赔 ${rmK(d.top.pay)}` : '—'],
          }))} />
        </div>
        <div>
          <h4 className="rt-mini-title">以前真的开奖 vs 电脑抽签</h4>
          <p className="rt-block-sub">{bt.n.toLocaleString()} 期听起来很多，可是头奖一万次才开 1 次，每个号码在这段时间里平均只有 {nTail.toFixed(2)} 次机会中头奖。拿它核对「平均赚多少」可以，「最惨会多惨」还是看电脑抽签。</p>
          <Table head={['问题', '以前的开奖', '电脑抽签']} rows={[
            { key: 'm', cells: ['平均每期赚', <Tone v={bt.mean}>{rm(bt.mean)}</Tone>, <Tone v={sim.mean}>{rm(sim.mean)}</Tone>] },
            { key: 'l', cells: ['亏钱的期数', pct(bt.lossFreq), pct(sim.pLoss)] },
            { key: 'q', cells: ['100 期里最倒霉那一期', <Tone v={bt.q01}>{rm(bt.q01)}</Tone>, <Tone v={sim.q01}>{rm(sim.q01)}</Tone>] },
            { key: 'w', cells: ['最惨的一期', <Tone v={bt.worst}>{rm(bt.worst)}</Tone>, <Tone v={sim.min}>{rm(sim.min)}</Tone>] },
          ]} />
          <h4 className="rt-mini-title">开奖是不是公平乱开的?</h4>
          <p className="rt-block-sub">开奖公平的话，每一位数 0 到 9 出现的次数应该差不多(每个约 {Math.round(u.e).toLocaleString()} 次)。这里数了全部 {u.total.toLocaleString()} 个开出来的号码。</p>
          <Table head={['第几位数', '最少 / 最多出现', '差得多吗?']} rows={u.pos.map((x, p) => ({
            key: p, cells: [<>第 {p + 1} 位<span className="rt-term">χ² {x.chi.toFixed(1)} · p {x.p.toFixed(3)}</span></>, `${x.lo.toLocaleString()} / ${x.hi.toLocaleString()}`, <span className={x.p < 0.01 ? 'rt-warn' : 'rt-pos'}>{x.p < 0.01 ? '差得有点多，检查数据' : '正常，运气的小差别'}</span>],
          }))} foot={`${allOk ? '看起来是公平乱开的，所以电脑抽签的做法是对的，也没办法靠以前的号码猜下一期。' : '有一位数差得比较多，先检查数据(重复贴、贴错公司)再下结论。'}出现最多次的是 ${pad(u.maxN)}(${u.maxHit} 次，平均每个号码 ${u.expHit.toFixed(1)} 次);纯靠运气也一定会有某个号码特别多。`} />
        </div>
      </div>
    </>
  );
};

const FileButton: React.FC<{ label: string; accept: string; onText: (t: string) => void }> = ({ label, accept, onText }) => (
  <label className="rt-btn rt-btn-ghost">
    {label}
    <input type="file" accept={accept} hidden onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => onText(String(r.result)); r.readAsText(f); }} />
  </label>
);

// ---------- 05 settle + setup ----------
const Settle: React.FC<any> = (props) => {
  const { cfg, run, patch, setPlan, drawId, setDrawId, results, setResults, sOp, setSOp, csvText, setCsvText, impOp, setImpOp, importInfo, randomize, worstDraw, importCsv, resetSample } = props;
  const c = cfg as Config, { book } = run as Run;
  const res = React.useMemo(() => settle(c, book, results), [c, book, results]);
  const r = results[sOp] as ResultInput;
  const setField = (k: keyof ResultInput, v: string) => setResults((all: ResultInput[]) => all.map((x, op) => (op === sOp ? { ...x, [k]: v } : x)));
  const setOdds = (op: number, kind: 'big' | 'small', k: number, v: number) => patch({ odds: c.odds.map((o, j) => (j === op ? { ...o, [kind]: o[kind].map((x, kk) => (kk === k ? v : x)) } : o)) });
  const setProv = (i: number, p: Partial<Config['providers'][number]>) => patch({ providers: c.providers.map((x, j) => (j === i ? { ...x, ...p } : x)) });

  return (
    <section className="rt-chapter">
      <ChapterHead index={5} title="开奖以后，算清楚这期的账。" copy="填开出的号码算账、跟上家对数;也在这里换成你自己的下注、奖金表和合同。" />

      <Block title="这期开出什么号码?" sub="三家各开各的，用「哪家公司」切换。也可以先按「随便开一期」或「最倒霉的一期」试试看。">
        <div className="rt-controls">
          <Select label="哪家公司" value={sOp} onChange={(v) => setSOp(+v)} options={opOptions} />
          {(['r1', 'r2', 'r3'] as const).map((k, idx) => (
            <label key={k} className="rt-field rt-field-short"><span>{PRIZE[idx]}</span><input inputMode="numeric" maxLength={4} value={r[k]} onChange={(e) => setField(k, e.target.value)} /></label>
          ))}
          <label className="rt-field rt-field-grow"><span>特别奖(10 个)</span><input value={r.sp} onChange={(e) => setField('sp', e.target.value)} /></label>
          <label className="rt-field rt-field-grow"><span>安慰奖(10 个)</span><input value={r.co} onChange={(e) => setField('co', e.target.value)} /></label>
        </div>
        <div className="rt-actions">
          <button type="button" className="rt-btn rt-btn-ghost" onClick={randomize}>随便开一期</button>
          <button type="button" className="rt-btn rt-btn-ghost" onClick={worstDraw}>最倒霉的一期</button>
          {res.problems.length ? <span className="rt-neg">{res.problems.join(';')}</span> : null}
        </div>
        {res.problems.length ? null : (
          <>
            <p className="rt-settle-line font-display">这期{res.profit < 0 ? '亏了' : '赚了'} <Tone v={res.profit}>{rm(Math.abs(res.profit))}</Tone></p>
            <div className="rt-two">
              <Table head={['项目', '金额']} rows={[
                ['客人一共下注', rm(book.T)], ['自己留着的(收进来)', rm(book.R)], ['交给上家的', rm(book.U)], ['上家给的回扣(收进来)', rm(book.comm)],
                ...book.active.map((op) => [`自己要赔 · ${OPS[op].name}`, rm(-res.opPay[op])]),
                ['手续费', rm(-book.fee)], ['开销', rm(-c.opCost)],
              ].map(([a, b]) => ({ key: a, cells: [a, b] }))}
                foot={`留着的 ${rm(book.R)} + 回扣 ${rm(book.comm)} − 自己赔 ${rm(res.retPay)} − 手续费 ${rm(book.fee)} − 开销 ${rm(c.opCost)} = ${rm(res.profit)}。假设交给上家的下注全部转过去，上家另外给回扣，手续费你自己付;真的怎么算要看合同。`} />
              <div>
                <h4 className="rt-mini-title">跟上家怎么算钱</h4>
                <p className="rt-block-sub">「结果」是正数：你要付钱给上家;是负数：上家要付钱给你。</p>
                <Table head={['上家', '交过去的钱', '回扣', '手续费', '上家帮你赔', '结果']} rows={res.recon.map((a) => ({
                  key: a.name, cells: [<>{a.name}{a.confirmed ? null : <span className="rt-warn"> 没讲清楚</span>}</>, rm(a.U), rm(-a.comm), rm(a.fee), rm(-a.claims), <span className={a.net > 0 ? '' : 'rt-pos'}>{rm(a.net)}</span>],
                }))} />
                <h4 className="rt-mini-title">中奖的号码</h4>
                <Table head={['公司', '奖', '号码', '客人下注', '我自己赔', '上家赔']} rows={[
                  ...res.win.filter((w) => w.stake > 0 || w.k < 3).map((w) => ({ key: `${w.op}-${w.n}-${w.k}`, cells: [OPS[w.op].id, PRIZE[w.k], <span className="rt-num">{pad(w.n)}</span>, rm(w.stake), rm(w.rp), rm(w.tp)] })),
                  { key: 'sum', className: 'is-hl', cells: ['合计', '', '', '', rm(res.retPay), rm(res.trPay)] },
                ]} />
              </div>
            </div>
            <p className="rt-note">这里只是试算一期。正式记账(每张单的编号、退单、改账记录、不能偷改的记录)需要另外做后台。</p>
          </>
        )}
      </Block>

      <Block id="rt-book" title="客人的下注" sub={<>贴上或上传 CSV,每行写 <code>号码,Big,Small,公司</code>,单位 RM。公司写 M / K / T,不写就用下面选的那家;同一家同一号码写了好几行会自动加起来。数据只在你的浏览器里算，不会传到别的地方。</>}>
        <textarea className="rt-textarea" value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder={'号码,Big,Small,公司\n8888,500,200,M\n1234,280,120,T'} />
        <div className="rt-actions">
          <Select label="没写公司时算哪家" value={impOp} onChange={(v) => setImpOp(+v)} options={opOptions} />
          <button type="button" className="rt-btn" onClick={() => importCsv(csvText)}>放进来</button>
          <FileButton label="选择文件" accept=".csv,.txt" onText={(t) => { setCsvText(t); importCsv(t); }} />
          <button type="button" className="rt-btn rt-btn-ghost" onClick={resetSample}>换回示例数据</button>
          <span className="rt-note">{importInfo}</span>
        </div>
        <div className="rt-controls">
          <label className="rt-field"><span>本期编号</span><input value={drawId} onChange={(e) => setDrawId(e.target.value.trim() || drawId)} /></label>
          <NumField label="每个号码开头奖，我最多赔(RM)" value={c.limit} step={5000} empty="不设上限" onCommit={(v) => { setPlan(null); patch({ limit: v }); }} />
          <NumField label="备用金：准备拿来赔的钱(RM)" value={c.reserve} step={10000} onCommit={(v) => patch({ reserve: v })} />
          <NumField label="每期开销(RM)" value={c.opCost} step={100} onCommit={(v) => patch({ opCost: v })} />
        </div>
        <p className="rt-note">「最多赔」留空，就是不设上限：全部自己留着。</p>
      </Block>

      <div className="rt-two">
        <Block title="奖金表：下注 RM1 能赢多少" sub="Big 五种奖都能中，奖金比较少;Small 只中头奖、二奖、三奖，奖金比较多。三家先用同一套常见奖金，请照各公司真正的奖金表改。">
          <div className="rt-table-wrap">
            <table className="rt-table rt-table-inputs">
              <thead><tr><th>奖</th><th>开几个</th>{OPS.map((o) => <React.Fragment key={o.id}><th>{o.id} Big</th><th>{o.id} Small</th></React.Fragment>)}</tr></thead>
              <tbody>
                {PRIZE.map((p, k) => (
                  <tr key={p}>
                    <td>{p}</td><td>{COUNT[k]}</td>
                    {OPS.map((_, op) => (
                      <React.Fragment key={op}>
                        <td><MiniNum value={c.odds[op].big[k]} onCommit={(v) => setOdds(op, 'big', k, v)} /></td>
                        <td><MiniNum value={c.odds[op].small[k]} onCommit={(v) => setOdds(op, 'small', k, v)} /></td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>
        <Block id="rt-contracts" title="上家的合同" sub="回扣：交给上家的每 RM100,上家给你多少。手续费：每 RM100 要付给上家多少。最多能收：上家最多肯接多少。「说好会赔」没打勾，表示合同还没讲清楚，结论页会提醒你。">
          <div className="rt-table-wrap">
            <table className="rt-table rt-table-inputs">
              <thead><tr><th>上家</th><th>回扣 %</th><th>手续费 %</th><th>最多能收 RM</th><th>说好会赔</th></tr></thead>
              <tbody>
                {c.providers.map((p, i) => (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td><MiniNum value={+(p.comm * 100).toFixed(3)} step={0.5} onCommit={(v) => setProv(i, { comm: v / 100 })} /></td>
                    <td><MiniNum value={+(p.fee * 100).toFixed(3)} step={0.1} onCommit={(v) => setProv(i, { fee: v / 100 })} /></td>
                    <td><MiniNum value={p.cap} step={10000} wide onCommit={(v) => setProv(i, { cap: v })} /></td>
                    <td><input type="checkbox" checked={p.confirmed} onChange={(e) => setProv(i, { confirmed: e.target.checked })} aria-label={`${p.name} 说好会赔`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="rt-note">这里的回扣按交出去的钱算;如果合同按全部下注算，结果会不一样。</p>
        </Block>
      </div>
    </section>
  );
};

const MiniNum: React.FC<{ value: number; onCommit: (v: number) => void; step?: number; wide?: boolean }> = ({ value, onCommit, step, wide }) => {
  const [draft, setDraft] = React.useState(String(value));
  React.useEffect(() => { setDraft(String(value)); }, [value]);
  const commit = () => { const v = parseFloat(draft); if (Number.isFinite(v) && v !== value) onCommit(Math.max(0, v)); else setDraft(String(value)); };
  return <input type="number" className={`rt-mini${wide ? ' rt-mini-wide' : ''}`} step={step} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit} onKeyDown={(e) => { if (e.key === 'Enter') commit(); }} />;
};

export default RiskTerminal;
