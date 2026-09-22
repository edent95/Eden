/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LEGACY — not rendered by any route. App.tsx never imports this file, so it is not in the
 * bundle; it is kept only as reference material from an earlier page version. Delete it rather
 * than wiring it back in; live routes are the lazy pages registered in App.tsx.
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderControls } from '../../app/shared';
import type { Language, Theme, ThemePreference } from '../../app/shared';

const crmConsoleRows: ReadonlyArray<readonly [string, { en: string; zh: string }]> = [
  ['Storage', { en: 'One normalized Postgres database', zh: '一个标准化 Postgres 数据库' }],
  ['Search', { en: 'pgvector semantic index', zh: 'pgvector 语义索引' }],
  ['Security', { en: 'RBAC + encrypted credentials', zh: 'RBAC + 加密凭证' }],
  ['Migrations', { en: '9 phases just to retire old columns', zh: '9 个阶段，只为退役旧字段' }],
];

const crmValueProps = [
  {
    title: { en: 'One brain, not 40 spreadsheets', zh: '一个大脑，不是 40 张表' },
    copy: {
      en: 'Every game provider, merchant, vendor account, login, rate, and coverage rule lives in one place. The pile of Excel files that used to run the business? Gone. It all got eaten.',
      zh: '每个游戏供应商、商户、供应商账号、登录、费率、地区规则，全塞进同一个地方。以前撑着整个生意的那堆 Excel？没了。全被吃掉了。',
    },
  },
  {
    title: { en: 'Everything is wired together', zh: '全都连在一起' },
    copy: {
      en: 'Providers link to vendors, vendors to merchants, merchants to accounts, accounts to products. Click one thing and the whole web lights up. Nothing floats alone anymore.',
      zh: '供应商连供应商账号，账号连商户，商户连产品，一层扣一层。点一个，整张网都亮起来。没有东西再孤零零飘着。',
    },
  },
  {
    title: { en: 'It remembers (and it tells on you)', zh: '它记得住（还会打小报告）' },
    copy: {
      en: 'Audit logs, encrypted credentials, role locks. Sales literally cannot see the cost rate. Something breaks, you check the log instead of asking the room “who touched this?”',
      zh: '审计日志、加密凭证、角色锁。销售根本看不到成本费率。出事了翻日志，而不是对着全屋问「谁动了这个？」',
    },
  },
] as const;

const crmWildFeatures = [
  {
    title: 'An AI that reads your providers',
    copy: {
      en: 'A pgvector embedding layer indexes every provider so you can search them by meaning, not exact spelling. Yes, the back-office tool has a semantic brain bolted on. No, nobody strictly needed it.',
      zh: '一层 pgvector 向量索引把每个供应商都嵌进去，你可以按「意思」搜，而不是拼对名字。对，一个后台工具硬是装了个语义大脑。对，没人非要它不可。',
    },
  },
  {
    title: 'A database normalized into oblivion',
    copy: {
      en: 'Nine phases of migration — freeze the legacy writes, blank the columns, archive them forever, guard the drop, run a readiness report, THEN delete. All to retire a few old columns without losing a byte. Overkill is the whole personality.',
      zh: '九个阶段的迁移——先冻结旧写入、清空列、永久归档、加删除护栏、跑就绪报告，然后才删。全是为了退役几列旧字段，还一个字节都不丢。过度工程就是它的人格。',
    },
  },
  {
    title: 'A country parser with trust issues',
    copy: {
      en: 'It reads messy “restricted countries” text and pulls out real ISO codes. The catch: two-letter matching is case-SENSITIVE, because otherwise “in” becomes India, “no” becomes Norway, and “at” becomes Austria. It has been burned before.',
      zh: '它读乱糟糟的「限制国家」文字，抠出真正的 ISO 代码。关键是：两位字母匹配区分大小写，否则「in」变印度、「no」变挪威、「at」变奥地利。它被坑过，记仇了。',
    },
  },
  {
    title: 'Locks on everything',
    copy: {
      en: 'Role-based access, encrypted master and sub-agent logins that never travel in plaintext, and a cost-rate secrecy rule enforced on the server so the frontend can’t leak it even if it tried.',
      zh: '基于角色的权限、永不明文传输的主账号与子账号加密登录，还有在服务器端强制的成本费率保密规则——前端就算想泄露也泄不出去。',
    },
  },
  {
    title: 'A golden-ratio design system nobody requested',
    copy: {
      en: 'φ ≈ 1.618 column splits, a φ-stepped spacing rhythm, a hash-to-color chip palette, and a live brandbook page that renders every design token as real components. An internal admin tool. With a brandbook. Sure.',
      zh: 'φ ≈ 1.618 的分栏、按 φ 递进的间距节奏、用哈希生成颜色的标签盘，还有一个把每个设计 token 都渲染成真组件的「品牌手册」页。一个内部后台工具。还配品牌手册。行吧。',
    },
  },
  {
    title: 'Day / Night mode that swaps colors for fun',
    copy: {
      en: 'Flip to Night and the palette does a complementary swap — green becomes blue, yellow becomes purple — across every chip, KPI, and badge. Then a whole saga of fighting Chrome’s force-dark from inverting the light theme behind our backs.',
      zh: '切到夜间，整个配色做互补翻转——绿变蓝、黄变紫——覆盖每个标签、KPI、徽章。然后还有一整段跟 Chrome 强制深色模式斗智斗勇、不让它偷偷把白天主题反色的血泪史。',
    },
  },
] as const;

const crmStoryIntro = {
  en: 'This was supposed to be “a place to keep track of our providers.” Read the build log and it clearly lost the plot somewhere around phase three. A few scenes from the rampage.',
  zh: '这本来只是「一个记录我们供应商的地方」。翻翻构建日志，大概在第三阶段就已经玩脱了。下面是这场暴走里的几个名场面。',
} as const;

const crmStories = [
  {
    date: 'Migration day',
    title: { en: 'The night a fuzzy matcher saved the import', zh: '模糊匹配救回整场导入的那一夜' },
    body: {
      en: 'The Excel importer kept choking on provider names that were written half a dozen different ways and didn’t match anything cleanly. So a four-tier name matcher got built — exact, strip-the-code, strip-the-parens, then split-on-slash-and-match-every-piece. One re-run later, a big chunk of rows that were about to be dropped quietly walked back into the database. Nobody clapped. The matcher didn’t need applause.',
      zh: '导入器一直被那些写法五花八门、怎么都对不上的供应商名字噎住。于是写了个四层匹配——精确、去代码、去括号、再按斜杠拆开逐段匹配。重跑一次，一大批本来要被悄悄丢掉的行，自己走回了数据库。没人鼓掌。匹配器也不需要掌声。',
    },
  },
  {
    date: 'The bug',
    title: { en: '“in” means India now', zh: '从此「in」就是印度' },
    body: {
      en: 'The country parser matched two-letter ISO codes case-insensitively, which sounds fine until the word “in” inside a sentence quietly tags an entry as restricted in India. And “no” as Norway. And “at” as Austria. The fix: make two-letter matching case-SENSITIVE, UPPER-only. Long country names stay relaxed; the tiny codes now have to shout. A pile of free-text mush turned into clean, structured country tags.',
      zh: '国家解析器原本不分大小写匹配两位 ISO 代码，听起来没事——直到句子里的「in」悄悄把某条记录标成「限制于印度」。还有「no」变挪威、「at」变奥地利。修法：两位匹配改成区分大小写、只认大写。长国名照样随意；小代码现在必须喊出来。一堆自由文本，就这样变成了干净、结构化的国家标签。',
    },
  },
  {
    date: 'Phase 9c',
    title: { en: 'The most ceremonial DELETE in history', zh: '史上最讲排场的一次 DELETE' },
    body: {
      en: 'To drop a handful of legacy columns, the database first froze new writes to them, blanked the values, copied everything into a permanent archive table, added a guard script that refuses to run if anything still depends on them, demanded a readiness report come back green, AND a 24-hour window with zero legacy traffic — and only THEN ran the migration that said `DROP COLUMN`. Deleting a column has never been treated with more respect.',
      zh: '为了删掉几列旧字段，数据库先冻结了对它们的新写入、清空数值、把一切复制进一张永久归档表、加了个「只要还有东西依赖就拒绝运行」的护栏脚本、要求就绪报告亮绿灯、还要 24 小时零旧流量——然后才跑那句 `DROP COLUMN`。删一列字段，从没被这么郑重对待过。',
    },
  },
] as const;

export const CrmFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';

  return (
    <div className="page-shell etreport-page poker-page crm-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="etreport-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={projectsHref} className="etreport-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="etreport-hero py-16 text-center md:py-24">
            <p className="etreport-kicker mx-auto">{isZh ? 'CRM Intelligence System' : 'CRM Intelligence System'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '本来只想要个表格。结果搭了个大脑。' : 'We wanted a spreadsheet. We built a brain.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? '一个后台 CRM：把一整门生意从一堆乱到犯法的 Excel 里捞出来——供应商、商户、账号、费率、地区规则——整理成一个连在一起的数据库，然后就一发不可收拾了。状态：据说还「在设计中」。'
                : 'A back-office CRM that pulls a whole business out of a pile of criminally messy Excel — providers, merchants, accounts, rates, coverage rules — and wires it into one connected database. Then it kept going. Status: allegedly still “in design.”'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="#crm-stack" className="etreport-text-cta">
                {isZh ? '看它吃了什么' : 'See what it ate'} <span aria-hidden>›</span>
              </a>
              <a href="#crm-wild" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '没人要它做的功能' : 'Things nobody asked for'} <span aria-hidden>›</span>
              </a>
              <a href="#crm-story" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '几个名场面' : 'A few war stories'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section id="crm-stack" className="etreport-console-panel">
            <div className="etreport-console-copy">
              <p className="etreport-kicker">{isZh ? 'What it ate' : 'What it ate'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '它把整个生意从 Excel 里吃了进去。' : 'It ate the whole business out of Excel.'}
              </h2>
              <p>
                {isZh
                  ? '供应商、供应商账号、商户、产品、登录、费率、地区规则——以前散在几十张表里，现在全在一个标准化的 Postgres 数据库里，连着审计日志、加密和权限。'
                  : 'Providers, vendors, merchants, products, logins, rates, coverage rules — once scattered across dozens of sheets, now in one normalized Postgres database with audit logs, encryption, and access control bolted on.'}
              </p>
            </div>
            <div className="etreport-console-metrics">
              {crmConsoleRows.map(([label, value]) => (
                <div key={label} className="etreport-console-row">
                  <span>{label}</span>
                  <strong>{value[language]}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'What it actually is' : 'What it actually is'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '说白了，它是这门生意的操作大脑。' : 'Basically, it’s the operating brain for the whole business.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {crmValueProps.map((item) => (
                <article key={item.title.en} className="etreport-value-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="crm-wild" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Built anyway' : 'Built anyway'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '没人要求，但它就是有的东西。' : 'Things nobody asked for, but it has anyway.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {crmWildFeatures.map((item) => (
                <article key={item.title} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="crm-story" className="etreport-section py-16 md:py-24">
            <div className="poker-story-panel">
              <div className="poker-story-head">
                <p className="etreport-kicker">{isZh ? 'Build log, dramatized' : 'Build log, dramatized'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '从「记录供应商」到完全玩脱。' : 'From “track our providers” to total chaos.'}
                </h2>
                <p className="poker-story-intro">{crmStoryIntro[language]}</p>
              </div>
              <div className="poker-story-list">
                {crmStories.map((item) => (
                  <article key={item.title.en} className="poker-story-item">
                    <p className="poker-story-date">{item.date}</p>
                    <h3 className="poker-story-title font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {item.title[language]}
                    </h3>
                    <p className="poker-story-body">{item.body[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="etreport-section pb-20 pt-10">
            <div className="etreport-final-panel">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '它没有公开链接。它住在某台机器的 localhost 上，过得很好。' : 'There’s no public link. It lives on a localhost somewhere, thriving.'}
              </h2>
              <p>
                {isZh
                  ? '这是内部后台工具——管的是真实的供应商、商户和账号，所以不对外开。它最能说明的不是「会不会做 CRM」，而是愿不愿意为了一个干净的数据库，把一件小事做到过度认真。'
                  : 'It’s an internal back-office tool — it manages real providers, merchants, and accounts, so it stays private. What it really shows isn’t “can you build a CRM,” it’s the willingness to take one small thing way too seriously for the sake of a clean database.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={projectsHref} className="etreport-text-cta">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
                <a href={homeHref} className="etreport-text-cta etreport-text-cta-muted">
                  {isZh ? '回主页' : 'Back home'} <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
