# Site live chat — anonymous visitor room

Every page has a floating Siri-like orb in the bottom-right corner (`components/HomeLiveChat.tsx`,
styles in `styles/pages/live-chat.css`). It is mounted once in `index.tsx`, beside `App`, so it
follows every route; it reads the page language from `<html lang>`, which `seo.ts` keeps in sync.
Tapping it opens a small anonymous chat panel; Escape or the orb again closes it. The RTDB stream
only connects after the first open.

## Inline boards

`components/ChatBoard.tsx` is a page section onto the same room (currently on
`/conways-game-of-life`): the latest five messages, the visitor's chat name, and a composer. A message
posted there goes through the same `homeChatApi`, then `openLiveChat(message)` (a window event in
`services/homeChat.ts`) opens the floating panel with that message marked as the visitor's own. The
board's stream only connects once it scrolls near the viewport. No backend change: messages carry no
page field, so the room does not show which page a note came from.

## Product contract

- No sign-in and no free-text names. A visitor speaks as one of the everyday Malaysian names in
  `DEFAULT_NAMES` (`functions/penney-mini-core.js`, re-exported as `CHAT_NAMES` from
  `functions/home-chat-core.js`). "换个名 / New name" rerolls it.
- The chat name is **separate from the arena board name**: it is stored under
  `eden.home.chat.name.v1` (the arena uses `eden.penney.mini.name.v1`) and picked at random, not from
  the arena's IP hash. The server's fallback name uses a `chat:`-prefixed HMAC, so even that differs.
- Messages: 1–200 characters, one per 5 seconds, 60 per Malaysia day per public IP.
- Messages older than 7 days are pruned whenever someone sends.

## Data flow

- **Read:** the browser opens an `EventSource` on the RTDB REST stream
  `homeChatMessages.json?orderBy="$key"&limitToLast=40`. `homeChatMessages` is the only public-read
  node for the chat; messages hold `name`, `text`, `createdAt` and nothing identifying.
- **Write:** `POST homeChatApi { name, text }` (Firebase Functions v2, `asia-southeast1`). The function
  validates the name against the list, sanitizes the text, runs the throttle transaction on
  `homeChatSenders/<chat HMAC>` (private), then pushes the message. The client never writes RTDB.

## Moderation

- Delete a message: remove `homeChatMessages/<id>` in the Firebase console; open tabs drop it live.
- Mute a sender: find their row in `homeChatSenders` and set `muted: true`. They still see their own
  message echoed back, but nothing reaches the room. `applySend` carries the flag forward.

## Deploy

Rules and the new function must both ship before the room works: `npm run firebase:deploy`.
Until then the panel shows "断线 / Offline" (public read is denied by the current rules).
