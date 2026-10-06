import React from 'react';
import {
  CHAT_MAX_LENGTH,
  chatSendNotice,
  loadChatName,
  openLiveChat,
  pickChatName,
  saveChatName,
  sendChatMessage,
  subscribeChat,
  type ChatMessage,
} from '../services/homeChat';

const PREVIEW_SIZE = 5;

const timeLabel = (createdAt: number): string =>
  new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

/**
 * Inline message board for a page. It is a window onto the same anonymous room as the
 * floating chat: a message sent here goes to that room, and the floating panel opens on it.
 * The stream only connects once the board scrolls near the viewport.
 */
export const ChatBoard: React.FC<{
  isZh: boolean;
  kicker: string;
  title: string;
  lead?: string;
  className?: string;
}> = ({ isZh, kicker, title, lead, className }) => {
  const t = (en: string, zh: string) => (isZh ? zh : en);
  const sectionRef = React.useRef<HTMLElement>(null);
  const [connected, setConnected] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [status, setStatus] = React.useState<'connecting' | 'live' | 'offline'>('connecting');
  const [name, setName] = React.useState('');
  const [draft, setDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [notice, setNotice] = React.useState('');

  React.useEffect(() => {
    setName(loadChatName());
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setConnected(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setConnected(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!connected) return undefined;
    return subscribeChat({ onMessages: setMessages, onStatus: setStatus });
  }, [connected]);

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
      setDraft('');
      openLiveChat(message);
    } catch (error) {
      setNotice(chatSendNotice(error, isZh));
    } finally {
      setSending(false);
    }
  };

  const preview = messages.slice(-PREVIEW_SIZE);

  return (
    <section ref={sectionRef} className={`eden-chat-board${className ? ` ${className}` : ''}`} aria-labelledby="eden-chat-board-title">
      <header className="eden-chat-board-head">
        <p className="eden-chat-board-kicker">{kicker}</p>
        <h2 id="eden-chat-board-title">{title}</h2>
        {lead ? <p className="eden-chat-board-lead">{lead}</p> : null}
      </header>

      <ol className="eden-chat-board-list" aria-live="polite" aria-label={t('Latest messages', '最新留言')}>
        {preview.length === 0 ? (
          <li className="eden-chat-board-empty">
            {status === 'offline'
              ? t('The room is unreachable right now.', '房间暂时连不上。')
              : status === 'connecting' && connected
                ? t('Loading messages…', '留言加载中…')
                : t('Quiet in here. Be the first.', '还没人讲话，你先来。')}
          </li>
        ) : (
          preview.map((message) => (
            <li key={message.id}>
              <div>
                <strong>{message.name}</strong>
                <time dateTime={new Date(message.createdAt).toISOString()}>{timeLabel(message.createdAt)}</time>
              </div>
              <p>{message.text}</p>
            </li>
          ))
        )}
      </ol>

      <form className="eden-chat-board-form" onSubmit={send}>
        <div className="eden-chat-board-identity">
          <span>
            {t('You are', '你是')} <strong>{name || '…'}</strong>
          </span>
          <button type="button" onClick={rerollName}>
            {t('New name', '换个名')}
          </button>
        </div>
        <div className="eden-chat-board-compose">
          <textarea
            value={draft}
            maxLength={CHAT_MAX_LENGTH}
            rows={2}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder={t('What did you see on the board?', '你在棋盘上看到了什么？')}
            aria-label={t('Message', '留言内容')}
          />
          <button type="submit" disabled={sending || !draft.trim()}>
            {sending ? t('Sending', '发送中') : t('Post', '留言')}
          </button>
        </div>
        <p className="eden-chat-board-notice" role="status">{notice}</p>
        <p className="eden-chat-board-foot">
          {t('Anonymous, kept seven days. Your message also appears in the chat bubble at the bottom right.', '匿名，留言放七天。发出后会同步到右下角的悬浮留言板。')}{' '}
          <button type="button" onClick={() => openLiveChat()}>
            {t('Open the full chat', '打开完整留言板')} ›
          </button>
        </p>
      </form>
    </section>
  );
};
