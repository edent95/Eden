import type { CssArtComponent } from './components/css-art/index';
import {
  ElementFireCssIcon,
  ElementWindCssIcon,
  ElementWaterCssIcon,
  HomeBaguaMirrorTotem,
  HomeGramophoneTotem,
  HomeLifeMagicIcon,
  HomePowerUpTotem,
  HomeProjectsBlueprintIcon,
  HomePyramidBreakTotem,
  MathFractalRuneCssIcon,
  MathIntegralSpellCssIcon,
  MathMatrixPortalCssIcon,
  MathPiOrbCssIcon,
  MathPrimeSigilCssIcon,
  MathVectorGateCssIcon,
  OfficeCalendarCssIcon,
  OfficeContractCssIcon,
  OfficeInboxCssIcon,
  OfficeReportCssIcon,
  OfficeTeamBoardCssIcon,
  OfficeWorkflowCssIcon,
  ProjectsCrmCssIcon,
  ProjectsEtReportCssIcon,
  ProjectsJijuCssIcon,
  ProjectsPokerCssIcon,
  WikiBackgroundMusicCssIcon,
  WikiButtonFeedbackCssIcon,
  WikiFirebaseStorageCssIcon,
  WikiRagFlowCssIcon,
  WikiSkillsCssIcon,
  WikiViteCssIcon,
} from './components/css-art/index';

export type LocalizedText = {
  en: string;
  zh: string;
};

export type CssArtCategory =
  | 'project-icon'
  | 'home-system'
  | 'home-interest'
  | 'office-icon'
  | 'math-magic-icon'
  | 'elemental-icon'
  | 'wiki-icon';
export type CssArtBackground = 'framed' | 'transparent' | 'scene';
export type CssArtRatio = '1:1' | 'transparent-totem';

export type CssArtRegistryItem = {
  id: string;
  title: string;
  projectTitle?: string;
  category: CssArtCategory;
  sourceRoute: string;
  ratio: CssArtRatio;
  background: CssArtBackground;
  supportsDarkMode: boolean;
  supportsReducedMotion: boolean;
  cssFile: string;
  Component: CssArtComponent;
  label: LocalizedText;
  copy: LocalizedText;
};

export const cssArtRegistry: readonly CssArtRegistryItem[] = [
  {
    id: 'projects-jiju',
    title: 'Jiju',
    projectTitle: 'Jiju',
    category: 'project-icon',
    sourceRoute: '/projects',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/projects-icons.css',
    Component: ProjectsJijuCssIcon,
    label: {
      en: 'Jiju CSS app icon',
      zh: 'Jiju CSS app 图标',
    },
    copy: {
      en: 'The framed cat-scene app icon used by the Jiju project card.',
      zh: 'Jiju project card 使用的固定底猫场景 app icon。',
    },
  },
  {
    id: 'projects-friday-poker-club',
    title: 'Friday Poker Club',
    projectTitle: 'Friday Poker Club',
    category: 'project-icon',
    sourceRoute: '/projects',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/projects-icons.css',
    Component: ProjectsPokerCssIcon,
    label: {
      en: 'Friday Poker Club CSS app icon',
      zh: 'Friday Poker Club CSS app 图标',
    },
    copy: {
      en: 'The framed table-and-pocket-aces icon used by the poker project card.',
      zh: 'Friday Poker Club project card 使用的固定底牌桌和对 A app icon。',
    },
  },
  {
    id: 'projects-etreporthub',
    title: 'ETReportHub',
    projectTitle: 'ETReportHub',
    category: 'project-icon',
    sourceRoute: '/projects',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/projects-icons.css',
    Component: ProjectsEtReportCssIcon,
    label: {
      en: 'ETReportHub data CSS app icon',
      zh: 'ETReportHub 数据 CSS app 图标',
    },
    copy: {
      en: 'The framed data-dashboard icon with animated bars and scan line.',
      zh: 'ETReportHub 使用的固定底数据仪表盘 app icon，包含动态 bar 和 scan line。',
    },
  },
  {
    id: 'projects-crm-intelligence-system',
    title: 'CRM Intelligence System',
    projectTitle: 'CRM Intelligence System',
    category: 'project-icon',
    sourceRoute: '/projects',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/projects-icons.css',
    Component: ProjectsCrmCssIcon,
    label: {
      en: 'CRM Intelligence System magic circle CSS app icon',
      zh: 'CRM Intelligence System 魔法阵 CSS app 图标',
    },
    copy: {
      en: 'The framed magic-circle system icon used by the CRM project card.',
      zh: 'CRM project card 使用的固定底魔法阵系统 app icon。',
    },
  },
  {
    id: 'home-projects-hub-blueprint',
    title: 'Projects Hub',
    category: 'home-system',
    sourceRoute: '/',
    ratio: '1:1',
    background: 'transparent',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/home-projects-blueprint.css',
    Component: HomeProjectsBlueprintIcon,
    label: {
      en: 'Projects Hub blueprint CSS icon',
      zh: 'Projects Hub 设计图纸 CSS 图标',
    },
    copy: {
      en: 'The transparent blueprint icon from the Home System Files section.',
      zh: '主页 System Files 区块里的透明底设计图纸 CSS 图标。',
    },
  },
  {
    id: 'home-life-os-magic',
    title: 'Life OS RPG System',
    category: 'home-system',
    sourceRoute: '/',
    ratio: '1:1',
    background: 'transparent',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/home-life-magic.css',
    Component: HomeLifeMagicIcon,
    label: {
      en: 'Life OS heartbeat magic circle CSS icon',
      zh: 'Life OS 心跳魔法阵 CSS 图标',
    },
    copy: {
      en: 'The transparent heartbeat-to-magic-circle icon from Home System Files.',
      zh: '主页 System Files 区块里的透明底心跳变魔法阵 CSS 图标。',
    },
  },
  {
    id: 'home-life-os-power-up',
    title: 'Life OS',
    category: 'home-interest',
    sourceRoute: '/',
    ratio: 'transparent-totem',
    background: 'transparent',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/home-interest-totems.css',
    Component: HomePowerUpTotem,
    label: {
      en: 'Life OS black hair to golden power-up transparent CSS totem',
      zh: 'Life OS 黑发变金发能量变身透明底 CSS 图腾',
    },
    copy: {
      en: 'The transparent power-up totem used by the Home Interests Life OS card.',
      zh: '主页 Interests 里 Life OS 使用的透明底能量变身图腾。',
    },
  },
  {
    id: 'home-analog-tech-gramophone',
    title: 'Analog Tech',
    category: 'home-interest',
    sourceRoute: '/',
    ratio: 'transparent-totem',
    background: 'transparent',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/home-interest-totems.css',
    Component: HomeGramophoneTotem,
    label: {
      en: 'Analog Tech vibrating gramophone transparent CSS totem',
      zh: 'Analog Tech 留声机振动透明底 CSS 图腾',
    },
    copy: {
      en: 'The transparent classic gramophone totem used by the Home Interests Analog Tech card.',
      zh: '主页 Interests 里 Analog Tech 使用的经典留声机透明底图腾。',
    },
  },
  {
    id: 'home-pattern-archive-bagua',
    title: 'Pattern Archive',
    category: 'home-interest',
    sourceRoute: '/',
    ratio: 'transparent-totem',
    background: 'transparent',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/home-interest-totems.css',
    Component: HomeBaguaMirrorTotem,
    label: {
      en: 'Pattern Archive transparent Bagua mirror CSS totem',
      zh: 'Pattern Archive 道教八卦镜透明底 CSS 图腾',
    },
    copy: {
      en: 'The transparent Bagua mirror totem used by the Home Interests Pattern Archive card.',
      zh: '主页 Interests 里 Pattern Archive 使用的透明底八卦镜图腾。',
    },
  },
  {
    id: 'home-conway-pyramid-break',
    title: "Conway's Game of Life",
    category: 'home-interest',
    sourceRoute: '/',
    ratio: 'transparent-totem',
    background: 'transparent',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/home-interest-totems.css',
    Component: HomePyramidBreakTotem,
    label: {
      en: "Conway's Game of Life broken pyramid transparent CSS totem",
      zh: "Conway's Game of Life 金字塔碰坏透明底 CSS 图腾",
    },
    copy: {
      en: "The transparent broken-pyramid totem used by the Home Interests Conway's Game of Life card.",
      zh: "主页 Interests 里 Conway's Game of Life 使用的透明底金字塔碰坏图腾。",
    },
  },
  {
    id: 'office-desk-calendar',
    title: 'Desk Calendar',
    category: 'office-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/office-icons.css',
    Component: OfficeCalendarCssIcon,
    label: {
      en: 'Desk Calendar framed CSS app icon',
      zh: 'Desk Calendar 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'An emoji-like planning icon with a large calendar page and faint date dots.',
      zh: '偏 emoji 风格的计划排程图标：大日历页和若隐若现的日期点。',
    },
  },
  {
    id: 'office-inbox-tray',
    title: 'Inbox Tray',
    category: 'office-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/office-icons.css',
    Component: OfficeInboxCssIcon,
    label: {
      en: 'Inbox Tray framed CSS app icon',
      zh: 'Inbox Tray 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'An emoji-like document intake icon with large papers, tray, and no text lines.',
      zh: '偏 emoji 风格的文件流入图标：大纸张、托盘，不放横线文字。',
    },
  },
  {
    id: 'office-report-sheet',
    title: 'Report Sheet',
    category: 'office-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/office-icons.css',
    Component: OfficeReportCssIcon,
    label: {
      en: 'Report Sheet framed CSS app icon',
      zh: 'Report Sheet 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'An emoji-like reporting icon with a big sheet, simple bars, and check mark.',
      zh: '偏 emoji 风格的报表图标：大文件、简单 bar 和 check mark。',
    },
  },
  {
    id: 'office-team-board',
    title: 'Team Board',
    category: 'office-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/office-icons.css',
    Component: OfficeTeamBoardCssIcon,
    label: {
      en: 'Team Board framed CSS app icon',
      zh: 'Team Board 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'An emoji-like team board icon with simple cards that flip.',
      zh: '偏 emoji 风格的团队看板图标：简单卡片翻卡。',
    },
  },
  {
    id: 'office-contract-seal',
    title: 'Contract Seal',
    category: 'office-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/office-icons.css',
    Component: OfficeContractCssIcon,
    label: {
      en: 'Contract Seal framed CSS app icon',
      zh: 'Contract Seal 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'An emoji-like signing icon with a big paper, pen, triangle mark, and seal.',
      zh: '偏 emoji 风格的签署图标：大文件、笔、三角形记号和印章。',
    },
  },
  {
    id: 'office-workflow-automator',
    title: 'Workflow Automator',
    category: 'office-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/office-icons.css',
    Component: OfficeWorkflowCssIcon,
    label: {
      en: 'Workflow Automator framed CSS app icon',
      zh: 'Workflow Automator 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'An emoji-like automation icon with a magic wand lighting up workflow nodes.',
      zh: '偏 emoji 风格的自动化图标：魔法棒点亮流程节点。',
    },
  },
  {
    id: 'math-prime-sigil',
    title: 'Prime Sigil',
    category: 'math-magic-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/math-magic-icons.css',
    Component: MathPrimeSigilCssIcon,
    label: {
      en: 'Prime Sigil framed CSS app icon',
      zh: 'Prime Sigil 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'A spellbook-style icon: a prime number glowing inside a rotating sigil.',
      zh: '魔法书风格 icon：质数在旋转符文阵里发光。',
    },
  },
  {
    id: 'math-vector-gate',
    title: 'Vector Gate',
    category: 'math-magic-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/math-magic-icons.css',
    Component: MathVectorGateCssIcon,
    label: {
      en: 'Vector Gate framed CSS app icon',
      zh: 'Vector Gate 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'A vector spell gate with casting arrows, aura rings, and portal glow.',
      zh: '向量施法门：箭头、光环轨道和传送门一起发光。',
    },
  },
  {
    id: 'math-integral-spell',
    title: 'Integral Spell',
    category: 'math-magic-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/math-magic-icons.css',
    Component: MathIntegralSpellCssIcon,
    label: {
      en: 'Integral Spell framed CSS app icon',
      zh: 'Integral Spell 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'A calculus spell icon with a floating integral mark and glowing magic area.',
      zh: '微积分咒式 icon：漂浮积分符号和发光魔法面积。',
    },
  },
  {
    id: 'math-pi-orb',
    title: 'Pi Orb',
    category: 'math-magic-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/math-magic-icons.css',
    Component: MathPiOrbCssIcon,
    label: {
      en: 'Pi Orb framed CSS app icon',
      zh: 'Pi Orb 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'A pi orb artifact with orbiting moons and a slow arcane pulse.',
      zh: 'π 球体法器：小月点环绕，慢速奥术脉冲。',
    },
  },
  {
    id: 'math-fractal-rune',
    title: 'Fractal Rune',
    category: 'math-magic-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/math-magic-icons.css',
    Component: MathFractalRuneCssIcon,
    label: {
      en: 'Fractal Rune framed CSS app icon',
      zh: 'Fractal Rune 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'A recursive rune tree with luminous branches and spell nodes.',
      zh: '递归符文树：发光枝条和咒式节点。',
    },
  },
  {
    id: 'math-matrix-portal',
    title: 'Matrix Portal',
    category: 'math-magic-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/math-magic-icons.css',
    Component: MathMatrixPortalCssIcon,
    label: {
      en: 'Matrix Portal framed CSS app icon',
      zh: 'Matrix Portal 1:1 framed CSS app 图标',
    },
    copy: {
      en: 'A matrix portal spell with bracket glyphs, blinking cells, and a bright core.',
      zh: '矩阵传送咒：括号符印、闪烁单元和发光核心。',
    },
  },
  {
    id: 'element-fire',
    title: 'Fire Element',
    category: 'elemental-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/elemental-icons.css',
    Component: ElementFireCssIcon,
    label: {
      en: 'Fire Element 1:1 CSS icon',
      zh: 'Fire Element 1:1 CSS 图标',
    },
    copy: {
      en: 'A flatter framed fire-element icon with a bold flame, embers, and a slow lava base glow.',
      zh: '更 flat 的火元素 framed icon：大块火焰、灰烬火星和慢速熔岩底光。',
    },
  },
  {
    id: 'element-water',
    title: 'Water Element',
    category: 'elemental-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/elemental-icons.css',
    Component: ElementWaterCssIcon,
    label: {
      en: 'Water Element 1:1 CSS icon',
      zh: 'Water Element 1:1 CSS 图标',
    },
    copy: {
      en: 'A flat framed water-element icon with a clear droplet shape, bubbles, and a slow tide glow.',
      zh: 'flat 水元素 framed icon：清楚的水滴轮廓、气泡和慢速潮汐底光。',
    },
  },
  {
    id: 'element-wind',
    title: 'Wind Element',
    category: 'elemental-icon',
    sourceRoute: '/project-css',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/elemental-icons.css',
    Component: ElementWindCssIcon,
    label: {
      en: 'Wind Element 1:1 CSS icon',
      zh: 'Wind Element 1:1 CSS 图标',
    },
    copy: {
      en: 'A flat framed wind-element icon with soft gust bands, small leaves, and a slow breeze glow.',
      zh: 'flat 风元素 framed icon：柔和风带、小叶片和慢速微风底光。',
    },
  },
  {
    id: 'wiki-vite',
    title: 'Vite Skill',
    category: 'wiki-icon',
    sourceRoute: '/wiki/vite',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/wiki-icons.css',
    Component: WikiViteCssIcon,
    label: {
      en: 'Vite skill CSS icon',
      zh: 'Vite skill CSS 图标',
    },
    copy: {
      en: 'A compact framed lightning-and-build icon for the Vite wiki card.',
      zh: '小型 framed lightning/build CSS icon，用于 Vite wiki card。',
    },
  },
  {
    id: 'wiki-background-music',
    title: 'Background Music',
    category: 'wiki-icon',
    sourceRoute: '/wiki/background-music',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/wiki-icons.css',
    Component: WikiBackgroundMusicCssIcon,
    label: {
      en: 'Background music CSS icon',
      zh: 'Background music CSS 图标',
    },
    copy: {
      en: 'A compact framed record-and-sound icon for the background music wiki card.',
      zh: '小型 framed record/sound CSS icon，用于 background music wiki card。',
    },
  },
  {
    id: 'wiki-button-feedback',
    title: 'Button Feedback',
    category: 'wiki-icon',
    sourceRoute: '/wiki/button-feedback',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/wiki-icons.css',
    Component: WikiButtonFeedbackCssIcon,
    label: {
      en: 'Button feedback CSS icon',
      zh: 'Button feedback CSS 图标',
    },
    copy: {
      en: 'A compact framed press-and-signal icon for the button feedback wiki card.',
      zh: '小型 framed press/signal CSS icon，用于 button feedback wiki card。',
    },
  },
  {
    id: 'wiki-firebase-storage',
    title: 'Firebase Lifetime Storage',
    category: 'wiki-icon',
    sourceRoute: '/wiki/firebase-lifetime-storage',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/wiki-icons.css',
    Component: WikiFirebaseStorageCssIcon,
    label: {
      en: 'Firebase lifetime storage CSS icon',
      zh: 'Firebase lifetime storage CSS 图标',
    },
    copy: {
      en: 'A compact framed storage-and-spark icon for the Firebase lifetime storage wiki card.',
      zh: '小型 framed storage/spark CSS icon，用于 Firebase lifetime storage wiki card。',
    },
  },
  {
    id: 'wiki-skills',
    title: 'Reusable Skills',
    category: 'wiki-icon',
    sourceRoute: '/wiki/skills',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/wiki-icons.css',
    Component: WikiSkillsCssIcon,
    label: {
      en: 'Reusable skills CSS icon',
      zh: 'Reusable skills CSS 图标',
    },
    copy: {
      en: 'A compact framed multi-card icon for the reusable skills wiki card.',
      zh: '小型 framed multi-card CSS icon，用于 reusable skills wiki card。',
    },
  },
  {
    id: 'wiki-rag-flow',
    title: 'Tag Registry and RAG Flow',
    category: 'wiki-icon',
    sourceRoute: '/wiki/rag-flow',
    ratio: '1:1',
    background: 'framed',
    supportsDarkMode: true,
    supportsReducedMotion: true,
    cssFile: 'styles/css-art/wiki-icons.css',
    Component: WikiRagFlowCssIcon,
    label: {
      en: 'Tag Registry and RAG flow CSS icon',
      zh: 'Tag Registry 与 RAG flow CSS 图标',
    },
    copy: {
      en: 'A compact framed note-and-tag icon with simple object motion for the RAG flow page.',
      zh: '小型 framed note/tag CSS icon，用简单实体物件动效表达 RAG flow。',
    },
  },
];

export const projectCssArtItems = cssArtRegistry.filter((item) => item.category === 'project-icon');
export const homeSystemCssArtItems = cssArtRegistry.filter((item) => item.category === 'home-system');
export const homeInterestCssArtItems = cssArtRegistry.filter((item) => item.category === 'home-interest');
export const officeIconCssArtItems = cssArtRegistry.filter((item) => item.category === 'office-icon');
export const mathMagicIconCssArtItems = cssArtRegistry.filter((item) => item.category === 'math-magic-icon');
export const elementalIconCssArtItems = cssArtRegistry.filter((item) => item.category === 'elemental-icon');
export const wikiIconCssArtItems = cssArtRegistry.filter((item) => item.category === 'wiki-icon');

export const getProjectCssArtByProjectTitle = (projectTitle: string): CssArtRegistryItem | undefined =>
  projectCssArtItems.find((item) => item.projectTitle === projectTitle);
