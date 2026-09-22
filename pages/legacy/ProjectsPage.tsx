/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LEGACY — not rendered by any route. App.tsx never imports this file, so it is not in the
 * bundle; it is kept only as reference material from an earlier page version. Delete it rather
 * than wiring it back in; live routes are the lazy pages registered in App.tsx.
 */

import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { HeaderControls, joinBasePath } from '../../app/shared';
import type { Language, Theme, ThemePreference } from '../../app/shared';
import { getProjectCssArtByProjectTitle } from '../../css-art.registry';
import { aiProjectSystems } from '../ProjectCssGalleryPage';

const aiProjectSharedLogic = [
  {
    title: { en: 'Messy input', zh: '一团乱的输入' },
    copy: {
      en: 'Raw behavior, Excel dumps, place data, game rooms, user journeys, and whatever ops scribbled down.',
      zh: '原始行为、Excel 导出、地点资料、游戏房间、用户路径，还有运营随手记的那些。',
    },
  },
  {
    title: { en: 'System layer', zh: '系统层' },
    copy: {
      en: 'Rules, data models, UI states, workflows, cache boundaries — the repeatable logic sitting underneath.',
      zh: '规则、数据模型、UI 状态、工作流、缓存边界——底下那套能反复用的逻辑。',
    },
  },
  {
    title: { en: 'Useful output', zh: '能用的输出' },
    copy: {
      en: 'Dashboards, discovery maps, action queues, build notes, and decisions you can actually go back and review.',
      zh: '仪表盘、发现地图、行动队列、构建记录，还有真的能回头复盘的判断。',
    },
  },
] as const;

export const ProjectsFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const jijuHref = joinBasePath(baseUrl, 'jiju-pet');
  const etReportHubHref = joinBasePath(baseUrl, 'etreporthub');
  const etReportHubSalesHref = joinBasePath(baseUrl, 'etreporthub-sales');
  const pokerHref = joinBasePath(baseUrl, 'poker');

  return (
    <div className="page-shell projects-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="projects-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={homeHref} className="projects-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
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

          <header className="projects-hero py-16 md:py-24">
            <p className="projects-kicker">{isZh ? 'Projects / AI Build Systems' : 'Projects / AI Build Systems'}</p>
            <h1 className="projects-title mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Different builds. Same stubborn habit.' : 'Different builds. Same stubborn habit.'}
            </h1>
            <p className="projects-subtitle mt-5">
              {isZh
                ? 'Jiju、Friday Poker Club 和 ETReportHub。项目不一样，底下其实每次都是同一招：把一团乱的输入，变成真的能用的 system。'
                : 'Jiju, Friday Poker Club, and ETReportHub. Different projects, but underneath it’s the same move every time: take messy input and turn it into something you can actually use.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-5">
              <a href="#project-stack" className="projects-text-cta">
                {isZh ? '看项目合集' : 'View stack'} <span aria-hidden>›</span>
              </a>
              <a href="#etreporthub" className="projects-text-cta projects-text-cta-muted">
                {isZh ? '看 ETReportHub' : 'View ETReportHub'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section className="projects-bundle-panel">
            <div className="projects-bundle-copy">
              <p className="projects-kicker">{isZh ? 'Build operating system' : 'Build operating system'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '与其说是项目列表，不如说是我一直在搭的几套系统。' : 'Not really a project list — more a few systems I keep building.'}
              </h2>
              <p>
                {isZh
                  ? '不想把作品平铺成一张清单。这里留下的是三种一直重复出现的动作：发现、一起玩，以及把资料变成判断。'
                  : 'This is not a flat portfolio list. These builds repeat three moves: discovery, shared play, and turning information into judgment.'}
              </p>
            </div>
            <div className="projects-bundle-grid">
              {aiProjectSharedLogic.map((item) => (
                <article key={item.title.en} className="projects-logic-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="project-stack" className="projects-section py-16 md:py-24">
            <div className="projects-section-head">
              <p className="projects-kicker">{isZh ? 'Project stack' : 'Project stack'}</p>
              <h2 className="projects-section-title font-display font-bold tracking-tight">
                {isZh ? '三个慢慢长成系统的东西。' : 'Three things slowly turning into real systems.'}
              </h2>
            </div>
            <div className="projects-grid mt-12">
              {aiProjectSystems.map((project) => {
                const isJiju = project.href === 'jiju';
                const isETReportHub = project.title === 'ETReportHub';
                const isPoker = project.title === 'Friday Poker Club';
                const cardClassName = ['projects-card', isJiju ? 'projects-card-jiju' : ''].filter(Boolean).join(' ');
                const titleClassName = [
                  'projects-card-title font-display font-bold tracking-tight',
                  isETReportHub ? 'projects-card-title-compact' : '',
                  isPoker ? 'projects-card-title-stacked' : '',
                ].filter(Boolean).join(' ');
                const projectCssArt = getProjectCssArtByProjectTitle(project.title);
                const ProjectIcon = projectCssArt?.Component;
                const projectIcon = ProjectIcon ? <ProjectIcon label={projectCssArt.label[language]} /> : null;
                return (
                  <article key={project.title} id={project.href} className={cardClassName}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="projects-card-eyebrow">{project.eyebrow[language]}</p>
                      <span className="projects-status">{project.status[language]}</span>
                    </div>
                    <div className="projects-card-identity mt-5">
                      <div className="projects-card-icon-slot">{projectIcon}</div>
                      <div>
                        <div className="projects-card-title-row">
                          <h3 className={titleClassName}>
                            {isETReportHub ? (
                              <>
                                <span>ETReport</span>
                                <span>Hub</span>
                              </>
                            ) : (
                              project.title
                            )}
                          </h3>
                        </div>
                        <p className="projects-card-role">{project.role[language]}</p>
                      </div>
                    </div>
                    <p className="projects-card-summary">{project.summary[language]}</p>
                    <div className="projects-system-line">
                      <p className="projects-card-eyebrow">{isZh ? 'System layer' : 'System layer'}</p>
                      <p>{project.system[language]}</p>
                    </div>
                    <div className="projects-card-actions">
                      {isJiju && (
                        <a href={jijuHref} className="projects-text-cta">
                          {isZh ? '看构建记录' : 'View build log'} <span aria-hidden>›</span>
                        </a>
                      )}
                      {isPoker && (
                        <a href={pokerHref} className="projects-text-cta">
                          {isZh ? '看产品页' : 'View product page'} <span aria-hidden>›</span>
                        </a>
                      )}
                      {isETReportHub && (
                        <a href={etReportHubHref} className="projects-text-cta">
                          {isZh ? '看产品页' : 'View product page'} <span aria-hidden>›</span>
                        </a>
                      )}
                      {isETReportHub && (
                        <a href={etReportHubSalesHref} className="projects-text-cta projects-text-cta-muted">
                          {isZh ? '看售卖页' : 'View sales page'} <span aria-hidden>›</span>
                        </a>
                      )}
                      {project.external && (
                        <a
                          href={project.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects-text-cta projects-text-cta-muted"
                        >
                          {isZh ? '打开项目' : 'Open project'} <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="etreporthub" className="projects-section py-16 md:py-24">
            <div className="projects-section-head">
              <p className="projects-kicker">{isZh ? 'ETReportHub readout' : 'ETReportHub readout'}</p>
              <h2 className="projects-section-title font-display font-bold tracking-tight">
                {isZh ? '从导入，到分析，到下一步行动。' : 'From ingest, to analysis, to next action.'}
              </h2>
              <p className="projects-section-copy">
                {isZh
                  ? 'ETReportHub 的价值不是把数字排漂亮，而是把每天最容易出错的资料流变成可追踪、可解释、可导出、可以继续行动的系统。'
                  : 'ETReportHub is not about making numbers look pretty. It turns a fragile daily data flow into something traceable, explainable, exportable, and ready for the next action.'}
              </p>
            </div>
            <div className="projects-readout-grid mt-12">
              {(isZh
                ? [
                    ['Product Promise', '少一点人工对表，多一点可判断的运营系统。'],
                    ['Data Trust', 'Transaction 与 Customer Excel 按规则导入、标准化，并保留可复盘的资料层。'],
                    ['Operating Views', 'Performance、Members、Channels、Trends 和品牌对比，把日报变成判断。'],
                    ['Next Action', '会员分群、风险信号与留存区间，把资料变成下一步可以执行的动作。'],
                  ]
                : [
                    ['Product Promise', 'Less manual checking. More operating judgment.'],
                    ['Data Trust', 'Transaction and Customer Excel files are imported under rules, normalized, and kept reviewable.'],
                    ['Operating Views', 'Performance, Members, Channels, Trends, and brand comparison turn daily reporting into decisions.'],
                    ['Next Action', 'Member segments, risk signals, and retention buckets turn the data into a clear next move.'],
                  ]
              ).map(([label, copy]) => (
                <article key={label} className="projects-readout-card">
                  <p className="projects-card-eyebrow">{label}</p>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};
