# soul.md

> 目标：减少用户重复下指令、减少返工、减少“我以为你会做”的落差。

## 用户协作偏好（长期）

- 默认语言：中文。
- 默认期待：直接执行，不要只讲方案。
- 对“看不到改动”高度敏感，必须重视本地可验证性。
- 喜欢结果导向，不喜欢空话和过度解释。
- 对内容完整性要求高：允许优化，但不接受删减原本关键信息。
- 对公开表达有要求：文案要专业、克制、可对外展示。
- 喜欢 Jiju app / Jiju cat 这种实体小物件 CSS 动画手感：看得出对象在动，但不要靠 background fade、背景光晕、扫描线、复杂 ambient glow 或 card 内彩色渐层 fade 制造动效。未来改首页或全局 CSS 时，默认移除 background/card fade，把动效放在可见物件本身。
- 需要颜色分类时，用 solid 色条、色点、chip、border 来分类；不要用彩色渐层或 glow 当分类背景。

## 你（后续 agent）必须默认做的事

1. 改动前先确认目标页面和路由是否一致。
2. 改动后运行 `npm run check`；它会执行项目 policy、测试、typecheck、production build 与产物 smoke checks。
3. 告知用户可直接验证的本地地址（例如 `http://localhost:4180/...`）。
4. 每次真实改动后都追加当月 `logs/YYYY-MM.md`，并运行 `npm run log:index` 更新 recent index。
5. 若改动涉及文案，默认检查是否需要中英双语一致。
6. 除非用户明确要求，不要再用截图作为前台验证；优先用构建、关键词检查、代码检查和本地 URL 说明。
7. 若用户要求参考 Apple.com 的排版、字体大小、极简产品页或高级感布局，优先读取 `.agents/skills/apple-design/SKILL.md`，只使用高层设计逻辑，不复制 Apple 品牌或素材。
8. 未来所有页面都要遵守 `/brand-guide` 里的 Apple-like 左右留白规则：桌面端不要默认铺满宽度，优先使用居中的内容岛，常见范围为 `max-width: 900px` 到 `1100px`；grid 通常两栏，mobile 一栏。
9. 以后新增大量 CSS visual / CSS art 时，默认不要继续塞进 `index.css`；复杂视觉放进 `styles/css-art/`，一个视觉家族一个文件，并确保 light/dark mode、`prefers-reduced-motion` 和固定尺寸/比例都处理好。
10. CSS art 如果是图腾 / sigil / glyph / 符号 / emblem，默认做成透明底，像 transparent PNG 一样放进页面；不要默认加固定 app-icon 底、可见外框或重 box-shadow。只有 app icon、真实场景、或用户明确要 framed badge 时才加固定背景。
11. 页面级 CSS 继续增长时，默认放进 `styles/pages/`；`index.css` 只做 main import manifest。共享层固定为 `styles/tokens.css`、`styles/base.css`、`styles/shared.css`、`styles/theme-overrides.css`、`styles/motion.css`，页面不要重复造 card/panel/tag/CTA 的基础数值。
12. 新增、隐藏或调整路由时，先改 `seo-routes.ts` 这份 route registry；SEO、sitemap、README 和页面入口都要从这里同步，避免路由公开状态漂移。
13. 以后复用或新增 CSS art，先查 `css-art.registry.ts` 和 `docs/css-art-system.md`；React 组件从 `components/css-art` import，不要在页面里复制一份 DOM/CSS art markup。
14. 如果用户要求类似 Dan Koe 的内容风格，默认理解为“个人知识品牌 / creator media hub”的内容架构：强观点首页、essay/archive 入口、系统资源货架、真实 build proof 和清晰 CTA；不要照搬 Dan Koe 的文案、承诺或财富/生活方式叙事。
15. 如果用户说 Dan Koe 是 article 写法参考，只取写作手法：强 thesis、短段落、可扫读节奏、pull quote、清晰推进；视觉仍然 follow Eden brand guide，除非用户明确说要换视觉系统。
16. 页面名称、SEO 名称与实际运行模型必须是同一个概念；不要因为两个系统同属一个领域就混用名字。若两套功能都值得保留，拆成独立路由，并在页面内明确互链。
17. 所有页面统一使用 `HeaderControls` + `styles/shared.css` 的最新版 menu system：sticky translucent background、细分隔线、无 Theme/Language 外框、compact-on-selection（现在是 `HeaderControls` 全局默认）与一致的 mobile 紧凑布局。页面文件只决定内容宽度与返回目标，不得再复制或重新定义 menu 的核心视觉与交互。
18. 首页 Penney 区块是 discovery-first 的 Mini Coin Slot，不应直接写出「先选必输」、最优应对、胜率公式或赔率。让访客通过有限 credits、个人胜率和排行榜自己观察规律；完整版策略解释与首页竞技入口保持信息层级分离。

## 防返工清单（执行前自检）

- 这次需求是否会影响多个页面？如果会，默认全量扫一遍，不只改一个点。
- 这次是“只改 UI”还是“也要改内容结构”？
- 是否存在旧页面/旧路由残留，导致用户看到“没变化”？
- 是否保持了 Apple-like 左右留白，避免 desktop 内容、表格、pricing、grid 铺满整屏？
- 是否避免了 background fade / ambient glow / card 内彩色渐层 fade，并把动效放在可见物件本身？
- 如果需要颜色分类，是否使用 solid 色条 / chip / dot，而不是渐层 fade？
- 是否把复杂 CSS art 放进 `styles/css-art/`，而不是继续扩张 `index.css`？
- 是否把可复用 CSS art 登记进 `css-art.registry.ts`，并从 `components/css-art` 复用组件？
- 如果是图腾 / sigil / glyph 类 CSS art，是否默认透明底，而不是做成固定底 app icon？
- 是否把页面级 layout / typography / responsive CSS 放进 `styles/pages/`，并把可复用 card/panel/tag/CTA 数值放进 shared layer，而不是继续扩张 `index.css`？
- 是否需要同步 `README.md`、`AGENTS.md`、当月日志与 `logs/index.md`？
- 页面名称、SEO 与实际实现是否描述同一个概念，而不是把相邻但不同的系统混在一起？
- 是否把“本次完成标准”写清楚给用户（看哪里、看到什么）？
- 如果是 Dan Koe-like 方向，是否先把页面核心 thesis、读者处境、Eden 的独特 lens、真实 proof 和下一步动作理清楚，而不是只改视觉或堆 slogan？
- 如果只是参考 Dan Koe 的 article 写法，是否保留 Eden brand guide 的视觉系统，没有误换成黑底大字风格？
- 页面是否使用当前最新版 menu bar，而不是继续保留或复制旧导航？

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
