// 數值模擬：3 種難度 × 100 關 × 3 種玩家，每組自動玩 60 局，共 54,000 局（GAME_SIM_RUNS 可調），
// 檢查每局結果合法、參考機器人的分數精確、設計目標、以及與基準線的漂移。
import fs from 'node:fs'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { launch, openGames, maxScore, SIM_PAGES } from './helpers/browser.js'
import { runAll } from './helpers/sim.js'
import { evaluateTargets, compareBaseline, writeReport, BASELINE_FILE } from './helpers/report.js'

const RUNS = Number(process.env.GAME_SIM_RUNS || 60)
let browser, page, pages, errors, sim, C, maxScores, targets, idle

beforeAll(async () => {
  browser = await launch()
  ;({ pages, errors } = await openGames(browser, SIM_PAGES))
  page = pages[0]
  C = await page.evaluate(() => window.__chayidu.consts)
  sim = await runAll(pages, { runs: RUNS })
  maxScores = Object.fromEntries(Object.keys(sim.metrics).map((d) => [d, sim.levels.map((l) => maxScore(l, C, d))]))
  idle = await page.evaluate(() => {
    const G = window.__chayidu, out = []
    for (const d of ['easy', 'normal', 'hard']) { G.setDifficulty(d); G.levels().forEach((lv, i) => { G.resetProgress(); G.seed(7); G.start(i); G.advance(10_000); out.push(G.state().lastResult) }) }
    G.setDifficulty('normal')
    return out
  })
  targets = evaluateTargets(sim.metrics, { levels: sim.levels, consts: C, maxScores, idle, runs: RUNS })
  const baseline = fs.existsSync(BASELINE_FILE) ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8')) : null
  const baselineDiffs = baseline ? compareBaseline(sim.metrics, baseline) : null
  const file = writeReport({ runs: RUNS, metrics: sim.metrics, targets, baselineDiffs, maxScores, levels: sim.levels })
  console.log(`Simulation report: ${file}`)
}, 900_000)

afterAll(async () => { await browser?.close() })

describe('每一局的結果都合法（數值沒有崩潰）', () => {
  it('三種難度：分數是有限整數、介於 0 和理論最高分之間，星數與勝負一致', () => {
    const bad = []
    for (const [diff, rawByKey] of Object.entries(sim.raw)) sim.levels.forEach((lv, i) => {
      for (const key of Object.keys(rawByKey).filter((k) => k.startsWith(lv.key + ':'))) {
        rawByKey[key].forEach((r, n) => {
          const problems = []
          if (!Number.isInteger(r.total)) problems.push('total not integer')
          if (r.total < 0 || r.total > maxScores[diff][i]) problems.push(`total ${r.total} outside [0, ${maxScores[diff][i]}]`)
          if (![0, 1, 2, 3].includes(r.stars)) problems.push('stars')
          if ((r.stars > 0) !== r.win) problems.push('stars vs win')
          if (!r.win && r.timeBonus !== 0) problems.push('time bonus on a loss')
          if (r.aligned > r.count || r.prec < 0 || r.prec > 50 * r.count) problems.push('aligned/prec range')
          if (r.secsLeft < 0 || r.secsLeft > r.timeTotal + C.PERFECT_BONUS * r.count) problems.push('secsLeft range')
          if (problems.length) bad.push(`${diff}/${key}#${n}: ${problems.join(', ')}`)
        })
      }
    })
    expect(bad.slice(0, 20)).toEqual([])
  })

  it('模擬過程沒有任何執行錯誤', () => { expect(errors).toEqual([]) })
})

describe('參考機器人（精確值）', () => {
  it('完美機器人：三種難度都瞬間轉到正確角度、不碰斜塔，拿到理論分數與三星', async () => {
    const results = await page.evaluate(() => {
      const G = window.__chayidu, out = {}
      G.quiet(true); G.manualClock(true)
      for (const d of ['easy', 'normal', 'hard']) {
        G.setDifficulty(d)
        out[d] = G.levels().map((lv, i) => {
          G.resetProgress(); G.seed(7); G.start(i)
          // Turn the leading object of each linked pair first, so it doesn't knock its partner off again.
          const leads = new Set(lv.objects.filter((o) => o.link).map((o) => o.id))
          const objs = G.state().objs.filter((o) => !o.trap)
          for (const o of [...objs.filter((o) => leads.has(o.id)), ...objs.filter((o) => !leads.has(o.id))]) { G.setAngle(o.id, o.target); G.release() }
          G.done()
          return G.state().lastResult
        })
      }
      G.setDifficulty('normal')
      return out
    })
    for (const d of C.DIFFS) sim.levels.forEach((lv, i) => {
      const n = lv.objects.filter((o) => !o.trap).length
      const trap = lv.objects.some((o) => o.trap) ? 200 : 0
      const expected = Math.round((n * 150 + (Math.round(lv.time * d.timeMul) + n * C.PERFECT_BONUS) * C.TIME_PTS + trap) * d.mult)
      expect(results[d.key][i], `${d.key}/${lv.key}`).toMatchObject({ win: true, stars: 3, aligned: n, prec: 50 * n, total: expected })
    })
  })

  it('不動機器人：三種難度每關都是時間到、0 分、0 星（斜塔陷阱只有過關才計分）', () => {
    for (const r of idle) expect(r).toMatchObject({ win: false, total: 0, stars: 0, timeBonus: 0, trapPts: 0 })
  })

  it('扶正斜塔的機器人：其他全完美也扣 150 分、最多兩星', async () => {
    const r = await page.evaluate(() => {
      const G = window.__chayidu
      G.resetProgress(); G.seed(7); G.start(G.levels().findIndex((l) => l.key === 'it'))
      for (const o of G.state().objs) { G.setAngle(o.id, 0); G.release() }
      G.done()
      return G.state().lastResult
    })
    expect(r.trapPts).toBe(-150)
    expect(r.stars).toBe(2)
  })

  it('刷時間機器人：同一件反覆進出完美，最多只拿 +2 秒', async () => {
    const gained = await page.evaluate(() => {
      const G = window.__chayidu
      G.resetProgress(); G.seed(7); G.start(0)
      const t0 = G.state().timeLeft
      for (let k = 0; k < 50; k++) { G.setAngle('cow', 0); G.release(); G.setAngle('cow', 3); G.release() }
      const t = G.state().timeLeft
      G.home()
      return t - t0
    })
    expect(gained).toBeCloseTo(C.PERFECT_BONUS, 9)
  })
})

describe('設計目標（數值平衡）', () => {
  it('所有強制目標都達成', () => {
    const missed = targets.filter((t) => t.enforce && !t.ok).map((t) => `${t.desc}: ${JSON.stringify(t.detail)}`)
    expect(missed).toEqual([])
  })

  it('未強制目標只提醒，不判失敗', () => {
    for (const t of targets.filter((x) => !x.enforce && !x.ok)) console.warn(`[已知平衡問題] ${t.desc}: ${JSON.stringify(t.detail)}`)
  })
})

describe('與基準線比較（優化後數值沒有跑掉）', () => {
  it('勝率與平均分都在容許範圍內', () => {
    expect(fs.existsSync(BASELINE_FILE), '找不到 tests/game/baseline.json，先跑 npm run test:game:baseline').toBe(true)
    const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'))
    const drifted = compareBaseline(sim.metrics, baseline).filter((d) => !d.ok)
    expect(drifted).toEqual([])
  })
})
