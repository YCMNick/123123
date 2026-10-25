// Opens the game in headless Chromium with the network cut off, so tests are
// hermetic: Google Fonts never load and the game must still work offline.
import { chromium } from 'playwright'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export const GAME_FILE = path.resolve(import.meta.dirname, '../../../public/game/index.html')

export function launch() {
  return chromium.launch()
}

export async function openGame(browser, { width = 400, height = 820 } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`) })
  // Answer every external request with an empty body instead of failing it,
  // so blocked fonts don't show up as console errors.
  await page.route(/^https?:/, (route) => route.fulfill({ status: 200, contentType: 'text/css', body: '' }))
  await page.goto(pathToFileURL(GAME_FILE).href)
  await page.waitForFunction(() => window.__chayidu && window.__chayidu.api === 1)
  return { page, context, errors }
}

// Theoretical ceiling: every object perfect, the done button pressed at the
// first instant, every +2 s bonus collected, the mercy bonus active, trap kept.
export function maxScore(level, c, diffKey = 'normal') {
  const d = c.DIFFS.find((x) => x.key === diffKey)
  const n = level.objects.filter((o) => !o.trap).length
  const trap = level.objects.some((o) => o.trap) ? 200 : 0
  const time = Math.round(level.time * d.timeMul)
  return Math.round((n * 150 + (time + c.MERCY_SECS + n * c.PERFECT_BONUS) * c.TIME_PTS + trap) * d.mult)
}
