/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { productSiblingCards } from '../app/product-siblings';
import { HeaderControls } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { ProjectsLifeOsCssIcon } from '../components/css-art/index';
import ProductStorePage from '../components/ProductStorePage';

export const LifeOsFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const appUrl = 'https://life-os-eden95.web.app/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsLifeOsCssIcon label="Life OS CSS app icon" />}
      name="Life OS"
      kicker={{ en: 'Personal system · Self-knowledge', zh: '个人系统 · 自我认识' }}
      tagline={{ en: 'Build the long-term base map first. Then ask about right now.', zh: '先建立长期底图，再问当下的问题。' }}
      meta={{ en: 'Free · Runs in any browser · Chinese interface', zh: '免费 · 浏览器直接打开 · 中文界面' }}
      primary={{ href: appUrl, external: true, label: { en: 'Open Life OS', zh: '打开 Life OS' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: appUrl,
        domain: 'life-os-eden95.web.app',
        title: { en: 'Interactive Life OS star map', zh: 'Life OS 互动星图' },
        caption: { en: 'The live app, running right here. Open it in a new tab to build your own base map.', zh: '真实应用直接跑在这里。想建立自己的底图，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Most self-knowledge tools answer one question at a time, and every answer starts from zero. Life OS flips the order: it builds a long-term base map from your birth data first, then lets you ask situational questions against something that does not move.', zh: '大多数自我认识的工具都是一次回答一个问题，而且每次都从零开始。Life OS 把顺序倒过来：先用出生资料建立一张长期底图，之后所有当下的提问，都有一个不会晃动的参照。' } },
        { kind: 'p', text: { en: 'The map is assembled by cross-reading several traditional systems—BaZi, I Ching hexagrams, elemental profiling, and tarot records—and surfacing where they agree. What you read is an element profile, a current phase, a confidence level, and an action strategy, each traceable back to the evidence behind it.', zh: '这张底图由多个传统系统交叉阅读组成——八字、易经卦象、元素画像、塔罗记录——并把它们互相重合的部分提上来。你看到的是元素画像、当前阶段、置信度和行动策略，每一条都能追回它背后的证据。' } },
        { kind: 'h', text: { en: 'How it works', zh: '怎么使用' } },
        { kind: 'steps', items: [
          { title: { en: 'Build the base map', zh: '建立底图' }, text: { en: 'Enter birth date, time, and place. The system runs a time correction and generates your long-term profile.', zh: '输入出生日期、时间与地点。系统会做时间校正，并生成你的长期底图。' } },
          { title: { en: 'Read the profile', zh: '读画像' }, text: { en: 'Element profile, main axes, current phase, and a stated confidence level—not a fixed identity label.', zh: '元素画像、主元素、当前阶段和明确标出的置信度——不是一个固定的身份标签。' } },
          { title: { en: 'Ask about now', zh: '问当下' }, text: { en: 'Pick from question categories—self, timing, work, money, relationships, shadow, tactics—and read against the map.', zh: '从问题分类里选一个——自我、时机、事业、金钱、关系、阴影、当下战术——对着底图来读。' } },
          { title: { en: 'Take the evidence with you', zh: '带走证据' }, text: { en: 'Copy the whole thing as a prompt pack and keep asking inside any AI agent you already use.', zh: '把整份资料复制成 prompt 包，拿到你已经在用的任何 AI agent 里继续问。' } },
        ] },
        { kind: 'h', text: { en: 'What makes it different', zh: '它和别的不一样在哪' } },
        { kind: 'p', text: { en: 'It shows its work. Every conclusion sits on top of a visible evidence trail—which system said it, and how many of them agreed. When systems disagree, the confidence number drops instead of the disagreement quietly disappearing.', zh: '它把过程摊开。每一个结论上面都有一条可见的证据链——哪个系统说的、有几个系统同意。当系统之间不一致时，置信度会下降，而不是让分歧悄悄消失。' } },
        { kind: 'callout', label: { en: 'A map, not a label', zh: '这是底图，不是标签' }, text: { en: 'The profile describes the way you most often operate right now—the combination you reach for by default. It is a current tendency, not a fixed identity, and it is meant to be re-read as your situation changes.', zh: '画像描述的是你现在最常用的运作方式，是你默认会伸手去拿的那个组合。它是当前的倾向，不是固定身份，也本来就该在处境改变时重新读一次。' } },
        { kind: 'p', text: { en: 'It also refuses to lock you in. The Ask Agent panel packages your map and its evidence into a prompt you can paste anywhere, so the reading stays useful even outside this tool.', zh: '它也不想把你锁住。「问 Agent」会把你的底图和证据打包成一段可以贴到任何地方的 prompt，让这份阅读在这个工具之外依然有用。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Not prediction', zh: '不是预测' }, text: { en: 'Life OS is a framing and reflection tool, not fortune telling. It does not forecast events, and nothing here should stand in for medical, legal, or financial advice. Read the output as a prompt for your own thinking, not a verdict.', zh: 'Life OS 是一个整理与反思的工具，不是算命。它不预测事件，也不应该拿来代替医疗、法律或财务上的专业意见。把输出当成让你自己继续想下去的提示，而不是判决。' } },
      ]}
      faq={[
        { q: { en: 'Is this fortune telling?', zh: '这是算命吗？' }, a: { en: 'No. It compiles traditional systems into a readable profile with visible sources and a confidence level. It is built for reflection and framing—what tends to be true about how you operate—not for predicting what will happen.', zh: '不是。它把几个传统系统整理成一份可读、可溯源、带置信度的画像。它是拿来反思和整理的——关于你通常怎么运作——而不是拿来预测会发生什么。' } },
        { q: { en: 'What information do I need to provide?', zh: '需要提供什么资料？' }, a: { en: 'Birth date, time, place, and gender. The more accurate the birth time, the more stable the corrected base map—the system applies a time correction before building anything.', zh: '出生日期、时间、地点和性别。出生时间越准，校正后的底图越稳——系统会先做时间校正，再开始生成。' } },
        { q: { en: 'Why build a base map before asking questions?', zh: '为什么要先建底图再提问？' }, a: { en: 'A single question tends to get answered by whatever mood you are in that day. The base map is the part that does not move, so situational answers have something to be measured against.', zh: '单独一个问题，答案很容易被你当天的情绪带走。底图是不会动的那部分，当下的答案才有东西可以对照。' } },
        { q: { en: 'What is the Ask Agent panel?', zh: '「问 Agent」是什么？' }, a: { en: 'It packages your profile and its underlying evidence into a copyable prompt. Paste it into whichever AI you already use and keep the conversation going there—the reading is not trapped inside this tool.', zh: '它把你的画像和背后的证据打包成一段可复制的 prompt。贴到你已经在用的任何 AI 里继续聊——这份阅读不会被困在这个工具里。' } },
        { q: { en: 'Is the interface in Chinese?', zh: '界面是中文的吗？' }, a: { en: 'Yes. Life OS is currently a Chinese-language app, including the readings and the generated prompt packs.', zh: '是的。Life OS 目前是中文应用，包括阅读内容和生成的 prompt 包。' } },
        { q: { en: 'Which systems does it read from?', zh: '它读的是哪些系统？' }, a: { en: 'BaZi, I Ching hexagrams, elemental profiling, and tarot records. Conclusions with agreement across several systems are weighted higher than anything a single system says alone.', zh: '八字、易经卦象、元素画像和塔罗记录。在多个系统之间重合的结论，权重会高于任何单一系统自己说的话。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Personal system and self-knowledge', zh: '个人系统与自我认识' }],
        [{ en: 'Systems read', zh: '读取系统' }, { en: 'BaZi · I Ching · Element profile · Tarot records', zh: '八字 · 易经卦象 · 元素画像 · 塔罗记录' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Star map · Base map · Ask · Records', zh: '星图 · 个人底图 · 提问 · 记录' }],
        [{ en: 'Output', zh: '输出' }, { en: 'Element profile · Current phase · Action strategy · Agent prompt pack', zh: '元素画像 · 当前阶段 · 行动策略 · Agent prompt 包' }],
        [{ en: 'Interface', zh: '界面语言' }, { en: 'Chinese', zh: '中文' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive web app', zh: '响应式 Web App' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'life-os')}
    />
  );
};
