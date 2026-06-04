# soul.md

> 目标：减少用户重复下指令、减少返工、减少“我以为你会做”的落差。

## 用户协作偏好（长期）

- 默认语言：中文。
- 默认期待：直接执行，不要只讲方案。
- 对“看不到改动”高度敏感，必须重视本地可验证性。
- 喜欢结果导向，不喜欢空话和过度解释。
- 对内容完整性要求高：允许优化，但不接受删减原本关键信息。
- 对公开表达有要求：文案要专业、克制、可对外展示。
- 喜欢当前 `http://localhost:4180/` 首页的 CSS 动画手感；尤其是慢速背景微动、页面入场和 Current Build/Jiju cat scene 的安静节奏。未来改首页或全局 CSS 时，默认保留这种动效语言，不要无意中删掉或改成夸张动效。

## 你（后续 agent）必须默认做的事

1. 改动前先确认目标页面和路由是否一致。
2. 改动后至少跑一次 `npm run build`。
3. 告知用户可直接验证的本地地址（例如 `http://localhost:4180/...`）。
4. 每次真实改动后都追加 `log.md`。
5. 若改动涉及文案，默认检查是否需要中英双语一致。
6. 除非用户明确要求，不要再用截图作为前台验证；优先用构建、关键词检查、代码检查和本地 URL 说明。
7. 若用户要求参考 Apple.com 的排版、字体大小、极简产品页或高级感布局，优先读取 `skills/apple-editorial-layout/SKILL.md`，只使用高层设计逻辑，不复制 Apple 品牌或素材。
8. 未来所有页面都要遵守 `/brand-guide` 里的 Apple-like 左右留白规则：桌面端不要默认铺满宽度，优先使用居中的内容岛，常见范围为 `max-width: 900px` 到 `1100px`；grid 通常两栏，mobile 一栏。
9. 以后新增大量 CSS visual / CSS art 时，默认不要继续塞进 `index.css`；复杂视觉放进 `styles/css-art/`，一个视觉家族一个文件，并确保 light/dark mode、`prefers-reduced-motion` 和固定尺寸/比例都处理好。
10. CSS art 如果是图腾 / sigil / glyph / 符号 / emblem，默认做成透明底，像 transparent PNG 一样放进页面；不要默认加固定 app-icon 底、可见外框或重 box-shadow。只有 app icon、真实场景、或用户明确要 framed badge 时才加固定背景。
11. 页面级 CSS 继续增长时，默认放进 `styles/pages/`；`index.css` 应逐步收敛为 Tailwind import、全局 theme/base、以及页面和 CSS art 的 import 入口。
12. 新增、隐藏或调整路由时，先改 `seo-routes.ts` 这份 route registry；SEO、sitemap、README 和页面入口都要从这里同步，避免路由公开状态漂移。

## 防返工清单（执行前自检）

- 这次需求是否会影响多个页面？如果会，默认全量扫一遍，不只改一个点。
- 这次是“只改 UI”还是“也要改内容结构”？
- 是否存在旧页面/旧路由残留，导致用户看到“没变化”？
- 是否保持了 Apple-like 左右留白，避免 desktop 内容、表格、pricing、grid 铺满整屏？
- 是否保留了当前首页 CSS 动画的慢速、克制、安静手感？
- 是否把复杂 CSS art 放进 `styles/css-art/`，而不是继续扩张 `index.css`？
- 如果是图腾 / sigil / glyph 类 CSS art，是否默认透明底，而不是做成固定底 app icon？
- 是否把页面级 layout / typography / responsive CSS 放进 `styles/pages/`，而不是继续扩张 `index.css`？
- 是否需要同步 `README.md`、`AGENTS.md`、`log.md`？
- 是否把“本次完成标准”写清楚给用户（看哪里、看到什么）？

## 常见误区（禁止）

- 只改当前页，不检查同类页是否漏改。
- 只说“完成了”，不给用户验证路径。
- 改完不记日志，导致下一位 agent 不知道发生过什么。
- 写了新规则但没同步到 `AGENTS.md`。

## 标准交付格式（建议）

每次完成后，至少给用户这四项：

1. 改了哪些文件。
2. 改了什么（页面级要点）。
3. 如何验证（本地 URL）。
4. 是否通过构建/检查。

## 本文件维护规则

- 用户每次给出“你这里漏了/不对/下次要这样做”，都应抽象为一条可执行规则追加到这里。
- 不写性格分析，只写可执行协作规则。
