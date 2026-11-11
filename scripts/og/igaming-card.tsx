/**
 * Dev-only page that draws one 1200×630 share card for an /igaming route, so
 * scripts/og/render-igaming.mjs can screenshot it into public/og/igaming/<key>.jpg.
 * Not part of the site build (only index.html is a Vite entry); open it on the dev
 * server as /scripts/og/igaming-card.html?route=/igaming/provider-promotions.
 *
 * Guides and cases reuse the page's own engraved banner plate (IGamingBannerStage)
 * over the title; the hub pages reuse the lit hero stage behind a centred title,
 * the same as their real hero. Title = the route's English SEO title without "| Eden Tan".
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import { ROUTE_SEO } from '../../seo-routes';
import { IGAMING_GUIDES } from '../../components/igaming-guides-content';
import { IGAMING_CASES } from '../../components/igaming-cases-content';
import { IGamingBannerStage, IGamingHeroStage } from '../../components/css-art/igaming-hero-stage';
import { IGAMING_BANNER_TONE, type IGamingBannerVariant } from '../../components/css-art/index';

type Card =
  | { layout: 'banner'; kicker: string; title: string; variant: IGamingBannerVariant }
  | { layout: 'hero'; kicker: string; title: string };

const HUB_KICKERS: Record<string, string> = {
  '/igaming': 'iGaming, explained plainly',
  '/igaming/full': 'iGaming, explained plainly',
  '/igaming/cases': 'iGaming Field Notes',
  '/igaming/resume': 'iGaming Résumé',
};

const cardFor = (path: string): Card | null => {
  const route = ROUTE_SEO.find((entry) => entry.path === path);
  if (!route) return null;
  const title = route.title.en.replace(/\s*\|\s*Eden Tan\s*$/, '');
  const guide = IGAMING_GUIDES.find((entry) => entry.path === path);
  if (guide) return { layout: 'banner', kicker: 'iGaming Guide', title, variant: guide.banner };
  const study = IGAMING_CASES.find((entry) => `/igaming/cases/${entry.slug}` === path);
  if (study) return { layout: 'banner', kicker: 'iGaming Case Study', title: title.replace(/^Case:\s*/, ''), variant: study.banner };
  if (HUB_KICKERS[path]) return { layout: 'hero', kicker: HUB_KICKERS[path], title };
  return null;
};

const CSS = `
html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
.og-card {
  position: relative; isolation: isolate; box-sizing: border-box;
  width: 1200px; height: 630px; min-height: 0; overflow: hidden;
  font-family: Inter, var(--font-sans);
  display: flex; flex-direction: column;
}
.og-card::after {
  content: ""; position: absolute; inset: 14px; pointer-events: none; z-index: 5;
  box-shadow: inset 0 0 0 1px var(--ig-line-3), inset 0 0 0 5px var(--ig-card), inset 0 0 0 6px color-mix(in srgb, var(--ig-line) 18%, transparent);
}
.og-card .og-kicker {
  margin: 0; font-size: 17px; font-weight: 650; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ig-line);
}
.og-card h1 {
  margin: 0; font-weight: 780; letter-spacing: -0.035em; line-height: 1.02; text-wrap: balance; color: var(--theme-text-primary);
}
.og-foot {
  display: flex; align-items: center; gap: 14px; font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 16px; letter-spacing: 0.04em; color: color-mix(in srgb, var(--theme-text-primary) 70%, transparent);
}
.og-foot i { flex: 0 0 56px; height: 2px; background: var(--ig-foil); }

/* guides + cases: banner plate on top, title underneath */
.og-card.is-banner .og-plate { flex: 0 0 auto; margin: 30px 30px 0; }
.og-card.is-banner .og-plate .hs.is-banner { width: 100%; }
.og-card.is-banner .og-text {
  flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 0 64px 34px;
}
.og-card.is-banner h1 { font-size: 54px; }
.og-card.is-banner .og-kicker { color: var(--en-ink, var(--ig-line)); }
.og-card.is-banner .og-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; }

/* hubs: lit hero stage behind a centred title */
.og-card.is-hero { align-items: center; justify-content: center; text-align: center; gap: 22px; padding: 0 120px; }
.og-card.is-hero h1 { font-size: 80px; max-width: 13em; }
.og-card.is-hero .og-foot { margin-top: 10px; }
`;

const Foot: React.FC = () => (
  <p className="og-foot"><i aria-hidden />eden-tan.com · Eden Tan</p>
);

const OgCard: React.FC<{ card: Card }> = ({ card }) => {
  React.useEffect(() => {
    // render-igaming.mjs waits for this flag: fonts loaded, two frames painted.
    void document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
      document.documentElement.dataset.ogReady = '1';
    })));
  }, []);
  if (card.layout === 'hero') {
    return (
      <div className="igaming-page og-card is-hero">
        <IGamingHeroStage />
        <p className="og-kicker">{card.kicker}</p>
        <h1>{card.title}</h1>
        <Foot />
      </div>
    );
  }
  return (
    <div className={`igaming-page og-card is-banner engraved-tone-${IGAMING_BANNER_TONE[card.variant]}`}>
      <div className="og-plate">
        <IGamingBannerStage variant={card.variant} label={card.title} />
      </div>
      <div className="og-text">
        <p className="og-kicker">{card.kicker}</p>
        <div className="og-row">
          <h1>{card.title}</h1>
        </div>
        <Foot />
      </div>
    </div>
  );
};

const path = new URLSearchParams(window.location.search).get('route') ?? '/igaming';
const card = cardFor(path);
const style = document.createElement('style');
style.textContent = CSS;
document.head.append(style);
const root = createRoot(document.getElementById('og-root')!);
root.render(card ? <OgCard card={card} /> : <p>No share card for {path}</p>);
