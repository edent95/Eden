/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  CHAT_MAX_LENGTH,
  ChatSendError,
  loadChatName,
  pickChatName,
  saveChatName,
  sendChatMessage,
  subscribeChat,
  type ChatMessage,
} from '../services/homeChat';

export type HomeLiveChatProps = {
  isZh: boolean;
};

const timeLabel = (createdAt: number): string =>
  new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

/**
 * Floating orb in the corner; tapping it opens the anonymous visitor room.
 * The stream only connects after the first open, so idle visitors hold no
 * RTDB connection.
 */
const HomeLiveChat: React.FC<HomeLiveChatProps> = ({ isZh }) => {
  const t = React.useCallback((en: string, zh: string) => (isZh ? zh : en), [isZh]);
  const [open, setOpen] = React.useState(false);
  const [connected, setConnected] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [echoes, setEchoes] = React.useState<ChatMessage[]>([]);
  const [mine, setMine] = React.useState<Set<string>>(() => new Set());
  const [status, setStatus] = React.useState<'connecting' | 'live' | 'offline'>('connecting');
  const [name, setName] = React.useState('');
  const [draft, setDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [notice, setNotice] = React.useState('');
  const listRef = React.useRef<HTMLOListElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const orbRef = React.useRef<HTMLButtonElement>(null);
  const stickToBottom = React.useRef(true);

  React.useEffect(() => {
    if (open && !connected) setConnected(true);
  }, [open, connected]);

  React.useEffect(() => {
    if (!connected) return undefined;
    setName(loadChatName());
    return subscribeChat({ onMessages: setMessages, onStatus: setStatus });
  }, [connected]);

  React.useEffect(() => {
    if (!open) return undefined;
    stickToBottom.current = true;
    // Only jump into the input with a mouse; on phones that would throw the keyboard up on open.
    if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      orbRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const visible = React.useMemo(
    () => [...messages, ...echoes].sort((a, b) => a.createdAt - b.createdAt),
    [messages, echoes],
  );

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (open && list && stickToBottom.current) list.scrollTop = list.scrollHeight;
  }, [open, visible]);

  const onScroll = () => {
    const list = listRef.current;
    if (list) stickToBottom.current = list.scrollHeight - list.scrollTop - list.clientHeight < 48;
  };

  const rerollName = () => {
    const next = pickChatName(name);
    setName(next);
    saveChatName(next);
  };

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    setNotice('');
    try {
      const message = await sendChatMessage({ name, text });
      setMine((current) => new Set(current).add(message.id));
      if (message.id.startsWith('local-')) setEchoes((current) => [...current, message]);
      setDraft('');
      stickToBottom.current = true;
    } catch (error) {
      const reason = error instanceof ChatSendError ? error.message : '';
      setNotice(
        reason === 'too-fast'
          ? t('Slow down a little — one message every 5 seconds.', '慢慢来，5 秒一句。')
          : reason === 'daily-limit-reached'
            ? t('That’s your 60 messages for today. Back after midnight.', '今天 60 句讲完了，午夜后再来。')
            : t('Could not send. Check your connection and try again.', '发不出去，网络好像有问题，再试一次。'),
      );
    } finally {
      setSending(false);
    }
  };

  const statusLabel =
    status === 'live' ? t('Live', '在线') : status === 'connecting' ? t('Connecting', '连接中') : t('Offline', '断线');

  return (
    <div className={`eden-chat${open ? ' is-open' : ''}`}>
      <div
        className="eden-chat-panel"
        id="eden-chat-panel"
        role="dialog"
        aria-modal="false"
        aria-label={t('Anonymous live chat', '匿名留言板')}
      >
        <div className="eden-chat-head">
          <div>
            <strong>{t('Say something', '进来吹水')}</strong>
            <span className={`eden-chat-status is-${status}`}>{statusLabel}</span>
          </div>
          <p>{t('Anonymous. Messages stay seven days.', '匿名，不用登入。留言放七天。')}</p>
        </div>

        <ol className="eden-chat-list" ref={listRef} onScroll={onScroll} aria-live="polite" aria-label={t('Messages', '留言')}>
          {visible.length === 0 ? (
            <li className="eden-chat-empty">
              {status === 'offline'
                ? t('The room is unreachable right now.', '房间暂时连不上。')
                : t('Quiet in here. Be the first.', '还没人讲话，你先来。')}
            </li>
          ) : (
            visible.map((message) => (
              <li key={message.id} className={mine.has(message.id) ? 'is-mine' : undefined}>
                <div>
                  <strong>{message.name}</strong>
                  <time dateTime={new Date(message.createdAt).toISOString()}>{timeLabel(message.createdAt)}</time>
                </div>
                <p>{message.text}</p>
              </li>
            ))
          )}
        </ol>

        <form className="eden-chat-form" onSubmit={send}>
          <div className="eden-chat-identity">
            <span>
              {t('You are', '你是')} <strong>{name || '…'}</strong>
            </span>
            <button type="button" onClick={rerollName}>
              {t('New name', '换个名')}
            </button>
          </div>
          <div className="eden-chat-compose">
            <input
              ref={inputRef}
              value={draft}
              maxLength={CHAT_MAX_LENGTH}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={t('Leave a message…', '讲点什么…')}
              aria-label={t('Message', '留言内容')}
              enterKeyHint="send"
            />
            <button type="submit" disabled={sending || !draft.trim()}>
              {sending ? t('Sending', '发送中') : t('Send', '发送')}
            </button>
          </div>
          <p className="eden-chat-notice" role="status">
            {notice}
          </p>
        </form>
      </div>

      <button
        ref={orbRef}
        type="button"
        className="eden-chat-orb"
        aria-expanded={open}
        aria-controls="eden-chat-panel"
        aria-label={open ? t('Close chat', '关闭留言板') : t('Open anonymous chat', '打开匿名留言板')}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="eden-chat-orb-blob is-a" aria-hidden="true" />
        <span className="eden-chat-orb-blob is-b" aria-hidden="true" />
        <span className="eden-chat-orb-blob is-c" aria-hidden="true" />
        <span className="eden-chat-orb-glass" aria-hidden="true" />
        <span className="eden-chat-orb-close" aria-hidden="true" />
      </button>
    </div>
  );
};

export default HomeLiveChat;
