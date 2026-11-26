/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Body of /jiju-autopilot: the Jiju automation system, told the way a buyer reads it (owner, 2026-11-26):
// first the problems a directory has (six dimensions), then the one closed loop that covers all of them,
// then proof from search data, and only then the ten machines with their real rules.
// Facts were read on 2026-11-26 from Jiju origin/main (2f0ede67), personal-dashboard (dashboard.config.json,
// docs/modules/*, data/auto-merge.jsonl, data/seo/Jiju.json — Search Console, GA4), News-Rss docs and the
// nightly snapshot ~/jiju-snapshots/latest. Privacy: no keys, phone numbers, owner or customer names,
// browser profiles or prices; examples are made up and marked as such.

import React from 'react';
import {
  BadgeCheck, Bot, Camera, CalendarCheck, Clock3, Code2, Database, Eye, EyeOff, Globe2, KeyRound, Languages, Link2, Megaphone,
  MessageCircle, Newspaper, PenLine, Search, ShieldCheck, Store, Tag, Wrench,
} from 'lucide-react';
import type { EpBlock, EpText } from '../ProductStorePage';
import { JijuBeliefBlankArt, JijuBeliefCheckArt, JijuBeliefDecideArt, JijuBeliefSaveArt, JijuBeliefSourceArt, JijuLoopArt } from '../css-art/jiju-story-art';
import { SsBeliefs, SsFlow, SsGlossary, SsHero, SsJourney, SsSchedule } from '../system-story/SystemStory';
import {
  ApBars, ApColumns, ApCompare, ApFlip, ApLoop, ApTeamCost, ApWorkload, ApMachineDeck, ApMatrix, ApProblems, ApPublishGate, ApSplit, ApSteps,
  type ApMachine, type ApMatrixCol,
} from './AutopilotFigures';

const t = (en: string, zh: string): EpText => ({ en, zh });
const heading = (id: string, isZh: boolean, text: EpText): EpBlock => ({ kind: 'node', node: <h2 id={id}>{isZh ? text.zh : text.en}</h2> });
const lead = (isZh: boolean, text: EpText) => <p className="jap-lead">{isZh ? text.zh : text.en}</p>;

/* The six problem dimensions, in the order of the loop (and of the banner's stations). */
const DIM = {
  coverage: t('Coverage', '覆盖'),
  complete: t('Completeness', '完整'),
  accuracy: t('Accuracy', '准确'),
  found: t('Being found', '被搜到'),
  reach: t('Reach', '声量'),
  fresh: t('Freshness', '时效'),
  upkeep: t('Upkeep', '维护'),
};

/* Google Search Console, sc-domain:jiju.pet, full Monday-to-Sunday weeks 1 Jun – 22 Nov 2026
   (personal-dashboard data/seo/Jiju.json, fetched 26 Nov 2026). */
const WEEKS_IMPRESSIONS = [223, 494, 702, 566, 488, 644, 716, 611, 699, 773, 742, 740, 618, 741, 897, 1071, 1490, 2152, 3086, 10212, 15424, 16699, 32255, 62954, 80407];
const WEEKS_CLICKS = [2, 2, 3, 5, 4, 3, 3, 3, 5, 9, 6, 3, 5, 4, 2, 3, 8, 18, 23, 54, 56, 75, 116, 164, 190];
const WEEK_LABELS = [
  { at: 0, text: t('Jun', '6 月') },
  { at: 9, text: t('Aug', '8 月') },
  { at: 18, text: t('Oct', '10 月') },
  { at: 24, text: t('Nov 16', '11/16') },
];

const MACHINE_COLS: ApMatrixCol[] = [
  { id: 'news', icon: <Newspaper size={14} />, name: t('News & events', '新闻与活动') },
  { id: 'grok', icon: <Bot size={14} />, name: t('Grok bots', 'Grok bot') },
  { id: 'mcp', icon: <KeyRound size={14} />, name: t('Back office (MCP)', '后台（MCP）') },
  { id: 'publish', icon: <BadgeCheck size={14} />, name: t('Auto-publish', '自动上架') },
  { id: 'unpublish', icon: <EyeOff size={14} />, name: t('Auto-unpublish', '自动下架') },
  { id: 'photos', icon: <Camera size={14} />, name: t('Photos', '图片') },
  { id: 'web', icon: <Globe2 size={14} />, name: t('Around the web', '网上怎么说') },
  { id: 'owners', icon: <MessageCircle size={14} />, name: t('Owners on WhatsApp', '店主 WhatsApp') },
  { id: 'control', icon: <Wrench size={14} />, name: t('Control room', '控制室') },
  { id: 'social', icon: <Megaphone size={14} />, name: t('Social media', '社媒') },
];

const machines = (isZh: boolean): ApMachine[] => [
  {
    id: 'news', hue: 'amber', icon: <Newspaper size={18} />, name: t('News & events', '新闻与活动'), solves: [DIM.coverage, DIM.fresh],
    text: t(
      'A computer at home reads Malay Mail, FMT, NST, Buletin Mutiara and CNA every hour. A local AI model translates the headlines and picks out events and public notices; Jiju’s own rules decide which event may publish itself.',
      '家里的电脑每小时读一次 Malay Mail、FMT、NST、Buletin Mutiara 和 CNA。本机 AI 模型翻译标题，挑出活动与公告；哪个活动能自己上线，由 Jiju 自己的规则决定。',
    ),
    detail: <SsFlow isZh={isZh} title={t('From a news item to a live event', '从一条新闻到一个上线的活动')} ariaLabel={t(
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
    ]} />,
  },
  {
    id: 'grok', hue: 'iris', icon: <Bot size={18} />, name: t('Grok research bots', 'Grok 调查 bot'), solves: [DIM.complete, DIM.coverage],
    text: t(
      'Five Grok assistants — deals, events, links, media and story — ask Jiju for work, five tasks at a time. Each task comes with the same rules; each answer is checked again that night.',
      '5 个 Grok 助手（优惠、活动、链接、媒体、故事）向 Jiju 领任务，一次 5 件。每件任务都附同一套规矩；每个交回来的答案当晚再查一次。',
    ),
    detail: (
      <>
        <SsFlow isZh={isZh} title={t('One research task', '一件调查任务')} ariaLabel={t(
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
        ]} />
        <ApBars isZh={isZh} title={t('Daily task limit per bot', '每个 bot 每天最多几件')} note={t('400 a day in total', '一天合计 400')} rows={[
          { label: t('Deals', '优惠'), value: 100, lead: true },
          { label: t('Links', '链接'), value: 90 },
          { label: t('Media', '媒体'), value: 80 },
          { label: t('Story', '故事'), value: 70 },
          { label: t('Events', '活动'), value: 60 },
        ]} caption={t('Limits as configured in Jiju’s research queue on 26 Nov 2026. The bots started on 21 Nov 2026; a region that misses twice in a row is paused for 7 days.', '2026-11-26 Jiju 调查队列里的设定。bot 从 2026-11-21 开始跑；一个地区连续两次落空就停 7 天。')} />
      </>
    ),
  },
  {
    id: 'mcp', hue: 'leaf', icon: <KeyRound size={18} />, name: t('One locked door (MCP)', '一扇上锁的门（MCP）'), solves: [DIM.accuracy],
    text: t(
      'No agent touches the database directly. Every bot, script and AI session goes through the same 108 back-office tools (an MCP server), with its own key.',
      '没有任何 agent 直接碰资料库。所有 bot、脚本和 AI 会话都经过同一套 108 个后台工具（MCP 服务），各拿各的钥匙。',
    ),
    detail: <ApSteps isZh={isZh} items={[
      { title: t('Three kinds of key', '三种钥匙'), text: t('Read, write and admin. Only a hash of each key is stored, and the name in the audit log comes from the key — not from what the client claims.', '只读、可写、管理员。钥匙只存哈希；审计日志里的名字来自钥匙本身，不是客户端自己报的。') },
      { title: t('Plan first', '先给计划'), text: t('A write tool returns a plan by default. Only `apply: true` changes anything; every call is kept for 90 days.', '写入工具默认只回计划，带 `apply: true` 才真的改；每次调用保留 90 天。') },
      { title: t('Protected fields', '受保护的栏位'), text: t('If an owner confirmed a field, a bot’s change to it becomes a question for a person instead.', '店主确认过的栏位，bot 想改时会变成一个等人决定的问题。') },
      { title: t('Read the copy, not production', '读副本，不读正式库'), text: t('Every night at 03:40 a second machine takes a snapshot (about 3,500 reads, no personal data). Agents search the snapshot, because listing places from production reads the whole table each time.', '每晚 03:40 另一台机器拍一次快照（约 3,500 次读取，不含个人资料）。agent 查快照，因为从正式库列地点每次都要整表读。') },
    ]} />,
  },
  {
    id: 'publish', hue: 'coral', icon: <BadgeCheck size={18} />, name: t('Auto-publish', '自动上架'), solves: [DIM.complete, DIM.found],
    text: t(
      'There is no “publish” button for machines. A draft goes live by itself the moment a real change makes all five items complete — nobody is asked to go and click it.',
      '机器没有「上架」按钮。草稿在某次真实改动让五项全齐的那一刻，自己上线 —— 不用叫谁去后台点。',
    ),
    detail: (
      <>
        <ApPublishGate isZh={isZh} title={t('The publish check, run on every save', '每次保存都跑的上架检查')} live={t('Live on jiju.pet', '在 jiju.pet 上线')} items={[
          { name: t('Name', '名字'), rule: t('not empty, not “unknown”', '不能空、不能是「unknown」') },
          { name: t('Opening hours', '营业时间'), rule: t('real hours — a Mon–Sun 9-to-9 template doesn’t count', '真实时间 —— 周一到周日 9 点到 9 点的模板不算') },
          { name: t('Description', '说明'), rule: t('more than 20 characters, not “Details not provided”', '超过 20 个字，不能是「Details not provided」') },
          { name: t('Photo', '照片'), rule: t('at least one stored in Jiju’s own storage', '至少一张存在 Jiju 自己的空间') },
          { name: t('Location', '位置'), rule: t('an address or coordinates', '地址或坐标') },
        ]} caption={t(
          'Rules from Jiju’s placeMissingInfo on 25 Nov 2026. It never fires when a person changed the status in the same save, when the place is on hold, archived, permanently closed or expired, or when the save changed nothing. Branches of a chain take description and photo from the brand.',
          '规则取自 2026-11-25 Jiju 的 placeMissingInfo。以下情况不会触发：同一次保存里有人改了上下架、这家被暂停、已归档、永久歇业或过期、这次保存没真改东西。连锁分店的说明和照片沿用品牌。',
        )} />
        <ApBars isZh={isZh} title={t('Every place Jiju knows about', 'Jiju 知道的所有地点')} note={t('2,437 in total', '共 2,437 家')} rows={[
          { label: t('Live', '上线'), value: 944, lead: true },
          { label: t('Archived', '归档'), value: 855 },
          { label: t('Draft', '草稿'), value: 638 },
        ]} caption={t('Nightly snapshot of 26 Nov 2026. On 25 Nov the regional drafts were mostly missing opening hours (434 of 445) — that is exactly the work handed to the Grok bots.', '2026-11-26 每晚快照。11 月 25 日的地区草稿大多缺营业时间（445 家里 434 家）—— 这正是派给 Grok bot 的活。')} />
      </>
    ),
  },
  {
    id: 'unpublish', hue: 'sky', icon: <EyeOff size={18} />, name: t('Auto-unpublish', '自动下架'), solves: [DIM.fresh, DIM.accuracy],
    text: t(
      'Every Monday a quarter of the live places are checked against Google’s business status, so the whole list is covered every month. A permanently closed place goes back to draft — never deleted.',
      '每个星期一，拿四分之一的上线地点去对 Google 的营业状态，每个月全部轮一遍。永久歇业的退回草稿 —— 从不删除。',
    ),
    detail: (
      <>
        <SsFlow isZh={isZh} title={t('The Monday closed-shop sweep', '星期一的倒闭巡查')} ariaLabel={t(
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
        ]} />
        <ApSteps isZh={isZh} items={[
          { title: t('Expired', '过期'), text: t('Every morning at 08:00, events and pop-ups past their end date are unpublished.', '每天早上 08:00，过了结束日期的活动和快闪下架。') },
          { title: t('Reported closed', '有人回报关门'), text: t('A bot that finds a permanent closure, a move or a long closure files it, and the place drops to draft. Weekly rest days and short holidays are never filed.', 'bot 发现永久关门、搬家或长期停业就回报，这家退回草稿。每周休息日和短假从不回报。') },
          { title: t('Duplicates', '重复'), text: t('Old copies of a chain are archived with a pointer to the merged place, kept 4 weeks, then deleted only after a backup.', '连锁店的旧副本归档并指向合并后的那家，保留 4 周，备份后才删。') },
        ]} />
      </>
    ),
  },
  {
    id: 'photos', hue: 'iris', icon: <Camera size={18} />, name: t('Photos', '图片'), solves: [DIM.complete],
    text: t(
      'Every place needs real photos — at least five, one of them the shop front. They are copied into Jiju’s own storage, and every photo keeps a link to where it came from.',
      '每家都要真实照片 —— 至少五张，其中一张是门面。照片复制进 Jiju 自己的存储空间，每张都留着来源链接。',
    ),
    detail: <ApSplit isZh={isZh} title={t('Which photos are copied, and which are only linked', '哪些照片复制进来，哪些只放链接')} heads={[t('Copied into Jiju', '复制进 Jiju'), t('Shown in place, never copied', '原地展示，不复制')]} auto={[
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
    )} />,
  },
  {
    id: 'web', hue: 'amber', icon: <Globe2 size={18} />, name: t('Around the web', '网上怎么说'), solves: [DIM.accuracy, DIM.fresh],
    text: t(
      'Every place should have its official site and socials, then a few independent articles or videos about it. Links are ranked by how much they can be trusted, and only the strong ones are shown.',
      '每家都应该有官网和官方社媒，再加几篇只写这家的文章或视频。链接按可信度排序，只展示可信的。',
    ),
    detail: <SsFlow isZh={isZh} title={t('Is this link good enough to show?', '这条链接够不够格展示？')} ariaLabel={t(
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
    ]} />,
  },
  {
    id: 'owners', hue: 'leaf', icon: <MessageCircle size={18} />, name: t('Owners on WhatsApp', '店主 WhatsApp'), solves: [DIM.accuracy, DIM.fresh],
    text: t(
      'Hermes, an AI assistant with its own WhatsApp number, sends a short invite to the owner of a live place and handles the reply. Sending is deliberately slow: at most five a day.',
      'Hermes 是一个有自己 WhatsApp 号码的 AI 助手，给已上线地点的店主发一条简短邀请，再处理回复。故意发得很慢：一天最多五条。',
    ),
    detail: <SsJourney isZh={isZh} title={t('One invitation, two sides', '一次邀请，两条线')} youLabel={t('the owner', '店主')} caption={t(
      'Each step: what the owner sees, and in the shaded box what the system does. New invites have been paused since 21 Nov 2026 while the wording is reviewed; on 26 Nov, 23 places carried the verified tick and 6 had owner-confirmed fields.',
      '每一步：店主看到的，加上灰底框里系统同时在做什么。为了改措辞，新邀请从 2026-11-21 起暂停；11 月 26 日有 23 家带认证蓝勾、6 家有店主确认的栏位。',
    )} steps={[
      { icon: <MessageCircle size={18} />, you: t('Gets one WhatsApp message', '收到一条 WhatsApp'), behind: t('Only live, unverified, non-chain places with a Malaysian mobile; weekdays 10:00–18:00, never in a restaurant’s lunch rush.', '只发已上线、未认证、非连锁、有马来西亚手机号的店；平日 10:00–18:00，不在餐厅午市时段。') },
      { icon: <Store size={18} />, you: t('Reads why the shop was picked, plus its hours and address', '读到被选中的理由，以及营业时间和地址'), behind: t('Opens with a reviewed selling point the owner can check; no ranking or price claims.', '用一个复核过、店家自己能核实的卖点开场；不提排名或价格。') },
      { icon: <BadgeCheck size={18} />, you: t('Replies “correct”', '回「对」'), behind: t('Rules read the reply first; a small local model only picks one of 12 FAQ answers, always sent in fixed wording.', '先用规则读回复；本机小模型只负责从 12 个常见问题里挑一个，回复永远是固定措辞。') },
      { icon: <ShieldCheck size={18} />, you: t('Sees the blue tick appear', '看到蓝勾出现'), behind: t('A person previews, then verifies; the confirmed fields are locked against bots.', '人先预览再认证；确认过的栏位从此 bot 改不了。') },
      { icon: <Link2 size={18} />, you: t('Wants to edit the page', '想自己改资料'), behind: t('Gets a one-time owner link (at most 3 a day); what they submit there goes live directly.', '拿到一次性店主链接（一天最多 3 条）；在那里提交的内容直接上线。') },
      { icon: <Clock3 size={18} />, you: t('Says nothing, or “stop”', '不回，或说「不要」'), behind: t('At most one follow-up; “stop” goes on a permanent list. Money or complaints wait for a person.', '最多跟进一次；「不要」进永久名单。谈钱、投诉都等人处理。') },
    ]} />,
  },
  {
    id: 'control', hue: 'coral', icon: <Wrench size={18} />, name: t('Control room: SEO & code', '控制室：SEO 与代码'), solves: [DIM.upkeep, DIM.found],
    text: t(
      'A personal dashboard on the owner’s Mac runs every job above on a schedule, and also keeps the code itself healthy: AI writes the fix, a different AI reviews it, the tests run on a second Mac at home, and a green change merges itself.',
      '店主 Mac 上的个人面板按时间表跑上面所有任务，也照顾代码本身：AI 写修复、另一个 AI 审、测试在家里第二台 Mac 上跑，全绿的改动自己合并。',
    ),
    detail: (
      <>
        <SsFlow isZh={isZh} title={t('From a problem to a merged fix', '从发现问题到修复合并')} ariaLabel={t(
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
        ]} />
        <ApBars isZh={isZh} title={t('What the auto-merge robot did', '自动合并机器人做了什么')} note={t('all projects, 18 Sep – 26 Nov 2026', '所有项目，2026-09-18 至 11-26')} rows={[
          { label: t('Merged', '合并'), value: 2381, lead: true },
          { label: t('Stopped: conflict', '停下：冲突'), value: 298 },
          { label: t('Stopped: a check failed', '停下：检查失败'), value: 116 },
        ]} caption={t(
          'Counted from the dashboard’s merge log on 26 Nov 2026. Stops are problem events, not pull requests. It only merges the owner’s own non-draft pull requests that have at least one check, all passing, pinned to the exact commit that was tested.',
          '2026-11-26 从面板的合并记录数出来。「停下」是问题次数，不是 PR 数。它只合并店主自己的、非草稿的、至少有一项检查且全部通过的 PR，并锁定在被测试的那个提交上。',
        )} />
        <ApSteps isZh={isZh} items={[
          { title: t('SEO, every day', 'SEO，每天'), text: t('Search Console, Bing, GA4 and AI-citation counts are read daily. Jiju’s SEO work today is the nightly blog (written 03:00, reviewed 04:00, published 07:30, each post linking 3 places), hourly IndexNow pings, daily Bing submission and a nightly link-health check.', '每天读 Search Console、Bing、GA4 和 AI 引用次数。Jiju 现在的 SEO 是每晚的博客（03:00 写、04:00 审、07:30 发，每篇链 3 家店）、每小时 IndexNow、每天提交 Bing、每晚链接体检。') },
          { title: t('Automatic SEO fixes', '自动修 SEO'), text: t('A whitelist of fixes (llms.txt, missing alt text, title and description length) is repaired automatically on four other sites. Jiju is not on that whitelist yet.', '一组白名单问题（llms.txt、缺 alt、标题和描述长度）在另外四个网站上自动修。Jiju 还没进这个白名单。') },
        ]} />
      </>
    ),
  },
  {
    id: 'social', hue: 'rose', icon: <Megaphone size={18} />, name: t('Social media', '社交媒体'), solves: [DIM.reach],
    text: t(
      'A local model writes carousel posts that open with a question people actually ask (“Best coffee in Penang?”) and link to a Jiju page. They are drawn as cards and posted through Meta’s official API — Chinese cards on Facebook, English on Instagram.',
      '本机模型写轮播帖，开头是大家真的会问的问题（「Penang 哪里咖啡最好？」），链到 Jiju 的一页。画成卡片后经 Meta 官方接口发出 —— Facebook 发中文卡，Instagram 发英文卡。',
    ),
    detail: <ApSteps isZh={isZh} items={[
      { title: t('04:20 · write', '04:20 · 写'), text: t('Only for open posting days. No shop names go into the prompt; a post that names a place anyway is rewritten, and model typos are caught.', '只写还空着的发帖日。提示词里不放店名；写出店名的会被改写，模型错字会被抓出来。') },
      { title: t('Draw', '画'), text: t('A headless browser renders 1080 × 1440 cards for Facebook and 1080 × 1350 for Instagram.', '无界面浏览器画出卡片：Facebook 1080 × 1440，Instagram 1080 × 1350。') },
      { title: t('After 12:00 · post', '12:00 后 · 发'), text: t('One post per project per day, one at a time. The link goes in the first comment. A post with warnings, or the same text twice, is never sent.', '每个项目每天一帖，一次一条。网址放在第一条留言。有警告的、重复文字的，一律不发。') },
      { title: t('Read back', '读回'), text: t('Views and clicks are read back every 12 hours. Meta’s read permission expires about every 90 days and needs a person to renew it.', '每 12 小时读回观看和点击。Meta 的读取权限约 90 天过期一次，要人重新授权。') },
    ]} />,
  },
];

export const jijuAutopilotBlocks = (isZh: boolean): EpBlock[] => [
  /* ------------------------------------------------------------ opening: the buyer's problem */
  { kind: 'p', text: t(
    'If you run a directory — places, shops, events, deals — you already know the problem: the moment a listing goes up, it starts going stale. Shops close, hours change, new places open, Google doesn’t notice you, and the social account goes quiet.',
    '如果你在经营一个名录 —— 地点、店家、活动、优惠 —— 你一定知道这个问题：资料一上线就开始过时。店会关、营业时间会改、新店不断开、Google 看不见你、社媒账号慢慢没声音。',
  ) },
  { kind: 'p', text: t(
    'Jiju Autopilot is the system that keeps jiju.pet — 944 live pet-friendly places in Malaysia and Singapore — true and growing with one person. This page shows which problems it solves, how, and the search data that shows it working.',
    'Jiju Autopilot 就是让 jiju.pet（马来西亚和新加坡 944 家上线的宠物友好地点）靠一个人保持准确、持续增长的那套系统。这一页讲它解决哪些问题、怎么解决，以及证明它在起作用的搜索数据。',
  ) },
  { kind: 'node', node: <SsHero isZh={isZh} Art={JijuLoopArt} label={t(
    'Illustration: six stations on one loop around the Jiju cat — a news card, a robot, a tick, a shop, a speech bubble and an eye — with a dot running round it; a trail of dots leads to a search box over bars that grow.',
    '插画：黑猫周围一圈六个站 —— 新闻卡、机器人、勾、店面、对话框、眼睛 —— 一个圆点绕着跑；一串点通往搜索框，下面的柱子一根根长高。',
  )} caption={t('One loop runs every day and night: find, fill, check, publish, share, watch — and the pages it publishes are what people find on Google.', '一个闭环日夜在转：发现、补齐、把关、上线、分享、巡查 —— 它上线的每一页，就是别人在 Google 上搜到的那一页。')} /> },
  { kind: 'node', node: <ApFlip isZh={isZh} sides={[
    { label: t('Traditional team', '传统公司'), tone: 'old', items: [
      { value: '7', text: t('people: researcher, data entry, editor, SEO, social media, developer, operations', '个人：资料员、录入员、编辑、SEO、社媒、工程师、运营') },
      { value: 'RM 29,289', text: t('a month in salaries and employer contributions', '每月薪水加雇主公积金等') },
      { value: isZh ? '等投诉' : 'Complaints', text: t('is how a closed shop usually gets noticed', '才发现店已经关了') },
    ] },
    { label: t('Jiju Autopilot', 'Jiju Autopilot'), tone: 'new', items: [
      { value: '1', text: t('person, plus one closed loop of machines', '个人，加一个由机器组成的闭环') },
      { value: 'RM 1,544', text: t('a month in AI subscriptions, cloud and domains', '每月 AI 订阅、云端与域名') },
      { value: isZh ? '4 周' : '4 weeks', text: t('to re-check every live place against Google, automatically', '自动把每家上线地点对 Google 复查一遍') },
    ] },
  ]} caption={t(
    'Flips by itself; tap a side to hold it. Team cost: JobStreet Malaysia median salaries (Nov 2026) plus 14.95 % employer EPF, SOCSO and EIS. Autopilot cost: the owner’s own subscriptions at US$1 = RM 4.2, cloud and domains at the top of the owner’s estimate; the two Macs it runs on are not included. Details below.',
    '会自己切换；点一边可以停住。团队成本：JobStreet 马来西亚 2026 年 11 月薪资中位数，加 14.95% 雇主 EPF、SOCSO、EIS。Autopilot 成本：店主自己的订阅，按 US$1 = RM 4.2 换算，云端与域名取店主估计的上限；不含运行它的两台 Mac。细节在下面。',
  )} /> },
  { kind: 'stats', items: [
    { value: 944, unit: t('places', '家'), text: t('live on jiju.pet, kept up by machines (26 Nov 2026)', '在 jiju.pet 上线，由机器维护（2026-11-26）') },
    { value: 195939, unit: t('times', '次'), text: t('shown on Google in the last 28 days — 5× the 28 days before', '最近 28 天在 Google 上被展示 —— 是前 28 天的 5 倍') },
    { value: 2381, unit: t('changes', '个改动'), text: t('to the code merged by themselves after every check passed', '代码改动在检查全过后自己合并') },
  ] },

  /* ------------------------------------------------------------ 1. problems as dimensions */
  heading('ap-problems', isZh, t('Six ways a directory goes wrong', '名录会在六个维度上出问题')),
  { kind: 'node', node: lead(isZh, t(
    'Each one is a full-time job on its own. Hiring for all six is why most directories die or go stale.',
    '每一个单独拿出来都是一份全职工作。六个都要请人，是大部分名录做不下去、或者慢慢过时的原因。',
  )) },
  { kind: 'node', node: <ApProblems isZh={isZh} caption={t(
    'Numbers are Jiju’s own on 25–26 Nov 2026: nightly data snapshot, Google Search Console, the back-office tool list and the auto-merge log.',
    '数字都是 Jiju 自己在 2026-11-25 至 26 的数据：每晚资料快照、Google Search Console、后台工具清单和自动合并记录。',
  )} items={[
    { id: 'coverage', hue: 'amber', icon: <Newspaper size={18} />, dim: DIM.coverage, pain: t('New places open every week. Nobody tells you.', '每周都有新店开，没人通知你。'), value: 2437, unit: t('places', '家'), scale: t('found and tracked so far, live or not', '目前已发现、追踪，不论是否上线') },
    { id: 'complete', hue: 'iris', icon: <Bot size={18} />, dim: DIM.complete, pain: t('Listings stay half-empty: no hours, no photos.', '资料半空：没营业时间、没照片。'), value: 434, scale: t('of 445 regional drafts were missing opening hours — now queued for the bots', '个地区草稿（共 445）缺营业时间 —— 已排给 bot 补') },
    { id: 'accuracy', hue: 'leaf', icon: <ShieldCheck size={18} />, dim: DIM.accuracy, pain: t('Is it true? Who said so?', '这是真的吗？谁说的？'), value: 108, unit: t('tools', '个工具'), scale: t('— the only way to change the data; every write previewed and logged', '—— 改资料的唯一入口；每笔先预演、再记录') },
    { id: 'found', hue: 'coral', icon: <Search size={18} />, dim: DIM.found, pain: t('Nobody finds you on Google.', 'Google 上没人搜得到你。'), value: 1018, unit: t('pages', '页'), scale: t('appeared in Google results in the last 28 days', '最近 28 天出现在 Google 搜索结果里') },
    { id: 'reach', hue: 'rose', icon: <Megaphone size={18} />, dim: DIM.reach, pain: t('The social accounts go quiet.', '社媒账号慢慢没声音。'), value: 1, unit: t('post a day', '帖 / 天'), scale: t('written, drawn and posted on Facebook and Instagram by itself', '自己写、自己画、自己发到 Facebook 和 Instagram') },
    { id: 'fresh', hue: 'sky', icon: <Eye size={18} />, dim: DIM.fresh, pain: t('A shop closes. Your page still sends people there.', '店关了，你的页面还在叫人过去。'), value: 4, unit: t('weeks', '周'), scale: t('to re-check every live place against Google — a quarter every Monday', '把每家上线地点对 Google 复查一遍 —— 每周一查四分之一') },
  ]} /> },

  /* ------------------------------------------------------------ 2. the closed loop */
  heading('ap-loop', isZh, t('One closed loop covers all six', '一个闭环，六个维度一起解决')),
  { kind: 'node', node: lead(isZh, t(
    'Not six tools glued together — one loop. What one stage finds, the next fills in; what goes live gets watched; what the watch finds goes back to the start. Nothing waits for you unless it should.',
    '不是六个工具拼起来，而是一个闭环。上一站发现的，下一站补齐；上线的会被盯着；盯出来的问题又回到起点。除非真的该你决定，否则没有一件事在等你。',
  )) },
  { kind: 'node', node: <ApLoop isZh={isZh} title={t('The loop, one stage at a time', '闭环，一站一站看')} center={{
    title: t('Control room', '控制室'),
    text: t('runs the loop, fixes the code', '排程、修代码'),
  }} caption={t('Tap a stage to stop on it. The control room in the middle runs every stage on a schedule and repairs the site itself.', '点一站可以停在那里。中间的控制室按时间表跑每一站，也负责修网站本身。')} stages={[
    { id: 'discover', hue: 'amber', icon: <Newspaper size={18} />, name: t('Discover', '发现'), dim: DIM.coverage, text: t('News, events and new places come in by themselves: five outlets read every hour, food news every morning, bots that follow up every lead.', '新闻、活动、新店自己进来：每小时读 5 家媒体，每天早上读美食新闻，每条线索都有 bot 跟进。'), machines: [t('News & events', '新闻与活动'), t('Around the web', '网上怎么说')] },
    { id: 'fill', hue: 'iris', icon: <Bot size={18} />, name: t('Fill in', '补齐'), dim: DIM.complete, text: t('Five research bots fill the gaps that matter most first — hours, photos, menus — each with the page it came from. Up to 400 tasks a day.', '5 个调查 bot 先补最要紧的缺口 —— 营业时间、照片、菜单 —— 每一项都附来源网页。一天最多 400 件。'), machines: [t('Grok bots', 'Grok bot'), t('Photos', '图片')] },
    { id: 'check', hue: 'leaf', icon: <ShieldCheck size={18} />, name: t('Check', '把关'), dim: DIM.accuracy, text: t('Every change goes through one locked door: previewed, logged, re-checked against the source that night. What an owner confirmed, no bot can overwrite.', '每个改动都经过同一扇上锁的门：先预演、记审计、当晚对着来源再查一次。店主确认过的，bot 改不了。'), machines: [t('Back office (MCP)', '后台（MCP）'), t('Owners on WhatsApp', '店主 WhatsApp')] },
    { id: 'publish', hue: 'coral', icon: <BadgeCheck size={18} />, name: t('Go live', '上线'), dim: DIM.found, text: t('The moment name, hours, description, photo and location are all there, the place publishes itself — and becomes one more page Google can show.', '名字、营业时间、说明、照片、位置一齐，这家就自己上线 —— 也多了一页 Google 能展示的网页。'), machines: [t('Auto-publish', '自动上架'), t('Control room: SEO', '控制室：SEO')] },
    { id: 'share', hue: 'rose', icon: <Megaphone size={18} />, name: t('Share', '分享'), dim: DIM.reach, text: t('A post a day, opening with a question people really ask and linking back to a live page.', '每天一帖，用大家真的会问的问题开头，链回一个上线的页面。'), machines: [t('Social media', '社交媒体')] },
    { id: 'watch', hue: 'sky', icon: <Eye size={18} />, name: t('Watch', '巡查'), dim: DIM.fresh, text: t('Official pages are patrolled daily, closed shops are found every month and expired events every morning. What changed goes back to the start.', '每天巡查官方网页，每月找出倒闭的店，每天早上下架过期活动。有变化的，回到起点。'), machines: [t('Auto-unpublish', '自动下架'), t('Around the web', '网上怎么说'), t('Owners on WhatsApp', '店主 WhatsApp')] },
  ]} /> },
  { kind: 'node', node: <ApCompare isZh={isZh} title={t('A traditional team vs the closed loop', '传统公司 vs 闭环')} heads={[t('Traditional team', '传统公司'), t('Jiju Autopilot', 'Jiju Autopilot')]} roles={[
    t('Researcher', '资料员'),
    t('Data entry', '录入员'),
    t('Editor', '编辑'),
    t('SEO agency', 'SEO 外包'),
    t('Social media manager', '社媒小编'),
  ]} wait={t('waits in an inbox', '在收件箱里等')} stale={t('Live — then slowly goes stale. Nothing comes back to the start.', '上线 —— 然后慢慢过时，没有任何东西回到起点。')} stages={[
    { hue: 'amber', name: t('Discover', '发现') },
    { hue: 'iris', name: t('Fill in', '补齐') },
    { hue: 'leaf', name: t('Check', '把关') },
    { hue: 'coral', name: t('Go live', '上线') },
    { hue: 'rose', name: t('Share', '分享') },
    { hue: 'sky', name: t('Watch', '巡查') },
  ]} rows={[
    { id: 'coverage', hue: 'amber', dim: DIM.coverage, old: t('A researcher searches when there is time', '资料员有空时去搜'), loop: t('5 news outlets every hour, food news every morning', '每小时读 5 家媒体，每天早上读美食新闻') },
    { id: 'complete', hue: 'iris', dim: DIM.complete, old: t('Data entry types each listing by hand', '录入员一家一家手打'), loop: t('5 bots, up to 400 tasks a day, every value with its source page', '5 个 bot，一天最多 400 件，每个值都附来源网页') },
    { id: 'accuracy', hue: 'leaf', dim: DIM.accuracy, old: t('An editor spot-checks a sample', '编辑抽查一部分'), loop: t('Every write previewed and logged; quotes re-checked against the page that night', '每笔写入先预演、留记录；当晚对着网页重查原话') },
    { id: 'found', hue: 'coral', dim: DIM.found, old: t('An agency sends a report once a month', '外包每月交一份报告'), loop: t('A page goes live the moment it is complete; search engines pinged hourly; a blog post every night', '资料齐了马上上线；每小时通知搜索引擎；每晚一篇博客') },
    { id: 'reach', hue: 'rose', dim: DIM.reach, old: t('A manager plans the week’s posts', '小编每周排一次帖'), loop: t('A post every day, written, drawn and posted by itself', '每天一帖，自己写、自己画、自己发') },
    { id: 'fresh', hue: 'sky', dim: DIM.fresh, old: t('Someone notices when a customer complains', '等客人投诉才发现'), loop: t('A quarter of places re-checked every Monday; expired events off every morning; official pages patrolled daily', '每周一复查四分之一；每天早上下架过期活动；每天巡查官方网页') },
    { id: 'upkeep', hue: 'amber', dim: DIM.upkeep, old: t('A developer fixes it in the next sprint', '工程师排进下一个迭代'), loop: t('AI fixes overnight, a second AI reviews, tests pass, it merges itself', 'AI 夜里修、另一个 AI 审、测试全过、自己合并') },
  ]} caption={t(
    'The traditional side is a typical set-up, shown for comparison — not a real company and not measured. The Autopilot side is Jiju’s own schedule and limits on 26 Nov 2026.',
    '传统公司那一边是常见的分工，用来对比 —— 不是某家真实公司，也不是实测数字。Autopilot 那一边是 Jiju 在 2026-11-26 的真实排程与上限。',
  )} /> },
  { kind: 'node', node: <ApMatrix isZh={isZh} title={t('Every problem has at least two machines on it', '每个问题，至少有两台机器在管')} cols={MACHINE_COLS} rows={[
    { id: 'coverage', hue: 'amber', dim: DIM.coverage, cols: ['news', 'grok', 'web'] },
    { id: 'complete', hue: 'iris', dim: DIM.complete, cols: ['grok', 'publish', 'photos', 'web'] },
    { id: 'accuracy', hue: 'leaf', dim: DIM.accuracy, cols: ['grok', 'mcp', 'unpublish', 'web', 'owners'] },
    { id: 'found', hue: 'coral', dim: DIM.found, cols: ['publish', 'control', 'social'] },
    { id: 'reach', hue: 'rose', dim: DIM.reach, cols: ['control', 'social'] },
    { id: 'fresh', hue: 'sky', dim: DIM.fresh, cols: ['news', 'unpublish', 'web', 'owners'] },
    { id: 'upkeep', hue: 'amber', dim: DIM.upkeep, cols: ['mcp', 'control'] },
  ]} caption={t('Rows are problems, columns are the ten machines described below. Each row lights up in turn.', '横行是问题，直栏是下面会讲到的十台机器。每一行轮流亮起。')} /> },

  /* ------------------------------------------------------------ 2b. what it is worth */
  heading('ap-worth', isZh, t('What the loop is worth', '这个闭环值多少')),
  { kind: 'node', node: lead(isZh, t(
    'Count what the machines actually did last month, price it as people, and compare it with what the system costs to run.',
    '把机器上个月真正做了的活数出来，换算成要请多少人，再跟系统的运行成本放在一起比。',
  )) },
  { kind: 'node', node: <ApWorkload isZh={isZh} title={t('Last 30 days, done by machines', '最近 30 天，机器做完的活')} dayLabel={t('working days of 8 hours, if done by hand', '个 8 小时工作日（如果人手做）')} totalText={(days, people) => t(
    `About ${days} working days — ${people} full-time people for a month.`,
    `约 ${days} 个工作日 —— 等于 ${people} 个全职员工做一个月。`,
  )} rows={[
    { icon: <Store size={16} />, value: 1616, minutes: 8, text: t('places found and added', '个地点被发现、收录') },
    { icon: <BadgeCheck size={16} />, value: 149, minutes: 10, text: t('places checked on five items and published', '个地点核对五项后自动上线') },
    { icon: <Camera size={16} />, value: 1202, minutes: 3, text: t('photos found, stored and credited', '张照片找到、存好、标出处') },
    { icon: <Link2 size={16} />, value: 795, minutes: 5, text: t('official and media links found and checked', '条官方与媒体链接找到并核对') },
    { icon: <Languages size={16} />, value: 601, minutes: 3, text: t('fields translated between English and Chinese', '个栏位中英翻译') },
    { icon: <Tag size={16} />, value: 230, minutes: 10, text: t('promos published (184 by themselves)', '个优惠上线（184 个自动上线）') },
    { icon: <CalendarCheck size={16} />, value: 87, minutes: 10, text: t('city events published', '个城市活动上线') },
    { icon: <Newspaper size={16} />, value: 283, minutes: 5, text: t('places from food news checked against Google', '个美食新闻里的地点对 Google 核对') },
    { icon: <Bot size={16} />, value: 1299, minutes: 10, text: t('research tasks by the Grok bots (21–24 Nov only)', '件 Grok bot 调查任务（只算 11/21–24）') },
    { icon: <Code2 size={16} />, value: 389, minutes: 60, text: t('code changes reviewed, tested and merged', '个代码改动审过、测过、合并') },
    { icon: <PenLine size={16} />, value: 12, minutes: 180, text: t('blog posts written and published', '篇博客写好并发布') },
  ]} caption={t(
    'Counts: Jiju’s nightly data snapshot (25 Nov 2026), the dashboard’s merge log and sync logs, 28 Oct – 26 Nov 2026; the Grok count covers only 21–24 Nov, so the real month is higher. Minutes per task are our assumption for a trained person doing it by hand — not measured. Places include bulk imports of chain branches.',
    '数量：Jiju 每晚资料快照（2026-11-25）、面板的合并记录与同步记录，2026-10-28 至 11-26；Grok 只算了 11/21–24，整月实际更多。每件几分钟是我们对「熟手人工做」的假设 —— 不是实测。地点数含连锁分店的批量导入。',
  )} /> },
  { kind: 'node', node: <ApTeamCost isZh={isZh} title={t('What a team would cost vs what the system costs', '请一个团队要多少钱 vs 系统要多少钱')} heads={[t('A traditional team, per month', '传统团队，每月'), t('Jiju Autopilot, per month', 'Jiju Autopilot，每月')]} roles={[
    { role: t('Research executive', '资料研究员'), monthly: 3250 },
    { role: t('Data entry clerk', '录入员'), monthly: 2080 },
    { role: t('Content editor', '内容编辑'), monthly: 3300 },
    { role: t('SEO specialist', 'SEO 专员'), monthly: 5000 },
    { role: t('Social media executive', '社媒专员'), monthly: 3350 },
    { role: t('Software developer', '软件工程师'), monthly: 5000 },
    { role: t('Operations executive (owner contact)', '运营专员（联络店主）'), monthly: 3500 },
  ]} onCost={{ rate: 0.1495, text: t('Employer EPF 13 %, SOCSO 1.75 %, EIS 0.2 %', '雇主 EPF 13%、SOCSO 1.75%、EIS 0.2%') }} system={[
    { item: t('Claude Max (US$200)', 'Claude Max（US$200）'), monthly: 840 },
    { item: t('Grok via X Premium+ (US$100)', 'Grok，X Premium+（US$100）'), monthly: 420 },
    { item: t('ChatGPT Plus for Codex review (US$20)', 'ChatGPT Plus，Codex 审查（US$20）'), monthly: 84 },
    { item: t('Google Cloud, Firebase and domains', 'Google Cloud、Firebase 与域名'), monthly: 200 },
  ]} savedText={t('Difference in a year:', '一年相差：')} caption={t(
    'Salaries: JobStreet Malaysia median monthly pay by role, pages dated November 2026 (all Malaysia, all levels; Kuala Lumpur pays more). Employer contributions: MIDA statutory rates. System: the owner’s own plans, US$1 = RM 4.2; cloud and domains are the owner’s estimate (RM 50–200), shown at the top. Not included: the two Macs it runs on (a one-off purchase), and the owner’s own time.',
    '薪水：JobStreet 马来西亚各职位月薪中位数，页面日期 2026 年 11 月（全马、各级别；吉隆坡更高）。雇主缴款：MIDA 公布的法定比例。系统：店主自己的订阅，US$1 = RM 4.2；云端与域名是店主估计（RM 50–200），取上限。不含：运行它的两台 Mac（一次性购买），以及店主本人的时间。',
  )} /> },

  /* ------------------------------------------------------------ 3. SEO proof */
  heading('ap-seo', isZh, t('Does it work? Ask Google', '有没有用？看 Google 的数据')),
  { kind: 'node', node: lead(isZh, t(
    'Every place the loop publishes is a page that can rank. Here is what Google Search Console recorded for jiju.pet, week by week.',
    '闭环上线的每一家，都是一页能被搜到的网页。下面是 Google Search Console 记录的 jiju.pet，一周一周的数字。',
  )) },
  { kind: 'node', node: (
    <div className="jap-cols-pair">
      <ApColumns isZh={isZh} title={t('Times shown on Google, per week', '每周在 Google 上被展示的次数')} values={WEEKS_IMPRESSIONS} labels={WEEK_LABELS} ariaLabel={t(
        'Column chart, Google impressions per week from the week of 1 June to the week of 16 November 2026: 223 in the first week, under 1,100 a week until mid-September, 10,212 in the week of 12 October and 80,407 in the week of 16 November.',
        '柱状图，2026 年 6 月 1 日那周到 11 月 16 日那周，每周 Google 展示次数：第一周 223 次，到 9 月中每周都不到 1,100 次，10 月 12 日那周 10,212 次，11 月 16 日那周 80,407 次。',
      )} />
      <ApColumns isZh={isZh} title={t('Clicks from Google, per week', '每周从 Google 点进来的次数')} values={WEEKS_CLICKS} labels={WEEK_LABELS} ariaLabel={t(
        'Column chart, clicks from Google per week from the week of 1 June to the week of 16 November 2026: 2 in the first week, under 10 a week until mid-September, 54 in the week of 12 October and 190 in the week of 16 November.',
        '柱状图，2026 年 6 月 1 日那周到 11 月 16 日那周，每周从 Google 点进来的次数：第一周 2 次，到 9 月中每周都不到 10 次，10 月 12 日那周 54 次，11 月 16 日那周 190 次。',
      )} />
    </div>
  ) },
  { kind: 'stats', items: [
    { value: 523, unit: t('clicks', '次点击'), text: t('from Google in 28 days (30 Oct – 26 Nov), up from 180', '最近 28 天（10/30–11/26）来自 Google，前 28 天是 180') },
    { value: 76, unit: t('%', '%'), text: t('of those clicks land on a place page the loop built (404 of 529)', '的点击落在闭环做出来的地点页上（529 次里 404 次）') },
    { value: 48, unit: t('of 51', '/ 51'), text: t('key actions on the site came from organic search (GA4, 29 Oct – 25 Nov)', '站内关键行动来自自然搜索（GA4，10/29–11/25）') },
  ] },
  { kind: 'node', node: <ApBars isZh={isZh} title={t('Where Google visitors land', 'Google 来的人落在哪')} note={t('clicks, last 28 days', '点击，最近 28 天')} rows={[
    { label: t('Place pages', '地点页'), value: 404, lead: true },
    { label: t('Area pages', '地区页'), value: 27 },
    { label: t('Blog posts', '博客'), value: 24 },
    { label: t('Everything else', '其他'), value: 74 },
  ]} caption={t(
    'Google Search Console, sc-domain:jiju.pet, read 26 Nov 2026 (top 500 pages by clicks; “everything else” is the rest of the 529). Average position 8.2. Weeks run Monday to Sunday; the current, unfinished week is left out. We show the trend, not a promise: search traffic also depends on season and on Google.',
    'Google Search Console（sc-domain:jiju.pet），2026-11-26 读取（按点击排前 500 页；「其他」是 529 次里剩下的）。平均排名 8.2。每周从周一算到周日，还没过完的这一周不算。这里展示的是趋势，不是保证：搜索流量也受季节和 Google 影响。',
  )} /> },

  /* ------------------------------------------------------------ 4. the machines */
  heading('ap-machines', isZh, t('The ten machines inside the loop', '闭环里的十台机器')),
  { kind: 'node', node: lead(isZh, t(
    'Here is the solution, one machine at a time — what it does, which problem it covers, and its real rules.',
    '这里才是解决方案，一台一台看 —— 它做什么、管哪个问题、真实的规矩是什么。',
  )) },
  { kind: 'node', node: <ApMachineDeck isZh={isZh} hint={t('Pick a machine:', '选一台机器：')} machines={machines(isZh)} /> },

  /* ------------------------------------------------------------ a night */
  heading('ap-night', isZh, t('What happens while you sleep', '你睡觉的时候发生什么')),
  { kind: 'node', node: <SsSchedule isZh={isZh} title={t('One night of the whole system', '整套系统的一晚')} note={t('Malaysia time', '马来西亚时间')} caption={t(
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
  ]} last={{ at: t('AM', '早上'), job: t('A short list of what waits for you', '一张等你决定的短清单'), where: t('dashboard home page', '面板首页') }} /> },

  /* ------------------------------------------------------------ people */
  heading('ap-people', isZh, t('What is left for you', '还留给你做的事')),
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
  { kind: 'node', node: <SsBeliefs isZh={isZh} title={t('Five rules that make it safe to leave running', '让它放心自己跑的五条规矩')} items={[
    { Art: JijuBeliefSourceArt, title: t('A source, or blank', '有出处，否则留空'), text: t('Every fact carries the page it came from and the day it was checked. No source, no fact.', '每个事实都带来源网页和核对日期。没有出处，就不写。') },
    { Art: JijuBeliefCheckArt, title: t('Preview, then write', '先预演，再写入'), text: t('Every write is shown as a plan first; only an explicit “apply” changes the data, and every write is logged.', '每次写入先给出计划，明确「apply」才真的改，每一笔都记进审计。') },
    { Art: JijuBeliefDecideArt, title: t('The owner’s word wins', '店主说的算'), text: t('Hours, address, phone or pet policy confirmed by the owner can’t be overwritten by a bot.', '店主确认过的营业时间、地址、电话、携宠政策，bot 不能覆盖。') },
    { Art: JijuBeliefSaveArt, title: t('Hide, never delete', '只藏，不删'), text: t('A closed shop goes back to draft. Nothing is thrown away by a machine.', '倒闭的店退回草稿。机器不会丢掉任何东西。') },
    { Art: JijuBeliefBlankArt, title: t('Code decides, AI proposes', 'AI 提议，代码决定'), text: t('Models suggest; fixed rules in code decide what goes live.', '模型只提建议；上不上线由写死在代码里的规则决定。') },
  ]} /> },

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
    { icon: <Search size={18} />, term: t('Impressions', '展示次数'), text: t('How many times Google showed one of your pages in its results.', 'Google 在搜索结果里展示你网页的次数。') },
    { icon: <Database size={18} />, term: t('Snapshot', '快照'), text: t('A nightly copy of the data that agents read instead of the live one.', '每晚一份资料副本，agent 读它，不读正式库。') },
    { icon: <CalendarCheck size={18} />, term: t('Draft', '草稿'), text: t('A place Jiju knows about but doesn’t show yet.', 'Jiju 知道、但还没显示出来的地点。') },
    { icon: <ShieldCheck size={18} />, term: t('Owner-confirmed', '店主确认'), text: t('A field the owner said is right; bots can no longer change it.', '店主说对的栏位，bot 从此改不了。') },
    { icon: <Wrench size={18} />, term: t('Auto-merge', '自动合并'), text: t('A code change that passes every check goes live by itself.', '通过所有检查的代码改动自己上线。') },
  ]} /> },
];
