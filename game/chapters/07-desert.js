// 第 7 大關 沙漠綠洲 / World 7: Desert Oasis (Retro poster).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 7-1 Pyramids: retro travel poster ===== */
function bgDesert(c) {
  c.fillStyle = '#f3e3c3'; c.fillRect(0, 0, W, H);
  const bands = ['#f4d7a1', '#f1c27f', '#eda866', '#e88f50'];
  bands.forEach((col, i) => { c.fillStyle = col; c.fillRect(10, 10 + i * 55, W - 20, 55); });
  circ(c, 250, 170, 60, '#f7e9c4');
  [182, 194, 205, 215].forEach((y, i) => { c.fillStyle = bands[Math.min(3, Math.floor((y - 10) / 55))]; c.fillRect(185, y, 130, 3 + i); });
  poly(c, [190, 232, 222, 198, 254, 232], '#c97e4c'); poly(c, [222, 198, 254, 232, 232, 232], '#b56a3e');
  const dune = (y0, amp, col, ph) => { c.beginPath(); c.moveTo(10, H - 10); c.lineTo(10, y0); for (let x = 10; x <= W - 10; x += 10) c.lineTo(x, y0 + Math.sin(x / 60 + ph) * amp); c.lineTo(W - 10, H - 10); c.closePath(); c.fillStyle = col; c.fill(); };
  dune(232, 10, '#e9b36b', 1); dune(300, 16, '#e2a057', 2.2); dune(380, 12, '#d98b48', 0.4);
  c.globalAlpha = 0.08; c.drawImage(GRAIN, 0, 0, W, H); c.globalAlpha = 1;
  txt(c, 'EGYPT', 24, 40, 'italic 700 30px "Playfair Display", Georgia, serif', '#1f2a30', 'left');
  txt(c, 'NILE EXPRESS · 1936', 26, 64, '700 10px "Playfair Display", Georgia, serif', '#1f2a30', 'left');
  c.strokeStyle = '#1f2a30'; c.lineWidth = 2; c.strokeRect(10, 10, W - 20, H - 20);
}
function drawPyramid(c) {
  poly(c, [-70, 48, 0, -50, 70, 48], '#efb46a'); poly(c, [0, -50, 70, 48, 14, 48], '#c9773f');
  c.strokeStyle = 'rgba(80,40,20,.25)'; c.lineWidth = 1;
  for (let k = 1; k < 8; k++) { const y = -50 + k * 12.25, hw = (y + 50) * 0.714; c.beginPath(); c.moveTo(-hw, y); c.lineTo(hw, y); c.stroke(); }
  poly(c, [-6, 48, -6, 36, 6, 36, 6, 48], '#5a3320');
}
function drawCamel(c, a) {
  const st = Math.sin(a.t * 3) * a.live, ch = Math.sin(a.t * 7) * a.live;
  c.fillStyle = '#6e4524';
  [[-30, st], [-18, -st], [16, st], [28, -st]].forEach(([x, s]) => { c.save(); c.translate(x, 8); c.rotate(s * 0.25); c.fillRect(-3, 0, 6, 30); c.restore(); });
  c.beginPath(); c.moveTo(-40, 10); c.quadraticCurveTo(-36, -14, -22, -10); c.quadraticCurveTo(-14, -30, -4, -10); c.quadraticCurveTo(6, -28, 16, -8); c.quadraticCurveTo(34, -6, 34, 12); c.quadraticCurveTo(0, 22, -40, 10); c.closePath(); c.fillStyle = '#8f5a2e'; c.fill();
  c.save(); c.translate(30, -2);
  c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(14, -10, 10, -30); c.lineTo(18, -32); c.quadraticCurveTo(24, -12, 6, 8); c.closePath(); c.fillStyle = '#8f5a2e'; c.fill();
  ell(c, 18, -32 + ch * 0.6, 9, 6, '#8f5a2e'); circ(c, 18, -35, 1.6, '#f3e3c3'); poly(c, [10, -36, 12, -42, 14, -36], '#6e4524');
  c.restore();
  c.strokeStyle = '#6e4524'; c.lineWidth = 2; c.beginPath(); c.moveTo(-40, 8); c.quadraticCurveTo(-48, 14 + st * 4, -46, 22); c.stroke();
  poly(c, [-14, -12, 8, -10, 6, 0, -16, 0], '#2d5c66'); poly(c, [-14, -3, 7, -3, 6, 0, -16, 0], '#c4553b');
}
function drawPalm(c, a) {
  const sw = Math.sin(a.t * 1.6) * 0.12;
  c.strokeStyle = '#8c5a2e'; c.lineWidth = 7; c.beginPath(); c.moveTo(4, 58); c.quadraticCurveTo(-8, 10, 0, -40); c.stroke();
  c.strokeStyle = 'rgba(60,30,10,.4)'; c.lineWidth = 1.5; for (let y = 50; y > -36; y -= 9) { c.beginPath(); c.moveTo(-4, y); c.lineTo(5, y - 3); c.stroke(); }
  c.save(); c.translate(0, -42); c.rotate(sw);
  for (let i = 0; i < 6; i++) {
    const an = -Math.PI / 2 + (i - 2.5) * 0.55;
    c.save(); c.rotate(an); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(20, -14, 38, 6); c.quadraticCurveTo(20, -2, 0, 0); c.fillStyle = i % 2 ? '#2d5c66' : '#3f7a6a'; c.fill(); c.restore();
  }
  circ(c, -3, 4, 4, '#6b4a2b'); circ(c, 4, 5, 4, '#6b4a2b');
  c.restore();
}
function drawCairo(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-4, -10, 8, 46);
  poly(c, [-52, -32, 38, -32, 54, -16, 38, 0, -52, 0], '#2d5c66');
  txt(c, 'CAIRO  12 KM', -6, -16, '700 13px "Playfair Display", Georgia, serif', '#f3e3c3');
  poly(c, [44, 6, -30, 6, -42, 16, -30, 26, 44, 26], '#c4553b');
  txt(c, 'GIZA  3 KM', 4, 16, '700 10px "Playfair Display", Georgia, serif', '#f3e3c3');
}
function drawTent(c) {
  poly(c, [-50, 30, 0, -32, 50, 30], '#c4553b'); poly(c, [0, -32, 50, 30, 10, 30], '#9e3f2b');
  c.strokeStyle = 'rgba(243,227,195,.6)'; c.lineWidth = 3;
  [-30, -10, 10, 30].forEach((x) => { c.beginPath(); c.moveTo(0, -32); c.lineTo(x * 1.4, 30); c.stroke(); });
  poly(c, [-10, 30, 0, 4, 10, 30], '#1f2a30');
  c.strokeStyle = '#1f2a30'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, -32); c.lineTo(0, -40); c.stroke(); poly(c, [0, -40, 12, -37, 0, -34], '#e9b36b');
}
function drawMirage(c, a) {
  c.save(); c.globalAlpha = 0.6;
  c.fillStyle = '#bfe3e8'; c.fillRect(-55, 21, 110, 4);
  for (let y = -22; y < 22; y += 4) { const t = (y + 22) / 44, hw = 6 + t * 46, sh = Math.sin(a.t * 4 + y / 4) * 2; c.fillStyle = (y / 4) % 2 ? '#fbf1d6' : '#9fd0d8'; c.fillRect(-hw + sh, y, hw * 2, 2.5); }
  c.restore();
}

/* ===== sounds of this world (Q style) ===== */
const { q, note, puff } = QS;
defineCreatureSound('desert_calf', (ac, o, t) => q(ac, o, t, [[0, 620], [0.1, 760], [0.36, 560]], 0.38, { trem: [20, 0.45], vol: 0.42 }));
defineCreatureSound('desert_donkey', (ac, o, t) => [[0, 980, 1250], [0.2, 640, 540], [0.42, 980, 1250], [0.62, 640, 540]].forEach(([d, a, b]) => q(ac, o, t + d, [[0, a], [0.15, b]], 0.17, { vol: 0.36, over: 0.2 })));
defineCreatureSound('desert_fennec', (ac, o, t) => [0, 0.13, 0.26].forEach((d, k) => q(ac, o, t + d, [[0, 1500 + k * 120], [0.05, 2300 + k * 120], [0.1, 1700]], 0.11, { vol: 0.4 })));
defineCreatureSound('desert_scarab', (ac, o, t) => {
  [0, 0.07, 0.14].forEach((d) => q(ac, o, t + d, [[0, 2400], [0.025, 2100]], 0.035, { attack: 0.002, hold: 0.1, vol: 0.38 }));
  q(ac, o, t + 0.22, [[0, 520], [0.3, 660]], 0.32, { trem: [36, 0.5], vol: 0.3 });
});
defineCreatureSound('desert_roadrunner', (ac, o, t) => [0, 0.16, 0.32, 0.48].forEach((d, k) => q(ac, o, t + d, [[0, 760 - k * 70], [0.12, 640 - k * 70]], 0.14, { vol: 0.4, attack: 0.02 })));
defineCreatureSound('desert_lizard', (ac, o, t) => {
  q(ac, o, t, [[0, 1800], [0.06, 2600]], 0.07, { attack: 0.003, vol: 0.38 });
  q(ac, o, t + 0.1, [[0, 2600], [0.08, 1900]], 0.09, { vol: 0.36 });
  q(ac, o, t + 0.24, [[0, 1500], [0.05, 2200]], 0.06, { attack: 0.003, vol: 0.32 });
});
defineCreatureSound('desert_owl', (ac, o, t) => {
  q(ac, o, t, [[0, 520], [0.08, 600], [0.22, 540]], 0.24, { attack: 0.04, vol: 0.42 });
  q(ac, o, t + 0.32, [[0, 560], [0.1, 650], [0.4, 520]], 0.42, { attack: 0.04, vib: [5, 8], vol: 0.42 });
});
defineCreatureSound('desert_jerboa', (ac, o, t) => [0, 0.14, 0.28].forEach((d, k) => q(ac, o, t + d, [[0, 900 + k * 200], [0.06, 2200 + k * 200], [0.1, 1800]], 0.1, { vol: 0.38 })));
defineCreatureSound('desert_sandcat', (ac, o, t) => q(ac, o, t, [[0, 1100], [0.08, 1600], [0.32, 1050]], 0.34, { vib: [9, 30], vol: 0.4 }));
defineCreatureSound('desert_falcon', (ac, o, t) => [0, 0.15, 0.3].forEach((d) => q(ac, o, t + d, [[0, 2000], [0.04, 2700], [0.12, 2300]], 0.12, { vol: 0.36 })));
defineThingSound('desert_lantern', (ac, o, t, r) => {
  note(ac, o, t, 1318 * r, 0.3, 0.28); note(ac, o, t + 0.09, 1975 * r, 0.35, 0.16);
  q(ac, o, t + 0.05, [[0, 2637 * r], [0.3, 2637 * r]], 0.3, { vib: [9, 30], vol: 0.05 });
});
defineThingSound('desert_pot', (ac, o, t, r) => {
  q(ac, o, t, [[0, 520 * r], [0.05, 440 * r]], 0.08, { attack: 0.002, hold: 0.05, vol: 0.45, over: 0.3 });
  q(ac, o, t + 0.1, [[0, 700 * r], [0.06, 600 * r]], 0.09, { attack: 0.002, hold: 0.05, vol: 0.36, over: 0.3 });
});
defineThingSound('desert_rug', (ac, o, t, r) => { puff(ac, o, t, 0.18, 1400, 0.08); q(ac, o, t + 0.04, [[0, 660 * r], [0.12, 880 * r], [0.3, 780 * r]], 0.3, { attack: 0.05, vol: 0.32 }); });
defineThingSound('desert_sand', (ac, o, t, r) => { puff(ac, o, t, 0.3, 3200, 0.06); [0, 0.08, 0.16].forEach((d, k) => note(ac, o, t + d, (1046 + k * 262) * r, 0.14, 0.22)); });

/* ===== shared poster helpers (stages 2-10) ===== */
const SERIF = '"Playfair Display", "Noto Serif TC", Georgia, serif';
const PI2 = Math.PI * 2;
const hash = (i) => { const v = Math.sin(i * 12.9898) * 43758.5453; return v - Math.floor(v); };
function posterOpen(c, paper = '#f3e3c3') { c.fillStyle = paper; c.fillRect(0, 0, W, H); c.save(); c.beginPath(); c.rect(10, 10, W - 20, H - 20); c.clip(); }
function posterClose(c, title, sub, ink = '#1f2a30', o = {}) {
  c.restore();
  c.globalAlpha = o.grain ?? 0.08; c.drawImage(GRAIN, 0, 0, W, H); c.globalAlpha = 1;
  if (title) txt(c, title, 24, 40, `italic 700 ${o.size || 30}px ${SERIF}`, ink, 'left');
  if (sub) txt(c, sub, 26, 64, `700 10px ${SERIF}`, o.subInk || ink, 'left');
  c.strokeStyle = '#1f2a30'; c.lineWidth = 2; c.strokeRect(10, 10, W - 20, H - 20);
}
function skyBands(c, cols, y0, h) { cols.forEach((col, i) => { c.fillStyle = col; c.fillRect(0, y0 + i * h, W, h + 1); }); }
function dune(c, y0, amp, col, ph, f = 60) {
  c.beginPath(); c.moveTo(0, H); c.lineTo(0, y0);
  for (let x = 0; x <= W; x += 6) c.lineTo(x, y0 + Math.sin(x / f + ph) * amp);
  c.lineTo(W, H); c.closePath(); c.fillStyle = col; c.fill();
}
function stripeSun(c, x, y, r, col, gap, n = 4) {
  circ(c, x, y, r, col);
  c.save(); c.beginPath(); c.arc(x, y, r, 0, PI2); c.clip(); c.fillStyle = gap;
  for (let i = 0; i < n; i++) c.fillRect(x - r, y + r * 0.22 + i * r * 0.2, r * 2, 2 + i * 1.4);
  c.restore();
}
// A poster dune with a sharp crest: lit face on the left, shadow face on the right.
function ridge(c, x0, x1, px, py, by, lit, shade) {
  c.beginPath(); c.moveTo(x0, by); c.quadraticCurveTo(px - (px - x0) * 0.4, py + 6, px, py); c.quadraticCurveTo(px + (x1 - px) * 0.45, py + 8, x1, by); c.closePath(); c.fillStyle = lit; c.fill();
  c.beginPath(); c.moveTo(px, py); c.quadraticCurveTo(px + (x1 - px) * 0.45, py + 8, x1, by); c.lineTo(px + (x1 - px) * 0.3, by); c.quadraticCurveTo(px + 4, py + (by - py) * 0.45, px, py); c.closePath(); c.fillStyle = shade; c.fill();
}
function foot(c, x, y, rx, col = 'rgba(70,30,10,.2)') { ell(c, x, y, rx, rx * 0.16, col); }
function starField(c, n, x0, y0, w, h, col, seed = 1) { for (let i = 0; i < n; i++) circ(c, x0 + hash(i * 3 + seed) * w, y0 + hash(i * 7 + seed + 1) * h, 0.4 + hash(i * 11 + seed) * 1.1, col); }
function tinyPalm(c, x, y, s, col) {
  c.strokeStyle = col; c.lineWidth = 2.4 * s; c.lineCap = 'round';
  c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x - 3 * s, y - 14 * s, x + 2 * s, y - 28 * s); c.stroke();
  c.lineWidth = 2 * s;
  for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + (i - 2.5) * 0.6, ex = x + 2 * s + Math.cos(an) * 14 * s, ey = y - 28 * s + Math.sin(an) * 9 * s + 4 * s; c.beginPath(); c.moveTo(x + 2 * s, y - 28 * s); c.quadraticCurveTo((x + 2 * s + ex) / 2, y - 33 * s, ex, ey); c.stroke(); }
}
const lineC = (c, col, lw, pts) => { c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); c.stroke(); };
// A wooden post with a painted board: the board is w×h, centred at (0, by).
function boardSign(c, w, h, by, board, edge, postTo, posts = [0]) {
  posts.forEach((px) => { c.fillStyle = '#6b4a2b'; c.fillRect(px - 3, by, 6, postTo - by); });
  rr(c, -w / 2, by - h / 2, w, h, 3); c.fillStyle = board; c.fill(); c.strokeStyle = edge; c.lineWidth = 2; c.stroke();
}

/* ===== camels and other creatures shared by several stages ===== */
// Flat dromedary facing right, about 126×96 at s = 1, centred. o.deco(c) draws a saddle on top.
function dromedary(c, a, o = {}) {
  const s = o.s || 1, body = o.body || '#b0703c', far = o.far || '#7e4a26', near = o.leg || '#94592e', walk = o.walk ?? 1;
  const st = Math.sin(a.t * 3) * a.live * walk, ch = Math.sin(a.t * 7) * a.live;
  c.save(); c.scale(s, s); c.translate(-8, 2);
  const leg = (x, k, col) => { c.save(); c.translate(x, 4); c.rotate(k * 0.16); c.fillStyle = col; c.fillRect(-3, 0, 6, 38); ell(c, 0, 20, 4, 3, col); c.fillRect(-4.5, 36, 9, 4); c.restore(); };
  leg(-26, -st, far); leg(26, st, far);
  lineC(c, far, 2.4, [-46, -2, -52, 8, -50 + st * 2, 18]);
  c.beginPath(); c.moveTo(-47, 0);
  c.bezierCurveTo(-50, -16, -36, -20, -24, -20); c.bezierCurveTo(-14, -48, 12, -46, 18, -20);
  c.bezierCurveTo(24, -14, 32, -14, 36, -8); c.lineTo(38, 10); c.bezierCurveTo(16, 22, -30, 22, -47, 0);
  c.closePath(); c.fillStyle = body; c.fill();
  c.beginPath(); c.moveTo(28, -10); c.bezierCurveTo(44, -10, 44, -26, 46, -34); c.lineTo(56, -34); c.bezierCurveTo(54, -14, 50, 4, 36, 12); c.closePath(); c.fill();
  ell(c, 56, -38, 11, 7, body, 0.12); ell(c, 64, -33 + ch * 0.8, 6, 3.4, body, 0.2);
  poly(c, [46, -42, 48, -50, 53, -43], far);
  circ(c, 57, -40, o.bigEye ? 2.4 : 1.7, '#1f2a30'); if (o.bigEye) circ(c, 57.6, -40.8, 0.8, '#fff');
  if (o.deco) o.deco(c, st);
  leg(-36, st, near); leg(16, -st, near);
  c.restore();
}
// Camel lying down (couched), about 126×66, centred.
function camelRest(c, a, o = {}) {
  const body = o.body || '#b0703c', dark = o.far || '#7e4a26', ch = Math.sin(a.t * 6) * a.live * (o.chew ?? 1);
  c.save(); c.translate(-8, 4);
  ell(c, -30, 22, 17, 6, dark); ell(c, 26, 22, 15, 6, dark);
  c.beginPath(); c.moveTo(-50, 20); c.bezierCurveTo(-54, 0, -40, -6, -28, -6); c.bezierCurveTo(-18, -34, 8, -32, 14, -6);
  c.bezierCurveTo(24, -2, 34, 0, 38, 8); c.lineTo(40, 22); c.lineTo(-50, 22); c.closePath(); c.fillStyle = body; c.fill();
  c.beginPath(); c.moveTo(28, 2); c.bezierCurveTo(44, 0, 42, -18, 46, -26); c.lineTo(56, -26); c.bezierCurveTo(54, -6, 52, 14, 38, 20); c.closePath(); c.fill();
  ell(c, 56, -30, 11, 7, body, 0.12); ell(c, 64, -25 + ch * 0.8, 6, 3.4, body, 0.2);
  poly(c, [46, -34, 48, -42, 53, -35], dark);
  if (o.sleep) lineC(c, '#1f2a30', 1.4, [54, -32, 57, -31, 60, -32]); else circ(c, 57, -32, 1.7, '#1f2a30');
  ell(c, -10, 21, 10, 4, dark);
  if (o.deco) o.deco(c);
  c.restore();
}
// Moroccan brass lantern, about 32×62. o.stand: sits on the ground instead of hanging.
function lanternM(c, a, o = {}) {
  const brass = o.brass || '#c9973e', dk = o.dark || '#7a5424', glass = o.glass || '#f6c24a', fl = 0.8 + Math.sin(a.t * 7 + (o.ph || 0)) * 0.1;
  c.save(); c.translate(0, o.stand ? 6 : 7);
  if (!o.stand) { c.strokeStyle = dk; c.lineWidth = 1.6; c.beginPath(); c.arc(0, -34, 3.5, 0, PI2); c.stroke(); lineC(c, dk, 1.6, [0, -30.5, 0, -25]); }
  else { c.strokeStyle = dk; c.lineWidth = 2; c.beginPath(); c.arc(0, -27, 5, Math.PI, 0); c.stroke(); }
  poly(c, [-10, -14, 0, -26, 10, -14], brass); poly(c, [0, -26, 10, -14, 3, -14], dk);
  ell(c, 0, -14, 13, 2.6, dk);
  poly(c, [-12, -12, 12, -12, 14, 10, -14, 10], dk);
  c.globalAlpha = fl; poly(c, [-9.5, -10, 9.5, -10, 11, 8, -11, 8], glass); c.globalAlpha = 1;
  c.fillStyle = dk; c.fillRect(-1.2, -10, 2.4, 18); c.fillRect(-11, -2, 22, 1.6);
  [[-5, -6], [5, -6], [-5.5, 4], [5.5, 4]].forEach(([x, y]) => circ(c, x, y, 1.3, '#fff3d0'));
  poly(c, [-14, 10, 14, 10, 6, 19, -6, 19], brass); circ(c, 0, 21, 2, dk);
  c.restore();
}
// A rug hanging over its own rod, w×h.
function rug(c, w, h, base, band, accent, a) {
  const sw = Math.sin(a.t * 2) * a.live;
  c.fillStyle = '#6b4a2b'; c.fillRect(-w / 2 - 3, -h / 2, w + 6, 4); circ(c, -w / 2 - 3, -h / 2 + 2, 3, '#4a3020'); circ(c, w / 2 + 3, -h / 2 + 2, 3, '#4a3020');
  const top = -h / 2 + 3, bot = h / 2 - 7;
  c.beginPath(); c.moveTo(-w / 2, top); c.lineTo(w / 2, top); c.lineTo(w / 2 + sw, bot); c.lineTo(-w / 2 + sw, bot); c.closePath(); c.fillStyle = base; c.fill();
  c.strokeStyle = band; c.lineWidth = 3; c.strokeRect(-w / 2 + 4 + sw * 0.4, top + 4, w - 8, bot - top - 8);
  c.fillStyle = band; for (let i = 0; i < 3; i++) c.fillRect(-w / 2 + sw * 0.1, top + 10 + i * 4, w, 1.5);
  const cy = (top + bot) / 2 + 4, mx = sw * 0.5;
  poly(c, [mx, cy - h * 0.2, mx + w * 0.28, cy, mx, cy + h * 0.2, mx - w * 0.28, cy], accent);
  poly(c, [mx, cy - h * 0.1, mx + w * 0.14, cy, mx, cy + h * 0.1, mx - w * 0.14, cy], band);
  c.strokeStyle = accent; c.lineWidth = 1.4; for (let x = -w / 2 + 3; x <= w / 2 - 2; x += 4) { c.beginPath(); c.moveTo(x + sw, bot); c.lineTo(x + sw * 1.2, bot + 6); c.stroke(); }
}
function fennec(c, a) {
  const tw = Math.sin(a.t * 5) * a.live, wag = Math.sin(a.t * 2.4) * a.live;
  const fur = '#f1cf98', shade = '#d9a967', cream = '#fff3dc';
  c.save(); c.translate(0, 4);
  const ear = (sx) => { c.save(); c.translate(sx * 10, -14); c.rotate(sx * (0.36 - tw * 0.08)); poly(c, [-9, 2, 0, -34, 9, 2], fur); poly(c, [-5, 0, 0, -26, 5, 0], '#f0a39a'); c.restore(); };
  ear(-1); ear(1);
  ell(c, 0, 18, 17, 18, fur); ell(c, 0, 22, 10, 13, cream);
  c.save(); c.translate(4, 34); c.rotate(wag * 0.08); ell(c, 24, -1, 6, 5, '#3a2a20'); ell(c, 9, 0, 17, 6.5, shade); c.restore();
  ell(c, -6, 34, 4.5, 3, cream); ell(c, 4, 34, 4.5, 3, cream);
  ell(c, 0, -7, 15, 12, fur); ell(c, 0, -1, 8, 6, cream);
  circ(c, 0, -3.5, 2.3, '#2a1d17');
  [-6, 6].forEach((x) => { circ(c, x, -9, 2.6, '#2a1d17'); circ(c, x + 0.8, -9.8, 0.8, '#fff'); });
  ell(c, -10, -3, 2.6, 1.6, 'rgba(240,140,120,.5)'); ell(c, 10, -3, 2.6, 1.6, 'rgba(240,140,120,.5)');
  c.restore();
}

/* ===== 7-2 Camel Caravan (Zagora, Morocco) ===== */
function kasbah(c, x, y, w, h, col, win) {
  poly(c, [x, y, x + w * 0.08, y - h, x + w * 0.92, y - h, x + w, y], col);
  for (let k = 0; k < 4; k++) c.fillRect(x + w * 0.1 + k * w * 0.22, y - h - 4, w * 0.1, 5);
  c.fillStyle = win; c.fillRect(x + w * 0.4, y - h * 0.6, w * 0.16, h * 0.18); c.fillRect(x + w * 0.4, y - h * 0.32, w * 0.16, h * 0.32);
}
function bgZagora(c) {
  posterOpen(c);
  skyBands(c, ['#f7e4b8', '#f4d29a', '#f0b97c', '#ea9a61', '#e2804f'], 10, 46);
  stripeSun(c, 262, 196, 62, '#fbeccb', '#ea9a61', 4);
  kasbah(c, 156, 246, 44, 46, '#b86a43', '#7a3a26'); kasbah(c, 194, 246, 32, 30, '#a65a38', '#7a3a26');
  [[234, 244, 0.9], [150, 246, 0.8], [312, 244, 1], [334, 246, 0.8], [20, 244, 0.9]].forEach(([x, y, s]) => tinyPalm(c, x, y, s, '#6e5034'));
  dune(c, 240, 8, '#eab06a', 0.6, 50);
  dune(c, 296, 14, '#e09a55', 2.1, 70);
  dune(c, 376, 12, '#d0803f', 0.3, 55);
  dune(c, 446, 8, '#bf6d35', 1.4, 45);
  for (let i = 0; i < 9; i++) { const x = 120 + i * 13, y = 448 - i * 3 + (i % 2) * 4; ell(c, x, y, 3, 1.6, 'rgba(90,40,15,.25)'); }
  foot(c, 236, 366, 56); foot(c, 96, 418, 36); foot(c, 282, 462, 46); foot(c, 82, 262, 16);
  posterClose(c, 'ZAGORA', T('摩洛哥 · 撒哈拉商隊之路 · 1938', 'MOROCCO · THE CARAVAN ROAD · 1938'));
}
function drawTimbuktu(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-3, -30, 6, 78);
  poly(c, [-56, -46, 44, -46, 58, -32, 44, -18, -56, -18], '#2d5c66');
  txt(c, LOCAL('TOMBOUCTOU'), -6, -32, `700 13px ${SERIF}`, '#f3e3c3');
  poly(c, [-44, -12, 52, -12, 52, 12, -44, 12, -56, 0], '#c4553b');
  txt(c, LOCAL('52 JOURS'), 2, 0, `700 12px ${SERIF}`, '#f3e3c3');
}
function caravanSaddle(c) {
  poly(c, [-22, -30, 14, -30, 18, -4, -26, -4], '#c4553b');
  c.fillStyle = '#2d5c66'; c.fillRect(-23, -22, 40, 4); c.fillStyle = '#f3e3c3'; c.fillRect(-24, -14, 42, 3);
  for (let x = -24; x <= 16; x += 5) { c.fillStyle = '#e9b36b'; c.fillRect(x, -4, 2, 6); }
  rr(c, -10, -40, 16, 12, 3); c.fillStyle = '#6b4a2b'; c.fill();
  ell(c, 22, -12, 6, 9, '#8a5a34'); lineC(c, '#5a3a22', 1.2, [18, -20, 22, -26, 26, -20]);
}
function drawCaravanCamel(c, a) { dromedary(c, a, { deco: caravanSaddle }); }
function drawCalf(c, a) {
  dromedary(c, a, { s: 0.64, body: '#ecc796', far: '#a8703e', leg: '#d4a56c', bigEye: true, walk: 1.4 });
}
function drawWell(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-38, -34, 7, 40); c.fillRect(31, -34, 7, 40);
  c.fillStyle = '#4e3420'; c.fillRect(-44, -40, 88, 7);
  circ(c, 0, -30, 6.5, '#3c2a1c'); circ(c, 0, -30, 2.2, '#e9b36b');
  lineC(c, '#3c2a1c', 1.4, [0, -24, 0, -10]);
  poly(c, [-7, -10, 7, -10, 5, 2, -5, 2], '#2d5c66'); c.fillStyle = '#1f3d44'; c.fillRect(-7, -10, 14, 2);
  rr(c, -44, 4, 88, 34, 4); c.fillStyle = '#d9b48a'; c.fill();
  c.fillStyle = '#3c2a1c'; c.fillRect(-40, 4, 80, 5);
  c.strokeStyle = 'rgba(120,70,40,.55)'; c.lineWidth = 1.2;
  for (let r = 0; r < 3; r++) { const y = 15 + r * 8; c.beginPath(); c.moveTo(-44, y); c.lineTo(44, y); c.stroke(); for (let x = -40 + (r % 2) * 8; x < 44; x += 16) { c.beginPath(); c.moveTo(x, y - 6); c.lineTo(x, y); c.stroke(); } }
  c.fillStyle = 'rgba(80,40,20,.18)'; c.fillRect(20, 9, 24, 29);
}

/* ===== 7-3 Oasis Market (Siwa, Egypt) ===== */
function bgSiwa(c) {
  posterOpen(c);
  skyBands(c, ['#d5ebe2', '#c4e3d9', '#b2dacf', '#a0d0c4'], 10, 52);
  // Shali, the old mud-and-salt fortress, on its hill
  c.fillStyle = '#ecd6b0';
  c.beginPath(); c.moveTo(196, 230); c.lineTo(206, 160); c.quadraticCurveTo(214, 140, 230, 146); c.lineTo(240, 112); c.quadraticCurveTo(254, 96, 268, 110); c.lineTo(282, 128); c.quadraticCurveTo(300, 122, 312, 142); c.lineTo(322, 160); c.quadraticCurveTo(336, 160, 344, 176); c.lineTo(350, 230); c.closePath(); c.fill();
  c.fillStyle = '#d2b088'; c.beginPath(); c.moveTo(268, 110); c.lineTo(282, 128); c.quadraticCurveTo(300, 122, 312, 142); c.lineTo(322, 160); c.quadraticCurveTo(336, 160, 344, 176); c.lineTo(350, 230); c.lineTo(300, 230); c.lineTo(290, 150); c.closePath(); c.fill();
  c.fillStyle = '#b9926a'; [[222, 160], [248, 124], [258, 142], [282, 152], [232, 186], [262, 176], [214, 204], [250, 206], [304, 170], [326, 190]].forEach(([x, y]) => { c.fillRect(x, y, 6, 9); c.beginPath(); c.arc(x + 3, y, 3, Math.PI, 0); c.fill(); });
  [[202, 232, 1.3], [226, 236, 1.6], [330, 236, 1.4], [176, 236, 1.1]].forEach(([x, y, s]) => tinyPalm(c, x, y, s, '#3f7a6a'));
  c.fillStyle = '#e8b47c'; c.fillRect(0, 230, W, H);
  c.fillStyle = '#dca06a'; c.fillRect(0, 330, W, H);
  // the stall: striped awning on two posts
  c.fillStyle = '#6b4a2b'; c.fillRect(16, 96, 6, 214); c.fillRect(204, 96, 6, 214);
  for (let i = 0; i < 7; i++) { c.fillStyle = i % 2 ? '#f3e3c3' : '#c4553b'; c.fillRect(10 + i * 30, 92, 30, 22); c.beginPath(); c.arc(25 + i * 30, 114, 15, 0, Math.PI); c.fill(); }
  c.fillStyle = '#1f2a30'; c.fillRect(10, 90, 210, 3);
  lineC(c, '#6b4a2b', 1.6, [58, 124, 58, 134]);
  // a rope for the rug, tied to a pole
  c.fillStyle = '#6b4a2b'; c.fillRect(342, 190, 6, 140);
  lineC(c, '#6b4a2b', 1.6, [210, 206, 345, 200]);
  // stall table with spice cones, dates and olives
  c.fillStyle = '#8f5a2e'; c.fillRect(30, 262, 168, 10); c.fillRect(36, 272, 6, 44); c.fillRect(186, 272, 6, 44);
  c.fillStyle = '#a9703c'; c.fillRect(30, 272, 168, 14);
  [[52, '#c4553b'], [80, '#e8a33a'], [108, '#8a9a3c']].forEach(([x, col]) => { poly(c, [x - 12, 262, x, 236, x + 12, 262], col); });
  [[144, '#5a3320'], [176, '#56693a']].forEach(([x, col]) => { ell(c, x, 258, 15, 6, '#c08a4c'); for (let i = 0; i < 9; i++) circ(c, x - 9 + (i % 5) * 4.5, 254 - Math.floor(i / 5) * 3, 2.2, col); });
  foot(c, 84, 424, 48); foot(c, 232, 438, 58);
  posterClose(c, 'SIWA', T('埃及 · 錫瓦綠洲 · 市集日', 'EGYPT · SIWA OASIS · MARKET DAY'));
}
function drawSiwaLantern(c, a) { lanternM(c, a, { glass: '#f2b84b' }); }
function drawStallSign(c) {
  lineC(c, '#4a3020', 1.4, [-38, -26, -30, -12]); lineC(c, '#4a3020', 1.4, [38, -26, 30, -12]);
  rr(c, -52, -12, 104, 36, 4); c.fillStyle = '#f3e3c3'; c.fill(); c.strokeStyle = '#2d5c66'; c.lineWidth = 3; c.stroke();
  txt(c, T('椰棗 · 橄欖', 'DATES & OLIVES'), 0, 6, T(`700 14px "Noto Serif TC", serif`, `700 11px ${SERIF}`), '#c4553b');
}
function drawSiwaRug(c, a) { rug(c, 80, 112, '#c4553b', '#f3e3c3', '#2d5c66', a); }
function drawPots(c) {
  const terr = '#c9773f', dk = '#9e5530', lt = '#e8a066';
  const jar = (x, y, s, band) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.beginPath(); c.moveTo(-8, -26); c.lineTo(8, -26); c.lineTo(9, -20); c.bezierCurveTo(24, -14, 24, 14, 10, 20); c.lineTo(-10, 20); c.bezierCurveTo(-24, 14, -24, -14, -9, -20); c.closePath(); c.fillStyle = terr; c.fill();
    c.fillStyle = dk; c.fillRect(-10, -28, 20, 4);
    c.strokeStyle = band; c.lineWidth = 1.8; c.beginPath(); for (let i = 0; i <= 8; i++) c.lineTo(-17 + i * 4.25, -4 + (i % 2 ? 5 : 0)); c.stroke();
    c.beginPath(); c.moveTo(10, -16); c.bezierCurveTo(18, -10, 18, 12, 10, 18); c.lineTo(14, 4); c.closePath(); c.fillStyle = 'rgba(80,30,10,.2)'; c.fill();
    c.restore();
  };
  jar(-22, -6, 1.12, '#f3e3c3'); jar(22, 4, 0.86, '#2d5c66');
  c.save(); c.translate(4, 28);
  ell(c, 0, 8, 28, 5, dk); rr(c, -26, 2, 52, 6, 2); c.fillStyle = terr; c.fill();
  poly(c, [-21, 3, 0, -18, 21, 3], lt); poly(c, [0, -18, 21, 3, 6, 3], terr);
  c.strokeStyle = '#2d5c66'; c.lineWidth = 2; c.beginPath(); c.moveTo(-14, -2); c.lineTo(14, -2); c.stroke();
  circ(c, 0, -19, 3.5, dk);
  c.restore();
}
function drawDonkey(c, a) {
  const st = Math.sin(a.t * 3) * a.live, ear = Math.sin(a.t * 4) * a.live, grey = '#9b938c', dk = '#6d6660', lt = '#e2dcd4';
  c.save(); c.scale(-1, 1); c.translate(-4, 6);
  const leg = (x, k, col) => { c.save(); c.translate(x, 6); c.rotate(k * 0.14); c.fillStyle = col; c.fillRect(-3.5, 0, 7, 32); c.fillStyle = '#3b3632'; c.fillRect(-4, 28, 8, 5); c.restore(); };
  leg(-24, -st, dk); leg(22, st, dk);
  lineC(c, dk, 2.4, [-38, -4, -46, 8, -44 + st * 2, 20]); ell(c, -44 + st * 2, 22, 3, 4, '#3b3632');
  ell(c, -4, 0, 38, 17, grey); ell(c, -4, 9, 28, 7, lt);
  c.beginPath(); c.moveTo(22, -10); c.bezierCurveTo(32, -18, 36, -30, 40, -36); c.lineTo(50, -30); c.bezierCurveTo(44, -16, 40, 0, 30, 8); c.closePath(); c.fillStyle = grey; c.fill();
  lineC(c, '#3b3632', 3, [24, -14, 32, -24, 40, -34]);
  ell(c, 50, -30, 15, 8, grey, 0.55); ell(c, 57, -21, 7, 6, lt, 0.5); circ(c, 59, -19, 1.2, '#3b3632');
  circ(c, 47, -33, 1.8, '#1f2a30');
  [[38, -38, -0.5], [44, -40, -0.25]].forEach(([x, y, r], k) => { c.save(); c.translate(x, y); c.rotate(r + (k ? ear : -ear) * 0.12); ell(c, 0, -10, 4, 12, k ? grey : dk); ell(c, 0, -10, 2, 8, '#d7b4ae'); c.restore(); });
  // panniers full of dates
  rr(c, -24, -26, 34, 30, 5); c.fillStyle = '#b07a3c'; c.fill();
  c.strokeStyle = '#8a5a2a'; c.lineWidth = 1.2; for (let y = -20; y < 4; y += 5) { c.beginPath(); c.moveTo(-24, y); c.lineTo(10, y); c.stroke(); }
  for (let i = 0; i < 7; i++) circ(c, -20 + i * 4.6, -27 - (i % 2) * 2, 3, '#5a2a1a');
  c.fillStyle = '#c4553b'; c.fillRect(-26, -6, 38, 4);
  leg(-34, st, grey); leg(14, -st, grey);
  c.restore();
}

/* ===== 7-4 Dune Sunset (Erg Chebbi, Morocco) ===== */
function bgMerzouga(c) {
  posterOpen(c);
  skyBands(c, ['#f8dca6', '#f6c488', '#f2a874', '#ea8c66', '#dc6f5d', '#c4575a'], 10, 50);
  stripeSun(c, 190, 222, 78, '#fbe6b4', '#f2a874', 5);
  c.strokeStyle = '#7a3550'; c.lineWidth = 1.6;
  [[250, 110], [266, 102], [282, 114], [300, 98]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x - 6, y - 3); c.quadraticCurveTo(x - 3, y - 5, x, y); c.quadraticCurveTo(x + 3, y - 5, x + 6, y - 3); c.stroke(); });
  // far crest, where the caravan walks
  c.beginPath(); c.moveTo(0, 300); c.quadraticCurveTo(100, 262, 200, 258); c.quadraticCurveTo(290, 256, W, 284); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fillStyle = '#d98a62'; c.fill();
  c.beginPath(); c.moveTo(200, 258); c.quadraticCurveTo(290, 256, W, 284); c.lineTo(W, 340); c.quadraticCurveTo(250, 300, 200, 258); c.closePath(); c.fillStyle = '#b8605a'; c.fill();
  // middle dune with a sharp crest
  c.beginPath(); c.moveTo(0, 372); c.quadraticCurveTo(140, 330, 236, 334); c.quadraticCurveTo(310, 338, W, 360); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fillStyle = '#e8a06e'; c.fill();
  c.beginPath(); c.moveTo(236, 334); c.quadraticCurveTo(310, 338, W, 360); c.lineTo(W, H); c.lineTo(320, H); c.quadraticCurveTo(270, 390, 236, 334); c.closePath(); c.fillStyle = '#c97a5e'; c.fill();
  c.beginPath(); c.moveTo(0, 432); c.quadraticCurveTo(180, 410, W, 444); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fillStyle = '#f0b07c'; c.fill();
  // tea rug
  poly(c, [158, 432, 236, 432, 244, 446, 150, 446], '#7a3550'); c.fillStyle = '#f3c26a'; c.fillRect(160, 437, 76, 2); c.fillRect(156, 442, 84, 1.5);
  foot(c, 80, 418, 30, 'rgba(90,30,30,.22)'); foot(c, 296, 462, 24, 'rgba(90,30,30,.22)');
  posterClose(c, 'MERZOUGA', T('摩洛哥 · 切比沙丘 · 日落', 'MOROCCO · ERG CHEBBI · SUNSET'));
}
function silhouetteBlanket(c) { poly(c, [-20, -30, 14, -30, 17, -6, -24, -6], '#8a3a52'); for (let x = -23; x <= 14; x += 6) { c.fillStyle = '#e9a271'; c.fillRect(x, -6, 2, 5); } }
function drawLeadCamel(c, a) { dromedary(c, a, { s: 0.68, body: '#4a2338', far: '#36182a', leg: '#4a2338', eye: '#4a2338', deco: silhouetteBlanket }); }
function drawFollowCamel(c, a) { dromedary(c, a, { s: 0.64, body: '#4a2338', far: '#36182a', leg: '#4a2338', eye: '#4a2338', walk: 0.8 }); }
function drawScarab(c, a) {
  const k = Math.sin(a.t * 9) * a.live;
  c.save(); c.translate(0, 1);
  for (let i = -1; i <= 1; i++) {
    const y = -2 + i * 9;
    lineC(c, '#1f2a30', 2.2, [-8, y, -18, y + i * 5 - 3 + k * 2, -23, y + i * 9 - 1]);
    lineC(c, '#1f2a30', 2.2, [8, y, 18, y + i * 5 - 3 - k * 2, 23, y + i * 9 - 1]);
  }
  lineC(c, '#1f2a30', 1.4, [-3, -18, -7, -21]); lineC(c, '#1f2a30', 1.4, [3, -18, 7, -21]);
  ell(c, 0, 6, 12, 14, '#2d6c74'); ell(c, -5, 2, 3, 7, '#64aeb0'); lineC(c, '#173a40', 1.4, [0, -6, 0, 19]);
  ell(c, 0, -9, 10, 6.5, '#245a62'); ell(c, -3, -10, 3, 2, '#64aeb0');
  poly(c, [-7, -14, -6, -19, -2, -17, 0, -20, 2, -17, 6, -19, 7, -14], '#173a40');
  c.restore();
}
function drawTeapot(c) {
  c.save(); c.translate(0, -4);
  ell(c, 0, 27, 27, 5, '#a0702e'); ell(c, 0, 25.5, 25, 3.6, '#e2b65a');
  c.strokeStyle = '#b9bdb7'; c.lineWidth = 3.6; c.lineCap = 'round'; c.beginPath(); c.moveTo(11, 12); c.quadraticCurveTo(24, 8, 28, -8); c.stroke();
  c.lineWidth = 3; c.beginPath(); c.moveTo(-12, -2); c.quadraticCurveTo(-28, 0, -13, 17); c.stroke();
  c.beginPath(); c.moveTo(-14, 23); c.bezierCurveTo(-21, 10, -16, -4, -8, -6); c.lineTo(8, -6); c.bezierCurveTo(16, -4, 21, 10, 14, 23); c.closePath(); c.fillStyle = '#d9dcd6'; c.fill();
  c.beginPath(); c.moveTo(6, -6); c.bezierCurveTo(14, -4, 19, 10, 13, 23); c.lineTo(5, 23); c.bezierCurveTo(9, 10, 8, 0, 6, -6); c.closePath(); c.fillStyle = '#b3b7b1'; c.fill();
  c.strokeStyle = '#8f948e'; c.lineWidth = 1.2; c.beginPath(); for (let i = 0; i <= 8; i++) c.lineTo(-15 + i * 3.8, 10 + (i % 2 ? -3 : 0)); c.stroke();
  c.beginPath(); c.arc(0, -7, 8, Math.PI, 0); c.fillStyle = '#c6c9c3'; c.fill();
  poly(c, [-2, -14, 0, -22, 2, -14], '#b3b7b1'); circ(c, 0, -15, 2.4, '#c6c9c3');
  c.restore();
}

/* ===== 7-5 Cactus Country (Sonoran Desert, Arizona) ===== */
function saguaroShape(c, x, y, s, g, d) {
  c.save(); c.translate(x, y); c.scale(s, s);
  rr(c, -12, -80, 24, 162, 12); c.fillStyle = g; c.fill();
  rr(c, -34, -2, 30, 12, 6); c.fill(); rr(c, -36, -46, 12, 54, 6); c.fill();
  rr(c, 4, -26, 30, 12, 6); c.fill(); rr(c, 22, -64, 12, 50, 6); c.fill();
  c.strokeStyle = d; c.lineWidth = 1.4;
  [-5, 0, 5].forEach((dx) => { c.beginPath(); c.moveTo(dx, -74); c.lineTo(dx, 80); c.stroke(); });
  [[-30, -42, 4], [28, -60, 4]].forEach(([ax, ay, l]) => { c.beginPath(); c.moveTo(ax, ay + 4); c.lineTo(ax, ay + 40); c.stroke(); });
  c.restore();
}
function bgArizona(c) {
  posterOpen(c);
  skyBands(c, ['#fbe5cc', '#f8d0b2', '#f4b89e', '#ee9f8e', '#e48a86'], 10, 44);
  stripeSun(c, 272, 150, 40, '#fff2d6', '#f4b89e', 3);
  poly(c, [10, 236, 40, 236, 52, 196, 120, 196, 132, 236, 210, 236, 222, 210, 262, 210, 276, 236, 350, 236, 350, 250, 10, 250], '#9a6a92');
  poly(c, [180, 250, 196, 222, 300, 222, 316, 250], '#7c5180');
  c.fillStyle = '#e3a06a'; c.fillRect(0, 248, W, H);
  dune(c, 300, 6, '#d98f5c', 1, 70); dune(c, 372, 8, '#cc7c4c', 2.4, 60); dune(c, 440, 5, '#bd6c42', 0.5, 50);
  // ocotillo and prickly pear
  lineC(c, '#5a6a44', 2, [214, 300, 206, 262]); lineC(c, '#5a6a44', 2, [216, 300, 216, 258]); lineC(c, '#5a6a44', 2, [218, 300, 228, 264]);
  [[206, 262], [216, 258], [228, 264]].forEach(([x, y]) => circ(c, x, y - 2, 2.4, '#e2553b'));
  [[338, 300, 9, 11], [328, 292, 7, 9], [346, 286, 6, 8]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, '#5f8a5c'));
  saguaroShape(c, 70, 260, 0.98, '#4a6f52', '#3a5a42');
  foot(c, 70, 340, 20); foot(c, 300, 322, 28); foot(c, 150, 352, 30); foot(c, 292, 446, 34); foot(c, 172, 254, 44);
  // ranch gate posts and fence
  c.fillStyle = '#6b4a2b'; c.fillRect(54, 392, 8, 58); c.fillRect(202, 392, 8, 58);
  lineC(c, '#6b4a2b', 1.2, [10, 404, 54, 404]); lineC(c, '#6b4a2b', 1.2, [10, 424, 54, 424]); lineC(c, '#6b4a2b', 1.2, [210, 404, 240, 400]); lineC(c, '#6b4a2b', 1.2, [210, 424, 240, 420]);
  c.fillStyle = '#6b4a2b'; c.fillRect(238, 396, 5, 34);
  posterClose(c, 'ARIZONA', T('美國 · 索諾拉沙漠 · 巨人柱之鄉', 'USA · SONORAN DESERT · SAGUARO LAND'));
}
function drawParkSign(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-46, 0, 7, 40); c.fillRect(39, 0, 7, 40);
  rr(c, -58, -38, 116, 44, 4); c.fillStyle = '#6a4630'; c.fill(); c.strokeStyle = '#f3e3c3'; c.lineWidth = 1.6; rr(c, -54, -34, 108, 36, 3); c.stroke();
  txt(c, T('巨人柱國家公園', "SAGUARO NAT'L PARK"), 0, -21, T(`700 13px "Noto Serif TC", serif`, `700 11px ${SERIF}`), '#f3e3c3');
  txt(c, T('亞利桑那州 · 土桑', 'TUCSON · ARIZONA'), 0, -7, T(`500 9px "Noto Sans TC", sans-serif`, `700 8px ${SERIF}`), '#f1c27f');
}
function drawSaguaro(c) {
  saguaroShape(c, 2, 2, 1, '#55835e', '#3e6650');
  [[-30, -45], [28, -63], [-4, -78], [6, -77]].forEach(([x, y]) => { circ(c, x + 2, y - 2, 4.5, '#fbf3e0'); circ(c, x + 2, y - 2, 1.6, '#f1c24a'); });
}
function drawRoadrunner(c, a) {
  const run = Math.sin(a.t * 10) * a.live, br = '#7a5a3c', dk = '#3d2b1f';
  c.save(); c.translate(-2, 2);
  lineC(c, dk, 2, [-2, 8, -6 + run * 6, 26, -12 + run * 6, 28]); lineC(c, dk, 2, [2, 8, 6 - run * 6, 26, 12 - run * 6, 28]);
  poly(c, [-10, -6, -46, -26, -44, -18, -10, 4], dk); poly(c, [-14, -4, -40, -20, -38, -16, -14, 2], '#9b7a52');
  ell(c, 0, 0, 20, 10, br, -0.15);
  c.fillStyle = '#efe0c0'; [[-8, -2], [-2, 2], [4, -4], [8, 1], [-12, 3]].forEach(([x, y]) => c.fillRect(x, y, 4, 1.6));
  ell(c, 0, 5, 14, 5, '#e8d7b4', -0.1);
  ell(c, 22, -12, 9, 7, br);
  poly(c, [14, -16, 16, -26, 20, -18, 23, -27, 26, -18], dk);
  ell(c, 26, -12, 3.2, 2.2, '#4a7ec4'); circ(c, 25, -13, 1.6, '#1f2a30'); ell(c, 29, -11, 2, 1.4, '#e2553b');
  poly(c, [29, -14, 46, -11, 29, -9], '#3d2b1f');
  c.restore();
}
function drawTortoise(c, a) {
  const k = Math.sin(a.t * 1.5) * a.live;
  c.save(); c.translate(-2, 4);
  [[-22, -1], [16, 1]].forEach(([x, s]) => { rr(c, x - 6, 4 + s * k, 12, 14, 4); c.fillStyle = '#8a7a5a'; c.fill(); c.fillStyle = '#6e6046'; c.fillRect(x - 6, 15 + s * k, 12, 3); });
  c.beginPath(); c.moveTo(24, 6); c.quadraticCurveTo(34 + k * 3, -6, 40 + k * 3, -2); c.quadraticCurveTo(44 + k * 3, 6, 30, 10); c.closePath(); c.fillStyle = '#9a8a68'; c.fill();
  circ(c, 38 + k * 3, -2, 1.5, '#1f2a30');
  c.beginPath(); c.moveTo(-34, 8); c.bezierCurveTo(-34, -30, 30, -30, 30, 8); c.closePath(); c.fillStyle = '#a77d48'; c.fill();
  c.strokeStyle = '#6b4a2b'; c.lineWidth = 1.5;
  [[-16, -6], [0, -10], [16, -6]].forEach(([x, y]) => { c.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; c.lineTo(x + Math.cos(an) * 7, y + Math.sin(an) * 6); } c.closePath(); c.stroke(); });
  c.fillStyle = '#7d5c35'; c.fillRect(-34, 5, 64, 4);
  c.restore();
}
function drawGateHalf(c, side) {
  const wd = '#8a5a34', dk = '#5a3a22';
  c.save(); c.scale(side, 1);
  c.fillStyle = wd; [-18, -4, 10].forEach((y) => c.fillRect(-34, y, 68, 6));
  c.fillRect(-34, -22, 7, 42); c.fillRect(27, -22, 7, 42);
  c.save(); c.beginPath(); c.moveTo(-30, 16); c.lineTo(-26, 19); c.lineTo(31, -17); c.lineTo(27, -21); c.closePath(); c.fillStyle = wd; c.fill(); c.restore();
  c.fillStyle = dk; c.fillRect(-36, -15, 10, 3); c.fillRect(-36, 12, 10, 3);
  c.restore();
  if (side < 0) { rr(c, -36, -4, 6, 6, 2); c.fillStyle = '#3c3c3c'; c.fill(); }
}
function drawGateL(c) { drawGateHalf(c, 1); }
function drawGateR(c) { drawGateHalf(c, -1); }
function drawWoodpecker(c) {
  poly(c, [-14, -3, -28, 0, -27, 5, -14, 5], '#2b2b2b');
  ell(c, -2, 1, 14, 8, '#d3bf98');
  c.save(); c.beginPath(); c.ellipse(-2, 1, 14, 8, 0, Math.PI, PI2); c.clip(); c.fillStyle = '#2b2b2b'; c.fillRect(-16, -8, 30, 9);
  c.fillStyle = '#f3ecd8'; for (let x = -14; x < 12; x += 4) c.fillRect(x, -8, 1.8, 9); c.restore();
  circ(c, 13, -3, 7, '#d3bf98'); circ(c, 13, -8.5, 3, '#d8463a');
  poly(c, [19, -5, 28, -3, 19, 0], '#2b2b2b'); circ(c, 15, -4, 1.5, '#1f2a30');
  lineC(c, '#4a4a4a', 1.4, [-2, 8, -1, 13]); lineC(c, '#4a4a4a', 1.4, [4, 8, 5, 13]);
}

/* ===== 7-6 Petra (Jordan) ===== */
function bgPetra(c) {
  posterOpen(c, '#f3e3c3');
  c.fillStyle = '#a6d1c8'; c.fillRect(0, 0, W, 120);
  c.fillStyle = '#e39c82'; c.fillRect(0, 70, W, H);
  // the Treasury (Al-Khazneh), carved into the cliff
  const fx = 180, lt = '#f7c4a6', md = '#d4846a', dk = '#a85548', sh = '#7a3038';
  c.fillStyle = md; c.fillRect(fx - 98, 92, 196, 258);
  c.fillStyle = dk; c.fillRect(fx - 92, 120, 184, 66); c.fillRect(fx - 92, 242, 184, 106);
  for (let i = 0; i < 6; i++) { const x = fx - 86 + i * 32.4; c.fillStyle = lt; c.fillRect(x, 244, 11, 104); c.fillStyle = md; c.fillRect(x + 8, 244, 3, 104); c.fillStyle = lt; c.fillRect(x - 2, 244, 15, 5); }
  c.fillStyle = sh; c.fillRect(fx - 10, 284, 20, 64);
  c.fillStyle = lt; c.fillRect(fx - 96, 230, 192, 12); poly(c, [fx - 66, 230, fx, 198, fx + 66, 230], lt); poly(c, [fx - 54, 228, fx, 206, fx + 54, 228], md);
  c.fillStyle = lt; c.fillRect(fx - 96, 186, 192, 10);
  [-1, 1].forEach((sd) => { [62, 84].forEach((d) => { c.fillStyle = lt; c.fillRect(fx + sd * d - 5, 142, 10, 44); c.fillStyle = md; c.fillRect(fx + sd * d + 2, 142, 3, 44); }); poly(c, [fx + sd * 96, 142, fx + sd * 96, 124, fx + sd * 52, 142], lt); c.fillStyle = lt; c.fillRect(Math.min(fx + sd * 96, fx + sd * 52), 140, 44, 5); });
  c.fillStyle = md; c.fillRect(fx - 26, 132, 52, 54); for (let i = 0; i < 4; i++) { c.fillStyle = lt; c.fillRect(fx - 24 + i * 14.7, 134, 8, 52); }
  c.fillStyle = lt; c.fillRect(fx - 30, 128, 60, 6); poly(c, [fx - 30, 128, fx, 106, fx + 30, 128], lt); circ(c, fx, 101, 6, lt); c.fillRect(fx - 2, 90, 4, 10);
  // the Siq's walls, dark and curving
  c.fillStyle = '#6e2f35';
  c.beginPath(); c.moveTo(0, 0); c.lineTo(172, 0); c.quadraticCurveTo(70, 30, 66, 130); c.quadraticCurveTo(64, 190, 80, 220); c.quadraticCurveTo(96, 300, 70, 360); c.lineTo(0, 380); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(W, 0); c.lineTo(282, 0); c.quadraticCurveTo(306, 110, 280, 200); c.quadraticCurveTo(262, 290, 296, 350); c.lineTo(W, 370); c.closePath(); c.fill();
  c.fillStyle = '#8a3c40';
  c.beginPath(); c.moveTo(0, 90); c.quadraticCurveTo(40, 160, 30, 250); c.quadraticCurveTo(26, 320, 0, 360); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(W, 80); c.quadraticCurveTo(316, 170, 330, 260); c.lineTo(W, 330); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(240,160,130,.35)'; c.lineWidth = 2; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(0, 130 + i * 30); c.quadraticCurveTo(30, 136 + i * 30, 60, 128 + i * 32); c.stroke(); c.beginPath(); c.moveTo(W, 120 + i * 32); c.quadraticCurveTo(330, 126 + i * 30, 300, 122 + i * 31); c.stroke(); }
  // ground, rock and the souvenir stall
  c.fillStyle = '#e8b48a'; c.fillRect(0, 344, W, H);
  c.fillStyle = '#ddA27a'; c.fillRect(0, 404, W, H);
  ell(c, 306, 318, 34, 14, '#b9655a'); ell(c, 300, 312, 28, 10, '#cf7d6a');
  c.fillStyle = '#4e3420'; c.fillRect(20, 250, 5, 120); c.fillRect(146, 250, 5, 120); c.fillRect(16, 252, 140, 5);
  foot(c, 262, 444, 56); foot(c, 165, 450, 18); foot(c, 70, 452, 30);
  posterClose(c, 'PETRA', T('約旦 · 玫瑰古城', 'JORDAN · THE ROSE CITY'), '#f3e3c3');
}
function drawPetraCamel(c, a) {
  camelRest(c, a, { body: '#b98050', far: '#8a5a34', deco: (c) => {
    poly(c, [-24, -14, 10, -14, 14, 10, -28, 10], '#1f2a30'); c.fillStyle = '#c4553b'; c.fillRect(-26, -4, 38, 4); c.fillStyle = '#e9b36b'; c.fillRect(-27, 4, 40, 2);
    [-22, -12, -2, 8].forEach((x) => { lineC(c, '#c4553b', 1.6, [x, 10, x, 16]); circ(c, x, 17, 2, '#e9b36b'); });
  } });
}
function drawAgama(c, a) {
  const bob = a.live * Math.max(0, Math.sin(a.t * 4)) * 3;
  c.save(); c.translate(2, 4);
  c.strokeStyle = '#2f5f9e'; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(-10, 2); c.quadraticCurveTo(-26, 6, -36, -2); c.stroke(); c.lineWidth = 2; c.beginPath(); c.moveTo(-34, -1); c.lineTo(-38, -6); c.stroke();
  lineC(c, '#2f5f9e', 2.2, [-8, 4, -12, 10, -16, 10]); lineC(c, '#2f5f9e', 2.2, [8, 4, 12, 10, 16, 10]);
  ell(c, 0, 1 - bob * 0.3, 14, 6, '#3f86d0');
  c.save(); c.translate(14, -3 - bob); ell(c, 2, 0, 8, 5.5, '#2f74c0', -0.15); circ(c, 4, -1.5, 1.4, '#1f2a30'); c.restore();
  c.restore();
}
function drawRugL(c, a) { rug(c, 46, 74, '#c4553b', '#f3e3c3', '#1f2a30', a); }
function drawRugR(c, a) { rug(c, 46, 74, '#2d5c66', '#e9b36b', '#c4553b', a); }
function drawSandBottle(c) {
  c.save(); c.translate(0, 2);
  c.fillStyle = '#7a5424'; c.fillRect(-4, -31, 8, 7);
  c.beginPath(); c.moveTo(-4, -24); c.lineTo(4, -24); c.lineTo(5, -14); c.bezierCurveTo(16, -10, 17, 22, 12, 28); c.lineTo(-12, 28); c.bezierCurveTo(-17, 22, -16, -10, -5, -14); c.closePath();
  c.save(); c.clip();
  ['#f3e3c3', '#e9b36b', '#c4553b', '#f1c27f', '#2d5c66', '#e88f50', '#f3e3c3', '#9e3f2b'].map((col, i) => [col, i]).reverse().forEach(([col, i]) => { c.fillStyle = col; c.beginPath(); c.moveTo(-20, 28 - i * 7); for (let x = -20; x <= 20; x += 5) c.lineTo(x, 28 - i * 7 - 6 + Math.sin(x / 5 + i) * 2); c.lineTo(20, 28); c.lineTo(-20, 28); c.fill(); });
  c.fillStyle = '#5a2a1a'; c.beginPath(); c.moveTo(-8, 6); c.quadraticCurveTo(-6, 0, -2, 0); c.quadraticCurveTo(0, -5, 3, 0); c.lineTo(7, -4); c.lineTo(8, 0); c.lineTo(5, 6); c.closePath(); c.fill(); c.fillRect(-7, 6, 1.5, 5); c.fillRect(4, 6, 1.5, 5);
  c.restore();
  c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-9, -6); c.quadraticCurveTo(-12, 8, -9, 22); c.stroke();
  c.restore();
}
function drawPetraSign(c) {
  c.fillStyle = '#5a3a22'; c.fillRect(-3, -6, 6, 42);
  poly(c, [-46, -30, 36, -30, 50, -16, 36, -2, -46, -2], '#f3e3c3'); c.strokeStyle = '#6e2f35'; c.lineWidth = 2; c.stroke();
  txt(c, T('往寶庫', 'TREASURY'), -6, -16, T(`700 14px "Noto Serif TC", serif`, `700 12px ${SERIF}`), '#6e2f35');
}

/* ===== 7-7 Sahara Stars (White Desert, Egypt) ===== */
function bgWhite(c) {
  posterOpen(c, '#f3e3c3');
  skyBands(c, ['#161b36', '#1b2142', '#212a52', '#2a3462', '#344074', '#3e4c82'], 10, 48);
  c.save(); c.translate(200, 150); c.rotate(-0.5); for (let i = 0; i < 5; i++) ell(c, 0, 0, 260 - i * 30, 26 - i * 4, 'rgba(200,190,255,.05)'); c.restore();
  starField(c, 110, 10, 10, W - 20, 260, '#f6ecd0', 3);
  starField(c, 40, 60, 60, 260, 160, '#fffbe8', 9);
  lineC(c, 'rgba(255,245,220,.7)', 1.2, [250, 74, 296, 96]); circ(c, 296, 96, 1.6, '#fffbe8');
  // chalk formations
  c.fillStyle = '#d7d2e6'; c.beginPath(); c.moveTo(10, 300); c.quadraticCurveTo(80, 270, 170, 290); c.quadraticCurveTo(260, 278, 350, 296); c.lineTo(350, 320); c.lineTo(10, 320); c.fill();
  const mush = (x, y, sw, sh, cw, ch) => { c.fillStyle = '#ece6d8'; c.beginPath(); c.moveTo(x - sw, y); c.quadraticCurveTo(x - sw * 0.5, y - sh * 0.5, x - sw * 0.7, y - sh); c.lineTo(x + sw * 0.7, y - sh); c.quadraticCurveTo(x + sw * 0.5, y - sh * 0.5, x + sw, y); c.fill(); ell(c, x, y - sh - ch * 0.4, cw, ch, '#f4efe4'); ell(c, x + cw * 0.25, y - sh - ch * 0.1, cw * 0.7, ch * 0.5, '#c8c2dc'); c.fillStyle = 'rgba(160,150,200,.45)'; c.fillRect(x + sw * 0.1, y - sh, sw * 0.6, sh); };
  mush(300, 300, 16, 58, 40, 16); mush(186, 292, 9, 26, 22, 10); mush(36, 298, 10, 34, 24, 11);
  c.fillStyle = '#c9b89a'; c.fillRect(0, 316, W, H);
  dune(c, 360, 6, '#bba98c', 1.2, 60); dune(c, 440, 5, '#ad9a7e', 2.4, 50);
  // the telescope's tripod
  lineC(c, '#2b2f3a', 3, [70, 234, 54, 300]); lineC(c, '#2b2f3a', 3, [70, 234, 86, 300]); lineC(c, '#2b2f3a', 3, [70, 234, 70, 304]);
  // campfire
  const fx = 180, fy = 384;
  for (let i = 0; i < 4; i++) ell(c, fx, fy, 70 - i * 15, 22 - i * 4.5, 'rgba(255,170,90,.07)');
  lineC(c, '#5a3a22', 4, [fx - 14, fy + 6, fx + 12, fy - 2]); lineC(c, '#5a3a22', 4, [fx - 12, fy - 2, fx + 14, fy + 6]);
  poly(c, [fx - 10, fy + 2, fx - 4, fy - 20, fx, fy - 10, fx + 4, fy - 26, fx + 10, fy + 2], '#e88f50'); poly(c, [fx - 5, fy + 2, fx, fy - 12, fx + 5, fy + 2], '#f6d27a');
  // lamp pole beside the tent
  c.fillStyle = '#3a2a24'; c.fillRect(252, 284, 4, 92); c.fillRect(236, 282, 22, 3);
  foot(c, 110, 452, 52, 'rgba(30,30,60,.25)'); foot(c, 306, 446, 30, 'rgba(30,30,60,.25)');
  posterClose(c, 'WHITE DESERT', T('埃及 · 撒哈拉星空', 'EGYPT · SAHARA NIGHTS'), '#f3e3c3');
}
function drawTelescope(c) {
  c.save(); c.translate(2, 0);
  rr(c, -44, -4, 8, 8, 2); c.fillStyle = '#1f2a30'; c.fill();
  rr(c, -38, -7, 66, 14, 3); c.fillStyle = '#c4553b'; c.fill();
  c.fillStyle = '#e9b36b'; c.fillRect(-24, -7, 4, 14); c.fillRect(12, -7, 4, 14);
  rr(c, 26, -10, 16, 20, 3); c.fillStyle = '#9e3f2b'; c.fill(); ell(c, 42, 0, 2, 8, '#bfe3e8');
  circ(c, -2, 0, 5, '#2b2f3a'); circ(c, -2, 0, 2, '#e9b36b');
  c.restore();
}
function drawOwl(c, a) {
  const bl = Math.sin(a.t * 1.3) > 0.93 && a.live > 0.5, br = '#c3935c', dk = '#8a6238';
  c.save(); c.translate(0, 4);
  ell(c, -13, 8, 7, 17, dk, 0.15); ell(c, 13, 8, 7, 17, dk, -0.15);
  ell(c, 0, 6, 16, 22, br); ell(c, 0, 12, 11, 14, '#ecd3a6');
  c.strokeStyle = dk; c.lineWidth = 1.2; [[-4, 6], [3, 10], [-2, 16], [5, 18], [-5, 22]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x - 2, y); c.lineTo(x + 2, y + 1); c.stroke(); });
  poly(c, [-14, -22, -10, -34, -5, -22], dk); poly(c, [14, -22, 10, -34, 5, -22], dk);
  ell(c, 0, -14, 15, 12, br); ell(c, -6, -14, 7, 7, '#e8cfa0'); ell(c, 6, -14, 7, 7, '#e8cfa0');
  [-6, 6].forEach((x) => { if (bl) lineC(c, '#3d2b1f', 1.6, [x - 4, -14, x + 4, -14]); else { circ(c, x, -14, 4.6, '#f08a2a'); circ(c, x, -14, 2.4, '#1f2a30'); circ(c, x + 1, -15, 0.8, '#fff'); } });
  poly(c, [-2, -9, 2, -9, 0, -4], '#3d2b1f');
  lineC(c, '#e9b36b', 1.6, [-5, 27, -5, 30]); lineC(c, '#e9b36b', 1.6, [5, 27, 5, 30]);
  c.restore();
}
function drawBlackTent(c) {
  c.save(); c.translate(0, 2);
  c.fillStyle = '#4a3a36'; c.fillRect(-60, -10, 120, 38);
  c.fillStyle = '#c4553b'; c.fillRect(-56, 18, 112, 10); c.fillStyle = '#e9b36b'; for (let x = -52; x < 56; x += 12) c.fillRect(x, 21, 6, 3);
  ell(c, -26, 14, 8, 5, '#2d5c66'); ell(c, 24, 14, 8, 5, '#e9b36b');
  c.beginPath(); c.moveTo(-70, 4); c.quadraticCurveTo(-58, -20, -40, -28); c.quadraticCurveTo(-20, -18, 0, -32); c.quadraticCurveTo(20, -18, 40, -28); c.quadraticCurveTo(58, -20, 70, 4); c.quadraticCurveTo(0, -4, -70, 4); c.closePath(); c.fillStyle = '#2b2326'; c.fill();
  c.strokeStyle = '#5a4c50'; c.lineWidth = 1.4; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-60, -6 - k * 6); c.quadraticCurveTo(0, -14 - k * 6, 60, -6 - k * 6); c.stroke(); }
  c.fillStyle = '#6b4a2b'; [-40, 0, 40].forEach((x) => c.fillRect(x - 1.5, -26, 3, 54));
  lineC(c, 'rgba(240,230,210,.6)', 1, [-40, -28, -70, 30]); lineC(c, 'rgba(240,230,210,.6)', 1, [40, -28, 70, 30]);
  c.restore();
}
function drawTentLamp(c, a) { lanternM(c, a, { glass: '#ffd36a', ph: 2 }); }
function drawSleepyCamel(c, a) {
  camelRest(c, a, { body: '#a77a56', far: '#7a563c', sleep: true, chew: 0.3 });
  const z = (a.t * 0.8) % 1;
  c.globalAlpha = a.live * (1 - z); txt(c, 'z', 62 + z * 4, -40 - z * 10, `700 ${8 + z * 4}px ${SERIF}`, '#f3e3c3'); c.globalAlpha = 1;
}
function drawStarChart(c) {
  lineC(c, '#6b4a2b', 4, [-22, -30, -32, 36]); lineC(c, '#6b4a2b', 4, [22, -30, 32, 36]); lineC(c, '#4e3420', 3, [0, -30, 0, 34]);
  rr(c, -30, -34, 60, 50, 3); c.fillStyle = '#1f2a4a'; c.fill(); c.strokeStyle = '#e9b36b'; c.lineWidth = 2; c.stroke();
  const st = [[-14, -28], [12, -27], [-4, -18], [0, -17], [4, -16], [-12, -6], [14, -5]];
  c.strokeStyle = 'rgba(243,227,195,.6)'; c.lineWidth = 1; c.beginPath(); [[0, 2], [2, 4], [0, 5], [1, 4], [4, 6]].forEach(([p, q]) => { c.moveTo(...st[p]); c.lineTo(...st[q]); }); c.stroke();
  st.forEach(([x, y], i) => circ(c, x, y, i === 0 ? 2.2 : 1.6, i === 0 ? '#f6a46a' : '#fffbe8'));
  txt(c, T('獵戶座', 'ORION'), 0, 7, T(`700 9px "Noto Serif TC", serif`, `700 9px ${SERIF}`), '#e9b36b');
}
function drawNightFennec(c, a) { fennec(c, a); }

/* ===== 7-8 Mirage (Chott el Djerid, Tunisia) ===== */
function bgDjerid(c) {
  posterOpen(c);
  skyBands(c, ['#fbefd8', '#f8e2c8', '#f5d4bb', '#f2c6b0'], 10, 56);
  stripeSun(c, 300, 92, 26, '#fff6e2', '#f8e2c8', 3);
  c.fillStyle = '#bfe2dc'; c.fillRect(0, 230, W, 20);
  for (let i = 0; i < 6; i++) { c.fillStyle = i % 2 ? '#d9efe9' : '#a9d6cf'; c.fillRect(0, 232 + i * 3, W, 1.6); }
  c.fillStyle = '#f6efe6'; c.fillRect(0, 248, W, H);
  // cracked salt crust in perspective
  c.strokeStyle = '#e3d3c4'; c.lineWidth = 1;
  for (let r = 0; r < 9; r++) { const y = 256 + r * r * 2.8 + r * 6, cell = 12 + r * 7; for (let x = -(r * 13) % cell; x < W; x += cell) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + cell * 0.5, y + 2 + r); c.lineTo(x + cell, y); c.stroke(); } }
  // the causeway road to the vanishing point
  poly(c, [174, 250, 186, 250, 260, H, 100, H], '#d8c3a6'); poly(c, [176, 250, 184, 250, 232, H, 128, H], '#cbb390');
  c.fillStyle = '#f6efe6'; for (let i = 0; i < 8; i++) { const t = i / 8, y = 254 + t * t * 230, w = 1 + t * 4, l = 3 + t * t * 18; c.fillRect(180 - w / 2, y, w, l); }
  for (let i = 0; i < 3; i++) { const t = (i + 1) / 6, x = 186 + t * t * 120, y = 250 + t * t * 160, h = 6 + t * t * 70; c.fillStyle = '#7a5a44'; c.fillRect(x, y - h, 1.5 + t * 2, h); c.fillRect(x - 2 - t * 6, y - h + 2, 5 + t * 12, 1 + t * 1.5); }
  foot(c, 84, 366, 56, 'rgba(120,80,60,.18)'); foot(c, 272, 350, 58, 'rgba(120,80,60,.18)'); foot(c, 70, 462, 22, 'rgba(120,80,60,.18)'); foot(c, 290, 456, 44, 'rgba(120,80,60,.18)');
  posterClose(c, 'TUNISIA', T('突尼西亞 · 傑里德鹽湖 · 海市蜃樓', 'CHOTT EL DJERID · LAND OF MIRAGES'));
}
function shimmer(c, a, w, y0, y1) {
  c.fillStyle = 'rgba(246,239,230,.4)';
  for (let y = y0; y < y1; y += 6) c.fillRect(-w / 2 + Math.sin(a.t * 4 + y / 3) * 2, y, w, 1.6);
}
function drawMiragePalm(c, a) {
  const sw = Math.sin(a.t * 3) * 1.5;
  c.save(); c.globalAlpha = 0.85;
  lineC(c, '#4f8a84', 4, [0, 4, -3 + sw * 0.3, -18, 1 + sw, -34]);
  for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + (i - 2.5) * 0.62; c.save(); c.translate(1 + sw, -34); c.rotate(an); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(10, -6, 20, 2); c.quadraticCurveTo(10, -1, 0, 0); c.fillStyle = '#2f8a80'; c.fill(); c.restore(); }
  c.globalAlpha = 0.4; c.save(); c.scale(1, -0.7); c.translate(0, -12);
  lineC(c, '#4f8a84', 4, [0, 4, -3 - sw * 0.3, -18, 1 - sw, -34]);
  for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + (i - 2.5) * 0.62; c.save(); c.translate(1 - sw, -34); c.rotate(an); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(10, -6, 20, 2); c.quadraticCurveTo(10, -1, 0, 0); c.fillStyle = '#2f8a80'; c.fill(); c.restore(); }
  c.restore(); c.restore();
  shimmer(c, a, 50, -40, 40);
}
function drawMirageDome(c, a) {
  c.save(); c.scale(1.2, 1.2); c.globalAlpha = 0.85;
  c.fillStyle = '#f9fbf6'; c.fillRect(-22, -8, 44, 14); c.beginPath(); c.arc(0, -8, 16, Math.PI, 0); c.fill();
  c.fillStyle = '#9fcfc8'; c.fillRect(8, -8, 14, 14); c.beginPath(); c.moveTo(0, -24); c.arc(0, -8, 16, -Math.PI / 2, 0); c.lineTo(0, -8); c.closePath(); c.fill();
  c.fillStyle = '#3f8a82'; c.fillRect(-4, -2, 8, 8); c.fillRect(-1, -30, 2, 7); circ(c, 0, -31, 2, '#7fbfb6');
  c.fillStyle = '#d4ece6'; c.fillRect(-22, 2, 44, 4);
  c.globalAlpha = 0.35; c.save(); c.scale(1, -0.6); c.translate(0, -22);
  c.fillStyle = '#f9fbf6'; c.fillRect(-22, -8, 44, 14); c.beginPath(); c.arc(0, -8, 16, Math.PI, 0); c.fill();
  c.restore(); c.restore();
  shimmer(c, a, 60, -32, 30);
}
function drawDjeridCamel(c, a) {
  dromedary(c, a, { body: '#c08a58', far: '#8a5f3a', leg: '#a8754a', deco: (c) => {
    poly(c, [-22, -30, 14, -30, 18, -6, -26, -6], '#2d6c9a'); c.fillStyle = '#f3e3c3'; c.fillRect(-24, -20, 42, 3); c.fillStyle = '#e8c04a'; c.fillRect(-25, -12, 43, 3);
    rr(c, -8, -40, 12, 11, 3); c.fillStyle = '#c4553b'; c.fill();
  } });
}
function drawJerboa(c, a) {
  c.save(); c.translate(4, 6);
  c.strokeStyle = '#c69a62'; c.lineWidth = 1.6; c.lineCap = 'round'; c.beginPath(); c.moveTo(-8, 4); c.quadraticCurveTo(-24, 6, -30, -4); c.stroke();
  ell(c, -31, -6, 3.5, 2.4, '#2a1d17'); ell(c, -33.5, -7, 2, 1.6, '#fff8ea');
  c.beginPath(); c.moveTo(-6, 4); c.lineTo(-2, 16); c.lineTo(10, 18); c.lineTo(10, 15); c.lineTo(2, 13); c.lineTo(4, 4); c.closePath(); c.fillStyle = '#d9b07a'; c.fill();
  ell(c, 0, 0, 11, 10, '#e2c08c'); ell(c, 2, 4, 7, 6, '#fff3dc');
  ell(c, 8, -16, 3.5, 10, '#e2c08c', 0.35); ell(c, 8, -16, 1.8, 7, '#f0b0a6', 0.35);
  circ(c, 12, -6, 7.5, '#e2c08c'); circ(c, 14, -7, 2.6, '#2a1d17'); circ(c, 15, -8, 0.8, '#fff'); circ(c, 19.4, -4, 1.2, '#f08a8a');
  lineC(c, '#d9b07a', 1.6, [8, 4, 12, 8]);
  c.restore();
}
function drawVintageCar(c, a) {
  const k = Math.sin(a.t * 18) * 0.3 * a.live;
  c.save(); c.translate(0, 2 + k);
  rr(c, -58, -14, 8, 22, 4); c.fillStyle = '#1f2a30'; c.fill();
  c.beginPath(); c.moveTo(-52, 12); c.lineTo(-52, -6); c.quadraticCurveTo(-50, -12, -40, -12); c.lineTo(-10, -12); c.lineTo(-2, -26); c.lineTo(10, -26); c.lineTo(6, -12); c.lineTo(46, -10); c.quadraticCurveTo(56, -8, 58, 2); c.lineTo(58, 12); c.closePath(); c.fillStyle = '#2d5c66'; c.fill();
  c.fillStyle = '#c4553b'; c.fillRect(-52, -2, 110, 4);
  rr(c, -44, -24, 30, 12, 6); c.fillStyle = '#f3e3c3'; c.fill();
  rr(c, -40, -36, 20, 12, 2); c.fillStyle = '#c4553b'; c.fill(); c.fillStyle = '#e9b36b'; c.fillRect(-36, -32, 6, 4);
  lineC(c, '#1f2a30', 1.6, [-2, -26, -6, -12]);
  c.fillStyle = '#bfe3e8'; poly(c, [0, -24, 8, -24, 5, -13, -3, -13], '#bfe3e8');
  rr(c, 52, -8, 6, 12, 2); c.fillStyle = '#f3e3c3'; c.fill();
  [-34, 36].forEach((x) => { c.beginPath(); c.arc(x, 12, 17, Math.PI, 0); c.fillStyle = '#1f3d44'; c.fill(); circ(c, x, 14, 12, '#1f2a30'); circ(c, x, 14, 6.5, '#f3e3c3'); circ(c, x, 14, 2.4, '#c4553b'); });
  c.fillStyle = '#1f3d44'; c.fillRect(-18, 18, 38, 3);
  c.restore();
}
function drawBorne(c) {
  c.save(); c.translate(0, 2);
  c.beginPath(); c.moveTo(-18, 28); c.lineTo(-18, -10); c.arc(0, -10, 18, Math.PI, 0); c.lineTo(18, 28); c.closePath(); c.fillStyle = '#f8f6f0'; c.fill(); c.strokeStyle = '#c9c0b4'; c.lineWidth = 1.4; c.stroke();
  c.beginPath(); c.moveTo(-18, -10); c.arc(0, -10, 18, Math.PI, 0); c.closePath(); c.fillStyle = '#d23a2e'; c.fill();
  txt(c, LOCAL('TOZEUR'), 0, -4, `700 8px ${SERIF}`, '#1f2a30');
  txt(c, '37', 0, 12, `700 15px ${SERIF}`, '#1f2a30');
  c.restore();
}
function drawTeaSign(c) {
  c.fillStyle = '#5a3a22'; c.fillRect(-36, 4, 5, 30); c.fillRect(31, 4, 5, 30);
  rr(c, -46, -32, 92, 40, 5); c.fillStyle = '#2d6c9a'; c.fill(); c.strokeStyle = '#f3e3c3'; c.lineWidth = 2; c.stroke();
  c.save(); c.translate(-28, -12); c.scale(0.42, 0.42); drawTeapot(c); c.restore();
  txt(c, T('薄荷茶', 'MINT TEA'), 8, -12, T(`700 15px "Noto Serif TC", serif`, `700 13px ${SERIF}`), '#f3e3c3');
}

/* ===== 7-9 Sandstorm (Bodélé Depression, Chad) ===== */
function bgBodele(c) {
  posterOpen(c);
  skyBands(c, ['#ecc48c', '#e6b77a', '#dfa86a', '#d6995c', '#cc8b50'], 10, 50);
  c.globalAlpha = 0.55; circ(c, 268, 112, 30, '#f8e4b8'); c.globalAlpha = 1;
  c.strokeStyle = 'rgba(250,236,205,.45)'; c.lineWidth = 3; c.lineCap = 'round';
  [[30, 110, 1], [90, 170, 0.8], [150, 92, 1.1], [200, 200, 0.9], [20, 236, 1.2], [230, 150, 0.7]].forEach(([x, y, s]) => { c.beginPath(); c.moveTo(x, y); c.bezierCurveTo(x + 50 * s, y - 14 * s, x + 110 * s, y + 10 * s, x + 130 * s, y - 8 * s); c.arc(x + 122 * s, y - 8 * s, 8 * s, 0, -Math.PI * 1.2, true); c.stroke(); });
  dune(c, 250, 10, '#c7844c', 1.3, 55);
  // pale diatomite crust of the old lakebed
  [[60, 280, 40], [210, 296, 50]].forEach(([x, y, r]) => ell(c, x, y, r, r * 0.08, 'rgba(240,222,186,.45)'));
  dune(c, 352, 12, '#b9743f', 0.4, 60); dune(c, 430, 8, '#a96535', 2.1, 50);
  c.strokeStyle = 'rgba(250,236,205,.35)'; c.lineWidth = 1.4; for (let i = 0; i < 14; i++) { const x = hash(i) * 340, y = 260 + hash(i + 40) * 200; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 18 + hash(i + 9) * 24, y - 2); c.stroke(); }
  // washing line
  c.fillStyle = '#5a3a22'; c.fillRect(22, 136, 5, 104); c.fillRect(176, 136, 5, 104);
  lineC(c, '#3c2a1c', 1.4, [24, 142, 100, 148, 178, 142]);
  ell(c, 70, 458, 46, 8, '#b9743f'); foot(c, 114, 362, 56); foot(c, 290, 380, 30); foot(c, 286, 460, 28); foot(c, 180, 452, 16); foot(c, 252, 290, 64);
  posterClose(c, 'CHAD', T('查德 · 博德萊窪地 · 沙塵暴', 'BODÉLÉ DEPRESSION · DUST STORM'));
}
function ovStorm(c) { c.globalAlpha = 0.1; c.fillStyle = '#e6b77a'; c.fillRect(10, 10, W - 20, H - 20); }
function cloth(c, a, w, h, base, stripe, kind) {
  const fl = Math.sin(a.t * 7) * (0.4 + 0.6 * a.live);
  lineC(c, '#3c2a1c', 1.2, [-w / 2 - 4, -h / 2 + 1, w / 2 + 4, -h / 2 + 1]);
  c.beginPath(); c.moveTo(-w / 2, -h / 2 + 2); c.lineTo(w / 2, -h / 2 + 2);
  for (let i = 0; i <= 6; i++) { const x = w / 2 - i * w / 6; c.lineTo(x + 3 + fl * 3, h / 2 - 6 + Math.sin(a.t * 9 + i) * 2 * (0.4 + 0.6 * a.live)); }
  c.closePath(); c.fillStyle = base; c.fill();
  c.fillStyle = stripe;
  if (kind === 'stripes') for (let y = -h / 2 + 10; y < h / 2 - 8; y += 10) c.fillRect(-w / 2 + 1, y, w - 2, 3);
  else { c.fillRect(-w / 2 + 6, -h / 2 + 6, 4, h - 16); c.fillRect(w / 2 - 10, -h / 2 + 6, 4, h - 16); }
  [-w / 2 + 8, w / 2 - 8].forEach((x) => { rr(c, x - 2.5, -h / 2 - 3, 5, 9, 1.5); c.fillStyle = '#e9b36b'; c.fill(); });
}
function drawIndigo(c, a) { cloth(c, a, 46, 58, '#2c3f7a', '#5d78b8', 'stripes'); }
function drawRedBlanket(c, a) { cloth(c, a, 48, 58, '#c4553b', '#f3e3c3', 'edges'); }
function drawStormCamel(c, a) {
  dromedary(c, a, { body: '#74462a', far: '#4e2f1a', leg: '#5f3920', walk: 0.5, deco: (c) => {
    const f = Math.sin(a.t * 8) * a.live;
    poly(c, [-22, -30, 14, -30, 18, -6, -26, -6], '#5a3a6a'); c.fillStyle = '#e9b36b'; c.fillRect(-24, -16, 42, 3);
    poly(c, [34, -4, 46, -12, 48, -4, 36, 4], '#c4553b');
    poly(c, [36, -2, 24 - f * 3, 2, 18 - f * 4, -2, 30, -8], '#c4553b');
    lineC(c, '#3c2a1c', 1.5, [48, -40, 64, -40]);
    circ(c, 54, -41, 4.2, '#3c2a1c'); circ(c, 54, -41, 2.8, '#9fd0d8'); circ(c, 53, -42, 0.9, '#fff');
  } });
}
function drawSandCat(c, a) {
  const tw = Math.sin(a.t * 3) * a.live, fur = '#e6c793', dk = '#b98f5a', cream = '#fbefd6';
  c.save(); c.translate(0, 4);
  c.save(); c.translate(10, 24); c.rotate(-0.3 + tw * 0.15); rr(c, 0, -3, 26, 7, 3.5); c.fillStyle = fur; c.fill(); c.fillStyle = '#2a1d17'; c.fillRect(20, -3, 6, 7); c.fillRect(13, -3, 3, 7); c.restore();
  ell(c, 0, 14, 16, 17, fur); ell(c, 0, 18, 9, 12, cream);
  c.fillStyle = dk; c.fillRect(-12, 24, 6, 2); c.fillRect(6, 24, 6, 2);
  ell(c, -6, 30, 5, 3, cream); ell(c, 6, 30, 5, 3, cream);
  [-1, 1].forEach((s) => { c.save(); c.translate(s * 13, -14); c.rotate(s * (0.7 - tw * 0.05)); poly(c, [-7, 3, 0, -12, 7, 3], fur); poly(c, [-4, 2, 0, -7, 4, 2], '#e8a99e'); c.restore(); });
  ell(c, 0, -8, 17, 12, fur); ell(c, 0, -3, 8, 5, cream);
  [-6, 6].forEach((x) => { ell(c, x, -10, 3, 3.4, '#5a7a3a'); ell(c, x, -10, 1.1, 2.8, '#1f2a30'); });
  poly(c, [-2, -5, 2, -5, 0, -3], '#d77a72');
  c.strokeStyle = dk; c.lineWidth = 1; [[-7, -18], [7, -18]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x - 3, y); c.lineTo(x + 3, y + 1); c.stroke(); });
  c.restore();
}
function drawStormTent(c, a) {
  const fl = Math.sin(a.t * 6) * a.live;
  c.save(); c.translate(0, 4);
  lineC(c, '#3c2a1c', 1.2, [-30, -24, -62, 30]); lineC(c, '#3c2a1c', 1.2, [30, -24, 62, 30]);
  c.fillStyle = '#3c2a1c'; c.fillRect(-64, 26, 4, 6); c.fillRect(60, 26, 4, 6);
  c.beginPath(); c.moveTo(-54, 30); c.lineTo(-30, -26); c.lineTo(30, -26); c.lineTo(54, 30); c.closePath(); c.fillStyle = '#e9b36b'; c.fill();
  c.beginPath(); c.moveTo(30, -26); c.lineTo(54, 30); c.lineTo(20, 30); c.lineTo(16, -26); c.closePath(); c.fillStyle = '#c98a4a'; c.fill();
  c.fillStyle = '#c4553b'; c.fillRect(-42, 4, 88, 5);
  c.beginPath(); c.moveTo(-12, 30); c.lineTo(-6, -4); c.lineTo(6, -4); c.lineTo(12, 30); c.closePath(); c.fillStyle = '#3c2a1c'; c.fill();
  poly(c, [6, -4, 12, 30, 20 + fl * 2, 28], '#d8a058');
  lineC(c, '#3c2a1c', 1.6, [0, -26, 0, -36]); poly(c, [0, -36, 14 + fl * 2, -33, 0, -30], '#2d5c66');
  c.restore();
}
function drawWellSign(c) {
  c.fillStyle = '#5a3a22'; c.fillRect(-3, -8, 6, 44);
  poly(c, [-46, -32, 36, -32, 50, -18, 36, -4, -46, -4], '#2d5c66'); c.strokeStyle = '#f3e3c3'; c.lineWidth = 1.6; c.stroke();
  txt(c, T('水井 3 公里', 'WELL  3 KM'), -4, -18, T(`700 13px "Noto Serif TC", serif`, `700 12px ${SERIF}`), '#f3e3c3');
  poly(c, [-20, 36, 0, 26, 24, 36], '#c98a4a');
}
function drawStormLantern(c, a) { lanternM(c, a, { stand: true, glass: '#9fd0d8', brass: '#b88a40', ph: 1 }); }
function drawWaterDrum(c) {
  c.save(); c.translate(0, 2);
  rr(c, -22, -26, 44, 52, 4); c.fillStyle = '#2d5c66'; c.fill();
  c.fillStyle = '#1f3d44'; c.fillRect(-22, -14, 44, 3); c.fillRect(-22, 10, 44, 3); c.fillRect(8, -26, 12, 52);
  ell(c, 0, -26, 22, 4, '#3f7a84'); circ(c, 10, -26, 2.4, '#1f3d44');
  txt(c, T('水', 'H₂O'), -4, -1, T(`900 15px "Noto Sans TC", sans-serif`, `700 12px ${SERIF}`), '#f3e3c3');
  c.restore();
}

/* ===== 7-10 Wadi Rum (Jordan), the finale ===== */
function bgRum(c) {
  posterOpen(c);
  skyBands(c, ['#2c2244', '#3c2a52', '#56325c', '#7a3f63', '#a24f68', '#c9677a', '#e88a6e'], 10, 34);
  starField(c, 50, 10, 10, W - 20, 120, '#f6ecd0', 5);
  circ(c, 214, 96, 15, '#fbeccb'); circ(c, 221, 91, 13.5, '#56325c');
  // jebels: sandstone mountains with melting tops
  const jebel = (pts, col, lines) => { c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 6) c.bezierCurveTo(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5]); c.closePath(); c.fillStyle = col; c.fill();
    c.strokeStyle = lines; c.lineWidth = 1.4; };
  jebel([0, 270, 0, 140, 20, 120, 40, 126, 60, 100, 90, 110, 100, 150, 120, 170, 130, 270, 130, 270, 130, 270, 0, 270], '#7a3a3f', '#5d2b36');
  jebel([230, 270, 236, 170, 250, 150, 262, 156, 280, 120, 320, 116, 330, 140, 350, 150, 360, 170, 360, 270, 360, 270, 230, 270], '#6b3240', '#5d2b36');
  c.strokeStyle = 'rgba(40,10,20,.3)'; c.lineWidth = 1.4;
  for (let x = 12; x < 128; x += 10) { c.beginPath(); c.moveTo(x, 150 + hash(x) * 20); c.lineTo(x + 2, 268); c.stroke(); }
  for (let x = 244; x < 356; x += 10) { c.beginPath(); c.moveTo(x, 150 + hash(x) * 20); c.lineTo(x - 2, 268); c.stroke(); }
  // a rock bridge on the far ridge
  c.fillStyle = '#8c4548'; c.beginPath(); c.moveTo(140, 270); c.lineTo(150, 218); c.quadraticCurveTo(180, 200, 214, 214); c.lineTo(226, 270); c.lineTo(206, 270); c.quadraticCurveTo(200, 230, 186, 230); c.quadraticCurveTo(166, 230, 162, 270); c.closePath(); c.fill();
  c.fillStyle = '#e07a4f'; c.fillRect(0, 266, W, H);
  dune(c, 300, 8, '#d9663f', 1.4, 60); dune(c, 370, 10, '#cf5a37', 0.4, 55); dune(c, 440, 6, '#c4553b', 2.2, 45);
  // camp: lantern rope between two poles, and a rug for the coffee
  c.fillStyle = '#3c2a24'; c.fillRect(140, 224, 4, 92); c.fillRect(258, 224, 4, 92);
  lineC(c, '#3c2a24', 1.4, [142, 230, 200, 238, 260, 230]);
  poly(c, [208, 456, 290, 456, 300, 470, 198, 470], '#2d5c66'); c.fillStyle = '#e9b36b'; c.fillRect(210, 461, 80, 2);
  foot(c, 278, 386, 54, 'rgba(80,20,20,.25)'); foot(c, 96, 440, 60, 'rgba(80,20,20,.25)'); foot(c, 70, 336, 26, 'rgba(80,20,20,.25)');
  posterClose(c, 'WADI RUM', T('約旦 · 月亮谷', 'JORDAN · VALLEY OF THE MOON'), '#f3e3c3');
}
function drawBalloon(c) {
  c.save(); c.translate(0, 2);
  c.save(); c.beginPath(); c.moveTo(-10, 26); c.bezierCurveTo(-42, 2, -38, -42, 0, -42); c.bezierCurveTo(38, -42, 42, 2, 10, 26); c.closePath(); c.clip();
  c.fillStyle = '#f3e3c3'; c.fillRect(-40, -44, 80, 72);
  [['#c4553b', -26], ['#2d5c66', -8], ['#c4553b', 10], ['#e9b36b', 28]].forEach(([col, x]) => ell(c, x, -8, 7, 40, col));
  c.fillStyle = 'rgba(60,20,30,.18)'; c.fillRect(14, -44, 30, 72);
  c.restore();
  poly(c, [-10, 26, 10, 26, 7, 33, -7, 33], '#6b3a2a');
  lineC(c, '#3c2a24', 1, [-7, 33, -12, 42]); lineC(c, '#3c2a24', 1, [7, 33, 12, 42]);
  c.restore();
}
function drawBasket(c) {
  lineC(c, '#3c2a24', 1, [-12, -19, -16, -6]); lineC(c, '#3c2a24', 1, [12, -19, 16, -6]);
  rr(c, -20, -6, 40, 22, 3); c.fillStyle = '#b07a3c'; c.fill();
  c.strokeStyle = '#8a5a2a'; c.lineWidth = 1; for (let y = 0; y < 16; y += 4) { c.beginPath(); c.moveTo(-20, y); c.lineTo(20, y); c.stroke(); }
  c.fillStyle = '#5a3a22'; c.fillRect(-22, -8, 44, 4);
  circ(c, 6, -12, 4, '#f3d2b0'); c.fillStyle = '#c4553b'; c.fillRect(1, -10, 10, 3); lineC(c, '#f3d2b0', 2, [10, -12, 15, -17]);
}
function drawFalcon(c, a) {
  const bob = Math.sin(a.t * 2.6) * a.live, sl = '#7a6a5e', dk = '#4a3e36';
  c.save(); c.translate(0, 2);
  c.fillStyle = '#6b4a2b'; c.fillRect(-4, 18, 8, 22); rr(c, -14, 12, 28, 8, 3); c.fillStyle = '#2d5c66'; c.fill();
  lineC(c, '#e9b36b', 2, [-4, 8, -4, 13]); lineC(c, '#e9b36b', 2, [4, 8, 4, 13]);
  poly(c, [-6, 4, -20, 22, -14, 24, 2, 8], dk);
  ell(c, 0, -4, 12, 16, sl, 0.25); ell(c, 4, -2, 7, 12, '#efe2c8', 0.2);
  c.strokeStyle = dk; c.lineWidth = 1; [[2, -6], [6, -1], [3, 4], [7, 7]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x - 1.5, y); c.lineTo(x + 1.5, y); c.stroke(); });
  ell(c, -6, 0, 8, 16, dk, 0.3);
  c.save(); c.translate(4, -22 + bob);
  circ(c, 0, 0, 9, sl); ell(c, 2, 3, 5, 5, '#efe2c8'); poly(c, [-1, 0, 1, 9, 4, 1], dk);
  circ(c, 3, -2, 3, '#f2d36a'); circ(c, 3, -2, 1.8, '#1f2a30');
  c.beginPath(); c.moveTo(7, -3); c.quadraticCurveTo(14, -2, 11, 4); c.lineTo(8, 1); c.closePath(); c.fillStyle = '#3c3c3c'; c.fill();
  c.restore();
  c.restore();
}
function drawRumSign(c) {
  c.fillStyle = '#5a3a22'; c.fillRect(-3, -10, 6, 46);
  rr(c, -52, -36, 104, 38, 4); c.fillStyle = '#f3e3c3'; c.fill(); c.strokeStyle = '#7a3a3f'; c.lineWidth = 2; c.stroke();
  txt(c, T('月亮谷', 'WADI RUM'), 0, -24, T(`700 15px "Noto Serif TC", serif`, `italic 700 15px ${SERIF}`), '#7a3a3f');
  txt(c, T('保護區 →', 'PROTECTED AREA →'), 0, -8, T(`700 9px "Noto Sans TC", sans-serif`, `700 8px ${SERIF}`), '#c4553b');
}
function drawRumLantern(c, a) { lanternM(c, a, { glass: '#ffcf6a', ph: 0.5 }); }
function drawRumLantern2(c, a) { lanternM(c, a, { glass: '#f28a5a', ph: 2.5 }); }
function drawRumCamel(c, a) {
  dromedary(c, a, { body: '#c08a58', far: '#8a5f3a', leg: '#a8754a', walk: 0.6, deco: (c) => {
    poly(c, [-22, -30, 14, -30, 18, -6, -26, -6], '#c4553b'); c.fillStyle = '#1f2a30'; for (let x = -22; x < 16; x += 8) c.fillRect(x, -24, 4, 14);
    c.fillStyle = '#f3e3c3'; c.fillRect(-25, -8, 43, 3);
    [-22, -12, -2, 8].forEach((x) => { lineC(c, '#e9b36b', 1.6, [x, -6, x, 0]); circ(c, x, 1, 2, '#c4553b'); });
  } });
}
function drawTruck(c, a) {
  const k = Math.sin(a.t * 16) * 0.3 * a.live;
  c.save(); c.translate(0, 4 + k);
  c.fillStyle = '#e8e2d4'; c.beginPath(); c.moveTo(-60, 10); c.lineTo(-60, -8); c.lineTo(10, -8); c.lineTo(14, -30); c.lineTo(40, -30); c.lineTo(50, -12); c.lineTo(62, -10); c.lineTo(62, 10); c.closePath(); c.fill();
  c.fillStyle = '#bfe3e8'; poly(c, [18, -27, 38, -27, 45, -13, 16, -13], '#bfe3e8'); c.fillStyle = '#e8e2d4'; c.fillRect(29, -27, 3, 14);
  c.fillStyle = '#2d5c66'; c.fillRect(-60, -2, 122, 4);
  c.fillStyle = '#c4553b'; c.fillRect(-56, -22, 4, 14); c.fillRect(-8, -22, 4, 14); c.fillRect(-56, -24, 52, 3);
  rr(c, -50, -16, 40, 6, 2); c.fillStyle = '#7a3a3f'; c.fill();
  rr(c, 58, -8, 5, 6, 1.5); c.fillStyle = '#f6d27a'; c.fill();
  [-38, 38].forEach((x) => { c.beginPath(); c.arc(x, 10, 16, Math.PI, 0); c.fillStyle = '#9e9686'; c.fill(); circ(c, x, 12, 12, '#1f2a30'); circ(c, x, 12, 5, '#c9c3b6'); });
  c.restore();
}
function drawDallah(c) {
  c.save(); c.translate(-2, 4);
  const b = '#d9a441', dk = '#a8762a', lt = '#f2cd7a';
  c.strokeStyle = dk; c.lineWidth = 3; c.beginPath(); c.moveTo(-10, -14); c.quadraticCurveTo(-24, -6, -12, 14); c.stroke();
  c.strokeStyle = b; c.lineWidth = 4; c.beginPath(); c.moveTo(8, 2); c.quadraticCurveTo(18, -4, 18, -18); c.quadraticCurveTo(20, -26, 28, -26); c.stroke();
  poly(c, [26, -29, 32, -26, 26, -23], dk);
  c.beginPath(); c.moveTo(-12, 26); c.bezierCurveTo(-16, 12, -12, 4, -6, 2); c.lineTo(-5, -12); c.lineTo(5, -12); c.lineTo(6, 2); c.bezierCurveTo(12, 4, 16, 12, 12, 26); c.closePath(); c.fillStyle = b; c.fill();
  c.fillStyle = lt; c.fillRect(-8, 6, 3, 16); c.fillStyle = dk; c.fillRect(-14, 24, 28, 4); c.fillRect(-7, 1, 14, 2.5);
  poly(c, [-7, -12, 0, -22, 7, -12], b); c.fillStyle = dk; c.fillRect(-8, -13, 16, 2);
  poly(c, [-2, -22, 0, -32, 2, -22], dk); circ(c, 0, -32, 2.2, b);
  c.restore();
}

defineChapter({
  key: 'desert', order: 7,
  name: { zh: "沙漠綠洲", en: "Desert Oasis" },
  blurb: { zh: "復古旅行海報裡的沙漠。小心，倒影本來就是倒的。", en: "A desert from a vintage travel poster. Careful: reflections are upside down." },
  style: { zh: "復古海報", en: "Retro poster" },
  narrator: { zh: "駱駝", en: "Camel" },
  song: 'desert',
    comments: {
      far: [{ zh: ["沙塵暴！", "金字塔快被吹倒了，駱駝嚼草嚼到忘記吞。"], en: ["Sandstorm!", "The pyramid nearly blew over. Camel forgot to swallow."] }, { zh: ["迷路了…", "海市蜃樓都看不下去，自己先消失了。"], en: ["Lost…", "Even the mirage gave up and vanished."] }],
      close: [{ zh: ["差一粒沙", "再一下下，綠洲就在前面了！"], en: ["One grain off", "A moment more. The oasis is right ahead!"] }, { zh: ["快到開羅了", "路牌說：只剩最後 1 公里！"], en: ["Almost in Cairo", "The sign says: only 1 km to go!"] }],
      pass: [{ zh: ["抵達綠洲！", "勉強過關，但棕櫚樹還在風中搖頭。"], en: ["Oasis reached!", "Cleared, but the palm tree is still shaking its head."] }, { zh: ["及格駱駝", "駱駝慢吞吞地說：嗯…可以…啦…"], en: ["Camel pass", "Camel drawls: hmm… it'll… do…"] }],
      good: [{ zh: ["海報級風景！", "整幅畫面整齊得可以印成旅遊海報。"], en: ["Poster-worthy!", "Neat enough to print as a travel poster."] }, { zh: ["沙漠嚮導", "駱駝願意免費載你一程。"], en: ["Desert guide", "Camel offers you a free ride."] }],
      perfect: [{ zh: ["完美金字塔♪", "一度都不差！法老都從金字塔裡探頭出來看。"], en: ["Perfect pyramid♪", "Not one degree off! The pharaoh peeks out to see."] }, { zh: ["倒影大師", "你連倒影都轉對了，沙漠為你颳起一陣掌聲。"], en: ["Mirage master", "You even got the reflection right. The desert applauds."] }],
    },
  stages: [
    { key: 'desert', title: { zh: "金字塔", en: "Pyramids" }, place: { zh: "埃及 吉薩", en: "Giza, Egypt" },
      intro: { zh: "駱駝會一直嚼東西。還有：倒影本來就是倒著的。", en: "Camel never stops chewing. And: a reflection is supposed to be upside down." },
      bg: bgDesert, animated: true,
      objects: [
      { id: 'cairo', name: { zh: '路牌', en: 'Road sign' }, x: 85, y: 175, w: 110, h: 70, mag: 9, draw: drawCairo, sfx: 'wood' },
      { id: 'palm', name: { zh: '棕櫚樹', en: 'Palm tree' }, x: 305, y: 230, w: 80, h: 120, mag: 8, draw: drawPalm, sfx: 'boing' },
      { id: 'pyramid', name: { zh: '金字塔', en: 'Pyramid' }, x: 140, y: 290, w: 140, h: 100, near: true, draw: drawPyramid, sfx: 'bell' },
      { id: 'camel', name: { zh: '駱駝', en: 'Camel' }, x: 275, y: 360, w: 100, h: 80, mag: 11, draw: drawCamel, habit: (t, l) => ({ dx: Math.sin(t * 1.5) * 3 * l }), call: 'camel' },
      { id: 'tent', name: { zh: '帳篷', en: 'Tent' }, x: 80, y: 395, w: 100, h: 64, mag: 12, draw: drawTent, sfx: 'boing' },
      { id: 'mirage', name: { zh: '海市蜃樓', en: 'Mirage' }, x: 205, y: 442, w: 110, h: 50, mag: 9, target: 180, draw: drawMirage, sfx: 'shimmer' }
      ] },
    { key: 'desert-caravan', title: { zh: '駱駝商隊', en: 'Camel Caravan' }, place: { zh: '摩洛哥 札哥拉', en: 'Zagora, Morocco' },
      intro: { zh: '札哥拉的老路牌說：騎駱駝到廷巴克圖要 52 天。小駱駝緊跟著媽媽。', en: "Zagora's old sign says Timbuktu is 52 days away by camel. The calf sticks close to mum." },
      bg: bgZagora, animated: true,
      objects: [
      { id: 'sign', name: { zh: '老路牌', en: 'Timbuktu sign' }, x: 84, y: 214, w: 118, h: 96, mag: 9, draw: drawTimbuktu, sfx: 'wood' },
      { id: 'camel', name: { zh: '駱駝媽媽', en: 'Mother camel' }, x: 236, y: 318, w: 126, h: 96, mag: 12, draw: drawCaravanCamel, habit: (t, l) => ({ dx: Math.sin(t * 1.5) * 3 * l }), call: 'camel' },
      { id: 'calf', name: { zh: '小駱駝', en: 'Camel calf' }, x: 96, y: 386, w: 82, h: 64, mag: 14, draw: drawCalf, habit: (t, l) => ({ dx: Math.sin(t * 2) * 2.5 * l }), call: 'desert_calf' },
      { id: 'well', name: { zh: '水井', en: 'Well' }, x: 282, y: 424, w: 90, h: 80, near: true, draw: drawWell, sfx: 'clunk' },
      ] },
    { key: 'desert-market', title: { zh: '綠洲市集', en: 'Oasis Market' }, place: { zh: '埃及 錫瓦綠洲', en: 'Siwa Oasis, Egypt' },
      intro: { zh: '錫瓦綠洲的椰棗和橄欖最有名。驢子馱著貨，燈籠一閃一閃。', en: 'Siwa is famous for its dates and olives. Donkeys haul the goods; lanterns twinkle.' },
      bg: bgSiwa, animated: true,
      objects: [
      { id: 'lantern', name: { zh: '銅燈籠', en: 'Brass lantern' }, x: 58, y: 170, w: 34, h: 66, near: true, draw: drawSiwaLantern, sfx: 'desert_lantern' },
      { id: 'sign', name: { zh: '攤位招牌', en: 'Stall sign' }, x: 146, y: 156, w: 108, h: 52, mag: 11, draw: drawStallSign, sfx: 'wood' },
      { id: 'rug', name: { zh: '掛毯', en: 'Rug' }, x: 286, y: 260, w: 88, h: 114, mag: 8, draw: drawSiwaRug, sfx: 'desert_rug' },
      { id: 'pots', name: { zh: '陶罐', en: 'Clay pots' }, x: 82, y: 382, w: 96, h: 86, mag: 6, draw: drawPots, sfx: 'desert_pot' },
      { id: 'donkey', name: { zh: '驢子', en: 'Donkey' }, x: 236, y: 392, w: 128, h: 92, mag: 13, draw: drawDonkey, habit: (t, l) => ({ dx: Math.sin(t * 1.3) * 2 * l }), call: 'desert_donkey' },
      ] },
    { key: 'desert-dunes', title: { zh: '沙丘夕陽', en: 'Dune Sunset' }, place: { zh: '摩洛哥 切比沙丘', en: 'Erg Chebbi, Morocco' },
      intro: { zh: '切比沙丘高達 150 公尺。商隊駱駝一隻牽一隻：轉動領頭的，後面那隻也會跟著轉。', en: "Erg Chebbi's dunes rise up to 150 m. Caravan camels walk tied in a line: turn the leader and the other follows." },
      bg: bgMerzouga, animated: true,
      objects: [
      { id: 'lead', name: { zh: '領頭駱駝', en: 'Lead camel' }, x: 240, y: 228, w: 86, h: 66, mag: 10, draw: drawLeadCamel, habit: (t, l) => ({ dx: Math.sin(t * 1.4) * 2 * l }), call: 'camel', link: { to: 'follow', k: 0.5 } },
      { id: 'follow', name: { zh: '跟班駱駝', en: 'Second camel' }, x: 130, y: 238, w: 82, h: 62, mag: 7, draw: drawFollowCamel, habit: (t, l) => ({ dx: Math.sin(t * 1.4 - 0.6) * 2 * l }), call: 'desert_calf' },
      { id: 'fennec', name: { zh: '耳廓狐', en: 'Fennec fox' }, x: 80, y: 376, w: 60, h: 86, mag: 13, draw: fennec, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 3)) * 2 * l }), call: 'desert_fennec' },
      { id: 'teapot', name: { zh: '薄荷茶壺', en: 'Teapot' }, x: 196, y: 410, w: 58, h: 54, near: true, draw: drawTeapot, sfx: 'bell' },
      { id: 'scarab', name: { zh: '聖甲蟲', en: 'Scarab beetle' }, x: 298, y: 438, w: 50, h: 44, mag: 8, draw: drawScarab, habit: (t, l) => ({ dx: Math.sin(t * 2.2) * 4 * l }), call: 'desert_scarab' },
      ] },
    { key: 'desert-cactus', title: { zh: '仙人掌荒野', en: 'Cactus Country' }, place: { zh: '美國 亞利桑那州', en: 'Sonoran Desert, Arizona' },
      intro: { zh: '巨人柱仙人掌只長在索諾拉沙漠。吉拉啄木鳥會在仙人掌上鑿洞築巢。', en: 'Saguaros grow only in the Sonoran Desert. Gila woodpeckers carve their nests in them.' },
      bg: bgArizona, animated: true,
      objects: [
      { id: 'woodpecker', name: { zh: '吉拉啄木鳥', en: 'Gila woodpecker' }, x: 46, y: 214, w: 56, h: 34, trap: true, keep: -80, draw: drawWoodpecker,
        trapNote: { zh: '啄木鳥本來就是直直攀在樹幹上，靠硬尾羽撐住！', en: 'Woodpeckers really do cling upright to trunks, propped on their stiff tails!' } },
      { id: 'sign', name: { zh: '公園路牌', en: 'Park sign' }, x: 172, y: 212, w: 118, h: 80, near: true, draw: drawParkSign, sfx: 'wood' },
      { id: 'saguaro', name: { zh: '巨人柱', en: 'Saguaro' }, x: 300, y: 238, w: 76, h: 170, mag: 6, draw: drawSaguaro, sfx: 'boing' },
      { id: 'roadrunner', name: { zh: '走鵑', en: 'Roadrunner' }, x: 152, y: 316, w: 96, h: 62, mag: 12, draw: drawRoadrunner, habit: (t, l) => ({ dx: Math.sin(t * 2.6) * 5 * l }), call: 'desert_roadrunner' },
      { id: 'gateL', name: { zh: '左柵門', en: 'Left gate' }, x: 98, y: 420, w: 72, h: 46, mag: 11, draw: drawGateL, sfx: 'wood', link: { to: 'gateR', k: 0.6 } },
      { id: 'gateR', name: { zh: '右柵門', en: 'Right gate' }, x: 166, y: 420, w: 72, h: 46, mag: 7, draw: drawGateR, sfx: 'clunk' },
      { id: 'tortoise', name: { zh: '沙漠龜', en: 'Desert tortoise' }, x: 294, y: 424, w: 82, h: 46, mag: 9, draw: drawTortoise, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 2 * l }), call: 'turtle' },
      ] },
    { key: 'desert-petra', title: { zh: '佩特拉古城', en: 'Petra' }, place: { zh: '約旦 佩特拉', en: 'Petra, Jordan' },
      intro: { zh: '寶庫是直接從玫瑰色砂岩山壁雕出來的。藍色蜥蜴一直在做伏地挺身。', en: 'The Treasury was carved straight out of the rose-red cliff. The blue lizard keeps doing push-ups.' },
      bg: bgPetra, animated: true,
      objects: [
      { id: 'rugL', name: { zh: '紅掛毯', en: 'Red rug' }, x: 54, y: 298, w: 52, h: 76, mag: 7, draw: drawRugL, sfx: 'desert_rug', link: { to: 'rugR', k: 0.7 } },
      { id: 'rugR', name: { zh: '藍掛毯', en: 'Blue rug' }, x: 116, y: 298, w: 52, h: 76, mag: 10, draw: drawRugR, sfx: 'desert_rug' },
      { id: 'lizard', name: { zh: '西奈鬣蜥', en: 'Sinai agama' }, x: 304, y: 292, w: 76, h: 36, mag: 12, draw: drawAgama, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 2 * l }), call: 'desert_lizard' },
      { id: 'sign', name: { zh: '指路牌', en: 'Signpost' }, x: 66, y: 404, w: 100, h: 70, near: true, draw: drawPetraSign, sfx: 'wood' },
      { id: 'bottle', name: { zh: '沙畫瓶', en: 'Sand bottle' }, x: 166, y: 418, w: 38, h: 64, near: true, draw: drawSandBottle, sfx: 'desert_sand' },
      { id: 'camel', name: { zh: '駱駝', en: 'Camel' }, x: 266, y: 412, w: 126, h: 66, mag: 9, draw: drawPetraCamel, habit: (t, l) => ({ dy: Math.sin(t * 1.2) * 1 * l }), call: 'camel' },
      ] },
    { key: 'desert-stars', title: { zh: '撒哈拉星空', en: 'Sahara Stars' }, place: { zh: '埃及 白沙漠', en: 'White Desert, Egypt' },
      intro: { zh: '白沙漠的石灰岩被風雕成大蘑菇。望遠鏡要對準星星喔。', en: "Wind has carved the White Desert's chalk into giant mushrooms. A telescope has to point at the stars." },
      bg: bgWhite, animated: true,
      objects: [
      { id: 'telescope', name: { zh: '望遠鏡', en: 'Telescope' }, x: 70, y: 232, w: 88, h: 24, trap: true, keep: -32, draw: drawTelescope,
        trapNote: { zh: '望遠鏡本來就要斜斜地對著天上的星星！', en: 'A telescope is meant to tilt up toward the stars!' } },
      { id: 'owl', name: { zh: '鵰鴞', en: 'Eagle-owl' }, x: 300, y: 196, w: 46, h: 64, mag: 7, draw: drawOwl, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 1.5 * l }), call: 'desert_owl' },
      { id: 'tent', name: { zh: '帳篷', en: 'Tent' }, x: 150, y: 330, w: 142, h: 70, mag: 6, draw: drawBlackTent, sfx: 'boing', link: { to: 'lamp', k: 0.5 } },
      { id: 'lamp', name: { zh: '帳篷燈', en: 'Tent lamp' }, x: 246, y: 316, w: 34, h: 64, mag: 9, draw: drawTentLamp, sfx: 'desert_lantern' },
      { id: 'camel', name: { zh: '睡駱駝', en: 'Sleepy camel' }, x: 96, y: 424, w: 126, h: 70, near: true, draw: drawSleepyCamel, habit: (t, l) => ({ dy: Math.sin(t * 1.2) * 1 * l }), call: 'camel' },
      { id: 'fennec', name: { zh: '耳廓狐', en: 'Fennec fox' }, x: 234, y: 420, w: 60, h: 86, mag: 11, draw: drawNightFennec, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 3)) * 2 * l }), call: 'desert_fennec' },
      { id: 'chart', name: { zh: '星座圖', en: 'Star chart' }, x: 310, y: 410, w: 66, h: 72, near: true, draw: drawStarChart, sfx: 'twinkle' },
      ] },
    { key: 'desert-mirage', title: { zh: '海市蜃樓', en: 'Mirage' }, place: { zh: '突尼西亞 傑里德鹽湖', en: 'Chott el Djerid, Tunisia' },
      intro: { zh: '鹽湖又平又亮，熱空氣常變出海市蜃樓。兩個幻影會一起晃。', en: 'The salt flat is flat and dazzling, and hot air conjures mirages. The two mirages wobble together.' },
      bg: bgDjerid, animated: true,
      objects: [
      { id: 'palm', name: { zh: '幻影棕櫚', en: 'Mirage palm' }, x: 70, y: 210, w: 56, h: 100, mag: 10, draw: drawMiragePalm, sfx: 'shimmer', link: { to: 'dome', k: 0.6 } },
      { id: 'dome', name: { zh: '幻影圓頂', en: 'Mirage dome' }, x: 252, y: 222, w: 62, h: 74, mag: 6, draw: drawMirageDome, sfx: 'shimmer' },
      { id: 'camel', name: { zh: '駱駝', en: 'Camel' }, x: 82, y: 318, w: 126, h: 96, mag: 8, draw: drawDjeridCamel, habit: (t, l) => ({ dx: Math.sin(t * 1.5) * 3 * l }), call: 'camel' },
      { id: 'car', name: { zh: '老爺車', en: 'Vintage car' }, x: 278, y: 318, w: 120, h: 64, mag: 5, draw: drawVintageCar, sfx: 'beep' },
      { id: 'jerboa', name: { zh: '跳鼠', en: 'Jerboa' }, x: 180, y: 430, w: 72, h: 52, mag: 12, draw: drawJerboa, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 3.2)) * 8 * l }), call: 'desert_jerboa' },
      { id: 'borne', name: { zh: '里程碑', en: 'Kilometre stone' }, x: 64, y: 428, w: 40, h: 62, near: true, draw: drawBorne, sfx: 'pop' },
      { id: 'tea', name: { zh: '茶攤招牌', en: 'Tea sign' }, x: 294, y: 424, w: 96, h: 70, near: true, draw: drawTeaSign, sfx: 'bell' },
      ] },
    { key: 'desert-storm', title: { zh: '沙塵暴', en: 'Sandstorm' }, place: { zh: '查德 博德萊窪地', en: 'Bodélé Depression, Chad' },
      intro: { zh: '博德萊窪地是地球上揚起最多沙塵的地方。曬衣繩上的兩塊布會一起被吹歪！', en: 'The Bodélé kicks up more dust than anywhere on Earth. The two cloths on the line swing together!' },
      bg: bgBodele, overlay: ovStorm, animated: true,
      objects: [
      { id: 'indigo', name: { zh: '藍布', en: 'Indigo cloth' }, x: 70, y: 180, w: 50, h: 62, mag: 8, draw: drawIndigo, sfx: 'desert_rug', link: { to: 'blanket', k: 0.7 } },
      { id: 'blanket', name: { zh: '紅毯', en: 'Red blanket' }, x: 134, y: 180, w: 52, h: 62, mag: 6, draw: drawRedBlanket, sfx: 'desert_rug' },
      { id: 'tent', name: { zh: '帳篷', en: 'Tent' }, x: 268, y: 248, w: 128, h: 72, mag: 5, draw: drawStormTent, sfx: 'boing' },
      { id: 'camel', name: { zh: '護目鏡駱駝', en: 'Goggled camel' }, x: 116, y: 316, w: 126, h: 96, mag: 9, draw: drawStormCamel, habit: (t, l) => ({ dx: Math.sin(t * 1.2) * 2 * l }), call: 'camel' },
      { id: 'sandcat', name: { zh: '沙貓', en: 'Sand cat' }, x: 290, y: 352, w: 62, h: 70, mag: 12, draw: drawSandCat, habit: (t, l) => ({ dx: Math.sin(t * 1.7) * 2 * l }), call: 'desert_sandcat' },
      { id: 'sign', name: { zh: '水井路牌', en: 'Well sign' }, x: 70, y: 420, w: 100, h: 72, near: true, draw: drawWellSign, sfx: 'wood' },
      { id: 'lantern', name: { zh: '提燈', en: 'Lantern' }, x: 180, y: 432, w: 34, h: 60, near: true, draw: drawStormLantern, sfx: 'desert_lantern' },
      { id: 'drum', name: { zh: '水桶', en: 'Water drum' }, x: 286, y: 434, w: 48, h: 58, mag: 10, draw: drawWaterDrum, sfx: 'clunk' },
      ] },
    { key: 'desert-rum', title: { zh: '月亮谷', en: 'Wadi Rum' }, place: { zh: '約旦 瓦地倫', en: 'Wadi Rum, Jordan' },
      intro: { zh: '紅沙和巨岩讓月亮谷看起來像火星，很多電影都在這裡拍火星。熱氣球連著吊籃，兩盞燈籠掛在同一條繩上。', en: 'Red sand and giant rocks make Wadi Rum look like Mars; films shoot their Mars scenes here. The basket hangs from the balloon, and the lanterns share one rope.' },
      bg: bgRum, animated: true,
      objects: [
      { id: 'balloon', name: { zh: '熱氣球', en: 'Hot-air balloon' }, x: 290, y: 108, w: 80, h: 90, mag: 9, draw: drawBalloon, sfx: 'boing', link: { to: 'basket', k: 0.8 } },
      { id: 'basket', name: { zh: '吊籃', en: 'Basket' }, x: 290, y: 174, w: 48, h: 40, mag: 5, draw: drawBasket, sfx: 'wood' },
      { id: 'falcon', name: { zh: '獵隼', en: 'Saker falcon' }, x: 70, y: 196, w: 50, h: 84, mag: 12, draw: drawFalcon, habit: (t, l) => ({ dy: Math.sin(t * 2) * 1.5 * l }), call: 'desert_falcon' },
      { id: 'lampL', name: { zh: '左燈籠', en: 'Left lantern' }, x: 176, y: 266, w: 34, h: 64, mag: 7, draw: drawRumLantern, sfx: 'desert_lantern', link: { to: 'lampR', k: 0.6 } },
      { id: 'lampR', name: { zh: '右燈籠', en: 'Right lantern' }, x: 226, y: 266, w: 34, h: 64, mag: 11, draw: drawRumLantern2, sfx: 'desert_lantern' },
      { id: 'sign', name: { zh: '月亮谷路牌', en: 'Wadi Rum sign' }, x: 74, y: 300, w: 106, h: 74, near: true, draw: drawRumSign, sfx: 'wood' },
      { id: 'camel', name: { zh: '駱駝', en: 'Camel' }, x: 280, y: 340, w: 126, h: 96, mag: 6, draw: drawRumCamel, habit: (t, l) => ({ dx: Math.sin(t * 1.3) * 2 * l }), call: 'camel' },
      { id: 'truck', name: { zh: '四驅車', en: '4×4 truck' }, x: 96, y: 410, w: 126, h: 64, mag: 8, draw: drawTruck, sfx: 'beep' },
      { id: 'dallah', name: { zh: '咖啡壺', en: 'Coffee pot' }, x: 248, y: 434, w: 52, h: 66, near: true, draw: drawDallah, sfx: 'bell' },
      ] },
  ],
});
