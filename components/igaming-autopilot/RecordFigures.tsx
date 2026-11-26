/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Layer 0 of /igaming-ai (owner, 2026-11-26): the records themselves, as an aggregator keeps them —
// provider → integration line → account ← operator, plus promotions — and who may see which column.
// Structure and generic field names only: no provider, operator or company names, no rates, and no
// statement of where this model comes from (owner's instruction).
//   IgRecords     the four records and how they link; the account's status walks apply → live
//   IgVisibility  pick a role (or let it cycle) and see which columns that role gets
// Motion follows the system-story rules. Styles: .igap-rec-* / .igap-vis-* in styles/pages/jiju-autopilot.css.

import React from 'react';
import { Check, EyeOff, Minus } from 'lucide-react';
import type { EpText } from '../ProductStorePage';
import { useLoopStep } from '../system-story/SystemStory';
import type { ApHue } from '../jiju-autopilot/AutopilotFigures';

const t = (en: string, zh: string): EpText => ({ en, zh });
const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);

/* ---------- 1. the records ---------- */

const RECORDS: { id: string; hue: ApHue; name: EpText; what: EpText; fields: EpText[] }[] = [
  {
    id: 'provider', hue: 'amber', name: t('Provider', 'Provider'), what: t('a game brand', '一个游戏品牌'),
    fields: [t('Game types', '游戏类型'), t('Wallet type', '钱包类型'), t('IP restriction', 'IP 限制'), t('Back-office URL', '后台网址'), t('API docs', 'API 文档'), t('Account set-up guide', '开户教程'), t('Processing time', '开户处理时间')],
  },
  {
    id: 'line', hue: 'sky', name: t('Integration line', '接入线路'), what: t('one way to reach that provider — direct, or through an agent', '接到这个 provider 的一条路 —— 直连，或经代理'),
    fields: [t('Supported currencies', '支持币种'), t('Currency ratio', '币种比例'), t('Rates', '费率'), t('Credentials', '凭证')],
  },
  {
    id: 'account', hue: 'coral', name: t('Account', '接入帐号'), what: t('one operator on one line — the record that moves', '一家 operator 走一条线路 —— 会往前走的那条记录'),
    fields: [t('Product', '产品'), t('Currency', '币种'), t('Account type', '帐号类型'), t('Status', '状态'), t('Applied on', '申请日期')],
  },
  {
    id: 'operator', hue: 'leaf', name: t('Operator', 'Operator'), what: t('your client', '你的客户'),
    fields: [t('Code', '代码'), t('Brand', '品牌'), t('Currencies', '币种'), t('Contacts', '联系人'), t('Products taken', '已接的产品')],
  },
  {
    id: 'promo', hue: 'rose', name: t('Promotion', 'Promotion'), what: t('a provider’s campaign, offered to the operators on its lines', '一个 provider 的活动，给接了它的 operator'),
    fields: [t('Name', '活动名'), t('Discount', '折扣'), t('Duration', '期限'), t('T&C', '条款'), t('Materials', '素材')],
  },
];

const STATUS = [t('Applied', '申请'), t('Account opened', '开户'), t('Configured', '配置'), t('Live', '上线')];

export const IgRecords: React.FC<{ isZh: boolean; title: EpText; caption: EpText }> = ({ isZh, title, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  // beat 0: the application waits (the follow-up fires); beats 1..3 walk to live; beat 4 holds on live
  const step = useLoopStep(ref, 5, 1900, 3);
  const at = Math.min(step, 3);
  const p = (text: EpText) => pick(isZh, text);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{p(title)}</p>
      <div ref={ref} className="igap-rec" role="img" aria-label={p(t(
        'Five linked records. A provider has one or more integration lines. An operator takes a provider through one line; that pair is an account, which moves from applied to account opened, configured and live. A promotion belongs to a provider and goes to the operators on its lines. An application that stays on “applied” too long is followed up automatically.',
        '五种互相连着的记录。一个 provider 有一条或几条接入线路。一家 operator 经其中一条线路接一个 provider，这一对就是一个接入帐号，它从申请走到开户、配置、上线。Promotion 属于某个 provider，发给接了它的 operator。停在「申请」太久的，会自动跟进。',
      ))}>
        {RECORDS.map((record) => (
          <div key={record.id} aria-hidden="true" className={`igap-rec-card jap-hue-${record.hue}${record.id === 'account' ? ' is-moving' : ''}`}>
            <p className="igap-rec-name">{p(record.name)}<small>{p(record.what)}</small></p>
            <ul className="igap-rec-fields">
              {record.fields.map((field) => <li key={field.en}>{p(field)}</li>)}
            </ul>
            {record.id === 'account' ? (
              <>
                <ol className="igap-chain">
                  {STATUS.map((status, index) => (
                    <li key={status.en} className={index < at ? 'is-done' : index === at ? (at === 0 ? 'is-stuck' : 'is-now') : ''}>{p(status)}</li>
                  ))}
                </ol>
                <p className="igap-rec-note">
                  {at === 0
                    ? p(t('Day 9 on “Applied” → the account manager is reminded automatically.', '停在「申请」第 9 天 → 自动提醒客户经理。'))
                    : at === 3
                      ? p(t('Live. The date and who did each step are on the record.', '上线。每一步的日期和经手人都留在记录上。'))
                      : p(t('Each step is recorded with its date.', '每一步都记下日期。'))}
                </p>
              </>
            ) : null}
          </div>
        ))}
      </div>
      <figcaption>{p(caption)}</figcaption>
    </figure>
  );
};

/* ---------- 2. who sees what ---------- */

type See = 'yes' | 'part' | 'no';
type RoleId = 'admin' | 'am' | 'sales' | 'support' | 'provider' | 'operator' | 'ai';

const COLUMNS: { id: string; name: EpText }[] = [
  { id: 'info', name: t('Provider information', 'Provider 资料') },
  { id: 'sell', name: t('Sell rate', '售价') },
  { id: 'cost', name: t('Cost rate', '成本价') },
  { id: 'cred', name: t('Line credentials', '线路凭证') },
  { id: 'name', name: t('The other side’s real name', '对方的真名') },
];

const own = t('only the ones they handle', '只限自己负责的');
const ROLES: { id: RoleId; name: EpText; sees: [See, EpText?][] }[] = [
  { id: 'admin', name: t('Super admin', '超级管理员'), sees: [['yes'], ['yes', t('and may change it', '也能改')], ['yes'], ['yes'], ['yes']] },
  { id: 'am', name: t('Account manager', '客户经理'), sees: [['yes'], ['yes', t('read only', '只读')], ['no'], ['yes', t('each view is logged', '每次查看都留记录')], ['part', own]] },
  { id: 'sales', name: t('Sales', '销售'), sees: [['yes'], ['yes', t('read only', '只读')], ['no'], ['no'], ['part', own]] },
  { id: 'support', name: t('Support', '客服'), sees: [['yes'], ['yes', t('read only', '只读')], ['no'], ['no'], ['part', own]] },
  { id: 'provider', name: t('Provider (guest)', 'Provider（访客）'), sees: [['part', t('their own only', '只看自己的')], ['no'], ['no'], ['no'], ['no', t('sees an alias', '只看到代号')]] },
  { id: 'operator', name: t('Operator (guest)', 'Operator（访客）'), sees: [['part', t('only providers they take', '只看自己接入的')], ['no'], ['no'], ['no'], ['no', t('sees an alias', '只看到代号')]] },
  { id: 'ai', name: t('AI assistant', 'AI 助手'), sees: [['yes', t('this is all it reads', '它只读这一栏')], ['no'], ['no'], ['no'], ['no']] },
];

export const IgVisibility: React.FC<{ isZh: boolean; title: EpText; caption: EpText }> = ({ isZh, title, caption }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const auto = useLoopStep(ref, ROLES.length, 2400, ROLES.length - 1);
  const [picked, setPicked] = React.useState<number | null>(null);
  const active = picked ?? auto;
  const role = ROLES[active];
  const p = (text: EpText) => pick(isZh, text);
  const word = (see: See) => (see === 'yes' ? t('Sees it', '看得到') : see === 'part' ? t('Partly', '部分') : t('Never', '看不到'));
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{p(title)}</p>
      <div ref={ref} className="igap-vis">
        <div className="igap-roles" role="group" aria-label={p(t('Pick a role', '选一个角色'))}>
          {ROLES.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={index === active} className={index === active ? 'is-active' : ''} onClick={() => setPicked(index)}>{p(item.name)}</button>
          ))}
        </div>
        <ul className="igap-vis-rows" aria-live="off">
          {COLUMNS.map((column, index) => {
            const [see, note] = role.sees[index];
            return (
              <li key={column.id} className={`is-${see}${column.id === 'cost' ? ' is-cost' : ''}`}>
                <span className="igap-vis-mark" aria-hidden="true">{see === 'yes' ? <Check size={13} /> : see === 'part' ? <Minus size={13} /> : <EyeOff size={13} />}</span>
                <span className="igap-vis-name">{p(column.name)}</span>
                <span className="igap-vis-state">{p(word(see))}{note ? <small>{p(note)}</small> : null}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption>{p(caption)}</figcaption>
    </figure>
  );
};
