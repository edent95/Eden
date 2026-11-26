/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Body of /jiju-autopilot: the whole Jiju automation system, written for a buyer (system-story format,
// "fully transparent" depth chosen by the owner on 2026-11-26). Every number and rule was read on
// 2026-11-26 from Jiju origin/main (2f0ede67), personal-dashboard (dashboard.config.json, docs/modules/*,
// data/auto-merge.jsonl), News-Rss docs and the nightly snapshot ~/jiju-snapshots/latest (manifest
// 2026-11-26). Privacy: no keys, phone numbers, owner or customer names, browser profiles or prices;
// examples are made up and marked as such.

import React from 'react';
import {
  BadgeCheck, Bot, Camera, CalendarCheck, Clock3, Database, EyeOff, Globe2, KeyRound, Link2, Megaphone,
  MessageCircle, Newspaper, Search, ShieldCheck, Store, Wrench,
} from 'lucide-react';
import type { EpBlock, EpText } from '../ProductStorePage';
import { JijuBeliefBlankArt, JijuBeliefCheckArt, JijuBeliefDecideArt, JijuBeliefSaveArt, JijuBeliefSourceArt, JijuNightDayArt } from '../css-art/jiju-story-art';
import { SsBeliefs, SsFlow, SsGlossary, SsHero, SsJourney, SsSchedule } from '../system-story/SystemStory';
import { ApBars, ApPublishGate, ApSplit, ApSystemMap, type ApStation } from './AutopilotFigures';

const t = (en: string, zh: string): EpText => ({ en, zh });
const heading = (id: string, isZh: boolean, text: EpText): EpBlock => ({ kind: 'node', node: <h2 id={id}>{isZh ? text.zh : text.en}</h2> });

const STATIONS: ApStation[] = [
  { id: 'news', href: '#ap-news', icon: <Newspaper size={18} />, name: t('News & events', '新闻与活动'), text: t('Five outlets read every hour', '每小时读 5 家媒体') },
  { id: 'grok', href: '#ap-grok', icon: <Bot size={18} />, name: t('Grok bots', 'Grok bot'), text: t('Five researchers fill gaps with proof', '5 个研究员带证据补缺口') },
  { id: 'mcp', href: '#ap-mcp', icon: <KeyRound size={18} />, name: t('Back-office tools', '后台工具（MCP）'), text: t('108 tools, preview before every write', '108 个工具，写之前先预演') },
  { id: 'publish', href: '#ap-publish', icon: <BadgeCheck size={18} />, name: t('Auto-publish', '自动上架'), text: t('Five items complete → live', '五项齐 → 上线') },
  { id: 'unpublish', href: '#ap-unpublish', icon: <EyeOff size={18} />, name: t('Auto-unpublish', '自动下架'), text: t('Closed or expired → back to draft', '倒闭或过期 → 退回草稿') },
  { id: 'photos', href: '#ap-photos', icon: <Camera size={18} />, name: t('Photos', '图片'), text: t('Real photos, each with its source', '真实照片，每张带出处') },
  { id: 'web', href: '#ap-web', icon: <Globe2 size={18} />, name: t('Around the web', '网上怎么说'), text: t('Official links first, patrolled daily', '官方链接优先，每天巡查') },
  { id: 'owners', href: '#ap-owners', icon: <MessageCircle size={18} />, name: t('Owners on WhatsApp', '店主 WhatsApp'), text: t('Owner confirms → blue tick', '店主确认 → 蓝勾') },
  { id: 'control', href: '#ap-control', icon: <Wrench size={18} />, name: t('Control room: SEO & code', '控制室：SEO 与代码'), text: t('AI fixes, CI checks, auto-merge', 'AI 修、CI 查、自动合并') },
  { id: 'social', href: '#ap-social', icon: <Megaphone size={18} />, name: t('Social media', '社交媒体'), text: t('A post a day, posted by itself', '每天一帖，自己发') },
];

export const jijuAutopilotBlocks = (isZh: boolean): EpBlock[] => [
  /* ------------------------------------------------------------ opening */
  { kind: 'p', text: t(
    'Jiju (jiju.pet) is a guide to pet-friendly places in Malaysia and Singapore. One person runs it. Almost everything else — finding places, checking them, taking them down when they close, writing the code, posting on social media — is done by machines that follow written rules.',
    'Jiju（jiju.pet）是马来西亚和新加坡的宠物友好去处指南，只有一个人在管。找地点、核对、倒闭了下架、写代码、发社媒 —— 几乎其他所有事，都由照着成文规矩做事的机器完成。',
  ) },
  { kind: 'p', text: t(
    'This page shows every machine in that system, with its real rules and real numbers, so you can decide whether you want the same thing for your own directory, marketplace or city guide.',
    '这一页把系统里的每一台「机器」都摊开来：真实的规矩、真实的数字。你可以据此判断，自己的名录、平台或城市指南要不要一套一样的。',
  ) },
  { kind: 'node', node: <SsHero isZh={isZh} Art={JijuNightDayArt} label={t(
    'Illustration: at night AI helpers carry shop cards into a laptop while another robot checks them with a magnifier; a morning confirm stamp in the middle; by day a person and a black cat walk to a shop.',
    '插画：夜里 AI 助手把店家卡片搬进电脑，另一个机器人拿放大镜检查；中间是早上的确认章；白天一个人带着小黑猫走向店家。',
  )} caption={t('Machines work at night, rules decide what goes live, a person signs off what matters.', '夜里机器干活，规矩决定什么能上线，要紧的事由人签字。')} /> },
  { kind: 'stats', items: [
    { value: 944, unit: t('places', '家'), text: t('live on jiju.pet (snapshot, 26 Nov 2026)', '在 jiju.pet 上线（2026-11-26 快照）') },
    { value: 108, unit: t('tools', '个工具'), text: t('agents use to read and write the data', 'agent 读写资料只能经过它们') },
    { value: 1208, unit: t('changes', '个改动'), text: t('merged automatically: 480 on the site, 728 in the control room', '自动合并：网站 480 个，控制室 728 个') },
  ] },
  { kind: 'node', node: <SsBeliefs isZh={isZh} title={t('Five rules every machine follows', '每台机器都守的五条')} items={[
    { Art: JijuBeliefSourceArt, title: t('A source, or blank', '有出处，否则留空'), text: t('Every fact carries the page it came from and the day it was checked. No source, no fact.', '每个事实都带来源网页和核对日期。没有出处，就不写。') },
    { Art: JijuBeliefCheckArt, title: t('Preview, then write', '先预演，再写入'), text: t('Every write is shown as a plan first; only an explicit “apply” changes the data, and every write is logged.', '每次写入先给出计划，明确「apply」才真的改，每一笔都记进审计。') },
    { Art: JijuBeliefDecideArt, title: t('The owner’s word wins', '店主说的算'), text: t('Hours, address, phone or pet policy confirmed by the owner can’t be overwritten by a bot.', '店主确认过的营业时间、地址、电话、携宠政策，bot 不能覆盖。') },
    { Art: JijuBeliefSaveArt, title: t('Hide, never delete', '只藏，不删'), text: t('A closed shop goes back to draft. Nothing is thrown away by a machine.', '倒闭的店退回草稿。机器不会丢掉任何东西。') },
    { Art: JijuBeliefBlankArt, title: t('Code decides, AI proposes', 'AI 提议，代码决定'), text: t('Models suggest; fixed rules in code decide what goes live.', '模型只提建议；上不上线由写死在代码里的规则决定。') },
  ]} /> },
  { kind: 'node', node: <ApSystemMap isZh={isZh} title={t('The whole system, in ten machines', '整套系统：十台机器')} stations={STATIONS} caption={t('Tap a machine to jump to it. Each section below says what it does, then shows its real rules.', '点一台机器跳过去。下面每一段先说它做什么，再摊开它的真实规矩。')} /> },

  /* ------------------------------------------------------------ 1. news */
  heading('ap-news', isZh, t('1 · News and events come in by themselves', '1 · 新闻和活动自己进来')),
  { kind: 'p', text: t(
    'A computer at home reads Malay Mail, FMT, NST, Buletin Mutiara and CNA every hour. A local AI model translates the headlines and picks out events and public notices; Jiju’s own rules decide which event may publish itself.',
    '家里的电脑每小时读一次 Malay Mail、FMT、NST、Buletin Mutiara 和 CNA。本机 AI 模型翻译标题，挑出活动与公告；哪个活动能自己上线，由 Jiju 自己的规则决定。',
  ) },
  { kind: 'node', node: <SsFlow isZh={isZh} title={t('From a news item to a live event', '从一条新闻到一个上线的活动')} ariaLabel={t(
    'Flowchart: five outlets are read every hour; a local model translates and writes key points where every number must appear in the article. If the item is not an event in the next 45 days with a venue it stays in the area news feed. If the event is already on Jiju it is skipped. If the source is official and name, time, venue and city are all present it publishes automatically; otherwise it is saved as a draft and a Grok bot looks for the official page.',
    '流程图：每小时读 5 家媒体；本机模型翻译、写重点，重点里每个数字都必须在原文出现。不是 45 天内、有场地的活动，就只留在地区新闻流。Jiju 已经有的跳过。来源是官方、名称时间场地城市都齐，就自动上线；否则存成草稿，交给 Grok bot 去找官方页面。',
  )} caption={t('Made-up examples. At most 15 events are sent per run; events spanning more than two months are skipped. Road closures and other notices are drafted for a person to publish.', '示意，例子是虚构的。每次最多送 15 个活动；跨两个月以上的活动跳过。封路等公告只起草，由人发布。')} nodes={[
    { id: 'read', kind: 'start', text: t('Read 5 outlets, every hour', '每小时读 5 家媒体') },
    { id: 'model', kind: 'step', text: t('Local model translates and writes key points (numbers must be in the article)', '本机模型翻译、写重点（数字必须在原文出现）') },
    { id: 'event', kind: 'ask', text: t('An event in the next 45 days, with a venue?', '45 天内、有场地的活动？'), down: t('Yes', '是'), side: { id: 'feed', label: t('No', '不是'), text: t('Stays in the area news feed', '只留在地区新闻流') } },
    { id: 'dup', kind: 'ask', text: t('New to Jiju?', 'Jiju 还没有？'), down: t('Yes', '没有'), side: { id: 'skip', label: t('No', '已有'), text: t('Skipped', '跳过') } },
    { id: 'proof', kind: 'ask', text: t('Official source, with name, time, venue and city?', '官方来源，名称、时间、场地、城市都齐？'), down: t('Yes', '齐'), side: { id: 'draft', label: t('No', '不齐'), text: t('Draft; a Grok bot looks for the official page', '存草稿，交 Grok bot 找官方页') } },
    { id: 'live', kind: 'end', text: t('Published automatically', '自动上线') },
  ]} examples={[
    { title: t('Example 1 · a weekend market on an arts venue’s own events page', '例子 1 · 艺术场馆自己活动页上的周末市集'), path: ['read', 'model', 'event', 'dup', 'proof', 'live'] },
    { title: t('Example 2 · a road closure notice', '例子 2 · 一则封路公告'), path: ['read', 'model', 'event', 'feed'] },
    { title: t('Example 3 · a festival whose source forgot the year', '例子 3 · 来源漏写年份的节庆'), path: ['read', 'model', 'event', 'dup', 'proof', 'draft'] },
  ]} /> },

  /* ------------------------------------------------------------ 2. grok */
  heading('ap-grok', isZh, t('2 · Five Grok bots do the research', '2 · 5 个 Grok bot 做调查')),
  { kind: 'p', text: t(
    'Five Grok assistants — deals, events, links, media and story — ask Jiju for work, five tasks at a time. Each task comes with the same rules; each answer is checked again that night.',
    '5 个 Grok 助手（优惠、活动、链接、媒体、故事）向 Jiju 领任务，一次 5 件。每件任务都附同一套规矩；每个交回来的答案当晚再查一次。',
  ) },
  { kind: 'node', node: <SsFlow isZh={isZh} title={t('One research task', '一件调查任务')} ariaLabel={t(
    'Flowchart: a bot asks for work and gets five tasks, held for two hours, ranked by how big the gap is times how much people search for the place. It opens at most six pages. If nothing is found on an official page it reports not found and the task waits 45 to 90 days. Otherwise it previews then applies, never overwriting existing values. That night the copied quote is checked against a snapshot of the page; if it is missing the submission is flagged and re-checked.',
    '流程图：bot 领任务，拿到 5 件、保留 2 小时，按「缺口大小 × 这家被搜的程度」排序。最多开 6 个网页。官方页面上找不到就回报「没找到」，这件任务等 45–90 天再派。找到就先预演再写入，不覆盖已有的值。当晚拿网页快照核对抄来的原话，不在就标记、重查。',
  )} caption={t('Made-up examples. Hours and photos weigh 5, menu and must-order dishes 4; places people search for more rank up to ×3. A 403, 429 or 5xx stops the bot and releases the task.', '示意，例子是虚构的。营业时间和照片权重 5，菜单和必点菜 4；被搜得越多的店最多 ×3。遇到 403、429、5xx，bot 停手、放回任务。')} nodes={[
    { id: 'ask', kind: 'start', text: t('Bot asks for work: 5 tasks, held 2 hours', 'bot 领任务：5 件，保留 2 小时') },
    { id: 'open', kind: 'step', text: t('Opens at most 6 pages, official site first', '最多开 6 个网页，官网优先') },
    { id: 'found', kind: 'ask', text: t('Found on an official page?', '在官方页面上找到了？'), down: t('Yes', '找到'), side: { id: 'wait', label: t('No', '没有'), text: t('Report “not found”; retry in 45–90 days', '回报「没找到」，45–90 天后再派') } },
    { id: 'apply', kind: 'step', text: t('Preview, then apply — never overwrite', '先预演再写入 —— 不覆盖旧值') },
    { id: 'quote', kind: 'ask', text: t('That night: is the quote still on the page?', '当晚：原话还在网页上吗？'), down: t('Yes', '在'), side: { id: 'flag', label: t('No', '不在'), text: t('Flagged; the place is re-checked', '标记，这家重查') } },
    { id: 'kept', kind: 'end', text: t('Counts as evidence', '算作证据') },
  ]} examples={[
    { title: t('Example 1 · opening hours from a café’s own website', '例子 1 · 从咖啡馆官网抄到营业时间'), path: ['ask', 'open', 'found', 'apply', 'quote', 'kept'] },
    { title: t('Example 2 · a shop with no website and a login-walled Instagram', '例子 2 · 没官网、IG 要登录的店'), path: ['ask', 'open', 'found', 'wait'] },
    { title: t('Example 3 · a promo page that changed after the bot read it', '例子 3 · bot 读完后改版的优惠页'), path: ['ask', 'open', 'found', 'apply', 'quote', 'flag'] },
  ]} /> },
  { kind: 'node', node: <ApBars isZh={isZh} title={t('Daily task limit per bot', '每个 bot 每天最多几件')} note={t('400 a day in total', '一天合计 400')} rows={[
    { label: t('Deals', '优惠'), value: 100, lead: true },
    { label: t('Links', '链接'), value: 90 },
    { label: t('Media', '媒体'), value: 80 },
    { label: t('Story', '故事'), value: 70 },
    { label: t('Events', '活动'), value: 60 },
  ]} caption={t('Limits as configured in Jiju’s research queue on 26 Nov 2026. The bots started on 21 Nov 2026; a region that misses twice in a row is paused for 7 days.', '2026-11-26 Jiju 调查队列里的设定。bot 从 2026-11-21 开始跑；一个地区连续两次落空就停 7 天。')} /> },

  /* ------------------------------------------------------------ 3. mcp */
  heading('ap-mcp', isZh, t('3 · One locked door into the data', '3 · 进资料库只有一扇上锁的门')),
  { kind: 'p', text: t(
    'No agent touches the database directly. Every bot, script and AI session goes through the same 108 back-office tools (an MCP server), with its own key.',
    '没有任何 agent 直接碰资料库。所有 bot、脚本和 AI 会话都经过同一套 108 个后台工具（MCP 服务），各拿各的钥匙。',
  ) },
  { kind: 'steps', items: [
    { title: t('Three kinds of key', '三种钥匙'), text: t('Read, write and admin. Only a hash of each key is stored, and the name in the audit log comes from the key — not from what the client claims.', '只读、可写、管理员。钥匙只存哈希；审计日志里的名字来自钥匙本身，不是客户端自己报的。') },
    { title: t('Plan first', '先给计划'), text: t('A write tool returns a plan by default. Only `apply: true` changes anything; every call is kept for 90 days.', '写入工具默认只回计划，带 `apply: true` 才真的改；每次调用保留 90 天。') },
    { title: t('Protected fields', '受保护的栏位'), text: t('If an owner confirmed a field, a bot’s change to it becomes a question for a person instead.', '店主确认过的栏位，bot 想改时会变成一个等人决定的问题。') },
    { title: t('Read the copy, not production', '读副本，不读正式库'), text: t('Every night at 03:40 a second machine takes a snapshot (about 3,500 reads, no personal data). Agents search the snapshot, because listing places from production reads the whole table each time.', '每晚 03:40 另一台机器拍一次快照（约 3,500 次读取，不含个人资料）。agent 查快照，因为从正式库列地点每次都要整表读。') },
  ] },

  /* ------------------------------------------------------------ 4. publish */
  heading('ap-publish', isZh, t('4 · Auto-publish: five items, then live', '4 · 自动上架：五项齐了就上线')),
  { kind: 'p', text: t(
    'There is no “publish” button for machines. A draft goes live by itself the moment a real change makes all five items complete — nobody is asked to go and click it.',
    '机器没有「上架」按钮。草稿在某次真实改动让五项全齐的那一刻，自己上线 —— 不用叫谁去后台点。',
  ) },
  { kind: 'node', node: <ApPublishGate isZh={isZh} title={t('The publish check, run on every save', '每次保存都跑的上架检查')} live={t('Live on jiju.pet', '在 jiju.pet 上线')} items={[
    { name: t('Name', '名字'), rule: t('not empty, not “unknown”', '不能空、不能是「unknown」') },
    { name: t('Opening hours', '营业时间'), rule: t('real hours — a Mon–Sun 9-to-9 template doesn’t count', '真实时间 —— 周一到周日 9 点到 9 点的模板不算') },
    { name: t('Description', '说明'), rule: t('more than 20 characters, not “Details not provided”', '超过 20 个字，不能是「Details not provided」') },
    { name: t('Photo', '照片'), rule: t('at least one stored in Jiju’s own storage', '至少一张存在 Jiju 自己的空间') },
    { name: t('Location', '位置'), rule: t('an address or coordinates', '地址或坐标') },
  ]} caption={t(
    'Rules from Jiju’s placeMissingInfo on 25 Nov 2026. It never fires when a person changed the status in the same save, when the place is on hold, archived, permanently closed or expired, or when the save changed nothing. Branches of a chain take description and photo from the brand.',
    '规则取自 2026-11-25 Jiju 的 placeMissingInfo。以下情况不会触发：同一次保存里有人改了上下架、这家被暂停、已归档、永久歇业或过期、这次保存没真改东西。连锁分店的说明和照片沿用品牌。',
  )} /> },
  { kind: 'node', node: <ApBars isZh={isZh} title={t('Every place Jiju knows about', 'Jiju 知道的所有地点')} note={t('2,437 in total', '共 2,437 家')} rows={[
    { label: t('Live', '上线'), value: 944, lead: true },
    { label: t('Archived', '归档'), value: 855 },
    { label: t('Draft', '草稿'), value: 638 },
  ]} caption={t('Nightly snapshot of 26 Nov 2026. On 25 Nov the regional drafts were mostly missing opening hours (434 of 445) — that is exactly the work handed to the Grok bots.', '2026-11-26 每晚快照。11 月 25 日的地区草稿大多缺营业时间（445 家里 434 家）—— 这正是派给 Grok bot 的活。')} /> },

  /* ------------------------------------------------------------ 5. unpublish */
  heading('ap-unpublish', isZh, t('5 · Auto-unpublish: closed shops step back', '5 · 自动下架：倒闭的店自己退场')),
  { kind: 'p', text: t(
    'Every Monday a quarter of the live places are checked against Google’s business status, so the whole list is covered every month. A permanently closed place goes back to draft — never deleted.',
    '每个星期一，拿四分之一的上线地点去对 Google 的营业状态，每个月全部轮一遍。永久歇业的退回草稿 —— 从不删除。',
  ) },
  { kind: 'node', node: <SsFlow isZh={isZh} title={t('The Monday closed-shop sweep', '星期一的倒闭巡查')} ariaLabel={t(
    'Flowchart: every Monday one quarter of the live places is checked. Google is asked only for business status. If the place is open nothing happens. If it moved, it is reported and a person decides. If more than ten places would change in one run, the run writes nothing and alerts. Otherwise the closed place goes back to draft and the change is logged.',
    '流程图：每周一查四分之一的上线地点，只向 Google 要营业状态。还开着就什么都不做。搬了家就回报、等人决定。一次要改超过 10 家，整次不写、发警报。否则倒闭的店退回草稿，记进审计。',
  )} caption={t('Made-up examples. Uses only Google’s free fields; at most 600 calls a run and 2,500 a month; stops after 5 errors in a row. Temporarily closed shops are reported only. For a chain, only the closed address is removed.', '示意，例子是虚构的。只用 Google 免费档字段；每次最多 600 次、每月 2,500 次；连续 5 次错误就停。暂停营业只回报。连锁店只拿掉关掉的那个地址。')} nodes={[
    { id: 'pick', kind: 'start', text: t('Monday 09:00: take one quarter of live places', '周一 09:00：取四分之一的上线地点') },
    { id: 'ask', kind: 'step', text: t('Ask Google for business status only', '只问 Google 营业状态') },
    { id: 'closed', kind: 'ask', text: t('Permanently closed?', '永久歇业？'), down: t('Yes', '是'), side: { id: 'open', label: t('No', '没有'), text: t('Nothing happens', '什么都不做') } },
    { id: 'moved', kind: 'ask', text: t('Closed with no new address?', '关了，而且没搬家？'), down: t('Yes', '是'), side: { id: 'person', label: t('Moved', '搬了'), text: t('Reported; a person decides', '回报，等人决定') } },
    { id: 'many', kind: 'ask', text: t('10 or fewer changes this run?', '这次要改的 ≤ 10 家？'), down: t('Yes', '是'), side: { id: 'alarm', label: t('More', '超过'), text: t('Write nothing, raise an alert', '一笔不写，发警报') } },
    { id: 'draft', kind: 'end', text: t('Back to draft, logged — not deleted', '退回草稿、记审计 —— 不删除') },
  ]} examples={[
    { title: t('Example 1 · a café that shut for good', '例子 1 · 永久关门的咖啡馆'), path: ['pick', 'ask', 'closed', 'moved', 'many', 'draft'] },
    { title: t('Example 2 · a bakery that is still open', '例子 2 · 还在营业的面包店'), path: ['pick', 'ask', 'closed', 'open'] },
    { title: t('Example 3 · a pet shop that moved down the road', '例子 3 · 搬到隔壁街的宠物店'), path: ['pick', 'ask', 'closed', 'moved', 'person'] },
  ]} /> },
  { kind: 'steps', items: [
    { title: t('Expired', '过期'), text: t('Every morning at 08:00, events and pop-ups past their end date are unpublished.', '每天早上 08:00，过了结束日期的活动和快闪下架。') },
    { title: t('Reported closed', '有人回报关门'), text: t('A bot that finds a permanent closure, a move or a long closure files it, and the place drops to draft. Weekly rest days and short holidays are never filed.', 'bot 发现永久关门、搬家或长期停业就回报，这家退回草稿。每周休息日和短假从不回报。') },
    { title: t('Duplicates', '重复'), text: t('Old copies of a chain are archived with a pointer to the merged place, kept 4 weeks, then deleted only after a backup.', '连锁店的旧副本归档并指向合并后的那家，保留 4 周，备份后才删。') },
  ] },

  /* ------------------------------------------------------------ 6. photos */
  heading('ap-photos', isZh, t('6 · Photos: real, stored, sourced', '6 · 图片：真实、自存、带出处')),
  { kind: 'p', text: t(
    'Every place needs real photos — at least five, one of them the shop front. They are copied into Jiju’s own storage, and every photo keeps a link to where it came from.',
    '每家都要真实照片 —— 至少五张，其中一张是门面。照片复制进 Jiju 自己的存储空间，每张都留着来源链接。',
  ) },
  { kind: 'node', node: <ApSplit isZh={isZh} title={t('Which photos are copied, and which are only linked', '哪些照片复制进来，哪些只放链接')} heads={[t('Copied into Jiju', '复制进 Jiju'), t('Shown in place, never copied', '原地展示，不复制')]} auto={[
    t('The shop’s official website', '店家官网'),
    t('Mall, government and tourism sites', '商场、政府、旅游局网站'),
    t('Review sites and blogs', '点评网站与博客'),
    t('Photos the owner sends', '店主自己寄来的照片'),
  ]} human={[
    t('The owner’s Instagram / Facebook posts — embedded whole, up to 6', '店主 IG / FB 帖子 —— 整帖嵌入，最多 6 个'),
    t('Media and food-blog articles — linked only', '媒体与美食文章 —— 只放链接'),
    t('Google Maps photos — not used at all', 'Google 地图照片 —— 完全不用'),
  ]} caption={t(
    'Each import converts to WebP (longest edge 1,600 px), at most 8 per call and 12 per place, 15 MB each, with a guard against internal addresses. A person skims a thumbnail grid first and drops logos, posters and stock photos. Alt text is written from name, category and area.',
    '每次导入转成 WebP（长边 1,600 像素），一次最多 8 张、每家最多 12 张、每张 15 MB，并挡掉内网地址。写入前人先扫一眼缩图，拿掉 logo、海报和图库图。alt 文字按店名、类别、地区自动写。',
  )} /> },

  /* ------------------------------------------------------------ 7. around the web */
  heading('ap-web', isZh, t('7 · Around the web: official first, weak links demoted', '7 · 网上怎么说：官方优先，弱链接降级')),
  { kind: 'p', text: t(
    'Every place should have its official site and socials, then a few independent articles or videos about it. Links are ranked by how much they can be trusted, and only the strong ones are shown.',
    '每家都应该有官网和官方社媒，再加几篇只写这家的文章或视频。链接按可信度排序，只展示可信的。',
  ) },
  { kind: 'node', node: <SsFlow isZh={isZh} title={t('Is this link good enough to show?', '这条链接够不够格展示？')} ariaLabel={t(
    'Flowchart: a link is found. If it is a low-trust listing, an AI answer or a map, it is kept as a lead only. If it is the official site or account, its address or phone must match the place; if not, it is a lead. If it matches it is written. A daily patrol then watches the official page for changes that look like a promo or a closure.',
    '流程图：发现一条链接。低可信名录、AI 回答或地图，只当线索。官网或官方帐号的话，地址或电话要对得上；对不上就当线索。对得上就写入。之后每天巡查官方网页，留意像优惠或像关门的改动。',
  )} caption={t(
    'Made-up examples. Trust order: official site → official social → known brand → mall or venue → other → listing → low-trust → map. Once a place has an official link, low-trust links are hidden. Articles must be about that one place: 3–5 per place plus up to 6 videos; round-ups are rejected.',
    '示意，例子是虚构的。可信度：官网 → 官方社媒 → 知名品牌 → 商场或场馆 → 其他 → 名录 → 低可信 → 地图。有了官方链接，低可信链接就不显示。文章必须只写这一家：每家 3–5 篇，另加最多 6 支视频；合集文一律不收。',
  )} nodes={[
    { id: 'find', kind: 'start', text: t('A link turns up', '找到一条链接') },
    { id: 'weak', kind: 'ask', text: t('Official site, official account or a known outlet?', '官网、官方帐号或知名媒体？'), down: t('Yes', '是'), side: { id: 'lead', label: t('No', '不是'), text: t('Kept as a lead, writes nothing', '只当线索，一笔不写') } },
    { id: 'match', kind: 'ask', text: t('Address or phone matches the place?', '地址或电话对得上？'), down: t('Yes', '对得上'), side: { id: 'lead2', label: t('No', '对不上'), text: t('Lead only', '只当线索') } },
    { id: 'write', kind: 'step', text: t('Written with the date it was checked', '写入，附核对日期') },
    { id: 'patrol', kind: 'end', text: t('Patrolled daily: ★ looks like a promo, ⚠ looks like a closure', '每天巡查：★ 像优惠，⚠ 像关门') },
  ]} examples={[
    { title: t('Example 1 · a café’s Instagram whose bio has the same address', '例子 1 · 简介地址对得上的咖啡馆 IG'), path: ['find', 'weak', 'match', 'write', 'patrol'] },
    { title: t('Example 2 · a travel-list site that copied old hours', '例子 2 · 抄了旧营业时间的旅游清单网站'), path: ['find', 'weak', 'lead'] },
    { title: t('Example 3 · a same-name shop in another city', '例子 3 · 别的城市的同名店'), path: ['find', 'weak', 'match', 'lead2'] },
  ]} /> },

  /* ------------------------------------------------------------ 8. owners */
  heading('ap-owners', isZh, t('8 · Owners confirm on WhatsApp', '8 · 店主在 WhatsApp 上确认')),
  { kind: 'p', text: t(
    'Hermes, an AI assistant with its own WhatsApp number, sends a short invite to the owner of a live place and handles the reply. Sending is deliberately slow: at most five a day.',
    'Hermes 是一个有自己 WhatsApp 号码的 AI 助手，给已上线地点的店主发一条简短邀请，再处理回复。故意发得很慢：一天最多五条。',
  ) },
  { kind: 'node', node: <SsJourney isZh={isZh} title={t('One invitation, two sides', '一次邀请，两条线')} youLabel={t('the owner', '店主')} caption={t(
    'Each step: what the owner sees, and in the shaded box what the system does. New invites have been paused since 21 Nov 2026 while the wording is reviewed; on 26 Nov, 23 places carried the verified tick and 6 had owner-confirmed fields.',
    '每一步：店主看到的，加上灰底框里系统同时在做什么。为了改措辞，新邀请从 2026-11-21 起暂停；11 月 26 日有 23 家带认证蓝勾、6 家有店主确认的栏位。',
  )} steps={[
    { icon: <MessageCircle size={18} />, you: t('Gets one WhatsApp message', '收到一条 WhatsApp'), behind: t('Only live, unverified, non-chain places with a Malaysian mobile; weekdays 10:00–18:00, never in a restaurant’s lunch rush.', '只发已上线、未认证、非连锁、有马来西亚手机号的店；平日 10:00–18:00，不在餐厅午市时段。') },
    { icon: <Store size={18} />, you: t('Reads why the shop was picked, plus its hours and address', '读到被选中的理由，以及营业时间和地址'), behind: t('Opens with a reviewed selling point the owner can check; no ranking or price claims.', '用一个复核过、店家自己能核实的卖点开场；不提排名或价格。') },
    { icon: <BadgeCheck size={18} />, you: t('Replies “correct”', '回「对」'), behind: t('Rules read the reply first; a small local model only picks one of 12 FAQ answers, always sent in fixed wording.', '先用规则读回复；本机小模型只负责从 12 个常见问题里挑一个，回复永远是固定措辞。') },
    { icon: <ShieldCheck size={18} />, you: t('Sees the blue tick appear', '看到蓝勾出现'), behind: t('A person previews, then verifies; the confirmed fields are locked against bots.', '人先预览再认证；确认过的栏位从此 bot 改不了。') },
    { icon: <Link2 size={18} />, you: t('Wants to edit the page', '想自己改资料'), behind: t('Gets a one-time owner link (at most 3 a day); what they submit there goes live directly.', '拿到一次性店主链接（一天最多 3 条）；在那里提交的内容直接上线。') },
    { icon: <Clock3 size={18} />, you: t('Says nothing, or “stop”', '不回，或说「不要」'), behind: t('At most one follow-up; “stop” goes on a permanent list. Money or complaints wait for a person.', '最多跟进一次；「不要」进永久名单。谈钱、投诉都等人处理。') },
  ]} /> },

  /* ------------------------------------------------------------ 9. control room */
  heading('ap-control', isZh, t('9 · The control room fixes the site and the code', '9 · 控制室修网站、修代码')),
  { kind: 'p', text: t(
    'A personal dashboard on the owner’s Mac runs every job above on a schedule, and also keeps the code itself healthy: AI writes the fix, a different AI reviews it, the tests run on a second Mac at home, and a green change merges itself.',
    '店主 Mac 上的个人面板按时间表跑上面所有任务，也照顾代码本身：AI 写修复、另一个 AI 审、测试在家里第二台 Mac 上跑，全绿的改动自己合并。',
  ) },
  { kind: 'node', node: <SsFlow isZh={isZh} title={t('From a problem to a merged fix', '从发现问题到修复合并')} ariaLabel={t(
    'Flowchart: a problem is found by a nightly check. A fresh copy of the code is made and the tests are run first; if they already fail no agent starts. Claude writes the fix as a draft. A different model reviews it; if it blocks, the draft waits for a person. Wording changes wait for a person too. Then the tests run on the home M1; if any fail, it stops and the reason goes to the dashboard home page. When everything passes the change merges itself, and merging means it is live.',
    '流程图：夜间检查发现问题。开一份干净的代码副本，先跑一次测试；本来就红就不派 agent。Claude 写修复，开草稿。另一个模型审；挡下来就等人。改文案的也等人。然后在家里 M1 上跑测试；有任何失败就停下，原因上面板首页。全部通过就自己合并，合并即上线。',
  )} caption={t(
    'Made-up examples. Nightly caps: 3 sessions, 6 items each, US$15 a session and US$40 a night, 90-minute timeout; no session starts if the AI subscription is already ≥ 40 % used in its 5-hour window. A PR closed without merging means “don’t try this fix again”.',
    '示意，例子是虚构的。每晚上限：3 个会话、每个 6 件、每个会话 15 美元、每晚 40 美元、90 分钟超时；AI 订阅 5 小时额度已用 ≥ 40 % 就不开新会话。PR 没合并就被关，代表「这个修法别再试」。',
  )} nodes={[
    { id: 'found', kind: 'start', text: t('A nightly check finds a problem', '夜间检查发现问题') },
    { id: 'base', kind: 'ask', text: t('Do the tests pass before touching anything?', '动手前测试是绿的？'), down: t('Yes', '是'), side: { id: 'broken', label: t('No', '已经红'), text: t('No agent starts; flagged', '不派 agent，标记') } },
    { id: 'write', kind: 'step', text: t('Claude writes the fix as a draft (no push, no network)', 'Claude 写修复，开草稿（不能推送、不能联网）') },
    { id: 'review', kind: 'ask', text: t('A second AI agrees, and no wording changed?', '第二个 AI 同意，且没改文案？'), down: t('Yes', '是'), side: { id: 'wait', label: t('No', '否'), text: t('Stays a draft for a person', '留在草稿，等人看') } },
    { id: 'ci', kind: 'ask', text: t('All tests green on the home M1?', '家里 M1 上测试全绿？'), down: t('Yes', '全绿'), side: { id: 'stop', label: t('No', '有红'), text: t('Stops; a one-line reason on the home page', '停下，首页写一句原因') } },
    { id: 'merge', kind: 'end', text: t('Merges itself — merged means live', '自己合并 —— 合并即上线') },
  ]} examples={[
    { title: t('Example 1 · an image missing its alt text', '例子 1 · 一张图缺 alt 文字'), path: ['found', 'base', 'write', 'review', 'ci', 'merge'] },
    { title: t('Example 2 · a page title that is too long', '例子 2 · 页面标题太长'), path: ['found', 'base', 'write', 'review', 'wait'] },
    { title: t('Example 3 · a fix that breaks a test', '例子 3 · 修完弄坏了一个测试'), path: ['found', 'base', 'write', 'review', 'ci', 'stop'] },
  ]} /> },
  { kind: 'node', node: <ApBars isZh={isZh} title={t('What the auto-merge robot did', '自动合并机器人做了什么')} note={t('all projects, 18 Sep – 26 Nov 2026', '所有项目，2026-09-18 至 11-26')} rows={[
    { label: t('Merged', '合并'), value: 2381, lead: true },
    { label: t('Stopped: conflict', '停下：冲突'), value: 298 },
    { label: t('Stopped: a check failed', '停下：检查失败'), value: 116 },
  ]} caption={t(
    'Counted from the dashboard’s merge log on 26 Nov 2026. Stops are problem events, not pull requests. It only merges the owner’s own non-draft pull requests that have at least one check, all passing, pinned to the exact commit that was tested.',
    '2026-11-26 从面板的合并记录数出来。「停下」是问题次数，不是 PR 数。它只合并店主自己的、非草稿的、至少有一项检查且全部通过的 PR，并锁定在被测试的那个提交上。',
  )} /> },
  { kind: 'callout', label: t('SEO, honestly', 'SEO，老实说'), text: t(
    'Search Console, Bing, GA4 and AI-citation counts are read every day, and a whitelist of SEO fixes (llms.txt, missing alt text, title and description length) is repaired automatically on four sites. Jiju itself is not on that whitelist yet: its SEO work today is the nightly blog (written 03:00, reviewed 04:00, published 07:30, each post linking 3 places), hourly IndexNow pings, daily Bing submission and the nightly link-health check.',
    '每天读 Search Console、Bing、GA4 和 AI 引用次数；llms.txt、缺 alt、标题和描述长度这一组白名单问题，在四个网站上自动修。Jiju 本身还没进白名单：它现在的 SEO 是每晚的博客（03:00 写、04:00 审、07:30 发，每篇链 3 家店）、每小时 IndexNow、每天提交 Bing、每晚链接体检。',
  ) },

  /* ------------------------------------------------------------ 10. social */
  heading('ap-social', isZh, t('10 · Social media posts itself', '10 · 社媒自己发')),
  { kind: 'p', text: t(
    'A local model writes carousel posts that open with a question people actually ask (“Best coffee in Penang?”) and link to a Jiju page. They are drawn as cards and posted through Meta’s official API — Chinese cards on Facebook, English on Instagram.',
    '本机模型写轮播帖，开头是大家真的会问的问题（「Penang 哪里咖啡最好？」），链到 Jiju 的一页。画成卡片后经 Meta 官方接口发出 —— Facebook 发中文卡，Instagram 发英文卡。',
  ) },
  { kind: 'steps', items: [
    { title: t('04:20 · write', '04:20 · 写'), text: t('Only for open posting days. No shop names go into the prompt; a post that names a place anyway is rewritten, and model typos are caught.', '只写还空着的发帖日。提示词里不放店名；写出店名的会被改写，模型错字会被抓出来。') },
    { title: t('Draw', '画'), text: t('A headless browser renders 1080 × 1440 cards for Facebook and 1080 × 1350 for Instagram.', '无界面浏览器画出卡片：Facebook 1080 × 1440，Instagram 1080 × 1350。') },
    { title: t('After 12:00 · post', '12:00 后 · 发'), text: t('One post per project per day, one at a time. The link goes in the first comment. A post with warnings, or the same text twice, is never sent.', '每个项目每天一帖，一次一条。网址放在第一条留言。有警告的、重复文字的，一律不发。') },
    { title: t('Read back', '读回'), text: t('Views and clicks are read back every 12 hours. Meta’s read permission expires about every 90 days and needs a person to renew it.', '每 12 小时读回观看和点击。Meta 的读取权限约 90 天过期一次，要人重新授权。') },
  ] },

  /* ------------------------------------------------------------ a night */
  heading('ap-night', isZh, t('One night of the whole system', '整套系统的一晚')),
  { kind: 'node', node: <SsSchedule isZh={isZh} title={t('While the owner sleeps', '店主睡觉的时候')} note={t('Malaysia time', '马来西亚时间')} caption={t(
    'From dashboard.config.json and Jiju’s GitHub workflows on 26 Nov 2026 (a selection). Heavy local-AI jobs only start after 22:00 and 45 minutes without keyboard or mouse; from noon the owner always counts as awake. Around the clock: news every hour, the merge robot every 5 minutes, self-repair every 6 hours.',
    '取自 2026-11-26 的 dashboard.config.json 与 Jiju 的 GitHub workflow（节选）。重的本机 AI 任务只在 22:00 后、键盘鼠标闲置 45 分钟才开工；中午起一律当店主醒着。全天候：每小时读新闻、每 5 分钟跑合并机器人、每 6 小时自我修复。',
  )} rows={[
    { at: '00:40', job: t('Find selling points for places, with quotes', '找地点的卖点，附原话'), where: t('local model + Claude check', '本机模型 + Claude 把关') },
    { at: '01:30', job: t('Research places', '调查地点'), where: t('agents', 'agent') },
    { at: '02:00', job: t('Check every link; translate new text', '检查所有链接；翻译新文字'), where: t('GitHub Actions / local model', 'GitHub Actions / 本机模型') },
    { at: '02:30', job: t('Re-check promos and events; publish the ones that qualify', '复查优惠和活动，合格的上线'), where: t('Jiju rules', 'Jiju 规则') },
    { at: '02:30', job: t('Fix queued code problems', '修排队中的代码问题'), where: t('Claude, reviewed by Codex', 'Claude 写、Codex 审') },
    { at: '03:00', job: t('Write blog drafts; find new promos', '写博客草稿；找新优惠'), where: t('AI', 'AI') },
    { at: '03:40', job: t('Snapshot the database', '给资料库拍快照'), where: t('second Mac at home', '家里第二台 Mac') },
    { at: '04:20', job: t('Write social posts', '写社媒帖子'), where: t('local model', '本机模型') },
    { at: '05:10', job: t('Write place descriptions', '写地点说明'), where: t('local model', '本机模型') },
    { at: '06:10', job: t('Read food news for new places', '读美食新闻找新店'), where: t('local model', '本机模型') },
    { at: '07:30', job: t('Publish the blog post', '发布博客'), where: t('auto-merge after checks', '检查通过后自动合并') },
  ]} last={{ at: t('AM', '早上'), job: t('A short list of what waits for the owner', '一张等店主决定的短清单'), where: t('dashboard home page', '面板首页') }} /> },

  /* ------------------------------------------------------------ people */
  heading('ap-people', isZh, t('What still needs a person', '还要人来做的事')),
  { kind: 'node', node: <ApSplit isZh={isZh} title={t('Who decides what', '谁决定什么')} auto={[
    t('Publish a place once its five items are complete', '五项齐了的地点上线'),
    t('Publish an event or promo with an official source', '有官方来源的活动、优惠上线'),
    t('Take down closed shops and expired events', '下架倒闭的店和过期的活动'),
    t('Merge a code change when every check is green', '检查全绿的代码改动合并'),
    t('Post one social card a day', '每天发一张社媒卡片'),
  ]} human={[
    t('Verify a place after the owner confirms', '店主确认后认证这家'),
    t('Shops that moved; money talk and complaints', '搬家的店；谈钱和投诉'),
    t('Changes to wording, and drafts another AI blocked', '改文案，以及被另一个 AI 挡下的草稿'),
    t('Anything that costs money, and every log-in', '任何要花钱的事，以及每一次登录'),
    t('Turning any automation on for a new site', '给新网站开任何自动化'),
  ]} caption={t('As set in the rules on 26 Nov 2026. Spending caps are set by hand; nothing above those caps runs without asking.', '2026-11-26 规则里的分工。花钱上限由人手设定；超过上限的事不问就不做。')} /> },

  /* ------------------------------------------------------------ for buyers */
  heading('ap-buy', isZh, t('If you want this system', '如果你想要这套系统')),
  { kind: 'p', text: t(
    'It is built for one person running a listings business — places, shops, events, deals — who wants the data to stay true without hiring a team to keep it true.',
    '它是为「一个人经营名录类生意」做的 —— 地点、店家、活动、优惠 —— 想让资料一直是真的，又不想为此请一个团队。',
  ) },
  { kind: 'steps', items: [
    { title: t('What you get', '你会拿到'), text: t('The site, back office and agent tools; the control-room dashboard with its scheduler, auto-merge and repair loops; the bot rules and research queue; the WhatsApp owner flow; the social pipeline; and the written rules and skills the agents read.', '网站、后台与 agent 工具；控制室面板（排程、自动合并、自我修复）；bot 规则与调查队列；店主 WhatsApp 流程；社媒流水线；以及 agent 要读的成文规矩与技能。') },
    { title: t('What you need', '你需要准备'), text: t('A Firebase / Google Cloud project; an Apple-silicon Mac (64 GB runs the 26B local model) and ideally a second small Mac for CI and snapshots; Claude and Grok subscriptions; a Meta app for Facebook and Instagram; a WhatsApp number for the assistant.', '一个 Firebase / Google Cloud 项目；一台 Apple 芯片的 Mac（64 GB 才跑得动 26B 本机模型），最好再有一台小 Mac 跑 CI 和快照；Claude 与 Grok 订阅；一个 Meta 应用接 Facebook 和 Instagram；一个给助手用的 WhatsApp 号码。') },
    { title: t('How it is adapted', '怎么改成你的'), text: t('Categories, the five publish items, trusted sources, regions and news outlets are settings and rule files, not rewrites. The rules that came from real mistakes come with their dates.', '类别、上架五项、可信来源、地区、新闻源都是设定和规则文件，不用重写。那些从真实错误里来的规矩，连日期一起交给你。') },
  ] },
  { kind: 'node', node: <SsGlossary isZh={isZh} terms={[
    { icon: <Bot size={18} />, term: t('Agent', 'Agent'), text: t('An AI that does a job on its own, following written rules.', '照成文规矩、自己完成一件事的 AI。') },
    { icon: <KeyRound size={18} />, term: t('MCP tools', 'MCP 工具'), text: t('The only door agents use to read or change Jiju’s data.', 'agent 读写 Jiju 资料唯一的那扇门。') },
    { icon: <Search size={18} />, term: t('Research queue', '调查队列'), text: t('The list of gaps bots are sent to fill, biggest first.', '派 bot 去补的缺口清单，大的先补。') },
    { icon: <Database size={18} />, term: t('Snapshot', '快照'), text: t('A nightly copy of the data that agents read instead of the live one.', '每晚一份资料副本，agent 读它，不读正式库。') },
    { icon: <CalendarCheck size={18} />, term: t('Draft', '草稿'), text: t('A place Jiju knows about but doesn’t show yet.', 'Jiju 知道、但还没显示出来的地点。') },
    { icon: <ShieldCheck size={18} />, term: t('Owner-confirmed', '店主确认'), text: t('A field the owner said is right; bots can no longer change it.', '店主说对的栏位，bot 从此改不了。') },
    { icon: <Wrench size={18} />, term: t('Auto-merge', '自动合并'), text: t('A code change that passes every check goes live by itself.', '通过所有检查的代码改动自己上线。') },
  ]} /> },
];
