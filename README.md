# Eden — Portfolio

Eden 的个人站：单页式 React 应用，多路由、中英双语，用于展示经历、项目归档、Jiju.pet 与构建叙事。**当前这版**已包含 SEO（meta、sitemap、JSON-LD、OG 图）、Google Analytics、GitHub Pages 部署，以及活动推广用的独立静态 HTML 页面。

---

## 线上地址

| 环境 | URL |
|------|-----|
| 自定义域（主） | <https://edentan.site> |
| GitHub Pages 默认 | <https://edent95.github.io/Eden/>（当前 CI 以自定义域为优先，**未**为这条 URL 单独构建，见下） |

**Base 路径：** GitHub Actions 在构建时设置 `VITE_BASE=/` 与 `VITE_SITE_URL=https://edentan.site`，使资源与路由以**域名根**为基准（`https://edentan.site/assets/...`）。若你**不设** `VITE_BASE`，本仓库的默认是 `/<仓库名>/`（适合只用 `user.github.io/Repo/`、不用自定义域）。**同一套构建不能同时**兼容「仅子路径」与「仅根域」；以自定义域为主时，请用主域名访问。若从旧版缓存里仍看到请求 `/Eden/assets/...` 的 404，强刷或清缓存即可。

---

## 项目定位

- 对外展示：主页、时间线、品牌指南、图库、Life 视频区、项目归档与详情页。
- 技术叙事：`/jiju-pet` 等长文区块说明 0→1 构建方法。
- 运营侧静态页：`public/mnm11.html` 与 `public/Promotion Page.html`（Vite 会挂到与 `index` 同级的站根 URL）由主站链出，不参与 React 路由。本地需 `http://localhost:4180/mnm11.html` 等形式访问，勿放在仓库根（dev 不提供服务）。

---

## 技术栈

- React 19、Vite 6、TypeScript  
- Framer Motion、Lucide、Tailwind CSS v4（`@tailwindcss/vite`）  
- 可选 3D：`@react-three/fiber` / `drei` / `three`  

---

## 本地开发

需要 **Node.js 18+**。

```bash
npm install
npm run dev
```

开发服务器固定 **<http://localhost:4180>**（`vite.config.ts` 中 `strictPort: true`），避免端口变化导致“改了但看不到”。

```bash
npm run build
npm run preview
```

生产构建时若设置 `VITE_SITE_URL`（如 `https://edentan.site`），会用于站点地图、robots 与 `index.html` 内 OG 绝对地址，与线上域名一致时预览分享卡更准。

---

## 路由（当前）

- `/` — 主页  
- `/jiju-pet` — Jiju.pet 构建叙事  
- `/previous-projects` — 项目列表  
- `/analog-tech` — 胶片图库  
- `/life` — Life 视频页  
- `/brand-guide` — 品牌与组件约定  
- `/archive/:slug` — 归档项目详情  

---

## 部署与基础设施

- **发布：** `main` 推送触发 `.github/workflows/deploy-pages.yml`（建 `dist` 并发布到 **GitHub Pages**）。  
- **SPA 子路径：** `public/404.html` 与 `index.html` 内脚本解决 GitHub Pages 对深链/刷新的 404 问题。  
- **分析：** `index.html` 内已嵌入 GA4（`gtag.js`），Measurement ID 在仓库中维护。  
- **SEO 代码：** 见 `seo.ts`；构建产物含 `sitemap.xml`、`robots.txt`（在配置了站点 URL 时生成）。

---

## 维护约定（给后续协作者与 agent）

动手前先读：

1. `AGENTS.md`  
2. `soul.md`（若存在，协作习惯）  
3. `log.md`（最近改动）  

有真实代码或文档变更时：更新实现 → 至少执行 `npm run build` 通过 → 在 `log.md` 追一条（改动 / 原因 / 影响 / 后续）。

---

## 仓库说明

- 本仓库在概念上也承载 **LLM Wiki** 相关约定，详见 `AGENTS.md` 中「项目身份」与标准操作。 portfolio 与 wiki 规划共用同一套日志与执行规则，避免行为漂移。
