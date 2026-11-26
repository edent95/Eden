import React from 'react';
import type { Language } from '../app/shared';

/**
 * Shown for the instant between the app booting on a moved path and `index.tsx` sending the
 * browser to the new URL (and as the visible fallback if that navigation is blocked).
 * The moved routes and their targets are the `movedTo` entries in `seo-routes.ts`; the
 * prerendered `<route>/index.html` carries the same one-line link for no-JS visitors.
 */
const MovedPage: React.FC<{ language: Language; targetUrl: string }> = ({ language, targetUrl }) => (
  <div className="page-shell not-found-page">
    <main className="not-found-island">
      <p className="not-found-kicker">Asia iGaming</p>
      <h1>{language === 'zh' ? '这一页搬到 Asia iGaming 了' : 'This page moved to Asia iGaming'}</h1>
      <p>
        {language === 'zh' ? '新网址：' : 'New address: '}
        <a href={targetUrl}>{targetUrl}</a>
      </p>
    </main>
  </div>
);

export default MovedPage;
