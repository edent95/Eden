import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { joinBasePath, type Language } from '../app/shared';
import { MIYA_BRAND, MIYA_BRAND_ASSETS, type MiyaBrandLocalized } from './miya-brand-content';

/** Render the only inline markup used in `miya-brand-content.ts`: `` `code` ``. */
const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(`[^`]+`)/g).filter(Boolean).map((part, index) =>
      part.startsWith('`') && part.endsWith('`')
        ? <code key={index}>{part.slice(1, -1)}</code>
        : <React.Fragment key={index}>{part}</React.Fragment>,
    )}
  </>
);

const SectionHead: React.FC<{ kicker: string; title: string; copy: string; id?: string }> = ({ kicker, title, copy, id }) => (
  <div className="brand-guide-section-head">
    <p className="brand-guide-kicker">{kicker}</p>
    <h2 id={id} className="brand-guide-section-title font-display font-bold tracking-tight">{title}</h2>
    <p className="brand-guide-section-copy">{copy}</p>
  </div>
);

const RuleGrid: React.FC<{ rules: ReadonlyArray<{ title: MiyaBrandLocalized; copy: MiyaBrandLocalized }>; language: Language }> = ({ rules, language }) => (
  <div className="brand-guide-rule-grid mt-8">
    {rules.map((rule) => (
      <article key={rule.title.en} className="brand-guide-rule-card">
        <h3 className="font-display text-2xl font-bold tracking-tight">{rule.title[language]}</h3>
        <p><Inline text={rule.copy[language]} /></p>
      </article>
    ))}
  </div>
);

/**
 * `/project/miya/brand` — MiYa brand guide, laid out like `/brand-guide` (same `brand-guide-*`
 * classes) with MiYa-specific pieces in `styles/pages/miya-brand.css`.
 */
const MiyaBrandPage: React.FC<{
  language: Language;
  baseUrl: string;
  privacyHref: string;
  controls: React.ReactNode;
}> = ({ language, baseUrl, privacyHref, controls }) => {
  const page = MIYA_BRAND;
  const t = (value: MiyaBrandLocalized) => value[language];
  const asset = (key: keyof typeof MIYA_BRAND_ASSETS) => joinBasePath(baseUrl, MIYA_BRAND_ASSETS[key]);

  return (
    <div className="page-shell brand-guide-page miya-brand-page min-h-screen">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="brand-guide-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={privacyHref} className="brand-guide-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {language === 'zh' ? 'MiYa 隐私与支持' : 'MiYa privacy & support'}
            </a>
            {controls}
          </div>

          <header className="brand-guide-hero py-16 text-center md:py-24">
            <p className="brand-guide-kicker mx-auto">{t(page.kicker)}</p>
            <h1 className="brand-guide-hero-title mx-auto mt-5 font-display font-bold tracking-tight">{t(page.title)}</h1>
            <p className="brand-guide-hero-subtitle mx-auto mt-5">{t(page.subtitle)}</p>
            <p className="brand-guide-hero-copy mx-auto mt-5">{t(page.copy)}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#miya-voice" className="brand-guide-cta">{t(page.ctaPrimary)} <span aria-hidden>›</span></a>
              <a href={privacyHref} className="brand-guide-cta brand-guide-cta-muted">{t(page.ctaSecondary)} <span aria-hidden>›</span></a>
            </div>
            <div className="brand-guide-signature mx-auto mt-12">
              <div className="brand-guide-mark miya-brand-mark">
                <img src={asset('appIcon')} alt="" width={72} height={72} />
              </div>
              <div>
                <p className="brand-guide-signature-label">{t(page.signatureLabel)}</p>
                <p className="brand-guide-signature-line font-display font-bold tracking-tight">
                  {page.signatureLine.map((line) => <span key={line.en}>{t(line)}</span>)}
                </p>
              </div>
            </div>
          </header>

          <section className="brand-guide-classification py-12 md:py-16" aria-labelledby="miya-brand-map-title">
            <SectionHead id="miya-brand-map-title" kicker={t(page.map.kicker)} title={t(page.map.title)} copy={t(page.map.copy)} />
            <div className="brand-guide-category-grid mt-10">
              {page.map.groups.map((group, index) => (
                <article key={group.name.en} className={`brand-guide-category-card brand-guide-category-${index + 1}`}>
                  <p className="brand-guide-card-index">{t(group.scope)}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{t(group.name)}</h3>
                  <ul>{group.items.map((item) => <li key={item.en}>{t(item)}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section id="miya-voice" className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.voice.kicker)} title={t(page.voice.title)} copy={t(page.voice.copy)} />
            <div className="mt-12 space-y-4">
              {page.voice.pairs.map((pair) => (
                <article key={pair.ctx.en} className="brand-guide-voice-row">
                  <div>
                    <p className="brand-guide-card-index">{t(pair.ctx)} · Avoid</p>
                    <p className="miya-brand-avoid">{t(pair.avoid)}</p>
                  </div>
                  <div>
                    <p className="brand-guide-card-index">{t(pair.ctx)} · Prefer</p>
                    <p>{t(pair.prefer)}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="brand-guide-detail-grid mt-8">
              {page.voice.rules.map((rule) => (
                <article key={rule.title.en} className="brand-guide-detail-item">
                  <h3>{t(rule.title)}</h3>
                  <p><Inline text={t(rule.copy)} /></p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {page.voice.boundaries.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{t(item.title)}</h3>
                  <p>{t(item.copy)}</p>
                  <p className="miya-brand-quote">{t(item.quote)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.name.kicker)} title={t(page.name.title)} copy={t(page.name.copy)} />
            <div className="brand-guide-principle-grid miya-brand-name-grid mt-12 grid gap-4 md:grid-cols-3">
              {page.name.cards.map((card) => (
                <article key={card.index.en} className="brand-guide-principle-card">
                  <p className="brand-guide-card-index">{t(card.index)}</p>
                  <h3 className={`font-display text-2xl font-bold tracking-tight${card.wrong ? ' miya-brand-wrong' : ''}`}>{t(card.big)}</h3>
                  <p>{t(card.copy)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.color.kicker)} title={t(page.color.title)} copy={t(page.color.copy)} />
            <div className="miya-brand-key mt-12">
              {page.color.key.map((item) => (
                <article key={item.token} className="miya-brand-key-card" style={{ '--miya-key-light': item.light, '--miya-key-dark': item.dark } as React.CSSProperties}>
                  <b>{t(item.name)}</b>
                  <code>{item.token} · {item.light} / {item.dark}</code>
                </article>
              ))}
            </div>
            <p className="brand-guide-kicker mt-8">{t(page.color.legend)}</p>
            {page.color.groups.map((group) => (
              <div key={group.title.en} className="miya-brand-swatch-group">
                <h3 className="font-display text-2xl font-bold tracking-tight">{t(group.title)}</h3>
                <p><Inline text={t(group.copy)} /></p>
                <div className="miya-brand-swatches">
                  {group.swatches.map((swatch) => (
                    <article key={swatch.name} className="brand-guide-swatch">
                      <span className="brand-guide-swatch-chip miya-brand-chip" aria-hidden="true">
                        <i style={{ background: swatch.light }} />
                        {swatch.light !== swatch.dark && <i style={{ background: swatch.dark }} />}
                      </span>
                      <div>
                        <p className="brand-guide-card-index">{swatch.light === swatch.dark ? swatch.light : `${swatch.light} / ${swatch.dark}`}</p>
                        <h4>{swatch.name}</h4>
                        <p>{t(swatch.use)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
            <RuleGrid rules={page.color.rules} language={language} />
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.type.kicker)} title={t(page.type.title)} copy={t(page.type.copy)} />
            <div className="miya-brand-type mt-12">
              {page.type.rows.map((row) => (
                <div key={row.token} className="miya-brand-type-row">
                  <p className="brand-guide-card-index">{row.token}<span>{row.spec}</span></p>
                  <p
                    className="miya-brand-type-sample"
                    style={{
                      fontSize: row.size,
                      lineHeight: row.lh,
                      fontWeight: row.weight,
                      letterSpacing: row.tracking ? '0.08em' : undefined,
                    }}
                  >
                    {t(row.sample)}
                    {row.unit && <small> {t(row.unit)}</small>}
                  </p>
                </div>
              ))}
            </div>
            <RuleGrid rules={page.type.rules} language={language} />
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.space.kicker)} title={t(page.space.title)} copy={t(page.space.copy)} />
            <div className="brand-guide-layout-spec-grid mt-12">
              {page.space.steps.map((step) => (
                <article key={step.token} className="brand-guide-layout-spec-card">
                  <b>{step.px}px</b>
                  <div>
                    <span className="miya-brand-bar" style={{ width: step.px }} aria-hidden="true" />
                    <p>{step.token} · {t(step.use)}</p>
                  </div>
                </article>
              ))}
              {page.space.radii.map((radius) => (
                <article key={radius.token} className="brand-guide-layout-spec-card">
                  <b>{radius.value}</b>
                  <div>
                    <span className="miya-brand-radius" style={{ borderRadius: radius.value }} aria-hidden="true" />
                    <p>{radius.token} · {t(radius.use)}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="miya-brand-golden mt-8">
              <svg viewBox="0 0 233 144" aria-hidden="true">
                <rect className="g-frame" x=".5" y=".5" width="232" height="143" />
                <line className="g-guide" x1="89" y1="0" x2="89" y2="144" />
                <line className="g-guide" x1="144" y1="0" x2="144" y2="144" />
                <line className="g-guide" x1="0" y1="55" x2="233" y2="55" />
                <line className="g-guide" x1="0" y1="89" x2="233" y2="89" />
                <rect className="g-frame" x="89" y="0" width="144" height="144" />
                <rect className="g-frame" x="0" y="0" width="89" height="89" />
                <rect className="g-frame" x="34" y="89" width="55" height="55" />
                <path className="g-spiral" d="M233 144A144 144 0 0 0 89 0A89 89 0 0 0 0 89A55 55 0 0 0 55 144A34 34 0 0 0 89 110A21 21 0 0 0 68 89A13 13 0 0 0 55 102A8 8 0 0 0 63 110" />
                <circle className="g-dot" cx="65" cy="102" r="4" />
              </svg>
            </div>
            <RuleGrid rules={page.space.rules} language={language} />
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.logo.kicker)} title={t(page.logo.title)} copy={t(page.logo.copy)} />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {page.logo.marks.map((mark) => (
                <article key={mark.asset} className="brand-guide-use-card miya-brand-logo">
                  <div className="miya-brand-logo-stage">
                    {mark.shape === 'sizes' ? (
                      <div className="miya-brand-logo-sizes">
                        <img src={asset(mark.asset)} alt={t(mark.alt)} width={96} height={96} />
                        <img src={asset(mark.asset)} alt="" width={48} height={48} />
                        <img src={asset(mark.asset)} alt="" width={24} height={24} />
                      </div>
                    ) : (
                      <img className={`miya-brand-logo-${mark.shape}`} src={asset(mark.asset)} alt={t(mark.alt)} width={156} height={156} />
                    )}
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-tight">{t(mark.title)}</h3>
                  <p>{t(mark.copy)}</p>
                </article>
              ))}
            </div>
            <p className="brand-guide-kicker mt-10">{t(page.logo.dontsLabel)}</p>
            <div className="miya-brand-donts">
              {page.logo.donts.map((dont) => (
                <figure key={dont.id} className={`miya-brand-dont miya-brand-dont-${dont.id}`}>
                  <div><img src={asset('appIcon')} alt="" /></div>
                  <figcaption>{t(dont.label)}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.icons.kicker)} title={t(page.icons.title)} copy={t(page.icons.copy)} />
            <div className="brand-guide-layout-spec-grid mt-12">
              {page.icons.motifs.map((motif) => (
                <article key={motif.id} className="brand-guide-layout-spec-card">
                  <b>{t(motif.name)}</b>
                  <div>
                    <p className="brand-guide-card-index">{motif.id}</p>
                    <p>{t(motif.formula)}</p>
                  </div>
                </article>
              ))}
            </div>
            <RuleGrid rules={page.icons.rules} language={language} />
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.motion.kicker)} title={t(page.motion.title)} copy={t(page.motion.copy)} />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {page.motion.rules.map((rule) => (
                <article key={rule.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{t(rule.title)}</h3>
                  <p><Inline text={t(rule.copy)} /></p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <SectionHead kicker={t(page.tools.kicker)} title={t(page.tools.title)} copy={t(page.tools.copy)} />
            <div className="brand-guide-rule-grid mt-12">
              {page.tools.list.map((tool) => (
                <article key={tool.skill} className="brand-guide-rule-card miya-brand-tool">
                  <p className="brand-guide-card-index">
                    <span className={`miya-brand-pill miya-brand-pill-${tool.status}`}>{t(page.tools.status[tool.status])}</span>
                    {t(tool.label)}
                  </p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{tool.skill}</h3>
                  <p>{t(tool.copy)}</p>
                </article>
              ))}
            </div>
          </section>

          <p className="pb-10 text-center text-xs text-stone-500">{t(page.footer)}</p>
        </div>
      </main>
    </div>
  );
};

export default MiyaBrandPage;
