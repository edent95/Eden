/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type EpText = { en: string; zh: string };

export type EpBlock =
  | { kind: 'p'; text: EpText }
  | { kind: 'h'; text: EpText }
  | { kind: 'callout'; tone?: 'note' | 'warning'; label: EpText; text: EpText }
  | { kind: 'steps'; items: { title: EpText; text: EpText }[] };

export type EpLink = { href: string; label: EpText; external?: boolean };

export type EpAction = EpLink & { ghost?: boolean; icon?: React.ReactNode };

export type ProductStorePageProps = {
  isZh: boolean;
  /** Theme + language toggles rendered on the right of the sticky bar. */
  controls: React.ReactNode;
  pageClassName?: string;
  backHref: string;
  backLabel: EpText;
  icon: React.ReactNode;
  name: string;
  kicker: EpText;
  tagline: EpText;
  meta: EpText;
  primary: EpAction;
  secondary?: EpAction;
  quickLinks?: EpLink[];
  stage?: { src: string; domain: string; title: EpText; caption: EpText };
  body: EpBlock[];
  faq: { q: EpText; a: EpText }[];
  specs: [EpText, EpText][];
  also?: { href: string; name: string; blurb: EpText; icon: React.ReactNode }[];
  alsoTitle?: EpText;
};

const linkProps = (external?: boolean) =>
  external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {};

const ProductStorePage: React.FC<ProductStorePageProps> = ({
  isZh,
  controls,
  pageClassName,
  backHref,
  backLabel,
  icon,
  name,
  kicker,
  tagline,
  meta,
  primary,
  secondary,
  quickLinks = [],
  stage,
  body,
  faq,
  specs,
  also = [],
  alsoTitle,
}) => {
  const t = (value: EpText) => (isZh ? value.zh : value.en);
  const [stuck, setStuck] = React.useState(false);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const node = sentinelRef.current;
      if (!node) return;
      setStuck(node.getBoundingClientRect().top <= 56);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Landing directly on /page#faq should still jump to the section once it renders.
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`page-shell eden-product-page min-h-screen ${pageClassName ?? ''}`}>
      <div className="ep-bar" data-stuck={stuck ? 'true' : 'false'}>
        <div className="ep-bar-inner">
          <div className="ep-bar-lead">
            <a href={backHref} className="ep-bar-back">
              <span aria-hidden>←</span>
              {t(backLabel)}
            </a>
            <div className="ep-bar-id" aria-hidden={!stuck}>
              <span className="ep-bar-icon">{icon}</span>
              <span className="ep-bar-name">{name}</span>
            </div>
          </div>
          <span className="ep-bar-spacer" />
          {quickLinks.length > 0 && (
            <nav className="ep-bar-nav">
              {quickLinks.map((link) => (
                <a key={link.href} href={link.href} {...linkProps(link.external)}>
                  {t(link.label)}
                </a>
              ))}
            </nav>
          )}
          <a
            href={primary.href}
            className="ep-get ep-bar-get"
            tabIndex={stuck ? 0 : -1}
            {...linkProps(primary.external)}
          >
            {t(primary.label)}
          </a>
          {controls}
        </div>
      </div>

      <main>
        <div className="ep-shell">
          <header className="ep-hero">
            <div className="ep-hero-icon">{icon}</div>
            <p className="ep-hero-kicker">{t(kicker)}</p>
            <h1 className="ep-hero-title">{name}</h1>
            <p className="ep-hero-tagline">{t(tagline)}</p>
            <div className="ep-hero-actions">
              <a href={primary.href} className="ep-get" {...linkProps(primary.external)}>
                {primary.icon}
                {t(primary.label)}
              </a>
              {secondary && (
                <a
                  href={secondary.href}
                  className={`ep-get${secondary.ghost === false ? '' : ' ep-get-ghost'}`}
                  {...linkProps(secondary.external)}
                >
                  {secondary.icon}
                  {t(secondary.label)}
                </a>
              )}
            </div>
            {quickLinks.length > 0 && (
              <nav className="ep-hero-links">
                {quickLinks.map((link) => (
                  <a key={link.href} href={link.href} {...linkProps(link.external)}>
                    {t(link.label)}
                  </a>
                ))}
              </nav>
            )}
            <p className="ep-hero-meta">{t(meta)}</p>
          </header>
          <div ref={sentinelRef} aria-hidden="true" />

          {stage && (
            <section className="ep-stage" aria-label={t(stage.title)}>
              <div className="ep-stage-frame">
                <div className="ep-stage-toolbar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <p>{stage.domain}</p>
                </div>
                <iframe src={stage.src} title={t(stage.title)} loading="lazy" />
              </div>
              <p className="ep-stage-caption">{t(stage.caption)}</p>
            </section>
          )}

          <section className="ep-prose" id="overview">
            {body.map((block, index) => {
              if (block.kind === 'p') return <p key={index}>{t(block.text)}</p>;
              if (block.kind === 'h') return <h2 key={index}>{t(block.text)}</h2>;
              if (block.kind === 'callout') {
                return (
                  <div
                    key={index}
                    className={`ep-callout${block.tone === 'warning' ? ' ep-callout-warning' : ''}`}
                  >
                    <span>{t(block.label)}</span>
                    <p>{t(block.text)}</p>
                  </div>
                );
              }
              return (
                <ol key={index} className="ep-steps">
                  {block.items.map((item) => (
                    <li key={item.title.en}>
                      <strong>{t(item.title)}</strong>
                      <p>{t(item.text)}</p>
                    </li>
                  ))}
                </ol>
              );
            })}
          </section>

          {faq.length > 0 && (
            <section className="ep-faq" id="faq">
              <h2>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>
              <div className="ep-faq-list">
                {faq.map((item) => (
                  <details key={item.q.en}>
                    <summary>{t(item.q)}</summary>
                    <p>{t(item.a)}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {specs.length > 0 && (
            <section className="ep-specs" id="information">
              <h2>{isZh ? '产品资料' : 'Information'}</h2>
              <dl>
                {specs.map(([term, value]) => (
                  <div key={term.en}>
                    <dt>{t(term)}</dt>
                    <dd>{t(value)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {also.length > 0 && (
            <section className="ep-also" id="more">
              <h2>{alsoTitle ? t(alsoTitle) : isZh ? '你可能也会喜欢' : 'You Might Also Like'}</h2>
              <div className="ep-also-grid">
                {also.map((item) => (
                  <a key={item.href} href={item.href} className="ep-also-card">
                    <span className="ep-also-icon">{item.icon}</span>
                    <strong>{item.name}</strong>
                    <span>{t(item.blurb)}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          <footer className="ep-foot">
            <a href={backHref}>
              <span aria-hidden>←</span> {t(backLabel)}
            </a>
            <span>{isZh ? '由 Eden Tan 设计与构建' : 'Designed and built by Eden Tan'}</span>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default ProductStorePage;
