/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Plain-language figures for the /jiju-pet "How Jiju runs itself" section, written for readers
// with no AI or IT background: beliefs, the visitor's journey with what happens behind it,
// a yes/no flowchart of how one shop gets onto Jiju, and a cheat sheet of terms.
// Facts match components/jiju-playbook-content.ts (read from the repos on 2026-11-23).
// Motion: cards reveal once when scrolled into view; the journey and flowchart step while visible
// and stop when scrolled away; prefers-reduced-motion shows the final state.

import React from 'react';
import { BookOpenCheck, Bot, CircleDashed, Coins, Footprints, Laptop, MessageCircle, Moon, PenLine, Quote, Search, ShieldCheck, Store, UserCheck, Users } from 'lucide-react';
import { useCountUp, type EpText } from './ProductStorePage';

type Props = { isZh: boolean };
const pick = (isZh: boolean, text: EpText) => (isZh ? text.zh : text.en);

const useLoopStep = (ref: React.RefObject<HTMLElement | null>, count: number, ms: number, still: number) => {
  const [step, setStep] = React.useState(still);
  React.useEffect(() => {
    const node = ref.current;
    if (typeof window === 'undefined' || !node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setStep(still);
      return;
    }
    let timer = 0;
    const stop = () => { if (timer) window.clearInterval(timer); timer = 0; };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (!timer) {
          setStep(0);
          timer = window.setInterval(() => setStep((value) => (value + 1) % count), ms);
        }
      } else {
        stop();
      }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => { observer.disconnect(); stop(); };
  }, [ref, count, ms, still]);
  return step;
};

/* ---------- 1. Beliefs ---------- */

const BELIEFS: { icon: React.ReactNode; title: EpText; text: EpText }[] = [
  {
    icon: <UserCheck size={22} />,
    title: { en: 'Machines search, a person decides', zh: '机器去找，人来拍板' },
    text: { en: 'AI looks for shops and drafts the details at night. Anything the public will see waits for my “confirm” in the morning.', zh: 'AI 夜里找店、读网页、写草稿。凡是要公开给大家看的，都等我早上按「确认」。' },
  },
  {
    icon: <Quote size={22} />,
    title: { en: 'No source, no claim', zh: '没有出处，就不说' },
    text: { en: 'Every highlight must be a sentence you can find on the shop’s own page. If it cannot be found, it is not written.', zh: '每一句卖点，都要能在店家自己的网页上找到原话。找不到，就不写。' },
  },
  {
    icon: <CircleDashed size={22} />,
    title: { en: 'Blank beats made-up', zh: '宁可留白，也不编' },
    text: { en: 'Opening hours or a price we cannot verify stays empty, rather than filled with someone’s guess.', zh: '查不到的营业时间、价格就空着，不拿别人的猜测来填。' },
  },
  {
    icon: <ShieldCheck size={22} />,
    title: { en: 'One AI writes, another checks', zh: '一个 AI 写，另一个 AI 挑错' },
    text: { en: 'The checker has no internet and only asks: does the quote really say this? Most suggestions are thrown away.', zh: '负责检查的 AI 不能上网，只问一件事：原话真的这么说吗？大部分建议都被丢掉。' },
  },
  {
    icon: <Coins size={22} />,
    title: { en: 'No money wasted', zh: '不花冤枉钱' },
    text: { en: 'What can run on my own computer does. Every outside service has a daily limit, so nothing can quietly run up a bill.', zh: '能在自己电脑上跑的就在自己电脑跑。每个外部服务都有每日上限，不会悄悄烧钱。' },
  },
];

export const JijuBeliefs: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const progress = useCountUp(ref, 1400);
  const shown = Math.ceil(progress * BELIEFS.length);
  return (
    <figure className="jjc-figure jjs-beliefs-figure">
      <p className="jjc-figure-title">{pick(isZh, { en: 'Five rules everything follows', zh: '所有事情都照这五条做' })}</p>
      <div ref={ref} className="jjs-beliefs">
        {BELIEFS.map((belief, index) => (
          <article key={belief.title.en} className={`jjs-belief${index < shown ? ' is-in' : ''}`}>
            <span className="jjs-belief-icon" aria-hidden="true">{belief.icon}</span>
            <h3>{pick(isZh, belief.title)}</h3>
            <p>{pick(isZh, belief.text)}</p>
          </article>
        ))}
      </div>
    </figure>
  );
};

/* ---------- 2. Customer journey: what you see / what happens behind it ---------- */

const JOURNEY: { icon: React.ReactNode; you: EpText; behind: EpText }[] = [
  {
    icon: <Search size={18} />,
    you: { en: '“Where should we go today?”', zh: '「今天去哪里？」' },
    behind: { en: 'Five AI helpers search every day for new shops, deals and events.', zh: '五个 AI 助手每天在网上找新店、优惠和活动。' },
  },
  {
    icon: <Footprints size={18} />,
    you: { en: 'Open Jiju and pick a mood: eat, pets, explore', zh: '打开 Jiju，选想做的事：吃、带宠物、探索' },
    behind: { en: 'Labels like “specialty coffee” are only given when the shop’s own words say so.', zh: '「精品咖啡」这类标签，只有店家原话写明了才贴。' },
  },
  {
    icon: <Store size={18} />,
    you: { en: 'Read the shop card: hours, highlights, deals', zh: '看店家卡片：营业时间、亮点、优惠' },
    behind: { en: 'At night an AI reads the shop’s website and drafts it; another AI checks; I confirm.', zh: '夜里 AI 读店家网站写草稿，另一个 AI 检查，我再确认。' },
  },
  {
    icon: <Moon size={18} />,
    you: { en: 'Go out and visit', zh: '出门、到店' },
    behind: { en: 'Shop pages are re-checked daily: new deal ★, holiday ⚠. Closed shops come off the list.', zh: '每天巡查店家网页：有新优惠 ★、要放假 ⚠；确认结业的自动下架。' },
  },
  {
    icon: <PenLine size={18} />,
    you: { en: 'Leave a note or a correction', zh: '回来留下记录或更正' },
    behind: { en: 'Corrections join the queue, so the next person sees fresher information.', zh: '更正进入待处理清单，下一个人看到的就是新资料。' },
  },
  {
    icon: <MessageCircle size={18} />,
    you: { en: 'Shop owners join in', zh: '店主也加入' },
    behind: { en: 'Up to 5 owners a day get a WhatsApp invite that opens with a checked fact about their shop.', zh: '每天最多邀请 5 位店主，WhatsApp 开头说的是一件核实过的、关于他家店的事。' },
  },
];

export const JijuJourney: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLOListElement | null>(null);
  const active = useLoopStep(ref, JOURNEY.length, 2200, -1);
  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">
        {pick(isZh, { en: 'One outing, two sides', zh: '一次出门，两条线' })}
        <span className="jjs-legend">
          <i className="jjs-dot jjs-dot-you" aria-hidden="true" />{pick(isZh, { en: 'what you see', zh: '你看到的' })}
          <i className="jjs-dot jjs-dot-behind" aria-hidden="true" />{pick(isZh, { en: 'behind the scenes', zh: '幕后' })}
        </span>
      </p>
      <ol
        ref={ref}
        className="jjs-journey"
        aria-label={JOURNEY.map((step, index) => `${index + 1}. ${pick(isZh, step.you)} — ${pick(isZh, step.behind)}`).join(' ')}
      >
        {JOURNEY.map((step, index) => (
          <li key={step.you.en} className={`jjs-journey-step${index === active ? ' is-active' : ''}`} aria-hidden="true">
            <span className="jjs-journey-no">{index + 1}</span>
            <div className="jjs-journey-you">
              <span className="jjs-journey-icon">{step.icon}</span>
              <strong>{pick(isZh, step.you)}</strong>
            </div>
            <div className="jjs-journey-behind">
              <Bot size={15} aria-hidden="true" />
              <span>{pick(isZh, step.behind)}</span>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>
        {pick(isZh, {
          en: 'Each step shows the visitor’s experience, and in the shaded box what the machines did beforehand to make it true.',
          zh: '每一步：访客的体验，加上灰底框里机器事先做了什么，让这一步的资料是真的。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 3. Flowchart: how one shop gets onto Jiju ---------- */

type FlowNode = { id: string; kind: 'start' | 'step' | 'ask' | 'end'; text: EpText; down?: EpText; side?: { id: string; label: EpText; text: EpText } };

const FLOW: FlowNode[] = [
  { id: 'found', kind: 'start', text: { en: 'An AI helper finds a shop', zh: 'AI 助手找到一家店' } },
  {
    id: 'official', kind: 'ask', text: { en: 'Is there a page by the shop itself?', zh: '有店家自己的网页或帖子吗？' }, down: { en: 'Yes', zh: '有' },
    side: { id: 'lead', label: { en: 'No', zh: '没有' }, text: { en: 'Kept only as a lead', zh: '只记成线索' } },
  },
  {
    id: 'exists', kind: 'ask', text: { en: 'Is it already on Jiju?', zh: 'Jiju 里已经有了吗？' }, down: { en: 'No', zh: '没有' },
    side: { id: 'merge', label: { en: 'Yes', zh: '有' }, text: { en: 'Added to the existing shop', zh: '补进原来那家' } },
  },
  { id: 'draft', kind: 'step', text: { en: 'Saved as a draft — not public yet', zh: '存成草稿 —— 还没公开' } },
  { id: 'write', kind: 'step', text: { en: 'An AI on my computer reads the page and drafts highlights', zh: '我电脑里的 AI 读网页，写亮点草稿' } },
  {
    id: 'check', kind: 'ask', text: { en: 'A second AI: does the quote really say this?', zh: '第二个 AI 检查：原话真的这么说吗？' }, down: { en: 'Yes', zh: '是' },
    side: { id: 'drop', label: { en: 'No', zh: '不是' }, text: { en: 'Thrown away', zh: '丢掉' } },
  },
  { id: 'eden', kind: 'step', text: { en: 'I confirm in the morning', zh: '我早上按「确认」' } },
  { id: 'live', kind: 'end', text: { en: 'Live on Jiju for everyone', zh: '上线，大家都看得到' } },
];

// Three worked examples, each a path through the chart (ids, a side id means "went off to the side").
const EXAMPLES: { title: EpText; path: string[] }[] = [
  { title: { en: 'Example 1 · the shop’s own site says “Set lunch RM15.90”', zh: '例子 1 · 店家官网写着「午市套餐 RM15.90」' }, path: ['found', 'official', 'exists', 'draft', 'write', 'check', 'eden', 'live'] },
  { title: { en: 'Example 2 · only a travel blog mentions the shop', zh: '例子 2 · 只有旅游博客提到这家' }, path: ['found', 'official', 'lead'] },
  { title: { en: 'Example 3 · the AI wrote “the best cafe in town”', zh: '例子 3 · AI 写了「全城最好的咖啡馆」' }, path: ['found', 'official', 'exists', 'draft', 'write', 'check', 'drop'] },
];

const FLOW_FRAMES = EXAMPLES.flatMap((example, exampleIndex) => [
  ...example.path.map((_, stepIndex) => ({ exampleIndex, stepIndex })),
  { exampleIndex, stepIndex: example.path.length - 1 },
]);

export const JijuFlowChart: React.FC<Props> = ({ isZh }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  // Reduced motion pins the end of example 1 (the full path to “live”).
  const frameIndex = useLoopStep(ref, FLOW_FRAMES.length, 900, EXAMPLES[0].path.length);
  const frame = FLOW_FRAMES[frameIndex] ?? FLOW_FRAMES[FLOW_FRAMES.length - 1];
  const example = EXAMPLES[frame.exampleIndex];
  const visited = new Set(example.path.slice(0, frame.stepIndex + 1));
  const current = example.path[frame.stepIndex];
  const state = (id: string) => `${visited.has(id) ? ' is-visited' : ''}${current === id ? ' is-current' : ''}`;

  return (
    <figure className="jjc-figure">
      <p className="jjc-figure-title">{pick(isZh, { en: 'How one shop gets onto Jiju', zh: '一家店怎么上到 Jiju' })}</p>
      <p className="jjs-example" aria-live="off">{pick(isZh, example.title)}</p>
      <div
        ref={ref}
        className="jjs-flow"
        role="img"
        aria-label={pick(isZh, {
          en: 'Flowchart: an AI helper finds a shop. If there is no page by the shop itself, it is kept only as a lead. If the shop is already on Jiju, the details are added to it. Otherwise it is saved as a draft, an AI on Eden’s computer drafts highlights, a second AI checks each quote — anything not supported is thrown away — Eden confirms in the morning, and it goes live.',
          zh: '流程图：AI 助手找到一家店。没有店家自己的网页，就只记成线索；Jiju 里已经有了，就补进原来那家；否则存成草稿，Eden 电脑里的 AI 写亮点草稿，第二个 AI 逐句检查原话，撑不住的丢掉，Eden 早上确认，然后上线。',
        })}
      >
        {FLOW.map((node, index) => (
          <div key={node.id} className="jjs-flow-row" aria-hidden="true">
            <div className={`jjs-node jjs-node-${node.kind}${state(node.id)}`}>
              {node.kind === 'ask' && <span className="jjs-node-q">?</span>}
              {pick(isZh, node.text)}
            </div>
            {node.side && (
              <div className={`jjs-side${state(node.side.id)}`}>
                <span className="jjs-side-label">{pick(isZh, node.side.label)} →</span>
                <span className="jjs-side-box">{pick(isZh, node.side.text)}</span>
              </div>
            )}
            {index < FLOW.length - 1 && (
              <span className={`jjs-flow-arrow${visited.has(FLOW[index + 1].id) ? ' is-visited' : ''}`}>
                {node.down ? pick(isZh, node.down) : ''}
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption>
        {pick(isZh, {
          en: 'The chart plays three real kinds of case in turn. Only the first one ever reaches the public.',
          zh: '图里轮流演三种真实会发生的情况，只有第一种会走到公开。',
        })}
      </figcaption>
    </figure>
  );
};

/* ---------- 4. Cheat sheet ---------- */

const TERMS: { icon: React.ReactNode; term: EpText; text: EpText }[] = [
  { icon: <Bot size={18} />, term: { en: 'AI helper (agent)', zh: 'AI 助手（agent）' }, text: { en: 'An AI that can open web pages and fill in forms by itself.', zh: '会自己打开网页、填表办事的 AI。' } },
  { icon: <Search size={18} />, term: { en: 'Grok bots', zh: 'Grok bot' }, text: { en: 'Five AI helpers, each looking for one thing: deals, events, links, photos, stories.', zh: '五个 AI 助手，各找一样：优惠、活动、链接、照片、故事。' } },
  { icon: <Laptop size={18} />, term: { en: 'AI on my computer', zh: '本机 AI' }, text: { en: 'An AI installed on my own laptop. Free to run, so it only works at night.', zh: '装在我自己电脑里的 AI，不用钱，只在夜里干活。' } },
  { icon: <ShieldCheck size={18} />, term: { en: 'Claude (the checker)', zh: 'Claude（检查员）' }, text: { en: 'The AI that checks. It cannot go online; it only compares a sentence with its quote.', zh: '负责检查的 AI，不能上网，只拿那句话和原话对照。' } },
  { icon: <Quote size={18} />, term: { en: 'Source', zh: '出处' }, text: { en: 'The exact words on the shop’s own website or post.', zh: '店家自己网站或帖子上的原话。' } },
  { icon: <BookOpenCheck size={18} />, term: { en: 'Draft', zh: '草稿' }, text: { en: 'Information that is not public yet and waits for a person.', zh: '还没公开、在等人确认的资料。' } },
  { icon: <Users size={18} />, term: { en: 'Auto-merge', zh: '自动合并' }, text: { en: 'When every automatic test passes, a website change goes live without anyone pressing a button.', zh: '网站的改动通过全部自动测试，就自己上线，不用人按按钮。' } },
];

export const JijuGlossary: React.FC<Props> = ({ isZh }) => (
  <figure className="jjc-figure">
    <p className="jjc-figure-title">{pick(isZh, { en: 'Words on this page, in plain language', zh: '这一页用到的词，白话版' })}</p>
    <dl className="jjs-terms">
      {TERMS.map((term) => (
        <div key={term.term.en} className="jjs-term">
          <dt><span aria-hidden="true">{term.icon}</span>{pick(isZh, term.term)}</dt>
          <dd>{pick(isZh, term.text)}</dd>
        </div>
      ))}
    </dl>
  </figure>
);
