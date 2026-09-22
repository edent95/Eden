/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { applyPageSeo } from './seo';
import {
  localizedCanonicalRoutePath,
  routeSeoForPath,
  stripLocaleFromRoutePath,
} from './seo-routes';
import ProductStorePage from './components/ProductStorePage';
import type { CssArtComponent } from './components/css-art/index';
import { 
  Linkedin, 
  UserRound
} from 'lucide-react';

import { siteEssayNotes, wikiEntries } from './generated/content';
import { HeaderControls, joinBasePath, resolveAssetPath, type Language, type Theme, type ThemePreference } from './app/shared';
import NotFoundPage from './pages/NotFoundPage';
import IconPromptsPage from './pages/IconPromptsPage';
import {
  DrRacingFullPage,
  ETReportHubFullPage,
  ETReportHubSalesPage,
  JijuPetFullPage,
  LifeOsFullPage,
  PokerFullPage,
} from './pages/ProductPages';
import { GuestTopicsPage, NotesPage, SiteEssayNotePage, WikiPage } from './pages/ContentPages';
import { CellularAutomataLabFullPage, ConwayGameOfLifeFullPage } from './pages/ConwayPages';
import { FilmGalleryFullPage } from './pages/FilmGalleryPage';
import { BrandGuideFullPage } from './pages/BrandGuidePage';
import { ArchivedWorkPage, ProjectCssGalleryPage } from './pages/ArchiveAndGalleryPages';
import { archivedWorks } from './app/archive';
import { JijuRevampFullPage } from './pages/JijuRevampPage';
import { LifeFullPage } from './pages/LifePage';
import { ProjectHomePage } from './pages/ProjectHomePage';
import { DelayedAboutProfileVideo, HomeCollage } from './app/home-collage';
import { IGAMING_CASES as igamingCases } from './components/igaming-cases-content';


const PenneysGamePage = React.lazy(() => import('./components/PenneysGamePage'));
const MiyaPrivacyPage = React.lazy(() => import('./components/MiyaPrivacyPage'));
const IGamingPage = React.lazy(() => import('./components/IGamingPage'));
const IGamingSummaryPage = React.lazy(() => import('./components/IGamingSummaryPage'));
const IGamingCasesPage = React.lazy(() => import('./components/IGamingCasesPage'));
const HomePenneyGame = React.lazy(() => import('./components/HomePenneyGame'));
const HomeLiveChat = React.lazy(() => import('./components/HomeLiveChat'));

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const normalizePath = (value: string) => {
  if (!value) return '/';
  const trimmed = value.replace(/\/+$/, '');
  return trimmed || '/';
};

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

type ActiveBuildSkill = {
  label: string;
  kind: 'hard' | 'soft';
};

// Split an essay paragraph on inline tokens and render each one:
//   [[n]]                     → a superscript citation that jumps to reference n
//                               (and carries an id so the reference can link back).
//   [[note:slug|display]]     → an internal link to another note (/notes/<slug>).
// Plain text segments are returned unchanged.
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
  const lifeHref = joinBasePath(baseUrl, 'life');
  const brandGuideHref = joinBasePath(baseUrl, 'brand-guide');
  const topicsHref = joinBasePath(baseUrl, 'topics');
  const conwayHref = joinBasePath(baseUrl, 'conways-game-of-life');
  const penneyHref = joinBasePath(baseUrl, 'penneys-game');
  const projectHomeHref = joinBasePath(baseUrl, 'project');
  const miyaHref = joinBasePath(baseUrl, 'project/miya');
  const lifeOsHref = joinBasePath(baseUrl, 'life-os');
  const igamingHref = joinBasePath(baseUrl, 'igaming');
  const igamingFullHref = joinBasePath(baseUrl, 'igaming/full');
  const igamingCasesHref = joinBasePath(baseUrl, 'igaming/cases');
  const cellularAutomataLabHref = joinBasePath(baseUrl, 'cellular-automata-lab');
  const homeSystemFiles: Array<{
    title: string;
    copy: string;
    href: string;
    cta: string;
    visual?: 'jiju' | 'poker' | 'etreporthub' | 'crm';
  }> = isZh
    ? [
        {
          title: 'Jiju Knowledge System',
          copy: '把地点、场景和真实出门经验整理成可查询的本地发现系统。',
          href: fullPageHref,
          cta: '看 Jiju 复盘',
          visual: 'jiju',
        },
        {
          title: 'Friday Poker Club',
          copy: '给熟人局使用的浏览器牌桌，处理房间、邀请、买入和游戏流程。',
          href: pokerHref,
          cta: '看 Poker Club',
          visual: 'poker',
        },
        {
          title: 'ETReportHub',
          copy: '把每日 Excel、会员、渠道和趋势变成可复盘的运营数据层。',
          href: etReportHubHref,
          cta: '看 ETReportHub',
          visual: 'etreporthub',
        },
      ]
    : [
        {
          title: 'Jiju Knowledge System',
          copy: 'A local discovery system that turns places, scenes, and real outings into usable knowledge.',
          href: fullPageHref,
          cta: 'Read Jiju review',
          visual: 'jiju',
        },
        {
          title: 'Friday Poker Club',
          copy: 'A browser poker table for private games, with rooms, invites, buy-ins, and game flow.',
          href: pokerHref,
          cta: 'Open Poker Club',
          visual: 'poker',
        },
        {
          title: 'ETReportHub',
          copy: 'A daily-report data layer for Excel, members, channels, trends, and reviewable operations.',
          href: etReportHubHref,
          cta: 'Open ETReportHub',
          visual: 'etreporthub',
        },
      ];
  const homeInterestLinks: Array<{ title: string; href: string; visual?: 'bagua-mirror' | 'gramophone' | 'conway-magic-circle' | 'archive-evolution' }> = isZh
    ? [
        { title: 'Film Gallery', href: filmGalleryHref, visual: 'gramophone' },
        { title: 'Topic Board', href: topicsHref, visual: 'archive-evolution' },
        { title: 'Pattern Archive', href: 'https://edent95.github.io/8g/', visual: 'bagua-mirror' },
        { title: "Conway's Game of Life", href: conwayHref, visual: 'conway-magic-circle' },
      ]
    : [
        { title: 'Film Gallery', href: filmGalleryHref, visual: 'gramophone' },
        { title: 'Topic Board', href: topicsHref, visual: 'archive-evolution' },
        { title: 'Pattern Archive', href: 'https://edent95.github.io/8g/', visual: 'bagua-mirror' },
        { title: "Conway's Game of Life", href: conwayHref, visual: 'conway-magic-circle' },
      ];
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
  const isMiyaPrivacyPage = pathWithoutBase === '/project/miya';
  const isIGamingPage = pathWithoutBase === '/igaming';
  const isIGamingFullPage = pathWithoutBase === '/igaming/full';
  const isIGamingCasesPage = pathWithoutBase === '/igaming/cases';
  const igamingCaseSlug = pathWithoutBase.startsWith('/igaming/cases/')
    ? pathWithoutBase.replace('/igaming/cases/', '')
    : '';
  const activeIGamingCase = igamingCases.find((item) => item.slug === igamingCaseSlug);
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
      <React.Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
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
      </React.Suspense>
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
        miyaHref={miyaHref}
        lifeOsHref={lifeOsHref}
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
  }

  if (isIGamingCasesPage || activeIGamingCase) {
    return (
      <React.Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
        <IGamingCasesPage
          language={language}
          caseSlug={activeIGamingCase?.slug}
          igamingHref={igamingHref}
          casesHref={igamingCasesHref}
          fullHref={igamingFullHref}
          etReportHubHref={etReportHubHref}
          controls={
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          }
        />
      </React.Suspense>
    );
  }

  if (isIGamingPage || isIGamingFullPage) {
    const igamingControls = (
      <HeaderControls
        language={language}
        setLanguage={setLanguage}
        themePreference={themePreference}
        theme={theme}
        setThemePreference={setThemePreference}
      />
    );
    return (
      <React.Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
        {isIGamingFullPage ? (
          <IGamingPage language={language} backHref={igamingHref} controls={igamingControls} />
        ) : (
          <IGamingSummaryPage
            language={language}
            homeHref={homeHref}
            fullHref={igamingFullHref}
            casesHref={igamingCasesHref}
            controls={igamingControls}
          />
        )}
      </React.Suspense>
    );
  }

  if (isMiyaPrivacyPage) {
    return (
      <React.Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
        <MiyaPrivacyPage
          language={language}
          projectsHref={projectHomeHref}
          controls={
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          }
        />
      </React.Suspense>
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
    <div className="page-shell eden-home">
      <nav className="eden-home-nav" aria-label="Primary navigation">
        <div className="eden-home-island eden-nav-inner">
          <a href={homeHref} className="eden-wordmark">Eden Tan</a>
          <div className="eden-nav-actions">
            <HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} compactThemeOnSelection compactLanguageOnSelection />
          </div>
        </div>
      </nav>

      <main>
        <motion.section className="eden-hero eden-home-island" initial="initial" animate="animate" variants={staggerContainer}>
          <motion.p variants={fadeIn} className="eden-eyebrow">{isZh ? '啊不然请我吃饭也可以' : 'EDEN · HUMAN SYSTEMS & PRODUCT'}</motion.p>
          <motion.h1 variants={fadeIn}>
            {isZh ? (
              <span className="eden-hero-beat">
                {Array.from('屌撚㞗閪𨶙').map((char, index) => (
                  <span key={char} style={{ '--beat': index } as React.CSSProperties}>{char}</span>
                ))}
              </span>
            ) : <><span>Build systems</span><br /><span>from chaos.</span></>}
          </motion.h1>
          <motion.p variants={fadeIn} className="eden-hero-copy">
            {isZh ? '我冇錢，可唔可以請我做嘢？' : 'I turn complex human behavior and messy realities into useful products, data, and AI systems.'}
          </motion.p>
          <motion.div variants={fadeIn} className="eden-hero-actions">
            <a className="eden-button" href={projectHomeHref}>{isZh ? '看看下，可能我们可以一起赚更多的钱' : 'Explore my work'}</a>
          </motion.div>
        </motion.section>

        <section className="eden-collage-section" id="work">
          <HomeCollage language={language} baseUrl={baseUrl} />
        </section>

        <React.Suspense fallback={<section className="min-h-64" aria-busy="true" />}>
          <HomePenneyGame isZh={isZh} igamingHref={igamingHref} />
        </React.Suspense>

        <section className="eden-about eden-home-island" id="about">
          <div className="eden-about-photo">
            <DelayedAboutProfileVideo
              baseUrl={baseUrl}
              label={isZh ? 'Eden 的漫画 Joker 变身短片' : "Eden's comic Joker transformation video"}
            />
          </div>
          <div className="eden-about-copy">
            <p className="eden-section-label">01 · About Eden</p>
            <h2>{isZh ? <>蛋散一条</> : <>Hey, I’m Eden.</>}</h2>
            <div className="eden-about-body eden-about-body-compact">
              {isZh ? (
                <>
                  <p>别人收 Pokémon card，我收皮。</p>
                  <p>AI、营销、心理学、哲学、Ang Kong system，我都略懂一二。你问我懂来做什么？懂了就不再被别人做9自己咯。</p>
                  <p>我觉得很多事情不是复杂，是没人讲清楚。我就是那个讲清楚的人：写软件、搞 AI、写文章，还做了 Jiju。做了那么多，还是冇錢。</p>
                  <p>技术不是终点，是我吃饭的家伙。问题是饭还没吃到。</p>
                  <p>你的公司乱到自己都看不懂？拿来给我，我帮你画出来，顺便帮你看清楚你自己。</p>
                  <p className="eden-about-now"><strong>看得清系统，就改得了系统。看得清人，就搞人。</strong></p>
                </>
              ) : (
                <>
                  <p>Most people collect knowledge. I collect patterns.</p>
                  <p>I explore AI, product growth, marketing, psychology, philosophy, and symbolic systems to find the structures they share.</p>
                  <p>I believe complexity is often a translation problem. My work turns scattered ideas into clear systems—through software, AI agents, essays, and products like Jiju.</p>
                  <p>Technology is not the destination. It is a language for expressing better models of reality.</p>
                  <p>I build frameworks that help people see themselves, their businesses, and the world more clearly.</p>
                  <p className="eden-about-now"><strong>Because once you can see the system, you can change it.</strong></p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="eden-footer"><div className="eden-home-island"><div><strong>EDEN</strong><p>Building systems for people, products, and uncertain futures.</p></div><div className="eden-footer-links"><a href="mailto:hello@edentan.site">Email</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/edent95" target="_blank" rel="noreferrer">GitHub</a><a href={notesHref}>Notes</a></div></div></footer>

      <React.Suspense fallback={null}>
        <HomeLiveChat isZh={isZh} />
      </React.Suspense>
    </div>
  );
};

export default App;
