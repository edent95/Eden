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
  elementalIconCssArtItems,
  homeInterestCssArtItems,
  homeSelectedWorkBannerItems,
  homeSystemCssArtItems,
  officeIconCssArtItems,
  projectCssArtItems,
} from './css-art.registry';
import {
  EngravedBorder,
  EngravedEye,
  EngravedHatchScale,
  EngravedRosette,
  FilmGalleryCssIcon,
  PenneyCoinCssIcon,
  ProjectsCrmCssIcon,
  ProjectsDrRacingCssIcon,
  ProjectsEtReportCssIcon,
  ProjectsJijuCssIcon,
  ProjectsMiyaCssIcon,
  ProjectsLifeOsCssIcon,
  ProjectsPokerCssIcon,
  WikiBackgroundMusicCssIcon,
  WikiButtonFeedbackCssIcon,
  WikiFirebaseStorageCssIcon,
  WikiRagFlowCssIcon,
  WikiSkillsCssIcon,
  WikiViteCssIcon,
} from './components/css-art/index';
import { 
  Bookmark,
  Brain,
  Linkedin, 
  ExternalLink,
  Download,
  Database,
  GitBranch,
  Layers,
  MapPin,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Clock3,
  Copy,
  MessageSquare,
  MoonStar,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  SunMedium,
  Pause,
  Play,
  RotateCcw,
  SearchCheck,
  TrendingUp,
  UserRound
} from 'lucide-react';

import { siteEssayNotes, wikiEntries } from './generated/content';
import { IGAMING_CASES as igamingCases } from './components/igaming-cases-content';

type Language = 'en' | 'zh';
type Theme = 'light' | 'dark';
type ThemePreference = Theme | 'auto';

const PenneysGamePage = React.lazy(() => import('./components/PenneysGamePage'));
const MiyaPrivacyPage = React.lazy(() => import('./components/MiyaPrivacyPage'));
const IGamingPage = React.lazy(() => import('./components/IGamingPage'));
const IGamingSummaryPage = React.lazy(() => import('./components/IGamingSummaryPage'));
const IGamingCasesPage = React.lazy(() => import('./components/IGamingCasesPage'));
const HomePenneyGame = React.lazy(() => import('./components/HomePenneyGame'));

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

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

const filmGalleryPhotos = [
  {
    src: '/film-gallery/film-gallery-1.png',
    alt: {
      en: 'Film photograph of a street receding into soft depth, everyday scale',
      zh: '胶片街景，景深将路面与街景分成柔和层次',
    },
    caption: {
      en: 'A quiet street read in layers: a soft near plane, honest everyday scale, no staging.',
      zh: '用景深把街面读成层次：前景柔和，日常尺度，非摆拍场面。',
    },
  },
  {
    src: '/film-gallery/film-gallery-2.png',
    alt: { en: 'Hazy city skyline on film, layered grays and blues', zh: '胶片中的城市天际线，灰蓝层次' },
    caption: {
      en: 'Humid air over the city—haze and distance rendered as believable, restrained tones.',
      zh: '城市上空的湿气与距离，被胶片压成克制、可信的灰与蓝。',
    },
  },
  {
    src: '/film-gallery/film-gallery-3.png',
    alt: { en: 'Tall building on film, glass catching a sliver of light', zh: '高塔与玻璃上一道细光' },
    caption: {
      en: 'A vertical study: weight, edge, and a thin strip of light along glass.',
      zh: '竖向的体量与边线，玻璃上的一条薄光把材质说清楚。',
    },
  },
  {
    src: '/film-gallery/film-gallery-4.png',
    alt: { en: 'Calm waterfront, soft highlights on open water', zh: '平静水面与细碎高光' },
    caption: {
      en: 'Open water, small speculars, and a horizon line that gives the eye a place to rest.',
      zh: '开阔水面、细碎高光，与一条让视线能落稳的水平线。',
    },
  },
  {
    src: '/film-gallery/film-gallery-5.png',
    alt: { en: 'Film frame with a gentle light leak along the edge of the scene', zh: '画缘一道柔和的漏光' },
    caption: {
      en: 'A light leak that reads like a mark of process—kept, not “fixed out.”',
      zh: '漏光像流程留下的签名：保留，而不是当成失误修掉。',
    },
  },
  {
    src: '/film-gallery/film-gallery-6.png',
    alt: { en: 'Ornate temple details softened by emulsion grain', zh: '庙宇细部在颗粒中变得可信' },
    caption: {
      en: 'Carving and shadow held in grain: detail that would go plastic if over-sharpened.',
      zh: '雕刻与阴影像嵌在乳剂里，过度锐化才会显“塑料”。',
    },
  },
  {
    src: '/film-gallery/film-gallery-7.png',
    alt: { en: 'Mountain haze, long tonal gradients in the distance', zh: '远山与漫开的空气感' },
    caption: {
      en: 'Atmosphere over drama—distance carried by long, quiet tonal ramps.',
      zh: '不追求戏剧性，靠长调子把远距托成可感的空气。',
    },
  },
  {
    src: '/film-gallery/film-gallery-8.png',
    alt: { en: 'Coastal view of a city, modest color separation on film', zh: '海岸线上的城市，色彩关系克制' },
    caption: {
      en: 'A coastal read of the city, color kept modest and believable in mixed light.',
      zh: '混合光里读海岸城市，色彩不抢戏，但站得住。',
    },
  },
  {
    src: '/film-gallery/film-gallery-9.png',
    alt: { en: 'Open horizon where sea and sky meet under heavy clouds', zh: '重云下海天相接的开阔线' },
    caption: {
      en: 'A simple split between water and weather—room left for the eye to move.',
      zh: '水与天的交界故意留到最简，好让视线有路可走。',
    },
  },
  {
    src: '/film-gallery/film-gallery-10.png',
    alt: { en: 'Geometric city scene, bicycle as a clear visual anchor', zh: '城市几何，单车作视觉锚点' },
    caption: {
      en: 'Geometry in the block: a wheel, a line, a center that orders the rest of the frame.',
      zh: '街区里的几何：一轮、一线，用清晰的重心把余下元素收住。',
    },
  },
  {
    src: '/film-gallery/film-gallery-11.png',
    alt: { en: 'Candid people by the sea, unposed', zh: '水边未加导演的日常一瞬' },
    caption: {
      en: 'A candid exchange at the water’s edge—ordinary, and meant to stay that way.',
      zh: '水边的寻常交谈，刻意保留不必“升格”的平凡。',
    },
  },
  {
    src: '/film-gallery/film-gallery-12.jpg',
    alt: { en: 'Cargo ship crossing calm water beneath a wide cloudy sky', zh: '货船驶过平静水面，城市与云层铺在远方' },
    caption: {
      en: 'A small vessel under an enormous sky, with the city held quietly along the horizon.',
      zh: '一艘小船压在辽阔云层之下，城市安静地停在水平线上。',
    },
  },
  {
    src: '/film-gallery/film-gallery-13.jpg',
    alt: { en: 'Candid portrait in a warmly lit restaurant', zh: '暖色餐馆里戴墨镜男子的抓拍肖像' },
    caption: {
      en: 'A candid portrait held by warm light, shadow, and the grain of an evening indoors.',
      zh: '暖光、阴影与夜里的颗粒，共同托住一张没有摆拍感的肖像。',
    },
  },
  {
    src: '/film-gallery/film-gallery-14.jpg',
    alt: { en: 'Dim temple altar illuminated by red lanterns and candles', zh: '红灯与烛光照亮幽暗的庙宇内殿' },
    caption: {
      en: 'An interior carried by low light: red lamps, carved surfaces, and pools of reflection.',
      zh: '低光里的内殿，由红灯、雕刻与一小片反光慢慢显形。',
    },
  },
  {
    src: '/film-gallery/film-gallery-15.jpg',
    alt: { en: 'Ornate temple roofline crowned by twin dragon sculptures', zh: '双龙雕塑立于色彩鲜明的庙宇屋脊' },
    caption: {
      en: 'Twin dragons and a crowded roofline cut cleanly against an open pale sky.',
      zh: '双龙与密集屋脊切在清淡天空上，繁复却保持清楚。',
    },
  },
];

const filmGalleryCameras = [
  {
    name: 'Konica Auto S2',
    frameNumbers: [1, 2, 6, 7, 8, 9, 10, 11],
  },
  { name: 'Rolleiflex Old Standard (Model 621)', frameNumbers: [3, 4, 5] },
  { name: 'Zeiss Ikon Contessa 35', frameNumbers: [12, 13, 14, 15] },
];

const filmGalleryStocks = [
  { name: 'Kodak Gold 200', frameNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
  { name: 'Kodak Gold 400', frameNumbers: [14, 15] },
];

const filmGalleryFrames = filmGalleryPhotos
  .map((photo, index) => ({ photo, frameNumber: index + 1 }))
  .reverse();

type AiProjectSystem = {
  eyebrow: Record<Language, string>;
  title: string;
  status: Record<Language, string>;
  role: Record<Language, string>;
  summary: Record<Language, string>;
  system: Record<Language, string>;
  href: string;
  external?: string;
};

const aiProjectSystems: AiProjectSystem[] = [
  {
    eyebrow: { en: 'Main Build', zh: '主构建' },
    title: 'Jiju',
    status: { en: 'Building', zh: '构建中' },
    role: { en: 'Pet-friendly discovery system', zh: '宠物友好发现系统' },
    summary: {
      en: 'A pet-friendly discovery platform starting in Penang. Get the place data, the “where we went” memories, and a small map you can actually trust right first — worry about expanding later.',
      zh: '从槟城起步的宠物友好发现平台。先把地点资料、出门的记忆、还有一张靠得住的小地图做好——扩张的事以后再说。',
    },
    system: {
      en: 'Discovery logic, place data, pet-parent memory loop, mobile UX, growth narrative.',
      zh: '发现逻辑、地点资料、养宠出门记忆回路、移动端体验和增长叙事。',
    },
    href: 'jiju',
    external: 'https://jiju.pet',
  },
  {
    eyebrow: { en: 'Game System', zh: '游戏系统' },
    title: 'Friday Poker Club',
    status: { en: 'Prototype', zh: '原型中' },
    role: { en: 'Browser table host', zh: '浏览器牌桌主机' },
    summary: {
      en: 'A browser Hold’em table for a private crew — nine seats, blinds and buy-ins, six mini games, party games, and a chip tracker for the nights you deal real cards.',
      zh: '给熟人局用的浏览器德州牌桌——九个座位、盲注与买入、六个小游戏、派对游戏，真牌局还能帮你记筹码。',
    },
    system: {
      en: 'Realtime sync, room state, clear action UI, host overhead reduction, game-flow structure.',
      zh: '实时同步、房间状态、清楚行动 UI、降低主持人解释成本和游戏流程结构。',
    },
    href: 'poker',
    external: 'https://poker.eden-tan.com/',
  },
  {
    eyebrow: { en: 'AI Build System', zh: 'AI 构建系统' },
    title: 'ETReportHub',
    status: { en: 'Active build', zh: '构建中' },
    role: { en: 'Daily Report OS', zh: '日报数据系统' },
    summary: {
      en: 'A daily-report data system for iGaming operators and aggregators. It turns Excel, members, channels, trends, brand comparison, and CRM export into one reviewable dashboard.',
      zh: '给 iGaming operator / aggregator 的日报数据系统。把 Excel、会员、渠道、趋势、品牌对比和 CRM export 放进同一个可复盘的 dashboard。',
    },
    system: {
      en: 'Transaction + Customer Excel, SQLite / IndexedDB, Performance / Members / Channels / Trends, CRM export, Wide Excel, System Guide.',
      zh: 'Transaction + Customer Excel、SQLite / IndexedDB、Performance / Members / Channels / Trends、CRM export、Wide Excel、System Guide。',
    },
    href: 'etreporthub',
  },
];

const etReportHubBuyerPain = [
  {
    title: { en: 'Daily reporting takes too many hands', zh: '日报太依赖人工' },
    copy: {
      en: 'Every day someone downloads files, checks formulas, compares brands, and explains the same numbers again. The work repeats, but the system does not improve.',
      zh: '每天都有人下载文件、检查公式、对比品牌、解释同样的数字。工作一直重复，但系统没有变聪明。',
    },
  },
  {
    title: { en: 'Excel becomes the hidden risk', zh: 'Excel 变成隐藏风险' },
    copy: {
      en: 'One wrong paste, one missing filter, one duplicated customer total, and the team may make decisions from a broken report.',
      zh: '一次贴错、一个筛选漏掉、一个会员总数重复，团队就可能根据错误报表做判断。',
    },
  },
  {
    title: { en: 'CRM cannot move without clean data', zh: 'CRM 没有干净数据就跑不动' },
    copy: {
      en: 'Retention, segmentation, risk review, and follow-up actions need a trusted data layer before AI or CRM workflows can help.',
      zh: '留存、分群、风险复盘和跟进行动，都需要可信的数据层。没有这层，AI 或 CRM 只会放大混乱。',
    },
  },
] as const;

const etReportHubSalesOutcomes = [
  {
    label: { en: 'Decision speed', zh: '判断更快' },
    metric: { en: 'Same-day clarity', zh: '当天看清楚' },
    copy: {
      en: 'Operators can see performance, members, channels, trends, and brand comparison without rebuilding the report from scratch.',
      zh: '运营不需要从零重做报表，就能看 Performance、Members、Channels、Trends 和品牌对比。',
    },
  },
  {
    label: { en: 'Data trust', zh: '数据更可信' },
    metric: { en: 'One operating layer', zh: '一层事实来源' },
    copy: {
      en: 'Transaction and Customer files are imported under rules, normalized, reviewed, and kept ready for export.',
      zh: 'Transaction 与 Customer 文件按规则导入、标准化、复盘，并保持可导出状态。',
    },
  },
  {
    label: { en: 'CRM readiness', zh: '可接 CRM' },
    metric: { en: 'Next action ready', zh: '下一步可行动' },
    copy: {
      en: 'The system prepares member segments, retention signals, risk buckets, and exports for follow-up workflows.',
      zh: '系统准备会员分群、留存信号、风险区间和导出资料，让后续跟进有基础。',
    },
  },
] as const;

const etReportHubSalesDeliverables = [
  {
    title: { en: 'Data import system', zh: '数据导入系统' },
    copy: {
      en: 'Transaction and Customer Excel ingest with validation rules, import history, brand scope, and cleaner storage.',
      zh: 'Transaction 与 Customer Excel 导入，包含验证规则、导入历史、品牌范围和更干净的储存层。',
    },
  },
  {
    title: { en: 'Operator dashboard', zh: '运营仪表盘' },
    copy: {
      en: 'Performance, Members, Channels, Trends, Compare Brands, diagnostics, and export-friendly report views.',
      zh: 'Performance、Members、Channels、Trends、Compare Brands、诊断和可导出的报表视图。',
    },
  },
  {
    title: { en: 'CRM-ready export layer', zh: 'CRM-ready 导出层' },
    copy: {
      en: 'Member segments, activity buckets, retention signals, and export structures that can feed later CRM workflows.',
      zh: '会员分群、活跃区间、留存信号和可接后续 CRM 工作流的导出结构。',
    },
  },
  {
    title: { en: 'System guide and handover', zh: '系统说明与交接' },
    copy: {
      en: 'A practical guide explaining data flow, formulas, conversion rules, dashboard logic, and operating limits.',
      zh: '实用说明文件，解释数据流、公式、转换规则、dashboard 逻辑和系统边界。',
    },
  },
] as const;

const etReportHubSalesProofStats = [
  {
    value: { en: '2-4 hrs/day', zh: '2-4 小时/天' },
    label: {
      en: 'Typical manual Excel reporting time that can be compressed.',
      zh: '常见 Excel 整理时间可被压缩。',
    },
  },
  {
    value: { en: '1 upload', zh: '1 次上传' },
    label: {
      en: 'Refresh daily, weekly, member, channel, and trend reports.',
      zh: '自动更新日报、周报、会员、渠道与趋势。',
    },
  },
  {
    value: { en: 'Private deployment', zh: '私有部署' },
    label: {
      en: 'Customer data can stay in the customer environment.',
      zh: '客户数据可保存在自己的系统环境。',
    },
  },
] as const;

const etReportHubSavingsRows = [
  {
    problem: { en: 'Manual daily handling of Transaction and Customer Excel', zh: '每天手工整理 Transaction 和 Customer Excel' },
    solution: { en: 'Automatic normalization, deduplication, and daily/weekly/overall reporting', zh: '上传后自动标准化、去重、生成日报/周报/总报表' },
    improvement: { en: 'Save 2-4 hours/day and reduce human errors', zh: '省 2-4 小时/天，减少人为错算' },
  },
  {
    problem: { en: 'No clear list of registered members who have not deposited', zh: '不知道哪些会员注册了但还没存款' },
    solution: { en: 'Non-conversion member filter + CRM export', zh: 'Non-conversion member filter + CRM export' },
    improvement: { en: 'Give CRM a clear daily follow-up list', zh: '让 CRM 每天有明确跟进名单' },
  },
  {
    problem: { en: 'Bonus is given, but over-giving is hard to spot', zh: 'Bonus 给出去，但不知道有没有过量' },
    solution: { en: 'Track Bonus Total, Bonus Ratio, Margin, Win Loss, and withdrawal risk', zh: '看 Bonus Total、Bonus Ratio、Margin、Win Loss、提款风险' },
    improvement: { en: 'Reduce promotion budget leakage', zh: '减少促销预算浪费' },
  },
  {
    problem: { en: 'Channels are judged only by registration count', zh: '渠道只看注册数，不知道质量' },
    solution: { en: 'Channel Analysis shows deposit, withdrawal, net, bonus, and conversion', zh: 'Channel Analysis 看存款、提款、净存款、Bonus、转化率' },
    improvement: { en: 'Move budget toward higher-quality channels', zh: '把预算集中到有质量的渠道' },
  },
  {
    problem: { en: 'Management asks for numbers and the team re-pulls Excel', zh: '老板临时问数据，团队要重新拉 Excel' },
    solution: { en: 'Performance, Member, Trend, and Brand Comparison are in one dashboard', zh: 'Performance、Member、Trend、Brand Comparison 都在 Dashboard' },
    improvement: { en: 'Faster review and less report waiting time', zh: '管理层复盘更快，少等报表' },
  },
  {
    problem: { en: 'Browser cleanup or device changes can break reporting history', zh: '清浏览器或换电脑怕数据不见' },
    solution: { en: 'Server daily_report.db, backup download, restore, and audit log', zh: '服务器 daily_report.db、备份下载、恢复、audit log' },
    improvement: { en: 'Lower data loss and operation risk', zh: '降低数据丢失和操作风险' },
  },
] as const;

const etReportHubIncludedRows = [
  {
    module: 'Data Ingest',
    included: { en: 'Transaction Excel, Customer Excel, brand selection, and Customer snapshot date.', zh: 'Transaction Excel、Customer Excel、品牌选择、Customer 快照日期。' },
    angle: { en: 'You just upload the file and you’re done. No more rebuilding a whole Excel from scratch every morning.', zh: '每天就上传一下，完事。不用再从头拼一整份 Excel。' },
  },
  {
    module: 'Normalize & SQLite',
    included: { en: 'Deduplication, field normalization, Bank Detail JSON conversion, daily_report.db.', zh: '去重、标准化字段、Bank Detail JSON 转换、daily_report.db。' },
    angle: { en: 'All those messy Excel files turn into one database you can actually search whenever.', zh: '一堆乱七八糟的 Excel，变成一个想查就查的数据库。' },
  },
  {
    module: 'Performance Report',
    included: { en: 'Daily, Weekly, Overall, deposit, withdrawal, net deposit, and transaction details.', zh: 'Daily、Weekly、Overall、存款、提款、净存款、交易明细。' },
    angle: { en: 'Boss asks for the numbers? They’re already there. Nobody scrambles to pull a spreadsheet.', zh: '老板临时问业绩，打开就有，不用让人手忙脚乱重拉数据。' },
  },
  {
    module: 'Member Analysis',
    included: { en: 'Lifetime deposit, withdrawal, bonus, LTV, last login, last deposit, and risk level.', zh: '累计存款、提款、Bonus、LTV、最近登录、最近存款、风险等级。' },
    angle: { en: 'You can see where every member stands — who’s worth chasing and who to leave for now.', zh: '每个会员什么状态一目了然，谁该跟、谁先放着，清清楚楚。' },
  },
  {
    module: 'CRM Export',
    included: { en: 'Non-conversion members, filters, search, User ID, Name, and Phone export.', zh: 'Non-conversion member、筛选、搜索、User ID、Name、Phone 导出。' },
    angle: { en: 'Your CRM team gets a ready-made list every day instead of guessing who to call.', zh: 'CRM 每天有现成名单可以打，不用靠感觉乱找人。' },
  },
  {
    module: 'Bonus Control',
    included: { en: 'Bonus Total, Bonus Ratio, Margin, Win Loss, and withdrawal risk.', zh: 'Bonus Total、Bonus Ratio、Margin、Win Loss、提款风险。' },
    angle: { en: 'See at a glance if you’re handing out too much bonus — basically whether money’s leaking.', zh: '一眼看出 bonus 是不是发太多了，钱有没有白送出去。' },
  },
  {
    module: 'Channel Analysis',
    included: { en: 'Referrer / Channel conversion, deposit, withdrawal, bonus, and net result.', zh: 'Referrer / Channel 转化、存款、提款、Bonus、净结果。' },
    angle: { en: 'Stop judging channels by sign-up count. See which ones actually bring real money in.', zh: '别只看注册多少，看出哪个渠道是真带钱进来的。' },
  },
  {
    module: 'Trend Analysis',
    included: { en: 'Daily, weekly, monthly trends, active members, amount movement, and retention signals.', zh: '日/周/月趋势、活跃会员、金额走势、留存观察。' },
    angle: { en: 'You see where things are heading, not just today’s one-day number.', zh: '看的是走势往哪走，不是盯着今天这一天的数字瞎激动。' },
  },
  {
    module: 'Brand Comparison',
    included: { en: 'Multi-brand comparison, metric selection, and timeline trends.', zh: '多品牌对比、指标选择、时间线趋势。' },
    angle: { en: 'Running a few brands or sites? Line them up side by side and spot which one’s dragging.', zh: '手上有好几个品牌/站点的话，摆一起一比，就知道哪个在拖后腿。' },
  },
  {
    module: 'Segment Analysis',
    included: { en: 'Member segments, behavior buckets, deposit/login recency, and action groups.', zh: '会员分群、行为 bucket、存款 / 登录 recency 和可行动人群。' },
    angle: { en: 'Slices your members into groups you can actually act on — ops and CRM just grab and go.', zh: '把一堆会员拆成一组组能直接动手的人群，运营和 CRM 拿了就能用。' },
  },
  {
    module: 'Wide Excel Export',
    included: { en: 'Export familiar wide-format Excel reports for teams that still need spreadsheet handoff.', zh: '导出客户熟悉的宽表格式，方便继续用 Excel 交接。' },
    angle: { en: 'Team still loves Excel? Fine — it exports the wide format they know, minus the manual assembly.', zh: '团队还想用 Excel？照样导给你，只是不用再手工拼了。' },
  },
  {
    module: 'Database Backup',
    included: { en: 'Download/restore daily_report.db, pre-restore backup, and cache refresh.', zh: '下载 / 恢复 daily_report.db、恢复前备份和缓存刷新。' },
    angle: { en: 'Clear your browser or switch laptops — the data’s still there, nothing vanishes overnight.', zh: '清个浏览器、换台电脑，数据照样在，不会一夜回到解放前。' },
  },
  {
    module: 'User Permission',
    included: { en: 'Users, roles, permissions, upload/export/settings limits.', zh: '用户、角色、权限、上传 / 导出 / 设置限制。' },
    angle: { en: 'You decide who can look, edit, upload, or export. No free-for-all.', zh: '谁能看、谁能改、谁能导出，老板说了算，不怕乱。' },
  },
  {
    module: 'Audit Log',
    included: { en: 'Login, upload, restore, and user action records.', zh: '登录、上传、恢复和用户操作记录。' },
    angle: { en: 'Something breaks? Check the log — no more going around asking “did you touch this?”', zh: '出事了能翻记录查，不用一个个问「是不是你动的」。' },
  },
  {
    module: 'Private Deployment',
    included: { en: 'Customer server, Docker, domain, and license options.', zh: '客户自己的 server / Docker / domain / license 选项。' },
    angle: { en: 'Your data sits on your own machine — not parked in some public SaaS.', zh: '数据放你自己机器上，不用交给什么公开 SaaS 保管。' },
  },
  {
    module: 'Training & Handover',
    included: { en: 'English/Chinese guides, FAQ, and handover checklist.', zh: '中英文操作文档、FAQ 和 handover checklist。' },
    angle: { en: 'We don’t just hand it over and disappear — your team actually learns to run it daily.', zh: '交付完不是丢给你自己摸，是带到团队真的会每天用为止。' },
  },
] as const;

const etReportHubRoiCards = [
  { label: { en: 'Monthly labor cost saved', zh: '每月节省人工成本' }, value: 'RM1,625' },
  { label: { en: 'Monthly estimated impact', zh: '每月可改善金额' }, value: 'RM2,725' },
  { label: { en: 'One-time launch package', zh: '一次性上线套餐' }, value: 'RM4,890' },
  { label: { en: '3-month net impact estimate', zh: '3 个月净影响估算' }, value: 'RM3,285' },
  { label: { en: 'Estimated payback', zh: '估算回本时间' }, value: { en: 'About 1.8 months', zh: '约 1.8 个月' } },
] as const;

const etReportHubPricing = [
  {
    name: { en: 'Launch Package', zh: '上线套餐' },
    price: 'RM4,890',
    suffix: { en: ' one-time', zh: ' 一次性' },
    bestFor: {
      en: 'Best for teams that already have stable Transaction / Customer exports and want a working daily-report system deployed quickly.',
      zh: '适合已经有稳定 Transaction / Customer 导出、想尽快上线一套日报系统的团队。',
    },
    points: {
      en: ['Private deployment, basic training, and daily reporting workflow', 'Transaction and Customer Excel import, dashboard, CRM-ready export, and handover guide', 'Optional maintenance, upgrades, and support can be quoted separately'],
      zh: ['包含私有部署、基础培训和日常报表流程', '包含 Transaction / Customer Excel 导入、dashboard、CRM-ready 导出和交接说明', '后续维护、升级和 support 可另外报价'],
    },
  },
] as const;

const etReportHubSalesFaq = [
  {
    q: { en: 'Why buy this instead of keeping Excel?', zh: '为什么不继续用 Excel？' },
    a: {
      en: 'Excel is fine for checking one file. It becomes expensive when the team needs repeatable imports, member logic, brand comparison, CRM export, and daily decision history.',
      zh: 'Excel 适合看单个文件。但当团队需要重复导入、会员逻辑、品牌对比、CRM 导出和每日判断记录时，它的隐藏成本会越来越高。',
    },
  },
  {
    q: { en: 'What does RM4,890 include?', zh: 'RM4,890 包含什么？' },
    a: {
      en: 'It covers the launch package: practical deployment, basic training, daily reporting workflow, and handover. Ongoing support boundaries can be quoted separately based on data volume, hosting, and team process.',
      zh: '它包含上线套餐：实际部署、基础培训、日常报表流程和交接。持续 support 边界可根据数据量、hosting 和团队流程另外报价。',
    },
  },
  {
    q: { en: 'Who should not buy it yet?', zh: '什么团队暂时不适合买？' },
    a: {
      en: 'If reporting is still casual, data exports are inconsistent, or the team does not review daily numbers, start by fixing the reporting habit first.',
      zh: '如果报表还很随意、导出格式不稳定，或团队本身不看每日数字，应该先整理报表习惯，再上系统。',
    },
  },
] as const;

const lifeVideos = [
  {
    title: { en: 'Pulau Tioman', zh: '刁曼岛' },
    href: 'https://www.youtube.com/watch?v=WMqBLHCMtps',
    embedSrc: 'https://www.youtube.com/embed/WMqBLHCMtps',
    thumbnailSrc: 'https://i.ytimg.com/vi/WMqBLHCMtps/hqdefault.jpg',
  },
  {
    title: { en: 'Desaru Surfing', zh: '迪沙鲁冲浪' },
    href: 'https://www.youtube.com/watch?v=Ingu-WLZWhA',
    embedSrc: 'https://www.youtube.com/embed/Ingu-WLZWhA',
    thumbnailSrc: 'https://i.ytimg.com/vi/Ingu-WLZWhA/hqdefault.jpg',
  },
  {
    title: { en: 'Pulau Kapas', zh: '棉花岛' },
    href: 'https://www.youtube.com/watch?v=qC8KuD9n14g',
    embedSrc: 'https://www.youtube.com/embed/qC8KuD9n14g',
    thumbnailSrc: 'https://i.ytimg.com/vi/qC8KuD9n14g/hqdefault.jpg',
  },
];

const archivedWorks = [
  {
    slug: '11-bonus-key-combo-builder',
    title: {
      en: '1+1 Bonus Key Combo Builder · Internal ops tool',
      zh: '1+1 奖金密钥组合构建器｜内部运营工具',
    },
    origin: {
      en: 'Archived from an internal utility I ran on a former domain—built for campaign ops who lived in combinations, not slides.',
      zh: '归档自曾托管在旧域名上的内部小工具：给天天和「组合、申领、条款」打交道的活动运营用，而不是给幻灯片用。',
    },
    summary: {
      en: '“1+1” style promos sound simple until you are in a hurry: the wrong pairing, a duplicate claim, or a top-slot rule that only surfaces after publish. This page was a working surface to assemble provider mixes with constraints baked in—so the team could see conflicts before they became customer-facing mistakes.',
      zh: '「1+1」听起来很轻巧，真正急的时候才会踩雷：配错合作方、重复申领、或置顶位规则要上线后才发现。这个页面是把「能申领的组合」放在一张可操作的桌面上——让冲突尽量出在发布前，而不是出在客诉里。',
    },
    sections: [
      {
        heading: { en: 'What was actually broken', zh: '当时真正卡在哪' },
        points: {
          en: [
            'Combinations were often negotiated in chat and spreadsheets—fast to type, slow to audit, easy to contradict a week later.',
            'Duplicate claims and incompatible top placements were the expensive mistakes; they rarely looked “urgent” until finance or support pinged you.',
            'Without a shared object model, “what is allowed” lived in tribal knowledge instead of something the whole desk could point at.',
          ],
          zh: [
            '组合常在聊天与表格里拼出来——打得快，难审计，过两周就容易和口头约定打架。',
            '重复申领、置顶位不兼容这类问题，成本很高，却往往要等到财务或客服找来才显得「急」。',
            '没有共用的对象模型时，「到底能不能这样配」会变成小圈子经验，而不是全组能对齐的参照。',
          ],
        },
      },
      {
        heading: { en: 'How the UI encoded the rules', zh: '界面怎么把规则写死' },
        points: {
          en: [
            'Partner-first layout: cards, tier visibility, and claim actions were the spine—not decorative chrome.',
            'Used-partner state prevented “double-tap” mistakes when the same provider had already been committed in a flow.',
            'A top-position slot model checked ranking compatibility before the combo was treated as final—cheap insurance against late surprises.',
            'Combo counts and slot occupancy updated in-page so operators always knew whether a mix was still “open” or already full.',
            'The goal was a repeatable claim-and-track rhythm: same desk, same object language, fewer one-off hero saves.',
          ],
          zh: [
            '以合作方为骨架：卡片、层级可见性、申领动作是主轴，而不是堆装饰。',
            '「已使用合作方」状态用来挡住流程里重复点选——减少同一供应方被误绑两次。',
            '置顶位槽位在「视为定稿」前就做排序兼容性校验——用便宜的前置检查换晚场惊吓。',
            '组合数量与槽位占用实时落在页面上，运营随时知道这套配方还能不能塞、是不是已经满。',
            '目标是一条可重复的申领与跟踪节奏：同一套对象语言，少几次靠个人救火。',
          ],
        },
      },
      {
        heading: { en: 'Partner catalog and clause context', zh: '合作方清单与条款语境' },
        points: {
          en: [
            'Each row was not just a logo—it carried the operational clauses that actually change behavior: top-placement requirements, banner obligations, campaign text, and other T&C hooks.',
            'Full partner set captured in the builder included Rich Gaming, Evo888H5, MegaH5, WF Gaming, EpicWin, UU Slots, AFB, Advant Play, 888King, BT Gaming, Creative Gaming, BNG, Joker, Meta Gaming, CP Games, PEGASUS, CrowdPlay, RSG, PlayStar, Mancala Gaming, and ClotPlay.',
            'I biased the product toward execution safety and auditability—if it looked boring, that usually meant fewer midnight messages.',
          ],
          zh: [
            '每一行不只是 logo，而是带着会改变行为的条款语境：置顶要求、横幅义务、活动文案与其它 T&C 挂钩。',
            '工具内覆盖的合作方集合包括：Rich Gaming、Evo888H5、MegaH5、WF Gaming、EpicWin、UU Slots、AFB、Advant Play、888King、BT Gaming、Creative Gaming、BNG、Joker、Meta Gaming、CP Games、PEGASUS、CrowdPlay、RSG、PlayStar、Mancala Gaming、ClotPlay 等。',
            '我刻意把产品偏向「执行安全、可审计」——界面若显得朴素，通常意味着半夜少几条消息。',
          ],
        },
      },
    ],
  },
  {
    slug: 'atlantis-ui-ux-prototype',
    title: { en: 'Atlantis Website UI/UX Prototype', zh: 'Atlantis 网站 UI/UX 原型' },
    origin: { en: 'Archived from previous Adobe XD prototype link.', zh: '归档自历史 Adobe XD 原型链接。' },
    summary: {
      en: 'This record preserves the design intent of the Atlantis website revamp for both desktop and mobile experiences.',
      zh: '本记录保留 Atlantis 网站改版在桌面端与移动端的设计意图。',
    },
    externalLink: 'https://xd.adobe.com/view/26a08b2d-feb3-429e-9c76-45cf3eed8274-73f3/',
    externalLabel: { en: 'Open Adobe XD Prototype', zh: '打开 Adobe XD 原型' },
    sections: [
      {
        heading: { en: 'Design Direction', zh: '设计方向' },
        points: {
          en: [
            'Rebuilt the website structure to improve clarity, hierarchy, and conversion flow.',
            'Aligned desktop and mobile layouts under one coherent brand language.',
            'Prioritized practical navigation and content readability for marketing audiences.',
          ],
          zh: [
            '重构网站结构，提升清晰度、层级与转化路径。',
            '在统一品牌语言下对齐桌面与移动布局。',
            '优先保证实用导航与营销受众的可读性。',
          ],
        },
      },
      {
        heading: { en: 'Execution Context', zh: '落地语境' },
        points: {
          en: [
            'Used as a handoff artifact for implementation and stakeholder alignment.',
            'Captured a full-site UX baseline before engineering delivery.',
            'Served as the reference layer for iterative visual refinement.',
          ],
          zh: [
            '作为交付物，用于研发落地与干系人对齐。',
            '在工程交付前沉淀全站 UX 基线。',
            '作为后续视觉迭代的对照层。',
          ],
        },
      },
    ],
  },
  {
    slug: 'soccerking-project',
    title: { en: 'Soccerking · Football Social Content', zh: 'Soccerking｜足球社媒内容' },
    origin: {
      en: 'Archived from my Black Sire chapter (~2018–2021). Soccerking was one of the pages I lived in daily.',
      zh: '归档自 Black Sire 时期（约 2018–2021）。Soccerking 是我当时几乎天天盯的主页之一。',
    },
    summary: {
      en: 'Match days are noisy; the real fight is the few hours after the final whistle when attention is still warm. I helped the team see content as three different jobs—pull people in, get them to react, give them something worth sharing—then wired that into templates and cadence so we were not improvising in the group chat every night.',
      zh: '比赛日很吵，真正的窗口往往在终场后那几小时——热度还在，手却容易乱。我做的是帮团队用「三种帖子、三件不同的活」来看内容：谁负责把人拉进来，谁负责让人点赞留言，谁适合被转发；再落到模板和排期上，避免每晚在群里临时救火。',
    },
    imageGallery: [
      {
        src: '/archive-images/soccerking/icon.png',
        alt: { en: 'Soccerking project icon', zh: 'Soccerking 项目图标' },
        caption: { en: 'Brand mark used on the page at the time.', zh: '当时页面使用的品牌图标。' },
      },
      {
        src: '/archive-images/soccerking/P1.png',
        alt: { en: 'Soccerking content planning or type overview screenshot', zh: 'Soccerking 内容规划或类型总览截图' },
        caption: { en: 'How post types sat next to each other in planning.', zh: '规划里几种帖子如何并排对齐。' },
      },
      {
        src: '/archive-images/soccerking/P2.png',
        alt: { en: 'Soccerking link or highlight post example', zh: 'Soccerking 链接或高光帖示例' },
        caption: { en: 'Link-style surface for traffic and highlight distribution.', zh: '偏链接形态：承接引流与高光分发。' },
      },
      {
        src: '/archive-images/soccerking/P3.png',
        alt: { en: 'Soccerking photo post or engagement layout', zh: 'Soccerking 图片帖或互动版式' },
        caption: { en: 'Photo-led layout tuned for comments and lightweight actions.', zh: '偏图片形态：引导评论与轻互动。' },
      },
      {
        src: '/archive-images/soccerking/P4.png',
        alt: { en: 'Soccerking album or informative carousel', zh: 'Soccerking 相册或可分享资讯' },
        caption: { en: 'Album / carousel pattern for shareable explainers.', zh: '相册 / 轮播：适合可转发的资讯向内容。' },
      },
      {
        src: '/archive-images/soccerking/P5.png',
        alt: { en: 'Soccerking template, workflow, or campaign capture', zh: 'Soccerking 模板、流程或活动截图' },
        caption: { en: 'Template or workflow capture from the post-match sprint.', zh: '赛后抢发阶段的模板或流程留底。' },
      },
    ],
    sections: [
      {
        heading: { en: 'What was actually broken', zh: '当时真正卡在哪' },
        points: {
          en: [
            'One-off “big idea” posts could spike reach, but they did not teach the team what to do next Tuesday.',
            'Link, photo, and album formats were all in use, yet the why behind each format was fuzzy—so priorities argued instead of compounding.',
            'After matches, speed mattered; without a shared template, quality swung between hero saves and silent gaps.',
          ],
          zh: [
            '偶尔一条「爆款」能带来峰值，但团队不知道下周二该复制什么。',
            '链接、图片、相册都在用，但各自要解决的题不清楚，容易在群里争优先级而不是叠加效果。',
            '赛后窗口短，没有共用模板时，质量就会在「神救场」和「空窗」之间摇摆。',
          ],
        },
      },
      {
        heading: { en: 'Three post types, three jobs', zh: '三种帖子，三件不同的活' },
        points: {
          en: [
            'Link posts: pull traffic in and ship highlights while search and share intent is still hot.',
            'Photo posts: earn Reacts and comments with clear, low-friction prompts—not decoration for its own sake.',
            'Album posts: package explainers people can forward; built for saves and reshares, not just impressions.',
            'Naming the job before naming the creative kept briefs shorter and reviews less emotional.',
          ],
          zh: [
            '链接帖：在搜索与分享意愿还在时，把人带进来并把高光送出去。',
            '图片帖：用清晰、低摩擦的引导换互动——图不是为好看而堆。',
            '相册帖：把资讯包成「愿意转给好友」的形态，看重收藏与转发，而不只是曝光。',
            '先讲清楚「这条帖要干什么」，再谈创意，Brief 会短很多，争执也少很多。',
          ],
        },
      },
      {
        heading: { en: 'Cadence, templates, and what we watched', zh: '排期、模板，以及我们看什么数' },
        points: {
          en: [
            'Match-led rhythm: templates shortened the path from full-time to publish so the page did not go quiet when everyone was tired.',
            'Facebook Page insights framed which post type earned reach versus depth; we used that to adjust the mix, not to chase a single vanity metric.',
            'Paid and organic loops (likes, shares, tags, landing experiments) sat beside this system—I treated ads as acceleration, not a replacement for clear organic jobs.',
          ],
          zh: [
            '比赛驱动节奏：模板把「终场 → 发出」的路径压短，避免大家累了主页却断更。',
            '主页洞察用来看「哪种帖型在吃 reach、哪种在吃深度」，用来调比例，而不是盯单一虚荣指标。',
            '点赞、分享、标注与落地实验等付费/活动闭环叠在这套之上——我把广告当放大器，而不是替代清晰的有机分工。',
          ],
        },
      },
    ],
  },
];

const normalizePath = (value: string) => {
  if (!value) return '/';
  const trimmed = value.replace(/\/+$/, '');
  return trimmed || '/';
};

const joinBasePath = (base: string, path: string) => {
  const safeBase = base.endsWith('/') ? base : `${base}/`;
  const safePath = path.replace(/^\/+/, '');
  const logicalRoute = `/${safePath}`.replace(/\/+$/, '') || '/';
  const onChineseRoute = typeof window !== 'undefined'
    && /(?:^|\/)zh(?:\/|$)/.test(window.location.pathname);
  if (onChineseRoute && routeSeoForPath(logicalRoute)) {
    return logicalRoute === '/' ? `${safeBase}zh/` : `${safeBase}zh/${safePath}`;
  }
  return `${safeBase}${safePath}`;
};

const resolveAssetPath = (base: string, value: string) => {
  if (/^(?:[a-z]+:)?\/\//i.test(value)) return value;
  return joinBasePath(base, value);
};

const LANGUAGE_STORAGE_KEY = 'eden-portfolio-language';
const THEME_STORAGE_KEY = 'eden-portfolio-theme';
const GUEST_TOPIC_STORAGE_KEY = 'eden-guest-topic-board';
const AUTO_THEME_DAY_START_HOUR = 7;
const AUTO_THEME_NIGHT_START_HOUR = 19;

type GuestTopicEntry = {
  id: string;
  kind: 'topic' | 'comment';
  name: string;
  topic: string;
  message: string;
  createdAt: string;
};

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

const readStoredGuestTopics = (): GuestTopicEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(GUEST_TOPIC_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is GuestTopicEntry => {
      return (
        item &&
        typeof item.id === 'string' &&
        (item.kind === 'topic' || item.kind === 'comment') &&
        typeof item.name === 'string' &&
        typeof item.topic === 'string' &&
        typeof item.message === 'string' &&
        typeof item.createdAt === 'string'
      );
    });
  } catch {
    return [];
  }
};

const writeStoredGuestTopics = (entries: GuestTopicEntry[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(GUEST_TOPIC_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore storage failures
  }
};

const LanguageToggle: React.FC<{
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  compactOnSelection?: boolean;
}> = ({ language, setLanguage, compactOnSelection = false }) => {
  const [isExpanded, setIsExpanded] = React.useState(() => !compactOnSelection);

  React.useEffect(() => {
    setIsExpanded(!compactOnSelection);
  }, [compactOnSelection, language]);

  const isCompact = compactOnSelection && !isExpanded;
  const options = [
    { value: 'en' as const, label: 'English', visibleLabel: <span>EN</span> },
    {
      value: 'zh' as const,
      label: '中文',
      visibleLabel: <><span className="header-language-label-full">中文</span><span className="header-language-label-short hidden" aria-hidden="true">中</span></>,
    },
  ];

  return (
    <div className={`header-language-toggle inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1${isCompact ? ' header-toggle-collapsed' : ''}`}>
      {options.map((option) => {
        const isActive = language === option.value;
        const isHidden = isCompact && !isActive;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (isCompact && isActive) {
                setIsExpanded(true);
                return;
              }

              setLanguage(option.value);
              if (compactOnSelection) setIsExpanded(false);
            }}
            className={`header-language-option rounded-full px-3 py-1 text-xs font-semibold ${
              isActive ? 'bg-eden-mint text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }${isHidden ? ' header-toggle-option-hidden' : ''}`}
            aria-label={isCompact && isActive ? `${option.label}，显示语言选项` : `Switch language to ${option.label}`}
            aria-pressed={isActive}
            aria-expanded={compactOnSelection && isActive ? isExpanded : undefined}
            aria-hidden={isHidden || undefined}
            tabIndex={isHidden ? -1 : undefined}
          >
            {option.visibleLabel}
          </button>
        );
      })}
    </div>
  );
};

const ThemeToggle: React.FC<{
  language: Language;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
  compactOnSelection?: boolean;
}> = ({ language, themePreference, theme, setThemePreference, compactOnSelection = false }) => {
  const [isExpanded, setIsExpanded] = React.useState(() => !compactOnSelection);
  const options = [
    {
      value: 'auto' as const,
      label: language === 'zh' ? '自动' : 'Auto',
      icon: Clock3,
      activeClass: 'bg-eden-mint text-stone-900 shadow-sm',
    },
    {
      value: 'light' as const,
      label: language === 'zh' ? '浅色' : 'Light',
      icon: SunMedium,
      activeClass: 'bg-stone-200 text-stone-900 shadow-sm',
    },
    {
      value: 'dark' as const,
      label: language === 'zh' ? '深色' : 'Dark',
      icon: MoonStar,
      activeClass: 'bg-stone-900 text-white shadow-sm',
    },
  ] as const;

  const autoStatus =
    themePreference === 'auto'
      ? language === 'zh'
        ? `按本地时间自动切换，目前为${theme === 'dark' ? '深色' : '浅色'}`
        : `Automatically switches by local time, currently ${theme}`
      : undefined;

  React.useEffect(() => {
    setIsExpanded(!compactOnSelection);
  }, [compactOnSelection, themePreference]);

  const isCompact = compactOnSelection && !isExpanded;

  return (
    <div
      className={`header-theme-toggle inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1${isCompact ? ' header-toggle-collapsed' : ''}`}
      title={autoStatus}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = themePreference === option.value;
        const isHidden = isCompact && !isActive;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (isCompact && isActive) {
                setIsExpanded(true);
                return;
              }

              setThemePreference(option.value);
              if (compactOnSelection) setIsExpanded(false);
            }}
            className={`header-theme-option inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              isActive ? option.activeClass : 'text-stone-600 hover:text-stone-900'
            }${isHidden ? ' header-toggle-option-hidden' : ''}`}
            aria-pressed={isActive}
            aria-expanded={compactOnSelection && isActive ? isExpanded : undefined}
            aria-hidden={isHidden || undefined}
            tabIndex={isHidden ? -1 : undefined}
            aria-label={
              language === 'zh'
                ? `${option.label}${isActive ? '，目前已选择' : ''}`
                : `${option.label}${isActive ? ', currently selected' : ''}`
            }
            title={
              isCompact && isActive
                ? language === 'zh' ? '显示主题选项' : 'Show theme options'
                : option.value === 'auto'
                ? autoStatus
                : language === 'zh'
                  ? `切换到${option.label}`
                  : `Switch to ${option.label}`
            }
          >
            <Icon size={13} />
            <span className="header-theme-label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const HeaderControls: React.FC<{
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
  compactThemeOnSelection?: boolean;
  compactLanguageOnSelection?: boolean;
}> = ({ language, setLanguage, themePreference, theme, setThemePreference, compactThemeOnSelection = true, compactLanguageOnSelection = true }) => (
  <div className="header-controls flex items-center gap-3">
    <ThemeToggle
      language={language}
      themePreference={themePreference}
      theme={theme}
      setThemePreference={setThemePreference}
      compactOnSelection={compactThemeOnSelection}
    />
    <LanguageToggle language={language} setLanguage={setLanguage} compactOnSelection={compactLanguageOnSelection} />
  </div>
);

type TopicMarketQuestion = {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  tone: 'mint' | 'amber' | 'blue' | 'pink' | 'violet';
  categoryKey: 'all' | 'llm-wiki' | 'ai-workflow' | 'systems' | 'content' | 'signals';
  category: Record<Language, string>;
  title: Record<Language, string>;
  outcomes: Array<{
    label: Record<Language, string>;
    probability: number;
  }>;
  volume: string;
  cadence?: Record<Language, string>;
};

const topicMarketQuestions: TopicMarketQuestion[] = [
  {
    id: 'wiki-memory-boundary',
    icon: Database,
    tone: 'mint',
    categoryKey: 'llm-wiki',
    category: { en: 'LLM Wiki', zh: 'LLM Wiki' },
    title: {
      en: 'What should an LLM-maintained wiki remember?',
      zh: 'LLM 维护的 wiki 应该记住什么？',
    },
    outcomes: [
      { label: { en: 'Reusable workflows', zh: '可复用流程' }, probability: 82 },
      { label: { en: 'Claims and decisions', zh: '关键判断' }, probability: 74 },
    ],
    volume: '128 answers',
    cadence: { en: 'Weekly', zh: '每周' },
  },
  {
    id: 'workflow-breakpoint',
    icon: GitBranch,
    tone: 'blue',
    categoryKey: 'ai-workflow',
    category: { en: 'AI workflow', zh: 'AI 工作流' },
    title: {
      en: 'Where do AI workflows break first in real projects?',
      zh: 'AI 工作流在真实项目里最先卡在哪里？',
    },
    outcomes: [
      { label: { en: 'Bad context', zh: '上下文太差' }, probability: 68 },
      { label: { en: 'No verification', zh: '没有验证' }, probability: 61 },
    ],
    volume: '94 answers',
  },
  {
    id: 'system-worthy-work',
    icon: Layers,
    tone: 'amber',
    categoryKey: 'systems',
    category: { en: 'Systems', zh: '系统化' },
    title: {
      en: 'Which scattered work should become a reusable system?',
      zh: '哪些散乱工作最应该变成可复用系统？',
    },
    outcomes: [
      { label: { en: 'Repeated reports', zh: '重复报表' }, probability: 89 },
      { label: { en: 'Project handoff', zh: '项目交接' }, probability: 76 },
    ],
    volume: '211 answers',
    cadence: { en: 'NEW', zh: 'NEW' },
  },
  {
    id: 'essay-or-tool',
    icon: Brain,
    tone: 'violet',
    categoryKey: 'content',
    category: { en: 'Content', zh: '内容' },
    title: {
      en: 'Should this idea become an essay, a tool, or a wiki page?',
      zh: '一个想法应该变成文章、工具，还是 wiki page？',
    },
    outcomes: [
      { label: { en: 'Wiki page', zh: 'Wiki page' }, probability: 57 },
      { label: { en: 'Tool', zh: '工具' }, probability: 31 },
    ],
    volume: '76 answers',
  },
  {
    id: 'worth-answering',
    icon: SearchCheck,
    tone: 'pink',
    categoryKey: 'signals',
    category: { en: 'Topic signal', zh: '选题信号' },
    title: {
      en: 'Is this question worth answering publicly?',
      zh: '这个问题值得公开回答吗？',
    },
    outcomes: [
      { label: { en: 'Yes, public answer', zh: '值得公开回答' }, probability: 73 },
      { label: { en: 'Private note only', zh: '只适合私下记录' }, probability: 19 },
    ],
    volume: '52 answers',
  },
  {
    id: 'source-summary',
    icon: MessageSquare,
    tone: 'mint',
    categoryKey: 'llm-wiki',
    category: { en: 'LLM Wiki', zh: 'LLM Wiki' },
    title: {
      en: 'Should raw sources be summarized before synthesis?',
      zh: 'Raw source 需要先 summary 再 synthesis 吗？',
    },
    outcomes: [
      { label: { en: 'Always summarize first', zh: '永远先 summary' }, probability: 64 },
      { label: { en: 'Only for long sources', zh: '长 source 才需要' }, probability: 28 },
    ],
    volume: '37 answers',
  },
  {
    id: 'agent-handoff',
    icon: UserRound,
    tone: 'blue',
    categoryKey: 'ai-workflow',
    category: { en: 'AI workflow', zh: 'AI 工作流' },
    title: {
      en: 'What makes an agent handoff actually useful?',
      zh: '什么样的 agent handoff 才真的有用？',
    },
    outcomes: [
      { label: { en: 'Concrete changed files', zh: '清楚列出改动文件' }, probability: 81 },
      { label: { en: 'Known risks', zh: '明确剩余风险' }, probability: 69 },
    ],
    volume: '143 answers',
    cadence: { en: 'Weekly', zh: '每周' },
  },
  {
    id: 'proof-through-builds',
    icon: TrendingUp,
    tone: 'amber',
    categoryKey: 'signals',
    category: { en: 'Topic signal', zh: '选题信号' },
    title: {
      en: 'Does proof through builds beat a traditional portfolio?',
      zh: '用真实 build 证明，是否比传统 portfolio 更有力？',
    },
    outcomes: [
      { label: { en: 'Yes, stronger signal', zh: '是，更强信号' }, probability: 91 },
      { label: { en: 'Depends on reader', zh: '看受众' }, probability: 22 },
    ],
    volume: '188 answers',
  },
];

const formatGuestTopicDate = (value: string, language: Language) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const GuestTopicsPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [entries, setEntries] = React.useState<GuestTopicEntry[]>(() => readStoredGuestTopics());
  const [activeCategory, setActiveCategory] = React.useState<TopicMarketQuestion['categoryKey']>('llm-wiki');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [guestName, setGuestName] = React.useState('');
  const [newTopic, setNewTopic] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const displayName = guestName.trim() || (isZh ? 'Guest 访客' : 'Guest');
  const storedEntries = entries.slice(0, 6);
  const categoryItems: Array<{ key: TopicMarketQuestion['categoryKey']; label: Record<Language, string> }> = [
    { key: 'all', label: { en: 'All', zh: 'All' } },
    { key: 'llm-wiki', label: { en: 'LLM Wiki', zh: 'LLM Wiki' } },
    { key: 'ai-workflow', label: { en: 'AI Workflow', zh: 'AI 工作流' } },
    { key: 'systems', label: { en: 'Systems', zh: '系统化' } },
    { key: 'content', label: { en: 'Content', zh: '内容' } },
    { key: 'signals', label: { en: 'Signals', zh: '信号' } },
  ];
  const marketNavItems = [
    { key: 'all', label: isZh ? 'Trending' : 'Trending' },
    { key: 'llm-wiki', label: 'LLM Wiki' },
    { key: 'ai-workflow', label: isZh ? 'AI 工作流' : 'AI Workflow' },
    { key: 'systems', label: isZh ? '系统化' : 'Systems' },
    { key: 'content', label: isZh ? '内容' : 'Content' },
    { key: 'signals', label: isZh ? '选题信号' : 'Signals' },
  ] satisfies Array<{ key: TopicMarketQuestion['categoryKey']; label: string }>;
  const filteredQuestions = topicMarketQuestions.filter((item) => {
    const haystack = [
      item.category[language],
      item.title[language],
      ...item.outcomes.map((outcome) => outcome.label[language]),
    ].join(' ').toLowerCase();
    const categoryMatches = activeCategory === 'all' || item.categoryKey === activeCategory;
    const searchMatches = !searchTerm.trim() || haystack.includes(searchTerm.trim().toLowerCase());
    return categoryMatches && searchMatches;
  });
  const activeCategoryLabel = categoryItems.find((item) => item.key === activeCategory)?.label[language] ?? 'All';

  const saveEntries = (nextEntries: GuestTopicEntry[]) => {
    setEntries(nextEntries);
    writeStoredGuestTopics(nextEntries);
  };

  const handleMarketAnswer = (question: TopicMarketQuestion, outcomeLabel: string, side: 'Yes' | 'No') => {
    const nextEntry: GuestTopicEntry = {
      id: `answer-${Date.now()}`,
      kind: 'comment',
      name: displayName,
      topic: question.title[language],
      message: `${outcomeLabel} — ${side}`,
      createdAt: new Date().toISOString(),
    };
    saveEntries([nextEntry, ...entries]);
  };

  const handleCreateTopic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const topic = newTopic.trim();
    if (!topic) return;
    const nextEntry: GuestTopicEntry = {
      id: `topic-${Date.now()}`,
      kind: 'topic',
      name: displayName,
      topic: isZh ? 'Guest 新问题' : 'Guest new question',
      message: topic,
      createdAt: new Date().toISOString(),
    };
    saveEntries([nextEntry, ...entries]);
    setNewTopic('');
  };

  const handleCopyBoard = async () => {
    const summary = entries
      .map((entry) => {
        const label = entry.kind === 'topic' ? 'Topic' : 'Answer';
        return `[${label}] ${entry.topic}\nFrom: ${entry.name}\n${entry.message}`;
      })
      .join('\n\n');
    const fallbackText = summary || (isZh ? '目前还没有本地留言。' : 'No local submissions yet.');
    try {
      await navigator.clipboard.writeText(fallbackText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page-shell topics-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <header className="topics-market-topbar">
        <div className="topics-market-brand">
          <a href={homeHref} className="topics-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
            <span>{isZh ? '主页' : 'Home'}</span>
          </a>
          <strong>Eden Markets</strong>
        </div>
        <label className="topics-market-search">
          <Search size={21} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={isZh ? 'Search topics...' : 'Search topics...'}
          />
        </label>
        <a href="#how-it-works" className="topics-help-link">
          <SearchCheck size={16} />
          {isZh ? 'How it works' : 'How it works'}
        </a>
        <div className="topics-market-actions">
          <a href="#create-topic" className="topics-login-link">{isZh ? 'Guest' : 'Guest'}</a>
          <a href="#create-topic" className="topics-signup-button">{isZh ? 'New Topic' : 'New Topic'}</a>
          <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
        </div>
      </header>

      <nav className="topics-market-nav" aria-label={isZh ? 'Topic categories' : 'Topic categories'}>
        {marketNavItems.map((item, index) => (
          <button
            key={item.key}
            type="button"
            className={activeCategory === item.key ? 'topics-market-nav-active' : ''}
            onClick={() => setActiveCategory(item.key)}
          >
            {index === 0 && <TrendingUp size={16} />}
            {item.label}
          </button>
        ))}
      </nav>

      <main className="topics-market-shell">
        <aside className="topics-market-sidebar" aria-label={isZh ? 'Categories' : 'Categories'}>
          {categoryItems.map((item) => {
            const count = item.key === 'all'
              ? topicMarketQuestions.length
              : topicMarketQuestions.filter((question) => question.categoryKey === item.key).length;
            return (
              <button
                key={item.key}
                type="button"
                className={activeCategory === item.key ? 'topics-sidebar-active' : ''}
                onClick={() => setActiveCategory(item.key)}
              >
                <span>{item.label[language]}</span>
                <strong>{count}</strong>
              </button>
            );
          })}
          <form id="create-topic" className="topics-create-card" onSubmit={handleCreateTopic}>
            <p className="topics-mini-label">{isZh ? 'Guest market' : 'Guest market'}</p>
            <label>
              <span>{isZh ? '名字' : 'Name'}</span>
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder={isZh ? 'Guest' : 'Guest'}
              />
            </label>
            <label>
              <span>{isZh ? '新问题' : 'New question'}</span>
              <textarea
                value={newTopic}
                onChange={(event) => setNewTopic(event.target.value)}
                placeholder={isZh ? '留下一个新的 topic...' : 'Leave a new topic...'}
                rows={4}
              />
            </label>
            <button type="submit">
              <Plus size={16} />
              {isZh ? 'Create' : 'Create'}
            </button>
          </form>
        </aside>

        <section className="topics-market-main" id="topic-market">
          <div className="topics-market-main-head">
            <div>
              <p>{isZh ? 'Markets / Knowledge systems' : 'Markets / Knowledge systems'}</p>
              <h1>{activeCategoryLabel}</h1>
            </div>
            <div className="topics-market-tools" aria-hidden>
              <Search size={22} />
              <SlidersHorizontal size={22} />
              <Bookmark size={22} />
            </div>
          </div>

          <div className="topics-card-grid">
            {filteredQuestions.map((question) => {
              const Icon = question.icon;
              return (
                <article key={question.id} className={`topics-market-card topics-tone-${question.tone}`}>
                  <div className="topics-market-card-head">
                    <span className="topics-market-icon" aria-hidden>
                      <Icon size={25} strokeWidth={2.25} />
                    </span>
                    <h2>{question.title[language]}</h2>
                  </div>
                  <div className="topics-outcome-list">
                    {question.outcomes.map((outcome) => (
                      <div key={outcome.label.en} className="topics-outcome-row">
                        <span className="topics-outcome-label">{outcome.label[language]}</span>
                        <strong>{outcome.probability}%</strong>
                        <button type="button" className="topics-yes-button" onClick={() => handleMarketAnswer(question, outcome.label[language], 'Yes')}>
                          Yes
                        </button>
                        <button type="button" className="topics-no-button" onClick={() => handleMarketAnswer(question, outcome.label[language], 'No')}>
                          No
                        </button>
                      </div>
                    ))}
                  </div>
                  <footer className="topics-market-card-footer">
                    <span>{question.volume}</span>
                    {question.cadence && <span>{question.cadence[language]}</span>}
                    <Bookmark size={18} />
                  </footer>
                </article>
              );
            })}

            <form className="topics-market-card topics-create-market-card" onSubmit={handleCreateTopic}>
              <div className="topics-market-card-head">
                <span className="topics-market-icon" aria-hidden>
                  <Plus size={25} strokeWidth={2.25} />
                </span>
                <h2>{isZh ? '你想让 Eden 回答什么？' : 'What should Eden answer next?'}</h2>
              </div>
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder={isZh ? 'Guest / 你的名字' : 'Guest / your name'}
              />
              <textarea
                value={newTopic}
                onChange={(event) => setNewTopic(event.target.value)}
                placeholder={isZh ? '写一个新问题，或补充你想讨论的 topic。' : 'Write a new question or topic you want to discuss.'}
                rows={5}
              />
              <button type="submit" className="topics-create-market-button">
                <Send size={17} />
                {isZh ? '提交新问题' : 'Submit question'}
              </button>
              <footer className="topics-market-card-footer">
                <span>{isZh ? 'Stored locally' : 'Stored locally'}</span>
                <Bookmark size={18} />
              </footer>
            </form>
          </div>

          <section id="local-board" className="topics-local-board">
            <div className="topics-local-head">
              <div>
                <p>{isZh ? 'Local activity' : 'Local activity'}</p>
                <h2>{isZh ? '这台浏览器里的回答。' : 'Answers in this browser.'}</h2>
              </div>
              <button type="button" onClick={handleCopyBoard}>
                <Copy size={16} />
                {copied ? (isZh ? '已复制' : 'Copied') : isZh ? '复制给 Eden' : 'Copy'}
              </button>
            </div>

            <div className="topics-local-list">
              {storedEntries.length > 0 ? (
                storedEntries.map((entry) => (
                  <article key={entry.id}>
                    <span>{entry.kind === 'topic' ? (isZh ? 'Guest topic' : 'Guest topic') : isZh ? 'Answer' : 'Answer'}</span>
                    <h3>{entry.topic}</h3>
                    <p>{entry.message}</p>
                    <small>
                      <UserRound size={14} />
                      {entry.name} · {formatGuestTopicDate(entry.createdAt, language)}
                    </small>
                  </article>
                ))
              ) : (
                <div className="topics-empty-state">
                  <MessageSquare size={24} />
                  <p>
                    {isZh
                      ? '还没有本地回答。点击任一卡片的 Yes / No，或创建新问题。'
                      : 'No local answers yet. Click Yes / No on any card, or create a new question.'}
                  </p>
                </div>
              )}
            </div>

            <div id="how-it-works" className="topics-note-panel">
              <p className="topics-mini-label">{isZh ? 'Persistence note' : 'Persistence note'}</p>
              <p>
                {isZh
                  ? '当前版本不连接数据库，所以不同访客之间不会互相看到回答。要做真正公开 topic market，下一步需要接 Firebase / Supabase / GitHub Issues / Formspree 这类持久化层。'
                  : 'This version does not connect to a database, so different visitors will not see each other’s answers. A public topic market needs Firebase, Supabase, GitHub Issues, or a form service next.'}
              </p>
              <a href={homeHref}>{isZh ? '返回主页' : 'Back home'} <span aria-hidden>›</span></a>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

const ProjectCssGalleryPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';

  return (
    <div className="page-shell projects-page project-css-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="projects-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={projectsHref} className="projects-back-link inline-flex items-center gap-2 text-sm font-medium">
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
          </div>

          <header className="project-css-hero py-16 text-center md:py-24">
            <p className="projects-kicker mx-auto">{isZh ? 'CSS art / Icon system' : 'CSS art / Icon system'}</p>
            <h1 className="project-css-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '把站内 CSS 图腾集中看。' : 'A review board for Eden CSS art.'}
            </h1>
            <p className="project-css-subtitle mx-auto mt-5">
              {isZh
                ? '这里集中检查 Projects app icon、banner archive、System Files 和 Interests 图腾，统一看动效、比例、light / dark mode 和维护边界。'
                : 'This page gathers Projects app icons, the banner archive, System Files, and Interests visuals for reviewing motion, ratio, light/dark mode, and maintenance boundaries.'}
            </p>
          </header>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Projects page' : 'Projects page'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? 'Projects 里的 4 个 app icon' : 'The 4 app icons from Projects'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '这些是 framed app icon，有固定底和 1:1 比例。' : 'These are framed app icons with a fixed background and a 1:1 ratio.'}
              </p>
            </div>
          </section>

          <section className="project-css-board">
            {projectCssArtItems.map((item) => {
              const Icon = item.Component;
              const project = aiProjectSystems.find((candidate) => candidate.title === item.projectTitle);

              return (
                <article key={item.id} className="project-css-card">
                  <div className="project-css-icon-stage">
                    <Icon label={item.label[language]} />
                  </div>
                  <div className="project-css-card-copy">
                    <p className="projects-card-eyebrow">
                      {project ? project.eyebrow[language] : isZh ? 'Projects page' : 'Projects page'}
                    </p>
                    <h2 className="font-display text-3xl font-bold tracking-tight">{item.title}</h2>
                    <p>{project ? project.role[language] : item.copy[language]}</p>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Banner archive' : 'Banner archive'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? '首页的 5 张项目 banner' : 'Five project banners from Home'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '统一 16:9 比例，表达数据判断、本地发现、人生记录、细胞自动机与胶片观察。' : 'One 16:9 system for data decisions, local discovery, life records, cellular automata, and film observation.'}
              </p>
            </div>
            <div className="project-css-banner-grid">
              {homeSelectedWorkBannerItems.map((item) => {
                const Banner = item.Component;
                return (
                  <article key={item.id} className="project-css-banner-card">
                    <div className="project-css-banner-stage">
                      <Banner label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">Banner archive</p>
                      <h2 className="font-display text-3xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Home / System Files' : 'Home / System Files'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? '主页系统文件里的两个 CSS' : 'Two CSS pieces from Home System Files'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '这里补上你点名的 Projects Hub 和 Life OS RPG System。' : 'This adds the requested Projects Hub and Life OS RPG System visuals.'}
              </p>
            </div>
            <div className="project-css-board project-css-home-board">
              {homeSystemCssArtItems.map((item) => {
                const Icon = item.Component;

                return (
                  <article key={item.id} className="project-css-card project-css-home-card">
                    <div className="project-css-icon-stage project-css-home-icon-stage">
                      <Icon label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">{isZh ? 'Home / System Files' : 'Home / System Files'}</p>
                      <h2 className="font-display text-3xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Home / Interests' : 'Home / Interests'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? 'Interests 里的视觉图标' : 'Visual icons from Interests'}
              </h2>
              <p className="project-css-section-copy">
                {isZh ? '图腾保持透明底；有明确产品入口的项目可以使用固定底 app icon。' : 'Totems keep transparent backgrounds; projects with a clear product entry can use a framed app icon.'}
              </p>
            </div>
            <div className="project-css-totem-grid">
              {homeInterestCssArtItems.map((item) => {
                const Icon = item.Component;

                return (
                  <article key={item.id} className="project-css-totem-card">
                    <div className="project-css-totem-stage">
                      <Icon label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">{isZh ? 'Home / Interests' : 'Home / Interests'}</p>
                      <h2 className="font-display text-2xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Office / Framed app icons' : 'Office / Framed app icons'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? '6 个办公系统 1:1 CSS icon' : '6 office-system 1:1 CSS icons'}
              </h2>
              <p className="project-css-section-copy">
                {isZh
                  ? '根据 System Files 的克制图标语言和 framed app icon 规则设计：平面底、轻微层次、慢速动效。'
                  : 'Designed from the System Files visual language and framed app-icon rules: flat surface, quiet depth, and slow motion.'}
              </p>
            </div>
            <div className="project-css-office-grid">
              {officeIconCssArtItems.map((item) => {
                const Icon = item.Component;

                return (
                  <article key={item.id} className="project-css-card project-css-office-card">
                    <div className="project-css-icon-stage project-css-office-icon-stage">
                      <Icon label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">{isZh ? 'Office icon' : 'Office icon'}</p>
                      <h2 className="font-display text-2xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-section">
            <div className="project-css-section-head">
              <p className="projects-kicker">{isZh ? 'Elemental / 1:1 CSS' : 'Elemental / 1:1 CSS'}</p>
              <h2 className="project-css-section-title font-display font-bold tracking-tight">
                {isZh ? '元素 1:1 CSS icons' : 'Elemental 1:1 CSS icons'}
              </h2>
              <p className="project-css-section-copy">
                {isZh
                  ? '一组更 flat 的 framed 元素图标：火是大块火焰，水是清楚水滴，风是柔和风带。'
                  : 'A flatter framed elemental set: fire is a bold flame, water is a clear droplet, and wind is soft gust bands.'}
              </p>
            </div>
            <div className="project-css-office-grid project-css-elemental-grid">
              {elementalIconCssArtItems.map((item) => {
                const Icon = item.Component;

                return (
                  <article key={item.id} className="project-css-card project-css-office-card project-css-elemental-card">
                    <div className="project-css-icon-stage project-css-office-icon-stage project-css-elemental-icon-stage">
                      <Icon label={item.label[language]} />
                    </div>
                    <div className="project-css-card-copy">
                      <p className="projects-card-eyebrow">{isZh ? 'Elemental icon' : 'Elemental icon'}</p>
                      <h2 className="font-display text-2xl font-bold tracking-tight">{item.title}</h2>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="project-css-impact">
            <p className="projects-kicker">{isZh ? 'Impact' : 'Impact'}</p>
            <p>
              {isZh
                ? '影响仍然很小：这页只复用现有 CSS 组件，不改 Home 或 `/projects` 的原页面结构。页面设置为 noindex / 不进 sitemap，默认只作为直达检查页。'
                : 'Impact remains low: this page only reuses existing CSS components and does not change the original Home or `/projects` page structure. It is noindex / excluded from the sitemap by default, intended as a direct review page.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <a href={homeHref} className="projects-text-cta">
                {isZh ? '返回主页' : 'Back home'} <span aria-hidden>›</span>
              </a>
              <a href={homeHref} className="projects-text-cta projects-text-cta-muted">
                {isZh ? '回到主页' : 'Back to Home'} <span aria-hidden>›</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

type ProductSibling = {
  id: string;
  name: string;
  path: string;
  iconLabel: string;
  Icon: React.FC<{ label: string }>;
  blurb: { en: string; zh: string };
};

/** Cross-links shown in the "You might also like" row on every product page. */
const productSiblings: ProductSibling[] = [
  {
    id: 'life-os',
    name: 'Life OS',
    path: 'life-os',
    iconLabel: 'LifeOs CSS app icon',
    Icon: ProjectsLifeOsCssIcon,
    blurb: { en: 'Read yourself like a manual.', zh: '把你这个人，读成一本说明书。' },
  },
  {
    id: 'etreporthub',
    name: 'ETReportHub',
    path: 'etreporthub',
    iconLabel: 'ETReportHub CSS app icon',
    Icon: ProjectsEtReportCssIcon,
    blurb: { en: 'Turn daily Excel into clear operating decisions.', zh: '把每日 Excel 变成清楚的运营判断。' },
  },
  {
    id: 'dr-racing',
    name: 'Dr Racing',
    path: 'dr-racing',
    iconLabel: 'Dr Racing CSS app icon',
    Icon: ProjectsDrRacingCssIcon,
    blurb: { en: 'Run the whole motorcycle-loan pipeline in one dashboard.', zh: '把摩托车贷款流程放进同一个仪表台。' },
  },
  {
    id: 'jiju',
    name: 'Jiju',
    path: 'jiju-pet',
    iconLabel: 'Jiju CSS app icon',
    Icon: ProjectsJijuCssIcon,
    blurb: { en: 'Find places that truly work for you and your pet.', zh: '找到真正适合你和宠物一起去的地方。' },
  },
  {
    id: 'poker',
    name: 'Friday Poker Club',
    path: 'poker',
    iconLabel: 'Friday Poker Club CSS app icon',
    Icon: ProjectsPokerCssIcon,
    blurb: { en: 'No place to book. Just bring the crew back.', zh: '不用约地点。把那群人叫回来就好。' },
  },
];

const productSiblingCards = (baseUrl: string, excludeId: string) =>
  productSiblings
    .filter((item) => item.id !== excludeId)
    .map((item) => ({
      href: joinBasePath(baseUrl, item.path),
      name: item.name,
      blurb: item.blurb,
      icon: <item.Icon label={item.iconLabel} />,
    }));

const ETReportHubFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  salesHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, salesHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const demoUrl = 'https://edent95.github.io/daily-report-dashboard/demo/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsEtReportCssIcon label="ETReportHub CSS app icon" />}
      name="ETReportHub"
      kicker={{ en: 'Data analytics · Business tool', zh: '数据分析 · 商业工具' }}
      tagline={{ en: 'Turn daily Excel into clear operating decisions.', zh: '把每日 Excel 变成清楚的运营判断。' }}
      meta={{ en: 'Private deployment · Local SQLite · Excel in, decisions out', zh: '私有部署 · 本地 SQLite · Excel 进，判断出' }}
      primary={{ href: demoUrl, external: true, label: { en: 'View demo', zh: '查看 Demo' } }}
      secondary={{ href: salesHref, label: { en: 'Launch offer', zh: '上线方案' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: demoUrl,
        domain: 'edent95.github.io/daily-report-dashboard/demo',
        title: { en: 'Interactive ETReportHub demo', zh: 'ETReportHub 互动 Demo' },
        caption: { en: 'The public demo, running right here. Open it in a new tab for the full workspace.', zh: '公开 Demo 直接跑在这里。想看完整工作区，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'ETReportHub is a data system for operations teams that still depend on daily Excel exports. It turns separate transaction and member files into one repeatable review workflow—without rebuilding formulas, reconciling numbers, and assembling reports every morning.', zh: 'ETReportHub 是为每日依赖 Excel 的运营团队设计的数据系统。它把分散的交易与会员文件整理成统一、可重复检查的工作流，让团队不必每天重新复制公式、对数字和拼报表。' } },
        { kind: 'p', text: { en: 'The point is not another dashboard. It is knowing sooner what changed, which members need action, where a channel is losing efficiency, and what the team should handle first.', zh: '重点不是多一个 Dashboard。重点是让团队更快知道：业绩哪里变了、哪些会员需要行动、哪个渠道正在失去效率，以及今天应该先处理什么。' } },
        { kind: 'h', text: { en: 'How it works', zh: '每天怎么用' } },
        { kind: 'steps', items: [
          { title: { en: 'Upload', zh: '上传' }, text: { en: 'Drop in the daily Transaction file and the latest Customer export.', zh: '拖入每日 Transaction 与最新 Customer 文件。' } },
          { title: { en: 'Reconcile', zh: '整理' }, text: { en: 'The system checks fields, resolves members, and prevents double counting.', zh: '系统校验字段、匹配会员并避免重复计算。' } },
          { title: { en: 'Decide', zh: '判断' }, text: { en: 'Review performance, members, channels, and trends for the signals that matter.', zh: '从业绩、会员、渠道和趋势里找到异常与机会。' } },
          { title: { en: 'Act', zh: '行动' }, text: { en: 'Export the report or the CRM audience with a clear next action.', zh: '导出报表或 CRM 名单，让下一步有明确对象。' } },
        ] },
        { kind: 'h', text: { en: 'What it changes day to day', zh: '它每天改变了什么' } },
        { kind: 'p', text: { en: 'The daily work happens once. Upload the Transaction and Customer Excel, and the system cleans, reconciles, and refreshes the reports instead of asking someone to redo it by hand.', zh: '每天的活只做一遍。上传 Transaction 与 Customer Excel，系统自动整理、去重并更新报表，而不是让人再手工做一次。' } },
        { kind: 'p', text: { en: 'What changed comes first. Deposits, withdrawals, net deposit, active members, and channel movement live in one decision surface, so the morning starts with the difference rather than the data entry.', zh: '先看到哪里不对。存款、提款、净存款、活跃会员和渠道变化集中在同一个判断界面，早上从「差异」开始，而不是从「录入」开始。' } },
        { kind: 'callout', label: { en: 'From report to action', zh: '从报表到行动' }, text: { en: 'Filter members by risk, activity, deposit recency, and conversion status—then export that exact list as the next CRM action instead of describing it in a meeting.', zh: '用风险、活跃度、存款时间和转化状态筛选会员，再把这份名单直接导出成下一个 CRM 动作，而不是在会议上口头描述。' } },
        { kind: 'p', text: { en: 'The familiar handoff stays. Management can still receive the Excel they expect, while the operations team gets a clearer dashboard for the daily review. Nobody has to be retrained into a new ritual.', zh: '熟悉的交付方式保留下来。管理层仍然可以收到他们习惯的 Excel，运营团队同时拥有更清楚的 Dashboard。没有人需要被重新训练成另一套仪式。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Data boundary', zh: '数据边界' }, text: { en: 'ETReportHub uses local SQLite and is designed for private deployment. Operational data does not need to enter a public cloud just to become visible in a dashboard. Access, audit, and exports remain inside the team’s own operating boundary.', zh: 'ETReportHub 使用本地 SQLite 保存整理后的数据，并为私有部署设计。原始运营资料不需要为了看 Dashboard 而进入公共云端。权限、审计与导出仍然属于团队自己的工作边界。' } },
      ]}
      faq={[
        { q: { en: 'What files does it take?', zh: '它接受什么文件？' }, a: { en: 'The daily Transaction export and the latest Customer export, both as Excel. Those are the files most operations teams already produce, so nothing upstream has to change.', zh: '每日 Transaction 导出和最新 Customer 导出，都是 Excel。这些本来就是大多数运营团队已经在产出的文件，上游流程不用改。' } },
        { q: { en: 'Where is my data stored?', zh: '数据存在哪里？' }, a: { en: 'In a local SQLite database inside your own deployment. Raw operational data does not have to leave your environment to become visible in a dashboard.', zh: '存在你自己部署环境里的本地 SQLite 数据库。原始运营数据不需要离开你的环境，就能在 Dashboard 上看到。' } },
        { q: { en: 'Does it replace our Excel reports?', zh: '它会取代我们的 Excel 报表吗？' }, a: { en: 'Only if you want it to. Export back to Excel stays supported, so management keeps the format they know while the team reviews the dashboard.', zh: '除非你希望如此。导出回 Excel 仍然支持，管理层保留熟悉的格式，团队则看 Dashboard 做复盘。' } },
        { q: { en: 'What happens if a member appears in two files?', zh: '同一个会员出现在两份文件里怎么办？' }, a: { en: 'The reconcile step matches members and prevents double counting, which is the part that usually breaks a hand-built spreadsheet.', zh: '整理步骤会匹配会员并避免重复计算——这恰好是手工表格最容易出错的地方。' } },
        { q: { en: 'Can I try it before deploying?', zh: '可以先试再部署吗？' }, a: { en: 'Yes. The public demo above runs the real interface with sample data, so you can walk the workflow before any deployment conversation.', zh: '可以。上面的公开 Demo 用示例数据跑真实界面，你可以先走一遍流程，再谈部署。' } },
        { q: { en: 'How do I get it running for my team?', zh: '怎么让我的团队用上？' }, a: { en: 'The launch offer page covers scope, deployment, and what a rollout looks like in practice.', zh: '上线方案页面写了范围、部署方式，以及实际推行会是什么样子。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Business intelligence and operations analytics', zh: '商业智能与运营分析' }],
        [{ en: 'Input', zh: '输入格式' }, { en: 'Transaction / Customer Excel', zh: 'Transaction / Customer Excel' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Performance · Members · Channels · Trends · CRM export', zh: '业绩 · 会员 · 渠道 · 趋势 · CRM 导出' }],
        [{ en: 'Storage', zh: '存储' }, { en: 'Local SQLite', zh: '本地 SQLite' }],
        [{ en: 'Deployment', zh: '部署方式' }, { en: 'Private deployment with local database', zh: '私有部署，本地数据库' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'etreporthub')}
    />
  );
};

const DrRacingFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const demoUrl = 'https://edent95.github.io/dr-racing-dashboard-demo/demo/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsDrRacingCssIcon label="Dr Racing CSS app icon" />}
      name="Dr Racing"
      kicker={{ en: 'Loan operations · Dealership tool', zh: '贷款运营 · 车行工具' }}
      tagline={{ en: 'Run the whole motorcycle-loan pipeline in one dashboard.', zh: '把摩托车贷款流程放进同一个仪表台。' }}
      meta={{ en: 'Firebase deployment · Role-based access · Leads in, delivered bikes out', zh: 'Firebase 部署 · 角色权限 · Leads 进，交车出' }}
      primary={{ href: demoUrl, external: true, label: { en: 'View demo', zh: '查看 Demo' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: demoUrl,
        domain: 'edent95.github.io/dr-racing-dashboard-demo/demo',
        title: { en: 'Interactive Dr Racing demo', zh: 'Dr Racing 互动 Demo' },
        caption: { en: 'The public demo, running right here on fixed anonymized sample data. Open it in a new tab for the full dashboard.', zh: '公开 Demo 直接跑在这里，使用固定匿名示例数据。想看完整仪表台，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Dr Racing is the operating system of a motorcycle dealership that sells on financing. A sale is not one event but a pipeline: a lead comes in from TikTok or a walk-in, becomes a loan application, goes through document checks, is submitted to banks round after round, and only counts when the bike is delivered and the disbursement lands.', zh: 'Dr Racing 是一家靠贷款卖车的摩托车行的运营系统。一单生意不是一个动作，而是一条流水线：lead 从 TikTok 或 walk-in 进来，变成贷款申请，过文件检查，一轮一轮送银行，直到交车、银行放款才算数。' } },
        { kind: 'p', text: { en: 'Before this system, that pipeline lived in WhatsApp chats, paper files, and each salesperson\u2019s memory. Dr Racing puts every application, bank round, reject code, and follow-up in one place, so the shop always knows who is waiting on whom.', zh: '在这个系统之前，这条流水线活在 WhatsApp 对话、纸质文件和每个 sales 的记忆里。Dr Racing 把每一份申请、每一轮银行、每个 reject code 和跟进都放在同一个地方，车行随时知道现在卡在谁手上。' } },
        { kind: 'h', text: { en: 'How a deal moves', zh: '一单生意怎么走' } },
        { kind: 'steps', items: [
          { title: { en: 'Lead', zh: 'Lead' }, text: { en: 'Raw leads land from TikTok, Facebook, Instagram, Google, and walk-ins. Sales claim and follow up.', zh: 'TikTok、Facebook、Instagram、Google 和 walk-in 的 raw leads 进来，sales 认领并跟进。' } },
          { title: { en: 'Apply', zh: '申请' }, text: { en: 'A lead becomes a loan application with IC, payslips, and the exact bike and installment plan.', zh: 'Lead 变成贷款申请：IC、payslip、指定车型和分期方案。' } },
          { title: { en: 'Bank rounds', zh: '银行轮次' }, text: { en: 'Admin submits to banks. Approvals, rejects, and reject codes are tracked round by round.', zh: 'Admin 送银行。批准、拒绝和 reject code 按轮次记录，被拒可以换银行再送。' } },
          { title: { en: 'Deliver', zh: '交车' }, text: { en: 'Approved deals move to delivery, disbursement, and commission settlement.', zh: '批准的单子走向交车、放款与佣金结算。' } },
        ] },
        { kind: 'h', text: { en: 'What it changes day to day', zh: '它每天改变了什么' } },
        { kind: 'p', text: { en: 'The Task Inbox opens the morning. Instead of scrolling chats, every role sees what waits on them: applications to review, documents to chase, banks to follow up, approved customers to call.', zh: '早上从 Task Inbox 开始。不用翻聊天记录，每个角色都直接看到等着自己的事：要审的申请、要追的文件、要跟的银行、要联系的已批客户。' } },
        { kind: 'p', text: { en: 'Reject codes become knowledge. Every bank rejection is coded and translated into a plain next step, so a young salesperson handles a rejection the way the most experienced one would.', zh: 'Reject code 变成车行的知识。每个银行拒绝都有编码，并翻译成一句普通人能懂的下一步，新 sales 也能像老手一样处理被拒。' } },
        { kind: 'callout', label: { en: 'From marketing to commission', zh: '从营销到佣金' }, text: { en: 'The same system tracks WhatsApp link clicks by channel, marketing spend by month, staff attendance, and per-deal commissions\u2014so the owner sees the whole business, not just the loan queue.', zh: '同一个系统还追踪各渠道 WhatsApp 点击、每月营销开销、员工出勤和每单佣金——老板看到的是整盘生意，不只是贷款队列。' } },
        { kind: 'p', text: { en: 'Roles keep the data honest. Sales see their own pipeline, Admin owns bank submissions, Super Admin controls prices, commissions, and permissions. Every sensitive change lands in an audit log.', zh: '角色让数据保持干净。Sales 看自己的 pipeline，Admin 负责送银行，Super Admin 管价格、佣金和权限。每个敏感操作都会进 audit log。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'About this demo', zh: '关于这个 Demo' }, text: { en: 'The public demo above runs the real dashboard with fixed anonymized sample data, entirely in your browser\u2014no login, nothing saved to a server, and it resets on every reload. The production system runs on Firebase with real authentication and role-based security rules.', zh: '上面的公开 Demo 用固定匿名示例数据跑真实仪表台，完全在你的浏览器里——不用登录、不会写入服务器、刷新即重置。正式系统跑在 Firebase 上，有真实登录与角色安全规则。' } },
      ]}
      faq={[
        { q: { en: 'Who is this system for?', zh: '这个系统给谁用？' }, a: { en: 'Vehicle dealerships that sell on financing\u2014where every sale depends on a loan getting approved, and the daily work is chasing documents, banks, and follow-ups.', zh: '靠贷款出车的车行——每一单都取决于贷款批不批，日常工作就是追文件、追银行、追跟进。' } },
        { q: { en: 'What happens when a bank rejects an application?', zh: '银行拒绝申请之后会怎样？' }, a: { en: 'The rejection is recorded with its reject code, the code is translated into a plain-language next step, and the application can be resubmitted to another bank as a new round without losing history.', zh: '拒绝会连同 reject code 一起记录，code 被翻译成一句普通话的下一步，申请可以换一家银行开新一轮再送，历史全部保留。' } },
        { q: { en: 'Is the demo the real product?', zh: 'Demo 是真实产品吗？' }, a: { en: 'It is the real dashboard interface with demo data seeded into your browser. Firebase is switched off in the demo build, so nothing you click leaves your device.', zh: '是真实的仪表台界面，加上灌进浏览器的示例数据。Demo 版本关掉了 Firebase，你点的任何东西都不会离开你的设备。' } },
        { q: { en: 'Can different staff see different things?', zh: '不同员工看到的东西不一样吗？' }, a: { en: 'Yes. Sales, Admin, Operations Manager, and Super Admin each get their own navigation and permissions, and Super Admin can adjust page-level access per role.', zh: '会。Sales、Admin、Operations Manager 和 Super Admin 各有自己的导航与权限，Super Admin 还能按角色调整页面级访问。' } },
        { q: { en: 'Where does the production system store data?', zh: '正式系统的数据存在哪里？' }, a: { en: 'In Firebase (Firestore) under the dealership\u2019s own project, protected by authentication, custom role claims, and security rules tested in CI.', zh: '存在车行自己的 Firebase（Firestore）项目里，由登录验证、角色 claims 和在 CI 里测试过的安全规则保护。' } },
        { q: { en: 'Does it only handle loans?', zh: '它只管贷款吗？' }, a: { en: 'Loans are the spine, but the same system covers raw leads, WhatsApp click tracking, marketing spend, vehicle stock and pricing, attendance, commissions, and an audit log.', zh: '贷款是主干，但同一个系统也覆盖 raw leads、WhatsApp 点击追踪、营销开销、车辆库存与定价、出勤、佣金和 audit log。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Loan operations and dealership management', zh: '贷款运营与车行管理' }],
        [{ en: 'Pipeline', zh: '流程' }, { en: 'Lead \u2192 Application \u2192 Bank rounds \u2192 Delivery', zh: 'Lead \u2192 申请 \u2192 银行轮次 \u2192 交车' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Task Inbox · Applications · Leads · Analytics · Finance · Commissions', zh: 'Task Inbox · 申请 · Leads · 分析 · 财务 · 佣金' }],
        [{ en: 'Roles', zh: '角色' }, { en: 'Sales · Admin · Operations Manager · Super Admin', zh: 'Sales · Admin · Operations Manager · Super Admin' }],
        [{ en: 'Deployment', zh: '部署方式' }, { en: 'Firebase App Hosting with Firestore security rules', zh: 'Firebase App Hosting，配 Firestore 安全规则' }],
        [{ en: 'Languages', zh: '语言' }, { en: 'Chinese · English · Malay', zh: '中文 · English · Malay' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'dr-racing')}
    />
  );
};

const ETReportHubSalesPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  productHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, productHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const linkedinHref = 'https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/';

  return (
    <div className="page-shell etreport-page etreport-sales-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={productHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回 ETReportHub' : 'Back to ETReportHub'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-hero py-16 text-center md:py-24">
            <p className="etreport-kicker mx-auto">{isZh ? 'ETReportHub / Sales Page' : 'ETReportHub / Sales Page'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Stop paying people to rebuild the same report every day.' : 'Stop paying people to rebuild the same report every day.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? 'ETReportHub 是给 iGaming operator / aggregator 的日报数据系统。它把 Transaction、Customer、会员、渠道、趋势、品牌对比和 CRM export 变成一个可复盘的运营层。'
                : 'ETReportHub is a daily-report data system for iGaming operators and aggregators. It turns Transaction, Customer, members, channels, trends, brand comparison, and CRM export into one reviewable operating layer.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#pricing" className="etreport-text-cta">
                {isZh ? '看价格' : 'View pricing'} <span aria-hidden>›</span>
              </a>
              <a href="#why-buy" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '为什么要买' : 'Why buy it'} <span aria-hidden>›</span>
              </a>
              <a href="#roi" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '算 ROI' : 'ROI logic'} <span aria-hidden>›</span>
              </a>
            </div>
            <div className="etreport-sales-proof-grid mx-auto mt-10">
              {etReportHubSalesProofStats.map((item) => (
                <article key={item.value.en} className="etreport-sales-proof-card">
                  <strong>{item.value[language]}</strong>
                  <span>{item.label[language]}</span>
                </article>
              ))}
            </div>
          </header>

          <section className="etreport-sales-hero-panel">
            <div>
              <p className="etreport-kicker">{isZh ? 'Buyer problem' : 'Buyer problem'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '报表不是小事。它决定团队每天相信什么。' : 'Reporting is not a small task. It decides what the team believes every day.'}
              </h2>
            </div>
            <div className="etreport-sales-price-strip">
              <div>
                <p>{isZh ? '上线套餐' : 'Launch package'}</p>
                <strong>RM4,890</strong>
                <span>{isZh ? '一次性' : 'one-time'}</span>
              </div>
            </div>
          </section>

          <section id="why-buy" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Why clients buy' : 'Why clients buy'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '客户买的不是页面，是少出错、少拖延、少靠人记。' : 'Clients are not buying a page. They are buying fewer errors, less delay, and less memory work.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {etReportHubBuyerPain.map((item) => (
                <article key={item.title.en} className="etreport-value-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="roi" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'ROI logic' : 'ROI logic'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '现场算给客户看：RM4,890 是否划算？' : 'Show the customer if RM4,890 makes sense.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '下面是保守估算，不是保证收益。假设每天省 2.5 小时、人工成本 RM25/小时、每月 26 个工作日，再加上 Bonus 控制和 CRM 跟进价值。'
                  : 'This is a conservative estimate, not a guaranteed return. It assumes 2.5 reporting hours saved per day, RM25/hour labor cost, 26 working days, plus bonus control and CRM follow-up value.'}
              </p>
            </div>
            <div className="etreport-roi-grid mt-12">
              {etReportHubRoiCards.map((item) => (
                <article key={item.label.en} className="etreport-roi-card">
                  <p className="etreport-card-eyebrow">{item.label[language]}</p>
                  <strong>{typeof item.value === 'string' ? item.value : item.value[language]}</strong>
                </article>
              ))}
            </div>
            <p className="etreport-roi-note">
              {isZh
                ? '销售讲法：说白了，一天省 2-4 小时，CRM 跟得上、bonus 不乱发，RM4,890 不只是买一个页面——是把原本烂在 Excel 和拍脑袋决定里的钱，捞回来。'
                : 'Sales angle: real talk — save 2-4 hours a day, keep CRM on top of it, stop over-handing bonus, and RM4,890 is not just buying a page. It is clawing back money that was quietly leaking into Excel and guesswork.'}
            </p>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What changes after buying' : 'What changes after buying'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '从每天整理数据，变成每天判断动作。' : 'Move from arranging data every day to deciding actions every day.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {etReportHubSalesOutcomes.map((item) => (
                <article key={item.label.en} className="etreport-sales-outcome-card">
                  <p className="etreport-card-eyebrow">{item.label[language]}</p>
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.metric[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Savings map' : 'Savings map'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '把卖点讲成客户每天会遇到的问题。' : 'Frame the value around the customer’s daily operating pain.'}
              </h2>
            </div>
            <div className="etreport-sales-table mt-12">
              <table>
                <thead>
                  <tr>
                    <th>{isZh ? '客户现在的问题' : 'Current customer problem'}</th>
                    <th>{isZh ? '系统怎么解决' : 'How the system helps'}</th>
                    <th>{isZh ? '可节省 / 改善' : 'Savings / improvement'}</th>
                  </tr>
                </thead>
                <tbody>
                  {etReportHubSavingsRows.map((row) => (
                    <tr key={row.problem.en}>
                      <td>{row.problem[language]}</td>
                      <td>{row.solution[language]}</td>
                      <td>{row.improvement[language]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What you get' : 'What you get'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '一套把日报、会员和 CRM 前置数据接起来的系统。' : 'A system connecting daily reports, member data, and CRM-ready outputs.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {etReportHubSalesDeliverables.map((item) => (
                <article key={item.title.en} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Included stack' : 'Included stack'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '系统里面有什么？' : 'What is included?'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '把功能讲成一个完整 BO operating stack：从上传、清洗、报表、CRM 行动，到备份、权限和上线交付。'
                  : 'Position it as a complete BO operating stack: upload, cleaning, reporting, CRM action, backup, access control, and handover.'}
              </p>
            </div>
            <div className="etreport-sales-table mt-12">
              <table>
                <thead>
                  <tr>
                    <th>{isZh ? '模块' : 'Module'}</th>
                    <th>{isZh ? '包含内容' : 'Included'}</th>
                    <th>{isZh ? '销售讲法' : 'Sales angle'}</th>
                  </tr>
                </thead>
                <tbody>
                  {etReportHubIncludedRows.map((row) => (
                    <tr key={row.module}>
                      <td>{row.module}</td>
                      <td>{row.included[language]}</td>
                      <td>{row.angle[language]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="pricing" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Pricing' : 'Pricing'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '一个清楚的上线价格。先把系统跑起来。' : 'One clear launch price. Get the system running first.'}
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-5">
              {etReportHubPricing.map((plan) => (
                <article key={plan.name.en} className="etreport-pricing-card">
                  <p className="etreport-card-eyebrow">{plan.name[language]}</p>
                  <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <strong className="font-display text-5xl font-bold tracking-tight md:text-7xl">{plan.price}</strong>
                    <span className="pb-2 text-lg font-semibold text-stone-500">{plan.suffix[language]}</span>
                  </div>
                  <p className="mt-5 text-lg font-semibold leading-snug text-stone-800">{plan.bestFor[language]}</p>
                  <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-stone-700">
                    {plan.points[language].map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-eden-mint" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-faq-panel">
              <div>
                <p className="etreport-kicker">{isZh ? 'Before buying' : 'Before buying'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '适合买，也要买得清楚。' : 'Buy it only when the operating problem is real.'}
                </h2>
              </div>
              <div className="etreport-faq-list">
                {etReportHubSalesFaq.map((item) => (
                  <article key={item.q.en} className="etreport-faq-item">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.q[language]}</h3>
                    <p>{item.a[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="etreport-section pb-20 pt-10">
            <div className="etreport-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '如果日报已经影响收入判断，就不要继续靠手感。' : 'If daily reports affect revenue decisions, do not keep relying on feel.'}
              </h2>
              <p>
                {isZh
                  ? '适合已经有稳定 Transaction / Customer 导出、需要更清楚 KPI、会员、渠道和 CRM 前置数据的团队。先谈数据结构，再谈部署方式。'
                  : 'Best for teams with stable Transaction / Customer exports that need clearer KPI, member, channel, and CRM-ready data. Start with data structure, then decide deployment.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={linkedinHref} target="_blank" rel="noreferrer" className="etreport-text-cta">
                  {isZh ? '联系讨论' : 'Discuss on LinkedIn'} <span aria-hidden>›</span>
                </a>
                <a href={productHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '看产品页' : 'View product page'} <span aria-hidden>›</span>
                </a>
                <a href={projectsHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
                <a href={homeHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const PokerFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const playUrl = 'https://poker.eden-tan.com/';
  const installUrl = 'https://poker.eden-tan.com/?install=1';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsPokerCssIcon label="Friday Poker Club CSS app icon" />}
      name="Friday Poker Club"
      kicker={{ en: 'Multiplayer game · Table for the crew', zh: '多人游戏 · 给那群人的牌桌' }}
      tagline={{ en: 'No place to book. Just bring the crew back.', zh: '不用约地点。把那群人叫回来就好。' }}
      meta={{ en: 'Free · Play chips only · Browser or installed app · Chinese and English', zh: '免费 · 只有娱乐筹码 · 浏览器或安装成 App · 中英双语' }}
      primary={{ href: playUrl, external: true, label: { en: 'Open a table', zh: '开一局' } }}
      secondary={{ href: installUrl, external: true, icon: <Download size={16} />, label: { en: 'Install app', zh: '安装 App' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: playUrl,
        domain: 'poker.eden-tan.com',
        title: { en: 'Interactive Friday Poker Club table', zh: 'Friday Poker Club 互动牌桌' },
        caption: { en: 'This is the real table, running right here. Open it in a new tab to bring the crew in.', zh: '这就是真的牌桌，直接跑在这里。想叫人来，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Friday Poker Club started with a simple problem: we still wanted to play, but not every Friday came with a host, a place, or the patience to install another game app. So I built a browser table — open a room, send the link, take a seat.', zh: 'Friday Poker Club 起点很简单：我们还是想一起打牌，但不是每个周五都有人能提供地点，也不是每个人都想安装另一个游戏 App。于是我做了一张浏览器牌桌——开房、发链接、坐下，就可以开始。' } },
        { kind: 'p', text: { en: 'It is not a poker platform chasing strangers. It is for people who already know each other, and it has grown to cover the whole night: Hold’em when everyone wants a proper game, six mini games when they do not, party games when nobody wants to think, and a chip tracker for the nights you are dealing real cards at a real table.', zh: '它不是一个追着陌生人跑的扑克平台，服务的是本来就认识的人。它现在覆盖的是一整个晚上：想正经打就开德州，不想就玩六个小游戏，都不想动脑就玩派对游戏；要是当晚是用真牌在真桌子上打，它还能当记筹码的那个人。' } },
        { kind: 'h', text: { en: 'What is on the table', zh: '桌上有什么' } },
        { kind: 'steps', items: [
          { title: { en: 'Texas Hold’em', zh: '德州扑克' }, text: { en: 'Up to nine seats, blinds at 2/4/10/20, a $50 minimum buy-in, all-in and side pots handled properly, an optional nine-second action clock, and practice bots when you are short a player.', zh: '最多九个座位，盲注 2/4/10/20，最低买入 $50，全下与边池都算得对，可选的 9 秒行动倒数，人不够时还能加练习机器人。' } },
          { title: { en: 'Six mini games', zh: '六个小游戏' }, text: { en: '8/9, Niu Niu, Chinese Poker, Blackjack, Penney’s Game with its own leaderboard, and Wheel of Changes — an I Ching–themed solo slot with its own practice chips.', zh: '8/9、牛牛、十三水、21 点、有自己排行榜的硬币骗局，以及大衍之轮——一个易经主题的单人转盘，用它自己的练习筹码。' } },
          { title: { en: 'Party games', zh: '派对游戏' }, text: { en: 'Prompt cards, Ring of Fire, Number Bomb and 6-7-8 — one phone passed around, or an online room. No buy-in, and they never touch your chips.', zh: '提示卡、国王杯、数字炸弹和 6-7-8——一支手机轮着传，或者开线上房。不用买入，也不会动到你的筹码。' } },
          { title: { en: 'Visual Chip', zh: '实体牌局记筹码' }, text: { en: 'For the nights you deal physical cards: the app tracks stacks, bets, the pot and the settlement, so nobody has to do the maths at the end of the night.', zh: '给那些用真牌开的晚上：app 负责记筹码、下注、底池和最后的结算，散场时不用再有人算数。' } },
        ] },
        { kind: 'h', text: { en: 'Designed for a crew, not a casino', zh: '为熟人局做的选择' } },
        { kind: 'p', text: { en: 'You should not have to wait until everyone is free. Open a room and drop the link in the group. Late arrivals and reconnects get absorbed by the table: seats and stacks persist, and a dropped player reopens the link and sits back down instead of restarting the night.', zh: '不用等到所有人都有空。开一个房间，把链接丢进群里。有人晚到、有人掉线，牌桌都接得住：座位和筹码都留着，掉线的人重开链接就坐回原位，不用整晚重来。' } },
        { kind: 'p', text: { en: 'The wallet is part of the fun, not the pressure. Chips are play chips, top-ups are free, and the Player Record keeps lifetime buy-ins, today’s result and a session history you can filter by table type — the record exists so the group can argue about it, not so anyone can cash out.', zh: '钱包是乐趣的一部分，不是压力。筹码是娱乐筹码，补充免费，玩家资金记录会留下累计买入、当日输赢和可按桌型筛选的对局历史——这些记录是让大家互相吐槽用的，不是拿来兑现的。' } },
        { kind: 'callout', label: { en: 'Only play with people you know', zh: '只跟认识的人玩' }, text: { en: 'Table state syncs straight between the players’ browsers, which keeps it fast and free but also means a determined player could read the table data. That is fine among friends and not fine with strangers, so the table is built for a crew that already trusts each other.', zh: '牌局状态直接在各人的浏览器之间同步，所以又快又不花钱，但也意味着一个存心的人能读到牌桌数据。这在熟人之间没问题，跟陌生人就有问题，所以这张桌子是为本来就互相信任的一群人做的。' } },
        { kind: 'p', text: { en: 'The table also has the boring parts that make a night work: in-table chat and optional voice, report and block, nickname and chat filtering, account deletion in the app, and a public legal page. Nothing there is exciting. All of it matters the first time it is needed.', zh: '牌桌也有那些不好玩但必要的东西：桌内聊天与可选语音、举报与屏蔽、昵称和聊天过滤、在 app 内直接删除账号，以及一个公开的法律页面。这些都不精彩，但第一次需要用到的时候，它们很重要。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Play chips only', zh: '只有娱乐筹码' }, text: { en: 'Chips have no cash value. There is no deposit, no withdrawal, no payout and nothing to buy. Top-ups are free and unlimited, because the point is the night, not the money.', zh: '筹码没有现金价值。没有充值、没有提现、没有派彩，也没有任何东西可买。补充筹码免费且无限，因为重点是那个晚上，不是钱。' } },
      ]}
      faq={[
        { q: { en: 'Do I need to install anything?', zh: '需要安装什么吗？' }, a: { en: 'No. It runs in any modern browser — open the link and take a seat. If you would rather keep it on your home screen, the Install app button adds it as a standalone app.', zh: '不需要。它跑在任何现代浏览器里——打开链接就能坐下。想放到主屏幕的话，点「安装 App」就会变成独立应用。' } },
        { q: { en: 'Do I need an account?', zh: '需要注册吗？' }, a: { en: 'No. You can enter as a guest. Signing in with Google keeps your chips, avatar and record across devices, and guest progress merges into the account when you do. Account deletion is in the app.', zh: '不用。可以直接以访客进入。用 Google 登录能让筹码、头像和记录跨设备保留，访客的进度会在登录时并进账号。删除账号的入口在 app 里。' } },
        { q: { en: 'Is real money involved?', zh: '会牵涉真钱吗？' }, a: { en: 'Never. Chips are play chips with no cash value: no deposit, no withdrawal, no payout, no purchases. Top-ups are free.', zh: '完全不会。筹码是娱乐筹码，没有现金价值：没有充值、没有提现、没有派彩，也没有内购。补充筹码免费。' } },
        { q: { en: 'Can strangers join my table?', zh: '陌生人会进我的牌桌吗？' }, a: { en: 'Be aware that they can. While a table is active it is listed in the shared lobby, and there is no room password, so anyone in the app can sit down. The invite link is the convenient way in for your crew, not a lock on the door — treat the table as a room with the door open.', zh: '有可能，要知道这一点。牌桌活跃期间会列在公共大厅里，也没有房间密码，所以 app 里的任何人都可以坐下。邀请链接是方便自己人进来的入口，不是门锁——把它当成一间没锁门的房间。' } },
        { q: { en: 'What happens if someone loses connection?', zh: '有人断线了会怎样？' }, a: { en: 'The table keeps its state. A player who drops reopens the link and returns to the same seat and stack. An optional nine-second clock can auto-fold someone who is away, and a table with nobody active clears itself after ten minutes.', zh: '牌桌会保留状态。掉线的人重新打开链接，就回到原来的座位和筹码。可选的 9 秒倒数会让离开的人自动弃牌；十分钟没人活动的牌桌会自己清掉。' } },
        { q: { en: 'Is there voice or chat?', zh: '有语音和聊天吗？' }, a: { en: 'Both, and both live inside the table — there is no lobby open mic. Voice is peer to peer and optional; some nights the group talks the whole way through, some nights nobody turns it on.', zh: '都有，而且都在牌桌里——大厅没有开放麦。语音是点对点的，可选：有些晚上大家一路在聊，有些晚上没人开。' } },
        { q: { en: 'Can it run a table with real cards?', zh: '能用在真牌局上吗？' }, a: { en: 'Yes, that is what Visual Chip mode is for. You deal physical cards at a physical table and the app tracks stacks, bets, the pot and the final settlement.', zh: '可以，这就是「实体牌局记筹码」的用途。你们用真牌在真桌上打，app 负责记筹码、下注、底池和最后结算。' } },
        { q: { en: 'What is it built with?', zh: '用什么做的？' }, a: { en: 'React and TypeScript on the front, Firebase Realtime Database keeping seats, actions and reconnects in sync, and WebRTC for table voice. It is installable as a PWA and fully bilingual.', zh: '前端是 React 与 TypeScript，Firebase Realtime Database 让座位、动作和重连保持同步，桌内语音走 WebRTC。可以安装成 PWA，界面中英双语。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Multiplayer game for a private crew', zh: '熟人局多人游戏' }],
        [{ en: 'Main game', zh: '主要游戏' }, { en: 'Texas Hold’em, cash-game style (no tournament structure)', zh: '德州扑克，现金局形式（没有锦标赛结构）' }],
        [{ en: 'Also on the table', zh: '其他玩法' }, { en: '8/9 · Niu Niu · Chinese Poker · Blackjack · Penney’s Game · Wheel of Changes · four party games · Visual Chip tracker', zh: '8/9 · 牛牛 · 十三水 · 21 点 · 硬币骗局 · 大衍之轮 · 四个派对游戏 · 实体牌局记筹码' }],
        [{ en: 'Table limits', zh: '牌桌参数' }, { en: 'Up to 9 seats (4 for Chinese Poker) · blinds 2/4/10/20 · buy-in from $50 · all-in and side pots · optional 9s action clock', zh: '最多 9 座（十三水 4 座）· 盲注 2/4/10/20 · 买入从 $50 起 · 支持全下与边池 · 可选 9 秒行动倒数' }],
        [{ en: 'Joining', zh: '进入方式' }, { en: 'Invite link or the shared lobby list; guest entry or Google sign-in; no room password', zh: '邀请链接或公共大厅列表；可访客进入或用 Google 登录；没有房间密码' }],
        [{ en: 'At the table', zh: '桌内功能' }, { en: 'Chat · optional peer-to-peer voice · report and block · practice bots · host transfer · in-table rebuy', zh: '聊天 · 可选点对点语音 · 举报与屏蔽 · 练习机器人 · 转让房主 · 桌内补码' }],
        [{ en: 'Record', zh: '记录' }, { en: 'Wallet, lifetime buy-in, daily result, and session history filtered by table type', zh: '钱包、累计买入、当日输赢，以及可按桌型筛选的对局历史' }],
        [{ en: 'Money', zh: '金钱' }, { en: 'Play chips only · free unlimited top-ups · no deposit, withdrawal or purchases', zh: '只有娱乐筹码 · 免费无限补充 · 没有充值、提现或内购' }],
        [{ en: 'Realtime', zh: '同步' }, { en: 'Firebase Realtime Database; WebRTC for voice', zh: 'Firebase Realtime Database；语音走 WebRTC' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Mobile-first browser table, installable as a PWA, Chinese and English', zh: '移动优先的浏览器牌桌，可安装为 PWA，中英双语' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'poker')}
    />
  );
};

type WikiEntry = (typeof wikiEntries)[number];

const getWikiToneClassName = (slug: WikiEntry['slug']) => `wiki-tone wiki-tone-${slug}`;

const wikiCssIconBySlug: Record<WikiEntry['slug'], CssArtComponent> = {
  vite: WikiViteCssIcon,
  'background-music': WikiBackgroundMusicCssIcon,
  'button-feedback': WikiButtonFeedbackCssIcon,
  'firebase-lifetime-storage': WikiFirebaseStorageCssIcon,
  skills: WikiSkillsCssIcon,
  'rag-flow': WikiRagFlowCssIcon,
};

const WikiEntryVisual: React.FC<{
  entry: WikiEntry;
  language: Language;
  variant?: 'card' | 'note';
}> = ({ entry, language, variant = 'card' }) => {
  const Icon = wikiCssIconBySlug[entry.slug];
  const baseClassName = variant === 'note' ? 'poker-wiki-note-visual' : 'poker-wiki-visual';

  return (
    <span className={`${baseClassName} poker-wiki-css-icon`}>
      <Icon label={entry.title[language]} />
    </span>
  );
};

type SkillDraft = {
  id: string;
  sourceSlug: string;
  title: string;
  trigger: string;
  reusableRule: string;
  procedure: string[];
  checks: string[];
  sourceProject: string;
  antiPatterns: string[];
  sources: string[];
  tags: string[];
  status: 'draft' | 'reviewed' | 'active' | 'retired' | 'superseded';
  createdAt: string;
};

const SKILL_DRAFTS_STORAGE_KEY = 'eden-wiki-skill-drafts';

const readStoredSkillDrafts = (): SkillDraft[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SKILL_DRAFTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStoredSkillDrafts = (drafts: SkillDraft[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SKILL_DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    // ignore local persistence failures
  }
};

const wikiSkillTagsBySlug: Record<string, string[]> = {
  vite: ['Vite', 'React', 'TypeScript', 'Build loop', 'AI workflow'],
  'background-music': ['UX', 'Audio', 'Presence', 'Game feel'],
  'button-feedback': ['UX feedback', 'Microinteraction', 'Realtime UI'],
  'firebase-lifetime-storage': ['Firebase', 'Realtime state', 'Storage', 'Schema'],
  skills: ['Knowledge base', 'Skill design', 'Workflow'],
  'rag-flow': ['RAG', 'Tag registry', 'Knowledge architecture', 'Metadata'],
};

const wikiSourceProjectBySlug: Record<string, string> = {
  vite: 'Jiju / Friday Poker Club / Eden Vite apps',
  'background-music': 'Friday Poker Club',
  'button-feedback': 'Friday Poker Club',
  'firebase-lifetime-storage': 'Friday Poker Club',
  skills: 'Eden Knowledge Base',
  'rag-flow': 'Eden Knowledge Base',
};

const wikiAntiPatternsBySlug: Record<string, Record<Language, string[]>> = {
  vite: {
    en: [
      'Treating Vite dev server success as production proof.',
      'Skipping typecheck because the page appears to work.',
      'Ignoring broken assets or route/base-path issues until deployment.',
    ],
    zh: [
      '把 Vite dev server 正常当成 production 正确证明。',
      '因为页面能跑就跳过 typecheck。',
      '等到部署时才处理 broken assets、route 或 base path 问题。',
    ],
  },
  'background-music': {
    en: [
      'Autoplaying sound without visible control.',
      'Using music as decoration instead of mood support.',
      'Forgetting to remember the user sound preference.',
    ],
    zh: [
      '没有明显控制入口就自动播放声音。',
      '把音乐当装饰，而不是支撑场景气氛。',
      '不记住用户的声音偏好。',
    ],
  },
  'button-feedback': {
    en: [
      'Letting a click feel silent after a realtime action.',
      'Allowing repeated clicks while a remote action is pending.',
      'Showing no accepted, blocked, or failed state after the action.',
    ],
    zh: [
      '实时动作点了之后没有任何反馈。',
      '远端动作 pending 时仍允许用户重复点击。',
      '动作后不显示已接受、被挡住或失败状态。',
    ],
  },
  'firebase-lifetime-storage': {
    en: [
      'Persisting everything without cleanup rules.',
      'Letting game state become scattered flags instead of a schema.',
      'Treating persistence as only a backend concern.',
    ],
    zh: [
      '什么都持久化，但没有 cleanup 规则。',
      '让游戏状态散成一堆 flags，而不是形成 schema。',
      '把持久化只当后端问题，不当产品决策。',
    ],
  },
  skills: {
    en: [
      'Saving notes as skills without trigger, procedure, checks, or source.',
      'Publishing generated skills without user review.',
      'Mixing raw memory with executable instruction.',
    ],
    zh: [
      '把普通笔记直接当 skill 存，缺少触发场景、步骤、检查和来源。',
      'AI 生成后不经 user review 就发布 skill。',
      '把 raw memory 和 executable instruction 混在一起。',
    ],
  },
  'rag-flow': {
    en: [
      'Using a vector database as the source of truth.',
      'Letting tags become uncontrolled hashtags.',
      'Returning RAG answers without source links or metadata filters.',
    ],
    zh: [
      '把 vector database 当成 source of truth。',
      '让 tags 变成不受控的 hashtags。',
      'RAG 回答不带 source links，也不使用 metadata filters。',
    ],
  },
};

const createSkillDraftFromWikiEntry = (entry: WikiEntry, language: Language, sourceHref: string): SkillDraft => {
  const firstSection = entry.sections[0];
  const secondSection = entry.sections[1];
  const procedure = firstSection?.points[language].slice(0, 4) ?? [entry.thesis[language]];
  const checks = secondSection?.points[language].slice(0, 4) ?? [entry.summary[language]];

  return {
    id: `${entry.slug}-${Date.now()}`,
    sourceSlug: entry.slug,
    title: entry.title[language],
    trigger: entry.summary[language],
    reusableRule: entry.thesis[language],
    procedure,
    checks,
    sourceProject: wikiSourceProjectBySlug[entry.slug] ?? 'Eden Knowledge Base',
    antiPatterns: wikiAntiPatternsBySlug[entry.slug]?.[language] ?? [entry.summary[language]],
    sources: [sourceHref],
    tags: wikiSkillTagsBySlug[entry.slug] ?? ['Wiki', 'Reusable skill'],
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
};

const WikiPage: React.FC<{
  entry?: WikiEntry;
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ entry, homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const wikiHref = joinBasePath(baseUrl, 'wiki');
  const notesHref = joinBasePath(baseUrl, 'notes');
  const isPublishedNote = Boolean(entry && publishedNotes.some((note) => note.href === `wiki/${entry.slug}`));
  const [skillDrafts, setSkillDrafts] = React.useState<SkillDraft[]>(() => readStoredSkillDrafts());
  const latestDraft = entry ? skillDrafts.find((draft) => draft.sourceSlug === entry.slug) : undefined;
  const isSkillsIndex = !entry || entry.slug === 'skills';
  const highlightSections = entry
    ? entry.sections.slice(0, 3).map((section) => ({
        title: section.title[language],
        point: section.points[language][0],
      }))
    : [];

  const handleTurnIntoSkill = () => {
    if (!entry) return;
    const sourceHref = joinBasePath(baseUrl, `wiki/${entry.slug}`);
    const nextDraft = createSkillDraftFromWikiEntry(entry, language, sourceHref);
    const nextDrafts = [nextDraft, ...skillDrafts.filter((draft) => draft.sourceSlug !== entry.slug)];
    setSkillDrafts(nextDrafts);
    writeStoredSkillDrafts(nextDrafts);
  };

  if (entry && isPublishedNote) {
    return (
      <div className={`page-shell notes-article-page ${getWikiToneClassName(entry.slug)} min-h-screen`}>
        <main className="notes-article-main">
          <div className="notes-article-island">
            <div className="notes-topbar">
              <a href={wikiHref} className="notes-back-link">
                <ArrowLeft size={17} />
                {isZh ? '返回知识库' : 'Back to Wiki'}
              </a>
              <HeaderControls
                language={language}
                setLanguage={setLanguage}
                themePreference={themePreference}
                theme={theme}
                setThemePreference={setThemePreference}
                compactThemeOnSelection
                compactLanguageOnSelection
              />
            </div>

            <header className="notes-article-hero">
              <div className="notes-article-mark">
                <WikiEntryVisual entry={entry} language={language} variant="note" />
              </div>
              <p className="notes-eyebrow">{entry.eyebrow[language]}</p>
              <h1>{entry.title[language]}</h1>
              <p className="notes-article-deck">{entry.summary[language]}</p>
            </header>

            <article className="notes-article-body">
              <blockquote className="notes-article-thesis">
                <span>{isZh ? 'Core thesis' : 'Core thesis'}</span>
                <p>{entry.thesis[language]}</p>
              </blockquote>

              <div className="notes-article-sections">
                {entry.sections.map((section, index) => (
                  <section key={section.title.en} className="notes-article-section">
                    <div className="notes-article-section-number">{String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <h2>{section.title[language]}</h2>
                      <div className="notes-article-points">
                        {section.points[language].map((point) => <p key={point}>{point}</p>)}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <footer className="notes-article-footer">
              <p>{isZh ? '继续阅读 Eden 的文章与 build notes' : "Keep reading Eden's essays and build notes"}</p>
              <a href={notesHref}>{isZh ? '回到全部 Notes' : 'View all Notes'} <span aria-hidden>→</span></a>
            </footer>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`page-shell wiki-page min-h-screen ${entry ? "etreport-page poker-page poker-wiki-page" : "wiki-index-page"}`}>
      <main className="wiki-main px-5 py-8 md:px-8 md:py-10">
        <div className="wiki-island mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={entry ? wikiHref : homeHref} className="wiki-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {entry ? (isZh ? '返回知识库' : 'Back to Wiki') : (isZh ? '返回首页' : 'Back home')}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="wiki-hero">
            <p className="wiki-eyebrow">{entry ? entry.eyebrow[language] : 'EDEN / WIKI'}</p>
            <h1>{entry ? entry.title[language] : isZh ? <>让经验，<br />成为下一次的起点。</> : <>A little wiser.<br />With every build.</>}</h1>
            <p className="wiki-hero-copy">
              {entry ? entry.summary[language] : isZh
                ? '构建时遇到的问题，解决后留下的方法。把散落在项目里的经验，整理成可以反复使用的知识。'
                : 'Problems met while building. Methods kept after solving them. A growing collection of knowledge to carry into the next project.'}
            </p>
            {!entry && <a className="wiki-text-link" href="#wiki-library">{isZh ? '浏览知识库' : 'Explore the library'} <ArrowDownRight size={17} aria-hidden="true" /></a>}
          </header>

          {entry ? (
            <article className={`poker-wiki-note ${getWikiToneClassName(entry.slug)}`}>
              <div className="poker-wiki-note-lead">
                <WikiEntryVisual entry={entry} language={language} variant="note" />
                <div>
                  <p className="etreport-kicker">{isZh ? 'Core thesis' : 'Core thesis'}</p>
                  <blockquote className="wiki-quote-bar">
                    <p>{entry.thesis[language]}</p>
                  </blockquote>
                </div>
              </div>
              <div className="wiki-skill-action">
                <div>
                  <p className="etreport-kicker">{isZh ? 'Skill candidate' : 'Skill candidate'}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {isZh ? '把这篇 note 变成 Skill Card' : 'Turn this note into a Skill Card'}
                  </h3>
                  <p>
                    {isZh
                      ? '生成 draft，先看重点字段，再决定要不要保留。'
                      : 'Create a draft. Review the key fields before keeping it.'}
                  </p>
                </div>
                <button type="button" className="wiki-skill-button" onClick={handleTurnIntoSkill}>
                  {latestDraft ? (isZh ? '重新生成 Skill' : 'Regenerate skill') : isZh ? 'Turn into Skill' : 'Turn into Skill'}
                </button>
              </div>
              {latestDraft && (
                <div className="wiki-skill-preview">
                  <div className="wiki-skill-preview-head">
                    <p className="etreport-kicker">{isZh ? 'Draft Skill Card' : 'Draft Skill Card'}</p>
                    <span>{latestDraft.status}</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-tight">{latestDraft.title}</h3>
                  <div className="wiki-skill-summary-grid">
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '触发场景' : 'Trigger'}</strong>
                      {latestDraft.trigger}
                    </p>
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '可复用规则' : 'Reusable rule'}</strong>
                      {latestDraft.reusableRule ?? entry.thesis[language]}
                    </p>
                    <p className="wiki-skill-trigger">
                      <strong>{isZh ? '来源项目' : 'Source project'}</strong>
                      {latestDraft.sourceProject ?? wikiSourceProjectBySlug[entry.slug] ?? 'Eden Knowledge Base'}
                    </p>
                  </div>
                  <div className="wiki-skill-preview-grid">
                    <div>
                      <h4>{isZh ? '执行步骤' : 'Procedure'}</h4>
                      <ul>
                        {latestDraft.procedure.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '检查方式' : 'Checks'}</h4>
                      <ul>
                        {latestDraft.checks.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '反模式' : 'Anti-patterns'}</h4>
                      <ul>
                        {(latestDraft.antiPatterns ?? wikiAntiPatternsBySlug[entry.slug]?.[language] ?? []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{isZh ? '来源链接' : 'Sources'}</h4>
                      <ul>
                        {latestDraft.sources.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="wiki-skill-tags">
                    {latestDraft.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="wiki-key-points">
                <p className="etreport-kicker">{isZh ? 'Key points' : 'Key points'}</p>
                <div className="wiki-key-point-grid">
                  {highlightSections.map((section) => (
                    <section key={section.title} className="wiki-key-point-card">
                      <h3 className="font-display text-2xl font-bold tracking-tight">{section.title}</h3>
                      <p>{section.point}</p>
                    </section>
                  ))}
                </div>
              </div>
              <details className="wiki-detail-drawer">
                <summary>{isZh ? '展开完整笔记' : 'Show full note'}</summary>
                <div className="poker-wiki-note-sections">
                  {entry.sections.map((section) => (
                    <section key={section.title.en} className="poker-wiki-note-section">
                      <h3 className="font-display text-2xl font-bold tracking-tight">{section.title[language]}</h3>
                      <ul>
                        {section.points[language].map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </details>
              {isSkillsIndex && skillDrafts.length > 0 && (
                <div className="wiki-skill-library">
                  <p className="etreport-kicker">{isZh ? 'Local skill drafts' : 'Local skill drafts'}</p>
                  <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                    {isZh ? '你已经生成的 Skill Cards。' : 'Skill Cards generated from the wiki.'}
                  </h2>
                  <div className="wiki-skill-library-grid">
                    {skillDrafts.map((draft) => (
                      <article key={draft.id} className="wiki-skill-library-card">
                        <div className="wiki-skill-preview-head">
                          <p>{draft.sourceSlug}</p>
                          <span>{draft.status}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold tracking-tight">{draft.title}</h3>
                        <p><strong>{isZh ? '触发场景：' : 'Trigger: '}</strong>{draft.trigger}</p>
                        <p><strong>{isZh ? '来源项目：' : 'Source project: '}</strong>{draft.sourceProject ?? wikiSourceProjectBySlug[draft.sourceSlug] ?? 'Eden Knowledge Base'}</p>
                        <div className="wiki-skill-tags">
                          {draft.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ) : (
            <section className="wiki-library" id="wiki-library" aria-labelledby="wiki-library-title">
              <div className="wiki-library-heading">
                <h2 id="wiki-library-title">{isZh ? '构建中的知识' : 'Knowledge from the work'}</h2>
                <span>{String(wikiEntries.length).padStart(2, '0')} {isZh ? '篇笔记' : 'notes'}</span>
              </div>
              <div className="wiki-entry-grid">
                {wikiEntries.map((item, index) => (
                  <a key={item.slug} href={joinBasePath(baseUrl, `wiki/${item.slug}`)} className="wiki-entry">
                    <div className="wiki-entry-meta">
                      <span>{String(index + 1).padStart(2, '0')} / {item.eyebrow[language]}</span>
                      <div className="wiki-entry-icon" aria-hidden="true"><WikiEntryVisual entry={item} language={language} /></div>
                    </div>
                    <h3>{item.title[language]}</h3>
                    <p>{item.summary[language]}</p>
                    <span className="wiki-entry-link">{isZh ? '阅读笔记' : 'Read note'} <ArrowUpRight size={17} aria-hidden="true" /></span>
                  </a>
                ))}
              </div>
              <div className="wiki-colophon">
                <div>
                  <p className="wiki-eyebrow">{isZh ? '持续积累' : 'A growing body of knowledge'}</p>
                  <h2>{isZh ? '做过的事，留下可用的东西。' : 'Keep what the work teaches you.'}</h2>
                </div>
                <div>
                  <p>{isZh
                    ? '每篇笔记保留学到了什么、为什么重要、下次怎么复用。原始资料保持不变，Wiki 由 LLM 持续整理，经过检查的方法再成为可执行的 Skill。'
                    : 'Each note keeps what was learned, why it matters, and how to reuse it. Original sources stay intact; the LLM maintains the wiki. Checked methods can become executable skills.'}</p>
                  <div className="wiki-footer-links">
                    <a className="wiki-text-link" href={notesHref}>{isZh ? '阅读 Notes' : 'Read Notes'} <ArrowUpRight size={16} aria-hidden="true" /></a>
                    <a className="wiki-text-link" href={joinBasePath(baseUrl, 'project')}>{isZh ? '探索项目' : 'Explore projects'} <ArrowUpRight size={16} aria-hidden="true" /></a>
                  </div>
                </div>
              </div>
              {isSkillsIndex && skillDrafts.length > 0 && (
                <div className="wiki-skill-library">
                  <p className="etreport-kicker">{isZh ? 'Local skill drafts' : 'Local skill drafts'}</p>
                  <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                    {isZh ? '你已经生成的 Skill Cards。' : 'Skill Cards generated from the wiki.'}
                  </h2>
                  <div className="wiki-skill-library-grid">
                    {skillDrafts.map((draft) => (
                      <article key={draft.id} className="wiki-skill-library-card">
                        <div className="wiki-skill-preview-head">
                          <p>{draft.sourceSlug}</p>
                          <span>{draft.status}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold tracking-tight">{draft.title}</h3>
                        <p><strong>{isZh ? '触发场景：' : 'Trigger: '}</strong>{draft.trigger}</p>
                        <p><strong>{isZh ? '来源项目：' : 'Source project: '}</strong>{draft.sourceProject ?? wikiSourceProjectBySlug[draft.sourceSlug] ?? 'Eden Knowledge Base'}</p>
                        <div className="wiki-skill-tags">
                          {draft.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

const CONWAY_LIFE_COLUMNS = 36;
const CONWAY_LIFE_ROWS = 24;
const CONWAY_LIFE_CELL_COUNT = CONWAY_LIFE_COLUMNS * CONWAY_LIFE_ROWS;

type ConwayLifePattern = 'glider' | 'r-pentomino' | 'pulsar';

const CONWAY_LIFE_PATTERNS: Record<ConwayLifePattern, readonly [number, number][]> = {
  glider: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
  'r-pentomino': [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]],
  pulsar: [
    [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
    [0, 2], [5, 2], [7, 2], [12, 2],
    [0, 3], [5, 3], [7, 3], [12, 3],
    [0, 4], [5, 4], [7, 4], [12, 4],
    [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
    [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
    [0, 8], [5, 8], [7, 8], [12, 8],
    [0, 9], [5, 9], [7, 9], [12, 9],
    [0, 10], [5, 10], [7, 10], [12, 10],
    [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12],
  ],
};

const createConwayLifeBoard = (pattern: ConwayLifePattern = 'pulsar'): boolean[] => {
  const board = Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => false);
  const coordinates = CONWAY_LIFE_PATTERNS[pattern];
  const patternWidth = Math.max(...coordinates.map(([x]) => x)) + 1;
  const patternHeight = Math.max(...coordinates.map(([, y]) => y)) + 1;
  const startX = Math.floor((CONWAY_LIFE_COLUMNS - patternWidth) / 2);
  const startY = Math.floor((CONWAY_LIFE_ROWS - patternHeight) / 2);

  coordinates.forEach(([x, y]) => {
    board[(startY + y) * CONWAY_LIFE_COLUMNS + startX + x] = true;
  });

  return board;
};

const createRandomConwayLifeBoard = (): boolean[] =>
  Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => Math.random() < 0.22);

const evolveConwayLifeBoard = (board: readonly boolean[]): boolean[] =>
  board.map((isAlive, index) => {
    const row = Math.floor(index / CONWAY_LIFE_COLUMNS);
    const column = index % CONWAY_LIFE_COLUMNS;
    let neighbors = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        if (rowOffset === 0 && columnOffset === 0) continue;
        const nextRow = row + rowOffset;
        const nextColumn = column + columnOffset;
        if (nextRow < 0 || nextRow >= CONWAY_LIFE_ROWS || nextColumn < 0 || nextColumn >= CONWAY_LIFE_COLUMNS) continue;
        if (board[nextRow * CONWAY_LIFE_COLUMNS + nextColumn]) neighbors += 1;
      }
    }

    return isAlive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
  });

const ELEMENTARY_RULE_COUNT = 256;
const ELEMENTARY_MAIN_WIDTH = 128;
const ELEMENTARY_MAIN_HEIGHT = 72;
const ELEMENTARY_THUMB_WIDTH = 24;
const ELEMENTARY_THUMB_HEIGHT = 14;
const FEATURED_ELEMENTARY_RULES = [30, 90, 110, 184] as const;
const ELEMENTARY_NEIGHBORHOODS = ['111', '110', '101', '100', '011', '010', '001', '000'] as const;
const I_CHING_TRIGRAMS = [
  { bits: '111', name: { en: 'Qian', zh: '乾' }, symbol: '☰', nature: { en: 'Heaven', zh: '天' } },
  { bits: '110', name: { en: 'Dui', zh: '兑' }, symbol: '☱', nature: { en: 'Lake', zh: '泽' } },
  { bits: '101', name: { en: 'Li', zh: '离' }, symbol: '☲', nature: { en: 'Fire', zh: '火' } },
  { bits: '100', name: { en: 'Zhen', zh: '震' }, symbol: '☳', nature: { en: 'Thunder', zh: '雷' } },
  { bits: '011', name: { en: 'Xun', zh: '巽' }, symbol: '☴', nature: { en: 'Wind', zh: '风' } },
  { bits: '010', name: { en: 'Kan', zh: '坎' }, symbol: '☵', nature: { en: 'Water', zh: '水' } },
  { bits: '001', name: { en: 'Gen', zh: '艮' }, symbol: '☶', nature: { en: 'Mountain', zh: '山' } },
  { bits: '000', name: { en: 'Kun', zh: '坤' }, symbol: '☷', nature: { en: 'Earth', zh: '地' } },
] as const;

const getIChingTrigram = (bits: string) => I_CHING_TRIGRAMS.find((item) => item.bits === bits) ?? I_CHING_TRIGRAMS[0];

const I_CHING_HEXAGRAMS = [
  { number: 1, bits: '111111', name: { en: 'Qian', zh: '乾' } },
  { number: 2, bits: '000000', name: { en: 'Kun', zh: '坤' } },
  { number: 3, bits: '100010', name: { en: 'Zhun', zh: '屯' } },
  { number: 4, bits: '010001', name: { en: 'Meng', zh: '蒙' } },
  { number: 5, bits: '111010', name: { en: 'Xu', zh: '需' } },
  { number: 6, bits: '010111', name: { en: 'Song', zh: '讼' } },
  { number: 7, bits: '010000', name: { en: 'Shi', zh: '师' } },
  { number: 8, bits: '000010', name: { en: 'Bi', zh: '比' } },
  { number: 9, bits: '111011', name: { en: 'Xiao Xu', zh: '小畜' } },
  { number: 10, bits: '110111', name: { en: 'Lu', zh: '履' } },
  { number: 11, bits: '111000', name: { en: 'Tai', zh: '泰' } },
  { number: 12, bits: '000111', name: { en: 'Pi', zh: '否' } },
  { number: 13, bits: '101111', name: { en: 'Tong Ren', zh: '同人' } },
  { number: 14, bits: '111101', name: { en: 'Da You', zh: '大有' } },
  { number: 15, bits: '001000', name: { en: 'Qian', zh: '谦' } },
  { number: 16, bits: '000100', name: { en: 'Yu', zh: '豫' } },
  { number: 17, bits: '100110', name: { en: 'Sui', zh: '随' } },
  { number: 18, bits: '011001', name: { en: 'Gu', zh: '蛊' } },
  { number: 19, bits: '110000', name: { en: 'Lin', zh: '临' } },
  { number: 20, bits: '000011', name: { en: 'Guan', zh: '观' } },
  { number: 21, bits: '100101', name: { en: 'Shi He', zh: '噬嗑' } },
  { number: 22, bits: '101001', name: { en: 'Bi', zh: '贲' } },
  { number: 23, bits: '000001', name: { en: 'Bo', zh: '剥' } },
  { number: 24, bits: '100000', name: { en: 'Fu', zh: '复' } },
  { number: 25, bits: '100111', name: { en: 'Wu Wang', zh: '无妄' } },
  { number: 26, bits: '111001', name: { en: 'Da Xu', zh: '大畜' } },
  { number: 27, bits: '100001', name: { en: 'Yi', zh: '颐' } },
  { number: 28, bits: '011110', name: { en: 'Da Guo', zh: '大过' } },
  { number: 29, bits: '010010', name: { en: 'Kan', zh: '坎' } },
  { number: 30, bits: '101101', name: { en: 'Li', zh: '离' } },
  { number: 31, bits: '001110', name: { en: 'Xian', zh: '咸' } },
  { number: 32, bits: '011100', name: { en: 'Heng', zh: '恒' } },
  { number: 33, bits: '001111', name: { en: 'Dun', zh: '遁' } },
  { number: 34, bits: '111100', name: { en: 'Da Zhuang', zh: '大壮' } },
  { number: 35, bits: '000101', name: { en: 'Jin', zh: '晋' } },
  { number: 36, bits: '101000', name: { en: 'Ming Yi', zh: '明夷' } },
  { number: 37, bits: '101011', name: { en: 'Jia Ren', zh: '家人' } },
  { number: 38, bits: '110101', name: { en: 'Kui', zh: '睽' } },
  { number: 39, bits: '001010', name: { en: 'Jian', zh: '蹇' } },
  { number: 40, bits: '010100', name: { en: 'Xie', zh: '解' } },
  { number: 41, bits: '110001', name: { en: 'Sun', zh: '损' } },
  { number: 42, bits: '100011', name: { en: 'Yi', zh: '益' } },
  { number: 43, bits: '111110', name: { en: 'Guai', zh: '夬' } },
  { number: 44, bits: '011111', name: { en: 'Gou', zh: '姤' } },
  { number: 45, bits: '000110', name: { en: 'Cui', zh: '萃' } },
  { number: 46, bits: '011000', name: { en: 'Sheng', zh: '升' } },
  { number: 47, bits: '010110', name: { en: 'Kun', zh: '困' } },
  { number: 48, bits: '011010', name: { en: 'Jing', zh: '井' } },
  { number: 49, bits: '101110', name: { en: 'Ge', zh: '革' } },
  { number: 50, bits: '011101', name: { en: 'Ding', zh: '鼎' } },
  { number: 51, bits: '100100', name: { en: 'Zhen', zh: '震' } },
  { number: 52, bits: '001001', name: { en: 'Gen', zh: '艮' } },
  { number: 53, bits: '001011', name: { en: 'Jian', zh: '渐' } },
  { number: 54, bits: '110100', name: { en: 'Gui Mei', zh: '归妹' } },
  { number: 55, bits: '101100', name: { en: 'Feng', zh: '丰' } },
  { number: 56, bits: '001101', name: { en: 'Lu', zh: '旅' } },
  { number: 57, bits: '011011', name: { en: 'Xun', zh: '巽' } },
  { number: 58, bits: '110110', name: { en: 'Dui', zh: '兑' } },
  { number: 59, bits: '010011', name: { en: 'Huan', zh: '涣' } },
  { number: 60, bits: '110010', name: { en: 'Jie', zh: '节' } },
  { number: 61, bits: '110011', name: { en: 'Zhong Fu', zh: '中孚' } },
  { number: 62, bits: '001100', name: { en: 'Xiao Guo', zh: '小过' } },
  { number: 63, bits: '101010', name: { en: 'Ji Ji', zh: '既济' } },
  { number: 64, bits: '010101', name: { en: 'Wei Ji', zh: '未济' } },
] as const;

const I_CHING_RULE_YAO_POSITIONS = [1, 4, 2, 8, 5, 7] as const;
const I_CHING_RULE_VARIANT_POSITIONS = [3, 6] as const;

const createIChingRuleVariant = (hexagramBits: string, variantBits: string) => {
  const ruleBits = Array.from({ length: 8 }, () => '0');
  I_CHING_RULE_YAO_POSITIONS.forEach((position, index) => {
    ruleBits[position - 1] = hexagramBits[index] ?? '0';
  });
  I_CHING_RULE_VARIANT_POSITIONS.forEach((position, index) => {
    ruleBits[position - 1] = variantBits[index] ?? '0';
  });
  return Number.parseInt(ruleBits.join(''), 2);
};

const getRuleIChingMapping = (rule: number) => {
  const ruleBits = rule.toString(2).padStart(8, '0');
  const hexagramBits = I_CHING_RULE_YAO_POSITIONS.map((position) => ruleBits[position - 1]).join('');
  const variantBits = I_CHING_RULE_VARIANT_POSITIONS.map((position) => ruleBits[position - 1]).join('');
  const hexagram = I_CHING_HEXAGRAMS.find((item) => item.bits === hexagramBits) ?? I_CHING_HEXAGRAMS[0];
  const groupRules = ['00', '01', '10', '11']
    .map((bits) => createIChingRuleVariant(hexagramBits, bits))
    .sort((first, second) => first - second);

  return { ruleBits, hexagramBits, variantBits, hexagram, groupRules };
};

const createElementaryRuleCells = (rule: number, width: number, height: number, offset = 0): boolean[] => {
  let row = Array.from({ length: width }, (_, index) => index === Math.floor(width / 2));
  const cells: boolean[] = [];

  for (let y = 0; y < offset; y += 1) {
    row = row.map((center, x) => {
      const left = row[(x - 1 + width) % width];
      const right = row[(x + 1) % width];
      const neighborhood = (left ? 4 : 0) | (center ? 2 : 0) | (right ? 1 : 0);
      return ((rule >> neighborhood) & 1) === 1;
    });
  }

  for (let y = 0; y < height; y += 1) {
    cells.push(...row);
    row = row.map((center, x) => {
      const left = row[(x - 1 + width) % width];
      const right = row[(x + 1) % width];
      const neighborhood = (left ? 4 : 0) | (center ? 2 : 0) | (right ? 1 : 0);
      return ((rule >> neighborhood) & 1) === 1;
    });
  }

  return cells;
};

const createElementaryRuleSvgDataUri = (rule: number, width: number, height: number, offset = 0): string => {
  const cells = createElementaryRuleCells(rule, width, height, offset);
  const rects: string[] = [];

  cells.forEach((active, index) => {
    if (!active) return;
    const x = index % width;
    const y = Math.floor(index / width);
    rects.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges"><rect width="${width}" height="${height}" fill="white"/><g fill="black">${rects.join('')}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const ElementaryRulePattern: React.FC<{
  rule: number;
  width: number;
  height: number;
  offset?: number;
  className?: string;
}> = ({ rule, width, height, offset = 0, className = '' }) => {
  const backgroundImage = React.useMemo(
    () => createElementaryRuleSvgDataUri(rule, width, height, offset),
    [rule, width, height, offset],
  );

  return (
    <div
      className={`elementary-rule-grid ${className}`.trim()}
      style={
        {
          '--rule-columns': width,
          backgroundImage,
        } as React.CSSProperties
      }
      aria-hidden
    />
  );
};

const ElementaryRuleThumb: React.FC<{
  rule: number;
  selected: boolean;
  onSelect: (rule: number) => void;
  ariaLabel?: string;
}> = ({ rule, selected, onSelect, ariaLabel }) => (
  <button
    type="button"
    className={`elementary-rule-thumb ${selected ? 'is-selected' : ''}`}
    onClick={() => onSelect(rule)}
    aria-pressed={selected}
    aria-label={ariaLabel ?? `Rule ${rule}`}
  >
    <ElementaryRulePattern rule={rule} width={ELEMENTARY_THUMB_WIDTH} height={ELEMENTARY_THUMB_HEIGHT} className="elementary-rule-thumb-grid" />
    <span>{String(rule).padStart(3, '0')}</span>
  </button>
);

const IChingRuleReadout: React.FC<{ rule: number; language: Language }> = ({ rule, language }) => {
  const { hexagramBits, variantBits, hexagram, groupRules } = getRuleIChingMapping(rule);
  const lowerBits = hexagramBits.slice(0, 3);
  const upperBits = hexagramBits.slice(3, 6);
  const lower = getIChingTrigram(lowerBits);
  const upper = getIChingTrigram(upperBits);
  const yangCount = [...hexagramBits].filter((bit) => bit === '1').length;
  const visualLines = [...hexagramBits].reverse();
  const variantNumber = Number.parseInt(variantBits, 2) + 1;
  const isZh = language === 'zh';

  return (
    <div className="iching-rule-readout">
      <div className="iching-rule-head">
        <div>
          <p className="elementary-rule-label">{isZh ? '实验性易经映射' : 'Experimental I Ching mapping'}</p>
          <p className="iching-hexagram-name">
            {String(hexagram.number).padStart(2, '0')} · {hexagram.name[language]}
          </p>
        </div>
        <strong>{upper.symbol}{lower.symbol}</strong>
      </div>
      <div className="iching-hexagram-lines" aria-label={isZh ? '六爻卦象' : 'Six-line hexagram'}>
        {visualLines.map((bit, index) => (
          <span key={`${bit}-${index}`} className={bit === '1' ? 'is-yang' : 'is-yin'} />
        ))}
      </div>
      <div className="iching-trigram-grid">
        <div>
          <span>{isZh ? '下卦 · 初爻向上' : 'Lower · bottom-up'}</span>
          <b>{lower.name[language]} / {lower.nature[language]} · {lowerBits}</b>
        </div>
        <div>
          <span>{isZh ? '上卦 · 四爻向上' : 'Upper · bottom-up'}</span>
          <b>{upper.name[language]} / {upper.nature[language]} · {upperBits}</b>
        </div>
        <div>
          <span>{isZh ? '六爻卦码' : 'Six yao bits'}</span>
          <b>{hexagramBits} · {yangCount}/6 {isZh ? '阳' : 'yang'}</b>
        </div>
        <div>
          <span>Variant</span>
          <b>{variantBits} · {variantNumber}/4</b>
        </div>
      </div>
      <div className="iching-rule-path">
        <span>{isZh ? '取爻位置' : 'Yao positions'}</span>
        <b>1 → 4 → 2 → 8 → 5 → 7</b>
        <small>{isZh ? 'Rule 输出位置 3 与 6 组成 Variant。' : 'Rule output positions 3 and 6 form the variant.'}</small>
      </div>
      <div className="iching-rule-group" aria-label={isZh ? '同卦的四条 Rule' : 'Four rules in the same hexagram group'}>
        {groupRules.map((groupRule) => (
          <span key={groupRule} className={groupRule === rule ? 'is-current' : undefined}>Rule {groupRule}</span>
        ))}
      </div>
      <p className="iching-rule-note">
        {isZh
          ? '这是 8-bit Rule 与六爻之间的实验性结构映射，不代表传统占卜、吉凶或 Rule 的固有卦义。'
          : 'This is an experimental structural mapping between an 8-bit rule and six yao—not a traditional divination or an intrinsic meaning of the rule.'}
      </p>
      <a
        className="iching-rule-source"
        href="https://doi.org/10.1016/j.jum.2022.11.001"
        target="_blank"
        rel="noreferrer"
      >
        {isZh ? '查看映射研究 ↗' : 'Read the mapping research ↗'}
      </a>
    </div>
  );
};

const ElementaryRuleViewer: React.FC<{
  rule: number;
  generation: number;
  language: Language;
  ruleBrowser: React.ReactNode;
  playbackControls: React.ReactNode;
}> = ({ rule, generation, language, ruleBrowser, playbackControls }) => {
  const binary = rule.toString(2).padStart(8, '0');
  const isZh = language === 'zh';

  return (
    <section className="cellular-lab-workspace" aria-label={isZh ? `Rule ${rule} 实验台` : `Rule ${rule} workspace`}>
      <aside className="cellular-rule-browser" aria-label={isZh ? '规则浏览器' : 'Rule browser'}>
        {ruleBrowser}
      </aside>

      <div className="cellular-rule-preview">
        <div className="cellular-preview-meta">
          <span>Rule {String(rule).padStart(3, '0')}</span>
          <span>{isZh ? '世代' : 'Generation'} {generation}</span>
        </div>
        <div
          className="elementary-rule-stage"
          aria-label={isZh ? `一维元胞自动机 Rule ${rule}，世代 ${generation}` : `Elementary cellular automata rule ${rule}, generation ${generation}`}
        >
          <ElementaryRulePattern
            rule={rule}
            width={ELEMENTARY_MAIN_WIDTH}
            height={ELEMENTARY_MAIN_HEIGHT}
            offset={generation}
            className="elementary-rule-main-grid"
          />
        </div>
        <div className="cellular-playback-controls" aria-label={isZh ? '播放控制' : 'Playback controls'}>
          {playbackControls}
        </div>
      </div>

      <aside className="elementary-rule-readout">
        <div className="elementary-rule-primary-readout">
          <div>
            <p className="elementary-rule-label">Rule</p>
            <strong>{String(rule).padStart(3, '0')}</strong>
          </div>
          <div>
            <p className="elementary-rule-label">Binary</p>
            <code>{binary}</code>
          </div>
        </div>
        <div className="elementary-neighborhoods">
          {ELEMENTARY_NEIGHBORHOODS.map((neighborhood, index) => (
            <div key={neighborhood}>
              <span>{neighborhood}</span>
              <i className={binary[index] === '1' ? 'is-active' : undefined} />
            </div>
          ))}
        </div>
        <details className="iching-rule-details">
          <summary>
            <span>{isZh ? 'Advanced / 实验性易经映射' : 'Advanced / Experimental I Ching mapping'}</span>
            <span aria-hidden>+</span>
          </summary>
          <IChingRuleReadout rule={rule} language={language} />
        </details>
      </aside>
    </section>
  );
};

const ConwayGameOfLifeFullPage: React.FC<{
  homeHref: string;
  labHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, labHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [board, setBoard] = React.useState<boolean[]>(() => createConwayLifeBoard());
  const [generation, setGeneration] = React.useState(0);
  const [isMobileMenu, setIsMobileMenu] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches,
  );
  const [isRunning, setIsRunning] = React.useState(() =>
    typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  React.useEffect(() => {
    const mobileMenuQuery = window.matchMedia('(max-width: 640px)');
    const updateMobileMenu = () => setIsMobileMenu(mobileMenuQuery.matches);
    updateMobileMenu();
    mobileMenuQuery.addEventListener('change', updateMobileMenu);
    return () => mobileMenuQuery.removeEventListener('change', updateMobileMenu);
  }, []);

  React.useEffect(() => {
    if (!isRunning) return undefined;
    const intervalId = window.setInterval(() => {
      setBoard((currentBoard) => evolveConwayLifeBoard(currentBoard));
      setGeneration((currentGeneration) => currentGeneration + 1);
    }, 240);
    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const step = () => {
    setBoard((currentBoard) => evolveConwayLifeBoard(currentBoard));
    setGeneration((currentGeneration) => currentGeneration + 1);
  };

  const loadPattern = (pattern: ConwayLifePattern) => {
    setBoard(createConwayLifeBoard(pattern));
    setGeneration(0);
    setIsRunning(false);
  };

  const population = board.reduce((total, isAlive) => total + (isAlive ? 1 : 0), 0);

  return (
    <div className="page-shell conway-page conway-life-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="conway-rules-page">
        <div className="conway-rules-shell">
          <div className="conway-rules-topbar">
            <div className="conway-topbar-actions">
              <a href={homeHref} className="conway-back-link inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft size={16} />
                {isZh ? '返回主页' : 'Back to Home'}
              </a>
            </div>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection={isMobileMenu}
              compactLanguageOnSelection={isMobileMenu}
            />
          </div>

          <header className="conway-rules-header conway-life-header">
            <div className="conway-rules-identity">
              <div className="conway-rules-app-icon">
                <ProjectsCrmCssIcon label={isZh ? "Conway's Game of Life CSS app 图标" : "Conway's Game of Life CSS app icon"} />
              </div>
              <div className="conway-rules-copy">
                <p className="conway-kicker">B3 / S23 · Two-dimensional cellular automaton</p>
                <h1 className="conway-rules-title font-display font-bold tracking-tight">
                  Conway’s Game of Life
                </h1>
                <p className="conway-rules-subtitle">
                  {isZh
                    ? '几条简单规则，也能长出意想不到的生命。点亮细胞，然后看秩序自己出现。'
                    : 'Small rules. Unexpected life. Turn on a few cells, then watch order appear on its own.'}
                </p>
              </div>
            </div>
          </header>

          <div className="conway-life-console">
            <div>
              <span>{isZh ? '世代' : 'Generation'}</span>
              <strong>{generation}</strong>
            </div>
            <div>
              <span>{isZh ? '活细胞' : 'Population'}</span>
              <strong>{population}</strong>
            </div>
            <div>
              <span>{isZh ? '规则' : 'Rule'}</span>
              <strong>B3 / S23</strong>
            </div>
            <div className="conway-rules-controls">
              <button type="button" className="conway-control-button" onClick={() => setIsRunning((value) => !value)}>
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                <span>{isRunning ? (isZh ? '暂停' : 'Pause') : isZh ? '运行' : 'Run'}</span>
              </button>
              <button type="button" className="conway-control-button conway-control-button-muted" onClick={step} disabled={isRunning}>
                <ArrowRight size={16} />
                <span>{isZh ? '单步' : 'Step'}</span>
              </button>
              <button type="button" className="conway-control-button conway-control-button-muted" onClick={() => loadPattern('pulsar')}>
                <RotateCcw size={16} />
                <span>{isZh ? '重置' : 'Reset'}</span>
              </button>
              <button
                type="button"
                className="conway-control-button conway-control-button-muted"
                onClick={() => {
                  setBoard(Array.from({ length: CONWAY_LIFE_CELL_COUNT }, () => false));
                  setGeneration(0);
                  setIsRunning(false);
                }}
              >
                <span>{isZh ? '清空' : 'Clear'}</span>
              </button>
              <button
                type="button"
                className="conway-control-button conway-control-button-muted"
                onClick={() => {
                  setBoard(createRandomConwayLifeBoard());
                  setGeneration(0);
                  setIsRunning(false);
                }}
              >
                <span>{isZh ? '随机' : 'Random'}</span>
              </button>
            </div>
          </div>

          <section className="conway-life-layout" aria-label={isZh ? 'Conway 二维生命棋盘' : "Conway's two-dimensional life board"}>
            <div className="conway-life-stage">
              <div
                className="conway-life-grid"
                style={{ '--life-column-count': CONWAY_LIFE_COLUMNS } as React.CSSProperties}
                role="grid"
                aria-label={isZh ? '点击格子切换细胞生死' : 'Click cells to toggle life and death'}
              >
                {board.map((isAlive, index) => {
                  const row = Math.floor(index / CONWAY_LIFE_COLUMNS) + 1;
                  const column = (index % CONWAY_LIFE_COLUMNS) + 1;
                  return (
                    <button
                      key={index}
                      type="button"
                      role="gridcell"
                      className={isAlive ? 'is-alive' : undefined}
                      aria-pressed={isAlive}
                      aria-label={isZh ? `第 ${row} 行第 ${column} 列，${isAlive ? '存活' : '死亡'}` : `Row ${row}, column ${column}, ${isAlive ? 'alive' : 'dead'}`}
                      onClick={() => setBoard((currentBoard) => currentBoard.map((cell, cellIndex) => cellIndex === index ? !cell : cell))}
                    />
                  );
                })}
              </div>
            </div>

            <aside className="conway-life-sidebar">
              <div>
                <p className="conway-kicker">{isZh ? '经典图案' : 'Classic seeds'}</p>
                <div className="conway-life-patterns">
                  <button type="button" onClick={() => loadPattern('glider')}>Glider</button>
                  <button type="button" onClick={() => loadPattern('r-pentomino')}>R-pentomino</button>
                  <button type="button" onClick={() => loadPattern('pulsar')}>Pulsar</button>
                </div>
              </div>
              <div className="conway-life-rules">
                <p className="conway-kicker">{isZh ? '四条规则' : 'Four rules'}</p>
                <ol>
                  <li><b>01</b><span>{isZh ? '活细胞少于 2 个邻居，死亡。' : 'A live cell with fewer than 2 neighbors dies.'}</span></li>
                  <li><b>02</b><span>{isZh ? '活细胞有 2 或 3 个邻居，存活。' : 'A live cell with 2 or 3 neighbors survives.'}</span></li>
                  <li><b>03</b><span>{isZh ? '活细胞多于 3 个邻居，死亡。' : 'A live cell with more than 3 neighbors dies.'}</span></li>
                  <li><b>04</b><span>{isZh ? '死细胞恰好有 3 个邻居，诞生。' : 'A dead cell with exactly 3 neighbors is born.'}</span></li>
                </ol>
              </div>
              <a href={labHref} className="conway-lab-link">
                <span>{isZh ? '探索相关系统' : 'Explore the related system'}</span>
                <strong>Cellular Automata Lab <ArrowRight size={16} /></strong>
              </a>
            </aside>
          </section>

          <section className="conway-binary-essay" aria-labelledby="conway-binary-title">
            <header className="conway-binary-header">
              <p className="conway-kicker">{isZh ? '二元世界' : 'Binary worlds'}</p>
              <h2 id="conway-binary-title" className="conway-binary-title font-display">
                {isZh ? '两个符号，足以长出一个宇宙。' : 'Two symbols are enough to grow a universe.'}
              </h2>
              <p className="conway-binary-lead">
                {isZh
                  ? 'Conway 的棋盘把每个细胞压缩成一个判断：生或死。《易经》把每一爻压缩成阴或阳。它们不是同一套思想，却从同一种最小结构出发。'
                  : "Conway's board compresses every cell into one decision: alive or dead. The I Ching compresses every line into yin or yang. They are not the same system, but they begin with the same minimal structure."}
              </p>
              <p className="conway-binary-thesis">
                {isZh ? '真正互通的，不是解释，而是组合。' : 'What connects them is not interpretation, but combination.'}
              </p>
            </header>

            <div className="conway-binary-chapter conway-binary-alphabet">
              <div className="conway-binary-chapter-copy">
                <p className="conway-binary-index">01 / {isZh ? '共同字母表' : 'Shared alphabet'}</p>
                <h3>{isZh ? '底层编码的互通' : 'The common code underneath'}</h3>
                <p>
                  {isZh
                    ? '在细胞自动机里，0 与 1 存储死亡和生存；在卦象里，断开的阴爻与连续的阳爻记录阴与阳。当一个位置只有两种可能，它承载的信息量就是一个 bit。'
                    : 'In cellular automata, 0 and 1 store dead and alive. In the hexagrams, a broken yin line and an unbroken yang line record yin and yang. When one position has only two possibilities, it carries one bit of information.'}
                </p>
              </div>

              <div className="conway-state-ledger" aria-label={isZh ? '二进制、细胞状态与阴阳的形式对应' : 'Formal pairing of binary, cell states, yin, and yang'}>
                <div>
                  <code>0</code>
                  <span className="conway-state-cell" aria-hidden />
                  <span className="conway-yao is-yin" aria-hidden />
                  <span>{isZh ? '死亡 · 阴' : 'Dead · Yin'}</span>
                </div>
                <div>
                  <code>1</code>
                  <span className="conway-state-cell is-alive" aria-hidden />
                  <span className="conway-yao is-yang" aria-hidden />
                  <span>{isZh ? '生存 · 阳' : 'Alive · Yang'}</span>
                </div>
              </div>
            </div>

            <div className="conway-binary-chapter conway-binary-space">
              <div className="conway-binary-chapter-copy">
                <p className="conway-binary-index">02 / {isZh ? '状态空间' : 'State space'}</p>
                <h3>{isZh ? '从 8 到 64，再到 256' : 'From 8 to 64, then 256'}</h3>
                <p>
                  {isZh
                    ? '同一套二元组合，在不同问题里会长成不同的数学空间。八卦、六十四卦与 Elementary Cellular Automata 的规则表，在这里相遇。'
                    : 'The same binary combinatorics grows into different mathematical spaces for different questions. This is where the trigrams, the 64 hexagrams, and Elementary Cellular Automata rule tables meet.'}
                </p>
              </div>

              <div className="conway-power-grid">
                <article>
                  <strong>2<sup>3</sup> = 8</strong>
                  <span>{isZh ? '三个输入' : 'Three inputs'}</span>
                  <p>{isZh ? '左邻、自身、右邻各有 0 / 1 两态，组成 000—111 八种局部邻域。' : 'Left, self, and right each hold 0 or 1, producing eight local neighborhoods from 000 to 111.'}</p>
                </article>
                <article>
                  <strong>2<sup>6</sup> = 64</strong>
                  <span>{isZh ? '六个位置' : 'Six positions'}</span>
                  <p>{isZh ? '上下两个三爻卦以 8 × 8 组合成六十四卦，也就是 64 个六位二元状态。' : 'Two three-line trigrams combine as 8 × 8 to form 64 hexagrams: 64 six-bit states.'}</p>
                </article>
                <article>
                  <strong>2<sup>8</sup> = 256</strong>
                  <span>{isZh ? '八个输出' : 'Eight outputs'}</span>
                  <p>{isZh ? '规则表要为八种邻域各指定 0 或 1，因此共有 256 种 Elementary Rules。' : 'A rule table assigns 0 or 1 to each of eight neighborhoods, creating 256 Elementary Rules.'}</p>
                </article>
              </div>

              <div className="conway-trigram-map" aria-label={isZh ? '八种三位二元状态与八卦的形式配对' : 'Formal pairing of eight three-bit states with the eight trigrams'}>
                {I_CHING_TRIGRAMS.map((trigram) => (
                  <div key={trigram.bits}>
                    <code>{trigram.bits}</code>
                    <strong aria-hidden>{trigram.symbol}</strong>
                    <span>{trigram.name[language]} · {trigram.nature[language]}</span>
                  </div>
                ))}
              </div>
              <p className="conway-binary-note">
                {isZh
                  ? '这里采用阳 = 1、阴 = 0 的约定，展示的是形式上的一一配对。六十四卦描述的是 2⁶ 个状态；256 条 Elementary Rules 描述的是八种输入各自如何输出。两者共享组合数学，但不是同一种自动机。'
                  : 'This uses yang = 1 and yin = 0 as a formal one-to-one pairing. The 64 hexagrams describe 2⁶ states; the 256 Elementary Rules describe how each of eight inputs produces an output. They share combinatorics, but they are not the same automaton.'}
              </p>
            </div>

            <div className="conway-binary-chapter conway-leibniz-bridge">
              <div className="conway-binary-chapter-copy">
                <p className="conway-binary-index">03 / {isZh ? '历史桥梁' : 'Historical bridge'}</p>
                <h3>{isZh ? '莱布尼茨看见了这次相遇' : 'Leibniz saw the systems meet'}</h3>
                <p>
                  {isZh
                    ? '莱布尼茨不是从《易经》发明二进制：二进制在先，跨文化的辨认在后。白晋把邵雍体系中的伏羲六十四卦图寄给他；在阴 = 0、阳 = 1，并采用特定读爻方向时，六十四种组合可以读成 0—63。'
                    : 'Leibniz did not invent binary from the I Ching: the binary system came first, and the cross-cultural recognition came later. Joachim Bouvet sent him the Fuxi hexagram diagram associated with Shao Yong; with yin = 0, yang = 1, and a particular reading direction, its 64 combinations can be read as 0–63.'}
                </p>
              </div>

              <ol className="conway-bridge-timeline">
                <li>
                  <span>{isZh ? '此前' : 'Before'}</span>
                  <p>{isZh ? '莱布尼茨已经形成只用 0 与 1 的二进制算术。' : 'Leibniz had already developed arithmetic using only 0 and 1.'}</p>
                </li>
                <li>
                  <span>1701</span>
                  <p>{isZh ? '白晋从北京寄来伏羲六十四卦图，并指出形式上的相似。' : 'Bouvet sent the Fuxi hexagram diagram from Beijing and pointed out the formal resemblance.'}</p>
                </li>
                <li>
                  <span>1703</span>
                  <p>{isZh ? '莱布尼茨在《二进制算术的阐释》中公开写下这条联系。' : 'Leibniz published the connection in his Explanation of Binary Arithmetic.'}</p>
                </li>
              </ol>

              <div className="conway-bridge-caveat">
                <p>
                  {isZh
                    ? '历史事实是：这场相遇确实发生过。更克制的结论是：它证明了两套符号系统可以共享二元结构，不证明《易经》预言了计算机，也不代表常用的文王卦序就是 0—63。'
                    : 'The historical fact is that this encounter happened. The more careful conclusion is that two symbolic systems can share a binary structure—not that the I Ching predicted computers, or that the standard King Wen sequence is a 0–63 count.'}
                </p>
                <div className="conway-bridge-sources">
                  <a href="https://philo-labo.fr/fichiers/Leibniz%20-%20Arithmetique%20binaire.pdf" target="_blank" rel="noreferrer">
                    {isZh ? '莱布尼茨 1703 原文 ↗' : 'Leibniz’s 1703 paper ↗'}
                  </a>
                  <a href="https://www.leibniz-translations.com/fuxi" target="_blank" rel="noreferrer">
                    {isZh ? '伏羲卦图通信译文 ↗' : 'Fuxi correspondence translation ↗'}
                  </a>
                  <a href={labHref}>{isZh ? '进入 256 Rules 实验室 →' : 'Open the 256 Rules Lab →'}</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const CellularAutomataLabFullPage: React.FC<{
  homeHref: string;
  conwayHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, conwayHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [selectedRule, setSelectedRule] = React.useState(() => {
    if (typeof window === 'undefined') return 30;
    const rawRuleParam = new URLSearchParams(window.location.search).get('rule');
    if (rawRuleParam === null || rawRuleParam.trim() === '') return 30;
    const ruleParam = Number(rawRuleParam);
    return Number.isInteger(ruleParam) && ruleParam >= 0 && ruleParam < ELEMENTARY_RULE_COUNT ? ruleParam : 30;
  });
  const [generation, setGeneration] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(() =>
    typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [speedMs, setSpeedMs] = React.useState(720);
  const [ruleSearch, setRuleSearch] = React.useState('');
  const [searchMessage, setSearchMessage] = React.useState('');
  const [isPageVisible, setIsPageVisible] = React.useState(() =>
    typeof document === 'undefined' || !document.hidden,
  );

  const visibleRules = React.useMemo(() => {
    const query = ruleSearch.trim();
    const rules = Array.from({ length: ELEMENTARY_RULE_COUNT }, (_, rule) => rule);
    return query ? rules.filter((rule) => String(rule).includes(query)) : rules;
  }, [ruleSearch]);

  React.useEffect(() => {
    if (!isRunning || !isPageVisible) return undefined;
    const intervalId = window.setInterval(() => {
      setGeneration((currentGeneration) => currentGeneration + 1);
    }, speedMs);

    return () => window.clearInterval(intervalId);
  }, [isPageVisible, isRunning, speedMs]);

  React.useEffect(() => {
    const handleVisibilityChange = () => setIsPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  React.useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = () => {
      if (reducedMotionQuery.matches) setIsRunning(false);
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotion);
    return () => reducedMotionQuery.removeEventListener('change', handleReducedMotion);
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('rule', String(selectedRule));
    const query = params.toString();
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  }, [selectedRule]);

  const selectRule = (rule: number) => {
    setSelectedRule(rule);
    setGeneration(0);
    setSearchMessage('');
  };

  const jumpToRule = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ruleSearch.trim() === '') {
      setSearchMessage(isZh ? '请输入 0–255 之间的整数。' : 'Enter a whole number from 0–255.');
      return;
    }
    const rule = Number(ruleSearch);
    if (!Number.isInteger(rule) || rule < 0 || rule >= ELEMENTARY_RULE_COUNT) {
      setSearchMessage(isZh ? '请输入 0–255 之间的整数。' : 'Enter a whole number from 0–255.');
      return;
    }
    selectRule(rule);
    setRuleSearch('');
  };

  const ruleBrowser = (
    <>
      <div className="cellular-rule-browser-head">
        <div>
          <p className="elementary-rule-label">{isZh ? '规则浏览器' : 'Rule browser'}</p>
          <strong>{visibleRules.length} / {ELEMENTARY_RULE_COUNT}</strong>
        </div>
        <form className="cellular-rule-search" onSubmit={jumpToRule}>
          <label htmlFor="cellular-rule-search">{isZh ? '跳到规则' : 'Jump to rule'}</label>
          <div>
            <input
              id="cellular-rule-search"
              value={ruleSearch}
              onChange={(event) => {
                setRuleSearch(event.target.value.replace(/\D/g, '').slice(0, 3));
                setSearchMessage('');
              }}
              inputMode="numeric"
              autoComplete="off"
              placeholder="0–255"
            />
            <button type="submit">{isZh ? '前往' : 'Go'}</button>
          </div>
          <span className="cellular-rule-search-message" role="status">{searchMessage}</span>
        </form>
      </div>

      <div className="elementary-featured-rules" aria-label={isZh ? '常见规则' : 'Featured rules'}>
        {FEATURED_ELEMENTARY_RULES.map((rule) => (
          <button
            key={rule}
            type="button"
            className={selectedRule === rule ? 'is-selected' : ''}
            onClick={() => selectRule(rule)}
            aria-label={isZh ? `精选 Rule ${rule}` : `Featured Rule ${rule}`}
            aria-pressed={selectedRule === rule}
          >
            Rule {rule}
          </button>
        ))}
      </div>

      <div className="cellular-rule-scroll">
        <div className="elementary-rule-index" aria-label={isZh ? '一维元胞自动机规则列表' : 'Elementary cellular automata rule list'}>
          {visibleRules.map((rule) => (
            <ElementaryRuleThumb key={rule} rule={rule} selected={selectedRule === rule} onSelect={selectRule} />
          ))}
        </div>
      </div>
    </>
  );

  const playbackControls = (
    <>
      <div className="cellular-playback-actions">
        <button type="button" className="conway-control-button" onClick={() => setIsRunning((value) => !value)}>
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          <span>{isRunning ? (isZh ? '暂停' : 'Pause') : isZh ? '运行' : 'Run'}</span>
        </button>
        <button
          type="button"
          className="conway-control-button conway-control-button-muted"
          onClick={() => setGeneration((currentGeneration) => currentGeneration + 1)}
          disabled={isRunning}
        >
          <ArrowRight size={16} />
          <span>{isZh ? '单步' : 'Step'}</span>
        </button>
        <button
          type="button"
          className="conway-control-button conway-control-button-muted"
          onClick={() => setGeneration(0)}
        >
          <RotateCcw size={16} />
          <span>{isZh ? '重置' : 'Reset'}</span>
        </button>
      </div>
      <div className="cellular-speed-group" aria-label={isZh ? '播放速度' : 'Playback speed'}>
        {[{ label: '0.5×', value: 1440 }, { label: '1×', value: 720 }, { label: '2×', value: 360 }].map((speed) => (
          <button
            key={speed.value}
            type="button"
            className={speedMs === speed.value ? 'is-selected' : ''}
            aria-pressed={speedMs === speed.value}
            onClick={() => setSpeedMs(speed.value)}
          >
            {speed.label}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div className="page-shell conway-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="conway-rules-page">
        <div className="conway-rules-shell">
          <div className="conway-rules-topbar">
            <div className="conway-topbar-links">
              <a href={homeHref} className="conway-back-link inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft size={16} />
                {isZh ? '返回主页' : 'Back to Home'}
              </a>
              <a href={conwayHref} className="conway-back-link text-sm font-medium">
                Conway’s Game of Life
              </a>
            </div>
          <HeaderControls
            language={language}
            setLanguage={setLanguage}
            themePreference={themePreference}
            theme={theme}
            setThemePreference={setThemePreference}
          />
          </div>

          <header className="conway-rules-header">
            <div className="conway-rules-identity">
              <div className="conway-rules-app-icon">
                <ProjectsCrmCssIcon label={isZh ? "Conway's Game of Life CSS app 图标" : "Conway's Game of Life CSS app icon"} />
              </div>
              <div className="conway-rules-copy">
                <p className="conway-kicker">One-dimensional rule explorer</p>
                <h1 className="conway-rules-title font-display font-bold tracking-tight">
                  Cellular Automata Lab
                </h1>
                <p className="conway-rules-subtitle">
                  {isZh
                    ? '探索全部 256 个一维元胞自动机规则：每个 8-bit 规则，都会长成不同的黑白秩序。'
                    : 'Explore all 256 elementary cellular automata: each 8-bit rule grows into a different black-and-white order.'}
                </p>
              </div>
            </div>
          </header>

          <ElementaryRuleViewer
            rule={selectedRule}
            generation={generation}
            language={language}
            ruleBrowser={ruleBrowser}
            playbackControls={playbackControls}
          />
        </div>
      </main>
    </div>
  );
};

const FilmGalleryFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const filmStripRef = React.useRef<HTMLDivElement>(null);
  const [installPrompt, setInstallPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches,
  );
  const [isDownloading, setIsDownloading] = React.useState(false);

  React.useEffect(() => {
    const captureInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const markInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', captureInstallPrompt);
    window.addEventListener('appinstalled', markInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
      window.removeEventListener('appinstalled', markInstalled);
    };
  }, []);

  const scrollFilmStrip = (direction: -1 | 1) => {
    const strip = filmStripRef.current;
    if (!strip) return;
    strip.scrollBy({
      left: direction * Math.min(strip.clientWidth * 0.82, 760),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const installFilmGallery = async () => {
    if (isInstalled) return;
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') setIsInstalled(true);
      setInstallPrompt(null);
      return;
    }
    window.alert(
      isZh
        ? '如果浏览器没有弹出安装视窗：iPhone / iPad 请点分享，再选择「加入主画面」；Safari 桌面版请选择 File → Add to Dock。'
        : 'If no install window appears: on iPhone or iPad, tap Share → Add to Home Screen. In desktop Safari, choose File → Add to Dock.',
    );
  };

  const downloadFilmGallery = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const offlinePhotos = await Promise.all(filmGalleryFrames.map(async ({ photo, frameNumber }) => {
        const response = await fetch(resolveAssetPath(baseUrl, photo.src));
        if (!response.ok) throw new Error(`Unable to download frame ${frameNumber}`);
        const blob = await response.blob();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
        const camera = filmGalleryCameras.find((item) => item.frameNumbers.includes(frameNumber));
        const stock = filmGalleryStocks.find((item) => item.frameNumbers.includes(frameNumber));
        return { frameNumber, dataUrl, alt: photo.alt[language], caption: photo.caption[language], camera: camera?.name ?? '', stock: stock?.name ?? '' };
      }));
      const galleryData = JSON.stringify(offlinePhotos).replace(/</g, '\\u003c');
      const offlineHtml = `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Film Gallery — Eden Tan</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f3ef;color:#171411;font-family:system-ui,-apple-system,sans-serif}.wrap{width:min(1080px,100%);margin:auto;padding:clamp(24px,6vw,80px)}.k{font:700 12px ui-monospace,monospace;letter-spacing:.15em;text-transform:uppercase;color:#766f68}h1{font-size:clamp(56px,12vw,138px);line-height:.88;letter-spacing:-.07em;margin:22px 0 28px}.intro{max-width:720px;font-size:clamp(18px,2.4vw,28px);line-height:1.25;color:#514c47}.gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(24px,4vw,52px);margin-top:80px}figure{margin:0}img{display:block;width:100%;height:auto;border-radius:18px;background:#171411}figcaption{display:grid;gap:7px;padding-top:14px}.n{font:700 12px ui-monospace,monospace;color:#176b87}.gear{font-size:13px;color:#766f68}.cap{font-size:15px;line-height:1.5}@media(max-width:680px){.gallery{grid-template-columns:1fr;margin-top:48px}h1{font-size:58px}}
</style></head><body><main class="wrap"><p class="k">15 frames · 3 cameras · 2 film stocks</p><h1>Film Gallery</h1><p class="intro">Fifteen records of stopping to look: streets, water, buildings, temples, and people who happened to enter the frame.</p><section class="gallery" id="gallery"></section></main><script>
var photos=${galleryData},root=document.getElementById('gallery');photos.forEach(function(p){var f=document.createElement('figure'),img=document.createElement('img'),c=document.createElement('figcaption'),n=document.createElement('span'),g=document.createElement('span'),d=document.createElement('span');img.src=p.dataUrl;img.alt=p.alt;n.className='n';n.textContent=String(p.frameNumber).padStart(2,'0');g.className='gear';g.textContent=p.camera+' · '+p.stock;d.className='cap';d.textContent=p.caption;c.append(n,g,d);f.append(img,c);root.appendChild(f)});
</script></body></html>`;
      const file = new Blob([offlineHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'film-gallery-offline.html';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.alert(isZh ? '照片下载失败，请确认网络后再试一次。' : 'The photos could not be downloaded. Check your connection and try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="page-shell film-gallery-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="film-gallery-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="film-gallery-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="film-gallery-hero py-16 text-center md:py-24">
            <p className="film-gallery-kicker mx-auto">
              {isZh
                ? `${filmGalleryPhotos.length} 格 · 3 台相机 · 2 种胶卷`
                : `${filmGalleryPhotos.length} frames · 3 cameras · 2 film stocks`}
            </p>
            <h1 className="film-gallery-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Film Gallery' : 'Film Gallery'}
            </h1>
            <p className="film-gallery-subtitle mx-auto mt-5">
              {isZh
                ? '它不太像作品集，更像十五次停下来看的记录：街道、水岸、建筑、庙宇，以及偶然走进画面的人。'
                : 'Less a portfolio than fifteen records of stopping to look: streets, water, buildings, temples, and people who happened to enter the frame.'}
            </p>
            <p className="film-gallery-copy mx-auto mt-5">
              {isZh
                ? '使用 Konica Auto S2、Rolleiflex Old Standard (Model 621) 与 Zeiss Ikon Contessa 35 拍摄，胶卷为 Kodak Gold 200 和 400。每张照片下方保留当时使用的相机与胶卷。'
                : 'Shot on the Konica Auto S2, Rolleiflex Old Standard (Model 621), and Zeiss Ikon Contessa 35 with Kodak Gold 200 and 400. The camera and film stock stay with each frame below.'}
            </p>
            <div className="film-gallery-app-actions">
              <button type="button" onClick={installFilmGallery} disabled={isInstalled}>
                <Plus size={16} />
                <span>{isInstalled ? (isZh ? '已安装' : 'Installed') : isZh ? '安装 App' : 'Install app'}</span>
              </button>
              <button type="button" className="is-primary" onClick={downloadFilmGallery} disabled={isDownloading}>
                <Download size={16} />
                <span>{isDownloading ? (isZh ? '正在打包照片…' : 'Packing photos…') : isZh ? '下载离线版' : 'Download offline'}</span>
              </button>
            </div>
          </header>

          <section className="film-gallery-section pb-16 md:pb-24">
            <div className="film-gallery-section-header">
              <div className="film-gallery-section-head">
                <p className="film-gallery-kicker">
                  {isZh
                    ? `横向胶卷 / ${filmGalleryPhotos.length} 格`
                    : `Horizontal roll / ${filmGalleryPhotos.length} frames`}
                </p>
                <h2 className="film-gallery-section-title font-display font-bold tracking-tight">
                  {isZh ? '沿着胶卷，从左看到右。' : 'Follow the roll from left to right.'}
                </h2>
              </div>
              <div className="film-gallery-strip-actions">
                <p>{isZh ? '拖动、滑动，或使用方向键。' : 'Drag, swipe, or use the arrow controls.'}</p>
                <div>
                  <button type="button" onClick={() => scrollFilmStrip(-1)} aria-label={isZh ? '向左看上一组照片' : 'Scroll to previous film frames'}>
                    <ArrowLeft size={19} />
                  </button>
                  <button type="button" onClick={() => scrollFilmStrip(1)} aria-label={isZh ? '向右看下一组照片' : 'Scroll to next film frames'}>
                    <ArrowRight size={19} />
                  </button>
                </div>
              </div>
            </div>

            <div className="film-gallery-strip-shell mt-12">
              <div
                ref={filmStripRef}
                className="film-gallery-strip"
                role="region"
                aria-label={isZh ? '可横向滚动的胶片照片' : 'Horizontally scrollable film photographs'}
                tabIndex={0}
              >
              {filmGalleryFrames.map(({ photo, frameNumber }, index) => {
                const camera = filmGalleryCameras.find((item) => item.frameNumbers.includes(frameNumber));
                const stock = filmGalleryStocks.find((item) => item.frameNumbers.includes(frameNumber));

                return (
                  <figure
                    key={photo.src}
                    className="film-gallery-frame"
                  >
                    <div className="film-gallery-negative">
                      <img
                        src={resolveAssetPath(baseUrl, photo.src)}
                        alt={photo.alt[language]}
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    </div>
                    <figcaption>
                      <span className="film-gallery-frame-index">{String(frameNumber).padStart(2, '0')}</span>
                      {camera && stock ? (
                        <span className="film-gallery-frame-gear">
                          <span>{camera.name}</span>
                          <span aria-hidden="true">·</span>
                          <span>{stock.name}</span>
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                );
              })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const LifeFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [featuredVideo, ...archiveVideos] = lifeVideos;

  return (
    <div className="page-shell life-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="life-shell mx-auto">
          <div className="life-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="life-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="life-hero py-16 text-center md:py-24">
            <p className="life-kicker mx-auto">{isZh ? 'Life Notes / Video field' : 'Life Notes / Video field'}</p>
            <h1 className="life-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '出门的时候，系统先安静下来。' : 'When life leaves the desk.'}
            </h1>
            <p className="life-subtitle mx-auto mt-5">
              {isZh
                ? '不是旅行广告，也不是打卡清单。只是把海、风、岛和路上的片段，收进一个可以回看的生活档案。'
                : 'Not travel advertising. Not a checklist. A small archive of sea, wind, islands, and the parts of life worth replaying.'}
            </p>
            <div className="life-hero-actions mt-7 flex flex-wrap justify-center gap-5">
              <a href="#life-feature" className="life-text-cta">
                {isZh ? '看主片段' : 'Watch feature'} <span aria-hidden>›</span>
              </a>
              <a href="#life-archive" className="life-text-cta life-text-cta-muted">
                {isZh ? '看全部档案' : 'View archive'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section id="life-feature" className="life-feature-grid">
            <div className="life-feature-copy">
              <p className="life-kicker">{isZh ? 'Featured field note' : 'Featured field note'}</p>
              <h2 className="font-display font-bold tracking-tight">{featuredVideo.title[language]}</h2>
              <p>
                {isZh
                  ? '先放最大的一段。让画面比说明更早出现，页面只负责给它一个安静的观看位置。'
                  : 'The first clip gets the largest stage. Let the footage arrive before the explanation, with the page giving it a quiet place to breathe.'}
              </p>
              <a href={featuredVideo.href} target="_blank" rel="noopener noreferrer" className="life-text-cta">
                {isZh ? '在 YouTube 打开' : 'Open on YouTube'} <ExternalLink size={15} />
              </a>
            </div>
            <div className="life-feature-stage">
              <iframe
                src={featuredVideo.embedSrc}
                title={`${featuredVideo.title[language]} YouTube player`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>

          <section id="life-archive" className="life-section py-16 md:py-24">
            <div className="life-section-head">
              <p className="life-kicker">{isZh ? 'Small archive' : 'Small archive'}</p>
              <h2 className="life-section-title font-display font-bold tracking-tight">
                {isZh ? '留下来的，不一定是最完整的旅程。' : 'The saved parts are not always the whole trip.'}
              </h2>
              <p className="life-section-copy">
                {isZh
                  ? '这些片段更像生活里的样本：一个海岛、一段浪、一种离开日常之后身体重新醒来的节奏。'
                  : 'These clips work like field samples: an island, a wave, a rhythm where the body wakes up outside the usual routine.'}
              </p>
            </div>
            <div className="life-archive-grid mt-12">
              {archiveVideos.map((video, index) => (
                <article key={video.href} className="life-video-card">
                  <a href={video.href} target="_blank" rel="noopener noreferrer" className="life-video-thumb" aria-label={`${isZh ? '在 YouTube 打开' : 'Open on YouTube'} ${video.title[language]}`}>
                    <img src={video.thumbnailSrc} alt="" loading="lazy" />
                    <span className="life-play-mark" aria-hidden>
                      <span />
                    </span>
                  </a>
                  <div className="life-video-copy">
                    <p className="life-video-index">{String(index + 2).padStart(2, '0')}</p>
                    <h3 className="font-display font-bold tracking-tight">{video.title[language]}</h3>
                    <a href={video.href} target="_blank" rel="noopener noreferrer" className="life-text-cta life-text-cta-muted">
                      {isZh ? '在 YouTube 打开' : 'Open on YouTube'} <ExternalLink size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="life-note">
            <p className="life-kicker">{isZh ? 'Editorial rule' : 'Editorial rule'}</p>
            <p>
              {isZh
                ? 'Life 页面不需要解释太多。画面负责记忆，文字只负责给它一个位置。'
                : 'The Life page does not need to explain too much. Footage holds the memory. Words only give it a place.'}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

const brandGuidePrinciples = [
  {
    title: { en: 'Clarity', zh: '清晰' },
    copy: {
      en: 'One page. One point. One next step.',
      zh: '一页一个重点，一个下一步。',
    },
  },
  {
    title: { en: 'Restraint', zh: '克制' },
    copy: {
      en: 'Remove what does not help the reader decide.',
      zh: '删掉不能帮助判断的东西。',
    },
  },
  {
    title: { en: 'Depth', zh: '层级' },
    copy: {
      en: 'Use size, space, and line density.',
      zh: '用尺寸、留白和线条疏密。',
    },
  },
  {
    title: { en: 'Trust', zh: '信任' },
    copy: {
      en: 'Make it feel stable before asking for action.',
      zh: '先稳定，再行动。',
    },
  },
] as const;

const brandGuideDetailRules = [
  {
    title: { en: 'Whitespace shortens the decision path', zh: '留白缩短判断路径' },
    copy: {
      en: 'Let the main idea breathe.',
      zh: '让主信息有呼吸。',
    },
  },
  {
    title: { en: 'Radius creates a shared touch language', zh: '圆角统一触感' },
    copy: {
      en: 'Use one radius scale.',
      zh: '使用同一套圆角 scale。',
    },
  },
  {
    title: { en: 'Color must earn its place', zh: '颜色必须有来源' },
    copy: {
      en: 'Use color only when it explains.',
      zh: '颜色只在能解释时使用。',
    },
  },
  {
    title: { en: 'Short copy keeps the page decisive', zh: '短文案让页面更果断' },
    copy: {
      en: 'Say the point fast.',
      zh: '快速说重点。',
    },
  },
  {
    title: { en: 'Sharp visuals carry proof', zh: '清楚视觉承载证明' },
    copy: {
      en: 'Use real, sharp proof.',
      zh: '用真实、清楚的证明。',
    },
  },
  {
    title: { en: 'Motion explains, never distracts', zh: '动效解释，不抢戏' },
    copy: {
      en: 'Move only what helps.',
      zh: '只动有帮助的东西。',
    },
  },
] as const;

const brandGuidePalette = [
  {
    name: { en: 'Paper', zh: 'Paper' },
    hex: '#ffffff',
    role: { en: 'Primary canvas', zh: '主画布' },
    usage: { en: 'Main page background.', zh: '主页面背景。' },
  },
  {
    name: { en: 'Soft', zh: 'Soft' },
    hex: '#f5f5f7',
    role: { en: 'Section band', zh: '章节底色' },
    usage: { en: 'Quiet section surface.', zh: '安静的 section 底色。' },
  },
  {
    name: { en: 'Muted', zh: 'Muted' },
    hex: '#6e6e73',
    role: { en: 'Secondary voice', zh: '次级语气' },
    usage: { en: 'Support text and labels.', zh: '辅助文字和标签。' },
  },
  {
    name: { en: 'Ink', zh: 'Ink' },
    hex: '#111113',
    role: { en: 'Primary text', zh: '主文字' },
    usage: { en: 'Headlines and key text.', zh: '标题和重点文字。' },
  },
  {
    name: { en: 'Deep', zh: 'Deep' },
    hex: '#050505',
    role: { en: 'Inverted emphasis', zh: '反色重点' },
    usage: { en: 'Rare high-contrast moments.', zh: '少量高对比时刻。' },
  },
  {
    name: { en: 'Line', zh: 'Line' },
    hex: '#d9d9df',
    role: { en: 'Quiet divider', zh: '安静分隔' },
    usage: { en: 'Borders and dividers.', zh: '边框和分隔线。' },
  },
] as const;

const brandGuideAccent = [
  {
    name: { en: 'Eden Mint / Orange', zh: 'Eden Mint / Orange' },
    hex: { light: '#7bdcb5', dark: '#f28c38' },
    role: { en: 'Primary by theme', zh: '跟随主题的主品牌色' },
    usage: {
      en: 'Mint in light mode. Orange in dark mode.',
      zh: '浅色用 Mint，深色用 Orange。',
    },
  },
  {
    name: { en: 'System Amber / Blue', zh: 'System Amber / Blue' },
    hex: { light: '#ffa340ed', dark: '#6fa4f0e6' },
    role: { en: 'Secondary by theme', zh: '跟随主题的系统辅助色' },
    usage: {
      en: 'Small system states and secondary signals.',
      zh: '小面积系统状态和次级信号。',
    },
  },
  {
    name: { en: 'Dream Purple', zh: 'Dream Purple' },
    hex: { light: '#a78bfa', dark: '#c4b5fd' },
    role: { en: 'Action color', zh: '行动色' },
    usage: {
      en: 'Links and action cues.',
      zh: '链接和行动提示。',
    },
  },
  {
    name: { en: 'Sky Tint', zh: 'Sky Tint' },
    hex: { light: '#dcebf8', dark: '#dcebf8' },
    role: { en: 'Cool support', zh: '冷色辅助' },
    usage: {
      en: 'Cool support tint.',
      zh: '冷色辅助。',
    },
  },
  {
    name: { en: 'Gold Tint', zh: 'Gold Tint' },
    hex: { light: '#f4dfb9', dark: '#f4dfb9' },
    role: { en: 'Warm support', zh: '暖色辅助' },
    usage: {
      en: 'Warm support tint.',
      zh: '暖色辅助。',
    },
  },
  {
    name: { en: 'Pink Tint', zh: 'Pink Tint' },
    hex: { light: '#f6d9d8', dark: '#f6d9d8' },
    role: { en: 'Human signal', zh: '人味信号' },
    usage: {
      en: 'Softer human moments.',
      zh: '柔和的人感时刻。',
    },
  },
  {
    name: { en: 'Green Tint', zh: 'Green Tint' },
    hex: { light: '#dcebd9', dark: '#dcebd9' },
    role: { en: 'System signal', zh: '系统信号' },
    usage: {
      en: 'Stable system signal.',
      zh: '稳定系统信号。',
    },
  },
] as const;

const brandGuideEngravedRules = [
  {
    title: { en: 'Tone comes from line density', zh: '明暗来自线的疏密' },
    copy: {
      en: 'Paper, single hatch, cross hatch, dense cross hatch. No soft gradients for shading.',
      zh: '留白、单向排线、交叉排线、加密交叉排线；不用柔和渐变做阴影。',
    },
  },
  {
    title: { en: 'Order comes from guilloché', zh: '秩序来自扭索纹' },
    copy: {
      en: 'Offset ring families, rosettes, and chain borders give every piece a symmetric, continuous frame.',
      zh: '偏心环纹、玫瑰饰和链状花边，让每张图都有对称、连续的外框。',
    },
  },
  {
    title: { en: 'One ink per piece', zh: '一张图一种墨' },
    copy: {
      en: 'Ink green, rose brown, bronze, violet, teal, or indigo on a pale paper. Dark theme turns the plate dark and the lines bronze gold.',
      zh: '墨绿、玫瑰棕、古铜、紫、青或靛蓝，配浅色纸；深色主题换成深色版面、古铜金线。',
    },
  },
  {
    title: { en: 'Golden ratio placement', zh: '黄金比例定位' },
    copy: {
      en: 'Put the focal symbol on a 38.2% / 61.8% line and let a Fibonacci spiral converge on it. Radii grow by 1.618.',
      zh: '主体落在 38.2% / 61.8% 线上，斐波那契螺旋收敛到它；半径按 1.618 递增。',
    },
  },
  {
    title: { en: 'Symbols, not people', zh: '画符号，不画人' },
    copy: {
      en: 'Use objects and ancient symbols such as the Eye of Horus, lotus, ankh, scales, or scarab. No faces, no text inside the art.',
      zh: '用器物与古代符号，例如荷鲁斯之眼、莲花、安卡、天平、圣甲虫；不画脸，图里不放文字。',
    },
  },
  {
    title: { en: 'Double rules frame everything', zh: '一切都用双线框住' },
    copy: {
      en: 'Cards, medals, and tickets use an outer hairline, a paper gap, and an inner hairline.',
      zh: '卡片、圆章、票券都用「外细线 + 纸色间隔 + 内细线」。',
    },
  },
] as const;

const brandGuideEngravedSpecimens = [
  { id: 'hatch', tone: 'ink', title: { en: 'Hatching scale', zh: '排线明暗阶' }, copy: { en: 'Four steps of tone from line density alone.', zh: '只靠线的疏密做出四档明暗。' } },
  { id: 'rosette', tone: 'rose', title: { en: 'Guilloché rosette', zh: '扭索纹玫瑰' }, copy: { en: 'Offset rings turning slowly around a double-rule medal.', zh: '偏心环纹围着双线圆章慢慢转。' } },
  { id: 'eye', tone: 'bronze', title: { en: 'Engraved symbol', zh: '凹版符号' }, copy: { en: 'The Eye of Horus drawn with hatching and rules only.', zh: '只用排线与双线画成的荷鲁斯之眼。' } },
  { id: 'border', tone: 'indigo', title: { en: 'Banknote border', zh: '钞票花边' }, copy: { en: 'Chain border, corner rosettes, and a golden-rectangle construction.', zh: '链状花边、角饰玫瑰与黄金矩形构造线。' } },
] as const;

const brandGuideTypography = [
  {
    name: 'MiSans',
    role: { en: 'Primary typeface', zh: '主字体' },
    sample: { en: 'Build order from complexity.', zh: 'Build order from complexity.' },
    detail: {
      en: 'Use everywhere except system labels.',
      zh: '除系统标签外都用它。',
    },
  },
  {
    name: 'MiSans VF',
    role: { en: 'Weight system', zh: '字重系统' },
    sample: {
      en: 'Light / Regular / Medium / Semibold / Bold',
      zh: 'Light / Regular / Medium / Semibold / Bold',
    },
    detail: {
      en: 'Use weight for hierarchy.',
      zh: '用字重做层级。',
    },
  },
  {
    name: 'JetBrains Mono',
    role: { en: 'System voice', zh: '系统声线' },
    sample: { en: 'STATUS / CURRENTLY BUILDING / 2026', zh: 'STATUS / CURRENTLY BUILDING / 2026' },
    detail: { en: 'Use for labels and status text.', zh: '用于标签和状态文字。' },
  },
] as const;

const brandGuideRhythm = [
  {
    title: { en: 'Hero', zh: '首屏' },
    copy: {
      en: 'One claim. One action.',
      zh: '一个判断，一个行动。',
    },
  },
  {
    title: { en: 'Sections', zh: '章节' },
    copy: {
      en: 'One idea per section.',
      zh: '一个 section 一个想法。',
    },
  },
  {
    title: { en: 'Grids', zh: '网格' },
    copy: {
      en: 'Editorial grids use 2 / 1 columns. The Home media collage uses two drifting rows.',
      zh: '内容网格用 2 / 1 栏；首页媒体拼贴用两行反向漂移。',
    },
  },
  {
    title: { en: 'Fluid page gutters', zh: '流体页面边距' },
    copy: {
      en: 'Use responsive gutters. Do not hard-cap the whole page.',
      zh: '使用响应式 gutter，不给整页设固定 max-width。',
    },
  },
] as const;

const brandGuideLayoutRules = [
  {
    title: { en: 'Use the available width', zh: '使用可用宽度' },
    copy: {
      en: 'Let sections and grids fill the page gutter.',
      zh: 'Section 和 grid 直接用到页面 gutter。',
    },
  },
  {
    title: { en: 'Two columns by default', zh: '默认两栏' },
    copy: {
      en: 'Two on desktop. One on mobile.',
      zh: '桌面两栏，手机一栏。',
    },
  },
  {
    title: { en: 'One visual, one idea', zh: '一个视觉，一个意思' },
    copy: {
      en: 'Art direction must explain the content.',
      zh: '视觉必须解释内容。',
    },
  },
  {
    title: { en: 'Cards need a reason', zh: '卡片要有理由' },
    copy: {
      en: 'Use cards for grouping, not decoration.',
      zh: '卡片用来分组，不是装饰。',
    },
  },
  {
    title: { en: 'Type follows its container', zh: '字号跟随容器' },
    copy: {
      en: 'Use clamp and container units when cards resize.',
      zh: '卡片缩放时用 clamp 和 container units。',
    },
  },
  {
    title: { en: 'Preserve the image', zh: '保留完整画面' },
    copy: {
      en: 'Contain by default. Crop only with intent.',
      zh: '默认完整显示，只在有意构图时裁切。',
    },
  },
] as const;

const brandGuideLayoutNumbers = [
  {
    value: { en: '44px', zh: '44px' },
    label: { en: 'Button / input minimum height.', zh: '按钮、输入框最小高度。' },
  },
  {
    value: { en: '2 max', zh: '最多 2 个' },
    label: { en: 'Hero buttons: primary + secondary.', zh: 'Hero 按钮：主按钮 + 次按钮。' },
  },
  {
    value: { en: '0.98-1.08', zh: '0.98-1.08' },
    label: { en: 'Large headline line-height ratio.', zh: '大标题行高比例。' },
  },
  {
    value: { en: '80-160px', zh: '80-160px' },
    label: { en: 'Desktop section top / bottom spacing.', zh: '桌面 section 上下留白。' },
  },
  {
    value: { en: '48-96px', zh: '48-96px' },
    label: { en: 'Mobile section top / bottom spacing.', zh: '手机 section 上下留白。' },
  },
  {
    value: { en: '16-24px', zh: '16-24px' },
    label: { en: 'Compact card inside padding.', zh: '紧凑卡片内部留白。' },
  },
  {
    value: { en: '24-32px', zh: '24-32px' },
    label: { en: 'Normal content card radius.', zh: '普通内容卡片圆角。' },
  },
  {
    value: { en: '20–48px', zh: '20–48px' },
    label: { en: 'Responsive page gutter. No global content cap.', zh: '响应式页面边距，不限制整页最大宽度。' },
  },
  {
    value: { en: '16:9', zh: '16:9' },
    label: { en: 'Home media banner aspect ratio.', zh: '首页媒体 banner 固定比例。' },
  },
  {
    value: { en: '4 + 5', zh: '4 + 5' },
    label: { en: 'Home collage: two rows drifting in opposite directions.', zh: '首页拼贴：两行，反向漂移。' },
  },
  {
    value: { en: '220–460px', zh: '220–460px' },
    label: { en: 'Home collage card width (clamp 30vw), 12px gap, 16px radius.', zh: '首页拼贴卡片宽度（clamp 30vw），间距 12px，圆角 16px。' },
  },
  {
    value: { en: '1 : 1.618', zh: '1 : 1.618' },
    label: { en: 'Golden ratio for engraved art: focal point on the 38.2% / 61.8% lines.', zh: '凹版插画的黄金比例：主体落在 38.2% / 61.8% 线上。' },
  },
  {
    value: { en: '0.16–0.2cqi', zh: '0.16–0.2cqi' },
    label: { en: 'Engraved hatch line width; scales with the art container.', zh: '凹版排线线宽，随画框缩放。' },
  },
  {
    value: { en: '40px', zh: '40px' },
    label: { en: 'Home banner CTA minimum height.', zh: '首页 banner CTA 最小高度。' },
  },
] as const;

const brandGuideVoicePairs = [
  {
    avoid: { en: 'I build AI products.', zh: '我会做 AI 产品。' },
    prefer: {
      en: 'Turn scattered work into reusable systems.',
      zh: '把散落的工作变成可复用系统。',
    },
  },
  {
    avoid: { en: 'A visionary brand.', zh: '一个有远见的品牌。' },
    prefer: {
      en: 'Knowledge should compound.',
      zh: '知识应该复利。',
    },
  },
  {
    avoid: { en: 'Empowering people to transform their future.', zh: '赋能每个人改变未来。' },
    prefer: {
      en: 'Make the next move clear.',
      zh: '让下一步变清楚。',
    },
  },
] as const;

const brandGuideUseCases = [
  {
    title: { en: 'Home', zh: 'Home' },
    copy: {
      en: 'Lead with the point of view. Then a drifting collage of nine material-backed 16:9 doors into products, systems, and lived work.',
      zh: '先说清观点，再用 9 个有真实素材、缓慢漂移的 16:9 入口，带人进入产品、系统与真实经历。',
    },
  },
  {
    title: { en: 'Projects', zh: 'Projects' },
    copy: { en: 'Problem, architecture, operations, proof, workflow.', zh: '问题、架构、运作、证明、流程。' },
  },
  {
    title: { en: 'Galleries', zh: '图库' },
    copy: { en: 'Keep the frame intact. Put factual metadata below.', zh: '保留完整画面，事实 metadata 放在图片下方。' },
  },
  {
    title: { en: 'Wiki', zh: 'Wiki' },
    copy: { en: 'Save durable knowledge, not one-shot answers.', zh: '保存可复用知识，不留一次性答案。' },
  },
  {
    title: { en: 'Interactive tools', zh: '互动工具' },
    copy: { en: 'One task at a time. Feedback must be immediate.', zh: '一次一个任务，反馈必须立即。' },
  },
  {
    title: { en: 'Story logs', zh: '故事记录' },
    copy: { en: 'Real moment first. Technical detail second.', zh: '真实时刻优先，技术细节其后。' },
  },
] as const;

const brandGuideHomeMediaRules = [
  {
    title: { en: 'Nine live doors', zh: '9 个真实入口' },
    copy: {
      en: 'The Home collage holds nine active destinations. Do not ship a placeholder card.',
      zh: '首页拼贴有 9 个可进入的目标。没有真实素材，就不要上线 placeholder 卡片。',
    },
  },
  {
    title: { en: 'Material first', zh: '真实素材优先' },
    copy: {
      en: 'Use a real image, a prepared video, or registered CSS art. Each medium must carry the project on its own.',
      zh: '使用真实图片、处理过的视频或已注册的 CSS art；每种媒介都必须能独立承载项目。',
    },
  },
  {
    title: { en: 'Two rows, opposite drift', zh: '两行，反向漂移' },
    copy: {
      en: 'Four cards on top, five below, drifting left and right on a 58s loop. Every card stays 16:9.',
      zh: '上行 4 张、下行 5 张，一左一右以 58 秒循环漂移；所有卡片保持 16:9。',
    },
  },
  {
    title: { en: 'Hover and focus pause', zh: '悬停与聚焦即暂停' },
    copy: {
      en: 'The drift stops on hover or keyboard focus so a card can be read and clicked. Reduced motion shows a still row.',
      zh: '鼠标悬停或键盘聚焦时停止漂移，卡片才读得清、点得到；reduced motion 时整行静止。',
    },
  },
  {
    title: { en: 'Action replaces labels', zh: '行动取代标签' },
    copy: {
      en: 'Linked cards reveal one centered white CTA. No tag, title, or description sits on the card surface.',
      zh: '可点击卡片只显示一个居中的白色 CTA；画面上不放 tag、title 或 description。',
    },
  },
  {
    title: { en: 'Videos play only when visible', zh: '视频只在可见时播放' },
    copy: {
      en: 'Loops are short, muted, inline, and paired with a poster. They pause once they drift out of view.',
      zh: '循环视频要短、静音、内联并配 poster；漂出视口后暂停。',
    },
  },
] as const;

const brandGuideAssetRules = [
  {
    title: { en: 'Engraving is the illustration default', zh: '插画默认用凹版语言' },
    copy: {
      en: 'Icons, product art, and in-app illustrations use the engraved line language. No photo-real renders, no people.',
      zh: '图标、产品插画与应用内插图默认用凹版线条语言；不用写实渲染，不画人。',
    },
  },
  {
    title: { en: 'App icons are framed', zh: 'App icon 有固定外框' },
    copy: {
      en: 'Square, rounded, and stable at small sizes.',
      zh: '正方形、圆角，小尺寸也要稳定。',
    },
  },
  {
    title: { en: 'Totems stay transparent', zh: '图腾保持透明底' },
    copy: {
      en: 'No forced app-icon frame or heavy outer box.',
      zh: '不强加 app icon 底或厚重外框。',
    },
  },
  {
    title: { en: 'Home banners use real material', zh: '首页 Banner 使用真实素材' },
    copy: {
      en: 'Use image, video, or registered CSS art in a stable 16:9 frame. No public placeholder.',
      zh: '在稳定的 16:9 画框中使用图片、视频或已注册 CSS art；公开页不放 placeholder。',
    },
  },
  {
    title: { en: 'Video needs a fallback', zh: '视频必须有 fallback' },
    copy: {
      en: 'Every loop needs a poster and a reduced-motion state.',
      zh: '每个循环视频都要有 poster 与 reduced-motion 状态。',
    },
  },
  {
    title: { en: 'CSS art comes from the registry', zh: 'CSS art 从 registry 取用' },
    copy: {
      en: 'Reuse the registered 16:9 component instead of copying its markup into Home.',
      zh: '复用已注册的 16:9 component，不把内部 markup 复制进 Home。',
    },
  },
  {
    title: { en: 'Photography keeps its frame', zh: '摄影保留原构图' },
    copy: {
      en: 'Use contain by default. Keep camera and film notes below.',
      zh: '默认 contain，相机与胶卷资讯放在图下。',
    },
  },
] as const;

const brandGuideCategories = [
  {
    name: { en: 'Foundation', zh: '基础层' },
    scope: { en: 'Start here', zh: '先看这里' },
    items: {
      en: ['Core thesis', 'Layout defaults', 'Size reference'],
      zh: ['核心主张', '版式默认值', '尺寸参考'],
    },
  },
  {
    name: { en: 'Surface system', zh: '表层系统' },
    scope: { en: 'Build the page', zh: '用于页面搭建' },
    items: {
      en: ['Theme colors', 'Engraved line language', 'Typography', 'Home media system', 'Motion boundaries'],
      zh: ['主题色', '凹版线条语言', '字体层级', '首页媒体系统', '动效边界'],
    },
  },
  {
    name: { en: 'Content usage', zh: '内容用法' },
    scope: { en: 'Apply by page type', zh: '按页面类型使用' },
    items: {
      en: ['Homepage', 'Project pages', 'Galleries', 'Wiki and stories'],
      zh: ['首页', '项目页', '图库', 'Wiki 与故事'],
    },
  },
] as const;

const brandGuideStoryRules = [
  {
    title: { en: 'Log the moment, not the score', zh: '记录时刻，不是战绩' },
    copy: {
      en: 'Remember the moment.',
      zh: '记住那个瞬间。',
    },
  },
  {
    title: { en: 'Only what really happened', zh: '只写真的' },
    copy: {
      en: 'Do not invent drama.',
      zh: '不要编戏剧效果。',
    },
  },
  {
    title: { en: 'Nicknames, not epic titles', zh: '用小名，别中二' },
    copy: {
      en: 'Use short names.',
      zh: '用短称呼。',
    },
  },
  {
    title: { en: 'Short, but cinematic', zh: '短，但有画面' },
    copy: {
      en: 'One beat per paragraph.',
      zh: '一段一个画面。',
    },
  },
  {
    title: { en: 'People first, details second', zh: '先有人，再有细节' },
    copy: {
      en: 'People carry the story.',
      zh: '人撑起故事。',
    },
  },
  {
    title: { en: 'Not a technical report', zh: '不是技术报告' },
    copy: {
      en: 'No jargon. No flexing.',
      zh: '不堆术语，不自夸。',
    },
  },
] as const;

const brandGuideStoryExample = {
  avoid: {
    en: 'The protagonist entered a dramatic conflict with the opposing archetype.',
    zh: '主角与对立原型进入戏剧性冲突。',
  },
  prefer: {
    en: 'He made the move. Everyone at the table went quiet.',
    zh: '他做了那个决定。桌边突然安静下来。',
  },
} as const;

const brandGuideMotionRules = [
  {
    title: { en: 'Object motion first', zh: '先动实体物件' },
    copy: {
      en: 'Move visible objects.',
      zh: '动可见物件。',
    },
  },
  {
    title: { en: 'Transform and opacity first', zh: '优先 transform 和 opacity' },
    copy: {
      en: 'Keep layout geometry stable.',
      zh: '保持布局尺寸稳定。',
    },
  },
  {
    title: { en: 'Ambient motion is slow and mechanical', zh: '环境动效只能慢、像机械' },
    copy: {
      en: 'Allowed: the Home collage drift and engraved ornaments turning once every 30s or slower. Never glow, scan lines, or card fades.',
      zh: '允许：首页拼贴漂移、凹版纹饰 30 秒以上转一圈。不用 glow、扫描线或 card fade。',
    },
  },
  {
    title: { en: 'Preserve reduced motion', zh: '保留 reduced motion' },
    copy: {
      en: 'Support `prefers-reduced-motion`.',
      zh: '支持 `prefers-reduced-motion`。',
    },
  },
  {
    title: { en: 'Hover is a quiet cue', zh: 'Hover 只做轻提示' },
    copy: {
      en: 'Media may scale to 1.025 while the centered CTA appears.',
      zh: '媒体最多放大到 1.025，同时显示居中 CTA。',
    },
  },
  {
    title: { en: 'Loop video is background motion', zh: '循环视频属于背景动效' },
    copy: {
      en: 'Keep it silent and short. The content remains understandable from its poster.',
      zh: '保持短且静音；只看 poster 也必须能理解内容。',
    },
  },
] as const;

const brandGuideCssRules = [
  {
    title: { en: 'Draw engraved lines with gradients', zh: '凹版线条用渐变画' },
    copy: {
      en: 'Hatching, rings, and rules come from repeating gradients and box-shadow, never border colours. Line widths use cqi so the art scales.',
      zh: '排线、环纹与双线用 repeating gradient 与 box-shadow 画，不写 border 颜色；线宽用 cqi，画面随容器缩放。',
    },
  },
  {
    title: { en: 'Material before entry', zh: '有素材才有入口' },
    copy: {
      en: 'A public Home banner requires an image, video, or registered CSS art asset.',
      zh: '公开首页 banner 必须有图片、视频或已注册 CSS art 资产。',
    },
  },
  {
    title: { en: 'Navigable media gets a CTA', zh: '可导航媒体必须有 CTA' },
    copy: {
      en: 'Use one centered action pill and an accessible link label. Do not fake a button on a dead card.',
      zh: '使用一个居中行动按钮与可访问 link label；不能在无链接卡片上伪装按钮。',
    },
  },
  {
    title: { en: 'Prepare video for the web', zh: '视频先为网页处理' },
    copy: {
      en: 'Use H.264, yuv420p, fast-start, muted background loops, and an explicit poster.',
      zh: '使用 H.264、yuv420p、fast-start、静音背景循环与明确 poster。',
    },
  },
  {
    title: { en: 'No background or card fade', zh: '不要 background / card fade' },
    copy: {
      en: 'No glow, scan lines, or card fades.',
      zh: '不要 glow、扫描线、card fade。',
    },
  },
  {
    title: { en: 'Solid category language', zh: '分类用实色系统' },
    copy: {
      en: 'Use rails, dots, chips, and double rules. One ink per category.',
      zh: '用线、点、chip 和双线；一个分类一种墨色。',
    },
  },
  {
    title: { en: 'Registry before reuse', zh: '复用前先查 registry' },
    copy: {
      en: 'Reuse CSS art through `css-art.registry.ts`.',
      zh: '通过 `css-art.registry.ts` 复用 CSS art。',
    },
  },
  {
    title: { en: 'Separate art from layout', zh: '视觉与布局分离' },
    copy: {
      en: 'Art in `styles/css-art`; layout in `styles/pages`.',
      zh: 'Art 放 `styles/css-art`，layout 放 `styles/pages`。',
    },
  },
  {
    title: { en: 'Stable wrapper geometry', zh: '外层几何要稳定' },
    copy: {
      en: 'Every visual needs a fixed size or aspect ratio.',
      zh: '每个视觉都要有固定尺寸或比例。',
    },
  },
  {
    title: { en: 'Theme and motion are required', zh: '主题与减少动效是必须项' },
    copy: {
      en: 'Public visuals support light, dark, and reduced motion.',
      zh: '公开页视觉必须支持 light、dark 和 reduced motion。',
    },
  },
] as const;

const LifeOsFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const appUrl = 'https://dankuku.com/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsLifeOsCssIcon label="LifeOs CSS app icon" />}
      name="LifeOs"
      kicker={{ en: 'Personal system · Self-knowledge', zh: '个人系统 · 自我认识' }}
      tagline={{ en: 'Read yourself like a manual.', zh: '把你这个人，读成一本说明书。' }}
      meta={{ en: 'Free plan forever · Google or Apple sign-in · Chinese and English', zh: '免费版永久免费 · Google / Apple 登录 · 中文与英文' }}
      primary={{ href: appUrl, external: true, label: { en: 'Open LifeOs', zh: '打开 LifeOs' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: appUrl,
        domain: 'dankuku.com',
        title: { en: 'LifeOs running live', zh: 'LifeOs 实际运行画面' },
        caption: { en: 'The live app, running right here. Open it in a new tab to build your own manual.', zh: '真实应用直接跑在这里。想写自己那本说明书，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Give LifeOs a birth date, time, and place, and it runs eight natal systems separately — BaZi, Zi Wei Dou Shu with its flying stars, the natal hexagram, numerology, Human Design, Gene Keys, Western and Vedic astrology. Each one answers in its own voice, keeps its own sources, and states its own uncertainty.', zh: '给 LifeOs 出生日期、时间和地点，它会分别跑八套本命系统——八字、紫微斗数（含四化飞星）、易经本命卦、数字学、人类图、基因钥匙、西洋占星、吠陀占星。每一套各自作答、各自留下出处，也各自标明不确定的地方。' } },
        { kind: 'p', text: { en: 'What it refuses to do matters as much. It does not blend the systems into one score, does not treat them as votes, and does not invent a new personality theory on top of them. Where they disagree, you see the disagreement. What you get back is a plain-language manual about how you tend to operate.', zh: '它不做的事同样重要：不把八套系统混成一个分数、不拿它们投票、也不在上面另造一套人格理论。彼此矛盾的地方，你看到的就是矛盾。最后得到的是一本白话的说明书，讲你通常怎么运作。' } },
        { kind: 'h', text: { en: 'What is inside', zh: '里面有什么' } },
        { kind: 'steps', items: [
          { title: { en: 'Life manual', zh: '人生说明书' }, text: { en: 'A short book about you in eight chapters: expression and emotion, relationships, work, how you choose, the stage you are in, your most stable pattern, one upgrade task, and where the reading stops being certain.', zh: '关于你的一本小书，八章：表达与情绪、关系、工作、怎么做选择、当前阶段、最稳定的那个模式、一个升级任务，以及这份阅读到哪里就不确定了。' } },
          { title: { en: 'Personality, in four situations', zh: '性格分析：四个场景' }, text: { en: 'The same person seen at rest, under pressure, and where practice is possible — description first, raw tags and sources tucked underneath.', zh: '同一个你，在平时、在压力下、以及可以练习的地方——先给描述，原始标签和出处收在下面一层。' } },
          { title: { en: 'BaZi multi-model and Zi Wei data', zh: '八字多模型与紫微资料' }, text: { en: 'Five BaZi methods answer side by side instead of collapsing into one verdict; the Zi Wei page shows twelve palaces, palace-stem flying stars, rotation views and time layers as raw data, not as a finished story.', zh: '八字有五种方法并排作答，而不是压成一个结论；紫微页把十二宫、宫干飞化、转宫视角和时间层摊成原始资料，不包装成结论。' } },
          { title: { en: 'Tarot desk', zh: '塔罗提问台' }, text: { en: 'A full 78-card Rider–Waite–Smith deck and seven spreads, from a single card to the whole deck. The question locks when you submit it, and you come back later to mark what actually happened.', zh: '完整 78 张 Rider–Waite–Smith 牌与七种牌阵，从单张到整副。问题一提交就锁定，之后你回来标记实际发生了什么。' } },
          { title: { en: 'Your own calendar', zh: '属于你的日历' }, text: { en: 'A daily line written for you, every month of your life as one dot, and a journal where a note only becomes a life record when you promote it yourself.', zh: '每天写给你的一句话、人生每个月一个点，以及一本手帐——随手写的东西，只有你自己把它提上来，才会变成人生记录。' } },
          { title: { en: 'Deep reading', zh: '深度解读' }, text: { en: 'One box: what do you want to get clear about? No preset questions. Long answers come with a reading aid — estimated minutes, bolded lead sentences, and a full-text or key-points toggle.', zh: '只有一个输入框：你想弄清楚什么？没有预设问题。长回答附阅读辅助——预计分钟数、加粗首句，以及「读全文 / 只看要点」切换。' } },
        ] },
        { kind: 'h', text: { en: 'What makes it different', zh: '它和别的不一样在哪' } },
        { kind: 'p', text: { en: 'It shows its work, and it keeps the layers apart. The natal chart is computed once and never rewritten by anything you log afterwards; a question you ask today is a one-off that does not quietly edit who the app thinks you are. Claims that can be checked come back later to be scored against what really happened.', zh: '它把过程摊开，也把层次分开。本命盘算一次，之后你记录什么都不会回头改写它；今天问的一件事就是一次性的，不会悄悄修改这个应用对你的判断。能被验证的说法，之后会回来对照现实打分。' } },
        { kind: 'p', text: { en: 'You are also not locked in. On the free plan every reading turns into a one-tap copyable instruction you can paste into whichever chat assistant you already use, and there are narrower packs too — BaZi only, Zi Wei only, or one palace as the origin point.', zh: '你也不会被锁住。免费版把每一次解读变成可以一键复制的指令，贴到你已经在用的任何聊天助手里继续问；也有更窄的版本——只看八字、只看紫微，或者以某一个宫为原点。' } },
        { kind: 'callout', label: { en: 'Sign-in, and the public case library', zh: '登录，以及公开命例库' }, text: { en: 'Building a profile requires signing in with Google or Apple, and signing in means agreeing that your chart and readings may appear anonymously in the public case library — names and account IDs removed. That consent is stated on the sign-in button itself.', zh: '建立档案需要用 Google 或 Apple 登录，而登录同时表示你同意：你的命盘与解读可能以匿名形式出现在公开命例库里（去掉姓名与账号标识）。这一点写在登录按钮上。' } },
        { kind: 'callout', label: { en: 'Where your data sits', zh: '资料放在哪里' }, text: { en: 'It is local-first but not local-only: readings, notes, people and records sync to your own account in the cloud, and the readings themselves are generated server-side. Billing data is kept where the client cannot read it.', zh: '它是 local-first，但不是只存本机：解读、笔记、人物和记录会同步到你自己的云端账号，解读本身也在服务器端生成。付费相关资料存在客户端读不到的地方。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Not prediction', zh: '不是预测' }, text: { en: 'LifeOs is a framing and reflection tool, not fortune telling. It does not forecast events, and nothing here should stand in for medical, legal, or financial advice. Read the output as a prompt for your own thinking, not a verdict.', zh: 'LifeOs 是一个整理与反思的工具，不是算命。它不预测事件，也不应该拿来代替医疗、法律或财务上的专业意见。把输出当成让你自己继续想下去的提示，而不是判决。' } },
      ]}
      faq={[
        { q: { en: 'Is this fortune telling?', zh: '这是算命吗？' }, a: { en: 'No. It computes several traditional systems, keeps each one traceable, and writes the overlap in plain language. It is built for reflection — what tends to be true about how you operate — not for predicting what will happen.', zh: '不是。它把几套传统系统算出来、各自保留出处，再用白话写出重合的部分。它是拿来反思的——关于你通常怎么运作——而不是拿来预测会发生什么。' } },
        { q: { en: 'What do I need to provide?', zh: '需要提供什么资料？' }, a: { en: 'Birth date, time, and place. The more accurate the birth time, the more stable the chart; the app warns you when the time is too rough and has a wizard for working backwards to the right two-hour branch.', zh: '出生日期、时间和地点。出生时间越准，盘越稳；时间太粗时应用会提醒你，也有一个反推时辰的向导。' } },
        { q: { en: 'Do I need an account?', zh: '需要登录吗？' }, a: { en: 'Yes, Google or Apple. There is no password. Signing in also means agreeing to the public case library, where charts and readings can appear anonymously. The public guide pages can be read without signing in.', zh: '需要，用 Google 或 Apple，没有密码。登录同时表示同意公开命例库——命盘与解读可能以匿名形式出现在那里。公开的指南页面不登录也能看。' } },
        { q: { en: 'Which systems does it read?', zh: '它读的是哪些系统？' }, a: { en: 'Eight natal systems: BaZi, Zi Wei Dou Shu with flying stars, the natal I Ching hexagram, numerology, Human Design, Gene Keys, Western astrology and Vedic astrology. Tarot sits in a separate layer for one-off questions. Casting a new I Ching hexagram is currently switched off.', zh: '八套本命系统：八字、紫微斗数（含四化飞星）、易经本命卦、数字学、人类图、基因钥匙、西洋占星、吠陀占星。塔罗在另一层，用来问一次性的事。易经起卦目前关闭。' } },
        { q: { en: 'How much tarot is in there?', zh: '塔罗有多少内容？' }, a: { en: 'The full 78-card Rider–Waite–Smith deck, drawn in CSS, with seven spreads: one card, three cards, Celtic Cross, an advanced soulmate spread, shadow work, Rahdue\u2019s Wheel using all 78, and a 41-card Fire Tree spread shuffled from two decks.', zh: '完整 78 张 Rider–Waite–Smith 牌，全部用 CSS 画的，七种牌阵：单张、三张、凯尔特十字、正缘进阶版、阴影面、用完整 78 张的 Rahdue\u2019s Wheel，以及两副牌洗在一起的 41 张火树银花。' } },
        { q: { en: 'Is it free?', zh: '免费吗？' }, a: { en: 'The free plan is free forever: unlimited one-tap copyable instructions, the ask desk, and the manual. An online plan that writes readings inside the app is priced at $7.99 a month or $59 a year, with top-up credits at $2.99 for 10 — not switched on yet. Until then, in-app readings run on a daily quota, free.', zh: '免费版永久免费：无限次一键复制指令、提问台和说明书。在应用内直接写解读的「在线版」定价 $7.99 / 月或 $59 / 年，加购点数 $2.99 / 10 点——目前还没开。开之前，应用内解读按每日额度免费使用。' } },
        { q: { en: 'What language is it in?', zh: '界面是什么语言？' }, a: { en: 'Chinese and English, switchable in the header; newly generated readings follow the language you are in. The public guide pages come in Simplified Chinese, Traditional Chinese and English.', zh: '中文和英文，在顶部切换；新生成的解读跟着当前语言走。公开的指南页面有简体中文、繁體中文和英文三种。' } },
        { q: { en: 'Can I take a reading elsewhere?', zh: '解读能带到别处用吗？' }, a: { en: 'Yes. Every reading can become a copyable instruction, and there are narrower ones for a single system — BaZi only, Zi Wei only, or a chart rotated so one palace becomes the origin. Paste it into any chat assistant and keep going there.', zh: '可以。每次解读都能变成可复制的指令，也有只针对单一系统的版本——只看八字、只看紫微，或者把某一个宫转成原点的盘。贴到任何聊天助手里继续问就行。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Personal system and self-knowledge', zh: '个人系统与自我认识' }],
        [{ en: 'Natal systems', zh: '本命系统' }, { en: 'BaZi · Zi Wei Dou Shu (flying stars) · Natal hexagram · Numerology · Human Design · Gene Keys · Western astrology · Vedic astrology', zh: '八字 · 紫微斗数（四化飞星）· 易经本命卦 · 数字学 · 人类图 · 基因钥匙 · 西洋占星 · 吠陀占星' }],
        [{ en: 'Inquiry layer', zh: '问事层' }, { en: 'Tarot: 78-card Rider–Waite–Smith deck, 7 spreads', zh: '塔罗：78 张 Rider–Waite–Smith 牌、7 种牌阵' }],
        [{ en: 'Main modules', zh: '主要模块' }, { en: 'Life manual · Personality analysis · BaZi multi-model · Zi Wei chart data · How to use yourself · Deep reading · Tarot desk · Life in months · Life journal · Daily line', zh: '人生说明书 · 性格分析 · 八字多模型 · 紫微斗数 · 怎么使用自己 · 深度解读 · 塔罗提问台 · 人生月份 · 人生手帐 · 今天的一句' }],
        [{ en: 'Output', zh: '输出' }, { en: 'Eight-chapter manual · Four-situation personality read · Daily line · Ten capabilities with monthly practice · Raw BaZi and Zi Wei data · Long-form answers · Copyable instruction packs', zh: '八章说明书 · 四场景性格阅读 · 每日一句 · 十项能力与每月练习 · 八字与紫微原始资料 · 长文回答 · 可复制的解读指令' }],
        [{ en: 'Interface', zh: '界面语言' }, { en: 'Chinese and English (public pages also in Traditional Chinese)', zh: '中文与英文（公开页另有繁體中文）' }],
        [{ en: 'Account', zh: '账号' }, { en: 'Google or Apple sign-in; includes consent to the anonymous public case library', zh: 'Google 或 Apple 登录；包含对匿名公开命例库的同意' }],
        [{ en: 'Data', zh: '资料存放' }, { en: 'Local-first, synced to your own cloud account; readings generated server-side', zh: 'Local-first，并同步到你自己的云端账号；解读在服务器端生成' }],
        [{ en: 'Price', zh: '价格' }, { en: 'Free plan free forever; online plan $7.99/mo or $59/yr and $2.99 per 10 credits, both coming soon', zh: '免费版永久免费；在线版 $7.99 / 月或 $59 / 年、加购点数 $2.99 / 10 点，均即将推出' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive web app, installable as a PWA', zh: '响应式 Web App，可安装为 PWA' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'life-os')}
    />
  );
};

const BrandGuideFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const faviconSrc = joinBasePath(baseUrl, 'favicon.svg');

  return (
    <div className="page-shell brand-guide-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="brand-guide-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="brand-guide-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="brand-guide-hero py-16 text-center md:py-24">
            <p className="brand-guide-kicker mx-auto">
              {isZh ? 'Brand Guide' : 'Brand Guide'}
            </p>
            <h1 className="brand-guide-hero-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '品牌指南' : 'Brand Guide'}
            </h1>
            <p className="brand-guide-hero-subtitle mx-auto mt-5">
              {isZh
                ? '从混乱中建立系统。'
                : 'Build systems from chaos.'}
            </p>
            <p className="brand-guide-hero-copy mx-auto mt-5">
              {isZh
                ? '把复杂的人类行为与混乱现实，转化为真正有用的产品、数据与 AI 系统。'
                : 'I turn complex human behavior and messy realities into useful products, data, and AI systems.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#brand-philosophy" className="brand-guide-cta">
                {isZh ? '看核心哲学' : 'View philosophy'} <span aria-hidden>›</span>
              </a>
              <a href="#brand-rules" className="brand-guide-cta brand-guide-cta-muted">
                {isZh ? '看执行规则' : 'View rules'} <span aria-hidden>›</span>
              </a>
            </div>
            <div className="brand-guide-signature mx-auto mt-12">
              <div className="brand-guide-mark">
                <img src={faviconSrc} alt="" width={72} height={72} />
              </div>
              <div>
                <p className="brand-guide-signature-label">{isZh ? '执行句 / Operating line' : 'Operating line'}</p>
                <p className="brand-guide-signature-line font-display font-bold tracking-tight">
                  <span>Build order from</span>
                  <span>complexity.</span>
                </p>
              </div>
            </div>
          </header>

          <section className="brand-guide-classification py-12 md:py-16" aria-labelledby="brand-guide-classification-title">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? 'Guide map' : 'Guide map'}</p>
              <h2 id="brand-guide-classification-title" className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '按顺序使用。' : 'Use it in order.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '先规则，再视觉，再应用。'
                  : 'Rules first. Visuals second. Application last.'}
              </p>
            </div>
            <div className="brand-guide-category-grid mt-10">
              {brandGuideCategories.map((category, index) => (
                <article key={category.name.en} className={`brand-guide-category-card brand-guide-category-${index + 1}`}>
                  <p className="brand-guide-card-index">{category.scope[language]}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{category.name[language]}</h3>
                  <ul>
                    {category.items[language].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-philosophy" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '01 / Core philosophy' : '01 / Core philosophy'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '内容先行。' : 'Content first.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '界面服务判断，不抢内容。'
                  : 'The interface supports the point.'}
              </p>
            </div>
            <article className="brand-guide-manifesto mt-12">
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Manifesto' : 'Manifesto'}</p>
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  {isZh ? '先让知识留下来。' : 'Make knowledge durable first.'}
                </h3>
              </div>
              <p>
                {isZh
                  ? '内容要能沉淀、复用、继续生长。界面只负责让这件事更清楚。'
                  : 'Content should persist, stay reusable, and keep growing. The interface only makes that easier to understand.'}
              </p>
            </article>
            <div className="brand-guide-principle-grid mt-5 grid gap-4 md:grid-cols-4">
              {brandGuidePrinciples.map((item, index) => (
                <article key={item.title.en} className="brand-guide-principle-card">
                  <p className="brand-guide-card-index">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-detail-grid mt-8">
              {brandGuideDetailRules.map((item) => (
                <article key={item.title.en} className="brand-guide-detail-item">
                  <h3>{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-rules" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '02 / Design rules' : '02 / Design rules'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '页面规则。' : 'Page rules.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '默认按这些做。'
                  : 'Use these as defaults.'}
              </p>
            </div>
            <div className="brand-guide-layout-grid mt-12">
              {brandGuideLayoutRules.map((item, index) => (
                <article key={item.title.en} className={`brand-guide-layout-card brand-guide-layout-card-${index + 1}`}>
                  <p className="brand-guide-card-index">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '03 / Layout numbers' : '03 / Layout numbers'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '页面尺寸参考。' : 'Page size reference.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '做页面时先用这些值。'
                  : 'Use these values first when building pages.'}
              </p>
            </div>
            <div className="brand-guide-layout-spec-grid mt-8">
              {brandGuideLayoutNumbers.map((item) => (
                <article key={item.value.en} className="brand-guide-layout-spec-card">
                  <b>{item.value[language]}</b>
                  <p>{item.label[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '04 / Visual system' : '04 / Visual system'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '颜色只做信号。' : 'Color is signal.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? 'Mint / Orange 随主题切换。Amber / Blue 是系统辅助。Dream Purple 负责行动。'
                  : 'Mint / Orange switch with theme. Amber / Blue support system states. Dream Purple carries action.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="brand-guide-color-board">
                {brandGuidePalette.map((row) => (
                  <article key={row.hex} className="brand-guide-swatch">
                    <span className="brand-guide-swatch-chip" style={{ backgroundColor: row.hex }} />
                    <div>
                      <p className="brand-guide-card-index">{row.hex}</p>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{row.name[language]}</h3>
                      <p><strong>{row.role[language]}</strong> · {row.usage[language]}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="brand-guide-color-board brand-guide-accent-board">
                {brandGuideAccent.map((row) => (
                  <article key={row.name.en} className="brand-guide-swatch">
                    <span
                      className="brand-guide-swatch-chip"
                      style={{ backgroundColor: row.hex[theme] }}
                    />
                    <div>
                      <p className="brand-guide-card-index">{row.hex[theme]}</p>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{row.name[language]}</h3>
                      <p><strong>{row.role[language]}</strong> · {row.usage[language]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="brand-engraved" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '05 / Engraved line language' : '05 / Engraved line language'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '用线条说话。' : 'Let the lines speak.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '插画与图标默认用钞票凹版语言：排线做明暗，扭索纹做秩序，单色，黄金比例。'
                  : 'Illustrations and icons default to money engraving: hatching for tone, guilloché for order, one ink, golden ratio.'}
              </p>
            </div>
            <div className="brand-guide-engraved-grid mt-12">
              {brandGuideEngravedSpecimens.map((item) => {
                const Specimen = item.id === 'hatch' ? EngravedHatchScale
                  : item.id === 'rosette' ? EngravedRosette
                    : item.id === 'eye' ? EngravedEye
                      : EngravedBorder;
                return (
                  <article key={item.id} className="brand-guide-engraved-card">
                    <Specimen label={item.title[language]} tone={item.tone} />
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="brand-guide-rule-grid mt-8">
              {brandGuideEngravedRules.map((item) => (
                <article key={item.title.en} className="brand-guide-rule-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '06 / Type and rhythm' : '06 / Type and rhythm'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '少用字体变化。' : 'Keep type simple.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '标题、正文、标签，三层够了。'
                  : 'Display, body, label. That is enough.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {brandGuideTypography.map((item) => (
                <article key={item.name} className="brand-guide-type-card">
                  <p className="brand-guide-card-index">{item.name}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.role[language]}</h3>
                  <p className={item.name === 'JetBrains Mono' ? 'font-mono' : 'font-display text-2xl font-bold'}>
                    {item.sample[language]}
                  </p>
                  <p>{item.detail[language]}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {brandGuideRhythm.map((item) => (
                <article key={item.title.en} className="brand-guide-rhythm-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-voice" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '07 / Voice' : '07 / Voice'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '说清楚能帮什么。' : 'Make the help clear.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '少说自己，多说结果。'
                  : 'Less about me. More about the result.'}
              </p>
            </div>
            <div className="mt-12 space-y-4">
              {brandGuideVoicePairs.map((pair) => (
                <article key={pair.avoid.en} className="brand-guide-voice-row">
                  <div>
                    <p className="brand-guide-card-index">{isZh ? 'Avoid' : 'Avoid'}</p>
                    <p>{pair.avoid[language]}</p>
                  </div>
                  <div>
                    <p className="brand-guide-card-index">{isZh ? 'Prefer' : 'Prefer'}</p>
                    <p>{pair.prefer[language]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '08 / Application' : '08 / Application'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '每页都要清楚。' : 'Every page must be clear.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '不同页面可以有不同构图，但都要回到清楚、可复用、有证据。'
                  : 'Pages may use different compositions, but they return to clarity, reuse, and proof.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideUseCases.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '当前首页 / Home media system' : 'Current Home / Media system'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideHomeMediaRules.map((item) => (
                  <article key={item.title.en} className="brand-guide-rule-card">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '视觉资产 / Asset types' : 'Visual assets / Asset types'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideAssetRules.map((item) => (
                  <article key={item.title.en} className="brand-guide-rule-card">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="brand-story" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '09 / Story content' : '09 / Story content'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '故事写真实时刻。' : 'Stories record real moments.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '短、真、有画面。'
                  : 'Short, true, visual.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideStoryRules.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <article className="brand-guide-voice-row mt-5">
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Avoid' : 'Avoid'}</p>
                <p>{brandGuideStoryExample.avoid[language]}</p>
              </div>
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Prefer' : 'Prefer'}</p>
                <p>{brandGuideStoryExample.prefer[language]}</p>
              </div>
            </article>
          </section>

          <section id="brand-motion" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '10 / Motion language' : '10 / Motion language'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '动效要轻。' : 'Motion stays light.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '动实体物件，不动背景气氛。'
                  : 'Move objects, not atmosphere.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideMotionRules.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '当前实现规则 / Current implementation' : 'Current implementation rules'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideCssRules.map((item, index) => (
                  <article key={item.title.en} className={`brand-guide-rule-card brand-guide-rule-${index + 1}`}>
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <p className="pb-10 text-center text-xs text-stone-500">
            {isZh
              ? '最后对齐：2026-09-17 · 以当前首页、代码库和 logs/ 为准。'
              : 'Last reconciled: 17 Sep 2026 · Source: current Home + repo + logs/.'}
          </p>
        </div>
      </main>
    </div>
  );
};

const ArchivedWorkPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  work: (typeof archivedWorks)[number];
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, work, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  return (
    <div className="page-shell min-h-screen text-stone-800 selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <section className="motion-card mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              {isZh ? '归档项目' : 'Archived Work'}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              {work.title[language]}
            </h1>
            <p className="mt-4 text-sm text-stone-500">{work.origin[language]}</p>
            <p className="mt-4 text-base leading-relaxed text-stone-700">{work.summary[language]}</p>
            {work.externalLink && (
              <a
                href={work.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
              >
                {work.externalLabel?.[language] ?? (isZh ? '打开原始链接' : 'Open Source Link')}
                <ExternalLink size={14} />
              </a>
            )}
            {work.imagePath && (
              <figure className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                <img
                  src={resolveAssetPath(baseUrl, work.imagePath)}
                  alt={work.imageAlt?.[language] ?? `${work.title[language]} archived visual`}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
                {work.imageCaption && (
                  <figcaption className="border-t border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
                    {work.imageCaption[language]}
                  </figcaption>
                )}
              </figure>
            )}
            {work.imageGallery && work.imageGallery.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {work.imageGallery.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                    <img
                      src={resolveAssetPath(baseUrl, image.src)}
                      alt={image.alt[language]}
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />
                    {image.caption && (
                      <figcaption className="border-t border-stone-200 bg-white px-3 py-2 text-sm text-stone-600">
                        {image.caption[language]}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </section>

          <div className="mt-6 space-y-5">
            {work.sections.map((section) => (
              <section key={section.heading.en} className="motion-card rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-stone-900">{section.heading[language]}</h2>
                <ul className="mt-4 space-y-2 text-stone-700">
                  {section.points[language].map((point, pointIndex) => (
                    <li key={`${section.heading.en}-${pointIndex}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {work.references && work.references.length > 0 && (
              <section className="motion-card rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  {isZh ? '来源参考' : 'Source References'}
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {work.references.map((reference) => (
                    <a
                      key={reference.href}
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                    >
                      {reference.label[language]}
                      <ExternalLink size={13} />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const JijuPetFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const jijuUrl = 'https://jiju.pet/';
  const jijuInstallUrl = 'https://jiju.pet/?install=1';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsJijuCssIcon label="Jiju CSS app icon" />}
      name="Jiju"
      kicker={{ en: 'Local discovery · Pet life', zh: '本地发现 · 宠物生活' }}
      tagline={{ en: 'Find places that truly work for you and your pet.', zh: '找到真正适合你和宠物一起去的地方。' }}
      meta={{ en: 'Free · Starting in Penang · Runs in any browser', zh: '免费 · 从 Penang 开始 · 浏览器直接打开' }}
      primary={{ href: jijuUrl, external: true, label: { en: 'Open Jiju', zh: '打开 Jiju' } }}
      secondary={{ href: jijuInstallUrl, external: true, icon: <Download size={16} />, label: { en: 'Install app', zh: '安装 App' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: jijuUrl,
        domain: 'jiju.pet',
        title: { en: 'Interactive Jiju website', zh: 'Jiju 互动网站' },
        caption: { en: 'The live site, running right here. Open it in a new tab to search your own area.', zh: '真实网站直接跑在这里。想搜自己的区域，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Jiju is a local discovery system built around real life with pets. It helps pet parents understand place policies, space, and lived experience before leaving—and gives every outing a place to be remembered.', zh: 'Jiju 是一个围绕真实宠物生活建立的本地发现系统。它帮助宠物主人在出门前看懂地点政策、空间条件与实际体验，也让每次到访成为可以保存和回看的共同记忆。' } },
        { kind: 'p', text: { en: 'The goal is not the largest directory. It is information worth trusting: whether a place genuinely welcomes pets, which pets it works for, where they can stay, and whether conditions have changed since the last visit.', zh: '目标不是收集最多地点，而是让资料值得相信：这个地方是否真的欢迎宠物、适合哪种宠物、应该坐哪里，以及最近的情况有没有改变。' } },
        { kind: 'h', text: { en: 'How it works', zh: '怎么使用' } },
        { kind: 'steps', items: [
          { title: { en: 'Discover', zh: '发现' }, text: { en: 'Start with location, pet needs, and the real situation you are planning for.', zh: '按地点、宠物需求和真实场景开始探索。' } },
          { title: { en: 'Check', zh: '确认' }, text: { en: 'Review policy, space, facilities, and community records before leaving.', zh: '先查看政策、空间、设施与社区记录。' } },
          { title: { en: 'Visit', zh: '到访' }, text: { en: 'Arrive with clearer expectations and enjoy a real outing together.', zh: '带着更清楚的预期，完成一次真实出门。' } },
          { title: { en: 'Remember', zh: '记录' }, text: { en: 'Save the memory, improve the listing, and help the next pet parent.', zh: '留下回忆、补充资料，并帮助下一位宠物主人。' } },
        ] },
        { kind: 'h', text: { en: 'What Jiju is built around', zh: 'Jiju 围绕什么建立' } },
        { kind: 'p', text: { en: 'Discovery works through real needs, not ratings alone. Indoor or outdoor, pet policy, space, and the on-site reality should all be clear before you decide to go.', zh: '发现是用真实需求驱动的，不只看星级。室内或户外、宠物政策、空间和现场体验，都应该在你决定出门前就说清楚。' } },
        { kind: 'p', text: { en: 'Trust comes from cross-checking. Place details, merchant policies, and community records verify one another, which reduces the gap between a listing and the real visit.', zh: '信任来自互相验证。地点资料、商家政策与社区记录彼此校对，减少「到了才发现不适合」的落差。' } },
        { kind: 'callout', label: { en: 'Memory', zh: '记忆' }, text: { en: 'Each pet gets a real profile, so the places you visited, the experiences you shared, and how they grew over time all stay in one place.', zh: '每只宠物都有真实档案，把去过的地方、共同经历和成长过程都保存在同一个地方。' } },
        { kind: 'p', text: { en: 'Community keeps it alive. People contribute places, update conditions, and record sanctuary impact, so the knowledge improves through use instead of aging quietly.', zh: '社区让它活着。用户贡献地点、补充情况并记录 Sanctuary impact，让资料随着使用持续变好，而不是慢慢过期。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Trust boundary', zh: '信任边界' }, text: { en: 'Pets are real identities, not content props. Pet profiles, photos, and community activity need clear permission boundaries, and changing place conditions should be updated instead of misleading the next visit.', zh: '宠物是真实身份，不是内容道具。宠物档案、照片和社区互动需要清楚的权限边界；地点变动应该被更新，而不是让旧资料一直误导下一次出门。' } },
      ]}
      faq={[
        { q: { en: 'Which city does Jiju cover?', zh: 'Jiju 覆盖哪个城市？' }, a: { en: 'It starts in Penang, Malaysia. Depth matters more than reach here—one city with information you can actually rely on is worth more than ten with thin listings.', zh: '目前从马来西亚 Penang 开始。这里深度比覆盖面重要——一个城市里可靠的资料，胜过十个城市的空壳列表。' } },
        { q: { en: 'How is this different from a maps search?', zh: '和地图搜索有什么不同？' }, a: { en: 'A maps result tells you a place exists. Jiju tells you whether it works for your pet: the policy, the space, where they can sit, and what recent visitors actually found.', zh: '地图告诉你有这个地方。Jiju 告诉你它适不适合你的宠物：政策、空间、可以待在哪，以及最近去过的人实际看到什么。' } },
        { q: { en: 'Do I need an account?', zh: '需要注册吗？' }, a: { en: 'You can browse and search without one. An account is for the parts that belong to you—pet profiles, saved places, and visit records.', zh: '浏览和搜索不需要。账号是为了那些属于你的部分——宠物档案、收藏地点和到访记录。' } },
        { q: { en: 'Can I add or correct a place?', zh: '我可以新增或更正地点吗？' }, a: { en: 'Yes. Contributions are the point. A place that changed its policy is worth reporting, because the next pet parent is the one who benefits.', zh: '可以，贡献本来就是重点。地点改了政策就值得回报，因为下一个宠物主人会因此受益。' } },
        { q: { en: 'Is there an app to install?', zh: '有 App 可以安装吗？' }, a: { en: 'Jiju is a responsive web app, so it works in any browser. The Install app button adds it to your home screen as a standalone app.', zh: 'Jiju 是响应式 Web App，任何浏览器都能用。点「安装 App」就会加到主屏幕，变成独立应用。' } },
        { q: { en: 'What is Sanctuary impact?', zh: 'Sanctuary impact 是什么？' }, a: { en: 'It is a record of community contribution around rescue and shelter work, kept alongside the discovery data rather than treated as a separate campaign.', zh: '这是关于救助与收容工作的社区贡献记录，和发现数据放在一起，而不是当成另一场独立活动。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Local discovery and pet life', zh: '本地发现与宠物生活' }],
        [{ en: 'Current city', zh: '当前城市' }, { en: 'Penang, Malaysia', zh: '马来西亚 Penang' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Discovery · Place profiles · Pet profiles · Visits · Community', zh: '发现 · 地点档案 · 宠物档案 · 到访 · 社区' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive web app', zh: '响应式 Web App' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'jiju')}
    />
  );
};

const JijuRevampFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const revampBase = import.meta.env.BASE_URL || '/';

  const sceneEntries = isZh
    ? ['现在吃 lunch', '去 cafe 办公', '带宠物', '好停车', '看 promo', '本地最爱', 'Michelin 但本地认可', '下雨天去哪']
    : ['Lunch now', 'Work from cafe', 'Bringing my pet', 'Easy parking', 'Show me promos', 'Local favorites', 'Michelin but local-approved', 'Rainy-day spot'];

  const proofPoints: [string, string][] = isZh
    ? [
        ['Was', '宠物友好地点目录'],
        ['Now', '场景化本地探索引擎'],
        ['Core question', 'Where should we go today?'],
        ['Start', '一个城市 · 100 个地点 · 8 个 filter'],
      ]
    : [
        ['Was', 'Pet-friendly place directory'],
        ['Now', 'Context-based local discovery engine'],
        ['Core question', 'Where should we go today?'],
        ['Start', 'One city · 100 places · 8 filters'],
      ];

  const mapShows = isZh
    ? ['Name', 'Address', 'Rating（星级）', 'Opening hour', 'Reviews（嘈杂、游客化）']
    : ['Name', 'Address', 'Rating (stars)', 'Opening hour', 'Reviews (noisy, touristy)'];

  const jijuAnswers = isZh
    ? ['适合 laptop work 吗？有 plug / 稳 WiFi 吗？', 'Parking 难吗？冷气够吗？吵不吵？', '能坐久吗？午餐便宜吗？有 lunch set 吗？', '适合一个人 / date / 带宠物吗？', 'food 是真好吃还是只是环境美？local 会回访吗？']
    : ['Good for laptop work? Power plug & stable WiFi?', 'Parking hard? Aircon strong? Noisy?', 'Can sit long? Cheap lunch? Lunch set?', 'Good for solo / date / pets?', 'Actually tasty or just pretty? Will locals return?'];

  const problemCards = isZh
    ? [
        { label: '01 / Maps', title: '地图太宽泛', copy: 'Google Map 有评分和位置,但答不了场景:plug、parking、能不能坐久、有没有 lunch set、本地认不认。' },
        { label: '02 / Reviews', title: '评论太游客化', copy: '太网红、太多假 review、太情绪化。4.5 星不代表它适合你今天的目的。' },
        { label: '03 / Context', title: '没有场景标签', copy: '不知道 parking、不知道能不能坐久、不知道 local 是否真去、不知道 promo 是否还 active。' },
      ]
    : [
        { label: '01 / Maps', title: 'Maps are too broad', copy: 'Ratings and locations, but no scene: plugs, parking, sit-long, lunch sets, or local approval.' },
        { label: '02 / Reviews', title: 'Reviews are too touristy', copy: 'Too influencer-driven, too many fake reviews, too emotional. 4.5 stars does not mean right for today.' },
        { label: '03 / Context', title: 'No scene tags', copy: 'No parking info, no sit-long info, no signal on whether locals actually go or if a promo is still active.' },
      ];

  const categoryCards = isZh
    ? [
        { title: 'Eat', note: '流量最大', tags: ['Lunch set', 'Local favorite', 'Michelin / Bib', 'Cheap good food', 'Date night', 'Solo meal', 'Family dinner', 'Supper', 'Hidden gem', 'Trap warning'] },
        { title: 'Work', note: 'Google Map 查不到', tags: ['Power plug', 'WiFi', 'Quiet', 'Can sit long', 'Good coffee', 'Big table', 'Parking easy', 'Aircon strong', 'Laptop friendly', 'Meeting friendly'] },
        { title: 'Chill', note: '适合内容化', tags: ['Afternoon cafe', 'Rainy day', 'With friend', 'First date', 'Healing place', 'Good view', 'Walkable', 'Photo spot', 'Weekend half-day'] },
        { title: 'Pet', note: '保留差异化,做强 filter', tags: ['Indoor allowed', 'Outdoor only', 'Cat friendly', 'Dog friendly', 'Water bowl', 'Pet menu', 'Walking area', 'Spacious', 'Pet-friendly staff'] },
        { title: 'Promo', note: '每天有人搜', tags: ['Lunch set', 'Coffee promo', 'Student promo', 'Weekday deal', 'Happy hour', 'Buy 1 free 1', 'Set under RM20', 'New opening'] },
      ]
    : [
        { title: 'Eat', note: 'Highest traffic', tags: ['Lunch set', 'Local favorite', 'Michelin / Bib', 'Cheap good food', 'Date night', 'Solo meal', 'Family dinner', 'Supper', 'Hidden gem', 'Trap warning'] },
        { title: 'Work', note: 'Hard to find on Maps', tags: ['Power plug', 'WiFi', 'Quiet', 'Can sit long', 'Good coffee', 'Big table', 'Parking easy', 'Aircon strong', 'Laptop friendly', 'Meeting friendly'] },
        { title: 'Chill', note: 'Great for content', tags: ['Afternoon cafe', 'Rainy day', 'With friend', 'First date', 'Healing place', 'Good view', 'Walkable', 'Photo spot', 'Weekend half-day'] },
        { title: 'Pet', note: 'Differentiation, as a filter', tags: ['Indoor allowed', 'Outdoor only', 'Cat friendly', 'Dog friendly', 'Water bowl', 'Pet menu', 'Walking area', 'Spacious', 'Pet-friendly staff'] },
        { title: 'Promo', note: 'Searched daily', tags: ['Lunch set', 'Coffee promo', 'Student promo', 'Weekday deal', 'Happy hour', 'Buy 1 free 1', 'Set under RM20', 'New opening'] },
      ];

  const scoreRows: [string, number][] = [
    ['Food', 8.5],
    ['Comfort', 7.8],
    ['Parking', 6.5],
    ['Work-friendly', 9.0],
    ['Pet-friendly', 7.0],
    ['Value', 8.2],
    ['Local approval', 8.8],
  ];

  const profileRows = isZh
    ? [
        ['Area', 'Georgetown'],
        ['Best for', 'Laptop work / brunch / 安静下午'],
        ['Price', 'RM20–40'],
        ['Parking', 'Medium difficulty'],
        ['Power plug', 'Yes, limited'],
        ['WiFi', 'Stable'],
        ['Can sit long', 'Yes'],
        ['Pet-friendly', 'Outdoor only'],
        ['Lunch set', 'Weekday 12pm–3pm'],
        ['Local verdict', '适合办公,食物普通但咖啡稳'],
        ['Avoid', 'Weekend 2pm–5pm'],
        ['Best time', 'Weekday morning'],
      ]
    : [
        ['Area', 'Georgetown'],
        ['Best for', 'Laptop work / brunch / quiet afternoon'],
        ['Price', 'RM20–40'],
        ['Parking', 'Medium difficulty'],
        ['Power plug', 'Yes, limited'],
        ['WiFi', 'Stable'],
        ['Can sit long', 'Yes'],
        ['Pet-friendly', 'Outdoor only'],
        ['Lunch set', 'Weekday 12pm–3pm'],
        ['Local verdict', 'Good to work, food average, coffee reliable'],
        ['Avoid', 'Weekend 2pm–5pm'],
        ['Best time', 'Weekday morning'],
      ];

  const todaysPicks = isZh
    ? ['Best lunch set under RM20', '有 plug & parking 的 cafe', 'Local 认可的 Michelin 地点', '本周末宠物友好去处', '今天适合办公的安静地点']
    : ['Best lunch set under RM20', 'Cafes with plug & parking', 'Local-approved Michelin spots', 'Pet-friendly places this weekend', 'Quiet places to work today'];

  const mvpFilters = ['Lunch set', 'Work-friendly', 'Power plug', 'Easy parking', 'Pet-friendly', 'Local favorite', 'Date-friendly', 'Promo available'];

  const mvpCards = isZh
    ? [
        { title: 'Phase 1 · 做有用的数据', lines: ['先做一个城市 / 区域:Penang、KL、PJ、Georgetown、Mont Kiara、Bangsar。', '先做 100 个地点,每个比 Google Map 更有用。', '上 8 个 filter 与 Place Profile。'] },
        { title: 'Phase 2 · 上线场景探索', lines: ['场景入口首页 + 搜索/筛选。', 'SEO landing pages 与本地指南。', 'TikTok / IG / community submission 做增长。'] },
        { title: 'Phase 3 · 验证商户', lines: ['接触 cafe / 餐厅更新资料与 lunch set。', '早期免费 verified listing。', '收集用户与商户反馈。'] },
        { title: 'Phase 4 · 变现', lines: ['Featured placement 与 promo 页。', 'Merchant dashboard。', '扩展城市与垂类,验证后再考虑换域名。'] },
      ]
    : [
        { title: 'Phase 1 · Build useful data', lines: ['One city/area first: Penang, KL, PJ, Georgetown, Mont Kiara, Bangsar.', '100 places, each more useful than Google Maps.', 'Ship 8 filters and the Place Profile.'] },
        { title: 'Phase 2 · Launch scene discovery', lines: ['Scene-entry homepage + search/filter.', 'SEO landing pages and local guides.', 'Grow via TikTok / IG / community submissions.'] },
        { title: 'Phase 3 · Merchant validation', lines: ['Approach cafes/restaurants for profiles and lunch sets.', 'Free verified listing for early merchants.', 'Collect user and merchant feedback.'] },
        { title: 'Phase 4 · Monetization', lines: ['Featured placement and promo pages.', 'Merchant dashboard.', 'Expand cities/verticals; revisit domain after validation.'] },
      ];

  const businessCards = isZh
    ? [
        { title: 'Featured listing', copy: '商户付费出现在相关场景。' },
        { title: 'Promo placement', copy: 'Lunch set、限时优惠在 promo 入口曝光。' },
        { title: 'Merchant subscription', copy: '商户订阅管理资料与表现。' },
        { title: 'Verified place badge', copy: '核验 plug / parking / 宠物政策 / promo。' },
        { title: 'Work-friendly badge', copy: 'Cafe 办公友好认证,强差异化。' },
        { title: 'Local guide sponsorship', copy: '赞助本地指南与清单文。' },
        { title: 'Pet-friendly premium', copy: '宠物友好高信任类别 + 活动。' },
        { title: 'Data insights', copy: '给商户的客流与场景数据。' },
      ]
    : [
        { title: 'Featured listing', copy: 'Merchants pay to appear in relevant scenes.' },
        { title: 'Promo placement', copy: 'Lunch sets and limited deals in the promo entry.' },
        { title: 'Merchant subscription', copy: 'Subscription to manage profile and performance.' },
        { title: 'Verified place badge', copy: 'Verify plug / parking / pet policy / promo.' },
        { title: 'Work-friendly badge', copy: 'Cafe work-friendly certification — strong edge.' },
        { title: 'Local guide sponsorship', copy: 'Sponsor local guides and listicles.' },
        { title: 'Pet-friendly premium', copy: 'High-trust pet category plus events.' },
        { title: 'Data insights', copy: 'Footfall and scene data for merchants.' },
      ];

  const domainCards = isZh
    ? [
        { title: 'A · 继续 jiju.pet', lines: ['品牌解释变宽:从 pet-friendly 扩到 places worth visiting。', '缺点:新用户可能误会只跟宠物有关。'] },
        { title: 'B · 买新主域名', lines: ['jiju.my / jiju.place / jiju.city / gojiju.com / jiju.guide。', 'jiju.pet 变成其中一个频道。最干净。'] },
        { title: 'C · 先 MVP 再换', lines: ['先用 jiju.pet 做 MVP,验证场景搜索。', '最现实:先别纠结 domain。'] },
      ]
    : [
        { title: 'A · Keep jiju.pet', lines: ['Widen the brand: pet-friendly to places worth visiting.', 'Risk: new users assume it is pet-only.'] },
        { title: 'B · Buy a new domain', lines: ['jiju.my / jiju.place / jiju.city / gojiju.com / jiju.guide.', 'jiju.pet becomes one channel. Cleanest.'] },
        { title: 'C · MVP first, switch later', lines: ['Use jiju.pet for the MVP, validate scene search.', 'Most realistic: do not over-think the domain yet.'] },
      ];

  const founderRows = isZh
    ? [
        { role: 'Eden · 系统', copy: '标签系统、搜索、推荐、地点 database、scoring、merchant dashboard、user submission、AI recommendation、SEO landing pages。' },
        { role: 'Partner · 增长', copy: '去店里验证、拍短视频、跟商家谈 promo、拿 lunch set、做 cafe work list、本地推荐、merchant onboarding、TikTok series、社区探店。' },
        { role: 'Shared', copy: '品牌方向、变现策略、重大支出、股权、合作条款、融资与扩张。' },
      ]
    : [
        { role: 'Eden · Systems', copy: 'Tagging, search, recommendation, place database, scoring, merchant dashboard, user submission, AI recommendation, SEO landing pages.' },
        { role: 'Partner · Growth', copy: 'On-site verification, short videos, merchant promo deals, lunch-set info, cafe-work lists, local picks, merchant onboarding, TikTok series, community outings.' },
        { role: 'Shared', copy: 'Brand direction, monetization, major spend, equity, partnership terms, fundraising, expansion.' },
      ];

  const sloganCards = isZh
    ? [
        { title: 'Find places worth visiting', copy: '强调“值得去”。' },
        { title: 'Where should we go today?', copy: '直接命中脑内问题,最强。' },
        { title: 'Local spots, real context', copy: '强调本地与真实场景。' },
        { title: '今天去哪里？', copy: '中文感,生活化。' },
      ]
    : [
        { title: 'Find places worth visiting', copy: 'Emphasizes “worth it”.' },
        { title: 'Where should we go today?', copy: 'Hits the in-head question. Strongest.' },
        { title: 'Local spots, real context', copy: 'Emphasizes local + real scenes.' },
        { title: '今天去哪里？', copy: 'A local, lived-in Chinese voice.' },
      ];

  return (
    <div className="page-shell jiju-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="jiju-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={homeHref} className="jiju-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="jiju-hero py-16 text-center md:py-24">
            <p className="jiju-kicker mx-auto">{isZh ? 'Jiju / 本地人也会用的去处指南' : 'Jiju / A local discovery guide for places worth visiting'}</p>
            <h1 className="jiju-title mx-auto mt-5 font-display font-bold tracking-tight">Where should we go today?</h1>
            <p className="jiju-subtitle mx-auto mt-5">
              {isZh
                ? '不是普通 review site,也不是 pet-friendly app。Jiju 用真实生活需求帮你决定去哪:lunch set、laptop cafe、plug、parking、promo、宠物友好,以及本地人真的认可的食物。'
                : 'Not a review site, not a pet-friendly app. Jiju helps you decide where to go by real-life needs: lunch sets, laptop cafes, plugs, parking, promos, pet-friendly spots, and food locals actually approve.'}
            </p>
            <div className="jiju-scene-chips">
              {sceneEntries.map((label) => (
                <span key={label} className="jiju-scene-chip">{label}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="https://jiju.pet" target="_blank" rel="noopener noreferrer" className="jiju-text-cta">
                {isZh ? '打开 jiju.pet' : 'Open jiju.pet'} <ExternalLink size={15} />
              </a>
              <a href="#mvp" className="jiju-text-cta jiju-text-cta-muted">
                {isZh ? '看 MVP 计划' : 'View MVP plan'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section className="jiju-product-panel">
            <div className="jiju-product-copy">
              <p className="jiju-kicker">{isZh ? 'Positioning' : 'Positioning'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '卖的是“场景”,不是“地点”。' : 'It sells the scene, not the place.'}
              </h2>
              <p>
                {isZh
                  ? 'Google Map 是地点数据库。Jiju 要做的是场景数据库——把同一家店拆成「适不适合现在的我」。从 niche directory 变成 lifestyle utility:where to go, based on mood, need, time, budget, and lifestyle。'
                  : 'Google Maps is a place database. Jiju is a scene database — breaking each place into “does it fit me right now”. From a niche directory into a lifestyle utility: where to go, based on mood, need, time, budget, and lifestyle.'}
              </p>
            </div>
            <div className="jiju-proof-grid">
              {proofPoints.map(([label, value]) => (
                <div key={label} className="jiju-proof-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Same cafe, different data' : 'Same cafe, different data'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '同一家 cafe,在 Jiju 里被拆成可回答的问题。' : 'The same cafe, broken into questions Jiju can answer.'}
              </h2>
            </div>
            <div className="jiju-split-grid mt-12">
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? 'Google Map 显示' : 'Google Maps shows'}</h3>
                <ul>
                  {mapShows.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? 'Jiju 回答' : 'Jiju answers'}</h3>
                <ul>
                  {jijuAnswers.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'The problem' : 'The problem'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '人们搜的不是“餐厅”,是“情境”。' : 'People do not search for restaurants. They search for situations.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '今天 lunch 去哪、哪里能办公、哪里好 parking、本地人觉得哪里真的好——现有工具回答不了。'
                  : 'Where to eat now, where to work, where parking is easy, what locals actually rate — existing tools cannot answer.'}
              </p>
            </div>
            <div className="jiju-review-track mt-12">
              {problemCards.map((item) => (
                <article key={item.label} className="jiju-review-card">
                  <span>{item.label}</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? '5 main categories' : '5 main categories'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Eat · Work · Chill · Pet · Promo</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '五个主分类,每个都有很具体的标签。Pet 保留为强 filter,而不是唯一主轴。'
                  : 'Five main categories, each with concrete tags. Pet stays a strong filter, not the only axis.'}
              </p>
            </div>
            <div className="jiju-cat-grid mt-12">
              {categoryCards.map((cat) => (
                <article key={cat.title} className="jiju-cat-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{cat.title}</h3>
                  <p className="jiju-kicker">{cat.note}</p>
                  <div className="jiju-tag-row">
                    {cat.tags.map((tag) => (
                      <span key={tag} className="jiju-tag">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Jiju Fit Score' : 'Jiju Fit Score'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '不只显示 rating,显示“适不适合你”。' : 'Not just a rating — a fit score.'}
              </h2>
            </div>
            <div className="jiju-score-card mt-12">
              <div className="jiju-score-grid">
                {scoreRows.map(([label, value]) => (
                  <div key={label} className="jiju-score-row">
                    <span>{label}</span>
                    <div className="jiju-score-bar">
                      <div className="jiju-score-fill" style={{ width: `${value * 10}%` }} />
                    </div>
                    <strong>{value.toFixed(1)}</strong>
                  </div>
                ))}
              </div>
              <p className="jiju-score-summary">
                Best for weekday laptop work and affordable lunch set, but parking gets difficult after 12:30pm.
              </p>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Place Profile' : 'Place Profile'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '资料像数据库,比 Google Map 更有用。' : 'Each profile reads like a database, more useful than Maps.'}
              </h2>
            </div>
            <div className="jiju-profile-card mt-12">
              {profileRows.map(([label, value]) => (
                <div key={label} className="jiju-profile-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Differentiation' : 'Differentiation'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Not just highly rated. Actually useful.</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? 'Michelin / Google / Tripadvisor / 小红书都太游客化、太网红化、太多假 review、没有场景标签。Jiju 的差异化是 Local Context:plug、parking、能不能坐久、local 是否真去、promo 是否还 active。'
                  : 'Michelin / Google / Tripadvisor / XHS are too touristy, too influencer-driven, too many fake reviews, no scene tags. Jiju’s edge is Local Context: plugs, parking, sit-long, whether locals really go, and whether the promo is still active.'}
              </p>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Homepage concept' : 'Homepage concept'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '首页是场景入口,不是地图。' : 'The homepage is a scene entry, not a map.'}
              </h2>
            </div>
            <div className="jiju-split-grid mt-12">
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? '第一屏 · 场景按钮' : 'First screen · scene buttons'}</h3>
                <div className="jiju-tag-row">
                  {sceneEntries.map((label) => (
                    <span key={label} className="jiju-tag">{label}</span>
                  ))}
                </div>
              </article>
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">Today&apos;s useful picks</h3>
                <ul>
                  {todaysPicks.map((pick) => (
                    <li key={pick}>{pick}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section id="mvp" className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'MVP plan' : 'MVP plan'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '不要做整个 Malaysia。先做透一个城市。' : 'Do not do all of Malaysia. Nail one city first.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '第一版只做 8 个 filter:' : 'V1 ships only 8 filters:'}
              </p>
              <div className="jiju-tag-row">
                {mvpFilters.map((f) => (
                  <span key={f} className="jiju-tag">{f}</span>
                ))}
              </div>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {mvpCards.map((item) => (
                <article key={item.title} className="jiju-note-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <ul>
                    {item.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Business model' : 'Business model'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '日常高频,变现方式比 pet directory 多。' : 'Daily frequency, more monetization than a pet directory.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '用户每周用,而不是只有带宠物时才用。' : 'Used weekly, not only when bringing a pet.'}
              </p>
            </div>
            <div className="jiju-skill-grid mt-12">
              {businessCards.map((item) => (
                <article key={item.title} className="jiju-skill-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Domain strategy' : 'Domain strategy'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '.pet 还是新域名?先验证再决定。' : '.pet or a new domain? Validate first.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '当下结论:先别纠结 domain,先验证有没有人真的用场景搜索。' : 'For now: do not over-think the domain, validate that people actually use scene search.'}
              </p>
            </div>
            <div className="jiju-operating-grid mt-12">
              {domainCards.map((group) => (
                <article key={group.title} className="jiju-operating-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{group.title}</h3>
                  <ul>
                    {group.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Founder roles' : 'Founder roles'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? 'Eden 做系统,partner 做真实增长。' : 'Eden builds systems; partner drives real-world growth.'}
              </h2>
            </div>
            <div className="jiju-philosophy-list mt-12">
              {founderRows.map((item) => (
                <article key={item.role} className="jiju-philosophy-row">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.role}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Slogan & brand' : 'Slogan & brand'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Local places, filtered by real-life needs.</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '不看星级、不看网红、不看广告——看我现在饿了、要坐着工作、怕 parking、带宠物、想省钱、想吃 local 觉得真好吃的、不想踩雷。'
                  : 'Not stars, not influencers, not ads — but: I am hungry now, I need to sit and work, I dread parking, I have my pet, I want to save, I want food locals actually love, I do not want to get burned.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {sloganCards.map((item) => (
                <article key={item.title} className="jiju-system-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <a href={joinBasePath(revampBase, 'jiju-pet')} className="jiju-text-cta jiju-text-cta-muted mt-10 inline-flex">
              {isZh ? '看 Jiju.pet 构建记录' : 'View the Jiju.pet build log'} <span aria-hidden>›</span>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
};

type ActiveBuildSkill = {
  label: string;
  kind: 'hard' | 'soft';
};

type HomeCopy = { en: string; zh: string };

const homeCollageItems: Array<{
  title: string;
  tone: string;
  image?: string;
  video?: string;
  imageAlt?: HomeCopy;
  href?: string;
  linkLabel?: HomeCopy;
  ctaLabel?: HomeCopy;
}> = [
  {
    title: 'Life OS',
    tone: 'starmap',
    image: 'home-banners/life-os-banner-poster.jpg',
    video: 'home-banners/life-os-banner.mp4',
    imageAlt: { en: 'A lone robed figure with a staff faces a colossal dragon in the rain and mist, then raises a blazing light toward it', zh: '一名持杖的斗篷行者在雨雾中直面巨龙，随后向它举起一团炽亮的光' },
    href: 'life-os',
    linkLabel: { en: 'Open the Life OS product page', zh: '打开 Life OS 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'ETReportHub',
    tone: 'ocean',
    image: 'home-banners/etreporthub-banner-poster.jpg',
    video: 'home-banners/etreporthub-banner.mp4',
    imageAlt: { en: 'ETReportHub cinematic operations banner', zh: 'ETReportHub 电影感运营场景 banner' },
    href: 'etreporthub',
    linkLabel: { en: 'Open the ETReportHub product page', zh: '打开 ETReportHub 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'Dr Racing',
    tone: 'racing',
    image: 'home-banners/dr-racing-banner-poster.jpg',
    video: 'home-banners/dr-racing-banner.mp4',
    imageAlt: { en: 'Two motorcycle riders accelerating through city traffic', zh: '两名摩托车骑士在城市车流中加速前进' },
    href: 'dr-racing',
    linkLabel: { en: 'Open the Dr Racing product page', zh: '打开 Dr Racing 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'What is Wealth',
    tone: 'wealth',
    image: 'home-banners/what-is-wealth-banner-poster.jpg',
    video: 'home-banners/what-is-wealth-banner.mp4',
    imageAlt: { en: 'US dollar bills drifting in slow motion onto dark marble against a warm golden background', zh: '美元纸币在暖金色光晕中缓缓飘落到深色大理石台面上' },
    href: 'notes/what-is-wealth',
    linkLabel: { en: 'Read the essay: What is wealth, really?', zh: '阅读文章：财富到底是什么' },
    ctaLabel: { en: 'Read the essay', zh: '阅读文章' },
  },
  {
    title: 'Jiju',
    tone: 'coral',
    image: 'home-banners/jiju-adventure-seo.jpg',
    video: 'home-banners/jiju-home-banner.mp4',
    imageAlt: { en: 'Jiju adventure cat navigating an old harbor street with a map and compass', zh: 'Jiju 冒险猫拿着地图与指南针探索旧港街道' },
    href: 'jiju-pet',
    linkLabel: { en: 'Open the Jiju product page', zh: '打开 Jiju 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'Friday Poker Club',
    tone: 'poker',
    image: 'home-banners/friday-poker-club.jpg',
    imageAlt: { en: 'Friday Poker Club private poker table in a dark vintage club', zh: 'Friday Poker Club 深色复古私人牌桌场景' },
    href: 'poker',
    linkLabel: { en: 'Open the Friday Poker Club product page', zh: '打开 Friday Poker Club 产品页面' },
    ctaLabel: { en: 'Play now', zh: '立即开玩' },
  },
  {
    title: "Conway's Game of Life",
    tone: 'conway',
    image: 'home-banners/conway-bagua-pyramid-banner-poster.jpg',
    video: 'home-banners/conway-bagua-pyramid-banner.mp4',
    imageAlt: {
      en: 'An ancient pyramid beneath a luminous Bagua formation as blue and gold lightning converges overhead',
      zh: '古老金字塔上空浮现发光八卦阵，蓝金色闪电在云层中交汇',
    },
    href: 'conways-game-of-life',
    linkLabel: { en: "Open Conway's Game of Life", zh: "打开 Conway's Game of Life" },
    ctaLabel: { en: 'Play now', zh: '立即开玩' },
  },
  {
    title: 'Diving / Ocean',
    tone: 'sea',
    image: 'home-banners/diving-ocean-banner-poster.jpg',
    video: 'home-banners/diving-ocean-banner.mp4',
    imageAlt: { en: 'A first-person dive through a coral reef among rising bubbles, arriving at an octopus DJ spinning records beneath neon light', zh: '第一人称潜入珊瑚礁，穿过上升的气泡，来到在霓虹灯下打碟的章鱼 DJ 面前' },
    href: 'videos/pulau-kapas.mp4',
    linkLabel: { en: 'Watch the Pulau Kapas ocean film', zh: '观看 Pulau Kapas 海洋影片' },
    ctaLabel: { en: 'Watch now', zh: '立即观看' },
  },
  {
    title: 'Film Gallery',
    tone: 'film',
    image: 'home-banners/film-gallery-banner-poster.jpg',
    video: 'home-banners/film-gallery-banner.mp4',
    imageAlt: { en: 'A vintage twin-lens reflex camera revealing film reels through its viewfinder', zh: '复古双反相机的取景器里映出转动的胶片卷轴' },
    href: 'film-gallery',
    linkLabel: { en: 'Open Film Gallery', zh: '打开 Film Gallery' },
    ctaLabel: { en: 'View gallery', zh: '查看图库' },
  },
];

/**
 * The collage cards ride a compositor-driven marquee, and IntersectionObserver does not
 * reliably recompute while a transform animation runs on the compositor — a card can
 * slide fully into view without a single callback, which left its video paused forever.
 * getBoundingClientRect does see the animated transform, so every collage video registers
 * a sampler here and one shared rAF loop checks them at ~400ms intervals. rAF is the right
 * clock for this: it stops on its own when the page is hidden (unlike setInterval, which
 * merely gets throttled) and it is in step with the animation it is sampling.
 */
const collageVideoSamplers = new Set<() => void>();
let collageSamplerFrame = 0;
let collageSamplerLast = 0;

const runCollageSamplers = (now: number) => {
  collageSamplerFrame = window.requestAnimationFrame(runCollageSamplers);
  if (now - collageSamplerLast < 400) return;
  collageSamplerLast = now;
  collageVideoSamplers.forEach((sample) => sample());
};

const registerCollageVideoSampler = (sample: () => void) => {
  collageVideoSamplers.add(sample);
  if (!collageSamplerFrame) {
    collageSamplerFrame = window.requestAnimationFrame(runCollageSamplers);
  }
  return () => {
    collageVideoSamplers.delete(sample);
    if (collageVideoSamplers.size === 0 && collageSamplerFrame) {
      window.cancelAnimationFrame(collageSamplerFrame);
      collageSamplerFrame = 0;
    }
  };
};

const HomeCollageVideo: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Safari checks both the muted property and the content attribute before
    // allowing inline autoplay.
    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');

    const shouldPlay = () => {
      if (motionQuery.matches || document.hidden) return false;
      const rect = video.getBoundingClientRect();
      // zero-sized means a stylesheet hid it, not that it scrolled away
      if (rect.width === 0 || rect.height === 0) return false;
      return rect.right > 0 && rect.left < window.innerWidth && rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const syncPlayback = () => {
      if (shouldPlay()) {
        void video.play().catch(() => undefined);
      } else if (!video.paused) {
        video.pause();
      }
    };

    syncPlayback();
    const unregister = registerCollageVideoSampler(syncPlayback);
    motionQuery.addEventListener('change', syncPlayback);
    video.addEventListener('canplay', syncPlayback);
    // rAF stops while the page is hidden, so pausing has to be driven by the event
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      unregister();
      motionQuery.removeEventListener('change', syncPlayback);
      video.removeEventListener('canplay', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="eden-collage-video"
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

type HomeCollageItem = (typeof homeCollageItems)[number];

const HomeCollageCard: React.FC<{ item: HomeCollageItem; language: Language; baseUrl: string; duplicate?: boolean }> = ({ item, language, baseUrl, duplicate = false }) => {
  const cardContent = (
    <>
      {item.video ? (
        <>
          {item.image ? (
            <img
              className="eden-collage-image"
              src={resolveAssetPath(baseUrl, item.image)}
              alt={item.imageAlt?.[language] ?? item.title}
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <HomeCollageVideo
            src={resolveAssetPath(baseUrl, item.video)}
            poster={item.image ? resolveAssetPath(baseUrl, item.image) : undefined}
          />
        </>
      ) : item.image ? (
        <img
          className="eden-collage-image"
          src={resolveAssetPath(baseUrl, item.image)}
          alt={item.imageAlt?.[language] ?? item.title}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="eden-placeholder-art" aria-hidden="true"><i /><i /><i /></div>
      )}
      <div className="eden-collage-reveal">
        {item.href ? (
          <span className="eden-collage-cta">{item.ctaLabel?.[language] ?? (language === 'zh' ? '了解更多' : 'Learn more')}</span>
        ) : (
          <h3>{item.title}</h3>
        )}
      </div>
    </>
  );

  return item.href ? (
    <a
      className={`eden-collage-card tone-${item.tone}`}
      href={resolveAssetPath(baseUrl, item.href)}
      aria-label={item.linkLabel?.[language] ?? item.title}
      tabIndex={duplicate ? -1 : undefined}
    >
      {cardContent}
    </a>
  ) : (
    <article className={`eden-collage-card tone-${item.tone}`} tabIndex={duplicate ? -1 : 0}>
      {cardContent}
    </article>
  );
};

/**
 * One marquee row. The items are rendered twice so translating the track by exactly
 * one run loops with no visible seam.
 *
 * That distance used to be written as `-50%`, which is correct per spec — a percentage
 * translate resolves against the element's own border box, and the track is exactly two
 * runs wide. iOS Safari does not agree: on a `width: max-content` flex track it resolves
 * the percentage against the wrong box and lands on roughly 25px, so the marquee jitters
 * in place instead of scrolling (measured on an iPhone: 25 distinct offsets over 23s,
 * against 600 for an identical row animated in px). So measure one run and hand the
 * keyframes a pixel distance through `--eden-run-shift`.
 *
 * The duplicate run stays clickable — do NOT mark it `inert`, that removes it from hit
 * testing and half the visible cards stop responding — it is only hidden from the
 * accessibility tree and the tab order, so the real run is the one keyboard users reach.
 * The drift pauses on hover and focus so cards can actually be clicked.
 */
const HomeCollageRow: React.FC<{
  items: HomeCollageItem[];
  language: Language;
  baseUrl: string;
  direction: 'left' | 'right';
}> = ({ items, language, baseUrl, direction }) => {
  const trackRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const track = trackRef.current;
    const run = track?.firstElementChild;
    if (!track || !run) return;

    // A run's border box already includes each card's right margin, so its width is one
    // whole run with gaps — exactly what `-50%` of the two-run track was meant to be.
    const measure = () => {
      track.style.setProperty('--eden-run-shift', `${run.getBoundingClientRect().width}px`);
    };

    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(run);
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div className={`eden-collage-row eden-collage-row-${direction}`}>
      <div className="eden-collage-track" ref={trackRef}>
        {[0, 1].map((run) => (
          <div className="eden-collage-run" key={run} aria-hidden={run === 1 || undefined}>
            {items.map((item) => (
              <HomeCollageCard key={item.title} item={item} language={language} baseUrl={baseUrl} duplicate={run === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const HomeCollage: React.FC<{ language: Language; baseUrl: string }> = ({ language, baseUrl }) => (
  <div className="eden-collage" aria-label={language === 'zh' ? 'Eden 的项目与生活观察拼贴' : "Eden's work and field-note collage"}>
    <HomeCollageRow items={homeCollageItems.slice(0, 4)} language={language} baseUrl={baseUrl} direction="left" />
    <HomeCollageRow items={homeCollageItems.slice(4)} language={language} baseUrl={baseUrl} direction="right" />
  </div>
);

type SiteEssayNote = {
  slug: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  category: Record<Language, string>;
  thesis: Record<Language, string>;
  sources: string[];
  sections: Array<{
    title: Record<Language, string>;
    paragraphs: Record<Language, string[]>;
  }>;
  // Optional link back to the full original source page (served from public/).
  originalSource?: { url: string; label: Record<Language, string> };
  // Optional reference list. Paragraphs may embed [[n]] tokens that link to the
  // matching reference id, and each reference renders a ↩ backlink to that spot.
  references?: Array<{ id: string; url: string; label: Record<Language, string> }>;
  // Optional note shown under the references. Falls back to a generic line.
  referencesNote?: Record<Language, string>;
};


const publishedNotes = [
  ...siteEssayNotes.map((note) => ({
    title: note.title,
    summary: note.summary,
    category: note.category,
    href: `notes/${note.slug}`,
  })),
  {
    title: { en: 'Button feedback is part of the system', zh: '按钮反馈，本来就是系统的一部分' },
    summary: {
      en: 'Pressed, pending, accepted, blocked, and failed: what a realtime interface needs to say after a click.',
      zh: '按下、等待、接受、阻挡与失败：一个 realtime interface 在 click 之后应该说清楚什么。',
    },
    category: { en: 'Interaction', zh: '交互' },
    href: 'wiki/button-feedback',
  },
  {
    title: { en: 'Background music changes the room', zh: 'Background music 会改变一个房间' },
    summary: {
      en: 'Why optional sound can make a browser poker table feel shared, present, and alive.',
      zh: '为什么可控的声音，会让 browser poker table 更像一个大家真的在场的空间。',
    },
    category: { en: 'Experience', zh: '体验' },
    href: 'wiki/background-music',
  },
  {
    title: { en: 'Firebase as durable table memory', zh: '用 Firebase 留住牌桌的记忆' },
    summary: {
      en: 'Rooms, reconnects, public games, and cleanup logic behind a table that needs to remember.',
      zh: '房间、重连、公开游戏与 cleanup logic：一张需要记得事情的牌桌，是怎样被搭起来的。',
    },
    category: { en: 'Build note', zh: '构建笔记' },
    href: 'wiki/firebase-lifetime-storage',
  },
  {
    title: { en: 'The Vite skills that survived the build', zh: '真正留到最后的 Vite skills' },
    summary: {
      en: 'A practical release loop covering local development, routes, assets, environment values, and production checks.',
      zh: '从 local development、routes、assets、environment values 到 production checks 的实用 release loop。',
    },
    category: { en: 'Engineering', zh: '工程' },
    href: 'wiki/vite',
  },
];

const NotesPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';

  return (
    <div className="page-shell notes-page min-h-screen">
      <main className="notes-main">
        <div className="notes-island">
          <div className="notes-topbar">
            <a href={homeHref} className="notes-back-link">
              <ArrowLeft size={17} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection
              compactLanguageOnSelection
            />
          </div>

          <header className="notes-hero">
            <p className="notes-eyebrow">Notes by Eden</p>
            <h1>{isZh ? '一些值得留下来的想法' : 'Ideas worth keeping around'}</h1>
            <p className="notes-intro">
              {isZh
                ? '这里放我发布的文章、build notes，还有那些做着做着才想明白的东西。关于 product、AI、人的行为，以及怎样把混乱慢慢变成 system。'
                : 'Published essays, build notes, and the things I only understood after making them. About products, AI, human behavior, and turning messy realities into systems.'}
            </p>
          </header>

          <section className="notes-index" aria-labelledby="notes-index-title">
            <div className="notes-index-heading">
              <h2 id="notes-index-title">{isZh ? '已发布' : 'Published'}</h2>
              <span>{publishedNotes.length.toString().padStart(2, '0')}</span>
            </div>
            <div className="notes-list">
              {publishedNotes.map((note) => (
                <a key={note.href} className="notes-entry" href={joinBasePath(baseUrl, note.href)}>
                  <span className="notes-entry-category">{note.category[language]}</span>
                  <div>
                    <h3>{note.title[language]}</h3>
                    <p>{note.summary[language]}</p>
                  </div>
                  <span className="notes-entry-arrow" aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Split an essay paragraph on inline tokens and render each one:
//   [[n]]                     → a superscript citation that jumps to reference n
//                               (and carries an id so the reference can link back).
//   [[note:slug|display]]     → an internal link to another note (/notes/<slug>).
// Plain text segments are returned unchanged.
const renderEssayParagraph = (
  text: string,
  slug: string,
  language: Language,
  baseUrl: string,
  seenCites: Set<string>,
): React.ReactNode[] =>
  text.split(/(\[\[(?:note:[^\]]+|\d+)\]\])/g).map((part, index) => {
    const citeMatch = part.match(/^\[\[(\d+)\]\]$/);
    if (citeMatch) {
      const refId = citeMatch[1];
      // A reference may be cited more than once; only the first occurrence carries
      // the anchor id so ids stay unique and the reference's ↩ lands on first mention.
      const isFirst = !seenCites.has(refId);
      if (isFirst) seenCites.add(refId);
      return (
        <sup key={`cite-${index}`} className="notes-cite" {...(isFirst ? { id: `cite-${slug}-${refId}` } : {})}>
          <a href={`#ref-${slug}-${refId}`} aria-label={language === 'zh' ? `参考资料 ${refId}` : `Reference ${refId}`}>{refId}</a>
        </sup>
      );
    }
    const linkMatch = part.match(/^\[\[note:([^|\]]+)\|([^\]]+)\]\]$/);
    if (linkMatch) {
      const [, targetSlug, label] = linkMatch;
      return (
        <a key={`link-${index}`} className="notes-inline-link" href={joinBasePath(baseUrl, `notes/${targetSlug}`)}>{label}</a>
      );
    }
    return part;
  });

const SiteEssayNotePage: React.FC<{
  note: SiteEssayNote;
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ note, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const notesHref = joinBasePath(baseUrl, 'notes');
  // Tracks which reference numbers have been rendered, so repeated citations don't
  // emit duplicate anchor ids. Fresh per render (and per language switch).
  const citeSeen = new Set<string>();

  return (
    <div className="page-shell notes-article-page min-h-screen">
      <main className="notes-article-main">
        <div className="notes-article-island">
          <div className="notes-topbar">
            <a href={notesHref} className="notes-back-link">
              <ArrowLeft size={17} />
              {isZh ? '返回 Notes' : 'Back to Notes'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
              compactThemeOnSelection
              compactLanguageOnSelection
            />
          </div>

          <header className="notes-article-hero">
            <div className="notes-article-mark notes-essay-mark" aria-hidden>ET</div>
            <p className="notes-eyebrow">{note.category[language]}</p>
            <h1>{note.title[language]}</h1>
            <p className="notes-article-deck">{note.summary[language]}</p>
            <div className="notes-article-sources" aria-label={isZh ? '来源书目' : 'Source books'}>
              {note.sources.map((source) => <span key={source}>{source}</span>)}
            </div>
            {note.originalSource && (
              <a
                className="notes-source-original"
                href={resolveAssetPath(baseUrl, note.originalSource.url)}
                target="_blank"
                rel="noopener"
              >
                {note.originalSource.label[language]}
                <span aria-hidden> ↗</span>
              </a>
            )}
          </header>

          <article className="notes-article-body">
            <blockquote className="notes-article-thesis">
              <span>Core thesis</span>
              <p>{note.thesis[language]}</p>
            </blockquote>
            <div className="notes-article-sections">
              {note.sections.map((section, index) => (
                <section key={section.title.en} className="notes-article-section">
                  <div className="notes-article-section-number">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h2>{section.title[language]}</h2>
                    <div className="notes-article-points">
                      {section.paragraphs[language].map((paragraph) => <p key={paragraph}>{renderEssayParagraph(paragraph, note.slug, language, baseUrl, citeSeen)}</p>)}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </article>

          {note.references && note.references.length > 0 && (
            <section className="notes-article-references" aria-label={isZh ? '参考资料' : 'References'}>
              <h2>{isZh ? '参考资料' : 'References'}</h2>
              <ol>
                {note.references.map((ref) => (
                  <li key={ref.id} id={`ref-${note.slug}-${ref.id}`}>
                    <span className="notes-ref-body">
                      {ref.label[language]}{' '}
                      <a className="notes-ref-link" href={ref.url} target="_blank" rel="noopener">{isZh ? '查看来源' : 'Source'} ↗</a>
                    </span>
                    <a className="notes-ref-back" href={`#cite-${note.slug}-${ref.id}`} aria-label={isZh ? '返回正文' : 'Back to text'}>↩</a>
                  </li>
                ))}
              </ol>
              <p className="notes-ref-note">
                {note.referencesNote
                  ? note.referencesNote[language]
                  : (isZh
                    ? '以上是文章「事实」部分的来源；文中的判断与推演仅代表作者个人观点。'
                    : 'These are the sources for the factual claims; any judgments and extrapolations are the author\'s own view.')}
              </p>
            </section>
          )}

          <footer className="notes-article-footer">
            <p>{isZh ? '继续阅读 Eden 的文章与 build notes' : "Keep reading Eden's essays and build notes"}</p>
            <a href={notesHref}>{isZh ? '回到全部 Notes' : 'View all Notes'} <span aria-hidden>→</span></a>
          </footer>
        </div>
      </main>
    </div>
  );
};

const iconPromptProducts = [
  {
    id: 'etreporthub',
    name: 'ETReportHub',
    color: '#176B87',
    style: 'precise geometric line icons, consistent 2px rounded strokes, transparent background, deep ocean blue #176B87, warm white #F5F3EF, and one restrained sunset-orange #E8683A signal accent; analytical, calm, reliable, operational',
    batches: [
      ['Product facts', ['operations team reviewing one shared dashboard', 'spreadsheet entering through an import arrow', 'local database cylinder with a small home marker', 'dashboard connected to a CRM user profile']],
      ['Core capabilities', ['two daily spreadsheets merging into one organized system tray', 'business trend line with one highlighted change signal', 'member profile with a precise action target', 'dashboard transforming into a clean exported spreadsheet']],
      ['Daily workflow', ['uploading an Excel sheet', 'two mismatched data rows reconciling into one checked row', 'dashboard signal resolving into one decision arrow', 'selected CRM audience moving into an outbound action']],
      ['System layer', ['database protected by a clear local-data boundary', 'three stacked layers for input, database, and dashboard', 'interactive demo window with a cursor', 'launch action connecting a dashboard to an operating team']],
    ],
  },
  {
    id: 'jiju',
    name: 'Jiju',
    color: '#388E63',
    style: 'warm organic line icons, consistent 2px rounded strokes, transparent background, sage green #388E63, charcoal #343633, and a small sunlight-yellow #F0C96A accent; friendly, trustworthy, curious, calm',
    batches: [
      ['Product facts', ['Penang island coastline with one location marker', 'curved discovery path leading to a place', 'cat silhouette combined with a profile card', 'location marker inside an open memory book']],
      ['Core capabilities', ['cat following a path toward a discovered place', 'verified location marker with a small pet silhouette', 'pet silhouette beside a saved visit photo', 'three pet-and-human profiles connected around one location']],
      ['Outing workflow', ['magnifying lens revealing a pet-friendly place', 'place card with verified pet-policy indicators', 'person and pet moving together toward a location', 'bookmarked place connected to a pet memory card']],
      ['Trust system', ['pet profile protected inside a soft shield', 'three connected layers for place data, pet identity, and visit memory', 'interactive local-discovery map with a cursor', 'open-door destination welcoming a person and pet']],
    ],
  },
  {
    id: 'poker',
    name: 'Friday Poker Club',
    color: '#176447',
    style: 'confident geometric line icons, consistent 2px rounded strokes, transparent background, dark table green #176447, warm cream #F1EDE3, charcoal #111B18, and restrained muted red #C95B55 accents; private home game, familiar group ritual, never casino-like',
    batches: [
      ['Product facts', ['four seat markers around a private oval table', 'two understated Hold’em cards at the table center', 'four table positions connected by a realtime sync signal', 'browser window containing a small poker table']],
      ['Private-game design', ['private link transforming into a poker table', 'four familiar friend profiles around one shared table', 'confirmed poker action with a visible turn indicator', 'speech bubble and memory marker beside the table']],
      ['Table workflow', ['highlighted host seat controlling a four-seat table', 'private invite link moving toward three friends', 'play-chip stack moving toward one empty seat with no currency symbol', 'story card containing a table and four friend markers']],
      ['Room system', ['private table enclosed by a boundary and small lock', 'three stacked layers for room, realtime table, and shared memory', 'interactive browser table with a cursor', 'open table with an invitation arrow bringing the crew back']],
    ],
  },
] as const;

const buildFourGridPrompt = (product: typeof iconPromptProducts[number], batch: typeof product.batches[number]) => `Create one cohesive 2×2 icon sheet for ${product.name}.

The sheet must contain exactly four separate icons:
1. ${batch[1][0]}
2. ${batch[1][1]}
3. ${batch[1][2]}
4. ${batch[1][3]}

Visual system: ${product.style}.

Layout requirements: arrange the four icons in a precise 2×2 grid with equal cell sizes and generous spacing. Each icon must be centered, fully visible, isolated, and easy to crop into an individual square asset. Keep identical scale, stroke width, corner radius, spacing, and visual weight across all four cells. No dividers and no surrounding card or app-icon container.

Output requirements: transparent background, flat vector-quality rendering, crisp edges, readable at 32px and 48px, no text, letters, numbers, labels, emoji, watermark, gradients, glow, glass effect, 3D rendering, or excessive detail.`;

const iconPromptPreviewIcons: Record<string, React.ElementType[][]> = {
  etreporthub: [
    [UserRound, Download, Database, TrendingUp],
    [Download, TrendingUp, SearchCheck, ExternalLink],
    [Download, GitBranch, ArrowRight, Send],
    [Database, Layers, ExternalLink, UserRound],
  ],
  jiju: [
    [MapPin, Search, UserRound, Bookmark],
    [Search, SearchCheck, Bookmark, UserRound],
    [Search, SearchCheck, MapPin, Bookmark],
    [UserRound, Layers, ExternalLink, MapPin],
  ],
  poker: [
    [UserRound, Layers, GitBranch, Play],
    [ExternalLink, UserRound, MessageSquare, Bookmark],
    [SlidersHorizontal, Send, Plus, MessageSquare],
    [GitBranch, Layers, ExternalLink, Play],
  ],
};

const iconPromptProductNotes: Record<string, string> = {
  etreporthub: 'Operational clarity · data movement · decision signals',
  jiju: 'Local discovery · pet identity · trusted memories',
  poker: 'Private ritual · familiar crew · shared table moments',
};

type ProjectAppEntry = {
  id: string;
  name: string;
  href: string;
  caption: Record<Language, string>;
  Icon: React.FC<{ label: string }>;
};

const ProjectHomePage: React.FC<{
  homeHref: string;
  jijuHref: string;
  pokerHref: string;
  etReportHubHref: string;
  drRacingHref: string;
  filmGalleryHref: string;
  conwayHref: string;
  penneyHref: string;
  miyaHref: string;
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
  miyaHref,
  lifeOsHref,
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
      id: 'life-os',
      name: 'Life OS',
      href: lifeOsHref,
      caption: { en: 'Personal base map', zh: '个人底图' },
      Icon: ProjectsLifeOsCssIcon,
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
    {
      id: 'miya',
      name: 'MiYa',
      href: miyaHref,
      caption: { en: 'On-device health', zh: '本机健康报告' },
      Icon: ProjectsMiyaCssIcon,
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
              ? '都是用心做的'
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
        </nav>
      </main>
    </div>
  );
};

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

const IconPromptsPage: React.FC<{ homeHref: string }> = ({ homeHref }) => {
  const [copied, setCopied] = React.useState<string | null>(null);
  const [activeProductId, setActiveProductId] = React.useState(iconPromptProducts[0].id);
  const activeProduct = iconPromptProducts.find((product) => product.id === activeProductId) ?? iconPromptProducts[0];

  const writeToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const didCopy = document.execCommand('copy');
    textarea.remove();
    if (!didCopy) throw new Error('Clipboard unavailable');
  };

  const copyPrompt = async (id: string, prompt: string) => {
    try {
      await writeToClipboard(prompt);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => current === id ? null : current), 1600);
    } catch {
      setCopied(`error-${id}`);
      window.setTimeout(() => setCopied((current) => current === `error-${id}` ? null : current), 2200);
    }
  };

  const copyAllPrompts = () => {
    const promptSet = activeProduct.batches
      .map((batch, index) => `PROMPT ${index + 1} · ${batch[0].toUpperCase()}\n\n${buildFourGridPrompt(activeProduct, batch)}`)
      .join('\n\n────────────────────\n\n');
    copyPrompt(`${activeProduct.id}-all`, promptSet);
  };

  return (
    <div className="page-shell icon-prompts-page">
      <main><div className="icon-prompts-island">
        <header className="icon-prompts-hero">
          <a href={homeHref} className="icon-prompts-back"><ArrowLeft size={16} /> Back home</a>
          <p>Icon prompt studio</p>
          <h1>Design the system<br />before the icons.</h1>
          <span>三个产品，十二组四宫格 Prompt。先统一视觉语法，再让 agent 一次生成 4 枚可以直接拆分的产品图标。</span>
        </header>

        <nav className="icon-prompts-switcher" aria-label="Choose a product icon system">
          <div className="icon-prompts-tabs" role="tablist" aria-label="Products">
            {iconPromptProducts.map((product) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeProduct.id === product.id}
                aria-controls="active-icon-prompt-system"
                className={activeProduct.id === product.id ? 'is-active' : ''}
                key={product.id}
                style={{ '--tab-accent': product.color } as React.CSSProperties}
                onClick={() => setActiveProductId(product.id)}
              >
                <i aria-hidden />
                {product.name}
              </button>
            ))}
          </div>
          <button className="icon-prompts-copy-all" type="button" onClick={copyAllPrompts}>
            <Copy size={15} />
            {copied === `${activeProduct.id}-all` ? 'Copied all' : copied === `error-${activeProduct.id}-all` ? 'Copy failed' : 'Copy all four'}
          </button>
        </nav>

        <section
          id="active-icon-prompt-system"
          className="icon-prompts-product"
          style={{ '--prompt-accent': activeProduct.color } as React.CSSProperties}
        >
          <div className="icon-prompts-product-head">
            <div>
              <p>Selected product system</p>
              <h2>{activeProduct.name}</h2>
            </div>
            <span>{iconPromptProductNotes[activeProduct.id]}</span>
          </div>

          <div className="icon-prompts-grid">
            {activeProduct.batches.map((batch, index) => {
              const id = `${activeProduct.id}-${index}`;
              const prompt = buildFourGridPrompt(activeProduct, batch);
              const previewIcons = iconPromptPreviewIcons[activeProduct.id][index];
              return (
                <article className="icon-prompt-card" key={id}>
                  <div className="icon-prompt-card-head">
                    <span>0{index + 1}</span>
                    <h3>{batch[0]}</h3>
                    <button type="button" onClick={() => copyPrompt(id, prompt)} aria-label={`Copy ${batch[0]} prompt`}>
                      <Copy size={15} />
                      {copied === id ? 'Copied' : copied === `error-${id}` ? 'Try again' : 'Copy'}
                    </button>
                  </div>

                  <div className="icon-prompt-preview" aria-hidden>
                    {previewIcons.map((PreviewIcon, itemIndex) => (
                      <div className="icon-prompt-preview-cell" key={`${id}-preview-${itemIndex}`}>
                        <span>0{itemIndex + 1}</span>
                        <PreviewIcon size={38} strokeWidth={1.65} />
                      </div>
                    ))}
                  </div>

                  <ol>
                    {batch[1].map((item) => <li key={item}>{item}</li>)}
                  </ol>

                  <details className="icon-prompt-details">
                    <summary><span>View full production prompt</span><ArrowRight size={16} /></summary>
                    <pre>{prompt}</pre>
                  </details>
                </article>
              );
            })}
          </div>
        </section>
      </div></main>
    </div>
  );
};

const DelayedAboutProfileVideo: React.FC<{
  baseUrl: string;
  label: string;
}> = ({ baseUrl, label }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timeoutId = window.setTimeout(() => {
      void videoRef.current?.play().catch(() => undefined);
    }, 15_000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <video
      ref={videoRef}
      src={joinBasePath(baseUrl, 'videos/eden-profile-joker-laugh.mp4')}
      poster={joinBasePath(baseUrl, 'images/eden-environmental-portrait.jpg')}
      aria-label={label}
      preload="metadata"
      muted
      playsInline
    />
  );
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
    </div>
  );
};

export default App;
