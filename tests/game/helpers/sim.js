// Monte Carlo balance simulation. A modelled player plays whole rounds through
// the game's own code paths (rotate → release → done) on a manual clock, so a
// 40-second round runs in a few milliseconds and every run is reproducible.
import { PROFILES } from '../balance.config.js'

// Runs inside the page. Must stay self-contained: Playwright serialises it.
function simulateInPage({ levelIdx, runs, gameSeed, playerSeed, profile }) {
  const G = window.__chayidu
  let s = playerSeed >>> 0
  const rand = () => {
    s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const uni = ([a, b]) => a + rand() * (b - a)
  const gauss = () => {
    let u = 0, v = 0
    while (u === 0) u = rand()
    while (v === 0) v = rand()
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
  }
  const sign = () => (rand() < 0.5 ? -1 : 1)
  const alive = () => G.state().running
  const out = []
  G.quiet(true)
  G.manualClock(true)
  for (let r = 0; r < runs; r++) {
    G.resetProgress() // every run is a first attempt, so the mercy bonus never applies
    G.seed(gameSeed + r)
    G.start(levelIdx)
    const st0 = G.state()
    let moves = 0
    const adjust = (id) => {
      if (!alive()) return
      G.advance(uni(profile.coarse) + uni(profile.fine))
      if (!alive()) return
      let resid = Math.abs(gauss()) * profile.sigma
      if (rand() < profile.polish) {
        G.advance(uni(profile.polishTime))
        if (!alive()) return
        resid = Math.abs(gauss()) * 0.04
      }
      G.setAngle(id, sign() * resid)
      G.release()
      moves++
    }
    const order = st0.objs.filter((o) => !o.trap).map((o) => o.id)
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]]
    }
    G.advance(uni(profile.scan))
    for (const id of order) adjust(id)
    const trap = st0.objs.find((o) => o.trap)
    if (trap && alive() && rand() < profile.trapFooled) {
      G.advance(uni(profile.coarse))
      if (alive()) { G.setAngle(trap.id, sign() * Math.abs(gauss()) * profile.sigma); G.release() }
    }
    // The player watches the 完成 n/m counter and fixes whatever is still off
    // (sloppy residuals, or the right shutter disturbed by the linked left one).
    for (let pass = 0; pass < 6 && alive(); pass++) {
      const off = G.state().objs.filter((o) => !o.trap && !o.aligned).map((o) => o.id)
      if (!off.length) break
      for (const id of off) adjust(id)
    }
    if (alive() && G.state().doneEnabled) {
      G.advance(uni(profile.confirm))
      if (alive()) G.done()
    }
    if (alive()) G.advance(10_000) // ran out of ideas: let the clock expire
    const res = G.state().lastResult
    out.push({
      win: res.win, total: res.total, stars: res.stars, aligned: res.aligned, count: res.count,
      prec: res.prec, timeBonus: res.timeBonus, secsLeft: res.secsLeft, trapPts: res.trapPts,
      timeTotal: st0.timeTotal, moves,
    })
  }
  G.home()
  return out
}

export async function simulate(page, { levelIdx, profileName, runs, seed = 1 }) {
  const profileIdx = Object.keys(PROFILES).indexOf(profileName)
  const profile = PROFILES[profileName]
  const results = []
  const CHUNK = 200
  for (let start = 0; start < runs; start += CHUNK) {
    const n = Math.min(CHUNK, runs - start)
    const chunk = await page.evaluate(simulateInPage, {
      levelIdx, runs: n, profile,
      gameSeed: seed * 1_000_003 + levelIdx * 100_003 + profileIdx * 10_007 + start,
      playerSeed: seed * 7919 + levelIdx * 104_729 + profileIdx * 1_299_709 + start,
    })
    results.push(...chunk)
  }
  return results
}

const pct = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))]

export function summarize(runs) {
  const totals = runs.map((r) => r.total).sort((a, b) => a - b)
  const wins = runs.filter((r) => r.win)
  const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)
  const stars = [0, 1, 2, 3].map((k) => runs.filter((r) => r.stars === k).length / runs.length)
  return {
    runs: runs.length,
    winRate: wins.length / runs.length,
    meanScore: mean(totals),
    p10: pct(totals, 0.1), p50: pct(totals, 0.5), p90: pct(totals, 0.9),
    maxSeen: totals[totals.length - 1],
    meanSecsLeftOnWin: mean(wins.map((r) => r.secsLeft)),
    stars,
    trapStraightened: runs.filter((r) => r.trapPts < 0).length / runs.length,
  }
}

export async function runAll(page, { runs, seed = 1 }) {
  const levels = await page.evaluate(() => window.__chayidu.levels())
  const metrics = {}
  const raw = {}
  for (let i = 0; i < levels.length; i++) {
    for (const name of Object.keys(PROFILES)) {
      const key = `${levels[i].key}:${name}`
      raw[key] = await simulate(page, { levelIdx: i, profileName: name, runs, seed })
      metrics[key] = summarize(raw[key])
    }
  }
  return { levels, metrics, raw }
}
