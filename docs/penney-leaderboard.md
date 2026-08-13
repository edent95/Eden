# Penney's Game — global leaderboard

`/penneys-game` ranked mode publishes scores to Firebase Realtime Database over
its **REST interface**. There is no `firebase` npm dependency and no extra bundle
weight: the whole client is `services/penneyLeaderboard.ts`, ~200 lines of `fetch`.

## Why REST instead of the SDK

This site is a static GitHub Pages build. Pulling in the Firebase SDK for one
route would add roughly 100 kB gzip to a bundle that every other route pays for.
The three endpoints below are all this feature needs.

| Step | Endpoint |
|---|---|
| anonymous sign-in | `POST identitytoolkit.googleapis.com/v1/accounts:signUp` |
| token refresh | `POST securetoken.googleapis.com/v1/token` |
| write a score | `PUT {databaseURL}/penneyLeaderboard/{uid}.json?auth={idToken}` |
| read the board | `GET {databaseURL}/penneyLeaderboard.json?orderBy="score"&limitToLast=20` |

The anonymous `uid` + refresh token are stored in `localStorage` so one browser
keeps one leaderboard row instead of creating a new one every visit.

## Configuration

Defaults point at the existing `poker-power-card-3abea` project (same owner,
separate database node, no overlap with the poker app's data). Override per
environment with:

```
VITE_PENNEY_FIREBASE_API_KEY=...
VITE_PENNEY_FIREBASE_DATABASE_URL=https://<project>-default-rtdb.<region>.firebasedatabase.app
```

Firebase web config values are public by design — the security boundary is the
database rules below, not the key.

## Required database rules

**This is the one step that has to be run by hand.** Until it is deployed, reads
return nothing and writes are rejected, and the page falls back to a local-only
board (it says so in the UI — it never breaks).

Add this node to `database.rules.json` in the Firebase project, alongside the
existing `users` / `rooms` / `roomSummaries` nodes:

```json
"penneyLeaderboard": {
  ".read": true,
  ".indexOn": ["score"],
  "$uid": {
    ".write": "auth != null && auth.uid === $uid && (!data.exists() || newData.child('score').val() > data.child('score').val())",
    ".validate": "newData.hasChildren(['name', 'score', 'streak', 'createdAt'])",
    "name": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 16" },
    "score": { ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 1000000" },
    "streak": { ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 1000" },
    "createdAt": { ".validate": "newData.isNumber()" },
    "$other": { ".validate": false }
  }
}
```

Then deploy from the repo that owns the rules file:

```bash
cd ../poker-power-card
firebase deploy --only database
```

What the rules buy:

- reads are public, writes require an anonymous identity
- one row per `uid`, and a `uid` can only write its own row
- a score can only ever be **raised**, so replaying a worse run cannot overwrite a better one
- name capped at 16 characters, score and streak range-checked, no extra keys accepted

Anonymous auth is already enabled in `poker-power-card-3abea` (the poker app uses
`signInAnonymously`), so no console change is needed there.

## Failure behaviour

Every network path is wrapped: an 8-second timeout, and any failure — unreachable,
rules not deployed yet, offline, private mode — drops to a `localStorage` board and
labels itself "local only" in the UI. The game never blocks on the network.
