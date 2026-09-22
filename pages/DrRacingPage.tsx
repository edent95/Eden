/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { productSiblingCards } from '../app/product-siblings';
import { HeaderControls } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { ProjectsDrRacingCssIcon } from '../components/css-art/index';
import ProductStorePage from '../components/ProductStorePage';

export const DrRacingFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ projectsHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const demoUrl = 'https://edent95.github.io/dr-racing-dashboard-demo/demo/';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsDrRacingCssIcon label="Dr Racing CSS app icon" />}
      name="Dr Racing"
      kicker={{ en: 'Loan operations · Dealership tool', zh: '贷款运营 · 车行工具' }}
      tagline={{ en: 'Run the whole motorcycle-loan pipeline in one dashboard.', zh: '把摩托车贷款流程放进同一个仪表台。' }}
      meta={{ en: 'Firebase deployment · Role-based access · Leads in, delivered bikes out', zh: 'Firebase 部署 · 角色权限 · Leads 进，交车出' }}
      primary={{ href: demoUrl, external: true, label: { en: 'View demo', zh: '查看 Demo' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: demoUrl,
        domain: 'edent95.github.io/dr-racing-dashboard-demo/demo',
        title: { en: 'Interactive Dr Racing demo', zh: 'Dr Racing 互动 Demo' },
        caption: { en: 'The public demo, running right here on fixed anonymized sample data. Open it in a new tab for the full dashboard.', zh: '公开 Demo 直接跑在这里，使用固定匿名示例数据。想看完整仪表台，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Dr Racing is the operating system of a motorcycle dealership that sells on financing. A sale is not one event but a pipeline: a lead comes in from TikTok or a walk-in, becomes a loan application, goes through document checks, is submitted to banks round after round, and only counts when the bike is delivered and the disbursement lands.', zh: 'Dr Racing 是一家靠贷款卖车的摩托车行的运营系统。一单生意不是一个动作，而是一条流水线：lead 从 TikTok 或 walk-in 进来，变成贷款申请，过文件检查，一轮一轮送银行，直到交车、银行放款才算数。' } },
        { kind: 'p', text: { en: 'Before this system, that pipeline lived in WhatsApp chats, paper files, and each salesperson\u2019s memory. Dr Racing puts every application, bank round, reject code, and follow-up in one place, so the shop always knows who is waiting on whom.', zh: '在这个系统之前，这条流水线活在 WhatsApp 对话、纸质文件和每个 sales 的记忆里。Dr Racing 把每一份申请、每一轮银行、每个 reject code 和跟进都放在同一个地方，车行随时知道现在卡在谁手上。' } },
        { kind: 'h', text: { en: 'How a deal moves', zh: '一单生意怎么走' } },
        { kind: 'steps', items: [
          { title: { en: 'Lead', zh: 'Lead' }, text: { en: 'Raw leads land from TikTok, Facebook, Instagram, Google, and walk-ins. Sales claim and follow up.', zh: 'TikTok、Facebook、Instagram、Google 和 walk-in 的 raw leads 进来，sales 认领并跟进。' } },
          { title: { en: 'Apply', zh: '申请' }, text: { en: 'A lead becomes a loan application with IC, payslips, and the exact bike and installment plan.', zh: 'Lead 变成贷款申请：IC、payslip、指定车型和分期方案。' } },
          { title: { en: 'Bank rounds', zh: '银行轮次' }, text: { en: 'Admin submits to banks. Approvals, rejects, and reject codes are tracked round by round.', zh: 'Admin 送银行。批准、拒绝和 reject code 按轮次记录，被拒可以换银行再送。' } },
          { title: { en: 'Deliver', zh: '交车' }, text: { en: 'Approved deals move to delivery, disbursement, and commission settlement.', zh: '批准的单子走向交车、放款与佣金结算。' } },
        ] },
        { kind: 'h', text: { en: 'What it changes day to day', zh: '它每天改变了什么' } },
        { kind: 'p', text: { en: 'The Task Inbox opens the morning. Instead of scrolling chats, every role sees what waits on them: applications to review, documents to chase, banks to follow up, approved customers to call.', zh: '早上从 Task Inbox 开始。不用翻聊天记录，每个角色都直接看到等着自己的事：要审的申请、要追的文件、要跟的银行、要联系的已批客户。' } },
        { kind: 'p', text: { en: 'Reject codes become knowledge. Every bank rejection is coded and translated into a plain next step, so a young salesperson handles a rejection the way the most experienced one would.', zh: 'Reject code 变成车行的知识。每个银行拒绝都有编码，并翻译成一句普通人能懂的下一步，新 sales 也能像老手一样处理被拒。' } },
        { kind: 'callout', label: { en: 'From marketing to commission', zh: '从营销到佣金' }, text: { en: 'The same system tracks WhatsApp link clicks by channel, marketing spend by month, staff attendance, and per-deal commissions\u2014so the owner sees the whole business, not just the loan queue.', zh: '同一个系统还追踪各渠道 WhatsApp 点击、每月营销开销、员工出勤和每单佣金——老板看到的是整盘生意，不只是贷款队列。' } },
        { kind: 'p', text: { en: 'Roles keep the data honest. Sales see their own pipeline, Admin owns bank submissions, Super Admin controls prices, commissions, and permissions. Every sensitive change lands in an audit log.', zh: '角色让数据保持干净。Sales 看自己的 pipeline，Admin 负责送银行，Super Admin 管价格、佣金和权限。每个敏感操作都会进 audit log。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'About this demo', zh: '关于这个 Demo' }, text: { en: 'The public demo above runs the real dashboard with fixed anonymized sample data, entirely in your browser\u2014no login, nothing saved to a server, and it resets on every reload. The production system runs on Firebase with real authentication and role-based security rules.', zh: '上面的公开 Demo 用固定匿名示例数据跑真实仪表台，完全在你的浏览器里——不用登录、不会写入服务器、刷新即重置。正式系统跑在 Firebase 上，有真实登录与角色安全规则。' } },
      ]}
      faq={[
        { q: { en: 'Who is this system for?', zh: '这个系统给谁用？' }, a: { en: 'Vehicle dealerships that sell on financing\u2014where every sale depends on a loan getting approved, and the daily work is chasing documents, banks, and follow-ups.', zh: '靠贷款出车的车行——每一单都取决于贷款批不批，日常工作就是追文件、追银行、追跟进。' } },
        { q: { en: 'What happens when a bank rejects an application?', zh: '银行拒绝申请之后会怎样？' }, a: { en: 'The rejection is recorded with its reject code, the code is translated into a plain-language next step, and the application can be resubmitted to another bank as a new round without losing history.', zh: '拒绝会连同 reject code 一起记录，code 被翻译成一句普通话的下一步，申请可以换一家银行开新一轮再送，历史全部保留。' } },
        { q: { en: 'Is the demo the real product?', zh: 'Demo 是真实产品吗？' }, a: { en: 'It is the real dashboard interface with demo data seeded into your browser. Firebase is switched off in the demo build, so nothing you click leaves your device.', zh: '是真实的仪表台界面，加上灌进浏览器的示例数据。Demo 版本关掉了 Firebase，你点的任何东西都不会离开你的设备。' } },
        { q: { en: 'Can different staff see different things?', zh: '不同员工看到的东西不一样吗？' }, a: { en: 'Yes. Sales, Admin, Operations Manager, and Super Admin each get their own navigation and permissions, and Super Admin can adjust page-level access per role.', zh: '会。Sales、Admin、Operations Manager 和 Super Admin 各有自己的导航与权限，Super Admin 还能按角色调整页面级访问。' } },
        { q: { en: 'Where does the production system store data?', zh: '正式系统的数据存在哪里？' }, a: { en: 'In Firebase (Firestore) under the dealership\u2019s own project, protected by authentication, custom role claims, and security rules tested in CI.', zh: '存在车行自己的 Firebase（Firestore）项目里，由登录验证、角色 claims 和在 CI 里测试过的安全规则保护。' } },
        { q: { en: 'Does it only handle loans?', zh: '它只管贷款吗？' }, a: { en: 'Loans are the spine, but the same system covers raw leads, WhatsApp click tracking, marketing spend, vehicle stock and pricing, attendance, commissions, and an audit log.', zh: '贷款是主干，但同一个系统也覆盖 raw leads、WhatsApp 点击追踪、营销开销、车辆库存与定价、出勤、佣金和 audit log。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Loan operations and dealership management', zh: '贷款运营与车行管理' }],
        [{ en: 'Pipeline', zh: '流程' }, { en: 'Lead \u2192 Application \u2192 Bank rounds \u2192 Delivery', zh: 'Lead \u2192 申请 \u2192 银行轮次 \u2192 交车' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Task Inbox · Applications · Leads · Analytics · Finance · Commissions', zh: 'Task Inbox · 申请 · Leads · 分析 · 财务 · 佣金' }],
        [{ en: 'Roles', zh: '角色' }, { en: 'Sales · Admin · Operations Manager · Super Admin', zh: 'Sales · Admin · Operations Manager · Super Admin' }],
        [{ en: 'Deployment', zh: '部署方式' }, { en: 'Firebase App Hosting with Firestore security rules', zh: 'Firebase App Hosting，配 Firestore 安全规则' }],
        [{ en: 'Languages', zh: '语言' }, { en: 'Chinese · English · Malay', zh: '中文 · English · Malay' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'dr-racing')}
    />
  );
};
