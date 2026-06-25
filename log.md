# log.md

> 规则：只要发生真实改动，就必须追加记录。

## 记录模板

### YYYY-MM-DD HH:mm

- 类型：代码 / 文档 / 结构 / 流程
- 改动：
- 原因：
- 影响：
- 后续：

---

## Entries

### 2026-06-25 23:30

- 类型：文档 / 结构
- 改动：确认 `AGENTS.md` 已完整包含旧版 `AGENTS 2.md` 的规则内容，删除旧副本 `AGENTS 2.md`，保留 `AGENTS.md` 作为唯一 agent 操作规则入口。
- 原因：用户要求把两个 AGENTS 文件结合在一起，并删除另一个；实际 diff 显示 `AGENTS 2.md` 没有独有规则，只是旧版子集。
- 影响：后续 agent 不会在两个规则文件之间误读或分叉；项目规则 source of truth 收敛到 `AGENTS.md`。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.14s）；`ls` 确认 `AGENTS 2.md` 已不存在，`AGENTS.md` 保留。
- 后续：后续如果协作规则继续演进，只更新 `AGENTS.md`，并按需同步 `soul.md`。

### 2026-06-24 00:19

- 类型：内容 / 前台 / Jiju.pet
- 改动：根据用户提供的 Jiju 项目 Log Review，把 `/jiju-pet` 从原本的构建叙事扩展为完整项目复盘页；新增 Archive review、Operating model、Reusable methods、Project philosophy 等 section，并把 Jiju 从 pet-friendly cafe list 进化为可信宠物生活平台的主线写进 hero 和产品说明；补齐 `styles/pages/jiju-pet.css`，让该路由拥有独立页面样式。
- 原因：用户要求根据附件内容把 Jiju 项目复盘、方法论和核心结论加入 `http://localhost:4180/jiju-pet`。
- 影响：`/jiju-pet` 现在更清楚展示 Jiju 的产品演进、信任资料链路、前台 + BO 联动、机械 verify guardrails、live demo reuse、graceful degradation 和项目哲学；页面不再依赖空 CSS 入口。
- 验证：关键词检查确认 `Archive review`、`Mechanical Verify Guardrails`、`Live Demo Reuse`、`Project philosophy` 与 `jiju-review-track` 已接入；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.10s）；`curl -I http://localhost:4180/jiju-pet` 返回 `200 OK`。
- 后续：本地打开 `http://localhost:4180/jiju-pet`，应看到首屏定位更新为 trusted pet life platform，并在 Build log 前新增复盘主线、资料链路、可复用方法与项目哲学。

### 2026-06-23 22:40

- 类型：结构 / CSS 架构
- 改动：把 `index.css` 收敛为 26 行 main import manifest；新增共享层 `styles/tokens.css`、`styles/base.css`、`styles/shared.css`、`styles/theme-overrides.css`、`styles/motion.css`；把原本残留在 `index.css` 的 ETReportHub、Film Gallery、Brand Guide、Conway、Life OS、Poker avatar/story 样式拆到对应 `styles/pages/*`；让 Home、Poker/Wiki、ETReport、Film、Brand Guide 的主要 card/panel/hero shadow 开始复用 shared CSS variables。
- 原因：用户希望 CSS 不要一页一页重复写，而是有一个 main 入口和可共享的代码层。
- 影响：之后新增页面时应从 `index.css` 挂 import，不再往 `index.css` 写实现；页面独有布局放 `styles/pages/`，跨页面 token/card/panel/tag/CTA/motion 放共享层，CSS art 继续放 `styles/css-art/`。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.09s）；`git diff --check -- index.css styles README.md AGENTS.md soul.md log.md` 通过；`curl -I` 检查 `/`、`/wiki/rag-flow`、`/etreporthub`、`/brand-guide` 均返回 `200 OK`。
- 后续：后续页面重构时继续把重复 UI 样式迁到 `styles/shared.css`，不要在 page CSS 里重复定义基础 card/panel 数值。

### 2026-06-23 22:32

- 类型：修复 / 前台 / Home CSS art
- 改动：把 `components/css-art/index.tsx` 从临时 fallback 组件恢复为真实 CSS art DOM 结构；恢复 `styles/css-art/projects-icons.css` 的完整 Projects / Jiju app icon CSS。
- 原因：用户反馈 homepage 仍看不到 CSS；排查确认 `home.css` 已加载，但首页 CSS art 组件 DOM 与已恢复的 CSS 文件不匹配，且 `projects-icons.css` 仍是 placeholder，导致首页 Jiju scene / system icons / interest totems 看起来像样式丢失。
- 影响：首页的 Jiju cat scene、Projects blueprint、Life magic、Power up、Gramophone、Archive evolution、Pyramid、Bagua，以及 Home system card 里的 Jiju project icon 都重新匹配真实 CSS 选择器。
- 验证：`curl` 检查 dev server 返回的 `index.css` 已包含 `jiju-cat-scene`、`projects-jiju-css-icon`、`home-power-totem` 且不再包含 `Restored import entry`；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.07s）。
- 后续：刷新 `http://localhost:4180/`；如果浏览器还显示旧画面，用硬刷新清掉上一轮 HMR 缓存。

### 2026-06-23 22:27

- 类型：修正 / 前台 / 知识库视觉
- 改动：移除 `styles/pages/poker.css` 中 `.wiki-page` 的黑底、大标题、左对齐、透明文章模块等 Dan Koe-like 视觉覆盖；保留并收敛 `wiki-quote-bar` 为 Eden brand guide 下的品牌色 blockquote；同步 `AGENTS.md` 和 `soul.md`，明确 Dan Koe 只作为 article 写法参考，视觉仍跟随 Eden brand guide。
- 原因：用户澄清 `/wiki/rag-flow` 只是参考 Dan Koe 写 article 的手法，其他仍需 follow 自己的 brand guide。
- 影响：`/wiki/rag-flow` 和其他 `/wiki/...` 页面恢复 Eden/Poker 既有 ambient 背景、玻璃卡片、居中内容岛和克制视觉；内容结构仍保留重点优先、pull quote、Skill Candidate、Key points 和折叠完整笔记。
- 验证：`rg` 确认 `#030303` 和 `.wiki-page` 黑底覆盖已从 `styles/pages/poker.css` 移除，仅保留 `.poker-page .wiki-quote-bar` 品牌化样式；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.10s）；`curl -I http://localhost:4180/wiki/rag-flow` 返回 `200 OK`。
- 后续：刷新 `http://localhost:4180/wiki/rag-flow`，应看到 Eden brand guide 视觉，而不是黑底 Dan Koe-like 视觉。

### 2026-06-23 22:23

- 类型：修复 / 前台 / Home CSS
- 改动：恢复被误写成 placeholder 的 Home 相关 CSS 文件：`styles/pages/home.css`、`styles/css-art/home-jiju-scene.css`、`styles/css-art/home-projects-blueprint.css`、`styles/css-art/home-life-magic.css`、`styles/css-art/home-interest-totems.css`。
- 原因：用户反馈 homepage CSS 全部不见；排查发现这些文件都只剩 1 行 `Restored import entry`，是前面修 Vite missing import 时误补空入口导致的。
- 影响：首页 layout 和 Home CSS art 样式入口恢复，CSS bundle 从缺失 Home 样式的状态恢复为完整样式。
- 验证：`wc -l` 确认五个文件恢复为 265 / 552 / 273 / 347 / 1432 行；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.08s）；`curl -I http://localhost:4180/` 返回 `200 OK`。
- 后续：本地硬刷新 `http://localhost:4180/`，应看到首页样式恢复；之后修 import 缺失不能再用空 CSS placeholder 覆盖已有样式文件。

### 2026-06-23 22:20

- 类型：前台 / 知识库 / Blockquote styling
- 改动：把 wiki note 的 `Core thesis` 从普通大标题改成 `blockquote`，新增 `.wiki-quote-bar` 样式：黑底文章中的左侧浅金色 color bar、italic 大号重点句。
- 原因：用户询问参考截图中 mention 的 color bar 是什么，并要求加进去。
- 影响：`/wiki/rag-flow` 等知识库文章页的核心结论更像 editorial pull quote / blockquote，视觉重点更明确。
- 验证：`rg` 确认 `wiki-quote-bar` 和 `blockquote` 已接入；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.12s）。
- 后续：本地刷新 `http://localhost:4180/wiki/rag-flow`，应看到 Core thesis 左侧出现浅金色竖线。

### 2026-06-23 22:18

- 类型：前台 / 知识库 / Editorial styling
- 改动：把 wiki note 页面改成黑底、左对齐、text-first 的 editorial article 风格：关闭全局 ambient gradient，缩窄内容列，hero 左对齐，大标题更接近文章标题；移除 note 主体的大玻璃卡片感，核心结论、Skill Candidate、Key points 和详情折叠区改为更克制的分隔线/文本模块。
- 原因：用户提供参考截图和链接，要求 `/wiki/rag-flow` 采用类似黑底长文的 look and feel，同时不要一屏很多字。
- 影响：`/wiki/rag-flow`、`/wiki/vite`、`/wiki/skills` 等 wiki note 页更像个人知识品牌的黑底文章页，重点更突出；不复制参考站文案或品牌资产，只采用高层排版逻辑。
- 验证：`rg` 确认 `.wiki-page` 黑底和 editorial 覆盖样式已接入；`curl -I http://localhost:4180/wiki/rag-flow` 返回 `200 OK`；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.22s）。
- 后续：本地刷新 `http://localhost:4180/wiki/rag-flow`，应看到黑底左对齐文章感，默认只显示重点和折叠详情。

### 2026-06-23 22:13

- 类型：前台 / 知识库 / 信息密度
- 改动：重排 wiki note 页面，把完整 bullet 列表默认收进 `Show full note / 展开完整笔记`；正文默认只显示 `Core thesis`、`Skill candidate`、最多 3 张 `Key points` 卡片；Skill draft preview 改成 3 个摘要字段 + 详细字段网格；缩小 wiki hero 的纵向间距和标题尺度，减少首屏压迫感。
- 原因：用户反馈 `/wiki/rag-flow` 页面字太多，只要重点。
- 影响：`/wiki/rag-flow`、`/wiki/vite`、`/wiki/skills` 等 note 页面默认更短、更聚焦，保留完整内容但需要用户主动展开；one-click skillization 仍可用。
- 验证：`rg` 确认 `wiki-key-points`、`wiki-detail-drawer`、`wiki-skill-summary-grid` 已接入；`curl -I http://localhost:4180/wiki/rag-flow` 返回 `200 OK`；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.17s）。
- 后续：本地刷新 `http://localhost:4180/wiki/rag-flow`，应看到默认只展示重点卡片，完整笔记折叠在下方。

### 2026-06-23 22:08

- 类型：内容 / 路由 / RAG flow
- 改动：新增 `/wiki/rag-flow` 知识架构页，说明 Tag Registry、Skill Cards、Embedding Index / RAG 和 Query / Suggest / Auto Skill Recall 的完整 flow；补充 RAG 适用场景、Tag Registry 管理规则、实现顺序和反模式；同步 `seo-routes.ts` 与 `README.md`；让 `Turn into Skill` 可用于该页面并生成对应 tags/source/anti-patterns。
- 原因：用户要求执行 Tag/RAG 管理方向，并把这个 flow 做成独立页面。
- 影响：知识库现在有一页专门定义未来 RAG 架构：source of truth 留在结构化 notes/cards/tags，vector DB 只作为检索层；后续可以按该页面逐步扩展 `/tag-registry`、`/skill-cards` 和 embedding index。
- 验证：`rg` 确认 `rag-flow`、`Tag Registry and RAG flow`、`Embedding Index`、`metadata filters` 已接入；`curl -I http://localhost:4180/wiki/rag-flow` 返回 `200 OK`；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 11.18s）。
- 后续：本地打开 `http://localhost:4180/wiki/rag-flow` 查看 RAG flow；下一步可实现 `/tag-registry` 和 `/skill-cards` 两个结构化页面。

### 2026-06-23 21:53

- 类型：内容 / 知识库 / Vite & Skill requirements
- 改动：在 `/wiki/vite` 新增 `为什么我会用 Vite`，明确 Vite 的采用原因来自 Jiju 项目变得庞大后需要更快反馈和更清楚的区块边界；在 `/wiki/skills` 新增 `一个 skill 的基本要求`，并把最小数据结构补齐为 `title`、`trigger`、`reusableRule`、`procedure`、`checks`、`sourceProject`、`antiPatterns`、`tags`、`sources`、`status`。
- 原因：用户补充 Vite 来自 Jiju 项目复杂度问题，并询问一个 skill 的基本要求。
- 影响：Vite 笔记更贴近真实项目来源；Skill Card 的生成标准更清楚，后续 one-click skillization 不会把普通笔记误当成 skill。
- 验证：`rg` 确认 `为什么我会用 Vite`、`Jiju 项目变得太庞大`、`一个 skill 的基本要求`、`reusableRule`、`sourceProject`、`antiPatterns` 已接入；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.12s）。
- 后续：本地打开 `http://localhost:4180/wiki/vite` 和 `http://localhost:4180/wiki/skills` 查看更新内容。

### 2026-06-23 21:49

- 类型：代码 / 产品功能 / Skill Card schema
- 改动：强化 one-click Skill Card draft 的必需字段：新增 `reusableRule`、`sourceProject`、`antiPatterns`，并在 preview UI 中明确展示触发场景、可复用规则、执行步骤、检查方式、来源项目、反模式和 tags；本地旧 draft 缺字段时使用 fallback，重新生成后会写入新结构。
- 原因：用户明确要求 Skill Card 必须包含触发场景、可复用规则、执行步骤、检查方式、来源项目、反模式，并需要 tag 标记与分类。
- 影响：`Turn into Skill` 生成的 draft 从普通摘要升级为可审核、可复用的技能卡结构；`/wiki/skills` 的 Local skill drafts 也会显示来源项目和触发场景，便于后续分类管理。
- 验证：`rg` 确认 `reusableRule`、`sourceProject`、`antiPatterns`、`触发场景`、`可复用规则`、`反模式` 已接入；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.74s）。
- 后续：本地打开 `http://localhost:4180/wiki/vite`，点击 `Regenerate skill`，应看到包含 6 个必需字段和 tags 的新版 Draft Skill Card。

### 2026-06-23 21:45

- 类型：代码 / 产品功能 / Wiki skills
- 改动：实现 one-click skillization 第一版：每个 `/wiki/...` 笔记页新增 `Turn into Skill` 按钮；点击后根据当前 wiki note 生成本地 Skill Card draft，包含 `title`、`trigger`、`procedure`、`checks`、`sources`、`tags`、`status` 和 `createdAt`；draft 保存到 `localStorage` 的 `eden-wiki-skill-drafts`；`/wiki` 与 `/wiki/skills` 会显示本地生成的 Skill Cards。
- 原因：用户要求执行“让 user one click 变成 skills”的方向。
- 影响：知识库从静态阅读页进化为可操作的 skill extraction workflow；当前版本先用本地存储打通 preview / draft / library 体验，未来可接 Firebase 或 markdown wiki 文件作为持久化层。
- 验证：`rg` 确认 `SKILL_DRAFTS_STORAGE_KEY`、`Turn into Skill`、`wiki-skill-preview`、`Local skill drafts` 已接入；`curl -I http://localhost:4180/wiki/vite` 和 `curl -I http://localhost:4180/wiki/skills` 均返回 `200 OK`；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 41.22s）。
- 后续：本地打开 `http://localhost:4180/wiki/vite`，点击 `Turn into Skill`，应出现 Draft Skill Card；再打开 `http://localhost:4180/wiki/skills`，应看到生成的 Local skill drafts。

### 2026-06-23 21:43

- 类型：内容 / 知识库 / Skills workflow
- 改动：扩展 `/wiki/skills`，把标题改为跨项目可复用 skills，并新增三块内容：还需要补充的 skill 记录字段、`one click 变成 skills` 的操作流程、Skill Card 的最小数据结构。
- 原因：用户询问知识库还需要补充什么，以及未来如何让 user one click 把项目经验变成 skills。
- 影响：知识库现在不只记录已有经验，也定义了后续产品化方向：从 wiki note / build log / bug fix 中抽取 skill candidate，经 user preview 后保存为可复用 Skill Card，并可被未来项目重新调用。
- 验证：`rg` 确认 `One-click skillization flow`、`Minimum data shape`、`Skill Card` 已接入；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 9.14s）。
- 后续：本地打开 `http://localhost:4180/wiki/skills`，应看到 one-click skillization 流程和最小数据结构。

### 2026-06-23 21:36

- 类型：内容 / 知识库 / Vite
- 改动：优化 `/wiki/vite` 的 Vite 知识库笔记，把用户对 Vite 架构、缺点和 fully vibe coding 使用方式的理解整理为四层：为什么适合 vibe coding、真正要小心的缺点、fully vibe coding 时怎么用、我的使用原则。
- 原因：用户给出自己对 Vite 的理解，希望补充优化，并沉淀成更准确、可复用的知识库内容。
- 影响：`/wiki/vite` 不再只是 Friday Poker Club 的项目笔记，而是跨项目可复用的 Vite + AI 协作操作原则；同时修正“关闭强类型/随便 ts-ignore”的风险，改为开发阶段保心流、交付前跑 typecheck/build 的做法。
- 验证：`rg` 确认 `Vite as the vibe-coding engine`、`fully vibe coding`、`Rule of thumb` 已接入；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 5.60s）。
- 后续：本地打开 `http://localhost:4180/wiki/vite`，应看到新的 Vite 架构与 fully vibe coding 使用原则。

### 2026-06-23 21:29

- 类型：代码 / 路由 / 知识库独立化
- 改动：把知识库从 `/poker/wiki` 改为独立 `/wiki` 路由；细节页同步改为 `/wiki/vite`、`/wiki/background-music`、`/wiki/button-feedback`、`/wiki/firebase-lifetime-storage`、`/wiki/skills`；`/poker` 的 Knowledge base 区块现在链接到独立 `/wiki`；同步 `seo-routes.ts` 和 `README.md`。
- 原因：用户明确要求不要 `http://localhost:4180/poker/wiki`，只要 `http://localhost:4180/wiki`，因为其他项目也会 share 这些 skills。
- 影响：知识库从 Friday Poker Club 私有子页变成站内独立知识库入口，可承接 Jiju、Poker、ETReportHub、CRM 等项目共同复用的 skills。
- 验证：`rg` 确认当前实现路由使用 `/wiki`；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.11s）；`curl -I http://localhost:4180/wiki` 和 `curl -I http://localhost:4180/wiki/vite` 均返回 `200 OK`。
- 后续：本地验证 `http://localhost:4180/wiki`，应看到独立知识库总览；从 `/poker#knowledge` 点击笔记也应进入 `/wiki/...`。

### 2026-06-23 21:27

- 类型：资源 / 修复 / Poker avatars
- 改动：从 `HEAD` 恢复 `public/poker-avatars` 里的 9 张 Friday Poker Club avatar 图片：`jf.png`、`ph.png`、`zm.png`、`yt.png`、`ben.png`、`pat.png`、`jq.png`、`teik.png`、`ed.png`。
- 原因：用户截图显示 `/poker` avatar card 图片缺失，浏览器显示 alt text；实际原因是 `public/poker-avatars` 目录存在但头像文件为空。
- 影响：`/poker#avatar-guide` 的角色头像恢复显示，不再露出 broken image / alt text。
- 验证：`curl -I http://localhost:4180/poker-avatars/jf.png` 返回 `200 OK`；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.11s）。
- 后续：本地刷新 `http://localhost:4180/poker#avatar-guide`，应看到头像恢复；若仍看到旧 broken image，硬刷新一次。

### 2026-06-23 21:24

- 类型：代码 / 修复 / Vite import
- 改动：新增 `components/css-art/index.tsx`，导出当前 `App.tsx` 与 `css-art.registry.ts` 需要的 CSS art 组件入口；补回 `index.css` 已 import 但当前工作区缺失的 `styles/css-art/*` 与 `styles/pages/*` 样式入口文件，避免 Vite import analysis 继续报 unresolved import。
- 原因：用户本地 Vite overlay 报错：`Failed to resolve import "./components/css-art/index" from "App.tsx"`。
- 影响：开发服务器可以重新解析 `App.tsx`；CSS art 先以轻量 fallback 组件恢复可见入口，后续若需要完整复杂动效，可再把各 CSS art 文件扩回详细版本。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.08s）。
- 后续：本地刷新 `http://localhost:4180/poker`；如果浏览器仍显示旧 overlay，按 Esc 关闭后硬刷新一次。

### 2026-06-23 21:14

- 类型：代码 / 内容 / Poker 知识库
- 改动：在 `/poker` 新增 `Knowledge base` 区块，沉淀 Friday Poker Club 构建中学到的 Vite、background music、click button feedback、Firebase lifetime storage 和 skills map；新增 `/poker/wiki` 总览页，以及 `/poker/wiki/vite`、`/poker/wiki/background-music`、`/poker/wiki/button-feedback`、`/poker/wiki/firebase-lifetime-storage`、`/poker/wiki/skills` 五个知识库笔记页；新增 `styles/pages/poker.css` 管理 Poker wiki 样式；同步 `seo-routes.ts` 和 `README.md` 路由表。
- 原因：用户想把 Friday Poker Club 项目经验做成自己的知识库，并要求把 Vite、按钮反馈和 skills 等内容拆成单独页面。
- 影响：`/poker` 现在不仅是产品页和 story log，也成为项目知识库入口；Poker 构建经验以可回看的 wiki note 形式沉淀，后续可继续追加更多项目学习页。
- 验证：关键词检查确认 `poker/wiki`、`pokerWikiEntries`、`PokerWikiPage`、`poker-wiki-grid`、`Firebase lifetime storage` 已接入；`git diff --check -- App.tsx index.css styles/pages/poker.css seo-routes.ts README.md` 通过。`npm run build` 当前被既有工作树删除状态阻挡：`index.css` import 的 `styles/css-art/life-os-signals.css` 不存在；`npm run typecheck` 当前也被既有缺失文件阻挡：`components/css-art/index.tsx` 缺失，导致 `App.tsx` 与 `css-art.registry.ts` 的现有 import 无法解析。
- 后续：恢复或重新接入缺失的 `components/css-art/index.tsx` 与 `styles/css-art/*` 源文件后，重新运行 `npm run build`；本地验证地址为 `http://localhost:4180/poker`、`http://localhost:4180/poker/wiki` 和各个 `/poker/wiki/...` 笔记页。

### 2026-06-18 17:37

- 类型：文档 / 内容方向 / 个人知识品牌
- 改动：在 `AGENTS.md` 新增 `Personal Knowledge Brand Direction`，把 Dan Koe-like 方向定义为内容架构参考而非照搬：强观点首页、reader situation、Eden lens、build proof、durable archive、clear next action；同步在 `soul.md` 增加执行规则和防返工检查项。
- 原因：用户询问如果想要类似 Dan Koe 的内容风格，现在应该怎么改，并点名 `AGENTS.md`。
- 影响：后续 agent 在改首页、brand guide、essay/archive 或 LLM Wiki 内容时，会优先把 Eden 收敛成个人知识品牌 / creator media hub，而不是普通 portfolio 或 generic SaaS 页面。
- 验证：关键词检查确认 `Personal Knowledge Brand Direction`、`Dan Koe-like`、`creator media hub` 已写入；`git diff --check -- AGENTS.md soul.md log.md` 通过；已用 `npm ci` 重建损坏的本地依赖后运行 `npm run build`，当前 build 失败在既有工作树状态：`index.css` import `./styles/css-art/life-os-signals.css`，但该文件当前处于删除/缺失状态。
- 后续：如果继续执行前台改版，优先改 `/` 和 `/brand-guide` 的文案结构：首屏 thesis、essay/archive 入口、systems/resources shelf、真实 build proof 和 CTA。

### 2026-06-12 21:22

- 类型：前台 / ETReportHub System Flow 内容调整
- 改动：重写 `/etreporthub` hero subtitle，去掉“只是换成 Eden 站主题”这种任务说明式文案，改成面向运营和交付的系统地图表达；新增 `Complete Node Map / 完整节点图` section，把原 System Flow 的 15 个节点按 Input、Transaction Pipeline、Customer Pipeline、Unified Output 分组放回页面；补充对应 Eden 风格 node map CSS 和移动端单列布局。
- 原因：用户反馈原文案“很奇怪”，并希望把 Complete Node Map 也加进去。
- 影响：页面内容更像正式产品系统页，不像改稿说明；System Flow 的完整链路现在更清楚地覆盖 Excel 上传、后端 fallback、Transaction append/upsert、Customer overwrite/snapshot、SQLite、Dashboard、Excel/CRM/Audit 导出、tier maintenance 和上云预留。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.91s）；关键词检查确认旧文案 `一样保留 System Flow` 已移除，`Complete Node Map / 完整节点图` 已接入。
- 后续：本地验证看 `http://localhost:4180/etreporthub`，hero 下方应是更自然的系统地图文案，架构总览后应出现完整节点图。

### 2026-06-12 18:31

- 类型：代码 / 开发环境 / Vite
- 改动：删除根目录下生成的 `verify_*` / `dist_chk_*` 临时验证目录；在 `vite.config.ts` 的 dev server `watch.ignored` 加入 `**/verify_*/**` 和 `**/dist_chk_*/**`；把 `App.tsx` 与 `css-art.registry.ts` 里的 `./components/css-art` 目录 import 改成明确的 `./components/css-art/index`，减少 Vite 解析目录入口的不确定性。
- 原因：用户反馈 `http://localhost:4180/etreporthub` 进不到；排查发现 Vite dev server 能监听端口但 GET 请求无响应，终端出现大量 `verify_*` / `dist_chk_*` HTML reload，且依赖 transform/cache 状态卡住。
- 影响：`/etreporthub`、`index.tsx`、`App.tsx`、`index.css` 已恢复 200 返回；后续临时验证目录不会再触发 dev server reload 风暴。
- 验证：清理 `node_modules/.vite` 并重启 `npm run dev` 后，`curl http://localhost:4180/etreporthub`、`/index.tsx`、`/App.tsx`、`/index.css` 均返回 200；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 12.16s）。
- 后续：如果以后再生成 root-level 验证目录，优先放到 ignored 路径或临时目录，不要让 Vite watcher 扫到。

### 2026-06-12 18:08

- 类型：代码 / 内容 / ETReportHub
- 改动：把 `/projects` 里 ETReportHub card 和 `ETReportHub readout` 的旧 System Flow / `Daily Report/log.md` 口径，替换成 `/etreporthub` 产品页当前叙事：Daily Report OS、operating clarity、Product Promise、Data Trust、Operating Views、Next Action、CRM-ready workflow。
- 原因：用户要求用 `https://edentan.site/etreporthub` 这个页面的信息，替换原本来自 `https://daily.etreporthub.com/systemflow` 的信息。
- 影响：`/projects` 中 ETReportHub 的展示与 `/etreporthub` 产品页一致，不再强调 dashboard cache、Docker/backend 等偏内部工程细节。
- 验证：关键词检查确认 `/projects` 旧 `Daily Report/log.md` 文案已移除；`git diff --check` 通过；`npm run build` 已尝试多次，但当前工作区的 Vite build 卡在 `transforming...` 且进程 0% CPU，已中断避免残留进程。
- 后续：本地访问 `http://localhost:4180/projects`，查看 ETReportHub card 与下方 readout；访问 `http://localhost:4180/etreporthub` 对照产品页口径。后续需单独排查当前工作区 build 卡住问题。

### 2026-06-05 04:01

- 类型：代码 / CSS art / Home Interests refinement
- 改动：把首页 `Interests` 里的 `Pattern Archive` 进化图腾从装甲龙战士方向改成原创火龙/欧洲龙方向，并移除原本的 `home-archive-evolution-ring` 进化圆圈；更新 DOM 为 `home-archive-fire-dragon`、dragon wing/body/neck/head/horn/tail/flame/breath/claw 结构，CSS 改成更大的蝙蝠翼、长脖子、角、尾巴火焰和喷火动画；同步更新 `styles/css-art/README.md` 为 small-beast-to-fire-dragon。
- 原因：用户要求“改成进化成喷火龙”，随后要求“欧洲龙那种形态，不要那个粉红圈圈”。
- 影响：`Pattern Archive` card 现在是橙色小兽进化成欧洲火龙的透明底图腾，不再显示进化圆圈，也不再保留旧的 armored/warrior 命名。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.19s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `home-archive-evolution-ring`、`home-archive-warrior`、`home-archive-armor`、`home-archive-helmet`、`gauntlet`、`armored-warrior` 均无残留；`git diff --check` 通过。
- 后续：如果还要更欧洲，可以加更细的翼膜骨架、背刺和更长的蛇形尾巴。

### 2026-06-05 03:56

- 类型：代码 / CSS art / Home Interests
- 改动：给首页 `Interests` 里的 `Pattern Archive` 增加透明底“small orange reptile -> armored dragon warrior”进化 CSS 图腾；在 `App.tsx` 增加 `HomeArchiveEvolutionTotem` 组件和 `visual: 'archive-evolution'` 标记；在 `styles/css-art/home-interest-totems.css` 增加小型橙色爬行动物阶段、装甲龙战士阶段、翼甲、头盔、角、爪、进化环和 spark 动画；同步更新 `styles/css-art/README.md`。
- 原因：用户询问 `Pattern Archive` 的 CSS 能否做到 Agumon -> WarGreymon 风格；实现时用原创中性造型表达“小兽进化成装甲龙战士”的感觉，不直接复刻受版权保护角色。
- 影响：`Pattern Archive` card 现在有透明 PNG 感的进化图腾；橙色小兽会缩小淡出，银金装甲龙战士带翼甲和爪淡入，表达 pattern archive 的形态升级感。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.30s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `HomeArchiveEvolutionTotem`、`visual: 'archive-evolution'` 和 `.home-archive-*` 已接入；CSS 检查确认 `.home-archive-evolution-totem` 使用 `background: transparent`、`border: 0`、`box-shadow: none`；`git diff --check` 通过。
- 后续：如要更强进化感，可以加中间白闪帧、数据方块重组或更明显的 armor assemble 过程。

### 2026-06-05 03:53

- 类型：代码 / CSS art / Home Interests
- 改动：给首页 `Interests` 里的 `Conway's Game of Life` 增加透明底金字塔碰坏 CSS 图腾；在 `App.tsx` 增加 `HomePyramidBreakTotem` 组件和 `visual: 'pyramid-break'` 标记；在 `styles/css-art/home-interest-totems.css` 增加黑白像素金字塔、撞击点、冲击波、裂痕、碎裂像素和 block 位移/旋转动画；同步更新 `styles/css-art/README.md`。
- 原因：用户要求 `Conway's Game of Life` 的 CSS 放“金字塔碰坏”效果。
- 影响：`Conway's Game of Life` card 现在有透明 PNG 感的 broken pyramid 图腾；撞击球会从左侧撞入，金字塔 block 发光并错位散开，裂痕和像素碎片出现后复位。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.08s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `HomePyramidBreakTotem`、`visual: 'pyramid-break'` 和 `.home-pyramid-*` 已接入；CSS 检查确认 `.home-pyramid-totem` 使用 `background: transparent`、`border: 0`、`box-shadow: none`。
- 后续：如果要更像 Conway 规则，可以把撞击后的碎块改成 cellular automata 细胞扩散纹理。

### 2026-06-05 03:48

- 类型：代码 / CSS art / Home Interests
- 改动：给首页 `Interests` 里的 `Life OS` 增加透明底黑发到金发 power-up CSS 图腾；在 `App.tsx` 增加 `HomePowerUpTotem` 组件和 `visual: 'power-up'` 标记；在 `styles/css-art/home-interest-totems.css` 增加角色脸部、黑发层、金发尖刺层、橙蓝身体、金色 aura、spark 和变身/抖动动画；同步更新 `styles/css-art/README.md`。
- 原因：用户要求 `Life OS` 做“悟空黑发变成超级赛亚人金发”的 CSS 效果。
- 影响：`Life OS` card 现在有透明 PNG 感的 anime power-up 图腾；黑发阶段会淡出，金色尖发和金色能量 aura 会亮起，符合图腾透明底规则，不使用图片或固定背景。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.10s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `HomePowerUpTotem`、`visual: 'power-up'` 和 `.home-power-*` 已接入；CSS 检查确认 `.home-power-totem` 使用 `background: transparent`、`border: 0`、`box-shadow: none`。
- 后续：如果需要更像爆气瞬间，可以加更明显的闪白帧、地面冲击线或更夸张的金色发束。

### 2026-06-05 03:45

- 类型：代码 / CSS art / Home Interests refinement
- 改动：按用户参考图重做 `Analog Tech` 留声机 CSS 图腾的经典配色和造型：加入金铜色大喇叭、喇叭放射 ribs、木质底座、黄铜面板、黑胶唱片、唱臂和手摇柄；保留唱片旋转、唱臂/针头/喇叭轻震和声波扩散动画。
- 原因：用户要求参考经典留声机配色和“大喇叭”的造型，而不是抽象小图标。
- 影响：`Analog Tech` 图腾更接近传统 gramophone：铜金喇叭、深木底座、黑胶唱盘，仍然是透明底 CSS art，不使用图片或固定背景。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.12s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 brass/wood/record 配色变量、horn ribs、base panel 和 crank DOM/CSS 已接入；`git diff --check` 通过。
- 后续：如还要更像老物件，可以继续加底座雕花和喇叭内侧更多铜锈纹理。

### 2026-06-05 03:43

- 类型：代码 / CSS art / Home Interests
- 改动：给首页 `Interests` 里的 `Analog Tech` 增加透明底留声机 CSS 图腾；在 `App.tsx` 增加 `HomeGramophoneTotem` 组件和 `visual: 'gramophone'` 标记；在 `styles/css-art/home-interest-totems.css` 增加留声机底座、唱盘、唱片、唱臂、喇叭和声波振动动画；同步更新 `styles/css-art/README.md`。
- 原因：用户要求 `Analog Tech` 做“留声机那种用振动的 CSS”。
- 影响：`Analog Tech` card 现在有透明 PNG 感的留声机图腾；唱片慢转，唱臂/针头/喇叭轻微振动，喇叭口有声波扩散；仍遵守图腾透明底规则。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.01s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `HomeGramophoneTotem`、`visual: 'gramophone'` 和 `.home-gramophone-*` 已接入；CSS 检查确认 `.home-gramophone-totem` 使用 `background: transparent`、`border: 0`、`box-shadow: none`。
- 后续：如果留声机需要更复古，可以加手摇柄、木纹线和更明显的声波节奏。

### 2026-06-05 03:37

- 类型：代码 / CSS art / Home Interests
- 改动：给首页 `Interests` 里的 `Life Notes` 增加透明底道教八卦镜 CSS 图腾；新增 `styles/css-art/home-interest-totems.css`，在 `App.tsx` 增加 `HomeBaguaMirrorTotem` 组件和 `visual: 'bagua-mirror'` 标记，并把 Interests 箭头改成 `.home-interest-arrow`，避免误伤图腾内部 span；同步更新 `styles/css-art/README.md`。
- 原因：用户要求 `Life Notes` 用 CSS 做一个道教八卦镜，并遵守刚设定的“图腾透明底”规则。
- 影响：`Life Notes` card 现在有透明 PNG 感的八卦镜图腾，没有固定 app-icon 背景、外框底板或重阴影；八卦镜包含圆镜、阴阳、八个卦位短线和慢速转光，支持 dark mode 与 reduced motion。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.04s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `home-bagua-totem`、`visual: 'bagua-mirror'`、`home-interest-totems.css` 已接入；CSS 检查确认 `.home-bagua-totem` 使用 `background: transparent`、`border: 0`、`box-shadow: none`。
- 后续：若其他 Interests card 也要图腾，可继续放进 `home-interest-totems.css`，保持透明底规则。

### 2026-06-05 03:32

- 类型：文档 / 流程 / CSS art rules
- 改动：新增 CSS art 图腾透明底规则：在 `AGENTS.md` 的 CSS Art Maintenance Rules、`soul.md` 的默认执行规则和防返工清单、`styles/css-art/README.md` 的 Rules 中写明，totem / sigil / glyph / symbolic / emblem 类型 CSS art 默认透明底，像 transparent PNG；只有 app icon、真实场景、framed badge 或背景本身有视觉含义时才使用固定背景。
- 原因：用户明确偏好“图腾就透明底”，不要默认把 CSS 图腾做成固定底 app icon。
- 影响：后续新增大量 CSS art 时，agent 会先判断视觉类型；图腾类默认融入页面背景，减少不必要的外框、底板和重阴影。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.03s；保留现有 >500 kB chunk warning）；关键词检查确认规则已写入 `AGENTS.md`、`soul.md` 和 `styles/css-art/README.md`；`git diff --check` 通过。
- 后续：若现有 home 的 Life OS 魔法阵或 Projects blueprint 要改成透明底图腾，可以按这条规则继续执行视觉调整。

### 2026-06-05 03:29

- 类型：代码 / Home page cleanup correction
- 改动：继续移除首页中漏掉的 `Current build` Jiju product feature section，包括左侧 `Jiju.pet` 文案、右侧 `System file / Pet-friendly map` panel，以及对应 `.home-feature` / `.home-product-panel` CSS；同步把 brand guide motion rule 中的 Jiju cat scene/current build 引用改成通用的 icon/object motion 规则。
- 原因：用户截图指出首页仍然看得到 `Current build` section；上一轮只删掉了 hero 下方 cat scene visual，漏掉了后续 product feature section。
- 影响：首页不再出现任何 `Current build` 区块；Jiju 入口仍保留在 hero CTA 和 Systems card，不影响导航。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.97s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `current build`、`home-feature`、`home-product-panel`、`Pet-friendly map, but smaller first`、`jiju cat scene` 不再出现在首页代码入口。
- 后续：如浏览器仍显示旧内容，强刷 `http://localhost:4180/` 或确认 dev server 已加载最新 Vite bundle。

### 2026-06-05 03:26

- 类型：代码 / Home page cleanup
- 改动：移除首页 hero 下方的 `Current Build` / Jiju cat scene visual block；移除 Interests section 里的两张 image preview card，把 `Life OS` 和 `Analog Tech` 改成与其他兴趣入口一致的文字 card；删除 home 中不再使用的 image src 常量、`home-hero-visual` / `home-image-card` / `home-link-stack` CSS，并从 `index.css` 移除 `home-jiju-scene.css` import；同步更新 brand guide motion 文案，不再引用已删除的 Current Build cat scene。
- 原因：用户要求 home 移除 Current build section，并移除 Interests image preview。
- 影响：首页更轻、更集中；Interests 变为纯文字入口 grid；Jiju cat scene CSS 文件保留为未挂载参考资产，但不再进入构建样式入口。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.81s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `Current Build`、`home-hero-visual`、`jiju-cat-scene`、`home-image-card`、`home-link-stack` 和相关图片常量不再出现在首页代码入口。
- 后续：如果要继续减重，可以删除未挂载的 `styles/css-art/home-jiju-scene.css`，或迁到 archive/reference 目录。

### 2026-06-05 03:18

- 类型：代码 / CSS art / Home page
- 改动：更新首页 `Systems, not claims` 的 system cards：`Jiju.pet Growth System` 改名为 `Jiju Growth System`，并复用 `/projects` 里的 Jiju CSS app icon；`Life OS RPG System` 新增 1:1 心跳变魔法阵 CSS icon，新增 `styles/css-art/home-life-magic.css` 并接入 `index.css`；三张 home system card 的 icon 尺寸和间距在 `styles/pages/home.css` 统一。
- 原因：用户要求 Jiju Growth System 用回 Projects 页面那套 CSS icon，并把 Life OS RPG System 设计成爱心、心跳变魔法阵的 CSS 动画。
- 影响：首页 system card 的三项入口都有一致的 1:1 CSS 视觉：Projects Hub 是设计图纸、Jiju 是原 Projects cat icon、Life OS 是心跳/魔法阵；新 Life OS icon 支持 light / dark mode 和 reduced motion。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.27s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `Jiju Growth System`、`visual: 'jiju'`、`visual: 'life-magic'` 和 `home-life-magic.css` 已接入。
- 后续：如果首页三张卡片需要更工整，可以进一步把标题、icon 和 CTA 固定成同一 baseline grid。

### 2026-06-05 03:13

- 类型：代码 / CSS art / Home page
- 改动：给首页 `Projects Hub` system card 新增 1:1 设计图纸 CSS icon；新增 `styles/css-art/home-projects-blueprint.css`，在 `App.tsx` 用 `visual: 'blueprint'` 只挂到 Projects Hub，并在 `styles/pages/home.css` 处理卡片间距；同步更新 CSS art README。
- 原因：用户要求 home 的 Projects Hub 加一个 1:1、设计图纸方向的 CSS icon。
- 影响：Projects Hub 在首页有了独立的 blueprint 视觉信号，支持 light / dark mode、慢速扫描和 reduced motion；CSS art 继续按独立文件维护，没有回灌到主 `index.css`。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.02s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 icon component、CSS import、CSS art README 均已接入。
- 后续：如需更强“图纸”感，可以继续加比例尺、折角纸张或蓝图批注，但建议保持 icon 层级在 5-12 DOM 层左右。

### 2026-06-05 03:06

- 类型：代码 / 结构 / Jiju.pet page CSS extraction
- 改动：继续执行页面级 CSS 分层，把 `/jiju-pet` 的 route shell、product narrative layout、proof rows、system cards、DNA/note cards、chapter cards、CTA 和 mobile override 从 `index.css` 抽到 `styles/pages/jiju-pet.css`；在 `index.css` 顶部新增 import，并更新 `styles/pages/README.md`。
- 原因：用户要求继续执行优化；这是继 `home.css`、`projects.css` 后的第三个 page CSS 抽离。
- 影响：`index.css` 从 3152 行降到 2838 行，Jiju.pet 构建叙事页样式独立成 316 行 route CSS；后续修改 Jiju.pet 页面布局不需要继续扩张主 CSS。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.93s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/jiju-pet` 返回 200；代码检查确认 `.jiju-*` 页面样式集中在 `styles/pages/jiju-pet.css`，`index.css` 只保留 import。
- 后续：下一步可继续抽 `styles/pages/etreporthub.css`，或先抽 shared theme/base 到 `styles/tokens.css` / `styles/base.css`。

### 2026-06-05 03:04

- 类型：代码 / 结构 / Projects page CSS extraction
- 改动：继续执行页面级 CSS 分层，把 `/projects` 的 route shell、editorial layout、project cards、readout cards、CTA、mobile override 从 `index.css` 抽到 `styles/pages/projects.css`；在 `index.css` 顶部新增 import，并更新 `styles/pages/README.md`。Projects CSS app icons 仍保留在 `styles/css-art/projects-icons.css`。
- 原因：用户要求继续执行优化；这是继 `styles/pages/home.css` 后的第二个 page CSS 抽离。
- 影响：`index.css` 从 3480 行降到 3152 行，Projects 页面布局和 Projects icon visual 职责分离，后续改 card 排版或 icon 动画不需要在主 CSS 里混找。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.99s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/projects` 返回 200；代码检查确认 `.projects-*` 页面布局集中在 `styles/pages/projects.css`，icon visual 仍在 `styles/css-art/projects-icons.css`。
- 后续：下一步可继续抽 `styles/pages/jiju-pet.css`，或优先抽 shared theme/base 到 `styles/tokens.css` / `styles/base.css`。

### 2026-06-05 03:02

- 类型：代码 / 文档 / 结构 / Page CSS rules and home extraction
- 改动：新增页面级 CSS 分层规则：在 `AGENTS.md` 增加 `Page CSS Maintenance Rules`，在 `soul.md` 加入默认执行规则和防返工检查项，并新增 `styles/pages/README.md`。执行第一步优化：把首页 `.home-*` layout / typography / panels / CTA / footer / mobile override 从 `index.css` 抽到 `styles/pages/home.css`，并在 `index.css` 顶部新增 import；全局 `.page-shell` mobile padding 保留在 `index.css`。
- 原因：用户要求“设立规则，执行优化”；目标是让 CSS art 抽离后，页面级 CSS 也按 route 分层维护，减少 `index.css` 继续膨胀。
- 影响：`index.css` 从 3818 行降到 3480 行，首页 page CSS 独立为 343 行；首页 CSS art 仍在 `styles/css-art/home-jiju-scene.css`，页面布局在 `styles/pages/home.css`，职责更清楚。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.08s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；代码检查确认 `.home-*` 样式集中在 `styles/pages/home.css`，`index.css` 只保留 import 和全局 `page-shell` 规则。
- 后续：下一步可按同样模式抽 `styles/pages/projects.css`，然后再抽 `styles/pages/jiju-pet.css` 或 `styles/pages/etreporthub.css`。

### 2026-06-05 02:56

- 类型：代码 / 结构 / Home Jiju CSS art extraction
- 改动：继续执行 CSS art 资产系统，把首页 Current Build / Jiju.pet 的 `jiju-cat-scene`、主猫、客串猫、云、草、蝴蝶、叶子、星星、dark mode、keyframes 和 reduced motion 从 `index.css` 抽到 `styles/css-art/home-jiju-scene.css`；在 `index.css` 顶部新增 import，并更新 `styles/css-art/README.md`。
- 原因：用户要求继续执行大量 CSS 更好维护的方案；这是继 Life OS signals 和 Projects icons 后的第三个 CSS art family 抽离。
- 影响：`index.css` 从 4368 行降到 3818 行，首页 Jiju cat scene 的复杂动画成为独立资产文件；首页 hero 容器、文案、section/card 布局仍留在 `index.css`。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.14s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/` 返回 200；代码检查确认 `jiju-cat-scene` 和 `@keyframes jiju-*` 已在 `styles/css-art/home-jiju-scene.css`，`index.css` 只保留 import 和页面布局。
- 后续：下一步可按同样规则继续拆 Conway 或 ETReportHub 页面级 CSS，或者先把 CSS art import 顺序和命名整理成更明确的分组。

### 2026-06-05 02:53

- 类型：代码 / 结构 / Projects CSS art extraction
- 改动：继续执行 CSS art 资产系统，把 `/projects` 的 Jiju、Friday Poker Club、ETReportHub、CRM Intelligence System 四组 CSS app icon 及其 keyframes / reduced motion 从 `index.css` 抽到 `styles/css-art/projects-icons.css`；在 `index.css` 顶部新增 import，并更新 `styles/css-art/README.md` 的 Current Files。Projects card 排版规则如 title、slot、summary、system line、actions 保留在 `index.css`。
- 原因：用户要求继续执行大量 CSS 更好维护的结构化方案；这是继 Life OS signals 后的第二个 CSS art family 抽离。
- 影响：`index.css` 从 5477 行降到 4368 行，Projects icon visual 形成独立资产文件，后续修改 Jiju / Poker / ETReportHub / CRM icon 不需要继续扩张主 CSS。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.19s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/projects` 返回 200；代码检查确认 projects icon class 和 `@keyframes projects-*` 只在 `styles/css-art/projects-icons.css`，布局类仍在 `index.css`。
- 后续：下一步可抽首页 Jiju cat scene / landing animation 到独立 `styles/css-art/home-jiju-scene.css`，或继续拆 Conway / page-specific CSS。

### 2026-06-05 02:49

- 类型：代码 / 文档 / 结构 / CSS art maintenance rules
- 改动：制定并落地大量 CSS visual 的维护规则：在 `AGENTS.md` 新增 `CSS Art Maintenance Rules`，在 `soul.md` 加入默认执行偏好和防返工检查项；新增 `styles/css-art/README.md` 作为 CSS art 资产系统说明；把 Life OS 的 signal card、WIND-57 云/海/岛 banner、PHASE-RULE 签合同 banner 和相关 keyframes 从 `index.css` 抽到 `styles/css-art/life-os-signals.css`，并在 `index.css` 顶部引入。
- 原因：用户要求“制定规则然后执行”，目标是让后续大量 CSS art 更好维护、更容易优化，而不是继续把复杂视觉堆进主 CSS。
- 影响：`index.css` 体积和职责下降，Life OS CSS art 形成可复制的资产文件模式；未来新增 Jiju / Projects / Life OS 等复杂 CSS visual 时应按 `styles/css-art/` 一个视觉家族一个文件的规则扩展。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.72s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认 `index.css` 已 import `./styles/css-art/life-os-signals.css`，规则文档已写入 `AGENTS.md` / `soul.md` / `styles/css-art/README.md`。
- 后续：下一步可继续把 Projects 的 Jiju / Friday / ETReportHub / CRM CSS icons 抽成 `styles/css-art/projects-icons.css`，再逐步抽首页 Jiju cat scene。

### 2026-06-05 02:45

- 类型：代码 / 前台 / Life OS global card border transparency
- 改动：为 `/life-os` 增加后置的 `.life-os-open-layout :where([class*="border"])` light/dark 覆盖规则，将所有带 Tailwind border class 的 Life OS 卡片与内层卡片边框统一压成 transparent，并同步 outline-color。
- 原因：用户要求“把全部的card border变透明”；此前已有早期透明规则，但 dark mode 的全局 `.border-stone-*` 覆盖优先级更高，部分卡片仍可能露出边线。
- 影响：Life OS 页面所有 card / nested card 在 light 与 dark mode 下都不再显示白色或石色外框；保留页面布局、背景、CSS visual 和内容结构。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.32s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认后置 light/dark border override 已接入。
- 后续：本地访问 `http://localhost:4180/life-os`，检查 Life OS 各章节 card 外框应全部透明。

### 2026-06-05 02:44

- 类型：代码 / 前台 / Life OS signal card outline removal
- 改动：把 `/life-os`「玩家信号 → RPG 模组」6 张 `life-rpg-signal-card` 的 light/dark 外框 `border-color` 都改为 `transparent`，保留卡片背景、阴影以及内部 CSS icon / 21:9 visual 自身边界。
- 原因：用户要求移除 6 个 card 的白色 outline。
- 影响：玩家信号卡片外缘更干净，不再出现浅色描边；WIND-57、PHASE-RULE 和其他 signal 的内部 CSS 动画不受影响。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.15s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认 `.life-os-open-layout .life-rpg-signal-card` light/dark border 均为 transparent。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，6 张 signal card 应不再有白色外框。

### 2026-06-05 02:42

- 类型：代码 / 前台 / Life OS WIND-57 pure CSS illustration pass
- 改动：增强 `/life-os`「玩家信号 → RPG 模组」里 `WIND-57 / 轻量渗透型风格` 的 21:9 CSS scene：在原本拟人云、山、岛、海基础上新增山顶雪线、沙滩、棕榈、海浪喷雾、云脸高光、鼻子和腮红；新增 `life-rpg-palm-sway` 与 `life-rpg-wind-spray-drift` 慢动画，并纳入 reduced motion。
- 原因：用户问纯 CSS Francine 那类复杂插画“会有难度吗”，并要求“试试看”；本次先用现有 banner 做一版更复杂但仍轻量的 CSS 插画试验。
- 影响：WIND-57 visual 更接近可识别的纯 CSS 小插画：云更有人脸，背景有更明确的山岛海层次和风吹后的水花反馈；没有引入图片或新依赖，不影响 PHASE-RULE 和其他 signal card。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.27s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认新增 `life-rpg-wind-cloud-highlight`、`life-rpg-wind-cloud-cheek`、`life-rpg-wind-palm`、`life-rpg-wind-mountain-snow`、`life-rpg-wind-spray` 已接入。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，第一张 `轻量渗透型风格` 应看到更复杂的拟人云吹风、山岛海 CSS 插画。

### 2026-06-05 02:32

- 类型：代码 / 前台 / Life OS WIND-57 anthropomorphic cloud scene
- 改动：重做 `/life-os`「玩家信号 → RPG 模组」里 `WIND-57 / 轻量渗透型风格` 的 21:9 CSS visual：DOM 从旧的 wind veil / infiltration nodes 改为 sea、waves、mountains、island、anthropomorphic cloud face、cloud eyes、mouth、puffs、breath；CSS 背景改成山、岛、海场景，新增 `life-rpg-cloud-breathe`、`life-rpg-cloud-blink`、`life-rpg-cloud-mouth`、`life-rpg-cloud-puff`、`life-rpg-cloud-breath`、`life-rpg-sea-wave` 动画，并更新 dark mode 与 reduced motion。
- 原因：用户要求“轻量渗透型风格的 css 改为拟人的云吹风，背景是山岛海”。
- 影响：WIND-57 的 visual 更像一个具象、柔和的 CSS 小场景：拟人云对着海岛吹风，远处有山和海浪；保留 21:9 横向比例，不影响 PHASE-RULE 签合同 visual 和其他 signal。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.85s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认旧 `life-rpg-wind-veil` / `life-rpg-infiltration*` 无残留，新 `life-rpg-wind-cloud-face`、`life-rpg-wind-mountain`、`life-rpg-wind-island`、`life-rpg-wind-sea`、`life-rpg-cloud-breath` 已接入。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，第一张 `轻量渗透型风格` 应看到拟人云吹风、山岛海背景。

### 2026-06-05 02:28

- 类型：代码 / 前台 / Life OS PHASE-RULE signature and chop timing
- 改动：调整 `/life-os`「玩家信号 → RPG 模组」里 `PHASE-RULE / 规则制定阶段` 的签合同 CSS motion：签名从单一 `::before` 弧线改成 4 段 `life-rpg-contract-sign-stroke-*` 手写笔画，逐段 reveal；chop/印章从偏暗棕红改为更明确的红色方印（stamp base `#d7352a`、seal `rgb(215 42 34 / ...)`），并把印章时机从签名刚完成前后改为签名完成后再下落、压住、seal 显示。
- 原因：用户反馈“签名复杂一点，chop 的时机跟颜色有问题”。
- 影响：PHASE-RULE 的 21:9 contract visual 更像真实签署流程：先写复杂签名，再盖红色方印；印章不再抢在签名动作前发生，颜色也更接近正式 chop。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.22s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认旧 `life-rpg-contract-signature::before` / `life-rpg-contract-sign` 无残留，新 4 段签名、`life-rpg-contract-stamp-drop`、`life-rpg-contract-seal-show` 与红色 chop 色值已接入。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，第二张 `规则制定阶段` 应看到更复杂签名和延后盖章。

### 2026-06-05 02:25

- 类型：代码 / 前台 / Life OS PHASE-RULE contract visual
- 改动：为 `/life-os`「玩家信号 → RPG 模组」里的 `PHASE-RULE / 规则制定阶段` 移除 small CSS app icon，并新增 `LifeRpgRuleContractStrip` 21:9 CSS visual。场景包含桌面、契约纸张、规则文本线、签名线、钢笔、印章和 seal；新增 `.life-rpg-contract-*` 样式与 `life-rpg-contract-paper-settle`、`life-rpg-contract-pen-write`、`life-rpg-contract-sign`、`life-rpg-contract-stamp-drop`、`life-rpg-contract-seal-show` 动效；支持 dark mode 与 reduced motion。
- 原因：用户要求“规则制定阶段也是 remove small icon，然后 add 21/0 css with sign contract css motion”；按前后上下文将 `21/0` 处理为 `21:9`。
- 影响：PHASE-RULE 卡片现在和 WIND-57 一样使用横向 CSS 场景，不显示 small icon；视觉语义从抽象规则 icon 变成“签署规则契约”，更贴合规则制定阶段。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.28s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认 `LifeRpgRuleContractStrip`、`.life-rpg-contract-strip`、签名/印章 keyframes 存在，并确认 `LifeRpgSignalCssIcon` 只在非 WIND-57 / PHASE-RULE 时渲染。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，第二张 `规则制定阶段` 应看到 21:9 签合同动画，没有 small icon。

### 2026-06-05 02:22

- 类型：代码 / 前台 / Life OS WIND-57 wind-cover visual refinement
- 改动：继续调整 `/life-os`「玩家信号 → RPG 模组」里的 `WIND-57 / 轻量渗透型风格`：该卡片头部不再渲染 small CSS app icon；21:9 CSS visual 从线条/HUD 风格改成更接近 Jiju CSS 场景的“风幕盖过去”动画。DOM 改为 ground、wind veil、soft cloud、infiltration patch、infiltration node；CSS 移除旧 `wind-current` / `wind-particle` / `infiltration-field` 线条设计，改用柔软风团横向覆盖、右侧区域被风渗透后节点亮起。
- 原因：用户要求“轻量渗透型风格 的 small icon remove；21/9 的 css 换成风盖过去，不要线条设计了，刚才 jiju css 就很好”。
- 影响：WIND-57 卡片视觉更像一个柔和 CSS 小场景，不再像数据线框；标题区更干净，只显示 title/code；其他 5 个 signal 的大 CSS app icon 不受影响。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.82s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认旧线条/粒子 class 无残留，`LifeRpgSignalCssIcon` 只在 `signal.code !== 'WIND-57'` 时渲染。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，第一张 `轻量渗透型风格` 应只有 21:9 风幕覆盖动画，没有 small icon。

### 2026-06-05 02:18

- 类型：代码 / 前台 / Life OS WIND-57 21:9 CSS strip
- 改动：为 `/life-os`「玩家信号 → RPG 模组」里的 `WIND-57 / 轻量渗透型风格` 单独新增 `LifeRpgWindInfiltrationStrip`，以 21:9 CSS 横向 visual 展示风吹与渗透过程；新增 `.life-rpg-wind-strip`、wind current、particle、infiltration field/node 样式，以及 `life-rpg-wind-blow`、`life-rpg-wind-particle`、`life-rpg-infiltrate` 动画。其他 5 个 signal 仍保持上一版的大 CSS app icon，不恢复大横幅。
- 原因：用户要求“轻量渗透型风格的 css 21:9 ratio，然后用一个风吹然后渗透的动画”。
- 影响：WIND-57 卡片现在有专属 21:9 CSS 动画：风线和粒子从左侧吹过，右侧结构节点延迟亮起，表达“风先经过，再渗透进系统”；支持 light/dark mode 与 reduced motion。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.30s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认 `LifeRpgWindInfiltrationStrip` 只在 `signal.code === 'WIND-57'` 时渲染，CSS 含 `aspect-ratio: 21 / 9`。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，第一张 `轻量渗透型风格` 应看到 21:9 风吹渗透动画。

### 2026-06-05 02:14

- 类型：代码 / 前台 / Life OS signal app icon refinement
- 改动：按用户反馈调整 `/life-os`「玩家信号 → RPG 模组」卡片：移除上一版的大 CSS signal banner 与 `LifeRpgSignalCssBanner` 组件，只保留更大的 CSS app icon；把 grid、arc、vector、node、orbit 和 core breathe 动效全部集中进 `LifeRpgSignalCssIcon`。icon 从 2.5rem 放大到 4.75rem，卡片头部改为大 icon + title/code。
- 原因：用户要求“把 app icon 变大然后加 css，现在大的 css 拿掉”，即不要顶部大横幅，改成更大的 CSS icon。
- 影响：玩家信号卡片更紧凑，视觉重点回到 app icon；6 个 signal 仍保留不同颜色/几何特征和 light/dark mode，旧 PNG 和大横幅都不再渲染。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.03s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认 `LifeRpgSignalCssBanner`、`.life-rpg-signal-css-banner`、`signal.banner`、`signal.icon` 均无渲染残留。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，应看到每张卡只有一个更大的 CSS app icon，不再有顶部横幅。

### 2026-06-05 02:10

- 类型：代码 / 前台 / Life OS player signal CSS visuals
- 改动：将 `/life-os`「玩家信号 → RPG 模组 / Player Signals -> RPG Modules」里的 6 组 signal banner 和 icon 从 PNG 渲染改成纯 CSS 设计。新增 `LifeRpgSignalCssBanner`、`LifeRpgSignalCssIcon`、`lifeRpgSignalVisualKeys`，每个 signal 使用同一套 CSS 几何结构但按 code 切换风 / 规则 / 探索 / 刃 / 身体回应 / 抽象压缩的色彩与图形重点；新增 `.life-rpg-signal-*` 样式、慢速 orbit / scan / pulse / float 动效、light/dark mode 配色和 `prefers-reduced-motion` 关停。
- 原因：用户要求把 `/life-os` 中“玩家信号 → RPG 模组”的 banner and icon 都换成 CSS design。
- 影响：该区块不再渲染 `signal.banner` 与 `signal.icon` PNG，视觉更统一为 Life OS 的系统化 signal board；其他 Life OS 区块的既有图片资产不受影响。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.12s；保留现有 >500 kB chunk warning）；`curl -I http://localhost:4180/life-os` 返回 200；代码检查确认 `LifeRpgSignalCssBanner`、`LifeRpgSignalCssIcon` 和 `.life-rpg-signal-*` 样式已接入，渲染处不再引用 `signal.banner` / `signal.icon`。
- 后续：本地访问 `http://localhost:4180/life-os`，进入「数值控制台」里的「玩家信号 → RPG 模组」，应看到 6 张 CSS 信号横幅和对应 CSS 小 icon，支持 dark/light mode。

### 2026-06-05 02:04

- 类型：代码 / 前台 / Conway I Ching rule mapping
- 改动：把 `/conways-game-of-life` 易经读数从“8-bit rule 中间六位”改为 `64 卦 × 4 phase = 256 rules`：低 6 位（`rule & 63`）决定六爻卦码，高 2 位（`rule >> 6`）决定静卦 / 下卦动 / 上卦动 / 通卦动；读数面板新增 Phase、卦码显示，并在六爻图上高亮 phase 对应变爻。
- 原因：用户指出 Rule 000 和 Rule 001 的上下卦相同；原先丢弃首尾 bit 的映射会让相邻规则重复，不符合“256 rules 配合易经”的结构。
- 影响：Rule 000 与 Rule 001 现在会读成不同卦；Rule 064 会回到同一卦码但进入第二个 phase，更清楚地表达 `64 × 4` 的关系。
- 验证：`rg` 确认旧文案 `middle six / 中间六位` 已无命中，新 `I_CHING_RULE_PHASES`、`Phase {phaseBits}` 和 `.is-changing` 已接入；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.09s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/conways-game-of-life`，点击 Rule 000 / 001 / 064，对比卦码、Phase 与变爻高亮。

### 2026-06-05 01:05

- 类型：代码 / 前台 / Projects card layout alignment
- 改动：修正 `/projects` 项目卡排版：项目卡改为 flex column；title row 改为 `grid-template-columns: minmax(0, 1fr) icon`，icon 固定列，title 可 `overflow-wrap:anywhere`，避免 ETReportHub / CRM 长标题被 icon 遮住；给 title row、role、summary 设置统一高度节奏；System layer 改为 `margin-top:auto`，action 区新增 `projects-card-actions` class 并统一 gap / margin / min-height。
- 原因：用户截图反馈项目卡不对称、action button 不在同一 line、System layer 和隔壁不对齐、title 不对齐，并且 ETReportHub title 被 icon hide 掉。
- 影响：`http://localhost:4180/projects` 的四个项目卡标题、icon、System layer 和 action button 更规整；长标题会换行而不是被图标覆盖。
- 验证：`rg` 确认 `projects-card-actions`、`overflow-wrap:anywhere`、`margin-top:auto` 等布局规则已接入；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.96s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，检查四张卡 title 不被遮挡，System layer 与 action button 在同一排卡片中更接近同一水平线。

### 2026-06-05 01:00

- 类型：代码 / 前台 / Projects CRM magic circle geometry
- 改动：增强 CRM Intelligence System CSS 魔法阵 icon 的几何复杂度：新增八边形外框、六边形内框、十字轴线、4 条斜向短刻度和 2 个小方形 glyph；新增对应 light/dark 颜色、慢速旋转/漂移/脉冲动画，并纳入 `prefers-reduced-motion` 关停规则。
- 原因：用户要求魔法阵“多一点复杂的几何形”。
- 影响：`http://localhost:4180/projects` 的 CRM icon 更像复杂魔法阵/智能系统符号，和其他三个项目 icon 的视觉差异更明显；无新增图片或依赖。
- 验证：`rg` 确认 `projects-crm-polygon`、`projects-crm-axis`、`projects-crm-tick`、`projects-crm-glyph` 已接入；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.89s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，CRM 卡片右侧应看到更复杂的多层几何魔法阵。

### 2026-06-05 00:54

- 类型：代码 / 前台 / Projects CRM magic circle icon
- 改动：为 `/projects` 的 CRM Intelligence System 卡片新增 `ProjectsCrmCssIcon` 纯 CSS 魔法阵 app icon，包含 flat 背景、外/中/内三层圆环、双三角符号、四个节点、中心核心和 orbit 流光；新增 `projects-crm-*` 专用样式、light/dark 配色、慢速旋转、反向旋转、节点 pulse、核心呼吸和 `prefers-reduced-motion` 关停规则。
- 原因：用户希望 CRM Intelligence System 使用“魔法阵 CSS 动画”的视觉方向，而不是普通 network/dashboard。
- 影响：`http://localhost:4180/projects` 的四个项目卡现在都有对应 CSS app icon；CRM icon 语义偏“智能系统 / 关系召唤 / 下一步动作”，和 ETReportHub 的数据 bar、Friday Poker Club 的对 A、Jiju.pet 的猫场景区分开。
- 验证：`rg` 确认 `ProjectsCrmCssIcon` 与 `projects-crm-*` 样式已接入；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.94s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，CRM Intelligence System 卡片右侧应看到慢速旋转和脉冲的魔法阵 CSS icon，light/dark mode 都可用。

### 2026-06-05 00:37

- 类型：代码 / 前台 / Projects ETReportHub icon animation
- 改动：放慢 ETReportHub CSS app icon 的数据动效：bar 动态从 3.4s 改为 5.8s，趋势线 pulse 从 3.8s 改为 6.2s，扫描线从 3.2s 改为 5.6s；同步拉开 4 根 bar 的 animation delay。
- 原因：用户反馈 ETReportHub CSS 动画要“慢一点”。
- 影响：`http://localhost:4180/projects` 的 ETReportHub icon 数据变化更稳、更不急促；动态仍可见。
- 验证：`rg` 确认新周期值存在（5.8s / 6.2s / 5.6s）；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.88s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，ETReportHub 卡片右侧 bar、趋势线和扫描线应比上一版慢。

### 2026-06-05 00:35

- 类型：代码 / 前台 / Projects ETReportHub icon
- 改动：为 `/projects` 的 ETReportHub 卡片新增 `ProjectsEtReportCssIcon` 纯 CSS app icon，包含 flat dashboard 背景、顶部状态点、网格、4 根动态 bar、趋势线和扫描线；新增 `projects-etreport-*` 专用样式、light/dark 配色、bar 动态变化、趋势线 pulse、扫描线动画，以及 `prefers-reduced-motion` 关停规则。
- 原因：用户要求“ETReportHub 也来一个，来个数据化的 CSS 动画，bar 动态”。
- 影响：`http://localhost:4180/projects` 的 ETReportHub 卡片现在有数据化动态 CSS icon，和 Jiju.pet / Friday Poker Club 的图标体系对齐；无新增图片或依赖。
- 验证：`rg` 确认 `ProjectsEtReportCssIcon` 与 `projects-etreport-*` 样式已接入；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.74s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，ETReportHub 卡片右侧应看到 dashboard 风格 icon，bar 会动态升降，light/dark mode 都可用。

### 2026-06-05 00:32

- 类型：代码 / 前台 / Projects Friday Poker Club icon flat background
- 改动：继续调整 Friday Poker Club CSS app icon：移除 dealer button 圆点 DOM 与 `.projects-poker-button` 样式；将 poker icon 的 light/dark 外层背景改为 flat solid color（light `#16211d`、dark `#11191b`），牌桌背景也改为 flat solid color（light `#1f7a58`、dark `#15543f`），不再使用 gradient。
- 原因：用户要求“那个圆点也是拿掉”，并要求 dark mode / light mode 背景 flat 一点，不要 gradient。
- 影响：`http://localhost:4180/projects` 的 Friday Poker Club icon 更干净，视觉更像简洁 app icon；Jiju.pet icon 未改。
- 验证：`rg` 确认无 `projects-poker-button`；poker icon/table 对应样式已改为纯色背景；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.85s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，Friday Poker Club 卡片右侧应只显示 flat 背景牌桌与一对 A，不再有圆点或渐变背景。

### 2026-06-05 00:30

- 类型：代码 / 前台 / Projects Friday Poker Club icon refinement
- 改动：按用户反馈调整 Friday Poker Club CSS app icon：移除 3 个筹码 DOM 与全部 `projects-poker-chip*` 样式；两张手牌改成对 A（一张黑桃 A、一张红心 A，含角标 A 与中间花色）；动作放慢，牌桌呼吸从 3.2s 改为 5.6s，手牌浮动从 2.8s 改为 4.8s，保留可见的 8px 上抬幅度。
- 原因：用户要求“把筹码拿掉，然后对A，动作慢一点”。
- 影响：`http://localhost:4180/projects` 的 Friday Poker Club icon 更聚焦德州扑克手牌，不再有筹码跳动；动效更慢、更容易看清。
- 验证：`rg` 确认无 `projects-poker-chip` 引用，两张牌含 `rank-top/rank-bottom` A 与 `suit-spade` / `suit-heart`；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.80s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，Friday Poker Club 卡片右侧应显示一对 A，无筹码，手牌动作比上一版更慢。

### 2026-06-05 00:28

- 类型：代码 / 前台 / Projects Friday Poker Club icon animation
- 改动：增强 Friday Poker Club CSS app icon 的动效幅度：牌桌呼吸从 1.5% 提到 6% 并缩短到 3.2s；两张手牌从轻微 2px 浮动改成 8px 上抬 + 旋转变化；筹码从 1px 微动改成 7px 跳动 + 1.14 scale，周期缩短到 2.4s。
- 原因：用户反馈原动效幅度太小，“没有注意根本都看不出”。
- 影响：`http://localhost:4180/projects` 的 Friday Poker Club icon 动画现在扫一眼可见，但仍限制在 app icon 内，不影响页面阅读；Jiju.pet icon 未改。
- 验证：`rg` 确认新幅度存在（`scale(1.06)`、`translateY(-8px)`、`translateY(-7px)`）；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.79s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，Friday Poker Club 卡片右侧应明显看到牌桌呼吸、手牌抬起和筹码跳动。

### 2026-06-05 00:25

- 类型：代码 / 前台 / Projects Friday Poker Club icon
- 改动：为 `/projects` 的 Friday Poker Club 卡片新增 `ProjectsPokerCssIcon` 纯 CSS app icon，包含椭圆牌桌、两张手牌、筹码和 dealer button；新增 `projects-poker-*` 专用样式、light/dark 配色、低频桌面呼吸/手牌浮动/筹码微动，以及 `prefers-reduced-motion` 关停规则。
- 原因：用户要求“帮 Friday Poker Club 也设计一组 CSS”，延续 Jiju.pet CSS app icon 的方向，为项目卡补一个不依赖图片的视觉标识。
- 影响：`http://localhost:4180/projects` 的 Friday Poker Club 卡片现在有独立 CSS icon；视觉和 Jiju.pet icon 尺寸一致，但主题切到 poker table / cards / chips。
- 验证：`rg` 确认 `ProjectsPokerCssIcon` 与 `projects-poker-*` 样式已接入；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.79s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，Friday Poker Club 卡片右侧应看到扑克主题 CSS app icon，light/dark mode 都可用。

### 2026-06-05 00:23

- 类型：代码 / 前台 / Projects dark mode icon border
- 改动：修正 `/projects` 中 Jiju.pet CSS app icon 在 dark mode 下边框过白的问题；为 `.projects-jiju-css-icon` 和 `.projects-jiju-css-icon::after` 增加 dark mode 专用 box-shadow，把白色 inset 描边改成低透明蓝灰描边，并加深底部内阴影。
- 原因：用户截图反馈 dark mode 下 Jiju.pet icon 外框是明显白边，和暗色页面不融合。
- 影响：dark mode 下 Jiju.pet icon 边框更安静，保留图标轮廓但不再发白；light mode 不受影响。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.77s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects` 并切到 dark mode，Jiju.pet CSS icon 外框应变成低对比蓝灰/暗边，不再是白色描边。

### 2026-06-05 00:21

- 类型：代码 / 前台 / Projects Jiju.pet icon
- 改动：将 `/projects` 中 Jiju.pet 卡片的 PNG app icon 替换为 `ProjectsJijuCssIcon` 纯 CSS 小场景；新图标复用首页 CSS 猫动效语言，但只保留单只主猫版本，不包含第二只 cameo cat。新增 `projects-jiju-*` 专用样式、light/dark 配色和 `prefers-reduced-motion` 关停规则；移除 `jijuIconSrc` 引用。
- 原因：用户要求把 `http://localhost:4180/projects` 里的 Jiju.pet app icon replace 成刚才那个 CSS、但不要另一只猫版本。
- 影响：Jiju.pet 项目卡现在不依赖 `public/project-icons/jiju-app-icon.png`，视觉上更贴近首页 Current Build CSS 动画；无新增图片或依赖。
- 验证：`rg` 确认 `jiju-app-icon` / `jijuIconSrc` 已无引用；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.90s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/projects`，Jiju.pet 卡片右侧应看到单猫 CSS app icon；不会出现第二只 cameo cat。

### 2026-06-05 00:17

- 类型：代码 / 前台 / 首页 Jiju cat scene
- 改动：在首页 Current Build CSS 动画场景中新增第二只不同颜色的 cameo cat：复用现有猫的 DOM 结构，新增 `.jiju-cat-cameo` 变体、`jiju-cameo` 与 `jiju-cameo-face` 时序；它会在 26s 动画周期尾段从左侧进场，靠近主猫短暂停留互动，再转身离开。同步补上缺失的 `@keyframes jiju-amble`，让主猫的慢速踱步动画与现有规则/日志描述对齐；reduced-motion 下 cameo cat 隐藏。
- 原因：用户要求“最后的最后一只另一个颜色的猫会过来客串互动一下然后离开”。
- 影响：首页动画更有小彩蛋，但仍保持 Brand Guide 里定义的慢速、克制、产品相关动效语言；无新增图片或依赖。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.93s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/`，看 Current Build banner，约一轮动画尾段会看到橘色 cameo cat 短暂出现、停一下再离开。

### 2026-06-05 00:13

- 类型：代码 / 内容 / Brand Guide
- 改动：在 `/brand-guide` 的 Story style 后新增 `07 / Motion language` 区块，明确当前首页是品牌动效基准：慢速背景微动、轻量页面入场、Current Build / Jiju cat scene 的安静节奏；新增 4 条动效规则（慢速环境微动、安静入场、动效要属于产品、保留 reduced motion）。
- 原因：用户要求把“喜欢当前 `http://localhost:4180/` 的 CSS 动画”加入前台 Brand Guide，不只写在 agent 规则里。
- 影响：品牌指南现在把首页动画语言纳入公开设计系统；后续改首页、全局 CSS 或新页面动效时，应遵守慢速、克制、有生命感的动效方向。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.91s；保留现有 >500 kB chunk warning）。
- 后续：本地访问 `http://localhost:4180/brand-guide`，滚到 `07 / Motion language`，应看到新增的双语动效规则。

### 2026-06-05 00:11

- 类型：文档 / 流程 / 前台动画偏好
- 改动：在 `soul.md` 追加用户长期偏好：喜欢当前 `http://localhost:4180/` 首页 CSS 动画手感，未来改首页或全局 CSS 时默认保留慢速背景微动、页面入场与 Current Build / Jiju cat scene 的安静节奏；在 `AGENTS.md` 的前端规则中同步写入动画保留要求。
- 原因：用户明确反馈喜欢当前本地首页的 CSS 动画，需要沉淀为后续 agent 可执行规则，避免未来改版误删或改成夸张动效。
- 影响：后续涉及首页、全局 CSS 或动画系统的改动，必须把当前动效语言视为设计约束；本次仅改文档，无需运行构建。
- 后续：若未来用户想强化或替换动效，应先说明新动效基准，并同步更新 `soul.md` 与 `AGENTS.md`。

### 2026-06-04 22:20

- 类型：内容 / 前台 / Friday Poker Club Story log
- 改动：`pokerStories` 两条 body 去掉开头的日期前缀（EN 「On May 26, 2024, ...」/「May 28, 2026 — ...」以及 ZH「2024-05-26，...」/「2026-05-28，...」），避免与卡片顶部的日期 eyebrow 重复。
- 原因：用户反馈 Story log 卡片顶部已经显示日期，body 里再写一次冗余。
- 影响：故事段落直接从叙事开句进入，节奏更干净；`npm run build` 通过（570.24 kB / gzip 184.08 kB）。
- 验证：本地 `npm run dev` 后访问 `http://localhost:4180/poker#story`，两条故事的正文不再以日期开头。

### 2026-06-04 22:10

- 类型：内容 / 前台 / Friday Poker Club Story log
- 改动：`pokerStories` 两条故事改为只用角色代号，移除所有真名。EN 用代号本体（The Covered King / The Reluctant Prince / The Gambling King / The Shameless Drifter / The Probability Breaker / The Poker Professor / Blackbeard / The Silent Shield）；ZH 同步用中文代号（被罩住的王 / 不想继承的太子 / 赌博之王 / 不要脸浪人 / 小概率破坏者 / 扑克教授 / 黑胡子团长 / 静默之盾）。Story 1 也把 ZH body 里残留的英文代号换成中文代号。
- 原因：用户要求故事中不要出现 jf / pat / patrick / ben / ed / zm / yt 等真名，全部用角色卡上的代号。
- 影响：Story log 与 Avatar guide 现在角色命名完全对齐，作品集页对外也不再透露任何朋友真名。`npm run build` 通过（570.30 kB / gzip 184.11 kB）。
- 验证：本地 `npm run dev` 后访问 `http://localhost:4180/poker#story`，两条故事中英文均无真名，仅出现代号。
- 后续：未来补故事时，写在 `pokerStories` 里也只使用 `pokerAvatarGuide` 中定义的代号。

### 2026-06-04 21:55

- 类型：代码 / 内容 / 前台 / Friday Poker Club Story log
- 改动：(1) `/poker` 在 FAQ 之前新增 `#story` 区块「Story log / 在这张桌上发生过的故事」，使用居中内容岛的双栏布局（左：kicker + 大标题 + 引言；右：日期 + 标题 + 叙事段落 list），桌面端遵循 max-width: 980px 的内容岛节奏；(2) 数据：新增 `pokerStoryIntro` 与 `pokerStories` 常量，目前记录两条：
  - `2024-05-26` Blackbeard（zm）与 The Silent Shield（yt）结婚；
  - `2026-05-28` jf 在 river 上反转两次（顺子 vs pat 葫芦），收场时 ben / jf / pat 三国鼎立；ed 拉 pat 进散钱平分局，5 块进 40 块出。
  叙事风格按 brand-guide 居中内容岛语气：克制、电影感、不喊话；(3) `index.css` 新增 `.poker-story-panel/-head/-intro/-list/-item/-date/-title/-body` 玻璃面板样式与 mobile 单列 fallback；(4) Hero 区追加 `#story` 锚点 CTA「看桌上故事 / View story log」。
- 原因：用户要求在 Questions 之前开一个 box 用来记录桌上故事，并请按提供的两段史料先填进去，之后他自己继续补。
- 影响：`/poker` 多了一个可持续追加的「Story log」叙事面板，使作品集页同时承载产品系统与桌上故事；`npm run build` 通过（570.07 kB / gzip 184.08 kB），CSS 119.90 kB。
- 验证：本地 `npm run dev` 后访问 `http://localhost:4180/poker`，Story log 区出现在 Avatar guide 之后、Questions 之前；中英文叙事都到位；Hero 顶部「看桌上故事」CTA 锚点 `#story` 可滚动到位。
- 后续：未来追加故事时只需在 `pokerStories` 数组追加 `{ date, title, body }` 项，无需改样式或组件。

### 2026-06-04 21:20

- 类型：代码 / 内容 / 前台 / Friday Poker Club page tightening + Avatar Guide
- 改动：(1) 收窄 `/poker` 左右空间：根容器从 `max-w-6xl` 改为 `max-w-5xl`，并在 `index.css` 新增 `.poker-page main` 与 `.poker-page .etreport-hero/-section/-console-panel/-topbar` 居中规则（`max-width: 980px; margin-inline: auto;`，`padding-inline: clamp(1.5rem, 7vw, 7rem)`），与 `etreport-sales-page` 的中央内容岛节奏一致，符合 `soul.md`「900–1100px 居中内容岛」品牌规则；(2) 从 `/Users/MacBookPro/Documents/GitHub/poker-power-card/avatarGuideData.ts` 抄入 9 个角色（jf / ph / zm / yt / ben / pat / jq / teik / ed）的双语 code name、phrase、tags、public intro 与 group intro，作为 `pokerAvatarGuide` 与 `pokerAvatarGroupIntro` 常量；(3) `/poker` 新增 Avatar guide 区块（2-col desktop / 1-col mobile，沿用 brand-guide grid 规则），每张卡片左侧头像方块右侧叙事；(4) 头像 PNG 拷贝到 `public/poker-avatars/` 并通过 `joinBasePath` 引用，build 后 `dist/poker-avatars/` 同步落地；(5) Hero 区新增 `#avatar-guide` 锚点 CTA。
- 原因：用户反馈左右空间感要跟之前一样（指 brand-guide 推荐的居中内容岛节奏），并要求把 poker.edentan.site 的 avatar guide 内容与照片放进 `/poker` 独立页面。
- 影响：`/poker` 中心区域更窄、左右留白更明显，桌面端 hero / section 居中收敛在 ~980px；新增 Avatar Guide 完整呈现 9 张角色卡（双语 code、phrase、tags、人物 intro），让作品集页能讲清楚牌桌不只是引擎，也包含玩家叙事。`npm run build` 通过（566.25 kB / gzip 182.64 kB），CSS 118.17 kB。
- 验证：本地 `npm run dev` 后访问 `http://localhost:4180/poker`，左右留白明显收紧；Hero CTA「看角色卡 / View avatar guide」滚动到 `#avatar-guide`；9 张卡片头像由 `/poker-avatars/{id}.png` 加载；中英文切换正常。
- 后续：若 poker 项目后续新增更多 preset（>9）或角色叙事调整，需要在 `pokerAvatarGuide` 与 `public/poker-avatars/` 同步追加。

### 2026-06-04 20:45

- 类型：代码 / 内容 / 前台 / Friday Poker Club product page
- 改动：(1) 将 `App.tsx` `aiProjectSystems` 里 Friday Poker Club 的 external 从旧的 `https://pokerpowercard--poker-power-card-3abea.asia-southeast1.hosted.app/` 改为 `https://poker.edentan.site/`；(2) 新增 `/poker` 独立产品页 `PokerFullPage`，复用 `etreport-page` 视觉系统并叠加 `poker-page` hook；内容按 `/Users/MacBookPro/Documents/GitHub/poker-power-card/log.md` 的现况整理（hero、Engine/Tables/Stakes/Social console、value props、Modules: Classic Hold’em / Solo BOT / Public T / Stakes-aware buy-in / 8/9 mini game / Lobby+invites、Skill proof、Audience、FAQ、最终 CTA）；(3) Projects 页面 Friday Poker Club 卡片新增「看产品页」入口；(4) 同步 `seo.ts`、`seo-routes.ts`、`vite.config.ts` 加入 `/poker` 路由与 sitemap 项。
- 原因：用户要求把旧 hosted.app 链接换成 poker.edentan.site，并按 poker-power-card 的 log + 本仓库 brand book 规则为它开一个独立页面。
- 影响：portfolio 现在有 Friday Poker Club 的独立叙事页，能展示实时架构、隐私感数据模型、游戏 UX 与房主控制等能力，而不只是一个 external link；`npm run build` 通过（554.68 kB / gzip 177.68 kB）。
- 验证：本地 `npm run dev` 后访问 `http://localhost:4180/poker`（中英文切换、CTA 跳向 `poker.edentan.site`、`/projects` 中 Friday Poker Club 卡片新增「看产品页」按钮）。
- 后续：若 poker 项目后续上 invite link demo 或截图，可在 Modules 区追加 visual proof。

### 2026-06-04 19:05

- 类型：代码 / 前台 / ETReportHub Sales ROI cards
- 改动：将 `/etreporthub-sales` ROI 区块 `.etreport-roi-card` 的金额字号从 `clamp(2rem, 4vw, 3.2rem)`（跟屏幕宽走）改为 `clamp(1.5rem, 16cqi, 4rem)`（跟自身 box 宽走）；同时为 `.etreport-roi-card` 加 `container-type: inline-size` 启用 container queries，并加 `-0.02em` 字距。
- 原因：用户反馈 RM1,625 / RM2,725 等金额字号超出白色卡片框，导致视觉溢出；vw 单位无法响应 4 栏分配后单卡的实际宽度。
- 影响：金额永远按卡片宽度的固定比例缩放，不再溢出；不同屏幕上「字 / box」比例一致；最后一张跨 2 栏的卡因 box 更宽自然显得更大，但仍受 4rem 上限约束。
- 后续：若 hero 区 `etreport-sales-price-strip` 或 `etreport-sales-proof-card` 出现同类溢出，可用同样的 cqi 方案统一处理。

### 2026-06-04 18:28

- 类型：代码 / 内容 / 前台 / ETReportHub product page
- 改动：新增 `/etreporthub` 独立产品页，定位为 iGaming Daily Report OS；页面包含产品承诺、输入/存储/视图/输出 console、价值卖点、模块说明、Eden skills proof、适合对象、FAQ 与回到 Projects/Home 的 CTA；Projects 页面里的 ETReportHub 卡片新增产品页入口；同步 `seo.ts`、`seo-routes.ts`、`vite.config.ts` 和 `README.md`。
- 原因：用户要求为 ETReportHub 生成一个页面，重点是卖产品，并让别人知道 Eden 的 skills。
- 影响：ETReportHub 从 `/projects` 中的项目卡升级为独立产品叙事页，能向潜在客户说明它解决什么运营问题，也能展示数据架构、产品思考、运营 UX 与性能工程能力。
- 后续：若有真实 dashboard 截图、demo link 或定价/合作方式，可继续补成更完整的销售页。

### 2026-06-04 18:19

- 类型：代码 / 内容 / 前台 / Projects page
- 改动：新增 `/projects` 页面，参考 Apple One 的页面结构逻辑设计为 AI Build Systems hub；展示 Jiju.pet、Friday Poker Club、ETReportHub、CRM Intelligence System；从 `/Users/MacBookPro/Documents/GitHub/Daily Report/log.md` 读取 ETReportHub 的真实构建内容并转译为项目说明；首页 Systems 区块新增 Projects Hub 入口；同步 `seo.ts`、`seo-routes.ts`、`vite.config.ts` sitemap 路径和 `README.md`。
- 原因：用户要求新增 Projects 页面，展示 AI project、Jiju、Friday Poker Club、ETReportHub 与正在构建的 CRM，并询问是否能看出 ETReportHub 在构建什么。
- 影响：站点新增当前项目总入口，legacy archive 继续保留在 `/previous-projects`；ETReportHub 被定位为 iGaming aggregator 的日报数据系统，而不是普通 dashboard UI。
- 后续：如果 ETReportHub 或 CRM 有正式截图/链接，可补进 Projects 页面作为产品视觉证明。

### 2026-06-04 18:10

- 类型：代码 / 前台 / Film Gallery image sizing
- 改动：调整 `/analog-tech` Film Gallery 图片显示方式，移除 hero 图与图库图的固定比例、`object-cover`、hover scale / filter；图库改为 column layout，让图片按原始比例缩放展示，不再裁切中间内容。
- 原因：用户反馈 Film Gallery 里的图片被 CSS crop，要求跟随原本图片 size / ratio。
- 影响：Film Gallery 现在保留每张图的原始构图比例，图片高度随原图变化，减少被裁掉主体的情况。
- 后续：如果想控制排列节奏，应优先调整图片顺序，而不是用 CSS 裁切图片。

### 2026-06-04 18:07

- 类型：代码 / 内容 / 前台 / Home Interests and Film Gallery
- 改动：从首页 Interests section 移除 Brand Guide 入口；将 `/analog-tech` 重设计为 Film Gallery editorial 页面，采用大标题、短说明、大图首屏与无说明图片网格；移除该页每张图片的前台描述文字；同步更新 `seo.ts`、`seo-routes.ts` 与 `README.md` 路由说明。
- 原因：用户要求 Interests section 不再出现 Brand Guide，并要求 Film Gallery 去掉图片描述、按新的 Brand Guide 视觉逻辑重新设计。
- 影响：主页 Interests 更聚焦个人兴趣入口；Film Gallery 更像安静的视觉档案页，图片自己承担阅读重心，减少说明文字干扰。
- 后续：如果要进一步强化 Film Gallery，可按胶片色调或场景类型重新排序图片，而不是增加文字说明。

### 2026-06-04 17:59

- 类型：代码 / 内容 / 前台 / Home redesign
- 改动：根据 Apple editorial layout 与 Eden brand crossover 重设计 `/` 首页：首屏改为 Eden Tan + `I build systems from chaos.` + 读者问题导向；新增混乱场景、可交付系统、Jiju.pet 当前构建、Systems not claims、Work with me、Interests 等产品页式章节；同步新增 `home-editorial-*` 专用 CSS。
- 原因：用户要求试试看重新设计 Home，并延续 `/brand-guide` 中 Apple clarity × Eden system archive 的品牌方向。
- 影响：首页从传统 CV / portfolio 叙事转成更像个人品牌操作系统的入口，读者更快知道 Eden 能帮什么忙、当前在构建什么、可以从哪些系统文件继续看。
- 后续：如果要继续收紧，可再为 Home 增加真实 Jiju.pet 截图或独立 generated hero visual，强化当前构建的产品感。

### 2026-06-04 17:44

- 类型：代码 / 内容 / 前台 / Brand Guide
- 改动：将 `/brand-guide` 从旧的品牌与组件说明页重写为「Eden Tan 品牌操作系统」：新增 Apple-like editorial hero、设计原则、视觉系统、字体节奏、文案语气与页面应用规则；同步新增 Brand Guide 专用 CSS、更新 `seo.ts`、`seo-routes.ts` 与 `README.md` 路由说明。
- 原因：用户要求把 Apple design 的排版逻辑与现有 brand guide 合在一起，重新写一版更适合 Eden 个人品牌的 Brand Guide。
- 影响：Brand Guide 现在更像可对外展示的品牌操作指南，不只是组件文档；页面以大标题、短说明、留白、少量 CTA 和清楚章节来表达品牌系统。
- 后续：如果要继续强化，可为 `/brand-guide` 增加真实页面截图或组件实例，但需要避免变回密集组件库。

### 2026-06-03 00:58

- 类型：资源 / 角色图
- 改动：新增 `public/life-os-character/wandering-strategist-cat-source.png` 与透明版 `public/life-os-character/wandering-strategist-cat.png`，角色定位为 Wandering Strategist / 流浪策略师，视觉元素围绕 Wind + Metal、混沌洞察型、猫主角与策略系统感展开。
- 原因：用户要求根据角色 Loadout 生成同风格 1:2 透明背景 PNG 角色资产。
- 影响：后续可直接将透明版接入 `/life-os` 或其他角色档案页面；source 版本保留为色键移除前的生成底图，便于必要时重新处理边缘。
- 后续：如要正式上页，可再接入前端并按页面布局微调尺寸、位置与响应式表现。

### 2026-06-02 21:04

- 类型：代码 / 内容 / UI
- 改动：按用户的 RPG 能力介绍页面规划收敛 `/life-os`：Power Score 改为 86/100、等级改为 30、主属性压到 8 个；新增 Ability Categories 区块与「能力分数 = 基础分 + 重复信号加权 + 现实校准 - 冲突修正」公式说明，并加入自由探索欲与稳定执行两个转换示例。
- 原因：用户要求页面更像 MVP 版 RPG 角色页，重点让访客 30 秒内看懂角色定位、强项、弱点、升级路线和系统趣味。
- 影响：页面结构更聚焦，主属性不再过多；数值逻辑更清楚，弱点与升级建议更像游戏系统而非自我描述。
- 后续：如继续完善，可再补雷达图或 Figma 级视觉原型。

### 2026-06-02 20:58

- 类型：代码 / 内容 / UI
- 改动：将 `/life-os` 从个人操作系统研究页升级为《人生 RPG 能力系统》角色档案页；新增角色身份、总战力、核心属性条、主动技能、被动技能、Debuff 阴影系统、成长路线 Skill Tree、资料来源、数值转换逻辑与免责声明；同步首页 Interests 文案、`seo.ts`、`seo-routes.ts` 与 `README.md`。
- 原因：用户提供完整世界观，要求将 Life OS 呈现为 Mystic Tech RPG Interface，而不是传统命理、履历或心理测验页面。
- 影响：`/life-os` 现在可作为「觉 / Eden」的人生 RPG 角色页面，视觉与文案更接近黑暗幻想 + 数据 HUD + 哲学型游戏 UI。
- 后续：如要继续产品化，可增加雷达图、角色头像资产、交互式 Skill Tree、生成他人角色卡的输入流程。

### 2026-06-02 20:48

- 类型：代码 / 内容 / SEO
- 改动：新增 `/life-os` 路由与 `LifeOsFullPage` 页面，内容定位为 Life OS 个人操作系统研究；在首页 Interests 区块新增 Life OS 入口；同步 `seo.ts`、`seo-routes.ts`、`vite.config.ts` sitemap 路径与 `README.md` 路由说明。
- 原因：用户要求在 Interests 里加入 Life OS 页面，不只保留原本 Life 视频页。
- 影响：访客可从首页 Interests 进入 Life OS，查看日记到洞察、精力预算、关系边界、环境设计、决策复盘与 AI 第二大脑等模块；生产 sitemap 会包含 `/life-os`。
- 后续：如后续有真实 Life OS 笔记，可把该页扩展为索引并接入独立文章详情。

### 2026-05-20 20:15

- 类型：代码 / 资源
- 改动：新增 `public/daniel-tan-cv.pdf`，并将主页导航中的 Resume/简历按钮从旧 Google Drive 下载链接改为站内 PDF 下载链接。
- 原因：用户要求将站点 CV 替换为 `/Users/MacBookPro/Downloads/aDaniel Tan .pdf`。
- 影响：访问主页点击 Resume/简历会下载新的 `Daniel Tan CV.pdf`；构建后该 PDF 会随静态资源发布。
- 后续：若 CV 文件名或展示方式需要改成在线预览，可再调整按钮行为。

### 2026-05-20 20:18

- 类型：代码 / 资源
- 改动：将主页 Resume/简历按钮改为新的 Google Drive 文件链接 `https://drive.google.com/file/d/1d6ZezQahB921ayMbVBhdAeUXNxSqc9ja/view?usp=drive_link`，并移除上一版临时本地 PDF 资源。
- 原因：用户提供新的 Drive CV 链接，要求替换为该文件。
- 影响：访问主页点击 Resume/简历会在新窗口打开新的 Google Drive CV 文件。
- 后续：如需恢复直接下载行为，可改为 Drive `uc?export=download` 链接。

### 2026-05-20 20:22

- 类型：代码 / 链接
- 改动：将 Resume/简历按钮从 Google Drive 预览链接改为 `uc?export=download` 直下载链接。
- 原因：用户希望保持之前“一键下载”的行为。
- 影响：点击 Resume/简历会直接触发新版 CV 下载，而不是先打开 Drive 预览页。
- 后续：无。

### 2026-05-20 20:42

- 类型：代码 / 链接
- 改动：将 Resume/简历按钮更新为 Google Drive 文件 `1PRXj4BwpeAX_7F9H2PJumG0slIEZmLZ0` 的 `uc?export=download` 直下载链接。
- 原因：用户提供新的 CV Drive 链接，并要求保持一键下载。
- 影响：点击 Resume/简历会直接下载最新 CV 文件。
- 后续：确认 Drive 文件权限为「Anyone with the link can view」，避免访客遇到权限页。

### 2026-05-02 (里程碑：Jiju 创始人日期格式)

- 类型：内容 / 作品集
- 改动：`App.tsx`「Founder, Jiju.pet」副标题由 `2025–present` / `2025–至今` 改为与 HarvardX / PADI 同源格式 **`Jiju.pet · January 2026`**（英）/ **`Jiju.pet · 2026年1月`**（中）。

### 2026-05-06 22:18

- 类型：文档
- 改动：新增 `jiju-intro.md` 作为 Jiju 最短版介绍页（定位、区域、用户价值、系统特点）；在 `homie.md` 顶部补充短版入口说明。
- 原因：用户要求“多一个 page”用于 Jiju 基本详情，且字数尽量少。
- 影响：仓库内现有长版（`homie.md`）与短版（`jiju-intro.md`）双版本说明，便于按场景快速复用。
- 后续：若需要对外发布到站点路由，可再把该短版接入前端页面。

### 2026-05-02 (主页：移除 Jam 里程碑；Poker Power Card → Friday Poker Club)

- 类型：内容 / 作品集
- 改动：`App.tsx` 移除「Jam 2026」里程碑条目；Active Build 中 **Poker Power Card** 更名为 **Friday Poker Club**，重写中英简介（Realtime 德州大厅、邀请、可选语音等，不再描述 Hero/Magic/Trap 力量牌）；`activeBuildSkillSets.poker` 技能标签改为与当前产品更贴近（Hold’em lobby、语音信令等）。
- 原因：用户要求去掉 Jam 条目、统一产品对外名称并更新叙事。

### 2026-05-01 (主页里程碑：Jam 2026 + Jiju 创始人)

- 类型：内容 / 作品集
- 改动：`App.tsx`「Milestones that still matter」时间线顶部新增 **Jam 2026** 与 **Founder, Jiju.pet / Jiju.pet 创始人**（中英说明，Jiju 外链 `https://jiju.pet`）。
- 原因：用户要求在里程碑区体现 Jiju  founder 身份与 2026 Jam 参与/产出。
- 影响：主页向下滚动至此区块即可看到两段新条目；若 Jam 的官方名称或具体月份需写死，可再替换副标题一行。

### 2026-05-01 15:43

- 类型：链接修正
- 改动：将 `App.tsx` 中主页 `Poker Power Card` 外链从 `https://poker-power-card-3abea.web.app/` 更新为 `https://pokerpowercard--poker-power-card-3abea.asia-southeast1.hosted.app/`。
- 原因：用户提供了新的正式访问地址，需要替换旧的 Firebase Hosting 链接。
- 影响：主页点击 `Poker Power Card` 外链时会跳转到新地址。
- 后续：如站内还有其他旧分享物料或文档引用同一旧域名，后续可一并清查替换。

### 2026-04-24 (主页 Poker Power Card 链接更新)

- 类型：链接修正
- 改动：`App.tsx` 中 Poker Power Card 外链从 `https://poker.edentan.site/` 更新为 `https://poker-power-card-3abea.web.app/`。

### 2026-04-24 (mnm11：文案强调「同批 + 合规 + 1+1 用满」)

- 类型：静态页面 / 文案
- 改动：`public/mnm11.html` 页眉副标题与「给代理」两段说明改为：同一波递单/同批、在条款与空位下合规、最大化 1+1 Bonus Key 优惠与可挂供应商数，并点出隐藏不合规/不配位选项的目的。

### 2026-04-24 (mnm11：页眉 +「给代理」叙事块)

- 类型：静态页面 / 文案
- 改动：`public/mnm11.html` 页眉副标题改为代理场景一句；`header` 与主内容之间新增 `agent-blurb`（中英 `i18n` 两段 + eyebrow「For agents / 给代理」），说明：递单前排清 key 与排名位、整组可落位、在名额内尽量多商、与槽位不匹配的名单先隐藏。配套样式与品牌字体一致。

### 2026-04-24 (mnm11：移除底栏「前往申请」)

- 类型：静态页面
- 改动：`public/mnm11.html` 删除固定底栏 CTA 与 `selCount` 引用；`main.wrap` 底部内边距改回与顶栏无额外为底栏留位。

### 2026-04-24 (mnm11：删两句说明 + 收短页眉/已用空状态)

- 类型：静态页面 / 文案
- 改动：`public/mnm11.html` 移除「My picks」下整段 `combo-hint` 与动态 `selNote`（及对应 JS/CSS）。页眉副标题与「已申请过」空状态改为更短、少比喻句；`renderChips` 不再写入选中说明。

### 2026-04-24 (mnm11：品牌字体与全页文案、字号)

- 类型：静态页面 / 品牌与可访问性
- 改动：`public/mnm11.html` 接入与主站 `brand-guide` 一致的 **Inter**（正文 + 中文用 **Noto Sans SC** 降级）、**Space Grotesk**（标题与主要标签）；增加 `--font-sans` / `--font-display`、正文字号阶梯（`~15px` 手机 / `16px` 桌面）、`antialiased`、胶囊与说明文字对比微调。全页中英双语文案重写成“帮用户用满 key/权益、步骤更短、少行话”：页眉、我的选择/提示、可选项/全部供应商/已申请过/底栏 CTA、空状态与 `renderCaps`（中英）、`selNote`、已用/芯片按钮说明与「移回」等。`i18n` 时同步 `document.title` 与 `html[lang]`。
- 原因：用户要求更易懂、以收益为中心，并按品牌指南统一字体与尺寸层级。

### 2026-04-24 (mnm11：Provider pool 手机一排 6 个)

- 类型：静态页面 / 响应式 UI
- 改动：`#grid` 增加 `grid--pool`；`max-width:1023px` 时 `grid-template-columns: repeat(6, minmax(0,1fr))`、窄间距；手机端卡片收 padding、藏 `.tnc`、缩小 emoji/名称/角标/按钮；`Mark used` 在窄屏改为短字「Use / 用」并 `title`/`aria-label` 保留全句。`min-width:1024px` 仍 `auto-fill` 较大卡片。`resize` 防抖 `renderAll` 以横竖屏切换时刷新按钮文案。`card:hover` 动效在窄屏对 pool 关闭。
- 原因：用户要求手机端 Provider pool 再缩小，一排显示 6 个供应商。

### 2026-04-24 (mnm11：单屏搭配 + 去 sticky 顶栏 + Current picks 横滑)

- 类型：静态页面 / 布局与交互
- 改动：`public/mnm11.html` 顶栏改为非 `sticky`、压缩高度（标题+副标题+语言）；主区首块为 `workspace-hero`：**左**手机槽位预览、**右**「Current picks」工具条（额度 `pill` 移入此处）+ 横向滚动已选 pill + 空状态提示 + 说明；其下紧接供应商池与已用区，单页完成「看槽位 / 看已选 / 点供应商」。移除原 `aside` 双列 sticky 结构；`renderChips` 使用 `chip--rail` 与 `chipsEmpty` 显隐。
- 原因：用户要求同屏可见可点、去掉吸顶顶栏占高、重做 Your Campaign Combo。
- 影响：仅 MNM 页布局与 DOM；逻辑不变。

### 2026-04-24 (mnm11：小屏更紧凑、预览区缩小)

- 类型：静态页面 / 响应式 UI
- 改动：`public/mnm11.html` 在 `max-width:1023px` 下将「Phone & combo」列限制为 `min(19.5rem, 92vw)` 居中，缩小手机框圆角/内边距/刘海；`.screen` 降高（约 `max-height: min(36vh,260px)`，可轻滚动），槽位与 banner 用更小尺寸与间距；`Your Campaign` 的 chips/按钮在侧栏内收紧；全页略减顶栏字级与副标题行数、供应卡片区在极窄（≤380px）单列、底栏 CTA 在窄屏略收；`1024px+` 仍恢复大屏预览与卡片区原尺度。
- 原因：用户反馈需更强响应式，并缩小「Phone layout & your combo」占用。
- 影响：仅样式与块级间距；业务逻辑未改。

### 2026-04-24 (mnm11 布局：移动端友好 + 留白与分区)

- 类型：静态页面 / UI
- 改动：`public/mnm11.html` 重构版式与样式：粘性顶栏、`clamp` 间距与响应式字号；`lg+` 双栏（预览/组合 + 供应与已用）且预览侧 `sticky`；各区增加 eyebrow、标题、说明文案；供应网格窄屏两列、卡片与 CTA 加大可点区域；底栏 CTA 加 `safe-area`；站内链接统一相对 `index.html`；语言按钮 `aria-pressed`。
- 原因：用户要求更移动友好、更多留白与层次。
- 影响：仅 MNM 页；逻辑未变。
- 后续：可再为「Provider pool」加折叠长列表（可选）。

### 2026-04-24 (MNM mnm11：无资格供应商隐藏)

- 类型：静态页面 / 交互
- 改动：`public/mnm11.html` 将 `HIDE_INELIGIBLE` 设为 `true`。当前选择组合下无可用排名位置的供应商不再以灰态+整卡不可选展示，而是不出现在 Provider Grid；已选中的仍显示以便取消。
- 原因：用户期望「无资格」即隐藏，而非显示为无法点击。
- 影响：仅网格列表；`Mark used` 仅对仍显示的卡片可用。若需对当前被隐藏的商家标记已使用，需先调整已选或另做入口（见后续）。
- 后续：如需在隐藏模式下仍能标记已使用，可加小型搜索或「显示全部（仅标已用）」折叠区。

### 2026-04-24 (Promotion Page：浮动「本月最佳游戏」与返回主页、Check now 去 localhost化)

- 类型：内容 / 链接
- 改动：`public/Promotion Page.html` 中 `replaceFloatingIcons` 的 Best Game 按钮由 `http://localhost:4180/` 改为 `index.html`；`Check now` 与脚本内 mnm 目标统一为相对路径 `mnm11.html`；`Back to Home` 为 `index.html`。
- 原因：用户要求不指向本地 dev URL，在任意环境回到主站与站内 MNM 页。

### 2026-04-24 (mnm11：Claim Combo CTA 改链回主站)

- 类型：内容 / 链接
- 改动：`public/mnm11.html` 顶部 CTA 由 `https://t.me/EdisonTan97` 改为同目录 `index.html`（主站首页），并去掉新窗口打开（站内跳转）。
- 原因：用户要求用主页替代该 Telegram 链接。

### 2026-04-24 (mnm11 / Promotion：移入 public，本地可打开)

- 类型：结构
- 改动：将 `mnm11.html` 与 `Promotion Page.html` 从仓库根目录 `git mv` 至 `public/`，Vite 开发时按静态资源挂在站点根，故 `http://localhost:4180/mnm11.html` 与 `.../Promotion%20Page.html` 可访问；`npm run build` 仍会复制到 `dist/` 根，线上路径不变。
- 原因：Vite 仅对 `index.html` 与 `public/` 提供 dev 下访问，根目录裸 HTML 不会出现在 `:4180`。
- 影响：`App.tsx` 内原有 `/mnm11.html` 等链接仍有效；无需改业务路径。

### 2026-04-24 (部署：自定义域根路径 + 修复 /Eden/ 资源 404)

- 类型：代码 / 部署
- 改动：`vite.config.ts` 在 production 中支持 `VITE_BASE` 覆盖，否则沿用 `/<repo>/`；根据 `base` 在 `closeBundle` 中重写 `dist/404.html` 的 `pathSegmentsToKeep`（0=根域，1=子路径），`public/404.html` 使用占位符 `__PATH_SEGMENTS_TO_KEEP__`。`.github/workflows/deploy-pages.yml` 的 build 步设置 `VITE_BASE=/` 与 `VITE_SITE_URL=https://edentan.site`。README 说明 base 与双 URL 取舍。
- 原因：自定义域 `edentan.site` 上站点在路径根，而此前构建 `base` 为 `/Eden/`，导致线上请求 `/Eden/assets/*.css` 等 404；GitHub 实际产物在 `/assets/`。
- 影响：以 `https://edentan.site` 访问时静态资源与 favicon 正常；`github.io/.../Eden/` 与当前 CI 构建立场不一致，应以自定义域为入口。
- 后续：若需再次支持纯 `github.io/Repo` 无自定义域，可去掉 workflow 中 `VITE_BASE` 或改回 `/<repo>/`。

### 2026-04-24 (README / 元数据：定稿「当前这版」说明)

- 类型：文档
- 改动：重写 `README.md`：线上地址（`edentan.site`、GitHub Pages）、定位、技术栈、路由、部署/GA/SEO/SPA 行为、与 `AGENTS`/`log` 的维护约定。更新 `metadata.json` 的 name/description；`package.json` 更名为 `eden-portfolio`、version `1.0.0`、补 description。
- 原因：用户认可当前产品形态，要求把读我与仓库元信息对齐真实上线状态。
- 影响：新协作者可更快理解站点边界；`npm` 包名与版本更语义化，非强制对外发布。
- 后续：若主域名或 GA ID 再变，只须同步 `README` 与 `index.html` 中对应片段。

### 2026-04-24 (主页：8G 仅从「手上还在长」移除)

- 类型：代码
- 改动：删除「What I am building now」中的 8G 整卡与 `activeBuildSkillSets.eightG`；兴趣区「玄学与命理」链到 8G 的展示保留。
- 原因：用户希望 8G 只出现在 Interests，不出现在进行中的项目。

### 2026-04-24 (主页：8G 链接与「手上还在长」条目)

- 类型：代码 / 文案
- 改动：兴趣区「玄学与命理」标题链到 `https://edent95.github.io/8g/`（与 Analog Tech 同交互），简介补一句指向 8G；「What I am building now」在 Poker 与营销职务之间新增 **8G** 卡：进行中态、中英说明、`activeBuildSkillSets.eightG` 技能行、外链按钮；`lucide` 仍只复用 `ExternalLink`。
- 原因：用户要求把 8G 同时放进兴趣与手上项目，并与其他条目版式一致。
- 影响：仅主页相关区块。

### 2026-04-24 (/analog-tech 文案加强)

- 类型：文案 / SEO
- 改动：胶片图库标题区改为两段（主段 + 辅段），阐明创作立场、材质观与 11 张选片逻辑；`analogTechGalleryPhotos` 全部 `alt` / `caption` 改为更具体的中英对位句；`seo.ts` 中 `/analog-tech` 的 meta 描述与页面对齐。
- 原因：用户要求加强内容文本质量。
- 影响：仅 `/analog-tech` 与对应 SEO 描述；版式未改。

### 2026-04-24 (/analog-tech 恢复旧版布局)

- 类型：代码
- 改动：将 `AnalogTechFullPage` 恢复为改版前结构：非 sticky 顶栏、原文案、双列 `h-80` 网格、无灯箱与动效；移除 `X` 图标导入。
- 原因：用户反馈更偏好原先版式。
- 影响：仅 `/analog-tech` 路由表现回退；功能与 SEO 逻辑未改。

### 2026-04-24 (/analog-tech 胶片图库体验优化)

- 类型：代码 / UI
- 改动：`AnalogTechFullPage` 增加 sticky 顶栏、带 mint/amber 光晕的标题区与加长中英导语；首图在 `sm+` 跨两列宽幅比例（`aspect-[21/9]` / `2.4/1`），其余竖幅 `3/4`；图片支持点击灯箱全屏、Esc/背景/按钮关闭、锁 body 滚动；编号 + 说明的 `figcaption`；首图 `eager` + `fetchPriority="high"`，其余 `lazy` 与 `sizes`；`prefers-reduced-motion` 下关闭 hover 放大。
- 原因：用户要求优化 `/analog-tech` 页的阅读与展示体验。
- 影响：仅该路由；`lucide-react` 增加 `X` 图标导入。
- 后续：若需左右键切换上一张/下张，可在灯箱内加键盘导航。

### 2026-04-24 (SEO：专用 OG 图 1200×630)

- 类型：代码 / 资源
- 改动：在 `public/og-image.jpg` 增加品牌向 1200×630 分享图（由生成图经 sips 裁切与转 JPEG，约 62KB）；`seo.ts` 将 `og:image` / `twitter:image` 从 `favicon.svg` 改为该 JPEG，并写入 `og:image:width` / `height` / `type` / `alt` 与 `twitter:image:alt`（中英对照的说明型 alt）；`Person` / `WebSite` JSON-LD 增加 `image`；`vite.config.ts` 的 `og-image-meta` 在构建时把对应绝对或带 `base` 的 `og:image` 写入 `index.html`。
- 原因：落实此前建议，使 Facebook / X / LinkedIn 等链接预览使用标准比例位图而非 SVG。
- 影响：分享卡片展示更稳定；仓库增加一张小体积 JPEG。
- 后续：若改版品牌主视觉，可替换 `public/og-image.jpg` 并保持尺寸 1200×630。

### 2026-04-24 (SEO：meta、sitemap、结构化数据)

- 类型：代码 / 结构
- 改动：新增 `seo.ts`：按路由与语言设置 `title`、`description`、`og:*` / `twitter:*`、`canonical`、根页面 `WebSite`+`Person` JSON-LD；`App` 在 `useEffect` 中调用 `applyPageSeo`；`index.html` 补充无 JS 时的默认 `meta`；`vite.config.ts` 在 production 构建时若存在 `VITE_SITE_URL` 或 `GITHUB_REPOSITORY` 则向 `dist` 写出 `sitemap.xml` 与 `robots.txt`（`SITEMAP_PATHS` 与 `archivedWorks` 路由保持一致，新增 archive slug 时须同步该列表）。
- 原因：用户要求站点对搜索引擎更友好；SPA 需在客户端与静态层同时提供可抓取的元信息与地图。
- 影响：各 URL 的标题/摘要随语言与页面变化；GitHub Actions 生产构建会生成站点地图与 robots；本地 production build 未设环境变量时可能跳过地图生成，可在 `.env.production` 写 `VITE_SITE_URL` 测一遍。
- 后续：若希望分享卡片更醒目，可新增 `og-image.png`（如 1200×630）并在 `seo.ts` 中把 `og:image` 从 `favicon.svg` 改指向该图。

### 2026-04-24 (Jiju 九段卡分区加色与 emoji)

- 类型：代码 / UI
- 改动：在 `/jiju-pet` 九段横滑卡上，为各分区（旁白、背景与判断、规划与执行、结果）增加品牌向浅色渐变底与环状描边；区标题与 When/Why/Thinking/Planning/Problem Solving 行加入对应 emoji；章节序号 badge 用琥珀系渐变；列表圆点改 mint 色小点；主卡加浅 `from-stone-50` 顶区渐变。
- 原因：用户希望分区在有色与表情符号辅助下更易扫读、更有层次。
- 影响：仅九段卡视觉，不改文案与结构逻辑。
- 后续：若对比度在个别显示器偏淡，可略加深分区标题字色或边框 alpha。

### 2026-04-24 (Jiju 九段连载卡片分区与 outline)

- 类型：代码 / UI
- 改动：在 `JijuPetFullPage` 的「从地基，到今天的写法 / From foundation to how I build now」横滑卡片区，将单卡拆为可扫读分区：标题区底部分隔；旁白（Voice）独立圆角框；`When/Why/Thinking` 归入「背景与判断」分区内并 `divide-y`；`Planning` 与 `Problem Solving` 归入「规划与执行」；`Outcome` 独立 mint 描边底。卡片外缘增加轻 `ring` 与 `outline` 以强化轮廓而不抢主内容。
- 原因：用户要求九段卡片区要分区、加一点 outline 提升结构感。
- 影响：仅 `/jiju-pet` 九段卡视觉层次；信息顺序未改。
- 后续：若横滑卡过宽仍显挤，可再调 `md:min-w` 或分区标题字号。

### 2026-04-23 (Jiju.pet 页面文案优化)

- 类型：代码 / 文案 / 前台
- 改动：优化 `/jiju-pet` 内容表达：重写页首引导段、`Knowledge Summary` 说明、`Nine chapters` 阅读提示；并对九阶段卡片的 `why / thinking / outcome` 中英文案做统一润色，强化问题-判断-结果链路与叙事推进感。
- 原因：用户要求优化 Jiju 页面内容可读性与专业表达。
- 影响：`/jiju-pet` 阅读路径更清晰，信息密度保持不减但更易读。
- 后续：如需更偏“投资人版本”或“招聘版本”，可再出两套语气模板切换。

### 2026-04-23 (Interests 区块移除旧图标)

- 类型：代码 / UI
- 改动：`Interests` 区块中移除旧的 `Brain`、`Camera`、`Compass` 图标，仅保留扁平 emoji；同步清理对应 `lucide-react` import。
- 原因：用户要求既然已有 emoji，就不再重复显示旧图标。
- 影响：兴趣区视觉更简洁一致，图标语言统一为 emoji。
- 后续：如需进一步统一，可把其他 section 的重复 icon 也按同规则清理。

### 2026-04-23 (skills 区分 hard/soft 文字色)

- 类型：代码 / UI / 文案结构
- 改动：`What I am building now` 的 skills 数据升级为带 `kind` 的结构（`hard`/`soft`），并在标签渲染时按类型上色：hard 保持 stone 文本，soft 使用 teal 文本。
- 原因：用户希望 hard skills 与 soft skills 在视觉上可直接区分。
- 影响：同一区块信息层次更清晰，读者可快速识别技能属性。
- 后续：如需更强对比，可再加小图例（Hard / Soft）或不同边框样式。

### 2026-04-23 (What I am building now 补充 soft skills)

- 类型：代码 / 文案 / UI
- 改动：在首页 `What I am building now` 的三组 skills（Jiju / Poker / Marketing）中补充软技能标签，并保持中英双语同步；保留原有 hard skills 不删减。
- 原因：用户希望该区块不只展示硬技能，也能体现协作与判断等软实力。
- 影响：该 section 的技能标签表达更完整，个人能力画像更平衡。
- 后续：如需更偏招聘导向，可按目标岗位再细分 Leadership / Communication / Problem-solving 子类。

### 2026-04-23 (移除社交按钮)

- 类型：代码 / UI
- 改动：从首页 Hero 社交按钮与底部 Connect 区块中移除 Instagram 与 YouTube，仅保留 LinkedIn；同步删除未使用图标导入。
- 原因：按用户要求下线 Instagram 和 YouTube 社交入口。
- 影响：站内不再展示上述两个社交按钮。
- 后续：如需替换为 Email/WhatsApp，可在同位置补充。

### 2026-04-23 (Life 页内嵌播放)

- 类型：代码 / 前台 / Life 页面
- 改动：`lifeVideos` 新增 `embedSrc`（YouTube embed URL）；`LifeFullPage` 将原「缩略图 + 外链播放」卡片改为站内内嵌 `iframe` 播放器，保留右上角 `Open on YouTube` 外链按钮。
- 原因：用户要求 Life 页面可直接在站内播放视频。
- 影响：`/life` 访问路径无需跳出即可播放。
- 后续：如需首屏性能优化，可加“点击后再加载 iframe”的 lazy-mount 方案。

### 2026-04-23 (Promotion follow-up: 流程卡去暗色 + Best Game 回首页)

- 类型：样式 / 交互
- 改动：在 `EDEN_PROMO_FINAL_PATCH` 中补充流程卡覆盖：`How to apply for Free PT and GGR discount` 相关 `pt-step-card/step-box` 改为浅底中性色，步骤数字块与遗留 inline 黄绿文字统一重置为 brand stone。并将浮动 `Best game of the month` 图标点击行为改为跳转主页 `http://localhost:4180/`。
- 原因：用户反馈流程区仍有深色和彩色残留，且 Best Game 需回首页。
- 影响：Promotion 页面视觉进一步与 brand guide 对齐；Best Game 入口语义更符合站内导航。
- 后续：上线环境建议将主页链接改相对路径 `/`。

### 2026-04-23 (Promotion 最终清理：去 MM banner、emoji 居中、品牌色重置、浮动图标替换)

- 类型：样式 / 静态页面
- 改动：`Promotion Page.html` 追加 `EDEN_PROMO_FINAL_PATCH`：移除 MM promo banner 区块（含失效媒体展示）；provider emoji 徽章增加上边距并保持居中；重置页面遗留黄/绿强调为品牌 stone 语气；`Check now/立即查看` 统一指向 `http://localhost:4180/mnm11.html`；浮动入口 `Best Game of the Month` 与 `Top 3 Providers of the Month` 图标缺失时改为可用 emoji（🎮 / 👑）。
- 原因：用户反馈 banner 无效、emoji 位置偏上、仍有非品牌色、浮动图标缺失。
- 影响：Promotion 页面视觉与 brand guide 一致性提升，入口可用性恢复。
- 后续：若上线环境不是 localhost，建议将 `Check now` 链接改回相对路径 `/mnm11.html`。

### 2026-04-23 (Promotion 细调：emoji 居中 + 去黄 + Check Now 指向本地 MNM)

- 类型：样式 / 静态页面
- 改动：`Promotion Page.html` 新增 `EDEN_BRAND_EMOJI_REFINEMENT`：将 `.logo-cell` 强制改为纵向居中，确保 provider emoji 徽章在卡片中间；覆盖遗留黄/绿强调色（含 `details summary` 与部分标题/强调）为 brand stone 色。移除 MM promo video banner（删除 `video` 节点），并将两个 `Check Now / 立即查看` 按钮统一指向 `http://localhost:4180/mnm11.html`。
- 原因：用户反馈 emoji 未居中、页面仍有黄色标题且 MM promo banner 不工作。
- 影响：Promotion 页面视觉更贴近 brand guide；MNM 引导可用。
- 后续：上线前若不希望硬编码 localhost，可改回相对路径 `/mnm11.html`。

### 2026-04-23 (Promotion 页面品牌化 + emoji logo)

- 类型：样式 / 静态页面
- 改动：在 `Promotion Page.html` 追加 `EDEN_BRAND_EMOJI_PATCH`：以主站 brand guide 为准覆盖主题（stone 基调 + mint/amber 点缀），并将 `.logo-cell` 与 `.provider-card` 的 provider logo 统一替换为差异化 emoji 徽章（按 provider 名稳定映射）。
- 原因：用户要求该页面跟随个人站品牌线，并把 provider logo 改为 emoji。
- 影响：视觉语气与主站一致；不依赖外链 logo 可用性。
- 后续：如需给特定 provider 指定固定 emoji，可加手工映射表覆盖自动算法。

### 2026-04-23 (MNM 对齐品牌风格 + 展示区上移)

- 类型：样式 / 静态页面
- 改动：`mnm11.html` 视觉从深色工具页改为与主站品牌一致的 stone 基调（mint/amber 点缀、浅色卡片、浅边框、语言按钮与状态 pill 同站点语气）；新增说明副标题。将“展示区”（手机预览 + Your Campaign Combo）移动到页面上方，Provider Grid 与 Used Providers 放到其下方。
- 原因：用户要求该页面跟随个人站 brand guide，并把 show 区域放上面。
- 影响：仅 `mnm11.html` 布局与配色；功能逻辑不变。
- 后续：如需再完全复刻主站字体层级（Space Grotesk 标题）可继续微调。

### 2026-04-23 (Titan links prune + emoji logos)

- 类型：代码 / 内容入口 / 静态页面
- 改动：移除 Titan 条目中的 `1+1 Bonus Key Combo Builder` 链接；将 `MNM Tool` 重命名为 `Mix & Match 1+1 Bonus key`。`mnm11.html` 的 provider 视觉从 logo 改为按供应商名生成的差异化 emoji（卡片、已选、手机位、已使用列表）；`Promotion Page.html` 同样将 `.logo-cell` 与 `.provider-card` 的 logo 统一替换为差异化 emoji 徽章。
- 原因：用户要求删除 1+1 builder 页面入口、重命名 MNM，并把 provider logo 换成不同 emoji。
- 影响：Titan 入口更聚焦；两页不再依赖外链 logo 可用性。
- 后续：若要指定每家供应商固定 emoji，可再加手工映射表。

### 2026-04-23 (Titan 工具页接入 + logo fallback)

- 类型：代码 / 内容入口 / 静态页面
- 改动：在 `Promotion & Account Manager at Titan Group` 的相关链接新增 `MNM Tool (Mix & Match 1+1)` 与 `Promotion Page (Campaign Board)`，分别指向 `/mnm11.html` 与 `/Promotion%20Page.html`；`mnm11.html` 增加 provider logo 失败回退（含卡片、已选 chips、手机预览、已使用列表）；`Promotion Page.html` 增加全局图片 onerror 回退，缺失 logo 自动替换为占位 logo。
- 原因：用户要求把两个页面挂入 Titan 经验模块，并处理页面内缺失 logo 可用性。
- 影响：`/previous-projects` 中 Titan 条目可直接进入两个工具页；logo 加载失败不再出现破图。
- 后续：若后续拿到官方 logo，可直接替换原 URL，回退机制仍保留。

### 2026-04-23 (1+1 Combo Builder 归档叙事)

- 类型：内容 / `archivedWorks`
- 改动：`11-bonus-key-combo-builder` 的 `title`、`origin`、`summary` 与三节正文重写：先写表格/群聊拼组合的审计痛点与重复申领、置顶风险，再写界面如何把「已用」「置顶槽位」「占用数」固化成规则，最后写合作方行即条款语境并保留完整合作方名单。
- 原因：用户要求与 Soccerking 归档同一套叙事逻辑优化该页。
- 影响：仅 `/archive/11-bonus-key-combo-builder`。
- 后续：无。

### 2026-04-23 (Soccerking 归档叙事)

- 类型：内容 / `archivedWorks`
- 改动：`soccerking-project` 的 `title`、`origin`、`summary`、三节正文与图库 `caption`（P1–P5）重写：先写赛后窗口与分工痛点，再写三种帖型的「要解决的题」，最后写排期/模板/洞察与付费闭环关系；语气对齐站点叙事习惯。
- 原因：用户认为该归档页内容偏弱，要求按既有逻辑优化。
- 影响：仅 `/archive/soccerking-project` 与历史项目卡片外链目标页文案。
- 后续：若截图与 caption 语义不完全一致，可按实图微调 caption。

### 2026-04-23 (主页引用还原)

- 类型：代码 / 前台 / 文案
- 改动：主页 Hero 区 `blockquote` 恢复为原先乔布斯名言（中英），并恢复 `border-stone-300` 与无 emoji 的简洁结构。
- 原因：用户要求引用用回之前的版本。
- 影响：仅主页该区块。
- 后续：无。

### 2026-04-23 (Eden 双色 accent)

- 类型：样式 / 前台 / 品牌文档
- 改动：在 `index.css` 的 `@theme` 注册 `--color-eden-mint: #7bdcb5`、`--color-eden-amber: #ffa340ed`；全站划选、`flat-emoji` 边框与悬停阴影、主页顶栏底边、Hero 地区胶囊、引用竖线、社交悬停、进行中/年限标签、侧栏 Connect、简历与 Jiju 外链按钮焦点环、技能 chip 悬停、Jiju 旁白竖线、语言切换选中态等接入两色；`brand-guide` 增加「品牌强调色」色板与组件说明文案。
- 原因：用户提供两枚色值并要求写入品牌页与站内界面。
- 影响：视觉更「有品牌」，仍以 stone 为底；`prefers-reduced-motion` 下 emoji 动效行为不变。
- 后续：若琥珀色在浅底对比需微调，可改为 `eden-amber` 纯色 + opacity 工具类。

### 2026-04-23 (brand guide 页面 + footer)

- 类型：代码 / 前台 / 路由
- 改动：新增 `BrandGuideFullPage`（`/brand-guide`），中英双语，涵盖品牌内核、色板、字体、标志、favicon、版式、组件示例、语气、动效与 a11y；数据 `brandGuidePalette`。主页 `footer` 增加「品牌指南 / Brand guide」链接（`brandGuideHref`）。
- 原因：用户希望按当前站点风格提供可分享的 brand guild 页并从页脚进入。
- 影响：新路由；footer 多一行链接。
- 后续：若需导出 PDF 或单独 `/brand` 短链，可再议。

### 2026-04-23 (flat emoji + CSS 动效)

- 类型：代码 / 样式 / 前台
- 改动：`index.css` 增加 `.flat-emoji`、`.emoji-bob`、`.emoji-tilt`、`.chapter-voice-enter` 及 `prefers-reduced-motion` 降级；`App.tsx` 增加 `FlatEmoji` 组件。主页 Hero、引用、手上项目、里程碑、兴趣区；Jiju 全页（页首、决策 DNA、知识块、九段卡片与旁白）均嵌入扁平底 emoji；九阶段数据补 `emoji` 字段；技能标签行与部分卡片增加轻 hover。移除未再使用的 `Briefcase` / `GraduationCap` 图标 import。
- 原因：用户反馈纯文字单调，希望扁平 emoji 与 CSS 动画。
- 影响：视觉与动效增强；动效在系统「减少动态效果」下会自动关闭。
- 后续：若需统一为 Noto/Twemoji 扁平 PNG，可再换 `FlatEmoji` 实现。

### 2026-04-23 (Jiju 九段连载旁白)

- 类型：代码 / 前台 / Jiju 全页文案与数据结构
- 改动：`jijuBuildFromZeroToOne` 每一阶段新增 `chapterVoice`（中英章首旁白）；时间轴区块标题与右侧说明改为「九段连载」叙事引导；卡片内在标题下渲染旁白再进入「时间 / 为什么做…」；Jiju 页首段简介与主页语气对齐并预告结构。
- 原因：用户要求执行「Jiju 时间轴像连载、可读性更强」的改动。
- 影响：仅 `/jiju-pet` 时间轴与页首说明；类型由对象字面量推断，无需额外类型文件。
- 后续：若要把 `why/thinking` 再口语化一轮，可单独开改动以免段落过长。

### 2026-04-23 (copy / 叙事口吻)

- 类型：代码 / 前台 / 中文与英文主页文案
- 改动：主页 Hero、引用块、「手上还在长的几件事」三段项目描述、里程碑标题、若干 CTA 用语，改为更口语、有场景、留钩子的叙事（对齐仓库内蔡康永式沟通 skill 的方向：具体、可接话、少简历腔）；英文段落同步略软化以便双语气质一致。
- 原因：用户希望读起来像「说话之道」类文本、更有读下去的动力，而非纯履历说明。
- 影响：仅文案与语气；布局未改。
- 后续：`JijuPetFullPage` 顶栏小标题已与新主页 section 标题对齐。

### 2026-04-23 (favicon)

- 类型：资源 / 构建
- 改动：新增 `public/favicon.svg`（stone-900 底 + stone-50「E」字标，与站点主色一致）；在 `vite.config.ts` 用 `transformIndexHtml` 注入 `<link rel="icon">`，`href` 使用当前 `base`（本地 `/favicon.svg`，GitHub Pages 生产构建为 `/RepoName/favicon.svg`）。
- 原因：用户需要站点 favicon；此前 `index.html` 未引用图标。
- 影响：浏览器标签页显示图标；部署在子路径时链接仍正确。
- 后续：如需 Apple Touch Icon，可再补 `public/apple-touch-icon.png` 与对应 link。

### 2026-04-23 (skills tags)

- 类型：代码 / 前台
- 改动：在主页「持续构建与实战经验」各条目描述下方增加 **Skills / 技能** 标签行（Jiju.pet、Poker Power Card、Marketing Executive），中英双语词条；抽 `ActiveBuildSkillRow` 与 `activeBuildSkillSets`。
- 原因：用户希望在描述下直接展示相关技能栈与能力标签。
- 影响：仅主页该 section 视觉与文案；无路由变更。
- 后续：可按真实技术栈微调词条。

### 2026-04-23 (portfolio)

- 类型：代码 / 前台 / 主页文案
- 改动：在主页「持续构建与实战经验 / Active Build & Experience」中新增 **Poker Power Card**（https://poker.edentan.site/）条目，中英双语简介；外链与 Jiju.pet 区块一致。
- 原因：用户要求将线上扑克力量牌项目纳入活跃构建展示，并基于站点实际能力撰写更专业的说明。
- 影响：仅主页该区块多一段项目介绍；无路由或数据结构变更。
- 后续：若需独立 `/poker-power-card` 构建叙事页，可再对齐 Jiju 全页模板。

### 2026-04-23 15:55

- 类型：代码 / 前台 / 语言偏好
- 改动：站点默认语言改为英文；用 `localStorage` 键 `eden-portfolio-language` 在切换时写入，并在首屏用 lazy state 读取（无效或不可用时回退 `en`）。
- 原因：用户要求默认英文并记住上次选择。
- 影响：新访客默认 EN；曾选过中文的访客仍会看到中文；隐私模式若禁用 storage 则每次回退 EN。
- 后续：如需跨设备同步可再考虑 URL query 或账户体系（当前不做）。

### 2026-04-23 15:53

- 类型：代码 / 前台 / 主页里程碑
- 改动：在主页「关键里程碑」门萨条目下增加中英双语简介，并外链至 Mensa International 官网介绍页。
- 原因：访客可能不熟悉门萨；补充语境与可信来源链接。
- 影响：仅主页里程碑区块多两行说明与一个外链按钮。
- 后续：若需突出马来西亚分会，可再补 `mensa.my` 区域链接。

### 2026-04-23 15:46

- 类型：代码 / 前台 / 多语言内容
- 改动：将 `previous-projects`、`archive/*`、`analog-tech` 图库与 `life` 视频标题等数据结构改为 `{ en, zh }`，并在对应页面按 `language` 渲染；`Language` 类型上移至文件顶部供数据共用。
- 原因：用户切换中文后，上述页面正文仍为英文，与全站双语切换不一致。
- 影响：中文模式下历史项目、归档页、胶片图库与生活页主体文案显示为中文；英文模式保持原文案。
- 后续：部署后抽查 `/previous-projects`、`/analog-tech`、`/life`、`/archive/soccerking-project` 中英切换。

### 2026-04-23 15:22

- 类型：代码 / 前台 / 静态资源路径修复
- 改动：在 `App.tsx` 新增 `resolveAssetPath(baseUrl, value)`，并将 `Analog Tech` 页面及 `archive` 页面的本地图片渲染统一改为 base-aware 路径拼接（不再直接使用根路径绝对地址）。
- 原因：线上访问 `analog-tech` 时出现图片空白，根因是根路径资源在 GitHub Pages 子路径部署下会指向错误地址。
- 影响：`/analog-tech` 与 `/archive/*` 页面本地图片在本地与 GitHub Pages 子路径场景都能正确加载。
- 后续：部署后优先验证 `.../analog-tech` 与 `.../archive/soccerking-project` 图片是否正常。

### 2026-04-23 15:20

- 类型：代码 / 前台 / Life 页面视觉净化
- 改动：将 `/life` 页面 YouTube 显示方式从 iframe 播放器改为自定义封面卡（`thumbnailSrc`）+ 中央播放 CTA + 点击外链打开 YouTube，移除页面内嵌播放器。
- 原因：YouTube iframe 的顶部/底部 overlay 属于平台层 UI，参数方案无法稳定彻底去除。
- 影响：页面内视频卡片不再出现 YouTube overlay；视觉更干净一致，播放入口仍保留。
- 后续：若需要站内直接播放且完全可控，可追加自托管视频或自建播放器源。

### 2026-04-23 15:16

- 类型：代码 / 前台 / Life 页面视频嵌入
- 改动：在 `App.tsx` 新增 `createYouTubeEmbedSrc`，为 `/life` 页面三个 YouTube iframe 统一添加 `controls=0`、`modestbranding=1`、`iv_load_policy=3`、`rel=0` 等参数，尽量移除播放器顶部和底部干扰元素。
- 原因：用户反馈 `/life` 页视频卡片中出现不希望展示的 YouTube 顶部标题条与底部控件条。
- 影响：页面展示更干净，视频卡片视觉更接近纯封面展示；外链“在 YouTube 打开”仍保留完整跳转能力。
- 后续：部署后在 `http://localhost:4180/life` 与 GitHub Pages `/life` 实测三条视频卡片，确认是否仍有平台强制保留元素。

### 2026-04-15 17:40

- 类型：代码 / 前台 / 多页面双语
- 改动：完成主页与全部独立页面的双语接入与统一语言切换（`/`、`/jiju-pet`、`/previous-projects`、`/analog-tech`、`/life`、`/archive/*`）。
- 原因：用户要求全页面检查漏改并统一中英切换体验，避免只改单页导致反复补丁。
- 影响：页面级 UI 文案已实现中英切换一致，语言状态由 `App` 层统一管理，跨页面保持同一语言。
- 后续：如需进一步完善，可继续把 `previousProjectsData` 与 `archivedWorks` 的正文长文本升级为完整中英双语数据结构。

### 2026-04-15 18:05

- 类型：文档 / 规则 / 协作流程
- 改动：重写 `README.md`；新增 `soul.md` 与本日志文件 `log.md`；并在 `AGENTS.md` 增补“执行前后检查、必须记日志、优先减少用户重复指令”的规则。
- 原因：用户要求提升后续 agent 协作质量，降低重复沟通和返工成本。
- 影响：仓库已具备面向后续 agent 的统一执行入口（`README.md` + `AGENTS.md` + `soul.md` + `log.md`）。
- 后续：后续每次真实改动继续按本日志规则追加，保持可追溯。

### 2026-04-23 15:05

- 类型：代码 / 部署 / GitHub Pages 路由修复
- 改动：新增 `public/404.html` 作为 GitHub Pages SPA fallback 重定向页；在 `index.html` 增加恢复脚本，把 `?p=/sub-route` 还原为真实路由路径。
- 原因：GitHub Pages 不会自动把子路由回退到 `index.html`，导致 `/Eden/previous-projects` 等子页发布后直接 404。
- 影响：发布后子页面支持直开与刷新，不再因为服务端找不到静态文件而报 404。
- 后续：重新部署后需验证 `https://edent95.github.io/Eden/previous-projects`、`/jiju-pet`、`/life`、`/analog-tech`、`/archive/...` 是否都可直接访问。

### 2026-05-14 01:16

- 类型：代码 / 前台 / 主题系统
- 改动：在 `App.tsx` 新增全站 `light` / `dark` 主题状态、`localStorage` 持久化、首页与各独立页面共用的主题切换按钮；在 `index.css` 增加暗色主题变量与常用 `stone` / `white` / 渐变 / hover / ring / outline 的暗色映射，并为 `brand-guide` 色卡区加 `theme-preview-static` 保护，避免暗色模式下示例色值失真。
- 原因：用户要求站点支持真正可切换的 dark theme mode，而不是只改首页或只改背景色。
- 影响：`/`、`/jiju-pet`、`/previous-projects`、`/analog-tech`、`/life`、`/brand-guide`、`/archive/:slug` 现在都可切换深浅色；主题偏好刷新后仍保留；品牌指南中的色板示例继续显示原始品牌色值。
- 后续：可在浏览器里继续实测极细节状态（如 hover、选中文本、横滑卡片渐变）是否还要再微调对比度。

### 2026-05-14 01:23

- 类型：代码 / 前台 / 暗色对比修正
- 改动：在 `index.css` 为 dark mode 下的 `bg-eden-mint`、`bg-eden-mint/30`、`bg-eden-amber`、`bg-eden-amber/35` 增加强调底专用前景色覆盖，并把其内部常见 `text-stone-*` 文字强制改回深色对比，避免浅强调底上继续继承暗色主题里的浅字。
- 原因：用户指出 mint / amber 在 dark mode 下也需要同步切换对比色，否则会出现“亮底配浅字”的反向对比问题。
- 影响：首页状态 badge、语言选中态、hero 地区 pill 等直接使用 mint / amber 底色的元素，在 dark mode 下会恢复黑字系对比，更清楚。
- 后续：若还想把带 `from-eden-mint/*`、`from-eden-amber/*` 的渐变卡片也进一步单独校色，可以再拆第二层规则。

### 2026-05-14 01:28

- 类型：代码 / 前台 / 暗色补色修正
- 改动：根据用户补充，把 dark mode 的品牌强调色逻辑从“前景加深”改为“色相补色切换”：`eden-mint` 改为红系补色、`eden-amber` 改为蓝系补色；同步撤回上一条对 `bg-eden-*` 的深字强制覆盖，并把对应的 accent text、ring、gradient 终点、emoji hover rim / glow 一并改到同一补色方向；`brand-guide` 文案也同步写明 `mint -> red`、`amber -> blue`。
- 原因：用户明确说明这里说的不是文字可读性，而是色轮上的补色关系。
- 影响：dark mode 下所有直接使用 `eden-mint` / `eden-amber` token 的按钮、badge、hover、focus ring 与品牌说明，都会转为红 / 蓝补色体系，而不是继续沿用绿 / 橙逻辑。
- 后续：如果要把其他非 token 的固定 `teal` / `amber` 语义块也彻底统一到补色策略，可再做一轮全页清扫。

### 2026-05-14 01:31

- 类型：代码 / 前台 / 背景纹理
- 改动：在 `index.css` 新增全站 `page-shell` 背景层：用固定的细网格、淡竖横线、顶部轻高光，以及两团低透明的品牌色 glow 组成纸感纹理；light / dark 各自有不同强度与配色。同步把 `App.tsx` 里所有页面根容器改为 `page-shell`，让首页与独立页面都共用这层材质背景。
- 原因：用户要求给背景加 texture，但不希望只是平涂纯色。
- 影响：站点背景现在会有更明显的“编辑系统 / 底纸”质感；卡片本身仍保持干净，不会因为纹理而影响正文可读性。
- 后续：如果你想要更偏纸张纤维、胶片颗粒，或更偏 blueprint 网格，我可以再把这层 texture 往某一个方向收紧。

### 2026-05-14 01:34

- 类型：代码 / 前台 / CSS 动效
- 改动：在 `index.css` 新增三组全站 CSS motion：`texture-drift` 让背景纹理极慢漂移、`page-enter` 让每页主体轻微上移淡入、`motion-card` 让主要卡片 hover 时微浮起并换阴影；另加 `motion-accent` 给首页顶部地区 pill 做轻呼吸。同步在 `App.tsx` 为首页与各独立页的主要卡片、横滑章节卡、hero pill 挂上对应类名。
- 原因：用户要求增加 motion css，但不希望只是堆动画名而没有落到实际界面层级。
- 影响：页面现在有更明确的进入节奏与 hover 反馈；背景也不再完全静止。`prefers-reduced-motion: reduce` 下这些新增动画会关闭，避免过度运动。
- 后续：如果你想再加滚动触发的纯 CSS 分层视差，或把某个区块做成更明显的 signature motion，可以再定向做第二轮。

### 2026-05-14 01:36

- 类型：代码 / 前台 / 背景灯光动画
- 改动：把背景里的 glow 从 `page-shell::before` 纹理层拆到独立的 `page-shell::after` 灯光层；新增 `--theme-background-lights`、`light-orbit` 与 `light-pulse`，让几团 radial light 慢速游走、缩放和呼吸。原本的 `texture-drift` 只保留给底纸线纹，不再带着整团灯一起移动。
- 原因：用户明确要的是“背景的灯动起来”，而不是整张 background 一起漂。
- 影响：现在背景会更明显地看到灯光在游走；纸感纹理仍保持稳定。`prefers-reduced-motion: reduce` 下灯光动画也会关闭。
- 后续：如果你想要更像 stage light、nebula，或更像 UI ambient glow，可以继续把灯数量、轨迹和 blur 半径往那个方向调。

### 2026-05-14 01:38

- 类型：代码 / 前台 / 灯光动感增强
- 改动：进一步加强 `page-shell::after` 的灯光动画表现：提高 glow alpha、放大背景灯尺寸、减小默认 blur、把 `light-orbit` 的位移/缩放/旋转幅度拉大，并把周期从 22s / 9.5s 提快到 14s / 6.8s。
- 原因：用户反馈“没有看到灯动起来的感觉”，说明上一版运动幅度过克制。
- 影响：现在背景灯的游走和呼吸更容易被肉眼直接感知，不需要盯很久才发现。
- 后续：如果还是不够明显，下一步可以改成更舞台感的单侧 sweep light，或者直接加第三颗大灯。

### 2026-06-02 21:56

- 类型：代码 / 前台 / Life OS 去命理化与游戏化文案
- 改动：将 `/life-os` 和首页 Interests 中可见的命理来源词统一改成 RPG 游戏白话。把“庚金偏弱 / 易经 / 河洛 / 八字 / 紫微 / 人类图 / 基因钥匙 / 命盘”等表达替换为“轻刃型配置 / 轻量渗透型风格 / 玩家信号 / 行为循环 / 回应引擎 / 角色解码控制台”等游戏系统语言；同步更新 `/life-os` SEO 描述，移除 destiny maps / 命盘表述。
- 原因：用户明确要求不要和命理扯上关系，这个页面要以 RPG 游戏界面和游戏系统为主。
- 影响：页面现在呈现为原创 RPG character system：保留属性、技能、Debuff、隐藏参数、任务指令和 HUD 视觉，但不再暴露命理来源标签。
- 后续：如果继续强化游戏感，下一步可以新增真正的装备栏、任务面板、技能树连线或可切换的游戏 tabs。

### 2026-06-02 21:47

- 类型：代码 / 前台 / Life OS 本命 RPG 控制台
- 改动：在 `/life-os` 新增“本命解码控制台”，把用户提供的本命资料转成游戏界面模块：角色 Loadout、命理信号 → RPG 模组、隐藏参数、当前阶段指令。新增 `lifeRpgDecodeSignals`、`lifeRpgHiddenParameters`、`lifeRpgQuestDirectives` 数据源；主动技能栏新增 `Wind Infiltration / 风之渗透` 与 `Abstraction Engine / 抽象整合引擎`。
- 原因：用户要求把本命综合解读加入网页，并让页面越像游戏界面越好。
- 影响：页面现在更像一个 RPG character sheet / data HUD，不只是说明系统。读者可以看到巽为风、巽九五、生命数字 5、庚金偏弱、生产者/骶骨权威、64-47 抽象通道如何被转译成技能、隐藏参数和当前任务。
- 后续：如果继续推进游戏化，下一步可以做真正的雷达图、装备栏、技能树连线或可点击 tabs。

### 2026-06-02 21:35

- 类型：代码 / 前台 / Life OS 系统定位补强
- 改动：在 `/life-os` 增加 `lifeOsSystemModes` 系统定位数据，并在 Hero 世界观卡加入 HUD 标签：人格能力地图、内在天赋系统、成长路线图、黑暗幻想 + 数据 HUD、古老系统 + 现代界面；同时在 Hero 下方新增“系统界面”区块，用卡片解释每个定位的含义，并加入更多 emoji。
- 原因：用户要求把“人格能力地图 / 内在天赋系统 / 成长路线图”加进去，并让页面更贴近“黑暗幻想加数据 HUD / 古老系统加现代界面”的感觉。
- 影响：页面定位更清楚，不只是 RPG 角色卡，也明确表达它是一个把人格、天赋、成长路线和古老系统转成现代数据界面的 Life OS。
- 后续：如果继续深化，可以把“系统界面”区块做成真正的 tab 或锚点，分别跳到属性、技能、Debuff、成长路线详情。

### 2026-06-02 21:27

- 类型：代码 / 前台 / Life OS 能力分类内容补全
- 改动：将 `/life-os` 的“能力分类”区块从单纯说明改为 overview cards：Core Stats 卡内加入 8 个核心属性与分数；Active Skills 卡内加入 4 个主动技能与等级；Passive Skills 卡内加入 4 个被动技能；Debuffs / Shadow 卡内加入 4 个阴影入口。内容直接复用现有 RPG 数据源，支持中英切换。
- 原因：用户指出分类卡里的内容需要加进去，不能只停留在分类定义。
- 影响：读者在能力分类区块即可快速看到每类系统实际包含什么，页面信息架构更完整，下方详情区仍保留完整解释。
- 后续：如果之后要继续提升可读性，可以把 overview cards 做成锚点跳转到下方对应详情区。

### 2026-06-02 21:24

- 类型：代码 / 前台 / Life OS HUD 形状元素
- 改动：在 `/life-os` 新增 `LifeOsHudShapes` 可复用形状层，并挂到 hero、角色卡、世界观卡、总战力卡、主线任务、核心属性、能力分类、主动技能、被动技能、Debuff、成长路线、资料来源和免责声明区块。形状包括角标、边缘刻度、细线轨道和少量菱形，使用 `eden-mint` / `eden-amber` / stone 体系。
- 原因：用户要求页面加多一点形状元素，同时需要延续原本 brand book 配色，不回到普通履历或黑金玄学风。
- 影响：`/life-os` 更像 RPG character sheet / data HUD，视觉层次更明确；已调整形状位置，避免菱形压到正文。
- 后续：如果继续加强，可以下一步做真正的属性雷达图或 SVG skill tree，但要继续避免大面积装饰背景和脱离品牌色盘。

### 2026-06-02 21:18

- 类型：代码 / 前台 / Life OS 品牌配色与 emoji
- 改动：调整 `/life-os` 的 RPG 能力系统页面视觉，从偏黑金玄幻的临时风格改回站内 brand book 方向：stone 作为主画布，`eden-mint` 与 `eden-amber` 作为系统分区与状态点睛；增加角色档案、世界观、总战力、主线任务、核心属性、主动技能、被动技能、Debuff、成长路线、资料来源与免责声明等模块的 emoji 标记；同时修正 dark mode 下 `text-stone-950` 与 `bg-white/xx` opacity class 未被现有主题覆盖导致的低对比问题。
- 原因：用户要求 `/life-os` 跟随原本 brand book 颜色，并加多一点 emoji，但不能失去 RPG 系统页的识别度。
- 影响：`/life-os` 在浅色模式下回到 stone / mint / amber 的品牌系统，在暗色模式下跟随现有 dark token 变为对应互补 accent；页面保留 Mystic Tech / RPG 角色档案感，但不再像独立黑金玄学页。
- 后续：如果之后要继续强化游戏感，建议优先补图标节奏、属性图或轻量 HUD 线条，不要再引入一套脱离 brand guide 的新色盘。

### 2026-05-14 01:41

- 类型：代码 / 前台 / 品牌指南同步
- 改动：更新 `/brand-guide` 内容以对齐当前站点真实实现：修正 `brandGuideAccent` 的 dark-mode 色值为当前补色 token（mint -> `#dc6f82`，amber -> `#6fa4f0e6`）；补充“背景系统”区块，明确 `page-shell::before` 负责底纸纹理、`page-shell::after` 负责动态灯光；在“组件习惯”和“动效与无障碍”中补入 `page-shell`、`motion-card`、`motion-accent`、`light-orbit` / `light-pulse` 等当前规范；并把遗漏的两块 section 也补上 `motion-card` 交互类。
- 原因：用户要求“brand-guide update 一下”，而当前品牌指南已经落后于真实 UI，尤其是 dark mode、背景灯光与 motion 部分。
- 影响：`/brand-guide` 现在能准确反映当前站点的色彩、背景和动效系统，后续协作者不需要再靠聊天记录猜现行规范。
- 后续：如果之后继续调灯光或纹理风格，记得优先同步这一页，而不是只改 CSS。

### 2026-05-14 01:43

- 类型：代码 / 前台 / emoji 底盒透明度
- 改动：将 `index.css` 中 `.flat-emoji` 的底盒从 `bg-stone-200` 改为 `bg-stone-200/60`，并增加 `backdrop-filter: blur(8px)`，让 emoji 的圆角底盒更透、更轻。
- 原因：用户要求提高 emoji 盒子的透明度，减少实心色块感。
- 影响：全站所有使用 `FlatEmoji` 的位置，底盒都会更轻、更像半透明玻璃片，但仍保留足够轮廓。
- 后续：如果你还想更透，可以继续降到 `/45`；如果想更像磨砂玻璃，也可以再把边框 alpha 一起调低。

### 2026-05-14 01:41

- 类型：代码 / 前台 / brand-guide 内容同步
- 改动：更新 `/brand-guide` 以对齐当前真实实现：修正品牌强调色在 dark mode 下的展示值为 `eden-mint -> #dc6f82`、`eden-amber -> #6fa4f0e6`；新增“背景系统”区块，说明 `page-shell::before` 底纸纹理与 `page-shell::after` 动态灯光的分层职责；在“组件习惯”与“动效与无障碍”中补入 `page-shell`、`motion-card`、`motion-accent`、`light-orbit` / `light-pulse` 等当前规范；并把原先遗漏 `motion-card` 的两块 section 补齐。
- 原因：用户要求更新 brand guide，而页面内容已落后于当前站点的 dark mode、背景与 motion 系统。
- 影响：`/brand-guide` 现在可作为当前视觉系统的真实说明页，后续协作者不需要再靠聊天记录判断现行规则。
- 后续：如果之后继续改主题自动切换、灯光轨迹或背景纹理，也应优先同步这一页。

### 2026-05-14 01:21

- 类型：代码 / 前台 / 暗色强调色
- 改动：将 `index.css` 中 `eden-mint` 与 `eden-amber` 在 `:root[data-theme="dark"]` 下切换为暗色专用 token 值；把 `brand-guide` 的中性色预览保护类改为只作用于 neutral ramp，并让品牌强调色卡在当前主题下显示对应 hex（`App.tsx`）。
- 原因：用户要求 dark mode 下 mint 和 amber 也必须跟着变，不能继续复用浅色模式的强调色。
- 影响：深色模式下所有 `bg-eden-mint` / `bg-eden-amber`、相关透明度与边框/强调表现会一起换色；`/brand-guide` 中的 accent swatch 也会随主题显示当前值。
- 后续：若还想把深色模式做得更“夜间感”，可继续微调 hover 态与选中文本的 accent 对比度。

### 2026-05-14 01:57

- 类型：代码 / 前台 / 主题自动切换
- 改动：将主题系统从单纯 `light / dark` 改为 `auto / light / dark` 三态；`auto` 模式基于用户浏览器本地时间解析主题，规则为 `07:00–18:59 -> light`、`19:00–06:59 -> dark`。`App.tsx` 新增 `resolveThemeFromLocalTime` 与 `readStoredThemePreference`，并在自动模式下按分钟刷新，同时在页面回到前台时重新校准；顶部主题切换控件也改成三按钮分段式（自动 / 浅色 / 深色）。同步更新 `/brand-guide` 对这套规则的说明。
- 原因：用户明确要求像 iPhone 一样，根据用户当前本地时间自动决定显示哪种模式，而不是只靠手动切换。
- 影响：首次访问或选择 `自动` 后，站点会按用户本地时间自动切换；手动选择 `浅色` 或 `深色` 仍会覆盖自动模式。
- 后续：如果你之后想从固定时段升级成“按日出日落自动切换”，可以再接一层地理位置或太阳时计算。

### 2026-05-14 05:43

- 类型：代码 / 前台 / 移除背景形状
- 改动：删除 `App.tsx` 中的 `AmbientShapes` 组件及所有页面根层挂点；同时移除 `index.css` 里整套 `ambient-shape*`、`theme-shape*` 与 `shape-float` 相关样式和 reduced-motion 分支；`/brand-guide` 的“版式与形状”里关于装饰 shape 的说明也同步撤掉。
- 原因：用户明确要求拿掉背景的形状设计。
- 影响：页面仍保留背景纹理、动态灯光和既有卡片/动效，但不再出现那组悬浮的几何形状。
- 后续：如果之后还想补视觉装饰，建议优先走更克制的背景光或分隔线，而不是再回到大块几何形状。

### 2026-05-14 05:56

- 类型：代码 / 前台 / 动效节奏重构
- 改动：按参考重做全站 motion 节奏：`index.css` 中把主题切换统一拉到 `320ms` soft-out，把页面淡入调到 `480ms`，把 `motion-card` hover 调到 `420ms`，新增卡片顶边扫光（`background-size: 300%`、从右向左往返）与 `11s` 的 `flare-breathe`，并给卡片底部补上 `520ms` 的 bloom；同时把背景灯层改成更慢的 `38s` 漂移 + `11s` 呼吸。`/brand-guide` 文案同步更新这些真实参数与行为描述。
- 原因：用户要求参考一套更慢、更有呼吸感的动效系统，不要“瞬间抬起 / 闪一下 / 在跑”，而要更像漂移、呼吸、日出日落。
- 影响：现在卡片 hover 会更像慢慢浮起来，背景灯会更像在呼吸，顶边光线也会更明确地从右到左走过再回去；整站切换和进入节奏比之前更柔和。
- 后续：如果浏览器里还觉得扫光不够明显，下一步可以只定向加强 `motion-card::before` 的亮带宽度或对比，不必再动整套节奏。

### 2026-05-14 06:01

- 类型：代码 / 前台 / 扫光虚化
- 改动：进一步调整 `index.css` 中 `motion-card::before` 的顶边扫光：把亮带厚度从硬 2px 提到更雾化的 4px，削弱中心白线，改成更散的 mint/amber 光迹，并加入 `screen` 混合、柔光 `box-shadow` 与更高 blur；`flare-breathe` 也同步改成更像雾气忽明忽暗，而不是线条本体忽然变亮。
- 原因：用户要求“线条多加虚幻”，重点不是更亮，而是减少边界感，让它更像一缕光。
- 影响：卡片顶边那条扫光现在会更柔、更飘，不会像一根贴上去的亮线。
- 后续：如果还想再梦幻一点，下一步可以只继续放大 blur 和降低中心亮点，不必改整体动效周期。

### 2026-05-14 06:04

- 类型：代码 / 前台 / 扫光 fade 拉长
- 改动：继续调整 `index.css` 中 `motion-card::before` 的渐变停点，把扫光前缘和后缘的透明过渡拉长，增加低透明中间层，让亮带从出现到消失都更慢、更软。
- 原因：用户要求“线条多加 fade”，重点是让光迹边界更淡，而不是再增加亮度或速度。
- 影响：现在顶边扫光经过卡片时，前后两端会更自然地淡入淡出，不会像一段突然出现、突然消失的亮条。
- 后续：如果还想更空灵，下一步可以叠第二层更宽更淡的外圈 haze。

### 2026-05-14 05:38

- 类型：代码 / 前台 / 装饰 shape 系统
- 改动：新增 `AmbientShapes` 组件，在全站页面根层挂载四个装饰几何：outline frame、竖向 pill、ring、diamond；在 `index.css` 增加 `ambient-shapes` / `ambient-shape-*` 样式、主题适配的描边/填充/glow，以及轻微漂移动画 `shape-float`。同步在 `/brand-guide` 的“版式与形状”里补入 shape 使用规则：大、边缘、半透明，不遮正文。
- 原因：用户要求“add some shape as design inside my website”，需要的是可复用的设计层，而不是只在某一页临时塞几何块。
- 影响：首页与各独立页面现在都会带一层统一的 editorial 形状装饰，视觉更完整，同时仍保持内容区清晰。
- 后续：如果你想走更强烈方向，可以再把 shape 做成 route-specific 变体，而不是全站同一组。
### 2026-06-02 23:35

- 类型：代码 / 前台 / Active Skills banner 重设计
- 改动：重新生成一张原生 24:9 构图的猫主题复古魔法 RPG banner，并替换 `public/life-os-banners/active-skills-cat-magic.png`；输出尺寸保持 `1440x540`，页面继续使用 `aspect-[8/3]`。
- 原因：用户要求主动技能 banner 跟着当前风格元素重新设计，并保持 24:9。
- 影响：Active Skills 区块现在使用新构图，不再只是由旧 12:9 图裁切而来，横向 section header 感更明确。
- 后续：如果用户满意这张方向，可用同一 prompt 逻辑继续重做 Passive Skills 和 Debuff 的原生 24:9 图。

### 2026-06-02 23:29

- 类型：代码 / 前台 / Life OS banner 比例调整
- 改动：将 `public/life-os-banners/` 内三张技能 banner 从 12:9 裁切为 24:9，实际尺寸统一为 `1440x540`；同步将 `LifeOsBanner` 容器比例从 `aspect-[4/3]` 改为 `aspect-[8/3]`。
- 原因：用户要求 banner 从 12:9 换成 24:9。
- 影响：Active Skills、Passive Skills 与 Debuff System 的 banner 现在更横向、更像游戏页面 section header，不再占用过高纵向空间。
- 后续：如果 24:9 裁切后主体位置不够理想，可以重新生成原生 24:9 构图，而不是继续裁切现有图。

### 2026-06-02 23:24

- 类型：代码 / 前台 / Life OS 技能横幅
- 改动：为 `/life-os` 生成并接入 3 张 12:9 猫主题复古魔法 RPG banner：`active-skills-cat-magic.png`、`passive-skills-cat-magic.png`、`debuff-cat-magic.png`，存放于 `public/life-os-banners/`；新增 `lifeOsBanners` 与 `LifeOsBanner`，分别挂到 Active Skills、Passive Skills 和 Debuff System 区块。
- 原因：用户要求重新设计主动技能、被动技能和 Debuff 的 banner，方向为猫主题、复古魔法、奇幻游戏感，并保持网站风格。
- 影响：Ability System dropdown 打开后，三个能力区块会先出现统一比例的主题 banner，再进入具体技能卡片；视觉更像游戏角色能力面板。
- 后续：如果还想更统一，可以继续为 Growth Routes 和 Score Logic 生成同一套 banner。

### 2026-06-02 23:08

- 类型：代码 / 前台 / Life OS dropdown 去重复
- 改动：在 `/life-os` 的 Ability System dropdown 中移除 `Ability Categories / 能力分类` 区块，并删除对应 `abilityCategoryCards` 数据源；保留 Active Skills、Passive Skills 和 Debuff 三个详细模块，避免技能名称与说明重复出现。同步更新 `soul.md` 与 `AGENTS.md`，记录后续不默认做截图验证的协作规则。
- 原因：用户指出 Ability Categories、Active Skills、Passive Skills 内容重复，希望相关内容收在 dropdown 里，但点击后不要看到重复清单。
- 影响：Ability System 现在更短、更集中，用户点击后直接看到真正有内容的技能和 Debuff 卡片，不再先读一组重复摘要。
- 后续：后续前台验证按用户偏好不再做截图检查，改为构建、关键词和必要文本检查。

### 2026-06-02 22:56

- 类型：代码 / 前台 / Life OS 完整 RPG 世界观改版
- 改动：按《人生 RPG 能力系统》计划升级 `/life-os`：Hero 强化 “Reality is a RPG / 现实是一场 RPG” 核心设定；新增 World System 世界观说明区块；目录说明加入 World System 并重排编号；隐藏参数改为 Business Sense、Creativity、Routine Tolerance、System Obedience；资料来源统一转译为玩家日志、行为循环、能量模式、社交模式、赚钱模式、关系模式与现实校准；成长路线加入主要风险；免责声明改为更明确的 RPG 升级地图说明；移动端 Hero 顺序调整为角色卡 → Power Score → 世界观。
- 原因：用户要求把页面升级成更完整的 Mystic Tech RPG Character Profile，同时前台隐藏命理来源，不做心理测验、履历页或传统玄学页面。
- 影响：`/life-os` 现在更完整地呈现为人生 RPG 角色卡、人格能力地图、内在天赋系统、Debuff 系统和成长路线图；SEO 描述也同步改为 RPG 角色卡 / 能力地图 / 成长路线，不暴露原始来源术语。
- 后续：如果继续增强游戏感，可以把目录卡片做成锚点导航，并为 Hidden Parameters 生成专属图标。

### 2026-06-02 22:38

- 类型：代码 / 前台 / Life OS 目录说明
- 改动：在 `/life-os` Hero 后新增 `Field Manual / 目录说明` 区块，包含阅读顺序、9 个目录模块说明，以及每个模块“应该看什么”的读者提示；内容保持中英双语，并使用 RPG 游戏说明书口吻。
- 原因：用户要求写一篇目录解释页面里面的内容，需要让读者先知道角色总览、系统界面、解码控制台、主线任务、核心属性、技能、Debuff、成长路线和数值逻辑分别怎么看。
- 影响：Life OS 页面现在更像完整游戏界面说明书，而不是只展示能力卡；读者可以先理解页面结构，再进入详细角色系统。
- 后续：如果继续强化游戏感，可以把目录卡片做成可点击锚点，点击后跳到对应模块。

### 2026-06-02 22:30

- 类型：代码 / 前台 / Life OS 技能图标接入
- 改动：将最新生成的日本元素彩色 RPG spritesheet 切成 16 张独立 PNG，放入 `public/life-os-icons/`；新增 `lifeOsIcons` 与 `LifeOsIcon`，并接入 `/life-os` 的系统界面、玩家信号、能力分类、主动技能、被动技能、Debuff 卡片。
- 原因：用户要求执行，把生成的小图实际放进网页，让 Life OS 页面更像游戏界面，同时配合原本 brand book 的黑暗 HUD、彩色 accent 和 RPG 角色卡方向。
- 影响：页面现在有真实技能 icon，而不是纯 emoji/text；图标可由 Vite 与部署后的 public assets 直接服务，视觉更接近游戏能力面板。
- 后续：如果继续优化，可以为 Core Stats 与 Hidden Parameters 做更细的专属 icon，或增加 hover/selected 状态。

### 2026-06-02 23:55

- 类型：代码 / 前台 / Active Skills 六技能重设计
- 改动：为 `/life-os` 的 6 个主动技能重新命名并重写技能逻辑：风爪密印、月影法典织机、猫眼动机扫描、领地符文改写、故事坩埚炼金、九命混沌步；新增并接入 6 张对应内容的原生 24:9 猫主题复古魔法 RPG banner，存放于 `public/life-os-banners/active-*.png`。
- 原因：用户指出 Active Skills 里的 6 个技能视觉和内容太像，希望每张 banner 与技能内容有关，并让技能名字也跟随当前游戏风格重写。
- 影响：Active Skills 不再共用一张横幅，每张技能卡先显示自己的技能 banner，再显示等级、类型、消耗、效果、适合场景和副作用，整体更像 RPG 技能档案。
- 后续：如果方向确认，可以用同样方式继续把 Passive Skills 与 Debuff 拆成逐项专属 banner。

### 2026-06-03 00:16

- 类型：代码 / 前台 / Active Skills 小图标重设计
- 改动：为 `/life-os` 的 6 个主动技能生成并接入对应的新小 icon：`active-galeclaw-sigil.png`、`active-moon-codex-loom.png`、`active-cats-eye-scan.png`、`active-territory-rune-rewrite.png`、`active-story-cauldron-alchemy.png`、`active-nine-lives-chaos-step.png`；新增 `lifeOsActiveSkillIcons`，让 Active Skills 使用新图标，不再沿用旧技能 icon。
- 原因：用户指出 Active Skills 的小 icon 也需要跟随新版技能内容更新，避免 banner 是新设定但 icon 仍是旧逻辑。
- 影响：每个主动技能现在都有一套对应的 banner + icon + 技能文案，视觉和内容关系更一致。
- 后续：如果继续统一整套系统，可以再为 Passive Skills 和 Debuff 做逐项专属 icon 与 banner。

### 2026-06-03 00:28

- 类型：代码 / 前台 / Life OS 角色照片
- 改动：根据 RPG 角色档案元素生成 `public/life-os-character/eden-rpg-character.png`，并接入 `/life-os` Hero 左侧角色卡；移除前台角色名里的「觉」，中文与英文统一显示 Eden，标题改为 `Eden 的人生角色卡` 与 `Eden · 风之解析者`。
- 原因：用户要求把「觉」拿掉，并根据现有 RPG 角色档案元素生成一张角色照片。
- 影响：Life OS 首屏现在有真实角色视觉锚点，不再是圆形字标；角色身份更统一地归到 Eden。
- 后续：如果需要更像本人，可在用户提供真人参考照后再做一版保留身份特征的风格化角色照。

### 2026-06-03 00:33

- 类型：代码 / 前台 / Life OS 角色名去个人名
- 改动：将 `/life-os` 角色卡中的 `Eden` 也移除，Hero 主标题改为 `风之解析者 / Wind Pattern Analyst`，副标题改为 `流浪策略师 / Wandering Strategist`，世界观标题改为 `人生 RPG 能力系统`；角色图引用改为中性路径 `public/life-os-character/life-rpg-character.png`。
- 原因：用户要求 `Eden` 也拿掉，让 RPG 页面更像角色系统，而不是个人姓名展示。
- 影响：Life OS 首屏与 Character Loadout 现在只显示角色称号、职业和系统身份，不再显示个人名。
- 后续：旧图 `eden-rpg-character.png` 暂时保留，避免误删；确认不再需要后可清理。

### 2026-06-03 00:41

- 类型：代码 / 前台 / Life OS 世界观改角色序章
- 改动：将 `/life-os` 首屏中间的世界观说明改成小说式 Hero 背景故事，标题为 `风之解析者的出场设定 / Origin of the Wind Pattern Analyst`；同步把下方 World System 区块改为 `背景故事 / Origin Story`，并将四张原则卡改成出身、武器、元素和主线任务的角色设定卡。
- 原因：用户希望世界观内容换成自我介绍式的小说模式，用 Hero 背景故事介绍风之解析者，而不是继续用系统说明书口吻。
- 影响：Life OS 首屏现在更像角色档案开场，有明确的角色来源、冲突、能力形成方式和主线任务；目录说明也从“世界规则”改为“角色序章”。
- 后续：如果还想更强叙事感，可以继续把 Character Decode Console 改成“章节 / 地图 / 任务日志”式文案。

### 2026-06-03 00:56

- 类型：代码 / 前台 / Life OS Hero 雷达面板
- 改动：将 `/life-os` 首屏中间标题收紧为 `风之解析者 / Wind Pattern Analyst`；把右侧原 `总战力 / Power Score` 数字卡改成 SVG radar 人格能力地图，显示洞察、策略、表达、自由、适应、稳定 6 个维度，并保留中心 `86` 读数；系统标签统一为人格能力地图、内在天赋系统、成长路线图、黑暗幻想 + 数据 HUD、古老系统 + 现代界面。
- 原因：用户要求标题只保留「风之解析者」，总战力区域改成 radar 设计，并替换旧系统标签；同时减少文案反复使用“他”的旁白。
- 影响：首屏更像 RPG 角色 HUD，能力倾向从静态数字变成可视化雷达图，叙事文案更克制。
- 后续：如需进一步强化游戏感，可以给雷达图增加 hover tooltip 或按属性点亮对应技能卡。

### 2026-06-03 01:02

- 类型：代码 / 前台 / Life OS Level Bar
- 改动：将 `/life-os` 左侧 RPG 角色档案中的 `✦ Level · 30` 改成动态 Level Bar，按生日 `1995-12-05` 和 80 年生命时间轴计算，显示 `LV 当前年龄 / 80`、生命轴百分比，以及 `1995 出生 / 80 年时间轴`。
- 原因：用户要求 Level 不只是静态数字，而是根据 1995 年出生和预设 80 岁终点做成 RPG 时间轴。
- 影响：角色档案更像游戏 HUD，Level 会随真实日期自动更新，进度条展示从出生到 80 岁的整体进度。
- 后续：如果需要更游戏化，可以再加“下一等级生日倒计时”或年度经验条。

### 2026-06-03 01:05

- 类型：视觉资源 / Life OS Loadout banner
- 改动：根据用户提供的角色 Loadout 设定生成 1:2 竖向 banner，文件为 `public/life-os-character/wind-pattern-analyst-loadout-banner.png`，尺寸 `1024x2048`；视觉方向延续猫主题复古魔法 RPG、风 + 金、混沌洞察型、黑暗幻想 + 数据 HUD。
- 原因：用户要求基于风之解析者、流浪策略师、Wind + Metal、Chaotic Insightful 和主线任务，生成猫为主体的 Loadout banner。
- 影响：项目现在有可用于角色 Loadout 区块或后续页面视觉替换的专属竖向 banner。
- 后续：如果要接入页面，可替换当前角色照片或作为 Character Loadout 的独立竖向卡片。

### 2026-06-03 01:10

- 类型：代码 / 前台 / Loadout banner 接入
- 改动：在 `/life-os` 的 `角色解码控制台` → `角色 Loadout` 卡片内接入 `wind-pattern-analyst-loadout-banner.png`，新增 `lifeOsLoadoutBanner` 常量，图片以 1:2 竖向比例显示在 Loadout 标题上方。
- 原因：用户要求把刚生成的猫主题 Loadout banner 加入到角色解码控制台的角色 Loadout 区块。
- 影响：角色 Loadout 从纯文字卡片变成带主视觉的角色档案卡，更接近 RPG UI。
- 后续：如果觉得区块过高，可改成桌面左右分栏：左图右文字。

### 2026-06-03 01:19

- 类型：视觉资源 / Life OS Hidden Parameters banner
- 改动：根据隐藏参数内容生成 `public/life-os-banners/hidden-parameters-console.png`，尺寸 `1600x900`，比例 `16:9`；视觉重点对应商业嗅觉、创造力、低重复耐受、低制度服从，风格延续猫主题复古魔法 RPG、黑暗幻想 + 数据 HUD。
- 原因：用户要求根据 `隐藏参数` 内容生成适合后续重排使用的视觉图，并让系统自行选择适合比例。
- 影响：项目现在有一张可作为 Hidden Parameters section banner、卡片头图或重排素材的横向控制台视觉。
- 后续：等用户确认排版方向后，可接入 `/life-os` 的隐藏参数卡片或改成分栏 layout。

### 2026-06-03 01:47

- 类型：视觉资源 / 前台 / Player Signals banners
- 改动：按用户要求先生成一张包含 6 个玩家信号横幅的竖向 sheet，保存为 `public/life-os-signal-banners/player-signals-sheet.png`；再裁切成 6 张 `24:9` banner：`soft-infiltration-style.png`、`rule-setter-phase.png`、`explorer-drive.png`、`light-blade-build.png`、`body-response-engine.png`、`chaos-compression-engine.png`，每张尺寸 `1440x540`；新增 `lifeOsSignalBanners` 并接入 `/life-os` 的 `玩家信号 → RPG 模组` 卡片。
- 原因：用户要求根据轻量渗透型风格、规则制定阶段、探索驱动、轻刃型配置、身体回应引擎、混乱压缩引擎各自内容生成相关 banner，并放进对应模块。
- 影响：玩家信号区从纯文字和小 icon 变成带 24:9 场景 banner 的 RPG 模组卡，视觉和每个信号内容更一致。
- 后续：如果要进一步统一，可以为每个信号 banner 增加 hover 状态或点击展开对应技能来源。

### 2026-06-03 01:59

- 类型：视觉资源 / 前台 / Life OS module icons
- 改动：用同一套猫主题复古魔法 RPG + dark HUD 风格生成 `public/life-os-module-icons/module-icons-sheet.png`，并裁切成 14 张 `512x512` 小 icon，覆盖玩家信号、被动技能与 Debuff：轻量渗透型风格、规则制定阶段、探索驱动、轻刃型配置、身体回应引擎、混乱压缩引擎、流浪者本能、反重复系统、社交镜像、模式记忆、无聊衰减、过度洞察、未完成任务循环、权威抗拒。
- 原因：用户要求用同样方法制作对应小 icon，让 Life OS 页面里的模块视觉不再共用旧图或重复图。
- 影响：`/life-os` 的 `玩家信号 → RPG 模组`、`Passive Skills`、`Debuffs / Shadow` 已改为使用新的相关 icon；重复出现的“无聊衰减”按现有 Debuff 结构补成“过度洞察”。
- 后续：如果用户要更强游戏感，可以继续为 Core Stats 和 Growth Routes 生成同规格 icon。

### 2026-06-03 02:05

- 类型：视觉资源 / 前台 / Growth Routes banners
- 改动：生成一张 2x2 成长路线方形 sheet，保存为 `public/life-os-growth-routes/growth-routes-sheet.png`，并裁切成 4 张 `1024x1024` 的 `1:1` banner：`strategist-route.png`、`creator-route.png`、`wanderer-route.png`、`architect-route.png`；新增 `lifeOsGrowthRouteBanners` 并接入 `/life-os` 的 `成长路线 Skill Tree` 四张卡片。
- 原因：用户要求沿用同样方法，为策略师路线、创作者路线、流浪者路线、系统架构者路线制作 `1:1` banner。
- 影响：Growth Routes 从纯文字路线卡升级为带路线守护视觉的 RPG Skill Tree 卡片，四条路线的主题更容易一眼区分。
- 后续：如果要继续统一，可以为这 4 条路线再补一组同风格小 icon，或把路线卡做成点击展开式节点树。

### 2026-06-03 02:09

- 类型：代码 / 前台 / Life OS radar panels
- 改动：新增通用 `LifeOsRadarPanel` SVG 组件，并把 `/life-os` 的 `隐藏参数` 与 `核心属性` 从条形进度条改成 radar 面板；数值、名称和说明保留在旁边的说明卡里。
- 原因：用户要求核心属性和隐藏参数也变成 radar，和首屏人格能力地图的 RPG HUD 表达保持一致。
- 影响：核心属性、隐藏参数现在都以雷达图呈现，页面的游戏角色档案感更统一，同时没有删掉原本的解释内容。
- 后续：如果要进一步统一，可以把首屏旧手写 radar 也迁移到同一个 `LifeOsRadarPanel` 组件。

### 2026-06-03 02:15

- 类型：代码 / 前台 / Life OS mobile UI
- 改动：优化 `/life-os` 手机端排版：收窄页面外边距和卡片 padding，压缩 dropdown header，高度较低的手机 banner 比例改为 `16:9`，Loadout 竖图在手机改为更短的 `4:5`，radar 面板增加最大宽度，Growth Routes 在手机改为图片 + 内容的横向小卡。
- 原因：用户要求页面更符合手机 UI，不要把桌面布局直接堆到手机上。
- 影响：手机端首屏、角色解码、技能区、成长路线和数值说明更紧凑，减少单张图片或单个卡片占满整屏的问题，同时保留桌面端原本的信息密度。
- 后续：如果继续优化，可以把 Active Skills 做成手机端横向 swipe 或每张技能卡内的字段折叠。

### 2026-06-03 02:20

- 类型：代码 / 前台 / Life OS game skill UI
- 改动：将 `/life-os` 的技能区改成更接近手机游戏的排版：Active Skills 变成横向滑动技能卡牌，卡面显示技能图、等级、类型和摘要，点击展开 Cost / Effect / Scene / Side Effect；Passive Skills 改成 icon grid，点击展开触发、效果和风险；Debuff 改成 Shadow Debuff 诅咒档案列表；Growth Routes 改成路线守护图 + 竖向节点 Skill Tree。
- 原因：用户要求执行更好看的手机游戏技能界面方案，而不是普通网页卡片堆叠。
- 影响：技能模块的默认信息量更轻，手机端更像 RPG / gacha 角色详情页；完整说明仍保留在点击展开内容里。
- 后续：如果要继续强化手游感，可以增加真正的 tab 状态切换、底部弹出详情面板或技能 rarity 边框动画。

### 2026-06-03 02:25

- 类型：代码 / 前台 / Life OS page UIUX logic
- 改动：重新整理 `/life-os` 整页阅读逻辑，将页面从普通长网页改成手机 RPG 角色档案流程：首屏角色状态后新增 `Game Menu`，并把内容锚定为四个章节：`Character File`、`Stats Console`、`Skill Codex`、`Upgrade Path`；`LifeOsDropDown` 从 `SYSTEM` 改为 `CHAPTER`，新增锚点 id；手机端新增固定底部导航，可快速跳到四个章节。
- 原因：用户要求不只调整技能区，而是重新设计整个页面的 UIUX 逻辑。
- 影响：页面现在有明确的游戏式进入顺序：先角色状态，再选择章节，再按档案、数值、技能、升级路线阅读；手机端不需要只靠长滑动寻找内容。
- 后续：如果继续深化，可以把四个章节改成真正的 tab 页面状态，而不是锚点 + 折叠章节。

### 2026-06-03 02:31

- 类型：代码 / 前台 / Stats Console hierarchy
- 改动：将 `/life-os` 的 `核心属性` 和 `隐藏参数` 降低视觉比重：`LifeOsRadarPanel` 新增 compact 模式，两个区块的 radar 缩小到更紧凑尺寸；属性说明从大卡片改成小型数值 chip，只保留 key、名称和数值，完整说明保留在 title tooltip。
- 原因：用户反馈核心属性和隐藏参数可以缩小比重，避免 Stats Console 抢走技能和成长路线的主视觉。
- 影响：数值仍保留，但阅读负担和页面占高降低，整体重心更偏向角色档案、技能图鉴和升级路线。
- 后续：如果还要再弱化，可以把核心属性和隐藏参数合并成一个可展开的 `Stats Appendix`。

### 2026-06-03 02:35

- 类型：代码 / 前台 / Dark mode contrast fix
- 改动：根据用户截图修正 `/life-os` dark mode 下技能展开内容的亮色问题：Debuff 的负面效果块从 `bg-rose-50` 改为中性 `bg-stone-50`；Active Skill 与 Debuff 的展开状态 badge 从 `eden-mint` / `eden-amber` 强调亮底改成 `stone-800/900` 暗底；`index.css` 新增 dark mode 下 `bg-rose-50`、`bg-red-50`、`bg-orange-50`、`bg-amber-50` 的暗色兜底映射。
- 原因：用户指出 dark mode 不应看到亮色块，截图里粉色负面效果块和蓝色 `!!` badge 过亮。
- 影响：暗色模式下展开技能、Debuff 和未来浅色警告块时，不会再出现刺眼的浅粉、浅红、浅橙、浅 amber 底色。
- 后续：如果还有其他局部亮色，可以继续按截图定位并加入同类 dark-mode token 映射。

### 2026-06-03 02:43

- 类型：代码 / 前台 / Skill Tree mobile alignment
- 改动：修正 `/life-os` 的 Growth Routes / Skill Tree mobile banner 对齐问题：移动端路线图容器从比例自适应改为固定 `h-36`，图片统一 `object-cover object-center`，底部标题遮罩增加 `min-h-[72px]`，桌面端仍维持方形图。
- 原因：用户反馈策略师路线、创作者路线 banner 在 mobile view 看起来不整齐。
- 影响：四条成长路线在手机端 banner 高度和标题区更一致，不会因为图片主体或文字长度不同造成视觉错位。
- 后续：如果还需要更精细，可以为每张图单独设置 `object-position` 微调主体位置。

### 2026-06-03 02:46

- 类型：代码 / 前台 / Skill Tree banner ratio
- 改动：将 `/life-os` Growth Routes / Skill Tree 的 mobile banner 从固定高度 `h-36` 改为 `aspect-square`，让手机端也使用 `1:1` 方形图；保留 `object-cover object-center` 和固定标题遮罩高度。
- 原因：用户询问 mobile banner 比例是否可以改成 `1:1`。
- 影响：四条成长路线在 mobile 与 desktop 都统一方形视觉，更符合原本生成的 `1:1` route banner 资产。
- 后续：如果个别图主体仍偏上或偏下，可单独配置每条路线的 object-position。

### 2026-06-03 02:56

- 类型：代码 / 前台 / Life OS layout simplification
- 改动：重新收简 `/life-os` 的上半页排版：移除首屏的系统标签组，删除 Chapter 01 里的目录说明与系统界面模块，并从源码移除 `lifeOsDirectorySections` 与 `lifeOsSystemModes`；首屏雷达标题改为「能力雷达」，角色序章改成更直接的 `Character Brief`，保留角色背景、任务简报和四个角色设定 chip。
- 原因：用户要求重新设计整体排版，并明确移除「人格能力地图、内在天赋系统、成长路线图、黑暗幻想 + 数据 HUD、古老系统 + 现代界面」这组内容。
- 影响：页面不再像在解释系统概念，而更像直接打开 RPG 角色档案；入口更短，视觉重心回到角色、技能和成长路线。
- 后续：如果还要进一步压缩，可以把 Chapter 01 默认打开，其他章节默认折叠，让首屏后的路径更短。

### 2026-06-03 03:00

- 类型：代码 / 前台 / Life OS contrast tuning
- 改动：降低 `/life-os` 首屏角色设定 chip 的对比度，将 `bg-white/70` 高亮底改为 `bg-stone-950/10` 低透明暗面板，边框改为 `border-stone-300/40`，主文字从 `text-stone-800` 降为 `text-stone-700`。
- 原因：用户根据截图反馈这组 chip 对比度太高。
- 影响：dark mode 下这 4 个设定块不再像亮色按钮，和整体背景融合度更高。
- 后续：如果还觉得明显，可进一步降低边框透明度或改成无边框 HUD 行。

### 2026-06-03 03:07

- 类型：代码 / 前台 / Life OS theme surface
- 改动：将 `/life-os` 首屏角色设定 chip 从固定 `bg-stone-950/10` 改为 `life-os-identity-chip` 主题样式；light theme 使用柔和半透明浅底，dark theme 使用低透明暗面板。
- 原因：用户反馈 light theme 不应出现 dark color block，dark mode 也不应出现亮色块。
- 影响：同一组 chip 现在会跟随 light / dark theme 分别取色，避免为了压低 dark mode 对比度而污染 light theme。
- 后续：如果其他组件也出现同类主题错配，继续抽成语义 class，不再直接复用单一明暗 utility。

### 2026-06-03 03:12

- 类型：代码 / 前台 / Life OS menu and radar theme surface
- 改动：将 `/life-os` 的 Game Menu、首屏 Ability Radar、隐藏参数 Radar、核心属性 Radar 从固定深色背景改为主题自适应 surface；新增 `life-os-game-menu`、`life-os-game-menu-card`、`life-os-radar-frame`、`life-os-radar-grid` 样式，并让 radar SVG 的网格、文字和中心数值随 light / dark theme 切换。
- 原因：用户指出 light theme 下 Game Menu 和 radar 背景仍是 dark color。
- 影响：light theme 下这些区域不再出现黑色暗块，dark theme 下仍保留 RPG HUD 的深色质感。
- 后续：如果后续发现其他固定 `bg-stone-950` 区块也需要跟随主题，可继续迁移成语义 surface class。

### 2026-06-03 03:18

- 类型：代码 / 前台 / Life OS skill and route theme surface
- 改动：将 `/life-os` 的 Active Skills、Passive Skills、Debuff System、Growth Routes Skill Tree 从固定深色卡片改为主题自适应 surface；新增 `life-os-codex-card`、`life-os-skill-tabs`、`life-os-card-footer`、`life-os-route-card`、`life-os-route-badge`、`life-os-image-overlay`、`life-os-route-overlay` 等样式，并同步修正共用横幅、图标框、角色图框和 mobile bottom nav 的浅色主题黑底残留。
- 原因：用户指出这些模块在 light theme 下仍有大量 dark color。
- 影响：light theme 下技能卡、被动技能、Debuff、成长路线不再出现大面积黑色区块；dark theme 下仍保留深色 RPG HUD 质感。
- 后续：其他非 `/life-os` 页面若也需要完全移除 light theme 深色按钮，可按同样方式继续迁移。

### 2026-06-03 03:20

- 类型：代码 / 前台 / Life OS airy layout
- 改动：为 `/life-os` 根容器新增 `life-os-open-layout`，隐藏 HUD 角线、motion-card 扫光、radar 背景网格，并在页面范围内透明化大部分 border、box shadow、白底、浅灰底和 mint/amber 轻底；保留内容、图片和必要的文字渐层。
- 原因：用户要求把线条设计和 box 感拿掉，让页面感觉更空。
- 影响：Life OS 页面从密集 HUD 卡片感转为更开放的档案式排版，视觉负担降低，light / dark theme 都不再以大量线框和盒子区隔内容。
- 后续：如果仍觉得某些模块太实，可以继续把 section padding 缩小或把 dropdown 外壳也改成纯标题锚点。

### 2026-06-03 03:23

- 类型：代码 / 前台 / Life OS mobile horizontal lock
- 改动：移除 `/life-os` mobile 下 Game Menu 与 Active Skills 的横向 `overflow-x-auto` / `snap-x` / `min-w` 卡片布局，改成普通 grid；为 `life-os-open-layout` 增加 `overflow-x: hidden`、`overscroll-behavior-x: none`、`touch-action: pan-y` 与主要容器 `max-width: 100%` 限制。
- 原因：用户要求 mobile view 不能左右移动。
- 影响：Life OS 手机端现在只允许垂直滚动，不再出现横向拖动或页面左右晃动。
- 后续：如果其他页面也需要同样锁定横向滚动，需要单独处理对应路由，避免影响原本需要横向浏览的内容区。

### 2026-06-04 17:11

- 类型：代码 / 前台 / Life OS line removal
- 改动：继续清理 `/life-os` 的剩余线条，将 radar SVG 内的 line、polygon、circle 描边设为透明，并隐藏 Level 区域的横向进度条；保留文字、数值、图片和雷达填色。
- 原因：用户要求 Life OS 把全部线条移除。
- 影响：页面不再显示 radar 网格/轴线/描边和进度横线，整体更空、更少 UI 框架感。
- 后续：如果仍有某些图片内部自带线条，那属于图像资产本身，需要重新生成或替换对应图片。

### 2026-06-04 17:14

- 类型：文档 / Skill / Apple editorial layout
- 改动：新增 `skills/apple-editorial-layout/SKILL.md`，将 Apple.com 的高层页面排版、字体大小、行高、间距、CTA 和产品网格逻辑整理成可复用 skill；同步在 `AGENTS.md` 与 `soul.md` 登记该 skill 的使用场景和限制。
- 原因：用户要求参考 Apple.com 的排版设计逻辑和字体大小使用逻辑，做成一个 skill。
- 影响：后续在处理 Apple-like、premium minimalist、字体层级、hero 排版和高级感页面时，可以直接读取该本地 skill，避免重复解释。
- 后续：如果要实际应用到 `/life-os` 或主页，需要再按该 skill 进行页面重排与字体 scale 调整。

### 2026-06-04 17:20

- 类型：代码 / 前台 / Life OS Apple editorial redesign
- 改动：根据 `skills/apple-editorial-layout/SKILL.md` 重排 `/life-os`：首屏改成大标题、短副标题、两个文字 CTA 和大角色视觉；旧三栏 hero、Game Menu、首屏 radar 和 mobile bottom nav 移除；`LifeOsDropDown` 改为直接展开的 editorial section；新增 Life OS 专用 typography / spacing CSS，强化 hero、section、card 的字体层级与留白。
- 原因：用户要求根据 Apple editorial layout skill 重新设计 Life OS 页面。
- 影响：页面阅读逻辑从游戏 HUD/折叠面板转为更接近高级产品页：先说明是什么，再进入章节，减少 box、线条、按钮和视觉噪音，手机端也不再依赖横向滑动或底部游戏导航。
- 后续：如果要继续更像产品页，可以把 Active Skills 的 details 展开方式也改成完整分段叙事，进一步减少交互式卡片感。

### 2026-06-04 17:23

- 类型：代码 / 前台 / Life OS dark mode light surfaces
- 改动：为 `/life-os` 增加 dark mode 专用覆盖，让 `bg-white`、`bg-stone-50`、radar frame、skill cards、route cards、banner frame 等元素在 dark mode 下使用浅雾面 surface，并将这些浅色区域内的 stone 文本切回深色。
- 原因：用户反馈 Life OS dark mode 里仍有深色 element，希望像 Choose a chapter、radar background 这类区域换成浅色。
- 影响：Life OS 在 dark mode 下不再出现大块深色 UI 元素，整体更接近 Apple editorial 的浅色内容浮层。
- 后续：如果图片本身或生成素材内部过暗，需要单独重新生成对应图片资产。

### 2026-06-04 17:26

- 类型：代码 / 前台 / Life OS dark mode title contrast
- 改动：收窄 `/life-os` dark mode 的文字颜色覆盖范围：浅色浮层内继续使用深色文字；hero、chapter intro 和 editorial nav 这类透明深色背景上的标题与说明恢复浅色文字。
- 原因：用户反馈 dark mode 的 title 变黑后和背景撞色。
- 影响：dark mode 下主标题、章节标题和导航文字重新可读，同时浅色卡片里的文字仍保持深色对比。
- 后续：如果还有个别标题撞色，优先按“是否在浅色浮层内”来分层修正，而不是全局覆盖。

### 2026-06-04 17:28

- 类型：代码 / 前台 / Life OS dark radar and image fade
- 改动：在 `/life-os` dark mode 中将 radar frame 从浅雾面覆盖里排除，恢复深色背景；将 banner/image/route overlay 的 fade 恢复为黑色渐层，并补充这些黑色 fade 区域内的浅色文字规则。
- 原因：用户希望 dark mode 的 radar 和 image shadow fade 可以用回黑色。
- 影响：dark mode 保留 Apple editorial 的浅色内容浮层，同时 radar 与图片阴影恢复深色层次，视觉更有深度。
- 后续：如果某些 banner 的黑色 fade 盖住主体，可以单独调对应 overlay 透明度。

### 2026-06-04 17:30

- 类型：代码 / 前台 / Life OS dark active skill title
- 改动：为 Active Skills 图片底部标题区域新增 `life-os-active-skill-copy` class，并在 `/life-os` dark mode 下将该区域的技能名与说明文字设为浅色。
- 原因：用户反馈 dark mode Active Skills 的 name title 也需要放亮色。
- 影响：Active Skills 卡面在黑色 fade 上的技能名和说明重新可读，展开详情区域仍维持浅底深字。
- 后续：若其他图片卡的标题也有同类问题，可复用同样的 copy wrapper 规则。

### 2026-06-04 17:32

- 类型：代码 / 前台 / Life OS light image fade
- 改动：将 `/life-os` light mode 下的 banner caption、image overlay、route overlay 从浅色渐层改回黑色渐层，并补充 overlay / active skill copy 区域的浅色文字规则。
- 原因：用户要求 light mode 的 banner / image / route shadow fade 也用回黑色渐层。
- 影响：light 与 dark mode 的图片底部 fade 视觉统一为黑色，图片标题和说明在 fade 上保持可读。
- 后续：如果某张图过暗，可单独降低 overlay opacity。

### 2026-06-04 18:34

- 类型：代码 / 前台 / Jiju.pet page redesign
- 改动：将 `/jiju-pet` 从旧的项目介绍和横向章节卡片，重排为新品牌风格的 editorial product-build page；新增 hero、product system panel、What it becomes、Decision DNA、System notes 与垂直 Build log。
- 原因：用户要求重新排版 `http://localhost:4180/jiju-pet`。
- 影响：页面更像一个产品案例和系统构建叙事，阅读顺序更清楚，减少旧式卡片堆叠和横向滑动。
- 后续：如果有真实 Jiju.pet 产品截图或界面资产，可以再加入 hero 或 feature section 作为视觉证明。

### 2026-06-04 19:39

- 类型：代码 / 前台 / Life OS surface color
- 改动：将 `/life-os` 的白色与亮色 box surface 改为低透明暗雾面；同步调整 dark mode 下 motion card、skill card、route card、footer 和 banner frame 内文字为浅色。
- 原因：用户反馈 Life OS 的背景 box 不要使用白色或亮色。
- 影响：Life OS 不再出现大面积亮白浮层，整体更接近暗色 RPG 档案与低对比界面。
- 后续：如果仍有图片素材本身太亮，需要单独替换对应图片资产。

### 2026-06-04 19:44

- 类型：代码 / 前台 / ETReportHub sales page
- 改动：新增 `/etreporthub-sales` 售卖页，围绕客户为什么应该购买 ETReportHub 展开：日报人工成本、Excel 风险、CRM-ready 数据层、交付内容、购买结果、FAQ 与价格；价格设为 RM960/月或 RM19,888 买断。
- 原因：用户要求为 ETReportHub 开多一个售卖页面，说明为什么 client 应该买这个系统，并加入指定价格。
- 影响：ETReportHub 现在有产品说明页 `/etreporthub` 和销售落地页 `/etreporthub-sales`；`/projects` 与 `/etreporthub` 都加入售卖页入口，并同步 SEO、sitemap 路由与 README。
- 后续：如果要公开销售，可以再补 demo 截图、真实部署范围、support SLA、hosting 责任和付款方式。

### 2026-06-04 19:48

- 类型：代码 / 前台 / ETReportHub sales content refinement
- 改动：参考 `Daily Report/docs/sales/sales_daily_report_offer.html` 扩充 `/etreporthub-sales`：加入 2-4 小时/天 proof、ROI 估算、RM2,880 首期、7.3 个月买断回本估算、Savings map、Included stack 与 Demo flow。
- 原因：用户要求参考本地 Daily Report sales offer 页面内容。
- 影响：售卖页从基础价格说明升级为完整销售论证页，更清楚说明客户为什么买、买了省什么、系统包含什么，以及 demo 时应该展示什么 workflow。
- 后续：如果需要更接近原 HTML，可以再加入互动 ROI calculator 输入框，但当前版本先用静态保守估算，减少复杂度。

### 2026-06-04 20:13

- 类型：代码 / 前台 / ETReportHub sales stack cleanup
- 改动：移除 `/etreporthub-sales` 的 Demo flow section；扩充 Included stack，从 8 项增加到 16 项，加入 Trend Analysis、Brand Comparison、Segment Analysis、Wide Excel Export、Database Backup、User Permission、Audit Log、Private Deployment 与 Training & Handover。
- 原因：用户要求移除“Demo 不要只展示 UI，要展示从 Excel 到行动”section，并让 Included stack 内容更多。
- 影响：售卖页更聚焦系统交付内容和购买理由，不再出现 demo 展示建议；Included stack 更完整，客户能更清楚看到买到的 BO operating stack。
- 后续：如果之后要加 demo 内容，建议放到内部销售话术或独立 demo guide，不放在公开售卖页主流程。

### 2026-06-04 20:19

- 类型：代码 / 前台 / ETReportHub sales spacing
- 改动：调整 `/etreporthub-sales` 的 Apple-like 横向留白：页面主容器从 6xl 收窄到 5xl，section 标题居中收窄，sales card grid 改为 2-column 节奏，表格、ROI 和模块区设置更窄的居中 max-width。
- 原因：用户指出 Apple 的左右空间感很空，希望售卖页不要铺得太满。
- 影响：售卖页左右留白更明显，阅读节奏更像产品落地页，内容仍保留完整 Included stack 和价格论证。
- 后续：如果还觉得密，可以继续减少卡片数量或把 Included stack 改成分组 accordion。

### 2026-06-04 20:22

- 类型：文档 / 品牌规则 / Apple-like horizontal whitespace
- 改动：将 Apple-like 左右留白规则加入 `/brand-guide` 的 Type and rhythm；同步更新 `skills/apple-editorial-layout/SKILL.md`、`AGENTS.md` 和 `soul.md`，明确未来页面不要默认铺满桌面宽度，优先使用居中内容岛与两栏 grid。
- 原因：用户要求把“左右空间感调得更 Apple-like”加入 brand guide，并让以后其他页面都跟随。
- 影响：未来改首页、项目页、Life OS、ETReportHub 或其他页面时，默认要检查 desktop 横向留白、内容岛宽度、表格/价格/grid 是否过度铺满。
- 后续：如要把现有所有页面一次性统一套用该规则，需要逐页检查并重排，避免破坏已有视觉结构。

### 2026-06-04 21:30

- 类型：文案 / 前台 / Friday Poker Club — Story log
- 改动：在既有「江湖局」叙事风格下优化 `App.tsx` 的 `pokerStoryIntro` 与两则 `pokerStories`（2024-05-26 婚礼、2026-05-28 river 之夜），中英同步重写。强调这页只是记录值得记住的时刻，不是战绩榜；婚礼那则点明黑胡子团长与静默之盾结婚是整桌的中心、后续每场牌都绕此而转；river 那则改写成逐拍电影感：被罩住的王整夜在 river 接命运、做出顺子 all-in，对上不想继承的太子三条 A，本已赢的一手被 river 第四张配对翻成太子葫芦；收尾保留赌博之王/被罩住的王/太子三国鼎立，以及不要脸浪人 5 块进散钱平分局、转身赚 40 块的镜头。
- 原因：用户说明这个 poker app 的本意是分享日常、记录好玩的时刻，要求按真实事件用页面既有居中内容岛的语气与风格优化故事剧情。
- 影响：`/poker` 的 Story log 区可读性与电影感增强，全部真实关键信息（人物、牌型、金额、日期）保留未删；中英文案一致。
- 验证：`npx vite build` 通过（2082 modules transformed，✓ built），并在产物 bundle 中确认新文案字串存在。默认 `npm run build` 因 dist/.DS_Store（macOS 挂载，沙箱无法 unlink）报 EPERM，与本次改动无关；本地验证用 `http://localhost:4180/poker`，看 Story log 两则故事。
- 后续：若日后有新的牌局值得记录，按同一风格在 `pokerStories` 追加条目即可；沙箱遗留的 `dist_verify/` 验证目录可在本机手动删除（不影响部署，CI 仅构建 `dist`）。

### 2026-06-04 22:10

- 类型：文案 / 前台 / Friday Poker Club `/poker` 整页改写（去专业化）
- 改动：把 `/poker` 从「SaaS 产品落地页」改成「自己人桌」的轻松风格。删除技术/作品集相关三节——Skill proof（实时构建能力）、Who it is for（受众）、Questions（FAQ），以及顶部 Product promise console 面板（Firebase RTDB 等技术行）；同步删掉对应数据 `pokerConsoleRows / pokerSkillProof / pokerAudience / pokerFaq`。Hero 改成「周五夜，还是那群人，现在装进一条链接里 / Friday night, same crew, now in a link.」，CTA 精简为 开一局 / 认识这群人 / 看桌上故事。保留并口语化两节：How it works（一条链接就能打 / 没人在线 Bot 陪你 / 开麦就是真桌）、What you can do（真德州 / Bot 随时 / 公开桌 / 8/9 边注），全部去掉代码细节（normalizePokerState、`max(200,BB×100)`、Firebase 规则等）。结尾改成「别光看了，开一局吧 / Stop reading. Open a hand.」，保留筹码非真钱的提示但写成人话。
- Story log：人物改用小名（中英都改）——团长 / 阿盾、罩仔、太子、赌仔、浪子；EN：Cap、Shield、Lucky、Prince、Gambler、Drifter。避免全名过于「中二」。婚礼与 river 两则故事维持之前的精简电影感版本。Avatar guide 角色卡仍保留完整称号（那是人物档案，全名在此合理）。
- 原因：用户说这个 poker app 本意是分享日常、记录好玩时刻，不要太专业，要有内容感但放松；并要求 story log 人名简化为小名（中英一致）。经确认：技术/作品集块全部砍掉，语气完全放松。
- 影响：`/poker` 现为 Hero → 怎么玩 → 桌上能干嘛 → 认识这群人 → 桌上故事 → 开一局，整体轻松好读，无技术推销腔；`ETReportHubFullPage` 的 Skill proof 等为另一页，未受影响。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ built in 7.24s），bundle 中确认新文案存在、`normalizePokerState` 已移除。默认 `npm run build` 仍因 dist/.DS_Store（macOS 挂载，沙箱无法 unlink）报 EPERM，与改动无关。本地验证：`http://localhost:4180/poker`，中英各看一遍。
- 后续：若希望 story log 小名与角色卡全名能对上，可在每张角色卡加一行小名标注；本机可手动删除沙箱遗留的 `dist_verify/`、`dist_check_*` 验证目录（不影响部署）。

### 2026-06-04 22:40

- 类型：文案 / 规则 / brand-guide 新增「06 / Story style」+ AGENTS.md 同步
- 改动：在 `/brand-guide` 末尾（05 Application 之后）新增 `06 / Story style` 区，把 `/poker` Story log 用的语气固化成可复用规则。新增数据 `brandGuideStoryRules`（6 条：记录时刻不是战绩 / 只写真的 / 用小名别中二 / 短但有画面 / 先有人再有牌 / 不是 hand history）与一组 Avoid→Prefer 示例 `brandGuideStoryExample`（被罩住的王…→罩仔…）。section 标题「故事是用来记住好玩的，不是用来炫耀的 / Stories are for remembering the fun, not for flexing.」并指明 `/poker` 为样板。复用现有 `brand-guide-use-card` 与 `brand-guide-voice-row` 样式，保持两栏居中节奏。同步在 `AGENTS.md` 的 Writing Rules 下加「Story Style」小节，注明与 brand guide section 06 互为同步。
- 原因：用户要求「写多一个 story style guideline 然后加在 brand guideline 上」。
- 影响：以后任何 story log（牌桌 / 生活 / 日常）都有统一、可引用的语气标准；规则同时落在前台 `/brand-guide` 和 schema `AGENTS.md`，避免漂移。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ built in 8.24s），bundle 中确认 06/Story style 全部条目与 Avoid/Prefer 示例存在。默认 `npm run build` 仍因 dist/.DS_Store EPERM 报错（macOS 挂载，与改动无关）。本地验证：`http://localhost:4180/brand-guide` 拉到底看 06 区；样板对照 `http://localhost:4180/poker`。
- 后续：若 story 语气再调整，需同时更新 `/brand-guide` 06 区与 `AGENTS.md` 的 Story Style 小节；本机可手动删 `dist_verify/`、`dist_chk*`、`dist_check_*` 验证目录。

### 2026-06-04 23:05

- 类型：文案 / 前台 / ETReportHub `/etreporthub-sales` 销售讲法口语化
- 改动：只改「销售讲法 / Sales angle」相关文案，改成完全口语（中英）。1) ROI 区那段 `销售讲法：…` 改成「说白了，一天省 2-4 小时…那是把原本烂在 Excel 和拍脑袋决定里的钱捞回来」；2) Included stack 表格里 16 行的 `angle`（Sales angle 列）全部口语重写，例如 CRM Export「CRM 每天有现成名单可以打，不用靠感觉乱找人」、Audit Log「出事了能翻记录查，不用一个个问『是不是你动的』」、Database Backup「不会一夜回到解放前」。模块名、included 内容、价格、ROI 数字、buyer pain、outcomes、savings、FAQ 等全部未动。
- 原因：用户要求把这页「里面的销售讲法内容用口语去解释」；经确认：语气完全放开（像 /poker），范围只改「销售讲法」那几处。
- 影响：`/etreporthub-sales` 的销售话术更像真人在跟老板讲，更易转述；事实、数字、定价与其他区块保持不变，专业信息未受损。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ built in 6.99s），bundle 中确认新口语文案存在。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/etreporthub-sales`，看 ROI 区 sales note 与 Included stack 的 Sales angle 列，中英各切一遍。
- 后续：若日后想把整页其余销售文案也口语化，可在确认语气后再做一轮；本机可删 `dist_verify/`、`dist_chk*` 等沙箱遗留验证目录。

### 2026-06-04 23:25

- 类型：文案 / 前台 / ETReportHub `/etreporthub` #skill-proof 放松语气
- 改动：把产品页 Skill proof 区改得更随意（中英）。h2 从「这个产品也展示 Eden 的构建能力」改成「顺便说，这东西也证明 Eden 真的会 build」；section copy 与 4 张卡（数据架构 / 产品思考 / 运营 UX / 性能工程）全部口语重写，保留全部技术实质（SQLite、snapshot、derived-data cache、Docker/backend、reduced-motion 等），只把腔调从简历体改成像本人在讲：例如产品思考「Daily/Weekly/Overall 其实在干同一件事，干脆收成一个 Performance 页——旧导航还留着，免得有人找不到路」、性能工程「数据一多就加了 cache、只刷新有变动那块…不卡」。
- 原因：用户要求 `/etreporthub#skill-proof` 里的内容也随意一些。
- 影响：产品页 Skill proof 更像真人口吻、可读性更高，技术信息未删；与 `/etreporthub-sales` 销售讲法口语化方向一致。注意：该区为 `ETReportHubFullPage`，与 `/poker` 已删的 skill-proof 无关。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ 2082 modules transformed，✓ built in 8.99s），bundle 中确认新文案存在。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/etreporthub#skill-proof`，中英各切一遍。
- 后续：沙箱遗留的 `verify_*`、`dist_chk*`、`dist_verify/` 验证目录可在本机手动删除（不影响部署）。

### 2026-06-04 23:50

- 类型：文案 / 前台 / `/previous-projects` 工作经历语气放松
- 改动：把职业经历页的措辞从简历体改成平实口语（中英），保留全部事实——公司、职位、年份、relatedLinks 链接、做过的事都没动，只换腔调。页面 h1「完整职业项目记录」→「之前都做过些什么 / Stuff I’ve worked on」，intro 改成「把这些年做过的项目都摊在这里…不堆漂亮话 / …in plain terms, minus the résumé polish」。4 段经历（Titan Group / Job Social / Atlantis / Black Sire）的全部 bullet 重写为人话，如「帮合作伙伴把 API 对接、活动工具、上线培训搞定——出问题就去排查」「Soccerking：内容自己做、品牌策略自己规划、Facebook 数据自己看」。语气对齐 `/etreporthub#skill-proof` 的「放松但仍专业」档，未到 /poker 的玩闹程度（CV 仍是可信度页）。
- 原因：用户要求 `/previous-projects` 的语法也放松一些，延续前几页的口语化方向。
- 影响：经历页更像本人在讲，可读性更高；事实与可信度信息完整保留。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ 2082 modules transformed，✓ built in 10.97s），bundle 中确认新文案存在。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/previous-projects`，中英各切一遍。
- 后续：若希望这页也到 /poker 那种完全放开的程度，可再做一轮；本机可删 `verify_*` 等沙箱验证目录。

### 2026-06-04 00:10

- 类型：文案 / 前台 / `/projects` 页语气放松
- 改动：把 AI build systems 项目页的叙事文案改轻松（中英），事实、项目名、status、System layer、链接全部保留。Hero h1「All builds. One operating logic.」→「Different builds. Same stubborn habit.」，副标题改成「项目不一样，底下其实每次都是同一招：把一团乱的输入，变成真的能用的系统 / …take messy input and turn it into something you can actually use.」。Bundle 区 h2「不是项目列表，是构建系统的切面」→「与其说是项目列表，不如说是我一直在搭的几套系统」，并删掉「参考 Apple One 的页面逻辑」这种内部腔。Project stack h2「四个正在形成系统的项目」→「四个慢慢长成系统的东西」。4 个项目 summary（Jiju / Poker / ETReportHub / CRM）口语重写，如 Poker「想开语音就开」、ETReportHub「把 Excel 吃进去，理进 SQLite…把乱糟糟的一天运营变成…视图」。shared logic 三卡、ETReportHub readout copy、final panel（「旧的留在档案里，正在跑的系统放前台」）一并放松。
- 原因：用户要求 `/projects` 页也轻松一点，延续整站口语化方向。语气取「放松但仍专业」档，与 `/etreporthub#skill-proof`、`/previous-projects` 一致。
- 影响：项目页读起来更像本人在讲，技术信息与项目事实完整保留。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ 2082 modules transformed，✓ built in 11.04s），bundle 中确认新中英文案存在。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/projects`，中英各切一遍。
- 后续：站内主要对外页（poker / etreporthub-sales 销售讲法 / etreporthub skill-proof / previous-projects / projects）已统一到口语调；若要把首页 `/` 和 jiju-pet、life-os 等也拉齐，可再做一轮。本机可删 `verify_*` 验证目录。

### 2026-06-04 00:40

- 类型：新页面 / 前台 / `/crm` CRM Intelligence System（疯狂语气）
- 改动：新增 `/crm` 路由与 `CrmFullPage` 组件（App.tsx，插在 PokerFullPage 之后、AnalogTechFullPage 之前），内容取自用户上传的 CRM LOG.md，用 /poker 那种完全放开、夸张好玩的语气写（中英）。结构：Hero「本来只想要个表格。结果搭了个大脑 / We wanted a spreadsheet. We built a brain.」→ What it ate（console 面板：300+ 供应商、156 商户、约 3,900 加密账号、9 阶段迁移）→ 操作大脑三卡 → 「没人要它做但它就是有的功能」六卡（pgvector AI 供应商搜索 / 九阶段数据库标准化 / 区分大小写的国家解析器「in≠India」/ RBAC+加密+成本费率服务端保密 / 黄金比例设计系统+品牌手册 / 日夜互补换色）→ Build log 戏剧化三则故事（四层模糊匹配救回 400 账号 / 「in=印度」bug / Phase 9c 史上最讲排场的 DELETE）→ 结尾「没有公开链接，住在某台 localhost 上」。复用 etreport/poker 既有 CSS 类，无新样式。
- 路由接线：App.tsx 加 `isCrmFullPage` + render 块、主组件与 ProjectsFullPage 各加 `crmHref`；Projects 页 CRM 卡片加 CTA「看这个疯东西 / See the wild one」（之前该卡无 CTA）。SEO：`seo.ts`、`seo-routes.ts` 各加 `/crm` 条目，`vite.config.ts` SITEMAP_PATHS 加 `/crm`。
- 原因：用户要求给 CRM Intelligence System 也开一个 page，按上传的 log 内容写，语气要「疯一点」。
- 影响：`/projects` 的 CRM 卡片现在可点进 `/crm` 实页；该页是全站第一个「完全放开」语气的产品页（poker 是个人页）。事实取自真实 LOG（数量、9 阶段、pgvector、RBAC、加密、Excel 导入），未编造技术。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ 2082 modules transformed，✓ built in 9.64s），bundle 中确认中英文案与 CTA 存在。sitemap.xml 仅在设了 VITE_SITE_URL 时生成（CI 会），本地未生成属正常。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/crm`（中英各切一遍）；以及 `http://localhost:4180/projects` 点 CRM 卡的新 CTA。
- 后续：CRM 卡 status 仍是「设计中」，与页面「据说还在设计中」口径一致；若日后系统上线有公开/演示入口，可在结尾加真实链接。本机可删 `verify_*` 验证目录。

### 2026-06-04 01:05

- 类型：合规 / 数据脱敏 / `/crm` 移除真实业务数据
- 改动：把 `/crm` 页和其 SEO 里所有真实运营数据脱敏。删除/泛化：实体数量（300+ 供应商、156 商户、约 3,900 账号、6,000 货币）、真实供应商名（AWC、SV388、JDB、SPRIBE）、导入恢复数字（1,157→799、约 400、192 供应商）。console 面板从「业务计数」改为「工程栈」（Postgres / pgvector / RBAC+加密 / 9 阶段迁移）。Hero、三则 build log 故事改为定性描述（「救回整场导入」「一大批行」「一堆自由文本」「几列旧字段」），保留工程趣味与「in=印度」这类纯工程轶事。SEO（`seo.ts`、`seo-routes.ts`）title 去掉「iGaming」，desc 去掉所有计数，改为泛化描述。
- 原因：用户指出不要把 data 的 information 泄漏出去（页面与 meta 原本含真实供应商/商户/账号数量与真实供应商名）。
- 影响：`/crm` 仍是那篇「疯」味产品页，但不再暴露任何可识别的真实业务规模或实体名称；只保留通用工程叙事。注意：站内其他页（services、projects legacy archive）既有的 "iGaming" 提及为 Eden 自己的从业领域、早已公开，未在本次范围内改动。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ built in 8.66s）；bundle 复查：AWC / SV388 / 300+ providers / 156 merchants / 3,900 / saved 400 accounts / 192 providers 全部已不存在；脱敏后文案（We wanted a spreadsheet…、saved the import、One normalized Postgres database 等）仍在。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/crm`，中英各切一遍。
- 后续：如需更保守，可进一步把 “providers / merchants / accounts” 这类实体类别词也一并泛化为「记录」；当前判断这些是通用类别名、非敏感数据，故保留。本机可删 `verify_*` 验证目录。

### 2026-06-04 22:46

- 类型：前台 / CSS / 全站内容岛宽度统一
- 改动：在 `index.css` 新增全站共享变量 `--editorial-island-width: 980px` 与 `--editorial-page-padding: clamp(1.5rem, 7vw, 7rem)`，并把 `page-shell` 下的主要 `main` wrapper、首页 sections/nav 统一限制到同一内容岛宽度。这样 `/projects`、`/jiju-pet`、`/etreporthub`、`/brand-guide`、`/analog-tech`、`/life-os` 等主要页面的左右留白会对齐 `/poker` 的宽度节奏；mobile 仍保持 1.25rem 边距。
- 原因：用户要求让全部页面左右宽度像 `http://localhost:4180/poker` 一样，尤其是 `http://localhost:4180/projects` 不要铺得比 poker 更宽。
- 影响：全站 desktop 页面更统一，主要内容从原本部分页面的 `max-w-6xl` 收回到 poker 同级的约 980px 内容岛；未改文案、路由、SEO 或组件结构。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.16s）；`curl -I http://localhost:4180/projects` 返回 200；构建产物 CSS 中确认包含新的全站宽度规则。Playwright 量宽未执行，因为当前本地 Node REPL 环境没有可用 `playwright` 包。
- 后续：本地验证看 `http://localhost:4180/projects` 对比 `http://localhost:4180/poker`，两页主体内容应有一致的居中窄版宽度和左右留白。

### 2026-06-04 22:52

- 类型：前台 / CSS / 全站背景线条移除
- 改动：在 `index.css` 删除全站背景 texture 里的两层 `repeating-linear-gradient` 横竖线，只保留顶部轻微明暗过渡与原有柔光背景；同步把 `.page-shell::before` 的 `background-size` 简化为单层 `100% 100%`。
- 原因：用户要求把背景的线条设计全部移除。
- 影响：所有使用 `page-shell` 的页面背景不再显示网格/线条纹理，整体更干净；内容宽度、路由、文案和组件结构不变。
- 验证：`rg -n "repeating-linear-gradient" index.css` 已无全站背景 texture 结果；`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.71s）。
- 后续：本地验证看 `http://localhost:4180/projects`、`http://localhost:4180/poker`，背景应只剩干净底色和柔光，不再有横竖线。

### 2026-06-04 23:16

- 类型：前台 / 视觉资产 / `/projects` Jiju.pet app icon 接入
- 改动：把生成的 Jiju.pet 蓝猫 app icon 从 Codex 生成目录复制并压到 512×512，保存为 `public/project-icons/jiju-app-icon.png`；在 `/projects` 的 Project stack 里把该 icon 接到 Jiju.pet 卡片标题右侧；新增 `.projects-card-title-row` 与 `.projects-card-icon` 样式控制图标尺寸、圆角、阴影和响应式布局。
- 原因：用户确认单张 app icon 方向后，要求加进 `http://localhost:4180/projects`。
- 影响：`/projects` 页面中 Jiju.pet 卡片现在有正式视觉识别图标；其他项目卡片未新增未定稿 icon，避免造成四个项目都有完整 icon set 的误导。文案、路由和 SEO 未变。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.97s）；`curl -I http://localhost:4180/projects` 返回 200；`curl -I http://localhost:4180/project-icons/jiju-app-icon.png` 返回 200；生产产物确认 `dist/project-icons/jiju-app-icon.png` 为 512×512 PNG。
- 后续：本地验证看 `http://localhost:4180/projects`，在 Project stack 的 Jiju.pet 卡片标题右侧应看到蓝猫 app icon。

### 2026-06-05 01:56

- 类型：前台 / `/conways-game-of-life` 易经读数层
- 改动：在 256 rules explorer 的右侧 readout 中新增 I Ching layer。Rule 的 8-bit binary 保持原本 elementary CA 逻辑；取中间六位映射成六爻卦象，拆成上卦/下卦三位，映射到八卦（乾、兑、离、震、巽、坎、艮、坤）并显示卦符号、上下卦自然象、阳爻比例、变爻位提示。新增 `I_CHING_TRIGRAMS`、`getIChingTrigram`、`getRuleHexagramBits`、`IChingRuleReadout` 与 `.iching-*` 样式；readout 右栏加宽以容纳易经读数。
- 原因：用户询问是否可以配合易经；采用“解释层 / 读数层”方式，避免把 256 CA rules 硬改成 64 卦。
- 影响：页面现在同时保留科学规则生成和易经象义阅读：左侧是 rule 运行图案，右侧是二进制规则、neighborhood 输出和对应卦象读数。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.85s）；`curl -I http://localhost:4180/conways-game-of-life` 返回 200；代码检查确认 `I_CHING_TRIGRAMS`、`IChingRuleReadout` 与 `.iching-rule-*` 样式存在。
- 后续：本地验证看 `http://localhost:4180/conways-game-of-life`，右侧 readout 下方应出现易经读数、六爻线、上卦/下卦和变爻位。

### 2026-06-05 01:54

- 类型：前台 / `/conways-game-of-life` brand guide 视觉对齐
- 改动：将 256 rules explorer 的视觉系统对齐 `/brand-guide`：页面背景恢复 Eden ambient texture/light，Conway 页面使用 `--theme-*` token、Stone surface、Eden mint/amber active states；header 改为短 kicker + 大标题 + 一句说明，遵守“一屏一个想法”；主 rule 图保留黑白 pixel artifact，但外层改为浅/深色主题 surface card；readout、neighborhood、featured rules、256 rule index 都从硬黑表格改为品牌卡片、柔和边界、克制阴影和主题色选中态；mobile spacing 也同步收敛。
- 原因：用户询问视觉和页面是否可以根据当前 brand guide。
- 影响：`http://localhost:4180/conways-game-of-life` 现在更像 Eden 品牌系统里的实验工具页，而不是孤立的黑白 demo；仍保留 256 rules 的可运行与可浏览功能。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.93s）；`curl -I http://localhost:4180/conways-game-of-life` 返回 200；代码检查确认 `conway-rules-subtitle`、`conway-rules-copy`、theme token 和 `elementary-rule-index` 样式已更新。
- 后续：本地验证看 `http://localhost:4180/conways-game-of-life`，页面应有 Eden 的 stone 背景、安静内容岛、品牌色选中态和黑白 rule artifact。

### 2026-06-05 01:50

- 类型：性能 / `/conways-game-of-life` 256 rules 渲染优化
- 改动：把 elementary CA 主图和 256 个 rule thumbnail 从“每个像素一个 `<span>` DOM 节点”改为 SVG data URI 背景图。新增 `createElementaryRuleSvgDataUri(rule,width,height,offset)`，由规则生成 SVG rect，再作为 `backgroundImage` 放进单个 `.elementary-rule-grid` div；移除 `.elementary-rule-grid span` 相关 CSS。缩略图 DOM 从约 86,000+ pixel span 降到 256 个 button + 256 个 grid div，主图从 9,216 个 span 降到 1 个 div。
- 原因：用户反馈 `/conways-game-of-life` 有点卡；主要瓶颈是 256 个缩略图同时渲染大量 DOM。
- 影响：页面视觉保持黑白像素规则图，但滚动、切换 rule、Run/Pause 会明显轻很多；主图仍随 generation 运行，缩略图只生成轻量背景。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.69s）；`curl -I http://localhost:4180/conways-game-of-life` 返回 200；代码检查确认 `createElementaryRuleSvgDataUri` 存在，`.elementary-rule-grid span` 已无残留。
- 后续：本地验证看 `http://localhost:4180/conways-game-of-life`，切换 rule 和滚动 256 index 应比上一版流畅；若还卡，下一步把主图更新频率从 720ms 调慢或只在 Run 时更新主图、不刷新 readout。

### 2026-06-05 01:46

- 类型：前台 / `/conways-game-of-life` 256 rules explorer
- 改动：将 `/conways-game-of-life` 从单一黑白 pattern 改成 256 个 elementary cellular automata rules 浏览器。新增 `createElementaryRuleCells(rule,width,height,offset)`，按 Wolfram elementary CA 的 8-bit rule 生成一维元胞自动机图案；页面包含当前 rule 的大预览、Rule 编号、8-bit binary readout、8 个 neighborhood 输出格、Run/Pause、Reset、Rule 30/90/110/184 快捷按钮，以及 16×16 的 256 rule thumbnail index。同步首页 Interests 入口文案、`README.md`、`seo.ts`、`seo-routes.ts`，把页面定位改为 256 elementary cellular automata rules explorer。
- 原因：用户要求根据 `playgameoflife.com` 的可运行体验和 Stanford Game of Life variations 页面里的 1D cellular automata / Rule 30 / Rule 90 / 256 rules 方向，重设 `/conways-game-of-life`。
- 影响：页面现在是可浏览、可选择、可运行的 256 rules 规则索引；仍保持黑白、硬边、扁平像素视觉，不再是单一 Rule 90 图案。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.90s）；`curl -I http://localhost:4180/conways-game-of-life` 返回 200；代码检查确认 `ELEMENTARY_RULE_COUNT`、`ElementaryRuleViewer`、`ElementaryRuleThumb`、`.elementary-rule-index` 与 SEO/README 的 256 rules 描述存在。
- 后续：本地验证看 `http://localhost:4180/conways-game-of-life`，应看到当前 Rule 大图、右侧 binary/rule readout、快捷规则按钮和 16×16 的 256 rules 缩略图索引。

### 2026-06-05 01:40

- 类型：前台 / `/projects` 项目卡工整对位重排
- 改动：把 Project stack 四张卡统一成 `projects-card-identity` 结构：左侧固定为 title + role，右侧固定为 CSS icon slot；移除 Jiju 单独 role-row 的特殊结构，所有卡用同一套左右对立网格。整体项目标题字号收小，卡片左右 padding 从 `clamp(1.55rem, 3.4vw, 2.75rem)` 收到 `clamp(1.35rem, 2.6vw, 2.25rem)`，icon 尺寸由 identity 右列控制，mobile 同步收小。
- 原因：用户截图反馈想要“工整、对立”，当前版本虽然 Jiju role 与 icon 对齐，但四张卡的 icon/title/role 结构不统一，空间感松散。
- 影响：`http://localhost:4180/projects` 的四张项目卡现在以同一套左文右图结构排布，标题不再过大，卡内左右空间更紧，整体更像有网格秩序的产品矩阵。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.92s）；`curl -I http://localhost:4180/projects` 返回 200；代码检查确认 `projects-card-identity`、`projects-card-icon-slot` 与 `projectIcon` 渲染逻辑存在。
- 后续：本地验证看 `http://localhost:4180/projects`，四张卡顶部应呈现统一的“左 title/role，右 CSS icon”对位关系。

### 2026-06-05 01:36

- 类型：前台 / `/projects` Jiju 命名与对齐修正
- 改动：将 `/projects` 项目卡标题从 `Jiju.pet` 改为 `Jiju`；Projects hero、首页 Projects Hub 摘要、`/projects` SEO 描述同步使用 `Jiju`。Jiju 卡片新增 `projects-card-jiju` 与 `projects-card-role-row`，CSS icon 从 title block 移到 role 行右侧，使 `Pet-friendly discovery system / 宠物友好发现系统` 与 CSS icon 在同一行真实对齐；Jiju title block 高度单独收短，减少短标题下方空白。`/jiju-pet` 详情页和域名相关文案未改。
- 原因：用户要求 Jiju.pet rename to Jiju，并指出 Pet-friendly discovery system 要和 CSS icon 对齐。
- 影响：`http://localhost:4180/projects` 的第一张卡现在显示 `Jiju`，role 文案与猫 icon 对齐；其他项目卡排版不受影响。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.85s）；`curl -I http://localhost:4180/projects` 返回 200；代码检查确认 `title: 'Jiju'`、`projects-card-jiju`、`projects-card-role-row` 与 Projects SEO 的 `Jiju` 命名存在。
- 后续：本地验证看 `http://localhost:4180/projects`，Jiju 卡应显示短标题 `Jiju`，下方 role 和 CSS 猫 icon 水平对齐。

### 2026-06-05 01:32

- 类型：前台 / Conway 页面清空 + `/projects` 标题溢出修正
- 改动：`/conways-game-of-life` 页面移除可见标题、说明、控制台、暂停/重置按钮和 64 卦格，只保留黑白 cellular automata pattern 本体居中显示；`/projects` 内容岛扩到 1100px，并给项目卡标题增加分级 class。`ETReportHub` 改为 `ETReport / Hub` 两行排版，CRM 长标题取消窄 `max-width` 并单独收字号，避免 `ETReportHub` 和 `CRM Intelligence System` 冲出卡片。
- 原因：用户要求清掉 Conway's Game of Life 页面内容，同时指出 `/projects` 项目页标题仍有溢出和排版问题。
- 影响：Conway 页面现在是纯图案实验页；Projects 四张卡标题按项目长度排版，长标题不再横向覆盖邻卡或跑出卡片。项目 icon 和正文内容不变。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.63s）；`curl -I http://localhost:4180/conways-game-of-life` 和 `curl -I http://localhost:4180/projects` 均返回 200；代码检查确认 `.conway-pattern-only`、`.projects-card-title-compact`、`.projects-card-title-long` 与 ETReportHub 拆行逻辑存在。
- 后续：本地验证看 `http://localhost:4180/conways-game-of-life` 应只见黑白 CA 图案；看 `http://localhost:4180/projects`，ETReportHub 应拆成两行且 CRM 不应再越界。

### 2026-06-05 01:28

- 类型：前台 / Conway's Game of Life 黑白 CA 纹样试作
- 改动：在 `/conways-game-of-life` 新增 `Pattern study 01` 黑白 cellular automata panel：64 列 × 32 代，共 2048 个 CSS pixel span；规则使用三邻居 elementary CA（Rule 90）生成三角/斜线密纹，再叠六爻节奏做周期翻转。panel 随现有 generation 缓慢更新，视觉更接近用户参考图的黑白织物/规则图方向。
- 原因：用户给出黑白 cellular automata reference，并要求“先来一个先”。
- 影响：原本 64 个 hexagram cell 保留，页面上方多一个高对比黑白 pattern study，可作为后续扩展成多组规则纹样的第一版。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.79s）；`curl -I http://localhost:4180/conways-game-of-life` 返回 200；代码检查确认 `ConwayTextilePattern`、`createConwayTextileCells` 与 `.conway-textile-*` 样式存在。
- 后续：本地验证看 `http://localhost:4180/conways-game-of-life`，在控制台下方应看到第一块黑白像素 CA 纹样；如果方向对，可以继续做多条 vertical strip 或不同 rule 组。

### 2026-06-05 01:25

- 类型：前台 / `/projects` 卡片排版修正
- 改动：重排 Project stack 卡片标题区：标题现在独占整行宽度，CSS icon 改为标题区右下角绝对定位，不再参与文字列宽计算；放大卡片标题字级并改为自然按词换行，避免 `Jiju.pet`、`ETReportHub` 被硬切成碎片；同步 mobile title/icon 尺寸，并微调 role/summary 高度让 system layer 与 action line 继续对齐。
- 原因：用户截图指出大字体没有达到应有效果，项目标题被 icon 列挤压后出现难看的断字。
- 影响：`/projects` 四张主卡的大标题更有视觉重量，Jiju.pet 和 ETReportHub 可保持完整词形，Friday Poker Club 与 CRM Intelligence System 以更自然的单词行形成大字排版；项目 CSS icon 动画和内容不变。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.78s）；`curl -I http://localhost:4180/projects` 返回 200；代码检查确认 `.projects-card-title-row`、`.projects-card-icon`、mobile rules 均已更新。
- 后续：本地验证看 `http://localhost:4180/projects`，Project stack 四张卡的大标题不应再被硬拆，icon 应浮在标题区右下角。

### 2026-06-05 01:21

- 类型：前台 / 新页面 / Conway's Game of Life CSS 易经自动机
- 改动：新增 `/conways-game-of-life` full page，使用 8×8 共 64 个纯 CSS hexagram cell；每格由六条 CSS 爻线组成，阳爻为整条、阴爻为断条，变化爻会闪动。React state 每 1.6s 按 Conway-like 邻居压力演化：每一爻读取 8 个邻居同层阴阳数量，决定下一代阴阳状态。页面包含 generation、阳爻总数、规则状态、暂停/继续和重置控制；支持 light/dark mode，并覆盖全局光斑为更平的实验台背景。首页 Life Notes 区域新增入口。
- 原因：用户要求开一个名为 Conway's Game of Life 的页面，并用 Conway's Game of Life 的方式按易经规则跑 64 个 CSS。
- 影响：站点新增一个可直接访问的交互视觉实验页；SEO、静态 route 清单、sitemap path 和 README 当前路由同步更新。无新增依赖、无图片资产。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.97s）；`curl -I http://localhost:4180/conways-game-of-life` 返回 200；代码检查确认 `App.tsx`、`index.css`、`seo.ts`、`seo-routes.ts`、`vite.config.ts`、`README.md` 均包含新 route。
- 后续：本地验证看 `http://localhost:4180/conways-game-of-life`，应看到 64 个六爻 CSS cell 缓慢演化，可暂停、继续、重置，并可切换浅色/深色。

### 2026-06-04 23:21

- 类型：前台 / 视觉资产 / Jiju.pet app icon 替换
- 改动：用新生成的 App Store 方向蓝猫 icon 覆盖 `public/project-icons/jiju-app-icon.png`，仍保持 512×512 PNG 与原页面引用路径不变。
- 原因：用户看过新版后要求 replace。
- 影响：`/projects` 的 Jiju.pet 卡片自动显示新版大猫头 app icon；React/CSS/文案均未变。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.86s）；`curl -I http://localhost:4180/project-icons/jiju-app-icon.png` 返回 200；生产产物确认 `dist/project-icons/jiju-app-icon.png` 为 512×512 PNG。
- 后续：本地验证看 `http://localhost:4180/projects`，Jiju.pet 卡片应显示新版 App Store 风格蓝猫 icon。

### 2026-06-04 01:45

- 类型：前台 / 首页 Current Build 大 banner 换成 CSS 跑猫动画
- 改动：首页 hero 下方的 `home-hero-visual`（Current Build / Jiju.pet）原本是 `<img src={homeHeroImageSrc}>`（og-image.jpg）静态大图，替换成纯 CSS 动画场景：浅色天空+绿色地面、两朵飘动的云、一只来回奔跑的猫（身体/头/耳/眼/尾/四条腿全用 div+border-radius 拼）。猫用三层嵌套分离动画：`.jiju-cat` 跑动横移（jiju-cross，ease-in-out 来回）、`.jiju-cat-face` 到端点翻转朝向（jiju-face scaleX）、`.jiju-cat-bob` 上下颠（jiju-bob），四条腿两两交替跑动（jiju-leg-a/b），尾巴摆动。保留原本的底部深色渐变 `::after` 与左下角文案（Current Build / Jiju.pet / Pet-friendly discovery, starting from Penang.）。加了 `prefers-reduced-motion` 媒体查询：减少动态时全部停下、猫静止站立。删除不再使用的 `homeHeroImageSrc` 常量。CSS 全部加在 `index.css`（紧跟 .home-hero-visual 相关规则之后）。
- 原因：用户希望首页 Current Build 的大 banner 从静态图换成「一只猫跑来跑去」的 CSS 动画，呼应 Jiju.pet 的宠物主题、也减少首页的扁平感。
- 影响：首页主视觉更有生气、更贴合 Jiju.pet 品牌；纯 CSS 无新依赖、无图片请求（少一张 og-image 大图加载）；reduced-motion 用户看到静止画面。`scene` 容器标了 `aria-hidden`，文案仍可被读屏。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ 2082 modules transformed，✓ built in 9.16s）；产物 CSS 含 `jiju-cat-scene` 与 `@keyframes jiju-cross`，JS 含猫的 DOM 结构；`homeHeroImageSrc` 已无残留引用。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/` 首页第一屏 hero 下方的 Current Build banner，应看到一只猫在场景里来回跑、转身、尾巴摆、腿交替。
- 后续：如要更精致，可加爪印拖尾、奔跑时的小尘土、或让猫偶尔停下舔毛；也可把猫颜色做成主题色变量。本机可删 `verify_*` 验证目录。

### 2026-06-04 02:05

- 类型：前台 / 首页跑猫场景 dark mode 配色 + 9 个小细节
- 改动（dark mode）：给 `.jiju-cat-scene` 加 `:root[data-theme="dark"]` 夜间配色——天空深蓝渐变（#161d2e→#1e2740→#1b2a2a）、地面暗绿、云更暗、猫从深色 #4a4640 翻成奶白 #e8dec9（腿 #cdc1a6、眼改深色 #2a2620），保证夜间可读。
- 改动（9 个细节，纯 CSS）：1) 奔跑小尘土（脚下 puff 上升淡出 jiju-dust）；2) 爪印拖尾（地面 4 个 paw 错峰淡入淡出 jiju-paw）；3) 偶尔停下舔毛（到右端转身时 head 微低头 jiju-groom-head + 粉色舌头闪现 jiju-lick，借 ease-in-out 转身near-zero 速度近似「停一下」）；4) 眨眼（jiju-blink scaleY）；5) 胡须（head 上两根 whisker，亮/暗模式反色）；6) 蝴蝶（上方飞过 jiju-fly + 翅膀拍动 jiju-flap）；7) 摇曳小草（地面 3 丛 jiju-sway）；8) 飘落叶子（jiju-leaf-fall 旋转下落）；9) 太阳/月亮（角落 jiju-sun，dark 模式变月亮 + 3 颗星 jiju-twinkle，light 模式星星隐藏）。全部加进 `prefers-reduced-motion` 关停列表。CSS 全在 `index.css` cat 区块后；JSX 在 `home-hero-visual` 场景里加对应 span/div（仍 `aria-hidden`，文案不受影响）。
- 原因：用户要 dark mode 换色，并要加「小尘土 / 舔毛 / 爪印拖尾」外加 6 个不同小细节。
- 影响：首页主视觉白天/夜间各一套配色，且有 9 处细节让场景更有生气；纯 CSS、无图片、无依赖；reduced-motion 用户看到静止画面。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ 2082 modules transformed，✓ built in 8.47s）；产物 CSS 含全部 9 类样式与 jiju-lick/jiju-blink 等关键帧及 `data-theme=dark` 配色，JS 含新 DOM（butterfly/tongue/paw/sun）。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/` 首页 Current Build banner；切 Day/Night 看两套配色，留意尘土、爪印、转身舔毛、眨眼、胡须、蝴蝶、小草、落叶、太阳/月亮+星星。
- 后续：如某个细节太抢戏可单独调透明度/频率；本机可删 `verify_*` 验证目录。

### 2026-06-04 02:20

- 类型：前台 / 首页跑猫动画「性格」调淡（从活泼到悠闲）
- 改动：放慢节奏、收小幅度，让猫从「冲来冲去」变成「慢悠悠散步」。横移 jiju-cross 7s→17s（同步把 jiju-face 朝向、jiju-groom-head 低头舔毛、jiju-lick 舌头、4 个 jiju-paw 爪印延迟都改到 17s 并重排时序）；腿 jiju-leg 0.28s→0.52s 且摆幅 30°→15°、改 ease-in-out；身体 bob 0.28s→0.55s、幅度 -3px→-1.5px；尾巴 0.6s→1.4s、摆幅 -12/20°→-6/10°；尘土更淡更慢（0.5s→0.95s、opacity 0.5→0.32、上升/缩放更小）；爪印关键帧收紧成短暂淡入淡出（每个约 4–5s 内消失）；环境也放缓——蝴蝶 13s→19s、落叶 9s→14s。眨眼、胡须、太阳/月亮+星星不变。reduced-motion 行为不变。
- 原因：用户觉得猫太活泼，要性格更安静。
- 影响：同一只猫、同样 9 个细节，但整体观感从「亢奋奔跑」变成「悠闲踱步、偶尔停下舔毛」，更耐看、更贴 Apple 那种克制的动效。
- 验证：`npx vite build --outDir <tmp> --emptyOutDir` 通过（✓ 2082 modules transformed，✓ built in 8.42s）；产物 CSS 确认 17s 出现 8 次（cross/face/head/lick/4×paw）、腿 .52s、尾 1.4s、蝴蝶 19s 均在，旧的 7s/0.28s 已不存在（压缩器把 animation 简写重排为 `animation:17s … jiju-cross`，属正常）。默认 `npm run build` 仍因 dist/.DS_Store EPERM（macOS 挂载）报错，与改动无关。本地验证：`http://localhost:4180/` Current Build banner，应看到猫慢慢踱步、转身时停下舔一下毛，整体安静很多。
- 后续：若还想更懒，可把横移再拉到 22–25s 或加一个中途坐下休息的停顿段；本机可删 `verify_*` 验证目录。

### 2026-06-05 04:05

- 类型：前台 / Home hero / 21:9 CSS art 恢复
- 改动：恢复首页 hero CTA 下方的 21:9 Jiju cat scene 大型 CSS 横幅；新增/恢复 `HomeJijuCatScene` 渲染原有猫、客串猫、云、草、蝴蝶、叶子和星星层；重新在 `index.css` import `styles/css-art/home-jiju-scene.css`；在 `styles/pages/home.css` 加回 `.home-hero-visual` 21:9 容器与 mobile override；同步更新 CSS art README。
- 原因：用户指出 Home page 本来的 21:9 大 CSS 不见了，要求还原。
- 影响：首页恢复大型 CSS 动画横幅，但没有恢复旧的 `Current build` 产品文案 section；保留 Jiju cat scene 的慢速动效和 cameo cat。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.15s）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 `HomeJijuCatScene`、`home-hero-visual`、`home-jiju-scene.css` 已接入，并且 `Current build` / `home-product-panel` / `home-feature` 没有回到首页代码入口；`git diff --check -- App.tsx index.css styles/pages/home.css styles/css-art/README.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/`，hero CTA 下方应重新出现 21:9 的 Jiju CSS 动画横幅。

### 2026-06-05 04:09

- 类型：前台 / `/life` 页面重设计
- 改动：把 `/life` 从三个同权重视频卡片重排为 Apple-like editorial video archive：顶部改成 `Life Notes / Video field` hero，第一支 `Pulau Tioman` 成为大 featured video stage，剩余两支进入 `Small archive` 两栏影像条目；新增结尾 editorial rule；新增 `styles/pages/life.css` 管理页面 typography、留白、featured stage、archive cards、dark mode 和 mobile override，并在 `index.css` import；同步 `styles/pages/README.md`。
- 原因：用户要求 redesign `http://localhost:4180/life`，当前页面过于普通列表化，没有主次和生活影像栏目感。
- 影响：页面保留三支 YouTube 内容与外链，但信息层级更清楚：先看主片段，再扫 archive；整体减少可见边框，使用品牌 token、居中内容岛和克制 CTA。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 1.86s）；`curl -I http://localhost:4180/life` 返回 200；关键词检查确认 `life-page`、`life-feature-grid`、`life-feature-stage`、`life-archive-grid`、`styles/pages/life.css` 均已接入；`git diff --check -- App.tsx index.css styles/pages/life.css styles/pages/README.md log.md` 通过。尝试用 Node/Playwright 做浏览器检查时发现 workspace 未安装 `playwright`，未新增依赖。
- 后续：本地验证看 `http://localhost:4180/life`，应看到大标题、第一支大视频舞台、两张 archive 视频图卡和结尾短句。

### 2026-06-05 04:12

- 类型：前台 / Home Interests 图腾调整
- 改动：把 Home Interests 里的 `Pattern Archive` visual 从 `archive-evolution` 改成 `bagua-mirror`，也就是使用原本 `Life Notes` 的道教八卦镜透明底 CSS 图腾；从 Home Interests 数组移除 `Life Notes` 卡片。`/life` 页面本身保留，未删除路由。
- 原因：用户要求 `Life Notes` 的 CSS replace `Pattern Archive`，并把 `Life Notes` hide 起来。
- 影响：首页 Interests 区不再显示 `Life Notes`；`Pattern Archive` 保持原链接与文案，但图腾变成八卦镜 CSS。旧喷火龙图腾代码仍保留为未挂载资产，避免无关大删改。
- 验证：`npm run build` 通过（✓ 2082 modules transformed，✓ built in 2.08s）；`curl -I http://localhost:4180/` 返回 200；关键词检查确认 Home Interests 中 `Pattern Archive` 使用 `bagua-mirror`，`Life Notes` 已不在 Home Interests 数组；`git diff --check -- App.tsx log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/` 的 Interests 区，应看到 `Pattern Archive` 是八卦镜 CSS，且没有 `Life Notes` 卡片。

### 2026-06-05 04:24

- 类型：工程治理 / 安全 / SEO / 构建优化
- 改动：执行网站隐患清单治理：移除 `vite.config.ts` 中会把 `GEMINI_API_KEY` 注入前端 bundle 的 define；让 `seo.ts` 复用 `seo-routes.ts` 的 route registry，删除重复 SEO copy；给 `RouteSeo` 增加 `index` / `sitemap` 状态；把 `/life` 标记为 `index: false`、`sitemap: false`，保留直达但不进 sitemap 且客户端 robots 设为 `noindex, follow`；让 sitemap 从 `ROUTE_SEO` 自动生成，补上 `/etreporthub-sales`、`/poker`、`/crm`；在 Rollup 中加入 `manualChunks`，拆出 `vendor-react`、`vendor-motion`、`vendor-icons`；移除未使用的 `@react-three/fiber`、`@react-three/drei`、`three` 依赖并更新 lockfile；新增 `typecheck`、`lint`、`check` scripts；补 `vite/client` 类型；修正 typecheck 暴露的项目卡 external union 与 Conway changing lines 类型问题；同步 README、soul.md、AGENTS.md 的 route registry/检查规则。
- 原因：用户要求把网站隐患全部执行处理，包括安全、路由同步、隐藏 `/life` 发现入口、bundle 体积、检查脚本和维护规则。
- 影响：前端 bundle 不再有 API key 注入路径；SEO/sitemap 单一来源更稳定；`/life` 保持可访问但隐藏于 discovery；主业务 JS 从约 612 kB 降到约 290 kB，Vite 大 chunk 警告消失；生产依赖和完整 audit 均为 0 vulnerabilities；项目新增可运行的静态检查入口。
- 验证：`npm run lint` 通过；`npm run check` 通过；`npm audit` 和 `npm audit --omit=dev` 均为 0 vulnerabilities；`VITE_SITE_URL=https://edentan.site VITE_BASE=/ npm run build` 通过（生成 `vendor-react` 193.83 kB、`vendor-motion` 124.00 kB、`vendor-icons` 5.97 kB、主业务 JS 290.17 kB）；主要本地路由 `/`、`/projects`、`/life`、`/life-os`、`/jiju-pet`、`/brand-guide`、`/conways-game-of-life`、`/etreporthub`、`/etreporthub-sales`、`/previous-projects`、`/analog-tech`、`/poker`、`/crm` 均返回 200；发布 sitemap 包含 `/etreporthub-sales`、`/poker`、`/crm`，不包含 `/life`；关键词检查确认 `GEMINI_API_KEY` / `process.env.API_KEY` / `@react-three` / `three` / `drei` 无残留；`git diff --check` 通过。
- 后续：如果继续优化性能，下一步是真正 route-level component extraction，把 `/life-os`、`/brand-guide`、`/conways-game-of-life` 等从 `App.tsx` 拆成 lazy route modules。

### 2026-06-05 04:28

- 类型：前台 / `/life-os` border/radar/CSS art 透明化
- 改动：在 `index.css` 增加高优先级 `.page-shell.life-os-open-layout` override，压过 dark mode 的全局 `.border-*`、`.ring-*`、hover border 规则；统一把 `/life-os` 内 Tailwind border/ring、radar frame、icon/banner/portrait frame、signal CSS icon、signal arc/orbit/mark、wind/contract strip、contract seal、signature stroke 的 border/outline/ring 颜色设为 transparent；同步把 radar SVG 的 line/polygon/circle stroke 设为 transparent，并清掉相关 CSS art wrapper 的 inset/outer box-shadow。
- 原因：用户要求 `/life-os` 全部 border line 透明，尤其 radar 和 CSS art 的线条不要再露出来。
- 影响：`/life-os` 仍保留原有布局、背景、图片和 CSS motion，但可见的边框线、radar 网线/描边和 CSS icon 外框线会被压成透明；作用域限定在 `.page-shell.life-os-open-layout`，不影响其他页面。
- 验证：`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.12s）；`curl -I http://localhost:4180/life-os` 返回 200；关键词检查确认新的 `.page-shell.life-os-open-layout`、radar SVG stroke transparent、`life-rpg-signal-css-icon` / `life-rpg-signal-arc` override 存在；`git diff --check -- index.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/life-os`，radar 与 CSS art 的边框线应变透明，只剩内容、色块和动效。

### 2026-06-05 04:34

- 类型：前台 / `/life-os` hero CSS art 替换
- 改动：移除 `/life-os` hero 的 `lifeOsCharacterPortrait` 图片引用，把风之解析者主视觉替换成 `LifeOsWindStaffMagic` 纯 CSS 透明底动画；新增风魔法杖、晶体、魔法风带、吹风气流、符文、叶片和 spark 图层；CSS 放在 `styles/css-art/life-os-signals.css`，包含 light/dark mode 变量、慢速循环 keyframes 和 `prefers-reduced-motion` 静止态。Loadout banner 保留不动。
- 原因：用户要求把风之解析者的图片 remove，并 replace with 风魔法杖用魔法吹风的 CSS。
- 影响：`/life-os` 首屏不再加载角色 PNG 主图，改为透明底 CSS 动画视觉；页面内容、CTA、角色数值和后续 Loadout 区块不变。
- 验证：`npm run lint` 通过；`npm run build` 通过（✓ 2083 modules transformed，✓ built in 1.96s）；`curl -I http://localhost:4180/life-os` 返回 200；关键词检查确认 `lifeOsCharacterPortrait` 无残留，`LifeOsWindStaffMagic` 和 `.life-os-wind-staff-magic` 已接入；`git diff --check -- App.tsx styles/css-art/life-os-signals.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/life-os` hero，风之解析者标题下方应显示风魔法杖吹风 CSS 动画，而不是原角色图片。

### 2026-06-05 04:39

- 类型：前台 / `/life-os` Loadout 图片残留清理
- 改动：移除 `lifeOsLoadoutBanner` 常量和 `角色 Loadout` 区块里的 PNG `<img>`，改为复用 `LifeOsWindStaffMagic` 透明底 CSS 动画；新增 `.life-os-loadout-css-frame` 竖版比例规则，让风魔法杖 CSS 在 Loadout 栏位内保持 4:5 / desktop 1:2 的角色卡构图。
- 原因：用户指出没有看到改动，并明确要求 `🧾 角色 Loadout` 的 image 也拿掉。
- 影响：`/life-os` 首屏 hero 和 `角色 Loadout` 两处都不再显示风之解析者 PNG 图片，Loadout 也改成风魔法杖用魔法吹风的 CSS 视觉；其余技能 banner、模块内容和文案不变。
- 验证：`npm run lint` 通过；`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.48s）；`curl -I http://localhost:4180/life-os` 返回 200；关键词检查确认 `lifeOsLoadoutBanner` / `wind-pattern-analyst-loadout-banner` 无残留，`life-os-loadout-css-frame` 已接入；`git diff --check -- App.tsx styles/css-art/life-os-signals.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/life-os` 的 `🧾 角色 Loadout`，原竖向图片应变成透明底风魔法杖 CSS 动画。

### 2026-06-05 04:43

- 类型：前台 / `/life-os` 渗透主题 CSS art 重设计
- 改动：把被用户评价为“很丑”的风魔法杖 CSS art 整体替换为 `LifeOsInfiltrationField`；移除 `LifeOsWindStaffMagic`、`wind-staff`、晶体、叶片、spark 等拟物元素，改成透明底的轻量渗透场：风雾路径、半透明系统格栅、三层 membrane、渗透 breach、扩散 wave、逐步亮起的节点和小 glyph；hero 与 `🧾 角色 Loadout` 两处都使用同一套新 CSS。
- 原因：用户希望改成“关于渗透”的 CSS，而不是法杖吹风。
- 影响：`/life-os` 的主视觉从道具插画感转成“柔性信号穿过系统屏障”的抽象系统感，更贴合轻量渗透型风格；仍保持透明底、dark/light mode 变量、慢速动画和 `prefers-reduced-motion`。
- 验证：`npm run lint` 通过；`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.40s）；`curl -I http://localhost:4180/life-os` 返回 200；关键词检查确认 `LifeOsWindStaffMagic` / `wind-staff` / `life-os-wind` / `风魔法杖` 无残留；`git diff --check -- App.tsx styles/css-art/life-os-signals.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/life-os` hero 和 `🧾 角色 Loadout`，应看到风雾穿透格栅、节点逐步亮起的渗透型 CSS 动画。

### 2026-06-05 04:47

- 类型：前台 / `/life-os` 绿色龙卷风 CSS art
- 改动：把 `LifeOsInfiltrationField` 改成 `LifeOsGreenTornado`；删除渗透场的格栅、membrane、breach、node、glyph 结构，替换为透明底绿色龙卷风：上下 halo、旋风 column、四层旋转 ring、中心风柱、少量 debris 和 spark；同步把 hero 与 `🧾 角色 Loadout` 的 aria label 改成绿色龙卷风。CSS 尺寸收小：hero 使用居中图腾宽度，Loadout 固定为 12rem / desktop 14rem。
- 原因：用户要求 CSS 缩小，并换成绿色龙卷风动态。
- 影响：`/life-os` 主视觉和 Loadout 不再是渗透场，而是更明确的绿色风系角色图腾；透明底、light/dark 变量和 `prefers-reduced-motion` 仍保留。
- 验证：`npm run lint` 通过；`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.58s）；`curl -I http://localhost:4180/life-os` 返回 200；关键词检查确认 `LifeOsInfiltrationField` / `life-os-infiltration` 无残留，`LifeOsGreenTornado` / `life-os-green-tornado` 已接入；`git diff --check -- App.tsx styles/css-art/life-os-signals.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/life-os` hero 和 `🧾 角色 Loadout`，应看到缩小后的绿色龙卷风 CSS 动态。

### 2026-06-05 04:54

- 类型：前台 / `/life-os` 绿色龙卷风美术增强
- 改动：在 `LifeOsGreenTornado` 增加风眼、顶部/底部 mist、2 层内部 slice、3 条大 ribbon、6 条细 thread、底部吸入 base、额外 debris 和 spark；CSS 新增对应纹理层与 keyframes，并同步 `prefers-reduced-motion` 覆盖。保持透明底和缩小尺寸不变。
- 原因：用户问能不能更加好看，希望现有绿色龙卷风视觉更精致。
- 影响：`/life-os` hero 和 `🧾 角色 Loadout` 的绿色龙卷风从简单旋转风环升级为更完整的风系图腾：有风眼、锥形中心、外侧螺旋轨迹、细风纹和底部吸入感。
- 验证：`npm run lint` 通过；`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.52s）；`curl -I http://localhost:4180/life-os` 返回 200；关键词检查确认 `life-os-tornado-eye` / `mist` / `ribbon` / `thread` / `base` 已接入；`git diff --check -- App.tsx styles/css-art/life-os-signals.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/life-os` hero 和 `🧾 角色 Loadout`，绿色龙卷风应更像完整的风系角色图腾，而不是单纯几层旋转线。

### 2026-06-05 04:58

- 类型：前台 / `/life-os` 风之眼图腾重设计
- 改动：把页面实际挂载的 `LifeOsGreenTornado` 换成 `LifeOsWindEyeSigil`；主视觉从直白的绿色龙卷风改为透明底风之眼图腾：中央玉色眼核、双层 orbit、三片风刃、四条细风线、环绕光点和 mote。Hero 与 `🧾 角色 Loadout` 两处 aria label 同步改为风之眼图腾。
- 原因：用户希望换个思路做更好看的版本，避免继续在龙卷风方向上微调。
- 影响：`/life-os` 主视觉更像角色徽章 / 风系 sigil，不再像天气 icon；透明底、light/dark 变量、缩小尺寸和 `prefers-reduced-motion` 都保留。
- 验证：`npm run lint` 通过；`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.81s）；`curl -I http://localhost:4180/life-os` 返回 200；关键词检查确认 `App.tsx` 页面入口只挂载 `LifeOsWindEyeSigil`，不再挂载 `LifeOsGreenTornado`；`git diff --check -- App.tsx styles/css-art/life-os-signals.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/life-os` hero 和 `🧾 角色 Loadout`，应看到风之眼图腾，而不是绿色龙卷风。

### 2026-06-05 05:00

- 类型：前台 / `/life-os` 风魔法几何细节
- 改动：在 `LifeOsWindEyeSigil` 增加几何风魔法层：3 个透明底三角阵 `life-os-wind-eye-geometry`、4 个符文短线 `life-os-wind-eye-tick`、3 个菱形节点 `life-os-wind-eye-diamond`；使用 gradient/clip-path/drop-shadow 画线，不使用可见 border；新增对应 keyframes 和 `prefers-reduced-motion` 覆盖。
- 原因：用户要求加一点几何图形，类似风魔法。
- 影响：`/life-os` hero 和 `🧾 角色 Loadout` 的风之眼图腾更像风系魔法阵，保留透明底、缩小尺寸、light/dark 变量和原有风刃/风眼动效。
- 验证：`npm run lint` 通过；`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.52s）；`curl -I http://localhost:4180/life-os` 返回 200；关键词检查确认 `life-os-wind-eye-geometry` / `tick` / `diamond` 已接入；`git diff --check -- App.tsx styles/css-art/life-os-signals.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/life-os` hero 和 `🧾 角色 Loadout`，风之眼周围应多出三角阵、菱形节点和符文短线。

### 2026-06-05 16:07

- 类型：前台 / `/project-css` CSS art 检查页
- 改动：新增 `/project-css` 直达页面，集中展示 `/projects` 的 4 个 CSS app icon（Jiju、Friday Poker Club、ETReportHub、CRM Intelligence System）；页面复用现有 `ProjectsJijuCssIcon`、`ProjectsPokerCssIcon`、`ProjectsEtReportCssIcon`、`ProjectsCrmCssIcon`，没有复制第二套 CSS art；`/projects` hero 增加「看 CSS 图标 / View CSS icons」CTA；新增 `.project-css-*` 页面布局样式；`seo-routes.ts` 添加 `/project-css`，设为 `index:false`、`sitemap:false`；README 路由表同步。
- 原因：用户想多开一个 page，把 `http://localhost:4180/projects` 里的 4 个 CSS 放进去，并询问影响。
- 影响：新增一个隐藏直达检查页，不影响 `/projects` 原卡片结构；因为 noindex 且不进 sitemap，不会扩大公开 SEO 面；以后 4 个 icon 组件本身改动时，新页面会复用同一套组件展示。
- 验证：`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.43s）；`curl -I http://localhost:4180/project-css` 和 `curl -I http://localhost:4180/projects` 均返回 200；关键词检查确认 `/project-css`、`ProjectCssGalleryPage`、`ProjectCssGalleryIcon`、`.project-css-board`、SEO route 和 README 路由已接入；`git diff --check -- App.tsx styles/pages/projects.css seo-routes.ts README.md log.md` 通过。`npm run typecheck` 两次进入 0 CPU 挂起状态，已清理 stale `tsc --noEmit` 进程，本次未把 typecheck 作为完成验证。
- 后续：本地验证看 `http://localhost:4180/project-css`，应看到 4 个 CSS app icon 独立排版；看 `http://localhost:4180/projects` hero，应多一个「看 CSS 图标」入口。

### 2026-06-05 16:19

- 类型：前台 / `/project-css` CSS art gallery 扩充
- 改动：把 `/project-css` 从只展示 `/projects` 四个 app icon，扩充为站内 CSS art 检查页；新增 Home `System Files` 里的 `Projects Hub` 设计图纸 CSS 和 `Life OS RPG System` 心跳魔法阵 CSS；新增 Home `Interests` 当前实际显示的四个透明底图腾：`Life OS` 黑发变金发、`Analog Tech` 留声机、`Pattern Archive` 八卦镜、`Conway's Game of Life` 金字塔碰坏；新增 `.project-css-section-*`、`.project-css-home-*`、`.project-css-totem-*` 布局样式；README 和 `seo-routes.ts` 描述同步从“四个项目图标”改为 Projects / Home / Interests CSS art 检查页。
- 原因：用户要求把 `Life OS RPG System`、`Projects Hub` 和 `Interests` 里面的 CSS 也加进去。
- 影响：`/project-css` 成为更完整的内部 CSS 视觉 review board；仍只复用现有 React/CSS 组件，不改 Home 或 `/projects` 原页面内容；路由继续 `noindex` 且不进 sitemap。
- 验证：`npm run build` 通过（✓ 2083 modules transformed，✓ built in 2.11s）；`curl -I http://localhost:4180/project-css` 和 `curl -I http://localhost:4180/` 均返回 200；关键词检查确认 `HomeProjectsBlueprintIcon`、`HomeLifeMagicIcon`、`HomePowerUpTotem`、`HomeGramophoneTotem`、`HomeBaguaMirrorTotem`、`HomePyramidBreakTotem` 都已在 `/project-css` 接入；`git diff --check -- App.tsx styles/pages/projects.css seo-routes.ts README.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css`，应依次看到 Projects app icon、Home System Files 两个 CSS、Interests 四个透明底 CSS 图腾。

### 2026-06-05 16:28

- 类型：前台架构 / CSS art registry 与复用系统
- 改动：新增 `components/css-art/index.tsx`，把 Home/Projects 当前复用的 CSS art React wrapper 从 `App.tsx` 拆出；新增 `css-art.registry.ts`，登记 10 个可复用 CSS art 的 `id`、分类、来源 route、比例、透明底/固定底、CSS 文件、组件、双语 label 和使用说明；`/project-css` 改为从 `projectCssArtItems`、`homeSystemCssArtItems`、`homeInterestCssArtItems` 自动渲染；`/projects` 卡片 icon 改为通过 `getProjectCssArtByProjectTitle` 取组件；新增 `docs/css-art-system.md` 操作手册；同步更新 `AGENTS.md`、`soul.md`、`README.md`，要求未来 agent 先查 registry 和文档，不要复制 CSS art DOM。
- 原因：用户希望以后其他 agent 可以直接拿这些 CSS 来用，而不是每次重新翻页面或复制一份。
- 影响：CSS art 现在有可发现、可复用、可维护的入口；页面视觉 CSS 没有重写，Home、`/projects`、`/project-css` 仍使用同一批 class 和动画；后续新增 CSS art 需要登记到 registry。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 2.14s）；`curl -I http://localhost:4180/project-css`、`curl -I http://localhost:4180/projects`、`curl -I http://localhost:4180/` 均返回 200；关键词检查确认旧 `ProjectCssGalleryIcon` 已移除，`cssArtRegistry`、`components/css-art`、`docs/css-art-system.md`、AGENTS/soul 规则都已接入；`git diff --check -- App.tsx components/css-art/index.tsx css-art.registry.ts docs/css-art-system.md AGENTS.md soul.md README.md styles/pages/projects.css seo-routes.ts log.md` 通过。
- 后续：未来复用 CSS art 时，从 `css-art.registry.ts` 查 ID 和组件；新增视觉时先改 `components/css-art` 与 `styles/css-art`，再补 registry 和 `/project-css` 检查。

### 2026-06-05 16:36

- 类型：前台 / office framed CSS app icons
- 改动：根据 System Files 的克制视觉语言和 framed app icon 规则，新增 6 个办公系统 1:1 CSS icon：`Desk Calendar`、`Inbox Tray`、`Report Sheet`、`Team Board`、`Contract Seal`、`Workflow Automator`；React wrapper 放进 `components/css-art/index.tsx`，新增 CSS 家族 `styles/css-art/office-icons.css`，并在 `index.css` 导入；`css-art.registry.ts` 新增 `office-icon` 分类和 6 个 registry 条目；`/project-css` 新增 `Office / Framed app icons` section；`docs/css-art-system.md` 同步 category 和 ID 列表。
- 原因：用户要求基于 System Files 和 framed app icon 风格，设计 6 个办公 CSS 1:1。
- 影响：新增一组可复用的 office icon visual family，不影响 Home、`/projects` 原有视觉；这些 icon 已走 registry，可被后续 agent 直接复用；全部按 framed app icon 处理，带 flat background、light/dark mode 和 `prefers-reduced-motion`。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 2.34s）；`curl -I http://localhost:4180/project-css` 和 `curl -I http://localhost:4180/projects` 均返回 200；关键词检查确认 `officeIconCssArtItems`、`office-icon`、6 个 `Office*CssIcon`、`.project-css-office-grid`、`office-icons.css` 和 `office-desk-calendar` 已接入；`git diff --check -- App.tsx components/css-art/index.tsx css-art.registry.ts styles/css-art/office-icons.css styles/pages/projects.css index.css docs/css-art-system.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 `Office / Framed app icons` section，应看到 6 个办公 1:1 CSS app icon。

### 2026-06-05 16:41

- 类型：前台 / office CSS icon emoji-style 简化
- 改动：重写 `styles/css-art/office-icons.css`，把 6 个 office framed app icon 从偏复杂的系统 UI 细节改成更 emoji-style 的大主体图标：大日历页、大纸张托盘、大报表文件、大团队看板、大签署文件和大流程节点；减少细线、grid、scan、复杂阴影和小元素，保留 flat framed background、少量 bob/pulse 动效、light/dark mode 与 `prefers-reduced-motion`；同步把 `css-art.registry.ts` 的 6 个 office copy 改成 emoji-like 描述。
- 原因：用户反馈上一版有点复杂，希望更接近 emoji style。
- 影响：`/project-css` 的 `Office / Framed app icons` section 更直观、符号更大、更容易一眼识别；组件和 registry ID 不变，后续复用方式不变。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 4.01s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `officeEmoji*` keyframes、`emoji-like` registry copy、`office-calendar-page::after` 已接入；`git diff --check -- styles/css-art/office-icons.css css-art.registry.ts log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 office section，6 个 icon 应更像大块 emoji 图标，而不是细节很多的系统小插画。

### 2026-06-05 16:47

- 类型：前台 / office CSS icon 指定减法
- 改动：继续简化 `styles/css-art/office-icons.css` 的 office icon：`Desk Calendar` 隐藏 grid 和圆圈，改成 3 个若隐若现日期 dot；`Inbox Tray` 明确隐藏横线；`Team Board` 的任务卡改成 3D 翻卡；`Contract Seal` 把原本丑的签名条改成三角形记号；`Workflow Automator` 从抽象流程节点改成工厂机械流水线罐头，使用 factory block、conveyor path、can node 和 rolling can token；同步更新 `css-art.registry.ts` 对应 copy。
- 原因：用户指出上一版仍然复杂，并给出每个 icon 的具体修改方向。
- 影响：`/project-css` 的 office section 更接近直观 emoji icon，减少信息密度；组件和 registry ID 不变，后续复用 API 不变。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.26s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `officeDateGhost`、`officeCardFlip`、`officeTrianglePop`、`officeCanRoll`、`officeCanJiggle`、`office-inbox-line` 已接入；`git diff --check -- styles/css-art/office-icons.css css-art.registry.ts log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 office section，Calendar 应只剩淡 dots，Inbox 无横线，Team card 会翻，Contract 是三角形记号，Workflow 是工厂流水线罐头。

### 2026-06-05 16:53

- 类型：前台 / office CSS icon 可见差异加强
- 改动：针对用户反馈“看没有任何差别”，进一步加大 `styles/css-art/office-icons.css` 的视觉差异：`Desk Calendar` 移除日期数字，只保留若隐若现 dot；`Team Board` 移除头像和底板，改成更大的三张翻卡；`Contract Seal` 把三角形记号放大成紫色主形；`Workflow Automator` 放大 factory block、conveyor 和 can token；重启本地 Vite dev server，避免浏览器继续吃旧 HMR 状态。
- 原因：上一版 CSS 虽然已被 dev server 读取，但视觉变化不够明显，用户侧看不出差别。
- 影响：`/project-css` office section 应出现肉眼明显变化；registry/组件/API 不变。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.29s）；重启 `npm run dev` 后 `curl -I http://localhost:4180/project-css` 返回 200；直接请求 `http://localhost:4180/styles/css-art/office-icons.css` 确认包含新版 `content: ""`、`officeCardFlip 4.8s`、`width: 30%`、`officeCanRoll`、`officeDateGhost`；`git diff --check -- styles/css-art/office-icons.css css-art.registry.ts log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css`，需要强刷页面；如果仍没变化，优先检查浏览器缓存或当前 tab 是否不是 4180 dev server。

### 2026-06-05 16:56

- 类型：前台 / office CSS icon 隐藏 bug 修复
- 改动：修复 `styles/css-art/office-icons.css` 的 specificity bug：原本 `.office-css-icon span { display: none; }` 比后续 `.office-calendar-page { display: block; }` 等单 class 规则更强，导致内部图形全被隐藏，只剩 icon 底色；现在改为 `.office-css-icon span { display: block; }`，并只针对 `.office-calendar-grid`、`.office-calendar-marker`、`.office-inbox-line`、`.office-team-avatar` 做明确隐藏。
- 原因：用户截图显示 6 个 office icon 直接不见，只剩空白底。
- 影响：`/project-css` office section 的内部图形会重新显示；保留上一轮简化后的 Calendar dots、翻卡、三角形、工厂罐头等视觉方向。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.17s）；重启 `npm run dev` 后 `curl -I http://localhost:4180/project-css` 返回 200；直接请求 `http://localhost:4180/styles/css-art/office-icons.css` 确认 `.office-css-icon span { display: block; }` 和指定隐藏列表存在；`git diff --check -- styles/css-art/office-icons.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 office section，图形应重新显示，不再是空白底。

### 2026-06-05 17:01

- 类型：前台 / Workflow Automator magic wand redesign
- 改动：把 `Workflow Automator` office icon 从工厂流水线罐头改成 `Magic Wand Automation`：复用原 workflow DOM，`.office-workflow-grid` 改为圆形魔法 aura，`.office-workflow-node` 改为被点亮的 workflow 节点，`.office-workflow-path` 改为发光连接线，`.office-workflow-token` 改为魔法棒；新增 `officeMagicAura`、`officeMagicSpark`、`officeMagicNode`、`officeMagicLine`、`officeMagicWand` keyframes，并清掉旧 `officeCanRoll` / `officeCanJiggle` / `officeEmojiToken` 残留；`css-art.registry.ts` 文案同步改为魔法棒点亮流程节点。
- 原因：用户选择 Magic Wand Automation 方向替换不合适的 Workflow Automator 工厂流水线版本。
- 影响：`/project-css` office section 的 Workflow Automator 更贴近“自动化”和站内魔法/系统视觉语言；组件、registry ID 和页面结构不变。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 2.30s）；重启 `npm run dev` 后 `curl -I http://localhost:4180/project-css` 返回 200；直接请求 `http://localhost:4180/styles/css-art/office-icons.css` 确认 `officeMagicWand` / `officeMagicAura` 存在且旧 `officeCan*` / factory 方向已清掉；`git diff --check -- styles/css-art/office-icons.css css-art.registry.ts log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Workflow Automator，应看到魔法棒点亮节点，而不是工厂流水线罐头。

### 2026-06-05 17:11

- 类型：前台 / math magic framed CSS app icons
- 改动：新增 6 个数学魔法 framed 1:1 CSS app icon：`Prime Sigil`、`Vector Gate`、`Integral Spell`、`Pi Orb`、`Fractal Rune`、`Matrix Portal`；React wrapper 放进 `components/css-art/index.tsx`；新增 `styles/css-art/math-magic-icons.css` 并在 `index.css` 导入；`css-art.registry.ts` 新增 `math-magic-icon` 分类和 6 个 registry 条目；`/project-css` 新增 Math magic section；`docs/css-art-system.md` 同步 category 和 ID。
- 原因：用户要求再给一组六个数学魔法元素 framed app icon。
- 影响：新增可复用的 math-magic visual family，不影响现有 Projects/Home/Office icons；所有组件走 registry，可被后续 agent 直接复用；支持 light/dark mode 和 `prefers-reduced-motion`。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.56s）；重启 `npm run dev` 后 `curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `mathMagicIconCssArtItems`、`math-magic-icon`、`MathPrimeSigilCssIcon`、`math-magic-icons.css` 和 `math-prime-sigil` 已接入；浏览器背景验证确认 `Prime Sigil`、`Vector Gate`、`Integral Spell`、`Pi Orb`、`Fractal Rune`、`Matrix Portal` 均已出现在 `/project-css`；`git diff --check -- App.tsx components/css-art/index.tsx css-art.registry.ts styles/css-art/math-magic-icons.css styles/pages/projects.css index.css docs/css-art-system.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Math magic section。

### 2026-06-05 17:17

- 类型：前台 / math magic icon 魔法化增强
- 改动：重写 `styles/css-art/math-magic-icons.css` 的视觉调性，把 6 个 math-magic framed icon 从浅色数学符号改成更明显的魔法 icon：深色魔法底、星尘、旋转法阵、发光核心、传送门、奥术轨道和慢速漂浮；新增 `mathMagicDust`、`mathGlyphTurn`、`mathSpellHover` 动效；同步更新 `css-art.registry.ts` 的 6 个 copy，让描述更偏 spellbook / artifact / portal / rune。
- 原因：用户希望这组更像“魔法那种”，不只是数学符号。
- 影响：`/project-css` 的 Math magic section 视觉更接近 CRM 魔法阵和 Magic Wand Automation 的站内魔法语言；registry ID、React 组件和页面结构不变，后续复用方式不变。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.60s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `mathMagicDust`、`mathGlyphTurn`、`mathSpellHover` 和新版 spellbook copy 已接入；`git diff --check -- styles/css-art/math-magic-icons.css css-art.registry.ts log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Math magic section，应看到更暗、更发光、更像魔法道具的 6 个 framed app icon。

### 2026-06-05 17:20

- 类型：前台 / math magic icon 几何符文增强
- 改动：在 `styles/css-art/math-magic-icons.css` 给 6 个 math-magic framed icon 增加几何图形层：通用 aura 叠加菱形框、三角符文和六边形；Vector Gate 增加菱形平面和中心几何门；Integral Spell 增加三角面积符文；Pi Orb 增加六边形 artifact；Fractal Rune seed 改成六边形并加内三角；Matrix Portal 增加菱形框和三角符文；新增 `mathTriangleFloat` 动效，并把部分节点改成 `clip-path` 菱形以避免 transform 动画冲突。
- 原因：用户要求在魔法 icon 里再加一些几何图形。
- 影响：Math magic section 现在不只靠圆形法阵和发光，几何结构更明显；React DOM、registry ID 和页面结构不变。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.11s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `mathTriangleFloat`、`math-vector-plane::before`、`math-pi-orb::before`、`math-fractal-seed::before`、`math-matrix-grid::after` 已接入；`git diff --check -- styles/css-art/math-magic-icons.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Math magic section，应看到更明显的三角、菱形、六边形几何符文。

### 2026-06-05 17:35

- 类型：前台 / Fire Element 1:1 CSS icon
- 改动：新增 `ElementFireCssIcon` React wrapper；新增 `styles/css-art/elemental-icons.css`，实现一个 1:1 framed 火元素 CSS icon：火焰核心、三角火符、旋转火环、灰烬火星和底部熔岩光；`index.css` 导入 elemental CSS；`css-art.registry.ts` 新增 `elemental-icon` 分类、`element-fire` registry 条目和 `elementalIconCssArtItems` 导出；`/project-css` 新增 Elemental section；`docs/css-art-system.md` 同步 category 和 ID。
- 原因：用户要求给一个火元素 CSS 1:1。
- 影响：新增可复用 elemental visual family 的第一个 icon，不影响现有 Projects/Home/Office/Math magic sections；后续可以按同一分类继续扩展水、风、土等元素。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.11s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `ElementFireCssIcon`、`elementalIconCssArtItems`、`element-fire`、`elemental-icons.css` 和 `project-css-elemental` 已接入；`git diff --check -- App.tsx components/css-art/index.tsx css-art.registry.ts styles/css-art/elemental-icons.css styles/pages/projects.css index.css docs/css-art-system.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Elemental section，应看到单个 Fire Element 1:1 framed CSS icon。

### 2026-06-05 17:40

- 类型：前台 / Fire Element flat 简化
- 改动：按用户反馈重写 `styles/css-art/elemental-icons.css` 的 Fire Element 视觉：隐藏 `fire-element-ring` 和 `fire-element-sigil`，移除旋转火环、三角符印、conic 法阵感和对应 `fireGlyphTurn` / `fireSigilFloat` keyframes；背景改成更 flat 的深色面，火焰改成大块红/橙/金三层，底光和 ember 保留但降低光效；同步更新 `/project-css` section copy 与 `css-art.registry.ts` 描述，不再写 triangle sigil。
- 原因：用户要求 flat 一点，不要旋转火环，不要三角型。
- 影响：Elemental section 的 Fire Element 更像简洁 app icon，而不是魔法符文 icon；组件、registry ID 和页面结构不变。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.33s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `fireGlyphTurn`、`fireSigilFloat`、`triangle sigil`、`三角符印`、`旋转火环` 无残留，仅保留隐藏用的 `.fire-element-ring` selector；`git diff --check -- App.tsx css-art.registry.ts styles/css-art/elemental-icons.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Elemental section，Fire Element 应是 flat 大火焰，无旋转火环和三角符印。

### 2026-06-12 21:16

- 类型：前台 / ETReportHub System Flow 内容迁移
- 改动：将 `/etreporthub` 从原来的产品介绍页改为 System Flow 信息页，吸收 `daily.etreporthub.com/systemflow` 的核心内容：60 秒系统导览、系统目的、功能地图、业务规则、Daily Upload Flow、运营闭环、系统架构流、Convert 发生位置、SQLite 表和优化路线图；视觉仍使用 Eden 当前的深色 editorial/product theme，而不是复制原站样式。
- 原因：用户要求保留 `https://daily.etreporthub.com/systemflow` 的信息内容，但放进 `edentan.site` 的主题和风格里。
- 影响：`http://localhost:4180/etreporthub` 现在是 ETReportHub 的系统说明页，内容更接近内部 system flow 文档，同时保留 Eden 页面节奏、卡片密度、CTA 和 responsive 样式。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 2.11s）；dev server 已重启在 `http://localhost:4180/`；`curl` 检查确认 `/etreporthub`、`/index.tsx`、`/App.tsx`、`/index.css` 和 React/Vite 依赖均返回 200。
- 后续：本地验证看 `http://localhost:4180/etreporthub`，应看到 “ETReportHub / System Flow” hero、60-second tour、feature map、business rules、architecture flow 和 optimization roadmap。

### 2026-06-05 17:43

- 类型：前台 / Fire Element 火焰角度修正
- 改动：调整 `styles/css-art/elemental-icons.css` 的 Fire Element 火焰主体角度：基础 transform 从 `rotate(45deg)` 改为 `rotate(12deg)`；`fireFlameWave` 从 42/49 度摆动改为 9/15 度；`fireCorePulse` 同步改为 12 度；圆角改成更接近直立火苗的形状。
- 原因：用户反馈火焰太歪。
- 影响：Elemental section 的 Fire Element 火焰更正、更像 upright flat flame，但仍保留轻微动态呼吸。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 5.33s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认旧 45/42/49 度旋转无残留，新 9/12/15 度角度已接入；`git diff --check -- styles/css-art/elemental-icons.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Elemental section，Fire Element 火焰应不再明显倾斜。

### 2026-06-05 17:46

- 类型：前台 / Water Element 1:1 CSS icon
- 改动：新增 `ElementWaterCssIcon` React wrapper；在 `styles/css-art/elemental-icons.css` 增加 Water Element 视觉：flat 深蓝 framed 底、大水滴、两层柔和水波、三颗 bubble、慢速 tide glow；`css-art.registry.ts` 新增 `element-water` registry 条目；`/project-css` Elemental section 改成复数元素文案，并把 `.project-css-elemental-grid` 从单列改成桌面两列；`docs/css-art-system.md` 同步新增 `element-water`。
- 原因：用户要求多一个水元素。
- 影响：Elemental section 现在有 Fire Element 和 Water Element 两个 1:1 framed CSS icon；后续可继续按 `elemental-icon` 分类扩展风、土等元素。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 5.06s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `ElementWaterCssIcon`、`element-water`、`water-element-*`、`project-css-elemental-grid` 和 docs ID 已接入；`git diff --check -- App.tsx components/css-art/index.tsx css-art.registry.ts styles/css-art/elemental-icons.css styles/pages/projects.css docs/css-art-system.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Elemental section，应看到 Fire Element 和 Water Element 两个 flat 1:1 icon。

### 2026-06-05 17:49

- 类型：前台 / Water Element 水滴化简化
- 改动：调整 `styles/css-art/elemental-icons.css` 的 Water Element：把三层 `water-element-drop` 改成明确尖顶水滴 `clip-path` 轮廓；隐藏 `.water-element-wave`，移除 `waterWaveDrift` keyframe，让底部不再出现像木材的横条；同步更新 `/project-css` section copy 和 `css-art.registry.ts` 描述，从“柔和水波”改为“水滴轮廓、气泡和 tide glow”。
- 原因：用户要求水元素做成水滴型，并移除下面像木材的部分。
- 影响：Water Element 更像单一 flat 水滴 icon，视觉更简洁；组件和 registry ID 不变。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.79s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `waterWaveDrift`、`soft waves`、`柔和水波` 无残留，水滴 `clip-path` 已接入；`git diff --check -- App.tsx css-art.registry.ts styles/css-art/elemental-icons.css log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Elemental section，Water Element 应是清楚水滴型，底部没有横条。

### 2026-06-05 17:52

- 类型：前台 / Wind Element 1:1 CSS icon
- 改动：新增 `ElementWindCssIcon` React wrapper；在 `styles/css-art/elemental-icons.css` 增加 Wind Element 视觉：flat 青绿色 framed 底、三条柔和风带、两条尾风、小叶片、微风点和慢速 breeze glow；`css-art.registry.ts` 新增 `element-wind` registry 条目；`/project-css` Elemental section copy 从火/水扩展为火/水/风，并把 `.project-css-elemental-grid` 改为桌面三栏；`docs/css-art-system.md` 同步新增 `element-wind`。
- 原因：用户要求多一个风元素。
- 影响：Elemental section 现在有 Fire、Water、Wind 三个 flat 1:1 framed CSS icon；后续可继续按同一 `elemental-icon` 分类扩展土等元素。
- 验证：`npm run build` 通过（✓ 2085 modules transformed，✓ built in 3.66s）；`curl -I http://localhost:4180/project-css` 返回 200；关键词检查确认 `ElementWindCssIcon`、`element-wind`、`wind-element-*`、`project-css-elemental-grid` 和 docs ID 已接入；`git diff --check -- App.tsx components/css-art/index.tsx css-art.registry.ts styles/css-art/elemental-icons.css styles/pages/projects.css docs/css-art-system.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/project-css` 的 Elemental section，应看到 Fire Element、Water Element、Wind Element 三个 flat 1:1 icon。

### 2026-06-23 22:53

- 类型：前台 / Brand guide 分类与 Wiki RAG CSS icon
- 改动：`/brand-guide` 新增 Guide map 分类区块，把规则分成全站品牌系统、内容语气和 Poker page 专属；将 Story style section 改为 `/poker` only，明确不作为全站写作规则；新增 `WikiRagFlowCssIcon` 与 `styles/css-art/wiki-icons.css`，用 CSS art 替换 `/wiki/rag-flow` 的 emoji 视觉；同步注册 `wiki-rag-flow` 到 `css-art.registry.ts`，并更新 `docs/css-art-system.md`。
- 原因：用户要求 brand guide 也要分类，并明确 Story style 只属于 poker page；同时要求 Tag Registry 与 RAG flow 不再用 emoji，而改用 CSS visual。
- 影响：`http://localhost:4180/brand-guide` 现在能直接看出哪些规则是全站、哪些是 `/poker` 专属；`http://localhost:4180/wiki/rag-flow` 的 card 和 note lead 使用知识流 CSS icon，其他 wiki entry 仍保留原本轻量符号。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.06s）；`curl -I http://localhost:4180/brand-guide` 返回 200；`curl -I http://localhost:4180/wiki/rag-flow` 返回 200；`git diff --check -- App.tsx components/css-art/index.tsx css-art.registry.ts index.css styles/css-art/wiki-icons.css styles/pages/brand-guide.css styles/pages/poker.css docs/css-art-system.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/brand-guide`，应看到 Guide map 三个分类卡；看 `http://localhost:4180/wiki/rag-flow`，Tag Registry 与 RAG flow 应显示 CSS art icon，不再显示 compass emoji。

### 2026-06-23 22:56

- 类型：前台 / Wiki RAG CSS icon 动效收敛
- 改动：重写 `styles/css-art/wiki-icons.css`，移除 RAG icon 的 ring、scan、node/link 网络和 opacity/fade 类效果；把 `WikiRagFlowCssIcon` DOM 从复杂知识流层减少为云、书架、两张 note、两个 tag 和搜索圈；动画改为接近 Jiju app icon 的实体小物件位移：云慢飘、note 轻微 bob、tag 轻摆、搜索圈轻移；同步更新 `css-art.registry.ts` copy 和 background 类型。
- 原因：用户反馈不要 fade effect、不要太多细节，希望更接近 Jiju app CSS 动画类型。
- 影响：`/wiki/rag-flow` 的视觉从科技感 RAG 图改为更简单、可爱、实体化的 note/tag 小场景；不影响 `/brand-guide` 分类和 wiki 内容结构。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.04s）；`curl -I http://localhost:4180/wiki/rag-flow` 返回 200；`curl -I http://localhost:4180/brand-guide` 返回 200；`git diff --check -- components/css-art/index.tsx styles/css-art/wiki-icons.css css-art.registry.ts` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki/rag-flow`，RAG icon 应是简化的 note/tag 小场景，没有扫描线、复杂圆环或 fade 细节。

### 2026-06-23 22:59

- 类型：前台 / Wiki RAG CSS icon 可见动效增强
- 改动：加强 `styles/css-art/wiki-icons.css` 的 transform 动效幅度：note 从轻微 bob 改成更明显的左右/上下位移，tag 摆动角度加大，搜索圈增加左右寻找感，书架底座加入轻微伸缩；仍不使用 fade、scan、opacity 动画或复杂细节。
- 原因：用户反馈 icon 要“看起来能动那种”，上一版动作太细。
- 影响：`/wiki/rag-flow` 的 CSS icon 现在更容易一眼看出在动，同时仍保持 Jiju-like 实体小物件动画方向。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.13s）；`curl -I http://localhost:4180/wiki/rag-flow` 返回 200；`git diff --check -- styles/css-art/wiki-icons.css` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki/rag-flow`，note/tag/search 应该有更明显的移动感。

### 2026-06-23 23:06

- 类型：前台 / 全站 background fade 移除
- 改动：移除 `styles/base.css` 的 `.page-shell::before` texture layer 和 `.page-shell::after` ambient light layer；移除全局 `background-color` transition，避免背景颜色做 fade；关闭 `styles/motion.css` 的 motion-card flare / hover background glow，并删除 `texture-drift`、`light-orbit`、`light-pulse`、`card-flare-drift`、`flare-breathe` 这些背景光效 keyframes；关闭 `styles/pages/conway.css` 的额外背景 pseudo layer；把 `styles/tokens.css` 的 `--theme-background-texture` 和 `--theme-background-lights` 设为 `none`；同步更新 `/brand-guide` Motion language、`AGENTS.md` 和 `soul.md`，明确以后动效走 Jiju-like 实体物件，不走 background fade。
- 原因：用户要求把全部 background fade 拿掉。
- 影响：全站页面背景不再有漂移纹理、ambient glow、背景光晕、card flare 或背景色 fade；前景内容入场和 CSS art 里的实体物件动画仍保留。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 992ms）；关键词检查确认 `texture-drift`、`light-orbit`、`light-pulse`、`card-flare-drift`、`flare-breathe` 无残留；`curl -I http://localhost:4180/`、`/brand-guide`、`/wiki/rag-flow`、`/conways-game-of-life` 均返回 200；`git diff --check -- styles/base.css styles/motion.css styles/pages/conway.css styles/tokens.css App.tsx AGENTS.md soul.md` 通过。
- 后续：本地验证看 `http://localhost:4180/` 和 `http://localhost:4180/wiki/rag-flow`，背景应保持静态纯底，动效只发生在可见物件上。

### 2026-06-23 23:12

- 类型：前台 / Card 内彩色 fade 移除
- 改动：把 shared card/panel surface 从半透明 color-mix 改为纯 `var(--theme-surface)` / `var(--theme-surface-muted)`；移除 `/poker`、`/wiki/*`、`/etreporthub`、`/etreporthub-sales`、`/brand-guide`、`/life-os` card/panel/radar 内部的 mint/amber/radial/linear 彩色渐层 fade；同步更新 `AGENTS.md` 和 `soul.md`，明确以后 card-level colored gradient fades 也不要再作为默认视觉语言。
- 原因：用户要求 card 里面有颜色的 fade 也拿掉。
- 影响：页面 card 和 panel 现在是更干净的纯 surface；保留内容结构、实体 CSS art 动画和必要的图片文字遮罩。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.02s）；关键词检查确认 page/shared/theme override CSS 中没有 mint/amber 相关 radial/linear colored fade 残留；`curl -I http://localhost:4180/`、`/wiki/rag-flow`、`/brand-guide`、`/life-os` 均返回 200；`git diff --check -- styles/shared.css styles/pages/poker.css styles/pages/etreport.css styles/pages/brand-guide.css styles/pages/life-os.css styles/theme-overrides.css` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki/rag-flow`、`http://localhost:4180/brand-guide` 和 `http://localhost:4180/life-os`，card 内不应再有彩色渐层 fade。

### 2026-06-23 23:27

- 类型：前台 / Solid 颜色分类增强
- 改动：在 `styles/shared.css` 新增 build、experience、interaction、data、knowledge、system 六组 solid 分类色 token；给 `/wiki` 与 `/poker` knowledge cards 增加 per-slug tone class、顶部色条、icon 色块、eyebrow/link 色彩、quote bar 和 bullet 分类色；Skill Card tags 改成循环 solid 分类色；`/brand-guide` Guide map 三张分类卡增加不同 solid 色条、scope chip 和 bullet 色点；同步更新 `AGENTS.md` 与 `soul.md`，明确颜色分类用 solid rails/chips/dots，不用渐层 fade。
- 原因：用户在移除背景和彩色 fade 后，希望保留更多颜色分类。
- 影响：页面不回到彩色渐层，但不同知识类型和 brand-guide 分类更容易一眼区分。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.09s）；colored fade 关键词检查无残留；`curl -I http://localhost:4180/wiki`、`/wiki/rag-flow`、`/brand-guide`、`/poker` 均返回 200；`git diff --check -- App.tsx styles/shared.css styles/pages/poker.css styles/pages/brand-guide.css AGENTS.md soul.md` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki`，每张 knowledge card 应有不同 solid 分类色；看 `http://localhost:4180/brand-guide`，Guide map 三类应有不同色条和 chip。

### 2026-06-23 23:29

- 类型：前台 / Wiki key points 色条直线化
- 改动：将 `.wiki-key-point-card` 的左侧分类色从 `border-left` 改成内部 `::before` 直线，增加左侧 padding，并让色条上下留距，避免沿着卡片圆角形成弧形。
- 原因：用户指出 Key points 卡片里的 color tag 看起来变成弧线，希望改成直线。
- 影响：`/wiki/rag-flow` 与其他 wiki note 的 Key points 卡片左侧分类色现在是干净竖直线，不再贴着圆角弯曲。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 997ms）；`curl -I http://localhost:4180/wiki/rag-flow` 和 `/wiki` 均返回 200；`git diff --check -- styles/pages/poker.css` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki/rag-flow` 的 Key points section，左侧绿色分类线应为直线。

### 2026-06-23 23:32

- 类型：前台 / Wiki key points 色条贴边
- 改动：调整 `.wiki-key-point-card::before`，把分类线从卡片内部移到 box outline 左边缘，top/bottom 贴齐卡片高度，并移除线条自身圆角。
- 原因：用户要求 color tag 加在 box outline 那边。
- 影响：Key points 卡片的分类色现在贴着 box 左边缘，同时保持直线。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 965ms）；`curl -I http://localhost:4180/wiki/rag-flow` 和 `/wiki` 均返回 200；`git diff --check -- styles/pages/poker.css` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki/rag-flow`，Key points 的绿色线应在卡片 outline 左边缘。

### 2026-06-23 23:35

- 类型：前台 / Wiki note 顶部色条贴边直线化
- 改动：将 `.poker-wiki-note`、`.poker-wiki-index-panel` 和 `.poker-wiki-card` 的顶部分类色从 `border-top` 改成贴在 box outline 顶边的 `::before` 直线，避免顶部色条跟着圆角弯曲；同时保留不同 wiki tone 的分类色。
- 原因：用户指出 Core thesis 外层 note card 顶部色条也需要变成 box outline 上的直线。
- 影响：`/wiki/rag-flow` 的大 note 卡和 `/wiki` 的知识卡顶部色条现在都是贴边直线，不再出现弧形色条。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 976ms）；`curl -I http://localhost:4180/wiki/rag-flow` 和 `/wiki` 均返回 200；`git diff --check -- styles/pages/poker.css` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki/rag-flow`，Core thesis 外层卡片顶部绿色线应在 box outline 顶边且保持直线。

### 2026-06-23 23:39

- 类型：前台 / Wiki 分类线头尾渐隐
- 改动：将 `.poker-wiki-card::before`、`.poker-wiki-note::before`、`.poker-wiki-index-panel::before` 的水平分类线改为线条自身的 90deg gradient，让左右两端渐隐；将 `.wiki-key-point-card::before` 的垂直分类线改为 180deg gradient，让上下两端渐隐。
- 原因：用户要求线的头跟末端都 fade 着去。
- 影响：分类线仍在 box outline 上，仍是直线，但线条两端会柔和收掉；不恢复 card/background fade。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 999ms）；`curl -I http://localhost:4180/wiki/rag-flow` 和 `/wiki` 均返回 200；`git diff --check -- styles/pages/poker.css` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki/rag-flow`，顶部绿色线和 Key points 左线应在两端渐隐。

### 2026-06-23 23:42

- 类型：前台 / Wiki 分类线 CSS polish
- 改动：把 wiki 分类线从颜色 gradient 改为 solid `background` 加 `mask-image` 渐隐，水平线使用 90deg mask，垂直线使用 180deg mask；增加轻微 `saturate(1.08)` 让线条主体更清楚。
- 原因：用户要求加一点 CSS；此次只 polish 线条本身，不恢复 card/background fade。
- 影响：分类线主体更干净，头尾渐隐更稳定；card 背景仍保持纯色。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.06s）；`curl -I http://localhost:4180/wiki/rag-flow` 和 `/wiki` 均返回 200；`git diff --check -- styles/pages/poker.css` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki/rag-flow`，分类线主体应更 solid，头尾仍柔和渐隐。

### 2026-06-23 23:45

- 类型：前台 / Wiki title CSS icons
- 改动：在 `styles/pages/poker.css` 给 `.poker-wiki-card-title`、`.wiki-key-point-card h3` 和 `.poker-wiki-note-section h3` 增加纯 CSS `::before` icon；不同 wiki tone 使用不同 CSS shape：Vite 闪电、background music 声音、button feedback 星形点击、Firebase 数据六边形、skills 多点星、RAG flow 阶梯/卡片形状；icon 跟随当前分类色。
- 原因：用户要求用 CSS 给 title 加一些 icon。
- 影响：`/wiki` cards、`/wiki/rag-flow` Key points 和完整笔记 section title 更容易扫描，同时不使用 emoji、不增加背景 fade。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.08s）；`curl -I http://localhost:4180/wiki`、`/wiki/rag-flow`、`/wiki/vite` 均返回 200；`git diff --check -- styles/pages/poker.css` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki` 和 `http://localhost:4180/wiki/rag-flow`，标题旁应出现对应分类色 CSS icon。

### 2026-06-23 23:49

- 类型：前台 / Brand guide CSS rules 固化
- 改动：在 `/brand-guide` 的 Motion language 下新增 `Current CSS rules` 卡片组，明确四条规则：不要 background/card fade、分类用 solid 色条/点/chip/border/CSS title icon、分类线放在 box outline 且只允许线条头尾渐隐、title icon 默认用 CSS shape 不用 emoji；同步更新 Motion 文案，加入 scan lines 和 card-level color fades 的禁用说明；新增对应 `brand-guide-rule-*` CSS，让规则卡本身使用纯 surface、实色分类线和 CSS title icon。
- 原因：用户要求把刚才确认的 rules 加进 Brand Guide，作为未来页面修改的可见规范。
- 影响：`/brand-guide` 现在不只记录大方向，也记录了当前全站 CSS 执行边界；后续新增 wiki、project 或 brand 页面时可以直接按这组规则检查。
- 验证：`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 978ms）；`curl -I http://localhost:4180/brand-guide` 返回 200；`git diff --check -- App.tsx styles/pages/brand-guide.css` 通过；关键词检查确认 `Current CSS rules` 与四条 rule 已写入 `App.tsx`。
- 后续：本地验证看 `http://localhost:4180/brand-guide#brand-motion`，Motion language 下方应出现 `Current CSS rules` 四张卡。

### 2026-06-23 23:57

- 类型：前台 / Brand Guide 去命名化
- 改动：将 `/brand-guide` 页面文案从个人/项目命名版改成通用 Brand Guide：移除 Brand Guide 区域内 Apple、Eden、Jiju、Poker、Life OS 等名称引用；Hero 改为 `品牌指南 / Brand Guide`；Design logic、Type、Voice、Story、Motion 文案改成普通品牌规范语气；Story section 从项目专属说明改成通用 story log 规则；色彩命名从个人化 accent 改为 `Signal Mint` / `Signal Amber`；同步更新 `/brand-guide` 的 SEO title/description 和 README 路由说明。
- 原因：用户要求 Brand Guide 不要再出现 Apple、Eden、Jiju 等 mentioned name，改成 normal brand guide basic rules。
- 影响：`/brand-guide` 现在更像标准品牌规范页，保留视觉、语气、版式、动效与 CSS rules，但不再依赖具体人物、参考品牌或项目名称来解释规则。
- 验证：Brand Guide 区域关键词检查确认无 `Apple`、`Eden`、`Jiju`、`Poker`、`Life OS` 等命中；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 984ms）；`curl -I http://localhost:4180/brand-guide` 返回 200；`git diff --check -- App.tsx seo-routes.ts README.md log.md` 通过。
- 后续：本地验证看 `http://localhost:4180/brand-guide`，首屏应显示通用 `品牌指南 / Brand Guide`，页面内不再出现那些被点名的名称。

### 2026-06-24 00:04

- 类型：前台 / Wiki emoji 替换为 CSS icon
- 改动：新增 `WikiViteCssIcon`、`WikiBackgroundMusicCssIcon`、`WikiButtonFeedbackCssIcon`、`WikiFirebaseStorageCssIcon`、`WikiSkillsCssIcon` 五个 CSS art component；在 `styles/css-art/wiki-icons.css` 增加共享 `.wiki-topic-icon` 系统和各 slug modifier；`/wiki` 与 wiki note lead 的 `WikiEntryVisual` 改为所有 slug 都使用 CSS icon，不再 fallback 到 `entry.emoji`；移除 `wikiEntries` 的 emoji 字段，并把相关 class 从 `poker-wiki-emoji` 改为 `poker-wiki-visual`；同步更新 `css-art.registry.ts` 与 `docs/css-art-system.md`。
- 原因：用户要求 `http://localhost:4180/wiki` 里面的 emoji 全部拿掉，replace with CSS icon。
- 影响：`/wiki` 总览和 `/wiki/*` note 顶部视觉现在全部是 CSS icon；RAG flow 保留原 CSS icon，其余 Vite、Background music、Button feedback、Firebase lifetime storage、Skills 也都有各自的 CSS icon。
- 验证：`wikiEntries` / wiki visual 关键词检查确认没有 `entry.emoji`、`poker-wiki-emoji` 或 wiki emoji fallback 残留；`npm run typecheck` 通过；`npm run build` 通过（✓ 2085 modules transformed，✓ built in 1.01s）；`curl -I http://localhost:4180/wiki`、`/wiki/vite`、`/wiki/rag-flow` 均返回 200；`git diff --check -- App.tsx components/css-art/index.tsx styles/css-art/wiki-icons.css styles/pages/poker.css css-art.registry.ts docs/css-art-system.md` 通过。
- 后续：本地验证看 `http://localhost:4180/wiki`，六张 wiki card 左上角都应是 CSS icon，不再是 emoji。
