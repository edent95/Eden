/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// "How it works behind the scenes" sections for /dr-racing, /etreporthub and /life-os, in the
// system-story format (the Jiju page was first). Facts were read from each repo's origin/main on
// 2026-11-23 (DrRacingDashBoard, DailyReport, LifeOs) and personal-dashboard's job config; see the
// log entry for sources. Privacy: no customer, client, diary, health or money data — process facts,
// repo counts and fictional examples (marked as such) only.

import React from 'react';
import { Banknote, BookOpen, Bot, CalendarCheck, ClipboardCheck, Database, FileSpreadsheet, Fingerprint, Inbox, KeyRound, Laptop, Lock, Mail, MessageCircle, PenLine, Search, ShieldCheck, Smartphone, Store, Upload } from 'lucide-react';
import type { EpBlock, EpText } from '../ProductStorePage';
import {
  DrRacingBeliefAsk, DrRacingBeliefQuiet, DrRacingBeliefRecord, DrRacingBeliefUseful, DrRacingBeliefVerified, DrRacingStoryBanner,
  ETReportBeliefAnswer, ETReportBeliefCompute, ETReportBeliefLatest, ETReportBeliefLocal, ETReportBeliefStop, ETReportStoryBanner,
  LifeOsBeliefBarnum, LifeOsBeliefIndependent, LifeOsBeliefLocal, LifeOsBeliefNatal, LifeOsBeliefPropose, LifeOsStoryBanner,
} from '../css-art/system-story-art';
import { SsBeliefs, SsFlow, SsGlossary, SsHero, SsJourney, SsSchedule } from './SystemStory';

const t = (en: string, zh: string): EpText => ({ en, zh });
const heading = (id: string, isZh: boolean, text: EpText): EpBlock => ({ kind: 'node', node: <h2 id={id}>{isZh ? text.zh : text.en}</h2> });

/* ============================== DrRacing ============================== */

export const drRacingStoryBlocks = (isZh: boolean): EpBlock[] => [
  heading('how-it-runs', isZh, t('Behind the counter: how DrRacing runs', '门店之外：DrRacing 幕后怎么跑')),
  { kind: 'p', text: t('Work began on 30 June 2026 for a motorcycle shop with two branches. One loan sale passes through several people and several banks; the system’s job is to show, at a glance, whose hands it is in right now.', '2026 年 6 月 30 日开工，给一家有两间门店的摩托车行用。一单贷款卖车要经过好几个人、好几家银行；系统要做的，是让人一眼看出这一单现在卡在谁手上。') },
  { kind: 'node', node: <SsHero isZh={isZh} Art={DrRacingStoryBanner} label={t('Illustration: in the back office an admin sends one file to three banks — two reject, one approves; in the showroom a customer receives a motorcycle and its key.', '插画：后台的 Admin 把一份申请送去三家银行，两家拒、一家批；门店里，客户拿到摩托车和钥匙。')} caption={t('The file moves stop by stop behind the counter; the customer rides away out front.', '单子在幕后一站一站走，客户在门店把车骑走。')} /> },
  { kind: 'stats', items: [
    { value: 485, unit: t('commits', '次提交'), text: t('since 30 June 2026', '2026 年 6 月 30 日以来') },
    { value: 14, unit: t('steps', '步'), text: t('on the delivery checklist, split across 3 roles', '交车 checklist，分给 3 种角色') },
    { value: 69, unit: t('codes', '个代码'), text: t('bank rejection codes, each with a plain next step', '银行拒绝代码，每个都翻成一句下一步') },
  ] },
  { kind: 'node', node: <SsBeliefs isZh={isZh} title={t('Five rules the system is built on', '这套系统照这五条做')} items={[
    { Art: DrRacingBeliefQuiet, title: t('Quiet speed', '安静的快'), text: t('It feels fast because the information is already sorted — not because of effects.', '快，是因为资料已经排好，不是靠花哨效果。') },
    { Art: DrRacingBeliefUseful, title: t('Everything on screen earns its place', '画面上的东西都要有用'), text: t('Every card and icon answers a business question; if it can’t, it goes.', '每张卡、每个图标都要回答一个业务问题，答不了就拿掉。') },
    { Art: DrRacingBeliefRecord, title: t('Record it as it happens', '边发生边记录'), text: t('A follow-up is logged with one tap on a common phrase, not typed up later.', '跟进时点一下常用短语就记好，不用事后补打字。') },
    { Art: DrRacingBeliefAsk, title: t('Risky changes ask a person first', '危险的改动先问人'), text: t('Touching more than 10 files, deleting, keys or security rules stops and waits for approval.', '改超过 10 个文件、删文件、动密钥或安全规则，都要停下来等人批准。') },
    { Art: DrRacingBeliefVerified, title: t('Never call it checked if it wasn’t', '没验证过的不说成验证过'), text: t('Every change leaves a note saying exactly what was verified.', '每个改动都留一条记录，写清楚验证了什么。') },
  ]} /> },
  heading('how-it-runs-journey', isZh, t('What the customer sees, and what happens behind it', '客户看到的，和幕后发生的')),
  { kind: 'node', node: <SsJourney isZh={isZh} title={t('One sale, two sides', '一单生意，两条线')} youLabel={t('customer & sales', '客户与 Sales')} caption={t('Each step: what the customer or salesperson does, and in the shaded box what the system does at the same moment.', '每一步：客户或 Sales 做的事，加上灰底框里系统同时在做什么。')} steps={[
    { icon: <MessageCircle size={18} />, you: t('Tap WhatsApp on the website, or a link from Sales', '点网站上的 WhatsApp，或 Sales 发的短链接'), behind: t('Notes which channel the lead came from; one network can apply at most 5 times an hour.', '记下这条 lead 从哪个渠道来；同一个网络 1 小时最多申请 5 次。') },
    { icon: <PenLine size={18} />, you: t('Choose cash or loan, then fill in the form', '先选现金还是贷款，再填表'), behind: t('Shows only the matching form and saves it before files are uploaded.', '只显示对应的那份表，资料先存好再上传文件。') },
    { icon: <Inbox size={18} />, you: t('Sales completes the documents and hands over', 'Sales 补齐文件，交给 Admin'), behind: t('A fixed rule picks one admin, and the card appears on their home screen.', '按固定规则指定一位 Admin，他的首页出现这张卡。') },
    { icon: <Banknote size={18} />, you: t('The application goes to a bank', '申请送去银行'), behind: t('Reminds on the follow-up date; a rejection is saved as a code with a next step.', '到跟进日才提醒；被拒就记下拒绝代码和下一步。') },
    { icon: <ClipboardCheck size={18} />, you: t('Approved — preparing the bike', '批了 —— 开始备车'), behind: t('Opens a pending payment and the 14-step delivery checklist.', '自动开一笔待接受的账，打开 14 步交车 checklist。') },
    { icon: <KeyRound size={18} />, you: t('Collect the motorcycle', '交车，拿钥匙'), behind: t('Delivery can’t be marked until all 14 steps are done; who, when and where is recorded.', '14 步没做完不能标交车；谁、几点、在哪里标的都记下来。') },
  ]} /> },
  heading('how-it-runs-flow', isZh, t('How one sale moves', '一单怎么走')),
  { kind: 'node', node: <SsFlow isZh={isZh} title={t('From lead to settlement', '从 lead 到结算')} ariaLabel={t('Flowchart: a lead comes in; cash sales go straight to review. For a loan, missing documents go back to sales; the admin sends it to a bank; a rejection is recorded with its code and the next bank is tried; after approval the 14-step delivery checklist must be finished — whoever is next gets a push — then the bike is delivered and the sale settled.', '流程图：lead 进来；现金单直接审核。贷款单文件不齐就退回 Sales；Admin 送银行；被拒就记下代码、换下一家；批了之后 14 步交车 checklist 要做完，轮到谁就推送给谁；然后交车、结算。')} caption={t('Illustration with made-up cases. Old bank results are kept, never overwritten.', '示意，例子是虚构的。每一轮银行结果都保留，不会被覆盖。')} nodes={[
    { id: 'lead', kind: 'start', text: t('A lead comes in', 'Lead 进来') },
    { id: 'loan', kind: 'ask', text: t('Paying by loan?', '是贷款单吗？'), down: t('Yes', '是'), side: { id: 'cash', label: t('Cash', '现金'), text: t('Review, then straight to delivery', '审核后直接走交车') } },
    { id: 'docs', kind: 'ask', text: t('Are the documents complete?', '文件齐了吗？'), down: t('Yes', '齐'), side: { id: 'back', label: t('No', '不齐'), text: t('Back to sales to collect', '退回 Sales 补文件') } },
    { id: 'send', kind: 'step', text: t('The admin sends it to a bank', 'Admin 送银行') },
    { id: 'bank', kind: 'ask', text: t('Did the bank approve?', '银行批了吗？'), down: t('Yes', '批了'), side: { id: 'next', label: t('No', '拒了'), text: t('Save the code, try the next bank', '记下代码，换下一家') } },
    { id: 'check', kind: 'ask', text: t('All 14 checklist steps done?', '14 步都做完了吗？'), down: t('Yes', '做完'), side: { id: 'push', label: t('No', '没有'), text: t('Push to whoever is next', '推送给轮到的人') } },
    { id: 'deliver', kind: 'step', text: t('Deliver the motorcycle', '交车') },
    { id: 'settle', kind: 'end', text: t('Settle: deposit and cash must match', '结算：订金加现金要对得上') },
  ]} examples={[
    { title: t('Example 1 · a loan approved by the first bank', '例子 1 · 贷款单，第一家银行就批了'), path: ['lead', 'loan', 'docs', 'send', 'bank', 'check', 'deliver', 'settle'] },
    { title: t('Example 2 · the first bank says “income too low”', '例子 2 · 第一家银行说「收入不够」'), path: ['lead', 'loan', 'docs', 'send', 'bank', 'next'] },
    { title: t('Example 3 · a cash sale', '例子 3 · 现金单'), path: ['lead', 'loan', 'cash'] },
  ]} /> },
  heading('how-it-runs-schedule', isZh, t('What runs on its own', '自己在跑的事')),
  { kind: 'node', node: <SsSchedule isZh={isZh} title={t('A day of automatic jobs', '一天里自动跑的事')} note={t('Malaysia time', '马来西亚时间')} caption={t('As configured on 23 Nov 2026. Security rules only go live after a person approves.', '2026 年 11 月 23 日的真实配置。安全规则改动要人批准才上线。')} rows={[
    { at: '03:00', job: t('Back up the database, uploaded files and staff accounts; check they are complete', '备份数据库、上传文件、员工账号，并核对完整'), where: t('cloud, kept 14 days', '云端，保留 14 天') },
    { at: '03:00', job: t('Draft a blog post for the shop’s website', '给门店网站写博客草稿'), where: t('AI, no prices in the text', 'AI，正文不放价格') },
    { at: '04:00', job: t('A second pass checks the draft', '再复核一遍草稿'), where: t('AI', 'AI') },
    { at: '07:30', job: t('Publish the post as a reviewed change', '把文章作为一个改动提交上线'), where: t('auto-merge after checks', '检查通过后自动合并') },
    { at: '09:17', job: t('Read back the live security rules and compare with the code', '读回线上安全规则，和代码对比'), where: t('every day', '每天') },
  ]} last={{ at: t('Mon', '周一'), job: t('A weekly AI review of last week’s changes', '每周一次 AI 回看上周的改动'), where: t('findings filed as issues', '发现的问题开成 issue') }} /> },
  { kind: 'h', text: t('What still needs a person', '还要人来做的事') },
  { kind: 'steps', items: [
    { title: t('The bank', '银行'), text: t('Approval itself is the bank’s decision; the system only tracks it.', '批不批是银行的决定，系统只负责追踪。') },
    { title: t('The shop', '门店'), text: t('Contracts, ordering the bike, final checks; forcing a delivery needs a written reason.', '签合约、订车、最后核对；强制交车必须写原因。') },
    { title: t('The owner', '老板'), text: t('Prices, commission and permissions, and any rule that goes live.', '价格、佣金、权限，以及任何要上线的规则。') },
  ] },
  { kind: 'node', node: <SsGlossary isZh={isZh} terms={[
    { icon: <MessageCircle size={18} />, term: t('Lead', 'Lead'), text: t('Someone interested who hasn’t ordered yet.', '还没下单的潜在客户。') },
    { icon: <Banknote size={18} />, term: t('Rejection code', '拒绝代码'), text: t('The bank’s reason for saying no, turned into a next step.', '银行拒绝的原因编号，系统翻成一句下一步。') },
    { icon: <Fingerprint size={18} />, term: t('Bank round', '银行轮次'), text: t('Each time a file goes to a bank; old results stay.', '每送一次银行算一轮，旧结果都留着。') },
    { icon: <Inbox size={18} />, term: t('Task inbox', 'Task Inbox'), text: t('Today’s to-do list for each person, in time order.', '每个人今天该做的事，按时间排。') },
    { icon: <ClipboardCheck size={18} />, term: t('Delivery checklist', '交车 checklist'), text: t('The 14 steps each role finishes before a bike leaves.', '车交出去之前，各角色要完成的 14 步。') },
    { icon: <ShieldCheck size={18} />, term: t('Security rules', '安全规则'), text: t('Rules on the server deciding who may read or change what.', '放在服务器上、决定谁能看谁能改的规定。') },
    { icon: <Bot size={18} />, term: t('Auto-merge', '自动合并'), text: t('A change that passes every automatic check goes live by itself.', '改动通过所有自动检查，就自己上线。') },
  ]} /> },
];

/* ============================== ETReportHub ============================== */

export const etReportStoryBlocks = (isZh: boolean): EpBlock[] => [
  heading('how-it-runs', isZh, t('Behind the dashboard: from two spreadsheets to a report', '报表背后：两份 Excel 怎么变成报表')),
  { kind: 'p', text: t('Work began on 19 May 2026 to replace keeping data and building reports by hand in Excel. Today it ships as a private install, plus a public demo.', '2026 年 5 月 19 日开工，要取代人手用 Excel 存数据、做报表。现在以私有部署交付，另有一个公开 Demo。') },
  { kind: 'node', node: <SsHero isZh={isZh} Art={ETReportStoryBanner} label={t('Illustration: a person drops two spreadsheets into a funnel that checks them and stores them; on the right a screen shows bars growing and one big number.', '插画：一个人把两份表格丢进漏斗，检查后存进资料库；右边的屏幕上柱子长出来，最高那根亮起。')} caption={t('Two spreadsheets go in each morning; a report a manager can read comes out.', '每天早上丢进两份 Excel，出来一份老板看得懂的报表。')} /> },
  { kind: 'stats', items: [
    { value: 206, unit: t('commits', '次提交'), text: t('19 May – 20 Nov 2026', '2026 年 5 月 19 日到 11 月 20 日') },
    { value: 70, unit: t('tests', '项测试'), text: t('run automatically on every change', '每个改动都自动跑') },
    { value: 8, unit: t('roles', '种角色'), text: t('from admin to read-only viewer', '从 Admin 到只读的 Viewer') },
  ] },
  { kind: 'node', node: <SsBeliefs isZh={isZh} title={t('Five rules the numbers follow', '数字照这五条算')} items={[
    { Art: ETReportBeliefAnswer, title: t('Answer first', '先给答案'), text: t('Every page opens with one sentence of conclusion, then the number behind it.', '每一页先写一句结论，再给撑住它的那个数字。') },
    { Art: ETReportBeliefCompute, title: t('We calculate it ourselves', '数字自己算'), text: t('Net cash is deposits minus withdrawals, computed here — never copied from the spreadsheet.', '净现金流一律按存款减提款自己算，不抄 Excel 里现成的。') },
    { Art: ETReportBeliefLatest, title: t('Only the latest member file counts', '会员数字只看最新一份'), text: t('The member file is a running total, so a new upload replaces the old one — never added on top.', '会员文件是累计总数，新上传整份覆盖，绝不叠加。') },
    { Art: ETReportBeliefStop, title: t('Stop errors at the door', '出错先拦下'), text: t('A file missing a required column is refused before anything is written.', '缺必需栏位的文件，在写入任何数据之前就整批拒绝。') },
    { Art: ETReportBeliefLocal, title: t('Data stays home', '数据不出门'), text: t('The licence check only asks “is this licensed?”; the database stays on the client’s machine.', '授权检查只问「有没有授权」，资料库留在客户自己的机器上。') },
  ]} /> },
  heading('how-it-runs-journey', isZh, t('What the operator sees, and what happens behind it', '操作的人看到的，和幕后发生的')),
  { kind: 'node', node: <SsJourney isZh={isZh} title={t('One working morning, two sides', '一个上班早上，两条线')} youLabel={t('operator', '操作的人')} caption={t('Each step: what the operator does, and in the shaded box what the system does at the same moment.', '每一步：操作的人做的事，加上灰底框里系统同时在做什么。')} steps={[
    { icon: <Lock size={18} />, you: t('Log in', '登录'), behind: t('A session lasts at most 12 hours and ends after 60 idle minutes.', '会话最长 12 小时，闲置 60 分钟自动失效。') },
    { icon: <CalendarCheck size={18} />, you: t('Pick the brand and the date', '选品牌和日期'), behind: t('Dates follow the GMT+8 business day.', '日期按 GMT+8 的营业日算。') },
    { icon: <Upload size={18} />, you: t('Upload the two spreadsheets', '上传两份 Excel'), behind: t('Checks the columns first, then makes every withdrawal a positive number.', '先检查栏位，再把提款统一成正数。') },
    { icon: <Search size={18} />, you: t('Wait a few seconds', '等几秒'), behind: t('Matches each transaction to a member by username + phone, then by phone alone.', '先用「用户名 + 手机」把交易对到会员，对不上再只用手机。') },
    { icon: <FileSpreadsheet size={18} />, you: t('Read the performance page', '看业绩页'), behind: t('No transactions yet today? It opens the latest day with data, and compares with last period and target.', '今天还没交易，就打开最近一个有数据的日子，并比较上期和目标。') },
    { icon: <Database size={18} />, you: t('Export a list or a wide Excel', '导出名单或宽表 Excel'), behind: t('Every query stays inside the current brand; sensitive actions go into an append-only log.', '每次查询只在当前品牌内；敏感操作写进只能追加的记录。') },
  ]} /> },
  heading('how-it-runs-flow', isZh, t('How one upload is checked', '一次上传怎么检查')),
  { kind: 'node', node: <SsFlow isZh={isZh} title={t('From spreadsheet to report', '从 Excel 到报表')} ariaLabel={t('Flowchart: upload the files. If a required column is missing the whole batch is refused and nothing is written. Withdrawal signs are made consistent; transactions are de-duplicated so the same one never counts twice. A transaction that matches no member is listed for review but still counted as unknown. Bank details that cannot be read are logged without stopping the batch. Then the report is rebuilt and the upload is recorded.', '流程图：上传文件。缺必需栏位就整批拒绝、不写入。提款符号统一；交易去重，同一笔只算一次。对不上会员的交易列进清单等人看，但照样计入「未知」。读不懂的银行资料记下来，不中断整批。然后重建报表、写一笔上传记录。')} caption={t('Illustration with demo cases. Re-uploading the same file adds nothing — a test checks exactly that.', '示意，例子是 Demo 情境。同一份文件重复上传不会多算 —— 有测试专门检查这一点。')} nodes={[
    { id: 'up', kind: 'start', text: t('Upload the two files', '上传两份文件') },
    { id: 'cols', kind: 'ask', text: t('Are all required columns there?', '必需的栏位都在吗？'), down: t('Yes', '都在'), side: { id: 'refuse', label: t('No', '缺了'), text: t('Refuse the batch, write nothing', '整批拒绝，什么都不写') } },
    { id: 'sign', kind: 'step', text: t('Make withdrawal signs consistent', '统一提款的正负号') },
    { id: 'dedupe', kind: 'step', text: t('De-duplicate: each transaction counts once', '去重：同一笔只算一次') },
    { id: 'match', kind: 'ask', text: t('Does each transaction match a member?', '每笔交易都对得到会员吗？'), down: t('Yes', '对得到'), side: { id: 'unmatched', label: t('No', '对不到'), text: t('List it for review, count as unknown', '列进清单等人看，计入「未知」') } },
    { id: 'bank', kind: 'ask', text: t('Can the bank details be read?', '银行资料读得懂吗？'), down: t('Yes', '读得懂'), side: { id: 'bankerr', label: t('No', '读不懂'), text: t('Log it, keep going', '记下来，不中断') } },
    { id: 'rebuild', kind: 'step', text: t('Rebuild the report and record the upload', '重建报表，写一笔上传记录') },
    { id: 'report', kind: 'end', text: t('Report and exports are ready', '报表和导出就绪') },
  ]} examples={[
    { title: t('Example 1 · both files are fine', '例子 1 · 两份文件都正常'), path: ['up', 'cols', 'sign', 'dedupe', 'match', 'bank', 'rebuild', 'report'] },
    { title: t('Example 2 · the member file is missing a column', '例子 2 · 会员文件少了一栏'), path: ['up', 'cols', 'refuse'] },
    { title: t('Example 3 · one transaction has no matching member', '例子 3 · 有一笔交易找不到会员'), path: ['up', 'cols', 'sign', 'dedupe', 'match', 'unmatched'] },
  ]} /> },
  heading('how-it-runs-schedule', isZh, t('What runs on its own', '自己在跑的事')),
  { kind: 'node', node: <SsSchedule isZh={isZh} title={t('A night on a private install', '私有部署的一晚')} note={t('GMT+8', 'GMT+8')} caption={t('Backup times come from the schedule templates shipped with the install; each client decides which to switch on.', '备份时间来自随安装附上的排程范本，每个客户自己决定开哪几个。')} rows={[
    { at: '02:30', job: t('Back up the database on the machine', '在本机备份资料库'), where: t('keeps the last 30', '保留最近 30 份') },
    { at: '03:10', job: t('Copy a backup to the cloud', '把备份复制到云端'), where: t('optional', '可选') },
    { at: '03:30', job: t('Sync to a second location', '同步到第二个地方'), where: t('optional', '可选') },
  ]} last={{ at: t('AM', '早上'), job: t('Upload today’s two spreadsheets', '上传今天的两份 Excel'), where: t('the operator', '操作的人') }} /> },
  { kind: 'h', text: t('What still needs a person', '还要人来做的事') },
  { kind: 'steps', items: [
    { title: t('Every day', '每天'), text: t('Export the two spreadsheets from the back office and upload them; confirm the member file’s date.', '从后台导出两份 Excel 上传；确认会员文件是截至哪一天。') },
    { title: t('Review lists', '看清单'), text: t('Unmatched transactions, unreadable bank details and sign warnings wait for a person.', '未配对交易、读不懂的银行资料、正负号警告，都等人看。') },
    { title: t('Housekeeping', '管理'), text: t('Sorting unknown referral codes into channels, accounts and permissions, and rehearsing a restore.', '把未知推荐码归到渠道、管账号权限、定期演练备份还原。') },
  ] },
  { kind: 'node', node: <SsGlossary isZh={isZh} terms={[
    { icon: <Laptop size={18} />, term: t('Back office', '后台'), text: t('The operator’s existing admin site, where the daily spreadsheets come from.', '运营方原本的管理后台，每天的 Excel 从这里导出。') },
    { icon: <FileSpreadsheet size={18} />, term: t('Transaction file', '交易文件'), text: t('Every deposit and withdrawal, one per row.', '一笔一笔的存款和提款记录。') },
    { icon: <Database size={18} />, term: t('Member file', '会员文件'), text: t('Each member’s running totals up to today.', '每位会员到今天为止的累计总数。') },
    { icon: <CalendarCheck size={18} />, term: t('Snapshot date', '快照日期'), text: t('The day the member totals are “as of”.', '这份会员总数「截至哪一天」。') },
    { icon: <ShieldCheck size={18} />, term: t('De-duplication', '去重'), text: t('The same transaction is counted once, even if uploaded twice.', '同一笔交易只算一次，重复上传也不会多算。') },
    { icon: <Banknote size={18} />, term: t('Net cash', '净现金流'), text: t('Deposits minus withdrawals — the money that stayed.', '存款减提款，就是留下来的钱。') },
    { icon: <Search size={18} />, term: t('Unmatched transaction', '未配对交易'), text: t('A transaction with no matching member, listed separately for a person.', '找不到对应会员的交易，单独列出来等人看。') },
  ]} /> },
];

/* ============================== LifeOs ============================== */

export const lifeOsStoryBlocks = (isZh: boolean): EpBlock[] => [
  heading('how-it-runs', isZh, t('Behind the book: how one line becomes self-knowledge', '说明书背后：写下的一件事怎么变成对自己的认识')),
  { kind: 'p', text: t('Work began on 10 July 2026. The idea: treat the old systems as a very large dataset, and test them like an experiment — against your own records and predictions that are locked before they come true.', '2026 年 7 月 10 日开工。想法是：把命理当成千年累积的大数据，像做实验一样检验它 —— 拿你自己的记录，以及事先锁定、事后回标的预测来对。') },
  { kind: 'node', node: <SsHero isZh={isZh} Art={LifeOsStoryBanner} label={t('Illustration: at night a page flies into a small machine at home whose heartbeat line keeps running, next to a padlock; by day a person opens a letter.', '插画：夜里，一页纸飞进家里一台小机器，屏幕上的心跳线一直在跑，旁边一把锁；白天，一个人拆开一封信。')} caption={t('What you write is sorted on a machine at home; at month’s end it comes back as a letter to you.', '写下的事在自己家里的机器上整理，月底变成一封给你的信。')} /> },
  { kind: 'stats', items: [
    { value: 695, unit: t('commits', '次提交'), text: t('since 10 July 2026', '2026 年 7 月 10 日以来') },
    { value: 182, unit: t('test files', '个测试文件'), text: t('that check the rules automatically', '自动检查规则') },
    { value: 177, unit: t('change notes', '条改动记录'), text: t('one per change since 28 Sep', '9 月 28 日起每个改动一条') },
  ] },
  { kind: 'node', node: <SsBeliefs isZh={isZh} title={t('Five rules the reading follows', '解读照这五条做')} items={[
    { Art: LifeOsBeliefNatal, title: t('A question never rewrites who you are', '问事不改写本命'), text: t('A draw or a reading answers that one question only — it never becomes “your personality”.', '一次抽牌或起卦只对那一个问题有效，不会变成「你的性格」。') },
    { Art: LifeOsBeliefIndependent, title: t('Agreement counts only if independent', '证据独立才算数'), text: t('Two systems built from the same input agreeing is one piece of evidence, not two.', '用同一份输入算出来的两个系统说法一致，只算一份证据。') },
    { Art: LifeOsBeliefBarnum, title: t('Could the opposite be true?', '反面成立吗？'), text: t('Before writing a judgement, ask whether its opposite fits some people; if not, it says nothing — cut it.', '写判断前先问：它的反面对某些人成立吗？对谁都不成立，就是废话，删掉。') },
    { Art: LifeOsBeliefLocal, title: t('Private words stay on your machine', '私密原文留在自己的机器'), text: t('Daily notes are sorted by a model at home; the text stays in memory, never on disk or with a third party.', '每日记录交给家里的本机模型归类，原文只在内存里，不落盘、不交第三方。') },
    { Art: LifeOsBeliefPropose, title: t('The AI suggests, you decide', 'AI 只提议，人来决定'), text: t('Labels are only candidates; your correction wins, and after 48 hours silence counts as yes.', '标签只是候选，你的更正优先；48 小时没更正才默认接受。') },
  ]} /> },
  heading('how-it-runs-journey', isZh, t('What you do, and what happens behind it', '你做的，和幕后发生的')),
  { kind: 'node', node: <SsJourney isZh={isZh} title={t('One month, two sides', '一个月，两条线')} youLabel={t('you', '你')} caption={t('Each step: what you do, and in the shaded box what the system does at the same moment.', '每一步：你做的事，加上灰底框里系统同时在做什么。')} steps={[
    { icon: <Fingerprint size={18} />, you: t('Sign in and enter your birth details', '登录，填出生资料'), behind: t('Eight engines each calculate once, then lock — every conclusion carries its source.', '八个引擎各算一次后锁定，每个结论都带出处。') },
    { icon: <ClipboardCheck size={18} />, you: t('Answer a short first questionnaire', '答一份必答问卷'), behind: t('What each option means was decided in advance — not judged by an AI.', '每个选项代表什么是事先标好的，不交给 AI 判断。') },
    { icon: <PenLine size={18} />, you: t('Write one thing that happened today', '在首页写「今天的一件事」'), behind: t('Every 2 minutes a small model at home tags it; a larger one checks if it relates to your key abilities.', '家里的小模型每 2 分钟给它贴标签；大模型再判断它跟你的关键能力有没有关系。') },
    { icon: <BookOpen size={18} />, you: t('Open your book', '打开说明书'), behind: t('A cloud model writes the plain reading, at most once a day per question; identical input reuses the old result.', '云端模型写白话解读，每道题每天最多一次；资料完全一样就沿用旧结果。') },
    { icon: <Mail size={18} />, you: t('Get “this month’s you”', '月底收到「这个月的你」'), behind: t('Built only from what really happened — the chart is not used.', '只看现实记录，不看命盘。') },
    { icon: <Smartphone size={18} />, you: t('Mark whether a prediction came true', '事后回来标「对 / 部分对 / 错」'), behind: t('Checks the lock fingerprint first; an edited prediction is void; wrong answers are kept as they are.', '先核对提问时的锁定指纹，被改过的作废；答错的照样保留。') },
  ]} /> },
  heading('how-it-runs-flow', isZh, t('How one note is handled', '一条记录怎么处理')),
  { kind: 'node', node: <SsFlow isZh={isZh} title={t('From a note to the monthly letter', '从一条记录到每月来信')} ariaLabel={t('Flowchart: you write one thing; it is saved to your account. If the home machine is offline it waits in a queue. A small model tags it; a larger model decides whether it relates to a key ability — if not, it only counts in the statistics. If you correct it within 48 hours your version wins, otherwise it is accepted. Then the monthly review updates your levels and writes the letter.', '流程图：你写下一件事，存进你的账号。家里的机器不在线就排队等。小模型贴标签；大模型判断跟关键能力有没有关系，没关系就只进统计。48 小时内你更正了就以你为准，否则默认接受。然后月度回顾更新等级、写信。')} caption={t('Illustration with made-up notes.', '示意，例子是虚构的。')} nodes={[
    { id: 'write', kind: 'start', text: t('You write one thing', '你写下一件事') },
    { id: 'online', kind: 'ask', text: t('Is the home machine online?', '家里的机器在线吗？'), down: t('Yes', '在线'), side: { id: 'queue', label: t('No', '不在'), text: t('Waits in a queue', '排队，上线后补做') } },
    { id: 'tag', kind: 'step', text: t('A small model tags it', '小模型贴标签') },
    { id: 'ability', kind: 'ask', text: t('Does it relate to a key ability?', '跟你的关键能力有关吗？'), down: t('Yes', '有关'), side: { id: 'stats', label: t('No', '无关'), text: t('Counts in the statistics only', '只进统计') } },
    { id: 'correct', kind: 'ask', text: t('No correction from you in 48 hours?', '48 小时内你没更正？'), down: t('Right', '没更正'), side: { id: 'yours', label: t('You did', '更正了'), text: t('Your version wins', '以你的版本为准') } },
    { id: 'review', kind: 'step', text: t('The monthly review updates your levels', '月度回顾更新成熟度') },
    { id: 'letter', kind: 'end', text: t('Your book and monthly letter', '说明书和每月来信') },
  ]} examples={[
    { title: t('Example 1 · “I said no to overtime today”', '例子 1 ·「今天主动开口拒绝了加班」'), path: ['write', 'online', 'tag', 'ability', 'correct', 'review', 'letter'] },
    { title: t('Example 2 · “Nice weather today”', '例子 2 ·「天气很好」'), path: ['write', 'online', 'tag', 'ability', 'stats'] },
    { title: t('Example 3 · tagged “draining”, you change it to “energising”', '例子 3 · 被标成「耗电」，你改成「充电」'), path: ['write', 'online', 'tag', 'ability', 'correct', 'yours'] },
  ]} /> },
  heading('how-it-runs-schedule', isZh, t('What runs on its own', '自己在跑的事')),
  { kind: 'node', node: <SsSchedule isZh={isZh} title={t('The rhythm of the machines', '机器的节奏')} note={t('as configured on 23 Nov 2026', '2026 年 11 月 23 日的配置')} caption={t('The heavy model only works while you sleep and the computer is idle; nothing private is sent out for these jobs.', '大模型只在睡觉时段、电脑没人用时干活；这些任务都不把私密原文送出去。')} rows={[
    { at: t('2 min', '每 2 分'), job: t('Tag new notes', '给新记录贴标签'), where: t('small model on the always-on home machine', '家里 24 小时开着的机器，小模型') },
    { at: t('10 min', '每 10 分'), job: t('Heartbeat: “I’m still alive”', '心跳：「我还活着」'), where: t('a dropout shows at once', '掉线马上看得出来') },
    { at: t('30 min', '每 30 分'), job: t('Look for new diary pages, analyse only if there are any', '看有没有新日记，有才分析'), where: t('main computer, night only', '主控机，只在夜里') },
    { at: t('1 h', '每小时'), job: t('Sync and snapshot', '同步与快照'), where: t('main computer', '主控机') },
  ]} last={{ at: t('Month', '月底'), job: t('Write “this month’s you”', '写「这个月的你」'), where: t('from real records only', '只看现实记录') }} /> },
  { kind: 'h', text: t('What still needs a person', '还要人来做的事') },
  { kind: 'steps', items: [
    { title: t('Confirm', '确认'), text: t('Accept or correct the events and labels the AI suggests.', '确认或更正 AI 提议的事件和标签。') },
    { title: t('Judge', '回标'), text: t('Come back and mark whether a prediction came true.', '事后回来标预测对不对。') },
    { title: t('Guard', '把关'), text: t('Large deletions stop for a look, and sending raw text to a cloud agent is off unless you are told first.', '一次删太多会停下来等人看；把原文交给云端 agent 默认关闭，开之前先告诉你。') },
  ] },
  { kind: 'node', node: <SsGlossary isZh={isZh} terms={[
    { icon: <Lock size={18} />, term: t('Natal layer', '本命层'), text: t('The long-term structure from birth details, calculated once and locked.', '只用出生资料算出来的长期结构，算一次就锁定。') },
    { icon: <Search size={18} />, term: t('Question layer', '问事层'), text: t('A reading for one question at one moment, finished when it is answered.', '针对一个问题、在那一刻起的一局，用完就结束。') },
    { icon: <ClipboardCheck size={18} />, term: t('Calibration layer', '校准层'), text: t('Checks predictions against real life — never rewrites the originals.', '用现实检验预测，只检验，不改写原始结果。') },
    { icon: <Fingerprint size={18} />, term: t('Prediction lock', '预测锁定'), text: t('A fingerprint taken when you submit, so any later edit shows.', '提交那一刻打的指纹，之后谁改过都看得出来。') },
    { icon: <ShieldCheck size={18} />, term: t('Independent evidence', '证据独立'), text: t('Two systems sharing an input agreeing is not two confirmations.', '用同一份输入的两个系统说法一致，不算互相印证。') },
    { icon: <Laptop size={18} />, term: t('Local model', '本机模型'), text: t('An AI running on your own computer; your data does not leave.', '跑在自己电脑上的 AI，资料不用送去外面的公司。') },
    { icon: <Store size={18} />, term: t('Heartbeat', '心跳'), text: t('A background job saying “still alive” every 10 minutes.', '后台程序每 10 分钟报一声「还活着」。') },
  ]} /> },
];
