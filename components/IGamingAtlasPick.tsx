import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ATLAS_NUMBERS, type AtlasLocalized } from './igaming-atlas-content';
import { opticalMarkup } from './AtlasOptical';

type Lang = 'en' | 'zh';

/**
 * `/igaming/atlas` Fig 1, "six in, two out" (card 11) as an optical night scene: six offer
 * cards on a table, a lamp lights one card at a time while the four questions are asked in
 * order. A card that fails one is set aside with that many dots (the question that stopped
 * it); the two that pass all four stay lit. One timeline, derived from
 * `ATLAS_NUMBERS.sorter.results`, drives the light and the readout. The SVG is inserted by the
 * effect (not by React) so re-renders never replace the nodes it updates. Stops offscreen;
 * reduced motion shows the finished table.
 */

type Say = { t: number; offer: number; station: number; state: 'check' | 'stop' | 'pass' };

const LIGHT = 0.45; // lamp moves to the next card
const ASK = 0.5; // one question
const SETTLE = 0.7; // result shown before the lamp moves on

function timeline(stops: number[]) {
  const says: Say[] = [];
  const spans: { offer: number; t0: number; t1: number }[] = [];
  const results: { offer: number; t: number; stop: number }[] = [];
  let t = 0.5;
  stops.forEach((stop, i) => {
    const t0 = t;
    t += LIGHT;
    const asks = stop < 0 ? 4 : stop + 1;
    for (let s = 0; s < asks; s += 1) {
      says.push({ t, offer: i, station: s, state: 'check' });
      t += ASK;
    }
    says.push({ t, offer: i, station: stop, state: stop < 0 ? 'pass' : 'stop' });
    results.push({ offer: i, t, stop });
    t += SETTLE;
    spans.push({ offer: i, t0, t1: t });
  });
  return { says, spans, results, end: t, total: t + 3.2 };
}

const IGamingAtlasPick: React.FC<{ language: Lang; onOpen: (id: string) => void }> = ({ language, onOpen }) => {
  const t = (v: AtlasLocalized) => v[language];
  const copy = ATLAS_NUMBERS.sorter;
  const stops = React.useMemo(() => copy.results.map((r) => r.stop), [copy.results]);
  const plan = React.useMemo(() => timeline(stops), [stops]);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const readRef = React.useRef<HTMLSpanElement>(null);
  const gatesRef = React.useRef<HTMLOListElement>(null);
  // Text lives in a ref so a language switch does not restart the animation.
  const sayRef = React.useRef<(s: Say | undefined, end: boolean) => string>(() => '');
  sayRef.current = (s, end) => {
    if (end) return t(copy.done);
    if (!s) return `${t(copy.offer)} 1 · ${t(copy.checking)}`;
    const head = `${t(copy.offer)} ${s.offer + 1}`;
    if (s.state === 'check') return `${head} · ${t(copy.checking)} ${s.station + 1}`;
    return `${head} · ${t(copy.results[s.offer].why)}`;
  };

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (!stage.querySelector('svg')) stage.innerHTML = opticalMarkup('pick');
    const cards = Array.from(stage.querySelectorAll('[data-card]')) as SVGGElement[];
    const beams = Array.from(stage.querySelectorAll('[data-beam]')) as SVGGElement[];
    const gates = gatesRef.current ? (Array.from(gatesRef.current.children) as HTMLElement[]) : [];
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let start = 0;
    let visible = false;
    let lastSay = '';

    const draw = (time: number) => {
      const span = plan.spans.find((s) => time >= s.t0 && time < s.t1);
      const active = time < plan.end && span ? span.offer : -1;
      beams.forEach((b, i) => {
        const on = i === active ? '1' : '0';
        if (b.dataset.on !== on) b.dataset.on = on;
      });
      let say: Say | undefined;
      plan.says.forEach((s) => { if (s.t <= time) say = s; });
      cards.forEach((c, i) => {
        const done = plan.results.find((r) => r.offer === i && r.t <= time);
        const state = done ? (done.stop < 0 ? 'in' : 'out') : i === active ? 'check' : 'wait';
        if (c.dataset.state !== state) c.dataset.state = state;
        const lit = done && done.stop >= 0 ? done.stop + 1 : i === active && say && say.offer === i ? say.station + 1 : 0;
        c.querySelectorAll<SVGCircleElement>('.pk-dot').forEach((d, k) => {
          const on = k < lit ? '1' : '0';
          if (d.dataset.on !== on) d.dataset.on = on;
        });
      });
      gates.forEach((g, k) => {
        const on = say && say.offer === active && say.state === 'check' && say.station === k ? '1' : '0';
        if (g.dataset.on !== on) g.dataset.on = on;
      });
      const text = sayRef.current(say, time >= plan.end);
      if (text !== lastSay && readRef.current) {
        readRef.current.textContent = text;
        lastSay = text;
      }
    };

    const tick = (now: number) => {
      if (!start) start = now;
      draw(((now - start) / 1000) % plan.total);
      frame = visible ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (still.matches) { draw(plan.end + 0.01); return; }
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) run();
    }, { rootMargin: '120px 0px' });
    io.observe(stage);
    draw(still.matches ? plan.end + 0.01 : 0);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [plan]);

  return (
    <figure className="atlas-fig is-wide atlas-pick">
      <figcaption>
        <h3>{t(copy.title)}</h3>
        <p>{t(copy.lede)}</p>
      </figcaption>
      <div className="atlas-pick-stage">
        <div ref={stageRef} className="atlas-optical is-pick" aria-hidden="true" />
        <p className="atlas-pick-read" aria-live="polite"><span ref={readRef}>{t(copy.done)}</span></p>
      </div>
      <ol ref={gatesRef} className="atlas-pick-gates">
        {copy.gates.map((g, i) => (
          <li key={g.en}>
            <span className="atlas-pick-dots" aria-hidden="true">{Array.from({ length: i + 1 }, (_, n) => <i key={n} />)}</span>
            {t(g)}
          </li>
        ))}
      </ol>
      <footer className="atlas-fig-foot">
        <span className="atlas-fig-note-inline">{t(ATLAS_NUMBERS.note)}</span>
        <button type="button" className="atlas-fig-open" onClick={() => onOpen(copy.card)}>
          {t(ATLAS_NUMBERS.open)} {copy.card}<ArrowRight size={14} aria-hidden="true" />
        </button>
      </footer>
    </figure>
  );
};

export default IGamingAtlasPick;
