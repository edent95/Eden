# Eden Portfolio Site

这是 Eden 的个人展示站，当前核心是「主页 + 项目归档 + Jiju.pet 构建叙事」的单页路由结构。

---

## 1) 当前项目定位

- 这是一个 React + Vite 前端作品站。
- 主要目标是：对外展示经历、项目脉络、以及可复用的构建方法。
- 已包含中英切换（EN / 中文）与多个独立页面路由。

---

## 2) 技术栈

- `React 19`
- `Vite 6`
- `TypeScript`
- `Framer Motion`
- `Lucide React`
- `Tailwind CSS v4 (@tailwindcss/vite)`

---

## 3) 本地开发

前置条件：`Node.js 18+`

```bash
npm install
npm run dev
```

开发服务器固定为：

- `http://localhost:4180`

原因：`vite.config.ts` 已配置 `strictPort: true`，避免端口漂移导致“改了但看不到”。

---

## 4) 构建与预览

```bash
npm run build
npm run preview
```

---

## 5) 页面路由（当前）

- `/`：主页（个人信息、经历、里程碑、兴趣）
- `/jiju-pet`：Jiju.pet 从 0 到 1 构建页面
- `/previous-projects`：完整项目记录
- `/analog-tech`：Analog Tech 图库页
- `/life`：Life 视频页
- `/brand-guide`：品牌指南（视觉、语气、组件与动效约定）
- `/archive/:slug`：归档项目详情页

---

## 6) 内容与维护规则（给后续 agent）

开始改动前，先读这三份文件：

1. `AGENTS.md`（执行规则）
2. `soul.md`（协作偏好与减少返工规则）
3. `log.md`（改动流水）

每次完成真实改动后：

1. 先更新代码 / 文档
2. 跑最小验证（至少 `npm run build`）
3. 追加一条 `log.md` 记录（改动 / 原因 / 影响 / 后续）

---

## 7) GitHub Pages 说明

- 生产环境 `base` 会依据 `GITHUB_REPOSITORY` 自动设置为 `/<repo>/`。
- 站内链接使用 base-aware 组合，避免在子路径部署时路由失效。

