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

const previousProjectsData = [
  {
    title: {
      en: 'Promotion & Account Manager at Titan Group',
      zh: 'Titan Group｜推广与客户经理',
    },
    period: { en: '2024 - 2026', zh: '2024 - 2026' },
    points: {
      en: [
        'Helped partners and clients get API integrations, campaign tools, and onboarding sorted — and fixed things when they broke.',
        'Planned and ran campaign structures, including the trial incentives and how the bonuses actually worked.',
        'Kept track of who applied and which partners joined; put the campaign assets and announcements together and got them out.',
        'Ran the logistics for SiGMA and other expos — travel, meetings, booth needs, and chasing all the follow-ups after.',
        'Kept the paperwork tidy: request tracking, promo status, and the test-account workflow.',
        'Wrote the group announcements, gathered feedback from ops, and pushed issues to whoever needed to fix them.',
        'Worked with finance, design, and tech to ship campaigns faster and cleaner.',
      ],
      zh: [
        '帮合作伙伴和客户把 API 对接、活动工具、上线培训搞定——出问题就去排查。',
        '策划并落地活动结构，包含试用激励，还有奖金到底怎么玩。',
        '盯着谁报名、哪些合作方参与；活动素材和公告做好、发出去。',
        '统筹 SiGMA 和其他展会的后勤——行程、会议、展位需求，还有会后一个个跟进。',
        '把文档理整齐：请求跟踪、活动状态、测试账号流程。',
        '写群公告，收集运营反馈，有问题就升级给对应团队。',
        '跟财务、设计、技术一起，把活动做得更快、更干净。',
      ],
    },
    relatedLinks: [
      {
        label: { en: 'Mix & Match 1+1 Bonus key', zh: 'Mix & Match 1+1 Bonus key' },
        href: '/mnm11.html',
      },
      {
        label: { en: 'Promotion Page (Campaign Board)', zh: 'Promotion 页面（活动总览）' },
        href: '/Promotion%20Page.html',
      },
    ],
  },
  {
    title: {
      en: 'Senior Marketing Specialist at Job Social Malaysia',
      zh: 'Job Social Malaysia｜高级营销专员',
    },
    period: { en: '2023 - 2024', zh: '2023 - 2024' },
    points: {
      en: [
        'Built an automated Excel brand-report system for the outsourced marketing analysis.',
        'Made promotion retention planning easier to see — week by week and month by month.',
        'Set up a simple way to work through problems: spot it, dig into it, fix it.',
        'Kept the operational reports running — Facebook Ad ROI, Promotion & VIP, the monthly overall, game analysis, and the abnormal-list tracking.',
        'Standardized how reports were laid out so decisions could happen faster and cleaner.',
      ],
      zh: [
        '搭了一套自动化 Excel 品牌报告系统，撑外包营销分析。',
        '把活动留存规划做得更看得清——周和月都一目了然。',
        '建了一套处理问题的简单流程：发现、分析、解决。',
        '维护那些运营报表——Facebook 广告 ROI、活动与 VIP、月度总览、游戏分析、异常名单跟踪。',
        '统一报表结构，让决策更快、更干净。',
      ],
    },
  },
  {
    title: {
      en: 'Digital Marketing Manager at Atlantis Agency',
      zh: 'Atlantis Agency｜数字营销经理',
    },
    period: { en: '2021 - 2023', zh: '2021 - 2023' },
    points: {
      en: [
        'Led the UI/UX direction and built a whole new website structure from scratch.',
        'Got desktop and mobile to feel like the same brand, not two different sites.',
        'Made a handoff-ready prototype so the build team and I were actually on the same page.',
      ],
      zh: [
        '主导 UI/UX 方向，从零搭了一整个新网站结构。',
        '把桌面端和移动端拉到同一个品牌感，而不是两个不一样的站。',
        '做了能直接交接的原型，让研发和我真的在同一页上。',
      ],
    },
    relatedLinks: [
      {
        label: { en: 'UI/UX Prototype (Adobe XD)', zh: 'UI/UX 原型（Adobe XD）' },
        href: 'https://xd.adobe.com/view/26a08b2d-feb3-429e-9c76-45cf3eed8274-73f3/',
      },
    ],
  },
  {
    title: {
      en: 'Social Media Marketing Specialist at Black Sire Technology',
      zh: 'Black Sire Technology｜社交媒体营销专员',
    },
    period: { en: '2018 - 2021', zh: '2018 - 2021' },
    points: {
      en: [
        'Soccerking: made the content, planned the brand strategy, and read the Facebook insights.',
        'Built post-type systems for traffic, highlights, engagement, and shareable info albums.',
        'Ran the Like / Share / Tag and campaign-style traffic loops to grow the page.',
        'Facebook Ads: collecting leads, growing page likes, and pulling traffic to landing pages.',
        'Ran a gamified landing-page idea to get more clicks and deeper interaction.',
      ],
      zh: [
        'Soccerking：内容自己做、品牌策略自己规划、Facebook 数据自己看。',
        '搭帖子类型体系，覆盖引流、高光、互动和可分享的资讯相册。',
        '跑点赞/分享/标注和活动式流量闭环，把主页做起来。',
        'Facebook 广告：收潜客、涨粉、把流量拉到落地页。',
        '落地了一个游戏化活动页的想法，提升点击和互动深度。',
      ],
    },
    relatedLinks: [
      {
        label: { en: 'Soccerking Project', zh: 'Soccerking 项目' },
        href: '/archive/soccerking-project',
      },
    ],
  },
];

export const PreviousProjectsFullPage: React.FC<{
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

          <div className="motion-card mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              {isZh ? '历史项目档案' : 'Previous Project Archive'}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              {isZh ? '之前都做过些什么' : 'Stuff I’ve worked on'}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-stone-600">
              {isZh
                ? '把这些年做过的项目都摊在这里，每段在干嘛、解决了什么，尽量讲清楚，不堆漂亮话。'
                : 'Everything I’ve worked on over the years, laid out here — what each role was actually about and what it fixed, in plain terms, minus the résumé polish.'}
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {previousProjectsData.map((project, index) => (
              <section key={project.title.en} className="motion-card rounded-2xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">
                    {project.title[language]}
                  </h2>
                  <span className="rounded bg-stone-100 px-2 py-1 font-mono text-xs text-stone-500">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {isZh ? '时间线' : 'Timeline'}
                </p>
                <p className="mt-1 text-base leading-relaxed text-stone-700">{project.period[language]}</p>
                <ul className="mt-4 space-y-2 text-stone-700">
                  {project.points[language].map((point, pointIndex) => (
                    <li key={`${project.title.en}-${pointIndex}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-stone-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {project.relatedLinks && project.relatedLinks.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                      {isZh ? '相关项目' : 'Related Works'}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {project.relatedLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href.startsWith('/') ? joinBasePath(baseUrl, link.href) : link.href}
                          target={link.href.startsWith('/') ? undefined : '_blank'}
                          rel={link.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                        >
                          {link.label[language]}
                          <ExternalLink size={13} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
