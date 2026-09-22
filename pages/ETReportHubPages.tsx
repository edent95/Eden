/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { productSiblingCards } from '../app/product-siblings';
import { HeaderControls } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { ProjectsEtReportCssIcon } from '../components/css-art/index';
import ProductStorePage from '../components/ProductStorePage';

const etReportHubBuyerPain = [
  {
    title: { en: 'Daily reporting takes too many hands', zh: '日报太依赖人工' },
    copy: {
      en: 'Every day someone downloads files, checks formulas, compares brands, and explains the same numbers again. The work repeats, but the system does not improve.',
      zh: '每天都有人下载文件、检查公式、对比品牌、解释同样的数字。工作一直重复，但系统没有变聪明。',
    },
  },
  {
    title: { en: 'Excel becomes the hidden risk', zh: 'Excel 变成隐藏风险' },
    copy: {
      en: 'One wrong paste, one missing filter, one duplicated customer total, and the team may make decisions from a broken report.',
      zh: '一次贴错、一个筛选漏掉、一个会员总数重复，团队就可能根据错误报表做判断。',
    },
  },
  {
    title: { en: 'CRM cannot move without clean data', zh: 'CRM 没有干净数据就跑不动' },
    copy: {
      en: 'Retention, segmentation, risk review, and follow-up actions need a trusted data layer before AI or CRM workflows can help.',
      zh: '留存、分群、风险复盘和跟进行动，都需要可信的数据层。没有这层，AI 或 CRM 只会放大混乱。',
    },
  },
] as const;

const etReportHubSalesOutcomes = [
  {
    label: { en: 'Decision speed', zh: '判断更快' },
    metric: { en: 'Same-day clarity', zh: '当天看清楚' },
    copy: {
      en: 'Operators can see performance, members, channels, trends, and brand comparison without rebuilding the report from scratch.',
      zh: '运营不需要从零重做报表，就能看 Performance、Members、Channels、Trends 和品牌对比。',
    },
  },
  {
    label: { en: 'Data trust', zh: '数据更可信' },
    metric: { en: 'One operating layer', zh: '一层事实来源' },
    copy: {
      en: 'Transaction and Customer files are imported under rules, normalized, reviewed, and kept ready for export.',
      zh: 'Transaction 与 Customer 文件按规则导入、标准化、复盘，并保持可导出状态。',
    },
  },
  {
    label: { en: 'CRM readiness', zh: '可接 CRM' },
    metric: { en: 'Next action ready', zh: '下一步可行动' },
    copy: {
      en: 'The system prepares member segments, retention signals, risk buckets, and exports for follow-up workflows.',
      zh: '系统准备会员分群、留存信号、风险区间和导出资料，让后续跟进有基础。',
    },
  },
] as const;

const etReportHubSalesDeliverables = [
  {
    title: { en: 'Data import system', zh: '数据导入系统' },
    copy: {
      en: 'Transaction and Customer Excel ingest with validation rules, import history, brand scope, and cleaner storage.',
      zh: 'Transaction 与 Customer Excel 导入，包含验证规则、导入历史、品牌范围和更干净的储存层。',
    },
  },
  {
    title: { en: 'Operator dashboard', zh: '运营仪表盘' },
    copy: {
      en: 'Performance, Members, Channels, Trends, Compare Brands, diagnostics, and export-friendly report views.',
      zh: 'Performance、Members、Channels、Trends、Compare Brands、诊断和可导出的报表视图。',
    },
  },
  {
    title: { en: 'CRM-ready export layer', zh: 'CRM-ready 导出层' },
    copy: {
      en: 'Member segments, activity buckets, retention signals, and export structures that can feed later CRM workflows.',
      zh: '会员分群、活跃区间、留存信号和可接后续 CRM 工作流的导出结构。',
    },
  },
  {
    title: { en: 'System guide and handover', zh: '系统说明与交接' },
    copy: {
      en: 'A practical guide explaining data flow, formulas, conversion rules, dashboard logic, and operating limits.',
      zh: '实用说明文件，解释数据流、公式、转换规则、dashboard 逻辑和系统边界。',
    },
  },
] as const;

const etReportHubSalesProofStats = [
  {
    value: { en: '2-4 hrs/day', zh: '2-4 小时/天' },
    label: {
      en: 'Typical manual Excel reporting time that can be compressed.',
      zh: '常见 Excel 整理时间可被压缩。',
    },
  },
  {
    value: { en: '1 upload', zh: '1 次上传' },
    label: {
      en: 'Refresh daily, weekly, member, channel, and trend reports.',
      zh: '自动更新日报、周报、会员、渠道与趋势。',
    },
  },
  {
    value: { en: 'Private deployment', zh: '私有部署' },
    label: {
      en: 'Customer data can stay in the customer environment.',
      zh: '客户数据可保存在自己的系统环境。',
    },
  },
] as const;

const etReportHubSavingsRows = [
  {
    problem: { en: 'Manual daily handling of Transaction and Customer Excel', zh: '每天手工整理 Transaction 和 Customer Excel' },
    solution: { en: 'Automatic normalization, deduplication, and daily/weekly/overall reporting', zh: '上传后自动标准化、去重、生成日报/周报/总报表' },
    improvement: { en: 'Save 2-4 hours/day and reduce human errors', zh: '省 2-4 小时/天，减少人为错算' },
  },
  {
    problem: { en: 'No clear list of registered members who have not deposited', zh: '不知道哪些会员注册了但还没存款' },
    solution: { en: 'Non-conversion member filter + CRM export', zh: 'Non-conversion member filter + CRM export' },
    improvement: { en: 'Give CRM a clear daily follow-up list', zh: '让 CRM 每天有明确跟进名单' },
  },
  {
    problem: { en: 'Bonus is given, but over-giving is hard to spot', zh: 'Bonus 给出去，但不知道有没有过量' },
    solution: { en: 'Track Bonus Total, Bonus Ratio, Margin, Win Loss, and withdrawal risk', zh: '看 Bonus Total、Bonus Ratio、Margin、Win Loss、提款风险' },
    improvement: { en: 'Reduce promotion budget leakage', zh: '减少促销预算浪费' },
  },
  {
    problem: { en: 'Channels are judged only by registration count', zh: '渠道只看注册数，不知道质量' },
    solution: { en: 'Channel Analysis shows deposit, withdrawal, net, bonus, and conversion', zh: 'Channel Analysis 看存款、提款、净存款、Bonus、转化率' },
    improvement: { en: 'Move budget toward higher-quality channels', zh: '把预算集中到有质量的渠道' },
  },
  {
    problem: { en: 'Management asks for numbers and the team re-pulls Excel', zh: '老板临时问数据，团队要重新拉 Excel' },
    solution: { en: 'Performance, Member, Trend, and Brand Comparison are in one dashboard', zh: 'Performance、Member、Trend、Brand Comparison 都在 Dashboard' },
    improvement: { en: 'Faster review and less report waiting time', zh: '管理层复盘更快，少等报表' },
  },
  {
    problem: { en: 'Browser cleanup or device changes can break reporting history', zh: '清浏览器或换电脑怕数据不见' },
    solution: { en: 'Server daily_report.db, backup download, restore, and audit log', zh: '服务器 daily_report.db、备份下载、恢复、audit log' },
    improvement: { en: 'Lower data loss and operation risk', zh: '降低数据丢失和操作风险' },
  },
] as const;

const etReportHubIncludedRows = [
  {
    module: 'Data Ingest',
    included: { en: 'Transaction Excel, Customer Excel, brand selection, and Customer snapshot date.', zh: 'Transaction Excel、Customer Excel、品牌选择、Customer 快照日期。' },
    angle: { en: 'You just upload the file and you’re done. No more rebuilding a whole Excel from scratch every morning.', zh: '每天就上传一下，完事。不用再从头拼一整份 Excel。' },
  },
  {
    module: 'Normalize & SQLite',
    included: { en: 'Deduplication, field normalization, Bank Detail JSON conversion, daily_report.db.', zh: '去重、标准化字段、Bank Detail JSON 转换、daily_report.db。' },
    angle: { en: 'All those messy Excel files turn into one database you can actually search whenever.', zh: '一堆乱七八糟的 Excel，变成一个想查就查的数据库。' },
  },
  {
    module: 'Performance Report',
    included: { en: 'Daily, Weekly, Overall, deposit, withdrawal, net deposit, and transaction details.', zh: 'Daily、Weekly、Overall、存款、提款、净存款、交易明细。' },
    angle: { en: 'Boss asks for the numbers? They’re already there. Nobody scrambles to pull a spreadsheet.', zh: '老板临时问业绩，打开就有，不用让人手忙脚乱重拉数据。' },
  },
  {
    module: 'Member Analysis',
    included: { en: 'Lifetime deposit, withdrawal, bonus, LTV, last login, last deposit, and risk level.', zh: '累计存款、提款、Bonus、LTV、最近登录、最近存款、风险等级。' },
    angle: { en: 'You can see where every member stands — who’s worth chasing and who to leave for now.', zh: '每个会员什么状态一目了然，谁该跟、谁先放着，清清楚楚。' },
  },
  {
    module: 'CRM Export',
    included: { en: 'Non-conversion members, filters, search, User ID, Name, and Phone export.', zh: 'Non-conversion member、筛选、搜索、User ID、Name、Phone 导出。' },
    angle: { en: 'Your CRM team gets a ready-made list every day instead of guessing who to call.', zh: 'CRM 每天有现成名单可以打，不用靠感觉乱找人。' },
  },
  {
    module: 'Bonus Control',
    included: { en: 'Bonus Total, Bonus Ratio, Margin, Win Loss, and withdrawal risk.', zh: 'Bonus Total、Bonus Ratio、Margin、Win Loss、提款风险。' },
    angle: { en: 'See at a glance if you’re handing out too much bonus — basically whether money’s leaking.', zh: '一眼看出 bonus 是不是发太多了，钱有没有白送出去。' },
  },
  {
    module: 'Channel Analysis',
    included: { en: 'Referrer / Channel conversion, deposit, withdrawal, bonus, and net result.', zh: 'Referrer / Channel 转化、存款、提款、Bonus、净结果。' },
    angle: { en: 'Stop judging channels by sign-up count. See which ones actually bring real money in.', zh: '别只看注册多少，看出哪个渠道是真带钱进来的。' },
  },
  {
    module: 'Trend Analysis',
    included: { en: 'Daily, weekly, monthly trends, active members, amount movement, and retention signals.', zh: '日/周/月趋势、活跃会员、金额走势、留存观察。' },
    angle: { en: 'You see where things are heading, not just today’s one-day number.', zh: '看的是走势往哪走，不是盯着今天这一天的数字瞎激动。' },
  },
  {
    module: 'Brand Comparison',
    included: { en: 'Multi-brand comparison, metric selection, and timeline trends.', zh: '多品牌对比、指标选择、时间线趋势。' },
    angle: { en: 'Running a few brands or sites? Line them up side by side and spot which one’s dragging.', zh: '手上有好几个品牌/站点的话，摆一起一比，就知道哪个在拖后腿。' },
  },
  {
    module: 'Segment Analysis',
    included: { en: 'Member segments, behavior buckets, deposit/login recency, and action groups.', zh: '会员分群、行为 bucket、存款 / 登录 recency 和可行动人群。' },
    angle: { en: 'Slices your members into groups you can actually act on — ops and CRM just grab and go.', zh: '把一堆会员拆成一组组能直接动手的人群，运营和 CRM 拿了就能用。' },
  },
  {
    module: 'Wide Excel Export',
    included: { en: 'Export familiar wide-format Excel reports for teams that still need spreadsheet handoff.', zh: '导出客户熟悉的宽表格式，方便继续用 Excel 交接。' },
    angle: { en: 'Team still loves Excel? Fine — it exports the wide format they know, minus the manual assembly.', zh: '团队还想用 Excel？照样导给你，只是不用再手工拼了。' },
  },
  {
    module: 'Database Backup',
    included: { en: 'Download/restore daily_report.db, pre-restore backup, and cache refresh.', zh: '下载 / 恢复 daily_report.db、恢复前备份和缓存刷新。' },
    angle: { en: 'Clear your browser or switch laptops — the data’s still there, nothing vanishes overnight.', zh: '清个浏览器、换台电脑，数据照样在，不会一夜回到解放前。' },
  },
  {
    module: 'User Permission',
    included: { en: 'Users, roles, permissions, upload/export/settings limits.', zh: '用户、角色、权限、上传 / 导出 / 设置限制。' },
    angle: { en: 'You decide who can look, edit, upload, or export. No free-for-all.', zh: '谁能看、谁能改、谁能导出，老板说了算，不怕乱。' },
  },
  {
    module: 'Audit Log',
    included: { en: 'Login, upload, restore, and user action records.', zh: '登录、上传、恢复和用户操作记录。' },
    angle: { en: 'Something breaks? Check the log — no more going around asking “did you touch this?”', zh: '出事了能翻记录查，不用一个个问「是不是你动的」。' },
  },
  {
    module: 'Private Deployment',
    included: { en: 'Customer server, Docker, domain, and license options.', zh: '客户自己的 server / Docker / domain / license 选项。' },
    angle: { en: 'Your data sits on your own machine — not parked in some public SaaS.', zh: '数据放你自己机器上，不用交给什么公开 SaaS 保管。' },
  },
  {
    module: 'Training & Handover',
    included: { en: 'English/Chinese guides, FAQ, and handover checklist.', zh: '中英文操作文档、FAQ 和 handover checklist。' },
    angle: { en: 'We don’t just hand it over and disappear — your team actually learns to run it daily.', zh: '交付完不是丢给你自己摸，是带到团队真的会每天用为止。' },
  },
] as const;

const etReportHubRoiCards = [
  { label: { en: 'Monthly labor cost saved', zh: '每月节省人工成本' }, value: 'RM1,625' },
  { label: { en: 'Monthly estimated impact', zh: '每月可改善金额' }, value: 'RM2,725' },
  { label: { en: 'One-time launch package', zh: '一次性上线套餐' }, value: 'RM4,890' },
  { label: { en: '3-month net impact estimate', zh: '3 个月净影响估算' }, value: 'RM3,285' },
  { label: { en: 'Estimated payback', zh: '估算回本时间' }, value: { en: 'About 1.8 months', zh: '约 1.8 个月' } },
] as const;

const etReportHubPricing = [
  {
    name: { en: 'Launch Package', zh: '上线套餐' },
    price: 'RM4,890',
    suffix: { en: ' one-time', zh: ' 一次性' },
    bestFor: {
      en: 'Best for teams that already have stable Transaction / Customer exports and want a working daily-report system deployed quickly.',
      zh: '适合已经有稳定 Transaction / Customer 导出、想尽快上线一套日报系统的团队。',
    },
    points: {
      en: ['Private deployment, basic training, and daily reporting workflow', 'Transaction and Customer Excel import, dashboard, CRM-ready export, and handover guide', 'Optional maintenance, upgrades, and support can be quoted separately'],
      zh: ['包含私有部署、基础培训和日常报表流程', '包含 Transaction / Customer Excel 导入、dashboard、CRM-ready 导出和交接说明', '后续维护、升级和 support 可另外报价'],
    },
  },
] as const;

const etReportHubSalesFaq = [
  {
    q: { en: 'Why buy this instead of keeping Excel?', zh: '为什么不继续用 Excel？' },
    a: {
      en: 'Excel is fine for checking one file. It becomes expensive when the team needs repeatable imports, member logic, brand comparison, CRM export, and daily decision history.',
      zh: 'Excel 适合看单个文件。但当团队需要重复导入、会员逻辑、品牌对比、CRM 导出和每日判断记录时，它的隐藏成本会越来越高。',
    },
  },
  {
    q: { en: 'What does RM4,890 include?', zh: 'RM4,890 包含什么？' },
    a: {
      en: 'It covers the launch package: practical deployment, basic training, daily reporting workflow, and handover. Ongoing support boundaries can be quoted separately based on data volume, hosting, and team process.',
      zh: '它包含上线套餐：实际部署、基础培训、日常报表流程和交接。持续 support 边界可根据数据量、hosting 和团队流程另外报价。',
    },
  },
  {
    q: { en: 'Who should not buy it yet?', zh: '什么团队暂时不适合买？' },
    a: {
      en: 'If reporting is still casual, data exports are inconsistent, or the team does not review daily numbers, start by fixing the reporting habit first.',
      zh: '如果报表还很随意、导出格式不稳定，或团队本身不看每日数字，应该先整理报表习惯，再上系统。',
    },
  },
] as const;

export const ETReportHubFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  salesHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, salesHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const demoUrl = 'https://edent95.github.io/daily-report-dashboard/demo/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsEtReportCssIcon label="ETReportHub CSS app icon" />}
      name="ETReportHub"
      kicker={{ en: 'Data analytics · Business tool', zh: '数据分析 · 商业工具' }}
      tagline={{ en: 'Turn daily Excel into clear operating decisions.', zh: '把每日 Excel 变成清楚的运营判断。' }}
      meta={{ en: 'Private deployment · Local SQLite · Excel in, decisions out', zh: '私有部署 · 本地 SQLite · Excel 进，判断出' }}
      primary={{ href: demoUrl, external: true, label: { en: 'View demo', zh: '查看 Demo' } }}
      secondary={{ href: salesHref, label: { en: 'Launch offer', zh: '上线方案' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: demoUrl,
        domain: 'edent95.github.io/daily-report-dashboard/demo',
        title: { en: 'Interactive ETReportHub demo', zh: 'ETReportHub 互动 Demo' },
        caption: { en: 'The public demo, running right here. Open it in a new tab for the full workspace.', zh: '公开 Demo 直接跑在这里。想看完整工作区，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'ETReportHub is a data system for operations teams that still depend on daily Excel exports. It turns separate transaction and member files into one repeatable review workflow—without rebuilding formulas, reconciling numbers, and assembling reports every morning.', zh: 'ETReportHub 是为每日依赖 Excel 的运营团队设计的数据系统。它把分散的交易与会员文件整理成统一、可重复检查的工作流，让团队不必每天重新复制公式、对数字和拼报表。' } },
        { kind: 'p', text: { en: 'The point is not another dashboard. It is knowing sooner what changed, which members need action, where a channel is losing efficiency, and what the team should handle first.', zh: '重点不是多一个 Dashboard。重点是让团队更快知道：业绩哪里变了、哪些会员需要行动、哪个渠道正在失去效率，以及今天应该先处理什么。' } },
        { kind: 'h', text: { en: 'How it works', zh: '每天怎么用' } },
        { kind: 'steps', items: [
          { title: { en: 'Upload', zh: '上传' }, text: { en: 'Drop in the daily Transaction file and the latest Customer export.', zh: '拖入每日 Transaction 与最新 Customer 文件。' } },
          { title: { en: 'Reconcile', zh: '整理' }, text: { en: 'The system checks fields, resolves members, and prevents double counting.', zh: '系统校验字段、匹配会员并避免重复计算。' } },
          { title: { en: 'Decide', zh: '判断' }, text: { en: 'Review performance, members, channels, and trends for the signals that matter.', zh: '从业绩、会员、渠道和趋势里找到异常与机会。' } },
          { title: { en: 'Act', zh: '行动' }, text: { en: 'Export the report or the CRM audience with a clear next action.', zh: '导出报表或 CRM 名单，让下一步有明确对象。' } },
        ] },
        { kind: 'h', text: { en: 'What it changes day to day', zh: '它每天改变了什么' } },
        { kind: 'p', text: { en: 'The daily work happens once. Upload the Transaction and Customer Excel, and the system cleans, reconciles, and refreshes the reports instead of asking someone to redo it by hand.', zh: '每天的活只做一遍。上传 Transaction 与 Customer Excel，系统自动整理、去重并更新报表，而不是让人再手工做一次。' } },
        { kind: 'p', text: { en: 'What changed comes first. Deposits, withdrawals, net deposit, active members, and channel movement live in one decision surface, so the morning starts with the difference rather than the data entry.', zh: '先看到哪里不对。存款、提款、净存款、活跃会员和渠道变化集中在同一个判断界面，早上从「差异」开始，而不是从「录入」开始。' } },
        { kind: 'callout', label: { en: 'From report to action', zh: '从报表到行动' }, text: { en: 'Filter members by risk, activity, deposit recency, and conversion status—then export that exact list as the next CRM action instead of describing it in a meeting.', zh: '用风险、活跃度、存款时间和转化状态筛选会员，再把这份名单直接导出成下一个 CRM 动作，而不是在会议上口头描述。' } },
        { kind: 'p', text: { en: 'The familiar handoff stays. Management can still receive the Excel they expect, while the operations team gets a clearer dashboard for the daily review. Nobody has to be retrained into a new ritual.', zh: '熟悉的交付方式保留下来。管理层仍然可以收到他们习惯的 Excel，运营团队同时拥有更清楚的 Dashboard。没有人需要被重新训练成另一套仪式。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Data boundary', zh: '数据边界' }, text: { en: 'ETReportHub uses local SQLite and is designed for private deployment. Operational data does not need to enter a public cloud just to become visible in a dashboard. Access, audit, and exports remain inside the team’s own operating boundary.', zh: 'ETReportHub 使用本地 SQLite 保存整理后的数据，并为私有部署设计。原始运营资料不需要为了看 Dashboard 而进入公共云端。权限、审计与导出仍然属于团队自己的工作边界。' } },
      ]}
      faq={[
        { q: { en: 'What files does it take?', zh: '它接受什么文件？' }, a: { en: 'The daily Transaction export and the latest Customer export, both as Excel. Those are the files most operations teams already produce, so nothing upstream has to change.', zh: '每日 Transaction 导出和最新 Customer 导出，都是 Excel。这些本来就是大多数运营团队已经在产出的文件，上游流程不用改。' } },
        { q: { en: 'Where is my data stored?', zh: '数据存在哪里？' }, a: { en: 'In a local SQLite database inside your own deployment. Raw operational data does not have to leave your environment to become visible in a dashboard.', zh: '存在你自己部署环境里的本地 SQLite 数据库。原始运营数据不需要离开你的环境，就能在 Dashboard 上看到。' } },
        { q: { en: 'Does it replace our Excel reports?', zh: '它会取代我们的 Excel 报表吗？' }, a: { en: 'Only if you want it to. Export back to Excel stays supported, so management keeps the format they know while the team reviews the dashboard.', zh: '除非你希望如此。导出回 Excel 仍然支持，管理层保留熟悉的格式，团队则看 Dashboard 做复盘。' } },
        { q: { en: 'What happens if a member appears in two files?', zh: '同一个会员出现在两份文件里怎么办？' }, a: { en: 'The reconcile step matches members and prevents double counting, which is the part that usually breaks a hand-built spreadsheet.', zh: '整理步骤会匹配会员并避免重复计算——这恰好是手工表格最容易出错的地方。' } },
        { q: { en: 'Can I try it before deploying?', zh: '可以先试再部署吗？' }, a: { en: 'Yes. The public demo above runs the real interface with sample data, so you can walk the workflow before any deployment conversation.', zh: '可以。上面的公开 Demo 用示例数据跑真实界面，你可以先走一遍流程，再谈部署。' } },
        { q: { en: 'How do I get it running for my team?', zh: '怎么让我的团队用上？' }, a: { en: 'The launch offer page covers scope, deployment, and what a rollout looks like in practice.', zh: '上线方案页面写了范围、部署方式，以及实际推行会是什么样子。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Business intelligence and operations analytics', zh: '商业智能与运营分析' }],
        [{ en: 'Input', zh: '输入格式' }, { en: 'Transaction / Customer Excel', zh: 'Transaction / Customer Excel' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Performance · Members · Channels · Trends · CRM export', zh: '业绩 · 会员 · 渠道 · 趋势 · CRM 导出' }],
        [{ en: 'Storage', zh: '存储' }, { en: 'Local SQLite', zh: '本地 SQLite' }],
        [{ en: 'Deployment', zh: '部署方式' }, { en: 'Private deployment with local database', zh: '私有部署，本地数据库' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'etreporthub')}
    />
  );
};

export const ETReportHubSalesPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  productHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, productHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const linkedinHref = 'https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/';

  return (
    <div className="page-shell etreport-page etreport-sales-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={productHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回 ETReportHub' : 'Back to ETReportHub'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-hero py-16 text-center md:py-24">
            <p className="etreport-kicker mx-auto">{isZh ? 'ETReportHub / Sales Page' : 'ETReportHub / Sales Page'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Stop paying people to rebuild the same report every day.' : 'Stop paying people to rebuild the same report every day.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? 'ETReportHub 是给 iGaming operator / aggregator 的日报数据系统。它把 Transaction、Customer、会员、渠道、趋势、品牌对比和 CRM export 变成一个可复盘的运营层。'
                : 'ETReportHub is a daily-report data system for iGaming operators and aggregators. It turns Transaction, Customer, members, channels, trends, brand comparison, and CRM export into one reviewable operating layer.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#pricing" className="etreport-text-cta">
                {isZh ? '看价格' : 'View pricing'} <span aria-hidden>›</span>
              </a>
              <a href="#why-buy" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '为什么要买' : 'Why buy it'} <span aria-hidden>›</span>
              </a>
              <a href="#roi" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '算 ROI' : 'ROI logic'} <span aria-hidden>›</span>
              </a>
            </div>
            <div className="etreport-sales-proof-grid mx-auto mt-10">
              {etReportHubSalesProofStats.map((item) => (
                <article key={item.value.en} className="etreport-sales-proof-card">
                  <strong>{item.value[language]}</strong>
                  <span>{item.label[language]}</span>
                </article>
              ))}
            </div>
          </header>

          <section className="etreport-sales-hero-panel">
            <div>
              <p className="etreport-kicker">{isZh ? 'Buyer problem' : 'Buyer problem'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '报表不是小事。它决定团队每天相信什么。' : 'Reporting is not a small task. It decides what the team believes every day.'}
              </h2>
            </div>
            <div className="etreport-sales-price-strip">
              <div>
                <p>{isZh ? '上线套餐' : 'Launch package'}</p>
                <strong>RM4,890</strong>
                <span>{isZh ? '一次性' : 'one-time'}</span>
              </div>
            </div>
          </section>

          <section id="why-buy" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Why clients buy' : 'Why clients buy'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '客户买的不是页面，是少出错、少拖延、少靠人记。' : 'Clients are not buying a page. They are buying fewer errors, less delay, and less memory work.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {etReportHubBuyerPain.map((item) => (
                <article key={item.title.en} className="etreport-value-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="roi" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'ROI logic' : 'ROI logic'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '现场算给客户看：RM4,890 是否划算？' : 'Show the customer if RM4,890 makes sense.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '下面是保守估算，不是保证收益。假设每天省 2.5 小时、人工成本 RM25/小时、每月 26 个工作日，再加上 Bonus 控制和 CRM 跟进价值。'
                  : 'This is a conservative estimate, not a guaranteed return. It assumes 2.5 reporting hours saved per day, RM25/hour labor cost, 26 working days, plus bonus control and CRM follow-up value.'}
              </p>
            </div>
            <div className="etreport-roi-grid mt-12">
              {etReportHubRoiCards.map((item) => (
                <article key={item.label.en} className="etreport-roi-card">
                  <p className="etreport-card-eyebrow">{item.label[language]}</p>
                  <strong>{typeof item.value === 'string' ? item.value : item.value[language]}</strong>
                </article>
              ))}
            </div>
            <p className="etreport-roi-note">
              {isZh
                ? '销售讲法：说白了，一天省 2-4 小时，CRM 跟得上、bonus 不乱发，RM4,890 不只是买一个页面——是把原本烂在 Excel 和拍脑袋决定里的钱，捞回来。'
                : 'Sales angle: real talk — save 2-4 hours a day, keep CRM on top of it, stop over-handing bonus, and RM4,890 is not just buying a page. It is clawing back money that was quietly leaking into Excel and guesswork.'}
            </p>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What changes after buying' : 'What changes after buying'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '从每天整理数据，变成每天判断动作。' : 'Move from arranging data every day to deciding actions every day.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {etReportHubSalesOutcomes.map((item) => (
                <article key={item.label.en} className="etreport-sales-outcome-card">
                  <p className="etreport-card-eyebrow">{item.label[language]}</p>
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.metric[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Savings map' : 'Savings map'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '把卖点讲成客户每天会遇到的问题。' : 'Frame the value around the customer’s daily operating pain.'}
              </h2>
            </div>
            <div className="etreport-sales-table mt-12">
              <table>
                <thead>
                  <tr>
                    <th>{isZh ? '客户现在的问题' : 'Current customer problem'}</th>
                    <th>{isZh ? '系统怎么解决' : 'How the system helps'}</th>
                    <th>{isZh ? '可节省 / 改善' : 'Savings / improvement'}</th>
                  </tr>
                </thead>
                <tbody>
                  {etReportHubSavingsRows.map((row) => (
                    <tr key={row.problem.en}>
                      <td>{row.problem[language]}</td>
                      <td>{row.solution[language]}</td>
                      <td>{row.improvement[language]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What you get' : 'What you get'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '一套把日报、会员和 CRM 前置数据接起来的系统。' : 'A system connecting daily reports, member data, and CRM-ready outputs.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {etReportHubSalesDeliverables.map((item) => (
                <article key={item.title.en} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Included stack' : 'Included stack'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '系统里面有什么？' : 'What is included?'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '把功能讲成一个完整 BO operating stack：从上传、清洗、报表、CRM 行动，到备份、权限和上线交付。'
                  : 'Position it as a complete BO operating stack: upload, cleaning, reporting, CRM action, backup, access control, and handover.'}
              </p>
            </div>
            <div className="etreport-sales-table mt-12">
              <table>
                <thead>
                  <tr>
                    <th>{isZh ? '模块' : 'Module'}</th>
                    <th>{isZh ? '包含内容' : 'Included'}</th>
                    <th>{isZh ? '销售讲法' : 'Sales angle'}</th>
                  </tr>
                </thead>
                <tbody>
                  {etReportHubIncludedRows.map((row) => (
                    <tr key={row.module}>
                      <td>{row.module}</td>
                      <td>{row.included[language]}</td>
                      <td>{row.angle[language]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="pricing" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Pricing' : 'Pricing'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '一个清楚的上线价格。先把系统跑起来。' : 'One clear launch price. Get the system running first.'}
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-5">
              {etReportHubPricing.map((plan) => (
                <article key={plan.name.en} className="etreport-pricing-card">
                  <p className="etreport-card-eyebrow">{plan.name[language]}</p>
                  <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <strong className="font-display text-5xl font-bold tracking-tight md:text-7xl">{plan.price}</strong>
                    <span className="pb-2 text-lg font-semibold text-stone-500">{plan.suffix[language]}</span>
                  </div>
                  <p className="mt-5 text-lg font-semibold leading-snug text-stone-800">{plan.bestFor[language]}</p>
                  <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-stone-700">
                    {plan.points[language].map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-eden-mint" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-faq-panel">
              <div>
                <p className="etreport-kicker">{isZh ? 'Before buying' : 'Before buying'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '适合买，也要买得清楚。' : 'Buy it only when the operating problem is real.'}
                </h2>
              </div>
              <div className="etreport-faq-list">
                {etReportHubSalesFaq.map((item) => (
                  <article key={item.q.en} className="etreport-faq-item">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.q[language]}</h3>
                    <p>{item.a[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="etreport-section pb-20 pt-10">
            <div className="etreport-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '如果日报已经影响收入判断，就不要继续靠手感。' : 'If daily reports affect revenue decisions, do not keep relying on feel.'}
              </h2>
              <p>
                {isZh
                  ? '适合已经有稳定 Transaction / Customer 导出、需要更清楚 KPI、会员、渠道和 CRM 前置数据的团队。先谈数据结构，再谈部署方式。'
                  : 'Best for teams with stable Transaction / Customer exports that need clearer KPI, member, channel, and CRM-ready data. Start with data structure, then decide deployment.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={linkedinHref} target="_blank" rel="noreferrer" className="etreport-text-cta">
                  {isZh ? '联系讨论' : 'Discuss on LinkedIn'} <span aria-hidden>›</span>
                </a>
                <a href={productHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '看产品页' : 'View product page'} <span aria-hidden>›</span>
                </a>
                <a href={projectsHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
                <a href={homeHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
