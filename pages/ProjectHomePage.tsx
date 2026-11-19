import React from 'react';
import { FilmGalleryCssIcon, PenneyCoinCssIcon, ProjectsCrmCssIcon, ProjectsDrRacingCssIcon, ProjectsEtReportCssIcon, ProjectsJijuCssIcon, ProjectsLifeOsCssIcon, ProjectsMiyaCssIcon, ProjectsPokerCssIcon, ProjectsScriptureCssIcon } from '../components/css-art/index';
import { HeaderControls, type Language, type Theme, type ThemePreference } from '../app/shared';
import { ArrowLeft } from 'lucide-react';

type ProjectAppEntry = {
  id: string;
  name: string;
  href: string;
  caption: Record<Language, string>;
  /** One or two plain sentences shown on hover / focus (fine pointer) or in a sheet after the first tap (touch). */
  summary: Record<Language, string>;
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
  lifeOsHref: string;
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
  lifeOsHref,
  language,
  setLanguage,
  themePreference,
  theme,
  setThemePreference,
}) => {
  const isZh = language === 'zh';
  // Touch screens have no hover, so the first tap on an icon opens its details sheet and a
  // second tap (or the sheet's Open button) follows the link. Fine pointers navigate on click
  // and read the details from the hover / focus popover instead.
  const [sheetId, setSheetId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!sheetId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSheetId(null);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest('.project-home-app, .project-home-sheet')) setSheetId(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [sheetId]);

  const onAppClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!window.matchMedia('(hover: none)').matches || sheetId === id) return;
    event.preventDefault();
    setSheetId(id);
  };

  const projectApps: ProjectAppEntry[] = [
    {
      id: 'jiju',
      name: 'Jiju',
      href: jijuHref,
      caption: { en: 'Local discovery', zh: '本地发现' },
      summary: {
        en: 'Find places that are genuinely pet-friendly, check their real policies, and keep your pet\'s profile and visit memories in one place.',
        zh: '找到真正宠物友好的地点，确认真实政策，把宠物档案和到访记忆放在一起。',
      },
      Icon: ProjectsJijuCssIcon,
    },
    {
      id: 'poker',
      name: 'Friday Poker Club',
      href: pokerHref,
      caption: { en: 'Private table', zh: '私人牌局' },
      summary: {
        en: 'A browser Hold\'em table for a private crew: nine seats, blinds and buy-ins, six mini games, and a chip tracker for real-card nights.',
        zh: '给熟人局的浏览器德州牌桌：九个座位、盲注与买入、六个小游戏，真牌局也能用它记筹码。',
      },
      Icon: ProjectsPokerCssIcon,
    },
    {
      id: 'etreporthub',
      name: 'ETReportHub',
      href: etReportHubHref,
      caption: { en: 'Daily data layer', zh: '每日数据层' },
      summary: {
        en: 'A daily reporting system for operations teams: drop in Transaction and Customer Excel files, get KPIs, members, channels, trends and brand comparisons.',
        zh: '给运营团队的日报系统：放进 Transaction 与 Customer Excel，直接得到 KPI、会员、渠道、趋势和品牌对比。',
      },
      Icon: ProjectsEtReportCssIcon,
    },
    {
      id: 'life-os',
      name: 'Life OS',
      href: lifeOsHref,
      caption: { en: 'Personal base map', zh: '个人底图' },
      summary: {
        en: 'Lock eight natal charts first, then record what really happens and measure the match. Working hypothesis: about 73% fits the chart, 27% is yours to change.',
        zh: '先锁定八套本命命盘，再记录现实里发生的事，量出吻合率。目前的工作假设：约 73% 与命盘吻合，27% 是你能改的。',
      },
      Icon: ProjectsLifeOsCssIcon,
    },
    {
      id: 'dr-racing',
      name: 'Dr Racing',
      href: drRacingHref,
      caption: { en: 'Loan pipeline', zh: '贷款流水线' },
      summary: {
        en: 'Runs a motorcycle dealership from lead to delivered bike: loan and cash applications, bank rounds, the delivery checklist, stock and commissions.',
        zh: '摩托车行从 lead 到交车的运营系统：贷款与现金申请、银行轮次、交车 checklist、库存和佣金，放在一个仪表台里。',
      },
      Icon: ProjectsDrRacingCssIcon,
    },
    {
      id: 'film-gallery',
      name: 'Film Gallery',
      href: filmGalleryHref,
      caption: { en: 'Film archive', zh: '胶片档案' },
      summary: {
        en: 'Fifteen film photographs of streets, water, buildings, temples and people, shot on three cameras with Kodak Gold 200 and 400.',
        zh: '十五张胶片照片：街道、水岸、建筑、庙宇与人物，三台相机、Kodak Gold 200 与 400 拍摄。',
      },
      Icon: FilmGalleryCssIcon,
    },
    {
      id: 'conways-game-of-life',
      name: "Conway's Game of Life",
      href: conwayHref,
      caption: { en: 'Cellular automata', zh: '细胞自动机' },
      summary: {
        en: 'Play a Game of Life board, then follow binary cells through 8 neighbourhoods, 64 hexagrams, 256 rules and Leibniz\'s I Ching bridge.',
        zh: '先玩一盘生命游戏，再沿着二元细胞走进八种邻域、六十四卦、256 条规则和莱布尼茨的《易经》桥梁。',
      },
      Icon: ProjectsCrmCssIcon,
    },
    {
      id: 'penneys-game',
      name: "Penney's Game",
      href: penneyHref,
      caption: { en: 'Non-transitive odds', zh: '非传递概率' },
      summary: {
        en: 'Pick a three-flip coin pattern after your opponent picks theirs and you win most of the time: no pattern is best, there is only a better reply.',
        zh: '对手先选一个三次抛币的组合，你后选就能多数时候赢：没有最强的组合，只有更好的回应。',
      },
      Icon: PenneyCoinCssIcon,
    },
    {
      id: 'miya',
      name: 'MiYa',
      href: 'https://miya.eden-tan.com/',
      caption: { en: 'On-device health', zh: '本机健康报告' },
      summary: {
        en: 'An iPhone app that reads your Apple Watch health data on the device and explains it in plain words you actually understand.',
        zh: '在手机本机读取 Apple Watch 健康数据的 iPhone App，用你看得懂的话讲清楚身体在发生什么。',
      },
      Icon: ProjectsMiyaCssIcon,
    },
    {
      id: 'scripture',
      name: 'Scripture',
      href: 'https://scripture.eden-tan.com/',
      caption: { en: 'Sanskrit classics, plain', zh: '梵文经典白话' },
      summary: {
        en: 'Buddhist and Sanskrit classics translated into plain, readable language, chapter by chapter, with an engraved illustration for each book.',
        zh: '佛经与梵文经典的白话直译，逐章对照，每部书配一张版画插图。',
      },
      Icon: ProjectsScriptureCssIcon,
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
              ? '都是用心做的。悬停或点一下图标，看它是做什么的。'
              : 'Every icon is something real that got built and still runs. Hover or tap one to see what it does.'}
          </p>
        </header>

        <section className="project-home-grid" aria-label={isZh ? '项目 app 列表' : 'Project apps'}>
          {projectApps.map((app) => (
            <div key={app.id} className="project-home-app-cell">
              <a
                className={`project-home-app${sheetId === app.id ? ' is-selected' : ''}`}
                href={app.href}
                aria-describedby={`project-home-tip-${app.id}`}
                onClick={(event) => onAppClick(event, app.id)}
              >
                <span className="project-home-app-icon">
                  <app.Icon label={isZh ? `${app.name} CSS app 图标` : `${app.name} CSS app icon`} />
                </span>
                <span className="project-home-app-name">{app.name}</span>
                <span className="project-home-app-caption">{app.caption[language]}</span>
              </a>
              <span className="project-home-tip" id={`project-home-tip-${app.id}`} role="tooltip">
                {app.summary[language]}
              </span>
            </div>
          ))}
        </section>

        {(() => {
          const app = projectApps.find((entry) => entry.id === sheetId);
          if (!app) return null;
          return (
            <div className="project-home-sheet" role="dialog" aria-label={app.name}>
              <span className="project-home-sheet-icon" aria-hidden="true"><app.Icon label="" /></span>
              <div className="project-home-sheet-body">
                <strong>{app.name}</strong>
                <span className="project-home-sheet-caption">{app.caption[language]}</span>
                <p>{app.summary[language]}</p>
              </div>
              <div className="project-home-sheet-actions">
                <a className="project-home-sheet-open" href={app.href}>{isZh ? '打开' : 'Open'} <span aria-hidden="true">→</span></a>
                <button type="button" className="project-home-sheet-close" onClick={() => setSheetId(null)}>
                  {isZh ? '关闭' : 'Close'}
                </button>
              </div>
            </div>
          );
        })()}

        <nav className="project-home-dock" aria-label={isZh ? '快捷入口' : 'Quick links'}>
          <a href={homeHref} className="project-home-dock-link">{isZh ? '主页' : 'Home'}</a>
        </nav>
      </main>
    </div>
  );
};
