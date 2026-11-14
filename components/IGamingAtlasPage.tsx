import React from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import {
  ATLAS_BASICS,
  ATLAS_CARDS,
  ATLAS_ERAS,
  ATLAS_LINES,
  ATLAS_PAGE,
  ATLAS_SERVICES,
  ATLAS_STAGES,
  ATLAS_STEPS,
  ATLAS_TOPICS,
  type AtlasCard,
  type AtlasLocalized,
} from './igaming-atlas-content';
import IGamingAtlasCharts from './IGamingAtlasCharts';
import AtlasEngraving from './AtlasEngraving';
import AtlasScene, { type AtlasSceneKind } from './AtlasScene';

type Lang = 'en' | 'zh';

/**
 * `/igaming/atlas` — Eden's iGaming knowledge base. The map is a workflow: one
 * campaign moves through five stages (promise → partner → deliver → player →
 * evidence) and each stage carries the method cards you reach for at that moment.
 * One engraved hero (the rosette); one ink (bronze foil) for every accent.
 * Copy lives in `igaming-atlas-content.ts` and is prerendered.
 */

const cardById = (id: string) => ATLAS_CARDS.find((c) => c.id === id);
const stageOf = (id: string) => ATLAS_STAGES.find((s) => s.ids.includes(id)) ?? ATLAS_STAGES[ATLAS_STAGES.length - 1];
const TOPIC_SCENE: Record<string, AtlasSceneKind> = { promise: 'balance', partner: 'hourglass', player: 'beacon', evidence: 'loupe' };
const pad = (n: number) => String(n).padStart(2, '0');

/** Hypotrochoid: the guilloché line of banknote engraving. Points only, never shown as text. */
function hypo(R: number, r: number, d: number, scale: number, steps = 720): string {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const turns = r / gcd(R, r);
  const pts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * 2 * Math.PI * turns;
    const x = ((R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)) * scale;
    const y = ((R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)) * scale;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
}

function ticks(r: number, n: number, len: number): string {
  let s = '';
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * 2 * Math.PI;
    const l = i % 5 === 0 ? len * 1.8 : len;
    s += `M${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}L${((r + l) * Math.cos(a)).toFixed(1)},${((r + l) * Math.sin(a)).toFixed(1)}`;
  }
  return s;
}

const Rosette: React.FC = () => {
  const paths = React.useMemo(
    () => ({
      outer: hypo(144, 8, 22, 1.04),
      mid1: hypo(120, 7, 46, 0.98),
      mid2: hypo(120, 7, 30, 0.98),
      gold: hypo(96, 9, 42, 1),
      core: hypo(50, 5, 14, 0.95),
      tick: ticks(168, 144, 6),
    }),
    [],
  );
  return (
    <g className="atlas-rosette">
      <circle r="196" className="atlas-l3" />
      <circle r="190" className="atlas-l3" />
      <g className="atlas-spin is-rev"><path d={paths.tick} className="atlas-l2" /></g>
      <g className="atlas-spin"><path d={paths.outer} className="atlas-l2 is-fine" /></g>
      <g className="atlas-spin is-fast">
        <path d={paths.mid1} className="atlas-l3" />
        <path d={paths.mid2} className="atlas-l2 is-fine" />
      </g>
      <g className="atlas-spin is-rev"><path d={paths.gold} className="atlas-gold" /></g>
      <circle r="58" className="atlas-hub-disc" />
      <circle r="52" className="atlas-l3" />
      <g className="atlas-spin"><path d={paths.core} className="atlas-foil" /></g>
      <circle r="5" className="atlas-foil-dot" />
    </g>
  );
};

const CardDrawer: React.FC<{ card: AtlasCard | null; language: Lang; onClose: () => void }> = ({ card, language, onClose }) => {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (!card) return undefined;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [card, onClose]);
  const t = (v: AtlasLocalized) => v[language];
  const labels = ATLAS_PAGE.cardLabels;
  const services = card ? ATLAS_SERVICES.filter((s) => s.ids.includes(card.id)) : [];
  const eras = card ? ATLAS_ERAS.filter((e) => e.ids.includes(card.id)) : [];
  return (
    <div className={`atlas-drawer-root${card ? ' is-open' : ''}`} aria-hidden={!card}>
      <div className="atlas-scrim" onClick={onClose} />
      <aside className="atlas-drawer" role="dialog" aria-modal="true" aria-labelledby="atlas-drawer-title">
        {card ? (
          <>
            <header className="atlas-drawer-head">
              <span className="atlas-kicker">{card.id} / {t(stageOf(card.id).name)}</span>
              <button ref={closeRef} type="button" onClick={onClose} aria-label={t(labels.close)}><X size={18} aria-hidden="true" /></button>
            </header>
            <div className="atlas-drawer-body">
              <h2 id="atlas-drawer-title">{t(card.title)}</h2>
              <p className="atlas-gist">{t(card.gist)}</p>
              <h3>{t(labels.practice)}</h3>
              <p>{t(card.picture)}</p>
              <h3>{t(labels.checks)}</h3>
              <ul className="atlas-checks">{card.checks.map((c) => <li key={c.en}>{t(c)}</li>)}</ul>
              <h3>{t(labels.limit)}</h3>
              <p className="atlas-limit">{t(card.limit)}</p>
              <div className="atlas-related">
                {services.length ? <span className="atlas-kicker">{t(labels.services)}</span> : null}
                {services.map((s) => <span key={s.name.en} className="atlas-tag">{t(s.name)}</span>)}
                {eras.length ? <span className="atlas-kicker">{t(labels.eras)}</span> : null}
                {eras.map((e) => <span key={e.year} className="atlas-tag">{e.year} · {t(e.title)}</span>)}
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
};

const IGamingAtlasPage: React.FC<{
  language: Lang;
  backHref: string;
  casesHref: string;
  controls: React.ReactNode;
}> = ({ language, backHref, casesHref, controls }) => {
  const t = (v: AtlasLocalized) => v[language];
  const page = ATLAS_PAGE;
  const [active, setActive] = React.useState(-1);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [view, setView] = React.useState<'topic' | 'flow'>('topic');
  const close = React.useCallback(() => setOpenId(null), []);
  const activeIds = active >= 0 ? ATLAS_SERVICES[active].ids : null;
  const tiles = (ids: string[]) => (
    <ul className="atlas-tiles">
      {ids.map((id) => {
        const card = cardById(id);
        if (!card) return null;
        const dim = !!activeIds && !activeIds.includes(id);
        return (
          <li key={id}>
            <button
              type="button"
              className={`atlas-tile${dim ? ' is-dim' : ''}${activeIds && !dim ? ' is-on' : ''}`}
              onClick={() => setOpenId(id)}
            >
              <span className="atlas-tile-no">{id}</span>
              <span className="atlas-tile-title">{t(card.title)}</span>
              <span className="atlas-tile-line">{t(ATLAS_LINES[id])}</span>
              <ArrowRight className="atlas-tile-go" size={16} aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
  const tagButtons = (ids: string[]) =>
    ids.map((id) => {
      const card = cardById(id);
      return card ? (
        <button key={id} type="button" className="atlas-tag" onClick={() => setOpenId(id)}>
          {id} · {t(card.title)}
        </button>
      ) : null;
    });

  return (
    <div className={`igaming-page igaming-atlas${language === 'zh' ? ' is-zh' : ''}`}>
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={backHref} className="project-home-back igaming-back">
          <ArrowLeft size={16} aria-hidden="true" />
          {t(page.back)}
        </a>
        {controls}
      </nav>

      <main className="atlas-main">
        <header className="atlas-hero">
          <div className="atlas-hero-copy">
            <p className="atlas-kicker">{t(page.kicker)}</p>
            <h1>
              {t(page.claimLead)} <span className="atlas-foil-text">{t(page.claimFoil)}</span>
            </h1>
            <p className="atlas-standfirst">{t(page.standfirst)}</p>
            <div className="atlas-ctas">
              <a href="#basics" className="atlas-cta">{t(page.ctaPrimary)}<ArrowRight size={16} aria-hidden="true" /></a>
              <a href="#services" className="atlas-cta is-quiet">{t(page.ctaSecondary)}</a>
            </div>
            <dl className="atlas-ledger">
              {page.ledger.map((item) => (
                <div key={item.value + item.label.en}>
                  <dt>{item.value}</dt>
                  <dd>{t(item.label)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <svg className="atlas-emblem" viewBox="-200 -200 400 400" aria-hidden="true"><Rosette /></svg>
        </header>

        <section className="atlas-section" id="basics" aria-labelledby="atlas-basics-title">
          <div className="atlas-head">
            <div>
              <p className="atlas-kicker">{t(page.sections.basics.kicker)}</p>
              <h2 id="atlas-basics-title">{t(page.sections.basics.title)}</h2>
              <p>{t(page.sections.basics.lede)}</p>
            </div>
          </div>
          <ol className="atlas-chain">
            {ATLAS_BASICS.chain.map((role, i) => (
              <li key={role.key} className="atlas-role">
                <AtlasEngraving kind={role.key as 'provider' | 'merchant' | 'player'} />
                <span className="atlas-kicker">{t(role.name)}</span>
                <h3>{t(role.plain)}</h3>
                <p>{t(role.does)}</p>
                {i < ATLAS_BASICS.links.length ? (
                  <span className="atlas-chain-link" aria-hidden="true">{t(ATLAS_BASICS.links[i])}<ArrowRight size={14} /></span>
                ) : null}
              </li>
            ))}
          </ol>
          <div className="atlas-me">
            <AtlasEngraving kind="middle" />
            <div>
              <h3>{t(ATLAS_BASICS.me.title)}</h3>
              <p>{t(ATLAS_BASICS.me.body)}</p>
            </div>
          </div>
          <h3 className="atlas-gloss-title">{t(ATLAS_BASICS.glossaryTitle)}</h3>
          <dl className="atlas-gloss">
            {ATLAS_BASICS.glossary.map((g) => (
              <div key={g.term}>
                <dt>{g.term}</dt>
                <dd>{t(g.plain)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="atlas-section" id="map" aria-labelledby="atlas-map-title">
          <div className="atlas-head">
            <div>
              <p className="atlas-kicker">{t(page.sections.map.kicker)}</p>
              <h2 id="atlas-map-title">{t(page.sections.map.title)}</h2>
              <p>{t(page.sections.map.lede)}</p>
            </div>
          </div>
          <div className="atlas-views" role="group" aria-label={t(page.views.label)}>
            <button type="button" aria-pressed={view === 'topic'} onClick={() => setView('topic')}>{t(page.views.topic)}</button>
            <button type="button" aria-pressed={view === 'flow'} onClick={() => setView('flow')}>{t(page.views.flow)}</button>
          </div>
          <div className="atlas-chips" role="group" aria-label={t(page.sections.services.title)}>
            <button type="button" className="atlas-chip" aria-pressed={active < 0} onClick={() => setActive(-1)}>{t(page.allServices)}</button>
            {ATLAS_SERVICES.map((s, i) => (
              <button key={s.name.en} type="button" className="atlas-chip" aria-pressed={active === i} onClick={() => setActive(i)}>
                {t(s.name)}<span>{s.ids.length}</span>
              </button>
            ))}
          </div>

          {view === 'topic' ? (
            <ol className="atlas-topics">
              {ATLAS_TOPICS.map((topic, ti) => (
                <li key={topic.key} className="atlas-topic">
                  {TOPIC_SCENE[topic.key] ? <AtlasScene kind={TOPIC_SCENE[topic.key]} /> : null}
                  <div className="atlas-topic-head">
                    <span className="atlas-stage-seal" aria-hidden="true">{String.fromCharCode(65 + ti)}</span>
                    <div>
                      <h3>{t(topic.name)}</h3>
                      <p className="atlas-topic-asks"><span>{t(page.asks)}</span>{t(topic.asks)}</p>
                    </div>
                  </div>
                  <p className="atlas-topic-plain">{t(topic.plain)}</p>
                  {tiles(topic.ids)}
                </li>
              ))}
            </ol>
          ) : (
          <ol className="atlas-flow">
            {ATLAS_STAGES.map((stage, si) => (
              <li key={stage.key} className="atlas-stage">
                <div className="atlas-stage-head">
                  <span className="atlas-stage-seal" aria-hidden="true">{si + 1}</span>
                  <div>
                    <h3>{t(stage.name)}</h3>
                    <p>{t(stage.when)}</p>
                  </div>
                </div>
                {tiles(stage.ids)}
              </li>
            ))}
          </ol>
          )}
        </section>

        <section className="atlas-section" id="numbers" aria-labelledby="atlas-num-title">
          <div className="atlas-head">
            <div>
              <p className="atlas-kicker">{t(page.sections.numbers.kicker)}</p>
              <h2 id="atlas-num-title">{t(page.sections.numbers.title)}</h2>
              <p>{t(page.sections.numbers.lede)}</p>
            </div>
          </div>
          <IGamingAtlasCharts language={language} onOpen={setOpenId} />
        </section>

        <section className="atlas-section" id="timeline" aria-labelledby="atlas-time-title">
          <div className="atlas-head">
            <div>
              <p className="atlas-kicker">{t(page.sections.time.kicker)}</p>
              <h2 id="atlas-time-title">{t(page.sections.time.title)}</h2>
              <p>{t(page.sections.time.lede)}</p>
            </div>
          </div>
          <ol className="atlas-eras">
            {ATLAS_ERAS.map((era) => (
              <li key={era.year} className={era.now ? 'is-now' : undefined}>
                <span className="atlas-year">{era.year}</span>
                <div>
                  <h3>{t(era.title)}</h3>
                  <p>{t(era.body)}</p>
                  <div className="atlas-tags">{tagButtons(era.ids)}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="atlas-section" id="questions" aria-labelledby="atlas-steps-title">
          <div className="atlas-head">
            <div>
              <p className="atlas-kicker">{t(page.sections.steps.kicker)}</p>
              <h2 id="atlas-steps-title">{t(page.sections.steps.title)}</h2>
              <p>{t(page.sections.steps.lede)}</p>
            </div>
          </div>
          <div className="atlas-steps">
            {ATLAS_STEPS.map((step, i) => (
              <details key={step.q.en} open={i === 0}>
                <summary>
                  <span className="atlas-roman">{pad(i + 1)}</span>
                  <span>{t(step.q)}</span>
                  <span className="atlas-pm" aria-hidden="true" />
                </summary>
                <p>{t(step.a)}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="atlas-section" id="services" aria-labelledby="atlas-svc-title">
          <div className="atlas-head">
            <div>
              <p className="atlas-kicker">{t(page.sections.services.kicker)}</p>
              <h2 id="atlas-svc-title">{t(page.sections.services.title)}</h2>
              <p>{t(page.sections.services.lede)}</p>
            </div>
          </div>
          <div className="atlas-services">
            {ATLAS_SERVICES.map((s, i) => (
              <article key={s.name.en} className="atlas-service">
                <div className="atlas-service-top">
                  <span className="atlas-roman">{pad(i + 1)}</span>
                  <span>{t(s.time)}</span>
                </div>
                <h3>{t(s.name)}</h3>
                <p>{t(s.pain)}</p>
                <ul>{s.out.map((o) => <li key={o.en}>{t(o)}</li>)}</ul>
                <div className="atlas-tags">{tagButtons(s.ids)}</div>
              </article>
            ))}
          </div>
          <p className="atlas-boundaries">{t(page.boundaries)}</p>
          <div className="atlas-next">
            <a href={casesHref}>{t(page.next)}<ArrowRight size={16} aria-hidden="true" /></a>
            <a href={backHref}>{t(page.starter)}<ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <CardDrawer card={openId ? cardById(openId) ?? null : null} language={language} onClose={close} />
    </div>
  );
};

export default IGamingAtlasPage;
