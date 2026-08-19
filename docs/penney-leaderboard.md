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

Defaults point at the dedicated `eden-tan` Firebase project. Eden website data
must not be placed in sibling product projects. Override per environment with:

```
VITE_PENNEY_FIREBASE_API_KEY=...
VITE_PENNEY_FIREBASE_DATABASE_URL=https://<project>-default-rtdb.<region>.firebasedatabase.app
```

Firebase web config values are public by design — the security boundary is the
database rules below, not the key.

## Database rules

The production rules are tracked in this repository's `database.rules.json`.
The leaderboard node is public to read, while writes require an anonymous user:

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

Deploy from this repository:

```bash
firebase deploy --only database --project eden-tan
```

What the rules buy:

- reads are public, writes require an anonymous identity
- one row per `uid`, and a `uid` can only write its own row
- a score can only ever be **raised**, so replaying a worse run cannot overwrite a better one
- name capped at 16 characters, score and streak range-checked, no extra keys accepted

Anonymous Authentication must remain enabled in the `eden-tan` Firebase project.
The browser identity belongs only to this website and is not shared with Poker.

## Failure behaviour

Every network path is wrapped: an 8-second timeout, and any failure — unreachable,
rules not deployed yet, offline, private mode — drops to a `localStorage` board and
labels itself "local only" in the UI. The game never blocks on the network.
