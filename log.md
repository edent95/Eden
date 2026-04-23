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
