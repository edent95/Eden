/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// /jiju-autopilot — the Jiju full-automation system, shown end to end for people who may want to buy it
// (owner's request 2026-11-26: English first + Chinese, fully transparent). Body: components/jiju-autopilot/.
// The consumer product page stays at /jiju-pet; this page reuses its banner and belief art.
// No technical manual on this page (owner, 2026-11-26).

import React from 'react';
import { Mail } from 'lucide-react';
import ProductStorePage from '../components/ProductStorePage';
import { jijuAutopilotBlocks } from '../components/jiju-autopilot/autopilot-blocks';
import { ProjectsJijuCssIcon } from '../components/css-art/index';
import { HeaderControls, joinBasePath, type Language, type Theme, type ThemePreference } from '../app/shared';
import { productSiblingCards } from '../app/product-siblings';

const JijuAutopilotPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const contactHref = 'mailto:d.tytern@gmail.com?subject=Jiju%20Autopilot';

  return (
    <ProductStorePage
      pageClassName="jiju-product-page jap-page"
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsJijuCssIcon label="Jiju CSS app icon" />}
      name="Jiju Autopilot"
      kicker={{ en: 'Full automation system · For sale', zh: '全自动系统 · 可出售' }}
      tagline={{ en: 'A places directory that keeps itself true — run by one person and a crew of machines.', zh: '一个自己保持准确的地点名录 —— 一个人加一群机器在跑。' }}
      meta={{ en: 'Running live on jiju.pet · 944 places · Malaysia & Singapore · Numbers as of 26 Nov 2026', zh: '正在 jiju.pet 上运行 · 944 家 · 马来西亚与新加坡 · 数字截至 2026-11-26' }}
      primary={{ href: contactHref, icon: <Mail size={16} />, label: { en: 'Ask about buying it', zh: '洽询购买' } }}
      secondary={{ href: joinBasePath(baseUrl, 'jiju-pet'), ghost: true, label: { en: 'See Jiju itself', zh: '看 Jiju 本身' } }}
      quickLinks={[
        { href: '#ap-news', label: { en: 'The ten machines', zh: '十台机器' } },
        { href: '#ap-night', label: { en: 'One night', zh: '一晚' } },
        { href: '#ap-buy', label: { en: 'Buying it', zh: '购买' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
      ]}
      body={jijuAutopilotBlocks(isZh)}
      faq={[
        { q: { en: 'Is this a demo or the real thing?', zh: '这是演示还是真的在跑？' }, a: { en: 'The real thing. Every rule on this page is read from the code that runs jiju.pet, and every number is from its live data or logs on the date in the caption.', zh: '真的在跑。页面上每条规矩都取自 jiju.pet 正在运行的代码，每个数字都来自图注日期当天的正式资料或日志。' } },
        { q: { en: 'Does it only work for pet-friendly places?', zh: '只能做宠物友好地点吗？' }, a: { en: 'No. The pet part is the categories and the questions asked of owners. The machines — intake, research queue, publish and unpublish rules, photos, links, owner confirmation, auto-merge, social posting — work for any directory of places, shops, events or deals.', zh: '不是。「宠物」只是类别和问店主的问题。收录、调查队列、上下架规则、图片、链接、店主确认、自动合并、社媒发帖这些机器，任何地点、店家、活动、优惠名录都能用。' } },
        { q: { en: 'Can AI publish something wrong?', zh: 'AI 会不会把错的东西发出去？' }, a: { en: 'Models never decide what goes live; fixed rules in code do. A fact without a source is left blank, a copied quote is re-checked against the page that night, owner-confirmed fields are locked, and a run that would change too much at once writes nothing and raises an alert.', zh: '上不上线从来不由模型决定，而是由写死在代码里的规则决定。没有出处的事实留空；抄来的原话当晚对着网页再查一次；店主确认过的栏位锁住；一次要改太多的，整次不写、发警报。' } },
        { q: { en: 'How much does it cost to run?', zh: '运行要花多少钱？' }, a: { en: 'Mostly subscriptions and hardware you may already have: the AI work runs on Claude and Grok subscriptions and local models, not pay-per-call APIs; Google is only asked for free-tier fields; CI runs on a Mac at home. Anything that would cost money stops and asks first, and nightly AI spending has hard caps.', zh: '主要是订阅和你可能已经有的硬件：AI 的活跑在 Claude、Grok 订阅和本机模型上，不走按次计费的 API；向 Google 只要免费档字段；CI 跑在家里的 Mac。任何会花钱的事先停下来问，每晚的 AI 花费有硬上限。' } },
        { q: { en: 'What is still done by hand?', zh: '还有哪些要人手做？' }, a: { en: 'Verifying a place after its owner confirms, deciding about shops that moved, reading wording changes, anything involving money or log-ins, and renewing Meta’s permission about every 90 days.', zh: '店主确认后认证这家、决定搬了家的店、看文案改动、任何涉及钱或登录的事，以及大约每 90 天续一次 Meta 授权。' } },
        { q: { en: 'How do I buy it?', zh: '怎么买？' }, a: { en: 'Email me with what your directory lists and where. Setup is done with you on your own accounts, so the data, keys and machines stay yours.', zh: '发邮件告诉我你的名录收录什么、在哪里。安装是在你自己的帐号上和你一起做的，所以资料、钥匙和机器都留在你手里。' } },
      ]}
      specs={[
        [{ en: 'What it is', zh: '是什么' }, { en: 'Full automation for a places / shops / events directory', zh: '地点 / 店家 / 活动名录的全自动系统' }],
        [{ en: 'Running on', zh: '正在运行' }, { en: 'jiju.pet · 944 live places, 2,437 tracked (26 Nov 2026)', zh: 'jiju.pet · 上线 944 家，共追踪 2,437 家（2026-11-26）' }],
        [{ en: 'Machines', zh: '机器' }, { en: 'News & events · Grok research bots · MCP back office (108 tools) · Auto-publish · Auto-unpublish · Photos · Around the web · WhatsApp owners · Control room · Social media', zh: '新闻与活动 · Grok 调查 bot · MCP 后台（108 个工具）· 自动上架 · 自动下架 · 图片 · 网上怎么说 · 店主 WhatsApp · 控制室 · 社媒' }],
        [{ en: 'AI', zh: 'AI' }, { en: 'Claude Code · Codex review · Grok · local gemma4 / qwen on Ollama', zh: 'Claude Code · Codex 审查 · Grok · Ollama 本机 gemma4 / qwen' }],
        [{ en: 'Stack', zh: '技术栈' }, { en: 'Next.js · Firebase (Firestore, Storage) · Vite back office · Node control room · GitHub Actions on a self-hosted M1', zh: 'Next.js · Firebase（Firestore、Storage）· Vite 后台 · Node 控制室 · 自托管 M1 上的 GitHub Actions' }],
        [{ en: 'Engineering', zh: '工程' }, { en: '480 merged PRs on the site since 27 Apr 2026 · 728 in the control room since 18 Sep 2026', zh: '网站自 2026-04-27 起合并 480 个 PR · 控制室自 2026-09-18 起 728 个' }],
        [{ en: 'Languages', zh: '语言' }, { en: 'English · 中文', zh: 'English · 中文' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'jiju-autopilot')}
    />
  );
};

export default JijuAutopilotPage;
