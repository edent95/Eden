import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CHAT_NAMES,
  DAILY_MESSAGE_LIMIT,
  MAX_MESSAGE_LENGTH,
  MIN_SEND_GAP_MS,
  applySend,
  chatNameFor,
  isChatName,
  sanitizeMessage,
} from '../../functions/home-chat-core.js';
import { DEFAULT_NAMES } from '../../functions/penney-mini-core.js';

test('chat names come from the local default name list and nothing else', () => {
  assert.deepEqual(CHAT_NAMES, DEFAULT_NAMES);
  assert.equal(isChatName('Ah Beng'), true);
  assert.equal(isChatName('Eden (admin)'), false);
  assert.equal(isChatName(42), false);
  assert.ok(CHAT_NAMES.includes(chatNameFor('ffffffff')));
  assert.ok(CHAT_NAMES.includes(chatNameFor('')));
});

test('messages are trimmed, stripped of control characters and capped', () => {
  assert.equal(sanitizeMessage('  hello\u0007 there  '), 'hello there');
  assert.equal(sanitizeMessage('a\n\n\n\nb'), 'a\n\nb');
  assert.equal(sanitizeMessage('x'.repeat(500)).length, MAX_MESSAGE_LENGTH);
  assert.equal(sanitizeMessage(null), '');
});

test('one IP sends at most one message per gap and a fixed number per day', () => {
  const now = 1_000_000;
  const first = applySend({ sender: null, currentDay: '2026-09-23', now });
  assert.equal(first.ok, true);
  assert.equal(first.next.sent, 1);

  const tooFast = applySend({ sender: first.next, currentDay: '2026-09-23', now: now + MIN_SEND_GAP_MS - 1 });
  assert.deepEqual(tooFast, { ok: false, reason: 'too-fast' });

  const full = { day: '2026-09-23', sent: DAILY_MESSAGE_LIMIT, lastAt: 0 };
  assert.deepEqual(applySend({ sender: full, currentDay: '2026-09-23', now }), { ok: false, reason: 'daily-limit-reached' });

  const nextDay = applySend({ sender: full, currentDay: '2026-09-24', now });
  assert.equal(nextDay.ok, true);
  assert.equal(nextDay.next.sent, 1);
});

test('a muted sender stays muted after sending', () => {
  const result = applySend({ sender: { muted: true }, currentDay: '2026-09-23', now: 1_000_000 });
  assert.equal(result.ok, true);
  assert.equal(result.next.muted, true);
});
