// Balance settings for the 差一度 simulation.
//
// PROFILES are ASSUMED player models (seconds per step, residual error in
// degrees). They are not measured from real players yet; replace them with
// playtest data when you have it. All ranges are [min, max] uniform draws.
export const PROFILES = {
  // First-time player: slow to read the scene, sloppy release, rarely polishes.
  novice: { scan: [2, 4], coarse: [1.5, 3], fine: [2.5, 4.5], sigma: 0.45, polish: 0.05, polishTime: [2, 4], confirm: [0.5, 1.5], trapFooled: 0.6 },
  // Has played a few rounds.
  casual: { scan: [1, 2.5], coarse: [1, 2], fine: [1.5, 3], sigma: 0.3, polish: 0.25, polishTime: [1.5, 3], confirm: [0.3, 1], trapFooled: 0.35 },
  // Practised player chasing perfects.
  expert: { scan: [0.5, 1.5], coarse: [0.6, 1.2], fine: [0.8, 1.8], sigma: 0.15, polish: 0.7, polishTime: [1, 2], confirm: [0.2, 0.5], trapFooled: 0.1 },
}

// Design targets, checked against the simulation metrics. A failing target
// means the numbers drifted away from the intended feel, not necessarily a
// code bug: retune the game or change the target on purpose.
//   enforce: true  -> the test suite fails when the target is missed.
//   enforce: false -> known gap; reported as a warning and listed in the report.
// Each check gets (m, ctx): m['jp:casual'] etc. are simulation summaries,
// ctx = { levels, consts, maxScores }. It returns { ok, detail }.
const LV = ['jp', 'fr', 'it']
export const TARGETS = [
  { id: 'expert-clears', desc: '熟手每關勝率 ≥ 90%', enforce: true,
    check: (m) => { const r = LV.map((k) => m[`${k}:expert`].winRate); return { ok: r.every((x) => x >= 0.9), detail: r } } },
  { id: 'tutorial-friendly', desc: '第 1 關一般玩家勝率 ≥ 60%', enforce: true,
    check: (m) => ({ ok: m['jp:casual'].winRate >= 0.6, detail: m['jp:casual'].winRate }) },
  { id: 'beatable', desc: '每關一般玩家勝率 ≥ 25%', enforce: true,
    check: (m) => { const r = LV.map((k) => m[`${k}:casual`].winRate); return { ok: r.every((x) => x >= 0.25), detail: r } } },
  { id: 'skill-shows', desc: '每關平均分：熟手 > 一般 > 新手（至少高 5%）', enforce: true,
    check: (m) => { const r = LV.map((k) => [m[`${k}:novice`].meanScore, m[`${k}:casual`].meanScore, m[`${k}:expert`].meanScore].map(Math.round));
      return { ok: r.every(([n, c, e]) => e >= c * 1.05 && c >= n * 1.05), detail: r } } },
  { id: 'three-stars-reachable', desc: '熟手每關至少 10% 拿到三星', enforce: true,
    check: (m) => { const r = LV.map((k) => m[`${k}:expert`].stars[3]); return { ok: r.every((x) => x >= 0.1), detail: r } } },
  { id: 'perfect-economy', desc: '一次完美的價值換算成秒數，介於 1.5～8 秒', enforce: true,
    check: (m, { consts: c }) => { const s = (50 + c.PERFECT_BONUS * c.TIME_PTS) / c.TIME_PTS; return { ok: s >= 1.5 && s <= 8, detail: s } } },
  { id: 'score-ceiling', desc: '每關理論最高分介於 500～5000', enforce: true,
    check: (m, { maxScores }) => ({ ok: maxScores.every((x) => x >= 500 && x <= 5000), detail: maxScores }) },
  // Known gaps found by the first calibration run (2026-10-25):
  { id: 'difficulty-curve', desc: '難度遞增：一般玩家勝率逐關不上升（容許 +3%）', enforce: false,
    check: (m) => { const r = LV.map((k) => m[`${k}:casual`].winRate); return { ok: r[1] <= r[0] + 0.03 && r[2] <= r[1] + 0.03, detail: r } } },
  { id: 'afk-scores-nothing', desc: '掛機不動直到時間到，應該 0 分', enforce: false,
    check: (m, { idle }) => ({ ok: idle.every((r) => r.total === 0), detail: idle.map((r) => r.total) }) },
  { id: 'first-timer-chance', desc: '新手在第 1 關也有 ≥ 30% 機會過關', enforce: false,
    check: (m) => ({ ok: m['jp:novice'].winRate >= 0.3, detail: m['jp:novice'].winRate }) },
]

// How far a re-run may drift from tests/game/baseline.json before it counts
// as a regression. Refresh the baseline with `npm run test:game:baseline`.
export const BASELINE_TOLERANCE = { winRate: 0.08, meanScoreRatio: 0.12 }
