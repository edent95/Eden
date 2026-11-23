/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Renders the step-by-step Jiju automation playbook (content in jiju-playbook-content.ts).
// Chapters are <details> so the long manual stays navigable; everything is in the DOM for search and print.
// Inline `code` in prose is written with backticks in the content strings.

import React from 'react';
import { JIJU_LESSONS, JIJU_PLAYBOOK, type PbText } from './jiju-playbook-content';

type Props = { isZh: boolean };

const Inline: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split('`');
  return (
    <>
      {parts.map((part, index) => (index % 2 === 1 ? <code key={index}>{part}</code> : <React.Fragment key={index}>{part}</React.Fragment>))}
    </>
  );
};

export const JijuPlaybook: React.FC<Props> = ({ isZh }) => {
  const pick = (text: PbText) => (isZh ? text.zh : text.en);
  const stepCount = JIJU_PLAYBOOK.reduce((sum, chapter) => sum + chapter.steps.length, 0);
  const [allOpen, setAllOpen] = React.useState<boolean | null>(null);

  return (
    <div className="jjp" id="playbook">
      <div className="jjp-toc">
        <p className="jjp-toc-title">
          {isZh ? `完整手册 · ${JIJU_PLAYBOOK.length} 章 ${stepCount} 步` : `The full manual · ${JIJU_PLAYBOOK.length} chapters, ${stepCount} steps`}
        </p>
        <ol>
          {JIJU_PLAYBOOK.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`} onClick={() => setAllOpen(null)}>{pick(chapter.title)}</a>
            </li>
          ))}
          <li><a href="#pb-lessons">{isZh ? '附 · 每条规矩是哪天、因为什么定的' : 'Appendix · when each rule was made, and why'}</a></li>
        </ol>
        <button type="button" className="jjp-toggle" onClick={() => setAllOpen((value) => !value)}>
          {allOpen ? (isZh ? '全部收起' : 'Collapse all') : (isZh ? '全部展开' : 'Expand all')}
        </button>
      </div>

      {JIJU_PLAYBOOK.map((chapter, chapterIndex) => (
        <details
          key={chapter.id}
          id={chapter.id}
          className="jjp-chapter"
          open={allOpen ?? false}
          onToggle={(event) => {
            if (allOpen !== null && (event.currentTarget as HTMLDetailsElement).open !== allOpen) setAllOpen(null);
          }}
        >
          <summary>
            <span className="jjp-chapter-title">{pick(chapter.title)}</span>
            <span className="jjp-chapter-count">{isZh ? `${chapter.steps.length} 步` : `${chapter.steps.length} steps`}</span>
          </summary>
          <p className="jjp-chapter-intro"><Inline text={pick(chapter.intro)} /></p>
          <ol className="jjp-steps">
            {chapter.steps.map((step, stepIndex) => (
              <li key={step.title.en} className="jjp-step">
                <h3>
                  <span className="jjp-step-no">{chapterIndex}.{stepIndex + 1}</span>
                  {pick(step.title)}
                </h3>
                {step.body.map((paragraph, index) => (
                  <p key={index}><Inline text={pick(paragraph)} /></p>
                ))}
                {step.list && (
                  <ul className="jjp-list">
                    {step.list.map((item, index) => (
                      <li key={index}><Inline text={pick(item)} /></li>
                    ))}
                  </ul>
                )}
                {step.code && (
                  <pre className="jjp-code" tabIndex={0} aria-label={isZh ? '代码与配置示例' : 'Code and config example'}>
                    <code>{step.code}</code>
                  </pre>
                )}
                {step.lesson && (
                  <div className="jjp-lesson">
                    <span>{isZh ? '踩过的坑' : 'What went wrong'}</span>
                    <p><Inline text={pick(step.lesson)} /></p>
                  </div>
                )}
                {step.source && (
                  <p className="jjp-source">{isZh ? '出处：' : 'Source: '}<code>{step.source}</code></p>
                )}
              </li>
            ))}
          </ol>
        </details>
      ))}

      <details id="pb-lessons" className="jjp-chapter" open={allOpen ?? false}>
        <summary>
          <span className="jjp-chapter-title">{isZh ? '附 · 每条规矩是哪天、因为什么定的' : 'Appendix · when each rule was made, and why'}</span>
          <span className="jjp-chapter-count">{isZh ? `${JIJU_LESSONS.length} 条` : `${JIJU_LESSONS.length} rules`}</span>
        </summary>
        <div className="jjp-table-wrap" tabIndex={0}>
          <table className="jjp-table">
            <thead>
              <tr>
                <th scope="col">{isZh ? '日期' : 'Date'}</th>
                <th scope="col">{isZh ? '规矩' : 'Rule'}</th>
                <th scope="col">{isZh ? '起因' : 'Because'}</th>
              </tr>
            </thead>
            <tbody>
              {JIJU_LESSONS.map((row) => (
                <tr key={row.date + row.rule.en}>
                  <td>{row.date}</td>
                  <td><Inline text={pick(row.rule)} /></td>
                  <td><Inline text={pick(row.cause)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
};
