/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import {
  FilmGalleryCssIcon,
  PenneyCoinCssIcon,
  ProjectsCrmCssIcon,
  ProjectsDrRacingCssIcon,
  ProjectsEtReportCssIcon,
  ProjectsJijuCssIcon,
  ProjectsPokerCssIcon,
} from '../components/css-art/index';

type ProjectAppEntry = {
  id: string;
  name: string;
  href: string;
  caption: Record<Language, string>;
  Icon: React.FC<{ label: string }>;
};

export const ProjectHomePage: React.FC<{
  homeHref: string;
  jijuHref: string;
  pokerHref: string;
  etReportHubHref: string;
  drRacingHref: string;
  filmGalleryHref: string;
  conwayHref: string;
  penneyHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({
  homeHref,
  jijuHref,
  pokerHref,
  etReportHubHref,
  drRacingHref,
  filmGalleryHref,
  conwayHref,
  penneyHref,
  language,
  setLanguage,
  themePreference,
  theme,
  setThemePreference,
}) => {
  const isZh = language === 'zh';
  const projectApps: ProjectAppEntry[] = [
    {
      id: 'jiju',
      name: 'Jiju',
      href: jijuHref,
      caption: { en: 'Local discovery', zh: '本地发现' },
      Icon: ProjectsJijuCssIcon,
    },
    {
      id: 'poker',
      name: 'Friday Poker Club',
      href: pokerHref,
      caption: { en: 'Private table', zh: '私人牌局' },
      Icon: ProjectsPokerCssIcon,
    },
    {
      id: 'etreporthub',
      name: 'ETReportHub',
      href: etReportHubHref,
      caption: { en: 'Daily data layer', zh: '每日数据层' },
      Icon: ProjectsEtReportCssIcon,
    },
    {
      id: 'dr-racing',
      name: 'Dr Racing',
      href: drRacingHref,
      caption: { en: 'Loan pipeline', zh: '贷款流水线' },
      Icon: ProjectsDrRacingCssIcon,
    },
    {
      id: 'film-gallery',
      name: 'Film Gallery',
      href: filmGalleryHref,
      caption: { en: 'Film archive', zh: '胶片档案' },
      Icon: FilmGalleryCssIcon,
    },
    {
      id: 'conways-game-of-life',
      name: "Conway's Game of Life",
      href: conwayHref,
      caption: { en: 'Cellular automata', zh: '细胞自动机' },
      Icon: ProjectsCrmCssIcon,
    },
    {
      id: 'penneys-game',
      name: "Penney's Game",
      href: penneyHref,
      caption: { en: 'Non-transitive odds', zh: '非传递概率' },
      Icon: PenneyCoinCssIcon,
    },
  ];

  return (
    <div className="page-shell project-home-page">
      <nav className="project-home-nav" aria-label="Primary navigation">
        <a href={homeHref} className="project-home-back inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} />
          {isZh ? '返回主页' : 'Back home'}
        </a>
        <HeaderControls
          language={language}
          setLanguage={setLanguage}
          themePreference={themePreference}
          theme={theme}
          setThemePreference={setThemePreference}
        />
      </nav>

      <main className="project-home-main">
        <header className="project-home-hero">
          <p className="project-home-kicker">{isZh ? '作品 · Projects' : 'Work · Projects'}</p>
          <h1>{isZh ? '打开任何一个 app。' : 'Open any app.'}</h1>
          <p className="project-home-lede">
            {isZh
              ? '每一个图标都是一个真的做出来、还在跑的东西。点进去看它在解决什么问题。'
              : 'Every icon is something real that got built and still runs. Tap one to see the problem it solves.'}
          </p>
        </header>

        <section className="project-home-grid" aria-label={isZh ? '项目 app 列表' : 'Project apps'}>
          {projectApps.map((app) => (
            <a key={app.id} className="project-home-app" href={app.href} title={app.name}>
              <span className="project-home-app-icon">
                <app.Icon label={isZh ? `${app.name} CSS app 图标` : `${app.name} CSS app icon`} />
              </span>
              <span className="project-home-app-name">{app.name}</span>
              <span className="project-home-app-caption">{app.caption[language]}</span>
            </a>
          ))}
        </section>

        <nav className="project-home-dock" aria-label={isZh ? '快捷入口' : 'Quick links'}>
          <a href={homeHref} className="project-home-dock-link">{isZh ? '主页' : 'Home'}</a>
          <a href={jijuHref} className="project-home-dock-link">{isZh ? '实验室' : 'Lab'}</a>
          <a href={`${homeHref}#about`} className="project-home-dock-link">{isZh ? '关于' : 'About'}</a>
        </nav>
      </main>
    </div>
  );
};
