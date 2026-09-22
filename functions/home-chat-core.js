import { DEFAULT_NAMES } from './penney-mini-core.js';

/**
 * Homepage live chat. Anonymous: a visitor only ever speaks as one of the
 * everyday Malaysian names, never as free text, and the chat name is chosen
 * and stored apart from the Mini Coin Slot board name.
 */
export const CHAT_NAMES = DEFAULT_NAMES;
export const MAX_MESSAGE_LENGTH = 200;
export const MIN_SEND_GAP_MS = 5_000;
export const DAILY_MESSAGE_LIMIT = 60;
export const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;

export const isChatName = (value) => typeof value === 'string' && CHAT_NAMES.includes(value);

/** A chat name derived from the chat-specific hash, so it is not the arena default. */
export const chatNameFor = (chatId) => {
  const seed = Number.parseInt(String(chatId ?? '').slice(0, 8), 16);
  return CHAT_NAMES[(Number.isFinite(seed) ? seed : 0) % CHAT_NAMES.length];
};

export const sanitizeMessage = (value) =>
  String(value ?? '')
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);

/**
 * Transaction body for the per-IP throttle row. Returns the next row, or null
 * with no change when the visitor is sending too fast or is out of messages.
 */
export const applySend = ({ sender, currentDay, now }) => {
  const source = sender && typeof sender === 'object' ? sender : {};
  const lastAt = Math.max(0, Math.floor(Number(source.lastAt) || 0));
  const sentToday = source.day === currentDay ? Math.max(0, Math.floor(Number(source.sent) || 0)) : 0;
  if (now - lastAt < MIN_SEND_GAP_MS) return { ok: false, reason: 'too-fast' };
  if (sentToday >= DAILY_MESSAGE_LIMIT) return { ok: false, reason: 'daily-limit-reached' };
  return {
    ok: true,
    next: {
      day: currentDay,
      sent: sentToday + 1,
      lastAt: now,
      ...(source.muted === true ? { muted: true } : {}),
    },
  };
};
