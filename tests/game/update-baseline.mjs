// Regenerates tests/game/baseline.json from a fresh simulation.
// Run it only after you have decided the current balance is the new normal:
//   npm run test:game:baseline
import fs from 'node:fs'
import { launch, openGame } from './helpers/browser.js'
import { runAll } from './helpers/sim.js'
import { BASELINE_FILE, roundMetrics } from './helpers/report.js'

const runs = Number(process.env.GAME_SIM_RUNS || 500)
const browser = await launch()
const { page, errors } = await openGame(browser)
const { metrics } = await runAll(page, { runs })
await browser.close()
if (errors.length) { console.error(errors); process.exit(1) }
fs.writeFileSync(BASELINE_FILE, JSON.stringify({ runs, seed: 1, metrics: roundMetrics(metrics) }, null, 2) + '\n')
console.log(`Baseline written: ${BASELINE_FILE} (${runs} runs per level × profile)`)
