/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * App shell and router. This file owns only the language/theme state and the
 * per-route equality branches on `pathWithoutBase` (verify:routes greps for those literals);
 * every route component lives in `pages/` and loads as its own lazy chunk.
 * Shared navigation and base-path helpers live in `app/shared.tsx`.
 */

import React from 'react';
import { HeaderControls, joinBasePath, normalizePath } from './app/shared';
import type { Language, Theme, ThemePreference } from './app/shared';
import { siteEssayNotes, wikiEntries } from './generated/content';
import { archivedWorks } from './pages/archived-works';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { applyPageSeo } from './seo';
import { localizedCanonicalRoutePath, routeSeoForPath, stripLocaleFromRoutePath } from './seo-routes';

/** Lazily load one named page export; pages sharing a module share one chunk. */
const lazyPage = <K extends string, M extends Record<K, React.ComponentType<any>>>(
  load: () => Promise<M>,
  name: K,
) => React.lazy(() => load().then((module) => ({ default: module[name] })));

const PenneysGamePage = React.lazy(() => import('./components/PenneysGamePage'));
const ArchivedWorkPage = lazyPage(() => import('./pages/ArchivedWorkPage'), 'ArchivedWorkPage');
const BrandGuideFullPage = lazyPage(() => import('./pages/BrandGuidePage'), 'BrandGuideFullPage');
const CellularAutomataLabFullPage = lazyPage(() => import('./pages/CellularAutomataLabPage'), 'CellularAutomataLabFullPage');
const ConwayGameOfLifeFullPage = lazyPage(() => import('./pages/ConwayGameOfLifePage'), 'ConwayGameOfLifeFullPage');
const DrRacingFullPage = lazyPage(() => import('./pages/DrRacingPage'), 'DrRacingFullPage');
const ETReportHubFullPage = lazyPage(() => import('./pages/ETReportHubPages'), 'ETReportHubFullPage');
const ETReportHubSalesPage = lazyPage(() => import('./pages/ETReportHubPages'), 'ETReportHubSalesPage');
const FilmGalleryFullPage = lazyPage(() => import('./pages/FilmGalleryPage'), 'FilmGalleryFullPage');
const GuestTopicsPage = lazyPage(() => import('./pages/GuestTopicsPage'), 'GuestTopicsPage');
const IconPromptsPage = lazyPage(() => import('./pages/IconPromptsPage'), 'IconPromptsPage');
const JijuPetFullPage = lazyPage(() => import('./pages/JijuPages'), 'JijuPetFullPage');
const JijuRevampFullPage = lazyPage(() => import('./pages/JijuPages'), 'JijuRevampFullPage');
const LifeFullPage = lazyPage(() => import('./pages/LifePage'), 'LifeFullPage');
const LifeOsFullPage = lazyPage(() => import('./pages/LifeOsPage'), 'LifeOsFullPage');
const NotesPage = lazyPage(() => import('./pages/NotesPages'), 'NotesPage');
const SiteEssayNotePage = lazyPage(() => import('./pages/NotesPages'), 'SiteEssayNotePage');
const PokerFullPage = lazyPage(() => import('./pages/PokerPage'), 'PokerFullPage');
const ProjectCssGalleryPage = lazyPage(() => import('./pages/ProjectCssGalleryPage'), 'ProjectCssGalleryPage');
const ProjectHomePage = lazyPage(() => import('./pages/ProjectHomePage'), 'ProjectHomePage');
const WikiPage = lazyPage(() => import('./pages/WikiPage'), 'WikiPage');
const LANGUAGE_STORAGE_KEY = 'eden-portfolio-language';

const THEME_STORAGE_KEY = 'eden-portfolio-theme';

const AUTO_THEME_DAY_START_HOUR = 7;

const AUTO_THEME_NIGHT_START_HOUR = 19;

const readStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (raw === 'en' || raw === 'zh') return raw;
  } catch {
    // ignore (private mode, storage disabled, etc.)
  }
  return null;
};

const readUrlLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;
  return /(?:^|\/)zh(?:\/|$)/.test(window.location.pathname) ? 'zh' : null;
};

const resolveThemeFromLocalTime = (date = new Date()): Theme => {
  const hour = date.getHours();
  return hour >= AUTO_THEME_DAY_START_HOUR && hour < AUTO_THEME_NIGHT_START_HOUR ? 'light' : 'dark';
};

const readStoredThemePreference = (): ThemePreference => {
  if (typeof window === 'undefined') return 'auto';
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === 'auto' || raw === 'light' || raw === 'dark') return raw;
  } catch {
    // ignore (private mode, storage disabled, etc.)
  }
  return 'auto';
};

const App: React.FC = () => {
  const [language, setLanguageState] = React.useState<Language>(() => readUrlLanguage() ?? readStoredLanguage() ?? 'en');
  const [themePreference, setThemePreference] = React.useState<ThemePreference>(() => readStoredThemePreference());
  const [autoTheme, setAutoTheme] = React.useState<Theme>(() => resolveThemeFromLocalTime());

  React.useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  React.useEffect(() => {
    if (themePreference !== 'auto') return;
    const updateAutoTheme = () => setAutoTheme(resolveThemeFromLocalTime());
    updateAutoTheme();
    const intervalId = window.setInterval(updateAutoTheme, 60_000);
    const handleVisibilityChange = () => {
      if (!document.hidden) updateAutoTheme();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [themePreference]);

  const theme = themePreference === 'auto' ? autoTheme : themePreference;

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    } catch {
      // ignore
    }
  }, [theme, themePreference]);

  const isZh = language === 'zh';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const setLanguage = React.useCallback<React.Dispatch<React.SetStateAction<Language>>>((nextValue) => {
    const nextLanguage = typeof nextValue === 'function' ? nextValue(language) : nextValue;
    setLanguageState(nextLanguage);
    const basePath = normalizePath(baseUrl);
    const current = normalizePath(window.location.pathname);
    const relative = basePath !== '/' && current.startsWith(basePath)
      ? normalizePath(current.slice(basePath.length))
      : current;
    const logical = stripLocaleFromRoutePath(relative).path;
    const localized = localizedCanonicalRoutePath(logical, nextLanguage);
    const destination = basePath === '/' ? localized : `${basePath}${localized}`;
    window.location.assign(`${destination}${window.location.search}${window.location.hash}`);
  }, [baseUrl, language]);
  const homeHref = joinBasePath(baseUrl, '');
  const fullPageHref = joinBasePath(baseUrl, 'jiju-pet');
  const projectsHref = homeHref;
  const etReportHubHref = joinBasePath(baseUrl, 'etreporthub');
  const etReportHubSalesHref = joinBasePath(baseUrl, 'etreporthub-sales');
  const drRacingHref = joinBasePath(baseUrl, 'dr-racing');
  const pokerHref = joinBasePath(baseUrl, 'poker');
  const filmGalleryHref = joinBasePath(baseUrl, 'film-gallery');
  const notesHref = joinBasePath(baseUrl, 'notes');
  const conwayHref = joinBasePath(baseUrl, 'conways-game-of-life');
  const penneyHref = joinBasePath(baseUrl, 'penneys-game');
  const projectHomeHref = joinBasePath(baseUrl, 'project');
  const cellularAutomataLabHref = joinBasePath(baseUrl, 'cellular-automata-lab');
  const currentPath = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/';
  const normalizedBase = normalizePath(baseUrl);
  const pathWithOptionalLocale =
    normalizedBase !== '/' && currentPath.startsWith(normalizedBase)
      ? normalizePath(currentPath.slice(normalizedBase.length))
      : currentPath;
  const pathWithoutBase = stripLocaleFromRoutePath(pathWithOptionalLocale).path;

  React.useEffect(() => {
    if (pathWithoutBase !== '/analog-tech') return;
    const nextPath = joinBasePath(baseUrl, 'film-gallery');
    window.history.replaceState(
      window.history.state,
      '',
      `${nextPath}${window.location.search}${window.location.hash}`,
    );
  }, [baseUrl, pathWithoutBase]);

  const isJijuPetFullPage = pathWithoutBase === '/jiju-pet';
  const isJijuRevampFullPage = pathWithoutBase === '/jiju-revamp';
  const isProjectCssGalleryPage = pathWithoutBase === '/project-css';
  const isETReportHubFullPage = pathWithoutBase === '/etreporthub';
  const isETReportHubSalesPage = pathWithoutBase === '/etreporthub-sales';
  const isDrRacingFullPage = pathWithoutBase === '/dr-racing';
  const isPokerFullPage = pathWithoutBase === '/poker';
  const wikiSlug = pathWithoutBase.startsWith('/wiki/')
    ? pathWithoutBase.replace('/wiki/', '')
    : '';
  const activeWikiEntry = wikiEntries.find((item) => item.slug === wikiSlug);
  const isWikiPage = pathWithoutBase === '/wiki' || Boolean(activeWikiEntry);
  const isFilmGalleryFullPage = pathWithoutBase === '/film-gallery' || pathWithoutBase === '/analog-tech';
  const siteEssaySlug = pathWithoutBase.startsWith('/notes/') ? pathWithoutBase.replace('/notes/', '') : '';
  const activeSiteEssay = siteEssayNotes.find((note) => note.slug === siteEssaySlug);
  const isNotesPage = pathWithoutBase === '/notes';
  const isLifeOsFullPage = pathWithoutBase === '/life-os';
  const isLifeFullPage = pathWithoutBase === '/life';
  const isBrandGuideFullPage = pathWithoutBase === '/brand-guide';
  const isTopicsFullPage = pathWithoutBase === '/topics';
  const isConwayGameOfLifeFullPage = pathWithoutBase === '/conways-game-of-life';
  const isPenneysGamePage = pathWithoutBase === '/penneys-game';
  const isCellularAutomataLabFullPage = pathWithoutBase === '/cellular-automata-lab';
  const isProjectHomePage = pathWithoutBase === '/project';
  const isIconPromptsPage = pathWithoutBase === '/icon-prompts';
  const archivedWorkSlug = pathWithoutBase.startsWith('/archive/')
    ? pathWithoutBase.replace('/archive/', '')
    : '';
  const activeArchivedWork = archivedWorks.find((item) => item.slug === archivedWorkSlug);
  const seoPath = pathWithoutBase === '/analog-tech' ? '/film-gallery' : pathWithoutBase;
  const isHomePath = pathWithoutBase === '' || pathWithoutBase === '/';

  React.useEffect(() => {
    applyPageSeo(seoPath, language, activeArchivedWork);
  }, [seoPath, language, activeArchivedWork]);

  // Each route renders from its own lazy chunk (pages/*). Navigation between routes is a full
  // page load, so this boundary only shows while the first chunk for the current URL arrives.
  const renderRoute = (): React.ReactNode => {
    if (isJijuPetFullPage) {
      return (
        <JijuPetFullPage
          homeHref={homeHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isJijuRevampFullPage) {
      return (
        <JijuRevampFullPage
          homeHref={homeHref}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }


    if (isProjectCssGalleryPage) {
      return (
        <ProjectCssGalleryPage
          homeHref={homeHref}
          projectsHref={projectsHref}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isETReportHubFullPage) {
      return (
        <ETReportHubFullPage
          homeHref={homeHref}
          projectsHref={projectsHref}
          salesHref={etReportHubSalesHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isETReportHubSalesPage) {
      return (
        <ETReportHubSalesPage
          homeHref={homeHref}
          projectsHref={projectsHref}
          productHref={etReportHubHref}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isDrRacingFullPage) {
      return (
        <DrRacingFullPage
          homeHref={homeHref}
          projectsHref={projectsHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isPokerFullPage) {
      return (
        <PokerFullPage
          homeHref={homeHref}
          projectsHref={projectsHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isWikiPage) {
      return (
        <WikiPage
          entry={activeWikiEntry}
          homeHref={homeHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }


    if (isFilmGalleryFullPage) {
      return (
        <FilmGalleryFullPage
          homeHref={homeHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (activeSiteEssay) {
      return (
        <SiteEssayNotePage
          note={activeSiteEssay}
          homeHref={homeHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isNotesPage) {
      return (
        <NotesPage
          homeHref={homeHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isLifeFullPage) {
      return (
        <LifeFullPage
          homeHref={homeHref}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isLifeOsFullPage) {
      return (
        <LifeOsFullPage
          homeHref={homeHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isBrandGuideFullPage) {
      return (
        <BrandGuideFullPage
          homeHref={homeHref}
          baseUrl={baseUrl}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isTopicsFullPage) {
      return (
        <GuestTopicsPage
          homeHref={homeHref}
          projectsHref={projectsHref}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isPenneysGamePage) {
      return (
        <PenneysGamePage
          isZh={isZh}
          homeHref={homeHref}
          conwayHref={conwayHref}
          controls={
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection
              compactLanguageOnSelection
            />
          }
        />
      );
    }

    if (isConwayGameOfLifeFullPage) {
      return (
        <ConwayGameOfLifeFullPage
          homeHref={homeHref}
          labHref={cellularAutomataLabHref}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isCellularAutomataLabFullPage) {
      return (
        <CellularAutomataLabFullPage
          homeHref={homeHref}
          conwayHref={conwayHref}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isProjectHomePage) {
      return (
        <ProjectHomePage
          homeHref={homeHref}
          jijuHref={fullPageHref}
          pokerHref={pokerHref}
          etReportHubHref={etReportHubHref}
          drRacingHref={drRacingHref}
          filmGalleryHref={filmGalleryHref}
          conwayHref={conwayHref}
          penneyHref={penneyHref}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (isIconPromptsPage) {
      return <IconPromptsPage homeHref={homeHref} />;
    }

    if (activeArchivedWork) {
      return (
        <ArchivedWorkPage
          homeHref={homeHref}
          baseUrl={baseUrl}
          work={activeArchivedWork}
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      );
    }

    if (!isHomePath && !routeSeoForPath(pathWithoutBase)) {
      return <NotFoundPage homeHref={homeHref} baseUrl={baseUrl} language={language} pathWithoutBase={pathWithoutBase} />;
    }

    return (
      <HomePage
        homeHref={homeHref}
        projectHomeHref={projectHomeHref}
        notesHref={notesHref}
        baseUrl={baseUrl}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  };

  return (
    <React.Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
      {renderRoute()}
    </React.Suspense>
  );
};

export default App;
