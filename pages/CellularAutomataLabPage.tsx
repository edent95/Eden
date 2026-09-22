/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { HeaderControls } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { ProjectsCrmCssIcon } from '../components/css-art/index';
import { I_CHING_TRIGRAMS } from './i-ching';

const ELEMENTARY_RULE_COUNT = 256;

const ELEMENTARY_MAIN_WIDTH = 128;

const ELEMENTARY_MAIN_HEIGHT = 72;

const ELEMENTARY_THUMB_WIDTH = 24;

const ELEMENTARY_THUMB_HEIGHT = 14;

const FEATURED_ELEMENTARY_RULES = [30, 90, 110, 184] as const;

const ELEMENTARY_NEIGHBORHOODS = ['111', '110', '101', '100', '011', '010', '001', '000'] as const;

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

export const CellularAutomataLabFullPage: React.FC<{
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
