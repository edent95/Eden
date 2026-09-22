/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Download } from 'lucide-react';
import { productSiblingCards } from '../app/product-siblings';
import { HeaderControls } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';
import { ProjectsPokerCssIcon } from '../components/css-art/index';
import ProductStorePage from '../components/ProductStorePage';

export const PokerFullPage: React.FC<{
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
  const playUrl = 'https://poker.eden-tan.com/';
  const installUrl = 'https://poker.eden-tan.com/?install=1';

  return (
    <ProductStorePage
      isZh={isZh}
      controls={<HeaderControls language={language} setLanguage={setLanguage} themePreference={themePreference} theme={theme} setThemePreference={setThemePreference} />}
      backHref={projectsHref}
      backLabel={{ en: 'Back home', zh: '返回主页' }}
      icon={<ProjectsPokerCssIcon label="Friday Poker Club CSS app icon" />}
      name="Friday Poker Club"
      kicker={{ en: 'Multiplayer game · Private table', zh: '多人游戏 · 私人牌局' }}
      tagline={{ en: 'No place to book. Just bring the crew back.', zh: '不用约地点。把那群人叫回来就好。' }}
      meta={{ en: 'Free · Play chips only · Runs in any browser', zh: '免费 · 只有娱乐筹码 · 浏览器直接开局' }}
      primary={{ href: playUrl, external: true, label: { en: 'Open a table', zh: '开一局' } }}
      secondary={{ href: installUrl, external: true, icon: <Download size={16} />, label: { en: 'Install app', zh: '安装 App' } }}
      quickLinks={[
        { href: '#overview', label: { en: 'Overview', zh: '产品简介' } },
        { href: '#faq', label: { en: 'FAQ', zh: '常见问题' } },
        { href: '#information', label: { en: 'Information', zh: '产品资料' } },
      ]}
      stage={{
        src: playUrl,
        domain: 'poker.eden-tan.com',
        title: { en: 'Interactive Friday Poker Club table', zh: 'Friday Poker Club 互动牌桌' },
        caption: { en: 'This is the real table, running right here. Open it in a new tab to bring the crew in.', zh: '这就是真的牌桌，直接跑在这里。想叫人来，就在新标签打开。' },
      }}
      body={[
        { kind: 'p', text: { en: 'Friday Poker Club started with a simple problem: we still wanted to play, but not every Friday came with a host, a place, or the patience to install another game app. So I built a browser table—open a room, send the link, take a seat.', zh: 'Friday Poker Club 起点很简单：我们还是想一起打牌，但不是每个周五都有人能提供地点，也不是每个人都想安装另一个游戏 App。于是我做了一张浏览器牌桌——开房、发链接、坐下，就可以开始。' } },
        { kind: 'p', text: { en: 'I did not build it as a poker platform chasing strangers. It is for people who already know one another. Realtime play is the structure; the reason to return is the jokes, mistakes, silences, and moments that become part of the group later.', zh: '我没有把它做成一个追求陌生人流量的扑克平台。它服务的是已经认识彼此的人。实时牌局只是结构；真正让人回来的是桌边的玩笑、失误、沉默和那些之后还会被提起的瞬间。' } },
        { kind: 'h', text: { en: 'How it works', zh: '怎么玩' } },
        { kind: 'steps', items: [
          { title: { en: 'Host', zh: '开房' }, text: { en: 'Choose the table and stakes, then create a private room.', zh: '选择桌型和盲注，建立一个私人房间。' } },
          { title: { en: 'Invite', zh: '邀请' }, text: { en: 'Send one link to the crew. Nothing to install.', zh: '把链接发给那群人，不需要安装。' } },
          { title: { en: 'Buy in', zh: '买入' }, text: { en: 'Choose the stack, take a seat, and wait for the host.', zh: '选好筹码坐下，等待房主开局。' } },
          { title: { en: 'Keep the story', zh: '继续故事' }, text: { en: 'Play the hand, then remember the moment worth retelling.', zh: '打完这一手，再把值得讲的瞬间留下。' } },
        ] },
        { kind: 'h', text: { en: 'Designed for private games', zh: '为熟人局做的选择' } },
        { kind: 'p', text: { en: 'You should not have to wait until everyone is free. Open a room and drop the link in the group. Late arrivals and reconnects get absorbed by the table instead of forcing the whole night to restart.', zh: '不用等到所有人都有空。开一个房间，把链接丢进群里。有人晚到、有人重连，牌桌都应该接得住，而不是整局重来。' } },
        { kind: 'p', text: { en: 'It should feel like a home game, not a casino. The host starts, friends buy in, and the table keeps the conversation alive. It has the rules a real game needs without the pressure mechanics designed to keep people betting.', zh: '它应该像熟人局，不像线上赌场。房主开桌、朋友买入、桌边聊天。界面保留真正需要的规则，但不加入催促下注或制造焦虑的机制。' } },
        { kind: 'callout', label: { en: 'Note', zh: '注意' }, text: { en: 'Every action should feel certain. A bet confirms, the turn is obvious, and the room says what it is waiting for. Fewer misunderstandings make a better night.', zh: '每个动作都要让人放心。下注有没有成功、现在轮到谁、房间在等什么，都用清楚的状态回应。少一次误会，牌局就顺一点。' } },
        { kind: 'p', text: { en: 'And it should remember the people, not only the cards. We do not need another leaderboard to flex. What deserves to stay is who said what, when the whole table laughed, and why everyone wants another game.', zh: '它记住的应该是人，不只是牌。我们不需要另一份战绩炫耀榜。真正值得保存的是谁说了什么、哪一刻全桌笑了，以及下一次为什么还想再来。' } },
        { kind: 'callout', tone: 'warning', label: { en: 'Play chips only', zh: '只有娱乐筹码' }, text: { en: 'Invite links control who enters, and the host decides when the game begins. Chips have no cash value, and there is no deposit or withdrawal. The system can remember table state without turning a night between friends into public performance or financial play.', zh: '邀请链接决定谁能进来，房主决定何时开桌。筹码没有现金价值，也没有充值或提现。系统可以记住牌局状态，但不应该把朋友之间的晚上变成公开表演或金钱交易。' } },
      ]}
      faq={[
        { q: { en: 'Do I need to install anything?', zh: '需要安装什么吗？' }, a: { en: 'No. It runs in any modern browser—open the link and take a seat. If you would rather have it on your home screen, the Install app button adds it as a standalone app.', zh: '不需要。它跑在任何现代浏览器里——打开链接就能坐下。如果你想放到主屏幕，点「安装 App」就会变成独立应用。' } },
        { q: { en: 'Is real money involved?', zh: '会牵涉真钱吗？' }, a: { en: 'Never. Chips are play chips with no cash value. There is no deposit, no withdrawal, and no payout of any kind.', zh: '完全不会。筹码是娱乐筹码，没有现金价值。没有充值、没有提现，也没有任何形式的派彩。' } },
        { q: { en: 'Can strangers find my table?', zh: '陌生人会找到我的牌桌吗？' }, a: { en: 'No. Rooms are private and reachable only through the invite link you send. The host still decides when the hand actually begins.', zh: '不会。房间是私人的，只能通过你发出的邀请链接进入。何时真正开牌，仍然由房主决定。' } },
        { q: { en: 'What happens if someone loses connection?', zh: '有人断线了会怎样？' }, a: { en: 'The table keeps its state. A player who drops can reopen the link and return to the same seat and stack instead of restarting the night.', zh: '牌桌会保留状态。掉线的人重新打开链接，就能回到原来的座位和筹码，而不是整晚重来。' } },
        { q: { en: 'Is there voice chat?', zh: '有语音吗？' }, a: { en: 'Voice is optional. Some nights the group talks the whole way through; some nights nobody turns it on. The table works either way.', zh: '语音是可选的。有些晚上大家一路在聊，有些晚上没人开。牌桌两种情况都能用。' } },
        { q: { en: 'What is it built with?', zh: '用什么做的？' }, a: { en: 'A responsive browser table with Firebase keeping seats, actions, and reconnects in sync. There are build notes in the wiki if you want the details.', zh: '一张响应式浏览器牌桌，用 Firebase 让座位、动作和重连保持同步。想看细节的话，wiki 里有开发笔记。' } },
      ]}
      specs={[
        [{ en: 'Category', zh: '类别' }, { en: 'Private multiplayer game', zh: '私人多人游戏' }],
        [{ en: 'Game', zh: '游戏' }, { en: 'Texas Hold’em · 8/9 mini game', zh: 'Texas Hold’em · 8/9 小游戏' }],
        [{ en: 'Modules', zh: '主要模块' }, { en: 'Rooms · Invites · Buy-ins · Realtime table · Optional voice', zh: '房间 · 邀请 · 买入 · 实时牌桌 · 可选语音' }],
        [{ en: 'Realtime', zh: '同步' }, { en: 'Firebase', zh: 'Firebase' }],
        [{ en: 'Platform', zh: '平台' }, { en: 'Responsive browser table', zh: '响应式浏览器牌桌' }],
        [{ en: 'Developer', zh: '开发者' }, { en: 'Eden Tan', zh: 'Eden Tan' }],
      ]}
      also={productSiblingCards(baseUrl, 'poker')}
    />
  );
};
