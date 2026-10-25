// Small helpers for driving the game through real mouse/keyboard input.
export async function canvasPoint(page, x, y) {
  const r = await page.locator('#cv').boundingBox()
  const s = r.width / 360
  return { x: r.x + x * s, y: r.y + y * s }
}

export const state = (page) => page.evaluate(() => window.__chayidu.state())

export const objAngle = async (page, id) => (await state(page)).objs.find((o) => o.id === id).angle

// Standard deviation of sampled pixel brightness; ~0 means the canvas is blank.
export function canvasSpread(page, selector) {
  return page.evaluate((sel) => {
    const c = document.querySelector(sel), x = c.getContext('2d')
    const d = x.getImageData(0, 0, c.width, c.height).data
    let n = 0, sum = 0, sq = 0
    for (let i = 0; i < d.length; i += 4 * 97) { const v = (d[i] + d[i + 1] + d[i + 2]) / 3; n++; sum += v; sq += v * v }
    const mean = sum / n
    return Math.sqrt(sq / n - mean * mean)
  }, selector)
}

export const fmtDeg = (e) => { const a = Math.abs(e); return (a < 1 ? a.toFixed(2) : a.toFixed(1)) + '°' }
