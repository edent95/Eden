# Mini Coin Slot — daily IP arena

The homepage `/#penney` is a discovery-first public mini game. It intentionally
does not publish the Penney response rule, optimal odds, or strategy copy.
Visitors see tickets, flips, outcomes, their own long-term win rate, and a shared
leaderboard. The people who notice the pattern have discovered it from evidence.

## Product contract

- One spin costs one credit.
- One public IP receives 100 credits per Malaysia calendar day.
- Credits refill at `00:00 Asia/Kuala_Lumpur`; lifetime plays and wins remain.
- A visitor must finish 10 rounds before appearing on the public leaderboard.
- The board ranks by win rate, then wins, then total plays.
- A shared NAT means a household or office intentionally shares one quota and one record.

## Trust boundary

The React client never decides whether a round was won and never writes leaderboard
data directly. It sends only a three-coin ticket and a display name to the HTTPS
function. `penneyMiniApi` then:

1. reads the client address from the Cloud Functions forwarded request;
2. derives an HMAC-SHA256 player ID with the `PENNEY_IP_SALT` Secret Manager value;
3. generates the house ticket and coin stream on the server;
4. commits credits, plays, wins, win rate, name, and timestamp in one RTDB transaction;
5. returns the public player state and the top 20 qualified entries.

Raw IP addresses are never stored. The database node is `penneyMiniPlayers`; existing
Firebase rules deny public reads and writes at this unlisted node, while the Admin SDK
inside the function owns access.

This is a practical public-IP quota, not identity verification. A determined attacker
can change networks or use proxies. The purpose is to make the daily arena fair for
normal visitors without requiring accounts or collecting email addresses.

## Source map

| Source | Responsibility |
|---|---|
| `functions/index.js` | HTTPS endpoint, IP HMAC, RTDB transaction, CORS |
| `functions/penney-mini-core.js` | daily quota, server round, ranking pure logic |
| `services/penneyMini.ts` | typed browser API client |
| `components/HomePenneyGame.tsx` | mini slot UI and flip reveal |
| `styles/pages/home.css` | homepage arena and compact leaderboard layout |
| `tests/unit/penney-mini.test.ts` | day boundary, quota, outcome and ranking contracts |

## Runtime and deploy

- Firebase project: `eden-tan`
- Region: `asia-southeast1`
- Runtime: Node.js 22, Cloud Functions v2
- Function: `penneyMiniApi`
- Endpoint: `https://asia-southeast1-eden-tan.cloudfunctions.net/penneyMiniApi`
- Allowed browser origins: `https://eden-tan.com`, `https://www.eden-tan.com`, the transitional legacy origins `https://edentan.site` / `https://www.edentan.site`, and local port `4180`

The HMAC salt is stored in the `eden-tan` project's Secret Manager. Never write it
to the repository. Preserving this secret during migration keeps existing visitor
HMAC identifiers stable without exposing or storing raw IP addresses.

```bash
npm install --prefix functions
npm run functions:check
npm run functions:deploy
```

After deployment, verify without consuming a credit:

```bash
curl -H 'Origin: https://eden-tan.com' \
  https://asia-southeast1-eden-tan.cloudfunctions.net/penneyMiniApi
```

A successful response reports `credits: 100` for a new IP and includes the public
leaderboard. A `POST` consumes a real production credit and creates or updates a row,
so use it deliberately and remove any QA-only record after testing.

The current Firebase dependency tree has a transitive moderate `uuid` advisory through
the Admin SDK's unused Cloud Storage dependency. The mini API does not call UUID or
Cloud Storage code. Recheck `npm audit --prefix functions --omit=dev` when Firebase
publishes a compatible dependency update; do not downgrade the Admin SDK to satisfy
the audit tool's incorrect suggested fix.
