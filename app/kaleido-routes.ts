import React from 'react';
import { KALEIDO_PALETTE, kaleidoDataUri, kaleidoDividerSvg, kaleidoSvg, type KaleidoSpec } from './kaleido';

// One kaleidoscope emblem per page: each route gets its own curve pair, so no two
// pages share a symmetry. 'center' pages have a centred hero (the emblem sits behind
// the title like a banknote rosette); 'right' pages have a left-aligned hero.
const C = (s: Omit<KaleidoSpec, 'pos'> & Partial<Pick<KaleidoSpec, 'pos'>>): KaleidoSpec => ({ pos: 'center', ...s });

export const KALEIDO_ROUTES: Record<string, KaleidoSpec | null> = {
  '/': C({ primary: { kind: 'epi', R: 5, r: 3, d: 5 }, family: { kind: 'hypo', R: 7, r: 2, d: 1.2 }, copies: 7, size: 760, top: 60 }),
  '/project': C({ primary: { kind: 'epi', R: 8, r: 3, d: 5 }, family: { kind: 'hypo', R: 9, r: 4, d: 3 }, copies: 6, size: 700, top: 40 }),
  '/etreporthub': C({ primary: { kind: 'hypo', R: 7, r: 3, d: 4.5 }, family: { kind: 'epi', R: 6, r: 1, d: 2 }, copies: 5, size: 640, top: 60 }),
  '/etreporthub-sales': C({ primary: { kind: 'maurer', n: 6, deg: 71 }, family: { kind: 'hypo', R: 5, r: 2, d: 3 }, copies: 8, size: 720, top: 70 }),
  '/igaming': C({ primary: { kind: 'hypo', R: 10, r: 3, d: 6 }, family: { kind: 'epi', R: 7, r: 2, d: 3 }, copies: 6, size: 700, top: 60 }),
  '/igaming/full': C({ primary: { kind: 'epi', R: 11, r: 4, d: 7 }, family: { kind: 'hypo', R: 8, r: 3, d: 2 }, copies: 6, size: 700, top: 60 }),
  '/igaming/cases': C({ primary: { kind: 'maurer', n: 5, deg: 97 }, family: { kind: 'hypo', R: 6, r: 1, d: 2.5 }, copies: 7, size: 680, top: 60 }),
  '/dr-racing': C({ primary: { kind: 'hypo', R: 9, r: 4, d: 6 }, family: { kind: 'epi', R: 4, r: 1, d: 1.5 }, copies: 8, size: 640, top: 60 }),
  '/poker': C({ primary: { kind: 'epi', R: 7, r: 4, d: 6 }, family: { kind: 'hypo', R: 11, r: 3, d: 5 }, copies: 5, size: 640, top: 60 }),
  '/life-os': C({ primary: { kind: 'hypo', R: 11, r: 4, d: 7 }, family: { kind: 'epi', R: 5, r: 2, d: 2 }, copies: 6, size: 640, top: 60 }),
  '/jiju-pet': C({ primary: { kind: 'hypo', R: 8, r: 5, d: 5 }, family: { kind: 'epi', R: 3, r: 1, d: 1.2 }, copies: 9, size: 640, top: 60 }),
  '/jiju-revamp': C({ primary: { kind: 'rose', k: 4, n: 7 }, family: { kind: 'hypo', R: 7, r: 3, d: 2 }, copies: 6, size: 720, top: 40 }),
  '/brand-guide': C({ primary: { kind: 'epi', R: 9, r: 4, d: 7 }, family: { kind: 'hypo', R: 5, r: 3, d: 1.5 }, copies: 7, size: 680, top: 30 }),
  '/life': C({ primary: { kind: 'maurer', n: 4, deg: 97 }, family: { kind: 'epi', R: 8, r: 3, d: 2 }, copies: 6, size: 660, top: 20 }),
  '/project-css': C({ primary: { kind: 'hypo', R: 12, r: 5, d: 8 }, family: { kind: 'epi', R: 6, r: 5, d: 4 }, copies: 5, size: 700, top: 40 }),
  '/wiki': C({ pos: 'right', primary: { kind: 'rose', k: 5, n: 4 }, family: { kind: 'hypo', R: 8, r: 3, d: 4 }, copies: 6, size: 540, top: 70 }),
  '/notes': C({ pos: 'right', primary: { kind: 'epi', R: 6, r: 5, d: 4 }, family: { kind: 'hypo', R: 9, r: 2, d: 1.5 }, copies: 7, size: 560, top: 70 }),
  '/film-gallery': C({ pos: 'right', primary: { kind: 'maurer', n: 7, deg: 19 }, family: { kind: 'epi', R: 5, r: 1, d: 2 }, copies: 6, size: 520, top: 40 }),
  '/penneys-game': C({ pos: 'right', primary: { kind: 'hypo', R: 5, r: 3, d: 2 }, family: { kind: 'epi', R: 7, r: 5, d: 3 }, copies: 8, size: 460, top: 30 }),
  '/conways-game-of-life': C({ pos: 'right', primary: { kind: 'rose', k: 7, n: 3 }, family: { kind: 'hypo', R: 10, r: 7, d: 5 }, copies: 5, size: 480, top: 20 }),
  '/cellular-automata-lab': C({ pos: 'right', primary: { kind: 'maurer', n: 8, deg: 29 }, family: { kind: 'hypo', R: 6, r: 5, d: 3 }, copies: 6, size: 480, top: 20 }),
  '/icon-prompts': C({ pos: 'right', primary: { kind: 'epi', R: 10, r: 3, d: 7 }, family: { kind: 'hypo', R: 4, r: 1, d: 1 }, copies: 8, size: 480, top: 40 }),
  '/project/miya': C({ pos: 'right', primary: { kind: 'epi', R: 5, r: 2, d: 3 }, family: { kind: 'hypo', R: 11, r: 4, d: 3 }, copies: 6, size: 460, top: 40 }),
  // a full-screen app (dark topic board): no emblem, the backdrop and menu still apply
  '/topics': null,
};

/** Detail pages without their own entry (other wiki pages, archive, case studies) get a
 *  deterministic emblem derived from their path, so they are all different too. */
const fallbackSpec = (path: string): KaleidoSpec => {
  let h = 0;
  for (const ch of path) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const R = 5 + (h % 8);
  const r = 2 + ((h >> 3) % Math.max(1, R - 3));
  const d = 1 + ((h >> 6) % 6);
  return {
    pos: 'right',
    primary: (h >> 9) % 2 ? { kind: 'hypo', R, r: r === R ? r - 1 : r, d } : { kind: 'epi', R, r, d },
    family: { kind: 'maurer', n: 3 + ((h >> 11) % 6), deg: [29, 37, 47, 71, 97, 121][(h >> 13) % 6] },
    copies: 5 + ((h >> 15) % 4),
    size: 480,
    top: 60,
  };
};

export const kaleidoSpecFor = (path: string): KaleidoSpec | null => {
  const clean = path.replace(/\/+$/, '') || '/';
  if (clean in KALEIDO_ROUTES) return KALEIDO_ROUTES[clean];
  if (clean.startsWith('/notes/')) return null;          // art-directed Notes carry their own cover
  return fallbackSpec(clean);
};

/**
 * Applies the site skeleton for the current route: marks <html> with `kaleido-site`,
 * writes the page's emblem (a data-URI SVG) and its placement as CSS variables, and keeps
 * --nd-scroll (page scroll in px) up to date for parallax and the blended menu.
 */
export const useSiteKaleido = (path: string, theme: 'light' | 'dark') => {
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add('kaleido-site');
    const spec = kaleidoSpecFor(path);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (spec) {
      root.style.setProperty('--kaleido-img', kaleidoDataUri(kaleidoSvg(spec, KALEIDO_PALETTE[theme], !reduce)));
      root.style.setProperty('--kaleido-size', `${spec.size}px`);
      root.style.setProperty('--kaleido-top', `${spec.top}px`);
      root.style.setProperty('--kaleido-divider', kaleidoDataUri(kaleidoDividerSvg(spec, KALEIDO_PALETTE[theme])));
      root.dataset.kaleidoPos = spec.pos;
    } else {
      root.style.setProperty('--kaleido-img', 'none');
      root.style.setProperty('--kaleido-divider', 'none');
      delete root.dataset.kaleidoPos;
    }
  }, [path, theme]);

  React.useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const root = document.documentElement;
    let frame = 0;
    const paint = () => { frame = 0; root.style.setProperty('--nd-scroll', String(Math.round(window.scrollY))); };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
};
