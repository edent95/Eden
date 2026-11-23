import React from 'react';
import { ArrowLeft, ArrowRight, Coffee, Linkedin, Mail } from 'lucide-react';
import { JijuBeliefs, JijuFlowChart } from '../components/JijuStory';
import { JijuShipGate } from '../components/JijuCharts';
import { useCountUp } from '../components/ProductStorePage';
import { ABOUT_EMAIL, ABOUT_LINKEDIN } from '../components/about-content';

/**
 * `/for/arzumy` — a one-reader page (2026-11-23): Eden's application to be the personal AI
 * advisor of Arzumy Md Yusof, appointed CEO of AI Malaysia that day. Built around his own
 * 2016 post "Throw your resume away, kid" (ar.zu.my): show what you built, not a CV.
 * Not indexed, not in the sitemap. Every number is one already published on /jiju-pet and read
 * from the Jiju / personal-dashboard repos on 2026-11-23; the Jiju figures are the shared
 * components from components/JijuStory.tsx and JijuCharts.tsx. Disclosure follows /igaming/resume
 * (igaming-resume-content.ts): markets by region only, no brand names, no phone, no pay. Styles: styles/pages/arzumy.css,
 * colours from the product page tokens (.eden-product-page).
 */

type Lang = 'en' | 'zh';
type T = { en: string; zh: string };

const STATS: { value: number; unit: T; text: T }[] = [
  { value: 847, unit: { en: 'places', zh: '家店' }, text: { en: 'live on jiju.pet, in 12 states and regions', zh: '在 jiju.pet 上线,横跨 12 个州 / 地区' } },
  { value: 435, unit: { en: 'changes', zh: '次改动' }, text: { en: 'to the website, almost all written by AI', zh: '网站改动,几乎都由 AI 写' } },
  { value: 1, unit: { en: 'person', zh: '个人' }, text: { en: 'started it in January 2026 by chatting with an AI', zh: '2026 年 1 月开始,跟 AI 一句句聊出来' } },
];

const FITS: { from: T; to: T; text: T }[] = [
  {
    from: { en: 'No source, no claim', zh: '没有出处,就不说' },
    to: { en: 'AI the public can trust', zh: '让公众信得过的 AI' },
    text: {
      en: 'Every sentence Jiju publishes can be traced to the shop’s own words. The same rule fits anything an agency says in public with AI’s help.',
      zh: 'Jiju 公开的每一句都能追到店家原话。机构借 AI 对外说的每一句,也可以照这条规矩。',
    },
  },
  {
    from: { en: 'Machines search, a person decides', zh: '机器去找,人来拍板' },
    to: { en: 'Officers stay accountable', zh: '责任留在人身上' },
    text: {
      en: 'AI drafts at night; nothing goes public until a person confirms. Speed from the machines, judgement and accountability from people.',
      zh: 'AI 夜里写草稿,人确认之前什么都不公开。速度交给机器,判断和问责留给人。',
    },
  },
  {
    from: { en: 'No money wasted', zh: '不花冤枉钱' },
    to: { en: 'Public money, local data', zh: '公帑与本地数据' },
    text: {
      en: 'A 26B open model runs on my own laptop; every paid service has a daily cap. Sensitive work can stay on hardware you control.',
      zh: '26B 的开源模型跑在我自己的电脑上,每个付费服务都有每日上限。敏感的工作可以留在自己掌控的机器里。',
    },
  },
  {
    from: { en: 'Agents get keys, not trust', zh: '给 agent 钥匙,不给信任' },
    to: { en: 'Safe AI agents at scale', zh: '可以放大的安全 agent' },
    text: {
      en: 'Five research bots work through one door: read-only keys by default, daily quotas, a log of every page they read, and spot checks on each other.',
      zh: '五个研究 bot 走同一道门:默认只读钥匙、每日份额、读过哪些网页都有记录,还互相抽查。',
    },
  },
];

const PLAN: { when: T; title: T; text: T }[] = [
  {
    when: { en: 'Days 1–30', zh: '第 1–30 天' },
    title: { en: 'Your own AI desk', zh: '你自己的 AI 工作台' },
    text: {
      en: 'An assistant set up around your week: briefs before meetings, a daily read of what is said about the National AI Action Plan, first drafts of notes and replies. Sensitive material on a local model.',
      zh: '按你的一周搭一个助手:会前简报、每天读一遍外界对国家 AI 行动计划的讨论、笔记和回复的初稿。敏感资料走本机模型。',
    },
  },
  {
    when: { en: 'Days 31–60', zh: '第 31–60 天' },
    title: { en: 'One public pilot, shipped', zh: '一个对外试点,做出来' },
    text: {
      en: 'Pick one small thing the public sees — say, AI-literacy material for community events like MDKD — and run it the Jiju way: sourced, human-confirmed, capped in cost.',
      zh: '挑一件公众看得到的小事 —— 比如 MDKD 这类社区活动用的 AI 普及材料 —— 照 Jiju 的方法跑:有出处、人确认、成本有上限。',
    },
  },
  {
    when: { en: 'Days 61–90', zh: '第 61–90 天' },
    title: { en: 'A playbook others can copy', zh: '一本别人能照做的手册' },
    text: {
      en: 'Write down what worked — guardrails, costs, how to check AI output — so your team and other agencies can repeat it without me in the room.',
      zh: '把行得通的写下来 —— 护栏、成本、怎么检查 AI 的输出 —— 让你的团队和其他机构不用我在场也能照做。',
    },
  },
];

const ABOUT: T[] = [
  {
    en: 'Eden Tan, based in Penang. Seven years in consumer growth and CRM for online platforms across Southeast Asia and Australia, most of it in online gaming. Led a team of four; +30% retention in three months.',
    zh: 'Eden Tan,住在槟城。七年做线上平台的用户增长和 CRM,市场在东南亚与澳洲,大部分在线上博彩行业。带过四人团队;三个月把留存提升 30%。',
  },
  {
    en: 'Since January 2026 I have mostly been building with AI: Jiju, and the dashboard that runs my agents — more than 700 changes shipped through it, each one checked by automated tests before it goes live.',
    zh: '2026 年 1 月起,我主要在用 AI 做东西:Jiju,还有调度我那些 agent 的面板 —— 经它上线的改动超过 700 次,每一次上线前都要先过自动测试。',
  },
  {
    en: 'English, Bahasa Melayu, Mandarin and Cantonese. Happy to work on site in Kuala Lumpur.',
    zh: '会英文、马来文、普通话和粤语。可以到吉隆坡上班。',
  },
];

const Stat: React.FC<{ item: (typeof STATS)[number]; lang: Lang }> = ({ item, lang }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const progress = useCountUp(ref, 1600);
  return (
    <div ref={ref} className="arz-stat" aria-label={`${item.value} ${item.unit.en}: ${item.text.en}`}>
      <p className="arz-stat-value">
        {Math.round(item.value * progress).toLocaleString('en-US')}
        <span>{item.unit[lang]}</span>
      </p>
      <p className="arz-stat-text">{item.text[lang]}</p>
    </div>
  );
};

/** Cards reveal one after another once the list scrolls into view (end state under reduced motion). */
const useReveal = (ref: React.RefObject<HTMLElement | null>, count: number) => {
  const [shown, setShown] = React.useState(0);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setShown(count);
      return;
    }
    let timer = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      let n = 0;
      timer = window.setInterval(() => {
        n += 1;
        setShown(n);
        if (n >= count) window.clearInterval(timer);
      }, 260);
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [ref, count]);
  return shown;
};

const ArzumyAdvisorPage: React.FC<{ language: Lang; jijuHref: string; controls: React.ReactNode }> = ({ language, jijuHref, controls }) => {
  const lang = language;
  const isZh = lang === 'zh';
  const t = (value: T) => value[lang];
  const fitsRef = React.useRef<HTMLOListElement>(null);
  const planRef = React.useRef<HTMLOListElement>(null);
  const fitsShown = useReveal(fitsRef, FITS.length);
  const planShown = useReveal(planRef, PLAN.length);

  return (
    <div className={`eden-product-page arz-page${isZh ? ' is-zh' : ''}`}>
      <nav className="project-home-nav arz-nav" aria-label="Primary navigation">
        <a href={jijuHref} className="project-home-back">
          <ArrowLeft size={16} aria-hidden="true" />
          {isZh ? 'Jiju 完整介绍' : 'The full Jiju story'}
        </a>
        {controls}
      </nav>

      <main className="arz-main">
        <header className="arz-hero">
          <p className="arz-kicker">{isZh ? '写给 Arzumy Md Yusof · AI Malaysia 首席执行官' : 'For Arzumy Md Yusof · CEO, AI Malaysia'}</p>
          <h1>{isZh ? '你说过:把简历丢掉。所以这里是我做出来的东西。' : 'You once wrote: throw your resume away. So here is what I built instead.'}</h1>
          <p className="arz-standfirst">
            {isZh
              ? 'Jiju 是一个马来西亚的去处指南,从搭建到日常运营几乎全由 AI 完成,背后只有我一个人。我想在 AI Malaysia 做你的个人 AI 顾问,帮你把同样的做法用起来。'
              : 'Jiju is a Malaysian places guide, built and run almost entirely by AI, with one person behind it. I would like to help you do the same at AI Malaysia, as your personal AI advisor.'}
          </p>
          <p className="arz-congrats">{isZh ? '恭喜你今天(2026 年 11 月 23 日)正式上任。' : 'Congratulations on starting at AI Malaysia today, 23 November 2026.'}</p>
        </header>

        <section className="arz-stats" aria-label={isZh ? 'Jiju 的三个数字' : 'Jiju in three numbers'}>
          {STATS.map((item) => <Stat key={item.unit.en} item={item} lang={lang} />)}
          <p className="arz-source">{isZh ? '数字取自 Jiju 与个人面板的代码库,2026-11-23;和 jiju-pet 页面公开的一致。' : 'Figures read from the Jiju and dashboard repositories on 2026-11-23; the same ones published on the Jiju page.'}</p>
        </section>

        <section className="arz-section">
          <h2>{isZh ? '一家店怎么上到 Jiju' : 'How one shop gets onto Jiju'}</h2>
          <p className="arz-lead">{isZh ? 'AI 找、AI 写、另一个 AI 挑错,最后我确认。图会自己跑三个真实例子。' : 'AI finds it, AI drafts it, another AI checks it, and I confirm. The chart plays three real examples.'}</p>
          <JijuFlowChart isZh={isZh} />
        </section>

        <section className="arz-section">
          <JijuBeliefs isZh={isZh} />
        </section>

        <section className="arz-section">
          <h2>{isZh ? '网站本身也是 AI 在改' : 'The website is changed by AI too'}</h2>
          <JijuShipGate isZh={isZh} />
        </section>

        <section className="arz-section">
          <h2>{isZh ? '同样的规矩,放到 AI Malaysia' : 'The same rules, at AI Malaysia'}</h2>
          <ol ref={fitsRef} className="arz-fits">
            {FITS.map((fit, index) => (
              <li key={fit.from.en} className={`arz-fit${index < fitsShown ? ' is-in' : ''}`}>
                <p className="arz-fit-pair">
                  <span className="arz-fit-from">{t(fit.from)}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                  <span className="arz-fit-to">{t(fit.to)}</span>
                </p>
                <p>{t(fit.text)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="arz-section">
          <h2>{isZh ? '做你的个人 AI 顾问:头 90 天' : 'As your personal AI advisor: the first 90 days'}</h2>
          <p className="arz-lead">{isZh ? '这是起点,不是定案 —— 先听你说最想解决什么。' : 'A starting point, not a fixed plan — I would rather hear first what you most want solved.'}</p>
          <ol ref={planRef} className="arz-plan">
            {PLAN.map((step, index) => (
              <li key={step.when.en} className={`arz-step${index < planShown ? ' is-in' : ''}`}>
                <span className="arz-step-dot" aria-hidden="true" />
                <p className="arz-step-when">{t(step.when)}</p>
                <h3>{t(step.title)}</h3>
                <p>{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="arz-section arz-about">
          <h2>{isZh ? '关于我' : 'About me'}</h2>
          {ABOUT.map((line) => <p key={line.en}>{t(line)}</p>)}
        </section>

        <section className="arz-cta">
          <Coffee size={28} aria-hidden="true" />
          <h2>{isZh ? '在吉隆坡喝杯咖啡,或者通个 20 分钟电话?' : 'Coffee in KL, or a 20-minute call?'}</h2>
          <p>{isZh ? '我可以当面打开 Jiju 和面板给你看它们怎么跑。' : 'I can open Jiju and the dashboard and show you how they run.'}</p>
          <div className="arz-cta-links">
            <a className="arz-cta-primary" href={`mailto:${ABOUT_EMAIL}?subject=${encodeURIComponent('Coffee / call — AI advisor')}`}>
              <Mail size={16} aria-hidden="true" />
              {ABOUT_EMAIL}
            </a>
            <a href={ABOUT_LINKEDIN} target="_blank" rel="noreferrer">
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn
            </a>
            <a href="https://jiju.pet" target="_blank" rel="noreferrer">jiju.pet</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArzumyAdvisorPage;
