// 第 2 大關 海洋深處 / World 2: Deep Blue (Watercolor).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 2-1 Coral reef: watercolour, living sea creatures ===== */
function wash(c, path, col, edge) { path(); c.fillStyle = col; c.fill(); c.lineWidth = 2; c.strokeStyle = edge; c.stroke(); }
function bgReef(c) {
  const R = mulberry(11);
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#8fdcec'); g.addColorStop(0.45, '#2f8bb5'); g.addColorStop(1, '#123f66');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 6; i++) { const x = 20 + i * 60 + R() * 20; poly(c, [x, 0, x + 26, 0, x + 90, H * 0.8, x + 40, H * 0.8], 'rgba(255,255,255,.07)'); }
  for (let i = 0; i < 40; i++) {
    const x = R() * W, y = R() * H, r = 20 + R() * 60, col = R() < 0.5 ? '40,140,190' : '20,80,140';
    const rg = c.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(${col},.12)`); rg.addColorStop(1, `rgba(${col},0)`);
    c.fillStyle = rg; c.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  c.beginPath(); c.moveTo(0, H); c.lineTo(0, 440); for (let x = 0; x <= W; x += 20) c.lineTo(x, 436 + Math.sin(x / 40) * 6); c.lineTo(W, H); c.closePath(); c.fillStyle = '#e6d39e'; c.fill();
  const coral = (x, y, col, s) => {
    c.strokeStyle = col; c.lineCap = 'round'; c.lineWidth = 7 * s;
    const br = (x, y, an, l, d) => { if (d > 3) return; const x2 = x + Math.cos(an) * l, y2 = y + Math.sin(an) * l; c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke(); br(x2, y2, an - 0.5, l * 0.7, d + 1); br(x2, y2, an + 0.45, l * 0.7, d + 1); };
    br(x, y, -Math.PI / 2, 30 * s, 0);
  };
  coral(30, 455, 'rgba(242,141,166,.85)', 1); coral(335, 456, 'rgba(246,160,90,.85)', 1.1); coral(200, 462, 'rgba(167,127,209,.8)', 0.8);
  c.lineWidth = 3; c.strokeStyle = 'rgba(70,150,90,.7)';
  for (let i = 0; i < 8; i++) { const x = 10 + R() * 340, top = 360 + R() * 40; c.beginPath(); c.moveTo(x, 474); for (let y = 474; y > top; y -= 10) c.lineTo(x + Math.sin(y / 12 + i) * 5, y); c.stroke(); }
  c.lineCap = 'butt'; c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 1;
  for (let i = 0; i < 30; i++) { c.beginPath(); c.arc(R() * W, R() * 420, 1 + R() * 3, 0, Math.PI * 2); c.stroke(); }
}
// Paper grain over everything. Baked once per canvas size: one 1:1 blit per frame instead of a scaled alpha blend.
let PAPER = null;
function ovReef(c) {
  const cw = c.canvas.width, ch = c.canvas.height;
  if (!PAPER || PAPER.width !== cw || PAPER.height !== ch) { PAPER = document.createElement('canvas'); PAPER.width = cw; PAPER.height = ch; const p = PAPER.getContext('2d'); p.globalAlpha = 0.05; p.drawImage(GRAIN, 0, 0, cw, ch); }
  c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(PAPER, 0, 0);
}
function drawClown(c, a) {
  const tail = Math.sin(a.t * 12) * 0.35 * (0.3 + a.live);
  c.save(); c.translate(-26, 0); c.rotate(tail);
  wash(c, () => { c.beginPath(); c.moveTo(0, 0); c.lineTo(-12, -12); c.quadraticCurveTo(-8, 0, -12, 12); c.closePath(); }, '#ff8a2b', 'rgba(140,50,0,.5)');
  c.restore();
  wash(c, () => { c.beginPath(); c.ellipse(2, 0, 30, 16, 0, 0, Math.PI * 2); }, '#ff8a2b', 'rgba(140,50,0,.5)');
  c.save(); c.beginPath(); c.ellipse(2, 0, 30, 16, 0, 0, Math.PI * 2); c.clip();
  [[-14, 6], [6, 7], [22, 5]].forEach(([x, w]) => { c.fillStyle = '#fff'; c.fillRect(x - w / 2, -20, w, 40); c.fillStyle = 'rgba(30,20,20,.8)'; c.fillRect(x - w / 2 - 1.5, -20, 1.5, 40); c.fillRect(x + w / 2, -20, 1.5, 40); });
  c.restore();
  poly(c, [-6, -14, 4, -22, 12, -14], '#ff9d47');
  circ(c, 22, -4, 3, '#fff'); circ(c, 23, -4, 1.6, '#111');
}
function drawTurtle(c, a) {
  const p = Math.sin(a.t * 2.4) * 0.5 * (0.2 + a.live);
  const flip = (x, y, r, s) => { c.save(); c.translate(x, y); c.rotate(r); wash(c, () => { c.beginPath(); c.ellipse(0, s * 12, 7, 14, 0, 0, Math.PI * 2); }, '#9ccf7d', 'rgba(40,90,30,.5)'); c.restore(); };
  flip(-24, -14, -0.8 + p, -1); flip(20, -14, 0.8 - p, -1); flip(-22, 14, 0.8 - p, 1); flip(18, 14, -0.8 + p, 1);
  wash(c, () => { c.beginPath(); c.ellipse(44, 0, 11, 9, 0, 0, Math.PI * 2); }, '#9ccf7d', 'rgba(40,90,30,.5)');
  circ(c, 49, -3, 2, '#1d2a1a');
  wash(c, () => { c.beginPath(); c.ellipse(0, 0, 36, 24, 0, 0, Math.PI * 2); }, '#5f9e4f', 'rgba(30,70,25,.6)');
  c.strokeStyle = 'rgba(220,240,180,.55)'; c.lineWidth = 1.5;
  [[0, 0], [-18, -10], [18, -10], [-18, 10], [18, 10]].forEach(([x, y]) => { c.beginPath(); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3; c.lineTo(x + Math.cos(an) * 8, y + Math.sin(an) * 6); } c.closePath(); c.stroke(); });
  poly(c, [-36, 0, -46, -3, -44, 3], '#9ccf7d');
}
function drawWhale(c, a) {
  const fl = Math.sin(a.t * 2) * 0.4 * (0.3 + a.live);
  c.save(); c.translate(-48, -4); c.rotate(fl);
  wash(c, () => { c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-12, -6, -16, -18); c.quadraticCurveTo(-6, -6, 0, -4); c.quadraticCurveTo(-8, 2, -16, 10); c.quadraticCurveTo(-10, 0, 0, 4); c.closePath(); }, '#4f86c9', 'rgba(20,50,100,.55)');
  c.restore();
  const body = () => { c.beginPath(); c.moveTo(-50, -2); c.bezierCurveTo(-30, -30, 40, -34, 58, -6); c.bezierCurveTo(62, 14, 30, 24, 0, 22); c.bezierCurveTo(-30, 20, -44, 8, -50, -2); c.closePath(); };
  wash(c, body, '#5a8fd0', 'rgba(20,50,100,.55)');
  c.save(); body(); c.clip(); ell(c, 10, 18, 54, 12, '#cfe3f5'); c.restore();
  c.strokeStyle = 'rgba(20,50,100,.4)'; c.lineWidth = 1.2;
  for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(14 + k * 8, 10); c.lineTo(10 + k * 8, 20); c.stroke(); }
  circ(c, 38, -6, 2.4, '#14243d');
  const sp = Math.max(0, Math.sin(a.t * 1.3)) * a.live;
  if (sp > 0.05) { c.strokeStyle = `rgba(255,255,255,${0.8 * sp})`; c.lineWidth = 2; for (const d of [-6, 0, 6]) { c.beginPath(); c.moveTo(24, -26); c.quadraticCurveTo(24 + d, -26 - 14 * sp, 24 + d * 2, -26 - 10 * sp); c.stroke(); } }
}
function drawOcto(c, a) {
  const L = 0.3 + a.live;
  c.lineCap = 'round'; c.strokeStyle = '#a24bbb'; c.lineWidth = 7;
  for (let i = 0; i < 6; i++) {
    const x0 = -20 + i * 8, sw = Math.sin(a.t * 3 + i) * 8 * L;
    c.beginPath(); c.moveTo(x0, 0); c.bezierCurveTo(x0 + sw, 16, x0 - sw - (i - 2.5) * 3, 28, x0 + (i - 2.5) * 6 + sw, 40); c.stroke();
  }
  c.lineCap = 'butt';
  wash(c, () => { c.beginPath(); c.ellipse(0, -14, 27, 29, 0, 0, Math.PI * 2); }, '#c06ad6', 'rgba(90,30,110,.55)');
  ell(c, -10, -30, 8, 5, 'rgba(255,255,255,.25)', -0.5);
  circ(c, -9, -8, 5, '#fff'); circ(c, 9, -8, 5, '#fff'); circ(c, -8, -7, 2.5, '#222'); circ(c, 10, -7, 2.5, '#222');
  c.strokeStyle = '#6a2580'; c.lineWidth = 1.5; c.beginPath(); c.arc(0, 2, 4, 0.2, Math.PI - 0.2); c.stroke();
}
function drawCrab(c, a) {
  const snap = Math.max(0, Math.sin(a.t * 6)) * a.live;
  c.strokeStyle = '#b8402f'; c.lineWidth = 3;
  for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(-14, 6 + i * 4); c.lineTo(-30, 14 + i * 4); c.moveTo(14, 6 + i * 4); c.lineTo(30, 14 + i * 4); c.stroke(); }
  const claw = (s) => {
    c.strokeStyle = '#b8402f'; c.lineWidth = 3; c.beginPath(); c.moveTo(s * 12, 0); c.lineTo(s * 22, -6); c.stroke();
    c.save(); c.translate(s * 26, -10);
    wash(c, () => { c.beginPath(); c.ellipse(0, 0, 9, 7, 0, 0, Math.PI * 2); }, '#e2553f', 'rgba(120,30,20,.5)');
    c.rotate(-s * snap * 0.6); poly(c, [0, -2, s * 10, -12, s * 8, -2], '#e2553f');
    c.restore();
  };
  claw(-1); claw(1);
  wash(c, () => { c.beginPath(); c.ellipse(0, 4, 22, 14, 0, 0, Math.PI * 2); }, '#e8604a', 'rgba(120,30,20,.55)');
  c.strokeStyle = '#b8402f'; c.lineWidth = 2; c.beginPath(); c.moveTo(-6, -8); c.lineTo(-7, -17); c.moveTo(6, -8); c.lineTo(7, -17); c.stroke();
  circ(c, -7, -19, 3, '#fff'); circ(c, 7, -19, 3, '#fff'); circ(c, -7, -19, 1.5, '#111'); circ(c, 7, -19, 1.5, '#111');
}

/* ===== shared watercolour helpers for stages 2-10 ===== */
const TAU = Math.PI * 2;
const { q, note, puff } = QS;
// Vertical gradient fill of a band.
function band(c, y0, y1, stops) { const g = c.createLinearGradient(0, y0, 0, y1); stops.forEach(([p, col]) => g.addColorStop(p, col)); c.fillStyle = g; c.fillRect(0, y0, W, y1 - y0); }
// Midpoint displacement: the ragged edge of a watercolour wash.
function deform(R, pts, depth, amt) {
  let p = pts;
  for (let d = 0; d < depth; d++, amt *= 0.55) {
    const n = [];
    for (let i = 0; i < p.length; i += 2) { const j = (i + 2) % p.length; n.push(p[i], p[i + 1], (p[i] + p[j]) / 2 + (R() - 0.5) * amt, (p[i + 1] + p[j + 1]) / 2 + (R() - 0.5) * amt); }
    p = n;
  }
  return p;
}
// A watercolour wash: many thin, slightly different glazes of one colour (bg only, drawn once).
function wc(c, R, pts, col, layers = 6, a = 0.13, amt = 12) {
  const base = deform(R, pts, 2, amt);
  c.fillStyle = col; c.globalAlpha = a;
  for (let k = 0; k < layers; k++) { const p = deform(R, base, 3, amt * 0.6); c.beginPath(); c.moveTo(p[0], p[1]); for (let i = 2; i < p.length; i += 2) c.lineTo(p[i], p[i + 1]); c.closePath(); c.fill(); }
  c.globalAlpha = 1;
}
// Soft round blooms of pigment.
function blooms(c, R, n, cols, r0, r1, a, x0 = 0, y0 = 0, w = W, h = H) {
  for (let i = 0; i < n; i++) {
    const x = x0 + R() * w, y = y0 + R() * h, r = r0 + R() * (r1 - r0), col = cols[i % cols.length];
    const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(0.6, `rgba(${col},${a * 0.6})`); g.addColorStop(1, `rgba(${col},0)`);
    c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
}
function rays(c, R, n, col, y0, y1) {
  const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, col); g.addColorStop(0.6, col); g.addColorStop(1, col.replace(/[\d.]+\)$/, '0)'));
  for (let i = 0; i < n; i++) { const x = -20 + i * (W + 40) / n + R() * 20, w = 14 + R() * 22; poly(c, [x, y0, x + w, y0, x + w + 70, y1, x + 30, y1], g); }
}
// Text that always fits its sign, whatever font has loaded.
function fitTxt(c, s, x, y, font, col, maxW) {
  c.font = font; const w = c.measureText(s).width;
  if (w <= maxW) { txt(c, s, x, y, font, col); return; }
  c.save(); c.translate(x, y); c.scale(maxW / w, 1); txt(c, s, 0, 0, font, col); c.restore();
}
function fizz(c, R, n, y0, y1, a = 0.4) { c.lineWidth = 1; c.strokeStyle = `rgba(255,255,255,${a})`; for (let i = 0; i < n; i++) { c.beginPath(); c.arc(R() * W, y0 + R() * (y1 - y0), 1 + R() * 3, 0, TAU); c.stroke(); } }
// Granulation: tiny pigment specks that make a wash look painted on paper.
function specks(c, R, n, col, y0 = 0, y1 = H) { c.fillStyle = col; for (let i = 0; i < n; i++) c.fillRect(R() * W, y0 + R() * (y1 - y0), 0.8 + R(), 0.8 + R()); }
// Wavy horizontal edge filled downwards (sand, water line).
function shore(c, y, amp, k, col, ph = 0) { c.beginPath(); c.moveTo(0, H); c.lineTo(0, y); for (let x = 0; x <= W; x += 8) c.lineTo(x, y + Math.sin(x / k + ph) * amp); c.lineTo(W, H); c.closePath(); c.fillStyle = col; c.fill(); }
function eye(c, x, y, r) { circ(c, x, y, r, '#1b2030'); circ(c, x - r * 0.35, y - r * 0.4, r * 0.4, '#fff'); }
function blush(c, x, y, r) { ell(c, x, y, r, r * 0.6, 'rgba(255,120,130,.35)'); }
function waterline(c, x0, x1, y, t, col = 'rgba(215,240,240,.5)') { c.beginPath(); c.moveTo(x0, y); for (let x = x0; x <= x1; x += 8) c.lineTo(x, y + Math.sin(x * 0.25 + t * 2) * 1.5); c.lineTo(x1, y + 8); c.quadraticCurveTo((x0 + x1) / 2, y + 12, x0, y + 8); c.closePath(); c.fillStyle = col; c.fill(); }
function kelp(c, R, x, y0, y1, col, blade, w) {
  const ph = R() * 6; c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round';
  c.beginPath(); c.moveTo(x, y0); for (let y = y0; y >= y1; y -= 8) c.lineTo(x + Math.sin(y / 30 + ph) * 8, y); c.stroke();
  for (let y = y0 - 18; y > y1 + 8; y -= 20 + R() * 12) { const xx = x + Math.sin(y / 30 + ph) * 8, s = R() < 0.5 ? -1 : 1; ell(c, xx + s * 13, y - 5, 14, 4.5, blade, -s * 0.5); circ(c, xx + s * 2, y, 2.6, blade); }
  c.lineCap = 'butt';
}

/* ===== sounds of this world (Q style) ===== */
defineCreatureSound('ocean_dolphin', (ac, o, t) => {
  [0, 0.06, 0.12].forEach((d, k) => q(ac, o, t + d, [[0, 2200 + k * 150], [0.035, 2700 + k * 150]], 0.04, { attack: 0.003, hold: 0.2, vol: 0.3 }));
  q(ac, o, t + 0.22, [[0, 1500], [0.16, 2600], [0.32, 2100]], 0.34, { vib: [16, 60], vol: 0.38 });
});
defineCreatureSound('ocean_seal', (ac, o, t) => [0, 0.19].forEach((d, k) => q(ac, o, t + d, [[0, 520 + k * 60], [0.05, 760 + k * 60], [0.15, 540]], 0.16, { vol: 0.42, over: 0.25 })));
defineCreatureSound('ocean_otter', (ac, o, t) => { q(ac, o, t, [[0, 1500], [0.06, 2100], [0.14, 1750]], 0.15, { vib: [18, 50], vol: 0.36 }); q(ac, o, t + 0.2, [[0, 1650], [0.09, 2400]], 0.12, { vol: 0.34 }); });
defineCreatureSound('ocean_jelly', (ac, o, t) => { q(ac, o, t, [[0, 640], [0.18, 1050], [0.46, 860]], 0.5, { vib: [6, 40], attack: 0.05, vol: 0.36 }); q(ac, o, t + 0.12, [[0, 1500], [0.36, 1900]], 0.36, { vib: [8, 50], vol: 0.12 }); });
defineCreatureSound('ocean_seahorse', (ac, o, t) => { [1568, 1976, 2349].forEach((f, k) => note(ac, o, t + k * 0.07, f, 0.16, 0.26)); q(ac, o, t + 0.24, [[0, 2349], [0.2, 2794]], 0.22, { vib: [12, 40], vol: 0.28 }); });
defineCreatureSound('ocean_puffer', (ac, o, t) => { q(ac, o, t, [[0, 360], [0.26, 980]], 0.28, { vib: [24, 30], vol: 0.38 }); q(ac, o, t + 0.32, [[0, 1700], [0.05, 800]], 0.07, { attack: 0.002, hold: 0.1, vol: 0.42 }); puff(ac, o, t + 0.32, 0.07, 1600, 0.08); });
defineCreatureSound('ocean_angler', (ac, o, t) => { q(ac, o, t, [[0, 440], [0.12, 380], [0.28, 560]], 0.3, { vib: [7, 12], vol: 0.42 }); note(ac, o, t + 0.32, 1976, 0.3, 0.24); note(ac, o, t + 0.4, 2637, 0.3, 0.16); });
defineCreatureSound('ocean_calf', (ac, o, t) => q(ac, o, t, [[0, 780], [0.16, 1250], [0.42, 1000]], 0.46, { vib: [6, 20], attack: 0.05, vol: 0.4 }));
defineCreatureSound('ocean_gull', (ac, o, t) => [0, 0.16, 0.3].forEach((d, k) => q(ac, o, t + d, [[0, 1300 - k * 60], [0.04, 1700 - k * 60], [0.12, 1250 - k * 80]], 0.13, { vol: 0.38, over: 0.22 })));
defineCreatureSound('ocean_beluga', (ac, o, t) => { [0, 0.1, 0.2].forEach((d, k) => q(ac, o, t + d, [[0, 1800 + k * 300], [0.06, 2400 + k * 200]], 0.07, { attack: 0.003, vol: 0.32 })); q(ac, o, t + 0.32, [[0, 2600], [0.12, 1800], [0.3, 2300]], 0.3, { vib: [10, 40], vol: 0.34 }); });
defineCreatureSound('ocean_walrus', (ac, o, t) => q(ac, o, t, [[0, 400], [0.1, 470], [0.34, 380]], 0.36, { trem: [18, 0.5], vol: 0.44, over: 0.25 }));
defineCreatureSound('ocean_bear', (ac, o, t) => { puff(ac, o, t, 0.08, 900, 0.07); q(ac, o, t + 0.06, [[0, 420], [0.1, 520], [0.3, 440]], 0.3, { vib: [5, 10], vol: 0.44, over: 0.22 }); });
defineCreatureSound('ocean_narwhal', (ac, o, t) => q(ac, o, t, [[0, 900], [0.1, 1400], [0.22, 1100], [0.38, 1700]], 0.4, { vib: [9, 30], vol: 0.38 }));
defineCreatureSound('ocean_hatch', (ac, o, t) => [0, 0.11].forEach((d, k) => q(ac, o, t + d, [[0, 2300 + k * 200], [0.05, 2800 + k * 200]], 0.07, { vol: 0.32 })));
defineCreatureSound('ocean_cat', (ac, o, t) => q(ac, o, t, [[0, 820], [0.1, 1250], [0.34, 780]], 0.36, { vib: [8, 22], vol: 0.4 }));
defineThingSound('ocean_buoy', (ac, o, t, r) => { q(ac, o, t, [[0, 784 * r], [0.5, 784 * r]], 0.55, { attack: 0.003, hold: 0.08, vol: 0.34, over: 0.3, vib: [4, 6] }); note(ac, o, t, 1960 * r, 0.25, 0.08); });
defineThingSound('ocean_drip', (ac, o, t, r) => { q(ac, o, t, [[0, 900 * r], [0.06, 2000 * r]], 0.08, { attack: 0.002, hold: 0.2, vol: 0.38 }); note(ac, o, t + 0.1, 1800 * r, 0.18, 0.18); });
defineThingSound('ocean_horn', (ac, o, t, r) => [0, 0.18].forEach((d) => q(ac, o, t + d, [[0, 520 * r], [0.03, 560 * r], [0.14, 540 * r]], 0.15, { vol: 0.42, over: 0.3 })));

/* ===== 2-2 Kelp forest, Monterey Bay ===== */
function bgKelp(c) {
  const R = mulberry(22);
  band(c, 0, 66, [[0, '#f6f1dc'], [1, '#dbe9d2']]);
  wc(c, R, [0, 66, 0, 46, 50, 40, 110, 50, 170, 36, 240, 48, 300, 38, 360, 46, 360, 66], '#8fae96', 6, 0.14, 10);
  wc(c, R, [0, 66, 0, 56, 90, 52, 180, 58, 270, 50, 360, 56, 360, 66], '#6f9a84', 5, 0.14, 6);
  band(c, 66, H, [[0, '#b3dcc0'], [0.3, '#62a991'], [0.7, '#2f6f6a'], [1, '#183f45']]);
  c.fillStyle = 'rgba(255,255,230,.35)'; c.fillRect(0, 66, W, 2);
  for (let y = 72; y < 100; y += 7) { c.strokeStyle = `rgba(255,255,230,${0.25 - (y - 72) * 0.007})`; c.lineWidth = 1.5; c.beginPath(); for (let x = 0; x <= W; x += 10) c.lineTo(x, y + Math.sin(x / 14 + y) * 2); c.stroke(); }
  rays(c, R, 7, 'rgba(255,255,220,.07)', 66, 420);
  blooms(c, R, 30, ['60,140,110', '30,90,80', '150,190,120'], 20, 70, 0.12, 0, 80, W, 380);
  for (let i = 0; i < 7; i++) kelp(c, R, 20 + i * 52 + R() * 20, 470, 90 + R() * 40, 'rgba(70,110,80,.35)', 'rgba(80,120,80,.3)', 3);
  [[16, 76], [148, 120], [338, 70]].forEach(([x, top]) => kelp(c, R, x, 476, top, 'rgba(126,104,40,.85)', 'rgba(168,140,58,.75)', 4));
  wc(c, R, [0, H, 0, 446, 40, 436, 90, 446, 130, 438, 180, 450, 240, 440, 300, 446, 360, 436, 360, H], '#c8b98c', 7, 0.16, 8);
  [[40, 456, 30, 16], [120, 462, 22, 12], [250, 460, 34, 18], [330, 456, 26, 14]].forEach(([x, y, rx, ry]) => wc(c, R, [x - rx, y + ry * 0.5, x - rx * 0.7, y - ry, x + rx * 0.6, y - ry, x + rx, y + ry * 0.5], '#6c6a60', 5, 0.18, 6));
  const star = (x, y, r, col) => { c.beginPath(); for (let k = 0; k < 10; k++) { const an = -Math.PI / 2 + k * Math.PI / 5, rr2 = k % 2 ? r * 0.45 : r; c.lineTo(x + Math.cos(an) * rr2, y + Math.sin(an) * rr2); } c.closePath(); c.fillStyle = col; c.fill(); };
  star(190, 458, 11, 'rgba(240,120,60,.85)'); star(300, 470, 8, 'rgba(230,90,110,.8)');
  for (const [x, y] of [[80, 452], [272, 446]]) { c.strokeStyle = 'rgba(110,50,120,.75)'; c.lineWidth = 1.2; for (let k = 0; k < 14; k++) { const an = k / 14 * TAU; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(an) * 9, y + Math.sin(an) * 7); c.stroke(); } circ(c, x, y, 5, 'rgba(90,40,100,.9)'); }
  fizz(c, R, 26, 90, 430);
  specks(c, R, 500, 'rgba(30,60,50,.08)');
}
function drawOtter(c, a) {
  const L = 0.3 + a.live, rub = Math.sin(a.t * 7) * 1.5 * a.live;
  wash(c, () => { c.beginPath(); c.ellipse(-46, 3, 11, 5, 0.15, 0, TAU); }, '#6e4529', 'rgba(60,30,10,.5)');
  c.save(); c.translate(-34, -6); c.rotate(-0.5 + Math.sin(a.t * 3) * 0.2 * L);
  wash(c, () => { c.beginPath(); c.ellipse(0, -7, 5, 8, 0, 0, TAU); }, '#5e3a22', 'rgba(50,25,10,.5)'); c.restore();
  wash(c, () => { c.beginPath(); c.ellipse(-4, 2, 40, 14, 0, 0, TAU); }, '#8a5a36', 'rgba(60,30,10,.55)');
  ell(c, -4, -4, 30, 6, 'rgba(214,170,120,.5)');
  wash(c, () => { c.beginPath(); c.arc(40, -2, 13, 0, TAU); }, '#dcc6a2', 'rgba(90,60,30,.5)');
  circ(c, 32, -13, 3.5, '#b8946a'); circ(c, 48, -13, 3.5, '#b8946a');
  eye(c, 35, -4, 2.2); eye(c, 45, -4, 2.2);
  ell(c, 40, 2, 3, 2.2, '#2a1a10'); blush(c, 31, 3, 3); blush(c, 49, 3, 3);
  c.strokeStyle = 'rgba(60,40,20,.5)'; c.lineWidth = 0.8;
  for (const s of [-1, 1]) for (const d of [-1, 1]) { c.beginPath(); c.moveTo(40 + s * 4, 3); c.lineTo(40 + s * 11, 3 + d * 2); c.stroke(); }
  const px = 18 + rub;
  wash(c, () => { c.beginPath(); c.moveTo(px - 8, -12); c.arc(px, -12, 8, Math.PI, TAU); c.closePath(); }, '#f3c9b5', 'rgba(150,80,60,.5)');
  c.strokeStyle = 'rgba(150,80,60,.5)'; c.lineWidth = 0.8; for (const d of [-4, 0, 4]) { c.beginPath(); c.moveTo(px, -12); c.lineTo(px + d, -19); c.stroke(); }
  circ(c, px - 7, -10, 3.6, '#6e4529'); circ(c, px + 7, -10, 3.6, '#6e4529');
  waterline(c, -60, 60, 9, a.t);
}
function drawDiveFlag(c, a) {
  c.translate(0, 7);
  const w = Math.sin(a.t * 3) * 2 * a.live;
  c.strokeStyle = '#5b4a3a'; c.lineWidth = 3; c.beginPath(); c.moveTo(-12, 16); c.lineTo(-12, -42); c.stroke();
  circ(c, -12, -43, 2.5, '#e9c34a');
  const flag = () => { c.beginPath(); c.moveTo(-11, -40); c.quadraticCurveTo(5, -42 + w, 24, -40); c.lineTo(24, -16); c.quadraticCurveTo(5, -18 + w, -11, -16); c.closePath(); };
  wash(c, flag, '#e0473c', 'rgba(120,20,10,.5)');
  c.save(); flag(); c.clip(); c.strokeStyle = '#fbf4ea'; c.lineWidth = 6; c.beginPath(); c.moveTo(-11, -40); c.lineTo(24, -16); c.stroke(); c.restore();
  wash(c, () => { c.beginPath(); c.ellipse(-4, 18, 24, 10, 0, 0, TAU); }, '#f08a3a', 'rgba(130,60,10,.5)');
  c.save(); c.beginPath(); c.ellipse(-4, 18, 24, 10, 0, 0, TAU); c.clip(); c.fillStyle = 'rgba(255,255,255,.75)'; c.fillRect(-28, 14, 48, 4); c.restore();
  ell(c, -12, 13, 8, 2.5, 'rgba(255,255,255,.45)');
  waterline(c, -30, 30, 18, a.t);
}
function drawSeal(c, a) {
  const L = 0.3 + a.live, fl = Math.sin(a.t * 2.4) * 0.35 * L;
  for (const s of [-1, 1]) { c.save(); c.translate(-58, 4); c.rotate(s * 0.45 + fl * 0.5); wash(c, () => { c.beginPath(); c.ellipse(-7, 0, 9, 4.5, 0, 0, TAU); }, '#8d979b', 'rgba(40,50,60,.5)'); c.restore(); }
  const body = () => { c.beginPath(); c.moveTo(-60, 4); c.bezierCurveTo(-40, -20, 28, -26, 50, -10); c.bezierCurveTo(64, 0, 62, 14, 44, 17); c.bezierCurveTo(10, 24, -40, 18, -60, 4); c.closePath(); };
  wash(c, body, '#aab3b6', 'rgba(40,50,60,.55)');
  c.save(); body(); c.clip(); ell(c, 0, 18, 56, 9, '#dde0d8');
  [[-30, -6, 3], [-12, -12, 2.5], [4, -6, 3], [18, -14, 2], [-44, -2, 2], [28, -4, 2.4], [-20, 2, 2], [10, 4, 1.8]].forEach(([x, y, r]) => circ(c, x, y, r, 'rgba(70,80,90,.45)'));
  c.restore();
  c.save(); c.translate(12, 12); c.rotate(0.6 + fl); wash(c, () => { c.beginPath(); c.ellipse(5, 0, 12, 5, 0, 0, TAU); }, '#8d979b', 'rgba(40,50,60,.5)'); c.restore();
  eye(c, 42, -8, 4.4); ell(c, 59, -2, 3, 2.2, '#2b2f36'); blush(c, 46, 3, 4);
  c.strokeStyle = 'rgba(40,45,55,.5)'; c.lineWidth = 0.8; for (const d of [-2, 1, 4]) { c.beginPath(); c.moveTo(55, 2); c.lineTo(66, 2 + d * 1.5); c.stroke(); }
  c.lineWidth = 1.2; c.beginPath(); c.arc(55, 4, 3, 0.3, Math.PI - 0.3); c.stroke();
}
function drawGaribaldi(c, a) {
  const tail = Math.sin(a.t * 10) * 0.3 * (0.3 + a.live);
  c.save(); c.translate(-22, 0); c.rotate(tail);
  wash(c, () => { c.beginPath(); c.moveTo(2, 0); c.quadraticCurveTo(-6, -14, -14, -16); c.quadraticCurveTo(-10, 0, -14, 16); c.quadraticCurveTo(-6, 14, 2, 0); c.closePath(); }, '#ff8a2a', 'rgba(150,50,0,.5)');
  c.restore();
  wash(c, () => { c.beginPath(); c.moveTo(-18, -12); c.quadraticCurveTo(-2, -24, 16, -15); c.lineTo(10, -8); c.lineTo(-14, -6); c.closePath(); }, '#ff8f2e', 'rgba(150,50,0,.45)');
  wash(c, () => { c.beginPath(); c.moveTo(-14, 10); c.quadraticCurveTo(-4, 22, 8, 14); c.lineTo(4, 8); c.closePath(); }, '#ff8f2e', 'rgba(150,50,0,.45)');
  wash(c, () => { c.beginPath(); c.ellipse(2, 0, 25, 17, 0, 0, TAU); }, '#ff7a1a', 'rgba(150,50,0,.55)');
  ell(c, -2, -6, 14, 6, 'rgba(255,190,110,.55)', -0.2);
  ell(c, 4, 4, 6, 3, 'rgba(230,90,10,.6)', 0.6);
  eye(c, 16, -4, 3.6); blush(c, 17, 4, 3);
  c.strokeStyle = 'rgba(140,40,0,.7)'; c.lineWidth = 1.2; c.beginPath(); c.arc(25, 3, 2.5, -0.3, 1.5); c.stroke();
}

/* ===== 2-3 Shipwreck treasure, Caribbean ===== */
function bgWreck(c) {
  const R = mulberry(23);
  band(c, 0, H, [[0, '#a5e3dc'], [0.35, '#3fa0ad'], [0.75, '#1f6680'], [1, '#123c55']]);
  rays(c, R, 6, 'rgba(255,255,255,.07)', 0, 400);
  blooms(c, R, 34, ['40,140,160', '20,90,120', '120,200,190'], 20, 70, 0.12);
  wc(c, R, [140, 440, 160, 300, 250, 246, 360, 232, 360, 440], '#2f4440', 7, 0.13, 14);
  c.strokeStyle = 'rgba(35,50,48,.35)'; c.lineWidth = 6; c.lineCap = 'round';
  for (let k = 0; k < 6; k++) { const x = 180 + k * 30; c.beginPath(); c.moveTo(x, 300 - k * 9); c.quadraticCurveTo(x + 18, 360, x + 6, 432); c.stroke(); }
  c.lineWidth = 8; c.beginPath(); c.moveTo(236, 258); c.lineTo(310, 70); c.stroke();
  c.lineWidth = 4; c.beginPath(); c.moveTo(262, 140); c.lineTo(330, 168); c.stroke();
  c.lineCap = 'butt';
  for (const [x, y] of [[300, 300], [330, 292]]) { c.strokeStyle = 'rgba(160,210,200,.3)'; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 8, 0, TAU); c.stroke(); }
  wc(c, R, [0, H, 0, 432, 60, 424, 130, 436, 200, 426, 270, 436, 360, 428, 360, H], '#e6d6a2', 8, 0.17, 8);
  c.strokeStyle = 'rgba(150,120,70,.25)'; c.lineWidth = 1.2;
  for (let y = 448; y < H; y += 9) { c.beginPath(); for (let x = 0; x <= W; x += 10) c.lineTo(x, y + Math.sin(x / 16 + y) * 2); c.stroke(); }
  c.strokeStyle = 'rgba(150,80,170,.7)'; c.lineWidth = 1.5;
  const fan = (x, y, r, n) => { for (let k = 0; k < n; k++) { const an = -Math.PI * 0.85 + k / (n - 1) * Math.PI * 0.7; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + Math.cos(an) * r * 0.5 + 4, y + Math.sin(an) * r * 0.5, x + Math.cos(an) * r, y + Math.sin(an) * r); c.stroke(); } };
  fan(22, 438, 44, 9); c.strokeStyle = 'rgba(240,140,120,.7)'; fan(348, 440, 34, 7);
  wc(c, R, [128, 442, 132, 426, 150, 422, 160, 434, 156, 444], '#c9b46a', 5, 0.25, 4);
  for (let i = 0; i < 14; i++) { const x = 130 + R() * 210, y = 446 + R() * 26; ell(c, x, y, 3.2, 1.6, 'rgba(230,180,60,.8)'); }
  fizz(c, R, 28, 20, 420);
  specks(c, R, 500, 'rgba(20,50,60,.08)');
}
function drawShipBell(c, a) {
  c.translate(0, 4);
  wash(c, () => rr(c, -32, -44, 64, 10, 3), '#7a5634', 'rgba(50,30,10,.6)');
  c.strokeStyle = 'rgba(60,40,20,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-28, -39); c.lineTo(28, -39); c.stroke();
  circ(c, -24, -39, 1.8, '#3a3a3a'); circ(c, 24, -39, 1.8, '#3a3a3a');
  c.strokeStyle = '#4c4c4c'; c.lineWidth = 3; c.beginPath(); c.moveTo(-8, -34); c.lineTo(-6, -28); c.moveTo(8, -34); c.lineTo(6, -28); c.stroke();
  c.save(); c.translate(0, 14); c.rotate(Math.sin(a.t * 2.5) * 0.25 * a.live);
  c.strokeStyle = '#5a4630'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -4); c.lineTo(0, 14); c.stroke(); circ(c, 0, 17, 5, '#8a6a3a'); c.restore();
  const bell = () => { c.beginPath(); c.moveTo(-11, -30); c.quadraticCurveTo(-14, -8, -20, 8); c.quadraticCurveTo(-23, 16, -28, 20); c.lineTo(28, 20); c.quadraticCurveTo(23, 16, 20, 8); c.quadraticCurveTo(14, -8, 11, -30); c.closePath(); };
  wash(c, bell, '#c9a14a', 'rgba(90,60,10,.6)');
  c.save(); bell(); c.clip();
  ell(c, -14, 10, 9, 6, 'rgba(80,170,140,.45)'); ell(c, 12, -16, 6, 8, 'rgba(80,170,140,.4)'); ell(c, 20, 14, 7, 4, 'rgba(80,170,140,.4)');
  ell(c, -6, -10, 4, 14, 'rgba(255,240,190,.4)', 0.1);
  c.strokeStyle = 'rgba(90,60,10,.45)'; c.lineWidth = 1.4;
  for (const y of [-20, 8, 13]) { c.beginPath(); c.moveTo(-30, y); c.lineTo(30, y); c.stroke(); }
  c.restore();
  ell(c, 0, 20, 28, 3.5, '#9c7a30');
  circ(c, -16, 2, 2, 'rgba(255,255,255,.7)'); circ(c, 18, -2, 1.6, 'rgba(255,255,255,.6)');
}
function drawPuffer(c, a) {
  const L = 0.3 + a.live, s = 1 + Math.sin(a.t * 1.6) * 0.06 * a.live;
  c.save(); c.translate(-28, 0); c.rotate(Math.sin(a.t * 9) * 0.3 * L);
  wash(c, () => { c.beginPath(); c.moveTo(2, 0); c.lineTo(-8, -9); c.quadraticCurveTo(-5, 0, -8, 9); c.closePath(); }, '#e8c467', 'rgba(120,90,20,.5)'); c.restore();
  c.save(); c.scale(s, s);
  c.fillStyle = '#c9a24f';
  for (let k = 0; k < 16; k++) { const an = k / 16 * TAU, x = Math.cos(an), y = Math.sin(an); c.beginPath(); c.moveTo(x * 22 - y * 3, y * 22 + x * 3); c.lineTo(x * 30, y * 30); c.lineTo(x * 22 + y * 3, y * 22 - x * 3); c.closePath(); c.fill(); }
  wash(c, () => { c.beginPath(); c.arc(0, 0, 24, 0, TAU); }, '#f2d27a', 'rgba(120,90,20,.55)');
  c.save(); c.beginPath(); c.arc(0, 0, 24, 0, TAU); c.clip(); ell(c, 0, 16, 26, 12, '#fbf0cf'); c.restore();
  [[-10, -12], [-16, -2], [-4, -18], [2, -10], [-12, 8], [-20, -10]].forEach(([x, y]) => circ(c, x, y, 2, 'rgba(120,80,30,.55)'));
  c.restore();
  c.save(); c.translate(-4, 6); c.rotate(Math.sin(a.t * 8) * 0.4 * L); c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 8, Math.PI * 0.75, Math.PI * 1.15); c.closePath(); c.fillStyle = 'rgba(232,196,103,.9)'; c.fill(); c.restore();
  circ(c, 10, -7, 7, '#fff'); eye(c, 12, -7, 3.6);
  blush(c, 12, 5, 4);
  c.strokeStyle = '#8a5a20'; c.lineWidth = 1.6; c.beginPath(); c.arc(25, 3, 3, 0, TAU); c.stroke();
}
function drawAnchor(c, a) {
  c.lineCap = 'round';
  c.strokeStyle = '#4e4440'; c.lineWidth = 5; c.beginPath(); c.arc(0, -50, 8, 0, TAU); c.stroke();
  c.strokeStyle = '#5c504a'; c.lineWidth = 11; c.beginPath(); c.arc(0, 6, 38, 0.38, Math.PI - 0.38); c.stroke();
  c.strokeStyle = '#7a6a60'; c.lineWidth = 5; c.beginPath(); c.arc(0, 6, 38, 0.5, Math.PI - 0.5); c.stroke();
  c.lineCap = 'butt';
  poly(c, [27, 30, 44, 6, 42, 24], '#5c504a'); poly(c, [-27, 30, -44, 6, -42, 24], '#5c504a');
  wash(c, () => rr(c, -5, -40, 10, 82, 4), '#6b5d55', 'rgba(40,30,25,.6)');
  wash(c, () => rr(c, -28, -38, 56, 8, 4), '#6b5d55', 'rgba(40,30,25,.6)');
  circ(c, -29, -34, 4.5, '#5c504a'); circ(c, 29, -34, 4.5, '#5c504a');
  ell(c, 0, 0, 4, 16, 'rgba(190,100,50,.45)'); ell(c, -16, 34, 8, 4, 'rgba(190,100,50,.45)'); ell(c, 18, -34, 6, 3, 'rgba(190,100,50,.45)');
  [[-3, 22], [2, 28], [-20, 36], [22, 33], [3, -20]].forEach(([x, y]) => { circ(c, x, y, 2.6, '#efe9dc'); circ(c, x, y, 1, '#8a8278'); });
  c.strokeStyle = 'rgba(70,150,90,.85)'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(14, -34);
  for (let k = 1; k <= 6; k++) c.lineTo(14 + Math.sin(a.t * 2 + k) * 3 * (0.3 + a.live) + k * 0.5, -34 + k * 5); c.stroke();
}
function drawChest(c, a) {
  const lid = () => { c.beginPath(); c.moveTo(-44, -8); c.lineTo(-40, -30); c.quadraticCurveTo(0, -38, 40, -30); c.lineTo(44, -8); c.closePath(); };
  wash(c, lid, '#8a5a2e', 'rgba(60,30,10,.6)');
  c.fillStyle = 'rgba(200,155,60,.9)'; c.fillRect(-34, -33, 6, 25); c.fillRect(28, -33, 6, 25);
  wash(c, () => { c.beginPath(); c.ellipse(0, -6, 42, 11, 0, Math.PI, TAU); c.closePath(); }, '#f2c14e', 'rgba(140,90,10,.6)');
  [[-26, -9], [-14, -13], [-2, -15], [10, -13], [22, -10], [-8, -8], [6, -8], [30, -7]].forEach(([x, y]) => { circ(c, x, y, 4, '#f6cf5e'); c.strokeStyle = 'rgba(150,100,10,.6)'; c.lineWidth = 0.8; c.stroke(); });
  for (let k = 0; k < 9; k++) circ(c, -22 + k * 5, -12 - Math.sin(k / 8 * Math.PI) * 6, 1.8, '#fbf6ee');
  poly(c, [14, -18, 19, -22, 24, -18, 19, -12], '#e04a5a');
  wash(c, () => rr(c, -48, -6, 96, 40, 4), '#9b6633', 'rgba(60,30,10,.6)');
  c.strokeStyle = 'rgba(60,30,10,.35)'; c.lineWidth = 1; for (const y of [6, 20]) { c.beginPath(); c.moveTo(-46, y); c.lineTo(46, y); c.stroke(); }
  c.fillStyle = '#c79a3a'; c.fillRect(-38, -6, 7, 40); c.fillRect(31, -6, 7, 40);
  wash(c, () => rr(c, -7, -4, 14, 16, 2), '#e0b44a', 'rgba(110,70,10,.6)');
  circ(c, 0, 3, 2, '#3a2a10'); c.fillStyle = '#3a2a10'; c.fillRect(-0.8, 3, 1.6, 5);
  for (let k = 0; k < 3; k++) {
    const s = Math.max(0, Math.sin(a.t * 3 + k * 2.1)) * (0.3 + a.live) * 4, [x, y] = [[-20, -16], [8, -18], [30, -12]][k];
    if (s > 0.4) { c.fillStyle = 'rgba(255,255,240,.9)'; c.beginPath(); c.moveTo(x, y - s); c.lineTo(x + s * 0.3, y); c.lineTo(x, y + s); c.lineTo(x - s * 0.3, y); c.closePath(); c.fill(); c.fillRect(x - s, y - 0.4, 2 * s, 0.8); }
  }
}
function drawBottle(c, a) {
  wash(c, () => rr(c, -6, -8, 12, 30, 3), '#f3e6c4', 'rgba(120,90,40,.5)');
  c.strokeStyle = '#c0392b'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-6, 6); c.lineTo(6, 6); c.stroke();
  const glass = () => { c.beginPath(); c.moveTo(-14, 34); c.lineTo(-14, -4); c.quadraticCurveTo(-14, -14, -5, -18); c.lineTo(-5, -30); c.lineTo(5, -30); c.lineTo(5, -18); c.quadraticCurveTo(14, -14, 14, -4); c.lineTo(14, 34); c.closePath(); };
  wash(c, glass, 'rgba(90,170,120,.5)', 'rgba(20,70,50,.65)');
  wash(c, () => rr(c, -5, -36, 10, 8, 2), '#c79a63', 'rgba(90,60,20,.6)');
  c.strokeStyle = 'rgba(255,255,255,.65)'; c.lineWidth = 2; c.beginPath(); c.moveTo(-10, -6); c.lineTo(-10, 28); c.stroke();
  const g = Math.max(0, Math.sin(a.t * 2)) * a.live; if (g > 0.2) circ(c, 8, -10, 1.5 + g, 'rgba(255,255,255,.8)');
}

/* ===== 2-4 Whale song, Maui ===== */
function bgSong(c) {
  const R = mulberry(24);
  band(c, 0, 58, [[0, '#fdf4df'], [1, '#d4eff4']]);
  wc(c, R, [200, 58, 230, 42, 280, 34, 330, 40, 360, 46, 360, 58], '#93bfa0', 6, 0.15, 8);
  band(c, 58, H, [[0, '#acE8f2'], [0.3, '#46b0d9'], [0.7, '#1f78b8'], [1, '#15467f']]);
  c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(0, 58, W, 2);
  for (let y = 64; y < 90; y += 6) { c.strokeStyle = `rgba(255,255,255,${0.25 - (y - 64) * 0.008})`; c.lineWidth = 1.3; c.beginPath(); for (let x = 0; x <= W; x += 10) c.lineTo(x, y + Math.sin(x / 12 + y) * 2); c.stroke(); }
  rays(c, R, 8, 'rgba(255,255,255,.08)', 58, 440);
  blooms(c, R, 34, ['60,160,220', '30,100,180', '160,220,240'], 20, 70, 0.12, 0, 70, W, 400);
  c.save(); c.globalAlpha = 0.18; c.translate(330, 210); c.scale(-0.5, 0.5);
  wash(c, () => { c.beginPath(); c.moveTo(-50, 0); c.bezierCurveTo(-30, -18, 40, -22, 60, -4); c.bezierCurveTo(50, 12, -20, 14, -50, 0); c.lineTo(-70, -12); c.lineTo(-66, 10); c.closePath(); }, '#0f3560', '#0f3560'); c.restore();
  for (let k = 0; k < 9; k++) {
    const x = 20 + k * 38, y = 190 + Math.sin(k * 0.9) * 26 + k * 6, col = 'rgba(255,255,255,.2)';
    ell(c, x, y, 5, 3.6, col, -0.4); c.fillStyle = col; c.fillRect(x + 3.6, y - 20, 1.6, 20);
    if (k % 2) { c.beginPath(); c.moveTo(x + 5, y - 20); c.quadraticCurveTo(x + 12, y - 14, x + 9, y - 8); c.lineWidth = 1.6; c.strokeStyle = col; c.stroke(); }
  }
  wc(c, R, [0, H, 0, 456, 70, 450, 150, 458, 230, 452, 300, 460, 360, 452, 360, H], '#e8dcb0', 7, 0.17, 8);
  [[150, 458, 'rgba(240,140,150,.6)'], [330, 456, 'rgba(250,180,90,.6)']].forEach(([x, y, col]) => { for (let k = 0; k < 5; k++) ell(c, x - 12 + k * 6, y - 6 - (k % 2) * 5, 5, 8, col); });
  fizz(c, R, 30, 80, 440);
  specks(c, R, 500, 'rgba(20,60,110,.08)');
}
function drawBoat(c, a) {
  wash(c, () => rr(c, -40, -28, 62, 6, 2), '#e9a23b', 'rgba(120,70,10,.55)');
  wash(c, () => rr(c, -36, -22, 52, 20, 3), '#fdf8ee', 'rgba(60,70,80,.5)');
  for (let k = 0; k < 4; k++) wash(c, () => rr(c, -31 + k * 12, -18, 8, 8, 1.5), '#8fd0ea', 'rgba(40,80,110,.5)');
  c.strokeStyle = '#6b5a48'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-46, -2); c.lineTo(-46, -30); c.stroke();
  const f = Math.sin(a.t * 6) * 2 * (0.3 + a.live);
  poly(c, [-45, -30, -32, -27 + f, -45, -23], '#e0473c');
  [[30, '#f2c8a0', '#e0473c'], [42, '#e8b48a', '#3d7fc0'], [53, '#f2c8a0', '#f2c230']].forEach(([x, skin, hat]) => { circ(c, x, -9, 4, skin); ell(c, x, -12.5, 5, 2, hat); });
  c.strokeStyle = '#222'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(34, -9); c.lineTo(38, -12); c.stroke();
  const hull = () => { c.beginPath(); c.moveTo(-60, -4); c.lineTo(68, -8); c.quadraticCurveTo(56, 12, 42, 18); c.lineTo(-54, 18); c.quadraticCurveTo(-60, 10, -60, -4); c.closePath(); };
  wash(c, hull, '#f6f3ea', 'rgba(40,60,80,.55)');
  c.save(); hull(); c.clip(); c.fillStyle = '#2f7fb5'; c.fillRect(-62, 2, 132, 4); c.fillStyle = '#d9534f'; c.fillRect(-62, 12, 132, 8); c.restore();
  waterline(c, -70, 70, 10, a.t, 'rgba(190,235,250,.5)');
}
function drawDolphin(c, a, s = 1) {
  const L = 0.3 + a.live, fl = Math.sin(a.t * 3) * 0.3 * L;
  c.scale(s, s);
  c.save(); c.translate(-44, 2); c.rotate(fl);
  wash(c, () => { c.beginPath(); c.moveTo(2, 0); c.quadraticCurveTo(-6, -4, -14, -13); c.quadraticCurveTo(-10, -2, -5, 0); c.quadraticCurveTo(-10, 2, -14, 13); c.quadraticCurveTo(-6, 4, 2, 0); c.closePath(); }, '#7f97ad', 'rgba(30,50,70,.55)'); c.restore();
  wash(c, () => { c.beginPath(); c.moveTo(-4, -15); c.quadraticCurveTo(-8, -26, -20, -27); c.quadraticCurveTo(-14, -20, -16, -12); c.closePath(); }, '#6f88a0', 'rgba(30,50,70,.55)');
  const body = () => { c.beginPath(); c.moveTo(-46, 2); c.bezierCurveTo(-30, -16, 20, -22, 38, -8); c.quadraticCurveTo(46, -4, 56, -2); c.quadraticCurveTo(59, 2, 54, 4); c.quadraticCurveTo(40, 7, 34, 9); c.bezierCurveTo(10, 16, -30, 12, -46, 2); c.closePath(); };
  wash(c, body, '#8aa2b8', 'rgba(30,50,70,.55)');
  c.save(); body(); c.clip(); ell(c, 4, 13, 48, 8, '#e3ebf1'); ell(c, -4, -10, 30, 4, 'rgba(255,255,255,.3)'); c.restore();
  c.save(); c.translate(10, 9); c.rotate(0.6 + fl * 0.6); wash(c, () => { c.beginPath(); c.ellipse(5, 0, 10, 4, 0, 0, TAU); }, '#6f88a0', 'rgba(30,50,70,.5)'); c.restore();
  eye(c, 31, -5, 2.8); blush(c, 33, 3, 3.2);
  c.strokeStyle = 'rgba(30,50,70,.7)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(42, 4); c.quadraticCurveTo(48, 6, 54, 3); c.stroke();
}
function drawHump(c, a, s, col, belly) {
  const L = 0.3 + a.live, fl = Math.sin(a.t * 1.6) * 0.25 * L;
  c.scale(s, s); c.translate(0, -8);
  c.save(); c.translate(-92, -2); c.rotate(fl);
  wash(c, () => { c.beginPath(); c.moveTo(4, 0); c.quadraticCurveTo(-8, -8, -20, -24); c.quadraticCurveTo(-12, -6, -6, 0); c.quadraticCurveTo(-12, 6, -20, 24); c.quadraticCurveTo(-8, 8, 4, 0); c.closePath(); }, col, 'rgba(20,35,60,.55)'); c.restore();
  wash(c, () => { c.beginPath(); c.moveTo(-36, -22); c.quadraticCurveTo(-30, -30, -24, -26); c.lineTo(-20, -24); c.closePath(); }, col, 'rgba(20,35,60,.5)');
  const body = () => { c.beginPath(); c.moveTo(-94, 0); c.bezierCurveTo(-60, -30, 40, -40, 92, -12); c.quadraticCurveTo(108, -2, 104, 8); c.quadraticCurveTo(80, 26, 30, 30); c.bezierCurveTo(-20, 30, -70, 14, -94, 0); c.closePath(); };
  wash(c, body, col, 'rgba(20,35,60,.55)');
  c.save(); body(); c.clip(); ell(c, 40, 28, 64, 11, belly);
  c.strokeStyle = 'rgba(20,35,60,.3)'; c.lineWidth = 1.2; for (let k = 0; k < 8; k++) { c.beginPath(); c.moveTo(4 + k * 11, 20); c.lineTo(0 + k * 11, 32); c.stroke(); }
  ell(c, 0, -18, 60, 6, 'rgba(255,255,255,.12)');
  c.restore();
  [[70, -20], [80, -16], [88, -11], [76, -10], [95, -5], [64, -14]].forEach(([x, y]) => circ(c, x, y, 2.2, 'rgba(20,35,60,.35)'));
  eye(c, 62, 3, 3.2); blush(c, 66, 12, 4);
  c.strokeStyle = 'rgba(20,35,60,.6)'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(103, 7); c.quadraticCurveTo(86, 14, 70, 10); c.stroke();
  c.save(); c.translate(32, 14); c.rotate(-0.45 + fl * 0.5);
  wash(c, () => { c.beginPath(); c.ellipse(-34, 0, 36, 7, 0, 0, TAU); }, '#e6edf1', 'rgba(20,35,60,.5)');
  for (let k = 0; k < 5; k++) circ(c, -60 + k * 11, -6.5, 1.8, 'rgba(20,35,60,.3)');
  c.restore();
}
function drawMomWhale(c, a) { drawHump(c, a, 1, '#4d6b8f', '#dfe8ef'); }
function drawCalf(c, a) { drawHump(c, a, 0.56, '#7193b6', '#eef3f7'); }
function drawHydrophone(c, a) {
  c.strokeStyle = '#5c6670'; c.lineWidth = 4; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, -8); c.lineTo(-28, 48); c.moveTo(0, -8); c.lineTo(28, 48); c.moveTo(0, -8); c.lineTo(0, 50); c.stroke(); c.lineCap = 'butt';
  for (const x of [-28, 0, 28]) ell(c, x, 50, 7, 2.5, '#3f474f');
  c.strokeStyle = '#2b2b2b'; c.lineWidth = 2; c.beginPath(); c.moveTo(4, -12); c.bezierCurveTo(20, -4, 6, 30, 34, 46); c.stroke();
  wash(c, () => rr(c, -11, -46, 22, 38, 9), '#f2c230', 'rgba(110,80,10,.6)');
  c.strokeStyle = 'rgba(110,80,10,.5)'; c.lineWidth = 1; for (const y of [-38, -30, -22]) { c.beginPath(); c.moveTo(-10, y); c.lineTo(10, y); c.stroke(); }
  const on = Math.sin(a.t * 4) > 0;
  circ(c, 0, -16, 3, on ? '#ff5a4f' : '#7a2a26'); if (on) { c.strokeStyle = 'rgba(255,90,80,.35)'; c.lineWidth = 2; c.beginPath(); c.arc(0, -16, 5.5, 0, TAU); c.stroke(); }
  const w = (a.t * 0.8) % 1;
  c.strokeStyle = `rgba(255,255,255,${0.6 * (1 - w) * (0.3 + a.live)})`; c.lineWidth = 1.5;
  for (const s of [-1, 1]) { c.beginPath(); c.arc(0, -30, 16 + w * 12, s > 0 ? -0.6 : Math.PI - 0.6, s > 0 ? 0.6 : Math.PI + 0.6); c.stroke(); }
}

/* ===== 2-5 Jellyfish Lake, Palau ===== */
function bgJelly(c) {
  const R = mulberry(25);
  band(c, 0, 78, [[0, '#fff3c8'], [1, '#f2dfa2']]);
  wc(c, R, [0, 78, 0, 0, 70, 0, 96, 24, 80, 50, 110, 78], '#5c8f4a', 7, 0.16, 14);
  wc(c, R, [360, 78, 360, 0, 280, 0, 250, 30, 276, 56, 240, 78], '#4f8a48', 7, 0.16, 14);
  wc(c, R, [0, 60, 0, 10, 40, 6, 52, 36, 30, 64], '#2f6a3a', 5, 0.15, 8);
  wc(c, R, [360, 64, 360, 8, 312, 16, 300, 44, 330, 70], '#2f6a3a', 5, 0.15, 8);
  band(c, 78, H, [[0, '#ece6a8'], [0.25, '#a8c98e'], [0.6, '#5c9a7c'], [1, '#2a5a52']]);
  c.fillStyle = 'rgba(255,255,230,.5)'; c.fillRect(0, 78, W, 2);
  c.strokeStyle = 'rgba(80,64,40,.55)'; c.lineCap = 'round';
  for (const [x0, s] of [[4, 1], [356, -1]]) for (let k = 0; k < 6; k++) {
    const x = x0 + s * k * (7 + R() * 6), len = 50 + R() * 90, bend = s * (10 + R() * 16);
    c.lineWidth = 1.5 + R() * 2.5; c.globalAlpha = 0.5 + R() * 0.35;
    c.beginPath(); c.moveTo(x, 64); c.quadraticCurveTo(x + bend, 80 + len * 0.5, x + bend * 0.3, 80 + len); c.stroke();
    if (k % 2) { c.lineWidth = 1; c.beginPath(); c.moveTo(x + bend * 0.6, 80 + len * 0.45); c.quadraticCurveTo(x + bend * 1.3, 90 + len * 0.6, x + bend * 1.1, 96 + len * 0.75); c.stroke(); }
  }
  c.globalAlpha = 1;
  c.lineCap = 'butt';
  rays(c, R, 7, 'rgba(255,240,170,.1)', 78, 440);
  blooms(c, R, 30, ['230,200,90', '90,150,100', '200,220,140'], 20, 70, 0.12, 0, 90, W, 380);
  for (let i = 0; i < 26; i++) {
    const x = 20 + R() * 320, y = 110 + R() * 340, r = 4 + R() * 9, al = 0.12 + R() * 0.16;
    c.beginPath(); c.ellipse(x, y, r, r * 0.8, 0, Math.PI, TAU); c.closePath(); c.fillStyle = `rgba(240,180,70,${al})`; c.fill();
    c.fillStyle = `rgba(240,200,120,${al * 0.8})`; c.fillRect(x - r * 0.5, y, r, r * 0.6);
  }
  wc(c, R, [0, H, 0, 462, 90, 456, 180, 466, 270, 456, 360, 464, 360, H], '#4e7a4e', 6, 0.15, 8);
  fizz(c, R, 22, 100, 440, 0.35);
  specks(c, R, 500, 'rgba(60,60,20,.08)');
}
function drawGoldJelly(c, a, s = 1) {
  const L = 0.3 + a.live, p = Math.sin(a.t * 2.2) * L;
  c.scale(s, s); c.translate(0, -4);
  for (let i = 0; i < 6; i++) { const x = -18 + i * 7.2 + Math.sin(a.t * 2 + i) * 2 * L; ell(c, x, 10 + (i % 2) * 5, 6.5, 11, 'rgba(236,170,70,.8)'); }
  for (let i = 0; i < 8; i++) { const x = -24 + i * 6.8, sw = Math.sin(a.t * 1.8 + i * 0.8) * 3 * L; c.strokeStyle = 'rgba(240,190,110,.75)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x * 0.8, 16); c.quadraticCurveTo(x + sw, 30, x * 1.05 + sw, 40); c.stroke(); circ(c, x * 1.05 + sw, 42, 3.4, 'rgba(250,220,160,.9)'); }
  const w = 40 * (1 + 0.05 * p), h = 50 * (1 - 0.04 * p);
  const bell = () => { c.beginPath(); c.moveTo(-w, 4); c.bezierCurveTo(-w, -h, w, -h, w, 4); c.quadraticCurveTo(w * 0.5, 9, 0, 6); c.quadraticCurveTo(-w * 0.5, 9, -w, 4); c.closePath(); };
  wash(c, bell, 'rgba(240,176,64,.88)', 'rgba(150,90,20,.55)');
  c.save(); bell(); c.clip(); ell(c, -14, -24, 14, 9, 'rgba(255,240,200,.45)', -0.4);
  [[-20, -8], [-8, -16], [6, -20], [18, -10], [26, -2], [-28, -1], [0, -4], [12, 0]].forEach(([x, y]) => circ(c, x, y, 2.4, 'rgba(255,250,220,.75)'));
  c.restore();
  eye(c, -9, -8, 3); eye(c, 9, -8, 3); blush(c, -15, -2, 3.5); blush(c, 15, -2, 3.5);
  c.strokeStyle = 'rgba(120,70,10,.7)'; c.lineWidth = 1.3; c.beginPath(); c.arc(0, -4, 3, 0.3, Math.PI - 0.3); c.stroke();
}
function drawLittleJelly(c, a) { drawGoldJelly(c, a, 0.68); }
function drawMoonJelly(c, a) {
  c.translate(0, -7);
  const L = 0.3 + a.live, p = Math.sin(a.t * 1.8) * L;
  c.strokeStyle = 'rgba(225,235,255,.6)'; c.lineWidth = 0.9;
  for (let i = 0; i < 15; i++) { const x = -40 + i * 5.7, sw = Math.sin(a.t * 2 + i * 0.6) * 3 * L; c.beginPath(); c.moveTo(x, 4); c.quadraticCurveTo(x + sw, 16, x - sw, 24 + (i % 3) * 4); c.stroke(); }
  c.strokeStyle = 'rgba(245,215,240,.75)'; c.lineWidth = 3;
  for (let i = 0; i < 4; i++) { const x = -9 + i * 6, sw = Math.sin(a.t * 1.5 + i) * 5 * L; c.beginPath(); c.moveTo(x, 4); c.bezierCurveTo(x + sw, 20, x - sw, 32, x + sw * 0.5 + (i - 1.5) * 4, 44); c.stroke(); }
  const w = 42 * (1 + 0.05 * p);
  const bell = () => { c.beginPath(); c.moveTo(-w, 4); c.bezierCurveTo(-w * 0.95, -40, w * 0.95, -40, w, 4); c.quadraticCurveTo(0, 11, -w, 4); c.closePath(); };
  wash(c, bell, 'rgba(215,230,252,.6)', 'rgba(120,140,190,.6)');
  c.strokeStyle = 'rgba(190,130,215,.75)'; c.lineWidth = 3;
  [[-16, -10], [-5, -16], [6, -16], [17, -10]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 4.5, 0.2, Math.PI * 1.8); c.stroke(); });
  ell(c, -18, -22, 10, 5, 'rgba(255,255,255,.4)', -0.4);
  eye(c, -8, -2, 2.4); eye(c, 8, -2, 2.4); blush(c, -14, 2, 3); blush(c, 14, 2, 3);
}
function drawCardinal(c, a) {
  const tail = Math.sin(a.t * 9) * 0.25 * (0.3 + a.live);
  c.save(); c.translate(-24, 0); c.rotate(tail);
  wash(c, () => { c.beginPath(); c.moveTo(2, 0); c.quadraticCurveTo(-6, -10, -10, -12); c.quadraticCurveTo(-6, 0, -10, 12); c.quadraticCurveTo(-6, 10, 2, 0); c.closePath(); }, '#e6dfc4', 'rgba(80,80,60,.5)'); c.restore();
  wash(c, () => { c.beginPath(); c.moveTo(-6, -10); c.quadraticCurveTo(0, -20, 6, -10); c.closePath(); }, '#d8d0b0', 'rgba(80,80,60,.5)');
  wash(c, () => { c.beginPath(); c.moveTo(-18, -8); c.quadraticCurveTo(-14, -18, -10, -9); c.closePath(); }, '#d8d0b0', 'rgba(80,80,60,.5)');
  const body = () => { c.beginPath(); c.ellipse(2, 0, 25, 12, 0, 0, TAU); };
  wash(c, body, '#efe8d0', 'rgba(80,80,60,.55)');
  c.save(); body(); c.clip(); c.fillStyle = 'rgba(30,30,30,.85)'; c.fillRect(-4, -14, 6, 28);
  [[-14, -2], [-18, 5], [-10, 6], [-20, -4]].forEach(([x, y]) => circ(c, x, y, 1.7, 'rgba(30,30,30,.8)')); ell(c, 8, -5, 10, 3, 'rgba(255,255,255,.5)'); c.restore();
  circ(c, 17, -2, 5.5, '#fff6d8'); eye(c, 18, -2, 3.4);
  c.strokeStyle = 'rgba(80,60,40,.7)'; c.lineWidth = 1; c.beginPath(); c.arc(25, 4, 2.4, -0.2, 1.6); c.stroke();
}
function drawLakeSign(c, a) {
  wash(c, () => rr(c, -5, -8, 10, 42, 2), '#6d5034', 'rgba(50,30,10,.6)');
  wash(c, () => rr(c, -56, -34, 112, 30, 6), '#c99d66', 'rgba(90,60,25,.65)');
  c.strokeStyle = 'rgba(110,70,30,.3)'; c.lineWidth = 1; for (const y of [-26, -14]) { c.beginPath(); c.moveTo(-52, y); c.quadraticCurveTo(0, y + 2, 52, y); c.stroke(); }
  circ(c, -50, -28, 1.6, '#4a3520'); circ(c, 50, -28, 1.6, '#4a3520');
  wash(c, () => { c.beginPath(); c.ellipse(-38, -19, 9, 6, 0, 0, TAU); }, '#7fd0e6', 'rgba(30,70,90,.6)');
  c.strokeStyle = '#2b2b2b'; c.lineWidth = 2; c.beginPath(); c.moveTo(-30, -19); c.lineTo(-27, -19); c.lineTo(-27, -31); c.stroke();
  fitTxt(c, T('只能浮潛', 'Snorkel only'), 14, -19, T('900 16px "Noto Sans TC", sans-serif', '600 20px Caveat, "Noto Sans TC", cursive'), '#3d2a17', 70);
  waterline(c, -60, 60, 24, a.t, 'rgba(240,240,200,.5)');
}

/* ===== 2-6 Polar sea, Svalbard ===== */
function bgArctic(c) {
  const R = mulberry(26);
  band(c, 0, 176, [[0, '#fbf7f0'], [0.6, '#e4eef3'], [1, '#d6e7ef']]);
  blooms(c, R, 6, ['250,200,200', '220,200,240'], 40, 90, 0.18, 0, 100, W, 70);
  wc(c, R, [0, 176, 0, 120, 40, 96, 70, 112, 110, 78, 150, 106, 190, 90, 230, 116, 270, 86, 310, 104, 360, 90, 360, 176], '#a4b6c9', 6, 0.14, 10);
  [[110, 78], [270, 86], [190, 90], [40, 96]].forEach(([x, y]) => wc(c, R, [x - 18, y + 18, x, y, x + 18, y + 18, x + 6, y + 14, x - 6, y + 20], '#ffffff', 4, 0.35, 5));
  wc(c, R, [0, 176, 0, 146, 80, 138, 170, 150, 260, 140, 360, 148, 360, 176], '#8aa2b8', 5, 0.14, 6);
  band(c, 176, H, [[0, '#a6d4e2'], [0.35, '#3f86ab'], [0.8, '#1d4f7a'], [1, '#123659']]);
  const floes = [[18, 146, 0], [156, 258, 1], [270, 352, 2]];
  floes.forEach(([x0, x1]) => wc(c, R, [x0 + 4, 180, x1 - 4, 180, x1 - 12, 206, (x0 + x1) / 2, 214, x0 + 10, 202], '#d9eef6', 5, 0.25, 8));
  floes.forEach(([x0, x1]) => { wc(c, R, [x0, 180, x0 + 4, 172, x1 - 4, 171, x1, 180], '#ffffff', 5, 0.5, 4); c.fillStyle = 'rgba(150,190,215,.6)'; c.fillRect(x0 + 2, 179, x1 - x0 - 4, 2); });
  c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 1.2;
  for (let y = 186; y < 230; y += 8) { c.beginPath(); for (let x = 0; x <= W; x += 10) c.lineTo(x, y + Math.sin(x / 13 + y) * 1.6); c.globalAlpha = 0.5 - (y - 186) / 100; c.stroke(); } c.globalAlpha = 1;
  rays(c, R, 6, 'rgba(255,255,255,.06)', 176, 470);
  blooms(c, R, 26, ['60,140,190', '30,80,140', '170,220,240'], 20, 70, 0.11, 0, 200, W, 280);
  fizz(c, R, 24, 200, 470);
  specks(c, R, 500, 'rgba(40,60,90,.07)');
}
function drawPolarBear(c, a) {
  const L = 0.3 + a.live, nod = Math.sin(a.t * 2) * 1.5 * L;
  for (const [x, d] of [[-34, 0], [-18, 1], [18, 0], [32, 1]]) wash(c, () => rr(c, x - 6, 4, 12, 26 - d * 2, 5), d ? '#e8e2d2' : '#f4efe2', 'rgba(110,130,150,.5)');
  wash(c, () => { c.beginPath(); c.moveTo(-50, 2); c.bezierCurveTo(-50, -26, 20, -28, 34, -12); c.quadraticCurveTo(40, 6, 30, 14); c.lineTo(-40, 16); c.quadraticCurveTo(-52, 12, -50, 2); c.closePath(); }, '#f6f1e4', 'rgba(110,130,150,.55)');
  ell(c, -10, 10, 30, 6, 'rgba(170,190,210,.3)');
  circ(c, -50, -4, 4, '#ece6d6');
  c.save(); c.translate(0, nod);
  circ(c, 37, -24, 4, '#e8e2d2'); circ(c, 47, -25, 4, '#e8e2d2');
  wash(c, () => { c.beginPath(); c.arc(43, -12, 13, 0, TAU); }, '#f6f1e4', 'rgba(110,130,150,.55)');
  wash(c, () => { c.beginPath(); c.ellipse(53, -7, 8, 6, 0, 0, TAU); }, '#f6f1e4', 'rgba(110,130,150,.5)');
  ell(c, 59, -9, 2.6, 2, '#1d2028'); eye(c, 45, -15, 2.4); blush(c, 46, -6, 3);
  c.restore();
  for (const x of [-34, -18, 18, 32]) ell(c, x, 29, 6, 2, 'rgba(110,130,150,.35)');
}
function drawWalrus(c, a) {
  const br = Math.sin(a.t * 1.6) * 1.2 * (0.3 + a.live);
  wash(c, () => { c.beginPath(); c.ellipse(-42, 22, 10, 4, -0.3, 0, TAU); }, '#b07f6b', 'rgba(80,40,30,.5)');
  wash(c, () => { c.beginPath(); c.moveTo(-46, 24); c.quadraticCurveTo(-50, -8 - br, -18, -14 - br); c.quadraticCurveTo(12, -26 - br, 32, -14); c.quadraticCurveTo(46, -4, 40, 14); c.lineTo(32, 24); c.closePath(); }, '#c99a86', 'rgba(90,50,35,.55)');
  c.strokeStyle = 'rgba(110,60,45,.35)'; c.lineWidth = 1.2; for (const x of [-30, -20, -10]) { c.beginPath(); c.arc(x, 2, 10, -1.2, -0.2); c.stroke(); }
  wash(c, () => { c.beginPath(); c.ellipse(0, 22, 12, 5, 0.3, 0, TAU); }, '#b07f6b', 'rgba(80,40,30,.5)');
  wash(c, () => { c.beginPath(); c.moveTo(29, 8); c.lineTo(27, 27); c.lineTo(32, 9); c.closePath(); }, '#fbf6e8', 'rgba(120,110,90,.6)');
  wash(c, () => { c.beginPath(); c.moveTo(40, 8); c.lineTo(41, 27); c.lineTo(44, 8); c.closePath(); }, '#fbf6e8', 'rgba(120,110,90,.6)');
  ell(c, 31, 3, 8, 6, '#ddb39d'); ell(c, 42, 3, 7, 6, '#ddb39d');
  for (const [x, y] of [[28, 2], [32, 5], [36, 2], [40, 5], [44, 2], [30, 7], [42, 7]]) circ(c, x, y, 0.8, 'rgba(90,50,35,.6)');
  eye(c, 30, -10, 2.2); eye(c, 42, -10, 2.2);
}
function drawBearSign(c, a) {
  wash(c, () => rr(c, -3, 0, 6, 44, 2), '#7a8088', 'rgba(40,40,50,.6)');
  const tri = () => { c.beginPath(); c.moveTo(0, -40); c.lineTo(28, 6); c.lineTo(-28, 6); c.closePath(); };
  c.lineJoin = 'round'; tri(); c.fillStyle = '#fbfaf5'; c.fill(); c.lineWidth = 6; c.strokeStyle = '#d23a32'; c.stroke(); c.lineJoin = 'miter';
  ell(c, -2, -6, 11, 5.5, '#1d1f24'); circ(c, 9, -10, 4, '#1d1f24'); ell(c, 13, -9, 3, 2, '#1d1f24');
  for (const x of [-10, -5, 3, 7]) c.fillRect(x - 1.4, -3, 2.8, 7);
  c.beginPath(); c.moveTo(-9, -27); c.lineTo(0, -43); c.lineTo(9, -27); c.quadraticCurveTo(4, -31, 0, -28); c.quadraticCurveTo(-4, -31, -9, -27); c.closePath(); c.fillStyle = 'rgba(255,255,255,.95)'; c.fill();
}
function drawBeluga(c, a) {
  const L = 0.3 + a.live, fl = Math.sin(a.t * 2.2) * 0.3 * L;
  c.save(); c.translate(-56, 2); c.rotate(fl);
  wash(c, () => { c.beginPath(); c.moveTo(2, 0); c.quadraticCurveTo(-6, -4, -12, -12); c.quadraticCurveTo(-9, -2, -4, 0); c.quadraticCurveTo(-9, 2, -12, 12); c.quadraticCurveTo(-6, 4, 2, 0); c.closePath(); }, '#e9eef2', 'rgba(90,120,150,.6)'); c.restore();
  const body = () => { c.beginPath(); c.moveTo(-58, 2); c.bezierCurveTo(-40, -18, 10, -22, 28, -18); c.bezierCurveTo(44, -30, 66, -20, 64, -4); c.quadraticCurveTo(64, 6, 56, 8); c.quadraticCurveTo(30, 22, -10, 18); c.quadraticCurveTo(-44, 14, -58, 2); c.closePath(); };
  wash(c, body, '#f4f7f9', 'rgba(90,120,150,.6)');
  c.save(); body(); c.clip(); ell(c, 0, 18, 56, 8, 'rgba(160,190,215,.35)'); ell(c, 44, -20, 12, 5, 'rgba(255,255,255,.7)', 0.3); c.restore();
  c.save(); c.translate(14, 12); c.rotate(0.6 + fl * 0.6); wash(c, () => { c.beginPath(); c.ellipse(5, 0, 10, 4.5, 0, 0, TAU); }, '#e9eef2', 'rgba(90,120,150,.55)'); c.restore();
  eye(c, 44, -6, 2.8); blush(c, 46, 2, 3.6);
  c.strokeStyle = 'rgba(90,110,140,.7)'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(50, 4); c.quadraticCurveTo(56, 8, 62, 3); c.stroke();
}
function drawNarwhal(c, a, dir = 1) {
  const L = 0.3 + a.live, fl = Math.sin(a.t * 2) * 0.3 * L;
  c.scale(dir, 1);
  c.save(); c.translate(-68, 2); c.rotate(fl);
  wash(c, () => { c.beginPath(); c.moveTo(2, 0); c.quadraticCurveTo(-6, -4, -14, -13); c.quadraticCurveTo(-10, -2, -5, 0); c.quadraticCurveTo(-10, 2, -14, 13); c.quadraticCurveTo(-6, 4, 2, 0); c.closePath(); }, '#8f9cab', 'rgba(40,50,70,.55)'); c.restore();
  wash(c, () => { c.beginPath(); c.moveTo(38, -4); c.lineTo(84, -6); c.lineTo(38, 1); c.closePath(); }, '#efe6cf', 'rgba(120,110,80,.6)');
  c.strokeStyle = 'rgba(120,110,80,.55)'; c.lineWidth = 0.8; for (let x = 44; x < 82; x += 5) { c.beginPath(); c.moveTo(x, -5.5 + (x - 38) * 0.02); c.lineTo(x + 3, -1.5 - (x - 38) * 0.03); c.stroke(); }
  const body = () => { c.beginPath(); c.moveTo(-70, 2); c.bezierCurveTo(-50, -18, 10, -20, 32, -10); c.quadraticCurveTo(44, -4, 40, 6); c.quadraticCurveTo(20, 16, -20, 14); c.quadraticCurveTo(-56, 12, -70, 2); c.closePath(); };
  wash(c, body, '#a3afbd', 'rgba(40,50,70,.55)');
  c.save(); body(); c.clip(); ell(c, -6, 14, 48, 7, '#e6ebef');
  [[-40, -6], [-26, -10], [-12, -6], [2, -12], [14, -6], [-50, -2], [-30, 0], [6, -2], [22, -8]].forEach(([x, y]) => ell(c, x, y, 3, 2, 'rgba(50,60,80,.45)'));
  c.restore();
  c.save(); c.translate(10, 8); c.rotate(0.6 + fl * 0.6); wash(c, () => { c.beginPath(); c.ellipse(4, 0, 8, 3.5, 0, 0, TAU); }, '#8f9cab', 'rgba(40,50,70,.5)'); c.restore();
  eye(c, 26, -3, 2.6); blush(c, 28, 4, 3);
  c.strokeStyle = 'rgba(40,50,70,.6)'; c.lineWidth = 1.2; c.beginPath(); c.arc(34, 2, 3, 0.2, 1.6); c.stroke();
}
function drawNarwhal2(c, a) { drawNarwhal(c, a, -1); }

/* ===== 2-7 Deep glow, deep Atlantic ===== */
function bgDeep(c) {
  const R = mulberry(27);
  band(c, 0, H, [[0, '#14324f'], [0.35, '#0a1a33'], [0.75, '#050b1c'], [1, '#02050d']]);
  blooms(c, R, 4, ['60,110,160'], 80, 140, 0.18, 0, 0, W, 60);
  blooms(c, R, 34, ['70,230,220', '120,255,160', '150,120,255', '80,180,255'], 4, 16, 0.3);
  c.fillStyle = 'rgba(255,255,255,.5)';
  for (let i = 0; i < 220; i++) { const r = 0.4 + R() * 1.1; c.globalAlpha = 0.2 + R() * 0.5; c.fillRect(R() * W, R() * H, r, r); }
  c.globalAlpha = 1;
  for (let i = 0; i < 40; i++) { const t = i / 39, x = t * W, y = 226 - t * 40 + Math.sin(t * 9) * 12; circ(c, x, y, 1.6, 'rgba(140,255,230,.35)'); if (i % 4 === 0) circ(c, x, y, 4, 'rgba(140,255,230,.08)'); }
  wc(c, R, [0, H, 0, 458, 60, 450, 140, 462, 220, 452, 300, 460, 360, 450, 360, H], '#1b2638', 7, 0.2, 10);
  for (const [x, y, h] of [[190, 468, 26], [336, 462, 22], [30, 466, 18]]) {
    c.strokeStyle = 'rgba(120,240,230,.6)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - h); c.stroke();
    for (let k = 0; k < 6; k++) { const yy = y - h + 3 + k * 3.5; ell(c, x - 4, yy, 4, 1.2, 'rgba(120,240,230,.45)', -0.4); ell(c, x + 4, yy, 4, 1.2, 'rgba(120,240,230,.45)', 0.4); }
    blooms(c, R, 1, ['120,240,230'], 16, 20, 0.2, x, y - h / 2, 0, 0);
  }
  specks(c, R, 400, 'rgba(120,160,220,.06)');
}
function glowDot(c, x, y, r, col, a) { c.globalAlpha = 0.18 * a; circ(c, x, y, r * 2.6, col); c.globalAlpha = 0.35 * a; circ(c, x, y, r * 1.6, col); c.globalAlpha = 1; circ(c, x, y, r, col); }
function drawSub(c, a) {
  const L = 0.3 + a.live;
  poly(c, [54, -8, 80, -24, 80, 16, 54, 2], 'rgba(255,230,140,.2)'); poly(c, [54, -6, 80, -14, 80, 6, 54, 0], 'rgba(255,245,190,.32)');
  c.strokeStyle = '#6a6f78'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(18, 28); c.lineTo(34, 38); c.lineTo(48, 34); c.stroke();
  c.lineWidth = 2; c.beginPath(); c.moveTo(48, 34); c.lineTo(54, 30); c.moveTo(48, 34); c.lineTo(55, 38); c.stroke(); c.lineCap = 'butt';
  wash(c, () => rr(c, -40, 32, 70, 5, 2), '#6a6f78', 'rgba(20,20,30,.6)');
  wash(c, () => rr(c, -16, -38, 34, 14, 6), '#f2b33d', 'rgba(120,70,10,.6)');
  wash(c, () => { c.beginPath(); c.ellipse(0, 4, 56, 30, 0, 0, TAU); }, '#f2b33d', 'rgba(120,70,10,.6)');
  c.save(); c.beginPath(); c.ellipse(0, 4, 56, 30, 0, 0, TAU); c.clip(); ell(c, 0, 26, 60, 10, 'rgba(190,110,20,.45)'); ell(c, -14, -12, 28, 6, 'rgba(255,240,200,.45)'); c.restore();
  c.strokeStyle = 'rgba(120,70,10,.45)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-30, -20); c.lineTo(-30, 28); c.stroke();
  for (const x of [-44, -20, 4]) circ(c, x, 12, 1.4, 'rgba(120,70,10,.6)');
  wash(c, () => { c.beginPath(); c.arc(30, 0, 13, 0, TAU); }, '#8a8f96', 'rgba(30,30,40,.6)');
  circ(c, 30, 0, 9.5, '#7fd3ee'); eye(c, 27, -1, 1.8); eye(c, 33, -1, 1.8); ell(c, 26, -5, 3, 1.5, 'rgba(255,255,255,.6)', -0.5);
  wash(c, () => { c.beginPath(); c.ellipse(-62, 4, 6, 14, 0, 0, TAU); }, '#6a6f78', 'rgba(20,20,30,.6)');
  const sp = a.t * 9 * L;
  c.strokeStyle = '#c9ced6'; c.lineWidth = 3; for (let k = 0; k < 2; k++) { const y = Math.sin(sp + k * Math.PI) * 11; c.beginPath(); c.moveTo(-62, 4); c.lineTo(-62, 4 + y); c.stroke(); }
  glowDot(c, 54, -10, 2.5, '#fff1b0', 1);
}
function drawROV(c, a) {
  const L = 0.3 + a.live;
  c.strokeStyle = '#d9a441'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -24); c.bezierCurveTo(-8, -30, 8, -30, 2, -32); c.stroke();
  for (const s of [-1, 1]) { wash(c, () => rr(c, s * 38 - 6, -10, 12, 14, 3), '#3d4048', 'rgba(10,10,20,.6)'); c.strokeStyle = '#9aa0aa'; c.lineWidth = 1.5; const y = Math.sin(a.t * 12 * L + s) * 5; c.beginPath(); c.moveTo(s * 38, -3); c.lineTo(s * 38, -3 + y); c.stroke(); }
  wash(c, () => rr(c, -32, -24, 64, 18, 5), '#f2c230', 'rgba(110,80,10,.6)');
  txt(c, 'ROV', 0, -15, '700 9px "JetBrains Mono", monospace', 'rgba(90,60,10,.8)');
  wash(c, () => rr(c, -32, -6, 64, 24, 3), '#3d4048', 'rgba(10,10,20,.6)');
  c.strokeStyle = '#6a6f78'; c.lineWidth = 1; c.strokeRect(-28, -3, 56, 18);
  circ(c, 0, 6, 8, '#1a1d26'); circ(c, 0, 6, 5, '#2c6f8f'); circ(c, -2, 4, 1.6, '#bff4ff');
  glowDot(c, -20, 8, 2.4, '#fff1b0', 1); glowDot(c, 20, 8, 2.4, '#fff1b0', 1);
  c.fillStyle = '#5c616b'; c.fillRect(-26, 18, 4, 6); c.fillRect(22, 18, 4, 6);
}
function drawLanternfish(c, a) {
  const L = 0.3 + a.live, tail = Math.sin(a.t * 10) * 0.3 * L, pulse = 0.6 + 0.4 * Math.sin(a.t * 3);
  c.save(); c.translate(-30, 0); c.rotate(tail);
  wash(c, () => { c.beginPath(); c.moveTo(2, 0); c.lineTo(-12, -11); c.lineTo(-8, 0); c.lineTo(-12, 11); c.closePath(); }, '#33435f', 'rgba(140,170,220,.5)'); c.restore();
  wash(c, () => { c.beginPath(); c.ellipse(2, 0, 34, 11, 0, 0, TAU); }, '#33435f', 'rgba(140,170,220,.55)');
  ell(c, 2, -5, 24, 3, 'rgba(180,200,240,.25)');
  for (let k = 0; k < 7; k++) glowDot(c, -24 + k * 7, 6, 1.5, '#8ff6ff', pulse);
  for (let k = 0; k < 4; k++) glowDot(c, -14 + k * 8, -1, 1.2, '#8ff6ff', pulse);
  circ(c, 26, -2, 6, '#dfe8ff'); eye(c, 27, -2, 4);
  glowDot(c, 33, 3, 1.4, '#8ff6ff', pulse);
}
function drawAngler(c, a) {
  const L = 0.3 + a.live, pulse = 0.65 + 0.35 * Math.sin(a.t * 2.6);
  c.save(); c.translate(-44, 10); c.rotate(Math.sin(a.t * 6) * 0.25 * L);
  wash(c, () => { c.beginPath(); c.moveTo(2, 0); c.quadraticCurveTo(-8, -16, -14, -12); c.quadraticCurveTo(-10, 0, -14, 12); c.quadraticCurveTo(-8, 16, 2, 0); c.closePath(); }, '#4a4262', 'rgba(170,160,210,.5)'); c.restore();
  c.strokeStyle = '#6a5f86'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(4, -20); c.quadraticCurveTo(18, -48, 38, -36); c.stroke();
  glowDot(c, 39, -33, 4.5, '#fff6a8', pulse);
  wash(c, () => { c.beginPath(); c.ellipse(-6, 10, 38, 30, 0, 0, TAU); }, '#463e5e', 'rgba(170,160,210,.55)');
  ell(c, -14, -6, 18, 7, 'rgba(200,190,240,.18)', -0.3);
  wash(c, () => { c.beginPath(); c.moveTo(10, 10); c.quadraticCurveTo(26, 4, 36, 10); c.quadraticCurveTo(32, 28, 12, 26); c.closePath(); }, '#1a1424', 'rgba(170,160,210,.55)');
  c.fillStyle = '#f4f0ff';
  for (let k = 0; k < 5; k++) { const x = 14 + k * 4.4, y = 8.6 - Math.sin(k / 4 * Math.PI) * 1.4; c.beginPath(); c.moveTo(x - 1.5, y); c.lineTo(x, y + 4); c.lineTo(x + 1.5, y); c.closePath(); c.fill(); }
  for (let k = 0; k < 3; k++) { const x = 18 + k * 6; c.beginPath(); c.moveTo(x - 1.4, 25); c.lineTo(x, 21.5); c.lineTo(x + 1.4, 25); c.closePath(); c.fill(); }
  circ(c, 10, -6, 7, '#e8e2ff'); eye(c, 11, -6, 4.2); blush(c, 0, 4, 4);
  c.save(); c.translate(-10, 20); c.rotate(Math.sin(a.t * 5) * 0.4 * L); wash(c, () => { c.beginPath(); c.ellipse(-4, 4, 8, 4, 0.6, 0, TAU); }, '#5a5078', 'rgba(170,160,210,.45)'); c.restore();
}
function drawDumbo(c, a) {
  const L = 0.3 + a.live, fl = Math.sin(a.t * 3) * 0.45 * L;
  for (const s of [-1, 1]) { c.save(); c.translate(s * 22, -20); c.rotate(s * (0.5 + fl)); wash(c, () => { c.beginPath(); c.ellipse(s * 10, 0, 13, 8, 0, 0, TAU); }, '#f1a28f', 'rgba(130,60,50,.55)'); c.restore(); }
  const sk = () => { c.beginPath(); c.moveTo(-30, 2); for (let k = 0; k <= 4; k++) { const x = -30 + k * 15, y = 32 + Math.sin(a.t * 2 + k) * 3 * L; c.quadraticCurveTo(x - 7.5, y + 6, x, y); } c.lineTo(30, 2); c.closePath(); };
  c.save(); c.globalAlpha = 0.85; wash(c, sk, '#e98b7a', 'rgba(130,60,50,.5)'); c.restore();
  for (let k = 0; k <= 4; k++) circ(c, -30 + k * 15, 32 + Math.sin(a.t * 2 + k) * 3 * L, 2.4, '#f6c2b4');
  wash(c, () => { c.beginPath(); c.ellipse(0, -8, 28, 26, 0, 0, TAU); }, '#f4b09d', 'rgba(130,60,50,.55)');
  ell(c, -10, -22, 9, 5, 'rgba(255,255,255,.35)', -0.4);
  eye(c, -9, -4, 4.4); eye(c, 9, -4, 4.4); blush(c, -15, 4, 4); blush(c, 15, 4, 4);
  c.strokeStyle = 'rgba(120,50,40,.7)'; c.lineWidth = 1.3; c.beginPath(); c.arc(0, 4, 3.5, 0.3, Math.PI - 0.3); c.stroke();
}
const COMB = ['#ff7aa8', '#ffd36b', '#7dff9b', '#6bd8ff', '#b88bff'];
function drawCombJelly(c, a) {
  const L = 0.3 + a.live, sh = Math.floor(a.t * 10);
  const body = () => { c.beginPath(); c.moveTo(0, -36); c.bezierCurveTo(24, -30, 24, 26, 0, 34); c.bezierCurveTo(-24, 26, -24, -30, 0, -36); c.closePath(); };
  wash(c, body, 'rgba(200,230,255,.26)', 'rgba(170,215,255,.75)');
  for (const k of [-1, -0.36, 0.36, 1]) for (let i = 0; i < 8; i++) { const t = -0.85 + i * 0.24, y = t * 34, x = k * 17 * Math.sqrt(Math.max(0, 1 - t * t)); circ(c, x, y, 1.5, COMB[(i + Math.round(k * 3) + sh) % 5]); }
  c.strokeStyle = 'rgba(220,235,255,.55)'; c.lineWidth = 1;
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 4, 33); c.quadraticCurveTo(s * 12 + Math.sin(a.t * 2) * 4 * L, 37, s * 7, 41); c.stroke(); }
  ell(c, -7, -22, 4, 7, 'rgba(255,255,255,.35)', 0.3);
  circ(c, -9, -10, 3.4, 'rgba(255,255,255,.75)'); circ(c, 9, -10, 3.4, 'rgba(255,255,255,.75)');
  eye(c, -9, -10, 2.2); eye(c, 9, -10, 2.2); blush(c, -12, -4, 2.4); blush(c, 12, -4, 2.4);
}

/* ===== 2-8 Turtle homecoming, Wang-an (Penghu) ===== */
function bgNest(c) {
  const R = mulberry(28);
  band(c, 0, 152, [[0, '#121a3c'], [0.6, '#27366a'], [1, '#4a5d8f']]);
  c.fillStyle = '#fff';
  for (let i = 0; i < 70; i++) { const x = R() * W, y = R() * 140; if (Math.hypot(x - 70, y - 60) < 40) continue; c.globalAlpha = 0.3 + R() * 0.6; const r = 0.6 + R() * 1.2; c.fillRect(x, y, r, r); }
  c.globalAlpha = 1;
  blooms(c, R, 1, ['253,243,207'], 70, 71, 0.28, 70, 60, 0, 0);
  circ(c, 70, 61, 23, 'rgba(253,243,207,.35)'); circ(c, 70, 61, 21, '#fdf3cf');
  ell(c, 62, 54, 5, 4, 'rgba(225,205,160,.45)'); ell(c, 78, 67, 6, 4.5, 'rgba(225,205,160,.4)'); ell(c, 66, 72, 3, 2.4, 'rgba(225,205,160,.4)'); ell(c, 64, 52, 9, 6, 'rgba(255,255,245,.35)');
  wc(c, R, [0, 152, 0, 141, 50, 137, 110, 143, 170, 152], '#1d2748', 5, 0.3, 4);
  band(c, 152, 230, [[0, '#33507f'], [1, '#22365f']]);
  for (let y = 156; y < 226; y += 5) { const w = 30 - (y - 156) * 0.2 + Math.sin(y) * 6; c.fillStyle = `rgba(253,243,207,${0.55 - (y - 156) * 0.006})`; c.fillRect(70 - w / 2 + Math.sin(y * 1.7) * 6, y, w, 1.6); }
  c.strokeStyle = 'rgba(200,215,245,.25)'; c.lineWidth = 1; for (let y = 162; y < 222; y += 9) { c.beginPath(); for (let x = 120; x <= W; x += 10) c.lineTo(x, y + Math.sin(x / 9 + y) * 1.2); c.stroke(); }
  shore(c, 226, 3, 22, '#b7ad94');
  band(c, 236, H, [[0, 'rgba(183,173,148,0)'], [1, 'rgba(140,130,108,.8)']]);
  c.strokeStyle = 'rgba(235,242,255,.75)'; c.lineWidth = 3; c.beginPath(); for (let x = 0; x <= W; x += 8) c.lineTo(x, 227 + Math.sin(x / 22) * 3); c.stroke();
  c.strokeStyle = 'rgba(235,242,255,.35)'; c.lineWidth = 2; c.beginPath(); for (let x = 0; x <= W; x += 8) c.lineTo(x, 234 + Math.sin(x / 18 + 1) * 2.5); c.stroke();
  wc(c, R, [0, 300, 120, 290, 240, 320, 360, 300, 360, 360, 0, 380], '#a89e84', 5, 0.15, 14);
  c.fillStyle = 'rgba(90,80,60,.32)';
  for (let k = 0; k < 9; k++) { const y = 240 + k * 10, x = 112 + Math.sin(k * 0.6) * 3; c.fillRect(x - 13, y, 7, 2.2); c.fillRect(x + 6, y + 4, 7, 2.2); }
  wc(c, R, [226, 300, 240, 290, 272, 290, 286, 300], '#9c8f72', 5, 0.3, 4);
  for (const [x, y] of [[24, 440], [336, 360], [150, 470], [300, 470]]) { ell(c, x, y, 3.5, 2.2, 'rgba(250,240,230,.75)'); }
  for (const [x0, s] of [[0, 1], [360, -1]]) for (let k = 0; k < 5; k++) { const x = x0 + s * (8 + k * 12), y = 472 - k * 6; ell(c, x, y, 7, 4.5, 'rgba(70,100,70,.75)', s * 0.5); if (k % 2) circ(c, x + s * 4, y - 6, 3, 'rgba(190,140,220,.8)'); }
  specks(c, R, 700, 'rgba(70,60,40,.1)', 236, H);
}
function drawSailboat(c, a) {
  c.strokeStyle = '#6b5a48'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 22); c.lineTo(0, -36); c.stroke();
  wash(c, () => { c.beginPath(); c.moveTo(2, -34); c.quadraticCurveTo(18, -4, 28, 18); c.lineTo(2, 18); c.closePath(); }, 'rgba(236,232,216,.92)', 'rgba(90,90,110,.6)');
  wash(c, () => { c.beginPath(); c.moveTo(-2, -28); c.quadraticCurveTo(-14, 0, -24, 18); c.lineTo(-2, 18); c.closePath(); }, 'rgba(220,214,198,.9)', 'rgba(90,90,110,.6)');
  wash(c, () => { c.beginPath(); c.moveTo(-30, 21); c.lineTo(30, 21); c.lineTo(22, 30); c.lineTo(-24, 30); c.closePath(); }, '#c9c3b4', 'rgba(40,40,60,.6)');
  glowDot(c, 0, -37, 1.8, '#ffe9a0', 0.7 + 0.3 * Math.sin(a.t * 3));
  waterline(c, -34, 34, 28, a.t, 'rgba(70,100,150,.6)');
}
function drawNestSign(c, a) {
  for (const x of [-38, 38]) wash(c, () => rr(c, x - 4, -4, 8, 44, 2), '#7a5636', 'rgba(50,30,10,.6)');
  wash(c, () => rr(c, -55, -38, 110, 46, 6), '#d8b884', 'rgba(110,70,30,.7)');
  c.strokeStyle = 'rgba(110,70,30,.25)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-50, -15); c.lineTo(50, -15); c.stroke();
  fitTxt(c, T('海龜產卵中', 'Turtles nesting'), 0, -26, T('900 15px "Noto Sans TC", sans-serif', '600 19px Caveat, "Noto Sans TC", cursive'), '#3d2a17', 98);
  fitTxt(c, T('請關燈・保持安靜', 'Lights off, please'), 0, -4, T('700 11px "Noto Sans TC", sans-serif', '600 16px Caveat, "Noto Sans TC", cursive'), '#8a3a2a', 98);
  for (const x of [-38, 38]) ell(c, x, 40, 8, 2.5, 'rgba(70,60,40,.4)');
}
function drawPost(c, a, side) {
  const px = 20 * side, end = -28 * side, sw = Math.sin(a.t * 2) * 1.2 * a.live;
  ell(c, px, 36, 10, 3, 'rgba(70,60,40,.4)');
  wash(c, () => rr(c, px - 5, -26, 10, 62, 3), '#8a6440', 'rgba(50,30,10,.6)');
  ell(c, px, -26, 5, 2, '#a88158');
  c.strokeStyle = '#e8dcc0'; c.lineWidth = 2; c.beginPath(); c.moveTo(px, -20); c.quadraticCurveTo((px + end) / 2, -2 + sw, end, -6); c.stroke();
  for (const [t, col] of [[0.35, '#f08a3a'], [0.72, '#fbf4ea']]) {
    const x = px + (end - px) * t, y = (1 - t) * (1 - t) * -20 + 2 * t * (1 - t) * (-2 + sw) + t * t * -6;
    poly(c, [x - 4, y, x + 4, y, x, y + 9], col);
  }
}
function drawPostL(c, a) { drawPost(c, a, -1); }
function drawPostR(c, a) { drawPost(c, a, 1); }
function drawMotherTurtle(c, a) {
  const L = 0.3 + a.live, p = Math.sin(a.t * 1.4) * 0.35 * L;
  const flip = (x, y, r, rx, ry, oy) => { c.save(); c.translate(x, y); c.rotate(r); wash(c, () => { c.beginPath(); c.ellipse(0, oy, rx, ry, 0, 0, TAU); }, '#8b9a6a', 'rgba(50,60,30,.55)'); c.restore(); };
  flip(20, -22, -0.5 - p, 8, 17, -12); flip(20, 22, 0.5 + p, 8, 17, 12);
  flip(-34, -20, 0.6 + p * 0.5, 7, 12, -8); flip(-34, 20, -0.6 - p * 0.5, 7, 12, 8);
  wash(c, () => { c.beginPath(); c.ellipse(58, 0, 15, 11, 0, 0, TAU); }, '#8b9a6a', 'rgba(50,60,30,.55)');
  eye(c, 63, -6, 2.4); eye(c, 63, 6, 2.4);
  ell(c, 54, 0, 4, 6, 'rgba(60,70,40,.3)');
  wash(c, () => { c.beginPath(); c.ellipse(0, 0, 46, 34, 0, 0, TAU); }, '#6f6a3f', 'rgba(50,45,20,.65)');
  c.strokeStyle = 'rgba(220,210,160,.5)'; c.lineWidth = 1.5;
  [[0, 0], [-22, 0], [22, 0], [-11, -18], [11, -18], [-11, 18], [11, 18]].forEach(([x, y]) => { c.beginPath(); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3; c.lineTo(x + Math.cos(an) * 10, y + Math.sin(an) * 8); } c.closePath(); c.stroke(); });
  [[-30, -12], [14, 22], [26, -16], [-6, 12], [32, 6]].forEach(([x, y]) => circ(c, x, y, 2, 'rgba(225,205,160,.85)'));
}
function drawHatchling(c, a) {
  const L = 0.3 + a.live, p = Math.sin(a.t * 7) * 0.5 * L;
  for (const s of [-1, 1]) {
    c.save(); c.translate(s * 8, -4); c.rotate(s * (0.4 + p)); wash(c, () => { c.beginPath(); c.ellipse(s * 7, 0, 8, 3.2, 0, 0, TAU); }, '#4a4a40', 'rgba(20,20,10,.5)'); c.restore();
    c.save(); c.translate(s * 7, 10); c.rotate(s * (-0.4 - p)); wash(c, () => { c.beginPath(); c.ellipse(s * 4, 2, 4, 2.5, 0, 0, TAU); }, '#4a4a40', 'rgba(20,20,10,.5)'); c.restore();
  }
  wash(c, () => { c.beginPath(); c.arc(0, -14, 6, 0, TAU); }, '#55554a', 'rgba(20,20,10,.5)');
  circ(c, -2.8, -16, 1.8, '#fff'); circ(c, 2.8, -16, 1.8, '#fff'); circ(c, -2.6, -16.4, 1, '#111'); circ(c, 2.6, -16.4, 1, '#111');
  wash(c, () => { c.beginPath(); c.ellipse(0, 3, 11, 13, 0, 0, TAU); }, '#3a3a32', 'rgba(200,200,180,.5)');
  c.strokeStyle = 'rgba(200,200,180,.35)'; c.lineWidth = 1; c.beginPath(); c.moveTo(0, -8); c.lineTo(0, 14); c.moveTo(-8, 3); c.lineTo(8, 3); c.stroke();
}
function drawGhostCrab(c, a) {
  const snap = Math.max(0, Math.sin(a.t * 5)) * a.live;
  c.strokeStyle = '#cbb48c'; c.lineWidth = 2.4;
  for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-14, 4 + i * 3); c.lineTo(-24, 8 + i * 4); c.lineTo(-30, 14 + i * 3); c.moveTo(14, 4 + i * 3); c.lineTo(24, 8 + i * 4); c.lineTo(30, 14 + i * 3); c.stroke(); }
  for (const s of [-1, 1]) { c.save(); c.translate(s * 18, -2); c.rotate(-s * snap * 0.3); wash(c, () => { c.beginPath(); c.ellipse(s * 6, -2, s > 0 ? 8 : 6, s > 0 ? 6 : 4.5, 0, 0, TAU); }, '#efe0bd', 'rgba(120,100,70,.6)'); c.restore(); }
  wash(c, () => rr(c, -17, -6, 34, 22, 8), '#e8d6ad', 'rgba(120,100,70,.6)');
  c.strokeStyle = '#cbb48c'; c.lineWidth = 2; c.beginPath(); c.moveTo(-7, -5); c.lineTo(-8, -13); c.moveTo(7, -5); c.lineTo(8, -13); c.stroke();
  ell(c, -8, -16, 3, 4.5, '#1d1d20'); ell(c, 8, -16, 3, 4.5, '#1d1d20'); circ(c, -9, -18, 1, '#fff'); circ(c, 7, -18, 1, '#fff');
  blush(c, -8, 6, 3); blush(c, 8, 6, 3);
}

/* ===== 2-9 Harbor fish market, Keelung ===== */
const HOUSES = ['#f4a6a6', '#f7d27a', '#9bd3c8', '#a8c4f0', '#f2b98c', '#c5b3e6', '#f7e9a0', '#9ed1a2'];
function bgHarbor(c) {
  const R = mulberry(29);
  band(c, 0, 152, [[0, '#fde3c4'], [0.5, '#f8eedf'], [1, '#dde8ee']]);
  wc(c, R, [0, 130, 0, 72, 60, 60, 130, 82, 200, 58, 280, 76, 360, 62, 360, 130], '#8fae8f', 6, 0.15, 10);
  for (let i = 0, x = -4; x < W; i++) {
    const w = 26 + R() * 10, h = 22 + R() * 26, col = HOUSES[i % HOUSES.length];
    wc(c, R, [x, 150, x, 150 - h, x + w, 150 - h, x + w, 150], col, 4, 0.3, 3);
    c.fillStyle = 'rgba(60,70,90,.45)'; for (let wy = 150 - h + 6; wy < 142; wy += 10) for (let wx = x + 5; wx < x + w - 6; wx += 9) c.fillRect(wx, wy, 4, 5);
    c.fillStyle = col; c.globalAlpha = 0.28; for (let y = 156; y < 200; y += 4) c.fillRect(x + Math.sin(y) * 2, y, w - 4, 2.4); c.globalAlpha = 1;
    x += w + 1;
  }
  c.fillStyle = '#9a958c'; c.fillRect(0, 150, W, 5);
  band(c, 155, 236, [[0, 'rgba(110,165,195,.75)'], [1, '#4f86a6']]);
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 1; for (let y = 164; y < 232; y += 8) { c.beginPath(); for (let x = 0; x <= W; x += 10) c.lineTo(x, y + Math.sin(x / 10 + y) * 1.3); c.stroke(); }
  wc(c, R, [0, 236, 0, 180, 22, 178, 26, 236], '#a59e92', 4, 0.5, 3); c.fillStyle = 'rgba(60,55,50,.3)'; c.fillRect(0, 186, 26, 3);
  c.fillStyle = '#a59e92'; c.fillRect(0, 236, W, 10); c.fillStyle = 'rgba(60,55,50,.35)'; c.fillRect(0, 245, W, 2);
  band(c, 247, H, [[0, '#d9d2c4'], [1, '#bdb3a2']]);
  wc(c, R, [40, 330, 140, 316, 200, 340, 120, 352], '#9fb0bd', 4, 0.12, 10);
  wc(c, R, [200, 470, 300, 456, 360, 470, 260, 480], '#9fb0bd', 4, 0.12, 10);
  c.strokeStyle = 'rgba(120,110,95,.25)'; c.lineWidth = 1; for (let y = 280; y < H; y += 34) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  c.fillStyle = '#6e6a66'; c.fillRect(4, 246, 4, 30); c.fillRect(352, 246, 4, 30);
  c.strokeStyle = '#3b3b3b'; c.lineWidth = 1.2; c.beginPath(); for (let x = 6; x <= 354; x += 6) c.lineTo(x, 252 + 10 * (1 - ((x - 180) / 174) ** 2)); c.stroke();
  specks(c, R, 600, 'rgba(70,60,50,.08)');
}
function drawGull(c, a) {
  const L = 0.3 + a.live, f = Math.sin(a.t * 5) * L;
  for (const s of [-1, 1]) {
    c.save(); c.scale(s, 1);
    wash(c, () => { c.beginPath(); c.moveTo(4, -2); c.quadraticCurveTo(18, -16 - f * 6, 38, -10 - f * 10); c.quadraticCurveTo(24, -4 - f * 3, 6, 4); c.closePath(); }, '#c3ccd4', 'rgba(60,70,80,.55)');
    poly(c, [38, -10 - f * 10, 30, -11 - f * 8, 33, -6 - f * 6], '#2b2f36');
    c.restore();
  }
  wash(c, () => { c.beginPath(); c.ellipse(-2, 2, 18, 8, 0, 0, TAU); }, '#fbfbf8', 'rgba(60,70,80,.5)');
  poly(c, [-20, 0, -28, -3, -27, 5], '#e8e8e4');
  wash(c, () => { c.beginPath(); c.arc(16, -3, 7, 0, TAU); }, '#fbfbf8', 'rgba(60,70,80,.5)');
  poly(c, [22, -4, 31, -2, 22, 0], '#f2c230'); circ(c, 28, -1.4, 0.9, '#d9483a');
  eye(c, 18, -5, 1.6);
}
function drawFishBoat(c, a) {
  c.strokeStyle = '#555'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(20, -6); c.lineTo(20, -34); c.stroke();
  c.lineWidth = 0.8; c.beginPath(); c.moveTo(20, -34); c.lineTo(66, -14); c.moveTo(20, -34); c.lineTo(-62, -8); c.stroke();
  for (let k = 1; k < 6; k++) { const t = k / 6; circ(c, 20 + 46 * t, -34 + 20 * t + 2, 2, '#fff4c4'); circ(c, 20 - 82 * t, -34 + 26 * t + 2, 2, '#fff4c4'); }
  for (const [x, col] of [[-50, '#e0473c'], [-34, '#f2c230'], [44, '#3d7fc0'], [56, '#e0473c']]) { const t = x > 20 ? (x - 20) / 46 : (20 - x) / 82, y = -34 + (x > 20 ? 20 : 26) * t; poly(c, [x - 3, y, x + 3, y, x, y + 6], col); }
  wash(c, () => rr(c, -30, -30, 34, 26, 3), '#eef3f4', 'rgba(50,70,80,.55)');
  wash(c, () => rr(c, -33, -33, 40, 5, 2), '#2f6ea5', 'rgba(20,40,70,.55)');
  for (let k = 0; k < 3; k++) wash(c, () => rr(c, -26 + k * 10, -24, 7, 7, 1), '#8fd0ea', 'rgba(40,80,110,.5)');
  const hull = () => { c.beginPath(); c.moveTo(-66, -6); c.lineTo(70, -14); c.quadraticCurveTo(60, 10, 46, 18); c.lineTo(-58, 18); c.quadraticCurveTo(-66, 8, -66, -6); c.closePath(); };
  wash(c, hull, '#f4f1e8', 'rgba(40,60,80,.55)');
  c.save(); hull(); c.clip(); c.fillStyle = '#d64b3c'; c.fillRect(-70, -8, 142, 6); c.fillStyle = '#2f6ea5'; c.fillRect(-70, 12, 142, 8); c.restore();
  for (const x of [-46, -20, 6]) { c.strokeStyle = 'rgba(40,60,80,.45)'; c.lineWidth = 1; c.beginPath(); c.arc(x, 4, 2.4, 0, TAU); c.stroke(); }
  waterline(c, -72, 72, 12, a.t, 'rgba(110,165,195,.6)');
}
function drawSlipway(c, a) {
  wash(c, () => rr(c, -62, -4, 124, 14, 3), '#b9b2a4', 'rgba(70,65,55,.6)');
  c.strokeStyle = 'rgba(90,80,70,.5)'; c.lineWidth = 1; for (let x = -54; x < 60; x += 10) { c.beginPath(); c.moveTo(x, -4); c.lineTo(x, 10); c.stroke(); }
  c.strokeStyle = '#6d6a66'; c.lineWidth = 2; for (const y of [-6, -2]) { c.beginPath(); c.moveTo(-60, y); c.lineTo(62, y); c.stroke(); }
  wash(c, () => { c.beginPath(); c.moveTo(-36, -18); c.lineTo(8, -18); c.quadraticCurveTo(4, -6, -6, -7); c.lineTo(-30, -7); c.quadraticCurveTo(-36, -10, -36, -18); c.closePath(); }, '#f2c230', 'rgba(110,80,10,.6)');
  c.fillStyle = '#2f6ea5'; c.fillRect(-35, -18, 42, 3);
  wash(c, () => rr(c, -62, -18, 16, 13, 3), '#c9483a', 'rgba(90,20,10,.6)');
  circ(c, -54, -11, 4, '#7a7570'); c.strokeStyle = '#3b3b3b'; c.lineWidth = 1; c.beginPath(); c.moveTo(-50, -11); c.lineTo(-36, -12); c.stroke();
  c.fillStyle = 'rgba(110,165,195,.55)'; c.beginPath(); c.moveTo(18, -8); for (let x = 18; x <= 64; x += 6) c.lineTo(x, -8 + Math.sin(x * 0.3 + a.t * 2) * 1.2); c.lineTo(64, 14); c.lineTo(18, 14); c.closePath(); c.fill();
}
function drawLantern(c, a) {
  const sw = Math.sin(a.t * 2) * 2 * (0.3 + a.live);
  c.strokeStyle = '#3b3b3b'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, -32); c.lineTo(0, -22); c.stroke();
  wash(c, () => { c.beginPath(); c.ellipse(0, -1, 19, 20, 0, 0, TAU); }, '#e2402f', 'rgba(120,20,10,.6)');
  c.strokeStyle = 'rgba(255,200,170,.35)'; c.lineWidth = 1; for (const k of [-0.5, 0, 0.5]) { c.beginPath(); c.ellipse(0, -1, 19 * Math.abs(k) + 0.1, 20, 0, -Math.PI / 2, Math.PI / 2, k < 0); c.stroke(); }
  wash(c, () => rr(c, -10, -24, 20, 5, 2), '#d9a441', 'rgba(110,70,10,.6)');
  wash(c, () => rr(c, -10, 17, 20, 5, 2), '#d9a441', 'rgba(110,70,10,.6)');
  txt(c, LOCAL('福'), 0, 0, '900 15px "Noto Serif TC", serif', '#f6d27a');
  c.strokeStyle = '#e8b84a'; c.lineWidth = 1.2; for (const d of [-2, 0, 2]) { c.beginPath(); c.moveTo(d, 22); c.lineTo(d + sw, 31); c.stroke(); }
}
function drawMarketSign(c, a) {
  c.strokeStyle = '#3b3b3b'; c.lineWidth = 1.2; for (const x of [-50, 50]) { c.beginPath(); c.moveTo(x, -27); c.lineTo(x, -14); c.stroke(); }
  wash(c, () => rr(c, -70, -14, 140, 36, 5), '#f4e7c8', 'rgba(110,70,30,.7)');
  c.strokeStyle = 'rgba(192,57,43,.6)'; c.lineWidth = 1.5; c.strokeRect(-65, -9, 130, 26);
  fitTxt(c, T('鮮魚直送', 'Fresh off the boat'), 0, 4, T('900 18px "Noto Serif TC", serif', '600 21px Caveat, "Noto Sans TC", cursive'), '#c0392b', 100);
  for (const s of [-1, 1]) { c.save(); c.translate(s * 58, 4); c.scale(s, 1); ell(c, 0, 0, 5, 2.6, '#4f7fa0'); poly(c, [-5, 0, -9, -3, -9, 3], '#4f7fa0'); c.restore(); }
}
function drawScale(c, a) {
  c.save(); c.translate(0, -39); ell(c, 0, 0, 24, 7, '#7f9fb8'); poly(c, [-22, 0, -32, -6, -31, 6], '#7f9fb8');
  c.strokeStyle = 'rgba(40,60,80,.45)'; c.lineWidth = 1; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(-14 + k * 7, -5); c.lineTo(-10 + k * 7, -1); c.stroke(); }
  ell(c, 0, 3, 18, 2.5, 'rgba(240,245,250,.8)'); eye(c, 15, -1.5, 1.6); c.restore();
  wash(c, () => { c.beginPath(); c.ellipse(0, -30, 36, 6, 0, 0, TAU); }, '#c9d1d6', 'rgba(60,70,80,.55)');
  c.fillStyle = '#8a9298'; c.fillRect(-4, -25, 8, 10);
  wash(c, () => rr(c, -36, -16, 72, 60, 10), '#e85a4f', 'rgba(110,30,20,.6)');
  wash(c, () => { c.beginPath(); c.arc(0, 12, 24, 0, TAU); }, '#fbf7ec', 'rgba(110,30,20,.5)');
  c.strokeStyle = 'rgba(40,40,40,.55)'; c.lineWidth = 1;
  for (let k = 0; k < 12; k++) { const an = -Math.PI * 0.85 + k / 11 * Math.PI * 0.7 - Math.PI * 0.0; const r1 = k % 3 ? 19 : 16; c.beginPath(); c.moveTo(Math.cos(an) * r1, 12 + Math.sin(an) * r1); c.lineTo(Math.cos(an) * 21, 12 + Math.sin(an) * 21); c.stroke(); }
  c.save(); c.translate(0, 12); c.rotate(-0.3 + Math.sin(a.t * 4) * 0.25 * a.live);
  c.strokeStyle = '#d63a2f'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -19); c.stroke(); c.restore();
  circ(c, 0, 12, 2.4, '#3b3b3b');
  ell(c, -22, 46, 8, 3, '#5a5a5a'); ell(c, 22, 46, 8, 3, '#5a5a5a');
}
function drawCrate(c, a) {
  wash(c, () => { c.beginPath(); c.moveTo(-54, -8); for (let k = 0; k <= 12; k++) c.lineTo(-54 + k * 9, -14 - (k % 2) * 5 - Math.sin(k) * 2); c.lineTo(54, -8); c.closePath(); }, 'rgba(240,250,255,.95)', 'rgba(120,160,190,.6)');
  const fish = (x, y, r, col) => { c.save(); c.translate(x, y); c.rotate(r); ell(c, 0, 0, 20, 5.5, col); poly(c, [-18, 0, -26, -5, -26, 5], col); c.strokeStyle = 'rgba(30,50,70,.55)'; c.lineWidth = 1; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(-10 + k * 5, -5); c.lineTo(-7 + k * 5, -1); c.stroke(); } ell(c, 2, 2.6, 15, 2, 'rgba(240,245,250,.8)'); eye(c, 14, -1, 1.5); c.restore(); };
  fish(-26, -16, -0.15, '#5f7f98'); fish(4, -20, 0.08, '#6a8aa2'); fish(30, -15, -0.12, '#5f7f98');
  wash(c, () => rr(c, -56, -10, 112, 40, 4), '#3f8fd0', 'rgba(20,60,110,.6)');
  c.strokeStyle = 'rgba(20,60,110,.35)'; c.lineWidth = 1; for (let x = -40; x <= 40; x += 16) { c.beginPath(); c.moveTo(x, -6); c.lineTo(x, 26); c.stroke(); }
  wash(c, () => rr(c, -48, -2, 18, 7, 3), '#2a6fae', 'rgba(20,60,110,.5)'); wash(c, () => rr(c, 30, -2, 18, 7, 3), '#2a6fae', 'rgba(20,60,110,.5)');
  const g = Math.max(0, Math.sin(a.t * 3)) * (0.3 + a.live) * 4; if (g > 0.5) { c.fillStyle = '#fff'; c.fillRect(-8 - g, -24, 2 * g, 0.8); c.fillRect(-8.4, -24 - g, 0.8, 2 * g); }
}
function drawCat(c, a) {
  const L = 0.3 + a.live, sw = Math.sin(a.t * 2.2) * 8 * L;
  c.strokeStyle = '#e0904a'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(12, 34); c.quadraticCurveTo(30, 30, 24 + sw * 0.3, 4 + Math.abs(sw) * 0.3); c.stroke(); c.lineCap = 'butt';
  wash(c, () => { c.beginPath(); c.ellipse(2, 16, 19, 24, 0, 0, TAU); }, '#f0a557', 'rgba(130,70,20,.55)');
  ell(c, -2, 18, 9, 14, '#fbf2e6');
  poly(c, [-16, -26, -14, -40, -4, -30], '#f0a557'); poly(c, [4, -30, 12, -40, 15, -25], '#f0a557');
  poly(c, [-13.5, -28, -13, -36, -7, -30], '#f6b8a8'); poly(c, [6, -30, 11, -36, 12.5, -28], '#f6b8a8');
  wash(c, () => { c.beginPath(); c.arc(-1, -16, 15, 0, TAU); }, '#f0a557', 'rgba(130,70,20,.55)');
  c.strokeStyle = 'rgba(180,90,30,.6)'; c.lineWidth = 2; for (const x of [-5, -1, 3]) { c.beginPath(); c.moveTo(x, -31); c.lineTo(x, -25); c.stroke(); }
  for (const y of [6, 14, 22]) { c.beginPath(); c.moveTo(14, y); c.lineTo(20, y - 2); c.stroke(); }
  eye(c, -8, -17, 2.6); eye(c, 4, -17, 2.6);
  poly(c, [-3, -11, 1, -11, -1, -9], '#e07a8a'); blush(c, -10, -9, 3); blush(c, 8, -9, 3);
  c.strokeStyle = 'rgba(80,40,20,.5)'; c.lineWidth = 0.8; for (const s of [-1, 1]) for (const d of [-1, 1]) { c.beginPath(); c.moveTo(-1 + s * 5, -9); c.lineTo(-1 + s * 14, -9 + d * 2); c.stroke(); }
  ell(c, -8, 38, 6, 3.5, '#fbf2e6'); ell(c, 6, 38, 6, 3.5, '#fbf2e6');
}

/* ===== 2-10 City under the sea, Yonaguni ===== */
function bgCity(c) {
  const R = mulberry(30);
  band(c, 0, H, [[0, '#b4e9f2'], [0.35, '#4aa3c9'], [0.75, '#21689c'], [1, '#143e68']]);
  rays(c, R, 7, 'rgba(255,255,255,.08)', 0, 430);
  blooms(c, R, 30, ['60,160,210', '30,100,170', '170,225,240'], 20, 70, 0.11);
  for (let k = 0; k < 14; k++) { const x = 250 + R() * 90, y = 90 + R() * 40; c.save(); c.translate(x, y); ell(c, 0, 0, 4, 1.6, 'rgba(255,255,255,.22)'); poly(c, [-4, 0, -7, -2, -7, 2], 'rgba(255,255,255,.22)'); c.restore(); }
  for (const [x, w, h] of [[110, 40, 60], [170, 30, 90], [215, 46, 50], [280, 34, 70], [330, 40, 44]]) {
    wc(c, R, [x - w / 2, 330, x - w / 2, 330 - h, x + w / 2, 330 - h, x + w / 2, 330], '#5f93b5', 4, 0.13, 4);
    wc(c, R, [x - w / 2 - 4, 330 - h, x, 330 - h - w * 0.55, x + w / 2 + 4, 330 - h], '#6fa4c4', 4, 0.12, 4);
  }
  wc(c, R, [0, H, 0, 300, 108, 300, 108, 384, 136, 384, 136, 456, 360, 456, 360, H], '#8a8274', 8, 0.16, 6);
  c.fillStyle = 'rgba(210,200,180,.5)'; c.fillRect(0, 298, 108, 4); c.fillRect(108, 382, 28, 3); c.fillRect(136, 454, 224, 3);
  c.strokeStyle = 'rgba(60,55,45,.3)'; c.lineWidth = 1.2; for (const [x0, y0, x1, y1] of [[0, 340, 108, 340], [36, 300, 36, 384], [0, 410, 136, 410], [72, 384, 72, 456], [180, 456, 180, 480], [260, 456, 260, 480]]) { c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); }
  wc(c, R, [258, 368, 271, 328, 284, 368], '#e9a99a', 5, 0.3, 3);
  c.strokeStyle = 'rgba(160,80,70,.45)'; c.lineWidth = 1.5; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(261 + k * 2.4, 364 - k * 9); c.lineTo(282 - k * 2.6, 358 - k * 9); c.stroke(); }
  const dome = () => { c.beginPath(); c.moveTo(208, 456); c.bezierCurveTo(204, 330, 336, 330, 332, 456); c.closePath(); };
  dome(); c.fillStyle = '#f3c3b4'; c.fill();
  c.save(); dome(); c.clip();
  for (let k = 0; k < 9; k++) { const an = Math.PI * (1.08 + k * 0.105); c.strokeStyle = 'rgba(190,110,95,.35)'; c.lineWidth = 7; c.beginPath(); c.moveTo(270, 470); c.lineTo(270 + Math.cos(an) * 160, 470 + Math.sin(an) * 160); c.stroke(); }
  blooms(c, R, 5, ['255,235,225'], 18, 34, 0.3, 214, 350, 110, 90);
  c.restore();
  dome(); c.strokeStyle = 'rgba(160,80,70,.55)'; c.lineWidth = 2; c.stroke();
  wc(c, R, [236, 456, 236, 438, 304, 438, 304, 456], '#d99a8a', 4, 0.3, 3);
  for (const x of [222, 318]) { circ(c, x, 448, 3, 'rgba(255,240,200,.85)'); }
  wc(c, R, [254, 418, 254, 374, 286, 374, 286, 418], '#ffe7a0', 4, 0.55, 2);
  c.strokeStyle = 'rgba(150,100,40,.6)'; c.lineWidth = 2; c.strokeRect(254, 374, 32, 44); c.beginPath(); c.moveTo(270, 374); c.lineTo(270, 418); c.moveTo(254, 396); c.lineTo(286, 396); c.stroke();
  for (const [x, top] of [[10, 300], [350, 330], [120, 380]]) kelp(c, R, x, 478, top, 'rgba(70,140,90,.6)', 'rgba(90,160,100,.55)', 3);
  fizz(c, R, 30, 20, 440);
  specks(c, R, 500, 'rgba(20,50,80,.08)');
}
function drawCitySign(c, a) {
  const bob = Math.sin(a.t * 2) * 1.5 * a.live;
  c.strokeStyle = 'rgba(80,60,40,.7)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-56, -18 + bob); c.lineTo(-66, -10); c.moveTo(56, -18 + bob); c.lineTo(66, -10); c.stroke();
  for (const s of [-1, 1]) { wash(c, () => { c.beginPath(); c.arc(s * 56, -20 + bob, 7, 0, TAU); }, '#f08a5d', 'rgba(120,50,20,.6)'); ell(c, s * 56 - 2, -23 + bob, 2.5, 1.5, 'rgba(255,255,255,.6)'); }
  wash(c, () => rr(c, -78, -12, 156, 36, 10), '#86d3c8', 'rgba(30,110,115,.7)');
  ell(c, -30, -6, 40, 3, 'rgba(255,255,255,.3)');
  for (const s of [-1, 1]) { c.save(); c.translate(s * 66, 6); wash(c, () => { c.beginPath(); c.moveTo(0, 7); c.arc(0, 7, 10, -Math.PI * 0.85, -Math.PI * 0.15); c.closePath(); }, '#f6c7b6', 'rgba(150,80,60,.6)'); c.strokeStyle = 'rgba(150,80,60,.5)'; c.lineWidth = 0.8; for (const d of [-5, 0, 5]) { c.beginPath(); c.moveTo(0, 7); c.lineTo(d, -2); c.stroke(); } c.restore(); }
  fitTxt(c, T('歡迎光臨 海底城', 'Welcome to Sea City'), 0, 6, T('900 15px "Noto Serif TC", serif', '600 20px Caveat, "Noto Sans TC", cursive'), '#1f4f5a', 104);
}
function drawCityDolphin(c, a) { drawDolphin(c, a, 0.82); }
function drawClockTower(c, a) {
  wash(c, () => rr(c, -30, 52, 60, 26, 4), '#b8a48c', 'rgba(70,60,40,.6)');
  wash(c, () => rr(c, -22, -36, 44, 90, 6), '#f2a6a0', 'rgba(140,60,60,.6)');
  ell(c, -12, 10, 5, 34, 'rgba(255,255,255,.18)');
  for (const y of [22, 40]) { wash(c, () => { c.beginPath(); c.moveTo(-6, y + 8); c.lineTo(-6, y); c.arc(0, y, 6, Math.PI, TAU); c.lineTo(6, y + 8); c.closePath(); }, '#ffe9a8', 'rgba(140,90,40,.6)'); }
  const dome = () => { c.beginPath(); c.moveTo(-27, -34); c.quadraticCurveTo(-26, -66, 0, -68); c.quadraticCurveTo(26, -66, 27, -34); c.closePath(); };
  wash(c, dome, '#5fb3c9', 'rgba(30,80,100,.6)');
  c.strokeStyle = 'rgba(30,80,100,.35)'; c.lineWidth = 1; for (const x of [-12, 0, 12]) { c.beginPath(); c.moveTo(x * 1.9, -34); c.quadraticCurveTo(x * 1.2, -60, 0, -67); c.stroke(); }
  circ(c, 0, -72, 4, '#fff4e6'); ell(c, -1, -73.5, 1.4, 1, '#fff');
  wash(c, () => { c.beginPath(); c.arc(0, -12, 16, 0, TAU); }, '#fff8e6', 'rgba(140,60,60,.6)');
  c.strokeStyle = 'rgba(80,50,40,.7)'; c.lineWidth = 1.4;
  for (let k = 0; k < 12; k++) { const an = k / 12 * TAU, r1 = k % 3 ? 12.5 : 11; c.beginPath(); c.moveTo(Math.cos(an) * r1, -12 + Math.sin(an) * r1); c.lineTo(Math.cos(an) * 14, -12 + Math.sin(an) * 14); c.stroke(); }
  c.lineCap = 'round'; c.strokeStyle = '#3b2a20';
  c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, -12); c.lineTo(Math.cos(-Math.PI * 5 / 6) * 8, -12 + Math.sin(-Math.PI * 5 / 6) * 8); c.stroke();
  c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, -12); c.lineTo(Math.cos(-Math.PI / 6) * 11.5, -12 + Math.sin(-Math.PI / 6) * 11.5); c.stroke(); c.lineCap = 'butt';
  circ(c, 0, -12, 1.8, '#3b2a20');
  const b = (a.t * 0.5) % 1;
  c.strokeStyle = `rgba(255,255,255,${0.7 * (1 - b) * (0.3 + a.live)})`; c.lineWidth = 1; c.beginPath(); c.arc(6, -76 - b * 0, 1.8 + b, 0, TAU); c.stroke();
}
function drawSeahorse(c, a, dir, col, edge) {
  const L = 0.3 + a.live, fin = Math.sin(a.t * 12) * 0.4 * L;
  c.scale(dir, 1);
  c.lineCap = 'round'; c.strokeStyle = col; c.lineWidth = 7;
  c.beginPath(); c.moveTo(-2, 12); c.bezierCurveTo(-6, 26, 4, 34, 14, 33); c.quadraticCurveTo(24, 31, 22, 24); c.quadraticCurveTo(19, 20, 15, 24); c.stroke();
  c.strokeStyle = edge; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-5, 14); c.bezierCurveTo(-9, 28, 4, 38, 15, 37); c.stroke(); c.lineCap = 'butt';
  c.save(); c.translate(-11, -4); c.rotate(-0.3 + fin); wash(c, () => { c.beginPath(); c.ellipse(-4, 0, 6, 4, 0, 0, TAU); }, 'rgba(255,255,255,.7)', edge); c.restore();
  wash(c, () => { c.beginPath(); c.moveTo(-6, -20); c.bezierCurveTo(8, -18, 14, 0, 6, 14); c.quadraticCurveTo(0, 20, -6, 16); c.bezierCurveTo(-11, 4, -14, -10, -6, -20); c.closePath(); }, col, edge);
  c.strokeStyle = edge; c.lineWidth = 0.9; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(2 + k * 0.8, -12 + k * 5); c.lineTo(9 - k * 0.4, -12 + k * 5); c.stroke(); }
  wash(c, () => rr(c, 2, -30, 15, 5.5, 2.5), col, edge);
  wash(c, () => { c.beginPath(); c.ellipse(-2, -26, 9, 8, 0, 0, TAU); }, col, edge);
  poly(c, [-7, -32, -5, -39, -2, -33, 1, -38, 2, -32], col);
  eye(c, 0, -27, 2.4); blush(c, 3, -21, 2.6);
}
function drawSeahorseA(c, a) { drawSeahorse(c, a, 1, '#f6b84a', 'rgba(140,80,10,.6)'); }
function drawSeahorseB(c, a) { drawSeahorse(c, a, -1, '#f39ab0', 'rgba(140,50,70,.6)'); }
function drawShutter(c, a, side) {
  wash(c, () => rr(c, -13, -29, 26, 58, 3), '#5ab0c8', 'rgba(20,80,100,.65)');
  c.strokeStyle = 'rgba(20,80,100,.45)'; c.lineWidth = 1.2; for (let y = -22; y <= 22; y += 6) { c.beginPath(); c.moveTo(-10, y); c.lineTo(10, y); c.stroke(); }
  ell(c, -6, -18, 3, 10, 'rgba(255,255,255,.25)');
  for (const y of [-20, 20]) circ(c, -side * 11, y, 1.8, '#d9a441');
  if (side < 0) { c.beginPath(); for (let k = 0; k < 10; k++) { const an = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 2.4 : 5.5; c.lineTo(Math.cos(an) * r, 22 + Math.sin(an) * r); } c.closePath(); c.fillStyle = '#f08a5d'; c.fill(); }
  else { c.save(); c.translate(0, 22); c.beginPath(); c.moveTo(0, 4); c.arc(0, 4, 6, -Math.PI * 0.85, -Math.PI * 0.15); c.closePath(); c.fillStyle = '#f6c7b6'; c.fill(); c.restore(); }
}
function drawShutterL(c, a) { drawShutter(c, a, -1); }
function drawShutterR(c, a) { drawShutter(c, a, 1); }
function drawJellyLamp(c, a) {
  const L = 0.3 + a.live, pulse = 0.7 + 0.3 * Math.sin(a.t * 2.4);
  wash(c, () => rr(c, -12, 44, 24, 9, 3), '#5b6b78', 'rgba(20,30,40,.6)');
  wash(c, () => rr(c, -3, -18, 6, 64, 2), '#6b7b88', 'rgba(20,30,40,.6)');
  for (const y of [0, 24]) { c.fillStyle = '#d9a441'; c.fillRect(-4.5, y, 9, 3); }
  c.globalAlpha = 0.18 * pulse; circ(c, 0, -32, 28, '#ffd9ef'); c.globalAlpha = 1;
  c.strokeStyle = 'rgba(255,215,240,.75)'; c.lineWidth = 1.5;
  for (let k = 0; k < 6; k++) { const x = -15 + k * 6, sw = Math.sin(a.t * 2 + k) * 2.5 * L; c.beginPath(); c.moveTo(x, -26); c.quadraticCurveTo(x + sw, -16, x - sw * 0.5, -6 - (k % 2) * 3); c.stroke(); }
  wash(c, () => { c.beginPath(); c.moveTo(-20, -26); c.bezierCurveTo(-20, -56, 20, -56, 20, -26); c.quadraticCurveTo(0, -22, -20, -26); c.closePath(); }, `rgba(255,${200 + Math.round(20 * pulse)},235,.92)`, 'rgba(170,80,130,.6)');
  ell(c, -8, -42, 6, 3.5, 'rgba(255,255,255,.6)', -0.4);
  eye(c, -6, -33, 2); eye(c, 6, -33, 2); blush(c, -11, -29, 2.6); blush(c, 11, -29, 2.6);
}

defineChapter({
  key: 'ocean', order: 2,
  name: { zh: "海洋深處", en: "Deep Blue" },
  blurb: { zh: "在水裡游來游去的生物，轉正時會冒泡、會唱歌。", en: "Creatures that swim around, and bubble or sing when straightened." },
  style: { zh: "水彩", en: "Watercolor" },
  narrator: { zh: "海龜", en: "Turtle" },
  song: 'reef',
    comments: {
      far: [{ zh: ["咕嚕咕嚕…", "整片珊瑚礁都在打轉，小丑魚游到頭暈了。"], en: ["Glub glub…", "The whole reef is spinning. Clownfish feels dizzy."] }, { zh: ["潮水亂了", "章魚八隻手都抓不住你歪掉的東西。"], en: ["Messy tides", "Even eight arms can't hold all this tilt."] }],
      close: [{ zh: ["差一個泡泡", "就差一點點，螃蟹在旁邊橫著幫你加油。"], en: ["One bubble away", "So close! Crab is cheering you on, sideways."] }, { zh: ["快到岸了", "海龜慢慢說：別…急…你…快…好…了…"], en: ["Almost ashore", "Turtle says slowly: don't… rush… nearly… there…"] }],
      pass: [{ zh: ["浮上水面！", "過關了，但鯨魚覺得還有點歪，噴了一口水。"], en: ["Surfaced!", "Cleared, but Whale thinks it's still crooked. Splash."] }, { zh: ["及格泡泡", "小丑魚：咕嚕～勉強可以回家了。"], en: ["Passing bubbles", "Clownfish: glub~ okay, we can go home now."] }],
      good: [{ zh: ["游得很順！", "大家排成一列，像在海底開遊行。"], en: ["Smooth swimming!", "Everyone in a line, like an underwater parade."] }, { zh: ["海洋好幫手", "章魚用八隻手同時給你按讚。"], en: ["Ocean helper", "Octopus gives you eight thumbs up at once."] }],
      perfect: [{ zh: ["完美海流♪", "一度都不差！鯨魚為你唱了一整首歌。"], en: ["Perfect current♪", "Not one degree off! Whale sang you a whole song."] }, { zh: ["深海傳說", "海龜活了一百歲，第一次看到這麼正的珊瑚礁。"], en: ["Deep-sea legend", "In 100 years, Turtle has never seen a reef this straight."] }],
    },
  stages: [
    { key: 'reef', title: { zh: "珊瑚礁", en: "Coral Reef" }, place: { zh: "澳洲 大堡礁", en: "Great Barrier Reef, Australia" },
      intro: { zh: "海裡的生物會游來游去。抓住牠、轉正牠，牠就會安靜下來。", en: "Sea creatures swim around. Catch one, straighten it, and it calms down." },
      bg: bgReef, overlay: ovReef, animated: true,
      objects: [
      { id: 'clown', name: { zh: '小丑魚', en: 'Clownfish' }, x: 95, y: 150, w: 70, h: 40, mag: 12, draw: drawClown, habit: (t, l) => ({ dx: Math.sin(t * 1.3) * 8 * l, dy: Math.sin(t * 2.1) * 2 * l }), call: 'bubble' },
      { id: 'turtle', name: { zh: '海龜', en: 'Sea turtle' }, x: 250, y: 140, w: 110, h: 70, mag: 9, draw: drawTurtle, habit: (t, l) => ({ dy: Math.sin(t * 1.5) * 4 * l }), call: 'turtle' },
      { id: 'whale', name: { zh: '鯨魚', en: 'Whale' }, x: 115, y: 265, w: 130, h: 70, mag: 7, draw: drawWhale, call: 'whale' },
      { id: 'octo', name: { zh: '章魚', en: 'Octopus' }, x: 270, y: 330, w: 80, h: 90, mag: 14, draw: drawOcto, habit: (t, l) => ({ dy: Math.sin(t * 1.8) * 5 * l }), call: 'squish' },
      { id: 'crab', name: { zh: '螃蟹', en: 'Crab' }, x: 110, y: 420, w: 80, h: 50, near: true, draw: drawCrab, habit: (t, l) => ({ dx: Math.sin(t * 3) * 6 * l }), call: 'clack' }
      ] },
    { key: 'ocean-kelp', title: { zh: "海草森林", en: "Kelp Forest" }, place: { zh: "美國 加州 蒙特雷灣", en: "Monterey Bay, California, USA" },
      intro: { zh: "巨藻長得比房子還高。海獺躺在水面上，把貝殼放在肚子上敲。", en: "Giant kelp grows taller than a house. Sea otters float on their backs with a shell on their tummy." },
      bg: bgKelp, overlay: ovReef, animated: true,
      objects: [
      { id: 'otter', name: { zh: '海獺', en: 'Sea otter' }, x: 110, y: 58, w: 124, h: 50, mag: 9, draw: drawOtter, habit: (t, l) => ({ dx: Math.sin(t * 0.6) * 5 * l, dy: Math.sin(t * 1.6) * 1.5 * l }), call: 'ocean_otter' },
      { id: 'flag', name: { zh: '潛水旗浮標', en: 'Dive flag buoy' }, x: 285, y: 45, w: 60, h: 78, mag: 13, draw: drawDiveFlag, sfx: 'ocean_buoy' },
      { id: 'seal', name: { zh: '港海豹', en: 'Harbor seal' }, x: 220, y: 228, w: 144, h: 64, mag: 6, draw: drawSeal, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 8 * l, dy: Math.sin(t * 1.5) * 3 * l }), call: 'ocean_seal' },
      { id: 'garibaldi', name: { zh: '橘雀鯛', en: 'Garibaldi' }, x: 105, y: 352, w: 76, h: 50, near: true, draw: drawGaribaldi, habit: (t, l) => ({ dx: Math.sin(t * 1.2) * 7 * l, dy: Math.sin(t * 2.3) * 2 * l }), call: 'bubble' }
      ] },
    { key: 'ocean-wreck', title: { zh: "沉船寶藏", en: "Shipwreck Treasure" }, place: { zh: "加勒比海", en: "Caribbean Sea" },
      intro: { zh: "老帆船沉睡在白沙上。寶箱、船錨和船鐘都歪了，河豚一緊張就鼓起來。", en: "An old ship sleeps on white sand. The chest, anchor and bell are all askew, and Pufferfish puffs up when nervous." },
      bg: bgWreck, overlay: ovReef, animated: true,
      objects: [
      { id: 'bell', name: { zh: '船鐘', en: "Ship's bell" }, x: 105, y: 166, w: 70, h: 82, mag: 10, draw: drawShipBell, sfx: 'bell' },
      { id: 'puffer', name: { zh: '河豚', en: 'Pufferfish' }, x: 262, y: 215, w: 78, h: 72, mag: 14, draw: drawPuffer, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 6 * l, dy: Math.sin(t * 1.7) * 4 * l }), call: 'ocean_puffer' },
      { id: 'anchor', name: { zh: '船錨', en: 'Anchor' }, x: 72, y: 378, w: 92, h: 124, mag: 6, draw: drawAnchor, sfx: 'clunk' },
      { id: 'chest', name: { zh: '寶箱', en: 'Treasure chest' }, x: 205, y: 406, w: 112, h: 78, near: true, draw: drawChest, sfx: 'jingle' },
      { id: 'bottle', name: { zh: '瓶中信', en: 'Message in a bottle' }, x: 314, y: 404, w: 42, h: 78, mag: 8, draw: drawBottle, sfx: 'ocean_drip' }
      ] },
    { key: 'ocean-song', title: { zh: "鯨魚之歌", en: "Whale Song" }, place: { zh: "美國 夏威夷 茂宜島", en: "Maui, Hawaii, USA" },
      intro: { zh: "冬天，座頭鯨來這裡生寶寶、唱歌。鯨寶寶會緊跟著媽媽游。", en: "Every winter, humpbacks come here to sing and raise their calves. The calf sticks close to Mom." },
      bg: bgSong, overlay: ovReef, animated: true,
      objects: [
      { id: 'boat', name: { zh: '賞鯨船', en: 'Whale-watch boat' }, x: 95, y: 46, w: 140, h: 64, mag: 8, draw: drawBoat, sfx: 'ocean_horn' },
      { id: 'dolphin', name: { zh: '飛旋海豚', en: 'Spinner dolphin' }, x: 268, y: 140, w: 120, h: 56, mag: 11, draw: drawDolphin, habit: (t, l) => ({ dx: Math.sin(t * 1.1) * 7 * l, dy: Math.sin(t * 2.2) * 3 * l }), call: 'ocean_dolphin' },
      { id: 'mom', name: { zh: '座頭鯨媽媽', en: 'Humpback mom' }, x: 168, y: 262, w: 230, h: 86, mag: 6, draw: drawMomWhale, habit: (t, l) => ({ dy: Math.sin(t * 0.9) * 3 * l }), link: { to: 'calf', k: 0.6 }, call: 'whale' },
      { id: 'calf', name: { zh: '鯨寶寶', en: 'Whale calf' }, x: 238, y: 374, w: 130, h: 52, mag: 13, draw: drawCalf, habit: (t, l) => ({ dx: Math.sin(t * 1.3) * 5 * l, dy: Math.sin(t * 1.9) * 3 * l }), call: 'ocean_calf' },
      { id: 'mic', name: { zh: '水下麥克風', en: 'Hydrophone' }, x: 70, y: 398, w: 76, h: 110, near: true, draw: drawHydrophone, sfx: 'beep' }
      ] },
    { key: 'ocean-jelly', title: { zh: "水母燈海", en: "Jellyfish Lights" }, place: { zh: "帛琉 水母湖", en: "Jellyfish Lake, Palau" },
      intro: { zh: "湖裡住著成千上萬隻金色水母，陽光一照，像一盞盞小燈。", en: "Millions of golden jellyfish live in this lake. In the sun they glow like little lamps." },
      bg: bgJelly, overlay: ovReef, animated: true,
      objects: [
      { id: 'sign', name: { zh: '浮潛告示', en: 'Snorkel sign' }, x: 262, y: 50, w: 120, h: 72, mag: 9, draw: drawLakeSign, sfx: 'wood' },
      { id: 'gold', name: { zh: '黃金水母', en: 'Golden jelly' }, x: 100, y: 185, w: 92, h: 92, mag: 12, draw: drawGoldJelly, habit: (t, l) => ({ dy: Math.sin(t * 1.2) * 6 * l }), link: { to: 'little', k: 0.6 }, call: 'ocean_jelly' },
      { id: 'little', name: { zh: '小水母', en: 'Little jelly' }, x: 215, y: 250, w: 62, h: 64, mag: 7, draw: drawLittleJelly, habit: (t, l) => ({ dy: Math.sin(t * 1.5 + 1) * 5 * l }), call: 'ocean_jelly' },
      { id: 'moon', name: { zh: '海月水母', en: 'Moon jelly' }, x: 282, y: 372, w: 92, h: 78, mag: 5, draw: drawMoonJelly, habit: (t, l) => ({ dx: Math.sin(t * 0.5) * 4 * l, dy: Math.sin(t) * 5 * l }), call: 'squish' },
      { id: 'cardinal', name: { zh: '天竺鯛', en: 'Cardinalfish' }, x: 100, y: 385, w: 74, h: 42, near: true, draw: drawCardinal, habit: (t, l) => ({ dx: Math.sin(t * 1.4) * 6 * l, dy: Math.sin(t * 2.6) * 2 * l }), call: 'bubble' }
      ] },
    { key: 'ocean-arctic', title: { zh: "極地冰海", en: "Polar Sea" }, place: { zh: "挪威 斯瓦巴群島", en: "Svalbard, Norway" },
      intro: { zh: "北極熊在浮冰上散步，獨角鯨在冰下結伴游。路邊的牌子提醒你：這裡有熊！", en: "Polar bears stroll on the ice while narwhals swim below in pairs. The sign says it all: bears here!" },
      bg: bgArctic, overlay: ovReef, animated: true,
      objects: [
      { id: 'bear', name: { zh: '北極熊', en: 'Polar bear' }, x: 85, y: 140, w: 120, h: 64, mag: 7, draw: drawPolarBear, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 3 * l }), call: 'ocean_bear' },
      { id: 'walrus', name: { zh: '海象', en: 'Walrus' }, x: 207, y: 146, w: 100, h: 56, mag: 10, draw: drawWalrus, call: 'ocean_walrus' },
      { id: 'sign', name: { zh: '北極熊警告牌', en: 'Polar bear sign' }, x: 310, y: 128, w: 64, h: 92, near: true, draw: drawBearSign, sfx: 'clunk' },
      { id: 'beluga', name: { zh: '白鯨', en: 'Beluga' }, x: 108, y: 268, w: 140, h: 64, near: true, draw: drawBeluga, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 6 * l, dy: Math.sin(t * 1.6) * 3 * l }), call: 'ocean_beluga' },
      { id: 'narwhal', name: { zh: '獨角鯨', en: 'Narwhal' }, x: 230, y: 345, w: 170, h: 52, mag: 12, draw: drawNarwhal, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 5 * l, dy: Math.sin(t * 1.4) * 2 * l }), link: { to: 'narwhal2', k: 0.6 }, call: 'ocean_narwhal' },
      { id: 'narwhal2', name: { zh: '獨角鯨夥伴', en: 'Narwhal buddy' }, x: 145, y: 428, w: 170, h: 52, mag: 5, draw: drawNarwhal2, habit: (t, l) => ({ dx: Math.sin(t * 0.8 + 2) * 5 * l, dy: Math.sin(t * 1.3) * 2 * l }), call: 'ocean_narwhal' }
      ] },
    { key: 'ocean-glow', title: { zh: "深海發光", en: "Deep Glow" }, place: { zh: "大西洋 深海", en: "Deep Atlantic Ocean" },
      intro: { zh: "陽光照不到的深海，生物自己會發光。潛水艇用遙控機器人來探險。", en: "No sunlight reaches this deep, so the creatures make their own. The sub explores with a robot on a cable." },
      bg: bgDeep, overlay: ovReef, animated: true,
      objects: [
      { id: 'sub', name: { zh: '潛水艇', en: 'Submersible' }, x: 112, y: 100, w: 160, h: 84, mag: 9, draw: drawSub, link: { to: 'rov', k: 0.5 }, sfx: 'beep' },
      { id: 'rov', name: { zh: '小機器人', en: 'Robot sub' }, x: 288, y: 168, w: 90, h: 64, mag: 6, draw: drawROV, sfx: 'pop' },
      { id: 'lantern', name: { zh: '燈籠魚', en: 'Lanternfish' }, x: 245, y: 272, w: 90, h: 40, near: true, draw: drawLanternfish, habit: (t, l) => ({ dx: Math.sin(t * 1.3) * 7 * l, dy: Math.sin(t * 2.1) * 2 * l }), call: 'bubble' },
      { id: 'angler', name: { zh: '鮟鱇魚', en: 'Anglerfish' }, x: 95, y: 292, w: 120, h: 90, mag: 12, draw: drawAngler, habit: (t, l) => ({ dy: Math.sin(t * 1.1) * 4 * l }), call: 'ocean_angler' },
      { id: 'dumbo', name: { zh: '小飛象章魚', en: 'Dumbo octopus' }, x: 268, y: 378, w: 96, h: 96, mag: 8, draw: drawDumbo, habit: (t, l) => ({ dy: Math.sin(t * 1.4) * 6 * l }), call: 'squish' },
      { id: 'comb', name: { zh: '櫛水母', en: 'Comb jelly' }, x: 110, y: 420, w: 52, h: 82, near: true, draw: drawCombJelly, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 4 * l, dy: Math.sin(t * 1.2) * 4 * l }), call: 'ocean_jelly' }
      ] },
    { key: 'ocean-nest', title: { zh: "海龜歸鄉", en: "Turtle Homecoming" }, place: { zh: "台灣 澎湖 望安島", en: "Wang-an Island, Penghu, Taiwan" },
      intro: { zh: "綠蠵龜媽媽回到出生的沙灘產卵，小海龜破殼後朝著月光爬向大海。", en: "Green turtle moms return to the beach where they hatched. Hatchlings follow the moonlight to the sea." },
      bg: bgNest, overlay: ovReef, animated: true,
      objects: [
      { id: 'sail', name: { zh: '遠方帆船', en: 'Distant sailboat' }, x: 292, y: 140, w: 70, h: 84, trap: true, keep: 8, draw: drawSailboat,
        trapNote: { zh: '帆船吃風時本來就會傾斜', en: 'A sailboat heels over when the wind fills its sails' } },
      { id: 'sign', name: { zh: '產卵告示', en: 'Nesting sign' }, x: 70, y: 262, w: 116, h: 84, near: true, draw: drawNestSign, sfx: 'wood' },
      { id: 'postL', name: { zh: '左木樁', en: 'Left post' }, x: 228, y: 262, w: 56, h: 76, mag: 9, draw: drawPostL, link: { to: 'postR', k: 0.6 }, sfx: 'boing' },
      { id: 'postR', name: { zh: '右木樁', en: 'Right post' }, x: 284, y: 262, w: 56, h: 76, mag: 6, draw: drawPostR, sfx: 'boing' },
      { id: 'turtle', name: { zh: '綠蠵龜媽媽', en: 'Green turtle mom' }, x: 112, y: 384, w: 150, h: 96, mag: 5, draw: drawMotherTurtle, habit: (t, l) => ({ dx: Math.sin(t * 0.5) * 3 * l }), call: 'turtle' },
      { id: 'hatch', name: { zh: '小海龜', en: 'Hatchling' }, x: 255, y: 362, w: 50, h: 44, mag: 14, draw: drawHatchling, habit: (t, l) => ({ dx: Math.sin(t * 1.7) * 3 * l, dy: Math.sin(t * 3) * 1.5 * l }), call: 'ocean_hatch' },
      { id: 'hatch2', name: { zh: '小海龜弟弟', en: 'Little hatchling' }, x: 318, y: 418, w: 50, h: 44, near: true, draw: drawHatchling, habit: (t, l) => ({ dx: Math.sin(t * 1.9) * 3 * l, dy: Math.sin(t * 2.7) * 1.5 * l }), call: 'ocean_hatch' },
      { id: 'crab', name: { zh: '沙蟹', en: 'Ghost crab' }, x: 228, y: 444, w: 72, h: 46, mag: 11, draw: drawGhostCrab, habit: (t, l) => ({ dx: Math.sin(t * 2.5) * 6 * l }), call: 'clack' }
      ] },
    { key: 'ocean-harbor', title: { zh: "港口漁市", en: "Harbor Fish Market" }, place: { zh: "台灣 基隆", en: "Keelung, Taiwan" },
      intro: { zh: "漁船一靠岸，魚市就熱鬧起來。對岸是彩色的房子，貓咪早就在等了。", en: "When the boats come in, the market wakes up. Colorful houses line the harbor, and the cat is already waiting." },
      bg: bgHarbor, overlay: ovReef, animated: true,
      objects: [
      { id: 'gull', name: { zh: '海鷗', en: 'Seagull' }, x: 78, y: 60, w: 84, h: 44, mag: 10, draw: drawGull, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 8 * l, dy: Math.sin(t * 1.6) * 4 * l }), call: 'ocean_gull' },
      { id: 'boat', name: { zh: '漁船', en: 'Fishing boat' }, x: 250, y: 168, w: 150, h: 72, mag: 7, draw: drawFishBoat, sfx: 'ocean_horn' },
      { id: 'slip', name: { zh: '船台滑道', en: 'Slipway' }, x: 82, y: 196, w: 130, h: 40, trap: true, keep: 6, draw: drawSlipway,
        trapNote: { zh: '船台滑道本來就是斜的，船才滑得進海裡', en: 'A slipway slopes on purpose, so boats can slide into the sea' } },
      { id: 'lanternL', name: { zh: '左燈籠', en: 'Left lantern' }, x: 40, y: 288, w: 44, h: 64, mag: 13, draw: drawLantern, link: { to: 'lanternR', k: 0.6 }, sfx: 'bell' },
      { id: 'sign', name: { zh: '魚攤招牌', en: 'Stall sign' }, x: 180, y: 288, w: 150, h: 54, near: true, draw: drawMarketSign, sfx: 'wood' },
      { id: 'lanternR', name: { zh: '右燈籠', en: 'Right lantern' }, x: 320, y: 288, w: 44, h: 64, mag: 8, draw: drawLantern, sfx: 'bell' },
      { id: 'scale', name: { zh: '磅秤', en: 'Scale' }, x: 78, y: 405, w: 96, h: 100, mag: 6, draw: drawScale, sfx: 'clunk' },
      { id: 'crate', name: { zh: '漁獲箱', en: 'Fish crate' }, x: 205, y: 428, w: 120, h: 64, near: true, draw: drawCrate, sfx: 'ocean_drip' },
      { id: 'cat', name: { zh: '橘貓', en: 'Ginger cat' }, x: 316, y: 420, w: 64, h: 84, mag: 11, draw: drawCat, call: 'ocean_cat' }
      ] },
    { key: 'ocean-city', title: { zh: "海底城", en: "City Under the Sea" }, place: { zh: "日本 與那國島", en: "Yonaguni, Japan" },
      intro: { zh: "海底有一片像階梯的巨大岩石，大家叫它海底遺跡。今天，海裡的朋友都搬進來了。", en: "Giant stone steps lie on the seabed here, called the underwater ruins. Today, all our sea friends have moved in." },
      bg: bgCity, overlay: ovReef, animated: true,
      objects: [
      { id: 'sign', name: { zh: '城門招牌', en: 'City sign' }, x: 180, y: 58, w: 172, h: 56, near: true, draw: drawCitySign, sfx: 'twinkle' },
      { id: 'dolphin', name: { zh: '海豚', en: 'Dolphin' }, x: 300, y: 142, w: 100, h: 48, mag: 10, draw: drawCityDolphin, habit: (t, l) => ({ dx: Math.sin(t * 1.1) * 4 * l, dy: Math.sin(t * 2) * 3 * l }), call: 'ocean_dolphin' },
      { id: 'clock', name: { zh: '鐘塔', en: 'Clock tower' }, x: 62, y: 218, w: 76, h: 160, mag: 5, draw: drawClockTower, sfx: 'bell' },
      { id: 'seaA', name: { zh: '海馬', en: 'Seahorse' }, x: 168, y: 205, w: 48, h: 84, mag: 12, draw: drawSeahorseA, habit: (t, l) => ({ dy: Math.sin(t * 1.5) * 3 * l }), link: { to: 'seaB', k: 0.7 }, call: 'ocean_seahorse' },
      { id: 'seaB', name: { zh: '海馬伴侶', en: 'Seahorse partner' }, x: 216, y: 205, w: 48, h: 84, mag: 7, draw: drawSeahorseB, habit: (t, l) => ({ dy: Math.sin(t * 1.5) * 3 * l }), call: 'ocean_seahorse' },
      { id: 'turtle', name: { zh: '海龜', en: 'Sea turtle' }, x: 292, y: 272, w: 110, h: 70, near: true, draw: drawTurtle, habit: (t, l) => ({ dy: Math.sin(t * 1.3) * 3 * l }), call: 'turtle' },
      { id: 'lamp', name: { zh: '水母路燈', en: 'Jelly streetlamp' }, x: 150, y: 400, w: 60, h: 110, mag: 9, draw: drawJellyLamp, sfx: 'shimmer' },
      { id: 'shutL', name: { zh: '左窗板', en: 'Left shutter' }, x: 240, y: 395, w: 30, h: 62, mag: 14, draw: drawShutterL, link: { to: 'shutR', k: 0.6 }, sfx: 'wood' },
      { id: 'shutR', name: { zh: '右窗板', en: 'Right shutter' }, x: 300, y: 395, w: 30, h: 62, mag: 6, draw: drawShutterR, sfx: 'wood' }
      ] },
  ],
});
