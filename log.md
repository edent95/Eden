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
