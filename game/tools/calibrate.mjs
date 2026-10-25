// Calibrates every stage's time budget by simulation and writes game/times.json.
//   node game/tools/calibrate.mjs                    → every world
//   node game/tools/calibrate.mjs --world polar,park → just these worlds
//   add --dry to print without writing, --runs N for runs per check (default 120)
//
// Target feel (normal difficulty, the "casual" player model): inside a world the win
// rate falls in a straight line from stage 1's rate to max(0.55, stage-1 rate − 0.25).
// Each stage gets the shortest whole second that reaches that target and also keeps,
// with a margin over the enforced targets in tests/game/balance.config.js:
// experts ≥ 95% (normal, with ≥ 20% three stars) and ≥ 92% (hard), novices ≥ 87% on
// easy, and novices ≥ 25% / 15% on the second and third stage of the game.
// Then a pass makes difficulty never drop inside a world: a stage that comes out
// easier than the one before gets less time (down to its floors), or else the stage
// before it gets more. Stage 1 of each world keeps its time unless its floors or that pass need more.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { launch, openGames, SIM_PAGES } from '../../tests/game/helpers/browser.js'
import { simulate, summarize, pool } from '../../tests/game/helpers/sim.js'

const here = dirname(fileURLToPath(import.meta.url)), root = join(here, '..', '..')
const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null }
const RUNS = Number(arg('--runs') || 120), DRY = process.argv.includes('--dry')
const STEP = 0.02 // how much easier than the stage before a stage may measure
const timesFile = join(root, 'game', 'times.json')
const times = JSON.parse(readFileSync(timesFile, 'utf8'))

execFileSync('node', [join(root, 'game', 'build.mjs')], { stdio: 'inherit' })
const browser = await launch()
const { pages } = await openGames(browser, SIM_PAGES)
const [levels, chapters] = await pages[0].evaluate(() => [window.__chayidu.levels(), window.__chayidu.chapters().map((c) => c.key)])
const worlds = arg('--world') ? arg('--world').split(',').map((k) => chapters.indexOf(k)) : chapters.map((c, i) => i)
if (worlds.some((c) => c < 0)) throw new Error('unknown world key')

async function rate(page, i, sec, profileName, diff, runs = RUNS) {
  await page.evaluate(([i, sec]) => window.__chayidu.setLevelTime(i, sec), [i, sec])
  return summarize(await simulate(page, { levelIdx: i, profileName, runs, diff, seed: 3 }))
}
const casual = async (page, i, sec) => (await rate(page, i, sec, 'casual', 'normal', 300)).winRate
async function floorsOk(page, i, sec) {
  const checks = [['expert', 'normal', (m) => m.winRate >= 0.95 && m.stars[3] >= 0.2], ['expert', 'hard', (m) => m.winRate >= 0.92], ['novice', 'easy', (m) => m.winRate >= 0.87]]
  if (i === 1) checks.push(['novice', 'normal', (m) => m.winRate >= 0.25])
  if (i === 2) checks.push(['novice', 'normal', (m) => m.winRate >= 0.15])
  for (const [who, diff, ok] of checks) if (!ok(await rate(page, i, sec, who, diff))) return false
  return true
}
// Smallest whole second in [lo, hi] for which pred holds (pred grows with time).
async function search(lo, hi, pred) {
  if (!(await pred(hi))) return hi
  while (lo < hi) { const mid = Math.floor((lo + hi) / 2); if (await pred(mid)) hi = mid; else lo = mid + 1 }
  return lo
}

const results = await pool(pages, worlds, async (page, c) => {
  const idx = levels.map((l, i) => i).filter((i) => levels[i].chapter === c)
  const t = idx.map((i) => times[levels[i].key] ?? levels[i].time), floor = idx.map(() => 8), r = []
  floor[0] = await search(8, 120, (s) => floorsOk(page, idx[0], s))
  t[0] = Math.max(t[0], floor[0]); r[0] = await casual(page, idx[0], t[0])
  const end = Math.max(0.55, r[0] - 0.25)
  for (let s = 1; s < idx.length; s++) {
    const target = r[0] - (r[0] - end) * (s / (idx.length - 1))
    floor[s] = await search(8, 120, (x) => floorsOk(page, idx[s], x))
    const tc = await search(8, 120, async (x) => (await rate(page, idx[s], x, 'casual', 'normal')).winRate >= target)
    t[s] = Math.max(tc, floor[s]); r[s] = await casual(page, idx[s], t[s])
  }
  // Difficulty never drops: fix each stage against the one before it, walking back when needed.
  for (let s = 1; s < idx.length; s++) {
    while (r[s] > r[s - 1] + STEP && t[s] > floor[s]) r[s] = await casual(page, idx[s], --t[s])
    for (let k = s; k > 0 && r[k] > r[k - 1] + STEP; k--) {
      while (r[k] > r[k - 1] + STEP && t[k - 1] < 120) r[k - 1] = await casual(page, idx[k - 1], ++t[k - 1])
    }
  }
  idx.forEach((i, s) => console.log(`${levels[i].key.padEnd(20)} ${String(c + 1).padStart(2)}-${s + 1}  floors ${String(floor[s]).padStart(2)}s → ${String(t[s]).padStart(2)}s  casual ${r[s].toFixed(2)}`))
  return idx.map((i, s) => [levels[i].key, t[s]])
})
await browser.close()
for (const [k, s] of results.flat()) times[k] = s
const ordered = Object.fromEntries(levels.filter((l) => l.key in times).map((l) => [l.key, times[l.key]]))
if (DRY) console.log('dry run: times.json not written')
else { writeFileSync(timesFile, JSON.stringify(ordered, null, 2) + '\n'); execFileSync('node', [join(root, 'game', 'build.mjs')], { stdio: 'inherit' }) }
