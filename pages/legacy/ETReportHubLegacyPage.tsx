/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LEGACY — not rendered by any route. App.tsx never imports this file, so it is not in the
 * bundle; it is kept only as reference material from an earlier page version. Delete it rather
 * than wiring it back in; live routes are the lazy pages registered in App.tsx.
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls } from '../../app/shared';
import type { Language, Theme, ThemePreference } from '../../app/shared';
import { ProjectsEtReportCssIcon } from '../../components/css-art/index';

const etReportHubValueProps = [
  {
    title: { en: 'Excel chaos becomes one source of truth', zh: 'Excel 混乱变成单一事实层' },
    copy: {
      en: 'Transaction and Customer exports are ingested, normalized, and kept under clear import rules instead of being copied across fragile spreadsheets.',
      zh: 'Transaction 与 Customer 导出会被导入、标准化，并按清楚规则保存，不再靠脆弱的 Excel 来回复制。',
    },
  },
  {
    title: { en: 'Operators see what changed', zh: '运营看得出发生了什么' },
    copy: {
      en: 'Performance, members, channels, trends, and brand comparison views turn daily reporting into decisions instead of manual checking.',
      zh: 'Performance、Members、Channels、Trends 和品牌对比，把日常报表从手动检查变成可判断的视图。',
    },
  },
  {
    title: { en: 'CRM becomes the next action layer', zh: 'CRM 变成下一步行动层' },
    copy: {
      en: 'Member segments, risk signals, retention buckets, and CRM export prepare the system for follow-up workflows.',
      zh: '会员分群、风险信号、留存区间和 CRM export，让系统能继续接上后续跟进工作流。',
    },
  },
] as const;

const etReportHubModules = [
  {
    title: 'Data Ingest',
    copy: {
      en: 'Upload Transaction and Customer Excel files, detect import type, validate quirks, and preserve customer export history without double-counting lifetime totals.',
      zh: '上传 Transaction 与 Customer Excel，识别导入类型，处理资料怪异点，并保留 Customer export 历史，避免 lifetime totals 被重复相加。',
    },
  },
  {
    title: 'Performance',
    copy: {
      en: 'Daily, weekly, and overall performance views with deposit, withdraw, net deposit, transaction count, and comparison mode.',
      zh: '每日、每周、整体业绩视图，包含 deposit、withdraw、net deposit、交易次数和对比模式。',
    },
  },
  {
    title: 'Members',
    copy: {
      en: 'Member lifetime KPIs, recency buckets, retention thresholds, risk rules, segment analysis, and CRM-ready export.',
      zh: '会员 lifetime KPI、活跃区间、留存阈值、风险规则、分群分析和可用于 CRM 的导出。',
    },
  },
  {
    title: 'Channels',
    copy: {
      en: 'Referrer-to-channel mapping, unknown referrer handling, channel comparison, and trend charts for acquisition quality.',
      zh: 'Referrer 到渠道映射、未知 referrer 处理、渠道对比和 acquisition quality 趋势图。',
    },
  },
  {
    title: 'Trends',
    copy: {
      en: 'Trend buckets from transaction data and customer snapshots, including active members, net movement, and compact date labels.',
      zh: '基于交易数据和 customer snapshots 的趋势区间，包含活跃会员、净变化和更清楚的日期标签。',
    },
  },
  {
    title: 'System Guide',
    copy: {
      en: 'A built-in operating manual explaining data flow, formulas, conversion logic, dashboard rules, and brand/product guide.',
      zh: '内置系统说明，解释数据流、公式、转换逻辑、dashboard 规则和品牌 / 产品规范。',
    },
  },
] as const;

const etReportHubSkillProof = [
  {
    title: { en: 'Data architecture', zh: '数据架构' },
    copy: {
      en: 'The SQLite tables, import rules, brand scoping, and snapshot logic are all built around how messy the real exports actually are — not around some clean demo file.',
      zh: 'SQLite 表、导入规则、品牌隔离、snapshot 逻辑，全是照着真实导出有多乱来设计的——不是对着一份干净的 demo 文件做的。',
    },
  },
  {
    title: { en: 'Product thinking', zh: '产品思考' },
    copy: {
      en: 'Daily / Weekly / Overall were three pages quietly doing the same job, so I folded them into one Performance page — and kept the old links alive so nobody got lost.',
      zh: 'Daily / Weekly / Overall 三个页面其实在干同一件事，干脆收成一个 Performance 页——旧导航还留着能用，免得有人找不到路。',
    },
  },
  {
    title: { en: 'UX for operators', zh: '运营 UX' },
    copy: {
      en: 'Then all the stuff operators actually ask for: diagnostics, date filters, chart switches, sortable tables, and feedback that doesn’t flash at people who hate motion.',
      zh: '然后是运营真正会要的那些东西：diagnostics、日期筛选、图表切换、可排序表格，还有照顾怕闪的人的 reduced-motion 反馈。',
    },
  },
  {
    title: { en: 'Performance engineering', zh: '性能工程' },
    copy: {
      en: 'When it got heavy I added a derived-data cache, made it refresh only the block that changed, and built a Docker/backend mode for the bigger workflows. Nothing grinds.',
      zh: '数据一多就加了 derived-data cache、只刷新有变动的那一块，还有给大工作流用的 Docker/backend mode。不卡。',
    },
  },
] as const;

const etReportHubAudience = [
  {
    title: { en: 'Operators', zh: 'Operators' },
    copy: { en: 'Need daily KPI clarity without rebuilding the same Excel report manually.', zh: '需要每天看清 KPI，但不想一直手动重做同一份 Excel。' },
  },
  {
    title: { en: 'Aggregators', zh: 'Aggregators' },
    copy: { en: 'Need multi-brand views, channel quality, member analysis, and exportable operating data.', zh: '需要多品牌视图、渠道质量、会员分析和可导出的运营数据。' },
  },
  {
    title: { en: 'Growth teams', zh: 'Growth teams' },
    copy: { en: 'Need to connect reporting, retention, CRM segmentation, and follow-up actions.', zh: '需要把报表、留存、CRM 分群和后续跟进行动接起来。' },
  },
] as const;

const etReportHubFaq = [
  {
    q: { en: 'Is this only a dashboard?', zh: '这只是 dashboard 吗？' },
    a: {
      en: 'No. The dashboard is the visible layer. The product also includes import rules, normalized storage, cache strategy, diagnostics, export logic, and a system guide.',
      zh: '不是。Dashboard 只是可见层。产品还包含导入规则、标准化存储、缓存策略、诊断、导出逻辑和系统说明。',
    },
  },
  {
    q: { en: 'Can it work without a heavy backend?', zh: '没有重 backend 可以跑吗？' },
    a: {
      en: 'Yes. The current system supports browser-side IndexedDB/sql.js and an optional local Python backend for Docker uploads, cache refresh, and wide Excel export.',
      zh: '可以。当前系统支持浏览器端 IndexedDB/sql.js，也支持可选本地 Python backend，用于 Docker 上传、cache refresh 和宽表 Excel 导出。',
    },
  },
  {
    q: { en: 'Where does AI fit?', zh: 'AI 放在哪里？' },
    a: {
      en: 'AI fits best after the data layer is stable: report explanation, anomaly review, CRM next-action suggestions, and operator workflow assistance.',
      zh: 'AI 最适合接在稳定数据层之后：报表解释、异常复盘、CRM 下一步建议和运营工作流辅助。',
    },
  },
] as const;

export const ETReportHubLegacyFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  salesHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, salesHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const tour = isZh
    ? [
        ['📋', '① 老板给你 Excel', '每天两份表：交易明细 + 会员名单'],
        ['📥', '② 拖进系统', '系统自动看懂、对账、去重'],
        ['🗄️', '③ 存进保险箱', 'SQLite 数据库保存当前状态和月度趋势快照'],
        ['📊', '④ 自动出报表', '业绩、会员、趋势全自动算'],
        ['📤', '⑤ 一键发老板', '导出熟悉格式的 Excel'],
        ['🧹', '⑥ 每月扫一次', '半年前的旧数据贴 warm 标签，不删，为上云预热'],
      ]
    : [
        ['📋', '① Boss hands you Excel', 'Two daily files: transactions + members'],
        ['📥', '② Drop into system', 'Auto-parsed, reconciled, deduped'],
        ['🗄️', '③ Locked in vault', 'SQLite stores current state and monthly trend snapshots'],
        ['📊', '④ Auto reports', 'Performance, members, trends — all computed'],
        ['📤', '⑤ Send to boss', 'Export back to familiar Excel'],
        ['🧹', '⑥ Monthly sweep', 'Old rows tagged as warm, not deleted, just prepped for the cloud'],
      ];
  const featureMap = isZh
    ? [
        ['数据导入', 'Excel 拖放上传、Customer 类型选择、SQLite 手动加载、后端上传、导入诊断、宽表 Excel 导出。', '后端可用时直接写 daily_report.db 并刷新 dashboard_cache.json；没有后端时写浏览器缓存 SQLite。'],
        ['业绩报表', 'Daily / Weekly / Overall 合并在同一页；交易明细可搜索、排序、导出；支持对比模式和会员存款 recency bucket。', '交易明细严格按交易日期；存款 recency bucket 是会员行为 cohort，点击打开会员明细弹窗。'],
        ['会员分析', '会员累计数据、风险分布、登录/存款 recency、留存、No Conversion 筛选、分页会员列表、CRM 导出。', 'Recency / retention 用全部当前非排除会员；No Conversion = Last Deposit Date 为空。'],
        ['分群分析', '按风险、层级、登录 recency、存款 recency、渠道、推荐人切分会员；支持分群明细弹窗。', '明细弹窗支持搜索、排序和导出，导出跟随当前弹窗搜索/排序。'],
        ['渠道分析', 'ReferrerID 归类、Unknown Referrers、渠道配置、渠道对比、ROI、注册转化、渠道明细弹窗。', '渠道配置在 Unknown Referrers 下方；新增渠道显示在最上方；默认只显示前 3 个渠道。'],
        ['趋势分析', '按日/周/月查看存款、提款、净存款、活跃会员和会员行为 bucket。', '活跃会员走势来自交易活动，并通过 user_id、phone+name、unique phone fallback 解析会员。'],
        ['品牌对比', '跨 brand 查看会员数、存款、提款、净存款、平均值和 bonus 等指标。', '所有 SQLite join 和导出都必须带 brand_id，避免跨品牌重复行。'],
        ['系统设置', '主题、语言、表格字段、图表指标、风险阈值、留存基准、recency bucket、排除会员、渠道设置。', '大部分设置按 brand 存储；会影响派生缓存并触发相关区块重算。'],
        ['系统管理', '用户、角色、权限、审计日志；审计 Metadata 显示白话文，中英文同步。', '审计日志 append-only；银行资料查看、渠道编辑、上传、导出、登录失败、改密等关键动作会记录。'],
      ]
    : [
        ['Data Ingest', 'Excel drag/drop upload, Customer type selection, manual SQLite load, backend upload, import diagnostics, and wide Excel export.', 'When backend is available, writes daily_report.db and refreshes dashboard_cache.json; otherwise writes browser-cached SQLite.'],
        ['Performance', 'Daily / Weekly / Overall live in one page; transaction details are searchable, sortable, and exportable; comparison mode and deposit-recency buckets are supported.', 'Transaction details are transaction-date based; deposit-recency buckets are member behavior cohorts and open member detail modals.'],
        ['Member Analysis', 'Member lifetime metrics, risk distribution, login/deposit recency, retention, No Conversion filter, paged member table, and CRM export.', 'Recency / retention use all current non-excluded members; No Conversion = blank Last Deposit Date.'],
        ['Segment Analysis', 'Segments members by risk, tier, login recency, deposit recency, channel, and referrer; segment detail modals are supported.', 'Detail modals support search, sorting, and export that follows the modal state.'],
        ['Channel Analysis', 'ReferrerID mapping, Unknown Referrers, Channel Setup, channel comparison, ROI, deposit conversion, and channel detail modals.', 'Channel Setup sits below Unknown Referrers; new channels appear at the top; only the first 3 channels show by default.'],
        ['Trend Analysis', 'Daily/weekly/monthly trends for deposits, withdrawals, net deposit, active members, and member behavior buckets.', 'Active-member trend comes from transaction activity and resolves members by user_id, phone+name, and unique phone fallback.'],
        ['Brand Comparison', 'Compares member counts, deposits, withdrawals, net deposit, averages, and bonus across brands.', 'All SQLite joins and exports must remain brand-scoped to prevent cross-brand duplication.'],
        ['System Settings', 'Theme, language, table fields, chart metrics, risk thresholds, retention basis, recency buckets, exclusions, and channel setup.', 'Most settings are brand-scoped and invalidate derived caches where needed.'],
        ['System Management', 'Users, roles, permissions, and audit logs; audit metadata is shown as human-readable text in both languages.', 'Audit log is append-only; bank views, channel edits, uploads, exports, login failures, password resets, and other key actions are recorded.'],
      ];
  const businessRules = isZh
    ? [
        ['Today / 日期锚点', '优先使用后端 /api/health 的 GMT+8 日期；没有后端时才 fallback 到最新交易日期，再 fallback 到浏览器 GMT+8。'],
        ['Customer 是 Lifetime 当前状态', 'Customer Excel 覆盖当前会员状态；绝对不能把多个 Customer 批次相加。Lifetime + date_to 只用于批次记录和月度趋势快照。'],
        ['Transaction 可叠加', 'Transaction 用 brand_id + transaction_id 去重，重复上传同一笔不会重复计算。'],
        ['提款是负数', '净存款和 Company Win Loss 都使用 Deposit Total + Withdaw Total；看起来一样不是 bug。'],
        ['行为 cohort 不等于交易明细', '会员/业绩中的登录或存款 recency bucket 是会员行为分析，不代表当前交易表应该有同样行数。'],
        ['弹窗表格规则', '所有明细弹窗 table 都应有搜索、排序，并且导出必须跟随当前弹窗搜索/排序。'],
      ]
    : [
        ['Today / date anchor', 'Prefer backend /api/health GMT+8 date; fallback to latest transaction date, then browser GMT+8.'],
        ['Customer is latest Lifetime state', 'Customer Excel overwrites current member state; never add Customer batches together. Lifetime + date_to is used for import history and monthly trend snapshots.'],
        ['Transaction append/upsert', 'Transactions dedupe by brand_id + transaction_id, so re-uploading the same transaction does not double count.'],
        ['Withdraw is negative', 'Net Deposit and Company Win Loss both use Deposit Total + Withdaw Total; matching values are not a bug.'],
        ['Behavior cohort is not transaction detail', 'Login/deposit recency buckets are member behavior analysis and do not imply the transaction table has the same number of rows.'],
        ['Modal table rule', 'Every detail modal table should have search, sorting, and export that follows the current modal search/sort.'],
      ];
  const dailyUpload = isZh
    ? [
        ['Transaction', '按 brand_id + transaction_id append/upsert；重复上传同一笔交易不会重复计算。', '趋势、业绩和交易明细永远按真实交易日期回看。'],
        ['Current Members', 'Customer Lifetime 文件更新 customers / customer_metrics 当前状态。', 'Dashboard 默认看到的是最新会员状态，不把历史批次金额相加。'],
        ['Monthly Trend Snapshot', 'Lifetime + date_to 会写入 customer_metrics_monthly，用于趋势和批次追踪；日常会员分析只看最新当前状态。', '保留 Customer 批次边界，同时让日常页面保持简单稳定。'],
      ]
    : [
        ['Transaction', 'Append/upsert by brand_id + transaction_id; re-uploading the same transaction does not double count.', 'Trends, Performance, and transaction details remain tied to true transaction dates.'],
        ['Current Members', 'The Customer Lifetime file updates current customers / customer_metrics state.', 'The Dashboard default view uses the latest member state and never adds Customer batches together.'],
        ['Monthly Trend Snapshot', 'Lifetime + date_to writes customer_metrics_monthly for trends and batch tracking; daily Member Analysis uses the latest current state.', 'Keeps Customer batch boundaries while keeping daily pages simple and stable.'],
      ];
  const operatingLoop = isZh
    ? [
        ['01', '上传 Transaction / Customer Excel。', '后端写 DB、刷新 cache、显示导入诊断；Transaction 去重叠加，Customer 更新当前状态并记录批次。', '如果有 unmatched / bank JSON error，先修数据再重传。'],
        ['02', '进入 Performance 检查 Today / Weekly / Overall。', '日期使用 GMT+8 anchor；交易明细按交易日期；recency bucket 可打开会员明细。', '用明细弹窗搜索、排序、导出需要跟进的会员。'],
        ['03', '进入 Member Analysis 选 No Conversion / 风险 / recency。', '会员列表分页显示，但导出读取完整筛选结果。', '下载 CRM 或筛选会员 CSV 做 conversion / retention campaign。'],
        ['04', '进入 Channel Analysis 修 Unknown Referrers。', 'Channel Setup 就在 Unknown Referrers 下方；新增渠道在最上方，默认只显示 3 个。', '保存规则后刷新渠道表现、转化率和 ROI。'],
        ['05', '使用 System Management 审计后台动作。', 'Metadata 显示白话文；原始 JSON 保留在 tooltip / CSV。', '需要调查时按 Action / User / Brand / 时间过滤并导出 CSV。'],
      ]
    : [
        ['01', 'Upload Transaction / Customer Excel.', 'Backend writes DB, refreshes cache, and shows diagnostics; Transaction dedupes/appends, while Customer updates current state and records the batch.', 'If unmatched rows or bank JSON errors exist, repair data and re-upload.'],
        ['02', 'Review Today / Weekly / Overall in Performance.', 'Dates use the GMT+8 anchor; transaction details follow transaction date; recency buckets open member details.', 'Use modal search/sort/export for members that need follow-up.'],
        ['03', 'Use Member Analysis filters such as No Conversion, risk, and recency.', 'The table is paged, but exports read the full filtered result set.', 'Download CRM or filtered member CSV for conversion / retention campaigns.'],
        ['04', 'Use Channel Analysis to resolve Unknown Referrers.', 'Channel Setup sits below Unknown Referrers; new channels appear first and only 3 show by default.', 'Save rules to refresh channel performance, conversion, and ROI.'],
        ['05', 'Audit operations in System Management.', 'Metadata is shown in plain language; raw JSON remains available in tooltip / CSV.', 'Filter by Action / User / Brand / time and export CSV when investigating.'],
      ];
  const flowBranches = isZh
    ? [
        ['Admin 上传 Excel', '每天上传 Transaction Excel；有 Customer Excel 时也一起上传。本地后端可直接接收原始 Excel 文件。'],
        ['Transaction Excel', '读取每一笔交易明细，标准化日期、金额、状态、Type，并用 User Name + Mobile / Phone fallback 匹配 user_id。'],
        ['Transaction Append / Upsert', '用 brand_id + transaction_id 去重；重复上传不会重复计算，transactions 表可持续叠加。'],
        ['Customer Excel', '代表 BO 导出的当前会员状态，不直接累加。Bank Detail JSON 会拆成 bank_details。'],
        ['Customer 类型', 'Unknown / Date Range / Lifetime。只有 Lifetime + date_to 会写入 customer_metrics_monthly。'],
        ['daily_report.db', 'SQLite 存储干净数据、最新会员指标、交易明细和月度快照；后端写入后同步刷新 dashboard_cache.json。'],
        ['Dashboard / Export', 'Dashboard 读取 SQLite 显示 Daily / Weekly / Overall / Members / Channels / Trends；export_wide.py 导出老板熟悉的 Excel 宽表。'],
      ]
    : [
        ['Admin uploads Excel', 'Transaction Excel can be uploaded daily; Customer Excel is uploaded when available. The local backend can receive the original Excel files directly.'],
        ['Transaction Excel', 'Reads each transaction record, normalizes dates, amounts, status, and type, and resolves user_id by User Name + Mobile with phone fallback.'],
        ['Transaction Append / Upsert', 'Deduplicates by brand_id + transaction_id so repeated uploads do not double count; the transactions table keeps accumulating records.'],
        ['Customer Excel', 'Represents the current BO member state and is not blindly accumulated. Bank Detail JSON is split into bank_details.'],
        ['Customer type', 'Unknown / Date Range / Lifetime. Only Lifetime + date_to writes into customer_metrics_monthly.'],
        ['daily_report.db', 'SQLite stores clean data, latest member metrics, transactions, and monthly snapshots; backend writes also refresh dashboard_cache.json.'],
        ['Dashboard / Export', 'Dashboard reads SQLite for Daily / Weekly / Overall / Members / Channels / Trends; export_wide.py creates the familiar wide Excel report.'],
      ];
  const completeNodeMap = isZh
    ? [
        {
          label: 'INPUT',
          title: '输入与接收',
          tone: 'brand',
          nodes: [
            ['01', 'Admin 上传', '每天上传 Transaction Excel；有 Customer Excel 时也一起上传。'],
            ['02', '后端 API / fallback', '优先走 /api/upload 写本地数据库；后端不可用时才使用浏览器 SQLite fallback。'],
          ],
        },
        {
          label: 'TRANSACTION PIPELINE',
          title: '交易流水链路',
          tone: 'success',
          nodes: [
            ['03', 'Transaction Excel', '交易明细是可叠加流水，负责真实交易日期、金额、状态和用户资料。'],
            ['04', 'Convert / Normalize', '标准化日期、金额、Type、status，并用 User Name + Mobile / Phone fallback 匹配 user_id。'],
            ['05', 'Append / Upsert', '用 brand_id + transaction_id 去重；重复上传同一笔不会重复计算。'],
            ['06', 'transactions', '写入 SQLite transactions 表，后续报表、趋势、明细和导出都从这里取交易事实。'],
          ],
        },
        {
          label: 'CUSTOMER PIPELINE',
          title: '会员当前状态链路',
          tone: 'warning',
          nodes: [
            ['07', 'Customer Excel', 'Customer 代表 BO 当前会员状态，不把多个批次金额相加。'],
            ['08', 'Convert / Normalize', '标准化会员字段；Bank Detail JSON 拆成 bank_details，坏 JSON 进入错误文件。'],
            ['09', 'Classify Export', 'Customer 类型为 Unknown / Date Range / Lifetime；只有 Lifetime + date_to 进入月度快照。'],
            ['10', 'Overwrite Current', '覆盖 customers + customer_metrics 的当前会员状态，让 Dashboard 默认看最新状态。'],
            ['11', 'Monthly Snapshot', '写入 customer_metrics_monthly，保留 Lifetime 批次边界和月度趋势。'],
          ],
        },
        {
          label: 'UNIFIED OUTPUT',
          title: '统一输出与维护',
          tone: 'neutral',
          nodes: [
            ['12', 'daily_report.db', 'SQLite 保存干净数据、当前会员指标、交易明细、银行资料和月度快照，并刷新 dashboard_cache.json。'],
            ['13', 'Dashboard', '读取 SQLite / cache，输出 Performance、Members、Channels、Trends、Brand Comparison。'],
            ['14', 'Excel Export', 'export_wide.py 或 /api/export/wide 输出老板熟悉的 Excel 宽表；CRM / Audit 也可导出。'],
            ['15', 'Tier Maintenance', 'tier_data.py 每月把 6 个月以上旧行标记为 warm；查询和导出仍默认看全表，为上云分区预留。'],
          ],
        },
      ]
    : [
        {
          label: 'INPUT',
          title: 'Input and receiving',
          tone: 'brand',
          nodes: [
            ['01', 'Admin Upload', 'Admins upload Transaction Excel daily; Customer Excel is uploaded when available.'],
            ['02', 'Backend API / fallback', 'Prefer /api/upload into the local database; use browser SQLite fallback only when backend is unavailable.'],
          ],
        },
        {
          label: 'TRANSACTION PIPELINE',
          title: 'Transaction pipeline',
          tone: 'success',
          nodes: [
            ['03', 'Transaction Excel', 'Transaction is the appendable ledger for true transaction date, amount, status, and user profile fields.'],
            ['04', 'Convert / Normalize', 'Normalize dates, amounts, Type, status, and resolve user_id through User Name + Mobile / Phone fallback.'],
            ['05', 'Append / Upsert', 'Dedupe by brand_id + transaction_id so repeated uploads do not double count.'],
            ['06', 'transactions', 'Write into SQLite transactions; reports, trends, details, and exports read transaction facts from here.'],
          ],
        },
        {
          label: 'CUSTOMER PIPELINE',
          title: 'Current member-state pipeline',
          tone: 'warning',
          nodes: [
            ['07', 'Customer Excel', 'Customer represents the current BO member state and must not be summed across batches.'],
            ['08', 'Convert / Normalize', 'Normalize member fields; split Bank Detail JSON into bank_details and send bad JSON to an error file.'],
            ['09', 'Classify Export', 'Customer type is Unknown / Date Range / Lifetime; only Lifetime + date_to writes monthly snapshots.'],
            ['10', 'Overwrite Current', 'Overwrite customers + customer_metrics so Dashboard defaults to the latest member state.'],
            ['11', 'Monthly Snapshot', 'Write customer_metrics_monthly to preserve Lifetime batch boundaries and monthly trends.'],
          ],
        },
        {
          label: 'UNIFIED OUTPUT',
          title: 'Unified output and maintenance',
          tone: 'neutral',
          nodes: [
            ['12', 'daily_report.db', 'SQLite stores clean data, current member metrics, transactions, bank details, and monthly snapshots, then refreshes dashboard_cache.json.'],
            ['13', 'Dashboard', 'Reads SQLite / cache and renders Performance, Members, Channels, Trends, and Brand Comparison.'],
            ['14', 'Excel Export', 'export_wide.py or /api/export/wide outputs the familiar wide Excel; CRM / Audit can also export.'],
            ['15', 'Tier Maintenance', 'tier_data.py marks rows older than 6 months as warm; queries and exports still read all data while preparing cloud partitioning.'],
          ],
        },
      ];
  const convertRows = isZh
    ? [
        ['Bank Detail JSON → bank_details', 'scripts/build_db.py · insert_bank_details()', '后台 ETL 把 Customer Excel 的 Bank Detail JSON 拆成独立银行账户表；坏 JSON 会写入 bank_details_errors.csv。'],
        ['API upload → SQLite', 'scripts/backend.py · /api/upload', '本地后端接收原始 Excel，调用 import_customer_export.py / import_transactions.py 写入 daily_report.db，再刷新 dashboard_cache.json。'],
        ['Browser upload → bank_details', 'assets/sqlite_loader.js · writeBrand()', 'Dashboard 内上传 Excel 时，也会把 Bank Detail 拆进 SQLite 的 bank_details。'],
        ['Customer row normalize', 'assets/app.js · normalizeCustomer()', '前端 fallback 模式会标准化 Customer 字段，并用 Deposit Total + Withdaw Total 计算 Win Loss。'],
        ['Transaction row normalize', 'assets/app.js · normalizeTransaction()', '前端 fallback 模式会标准化交易 ID、金额、日期、状态和用户资料。'],
      ]
    : [
        ['Bank Detail JSON → bank_details', 'scripts/build_db.py · insert_bank_details()', 'Backend ETL splits Customer Excel Bank Detail JSON into a separate bank account table; bad JSON goes to bank_details_errors.csv.'],
        ['API upload → SQLite', 'scripts/backend.py · /api/upload', 'The local backend receives raw Excel files, calls import_customer_export.py / import_transactions.py, writes daily_report.db, then refreshes dashboard_cache.json.'],
        ['Browser upload → bank_details', 'assets/sqlite_loader.js · writeBrand()', 'When Excel is uploaded inside the dashboard, Bank Detail is also split into SQLite bank_details.'],
        ['Customer row normalize', 'assets/app.js · normalizeCustomer()', 'Frontend fallback mode normalizes Customer fields and derives Win Loss as Deposit Total + Withdaw Total.'],
        ['Transaction row normalize', 'assets/app.js · normalizeTransaction()', 'Frontend fallback mode normalizes transaction ID, amount, dates, status, and user profile fields.'],
      ];
  const sqliteTables = isZh
    ? [
        ['customers', '会员基本资料'],
        ['bank_details', '银行资料，拆自 Bank Detail JSON'],
        ['transactions', '交易明细，带 tier 列：hot / warm'],
        ['customer_exports', 'Customer 上传批次'],
        ['customer_export_metrics', '每个批次的会员统计，带 tier 列'],
        ['customer_metrics_monthly', 'Lifetime 月度快照'],
      ]
    : [
        ['customers', 'Member attributes'],
        ['bank_details', 'Bank accounts parsed from Bank Detail JSON'],
        ['transactions', 'Transaction records with tier column: hot / warm'],
        ['customer_exports', 'Customer upload batches'],
        ['customer_export_metrics', 'Member metrics per batch with tier column'],
        ['customer_metrics_monthly', 'Lifetime monthly snapshots'],
      ];
  const optimization = isZh
    ? [
        ['当前瓶颈', 'Classic-script 全局协作仍存在加载顺序风险；会员分析的 risk、retention、bucket 仍重；Customer 最新状态、批次记录和 lifetime snapshot 的边界不能被优化破坏。'],
        ['已做优化', 'derivedMetricsCache、dashboard_cache.json、SQLite 规范化、分页窗口、局部刷新、页面拆分、reduced-motion 反馈已经落地。'],
        ['后续优先级', '继续把更重的聚合推进 SQLite / backend；补轻量 browser smoke test；系统性验证 390px / tablet / desktop 下的上传、报表、会员、渠道、趋势和 System Flow。'],
      ]
    : [
        ['Current bottlenecks', 'Classic-script globals still carry load-order risk; risk, retention, and bucket calculations remain heavy; Customer current state, import batches, and lifetime snapshots cannot be merged for speed.'],
        ['Completed optimizations', 'derivedMetricsCache, dashboard_cache.json, normalized SQLite, paged table windows, local refreshes, page splitting, and reduced-motion feedback are already in place.'],
        ['Live next priorities', 'Push heavier aggregation into SQLite/backend, add lightweight browser smoke tests, and verify Upload, Performance, Members, Channels, Trends, and System Flow at 390px / tablet / desktop.'],
      ];

  return (
    <div className="page-shell etreport-page etreport-product-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={projectsHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-store-hero">
            <div className="etreport-store-icon"><ProjectsEtReportCssIcon label="ETReportHub CSS app icon" /></div>
            <div className="etreport-store-intro">
              <p className="etreport-kicker">{isZh ? '数据分析 · 商业工具' : 'Data Analytics · Business Tool'}</p>
              <h1>ETReportHub</h1>
              <p className="etreport-store-tagline">{isZh ? '把每日 Excel 变成清楚的运营判断。' : 'Turn daily Excel into clear operating decisions.'}</p>
              <p className="etreport-store-byline">{isZh ? '由 Eden Tan 设计与构建' : 'Designed and built by Eden Tan'}</p>
              <div className="etreport-store-actions">
                <a href={salesHref} className="etreport-store-get">{isZh ? '查看方案' : 'View offer'}</a>
                <a href="#flow-map" className="etreport-text-cta">{isZh ? '了解系统' : 'Explore system'} <span aria-hidden>›</span></a>
              </div>
            </div>
          </header>

          <div className="etreport-store-facts" aria-label={isZh ? '产品资料' : 'Product information'}>
            <div><span>{isZh ? '工作流' : 'Workflow'}</span><strong>{isZh ? '每日上传' : 'Daily ingest'}</strong></div>
            <div><span>{isZh ? '存储' : 'Storage'}</span><strong>Local SQLite</strong></div>
            <div><span>{isZh ? '输出' : 'Outputs'}</span><strong>Dashboard + CRM</strong></div>
            <div><span>{isZh ? '部署' : 'Deployment'}</span><strong>{isZh ? '私有环境' : 'Private environment'}</strong></div>
          </div>

          <section className="etreport-store-gallery" aria-label={isZh ? '产品界面预览' : 'Product interface previews'}>
            {[
              [isZh ? '今天的业务，一眼看懂。' : 'See today’s business at a glance.', 'performance'],
              [isZh ? '找到需要行动的会员。' : 'Find the members who need action.', 'members'],
              [isZh ? '让渠道表现可以比较。' : 'Make channel performance comparable.', 'channels'],
            ].map(([caption, tone], index) => (
              <article className={`etreport-store-shot etreport-store-shot-${tone}`} key={tone}>
                <p>{caption}</p>
                <div className="etreport-shot-window" aria-hidden="true">
                  <div className="etreport-shot-sidebar"><i /><i /><i /><i /></div>
                  <div className="etreport-shot-canvas"><span>ETReportHub</span><b /><b /><b /><em /><em /></div>
                </div>
                <small>0{index + 1}</small>
              </article>
            ))}
          </section>

          <section className="etreport-console-panel">
            <div className="etreport-console-copy">
              <p className="etreport-kicker">{isZh ? '60 秒看懂这个系统' : '60-second tour'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '把每天两份 Excel，变成可复盘的运营层。' : 'Two daily Excel files become a reviewable operating layer.'}
              </h2>
              <p>
                {isZh
                  ? 'Transaction 负责真实交易流水，Customer 负责当前会员状态。系统把它们写进 SQLite，生成 Dashboard、趋势、会员分析、渠道分析和老板熟悉的 Excel 导出。'
                  : 'Transaction carries the real ledger. Customer carries current member state. The system writes both into SQLite, then generates dashboards, trends, member analysis, channel analysis, and familiar Excel exports.'}
              </p>
            </div>
            <div className="etreport-console-metrics">
              {[
                ['Input', 'Transaction + Customer Excel'],
                ['Storage', 'daily_report.db + dashboard_cache.json'],
                ['Reports', 'Performance / Members / Channels / Trends'],
                ['Export', 'CRM CSV / Wide Excel / Audit CSV'],
              ].map(([label, value]) => (
                <div key={label} className="etreport-console-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section id="flow-map" className="etreport-section py-16 md:py-24">
            <div className="etreport-tour-grid">
              {tour.map(([emoji, title, body]) => (
                <article key={title} className="etreport-value-card etreport-tour-card">
                  <div className="etreport-tour-emoji">{emoji}</div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="etreport-callout mt-8">
              {isZh
                ? '一句话总结：把 Excel 变成报表，数据存自己电脑；每天上传 Customer 会更新当前会员状态，Transaction 继续按交易 ID 去重叠加。'
                : 'In one line: Excel becomes reports and data stays on your computer; daily Customer uploads update current member state while Transactions keep append/upsert semantics.'}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '1. 系统目的' : '1. System Purpose'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? 'Excel 进来，SQLite 接住，Dashboard 输出判断。' : 'Excel comes in, SQLite holds it, Dashboard turns it into judgment.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '这个系统把 Admin 每天上传的 Excel 数据转换成结构化 SQLite 数据库，然后 Dashboard 从数据库读取数据，生成 Daily Report、Weekly Report、Overall Report、Member Analysis 和导出报表。'
                  : 'This system converts the daily Excel files uploaded by admins into a structured SQLite database. The dashboard then reads from that database to generate Daily, Weekly, Overall, Member Analysis, and export reports.'}
              </p>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '当前功能地图' : 'Current Feature Map'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '每个页面都有明确的数据责任。' : 'Every page owns a clear data responsibility.'}
              </h2>
            </div>
            <div className="etreport-table-wrap mt-12">
              <table className="etreport-system-table">
                <thead>
                  <tr>
                    <th>{isZh ? '模块' : 'Module'}</th>
                    <th>{isZh ? '核心功能' : 'Core features'}</th>
                    <th>{isZh ? '关键规则 / 输出' : 'Rules / outputs'}</th>
                  </tr>
                </thead>
                <tbody>
                  {featureMap.map(([module, features, rules]) => (
                    <tr key={module}>
                      <td><strong>{module}</strong></td>
                      <td>{features}</td>
                      <td>{rules}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="rules" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '当前业务规则' : 'Current Business Rules'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '这些规则比 UI 表象更重要，不能随意改。' : 'These rules matter more than the UI surface and must not drift.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {businessRules.map(([title, body]) => (
                <article key={title} className="etreport-proof-card">
                  <p className="etreport-card-eyebrow">{title}</p>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Daily Upload Flow' : 'Daily Upload Flow'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '日常导入只守住两个边界。' : 'Daily import keeps two boundaries clean.'}
              </h2>
            </div>
            <div className="etreport-table-wrap mt-12">
              <table className="etreport-system-table">
                <thead>
                  <tr>
                    <th>{isZh ? '层' : 'Layer'}</th>
                    <th>{isZh ? '每天上传时发生什么' : 'What happens on daily upload'}</th>
                    <th>{isZh ? '为什么需要' : 'Why it matters'}</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyUpload.map(([layer, action, why]) => (
                    <tr key={layer}>
                      <td><strong>{layer}</strong></td>
                      <td>{action}</td>
                      <td>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '运营闭环' : 'Operating Loop'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '从每日上传到 campaign 下载。' : 'From daily upload to campaign-ready exports.'}
              </h2>
            </div>
            <div className="etreport-table-wrap mt-12">
              <table className="etreport-system-table">
                <thead>
                  <tr>
                    <th>{isZh ? '步骤' : 'Step'}</th>
                    <th>{isZh ? '操作' : 'Action'}</th>
                    <th>{isZh ? '系统反馈' : 'System response'}</th>
                    <th>{isZh ? '下一步' : 'Next action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {operatingLoop.map(([step, action, response, next]) => (
                    <tr key={step}>
                      <td><strong>{step}</strong></td>
                      <td>{action}</td>
                      <td>{response}</td>
                      <td>{next}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '系统架构总览图' : 'System Architecture Flow'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '上传、存储、报表和导出的完整数据流。' : 'Full data flow across upload, storage, reporting, and export.'}
              </h2>
            </div>
            <div className="etreport-flow-board mt-12">
              {[
                ['01', isZh ? '输入' : 'Input', isZh ? 'Admin 上传 Excel，系统优先走本地 API；没有后端时才落到浏览器 fallback。' : 'Admins upload Excel files. The system prefers the local API and uses browser fallback only when needed.'],
                ['02', 'Transaction', isZh ? '按 brand_id + transaction_id 叠加 / 更新，重复上传不会重复计算。' : 'Append/upsert by brand_id + transaction_id so repeated uploads do not double count.'],
                ['03', 'Customer', isZh ? 'Customer 是 Lifetime；更新当前会员状态，并按 date_to 保留月度趋势快照。' : 'Customer is Lifetime; update current member state and keep monthly trend snapshots by date_to.'],
                ['04', isZh ? '输出' : 'Output', isZh ? 'SQLite 与 dashboard_cache 汇总后，供 Dashboard、分析页和 Excel 导出使用。' : 'SQLite plus dashboard_cache feed the Dashboard, analysis pages, and Excel export.'],
                ['05', isZh ? '维护' : 'Maintenance', isZh ? '每月跑 tier_data.py，把 6 个月以上旧行标记为 warm；查询与导出仍看全表。' : 'Run tier_data.py monthly to mark rows older than 6 months as warm; queries and exports still see the full table.'],
              ].map(([step, title, body]) => (
                <article key={step} className="etreport-flow-node">
                  <span>{step}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '完整节点图' : 'Complete Node Map'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '把原始 System Flow 的节点完整放回页面。' : 'The original System Flow nodes, kept intact in Eden’s layout.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? '这张 map 不是 UI 装饰，而是系统边界：哪些数据可以叠加、哪些数据只能覆盖、哪些地方做转换、哪些输出必须可审计。'
                  : 'This map is not decoration. It defines the system boundary: what can append, what must overwrite, where conversion happens, and which outputs must remain auditable.'}
              </p>
            </div>
            <div className="etreport-node-map mt-12">
              {completeNodeMap.map((group) => (
                <article key={group.label} className={`etreport-node-column etreport-node-column-${group.tone}`}>
                  <div className="etreport-node-column-head">
                    <span>{group.label}</span>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="etreport-node-list">
                    {group.nodes.map(([step, title, body]) => (
                      <div key={`${group.label}-${step}`} className="etreport-node-item">
                        <span className="etreport-node-step">{step}</span>
                        <div>
                          <h4>{title}</h4>
                          <p>{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '流程细节' : 'Flow Details'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '每个分支的实际处理规则。' : 'Processing rules for each branch.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {flowBranches.map(([title, body]) => (
                <article key={title} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Convert 发生在哪里' : 'Where Convert Happens'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? 'Excel 原始字段进入 SQLite 前会先被标准化。' : 'Raw Excel fields are normalized before entering SQLite.'}
              </h2>
            </div>
            <div className="etreport-table-wrap mt-12">
              <table className="etreport-system-table">
                <thead>
                  <tr>
                    <th>{isZh ? '转换内容' : 'Conversion'}</th>
                    <th>{isZh ? '位置' : 'Location'}</th>
                    <th>{isZh ? '说明' : 'Notes'}</th>
                  </tr>
                </thead>
                <tbody>
                  {convertRows.map(([conversion, location, notes]) => (
                    <tr key={conversion}>
                      <td><strong>{conversion}</strong></td>
                      <td><code>{location}</code></td>
                      <td>{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-faq-panel">
              <div>
                <p className="etreport-kicker">{isZh ? 'SQLite + Win Loss' : 'SQLite + Win Loss'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '主表、分层存储和核心公式。' : 'Main tables, tiered storage, and the core formula.'}
                </h2>
                <p>
                  {isZh
                    ? '默认 tier=hot；scripts/tier_data.py 把 6 个月以上旧数据标记为 warm。所有查询/导出默认看全表，行为不变，为将来上云的分区/压缩预留。'
                    : 'Default tier=hot; scripts/tier_data.py marks rows older than 6 months as warm. All queries/exports read the full table by default, preserving behavior while preparing for future cloud partitioning/compression.'}
                </p>
              </div>
              <div className="etreport-faq-list">
                {sqliteTables.map(([table, meaning]) => (
                  <article key={table} className="etreport-faq-item">
                    <h3 className="font-display text-2xl font-bold tracking-tight"><code>{table}</code></h3>
                    <p>{meaning}</p>
                  </article>
                ))}
                <article className="etreport-faq-item">
                  <h3 className="font-display text-2xl font-bold tracking-tight">Company Win Loss = Deposit Total + Withdaw Total</h3>
                  <p>{isZh ? 'Withdraw 在数据里是负数，所以这里使用加法。Excel 的 Win Loss 只作为后台校验参考。' : 'Withdraw is stored as a negative value, so the formula uses addition. Excel Win Loss is only a backend validation reference.'}</p>
                </article>
              </div>
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '系统优化路线图' : 'System Optimization Roadmap'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '当前瓶颈、已完成优化和仍待处理的真实优先级。' : 'Current bottlenecks, completed work, and live priorities.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {optimization.map(([title, body]) => (
                <article key={title} className="etreport-audience-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="etreport-section pb-20 pt-10">
            <div className="etreport-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '这不是单页说明。它是系统边界。' : 'This is not a one-page explainer. It is the system boundary.'}
              </h2>
              <p>
                {isZh
                  ? 'System Flow 的价值是把数据语义、导入规则、报表边界、导出逻辑和未来优化路径写清楚。Eden 站这里只负责把它讲得更清楚、更像一个可对外展示的产品系统。'
                  : 'The value of System Flow is making data semantics, import rules, report boundaries, export logic, and future optimization paths explicit. This Eden page keeps that logic, but presents it as a public product system.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={salesHref} className="etreport-text-cta">
                  {isZh ? '看售卖页' : 'View sales page'} <span aria-hidden>›</span>
                </a>
                <a href={projectsHref} className="etreport-text-cta">
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
