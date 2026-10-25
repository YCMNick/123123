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
│   └── game/index.html         # standalone mini-game「差一度」(self-contained HTML, served at /123123/game/; unrelated to the repair app)
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

- **Game tests:** `npm run test:game` (all of `tests/game`, ~2 min; needs a
  Playwright Chromium: `npx playwright install chromium` on a fresh machine).
  `GAME_SIM_RUNS=100 npm run test:game` runs a shorter simulation (default 200 per difficulty × level × profile).
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

## Mini-game 差一度 (`public/game/index.html`)

- Self-contained HTML game, unrelated to the repair app. This file is the
  source of truth; the claude.ai artifact is published from it.
- Structure: `CHAPTERS` (10 big levels, 10 planned stages each) and `LEVELS`
  (currently the first stage of each chapter). An object may have `habit`
  (idle motion), `call` (creature sound when aligned), `link`, `trap`, or a
  non-zero `target` angle. Level `time` budgets were calibrated with the
  simulation; recalibrate rather than guess when changing a level.
- `DIFFS` defines three difficulties (看到會歪頭 / 忍不住伸手 / 不轉正睡不著):
  alignment tolerance, time multiplier, score multiplier and how much the
  loupe reveals. Best scores are stored per difficulty.
- `COMMENTS` holds the result lines: one narrator per chapter, five tiers
  (`far`/`close` for a lost round, `pass`/`good`/`perfect` by stars), at
  least two lines each. A new chapter needs its own entry (tests enforce it).
- `window.__chayidu` is the test hook (seeded RNG, manual clock, pure
  `computeScore`, state snapshot). `tests/game` depends on it: keep its API
  stable, or update the tests in the same change.
- Before and after any game change, run `npm run test:game`. A drifted
  baseline or a missed design target means the balance changed: decide on
  purpose whether to retune the game or the target in
  `tests/game/balance.config.js`.

## Notes for AI Assistants

- Keep this file in sync with the code. Run `npm run build` to verify before
  documenting commands.
- When changing the request data shape, update **all three** layers: the form
  (`RepairForm.jsx`), the data layer (`api.js` both modes), and the backend
  (`Code.gs` row columns + `listRequests`).
