/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// /igaming-ai — the Jiju closed-loop engine offered to B2B iGaming companies (owner, 2026-11-26):
// merchants / operators, provider games, promotions, support and reporting. Same buyer-first format as
// /jiju-autopilot (body: components/igaming-autopilot/). Honest status: the engine runs on Jiju today;
// iGaming modules are built to the buyer's process. No brand, operator or country names, no volumes.

import React from 'react';
import { Mail } from 'lucide-react';
import ProductStorePage from '../components/ProductStorePage';
import { igamingAutopilotBlocks } from '../components/igaming-autopilot/igaming-autopilot-blocks';
import { HeaderControls, joinBasePath, type Language, type Theme, type ThemePreference } from '../app/shared';
import { productSiblingCards } from '../app/product-siblings';
import { IGamingAutopilotIcon } from '../components/css-art/igaming-autopilot-art';

const IGamingAutopilotPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const contactHref = 'mailto:d.tytern@gmail.com?subject=iGaming%20Ai';

  return (
    <ProductStorePage
      pageClassName="jiju-product-page jap-page"
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={homeHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<IGamingAutopilotIcon label="iGaming Ai icon" />}
      name="iGaming Ai"
      kicker={{ en: 'B2B iGaming automation · For providers, aggregators and platforms', zh: 'B2B iGaming 自动化 · 给供应商、聚合商与平台' }}
      tagline={{ en: 'Autopilot with a trust dial: operations that run by themselves, stay in plain sight, and go only as far as you let them.', zh: '一个会自己转、人看得见、放手有档位的运营系统。' }}
      meta={{ en: 'Loop running on jiju.pet · Pipeline dashboard running at a dealership · Numbers as of 26 Nov 2026', zh: '闭环正在 jiju.pet 运行 · 流水线仪表台正在一家车行使用 · 数字截至 2026-11-26' }}
      primary={{ href: contactHref, icon: <Mail size={16} />, label: { en: 'Talk about your process', zh: '聊聊你的流程' } }}
      secondary={{ href: joinBasePath(baseUrl, 'jiju-autopilot'), ghost: true, label: { en: 'See the engine running', zh: '看引擎实际在跑' } }}
      quickLinks={[
        { href: '#ig-records', label: { en: 'The records', zh: '记录' } },
        { href: '#ig-problems', label: { en: 'The problems', zh: '问题' } },
        { href: '#ig-loop', label: { en: 'The loop', zh: '闭环' } },
        { href: '#ig-dashboard', label: { en: 'The dashboard', zh: '仪表台' } },
        { href: '#ig-worth', label: { en: 'What it’s worth', zh: '值多少' } },
        { href: '#ig-proof', label: { en: 'Proof', zh: '证据' } },
        { href: '#ig-modules', label: { en: 'Modules', zh: '模块' } },
        { href: '#ig-buy', label: { en: 'Working together', zh: '合作' } },
      ]}
      body={igamingAutopilotBlocks(isZh, { jiju: joinBasePath(baseUrl, 'jiju-autopilot'), drRacing: joinBasePath(baseUrl, 'dr-racing') })}
      faq={[
        { q: { en: 'Is this already running for an iGaming company?', zh: '这已经在某家 iGaming 公司跑了吗？' }, a: { en: 'Not yet. The engine — scheduler, locked data door, publish gate, weekly sweep, support assistant, auto-merge — runs today on Jiju, a live directory. The iGaming modules are built on that engine to your fields and process; each module on this page says which is which.', zh: '还没有。引擎 —— 排程、上锁的资料门、上线闸、每周巡查、客服助手、自动合并 —— 现在跑在 Jiju 这个正在营运的名录上。iGaming 的模块是在这个引擎上按你的字段和流程搭的；这一页每个模块都写明了是哪一种。' } },
        { q: { en: 'Do you need access to player data?', zh: '需要玩家资料吗？' }, a: { en: 'No. The loop works on operator-, game- and campaign-level records and aggregated numbers. It runs on your own accounts, so your data never leaves your systems.', zh: '不需要。闭环处理的是 operator、游戏、活动层面的记录和汇总数字。它跑在你自己的帐号上，资料不会离开你的系统。' } },
        { q: { en: 'Will AI change commercial terms or answer disputes?', zh: 'AI 会改商务条款或处理争议吗？' }, a: { en: 'No. Terms, caps and anything a person confirmed are protected fields: a bot can only suggest a change. Money, disputes and complaints always go to a person, with a timer.', zh: '不会。条款、上限、人确认过的东西都是受保护栏位：bot 只能提议。钱、争议、投诉一律转人，并计时。' } },
        { q: { en: 'Where do the salary numbers come from?', zh: '薪资数字从哪来？' }, a: { en: 'JobStreet Malaysia’s median monthly pay for each role, read on 26 Nov 2026, plus statutory employer contributions. They are Malaysia-wide; Kuala Lumpur pays more, so the real gap is usually bigger.', zh: 'JobStreet 马来西亚各职位月薪中位数，2026-11-26 读取，加上法定雇主缴款。这是全马的数字；吉隆坡更高，所以实际差距通常更大。' } },
        { q: { en: 'How do we start?', zh: '怎么开始？' }, a: { en: 'Email me with the one process that hurts most today. We map it together, run the loop next to your team, then add the rest.', zh: '发邮件告诉我你现在最痛的那一个流程。我们一起把它列清楚，让闭环在你的团队旁边跑，再补上其他的。' } },
      ]}
      specs={[
        [{ en: 'What it is', zh: '是什么' }, { en: 'Closed-loop automation for B2B iGaming operations', zh: 'B2B iGaming 运营的闭环自动化' }],
        [{ en: 'Covers', zh: '覆盖' }, { en: 'Operator onboarding · Game catalogue · Promotions · Support · Reporting · Account watch', zh: 'Operator 接入 · 游戏目录 · 促销 · 客服 · 报表 · 账户巡查' }],
        [{ en: 'Engine', zh: '引擎' }, { en: 'Running on jiju.pet: 108 back-office tools, 2,381 auto-merged changes (Sep – Nov 2026)', zh: '在 jiju.pet 运行：108 个后台工具，2,381 个自动合并的改动（2026 年 9–11 月）' }],
        [{ en: 'Records', zh: '记录' }, { en: 'Provider · Integration line · Account · Operator · Promotion; columns locked by role', zh: 'Provider · 接入线路 · 接入帐号 · Operator · Promotion；栏位按角色上锁' }],
        [{ en: 'Dashboard', zh: '仪表台' }, { en: 'Three screens: Now · Record · Loops; three levels: watch · propose · auto', zh: '三个画面：现在 · 对象 · 回路；三档：只看 · 提议 · 自动' }],
        [{ en: 'AI', zh: 'AI' }, { en: 'Claude Code · Codex review · Grok · local models on Ollama', zh: 'Claude Code · Codex 审查 · Grok · Ollama 本机模型' }],
        [{ en: 'Languages', zh: '语言' }, { en: 'English · 中文', zh: 'English · 中文' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'igaming-autopilot')}
    />
  );
};

export default IGamingAutopilotPage;
