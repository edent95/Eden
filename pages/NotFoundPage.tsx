import React from 'react';
import { joinBasePath, type Language } from '../app/shared';

/**
 * Unknown paths used to fall through to the homepage, which made every typo a soft 404
 * (200 + homepage HTML + homepage canonical). GitHub Pages already serves a real 404 for
 * clean unregistered paths; this view covers the `/?p=` SPA shim and in-app navigation.
 */
const NotFoundPage: React.FC<{ homeHref: string; baseUrl: string; language: Language; pathWithoutBase: string }> = ({
  homeHref,
  baseUrl,
  language,
  pathWithoutBase,
}) => (
  <div className="page-shell not-found-page">
    <main className="not-found-island">
      <p className="not-found-kicker">404</p>
      <h1>{language === 'zh' ? '这个页面不存在' : 'This page does not exist'}</h1>
      <p className="not-found-path">{pathWithoutBase}</p>
      <p>
        {language === 'zh'
          ? '路径可能拼错了，或者这一页已经移走。下面几个入口可以继续。'
          : 'The path may be misspelled, or the page has moved. These entry points still work.'}
      </p>
      <ul className="not-found-links">
        <li><a href={homeHref}>{language === 'zh' ? '主页' : 'Home'}</a></li>
        <li><a href={joinBasePath(baseUrl, 'project')}>{language === 'zh' ? '作品' : 'Projects'}</a></li>
        <li><a href={joinBasePath(baseUrl, 'notes')}>Notes</a></li>
        <li><a href={joinBasePath(baseUrl, 'wiki')}>Wiki</a></li>
      </ul>
    </main>
  </div>
);

export default NotFoundPage;
