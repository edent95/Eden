import React from 'react';
import { ATLAS_NUMBERS, type AtlasLocalized } from './igaming-atlas-content';
import { SORTER_META, SORTER_SVG } from './atlas-sorter-art';

type Lang = 'en' | 'zh';
type Vec = [number, number, number];

/**
 * `/igaming/atlas` Fig 1, "six in, two out" (anatomy skill, engraved ink). The static
 * bench is prebuilt SVG (`scripts/iso/build-atlas-sorter.mjs`); this component only moves
 * the six tokens and four probes along the same isometric projection, from one timeline
 * derived from the offer results in `ATLAS_NUMBERS.sorter`. Stops offscreen; under
 * reduced motion it shows the finished state.
 */

const M = SORTER_META;
const R = Math.PI / 180;

function screenOf([x, y, z]: Vec): [number, number] {
  const a = M.P.azimuth * R;
  const e = M.P.elevation * R;
  const k = M.P.scale * Math.sqrt(1.6);
  return [(x * Math.sin(a) - y * Math.cos(a)) * k, ((x * Math.cos(a) + y * Math.sin(a)) * Math.sin(e) - z * Math.cos(e)) * k];
}

function depthOf([x, y, z]: Vec): number {
  const a = M.P.azimuth * R;
  const e = M.P.elevation * R;
  return (x * Math.cos(a) + y * Math.sin(a)) * Math.cos(e) + z * Math.sin(e);
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a: Vec, b: Vec, t: number): Vec => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

type Move = { t0: number; t1: number; from: Vec; to: Vec; hop?: number };
type Probe = { station: number; t0: number; t1: number; fail: boolean };
type Say = { t: number; offer: number; station: number; state: 'check' | 'stop' | 'pass' };

function timeline(stops: number[]) {
  const moves: Move[][] = stops.map(() => []);
  const probes: Probe[] = [];
  const says: Say[] = [];
  const DOWN = 0.32;
  const HOLD = 0.42;
  let t = 0.6;
  let accepted = 0;
  stops.forEach((stop, i) => {
    let pos: Vec = [M.queue[i], 0, M.bed];
    const go = (to: Vec, speed = 0.011, hop = 0) => {
      const d = Math.hypot(to[0] - pos[0], to[1] - pos[1]);
      const dt = Math.max(0.42, d * speed);
      moves[i].push({ t0: t, t1: t + dt, from: pos, to, hop });
      t += dt;
      pos = to;
    };
    for (let s = 0; s < M.stations.length; s += 1) {
      go([M.stations[s], 0, M.bed]);
      const fail = s === stop;
      says.push({ t, offer: i, station: s, state: 'check' });
      probes.push({ station: s, t0: t, t1: t + DOWN * 2 + HOLD, fail });
      t += DOWN + HOLD;
      if (fail) {
        says.push({ t, offer: i, station: s, state: 'stop' });
        go([M.stations[s], M.binY, M.binTop], 0.03, 3);
        t += 0.25;
        return;
      }
      t += DOWN * 0.6;
    }
    go([M.accept[accepted], 0, M.cradleTop]);
    accepted += 1;
    says.push({ t, offer: i, station: -1, state: 'pass' });
    t += 0.3;
  });
  return { moves, probes, says, end: t, total: t + 3.4 };
}

const IGamingAtlasSorter: React.FC<{ language: Lang; onOpen: (id: string) => void }> = ({ language, onOpen }) => {
  const t = (v: AtlasLocalized) => v[language];
  const copy = ATLAS_NUMBERS.sorter;
  const stops = React.useMemo(() => copy.results.map((r) => r.stop), [copy.results]);
  const plan = React.useMemo(() => timeline(stops), [stops]);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const readRef = React.useRef<HTMLSpanElement>(null);

  // Text lives in a ref so language changes do not restart the animation.
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
    // The SVG is inserted here, not by React, so re-renders never replace the nodes we move.
    if (!stage.querySelector('svg')) stage.innerHTML = SORTER_SVG;
    const layer = stage.querySelector<SVGGElement>('[data-tokens]');
    const tokens = Array.from(stage.querySelectorAll('[data-token]')) as SVGGElement[];
    const probes = Array.from(stage.querySelectorAll('[data-probe]')) as SVGGElement[];
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let start = 0;
    let visible = false;
    let lastOrder = '';
    let lastSay = '';

    const posAt = (i: number, time: number): Vec => {
      const list = plan.moves[i];
      if (!list.length || time <= list[0].t0) return [M.queue[i], 0, M.bed];
      for (const m of list) {
        if (time <= m.t1) {
          const u = ease(Math.min(1, Math.max(0, (time - m.t0) / (m.t1 - m.t0))));
          const p = lerp(m.from, m.to, u);
          if (m.hop) p[2] += Math.sin(u * Math.PI) * m.hop;
          return p;
        }
      }
      return list[list.length - 1].to;
    };

    const draw = (time: number) => {
      const fade = time > plan.end + 2.6 ? Math.max(0, 1 - (time - plan.end - 2.6) / 0.5) : time < 0.4 ? time / 0.4 : 1;
      if (layer) layer.style.opacity = String(fade);
      const pos = tokens.map((_, i) => posAt(i, time));
      let active = -1;
      plan.says.forEach((s) => { if (s.t <= time) active = s.state === 'check' ? s.offer : -1; });
      tokens.forEach((el, i) => {
        const [sx, sy] = screenOf(pos[i]);
        el.setAttribute('transform', `translate(${sx.toFixed(2)} ${sy.toFixed(2)})`);
        const inCradle = pos[i][0] >= M.accept[0] - 1 && Math.abs(pos[i][1]) < 1;
        const state = i === active ? 'active' : inCradle ? 'in' : pos[i][1] > 4 ? 'out' : 'wait';
        if (el.dataset.state !== state) el.dataset.state = state;
      });
      const order = tokens.map((_, i) => i).sort((a, b) => depthOf(pos[a]) - depthOf(pos[b]));
      const key = order.join('');
      if (key !== lastOrder && layer) {
        order.forEach((i) => layer.appendChild(tokens[i]));
        lastOrder = key;
      }
      probes.forEach((el, s) => {
        const p = plan.probes.find((q) => q.station === s && time >= q.t0 && time <= q.t1);
        let dz = 0;
        let state = 'rest';
        if (p) {
          const span = p.t1 - p.t0;
          const u = (time - p.t0) / span;
          const reach = M.probeRest - M.probeContact;
          const down = 0.32 / span;
          dz = -reach * (u < down ? ease(u / down) : u > 1 - down ? ease((1 - u) / down) : 1);
          state = u > 0.45 && p.fail ? 'fail' : 'check';
        }
        const [sx, sy] = screenOf([0, 0, dz]);
        el.setAttribute('transform', `translate(${sx.toFixed(2)} ${sy.toFixed(2)})`);
        if (el.dataset.state !== state) el.dataset.state = state;
      });
      let say: Say | undefined;
      plan.says.forEach((s) => { if (s.t <= time) say = s; });
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
    <figure className="atlas-fig is-wide atlas-sorter">
      <figcaption>
        <h3>{t(copy.title)}</h3>
        <p>{t(copy.lede)}</p>
      </figcaption>
      <div className="atlas-sorter-plate">
        <div className="atlas-sorter-corners" aria-hidden="true">
          <span>{t(copy.fig)}</span>
          <span>{t(copy.hint)}</span>
        </div>
        <div ref={stageRef} className="atlas-sorter-stage" />
        <p className="atlas-sorter-read" aria-live="polite"><span ref={readRef}>{t(copy.done)}</span></p>
      </div>
      <ol className="atlas-sorter-gates">
        {copy.gates.map((g, i) => (
          <li key={g.en}>
            <span className="atlas-sorter-dots" aria-hidden="true">{Array.from({ length: i + 1 }, (_, n) => <i key={n} />)}</span>
            {t(g)}
          </li>
        ))}
      </ol>
      <footer className="atlas-fig-foot">
        <span className="atlas-fig-note-inline">{t(ATLAS_NUMBERS.note)}</span>
        <button type="button" className="atlas-fig-open" onClick={() => onOpen(copy.card)}>
          {t(ATLAS_NUMBERS.open)} {copy.card} →
        </button>
      </footer>
    </figure>
  );
};

export default IGamingAtlasSorter;
