/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Site-wide primitives shared by every route: language/theme types, base-path helpers and the
 * HeaderControls navigation (source of truth for the global menu, styled in styles/shared.css).
 */

import React from 'react';
import { Clock3, MoonStar, SunMedium } from 'lucide-react';
import { routeSeoForPath } from '../seo-routes';

export type Language = 'en' | 'zh';

export type Theme = 'light' | 'dark';

export type ThemePreference = Theme | 'auto';

export const normalizePath = (value: string) => {
  if (!value) return '/';
  const trimmed = value.replace(/\/+$/, '');
  return trimmed || '/';
};

export const joinBasePath = (base: string, path: string) => {
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

export const resolveAssetPath = (base: string, value: string) => {
  if (/^(?:[a-z]+:)?\/\//i.test(value)) return value;
  return joinBasePath(base, value);
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

export const HeaderControls: React.FC<{
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
