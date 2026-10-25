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
  it('點大關卡片會列出 10 個小關，每一關都能直接點來玩', async () => {
    await page.click('.lv:nth-child(6)')
    await expect.poll(() => page.locator('#ovChapter').isVisible()).toBe(true)
    expect(await page.locator('#ovChapter h2').textContent()).toBe('極地冰原')
    expect(await page.locator('#ovChapter .stages li.play').count()).toBe(10)
    expect(await page.locator('#ovChapter .stages li.next b').textContent()).toBe('6-1')
    await page.click('#ovChapter .stages li:nth-child(4)')
    await expect.poll(() => page.locator('#ovIntro h2').textContent()).toBe(LV[53].title)
    await page.click('#introHome')
    await page.click('.lv:nth-child(6)')
    await page.click('#sheetPlay')
    await expect.poll(() => page.locator('#ovIntro h2').textContent()).toBe('極光夜')
  })
  it('過關後首頁顯示進度，「開始」變成「繼續」下一個沒過的小關', async () => {
    await page.evaluate(() => {
      const G = window.__chayidu; G.quiet(true)
      for (const i of [0, 1]) { G.seed(1); G.start(i); for (const o of G.state().objs) { G.setAngle(o.id, o.target); G.release() } G.done() }
      G.home()
    })
    expect(await page.locator('.lv:nth-child(1) .prog').textContent()).toContain('已過 2/10')
    expect(await page.locator('#startBtn').textContent()).toBe('繼續 1-3')
    await page.click('#startBtn')
    await expect.poll(() => page.locator('#ovIntro h2').textContent()).toBe(LV[2].title)
  })
  it('難度可以切換、會記住，時間跟著改', async () => {
    expect(await page.locator('.diff[aria-checked="true"] b').textContent()).toBe('忍不住伸手')
    await page.click('#diff-easy')
    expect(await page.locator('.diff[aria-checked="true"] b').textContent()).toBe('看到會歪頭')
    await page.click('.lv:nth-child(1)')
    expect(await page.locator('#ovChapter .stages li:nth-child(1) > span').textContent()).toContain(`${Math.round(LV[0].time * 1.35) * 2} 秒`)
    await page.click('#sheetClose')
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('chayidu.v3')).diff)).toBe('easy')
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
    expect(await page.locator('#goBtn').textContent()).toContain(`${LV[0].time * 2} 秒`)
    expect(await page.locator('#ovIntro .tips').textContent()).toContain('練習關')
    await page.click('#goBtn')
    await expect.poll(() => page.locator('#count').textContent()).toBe('3')
    expect((await state(page)).running).toBe(false)
    await page.waitForFunction(() => window.__chayidu.state().running, null, { timeout: 4000 })
    await page.waitForTimeout(1200)
    expect((await state(page)).timeLeft).toBeLessThan(LV[0].time * 2 - 0.5)
  })

  it('拖曳旋轉會出現放大鏡，度數與實際誤差一致', async () => {
    await page.evaluate((i) => { const G = window.__chayidu; G.seed(1); G.start(i) }, idx('jp'))
    const before = await objAngle(page, 'torii')
    const p = await canvasPoint(page, 230, 268)
    await page.mouse.move(p.x, p.y)
    await page.mouse.down()
    const q = await canvasPoint(page, 230, 290)
    await page.mouse.move(q.x, q.y, { steps: 3 }) // a quick flick: full 1:1 turning
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
    expect(await page.locator('#ovResult .say-h').textContent()).toBe(r.comment.headline)
    expect(await page.locator('#ovResult .say-b').textContent()).toBe(r.comment.line)
    expect(await page.locator('#ovResult .say-by').textContent()).toBe('— 母雞')
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

  it('100 關畫面都有正常繪製', async () => {
    for (let i = 0; i < LV.length; i++) {
      await page.evaluate((i) => window.__chayidu.start(i), i)
      await page.waitForTimeout(60)
      expect(await canvasSpread(page, '#cv'), `level ${i + 1}`).toBeGreaterThan(15)
    }
  })
})

describe('第一次玩', () => {
  it('第一次打開會先問「你有多在意」，簡單被推薦；選了就不再問', async () => {
    await context.close()
    ;({ page, context, errors } = await openGame(browser, { firstRun: true }))
    expect((await state(page)).overlays.first).toBe(true)
    expect(await page.locator('#ovFirst .diff[aria-checked="true"] b').textContent()).toContain('看到會歪頭')
    await page.click('#ovFirst .diff:nth-child(1)')
    expect((await state(page)).overlays.first).toBe(false)
    expect(await page.locator('#diffs .diff[aria-checked="true"] b').textContent()).toBe('看到會歪頭')
    await page.reload()
    await page.waitForFunction(() => window.__chayidu)
    expect((await state(page)).overlays.first).toBe(false)
    expect(await page.locator('#diffs .diff[aria-checked="true"] b').textContent()).toBe('看到會歪頭')
  })
  it('同一關連輸兩次，結算畫面出現「改用簡單再試」，按了直接用簡單重來', async () => {
    await page.evaluate((i) => { const G = window.__chayidu; G.quiet(true); G.manualClock(true); G.resetProgress(); for (let k = 0; k < 2; k++) { G.seed(k); G.start(i); G.advance(1000) } }, idx('jp'))
    await expect.poll(() => page.locator('#rEasy').isVisible()).toBe(true)
    await page.click('#rEasy')
    await page.waitForFunction(() => window.__chayidu.state().running, null, { timeout: 4000 })
    expect((await state(page)).diff).toBe('easy')
    expect((await state(page)).key).toBe('jp')
  })
  it('卡住 8 秒沒進度，還歪著的物品會亮起來', async () => {
    await page.evaluate(() => { const G = window.__chayidu; G.seed(1); G.start(0) })
    expect((await state(page)).stalled).toBe(false)
    await page.waitForTimeout(8500)
    expect((await state(page)).stalled).toBe(true)
    await page.evaluate(() => { const G = window.__chayidu; G.setAngle('cow', 0); G.release() })
    expect((await state(page)).stalled).toBe(false)
  })
})

describe('帳號與解鎖', () => {
  it('沒有設定 Firebase 時，帳號區塊不顯示；網頁版全部關卡都開放', async () => {
    expect(await page.locator('#accountSect').isVisible()).toBe(false)
    expect(await page.evaluate(() => window.__chayidu.levels().every((l, i) => window.__chayidu.unlocked(i)))).toBe(true)
  })
  it('App 規則：第 1 大關和每個大關的第 1 小關免費，其他上鎖；點上鎖的關卡出現完整版說明，不會開始', async () => {
    await page.evaluate(() => window.__chayidu.setFreeAll(false))
    const open = await page.evaluate(() => window.__chayidu.levels().map((l, i) => window.__chayidu.unlocked(i)))
    expect(open.filter(Boolean).length).toBe(10 + 9)
    expect(open.slice(0, 11)).toEqual(Array(11).fill(true))
    expect(open[11]).toBe(false)
    await page.click('.lv:nth-child(2)')
    expect(await page.locator('#ovChapter .stages li.locked').count()).toBe(9)
    await page.click('#ovChapter .stages li:nth-child(2)')
    expect((await state(page)).overlays.lock).toBe(true)
    expect((await state(page)).screen).toBe('home')
    expect(await page.locator('#lockBuy').textContent()).toContain('USD 4.99')
    await page.click('#lockLater')
    expect((await state(page)).overlays.lock).toBe(false)
    await page.evaluate(() => window.__chayidu.setFreeAll(true))
  })
})

describe('舊版存檔', () => {
  it('v2（只有 10 關、用編號存）的最佳紀錄會搬到 v3，不會歸零', async () => {
    await page.evaluate(() => {
      localStorage.removeItem('chayidu.v3')
      localStorage.setItem('chayidu.v2', JSON.stringify({ nick: 'Nick', sound: false, diff: 'easy', best: { 'normal:0': { score: 1234, stars: 3 }, 'easy:5': { score: 500, stars: 2 } } }))
    })
    await page.reload()
    await page.waitForFunction(() => window.__chayidu)
    expect(await page.locator('#nick').inputValue()).toBe('Nick')
    expect(await page.locator('.diff[aria-checked="true"] b').textContent()).toBe('看到會歪頭')
    expect(await page.locator('.lv:nth-child(6) .prog').textContent()).toContain('已過 1/10')
    await page.click('#diff-normal')
    expect(await page.locator('.lv:nth-child(1) .prog').textContent()).toContain('★ 3/30')
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('chayidu.v3')).best)).toEqual({ 'normal:farm': { score: 1234, stars: 3 }, 'easy:polar': { score: 500, stars: 2 } })
  })
})

describe('設定：中英切換、背景音樂與音效分開開關', () => {
  it('切到 English：首頁、關卡、結算全部是英文，重新整理後記得', async () => {
    await page.click('#langSeg button[data-v="en"]')
    expect(await page.evaluate(() => [document.documentElement.lang, document.title])).toEqual(['en', 'Just One Degree'])
    expect(await page.locator('#title').textContent()).toBe('Just One Degree')
    const cjk = /[\u3400-\u9fff]/
    const homeText = (await page.locator('#home').innerText()).replace('中文', '')
    expect(homeText.match(/.{0,12}[\u3400-\u9fff].{0,12}/)?.[0] ?? null).toBe(null)
    expect(await page.locator('.diff[aria-checked="true"] b').textContent()).toBe('Itchy Fingers')
    await page.reload()
    await page.waitForFunction(() => window.__chayidu)
    expect(await page.locator('#title').textContent()).toBe('Just One Degree')
    await page.click('#startBtn')
    expect(await page.locator('#ovIntro h2').textContent()).toBe(LV[0].titles.en)
    expect(cjk.test(await page.locator('#ovIntro').innerText())).toBe(false)
    await page.evaluate((i) => { const G = window.__chayidu; G.quiet(true); G.seed(1); G.start(i); for (const o of G.state().objs) if (!o.trap) { G.setAngle(o.id, o.target); G.release() } }, idx('it'))
    expect(cjk.test(await page.locator('#game').innerText())).toBe(false)
    await page.click('#doneBtn')
    await expect.poll(() => page.locator('#ovResult h2').textContent()).toBe('Cleared!')
    const res = await page.locator('#ovResult').innerText()
    expect(res.match(/.{0,12}[\u3400-\u9fff].{0,12}/)?.[0] ?? null).toBe(null)
    expect(res).toContain('The Leaning Tower is meant to lean')
    await page.click('#rHome')
    await page.click('#langSeg button[data-v="zh"]')
    expect(await page.locator('#title').textContent()).toBe('差一度')
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('zh-Hant')
  })
  it('英文模式下，100 關畫布上沒有殘留的中文字（在地招牌除外）', async () => {
    const left = await page.evaluate(() => {
      const G = window.__chayidu, seen = new Set(), f = CanvasRenderingContext2D.prototype.fillText
      CanvasRenderingContext2D.prototype.fillText = function (t, ...a) { seen.add(String(t)); return f.call(this, t, ...a) }
      G.setLang('en')
      G.levels().forEach((l, i) => { G.scene(i, { scale: 0.5 }); G.scene(i, { scale: 0.5, aligned: true }) })
      CanvasRenderingContext2D.prototype.fillText = f
      const local = G.localText()
      G.setLang('zh')
      return [...seen].filter((t) => /[\u3400-\u9fff]/.test(t) && !local.includes(t))
    })
    expect(left).toEqual([])
  })
  it('背景音樂和音效各自開關、互不影響；首頁和暫停選單同步；會記住', async () => {
    const audio = async () => (await state(page)).audio
    expect(await audio()).toEqual({ music: true, sound: true })
    await page.click('#musicSeg button[data-v="0"]')
    expect(await audio()).toEqual({ music: false, sound: true })
    await page.click('#soundSeg button[data-v="0"]')
    expect(await audio()).toEqual({ music: false, sound: false })
    await page.click('#musicSeg button[data-v="1"]')
    expect(await audio()).toEqual({ music: true, sound: false })
    await page.reload()
    await page.waitForFunction(() => window.__chayidu)
    expect(await audio()).toEqual({ music: true, sound: false })
    expect(await page.locator('#soundSeg button[data-v="0"]').getAttribute('aria-checked')).toBe('true')
    await page.evaluate(() => { const G = window.__chayidu; G.seed(1); G.start(0) })
    await page.click('#musicBtn')
    expect(await audio()).toEqual({ music: false, sound: false })
    expect(await page.locator('#musicBtn').getAttribute('class')).toContain('off')
    await page.click('#pauseBtn')
    expect(await page.locator('#pMusicSeg button[data-v="0"]').getAttribute('aria-checked')).toBe('true')
    await page.click('#pSoundSeg button[data-v="1"]')
    expect(await audio()).toEqual({ music: false, sound: true })
    await page.click('#resumeBtn')
    expect((await state(page)).running).toBe(true)
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
