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
