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
// m = { easy: {...}, normal: {...}, hard: {...} }; each maps 'farm:casual' etc. to a summary.
const keys = (ctx) => ctx.levels.map((l) => l.key)
const rates = (m, ctx, who, diff = 'normal') => keys(ctx).map((k) => m[diff][`${k}:${who}`].winRate)
const DIFFS = ['easy', 'normal', 'hard']
export const TARGETS = [
  // ---- normal (忍不住伸手) ----
  { id: 'expert-clears', desc: '普通：熟手每關勝率 ≥ 90%', enforce: true,
    check: (m, ctx) => { const r = rates(m, ctx, 'expert'); return { ok: r.every((x) => x >= 0.9), detail: r } } },
  { id: 'tutorial-friendly', desc: '普通：第 1 關一般玩家勝率 ≥ 90%', enforce: true,
    check: (m, ctx) => { const r = rates(m, ctx, 'casual')[0]; return { ok: r >= 0.9, detail: r } } },
  { id: 'onboarding', desc: '普通：新手前 3 關勝率分別 ≥ 35% / 15% / 7%', enforce: true,
    check: (m, ctx) => { const r = rates(m, ctx, 'novice').slice(0, 3); return { ok: r[0] >= 0.35 && r[1] >= 0.15 && r[2] >= 0.07, detail: r } } },
  { id: 'beatable', desc: '普通：每關一般玩家勝率 ≥ 50%', enforce: true,
    check: (m, ctx) => { const r = rates(m, ctx, 'casual'); return { ok: r.every((x) => x >= 0.5), detail: r } } },
  // Inside a world each stage is at least as hard as the one before, and each world's
  // first stage is at least as hard as the previous world's first stage. A stage may
  // only look easier by more than 3 points plus sampling noise (1.5 standard errors).
  { id: 'difficulty-curve', desc: '普通：一般玩家勝率在每個大關內逐關不上升，各大關第 1 關也逐關不上升（容許 3% ＋ 抽樣誤差）', enforce: true,
    check: (m, ctx) => {
      const r = rates(m, ctx, 'casual'), L = ctx.levels
      const slack = (a, b) => 0.03 + 1.5 * Math.sqrt((a * (1 - a) + b * (1 - b)) / ctx.runs)
      const prev = (i) => L[i].stage > 0 ? i - 1 : L.findLastIndex((l, j) => j < i && l.stage === 0)
      const bad = r.map((x, i) => [i, prev(i)]).filter(([i, p]) => p >= 0 && r[i] > r[p] + slack(r[i], r[p])).map(([i, p]) => `${L[i].key} ${r[i].toFixed(2)} > ${L[p].key} ${r[p].toFixed(2)}`)
      return { ok: !bad.length, detail: bad }
    } },
  { id: 'skill-shows', desc: '普通：每關平均分 熟手 > 一般 > 新手（至少高 5%）', enforce: true,
    check: (m, ctx) => { const r = keys(ctx).map((k) => ['novice', 'casual', 'expert'].map((w) => Math.round(m.normal[`${k}:${w}`].meanScore)));
      return { ok: r.every(([n, c, e]) => e >= c * 1.05 && c >= n * 1.05), detail: r } } },
  { id: 'three-stars-reachable', desc: '普通：熟手每關至少 10% 拿到三星', enforce: true,
    check: (m, ctx) => { const r = keys(ctx).map((k) => m.normal[`${k}:expert`].stars[3]); return { ok: r.every((x) => x >= 0.1), detail: r } } },
  // ---- easy (看到會歪頭) ----
  { id: 'easy-comfortable', desc: '簡單：新手每關勝率 ≥ 75%（給覺得太難的人）', enforce: true,
    check: (m, ctx) => { const r = rates(m, ctx, 'novice', 'easy'); return { ok: r.every((x) => x >= 0.75), detail: r } } },
  // ---- hard (不轉正睡不著) ----
  { id: 'hard-for-experts', desc: '困難：熟手每關勝率 ≥ 85%', enforce: true,
    check: (m, ctx) => { const r = rates(m, ctx, 'expert', 'hard'); return { ok: r.every((x) => x >= 0.85), detail: r } } },
  { id: 'hard-is-harder', desc: '困難：一般玩家平均勝率比普通低至少 30 個百分點', enforce: true,
    check: (m, ctx) => { const avg = (d) => rates(m, ctx, 'casual', d).reduce((a, b) => a + b, 0) / ctx.levels.length; const r = [avg('normal'), avg('hard')]; return { ok: r[0] - r[1] >= 0.3, detail: r } } },
  // ---- all difficulties ----
  { id: 'difficulty-order', desc: '每關每種玩家：簡單 ≥ 普通 ≥ 困難（勝率，容許 3%）', enforce: true,
    check: (m, ctx) => { const bad = []; for (const k of keys(ctx)) for (const w of ['novice', 'casual', 'expert']) { const [e, n, h] = DIFFS.map((d) => m[d][`${k}:${w}`].winRate); if (e < n - 0.03 || n < h - 0.03) bad.push(`${k}:${w}`) } return { ok: !bad.length, detail: bad } } },
  { id: 'afk-scores-nothing', desc: '三種難度掛機到時間到，每關都是 0 分', enforce: true,
    check: (m, { idle }) => ({ ok: idle.every((r) => r.total === 0), detail: idle.map((r) => r.total) }) },
  { id: 'perfect-economy', desc: '一次完美的價值換算成秒數，介於 1.5～8 秒', enforce: true,
    check: (m, { consts: c }) => { const s = (50 + c.PERFECT_BONUS * c.TIME_PTS) / c.TIME_PTS; return { ok: s >= 1.5 && s <= 8, detail: s } } },
  { id: 'score-ceiling', desc: '三種難度每關理論最高分介於 500～6000', enforce: true,
    check: (m, { maxScores }) => { const all = Object.values(maxScores).flat(); return { ok: all.every((x) => x >= 500 && x <= 6000), detail: maxScores } } },
]

// How far a re-run may drift from tests/game/baseline.json before it counts
// as a regression. Refresh the baseline with `npm run test:game:baseline`.
export const BASELINE_TOLERANCE = { winRate: 0.08, meanScoreRatio: 0.12 }
