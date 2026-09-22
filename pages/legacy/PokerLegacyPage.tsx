/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LEGACY — not rendered by any route. App.tsx never imports this file, so it is not in the
 * bundle; it is kept only as reference material from an earlier page version. Delete it rather
 * than wiring it back in; live routes are the lazy pages registered in App.tsx.
 */

import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { HeaderControls, joinBasePath } from '../../app/shared';
import type { Language, Theme, ThemePreference } from '../../app/shared';
import { wikiEntries } from '../../generated/content';
import { getWikiToneClassName, WikiEntryVisual } from '../WikiPage';

const pokerValueProps = [
  {
    title: { en: 'It lives in a link', zh: '一条链接就是一张桌' },
    copy: {
      en: 'Open a table in the browser, drop the link in the group chat, and we’re playing tonight. No app to install, no account to create, none of that.',
      zh: '浏览器开桌，把链接丢进群里，今晚就开打。不用下载、不用注册，没有那一堆「先创建账号」的步骤。',
    },
  },
  {
    title: { en: 'Nobody online? The bots got you', zh: '没人在线？Bot 陪你' },
    copy: {
      en: 'A solo table starts full — three bots already sitting there, ready to lose to you. Or not. Great for killing time, or “practicing.”',
      zh: '单人桌直接满座，三个 Bot 已经坐好，等着输给你。或者不输。打发时间，或者假装自己在「练牌」。',
    },
  },
  {
    title: { en: 'Mic on, it’s a real table', zh: '开麦，它就是张真桌' },
    copy: {
      en: 'Turn on table voice and it stops being a quiet web page. Same trash talk as sitting around the actual table — just without the drive home.',
      zh: '打开同桌语音，它就不再是个安静的网页。还是那些垃圾话，跟真的围着桌子坐一样——只是不用开车回家。',
    },
  },
] as const;

const pokerModules = [
  {
    title: 'Real Hold’em',
    copy: {
      en: 'The whole hand: blinds, flop-turn-river, the pot, and a showdown that lights up your best five. It’s the actual game, not a toy.',
      zh: '完整的一手：盲注、翻牌转牌河牌、底池，摊牌时帮你把最大的五张点亮。是真的牌，不是玩具。',
    },
  },
  {
    title: 'Bots on tap',
    copy: {
      en: 'Solo room, three bots already seated (Alpha, Dealer, Shark). One tap and you’re in a hand. No waiting around.',
      zh: '单人房，三个 Bot 已经坐好（Alpha、Dealer、Shark）。一点就进局，不用干等。',
    },
  },
  {
    title: 'Open a public table',
    copy: {
      en: 'Spin up a room, share the link, and the host taps Start once the crew shows up. Then it’s just us.',
      zh: '开个公开房，把链接发出去，人到齐了房主点「开始」。然后就是我们自己人。',
    },
  },
  {
    title: 'The 8/9 side game',
    copy: {
      en: 'A little side bet riding next to the main hand — two extra cards chasing 8 or 9. Pure chaos, pure fun.',
      zh: '正局旁边挂着的小边注——多发两张牌，去凑 8 或 9。纯混乱，纯好玩。',
    },
  },
] as const;

const pokerAvatarGroupIntro = {
  en: 'This is not just a poker table. It is a strange crew of gamblers, leaders, protectors, kings, drifters, and walking system bugs. Some bring calculation. Some bring chaos. Some bring loyalty. Some bring luck. Some bring trouble for no reason. Alone, they are just players. Together, they become a story.',
  zh: '这不只是一张 poker table。这是一群很奇怪的人组成的江湖局。有赌徒，有老大，有守护者，有王者，有浪人，也有会走路的系统漏洞。有人带来计算，有人带来混乱，有人带来义气，有人带来好运，也有人什么都没做就带来麻烦。单独看，他们只是玩家。坐在一起，他们就变成一场故事。',
} as const;

const pokerAvatarGuide = [
  {
    id: 'jf',
    code: { en: 'The Covered King', zh: '被罩住的王' },
    phrase: { en: 'Backed by luck, protected by fate', zh: '输有靠山，命有后路' },
    tags: { en: 'Protected Gambler / Risk Taker / Lucky Survivor / Confidence Player', zh: '受保护的赌徒 / 风险玩家 / 幸运生还者 / 自信型玩家' },
    intro: {
      en: 'He is not always the most dangerous player at the table, but he plays with a strange kind of confidence. Even when the game turns against him, he never looks completely defeated. There is always a feeling that someone, somewhere, somehow, will help him recover. He is the type who dares to move forward because deep inside, he believes he will not fall alone.',
      zh: '他不一定是牌桌上最危险的人，但他身上有一种很奇怪的安全感。就算局势对他不利，他也不会真的像完全被打垮。你总会感觉，他背后好像还有一条路，还有一个机会，还有某种力量会把他拉回来。他是那种敢往前冲的人，因为他心里相信，自己不会真的一个人倒下。',
    },
  },
  {
    id: 'ph',
    code: { en: 'Cover Bee', zh: '补锅蜂后' },
    phrase: { en: 'Covers the loss, controls the game', zh: '补得了局，控得住场' },
    tags: { en: 'Problem Solver / Silent Controller / Strategic Mind / Support Queen', zh: '问题解决者 / 静默控场者 / 策略型头脑 / 支援女王' },
    intro: {
      en: 'Cover Bee is not just a nickname. It is a whole personality. She is sharp, calm, and naturally good at handling problems. When others panic, she calculates. When others fall into chaos, she cleans up the mess. She does not need to be the loudest person in the room. Her power comes from control, timing, and knowing exactly when to step in.',
      zh: 'Cover Bee 不只是一个外号，而是一种人格。她聪明、冷静，很会处理问题。别人慌的时候，她在算。别人乱的时候，她在收拾局面。她不需要成为房间里最大声的人，因为她的力量不在声音，而在控制力、时机感，以及知道什么时候该出手。',
    },
  },
  {
    id: 'zm',
    code: { en: 'Blackbeard', zh: '黑胡子团长' },
    phrase: { en: 'Loyal heart, iron table presence', zh: '义字当头，镇场如山' },
    tags: { en: 'Group Leader / Loyal Captain / Table Authority / Justice Energy', zh: '团队领袖 / 义气船长 / 牌桌权威 / 正气能量' },
    intro: {
      en: 'Blackbeard is the kind of person who naturally becomes the center of the group. He does not need to force respect. His presence already carries weight. He has loyalty, justice, and the kind of old-school energy that makes people feel the table is under control. When he is around, the game feels less like a random poker night and more like a crew gathered under one captain.',
      zh: 'Blackbeard 是那种很自然会变成团体中心的人。他不需要刻意让人尊重他，因为他的存在本身就有重量。他讲义气，也讲正气，身上有一种老派江湖的气场。只要他在，整个牌桌就不会太乱。那一刻，这不太像普通的 poker night，更像一群人聚在一个船长底下，准备开一场江湖局。',
    },
  },
  {
    id: 'yt',
    code: { en: 'The Silent Shield', zh: '静默之盾' },
    phrase: { en: 'Quiet strength, holding everything together', zh: '不争其名，撑起全局' },
    tags: { en: 'Quiet Support / Family Core / Steady Heart / Hidden Strength', zh: '安静支援 / 家庭核心 / 稳定之心 / 隐藏力量' },
    intro: {
      en: 'The Silent Shield is not the type who fights for attention. But behind many stable things, there is usually someone like her. Calm, kind, responsible, and quietly strong. She does not need to stand in front to prove her value. Her strength is in holding things together when no one else notices the pressure.',
      zh: 'The Silent Shield 不是那种会抢存在感的人。但很多稳定的东西背后，通常都会有一个像她这样的人。冷静、善良、有责任感，而且是安静地强。她不需要站在最前面证明自己的价值，因为她的力量在于，当别人没有注意到压力的时候，她已经默默把很多东西撑住了。',
    },
  },
  {
    id: 'ben',
    code: { en: 'The Gambling King', zh: '赌博之王' },
    phrase: { en: 'Born to bet, built to rise', zh: '赌性入骨，财气冲天' },
    tags: { en: 'High Roller / Number Hunter / Risk Lover / Chaos Maker', zh: '高额玩家 / 数字猎人 / 风险爱好者 / 混乱制造者' },
    intro: {
      en: 'The Gambling King lives like every chance has a hidden number behind it. Cards, numbers, risk, timing, opportunity. If there is a game, he can smell it. If there is a possibility to multiply, he will look at it twice. He is not a safe player. He brings heat, risk, and sudden madness to the table. At his peak, he had the kind of cash power that made people remember the story.',
      zh: 'The Gambling King 活得像每一个机会背后都有一个隐藏数字。牌、号码、风险、时机、机会，只要有一点概率味道，他就会闻到。只要有翻倍的可能，他就会多看两眼。他不是安全型玩家，他带来的是热度、风险和突然失控的疯狂。他巅峰的时候，有那种让人记得住故事的现金实力。',
    },
  },
  {
    id: 'pat',
    code: { en: 'The Reluctant Prince', zh: '不想继承的太子' },
    phrase: { en: 'Born with backup, choosing his own path', zh: '身有退路，心走己路' },
    tags: { en: 'Humble Prince / Self-Made Spirit / Low-Key Wealth / Gentle Player', zh: '低调太子 / 自立精神 / 隐形富贵 / 温和玩家' },
    intro: {
      en: 'The Reluctant Prince has the background, but not the attitude. He could have lived like someone who was born with a safety net, but he does not carry himself like that. He is kind, shy, and surprisingly humble. There is something funny about him: if he does not work hard, he might still have something to inherit. But instead of acting like a spoiled prince, he moves more like someone trying to prove he can stand on his own.',
      zh: 'The Reluctant Prince 有背景，但没有那种背景人的架子。他明明可以活得像一个天生有安全网的人，但他偏偏不是那种姿态。他善良、害羞，而且意外地谦虚。他最有趣的地方是，如果他不努力，可能真的要回去继承点什么。但他没有演成被宠坏的太子爷，反而更像一个想证明自己可以靠自己站起来的人。',
    },
  },
  {
    id: 'jq',
    code: { en: 'The Probability Breaker', zh: '小概率破坏者' },
    phrase: { en: 'Defies the odds, protects what matters', zh: '破开概率，护住所爱' },
    tags: { en: 'System Bug / Rare Event Magnet / Loyal Protector / Unpredictable Luck', zh: '系统漏洞 / 小概率磁铁 / 忠诚守护者 / 不可预测运气' },
    intro: {
      en: 'The Probability Breaker feels like a walking system bug. Things that rarely happen seem to happen around him. Strange timing, weird outcomes, unlikely situations. Somehow, probability bends when he enters the story. But behind the comedy of strange luck, there is a loyal side too. He is protective, dependable, and the kind of person who will stand firmly for the people he cares about.',
      zh: 'The Probability Breaker 像一个会走路的系统漏洞。很少发生的事情，好像总会在他附近发生。奇怪的时间点、离谱的结果、小概率的状况，只要他进入故事，概率好像就会开始弯掉。但在这些奇怪运气的喜剧感背后，他也有很忠诚的一面。他保护欲强，可靠，而且会为了自己在乎的人站稳。',
    },
  },
  {
    id: 'teik',
    code: { en: 'The Poker Professor', zh: '扑克教授' },
    phrase: { en: 'Long-term king, tested by downfall', zh: '长胜为王，败后见真' },
    tags: { en: 'Poker Master / Calm Thinker / Long-Term Winner / Fallen King', zh: '扑克高手 / 冷静思考者 / 长期赢家 / 低谷王者' },
    intro: {
      en: 'The Poker Professor is not built on noise. He is calm, steady, and hard to read. His strength is not luck, but patience, calculation, and long-term control. At his peak, he had a legendary record of not losing for years. But even kings meet their low points. And that is what makes his story better. Because the real question is not whether he once ruled the table. The real question is whether he can rise again.',
      zh: 'The Poker Professor 不是靠声音建立存在感的人。他冷静、沉稳，很难被看穿。他的强项不是运气，而是耐性、计算和长期控制。巅峰时期，他有过好几年没输钱的传奇记录。但再强的王，也会遇到低谷。而这反而让他的故事更好看。真正的问题不是他曾经有没有统治过牌桌，而是他跌下来之后，还能不能重新站起来。',
    },
  },
  {
    id: 'ed',
    code: { en: 'The Shameless Drifter', zh: '不要脸浪人' },
    phrase: { en: 'No job, no shame, full freedom', zh: '无业有道，骗酒成仙' },
    tags: { en: 'Free Spirit / Shameless Genius / Drink Hustler / Table Clown', zh: '自由灵魂 / 不要脸天才 / 骗酒高手 / 牌桌小丑' },
    intro: {
      en: 'The Shameless Drifter does not live by normal rules. While others chase money, status, and structure, he somehow turns freedom into a lifestyle. He has no serious title, no heavy image, and almost no shame. But that is exactly his power. He can turn a table into a stage, a drink into an opportunity, and a joke into survival. He may not look like a winner on paper. But somehow, people still envy the way he lives.',
      zh: 'The Shameless Drifter 不按普通规则生活。别人追钱、身份和稳定结构，他却 somehow 把自由活成了一种生活方式。他没有很正式的 title，没有沉重的人设，也几乎没有什么脸皮。但这正是他的力量。他可以把一张桌子变成舞台，把一杯酒变成机会，把一个笑话变成生存方式。他在纸面上看起来可能不像赢家，但偏偏有人会羡慕他那种活法。',
    },
  },
] as const;

const pokerStoryIntro = {
  en: 'Not a scoreboard. Just the nights worth remembering — a wedding, a brutal river, and a $5 side-pot that ended like a movie.',
  zh: '不是战绩榜，只是几个值得记住的夜晚——一场婚礼、一条狠 river，还有一局 5 块起手、像电影一样收尾的散钱平分。',
} as const;

const pokerStories = [
  {
    date: '2024-05-26',
    title: { en: 'Cap married Shield', zh: '团长娶了阿盾' },
    body: {
      en: 'Before any of this was a poker night, it was a wedding. Cap married Shield — the loudest loyalty and the steadiest calm, same name on the same day. Ever since, the crew has had a married couple at its center, and every game is really just an excuse to get the same people back to the same table.',
      zh: '在这群人变成牌局之前，先有了一场婚礼。团长娶了阿盾——最响的义气配最稳的安静，同一天签下同一个名字。从那以后，桌子正中央就坐着一对夫妻；说到底，后来每一场牌，都只是把同一群人重新喊回同一张桌的理由。',
    },
  },
  {
    date: '2026-05-28',
    title: { en: 'The river that turned twice', zh: 'river 上反转两次的那夜' },
    body: {
      en: 'All night the river belonged to Lucky — the last card kept saving him. Then the board gave him a straight, and he shoved all-in against Prince’s three Aces. For one second Lucky had won. Then the river paired the board and turned those Aces into a full house — the hand was lifted right out of his hands. By the end, Gambler, Lucky, and Prince each sat on their own stack: three players, one quiet stand-off. Closing scene — Drifter wandered over with $5, pulled Prince into a side-pot split, and walked away $40 up.',
      zh: '整晚的 river 都站在罩仔这边——最后一张牌总在救他。后来桌面给了他一个顺子，他直接 all-in 推向太子手里的三条 A。有那么一秒，罩仔已经赢了。然后 river 把桌面配成对子，把那三条 A 变成葫芦——到手的牌被生生抬走。到最后，赌仔、罩仔、太子各坐一摞筹码：三家鼎立，安静对峙。收尾一幕——浪子揣着 5 块钱晃过来，把太子拉进一局散钱平分，转身就多赚了 40 块。',
    },
  },
] as const;

export const PokerLegacyFullPage: React.FC<{
  homeHref: string;
  projectsHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, projectsHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const playUrl = 'https://poker.eden-tan.com/';
  const wikiHref = joinBasePath(baseUrl, 'wiki');

  return (
    <div className="page-shell etreport-page poker-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
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
            <p className="etreport-kicker mx-auto">{isZh ? 'Friday Poker Club' : 'Friday Poker Club'}</p>
            <h1 className="etreport-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '周五夜，还是那群人，现在装进一条链接里。' : 'Friday night, same crew, now in a link.'}
            </h1>
            <p className="etreport-subtitle mx-auto mt-5">
              {isZh
                ? '一张浏览器德州桌，做出来就是让我们这群人能一直打下去——没人需要当东道主、装软件，或者开车去谁家。筹码是假的，故事是真的。'
                : 'A browser poker table built so our crew can keep playing — nobody has to host, install anything, or drive to anyone’s place. The chips are fake. The stories are not.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href={playUrl} target="_blank" rel="noopener noreferrer" className="etreport-text-cta">
                {isZh ? '开一局' : 'Open a table'} <ExternalLink size={15} />
              </a>
              <a href="#avatar-guide" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '认识这群人' : 'Meet the crew'} <span aria-hidden>›</span>
              </a>
              <a href="#story" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '看桌上故事' : 'Read the stories'} <span aria-hidden>›</span>
              </a>
              <a href="#knowledge" className="etreport-text-cta etreport-text-cta-muted">
                {isZh ? '看知识库' : 'Open the knowledge base'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section id="how" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '怎么玩' : 'How it works'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '开个链接就能打，没那么多规矩。' : 'Open a link and play. No fuss.'}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {pokerValueProps.map((item) => (
                <article key={item.title.en} className="etreport-value-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title[language]}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="modules" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? '桌上能干嘛' : 'What you can do' }</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '真的德州，加一点乱来。' : 'Real Hold’em, plus a little chaos.'}
              </h2>
            </div>
            <div className="etreport-module-grid mt-12">
              {pokerModules.map((item) => (
                <article key={item.title} className="etreport-module-card">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy[language]}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="knowledge" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Knowledge base' : 'Knowledge base'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '这张牌桌，也是一组可复用 skills。' : 'This table is also a reusable skill archive.'}
              </h2>
              <p className="etreport-section-copy">
                {isZh
                  ? 'Friday Poker Club 不只是一条游戏链接。它把 Vite、背景音乐、按钮反馈、Firebase lifetime storage 和产品判断，沉淀成以后能继续复用的 skills。'
                  : 'Friday Poker Club is not only a game link. It turns Vite, background music, button feedback, Firebase lifetime storage, and product judgment into reusable skills for the wider knowledge base.'}
              </p>
            </div>
            <div className="poker-wiki-grid mt-12">
              {wikiEntries.map((entry) => (
                <a key={entry.slug} href={joinBasePath(baseUrl, `wiki/${entry.slug}`)} className={`poker-wiki-card ${getWikiToneClassName(entry.slug)}`}>
                  <WikiEntryVisual entry={entry} language={language} />
                  <span className="poker-wiki-eyebrow">{entry.eyebrow[language]}</span>
                  <h3 className="poker-wiki-card-title">{entry.title[language]}</h3>
                  <p>{entry.summary[language]}</p>
                  <span className="poker-wiki-link">{isZh ? '打开笔记' : 'Open note'} <span aria-hidden>›</span></span>
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-5">
              <a href={wikiHref} className="etreport-text-cta">
                {isZh ? '打开知识库总览' : 'Open knowledge index'} <span aria-hidden>›</span>
              </a>
            </div>
          </section>

          <section id="avatar-guide" className="etreport-section py-16 md:py-24">
            <div className="etreport-section-head">
              <p className="etreport-kicker">{isZh ? 'Avatar guide' : 'Avatar guide'}</p>
              <h2 className="etreport-section-title font-display font-bold tracking-tight">
                {isZh ? '坐在桌上的人，本身就是故事。' : 'The people at the table are the story.'}
              </h2>
              <p className="etreport-section-copy">{pokerAvatarGroupIntro[language]}</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {pokerAvatarGuide.map((item) => (
                <article key={item.id} className="poker-avatar-card">
                  <div className="poker-avatar-portrait">
                    <img
                      src={joinBasePath(baseUrl, `poker-avatars/${item.id}.png`)}
                      alt={`${item.code.en} — ${item.code.zh}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="poker-avatar-body">
                    <h3 className="poker-avatar-name">{item.code[language]}</h3>
                    <p className="poker-avatar-phrase">“{item.phrase[language]}”</p>
                    <p className="poker-avatar-tags">{item.tags[language]}</p>
                    <p className="poker-avatar-intro">{item.intro[language]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="story" className="etreport-section py-16 md:py-24">
            <div className="poker-story-panel">
              <div className="poker-story-head">
                <p className="etreport-kicker">{isZh ? 'Story log' : 'Story log'}</p>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {isZh ? '在这张桌上发生过的故事。' : 'Stories that happened at this table.'}
                </h2>
                <p className="poker-story-intro">{pokerStoryIntro[language]}</p>
              </div>
              <div className="poker-story-list">
                {pokerStories.map((item) => (
                  <article key={item.date} className="poker-story-item">
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
                {isZh ? '别光看了，开一局吧。' : 'Stop reading. Open a hand.'}
              </h2>
              <p>
                {isZh
                  ? 'poker.eden-tan.com 一点就进。单人桌秒开，公开桌等人到齐房主点开始。筹码是假的，赢了别太得意——故事才是真的。'
                  : 'poker.eden-tan.com, one click and you’re in. Solo tables start instantly, public ones start when the crew shows up. The chips are fake — don’t get too smug. The stories are what stick.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <a href={playUrl} target="_blank" rel="noopener noreferrer" className="etreport-text-cta">
                  {isZh ? '打开 poker.eden-tan.com' : 'Open poker.eden-tan.com'} <ExternalLink size={15} />
                </a>
                <a href={projectsHref} className="etreport-text-cta etreport-text-cta-muted">
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
