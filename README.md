# Eden — Portfolio

Eden 的个人站：React 互动应用，多路由、中英双语，用于展示经历、项目归档、Jiju.pet 与构建叙事。**当前这版**会为每条 route 生成带真实正文、内链、面包屑、JSON-LD 与 hreflang 的静态 HTML，再由 React 接管互动；同时包含 Google Analytics、GitHub Pages 部署，以及活动推广用的独立静态 HTML 页面。

---

## 线上地址

| 环境 | URL |
|------|-----|
| 自定义域（主） | <https://eden-tan.com> |
| GitHub Pages 默认 | <https://edent95.github.io/Eden/>（当前 CI 以自定义域为优先，**未**为这条 URL 单独构建，见下） |

**Base 路径：** GitHub Actions 在构建时设置 `VITE_BASE=/` 与 `VITE_SITE_URL=https://eden-tan.com`，使资源与路由以**域名根**为基准（`https://eden-tan.com/assets/...`）。若你**不设** `VITE_BASE`，本仓库的默认是 `/<仓库名>/`（适合只用 `user.github.io/Repo/`、不用自定义域）。**同一套构建不能同时**兼容「仅子路径」与「仅根域」；以自定义域为主时，请用主域名访问。若从旧版缓存里仍看到请求 `/Eden/assets/...` 的 404，强刷或清缓存即可。

---

## 项目定位

- 对外展示：主页、时间线、品牌指南、图库、Life 视频区、项目归档与详情页。
- 技术叙事：`/jiju-pet` 等长文区块说明 0→1 构建方法。
- 运营侧静态页：`public/mnm11.html`、`public/Promotion Page.html` 与 `public/hwayik/`（Vite 会原样发布到站根 URL）独立于 React 路由。本地用 `http://localhost:4180/mnm11.html` 或 `http://localhost:4180/hwayik/` 访问，勿放在仓库根（dev 不提供服务）。

---

## 技术栈

- React 19、Vite 6、TypeScript  
- Framer Motion、Lucide、Tailwind CSS v4（`@tailwindcss/vite`）  

---

## 本地开发

需要 **Node.js 18+**。

```bash
npm install
npm run dev
```

开发服务器固定 **<http://localhost:4180>**（`vite.config.ts` 中 `strictPort: true`），避免端口变化导致“改了但看不到”。

```bash
npm run task:new -- "任务名"
npm run ready
npm run publish -- "提交标题"
npm run typecheck
npm run check
npm run build
npm run preview
```

日常开发推荐只记两条：开始任务时运行 `task:new`，完成时运行 `publish`。`publish` 会自动执行 `ready`（生成 Wiki 与日志索引，再跑完整 harness），之后建立 PR、等待必需的 `verify`、squash merge、等待 Pages 部署并检查线上站点。它不会直接 push `main`。

需要预览范围但不产生任何写入时运行 `npm run publish -- "提交标题" --dry-run`；自动化或 Agent 终端没有交互确认，必须在检查变更范围后显式加 `--yes`。只希望建立并验证 PR、不自动合并时加 `--no-merge`。完整说明见 [`docs/operator-workflow.md`](docs/operator-workflow.md)。

给第一次使用的人，可打开图形化菜单：本地开发环境的 <http://localhost:4180/operator-menu.html>，或线上 <https://eden-tan.com/operator-menu.html>。页面用流程图解释闭环，并提供三条核心命令的一键复制。

生产构建时若设置 `VITE_SITE_URL`（如 `https://eden-tan.com`），会用于站点地图、robots 与 `index.html` 内 OG 绝对地址，与线上域名一致时预览分享卡更准。

---

## 路由（当前）

- `/` — 主页
- `/jiju-pet` — Jiju 产品详情：可信宠物友好地点发现、宠物档案、到访记忆与社区资料
- `/jiju-revamp` — Jiju 从宠物友好目录转向本地生活探索的平台提案
- `/project` — Eden 已构建产品的 app shelf
- `/project-css` — Projects / Home / Interests CSS art 直达检查页（隐藏直达页；不进 sitemap）
- `/icon-prompts` — ETReportHub / Jiju / Friday Poker Club 四宫格 icon prompt 复制页（隐藏直达页；不进 sitemap）
- `/etreporthub` — ETReportHub 日报数据系统产品页
- `/etreporthub-sales` — ETReportHub 售卖页与价格说明
- `/dr-racing` — Dr Racing 摩托车贷款仪表台产品页，内嵌公开 Demo
- `/hwayik/` — 华益旅游「彭氏祭祖 · 潮汕九日行」独立客户旅行手册
- `/poker` — Friday Poker Club 产品详情：私人房间、邀请、买入、实时牌桌与 Build Notes
- `/wiki` — 独立知识库总览，沉淀跨项目可复用 skills
- `/wiki/vite` — Vite 构建技能笔记
- `/wiki/background-music` — 背景音乐 UX 笔记
- `/wiki/button-feedback` — 按钮反馈 UX 笔记
- `/wiki/firebase-lifetime-storage` — Firebase lifetime storage 笔记
- `/wiki/skills` — 跨项目 skills map
- `/wiki/rag-flow` — Tag Registry 与 RAG flow 知识架构页
- `/film-gallery` — Film Gallery / 胶片图库（旧 `/analog-tech` 会自动换到新地址）
- `/film-gallery` 支持安装为独立 PWA，也可一键把 15 张照片、相机、胶卷与说明打包成单一离线 HTML
- `/notes` — Eden 发布的文章与 Build Notes 归档
- `/notes/:slug` — Eden 原创 synthesis note 独立文章页
- `/life-os` — 人生 RPG 能力系统 / Life OS 角色档案页
- `/life` — Life 视频页（隐藏直达页；不在首页入口，不进 sitemap，客户端 SEO 设为 noindex）
- `/brand-guide` — 持续与月度 change log 对齐的 Brand Guide：核心主张、视觉、语气、版式、资产类型、动效与实现规则
- `/topics` — Topic Market：一张卡一个问题和 icon，回答控件按问题类型变化（当前浏览器本地保存；noindex，不进 sitemap）
- `/conways-game-of-life` — 真正的二维 Conway B3/S23 互动生命棋盘，并从 0/1 细胞延伸到八种邻域、六十四卦、256 条 Elementary Rules 与莱布尼茨的历史桥梁
- `/conways-game-of-life` 可通过页面内 `Install app / 安装 App` 安装为 standalone PWA；不支持安装提示的 Safari 会显示加入主画面 / Dock 指引
- `/penneys-game` — Penney's Game 硬币骗局：5 关筹码对赌战役、限时盲选排位赛与全球排行榜、自由对战实验室
- `/penneys-game` 的胜率用 Conway leading-numbers 公式精确计算（`services/penneyGame.ts`）；排行榜走 Firebase RTDB REST，无新增 npm 依赖，规则与部署见 `docs/penney-leaderboard.md`
- 首页 `/#penney` 是不公开攻略的 Mini Coin Slot：服务端按 IP 每天发放 100 credits，记录 lifetime plays / wins / win rate，满 10 局后进入访客排行榜；API、隐私边界与部署方式见 `docs/penney-mini-arena.md`
- `/cellular-automata-lab` — 独立的 256 elementary cellular automata rules explorer
- `/archive/:slug` — 归档项目详情
- PWA manifest 按路由映射（`vite.config.ts` 的 `web-app-manifest-with-base`）：`/film-gallery` → `film-gallery.webmanifest`，`/conways-game-of-life` → `conway.webmanifest`，其余所有路由（含首页）→ `site.webmanifest`（Eden Tan，`start_url: ./`）

---

## 部署与基础设施

- **验证：** Pull Request 触发 `.github/workflows/verify.yml`，必须通过统一 harness。
- **发布：** `main` 推送触发 `.github/workflows/deploy.yml`；同一 workflow 先通过统一 harness，再把 `dist` 发布到 **GitHub Pages**。
- **Mini Coin Slot API：** Firebase Functions v2 的 `penneyMiniApi` 负责 IP HMAC、马来西亚时间每日 100 credits、服务端回合结果与访客排行榜；前端静态站不持有原始 IP，也不能直接写比赛记录。
- **操作入口：** `npm run task:new` 建安全工作分支，`npm run publish` 串联 ready、PR、verify、merge、deploy 与 live check。
- **分支保护：** `main` 要求 `verify`、分支保持最新并解决 review conversations；管理员同样受保护，force-push 与删除已禁用。
- **Route HTML：** production build 会依据 `seo-routes.ts` 为每个 route 生成英文 `<route>/index.html` 与中文 `/zh/<route>/index.html`。服务器响应直接包含真实 H1、Wiki/Notes 正文、主题集群内链、面包屑、页面类型 JSON-LD、canonical 与 hreflang；React 加载后接管等价互动页面。`public/404.html` 只保留给 registry 之外的未知路径作 SPA fallback。
- **分析：** `index.html` 内已嵌入 GA4（`gtag.js`），Measurement ID 在仓库中维护。  
- **SEO 代码：** route metadata 在 `seo-routes.ts`，静态正文与 schema 在 `seo-prerender.ts`，客户端同步在 `seo.ts`；构建产物含双语 alternate 与真实 `lastmod` 的 `sitemap.xml`、`robots.txt`（在配置了站点 URL 时生成）。

---

## 维护约定（给后续协作者与 agent）

动手前先读：

1. `AGENTS.md`  
2. `soul.md`（若存在，协作习惯）  
3. `state/current.md`（当前架构与已知风险）
4. `logs/index.md`（最近改动；需要时才进入月度档案）

有真实代码或文档变更时：更新实现 → 在当月 `logs/YYYY-MM.md` 追加一条（改动 / 原因 / 影响 / 验证 / 后续）→ 运行 `npm run log:index` → 执行 `npm run check`。

`npm run check` 是唯一的完成闸门，会执行：本地 skill 路径检查、route/SEO/README 一致性、日志规则、Wiki 结构检查、CSS art 结构检查、单元测试、TypeScript、production build 与 built-site smoke checks。单独的 `npm run build` 只证明 Vite 可以产出文件，不代表任务完成。

Wiki 与 Notes 的可编辑来源位于 `wiki/pages/`、`wiki/essays/`。修改 frontmatter 或结构化双语 payload 后运行 `npm run wiki:build`，生成的 `generated/content.ts` 必须一并提交；不要直接修改生成文件。

CSS art 复用入口：先看 `css-art.registry.ts` 与 `docs/css-art-system.md`，组件统一从 `components/css-art` 复用，样式放在 `styles/css-art/`。

CSS 入口：`index.css` 只做 main import manifest。共享层为 `styles/tokens.css`（theme variables）、`styles/base.css`（body / page-shell）、`styles/shared.css`（shared card / panel / tag / CTA tokens）、`styles/theme-overrides.css`（dark utility overrides）和 `styles/motion.css`（全局 motion / keyframes）；路由样式放在 `styles/pages/`，复杂 CSS art 放在 `styles/css-art/`。

---

## 仓库说明

- 本仓库同时承载可执行的 **LLM Wiki**：`wiki/` 是可编辑 Markdown source，`generated/content.ts` 是网站消费的编译结果，规则与操作见 `AGENTS.md`。Portfolio 与 Wiki 共用同一套日志和 harness，避免行为漂移。
