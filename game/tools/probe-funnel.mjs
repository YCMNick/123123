// First-session funnel: one simulated player keeps playing from stage 1-1, retrying after
// a loss (so the mercy bonus applies) and moving on after a win, until an attempt budget
// runs out. Reports how far players get and how long it takes, per difficulty.
//   node game/tools/probe-funnel.mjs [--players 100] [--attempts 25] [--stages 5]
import { launch, openGames, SIM_PAGES } from '../../tests/game/helpers/browser.js'
import { simulateInPage, pool } from '../../tests/game/helpers/sim.js'
import { PROFILES } from '../../tests/game/balance.config.js'

const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? Number(process.argv[i + 1]) : d }
const PLAYERS = arg('--players', 100), ATTEMPTS = arg('--attempts', 25), STAGES = arg('--stages', 5)
const OVERHEAD = 9 // seconds per attempt outside the clock: intro card, 3-2-1, result screen

const browser = await launch()
const { pages } = await openGames(browser, SIM_PAGES)
const jobs = []
for (const diff of ['normal', 'easy']) for (const who of ['novice', 'casual']) for (let p = 0; p < PLAYERS; p++) jobs.push({ diff, who, p })
const runs = await pool(pages, jobs, (page, j) => page.evaluate(simulateInPage, {
  levelIdx: 0, runs: ATTEMPTS, keepProgress: true, diff: j.diff, profile: PROFILES[j.who],
  gameSeed: 50_000 + j.p * 1000, playerSeed: 77 + j.p * 7919,
}))
await browser.close()

const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(p * s.length))] }
console.log(`${PLAYERS} players per cell · up to ${ATTEMPTS} attempts each · ${OVERHEAD}s overhead per attempt\n`)
console.log('difficulty  player   reach 1-2  reach 1-3  reach 1-5  fails before 1st win  minutes to clear 1-3 (median / p90)  attempts to clear 1-3 (median)')
jobs.forEach((j, k) => { j.r = runs[k] })
for (const diff of ['normal', 'easy']) for (const who of ['novice', 'casual']) {
  const ps = jobs.filter((j) => j.diff === diff && j.who === who)
  const reached = (s) => ps.filter((j) => j.r.some((a) => a.level >= s - 1)).length / ps.length
  const firstWin = ps.map((j) => { const i = j.r.findIndex((a) => a.win); return i < 0 ? ATTEMPTS : i })
  const to3 = ps.map((j) => { const i = j.r.findIndex((a) => a.win && a.level === 2); return i < 0 ? null : i + 1 }).filter((x) => x != null)
  const min3 = ps.map((j) => { const i = j.r.findIndex((a) => a.win && a.level === 2); if (i < 0) return null; return j.r.slice(0, i + 1).reduce((t, a) => t + (a.timeTotal - (a.win ? a.secsLeft : 0)) + OVERHEAD, 0) / 60 }).filter((x) => x != null)
  const f = (x) => (x * 100).toFixed(0).padStart(3) + '%'
  console.log(`${diff.padEnd(10)}  ${who.padEnd(7)}  ${f(reached(2))}       ${f(reached(3))}       ${f(reached(5))}       ${pct(firstWin, 0.5)} (p90 ${pct(firstWin, 0.9)})               ${min3.length ? `${pct(min3, 0.5).toFixed(1)} / ${pct(min3, 0.9).toFixed(1)}` : '—'}  (${(min3.length / ps.length * 100).toFixed(0)}% ever clear it)        ${to3.length ? pct(to3, 0.5) : '—'}`)
}
