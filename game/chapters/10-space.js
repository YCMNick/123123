// 第 10 大關 夜空宇宙 / World 10: Night Sky (Synthwave space).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 10-1 Orbital station: synthwave space ===== */
function bgSpace(c) {
  const R = mulberry(33);
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#07081a'); g.addColorStop(0.6, '#1d0c3a'); g.addColorStop(1, '#0b1630');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 6; i++) {
    const x = R() * W, y = R() * 300, r = 50 + R() * 80;
    const rg = c.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(${R() < 0.5 ? '255,80,200' : '90,120,255'},.16)`); rg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = rg; c.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  for (let i = 0; i < 160; i++) { c.fillStyle = `rgba(255,255,255,${0.25 + R() * 0.75})`; const s = R() < 0.1 ? 2 : 1.1; c.fillRect(R() * W, R() * H, s, s); }
  const ex = 180, ey = 900, er = 520;
  const eg = c.createRadialGradient(ex, ey - 200, 100, ex, ey, er); eg.addColorStop(0, '#2f7dd6'); eg.addColorStop(0.85, '#1b4f9a'); eg.addColorStop(1, '#0c2a55');
  c.beginPath(); c.arc(ex, ey, er, 0, Math.PI * 2); c.fillStyle = eg; c.fill();
  c.save(); c.beginPath(); c.arc(ex, ey, er, 0, Math.PI * 2); c.clip();
  [[80, 400, 60, 18], [230, 395, 80, 22], [330, 420, 50, 16]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, 'rgba(90,170,110,.55)', 0.2));
  [[150, 392, 70, 6], [280, 410, 60, 5]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, 'rgba(255,255,255,.35)', -0.1));
  c.restore();
  c.beginPath(); c.arc(ex, ey, er + 6, 0, Math.PI * 2); c.lineWidth = 10; c.strokeStyle = 'rgba(120,200,255,.35)'; c.stroke(); c.lineWidth = 3; c.strokeStyle = 'rgba(180,230,255,.7)'; c.stroke();
}
function drawModule(c) {
  const g = c.createLinearGradient(0, -20, 0, 20); g.addColorStop(0, '#e9edf5'); g.addColorStop(0.5, '#b9c2d3'); g.addColorStop(1, '#7d879b');
  rr(c, -60, -20, 120, 40, 8); c.fillStyle = g; c.fill();
  c.fillStyle = '#5a6378'; [-30, 0, 30].forEach((x) => c.fillRect(x - 1, -20, 2, 40));
  [-44, -14, 16, 46].forEach((x) => { circ(c, x, -2, 5, '#20294a'); circ(c, x - 1.5, -3.5, 1.6, '#7fb8ff'); });
  c.fillStyle = '#d6453a'; c.fillRect(-60, -6, 6, 12);
  rr(c, 58, -12, 8, 24, 3); c.fillStyle = '#8a93a6'; c.fill();
  txt(c, 'TW-01', -2, 12, '700 7px "JetBrains Mono", monospace', '#20294a');
}
function drawPanel(c) {
  c.fillStyle = '#9aa3b5'; c.fillRect(-35, -2, 70, 4);
  rr(c, -33, -18, 66, 36, 2); c.fillStyle = '#1f3a8a'; c.fill();
  c.strokeStyle = 'rgba(160,200,255,.6)'; c.lineWidth = 1;
  for (let x = -33; x <= 33; x += 11) { c.beginPath(); c.moveTo(x, -18); c.lineTo(x, 18); c.stroke(); }
  for (let y = -18; y <= 18; y += 9) { c.beginPath(); c.moveTo(-33, y); c.lineTo(33, y); c.stroke(); }
  poly(c, [-33, -18, -10, -18, -33, 4], 'rgba(255,255,255,.18)');
}
function drawAstro(c, a) {
  const wv = Math.sin(a.t * 4) * 0.7 * a.live;
  rr(c, -24, -2, 10, 30, 5); c.fillStyle = '#b9c2d3'; c.fill();
  ell(c, 0, 14, 16, 20, '#f4f6fb');
  rr(c, -12, 4, 24, 16, 4); c.fillStyle = '#c9ced8'; c.fill();
  c.fillStyle = '#d6453a'; c.fillRect(-6, 8, 4, 4); c.fillStyle = '#5ee7ff'; c.fillRect(2, 8, 4, 4);
  c.save(); c.translate(14, 4); c.rotate(-1.2 + wv); rr(c, -4, 0, 8, 22, 4); c.fillStyle = '#f4f6fb'; c.fill(); circ(c, 0, 23, 5, '#e9edf5'); c.restore();
  c.save(); c.translate(-14, 6); c.rotate(0.3); rr(c, -4, 0, 8, 20, 4); c.fillStyle = '#f4f6fb'; c.fill(); c.restore();
  rr(c, -12, 30, 10, 10, 4); c.fillStyle = '#e9edf5'; c.fill(); rr(c, 2, 30, 10, 10, 4); c.fill();
  circ(c, 0, -16, 16, '#f4f6fb'); ell(c, 2, -16, 11, 9, '#20294a'); ell(c, -1, -19, 4, 2.5, 'rgba(127,184,255,.8)', -0.4);
}
function drawRocket(c, a) {
  const f = 0.7 + Math.sin(a.t * 30) * 0.15 + Math.sin(a.t * 17) * 0.1;
  poly(c, [-8, 44, 0, 44 + 22 * f, 8, 44], '#ffb03a'); poly(c, [-4, 44, 0, 44 + 12 * f, 4, 44], '#fff2b0');
  poly(c, [-14, 20, -24, 46, -12, 42], '#d6453a'); poly(c, [14, 20, 24, 46, 12, 42], '#d6453a');
  const g = c.createLinearGradient(-14, 0, 14, 0); g.addColorStop(0, '#b9c2d3'); g.addColorStop(0.5, '#f4f6fb'); g.addColorStop(1, '#8a93a6');
  c.beginPath(); c.moveTo(0, -58); c.quadraticCurveTo(16, -30, 14, 44); c.lineTo(-14, 44); c.quadraticCurveTo(-16, -30, 0, -58); c.closePath(); c.fillStyle = g; c.fill();
  circ(c, 0, -14, 7, '#20294a'); circ(c, -2, -16, 2.2, '#7fb8ff');
  c.fillStyle = '#d6453a'; c.fillRect(-14, 24, 28, 5);
  txt(c, 'TW', 0, 8, '800 9px "JetBrains Mono", monospace', '#20294a');
}
function drawSat(c) {
  c.fillStyle = '#c9ced8'; c.fillRect(-4, 0, 8, 26); rr(c, -16, 24, 32, 8, 2); c.fillStyle = '#8a93a6'; c.fill();
  c.beginPath(); c.ellipse(0, -6, 36, 14, 0, 0, Math.PI); c.closePath(); c.fillStyle = '#e9edf5'; c.fill();
  ell(c, 0, -6, 36, 6, '#b9c2d3');
  c.strokeStyle = '#8a93a6'; c.lineWidth = 2; c.beginPath(); c.moveTo(-24, -4); c.lineTo(0, -30); c.lineTo(24, -4); c.stroke();
  circ(c, 0, -31, 3, '#ff5ec4');
}
function drawScope(c) {
  const g = c.createLinearGradient(0, -14, 0, 14); g.addColorStop(0, '#f4f6fb'); g.addColorStop(1, '#9aa3b5');
  rr(c, -40, -14, 70, 28, 4); c.fillStyle = g; c.fill();
  c.fillStyle = '#c9a54a'; c.fillRect(-40, -14, 16, 28);
  c.beginPath(); c.moveTo(30, -14); c.lineTo(44, -18); c.lineTo(44, 18); c.lineTo(30, 14); c.closePath(); c.fillStyle = '#5a6378'; c.fill();
  c.fillStyle = '#1f3a8a'; c.fillRect(-10, -23, 30, 7); c.fillRect(-10, 16, 30, 7);
}
function drawPatch(c) {
  rr(c, -60, -23, 120, 46, 23); c.fillStyle = '#20294a'; c.fill(); c.lineWidth = 3; c.strokeStyle = '#ffd166'; c.stroke();
  txt(c, 'ORBIT 408 KM', 8, -5, '800 12px "JetBrains Mono", monospace', '#ffd166');
  { const s = T('地球宇宙 · 第 10 大關', 'EARTH UNIVERSE · WORLD 10'); c.font = '500 9px "Noto Sans TC", sans-serif';
    txt(c, s, 8, 10, `500 ${(9 * Math.min(1, 84 / c.measureText(s).width)).toFixed(2)}px "Noto Sans TC", sans-serif`, '#c9ced8'); }
  circ(c, -42, 0, 10, '#2f7dd6'); ell(c, -44, -2, 4, 3, '#5aa56e');
}


/* ===== shared synthwave helpers for stages 2-10 ===== */
const NP = '#ff5ec4', NC = '#5ee7ff', NY = '#ffd166', NV = '#20294a';
function skyG(c, stops) { const g = c.createLinearGradient(0, 0, 0, H); for (const [p, col] of stops) g.addColorStop(p, col); c.fillStyle = g; c.fillRect(0, 0, W, H); return g; }
function glowAt(c, x, y, r, rgb, a) { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); }
function nebulae(c, R, n, maxY) { for (let i = 0; i < n; i++) glowAt(c, R() * W, R() * maxY, 50 + R() * 80, R() < 0.5 ? '255,80,200' : '90,120,255', 0.16); }
function starfield(c, R, n, maxY, minY = 0) { for (let i = 0; i < n; i++) { c.fillStyle = `rgba(255,255,255,${0.25 + R() * 0.75})`; const s = R() < 0.1 ? 2 : 1.1; c.fillRect(R() * W, minY + R() * (maxY - minY), s, s); } }
function sparkle(c, x, y, r, col) { c.beginPath(); c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r); c.fillStyle = col; c.fill(); }
function neonStroke(c, col, lw) { c.save(); c.globalAlpha = 0.3; c.lineWidth = lw * 3; c.strokeStyle = col; c.stroke(); c.restore(); c.lineWidth = lw; c.strokeStyle = col; c.stroke(); }
function neonText(c, s, x, y, font, col) { c.save(); c.globalAlpha = 0.35; c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 3; c.strokeStyle = col; c.strokeText(s, x, y); c.restore(); txt(c, s, x, y, font, col); }
function neonGrid(c, hy, col, vx = 180, rows = 12) {
  c.save(); c.strokeStyle = col; c.lineWidth = 1;
  for (let i = 1; i <= rows; i++) { const y = hy + (H - hy) * (i / rows) ** 2; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  for (let i = -16; i <= 16; i++) { c.beginPath(); c.moveTo(vx + i * 10, hy); c.lineTo(vx + i * 56, H); c.stroke(); }
  c.restore();
}
// The classic striped synthwave sun: stripes are cut with the sky gradient itself.
function synthSun(c, x, y, r, sky, top, bot, n = 7) {
  c.save(); c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.clip();
  const g = c.createLinearGradient(0, y - r, 0, y + r); g.addColorStop(0, top); g.addColorStop(1, bot); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r);
  c.fillStyle = sky; for (let i = 0; i < n; i++) c.fillRect(x - r, y + r * (0.08 + i * 0.13), 2 * r, 1.4 + i * 1.5);
  c.restore();
}
function ridge(c, y0, amp, seed, col, step = 24) {
  const R = mulberry(seed); c.beginPath(); c.moveTo(0, H); c.lineTo(0, y0);
  for (let x = 0; x <= W + step; x += step) c.lineTo(x, y0 - R() * amp);
  c.lineTo(W, H); c.closePath(); c.fillStyle = col; c.fill();
}
function crater(c, x, y, r, dark, lite) { ell(c, x, y, r, r * 0.32, dark); c.beginPath(); c.ellipse(x, y + 0.5, r, r * 0.32, 0, 0.15, Math.PI - 0.15); c.lineWidth = 1.4; c.strokeStyle = lite; c.stroke(); }
// A chubby Q astronaut (about 66×74). armL / armR: 0 hangs down, ±2.4 is raised.
function astroQ(c, armL, armR, visor = '#20294a') {
  rr(c, -21, -8, 42, 30, 8); c.fillStyle = '#b9c2d3'; c.fill();
  for (const [x, an] of [[-13, armL], [13, armR]]) { c.save(); c.translate(x, 2); c.rotate(an); rr(c, -4.5, 0, 9, 19, 4.5); c.fillStyle = '#f4f6fb'; c.fill(); circ(c, 0, 19, 5, '#dfe4ee'); c.restore(); }
  rr(c, -12, 24, 10, 12, 4); c.fillStyle = '#e9edf5'; c.fill(); rr(c, 2, 24, 10, 12, 4); c.fill();
  c.fillStyle = '#9aa3b5'; c.fillRect(-12, 32, 10, 4); c.fillRect(2, 32, 10, 4);
  ell(c, 0, 12, 16, 17, '#f4f6fb');
  rr(c, -10, 5, 20, 12, 3); c.fillStyle = '#c9ced8'; c.fill();
  c.fillStyle = '#d6453a'; c.fillRect(-6, 8, 4, 4); c.fillStyle = NC; c.fillRect(2, 8, 4, 4);
  circ(c, 0, -16, 16, '#f4f6fb'); ell(c, 1.5, -16, 11.5, 9.5, visor);
  ell(c, -3, -19.5, 4.5, 2.5, 'rgba(127,184,255,.85)', -0.4); ell(c, 6, -12, 3, 1.4, 'rgba(255,94,196,.7)', -0.4);
}
function drawAstroHop(c) { astroQ(c, 2.3, -2.3); }

/* ----- Q sounds for this world ----- */
const { q, note } = QS;
defineCreatureSound('space_alien', (ac, o, t) => {
  q(ac, o, t, [[0, 620], [0.09, 1250], [0.2, 900], [0.34, 1500]], 0.38, { vib: [16, 70], vol: 0.38 });
  note(ac, o, t + 0.42, 2100, 0.12, 0.2);
});
defineCreatureSound('space_robot', (ac, o, t) => {
  note(ac, o, t, 1175, 0.07, 0.3); note(ac, o, t + 0.09, 880, 0.07, 0.3); note(ac, o, t + 0.18, 1568, 0.07, 0.3);
  q(ac, o, t + 0.3, [[0, 900], [0.16, 1900]], 0.18, { vib: [24, 30], vol: 0.3 });
});
defineCreatureSound('space_drone', (ac, o, t) => {
  q(ac, o, t, [[0, 700], [0.12, 1100], [0.3, 950], [0.45, 1400]], 0.48, { trem: [28, 0.45], vol: 0.36 });
});
defineCreatureSound('space_owl', (ac, o, t) => {
  [0, 0.26].forEach((d, k) => q(ac, o, t + d, [[0, 720 - k * 60], [0.06, 800 - k * 60], [0.2, 640 - k * 60]], 0.22, { attack: 0.03, vib: [7, 10], vol: 0.4 }));
});
defineCreatureSound('space_dolphin', (ac, o, t) => {
  [0, 0.05, 0.1].forEach((d) => q(ac, o, t + d, [[0, 2600], [0.02, 2200]], 0.03, { attack: 0.002, hold: 0.1, vol: 0.25 }));
  q(ac, o, t + 0.18, [[0, 1600], [0.12, 2600], [0.26, 2000], [0.4, 2900]], 0.42, { vib: [10, 40], vol: 0.36 });
});
defineCreatureSound('space_gull', (ac, o, t) => {
  [0, 0.2].forEach((d) => q(ac, o, t + d, [[0, 1300], [0.05, 1750], [0.16, 1150]], 0.17, { trem: [30, 0.3], vol: 0.36 }));
});
defineThingSound('space_ping', (ac, o, t, r) => { note(ac, o, t, 1900 * r, 0.3, 0.3); note(ac, o, t + 0.18, 1900 * r, 0.25, 0.1); });
defineThingSound('space_neon', (ac, o, t, r) => {
  q(ac, o, t, [[0, 600 * r], [0.12, 640 * r]], 0.14, { trem: [40, 0.5], vol: 0.25 });
  note(ac, o, t + 0.13, 1568 * r, 0.3, 0.3); note(ac, o, t + 0.2, 2349 * r, 0.3, 0.18);
});

/* ===== 10-2 Moon base ===== */
function bgMoon(c) {
  const R = mulberry(1002);
  skyG(c, [[0, '#05061a'], [0.4, '#160a33'], [0.58, '#3a1452'], [0.63, '#5a2470']]);
  nebulae(c, R, 4, 240);
  starfield(c, R, 150, 290);
  // Earth rising
  glowAt(c, 278, 84, 82, '94,231,255', 0.22);
  c.save(); c.beginPath(); c.arc(278, 84, 34, 0, Math.PI * 2); c.clip();
  c.fillStyle = '#2f7dd6'; c.fillRect(240, 46, 76, 76);
  [[266, 72, 12, 8, 0.4], [291, 95, 10, 14, -0.3], [256, 101, 8, 5, 0], [296, 60, 7, 4, 0.5]].forEach(([x, y, rx, ry, r]) => ell(c, x, y, rx, ry, '#5aa56e', r));
  [[270, 62, 16, 3], [292, 80, 12, 2.5], [262, 90, 14, 2.5], [284, 106, 12, 2]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, 'rgba(255,255,255,.55)', -0.2));
  const sh = c.createLinearGradient(262, 68, 306, 112); sh.addColorStop(0, 'rgba(10,8,40,0)'); sh.addColorStop(0.55, 'rgba(10,8,40,.15)'); sh.addColorStop(1, 'rgba(10,8,40,.7)'); c.fillStyle = sh; c.fillRect(240, 46, 76, 76);
  c.restore();
  c.beginPath(); c.arc(278, 84, 35, 0, Math.PI * 2); c.lineWidth = 2; c.strokeStyle = 'rgba(150,230,255,.8)'; c.stroke();
  // far ridges
  ridge(c, 292, 22, 21, '#3b2f5c', 30);
  ridge(c, 300, 10, 22, '#544a72', 18);
  // ground
  const g = c.createLinearGradient(0, 296, 0, H); g.addColorStop(0, '#a19cb8'); g.addColorStop(1, '#4a4562');
  c.beginPath(); c.moveTo(0, 304); c.quadraticCurveTo(180, 292, 360, 304); c.lineTo(360, 480); c.lineTo(0, 480); c.closePath(); c.fillStyle = g; c.fill();
  c.save(); c.clip(); neonGrid(c, 296, 'rgba(94,231,255,.13)'); c.restore();
  c.beginPath(); c.moveTo(0, 304); c.quadraticCurveTo(180, 292, 360, 304); c.lineWidth = 1.5; c.strokeStyle = 'rgba(255,94,196,.6)'; c.stroke();
  [[40, 340, 22], [330, 330, 16], [196, 470, 40], [320, 452, 26], [24, 466, 18], [210, 318, 10]].forEach(([x, y, r]) => crater(c, x, y, r, 'rgba(50,44,80,.45)', 'rgba(230,225,255,.5)'));
  // rover tracks and footprints
  c.strokeStyle = 'rgba(60,54,90,.4)'; c.lineWidth = 2;
  for (const d of [-6, 6]) { c.beginPath(); c.moveTo(48, 424 + d); c.bezierCurveTo(30, 420 + d, 14, 400 + d, 0, 380 + d); c.stroke(); }
  for (let i = 0; i < 9; i++) { const x = 160 + i * 11, y = 330 + i * 5 + (i % 2) * 4; ell(c, x, y, 3.2, 1.4, 'rgba(50,44,80,.5)'); }
  // habitat dome
  const dx = 150, dy = 300;
  glowAt(c, dx, dy - 20, 80, '255,94,196', 0.18);
  c.fillStyle = '#7d879b'; c.fillRect(dx - 58, dy - 4, 116, 8);
  const dg = c.createLinearGradient(0, dy - 50, 0, dy); dg.addColorStop(0, '#f4f6fb'); dg.addColorStop(1, '#a9a4c4');
  c.beginPath(); c.ellipse(dx, dy - 2, 52, 44, 0, Math.PI, 0); c.closePath(); c.fillStyle = dg; c.fill();
  c.strokeStyle = 'rgba(80,80,120,.35)'; c.lineWidth = 1;
  for (const k of [-0.6, -0.2, 0.2, 0.6]) { c.beginPath(); c.ellipse(dx, dy - 2, 52 * Math.abs(k), 44, 0, Math.PI, 0); c.stroke(); }
  c.beginPath(); c.ellipse(dx, dy - 2, 52, 22, 0, Math.PI, 0); c.stroke();
  c.fillStyle = NP; for (const x of [-34, -18, 2, 18]) { rr(c, dx + x, dy - 20, 11, 6, 2); c.fill(); }
  rr(c, dx + 30, dy - 20, 16, 18, 3); c.fillStyle = '#3a2e5c'; c.fill(); c.fillStyle = NC; c.fillRect(dx + 33, dy - 17, 10, 3);
  c.fillStyle = '#8a93a6'; c.fillRect(dx - 40, dy - 82, 2, 50); circ(c, dx - 39, dy - 84, 3, '#ff4d6d');
  glowAt(c, dx - 39, dy - 84, 10, '255,77,109', 0.6);
}
function drawMoonSign(c) {
  c.fillStyle = '#8a93a6'; c.fillRect(-44, 4, 6, 37); c.fillRect(38, 4, 6, 37);
  c.fillStyle = '#5a6378'; c.fillRect(-44, 37, 6, 4); c.fillRect(38, 37, 6, 4);
  rr(c, -62, -40, 124, 48, 8); c.fillStyle = '#1a1036'; c.fill(); neonStroke(c, NP, 2);
  neonText(c, T('月球基地', 'MOON BASE'), 0, -24, '800 15px "Noto Sans TC", sans-serif', NC);
  txt(c, T('距地球 384,400 公里', 'EARTH 384,400 KM'), 0, -6, '700 8.5px "JetBrains Mono", "Noto Sans TC", monospace', NY);
}
function drawMoonFlag(c) {
  ell(c, -30, 56, 12, 3.5, 'rgba(30,24,60,.45)');
  c.fillStyle = '#c9ced8'; c.fillRect(-32, -57, 3, 113); c.fillRect(-32, -57, 64, 2.5);
  circ(c, -30.5, -58, 2.5, NY);
  c.fillStyle = NV; c.fillRect(-29, -54, 60, 38);
  c.fillStyle = NP; c.fillRect(-29, -28, 60, 4); c.fillStyle = NC; c.fillRect(-29, -22, 60, 3);
  circ(c, -14, -42, 7.5, NY); circ(c, -11, -44, 6.5, NV);
  sparkle(c, 4, -45, 4, '#fff'); sparkle(c, 15, -39, 3, '#fff'); sparkle(c, 24, -47, 2.5, '#fff');
  poly(c, [-6, -54, 2, -54, -10, -16, -18, -16], 'rgba(255,255,255,.08)'); poly(c, [16, -54, 20, -54, 10, -16, 6, -16], 'rgba(0,0,0,.12)');
}
function drawLunarRover(c) {
  for (const x of [-48, 48]) {
    circ(c, x, 20, 15, '#3a3f55'); circ(c, x, 20, 11, '#8a93a6');
    c.strokeStyle = '#3a3f55'; c.lineWidth = 1.2;
    for (let i = 0; i < 4; i++) { const an = i * Math.PI / 4, dx = Math.cos(an) * 11, dy = Math.sin(an) * 11; c.beginPath(); c.moveTo(x + dx, 20 + dy); c.lineTo(x - dx, 20 - dy); c.stroke(); }
    circ(c, x, 20, 4, '#c9ced8');
    c.beginPath(); c.ellipse(x, 14, 21, 11, 0, Math.PI, 0); c.closePath(); c.fillStyle = '#e3b04b'; c.fill();
  }
  rr(c, -70, 2, 140, 9, 3); c.fillStyle = '#b9c2d3'; c.fill(); c.fillStyle = '#5a6378'; c.fillRect(-66, 9, 132, 2);
  for (const x of [-24, 0]) { rr(c, x - 2, -16, 5, 19, 2); c.fillStyle = '#5a6378'; c.fill(); rr(c, x - 2, -2, 19, 5, 2); c.fillStyle = '#d6453a'; c.fill(); }
  c.fillStyle = '#8a93a6'; c.fillRect(-44, -12, 3, 14); rr(c, -52, -20, 19, 9, 2); c.fillStyle = '#20294a'; c.fill(); c.fillStyle = NC; c.fillRect(-50, -18, 15, 5);
  c.fillStyle = '#8a93a6'; c.fillRect(31, -24, 3, 26);
  c.beginPath(); c.ellipse(32.5, -24, 17, 9, 0, Math.PI, 0); c.closePath(); c.fillStyle = '#e9edf5'; c.fill();
  c.strokeStyle = '#9aa3b5'; c.lineWidth = 1; c.beginPath(); c.moveTo(32.5, -24); c.lineTo(32.5, -33); c.stroke();
  rr(c, 54, -8, 13, 9, 2); c.fillStyle = '#5a6378'; c.fill(); circ(c, 64, -3.5, 2.8, NC);
  c.fillStyle = '#c9ced8'; c.fillRect(-68, -26, 1.5, 28); poly(c, [-66.5, -26, -56, -22, -66.5, -18], NP);
}

/* ===== 10-3 Mars colony ===== */
function bgMars(c) {
  const R = mulberry(1003);
  skyG(c, [[0, '#120726'], [0.3, '#36104a'], [0.5, '#8c2f5e'], [0.62, '#d8754e'], [0.66, '#e9a06a']]);
  starfield(c, R, 90, 170);
  nebulae(c, R, 3, 160);
  // blue Martian sunset
  glowAt(c, 250, 262, 120, '130,190,255', 0.5);
  glowAt(c, 250, 262, 34, '220,240,255', 0.85);
  circ(c, 250, 262, 8, '#f2f8ff');
  // Phobos and Deimos
  ell(c, 66, 70, 9, 7, '#c79a86', 0.4); ell(c, 63, 68, 3, 2, 'rgba(90,50,60,.5)'); circ(c, 70, 73, 1.6, 'rgba(90,50,60,.5)');
  circ(c, 306, 44, 3.5, '#d8b4a0');
  // crater rim ridges
  ridge(c, 284, 34, 31, '#5a1e48', 26);
  ridge(c, 296, 16, 32, '#7a2a4a', 16);
  // far colony lights on the rim
  for (const [x, r] of [[178, 8], [192, 5], [346, 6]]) { c.beginPath(); c.ellipse(x, 297, r, r * 0.8, 0, Math.PI, 0); c.fillStyle = '#e9d6e6'; c.fill(); circ(c, x, 293, 1.3, NC); }
  // ground
  const g = c.createLinearGradient(0, 296, 0, H); g.addColorStop(0, '#c55c35'); g.addColorStop(1, '#5e2116');
  c.fillStyle = g; c.fillRect(0, 298, W, H - 298);
  neonGrid(c, 298, 'rgba(255,94,196,.22)', 252);
  c.fillStyle = 'rgba(255,200,170,.35)'; c.fillRect(0, 298, W, 1.5);
  // rocks and pebbles
  [[30, 400, 14], [338, 300 + 120, 10], [190, 452, 9], [300, 470, 16], [20, 330, 7], [230, 318, 5]].forEach(([x, y, r]) => { ell(c, x, y + r * 0.45, r * 1.2, r * 0.3, 'rgba(60,15,20,.35)'); ell(c, x, y, r, r * 0.7, '#8e3a26'); ell(c, x - r * 0.3, y - r * 0.3, r * 0.45, r * 0.25, 'rgba(255,190,150,.35)'); });
  // rover tracks
  c.strokeStyle = 'rgba(70,20,15,.35)'; c.lineWidth = 3;
  for (const d of [-8, 8]) { c.beginPath(); c.moveTo(360, 360 + d); c.bezierCurveTo(330, 380 + d, 300, 384 + d, 270, 384 + d); c.stroke(); }
}
function drawGreenhouse(c) {
  rr(c, -68, 22, 136, 14, 4); c.fillStyle = '#b9c2d3'; c.fill(); c.fillStyle = '#5a6378'; c.fillRect(-68, 32, 136, 4);
  c.beginPath(); c.ellipse(0, 22, 62, 56, 0, Math.PI, 0); c.closePath(); c.fillStyle = 'rgba(120,220,255,.22)'; c.fill();
  // plants under pink grow lights
  for (let i = 0; i < 7; i++) { const x = -45 + i * 15, h = 10 + ((i * 7) % 5) * 3; c.fillStyle = '#2f8f5a'; c.fillRect(x - 0.8, 22 - h, 1.6, h); ell(c, x - 4, 22 - h + 3, 5, 2.5, '#4fc27a', -0.5); ell(c, x + 4, 22 - h + 6, 5, 2.5, '#3aa866', 0.5); circ(c, x, 22 - h, 2.6, i % 2 ? NP : NY); }
  c.fillStyle = 'rgba(255,94,196,.85)'; c.fillRect(-46, -16, 92, 2);
  c.strokeStyle = 'rgba(230,245,255,.75)'; c.lineWidth = 1.4;
  for (const k of [0.33, 0.7]) { c.beginPath(); c.ellipse(0, 22, 62 * k, 56, 0, Math.PI, 0); c.stroke(); }
  c.beginPath(); c.moveTo(0, -34); c.lineTo(0, 22); c.stroke();
  c.beginPath(); c.ellipse(0, 22, 62, 24, 0, Math.PI, 0); c.stroke();
  c.beginPath(); c.ellipse(0, 22, 62, 56, 0, Math.PI, 0); c.lineWidth = 2.5; c.strokeStyle = '#e9edf5'; c.stroke();
  c.beginPath(); c.ellipse(-18, 0, 20, 38, 0, Math.PI * 1.15, Math.PI * 1.45); c.lineWidth = 4; c.strokeStyle = 'rgba(255,255,255,.35)'; c.stroke();
}
function drawColonySign(c) {
  c.fillStyle = '#5a6378'; c.fillRect(-3, 10, 6, 28); rr(c, -14, 34, 28, 5, 2); c.fillStyle = '#3a3f55'; c.fill();
  rr(c, -62, -38, 124, 50, 6); c.fillStyle = '#1a0f2e'; c.fill(); neonStroke(c, NC, 2);
  neonText(c, T('火星一號殖民地', 'MARS COLONY 1'), 0, -21, '800 13px "Noto Sans TC", sans-serif', NP);
  txt(c, T('歡迎光臨 · 請拍掉沙塵', 'WELCOME, EARTHLINGS'), 0, -2, '700 8px "Noto Sans TC", sans-serif', NY);
}
function drawPercy(c) {
  // six wheels on rocker arms
  c.strokeStyle = '#5a6378'; c.lineWidth = 3;
  c.beginPath(); c.moveTo(-46, 32); c.lineTo(-26, 14); c.lineTo(0, 32); c.moveTo(-26, 14); c.lineTo(12, 14); c.lineTo(46, 32); c.stroke();
  for (const x of [-46, 0, 46]) { circ(c, x, 34, 11, '#2b2f40'); circ(c, x, 34, 6, '#8a93a6'); circ(c, x, 34, 2.5, '#c9ced8'); }
  rr(c, -50, -6, 100, 22, 4); c.fillStyle = '#f4f6fb'; c.fill(); c.fillStyle = '#c9ced8'; c.fillRect(-50, 10, 100, 6);
  rr(c, -54, -10, 108, 6, 2); c.fillStyle = '#b9c2d3'; c.fill();
  c.fillStyle = '#e3b04b'; c.fillRect(-40, -2, 22, 10);
  rr(c, 22, -2, 22, 10, 2); c.fillStyle = '#3a3f55'; c.fill(); c.fillStyle = NC; c.fillRect(25, 1, 6, 4); c.fillStyle = NP; c.fillRect(34, 1, 6, 4);
  // RTG at the back, mast camera at the front
  rr(c, -62, -2, 14, 16, 3); c.fillStyle = '#5a6378'; c.fill(); c.fillStyle = '#3a3f55'; for (let y = 0; y < 14; y += 4) c.fillRect(-63, y, 16, 1.5);
  c.fillStyle = '#c9ced8'; c.fillRect(36, -40, 4, 32);
  rr(c, 28, -50, 22, 12, 3); c.fillStyle = '#f4f6fb'; c.fill(); circ(c, 34, -44, 3.6, NV); circ(c, 44, -44, 3.6, NV); circ(c, 33, -45, 1.2, NC); circ(c, 43, -45, 1.2, NC);
  // arm with a turret
  c.strokeStyle = '#b9c2d3'; c.lineWidth = 3; c.beginPath(); c.moveTo(50, 4); c.lineTo(60, 12); c.lineTo(58, 26); c.stroke(); rr(c, 53, 24, 10, 8, 2); c.fillStyle = '#8a93a6'; c.fill();
  c.fillStyle = '#c9ced8'; c.fillRect(-30, -20, 2, 10); ell(c, -29, -20, 7, 2.5, '#e9edf5');
}
function drawMarsDrone(c, a) {
  const sp = a.t * 40;
  c.fillStyle = '#8a93a6'; c.fillRect(-1.5, -26, 3, 18);
  for (const [y, k] of [[-26, 1], [-19, -1]]) { const w = 34 * Math.abs(Math.cos(sp * k)) + 6; ell(c, 0, y, w, 2.2, 'rgba(230,236,250,.9)'); ell(c, 0, y, 36, 3, 'rgba(230,236,250,.18)'); }
  circ(c, 0, -26, 2.5, NY);
  rr(c, -15, -10, 30, 22, 7); c.fillStyle = '#f4f6fb'; c.fill(); c.fillStyle = '#e3b04b'; c.fillRect(-15, 6, 30, 4);
  rr(c, -11, -6, 22, 11, 5); c.fillStyle = NV; c.fill();
  const bl = (Math.sin(a.t * 1.7) > 0.96) ? 0.3 : 1;
  ell(c, -5, -0.5, 2.6, 2.6 * bl, NC); ell(c, 5, -0.5, 2.6, 2.6 * bl, NC);
  ell(c, -9, 4, 2, 1, 'rgba(255,94,196,.6)'); ell(c, 9, 4, 2, 1, 'rgba(255,94,196,.6)');
  c.strokeStyle = '#8a93a6'; c.lineWidth = 1.8; c.beginPath(); c.moveTo(-12, 10); c.lineTo(-20, 22); c.moveTo(12, 10); c.lineTo(20, 22); c.moveTo(-5, 12); c.lineTo(-7, 22); c.moveTo(5, 12); c.lineTo(7, 22); c.stroke();
}
function drawMarsPanels(c) {
  c.fillStyle = '#5a6378'; c.fillRect(-46, 8, 3, 14); c.fillRect(43, 8, 3, 14); c.fillRect(-58, 20, 116, 3);
  rr(c, -64, -14, 128, 24, 2); c.fillStyle = '#c9ced8'; c.fill();
  for (let i = 0; i < 3; i++) { const x = -62 + i * 42; c.fillStyle = '#1f3a8a'; c.fillRect(x, -12, 40, 20); c.strokeStyle = 'rgba(160,200,255,.55)'; c.lineWidth = 0.8; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(x + k * 10, -12); c.lineTo(x + k * 10, 8); c.stroke(); } c.beginPath(); c.moveTo(x, -2); c.lineTo(x + 40, -2); c.stroke(); poly(c, [x, -12, x + 14, -12, x, 0], 'rgba(255,255,255,.2)'); }
}

/* ===== 10-4 Saturn's rings ===== */
function saturnRings(c, sx, sy, front) {
  c.save(); c.beginPath(); if (front) c.rect(0, sy, W, 120); else c.rect(0, 0, W, sy); c.clip();
  for (const [rx, lw, col] of [[152, 10, 'rgba(240,205,180,.6)'], [138, 3, 'rgba(255,230,210,.35)'], [124, 16, 'rgba(255,165,205,.75)'], [104, 8, 'rgba(190,160,255,.45)']]) {
    c.beginPath(); c.ellipse(sx, sy, rx, rx * 0.2, 0, 0, Math.PI * 2); c.lineWidth = lw; c.strokeStyle = col; c.stroke();
  }
  c.restore();
}
function bgSaturn(c) {
  const R = mulberry(1004);
  skyG(c, [[0, '#06051a'], [0.5, '#1b0d3c'], [1, '#2a0f4a']]);
  nebulae(c, R, 5, 420);
  starfield(c, R, 170, H);
  glowAt(c, 46, 50, 32, '255,170,80', 0.3); circ(c, 46, 50, 12, '#e0a050'); ell(c, 42, 46, 6, 4, 'rgba(255,225,170,.5)');
  const sx = 180, sy = 118;
  glowAt(c, sx, sy, 130, '255,120,200', 0.18);
  saturnRings(c, sx, sy, false);
  c.save(); c.beginPath(); c.arc(sx, sy, 60, 0, Math.PI * 2); c.clip();
  const bands = ['#f6c9a0', '#f2a6a6', '#e98fb4', '#f6d2b0', '#c98bd0', '#f2b3a0', '#e9a0c0', '#b483c8'];
  bands.forEach((col, i) => { c.fillStyle = col; c.fillRect(sx - 60, sy - 60 + i * 15, 120, 15); });
  c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(sx - 60, sy - 34, 120, 3); c.fillRect(sx - 60, sy + 26, 120, 2);
  const sh = c.createLinearGradient(sx - 60, sy - 60, sx + 60, sy + 60); sh.addColorStop(0, 'rgba(255,255,255,.18)'); sh.addColorStop(0.5, 'rgba(40,10,60,0)'); sh.addColorStop(1, 'rgba(30,8,50,.6)');
  c.fillStyle = sh; c.fillRect(sx - 60, sy - 60, 120, 120);
  c.beginPath(); c.ellipse(sx, sy + 6, 120, 24, 0, 0, Math.PI); c.lineWidth = 4; c.strokeStyle = 'rgba(40,10,60,.35)'; c.stroke();
  c.restore();
  saturnRings(c, sx, sy, true);
  // the ring lane: ice chunks with neon lane marks
  const lg = c.createLinearGradient(0, 320, 0, H); lg.addColorStop(0, 'rgba(190,170,255,.0)'); lg.addColorStop(0.3, 'rgba(200,170,255,.16)'); lg.addColorStop(1, 'rgba(255,140,210,.3)');
  c.fillStyle = lg; c.beginPath(); c.moveTo(0, 330); c.quadraticCurveTo(180, 300, 360, 330); c.lineTo(360, 480); c.lineTo(0, 480); c.closePath(); c.fill();
  for (let i = 0; i < 110; i++) {
    const x = R() * W, f = R(), y = 320 + f * f * 160 + (Math.abs(x - 180) / 180) * 18, r = 1 + f * 7 * R();
    ell(c, x, y, r * 1.3, r, `rgba(${200 + R() * 55 | 0},${220 + R() * 35 | 0},255,${0.35 + R() * 0.5})`, R());
    if (r > 4) ell(c, x - r * 0.4, y - r * 0.35, r * 0.5, r * 0.25, 'rgba(255,255,255,.7)', 0);
  }
  c.save(); c.setLineDash([12, 10]); c.lineWidth = 2;
  for (const [y0, col] of [[352, 'rgba(94,231,255,.55)'], [450, 'rgba(255,94,196,.6)']]) { c.beginPath(); c.moveTo(0, y0 + 14); c.quadraticCurveTo(180, y0 - 16, 360, y0 + 14); c.strokeStyle = col; c.stroke(); }
  c.restore();
}
function drawTourShip(c, a) {
  const f = 0.75 + Math.sin(a.t * 26) * 0.15 + Math.sin(a.t * 13) * 0.1;
  poly(c, [-66, -8, -66 - 12 * f, 0, -66, 8], '#ffb03a'); poly(c, [-66, -4, -66 - 7 * f, 0, -66, 4], '#fff2b0');
  poly(c, [-38, -24, -54, -36, -16, -24], NP); poly(c, [-38, 18, -54, 32, -16, 18], NP);
  rr(c, -68, -10, 10, 20, 3); c.fillStyle = '#8a93a6'; c.fill();
  c.beginPath(); c.moveTo(-60, -10); c.quadraticCurveTo(-58, -26, -30, -26); c.lineTo(40, -26); c.quadraticCurveTo(76, -24, 76, -2); c.quadraticCurveTo(76, 20, 40, 20); c.lineTo(-30, 20); c.quadraticCurveTo(-60, 20, -60, 6); c.closePath(); c.fillStyle = '#f4f6fb'; c.fill();
  c.fillStyle = '#c9ced8'; c.fillRect(-58, 12, 120, 4);
  c.fillStyle = NP; c.fillRect(-60, 2, 124, 5); c.fillStyle = NC; c.fillRect(-60, 8, 122, 2);
  [-40, -22, -4, 14, 32].forEach((x, i) => { circ(c, x, -11, 6.5, NV); if (i % 2 === 0) { circ(c, x, -9, 4.5, '#7be38a'); circ(c, x - 1.6, -10, 1.2, NV); circ(c, x + 1.6, -10, 1.2, NV); } else circ(c, x - 2, -13, 1.8, 'rgba(127,184,255,.8)'); });
  c.beginPath(); c.moveTo(50, -22); c.quadraticCurveTo(72, -20, 73, -4); c.lineTo(50, -4); c.closePath(); c.fillStyle = NC; c.fill();
  poly(c, [54, -20, 60, -20, 54, -8], 'rgba(255,255,255,.5)');
  txt(c, T('土星環觀光', 'RING TOUR'), 0, 15.5, '800 6.5px "Noto Sans TC", sans-serif', NV);
}
function drawBuoy(c, a) {
  const on = 0.55 + 0.45 * Math.sin(a.t * 3);
  circ(c, 0, -30, 9, `rgba(255,94,196,${0.25 * on})`); circ(c, 0, -30, 4.5, NP); circ(c, -1.2, -31.2, 1.4, '#fff');
  c.fillStyle = '#8a93a6'; c.fillRect(-1.5, -26, 3, 12);
  rr(c, -22, -6, 8, 14, 1.5); c.fillStyle = '#1f3a8a'; c.fill(); rr(c, 14, -6, 8, 14, 1.5); c.fill();
  c.fillStyle = '#9aa3b5'; c.fillRect(-15, -0.5, 30, 2);
  rr(c, -13, -15, 26, 34, 7); c.fillStyle = '#f4f6fb'; c.fill();
  c.fillStyle = NP; c.fillRect(-13, -5, 26, 5); c.fillRect(-13, 7, 26, 5);
  ell(c, 0, 22, 19, 6, '#8a93a6'); ell(c, 0, 20, 19, 5, '#c9ced8'); ell(c, 0, 19.5, 12, 2.4, 'rgba(94,231,255,.7)');
}
function drawRingSign(c) {
  c.fillStyle = '#8a93a6'; c.fillRect(-2.5, 14, 5, 14);
  ell(c, 0, 30, 18, 6, '#cfe6ff'); ell(c, -5, 28, 8, 2.4, 'rgba(255,255,255,.8)');
  rr(c, -60, -24, 120, 40, 6); c.fillStyle = '#0f3b4a'; c.fill(); neonStroke(c, NC, 1.6);
  rr(c, -56, -36, 46, 13, 3); c.fillStyle = NY; c.fill();
  txt(c, T('出口 6', 'EXIT 6'), -33, -29.2, '800 8px "Noto Sans TC", sans-serif', NV);
  txt(c, T('土衛六 泰坦 →', 'TITAN →'), 0, -9, '800 14px "Noto Sans TC", sans-serif', '#fff');
  txt(c, T('土星最大的衛星', "SATURN'S BIGGEST MOON"), 0, 7, '600 7.5px "Noto Sans TC", sans-serif', NC);
}
function drawRingSurfer(c, a) {
  const w = Math.sin(a.t * 3) * 0.25 * a.live;
  ell(c, 0, 28, 42, 7, '#dff3ff'); ell(c, -12, 26, 22, 2, 'rgba(255,255,255,.9)');
  c.beginPath(); c.ellipse(0, 28, 42, 7, 0, 0, Math.PI); c.lineWidth = 1.5; c.strokeStyle = NC; c.stroke();
  rr(c, -10, 10, 7, 16, 3); c.fillStyle = '#5fcf70'; c.fill(); rr(c, 3, 10, 7, 16, 3); c.fill();
  c.save(); c.translate(-10, 0); c.rotate(1.2 + w); rr(c, -3, 0, 6, 20, 3); c.fillStyle = '#6fdc7e'; c.fill(); circ(c, 0, 21, 3.5, '#6fdc7e'); c.restore();
  c.save(); c.translate(10, -2); c.rotate(-1.9 - w); rr(c, -3, 0, 6, 20, 3); c.fillStyle = '#6fdc7e'; c.fill(); circ(c, 0, 21, 3.5, '#6fdc7e'); c.restore();
  ell(c, 0, 4, 12, 13, '#7be38a'); ell(c, 0, 7, 7, 7, '#b6f5bf');
  c.strokeStyle = '#5fcf70'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-6, -26); c.quadraticCurveTo(-10 + w * 8, -34, -12 + w * 10, -38); c.stroke(); circ(c, -12 + w * 10, -38, 3, NP);
  c.beginPath(); c.moveTo(6, -26); c.quadraticCurveTo(10 + w * 8, -34, 12 + w * 10, -38); c.stroke(); circ(c, 12 + w * 10, -38, 3, NP);
  ell(c, 0, -16, 16, 12.5, '#7be38a');
  ell(c, -6, -17, 4.6, 5.6, '#fff'); ell(c, 6, -17, 4.6, 5.6, '#fff'); circ(c, -5, -16, 2.6, NV); circ(c, 7, -16, 2.6, NV); circ(c, -4.2, -17.2, 0.9, '#fff'); circ(c, 7.8, -17.2, 0.9, '#fff');
  ell(c, -11, -10, 2.6, 1.4, 'rgba(255,94,196,.55)'); ell(c, 11, -10, 2.6, 1.4, 'rgba(255,94,196,.55)');
  c.beginPath(); c.arc(1, -9, 3, 0.2, Math.PI - 0.2); c.lineWidth = 1.2; c.strokeStyle = NV; c.stroke();
}

/* ===== 10-5 Satellite repair ===== */
function bgRepair(c) {
  const R = mulberry(1005);
  skyG(c, [[0, '#05061a'], [0.55, '#1d0c3a'], [1, '#14103a']]);
  nebulae(c, R, 5, 330);
  starfield(c, R, 160, 400);
  const ex = 250, ey = 830, er = 470;
  glowAt(c, 20, 440, 160, '255,120,180', 0.35);
  c.save(); c.beginPath(); c.arc(ex, ey, er, 0, Math.PI * 2); c.clip();
  const eg = c.createLinearGradient(0, 360, 0, 480); eg.addColorStop(0, '#163a7a'); eg.addColorStop(1, '#0a1a40'); c.fillStyle = eg; c.fillRect(0, 340, W, 140);
  for (let i = 0; i < 18; i++) ell(c, R() * W, 380 + R() * 100, 20 + R() * 40, 3 + R() * 4, 'rgba(180,200,255,.12)', -0.1);
  for (let i = 0; i < 260; i++) { const x = R() * W, y = 370 + R() * 110; if (R() < 0.55) continue; c.fillStyle = `rgba(255,${200 + R() * 50 | 0},120,${0.4 + R() * 0.6})`; c.fillRect(x, y, 1.3, 1.3); }
  [[150, 430, 30], [300, 410, 22], [60, 460, 18]].forEach(([x, y, r]) => glowAt(c, x, y, r, '255,210,120', 0.35));
  c.restore();
  // aurora curtains on the limb
  for (let i = 0; i < 240; i++) {
    const an = -Math.PI / 2 - 0.66 + i * 0.0045, x = ex + Math.cos(an) * er, y = ey + Math.sin(an) * er;
    const h = 14 + (Math.sin(i * 0.09) * 0.5 + 0.5) * 30 + (Math.sin(i * 0.37) * 0.5 + 0.5) * 12 + R() * 6;
    const g = c.createLinearGradient(x, y, x, y - h); g.addColorStop(0, 'rgba(90,255,170,0)'); g.addColorStop(0.15, 'rgba(90,255,170,.16)'); g.addColorStop(0.7, 'rgba(255,94,196,.07)'); g.addColorStop(1, 'rgba(255,94,196,0)');
    c.fillStyle = g; c.fillRect(x - 0.9, y - h, 1.8, h);
  }
  c.beginPath(); c.arc(ex, ey, er + 5, 0, Math.PI * 2); c.lineWidth = 10; c.strokeStyle = 'rgba(120,200,255,.3)'; c.stroke(); c.lineWidth = 2.5; c.strokeStyle = 'rgba(180,230,255,.8)'; c.stroke();
  glowAt(c, 14, 432, 50, '255,230,200', 0.9); sparkle(c, 14, 432, 22, 'rgba(255,255,255,.9)');
}
function drawHubble(c) {
  rr(c, -78, -21, 28, 42, 5); c.fillStyle = '#8a93a6'; c.fill();
  c.fillStyle = '#e3b04b'; c.fillRect(-74, -16, 8, 32); c.fillStyle = '#5a6378'; c.fillRect(-60, -21, 3, 42);
  rr(c, -54, -25, 106, 50, 6); c.fillStyle = '#d9dde6'; c.fill();
  c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(-52, -19, 102, 6);
  c.fillStyle = 'rgba(80,90,120,.22)'; c.fillRect(-52, 13, 102, 10);
  c.fillStyle = '#9aa3b5'; c.fillRect(-20, -25, 2, 50); c.fillRect(16, -25, 2, 50);
  c.strokeStyle = 'rgba(120,130,160,.35)'; c.lineWidth = 0.8; for (const x of [-42, -30, -6, 6, 30, 40]) { c.beginPath(); c.moveTo(x, -22); c.lineTo(x + 3, 22); c.stroke(); }
  rr(c, 50, -27, 8, 54, 2); c.fillStyle = '#b9c2d3'; c.fill();
  ell(c, 58, 0, 4, 24, NV);
  c.save(); c.translate(58, -27); c.rotate(-0.5); rr(c, 0, -3, 22, 5, 2); c.fillStyle = '#c9ced8'; c.fill(); c.restore();
  c.fillStyle = NY; c.fillRect(-46, -28, 26, 2); c.fillRect(-46, 26, 26, 2);
  c.fillStyle = '#8a93a6'; c.fillRect(-1, -31, 2, 6); circ(c, 0, -31, 2.6, '#e9edf5');
  txt(c, T('太空望遠鏡', 'SPACE TELESCOPE'), 0, 2, '700 6.5px "Noto Sans TC", sans-serif', '#5a6378');
}
function drawWing(c) {
  c.fillStyle = '#9aa3b5'; c.fillRect(-56, -1.5, 112, 3);
  for (const y of [-16, 3]) {
    rr(c, -52, y, 104, 13, 1.5); c.fillStyle = '#2a4fb0'; c.fill();
    c.strokeStyle = 'rgba(160,200,255,.55)'; c.lineWidth = 0.8;
    for (let x = -52; x <= 52; x += 8) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 13); c.stroke(); }
    c.beginPath(); c.moveTo(-52, y + 6.5); c.lineTo(52, y + 6.5); c.stroke();
    c.fillStyle = '#e3b04b'; c.fillRect(-54, y, 3, 13); c.fillRect(51, y, 3, 13);
  }
  poly(c, [-52, -16, -30, -16, -52, -6], 'rgba(255,255,255,.2)'); poly(c, [-52, 3, -36, 3, -52, 12], 'rgba(255,255,255,.14)');
  rr(c, -5, -5, 10, 10, 2); c.fillStyle = '#c9ced8'; c.fill();
}
function drawTetherAstro(c, a) {
  c.beginPath(); c.moveTo(-20, 4); c.bezierCurveTo(-34, 4, -36, 22, -26, 26); c.bezierCurveTo(-18, 30, -26, 38, -36, 38); c.lineWidth = 1.8; c.strokeStyle = NY; c.stroke();
  astroQ(c, 0.5, -2.0 + Math.sin(a.t * 3) * 0.15 * a.live);
  const an = -2.0 + Math.sin(a.t * 3) * 0.15 * a.live, hx = 13 - 19 * Math.sin(an), hy = 2 + 19 * Math.cos(an);
  c.save(); c.translate(hx, hy); c.rotate(-0.6); c.fillStyle = '#9aa3b5'; c.fillRect(-1.5, -12, 3, 12); circ(c, 0, -13, 4, '#9aa3b5'); circ(c, 0, -14.5, 2, '#20294a'); c.restore();
}
function drawRepairBot(c, a) {
  const f = 0.7 + Math.sin(a.t * 20) * 0.3;
  poly(c, [-6, 17, 0, 17 + 10 * f, 6, 17], 'rgba(94,231,255,.75)');
  c.strokeStyle = '#b9c2d3'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-16, 6); c.lineTo(-26, 16); c.moveTo(16, 4); c.lineTo(25, -6); c.stroke();
  c.lineWidth = 2; c.beginPath(); c.moveTo(-26, 16); c.lineTo(-29, 21); c.moveTo(-26, 16); c.lineTo(-22, 21); c.stroke();
  c.save(); c.translate(25, -6); c.rotate(-0.5); rr(c, -2.5, -6, 5, 8, 2); c.fillStyle = NY; c.fill(); c.fillStyle = '#8a93a6'; c.fillRect(-0.8, -15, 1.6, 9); c.restore();
  c.fillStyle = '#8a93a6'; c.fillRect(-1, -28, 2, 10); circ(c, 0, -28, 3.5, NP);
  circ(c, 0, 0, 19, '#f4f6fb'); c.beginPath(); c.arc(0, 0, 19, 0.15, Math.PI - 0.15); c.closePath(); c.fillStyle = '#dfe4ee'; c.fill();
  circ(c, -19, 0, 3, '#b9c2d3'); circ(c, 19, 0, 3, '#b9c2d3');
  rr(c, -13, -10, 26, 13, 6.5); c.fillStyle = NV; c.fill();
  const bl = Math.sin(a.t * 1.3) > 0.95 ? 0.25 : 1;
  ell(c, -5, -3.5, 2.8, 3.2 * bl, NC); ell(c, 5, -3.5, 2.8, 3.2 * bl, NC);
  c.beginPath(); c.arc(0, 7, 3.2, 0.25, Math.PI - 0.25); c.lineWidth = 1.4; c.strokeStyle = NV; c.stroke();
  ell(c, -11, 6, 2.5, 1.3, 'rgba(255,94,196,.6)'); ell(c, 11, 6, 2.5, 1.3, 'rgba(255,94,196,.6)');
}
function drawToolbox(c, a) {
  c.translate(0, Math.sin(a.t * 1.3) * 1.5 * a.live);
  c.beginPath(); c.moveTo(-13, -13); c.lineTo(-13, -20); c.lineTo(13, -20); c.lineTo(13, -13); c.lineWidth = 3.5; c.strokeStyle = '#5a6378'; c.stroke();
  rr(c, -34, -14, 68, 34, 4); c.fillStyle = '#d6453a'; c.fill();
  c.fillStyle = '#a8322a'; c.fillRect(-34, -5, 68, 3);
  c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-32, -12, 64, 3);
  rr(c, -6, -7, 12, 7, 2); c.fillStyle = NY; c.fill();
  txt(c, T('工具箱', 'TOOLS'), 0, 9, '800 8px "Noto Sans TC", sans-serif', '#fff');
  c.save(); c.translate(26, -18); c.rotate(0.5); c.fillStyle = '#9aa3b5'; c.fillRect(-1.2, -2, 2.4, 8); c.restore();
}

/* ===== 10-6 Meteor shower over Hehuanshan ===== */
function ridgeLine(c, y0, amp, seed, col, rim, step = 24) {
  const R = mulberry(seed), pts = [];
  for (let x = 0; x <= W + step; x += step) pts.push([x, y0 - R() * amp]);
  c.beginPath(); c.moveTo(0, H); pts.forEach(([x, y]) => c.lineTo(x, y)); c.lineTo(W, H); c.closePath(); c.fillStyle = col; c.fill();
  if (rim) { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.lineWidth = 1.2; c.strokeStyle = rim; c.stroke(); }
}
function bgMeteor(c) {
  const R = mulberry(1006);
  skyG(c, [[0, '#070820'], [0.35, '#1a0d3e'], [0.52, '#4a1a5e'], [0.6, '#a8407a']]);
  for (let i = 0; i < 14; i++) { const f = i / 13; glowAt(c, -20 + f * 400 + R() * 30, 300 - f * 270 + R() * 30, 50 + R() * 30, R() < 0.5 ? '200,160,255' : '255,150,220', 0.13); }
  for (let i = 0; i < 420; i++) { const f = R(); c.fillStyle = `rgba(255,255,255,${0.15 + R() * 0.5})`; c.fillRect(-20 + f * 400 + (R() - 0.5) * 90, 300 - f * 270 + (R() - 0.5) * 60, 1, 1); }
  starfield(c, R, 110, 290);
  // the Perseids: streaks fly away from the radiant at the top right
  const rx = 330, ry = 30;
  for (let i = 0; i < 11; i++) {
    const an = Math.PI * (0.55 + R() * 0.38), d0 = 50 + R() * 230, len = 26 + R() * 50;
    const x1 = rx + Math.cos(an) * d0, y1 = ry + Math.sin(an) * d0, x2 = rx + Math.cos(an) * (d0 + len), y2 = ry + Math.sin(an) * (d0 + len);
    if (y2 > 250) continue;
    const g = c.createLinearGradient(x1, y1, x2, y2); const col = R() < 0.5 ? '94,231,255' : '255,140,220';
    g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},.95)`);
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineWidth = 1.8; c.strokeStyle = g; c.stroke();
    circ(c, x2, y2, 1.6, '#fff'); glowAt(c, x2, y2, 6, col, 0.5);
  }
  ridgeLine(c, 262, 44, 61, '#3a1a5a', 'rgba(94,231,255,.45)', 30);
  ridgeLine(c, 290, 30, 62, '#251240', 'rgba(255,94,196,.5)', 22);
  const g = c.createLinearGradient(0, 300, 0, H); g.addColorStop(0, '#1d1238'); g.addColorStop(1, '#0c0818');
  c.beginPath(); c.moveTo(0, 318); c.quadraticCurveTo(200, 290, 360, 312); c.lineTo(360, 480); c.lineTo(0, 480); c.closePath(); c.fillStyle = g; c.fill();
  c.save(); c.clip(); neonGrid(c, 300, 'rgba(255,94,196,.12)'); c.restore();
  for (let i = 0; i < 70; i++) { const x = R() * W, y = 320 + R() * 160, h = 4 + R() * 7; c.strokeStyle = 'rgba(90,60,130,.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 2, y - h); c.moveTo(x, y); c.lineTo(x + 2, y - h * 0.8); c.stroke(); }
  // glowing tent
  glowAt(c, 300, 440, 70, '255,170,80', 0.3);
  poly(c, [258, 466, 300, 404, 342, 466], '#ff9a52'); poly(c, [300, 404, 342, 466, 312, 466], '#d9703a');
  poly(c, [292, 466, 300, 432, 308, 466], '#ffe0a0'); c.fillStyle = '#5a3a2a'; c.fillRect(299, 400, 2, 8);
  // the lantern string and its poles
  c.fillStyle = '#2a1a40'; c.fillRect(10, 124, 4, 190); c.fillRect(346, 124, 4, 180);
  c.beginPath(); c.moveTo(12, 128); c.quadraticCurveTo(180, 168, 348, 128); c.lineWidth = 1.2; c.strokeStyle = 'rgba(220,200,255,.6)'; c.stroke();
  for (let i = 1; i < 16; i++) { const t = i / 16, x = 12 + t * 336, y = 128 + 80 * t * (1 - t) + 2; const col = i % 2 ? '255,94,196' : '94,231,255'; glowAt(c, x, y, 5, col, 0.7); circ(c, x, y, 1.4, `rgb(${col})`); }
}
function drawTripodScope(c) {
  c.strokeStyle = '#5a6378'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, -16); c.lineTo(-36, 52); c.moveTo(0, -16); c.lineTo(36, 52); c.moveTo(0, -16); c.lineTo(4, 52); c.stroke();
  poly(c, [-18, 18, 18, 18, 2, 26], '#3a3f55');
  rr(c, -8, -24, 16, 10, 2); c.fillStyle = '#3a3f55'; c.fill();
  rr(c, -44, -42, 80, 17, 5); c.fillStyle = '#f4f6fb'; c.fill();
  c.fillStyle = NC; c.fillRect(-14, -42, 4, 17); c.fillStyle = NP; c.fillRect(-8, -42, 2, 17);
  rr(c, 32, -45, 18, 23, 3); c.fillStyle = '#20294a'; c.fill(); c.fillStyle = 'rgba(127,184,255,.6)'; c.fillRect(48, -42, 2, 17);
  rr(c, -52, -38, 9, 9, 2); c.fillStyle = '#3a3f55'; c.fill();
  rr(c, -20, -52, 26, 7, 3); c.fillStyle = '#b9c2d3'; c.fill(); c.fillStyle = '#8a93a6'; c.fillRect(-12, -45, 2, 3);
  c.fillStyle = 'rgba(255,255,255,.45)'; c.fillRect(-40, -40, 70, 3);
}
function drawCamTripod(c) {
  c.strokeStyle = '#3a3f55'; c.lineWidth = 2.5; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, -18); c.lineTo(-20, 46); c.moveTo(0, -18); c.lineTo(20, 46); c.moveTo(0, -18); c.lineTo(2, 46); c.stroke();
  rr(c, -5, -24, 10, 7, 2); c.fillStyle = '#5a6378'; c.fill();
  rr(c, -22, -44, 44, 22, 4); c.fillStyle = '#2b2f40'; c.fill();
  rr(c, -10, -48, 14, 5, 2); c.fillStyle = '#3a3f55'; c.fill(); circ(c, 14, -46, 2.6, '#8a93a6');
  circ(c, 0, -33, 9.5, '#5a6378'); circ(c, 0, -33, 7, '#11131f'); circ(c, 0, -33, 4, '#2a3b7a'); circ(c, -2, -35, 1.6, 'rgba(255,255,255,.8)');
  circ(c, -16, -39, 1.6, '#ff4d6d');
  c.fillStyle = NP; c.fillRect(-22, -26, 44, 2);
}
function drawDarkSign(c) {
  c.fillStyle = '#4a2f24'; c.fillRect(-48, 12, 6, 20); c.fillRect(42, 12, 6, 20);
  rr(c, -66, -30, 132, 46, 5); c.fillStyle = '#6b4330'; c.fill();
  c.fillStyle = 'rgba(0,0,0,.18)'; for (const y of [-18, -6, 6]) c.fillRect(-66, y, 132, 1.2);
  c.lineWidth = 1.5; c.strokeStyle = '#3a241a'; rr(c, -66, -30, 132, 46, 5); c.stroke();
  txt(c, T('合歡山暗空公園', 'HEHUANSHAN'), 0, -17, '800 13px "Noto Sans TC", sans-serif', '#fff3e0');
  txt(c, T('國際認證', 'DARK SKY PARK'), 0, -2, '700 9px "Noto Sans TC", sans-serif', NY);
  txt(c, T('請關燈・只用紅光', 'LIGHTS OFF · RED ONLY'), 0, 10, '600 7px "Noto Sans TC", sans-serif', '#ff8fa3');
}
function drawLantern(c, a) {
  const fl = 0.85 + Math.sin(a.t * 7) * 0.08 + Math.sin(a.t * 11.3) * 0.07;
  c.beginPath(); c.arc(0, -26, 3, 0, Math.PI * 2); c.lineWidth = 1.4; c.strokeStyle = '#c9ced8'; c.stroke();
  circ(c, 0, 4, 22, `rgba(255,200,120,${0.18 * fl})`);
  poly(c, [-12, -16, 12, -16, 7, -23, -7, -23], '#5a6378');
  rr(c, -11, -16, 22, 34, 4); c.fillStyle = `rgba(255,214,140,${0.75 * fl})`; c.fill();
  ell(c, 0, 1, 5, 9, '#fff6d8');
  c.fillStyle = '#5a6378'; c.fillRect(-11, -9, 22, 1.5); c.fillRect(-11, 10, 22, 1.5); c.fillRect(-11, -16, 2, 34); c.fillRect(9, -16, 2, 34);
  rr(c, -13, 18, 26, 7, 2); c.fillStyle = '#3a3f55'; c.fill(); c.fillStyle = NP; c.fillRect(-13, 20, 26, 1.5);
}
function drawAlienKid(c, a) { alienKid(c, a, '#b99cff', '#9b7be8', NP); }
function drawAlienGazer(c, a) { alienKid(c, a, '#7be38a', '#5fcf70', NC); }
function alienKid(c, a, skin, skin2, shirt) {
  const w = Math.sin(a.t * 2.4) * 0.2 * a.live;
  rr(c, -9, 18, 7, 18, 3); c.fillStyle = skin2; c.fill(); rr(c, 2, 18, 7, 18, 3); c.fill();
  ell(c, -6, 36, 6, 3, skin2); ell(c, 6, 36, 6, 3, skin2);
  c.save(); c.translate(-12, 6); c.rotate(0.5); rr(c, -3, 0, 6, 16, 3); c.fillStyle = skin; c.fill(); c.restore();
  c.save(); c.translate(11, 2); c.rotate(-2.6 + w); rr(c, -3, 0, 6, 18, 3); c.fillStyle = skin; c.fill(); c.restore();
  const hx = 11 + 18 * Math.sin(2.6 - w), hy = 2 + 18 * Math.cos(2.6 - w);
  sparkle(c, hx, hy - 4, 6, NY);
  rr(c, -13, 0, 26, 22, 9); c.fillStyle = shirt; c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(-13, 10, 26, 2);
  c.strokeStyle = skin; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -26); c.quadraticCurveTo(4 + w * 10, -34, 2 + w * 14, -38); c.stroke(); circ(c, 2 + w * 14, -38, 3, shirt === NP ? NC : NP);
  ell(c, 0, -12, 16, 15, skin);
  ell(c, 0, -14, 8, 8.5, '#fff'); circ(c, 1.5, -17, 4.5, NV); circ(c, 3, -18.5, 1.5, '#fff');
  ell(c, -10, -5, 2.6, 1.4, 'rgba(255,94,196,.6)'); ell(c, 10, -5, 2.6, 1.4, 'rgba(255,94,196,.6)');
  c.beginPath(); c.arc(0, -4, 3.5, 0.2, Math.PI - 0.2); c.fillStyle = NV; c.fill();
}

/* ===== 10-7 Edge of a black hole ===== */
function bgBlackHole(c) {
  const R = mulberry(1007), bx = 180, by = 146;
  skyG(c, [[0, '#030312'], [0.5, '#120724'], [1, '#1a0830']]);
  nebulae(c, R, 5, 480);
  for (let i = 0; i < 170; i++) {
    const r = 70 + R() * 320, an = R() * Math.PI * 2, l = 0.01 + 18 / r * 0.25;
    c.beginPath(); c.arc(bx, by, r, an, an + l); c.lineWidth = R() < 0.1 ? 1.8 : 1; c.strokeStyle = `rgba(255,255,255,${0.2 + R() * 0.6})`; c.stroke();
  }
  // spacetime well
  c.save(); c.lineWidth = 1;
  const ring = (k) => { const rr0 = 24 + k * 22; return { cy: 300 + 120 * Math.exp(-rr0 / 70), rx: rr0 * 1.25, ry: rr0 * 0.3 }; };
  for (let k = 0; k < 12; k++) { const { cy, rx, ry } = ring(k); c.beginPath(); c.ellipse(bx, cy, rx, ry, 0, 0, Math.PI * 2); c.strokeStyle = `rgba(94,231,255,${0.42 - k * 0.028})`; c.stroke(); }
  for (let j = 0; j < 24; j++) { const an = j / 24 * Math.PI * 2; c.beginPath(); for (let k = 0; k < 12; k++) { const { cy, rx, ry } = ring(k); const x = bx + Math.cos(an) * rx, y = cy + Math.sin(an) * ry; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.strokeStyle = 'rgba(255,94,196,.2)'; c.stroke(); }
  c.restore();
  glowAt(c, bx, by, 190, '255,110,60', 0.16); glowAt(c, bx, by, 120, '255,94,196', 0.22);
  const disk = (from, to) => { for (const [rx, lw, col] of [[146, 6, 'rgba(255,94,196,.45)'], [126, 12, 'rgba(255,140,90,.75)'], [104, 10, 'rgba(255,200,120,.9)'], [86, 5, 'rgba(255,245,220,.95)']]) { c.beginPath(); c.ellipse(bx, by, rx, rx * 0.17, 0, from, to); c.lineWidth = lw; c.strokeStyle = col; c.stroke(); } };
  disk(Math.PI, Math.PI * 2);
  c.beginPath(); c.arc(bx, by, 62, 0, Math.PI * 2); c.lineWidth = 14; c.strokeStyle = 'rgba(255,150,90,.45)'; c.stroke();
  c.beginPath(); c.arc(bx, by, 56, 0, Math.PI * 2); c.lineWidth = 6; c.strokeStyle = 'rgba(255,215,150,.85)'; c.stroke();
  c.beginPath(); c.arc(bx, by, 50, 0, Math.PI * 2); c.lineWidth = 1.5; c.strokeStyle = '#fff4dc'; c.stroke();
  circ(c, bx, by, 48, '#000');
  disk(0, Math.PI);
}
function drawBeacon(c, a) {
  const p = 0.5 + 0.5 * Math.sin(a.t * 4);
  circ(c, 0, -24, 10 + p * 5, `rgba(255,190,90,${0.12 + 0.2 * (1 - p)})`);
  circ(c, 0, -24, 7, '#ff9a3a'); circ(c, -2, -26, 2, '#fff2b0');
  rr(c, -5, -18, 10, 5, 1); c.fillStyle = '#5a6378'; c.fill();
  c.save(); rr(c, -15, -13, 30, 34, 6); c.clip(); c.fillStyle = NV; c.fillRect(-15, -13, 30, 34);
  c.fillStyle = NY; for (let i = -3; i < 4; i++) poly(c, [i * 10 - 15, 21, i * 10 - 10, 21, i * 10 + 20, -13, i * 10 + 15, -13], NY);
  c.restore();
  rr(c, -15, -13, 30, 34, 6); c.lineWidth = 1.5; c.strokeStyle = '#c9ced8'; c.stroke();
  ell(c, 0, 26, 12, 4, '#8a93a6'); c.fillStyle = '#8a93a6'; c.fillRect(-1.5, 21, 3, 4);
}
function drawHorizonSign(c) {
  rr(c, -72, -28, 144, 56, 6); c.fillStyle = '#16102c'; c.fill(); neonStroke(c, NY, 2);
  poly(c, [-56, 10, -42, -16, -28, 10], NY); txt(c, '!', -42, 1, '900 14px "Noto Sans TC", sans-serif', NV);
  txt(c, T('事件視界', 'EVENT HORIZON'), 18, -12, T('800 13px "Noto Sans TC", sans-serif', '800 10.5px "Noto Sans TC", sans-serif'), '#fff');
  txt(c, T('就在前方', 'AHEAD'), 18, 3, '700 9px "Noto Sans TC", sans-serif', NY);
  txt(c, T('過了就回不來', 'NO WAY BACK'), 18, 16, '700 8px "Noto Sans TC", sans-serif', NP);
}
function drawSlowClock(c, a) {
  circ(c, 0, 0, 36, '#c9ced8'); circ(c, 0, 0, 32, '#fff8ec');
  c.strokeStyle = NV;
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6, l = i % 3 ? 3 : 6; c.lineWidth = i % 3 ? 1.2 : 2.4; c.beginPath(); c.moveTo(Math.sin(an) * 29, -Math.cos(an) * 29); c.lineTo(Math.sin(an) * (29 - l), -Math.cos(an) * (29 - l)); c.stroke(); }
  txt(c, T('時間變慢中', 'TIME: SLOW'), 0, 14, '700 6px "Noto Sans TC", sans-serif', '#a35d8a');
  const hand = (an, l, w, col) => { c.save(); c.rotate(an); c.beginPath(); c.moveTo(0, 4); c.lineTo(0, -l); c.lineWidth = w; c.lineCap = 'round'; c.strokeStyle = col; c.stroke(); c.restore(); };
  hand(-Math.PI / 3, 15, 3.2, NV); hand(Math.PI / 3, 22, 2.2, NV); hand(0.4 + a.t * 0.06, 25, 1, NP);
  circ(c, 0, 0, 2.6, NP);
  c.beginPath(); c.arc(0, 0, 36, Math.PI * 1.1, Math.PI * 1.4); c.lineWidth = 2; c.strokeStyle = 'rgba(255,255,255,.8)'; c.stroke();
}
function drawEscapeShip(c, a) {
  const f = 0.8 + Math.sin(a.t * 28) * 0.14 + Math.sin(a.t * 15) * 0.08;
  poly(c, [-52, -9, -52 - 18 * f, 0, -52, 9], '#ff5ec4'); poly(c, [-52, -5, -52 - 11 * f, 0, -52, 5], '#fff2b0');
  poly(c, [-30, -12, -48, -26, -14, -12], '#d6453a'); poly(c, [-30, 12, -48, 26, -14, 12], '#d6453a');
  c.beginPath(); c.moveTo(-52, -12); c.lineTo(30, -12); c.quadraticCurveTo(64, -10, 68, 0); c.quadraticCurveTo(64, 10, 30, 12); c.lineTo(-52, 12); c.closePath(); c.fillStyle = '#f4f6fb'; c.fill();
  c.fillStyle = '#c9ced8'; c.fillRect(-52, 5, 90, 7);
  circ(c, 26, -2, 6, NV); circ(c, 24, -4, 2, '#7fb8ff');
  c.fillStyle = '#d6453a'; c.fillRect(-40, -12, 5, 24);
  txt(c, T('全速逃離', 'FULL THRUST'), -6, -2, '800 7px "Noto Sans TC", sans-serif', NV);
}
function drawBoxBot(c, a) {
  const bob = Math.sin(a.t * 3) * 0.2 * a.live;
  c.strokeStyle = '#8a93a6'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-14, 10); c.lineTo(-24, 2 + bob * 20); c.moveTo(14, 10); c.lineTo(24, 2 - bob * 20); c.stroke();
  circ(c, -24, 2 + bob * 20, 3.5, NC); circ(c, 24, 2 - bob * 20, 3.5, NC);
  rr(c, -12, 22, 8, 10, 2); c.fillStyle = '#5a6378'; c.fill(); rr(c, 4, 22, 8, 10, 2); c.fill();
  rr(c, -15, 2, 30, 24, 5); c.fillStyle = '#b9c2d3'; c.fill(); c.fillStyle = NP; c.fillRect(-6, 9, 12, 3);
  rr(c, -20, -26, 40, 28, 7); c.fillStyle = '#e9edf5'; c.fill();
  rr(c, -15, -21, 30, 18, 4); c.fillStyle = NV; c.fill();
  txt(c, '> <', 0, -12, '800 10px "JetBrains Mono", monospace', NC);
  c.fillStyle = '#8a93a6'; c.fillRect(-1, -34, 2, 8); circ(c, 0, -34, 3, NY);
}
function drawAstroWave(c, a) { astroQ(c, 0.5, -2.3 + Math.sin(a.t * 4) * 0.35 * a.live); }

/* ===== 10-8 Join the stars at Lulin Observatory ===== */
function bgLulin(c) {
  const R = mulberry(1008), px = 180, py = 62;
  skyG(c, [[0, '#060719'], [0.42, '#170b38'], [0.58, '#3a1658'], [0.66, '#6a2470']]);
  nebulae(c, R, 4, 300);
  starfield(c, R, 170, 320);
  // star trails circling Polaris
  for (let i = 0; i < 26; i++) { const r = 20 + R() * 300, an = R() * Math.PI * 2; c.beginPath(); c.arc(px, py, r, an, an + 0.35 + R() * 0.4); c.lineWidth = 1; c.strokeStyle = `rgba(${R() < 0.5 ? '160,200,255' : '255,170,230'},${0.15 + R() * 0.2})`; c.stroke(); }
  glowAt(c, px, py, 26, '200,230,255', 0.6); sparkle(c, px, py, 9, '#fff'); circ(c, px, py, 2.2, '#fff');
  ridgeLine(c, 300, 40, 81, '#2a1446', 'rgba(94,231,255,.45)', 26);
  // observatory on the left
  glowAt(c, 66, 230, 90, '94,231,255', 0.12);
  c.fillStyle = '#d9dde6'; c.fillRect(14, 222, 104, 96); c.fillStyle = 'rgba(80,60,130,.35)'; c.fillRect(80, 222, 38, 96);
  const dg = c.createLinearGradient(14, 170, 118, 222); dg.addColorStop(0, '#ffffff'); dg.addColorStop(1, '#a9a4c4');
  c.beginPath(); c.arc(66, 222, 52, Math.PI, 0); c.closePath(); c.fillStyle = dg; c.fill();
  poly(c, [56, 222, 52, 172, 70, 171, 76, 222], '#140c2a');
  c.fillStyle = '#5a6378'; c.fillRect(10, 220, 112, 4);
  c.beginPath(); c.arc(66, 222, 52, Math.PI, 0); c.lineWidth = 1.5; c.strokeStyle = 'rgba(94,231,255,.7)'; c.stroke();
  // deck
  const g = c.createLinearGradient(0, 316, 0, H); g.addColorStop(0, '#3a2350'); g.addColorStop(1, '#1a0f2a');
  c.fillStyle = g; c.fillRect(0, 316, W, H - 316);
  c.save(); c.beginPath(); c.rect(0, 316, W, H - 316); c.clip(); neonGrid(c, 316, 'rgba(94,231,255,.16)', 180, 10); c.restore();
  c.fillStyle = 'rgba(255,94,196,.7)'; c.fillRect(0, 316, W, 1.5);
  // railing
  c.fillStyle = '#2a1a40'; c.fillRect(0, 404, W, 4); for (let x = 12; x < W; x += 44) c.fillRect(x, 404, 4, 76);
  c.fillStyle = 'rgba(94,231,255,.5)'; c.fillRect(0, 403, W, 1);
  rr(c, 286, 404, 22, 76, 2); c.fillStyle = '#3a2350'; c.fill();
}
function holoFrame(c, w, h, stars, lines, zh, en, col) {
  rr(c, -w / 2, -h / 2, w, h, 6); c.fillStyle = 'rgba(30,18,70,.62)'; c.fill(); neonStroke(c, col, 1.5);
  c.strokeStyle = NY; c.lineWidth = 2; const cx = w / 2 - 3, cy = h / 2 - 3;
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { c.beginPath(); c.moveTo(sx * cx, sy * (cy - 7)); c.lineTo(sx * cx, sy * cy); c.lineTo(sx * (cx - 7), sy * cy); c.stroke(); }
  c.beginPath(); lines.forEach((seg) => seg.forEach((k, i) => (i ? c.lineTo : c.moveTo).call(c, stars[k][0], stars[k][1]))); c.lineWidth = 1; c.strokeStyle = 'rgba(94,231,255,.75)'; c.stroke();
  for (const [x, y, r, sc] of stars) { circ(c, x, y, r + 2.5, 'rgba(255,255,255,.18)'); sparkle(c, x, y, r + 2, sc || '#fff'); }
  txt(c, T(zh, en), 0, h / 2 - 9, '700 8px "Noto Sans TC", sans-serif', col);
}
const DIPPER = [[-50, -12, 2], [-34, -18, 2.4], [-18, -14, 2.4], [-2, -9, 1.8], [4, 9, 2.2], [32, 11, 2.4], [36, -12, 2.6]];
function drawDipper(c) { holoFrame(c, 124, 72, DIPPER, [[0, 1, 2, 3, 4, 5, 6, 3]], '北斗七星', 'BIG DIPPER', NC); }
const CASSIO = [[-40, 6, 2.2], [-20, -14, 2.6], [0, 0, 2.2], [20, -16, 2.6], [40, -2, 2]];
function drawCassio(c) { holoFrame(c, 112, 64, CASSIO, [[0, 1, 2, 3, 4]], '仙后座', 'CASSIOPEIA', NP); }
const ORION = [[-22, -34, 3, '#ffb070'], [20, -30, 2.2], [-9, -2, 1.8], [0, -4, 1.8], [9, -6, 1.8], [-18, 26, 2], [22, 24, 3, '#bfe0ff']];
function drawOrion(c) { holoFrame(c, 86, 108, ORION, [[0, 1, 4, 3, 2, 0], [2, 5, 6, 4]], '獵戶座', 'ORION', NC); }
function drawUranus(c) {
  c.beginPath(); c.ellipse(0, 0, 38, 7, 0, Math.PI, 0); c.lineWidth = 1.6; c.strokeStyle = 'rgba(200,240,255,.7)'; c.stroke();
  circ(c, 0, 0, 16, '#8fe3e8'); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(-15, -5, 30, 3); c.fillRect(-14, 4, 28, 2);
  c.beginPath(); c.arc(0, 0, 16, -0.6, Math.PI * 0.6); c.lineWidth = 5; c.strokeStyle = 'rgba(30,60,100,.25)'; c.stroke();
  ell(c, -5, -6, 5, 3, 'rgba(255,255,255,.45)', -0.5);
  c.beginPath(); c.ellipse(0, 0, 38, 7, 0, 0, Math.PI); c.lineWidth = 1.6; c.strokeStyle = 'rgba(200,240,255,.85)'; c.stroke();
  c.beginPath(); c.ellipse(0, 0, 32, 5.5, 0, 0, Math.PI); c.lineWidth = 0.8; c.stroke();
}
function drawLulinSign(c) {
  rr(c, -62, -22, 124, 44, 6); c.fillStyle = '#16102c'; c.fill(); neonStroke(c, NC, 1.6);
  neonText(c, T('鹿林天文台', 'LULIN OBSERVATORY'), 0, -7, T('800 14px "Noto Sans TC", sans-serif', '800 10.5px "Noto Sans TC", sans-serif'), NC);
  txt(c, T('海拔 2,862 公尺', 'ALTITUDE 2,862 M'), 0, 10, '700 8px "Noto Sans TC", sans-serif', NY);
}
function drawReflector(c) {
  rr(c, -9, 4, 18, 40, 3); c.fillStyle = '#8a93a6'; c.fill(); rr(c, -24, 42, 48, 8, 3); c.fillStyle = '#5a6378'; c.fill();
  c.fillStyle = '#b9c2d3'; c.fillRect(-18, -8, 5, 16); c.fillRect(13, -8, 5, 16); c.fillRect(-18, 4, 36, 5);
  rr(c, -48, -30, 90, 26, 6); c.fillStyle = '#f4f6fb'; c.fill();
  c.fillStyle = '#20294a'; c.fillRect(-48, -30, 10, 26); rr(c, 38, -33, 10, 32, 2); c.fill();
  c.fillStyle = NP; c.fillRect(-20, -30, 3, 26); c.fillStyle = NC; c.fillRect(-15, -30, 2, 26);
  c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(-36, -27, 72, 3);
  rr(c, 4, -40, 24, 7, 3); c.fillStyle = '#b9c2d3'; c.fill(); c.fillStyle = '#8a93a6'; c.fillRect(10, -33, 2, 3); c.fillRect(20, -33, 2, 3);
  rr(c, -6, -36, 7, 7, 1.5); c.fillStyle = '#3a3f55'; c.fill();
}
function drawOwl(c, a) {
  const bl = Math.sin(a.t * 1.1) > 0.94 ? 0.2 : 1, tilt = Math.sin(a.t * 1.7) * 0.12 * a.live;
  c.fillStyle = '#8a6a4a'; c.fillRect(-24, 26, 48, 5);
  ell(c, -7, 26, 4, 2.5, NY); ell(c, 7, 26, 4, 2.5, NY);
  ell(c, 0, 8, 19, 20, '#7a5fb0'); ell(c, 0, 12, 12, 14, '#c9b8f0');
  c.strokeStyle = 'rgba(122,95,176,.6)'; c.lineWidth = 1; for (const y of [6, 12, 18]) { c.beginPath(); c.arc(0, y, 6, 0.4, Math.PI - 0.4); c.stroke(); }
  ell(c, -18, 10, 6, 13, '#5f4790', 0.2); ell(c, 18, 10, 6, 13, '#5f4790', -0.2);
  c.save(); c.translate(0, -12); c.rotate(tilt);
  poly(c, [-17, -8, -14, -22, -6, -12], '#5f4790'); poly(c, [17, -8, 14, -22, 6, -12], '#5f4790');
  ell(c, 0, 0, 19, 15, '#7a5fb0');
  circ(c, -8, 0, 8, '#f4f6fb'); circ(c, 8, 0, 8, '#f4f6fb');
  ell(c, -8, 0, 4.6, 4.6 * bl, NV); ell(c, 8, 0, 4.6, 4.6 * bl, NV);
  if (bl > 0.5) { circ(c, -6.5, -1.6, 1.5, NC); circ(c, 9.5, -1.6, 1.5, NC); }
  poly(c, [-3, 6, 3, 6, 0, 11], NY);
  c.restore();
}

/* ===== 10-9 Space elevator ===== */
function bgElevator(c) {
  const R = mulberry(1009), tx = 180;
  skyG(c, [[0, '#05061a'], [0.45, '#1d0c3a'], [0.8, '#202a6a'], [1, '#2a4a9a']]);
  nebulae(c, R, 5, 360);
  starfield(c, R, 160, 400);
  // Earth far below
  const ex = 180, ey = 900, er = 480;
  glowAt(c, ex, ey - er, 160, '94,200,255', 0.3);
  c.save(); c.beginPath(); c.arc(ex, ey, er, 0, Math.PI * 2); c.clip();
  const eg = c.createLinearGradient(0, 420, 0, 480); eg.addColorStop(0, '#3a8ae0'); eg.addColorStop(1, '#1a4f9a'); c.fillStyle = eg; c.fillRect(0, 410, W, 70);
  [[60, 450, 50, 10], [250, 440, 70, 9], [330, 466, 40, 8]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, 'rgba(90,170,110,.65)'));
  [[120, 436, 60, 4], [210, 458, 70, 5], [300, 446, 40, 3], [30, 470, 40, 4]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, 'rgba(255,255,255,.55)'));
  c.restore();
  c.beginPath(); c.arc(ex, ey, er + 4, 0, Math.PI * 2); c.lineWidth = 8; c.strokeStyle = 'rgba(140,210,255,.4)'; c.stroke(); c.lineWidth = 2; c.strokeStyle = 'rgba(200,240,255,.9)'; c.stroke();
  // the station ring: back half, tether, hub, front half
  const ry = 262, ring = (from, to) => { c.beginPath(); c.ellipse(tx, ry, 168, 36, 0, from, to); c.lineWidth = 16; c.strokeStyle = '#b9c2d3'; c.stroke(); c.lineWidth = 6; c.strokeStyle = '#e9edf5'; c.stroke(); };
  ring(Math.PI, Math.PI * 2);
  for (const k of [0.25, 0.5, 0.75]) { c.beginPath(); c.moveTo(tx, ry); c.lineTo(tx + Math.cos(Math.PI + k * Math.PI) * 168, ry + Math.sin(Math.PI + k * Math.PI) * 36); c.lineWidth = 3; c.strokeStyle = '#8a93a6'; c.stroke(); }
  glowAt(c, tx, 240, 60, '255,94,196', 0.2);
  c.fillStyle = 'rgba(94,231,255,.25)'; c.fillRect(tx - 5, 0, 10, 412);
  c.fillStyle = NC; c.fillRect(tx - 1.5, 0, 3, 412);
  c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(tx - 0.5, 0, 1, 412);
  rr(c, tx - 28, ry - 30, 56, 46, 8); c.fillStyle = '#d9dde6'; c.fill(); c.fillStyle = '#8a93a6'; c.fillRect(tx - 28, ry - 4, 56, 4);
  for (const x of [-18, -6, 6, 18]) { circ(c, tx + x, ry - 16, 3, NV); circ(c, tx + x, ry - 16, 1.4, NY); }
  ring(0, Math.PI);
  for (let i = 0; i < 22; i++) { const an = i / 22 * Math.PI; c.fillStyle = i % 3 ? NY : NP; c.fillRect(tx + Math.cos(an) * 168 - 1.5, ry + Math.sin(an) * 36 - 1.5, 3, 3); }
}
function drawClimber(c, a) {
  c.fillStyle = NC; c.fillRect(-1.5, -50, 3, 100);
  rr(c, -10, -50, 20, 10, 3); c.fillStyle = '#5a6378'; c.fill(); rr(c, -10, 40, 20, 10, 3); c.fill();
  circ(c, -6, -45, 3, '#c9ced8'); circ(c, 6, -45, 3, '#c9ced8'); circ(c, -6, 45, 3, '#c9ced8'); circ(c, 6, 45, 3, '#c9ced8');
  rr(c, -38, -40, 76, 80, 12); c.fillStyle = '#f4f6fb'; c.fill();
  c.fillStyle = NP; c.fillRect(-38, 18, 76, 5); c.fillStyle = NC; c.fillRect(-38, 25, 76, 2);
  rr(c, -30, -30, 60, 40, 8); c.fillStyle = NV; c.fill();
  for (const [x, col] of [[-16, '#ffd1a8'], [0, '#7be38a'], [16, '#c9a27a']]) { circ(c, x, -6, 7, col); ell(c, x, 6, 8, 5, '#c9ced8'); circ(c, x - 2.4, -7, 1.2, NV); circ(c, x + 2.4, -7, 1.2, NV); }
  poly(c, [-30, -30, -10, -30, -30, 0], 'rgba(255,255,255,.12)');
  const p = 0.5 + 0.5 * Math.sin(a.t * 5); circ(c, 0, -36, 2.4, `rgba(255,94,196,${0.4 + 0.6 * p})`);
  txt(c, T('上行 ▲', 'UP ▲'), 0, 32, '800 7px "Noto Sans TC", sans-serif', '#5a6378');
}
function drawGuideLight(c, a) {
  const p = 0.5 + 0.5 * Math.sin(a.t * 3.5);
  circ(c, 0, -14, 11 + p * 4, `rgba(94,231,255,${0.14 + 0.2 * (1 - p)})`);
  c.fillStyle = '#8a93a6'; c.fillRect(-1.5, -2, 3, 26); rr(c, -12, 20, 24, 6, 2); c.fillStyle = '#5a6378'; c.fill();
  rr(c, -9, -24, 18, 22, 5); c.fillStyle = '#e9edf5'; c.fill();
  rr(c, -6, -21, 12, 16, 4); c.fillStyle = NC; c.fill(); c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(-4, -19, 3, 10);
}
function drawGeoDisplay(c) {
  rr(c, -56, -22, 112, 44, 6); c.fillStyle = '#0d0a1c'; c.fill(); neonStroke(c, NP, 1.5);
  txt(c, '▲ 35,786 km', 0, -6, '800 14px "JetBrains Mono", monospace', NC);
  txt(c, T('已抵達靜止軌道', 'GEOSTATIONARY ORBIT'), 0, 11, '700 8px "Noto Sans TC", sans-serif', NY);
}
function drawGeoSign(c) {
  c.fillStyle = '#8a93a6'; c.fillRect(-40, 18, 4, 10); c.fillRect(36, 18, 4, 10);
  rr(c, -62, -20, 124, 40, 6); c.fillStyle = '#f4f6fb'; c.fill(); c.fillStyle = NV; c.fillRect(-62, 8, 124, 12);
  rr(c, -62, -20, 124, 40, 6); c.lineWidth = 1.5; c.strokeStyle = '#8a93a6'; c.stroke();
  txt(c, T('太空電梯 赤道線', 'SPACE ELEVATOR'), 0, -6, '800 12px "Noto Sans TC", sans-serif', NV);
  txt(c, T('靜止軌道站', 'GEO STATION'), 0, 14, '700 8px "Noto Sans TC", sans-serif', NY);
}
function drawCrate(c) {
  rr(c, -32, -24, 64, 48, 4); c.fillStyle = '#c9ced8'; c.fill();
  c.fillStyle = '#9aa3b5'; c.fillRect(-32, -24, 64, 6); c.fillRect(-32, 18, 64, 6); c.fillRect(-32, -24, 6, 48); c.fillRect(26, -24, 6, 48);
  rr(c, -24, -12, 48, 24, 3); c.fillStyle = NY; c.fill();
  txt(c, T('寄往月球', 'TO THE MOON'), 0, -4, T('800 7.5px "Noto Sans TC", sans-serif', '800 6.5px "Noto Sans TC", sans-serif'), NV);
  txt(c, T('易碎 · 輕放', 'FRAGILE'), 0, 6, '700 6.5px "Noto Sans TC", sans-serif', '#d6453a');
}
function drawPorterBot(c, a) {
  const w = Math.sin(a.t * 3) * 0.12 * a.live;
  c.fillStyle = '#8a93a6'; c.fillRect(-1, -34, 2, 10); circ(c, 0, -34, 3, NC);
  ell(c, 0, -2, 20, 22, '#f4f6fb'); ell(c, 0, 8, 18, 11, '#dfe4ee');
  c.fillStyle = NP; c.fillRect(-19, 2, 38, 3);
  rr(c, -14, -20, 28, 17, 8); c.fillStyle = NV; c.fill();
  c.strokeStyle = NC; c.lineWidth = 2; c.lineCap = 'round';
  c.beginPath(); c.arc(-6, -9, 3.5, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.beginPath(); c.arc(6, -9, 3.5, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
  ell(c, -13, -1, 2.4, 1.3, 'rgba(255,94,196,.6)'); ell(c, 13, -1, 2.4, 1.3, 'rgba(255,94,196,.6)');
  c.strokeStyle = '#b9c2d3'; c.lineWidth = 3; c.beginPath(); c.moveTo(-17, 6); c.lineTo(-22, 18 + w * 10); c.moveTo(17, 6); c.lineTo(22, 18 - w * 10); c.stroke();
  c.save(); c.rotate(w * 0.3); rr(c, -22, 14, 44, 18, 3); c.fillStyle = '#e3b04b'; c.fill(); c.fillStyle = '#b8862e'; c.fillRect(-2, 14, 4, 18); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(-20, 16, 40, 2); c.restore();
}

/* ===== 10-10 Back to Earth: splashdown at sunset ===== */
function firework(c, x, y, r, col, n = 22) {
  glowAt(c, x, y, r * 1.3, col, 0.22);
  for (let k = 0; k < n; k++) {
    const an = k / n * Math.PI * 2, x1 = x + Math.cos(an) * r * 0.35, y1 = y + Math.sin(an) * r * 0.35, x2 = x + Math.cos(an) * r, y2 = y + Math.sin(an) * r + r * 0.08;
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineWidth = 1.3; c.strokeStyle = `rgba(${col},.75)`; c.stroke();
    circ(c, x2, y2, 1.6, `rgb(${col})`);
  }
  circ(c, x, y, 2.5, '#fff');
}
function bgHome(c) {
  const R = mulberry(1010), hy = 300;
  const sky = skyG(c, [[0, '#0a0828'], [0.22, '#2a0f50'], [0.42, '#7a2a78'], [0.56, '#e0587a'], [0.625, '#ffb86a']]);
  starfield(c, R, 90, 150);
  glowAt(c, 180, hy, 230, '255,120,160', 0.35);
  synthSun(c, 180, hy, 98, sky, '#ffe98a', '#ff4fa0', 8);
  firework(c, 40, 62, 30, '255,94,196');
  firework(c, 322, 62, 34, '94,231,255', 26);
  firework(c, 300, 150, 18, '255,209,102', 16);
  firework(c, 26, 140, 16, '160,255,190', 14);
  // a faint ISS-style streak heading back up
  c.beginPath(); c.moveTo(250, 20); c.lineTo(296, 12); c.lineWidth = 1.2; c.strokeStyle = 'rgba(255,255,255,.5)'; c.stroke(); circ(c, 296, 12, 1.6, '#fff');
  // shoreline: palms on the left, the lighthouse rock on the right
  c.fillStyle = '#2a0f3e'; c.beginPath(); c.moveTo(0, hy + 2); c.lineTo(0, hy - 8); c.quadraticCurveTo(50, hy - 14, 110, hy - 2); c.lineTo(110, hy + 2); c.closePath(); c.fill();
  for (const [x, h, lean] of [[20, 40, -6], [44, 52, 4], [78, 34, 8]]) {
    c.beginPath(); c.moveTo(x, hy - 6); c.quadraticCurveTo(x + lean, hy - 6 - h / 2, x + lean * 1.4, hy - 6 - h); c.lineWidth = 3; c.strokeStyle = '#2a0f3e'; c.stroke();
    const tx = x + lean * 1.4, ty = hy - 6 - h;
    for (const an of [-2.8, -2.2, -1.6, -0.9, -0.3]) { c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + Math.cos(an) * 12, ty + Math.sin(an) * 12 - 4, tx + Math.cos(an) * 20, ty + Math.sin(an) * 14 + 6); c.lineWidth = 2.6; c.stroke(); }
  }
  c.fillStyle = '#2a0f3e'; c.beginPath(); c.moveTo(286, hy + 4); c.quadraticCurveTo(300, hy - 12, 324, hy - 12); c.quadraticCurveTo(350, hy - 12, 360, hy - 2); c.lineTo(360, hy + 4); c.closePath(); c.fill();
  // the sea
  const sg = c.createLinearGradient(0, hy, 0, H); sg.addColorStop(0, '#5a2a7a'); sg.addColorStop(0.4, '#2a1450'); sg.addColorStop(1, '#100a2a');
  c.fillStyle = sg; c.fillRect(0, hy, W, H - hy);
  c.save(); c.beginPath(); c.rect(0, hy, W, H - hy); c.clip(); neonGrid(c, hy, 'rgba(94,231,255,.14)'); c.restore();
  for (let i = 0; i < 16; i++) { const y = hy + 4 + i * 7, w = 96 - i * 5 + (i % 2) * 8; c.fillStyle = `rgba(255,${190 - i * 6},${130 + i * 4},${0.55 - i * 0.03})`; rr(c, 180 - w / 2, y, w, 2.2, 1); c.fill(); }
  c.fillStyle = 'rgba(255,220,180,.8)'; c.fillRect(0, hy, W, 1.2);
  for (let i = 0; i < 40; i++) { const x = R() * W, y = hy + 20 + R() * 160, w = 6 + R() * 10; c.beginPath(); c.moveTo(x - w, y); c.quadraticCurveTo(x, y - 3, x + w, y); c.lineWidth = 1; c.strokeStyle = 'rgba(255,170,220,.25)'; c.stroke(); }
  // pier with the globe stand
  c.fillStyle = '#4a2a3a'; for (const x of [10, 46, 82]) c.fillRect(x, 466, 6, 14);
  c.fillStyle = '#7a4a4a'; c.fillRect(0, 462, 100, 6); c.fillStyle = 'rgba(255,200,160,.35)'; c.fillRect(0, 462, 100, 1.2);
  c.beginPath(); c.moveTo(33.6, 459.3); c.quadraticCurveTo(30, 463, 36, 462); c.lineWidth = 2.5; c.strokeStyle = '#c9a54a'; c.stroke();
  ell(c, 36, 462, 11, 2.6, '#c9a54a');
}
function chute(c, a, dir) {
  const sw = Math.sin(a.t * 1.6) * 1.2 * a.live, ax = 0, ay = -58, rim = [];
  for (let i = 0; i <= 8; i++) { const f = i / 8, x = -48 + f * 96; rim.push([x, -18 + Math.sin(f * Math.PI) * 4 + sw * (f - 0.5)]); }
  for (let i = 0; i < 8; i++) {
    const [x1, y1] = rim[i], [x2, y2] = rim[i + 1];
    c.beginPath(); c.moveTo(ax, ay); c.quadraticCurveTo(x1 * 1.08, ay + 6, x1, y1); c.quadraticCurveTo((x1 + x2) / 2, y1 + 5, x2, y2); c.quadraticCurveTo(x2 * 1.08, ay + 6, ax, ay); c.closePath();
    c.fillStyle = i % 2 ? '#fff4f8' : '#ff6fa8'; c.fill();
  }
  ell(c, ax, ay + 3, 5, 2, 'rgba(60,20,60,.5)');
  c.beginPath(); c.moveTo(-40, -44); c.quadraticCurveTo(0, -60, 40, -44); c.lineWidth = 3; c.strokeStyle = 'rgba(255,255,255,.25)'; c.stroke();
  c.lineWidth = 0.8; c.strokeStyle = 'rgba(255,255,255,.75)'; c.beginPath();
  for (let i = 0; i <= 8; i += 2) { c.moveTo(rim[i][0], rim[i][1]); c.lineTo(22 * dir, 60); } c.stroke();
}
function drawChuteL(c, a) { chute(c, a, 1); }
function drawChuteR(c, a) { chute(c, a, -1); }
function drawCapsule(c) {
  c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(0, -26); c.lineTo(-28, -44); c.moveTo(0, -26); c.lineTo(28, -44); c.stroke();
  rr(c, -8, -30, 16, 7, 2); c.fillStyle = '#c9ced8'; c.fill();
  poly(c, [-13, -24, 13, -24, 29, 22, -29, 22], '#f4f6fb'); poly(c, [4, -24, 13, -24, 29, 22, 12, 22], 'rgba(120,110,160,.25)');
  poly(c, [-17, -12, 17, -12, 19, -7, -19, -7], NV);
  circ(c, -5, 2, 5.5, NV); circ(c, -6.5, 0.5, 1.8, 'rgba(127,184,255,.9)');
  c.fillStyle = NP; c.fillRect(-26, 13, 52, 3);
  ell(c, 10, 14, 10, 4, 'rgba(90,60,70,.25)', -0.2); ell(c, -14, 18, 8, 3, 'rgba(90,60,70,.2)');
  ell(c, 0, 23, 30, 6, '#4a3238'); ell(c, 0, 22, 28, 3.6, '#6a4a48');
  txt(c, '100', 9, 3, '800 8px "JetBrains Mono", monospace', NP);
}
function drawLighthouse(c) {
  const p = 'rgba(255,230,150,';
  circ(c, 0, -42, 18, p + '.25)');
  c.save(); c.beginPath(); c.moveTo(-10, -30); c.lineTo(10, -30); c.lineTo(17, 56); c.lineTo(-17, 56); c.closePath(); c.clip();
  for (let i = 0; i < 6; i++) { c.fillStyle = i % 2 ? '#f4f6fb' : '#ff5ea8'; c.fillRect(-18, -30 + i * 15, 36, 15); }
  c.fillStyle = 'rgba(60,20,70,.2)'; c.fillRect(4, -30, 14, 86);
  c.restore();
  rr(c, -5, 40, 10, 16, 4); c.fillStyle = NV; c.fill(); circ(c, 0, 4, 2.4, NV); circ(c, 0, 20, 2.4, NV);
  rr(c, -15, -34, 30, 5, 1.5); c.fillStyle = NV; c.fill();
  c.fillStyle = NV; for (const x of [-13, -6, 1, 8]) c.fillRect(x, -40, 1.5, 6); c.fillRect(-14, -41, 28, 1.5);
  rr(c, -9, -50, 18, 16, 2); c.fillStyle = '#fff0b0'; c.fill(); c.fillStyle = 'rgba(255,190,80,.8)'; c.fillRect(-9, -44, 18, 4);
  poly(c, [-12, -50, 0, -59, 12, -50], NV); circ(c, 0, -59, 2, NY);
}
function drawRecoveryShip(c) {
  ell(c, 0, 33, 92, 5, 'rgba(94,231,255,.3)');
  c.beginPath(); c.moveTo(-94, 4); c.lineTo(94, 4); c.lineTo(80, 31); c.lineTo(-86, 31); c.closePath(); c.fillStyle = NV; c.fill();
  c.fillStyle = NP; c.fillRect(-92, 7, 184, 3); c.fillStyle = NC; c.fillRect(-90, 12, 178, 1.5);
  txt(c, T('回收船', 'RECOVERY'), 34, 21, '800 8px "Noto Sans TC", sans-serif', '#fff');
  // stern A-frame crane and the deck
  c.strokeStyle = '#c9ced8'; c.lineWidth = 3; c.beginPath(); c.moveTo(-84, 4); c.lineTo(-70, -30); c.lineTo(-56, 4); c.stroke();
  c.lineWidth = 1; c.beginPath(); c.moveTo(-70, -30); c.lineTo(-70, -10); c.stroke(); poly(c, [-73, -10, -67, -10, -70, -6], NY);
  // the welcome crowd with balloons
  for (const [x, col, bx] of [[-44, '#ffd1a8', NP], [-34, '#c9a27a', NY], [-24, '#7be38a', NC]]) {
    c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 0.7; c.beginPath(); c.moveTo(x + 3, -6); c.lineTo(x + 5, -26); c.stroke();
    ell(c, x + 5, -30, 4, 5, bx);
    rr(c, x - 3, -6, 6, 10, 2); c.fillStyle = '#f4f6fb'; c.fill(); circ(c, x, -9, 3.2, col);
  }
  // superstructure
  rr(c, -8, -18, 64, 22, 3); c.fillStyle = '#f4f6fb'; c.fill();
  c.fillStyle = NV; for (let x = -2; x < 50; x += 9) c.fillRect(x, -12, 6, 5);
  rr(c, 6, -32, 40, 14, 3); c.fillStyle = '#e9edf5'; c.fill();
  c.fillStyle = NC; c.fillRect(10, -28, 32, 5);
  c.fillStyle = '#8a93a6'; c.fillRect(25, -40, 2, 8); circ(c, 26, -39, 2.6, '#f4f6fb');
  c.fillStyle = '#8a93a6'; c.fillRect(60, -6, 26, 2); c.fillRect(84, -6, 2, 10);
}
function drawHomeSign(c) {
  c.fillStyle = '#3a2350'; c.fillRect(-52, 14, 5, 12); c.fillRect(47, 14, 5, 12);
  ell(c, -49.5, 26, 8, 2, 'rgba(255,255,255,.3)'); ell(c, 49.5, 26, 8, 2, 'rgba(255,255,255,.3)');
  rr(c, -72, -26, 144, 42, 8); c.fillStyle = '#16102c'; c.fill(); neonStroke(c, NP, 2);
  neonText(c, T('歡迎回家', 'WELCOME HOME'), 0, -10, T('900 17px "Noto Sans TC", sans-serif', '900 14px "Noto Sans TC", sans-serif'), NC);
  txt(c, T('第 100 關 · 任務完成', 'STAGE 100 · MISSION DONE'), 0, 7, '700 7.5px "Noto Sans TC", sans-serif', NY);
  sparkle(c, -62, -16, 4, NY); sparkle(c, 62, 6, 4, NY);
}
function drawDolphin(c, a) {
  ell(c, -4, 20, 26, 3.5, 'rgba(255,255,255,.22)');
  for (const [x, y] of [[-26, 14], [-20, 10], [14, 16]]) circ(c, x, y, 1.4, 'rgba(200,240,255,.7)');
  poly(c, [-28, 0, -38, -9, -35, 0, -38, 9], '#5a96d8');
  poly(c, [-4, -11, 2, -21, 9, -11], '#5a96d8');
  c.beginPath(); c.moveTo(-30, 1); c.quadraticCurveTo(-10, -16, 16, -10); c.quadraticCurveTo(28, -8, 34, -2); c.quadraticCurveTo(28, 3, 16, 4); c.quadraticCurveTo(-6, 10, -30, 1); c.closePath(); c.fillStyle = '#7ab8f0'; c.fill();
  c.beginPath(); c.moveTo(-18, 4); c.quadraticCurveTo(0, 8, 16, 3); c.quadraticCurveTo(26, 1, 33, -1); c.quadraticCurveTo(20, -2, 4, 1); c.closePath(); c.fillStyle = '#e6f3ff'; c.fill();
  poly(c, [4, 3, 0, 13, 11, 5], '#5a96d8');
  circ(c, 19, -6, 1.9, NV); circ(c, 19.6, -6.6, 0.6, '#fff');
  ell(c, 15, -2, 2.4, 1.2, 'rgba(255,94,196,.55)');
}
function drawGull(c, a) {
  const f = Math.sin(a.t * 6) * a.live;
  const wing = (dir, col) => { c.beginPath(); c.moveTo(-3, -1); c.quadraticCurveTo(dir * 8 - 3, -12 - f * 4, dir * 22 - 3, -9 - f * 9); c.quadraticCurveTo(dir * 12 - 3, -4, 3, 1); c.closePath(); c.fillStyle = col; c.fill(); poly(c, [dir * 22 - 3, -9 - f * 9, dir * 17 - 3, -8 - f * 6, dir * 18 - 3, -11 - f * 8], '#3a3f55'); };
  wing(-1, '#c9cede');
  poly(c, [-12, 0, -21, -3, -20, 5], '#c9ced8');
  ell(c, 0, 3, 13, 7, '#f4f6fb'); ell(c, 10, -2, 6.5, 6, '#f4f6fb');
  poly(c, [15, -2, 23, 0, 15, 1.5], '#ffa53a');
  circ(c, 11.5, -3.5, 1.3, NV);
  ell(c, 7, 2, 2.2, 1.2, 'rgba(255,94,196,.5)');
  wing(1, '#e9ecf5');
}
function drawGlobe(c) {
  c.beginPath(); c.arc(0, 0, 21, -Math.PI / 2, Math.PI / 2); c.lineWidth = 3; c.strokeStyle = '#e3b04b'; c.stroke();
  circ(c, 0, -21, 2.6, '#c9a54a'); circ(c, 0, 21, 2.6, '#c9a54a');
  c.save(); c.beginPath(); c.arc(0, 0, 17, 0, Math.PI * 2); c.clip();
  c.fillStyle = '#2f7dd6'; c.fillRect(-17, -17, 34, 34);
  ell(c, -6, -6, 7, 5, '#5aa56e', 0.4); ell(c, 6, 6, 5, 8, '#5aa56e', -0.2); ell(c, 9, -9, 4, 3, '#5aa56e');
  c.beginPath(); c.moveTo(-17, 0); c.lineTo(17, 0); c.lineWidth = 0.7; c.strokeStyle = 'rgba(255,255,255,.5)'; c.stroke();
  c.beginPath(); c.arc(4, 4, 18, 0, Math.PI * 2); c.lineWidth = 8; c.strokeStyle = 'rgba(10,8,40,.2)'; c.stroke();
  c.restore();
  ell(c, -6, -8, 5, 3, 'rgba(255,255,255,.45)', -0.6);
}
defineChapter({
  key: 'space', order: 10,
  name: { zh: "夜空宇宙", en: "Night Sky" },
  blurb: { zh: "離開地球前的最後一站：無重力也要對齊。", en: "One last stop before leaving Earth: align in zero gravity." },
  style: { zh: "太空合成", en: "Synthwave space" },
  narrator: { zh: "太空人", en: "Astronaut" },
  song: 'space',
    comments: {
      far: [{ zh: ["休士頓，有問題…", "太空站轉來轉去，太空人頭好暈。"], en: ["Houston, problem…", "The station keeps spinning. The astronaut's dizzy."] }, { zh: ["無重力失控", "火箭指向月球以外的地方了。"], en: ["Zero-G chaos", "The rocket is pointing past the Moon."] }],
      close: [{ zh: ["倒數 1…", "只差一點點，對接就要成功了！"], en: ["T-minus 1…", "So close! Docking is about to succeed!"] }, { zh: ["訊號微弱", "太陽能板再轉一下，電就充飽了。"], en: ["Weak signal", "Turn the solar panel a bit more to charge up."] }],
      pass: [{ zh: ["對接成功！", "勉強完成任務，但望遠鏡拍到的星星有點斜。"], en: ["Docked!", "Mission done, but the telescope's stars look tilted."] }, { zh: ["及格任務", "太空人比了個讚（戴著手套看不太出來）。"], en: ["Mission passed", "Thumbs up from the astronaut (hard to see in gloves)."] }],
      good: [{ zh: ["軌道漂亮！", "整座太空站整齊得從地球都看得到。"], en: ["Lovely orbit!", "The station is so tidy you can see it from Earth."] }, { zh: ["優秀組員", "任務徽章閃閃發亮。"], en: ["Top crew", "The mission patch is sparkling."] }],
      perfect: [{ zh: ["宇宙級完美♪", "一度都不差！地球上的人都抬頭為你鼓掌。"], en: ["Cosmic perfect♪", "Not one degree off! All of Earth looks up and claps."] }, { zh: ["傳奇太空人", "你是第一個在無重力下對齊所有東西的人。"], en: ["Space legend", "The first to align everything in zero gravity."] }],
    },
  stages: [
    { key: 'space', title: { zh: "軌道站", en: "Orbital Station" }, place: { zh: "地球軌道 408 km", en: "408 km in orbit" },
      intro: { zh: "最後一站：八件東西、左右太陽能板連動，太空人一直飄。", en: "Last stop: eight objects, linked solar panels, and a floating astronaut." },
      bg: bgSpace, animated: true,
      objects: [
      { id: 'panelL', name: { zh: '左太陽能板', en: 'Left solar panel' }, x: 65, y: 110, w: 70, h: 40, mag: 9, link: { to: 'panelR', k: 0.6 }, draw: drawPanel, sfx: 'twinkle' },
      { id: 'module', name: { zh: '太空站艙段', en: 'Station module' }, x: 180, y: 110, w: 130, h: 50, mag: 6, draw: drawModule, sfx: 'beep' },
      { id: 'panelR', name: { zh: '右太陽能板', en: 'Right solar panel' }, x: 295, y: 110, w: 70, h: 40, mag: 7, draw: drawPanel, sfx: 'twinkle' },
      { id: 'astro', name: { zh: '太空人', en: 'Astronaut' }, x: 180, y: 215, w: 60, h: 80, mag: 14, draw: drawAstro, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 4 * l, dy: Math.sin(t * 1.2) * 5 * l }), call: 'radio' },
      { id: 'rocket', name: { zh: '火箭', en: 'Rocket' }, x: 60, y: 285, w: 50, h: 120, mag: 10, draw: drawRocket, sfx: 'boing' },
      { id: 'sat', name: { zh: '衛星天線', en: 'Satellite dish' }, x: 300, y: 265, w: 80, h: 70, mag: 12, draw: drawSat, sfx: 'beep' },
      { id: 'scope', name: { zh: '太空望遠鏡', en: 'Space telescope' }, x: 235, y: 335, w: 90, h: 46, mag: 8, draw: drawScope, sfx: 'twinkle' },
      { id: 'patch', name: { zh: '任務徽章', en: 'Mission patch' }, x: 130, y: 420, w: 120, h: 46, near: true, draw: drawPatch, sfx: 'bell' }
      ] },
    { key: 'space-moon', title: { zh: '月球基地', en: 'Moon Base' }, place: { zh: '月球 寧靜海', en: 'Sea of Tranquility, Moon' },
      intro: { zh: '人類第一次登月就在這附近。地球在天上看著，基地可別歪。', en: 'The first Moon landing was near here. Earth is watching, so keep the base level.' },
      bg: bgMoon, animated: true,
      objects: [
      { id: 'flag', name: { zh: '任務旗', en: 'Mission flag' }, x: 62, y: 236, w: 68, h: 118, mag: 9, draw: drawMoonFlag, sfx: 'shimmer' },
      { id: 'sign', name: { zh: '基地招牌', en: 'Base sign' }, x: 262, y: 258, w: 126, h: 82, near: true, draw: drawMoonSign, sfx: 'space_neon' },
      { id: 'rover', name: { zh: '月球車', en: 'Moon buggy' }, x: 112, y: 400, w: 142, h: 72, mag: 6, draw: drawLunarRover, sfx: 'clunk' },
      { id: 'astro', name: { zh: '跳跳太空人', en: 'Hopping astronaut' }, x: 268, y: 390, w: 68, h: 76, mag: 13, draw: drawAstroHop, habit: (t, l) => ({ dx: Math.sin(t * 0.6) * 4 * l, dy: -(1 - Math.cos(t * 2.2)) * 6 * l }), call: 'radio' },
      ] },
    { key: 'space-mars', title: { zh: '火星殖民地', en: 'Mars Colony' }, place: { zh: '火星 傑澤羅撞擊坑', en: 'Jezero Crater, Mars' },
      intro: { zh: '火星的夕陽是藍色的。新殖民地剛蓋好，還歪歪的。', en: 'Sunsets on Mars are blue. The new colony is up, but a bit crooked.' },
      bg: bgMars, animated: true,
      objects: [
      { id: 'sign', name: { zh: '殖民地招牌', en: 'Colony sign' }, x: 92, y: 206, w: 126, h: 80, near: true, draw: drawColonySign, sfx: 'space_neon' },
      { id: 'drone', name: { zh: '小直升機', en: 'Little copter' }, x: 262, y: 168, w: 78, h: 58, mag: 12, draw: drawMarsDrone, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 6 * l, dy: Math.sin(t * 2.1) * 4 * l }), call: 'space_drone' },
      { id: 'dome', name: { zh: '玻璃溫室', en: 'Greenhouse dome' }, x: 98, y: 326, w: 138, h: 74, mag: 8, draw: drawGreenhouse, sfx: 'shimmer' },
      { id: 'rover', name: { zh: '火星車', en: 'Mars rover' }, x: 264, y: 330, w: 130, h: 100, mag: 10, draw: drawPercy, sfx: 'clunk' },
      { id: 'panels', name: { zh: '太陽能板', en: 'Solar panels' }, x: 150, y: 432, w: 130, h: 40, mag: 5, draw: drawMarsPanels, sfx: 'twinkle' },
      ] },
    { key: 'space-saturn', title: { zh: '土星環', en: "Saturn's Rings" }, place: { zh: '土星 A 環外側', en: "Outside Saturn's A ring" },
      intro: { zh: '土星環大多是冰塊。航道兩邊的浮標是連動的。', en: "Saturn's rings are mostly ice. The two lane buoys turn together." },
      bg: bgSaturn, animated: true,
      objects: [
      { id: 'sign', name: { zh: '出口路牌', en: 'Exit sign' }, x: 82, y: 236, w: 124, h: 74, near: true, draw: drawRingSign, sfx: 'bell' },
      { id: 'ship', name: { zh: '觀光太空船', en: 'Tour ship' }, x: 250, y: 262, w: 158, h: 70, mag: 7, draw: drawTourShip, sfx: 'beep' },
      { id: 'buoyL', name: { zh: '左浮標', en: 'Left buoy' }, x: 44, y: 382, w: 46, h: 80, mag: 12, link: { to: 'buoyR', k: 0.7 }, draw: drawBuoy, sfx: 'space_ping' },
      { id: 'surfer', name: { zh: '衝浪外星人', en: 'Surfing alien' }, x: 180, y: 392, w: 90, h: 78, mag: 14, draw: drawRingSurfer, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 8 * l, dy: Math.sin(t * 1.8) * 3 * l }), call: 'space_alien' },
      { id: 'buoyR', name: { zh: '右浮標', en: 'Right buoy' }, x: 316, y: 382, w: 46, h: 80, mag: 9, draw: drawBuoy, sfx: 'space_ping' },
      ] },
    { key: 'space-repair', title: { zh: '衛星維修', en: 'Satellite Repair' }, place: { zh: '低地球軌道', en: 'Low Earth orbit' },
      intro: { zh: '幫太空望遠鏡換上新的太陽能翼。兩片翼連動，工具箱別飄走。', en: 'Fitting the space telescope with new solar wings. They turn together; mind the toolbox.' },
      bg: bgRepair, animated: true,
      objects: [
      { id: 'wingL', name: { zh: '左太陽能翼', en: 'Left solar wing' }, x: 70, y: 116, w: 114, h: 38, mag: 7, link: { to: 'wingR', k: 0.8 }, draw: drawWing, sfx: 'shimmer' },
      { id: 'wingR', name: { zh: '右太陽能翼', en: 'Right solar wing' }, x: 290, y: 116, w: 114, h: 38, mag: 11, draw: drawWing, sfx: 'shimmer' },
      { id: 'scope', name: { zh: '太空望遠鏡', en: 'Space telescope' }, x: 178, y: 212, w: 160, h: 64, mag: 5, draw: drawHubble, sfx: 'twinkle' },
      { id: 'bot', name: { zh: '維修機器人', en: 'Repair robot' }, x: 78, y: 318, w: 64, h: 70, mag: 13, draw: drawRepairBot, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 5 * l, dy: Math.sin(t * 1.1) * 4 * l }), call: 'space_robot' },
      { id: 'astro', name: { zh: '維修太空人', en: 'Spacewalker' }, x: 282, y: 322, w: 76, h: 80, mag: 9, draw: drawTetherAstro, habit: (t, l) => ({ dx: Math.sin(t * 0.5) * 4 * l, dy: Math.sin(t * 0.9) * 5 * l }), call: 'radio' },
      { id: 'toolbox', name: { zh: '工具箱', en: 'Toolbox' }, x: 180, y: 410, w: 76, h: 50, near: true, draw: drawToolbox, sfx: 'clunk' },
      ] },
    { key: 'space-meteor', title: { zh: '流星雨', en: 'Meteor Shower' }, place: { zh: '台灣 合歡山', en: 'Hehuanshan, Taiwan' },
      intro: { zh: '八月的英仙座流星雨，在暗空公園看最清楚。許願前先把東西擺正。', en: 'The Perseids peak in August, best seen from a dark-sky park. Level things before you wish.' },
      bg: bgMeteor, animated: true,
      objects: [
      { id: 'lanternL', name: { zh: '左邊露營燈', en: 'Left lantern' }, x: 100, y: 174, w: 44, h: 60, mag: 10, link: { to: 'lanternR', k: 0.6 }, draw: drawLantern, sfx: 'jingle' },
      { id: 'lanternR', name: { zh: '右邊露營燈', en: 'Right lantern' }, x: 260, y: 174, w: 44, h: 60, mag: 7, draw: drawLantern, sfx: 'jingle' },
      { id: 'scope', name: { zh: '望遠鏡', en: 'Telescope' }, x: 78, y: 330, w: 104, h: 108, mag: 12, draw: drawTripodScope, sfx: 'twinkle' },
      { id: 'cam', name: { zh: '縮時相機', en: 'Time-lapse camera' }, x: 176, y: 344, w: 50, h: 98, near: true, draw: drawCamTripod, sfx: 'beep' },
      { id: 'kid', name: { zh: '許願外星人', en: 'Wishing alien' }, x: 272, y: 334, w: 64, h: 78, mag: 14, draw: drawAlienKid, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 3 * l, dy: -Math.abs(Math.sin(t * 1.6)) * 4 * l }), call: 'space_alien' },
      { id: 'sign', name: { zh: '暗空公園牌', en: 'Dark-sky sign' }, x: 118, y: 434, w: 136, h: 64, near: true, draw: drawDarkSign, sfx: 'wood' },
      ] },
    { key: 'space-blackhole', title: { zh: '黑洞邊緣', en: 'Edge of a Black Hole' }, place: { zh: '銀河系中心 人馬座 A*', en: 'Sagittarius A*, galactic core' },
      intro: { zh: '黑洞會把光拉彎，星星都歪成弧線。你手上的東西可不准歪。', en: 'A black hole bends light, so the stars curve. Your things still have to be level.' },
      bg: bgBlackHole, animated: true,
      objects: [
      { id: 'beaconL', name: { zh: '左警示燈', en: 'Left beacon' }, x: 38, y: 236, w: 46, h: 76, mag: 8, link: { to: 'beaconR', k: 0.7 }, draw: drawBeacon, sfx: 'space_ping' },
      { id: 'sign', name: { zh: '事件視界牌', en: 'Horizon sign' }, x: 180, y: 270, w: 148, h: 60, near: true, draw: drawHorizonSign, sfx: 'space_neon' },
      { id: 'beaconR', name: { zh: '右警示燈', en: 'Right beacon' }, x: 322, y: 236, w: 46, h: 76, mag: 11, draw: drawBeacon, sfx: 'space_ping' },
      { id: 'clock', name: { zh: '慢慢鐘', en: 'Slow clock' }, x: 70, y: 352, w: 76, h: 76, near: true, draw: drawSlowClock, sfx: 'jingle' },
      { id: 'ship', name: { zh: '逃離太空船', en: 'Getaway ship' }, x: 252, y: 352, w: 140, h: 56, mag: 6, draw: drawEscapeShip, sfx: 'boing' },
      { id: 'astro', name: { zh: '太空人', en: 'Astronaut' }, x: 112, y: 434, w: 70, h: 76, mag: 13, draw: drawAstroWave, habit: (t, l) => ({ dx: Math.sin(t * 0.6) * 5 * l, dy: Math.sin(t * 1.0) * 4 * l }), call: 'radio' },
      { id: 'bot', name: { zh: '方塊機器人', en: 'Box robot' }, x: 266, y: 432, w: 58, h: 72, mag: 9, draw: drawBoxBot, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 4 * l, dy: Math.sin(t * 1.4) * 3 * l }), call: 'space_robot' },
      ] },
    { key: 'space-stars', title: { zh: '星座連線', en: 'Join the Stars' }, place: { zh: '台灣 鹿林天文台', en: 'Lulin Observatory, Taiwan' },
      intro: { zh: '北斗七星和仙后座都繞著北極星轉，所以它們連動。旁邊那顆星球……先別急。', en: 'The Big Dipper and Cassiopeia both circle Polaris, so they turn together. As for that planet… not so fast.' },
      bg: bgLulin, animated: true,
      objects: [
      { id: 'dipper', name: { zh: '北斗七星', en: 'Big Dipper' }, x: 88, y: 104, w: 124, h: 72, mag: 9, link: { to: 'cassio', k: 0.6 }, draw: drawDipper, sfx: 'twinkle' },
      { id: 'cassio', name: { zh: '仙后座', en: 'Cassiopeia' }, x: 272, y: 104, w: 112, h: 64, near: true, draw: drawCassio, sfx: 'twinkle' },
      { id: 'sign', name: { zh: '天文台招牌', en: 'Observatory sign' }, x: 70, y: 262, w: 124, h: 44, mag: 5, draw: drawLulinSign, sfx: 'space_neon' },
      { id: 'orion', name: { zh: '獵戶座', en: 'Orion' }, x: 186, y: 222, w: 86, h: 108, mag: 7, draw: drawOrion, sfx: 'shimmer' },
      { id: 'uranus', name: { zh: '天王星', en: 'Uranus' }, x: 298, y: 232, w: 80, h: 36, trap: true, keep: 98, trapNote: { zh: '天王星本來就是躺著轉的，自轉軸斜了約 98°', en: 'Uranus really does spin on its side, tilted about 98°' }, draw: drawUranus },
      { id: 'scope', name: { zh: '反射望遠鏡', en: 'Big telescope' }, x: 72, y: 360, w: 100, h: 92, mag: 11, draw: drawReflector, sfx: 'beep' },
      { id: 'gazer', name: { zh: '觀星外星人', en: 'Stargazing alien' }, x: 186, y: 362, w: 64, h: 78, mag: 14, draw: drawAlienGazer, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 3 * l, dy: -Math.abs(Math.sin(t * 1.5)) * 4 * l }), call: 'space_alien' },
      { id: 'owl', name: { zh: '貓頭鷹', en: 'Owl' }, x: 297, y: 370, w: 52, h: 66, near: true, draw: drawOwl, habit: (t, l) => ({ dx: 0, dy: Math.sin(t * 1.2) * 1.5 * l }), call: 'space_owl' },
      ] },
    { key: 'space-elevator', title: { zh: '太空電梯', en: 'Space Elevator' }, place: { zh: '赤道上空 35,786 公里', en: '35,786 km above the equator' },
      intro: { zh: '太空電梯要從赤道往上蓋，終點站就在靜止軌道。兩盞導引燈連動。', en: 'A space elevator rises from the equator to geostationary orbit. The two guide lights turn together.' },
      bg: bgElevator, animated: true,
      objects: [
      { id: 'lightL', name: { zh: '左導引燈', en: 'Left guide light' }, x: 92, y: 116, w: 40, h: 64, mag: 10, link: { to: 'lightR', k: 0.6 }, draw: drawGuideLight, sfx: 'space_ping' },
      { id: 'car', name: { zh: '電梯車廂', en: 'Elevator car' }, x: 180, y: 112, w: 80, h: 102, mag: 6, draw: drawClimber, sfx: 'beep' },
      { id: 'lightR', name: { zh: '右導引燈', en: 'Right guide light' }, x: 268, y: 116, w: 40, h: 64, mag: 7, draw: drawGuideLight, sfx: 'space_ping' },
      { id: 'sign', name: { zh: '車站站牌', en: 'Station sign' }, x: 74, y: 200, w: 126, h: 50, near: true, draw: drawGeoSign, sfx: 'bell' },
      { id: 'display', name: { zh: '樓層顯示', en: 'Floor display' }, x: 286, y: 200, w: 114, h: 46, near: true, draw: drawGeoDisplay, sfx: 'space_neon' },
      { id: 'crate', name: { zh: '貨箱', en: 'Cargo crate' }, x: 64, y: 340, w: 66, h: 50, mag: 12, draw: drawCrate, sfx: 'clunk' },
      { id: 'porter', name: { zh: '搬運機器人', en: 'Porter robot' }, x: 172, y: 344, w: 60, h: 70, mag: 15, draw: drawPorterBot, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 5 * l, dy: Math.sin(t * 1.3) * 4 * l }), call: 'space_robot' },
      { id: 'astro', name: { zh: '揮手太空人', en: 'Waving astronaut' }, x: 286, y: 338, w: 70, h: 76, mag: 8, draw: drawAstroWave, habit: (t, l) => ({ dx: Math.sin(t * 0.5) * 4 * l, dy: Math.sin(t * 0.9) * 5 * l }), call: 'radio' },
      ] },
    { key: 'space-home', title: { zh: '回到地球', en: 'Back to Earth' }, place: { zh: '美國 佛羅里達外海', en: 'Off the coast of Florida, USA' },
      intro: { zh: '第 100 關，太空艙濺落回家！傘連傘、海豚跟海豚，大家都來接你。', en: 'Stage 100: splashdown, welcome home! Chutes turn together, so do the dolphins.' },
      bg: bgHome, animated: true,
      objects: [
      { id: 'chuteL', name: { zh: '左降落傘', en: 'Left parachute' }, x: 130, y: 80, w: 100, h: 120, mag: 8, link: { to: 'chuteR', k: 0.6 }, draw: drawChuteL, sfx: 'shimmer' },
      { id: 'chuteR', name: { zh: '右降落傘', en: 'Right parachute' }, x: 230, y: 80, w: 100, h: 120, mag: 6, draw: drawChuteR, sfx: 'shimmer' },
      { id: 'capsule', name: { zh: '太空艙', en: 'Capsule' }, x: 180, y: 188, w: 64, h: 88, mag: 11, draw: drawCapsule, sfx: 'bell' },
      { id: 'gull', name: { zh: '海鷗', en: 'Seagull' }, x: 50, y: 206, w: 56, h: 40, mag: 13, draw: drawGull, habit: (t, l) => ({ dx: Math.sin(t * 0.6) * 8 * l, dy: Math.sin(t * 1.3) * 5 * l }), call: 'space_gull' },
      { id: 'lighthouse', name: { zh: '燈塔', en: 'Lighthouse' }, x: 324, y: 238, w: 40, h: 120, near: true, draw: drawLighthouse, sfx: 'twinkle' },
      { id: 'ship', name: { zh: '回收船', en: 'Recovery ship' }, x: 110, y: 370, w: 192, h: 80, mag: 5, draw: drawRecoveryShip, sfx: 'clunk' },
      { id: 'sign', name: { zh: '歡迎回家', en: 'Welcome sign' }, x: 264, y: 328, w: 148, h: 56, near: true, draw: drawHomeSign, sfx: 'space_neon' },
      { id: 'globe', name: { zh: '地球儀', en: 'Desk globe' }, x: 42, y: 440, w: 48, h: 48, trap: true, keep: 23.5, trapNote: { zh: '地球儀本來就斜 23.5°，跟地球的自轉軸一樣', en: "A globe leans 23.5° on purpose, just like Earth's axis" }, draw: drawGlobe },
      { id: 'dolphinA', name: { zh: '海豚哥哥', en: 'Big dolphin' }, x: 214, y: 440, w: 72, h: 48, mag: 9, link: { to: 'dolphinB', k: 0.8 }, draw: drawDolphin, habit: (t, l) => ({ dx: 0, dy: -Math.abs(Math.sin(t * 1.4)) * 7 * l }), call: 'space_dolphin' },
      { id: 'dolphinB', name: { zh: '海豚妹妹', en: 'Little dolphin' }, x: 308, y: 432, w: 72, h: 48, mag: 12, draw: drawDolphin, habit: (t, l) => ({ dx: 0, dy: -Math.abs(Math.sin(t * 1.4 + 0.6)) * 7 * l }), call: 'space_dolphin' },
      ] },
  ],
});
