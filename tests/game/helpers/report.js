// Shared by the simulation test and the baseline script: evaluates targets,
// compares with the baseline and writes a readable report.
import fs from 'node:fs'
import path from 'node:path'
import { TARGETS, BASELINE_TOLERANCE } from '../balance.config.js'

export const BASELINE_FILE = path.resolve(import.meta.dirname, '../baseline.json')
export const REPORT_DIR = path.resolve(import.meta.dirname, '../../../test-results/game-sim')

export function evaluateTargets(metrics, ctx) {
  return TARGETS.map((t) => ({ id: t.id, desc: t.desc, enforce: t.enforce, ...t.check(metrics, ctx) }))
}

export function compareBaseline(metrics, baseline) {
  const diffs = []
  for (const [key, b] of Object.entries(baseline.metrics)) {
    const m = metrics[key]
    if (!m) { diffs.push({ key, problem: 'missing in this run' }); continue }
    const dWin = m.winRate - b.winRate
    const ratio = b.meanScore ? m.meanScore / b.meanScore : 1
    const ok = Math.abs(dWin) <= BASELINE_TOLERANCE.winRate && Math.abs(ratio - 1) <= BASELINE_TOLERANCE.meanScoreRatio
    diffs.push({ key, ok, winRate: [b.winRate, m.winRate], meanScore: [Math.round(b.meanScore), Math.round(m.meanScore)] })
  }
  return diffs
}

const f2 = (x) => (typeof x === 'number' ? (Math.abs(x) < 10 ? x.toFixed(2) : Math.round(x)) : JSON.stringify(x))

export function writeReport({ runs, metrics, targets, baselineDiffs, maxScores, levels }) {
  fs.mkdirSync(REPORT_DIR, { recursive: true })
  const lines = [`# 差一度 數值模擬報告`, '', `每個「關卡 × 玩家類型」模擬 ${runs} 局。`, '']
  lines.push('| 關卡:玩家 | 勝率 | 平均分 | P10 / P50 / P90 | 過關時平均剩秒 | 星數分布 0/1/2/3 | 扶正斜塔 |', '|---|---|---|---|---|---|---|')
  for (const [k, m] of Object.entries(metrics)) {
    lines.push(`| ${k} | ${(m.winRate * 100).toFixed(1)}% | ${Math.round(m.meanScore)} | ${m.p10} / ${m.p50} / ${m.p90} | ${m.meanSecsLeftOnWin.toFixed(1)} | ${m.stars.map((x) => (x * 100).toFixed(0) + '%').join(' / ')} | ${(m.trapStraightened * 100).toFixed(0)}% |`)
  }
  lines.push('', '理論最高分：' + levels.map((l, i) => `${l.key} ${maxScores[i]}`).join('、'), '', '## 設計目標', '')
  for (const t of targets) lines.push(`- ${t.ok ? '✅' : t.enforce ? '❌' : '⚠️'} ${t.desc}${t.enforce ? '' : '（未強制）'}：${f2(t.detail)}`)
  if (baselineDiffs) {
    lines.push('', '## 與基準線比較', '')
    for (const d of baselineDiffs) lines.push(`- ${d.ok ? '✅' : '❌'} ${d.key}：勝率 ${d.winRate ? d.winRate.map((x) => (x * 100).toFixed(1) + '%').join(' → ') : d.problem}，平均分 ${d.meanScore ? d.meanScore.join(' → ') : ''}`)
  }
  fs.writeFileSync(path.join(REPORT_DIR, 'report.md'), lines.join('\n') + '\n')
  fs.writeFileSync(path.join(REPORT_DIR, 'metrics.json'), JSON.stringify({ runs, metrics, targets, baselineDiffs }, null, 2))
  return path.join(REPORT_DIR, 'report.md')
}

export function roundMetrics(metrics) {
  const r = (x) => (Array.isArray(x) ? x.map(r) : typeof x === 'number' ? Math.round(x * 10000) / 10000 : x)
  return Object.fromEntries(Object.entries(metrics).map(([k, m]) => [k, Object.fromEntries(Object.entries(m).map(([a, v]) => [a, r(v)]))]))
}
