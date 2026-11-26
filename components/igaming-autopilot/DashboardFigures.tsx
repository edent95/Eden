/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Dashboard figures for /igaming-ai (owner, 2026-11-26). The engine is told as four layers. Layer 0, the
// records, is in RecordFigures.tsx; the other three each already run somewhere: the loop that moves records (Jiju), the pipeline where people take over (Dr Racing,
// a client's dealership tool — methods only, never its numbers or names), and the layer that says where
// things stopped and how much is automatic (the owner's own operations dashboard — methods only).
//   IgLayers     three questions, three answers, where each one runs today
//   IgDashboard  a faux dashboard with three screens (Now / Record / Loops) that plays one story:
//                a loop step sticks → it becomes one decision on Now → a person fixes one row → it moves on
//   IgLevels     automation levels (watch / propose / auto) with hard caps on money and terms
// Everything shown inside the mock is made up and captioned as such. Motion follows the system-story
// rules: loop only while on screen, reduced motion shows a still state. Styles: .igap-* in
// styles/pages/jiju-autopilot.css.

import React from 'react';
import { Check, Lock } from 'lucide-react';
import type { EpText } from '../ProductStorePage';
import { useLoopStep } from '../system-story/SystemStory';
import type { ApHue } from '../jiju-autopilot/AutopilotFigures';

const t = (en: string, zh: string): EpText => ({ en, zh });
const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);

/* ---------- 1. three layers ---------- */

export type IgLayer = { id: string; hue: ApHue; icon: React.ReactNode; tag: EpText; question: EpText; answer: EpText; from?: EpText; href?: string };

export const IgLayers: React.FC<{ isZh: boolean; title: EpText; items: IgLayer[]; runsLabel: EpText; caption: EpText }> = ({ isZh, title, items, runsLabel, caption }) => {
  const ref = React.useRef<HTMLOListElement | null>(null);
  const step = useLoopStep(ref, items.length + 2, 1600, items.length);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, title)}</p>
      <ol ref={ref} className="igap-layers">
        {items.map((item, index) => (
          <li key={item.id} className={`igap-layer jap-hue-${item.hue}${step >= index ? ' is-in' : ''}${step === index ? ' is-now' : ''}`}>
            <span className="igap-layer-icon" aria-hidden="true">{item.icon}</span>
            <p className="igap-layer-tag">{pick(isZh, item.tag)}</p>
            <p className="igap-layer-q">{pick(isZh, item.question)}</p>
            <p className="igap-layer-a">{pick(isZh, item.answer)}</p>
            {item.from ? (
              <p className="igap-layer-from">
                <span>{pick(isZh, runsLabel)}</span>{' '}
                {item.href ? <a href={item.href}>{pick(isZh, item.from)}</a> : pick(isZh, item.from)}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption>{pick(isZh, caption)}</figcaption>
    </figure>
  );
};

/* ---------- 2. the dashboard: Now / Record / Loops ---------- */

type Tab = 'now' | 'record' | 'loops';
type Phase = 'running' | 'stuck' | 'fixed';
type Role = 'am' | 'tech' | 'promo';

const TABS: { id: Tab; name: EpText; asks: EpText }[] = [
  { id: 'now', name: t('Now', '现在'), asks: t('What is waiting for me?', '什么在等我？') },
  { id: 'record', name: t('Record', '对象'), asks: t('Where is this operator?', '这家 operator 走到哪了？') },
  { id: 'loops', name: t('Loops', '回路'), asks: t('What runs by itself, and where did it stop?', '什么在自己跑、停在哪？') },
];

// one story, six beats; reduced motion parks on beat 2 (the decision on Now)
const STORY: { tab: Tab; phase: Phase; line: EpText }[] = [
  { tab: 'loops', phase: 'running', line: t('The promotion loop is checking 50 variants by itself.', '促销回路正在自己核对 50 个变体。') },
  { tab: 'loops', phase: 'stuck', line: t('One variant fails the check. The step stops and says why.', '有一个变体没过。那一步停下，并写明原因。') },
  { tab: 'now', phase: 'stuck', line: t('The stuck step becomes one decision at the top of Now.', '卡住的那一步，变成「现在」最上面的一个决定。') },
  { tab: 'record', phase: 'stuck', line: t('On the operator’s record, the role who owns that row sees one plain next step.', '在这家 operator 的页面上，负责那一格的角色看到一句清楚的下一步。') },
  { tab: 'record', phase: 'fixed', line: t('The row is confirmed. The checklist is complete, so the variant goes live by itself.', '那一格确认了。清单齐了，变体自己上线。') },
  { tab: 'now', phase: 'fixed', line: t('The decision leaves Now. The loop keeps turning.', '这个决定从「现在」消失，回路继续转。') },
];
const STILL = 2;

const STAGES = [t('Intake', '进来'), t('Configure', '配置'), t('Check', '把关'), t('Go live', '上线'), t('Report', '报表'), t('Watch', '巡查')];

const ROLES: { id: Role; name: EpText }[] = [
  { id: 'am', name: t('Account manager', '客户经理') },
  { id: 'tech', name: t('Integration', '对接') },
  { id: 'promo', name: t('Promotions', '促销') },
];

const ROWS: { id: string; name: EpText; role: Role; fails?: boolean }[] = [
  { id: 'brand', name: t('Operator / brand', 'Operator / 品牌'), role: 'am' },
  { id: 'market', name: t('Market', '市场'), role: 'am' },
  { id: 'currency', name: t('Currency', '币种'), role: 'tech', fails: true },
  { id: 'games', name: t('Eligible games', '适用游戏'), role: 'tech' },
  { id: 'dates', name: t('Dates & time zone', '日期与时区'), role: 'promo' },
  { id: 'caps', name: t('Funding & caps', '出资与上限'), role: 'am' },
  { id: 'rules', name: t('Max payout & rules', '最高支付与规则'), role: 'promo' },
  { id: 'assets', name: t('Assets', '素材'), role: 'promo' },
];

const LEVEL = { watch: t('Watch', '只看'), propose: t('Propose', '提议'), auto: t('Auto', '自动') };

const NowScreen: React.FC<{ isZh: boolean; phase: Phase }> = ({ isZh, phase }) => {
  const waiting = phase === 'stuck' ? 3 : 2;
  const running = phase === 'stuck' ? 47 : 48;
  const p = (text: EpText) => pick(isZh, text);
  return (
    <div className="igap-now">
      <p className="igap-now-count">
        <strong>{waiting}</strong> {p(t('waiting for your yes', '件等你点头'))} · <strong>{running}</strong> {p(t('running by themselves', '件自己在跑'))}
      </p>
      <p className="igap-dash-head">{p(t('Waiting for you · one decision each', '等你的 · 每件一个决定'))}</p>
      <ul className="igap-items">
        <li className={`igap-item is-stuck${phase === 'stuck' ? '' : ' is-gone'}`}>
          <div>
            <p className="igap-item-title">{p(t('Operator C’s currency is not switched on — send to Integration?', 'Operator C 的币种还没开 —— 派给对接？'))}</p>
            <p className="igap-item-why">{p(t('Weekend free-spin campaign · 7 of 8 fields confirmed · Loop: Promotions', '周末免费局活动 · 8 个字段过了 7 个 · 回路：促销'))}</p>
          </div>
          <span className="igap-btn">{p(t('Send', '派给对接'))}</span>
        </li>
        <li className="igap-item">
          <div>
            <p className="igap-item-title">{p(t('Operator A’s monthly report is drafted — send it?', 'Operator A 的月报初稿写好了 —— 发出去？'))}</p>
            <p className="igap-item-why">{p(t('What moved, why, who acts next · Loop: Reporting · Level: Propose', '什么变了、为什么、谁下一步 · 回路：报表 · 档位：提议'))}</p>
          </div>
          <span className="igap-btn">{p(t('Read draft', '看初稿'))}</span>
        </li>
        <li className="igap-item">
          <div>
            <p className="igap-item-title">{p(t('You approved 10 support answers unchanged — move this loop to Auto?', '客服答案你连续 10 次原样通过 —— 升到自动？'))}</p>
            <p className="igap-item-why">{p(t('Reviewed answers only; money and complaints stay with people · Loop: Support', '只限审过的答案；钱和投诉仍然转人 · 回路：客服'))}</p>
          </div>
          <span className="igap-btn">{p(t('Move to Auto', '升到自动'))}</span>
        </li>
      </ul>
      <p className="igap-dash-head">{p(t('Running by themselves · nothing to do; a stuck one moves up', '自己在跑 · 不用管，卡住了会升到上面'))}</p>
      <ul className="igap-quiet">
        <li>{p(t('Promotions — variants being checked and launched', '促销 —— 变体在核对、上线'))}</li>
        <li>{p(t('Game catalogue — a new release going out to every fitting operator', '游戏目录 —— 一款新游戏正在送到每家合适的 operator'))}</li>
        <li>{p(t('Onboarding — one application on day 9; the account manager has been reminded', '接入 —— 一个申请停了 9 天，已经提醒客户经理'))}</li>
        <li>{p(t('Account watch — next weekly sweep on Monday', '账户巡查 —— 下一次每周巡查在周一'))}</li>
      </ul>
    </div>
  );
};

const RecordScreen: React.FC<{ isZh: boolean; phase: Phase; role: Role; setRole: (role: Role) => void }> = ({ isZh, phase, role, setRole }) => {
  const p = (text: EpText) => pick(isZh, text);
  const fixed = phase === 'fixed';
  const at = fixed ? 3 : 2;
  return (
    <div className="igap-record">
      <p className="igap-record-name">Operator C · {p(t('Weekend free-spin campaign', '周末免费局活动'))}</p>
      <ol className="igap-chain" aria-label={p(t('Pipeline', '流水线'))}>
        {STAGES.map((stage, index) => (
          <li key={stage.en} className={index < at ? 'is-done' : index === at ? (fixed ? 'is-now' : 'is-stuck') : ''}>
            {p(stage)}
            {index === at ? <em>{fixed ? p(t('now here', '现在在这')) : p(t('stopped here', '停在这'))}</em> : null}
          </li>
        ))}
      </ol>
      <div className="igap-roles" role="group" aria-label={p(t('View as', '用哪个角色看'))}>
        <span>{p(t('View as', '角色'))}</span>
        {ROLES.map((item) => (
          <button key={item.id} type="button" aria-pressed={item.id === role} className={item.id === role ? 'is-active' : ''} onClick={() => setRole(item.id)}>{p(item.name)}</button>
        ))}
      </div>
      <ul className="igap-check">
        {ROWS.map((row) => {
          const failing = row.fails && !fixed;
          return (
            <li key={row.id} className={`${row.role === role ? 'is-mine' : ''}${failing ? ' is-fail' : ''}`}>
              <span className="igap-check-box" aria-hidden="true">{failing ? null : <Check size={12} />}</span>
              <span className="igap-check-name">{p(row.name)}</span>
              <span className="igap-check-role">{p(ROLES.find((item) => item.id === row.role)!.name)}</span>
            </li>
          );
        })}
      </ul>
      <p className={`igap-next${fixed ? ' is-ok' : ''}`}>
        {fixed
          ? p(t('8 of 8 confirmed → live for Operator C. The operator has been told.', '8 个字段都确认了 → Operator C 上线，已经通知对方。'))
          : p(t('Next step: Integration switches the currency on for Operator C. Nothing else is missing.', '下一步：对接替 Operator C 把这个币种开起来。其他都不缺。'))}
      </p>
    </div>
  );
};

const LoopsScreen: React.FC<{ isZh: boolean; phase: Phase }> = ({ isZh, phase }) => {
  const p = (text: EpText) => pick(isZh, text);
  const stuck = phase === 'stuck';
  const loops: { id: string; name: EpText; level: EpText; at: number; stuck?: boolean; status: EpText }[] = [
    {
      id: 'promo', name: t('Promotions', '促销'), level: LEVEL.propose, at: 2, stuck,
      status: stuck ? t('Stopped: 1 of 50 variants failed the check', '卡住：50 个变体里 1 个没过') : t('Turning · 50 variants in check', '在转 · 50 个变体在把关'),
    },
    { id: 'onboard', name: t('Onboarding', '接入'), level: LEVEL.auto, at: 1, status: t('Turning · 1 application on day 9, reminder sent', '在转 · 1 个申请第 9 天，已提醒') },
    { id: 'catalogue', name: t('Game catalogue', '游戏目录'), level: LEVEL.auto, at: 3, status: t('Turning · next: tell the operators', '在转 · 下一步：通知 operator') },
    { id: 'support', name: t('Support', '客服'), level: LEVEL.propose, at: 4, status: t('Turning · 2 threads waiting for the operator to confirm', '在转 · 2 条对话等 operator 确认') },
  ];
  return (
    <div className="igap-loops">
      {loops.map((loop) => (
        <div key={loop.id} className={`igap-loop${loop.stuck ? ' is-stuck' : ''}`}>
          <p className="igap-loop-head">
            <strong>{p(loop.name)}</strong>
            <span className="igap-level">{p(loop.level)}</span>
            <span className="igap-loop-status">{p(loop.status)}</span>
          </p>
          <ol className="igap-chain">
            {STAGES.map((stage, index) => (
              <li key={stage.en} className={index < loop.at ? 'is-done' : index === loop.at ? (loop.stuck ? 'is-stuck' : 'is-now') : ''}>
                {p(stage)}
                {index === loop.at ? <em>{loop.stuck ? p(t('stopped here', '停在这')) : p(t('now here', '现在在这'))}</em> : null}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export const IgDashboard: React.FC<{ isZh: boolean; title: EpText; caption: EpText }> = ({ isZh, title, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const auto = useLoopStep(ref, STORY.length, 3200, STILL);
  const [picked, setPicked] = React.useState<Tab | null>(null);
  const [role, setRole] = React.useState<Role>('tech');
  const beat = STORY[auto];
  // a tab the reader picked holds on the moment something is stuck — the state a dashboard exists for
  const tab = picked ?? beat.tab;
  const phase: Phase = picked ? 'stuck' : beat.phase;
  const p = (text: EpText) => pick(isZh, text);
  return (
    <figure className="jjc-figure igap-dash-figure">
      <p className="jjc-figure-title">{p(title)}</p>
      <div ref={ref} className="igap-dash">
        <div className="igap-tabs" role="group" aria-label={p(t('Dashboard screens', '仪表台的三个画面'))}>
          {TABS.map((item) => (
            <button key={item.id} type="button" aria-pressed={item.id === tab} className={item.id === tab ? 'is-active' : ''} onClick={() => setPicked(item.id)}>
              <strong>{p(item.name)}</strong>
              <small>{p(item.asks)}</small>
            </button>
          ))}
        </div>
        <div className="igap-screen">
          {tab === 'now' ? <NowScreen isZh={isZh} phase={phase} /> : null}
          {tab === 'record' ? <RecordScreen isZh={isZh} phase={phase} role={role} setRole={setRole} /> : null}
          {tab === 'loops' ? <LoopsScreen isZh={isZh} phase={phase} /> : null}
        </div>
        <p className="igap-story">
          {picked
            ? <button type="button" onClick={() => setPicked(null)}>{p(t('Play the story again', '重新播放这段过程'))}</button>
            : <><span aria-hidden="true">{auto + 1} / {STORY.length}</span> {p(beat.line)}</>}
        </p>
      </div>
      <figcaption>{p(caption)}</figcaption>
    </figure>
  );
};

/* ---------- 3. automation levels ---------- */

export type IgLevelRow = { id: string; name: EpText; cap: 'propose' | 'auto'; why: EpText };

const LEVEL_STEPS = [
  t('Day one: everything only watches and reports.', '第一天：全部只看、只报告。'),
  t('Next: each loop proposes; you approve or change.', '接着：每条回路提议，你通过或改。'),
  t('After 10 approvals in a row, unchanged: it asks to go Auto. Money and terms never do.', '连续 10 次原样通过后：它问你要不要升到自动。钱和条款永远不会。'),
];

export const IgLevels: React.FC<{ isZh: boolean; title: EpText; rows: IgLevelRow[]; caption: EpText }> = ({ isZh, title, rows, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const step = useLoopStep(ref, 4, 2600, 2);
  const stage = Math.min(step, 2);
  const p = (text: EpText) => pick(isZh, text);
  const cols = [LEVEL.watch, LEVEL.propose, LEVEL.auto];
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{p(title)}</p>
      <div ref={ref} className="igap-levels" role="img" aria-label={p(t(
        `Automation levels per loop. Every loop starts on Watch, then Propose. ${rows.filter((row) => row.cap === 'auto').map((row) => row.name.en).join(', ')} can reach Auto after ten unchanged approvals in a row. ${rows.filter((row) => row.cap === 'propose').map((row) => row.name.en).join(', ')} are capped at Propose.`,
        `每条回路的自动化档位。全部从「只看」开始，再到「提议」。${rows.filter((row) => row.cap === 'auto').map((row) => row.name.zh).join('、')}在连续十次原样通过后可以升到「自动」。${rows.filter((row) => row.cap === 'propose').map((row) => row.name.zh).join('、')}最高只到「提议」。`,
      ))}>
        <div className="igap-levels-head" aria-hidden="true">
          <span />
          {cols.map((col) => <span key={col.en}>{p(col)}</span>)}
        </div>
        {rows.map((row) => {
          const at = Math.min(stage, row.cap === 'auto' ? 2 : 1);
          return (
            <div key={row.id} className="igap-levels-row" aria-hidden="true">
              <span className="igap-levels-name">{p(row.name)}<small>{p(row.why)}</small></span>
              {cols.map((col, index) => (
                <span key={col.en} className={`igap-levels-cell${index === at ? ' is-at' : ''}${index < at ? ' is-past' : ''}${index === 2 && row.cap === 'propose' ? ' is-locked' : ''}`}>
                  {index === 2 && row.cap === 'propose' ? <Lock size={12} /> : null}
                </span>
              ))}
            </div>
          );
        })}
        <p className="igap-levels-step" aria-hidden="true">{p(LEVEL_STEPS[stage])}</p>
      </div>
      <figcaption>{p(caption)}</figcaption>
    </figure>
  );
};
