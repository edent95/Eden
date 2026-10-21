/**
 * MiYa brand guide copy, shared by the React page (`components/MiyaBrandPage.tsx`) and the
 * prerendered static body (`seo-static-content.ts`). Values (colours, type scale, spacing) are
 * taken from the MiYa app's `web/style.css` and `engraved.css` in edent95/Health; keep them in step.
 * Layout follows `/brand-guide` (same `brand-guide-*` classes).
 */

export type MiyaBrandLocalized = { en: string; zh: string };

const L = (en: string, zh: string): MiyaBrandLocalized => ({ en, zh });

/** Images live next to the route in `public/project/miya/brand/`. */
export const MIYA_BRAND_ASSETS = {
  appIcon: 'project/miya/brand/miya-app-icon.png',
  watchIcon: 'project/miya/brand/miya-watch-icon.png',
  heartMark: 'project/miya/brand/miya-heart-mark.svg',
} as const;

export type MiyaSwatch = { name: string; light: string; dark: string; use: MiyaBrandLocalized };

export const MIYA_BRAND = {
  kicker: L('MiYa · Brand guide', 'MiYa · 品牌指南'),
  title: L('MiYa', 'MiYa'),
  subtitle: L('Health data in plain words.', '用大白话看懂你的健康数据。'),
  copy: L(
    'An Apple Health report generated only on your own iPhone. The look is a banknote engraving: rice paper, hatching, double rules, guilloché, and one brand-red heart in the middle.',
    '一份只在你自己的 iPhone 上生成的 Apple 健康报告。视觉是一张钞票凹版：米纸、排线、双线框、扭索纹，中间一颗品牌红的心。',
  ),
  ctaPrimary: L('View the voice', '看怎么说话'),
  ctaSecondary: L('Privacy & support', '隐私政策与支持'),
  signatureLabel: L('Three promises', '三条承诺'),
  signatureLine: [L('Readable. On device.', '看得懂，只在本机，'), L('Not a diagnosis.', '不是诊断。')],

  map: {
    kicker: L('Guide map', 'Guide map'),
    title: L('Use it in order.', '按顺序使用。'),
    copy: L('Words first. Then the surface. Then the assets.', '先说话，再视觉，最后是资产。'),
    groups: [
      { scope: L('Start here', '先看这里'), name: L('Words', '文字'), items: [L('Voice', '怎么说话'), L('Name', '名字')] },
      { scope: L('Build the screen', '用于界面'), name: L('Surface', '表层'), items: [L('Colour', '色彩'), L('Type', '字体'), L('Spacing and ratio', '间距与比例')] },
      { scope: L('Make the pieces', '制作物件'), name: L('Assets', '资产'), items: [L('Logos', '标志'), L('Icons', '图标'), L('Motion', '动效'), L('Tools', '制作工具')] },
    ],
  },

  voice: {
    kicker: L('01 / Voice', '01 / Voice'),
    title: L('One plain sentence, then stop.', '一句大白话，讲完就停。'),
    copy: L(
      'At most one line under each number: the conclusion first, then an everyday comparison. Jargon gets one sentence, inside the “?” bubble.',
      '每个数字下面最多一句解读，先说结论，再给一个日常比方。术语只留一句解释，放进「?」气泡里。',
    ),
    pairs: [
      { ctx: L('Explaining a metric', '指标解释'), prefer: L('Heartbeats per minute at rest. Lower means less effort.', '静坐时每分钟心跳，越低越省力。'), avoid: L('Resting heart rate (RHR) is an important indicator of cardiovascular health…', '静息心率（RHR）是衡量心血管健康的重要指标……') },
      { ctx: L('A change', '变化'), prefer: L('Your heart beats 6 fewer times a minute than before, so it works less hard.', '心脏比之前每分钟少跳 6 下，干活更省力了。'), avoid: L('Your resting heart rate shows a significant downward trend.', '您的静息心率呈显著下降趋势。') },
      { ctx: L('Scores', '分数'), prefer: L('0–100, compared with your usual.', '0–100，和你的平时比。'), avoid: L('A comprehensive health score powered by advanced algorithms', '基于先进算法的综合健康评分') },
      { ctx: L('Page titles', '页标题'), prefer: L('Health / Heart / Recovery / Activity / Workouts / Data', '健康 / 心率 / 恢复 / 活动 / 运动 / 数据'), avoid: L('My health data overview centre', '我的健康数据总览中心') },
      { ctx: L('Progress', '进度'), prefer: L('12 km to go', '还差 12 公里'), avoid: L('Only 12 km left to the next stop!', '距离下一站尚有 12 公里路程!') },
    ],
    rules: [
      { title: L('Say “you”', '称呼用「你」'), copy: L('Not the formal 您 in Chinese. Short English sentences, no exclamation marks.', '不用「您」。英文用 you，句子短，不用感叹号。') },
      { title: L('No emoji', '不用 emoji'), copy: L('Wherever an emoji would go, use an engraved icon instead.', '原本放 emoji 的地方，一律换成凹版图标。') },
      { title: L('Space before units', '数字与单位空一格'), copy: L('`62 bpm`, `48 ms`, `last 90 days`.', '`62 次/分`、`48 ms`、`近 90 天`。') },
      { title: L('Two languages in step', '中英两套同步'), copy: L('Change both together. No Chinese inside the English version.', '中英两套文案同步改；英文版里不出现中文。') },
    ],
    boundaries: [
      {
        title: L('Health boundaries are hard rules', '健康边界是硬规矩'),
        copy: L(
          'Scores are relative estimates “compared with your usual”, never normal or abnormal. With no sleep data, say it can’t be judged. Never diagnose. When a warning is needed, give something to do:',
          '分数一律说成「和你的平时比」的相对估算，不说正常或异常。没有睡眠数据时直说无法判断。绝不写诊断，不出现「心脏不好」「可能患有」。需要提醒时，给出能做的事：',
        ),
        quote: L(
          'If you have chest pain, marked shortness of breath, dizziness or palpitations, stop exercising and seek medical care.',
          '如有胸痛、明显气短、头晕或心悸，请停止运动并及时就医。',
        ),
      },
      {
        title: L('Privacy in checkable facts', '隐私要说得具体'),
        copy: L('Use facts a reader can verify, not adjectives. No “military-grade encryption”, no “absolutely safe”.', '用能核对的事实，不用形容词。不写「军工级加密」「绝对安全」。'),
        quote: L(
          'Everything is calculated on your iPhone. No account, no servers, no analytics, no ads. MiYa only reads from Health and never writes to it.',
          '所有计算都在你的 iPhone 上完成。不注册账号，没有服务器，没有统计分析，没有广告。只读取「健康」里的数据，从不写入。',
        ),
      },
    ],
  },

  name: {
    kicker: L('02 / Name', '02 / Name'),
    title: L('MiYa, one way only.', 'MiYa，只有一种写法。'),
    copy: L(
      'Capital M and Y, no space. One space between Chinese and MiYa. Inside the app the header says one word: “Health”.',
      'M 和 Y 大写，中间没有空格。中文和 MiYa 之间留一个空格。App 内页头只写一个词：「健康」。',
    ),
    cards: [
      { index: L('Right', '正确'), big: L('MiYa', 'MiYa'), copy: L('The only spelling.', '唯一的写法。'), wrong: false },
      { index: L('Store name', '商店名'), big: L('MiYa Health Report', 'MiYa 健康报告'), copy: L('Chinese store name: MiYa 健康报告.', '英文商店名是 MiYa Health Report。'), wrong: false },
      { index: L('Wrong', '错误'), big: L('Miya · MIYA · miya', 'Miya · MIYA · miya'), copy: L('None of these.', '都不对。'), wrong: true },
    ],
  },

  color: {
    kicker: L('03 / Colour', '03 / Colour'),
    title: L('Neutral screen, one red heart.', '中性色为主，一颗红心。'),
    copy: L(
      'Brand red appears in one or two places per screen. Engraved pieces have their own inks: ink green on rice paper in light mode, bronze gold on near-black in dark mode.',
      '品牌红一屏只出现在一两处。凹版件（图标、横幅、纹章、App 图标）有自己的一套墨色：浅色是墨绿配米纸，深色是古铜金配近黑。',
    ),
    key: [
      { name: L('Brand red', '品牌红'), token: 'accent', light: '#f2385a', dark: '#ff4768' },
      { name: L('Engraving line', '凹版线'), token: 'engrave-line', light: '#2f6b55', dark: '#d9b56f' },
      { name: L('Gold foil', '金箔'), token: 'engrave-gold', light: '#c9a44c', dark: '#f2cf7a' },
    ],
    legend: L('Left half: light theme · right half: dark theme', '左半：浅色主题 · 右半：深色主题'),
    groups: [
      {
        title: L('Base and text', '底色与文字'),
        copy: L('`page` for the page, `surface` for cards. `ink` for body text, `ink-2` for secondary.', '整页用 `page`，卡片用 `surface`。正文 `ink`，次要 `ink-2`。'),
        swatches: [
          { name: 'page', light: '#f5f6f8', dark: '#0b0d11', use: L('Page background', '整页底色') },
          { name: 'surface', light: '#ffffff', dark: '#15181e', use: L('Cards, sheets', '卡片、弹层') },
          { name: 'surface-2', light: '#f0f2f5', dark: '#20242c', use: L('Wells, inputs, tab bar', '槽、输入框、标签栏') },
          { name: 'ink', light: '#16171a', dark: '#f7f8fa', use: L('Titles, values, body', '标题、数值、正文') },
          { name: 'ink-2', light: '#5b5e66', dark: '#bdc0c8', use: L('Secondary text', '次要文字') },
          { name: 'ink-muted', light: '#8d919a', dark: '#7f848f', use: L('Footnotes; low contrast in light', '注脚；浅色下对比度不足') },
          { name: 'grid', light: '#e8e9ed', dark: '#292d35', use: L('Grid, dividers', '网格、分隔线') },
          { name: 'axis', light: '#d1d3d9', dark: '#373c46', use: L('Axes, ticks', '坐标轴、刻度') },
        ],
      },
      {
        title: L('Brand red', '品牌红'),
        copy: L('One or two places per screen: primary button, selection, focus, the heart.', '一屏一两处：主按钮、选中、焦点、那颗心。'),
        swatches: [
          { name: 'accent', light: '#f2385a', dark: '#ff4768', use: L('Brand red', '品牌红') },
          { name: 'accent-soft', light: '#fff0f3', dark: '#321822', use: L('Selected background', '选中项的浅底') },
        ],
      },
      {
        title: L('Engraving', '凹版'),
        copy: L('Inks for icons, banners, emblems and the app icon.', '图标、横幅、纹章与 App 图标的墨色。'),
        swatches: [
          { name: 'engrave-line', light: '#2f6b55', dark: '#d9b56f', use: L('Hatching, double rules, tick rings', '排线、双线框、刻度环') },
          { name: 'engrave-paper', light: '#f3e6c4', dark: '#080b0a', use: L('Rice paper (36% into surface in light)', '米纸底（浅色按 36% 混入 surface）') },
          { name: 'engrave-gold', light: '#c9a44c', dark: '#f2cf7a', use: L('Gold foil, one spot per piece', '金箔，每件只点一处') },
          { name: 'map-paper', light: '#efe2bf', dark: '#16130e', use: L('Treasure-map parchment', '寻宝地图的羊皮纸') },
          { name: 'map-ink', light: '#5b4526', dark: '#d9b56f', use: L('Map lines and place names', '地图墨线与地名') },
          { name: 'map-red', light: '#b3352b', dark: '#e2574c', use: L('Map destination', '地图终点') },
        ],
      },
      {
        title: L('Chart series', '图表系列'),
        copy: L('Take them in order; don’t skip.', '按顺序取色，不跳号。'),
        swatches: [
          { name: 'series-1', light: '#2a78d6', dark: '#3987e5', use: L('Blue · also the link colour', '蓝 · 也是链接色') },
          { name: 'series-2', light: '#eb6834', dark: '#d95926', use: L('Orange', '橙') },
          { name: 'series-3', light: '#1baf7a', dark: '#199e70', use: L('Teal · engraving wash', '青绿 · 凹版色洗') },
          { name: 'series-4', light: '#eda100', dark: '#c98500', use: L('Amber · battery', '琥珀 · 电量') },
          { name: 'series-5', light: '#e87ba4', dark: '#d55181', use: L('Pink', '粉') },
          { name: 'series-6', light: '#008300', dark: '#008300', use: L('Green', '绿') },
          { name: 'series-7', light: '#4a3aa7', dark: '#9085e9', use: L('Purple', '紫') },
          { name: 'series-8', light: '#e34948', dark: '#e66767', use: L('Red', '红') },
        ],
      },
      {
        title: L('Status', '状态'),
        copy: L('Shapes only, always paired with a word or an arrow.', '只画图形，并且总配一个词或箭头。'),
        swatches: [
          { name: 'good', light: '#0ca30c', dark: '#0ca30c', use: L('Good (shape)', '好（图形）') },
          { name: 'good-text', light: '#006300', dark: '#0ca30c', use: L('Good (text)', '好（文字）') },
          { name: 'warn', light: '#fab219', dark: '#fab219', use: L('Keep an eye on', '留意') },
          { name: 'serious', light: '#ec835a', dark: '#ec835a', use: L('High / tired', '偏高 / 偏累') },
          { name: 'critical', light: '#d03b3b', dark: '#d03b3b', use: L('Needs attention', '需要注意') },
        ],
      },
    ] as Array<{ title: MiyaBrandLocalized; copy: MiyaBrandLocalized; swatches: MiyaSwatch[] }>,
    rules: [
      { title: L('Cards without borders', '卡片不画边框'), copy: L('`page` underneath, `surface` for cards; `shadow` separates them.', '页面用 `page` 打底，卡片用 `surface`，靠 `shadow` 和页面分开。') },
      { title: L('Red has four jobs', '品牌红只有四个用处'), copy: L('Primary button, selection, focus ring, and the heart on the overview. Selected rows use `accent-soft`.', '主按钮、选中态、焦点圈和首页那颗心。选中项的底用 `accent-soft`。') },
      { title: L('Never red vs green alone', '不能只靠红绿区分'), copy: L('Status colours draw shapes (dots, bars, rings), each paired with a word or an arrow.', '状态色只画图形（点、条、圆环），每个状态都配一个词或箭头。') },
      { title: L('One spot of gold', '金箔只点一处'), copy: L('A pointer, a landing spot, a highlighted day, or the dot on the heart.', '指针、落脚点、高亮日、心上的那粒圆点。') },
      { title: L('Two known low contrasts', '两处已知低对比'), copy: L('`ink-muted` on white is 3.2:1, so footnotes only. White on `accent` is 3.8:1, so primary button text is 13px bold or larger.', '浅色下 `ink-muted` 在白底上只有 3.2:1，只给可有可无的注脚；白字放在 `accent` 上是 3.8:1，所以主按钮文字用 13px 粗体以上。') },
    ],
  },

  type: {
    kicker: L('04 / Type', '04 / Type'),
    title: L('System fonts, φ steps.', '系统字体，按 φ 递进。'),
    copy: L(
      'PingFang for Chinese, San Francisco for Latin. The app never goes online, so no web fonts. Sizes step by φ: 11 → 13 → 16 → 21 → 34 → 55.',
      '中文苹方，西文 San Francisco。App 不连外网，所以不加载任何网络字体。字号按 φ 递进：11 → 13 → 16 → 21 → 34 → 55。',
    ),
    rows: [
      { token: 'hero-value', spec: '55 / 1.236 · 680', size: 55, lh: 1.236, weight: 680, sample: L('62', '62'), unit: L('bpm', '次/分') },
      { token: 'value', spec: '34 / 1.236 · 680', size: 34, lh: 1.236, weight: 680, sample: L('48', '48'), unit: L('ms', 'ms') },
      { token: 'section-title', spec: '21 / 1.236 · 600', size: 21, lh: 1.236, weight: 600, sample: L('You today', '今天的你') },
      { token: 'card-title', spec: '16 / 1.236 · 600', size: 16, lh: 1.236, weight: 600, sample: L('Resting heart rate', '静息心率') },
      { token: 'lede', spec: '16 / 1.618 · 400', size: 16, lh: 1.618, weight: 400, sample: L('Your heart beats 6 fewer times a minute than before.', '心脏比之前每分钟少跳 6 下，干活更省力了。') },
      { token: 'body', spec: '14 / 1.55 · 400', size: 14, lh: 1.55, weight: 400, sample: L('Heartbeats per minute at rest. Body text stays within 62ch.', '静坐时每分钟心跳，越低越省力。正文行宽不超过 62ch。') },
      { token: 'ui', spec: '13 / 1.618 · 400', size: 13, lh: 1.618, weight: 400, sample: L('Last 90 days · Last year · All', '近 90 天 · 近 1 年 · 全部') },
      { token: 'caption', spec: '11 / 1.55 · 400', size: 11, lh: 1.55, weight: 400, sample: L('Average of the last 7 days.', '最近 7 天的平均。') },
      { token: 'eyebrow', spec: '11 / 1.55 · 700 · +0.08em', size: 11, lh: 1.55, weight: 700, sample: L('OCT 19 · CHARGED', '10 月 19 日 · 电量足'), tracking: true },
    ] as Array<{ token: string; spec: string; size: number; lh: number; weight: number; sample: MiyaBrandLocalized; unit?: MiyaBrandLocalized; tracking?: boolean }>,
    rules: [
      { title: L('Tabular numbers', '数字等宽'), copy: L('Use `tabular-nums` wherever numbers line up in columns.', '数字成列对齐的地方一律加 `tabular-nums`。') },
      { title: L('Three weights', '三档字重'), copy: L('Titles 600, values 680, eyebrows 700 with 0.08em tracking.', '标题字重 600，数值 680，眉标 700 加 0.08em 字距。') },
    ],
  },

  space: {
    kicker: L('05 / Spacing and ratio', '05 / Spacing and ratio'),
    title: L('Fibonacci spacing, golden points.', '斐波那契间距，黄金点构图。'),
    copy: L(
      'Spacing only uses Fibonacci numbers; each step is about φ = 1.618 times the last. The focal point sits on the 38.2% / 61.8% lines.',
      '间距只取斐波那契数列，相邻两级之比趋近 φ = 1.618。主体落在 38.2% / 61.8% 的黄金点上。',
    ),
    steps: [
      { token: 'sp-1', px: 5, use: L('Icon to text', '图标与文字之间') },
      { token: 'sp-2', px: 8, use: L('Within a group', '同组元素') },
      { token: 'sp-3', px: 13, use: L('Button padding', '按钮内边距') },
      { token: 'sp-4', px: 21, use: L('Card padding', '卡片内边距') },
      { token: 'sp-5', px: 34, use: L('Between blocks', '区块之间') },
      { token: 'sp-6', px: 55, use: L('Between large sections', '大段落之间') },
    ],
    radii: [
      { token: 'r-1', value: '8px', use: L('Buttons, small tags', '按钮、小标签') },
      { token: 'r-2', value: '13px', use: L('Inset panels, bubbles', '内嵌面板、气泡') },
      { token: 'r-3', value: '21px', use: L('Cards', '卡片') },
      { token: 'r-icon', value: '22.5%', use: L('App and engraved icons', 'App 与凹版图标') },
    ],
    rules: [
      { title: L('1.618fr : 1fr', '1.618fr : 1fr'), copy: L('Two-column cards split at the golden ratio.', '卡片分栏用黄金比例切。') },
      { title: L('Focus on the golden point', '焦点放在黄金点'), copy: L('Pointers and highlighted days sit there; gauge openings are ±38.2°; aspect ratios are 1 : φ.', '焦点、指针、高亮日放在黄金点；表盘开口 ±38.2°；宽高比取 1 : φ。') },
      { title: L('One lead per screen', '一屏一件主角'), copy: L('The overview opens with the energy emblem; every other page opens with a cover banner. No values inside illustrations.', '总览第一屏是能量纹章，其余每页的页头是一条封面横幅。插图里不写数值。') },
    ],
  },

  logo: {
    kicker: L('06 / Logos', '06 / Logos'),
    title: L('One heart, three marks.', '一条心形线，三枚标志。'),
    copy: L(
      'All three marks come from the same heart curve. Use the originals; never redraw them or swap in a ♥ character or a third-party icon.',
      '三枚标志都来自同一条心形线。用原件，不要重画；心形不用通用的 ♥ 字符或第三方图标代替。',
    ),
    marks: [
      { asset: 'appIcon', shape: 'round', title: L('App icon', 'App 图标'), alt: L('MiYa iPhone app icon: an engraved heart on a dark plate', 'MiYa iPhone App 图标：深色底上的凹版心'), copy: L('Dark plate, φ tick ring, guilloché, hatched brand-red heart, one spot of gold. iOS rounds the corners; don’t add a frame or shadow.', '深色底，φ 刻度环、扭索纹、排线填面的品牌红心，一粒金箔。圆角由系统裁切，不要自己加框或阴影。') },
      { asset: 'watchIcon', shape: 'circle', title: L('Watch icon', '手表图标'), alt: L('MiYa Apple Watch icon', 'MiYa Apple Watch 图标'), copy: L('The same heart for the watch, cropped to a circle by watchOS. Change any icon and bump the iPhone, watch and widget versions together.', '同一颗心的手表版，系统裁成圆形。改任何一处图标，iPhone、手表、小组件三个 target 的版本号一起改。') },
      { asset: 'heartMark', shape: 'sizes', title: L('Heart mark', '心形标'), alt: L('MiYa heart mark', 'MiYa 心形标'), copy: L('Rice paper, double rule, brand-red heart. For browser tabs and anything under 32px. One file for both themes.', '米纸底、双线框、品牌红心形。浏览器标签和 32px 以下的场景用它。深浅主题都用同一份。') },
    ] as Array<{ asset: keyof typeof MIYA_BRAND_ASSETS; shape: 'round' | 'circle' | 'sizes'; title: MiyaBrandLocalized; alt: MiyaBrandLocalized; copy: MiyaBrandLocalized }>,
    dontsLabel: L('Don’t', '不要这样用'),
    donts: [
      { id: 'stretch', label: L('Stretch', '不拉伸') },
      { id: 'rotate', label: L('Rotate', '不旋转') },
      { id: 'glow', label: L('Add glow or shadow', '不加发光或阴影') },
      { id: 'recolor', label: L('Recolour', '不换色') },
      { id: 'low', label: L('Low-contrast backgrounds', '不放进低对比背景') },
    ],
  },

  icons: {
    kicker: L('07 / Icons', '07 / Icons'),
    title: L('Every icon has a formula.', '每个图标都有一个数学母题。'),
    copy: L(
      'Icons are small engraved pieces drawn in pure CSS, in a 1:1 rounded frame: rice paper, double rule, a slowly turning guilloché ring, a hatched subject with a double outline, one spot of gold, one colour wash, and one small motion.',
      '图标是纯 CSS 画的凹版小件，1:1 圆角框：米纸版面、双线框、慢转的扭索纹环、主体（排线填面、双线描边、一点金箔、一种色洗），再加一个小动效。',
    ),
    motifs: [
      { name: L('Heart', '心'), id: 'heart', formula: L('Heart curve x = 16 sin³t', '心形线 x = 16 sin³t') },
      { name: L('Steps', '脚印'), id: 'steps', formula: L('1 : φ golden ellipse soles, feet at 38.2% / 61.8%', '鞋底 1 : φ 的黄金椭圆，两脚落在 38.2% / 61.8%') },
      { name: L('Medal', '勋章'), id: 'medal', formula: L('φ pentagram: diagonal : side = φ', 'φ 五芒星，对角线 : 边 = φ') },
      { name: L('Compass', '罗盘'), id: 'compass', formula: L('φ tick ring, radius 23.6 → 38.2', 'φ 刻度环，半径 23.6 → 38.2') },
      { name: L('Journey', '旅程'), id: 'traveler', formula: L('Golden spiral; a light walks out from the pole', '黄金螺旋，光点从极点向外走') },
      { name: L('Blood oxygen', '血氧'), id: 'drop', formula: L('Square turned 45°, height : width = √2 : 1', '正方形转 45°，高 : 宽 = √2 : 1') },
      { name: L('Breath', '呼吸'), id: 'breath', formula: L('One circle cut into two arcs opening at 38.2% / 61.8%', '同一个圆切两段弧，按 38.2% / 61.8% 开合') },
      { name: L('Gauge', '表盘'), id: 'gauge', formula: L('φ tick arc with a ±38.2° opening', '开口 ±38.2° 的 φ 刻度弧') },
      { name: L('Stairs', '阶梯'), id: 'stairs', formula: L('Three treads stepping by φ', '三级踏步按 φ 递进') },
    ],
    rules: [
      { title: L('Formula first', '先找母题'), copy: L('Find the formula, then draw. Focus on the golden point; inks are the three engraving colours plus one series colour as a wash.', '新图标先找母题，再画。焦点放在黄金点，颜色只取凹版三色和一种系列色作色洗。') },
      { title: L('Size through one variable', '尺寸只改一个变量'), copy: L('Only change `--gi-size`. Below 48px, drop the tick ring and construction lines and thicken the strokes.', '尺寸只改 `--gi-size`；小于 48px 时去掉刻度环与构造线，线条加粗。') },
    ],
  },

  motion: {
    kicker: L('08 / Motion', '08 / Motion'),
    title: L('Quiet by default.', '默认安静。'),
    copy: L('One main action at a time; everything else breathes or turns very slowly.', '一次只有一个主动作，其余是很慢的呼吸或旋转。'),
    rules: [
      { title: L('One easing curve', '统一缓动'), copy: L('`cubic-bezier(.23,1,.32,1)`: fast, then settle.', '`cubic-bezier(.23,1,.32,1)`：先快后稳。') },
      { title: L('Motion follows data', '主动作跟数据走'), copy: L('The emblem pointer sweeps to the battery level; the map route draws in. Only `transform` and `opacity` move.', '纹章指针扫到电量的位置、地图航迹进场。只动 `transform` 和 `opacity`。') },
      { title: L('Slow guilloché', '扭索纹慢转'), copy: L('One turn takes 60–240 seconds.', '转一圈 60–240 秒。') },
      { title: L('Reduced motion stops everything', '减少动态效果时一切静止'), copy: L('When the system setting is on, nothing moves.', '系统打开「减少动态效果」时，一切静止。') },
    ],
  },

  tools: {
    kicker: L('09 / Tools', '09 / Tools'),
    title: L('Start from the skills.', '先用技能，不从零画。'),
    copy: L('For MiYa screens and illustrations, reach for these agent skills first.', '做 MiYa 的界面与插画，先用这些 agent 技能，不要每次从零画。'),
    list: [
      { skill: 'golden-engraving', status: 'main', label: L('Golden-ratio engraving', '黄金比例凹版插画'), copy: L('Engraved icons, the heart in the app icon, manual-style illustrations. All 17 current icons come from it.', '凹版图标、App 图标的那颗心、说明书式插画。现有 17 个图标都出自它。') },
      { skill: 'engraved-ui', status: 'main', label: L('Engraved UI pieces', '凹版界面构件'), copy: L('Cover banners, the energy emblem, plate shells for chart cards, the treasure map, dense tables on phones.', '封面横幅、能量纹章、图表卡的印版外壳、寻宝地图、手机上的高密度表。') },
      { skill: 'ui-review', status: 'use', label: L('UI/UX review', 'UI/UX 走查'), copy: L('Screenshot after UI changes and check against Nielsen’s ten heuristics. Screenshots hold health data, so only a local model sees them.', '改完界面后截图，按尼尔森十原则出问题清单。截图里有健康数据，只交给本机模型看。') },
      { skill: 'ui-ux-pro-max', status: 'use', label: L('UI/UX Pro Max', 'UI/UX Pro Max'), copy: L('Hard rules: contrast, touch targets, chart types. Rules only, not a restyle.', '查对比度、触控尺寸、图表类型这些硬规则。只查规则，不换风格。') },
      { skill: 'emilkowalski-skill', status: 'use', label: L('Emil Kowalski UI Skills', 'Emil Kowalski UI Skills'), copy: L('Motion review: easing direction, interruptibility, reduced motion.', '审查动效：缓动方向、能否中断、减少动效。') },
      { skill: 'mandala-emblem', status: 'maybe', label: L('Mandala emblem', '曼陀罗花纹章'), copy: L('Small dividers between long sections, achievement badges. Must not compete with the overview emblem.', '长页面两节之间的分隔小章、成就徽章。不能和首页纹章抢第一眼。') },
      { skill: 'particle-emblem', status: 'maybe', label: L('Particle emblem', '粒子纹章'), copy: L('An opening banner where particles gather into the emblem. Website or store promo only.', '粒子聚成纹章的开场横幅。只适合网站或商店宣传页。') },
      { skill: 'math-explainer', status: 'maybe', label: L('Code explainer storyboard', '代码科普分镜'), copy: L('Explaining one counter-intuitive result, like why higher HRV is better.', '讲清一个反直觉结论，比如「HRV 为什么越高越好」。') },
      { skill: 'apple-brand-design', status: 'borrow', label: L('Apple-grade brand design', 'Apple 级品牌设计指南'), copy: L('Borrow the principles and logo-protection rules only. It loads MiSans web fonts; MiYa is offline, so that part is out.', '只借原则和标志保护规则。它要加载 MiSans 网络字体，MiYa 不连外网，这部分不用。') },
      { skill: 'anatomy', status: 'no', label: L('Isometric figures', '等轴测工程图'), copy: L('Isometric machinery clashes with engraving.', '等轴测机械风格和凹版冲突。') },
    ] as Array<{ skill: string; status: 'main' | 'use' | 'maybe' | 'borrow' | 'no'; label: MiyaBrandLocalized; copy: MiyaBrandLocalized }>,
    status: {
      main: L('Main', '主力'),
      use: L('In use', '常用'),
      maybe: L('Not yet', '还没用'),
      borrow: L('Principles only', '只借原则'),
      no: L('Not a fit', '不适合'),
    },
  },

  footer: L(
    '© 2026 Daniel Yi Tern Tan · MiYa is not a medical device and does not diagnose any condition.',
    '© 2026 Daniel Yi Tern Tan · MiYa 不是医疗器械，不能诊断任何疾病。',
  ),
};

/** Strip inline `code` markup for plain-text contexts (static prerender body). */
export function miyaBrandPlain(value: string): string {
  return value.replace(/`/g, '');
}
