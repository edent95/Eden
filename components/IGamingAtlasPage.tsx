import React from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import {
  ATLAS_CARDS,
  ATLAS_CLUSTERS,
  ATLAS_ERAS,
  ATLAS_PAGE,
  ATLAS_SERVICES,
  ATLAS_STEPS,
  type AtlasCard,
  type AtlasLocalized,
} from './igaming-atlas-content';

type Lang = 'en' | 'zh';

/**
 * `/igaming/atlas` — Eden's iGaming knowledge base as one engraved plate: eleven
 * method cards orbiting the core skill, a dated evidence timeline, the seven
 * decision questions and the consulting services they support. Two heroes only
 * (the hero rosette and the map plate); everything else is type, rules and space.
 * Copy lives in `igaming-atlas-content.ts` and is prerendered.
 */

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
const clusterOf = (id: string) => ATLAS_CLUSTERS.find((c) => c.ids.includes(id)) ?? ATLAS_CLUSTERS[3];
const tone = (id: string) => `var(--atlas-${clusterOf(id).key})`;
const cardById = (id: string) => ATLAS_CARDS.find((c) => c.id === id);

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

const Rosette: React.FC<{ detail?: boolean }> = ({ detail = true }) => {
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
      {detail ? (
        <>
          <circle r="196" className="atlas-l3" />
          <circle r="190" className="atlas-l3" />
          <g className="atlas-spin is-rev"><path d={paths.tick} className="atlas-l2" /></g>
          <g className="atlas-spin"><path d={paths.outer} className="atlas-l2 is-fine" /></g>
        </>
      ) : null}
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

/* ── map geometry ── */
const CX = 430;
const CY = 330;
const RX = 250;
const RY = 200;
const AX = 372;
const AY = 296;
const ORDER = ATLAS_CLUSTERS.flatMap((c) => c.ids);
const POS: Record<string, { x: number; y: number; a: number }> = Object.fromEntries(
  ORDER.map((id, i) => {
    const a = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / ORDER.length;
    return [id, { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a), a }];
  }),
);
const splitTitle = (title: string, lang: Lang): string[] => {
  if (lang === 'zh') {
    const short = title.split('：')[0];
    return short.length > 7 ? [short.slice(0, Math.ceil(short.length / 2)), short.slice(Math.ceil(short.length / 2))] : [short];
  }
  const words = title.split(' ');
  if (title.length <= 18) return [title];
  const lines: string[] = [''];
  words.forEach((w) => {
    const cur = lines[lines.length - 1];
    if ((cur + ' ' + w).trim().length > 20 && lines.length < 3) lines.push(w);
    else lines[lines.length - 1] = (cur + ' ' + w).trim();
  });
  return lines;
};
const MAP_LABEL: Record<string, AtlasLocalized> = {
  '01': { en: 'Same rule in every language', zh: '多语言规则等价' },
  '02': { en: 'Provider support is step one', zh: '供应商条件与可行性' },
  '03': { en: 'Player state before contact', zh: '会员旅程与联系边界' },
  '04': { en: 'Labels are not formulas', zh: '报表口径与证据' },
  '05': { en: 'Wallets, rewards, support', zh: '钱包奖励与客服' },
  '06': { en: 'Levels of channel evidence', zh: '渠道与内容证据' },
  '07': { en: 'Checkable hand-offs', zh: '跨团队交付' },
  '08': { en: 'Prototype is not a result', zh: '原型不等于成果' },
  '09': { en: 'Expected cost of a draw', zh: '奖励概率与期望成本' },
  '10': { en: 'Brand health check', zh: '品牌体检报告' },
  '11': { en: 'Six offers in, two out', zh: '六选二' },
};

const AtlasMap: React.FC<{ language: Lang; active: number; onOpen: (id: string) => void }> = ({ language, active, onOpen }) => {
  const ids = active >= 0 ? ATLAS_SERVICES[active].ids : null;
  return (
    <svg className="atlas-map" viewBox="0 0 860 660" role="group" aria-label={language === 'zh' ? '知识卡关系图' : 'Map of method cards'}>
      <ellipse cx={CX} cy={CY} rx={RX} ry={RY} className="atlas-l3" />
      <ellipse cx={CX} cy={CY} rx={AX} ry={AY} className="atlas-l3 is-dotted" />
      {ATLAS_CLUSTERS.map((c, ci) => {
        const as = c.ids.map((id) => POS[id].a);
        const a0 = Math.min(...as) - 0.3;
        const a1 = Math.max(...as) + 0.3;
        const am = (a0 + a1) / 2;
        const bottom = Math.sin(am) > 0.2;
        const P = (a: number, k = 0) => [CX + (AX + k) * Math.cos(a), CY + (AY + k) * Math.sin(a)];
        const [x0, y0] = P(a0);
        const [x1, y1] = P(a1);
        const [p0, p1] = bottom ? [P(a1, 14), P(a0, 14)] : [P(a0, 14), P(a1, 14)];
        return (
          <g key={c.key} style={{ ['--atlas-k' as string]: `var(--atlas-${c.key})` }}>
            <path d={`M${x0},${y0} A${AX},${AY} 0 0 1 ${x1},${y1}`} className="atlas-arc" />
            <path id={`atlas-arc-${ci}`} d={`M${p0[0]},${p0[1]} A${AX + 14},${AY + 14} 0 0 ${bottom ? 0 : 1} ${p1[0]},${p1[1]}`} fill="none" />
            <text className="atlas-arc-label" dy={bottom ? 10 : 0}>
              <textPath href={`#atlas-arc-${ci}`} startOffset="50%" textAnchor="middle">{c.name[language]}</textPath>
            </text>
          </g>
        );
      })}
      {ATLAS_SERVICES.map((s, si) =>
        s.ids.flatMap((a, i) =>
          s.ids.slice(i + 1).map((b) => (
            <path
              key={`${si}-${a}-${b}`}
              d={`M${POS[a].x},${POS[a].y} Q${CX},${CY} ${POS[b].x},${POS[b].y}`}
              className={`atlas-svc-edge${active === si ? ' is-on' : ''}`}
            />
          )),
        ),
      )}
      {ORDER.map((id) => (
        <line key={id} x1={CX} y1={CY} x2={POS[id].x} y2={POS[id].y} className={`atlas-spoke${ids && !ids.includes(id) ? ' is-dim' : ''}`} />
      ))}
      <g transform={`translate(${CX},${CY}) scale(.5)`} aria-hidden="true"><Rosette detail={false} /></g>
      <g className="atlas-core">
        <rect x={CX - 66} y={CY + 40} width="132" height="30" rx="15" />
        <text x={CX} y={CY + 60} textAnchor="middle">{ATLAS_PAGE.core[language]}</text>
      </g>
      {ORDER.map((id) => {
        const card = cardById(id)!;
        const { x, y, a } = POS[id];
        // Labels sit above or below the seal, never beside it: a side label runs into the cluster arc.
        const below = Math.sin(a) > 0;
        const lines = splitTitle(MAP_LABEL[id][language], language);
        const tx = x;
        const anchor = 'middle';
        const ty0 = below ? y + 46 : y - 36 - (lines.length - 1) * 17;
        return (
          <g
            key={id}
            className={`atlas-node${ids && !ids.includes(id) ? ' is-dim' : ''}`}
            style={{ ['--atlas-k' as string]: tone(id) }}
            tabIndex={0}
            role="button"
            aria-label={`${id} · ${card.title[language]}`}
            onClick={() => onOpen(id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen(id);
              }
            }}
          >
            <g className="atlas-seal">
              <circle cx={x} cy={y} r="27" className="atlas-seal-ring" />
              <circle cx={x} cy={y} r="22" className="atlas-seal-disc" />
              <text x={x} y={y + 6} textAnchor="middle" className="atlas-seal-num">{id}</text>
            </g>
            {lines.map((line, i) => (
              <text key={line} x={tx} y={ty0 + i * 17} textAnchor={anchor} className="atlas-node-label">{line}</text>
            ))}
          </g>
        );
      })}
    </svg>
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
      <aside className="atlas-drawer" role="dialog" aria-modal="true" aria-labelledby="atlas-drawer-title" style={card ? { ['--atlas-k' as string]: tone(card.id) } : undefined}>
        {card ? (
          <>
            <header className="atlas-drawer-head">
              <span className="atlas-kicker">{card.id} · {clusterOf(card.id).name[language]}</span>
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
  const close = React.useCallback(() => setOpenId(null), []);
  const activeIds = active >= 0 ? ATLAS_SERVICES[active].ids : null;
  const tagButtons = (ids: string[]) =>
    ids.map((id) => {
      const card = cardById(id);
      return card ? (
        <button key={id} type="button" className="atlas-tag" style={{ ['--atlas-k' as string]: tone(id) }} onClick={() => setOpenId(id)}>
          {id} · {MAP_LABEL[id][language]}
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

        <section className="atlas-section" id="map" aria-labelledby="atlas-map-title">
          <div className="atlas-head">
            <span className="atlas-no">{page.sections.map.no}</span>
            <div>
              <h2 id="atlas-map-title">{t(page.sections.map.title)}</h2>
              <p>{t(page.sections.map.lede)}</p>
            </div>
          </div>
          <div className="atlas-chips" role="group" aria-label={t(page.sections.services.title)}>
            <button type="button" className="atlas-chip" aria-pressed={active < 0} onClick={() => setActive(-1)}>{t(page.allServices)}</button>
            {ATLAS_SERVICES.map((s, i) => (
              <button key={s.name.en} type="button" className="atlas-chip" aria-pressed={active === i} onClick={() => setActive(i)}>
                {t(s.name)}<span>{s.ids.length}</span>
              </button>
            ))}
          </div>
          <div className="atlas-plate">
            <AtlasMap language={language} active={active} onOpen={setOpenId} />
            <p className="atlas-legend">
              {ATLAS_CLUSTERS.map((c) => (
                <span key={c.key} style={{ ['--atlas-k' as string]: `var(--atlas-${c.key})` }}><i aria-hidden="true" />{t(c.name)}</span>
              ))}
              <span>{t(page.legendNote)}</span>
            </p>
          </div>
          <div className="atlas-cards">
            {ATLAS_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                className={`atlas-card${activeIds && !activeIds.includes(card.id) ? ' is-dim' : ''}`}
                style={{ ['--atlas-k' as string]: tone(card.id) }}
                onClick={() => setOpenId(card.id)}
              >
                <span className="atlas-card-no">{card.id}</span>
                <span className="atlas-card-cat">{t(clusterOf(card.id).name)}</span>
                <span className="atlas-card-title">{t(card.title)}</span>
                <span className="atlas-card-gist">{t(card.gist)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="atlas-section" id="timeline" aria-labelledby="atlas-time-title">
          <div className="atlas-head">
            <span className="atlas-no">{page.sections.time.no}</span>
            <div>
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
            <span className="atlas-no">{page.sections.steps.no}</span>
            <div>
              <h2 id="atlas-steps-title">{t(page.sections.steps.title)}</h2>
              <p>{t(page.sections.steps.lede)}</p>
            </div>
          </div>
          <div className="atlas-steps">
            {ATLAS_STEPS.map((step, i) => (
              <details key={step.q.en} open={i === 0}>
                <summary>
                  <span className="atlas-roman">{ROMAN[i]}.</span>
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
            <span className="atlas-no">{page.sections.services.no}</span>
            <div>
              <h2 id="atlas-svc-title">{t(page.sections.services.title)}</h2>
              <p>{t(page.sections.services.lede)}</p>
            </div>
          </div>
          <div className="atlas-services">
            {ATLAS_SERVICES.map((s, i) => (
              <article key={s.name.en} className="atlas-service">
                <div className="atlas-service-top">
                  <span className="atlas-roman">{ROMAN[i]}.</span>
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
