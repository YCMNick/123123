// 數值模擬：10 關 × 3 種玩家，每組自動玩 500 局，共 15,000 局（GAME_SIM_RUNS 可調），
// 檢查每局結果合法、參考機器人的分數精確、設計目標、以及與基準線的漂移。
import fs from 'node:fs'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { launch, openGame, maxScore } from './helpers/browser.js'
import { runAll } from './helpers/sim.js'
import { evaluateTargets, compareBaseline, writeReport, BASELINE_FILE } from './helpers/report.js'

const RUNS = Number(process.env.GAME_SIM_RUNS || 500)
let browser, page, errors, sim, C, maxScores, targets, idle

beforeAll(async () => {
  browser = await launch()
  ;({ page, errors } = await openGame(browser))
  C = await page.evaluate(() => window.__chayidu.consts)
  sim = await runAll(page, { runs: RUNS })
  maxScores = sim.levels.map((l) => maxScore(l, C))
  idle = await page.evaluate(() => {
    const G = window.__chayidu
    return G.levels().map((lv, i) => { G.resetProgress(); G.seed(7); G.start(i); G.advance(10_000); return G.state().lastResult })
  })
  targets = evaluateTargets(sim.metrics, { levels: sim.levels, consts: C, maxScores, idle })
  const baseline = fs.existsSync(BASELINE_FILE) ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8')) : null
  const baselineDiffs = baseline ? compareBaseline(sim.metrics, baseline) : null
  const file = writeReport({ runs: RUNS, metrics: sim.metrics, targets, baselineDiffs, maxScores, levels: sim.levels })
  console.log(`Simulation report: ${file}`)
}, 900_000)

afterAll(async () => { await browser?.close() })

describe('每一局的結果都合法（數值沒有崩潰）', () => {
  it('分數是有限整數、介於 0 和理論最高分之間，星數與勝負一致', () => {
    const bad = []
    sim.levels.forEach((lv, i) => {
      for (const key of Object.keys(sim.raw).filter((k) => k.startsWith(lv.key + ':'))) {
        sim.raw[key].forEach((r, n) => {
          const problems = []
          if (!Number.isInteger(r.total)) problems.push('total not integer')
          if (r.total < 0 || r.total > maxScores[i]) problems.push(`total ${r.total} outside [0, ${maxScores[i]}]`)
          if (![0, 1, 2, 3].includes(r.stars)) problems.push('stars')
          if ((r.stars > 0) !== r.win) problems.push('stars vs win')
          if (!r.win && r.timeBonus !== 0) problems.push('time bonus on a loss')
          if (r.aligned > r.count || r.prec < 0 || r.prec > 50 * r.count) problems.push('aligned/prec range')
          if (r.secsLeft < 0 || r.secsLeft > r.timeTotal + C.PERFECT_BONUS * r.count) problems.push('secsLeft range')
          if (problems.length) bad.push(`${key}#${n}: ${problems.join(', ')}`)
        })
      }
    })
    expect(bad.slice(0, 20)).toEqual([])
  })

  it('模擬過程沒有任何執行錯誤', () => { expect(errors).toEqual([]) })
})

describe('參考機器人（精確值）', () => {
  it('完美機器人：瞬間全部轉到正確角度、不碰斜塔，拿到理論分數與三星', async () => {
    const results = await page.evaluate(() => {
      const G = window.__chayidu
      G.quiet(true); G.manualClock(true)
      return G.levels().map((lv, i) => {
        G.resetProgress(); G.seed(7); G.start(i)
        for (const o of G.state().objs) if (!o.trap) { G.setAngle(o.id, o.target); G.release() }
        G.done()
        return G.state().lastResult
      })
    })
    sim.levels.forEach((lv, i) => {
      const n = lv.objects.filter((o) => !o.trap).length
      const trap = lv.objects.some((o) => o.trap) ? 200 : 0
      const expected = n * 150 + (lv.time + n * C.PERFECT_BONUS) * C.TIME_PTS + trap
      expect(results[i]).toMatchObject({ win: true, stars: 3, aligned: n, prec: 50 * n, total: expected })
    })
  })

  it('不動機器人：每關都是時間到、0 分、0 星（斜塔陷阱只有過關才計分）', () => {
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
