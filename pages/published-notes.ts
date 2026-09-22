/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { siteEssayNotes } from '../generated/content';

export const publishedNotes = [
  ...siteEssayNotes.map((note) => ({
    title: note.title,
    summary: note.summary,
    category: note.category,
    href: `notes/${note.slug}`,
  })),
  {
    title: { en: 'Button feedback is part of the system', zh: '按钮反馈，本来就是系统的一部分' },
    summary: {
      en: 'Pressed, pending, accepted, blocked, and failed: what a realtime interface needs to say after a click.',
      zh: '按下、等待、接受、阻挡与失败：一个 realtime interface 在 click 之后应该说清楚什么。',
    },
    category: { en: 'Interaction', zh: '交互' },
    href: 'wiki/button-feedback',
  },
  {
    title: { en: 'Background music changes the room', zh: 'Background music 会改变一个房间' },
    summary: {
      en: 'Why optional sound can make a browser poker table feel shared, present, and alive.',
      zh: '为什么可控的声音，会让 browser poker table 更像一个大家真的在场的空间。',
    },
    category: { en: 'Experience', zh: '体验' },
    href: 'wiki/background-music',
  },
  {
    title: { en: 'Firebase as durable table memory', zh: '用 Firebase 留住牌桌的记忆' },
    summary: {
      en: 'Rooms, reconnects, public games, and cleanup logic behind a table that needs to remember.',
      zh: '房间、重连、公开游戏与 cleanup logic：一张需要记得事情的牌桌，是怎样被搭起来的。',
    },
    category: { en: 'Build note', zh: '构建笔记' },
    href: 'wiki/firebase-lifetime-storage',
  },
  {
    title: { en: 'The Vite skills that survived the build', zh: '真正留到最后的 Vite skills' },
    summary: {
      en: 'A practical release loop covering local development, routes, assets, environment values, and production checks.',
      zh: '从 local development、routes、assets、environment values 到 production checks 的实用 release loop。',
    },
    category: { en: 'Engineering', zh: '工程' },
    href: 'wiki/vite',
  },
];
