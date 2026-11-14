import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ATLAS_NUMBERS, type AtlasLocalized } from './igaming-atlas-content';
import IGamingAtlasPick from './IGamingAtlasPick';

type Lang = 'en' | 'zh';

/**
 * `/igaming/atlas` charts: three worked examples (wheel cost, rebate base, channel
 * levels). Plain HTML bars, one bronze ink plus one blue for the second series;
 * a hover tooltip per mark and a table view per figure. Numbers are illustrative.
 */

const fmt = (n: number, digits = 0) => n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const pct = (n: number) => `${fmt(n * 100, n > 0 && n < 0.1 ? 1 : 0)}%`;

type Tip = { x: number; y: number; text: string } | null;

/** One tooltip per figure, positioned from the pointer inside the figure box. */
function useTip() {
  const ref = React.useRef<HTMLElement>(null);
  const [tip, setTip] = React.useState<Tip>(null);
  const bind = (text: string) => ({
    onPointerMove: (e: React.PointerEvent) => {
      const box = ref.current?.getBoundingClientRect();
      if (box) setTip({ x: e.clientX - box.left, y: e.clientY - box.top, text });
    },
    onPointerLeave: () => setTip(null),
  });
  const node = tip ? (
    <span className="atlas-tip" role="status" style={{ left: tip.x, top: tip.y }}>{tip.text}</span>
  ) : null;
  return { ref, bind, node };
}

const FigureFoot: React.FC<{ card: string; t: (v: AtlasLocalized) => string; onOpen: (id: string) => void; children: React.ReactNode }> = ({ card, t, onOpen, children }) => (
  <footer className="atlas-fig-foot">
    <details className="atlas-fig-table">
      <summary>{t(ATLAS_NUMBERS.table)}</summary>
      {children}
    </details>
    <button type="button" className="atlas-fig-open" onClick={() => onOpen(card)}>
      {t(ATLAS_NUMBERS.open)} {card}<ArrowRight size={14} aria-hidden="true" />
    </button>
  </footer>
);

const WheelChart: React.FC<{ t: (v: AtlasLocalized) => string; onOpen: (id: string) => void }> = ({ t, onOpen }) => {
  const w = ATLAS_NUMBERS.wheel;
  const perSpin = w.slots.reduce((sum, s) => sum + s.p * s.value, 0);
  const rows = w.slots.map((s, i) => ({ ...s, i, cost: (s.p * s.value) / perSpin }));
  const [entries, setEntries] = React.useState(1000);
  const { ref, bind, node } = useTip();
  const phone = rows[rows.length - 1];
  const bar = (key: 'p' | 'cost', label: AtlasLocalized) => (
    <div className="atlas-stack-row">
      <span className="atlas-stack-label">{t(label)}</span>
      <div className="atlas-stack" role="img" aria-label={`${t(label)}: ${rows.map((r) => `${t(r.label)} ${pct(r[key])}`).join(', ')}`}>
        {rows.filter((r) => r[key] > 0).map((r) => (
          <span
            key={r.i}
            className={`atlas-seg is-s${r.i + 1}`}
            style={{ flexGrow: r[key] }}
            {...bind(`${t(r.label)} · ${t(label)} ${pct(r[key])}`)}
          />
        ))}
      </div>
    </div>
  );
  return (
    <figure className="atlas-fig is-wide" ref={ref as React.RefObject<HTMLElement>}>
      <figcaption>
        <h3>{t(w.title)}</h3>
        <p>{t(w.lede)}</p>
      </figcaption>
      <div className="atlas-fig-body">
        <div className="atlas-stacks">
          {bar('p', w.spins)}
          {bar('cost', w.cost)}
          <p className="atlas-stack-call">
            <span className="is-s5" aria-hidden="true" />
            {t(phone.label)}: {pct(phone.p)} → {pct(phone.cost)}
          </p>
        </div>
        <ul className="atlas-legend">
          {rows.map((r) => (
            <li key={r.i}>
              <span className={`atlas-swatch is-s${r.i + 1}`} aria-hidden="true" />
              <span className="atlas-legend-name">{t(r.label)}</span>
              <span className="atlas-legend-val">{pct(r.p)} · {pct(r.cost)}</span>
            </li>
          ))}
        </ul>
        <div className="atlas-calc">
          <label className="atlas-calc-input">
            <span>{t(w.entries)}</span>
            <output>{fmt(entries)}</output>
            <input type="range" min={100} max={5000} step={100} value={entries} onChange={(e) => setEntries(Number(e.target.value))} />
          </label>
          <dl className="atlas-calc-out">
            <div><dt>{t(w.perSpin)}</dt><dd>{fmt(perSpin, 1)} <small>{t(w.unit)}</small></dd></div>
            <div><dt>{t(w.perDay)}</dt><dd>{fmt(perSpin * entries)} <small>{t(w.unit)}</small></dd></div>
            <div><dt>{t(w.phones)}</dt><dd>{fmt(phone.p * entries, 1)}</dd></div>
          </dl>
        </div>
      </div>
      {node}
      <FigureFoot card={w.card} t={t} onOpen={onOpen}>
        <table>
          <thead><tr><th>{t(w.prize)}</th><th>{t(w.spins)}</th><th>{t(w.cost)}</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r.i}><td>{t(r.label)}</td><td>{pct(r.p)}</td><td>{pct(r.cost)}</td></tr>)}</tbody>
        </table>
      </FigureFoot>
    </figure>
  );
};

const RebateChart: React.FC<{ t: (v: AtlasLocalized) => string; onOpen: (id: string) => void }> = ({ t, onOpen }) => {
  const r = ATLAS_NUMBERS.rebate;
  const max = Math.max(...r.rows.map((row) => row.base)) * 0.1;
  const { ref, bind, node } = useTip();
  return (
    <figure className="atlas-fig" ref={ref as React.RefObject<HTMLElement>}>
      <figcaption>
        <h3>{t(r.title)}</h3>
        <p>{t(r.lede)}</p>
      </figcaption>
      <div className="atlas-fig-body">
        <ul className="atlas-bars">
          {r.rows.map((row) => {
            const paid = row.base * 0.1;
            return (
              <li key={row.label.en}>
                <span className="atlas-bar-label">{t(row.label)}<small>{fmt(row.base)}</small></span>
                <span className="atlas-bar-track">
                  <span className="atlas-bar is-c1" style={{ width: `${(paid / max) * 100}%` }} {...bind(`10% × ${fmt(row.base)} = ${fmt(paid)}`)} />
                </span>
                <span className="atlas-bar-val">{fmt(paid)}</span>
              </li>
            );
          })}
        </ul>
        <p className="atlas-fig-stat">
          <strong>{fmt(Math.max(...r.rows.map((row) => row.base)) / Math.min(...r.rows.map((row) => row.base)))}×</strong>
          <span>{t(r.spread)}</span>
        </p>
      </div>
      {node}
      <FigureFoot card={r.card} t={t} onOpen={onOpen}>
        <table>
          <thead><tr><th>{t(r.base)}</th><th /><th>{t(r.paid)}</th></tr></thead>
          <tbody>{r.rows.map((row) => <tr key={row.label.en}><td>{t(row.label)}</td><td>{fmt(row.base)}</td><td>{fmt(row.base * 0.1)}</td></tr>)}</tbody>
        </table>
      </FigureFoot>
    </figure>
  );
};

const ChannelChart: React.FC<{ t: (v: AtlasLocalized) => string; onOpen: (id: string) => void }> = ({ t, onOpen }) => {
  const c = ATLAS_NUMBERS.channels;
  const { ref, bind, node } = useTip();
  return (
    <figure className="atlas-fig" ref={ref as React.RefObject<HTMLElement>}>
      <figcaption>
        <h3>{t(c.title)}</h3>
        <p>{t(c.lede)}</p>
      </figcaption>
      <div className="atlas-fig-body">
        <ul className="atlas-legend is-inline">
          {c.series.map((s, i) => (
            <li key={s.en}><span className={`atlas-swatch is-c${i + 1}`} aria-hidden="true" /><span className="atlas-legend-name">{t(s)}</span></li>
          ))}
        </ul>
        <div className="atlas-facets">
          {c.levels.map((lv) => {
            const max = Math.max(lv.a, lv.b);
            return (
              <div key={lv.label.en} className="atlas-facet">
                <h4>{t(lv.label)}</h4>
                {[lv.a, lv.b].map((v, i) => (
                  <div key={i} className="atlas-facet-row">
                    <span className="atlas-facet-key">{i ? 'B' : 'A'}</span>
                    <span className="atlas-bar-track">
                      <span className={`atlas-bar is-c${i + 1}`} style={{ width: `${(v / max) * 100}%` }} {...bind(`${t(c.series[i])} · ${t(lv.label)} ${fmt(v)}`)} />
                    </span>
                    <span className="atlas-bar-val">{fmt(v)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {node}
      <FigureFoot card={c.card} t={t} onOpen={onOpen}>
        <table>
          <thead><tr><th>{t(c.level)}</th>{c.series.map((s) => <th key={s.en}>{t(s)}</th>)}</tr></thead>
          <tbody>{c.levels.map((lv) => <tr key={lv.label.en}><td>{t(lv.label)}</td><td>{fmt(lv.a)}</td><td>{fmt(lv.b)}</td></tr>)}</tbody>
        </table>
      </FigureFoot>
    </figure>
  );
};

const IGamingAtlasCharts: React.FC<{ language: Lang; onOpen: (id: string) => void }> = ({ language, onOpen }) => {
  const t = (v: AtlasLocalized) => v[language];
  return (
    <div className="atlas-figs">
      <IGamingAtlasPick language={language} onOpen={onOpen} />
      <WheelChart t={t} onOpen={onOpen} />
      <RebateChart t={t} onOpen={onOpen} />
      <ChannelChart t={t} onOpen={onOpen} />
      <p className="atlas-fig-note">{t(ATLAS_NUMBERS.note)}</p>
    </div>
  );
};

export default IGamingAtlasCharts;
