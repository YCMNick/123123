// 第 1 大關 動物奇關 / World 1: Animal Antics (Flat illustration).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 1-1 Farm morning: flat illustration, living animals ===== */
function bgFarm(c) {
  const R = mulberry(3);
  let g = c.createLinearGradient(0, 0, 0, 300); g.addColorStop(0, '#9fd8f7'); g.addColorStop(1, '#fff1d2');
  c.fillStyle = g; c.fillRect(0, 0, W, 300);
  circ(c, 300, 70, 46, 'rgba(255,211,107,.25)'); circ(c, 300, 70, 34, '#ffd36b');
  [[70, 80, 1], [190, 50, 0.8], [250, 128, 0.6]].forEach(([x, y, s]) => {
    c.fillStyle = 'rgba(255,255,255,.95)';
    [[0, 0, 26], [22, -8, 20], [42, 2, 18], [-20, 4, 16]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(x + dx * s, y + dy * s, r * s, 0, Math.PI * 2); c.fill(); });
  });
  const hill = (y0, amp, col, ph) => { c.beginPath(); c.moveTo(0, H); c.lineTo(0, y0); for (let x = 0; x <= W; x += 20) c.lineTo(x, y0 + Math.sin(x / 70 + ph) * amp); c.lineTo(W, H); c.closePath(); c.fillStyle = col; c.fill(); };
  hill(230, 14, '#b5df8a', 0.5);
  c.fillStyle = '#d9483b'; c.fillRect(24, 200, 86, 70);
  poly(c, [16, 204, 67, 168, 118, 204], '#a8302a');
  c.fillStyle = '#fff6ea'; c.fillRect(52, 230, 30, 40);
  c.strokeStyle = '#fff6ea'; c.lineWidth = 3; c.strokeRect(24, 200, 86, 70);
  c.strokeStyle = '#d9483b'; c.beginPath(); c.moveTo(52, 230); c.lineTo(82, 270); c.moveTo(82, 230); c.lineTo(52, 270); c.stroke();
  c.fillStyle = '#c9cfd6'; c.fillRect(112, 190, 22, 80); ell(c, 123, 190, 11, 9, '#9aa3ad');
  hill(262, 10, '#93cf68', 2);
  c.fillStyle = '#fff8ec'; for (let x = 6; x < W; x += 26) c.fillRect(x, 248, 6, 34);
  c.fillRect(0, 256, W, 5); c.fillRect(0, 270, W, 5);
  hill(300, 8, '#7fc25a', 1);
  for (let i = 0; i < 70; i++) circ(c, R() * W, 310 + R() * 165, 1.6 + R() * 1.4, ['#fff', '#ffd84d', '#ff8fb1'][i % 3]);
  c.strokeStyle = 'rgba(60,120,40,.25)'; c.lineWidth = 1.2;
  for (let i = 0; i < 60; i++) { const x = R() * W, y = 310 + R() * 165; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 2, y - 6); c.moveTo(x, y); c.lineTo(x + 2, y - 6); c.stroke(); }
}
function drawChicken(c, a) {
  const peck = a.live * Math.pow(Math.max(0, Math.sin(a.t * 5)), 6);
  groundShadow(c, 30, 22);
  c.strokeStyle = '#f29a2e'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-4, 16); c.lineTo(-6, 30); c.moveTo(6, 16); c.lineTo(5, 30); c.stroke();
  poly(c, [-22, -2, -32, -18, -26, -6, -34, -8], '#f3e3c3');
  ell(c, -2, 4, 22, 16, '#fffaf0');
  ell(c, -6, 6, 11, 8, '#efe1c4', -0.3);
  c.save(); c.translate(12, -6); c.rotate(peck * 0.9);
  ell(c, 6, -10, 10, 11, '#fffaf0');
  poly(c, [2, -20, 5, -27, 8, -21, 12, -26, 14, -18], '#e8463a');
  poly(c, [15, -11, 24, -8, 15, -5], '#f29a2e');
  ell(c, 13, -2, 3, 4, '#e8463a');
  circ(c, 9, -12, 1.8, '#222');
  c.restore();
}
function drawCow(c, a) {
  const swish = Math.sin(a.t * 3) * 0.6 * a.live + 0.2, chew = Math.sin(a.t * 8) * 1.5 * a.live;
  groundShadow(c, 40, 52);
  c.fillStyle = '#f4f1ea'; [-40, -24, 20, 34].forEach((x) => c.fillRect(x, 10, 10, 30));
  c.fillStyle = '#4a4040'; [-40, -24, 20, 34].forEach((x) => c.fillRect(x, 36, 10, 5));
  c.save(); c.translate(-50, -12); c.rotate(swish);
  c.strokeStyle = '#f4f1ea'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-8, 14, -4, 30); c.stroke();
  ell(c, -4, 32, 4, 6, '#3b3333'); c.restore();
  rr(c, -52, -22, 96, 44, 20); c.fillStyle = '#f7f4ee'; c.fill();
  c.fillStyle = '#2f2b2b';
  [[-30, -10, 13, 9], [2, 4, 12, 10], [-8, -16, 8, 6], [24, -12, 9, 7]].forEach(([x, y, rx, ry]) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0.4, 0, Math.PI * 2); c.fill(); });
  ell(c, -8, 22, 10, 6, '#f6a9b9');
  c.save(); c.translate(46, -14);
  ell(c, -10, -10, 7, 4, '#f7f4ee', -0.5); ell(c, 14, -10, 7, 4, '#f7f4ee', 0.5);
  poly(c, [-4, -16, -8, -26, 0, -18], '#e9dcc2'); poly(c, [8, -16, 12, -26, 4, -18], '#e9dcc2');
  rr(c, -10, -18, 22, 30, 10); c.fillStyle = '#f7f4ee'; c.fill();
  rr(c, -12, 2 + chew * 0.5, 26, 14, 7); c.fillStyle = '#f6a9b9'; c.fill();
  circ(c, -4, 9 + chew * 0.5, 1.8, '#b5606f'); circ(c, 6, 9 + chew * 0.5, 1.8, '#b5606f');
  circ(c, -3, -6, 2.2, '#222'); circ(c, 7, -6, 2.2, '#222');
  c.restore();
}
function drawPig(c, a) {
  const wig = Math.sin(a.t * 10) * a.live, sn = Math.sin(a.t * 6) * a.live;
  groundShadow(c, 28, 34);
  c.fillStyle = '#e88aa0'; [-24, -10, 10, 22].forEach((x) => c.fillRect(x, 12, 8, 16));
  c.strokeStyle = '#e88aa0'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-34, -4); c.bezierCurveTo(-44, -10 + wig * 3, -46, 4, -38, 2 + wig * 2); c.stroke();
  ell(c, -4, 0, 32, 22, '#f7a8b8');
  ell(c, -10, 8, 14, 7, 'rgba(255,255,255,.25)');
  c.save(); c.translate(24, -6);
  poly(c, [-6, -12, -4, -26, 6, -14], '#f48aa0'); poly(c, [6, -14, 14, -24, 16, -10], '#f48aa0');
  circ(c, 4, 0, 15, '#f7a8b8');
  ell(c, 15 + sn, 4, 7, 6, '#f48aa0'); circ(c, 13 + sn, 4, 1.5, '#b3485f'); circ(c, 17 + sn, 4, 1.5, '#b3485f');
  circ(c, 2, -4, 2, '#222'); circ(c, 9, -5, 2, '#222');
  c.restore();
}
function drawSheep(c, a) {
  const hop = Math.max(0, Math.sin(a.t * 3)) * a.live;
  groundShadow(c, 34 + hop * 7, 34 - hop * 6);
  c.fillStyle = '#3b3a44'; [-22, -8, 10, 22].forEach((x) => c.fillRect(x, 12, 6, 22));
  c.fillStyle = '#fbfbf6';
  [[-24, -6, 14], [-10, -14, 15], [8, -14, 15], [22, -6, 14], [-16, 6, 14], [2, 8, 15], [18, 6, 13], [-2, -2, 16]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); });
  c.strokeStyle = 'rgba(160,160,150,.35)'; c.lineWidth = 1.2;
  [[-10, -14, 15], [8, -14, 15], [2, 8, 15]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0.3, 2.2); c.stroke(); });
  c.save(); c.translate(32, -10);
  ell(c, -6, -8, 7, 4, '#3b3a44', -0.6);
  ell(c, 4, 2, 11, 14, '#3b3a44');
  circ(c, 0, -2, 2.2, '#fff'); circ(c, 8, -2, 2.2, '#fff'); circ(c, 0.5, -1.6, 1.1, '#222'); circ(c, 8.5, -1.6, 1.1, '#222');
  circ(c, 2, -13, 8, '#fbfbf6');
  c.restore();
}

/* ===== Q-style animal calls for stages 2-10 ===== */
const { q, note, puff } = QS;
const S_ = {
  lion: (ac, o, t) => { q(ac, o, t, [[0, 360], [0.1, 560], [0.38, 400]], 0.42, { trem: [26, 0.35], vol: 0.45, over: 0.25, attack: 0.03 }); puff(ac, o, t, 0.18, 900, 0.05); },
  elephant: (ac, o, t) => q(ac, o, t, [[0, 620], [0.08, 1100], [0.32, 1320], [0.5, 1000]], 0.55, { vib: [7, 30], over: 0.35, vol: 0.42, attack: 0.02 }),
  giraffe: (ac, o, t) => q(ac, o, t, [[0, 400], [0.3, 460], [0.6, 410]], 0.62, { vib: [4, 8], trem: [7, 0.3], vol: 0.45, attack: 0.08 }),
  zebra: (ac, o, t) => [0, 0.17].forEach((d) => q(ac, o, t + d, [[0, 900], [0.05, 1300], [0.14, 820]], 0.15, { vol: 0.42, over: 0.25 })),
  monkey: (ac, o, t) => { [0, 0.15].forEach((d) => q(ac, o, t + d, [[0, 520], [0.11, 720]], 0.12, { vol: 0.4 })); q(ac, o, t + 0.32, [[0, 900], [0.1, 1600], [0.3, 1100]], 0.32, { vib: [10, 30], vol: 0.42 }); },
  parrot: (ac, o, t) => { q(ac, o, t, [[0, 1400], [0.15, 2500]], 0.16, { vol: 0.38 }); q(ac, o, t + 0.22, [[0, 2300], [0.1, 2500], [0.34, 1300]], 0.36, { vol: 0.38 }); },
  toucan: (ac, o, t) => [0, 0.12, 0.24].forEach((d) => q(ac, o, t + d, [[0, 720], [0.07, 540]], 0.08, { trem: [40, 0.5], vol: 0.44, over: 0.3 })),
  sloth: (ac, o, t) => q(ac, o, t, [[0, 1700], [0.3, 2100], [0.7, 1800]], 0.72, { vib: [5, 30], attack: 0.12, vol: 0.34 }),
  frog: (ac, o, t) => { q(ac, o, t, [[0, 520], [0.06, 720]], 0.08, { trem: [50, 0.7], vol: 0.45 }); q(ac, o, t + 0.12, [[0, 600], [0.1, 920]], 0.12, { trem: [50, 0.7], vol: 0.45 }); },
  panda: (ac, o, t) => q(ac, o, t, [[0, 980], [0.1, 1280], [0.32, 1080]], 0.34, { trem: [18, 0.4], vol: 0.42 }),
  pandacub: (ac, o, t) => [0, 0.2].forEach((d, k) => q(ac, o, t + d, [[0, 1600 + k * 200], [0.08, 2000 + k * 200], [0.18, 1700]], 0.18, { vib: [12, 40], vol: 0.38 })),
  redpanda: (ac, o, t) => [0, 0.09, 0.18, 0.27].forEach((d, k) => q(ac, o, t + d, [[0, 1700 + k * 60], [0.04, 2150 + k * 60]], 0.06, { attack: 0.004, vol: 0.38 })),
  goldmonkey: (ac, o, t) => { q(ac, o, t, [[0, 1100], [0.12, 1500], [0.3, 1250]], 0.3, { vib: [9, 40], vol: 0.4 }); q(ac, o, t + 0.34, [[0, 1250], [0.18, 1700]], 0.2, { vol: 0.36 }); },
  kangaroo: (ac, o, t) => { [0, 0.13].forEach((d) => { q(ac, o, t + d, [[0, 520], [0.07, 380]], 0.09, { vol: 0.42, over: 0.3 }); puff(ac, o, t + d, 0.06, 1400, 0.06); }); q(ac, o, t + 0.3, [[0, 400], [0.1, 820], [0.28, 680]], 0.3, { vib: [18, 40], vol: 0.4 }); },
  emu: (ac, o, t) => [0, 0.14, 0.28].forEach((d, k) => q(ac, o, t + d, [[0, 460 - k * 15], [0.11, 400 - k * 15]], 0.12, { vol: 0.45, over: 0.32, attack: 0.01 })),
  galah: (ac, o, t) => [0, 0.2].forEach((d) => q(ac, o, t + d, [[0, 1800], [0.05, 2400], [0.15, 1500]], 0.16, { trem: [30, 0.3], vol: 0.38 })),
  thorny: (ac, o, t) => { note(ac, o, t, 2400, 0.07, 0.34); note(ac, o, t + 0.1, 2900, 0.07, 0.34); note(ac, o, t + 0.2, 3300, 0.14, 0.3); },
  bee: (ac, o, t) => { q(ac, o, t, [[0, 520], [0.2, 580], [0.4, 520]], 0.42, { trem: [45, 0.6], over: 0.35, vol: 0.42 }); q(ac, o, t + 0.44, [[0, 900], [0.08, 1600]], 0.1, { vol: 0.36 }); },
  bumble: (ac, o, t) => q(ac, o, t, [[0, 400], [0.25, 460], [0.5, 420]], 0.52, { trem: [32, 0.6], over: 0.4, vol: 0.45, attack: 0.04 }),
  ladybug: (ac, o, t) => { note(ac, o, t, 2350, 0.05, 0.34); note(ac, o, t + 0.08, 2800, 0.05, 0.34); note(ac, o, t + 0.16, 3150, 0.22, 0.3); },
  butterfly: (ac, o, t) => [0, 0.06, 0.12, 0.18].forEach((d, k) => q(ac, o, t + d, [[0, 1500 + k * 180], [0.05, 2000 + k * 180]], 0.07, { attack: 0.004, hold: 0.3, vol: 0.32 })),
  owl: (ac, o, t) => { q(ac, o, t, [[0, 520], [0.2, 480]], 0.24, { attack: 0.05, vol: 0.45, over: 0.2 }); q(ac, o, t + 0.32, [[0, 560], [0.4, 470]], 0.42, { vib: [5, 10], attack: 0.05, vol: 0.45, over: 0.2 }); },
  owlet: (ac, o, t) => q(ac, o, t, [[0, 900], [0.1, 1150], [0.28, 960]], 0.3, { vib: [9, 20], vol: 0.4 }),
  bat: (ac, o, t) => [0, 0.08, 0.16].forEach((d) => q(ac, o, t + d, [[0, 2800], [0.05, 2200]], 0.05, { attack: 0.003, vol: 0.32 })),
  fox: (ac, o, t) => [0, 0.24].forEach((d) => q(ac, o, t + d, [[0, 820], [0.06, 1400], [0.2, 900]], 0.2, { vol: 0.4 })),
  badger: (ac, o, t) => { q(ac, o, t, [[0, 460], [0.25, 430]], 0.3, { trem: [24, 0.5], vol: 0.44, over: 0.3 }); q(ac, o, t + 0.34, [[0, 1300], [0.12, 1700]], 0.13, { vol: 0.36 }); },
  hedgehog: (ac, o, t) => { [0, 0.1, 0.2].forEach((d) => puff(ac, o, t + d, 0.06, 2500, 0.12)); q(ac, o, t + 0.32, [[0, 1900], [0.1, 2350]], 0.12, { vol: 0.38 }); },
  spoonbill: (ac, o, t) => [0, 0.16].forEach((d) => q(ac, o, t + d, [[0, 440], [0.1, 390]], 0.12, { vol: 0.45, over: 0.32 })),
  egret: (ac, o, t) => q(ac, o, t, [[0, 620], [0.05, 760], [0.25, 560]], 0.26, { trem: [32, 0.4], vol: 0.42, over: 0.3 }),
  swallow: (ac, o, t) => [0, 0.07, 0.14, 0.21].forEach((d, k) => q(ac, o, t + d, [[0, 2600 + (k % 2) * 300], [0.03, 3200], [0.06, 2700]], 0.06, { attack: 0.003, vol: 0.3 })),
  kingfisher: (ac, o, t) => [0, 0.3].forEach((d) => q(ac, o, t + d, [[0, 2600], [0.22, 2950]], 0.24, { vib: [20, 60], vol: 0.3 })),
  stilt: (ac, o, t) => [0, 0.12, 0.24].forEach((d) => q(ac, o, t + d, [[0, 1500], [0.05, 1300]], 0.07, { vol: 0.4, over: 0.3 })),
  budgie: (ac, o, t) => q(ac, o, t, [[0, 1800], [0.08, 2500], [0.16, 2000], [0.26, 2700], [0.36, 2200]], 0.38, { vib: [25, 80], vol: 0.34 }),
  cat: (ac, o, t) => q(ac, o, t, [[0, 700], [0.1, 1100], [0.36, 760]], 0.4, { vib: [6, 15], vol: 0.42, attack: 0.03 }),
  dog: (ac, o, t) => [0, 0.18].forEach((d) => { q(ac, o, t + d, [[0, 540], [0.04, 720], [0.12, 500]], 0.13, { vol: 0.44, over: 0.35 }); puff(ac, o, t + d, 0.05, 1000, 0.05); }),
  hamster: (ac, o, t) => { q(ac, o, t, [[0, 2200], [0.06, 2600]], 0.08, { vol: 0.36 }); q(ac, o, t + 0.11, [[0, 2450], [0.1, 2050]], 0.12, { vol: 0.36 }); },
  bunny: (ac, o, t) => { [0, 0.09].forEach((d) => puff(ac, o, t + d, 0.05, 3000, 0.1)); q(ac, o, t + 0.2, [[0, 1300], [0.06, 1750], [0.16, 1500]], 0.17, { vol: 0.38 }); },
  koala: (ac, o, t) => q(ac, o, t, [[0, 400], [0.22, 350], [0.45, 420]], 0.48, { trem: [26, 0.5], vol: 0.45, over: 0.35, attack: 0.03 }),
};
Object.entries(S_).forEach(([k, fn]) => defineCreatureSound('animal_' + k, fn));

/* ===== shared helpers for stages 2-10 (same flat style as the farm) ===== */
const TAU = Math.PI * 2;
function eye(c, x, y, r = 2.2) { circ(c, x, y, r, '#222'); circ(c, x - r * 0.35, y - r * 0.4, r * 0.4, '#fff'); }
function blush(c, x, y, rx = 4, ry = 2.6) { ell(c, x, y, rx, ry, 'rgba(255,120,150,.42)'); }
function stroke(c, col, lw) { c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(); }
function seg(c, pts, col, lw) { c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); stroke(c, col, lw); }
function bend(c, x0, y0, cx, cy, x1, y1, col, lw) { c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo(cx, cy, x1, y1); stroke(c, col, lw); }
function fillRR(c, x, y, w, h, r, col) { rr(c, x, y, w, h, r); c.fillStyle = col; c.fill(); }
function sky(c, stops, y1) { const g = c.createLinearGradient(0, 0, 0, y1); stops.forEach(([p, col]) => g.addColorStop(p, col)); c.fillStyle = g; c.fillRect(0, 0, W, y1); }
function puffCloud(c, x, y, s, col = 'rgba(255,255,255,.95)') {
  c.fillStyle = col;
  [[0, 0, 26], [22, -8, 20], [42, 2, 18], [-20, 4, 16]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(x + dx * s, y + dy * s, r * s, 0, TAU); c.fill(); });
}
function hillBand(c, y0, amp, col, ph, f = 70) { c.beginPath(); c.moveTo(0, H); c.lineTo(0, y0); for (let x = 0; x <= W; x += 12) c.lineTo(x, y0 + Math.sin(x / f + ph) * amp); c.lineTo(W, H); c.closePath(); c.fillStyle = col; c.fill(); }
function tufts(c, R, n, y0, y1, col, s = 6) { for (let i = 0; i < n; i++) { const x = R() * W, y = y0 + R() * (y1 - y0); seg(c, [x - 3, y - s, x, y, x + 3, y - s], col, 1.3); seg(c, [x, y, x, y - s - 2], col, 1.3); } }
function branchStub(c, x, y, w, h = 9, col = '#7a5536') { fillRR(c, x, y, w, h, h / 2, col); ell(c, x + w * 0.3, y + h / 2, 2.5, 2, 'rgba(0,0,0,.18)'); ell(c, x + w * 0.72, y + h / 2, 2, 1.6, 'rgba(0,0,0,.15)'); }
// A wooden sign on a post: board centred at (0, by), text lines [[text, font, colour, dy], ...].
function woodSign(c, bw, bh, by, postBottom, lines, col = '#d39b5c', edge = '#a8703c') {
  groundShadow(c, postBottom, bw * 0.32);
  fillRR(c, -4, by, 8, postBottom - by, 3, '#8a5a34');
  fillRR(c, -bw / 2, by - bh / 2, bw, bh, 7, edge);
  fillRR(c, -bw / 2 + 3, by - bh / 2 + 3, bw - 6, bh - 6, 5, col);
  c.strokeStyle = 'rgba(120,70,30,.18)'; c.lineWidth = 1;
  for (let k = 1; k < 3; k++) { const y = by - bh / 2 + 3 + k * (bh - 6) / 3; c.beginPath(); c.moveTo(-bw / 2 + 6, y); c.lineTo(bw / 2 - 6, y); c.stroke(); }
  circ(c, -bw / 2 + 7, by - bh / 2 + 7, 1.6, '#7a4a24'); circ(c, bw / 2 - 7, by - bh / 2 + 7, 1.6, '#7a4a24');
  lines.forEach(([s, font, color, dy]) => txt(c, s, 0, by + dy, font, color));
}

/* ===== 1-2 African savanna ===== */
function acacia(c, x, y, s, trunk, leaf) {
  seg(c, [x, y, x, y - 34 * s], trunk, 4 * s);
  seg(c, [x, y - 26 * s, x - 18 * s, y - 44 * s], trunk, 3 * s); seg(c, [x, y - 30 * s, x + 20 * s, y - 46 * s], trunk, 3 * s);
  ell(c, x, y - 50 * s, 46 * s, 10 * s, leaf); ell(c, x - 22 * s, y - 46 * s, 22 * s, 7 * s, leaf); ell(c, x + 24 * s, y - 47 * s, 24 * s, 7 * s, leaf);
}
function bgSavanna(c) {
  const R = mulberry(12);
  sky(c, [[0, '#ffbf86'], [0.55, '#ffdca8'], [1, '#fff0d2']], 262);
  circ(c, 92, 168, 60, 'rgba(255,244,200,.35)'); circ(c, 92, 168, 40, '#fff3c6');
  [[220, 70, 0.9], [60, 92, 0.6], [300, 118, 0.5]].forEach(([x, y, s]) => puffCloud(c, x, y, s, 'rgba(255,255,255,.75)'));
  c.strokeStyle = 'rgba(110,70,50,.55)'; c.lineWidth = 1.4;
  [[180, 120], [194, 112], [206, 124], [168, 128]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x - 4, y - 2); c.quadraticCurveTo(x - 2, y - 4, x, y); c.quadraticCurveTo(x + 2, y - 4, x + 4, y - 2); c.stroke(); });
  hillBand(c, 226, 5, '#e9b98e', 1.2, 50);
  acacia(c, 40, 236, 0.6, '#b98d66', '#c6a072'); acacia(c, 190, 238, 0.5, '#b98d66', '#c6a072');
  hillBand(c, 242, 4, '#efcb7a', 0.4, 60);
  acacia(c, 330, 250, 1.5, '#6e5236', '#86a34a'); ell(c, 300, 175, 30, 7, '#97b456');
  hillBand(c, 268, 5, '#e3bc66', 2.2);
  ell(c, 212, 284, 10, 4, 'rgba(90,60,30,.2)'); poly(c, [202, 284, 208, 254, 214, 250, 220, 284], '#c98a4a'); poly(c, [208, 254, 212, 242, 216, 254], '#c98a4a');
  hillBand(c, 330, 7, '#d9b25f', 0.9);
  hillBand(c, 380, 6, '#d2aa58', 2.6);
  tufts(c, R, 90, 280, 476, 'rgba(140,100,40,.45)', 7);
  ell(c, 182, 466, 66, 13, '#8cc6c9'); ell(c, 170, 463, 40, 6, 'rgba(255,255,255,.35)');
  for (let i = 0; i < 18; i++) circ(c, R() * W, 300 + R() * 170, 1.5, i % 2 ? '#fff6dc' : '#f19a6a');
}
function drawElephant(c, a) {
  const flap = Math.sin(a.t * 2.4) * a.live, sway = Math.sin(a.t * 1.6) * a.live;
  groundShadow(c, 50, 56);
  [[-44, '#8f9aab'], [14, '#8f9aab'], [-28, '#a3aebd'], [28, '#a3aebd']].forEach(([x, col]) => { fillRR(c, x, 8, 16, 42, 6, col); ell(c, x + 8, 47, 6, 2.6, '#eee6d8'); });
  bend(c, -52, -6, -62, 6, -60, 18 + sway * 3, '#a3aebd', 3); ell(c, -60, 21 + sway * 3, 3, 4, '#5f6878');
  ell(c, -6, 0, 50, 34, '#aeb9c7');
  ell(c, -10, 16, 36, 12, 'rgba(255,255,255,.18)');
  circ(c, 36, -14, 25, '#aeb9c7');
  bend(c, 52, -2, 64 + sway * 2, 14, 58 + sway * 3, 32, '#aeb9c7', 11);
  circ(c, 55 + sway * 3, 33, 5, '#aeb9c7');
  bend(c, 46, 6, 50, 14, 58, 12, '#fff8ea', 4);
  c.save(); c.translate(20, -12); c.scale(1 - flap * 0.12, 1);
  ell(c, 0, 0, 17, 24, '#bcc6d3'); ell(c, 1, 2, 11, 17, '#f4b9c6');
  c.restore();
  eye(c, 43, -20, 2.6); blush(c, 46, -9, 5, 3);
}
function drawGiraffe(c, a) {
  const bob = Math.sin(a.t * 1.4) * 2 * a.live, chew = Math.sin(a.t * 7) * a.live;
  groundShadow(c, 80, 30);
  [[-28, '#e7b444'], [-14, '#f2c14e'], [2, '#e7b444'], [16, '#f2c14e']].forEach(([x, col]) => { fillRR(c, x, 34, 7, 44, 3, col); fillRR(c, x - 0.5, 74, 8, 5, 2, '#6b4a2b'); });
  bend(c, -34, 22, -40, 34, -38, 44, '#e2a84a', 2.5); ell(c, -38, 46, 2.5, 4, '#6b4a2b');
  ell(c, -6, 28, 30, 18, '#f2c14e');
  seg(c, [8, 24, 12 + bob * 0.4, -54], '#f2c14e', 15);
  bend(c, 1, 16, -1, -18, 4 + bob * 0.4, -52, '#b8682a', 3.5);
  c.fillStyle = '#c9822f';
  [[-22, 22, 6, 5], [-8, 30, 7, 5], [6, 24, 5, 5], [-20, 36, 4, 3], [-32, 28, 3, 4], [10, 6, 4, 3], [12, -12, 3.5, 3], [11, -32, 3, 3], [6, -2, 2.5, 2]].forEach(([x, y, rx, ry]) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0.3, 0, TAU); c.fill(); });
  const hx = 12 + bob;
  ell(c, hx - 9, -70, 6, 3, '#e7b444', -0.5);
  seg(c, [hx - 2, -68, hx - 4, -79], '#8b5a2b', 3); seg(c, [hx + 4, -68, hx + 4, -79], '#8b5a2b', 3);
  circ(c, hx - 4, -80, 3, '#8b5a2b'); circ(c, hx + 4, -80, 3, '#8b5a2b');
  ell(c, hx + 4, -63, 14, 10, '#f2c14e');
  ell(c, hx + 15, -60 + chew * 0.6, 8, 7, '#f7d98b');
  circ(c, hx + 18, -62, 1.2, '#8b5a2b');
  eye(c, hx + 6, -66, 2.4); blush(c, hx + 8, -58, 3.5, 2.2);
}
function drawLion(c, a) {
  const swish = Math.sin(a.t * 2.6) * a.live;
  groundShadow(c, 32, 42);
  [[-30, '#dd9a3e'], [10, '#dd9a3e'], [-18, '#efb04c'], [22, '#efb04c']].forEach(([x, col]) => { fillRR(c, x, 4, 10, 28, 4, col); ell(c, x + 5, 31, 6.5, 3.5, '#f7cf86'); });
  bend(c, -36, -2, -48, -6, -46, -18 + swish * 6, '#efb04c', 3); ell(c, -46, -20 + swish * 6, 4, 5, '#a8562a');
  ell(c, -6, 2, 34, 17, '#f2b552');
  ell(c, -8, 10, 24, 7, 'rgba(255,255,255,.18)');
  c.fillStyle = '#c8692f';
  for (let k = 0; k < 10; k++) { const an = k / 10 * TAU; c.beginPath(); c.arc(26 + Math.cos(an) * 16, -8 + Math.sin(an) * 16, 7.5, 0, TAU); c.fill(); }
  circ(c, 26, -8, 17, '#c8692f');
  circ(c, 18, -21, 4.5, '#f3c066'); circ(c, 35, -21, 4.5, '#f3c066'); circ(c, 18, -21, 2, '#e08a50'); circ(c, 35, -21, 2, '#e08a50');
  circ(c, 27, -7, 13, '#f6c56a');
  ell(c, 29, -1, 7.5, 5.5, '#fff1d6');
  poly(c, [25, -4, 33, -4, 29, 0], '#7a3b2a');
  eye(c, 22, -9, 2.2); eye(c, 34, -9, 2.2); blush(c, 19, -3, 3, 2); blush(c, 38, -3, 3, 2);
}
function drawZebra(c, a) {
  const nod = Math.sin(a.t * 2.4) * 0.12 * a.live, swish = Math.sin(a.t * 3) * a.live;
  groundShadow(c, 37, 42);
  [-30, -18, 12, 24].forEach((x) => { fillRR(c, x, 4, 8, 32, 3, '#fbfbf8'); c.fillStyle = '#2b2b33'; c.fillRect(x, 14, 8, 3); c.fillRect(x, 22, 8, 3); c.fillRect(x, 32, 8, 5); });
  bend(c, -38, -6, -46, 2, -46 + swish * 2, 14, '#fbfbf8', 2.5); ell(c, -46 + swish * 2, 16, 2.5, 4, '#2b2b33');
  c.save(); rr(c, -40, -16, 66, 30, 15); c.fillStyle = '#fbfbf8'; c.fill(); c.clip();
  for (let x = -36; x < 26; x += 9) bend(c, x, -18, x + 5, -2, x - 1, 16, '#2b2b33', 3.6);
  c.restore();
  c.save(); c.translate(20, -8); c.rotate(nod);
  seg(c, [0, 0, 14, -20], '#fbfbf8', 14);
  for (let k = 0; k < 3; k++) seg(c, [-1 + k * 5, -6 - k * 6, 9 + k * 4, -2 - k * 6], '#2b2b33', 2.6);
  bend(c, -6, -2, 0, -20, 8, -28, '#2b2b33', 4);
  ell(c, 20, -24, 13, 8, '#fbfbf8', 0.45);
  ell(c, 29, -18, 6, 5, '#3a3a44', 0.45);
  ell(c, 9, -32, 3, 6, '#fbfbf8', -0.3); ell(c, 9, -32, 1.4, 3.6, '#f4b9c6', -0.3);
  seg(c, [14, -27, 20, -21], '#2b2b33', 2.2);
  eye(c, 19, -27, 2.2);
  c.restore();
}

/* ===== 1-3 Amazon rainforest ===== */
function leafShape(c, x, y, len, wid, rot, col, vein) {
  c.save(); c.translate(x, y); c.rotate(rot);
  c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(len * 0.5, -wid, len, 0); c.quadraticCurveTo(len * 0.5, wid, 0, 0); c.fillStyle = col; c.fill();
  if (vein) { c.beginPath(); c.moveTo(2, 0); c.lineTo(len - 4, 0); stroke(c, vein, 1.2); }
  c.restore();
}
function bgRainforest(c) {
  const R = mulberry(31);
  sky(c, [[0, '#2f7a52'], [0.5, '#5ea86a'], [1, '#8fc982']], H);
  c.fillStyle = 'rgba(255,255,210,.10)';
  [[60, 30], [160, 60], [260, 40]].forEach(([x, w]) => poly(c, [x, 0, x + w, 0, x + w + 70, H, x + 60, H], 'rgba(255,255,210,.09)'));
  [[18, 22, '#3e6a44'], [196, 16, '#46744a'], [336, 26, '#3e6a44']].forEach(([x, w, col]) => { c.fillStyle = col; c.fillRect(x - w / 2, 0, w, H); });
  for (let i = 0; i < 26; i++) ell(c, R() * W, R() * 70, 30 + R() * 30, 18 + R() * 12, ['#256b44', '#2d7a4c', '#1f5e3c'][i % 3]);
  c.globalAlpha = 0.9;
  [[50, 0, 40, 210], [150, 0, 170, 160], [232, 0, 226, 240], [318, 0, 330, 190], [120, 0, 110, 120]].forEach(([x0, y0, x1, y1]) => {
    bend(c, x0, y0, (x0 + x1) / 2 + 14, y1 * 0.5, x1, y1, '#3f8f4f', 2.4);
    for (let k = 1; k < 6; k++) { const tt = k / 6, x = x0 + (x1 - x0) * tt + Math.sin(tt * 3) * 8, y = y0 + (y1 - y0) * tt; leafShape(c, x, y, 9, 4, k % 2 ? 0.6 : 2.5, '#4fa35a'); }
  });
  c.globalAlpha = 1;
  for (let i = 0; i < 40; i++) leafShape(c, R() * W, 120 + R() * 260, 14 + R() * 16, 5 + R() * 4, R() * TAU, ['rgba(40,110,60,.45)', 'rgba(90,170,90,.35)'][i % 2]);
  hillBand(c, 372, 8, '#3f8a4e', 1.1, 40);
  hillBand(c, 400, 6, '#357a44', 2.4, 34);
  ell(c, 190, 470, 150, 30, '#5fb4c6'); ell(c, 160, 462, 70, 6, 'rgba(255,255,255,.3)');
  [[-10, 440, 70, 22, -0.5], [10, 470, 80, 26, -0.2], [300, 450, 80, 24, 3.4], [320, 476, 70, 22, 3.0], [40, 410, 60, 18, -0.9], [312, 410, 56, 16, 3.9]].forEach(([x, y, l, w, r]) => leafShape(c, x, y, l, w, r, '#2f8a48', '#1f6a36'));
  [[60, 214], [300, 222], [24, 352], [336, 350]].forEach(([x, y]) => { // heliconia: zig-zag red bracts with yellow lips
    seg(c, [x, y - 4, x, y + 46], '#2f7a40', 2);
    for (let k = 0; k < 5; k++) { const d = k % 2 ? -1 : 1, yy = y + k * 9; c.beginPath(); c.moveTo(x, yy); c.quadraticCurveTo(x + d * 14, yy + 1, x + d * 13, yy + 9); c.quadraticCurveTo(x + d * 6, yy + 7, x, yy + 6); c.closePath(); c.fillStyle = '#ff4f3a'; c.fill(); seg(c, [x + d * 12, yy + 7, x + d * 6, yy + 6], '#ffd23f', 2); }
  });
  for (let i = 0; i < 16; i++) circ(c, R() * W, 380 + R() * 30, 2, ['#ff8fb1', '#fff3a0'][i % 2]);
}
function drawSloth(c, a) {
  const sw = Math.sin(a.t * 0.9) * 3 * a.live;
  branchStub(c, -58, -44, 116, 12);
  ell(c, -20, -42, 7, 3, '#5c9a4a', -0.3); ell(c, 30, -44, 6, 3, '#5c9a4a', 0.4);
  c.save(); c.translate(sw, 0);
  [[-24, 2, -30, -34], [-8, -2, -13, -34], [8, -2, 13, -34], [24, 2, 30, -34]].forEach(([x0, y0, x1, y1]) => { seg(c, [x0, y0, x1, y1], '#a8876a', 9); bend(c, x1 - 4, y1 + 2, x1, y1 - 7, x1 + 4, y1 - 2, '#4a3a2a', 2); });
  ell(c, 0, 4, 34, 20, '#b8977a');
  ell(c, -6, 10, 22, 8, 'rgba(255,255,255,.12)');
  circ(c, 0, 20, 15, '#c9ad8f');
  ell(c, 0, 22, 12, 10, '#f1e3cc');
  ell(c, -6, 20, 5.5, 3, '#6a4a34', -0.35); ell(c, 6, 20, 5.5, 3, '#6a4a34', 0.35);
  circ(c, -6, 20, 1.8, '#111'); circ(c, 6, 20, 1.8, '#111'); circ(c, -6.6, 19.3, 0.6, '#fff'); circ(c, 5.4, 19.3, 0.6, '#fff');
  ell(c, 0, 25.5, 3, 2, '#3a2a20');
  c.beginPath(); c.arc(0, 26.5, 4, 0.3, Math.PI - 0.3); stroke(c, '#5a3a28', 1.3);
  blush(c, -9, 26, 3, 2); blush(c, 9, 26, 3, 2);
  c.restore();
}
function drawMacaw(c, a) {
  const bob = Math.sin(a.t * 3) * 1.6 * a.live;
  poly(c, [-4, 16, 6, 16, 4, 58, -2, 58], '#e23b2e'); poly(c, [-2, 46, 4, 46, 4, 58, -2, 58], '#2f6fd6');
  branchStub(c, -34, 18, 68, 9);
  ell(c, 0, 0, 15, 22, '#e23b2e');
  ell(c, 5, 6, 10, 17, '#2f6fd6', -0.15); ell(c, 4, -2, 9, 8, '#f6c430', -0.15); ell(c, 5, 6, 8, 5, '#3fae4a', -0.15);
  seg(c, [-4, 20, -4, 24], '#6b6b6b', 3); seg(c, [4, 20, 4, 24], '#6b6b6b', 3);
  c.save(); c.translate(0, bob);
  circ(c, 0, -26, 12, '#e23b2e');
  ell(c, 5, -26, 7, 6.5, '#fff6f0');
  c.beginPath(); c.moveTo(9, -31); c.quadraticCurveTo(22, -30, 17, -17); c.quadraticCurveTo(14, -22, 9, -21); c.closePath(); c.fillStyle = '#f2ead8'; c.fill();
  poly(c, [9, -21, 15, -20, 10, -16], '#333');
  eye(c, 4, -27, 2);
  c.restore();
}
function drawToucan(c, a) {
  const tip = Math.sin(a.t * 2.2) * 0.08 * a.live;
  poly(c, [-24, 10, -14, 10, -26, 34, -32, 32], '#222a35');
  branchStub(c, -54, 22, 108, 9);
  ell(c, -14, -2, 18, 24, '#222a35');
  ell(c, -18, 4, 9, 16, '#2f3a48');
  ell(c, -4, -12, 9, 11, '#ffe27a');
  ell(c, -6, 18, 6, 4, '#e8463a');
  seg(c, [-14, 21, -14, 26], '#5ab0d0', 3); seg(c, [-6, 21, -6, 26], '#5ab0d0', 3);
  c.save(); c.translate(0, -20); c.rotate(tip);
  c.beginPath(); c.moveTo(0, -6); c.bezierCurveTo(20, -14, 42, -8, 50, 2); c.bezierCurveTo(38, 4, 18, 8, 0, 6); c.closePath(); c.fillStyle = '#ff8a2a'; c.fill();
  c.beginPath(); c.moveTo(0, 1); c.bezierCurveTo(18, 2, 36, 1, 50, 2); c.bezierCurveTo(38, 4, 18, 8, 0, 6); c.closePath(); c.fillStyle = '#ffcf3a'; c.fill();
  c.beginPath(); c.moveTo(43, -3); c.quadraticCurveTo(48, -1, 50, 2); c.quadraticCurveTo(46, 3, 42, 3); c.closePath(); c.fillStyle = '#222'; c.fill();
  c.restore();
  circ(c, -4, -24, 5.5, '#5cc8f0'); eye(c, -4, -24, 2.4);
}
function drawSquirrelMonkey(c, a) {
  const hop = Math.abs(Math.sin(a.t * 3.4)) * 2 * a.live, tw = Math.sin(a.t * 1.8) * 4 * a.live;
  c.beginPath(); c.moveTo(-8, 26); c.quadraticCurveTo(-18, 38, -14 + tw, 44); c.quadraticCurveTo(-8 + tw, 48, -6 + tw, 42); stroke(c, '#c79a40', 5);
  circ(c, -6 + tw, 42, 3.2, '#2b2b2b');
  branchStub(c, -44, 24, 88, 9);
  c.save(); c.translate(0, -hop);
  ell(c, 0, 10, 16, 17, '#a8a08a');
  ell(c, 0, 14, 10, 12, '#f2e3b8');
  seg(c, [-12, 6, -16, 24], '#e9b04a', 6); seg(c, [12, 6, 16, 24], '#e9b04a', 6);
  ell(c, -9, 25, 6, 4, '#e9b04a'); ell(c, 9, 25, 6, 4, '#e9b04a');
  ell(c, -16, -18, 5, 6, '#f6efe0'); ell(c, 16, -18, 5, 6, '#f6efe0');
  circ(c, 0, -18, 16, '#efe6d2');
  c.beginPath(); c.arc(0, -18, 16, Math.PI * 1.05, Math.PI * 1.95); c.closePath(); c.fillStyle = '#6b6b62'; c.fill();
  ell(c, -6, -17, 5.5, 6, '#fff'); ell(c, 6, -17, 5.5, 6, '#fff');
  eye(c, -6, -17, 2.4); eye(c, 6, -17, 2.4);
  ell(c, 0, -8, 6.5, 5, '#2b2b2b');
  circ(c, -1.5, -9, 0.9, '#666'); circ(c, 1.5, -9, 0.9, '#666');
  c.restore();
}
function drawDartFrog(c, a) {
  const th = 1 + Math.sin(a.t * 8) * 0.25 * a.live;
  leafShape(c, -44, 14, 88, 22, 0, '#3aa35a', '#2a7d44');
  ell(c, -14, 10, 10, 5, '#2167b8'); ell(c, 14, 10, 10, 5, '#2167b8');
  ell(c, 0, 0, 18, 13, '#2e7fd9');
  ell(c, 0, 7, 9, 5 * th, '#7fb8ee');
  c.fillStyle = '#16233a'; [[-9, -3, 2.4], [8, -4, 2], [2, 3, 1.6], [-4, 5, 1.4], [12, 3, 1.6]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); });
  [-12, 12].forEach((x) => { ell(c, x, 12, 4, 2, '#2e7fd9'); circ(c, x - 3, 13, 1.4, '#7fb8ee'); circ(c, x + 3, 13, 1.4, '#7fb8ee'); });
  circ(c, -8, -11, 6.5, '#2e7fd9'); circ(c, 8, -11, 6.5, '#2e7fd9');
  circ(c, -8, -12, 3.8, '#111'); circ(c, 8, -12, 3.8, '#111'); circ(c, -9.3, -13.4, 1.3, '#fff'); circ(c, 6.7, -13.4, 1.3, '#fff');
  c.beginPath(); c.arc(0, -3, 5, 0.3, Math.PI - 0.3); stroke(c, '#16233a', 1.3);
  blush(c, -11, -3, 3, 1.8); blush(c, 11, -3, 3, 1.8);
}

/* ===== 1-4 Bamboo pandas ===== */
const PANDA_BK = '#2b2b30';
function bambooStalk(c, x, y0, y1, w, col, node, leaf) {
  c.fillStyle = col; c.fillRect(x - w / 2, y0, w, y1 - y0);
  c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x - w / 2 + 1, y0, w * 0.3, y1 - y0);
  let k = 0;
  for (let y = y1 - 30; y > y0 + 6; y -= 36, k++) {
    c.fillStyle = node; c.fillRect(x - w / 2 - 1, y, w + 2, 2.5);
    if (leaf && k % 2 === 1) [-0.5, 0.15, 2.6, 3.3].forEach((r, j) => leafShape(c, x + (j < 2 ? 1 : -1) * w / 2, y, 20, 4, r + 0.4, leaf));
  }
}
function bgBamboo(c) {
  const R = mulberry(41);
  sky(c, [[0, '#dcefdc'], [1, '#f6faec']], 320);
  hillBand(c, 140, 18, '#cfe6cf', 0.3, 60);
  hillBand(c, 186, 14, '#b9dbba', 2.0, 46);
  for (let i = 0; i < 15; i++) bambooStalk(c, 8 + i * 25 + R() * 8, 0, 320, 4 + R() * 2, 'rgba(120,180,110,.42)', 'rgba(90,150,80,.4)');
  ell(c, 180, 236, 260, 34, 'rgba(255,255,255,.5)');
  hillBand(c, 300, 6, '#b2db93', 1.0, 60);
  [[18, 11], [182, 9], [212, 7], [342, 11], [150, 6]].forEach(([x, w]) => bambooStalk(c, x, 0, 340, w, '#6fae5a', '#4e8f3e', '#5aa04a'));
  hillBand(c, 336, 6, '#a3d283', 2.4, 50);
  hillBand(c, 392, 5, '#95c977', 0.4, 40);
  tufts(c, R, 60, 340, 476, 'rgba(60,120,50,.35)', 6);
  [[40, 452], [326, 446], [178, 468]].forEach(([x, y]) => { poly(c, [x - 6, y, x, y - 18, x + 6, y], '#b6c97a'); seg(c, [x - 3, y - 6, x + 3, y - 9], '#8ea85a', 1.2); });
  for (let i = 0; i < 14; i++) leafShape(c, R() * W, 360 + R() * 110, 10, 2.5, R() * TAU, 'rgba(160,190,90,.6)');
  for (let i = 0; i < 16; i++) circ(c, R() * W, 350 + R() * 120, 1.8, ['#fff', '#ffd6e0'][i % 2]);
}
function pandaHead(c, y, r, a, mouthOpen) {
  circ(c, -r * 0.73, y - r * 0.78, r * 0.36, PANDA_BK); circ(c, r * 0.73, y - r * 0.78, r * 0.36, PANDA_BK);
  circ(c, 0, y, r, '#fbfbf6');
  ell(c, -r * 0.4, y - r * 0.04, r * 0.27, r * 0.37, PANDA_BK, 0.55); ell(c, r * 0.4, y - r * 0.04, r * 0.27, r * 0.37, PANDA_BK, -0.55);
  circ(c, -r * 0.37, y - r * 0.08, r * 0.1, '#fff'); circ(c, r * 0.37, y - r * 0.08, r * 0.1, '#fff');
  circ(c, -r * 0.36, y - r * 0.06, r * 0.055, '#111'); circ(c, r * 0.36, y - r * 0.06, r * 0.055, '#111');
  ell(c, 0, y + r * 0.36, r * 0.17, r * 0.12, PANDA_BK);
  ell(c, 0, y + r * 0.56, r * 0.1, r * 0.04 + mouthOpen * r * 0.06, '#e88aa0');
  blush(c, -r * 0.62, y + r * 0.38, r * 0.15, r * 0.09); blush(c, r * 0.62, y + r * 0.38, r * 0.15, r * 0.09);
}
function drawPanda(c, a) {
  const chew = Math.abs(Math.sin(a.t * 6)) * a.live;
  groundShadow(c, 54, 46);
  ell(c, -26, 44, 15, 11, PANDA_BK); ell(c, 26, 44, 15, 11, PANDA_BK);
  circ(c, -27, 45, 4.5, '#f2a7b8'); circ(c, 27, 45, 4.5, '#f2a7b8');
  c.save(); ell(c, 0, 18, 36, 32, '#fbfbf6'); c.clip(); ell(c, 0, -8, 42, 14, PANDA_BK); c.restore();
  ell(c, -26, 16, 10, 17, PANDA_BK, 0.45);
  pandaHead(c, -24, 26, a, chew);
  c.save(); c.translate(20, 4 - chew * 3); c.rotate(0.42);
  fillRR(c, -3.5, -40, 7, 74, 3.5, '#7cb342'); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-2.5, -38, 2, 70);
  c.fillStyle = '#4e8a2e'; c.fillRect(-4, -14, 8, 2.5); c.fillRect(-4, 12, 8, 2.5);
  leafShape(c, 2, -38, 20, 5, -1.2, '#4e9a3a'); leafShape(c, 2, -38, 18, 4.5, -0.3, '#66b04a'); leafShape(c, 2, -26, 16, 4, 0.3, '#4e9a3a');
  c.restore();
  ell(c, 20, 10, 10, 15, PANDA_BK, -0.9); ell(c, 26, 2, 7, 6, PANDA_BK);
}
function drawPandaCub(c, a) {
  const wave = Math.sin(a.t * 4) * 0.45 * a.live;
  groundShadow(c, 35, 28);
  c.save(); c.scale(0.64, 0.64);
  ell(c, -22, 44, 14, 10, PANDA_BK); ell(c, 22, 44, 14, 10, PANDA_BK);
  circ(c, -23, 45, 4.5, '#f2a7b8'); circ(c, 23, 45, 4.5, '#f2a7b8');
  c.save(); ell(c, 0, 22, 32, 28, '#fbfbf6'); c.clip(); ell(c, 0, 0, 38, 12, PANDA_BK); c.restore();
  ell(c, 22, 22, 9, 14, PANDA_BK, -0.4);
  c.save(); c.translate(-24, 6); c.rotate(-1.2 + wave); ell(c, 0, -12, 9, 15, PANDA_BK); c.restore();
  pandaHead(c, -16, 28, a, 0.5);
  c.restore();
}
function drawRedPanda(c, a) {
  const sw = Math.sin(a.t * 1.5) * a.live;
  for (let k = 6; k >= 0; k--) { const u = k / 6; circ(c, -24 - 10 * u - Math.sin(u * 2.4) * 5 * sw, 8 + 22 * u, 6.5 - u, k % 2 ? '#f0c08a' : '#c8562a'); }
  branchStub(c, -48, 8, 96, 10);
  seg(c, [-14, 10, -18, 21], '#3a2620', 5); seg(c, [12, 10, 16, 21], '#3a2620', 5);
  circ(c, -18, 22, 3.2, '#3a2620'); circ(c, 16, 22, 3.2, '#3a2620');
  ell(c, -2, 1, 26, 11, '#c8562a');
  ell(c, -6, -4, 16, 4, 'rgba(255,255,255,.15)');
  poly(c, [14, -12, 13, -27, 23, -17], '#fff6ea'); poly(c, [16, -14, 15, -24, 22, -17], '#c8562a');
  poly(c, [30, -17, 38, -27, 38, -12], '#fff6ea'); poly(c, [31, -16, 37, -24, 36, -13], '#c8562a');
  circ(c, 26, -6, 13, '#d46a35');
  ell(c, 21, -11, 3, 2, '#fff6ea'); ell(c, 31, -11, 3, 2, '#fff6ea');
  ell(c, 27, 0, 8, 5.5, '#fff6ea'); ell(c, 17, -1, 3.5, 4, '#fff6ea'); ell(c, 37, -1, 3.5, 4, '#fff6ea');
  seg(c, [21, -5, 22, 2], '#9a3a1a', 1.6); seg(c, [32, -5, 31, 2], '#9a3a1a', 1.6);
  eye(c, 21, -7, 2.2); eye(c, 32, -7, 2.2);
  ell(c, 27, -2, 2.6, 1.8, '#2b1a14');
}
function drawGoldenMonkey(c, a) {
  const hop = Math.abs(Math.sin(a.t * 2.6)) * 2 * a.live;
  bend(c, 8, 28, 16, 38, 12, 47, '#c98a2e', 5);
  branchStub(c, -38, 28, 76, 9);
  c.save(); c.translate(0, -hop);
  ell(c, 0, 10, 17, 20, '#e09a34');
  [[-14, -4], [14, -4], [-16, 6], [16, 6], [0, -6]].forEach(([x, y]) => circ(c, x, y, 8, '#f2b84c'));
  ell(c, 0, 14, 9, 12, '#f6d38a');
  seg(c, [-12, 6, -13, 28], '#d8922e', 7); seg(c, [12, 6, 13, 28], '#d8922e', 7);
  circ(c, -14, -17, 4, '#f6d38a'); circ(c, 14, -17, 4, '#f6d38a');
  circ(c, 0, -18, 15, '#f2b84c');
  poly(c, [-4, -31, 0, -38, 4, -31], '#d58a2a');
  ell(c, 0, -15, 10, 9, '#a9d6f0');
  eye(c, -4, -17, 2.1); eye(c, 4, -17, 2.1);
  ell(c, 0, -12.5, 2.4, 1.4, '#6fa7c8');
  ell(c, 0, -8.5, 3.6, 1.8, '#e9a88a');
  c.restore();
}
function drawWolongSign(c) {
  woodSign(c, 80, 42, -15, 34, [
    [T('臥龍', 'Wolong'), T('900 17px "Noto Serif TC", serif', '700 16px "Playfair Display", serif'), '#5a3418', -4],
    [T('大熊貓保護區', 'Panda Reserve'), '700 8.5px "Noto Sans TC", sans-serif', '#7a4a24', 10]]);
  leafShape(c, -36, -34, 12, 3, -0.6, '#5aa04a'); leafShape(c, -36, -34, 10, 3, 0.2, '#6fae5a');
}

/* ===== 1-5 Outback ===== */
function spinifex(c, x, y, s) {
  c.strokeStyle = '#9a9a40'; c.lineWidth = 1.2;
  for (let k = 0; k < 9; k++) { const an = Math.PI + (k + 0.5) / 9 * Math.PI; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(an) * 17 * s, y + Math.sin(an) * 11 * s); c.stroke(); }
  c.beginPath(); c.ellipse(x, y, 13 * s, 8 * s, 0, Math.PI, TAU); c.fillStyle = '#b7b65a'; c.fill();
}
function bgOutback(c) {
  const R = mulberry(51);
  sky(c, [[0, '#3d9be0'], [0.72, '#a6d6f3'], [1, '#f6e2c4']], 250);
  circ(c, 300, 52, 34, 'rgba(255,246,200,.35)'); circ(c, 300, 52, 22, '#fff3c4');
  puffCloud(c, 110, 80, 0.55, 'rgba(255,255,255,.85)'); puffCloud(c, 220, 110, 0.4, 'rgba(255,255,255,.7)');
  c.beginPath(); c.moveTo(24, 242); c.bezierCurveTo(30, 200, 54, 184, 92, 179); c.lineTo(268, 176); c.bezierCurveTo(312, 178, 330, 206, 340, 242); c.closePath(); c.fillStyle = '#d6683a'; c.fill();
  for (let x = 66; x < 310; x += 22) bend(c, x, 184, x + 8, 210, x + 4, 238, 'rgba(150,50,20,.22)', 3);
  ell(c, 180, 183, 92, 5, 'rgba(255,190,130,.35)');
  hillBand(c, 236, 3, '#eb9655', 0.5, 80);
  hillBand(c, 262, 5, '#e2833f', 1.4);
  hillBand(c, 330, 6, '#d9773a', 2.4);
  c.beginPath(); c.moveTo(199, 250); c.lineTo(207, 250); c.quadraticCurveTo(232, 380, 322, 480); c.lineTo(198, 480); c.quadraticCurveTo(196, 360, 199, 250); c.closePath(); c.fillStyle = '#eba771'; c.fill();
  c.beginPath(); c.moveTo(203, 262); c.quadraticCurveTo(214, 380, 262, 480); stroke(c, 'rgba(255,230,200,.35)', 2);
  // ghost gum on the left
  ell(c, 24, 312, 16, 3, 'rgba(120,40,10,.25)'); fillRR(c, 18, 150, 12, 162, 6, '#f1ece2'); seg(c, [24, 196, 48, 182], '#f1ece2', 6); seg(c, [24, 170, 6, 140], '#f1ece2', 5);
  [[24, 128, 26, 14], [6, 138, 16, 10], [44, 142, 18, 10], [54, 176, 14, 8]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, '#8fae6a'));
  [[160, 296, 1], [330, 330, 1.2], [20, 360, 1.1], [330, 438, 1.3], [175, 470, 1], [36, 470, 1.2], [300, 262, 0.7], [150, 262, 0.6]].forEach(([x, y, s]) => spinifex(c, x, y, s));
  for (let i = 0; i < 40; i++) circ(c, R() * W, 270 + R() * 205, 1 + R() * 1.4, ['#b85a2a', '#f3b483'][i % 2]);
}
function drawKangaroo(c, a) {
  const hop = Math.abs(Math.sin(a.t * 3)) * a.live;
  groundShadow(c, 60 + hop * 8, 30 - hop * 6);
  c.beginPath(); c.moveTo(-8, 30); c.quadraticCurveTo(-24, 52, -44, 58); c.quadraticCurveTo(-22, 60, -2, 46); c.closePath(); c.fillStyle = '#cf9361'; c.fill();
  ell(c, 8, 58, 17, 4.5, '#b97a4c');
  ell(c, -4, 32, 18, 22, '#cf9361');
  ell(c, 4, 4, 15, 28, '#e6b583');
  ell(c, 10, 10, 8, 19, '#f7e3c4');
  circ(c, 12, 6, 6, '#e6b583'); ell(c, 9, -1, 2, 4, '#cf9361'); ell(c, 15, -1, 2, 4, '#cf9361'); eye(c, 13, 6, 1.4);
  c.beginPath(); c.arc(11, 10, 8, 0.15, Math.PI - 0.15); c.fillStyle = '#f7e3c4'; c.fill(); stroke(c, '#c98a55', 1.4);
  ell(c, 17, -8, 3.5, 9, '#cf9361', -0.5);
  ell(c, 5, -51, 4, 11, '#cf9361', -0.25); ell(c, 5, -50, 2, 7, '#f4b9c6', -0.25);
  ell(c, 14, -52, 4, 11, '#cf9361', 0.15); ell(c, 14, -51, 2, 7, '#f4b9c6', 0.15);
  ell(c, 11, -36, 11, 10, '#e6b583');
  ell(c, 21, -33, 9, 6.5, '#e6b583');
  circ(c, 29, -34, 2.4, '#3a2620');
  eye(c, 14, -39, 2.3); blush(c, 16, -30, 3.5, 2.2);
}
function drawEmu(c, a) {
  const bob = Math.sin(a.t * 2) * 3 * a.live;
  groundShadow(c, 66, 30);
  [[-8, -12], [8, 12]].forEach(([x0, x1]) => { seg(c, [x0, 24, x1, 64], '#8f8a80', 5); seg(c, [x1 - 8, 66, x1, 64, x1 + 8, 66], '#8f8a80', 2.5); });
  ell(c, -6, 8, 32, 24, '#7a6150');
  ell(c, -10, 0, 22, 10, 'rgba(255,255,255,.08)');
  for (let k = 0; k < 9; k++) { const x = -30 + k * 6.5, y = 10 + Math.sin(k * 1.7) * 6; bend(c, x, y, x - 3, y + 8, x - 2, y + 14, '#5e4a3c', 1.6); }
  bend(c, 16, 0, 26 + bob * 0.5, -24, 22 + bob, -48, '#8a98b8', 9);
  bend(c, 14, 2, 20, -6, 22, -14, '#7a6150', 10);
  ell(c, 26 + bob, -54, 9, 7.5, '#6a5848');
  ell(c, 28 + bob, -52, 5, 4, '#9fb4d8');
  poly(c, [33 + bob, -57, 42 + bob, -53.5, 33 + bob, -51], '#4a3f36');
  eye(c, 28 + bob, -56, 2.2);
}
function drawEmuChick(c, a) {
  const hop = Math.abs(Math.sin(a.t * 4)) * 2 * a.live;
  groundShadow(c, 26, 15);
  seg(c, [-3, 10, -4, 25], '#9a8f80', 2.5); seg(c, [4, 10, 5, 25], '#9a8f80', 2.5);
  c.save(); c.translate(0, -hop);
  c.save(); ell(c, -3, 4, 15, 11, '#efe2c4'); c.clip();
  [-5, 1, 7, 12].forEach((y) => seg(c, [-20, y, 14, y + 1], '#7a5a42', 2.4)); c.restore();
  seg(c, [6, 0, 10, -12], '#efe2c4', 6); seg(c, [5, -4, 11, -6], '#7a5a42', 1.6);
  circ(c, 12, -16, 7, '#efe2c4'); seg(c, [6, -20, 17, -21], '#7a5a42', 1.8);
  poly(c, [18, -17, 24, -15, 18, -13], '#6a5a48');
  eye(c, 14, -17, 1.8); blush(c, 13, -12, 2.4, 1.6);
  c.restore();
}
function drawGalah(c, a) {
  const bob = Math.sin(a.t * 2.8) * 1.6 * a.live;
  poly(c, [-6, 14, 4, 14, 1, 31, -8, 31], '#8f959e');
  branchStub(c, -34, 20, 68, 8);
  ell(c, 0, 4, 13, 17, '#ef7a98');
  ell(c, -6, 6, 9, 15, '#9aa0a8', 0.15);
  seg(c, [-3, 18, -3, 22], '#888', 2.4); seg(c, [4, 18, 4, 22], '#888', 2.4);
  c.save(); c.translate(0, bob);
  circ(c, 2, -15, 11, '#ef7a98');
  ell(c, 0, -23, 9, 5, '#f9cdd8');
  c.beginPath(); c.moveTo(10, -18); c.quadraticCurveTo(18, -16, 13, -9); c.lineTo(9, -11); c.closePath(); c.fillStyle = '#ece4d2'; c.fill();
  circ(c, 5, -17, 3.4, '#f6b0c0'); eye(c, 5, -17, 1.9);
  c.restore();
}
function drawThornyDevil(c, a) {
  groundShadow(c, 18, 28);
  poly(c, [-18, 2, -38, 10, -18, 10], '#c98a3e');
  [[-14, 12, 0.5], [10, 12, -0.5]].forEach(([x, y, r]) => ell(c, x, y, 4, 7, '#c98a3e', r));
  ell(c, 0, 4, 22, 12, '#d99a4a');
  ell(c, -8, 3, 6, 4, '#a85e2a'); ell(c, 7, 7, 5, 3.5, '#a85e2a'); ell(c, -1, -3, 4, 2.5, '#a85e2a');
  for (let k = 0; k < 9; k++) { const x = -18 + k * 4.5, y0 = 4 - 12 * Math.sqrt(Math.max(0, 1 - (x / 22) ** 2)); poly(c, [x - 2, y0 + 2, x, y0 - 5, x + 2, y0 + 2], '#b8732e'); }
  ell(c, 22, 2, 10, 8, '#d99a4a');
  poly(c, [16, -4, 18, -12, 21, -5], '#b8732e'); poly(c, [23, -5, 26, -11, 28, -3], '#b8732e');
  eye(c, 24, 0, 2.2);
  c.beginPath(); c.arc(25, 4, 4, 0.3, Math.PI - 0.6); stroke(c, '#7a4a24', 1.2);
  blush(c, 21, 6, 2.6, 1.6);
}
function drawRooSign(c) {
  groundShadow(c, 47, 14);
  fillRR(c, -3, -6, 6, 53, 2, '#9aa0a6');
  poly(c, [0, -49, 29, -20, 0, 9, -29, -20], '#222'); poly(c, [0, -45.5, 25.5, -20, 0, 5.5, -25.5, -20], '#f5c518');
  c.save(); c.translate(0, -20);
  bend(c, -5, 6, -12, 12, -18, 12, '#222', 3);
  ell(c, -1, 1, 6, 9, '#222', 0.5);
  ell(c, 5, -9, 4.2, 3, '#222', -0.2);
  ell(c, 3, -14, 1.2, 3.2, '#222', -0.2);
  ell(c, 3, 10, 7, 1.8, '#222');
  seg(c, [6, -3, 9, 0], '#222', 1.6);
  c.restore();
}

/* ===== 1-6 Honey garden ===== */
function bgHoney(c) {
  const R = mulberry(61);
  sky(c, [[0, '#a8dcfb'], [1, '#fff3dc']], 200);
  puffCloud(c, 80, 60, 0.7); puffCloud(c, 270, 90, 0.5);
  hillBand(c, 160, 8, '#c8daa4', 0.6, 60);
  ell(c, 236, 150, 6, 26, '#3f6a3a'); ell(c, 336, 152, 6, 24, '#3f6a3a'); ell(c, 40, 160, 5, 20, '#4a7a44');
  c.fillStyle = '#f1dcb8'; c.fillRect(256, 152, 62, 32);
  poly(c, [250, 154, 287, 136, 324, 154], '#d0704a');
  c.fillStyle = '#6aa7d8'; [[264, 160], [300, 160]].forEach(([x, y]) => { c.fillRect(x, y, 5, 9); c.fillRect(x + 9, y, 5, 9); });
  c.fillStyle = '#c9925a'; c.fillRect(283, 168, 9, 16);
  c.fillStyle = '#8fbf5a'; c.fillRect(0, 182, W, H - 182);
  for (let i = -9; i <= 9; i++) { // lavender rows: little mounds that grow towards us
    const tx = 180 + i * 6, bx = 180 + i * 46;
    poly(c, [tx - 1.2, 186, tx + 1.2, 186, bx + 13, H, bx - 13, H], '#8a6cc2');
    for (let k = 0; k < 22; k++) {
      const u = k / 21, e = u * u, y = 186 + (H - 186) * e, x = tx + (bx - tx) * e, r = 1.5 + e * 15;
      ell(c, x, y - r * 0.3, r, r * 0.7, '#9b7bd0'); ell(c, x - r * 0.25, y - r * 0.6, r * 0.5, r * 0.3, '#b89ae8');
      if (k > 8 && k % 2) for (let j = -1; j <= 1; j++) circ(c, x + j * r * 0.5, y - r * 0.85 - Math.abs(j) * -r * 0.15, 0.6 + e * 1.4, '#d4c0f7');
    }
  }
  ell(c, 180, 368, 140, 9, 'rgba(60,40,80,.2)');
  fillRR(c, 72, 332, 8, 34, 2, '#8a5a34'); fillRR(c, 280, 332, 8, 34, 2, '#8a5a34');
  fillRR(c, 56, 324, 248, 11, 4, '#b07a44'); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(60, 326, 240, 2);
  c.setLineDash([3, 5]); bend(c, 120, 230, 160, 160, 210, 190, 'rgba(120,90,40,.4)', 1.4); bend(c, 250, 230, 280, 200, 296, 166, 'rgba(120,90,40,.4)', 1.4); c.setLineDash([]);
  [[24, 430], [58, 466], [320, 440], [344, 470], [292, 472], [110, 474]].forEach(([x, y], i) => { seg(c, [x, y + 14, x, y], '#4f8a3a', 2); leafShape(c, x, y + 8, 10, 3, i % 2 ? -0.5 : 3.6, '#4f8a3a'); [0, 1, 2, 3, 4].forEach((k) => circ(c, x + Math.cos(k * 1.256) * 5, y + Math.sin(k * 1.256) * 5, 4, '#e8463a')); circ(c, x, y, 2.6, '#2b2b2b'); });
  for (let i = 0; i < 20; i++) circ(c, R() * W, 380 + R() * 95, 1.6, ['#fff', '#ffd84d'][i % 2]);
}
function drawHive(c, a, col) {
  const L = 0.3 + 0.7 * a.live;
  fillRR(c, -30, 34, 6, 10, 2, '#7a4a24'); fillRR(c, 24, 34, 6, 10, 2, '#7a4a24');
  fillRR(c, -32, 4, 64, 31, 3, col); fillRR(c, -32, -25, 64, 28, 3, col);
  c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(-30, -23, 60, 3); c.fillRect(-30, 6, 60, 3);
  c.fillStyle = 'rgba(0,0,0,.14)'; c.fillRect(-32, 2, 64, 2.5);
  fillRR(c, -10, -15, 20, 5, 2.5, 'rgba(0,0,0,.16)'); fillRR(c, -10, 13, 20, 5, 2.5, 'rgba(0,0,0,.16)');
  fillRR(c, -38, -29, 76, 6, 2, '#b85a38'); poly(c, [-36, -27, 0, -44, 36, -27], '#d8734a');
  fillRR(c, -14, 26, 28, 5, 2, '#5a3a1a'); fillRR(c, -18, 31, 36, 3, 1, '#c9925a');
  for (let k = 0; k < 5; k++) circ(c, 20 + Math.cos(k * 1.256) * 3.4, -8 + Math.sin(k * 1.256) * 3.4, 2.4, '#fff');
  circ(c, 20, -8, 1.8, '#ffd23f');
  for (let k = 0; k < 2; k++) { const bx = Math.sin(a.t * 3 + k * 2.5) * 14 * L, by = 20 + Math.cos(a.t * 4 + k) * 4 * L - k * 8; ell(c, bx, by, 2.8, 2, '#f8c537'); c.fillStyle = '#2b2b2b'; c.fillRect(bx - 0.6, by - 2, 1.2, 4); ell(c, bx - 0.5, by - 2.6, 1.8, 1.2, 'rgba(255,255,255,.8)'); }
}
function drawBee(c, a) {
  const fl = 1 - Math.abs(Math.sin(a.t * 26)) * 0.4 * a.live;
  c.save(); ell(c, -2, 4, 15, 11, '#f8c537'); c.clip(); c.fillStyle = '#2b2b2b'; c.fillRect(-8, -8, 5, 24); c.fillRect(2, -8, 5, 24); c.restore();
  poly(c, [-17, 3, -22, 5, -17, 7], '#2b2b2b');
  circ(c, 14, 1, 8, '#2e2a28');
  circ(c, 17, 0, 2.4, '#fff'); circ(c, 17.5, 0.4, 1.3, '#111');
  blush(c, 15, 5, 2.4, 1.5);
  bend(c, 15, -6, 16, -14, 20, -16, '#2e2a28', 1.4); bend(c, 11, -6, 9, -14, 12, -18, '#2e2a28', 1.4);
  c.save(); c.translate(-2, -8); c.scale(1, fl);
  ell(c, -4, -6, 8, 11, 'rgba(220,240,255,.85)', -0.4); ell(c, 5, -7, 7, 10, 'rgba(235,248,255,.9)', 0.3);
  c.restore();
}
function drawBumblebee(c, a) {
  const fl = 1 - Math.abs(Math.sin(a.t * 22)) * 0.4 * a.live;
  c.save(); c.translate(-2, -8); c.scale(1, fl);
  ell(c, -6, -8, 9, 12, 'rgba(220,240,255,.85)', -0.4); ell(c, 5, -9, 8, 11, 'rgba(235,248,255,.9)', 0.3);
  c.restore();
  c.save(); circ(c, -2, 6, 17, '#f5b82e'); c.clip(); c.fillStyle = '#2b2b2b'; c.fillRect(-12, -14, 9, 40); c.fillStyle = '#fff6e0'; c.fillRect(-22, -14, 7, 40); c.restore();
  c.fillStyle = 'rgba(255,255,255,.35)'; for (let k = 0; k < 8; k++) { c.beginPath(); c.arc(-2 + Math.cos(k * 0.8) * 13, 6 + Math.sin(k * 0.8) * 13, 1.2, 0, TAU); c.fill(); }
  circ(c, 16, 4, 9, '#2e2a28');
  circ(c, 19, 3, 2.6, '#fff'); circ(c, 19.6, 3.4, 1.4, '#111');
  blush(c, 17, 9, 2.4, 1.5);
  bend(c, 17, -4, 18, -12, 22, -14, '#2e2a28', 1.4);
}
function drawLadybug(c, a) {
  const cr = Math.sin(a.t * 1.3) * 4 * a.live;
  leafShape(c, -34, 12, 68, 14, 0, '#5fae4a', '#3f8a34');
  c.save(); c.translate(cr, 0);
  [-9, -1, 7].forEach((x) => seg(c, [x, 6, x - 3, 11], '#2b2b2b', 1.6));
  circ(c, 16, 1, 7.5, '#2b2b2b'); circ(c, 19, -1, 1.8, '#fff'); circ(c, 15, -1.5, 1.5, '#fff');
  bend(c, 18, -5, 20, -11, 24, -12, '#2b2b2b', 1.2);
  ell(c, -1, -1, 17, 12, '#e2352b');
  seg(c, [-1, -12, -1, 10], '#2b2b2b', 1.4);
  [[-10, -4, 3], [8, -5, 3], [-6, 4, 2.4], [5, 4, 2.4], [-3, -8, 1.8], [12, 2, 1.8]].forEach(([x, y, r]) => circ(c, x, y, r, '#2b2b2b'));
  ell(c, -7, -7, 4, 2, 'rgba(255,255,255,.45)', -0.4);
  c.restore();
}
function drawButterfly(c, a) {
  const op = 1 - (1 - Math.abs(Math.cos(a.t * 5))) * 0.5 * a.live;
  c.save(); c.scale(op, 1);
  [[-1, '#ff9f43', '#ffd166'], [1, '#ff9f43', '#ffd166']].forEach(([d, up, lo]) => {
    ell(c, d * 16, -9, 16, 14, up, d * -0.5); ell(c, d * 12, 11, 11, 10, lo, d * 0.4);
    circ(c, d * 20, -12, 3.2, '#fff6ea'); circ(c, d * 14, 12, 2.4, '#fff6ea'); ell(c, d * 26, -16, 3, 2, '#e8713a', d * -0.5);
  });
  c.restore();
  fillRR(c, -2.5, -17, 5, 32, 2.5, '#4a3a3a');
  bend(c, -1, -16, -4, -24, -9, -27, '#4a3a3a', 1.3); bend(c, 1, -16, 4, -24, 9, -27, '#4a3a3a', 1.3);
  circ(c, -9, -27, 1.8, '#4a3a3a'); circ(c, 9, -27, 1.8, '#4a3a3a');
  circ(c, -1.2, -14, 0.9, '#fff'); circ(c, 1.2, -14, 0.9, '#fff');
}

/* ===== 1-7 Night forest ===== */
function bgNight(c) {
  const R = mulberry(71);
  sky(c, [[0, '#18214a'], [0.6, '#2c3a6e'], [1, '#3d4f7a']], H);
  for (let i = 0; i < 55; i++) { const x = R() * W, y = R() * 240, r = 0.5 + R() * 1.2; circ(c, x, y, r, `rgba(255,255,230,${(0.45 + R() * 0.5).toFixed(2)})`); }
  circ(c, 300, 78, 54, 'rgba(255,240,190,.08)'); circ(c, 300, 78, 42, 'rgba(255,240,190,.14)'); circ(c, 300, 78, 31, '#fff3c4');
  circ(c, 290, 70, 5, 'rgba(225,205,150,.45)'); circ(c, 311, 90, 4, 'rgba(225,205,150,.45)'); circ(c, 307, 66, 2.6, 'rgba(225,205,150,.45)');
  for (let i = 0; i < 12; i++) circ(c, i * 32 + R() * 10, 256 + R() * 8, 22 + R() * 12, '#253463');
  hillBand(c, 262, 8, '#253463', 0.5, 40);
  hillBand(c, 300, 8, '#26365e', 2.0, 50);
  hillBand(c, 340, 6, '#2b3f62', 1.2);
  hillBand(c, 392, 5, '#30476a', 0.4);
  c.beginPath(); c.moveTo(150, 480); c.quadraticCurveTo(200, 400, 170, 340); c.lineTo(182, 340); c.quadraticCurveTo(230, 410, 230, 480); c.closePath(); c.fillStyle = 'rgba(200,215,245,.10)'; c.fill();
  fillRR(c, -10, 0, 44, 352, 10, '#1d2546'); fillRR(c, 334, 0, 40, 346, 10, '#1d2546');
  ell(c, 14, 352, 26, 5, '#1a2140'); ell(c, 350, 346, 20, 4, '#1a2140');
  c.beginPath(); c.moveTo(28, 158); c.quadraticCurveTo(140, 156, 252, 166); c.lineTo(254, 176); c.quadraticCurveTo(140, 170, 28, 184); c.closePath(); c.fillStyle = '#3b3158'; c.fill();
  seg(c, [248, 170, 268, 156], '#3b3158', 4); [[270, 152, 0.4], [262, 160, 2.2], [274, 160, 1.0]].forEach(([x, y, r]) => leafShape(c, x, y, 12, 4, r, '#2e4a6a'));
  ell(c, 140, 160, 80, 2, 'rgba(255,240,200,.12)');
  tufts(c, R, 50, 350, 476, 'rgba(140,170,220,.25)', 6);
  [[36, 462, '#e8665a'], [340, 456, '#e8665a'], [176, 470, '#f2a65a']].forEach(([x, y, col]) => { fillRR(c, x - 2.5, y - 8, 5, 10, 2, '#efe6d6'); c.beginPath(); c.ellipse(x, y - 8, 9, 6, 0, Math.PI, TAU); c.fillStyle = col; c.fill(); circ(c, x - 3, y - 11, 1.4, '#fff'); circ(c, x + 3, y - 10, 1.1, '#fff'); });
  [[60, 250], [180, 230], [210, 330], [320, 210], [140, 380], [300, 380], [40, 300], [250, 450]].forEach(([x, y]) => { circ(c, x, y, 7, 'rgba(255,240,140,.16)'); circ(c, x, y, 3.5, 'rgba(255,240,140,.35)'); circ(c, x, y, 1.6, '#fff6a8'); });
}
function drawOwl(c, a) {
  const shut = a.live > 0.5 && Math.sin(a.t * 1.3) > 0.95, sway = Math.sin(a.t * 1.2) * 1.5 * a.live;
  c.save(); c.translate(sway, 0);
  ell(c, -22, 8, 9, 22, '#8a5f38', 0.15); ell(c, 22, 8, 9, 22, '#8a5f38', -0.15);
  poly(c, [-6, -28, 0, -35, 6, -28], '#a8784a');
  ell(c, 0, 4, 26, 34, '#a8784a');
  ell(c, 0, 14, 16, 20, '#e6c79a');
  [[-6, 8], [6, 8], [0, 16], [-8, 22], [8, 22], [0, 28]].forEach(([x, y]) => seg(c, [x - 3, y - 2, x, y + 1, x + 3, y - 2], '#b88a5a', 1.4));
  circ(c, -10, -14, 12, '#e8cfa4'); circ(c, 10, -14, 12, '#e8cfa4');
  if (shut) { bend(c, -16, -14, -10, -10, -4, -14, '#1e1a18', 2); bend(c, 4, -14, 10, -10, 16, -14, '#1e1a18', 2); }
  else { circ(c, -10, -14, 7, '#1e1a18'); circ(c, 10, -14, 7, '#1e1a18'); circ(c, -12, -16.5, 2.4, '#fff'); circ(c, 8, -16.5, 2.4, '#fff'); circ(c, -8, -11.5, 1, '#fff'); circ(c, 12, -11.5, 1, '#fff'); }
  poly(c, [-3.5, -6, 3.5, -6, 0, 1], '#e9b33e');
  blush(c, -16, -4, 3.5, 2); blush(c, 16, -4, 3.5, 2);
  [-8, 8].forEach((x) => { circ(c, x - 3, 38, 2.4, '#e9b33e'); circ(c, x, 39, 2.4, '#e9b33e'); circ(c, x + 3, 38, 2.4, '#e9b33e'); });
  c.restore();
}
function drawOwlet(c, a) {
  const bob = Math.abs(Math.sin(a.t * 2.2)) * 1.5 * a.live;
  c.save(); c.translate(0, -bob);
  for (let k = 0; k < 12; k++) { const an = k / 12 * TAU; circ(c, Math.cos(an) * 17, 4 + Math.sin(an) * 21, 4, '#e2d4bc'); }
  ell(c, 0, 4, 18, 22, '#efe4d2');
  poly(c, [-4, -18, 0, -24, 4, -18], '#e2d4bc');
  circ(c, -7, -6, 8, '#fbf6ec'); circ(c, 7, -6, 8, '#fbf6ec');
  circ(c, -7, -6, 5, '#1e1a18'); circ(c, 7, -6, 5, '#1e1a18'); circ(c, -8.5, -8, 1.8, '#fff'); circ(c, 5.5, -8, 1.8, '#fff');
  poly(c, [-2.5, 0, 2.5, 0, 0, 5], '#e9b33e');
  blush(c, -12, 3, 3, 1.8); blush(c, 12, 3, 3, 1.8);
  c.restore();
  [-6, 6].forEach((x) => { circ(c, x - 2, 26, 2, '#e9b33e'); circ(c, x + 2, 26, 2, '#e9b33e'); });
}
function drawBat(c, a) {
  const f = Math.sin(a.t * 10) * a.live;
  [-1, 1].forEach((d) => {
    c.beginPath(); c.moveTo(d * 6, -4); c.lineTo(d * 34, -12 + f * 8); c.quadraticCurveTo(d * 31, -2 + f * 5, d * 25, 2 + f * 4);
    c.quadraticCurveTo(d * 21, 2 + f * 2, d * 17, 9 + f * 2); c.quadraticCurveTo(d * 12, 6, d * 6, 10); c.closePath(); c.fillStyle = '#5b4f73'; c.fill();
    seg(c, [d * 7, -3, d * 33, -11 + f * 8], '#4a3f5e', 1.4);
  });
  poly(c, [-8, -9, -6, -21, -1, -12], '#4a3f5e'); poly(c, [8, -9, 6, -21, 1, -12], '#4a3f5e');
  poly(c, [-6.5, -11, -5.5, -17, -3, -12], '#c98aa0'); poly(c, [6.5, -11, 5.5, -17, 3, -12], '#c98aa0');
  ell(c, 0, 3, 9, 11, '#4a3f5e'); ell(c, 0, 6, 5, 7, '#6e628a');
  circ(c, 0, -8, 8, '#4a3f5e');
  circ(c, -3, -9, 2.2, '#fff'); circ(c, 3, -9, 2.2, '#fff'); circ(c, -2.6, -8.6, 1.2, '#111'); circ(c, 3.4, -8.6, 1.2, '#111');
  poly(c, [0.5, -4, 2.5, -4, 1.5, -2], '#fff');
  blush(c, -5, -5, 2.2, 1.3); blush(c, 5, -5, 2.2, 1.3);
}
function drawFox(c, a) {
  const sw = Math.sin(a.t * 2.2) * a.live;
  groundShadow(c, 34, 44);
  [[-30, '#2f2626'], [10, '#2f2626'], [-20, '#3a2e2e'], [20, '#3a2e2e']].forEach(([x, col]) => fillRR(c, x, 6, 7, 28, 3, col));
  c.save(); c.translate(-26, -2); c.rotate(-0.35 + sw * 0.15);
  ell(c, -12, 0, 17, 9, '#e8772e'); ell(c, -25, 0, 6, 6, '#fff6ea');
  c.restore();
  ell(c, -4, 4, 28, 14, '#e8772e');
  ell(c, -6, -4, 20, 5, 'rgba(255,255,255,.15)');
  ell(c, 16, 6, 9, 10, '#fff6ea');
  poly(c, [18, -18, 20, -34, 30, -20], '#e8772e'); poly(c, [21, -20, 22, -29, 27, -21], '#3a2a2a');
  poly(c, [28, -20, 36, -34, 39, -16], '#e8772e'); poly(c, [31, -20, 36, -29, 37, -18], '#3a2a2a');
  ell(c, 28, -10, 13, 11, '#e8772e');
  poly(c, [34, -15, 51, -8, 34, -1], '#e8772e');
  ell(c, 34, -4, 10, 5.5, '#fff6ea');
  circ(c, 50, -8, 2.6, '#2b2222');
  eye(c, 32, -13, 2.2); blush(c, 28, -5, 3, 2);
}
function drawBadger(c, a) {
  const sn = Math.sin(a.t * 5) * a.live;
  groundShadow(c, 30, 46);
  [-36, -24, 12, 24].forEach((x) => fillRR(c, x, 6, 9, 22, 3, '#2a2a2e'));
  ell(c, -6, 4, 38, 18, '#9a9aa2');
  ell(c, -8, -6, 30, 8, '#b2b2ba');
  bend(c, -42, 0, -50, 2, -52, 6, '#9a9aa2', 5);
  c.save(); c.translate(0, sn * 1.2);
  circ(c, 20, -10, 4, '#f4f2ec'); circ(c, 20, -10, 2, '#2a2a2e');
  c.save(); c.beginPath(); c.ellipse(30, 2, 17, 11, 0, 0, TAU); c.moveTo(40, -7); c.lineTo(54, 3); c.lineTo(40, 11); c.closePath(); c.fillStyle = '#f4f2ec'; c.fill(); c.clip();
  seg(c, [16, -3, 52, 2], '#2a2a2e', 7); c.restore();
  circ(c, 33, -2, 1.9, '#fff'); circ(c, 33.4, -1.6, 1, '#111');
  circ(c, 53, 3, 2.6, '#2a2a2e');
  blush(c, 36, 6, 3, 1.8);
  c.restore();
}
function drawHedgehog(c, a) {
  const nw = Math.sin(a.t * 8) * 0.8 * a.live;
  groundShadow(c, 21, 28);
  circ(c, -12, 17, 3, '#5a4030'); circ(c, 8, 17, 3, '#5a4030');
  for (let k = 0; k < 17; k++) {
    const an = Math.PI * 0.98 + k / 16 * Math.PI * 1.04, b0 = an - 0.14, b1 = an + 0.14;
    poly(c, [-4 + Math.cos(b0) * 22, 4 + Math.sin(b0) * 13, -4 + Math.cos(an) * 31, 4 + Math.sin(an) * 21, -4 + Math.cos(b1) * 22, 4 + Math.sin(b1) * 13], k % 2 ? '#6e4f36' : '#8a6a4a');
  }
  ell(c, -4, 6, 24, 13, '#8d6a48');
  ell(c, 16, 9, 13, 8.5, '#efd8b0');
  circ(c, 11, 1, 3.4, '#d9b98a');
  ell(c, 26 + nw, 9, 5, 3.5, '#efd8b0'); circ(c, 31 + nw, 8, 2.8, '#2b2220');
  eye(c, 19, 5, 2.1); blush(c, 18, 12, 2.8, 1.7);
}
function drawForestSign(c) {
  woodSign(c, 76, 36, -15, 33, [
    [T('新森林', 'New Forest'), T('900 14px "Noto Serif TC", serif', '700 13px "Playfair Display", serif'), '#4a2c14', -4],
    [T('國家公園', 'National Park'), '700 8px "Noto Sans TC", sans-serif', '#5a3418', 8]], '#b98a58', '#8a5f38');
}

/* ===== 1-8 Sky of birds ===== */
function bgWetland(c) {
  const R = mulberry(81);
  sky(c, [[0, '#7cc6f0'], [0.65, '#cfeaf6'], [1, '#ffe9cf']], 324);
  circ(c, 62, 300, 34, 'rgba(255,230,180,.45)'); circ(c, 62, 300, 22, '#fff0c8');
  puffCloud(c, 250, 60, 0.6); puffCloud(c, 40, 196, 0.42); puffCloud(c, 196, 206, 0.32, 'rgba(255,255,255,.85)');
  c.strokeStyle = 'rgba(70,80,100,.45)'; c.lineWidth = 1.2;
  [[200, 40], [212, 34], [224, 42], [188, 46]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x - 4, y - 2); c.quadraticCurveTo(x - 2, y - 4, x, y); c.quadraticCurveTo(x + 2, y - 4, x + 4, y - 2); c.stroke(); });
  for (let x = -6; x < W + 10; x += 13) circ(c, x, 316 + Math.sin(x) * 2, 8 + (Math.sin(x * 7.1) + 1) * 4, '#5e8f5a');
  c.fillStyle = '#5e8f5a'; c.fillRect(0, 316, W, 10);
  const g = c.createLinearGradient(0, 324, 0, H); g.addColorStop(0, '#b5e0ea'); g.addColorStop(1, '#7cc0d2'); c.fillStyle = g; c.fillRect(0, 324, W, H - 324);
  for (let i = 0; i < 18; i++) { const y = 334 + R() * 140, x = R() * W; seg(c, [x, y, x + 18 + R() * 20, y], 'rgba(255,255,255,.45)', 1.4); }
  c.beginPath(); c.moveTo(140, 480); c.quadraticCurveTo(250, 420, 360, 396); c.lineTo(360, 480); c.closePath(); c.fillStyle = '#d6c08f'; c.fill();
  c.beginPath(); c.moveTo(140, 480); c.quadraticCurveTo(250, 420, 360, 396); stroke(c, '#9cc06a', 4);
  [[16, 470], [40, 452], [132, 470], [346, 420], [10, 330], [180, 340]].forEach(([x, y]) => { for (let k = -2; k <= 2; k++) { bend(c, x + k * 3, y, x + k * 4, y - 14, x + k * 6, y - 24 - Math.abs(k) * -3, '#7da35a', 1.6); } fillRR(c, x - 2, y - 30, 4, 9, 2, '#8a5a3a'); });
  [[34, '#8a7a6a'], [336, '#8a7a6a']].forEach(([x, col]) => { fillRR(c, x - 3, 222, 6, 104, 2, col); fillRR(c, x - 12, 228, 24, 4, 2, col); ell(c, x, 326, 8, 2, 'rgba(255,255,255,.4)'); });
  c.beginPath(); c.moveTo(34, 230); c.quadraticCurveTo(185, 290, 336, 230); stroke(c, '#4a4a52', 1.4);
  c.beginPath(); c.moveTo(34, 230); c.quadraticCurveTo(185, 278, 336, 230); stroke(c, 'rgba(74,74,82,.35)', 1);
}
function flapWing(c, x0, x1, tx, ty, col) { c.beginPath(); c.moveTo(x0, -1); c.quadraticCurveTo(x0 - 2, ty * 0.6, tx, ty); c.quadraticCurveTo(x1 + 2, ty * 0.45, x1, -1); c.closePath(); c.fillStyle = col; c.fill(); c.strokeStyle = 'rgba(60,70,90,.18)'; c.lineWidth = 1; c.stroke(); }
function drawSpoonbill(c, a) {
  const f = Math.sin(a.t * 5) * a.live;
  flapWing(c, -14, 8, -2, -12 - 12 * f, '#dcdcd2');
  seg(c, [-26, 3, -48, 5], '#2b2b2b', 2); seg(c, [-26, 5, -46, 8], '#2b2b2b', 2);
  poly(c, [-26, -3, -36, 0, -26, 4], '#f0f0e8');
  ell(c, -6, 0, 24, 9, '#fbfbf6');
  seg(c, [14, -2, 32, -4], '#fbfbf6', 7);
  circ(c, 34, -4, 7, '#fbfbf6');
  circ(c, 38, -4, 5, '#2b2b2b');
  seg(c, [41, -3, 55, -1], '#2b2b2b', 3.2); ell(c, 56, -1, 4, 3, '#2b2b2b');
  circ(c, 36.5, -5, 1.3, '#fff');
  blush(c, 33, 0, 2.6, 1.6);
  flapWing(c, -12, 10, -10, -18 - 10 * f, '#fbfbf6'); seg(c, [-10, -18 - 10 * f, -4, -12 - 6 * f], '#2b2b2b', 1.2);
}
function drawEgret(c, a) {
  const f = Math.sin(a.t * 5 + 1.6) * a.live;
  flapWing(c, -14, 6, -4, -12 - 11 * f, '#dcdcd2');
  seg(c, [-20, 2, -44, 4], '#2b2b2b', 2); ell(c, -46, 4, 3.5, 1.8, '#f2c230');
  ell(c, -4, 0, 20, 8, '#fbfbf6');
  c.beginPath(); c.moveTo(12, -2); c.quadraticCurveTo(22, -16, 26, -6); stroke(c, '#fbfbf6', 6);
  ell(c, 28, -7, 6.5, 5, '#fbfbf6');
  seg(c, [32, -7, 50, -5], '#2b2b2b', 2.4);
  circ(c, 30, -8, 2, '#f2d84a'); circ(c, 30, -8, 1.1, '#111');
  flapWing(c, -12, 8, -12, -17 - 10 * f, '#fbfbf6');
}
function drawSwallow(c, a, flip) {
  const hop = Math.abs(Math.sin(a.t * 4)) * 1.5 * a.live;
  c.save(); if (flip) c.scale(-1, 1); c.translate(0, -hop);
  poly(c, [-6, 4, -23, 20, -10, 6], '#24335e'); poly(c, [-6, 6, -18, 23, -4, 8], '#2a3b6e');
  ell(c, 1, 5, 11, 10, '#f6ead8');
  ell(c, -3, 0, 12, 7, '#2a3b6e', 0.45);
  circ(c, 6, -8, 8, '#2a3b6e');
  ell(c, 10, -3, 5, 4, '#c4502f'); ell(c, 12, -12, 2.6, 2, '#c4502f');
  poly(c, [13, -10, 19, -8, 13, -6.5], '#2b2b2b');
  eye(c, 9, -10, 1.8); blush(c, 6, -4, 2, 1.3);
  seg(c, [-1, 13, -1, 16], '#5a4a4a', 1.6); seg(c, [3, 13, 3, 16], '#5a4a4a', 1.6);
  c.restore();
}
function drawKingfisher(c, a) {
  const bob = Math.sin(a.t * 2.5) * 1.2 * a.live;
  ell(c, 0, 42, 15, 2.6, 'rgba(255,255,255,.55)');
  fillRR(c, -7, 4, 14, 39, 3, '#8a6a48'); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(-7, 16, 14, 2); c.fillRect(-7, 30, 14, 2);
  ell(c, 0, 4, 7, 2.2, '#a8875e');
  seg(c, [-2, 0, -2, 4], '#e04a3a', 2); seg(c, [3, 0, 3, 4], '#e04a3a', 2);
  poly(c, [-6, -2, -15, 7, -3, 2], '#1f8ac6');
  ell(c, 1, -8, 10, 12, '#f08a3a');
  ell(c, -3, -10, 8, 12, '#1f9ad6', 0.15);
  c.save(); c.translate(0, bob);
  circ(c, 2, -22, 8.5, '#1f9ad6');
  ell(c, 5, -18, 4.5, 2.6, '#f08a3a'); ell(c, 6, -14.5, 3.5, 2, '#fff');
  poly(c, [8, -24, 23, -21, 8, -19], '#2b2b2b');
  eye(c, 4, -23, 2);
  c.restore();
}
function drawStilt(c, a) {
  const st = Math.max(0, Math.sin(a.t * 1.6)) * a.live;
  ell(c, -5, 52, 12, 2.4, 'rgba(255,255,255,.55)'); ell(c, 8, 52, 9, 2, 'rgba(255,255,255,.4)');
  seg(c, [-2, -4, -5, 51], '#f07c9a', 2.4);
  seg(c, [4, -4, 6 + st * 6, 24 - st * 4, 7 + st * 2, 51 - st * 14], '#f07c9a', 2.4);
  poly(c, [-16, -12, -26, -6, -16, -6], '#2b2b33');
  ell(c, 0, -10, 18, 8, '#fbfbf6');
  ell(c, -4, -13, 16, 6, '#2b2b33', -0.08);
  seg(c, [12, -14, 16, -22], '#fbfbf6', 6);
  circ(c, 17, -24, 6, '#fbfbf6');
  seg(c, [22, -24, 34, -22], '#2b2b2b', 1.6);
  eye(c, 19, -25, 1.8); blush(c, 16, -20, 2.2, 1.3);
}
function drawBirdSign(c) {
  woodSign(c, 96, 40, -13, 33, [
    [T('七股濕地', 'Qigu Wetland'), T('900 15px "Noto Sans TC", sans-serif', '700 14px "Playfair Display", serif'), '#4a2c14', -5],
    [T('賞鳥請保持安靜', 'Quiet, birds resting'), '700 8px "Noto Sans TC", sans-serif', '#5a3418', 9]]);
}

/* ===== 1-9 Pet apartment ===== */
function bgPets(c) {
  const R = mulberry(91);
  sky(c, [[0, '#a9dcfa'], [1, '#e8f6ff']], H);
  puffCloud(c, 60, 22, 0.45); puffCloud(c, 306, 18, 0.4);
  fillRR(c, 12, 36, 336, 412, 6, '#f2a98f');
  fillRR(c, 6, 28, 348, 12, 4, '#d9826a');
  const rooms = [[20, 50, 156, 142, '#fff1c9', '#f6e2a8'], [184, 50, 156, 142, '#d8eefc', '#bfe0f6'], [20, 200, 156, 112, '#ffe0e6', '#ffc9d4'], [184, 200, 156, 112, '#e3f6d8', '#cbeebc'], [20, 320, 156, 112, '#efe3ff', '#dccaf8'], [184, 320, 156, 112, '#ffe8cf', '#ffd6ad']];
  rooms.forEach(([x, y, w, h, wall, pat], i) => {
    c.fillStyle = wall; c.fillRect(x, y, w, h);
    c.fillStyle = pat;
    if (i % 2) for (let xx = x + 8; xx < x + w; xx += 16) c.fillRect(xx, y, 5, h - 12);
    else for (let yy = y + 10; yy < y + h - 14; yy += 16) for (let xx = x + 8 + (yy / 16 % 2) * 8; xx < x + w; xx += 16) circ(c, xx, yy, 2, pat);
    c.fillStyle = '#d9a877'; c.fillRect(x, y + h - 10, w, 10);
    c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(x, y + h - 10, w, 2);
    c.fillStyle = 'rgba(0,0,0,.06)'; c.fillRect(x, y, w, 4);
  });
  c.fillStyle = '#e9a48c'; c.fillRect(176, 50, 8, 382);
  // F3 left: window, hook, plant
  fillRR(c, 132, 66, 36, 46, 3, '#fff'); c.fillStyle = '#bfe6ff'; c.fillRect(135, 69, 30, 40); c.fillStyle = '#fff'; c.fillRect(149, 69, 2, 40); c.fillRect(135, 88, 30, 2);
  seg(c, [99, 50, 99, 70], '#a08a5a', 1.6);
  fillRR(c, 144, 168, 18, 14, 3, '#d9734a'); [[-0.6], [0.2], [1.0], [-1.4], [2.2]].forEach(([r], k) => leafShape(c, 153, 168, 14, 4, -1.57 + r * 0.6, k % 2 ? '#5aa04a' : '#6fbf5a'));
  // F3 right: nail + wire for the two photos, sofa
  circ(c, 262, 62, 2, '#8a5a34'); seg(c, [230, 74, 262, 62, 294, 74], '#8a5a34', 1.2);
  fillRR(c, 196, 150, 136, 24, 8, '#7fb3d5'); fillRR(c, 192, 160, 12, 24, 5, '#6aa0c8'); fillRR(c, 324, 160, 12, 24, 5, '#6aa0c8'); fillRR(c, 200, 164, 128, 18, 6, '#8fc0e0');
  fillRR(c, 214, 150, 26, 16, 6, '#ffd166');
  // F2 left: shelf for the cat, cat bed, scratching post
  fillRR(c, 20, 268, 62, 6, 2, '#c98e5a'); poly(c, [26, 274, 26, 290, 40, 274], '#b07a44');
  ell(c, 46, 302, 20, 6, '#f4a7b9'); ell(c, 46, 300, 14, 3.5, '#ffd0dc');
  fillRR(c, 163, 252, 9, 50, 2, '#e3c79a'); fillRR(c, 159, 298, 17, 6, 2, '#c98e5a'); fillRR(c, 158, 248, 18, 6, 2, '#c98e5a');
  // F2 right: window, table for the bowl, seed dish
  fillRR(c, 196, 214, 34, 34, 3, '#fff'); c.fillStyle = '#bfe6ff'; c.fillRect(199, 217, 28, 28);
  fillRR(c, 266, 290, 68, 6, 2, '#c98e5a'); fillRR(c, 272, 296, 5, 16, 1, '#b07a44'); fillRR(c, 323, 296, 5, 16, 1, '#b07a44');
  ell(c, 252, 306, 9, 3, '#7fb3d5');
  // F1 left: rug, carrots
  ell(c, 99, 426, 46, 6, '#c7e7a6');
  ell(c, 152, 424, 11, 4, '#7fb3d5'); [[-4, -0.5], [2, 0.3]].forEach(([dx, r]) => { c.save(); c.translate(152 + dx, 418); c.rotate(r); poly(c, [-2.5, 0, 2.5, 0, 0, 10], '#ff9a3c'); leafShape(c, 0, 0, 6, 2, -1.8, '#5aa04a'); c.restore(); });
  fillRR(c, 30, 338, 32, 40, 3, '#fff'); c.fillStyle = '#bfe6ff'; c.fillRect(33, 341, 26, 34);
  // F1 right: dog bed, bowl with bone, lamp
  ell(c, 300, 428, 34, 5, '#e8836a');
  fillRR(c, 196, 418, 16, 8, 3, '#e85a5a'); seg(c, [199, 416, 209, 416], '#fff', 3); circ(c, 198, 416, 2, '#fff'); circ(c, 210, 416, 2, '#fff');
  seg(c, [324, 330, 324, 350], '#6a5a4a', 1.4); poly(c, [314, 350, 334, 350, 330, 340, 318, 340], '#ffd166');
  // street
  c.fillStyle = '#cfd4d9'; c.fillRect(0, 446, W, 34); c.fillStyle = '#b5bcc4'; c.fillRect(0, 446, W, 4);
  for (let x = 20; x < W; x += 60) { c.fillStyle = 'rgba(0,0,0,.06)'; c.fillRect(x, 452, 2, 28); }
  fillRR(c, 4, 430, 14, 18, 3, '#d9734a'); circ(c, 11, 424, 9, '#6fbf5a'); fillRR(c, 342, 430, 14, 18, 3, '#d9734a'); circ(c, 349, 424, 9, '#6fbf5a');
}
function drawBudgieCage(c, a) {
  const bob = Math.sin(a.t * 3) * 1.6 * a.live;
  c.beginPath(); c.arc(0, -44, 3.5, 0, TAU); stroke(c, '#c9a227', 2);
  c.beginPath(); c.moveTo(-26, -14); c.quadraticCurveTo(-26, -40, 0, -40); c.quadraticCurveTo(26, -40, 26, -14); c.lineTo(26, 36); c.lineTo(-26, 36); c.closePath(); c.fillStyle = 'rgba(255,255,255,.35)'; c.fill();
  seg(c, [-20, 16, 20, 16], '#9a6a3a', 3);
  c.save(); c.translate(0, bob);
  ell(c, -3, 22, 2.5, 8, '#3a7ae0');
  ell(c, 0, 4, 8.5, 12, '#7fd04a');
  ell(c, -3, 4, 5, 9, '#5aa83a'); [0, 4, 8].forEach((y) => bend(c, -6, y, -3, y + 2, 0, y, '#2b5a2a', 1));
  circ(c, 1, -9, 7, '#f6e04a');
  circ(c, 5, -5, 1.6, '#4a7ae0'); poly(c, [6, -11, 10, -8, 6, -6], '#e9a07a');
  eye(c, 3, -11, 1.6);
  c.restore();
  c.strokeStyle = '#c9a227'; c.lineWidth = 1.5;
  for (let x = -26; x <= 26.1; x += 6.5) { c.beginPath(); c.moveTo(x, 36); c.lineTo(x, -14); c.quadraticCurveTo(x, -38 + Math.abs(x) * 0.6, x * 0.15, -40); c.stroke(); }
  c.beginPath(); c.moveTo(-26, -14); c.lineTo(26, -14); c.stroke();
  fillRR(c, -29, 34, 58, 9, 3, '#d9a83a'); fillRR(c, 13, 26, 9, 7, 2, '#e85a5a');
}
function drawPhoto(c, a, kind) {
  fillRR(c, -23, -27, 46, 54, 3, '#b07a44'); fillRR(c, -20, -24, 40, 48, 2, '#8a5a34');
  fillRR(c, -17, -21, 34, 42, 2, kind === 'dog' ? '#ffe7a8' : '#d8e9ff');
  poly(c, [-4, -27, 0, -31, 4, -27], '#8a5a34');
  if (kind === 'dog') {
    poly(c, [-11, -8, -9, -18, -3, -11], '#e09a58'); poly(c, [3, -11, 9, -18, 11, -8], '#e09a58');
    circ(c, 0, -2, 11, '#e8a868'); ell(c, 0, 3, 7, 5, '#fff6ea'); circ(c, 0, 0, 1.8, '#2b2222');
    eye(c, -4, -5, 1.5); eye(c, 4, -5, 1.5); fillRR(c, -10, 10, 20, 4, 2, '#e8463a');
  } else {
    poly(c, [-11, -8, -10, -18, -3, -12], '#9aa3b0'); poly(c, [3, -12, 10, -18, 11, -8], '#9aa3b0');
    circ(c, 0, -2, 11, '#9aa3b0'); ell(c, 0, 3, 6, 4, '#fff');
    seg(c, [-3, -12, -2, -8], '#7a8390', 1.4); seg(c, [3, -12, 2, -8], '#7a8390', 1.4);
    eye(c, -4, -4, 1.5); eye(c, 4, -4, 1.5); poly(c, [-1.5, 1, 1.5, 1, 0, 2.6], '#f29aaa');
    fillRR(c, -10, 10, 20, 4, 2, '#4dabf7');
  }
}
function drawCat(c, a) {
  const sw = Math.sin(a.t * 2) * a.live;
  bend(c, -20, 14, -30, 6 + sw * 4, -24, -6 + sw * 6, '#8d96a3', 4.5);
  ell(c, -4, 10, 20, 12, '#9aa3b0');
  seg(c, [-12, 1, -10, 7], '#7a8390', 2); seg(c, [-4, -1, -3, 5], '#7a8390', 2);
  ell(c, 6, 20, 7, 3, '#fff'); ell(c, -12, 20, 7, 3, '#9aa3b0');
  poly(c, [3, -10, 4, -23, 12, -15], '#9aa3b0'); poly(c, [5, -12, 6, -19, 10, -14], '#f6b3c2');
  poly(c, [15, -15, 22, -23, 23, -10], '#9aa3b0'); poly(c, [17, -14, 21, -19, 21, -12], '#f6b3c2');
  circ(c, 13, -6, 11, '#9aa3b0');
  seg(c, [11, -16, 12, -12], '#7a8390', 1.4); seg(c, [15, -16, 14.6, -12], '#7a8390', 1.4);
  ell(c, 15, -1, 6, 4, '#fff');
  eye(c, 9, -7, 1.9); eye(c, 18, -7, 1.9);
  poly(c, [14, -3, 16.5, -3, 15.2, -1.4], '#f29aaa');
  blush(c, 8, -1, 2.6, 1.6); blush(c, 21, -1, 2.6, 1.6);
}
function drawCatRamp(c) {
  fillRR(c, -43, -1, 86, 8, 3, '#c98e5a');
  fillRR(c, -41, -5, 82, 5, 2, '#e8836a');
  c.fillStyle = '#c45f4a'; for (let x = -36; x < 40; x += 11) c.fillRect(x, -6, 3, 5);
  fillRR(c, -43, 5, 86, 2, 1, 'rgba(0,0,0,.12)');
}
function drawHamster(c, a) {
  const ch = 1 + Math.sin(a.t * 7) * 0.08 * a.live;
  groundShadow(c, 21, 22);
  ell(c, -8, 19, 5, 2.6, '#f7c0c8'); ell(c, 8, 19, 5, 2.6, '#f7c0c8');
  circ(c, -12, -10, 5, '#e8a870'); circ(c, 12, -10, 5, '#e8a870'); circ(c, -12, -10, 2.6, '#f7c0c8'); circ(c, 12, -10, 2.6, '#f7c0c8');
  ell(c, 0, 4, 22, 16, '#f2c48a');
  ell(c, 0, 9, 13, 10, '#fff6ea');
  ell(c, -11, 1, 7 * ch, 6 * ch, '#f7d6ac'); ell(c, 11, 1, 7 * ch, 6 * ch, '#f7d6ac');
  eye(c, -6, -4, 2); eye(c, 6, -4, 2);
  ell(c, 0, 0, 1.6, 1.1, '#e88aa0');
  ell(c, 0, 9, 2.6, 4, '#5a4a3a'); seg(c, [0, 6, 0, 12], '#e8dccb', 0.8);
  circ(c, -3.5, 9, 2.4, '#f7c0c8'); circ(c, 3.5, 9, 2.4, '#f7c0c8');
  blush(c, -12, 3, 3, 1.8); blush(c, 12, 3, 3, 1.8);
}
function drawFishbowl(c, a) {
  const sw = Math.sin(a.t * 1.5) * a.live;
  c.save(); c.beginPath(); c.arc(0, 0, 26, 0, TAU); c.clip();
  c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(-30, -30, 60, 60);
  c.fillStyle = 'rgba(110,195,240,.6)'; c.fillRect(-30, -12, 60, 42);
  c.fillStyle = '#e2f6ff'; c.fillRect(-30, -13, 60, 2);
  [[-14, 22, '#f2d16b'], [-6, 24, '#f29aaa'], [4, 23, '#9ad0f5'], [13, 22, '#f2d16b'], [-1, 21, '#fff']].forEach(([x, y, col]) => circ(c, x, y, 3.4, col));
  bend(c, -12, 22, -16, 10, -11, 0, '#3fae4a', 2.4); bend(c, -9, 22, -6, 12, -8, 4, '#5ac05a', 2);
  c.save(); c.translate(sw * 8, 5 + Math.sin(a.t * 2) * 2 * a.live); if (Math.cos(a.t * 1.5) * a.live < 0) c.scale(-1, 1);
  poly(c, [-6, 0, -14, -5, -14, 5], '#ff8a3a'); ell(c, 0, 0, 8, 5.5, '#ff9a4a'); poly(c, [-1, -4, 3, -8, 4, -4], '#ff8a3a'); eye(c, 4, -1, 1.3);
  c.restore();
  circ(c, 8, -2, 1.6, 'rgba(255,255,255,.8)'); circ(c, 10, -7, 1.1, 'rgba(255,255,255,.8)');
  c.restore();
  c.beginPath(); c.arc(0, 0, 26, -Math.PI * 0.32, Math.PI * 1.32); stroke(c, 'rgba(90,150,190,.55)', 2);
  c.beginPath(); c.ellipse(0, -22, 13, 3, 0, 0, TAU); stroke(c, 'rgba(90,150,190,.55)', 1.8);
  c.beginPath(); c.arc(0, 0, 21, Math.PI * 1.1, Math.PI * 1.4); stroke(c, 'rgba(255,255,255,.9)', 2.5);
  fillRR(c, -14, 24, 28, 4, 2, '#7a8ea8');
}
function drawBunny(c, a) {
  const hop = Math.max(0, Math.sin(a.t * 2.5)) * a.live;
  groundShadow(c, 31 + hop * 6, 24 - hop * 5);
  ell(c, 0, 27, 12, 4, '#f2e8de');
  circ(c, -22, 16, 6, '#fff');
  ell(c, -4, 12, 20, 17, '#fbf7f2');
  ell(c, 12, 22, 5, 7, '#f2e8de');
  ell(c, 3, -21, 4.5, 13, '#fbf7f2', -0.2); ell(c, 3, -20, 2.2, 9, '#f7b6c6', -0.2);
  ell(c, 12, -22, 4.5, 13, '#fbf7f2', 0.15); ell(c, 12, -21, 2.2, 9, '#f7b6c6', 0.15);
  circ(c, 10, -4, 13, '#fbf7f2');
  eye(c, 14, -6, 2.2); ell(c, 22, -1, 2, 1.5, '#f29aaa');
  seg(c, [21, 1, 28, 0], 'rgba(150,130,120,.6)', 0.8); seg(c, [21, 2, 28, 4], 'rgba(150,130,120,.6)', 0.8);
  blush(c, 14, 2, 3, 1.8);
}
function drawShiba(c, a) {
  const wag = Math.sin(a.t * 10) * 0.35 * a.live;
  groundShadow(c, 31, 42);
  [[-30, '#d99658'], [12, '#d99658'], [-20, '#e8a868'], [22, '#e8a868']].forEach(([x, col]) => { fillRR(c, x, 4, 8, 26, 3, col); fillRR(c, x, 22, 8, 8, 3, '#fff6ea'); });
  c.save(); c.translate(-30, -6); c.rotate(wag);
  c.beginPath(); c.arc(0, -8, 7, Math.PI * 0.4, Math.PI * 2.1); stroke(c, '#e09a58', 6);
  c.restore();
  ell(c, -4, 2, 32, 14, '#e8a868');
  ell(c, 0, 10, 22, 5, '#fff6ea');
  poly(c, [18, -20, 19, -33, 28, -24], '#e09a58'); poly(c, [20, -22, 21, -29, 25, -24], '#c97a48');
  poly(c, [29, -24, 36, -33, 38, -18], '#e09a58'); poly(c, [31, -23, 35, -29, 36, -20], '#c97a48');
  circ(c, 28, -12, 13, '#e8a868');
  ell(c, 34, -5, 10, 6.5, '#fff6ea'); ell(c, 21, -6, 5, 4, '#fff6ea');
  circ(c, 42, -8, 2.6, '#2b2222');
  eye(c, 30, -15, 2.2); blush(c, 26, -6, 3, 1.8);
  seg(c, [17, -4, 21, 6], '#e8463a', 4); circ(c, 21, 8, 2.4, '#ffd23f');
}

/* ===== 1-10 Animal carnival ===== */
function bgCarnival(c) {
  const R = mulberry(101);
  sky(c, [[0, '#5b4b9a'], [0.5, '#c07ab8'], [1, '#ffc9a0']], 320);
  for (let i = 0; i < 20; i++) circ(c, R() * W, R() * 120, 0.6 + R(), 'rgba(255,255,230,.7)');
  // big top
  c.save(); c.beginPath(); c.moveTo(112, 302); c.lineTo(122, 176); c.lineTo(238, 176); c.lineTo(248, 302); c.closePath(); c.clip();
  for (let k = 0; k < 12; k++) { c.fillStyle = k % 2 ? '#fff4e6' : '#e8463a'; c.fillRect(112 + k * 12, 170, 12, 140); }
  c.restore();
  c.save(); c.beginPath(); c.moveTo(102, 184); c.lineTo(180, 94); c.lineTo(258, 184); c.closePath(); c.clip();
  for (let k = -6; k < 7; k++) poly(c, [180, 94, 180 + k * 14, 190, 180 + (k + 1) * 14, 190], k % 2 ? '#fff4e6' : '#e8463a');
  c.restore();
  c.fillStyle = '#ffd43b'; for (let x = 104; x < 258; x += 12) { c.beginPath(); c.arc(x + 6, 184, 6, 0, Math.PI); c.fill(); }
  seg(c, [180, 94, 180, 70], '#8a5a34', 2); poly(c, [180, 70, 198, 76, 180, 82], '#ffd43b');
  c.beginPath(); c.moveTo(160, 302); c.lineTo(160, 262); c.quadraticCurveTo(180, 238, 200, 262); c.lineTo(200, 302); c.closePath(); c.fillStyle = '#5a2a4a'; c.fill();
  poly(c, [160, 262, 172, 302, 160, 302], '#c0392b'); poly(c, [200, 262, 188, 302, 200, 302], '#c0392b');
  // banner rope and poles
  fillRR(c, 4, 14, 6, 300, 2, '#8a5a34'); fillRR(c, 350, 14, 6, 300, 2, '#8a5a34'); circ(c, 7, 13, 4, '#ffd43b'); circ(c, 353, 13, 4, '#ffd43b');
  c.beginPath(); c.moveTo(7, 20); c.quadraticCurveTo(180, 34, 353, 20); stroke(c, '#5a3a2a', 1.6);
  // string lights
  c.beginPath(); c.moveTo(7, 96); c.quadraticCurveTo(180, 140, 353, 96); stroke(c, 'rgba(60,40,60,.6)', 1.2);
  for (let k = 1; k < 18; k++) { const t = k / 18, x = 7 + 346 * t, y = 96 + 2 * t * (1 - t) * 44; circ(c, x, y + 3, 5, 'rgba(255,240,170,.25)'); circ(c, x, y + 3, 2.4, ['#ffd43b', '#ff6b6b', '#69db7c', '#4dabf7'][k % 4]); }
  // plaza
  c.fillStyle = '#f6dcb4'; c.fillRect(0, 302, W, H - 302);
  c.strokeStyle = 'rgba(180,130,90,.25)'; c.lineWidth = 1;
  for (let y = 318; y < H; y += 22 + (y - 300) * 0.15) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  for (let k = -10; k <= 10; k++) { c.beginPath(); c.moveTo(180 + k * 20, 302); c.lineTo(180 + k * 60, H); c.stroke(); }
  // slide tower (the chute itself is an object)
  fillRR(c, 314, 255, 38, 6, 2, '#4dabf7');
  seg(c, [322, 261, 322, 318], '#e8463a', 3.5); seg(c, [344, 261, 344, 318], '#e8463a', 3.5);
  for (let y = 272; y < 318; y += 11) seg(c, [322, y, 344, y], '#e8463a', 2.5);
  seg(c, [316, 255, 316, 236, 350, 236, 350, 255], '#e8463a', 2.5);
  // a perch stand for the macaw and a podium for the monkey's ball
  fillRR(c, 337, 160, 6, 78, 2, '#8a5a34'); fillRR(c, 330, 232, 20, 6, 2, '#6a4224');
  seg(c, [54, 22, 54, 108], '#6a4a3a', 1.4); seg(c, [106, 24, 106, 108], '#6a4a3a', 1.4);
  // balloons tied to the tower
  [[332, 200, '#ff6b6b'], [346, 214, '#ffd43b'], [322, 220, '#69db7c']].forEach(([x, y, col]) => { bend(c, x, y + 12, x + 4, y + 26, 336, 238, 'rgba(80,60,60,.5)', 0.8); ell(c, x, y, 9, 11, col); ell(c, x - 3, y - 4, 2.5, 3.5, 'rgba(255,255,255,.5)'); });
  // seesaw
  ell(c, 245, 466, 40, 5, 'rgba(120,70,40,.18)');
  poly(c, [232, 466, 245, 440, 258, 466], '#e8463a');
  fillRR(c, 132, 436, 226, 8, 4, '#4dabf7'); fillRR(c, 168, 422, 4, 16, 2, '#1c7ed6'); fillRR(c, 318, 422, 4, 16, 2, '#1c7ed6');
  // confetti
  for (let i = 0; i < 70; i++) { const x = R() * W, y = 300 + R() * 180; c.save(); c.translate(x, y); c.rotate(R() * 3); c.fillStyle = ['#ff6b6b', '#ffd43b', '#69db7c', '#4dabf7', '#cc5de8'][i % 5]; c.fillRect(-2, -1, 4, 2); c.restore(); }
}
function drawBanner(c, a, zh, en, col) {
  fillRR(c, -66, -25, 132, 5, 2, '#8a5a34');
  c.beginPath(); c.moveTo(-62, -21); c.lineTo(62, -21); c.lineTo(62, 14);
  for (let k = 0; k < 8; k++) { const x = 62 - k * 15.5; c.quadraticCurveTo(x - 7.75, 24, x - 15.5, 14); }
  c.closePath(); c.fillStyle = col; c.fill();
  c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(-62, -21, 124, 4);
  const label = T(zh, en), font = (px) => T(`900 ${px}px "Noto Sans TC", sans-serif`, `${px}px Bangers, "Noto Sans TC", sans-serif`);
  c.font = font(26); const wid = c.measureText(label).width;
  txt(c, label, 0, -2, font(Math.min(26, Math.floor(26 * 108 / wid))), '#fff');
}
function drawElephantParty(c, a) {
  drawElephant(c, a);
  c.save(); c.beginPath(); c.ellipse(-6, 0, 50, 34, 0, 0, TAU); c.clip();
  c.fillStyle = '#cc5de8'; c.fillRect(-36, -40, 50, 28); c.fillStyle = '#ffd43b'; c.fillRect(-36, -14, 50, 4);
  c.restore();
  [-30, -18, -6, 6].forEach((x) => circ(c, x, -7, 2.6, '#ffd43b'));
  poly(c, [32, -38, 36, -54, 40, -38], '#ffd43b'); circ(c, 36, -54, 2.5, '#ff6b6b');
}
function drawLionParty(c, a) {
  drawLion(c, a);
  poly(c, [18, -26, 24, -37, 30, -26], '#cc5de8'); circ(c, 24, -36, 2, '#ffd43b');
  [[21, -29], [27, -29]].forEach(([x, y]) => circ(c, x, y, 1.2, '#fff'));
}
function drawTrapezeMonkey(c, a) {
  const kick = Math.sin(a.t * 3) * a.live;
  seg(c, [-26, -45, -26, -40], '#6a4a3a', 1.4); seg(c, [26, -45, 26, -40], '#6a4a3a', 1.4);
  fillRR(c, -29, -42, 58, 5, 2.5, '#ffd43b'); circ(c, -29, -39.5, 3, '#ff6b6b'); circ(c, 29, -39.5, 3, '#ff6b6b');
  bend(c, 6, 4, 22, 8, 18, 20, '#8a5530', 3.5); circ(c, 17, 22, 2.4, '#8a5530');
  seg(c, [-4, 8, -6 - kick * 3, 27], '#8a5530', 5); seg(c, [4, 8, 6 + kick * 3, 27], '#8a5530', 5);
  ell(c, -6 - kick * 3, 29, 4, 2.6, '#f2d2a8'); ell(c, 6 + kick * 3, 29, 4, 2.6, '#f2d2a8');
  seg(c, [-8, -10, -11, -38], '#a8673a', 4.5); seg(c, [8, -10, 11, -38], '#a8673a', 4.5);
  circ(c, -11, -39, 3, '#f2d2a8'); circ(c, 11, -39, 3, '#f2d2a8');
  ell(c, 0, -1, 10, 12, '#a8673a'); ell(c, 0, 1, 6.5, 8.5, '#f2d2a8');
  seg(c, [-4, -9, 4, -9], '#ff6b6b', 3);
  circ(c, -10.5, -20, 3.6, '#f2d2a8'); circ(c, 10.5, -20, 3.6, '#f2d2a8');
  circ(c, 0, -20, 10, '#a8673a'); ell(c, 0, -17, 7.5, 6.5, '#f2d2a8');
  eye(c, -3.4, -19, 1.8); eye(c, 3.4, -19, 1.8);
  c.beginPath(); c.arc(0, -15, 2.8, 0.2, Math.PI - 0.2); stroke(c, '#7a4a24', 1.2);
  blush(c, -6, -14, 2.2, 1.3); blush(c, 6, -14, 2.2, 1.3);
}
function drawSlide(c) {
  fillRR(c, -61, 4, 122, 10, 5, '#ffd43b');
  fillRR(c, -61, 12, 122, 4, 2, '#fab005');
  fillRR(c, -61, 2, 122, 3, 1.5, '#fff3bf');
  c.save(); c.translate(42, -6);
  ell(c, 0, 0, 9, 13, '#2b2b33'); ell(c, -2, 2, 6, 10, '#fff');
  ell(c, 7, -4, 3, 7, '#2b2b33', -0.9); ell(c, -8, -6, 3, 7, '#2b2b33', 0.9);
  poly(c, [-8, -5, -14, -3, -8, -1], '#ff922b');
  circ(c, -4, -6, 1.8, '#111'); circ(c, -4.6, -6.6, 0.6, '#fff');
  blush(c, -3, -2, 2, 1.2);
  ell(c, -4, 12, 4, 2, '#ff922b'); ell(c, 3, 12, 4, 2, '#ff922b');
  c.restore();
}
function drawKoala(c, a) {
  const sq = Math.sin(a.t * 1.8) * a.live;
  groundShadow(c, 34, 26);
  ell(c, -12, 30, 9, 6, '#8d96a1'); ell(c, 12, 30, 9, 6, '#8d96a1');
  ell(c, 0, 14, 20, 19, '#9aa3ad'); ell(c, 0, 18, 12, 13, '#ece8e2');
  c.save(); c.translate(14, 6); c.rotate(-0.5 + sq * 0.1);
  seg(c, [0, 0, 6, -14], '#3f8a4e', 1.6); leafShape(c, 6, -14, 10, 3, -2.2, '#6faa6a'); leafShape(c, 5, -10, 9, 3, -0.4, '#5a9a5a');
  c.restore();
  ell(c, -15, 10, 6, 11, '#8d96a1', 0.3); ell(c, 15, 10, 6, 11, '#8d96a1', -0.3);
  circ(c, -17, -20, 9, '#a7b0ba'); circ(c, 17, -20, 9, '#a7b0ba'); circ(c, -17, -19, 5.5, '#f2eee8'); circ(c, 17, -19, 5.5, '#f2eee8');
  circ(c, 0, -10, 17, '#a7b0ba');
  ell(c, 0, -6, 5, 6.5, '#3a3a40'); ell(c, -1.5, -9, 1.5, 1.2, 'rgba(255,255,255,.4)');
  eye(c, -7, -12, 2.2); eye(c, 7, -12, 2.2);
  blush(c, -10, -3, 3, 1.8); blush(c, 10, -3, 3, 1.8);
}

defineChapter({
  key: 'animal', order: 1,
  name: { zh: "動物奇關", en: "Animal Antics" },
  blurb: { zh: "每隻動物都有自己的脾氣：沒轉正前會一直動，轉正了就叫給你聽。", en: "Every animal has its own temper: it fidgets until straight, then calls out to you." },
  style: { zh: "扁平插畫", en: "Flat illustration" },
  narrator: { zh: "母雞", en: "Hen" },
  song: 'farm',
    comments: {
      far: [{ zh: ["咯咯咯？！", "大家都還歪著頭等你耶，小豬說牠脖子好痠。"], en: ["Bawk?!", "Everyone's still tilted. Piglet says his neck hurts."] }, { zh: ["農場大亂鬥", "乳牛邊嚼草邊搖頭：這樣不行喔～"], en: ["Barnyard chaos", "Cow shakes her head mid-chew: nope, not like this~"] }],
      close: [{ zh: ["差一點點咯！", "就差最後幾隻，綿羊已經在幫你數羊了。"], en: ["Sooo close!", "Just a few left. Sheep is already counting sheep for you."] }, { zh: ["只差一步", "母雞把蛋都孵好了，你也快好了吧？"], en: ["One more step", "Hen's eggs have hatched. You're almost done too, right?"] }],
      pass: [{ zh: ["過關咯噠！", "大家勉強站好了，但小豬偷偷還在晃。"], en: ["Cleared, cluck!", "Everyone's standing, but Piglet is still wobbling."] }, { zh: ["及格啦～", "乳牛：哞～算你過，下次再站正一點。"], en: ["You passed~", "Cow: moo~ fine, but stand up straighter next time."] }],
      good: [{ zh: ["站得挺直！", "整個農場排排站，連母雞都忘了啄米。"], en: ["Standing tall!", "The whole farm in a neat row. Hen forgot to peck."] }, { zh: ["好農夫", "綿羊說：這麼整齊，今晚可以安心睡了。"], en: ["Great farmer", "Sheep says: this tidy, we'll all sleep well tonight."] }],
      perfect: [{ zh: ["完美牧場♪", "一度都不差！全場動物一起為你合唱咯咯哞哼咩～"], en: ["Perfect pasture♪", "Not one degree off! The whole farm sings for you."] }, { zh: ["動物模範生", "母雞決定把今天第一顆蛋送給你。"], en: ["Model student", "Hen is giving you today's very first egg."] }],
    },
  stages: [
    { key: 'farm', title: { zh: "農場早晨", en: "Farm Morning" }, place: { zh: "台灣 宜蘭", en: "Yilan, Taiwan" },
      intro: { zh: "動物還沒轉正前會一直動。轉正了，牠會叫給你聽，然後乖乖站好。", en: "Animals keep moving until they are straight. Straighten one and it calls out, then stands still." },
      bg: bgFarm, animated: true,
      objects: [
      { id: 'sheep', name: { zh: '綿羊', en: 'Sheep' }, x: 100, y: 290, w: 90, h: 70, mag: 9, draw: drawSheep, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 3)) * 7 * l }), call: 'baa' },
      { id: 'cow', name: { zh: '乳牛', en: 'Cow' }, x: 245, y: 300, w: 120, h: 84, mag: 12, draw: drawCow, call: 'moo' },
      { id: 'chicken', name: { zh: '母雞', en: 'Hen' }, x: 90, y: 405, w: 60, h: 64, near: true, draw: drawChicken, habit: (t, l) => ({ dx: Math.sin(t * 1.2) * 3 * l }), call: 'chick' },
      { id: 'pig', name: { zh: '小豬', en: 'Piglet' }, x: 260, y: 415, w: 84, h: 60, mag: 10, draw: drawPig, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 4)) * 2 * l }), call: 'oink' }
      ] },
    { key: 'animal-savanna', title: { zh: "非洲草原", en: "African Savanna" }, place: { zh: "肯亞 馬賽馬拉", en: "Maasai Mara, Kenya" },
      intro: { zh: "在肯亞的大草原上，獅子、斑馬、大象和長頸鹿都是鄰居。", en: "On Kenya's grasslands, lions, zebras, elephants and giraffes are all neighbours." },
      bg: bgSavanna, animated: true,
      objects: [
      { id: 'elephant', name: { zh: '大象', en: 'Elephant' }, x: 108, y: 292, w: 136, h: 108, mag: 12, draw: drawElephant, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 2 * l }), call: 'animal_elephant' },
      { id: 'giraffe', name: { zh: '長頸鹿', en: 'Giraffe' }, x: 282, y: 246, w: 80, h: 168, near: true, draw: drawGiraffe, habit: (t, l) => ({ dy: Math.sin(t * 1.4) * 1.5 * l }), call: 'animal_giraffe' },
      { id: 'lion', name: { zh: '獅子', en: 'Lion' }, x: 96, y: 418, w: 104, h: 72, mag: 9, draw: drawLion, habit: (t, l) => ({ dy: Math.sin(t * 2) * 1.2 * l }), call: 'animal_lion' },
      { id: 'zebra', name: { zh: '斑馬', en: 'Zebra' }, x: 266, y: 414, w: 104, h: 80, mag: 7, draw: drawZebra, habit: (t, l) => ({ dx: Math.sin(t * 1.3) * 2.5 * l }), call: 'animal_zebra' }
      ] },
    { key: 'animal-rainforest', title: { zh: "熱帶雨林", en: "Rainforest" }, place: { zh: "巴西 亞馬遜雨林", en: "Amazon Rainforest, Brazil" },
      intro: { zh: "雨林是一層一層的公寓：樹懶住頂樓倒掛著，青蛙住一樓的葉子上。", en: "The rainforest is stacked like flats: sloths hang on the top floor, frogs live on the leaves below." },
      bg: bgRainforest, animated: true,
      objects: [
      { id: 'sloth', name: { zh: '樹懶', en: 'Sloth' }, x: 96, y: 128, w: 120, h: 90, mag: 10, draw: drawSloth, call: 'animal_sloth' },
      { id: 'macaw', name: { zh: '金剛鸚鵡', en: 'Macaw' }, x: 278, y: 142, w: 70, h: 120, mag: 13, draw: drawMacaw, call: 'animal_parrot' },
      { id: 'monkey', name: { zh: '松鼠猴', en: 'Squirrel monkey' }, x: 96, y: 300, w: 90, h: 100, mag: 8, draw: drawSquirrelMonkey, call: 'animal_monkey' },
      { id: 'toucan', name: { zh: '巨嘴鳥', en: 'Toucan' }, x: 258, y: 292, w: 110, h: 76, mag: 6, draw: drawToucan, call: 'animal_toucan' },
      { id: 'frog', name: { zh: '箭毒蛙', en: 'Dart frog' }, x: 190, y: 420, w: 90, h: 58, near: true, draw: drawDartFrog, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 2.2)) * 3 * l }), call: 'animal_frog' }
      ] },
    { key: 'animal-bamboo', title: { zh: "竹林熊貓", en: "Bamboo Pandas" }, place: { zh: "中國 四川 臥龍", en: "Wolong, Sichuan, China" },
      intro: { zh: "熊貓寶寶緊緊靠著媽媽：轉動熊貓媽媽，寶寶也會跟著歪。", en: "The cub leans right against Mama: turn Mama panda and the cub tilts along." },
      bg: bgBamboo, animated: true,
      objects: [
      { id: 'mama', name: { zh: '熊貓媽媽', en: 'Mama panda' }, x: 112, y: 326, w: 120, h: 118, mag: 10, draw: drawPanda, link: { to: 'cub', k: 0.5 }, call: 'animal_panda' },
      { id: 'cub', name: { zh: '熊貓寶寶', en: 'Panda cub' }, x: 226, y: 384, w: 80, h: 78, mag: 6, draw: drawPandaCub, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 2.5)) * 2 * l }), call: 'animal_pandacub' },
      { id: 'goldmonkey', name: { zh: '金絲猴', en: 'Golden monkey' }, x: 84, y: 150, w: 80, h: 100, mag: 8, draw: drawGoldenMonkey, call: 'animal_goldmonkey' },
      { id: 'redpanda', name: { zh: '小貓熊', en: 'Red panda' }, x: 268, y: 176, w: 100, h: 66, near: true, draw: drawRedPanda, call: 'animal_redpanda' },
      { id: 'sign', name: { zh: '保護區木牌', en: 'Reserve sign' }, x: 300, y: 296, w: 84, h: 74, mag: 13, draw: drawWolongSign, sfx: 'wood' }
      ] },
    { key: 'animal-outback', title: { zh: "澳洲荒原", en: "Outback" }, place: { zh: "澳洲 烏魯魯", en: "Uluru, Australia" },
      intro: { zh: "烏魯魯腳下的紅土上，鴯鶓寶寶是爸爸一手帶大的。轉動爸爸，寶寶也會跟著動。", en: "On the red earth by Uluru, emu dads raise the chicks. Turn the dad and his chick turns too." },
      bg: bgOutback, animated: true,
      objects: [
      { id: 'kangaroo', name: { zh: '袋鼠', en: 'Kangaroo' }, x: 94, y: 330, w: 92, h: 130, mag: 10, draw: drawKangaroo, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 3)) * 8 * l }), call: 'animal_kangaroo' },
      { id: 'sign', name: { zh: '袋鼠路牌', en: 'Kangaroo sign' }, x: 174, y: 300, w: 60, h: 100, mag: 6, draw: drawRooSign, sfx: 'clunk' },
      { id: 'emu', name: { zh: '鴯鶓爸爸', en: 'Emu dad' }, x: 256, y: 300, w: 90, h: 136, mag: 12, draw: drawEmu, link: { to: 'chick', k: 0.6 }, call: 'animal_emu' },
      { id: 'chick', name: { zh: '鴯鶓寶寶', en: 'Emu chick' }, x: 308, y: 402, w: 54, h: 60, mag: 8, draw: drawEmuChick, call: 'chick' },
      { id: 'galah', name: { zh: '粉紅鳳頭鸚鵡', en: 'Galah' }, x: 76, y: 176, w: 70, h: 66, mag: 14, draw: drawGalah, call: 'animal_galah' },
      { id: 'devil', name: { zh: '魔蜥', en: 'Thorny devil' }, x: 122, y: 444, w: 80, h: 44, near: true, draw: drawThornyDevil, habit: (t, l) => ({ dx: Math.sin(t * 2) * 2 * l }), call: 'animal_thorny' }
      ] },
    { key: 'animal-honey', title: { zh: "蜂蜜花園", en: "Honey Garden" }, place: { zh: "法國 普羅旺斯", en: "Provence, France" },
      intro: { zh: "薰衣草開花了，蜜蜂忙著採蜜。兩個蜂箱放在同一張長椅上，會一起歪喔。", en: "The lavender is in bloom and the bees are busy. Both hives share one bench, so they tilt together." },
      bg: bgHoney, animated: true,
      objects: [
      { id: 'hiveL', name: { zh: '左邊蜂箱', en: 'Left hive' }, x: 114, y: 280, w: 80, h: 90, mag: 8, draw: (c, a) => drawHive(c, a, '#8ec9e8'), link: { to: 'hiveR', k: 0.6 }, sfx: 'wood' },
      { id: 'hiveR', name: { zh: '右邊蜂箱', en: 'Right hive' }, x: 246, y: 280, w: 80, h: 90, mag: 5, draw: (c, a) => drawHive(c, a, '#f6d36b'), sfx: 'wood' },
      { id: 'butterfly', name: { zh: '蝴蝶', en: 'Butterfly' }, x: 70, y: 150, w: 76, h: 62, mag: 13, draw: drawButterfly, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 6 * l, dy: Math.sin(t * 1.9) * 4 * l }), call: 'animal_butterfly' },
      { id: 'bee', name: { zh: '蜜蜂', en: 'Honeybee' }, x: 190, y: 172, w: 60, h: 50, near: true, draw: drawBee, habit: (t, l) => ({ dx: Math.sin(t * 1.7) * 5 * l, dy: Math.cos(t * 2.3) * 4 * l }), call: 'animal_bee' },
      { id: 'bumble', name: { zh: '熊蜂', en: 'Bumblebee' }, x: 298, y: 150, w: 64, h: 56, mag: 10, draw: drawBumblebee, habit: (t, l) => ({ dx: Math.cos(t * 1.3) * 4 * l, dy: Math.sin(t * 2) * 3 * l }), call: 'animal_bumble' },
      { id: 'ladybug', name: { zh: '瓢蟲', en: 'Ladybug' }, x: 186, y: 420, w: 70, h: 44, near: true, draw: drawLadybug, call: 'animal_ladybug' }
      ] },
    { key: 'animal-night', title: { zh: "夜行森林", en: "Night Forest" }, place: { zh: "英國 新森林", en: "New Forest, England" },
      intro: { zh: "天黑了，森林才熱鬧起來。灰林鴞和寶寶坐在同一根樹枝上，會一起歪。", en: "The forest wakes up after dark. The owl and her owlet share a branch, so they tilt together." },
      bg: bgNight, animated: true,
      objects: [
      { id: 'owl', name: { zh: '灰林鴞', en: 'Tawny owl' }, x: 120, y: 130, w: 70, h: 84, mag: 9, draw: drawOwl, link: { to: 'owlet', k: 0.6 }, call: 'animal_owl' },
      { id: 'owlet', name: { zh: '貓頭鷹寶寶', en: 'Owlet' }, x: 200, y: 146, w: 50, h: 56, mag: 12, draw: drawOwlet, call: 'animal_owlet' },
      { id: 'bat', name: { zh: '蝙蝠', en: 'Bat' }, x: 298, y: 82, w: 76, h: 50, mag: 14, draw: drawBat, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 5 * l, dy: Math.sin(t * 1.6) * 4 * l }), call: 'animal_bat' },
      { id: 'fox', name: { zh: '赤狐', en: 'Red fox' }, x: 268, y: 312, w: 110, h: 76, mag: 7, draw: drawFox, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 3 * l }), call: 'animal_fox' },
      { id: 'badger', name: { zh: '獾', en: 'Badger' }, x: 98, y: 330, w: 110, h: 66, near: true, draw: drawBadger, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 3 * l }), call: 'animal_badger' },
      { id: 'hedgehog', name: { zh: '刺蝟', en: 'Hedgehog' }, x: 236, y: 432, w: 76, h: 48, near: true, draw: drawHedgehog, habit: (t, l) => ({ dx: Math.sin(t * 1.4) * 3 * l }), call: 'animal_hedgehog' },
      { id: 'sign', name: { zh: '森林路牌', en: 'Forest sign' }, x: 84, y: 432, w: 80, h: 70, mag: 5, draw: drawForestSign, sfx: 'wood' }
      ] },
    { key: 'animal-birds', title: { zh: "百鳥天空", en: "Sky of Birds" }, place: { zh: "台灣 台南 七股", en: "Qigu, Tainan, Taiwan" },
      intro: { zh: "每年冬天，黑面琵鷺都飛來台南過冬。兩隻燕子停在同一條電線上。", en: "Every winter, black-faced spoonbills fly to Tainan. Two swallows share one wire." },
      bg: bgWetland, animated: true,
      objects: [
      { id: 'spoonbill', name: { zh: '黑面琵鷺', en: 'Spoonbill' }, x: 110, y: 92, w: 120, h: 60, mag: 9, draw: drawSpoonbill, habit: (t, l) => ({ dy: Math.sin(t * 1.3) * 4 * l }), call: 'animal_spoonbill' },
      { id: 'egret', name: { zh: '小白鷺', en: 'Little egret' }, x: 266, y: 152, w: 108, h: 58, mag: 6, draw: drawEgret, habit: (t, l) => ({ dy: Math.sin(t * 1.1 + 1) * 4 * l }), call: 'animal_egret' },
      { id: 'swallowL', name: { zh: '左邊燕子', en: 'Left swallow' }, x: 140, y: 241, w: 50, h: 50, mag: 11, draw: (c, a) => drawSwallow(c, a, false), link: { to: 'swallowR', k: 0.6 }, call: 'animal_swallow' },
      { id: 'swallowR', name: { zh: '右邊燕子', en: 'Right swallow' }, x: 210, y: 243, w: 50, h: 50, mag: 5, draw: (c, a) => drawSwallow(c, a, true), call: 'animal_swallow' },
      { id: 'kingfisher', name: { zh: '翠鳥', en: 'Kingfisher' }, x: 302, y: 300, w: 50, h: 90, near: true, draw: drawKingfisher, call: 'animal_kingfisher' },
      { id: 'stilt', name: { zh: '高蹺鴴', en: 'Black-winged stilt' }, x: 86, y: 384, w: 70, h: 110, near: true, draw: drawStilt, call: 'animal_stilt' },
      { id: 'sign', name: { zh: '濕地木牌', en: 'Wetland sign' }, x: 250, y: 426, w: 100, h: 70, mag: 13, draw: drawBirdSign, sfx: 'wood' }
      ] },
    { key: 'animal-pets', title: { zh: "寵物公寓", en: "Pet Apartment" }, place: { zh: "台灣 台北", en: "Taipei, Taiwan" },
      intro: { zh: "這棟公寓每一層都住著毛小孩。牆上兩張照片掛在同一條繩子上。", en: "Every floor of this building has a furry tenant. The two photos hang from one string." },
      bg: bgPets, animated: true,
      objects: [
      { id: 'budgie', name: { zh: '虎皮鸚鵡', en: 'Budgie' }, x: 99, y: 118, w: 60, h: 96, mag: 8, draw: drawBudgieCage, call: 'animal_budgie' },
      { id: 'photoDog', name: { zh: '狗狗照片', en: 'Dog photo' }, x: 230, y: 101, w: 48, h: 58, mag: 11, draw: (c, a) => drawPhoto(c, a, 'dog'), link: { to: 'photoCat', k: 0.6 }, sfx: 'bell' },
      { id: 'photoCat', name: { zh: '貓咪照片', en: 'Cat photo' }, x: 294, y: 101, w: 48, h: 58, mag: 6, draw: (c, a) => drawPhoto(c, a, 'cat'), sfx: 'bell' },
      { id: 'cat', name: { zh: '貓咪', en: 'Cat' }, x: 48, y: 244, w: 54, h: 46, mag: 9, draw: drawCat, call: 'animal_cat' },
      { id: 'ramp', name: { zh: '貓咪斜坡', en: 'Cat ramp' }, x: 113, y: 289, w: 88, h: 22, trap: true, keep: 27, draw: drawCatRamp,
        trapNote: { zh: '貓咪斜坡本來就是斜的，貓才爬得上架子', en: 'A cat ramp is meant to slope, so the cat can climb to the shelf' } },
      { id: 'hamster', name: { zh: '倉鼠', en: 'Hamster' }, x: 222, y: 288, w: 56, h: 46, near: true, draw: drawHamster, call: 'animal_hamster' },
      { id: 'bowl', name: { zh: '金魚缸', en: 'Goldfish bowl' }, x: 300, y: 262, w: 60, h: 56, near: true, draw: drawFishbowl, call: 'bubble' },
      { id: 'bunny', name: { zh: '兔子', en: 'Bunny' }, x: 99, y: 394, w: 64, h: 72, mag: 12, draw: drawBunny, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 2.5)) * 6 * l }), call: 'animal_bunny' },
      { id: 'dog', name: { zh: '柴犬', en: 'Shiba Inu' }, x: 262, y: 398, w: 100, h: 70, mag: 5, draw: drawShiba, habit: (t, l) => ({ dx: Math.sin(t * 1.5) * 3 * l }), call: 'animal_dog' }
      ] },
    { key: 'animal-carnival', title: { zh: "動物狂歡節", en: "Animal Carnival" }, place: { zh: "世界各地", en: "All around the world" },
      intro: { zh: "最後一關！世界各地的動物都來狂歡。熊貓和無尾熊坐在同一座蹺蹺板上。", en: "The grand finale! Animals from all over the world come to party. Panda and Koala share a seesaw." },
      bg: bgCarnival, animated: true,
      objects: [
      { id: 'bannerL', name: { zh: '左邊布條', en: 'Left banner' }, x: 100, y: 48, w: 132, h: 50, mag: 7, draw: (c, a) => drawBanner(c, a, '動物', 'ANIMAL', '#ff6b6b'), link: { to: 'bannerR', k: 0.6 }, sfx: 'jingle' },
      { id: 'bannerR', name: { zh: '右邊布條', en: 'Right banner' }, x: 260, y: 48, w: 132, h: 50, mag: 4, draw: (c, a) => drawBanner(c, a, '狂歡節', 'CARNIVAL', '#4dabf7'), sfx: 'jingle' },
      { id: 'monkey', name: { zh: '盪鞦韆猴子', en: 'Trapeze monkey' }, x: 80, y: 148, w: 64, h: 84, near: true, draw: drawTrapezeMonkey, habit: (t, l) => ({ dx: Math.sin(t * 1.6) * 4 * l }), call: 'animal_monkey' },
      { id: 'parrot', name: { zh: '金剛鸚鵡', en: 'Macaw' }, x: 308, y: 136, w: 70, h: 120, near: true, draw: drawMacaw, call: 'animal_parrot' },
      { id: 'elephant', name: { zh: '大象', en: 'Elephant' }, x: 94, y: 270, w: 136, h: 108, mag: 11, draw: drawElephantParty, call: 'animal_elephant' },
      { id: 'slide', name: { zh: '溜滑梯', en: 'Slide' }, x: 262, y: 284, w: 124, h: 44, trap: true, keep: -24, draw: drawSlide,
        trapNote: { zh: '溜滑梯本來就是斜的，企鵝才溜得下來', en: 'A slide is meant to slope, or the penguin could not slide down' } },
      { id: 'lion', name: { zh: '獅子', en: 'Lion' }, x: 82, y: 418, w: 104, h: 76, mag: 8, draw: drawLionParty, habit: (t, l) => ({ dy: Math.sin(t * 2) * 1.2 * l }), call: 'animal_lion' },
      { id: 'panda', name: { zh: '熊貓', en: 'Panda' }, x: 176, y: 404, w: 80, h: 78, mag: 6, draw: drawPandaCub, link: { to: 'koala', k: 0.7 }, call: 'animal_panda' },
      { id: 'koala', name: { zh: '無尾熊', en: 'Koala' }, x: 308, y: 398, w: 76, h: 76, mag: 13, draw: drawKoala, call: 'animal_koala' }
      ] },
  ],
});
