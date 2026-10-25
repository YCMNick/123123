// Regenerates tests/game/baseline.json from a fresh simulation.
// Run it only after you have decided the current balance is the new normal:
//   npm run test:game:baseline
import fs from 'node:fs'
import { launch, openGames, SIM_PAGES } from './helpers/browser.js'
import { runAll } from './helpers/sim.js'
import { BASELINE_FILE, roundMetrics } from './helpers/report.js'

const runs = Number(process.env.GAME_SIM_RUNS || 60)
const browser = await launch()
const { pages, errors } = await openGames(browser, SIM_PAGES)
const { metrics } = await runAll(pages, { runs })
await browser.close()
if (errors.length) { console.error(errors); process.exit(1) }
fs.writeFileSync(BASELINE_FILE, JSON.stringify({ runs, seed: 1, metrics: roundMetrics(metrics) }, null, 2) + '\n')
console.log(`Baseline written: ${BASELINE_FILE} (${runs} runs per difficulty × level × profile)`)
