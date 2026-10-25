// 極端操作：亂點、亂拖、狂按、快速切換畫面、極端數值。
// 每一步之後都檢查狀態沒有壞掉（沒有 NaN、計時不會負、畫面不會同時開兩個視窗）。
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import { launch, openGame } from './helpers/browser.js'
import { state } from './helpers/ui.js'

const ACTIONS = Number(process.env.GAME_FUZZ_ACTIONS || 300)
const SESSIONS = 4

let browser, page, context, errors
beforeAll(async () => { browser = await launch() })
afterAll(async () => { await browser?.close() })
beforeEach(async () => { ({ page, context, errors } = await openGame(browser)) })
afterEach(async () => { await context.close() })

function rng(seed) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

async function checkInvariants(page, label) {
  const s = await state(page)
  const problems = []
  if (!Number.isFinite(s.timeLeft) || s.timeLeft < 0) problems.push(`timeLeft ${s.timeLeft}`)
  if (s.screen === 'game' && !(s.zen ? s.timerText === '∞' : /^\d+(\.\d)?$/.test(s.timerText))) problems.push(`timer text "${s.timerText}"`)
  for (const o of s.objs) if (!Number.isFinite(o.angle) || o.angle <= -180 - 1e-9 || o.angle > 180 + 1e-9) problems.push(`${o.id} angle ${o.angle}`)
  const open = Object.entries(s.overlays).filter(([, v]) => v).map(([k]) => k)
  if (open.length > 1) problems.push(`overlays ${open.join('+')}`)
  if (s.aligned > s.required) problems.push('aligned > required')
  if (s.running && s.ended) problems.push('running and ended')
  if (s.running && s.screen !== 'game') problems.push('running on home screen')
  if (s.overlays.result && s.running) problems.push('result shown while running')
  if (errors.length) problems.push(...errors)
  if (problems.length) throw new Error(`${label}: ${problems.join('; ')}`)
}

describe('亂數操作風暴', () => {
  for (let session = 1; session <= SESSIONS; session++) {
    it(`第 ${session} 輪：${ACTIONS} 個隨機操作後狀態仍正常`, async () => {
      const rand = rng(1000 + session)
      const pick = (xs) => xs[Math.floor(rand() * xs.length)]
      await page.evaluate(() => { window.__chayidu.manualClock(true); window.__chayidu.quiet(true) })
      const log = []
      for (let i = 0; i < ACTIONS; i++) {
        const s = await state(page)
        const visible = async (sel) => page.locator(sel).first().isVisible().catch(() => false)
        let action
        if (s.overlays.lock) action = 'lockLater'
        else if (s.overlays.chapter) action = pick(['sheetPlay', 'sheetPlay', 'sheetClose'])
        else if (s.screen === 'home') action = pick(['card', 'card', 'start', 'tilt', 'diff', 'lang', 'audio', 'zen'])
        else if (s.overlays.result) action = pick(['result', 'result', 'key'])
        else if (s.overlays.pause) action = pick(['pauseMenu', 'pauseMenu', 'key', 'pauseAudio'])
        else if (s.overlays.intro) action = pick(['go', 'go', 'introHome'])
        else action = pick(['drag', 'drag', 'drag', 'tap', 'nudge', 'nudge', 'key', 'done', 'clock', 'clock', 'pause', 'resize', 'music'])
        log.push(action)
        const vw = page.viewportSize()
        switch (action) {
          case 'card': await page.click(`.lv:nth-child(${1 + Math.floor(rand() * 10)})`); break
          case 'sheetPlay': if (rand() < 0.5) await page.click('#sheetPlay'); else await page.click(`#ovChapter .stages li:nth-child(${1 + Math.floor(rand() * 10)})`); break
          case 'lang': await page.click(`#langSeg button[data-v="${pick(['zh', 'en'])}"]`); break
          case 'audio': await page.click(`#${pick(['musicSeg', 'soundSeg'])} button[data-v="${pick(['0', '1'])}"]`); break
          case 'pauseAudio': await page.click(`#${pick(['pMusicSeg', 'pSoundSeg'])} button[data-v="${pick(['0', '1'])}"]`); break
          case 'music': await page.click('#musicBtn'); break
          case 'zen': await page.click(`#zenSeg button[data-v="${pick(['0', '1'])}"]`); break
          case 'lockLater': await page.click('#lockLater'); break
          case 'diff': await page.click(`#diff-${pick(['easy', 'normal', 'hard'])}`); break
          case 'sheetClose': await page.click('#sheetClose'); break
          case 'start': await page.click('#startBtn'); break
          case 'tilt': { const b = await page.locator('#tilt').boundingBox(); await page.mouse.move(b.x + rand() * b.width, b.y + rand() * b.height); await page.mouse.down(); await page.mouse.move(b.x + rand() * 200, b.y + rand() * 200, { steps: 3 }); await page.mouse.up(); break }
          case 'go': await page.click('#goBtn'); if (rand() < 0.5) await page.waitForTimeout(2500); break
          case 'introHome': await page.click('#introHome'); break
          case 'result': { const ids = ['#rNext', '#rRetry', '#rHome', '#rFirst']; const avail = []; for (const id of ids) if (await visible(id)) avail.push(id); await page.click(pick(avail)); break }
          case 'pauseMenu': await page.click(pick(['#resumeBtn', '#resumeBtn', '#restartBtn', '#quitBtn'])); break
          case 'drag': {
            const b = await page.locator('#cv').boundingBox()
            await page.mouse.move(b.x + rand() * b.width, b.y + rand() * b.height)
            await page.mouse.down()
            const n = 1 + Math.floor(rand() * 10)
            for (let k = 0; k < n; k++) await page.mouse.move(b.x + (rand() * 1.4 - 0.2) * b.width, b.y + (rand() * 1.4 - 0.2) * b.height)
            await page.mouse.up()
            break
          }
          case 'tap': { const b = await page.locator('#cv').boundingBox(); await page.mouse.click(b.x + rand() * b.width, b.y + rand() * b.height); break }
          case 'nudge': await page.click(`.nudge:nth-child(${1 + Math.floor(rand() * 4)})`); break
          case 'key': await page.keyboard.press(pick(['ArrowLeft', 'ArrowRight', 'Shift+ArrowLeft', 'Shift+ArrowRight', 'Escape', 'Enter', 'Space'])); break
          case 'done': await page.click('#doneBtn', { force: true }); break
          case 'clock': await page.evaluate((sec) => window.__chayidu.advance(sec), rand() * 8); break
          case 'pause': await page.click('#pauseBtn'); break
          case 'resize': await page.setViewportSize(pick([{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 1024, height: 700 }, vw])); break
        }
        await checkInvariants(page, `session ${session}, step ${i} (${action}); last actions: ${log.slice(-6).join(' → ')}`)
      }
    })
  }
})

describe('極端數值與連打', () => {
  it('超大、超小角度與上萬次微調後，角度仍是合法數字', async () => {
    await page.evaluate(() => {
      const G = window.__chayidu
      G.quiet(true); G.seed(9); G.start(G.levels().findIndex((l) => l.key === 'it'))
      for (const o of G.state().objs) { G.rotate(o.id, 1e9); G.rotate(o.id, -1e9); G.rotate(o.id, 123456.789) }
      for (let k = 0; k < 10000; k++) G.rotate('shL', 1e-7)
      G.select('gelato')
      for (let k = 0; k < 2000; k++) G.nudge(k % 2 ? 1 : -0.1)
      G.release()
    })
    await checkInvariants(page, 'extreme rotations')
  })

  it('一次拖曳中 600 次滑鼠移動，第二根手指同時按下會被忽略', async () => {
    await page.evaluate(() => { const G = window.__chayidu; G.quiet(true); G.seed(1); G.start(G.levels().findIndex((l) => l.key === 'jp')) })
    const b = await page.locator('#cv').boundingBox(), s = b.width / 360
    await page.mouse.move(b.x + 230 * s, b.y + 268 * s)
    await page.mouse.down()
    for (let k = 0; k < 600; k++) await page.mouse.move(b.x + (180 + 60 * Math.cos(k / 15)) * s, b.y + (268 + 60 * Math.sin(k / 15)) * s)
    const before = (await state(page)).objs.map((o) => o.angle)
    await page.evaluate(() => {
      const cv = document.querySelector('#cv'), r = cv.getBoundingClientRect()
      cv.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 99, clientX: r.left + 80 * r.width / 360, clientY: r.top + 400 * r.width / 360, bubbles: true }))
      cv.dispatchEvent(new PointerEvent('pointermove', { pointerId: 99, clientX: r.left + 10, clientY: r.top + 10, bubbles: true }))
    })
    expect((await state(page)).objs.map((o) => o.angle)).toEqual(before)
    await page.mouse.up()
    await checkInvariants(page, 'pointer storm')
  })

  it('倒數中途回首頁或切換關卡 50 次，不會有殘留的倒數把遊戲偷偷開始', async () => {
    await page.evaluate(() => {
      const G = window.__chayidu
      for (let k = 0; k < 50; k++) { G.start(k % 10, { instant: false }); if (k % 2) G.home() }
      G.start(1, { instant: false }); G.start(2, { instant: true }); G.home()
    })
    await page.waitForTimeout(3000)
    const s = await state(page)
    expect(s.screen).toBe('home')
    expect(s.running).toBe(false)
    await checkInvariants(page, 'countdown abuse')
  })

  it('完成鍵連按 20 次只結算一次', async () => {
    await page.evaluate(() => {
      const G = window.__chayidu
      G.quiet(true); G.seed(1); G.start(0)
      for (const o of G.state().objs) { G.setAngle(o.id, o.target); G.release() }
    })
    for (let k = 0; k < 20; k++) await page.click('#doneBtn', { force: true })
    const s = await state(page)
    expect(s.session[0]).toBe(s.lastResult.total)
    expect(s.overlays.result).toBe(true)
    await checkInvariants(page, 'double finish')
  })
})
