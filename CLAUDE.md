# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and other AI assistants when working with code in this repository.

## Project Overview

A **mobile-first property repair-request system (房屋報修系統)** for tenants,
built with **React 18 + Vite**. Tenants open a web page, pick their name from a
list, attach photos, choose a category/urgency, describe the problem, and submit.
The landlord receives an Email and manages each request's status in an admin
dashboard. UI is in Traditional Chinese.

There is **no traditional backend**. The backend is a **Google Apps Script** Web
App bound to a Google Sheet (`google-apps-script/Code.gs`): it appends rows to the
sheet, saves photos to Google Drive, emails the landlord, and serves list/status
APIs. When `ENDPOINT_URL` is not configured, the app falls back to a **Demo mode**
that persists to `localStorage` so it runs without any backend.

## Tech Stack

- **React 18** (function components + hooks, no router library — hash-based routing)
- **Vite 6** (dev server + production bundler)
- Plain CSS, single mobile-first stylesheet (`src/index.css`, max-width 480px)
- Backend: **Google Apps Script** + **Google Sheets** + **Google Drive** (no server)

## Repository Structure

```
.
├── index.html                  # Vite entry HTML
├── public/
│   └── game/index.html         # mini-game「差一度」, BUILT from game/ (self-contained HTML, served at /123123/game/; unrelated to the repair app)
├── game/                       # 差一度 sources: core.html (engine/UI/sound), chapters/*.js (one per world), build + tools
├── vite.config.js              # Vite config (React plugin)
├── package.json                # scripts + dependencies
├── README.md                   # user-facing setup guide (中文)
├── engineering/                # Claude Code subagent definitions (see "AI Agents")
│   ├── frontend-developer.md
│   ├── apps-script-backend-developer.md
│   ├── code-reviewer.md
│   └── qa-tester.md
├── scripts/
│   └── install.sh              # copies agent .md files into ~/.claude/agents/
├── tests/game/                 # 差一度 automated tests + balance simulation (Vitest + Playwright)
├── vitest.config.js
├── src/
│   ├── main.jsx                # React entry
│   ├── config.js               # ⭐ all user-editable settings live here
│   ├── api.js                  # data layer: Apps Script fetch OR localStorage demo
│   ├── App.jsx                 # hash routing (#/ form, #/admin dashboard) + demo banner
│   └── pages/
│       ├── RepairForm.jsx      # tenant-facing repair form
│       └── AdminDashboard.jsx  # landlord dashboard (passcode-gated, status mgmt)
└── google-apps-script/
    ├── Code.gs                 # backend: doPost/doGet, sheet, Drive, email
    └── README.md               # backend deployment guide (中文)
```

## Development Workflow

- **Install:** `npm install`
- **Dev server:** `npm run dev` (http://localhost:5173, hot reload)
- **Build:** `npm run build` (outputs to `dist/`, static files)
- **Preview build:** `npm run preview`
- **Lint:** `npm run lint`
- **Install AI agents:** `./scripts/install.sh --tool claude-code`
  (`--scope project` writes to `.claude/agents/` instead of `~/.claude/agents/`;
  `--dry-run` previews; `--category engineering` installs one category)

- **Game build:** `npm run build:game` assembles `public/game/index.html` from `game/`.
- **Check one world:** `npm run check:world -- <world-key> [--stage N]` (rules + contact sheet in `test-results/chapters/`).
- **Game tests:** `npm run test:game` (builds first, then all of `tests/game`; needs a
  Playwright Chromium: `npx playwright install chromium` on a fresh machine).
  `GAME_SIM_RUNS=30 npm run test:game` runs a shorter simulation (default 60 per difficulty × level × profile);
  `GAME_SIM_PAGES` sets how many games simulate in parallel.
- **Calibrate stage times:** `node game/tools/calibrate.mjs` (new stages only; `--world <key>` or `--levels a,b` to redo some) writes `game/times.json`.
- **Game balance baseline:** `npm run test:game:baseline` rewrites
  `tests/game/baseline.json`. Run it only after deciding a balance change is
  intended. The readable report lands in `test-results/game-sim/report.md`.

The repair app itself has no tests yet; add them with Vitest under `tests/`.

## Key Architecture Notes

- **`src/config.js` is the single source of truth** for user configuration:
  `ENDPOINT_URL`, `TENANTS` (name → unit/phone), `CATEGORIES`, `URGENCIES`,
  `STATUSES`, `ADMIN_PASSCODE`, `MAX_PHOTOS`. Prefer adding new tunables here
  rather than hard-coding them in components.
- **`src/api.js` is the only place that talks to storage.** It branches on
  `isDemoMode` (true when `ENDPOINT_URL` is empty). `submitRequest`,
  `fetchRequests`, and `updateStatus` each have a localStorage path and an Apps
  Script `fetch` path. Keep both paths in sync when changing the data shape.
- **Request data shape:** `{ id, createdAt, status, tenantName, unit, phone,
  category, urgency, urgencyLabel, description, preferredTime, photos }`. Photos
  are base64 data URLs on submit; the Apps Script converts them to Drive links,
  so the admin view handles both string URLs and `{dataUrl}` objects.
- **CORS:** POSTs to Apps Script use `Content-Type: text/plain` deliberately to
  avoid a CORS preflight. Do not change this to `application/json`.
- **Routing** is hash-based in `App.jsx` (`#/admin` → dashboard). No router dep.
- **Apps Script changes** only take effect after redeploying a *new version* — note
  this whenever you edit `Code.gs`.

## Conventions

- Function components + hooks only; keep components focused on rendering and put
  data logic in `api.js` or `config.js`.
- Update state immutably (`map`/`filter`/spread).
- User-facing text is Traditional Chinese.
- Style with the CSS custom properties in `:root` (`--accent`, `--danger`, etc.)
  rather than hard-coding colors. Layout is constrained to a phone width.

## AI Agents

- Subagent definitions live in category folders at the repo root (currently
  only `engineering/`). Each file is Markdown with YAML frontmatter
  (`name`, `description`, optional `tools`) followed by the system prompt, the
  format Claude Code expects in `~/.claude/agents/` or `.claude/agents/`.
- `scripts/install.sh` discovers every top-level folder containing such files
  and copies them to the chosen destination. Manual install also works:
  `cp engineering/*.md ~/.claude/agents/`.
- Available agents: `frontend-developer` (React/Vite UI),
  `apps-script-backend-developer` (`Code.gs` + Apps Script path of `api.js`),
  `code-reviewer` (read-only review against these conventions), `qa-tester`
  (Demo-mode walkthrough, Vitest setup).
- When adding an agent, keep its rules consistent with this file; when this
  file changes a convention, update the affected agent prompts too.

## Git & Branching

- Default branch: `claude/claude-md-docs-uwchm6` (pushes here auto-deploy to GitHub Pages). Create feature branches off it.
- Push with `git push -u origin <branch-name>`.
- Do not push to the default branch or open a PR without explicit permission.

## Mini-game 差一度 / Just One Degree (`game/` → `public/game/index.html`)

- Unrelated to the repair app. Sources live in `game/`; `public/game/index.html`
  is a build output (`npm run build:game`): never edit it by hand. The claude.ai
  artifact is published from the built file.
- `game/core.html`: engine, UI, sounds (`QS`), music, settings, test hook, with
  two build markers (`/*@@CHAPTERS@@*/`, `/*@@TIMES@@*/`).
  `game/chapters/NN-key.js`: one world each (art + `defineChapter({...})`); the
  build wraps each in its own scope. `game/times.json`: calibrated time per stage.
  `game/CHAPTERS.md` is the authoring guide (stage/object format, difficulty ramp,
  sounds, text rules); `game/tools/check-chapter.mjs` checks a world.
- 10 worlds × 10 stages. `LEVELS` is every stage in order (`chapter`, `stage`).
  Stage keys are unique across the game; best scores are stored per difficulty and
  stage key. An object may have `habit` (idle motion), `call` (creature sound when
  aligned), `sfx` (thing sound), `link`, `trap` (+`keep`, `trapNote`), `near`, or a
  non-zero `target`.
- Language: every player-facing string is `{ zh, en }`; UI strings live in `UI`
  (`U(key)`), canvas text uses `T('中文', 'English')` (or `LOCAL()` for real local
  signs). The language, music, sound-effect and zen (no clock) switches are
  stored per device.
- New-player protection: a first-launch difficulty question (easy suggested),
  stages 1-1 to 1-3 are practice (`PRACTICE_STAGES`, double time; the calibrator
  keeps their base time), two losses on a stage offer easy on the result screen,
  objects still off light up after 8 s without progress (`STALL_MS`).
- Input: a slow finger turns at ¼ gain (`FINE_GAIN`, a precision mode, not a
  snap); holding a 0.1° button speeds up. `game/tools/probe-touch.mjs` has the
  numbers behind this; `probe-funnel.mjs` plays a first session with retries.
- Store: the game needs no account (progress stays on the device).
  `game/store.config.json` (git-ignored, see the `.example`) sets the unlock
  rules: `freeAll` is true for the web build; the app build locks everything
  beyond world 1 and each world's first stage behind `window.Store.buy()` /
  `window.Ads.rewarded()`, which the iOS shell provides. See `game/STORE.md`.
- `DIFFS` defines three difficulties (看到會歪頭 Head Tilter / 忍不住伸手 Itchy
  Fingers / 不轉正睡不著 Sleepless Till Straight): tolerance, time multiplier,
  score multiplier and how much the loupe reveals.
- `QS` is the Q-style sound library (sine + soft overtone, glides, vibrato);
  worlds can add sounds with `defineCreatureSound` / `defineThingSound` (keys
  prefixed with the world key). Tests render every sound offline.
- Each world has one narrator with five comment tiers (`far`/`close` for a lost
  round, `pass`/`good`/`perfect` by stars), at least two bilingual lines each.
- `window.__chayidu` is the test hook (seeded RNG, manual clock, pure
  `computeScore`, `scene()` pictures, state snapshot). `tests/game` and the tools
  depend on it: keep its API stable, or update them in the same change.
- Before and after any game change, run `npm run test:game`. A drifted
  baseline or a missed design target means the balance changed: recalibrate
  (`game/tools/calibrate.mjs`) or change the target in
  `tests/game/balance.config.js` on purpose, then `npm run test:game:baseline`.

## Notes for AI Assistants

- Keep this file in sync with the code. Run `npm run build` to verify before
  documenting commands.
- When changing the request data shape, update **all three** layers: the form
  (`RepairForm.jsx`), the data layer (`api.js` both modes), and the backend
  (`Code.gs` row columns + `listRequests`).
