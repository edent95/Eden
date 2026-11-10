import React from 'react';
import type { IGamingLocalized } from './igaming-content';
import type { CaseBlock } from './igaming-cases-content';
import { IGamingWidget } from './igaming-charts';

/**
 * Renders one structured content block for the `/igaming` article pages
 * (`/igaming/cases/:slug` field notes and the `/igaming/ggr-vs-ngr` guide).
 * The static SEO body in `seo-static-content.ts` flattens the same blocks,
 * so a new block kind must be handled in both places.
 */
const CITATION = /((?:\[\d+\])+)/;

/**
 * Turns numbered citation markers such as `[2]` or `[2][3]` at the end of a
 * sentence into superscript links to the guide's reference list
 * (`#reference-2`). Text without markers is returned unchanged.
 */
export function renderCitedText(text: string): React.ReactNode {
  if (!CITATION.test(text)) return text;
  return text.split(CITATION).map((part, index) => {
    if (!CITATION.test(part)) return part;
    const numbers = part.match(/\d+/g) ?? [];
    return (
      <sup key={index} className="igaming-cite">
        {numbers.map((number) => (
          <a key={number} href={`#reference-${number}`} aria-label={`Reference ${number}`}>[{number}]</a>
        ))}
      </sup>
    );
  });
}

export function renderIGamingBlock(item: CaseBlock, key: number, translate: (value: IGamingLocalized) => string): React.ReactNode {
  const t = (value: IGamingLocalized) => renderCitedText(translate(value));
  switch (item.kind) {
    case 'h':
      return <h2 key={key}>{t(item.text)}</h2>;
    case 'p':
      return <p key={key} className="igaming-sublead">{t(item.text)}</p>;
    case 'callout':
      return (
        <aside key={key} className="igaming-callout">
          <strong>{t(item.title)}</strong>
          <p>{t(item.body)}</p>
        </aside>
      );
    case 'path':
      return (
        <ol key={key} className="igaming-path">
          {item.steps.map((step) => <li key={step.en}>{t(step)}</li>)}
        </ol>
      );
    case 'chain':
      return (
        <ol key={key} className="igaming-chain">
          {item.items.map((entry) => (
            <li key={entry.title.en}>
              <strong>{t(entry.title)}</strong>
              <p>{t(entry.body)}</p>
            </li>
          ))}
        </ol>
      );
    case 'cards':
      return (
        <ul key={key} className="igaming-grid is-three is-compact">
          {item.items.map((entry) => (
            <li key={entry.title.en}>
              <h4>{t(entry.title)}</h4>
              <p>{t(entry.body)}</p>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div key={key} className="igaming-table-scroll">
          <table className="igaming-metrics">
            <thead>
              <tr>{item.head.map((cell) => <th key={cell.en} scope="col">{t(cell)}</th>)}</tr>
            </thead>
            <tbody>
              {item.rows.map(([rowHead, ...cells]) => (
                <tr key={rowHead.en}>
                  <th scope="row">{t(rowHead)}</th>
                  {cells.map((cell, index) => <td key={`${cell.en}-${index}`}>{t(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'list':
      return (
        <ul key={key} className="igaming-list">
          {item.items.map((entry) => <li key={entry.en}>{t(entry)}</li>)}
        </ul>
      );
    case 'stat':
      return (
        <div key={key} className="igaming-case-stat">
          <strong>{item.value}</strong>
          <p className="igaming-case-stat-label">{t(item.label)}</p>
          <p className="igaming-case-stat-note">{t(item.note)}</p>
        </div>
      );
    case 'widget':
      return <React.Fragment key={key}><IGamingWidget widget={item.widget} title={item.title} caption={item.caption} t={translate} /></React.Fragment>;
    default:
      return null;
  }
}
