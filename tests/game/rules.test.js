// 遊戲規則：透過遊戲自己的程式路徑（旋轉 → 放手 → 完成）逐條驗證規則與計分。
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { launch, openGame } from './helpers/browser.js'

let browser, page, errors, C, LV, CH
const run = (fn, arg) => page.evaluate(fn, arg)
const idx = (key) => LV.findIndex((l) => l.key === key)

beforeAll(async () => {
  browser = await launch()
  ;({ page, errors } = await openGame(browser))
  ;[C, LV, CH] = await run(() => { const G = window.__chayidu; G.quiet(true); G.manualClock(true); return [G.consts, G.levels(), G.chapters()] })
})
afterAll(async () => { await browser?.close() })

describe('地球宇宙：十大關卡', () => {
  it('10 個大關、各 10 個規劃小關；目前每個大關開放第 1 小關', () => {
    expect(CH).toHaveLength(10)
    for (const ch of CH) expect(ch.stages).toHaveLength(10)
    expect(LV).toHaveLength(10)
    expect(LV.map((l) => l.chapter)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    LV.forEach((l) => expect(l.title).toBe(CH[l.chapter].stages[0]))
  })
  it('每關物品 id 不重複、都有一件「只歪一點點」的物品', () => {
    for (const l of LV) {
      const ids = l.objects.map((o) => o.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(l.objects.some((o) => o.near), l.key).toBe(true)
    }
  })
  it('特殊機制都在：斜塔陷阱、三組連動、要倒過來才對的海市蜃樓', () => {
    const all = LV.flatMap((l) => l.objects.map((o) => ({ ...o, level: l.key })))
    expect(all.filter((o) => o.trap)).toEqual([expect.objectContaining({ id: 'pisa', keep: 3.97, level: 'it' })])
    expect(all.filter((o) => o.link).map((o) => `${o.id}->${o.link.to}@${o.link.k}`)).toEqual(['shL->shR@0.6', 'tickets->price@0.5', 'panelL->panelR@0.6'])
    expect(all.filter((o) => o.target !== 0)).toEqual([expect.objectContaining({ id: 'mirage', target: 180 })])
  })
  it('動物奇關的每一隻動物都會動、都有自己的叫聲', () => {
    const farm = LV[idx('farm')]
    expect(farm.objects.every((o) => o.call)).toBe(true)
    expect(new Set(farm.objects.map((o) => o.call)).size).toBe(farm.objects.length)
  })
})

describe('開局', () => {
  it('同一個種子產生同一個開局，不同種子不同', async () => {
    const angles = (seed) => run((s) => { const G = window.__chayidu; G.seed(s); G.start(1); return G.state().objs.map((o) => o.angle) }, seed)
    const a = await angles(42), b = await angles(42), c = await angles(43)
    expect(a).toEqual(b)
    expect(a).not.toEqual(c)
  })
  it('200 個種子 × 10 關：開局沒有任何物品已經對齊，歪斜幅度合理', async () => {
    const bad = await run(({ TOL }) => {
      const G = window.__chayidu, bad = []
      G.levels().forEach((lv, i) => {
        for (let s = 1; s <= 200; s++) {
          G.seed(s); G.start(i)
          const st = G.state()
          if (st.timeLeft !== lv.time || !st.running) bad.push(`${lv.key}/${s}: bad start state`)
          for (const o of st.objs) {
            const meta = lv.objects.find((m) => m.id === o.id), e = Math.abs(o.err)
            if (o.trap) { if (o.angle !== meta.keep) bad.push(`${lv.key}/${s}: trap moved`); continue }
            if (e <= TOL) bad.push(`${lv.key}/${s}/${o.id}: already aligned (${e})`)
            if (e > 20) bad.push(`${lv.key}/${s}/${o.id}: too wild (${e})`)
            if (meta.near && e > 1.4) bad.push(`${lv.key}/${s}/${o.id}: near object off by ${e}`)
          }
        }
      })
      return bad
    }, C)
    expect(bad.slice(0, 10)).toEqual([])
  })
})

describe('對齊判定', () => {
  it('0.5° 內算對齊、0.1° 內算完美（不吸附，角度保持玩家放的值）', async () => {
    const r = await run((jp) => {
      const G = window.__chayidu
      G.seed(1); G.start(jp)
      const at = (a) => { G.setAngle('torii', a); G.release(); const o = G.state().objs.find((x) => x.id === 'torii'); return [o.aligned, o.perfect, o.angle] }
      return { ok: at(0.4999), no: at(0.5001), pf: at(-0.0999), notPf: at(0.1001) }
    }, idx('jp'))
    expect(r.ok.slice(0, 2)).toEqual([true, false])
    expect(r.no.slice(0, 2)).toEqual([false, false])
    expect(r.pf.slice(0, 2)).toEqual([true, true])
    expect(r.notPf.slice(0, 2)).toEqual([true, false])
    expect(r.ok[2]).toBeCloseTo(0.4999, 9)
  })
  it('海市蜃樓要倒著（180°）才算對齊，扶正反而是錯的', async () => {
    const r = await run((d) => {
      const G = window.__chayidu
      G.seed(1); G.start(d)
      const at = (a) => { G.setAngle('mirage', a); G.release(); return G.state().objs.find((x) => x.id === 'mirage').aligned }
      return { flipped: at(180.2), upright: at(0), almost: at(-179.7) }
    }, idx('desert'))
    expect(r).toEqual({ flipped: true, upright: false, almost: true })
  })
  it('「完成」要等所有非陷阱物品都對齊才能按', async () => {
    const r = await run((it) => {
      const G = window.__chayidu
      G.seed(3); G.start(it)
      const ids = G.state().objs.filter((o) => !o.trap).map((o) => o.id)
      const steps = []
      for (const id of ids) { G.setAngle(id, 0); G.release(); steps.push(G.state().doneEnabled) }
      return { steps, required: G.state().required, trapAligned: G.state().objs.find((o) => o.trap).aligned }
    }, idx('it'))
    expect(r.required).toBe(6)
    expect(r.steps).toEqual([false, false, false, false, false, true])
    expect(r.trapAligned).toBe(false)
  })
  it('連動：帶頭的物品轉 d 度，被帶的跟著轉 k×d；反過來不會', async () => {
    const r = await run((lvs) => {
      const G = window.__chayidu, out = []
      for (const [i, a, b] of lvs) {
        G.seed(5); G.start(i)
        const ang = (id) => G.state().objs.find((o) => o.id === id).angle
        const b0 = ang(b); G.rotate(a, 5); const b1 = ang(b)
        const a0 = ang(a); G.rotate(b, 5); const a1 = ang(a)
        out.push([b1 - b0, a1 - a0])
      }
      return out
    }, [[idx('it'), 'shL', 'shR'], [idx('neon'), 'tickets', 'price'], [idx('space'), 'panelL', 'panelR']])
    expect(r[0][0]).toBeCloseTo(3, 9); expect(r[1][0]).toBeCloseTo(2.5, 9); expect(r[2][0]).toBeCloseTo(3, 9)
    for (const x of r) expect(x[1]).toBe(0)
  })
  it('轉 360° 回到原角度；極端角度仍落在 -180～180', async () => {
    const r = await run((jp) => {
      const G = window.__chayidu
      G.seed(2); G.start(jp)
      const ang = () => G.state().objs.find((o) => o.id === 'cat').angle
      const a0 = ang(); G.rotate('cat', 360); const a1 = ang()
      G.rotate('cat', 1e6); const a2 = ang()
      return { a0, a1, a2 }
    }, idx('jp'))
    expect(r.a1).toBeCloseTo(r.a0, 9)
    expect(r.a2).toBeGreaterThan(-180)
    expect(r.a2).toBeLessThanOrEqual(180)
  })
})

describe('三種難度', () => {
  const D = () => Object.fromEntries(C.DIFFS.map((d) => [d.key, d]))
  it('名稱、誤差門檻、時間倍率、分數倍率', () => {
    expect(C.DIFFS.map((d) => d.name)).toEqual(['看到會歪頭', '忍不住伸手', '不轉正睡不著'])
    expect(C.DIFFS.map((d) => d.tol)).toEqual([1.5, 0.5, 0.2])
    expect(C.DIFFS.map((d) => d.mult)).toEqual([0.6, 1, 1.5])
    expect(D().easy.timeMul).toBeGreaterThan(1)
    expect(D().hard.timeMul).toBeLessThan(1)
  })
  it('對齊門檻跟著難度走：1.4° 只有簡單算對齊，0.3° 困難不算', async () => {
    const r = await run((jp) => {
      const G = window.__chayidu, out = {}
      for (const d of ['easy', 'normal', 'hard']) {
        G.setDifficulty(d); G.seed(1); G.start(jp)
        const at = (a) => { G.setAngle('torii', a); G.release(); return G.state().objs.find((x) => x.id === 'torii').aligned }
        out[d] = [at(1.4), at(0.3), at(0.15)]
      }
      G.setDifficulty('normal')
      return out
    }, idx('jp'))
    expect(r).toEqual({ easy: [true, true, true], normal: [false, true, true], hard: [false, false, true] })
  })
  it('時間依倍率調整；每種難度的開局都沒有物品已經對齊', async () => {
    const r = await run(({ jp, diffs }) => {
      const G = window.__chayidu, out = {}
      for (const d of diffs) {
        G.setDifficulty(d.key); let pre = 0, total = null
        for (let s = 1; s <= 100; s++) {
          G.seed(s)
          G.levels().forEach((lv, i) => { G.start(i); if (i === jp) total = G.state().timeTotal; for (const o of G.state().objs) if (!o.trap && Math.abs(o.err) <= d.tol) pre++ })
        }
        out[d.key] = { pre, total }
      }
      G.setDifficulty('normal')
      return out
    }, { jp: idx('jp'), diffs: C.DIFFS })
    for (const d of C.DIFFS) {
      expect(r[d.key].pre, d.key).toBe(0)
      expect(r[d.key].total, d.key).toBe(Math.round(LV[idx('jp')].time * d.timeMul))
    }
  })
  it('分數倍率：同樣的表現，簡單 ×0.6、困難 ×1.5', async () => {
    const r = await run(() => ['easy', 'normal', 'hard'].map((d) => window.__chayidu.computeScore([{ name: 'a', angle: 0 }, { name: 'b', angle: 0 }], 10, true, d).total))
    expect(r).toEqual([Math.round(r[1] * 0.6), r[1], Math.round(r[1] * 1.5)])
  })
})

describe('Q 版音效', () => {
  it('每一件非陷阱物品都有聲音：生物用叫聲、物品用材質音；母雞用選定的 Q 版小雞', async () => {
    const kinds = await run(() => window.__chayidu.soundKinds())
    for (const l of LV) for (const o of l.objects.filter((x) => !x.trap)) {
      expect(!!o.call !== !!o.sfx, `${l.key}/${o.id} 要剛好有一種聲音`).toBe(true)
      if (o.call) expect(kinds.creature, `${l.key}/${o.id}`).toContain(o.call)
      else expect(kinds.thing, `${l.key}/${o.id}`).toContain(o.sfx)
    }
    expect(LV[idx('farm')].objects.find((o) => o.id === 'chicken').call).toBe('chick')
  })
  it('所有聲音都能正常合成：有聲音、沒有壞值、長度在 1.2 秒內', async () => {
    const bad = await run(async () => {
      const G = window.__chayidu, k = G.soundKinds(), out = []
      for (const g of ['creature', 'thing', 'ui']) for (const name of k[g]) {
        for (const arg of g === 'thing' ? [1, 2.5] : [1]) {
          const r = await G.renderSound(g, name, arg)
          if (r.bad || r.peak < 0.05 || r.seconds > 1.2) out.push(`${g}/${name}@${arg}: peak ${r.peak.toFixed(3)} len ${r.seconds.toFixed(2)}s`)
        }
      }
      return out
    })
    expect(bad).toEqual([])
  })
  it('同一關的物品音高不同，依序轉正會像一段旋律', async () => {
    const r = await run((jp) => {
      const G = window.__chayidu
      G.seed(1); G.start(jp)
      const before = G.sfxLog().length
      for (const o of G.state().objs) { G.setAngle(o.id, o.target); G.release() }
      return G.sfxLog().slice(before)
    }, idx('jp'))
    expect(r).toEqual(['sfx:bell', 'sfx:wood', 'sfx:pop', 'sfx:clunk', 'sfx:meow'])
  })
})

describe('結算評語', () => {
  const TIERS = ['far', 'close', 'pass', 'good', 'perfect']
  it('每個大關都有自己的旁白，五種等級各至少 2 句，文字不重複、長度適中', async () => {
    const all = await run(() => window.__chayidu.comments())
    expect(Object.keys(all).sort()).toEqual(CH.map((c) => c.key).sort())
    const seen = new Set()
    for (const [key, c] of Object.entries(all)) {
      expect(c.by, key).toBeTruthy()
      expect(Object.keys(c.tiers).sort(), key).toEqual([...TIERS].sort())
      for (const t of TIERS) {
        expect(c.tiers[t].length, `${key}/${t}`).toBeGreaterThanOrEqual(2)
        for (const [h, line] of c.tiers[t]) {
          expect(h.length, h).toBeLessThanOrEqual(14)
          expect(line.length, line).toBeLessThanOrEqual(30)
          expect(seen.has(line), `重複：${line}`).toBe(false)
          seen.add(line)
        }
      }
    }
  })
  it('等級判定：過關看星數，沒過看差多少', async () => {
    const g = await run(() => {
      const G = window.__chayidu
      return [
        G.gradeTier({ win: true, stars: 1, aligned: 5, count: 5 }), G.gradeTier({ win: true, stars: 2, aligned: 5, count: 5 }), G.gradeTier({ win: true, stars: 3, aligned: 5, count: 5 }),
        G.gradeTier({ win: false, stars: 0, aligned: 4, count: 5 }), G.gradeTier({ win: false, stars: 0, aligned: 3, count: 7 }), G.gradeTier({ win: false, stars: 0, aligned: 0, count: 4 }),
      ]
    })
    expect(g).toEqual(['pass', 'good', 'perfect', 'close', 'far', 'far'])
  })
  it('結算時給出對應大關、對應等級的評語，同一關連續兩次不會一樣', async () => {
    const r = await run(() => {
      const G = window.__chayidu, out = []
      for (let k = 0; k < 6; k++) {
        G.resetProgress(); G.seed(30 + k); G.start(1)
        if (k % 2) G.advance(10_000)
        else { for (const o of G.state().objs) { G.setAngle(o.id, o.target); G.release() } G.done() }
        out.push(G.state().lastResult.comment)
      }
      return out
    })
    const ocean = (await run(() => window.__chayidu.comments())).ocean
    r.forEach((c, k) => {
      expect(c.by).toBe('海龜')
      expect(c.tier).toBe(k % 2 ? 'far' : 'perfect')
      expect(ocean.tiers[c.tier].map((x) => x[1])).toContain(c.line)
    })
    expect(r[0].line).not.toBe(r[2].line)
    expect(r[2].line).not.toBe(r[4].line)
  })
})

describe('會動的生物', () => {
  it('轉正時，生物發出牠自己的叫聲；物品發出自己材質的聲音', async () => {
    const r = await run(([farm, jp]) => {
      const G = window.__chayidu
      G.seed(4); G.start(farm)
      const before = G.sfxLog().length
      G.setAngle('cow', 0.2); G.release()
      const afterCow = G.sfxLog().slice(before)
      G.start(jp)
      const mark = G.sfxLog().length
      G.setAngle('torii', 0); G.release()
      return { afterCow, jpCalls: G.sfxLog().slice(mark) }
    }, [idx('farm'), idx('jp')])
    expect(r.afterCow).toEqual(['moo'])
    expect(r.jpCalls).toEqual(['sfx:bell'])
  })
  it('轉正後安靜下來，沒轉正的繼續動', async () => {
    await run((farm) => { const G = window.__chayidu; G.seed(4); G.start(farm); G.setAngle('cow', 0); G.release() }, idx('farm'))
    await page.waitForTimeout(800) // let the render loop ease `live`
    const live = Object.fromEntries((await run(() => window.__chayidu.state().objs)).map((o) => [o.id, o.live]))
    expect(live.cow).toBeLessThan(0.1)
    expect(live.pig).toBeGreaterThan(0.9)
  })
})

describe('時間與緊張模式', () => {
  it('每件完美 +2 秒，每件只給一次', async () => {
    const r = await run(() => {
      const G = window.__chayidu
      G.resetProgress(); G.seed(4); G.start(0)
      const objs = G.state().objs, t0 = G.state().timeLeft
      for (const o of objs) { G.setAngle(o.id, o.target); G.release(); G.setAngle(o.id, o.target + 2); G.release(); G.setAngle(o.id, o.target); G.release() }
      return { gained: G.state().timeLeft - t0, n: objs.length }
    })
    expect(r.gained).toBeCloseTo(r.n * C.PERFECT_BONUS, 9)
  })
  it('剩 8 秒進入緊張、剩 3 秒進入高潮；加時超過門檻就退出緊張', async () => {
    const r = await run(([jp, time]) => {
      const G = window.__chayidu
      G.resetProgress(); G.seed(4); G.start(jp)
      const snap = () => { const s = G.state(); return { tense: s.tense, peak: s.peak, t: +s.timeLeft.toFixed(2) } }
      const out = {}
      G.advance(time - 8.1); out.calm = snap()
      G.advance(0.2); out.tense = snap()
      G.advance(5); out.peak = snap()
      G.setAngle('torii', 0); G.release(); out.afterBonus = snap()
      G.setAngle('cat', 0); G.release(); G.setAngle('vend', 0); G.release(); out.lifted = snap()
      return out
    }, [idx('jp'), LV[idx('jp')].time])
    expect(r.calm).toMatchObject({ tense: false, peak: false })
    expect(r.tense).toMatchObject({ tense: true, peak: false })
    expect(r.peak).toMatchObject({ tense: true, peak: true })
    expect(r.afterBonus).toMatchObject({ tense: true, peak: false })
    expect(r.lifted.tense).toBe(false)
    expect(r.lifted.t).toBeGreaterThan(C.TENSE_AT)
  })
  it('時間到判輸；連輸 2 次後下一局多 5 秒，過關後恢復', async () => {
    const totals = await run(() => {
      const G = window.__chayidu, totals = []
      G.resetProgress()
      for (let k = 0; k < 3; k++) { G.seed(10 + k); G.start(0); totals.push(G.state().timeTotal); if (k < 2) G.advance(10_000) }
      for (const o of G.state().objs) { G.setAngle(o.id, o.target); G.release() }
      G.done()
      G.seed(20); G.start(0); totals.push(G.state().timeTotal)
      return totals
    })
    const t = LV[0].time
    expect(totals).toEqual([t, t, t + C.MERCY_SECS, t])
  })
})

describe('計分公式（純函式）', () => {
  const objs = (errs, trap) => [
    ...errs.map((e, i) => ({ name: `o${i}`, angle: e })),
    ...(trap === undefined ? [] : [{ name: 'pisa', angle: trap, keep: 3.97, trap: true }]),
  ]
  const score = (o, t, win) => run(([o, t, win]) => window.__chayidu.computeScore(o, t, win), [o, t, win])

  it('全完美過關：每件 150 分 + 剩餘整秒 × 20，三星', async () => {
    const r = await score(objs([0, 0.05, -0.09]), 12.7, true)
    expect(r).toMatchObject({ aligned: 3, prec: 150, timeBonus: 12 * C.TIME_PTS, total: 450 + 240, stars: 3 })
  })
  it('精準加成線性遞減：0.3° 得 20 分、0.5° 得 0 分', async () => {
    expect((await score(objs([0.3]), 0, true)).prec).toBe(20)
    expect((await score(objs([0.5]), 0, true)).prec).toBe(0)
  })
  it('失敗不計時間分、0 星', async () => {
    expect(await score(objs([0, 3]), 20, false)).toMatchObject({ timeBonus: 0, stars: 0, total: 150 })
  })
  it('斜塔（過關時）：不動 +200、扶正 −150、動了沒扶正 0', async () => {
    expect((await score(objs([0], 3.97), 0, true)).trapPts).toBe(200)
    expect((await score(objs([0], 0.5), 0, true)).trapPts).toBe(-150)
    expect((await score(objs([0], 10), 0, true)).trapPts).toBe(0)
  })
  it('斜塔（沒過關時）：不加也不扣，掛機拿不到分', async () => {
    expect((await score(objs([9], 3.97), 0, false))).toMatchObject({ trapPts: 0, total: 0 })
    expect((await score(objs([0], 0.5), 0, false))).toMatchObject({ trapPts: 0, total: 150 })
  })
  it('最差情況也不會變負分', async () => {
    expect((await score(objs([9, 9], 0), 0, true)).total).toBeGreaterThanOrEqual(0)
  })
  it('單調性：越準分數不會越低、剩越多秒分數不會越低', async () => {
    const r = await run(() => {
      const G = window.__chayidu, byErr = [], bySec = []
      for (let e = 0; e <= 0.6001; e += 0.01) byErr.push(G.computeScore([{ name: 'a', angle: e }], 10, true).total)
      for (let s = 0; s <= 60; s += 0.5) bySec.push(G.computeScore([{ name: 'a', angle: 0 }], s, true).total)
      return { byErr, bySec }
    })
    for (let i = 1; i < r.byErr.length; i++) expect(r.byErr[i]).toBeLessThanOrEqual(r.byErr[i - 1])
    for (let i = 1; i < r.bySec.length; i++) expect(r.bySec[i]).toBeGreaterThanOrEqual(r.bySec[i - 1])
  })
  it('極端輸入：負時間算 0 秒、超大時間仍是有限整數', async () => {
    expect((await score(objs([0]), -5, true)).secsLeft).toBe(0)
    expect(Number.isSafeInteger((await score(objs([0]), 1e9, true)).total)).toBe(true)
  })
})

describe('執行狀態', () => {
  it('沒有任何執行錯誤', () => { expect(errors).toEqual([]) })
})
