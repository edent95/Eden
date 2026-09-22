import React from 'react';
import ProductStorePage from '../components/ProductStorePage';
import { ProjectsDrRacingCssIcon, ProjectsEtReportCssIcon, ProjectsJijuCssIcon, ProjectsLifeOsCssIcon, ProjectsPokerCssIcon } from '../components/css-art/index';
import { HeaderControls, type Language, type Theme, type ThemePreference } from '../app/shared';
import { productSiblingCards } from '../app/product-siblings';
import { ArrowLeft, Download } from 'lucide-react';

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

export const DrRacingFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const demoUrl = 'https://edent95.github.io/dr-racing-dashboard-demo/demo/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsDrRacingCssIcon label="Dr Racing CSS app icon" />}
      name="Dr Racing"
      kicker={{ en: 'Loan operations · Dealership tool', zh: '贷款运营 · 车行工具' }}
      tagline={{ en: 'Run the whole motorcycle-loan pipeline in one dashboard.', zh: '把摩托车贷款流程放进同一个仪表台。' }}
      meta={{ en: 'Firebase deployment · Role-based access · Leads in, delivered bikes out', zh: 'Firebase 部署 · 角色权限 · Leads 进，交车出' }}
      primary={{ href: demoUrl, external: true, label: { en: 'View demo', zh: '查看 Demo' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: demoUrl,
        domain: 'edent95.github.io/dr-racing-dashboard-demo/demo',
        title: { en: 'Interactive Dr Racing demo', zh: 'Dr Racing 互动 Demo' },
        caption: { en: 'The public demo, running right here on fixed anonymized sample data. Open it in a new tab for the full dashboard.', zh: '公开 Demo 直接跑在这里，使用固定匿名示例数据。想看完整仪表台，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Dr Racing is the operating system of a motorcycle dealership that sells on financing. A sale is not one event but a pipeline: a lead comes in from TikTok or a walk-in, becomes a loan application, goes through document checks, is submitted to banks round after round, and only counts when the bike is delivered and the disbursement lands.', zh: 'Dr Racing 是一家靠贷款卖车的摩托车行的运营系统。一单生意不是一个动作，而是一条流水线：lead 从 TikTok 或 walk-in 进来，变成贷款申请，过文件检查，一轮一轮送银行，直到交车、银行放款才算数。' } },
        { kind: 'p', text: { en: 'Before this system, that pipeline lived in WhatsApp chats, paper files, and each salesperson\u2019s memory. Dr Racing puts every application, bank round, reject code, and follow-up in one place, so the shop always knows who is waiting on whom.', zh: '在这个系统之前，这条流水线活在 WhatsApp 对话、纸质文件和每个 sales 的记忆里。Dr Racing 把每一份申请、每一轮银行、每个 reject code 和跟进都放在同一个地方，车行随时知道现在卡在谁手上。' } },
        { kind: 'h', text: { en: 'How a deal moves', zh: '一单生意怎么走' } },
        { kind: 'steps', items: [
          { title: { en: 'Lead', zh: 'Lead' }, text: { en: 'Raw leads land from TikTok, Facebook, Instagram, Google, and walk-ins. Sales claim and follow up.', zh: 'TikTok、Facebook、Instagram、Google 和 walk-in 的 raw leads 进来，sales 认领并跟进。' } },
          { title: { en: 'Apply', zh: '申请' }, text: { en: 'A lead becomes a loan application with IC, payslips, and the exact bike and installment plan.', zh: 'Lead 变成贷款申请：IC、payslip、指定车型和分期方案。' } },
          { title: { en: 'Bank rounds', zh: '银行轮次' }, text: { en: 'Admin submits to banks. Approvals, rejects, and reject codes are tracked round by round.', zh: 'Admin 送银行。批准、拒绝和 reject code 按轮次记录，被拒可以换银行再送。' } },
          { title: { en: 'Deliver', zh: '交车' }, text: { en: 'Approved deals move to delivery, disbursement, and commission settlement.', zh: '批准的单子走向交车、放款与佣金结算。' } },
        ] },
        { kind: 'h', text: { en: 'What it changes day to day', zh: '它每天改变了什么' } },
        { kind: 'p', text: { en: 'The Task Inbox opens the morning. Instead of scrolling chats, every role sees what waits on them: applications to review, documents to chase, banks to follow up, approved customers to call.', zh: '早上从 Task Inbox 开始。不用翻聊天记录，每个角色都直接看到等着自己的事：要审的申请、要追的文件、要跟的银行、要联系的已批客户。' } },
        { kind: 'p', text: { en: 'Reject codes become knowledge. Every bank rejection is coded and translated into a plain next step, so a young salesperson handles a rejection the way the most experienced one would.', zh: 'Reject code 变成车行的知识。每个银行拒绝都有编码，并翻译成一句普通人能懂的下一步，新 sales 也能像老手一样处理被拒。' } },
        { kind: 'callout', label: { en: 'From marketing to commission', zh: '从营销到佣金' }, text: { en: 'The same system tracks WhatsApp link clicks by channel, marketing spend by month, staff attendance, and per-deal commissions\u2014so the owner sees the whole business, not just the loan queue.', zh: '同一个系统还追踪各渠道 WhatsApp 点击、每月营销开销、员工出勤和每单佣金——老板看到的是整盘生意，不只是贷款队列。' } },
        { kind: 'p', text: { en: 'Roles keep the data honest. Sales see their own pipeline, Admin owns bank submissions, Super Admin controls prices, commissions, and permissions. Every sensitive change lands in an audit log.', zh: '角色让数据保持干净。Sales 看自己的 pipeline，Admin 负责送银行，Super Admin 管价格、佣金和权限。每个敏感操作都会进 audit log。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'About this demo', zh: '关于这个 Demo' }, text: { en: 'The public demo above runs the real dashboard with fixed anonymized sample data, entirely in your browser\u2014no login, nothing saved to a server, and it resets on every reload. The production system runs on Firebase with real authentication and role-based security rules.', zh: '上面的公开 Demo 用固定匿名示例数据跑真实仪表台，完全在你的浏览器里——不用登录、不会写入服务器、刷新即重置。正式系统跑在 Firebase 上，有真实登录与角色安全规则。' } },
      ]}
      faq={[
        { q: { en: 'Who is this system for?', zh: '这个系统给谁用？' }, a: { en: 'Vehicle dealerships that sell on financing\u2014where every sale depends on a loan getting approved, and the daily work is chasing documents, banks, and follow-ups.', zh: '靠贷款出车的车行——每一单都取决于贷款批不批，日常工作就是追文件、追银行、追跟进。' } },
        { q: { en: 'What happens when a bank rejects an application?', zh: '银行拒绝申请之后会怎样？' }, a: { en: 'The rejection is recorded with its reject code, the code is translated into a plain-language next step, and the application can be resubmitted to another bank as a new round without losing history.', zh: '拒绝会连同 reject code 一起记录，code 被翻译成一句普通话的下一步，申请可以换一家银行开新一轮再送，历史全部保留。' } },
        { q: { en: 'Is the demo the real product?', zh: 'Demo 是真实产品吗？' }, a: { en: 'It is the real dashboard interface with demo data seeded into your browser. Firebase is switched off in the demo build, so nothing you click leaves your device.', zh: '是真实的仪表台界面，加上灌进浏览器的示例数据。Demo 版本关掉了 Firebase，你点的任何东西都不会离开你的设备。' } },
        { q: { en: 'Can different staff see different things?', zh: '不同员工看到的东西不一样吗？' }, a: { en: 'Yes. Sales, Admin, Operations Manager, and Super Admin each get their own navigation and permissions, and Super Admin can adjust page-level access per role.', zh: '会。Sales、Admin、Operations Manager 和 Super Admin 各有自己的导航与权限，Super Admin 还能按角色调整页面级访问。' } },
        { q: { en: 'Where does the production system store data?', zh: '正式系统的数据存在哪里？' }, a: { en: 'In Firebase (Firestore) under the dealership\u2019s own project, protected by authentication, custom role claims, and security rules tested in CI.', zh: '存在车行自己的 Firebase（Firestore）项目里，由登录验证、角色 claims 和在 CI 里测试过的安全规则保护。' } },
        { q: { en: 'Does it only handle loans?', zh: '它只管贷款吗？' }, a: { en: 'Loans are the spine, but the same system covers raw leads, WhatsApp click tracking, marketing spend, vehicle stock and pricing, attendance, commissions, and an audit log.', zh: '贷款是主干，但同一个系统也覆盖 raw leads、WhatsApp 点击追踪、营销开销、车辆库存与定价、出勤、佣金和 audit log。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Loan operations and dealership management', zh: '贷款运营与车行管理' }],
        [{ en: 'Pipeline', zh: '流程' }, { en: 'Lead \u2192 Application \u2192 Bank rounds \u2192 Delivery', zh: 'Lead \u2192 申请 \u2192 银行轮次 \u2192 交车' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Task Inbox · Applications · Leads · Analytics · Finance · Commissions', zh: 'Task Inbox · 申请 · Leads · 分析 · 财务 · 佣金' }],
        [{ en: 'Roles', zh: '角色' }, { en: 'Sales · Admin · Operations Manager · Super Admin', zh: 'Sales · Admin · Operations Manager · Super Admin' }],
        [{ en: 'Deployment', zh: '部署方式' }, { en: 'Firebase App Hosting with Firestore security rules', zh: 'Firebase App Hosting，配 Firestore 安全规则' }],
        [{ en: 'Languages', zh: '语言' }, { en: 'Chinese · English · Malay', zh: '中文 · English · Malay' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'dr-racing')}
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

export const PokerFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const playUrl = 'https://poker.eden-tan.com/';
  const installUrl = 'https://poker.eden-tan.com/?install=1';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsPokerCssIcon label="Friday Poker Club CSS app icon" />}
      name="Friday Poker Club"
      kicker={{ en: 'Multiplayer game · Table for the crew', zh: '多人游戏 · 给那群人的牌桌' }}
      tagline={{ en: 'No place to book. Just bring the crew back.', zh: '不用约地点。把那群人叫回来就好。' }}
      meta={{ en: 'Free · Play chips only · Browser or installed app · Chinese and English', zh: '免费 · 只有娱乐筹码 · 浏览器或安装成 App · 中英双语' }}
      primary={{ href: playUrl, external: true, label: { en: 'Open a table', zh: '开一局' } }}
      secondary={{ href: installUrl, external: true, icon: <Download size={16} />, label: { en: 'Install app', zh: '安装 App' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: playUrl,
        domain: 'poker.eden-tan.com',
        title: { en: 'Interactive Friday Poker Club table', zh: 'Friday Poker Club 互动牌桌' },
        caption: { en: 'This is the real table, running right here. Open it in a new tab to bring the crew in.', zh: '这就是真的牌桌，直接跑在这里。想叫人来，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Friday Poker Club started with a simple problem: we still wanted to play, but not every Friday came with a host, a place, or the patience to install another game app. So I built a browser table — open a room, send the link, take a seat.', zh: 'Friday Poker Club 起点很简单：我们还是想一起打牌，但不是每个周五都有人能提供地点，也不是每个人都想安装另一个游戏 App。于是我做了一张浏览器牌桌——开房、发链接、坐下，就可以开始。' } },
        { kind: 'p', text: { en: 'It is not a poker platform chasing strangers. It is for people who already know each other, and it has grown to cover the whole night: Hold’em when everyone wants a proper game, six mini games when they do not, party games when nobody wants to think, and a chip tracker for the nights you are dealing real cards at a real table.', zh: '它不是一个追着陌生人跑的扑克平台，服务的是本来就认识的人。它现在覆盖的是一整个晚上：想正经打就开德州，不想就玩六个小游戏，都不想动脑就玩派对游戏；要是当晚是用真牌在真桌子上打，它还能当记筹码的那个人。' } },
        { kind: 'h', text: { en: 'What is on the table', zh: '桌上有什么' } },
        { kind: 'steps', items: [
          { title: { en: 'Texas Hold’em', zh: '德州扑克' }, text: { en: 'Up to nine seats, blinds at 2/4/10/20, a $50 minimum buy-in, all-in and side pots handled properly, an optional nine-second action clock, and practice bots when you are short a player.', zh: '最多九个座位，盲注 2/4/10/20，最低买入 $50，全下与边池都算得对，可选的 9 秒行动倒数，人不够时还能加练习机器人。' } },
          { title: { en: 'Six mini games', zh: '六个小游戏' }, text: { en: '8/9, Niu Niu, Chinese Poker, Blackjack, Penney’s Game with its own leaderboard, and Wheel of Changes — an I Ching–themed solo slot with its own practice chips.', zh: '8/9、牛牛、十三水、21 点、有自己排行榜的硬币骗局，以及大衍之轮——一个易经主题的单人转盘，用它自己的练习筹码。' } },
          { title: { en: 'Party games', zh: '派对游戏' }, text: { en: 'Prompt cards, Ring of Fire, Number Bomb and 6-7-8 — one phone passed around, or an online room. No buy-in, and they never touch your chips.', zh: '提示卡、国王杯、数字炸弹和 6-7-8——一支手机轮着传，或者开线上房。不用买入，也不会动到你的筹码。' } },
          { title: { en: 'Visual Chip', zh: '实体牌局记筹码' }, text: { en: 'For the nights you deal physical cards: the app tracks stacks, bets, the pot and the settlement, so nobody has to do the maths at the end of the night.', zh: '给那些用真牌开的晚上：app 负责记筹码、下注、底池和最后的结算，散场时不用再有人算数。' } },
        ] },
        { kind: 'h', text: { en: 'Designed for a crew, not a casino', zh: '为熟人局做的选择' } },
        { kind: 'p', text: { en: 'You should not have to wait until everyone is free. Open a room and drop the link in the group. Late arrivals and reconnects get absorbed by the table: seats and stacks persist, and a dropped player reopens the link and sits back down instead of restarting the night.', zh: '不用等到所有人都有空。开一个房间，把链接丢进群里。有人晚到、有人掉线，牌桌都接得住：座位和筹码都留着，掉线的人重开链接就坐回原位，不用整晚重来。' } },
        { kind: 'p', text: { en: 'The wallet is part of the fun, not the pressure. Chips are play chips, top-ups are free, and the Player Record keeps lifetime buy-ins, today’s result and a session history you can filter by table type — the record exists so the group can argue about it, not so anyone can cash out.', zh: '钱包是乐趣的一部分，不是压力。筹码是娱乐筹码，补充免费，玩家资金记录会留下累计买入、当日输赢和可按桌型筛选的对局历史——这些记录是让大家互相吐槽用的，不是拿来兑现的。' } },
        { kind: 'callout', label: { en: 'Only play with people you know', zh: '只跟认识的人玩' }, text: { en: 'Table state syncs straight between the players’ browsers, which keeps it fast and free but also means a determined player could read the table data. That is fine among friends and not fine with strangers, so the table is built for a crew that already trusts each other.', zh: '牌局状态直接在各人的浏览器之间同步，所以又快又不花钱，但也意味着一个存心的人能读到牌桌数据。这在熟人之间没问题，跟陌生人就有问题，所以这张桌子是为本来就互相信任的一群人做的。' } },
        { kind: 'p', text: { en: 'The table also has the boring parts that make a night work: in-table chat and optional voice, report and block, nickname and chat filtering, account deletion in the app, and a public legal page. Nothing there is exciting. All of it matters the first time it is needed.', zh: '牌桌也有那些不好玩但必要的东西：桌内聊天与可选语音、举报与屏蔽、昵称和聊天过滤、在 app 内直接删除账号，以及一个公开的法律页面。这些都不精彩，但第一次需要用到的时候，它们很重要。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Play chips only', zh: '只有娱乐筹码' }, text: { en: 'Chips have no cash value. There is no deposit, no withdrawal, no payout and nothing to buy. Top-ups are free and unlimited, because the point is the night, not the money.', zh: '筹码没有现金价值。没有充值、没有提现、没有派彩，也没有任何东西可买。补充筹码免费且无限，因为重点是那个晚上，不是钱。' } },
      ]}
      faq={[
        { q: { en: 'Do I need to install anything?', zh: '需要安装什么吗？' }, a: { en: 'No. It runs in any modern browser — open the link and take a seat. If you would rather keep it on your home screen, the Install app button adds it as a standalone app.', zh: '不需要。它跑在任何现代浏览器里——打开链接就能坐下。想放到主屏幕的话，点「安装 App」就会变成独立应用。' } },
        { q: { en: 'Do I need an account?', zh: '需要注册吗？' }, a: { en: 'No. You can enter as a guest. Signing in with Google keeps your chips, avatar and record across devices, and guest progress merges into the account when you do. Account deletion is in the app.', zh: '不用。可以直接以访客进入。用 Google 登录能让筹码、头像和记录跨设备保留，访客的进度会在登录时并进账号。删除账号的入口在 app 里。' } },
        { q: { en: 'Is real money involved?', zh: '会牵涉真钱吗？' }, a: { en: 'Never. Chips are play chips with no cash value: no deposit, no withdrawal, no payout, no purchases. Top-ups are free.', zh: '完全不会。筹码是娱乐筹码，没有现金价值：没有充值、没有提现、没有派彩，也没有内购。补充筹码免费。' } },
        { q: { en: 'Can strangers join my table?', zh: '陌生人会进我的牌桌吗？' }, a: { en: 'Be aware that they can. While a table is active it is listed in the shared lobby, and there is no room password, so anyone in the app can sit down. The invite link is the convenient way in for your crew, not a lock on the door — treat the table as a room with the door open.', zh: '有可能，要知道这一点。牌桌活跃期间会列在公共大厅里，也没有房间密码，所以 app 里的任何人都可以坐下。邀请链接是方便自己人进来的入口，不是门锁——把它当成一间没锁门的房间。' } },
        { q: { en: 'What happens if someone loses connection?', zh: '有人断线了会怎样？' }, a: { en: 'The table keeps its state. A player who drops reopens the link and returns to the same seat and stack. An optional nine-second clock can auto-fold someone who is away, and a table with nobody active clears itself after ten minutes.', zh: '牌桌会保留状态。掉线的人重新打开链接，就回到原来的座位和筹码。可选的 9 秒倒数会让离开的人自动弃牌；十分钟没人活动的牌桌会自己清掉。' } },
        { q: { en: 'Is there voice or chat?', zh: '有语音和聊天吗？' }, a: { en: 'Both, and both live inside the table — there is no lobby open mic. Voice is peer to peer and optional; some nights the group talks the whole way through, some nights nobody turns it on.', zh: '都有，而且都在牌桌里——大厅没有开放麦。语音是点对点的，可选：有些晚上大家一路在聊，有些晚上没人开。' } },
        { q: { en: 'Can it run a table with real cards?', zh: '能用在真牌局上吗？' }, a: { en: 'Yes, that is what Visual Chip mode is for. You deal physical cards at a physical table and the app tracks stacks, bets, the pot and the final settlement.', zh: '可以，这就是「实体牌局记筹码」的用途。你们用真牌在真桌上打，app 负责记筹码、下注、底池和最后结算。' } },
        { q: { en: 'What is it built with?', zh: '用什么做的？' }, a: { en: 'React and TypeScript on the front, Firebase Realtime Database keeping seats, actions and reconnects in sync, and WebRTC for table voice. It is installable as a PWA and fully bilingual.', zh: '前端是 React 与 TypeScript，Firebase Realtime Database 让座位、动作和重连保持同步，桌内语音走 WebRTC。可以安装成 PWA，界面中英双语。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Multiplayer game for a private crew', zh: '熟人局多人游戏' }],
        [{ en: 'Main game', zh: '主要游戏' }, { en: 'Texas Hold’em, cash-game style (no tournament structure)', zh: '德州扑克，现金局形式（没有锦标赛结构）' }],
        [{ en: 'Also on the table', zh: '其他玩法' }, { en: '8/9 · Niu Niu · Chinese Poker · Blackjack · Penney’s Game · Wheel of Changes · four party games · Visual Chip tracker', zh: '8/9 · 牛牛 · 十三水 · 21 点 · 硬币骗局 · 大衍之轮 · 四个派对游戏 · 实体牌局记筹码' }],
        [{ en: 'Table limits', zh: '牌桌参数' }, { en: 'Up to 9 seats (4 for Chinese Poker) · blinds 2/4/10/20 · buy-in from $50 · all-in and side pots · optional 9s action clock', zh: '最多 9 座（十三水 4 座）· 盲注 2/4/10/20 · 买入从 $50 起 · 支持全下与边池 · 可选 9 秒行动倒数' }],
        [{ en: 'Joining', zh: '进入方式' }, { en: 'Invite link or the shared lobby list; guest entry or Google sign-in; no room password', zh: '邀请链接或公共大厅列表；可访客进入或用 Google 登录；没有房间密码' }],
        [{ en: 'At the table', zh: '桌内功能' }, { en: 'Chat · optional peer-to-peer voice · report and block · practice bots · host transfer · in-table rebuy', zh: '聊天 · 可选点对点语音 · 举报与屏蔽 · 练习机器人 · 转让房主 · 桌内补码' }],
        [{ en: 'Record', zh: '记录' }, { en: 'Wallet, lifetime buy-in, daily result, and session history filtered by table type', zh: '钱包、累计买入、当日输赢，以及可按桌型筛选的对局历史' }],
        [{ en: 'Money', zh: '金钱' }, { en: 'Play chips only · free unlimited top-ups · no deposit, withdrawal or purchases', zh: '只有娱乐筹码 · 免费无限补充 · 没有充值、提现或内购' }],
        [{ en: 'Realtime', zh: '同步' }, { en: 'Firebase Realtime Database; WebRTC for voice', zh: 'Firebase Realtime Database；语音走 WebRTC' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Mobile-first browser table, installable as a PWA, Chinese and English', zh: '移动优先的浏览器牌桌，可安装为 PWA，中英双语' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'poker')}
    />
  );
};

export const LifeOsFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const appUrl = 'https://dankuku.com/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsLifeOsCssIcon label="LifeOs CSS app icon" />}
      name="LifeOs"
      kicker={{ en: 'Personal system · Self-knowledge', zh: '个人系统 · 自我认识' }}
      tagline={{ en: 'Read yourself like a manual.', zh: '把你这个人，读成一本说明书。' }}
      meta={{ en: 'Free plan forever · Google or Apple sign-in · Chinese and English', zh: '免费版永久免费 · Google / Apple 登录 · 中文与英文' }}
      primary={{ href: appUrl, external: true, label: { en: 'Open LifeOs', zh: '打开 LifeOs' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: appUrl,
        domain: 'dankuku.com',
        title: { en: 'LifeOs running live', zh: 'LifeOs 实际运行画面' },
        caption: { en: 'The live app, running right here. Open it in a new tab to build your own manual.', zh: '真实应用直接跑在这里。想写自己那本说明书，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Give LifeOs a birth date, time, and place, and it runs eight natal systems separately — BaZi, Zi Wei Dou Shu with its flying stars, the natal hexagram, numerology, Human Design, Gene Keys, Western and Vedic astrology. Each one answers in its own voice, keeps its own sources, and states its own uncertainty.', zh: '给 LifeOs 出生日期、时间和地点，它会分别跑八套本命系统——八字、紫微斗数（含四化飞星）、易经本命卦、数字学、人类图、基因钥匙、西洋占星、吠陀占星。每一套各自作答、各自留下出处，也各自标明不确定的地方。' } },
        { kind: 'p', text: { en: 'What it refuses to do matters as much. It does not blend the systems into one score, does not treat them as votes, and does not invent a new personality theory on top of them. Where they disagree, you see the disagreement. What you get back is a plain-language manual about how you tend to operate.', zh: '它不做的事同样重要：不把八套系统混成一个分数、不拿它们投票、也不在上面另造一套人格理论。彼此矛盾的地方，你看到的就是矛盾。最后得到的是一本白话的说明书，讲你通常怎么运作。' } },
        { kind: 'h', text: { en: 'What is inside', zh: '里面有什么' } },
        { kind: 'steps', items: [
          { title: { en: 'Life manual', zh: '人生说明书' }, text: { en: 'A short book about you in eight chapters: expression and emotion, relationships, work, how you choose, the stage you are in, your most stable pattern, one upgrade task, and where the reading stops being certain.', zh: '关于你的一本小书，八章：表达与情绪、关系、工作、怎么做选择、当前阶段、最稳定的那个模式、一个升级任务，以及这份阅读到哪里就不确定了。' } },
          { title: { en: 'Personality, in four situations', zh: '性格分析：四个场景' }, text: { en: 'The same person seen at rest, under pressure, and where practice is possible — description first, raw tags and sources tucked underneath.', zh: '同一个你，在平时、在压力下、以及可以练习的地方——先给描述，原始标签和出处收在下面一层。' } },
          { title: { en: 'BaZi multi-model and Zi Wei data', zh: '八字多模型与紫微资料' }, text: { en: 'Five BaZi methods answer side by side instead of collapsing into one verdict; the Zi Wei page shows twelve palaces, palace-stem flying stars, rotation views and time layers as raw data, not as a finished story.', zh: '八字有五种方法并排作答，而不是压成一个结论；紫微页把十二宫、宫干飞化、转宫视角和时间层摊成原始资料，不包装成结论。' } },
          { title: { en: 'Tarot desk', zh: '塔罗提问台' }, text: { en: 'A full 78-card Rider–Waite–Smith deck and seven spreads, from a single card to the whole deck. The question locks when you submit it, and you come back later to mark what actually happened.', zh: '完整 78 张 Rider–Waite–Smith 牌与七种牌阵，从单张到整副。问题一提交就锁定，之后你回来标记实际发生了什么。' } },
          { title: { en: 'Your own calendar', zh: '属于你的日历' }, text: { en: 'A daily line written for you, every month of your life as one dot, and a journal where a note only becomes a life record when you promote it yourself.', zh: '每天写给你的一句话、人生每个月一个点，以及一本手帐——随手写的东西，只有你自己把它提上来，才会变成人生记录。' } },
          { title: { en: 'Deep reading', zh: '深度解读' }, text: { en: 'One box: what do you want to get clear about? No preset questions. Long answers come with a reading aid — estimated minutes, bolded lead sentences, and a full-text or key-points toggle.', zh: '只有一个输入框：你想弄清楚什么？没有预设问题。长回答附阅读辅助——预计分钟数、加粗首句，以及「读全文 / 只看要点」切换。' } },
        ] },
        { kind: 'h', text: { en: 'What makes it different', zh: '它和别的不一样在哪' } },
        { kind: 'p', text: { en: 'It shows its work, and it keeps the layers apart. The natal chart is computed once and never rewritten by anything you log afterwards; a question you ask today is a one-off that does not quietly edit who the app thinks you are. Claims that can be checked come back later to be scored against what really happened.', zh: '它把过程摊开，也把层次分开。本命盘算一次，之后你记录什么都不会回头改写它；今天问的一件事就是一次性的，不会悄悄修改这个应用对你的判断。能被验证的说法，之后会回来对照现实打分。' } },
        { kind: 'p', text: { en: 'You are also not locked in. On the free plan every reading turns into a one-tap copyable instruction you can paste into whichever chat assistant you already use, and there are narrower packs too — BaZi only, Zi Wei only, or one palace as the origin point.', zh: '你也不会被锁住。免费版把每一次解读变成可以一键复制的指令，贴到你已经在用的任何聊天助手里继续问；也有更窄的版本——只看八字、只看紫微，或者以某一个宫为原点。' } },
        { kind: 'callout', label: { en: 'Sign-in, and the public case library', zh: '登录，以及公开命例库' }, text: { en: 'Building a profile requires signing in with Google or Apple, and signing in means agreeing that your chart and readings may appear anonymously in the public case library — names and account IDs removed. That consent is stated on the sign-in button itself.', zh: '建立档案需要用 Google 或 Apple 登录，而登录同时表示你同意：你的命盘与解读可能以匿名形式出现在公开命例库里（去掉姓名与账号标识）。这一点写在登录按钮上。' } },
        { kind: 'callout', label: { en: 'Where your data sits', zh: '资料放在哪里' }, text: { en: 'It is local-first but not local-only: readings, notes, people and records sync to your own account in the cloud, and the readings themselves are generated server-side. Billing data is kept where the client cannot read it.', zh: '它是 local-first，但不是只存本机：解读、笔记、人物和记录会同步到你自己的云端账号，解读本身也在服务器端生成。付费相关资料存在客户端读不到的地方。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Not prediction', zh: '不是预测' }, text: { en: 'LifeOs is a framing and reflection tool, not fortune telling. It does not forecast events, and nothing here should stand in for medical, legal, or financial advice. Read the output as a prompt for your own thinking, not a verdict.', zh: 'LifeOs 是一个整理与反思的工具，不是算命。它不预测事件，也不应该拿来代替医疗、法律或财务上的专业意见。把输出当成让你自己继续想下去的提示，而不是判决。' } },
      ]}
      faq={[
        { q: { en: 'Is this fortune telling?', zh: '这是算命吗？' }, a: { en: 'No. It computes several traditional systems, keeps each one traceable, and writes the overlap in plain language. It is built for reflection — what tends to be true about how you operate — not for predicting what will happen.', zh: '不是。它把几套传统系统算出来、各自保留出处，再用白话写出重合的部分。它是拿来反思的——关于你通常怎么运作——而不是拿来预测会发生什么。' } },
        { q: { en: 'What do I need to provide?', zh: '需要提供什么资料？' }, a: { en: 'Birth date, time, and place. The more accurate the birth time, the more stable the chart; the app warns you when the time is too rough and has a wizard for working backwards to the right two-hour branch.', zh: '出生日期、时间和地点。出生时间越准，盘越稳；时间太粗时应用会提醒你，也有一个反推时辰的向导。' } },
        { q: { en: 'Do I need an account?', zh: '需要登录吗？' }, a: { en: 'Yes, Google or Apple. There is no password. Signing in also means agreeing to the public case library, where charts and readings can appear anonymously. The public guide pages can be read without signing in.', zh: '需要，用 Google 或 Apple，没有密码。登录同时表示同意公开命例库——命盘与解读可能以匿名形式出现在那里。公开的指南页面不登录也能看。' } },
        { q: { en: 'Which systems does it read?', zh: '它读的是哪些系统？' }, a: { en: 'Eight natal systems: BaZi, Zi Wei Dou Shu with flying stars, the natal I Ching hexagram, numerology, Human Design, Gene Keys, Western astrology and Vedic astrology. Tarot sits in a separate layer for one-off questions. Casting a new I Ching hexagram is currently switched off.', zh: '八套本命系统：八字、紫微斗数（含四化飞星）、易经本命卦、数字学、人类图、基因钥匙、西洋占星、吠陀占星。塔罗在另一层，用来问一次性的事。易经起卦目前关闭。' } },
        { q: { en: 'How much tarot is in there?', zh: '塔罗有多少内容？' }, a: { en: 'The full 78-card Rider–Waite–Smith deck, drawn in CSS, with seven spreads: one card, three cards, Celtic Cross, an advanced soulmate spread, shadow work, Rahdue\u2019s Wheel using all 78, and a 41-card Fire Tree spread shuffled from two decks.', zh: '完整 78 张 Rider–Waite–Smith 牌，全部用 CSS 画的，七种牌阵：单张、三张、凯尔特十字、正缘进阶版、阴影面、用完整 78 张的 Rahdue\u2019s Wheel，以及两副牌洗在一起的 41 张火树银花。' } },
        { q: { en: 'Is it free?', zh: '免费吗？' }, a: { en: 'The free plan is free forever: unlimited one-tap copyable instructions, the ask desk, and the manual. An online plan that writes readings inside the app is priced at $7.99 a month or $59 a year, with top-up credits at $2.99 for 10 — not switched on yet. Until then, in-app readings run on a daily quota, free.', zh: '免费版永久免费：无限次一键复制指令、提问台和说明书。在应用内直接写解读的「在线版」定价 $7.99 / 月或 $59 / 年，加购点数 $2.99 / 10 点——目前还没开。开之前，应用内解读按每日额度免费使用。' } },
        { q: { en: 'What language is it in?', zh: '界面是什么语言？' }, a: { en: 'Chinese and English, switchable in the header; newly generated readings follow the language you are in. The public guide pages come in Simplified Chinese, Traditional Chinese and English.', zh: '中文和英文，在顶部切换；新生成的解读跟着当前语言走。公开的指南页面有简体中文、繁體中文和英文三种。' } },
        { q: { en: 'Can I take a reading elsewhere?', zh: '解读能带到别处用吗？' }, a: { en: 'Yes. Every reading can become a copyable instruction, and there are narrower ones for a single system — BaZi only, Zi Wei only, or a chart rotated so one palace becomes the origin. Paste it into any chat assistant and keep going there.', zh: '可以。每次解读都能变成可复制的指令，也有只针对单一系统的版本——只看八字、只看紫微，或者把某一个宫转成原点的盘。贴到任何聊天助手里继续问就行。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Personal system and self-knowledge', zh: '个人系统与自我认识' }],
        [{ en: 'Natal systems', zh: '本命系统' }, { en: 'BaZi · Zi Wei Dou Shu (flying stars) · Natal hexagram · Numerology · Human Design · Gene Keys · Western astrology · Vedic astrology', zh: '八字 · 紫微斗数（四化飞星）· 易经本命卦 · 数字学 · 人类图 · 基因钥匙 · 西洋占星 · 吠陀占星' }],
        [{ en: 'Inquiry layer', zh: '问事层' }, { en: 'Tarot: 78-card Rider–Waite–Smith deck, 7 spreads', zh: '塔罗：78 张 Rider–Waite–Smith 牌、7 种牌阵' }],
        [{ en: 'Main modules', zh: '主要模块' }, { en: 'Life manual · Personality analysis · BaZi multi-model · Zi Wei chart data · How to use yourself · Deep reading · Tarot desk · Life in months · Life journal · Daily line', zh: '人生说明书 · 性格分析 · 八字多模型 · 紫微斗数 · 怎么使用自己 · 深度解读 · 塔罗提问台 · 人生月份 · 人生手帐 · 今天的一句' }],
        [{ en: 'Output', zh: '输出' }, { en: 'Eight-chapter manual · Four-situation personality read · Daily line · Ten capabilities with monthly practice · Raw BaZi and Zi Wei data · Long-form answers · Copyable instruction packs', zh: '八章说明书 · 四场景性格阅读 · 每日一句 · 十项能力与每月练习 · 八字与紫微原始资料 · 长文回答 · 可复制的解读指令' }],
        [{ en: 'Interface', zh: '界面语言' }, { en: 'Chinese and English (public pages also in Traditional Chinese)', zh: '中文与英文（公开页另有繁體中文）' }],
        [{ en: 'Account', zh: '账号' }, { en: 'Google or Apple sign-in; includes consent to the anonymous public case library', zh: 'Google 或 Apple 登录；包含对匿名公开命例库的同意' }],
        [{ en: 'Data', zh: '资料存放' }, { en: 'Local-first, synced to your own cloud account; readings generated server-side', zh: 'Local-first，并同步到你自己的云端账号；解读在服务器端生成' }],
        [{ en: 'Price', zh: '价格' }, { en: 'Free plan free forever; online plan $7.99/mo or $59/yr and $2.99 per 10 credits, both coming soon', zh: '免费版永久免费；在线版 $7.99 / 月或 $59 / 年、加购点数 $2.99 / 10 点，均即将推出' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive web app, installable as a PWA', zh: '响应式 Web App，可安装为 PWA' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'life-os')}
    />
  );
};

export const JijuPetFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const jijuUrl = 'https://jiju.pet/';
  const jijuInstallUrl = 'https://jiju.pet/?install=1';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsJijuCssIcon label="Jiju CSS app icon" />}
      name="Jiju"
      kicker={{ en: 'Local discovery · Pet life', zh: '本地发现 · 宠物生活' }}
      tagline={{ en: 'Find places that truly work for you and your pet.', zh: '找到真正适合你和宠物一起去的地方。' }}
      meta={{ en: 'Free · Starting in Penang · Runs in any browser', zh: '免费 · 从 Penang 开始 · 浏览器直接打开' }}
      primary={{ href: jijuUrl, external: true, label: { en: 'Open Jiju', zh: '打开 Jiju' } }}
      secondary={{ href: jijuInstallUrl, external: true, icon: <Download size={16} />, label: { en: 'Install app', zh: '安装 App' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: jijuUrl,
        domain: 'jiju.pet',
        title: { en: 'Interactive Jiju website', zh: 'Jiju 互动网站' },
        caption: { en: 'The live site, running right here. Open it in a new tab to search your own area.', zh: '真实网站直接跑在这里。想搜自己的区域，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Jiju is a local discovery system built around real life with pets. It helps pet parents understand place policies, space, and lived experience before leaving—and gives every outing a place to be remembered.', zh: 'Jiju 是一个围绕真实宠物生活建立的本地发现系统。它帮助宠物主人在出门前看懂地点政策、空间条件与实际体验，也让每次到访成为可以保存和回看的共同记忆。' } },
        { kind: 'p', text: { en: 'The goal is not the largest directory. It is information worth trusting: whether a place genuinely welcomes pets, which pets it works for, where they can stay, and whether conditions have changed since the last visit.', zh: '目标不是收集最多地点，而是让资料值得相信：这个地方是否真的欢迎宠物、适合哪种宠物、应该坐哪里，以及最近的情况有没有改变。' } },
        { kind: 'h', text: { en: 'How it works', zh: '怎么使用' } },
        { kind: 'steps', items: [
          { title: { en: 'Discover', zh: '发现' }, text: { en: 'Start with location, pet needs, and the real situation you are planning for.', zh: '按地点、宠物需求和真实场景开始探索。' } },
          { title: { en: 'Check', zh: '确认' }, text: { en: 'Review policy, space, facilities, and community records before leaving.', zh: '先查看政策、空间、设施与社区记录。' } },
          { title: { en: 'Visit', zh: '到访' }, text: { en: 'Arrive with clearer expectations and enjoy a real outing together.', zh: '带着更清楚的预期，完成一次真实出门。' } },
          { title: { en: 'Remember', zh: '记录' }, text: { en: 'Save the memory, improve the listing, and help the next pet parent.', zh: '留下回忆、补充资料，并帮助下一位宠物主人。' } },
        ] },
        { kind: 'h', text: { en: 'What Jiju is built around', zh: 'Jiju 围绕什么建立' } },
        { kind: 'p', text: { en: 'Discovery works through real needs, not ratings alone. Indoor or outdoor, pet policy, space, and the on-site reality should all be clear before you decide to go.', zh: '发现是用真实需求驱动的，不只看星级。室内或户外、宠物政策、空间和现场体验，都应该在你决定出门前就说清楚。' } },
        { kind: 'p', text: { en: 'Trust comes from cross-checking. Place details, merchant policies, and community records verify one another, which reduces the gap between a listing and the real visit.', zh: '信任来自互相验证。地点资料、商家政策与社区记录彼此校对，减少「到了才发现不适合」的落差。' } },
        { kind: 'callout', label: { en: 'Memory', zh: '记忆' }, text: { en: 'Each pet gets a real profile, so the places you visited, the experiences you shared, and how they grew over time all stay in one place.', zh: '每只宠物都有真实档案，把去过的地方、共同经历和成长过程都保存在同一个地方。' } },
        { kind: 'p', text: { en: 'Community keeps it alive. People contribute places, update conditions, and record sanctuary impact, so the knowledge improves through use instead of aging quietly.', zh: '社区让它活着。用户贡献地点、补充情况并记录 Sanctuary impact，让资料随着使用持续变好，而不是慢慢过期。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Trust boundary', zh: '信任边界' }, text: { en: 'Pets are real identities, not content props. Pet profiles, photos, and community activity need clear permission boundaries, and changing place conditions should be updated instead of misleading the next visit.', zh: '宠物是真实身份，不是内容道具。宠物档案、照片和社区互动需要清楚的权限边界；地点变动应该被更新，而不是让旧资料一直误导下一次出门。' } },
      ]}
      faq={[
        { q: { en: 'Which city does Jiju cover?', zh: 'Jiju 覆盖哪个城市？' }, a: { en: 'It starts in Penang, Malaysia. Depth matters more than reach here—one city with information you can actually rely on is worth more than ten with thin listings.', zh: '目前从马来西亚 Penang 开始。这里深度比覆盖面重要——一个城市里可靠的资料，胜过十个城市的空壳列表。' } },
        { q: { en: 'How is this different from a maps search?', zh: '和地图搜索有什么不同？' }, a: { en: 'A maps result tells you a place exists. Jiju tells you whether it works for your pet: the policy, the space, where they can sit, and what recent visitors actually found.', zh: '地图告诉你有这个地方。Jiju 告诉你它适不适合你的宠物：政策、空间、可以待在哪，以及最近去过的人实际看到什么。' } },
        { q: { en: 'Do I need an account?', zh: '需要注册吗？' }, a: { en: 'You can browse and search without one. An account is for the parts that belong to you—pet profiles, saved places, and visit records.', zh: '浏览和搜索不需要。账号是为了那些属于你的部分——宠物档案、收藏地点和到访记录。' } },
        { q: { en: 'Can I add or correct a place?', zh: '我可以新增或更正地点吗？' }, a: { en: 'Yes. Contributions are the point. A place that changed its policy is worth reporting, because the next pet parent is the one who benefits.', zh: '可以，贡献本来就是重点。地点改了政策就值得回报，因为下一个宠物主人会因此受益。' } },
        { q: { en: 'Is there an app to install?', zh: '有 App 可以安装吗？' }, a: { en: 'Jiju is a responsive web app, so it works in any browser. The Install app button adds it to your home screen as a standalone app.', zh: 'Jiju 是响应式 Web App，任何浏览器都能用。点「安装 App」就会加到主屏幕，变成独立应用。' } },
        { q: { en: 'What is Sanctuary impact?', zh: 'Sanctuary impact 是什么？' }, a: { en: 'It is a record of community contribution around rescue and shelter work, kept alongside the discovery data rather than treated as a separate campaign.', zh: '这是关于救助与收容工作的社区贡献记录，和发现数据放在一起，而不是当成另一场独立活动。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Local discovery and pet life', zh: '本地发现与宠物生活' }],
        [{ en: 'Current city', zh: '当前城市' }, { en: 'Penang, Malaysia', zh: '马来西亚 Penang' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Discovery · Place profiles · Pet profiles · Visits · Community', zh: '发现 · 地点档案 · 宠物档案 · 到访 · 社区' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive web app', zh: '响应式 Web App' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'jiju')}
    />
  );
};
