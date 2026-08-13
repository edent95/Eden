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

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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
