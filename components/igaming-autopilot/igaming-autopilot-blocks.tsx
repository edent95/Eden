/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Body of /igaming-ai: the Jiju closed-loop engine offered to B2B iGaming companies (game providers,
// aggregators, platforms) — merchants/operators, provider games, promotions, CS and reporting (owner,
// 2026-11-26). Told buyer-first like /jiju-autopilot: problems → one loop → traditional team → what it is
// worth → proof → modules. Honest status: the engine runs today on Jiju; the iGaming modules are built to
// the buyer's process. The case rests only on the directory bridge (owner, 2026-11-26): Jiju's places /
// merchants / events / promotions map onto provider / merchant, provider information, provider promotion
// and merchant brand — do not cite the owner's iGaming résumé, years or case studies here. Salaries:
// JobStreet Malaysia role pages read 2026-11-26. Examples and the field grid's failing squares are
// illustrative and marked.

import React from 'react';
import { DirectoryMap } from './DirectoryMap';
import { IgDashboard, IgLayers, IgLevels } from './DashboardFigures';
import {
  BadgeCheck, BarChart3, Bot, CalendarCheck, Database, Gamepad2, Gift, HeartPulse, Inbox, KeyRound,
  Layers, LayoutDashboard, MessageCircle, Repeat, ShieldCheck, UserPlus, Users, Wrench,
} from 'lucide-react';
import type { EpBlock, EpText } from '../ProductStorePage';
import { IGamingAutopilotArt } from '../css-art/igaming-autopilot-art';
import { SsFlow, SsGlossary, SsHero } from '../system-story/SystemStory';
import {
  ApCompare, ApFieldGrid, ApFlip, ApLoop, ApMachineDeck, ApMatrix, ApProblems, ApPublishGate, ApSteps,
  ApTeamCost, type ApMachine, type ApMatrixCol,
} from '../jiju-autopilot/AutopilotFigures';

const t = (en: string, zh: string): EpText => ({ en, zh });
const heading = (id: string, isZh: boolean, text: EpText): EpBlock => ({ kind: 'node', node: <h2 id={id}>{isZh ? text.zh : text.en}</h2> });
const lead = (isZh: boolean, text: EpText) => <p className="jap-lead">{isZh ? text.zh : text.en}</p>;

const RUNNING = t('Running today on Jiju', '已在 Jiju 运行');
const BUILT = t('Built to your process', '按你的流程搭');

const DIM = {
  onboard: t('Onboarding', '接入'),
  catalogue: t('Game catalogue', '游戏目录'),
  promo: t('Promotions', '促销'),
  support: t('Support', '客服'),
  report: t('Reporting', '报表'),
  health: t('Account health', '账户健康'),
  upkeep: t('Upkeep', '维护'),
};

const COLS: ApMatrixCol[] = [
  { id: 'onboard', icon: <UserPlus size={14} />, name: t('Operator onboarding', 'Operator 接入') },
  { id: 'catalogue', icon: <Gamepad2 size={14} />, name: t('Game catalogue sync', '游戏目录同步') },
  { id: 'promo', icon: <Gift size={14} />, name: t('Promotion launcher', '促销发布') },
  { id: 'cs', icon: <MessageCircle size={14} />, name: t('Support assistant', '客服助手') },
  { id: 'report', icon: <BarChart3 size={14} />, name: t('Reporting', '报表') },
  { id: 'watch', icon: <HeartPulse size={14} />, name: t('Account watch', '账户巡查') },
  { id: 'door', icon: <KeyRound size={14} />, name: t('One locked door (MCP)', '一扇上锁的门（MCP）') },
  { id: 'control', icon: <Wrench size={14} />, name: t('Control room', '控制室') },
];

const modules = (isZh: boolean): ApMachine[] => [
  {
    id: 'onboard', hue: 'amber', icon: <UserPlus size={18} />, name: t('Operator onboarding', 'Operator 接入'), solves: [DIM.onboard, DIM.catalogue], status: BUILT, live: false,
    text: t(
      'A signed operator is a checklist, not a chat thread. Each item is confirmed once, in one place, and the operator goes live by itself the moment the list is complete — the same gate that publishes a place on Jiju.',
      '签下的 operator 是一张清单，不是一串聊天记录。每一项只在一个地方确认一次，清单齐了，这家 operator 自己上线 —— 和 Jiju 自动上架地点的是同一道闸。',
    ),
    detail: <ApPublishGate isZh={isZh} title={t('The go-live check for one operator', '一个 operator 的上线检查')} live={t('Live for this operator', '这家 operator 上线')} items={[
      { name: t('Commercial terms', '商务条款'), rule: t('signed, and the version is the one on file', '已签，而且是存档的那一版') },
      { name: t('Markets & currencies', '市场与币种'), rule: t('every market and currency switched on and displaying correctly', '每个市场、币种都开了，显示正确') },
      { name: t('Game list', '游戏清单'), rule: t('the agreed game IDs, configured on their side', '约定的 game ID，对方已配置') },
      { name: t('Integration test', '对接测试'), rule: t('wallet and launch tested in staging, then production', '钱包与开游戏在测试环境、正式环境都测过') },
      { name: t('Contacts & limits', '联系人与上限'), rule: t('who to call, caps and max payout written down', '找谁、上限、最高支付写清楚') },
    ]} caption={t(
      'Illustrative checklist; the items are yours to set. The gate itself is Jiju’s auto-publish rule — a place goes live once name, hours, description, photos and location are all there — running today.',
      '示意清单，项目由你定。闸本身就是 Jiju 的自动上架规则 —— 名字、营业时间、说明、照片、位置五项齐了，地点就自己上架 —— 现在就在跑。',
    )} />,
  },
  {
    id: 'catalogue', hue: 'sky', icon: <Gamepad2 size={18} />, name: t('Game catalogue sync', '游戏目录同步'), solves: [DIM.catalogue], status: BUILT, live: false,
    text: t(
      'A new release, a changed ID or a retired game reaches every operator’s list the same day, with assets attached — instead of living in one account manager’s inbox.',
      '新游戏、改了的 ID、下架的游戏，当天就到每家 operator 的清单里，素材一起附上 —— 而不是躺在某个客户经理的收件箱里。',
    ),
    detail: <SsFlow isZh={isZh} title={t('A new game, to every operator', '一款新游戏，送到每家 operator')} ariaLabel={t(
      'Flowchart: a studio release enters the catalogue. If game ID, RTP, markets or assets are missing it waits and the studio is asked for exactly the missing item. If complete, each operator is checked: if the operator does not take that market or currency it is skipped; otherwise the game is added to its list with assets and the operator is told. A retired game follows the same path in reverse.',
      '流程图：工作室发布的新游戏进入目录。game ID、RTP、市场或素材缺一样，就停住，只向工作室要缺的那一项。齐了就逐家检查 operator：不做那个市场或币种就跳过；否则加进它的清单、附上素材并通知。下架的游戏反过来走同一条路。',
    )} caption={t('Made-up examples.', '示意，例子是虚构的。')} nodes={[
      { id: 'in', kind: 'start', text: t('A release enters the catalogue', '新游戏进入目录') },
      { id: 'complete', kind: 'ask', text: t('Game ID, RTP, markets and assets all there?', 'game ID、RTP、市场、素材都齐？'), down: t('Yes', '齐'), side: { id: 'ask', label: t('No', '不齐'), text: t('Wait; ask the studio for exactly what is missing', '停住，只向工作室要缺的那项') } },
      { id: 'fit', kind: 'ask', text: t('Does this operator take that market and currency?', '这家 operator 做这个市场和币种？'), down: t('Yes', '做'), side: { id: 'skip', label: t('No', '不做'), text: t('Skipped for this operator', '这家跳过') } },
      { id: 'add', kind: 'step', text: t('Added to its list, assets attached', '加进清单，附上素材') },
      { id: 'tell', kind: 'end', text: t('Operator told the same day', '当天通知 operator') },
    ]} examples={[
      { title: t('Example 1 · a slot with everything ready', '例子 1 · 资料齐全的老虎机'), path: ['in', 'complete', 'fit', 'add', 'tell'] },
      { title: t('Example 2 · a release missing its banner sizes', '例子 2 · 缺横幅尺寸的新游戏'), path: ['in', 'complete', 'ask'] },
      { title: t('Example 3 · an operator outside that market', '例子 3 · 不做那个市场的 operator'), path: ['in', 'complete', 'fit', 'skip'] },
    ]} />,
  },
  {
    id: 'promo', hue: 'coral', icon: <Gift size={18} />, name: t('Promotion launcher', '促销发布'), solves: [DIM.promo, DIM.report], status: BUILT, live: false,
    text: t(
      'One master campaign, one variant per operator, and one place where status lives. A variant cannot launch until its eight fields are confirmed; the account manager only hears about the field that is missing.',
      '一个主活动、每家一个变体、一个唯一的状态来源。变体的八个字段没确认完就上不了线；客户经理只会收到「缺哪一个字段」。',
    ),
    detail: <SsFlow isZh={isZh} title={t('One campaign, many operators', '一个活动，很多 operator')} ariaLabel={t(
      'Flowchart: a master campaign is created and a variant is made for each operator. For each variant, if any of the eight fields is not confirmed, the account manager gets a task naming that field. If limits and rules are not in the terms, it waits for a person. Otherwise the variant launches, the operator is told, and the uptake is reported daily.',
      '流程图：建主活动，为每家 operator 生成变体。每个变体八个字段有任何一个没确认，客户经理收到一个写明那个字段的任务。上限和规则还没写进条款，就等人处理。否则变体上线、通知 operator，每天报告参与情况。',
    )} caption={t(
      'Made-up examples. The eight fields — operator/brand, market, currency, eligible games, dates and time zone, funding and caps, max payout and rules, assets — are the promotion’s directory fields, like a deal’s start date, end date and terms on Jiju.',
      '示意，例子是虚构的。八个字段（operator / 品牌、市场、币种、适用游戏、日期与时区、出资与上限、最高支付与规则、素材）就是这个活动在名录里的栏位，和 Jiju 上一个优惠的开始日、截止日、条件是同一回事。',
    )} nodes={[
      { id: 'master', kind: 'start', text: t('Master campaign created', '建主活动') },
      { id: 'variant', kind: 'step', text: t('One variant per operator', '每家 operator 一个变体') },
      { id: 'fields', kind: 'ask', text: t('All eight fields confirmed?', '八个字段都确认了？'), down: t('Yes', '是'), side: { id: 'task', label: t('No', '否'), text: t('Task to the account manager, naming the missing field', '给客户经理一个任务，写明缺的字段') } },
      { id: 'terms', kind: 'ask', text: t('Limits and rules written into the T&C?', '上限与规则写进条款了？'), down: t('Yes', '是'), side: { id: 'person', label: t('No', '否'), text: t('Waits for a person', '等人处理') } },
      { id: 'launch', kind: 'step', text: t('Launch; operator told', '上线，通知 operator') },
      { id: 'report', kind: 'end', text: t('Uptake reported every day', '每天报告参与情况') },
    ]} examples={[
      { title: t('Example 1 · a free-spin drop, everything confirmed', '例子 1 · 免费局活动，全部确认'), path: ['master', 'variant', 'fields', 'terms', 'launch', 'report'] },
      { title: t('Example 2 · an operator whose currency was not switched on', '例子 2 · 币种没开的 operator'), path: ['master', 'variant', 'fields', 'task'] },
      { title: t('Example 3 · a cap agreed in chat but not in the terms', '例子 3 · 上限只在聊天里谈好、没进条款'), path: ['master', 'variant', 'fields', 'terms', 'person'] },
    ]} />,
  },
  {
    id: 'cs', hue: 'rose', icon: <MessageCircle size={18} />, name: t('Support assistant', '客服助手'), solves: [DIM.support], status: RUNNING, live: true,
    text: t(
      'Questions from operators come into one inbox. Rules read them first; a small model only picks a reviewed answer, always sent in fixed wording. Integration problems go to the tech owner, and anything about money or a complaint goes to a person — with a clock on it.',
      'operator 的问题都进同一个收件箱。先用规则读；小模型只负责挑一个审过的答案，永远用固定措辞回。对接问题转给技术负责人，凡是涉及钱或投诉的转给人 —— 而且有计时。',
    ),
    detail: <SsFlow isZh={isZh} title={t('One question from an operator', '一个来自 operator 的问题')} ariaLabel={t(
      'Flowchart: a message arrives. If it is about money, a dispute or a complaint it goes straight to a person with a timer. If it matches a reviewed FAQ, the fixed answer is sent. If it is an integration error, it goes to the tech owner with the logs attached. Otherwise it goes to the account manager. Every thread is closed only when the operator confirms.',
      '流程图：收到一条消息。涉及钱、争议或投诉，直接转人并开始计时。符合审过的常见问题，就发固定答案。是对接错误，就附上日志转给技术负责人。其他的转给客户经理。每条对话要等 operator 确认才关闭。',
    )} caption={t(
      'Made-up examples. The pattern — rules first, a small model choosing from fixed answers, money and complaints always to a person — is how Jiju’s WhatsApp assistant Hermes handles shop owners today.',
      '示意，例子是虚构的。「先规则、小模型只挑固定答案、钱和投诉一律转人」这套做法，就是 Jiju 的 WhatsApp 助手 Hermes 现在处理店主的方式。',
    )} nodes={[
      { id: 'in', kind: 'start', text: t('A message arrives', '收到一条消息') },
      { id: 'money', kind: 'ask', text: t('About money, a dispute or a complaint?', '涉及钱、争议或投诉？'), down: t('No', '否'), side: { id: 'human', label: t('Yes', '是'), text: t('Straight to a person, timer on', '直接转人，开始计时') } },
      { id: 'faq', kind: 'ask', text: t('Matches a reviewed answer?', '符合审过的答案？'), down: t('No', '否'), side: { id: 'answer', label: t('Yes', '是'), text: t('Fixed answer sent', '发固定答案') } },
      { id: 'tech', kind: 'step', text: t('Integration error → tech owner, logs attached; anything else → account manager', '对接错误 → 技术负责人，附日志；其他 → 客户经理') },
      { id: 'close', kind: 'end', text: t('Closed only when the operator confirms', 'operator 确认才关闭') },
    ]} examples={[
      { title: t('Example 1 · “What is the RTP of this game?”', '例子 1 ·「这款游戏的 RTP 是多少？」'), path: ['in', 'money', 'faq', 'answer'] },
      { title: t('Example 2 · a launch error after an update', '例子 2 · 更新后开游戏报错'), path: ['in', 'money', 'faq', 'tech', 'close'] },
      { title: t('Example 3 · a disputed campaign payout', '例子 3 · 对活动奖金有争议'), path: ['in', 'money', 'human'] },
    ]} />,
  },
  {
    id: 'report', hue: 'iris', icon: <BarChart3 size={18} />, name: t('Reporting', '报表'), solves: [DIM.report, DIM.health], status: RUNNING, live: true,
    text: t(
      'Numbers are pulled every day, per operator and per game, and the monthly brand report writes its own first draft. The question a report answers is “what moved, why, and who acts next” — not “here is a table”.',
      '数字每天按 operator、按游戏拉一次，每月的品牌报表自己写出初稿。报表要回答的是「什么变了、为什么、下一步谁行动」—— 而不是「这是一张表」。',
    ),
    detail: <ApSteps isZh={isZh} items={[
      { title: t('Every day', '每天'), text: t('Turnover, GGR / NGR, active players and campaign uptake, per operator and per game. Sources are read on a schedule, like the dashboard already reads Search Console, Bing and GA4 every day.', '流水、GGR / NGR、活跃玩家、活动参与，按 operator、按游戏。按时间表读来源，就像面板现在每天读 Search Console、Bing 和 GA4。') },
      { title: t('Every month', '每月'), text: t('A draft brand report: what moved, the likely reason, and one named next step per account. A person edits and sends it.', '品牌报表初稿：什么变了、可能的原因、每个客户一个写明负责人的下一步。人改过再发。') },
      { title: t('On one chain', '同一条链'), text: t('Campaign → uptake → turnover → cost on one line, so you can see which layer broke.', '活动 → 参与 → 流水 → 成本放在同一条线上，才看得出哪一层断了。') },
    ]} />,
  },
  {
    id: 'watch', hue: 'leaf', icon: <HeartPulse size={18} />, name: t('Account watch', '账户巡查'), solves: [DIM.health], status: RUNNING, live: true,
    text: t(
      'Every week each operator is compared with its own recent weeks. A drop, a spike in errors or a campaign about to end becomes a task with the numbers attached — before month-end, not after.',
      '每周把每家 operator 和它自己最近几周比。掉量、错误突然变多、活动快结束，都变成一个附上数字的任务 —— 在月底之前，不是之后。',
    ),
    detail: <SsFlow isZh={isZh} title={t('The weekly account sweep', '每周的账户巡查')} ariaLabel={t(
      'Flowchart: every week each operator is compared with its recent weeks. If nothing changed beyond the threshold nothing happens. If too many accounts would be flagged at once the run stops and alerts, because the data is more likely broken than the business. Otherwise the account manager gets a task with the numbers attached.',
      '流程图：每周把每家 operator 和它最近几周比。变化没超过门槛就什么都不做。一次要标记的客户太多，整次停下、发警报，因为更可能是数据坏了，而不是生意坏了。否则客户经理收到一个附上数字的任务。',
    )} caption={t(
      'Made-up examples; thresholds are yours to set. The brake — “too many changes in one run means stop and alert” — is the rule Jiju’s Monday closed-shop sweep runs on today.',
      '示意，例子是虚构的；门槛由你定。刹车规则「一次改太多就停下、发警报」就是 Jiju 每周一倒闭巡查现在用的规则。',
    )} nodes={[
      { id: 'week', kind: 'start', text: t('Weekly: each operator vs its own recent weeks', '每周：每家 operator 对比自己最近几周') },
      { id: 'moved', kind: 'ask', text: t('Moved past the threshold?', '变化超过门槛？'), down: t('Yes', '是'), side: { id: 'ok', label: t('No', '否'), text: t('Nothing happens', '什么都不做') } },
      { id: 'many', kind: 'ask', text: t('A normal number of flags this run?', '这次标记的数量正常？'), down: t('Yes', '是'), side: { id: 'stop', label: t('Too many', '太多'), text: t('Stop and alert — check the data first', '停下、发警报 —— 先查数据') } },
      { id: 'task', kind: 'end', text: t('Task to the account manager, numbers attached', '给客户经理一个任务，附上数字') },
    ]} examples={[
      { title: t('Example 1 · turnover down for three weeks', '例子 1 · 连续三周流水下滑'), path: ['week', 'moved', 'many', 'task'] },
      { title: t('Example 2 · a steady account', '例子 2 · 平稳的客户'), path: ['week', 'moved', 'ok'] },
      { title: t('Example 3 · a data feed that broke overnight', '例子 3 · 数据源夜里坏了'), path: ['week', 'moved', 'many', 'stop'] },
    ]} />,
  },
  {
    id: 'door', hue: 'iris', icon: <KeyRound size={18} />, name: t('One locked door (MCP)', '一扇上锁的门（MCP）'), solves: [DIM.upkeep], status: RUNNING, live: true,
    text: t(
      'No agent touches your data directly. Every bot and AI session goes through one set of tools, with its own key; every write is a plan first, and commercial terms are fields no bot can change.',
      '没有任何 agent 直接碰你的资料。所有 bot 和 AI 会话都经过同一套工具，各拿各的钥匙；每次写入先给计划，商务条款是 bot 改不了的栏位。',
    ),
    detail: <ApSteps isZh={isZh} items={[
      { title: t('Three kinds of key', '三种钥匙'), text: t('Read, write and admin; the name in the audit log comes from the key, not from what the client claims.', '只读、可写、管理员；审计日志里的名字来自钥匙本身，不是客户端自己报的。') },
      { title: t('Plan, then apply', '先计划，再执行'), text: t('A write returns a plan by default; only an explicit apply changes anything, and every call is kept.', '写入默认只回计划，明确 apply 才真的改，每次调用都保留。') },
      { title: t('Protected fields', '受保护的栏位'), text: t('Terms, caps and anything a person confirmed: a bot’s change becomes a question for a person.', '条款、上限、人确认过的东西：bot 想改，就变成一个等人决定的问题。') },
      { title: t('On Jiju today', 'Jiju 现在'), text: t('108 tools, used by every bot, script and AI session that touches Jiju’s data.', '108 个工具，所有碰 Jiju 资料的 bot、脚本和 AI 会话都经过它们。') },
    ]} />,
  },
  {
    id: 'control', hue: 'amber', icon: <Wrench size={18} />, name: t('Control room', '控制室'), solves: [DIM.upkeep, DIM.report], status: RUNNING, live: true,
    text: t(
      'One dashboard with three screens. Now: what waits for a person, one decision each. Record: one operator or campaign as a pipeline, with a checklist and a plain next step per role. Loops: what runs by itself, where it stopped, and how much of it is automatic.',
      '一个仪表台，三个画面。「现在」：什么在等人，每件一个决定。「对象」：一家 operator 或一个活动是一条流水线，带清单，每个角色看到一句清楚的下一步。「回路」：什么在自己跑、停在哪、自动到哪一档。',
    ),
    detail: <ApSteps isZh={isZh} items={[
      { title: t('Now', '现在'), text: t('Every item says who holds it. Only what a person must decide is on top; everything else is one quiet line below, and moves up by itself when it gets stuck.', '每件事都写明球在谁那里。只有必须由人决定的排在上面；其余在下面各占安静的一行，卡住了自己升上来。') },
      { title: t('Record', '对象'), text: t('A pipeline per operator and per campaign. Each role sees its own rows; a failed check is translated into one next step, not a code.', '每家 operator、每个活动一条流水线。每个角色只看自己那几格；没过的检查会翻成一句下一步，而不是一个代码。') },
      { title: t('Loops', '回路'), text: t('Every automation is registered as trigger → steps → verification. One that does not end in a verification is listed as not closed yet — honestly.', '每条自动化都登记成「触发 → 步骤 → 验收」。没有以验收收尾的，老实标成「还没闭上」。') },
      { title: t('Underneath', '底下'), text: t('A scheduler runs every job, heavy AI work at night only, with spending caps set by hand. Code fixes go fix → second-AI review → tests → merge: 2,381 changes merged by themselves between 18 Sep and 26 Nov 2026.', '排程跑所有任务，重的 AI 活只在夜里做，花费上限由人手设定。代码修复走「修 → 另一个 AI 审 → 测试 → 合并」：2026-09-18 至 11-26 共 2,381 个改动自己合并。') },
    ]} />,
  },
];

export const igamingAutopilotBlocks = (isZh: boolean, links: { jiju: string; drRacing: string }): EpBlock[] => [
  /* ------------------------------------------------------------ opening */
  { kind: 'p', text: t(
    'Jiju runs a directory: places, merchants, events and promotions. Every week shops open and close, hours change, a promotion starts and another one expires — and every listing has to stay true without a team behind it.',
    'Jiju 在经营一个名录：地点、店家、活动、优惠。每个星期都有店开、有店关，营业时间会改，这个优惠开始、那个优惠过期 —— 而每一条都要保持准确，背后没有一个团队。',
  ) },
  { kind: 'p', text: t(
    'Look at the B2B side of iGaming — a game provider, an aggregator, a platform — and it is the same directory under other names: providers and merchants instead of shops, provider information instead of opening hours, provider promotions instead of shop deals, merchant brands instead of shop logos. Same content, same chores, same loop.',
    '换到 iGaming 的 B2B —— 游戏供应商、聚合商、平台 —— 其实是同一个名录，只是换了名字：店家换成 provider / merchant，店家资料换成 provider information，店家优惠换成 provider promotion，店家品牌换成 merchant brand。内容一样、要做的事一样，跑的也是同一个闭环。',
  ) },
  { kind: 'node', node: <SsHero isZh={isZh} Art={IGamingAutopilotArt} label={t(
    'Illustration: a provider chip in the middle of a ring of eight operator screens; packets run out along the spokes and each screen ticks as it goes live; on the right one checklist ticks row by row, the last row waiting for a person, above a live pill.',
    '插画：provider 的筹码在中间，周围一圈八个 operator 屏幕；小圆点沿着辐条送出去，每个屏幕上线时打一个勾；右边一张清单逐行打勾，最后一行等人处理，下面是「已上线」。',
  )} caption={t('One provider, many operators, one checklist each — the loop sends, checks and watches; a person handles only the rows that need one.', '一个 provider、很多 operator、每家一张清单 —— 闭环负责送出、核对和巡查；人只处理真的需要人的那几行。')} /> },
  { kind: 'node', node: <DirectoryMap isZh={isZh} title={t('The same directory, two names for each row', '同一个名录，每一行换个名字')} heads={[t('Jiju directory', 'Jiju 名录'), t('Provider directory (iGaming B2B)', 'Provider 名录（iGaming B2B）')]} rows={[
    { id: 'who', hue: 'amber', jiju: t('Place / merchant', '地点 / 店家'), jijuNote: t('a café, a vet, a pet shop', '一家咖啡馆、兽医、宠物店'), igaming: t('Provider / merchant', 'Provider / merchant'), igamingNote: t('a game provider, an operator, a platform', '游戏供应商、operator、平台') },
    { id: 'info', hue: 'sky', jiju: t('Merchant details', '店家资料'), jijuNote: t('hours, address, photos, pet rules', '营业时间、地址、照片、携宠规则'), igaming: t('Provider information', 'Provider information'), igamingNote: t('games, markets, currencies, contacts', '游戏、市场、币种、联系人') },
    { id: 'promo', hue: 'coral', jiju: t('Promotions & events', '优惠与活动'), jijuNote: t('start date, end date, terms', '开始日、截止日、条件'), igaming: t('Provider promotion', 'Provider promotion'), igamingNote: t('campaign dates, caps, eligible games', '活动日期、上限、适用游戏') },
    { id: 'brand', hue: 'rose', jiju: t('Merchant brand', '店家品牌'), jijuNote: t('logo, name, official links', 'logo、店名、官方链接'), igaming: t('Merchant brand', 'Merchant brand'), igamingNote: t('logo, brand name, assets', 'logo、品牌名、素材') },
  ]} verbs={[t('Collect', '收资料'), t('Check', '核对'), t('Publish', '上架'), t('Update', '更新'), t('Expire', '过期下架')]} conclusion={t(
    'Every row goes through the same five steps — so the engine that keeps Jiju true can keep a provider directory true.',
    '每一行走的都是这五步 —— 所以让 Jiju 保持准确的引擎，也能让一个 provider 名录保持准确。',
  )} ariaLabel={t(
    'Mapping: Jiju place or merchant maps to provider or merchant; merchant details map to provider information; promotions and events map to provider promotion; merchant brand maps to merchant brand. Every row goes through the same steps: collect, check, publish, update, expire.',
    '对照：Jiju 的地点 / 店家对应 provider / merchant；店家资料对应 provider information；优惠与活动对应 provider promotion；店家品牌对应 merchant brand。每一行都走同样几步：收资料、核对、上架、更新、过期下架。',
  )} caption={t(
    'Left: what Jiju keeps today. Right: the same kinds of content on the iGaming B2B side; examples are generic.',
    '左边：Jiju 现在维护的内容。右边：iGaming B2B 那一边同类的内容；例子是通用的说法。',
  )} /> },
  { kind: 'node', node: <ApFlip isZh={isZh} sides={[
    { label: t('Traditional B2B team', '传统 B2B 团队'), tone: 'old', items: [
      { value: '7', text: t('people: account manager, integration, support, promotions, data, QA, coordinator', '个人：客户经理、对接、客服、促销、数据、QA、协调') },
      { value: 'RM 35,841', text: t('a month in salaries and employer contributions', '每月薪水加雇主缴款') },
      { value: isZh ? '聊天记录' : 'Chat history', text: t('is where the status of each operator lives', '就是每家 operator 状态所在的地方') },
    ] },
    { label: t('iGaming Ai', 'iGaming Ai'), tone: 'new', items: [
      { value: '1', text: t('person, plus one closed loop of machines', '个人，加一个由机器组成的闭环') },
      { value: 'RM 1,544', text: t('a month to run the same engine today', '每月，运行同一个引擎的现价') },
      { value: isZh ? '一个来源' : 'One source', text: t('of status, checked every day, that every person and bot reads', '的状态，每天核对，所有人和 bot 都读它') },
    ] },
  ]} caption={t(
    'Flips by itself; tap a side to hold it. Team: JobStreet Malaysia median pay for each role (read 26 Nov 2026) plus employer EPF, SOCSO and EIS. Engine: what Jiju’s engine costs to run today; your cloud bill depends on your volume. Details below.',
    '会自己切换；点一边可以停住。团队：JobStreet 马来西亚各职位月薪中位数（2026-11-26 读取），加雇主 EPF、SOCSO、EIS。引擎：Jiju 的引擎现在的运行成本；你的云端费用看你的量。细节在下面。',
  )} /> },
  { kind: 'stats', items: [
    { value: 944, unit: t('places', '家'), text: t('live in the Jiju directory, kept true by the engine (26 Nov 2026)', '在 Jiju 名录上线，由引擎保持准确（2026-11-26）') },
    { value: 2437, unit: t('places', '家'), text: t('found and tracked so far, live or not', '目前已发现、追踪，不论是否上线') },
    { value: 2381, unit: t('changes', '个改动'), text: t('merged by the engine itself after every check passed (Sep – Nov 2026)', '由引擎在检查全过后自己合并（2026 年 9–11 月）') },
  ] },

  /* ------------------------------------------------------------ three layers */
  heading('ig-engine', isZh, t('One engine, three layers', '一个引擎，三层')),
  { kind: 'node', node: lead(isZh, t(
    'iGaming Ai is an operation that runs by itself, stays in plain sight, and goes only as far as you let it. Strip any B2B operation down and it is records moving from one stage to the next. That leaves three questions — and each one already has a working answer in a live system.',
    'iGaming Ai 是一个会自己转、人看得见、放手有档位的运营系统。任何 B2B 运营拆到底，都是一条条记录从一个阶段走到下一个阶段。剩下的只有三个问题 —— 而每一个，都已经在一个正在跑的系统里有了答案。',
  )) },
  { kind: 'node', node: <IgLayers isZh={isZh} title={t('Three questions, three answers', '三个问题，三个答案')} runsLabel={t('Running today:', '现在跑在：')} items={[
    { id: 'loop', hue: 'amber', icon: <Repeat size={18} />, tag: t('Machines push', '机器推'), question: t('Who moves the record forward?', '谁把记录往前推？'), answer: t('Machines, in a closed loop: collect, check, publish, update, expire — and what the watch finds goes back to the start.', '机器，一个闭环：收资料、核对、上架、更新、过期下架 —— 巡查出来的问题回到起点。'), from: t('Jiju, a live directory', 'Jiju，一个正在营运的名录'), href: links.jiju },
    { id: 'people', hue: 'sky', icon: <Users size={18} />, tag: t('People take over', '人接手'), question: t('Where do people take over?', '人在哪里接手？'), answer: t('One pipeline per record. Each role sees only its own step, a checklist gates the hand-over, and a rejection becomes one plain next step.', '每条记录一条流水线。每个角色只看自己那一步，清单齐了才放行，被拒会翻成一句清楚的下一步。'), from: t('Dr Racing, a dealership’s daily tool', 'Dr Racing，一家车行每天在用的工具'), href: links.drRacing },
    { id: 'trust', hue: 'leaf', icon: <LayoutDashboard size={18} />, tag: t('You set the dial', '档位放权'), question: t('Where did it stop — and how much can I let go?', '哪里断了？我能放手多少？'), answer: t('Every item says who holds it. A stuck step becomes one decision. Each loop has a level — watch, propose, auto — and money never goes past propose.', '每件事都写明球在谁那里。卡住的一步变成一个决定。每条回路有档位 —— 只看、提议、自动 —— 涉及钱的永远不超过提议。'), from: t('my own operations dashboard, used every day', '我自己每天在用的运营面板') },
  ]} caption={t(
    'Three separate systems, all live. iGaming Ai puts the three layers on one set of records. Methods only: nothing from the dealership’s or my own data is shown on this page.',
    '三个各自独立、都在跑的系统。iGaming Ai 把这三层放到同一份记录上。只讲做法：这一页不放车行的资料，也不放我自己的资料。',
  )} /> },

  /* ------------------------------------------------------------ problems */
  heading('ig-problems', isZh, t('Six places a B2B iGaming team leaks time', 'B2B iGaming 团队漏掉时间的六个地方')),
  { kind: 'node', node: lead(isZh, t(
    'None of these is hard on its own. They are hard because each one is a chain of people, and every hand-off is a place to wait or to forget.',
    '这几件事单独拿出来都不难。难的是每一件都是一串人，每一次交接都是一个会等、会忘的地方。',
  )) },
  { kind: 'node', node: <ApProblems isZh={isZh} caption={t(
    'Illustrative. The 400 is arithmetic for an example campaign: 50 operators × 8 fields.',
    '示意。400 是按一个示例活动算的：50 个 operator × 8 个字段。',
  )} items={[
    { id: 'onboard', hue: 'amber', icon: <UserPlus size={18} />, dim: DIM.onboard, pain: t('Signed is not live.', '签了不等于上线。'), scale: t('Every new operator is weeks of “did they configure it yet?” across email and chat.', '每个新 operator 都是几周的「他们配置好了没？」，散在邮件和聊天里。') },
    { id: 'catalogue', hue: 'sky', icon: <Gamepad2 size={18} />, dim: DIM.catalogue, pain: t('A new game is live for some operators, missing for others.', '新游戏有的 operator 上了，有的没有。'), scale: t('Game IDs, assets and retirements drift apart across currencies and markets.', 'game ID、素材、下架状态在不同币种和市场之间慢慢对不上。') },
    { id: 'promo', hue: 'coral', icon: <Gift size={18} />, dim: DIM.promo, pain: t('One campaign, fifty variants.', '一个活动，五十个变体。'), value: 400, unit: t('fields', '个字段'), scale: t('to confirm for one campaign across 50 operators — “approved” is not “live”.', '要为一个跨 50 家的活动逐一确认 —— 「同意」不等于「上线」。') },
    { id: 'support', hue: 'rose', icon: <MessageCircle size={18} />, dim: DIM.support, pain: t('The same question, answered twenty times.', '同一个问题，回答二十次。'), scale: t('And the urgent one — a payout dispute — sits under them in the chat.', '真正紧急的那条 —— 奖金争议 —— 被压在下面。') },
    { id: 'report', hue: 'iris', icon: <BarChart3 size={18} />, dim: DIM.report, pain: t('Reports built by hand, read once.', '报表人手做，看一次就丢。'), scale: t('A table of numbers instead of “what moved, why, and who acts next”.', '一张数字表，而不是「什么变了、为什么、下一步谁做」。') },
    { id: 'health', hue: 'leaf', icon: <HeartPulse size={18} />, dim: DIM.health, pain: t('A dropping account is noticed at month-end.', '掉量的客户到月底才发现。'), scale: t('By then the campaign has ended and the operator has moved its placement elsewhere.', '那时活动早结束了，operator 的版位也给了别人。') },
  ]} /> },

  /* ------------------------------------------------------------ loop */
  heading('ig-loop', isZh, t('One closed loop covers all six', '一个闭环，六个地方一起管')),
  { kind: 'node', node: lead(isZh, t(
    'The same loop that keeps Jiju true, pointed at your operators: what comes in is configured, checked and launched; what is live is reported and watched; what the watch finds goes back to the start.',
    '让 Jiju 保持准确的同一个闭环，对准你的 operator：进来的东西被配置、核对、上线；上线的被报告、被巡查；巡查出来的问题回到起点。',
  )) },
  { kind: 'node', node: <ApLoop isZh={isZh} title={t('The loop, one stage at a time', '闭环，一站一站看')} center={{ title: t('Control room', '控制室'), text: t('one source of status', '唯一的状态来源') }} caption={t('Tap a stage to stop on it.', '点一站可以停在那里。')} stages={[
    { id: 'in', hue: 'amber', icon: <Inbox size={18} />, name: t('Intake', '进来'), dim: DIM.onboard, text: t('A signed operator, a new release, a campaign brief or a support message — each becomes a record with its checklist, not a chat thread.', '签下的 operator、新游戏、活动需求、客服消息 —— 每一样都变成一条带清单的记录，而不是一串聊天。'), machines: [t('Operator onboarding', 'Operator 接入'), t('Support assistant', '客服助手')] },
    { id: 'config', hue: 'sky', icon: <Layers size={18} />, name: t('Configure', '配置'), dim: DIM.catalogue, text: t('Games, markets, currencies and campaign variants are filled in per operator from one master — nobody re-types the same thing fifty times.', '游戏、市场、币种、活动变体按一个母版为每家填好 —— 没人需要把同一件事打五十遍。'), machines: [t('Game catalogue sync', '游戏目录同步'), t('Promotion launcher', '促销发布')] },
    { id: 'check', hue: 'leaf', icon: <ShieldCheck size={18} />, name: t('Check', '把关'), dim: DIM.promo, text: t('Every field is checked before launch. Only the ones that fail go to a person, named — “currency not switched on”, not “please check”.', '每个字段上线前都核对。只有没过的才交给人，而且写明是哪一个 ——「币种没开」，不是「请检查一下」。'), machines: [t('Promotion launcher', '促销发布'), t('One locked door (MCP)', '一扇上锁的门（MCP）')] },
    { id: 'live', hue: 'coral', icon: <BadgeCheck size={18} />, name: t('Go live', '上线'), dim: DIM.onboard, text: t('A complete checklist goes live by itself and the operator is told — the same gate that publishes a place on Jiju.', '清单齐了就自己上线、通知 operator —— 和 Jiju 自动上架地点的是同一道闸。'), machines: [t('Operator onboarding', 'Operator 接入'), t('Promotion launcher', '促销发布')] },
    { id: 'report', hue: 'iris', icon: <BarChart3 size={18} />, name: t('Report', '报表'), dim: DIM.report, text: t('Numbers per operator and game every day; the monthly report drafts itself around what moved and who acts next.', '每天按 operator、按游戏出数字；月报围绕「什么变了、谁下一步」自己写初稿。'), machines: [t('Reporting', '报表')] },
    { id: 'watch', hue: 'rose', icon: <HeartPulse size={18} />, name: t('Watch', '巡查'), dim: DIM.health, text: t('Drops, error spikes, ending campaigns and open tickets become named tasks; what changed goes back to the start.', '掉量、错误激增、快结束的活动、未结的工单，都变成写明负责人的任务；有变化的回到起点。'), machines: [t('Account watch', '账户巡查'), t('Support assistant', '客服助手')] },
  ]} /> },
  { kind: 'node', node: <ApCompare isZh={isZh} title={t('A traditional B2B team vs the closed loop', '传统 B2B 团队 vs 闭环')} heads={[t('Traditional team', '传统团队'), t('iGaming Ai', 'iGaming Ai')]} roles={[
    t('Business development', '商务拓展'),
    t('Account manager', '客户经理'),
    t('Integration', '对接'),
    t('Promotions', '促销'),
    t('Support', '客服'),
  ]} wait={t('waits in a chat', '在聊天里等')} stale={t('Live — then nobody looks until month-end. Nothing comes back to the start.', '上线 —— 然后到月底才有人看。没有任何东西回到起点。')} stages={[
    { hue: 'amber', name: t('Intake', '进来') },
    { hue: 'sky', name: t('Configure', '配置') },
    { hue: 'leaf', name: t('Check', '把关') },
    { hue: 'coral', name: t('Go live', '上线') },
    { hue: 'iris', name: t('Report', '报表') },
    { hue: 'rose', name: t('Watch', '巡查') },
  ]} rows={[
    { id: 'onboard', hue: 'amber', dim: DIM.onboard, old: t('An account manager chases the operator in chat', '客户经理在聊天里追 operator'), loop: t('One checklist per operator; it goes live the moment it is complete', '每家一张清单，齐了当下就上线') },
    { id: 'catalogue', hue: 'sky', dim: DIM.catalogue, old: t('Someone emails a game list when they remember', '有人想起来才发游戏清单'), loop: t('A release reaches every fitting operator the same day, assets attached', '新游戏当天送到每家合适的 operator，附素材') },
    { id: 'promo', hue: 'coral', dim: DIM.promo, old: t('A spreadsheet and fifty chats', '一张表加五十个聊天'), loop: t('400 fields checked by the gate; only the failures go to a person', '400 个字段由闸核对，只有没过的交给人') },
    { id: 'support', hue: 'rose', dim: DIM.support, old: t('Whoever sees the message first answers it', '谁先看到谁回'), loop: t('Reviewed answers sent at once; money and complaints to a person, timed', '审过的答案立刻发；钱和投诉转人，计时') },
    { id: 'report', hue: 'iris', dim: DIM.report, old: t('An analyst builds the deck at month-end', '分析员月底做简报'), loop: t('Daily numbers; the monthly report drafts itself', '每天出数字，月报自己写初稿') },
    { id: 'health', hue: 'leaf', dim: DIM.health, old: t('Noticed when the monthly number is down', '月度数字掉了才发现'), loop: t('Weekly comparison per operator; a drop is a task within the week', '每周逐家对比，掉量当周就变成任务') },
    { id: 'upkeep', hue: 'amber', dim: DIM.upkeep, old: t('Tooling fixes wait for the next sprint', '工具问题排进下一个迭代'), loop: t('AI fixes overnight, a second AI reviews, tests pass, it merges itself', 'AI 夜里修、另一个 AI 审、测试全过、自己合并') },
  ]} caption={t(
    'The traditional side is a typical set-up, shown for comparison — not a real company and not measured.',
    '传统团队那一边是常见的分工，用来对比 —— 不是某家真实公司，也不是实测。',
  )} /> },
  { kind: 'node', node: <ApMatrix isZh={isZh} title={t('Every problem has at least two modules on it', '每个问题，至少有两个模块在管')} cols={COLS} rows={[
    { id: 'onboard', hue: 'amber', dim: DIM.onboard, cols: ['onboard', 'door', 'cs'] },
    { id: 'catalogue', hue: 'sky', dim: DIM.catalogue, cols: ['catalogue', 'onboard', 'promo'] },
    { id: 'promo', hue: 'coral', dim: DIM.promo, cols: ['promo', 'door', 'report'] },
    { id: 'support', hue: 'rose', dim: DIM.support, cols: ['cs', 'watch'] },
    { id: 'report', hue: 'iris', dim: DIM.report, cols: ['report', 'control'] },
    { id: 'health', hue: 'leaf', dim: DIM.health, cols: ['watch', 'report', 'cs'] },
    { id: 'upkeep', hue: 'amber', dim: DIM.upkeep, cols: ['door', 'control'] },
  ]} caption={t('Rows are problems, columns are the eight modules described below.', '横行是问题，直栏是下面讲到的八个模块。')} /> },

  /* ------------------------------------------------------------ dashboard */
  heading('ig-dashboard', isZh, t('The dashboard: where people meet the loop', '仪表台：人和闭环碰面的地方')),
  { kind: 'node', node: lead(isZh, t(
    'A loop you cannot see is a loop you will not trust. Three screens answer the three things a person needs to know — and they are the same records, so a stuck step on one is a decision on another.',
    '看不见的闭环，没人敢信。三个画面回答人需要知道的三件事 —— 而且它们是同一份记录，所以一边卡住的一步，就是另一边的一个决定。',
  )) },
  { kind: 'node', node: <IgDashboard isZh={isZh} title={t('One stuck field, followed across three screens', '一个卡住的字段，在三个画面里怎么走')} caption={t(
    'Illustration with made-up operators, campaign and counts. It plays by itself; tap a screen to hold it, and on Record tap a role to see only that role’s rows.',
    '示意，operator、活动和数字都是虚构的。会自己播放；点一个画面可以停住，在「对象」里点一个角色，只看那个角色的几格。',
  )} /> },

  /* ------------------------------------------------------------ worth */
  heading('ig-worth', isZh, t('What the loop is worth', '这个闭环值多少')),
  { kind: 'node', node: lead(isZh, t(
    'Take one ordinary job — a promotion going out to fifty operators — and then the team it usually takes.',
    '先看一件平常的事 —— 一个活动发给五十家 operator —— 再看平常要为它养多大的团队。',
  )) },
  { kind: 'node', node: <ApFieldGrid isZh={isZh} title={t('One campaign × 50 operators × 8 fields', '一个活动 × 50 家 operator × 8 个字段')} operators={50} fields={[
    t('Operator / brand', 'Operator / 品牌'),
    t('Market', '市场'),
    t('Currency', '币种'),
    t('Eligible games', '适用游戏'),
    t('Dates & time zone', '日期与时区'),
    t('Funding & caps', '出资与上限'),
    t('Max payout & rules', '最高支付与规则'),
    t('Assets', '素材'),
  ]} stuck={[[1, 7], [2, 12], [2, 31], [3, 44], [4, 3], [5, 19], [5, 38], [6, 26], [7, 9], [7, 47]]} handText={t('confirmations to chase by hand, one chat at a time', '个确认要人手一个个聊天去追')} loopText={t('checked by the gate, no one asked', '个由闸核对，不用问人')} personText={t('sent to a person, each naming the missing field', '个交给人，每个都写明缺哪一项')} caption={t(
    'Every dot is one field for one operator. Which dots fail here is illustrative — in practice it is whatever your operators have not confirmed yet.',
    '每一点是一家 operator 的一个字段。这里哪几点没过是示意 —— 实际上就是你的 operator 还没确认的那些。',
  )} /> },
  { kind: 'node', node: <ApTeamCost isZh={isZh} title={t('What a B2B team would cost vs what the engine costs', '养一个 B2B 团队 vs 运行这个引擎')} heads={[t('A traditional B2B team, per month', '传统 B2B 团队，每月'), t('iGaming Ai, per month', 'iGaming Ai，每月')]} roles={[
    { role: t('Account manager', '客户经理'), monthly: 6750 },
    { role: t('Integration / application support engineer', '对接 / 应用支持工程师'), monthly: 5000 },
    { role: t('Customer support executive', '客服专员'), monthly: 3500 },
    { role: t('Marketing executive (promotions)', '市场专员（促销）'), monthly: 3500 },
    { role: t('Data analyst (reports)', '数据分析（报表）'), monthly: 4000 },
    { role: t('Software tester (game QA)', '软件测试（游戏 QA）'), monthly: 5000 },
    { role: t('Project coordinator', '项目协调'), monthly: 3500 },
  ]} onCost={{ rate: 0.1469, text: t('Employer EPF 12–13 %, SOCSO 1.75 %, EIS 0.2 %', '雇主 EPF 12–13%、SOCSO 1.75%、EIS 0.2%') }} system={[
    { item: t('Claude Max (US$200)', 'Claude Max（US$200）'), monthly: 840 },
    { item: t('Grok via X Premium+ (US$100)', 'Grok，X Premium+（US$100）'), monthly: 420 },
    { item: t('ChatGPT Plus for Codex review (US$20)', 'ChatGPT Plus，Codex 审查（US$20）'), monthly: 84 },
    { item: t('Cloud and domains (Jiju today)', '云端与域名（Jiju 现况）'), monthly: 200 },
  ]} savedText={t('Difference in a year:', '一年相差：')} caption={t(
    'Salaries: JobStreet Malaysia median monthly pay per role, read 26 Nov 2026 (all Malaysia, all levels; Kuala Lumpur pays more). Employer contributions: MIDA statutory rates — EPF 12 % above RM 5,000, SOCSO and EIS capped at a RM 6,000 wage. Engine: what Jiju’s engine costs to run today at US$1 = RM 4.2; your cloud bill grows with your volume. Not included: hardware, setup, and the person who runs it.',
    '薪水：JobStreet 马来西亚各职位月薪中位数，2026-11-26 读取（全马、各级别；吉隆坡更高）。雇主缴款：MIDA 法定比例 —— 月薪超过 RM 5,000 的 EPF 为 12%，SOCSO 与 EIS 以 RM 6,000 月薪封顶。引擎：Jiju 的引擎现在的运行成本，US$1 = RM 4.2；你的云端费用会随量增加。不含：硬件、搭建费用，以及负责它的那个人。',
  )} /> },

  /* ------------------------------------------------------------ proof */
  heading('ig-proof', isZh, t('Why believe it', '凭什么相信')),
  { kind: 'node', node: lead(isZh, t(
    'Each layer already runs a real operation. The loop keeps a live directory true without a team; the pipeline runs a dealership’s deals every day; the levels and the “Now” list are how I run all of it myself.',
    '每一层都已经在撑着一个真实的运营。闭环让一个正在营运的名录保持准确，背后没有团队；流水线每天在跑一家车行的生意；档位和「现在」清单，就是我自己管这一切的方式。',
  )) },
  { kind: 'stats', items: [
    { value: 944, unit: t('places', '家'), text: t('live on jiju.pet, kept true by the engine (26 Nov 2026)', '在 jiju.pet 上线，由引擎保持准确（2026-11-26）') },
    { value: 108, unit: t('tools', '个工具'), text: t('behind one locked door, every write previewed and logged', '在一扇上锁的门后面，每笔写入先预演、留记录') },
    { value: 139, unit: t('days', '个工作日'), text: t('of hand work done by machines in the last 30 days', '的人手活，最近 30 天由机器做完') },
  ] },
  { kind: 'p', text: t(
    'Numbers are Jiju’s own (26 Nov 2026); the whole engine is laid out on the Jiju Autopilot page.',
    '数字都是 Jiju 自己的（2026-11-26）；整个引擎完整摊开在 Jiju Autopilot 那一页。',
  ) },
  { kind: 'steps', items: [
    { title: t('The loop — Jiju', '闭环 —— Jiju'), text: t('Places, merchants, events and promotions are collected, checked, published, re-checked and expired by machines, every day.', '地点、店家、活动、优惠，每天由机器收资料、核对、上架、复查、过期下架。') },
    { title: t('The pipeline — Dr Racing', '流水线 —— Dr Racing'), text: t('A dealership team works from one pipeline: each role records its own step, a checklist must be complete before hand-over, and a rejection comes back as a plain next step.', '一家车行的团队在同一条流水线上工作：每个角色记自己那一步，清单齐了才能交接，被拒会变成一句清楚的下一步。') },
    { title: t('The levels — my own dashboard', '档位 —— 我自己的面板'), text: t('Every automation I run is registered as a loop with a level. A loop asks to go automatic only after I approved it unchanged ten times in a row; anything that spends money or messages a real person stays at “propose”.', '我跑的每条自动化都登记成一条带档位的回路。一条回路要我连续十次原样通过，才会问能不能升到自动；会花钱、会给真人发消息的，永远停在「提议」。') },
  ] },

  /* ------------------------------------------------------------ modules */
  heading('ig-modules', isZh, t('The eight modules inside the loop', '闭环里的八个模块')),
  { kind: 'node', node: lead(isZh, t(
    'Each module says honestly where it stands: running today on Jiju, or built to your process on top of that same engine.',
    '每个模块都老实写现况：已经在 Jiju 运行，或是在同一个引擎上按你的流程搭。',
  )) },
  { kind: 'node', node: <ApMachineDeck isZh={isZh} hint={t('Pick a module:', '选一个模块：')} machines={modules(isZh)} /> },

  /* ------------------------------------------------------------ people */
  heading('ig-people', isZh, t('How much runs by itself is your call', '放手多少，由你决定')),
  { kind: 'node', node: lead(isZh, t(
    'Most AI automation sells “AI does it for you”. This sells “you decide how far it goes”. Nothing is automatic on day one; each loop earns its level from your own approvals — and some never get past “propose”, by design.',
    '一般的 AI 自动化卖的是「AI 替你做」。这里卖的是「你决定让它做到哪」。第一天没有任何东西是自动的；每条回路的档位，是你自己一次次通过换来的 —— 有些按设计永远过不了「提议」。',
  )) },
  { kind: 'node', node: <IgLevels isZh={isZh} title={t('Three levels: watch, propose, auto', '三档：只看、提议、自动')} rows={[
    { id: 'catalogue', name: t('Game catalogue sync', '游戏目录同步'), cap: 'auto', why: t('same data, many lists', '同一份资料，送到很多清单') },
    { id: 'faq', name: t('Reviewed support answers', '审过的客服答案'), cap: 'auto', why: t('fixed wording only', '只用固定措辞') },
    { id: 'watch', name: t('Weekly account watch', '每周账户巡查'), cap: 'auto', why: t('only creates tasks', '只会开任务') },
    { id: 'promo', name: t('Promotion go-live', '促销上线'), cap: 'propose', why: t('spends money: caps, payouts', '会花钱：上限、奖金') },
    { id: 'report', name: t('Reports sent to operators', '发给 operator 的报表'), cap: 'propose', why: t('a message to a real person', '是发给真人的消息') },
    { id: 'terms', name: t('Terms, pricing, disputes', '条款、价格、争议'), cap: 'propose', why: t('always a person’s decision', '永远由人决定') },
  ]} caption={t(
    'Illustrative rows; the loops and caps are set with you. The rule itself is real: on my own dashboard, anything that spends money or messages a real person is capped at “propose” in code, not in a setting. Stepping a loop back down is always one click.',
    '示意，回路和上限会和你一起定。规则本身是真的：在我自己的面板上，会花钱、会给真人发消息的回路，上限是写死在代码里的「提议」，不是一个可以改的设定。把一条回路降档永远只要一下。',
  )} /> },

  /* ------------------------------------------------------------ buy */
  heading('ig-buy', isZh, t('Working together', '怎么合作')),
  { kind: 'steps', items: [
    { title: t('Start with one process', '先从一个流程开始'), text: t('Usually promotions or onboarding — the one where status lives in chat today. We map its fields with your team, then run the loop next to them.', '通常是促销或接入 —— 现在状态还活在聊天里的那一个。和你的团队一起把字段列出来，再让闭环在旁边跟着跑。') },
    { title: t('Then add the loop around it', '再把闭环补齐'), text: t('Catalogue, support, reports and the weekly watch plug into the same record, so each new module makes the others more accurate.', '目录、客服、报表、每周巡查接到同一份记录上，每加一个模块，其他模块就更准一点。') },
    { title: t('On your accounts', '用你自己的帐号'), text: t('Data, keys and machines stay yours. No operator data leaves your systems, and nothing about money or terms is automated without a person.', '资料、钥匙、机器都留在你手里。operator 资料不离开你的系统；涉及钱或条款的，没有人点头就不自动化。') },
  ] },
  { kind: 'node', node: <SsGlossary isZh={isZh} terms={[
    { icon: <Bot size={18} />, term: t('Agent', 'Agent'), text: t('An AI that does a job on its own, following written rules.', '照成文规矩、自己完成一件事的 AI。') },
    { icon: <KeyRound size={18} />, term: t('MCP tools', 'MCP 工具'), text: t('The only door agents use to read or change your data.', 'agent 读写你资料唯一的那扇门。') },
    { icon: <CalendarCheck size={18} />, term: t('Variant', '变体'), text: t('One operator’s version of a master campaign.', '一个主活动在某一家 operator 的版本。') },
    { icon: <Database size={18} />, term: t('Status source', '状态来源'), text: t('The one record everyone — people and bots — reads.', '所有人和 bot 都读的那一份记录。') },
    { icon: <ShieldCheck size={18} />, term: t('Protected field', '受保护栏位'), text: t('A value a person confirmed; bots can only suggest a change.', '人确认过的值；bot 只能提议修改。') },
    { icon: <Wrench size={18} />, term: t('Auto-merge', '自动合并'), text: t('A code change that passes every check goes live by itself.', '通过所有检查的代码改动自己上线。') },
  ]} /> },
];
