// 實際操作流程：用真的滑鼠、鍵盤、按鈕走過整個遊戲，確認「遊戲沒有壞掉」。
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import { launch, openGame } from './helpers/browser.js'
import { canvasPoint, state, objAngle, canvasSpread, canvasPixels, fmtDeg } from './helpers/ui.js'

let browser, page, context, errors, LV
const idx = (key) => LV.findIndex((l) => l.key === key)
beforeAll(async () => {
  browser = await launch()
  const g = await openGame(browser)
  LV = await g.page.evaluate(() => window.__chayidu.levels())
  await g.context.close()
})
afterAll(async () => { await browser?.close() })
beforeEach(async () => { ({ page, context, errors } = await openGame(browser)) })
afterEach(async () => {
  expect(errors, '執行錯誤').toEqual([])
  await context.close()
})

describe('首頁', () => {
  it('十張大關卡片，縮圖都有畫面', async () => {
    await expect.poll(() => page.locator('.lv').count()).toBe(10)
    await page.waitForTimeout(300)
    for (let i = 1; i <= 10; i++) expect(await canvasSpread(page, `.lv:nth-child(${i}) canvas`), `card ${i}`).toBeGreaterThan(10)
  })
  it('點大關卡片會列出 10 個小關，只有第 1 小關開放，可以直接開始', async () => {
    await page.click('.lv:nth-child(6)')
    await expect.poll(() => page.locator('#ovChapter').isVisible()).toBe(true)
    expect(await page.locator('#ovChapter h2').textContent()).toBe('極地冰原')
    expect(await page.locator('#ovChapter .stages li').count()).toBe(10)
    expect(await page.locator('#ovChapter .stages li.locked').count()).toBe(9)
    await page.click('#sheetPlay')
    await expect.poll(() => page.locator('#ovIntro h2').textContent()).toBe('極光夜')
  })
  it('難度可以切換、會記住，時間跟著改', async () => {
    expect(await page.locator('.diff[aria-checked="true"] b').textContent()).toBe('忍不住伸手')
    await page.click('#diff-easy')
    expect(await page.locator('.diff[aria-checked="true"] b').textContent()).toBe('看到會歪頭')
    expect(await page.locator('.lv:nth-child(1) .m').textContent()).toContain(`${Math.round(LV[0].time * 1.35)} 秒`)
    await page.reload()
    await page.waitForFunction(() => window.__chayidu)
    expect(await page.locator('.diff[aria-checked="true"] b').textContent()).toBe('看到會歪頭')
    await page.click('#startBtn')
    expect(await page.locator('#ovIntro .place').textContent()).toContain('看到會歪頭')
  })

  it('標題的「度」可以拖曳轉正', async () => {
    const box = await page.locator('#tilt').boundingBox()
    const cx = box.x + box.width / 2, cy = box.y + box.height * 0.55
    await page.mouse.move(cx + 40, cy)
    await page.mouse.down()
    await page.mouse.move(cx + 40, cy - 2, { steps: 4 })
    await page.mouse.up()
    expect(await page.locator('#tiltDeg').textContent()).not.toBe('2.70°')
  })
})

describe('完整流程', () => {
  it('開始 → 說明 → 3、2、1 倒數 → 開始計時', async () => {
    await page.click('#startBtn')
    await expect.poll(() => page.locator('#ovIntro').isVisible()).toBe(true)
    expect(await page.locator('#goBtn').textContent()).toContain(`${LV[0].time} 秒`)
    await page.click('#goBtn')
    await expect.poll(() => page.locator('#count').textContent()).toBe('3')
    expect((await state(page)).running).toBe(false)
    await page.waitForFunction(() => window.__chayidu.state().running, null, { timeout: 4000 })
    await page.waitForTimeout(1200)
    expect((await state(page)).timeLeft).toBeLessThan(LV[0].time - 0.5)
  })

  it('拖曳旋轉會出現放大鏡，度數與實際誤差一致', async () => {
    await page.evaluate((i) => { const G = window.__chayidu; G.seed(1); G.start(i) }, idx('jp'))
    const before = await objAngle(page, 'torii')
    const p = await canvasPoint(page, 230, 268)
    await page.mouse.move(p.x, p.y)
    await page.mouse.down()
    const q = await canvasPoint(page, 230, 290)
    await page.mouse.move(q.x, q.y, { steps: 8 })
    await page.waitForTimeout(100)
    expect(await page.locator('#loupe').getAttribute('class')).toContain('on')
    const st = await state(page)
    const torii = st.objs.find((o) => o.id === 'torii')
    expect(await page.locator('#ldeg').textContent()).toBe(fmtDeg(torii.err))
    await page.mouse.up()
    expect(Math.abs(torii.angle - before - 23.75)).toBeLessThan(2) // atan2(22, 50) ≈ 23.75°
  })

  it('放大鏡：簡單會指方向、普通只給度數、困難不給度數', async () => {
    const read = async (d) => {
      await page.evaluate(([d, i]) => { const G = window.__chayidu; G.setDifficulty(d); G.seed(1); G.start(i); G.select('torii') }, [d, idx('jp')])
      await page.click('.nudge[data-d="0.1"]')
      await page.waitForTimeout(120)
      return { deg: await page.locator('#ldeg').isVisible(), dir: (await page.locator('#ldir').textContent()).trim() }
    }
    const easy = await read('easy'), normal = await read('normal'), hard = await read('hard')
    expect(easy.deg).toBe(true); expect(easy.dir).toMatch(/往(逆|順)時針/)
    expect(normal.deg).toBe(true); expect(normal.dir).toBe('')
    expect(hard.deg).toBe(false); expect(hard.dir).toBe('')
  })

  it('微調按鈕和鍵盤：±0.1° 與 Shift ±1°，沒有自動吸附', async () => {
    await page.evaluate((i) => { const G = window.__chayidu; G.seed(1); G.start(i); G.select('cat') }, idx('jp'))
    const a0 = await objAngle(page, 'cat')
    await page.click('.nudge[data-d="0.1"]')
    expect((await objAngle(page, 'cat')) - a0).toBeCloseTo(0.1, 9)
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('Shift+ArrowRight')
    expect((await objAngle(page, 'cat')) - a0).toBeCloseTo(1.0, 9)
  })

  it('暫停時計時停止，繼續後恢復', async () => {
    await page.evaluate(() => { const G = window.__chayidu; G.seed(1); G.start(0) })
    await page.click('#pauseBtn')
    const t0 = (await state(page)).timeLeft
    await page.waitForTimeout(700)
    expect((await state(page)).timeLeft).toBe(t0)
    await page.click('#resumeBtn')
    await page.waitForTimeout(700)
    expect((await state(page)).timeLeft).toBeLessThan(t0 - 0.4)
  })

  it('全部對齊 → 按「完成」→ 過關畫面分數正確 → 下一關', async () => {
    await page.evaluate(() => {
      const G = window.__chayidu; G.seed(1); G.start(0)
      for (const o of G.state().objs) { G.setAngle(o.id, o.target + 0.2); G.release() }
    })
    await page.click('#doneBtn')
    await expect.poll(() => page.locator('#ovResult h2').textContent()).toContain('過關')
    const r = (await state(page)).lastResult
    await page.waitForTimeout(1100) // count-up animation
    expect(Number(await page.locator('#rTotal').textContent())).toBe(r.total)
    await page.click('#rNext')
    await expect.poll(() => page.locator('#ovIntro h2').textContent()).toBe(LV[1].title)
  })

  it('時間到 → 失敗畫面 → 馬上重來會重新倒數', async () => {
    await page.evaluate(() => { const G = window.__chayidu; G.manualClock(true); G.seed(1); G.start(0); G.advance(1000) })
    await expect.poll(() => page.locator('#ovResult h2').textContent()).toBe('時間到')
    await page.click('#rRetry')
    await page.waitForFunction(() => window.__chayidu.state().running, null, { timeout: 4000 })
    expect((await state(page)).overlays.result).toBe(false)
  })

  it('動物會動；全部轉正後畫面就靜止', async () => {
    await page.evaluate(() => { const G = window.__chayidu; G.quiet(true); G.seed(2); G.start(0) })
    const frame = () => canvasPixels(page)
    await page.waitForTimeout(200)
    const a = await frame(); await page.waitForTimeout(250); const b = await frame()
    expect(a === b, '沒轉正時動物應該在動').toBe(false)
    await page.evaluate(() => { const G = window.__chayidu; for (const o of G.state().objs) { G.setAngle(o.id, o.target); G.release() } G.select(null) })
    await page.waitForTimeout(2200) // habits ease out, the ♪ notes fade
    const c = await frame(); await page.waitForTimeout(250); const d = await frame()
    expect(c === d, '轉正後應該安靜下來').toBe(true)
  })

  it('十關畫面都有正常繪製', async () => {
    for (let i = 0; i < 10; i++) {
      await page.evaluate((i) => window.__chayidu.start(i), i)
      await page.waitForTimeout(150)
      expect(await canvasSpread(page, '#cv'), `level ${i + 1}`).toBeGreaterThan(15)
    }
  })
})

describe('版面（各種螢幕寬度不能橫向捲動、按鈕都在畫面內）', () => {
  for (const [w, h] of [[320, 568], [375, 667], [390, 844], [768, 1024], [1280, 800]]) {
    it(`${w}×${h}`, async () => {
      await context.close()
      ;({ page, context, errors } = await openGame(browser, { width: w, height: h }))
      const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(await overflow()).toBeLessThanOrEqual(0)
      await page.evaluate(() => window.__chayidu.start(2))
      await page.waitForTimeout(150)
      expect(await overflow()).toBeLessThanOrEqual(0)
      const stage = await page.locator('#cv').boundingBox()
      const done = await page.locator('#doneBtn').boundingBox()
      expect(stage.x).toBeGreaterThanOrEqual(0)
      expect(stage.x + stage.width).toBeLessThanOrEqual(w + 0.5)
      expect(done.y + done.height).toBeLessThanOrEqual(h + 0.5)
    })
  }
})
