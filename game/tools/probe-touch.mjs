// Touch precision on a phone, from geometry alone (no browser needed).
// A drag turns an object by the angle the finger sweeps around the object's centre, so one
// pixel of finger movement is worth 57.3°/r at radius r. Finger lift-off and tremor move
// the touch point by about a pixel or two, which sets the precision a release can have.
//   node game/tools/probe-touch.mjs
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const PHONE = { width: 390, height: 844, dpr: 3 } // a common iPhone size
const JITTER = 1.5 // px, standard deviation of where the finger really lifts off
const erf = (x) => { const t = 1 / (1 + 0.3275911 * Math.abs(x)); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x < 0 ? -y : y }
const pWithin = (tol, sigmaDeg) => erf(tol / (sigmaDeg * Math.SQRT2)) // P(|N(0,σ)| ≤ tol)

// Stage scale on this phone: the stage is as wide as the screen allows (see layout()).
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: PHONE.width, height: PHONE.height }, deviceScaleFactor: PHONE.dpr })
await page.route(/^https?:/, (r) => r.fulfill({ status: 200, body: '' }))
await page.goto('file://' + join(root, 'public', 'game', 'index.html'))
await page.waitForFunction(() => window.__chayidu)
const { scale, levels, DIFFS } = await page.evaluate(() => { const G = window.__chayidu; G.start(0); const cv = document.querySelector('#cv'); const s = cv.getBoundingClientRect().width / G.consts.W; G.home(); return { scale: s, levels: G.levels(), DIFFS: G.consts.DIFFS } })
await browser.close()
console.log(`Phone ${PHONE.width}×${PHONE.height} @${PHONE.dpr}x · stage ${(scale * 360).toFixed(0)} px wide · 1 unit = ${scale.toFixed(2)} px · lift-off jitter σ = ${JITTER} px\n`)

for (const [label, gain] of [['quick finger (gain 1)', 1], ['slow finger: fine control (gain ¼)', 0.25]]) {
  console.log(`${label}: degrees per pixel of finger movement, and the chance one release lands inside the tolerance:`)
  console.log('radius(px)  °/px    ' + DIFFS.map((d) => `${d.key} ≤${d.tol}°`.padEnd(14)).join('') + 'perfect ≤0.1°')
  for (const r of [30, 50, 80, 120, 200, 300]) {
    const degPerPx = 180 / Math.PI / r * gain, sigma = degPerPx * JITTER
    console.log(`${String(r).padStart(6)}      ${degPerPx.toFixed(2).padStart(5)}   ` + DIFFS.map((d) => (pWithin(d.tol, sigma) * 100).toFixed(0).padStart(4) + '%'.padEnd(10)).join('') + (pWithin(0.1, sigma) * 100).toFixed(0).padStart(4) + '%')
  }
  console.log('')
}

// How far can the finger get from each object while staying on the stage?
const W = 360, H = 480
const farthest = (o) => Math.max(...[[0, 0], [W, 0], [0, H], [W, H]].map(([x, y]) => Math.hypot(x - o.x, y - o.y))) * scale
const objs = levels.flatMap((l) => l.objects.filter((o) => !o.trap).map((o) => ({ ...o, level: l.key })))
const onObject = objs.map((o) => Math.min(o.w, o.h) / 2 * scale) // a finger resting on the object itself
console.log(`\n${objs.length} objects to straighten. Radius with the finger on the object: median ${pct(onObject, 0.5).toFixed(0)} px → ${(180 / Math.PI / pct(onObject, 0.5)).toFixed(2)}°/px.`)
const far = objs.map(farthest)
console.log(`Farthest on-stage radius: median ${pct(far, 0.5).toFixed(0)} px, min ${Math.min(...far).toFixed(0)} px → best case ${(180 / Math.PI / Math.min(...far) * JITTER).toFixed(2)}° (1σ) at the worst-placed object.`)

// The "near" object: how many screen pixels does its tilt actually move?
const near = objs.filter((o) => o.near)
const disp = near.map((o) => (Math.max(o.w, o.h) / 2) * Math.sin(1 * Math.PI / 180) * scale * PHONE.dpr) // device px at 1°
console.log(`\n${near.length} near-straight objects start about 0.65°–1.4° off (normal). At 1°, their far edge is displaced by ${pct(disp, 0.5).toFixed(2)} device px (median); ${disp.filter((d) => d < 1).length} of ${near.length} move less than one device pixel.`)
function pct(xs, p) { const s = [...xs].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(p * s.length))] }
