/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Extra manual chapters for /jiju-autopilot (chapters 0–3 are the /jiju-pet playbook, reused).
// Read on 2026-11-26 from Jiju origin/main (2f0ede67) and personal-dashboard. Paths: Jiju/… = edent95/Jiju,
// PD/… = personal-dashboard, NR/… = News-Rss, Skill/… = ~/Developer/Skill. Keys are never written here.

import type { PbChapter, PbText } from '../jiju-playbook-content';

const t = (en: string, zh: string): PbText => ({ en, zh });

export const AUTOPILOT_CHAPTERS: PbChapter[] = [
  /* ------------------------------------------------------------------ 4 */
  {
    id: 'pb-ap-news',
    title: t('4 · News, events and the Grok research queue', '4 · 新闻、活动与 Grok 调查队列'),
    intro: t(
      'Two inputs that run without anyone asking: an hourly news feed, and five Grok bots that pull gap-filling tasks from Jiju’s own queue.',
      '两条不用人叫就会跑的输入：每小时的新闻流，以及 5 个 Grok bot 从 Jiju 自己的队列里领补缺口的任务。',
    ),
    steps: [
      {
        title: t('The area feed (`news-area`, hourly)', '地区新闻流（`news-area`，每小时）'),
        body: [
          t(
            'Five outlets — Malay Mail, FMT, NST, Buletin Mutiara, CNA — are fetched every hour, keeping 14 days and at most 80 items per outlet. `gemma4:26b` translates headlines and writes 1–3 key points, only for Penang, KL, Selangor and Singapore; every number in a key point must appear in the article, and NST text is never fed to a model. Items that look like an event (market, festival, exhibition, music, sports) or a notice (flood, road closure, utility, safety) get a banner draft; a notice lives at most 30 days.',
            '5 家媒体（Malay Mail、FMT、NST、Buletin Mutiara、CNA）每小时抓一次，保留 14 天、每家最多 80 条。`gemma4:26b` 翻译标题、写 1–3 条重点，只给 Penang、KL、Selangor、Singapore 写；重点里的每个数字都必须在原文出现，NST 的正文从不喂给模型。像活动（市集、节庆、展览、音乐、体育）或公告（水灾、封路、水电、安全）的条目会起一条横幅草稿；公告最多挂 30 天。',
          ),
          t(
            'The result is a public JSON feed, `jiju-area/1`. Jiju’s server reads it with a 30-minute cache; if one outlet is more than 3 days stale, Jiju reads that outlet’s RSS directly.',
            '产出是一份公开 JSON，`jiju-area/1`。Jiju 服务器读它，缓存 30 分钟；某家媒体超过 3 天没更新，Jiju 就直接读那家的 RSS。',
          ),
        ],
        source: 'NR/docs/jiju-area-feed.md · Jiju/utils/jijuAreaFeed.ts',
      },
      {
        title: t('Events into Jiju (`jiju-city-events-sync`)', '活动送进 Jiju（`jiju-city-events-sync`）'),
        body: [
          t(
            'Events in the next 45 days for Penang and Singapore are submitted through `jiju_intake_submit`, at most 15 per run. Skipped: no venue, longer than 2 months, already on Jiju. Jiju then routes each submission by its evidence:',
            'Penang 和 Singapore 未来 45 天的活动经 `jiju_intake_submit` 投稿，每次最多 15 个。跳过：没场地、超过 2 个月、Jiju 已有。Jiju 再按证据分流：',
          ),
        ],
        list: [
          t('official source + name, time, venue and city → published automatically', '官方来源 + 名称、时间、场地、城市齐 → 自动上线'),
          t('weaker evidence → draft', '证据较弱 → 草稿'),
          t('only a directory listing → queued', '只有名录 → 排队'),
          t('only a low-trust aggregator or a map → kept as a lead, nothing written', '只有低可信聚合站或地图 → 只当线索，一笔不写'),
        ],
        lesson: t('A date only counts if it is in the source text (2026-11-06: 20 of 23 promos had copied the example’s 12-31).', '日期必须在原文出现（2026-11-06：23 条优惠里 20 条照抄了示例的 12-31）。'),
        source: 'NR/docs/jiju-city-events.md · PD/scripts/jiju-city-events-sync.mjs · Jiju/docs/bo-agent-cli.md',
      },
      {
        title: t('The research queue the bots pull from', 'bot 领任务的调查队列'),
        body: [
          t(
            'Bots (`grok-deals`, `grok-events`, `grok-links`, `grok-media`, `grok-story`, since 2026-11-21) call Jiju’s REST API with curl — no connector. `jiju_research_next` hands out 5 tasks, each held 2 hours, ranked by gap × weight (hours and photos 5, menu and must-order 4) × Search Console visibility (up to ×3), with repeated “not found” items pushed down to ×0.15. Since 2026-11-25 drafts close to going live join the queue, but only for hours, photos and description.',
            'bot（`grok-deals`、`grok-events`、`grok-links`、`grok-media`、`grok-story`，2026-11-21 起）用 curl 调 Jiju 的 REST API，不用连接器。`jiju_research_next` 一次派 5 件、每件保留 2 小时，排序 = 缺口 × 权重（营业时间、照片 5，菜单、必点 4）× Search Console 曝光（最多 ×3）；反复「没找到」的最低压到 ×0.15。2026-11-25 起快上线的草稿也进队列，但只派营业时间、照片、说明。',
          ),
          t(
            'Every reply carries `RESEARCH_COMMON_RULES`: only facts from pages actually opened, each with URL and today’s date; official site or the shop’s own IG/FB first; directories, aggregators and AI answers are leads; never overwrite; no “best” or “No.1”; at most 6 pages; stop and release on 403 / 429 / 5xx; preview before apply. The bot ends with `jiju_research_report` (found / not_found + reason), logged in `research_runs`.',
            '每次回复都附 `RESEARCH_COMMON_RULES`：只写真打开过的网页里的事实，每条带网址和当天日期；官网或店家自己的 IG/FB 优先；名录、聚合站、AI 回答只当线索；不覆盖；不写「最好」「第一」；最多开 6 页；遇 403 / 429 / 5xx 停手放回；先预演再写。最后用 `jiju_research_report` 回报（found / not_found + 原因），记进 `research_runs`。',
          ),
        ],
        list: [
          t('Cool-downs after “not found”: login wall 45 days, no official site 60, no media coverage 90, a 403 7 days; a region with 2 misses in a row pauses 7 days.', '「没找到」后的冷却：要登录 45 天、没官网 60 天、没媒体报道 90 天、403 7 天；地区连续 2 次落空停 7 天。'),
          t('Daily caps: deals 100, links 90, media 80, story 70, events 60.', '每日上限：优惠 100、链接 90、媒体 80、故事 70、活动 60。'),
          t('Checks on output: link health nightly at 02:00 (404 dead at once, 5xx after two nights); the M1 snapshots evidence pages and flags a submission whose quote is missing; a stuck check every 6 hours pauses whatever keeps failing.', '交回来的结果怎么查：每晚 02:00 链接体检（404 当晚算死、5xx 连两晚才算）；M1 给证据网页拍快照，原话不在就标记；每 6 小时卡住检查，反复失败的暂停。'),
        ],
        code: `GET  /api/bo-agent/jiju_research_next      → 5 tasks, lease 2h
POST /api/bo-agent/jiju_places_patch       { …, apply: false }   # plan only
POST /api/bo-agent/jiju_places_patch       { …, apply: true }    # write
POST /api/bo-agent/jiju_research_report    { taskId, result: "found" | "not_found", reason }`,
        source: 'Jiju/docs/grok-bots.md · Jiju/services/researchTaskGuides.ts · Skill/jiju-draft-to-grok',
      },
    ],
  },
  /* ------------------------------------------------------------------ 5 */
  {
    id: 'pb-ap-mcp',
    title: t('5 · The back-office tools (MCP) and the nightly snapshot', '5 · 后台工具（MCP）与每晚快照'),
    intro: t('108 tools registered in one file are the only way in. Everything else follows from that.', '同一个文件里登记的 108 个工具是唯一入口，其余规矩都从这一点推出来。'),
    steps: [
      {
        title: t('Keys, plans and the audit log', '钥匙、计划与审计'),
        body: [
          t(
            'Tools are served at `jiju.pet/api/bo-agent/mcp` and `/api/bo-agent/<tool>`. Keys are read / write / admin and only their hash is stored. Write tools return a `plan` unless `apply: true`. Every write lands in `backoffice_audit_log` as `agent:<name>`, the name taken from the key; `agent_calls` keeps every call for 90 days.',
            '工具在 `jiju.pet/api/bo-agent/mcp` 和 `/api/bo-agent/<tool>`。钥匙分只读 / 可写 / 管理员，只存哈希。写入工具不带 `apply: true` 就只回 `plan`。每笔写入记进 `backoffice_audit_log`，记成 `agent:<名字>`，名字取自钥匙；`agent_calls` 保留每次调用 90 天。',
          ),
          t(
            'Owner-confirmed fields (`ownerConfirmed.hours / address / phone / petPolicy`, each `{ at, via }` with via WHATSAPP | PHONE | OWNER_FORM | EMAIL | IN_PERSON) cannot be patched by an agent; the patch becomes a “for you to decide” item in the back office.',
            '店主确认过的栏位（`ownerConfirmed.hours / address / phone / petPolicy`，每条 `{ at, via }`，via 取 WHATSAPP | PHONE | OWNER_FORM | EMAIL | IN_PERSON）agent 改不了；那个 patch 会变成后台里一条「等你决定」。',
          ),
        ],
        source: 'Jiju/services/boAgentTools.ts · Jiju/services/ownerConfirmedModel.ts',
      },
      {
        title: t('Read the snapshot, not production', '读快照，不读正式库'),
        body: [
          t(
            'One `jiju_places_list` call reads the whole places collection (~2.4k document reads). A script that looks up hundreds of names that way costs hundreds of thousands of reads (2026-11-23: one sync read ~250k). So the M1 exports a snapshot at 03:40 (~3.5k reads, personal data excluded), the main Mac pulls it every 3 hours, and every lookup goes to `~/jiju-snapshots/latest` first. Production is only for writes and for places created today.',
            '一次 `jiju_places_list` 就整表读地点（约 2.4k 次读取）。脚本照这样查几百个店名，就是几十万次读取（2026-11-23 一次同步读了约 25 万）。所以 M1 在 03:40 导出快照（约 3.5k 次读取，不含个人资料），主 Mac 每 3 小时拉一次，所有查找先查 `~/jiju-snapshots/latest`。正式库只用来写，以及查当天新建的地点。',
          ),
        ],
        code: `~/jiju-snapshots/latest/
  manifest.json  stats.json
  cafes.json.gz  promos.json.gz  city_bulletins.json.gz  blog_posts.json.gz  brands.json.gz …`,
        source: 'Skill/jiju-snapshot-read · PD/scripts/lib/jiju-snapshot-places.mjs',
      },
    ],
  },
  /* ------------------------------------------------------------------ 6 */
  {
    id: 'pb-ap-lifecycle',
    title: t('6 · Publish, unpublish, photos and links', '6 · 上架、下架、图片与链接'),
    intro: t('The lifecycle rules, exactly as the code has them.', '地点生命周期的规矩，照代码原样。'),
    steps: [
      {
        title: t('Auto-publish (`planAutoPublish`)', '自动上架（`planAutoPublish`）'),
        body: [
          t(
            'Not a cron job: the check runs inside the save path — back-office `cafeService.updateCafe`, agent `boAgentOps.placesPatch` and `jiju_place_photos_import`. `placeMissingInfo()` needs: a name that isn’t empty / unknown / unnamed; real `hours.weekly` (a Mon–Sun 09:00–21:00 template is a placeholder); `petPolicy.generalPolicyText` over 20 characters and not “Details not provided”; at least one Firebase Storage photo URL; an address or coordinates. Chain branches are exempt from description and photo.',
            '不是定时任务：检查跑在保存路径里 —— 后台 `cafeService.updateCafe`、agent `boAgentOps.placesPatch`、`jiju_place_photos_import`。`placeMissingInfo()` 要求：名字不空、不是 unknown / unnamed；真实的 `hours.weekly`（周一到周日 09:00–21:00 模板算占位）；`petPolicy.generalPolicyText` 超过 20 字且不是「Details not provided」；至少一张 Firebase Storage 照片；地址或坐标。连锁分店免说明和照片。',
          ),
        ],
        list: [
          t('Blocked by: `meta.publishHold` (set on manual unpublish or restore, cleared on manual publish); a save that itself changed the status; ARCHIVED; `googleBusinessStatus === CLOSED_PERMANENTLY`; `expiresAt` passed; a no-op patch; a sources-only patch.', '会挡住：`meta.publishHold`（人手下架或恢复时写上、人手上架时清掉）；同次保存改了上下架；已归档；`googleBusinessStatus === CLOSED_PERMANENTLY`；`expiresAt` 已过；没真改东西的 patch；只改来源的 patch。'),
        ],
        lesson: t('Never tell the user to “publish it in the back office”. A draft that is already complete needs the user’s OK for the save that publishes it.', '永远不叫用户「去后台手动上架」。已经五项齐的草稿，要经用户同意再做那次触发上架的保存。'),
        source: 'Jiju/services/placeAutoPublishModel.ts · Jiju/services/placeAdminModel.ts',
      },
      {
        title: t('Auto-unpublish', '自动下架'),
        body: [
          t(
            '`place-closed-sweep.yml` runs `0 1 * * 1` (Monday 09:00 MYT). Live places are hashed into 4 groups by id; one group a week. Google Places is asked only for `id, businessStatus, movedPlaceId` (free tier). CLOSED_PERMANENTLY → DRAFT; for a chain only that address is removed, all closed → whole place to DRAFT. Moved, CLOSED_TEMPORARILY, 404 and errors → report only. More than 10 changes → the run writes nothing and alerts; at most 600 calls a run and 2,500 a month; 5 errors in a row stops it.',
            '`place-closed-sweep.yml` 跑 `0 1 * * 1`（马来西亚时间周一 09:00）。上线地点按 id 哈希分 4 组，每周一组。只向 Google Places 要 `id, businessStatus, movedPlaceId`（免费档）。CLOSED_PERMANENTLY → DRAFT；连锁只拿掉那个地址，全关才整家退草稿。搬家、CLOSED_TEMPORARILY、404、错误 → 只回报。超过 10 家要改 → 整次不写并警报；每次最多 600 次、每月 2,500 次；连续 5 次错误停。',
          ),
          t(
            '`place-expiry.yml` (daily 08:00 MYT) unpublishes events and pop-ups past `expiresAt`. An intake submission with `kind: closure` unpublishes to draft — permanent closure, move or long closure only, with `facts.until` for the expected reopening. Chain merges (`scripts/lib/chainMerge.ts`) archive old branches with `meta.mergedInto` and `publishHold`, keep them 4 weeks, then delete after a backup. A source stops counting for search indexing 365 days after `checkedAt`; it does not unpublish.',
            '`place-expiry.yml`（每天 08:00）下架过了 `expiresAt` 的活动和快闪。`kind: closure` 的投稿把地点退回草稿 —— 只限永久关门、搬家、长期停业，`facts.until` 记预计重开日。连锁合并（`scripts/lib/chainMerge.ts`）把旧分店归档并写 `meta.mergedInto` 与 `publishHold`，保留 4 周，备份后才删。来源在 `checkedAt` 365 天后不再算进搜索收录，但不会下架。',
          ),
        ],
        source: 'Jiju/services/placeClosedSweepModel.ts · placeClosedSweepOps.ts · .github/workflows/place-closed-sweep.yml',
      },
      {
        title: t('Photos (`jiju_place_photos_import`)', '图片（`jiju_place_photos_import`）'),
        body: [
          t(
            'Fetch → WebP, longest edge 1,600 → `cafes/{id}/` in Storage → URL written to both `uploads.cafePhotos[]` and `images[]`, caption `来源 · <sourceUrl>`. At most 8 per call, 12 per place, 15 MB each, with an SSRF guard. Target: 5 own photos including the shop front. The owner’s IG/FB posts are embedded whole (max 6), media articles are linked, Google Maps photos are never used; video thumbnails are copied only for video cards. Alt text: `{name} - {category} in {area} - Photo N`. A place with no photo stays a draft.',
            '抓图 → WebP、长边 1,600 → Storage 的 `cafes/{id}/` → 网址同时写进 `uploads.cafePhotos[]` 和 `images[]`，说明写 `来源 · <sourceUrl>`。一次最多 8 张、每家 12 张、每张 15 MB，挡 SSRF。目标：自存 5 张，含门面。店主 IG/FB 帖整帖嵌入（最多 6），媒体文章只放链接，Google 地图照片完全不用；视频缩图只给视频卡用。alt：`{店名} - {类别} in {地区} - Photo N`。没照片的地点留在草稿。',
          ),
        ],
        source: 'Jiju/services/placePhotoImportModel.ts · Jiju/views/CafeDetailPage.tsx',
      },
      {
        title: t('Links and the daily patrol', '链接与每日巡查'),
        body: [
          t(
            '`placeSourceTier` orders official site → official social → known brand → mall/venue → other → listing → low-trust → map. Low-trust hosts (wanderlog, novacircle, evendo, laptopfriendlycafe, top-rated.online, wanderboat.ai …) and AI hosts (meta.ai, perplexity, grok) come back as `route: lead` and write nothing; once an official link exists they are hidden. A social link is written only at “high” confidence: the bio’s address or phone matches. Instagram bios and the last 10 posts are read without login through Meta’s Business Discovery API (~200 calls an hour; first run 2026-11-25: 79 of 86 accounts).',
            '`placeSourceTier` 排序：官网 → 官方社媒 → 知名品牌 → 商场/场馆 → 其他 → 名录 → 低可信 → 地图。低可信站（wanderlog、novacircle、evendo、laptopfriendlycafe、top-rated.online、wanderboat.ai …）和 AI 站（meta.ai、perplexity、grok）回 `route: lead`、一笔不写；有了官方链接就隐藏。社媒链接只在「high」时写入：简介里的地址或电话对得上。IG 简介和最近 10 帖经 Meta Business Discovery API 免登录读取（约每小时 200 次；2026-11-25 首跑读到 86 个里的 79 个）。',
          ),
          t(
            'Daily patrol on the M1 at 04:30: `source-digest-daily-runner.sh` then `watch-promo-sources --apply`. A changed page sets `sourceChangedAt`; a new line that looks like a promo sets ★ `promoHint`, one that looks like a closure ⚠ `closureHint`.',
            'M1 每天 04:30 巡查：`source-digest-daily-runner.sh` 之后 `watch-promo-sources --apply`。网页改了就写 `sourceChangedAt`；新出现像优惠的一行写 ★ `promoHint`，像关门的写 ⚠ `closureHint`。',
          ),
        ],
        source: 'Jiju/constants/placeSources.ts · Skill/jiju-place-links · Skill/meta-ig-business-discovery',
      },
    ],
  },
  /* ------------------------------------------------------------------ 7 */
  {
    id: 'pb-ap-owners',
    title: t('7 · Owner outreach on WhatsApp (Hermes)', '7 · 店主 WhatsApp 联络（Hermes）'),
    intro: t('Slow on purpose, rules before models, a person before any badge.', '故意慢；先规则后模型；任何徽章之前先过人。'),
    steps: [
      {
        title: t('Who is invited, and when', '邀请谁、什么时候'),
        body: [
          t(
            'The dashboard job `jiju-owner-outreach` ticks every 2 minutes and sends through the Hermes WhatsApp bridge; a plugin (`jiju-owner-inbox`) catches owner replies so Hermes doesn’t pair or chat with them. Eligible: published, not a chain branch, not verified, a Malaysian mobile, never contacted before.',
            '面板任务 `jiju-owner-outreach` 每 2 分钟跑一次，经 Hermes 的 WhatsApp 桥发送；插件 `jiju-owner-inbox` 接住店主回复，免得 Hermes 自己去配对或闲聊。对象：已上线、非连锁分店、未认证、马来西亚手机号、从没联络过。',
          ),
        ],
        list: [
          t('At most 5 a day, weekdays 10:00–18:00 MYT; food and drink shops never 11:30–14:30 or after 18:00.', '一天最多 5 条，平日 10:00–18:00；餐饮店避开 11:30–14:30 和 18:00 之后。'),
          t('At most 2 messages per shop (invite + one follow-up); a circuit breaker on repeated failures.', '每家最多 2 条（邀请 + 一次跟进）；连续失败自动熔断。'),
          t('Master switch off and dry run on by default; `pauseNewInvites` has been true since 2026-11-21.', '总开关默认关、默认演练；`pauseNewInvites` 自 2026-11-21 起为 true。'),
        ],
        source: 'PD/docs/modules/jiju-owner-outreach.md · PD/docs/modules/hermes.md',
      },
      {
        title: t('The message and the reply', '消息与回复'),
        body: [
          t(
            'The invite opens with up to 2 reviewed selling points for that shop (`traitsForPlace`), written as fixed sentence patterns rather than pasted review text, then the hours and address Jiju has, and asks “correct?”. No phone number, no ranking or price claims. Replies hit rules first: opt-out goes on a permanent list; money, complaints or long messages wait for a person. Only then `qwen2.5:7b` picks one of 12 FAQ numbers — the reply text is always the playbook’s wording.',
            '邀请用这家的最多 2 个复核过的卖点开场（`traitsForPlace`），按固定句式写，不贴审核原句；再列 Jiju 现有的营业时间和地址，问「对吗？」。不放电话，不提排名或价格。回复先过规则：退订进永久名单；谈钱、投诉、长消息等人。之后才由 `qwen2.5:7b` 从 12 个常见问题里挑一个编号 —— 回复文字永远是手册原文。',
          ),
          t(
            '“Yes / 对” sets the conversation to `confirmed`; a person previews and calls `jiju_place_verify` (writes `meta.verified`, `trustLevel VERIFIED`, the blue tick). `autoVerifyOnConfirm` is false. Owners who want to manage the page get a per-shop link `/invite/po_…` (max 3 a day) whose submissions go live; the shared owner form creates a proposal for review. Owner emails to the support inbox are handled by an agent session with the same patch-preview-apply path and `ownerConfirmed … via: EMAIL`.',
            '「Yes / 对」把对话设成 `confirmed`；人预览后调 `jiju_place_verify`（写 `meta.verified`、`trustLevel VERIFIED`、蓝勾）。`autoVerifyOnConfirm` 为 false。想自己管页面的店主拿到专属链接 `/invite/po_…`（一天最多 3 条），从那里提交的直接上线；共用的店主表单只生成待审提案。店主写到客服信箱的信，由 agent 会话走同一条「预演再写」的路，记 `ownerConfirmed … via: EMAIL`。',
          ),
        ],
        lesson: t('A reason the owner can’t check is not a reason (2026-11-21): our own tags don’t open a message — a price, a year or a media article does.', '店主核不了的理由不算理由（2026-11-21）：自家的标签不能拿来开场 —— 价位、年份、媒体文章才行。'),
        source: 'PD/docs/modules/jiju-owner-outreach.md · Jiju/services/ownerConfirmedModel.ts',
      },
    ],
  },
  /* ------------------------------------------------------------------ 8 */
  {
    id: 'pb-ap-control',
    title: t('8 · Control room: auto-merge, nightly fixes, SEO', '8 · 控制室：自动合并、夜间修复、SEO'),
    intro: t('How code changes reach production with nobody pressing merge.', '代码改动怎么在没人按合并的情况下上线。'),
    steps: [
      {
        title: t('`pr-automerge`', '`pr-automerge`'),
        body: [
          t(
            'Runs every 5 minutes (15 when idle). Merges only if the author is the owner’s account, not a fork, not a draft, opened after `autoMerge.since`, with at least one check and all of them green — pinned to the head commit. No checks means never. A failing check stops it; a small local model writes a one-line reason from the CI log onto the home page. It can arm GitHub’s own auto-merge so PRs still land while the Mac sleeps. Merge means deploy (decided 2026-11-07).',
            '每 5 分钟跑（闲时 15 分钟）。只在以下都成立时合并：作者是店主帐号、不是 fork、不是草稿、在 `autoMerge.since` 之后开的、至少一项检查且全绿 —— 锁定 head 提交。没有检查就永远不合。检查失败就停，本机小模型从 CI 日志写一句原因上首页。它能开启 GitHub 自带的自动合并，Mac 睡着时 PR 照样合。合并即部署（2026-11-07 定）。',
          ),
          t(
            'CI runs on a self-hosted M1 runner (`CI_RUNS_ON=["self-hosted","m1"]`, workflows use `fromJSON(vars.CI_RUNS_ON || "ubuntu-latest")`, so deleting the variable falls back to GitHub-hosted). `ai-review` comments on every PR with local `gemma4:26b`, deliberately not Claude, to save quota.',
            'CI 跑在自托管的 M1 runner（`CI_RUNS_ON=["self-hosted","m1"]`，workflow 写 `fromJSON(vars.CI_RUNS_ON || "ubuntu-latest")`，删掉变量就退回 GitHub 托管）。`ai-review` 用本机 `gemma4:26b` 给每个 PR 留言，故意不用 Claude，省额度。',
          ),
        ],
        source: 'PD/docs/modules/git-pr-automerge.md · PD/data/auto-merge.jsonl',
      },
      {
        title: t('`fix-nightly` and `seo-autofix`', '`fix-nightly` 与 `seo-autofix`'),
        body: [
          t(
            '`fix-nightly` (02:30–07:00) sends items the triage model judged agent-fixable to `claude -p` sessions that always open a draft PR; Codex reviews the diff — pass promotes it, block keeps it as a draft on the home page. Caps: 3 sessions × 6 items, $15 a session, $40 a night, 90-minute timeout; no start if the 5-hour Claude window is ≥ 40 % or the week ≥ 85 %. No silent fallback to another model.',
            '`fix-nightly`（02:30–07:00）把分诊模型判定「agent 能修」的事交给 `claude -p` 会话，一律开草稿 PR；Codex 审 diff —— 通过就转正，挡下就留草稿上首页。上限：3 个会话 × 6 件、每会话 15 美元、每晚 40 美元、90 分钟超时；Claude 5 小时额度 ≥ 40 % 或周额度 ≥ 85 % 就不开。不会悄悄换别的模型顶上。',
          ),
          t(
            '`seo-autofix` (02:10) takes whitelisted issues from `data/seo-issues.json` (llms.txt, missing alt, title/description length), makes a worktree, runs the repo’s gate as a baseline (already red → “gate-broken”, no agent), runs `claude -p` with no commit, push, network or MCP, rejects diffs touching `.github`, `.env`, `package.json`, deletions or more than 25 files, re-runs the gate and opens the PR; wording changes open as drafts. At most 2 fixes a night, 2 attempts each, 1 open PR per repo. Enabled on LifeOs, MyMalaysian, Scripture and alwin; Jiju not yet.',
            '`seo-autofix`（02:10）从 `data/seo-issues.json` 取白名单问题（llms.txt、缺 alt、标题/描述长度），开 worktree，先跑一次仓库门禁当基线（本来就红 → 「gate-broken」，不派 agent），以不能提交、推送、联网、用 MCP 的 `claude -p` 修，碰 `.github`、`.env`、`package.json`、删文件或超过 25 个文件的 diff 一律拒，再跑门禁、开 PR；改文案的开草稿。每晚最多 2 件、每件 2 次、每仓库 1 个未合并 PR。已开：LifeOs、MyMalaysian、Scripture、alwin；Jiju 还没开。',
          ),
        ],
        code: `node personal-dashboard/scripts/wt.mjs new fix/<desc>    # worktree from origin/main
claude -p "<task>" --model opus                          # no push / gh / network in autofix
git push -u origin <branch> && gh pr create --base main --fill
# pr-automerge: owner + not draft + ≥1 check + all green → squash merge (pinned to head sha)`,
        source: 'PD/docs/modules/seo.md · PD/scripts/seo-autofix.mts · PD/docs/modules/tasks-queue.md',
      },
    ],
  },
  /* ------------------------------------------------------------------ 9 */
  {
    id: 'pb-ap-social',
    title: t('9 · Social media and the local-model gate', '9 · 社媒与本机模型闸'),
    intro: t('Posting on a schedule without the model ever slowing the owner’s working day.', '按时间表发帖，又不让模型拖慢店主白天的工作。'),
    steps: [
      {
        title: t('`social-posts` → `social-render` → `social-publish`', '`social-posts` → `social-render` → `social-publish`'),
        body: [
          t(
            '04:20 writes only for open posting days (testing mode since 2026-11-24: 7 a week; normal: Tue / Thu / Sat). 11 question hooks; no shop names in the prompt; `namedPlace()` rewrites a post that names a place; `hookGlitch()` catches model typos. `social-render.mjs` draws 1080×1440 Chinese cards for Facebook and 1080×1350 English cards for Instagram in headless Chrome. `social-publish` runs every 30 minutes after 12:00: one item at a time, max 1 per project per day, Meta Graph API to the Jiju page only, link in the first comment, no repeated text, posts with warnings held, “posted but unconfirmed” never retried. Insights are read back every 12 hours or more.',
            '04:20 只给还空着的发帖日写（2026-11-24 起测试模式每周 7 帖；正常是周二 / 四 / 六）。11 种问题开头；提示词不放店名；`namedPlace()` 改写写出店名的帖；`hookGlitch()` 抓模型错字。`social-render.mjs` 用无界面 Chrome 画卡：Facebook 1080×1440 中文、Instagram 1080×1350 英文。`social-publish` 12:00 后每 30 分钟跑：一次一条、每项目每天最多 1 帖、经 Meta Graph API 只发 Jiju 专页、网址放第一条留言、不发重复文字、有警告的扣住、「发了但没确认」永不重试。数据至少每 12 小时读回一次。',
          ),
        ],
        lesson: t('Meta’s page token doesn’t expire, but data access does, about every 90 days (first: 2027-02-19) — a person must re-authorise. `post_impressions` was retired; use `post_media_view` (2026-11-21).', 'Meta 专页令牌不过期，但资料存取约 90 天过期（第一次：2027-02-19）—— 要人重新授权。`post_impressions` 已下线，改用 `post_media_view`（2026-11-21）。'),
        source: 'PD/docs/modules/social.md · PD/scripts/social-render.mjs',
      },
      {
        title: t('The sleep window', '睡眠窗口'),
        body: [
          t(
            'Since 2026-11-05 heavy local-model jobs start only after 22:00 and 45 minutes without keyboard or mouse; from 12:00 the owner always counts as awake. The trigger: 170 minutes of model use during weekday working hours over 10 days, and “it lags while I work”. `gemma4:26b` runs with thinking off (0.39 s an item vs 20.85 s with thinking). The one exception is explaining a CI failure: it runs at once on the M1’s `qwen2.5-coder:7b`, falling back to the main Mac.',
            '2026-11-05 起，重的本机模型任务只在 22:00 之后、键盘鼠标闲置 45 分钟才开工；中午起一律当店主醒着。起因：10 天里平日上班时间用了 170 分钟模型，以及「我工作时会卡」。`gemma4:26b` 关掉思考跑（每件 0.39 秒，开思考 20.85 秒）。唯一例外是解释 CI 失败：立刻在 M1 的 `qwen2.5-coder:7b` 上跑，不行再退回主 Mac。',
          ),
        ],
        source: 'PD/docs/modules/local-models.md · PD/docs/modules/agent-limits.md',
      },
    ],
  },
];

/** Dated rules added for the autopilot chapters; appended after the /jiju-pet appendix rows. */
export const AUTOPILOT_LESSONS: { date: string; rule: PbText; cause: PbText }[] = [
  { date: '2026-11-05', rule: t('Heavy local models only in the sleep window', '重的本机模型只在睡眠窗口跑'), cause: t('170 minutes of model use in weekday working hours over 10 days; “it lags while I work”', '10 天里上班时间用了 170 分钟模型；「我工作时会卡」') },
  { date: '2026-11-07', rule: t('Merge means deploy', '合并即部署'), cause: t('owner’s decision: one green gate instead of a second manual step', '用户定的：一道全绿的门，不再另加手动一步') },
  { date: '2026-11-17', rule: t('A closure report drops the place to draft by itself', '回报关门就自动退回草稿'), cause: t('owner’s decision; weekly rest days and short holidays are never reported', '用户定的；每周休息日和短假不回报') },
  { date: '2026-11-21', rule: t('New owner invites paused', '新的店主邀请暂停'), cause: t('openers built from our own tags read like a form; rewritten around facts the owner can check', '用自家标签开场读起来像表格；改成店主能核实的事实') },
  { date: '2026-11-23', rule: t('Look up the snapshot, not production', '查快照，不查正式库'), cause: t('one sync read about 250,000 documents', '一次同步读了约 25 万份文档') },
  { date: '2026-11-25', rule: t('Near-ready drafts join the Grok queue, for hours / photos / description only', '快上线的草稿进 Grok 队列，只派营业时间 / 照片 / 说明'), cause: t('434 of 445 regional drafts were missing hours', '445 家地区草稿里 434 家缺营业时间') },
];
