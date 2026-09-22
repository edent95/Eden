/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls, joinBasePath } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { EngravedBorder, EngravedEye, EngravedHatchScale, EngravedRosette } from '../components/css-art/index';

const brandGuidePrinciples = [
  {
    title: { en: 'Clarity', zh: '清晰' },
    copy: {
      en: 'One page. One point. One next step.',
      zh: '一页一个重点，一个下一步。',
    },
  },
  {
    title: { en: 'Restraint', zh: '克制' },
    copy: {
      en: 'Remove what does not help the reader decide.',
      zh: '删掉不能帮助判断的东西。',
    },
  },
  {
    title: { en: 'Depth', zh: '层级' },
    copy: {
      en: 'Use size, space, and line density.',
      zh: '用尺寸、留白和线条疏密。',
    },
  },
  {
    title: { en: 'Trust', zh: '信任' },
    copy: {
      en: 'Make it feel stable before asking for action.',
      zh: '先稳定，再行动。',
    },
  },
] as const;

const brandGuideDetailRules = [
  {
    title: { en: 'Whitespace shortens the decision path', zh: '留白缩短判断路径' },
    copy: {
      en: 'Let the main idea breathe.',
      zh: '让主信息有呼吸。',
    },
  },
  {
    title: { en: 'Radius creates a shared touch language', zh: '圆角统一触感' },
    copy: {
      en: 'Use one radius scale.',
      zh: '使用同一套圆角 scale。',
    },
  },
  {
    title: { en: 'Color must earn its place', zh: '颜色必须有来源' },
    copy: {
      en: 'Use color only when it explains.',
      zh: '颜色只在能解释时使用。',
    },
  },
  {
    title: { en: 'Short copy keeps the page decisive', zh: '短文案让页面更果断' },
    copy: {
      en: 'Say the point fast.',
      zh: '快速说重点。',
    },
  },
  {
    title: { en: 'Sharp visuals carry proof', zh: '清楚视觉承载证明' },
    copy: {
      en: 'Use real, sharp proof.',
      zh: '用真实、清楚的证明。',
    },
  },
  {
    title: { en: 'Motion explains, never distracts', zh: '动效解释，不抢戏' },
    copy: {
      en: 'Move only what helps.',
      zh: '只动有帮助的东西。',
    },
  },
] as const;

const brandGuidePalette = [
  {
    name: { en: 'Paper', zh: 'Paper' },
    hex: '#ffffff',
    role: { en: 'Primary canvas', zh: '主画布' },
    usage: { en: 'Main page background.', zh: '主页面背景。' },
  },
  {
    name: { en: 'Soft', zh: 'Soft' },
    hex: '#f5f5f7',
    role: { en: 'Section band', zh: '章节底色' },
    usage: { en: 'Quiet section surface.', zh: '安静的 section 底色。' },
  },
  {
    name: { en: 'Muted', zh: 'Muted' },
    hex: '#6e6e73',
    role: { en: 'Secondary voice', zh: '次级语气' },
    usage: { en: 'Support text and labels.', zh: '辅助文字和标签。' },
  },
  {
    name: { en: 'Ink', zh: 'Ink' },
    hex: '#111113',
    role: { en: 'Primary text', zh: '主文字' },
    usage: { en: 'Headlines and key text.', zh: '标题和重点文字。' },
  },
  {
    name: { en: 'Deep', zh: 'Deep' },
    hex: '#050505',
    role: { en: 'Inverted emphasis', zh: '反色重点' },
    usage: { en: 'Rare high-contrast moments.', zh: '少量高对比时刻。' },
  },
  {
    name: { en: 'Line', zh: 'Line' },
    hex: '#d9d9df',
    role: { en: 'Quiet divider', zh: '安静分隔' },
    usage: { en: 'Borders and dividers.', zh: '边框和分隔线。' },
  },
] as const;

const brandGuideAccent = [
  {
    name: { en: 'Eden Mint / Pink', zh: 'Eden Mint / Pink' },
    hex: { light: '#7bdcb5', dark: '#dc6f82' },
    role: { en: 'Primary by theme', zh: '跟随主题的主品牌色' },
    usage: {
      en: 'Mint in light mode. Pink in dark mode.',
      zh: '浅色用 Mint，深色用 Pink。',
    },
  },
  {
    name: { en: 'System Amber / Blue', zh: 'System Amber / Blue' },
    hex: { light: '#ffa340ed', dark: '#6fa4f0e6' },
    role: { en: 'Secondary by theme', zh: '跟随主题的系统辅助色' },
    usage: {
      en: 'Small system states and secondary signals.',
      zh: '小面积系统状态和次级信号。',
    },
  },
  {
    name: { en: 'Dream Purple', zh: 'Dream Purple' },
    hex: { light: '#a78bfa', dark: '#c4b5fd' },
    role: { en: 'Action color', zh: '行动色' },
    usage: {
      en: 'Links and action cues.',
      zh: '链接和行动提示。',
    },
  },
  {
    name: { en: 'Sky Tint', zh: 'Sky Tint' },
    hex: { light: '#dcebf8', dark: '#dcebf8' },
    role: { en: 'Cool support', zh: '冷色辅助' },
    usage: {
      en: 'Cool support tint.',
      zh: '冷色辅助。',
    },
  },
  {
    name: { en: 'Gold Tint', zh: 'Gold Tint' },
    hex: { light: '#f4dfb9', dark: '#f4dfb9' },
    role: { en: 'Warm support', zh: '暖色辅助' },
    usage: {
      en: 'Warm support tint.',
      zh: '暖色辅助。',
    },
  },
  {
    name: { en: 'Pink Tint', zh: 'Pink Tint' },
    hex: { light: '#f6d9d8', dark: '#f6d9d8' },
    role: { en: 'Human signal', zh: '人味信号' },
    usage: {
      en: 'Softer human moments.',
      zh: '柔和的人感时刻。',
    },
  },
  {
    name: { en: 'Green Tint', zh: 'Green Tint' },
    hex: { light: '#dcebd9', dark: '#dcebd9' },
    role: { en: 'System signal', zh: '系统信号' },
    usage: {
      en: 'Stable system signal.',
      zh: '稳定系统信号。',
    },
  },
] as const;

const brandGuideEngravedRules = [
  {
    title: { en: 'Tone comes from line density', zh: '明暗来自线的疏密' },
    copy: {
      en: 'Paper, single hatch, cross hatch, dense cross hatch. No soft gradients for shading.',
      zh: '留白、单向排线、交叉排线、加密交叉排线；不用柔和渐变做阴影。',
    },
  },
  {
    title: { en: 'Order comes from guilloché', zh: '秩序来自扭索纹' },
    copy: {
      en: 'Offset ring families, rosettes, and chain borders give every piece a symmetric, continuous frame.',
      zh: '偏心环纹、玫瑰饰和链状花边，让每张图都有对称、连续的外框。',
    },
  },
  {
    title: { en: 'One ink per piece', zh: '一张图一种墨' },
    copy: {
      en: 'Ink green, rose brown, bronze, violet, teal, or indigo on a pale paper. Dark theme turns the plate dark and the lines bronze gold.',
      zh: '墨绿、玫瑰棕、古铜、紫、青或靛蓝，配浅色纸；深色主题换成深色版面、古铜金线。',
    },
  },
  {
    title: { en: 'Golden ratio placement', zh: '黄金比例定位' },
    copy: {
      en: 'Put the focal symbol on a 38.2% / 61.8% line and let a Fibonacci spiral converge on it. Radii grow by 1.618.',
      zh: '主体落在 38.2% / 61.8% 线上，斐波那契螺旋收敛到它；半径按 1.618 递增。',
    },
  },
  {
    title: { en: 'Symbols, not people', zh: '画符号，不画人' },
    copy: {
      en: 'Use objects and ancient symbols such as the Eye of Horus, lotus, ankh, scales, or scarab. No faces, no text inside the art.',
      zh: '用器物与古代符号，例如荷鲁斯之眼、莲花、安卡、天平、圣甲虫；不画脸，图里不放文字。',
    },
  },
  {
    title: { en: 'Double rules frame everything', zh: '一切都用双线框住' },
    copy: {
      en: 'Cards, medals, and tickets use an outer hairline, a paper gap, and an inner hairline.',
      zh: '卡片、圆章、票券都用「外细线 + 纸色间隔 + 内细线」。',
    },
  },
] as const;

const brandGuideEngravedSpecimens = [
  { id: 'hatch', tone: 'ink', title: { en: 'Hatching scale', zh: '排线明暗阶' }, copy: { en: 'Four steps of tone from line density alone.', zh: '只靠线的疏密做出四档明暗。' } },
  { id: 'rosette', tone: 'rose', title: { en: 'Guilloché rosette', zh: '扭索纹玫瑰' }, copy: { en: 'Offset rings turning slowly around a double-rule medal.', zh: '偏心环纹围着双线圆章慢慢转。' } },
  { id: 'eye', tone: 'bronze', title: { en: 'Engraved symbol', zh: '凹版符号' }, copy: { en: 'The Eye of Horus drawn with hatching and rules only.', zh: '只用排线与双线画成的荷鲁斯之眼。' } },
  { id: 'border', tone: 'indigo', title: { en: 'Banknote border', zh: '钞票花边' }, copy: { en: 'Chain border, corner rosettes, and a golden-rectangle construction.', zh: '链状花边、角饰玫瑰与黄金矩形构造线。' } },
] as const;

const brandGuideTypography = [
  {
    name: 'MiSans',
    role: { en: 'Primary typeface', zh: '主字体' },
    sample: { en: 'Build order from complexity.', zh: 'Build order from complexity.' },
    detail: {
      en: 'Use everywhere except system labels.',
      zh: '除系统标签外都用它。',
    },
  },
  {
    name: 'MiSans VF',
    role: { en: 'Weight system', zh: '字重系统' },
    sample: {
      en: 'Light / Regular / Medium / Semibold / Bold',
      zh: 'Light / Regular / Medium / Semibold / Bold',
    },
    detail: {
      en: 'Use weight for hierarchy.',
      zh: '用字重做层级。',
    },
  },
  {
    name: 'JetBrains Mono',
    role: { en: 'System voice', zh: '系统声线' },
    sample: { en: 'STATUS / CURRENTLY BUILDING / 2026', zh: 'STATUS / CURRENTLY BUILDING / 2026' },
    detail: { en: 'Use for labels and status text.', zh: '用于标签和状态文字。' },
  },
] as const;

const brandGuideRhythm = [
  {
    title: { en: 'Hero', zh: '首屏' },
    copy: {
      en: 'One claim. One action.',
      zh: '一个判断，一个行动。',
    },
  },
  {
    title: { en: 'Sections', zh: '章节' },
    copy: {
      en: 'One idea per section.',
      zh: '一个 section 一个想法。',
    },
  },
  {
    title: { en: 'Grids', zh: '网格' },
    copy: {
      en: 'Editorial grids use 2 / 1 columns. The Home media collage uses two drifting rows.',
      zh: '内容网格用 2 / 1 栏；首页媒体拼贴用两行反向漂移。',
    },
  },
  {
    title: { en: 'Fluid page gutters', zh: '流体页面边距' },
    copy: {
      en: 'Use responsive gutters. Do not hard-cap the whole page.',
      zh: '使用响应式 gutter，不给整页设固定 max-width。',
    },
  },
] as const;

const brandGuideLayoutRules = [
  {
    title: { en: 'Use the available width', zh: '使用可用宽度' },
    copy: {
      en: 'Let sections and grids fill the page gutter.',
      zh: 'Section 和 grid 直接用到页面 gutter。',
    },
  },
  {
    title: { en: 'Two columns by default', zh: '默认两栏' },
    copy: {
      en: 'Two on desktop. One on mobile.',
      zh: '桌面两栏，手机一栏。',
    },
  },
  {
    title: { en: 'One visual, one idea', zh: '一个视觉，一个意思' },
    copy: {
      en: 'Art direction must explain the content.',
      zh: '视觉必须解释内容。',
    },
  },
  {
    title: { en: 'Cards need a reason', zh: '卡片要有理由' },
    copy: {
      en: 'Use cards for grouping, not decoration.',
      zh: '卡片用来分组，不是装饰。',
    },
  },
  {
    title: { en: 'Type follows its container', zh: '字号跟随容器' },
    copy: {
      en: 'Use clamp and container units when cards resize.',
      zh: '卡片缩放时用 clamp 和 container units。',
    },
  },
  {
    title: { en: 'Preserve the image', zh: '保留完整画面' },
    copy: {
      en: 'Contain by default. Crop only with intent.',
      zh: '默认完整显示，只在有意构图时裁切。',
    },
  },
] as const;

const brandGuideLayoutNumbers = [
  {
    value: { en: '44px', zh: '44px' },
    label: { en: 'Button / input minimum height.', zh: '按钮、输入框最小高度。' },
  },
  {
    value: { en: '2 max', zh: '最多 2 个' },
    label: { en: 'Hero buttons: primary + secondary.', zh: 'Hero 按钮：主按钮 + 次按钮。' },
  },
  {
    value: { en: '0.98-1.08', zh: '0.98-1.08' },
    label: { en: 'Large headline line-height ratio.', zh: '大标题行高比例。' },
  },
  {
    value: { en: '80-160px', zh: '80-160px' },
    label: { en: 'Desktop section top / bottom spacing.', zh: '桌面 section 上下留白。' },
  },
  {
    value: { en: '48-96px', zh: '48-96px' },
    label: { en: 'Mobile section top / bottom spacing.', zh: '手机 section 上下留白。' },
  },
  {
    value: { en: '16-24px', zh: '16-24px' },
    label: { en: 'Compact card inside padding.', zh: '紧凑卡片内部留白。' },
  },
  {
    value: { en: '24-32px', zh: '24-32px' },
    label: { en: 'Normal content card radius.', zh: '普通内容卡片圆角。' },
  },
  {
    value: { en: '20–48px', zh: '20–48px' },
    label: { en: 'Responsive page gutter. No global content cap.', zh: '响应式页面边距，不限制整页最大宽度。' },
  },
  {
    value: { en: '16:9', zh: '16:9' },
    label: { en: 'Home media banner aspect ratio.', zh: '首页媒体 banner 固定比例。' },
  },
  {
    value: { en: '4 + 5', zh: '4 + 5' },
    label: { en: 'Home collage: two rows drifting in opposite directions.', zh: '首页拼贴：两行，反向漂移。' },
  },
  {
    value: { en: '220–460px', zh: '220–460px' },
    label: { en: 'Home collage card width (clamp 30vw), 12px gap, 16px radius.', zh: '首页拼贴卡片宽度（clamp 30vw），间距 12px，圆角 16px。' },
  },
  {
    value: { en: '1 : 1.618', zh: '1 : 1.618' },
    label: { en: 'Golden ratio for engraved art: focal point on the 38.2% / 61.8% lines.', zh: '凹版插画的黄金比例：主体落在 38.2% / 61.8% 线上。' },
  },
  {
    value: { en: '0.16–0.2cqi', zh: '0.16–0.2cqi' },
    label: { en: 'Engraved hatch line width; scales with the art container.', zh: '凹版排线线宽，随画框缩放。' },
  },
  {
    value: { en: '40px', zh: '40px' },
    label: { en: 'Home banner CTA minimum height.', zh: '首页 banner CTA 最小高度。' },
  },
] as const;

const brandGuideVoicePairs = [
  {
    avoid: { en: 'I build AI products.', zh: '我会做 AI 产品。' },
    prefer: {
      en: 'Turn scattered work into reusable systems.',
      zh: '把散落的工作变成可复用系统。',
    },
  },
  {
    avoid: { en: 'A visionary brand.', zh: '一个有远见的品牌。' },
    prefer: {
      en: 'Knowledge should compound.',
      zh: '知识应该复利。',
    },
  },
  {
    avoid: { en: 'Empowering people to transform their future.', zh: '赋能每个人改变未来。' },
    prefer: {
      en: 'Make the next move clear.',
      zh: '让下一步变清楚。',
    },
  },
] as const;

const brandGuideUseCases = [
  {
    title: { en: 'Home', zh: 'Home' },
    copy: {
      en: 'Lead with the point of view. Then a drifting collage of nine material-backed 16:9 doors into products, systems, and lived work.',
      zh: '先说清观点，再用 9 个有真实素材、缓慢漂移的 16:9 入口，带人进入产品、系统与真实经历。',
    },
  },
  {
    title: { en: 'Projects', zh: 'Projects' },
    copy: { en: 'Problem, architecture, operations, proof, workflow.', zh: '问题、架构、运作、证明、流程。' },
  },
  {
    title: { en: 'Galleries', zh: '图库' },
    copy: { en: 'Keep the frame intact. Put factual metadata below.', zh: '保留完整画面，事实 metadata 放在图片下方。' },
  },
  {
    title: { en: 'Wiki', zh: 'Wiki' },
    copy: { en: 'Save durable knowledge, not one-shot answers.', zh: '保存可复用知识，不留一次性答案。' },
  },
  {
    title: { en: 'Interactive tools', zh: '互动工具' },
    copy: { en: 'One task at a time. Feedback must be immediate.', zh: '一次一个任务，反馈必须立即。' },
  },
  {
    title: { en: 'Story logs', zh: '故事记录' },
    copy: { en: 'Real moment first. Technical detail second.', zh: '真实时刻优先，技术细节其后。' },
  },
] as const;

const brandGuideHomeMediaRules = [
  {
    title: { en: 'Nine live doors', zh: '9 个真实入口' },
    copy: {
      en: 'The Home collage holds nine active destinations. Do not ship a placeholder card.',
      zh: '首页拼贴有 9 个可进入的目标。没有真实素材，就不要上线 placeholder 卡片。',
    },
  },
  {
    title: { en: 'Material first', zh: '真实素材优先' },
    copy: {
      en: 'Use a real image, a prepared video, or registered CSS art. Each medium must carry the project on its own.',
      zh: '使用真实图片、处理过的视频或已注册的 CSS art；每种媒介都必须能独立承载项目。',
    },
  },
  {
    title: { en: 'Two rows, opposite drift', zh: '两行，反向漂移' },
    copy: {
      en: 'Four cards on top, five below, drifting left and right on a 58s loop. Every card stays 16:9.',
      zh: '上行 4 张、下行 5 张，一左一右以 58 秒循环漂移；所有卡片保持 16:9。',
    },
  },
  {
    title: { en: 'Hover and focus pause', zh: '悬停与聚焦即暂停' },
    copy: {
      en: 'The drift stops on hover or keyboard focus so a card can be read and clicked. Reduced motion shows a still row.',
      zh: '鼠标悬停或键盘聚焦时停止漂移，卡片才读得清、点得到；reduced motion 时整行静止。',
    },
  },
  {
    title: { en: 'Action replaces labels', zh: '行动取代标签' },
    copy: {
      en: 'Linked cards reveal one centered white CTA. No tag, title, or description sits on the card surface.',
      zh: '可点击卡片只显示一个居中的白色 CTA；画面上不放 tag、title 或 description。',
    },
  },
  {
    title: { en: 'Videos play only when visible', zh: '视频只在可见时播放' },
    copy: {
      en: 'Loops are short, muted, inline, and paired with a poster. They pause once they drift out of view.',
      zh: '循环视频要短、静音、内联并配 poster；漂出视口后暂停。',
    },
  },
] as const;

const brandGuideAssetRules = [
  {
    title: { en: 'Engraving is the illustration default', zh: '插画默认用凹版语言' },
    copy: {
      en: 'Icons, product art, and in-app illustrations use the engraved line language. No photo-real renders, no people.',
      zh: '图标、产品插画与应用内插图默认用凹版线条语言；不用写实渲染，不画人。',
    },
  },
  {
    title: { en: 'App icons are framed', zh: 'App icon 有固定外框' },
    copy: {
      en: 'Square, rounded, and stable at small sizes.',
      zh: '正方形、圆角，小尺寸也要稳定。',
    },
  },
  {
    title: { en: 'Totems stay transparent', zh: '图腾保持透明底' },
    copy: {
      en: 'No forced app-icon frame or heavy outer box.',
      zh: '不强加 app icon 底或厚重外框。',
    },
  },
  {
    title: { en: 'Home banners use real material', zh: '首页 Banner 使用真实素材' },
    copy: {
      en: 'Use image, video, or registered CSS art in a stable 16:9 frame. No public placeholder.',
      zh: '在稳定的 16:9 画框中使用图片、视频或已注册 CSS art；公开页不放 placeholder。',
    },
  },
  {
    title: { en: 'Video needs a fallback', zh: '视频必须有 fallback' },
    copy: {
      en: 'Every loop needs a poster and a reduced-motion state.',
      zh: '每个循环视频都要有 poster 与 reduced-motion 状态。',
    },
  },
  {
    title: { en: 'CSS art comes from the registry', zh: 'CSS art 从 registry 取用' },
    copy: {
      en: 'Reuse the registered 16:9 component instead of copying its markup into Home.',
      zh: '复用已注册的 16:9 component，不把内部 markup 复制进 Home。',
    },
  },
  {
    title: { en: 'Photography keeps its frame', zh: '摄影保留原构图' },
    copy: {
      en: 'Use contain by default. Keep camera and film notes below.',
      zh: '默认 contain，相机与胶卷资讯放在图下。',
    },
  },
] as const;

const brandGuideCategories = [
  {
    name: { en: 'Foundation', zh: '基础层' },
    scope: { en: 'Start here', zh: '先看这里' },
    items: {
      en: ['Core thesis', 'Layout defaults', 'Size reference'],
      zh: ['核心主张', '版式默认值', '尺寸参考'],
    },
  },
  {
    name: { en: 'Surface system', zh: '表层系统' },
    scope: { en: 'Build the page', zh: '用于页面搭建' },
    items: {
      en: ['Theme colors', 'Engraved line language', 'Typography', 'Home media system', 'Motion boundaries'],
      zh: ['主题色', '凹版线条语言', '字体层级', '首页媒体系统', '动效边界'],
    },
  },
  {
    name: { en: 'Content usage', zh: '内容用法' },
    scope: { en: 'Apply by page type', zh: '按页面类型使用' },
    items: {
      en: ['Homepage', 'Project pages', 'Galleries', 'Wiki and stories'],
      zh: ['首页', '项目页', '图库', 'Wiki 与故事'],
    },
  },
] as const;

const brandGuideStoryRules = [
  {
    title: { en: 'Log the moment, not the score', zh: '记录时刻，不是战绩' },
    copy: {
      en: 'Remember the moment.',
      zh: '记住那个瞬间。',
    },
  },
  {
    title: { en: 'Only what really happened', zh: '只写真的' },
    copy: {
      en: 'Do not invent drama.',
      zh: '不要编戏剧效果。',
    },
  },
  {
    title: { en: 'Nicknames, not epic titles', zh: '用小名，别中二' },
    copy: {
      en: 'Use short names.',
      zh: '用短称呼。',
    },
  },
  {
    title: { en: 'Short, but cinematic', zh: '短，但有画面' },
    copy: {
      en: 'One beat per paragraph.',
      zh: '一段一个画面。',
    },
  },
  {
    title: { en: 'People first, details second', zh: '先有人，再有细节' },
    copy: {
      en: 'People carry the story.',
      zh: '人撑起故事。',
    },
  },
  {
    title: { en: 'Not a technical report', zh: '不是技术报告' },
    copy: {
      en: 'No jargon. No flexing.',
      zh: '不堆术语，不自夸。',
    },
  },
] as const;

const brandGuideStoryExample = {
  avoid: {
    en: 'The protagonist entered a dramatic conflict with the opposing archetype.',
    zh: '主角与对立原型进入戏剧性冲突。',
  },
  prefer: {
    en: 'He made the move. Everyone at the table went quiet.',
    zh: '他做了那个决定。桌边突然安静下来。',
  },
} as const;

const brandGuideMotionRules = [
  {
    title: { en: 'Object motion first', zh: '先动实体物件' },
    copy: {
      en: 'Move visible objects.',
      zh: '动可见物件。',
    },
  },
  {
    title: { en: 'Transform and opacity first', zh: '优先 transform 和 opacity' },
    copy: {
      en: 'Keep layout geometry stable.',
      zh: '保持布局尺寸稳定。',
    },
  },
  {
    title: { en: 'Ambient motion is slow and mechanical', zh: '环境动效只能慢、像机械' },
    copy: {
      en: 'Allowed: the Home collage drift and engraved ornaments turning once every 30s or slower. Never glow, scan lines, or card fades.',
      zh: '允许：首页拼贴漂移、凹版纹饰 30 秒以上转一圈。不用 glow、扫描线或 card fade。',
    },
  },
  {
    title: { en: 'Preserve reduced motion', zh: '保留 reduced motion' },
    copy: {
      en: 'Support `prefers-reduced-motion`.',
      zh: '支持 `prefers-reduced-motion`。',
    },
  },
  {
    title: { en: 'Hover is a quiet cue', zh: 'Hover 只做轻提示' },
    copy: {
      en: 'Media may scale to 1.025 while the centered CTA appears.',
      zh: '媒体最多放大到 1.025，同时显示居中 CTA。',
    },
  },
  {
    title: { en: 'Loop video is background motion', zh: '循环视频属于背景动效' },
    copy: {
      en: 'Keep it silent and short. The content remains understandable from its poster.',
      zh: '保持短且静音；只看 poster 也必须能理解内容。',
    },
  },
] as const;

const brandGuideCssRules = [
  {
    title: { en: 'Draw engraved lines with gradients', zh: '凹版线条用渐变画' },
    copy: {
      en: 'Hatching, rings, and rules come from repeating gradients and box-shadow, never border colours. Line widths use cqi so the art scales.',
      zh: '排线、环纹与双线用 repeating gradient 与 box-shadow 画，不写 border 颜色；线宽用 cqi，画面随容器缩放。',
    },
  },
  {
    title: { en: 'Material before entry', zh: '有素材才有入口' },
    copy: {
      en: 'A public Home banner requires an image, video, or registered CSS art asset.',
      zh: '公开首页 banner 必须有图片、视频或已注册 CSS art 资产。',
    },
  },
  {
    title: { en: 'Navigable media gets a CTA', zh: '可导航媒体必须有 CTA' },
    copy: {
      en: 'Use one centered action pill and an accessible link label. Do not fake a button on a dead card.',
      zh: '使用一个居中行动按钮与可访问 link label；不能在无链接卡片上伪装按钮。',
    },
  },
  {
    title: { en: 'Prepare video for the web', zh: '视频先为网页处理' },
    copy: {
      en: 'Use H.264, yuv420p, fast-start, muted background loops, and an explicit poster.',
      zh: '使用 H.264、yuv420p、fast-start、静音背景循环与明确 poster。',
    },
  },
  {
    title: { en: 'No background or card fade', zh: '不要 background / card fade' },
    copy: {
      en: 'No glow, scan lines, or card fades.',
      zh: '不要 glow、扫描线、card fade。',
    },
  },
  {
    title: { en: 'Solid category language', zh: '分类用实色系统' },
    copy: {
      en: 'Use rails, dots, chips, and double rules. One ink per category.',
      zh: '用线、点、chip 和双线；一个分类一种墨色。',
    },
  },
  {
    title: { en: 'Registry before reuse', zh: '复用前先查 registry' },
    copy: {
      en: 'Reuse CSS art through `css-art.registry.ts`.',
      zh: '通过 `css-art.registry.ts` 复用 CSS art。',
    },
  },
  {
    title: { en: 'Separate art from layout', zh: '视觉与布局分离' },
    copy: {
      en: 'Art in `styles/css-art`; layout in `styles/pages`.',
      zh: 'Art 放 `styles/css-art`，layout 放 `styles/pages`。',
    },
  },
  {
    title: { en: 'Stable wrapper geometry', zh: '外层几何要稳定' },
    copy: {
      en: 'Every visual needs a fixed size or aspect ratio.',
      zh: '每个视觉都要有固定尺寸或比例。',
    },
  },
  {
    title: { en: 'Theme and motion are required', zh: '主题与减少动效是必须项' },
    copy: {
      en: 'Public visuals support light, dark, and reduced motion.',
      zh: '公开页视觉必须支持 light、dark 和 reduced motion。',
    },
  },
] as const;

export const BrandGuideFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const faviconSrc = joinBasePath(baseUrl, 'favicon.svg');

  return (
    <div className="page-shell brand-guide-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="brand-guide-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="brand-guide-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="brand-guide-hero py-16 text-center md:py-24">
            <p className="brand-guide-kicker mx-auto">
              {isZh ? 'Brand Guide' : 'Brand Guide'}
            </p>
            <h1 className="brand-guide-hero-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '品牌指南' : 'Brand Guide'}
            </h1>
            <p className="brand-guide-hero-subtitle mx-auto mt-5">
              {isZh
                ? '从混乱中建立系统。'
                : 'Build systems from chaos.'}
            </p>
            <p className="brand-guide-hero-copy mx-auto mt-5">
              {isZh
                ? '把复杂的人类行为与混乱现实，转化为真正有用的产品、数据与 AI 系统。'
                : 'I turn complex human behavior and messy realities into useful products, data, and AI systems.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#brand-philosophy" className="brand-guide-cta">
                {isZh ? '看核心哲学' : 'View philosophy'} <span aria-hidden>›</span>
              </a>
              <a href="#brand-rules" className="brand-guide-cta brand-guide-cta-muted">
                {isZh ? '看执行规则' : 'View rules'} <span aria-hidden>›</span>
              </a>
            </div>
            <div className="brand-guide-signature mx-auto mt-12">
              <div className="brand-guide-mark">
                <img src={faviconSrc} alt="" width={72} height={72} />
              </div>
              <div>
                <p className="brand-guide-signature-label">{isZh ? '执行句 / Operating line' : 'Operating line'}</p>
                <p className="brand-guide-signature-line font-display font-bold tracking-tight">
                  <span>Build order from</span>
                  <span>complexity.</span>
                </p>
              </div>
            </div>
          </header>

          <section className="brand-guide-classification py-12 md:py-16" aria-labelledby="brand-guide-classification-title">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? 'Guide map' : 'Guide map'}</p>
              <h2 id="brand-guide-classification-title" className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '按顺序使用。' : 'Use it in order.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '先规则，再视觉，再应用。'
                  : 'Rules first. Visuals second. Application last.'}
              </p>
            </div>
            <div className="brand-guide-category-grid mt-10">
              {brandGuideCategories.map((category, index) => (
                <article key={category.name.en} className={`brand-guide-category-card brand-guide-category-${index + 1}`}>
                  <p className="brand-guide-card-index">{category.scope[language]}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{category.name[language]}</h3>
                  <ul>
                    {category.items[language].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-philosophy" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '01 / Core philosophy' : '01 / Core philosophy'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '内容先行。' : 'Content first.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '界面服务判断，不抢内容。'
                  : 'The interface supports the point.'}
              </p>
            </div>
            <article className="brand-guide-manifesto mt-12">
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Manifesto' : 'Manifesto'}</p>
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  {isZh ? '先让知识留下来。' : 'Make knowledge durable first.'}
                </h3>
              </div>
              <p>
                {isZh
                  ? '内容要能沉淀、复用、继续生长。界面只负责让这件事更清楚。'
                  : 'Content should persist, stay reusable, and keep growing. The interface only makes that easier to understand.'}
              </p>
            </article>
            <div className="brand-guide-principle-grid mt-5 grid gap-4 md:grid-cols-4">
              {brandGuidePrinciples.map((item, index) => (
                <article key={item.title.en} className="brand-guide-principle-card">
                  <p className="brand-guide-card-index">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-detail-grid mt-8">
              {brandGuideDetailRules.map((item) => (
                <article key={item.title.en} className="brand-guide-detail-item">
                  <h3>{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-rules" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '02 / Design rules' : '02 / Design rules'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '页面规则。' : 'Page rules.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '默认按这些做。'
                  : 'Use these as defaults.'}
              </p>
            </div>
            <div className="brand-guide-layout-grid mt-12">
              {brandGuideLayoutRules.map((item, index) => (
                <article key={item.title.en} className={`brand-guide-layout-card brand-guide-layout-card-${index + 1}`}>
                  <p className="brand-guide-card-index">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '03 / Layout numbers' : '03 / Layout numbers'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '页面尺寸参考。' : 'Page size reference.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '做页面时先用这些值。'
                  : 'Use these values first when building pages.'}
              </p>
            </div>
            <div className="brand-guide-layout-spec-grid mt-8">
              {brandGuideLayoutNumbers.map((item) => (
                <article key={item.value.en} className="brand-guide-layout-spec-card">
                  <b>{item.value[language]}</b>
                  <p>{item.label[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '04 / Visual system' : '04 / Visual system'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '颜色只做信号。' : 'Color is signal.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? 'Mint / Pink 随主题切换。Amber / Blue 是系统辅助。Dream Purple 负责行动。'
                  : 'Mint / Pink switch with theme. Amber / Blue support system states. Dream Purple carries action.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="brand-guide-color-board">
                {brandGuidePalette.map((row) => (
                  <article key={row.hex} className="brand-guide-swatch">
                    <span className="brand-guide-swatch-chip" style={{ backgroundColor: row.hex }} />
                    <div>
                      <p className="brand-guide-card-index">{row.hex}</p>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{row.name[language]}</h3>
                      <p><strong>{row.role[language]}</strong> · {row.usage[language]}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="brand-guide-color-board brand-guide-accent-board">
                {brandGuideAccent.map((row) => (
                  <article key={row.name.en} className="brand-guide-swatch">
                    <span
                      className="brand-guide-swatch-chip"
                      style={{ backgroundColor: row.hex[theme] }}
                    />
                    <div>
                      <p className="brand-guide-card-index">{row.hex[theme]}</p>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{row.name[language]}</h3>
                      <p><strong>{row.role[language]}</strong> · {row.usage[language]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="brand-engraved" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '05 / Engraved line language' : '05 / Engraved line language'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '用线条说话。' : 'Let the lines speak.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '插画与图标默认用钞票凹版语言：排线做明暗，扭索纹做秩序，单色，黄金比例。'
                  : 'Illustrations and icons default to money engraving: hatching for tone, guilloché for order, one ink, golden ratio.'}
              </p>
            </div>
            <div className="brand-guide-engraved-grid mt-12">
              {brandGuideEngravedSpecimens.map((item) => {
                const Specimen = item.id === 'hatch' ? EngravedHatchScale
                  : item.id === 'rosette' ? EngravedRosette
                    : item.id === 'eye' ? EngravedEye
                      : EngravedBorder;
                return (
                  <article key={item.id} className="brand-guide-engraved-card">
                    <Specimen label={item.title[language]} tone={item.tone} />
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                      <p>{item.copy[language]}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="brand-guide-rule-grid mt-8">
              {brandGuideEngravedRules.map((item) => (
                <article key={item.title.en} className="brand-guide-rule-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '06 / Type and rhythm' : '06 / Type and rhythm'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '少用字体变化。' : 'Keep type simple.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '标题、正文、标签，三层够了。'
                  : 'Display, body, label. That is enough.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {brandGuideTypography.map((item) => (
                <article key={item.name} className="brand-guide-type-card">
                  <p className="brand-guide-card-index">{item.name}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.role[language]}</h3>
                  <p className={item.name === 'JetBrains Mono' ? 'font-mono' : 'font-display text-2xl font-bold'}>
                    {item.sample[language]}
                  </p>
                  <p>{item.detail[language]}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {brandGuideRhythm.map((item) => (
                <article key={item.title.en} className="brand-guide-rhythm-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="brand-voice" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '07 / Voice' : '07 / Voice'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '说清楚能帮什么。' : 'Make the help clear.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '少说自己，多说结果。'
                  : 'Less about me. More about the result.'}
              </p>
            </div>
            <div className="mt-12 space-y-4">
              {brandGuideVoicePairs.map((pair) => (
                <article key={pair.avoid.en} className="brand-guide-voice-row">
                  <div>
                    <p className="brand-guide-card-index">{isZh ? 'Avoid' : 'Avoid'}</p>
                    <p>{pair.avoid[language]}</p>
                  </div>
                  <div>
                    <p className="brand-guide-card-index">{isZh ? 'Prefer' : 'Prefer'}</p>
                    <p>{pair.prefer[language]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '08 / Application' : '08 / Application'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '每页都要清楚。' : 'Every page must be clear.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '不同页面可以有不同构图，但都要回到清楚、可复用、有证据。'
                  : 'Pages may use different compositions, but they return to clarity, reuse, and proof.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideUseCases.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '当前首页 / Home media system' : 'Current Home / Media system'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideHomeMediaRules.map((item) => (
                  <article key={item.title.en} className="brand-guide-rule-card">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '视觉资产 / Asset types' : 'Visual assets / Asset types'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideAssetRules.map((item) => (
                  <article key={item.title.en} className="brand-guide-rule-card">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="brand-story" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '09 / Story content' : '09 / Story content'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '故事写真实时刻。' : 'Stories record real moments.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '短、真、有画面。'
                  : 'Short, true, visual.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideStoryRules.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <article className="brand-guide-voice-row mt-5">
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Avoid' : 'Avoid'}</p>
                <p>{brandGuideStoryExample.avoid[language]}</p>
              </div>
              <div>
                <p className="brand-guide-card-index">{isZh ? 'Prefer' : 'Prefer'}</p>
                <p>{brandGuideStoryExample.prefer[language]}</p>
              </div>
            </article>
          </section>

          <section id="brand-motion" className="brand-guide-section py-16 md:py-24">
            <div className="brand-guide-section-head">
              <p className="brand-guide-kicker">{isZh ? '10 / Motion language' : '10 / Motion language'}</p>
              <h2 className="brand-guide-section-title font-display font-bold tracking-tight">
                {isZh ? '动效要轻。' : 'Motion stays light.'}
              </h2>
              <p className="brand-guide-section-copy">
                {isZh
                  ? '动实体物件，不动背景气氛。'
                  : 'Move objects, not atmosphere.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {brandGuideMotionRules.map((item) => (
                <article key={item.title.en} className="brand-guide-use-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
            <div className="brand-guide-rule-board mt-10">
              <p className="brand-guide-kicker">{isZh ? '当前实现规则 / Current implementation' : 'Current implementation rules'}</p>
              <div className="brand-guide-rule-grid mt-5">
                {brandGuideCssRules.map((item, index) => (
                  <article key={item.title.en} className={`brand-guide-rule-card brand-guide-rule-${index + 1}`}>
                    <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                    <p>{item.copy[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <p className="pb-10 text-center text-xs text-stone-500">
            {isZh
              ? '最后对齐：2026-09-17 · 以当前首页、代码库和 logs/ 为准。'
              : 'Last reconciled: 17 Sep 2026 · Source: current Home + repo + logs/.'}
          </p>
        </div>
      </main>
    </div>
  );
};
