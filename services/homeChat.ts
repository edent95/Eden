/**
 * Homepage live chat.
 *
 *   listen  EventSource {databaseURL}/homeChatMessages.json  (RTDB REST streaming, public read)
 *   send    POST homeChatApi  { name, text }                  (IP-HMAC throttle, server-side validation)
 *
 * No Firebase SDK: reads stream straight from the REST interface, and writes
 * only go through the function, so the static client never writes the room.
 */
import { CHAT_NAMES, MAX_MESSAGE_LENGTH } from '../functions/home-chat-core.js';

const CHAT_API_URL = (
  (import.meta.env.VITE_HOME_CHAT_API_URL as string | undefined) ??
  'https://asia-southeast1-eden-tan.cloudfunctions.net/homeChatApi'
).replace(/\/$/, '');

const CHAT_DATABASE_URL = (
  (import.meta.env.VITE_PENNEY_FIREBASE_DATABASE_URL as string | undefined) ??
  'https://eden-tan-default-rtdb.asia-southeast1.firebasedatabase.app'
).replace(/\/$/, '');

const CHAT_NODE = 'homeChatMessages';
const CHAT_NAME_KEY = 'eden.home.chat.name.v1';
// A cold homeChatApi instance took ~9s (once >15s) to answer the first send after idling.
const REQUEST_TIMEOUT_MS = 25_000;

export const CHAT_HISTORY_SIZE = 40;
export const CHAT_MAX_LENGTH: number = MAX_MESSAGE_LENGTH;
export const chatNames: readonly string[] = CHAT_NAMES;

export type ChatMessage = {
  id: string;
  name: string;
  text: string;
  createdAt: number;
};

export class ChatSendError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ChatSendError';
    this.status = status;
  }
}

const isMessage = (value: unknown): value is Omit<ChatMessage, 'id'> => {
  if (!value || typeof value !== 'object') return false;
  const source = value as Record<string, unknown>;
  return typeof source.name === 'string' && typeof source.text === 'string' && typeof source.createdAt === 'number';
};

export const pickChatName = (exclude?: string): string => {
  const pool = chatNames.filter((name) => name !== exclude);
  return pool[Math.floor(Math.random() * pool.length)] ?? chatNames[0];
};

/** The chat name lives under its own key; the Mini Coin Slot board name is never read here. */
export const loadChatName = (): string => {
  try {
    const stored = window.localStorage.getItem(CHAT_NAME_KEY);
    if (stored && chatNames.includes(stored)) return stored;
  } catch {
    /* Private mode: a fresh name per visit is fine. */
  }
  const name = pickChatName();
  saveChatName(name);
  return name;
};

export const saveChatName = (name: string): void => {
  try {
    window.localStorage.setItem(CHAT_NAME_KEY, name);
  } catch {
    /* Non-fatal. */
  }
};

type StreamHandlers = {
  onMessages: (messages: ChatMessage[]) => void;
  onStatus: (status: 'live' | 'offline') => void;
};

/**
 * Streams the latest messages. RTDB sends one `put` at path `/` with the whole
 * window, then `put`/`patch` events per child as messages arrive or age out.
 */
export const subscribeChat = ({ onMessages, onStatus }: StreamHandlers): (() => void) => {
  const query = new URLSearchParams({ orderBy: '"$key"', limitToLast: String(CHAT_HISTORY_SIZE) });
  const source = new EventSource(`${CHAT_DATABASE_URL}/${CHAT_NODE}.json?${query.toString()}`);
  const byId = new Map<string, ChatMessage>();

  const setChild = (id: string, value: unknown) => {
    if (isMessage(value)) byId.set(id, { id, name: value.name, text: value.text, createdAt: value.createdAt });
    else byId.delete(id);
  };

  const emit = () => {
    onMessages([...byId.values()].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)).slice(-CHAT_HISTORY_SIZE));
  };

  const apply = (event: MessageEvent<string>, replace: boolean) => {
    let payload: { path?: string; data?: unknown } | null = null;
    try {
      payload = JSON.parse(event.data);
    } catch {
      return;
    }
    if (!payload || typeof payload.path !== 'string') return;
    const path = payload.path.replace(/^\/+/, '');

    if (!path) {
      if (replace) byId.clear();
      const data = payload.data && typeof payload.data === 'object' ? (payload.data as Record<string, unknown>) : {};
      for (const [id, value] of Object.entries(data)) setChild(id, value);
    } else if (!path.includes('/')) {
      setChild(path, payload.data);
    } else {
      return;
    }
    onStatus('live');
    emit();
  };

  source.addEventListener('put', (event) => apply(event as MessageEvent<string>, true));
  source.addEventListener('patch', (event) => apply(event as MessageEvent<string>, false));
  source.addEventListener('cancel', () => onStatus('offline'));
  source.addEventListener('auth_revoked', () => onStatus('offline'));
  source.onerror = () => onStatus('offline');

  return () => source.close();
};

export const sendChatMessage = async (input: { name: string; text: string }): Promise<ChatMessage> => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
    const payload = (await response.json().catch(() => null)) as { message?: ChatMessage; error?: string } | null;
    if (!response.ok || !payload?.message) {
      throw new ChatSendError(payload?.error ?? `request-failed-${response.status}`, response.status);
    }
    return payload.message;
  } catch (error) {
    if (error instanceof ChatSendError) throw error;
    throw new ChatSendError('network-error', 0);
  } finally {
    window.clearTimeout(timeout);
  }
};
