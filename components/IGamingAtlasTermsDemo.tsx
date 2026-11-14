import React from 'react';
import { Badge, Bar, Button, Check, Popover, Roll, Stage, Window, type Act } from './stageshow/kit';
import './IGamingAtlasTermsDemo.css';

type Lang = 'en' | 'zh';

/**
 * `/igaming/atlas` services: what the "promotion terms audit" looks like in use (stageshow).
 * One promotion in three languages, compared field by field. Beats: a scan runs down the
 * rows and each one is marked Match; at Wagering the BM version says 25× where EN and ZH say
 * 20×, the row turns Mismatch and the conflict count rolls to 1; the pointer opens that cell,
 * a note offers to log it as v2 for the rules owner; Send confirms on its own button; the
 * note closes and the row keeps "v2 sent" — the result stays on screen. Plays once in view.
 *
 * Real strings: the field names, the three versions (a table is where dense real data reads
 * right), the mismatch, the note. Values are illustrative.
 */

type Status = 'idle' | 'scan' | 'match' | 'mismatch' | 'sent';
type S = { st: Status[]; conflicts: number; pop: boolean; sent: boolean };

const ROWS: { field: string; en: string; zh: string; bm: string }[] = [
  { field: 'Eligibility', en: 'New players', zh: '新玩家', bm: 'Pemain baru' },
  { field: 'Max bonus', en: '100', zh: '100', bm: '100' },
  { field: 'Wagering', en: '20×', zh: '20×', bm: '25×' },
  { field: 'Excluded', en: 'Live casino', zh: '真人娱乐', bm: 'Kasino langsung' },
  { field: 'Valid', en: '1–31 Dec', zh: '12月1–31日', bm: '1–31 Dis' },
];
const BAD = 2;

const COPY = {
  en: { note: 'BM says 25×, EN and ZH say 20×.', ask: 'Log as v2 for the rules owner', send: 'Send', sent: 'Sent' },
  zh: { note: 'BM 写 25×，EN 和中文写 20×。', ask: '记为 v2，交 rules owner 裁定', send: 'Send', sent: 'Sent' },
};

const initial: S = { st: ROWS.map(() => 'idle'), conflicts: 0, pop: false, sent: false };
const poster: S = { st: ROWS.map((_, i) => (i === BAD ? 'sent' : 'match')), conflicts: 1, pop: false, sent: true };

async function script(a: Act<S>) {
  await a.wait(800);
  const st: Status[] = ROWS.map(() => 'idle');
  for (let i = 0; i < ROWS.length; i += 1) {
    st[i] = 'scan';
    a.put({ st: [...st] });
    await a.wait(i === BAD ? 700 : 480);
    st[i] = i === BAD ? 'mismatch' : 'match';
    a.put({ st: [...st], ...(i === BAD ? { conflicts: 1 } : {}) });
    await a.wait(i === BAD ? 700 : 160);
  }
  await a.wait(500);
  a.mark('open');
  await a.move({ at: 'bad', x: 0.5, y: 0.5 });
  await a.click({ at: 'bad', x: 0.5, y: 0.5 });
  a.put({ pop: true });
  await a.wait(1300);
  await a.move({ at: 'send', x: 0.5, y: 0.55 });
  await a.click({ at: 'send', x: 0.5, y: 0.55 });
  a.mark('sent');
  a.put({ sent: true });
  await a.wait(1100);
  st[BAD] = 'sent';
  a.put({ st: [...st] });
  await a.wait(150);
  a.put({ pop: false });
  await a.wait(2600);
}

const BADGE: Record<Status, { tone: 'neutral' | 'success' | 'danger' | 'warning' | 'accent'; label: string } | null> = {
  idle: null,
  scan: { tone: 'neutral', label: 'Checking' },
  match: { tone: 'success', label: 'Match' },
  mismatch: { tone: 'danger', label: 'Mismatch' },
  sent: { tone: 'warning', label: 'v2 sent' },
};

const IGamingAtlasTermsDemo: React.FC<{ language: Lang }> = ({ language }) => {
  const c = COPY[language];
  return (
    <Stage<S>
      width={880}
      height={420}
      compact={{ below: 700, width: 358, height: 470 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      fill
      cursor={{ at: { wide: { x: 820, y: 390 }, compact: { x: 330, y: 440 } } }}
      className="atd"
    >
      {(s, rect, layout) => {
        const compact = layout === 'compact';
        const bad = rect('bad');
        return (
          <>
            <Window title="Terms check · Weekend reload" className="atd-win">
              <div className="atd-body">
                <div className="atd-toolbar">
                  <span className="atd-sub">3 versions · {ROWS.length} fields</span>
                  <span className="atd-count" data-on={s.conflicts > 0 || undefined}>
                    <Roll>{`${s.conflicts}`}</Roll>
                    <span>{s.conflicts === 1 ? 'conflict' : 'conflicts'}</span>
                  </span>
                </div>
                <div className="atd-grid" data-compact={compact || undefined}>
                  <div className="atd-row atd-row--head">
                    <span>Field</span>
                    <span>EN</span>
                    {!compact && <span>中文</span>}
                    <span>BM</span>
                    <span className="atd-status">{compact ? '' : 'Status'}</span>
                  </div>
                  {ROWS.map((r, i) => {
                    const b = BADGE[s.st[i]];
                    return (
                      <div key={r.field} className="atd-row" data-state={s.st[i]}>
                        <span className="atd-field">{r.field}</span>
                        <span>{r.en}</span>
                        {!compact && <span>{r.zh}</span>}
                        <span className="atd-cell" data-target={i === BAD ? 'bad' : undefined} data-cursor={i === BAD ? 'pointer' : undefined} data-flag={(i === BAD && s.st[i] !== 'idle' && s.st[i] !== 'scan') || undefined}>
                          {r.bm}
                        </span>
                        <span className="atd-status">
                          {b && compact ? (
                            <span className="atd-mark" data-state={s.st[i]}>
                              {s.st[i] === 'match' ? <Check on size={16} /> : s.st[i] === 'sent' ? 'v2' : s.st[i] === 'mismatch' ? <i /> : null}
                            </span>
                          ) : b ? (
                            <Badge tone={b.tone} icon={s.st[i] === 'match' ? <Check on size={12} /> : undefined}>
                              <Roll variant="fade">{b.label}</Roll>
                            </Badge>
                          ) : (
                            <Bar w={52} h={6} tone={2} />
                          )}
                        </span>
                      </div>
                    );
                  })}
                  {[64, 48].map((w, i) => (
                    <div key={`f${i}`} className="atd-row atd-row--filler">
                      <Bar w={w} h={6} tone={2} />
                      <Bar w={58} h={6} tone={1} />
                      {!compact && <Bar w={44} h={6} tone={1} />}
                      <Bar w={50} h={6} tone={1} />
                      <span className="atd-status"><Bar w={48} h={6} tone={1} /></span>
                    </div>
                  ))}
                </div>
              </div>
            </Window>
            <Popover
              show={s.pop}
              origin="top left"
              className="atd-pop"
              style={bad ? { top: bad.y + bad.height + 8, left: compact ? Math.max(12, bad.x + bad.width - 260) : bad.x - 6 } : undefined}
            >
              <div className="atd-pop-head">
                <span className="atd-pop-dot" />
                <span>{c.note}</span>
              </div>
              <div className="atd-pop-ask">{c.ask}</div>
              <div className="atd-pop-foot">
                <Button variant="primary" size="small" data-target="send" icon={s.sent ? <Check on size={12} /> : undefined}>
                  {s.sent ? c.sent : c.send}
                </Button>
              </div>
            </Popover>
          </>
        );
      }}
    </Stage>
  );
};

export default IGamingAtlasTermsDemo;
