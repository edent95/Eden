import React from 'react';
import { archivedWorks } from '../app/archive';
import { elementalIconCssArtItems, homeInterestCssArtItems, homeSelectedWorkBannerItems, homeSystemCssArtItems, officeIconCssArtItems, projectCssArtItems } from '../css-art.registry';
import { HeaderControls, resolveAssetPath, type Language, type Theme, type ThemePreference } from '../app/shared';
import { ArrowLeft, ExternalLink } from 'lucide-react';

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

export const ProjectCssGalleryPage: React.FC<{
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

export const ArchivedWorkPage: React.FC<{
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
