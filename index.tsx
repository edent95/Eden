/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

/**
 * Which build is actually running.
 *
 * An installed PWA can sit on a stale build for days with no visible tell —
 * iOS restores the previous page instead of navigating, so nothing about the
 * screen says how old it is. Stamping the id onto <html> and the console makes
 * "is this the deploy I just shipped?" answerable in seconds, and it matches
 * the service worker's cache name for the same build.
 */
document.documentElement.dataset.build = __BUILD_ID__;
console.info(`[eden] build ${__BUILD_ID__}`);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Keep <meta name="theme-color"> on the page's real background.
 *
 * iOS paints the standalone status-bar strip with that meta tag, and the value
 * injected at build time is a single static colour — so an installed app shows
 * a dark stone bar above a light page whenever the site is in light mode. The
 * theme toggle flips `data-theme` on <html>, so re-read the background there.
 */
const syncThemeColor = () => {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  const background = getComputedStyle(document.body).backgroundColor;
  if (background && background !== 'transparent' && !background.startsWith('rgba(0, 0, 0, 0')) {
    meta.setAttribute('content', background);
  }
};

requestAnimationFrame(syncThemeColor);
new MutationObserver(syncThemeColor).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme'],
});

/**
 * Service worker registration and update strategy.
 *
 * An installed PWA can run for days without a real navigation — iOS restores
 * the previous page when it is relaunched from the home screen — and browsers
 * only check for a new `sw.js` on navigation. So we check explicitly whenever
 * the app comes back to the foreground, and reload once the new worker (which
 * calls skipWaiting + clients.claim) has taken over.
 */
const SW_UPDATE_INTERVAL_MS = 60 * 60 * 1000;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: 'none' })
      .then((registration) => {
        // A first-time install fires `controllerchange` too. Only reload when
        // an already-controlling worker was genuinely replaced.
        const hadController = Boolean(navigator.serviceWorker.controller);
        let reloading = false;

        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!hadController || reloading) return;
          reloading = true;
          window.location.reload();
        });

        const checkForUpdate = () => {
          void registration.update().catch(() => undefined);
        };

        // Foregrounding a standalone PWA is the main chance we get to notice a
        // new build, because it does not trigger a navigation.
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden) checkForUpdate();
        });
        window.addEventListener('focus', checkForUpdate);
        window.setInterval(checkForUpdate, SW_UPDATE_INTERVAL_MS);
      })
      .catch(() => undefined);
  });
}
