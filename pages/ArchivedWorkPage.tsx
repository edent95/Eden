/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { HeaderControls, resolveAssetPath } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { archivedWorks } from './archived-works';

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
