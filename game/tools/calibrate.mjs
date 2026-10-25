// Calibrates each stage's time budget by simulation and writes game/times.json.
//   node game/tools/calibrate.mjs                 → every stage not yet in times.json
//   node game/tools/calibrate.mjs --world polar   → every stage of that world (stage 1 keeps its time)
//   node game/tools/calibrate.mjs --levels a,b    → just these stage keys
//   add --dry to print without writing, --runs N for runs per check (default 120)
//
// Target feel (normal difficulty, the "casual" player model): inside a world the win
// rate falls in a straight line from stage 1's rate to max(0.55, stage-1 rate − 0.25).
// The time is the shortest whole second that reaches that target and also keeps:
// experts ≥ 95% (normal) and ≥ 90% (hard), novices ≥ 80% on easy, experts ≥ 15% three
// stars, and novices ≥ 20% / 10% on the second and third stage of the game.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { launch, openGames, SIM_PAGES } from '../../tests/game/helpers/browser.js'
import { simulate, summarize, pool } from '../../tests/game/helpers/sim.js'

const here = dirname(fileURLToPath(import.meta.url)), root = join(here, '..', '..')
const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null }
const RUNS = Number(arg('--runs') || 120), DRY = process.argv.includes('--dry')
const timesFile = join(root, 'game', 'times.json')
const times = JSON.parse(readFileSync(timesFile, 'utf8'))

execFileSync('node', [join(root, 'game', 'build.mjs')], { stdio: 'inherit' })
const browser = await launch()
const { pages } = await openGames(browser, SIM_PAGES)
const levels = await pages[0].evaluate(() => window.__chayidu.levels())

let todo
if (arg('--levels')) todo = arg('--levels').split(',').map((k) => levels.findIndex((l) => l.key === k))
else if (arg('--world')) {
  const c = await pages[0].evaluate((k) => window.__chayidu.chapters().findIndex((c) => c.key === k), arg('--world'))
  todo = levels.map((l, i) => i).filter((i) => levels[i].chapter === c && levels[i].stage > 0)
} else todo = levels.map((l, i) => i).filter((i) => !(levels[i].key in times))
if (todo.some((i) => i < 0)) throw new Error('unknown stage key')

// Runs `runs` rounds of one profile on one stage at a given time budget.
async function rate(page, i, sec, profileName, diff, runs = RUNS) {
  await page.evaluate(([i, sec]) => window.__chayidu.setLevelTime(i, sec), [i, sec])
  return summarize(await simulate(page, { levelIdx: i, profileName, runs, diff, seed: 3 }))
}
const firstOf = (i) => i - levels[i].stage
const anchors = {}
async function anchor(page, i) { // casual win rate of the world's first stage, at its calibrated time
  const f = firstOf(i)
  anchors[f] ??= rate(page, f, times[levels[f].key] ?? levels[f].time, 'casual', 'normal', 300).then((m) => m.winRate)
  return anchors[f]
}
async function constraintsOk(page, i, sec) {
  const checks = [['expert', 'normal', (m) => m.winRate >= 0.95 && m.stars[3] >= 0.15], ['expert', 'hard', (m) => m.winRate >= 0.9], ['novice', 'easy', (m) => m.winRate >= 0.8]]
  if (i === 1) checks.push(['novice', 'normal', (m) => m.winRate >= 0.2])
  if (i === 2) checks.push(['novice', 'normal', (m) => m.winRate >= 0.1])
  for (const [who, diff, ok] of checks) if (!ok(await rate(page, i, sec, who, diff))) return false
  return true
}
// Smallest whole second in [lo, hi] for which pred holds (pred is monotonic in time).
async function search(lo, hi, pred) {
  if (!(await pred(hi))) return hi
  while (lo < hi) { const mid = Math.floor((lo + hi) / 2); if (await pred(mid)) hi = mid; else lo = mid + 1 }
  return lo
}

const out = await pool(pages, todo, async (page, i) => {
  const L = levels[i], r1 = await anchor(page, i)
  const end = Math.max(0.55, r1 - 0.25), target = r1 - (r1 - end) * (L.stage / 9)
  const tCasual = await search(8, 120, async (s) => (await rate(page, i, s, 'casual', 'normal')).winRate >= target)
  const tFloor = await search(8, 120, (s) => constraintsOk(page, i, s))
  const sec = Math.max(tCasual, tFloor)
  const got = (await rate(page, i, sec, 'casual', 'normal', 300)).winRate
  const n = L.objects.filter((o) => !o.trap).length
  console.log(`${L.key.padEnd(22)} ${String(L.chapter + 1).padStart(2)}-${L.stage + 1}  ${n} obj  target ${target.toFixed(2)}  casual@${tCasual}s  floors@${tFloor}s  → ${sec}s (casual ${got.toFixed(2)})`)
  return [L.key, sec]
})
await browser.close()
for (const [k, s] of out) times[k] = s
const ordered = Object.fromEntries(levels.filter((l) => l.key in times).map((l) => [l.key, times[l.key]]))
if (DRY) console.log('dry run: times.json not written')
else { writeFileSync(timesFile, JSON.stringify(ordered, null, 2) + '\n'); execFileSync('node', [join(root, 'game', 'build.mjs')], { stdio: 'inherit' }) }
