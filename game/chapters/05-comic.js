// 第 5 大關 漫畫街角 / World 5: Comic Corners (Comic).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== Level 2: comic Paris ===== */
function bgParis(c) {
  c.fillStyle = '#fff3d9'; c.fillRect(0, 0, W, H);
  c.save(); c.beginPath(); c.rect(8, 8, W - 16, 300); c.clip();
  c.fillStyle = '#c4e8fb'; c.fillRect(8, 8, W - 16, 300);
  c.fillStyle = '#8fcdee';
  for (let y = 12, row = 0; y < 306; y += 8, row++) { const r = 0.5 + 2.4 * (1 - y / 306); for (let x = 12 + (row % 2) * 4; x < W - 10; x += 8) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); } }
  c.strokeStyle = 'rgba(17,17,17,.10)'; c.lineWidth = 1.5;
  for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; c.beginPath(); c.moveTo(285 + Math.cos(a) * 140, 150 + Math.sin(a) * 140); c.lineTo(285 + Math.cos(a) * 420, 150 + Math.sin(a) * 420); c.stroke(); }
  const blds = [[8,72,232],[80,58,218],[138,76,238],[214,62,224],[276,84,234]];
  blds.forEach(([x, w, top]) => {
    c.lineWidth = 2.5; c.strokeStyle = '#111';
    c.fillStyle = '#5d6b88'; c.fillRect(x + 12, top - 8, 7, 10); c.strokeRect(x + 12, top - 8, 7, 10);
    c.beginPath(); c.moveTo(x, top + 18); c.lineTo(x + 8, top); c.lineTo(x + w - 8, top); c.lineTo(x + w, top + 18); c.closePath(); c.fillStyle = '#8c9bb8'; c.fill(); c.stroke();
    c.fillStyle = '#f3dfb6'; c.fillRect(x, top + 18, w, 308 - top - 18); c.strokeRect(x, top + 18, w, 308 - top - 18);
    const cols = Math.floor((w - 10) / 16);
    for (let y = top + 26; y < 296; y += 19) {
      for (let i = 0; i < cols; i++) { c.fillStyle = '#6c84b3'; c.fillRect(x + 8 + i * 16, y, 9, 12); c.lineWidth = 1.5; c.strokeRect(x + 8 + i * 16, y, 9, 12); }
      c.beginPath(); c.moveTo(x + 4, y + 14); c.lineTo(x + w - 4, y + 14); c.stroke();
    }
  });
  c.restore();
  c.fillStyle = '#ead2a4'; c.fillRect(8, 308, W - 16, 164);
  c.strokeStyle = 'rgba(17,17,17,.2)'; c.lineWidth = 1.2;
  for (let y = 322, row = 0; y < 472; y += 12, row++) for (let x = 14 + (row % 2) * 8; x < W - 8; x += 16) { c.beginPath(); c.arc(x, y, 7, Math.PI, 0); c.stroke(); }
  c.lineWidth = 3; c.strokeStyle = '#111'; c.beginPath(); c.moveTo(8, 308); c.lineTo(W - 8, 308); c.stroke();
  c.lineWidth = 5; c.strokeRect(8, 8, W - 16, H - 16);
  rr(c, 14, 14, 160, 30, 2); c.fillStyle = '#ffe14d'; c.fill(); c.lineWidth = 2.5; c.stroke();
  txt(c, T('與此同時，在巴黎……', 'Meanwhile, in Paris…'), 24, 29.5, '700 14px "Noto Sans TC", sans-serif', '#111', 'left');
}
function eiffelPath(c) {
  c.beginPath(); c.moveTo(-2, -125); c.lineTo(-5, -96); c.quadraticCurveTo(-9, -50, -17, -22); c.lineTo(-25, -22); c.lineTo(-25, -12); c.lineTo(-20, -12);
  c.quadraticCurveTo(-25, 18, -36, 40); c.lineTo(-46, 40); c.lineTo(-46, 51); c.lineTo(-39, 51); c.quadraticCurveTo(-44, 95, -55, 125); c.lineTo(-31, 125);
  c.quadraticCurveTo(-27, 84, 0, 80); c.quadraticCurveTo(27, 84, 31, 125); c.lineTo(55, 125); c.quadraticCurveTo(44, 95, 39, 51); c.lineTo(46, 51); c.lineTo(46, 40); c.lineTo(36, 40);
  c.quadraticCurveTo(25, 18, 20, -12); c.lineTo(25, -12); c.lineTo(25, -22); c.lineTo(17, -22); c.quadraticCurveTo(9, -50, 5, -96); c.lineTo(2, -125); c.closePath();
}
function drawEiffel(c) {
  comicShape(c, () => eiffelPath(c), '#b07f55');
  c.save(); eiffelPath(c); c.clip();
  c.strokeStyle = 'rgba(17,17,17,.42)'; c.lineWidth = 1.2;
  for (let i = -260; i < 260; i += 10) { c.beginPath(); c.moveTo(i, -130); c.lineTo(i + 260, 130); c.stroke(); c.beginPath(); c.moveTo(i, 130); c.lineTo(i + 260, -130); c.stroke(); }
  c.fillStyle = 'rgba(255,230,190,.3)'; c.fillRect(-60, -130, 52, 260);
  c.restore();
  c.lineWidth = 2.5; c.strokeStyle = '#111'; c.fillStyle = '#7c5232';
  c.fillRect(-25, -22, 50, 10); c.strokeRect(-25, -22, 50, 10);
  c.fillRect(-46, 40, 92, 11); c.strokeRect(-46, 40, 92, 11);
  eiffelPath(c); c.lineWidth = 3; c.stroke();
  c.beginPath(); c.moveTo(0, -125); c.lineTo(0, -133); c.stroke();
}
function drawRue(c) {
  comicShape(c, () => rr(c, -80, -23, 160, 46, 6), '#2f7d4f');
  rr(c, -75, -18, 150, 36, 4); c.fillStyle = '#1f4fa0'; c.fill(); c.lineWidth = 1.5; c.strokeStyle = '#e8f0ff'; c.stroke();
  txt(c, '1er ARRT', 0, -9, '10px Bangers, sans-serif', '#fff');
  txt(c, 'RUE DE RIVOLI', 0, 6, '20px Bangers, sans-serif', '#fff');
}
function drawCafe(c) {
  const aw = () => { c.beginPath(); c.moveTo(-68, -42); c.lineTo(68, -42); c.lineTo(80, -12); for (let x = 80; x > -80; x -= 16) c.quadraticCurveTo(x - 8, -2, x - 16, -12); c.closePath(); };
  comicShape(c, aw, '#fff');
  c.save(); aw(); c.clip(); c.fillStyle = '#e0383e'; for (let x = -80; x < 80; x += 32) c.fillRect(x, -45, 16, 45); c.restore();
  aw(); c.lineWidth = 3; c.strokeStyle = '#111'; c.stroke();
  comicShape(c, () => rr(c, -66, -6, 132, 46, 4), '#1d5a45');
  txt(c, 'CAFÉ', 0, 14, '34px Bangers, sans-serif', '#ffd34d');
  txt(c, '· DEPUIS 1898 ·', 0, 33, '10px Bangers, sans-serif', '#f6e7c1');
}
function drawBubble(c) {
  const p = () => { c.beginPath(); c.ellipse(0, -6, 72, 28, 0, rad(78), rad(60) + Math.PI * 2); c.lineTo(46, 33); c.closePath(); };
  comicShape(c, p, '#fff');
  txt(c, 'BONJOUR !', 0, -5, '28px Bangers, sans-serif', '#111');
}
function drawLamp(c) {
  const G = '#2c4a3b';
  comicShape(c, () => { c.beginPath(); c.moveTo(-14, 75); c.lineTo(14, 75); c.lineTo(9, 60); c.lineTo(4, 58); c.lineTo(3, -40); c.lineTo(-3, -40); c.lineTo(-4, 58); c.lineTo(-9, 60); c.closePath(); }, G);
  comicShape(c, () => { c.beginPath(); c.moveTo(-12, -68); c.lineTo(12, -68); c.lineTo(8, -42); c.lineTo(-8, -42); c.closePath(); }, '#ffe27a');
  comicShape(c, () => { c.beginPath(); c.moveTo(-16, -68); c.lineTo(16, -68); c.lineTo(0, -77); c.closePath(); }, G, 3, false);
  c.strokeStyle = '#111'; c.lineWidth = 2;
  [[-26,-60,-18,-58],[26,-60,18,-58],[-23,-47,-15,-50],[23,-47,15,-50]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); });
  c.fillStyle = G; c.lineWidth = 2; c.fillRect(-6, -42, 12, 5); c.strokeRect(-6, -42, 12, 5); c.fillRect(-6, 20, 12, 5); c.strokeRect(-6, 20, 12, 5);
}
function drawPoster(c) {
  comicShape(c, () => rr(c, -50, -60, 100, 120, 2), '#f6ecd2');
  c.save(); rr(c, -43, -53, 86, 82, 1); c.clip();
  c.fillStyle = '#22305e'; c.fillRect(-45, -55, 90, 90);
  c.fillStyle = '#ff7a59'; c.beginPath(); c.arc(0, 10, 26, Math.PI, 0); c.fill();
  c.strokeStyle = '#ffb27a'; c.lineWidth = 3;
  for (let i = 0; i < 7; i++) { const a = Math.PI + (i + 0.5) * Math.PI / 7; c.beginPath(); c.moveTo(Math.cos(a) * 32, 10 + Math.sin(a) * 32); c.lineTo(Math.cos(a) * 46, 10 + Math.sin(a) * 46); c.stroke(); }
  c.fillStyle = '#3e6fb0'; c.fillRect(-45, 10, 90, 20);
  c.strokeStyle = '#bfe0ff'; c.lineWidth = 2;
  for (let y = 15; y < 30; y += 6) { c.beginPath(); c.moveTo(-45, y); for (let x = -45; x <= 45; x += 10) { c.quadraticCurveTo(x + 2.5, y - 3, x + 5, y); c.quadraticCurveTo(x + 7.5, y + 3, x + 10, y); } c.stroke(); }
  c.restore();
  c.lineWidth = 2.5; c.strokeStyle = '#111'; rr(c, -43, -53, 86, 82, 1); c.stroke();
  txt(c, 'PARIS', 0, 44, '30px Bangers, sans-serif', '#c0392b');
  c.fillStyle = 'rgba(255,240,170,.85)';
  [[-50, -60], [50, -60]].forEach(([x, y]) => { c.save(); c.translate(x, y); c.rotate(x < 0 ? -0.6 : 0.6); c.fillRect(-12, -5, 24, 10); c.restore(); });
}
function drawMona(c) {
  comicShape(c, () => rr(c, -40, -50, 80, 100, 3), '#d9a632');
  c.lineWidth = 2; c.strokeStyle = '#111'; c.fillStyle = '#a87b17'; rr(c, -32, -42, 64, 84, 2); c.fill(); c.stroke();
  c.save(); rr(c, -28, -38, 56, 76, 1); c.clip();
  const g = c.createLinearGradient(0, -38, 0, 38); g.addColorStop(0, '#8fa070'); g.addColorStop(1, '#4d5a35'); c.fillStyle = g; c.fillRect(-30, -40, 60, 80);
  c.fillStyle = '#2e2016'; c.beginPath(); c.ellipse(0, -12, 15, 19, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.moveTo(-26, 40); c.quadraticCurveTo(-24, 6, 0, 4); c.quadraticCurveTo(24, 6, 26, 40); c.closePath(); c.fill();
  c.fillStyle = '#e7bd86'; c.beginPath(); c.ellipse(0, -12, 10, 13, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.moveTo(-8, 8); c.lineTo(8, 8); c.lineTo(0, 18); c.closePath(); c.fill();
  c.beginPath(); c.ellipse(-4, 30, 9, 4, 0.2, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#111'; c.lineWidth = 1.3; c.beginPath(); c.ellipse(0, -12, 10, 13, 0, 0, Math.PI * 2); c.stroke();
  c.beginPath(); c.moveTo(-3.5, -5); c.quadraticCurveTo(0, -3.5, 3.5, -5); c.stroke();
  c.fillStyle = '#111'; c.fillRect(-5, -15, 2.4, 1.6); c.fillRect(2.6, -15, 2.4, 1.6);
  c.restore();
}

/* ===== shared comic helpers for stages 2-10 ===== */
const INK = '#111';
const HASCJK = /[⺀-鿿가-힯＀-￯]/;
// Bangers for Latin lettering, a heavy Chinese face for Chinese.
const cfont = (px, s) => HASCJK.test(s) ? `900 ${Math.round(px * 0.8)}px "Noto Sans TC", sans-serif` : `${px}px Bangers, "Noto Sans TC", sans-serif`;
function say(c, s, x, y, px, col, maxW, align = 'center') { c.font = cfont(px, s); c.fillStyle = col; c.textAlign = align; c.textBaseline = 'middle'; c.fillText(s, x, y, maxW || 999); }
function sayF(c, s, x, y, font, col, maxW, align = 'center') { c.font = font; c.fillStyle = col; c.textAlign = align; c.textBaseline = 'middle'; c.fillText(s, x, y, maxW || 999); }
function inkS(c, lw = 2.5, col = INK) { c.lineWidth = lw; c.strokeStyle = col; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke(); }
function fs(c, fill, lw = 2.5) { c.fillStyle = fill; c.fill(); inkS(c, lw); }
function lines(c, s, col, lw) { c.beginPath(); for (let i = 0; i < s.length; i += 4) { c.moveTo(s[i], s[i + 1]); c.lineTo(s[i + 2], s[i + 3]); } inkS(c, lw, col); }
function dots(c, x0, y0, x1, y1, st, rf, col) {
  c.fillStyle = col; c.beginPath();
  for (let y = y0, row = 0; y <= y1; y += st, row++) for (let x = x0 + (row % 2) * st / 2; x <= x1; x += st) { const r = rf(x, y); if (r > 0.25) { c.moveTo(x + r, y); c.arc(x, y, r, 0, Math.PI * 2); } }
  c.fill();
}
const h01 = i => { const v = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return v - Math.floor(v); };
function bean(c, x, y, r, t) {
  if ((t % 3.9) < 0.12) { c.beginPath(); c.moveTo(x - r, y); c.lineTo(x + r, y); inkS(c, 1.6); return; }
  circ(c, x, y, r, INK); circ(c, x + r * 0.35, y - r * 0.38, r * 0.42, '#fff');
}
function blush(c, x, y, r = 4) { ell(c, x, y, r, r * 0.6, 'rgba(255,105,130,.55)'); }
function rectsInk(c, list, fill, lw = 1.5) { c.beginPath(); for (const [x, y, w, h] of list) c.rect(x, y, w, h); c.fillStyle = fill; c.fill(); inkS(c, lw); }
function panelStart(c, paper = '#fff3d9') { c.fillStyle = paper; c.fillRect(0, 0, W, H); c.save(); c.beginPath(); c.rect(8, 8, W - 16, H - 16); c.clip(); }
function caption(c, s, x, y, fill = '#ffe14d', right = false) {
  const f = '700 14px "Noto Sans TC", sans-serif'; c.font = f;
  const w = Math.ceil(c.measureText(s).width) + 22, x0 = right ? x - w : x;
  rr(c, x0, y, w, 30, 2); c.fillStyle = fill; c.fill(); c.lineWidth = 2.5; c.strokeStyle = INK; c.stroke();
  txt(c, s, x0 + 11, y + 15.5, f, INK, 'left');
}
function panelEnd(c, cap) { c.restore(); c.lineWidth = 5; c.strokeStyle = INK; c.strokeRect(8, 8, W - 16, H - 16); if (cap) caption(c, cap, 14, 14); }
function bubblePath(c, cx, cy, rx, ry, a0, a1, tx, ty) { c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, rad(a0), rad(a1) + Math.PI * 2); c.lineTo(tx, ty); c.closePath(); }
// A row of lit windows on a building, batched into one fill and one stroke.
function winGrid(c, x, y, cols, rows, w, h, gx, gy, fill, lw = 1.5) { const l = []; for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) l.push([x + i * gx, y + j * gy, w, h]); rectsInk(c, l, fill, lw); }

/* ===== sounds for this world ===== */
const { q, note } = QS;
defineCreatureSound('comic_rat', (ac, o, t) => [0, 0.11, 0.22].forEach((d, k) => q(ac, o, t + d, [[0, 2500 + k * 160], [0.04, 3000 + k * 160], [0.09, 2650]], 0.09, { vol: 0.34 })));
defineCreatureSound('comic_pigeon', (ac, o, t) => { q(ac, o, t, [[0, 520], [0.12, 650], [0.3, 560]], 0.3, { trem: [18, 0.45], vol: 0.42 }); q(ac, o, t + 0.36, [[0, 580], [0.14, 700], [0.32, 600]], 0.32, { trem: [18, 0.45], vol: 0.4 }); });
defineCreatureSound('comic_shiba', (ac, o, t) => { q(ac, o, t, [[0, 700], [0.05, 1100], [0.16, 820]], 0.17, { vol: 0.44, over: 0.25 }); q(ac, o, t + 0.22, [[0, 820], [0.05, 1260], [0.18, 900]], 0.19, { vol: 0.44, over: 0.25 }); });
defineCreatureSound('comic_duck', (ac, o, t) => [0, 0.17].forEach((d) => q(ac, o, t + d, [[0, 760], [0.04, 920], [0.13, 640]], 0.14, { trem: [38, 0.4], vol: 0.42, over: 0.35 })));
defineCreatureSound('comic_cat', (ac, o, t) => q(ac, o, t, [[0, 820], [0.1, 1280], [0.36, 900]], 0.38, { vib: [7, 18], vol: 0.4 }));
defineCreatureSound('comic_dackel', (ac, o, t) => [0, 0.2].forEach((d, k) => q(ac, o, t + d, [[0, 560 + k * 70], [0.04, 840 + k * 70], [0.14, 620]], 0.15, { vol: 0.45, over: 0.3 })));
defineCreatureSound('comic_magpie', (ac, o, t) => [0, 0.12, 0.24].forEach((d, k) => q(ac, o, t + d, [[0, 1500 + k * 60], [0.03, 1950 + k * 60], [0.08, 1550]], 0.08, { trem: [55, 0.4], vol: 0.36 })));
defineCreatureSound('comic_parrot', (ac, o, t) => { q(ac, o, t, [[0, 900], [0.08, 1500], [0.18, 1100]], 0.2, { vib: [16, 40], vol: 0.4 }); q(ac, o, t + 0.26, [[0, 1200], [0.1, 1800], [0.3, 1300]], 0.32, { vib: [14, 50], vol: 0.4 }); });
defineCreatureSound('comic_gecko', (ac, o, t) => { q(ac, o, t, [[0, 640], [0.07, 860], [0.14, 720]], 0.15, { vol: 0.42, over: 0.3 }); q(ac, o, t + 0.24, [[0, 600], [0.12, 470], [0.3, 520]], 0.3, { vol: 0.42, over: 0.3 }); });
defineThingSound('comic_horn', (ac, o, t, r) => [0, 0.14].forEach((d) => q(ac, o, t + d, [[0, 700 * r], [0.09, 760 * r]], 0.1, { vol: 0.36, over: 0.4 })));
defineThingSound('comic_chime', (ac, o, t, r) => { note(ac, o, t, 1319 * r, 0.3, 0.3); note(ac, o, t + 0.22, 1047 * r, 0.42, 0.3); });
defineThingSound('comic_ding', (ac, o, t, r) => { note(ac, o, t, 1760 * r, 0.22, 0.3); note(ac, o, t + 0.16, 1760 * r, 0.36, 0.3); });
defineThingSound('comic_piyo', (ac, o, t, r) => [0, 0.16].forEach((d) => q(ac, o, t + d, [[0, 2100 * r], [0.04, 2800 * r], [0.1, 2350 * r]], 0.1, { vol: 0.32 })));
defineThingSound('comic_bongo', (ac, o, t, r) => [0, 0.11].forEach((d, k) => q(ac, o, t + d, [[0, (440 + k * 130) * r], [0.08, (350 + k * 100) * r]], 0.12, { attack: 0.002, hold: 0.08, vol: 0.45, over: 0.2 })));

/* ===== Stage 2: NYC subway ===== */
function bgSubway(c) {
  panelStart(c);
  c.fillStyle = '#f3efe3'; c.fillRect(8, 8, W - 16, 210);
  c.beginPath();
  for (let y = 17; y < 218; y += 9) { c.moveTo(8, y); c.lineTo(W - 8, y); }
  for (let y = 8, r = 0; y < 218; y += 9, r++) for (let x = 8 + (r % 2) * 9; x < W; x += 18) { c.moveTo(x, y); c.lineTo(x, y + 9); }
  inkS(c, 1, 'rgba(17,17,17,.13)');
  dots(c, 10, 140, W - 10, 216, 6, (x, y) => (y - 140) / 76 * 2.4, 'rgba(110,100,80,.3)');
  [[52, '#2f6b4f', '#ffd34d'], [190, '#8b2e2e', '#f3c86b']].forEach(([y, a, b]) => {
    c.fillStyle = a; c.fillRect(8, y, W - 16, 12);
    c.fillStyle = b; c.beginPath(); for (let x = 16; x < W - 8; x += 16) { c.moveTo(x, y + 2); c.lineTo(x + 4, y + 6); c.lineTo(x, y + 10); c.lineTo(x - 4, y + 6); c.closePath(); } c.fill();
    lines(c, [8, y, W - 8, y, 8, y + 12, W - 8, y + 12], INK, 2);
  });
  c.fillStyle = '#272a37'; c.fillRect(8, 214, W - 16, 120);
  dots(c, 10, 220, W - 10, 330, 7, () => 1.5, 'rgba(255,255,255,.07)');
  lines(c, [8, 214, W - 8, 214], INK, 3);
  c.fillStyle = '#9aa0ad'; c.fillRect(8, 318, W - 16, 4); c.fillRect(8, 326, W - 16, 3);
  c.fillStyle = '#ffd23f'; c.fillRect(8, 334, W - 16, 14);
  dots(c, 12, 337, W - 10, 346, 5, () => 1.1, 'rgba(17,17,17,.35)');
  c.fillStyle = '#cfc8b8'; c.fillRect(8, 348, W - 16, 124);
  const seg = []; for (let k = 0, y = 358; y < 472; k++, y += 9 + k * 4) seg.push(8, y, W - 8, y);
  for (let x = -420; x <= 780; x += 60) seg.push(180 + (x - 180) * 0.14, 348, x, 472);
  lines(c, seg, 'rgba(17,17,17,.17)', 1.2);
  dots(c, 10, 440, W - 10, 470, 6, (x, y) => (y - 440) / 30 * 1.6, 'rgba(90,80,60,.25)');
  lines(c, [8, 334, W - 8, 334, 8, 348, W - 8, 348], INK, 2.5);
  // a wooden bench, and the pizza box the rat raided
  c.fillStyle = '#3a3d48'; c.fillRect(30, 432, 6, 26); c.fillRect(112, 432, 6, 26);
  rr(c, 22, 404, 104, 10, 3); fs(c, '#b5773e', 2.2); rr(c, 22, 418, 104, 10, 3); fs(c, '#b5773e', 2.2);
  rr(c, 18, 430, 112, 8, 3); fs(c, '#a0652f', 2.2);
  c.beginPath(); c.moveTo(48, 428); c.lineTo(100, 428); c.lineTo(104, 418); c.lineTo(52, 418); c.closePath(); fs(c, '#e8c38d', 2);
  c.beginPath(); c.moveTo(52, 418); c.lineTo(104, 418); c.lineTo(98, 394); c.lineTo(58, 394); c.closePath(); fs(c, '#f1d3a1', 2);
  c.beginPath(); c.moveTo(54, 425); c.lineTo(76, 425); c.lineTo(66, 419); c.closePath(); fs(c, '#ffcf3f', 1.4);
  say(c, 'PIZZA', 78, 406, 11, '#c0392b', 34);
  panelEnd(c, T('與此同時，在紐約地底下……', 'Meanwhile, under New York…'));
}
function drawStation(c) {
  lines(c, [-70, -19, -70, -26, 70, -19, 70, -26], INK, 3);
  comicShape(c, () => rr(c, -104, -19, 208, 42, 3), '#151515', 2.5);
  c.fillStyle = '#fff'; c.fillRect(-97, -13, 194, 1.6);
  sayF(c, 'Times Sq–42 St', -94, 4, 'bold 17px "Helvetica Neue", Helvetica, Arial, sans-serif', '#fff', 124, 'left');
  rr(c, 38, -8, 60, 24, 3); c.fillStyle = '#fff'; c.fill();
  sayF(c, T('↑ 上城', '↑ Uptown'), 68, 4.5, 'bold 11px Arial, "Noto Sans TC", sans-serif', INK, 54);
}
function drawTrain(c) {
  [-98, 98].forEach(x => { rr(c, x - 36, 38, 72, 13, 4); fs(c, '#3a3d48', 2); });
  c.beginPath(); [-120, -76, 76, 120].forEach(x => { c.moveTo(x + 8, 50); c.arc(x, 50, 8, 0, Math.PI * 2); }); fs(c, '#5b5f70', 2);
  comicShape(c, () => rr(c, -148, -56, 296, 98, 12), '#c8cdd6');
  const s = []; for (let x = -140; x < 146; x += 7) s.push(x, 14, x, 38); lines(c, s, 'rgba(17,17,17,.16)', 1);
  c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(-138, -50, 276, 5);
  c.fillStyle = '#6d3fa0'; c.fillRect(-147, 4, 294, 6);
  const wins = [[-56, 32], [-16, 32], [24, 32], [108, 32]];
  rectsInk(c, wins.map(([x, w]) => [x, -38, w, 30]), '#3d5378', 2);
  // passengers: round heads, one with a newspaper
  c.fillStyle = '#1f2a40'; c.beginPath(); [[-40, -16, 8], [8, -18, 9], [124, -15, 8]].forEach(([x, y, r]) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, Math.PI * 2); c.rect(x - r - 2, y + r - 2, r * 2 + 4, 12); }); c.fill();
  rr(c, 28, -30, 22, 20, 1); fs(c, '#f4f1e8', 1.4); lines(c, [32, -24, 46, -24, 32, -19, 46, -19, 32, -14, 42, -14], '#888', 1);
  lines(c, wins.flatMap(([x]) => [x + 4, -12, x + 14, -34]), 'rgba(255,255,255,.45)', 3);
  [-80, 80].forEach(x => { rr(c, x - 20, -46, 40, 86, 3); fs(c, '#b9bfca', 2.5); rectsInk(c, [[x - 16, -38, 13, 30], [x + 3, -38, 13, 30]], '#3d5378', 1.6); lines(c, [x, -46, x, 40], INK, 2); });
  rr(c, -142, -42, 34, 38, 4); fs(c, '#2c3346', 2);
  c.fillStyle = '#151515'; c.fillRect(-139, -32, 28, 14);
  sayF(c, 'UPTOWN', -125, -24.5, 'bold 8px "JetBrains Mono", monospace', '#ffb43a', 26);
  c.fillStyle = '#fff3b0'; c.fillRect(-136, -12, 22, 4);
}
function drawDoorsBubble(c) {
  comicShape(c, () => bubblePath(c, 0, -6, 66, 26, 122, 100, -40, 33), '#fff');
  say(c, T('車門要關囉，', 'STAND CLEAR OF'), 0, -15, 17, INK, 112);
  say(c, T('請勿靠近！', 'THE CLOSING DOORS!'), 0, 3, 17, '#c0392b', 112);
}
function drawRat(c, a) {
  const k = Math.sin(a.t * 16) * a.live, tw = Math.sin(a.t * 4) * a.live;
  c.beginPath(); c.moveTo(-30, 12); c.bezierCurveTo(-42, 22, -46, 4 + tw * 4, -38, -8 + tw * 3);
  inkS(c, 5); inkS(c, 2.4, '#f2a2b1');
  c.beginPath(); c.ellipse(-22 + k, 24, 6, 3.5, 0, 0, Math.PI * 2); c.moveTo(4 - k, 24); c.ellipse(-2 - k, 24, 6, 3.5, 0, 0, Math.PI * 2); fs(c, '#f2a2b1', 1.8);
  comicShape(c, () => { c.beginPath(); c.ellipse(-14, 8, 20, 15, 0, 0, Math.PI * 2); }, '#a3a9b8', 2.5);
  ell(c, -11, 13, 11, 7, '#cdd1db');
  c.beginPath(); c.moveTo(-6, -8); c.quadraticCurveTo(10, -14, 20, 4); c.quadraticCurveTo(8, 13, -4, 12); c.quadraticCurveTo(-12, 2, -6, -8); c.closePath(); fs(c, '#a3a9b8', 2.5);
  c.beginPath(); c.arc(-7, -11, 8, 0, Math.PI * 2); fs(c, '#a3a9b8', 2.2); circ(c, -7, -11, 4.5, '#f4b3c0');
  bean(c, 6, -2, 2.6, a.t); blush(c, 7, 6, 3.2);
  circ(c, 20, 3, 3, '#f06a8a');
  lines(c, [14, 2, 7, -3, 14, 6, 7, 8], INK, 1);
  // the slice, crust gripped in its teeth
  c.beginPath(); c.moveTo(24, -22); c.lineTo(44, 6); c.lineTo(22, 24); c.closePath(); fs(c, '#ffcf3f', 2.5);
  c.beginPath(); c.moveTo(24, -22); c.lineTo(22, 24); inkS(c, 6, '#d58d45'); c.beginPath(); c.moveTo(24, -22); c.lineTo(22, 24); inkS(c, 1.5);
  c.beginPath(); [[31, -4, 3.4], [30, 11, 2.8], [38, 5, 2.4]].forEach(([x, y, r]) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, Math.PI * 2); }); c.fillStyle = '#d83b3b'; c.fill();
}

/* ===== Stage 3: Shibuya crossing ===== */
function bgShibuya(c) {
  panelStart(c);
  c.fillStyle = '#bfe6ff'; c.fillRect(8, 8, W - 16, 300);
  dots(c, 10, 10, W - 10, 300, 8, (x, y) => 0.6 + 2 * (1 - y / 300), '#93cff2');
  // towers
  const tw = [[8, 70, 120, '#e9e2d0'], [74, 64, 150, '#d6dbe6'], [134, 96, 90, '#f2d9c4'], [226, 60, 140, '#dfe8d6'], [282, 72, 104, '#e6d6ea']];
  tw.forEach(([x, w, top, col], i) => {
    c.fillStyle = col; c.fillRect(x, top, w, 320 - top); c.beginPath(); c.rect(x, top, w, 320 - top); inkS(c, 2.5);
    winGrid(c, x + 7, top + 10, Math.floor((w - 8) / 14), Math.floor((300 - top - 10) / 18), 8, 10, 14, 18, i % 2 ? '#7aa7d6' : '#8fb4c9', 1.2);
  });
  // a curved glass tower in the back with a little screen
  rr(c, 148, 60, 66, 36, 3); fs(c, '#30364a', 2.5); dots(c, 152, 64, 210, 92, 5, () => 1.3, '#ff7aa8');
  // store fronts
  c.fillStyle = '#383c4c'; c.fillRect(8, 300, W - 16, 20);
  c.beginPath(); c.rect(235, 262, 6, 74); fs(c, '#6a6f78', 1.5);
  [[20, '#ff6b6b'], [96, '#ffd34d'], [170, '#5cc8a7'], [250, '#7a8cff']].forEach(([x, f]) => { rr(c, x, 302, 60, 14, 2); fs(c, f, 1.5); });
  // road + scramble crossing
  c.fillStyle = '#4a4e5c'; c.fillRect(8, 320, W - 16, 152);
  lines(c, [8, 320, W - 8, 320], INK, 3);
  dots(c, 10, 324, W - 10, 470, 6, () => 1.1, 'rgba(255,255,255,.06)');
  c.fillStyle = '#f5f2ea';
  c.beginPath();
  for (let i = 0; i < 9; i++) { const x = 20 + i * 38; c.moveTo(x, 336); c.lineTo(x + 20, 336); c.lineTo(x + 24 + (x - 180) * 0.08, 362); c.lineTo(x + 2 + (x - 180) * 0.08, 362); c.closePath(); }
  for (let i = 0; i < 9; i++) { const y = 372 + i * 12; c.moveTo(150 + i * 22, y); c.lineTo(170 + i * 22, y - 3); c.lineTo(160 + i * 26 + 40, y + 6); c.lineTo(140 + i * 26 + 40, y + 9); c.closePath(); }
  c.fill();
  // little crowd silhouettes along the far kerb
  c.fillStyle = 'rgba(20,22,30,.7)'; c.beginPath();
  for (let i = 0; i < 16; i++) { const x = 18 + i * 21 + h01(i) * 8, hh = 14 + h01(i + 9) * 6; c.moveTo(x + 3.5, 334 - hh); c.arc(x, 334 - hh, 3.5, 0, Math.PI * 2); c.rect(x - 4, 334 - hh + 3, 8, hh - 3); }
  c.fill();
  panelEnd(c, T('與此同時，在澀谷十字路口……', 'Meanwhile, at Shibuya Crossing…'));
}
function drawScreen(c, a) {
  comicShape(c, () => rr(c, -74, -46, 148, 92, 4), '#2b2f3f');
  rr(c, -66, -38, 132, 70, 2); c.fillStyle = '#ffe9f2'; c.fill();
  dots(c, -62, -34, 62, 28, 7, () => 1.6, '#ffc1d8');
  // a round onigiri mascot with a sparkle
  c.beginPath(); c.moveTo(-30, 20); c.quadraticCurveTo(-34, -30, -4, -30); c.quadraticCurveTo(26, -30, 22, 20); c.closePath(); fs(c, '#fff', 2.2);
  c.fillStyle = '#1f3b2e'; c.fillRect(-18, 4, 28, 16); c.beginPath(); c.rect(-18, 4, 28, 16); inkS(c, 1.6);
  bean(c, -12, -8, 2.4, a.t + 1.3); bean(c, 4, -8, 2.4, a.t + 1.3); blush(c, -16, -1, 3); blush(c, 8, -1, 3);
  c.beginPath(); c.arc(-4, -4, 4, 0.2, Math.PI - 0.2); inkS(c, 1.5);
  say(c, LOCAL('おにぎり'), 46, -18, 13, '#e0457b', 42);
  say(c, T('新登場！', 'NEW!'), 46, 6, 20, '#111', 42);
  c.fillStyle = '#ffd34d'; c.beginPath(); c.moveTo(46, 18); c.lineTo(49, 24); c.lineTo(56, 25); c.lineTo(49, 28); c.lineTo(46, 34); c.lineTo(43, 28); c.lineTo(36, 25); c.lineTo(43, 24); c.closePath(); c.fill();
  lines(c, [-60, 40, 60, 40], '#555', 2);
  c.beginPath(); c.arc(-56, 40, 2, 0, Math.PI * 2); c.arc(-48, 40, 2, 0, Math.PI * 2); c.fillStyle = '#7dffb0'; c.fill();
}
function drawKanban(c) {
  comicShape(c, () => rr(c, -18, -68, 36, 136, 3), '#d93a35');
  rr(c, -13, -63, 26, 126, 2); inkS(c, 1.5, '#ffd9b0');
  ['ラ', '', 'メ', 'ン'].forEach((s, i) => s && sayF(c, LOCAL(s), 0, -44 + i * 29, '900 24px "Noto Sans TC", sans-serif', '#fff'));
  c.fillStyle = '#fff'; c.fillRect(-2, -26, 4, 20);
}
function drawHachi(c) {
  // stone plinth
  comicShape(c, () => rr(c, -36, 14, 72, 44, 3), '#b9b4a8');
  lines(c, [-30, 26, 30, 26], 'rgba(17,17,17,.25)', 1.2);
  rr(c, -25, 32, 50, 17, 1); fs(c, '#8f8a7f', 1.5);
  say(c, LOCAL('忠犬ハチ公'), 0, 41, 11, '#f3eee0', 44);
  // the bronze Akita, sitting up, facing right
  const B = '#86704c';
  c.beginPath(); c.arc(-24, -10, 7, 0.6, Math.PI * 1.9); inkS(c, 6, B); c.beginPath(); c.arc(-24, -10, 7, 0.6, Math.PI * 1.9); inkS(c, 1.3);
  c.beginPath(); c.ellipse(-12, 4, 16, 11, 0, 0, Math.PI * 2); fs(c, B, 2.5);
  c.beginPath(); c.ellipse(-2, -10, 12, 20, -0.3, 0, Math.PI * 2); fs(c, B, 2.5);
  c.beginPath(); c.rect(2, -4, 6, 18); c.rect(9, -4, 6, 18); fs(c, B, 2);
  c.beginPath(); c.ellipse(-22, 12, 9, 3, 0, 0, Math.PI * 2); fs(c, B, 2);
  c.beginPath(); c.ellipse(8, -32, 11, 9, 0, 0, Math.PI * 2); fs(c, B, 2.5);
  c.beginPath(); c.moveTo(12, -37); c.quadraticCurveTo(26, -35, 27, -28); c.quadraticCurveTo(20, -24, 12, -26); c.closePath(); fs(c, B, 2.2);
  circ(c, 26.5, -30.5, 2.3, INK);
  c.beginPath(); c.moveTo(-1, -37); c.lineTo(0, -50); c.lineTo(7, -40); c.closePath(); fs(c, B, 2);
  c.beginPath(); c.moveTo(7, -40); c.quadraticCurveTo(14, -48, 16, -40); fs(c, B, 2);
  circ(c, 12, -34, 1.9, INK);
  c.beginPath(); c.moveTo(-8, -22); c.quadraticCurveTo(-12, -8, -6, 2); inkS(c, 2.2, 'rgba(255,232,170,.5)');
}
function drawWalkSignal(c) {
  lines(c, [0, -46, 0, -52], INK, 4);
  comicShape(c, () => rr(c, -20, -46, 40, 92, 6), '#3a3f4e');
  rr(c, -15, -40, 30, 38, 4); fs(c, '#2b2122', 2); rr(c, -15, 2, 30, 38, 4); fs(c, '#132a24', 2);
  // red standing figure (dim) and blue-green walker (lit)
  c.fillStyle = '#6b2b2b'; c.beginPath(); c.arc(0, -32, 4, 0, Math.PI * 2); c.rect(-4, -27, 8, 14); c.rect(-4, -14, 3, 8); c.rect(1, -14, 3, 8); c.fill();
  ell(c, 0, 21, 13, 17, 'rgba(70,240,200,.22)');
  c.fillStyle = '#4ff0c8'; c.beginPath(); c.arc(1, 10, 4, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.moveTo(-1, 15); c.lineTo(3, 15); c.lineTo(4, 25); c.lineTo(9, 34); c.lineTo(6, 35); c.lineTo(1, 27); c.lineTo(-4, 35); c.lineTo(-7, 34); c.lineTo(-3, 24); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(0, 17); c.lineTo(-7, 24); c.moveTo(2, 17); c.lineTo(8, 22); inkS(c, 2.4, '#4ff0c8');
}
function drawShiba(c, a) {
  const wag = Math.sin(a.t * 9) * a.live, hop = Math.max(0, Math.sin(a.t * 3.2)) * a.live;
  c.save(); c.translate(0, -hop * 3);
  // curly tail
  c.save(); c.translate(-30, -8); c.rotate(wag * 0.35);
  c.beginPath(); c.arc(0, -6, 9, 0, Math.PI * 2); fs(c, '#e48a3c', 2.2); circ(c, 0, -6, 4, '#fff2e0'); c.restore();
  c.beginPath(); c.rect(-26, 10, 9, 20); c.rect(-12, 10, 9, 20); c.rect(8, 10, 9, 20); c.rect(20, 10, 9, 20); fs(c, '#e48a3c', 2);
  c.fillStyle = '#fff2e0'; c.fillRect(-25, 23, 7, 6); c.fillRect(-11, 23, 7, 6); c.fillRect(9, 23, 7, 6); c.fillRect(21, 23, 7, 6);
  comicShape(c, () => rr(c, -34, -12, 66, 30, 14), '#e48a3c', 2.5, false);
  ell(c, 2, 8, 18, 7, '#fff2e0');
  // head
  c.beginPath(); c.moveTo(14, -22); c.lineTo(18, -36); c.lineTo(27, -26); c.lineTo(36, -36); c.lineTo(40, -20); c.closePath(); fs(c, '#e48a3c', 2.2);
  c.beginPath(); c.ellipse(28, -14, 16, 14, 0, 0, Math.PI * 2); fs(c, '#e48a3c', 2.5);
  c.beginPath(); c.ellipse(30, -6, 12, 7, 0, 0, Math.PI * 2); c.fillStyle = '#fff2e0'; c.fill();
  bean(c, 23, -16, 2.3, a.t); bean(c, 35, -16, 2.3, a.t);
  circ(c, 30, -9, 2.4, INK); c.beginPath(); c.arc(27.5, -6, 2.6, 0.2, Math.PI - 0.4); c.moveTo(35, -6); c.arc(32.5, -6, 2.6, 0.4, Math.PI - 0.2); inkS(c, 1.2);
  blush(c, 19, -9, 3); blush(c, 41, -9, 3);
  c.fillStyle = '#d93a35'; c.fillRect(17, -3, 22, 4);
  c.restore();
}

/* ===== Stage 4: rainy London ===== */
function bgLondon(c) {
  panelStart(c);
  c.fillStyle = '#c3cbd6'; c.fillRect(8, 8, W - 16, 330);
  dots(c, 10, 10, W - 10, 330, 7, (x, y) => 0.6 + 2.2 * (1 - y / 330), '#a8b2c2');
  // Elizabeth Tower in the distance
  c.fillStyle = '#9d8f73';
  c.beginPath(); c.moveTo(300, 60); c.lineTo(308, 86); c.lineTo(292, 86); c.closePath(); c.rect(290, 86, 20, 30); c.rect(286, 116, 28, 210); fs(c, '#b8a57f', 2);
  c.beginPath(); c.arc(300, 101, 8, 0, Math.PI * 2); fs(c, '#f3ecd8', 1.6); lines(c, [300, 101, 300, 95, 300, 101, 304, 101], INK, 1.3);
  lines(c, [292, 140, 292, 320, 300, 140, 300, 320, 308, 140, 308, 320], 'rgba(17,17,17,.25)', 1);
  // terraced houses
  [[8, 92, 190, '#d9c7a8'], [100, 100, 176, '#cfae94'], [200, 82, 200, '#d6ccb8']].forEach(([x, w, top, col]) => {
    c.beginPath(); c.rect(x, top, w, 340 - top); fs(c, col, 2.5);
    winGrid(c, x + 10, top + 14, Math.floor((w - 12) / 26), 3, 16, 24, 26, 40, '#f7e7a6', 1.5);
    c.beginPath(); c.rect(x + 4, top - 6, 14, 8); c.rect(x + w - 22, top - 6, 14, 8); fs(c, '#8a5a44', 1.6);
  });
  // pavement and wet road
  c.fillStyle = '#6b7280'; c.fillRect(8, 338, W - 16, 134);
  c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); for (let i = 0; i < 9; i++) { const x = 20 + i * 38; c.rect(x, 352 + (i % 3) * 30, 18, 3); } c.fill();
  c.fillStyle = 'rgba(216,50,47,.22)'; c.fillRect(170, 378, 158, 26);
  c.fillStyle = '#9aa1ad'; c.fillRect(8, 334, W - 16, 10); lines(c, [8, 334, W - 8, 334, 8, 344, W - 8, 344], INK, 2.5);
  // puddles
  ell(c, 120, 452, 40, 7, 'rgba(195,215,235,.6)'); ell(c, 300, 400, 30, 5, 'rgba(195,215,235,.5)');
  // the street sign on a wall
  rr(c, 24, 240, 66, 22, 2); fs(c, '#fff', 2); say(c, LOCAL('WHITEHALL'), 52, 249, 11, INK, 44); say(c, LOCAL('SW1'), 80, 249, 10, '#d8322f', 14);
  // rain
  const s = []; for (let i = 0; i < 90; i++) { const x = h01(i) * 380 - 10, y = h01(i + 40) * 470; s.push(x, y, x - 4, y + 13); }
  lines(c, s, 'rgba(70,95,140,.5)', 1.4);
  panelEnd(c, T('與此同時，下雨的倫敦……', 'Meanwhile, in rainy London…'));
}
function drawPhoneBox(c) {
  const R = '#d8322f';
  // A plain street phone booth: flat roof, a PHONE sign and four big panes.
  comicShape(c, () => rr(c, -30, -66, 60, 138, 4), R);
  c.beginPath(); c.rect(-34, -72, 68, 8); fs(c, R, 2);
  c.beginPath(); c.rect(-34, 66, 68, 8); fs(c, R, 2);
  rr(c, -22, -60, 44, 11, 2); fs(c, '#f4f1e8', 1.5);
  sayF(c, 'PHONE', 0, -54, 'bold 8px Arial, sans-serif', INK, 36);
  rectsInk(c, [[-22, -44, 44, 96]], '#a9d8ef', 2);
  lines(c, [0, -44, 0, 52, -22, 4, 22, 4], R, 3);
  lines(c, [-16, -38, -8, -30, 6, -12, 14, -4], 'rgba(255,255,255,.6)', 2);
  circ(c, 0, -74, 3, '#ffe58a');
}
function drawLondonBus(c) {
  const R = '#d8322f';
  c.beginPath(); [-50, 52].forEach(x => { c.moveTo(x + 12, 46); c.arc(x, 46, 12, 0, Math.PI * 2); }); fs(c, '#2b2b33', 2.5);
  comicShape(c, () => rr(c, -84, -58, 168, 104, 9), R);
  rectsInk(c, [[-76, -48, 30, 26], [-42, -48, 30, 26], [-8, -48, 30, 26], [26, -48, 50, 26], [-60, -4, 28, 26], [-26, -4, 28, 26], [8, -4, 28, 26]], '#f6e7b3', 2);
  rr(c, 44, -4, 32, 44, 2); fs(c, '#a9d8ef', 2);
  rr(c, -78, -4, 14, 44, 2); fs(c, '#3b3f4a', 2);
  c.fillStyle = '#f5c518'; c.fillRect(-84, 30, 168, 4);
  rr(c, -40, -70, 80, 13, 2); fs(c, '#151515', 2);
  sayF(c, LOCAL('11  WESTMINSTER'), 0, -63, 'bold 9px Arial, sans-serif', '#ffd34d', 72);
  lines(c, [-70, -42, -60, -28, 30, -42, 42, -26], 'rgba(255,255,255,.55)', 2);
  c.beginPath(); [-50, 52].forEach(x => { c.moveTo(x + 5, 46); c.arc(x, 46, 5, 0, Math.PI * 2); }); fs(c, '#c9ced6', 1.5);
}
function drawDuck(c, a) {
  const w = Math.sin(a.t * 6) * a.live;
  c.save(); c.translate(0, 6); c.rotate(w * 0.07);
  // umbrella behind the head, held in one wing
  lines(c, [-12, -30, -12, 8], INK, 2.2);
  c.beginPath(); c.moveTo(-40, -30); c.quadraticCurveTo(-12, -60, 16, -30); c.quadraticCurveTo(9, -35, 2, -30); c.quadraticCurveTo(-5, -35, -12, -30); c.quadraticCurveTo(-19, -35, -26, -30); c.quadraticCurveTo(-33, -35, -40, -30); fs(c, '#3a7bd5', 2.2);
  lines(c, [-12, -46, -12, -50], INK, 2);
  c.beginPath(); c.ellipse(-8, 30, 8, 3.5, 0, 0, Math.PI * 2); c.moveTo(18, 30); c.ellipse(10, 30, 8, 3.5, 0, 0, Math.PI * 2); fs(c, '#f39a2b', 1.8);
  // yellow raincoat body
  comicShape(c, () => { c.beginPath(); c.moveTo(-22, 26); c.quadraticCurveTo(-26, 0, -10, -6); c.lineTo(14, -6); c.quadraticCurveTo(28, 4, 24, 26); c.closePath(); }, '#ffd23f', 2.5, false);
  lines(c, [1, -4, 1, 24], INK, 1.5); c.beginPath(); c.arc(4, 4, 1.5, 0, 7); c.arc(4, 14, 1.5, 0, 7); c.fillStyle = INK; c.fill();
  c.beginPath(); c.ellipse(-16, 6, 6, 10, 0.5, 0, Math.PI * 2); fs(c, '#ffd23f', 2);
  // head
  c.beginPath(); c.arc(4, -16, 12, 0, Math.PI * 2); fs(c, '#fffaf0', 2.5);
  c.beginPath(); c.moveTo(13, -17); c.quadraticCurveTo(28, -19, 27, -12); c.quadraticCurveTo(21, -8, 13, -11); c.closePath(); fs(c, '#f39a2b', 2);
  bean(c, 8, -19, 2.3, a.t); blush(c, 8, -11, 3);
  c.restore();
}
function drawBunting(c, flip) {
  const s = flip ? -1 : 1;
  c.beginPath(); c.moveTo(-72 * s, -14); c.quadraticCurveTo(0, 6, 72 * s, -6); inkS(c, 2);
  const cols = ['#d8322f', '#fff', '#1f4fa0', '#fff', '#d8322f'];
  for (let i = 0; i < 5; i++) {
    const x = (-58 + i * 29) * s, y = -10 + Math.sin((i + 0.5) / 5 * Math.PI) * 9 * 0.9;
    c.beginPath(); c.moveTo(x - 10, y); c.lineTo(x + 10, y); c.lineTo(x, y + 20); c.closePath(); fs(c, cols[i], 2);
  }
}
const drawBuntL = c => drawBunting(c, false), drawBuntR = c => drawBunting(c, true);

defineCreatureSound('comic_toucan', (ac, o, t) => [0, 0.1, 0.2].forEach((d, k) => q(ac, o, t + d, [[0, 820 - k * 40], [0.05, 1050 - k * 40], [0.09, 860]], 0.09, { trem: [48, 0.5], vol: 0.4, over: 0.3 })));

/* ===== Stage 5: Hong Kong neon ===== */
function neonText(c, s, x, y, font, col, maxW) {
  c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.strokeStyle = col;
  c.globalAlpha = 0.35; c.lineWidth = 6; c.strokeText(s, x, y, maxW); c.globalAlpha = 1; c.lineWidth = 2.4; c.strokeText(s, x, y, maxW);
  c.fillStyle = '#fff'; c.fillText(s, x, y, maxW);
}
function neonLine(c, col) { c.globalAlpha = 0.35; inkS(c, 7, col); c.globalAlpha = 1; inkS(c, 3, col); inkS(c, 1.1, '#fff'); }
function bgHK(c) {
  panelStart(c);
  c.fillStyle = '#1b1a3a'; c.fillRect(8, 8, W - 16, 340);
  dots(c, 10, 10, W - 10, 340, 8, (x, y) => 0.4 + 1.8 * (y / 340), '#2c2a5c');
  circ(c, 196, 54, 14, '#fff3c4'); circ(c, 202, 50, 12, '#1b1a3a');
  [[8, 64, 52, '#3d3a6e'], [68, 50, 96, '#4b3f6e'], [114, 76, 120, '#3a4a6e'], [188, 46, 92, '#47406a'], [232, 58, 60, '#3b3d68'], [286, 70, 40, '#4a3a62']].forEach(([x, w, top, col], i) => {
    c.beginPath(); c.rect(x, top, w, 350 - top); fs(c, col, 2);
    const lit = [], dk = [];
    for (let y = top + 8; y < 296; y += 13) for (let xx = x + 6; xx < x + w - 8; xx += 11) (h01(xx * 7 + y * 3) > 0.45 ? lit : dk).push([xx, y, 7, 7]);
    c.fillStyle = '#ffd36b'; c.beginPath(); lit.forEach(r => c.rect(r[0], r[1], r[2], r[3])); c.fill();
    c.fillStyle = '#25234a'; c.beginPath(); dk.forEach(r => c.rect(r[0], r[1], r[2], r[3])); c.fill();
    c.fillStyle = '#c9c6d8'; c.beginPath(); for (let y = top + 22; y < 290; y += 39) c.rect(x + w - 14 - (i % 2) * 22, y, 11, 7); c.fill();
  });
  // bamboo laundry poles with washing
  lines(c, [186, 168, 232, 160, 232, 230, 288, 226], '#c8a46a', 2);
  [[194, 168, '#ff7a9a'], [208, 166, '#7ad1ff'], [220, 164, '#fff'], [244, 229, '#ffd34d'], [262, 227, '#9b7aff']].forEach(([x, y, f]) => { c.beginPath(); c.rect(x, y, 9, 14); fs(c, f, 1.2); });
  // the steel frame that both signs hang from, and the pawnshop bracket
  lines(c, [12, 72, 190, 72, 40, 72, 40, 80, 180, 72, 180, 80, 70, 140, 70, 160, 150, 140, 150, 160, 286, 58, 248, 58, 285, 58, 285, 64], '#9a98b8', 3);
  // shopfronts
  c.fillStyle = '#2a2440'; c.fillRect(8, 300, W - 16, 50);
  [[14, '#ff5d8f'], [84, '#ffd34d'], [154, '#4fe3c1'], [224, '#ff8a3d'], [294, '#8f7bff']].forEach(([x, f]) => { c.fillStyle = f; c.globalAlpha = 0.85; c.fillRect(x, 306, 54, 30); c.globalAlpha = 1; c.beginPath(); c.rect(x, 306, 54, 30); inkS(c, 2); });
  const sh = []; for (let x = 14; x < 350; x += 70) for (let y = 310; y < 336; y += 5) sh.push(x, y, x + 54, y); lines(c, sh, 'rgba(17,17,17,.3)', 1);
  // street, tram tracks and neon reflections
  c.fillStyle = '#211f36'; c.fillRect(8, 348, W - 16, 124);
  [[40, '#ff5d8f'], [110, '#4fe3c1'], [190, '#ffd34d'], [270, '#8f7bff'], [330, '#ff8a3d']].forEach(([x, f]) => { c.fillStyle = f; c.globalAlpha = 0.18; c.fillRect(x - 10, 352, 20, 116); c.globalAlpha = 1; });
  lines(c, [8, 372, W - 8, 372, 8, 380, W - 8, 380], '#8d8aa8', 2);
  dots(c, 10, 390, W - 10, 470, 7, () => 1.1, 'rgba(255,255,255,.07)');
  lines(c, [8, 348, W - 8, 348], INK, 3);
  panelEnd(c, T('與此同時，在香港……', 'Meanwhile, in Hong Kong…'));
}
function drawTeaSign(c) {
  comicShape(c, () => rr(c, -73, -27, 146, 54, 5), '#2a1236');
  rr(c, -66, -20, 132, 40, 4); neonLine(c, '#ff4fa0');
  neonText(c, LOCAL('茶餐廳'), 0, -3, '900 25px "Noto Sans TC", sans-serif', '#3fe0ff', 118);
  sayF(c, LOCAL('CHA CHAAN TENG'), 0, 14, 'bold 8px Arial, sans-serif', '#ffd34d', 110);
}
function drawNoodleSign(c) {
  comicShape(c, () => rr(c, -58, -26, 116, 52, 5), '#0f2a2a');
  c.beginPath(); c.moveTo(-48, -2); c.lineTo(-14, -2); c.quadraticCurveTo(-16, 16, -31, 16); c.quadraticCurveTo(-46, 16, -48, -2); neonLine(c, '#ffd34d');
  c.beginPath(); c.moveTo(-34, -6); c.lineTo(-20, -20); c.moveTo(-28, -6); c.lineTo(-14, -18); neonLine(c, '#ff8a3d');
  neonText(c, LOCAL('粥麵'), 24, 0, '900 26px "Noto Sans TC", sans-serif', '#5dff9a', 66);
}
function drawPawn(c) {
  comicShape(c, () => rr(c, -38, -52, 76, 104, 5), '#2a0f18');
  // the bat, upside down, holding the coin
  c.beginPath(); c.moveTo(0, -44); c.quadraticCurveTo(-14, -46, -30, -36); c.quadraticCurveTo(-26, -30, -20, -30); c.quadraticCurveTo(-16, -24, -10, -26); c.quadraticCurveTo(-6, -20, 0, -22);
  c.quadraticCurveTo(6, -20, 10, -26); c.quadraticCurveTo(16, -24, 20, -30); c.quadraticCurveTo(26, -30, 30, -36); c.quadraticCurveTo(14, -46, 0, -44); neonLine(c, '#ff3d4f');
  c.beginPath(); c.arc(0, 12, 27, 0, Math.PI * 2); neonLine(c, '#ff3d4f');
  c.beginPath(); c.arc(0, 12, 21, 0, Math.PI * 2); neonLine(c, '#ffe0e0');
  neonText(c, LOCAL('押'), 0, 13, '900 26px "Noto Sans TC", sans-serif', '#ff3d4f', 40);
}
function drawTram(c) {
  const G = '#2f8a57';
  c.beginPath(); [-52, 52].forEach(x => { c.moveTo(x + 9, 46); c.arc(x, 46, 9, 0, Math.PI * 2); }); fs(c, '#2b2b33', 2.2);
  lines(c, [0, -52, 20, -58], INK, 2.5);
  comicShape(c, () => rr(c, -84, -50, 168, 96, 8), G);
  c.fillStyle = '#f2ead2'; c.fillRect(-82, -6, 164, 8); c.fillRect(-82, 34, 164, 6);
  rectsInk(c, [[-76, -40, 22, 24], [-50, -40, 22, 24], [-24, -40, 22, 24], [2, -40, 22, 24], [28, -40, 22, 24], [54, -40, 22, 24], [-60, 6, 22, 24], [-34, 6, 22, 24], [-8, 6, 22, 24], [18, 6, 22, 24]], '#ffe7a3', 1.8);
  rr(c, 46, 6, 30, 38, 2); fs(c, '#1f5f3c', 2); rr(c, -78, 6, 14, 38, 2); fs(c, '#1f5f3c', 2);
  c.fillStyle = '#151515'; c.fillRect(-36, -58, 72, 12); c.beginPath(); c.rect(-36, -58, 72, 12); inkS(c, 2);
  sayF(c, LOCAL('跑馬地 HAPPY VALLEY'), 0, -51.5, '700 8px "Noto Sans TC", Arial, sans-serif', '#ffd34d', 66);
  lines(c, [-72, -36, -62, -20, 6, -36, 16, -20], 'rgba(255,255,255,.5)', 2);
}
function drawTaxi(c) {
  const R = '#e0302e';
  c.beginPath(); [-40, 40].forEach(x => { c.moveTo(x + 11, 18); c.arc(x, 18, 11, 0, Math.PI * 2); }); fs(c, '#2b2b33', 2.2);
  c.beginPath(); [-40, 40].forEach(x => { c.moveTo(x + 4.5, 18); c.arc(x, 18, 4.5, 0, Math.PI * 2); }); fs(c, '#c9ced6', 1.4);
  comicShape(c, () => { c.beginPath(); c.moveTo(-64, 14); c.lineTo(-62, -4); c.lineTo(-36, -6); c.lineTo(-24, -24); c.lineTo(22, -24); c.lineTo(36, -6); c.lineTo(62, -2); c.lineTo(64, 14); c.closePath(); }, R);
  c.beginPath(); c.moveTo(-36, -6); c.lineTo(-24, -24); c.lineTo(22, -24); c.lineTo(36, -6); c.closePath(); fs(c, '#f1ece0', 2);
  c.beginPath(); c.moveTo(-30, -7); c.lineTo(-21, -20); c.lineTo(-2, -20); c.lineTo(-2, -7); c.closePath(); c.moveTo(2, -7); c.lineTo(2, -20); c.lineTo(19, -20); c.lineTo(29, -7); c.closePath(); fs(c, '#9fd3ef', 1.6);
  rr(c, -12, -32, 24, 9, 2); fs(c, '#fff', 1.8); sayF(c, 'TAXI', 0, -27.5, 'bold 7px Arial, sans-serif', R, 22);
  c.fillStyle = '#ffe58a'; c.fillRect(57, -1, 6, 5); lines(c, [-2, -6, -2, 12], INK, 1.4);
}
function drawShopCat(c, a) {
  const sw = Math.sin(a.t * 2.4) * a.live;
  c.beginPath(); c.moveTo(14, 22); c.quadraticCurveTo(34, 18 - sw * 4, 26 + sw * 4, -4); inkS(c, 7); inkS(c, 4, '#f3a24a');
  comicShape(c, () => { c.beginPath(); c.moveTo(-18, 26); c.quadraticCurveTo(-24, -4, -8, -8); c.lineTo(8, -8); c.quadraticCurveTo(24, -4, 18, 26); c.closePath(); }, '#f3a24a', 2.5);
  ell(c, 0, 12, 9, 12, '#fff6e6');
  lines(c, [-16, 6, -10, 8, -17, 14, -11, 15, 16, 6, 10, 8, 17, 14, 11, 15], '#c46a1c', 2);
  c.beginPath(); c.moveTo(-16, -16); c.lineTo(-14, -31); c.lineTo(-5, -22); c.lineTo(5, -22); c.lineTo(14, -31); c.lineTo(16, -16); c.quadraticCurveTo(18, -2, 0, -2); c.quadraticCurveTo(-18, -2, -16, -16); fs(c, '#f3a24a', 2.5);
  c.beginPath(); c.moveTo(-6, -24); c.lineTo(0, -15); c.lineTo(6, -24); c.closePath(); c.fillStyle = '#c46a1c'; c.fill();
  bean(c, -7, -13, 2.2, a.t); bean(c, 7, -13, 2.2, a.t); blush(c, -10, -7, 2.6); blush(c, 10, -7, 2.6);
  c.beginPath(); c.moveTo(-2, -8); c.lineTo(2, -8); c.lineTo(0, -6); c.closePath(); c.fillStyle = '#f06a8a'; c.fill();
  lines(c, [-12, -8, -22, -10, 12, -8, 22, -10], INK, 1);
  c.beginPath(); c.ellipse(-8, 26, 6, 3, 0, 0, Math.PI * 2); c.moveTo(14, 26); c.ellipse(8, 26, 6, 3, 0, 0, Math.PI * 2); fs(c, '#fff6e6', 1.8);
}

/* ===== Stage 6: Roman piazza ===== */
function bgRome(c) {
  panelStart(c);
  c.fillStyle = '#bfe3f6'; c.fillRect(8, 8, W - 16, 330);
  dots(c, 10, 10, W - 10, 330, 8, (x, y) => 0.6 + 2 * (1 - y / 330), '#95cdea');
  // the Colosseum at the end of the street
  c.beginPath(); c.moveTo(150, 330); c.lineTo(150, 214); c.quadraticCurveTo(210, 196, 270, 214); c.lineTo(270, 330); c.closePath(); fs(c, '#e8c896', 2.5);
  const arc = []; for (let r = 0; r < 3; r++) for (let x = 156; x < 264; x += 14) arc.push([x, 226 + r * 30]);
  c.beginPath(); arc.forEach(([x, y]) => { c.moveTo(x, y + 18); c.lineTo(x, y + 6); c.arc(x + 5, y + 6, 5, Math.PI, 0); c.lineTo(x + 10, y + 18); c.closePath(); }); fs(c, '#8f6a43', 1.2);
  lines(c, [150, 248, 270, 248, 150, 278, 270, 278, 150, 308, 270, 308], INK, 1.5);
  // left palazzo with the window
  c.beginPath(); c.rect(8, 36, 166, 304); fs(c, '#e7a650', 2.5);
  dots(c, 12, 40, 172, 336, 7, (x, y) => (x - 12) / 160 * 1.6, 'rgba(160,80,20,.22)');
  c.beginPath(); c.rect(4, 30, 176, 10); fs(c, '#d38a3c', 2.5);
  c.beginPath(); c.rect(74, 66, 52, 106); fs(c, '#fbf3e4', 2.5); c.beginPath(); c.rect(80, 72, 40, 94); fs(c, '#33456a', 2); lines(c, [100, 72, 100, 166, 80, 119, 120, 119], '#fbf3e4', 3);
  lines(c, [84, 80, 96, 100, 104, 124, 116, 144], 'rgba(255,255,255,.35)', 3);
  c.beginPath(); c.rect(70, 172, 60, 12); fs(c, '#8a5a32', 2);
  c.beginPath(); [[78, 168], [90, 166], [102, 168], [114, 166], [124, 168]].forEach(([x, y]) => { c.moveTo(x + 6, y); c.arc(x, y, 6, 0, Math.PI * 2); }); fs(c, '#e8423b', 1.5);
  rectsInk(c, [[22, 214, 56, 44], [102, 214, 56, 44]], '#fbf3e4', 2); rectsInk(c, [[28, 220, 44, 32], [108, 220, 44, 32]], '#33456a', 1.5);
  c.beginPath(); c.moveTo(40, 340); c.lineTo(40, 290); c.arc(66, 290, 26, Math.PI, 0); c.lineTo(92, 340); fs(c, '#6b4226', 2.5); lines(c, [66, 266, 66, 340], INK, 1.5);
  // right palazzo
  c.beginPath(); c.rect(246, 24, 106, 316); fs(c, '#d9744a', 2.5);
  dots(c, 250, 28, 350, 336, 7, (x, y) => 0.6 + (y - 28) / 300 * 1.2, 'rgba(120,40,20,.22)');
  c.beginPath(); c.rect(240, 18, 116, 10); fs(c, '#c45e36', 2.5);
  rectsInk(c, [[262, 140, 26, 40], [310, 140, 26, 40], [262, 260, 26, 40]], '#33456a', 2);
  lines(c, [252, 182, 346, 182, 256, 182, 256, 176, 342, 182, 342, 176], INK, 3);
  rr(c, 300, 262, 46, 78, 2); fs(c, '#f6d1dc', 2); rectsInk(c, [[306, 270, 34, 30]], '#fff5e8', 1.5);
  // sampietrini cobbles
  c.fillStyle = '#9e958a'; c.fillRect(8, 336, W - 16, 136);
  const cb = []; for (let k = 0, y = 344; y < 472; k++, y += 8 + k * 1.5) { cb.push(8, y, W - 8, y); for (let x = 8 + (k % 2) * 6; x < W; x += 12 + k * 1.5) cb.push(x, y, x, y + 8 + k * 1.5); }
  lines(c, cb, 'rgba(40,30,20,.28)', 1.2);
  c.beginPath(); c.ellipse(200, 450, 30, 9, 0, 0, Math.PI * 2); fs(c, '#6f6a62', 2); say(c, 'S·P·Q·R', 200, 450, 11, '#d8d2c4', 50);
  lines(c, [8, 336, W - 8, 336], INK, 3);
  // café table with an espresso
  c.beginPath(); c.ellipse(130, 370, 18, 5, 0, 0, Math.PI * 2); fs(c, '#f4f1ea', 2); lines(c, [130, 375, 130, 398, 120, 398, 140, 398], INK, 2.2);
  c.beginPath(); c.rect(125, 359, 8, 8); fs(c, '#fff', 1.4);
  panelEnd(c, T('與此同時，在羅馬……', 'Meanwhile, in Rome…'));
}
function drawShutter(c, flip) {
  const s = flip ? -1 : 1;
  comicShape(c, () => rr(c, -20, -48, 40, 96, 2), '#3f7a4a');
  c.beginPath(); c.rect(-15, -43, 30, 40); c.rect(-15, 3, 30, 40); inkS(c, 1.6);
  const l = []; for (let y = -38; y < -3; y += 5) l.push(-14, y, 14, y + 2); for (let y = 8; y < 43; y += 5) l.push(-14, y, 14, y + 2);
  lines(c, l, 'rgba(17,17,17,.45)', 1.3);
  c.beginPath(); [-34, 34].forEach(y => { c.moveTo(20 * s, y); c.arc(20 * s, y, 2.6, 0, Math.PI * 2); }); fs(c, '#2c2c2c', 1);
  c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(s > 0 ? -18 : 13, -46, 5, 92);
}
const drawShutL = c => drawShutter(c, false), drawShutR = c => drawShutter(c, true);
function drawPlaque(c) {
  comicShape(c, () => rr(c, -46, -23, 92, 46, 2), '#f3efe6');
  c.beginPath(); c.rect(-41, -18, 82, 36); inkS(c, 1.2);
  lines(c, [-38, -8, -20, 4, 18, -14, 34, 6], 'rgba(120,120,130,.25)', 1);
  sayF(c, LOCAL('PIAZZA'), 0, -7, '700 12px "Playfair Display", Georgia, serif', INK, 74);
  sayF(c, LOCAL('NAVONA'), 0, 8, '700 15px "Playfair Display", Georgia, serif', INK, 76);
}
function drawGelato(c) {
  lines(c, [-30, -38, -30, -22, 30, -38, 30, -22, -40, -38, 40, -38], INK, 2.2);
  comicShape(c, () => rr(c, -44, -22, 88, 46, 6), '#ffd1df');
  c.beginPath(); c.moveTo(-36, -6); c.lineTo(-20, -6); c.lineTo(-28, 18); c.closePath(); fs(c, '#e7a85a', 2);
  lines(c, [-33, -2, -24, 8, -22, -2, -31, 8], 'rgba(17,17,17,.4)', 1);
  c.beginPath(); c.arc(-28, -10, 8, Math.PI, 0); c.lineTo(-20, -6); c.lineTo(-36, -6); c.closePath(); fs(c, '#8fe0c0', 2);
  c.beginPath(); c.arc(-28, -17, 6, 0, Math.PI * 2); fs(c, '#ff8fb1', 2);
  say(c, LOCAL('GELATO'), 10, 2, 22, '#c0392b', 56);
}
function drawVespa(c) {
  const M = '#86d3bf';
  c.beginPath(); [-38, 44].forEach(x => { c.moveTo(x + 12, 30); c.arc(x, 30, 12, 0, Math.PI * 2); }); fs(c, '#2b2b33', 2.4);
  c.beginPath(); [-38, 44].forEach(x => { c.moveTo(x + 5, 30); c.arc(x, 30, 5, 0, Math.PI * 2); }); fs(c, '#d6dae2', 1.5);
  comicShape(c, () => { c.beginPath(); c.moveTo(-62, 22); c.quadraticCurveTo(-64, -14, -30, -14); c.lineTo(-6, -12); c.quadraticCurveTo(-4, 14, -2, 18); c.lineTo(28, 18); c.lineTo(30, -26); c.lineTo(40, -26); c.quadraticCurveTo(42, 4, 56, 22); c.lineTo(32, 22); c.lineTo(24, 26); c.lineTo(-56, 26); c.closePath(); }, M);
  c.beginPath(); c.moveTo(30, 24); c.quadraticCurveTo(44, 10, 60, 24); fs(c, M, 2);
  rr(c, -58, -22, 50, 9, 4); fs(c, '#7a4a2a', 2);
  lines(c, [34, -26, 34, -34, 22, -36, 46, -36], INK, 2.6);
  c.beginPath(); c.arc(48, -32, 6, 0, Math.PI * 2); fs(c, '#fff3b0', 2);
  lines(c, [26, -36, 22, -42], INK, 1.6); circ(c, 21, -42, 3, '#c9ced6');
  c.beginPath(); c.moveTo(-50, 4); c.quadraticCurveTo(-36, -6, -14, -2); inkS(c, 2, 'rgba(255,255,255,.6)');
}
function drawPigeon(c, a) {
  const bob = Math.sin(a.t * 7) * a.live, st = Math.sin(a.t * 3.5) * a.live;
  lines(c, [-4, 14, -6 + st * 2, 26, 6, 14, 6 - st * 2, 26], '#e0708a', 2.4);
  c.beginPath(); c.moveTo(-30, 0); c.lineTo(-40, -2); c.lineTo(-38, 8); c.closePath(); fs(c, '#6f7684', 2);
  comicShape(c, () => { c.beginPath(); c.ellipse(-4, 2, 26, 15, 0, 0, Math.PI * 2); }, '#a9b0bd', 2.5);
  c.beginPath(); c.ellipse(-8, 0, 16, 9, 0.15, 0, Math.PI * 2); fs(c, '#8d95a4', 1.8);
  lines(c, [-14, -2, -4, 2, -14, 4, -4, 7], '#4f5562', 1.5);
  c.save(); c.translate(bob * 4, 0);
  c.beginPath(); c.ellipse(16, -8, 9, 11, 0.3, 0, Math.PI * 2); c.fillStyle = '#7fbf9f'; c.fill(); ell(c, 16, -4, 7, 5, '#a98fd0');
  c.beginPath(); c.arc(22, -18, 8, 0, Math.PI * 2); fs(c, '#a9b0bd', 2.2);
  c.beginPath(); c.moveTo(29, -19); c.lineTo(35, -16); c.lineTo(29, -15); c.closePath(); fs(c, '#3b3b3b', 1.2);
  circ(c, 29, -20, 1.6, '#fff'); bean(c, 24, -20, 2, a.t);
  c.restore();
}

/* ===== Stage 7: Berlin wall art ===== */
function bgBerlin(c) {
  panelStart(c);
  c.fillStyle = '#d7e7f4'; c.fillRect(8, 8, W - 16, 180);
  dots(c, 10, 10, W - 10, 180, 7, (x, y) => 0.5 + 1.8 * (1 - y / 180), '#b5cde2');
  // Fernsehturm
  lines(c, [300, 40, 300, 104], INK, 2.5); c.beginPath(); c.rect(296, 70, 8, 20); fs(c, '#d8333a', 1.5);
  c.beginPath(); c.moveTo(294, 182); c.lineTo(297, 128); c.lineTo(303, 128); c.lineTo(306, 182); c.closePath(); fs(c, '#d9dde3', 2);
  c.beginPath(); c.arc(300, 116, 15, 0, Math.PI * 2); fs(c, '#c9ced6', 2.5);
  lines(c, [285, 116, 315, 116], INK, 1.5); c.beginPath(); c.rect(292, 102, 16, 4); fs(c, '#d9dde3', 1.5);
  // apartment block behind the wall
  c.beginPath(); c.rect(170, 104, 104, 84); fs(c, '#e7dcc6', 2); winGrid(c, 178, 112, 6, 4, 10, 10, 16, 18, '#7aa0c2', 1);
  // the wall, painted
  c.fillStyle = '#e9e5dc'; c.fillRect(8, 180, W - 16, 150);
  c.save(); c.beginPath(); c.rect(8, 180, W - 16, 150); c.clip();
  c.fillStyle = '#ff6fa0'; c.beginPath(); c.moveTo(196, 208); c.bezierCurveTo(196, 186, 230, 186, 230, 208); c.bezierCurveTo(230, 186, 264, 186, 264, 208); c.bezierCurveTo(264, 236, 230, 248, 230, 262); c.bezierCurveTo(230, 248, 196, 236, 196, 208); c.fill(); inkS(c, 3);
  c.fillStyle = '#ffd34d'; c.beginPath(); c.moveTo(150, 186); c.lineTo(126, 236); c.lineTo(146, 236); c.lineTo(122, 300); c.lineTo(172, 222); c.lineTo(150, 222); c.lineTo(170, 186); c.closePath(); c.fill(); inkS(c, 3);
  c.fillStyle = '#3fb4e8'; c.beginPath(); c.arc(330, 250, 46, 0, Math.PI * 2); c.fill(); inkS(c, 3);
  c.beginPath(); c.ellipse(326, 246, 22, 13, 0, 0, Math.PI * 2); fs(c, '#fff', 3); circ(c, 326, 246, 8, INK); circ(c, 329, 243, 3, '#fff');
  [['#7bd389', 8], ['#ff8a3d', 22], ['#9b7aff', 36]].forEach(([f, d]) => { c.fillStyle = f; c.beginPath(); c.moveTo(8, 330 - d * 2); c.quadraticCurveTo(140, 250 - d, 300, 330 - d); c.lineTo(300, 340); c.lineTo(8, 340); c.closePath(); c.fill(); });
  dots(c, 176, 270, 296, 326, 6, () => 1.6, 'rgba(17,17,17,.25)');
  say(c, LOCAL('LOVE'), 230, 290, 26, '#2a2a6e', 80);
  c.restore();
  const seams = []; for (let x = 52; x < W - 8; x += 48) seams.push(x, 182, x, 330); lines(c, seams, 'rgba(17,17,17,.35)', 1.5);
  c.beginPath(); c.rect(8, 174, W - 16, 10); fs(c, '#d6d1c6', 2.5);
  // street sign pole and the walk-signal pole
  c.beginPath(); c.rect(92, 80, 6, 270); fs(c, '#6a6f78', 1.8);
  c.beginPath(); c.rect(309, 274, 6, 92); fs(c, '#6a6f78', 1.8);
  // pavement and bike lane
  c.fillStyle = '#b9b6ae'; c.fillRect(8, 330, W - 16, 52);
  const pv = []; for (let x = 8; x < W; x += 22) pv.push(x, 330, x - 6, 382); pv.push(8, 356, W - 8, 356); lines(c, pv, 'rgba(17,17,17,.18)', 1.2);
  c.fillStyle = '#c4574a'; c.fillRect(8, 382, W - 16, 22); c.fillStyle = '#5b5e66'; c.fillRect(8, 404, W - 16, 68);
  lines(c, [8, 330, W - 8, 330, 8, 382, W - 8, 382, 8, 404, W - 8, 404], INK, 2.5);
  dots(c, 10, 408, W - 10, 470, 7, () => 1.1, 'rgba(255,255,255,.08)');
  // the currywurst kiosk under its sign
  c.beginPath(); c.rect(30, 262, 120, 86); fs(c, '#f2e3c2', 2.5);
  c.beginPath(); c.rect(36, 270, 108, 36); fs(c, '#3b3f4a', 2);
  c.beginPath(); c.moveTo(24, 262); c.lineTo(156, 262); c.lineTo(150, 252); c.lineTo(30, 252); c.closePath(); fs(c, '#e94b3c', 2);
  c.beginPath(); c.rect(26, 306, 128, 8); fs(c, '#b5773e', 2);
  panelEnd(c, T('與此同時，在柏林……', 'Meanwhile, in Berlin…'));
}
function drawBlade(c, s) {
  comicShape(c, () => rr(c, -63, -15, 126, 30, 3), '#f6f4ee', 2.5);
  c.beginPath(); c.rect(-58, -10, 116, 20); inkS(c, 1.4);
  sayF(c, LOCAL(s), 0, 0.5, 'bold 15px Arial, Helvetica, sans-serif', INK, 108);
}
const drawBlade1 = c => drawBlade(c, 'Mühlenstraße'), drawBlade2 = c => drawBlade(c, 'Warschauer Str.');
function drawAmpel(c) {
  comicShape(c, () => rr(c, -18, -40, 36, 80, 6), '#2f333d');
  rr(c, -13, -35, 26, 32, 4); fs(c, '#2b1b1c', 1.8); rr(c, -13, 3, 26, 32, 4); fs(c, '#12281c', 1.8);
  const man = (x, y, col, walk) => {
    c.fillStyle = col; c.beginPath();
    c.moveTo(x + 4, y - 9); c.arc(x, y - 9, 4, 0, Math.PI * 2);
    c.rect(x - 3, y - 4, 6, 9);
    if (walk) { c.moveTo(x - 2, y + 5); c.lineTo(x - 7, y + 12); c.lineTo(x - 4, y + 12); c.lineTo(x, y + 7); c.lineTo(x + 4, y + 12); c.lineTo(x + 7, y + 12); c.lineTo(x + 2, y + 5); c.closePath(); c.rect(x + 3, y - 3, 5, 2); c.rect(x - 8, y - 1, 5, 2); }
    else { c.rect(x - 3, y + 5, 2, 7); c.rect(x + 1, y + 5, 2, 7); c.rect(x - 10, y - 3, 7, 3); c.rect(x + 3, y - 3, 7, 3); }
    c.fill();
  };
  man(0, -18, '#6b2b2b', false);
  ell(c, 0, 19, 11, 14, 'rgba(90,255,140,.22)');
  man(0, 19, '#5dff8a', true);
}
function drawTrabi(c) {
  c.beginPath(); [-44, 42].forEach(x => { c.moveTo(x + 11, 20); c.arc(x, 20, 11, 0, Math.PI * 2); }); fs(c, '#2b2b33', 2.2);
  c.beginPath(); [-44, 42].forEach(x => { c.moveTo(x + 5, 20); c.arc(x, 20, 5, 0, Math.PI * 2); }); fs(c, '#e8e3d6', 1.4);
  comicShape(c, () => { c.beginPath(); c.moveTo(-66, 16); c.lineTo(-66, -2); c.lineTo(-40, -4); c.lineTo(-30, -24); c.lineTo(26, -24); c.lineTo(38, -4); c.lineTo(64, -2); c.lineTo(66, 16); c.closePath(); }, '#8fc0e0');
  c.beginPath(); c.moveTo(-30, -24); c.lineTo(26, -24); c.lineTo(28, -20); c.lineTo(-32, -20); c.closePath(); fs(c, '#f4f1e8', 1.6);
  c.beginPath(); c.moveTo(-34, -5); c.lineTo(-27, -19); c.lineTo(-4, -19); c.lineTo(-4, -5); c.closePath(); c.moveTo(0, -5); c.lineTo(0, -19); c.lineTo(23, -19); c.lineTo(33, -5); c.closePath(); fs(c, '#cfe9f5', 1.6);
  lines(c, [-66, 4, 66, 4], '#f4f1e8', 3); lines(c, [-2, -4, -2, 14], INK, 1.3);
  c.fillStyle = '#fff6b0'; c.fillRect(58, -1, 7, 4); c.fillStyle = '#e94b3c'; c.fillRect(-66, -1, 4, 4);
  c.beginPath(); [[-58, 26, 5], [-66, 22, 4]].forEach(([x, y, r]) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, Math.PI * 2); }); fs(c, '#f1f1f1', 1.2);
}
function drawWurst(c) {
  comicShape(c, () => rr(c, -63, -23, 126, 46, 4), '#ffd34d');
  c.beginPath(); c.moveTo(-56, 0); c.lineTo(-22, 0); c.lineTo(-26, 14); c.lineTo(-52, 14); c.closePath(); fs(c, '#fff', 1.6);
  c.beginPath(); c.ellipse(-39, -2, 15, 5, 0, 0, Math.PI * 2); fs(c, '#c8643a', 1.6);
  c.beginPath(); [-48, -42, -36, -30].forEach((x, i) => { c.moveTo(x + 2.4, -5 + (i % 2) * 3); c.arc(x, -5 + (i % 2) * 3, 2.4, 0, Math.PI * 2); }); c.fillStyle = '#e0302e'; c.fill();
  lines(c, [-28, -12, -24, -18], INK, 1.5);
  say(c, LOCAL('CURRY'), 22, -8, 18, '#d33b2e', 76); say(c, LOCAL('WURST'), 22, 10, 18, INK, 76);
}
function drawCityBike(c) {
  c.beginPath(); [-30, 32].forEach(x => { c.moveTo(x + 21, 12); c.arc(x, 12, 21, 0, Math.PI * 2); }); inkS(c, 4); c.beginPath(); [-30, 32].forEach(x => { c.moveTo(x + 21, 12); c.arc(x, 12, 21, 0, Math.PI * 2); }); inkS(c, 1.6, '#9aa0ad');
  const sp = []; [-30, 32].forEach(x => { for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; sp.push(x + Math.cos(a) * 19, 12 + Math.sin(a) * 19, x - Math.cos(a) * 19, 12 - Math.sin(a) * 19); } }); lines(c, sp, 'rgba(17,17,17,.35)', 1);
  c.beginPath(); c.moveTo(-30, 12); c.lineTo(-8, -14); c.lineTo(22, -14); c.lineTo(32, 12); c.moveTo(-8, -14); c.lineTo(2, 12); c.lineTo(-30, 12); c.moveTo(2, 12); c.lineTo(22, -14); c.moveTo(22, -14); c.lineTo(18, -24); inkS(c, 5); inkS(c, 3, '#2fae9a');
  lines(c, [-8, -14, -10, -22], INK, 2.5); rr(c, -20, -26, 20, 5, 2.5); fs(c, '#3a2a20', 1.6);
  lines(c, [12, -26, 24, -24], INK, 3);
  c.beginPath(); c.rect(26, -32, 24, 18); fs(c, '#c9925a', 2); lines(c, [26, -26, 50, -26, 26, -20, 50, -20], 'rgba(17,17,17,.4)', 1);
  c.beginPath(); [[32, -34, '#ff6fa0'], [40, -36, '#ffd34d'], [46, -33, '#ff8a3d']].forEach(([x, y]) => { c.moveTo(x + 4, y); c.arc(x, y, 4, 0, Math.PI * 2); }); fs(c, '#ff6fa0', 1.4);
  circ(c, 2, 12, 3, INK);
}
function drawDackel(c, a) {
  const wag = Math.sin(a.t * 11) * a.live, st = Math.sin(a.t * 6) * a.live;
  const B = '#9a5a2e';
  c.save(); c.translate(-46, -6); c.rotate(-0.5 + wag * 0.4); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-8, -8, -12, -16); inkS(c, 6); inkS(c, 3.4, B); c.restore();
  c.beginPath(); c.rect(-38 + st, 6, 8, 16); c.rect(-24 - st, 6, 8, 16); c.rect(18 + st, 6, 8, 16); c.rect(30 - st, 6, 8, 16); fs(c, B, 2);
  comicShape(c, () => rr(c, -48, -14, 92, 26, 13), B, 2.5, false);
  ell(c, -2, 6, 30, 5, '#c98a5a');
  c.beginPath(); c.ellipse(40, -16, 13, 11, 0, 0, Math.PI * 2); fs(c, B, 2.5);
  c.beginPath(); c.moveTo(44, -20); c.quadraticCurveTo(58, -20, 58, -11); c.quadraticCurveTo(52, -6, 44, -9); c.closePath(); fs(c, B, 2.2);
  circ(c, 57, -14, 2.6, INK);
  c.beginPath(); c.moveTo(30, -4); c.quadraticCurveTo(36, -2, 44, -6); c.lineTo(42, 2); c.quadraticCurveTo(34, 4, 28, 2); c.closePath(); fs(c, '#e94b3c', 1.8);
  c.beginPath(); c.moveTo(32, -24); c.quadraticCurveTo(24, -18, 28, -4); c.quadraticCurveTo(34, -8, 36, -20); c.closePath(); fs(c, '#6e3b1c', 2);
  bean(c, 45, -20, 2.2, a.t); blush(c, 48, -12, 2.6);
}

/* ===== Stage 8: Seoul café street ===== */
function bgSeoul(c) {
  panelStart(c);
  c.fillStyle = '#ffe3ec'; c.fillRect(8, 8, W - 16, 200);
  dots(c, 10, 10, W - 10, 200, 8, (x, y) => 0.5 + 2 * (1 - y / 200), '#ffc4d6');
  // Namsan with N Seoul Tower
  c.beginPath(); c.moveTo(180, 170); c.quadraticCurveTo(250, 96, 352, 140); c.lineTo(352, 180); c.lineTo(180, 180); c.closePath(); fs(c, '#9fd2a6', 2);
  lines(c, [320, 116, 320, 50], INK, 2); c.beginPath(); c.moveTo(316, 118); c.lineTo(318, 84); c.lineTo(322, 84); c.lineTo(324, 118); c.closePath(); fs(c, '#f4f1ea', 1.6);
  c.beginPath(); c.moveTo(310, 84); c.lineTo(330, 84); c.lineTo(327, 70); c.lineTo(313, 70); c.closePath(); fs(c, '#f4f1ea', 1.8); lines(c, [312, 77, 328, 77], '#7aa7d6', 2.5);
  c.beginPath(); c.rect(312, 112, 16, 6); fs(c, '#c9ced6', 1.4);
  // the stand the big cup sits on
  c.beginPath(); c.rect(246, 152, 6, 10); c.rect(272, 152, 6, 10); fs(c, '#6b4a3a', 1.4);
  // blossom branch
  c.beginPath(); c.moveTo(8, 60); c.quadraticCurveTo(60, 60, 100, 40); c.moveTo(50, 56); c.quadraticCurveTo(70, 70, 82, 76); inkS(c, 3, '#6b4a3a');
  c.beginPath(); [[24, 56], [40, 50], [58, 48], [76, 44], [92, 40], [66, 66], [80, 74], [34, 66]].forEach(([x, y]) => { c.moveTo(x + 6, y); c.arc(x, y, 6, 0, Math.PI * 2); }); fs(c, '#ffb7cf', 1.4);
  // hanok roof with curved eaves
  c.beginPath(); c.moveTo(4, 196); c.quadraticCurveTo(20, 176, 40, 172); c.lineTo(320, 172); c.quadraticCurveTo(340, 176, 356, 196); c.quadraticCurveTo(180, 186, 4, 196); fs(c, '#4b4f5c', 2.5);
  c.beginPath(); c.rect(36, 160, 288, 14); fs(c, '#5b6070', 2.5);
  const tl = []; for (let x = 44; x < 320; x += 10) tl.push(x, 162, x, 172); lines(c, tl, 'rgba(255,255,255,.25)', 1.5);
  // wooden facade
  c.beginPath(); c.rect(14, 192, 332, 160); fs(c, '#f2dfc0', 2.5);
  lines(c, [14, 244, 346, 244, 100, 192, 100, 352, 182, 192, 182, 352], '#a8743c', 4);
  // door and window
  c.beginPath(); c.rect(118, 252, 52, 100); fs(c, '#a8743c', 2.5); c.beginPath(); c.rect(124, 258, 40, 56); fs(c, '#ffe9b0', 1.8); circ(c, 158, 318, 2.5, INK);
  c.beginPath(); c.rect(196, 252, 144, 88); fs(c, '#fff3d0', 2.5);
  dots(c, 198, 254, 338, 338, 6, () => 1.2, 'rgba(255,190,100,.35)');
  c.beginPath(); c.moveTo(200, 262); c.quadraticCurveTo(268, 278, 336, 262); inkS(c, 1.4, '#6b4a3a');
  lines(c, [268, 252, 268, 340], '#a8743c', 3);
  // string lights under the eaves
  c.beginPath(); c.moveTo(20, 204); c.quadraticCurveTo(180, 228, 340, 204); inkS(c, 1.2, '#6b4a3a');
  c.beginPath(); for (let i = 0; i < 15; i++) { const t = (i + 0.5) / 15, x = 20 + t * 320, y = 204 + 48 * t * (1 - t); c.moveTo(x + 3, y + 3); c.arc(x, y + 3, 3, 0, Math.PI * 2); } fs(c, '#ffe58a', 1);
  // pavement and the access ramp to the door
  c.fillStyle = '#e4d6c6'; c.fillRect(8, 352, W - 16, 120);
  const br = []; for (let k = 0, y = 362; y < 472; k++, y += 12) { br.push(8, y, W - 8, y); for (let x = 8 + (k % 2) * 14; x < W; x += 28) br.push(x, y, x, y + 12); }
  lines(c, br, 'rgba(120,80,50,.22)', 1.2);
  c.beginPath(); c.moveTo(50, 366); c.lineTo(174, 355); c.lineTo(174, 371); c.lineTo(50, 371); c.closePath(); fs(c, '#cfc8bc', 2.2);
  lines(c, [70, 368, 160, 360], 'rgba(17,17,17,.25)', 1.2);
  lines(c, [8, 352, W - 8, 352], INK, 2.5);
  panelEnd(c, T('與此同時，在首爾……', 'Meanwhile, in Seoul…'));
}
function drawCafeSign(c) {
  lines(c, [-30, -28, -30, -18, 30, -28, 30, -18, -44, -28, 44, -28], INK, 2.2);
  comicShape(c, () => rr(c, -44, -18, 88, 44, 22), '#fdf6e8');
  c.beginPath(); c.arc(-24, 4, 10, 0, Math.PI * 2); fs(c, '#7a4a2a', 2); c.beginPath(); c.moveTo(-24, -4); c.quadraticCurveTo(-20, 4, -24, 12); inkS(c, 1.4, '#e9c79c');
  say(c, LOCAL('카페'), 14, 0, 24, '#7a4a2a', 52);
  sayF(c, LOCAL('COFFEE · DESSERT'), 14, 16, 'bold 6.5px Arial, sans-serif', '#a8743c', 52);
}
function drawMenuBoard(c) {
  c.beginPath(); c.moveTo(-30, 46); c.lineTo(-24, -44); c.moveTo(30, 46); c.lineTo(24, -44); inkS(c, 4, '#7a4a2a');
  comicShape(c, () => rr(c, -34, -46, 68, 80, 4), '#a8743c');
  rr(c, -28, -40, 56, 68, 2); fs(c, '#2f3b34', 1.6);
  say(c, T('今日推薦', "TODAY'S"), 0, -28, 13, '#fff', 50);
  say(c, T('草莓拿鐵', 'STRAWBERRY'), 0, -12, 12, '#ffb7cf', 50);
  say(c, T('', 'LATTE'), 0, 1, 12, '#ffb7cf', 50);
  c.beginPath(); c.arc(-8, 16, 5, 0, Math.PI * 2); inkS(c, 1.4, '#fff'); c.beginPath(); c.moveTo(10, 10); c.bezierCurveTo(4, 4, 0, 14, 10, 20); c.bezierCurveTo(20, 14, 16, 4, 10, 10); c.fillStyle = '#ff8fb1'; c.fill();
}
function drawCupSign(c) {
  c.beginPath(); c.arc(35, 0, 11, -1.4, 1.4); inkS(c, 9); c.beginPath(); c.arc(35, 0, 11, -1.4, 1.4); inkS(c, 5, '#fdf6e8');
  comicShape(c, () => { c.beginPath(); c.moveTo(-38, -24); c.lineTo(38, -24); c.lineTo(30, 30); c.quadraticCurveTo(0, 42, -30, 30); c.closePath(); }, '#fdf6e8');
  c.beginPath(); c.ellipse(0, -24, 38, 9, 0, 0, Math.PI * 2); fs(c, '#a8743c', 2.5);
  c.beginPath(); c.moveTo(0, -20); c.bezierCurveTo(-10, -30, -18, -22, 0, -16); c.bezierCurveTo(18, -22, 10, -30, 0, -20); c.fillStyle = '#fdf6e8'; c.fill();
  c.fillStyle = '#ff8fb1'; c.fillRect(-35, 0, 69, 8); c.beginPath(); c.moveTo(-35, 0); c.lineTo(34, 0); c.moveTo(-34, 8); c.lineTo(33, 8); inkS(c, 1.5);
  lines(c, [-12, -36, -8, -44, 2, -36, 6, -44, 14, -36, 18, -44], 'rgba(120,120,130,.6)', 1.8);
}
function drawMagpie(c, a) {
  const hop = Math.max(0, Math.sin(a.t * 4)) * a.live, tl = Math.sin(a.t * 2.5) * a.live;
  c.save(); c.translate(0, -hop * 4);
  lines(c, [-2, 12, -4, 22, 6, 12, 6, 22], '#3b3b3b', 2);
  c.save(); c.translate(-14, 0); c.rotate(-0.25 + tl * 0.15); c.beginPath(); c.moveTo(0, -4); c.lineTo(-24, -10); c.lineTo(-24, -2); c.lineTo(0, 4); c.closePath(); fs(c, '#2a3550', 2); c.restore();
  comicShape(c, () => { c.beginPath(); c.ellipse(0, 0, 18, 13, -0.15, 0, Math.PI * 2); }, '#1b1f2a', 2.5, false);
  c.beginPath(); c.ellipse(4, 4, 11, 8, 0, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill();
  c.beginPath(); c.ellipse(-4, -2, 11, 5, -0.2, 0, Math.PI * 2); fs(c, '#3a5a9a', 1.6);
  c.beginPath(); c.arc(16, -12, 9, 0, Math.PI * 2); fs(c, '#1b1f2a', 2.2);
  c.beginPath(); c.moveTo(24, -14); c.lineTo(32, -11); c.lineTo(24, -9); c.closePath(); fs(c, '#3b3b3b', 1.4);
  circ(c, 18, -14, 2.4, '#fff'); circ(c, 18.6, -14, 1.3, INK); blush(c, 17, -7, 2.4);
  c.restore();
}
function drawPolaroid(c, k) {
  lines(c, [0, -32, 0, -24], INK, 1.6); c.beginPath(); c.rect(-4, -30, 8, 9); fs(c, '#d9a35a', 1.4);
  comicShape(c, () => c.rect(-22, -24, 44, 52), '#fffdf6', 2.2);
  c.beginPath(); c.rect(-17, -19, 34, 32); fs(c, k ? '#ffd6a0' : '#b8e0ff', 1.4);
  if (k) { c.beginPath(); c.arc(0, 0, 9, 0, Math.PI * 2); fs(c, '#fffdf6', 1.4); c.beginPath(); c.ellipse(0, -3, 6, 2.2, 0, 0, Math.PI * 2); c.fillStyle = '#a8743c'; c.fill(); c.beginPath(); c.moveTo(0, -3); c.bezierCurveTo(-3, -6, -5, -3, 0, -1); c.bezierCurveTo(5, -3, 3, -6, 0, -3); c.fillStyle = '#fff'; c.fill(); }
  else { c.beginPath(); c.moveTo(-17, 13); c.lineTo(-6, -2); c.lineTo(2, 6); c.lineTo(8, 0); c.lineTo(17, 13); c.closePath(); fs(c, '#7bc48a', 1.2); circ(c, 9, -11, 4, '#fff36b'); }
  sayF(c, k ? T('拿鐵 ♥', 'latte ♥') : T('南山', 'Namsan'), 0, 21, '13px Caveat, "Noto Sans TC", cursive', '#555', 38);
}
const drawPhotoL = c => drawPolaroid(c, 0), drawPhotoR = c => drawPolaroid(c, 1);
function drawFishBread(c) {
  c.save(); c.translate(0, -8);
  const f = () => { c.beginPath(); c.moveTo(-40, 6); c.quadraticCurveTo(-30, -26, 14, -18); c.quadraticCurveTo(30, -14, 36, -2); c.lineTo(52, -16); c.lineTo(50, 6); c.lineTo(52, 26); c.lineTo(36, 12); c.quadraticCurveTo(22, 30, -10, 28); c.quadraticCurveTo(-40, 26, -40, 6); c.closePath(); };
  c.beginPath(); c.rect(-3, 24, 6, 14); fs(c, '#6b4a3a', 1.8); rr(c, -16, 36, 32, 6, 2); fs(c, '#6b4a3a', 1.8);
  comicShape(c, f, '#e7a64b');
  c.save(); f(); c.clip(); const sc = []; for (let x = -24; x < 36; x += 8) sc.push(x, -24, x - 10, 30); lines(c, sc, 'rgba(150,80,20,.35)', 1.5); c.restore();
  circ(c, -26, 0, 4, '#fff'); circ(c, -25, 0, 2.2, INK); blush(c, -26, 9, 3);
  rr(c, -12, -6, 44, 18, 4); fs(c, '#fff6e2', 1.6);
  say(c, LOCAL('붕어빵'), 10, 3, 14, '#a0531c', 40);
  c.restore();
}
function drawRampRail(c) {
  // posts stand plumb on the sloping ramp, so here they lean against the rail.
  const dx = -Math.sin(rad(5)) * 27, dy = Math.cos(rad(5)) * 27;
  c.beginPath(); [-50, -17, 17, 50].forEach(x => { c.moveTo(x, -12); c.lineTo(x + dx, -12 + dy); }); inkS(c, 5);
  c.beginPath(); [-50, -17, 17, 50].forEach(x => { c.moveTo(x, -12); c.lineTo(x + dx, -12 + dy); }); inkS(c, 2.6, '#c9ced6');
  rr(c, -60, -15, 120, 6, 3); fs(c, '#c9ced6', 2.2);
}

/* ===== Stage 9: Rio carnival ===== */
function bgRio(c) {
  panelStart(c);
  const g = c.createLinearGradient(0, 8, 0, 300); g.addColorStop(0, '#5b2a86'); g.addColorStop(0.55, '#ff6f91'); g.addColorStop(1, '#ffc35c');
  c.fillStyle = g; c.fillRect(8, 8, W - 16, 300);
  dots(c, 10, 10, W - 10, 300, 8, (x, y) => 0.4 + 1.6 * (1 - y / 300), 'rgba(255,255,255,.18)');
  // Sugarloaf and Urca hill over the bay
  c.beginPath(); c.moveTo(160, 300); c.quadraticCurveTo(190, 200, 222, 214); c.quadraticCurveTo(240, 230, 252, 236); c.lineTo(252, 300); c.closePath(); fs(c, '#4b3a6e', 2.5);
  c.beginPath(); c.moveTo(236, 300); c.quadraticCurveTo(246, 150, 300, 140); c.quadraticCurveTo(346, 140, 356, 230); c.lineTo(356, 300); c.closePath(); fs(c, '#3e2f5e', 2.5);
  c.beginPath(); c.moveTo(270, 170); c.quadraticCurveTo(290, 152, 312, 156); inkS(c, 2, 'rgba(255,255,255,.25)');
  c.fillStyle = '#3d7fc4'; c.fillRect(8, 290, W - 16, 20); lines(c, [20, 298, 60, 298, 100, 302, 150, 302, 210, 298, 260, 298], 'rgba(255,255,255,.5)', 1.5);
  // confetti
  const cf = ['#ffd34d', '#4fe3c1', '#ff5d8f', '#fff', '#7a8cff'];
  cf.forEach((col, k) => { c.fillStyle = col; c.beginPath(); for (let i = k; i < 70; i += 5) { const x = 14 + h01(i) * 330, y = 50 + h01(i + 70) * 230; c.rect(x, y, 4, 3); } c.fill(); });
  // the crowd behind a rope
  c.fillStyle = '#2a1f45'; c.beginPath();
  for (let i = 0; i < 20; i++) { const x = 12 + i * 18 + h01(i + 3) * 6, hh = 30 + h01(i + 11) * 14; c.moveTo(x + 7, 360 - hh); c.arc(x, 360 - hh, 7, 0, Math.PI * 2); c.rect(x - 8, 360 - hh + 5, 16, hh); }
  c.fill();
  const arms = []; for (let i = 0; i < 20; i += 3) { const x = 12 + i * 18; arms.push(x + 6, 330, x + 14, 306); } lines(c, arms, '#2a1f45', 4);
  // the coconut kiosk
  c.beginPath(); c.rect(132, 282, 96, 78); fs(c, '#f4e3b5', 2.5);
  c.beginPath(); c.rect(138, 300, 84, 30); fs(c, '#6b4226', 2);
  c.beginPath(); for (let k = 0; k < 5; k++) { c.moveTo(150 + k * 15 + 6, 320); c.arc(150 + k * 15, 320, 6, 0, Math.PI * 2); } fs(c, '#7cc142', 1.5);
  c.beginPath(); c.moveTo(126, 300); c.lineTo(234, 300); c.lineTo(228, 284); c.lineTo(132, 284); c.closePath(); fs(c, '#ff5d8f', 2);
  c.fillStyle = '#fff'; c.beginPath(); for (let x = 140; x < 228; x += 16) { c.moveTo(x, 286); c.lineTo(x + 8, 286); c.lineTo(x + 9, 298); c.lineTo(x - 1, 298); c.closePath(); } c.fill();
  // Copacabana wave pavement
  c.fillStyle = '#f4f1ea'; c.fillRect(8, 360, W - 16, 112);
  c.fillStyle = '#1d1d1d'; c.beginPath();
  for (let y = 364; y < 472; y += 22) { c.moveTo(8, y); for (let x = 8; x < W; x += 40) { c.quadraticCurveTo(x + 10, y - 10, x + 20, y); c.quadraticCurveTo(x + 30, y + 10, x + 40, y); } c.lineTo(W, y + 9); for (let x = W; x > 8; x -= 40) { c.quadraticCurveTo(x - 10, y + 19, x - 20, y + 9); c.quadraticCurveTo(x - 30, y - 1, x - 40, y + 9); } c.closePath(); }
  c.fill();
  lines(c, [8, 360, W - 8, 360], INK, 3);
  panelEnd(c, T('與此同時，在里約嘉年華……', 'Meanwhile, at Rio Carnival…'));
}
function drawBanner(c, word) {
  const cols = ['#ffd34d', '#4fe3c1', '#ff5d8f', '#7a8cff', '#ff8a3d'];
  c.beginPath(); c.moveTo(-72, -18); c.quadraticCurveTo(0, -6, 72, -18); inkS(c, 2);
  const n = word.length, step = 132 / n;
  for (let i = 0; i < n; i++) {
    const x = -66 + step * (i + 0.5), t = (x + 72) / 144, y = -18 + 12 * t * (1 - t);
    c.beginPath(); c.moveTo(x - 12, y); c.lineTo(x + 12, y); c.lineTo(x + 12, y + 24); c.lineTo(x, y + 32); c.lineTo(x - 12, y + 24); c.closePath(); fs(c, cols[(i + n) % 5], 2);
    say(c, word[i], x, y + 13, 19, INK, 22);
  }
}
const drawBanL = c => drawBanner(c, 'CARNA'), drawBanR = c => drawBanner(c, 'VAL!');
function drawCable(c) {
  // the car hangs plumb from the sloping cable, so it is tilted against the cable here.
  lines(c, [-72, -18, 72, -18], INK, 2.4);
  c.save(); c.translate(-6, -18); c.rotate(rad(12));
  lines(c, [0, 0, 0, 12], INK, 2.2); c.beginPath(); c.rect(-5, -3, 10, 5); fs(c, '#c9ced6', 1.5);
  comicShape(c, () => rr(c, -24, 12, 48, 30, 7), '#ffd34d', 2.4);
  rectsInk(c, [[-19, 17, 11, 12], [-5, 17, 11, 12], [9, 17, 11, 12]], '#9fe1ff', 1.4);
  c.restore();
}
function drawMask(c) {
  c.beginPath(); [[-30, -18, '#ff5d8f'], [-12, -26, '#ffd34d'], [8, -26, '#4fe3c1'], [26, -18, '#7a8cff']].forEach(([x, y, f], i) => { c.save(); c.translate(x, y); c.rotate((i - 1.5) * 0.35); c.beginPath(); c.ellipse(0, -2, 5, 11, 0, 0, Math.PI * 2); fs(c, f, 1.8); c.restore(); });
  comicShape(c, () => { c.beginPath(); c.moveTo(-50, -4); c.quadraticCurveTo(-46, -20, -20, -16); c.quadraticCurveTo(-6, -14, 0, -8); c.quadraticCurveTo(6, -14, 20, -16); c.quadraticCurveTo(46, -20, 50, -4); c.quadraticCurveTo(46, 18, 22, 18); c.quadraticCurveTo(8, 18, 0, 6); c.quadraticCurveTo(-8, 18, -22, 18); c.quadraticCurveTo(-46, 18, -50, -4); c.closePath(); }, '#c13fd8');
  c.beginPath(); c.ellipse(-22, 0, 12, 7, 0.15, 0, Math.PI * 2); c.moveTo(34, 0); c.ellipse(22, 0, 12, 7, -0.15, 0, Math.PI * 2); fs(c, '#2a1f45', 2);
  dots(c, -44, -12, 44, 14, 6, (x, y) => (Math.abs(x) > 34 || Math.abs(x) < 8) ? 1.4 : 0, '#ffd34d');
  lines(c, [-36, -10, -30, -14, 30, -14, 36, -10], '#fff', 1.6);
}
function drawCocoSign(c) {
  c.beginPath(); c.rect(-40, 18, 5, 8); c.rect(35, 18, 5, 8); fs(c, '#7a4a2a', 1.4);
  comicShape(c, () => rr(c, -56, -22, 112, 42, 4), '#3dba78');
  c.beginPath(); c.arc(-36, 2, 13, 0, Math.PI * 2); fs(c, '#7cc142', 2); c.beginPath(); c.ellipse(-36, -8, 6, 3, 0, 0, Math.PI * 2); fs(c, '#f6f1d0', 1.4);
  lines(c, [-32, -10, -26, -24], '#ff5d8f', 2.4);
  say(c, LOCAL('ÁGUA'), 14, -8, 17, '#fff', 64); say(c, LOCAL('DE COCO'), 14, 9, 17, '#ffd34d', 64);
}
function drawSurdo(c) {
  lines(c, [-30, -40, 0, -46, 30, -40], '#e94b3c', 3);
  c.beginPath(); c.rect(-34, -26, 68, 56); fs(c, '#d9dde3', 2.5);
  c.save(); c.beginPath(); c.rect(-34, -26, 68, 56); c.clip(); const z = []; for (let x = -40; x < 40; x += 14) z.push(x, -24, x + 14, 28); lines(c, z, '#e94b3c', 2); c.restore();
  c.beginPath(); c.ellipse(0, -26, 34, 9, 0, 0, Math.PI * 2); fs(c, '#fffaf0', 2.5);
  c.beginPath(); c.ellipse(0, 30, 34, 9, 0, 0, Math.PI); inkS(c, 2.5);
  c.beginPath(); c.rect(-36, 24, 72, 6); fs(c, '#ffd34d', 2); c.beginPath(); c.rect(-36, -24, 72, 5); fs(c, '#ffd34d', 2);
  c.save(); c.translate(26, -34); c.rotate(0.6); lines(c, [0, 0, 0, -14], INK, 3); circ(c, 0, -15, 4.5, '#fffaf0'); c.beginPath(); c.arc(0, -15, 4.5, 0, Math.PI * 2); inkS(c, 1.6); c.restore();
}
function drawMacaw(c, a) {
  const sw = Math.sin(a.t * 2.2) * a.live, bob = Math.sin(a.t * 6) * a.live;
  c.save(); c.rotate(sw * 0.06);
  lines(c, [-26, 30, 26, 30], '#7a4a2a', 5);
  c.save(); c.translate(-2, 20); c.rotate(0.12 + sw * 0.08);
  c.beginPath(); c.moveTo(-6, 0); c.lineTo(-10, 30); c.lineTo(-2, 32); c.lineTo(6, 0); c.closePath(); fs(c, '#2f6fd8', 2); c.restore();
  comicShape(c, () => { c.beginPath(); c.ellipse(0, 4, 15, 24, 0.1, 0, Math.PI * 2); }, '#e8322f', 2.5, false);
  c.beginPath(); c.moveTo(-14, -2); c.quadraticCurveTo(-20, 14, -10, 26); c.quadraticCurveTo(-2, 18, 0, 4); c.closePath(); fs(c, '#ffd23f', 2);
  c.beginPath(); c.moveTo(-12, 12); c.quadraticCurveTo(-14, 22, -8, 28); c.quadraticCurveTo(-4, 22, -4, 14); c.closePath(); fs(c, '#2f6fd8', 1.6);
  lines(c, [-4, 28, -6, 32, 6, 28, 6, 32], '#3b3b3b', 2.4);
  c.save(); c.translate(bob * 1.5, 0);
  c.beginPath(); c.arc(4, -24, 13, 0, Math.PI * 2); fs(c, '#e8322f', 2.5);
  c.beginPath(); c.ellipse(8, -24, 7, 6, 0, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill();
  c.beginPath(); c.moveTo(14, -30); c.quadraticCurveTo(28, -30, 24, -14); c.quadraticCurveTo(20, -20, 14, -20); c.closePath(); fs(c, '#f4f1ea', 2); c.beginPath(); c.moveTo(14, -20); c.quadraticCurveTo(20, -18, 18, -14); inkS(c, 3);
  bean(c, 8, -26, 2.3, a.t); blush(c, 6, -18, 2.6);
  c.restore(); c.restore();
}
function drawToucan(c, a) {
  const bob = Math.sin(a.t * 5) * a.live;
  lines(c, [-4, 18, -6, 28, 6, 18, 6, 28], '#5a8fe0', 2.6);
  c.beginPath(); c.moveTo(-18, 10); c.lineTo(-32, 24); c.lineTo(-22, 24); c.closePath(); fs(c, '#1b1f2a', 2);
  comicShape(c, () => { c.beginPath(); c.ellipse(-4, 4, 17, 16, 0, 0, Math.PI * 2); }, '#1b1f2a', 2.5, false);
  c.save(); c.translate(0, bob * 2);
  c.beginPath(); c.arc(4, -12, 11, 0, Math.PI * 2); fs(c, '#1b1f2a', 2.2);
  c.beginPath(); c.ellipse(4, -4, 9, 7, 0, 0, Math.PI * 2); c.fillStyle = '#fff3a0'; c.fill();
  c.beginPath(); c.moveTo(12, -20); c.quadraticCurveTo(40, -24, 40, -10); c.quadraticCurveTo(30, -4, 12, -8); c.closePath(); fs(c, '#ff9a2e', 2.2);
  c.beginPath(); c.moveTo(34, -21); c.quadraticCurveTo(41, -18, 40, -10); c.quadraticCurveTo(37, -8, 34, -8); c.closePath(); c.fillStyle = '#e8322f'; c.fill(); c.beginPath(); c.moveTo(12, -14); c.quadraticCurveTo(26, -14, 40, -12); inkS(c, 1.2);
  c.beginPath(); c.arc(4, -14, 4, 0, Math.PI * 2); c.fillStyle = '#7ad1ff'; c.fill(); bean(c, 4, -14, 2, a.t);
  c.restore();
}
function drawFloat(c) {
  c.beginPath(); [-44, 44].forEach(x => { c.moveTo(x + 10, 24); c.arc(x, 24, 10, 0, Math.PI * 2); }); fs(c, '#2b2b33', 2.2);
  comicShape(c, () => rr(c, -66, -6, 132, 30, 6), '#4fe3c1');
  const sc = []; for (let x = -60; x < 64; x += 12) sc.push([x, 16]); c.beginPath(); sc.forEach(([x, y]) => { c.moveTo(x + 6, y); c.arc(x, y, 6, Math.PI, 0); }); fs(c, '#ffd34d', 1.4);
  const star = () => { c.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 12 : 27, an = -Math.PI / 2 + i * Math.PI / 5; c.lineTo(Math.cos(an) * r, -20 + Math.sin(an) * r); } c.closePath(); };
  comicShape(c, star, '#ffd34d', 2.5);
  c.beginPath(); [[-46, -14, '#ff5d8f'], [46, -14, '#ff5d8f']].forEach(([x, y]) => { c.moveTo(x + 9, y); c.arc(x, y, 9, 0, Math.PI * 2); }); fs(c, '#ff5d8f', 2);
  circ(c, -6, -22, 2.4, INK); circ(c, 6, -22, 2.4, INK); c.beginPath(); c.arc(0, -18, 4, 0.2, Math.PI - 0.2); inkS(c, 1.5);
}

/* ===== Stage 10: Bangkok night market ===== */
function bgBangkok(c) {
  panelStart(c);
  c.fillStyle = '#241a45'; c.fillRect(8, 8, W - 16, 300);
  dots(c, 10, 10, W - 10, 300, 8, (x, y) => 0.4 + 1.6 * (y / 300), '#382a66');
  c.fillStyle = '#fff6c8'; c.beginPath(); for (let i = 0; i < 18; i++) { const x = 14 + h01(i + 5) * 330, y = 14 + h01(i + 30) * 140; c.moveTo(x + 1.2, y); c.arc(x, y, 1.2, 0, Math.PI * 2); } c.fill();
  // Wat Arun on the far bank
  c.beginPath(); c.moveTo(150, 250); c.lineTo(164, 200); c.lineTo(170, 150); c.lineTo(176, 108); c.lineTo(180, 86); c.lineTo(184, 108); c.lineTo(190, 150); c.lineTo(196, 200); c.lineTo(210, 250); c.closePath(); fs(c, '#4a3c78', 2);
  lines(c, [164, 200, 196, 200, 170, 150, 190, 150, 176, 108, 184, 108], 'rgba(255,214,120,.6)', 1.5);
  c.beginPath(); c.moveTo(120, 250); c.lineTo(130, 214); c.lineTo(140, 250); c.moveTo(220, 250); c.lineTo(230, 214); c.lineTo(240, 250); fs(c, '#4a3c78', 2);
  c.fillStyle = '#1e3a66'; c.fillRect(8, 248, W - 16, 22); lines(c, [30, 258, 80, 258, 140, 262, 220, 258, 300, 262], 'rgba(255,214,120,.45)', 1.5);
  // market tents
  [[8, 84, '#e94b3c'], [92, 88, '#3dba78'], [180, 86, '#ffb02e'], [266, 86, '#e94b3c']].forEach(([x, w, col]) => {
    c.beginPath(); c.rect(x, 300, w, 70); fs(c, '#5a3a2a', 2);
    c.beginPath(); c.rect(x + 6, 316, w - 12, 30); fs(c, '#ffd88a', 1.8);
    c.beginPath(); c.moveTo(x - 2, 300); c.lineTo(x + w / 2, 268); c.lineTo(x + w + 2, 300); c.closePath(); fs(c, col, 2.2);
    c.save(); c.beginPath(); c.moveTo(x - 2, 300); c.lineTo(x + w / 2, 268); c.lineTo(x + w + 2, 300); c.closePath(); c.clip(); c.fillStyle = 'rgba(255,255,255,.75)'; for (let k = 0; k < 5; k++) c.fillRect(x + 4 + k * w / 5, 266, w / 10, 36); c.restore();
    c.beginPath(); c.moveTo(x - 2, 300); c.lineTo(x + w / 2, 268); c.lineTo(x + w + 2, 300); c.closePath(); inkS(c, 2.2);
    c.beginPath(); for (let k = 0; k < 4; k++) { const fx = x + 14 + k * (w - 28) / 3; c.moveTo(fx + 6, 330); c.arc(fx, 330, 6, 0, Math.PI * 2); } fs(c, ['#ff8a3d', '#ffd34d', '#ff5d8f', '#7cc142'][(x / 88 | 0) % 4], 1.4);
    c.beginPath(); c.rect(x - 2, 346, w + 4, 8); fs(c, '#8a5a3a', 1.8);
  });
  // beam for the market signs, posts for the stall signs
  lines(c, [196, 56, 352, 56], INK, 6); lines(c, [196, 56, 352, 56], '#7a4a2a', 3.5);
  c.beginPath(); c.rect(40, 222, 7, 60); c.rect(134, 222, 7, 60); c.rect(295, 262, 7, 20); fs(c, '#7a4a2a', 1.8);
  // the wooden post the gecko climbs
  c.beginPath(); c.rect(190, 160, 12, 140); fs(c, '#7a4a2a', 2);
  // strings of bulbs
  [[14, 64, 182, 64, 26], [190, 40, 346, 52, 18]].forEach(([x0, y0, x1, y1, sag]) => {
    c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + sag, x1, y1); inkS(c, 1.3, '#bba');
  });
  c.beginPath(); for (let i = 0; i < 9; i++) { const t = (i + 0.5) / 9, x = 190 + t * 156, y = (1 - t) * (1 - t) * 40 + 2 * t * (1 - t) * 64 + t * t * 52 + 4; c.moveTo(x + 3, y); c.arc(x, y, 3, 0, Math.PI * 2); } c.fillStyle = '#ffe58a'; c.fill();
  // ground
  c.fillStyle = '#2c2838'; c.fillRect(8, 354, W - 16, 118);
  [[50, '#ff8a3d'], [140, '#ffd34d'], [230, '#ff5d8f'], [310, '#7cc142']].forEach(([x, f]) => { c.fillStyle = f; c.globalAlpha = 0.14; c.fillRect(x - 14, 358, 28, 110); c.globalAlpha = 1; });
  dots(c, 10, 360, W - 10, 470, 7, () => 1.1, 'rgba(255,255,255,.07)');
  lines(c, [8, 354, W - 8, 354], INK, 3);
  panelEnd(c, T('最後，在曼谷……', 'And finally, in Bangkok…'));
}
function drawLantern(c, k) {
  lines(c, [0, -32, 0, -24], INK, 2);
  const col = k ? '#ffb02e' : '#e94b3c';
  ell(c, 0, 0, 24, 26, 'rgba(255,200,80,.18)');
  c.beginPath(); c.rect(-9, -26, 18, 6); c.rect(-9, 20, 18, 6); fs(c, '#3b2a20', 1.8);
  comicShape(c, () => { c.beginPath(); c.ellipse(0, 0, 18, 21, 0, 0, Math.PI * 2); }, col, 2.5, false);
  lines(c, [-10, -17, -10, 17, 0, -21, 0, 21, 10, -17, 10, 17], 'rgba(17,17,17,.3)', 1.2);
  c.beginPath(); c.ellipse(-6, -6, 4, 8, 0, 0, Math.PI * 2); c.fillStyle = 'rgba(255,255,255,.35)'; c.fill();
  lines(c, [-4, 26, -4, 31, 0, 26, 0, 32, 4, 26, 4, 31], '#ffd34d', 1.6);
}
const drawLampL = c => drawLantern(c, 0), drawLampR = c => drawLantern(c, 1);
function drawMarketSign(c, en) {
  lines(c, [-50, -26, -50, -16, 50, -26, 50, -16], INK, 2);
  comicShape(c, () => rr(c, -64, -16, 128, en ? 32 : 36, 4), en ? '#ffd34d' : '#d33b6e');
  if (en) say(c, LOCAL('NIGHT MARKET'), 0, 0.5, 20, INK, 116);
  else sayF(c, LOCAL('ตลาดกลางคืน'), 0, 2, '700 17px "Noto Sans Thai", "Noto Sans TC", sans-serif', '#fff', 116);
}
const drawMktTH = c => drawMarketSign(c, false), drawMktEN = c => drawMarketSign(c, true);
function drawPadThai(c) {
  comicShape(c, () => rr(c, -68, -24, 136, 48, 5), '#fff3d9');
  c.beginPath(); c.ellipse(-44, 4, 18, 10, 0, 0, Math.PI); c.lineTo(-62, 4); fs(c, '#4fa0d8', 2);
  c.beginPath(); c.ellipse(-44, 2, 16, 6, 0, Math.PI, 0); fs(c, '#f2b25a', 1.6);
  lines(c, [-54, 0, -34, -2, -50, -2, -38, 2], '#c47a2a', 1.2);
  circ(c, -40, -3, 2.4, '#e8322f'); lines(c, [-36, -6, -22, -20, -32, -6, -18, -18], '#7a4a2a', 2);
  sayF(c, LOCAL('ผัดไทย'), 18, -8, '700 17px "Noto Sans Thai", "Noto Sans TC", sans-serif', '#c0392b', 88);
  say(c, LOCAL('PAD THAI'), 18, 11, 17, INK, 88);
}
function drawThaiTea(c) {
  c.beginPath(); c.moveTo(6, -42); c.lineTo(14, -54); inkS(c, 5); c.beginPath(); c.moveTo(6, -42); c.lineTo(14, -54); inkS(c, 3, '#ff5d8f');
  comicShape(c, () => { c.beginPath(); c.moveTo(-26, -38); c.lineTo(26, -38); c.lineTo(18, 44); c.lineTo(-18, 44); c.closePath(); }, '#f08a2e');
  c.save(); c.beginPath(); c.moveTo(-26, -38); c.lineTo(26, -38); c.lineTo(18, 44); c.lineTo(-18, 44); c.closePath(); c.clip();
  c.fillStyle = '#fff1d6'; c.beginPath(); c.moveTo(-30, -30); c.quadraticCurveTo(-8, -20, 0, -28); c.quadraticCurveTo(10, -36, 30, -26); c.lineTo(30, -40); c.lineTo(-30, -40); c.closePath(); c.fill();
  c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); for (let i = 0; i < 5; i++) { c.moveTo(-10 + i * 5 + 3, -6 + i * 9); c.arc(-10 + i * 5, -6 + i * 9, 3, 0, Math.PI * 2); } c.fill();
  c.restore();
  c.beginPath(); c.ellipse(0, -38, 26, 5, 0, 0, Math.PI * 2); inkS(c, 2.5);
  c.fillStyle = '#fff'; c.fillRect(-21, 12, 39, 4);
  rr(c, -17, 20, 34, 15, 3); fs(c, '#fff', 1.4); sayF(c, LOCAL('ชาเย็น'), 0, 28, '700 10px "Noto Sans Thai", sans-serif', '#c45a10', 30);
}
function drawGecko(c, a) {
  const cr = Math.sin(a.t * 3) * a.live, tl = Math.sin(a.t * 4) * a.live;
  const G = '#7fa0c8';
  c.beginPath(); c.moveTo(0, 18); c.quadraticCurveTo(-6 + tl * 6, 34, 4 - tl * 4, 44); inkS(c, 8); inkS(c, 5, G);
  const leg = []; [[-6, -12, -18, -18 + cr * 3], [6, -12, 18, -18 - cr * 3], [-6, 12, -18, 20 - cr * 3], [6, 12, 18, 20 + cr * 3]].forEach(l => leg.push(...l));
  c.beginPath(); for (let i = 0; i < leg.length; i += 4) { c.moveTo(leg[i], leg[i + 1]); c.lineTo(leg[i + 2], leg[i + 3]); } inkS(c, 6); inkS(c, 3.4, G);
  c.beginPath(); [[-18, -18 + cr * 3], [18, -18 - cr * 3], [-18, 20 - cr * 3], [18, 20 + cr * 3]].forEach(([x, y]) => { c.moveTo(x + 3.5, y); c.arc(x, y, 3.5, 0, Math.PI * 2); }); fs(c, G, 1.4);
  comicShape(c, () => { c.beginPath(); c.ellipse(0, 2, 9, 20, 0, 0, Math.PI * 2); }, G, 2.5, false);
  c.fillStyle = '#ff8a3d'; c.beginPath(); [[-3, -6], [3, 2], [-3, 10], [3, -12], [0, 16]].forEach(([x, y]) => { c.moveTo(x + 2.4, y); c.arc(x, y, 2.4, 0, Math.PI * 2); }); c.fill();
  c.beginPath(); c.ellipse(0, -26, 11, 10, 0, 0, Math.PI * 2); fs(c, G, 2.5);
  c.beginPath(); c.arc(-7, -30, 4.5, 0, Math.PI * 2); c.moveTo(11.5, -30); c.arc(7, -30, 4.5, 0, Math.PI * 2); fs(c, '#ffd34d', 1.6);
  bean(c, -7, -30, 2.2, a.t); bean(c, 7, -30, 2.2, a.t);
  c.beginPath(); c.arc(0, -22, 5, 0.3, Math.PI - 0.3); inkS(c, 1.4); blush(c, -8, -21, 2.4); blush(c, 8, -21, 2.4);
}
function drawTukTuk(c) {
  c.beginPath(); [-50, 58].forEach(x => { c.moveTo(x + 13, 36); c.arc(x, 36, 13, 0, Math.PI * 2); }); fs(c, '#2b2b33', 2.2);
  c.beginPath(); [-50, 58].forEach(x => { c.moveTo(x + 5, 36); c.arc(x, 36, 5, 0, Math.PI * 2); }); fs(c, '#d6dae2', 1.4);
  lines(c, [-70, -36, -70, 20, 36, -36, 36, 4], INK, 3.5);
  comicShape(c, () => { c.beginPath(); c.moveTo(-82, -38); c.quadraticCurveTo(-20, -52, 52, -40); c.lineTo(54, -30); c.lineTo(-82, -30); c.closePath(); }, '#2f6fd8');
  c.fillStyle = '#ffd34d'; c.beginPath(); for (let x = -78; x < 52; x += 12) { c.moveTo(x, -30); c.lineTo(x + 6, -24); c.lineTo(x + 12, -30); } c.fill(); c.beginPath(); for (let x = -78; x < 52; x += 12) { c.moveTo(x, -30); c.lineTo(x + 6, -24); c.lineTo(x + 12, -30); } inkS(c, 1.2);
  comicShape(c, () => { c.beginPath(); c.moveTo(-82, 0); c.lineTo(-30, 0); c.lineTo(-24, 24); c.lineTo(40, 24); c.lineTo(42, -4); c.lineTo(62, -4); c.quadraticCurveTo(80, 0, 82, 30); c.lineTo(-82, 30); c.closePath(); }, '#e94b3c');
  rr(c, -78, -8, 46, 12, 4); fs(c, '#3dba78', 2);
  c.beginPath(); c.moveTo(44, -4); c.lineTo(52, -30); c.lineTo(62, -30); c.lineTo(66, -4); c.closePath(); fs(c, '#bfe6ff', 2);
  lines(c, [40, -4, 30, -12, 30, -12, 22, -10], INK, 2.4);
  c.beginPath(); c.arc(76, 10, 6, 0, Math.PI * 2); fs(c, '#fff3b0', 2);
  rr(c, -24, -52, 48, 12, 3); fs(c, '#ffd34d', 2); sayF(c, 'TUK TUK', 0, -45.5, 'bold 8px Arial, sans-serif', INK, 44);
  lines(c, [-64, 8, -20, 8], 'rgba(255,255,255,.5)', 2);
  c.fillStyle = '#ffd34d'; c.beginPath(); for (let x = -76; x < 76; x += 14) { c.moveTo(x + 3, 26); c.arc(x, 26, 2.2, 0, Math.PI * 2); } c.fill();
}

defineChapter({
  key: 'comic', order: 5,
  name: { zh: "漫畫街角", en: "Comic Corners" },
  blurb: { zh: "世界各地的街頭，畫成一格一格的漫畫。", en: "Streets around the world, drawn panel by panel." },
  style: { zh: "漫畫風", en: "Comic" },
  narrator: { zh: "對話框", en: "Speech Bubble" },
  song: 'fr',
    comments: {
      far: [{ zh: ["砰！大失敗！", "這一格漫畫畫歪了，作者要重畫了啦！"], en: ["KA-BOOM! Fail!", "This panel's crooked. The artist has to redraw it!"] }, { zh: ["咦咦咦？！", "整條街的招牌歪成一團，像被颱風掃過。"], en: ["Wha-what?!", "Every sign on the street is crooked, like a storm hit."] }],
      close: [{ zh: ["待續…", "就差一格！下一集一定會成功！"], en: ["To be continued…", "One panel short! Next episode, for sure!"] }, { zh: ["好可惜！", "對話框話才說一半：「就差一點點…」"], en: ["So close!", "Speech Bubble only got halfway: 'Just a little…'"] }],
      pass: [{ zh: ["過關！咻！", "勉強畫完這一頁，編輯說可以先交稿。"], en: ["Cleared! Whoosh!", "Page done. The editor says submit it for now."] }, { zh: ["及格啦！", "咖啡館招牌還有點斜，但咖啡很香。"], en: ["Passing grade!", "Café sign's a bit off, but the coffee smells great."] }],
      good: [{ zh: ["漂亮的分鏡！", "每一格都整整齊齊，讀者大聲叫好！"], en: ["Nice paneling!", "Every panel lined up. Readers cheer out loud!"] }, { zh: ["街角好心情", "路燈亮起來，整條街的路人都笑了。"], en: ["Happy corner", "Streetlights glow. Everyone on the street smiles."] }],
      perfect: [{ zh: ["完美跨頁♪", "一度都不差！這一頁要放進漫畫史冊！"], en: ["Perfect spread♪", "Not one degree off! This page goes into comic history!"] }, { zh: ["環遊世界冠軍！", "對話框開心到自己變成金色了。"], en: ["World-tour champ!", "Speech Bubble turned gold with joy."] }],
    },
  stages: [
    { key: 'fr', title: { zh: "巴黎早安", en: "Bonjour Paris" }, place: { zh: "法國 巴黎", en: "Paris, France" },
      intro: { zh: "7 件東西。其中一件只歪了一點點，你看得出來是哪一件嗎？", en: "Seven things. One is only slightly off. Can you spot which?" },
      bg: bgParis,
      objects: [
      { id: 'eiffel', name: { zh: '艾菲爾鐵塔', en: 'Eiffel Tower' }, x: 285, y: 190, w: 110, h: 250, mag: 8, draw: drawEiffel, sfx: 'bell' },
      { id: 'rue', name: { zh: '路牌', en: 'Street sign' }, x: 110, y: 90, w: 160, h: 46, near: true, draw: drawRue, sfx: 'bell' },
      { id: 'cafe', name: { zh: '咖啡館招牌', en: 'Café sign' }, x: 110, y: 200, w: 160, h: 84, mag: 12, draw: drawCafe, sfx: 'pop' },
      { id: 'bubble', name: { zh: '對話框', en: 'Speech bubble' }, x: 110, y: 318, w: 150, h: 70, mag: 16, draw: drawBubble, sfx: 'boing' },
      { id: 'lamp', name: { zh: '路燈', en: 'Streetlight' }, x: 215, y: 370, w: 40, h: 150, mag: 9, pad: 14, draw: drawLamp, sfx: 'boing' },
      { id: 'poster', name: { zh: '海報', en: 'Poster' }, x: 300, y: 400, w: 100, h: 120, mag: 10, draw: drawPoster, sfx: 'pop' },
      { id: 'mona', name: { zh: '名畫', en: 'Masterpiece' }, x: 90, y: 420, w: 80, h: 100, mag: 5, draw: drawMona, sfx: 'wood' }
      ] },
    { key: 'comic-subway', title: { zh: '紐約地鐵', en: 'NYC Subway' }, place: { zh: '美國 紐約', en: 'New York, USA' },
      intro: { zh: '月台上，列車進站，還有一隻扛著披薩的老鼠。', en: 'A train pulls in, and a rat hauls a slice of pizza across the platform.' },
      bg: bgSubway, animated: true,
      objects: [
      { id: 'station', name: { zh: '站名牌', en: 'Station sign' }, x: 120, y: 94, w: 212, h: 52, near: true, draw: drawStation, sfx: 'beep' },
      { id: 'bubble', name: { zh: '廣播', en: 'Announcement' }, x: 272, y: 150, w: 140, h: 70, mag: 13, draw: drawDoorsBubble, sfx: 'pop' },
      { id: 'train', name: { zh: '地鐵列車', en: 'Subway car' }, x: 180, y: 258, w: 300, h: 118, mag: 7, draw: drawTrain, sfx: 'comic_chime' },
      { id: 'rat', name: { zh: '披薩鼠', en: 'Pizza rat' }, x: 262, y: 404, w: 92, h: 62, mag: 10, draw: drawRat, habit: (t, l) => ({ dx: Math.sin(t * 1.6) * 5 * l, dy: -Math.abs(Math.sin(t * 8)) * 1.5 * l }), call: 'comic_rat' }
      ] },
    { key: 'comic-shibuya', title: { zh: '東京澀谷', en: 'Shibuya Crossing' }, place: { zh: '日本 東京', en: 'Tokyo, Japan' },
      intro: { zh: '綠燈一亮，整個路口一起走。日本很多行人號誌會發出鳥叫聲。', en: 'When the light turns, everyone crosses at once. Many Japanese walk signals chirp like birds.' },
      bg: bgShibuya, animated: true,
      objects: [
      { id: 'screen', name: { zh: '大螢幕', en: 'Big screen' }, x: 104, y: 108, w: 152, h: 96, mag: 12, draw: drawScreen, sfx: 'twinkle' },
      { id: 'kanban', name: { zh: '拉麵招牌', en: 'Ramen sign' }, x: 314, y: 150, w: 40, h: 140, near: true, draw: drawKanban, sfx: 'wood' },
      { id: 'signal', name: { zh: '行人號誌', en: 'Walk signal' }, x: 238, y: 214, w: 44, h: 106, mag: 9, draw: drawWalkSignal, sfx: 'comic_piyo' },
      { id: 'hachi', name: { zh: '八公像', en: 'Hachiko statue' }, x: 84, y: 372, w: 80, h: 116, mag: 6, draw: drawHachi, sfx: 'bell' },
      { id: 'shiba', name: { zh: '柴犬', en: 'Shiba Inu' }, x: 250, y: 414, w: 84, h: 72, mag: 14, draw: drawShiba, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 4 * l }), call: 'comic_shiba' }
      ] },
    { key: 'comic-london', title: { zh: '倫敦雨天', en: 'Rainy London' }, place: { zh: '英國 倫敦', en: 'London, UK' },
      intro: { zh: '下雨了，彩旗還是要掛。兩段彩旗綁在同一條繩上，轉一段，另一段也會動。', en: 'Rain or not, the bunting stays up. Both halves share one rope: turn one and the other moves too.' },
      bg: bgLondon, animated: true,
      objects: [
      { id: 'buntL', name: { zh: '左段彩旗', en: 'Bunting (left)' }, x: 96, y: 78, w: 150, h: 40, mag: 9, draw: drawBuntL, sfx: 'jingle', link: { to: 'buntR', k: 0.6 } },
      { id: 'buntR', name: { zh: '右段彩旗', en: 'Bunting (right)' }, x: 264, y: 78, w: 150, h: 40, mag: 13, draw: drawBuntR, sfx: 'jingle' },
      { id: 'phone', name: { zh: '電話亭', en: 'Phone box' }, x: 70, y: 352, w: 72, h: 152, near: true, draw: drawPhoneBox, sfx: 'bell' },
      { id: 'bus', name: { zh: '雙層巴士', en: 'Double-decker' }, x: 248, y: 296, w: 170, h: 132, mag: 6, draw: drawLondonBus, sfx: 'comic_horn' },
      { id: 'duck', name: { zh: '雨衣鴨', en: 'Duck in a raincoat' }, x: 214, y: 414, w: 84, h: 84, mag: 11, draw: drawDuck, habit: (t, l) => ({ dx: Math.sin(t * 1.2) * 6 * l }), call: 'comic_duck' }
      ] },
    { key: 'comic-hongkong', title: { zh: '香港霓虹', en: 'Hong Kong Neon' }, place: { zh: '中國 香港', en: 'Hong Kong' },
      intro: { zh: '霓虹燈一盞接一盞。兩塊招牌掛在同一個鐵架上，動一塊，另一塊也跟著晃。', en: 'Neon everywhere. Two signs hang from one steel frame: move one and the other swings too.' },
      bg: bgHK, animated: true,
      objects: [
      { id: 'tea', name: { zh: '茶餐廳招牌', en: 'Café sign' }, x: 110, y: 110, w: 150, h: 58, mag: 8, draw: drawTeaSign, sfx: 'shimmer', link: { to: 'noodle', k: 0.6 } },
      { id: 'noodle', name: { zh: '粥麵招牌', en: 'Noodle sign' }, x: 110, y: 186, w: 120, h: 56, mag: 12, draw: drawNoodleSign, sfx: 'twinkle' },
      { id: 'pawn', name: { zh: '當舖招牌', en: 'Pawnshop sign' }, x: 285, y: 122, w: 80, h: 108, near: true, draw: drawPawn, sfx: 'bell' },
      { id: 'tram', name: { zh: '叮叮電車', en: 'Ding-ding tram' }, x: 124, y: 318, w: 172, h: 116, mag: 6, draw: drawTram, sfx: 'comic_ding' },
      { id: 'taxi', name: { zh: '紅色的士', en: 'Red taxi' }, x: 266, y: 420, w: 132, h: 66, mag: 10, draw: drawTaxi, sfx: 'comic_horn' },
      { id: 'cat', name: { zh: '店貓', en: 'Shop cat' }, x: 60, y: 428, w: 64, h: 64, mag: 14, draw: drawShopCat, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 1.4)) * 2 * l }), call: 'comic_cat' }
      ] },
    { key: 'comic-rome', title: { zh: '羅馬廣場', en: 'Roman Piazza' }, place: { zh: '義大利 羅馬', en: 'Rome, Italy' },
      intro: { zh: '這次有兩件只歪一點點。窗戶的兩片百葉窗是一組的。', en: 'Two things are only slightly off this time. The two shutters work as a pair.' },
      bg: bgRome, animated: true,
      objects: [
      { id: 'shutL', name: { zh: '左百葉窗', en: 'Left shutter' }, x: 52, y: 120, w: 42, h: 98, mag: 7, draw: drawShutL, sfx: 'wood', link: { to: 'shutR', k: 0.8 } },
      { id: 'shutR', name: { zh: '右百葉窗', en: 'Right shutter' }, x: 148, y: 120, w: 42, h: 98, mag: 11, draw: drawShutR, sfx: 'wood' },
      { id: 'plaque', name: { zh: '大理石路牌', en: 'Marble street sign' }, x: 298, y: 90, w: 96, h: 50, near: true, draw: drawPlaque, sfx: 'clunk' },
      { id: 'gelato', name: { zh: '冰淇淋招牌', en: 'Gelato sign' }, x: 296, y: 220, w: 92, h: 66, near: true, draw: drawGelato, sfx: 'pop' },
      { id: 'vespa', name: { zh: '速克達', en: 'Scooter' }, x: 262, y: 392, w: 128, h: 86, mag: 9, draw: drawVespa, sfx: 'comic_horn' },
      { id: 'pigeon', name: { zh: '鴿子', en: 'Pigeon' }, x: 96, y: 430, w: 78, h: 58, mag: 13, draw: drawPigeon, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 6 * l }), call: 'comic_pigeon' }
      ] },
    { key: 'comic-berlin', title: { zh: '柏林塗鴉牆', en: 'Berlin Wall Art' }, place: { zh: '德國 柏林', en: 'Berlin, Germany' },
      intro: { zh: '圍牆變成了畫廊。同一根桿子上的兩塊路牌會一起轉。', en: 'The old wall is now a gallery. Two street signs share one pole and turn together.' },
      bg: bgBerlin, animated: true,
      objects: [
      { id: 'blade1', name: { zh: '上路牌', en: 'Top street sign' }, x: 95, y: 100, w: 130, h: 34, mag: 6, draw: drawBlade1, sfx: 'clunk', link: { to: 'blade2', k: 0.8 } },
      { id: 'blade2', name: { zh: '下路牌', en: 'Lower street sign' }, x: 95, y: 144, w: 130, h: 34, mag: 10, draw: drawBlade2, sfx: 'clunk' },
      { id: 'ampel', name: { zh: '小綠人號誌', en: 'Walk signal' }, x: 312, y: 234, w: 40, h: 84, near: true, draw: drawAmpel, sfx: 'beep' },
      { id: 'wurst', name: { zh: '咖哩香腸招牌', en: 'Currywurst sign' }, x: 90, y: 226, w: 130, h: 50, near: true, draw: drawWurst, sfx: 'pop' },
      { id: 'bike', name: { zh: '腳踏車', en: 'Bicycle' }, x: 216, y: 306, w: 108, h: 74, mag: 5, draw: drawCityBike, sfx: 'jingle' },
      { id: 'trabi', name: { zh: '小汽車', en: 'Little car' }, x: 262, y: 416, w: 136, h: 58, mag: 8, draw: drawTrabi, sfx: 'comic_horn' },
      { id: 'dackel', name: { zh: '臘腸狗', en: 'Dachshund' }, x: 96, y: 420, w: 124, h: 52, mag: 12, draw: drawDackel, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 5 * l }), call: 'comic_dackel' }
      ] },
    { key: 'comic-seoul', title: { zh: '首爾咖啡街', en: 'Seoul Café Street' }, place: { zh: '韓國 首爾', en: 'Seoul, South Korea' },
      intro: { zh: '韓屋改成的咖啡店。門口那段扶手，先想想再動手。', en: 'A café in an old hanok. Think twice before touching the railing by the door.' },
      bg: bgSeoul, animated: true,
      objects: [
      { id: 'cup', name: { zh: '咖啡杯招牌', en: 'Coffee cup sign' }, x: 262, y: 118, w: 96, h: 92, mag: 7, draw: drawCupSign, sfx: 'twinkle' },
      { id: 'magpie', name: { zh: '喜鵲', en: 'Magpie' }, x: 118, y: 132, w: 72, h: 52, mag: 11, draw: drawMagpie, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 6 * l }), call: 'comic_magpie' },
      { id: 'cafesign', name: { zh: '咖啡店招牌', en: 'Café sign' }, x: 58, y: 222, w: 90, h: 58, near: true, draw: drawCafeSign, sfx: 'bell' },
      { id: 'photo1', name: { zh: '左邊照片', en: 'Left photo' }, x: 232, y: 296, w: 46, h: 62, mag: 5, draw: drawPhotoL, sfx: 'pop', link: { to: 'photo2', k: 0.7 } },
      { id: 'photo2', name: { zh: '右邊照片', en: 'Right photo' }, x: 304, y: 296, w: 46, h: 62, mag: 9, draw: drawPhotoR, sfx: 'pop' },
      { id: 'rail', name: { zh: '坡道扶手', en: 'Ramp railing' }, x: 112, y: 346, w: 124, h: 34, trap: true, keep: -5, draw: drawRampRail,
        trapNote: { zh: '坡道扶手跟著無障礙坡道一起斜，本來就該是斜的', en: 'Ramp railings follow the slope of the access ramp, so it is meant to lean' } },
      { id: 'menu', name: { zh: '黑板菜單', en: 'Menu board' }, x: 66, y: 414, w: 72, h: 94, near: true, draw: drawMenuBoard, sfx: 'wood' },
      { id: 'fish', name: { zh: '鯽魚餅招牌', en: 'Fish-bread sign' }, x: 262, y: 418, w: 108, h: 76, mag: 6, draw: drawFishBread, sfx: 'boing' }
      ] },
    { key: 'comic-rio', title: { zh: '里約嘉年華', en: 'Rio Carnival' }, place: { zh: '巴西 里約熱內盧', en: 'Rio de Janeiro, Brazil' },
      intro: { zh: '森巴鼓響起來了！天上那條纜車線，可別急著扶正。', en: 'The samba drums are rolling! The cable car line up in the sky: maybe leave that one alone.' },
      bg: bgRio, animated: true,
      objects: [
      { id: 'banL', name: { zh: '左段旗幟', en: 'Banner (left)' }, x: 98, y: 72, w: 148, h: 42, mag: 6, draw: drawBanL, sfx: 'jingle', link: { to: 'banR', k: 0.6 } },
      { id: 'banR', name: { zh: '右段旗幟', en: 'Banner (right)' }, x: 262, y: 72, w: 148, h: 42, mag: 9, draw: drawBanR, sfx: 'jingle' },
      { id: 'cable', name: { zh: '纜車', en: 'Cable car' }, x: 262, y: 148, w: 148, h: 64, trap: true, keep: -12, draw: drawCable,
        trapNote: { zh: '麵包山的纜車是一路往山上爬的，纜線本來就是斜的', en: 'The Sugarloaf cable car climbs up the mountain, so its cable is meant to slope' } },
      { id: 'mask', name: { zh: '嘉年華面具', en: 'Carnival mask' }, x: 96, y: 152, w: 104, h: 64, near: true, draw: drawMask, sfx: 'shimmer' },
      { id: 'surdo', name: { zh: '森巴大鼓', en: 'Surdo drum' }, x: 62, y: 296, w: 76, h: 92, mag: 5, draw: drawSurdo, sfx: 'comic_bongo' },
      { id: 'coco', name: { zh: '椰子水招牌', en: 'Coconut stand sign' }, x: 180, y: 258, w: 114, h: 52, near: true, draw: drawCocoSign, sfx: 'pop' },
      { id: 'macaw', name: { zh: '金剛鸚鵡', en: 'Macaw' }, x: 304, y: 278, w: 60, h: 100, mag: 11, draw: drawMacaw, habit: (t, l) => ({ dy: Math.sin(t * 1.3) * 2 * l }), call: 'comic_parrot' },
      { id: 'toucan', name: { zh: '巨嘴鳥', en: 'Toucan' }, x: 90, y: 418, w: 76, h: 62, mag: 7, draw: drawToucan, habit: (t, l) => ({ dx: Math.sin(t * 1.1) * 4 * l }), call: 'comic_toucan' },
      { id: 'float', name: { zh: '花車', en: 'Parade float' }, x: 262, y: 416, w: 136, h: 82, mag: 8, draw: drawFloat, sfx: 'comic_horn' }
      ] },
    { key: 'comic-bangkok', title: { zh: '曼谷夜市', en: 'Bangkok Night Market' }, place: { zh: '泰國 曼谷', en: 'Bangkok, Thailand' },
      intro: { zh: '最後一站！燈籠是一對，兩塊市集招牌也是一對。', en: 'Last stop! The lanterns are a pair, and so are the two market signs.' },
      bg: bgBangkok, animated: true,
      objects: [
      { id: 'lampL', name: { zh: '紅燈籠', en: 'Red lantern' }, x: 48, y: 102, w: 48, h: 66, mag: 5, draw: drawLampL, sfx: 'twinkle', link: { to: 'lampR', k: 0.7 } },
      { id: 'lampR', name: { zh: '黃燈籠', en: 'Yellow lantern' }, x: 128, y: 104, w: 48, h: 66, mag: 8, draw: drawLampR, sfx: 'twinkle' },
      { id: 'mktTH', name: { zh: '泰文招牌', en: 'Thai sign' }, x: 266, y: 82, w: 130, h: 46, mag: 7, draw: drawMktTH, sfx: 'bell', link: { to: 'mktEN', k: 0.6 } },
      { id: 'mktEN', name: { zh: '英文招牌', en: 'English sign' }, x: 266, y: 132, w: 130, h: 44, mag: 4, draw: drawMktEN, sfx: 'bell' },
      { id: 'padthai', name: { zh: '泰式炒河粉', en: 'Pad Thai sign' }, x: 90, y: 200, w: 138, h: 50, near: true, draw: drawPadThai, sfx: 'pop' },
      { id: 'gecko', name: { zh: '大壁虎', en: 'Tokay gecko' }, x: 196, y: 226, w: 40, h: 92, mag: 9, draw: drawGecko, habit: (t, l) => ({ dy: Math.sin(t * 0.8) * 5 * l }), call: 'comic_gecko' },
      { id: 'tea', name: { zh: '泰式奶茶', en: 'Thai iced tea' }, x: 298, y: 214, w: 56, h: 100, near: true, draw: drawThaiTea, sfx: 'boing' },
      { id: 'cat', name: { zh: '夜市貓', en: 'Market cat' }, x: 62, y: 418, w: 64, h: 64, mag: 12, draw: drawShopCat, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 1.4)) * 2 * l }), call: 'comic_cat' },
      { id: 'tuktuk', name: { zh: '嘟嘟車', en: 'Tuk-tuk' }, x: 240, y: 406, w: 168, h: 104, mag: 6, draw: drawTukTuk, sfx: 'comic_horn' }
      ] },
  ],
});
