// 第 3 大關 古都巷弄 / World 3: Old Town Alleys (Pixel art).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== Level 1: pixel Kyoto ===== */
function bgJapan(c) { // drawn on a 90x120 low-res canvas, scaled up with no smoothing
  const bands = ['#1d1b4f','#2a2263','#3d2874','#5a2e80','#7f3586','#a8437f','#d0586f','#ec7563','#f5965d','#f9b866'];
  bands.forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * 7, 90, 7); });
  c.fillStyle = '#fbc87a'; c.fillRect(0, 70, 90, 10);
  c.fillStyle = '#fff6d8'; [[6,4],[19,9],[33,3],[47,11],[58,5],[84,8],[71,14],[12,17]].forEach(([x, y]) => c.fillRect(x, y, 1, 1));
  c.fillStyle = '#ffe2a0'; for (let y = -9; y <= 9; y++) { const hw = Math.round(Math.sqrt(81 - y * y)); c.fillRect(64 - hw, 44 + y, hw * 2, 1); }
  [47, 50, 52].forEach(y => { c.fillStyle = bands[Math.min(9, Math.floor(y / 7))]; c.fillRect(53, y, 23, 1); });
  for (let y = 31; y < 80; y++) { const half = 2 + Math.round((y - 31) * 0.95); c.fillStyle = '#4b4f93'; c.fillRect(38 - half, y, half, 1); c.fillStyle = '#3a3d79'; c.fillRect(38, y, half, 1); }
  for (let y = 31; y < 45; y++) {
    const half = 2 + Math.round((y - 31) * 0.95);
    for (let x = 38 - half; x < 38 + half; x++) {
      if (y >= 40 && ((x + 60) % 6) >= 6 - (y - 39)) continue;
      c.fillStyle = x < 38 ? '#f4f2ff' : '#cfd2f0'; c.fillRect(x, y, 1, 1);
    }
  }
  c.fillStyle = '#231d48'; c.fillRect(79, 46, 1, 8);
  for (let i = 0; i < 5; i++) { const y = 52 + i * 5, w = (4 + i * 1.5) | 0; c.fillRect(79 - w - 1, y, 2 * w + 3, 1); c.fillRect(79 - w + 1, y + 1, 2 * w - 1, 4); }
  for (let x = 0; x < 90; x++) { const h = 2 + ((x * 7 + 3) % 5) + (x % 11 === 0 ? 3 : 0); c.fillStyle = '#2b2554'; c.fillRect(x, 80 - h, 1, h); }
  c.fillStyle = '#2a2030'; c.fillRect(0, 0, 36, 22); c.fillStyle = '#3d3348'; for (let y = 3; y < 22; y += 4) c.fillRect(0, y, 35, 1);
  c.fillStyle = '#17121d'; c.fillRect(0, 22, 38, 2);
  c.fillStyle = '#5a3a24'; c.fillRect(0, 24, 34, 2);
  c.fillStyle = '#4a301e'; c.fillRect(0, 26, 9, 54); c.fillStyle = '#6b4a30'; for (let x = 1; x < 9; x += 2) c.fillRect(x, 26, 1, 54);
  c.fillStyle = '#17121d'; for (let x = 34; x < 90; x++) c.fillRect(x, 24 + Math.round((x - 34) / 28), 1, 1);
  c.fillStyle = '#5e5a72'; c.fillRect(0, 80, 90, 40);
  for (let r = 0; r < 8; r++) {
    const y = 80 + r * 5;
    c.fillStyle = '#4a4660'; c.fillRect(0, y, 90, 1); c.fillStyle = '#6f6a86'; c.fillRect(0, y + 1, 90, 1);
    c.fillStyle = '#4a4660'; for (let x = (r % 2) * 4; x < 90; x += 8) c.fillRect(x, y, 1, 5);
  }
  c.fillStyle = 'rgba(255,190,110,.16)'; c.fillRect(9, 80, 22, 40);
}
function drawTorii(c) { pxSprite(c, 30, 26, p => {
  const R = '#e2452f', D = '#a82c1e', K = '#2a2030', G = '#f2c14e';
  p(6,5,3,19,R); p(21,5,3,19,R); p(8,5,1,19,D); p(23,5,1,19,D);
  p(5,23,5,3,K); p(20,23,5,3,K);
  p(3,10,24,2,R); p(3,11,24,1,D);
  p(2,3,26,2,R); p(2,4,26,1,D);
  p(1,1,28,2,K); p(0,0,3,2,K); p(27,0,3,2,K); p(3,1,24,1,'#463a4f');
  p(12,5,6,5,K); p(13,6,4,3,G);
}); }
function drawRamen(c) { pxSprite(c, 26, 12, p => {
  p(4,-4,1,4,'#2a2030'); p(21,-4,1,4,'#2a2030');
  p(0,0,26,12,'#3a2114'); p(1,1,24,10,'#d99a55'); p(1,1,24,1,'#eab573'); p(1,5,24,1,'#c7843f'); p(1,8,24,1,'#c7843f');
}); txt(c, LOCAL('ラーメン'), 0, 1, '22px "DotGothic16", monospace', '#3a1608'); }
function drawVending(c) { pxSprite(c, 16, 28, p => {
  const K = '#1b1b2a';
  p(0,0,16,28,K); p(1,1,14,26,'#d8343a'); p(1,1,14,1,'#f0646a');
  p(2,2,12,13,'#bfe3ff');
  const cans = ['#f6d04d','#3cb371','#ff8a3d','#ffffff','#7b5cff','#3cc3ff','#ff5c8a','#f6d04d','#2e8b57','#ff8a3d','#ffffff','#3cc3ff'];
  for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { p(3 + i * 3, 3 + r * 4, 2, 3, cans[r * 4 + i]); p(3 + i * 3, 6 + r * 4, 2, 1, '#8fb4d6'); }
  p(2,15,12,1,K);
  for (let i = 0; i < 4; i++) p(3 + i * 3, 16, 2, 1, '#ffe066');
  p(11,18,3,3,K); p(12,19,1,1,'#ffe066');
  p(2,22,9,4,K); p(3,23,7,2,'#333344');
  p(1,26,14,1,'#a5242a');
}); }
function drawLantern(c) { pxSprite(c, 14, 20, p => {
  const K = '#221a22', R = '#e23b2e', D = '#a3241b', L = '#ff6a4d';
  p(6,-5,2,5,K); p(3,0,8,2,K);
  p(2,2,10,1,R); p(1,3,12,1,R); p(0,4,14,12,R); p(1,16,12,1,R); p(2,17,10,1,R);
  p(1,4,2,12,L);
  [6, 9, 12, 15].forEach(y => p(0, y, 14, 1, D));
  p(3,18,8,2,K);
}); txt(c, LOCAL('祭'), 0, -1, '24px "DotGothic16", monospace', '#fff3d6'); }
function drawCat(c) { pxSprite(c, 16, 18, p => {
  const K = '#2a2030', Wt = '#fbf7ef', Pk = '#f49ab0', Rd = '#e2452f', G = '#f2c14e';
  const sil = [[1,0,3,2],[12,0,3,2],[1,2,14,7],[2,9,12,9],[14,1,2,8]];
  sil.forEach(([x, y, w, h]) => p(x - 1, y - 1, w + 2, h + 2, K));
  sil.forEach(([x, y, w, h]) => p(x, y, w, h, Wt));
  p(2,1,1,1,Pk); p(13,1,1,1,Pk);
  p(4,5,2,1,K); p(10,5,2,1,K); p(7,6,2,1,Pk); p(3,7,1,1,Pk); p(12,7,1,1,Pk);
  p(2,9,12,1,Rd); p(7,10,2,2,G);
  p(4,12,6,4,G); p(5,13,4,2,'#d9a428');
  p(14,1,2,1,'#f0d6dc');
  p(3,16,10,1,'#e3dacb');
}); }

/* ===== Shared helpers for stages 2-10 ===== */
const { q, note, puff } = QS;
const box = (c, x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
// Even colour bands from y0 to y1 on the 90-wide low-res canvas.
function bands(c, cols, y0, y1) { const h = (y1 - y0) / cols.length; cols.forEach((col, i) => box(c, 0, Math.round(y0 + i * h), 90, Math.ceil(h) + 1, col)); }
const hsh = i => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
function dots(c, pts, col) { c.fillStyle = col; pts.forEach(([x, y]) => c.fillRect(x, y, 1, 1)); }
function disc(c, cx, cy, r, col) { c.fillStyle = col; for (let y = -r; y <= r; y++) { const hw = Math.round(Math.sqrt(r * r - y * y)); c.fillRect(cx - hw, cy + y, hw * 2, 1); } }
function pdisc(p, cx, cy, r, col) { for (let y = -r; y <= r; y++) { const hw = Math.round(Math.sqrt(r * r - y * y)); if (hw > 0) p(cx - hw, cy + y, hw * 2, 1, col); } }
// Outlined sprite parts: every [x, y, w, h, colour] gets a 1-pixel rim in K, then its fill.
function sil(p, parts, K) { parts.forEach(([x, y, w, h]) => p(x - 1, y - 1, w + 2, h + 2, K)); parts.forEach(([x, y, w, h, col]) => p(x, y, w, h, col)); }
const PX = '"DotGothic16", "Noto Sans TC", monospace';

/* ----- Sounds for this world ----- */
defineCreatureSound('oldtown_sparrow', (ac, o, t) => {
  [0, 0.12].forEach((d, k) => q(ac, o, t + d, [[0, 2600 + k * 200], [0.03, 3300 + k * 200], [0.08, 2700]], 0.08, { vol: 0.4 }));
  q(ac, o, t + 0.26, [[0, 3000], [0.05, 3600], [0.16, 2900]], 0.16, { vib: [16, 50], vol: 0.36 });
});
defineCreatureSound('oldtown_mew', (ac, o, t) => q(ac, o, t, [[0, 1000], [0.1, 1500], [0.34, 1050]], 0.36, { vib: [9, 30], vol: 0.42 }));
defineCreatureSound('oldtown_magpie', (ac, o, t) => [0, 0.13, 0.26].forEach((d, k) => { q(ac, o, t + d, [[0, 1900 - k * 60], [0.03, 2300 - k * 60], [0.09, 1600]], 0.09, { vol: 0.4, over: 0.25 }); puff(ac, o, t + d, 0.04, 3000, 0.03); }));
defineCreatureSound('oldtown_donkey', (ac, o, t) => [0, 0.32].forEach(d => { q(ac, o, t + d, [[0, 900], [0.12, 1250]], 0.14, { vol: 0.4 }); q(ac, o, t + d + 0.15, [[0, 640], [0.14, 520]], 0.16, { vol: 0.4, over: 0.22 }); }));
defineCreatureSound('oldtown_coo', (ac, o, t) => { q(ac, o, t, [[0, 560], [0.12, 680], [0.3, 540]], 0.32, { trem: [18, 0.45], vol: 0.44 }); q(ac, o, t + 0.36, [[0, 600], [0.18, 520]], 0.2, { trem: [18, 0.45], vol: 0.38 }); });
defineCreatureSound('oldtown_gull', (ac, o, t) => [0, 0.2].forEach((d, k) => q(ac, o, t + d, [[0, 1500], [0.05, 2300 - k * 200], [0.17, 1400]], 0.18, { vib: [14, 40], vol: 0.38 })));
defineCreatureSound('oldtown_tweet', (ac, o, t) => [0, 0.07, 0.14, 0.21].forEach((d, k) => q(ac, o, t + d, [[0, 2400 + (k % 2) * 500], [0.05, 3000 + (k % 2) * 400]], 0.06, { attack: 0.004, vol: 0.36 })));
defineCreatureSound('oldtown_sing', (ac, o, t) => [[0, 784], [0.18, 988], [0.36, 1175]].forEach(([d, f], k) => q(ac, o, t + d, [[0, f], [0.2, f * 1.01]], k === 2 ? 0.42 : 0.2, { vib: [6, 14], attack: 0.03, vol: 0.38 })));
defineCreatureSound('oldtown_vendor', (ac, o, t) => { q(ac, o, t, [[0, 880], [0.16, 1175]], 0.2, { vib: [7, 12], vol: 0.38 }); q(ac, o, t + 0.24, [[0, 1175], [0.4, 990]], 0.42, { vib: [7, 18], vol: 0.38 }); });
defineThingSound('oldtown_clay', (ac, o, t, r) => { q(ac, o, t, [[0, 520 * r], [0.06, 470 * r]], 0.1, { attack: 0.002, hold: 0.1, vol: 0.45, over: 0.3 }); note(ac, o, t + 0.03, 1560 * r, 0.14, 0.12); });
defineThingSound('oldtown_rug', (ac, o, t, r) => { puff(ac, o, t, 0.12, 900, 0.18); q(ac, o, t + 0.02, [[0, 420 * r], [0.12, 640 * r]], 0.14, { vol: 0.36, over: 0.1 }); });
defineThingSound('oldtown_paper', (ac, o, t, r) => { puff(ac, o, t, 0.1, 2400, 0.1); note(ac, o, t + 0.04, 1175 * r, 0.16, 0.26); note(ac, o, t + 0.11, 1568 * r, 0.2, 0.18); });
defineThingSound('oldtown_tram', (ac, o, t, r) => [0, 0.16].forEach(d => { note(ac, o, t + d, 1320 * r, 0.3, 0.3); note(ac, o, t + d, 2640 * r, 0.12, 0.07); }));

/* ===== Level 2: Xi'an city wall at night ===== */
function bgXian(c) {
  bands(c, ['#0d1230','#11173a','#161d45','#1d2350','#252a5b','#2f3065','#3b356d','#4a3a72','#5c3f74','#704573'], 0, 50);
  dots(c, [[30,5],[44,9],[57,4],[66,3],[83,6],[38,16],[50,2],[88,18],[24,14],[61,9],[36,24],[86,26]], '#fff3d0');
  disc(c, 13, 9, 5, '#fff0c8'); dots(c, [[11,8],[14,11],[15,7]], '#e6d3a4');
  for (let x = 0; x < 90; x += 3) { const h = 3 + Math.floor(hsh(x) * 6); box(c, x, 50 - h, 3, h, '#251f45'); if (hsh(x + 40) > 0.6) dots(c, [[x + 1, 50 - h + 2]], '#f3b25a'); }
  // Big Wild Goose Pagoda in the distance
  for (let i = 0; i < 7; i++) { const w = 11 - i, y = 47 - i * 4; box(c, 9 - (w >> 1), y, w, 4, '#2b2550'); box(c, 8 - (w >> 1), y, w + 2, 1, '#1e1a3c'); if (i < 6) dots(c, [[9, y + 2]], '#f3b25a'); }
  box(c, 9, 17, 1, 4, '#1e1a3c');
  // gate tower: upper roof, upper storey, lower roof, lower storey
  const roofC = '#262536', roofL = '#3a3950', col = '#b73a2c', win = '#f2a75a', beam = '#3b6b5e';
  for (let y = 13; y < 21; y++) { const hw = 12 + Math.round((y - 13) * 0.9); box(c, 45 - hw, y, hw * 2, 1, y % 2 ? roofC : roofL); }
  box(c, 32, 12, 26, 1, '#15141f'); box(c, 31, 10, 2, 3, '#15141f'); box(c, 57, 10, 2, 3, '#15141f');
  box(c, 37, 19, 1, 1, '#15141f'); box(c, 25, 19, 2, 1, roofC); box(c, 64, 19, 2, 1, roofC); dots(c, [[24,18],[66,18]], roofC);
  box(c, 32, 21, 26, 6, '#5a2420'); box(c, 32, 21, 26, 1, beam);
  for (let x = 33; x < 58; x += 4) { box(c, x, 22, 1, 5, col); box(c, x + 1, 23, 2, 3, win); }
  for (let y = 27; y < 33; y++) { const hw = 19 + Math.round((y - 27) * 1.1); box(c, 45 - hw, y, hw * 2, 1, y % 2 ? roofC : roofL); }
  box(c, 25, 26, 40, 1, '#15141f'); box(c, 18, 31, 2, 1, roofC); box(c, 70, 31, 2, 1, roofC); dots(c, [[17,30],[72,30]], roofC);
  box(c, 26, 33, 38, 10, '#5a2420'); box(c, 26, 33, 38, 1, beam); box(c, 26, 34, 38, 1, '#2f554b');
  for (let x = 27; x < 63; x += 4) { box(c, x, 35, 1, 8, col); box(c, x + 1, 36, 2, 5, win); box(c, x + 1, 38, 2, 1, '#c97a3c'); }
  // the wall with battlements, a string of little lanterns and the glowing gate
  box(c, 0, 46, 90, 42, '#5b4a42');
  for (let x = 0; x < 90; x += 5) box(c, x, 42, 3, 4, '#5b4a42');
  box(c, 0, 45, 90, 1, '#6d5a50'); box(c, 0, 46, 90, 1, '#3f332e');
  for (let y = 49; y < 88; y += 3) { box(c, 0, y, 90, 1, '#4a3c36'); for (let x = ((y / 3) & 1) * 3; x < 90; x += 6) box(c, x, y + 1, 1, 2, '#4a3c36'); }
  box(c, 0, 50, 90, 1, '#2b2228');
  for (let x = 3; x < 90; x += 7) { box(c, x, 51, 2, 3, '#e0412f'); dots(c, [[x, 51]], '#ff8a5c'); dots(c, [[x, 54]], '#f2c14e'); }
  disc(c, 45, 68, 8, '#1b1420'); box(c, 37, 68, 16, 20, '#1b1420');
  box(c, 39, 78, 12, 10, '#5a2c22'); box(c, 40, 82, 10, 6, '#a5532e'); box(c, 41, 85, 8, 3, '#d8813e');
  box(c, 36, 60, 18, 1, '#6d5a50');
  // plaza
  box(c, 0, 88, 90, 32, '#2e2634'); for (let y = 91; y < 120; y += 4) box(c, 0, y, 90, 1, '#262030');
  for (let y = 88; y < 120; y += 8) for (let x = (y & 8) ? 0 : 6; x < 90; x += 12) box(c, x, y, 1, 4, '#262030');
  c.fillStyle = 'rgba(255,170,90,.13)'; for (let y = 88; y < 120; y++) { const hw = 7 + Math.round((y - 88) * 0.45); c.fillRect(45 - hw, y, hw * 2, 1); }
  // a hire bike parked by the gate, and the cord of the palace lantern
  c.fillStyle = '#c9c2d6'; [[30,108],[42,108]].forEach(([x, y]) => { for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; c.fillRect(Math.round(x + Math.cos(a) * 3.5), Math.round(y + Math.sin(a) * 3.5), 1, 1); } });
  box(c, 31, 104, 10, 1, '#e0a43a'); box(c, 33, 105, 1, 3, '#e0a43a'); box(c, 36, 102, 1, 6, '#e0a43a'); box(c, 35, 101, 3, 1, '#2a2030'); box(c, 40, 101, 1, 4, '#e0a43a'); box(c, 39, 100, 3, 1, '#2a2030');
  box(c, 77, 0, 2, 14, '#2a1712');
  // roujiamo cart: crossbar for the sign, steamers, glass case, wheels
  box(c, 57, 76, 1, 24, '#3b2418'); box(c, 85, 76, 1, 24, '#3b2418'); box(c, 56, 76, 31, 1, '#3b2418');
  box(c, 62, 95, 9, 2, '#d2a25a'); box(c, 62, 97, 9, 3, '#b8873f'); box(c, 63, 93, 7, 2, '#d2a25a'); box(c, 64, 92, 5, 1, '#e6c27a');
  dots(c, [[64,90],[66,88],[67,91],[65,86]], 'rgba(255,255,255,.5)');
  box(c, 73, 95, 11, 5, '#9fc9d8'); dots(c, [[75,98],[78,98],[81,98],[76,97],[80,97]], '#e9c48a');
  box(c, 56, 100, 31, 2, '#c47b42'); box(c, 57, 102, 29, 8, '#7a4a2c'); for (let x = 59; x < 86; x += 5) box(c, x, 103, 1, 6, '#5d3720');
  disc(c, 62, 111, 2, '#1d1620'); disc(c, 81, 111, 2, '#1d1620'); dots(c, [[62,111],[81,111]], '#8a7a6a');
}
function drawPalaceLantern(c) { pxSprite(c, 16, 26, p => {
  const K = '#2a1712', G = '#f2c14e', g = '#b5862e', R = '#e0412f', r = '#a42a20', Y = '#ffb35c', T = '#d6372a';
  p(7,0,2,3,K);
  p(5,2,6,1,G); p(2,3,12,2,G); p(2,4,12,1,g); p(0,4,2,1,G); p(14,4,2,1,G); p(0,3,1,1,G); p(15,3,1,1,G);
  p(1,5,14,1,K);
  p(1,6,14,12,K); p(2,6,2,12,r); p(12,6,2,12,r); p(5,6,6,12,R); p(6,7,4,10,Y); p(5,6,6,1,'#ff7a52');
  p(1,18,14,1,K); p(2,19,12,1,G); p(4,20,8,1,g);
  p(1,19,1,5,T); p(14,19,1,5,T); p(1,24,1,1,G); p(14,24,1,1,G);
  p(7,21,2,1,G); p(7,22,2,4,T);
}); txt(c, LOCAL('福'), 0, -4, `20px ${PX}`, '#9b1f16'); }
function drawRoujiamo(c) { pxSprite(c, 26, 12, p => {
  p(4,-4,1,4,'#3b2418'); p(21,-4,1,4,'#3b2418');
  p(0,0,26,12,'#3b1a12'); p(1,1,24,10,'#e8b84a'); p(2,2,22,8,'#b8322a'); p(2,2,22,1,'#d24a3a'); p(2,9,22,1,'#8e241e');
}); txt(c, LOCAL('肉夹馍'), 0, 1, `20px ${PX}`, '#ffe08a'); }
function drawWarrior(c) { pxSprite(c, 16, 30, p => {
  const K = '#33241b', d = '#6b4e3b', cc = '#8f6c53', l = '#b8916f', A = '#7a5c48', a = '#5d4636';
  sil(p, [[6,0,4,2,d],[4,2,8,6,l],[6,8,4,1,cc],[3,9,10,7,A],[1,9,2,8,cc],[13,9,2,8,cc],[3,16,10,4,cc],[2,19,12,3,cc],[4,22,3,3,d],[9,22,3,3,d],[3,25,4,2,d],[9,25,4,2,d]], K);
  p(0,27,16,3,'#4a4552'); p(0,27,16,1,'#77707f'); p(1,29,14,1,'#3a3542');
  p(7,0,2,1,cc); p(4,2,8,1,cc);
  p(5,4,2,1,K); p(9,4,2,1,K); p(7,5,2,1,cc); p(5,6,6,1,d); p(7,7,2,1,cc);
  for (let y = 10; y < 15; y += 2) for (let x = 4 + (y % 4 ? 1 : 0); x < 12; x += 2) p(x, y, 1, 1, a);
  p(3,9,10,1,'#9a765c'); p(3,15,10,1,d);
  p(5,14,6,2,l); p(5,15,6,1,cc);
  p(11,9,2,7,a); p(13,9,2,8,d); p(11,16,2,6,d);
  p(3,19,1,3,l); p(8,16,1,6,d);
}); }
function drawSparrow(c) { pxSprite(c, 12, 10, p => {
  const K = '#2a1d16', B = '#9a6a3e', b = '#6b4426', w = '#efe0c4';
  sil(p, [[3,3,6,4,B],[7,1,3,4,B],[1,4,2,2,b],[3,6,5,2,w]], K);
  p(7,1,3,1,'#6b4426'); p(8,2,1,1,K); p(7,3,3,1,w); p(8,4,2,1,K); p(10,3,1,1,'#f2a33a');
  p(3,4,4,1,b); p(4,5,3,1,'#c79a62'); p(3,3,2,1,'#c79a62');
  p(4,8,1,2,'#c7743a'); p(7,8,1,2,'#c7743a');
}); }

/* ===== Level 3: Istanbul bazaar gate ===== */
const MOSAIC = ['#e2452f','#2f9fd8','#f2c14e','#3cbf7a','#a74fd0','#ff8a3d'];
function bgIstanbul(c) {
  bands(c, ['#2b3d6b','#3d4f7a','#5a5f86','#82688a','#ad7486','#d6857b','#ef9f73','#f6bc78'], 0, 36);
  dots(c, [[8,3],[19,7],[71,4],[84,9],[60,2]], '#fff3d0');
  const M = '#4a3a5c';
  for (let y = -9; y <= 0; y++) { const hw = Math.round(Math.sqrt(81 - y * y)); box(c, 45 - hw, 27 + y, hw * 2, 1, M); }
  [[34, 5], [56, 5]].forEach(([x, r]) => { for (let y = -r; y <= 0; y++) { const hw = Math.round(Math.sqrt(r * r - y * y)); box(c, x - hw, 31 + y, hw * 2, 1, M); } });
  box(c, 44, 15, 2, 3, M); box(c, 30, 27, 30, 9, M);
  [21, 28, 62, 69].forEach((x, i) => { const top = i % 3 ? 9 : 5; box(c, x, top, 2, 36 - top, M); box(c, x - 1, top + 9, 4, 1, M); box(c, x, top - 3, 2, 3, '#3a2c4a'); box(c, x + 1 - (i % 2), top - 5, 1, 2, '#3a2c4a'); });
  dots(c, [[38,30],[42,30],[48,30],[52,30],[45,31]], '#f6c66a');
  // facade: cornice, stone courses, the striped arch and the arcade behind it
  box(c, 0, 34, 90, 54, '#c9a77c'); box(c, 0, 34, 90, 2, '#7a5a40'); box(c, 0, 36, 90, 1, '#e6c99a');
  for (let y = 40; y < 88; y += 4) box(c, 0, y, 90, 1, '#b8946a');
  for (let y = 38; y < 88; y++) for (let x = 0; x < 90; x++) {
    const dx = x - 45, dy = y - 59, r = Math.sqrt(dx * dx + dy * dy);
    if ((dy < 0 && r < 21) || (dy >= 0 && Math.abs(dx) < 21)) {
      if (dy < 0 && r >= 18) { const k = Math.floor((Math.atan2(dy, dx) + Math.PI) / Math.PI * 14); c.fillStyle = k % 2 ? '#a8382c' : '#efdcb4'; c.fillRect(x, y, 1, 1); }
      else if (dy >= 0 && Math.abs(dx) >= 18) { c.fillStyle = (y >> 1) % 2 ? '#a8382c' : '#efdcb4'; c.fillRect(x, y, 1, 1); }
      else { c.fillStyle = dy < -8 ? '#3d2219' : '#5a3424'; c.fillRect(x, y, 1, 1); }
    }
  }
  for (let k = 0; k < 3; k++) { const r = 14 - k * 4, y0 = 62 + k * 2; c.fillStyle = ['#6e4130','#7d4c36','#8c573c'][k]; for (let y = -r; y <= 0; y++) { const hw = Math.round(Math.sqrt(r * r - y * y)); c.fillRect(45 - hw, y0 + y, 1, 1); c.fillRect(45 + hw - 1, y0 + y, 1, 1); } c.fillRect(45 - r, y0, 1, 26 - k * 2); c.fillRect(45 + r - 1, y0, 1, 26 - k * 2); }
  [[39,64,'#2f9fd8'],[51,64,'#e2452f'],[45,70,'#f2c14e'],[42,74,'#3cbf7a'],[48,74,'#a74fd0']].forEach(([x, y, col]) => { box(c, x, y - 2, 1, 2, '#2a1a12'); box(c, x - 1, y, 3, 2, col); });
  box(c, 27, 82, 36, 6, '#4a2a1e');
  // left shop: rugs hanging behind the kilim; right shop: spice cones and lokum trays
  box(c, 0, 40, 23, 36, '#6e3a28'); box(c, 0, 40, 3, 30, '#2a3d6b'); box(c, 21, 40, 2, 34, '#7b2a2a');
  for (let y = 70; y < 76; y += 2) box(c, 0, y, 3, 1, '#e6c99a');
  box(c, 0, 76, 23, 12, '#5a2f20'); box(c, 0, 76, 23, 1, '#8a5232');
  box(c, 67, 52, 23, 24, '#5a3424'); box(c, 67, 76, 23, 12, '#7a4a2c'); box(c, 67, 76, 23, 1, '#a8683c');
  [[69,'#c8321f'],[74,'#f2b230'],[79,'#e0731f'],[84,'#6a8f2a']].forEach(([x, col], i) => { for (let k = 0; k < 6; k++) box(c, x + (k >> 1), 75 - k, 4 - (k >> 1) * 1 - (k & 1), 1, col); box(c, x - 1, 76, 6, 1, '#d8c3a0'); });
  for (let x = 68; x < 89; x += 4) { box(c, x, 60, 3, 3, MOSAIC[(x >> 2) % 6]); box(c, x, 63, 3, 1, '#d8c3a0'); }
  for (let x = 68; x < 89; x += 3) { box(c, x, 67, 2, 2, ['#ffd1dc','#f6f1e1','#ffe7a3','#c9f0c0'][x % 4]); }
  box(c, 67, 65, 23, 1, '#3b2418'); box(c, 67, 70, 23, 1, '#3b2418');
  // floor: marble tiles, a rug for the cat, a low copper table for the tea
  box(c, 0, 88, 90, 32, '#d8c4a4'); for (let y = 92; y < 120; y += 6) box(c, 0, y, 90, 1, '#c2ab88'); for (let x = 3; x < 90; x += 9) box(c, x, 88, 1, 32, '#c2ab88');
  box(c, 3, 104, 36, 12, '#8e2a24'); box(c, 4, 105, 34, 10, '#b3322b'); box(c, 6, 107, 30, 6, '#2a3d6b'); for (let x = 8; x < 35; x += 4) box(c, x, 109, 2, 2, '#efdcb4');
  for (let x = 3; x < 39; x += 2) { box(c, x, 116, 1, 1, '#efdcb4'); box(c, x, 103, 1, 1, '#efdcb4'); }
  box(c, 59, 105, 22, 2, '#c9822e'); box(c, 60, 107, 20, 1, '#8a5520'); box(c, 63, 108, 2, 8, '#8a5520'); box(c, 75, 108, 2, 8, '#8a5520'); box(c, 66, 114, 8, 1, '#8a5520');
}
function drawMosaicLamp(c) { pxSprite(c, 14, 22, p => {
  const K = '#2a1a12', G = '#e8b84a', g = '#a87a2a';
  p(6,0,2,3,K); p(5,2,4,1,G); p(3,3,8,2,G); p(3,4,8,1,g);
  const rows = [6, 10, 12, 14, 14, 14, 14, 12, 10, 6];
  rows.forEach((w, i) => { const y = 5 + i, x0 = 7 - w / 2; for (let x = 0; x < w; x++) p(x0 + x, y, 1, 1, i % 3 === 2 ? G : MOSAIC[Math.floor(hsh((x0 + x) * 3 + i * 7) * 6)]); });
  p(2,7,1,4,'#fff6d8'); p(3,6,1,2,'#fff6d8');
  p(4,15,6,1,G); p(5,16,4,1,g); p(6,17,2,2,G); p(6,19,2,1,'#e2452f'); p(5,20,4,2,'#e2452f'); p(6,21,2,1,'#a42a20');
}); }
function drawKilim(c) { pxSprite(c, 18, 26, p => {
  const R = '#b3322b', B = '#2a3d6b', Cr = '#efdcb4', O = '#e8892e', K = '#3a1a14';
  p(0,0,18,1,'#5a3424'); p(3,1,1,1,K); p(14,1,1,1,K);
  p(1,2,16,21,B);
  for (let y = 3; y < 22; y++) for (let x = 3; x < 15; x++) {
    const d = Math.min(Math.abs(x - 8.5) + Math.abs(y - 7.5), Math.abs(x - 8.5) + Math.abs(y - 17.5));
    p(x, y, 1, 1, d < 1.5 ? K : d < 3 ? O : d < 4 ? Cr : d < 5.5 ? R : (x + y) % 4 ? R : '#8e2a24');
  }
  for (let y = 3; y < 22; y += 3) { p(1, y, 1, 1, Cr); p(16, y, 1, 1, Cr); }
  for (let x = 1; x < 17; x += 2) { p(x, 23, 1, 2, Cr); }
}); }
function drawLokum(c) { pxSprite(c, 24, 12, p => {
  p(-2,-1,4,2,'#2a1a12'); p(0,0,1,3,'#2a1a12'); p(23,0,1,3,'#2a1a12'); p(0,-1,24,1,'#2a1a12');
  p(0,2,24,10,'#2a1a12'); p(1,3,22,8,'#e8b84a'); p(2,4,20,6,'#1f8a8a'); p(2,4,20,1,'#3fb3ad'); p(2,9,20,1,'#156666');
}); txt(c, LOCAL('LOKUM'), 0, 6, `17px ${PX}`, '#fff1cf'); }
function drawCayTray(c) { pxSprite(c, 18, 14, p => {
  const G = '#d9a441', g = '#9a6a24', K = '#3a2414', T = '#b8401f', Gl = '#f4ead8';
  p(8,0,2,1,G); p(7,1,1,1,G); p(10,1,1,1,G); p(8,2,2,1,G);
  for (let k = 0; k < 8; k++) { p(7 - k, 3 + k, 1, 1, g); p(10 + k, 3 + k, 1, 1, g); }
  [3, 8, 13].forEach(x => { p(x - 1, 5, 4, 1, Gl); p(x - 1, 6, 4, 2, T); p(x, 8, 2, 1, T); p(x - 1, 9, 4, 1, T); p(x - 1, 6, 1, 1, '#ffd2a6'); p(x - 1, 10, 4, 1, '#e2452f'); });
  p(0,11,18,2,G); p(0,11,18,1,'#f2c86a'); p(1,13,16,1,g);
}); }
function drawStreetCat(c, a) { const tail = Math.round(Math.sin(a.t * 3) * a.live); pxSprite(c, 22, 13, P => {
  const p = (x, y, w, h, col) => P(x, y + 1, w, h, col);
  const K = '#3a2414', O = '#e89a4a', o = '#b8692e', Wt = '#fbf3e4', Pk = '#f49ab0';
  sil(p, [[4,5,13,5,O],[15,1,6,6,O],[15,0,2,1,O],[19,0,2,1,O],[1,7 + tail,4,2,O],[0,5 + tail,2,3,O],[13,10,6,1,O],[5,10,4,1,O]], K);
  p(17,4,3,3,Wt); p(15,7,5,3,Wt); p(18,4,1,1,Pk); p(16,3,1,1,K); p(19,3,1,1,K); p(15,0,1,1,Pk); p(20,0,1,1,Pk);
  [6, 9, 12].forEach(x => p(x, 5, 1, 3, o)); p(0,5 + tail,2,1,o);
}); }

/* ===== Level 4: Prague, the Old Town Hall clock ===== */
function bgPrague(c) {
  bands(c, ['#2c3a6e','#3b4a7e','#55598a','#776491','#9c6f92','#c47d8c','#e3928a','#f2ae8c'], 0, 64);
  dots(c, [[6,4],[24,9],[79,3],[86,14],[15,16]], '#fff3d0');
  // Tyn church towers behind the right-hand houses
  const D = '#2e2a44';
  [[68, 4], [81, 7]].forEach(([x, top]) => {
    box(c, x - 4, top + 14, 8, 40, D);
    for (let y = 0; y < 14; y++) { const hw = Math.round(y * 0.3); box(c, x - hw, top + y, hw * 2 + 1, 1, D); }
    [[-4, 8], [4, 8], [-3, 4], [3, 4]].forEach(([dx, dy]) => { box(c, x + dx, top + dy, 1, 8, D); dots(c, [[x + dx, top + dy - 1]], '#e8b84a'); });
    dots(c, [[x, top - 1]], '#e8b84a'); box(c, x - 1, top + 22, 1, 3, '#f6c66a'); box(c, x + 1, top + 22, 1, 3, '#f6c66a');
  });
  // the Old Town Hall tower
  const S = '#857a72', s = '#6e645e', L = '#a89c8a';
  box(c, 30, 14, 32, 106, S);
  for (let y = 18; y < 120; y += 4) box(c, 30, y, 32, 1, s);
  for (let y = 0; y < 12; y++) { const hw = 2 + Math.round(y * 1.25); box(c, 46 - hw, y + 1, hw * 2, 1, y % 2 ? '#3b3550' : '#463f5e'); }
  [31, 59].forEach(x => { box(c, x, 6, 2, 9, '#3b3550'); dots(c, [[x, 5], [x + 1, 4]], '#3b3550'); dots(c, [[x + 1, 3]], '#e8b84a'); });
  dots(c, [[46, 0]], '#e8b84a');
  box(c, 29, 13, 34, 1, '#2a2433'); box(c, 30, 14, 32, 4, '#5a524e'); for (let x = 31; x < 61; x += 3) box(c, x, 15, 2, 2, '#f6c66a');
  box(c, 29, 18, 34, 1, '#2a2433');
  // gothic frame of the astronomical clock, the calendar dial and the little statues
  box(c, 32, 31, 28, 70, L); box(c, 33, 32, 26, 68, '#5d5048');
  for (let y = 0; y < 6; y++) { const hw = 14 - y * 2; box(c, 46 - hw, 31 - y, hw * 2, 1, L); }
  box(c, 45, 22, 2, 4, L); dots(c, [[45,21]], '#e8b84a');
  box(c, 33, 46, 26, 1, '#3a302b'); box(c, 33, 72, 26, 1, '#3a302b');
  disc(c, 46, 87, 10, '#e8b84a'); disc(c, 46, 87, 9, '#2a2433');
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; box(c, Math.round(46 + Math.cos(a) * 6.5), Math.round(87 + Math.sin(a) * 6.5), 2, 2, MOSAIC[k % 6]); }
  disc(c, 46, 87, 3, '#e8b84a'); disc(c, 46, 87, 2, '#c8321f');
  box(c, 34, 52, 2, 6, '#e6dccb'); box(c, 34, 50, 2, 2, '#e8c39a'); box(c, 56, 52, 2, 6, '#f4f1ea'); box(c, 56, 50, 2, 2, '#f4f1ea'); dots(c, [[56,51]], '#2a2433');
  box(c, 34, 78, 2, 6, '#7b2a2a'); box(c, 34, 76, 2, 2, '#e8c39a'); box(c, 56, 78, 2, 6, '#2f5d8a'); box(c, 56, 76, 2, 2, '#e8c39a');
  // left: pink baroque house with a puppet shop
  const Pk = '#e8a0a8', pk = '#c9808a';
  box(c, 0, 30, 30, 72, Pk);
  for (let y = 0; y < 10; y++) { const hw = [3, 4, 4, 5, 7, 8, 8, 10, 13, 15][y]; box(c, 15 - hw, 20 + y, hw * 2, 1, Pk); }
  box(c, 12, 16, 6, 4, Pk); disc(c, 15, 16, 3, Pk); box(c, 0, 29, 30, 1, '#f6d6da'); box(c, 0, 44, 30, 1, pk); box(c, 0, 58, 30, 1, pk);
  [[4, 34], [12, 34], [20, 34], [12, 22]].forEach(([x, y]) => { box(c, x, y, 6, 8, '#f6eee6'); box(c, x + 1, y + 1, 4, 6, '#3a4466'); box(c, x + 1, y + 4, 4, 1, '#f6eee6'); dots(c, [[x + 1, y + 1]], '#f6c66a'); });
  box(c, 0, 76, 30, 26, '#c9808a'); box(c, 3, 80, 22, 18, '#2a2433'); box(c, 4, 81, 20, 16, '#f2b45e');
  [[6, '#c8321f'], [11, '#2f9fd8'], [16, '#3cbf7a'], [21, '#a74fd0']].forEach(([x, col]) => { box(c, x, 82, 1, 4, '#3b2418'); box(c, x - 1, 86, 3, 2, '#e8c39a'); box(c, x - 1, 88, 3, 5, col); });
  box(c, 6, 54, 16, 2, '#2a2433'); box(c, 6, 52, 1, 4, '#2a2433'); box(c, 21, 56, 1, 2, '#2a2433');
  // right: yellow house front with a beer-sign bracket
  const Yl = '#efd27a', yl = '#d4b45c';
  box(c, 62, 46, 28, 56, Yl); box(c, 62, 46, 28, 2, '#b84a2e'); box(c, 64, 42, 24, 4, '#b84a2e'); box(c, 70, 38, 12, 4, '#b84a2e');
  for (let y = 52; y < 76; y += 12) [66, 74, 82].forEach(x => { box(c, x, y, 5, 7, '#f6eee6'); box(c, x + 1, y + 1, 3, 5, '#3a4466'); dots(c, [[x + 1, y + 1]], '#f6c66a'); });
  box(c, 62, 76, 28, 26, yl); for (let x = 64; x < 90; x += 9) { box(c, x, 80, 7, 22, '#4a3424'); box(c, x + 1, 81, 5, 4, '#f2b45e'); }
  box(c, 63, 59, 3, 2, '#2a2433'); box(c, 64, 61, 20, 1, '#2a2433');
  // cobbles
  box(c, 0, 102, 90, 18, '#6a6276'); for (let y = 102; y < 120; y += 3) for (let x = ((y / 3) & 1) * 2; x < 90; x += 4) { box(c, x, y, 3, 2, '#7b7387'); dots(c, [[x, y]], '#8d85a0'); }
  c.fillStyle = 'rgba(255,190,120,.12)'; c.fillRect(0, 100, 30, 20); c.fillRect(62, 100, 28, 20);
}
function drawOrloj(c) { pxSprite(c, 24, 24, p => {
  pdisc(p, 12, 12, 12, '#2a2433'); pdisc(p, 12, 12, 11, '#3a2f3e');
  for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; p(Math.round(11.5 + Math.cos(a) * 10.5), Math.round(11.5 + Math.sin(a) * 10.5), 1, 1, '#e8b84a'); }
  pdisc(p, 12, 12, 9, '#3b2a26');
  for (let y = 3; y < 12; y++) { const hw = Math.round(Math.sqrt(81 - (y - 12) * (y - 12))); p(12 - hw, y, hw * 2, 1, y < 7 ? '#3a7bd5' : '#5b95e0'); }
  p(3, 12, 18, 1, '#d9773a'); p(4, 13, 16, 1, '#b85a2e');
  for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2; p(Math.round(11.5 + Math.cos(a) * 5.5), Math.round(9.5 + Math.sin(a) * 5.5), 1, 1, '#f2c14e'); }
  p(11, 2, 2, 10, '#f2c14e'); p(10, 3, 4, 2, '#f2c14e'); p(11, 1, 2, 1, '#fff1b0');
  pdisc(p, 12, 12, 2, '#f2c14e'); p(11, 11, 2, 2, '#fff1b0');
  p(15, 16, 3, 3, '#9a9aa8'); p(15, 16, 2, 2, '#e6e6ee');
}); }
function drawApostleWin(c, robe) { pxSprite(c, 10, 12, p => {
  const F = '#c9b99a', f = '#8a7a62';
  p(3,0,4,1,F); p(2,1,6,1,F); p(1,2,8,1,F); p(0,3,10,9,F);
  p(4,1,2,1,'#24304d'); p(3,2,4,1,'#24304d'); p(2,3,6,8,'#24304d');
  p(4,3,2,1,'#f2c14e'); p(4,4,2,2,'#e8c39a'); p(3,6,4,5,robe); p(3,6,1,5,'#00000033');
  p(0,11,10,1,f); p(9,3,1,8,f);
}); }
function drawPuppet(c) {
  pxSprite(c, 14, 28, p => {
    const K = '#2a1a12', R = '#d8343a', Y = '#f2c14e', S = '#f2c7a0', B = '#2f5d8a';
    p(1,0,12,1,'#8a5a32'); p(6,-1,2,3,'#8a5a32');
    sil(p, [[5,8,4,1,R],[4,9,6,2,R],[5,11,4,4,S],[4,15,6,6,Y],[2,15,2,5,R],[10,15,2,5,R],[4,21,2,5,B],[8,21,2,5,B]], K);
    p(9,7,2,1,R); p(11,8,1,1,Y); p(4,11,1,1,R);
    p(6,12,1,1,K); p(8,12,1,1,K); p(6,14,3,1,'#b85a4a'); p(5,13,1,1,'#f49ab0'); p(9,13,1,1,'#f49ab0');
    p(7,15,1,6,R); p(4,18,6,1,K); p(2,20,2,1,S); p(10,20,2,1,S); p(3,26,3,1,K); p(8,26,3,1,K);
  });
  c.strokeStyle = 'rgba(240,230,210,.75)'; c.lineWidth = 0.8; c.beginPath();
  [[-24, -12], [-20, 26], [24, 26], [0, -20]].forEach(([x, y]) => { c.moveTo(x < 0 ? -22 : x > 0 ? 22 : 0, -56); c.lineTo(x, y); });
  c.stroke();
}
function drawPivo(c) { pxSprite(c, 20, 14, p => {
  p(9,0,2,2,'#2a2433'); p(0,1,20,1,'#2a2433'); p(2,2,1,2,'#2a2433'); p(17,2,1,2,'#2a2433');
  p(1,4,18,10,'#2a2433'); p(2,5,16,8,'#f6e9c8'); p(2,5,16,1,'#fff6de');
  p(13,7,4,5,'#f2b230'); p(13,6,4,1,'#ffffff'); p(12,6,1,1,'#ffffff'); p(17,8,1,3,'#c9c2b0'); p(14,8,1,3,'#ffd36a');
}); txt(c, LOCAL('PIVO'), -9, 9, `14px ${PX}`, '#3a1a12'); }

/* ===== Level 5: Bukchon hanok village, Seoul ===== */
function hanokRoof(c, x0, x1, ridge, eave, lift, col, hi, soffit) {
  const mid = (x0 + x1) / 2, half = (x1 - x0) / 2;
  for (let x = x0; x < x1; x++) {
    const u = (x - mid) / half, up = Math.round(u * u * lift), top = ridge - Math.round(u * u * lift * 0.5), bot = eave - up;
    box(c, x, top, 1, bot - top, (x & 1) ? col : hi); box(c, x, bot - 1, 1, 1, '#9aa0aa');
    if (soffit) { box(c, x, bot, 1, soffit - bot, '#4a2e1c'); if (x % 3 === 0) box(c, x, bot, 1, 1, '#d8c39a'); }
  }
  for (let x = x0 + 2; x < x1 - 2; x++) { const u = (x - mid) / half; box(c, x, ridge - 1 - Math.round(u * u * lift * 0.5), 1, 2, '#2a2d33'); }
  dots(c, [[x0 + 1, ridge - 2 - Math.round(lift * 0.4)], [x1 - 2, ridge - 2 - Math.round(lift * 0.4)]], '#2a2d33');
}
function bgSeoul(c) {
  bands(c, ['#6fbbe9','#7cc3ec','#8bcbef','#9bd3f1','#acdaf2','#bde1f2','#cde7f1'], 0, 58);
  [[8, 8, 10], [30, 4, 8], [52, 12, 7]].forEach(([x, y, w]) => { box(c, x, y, w, 2, '#ffffff'); box(c, x + 2, y - 1, w - 4, 1, '#ffffff'); box(c, x + 1, y + 2, w - 2, 1, '#e6f2f8'); });
  for (let x = 40; x < 90; x++) { const h = 12 + Math.round(Math.sin((x - 40) / 50 * Math.PI) * 10); box(c, x, 46 - h, 1, h + 14, x % 3 ? '#6f9a8a' : '#678f80'); }
  box(c, 71, 12, 2, 22, '#e6ecef'); box(c, 70, 18, 4, 3, '#e6ecef'); box(c, 69, 19, 6, 1, '#b8c2c8'); box(c, 72, 6, 1, 6, '#c8d0d6'); box(c, 71, 32, 2, 2, '#b8c2c8');
  box(c, 0, 46, 90, 14, '#7f9a7a');
  [[0, 44], [17, 45], [36, 43], [55, 45], [73, 44]].forEach(([x, y]) => { box(c, x + 2, y + 4, 12, 5, '#e8dfcc'); box(c, x + 5, y + 5, 3, 3, '#8a5a32'); box(c, x + 10, y + 5, 2, 4, '#6b4226'); hanokRoof(c, x, x + 16, y, y + 4, 2, '#4a4f58', '#5a606a'); });
  [[-6, 52], [10, 51], [28, 52], [47, 51], [65, 52], [82, 51]].forEach(([x, y]) => { box(c, x + 2, y + 4, 12, 5, '#efe6d2'); box(c, x + 4, y + 5, 3, 3, '#8a5a32'); hanokRoof(c, x, x + 17, y, y + 4, 2, '#434850', '#535962'); });
  // the foreground hanok: big curved roof with its rafters, wooden frame, stone base
  hanokRoof(c, -6, 96, 61, 71, 6, '#3d4148', '#4f545d', 72);
  box(c, 0, 70, 90, 2, '#6b4226'); box(c, 0, 72, 90, 2, '#8a5a32');
  for (let x = 2; x < 90; x += 4) box(c, x, 72, 2, 1, '#c8432e');
  box(c, 0, 74, 90, 30, '#efe8da');
  [5, 44, 84].forEach(x => box(c, x, 74, 3, 30, '#6b4226'));
  box(c, 8, 74, 36, 26, '#5a3a22'); box(c, 47, 96, 37, 1, '#8a5a32'); box(c, 47, 84, 37, 1, '#d8cdb8');
  box(c, 0, 100, 90, 4, '#8a5a32'); box(c, 0, 104, 90, 9, '#a9a49a');
  for (let x = 0; x < 90; x += 6) box(c, x + ((x / 6) & 1) * 3, 104, 1, 9, '#8f8a80'); box(c, 0, 108, 90, 1, '#8f8a80');
  box(c, 0, 113, 90, 7, '#c9b48e'); for (let x = 2; x < 90; x += 5) dots(c, [[x, 115 + (x % 3)]], '#b39d77');
  box(c, 52, 110, 34, 3, '#7d786f'); box(c, 52, 110, 34, 1, '#a9a49a');
  dots(c, [[18,117],[19,116],[20,117]], '#e8556b'); dots(c, [[19,117]], '#3cbf7a');
}
function drawHanokDoor(c) { pxSprite(c, 14, 22, p => {
  const F = '#7a4a2c', Pp = '#f4ead2', L = '#a8794c';
  p(0,0,14,22,F); p(1,1,12,15,Pp);
  for (let x = 3; x < 13; x += 3) p(x, 1, 1, 15, L);
  for (let y = 3; y < 16; y += 3) p(1, y, 12, 1, L);
  p(4,6,6,4,Pp); p(4,6,6,1,L); p(4,9,6,1,L); p(4,6,1,4,L); p(9,6,1,4,L);
  p(1,17,12,4,'#8a5a32'); p(2,18,10,2,'#6b4226');
  p(0,0,14,1,'#5a3420'); p(0,21,14,1,'#5a3420');
}); }
function drawTeaSign(c) { pxSprite(c, 20, 11, p => {
  p(3,-3,1,3,'#3b2418'); p(16,-3,1,3,'#3b2418');
  p(0,0,20,11,'#3b2418'); p(1,1,18,9,'#a8743e'); p(2,2,16,7,'#8a5a32'); p(2,2,16,1,'#b8844a');
}); txt(c, LOCAL('찻집'), 0, 1, `bold 19px "Noto Sans KR", ${PX}`, '#fff1cf'); }
function drawChorong(c) { pxSprite(c, 10, 20, p => {
  const K = '#2a1a12';
  p(4,0,2,2,K); p(2,2,6,1,K); p(1,3,8,1,'#8a5a32');
  p(1,4,8,6,'#2f5fb8'); p(1,10,8,6,'#d8343a'); p(3,5,4,10,'#ffd27a'); p(3,5,4,5,'#9fc2f0'); p(3,10,4,5,'#ff8a6a');
  p(1,4,1,12,K); p(8,4,1,12,K); p(1,9,8,1,K);
  p(1,16,8,1,'#8a5a32'); p(4,17,2,1,'#f2c14e'); p(4,18,2,2,'#d8343a');
}); }
function drawMagpie(c) { pxSprite(c, 16, 12, p => {
  const K = '#161a24', Bk = '#252a38', Bl = '#3a5fa8', Wt = '#f4f4f0';
  sil(p, [[4,4,7,4,Bk],[10,1,4,4,Bk],[1,5,3,2,Bl],[0,6,2,1,Bl],[6,7,4,2,Wt]], K);
  p(14,2,2,1,'#3a3f4a'); p(12,2,1,1,'#f4f4f0'); p(5,4,4,1,Wt); p(5,5,4,1,Bl); p(2,5,2,1,'#5a85d0');
  p(7,10,1,2,'#c9a06a'); p(9,10,1,2,'#c9a06a');
}); }
function drawOnggi(c) { pxSprite(c, 26, 15, p => {
  const jar = (cx, top, w, h, hw) => {
    for (let y = 0; y < h; y++) { const t = y / (h - 1), ww = Math.round(w * (0.62 + 0.38 * Math.sin(Math.PI * (0.15 + t * 0.85)))); p(cx - (ww >> 1), top + y, ww, 1, '#5a3a24'); p(cx - (ww >> 1), top + y, 1, 1, '#2a1a12'); p(cx - (ww >> 1) + ww - 1, top + y, 1, 1, '#2a1a12'); }
    p(cx - (hw >> 1), top - 2, hw, 2, '#4a2e1c'); p(cx - (hw >> 1) + 1, top - 3, hw - 2, 1, '#6e4a30'); p(cx - 1, top - 4, 2, 1, '#6e4a30');
    p(cx - (w >> 2), top + 2, 1, h - 5, '#9a6a48'); p(cx - (w >> 1) + 1, top + h - 1, w - 2, 1, '#2a1a12');
    p(cx - (w >> 1) + 2, top + 4, w - 4, 1, '#6e4a30');
  };
  jar(5, 7, 9, 8, 6); jar(13, 4, 12, 11, 8); jar(21, 7, 9, 8, 6);
}); }

/* ===== Level 6: the blue lanes of Chefchaouen ===== */
function bgChaouen(c) {
  bands(c, ['#8fd0f5','#a5d9f5','#bde3f3','#d4ebef'], 0, 22);
  for (let x = 20; x < 72; x++) { const h = Math.round(9 - Math.abs(x - 46) * 0.32 + Math.sin(x * 0.7) * 1.2); box(c, x, 22 - h, 1, h, x % 4 ? '#8a8f6a' : '#7a8060'); }
  box(c, 0, 20, 90, 4, '#a8b58a');
  const B1 = '#3f7fd0', B2 = '#5b9ae2', B3 = '#7ab4ee', B4 = '#2f66b8', T = '#a8d0f5', Rz = '#3a74c2';
  // back wall with an arch passage, side walls of the lane, stairs climbing to it
  box(c, 26, 18, 38, 44, B3); disc(c, 45, 34, 7, '#24508f'); box(c, 38, 34, 14, 28, '#24508f'); box(c, 40, 46, 10, 16, '#1d3f75');
  box(c, 26, 18, 38, 2, '#f4f1ea');
  box(c, 30, 62, 30, 34, Rz); for (let y = 62, k = 0; y < 96; k++) { const h = 2 + (k >> 1); box(c, 30, y, 30, 1, T); box(c, 30, y + 1, 30, h - 1, k % 2 ? Rz : '#346cbc'); y += h; }
  box(c, 45, 18, 1, 4, '#2a2433');
  for (let y = 18; y < 96; y++) { const e = Math.max(0, Math.round((y - 58) * 0.36)); box(c, 26 - e, y, 4 + e, 1, B4); box(c, 60, y, 4 + e, 1, B2); }
  // front walls
  box(c, 0, 8, 26, 88, B1); box(c, 0, 8, 26, 2, '#f4f1ea'); for (let y = 14; y < 96; y += 7) box(c, 0, y, 26, 1, '#3a76c4');
  box(c, 64, 12, 26, 84, B2); box(c, 64, 12, 26, 2, '#f4f1ea'); for (let y = 18; y < 96; y += 7) box(c, 64, y, 26, 1, '#5592da');
  for (let i = 0; i < 40; i++) { const x = Math.floor(hsh(i) * 90), y = 12 + Math.floor(hsh(i + 50) * 80); if (x < 26 || x >= 64) dots(c, [[x, y]], x < 26 ? '#4a8ad8' : '#6aa6e8'); }
  // window behind the shutters, pots on the left wall, a doorstep
  box(c, 70, 22, 9, 16, '#1d3f75'); for (let x = 71; x < 79; x += 2) box(c, x, 22, 1, 16, '#2a2433'); box(c, 70, 29, 9, 1, '#2a2433'); box(c, 69, 38, 11, 1, '#f4f1ea');
  [[6, 44, '#e2452f'], [16, 44, '#f4f1ea'], [8, 84, '#e8892e']].forEach(([x, y, col]) => { box(c, x, y + 3, 6, 5, col); box(c, x + 1, y + 8, 4, 1, col); box(c, x - 1, y + 1, 8, 2, '#3a9a4a'); dots(c, [[x, y], [x + 3, y - 1], [x + 6, y]], '#e2455f'); box(c, x + 2, y + 4, 2, 2, '#ffffff55'); });
  box(c, 5, 80, 18, 2, '#e8dfcc');
  // the lowest steps run across the whole lane, with a sleeping cat on one
  for (let k = 0; k < 4; k++) { const y = 96 + k * 6; box(c, 0, y, 90, 1, T); box(c, 0, y + 1, 90, 5, k % 2 ? Rz : '#3f7cc8'); }
  box(c, 10, 105, 7, 3, '#f4f1ea'); box(c, 15, 104, 3, 2, '#f4f1ea'); dots(c, [[15,103],[17,103]], '#f4f1ea'); box(c, 8, 107, 3, 1, '#f4f1ea'); dots(c, [[11,106],[13,106]], '#c9c2b8');
}
function drawChaouenDoor(c) { pxSprite(c, 16, 26, p => {
  const F = '#f4f1ea', D = '#2a4fa8', d = '#1d3a80', G = '#e8b84a';
  [6, 10, 12, 14].forEach((w, y) => p(8 - w / 2, y, w, 1, F)); p(0, 4, 16, 22, F);
  [4, 8, 10].forEach((w, y) => p(8 - w / 2, y + 1, w, 1, D)); p(2, 4, 12, 22, D);
  p(7, 2, 2, 24, d); p(2, 4, 12, 1, d);
  for (let y = 7; y < 25; y += 4) for (let x = 3; x < 14; x += 3) if (x !== 6 && x !== 9) p(x, y, 1, 1, G);
  p(10, 13, 2, 3, G); p(10, 16, 2, 1, '#a87a2a'); p(4, 14, 1, 2, G);
  p(0, 25, 16, 1, '#c9c2b8');
}); }
function drawShutter(c, flip) { pxSprite(c, 9, 16, p => {
  const S = '#2a9d8f', s = '#1d7a70', K = '#16443f';
  p(0, 0, 9, 16, K); p(1, 1, 7, 14, S);
  for (let y = 2; y < 15; y += 2) p(1, y, 7, 1, s);
  p(flip ? 7 : 1, 1, 1, 14, '#46b8a9');
  p(flip ? 0 : 8, 3, 1, 2, '#2a2433'); p(flip ? 0 : 8, 11, 1, 2, '#2a2433');
}); }
function drawBrassLantern(c) { pxSprite(c, 10, 18, p => {
  const G = '#e0a83a', g = '#a87a2a', K = '#4a3014', Y = '#ffe08a';
  p(4, 0, 2, 2, K); p(3, 2, 4, 1, G); p(2, 3, 6, 2, G); p(1, 5, 8, 1, g);
  p(1, 6, 8, 8, K); for (let y = 7; y < 14; y += 2) for (let x = 2 + (y >> 1) % 2; x < 9; x += 2) p(x, y, 1, 1, Y);
  p(1, 6, 1, 8, G); p(8, 6, 1, 8, G); p(1, 14, 8, 1, g); p(2, 15, 6, 1, G); p(4, 16, 2, 2, G);
}); }
function drawPotFlowers(c) { pxSprite(c, 12, 12, p => {
  const K = '#1d3a80';
  p(2, 5, 8, 6, K); p(3, 5, 6, 5, '#f2c14e'); p(3, 7, 6, 1, '#2f66b8'); p(4, 10, 4, 1, K); p(3, 5, 1, 4, '#ffe9a0');
  p(1, 3, 10, 2, '#3a9a4a'); p(0, 4, 2, 2, '#2f7a3a'); p(10, 4, 2, 3, '#2f7a3a');
  [[2, 1], [5, 0], [8, 1], [10, 2]].forEach(([x, y]) => { p(x, y, 2, 2, '#e2455f'); p(x, y, 1, 1, '#ff8aa0'); });
}); }
function drawPlate(c) { pxSprite(c, 12, 12, p => {
  pdisc(p, 6, 6, 6, '#2a2433'); pdisc(p, 6, 6, 5, '#f4f1ea');
  for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; p(Math.round(5.5 + Math.cos(a) * 4), Math.round(5.5 + Math.sin(a) * 4), 1, 1, k % 2 ? '#2f66b8' : '#e8b84a'); }
  p(5, 3, 2, 6, '#2f66b8'); p(3, 5, 6, 2, '#2f66b8'); p(5, 5, 2, 2, '#e2452f');
}); }
function drawDonkey(c) { pxSprite(c, 24, 20, p => {
  const K = '#2e2a33', Gy = '#9a96a4', g = '#77738a', Lt = '#e2e0e8';
  sil(p, [[4, 7, 13, 7, Gy], [15, 4, 4, 6, Gy], [16, 3, 6, 5, Gy], [20, 6, 3, 3, Lt], [17, 0, 1, 3, Gy], [19, 0, 1, 3, Gy], [5, 14, 2, 4, Gy], [8, 14, 2, 4, Gy], [13, 14, 2, 4, Gy], [16, 14, 2, 4, Gy], [2, 8, 2, 1, Gy], [1, 9, 1, 4, g]], K);
  p(16, 3, 4, 1, g); p(14, 4, 2, 4, '#4a4552'); p(19, 4, 1, 1, K); p(22, 7, 1, 1, K); p(5, 12, 11, 2, Lt);
  p(6, 5, 9, 5, '#d8343a'); p(6, 6, 9, 1, '#f2c14e'); p(6, 8, 9, 1, '#2a9d8f'); p(6, 5, 9, 1, '#a3241b');
  p(7, 10, 4, 3, '#e8892e'); p(7, 10, 4, 1, '#a85a20');
  [5, 8, 13, 16].forEach(x => p(x, 18, 2, 1, K));
  p(17, 1, 1, 1, '#f49ab0'); p(19, 1, 1, 1, '#f49ab0');
}); }

/* ===== Level 7: a Venice canal ===== */
function gothicWin(c, x, y, w, h, frame, glass) {
  box(c, x, y + 2, w, h - 2, frame); box(c, x + 1, y + 1, w - 2, 1, frame); dots(c, [[x + (w >> 1), y], [x + (w >> 1) - (w % 2 ? 0 : 1), y]], frame);
  box(c, x + 1, y + 3, w - 2, h - 4, glass); box(c, x + 2, y + 2, w - 4, 1, glass);
}
function bgVenice(c) {
  bands(c, ['#7fb2e0','#94bfe4','#acccE6'.toLowerCase(),'#c6d7e4','#dcdfe0','#efdccb'], 0, 34);
  [[60, 6, 9], [14, 4, 7]].forEach(([x, y, w]) => { box(c, x, y, w, 2, '#ffffff'); box(c, x + 2, y - 1, w - 4, 1, '#ffffff'); });
  // a bell tower in the distance and the back houses
  box(c, 48, 6, 6, 32, '#c98a6a'); box(c, 48, 14, 6, 4, '#5a3a2a'); box(c, 49, 15, 1, 3, '#e6dccb'); box(c, 52, 15, 1, 3, '#e6dccb'); for (let y = 0; y < 5; y++) box(c, 51 - (y >> 1), 1 + y, 1 + (y >> 1) * 2, 1, '#6a8a6a'); box(c, 47, 13, 8, 1, '#e6dccb');
  box(c, 24, 30, 42, 40, '#f0d8a0'); box(c, 24, 30, 42, 2, '#c8643a'); for (let x = 27; x < 64; x += 6) gothicWin(c, x, 36, 3, 6, '#f6eee0', '#3a4a5a'); for (let x = 27; x < 64; x += 6) gothicWin(c, x, 48, 3, 6, '#f6eee0', '#3a4a5a');
  [[30, 25], [58, 26]].forEach(([x, y]) => { box(c, x, y, 2, 5, '#a8543a'); box(c, x - 1, y - 2, 4, 2, '#a8543a'); box(c, x - 2, y - 3, 6, 1, '#7a3a2a'); });
  // water
  box(c, 0, 66, 90, 54, '#2f7f86');
  for (let i = 0; i < 70; i++) { const x = Math.floor(hsh(i * 3) * 86), y = 68 + Math.floor(hsh(i * 7 + 1) * 50); box(c, x, y, 2 + Math.floor(hsh(i) * 4), 1, i % 3 ? '#4f9ea2' : '#7cc0bc'); }
  for (let y = 68; y < 96; y += 2) { box(c, 2 + (y % 4), y, 8, 1, '#a8603e'); box(c, 78 - (y % 4), y, 8, 1, '#c98a8a'); }
  // the bridge, with its arch reflected
  for (let x = 20; x < 70; x++) { const u = (x - 45) / 25, r = Math.round((1 - u * u) * 3); box(c, x, 51 - r, 1, 15 + r, '#e6dccb'); box(c, x, 54 - r, 1, 1, '#cfc2ac'); if (x % 3 === 1) box(c, x, 52 - r, 1, 2, '#cfc2ac'); box(c, x, 57 - r, 1, 1, '#d6cab4'); }
  for (let x = 26; x < 64; x++) { const u = (x - 45) / 19, h = Math.round(Math.sqrt(Math.max(0, 1 - u * u)) * 9); box(c, x, 66 - h, 1, h, '#1d4a50'); box(c, x, 66, 1, Math.round(h * 0.7), '#25606a'); }
  box(c, 20, 63, 6, 3, '#cfc2ac'); box(c, 64, 63, 6, 3, '#cfc2ac');
  // left house: terracotta, gothic windows, a window for the shutters
  box(c, 0, 8, 24, 88, '#d9774a'); box(c, 0, 8, 24, 2, '#a8543a'); box(c, 0, 92, 24, 4, '#7a5040');
  for (let y = 18; y < 92; y += 8) box(c, 0, y, 24, 1, '#c96a40');
  box(c, 9, 28, 7, 16, '#f6eee0'); box(c, 10, 30, 5, 13, '#2a3a4a'); box(c, 10, 29, 5, 1, '#f6eee0'); box(c, 12, 30, 1, 13, '#f6eee0'); box(c, 8, 44, 9, 1, '#f6eee0');
  gothicWin(c, 4, 12, 4, 8, '#f6eee0', '#3a4a5a'); gothicWin(c, 16, 12, 4, 8, '#f6eee0', '#3a4a5a');
  box(c, 4, 76, 16, 16, '#5a3424'); disc(c, 12, 76, 8, '#5a3424'); box(c, 6, 78, 12, 14, '#f2b45e'); box(c, 0, 72, 24, 1, '#a8543a');
  dots(c, [[8,82],[11,82],[14,82]], '#e8556b'); dots(c, [[9,84],[13,84]], '#f6eee0');
  box(c, 0, 52, 24, 1, '#2a2433'); box(c, 0, 50, 1, 3, '#2a2433');
  // right house: pink, green shutters, a wall bracket for the mask shop
  box(c, 66, 12, 24, 84, '#e8a6a0'); box(c, 66, 12, 24, 2, '#b8706a'); box(c, 66, 92, 24, 4, '#7a5050');
  [[70, 20], [80, 20], [70, 36], [80, 36]].forEach(([x, y]) => { gothicWin(c, x, y, 5, 9, '#f6eee0', '#3a4a5a'); box(c, x - 2, y + 2, 2, 7, '#3f8a5a'); box(c, x + 5, y + 2, 2, 7, '#3f8a5a'); });
  box(c, 69, 46, 19, 1, '#f6eee0'); for (let x = 70; x < 88; x += 2) box(c, x, 47, 1, 2, '#f6eee0'); box(c, 69, 49, 19, 1, '#f6eee0');
  box(c, 70, 62, 16, 24, '#3a2a2a'); box(c, 71, 63, 14, 22, '#f2c88a'); [[73, 66, '#e2452f'], [79, 70, '#2f9fd8'], [74, 76, '#f2c14e'], [80, 79, '#a74fd0']].forEach(([x, y, col]) => { box(c, x, y, 4, 2, col); dots(c, [[x + 1, y], [x + 2, y]], '#2a2433'); });
  box(c, 66, 88, 24, 4, '#c98a8a');
}
function drawGondola(c) { pxSprite(c, 34, 20, p => {
  const K = '#161618', Hb = '#24242a', G = '#e8b84a';
  for (let x = 0; x < 34; x++) { const u = (x - 17) / 17, lift = Math.round(u * u * u * u * 6); p(x, 15 - lift, 1, 3 + (lift > 0 ? 1 : 0), Hb); p(x, 14 - lift, 1, 1, K); }
  p(31, 4, 2, 5, '#c9c9d0'); p(30, 5, 1, 1, '#c9c9d0'); p(31, 6, 3, 1, '#c9c9d0'); p(31, 8, 3, 1, '#c9c9d0');
  p(1, 9, 1, 6, K); p(0, 9, 2, 1, K);
  p(13, 12, 9, 3, '#a8243a'); p(13, 11, 9, 1, G); p(14, 12, 7, 1, '#d8344a');
  p(5, 0, 6, 1, '#f2d27a'); p(6, -1, 4, 1, '#f2d27a'); p(6, 0, 4, 1, '#d8343a');
  p(6, 1, 4, 3, '#f2c7a0'); p(7, 2, 1, 1, K); p(9, 2, 1, 1, K);
  for (let y = 4; y < 10; y++) p(5, y, 6, 1, y % 2 ? '#f4f4f0' : '#2a3a7a');
  p(5, 10, 2, 4, K); p(9, 10, 2, 4, K);
  p(11, 5, 2, 1, '#f2c7a0'); for (let k = 0; k < 7; k++) p(12 + k, 4 + k * 2, 1, 2, '#8a5a32');
  p(19, 17, 3, 1, '#8a5a32');
}); }
function drawPigeon(c) { pxSprite(c, 12, 10, p => {
  const K = '#2a2a36', Gy = '#9aa0b4', g = '#7a8096', Gn = '#5aa88a', Pu = '#8a6aa8';
  sil(p, [[2, 3, 7, 4, Gy], [7, 1, 3, 4, Gy], [0, 4, 2, 2, g]], K);
  p(7, 4, 2, 1, Gn); p(8, 5, 1, 1, Pu); p(8, 2, 1, 1, '#e8862e'); p(10, 3, 1, 1, '#c9c0b8');
  p(3, 4, 4, 1, g); p(4, 6, 3, 1, '#c3c8d8'); p(3, 3, 1, 1, '#c3c8d8');
  p(4, 8, 1, 2, '#e85a6a'); p(6, 8, 1, 2, '#e85a6a');
}); }
function drawVShutter(c, flip) { pxSprite(c, 8, 15, p => {
  p(0, 0, 8, 15, '#1d4a32'); p(1, 1, 6, 13, '#3f8a5a');
  for (let y = 2; y < 14; y += 2) p(1, y, 6, 1, '#2f6a46');
  p(1, 7, 6, 1, '#1d4a32'); p(flip ? 6 : 1, 1, 1, 13, '#5aa878');
}); }
function drawMask(c) { pxSprite(c, 16, 12, p => {
  const G = '#e8b84a', K = '#2a2433', Wt = '#fbf7ef';
  p(1, 3, 14, 6, K); p(0, 4, 16, 3, K);
  p(2, 4, 12, 4, Wt); p(1, 5, 14, 1, Wt); p(5, 8, 6, 1, Wt); p(6, 9, 4, 1, Wt);
  p(3, 5, 3, 2, K); p(10, 5, 3, 2, K); p(2, 4, 4, 1, G); p(10, 4, 4, 1, G); p(7, 6, 2, 2, '#f0e0cc');
  p(12, 0, 2, 4, '#d8343a'); p(13, -1, 2, 2, '#a74fd0'); p(14, 1, 1, 3, '#f2c14e');
  p(0, 6, 1, 3, '#a74fd0'); p(15, 6, 1, 3, '#a74fd0');
}); }
function drawPalina(c) { pxSprite(c, 6, 28, p => {
  p(0, 0, 6, 28, '#2a2433');
  for (let y = 1; y < 27; y++) p(1, y, 4, 1, (y >> 2) % 2 ? '#f4f4f0' : '#2f66b8');
  p(1, 1, 4, 2, '#e8b84a'); p(1, 0, 4, 1, '#f2d27a'); p(1, 3, 1, 23, '#ffffff33');
  p(1, 22, 4, 5, '#3a6a5a');
}); }
function drawGelato(c) { pxSprite(c, 22, 11, p => {
  p(3, -3, 1, 3, '#2a2433'); p(18, -3, 1, 3, '#2a2433');
  p(0, 0, 22, 11, '#2a2433'); p(1, 1, 20, 9, '#f6c8d8'); p(1, 1, 20, 1, '#ffe0ea'); p(1, 9, 20, 1, '#d89ab0');
}); txt(c, LOCAL('GELATO'), 0, 1, `15px ${PX}`, '#7a2a4a'); }

/* ===== Level 8: an old Tainan street and temple ===== */
function bgTainan(c) {
  bands(c, ['#8cc8ec','#a2d2ee','#bcdcec','#d6e4e6','#ecead8'], 0, 30);
  [[8, 6, 8], [62, 4, 10]].forEach(([x, y, w]) => { box(c, x, y, w, 2, '#ffffff'); box(c, x + 2, y - 1, w - 4, 1, '#ffffff'); });
  // temple: swallowtail roof, ridge figures, red facade, plaque, steps
  for (let y = 16; y < 30; y++) { const hw = 20 + Math.round((y - 16) * 0.9); box(c, 45 - hw, y, hw * 2, 1, y % 2 ? '#c8502e' : '#d8643a'); }
  box(c, 26, 14, 38, 2, '#2f8a6a'); box(c, 26, 13, 38, 1, '#f2c14e');
  for (let k = 0; k < 6; k++) { box(c, 24 - k, 13 - (k >> 1), 2, 1, '#2f8a6a'); box(c, 64 + k, 13 - (k >> 1), 2, 1, '#2f8a6a'); }
  dots(c, [[18, 9], [71, 9]], '#f2c14e');
  [[32, '#3cbf7a'], [38, '#f2c14e'], [45, '#e2452f'], [52, '#2f9fd8'], [58, '#f2c14e']].forEach(([x, col]) => { box(c, x, 10, 2, 3, col); dots(c, [[x, 9]], '#f6e0b0'); });
  box(c, 45, 7, 1, 3, '#f2c14e'); disc(c, 45, 7, 1, '#e2452f');
  box(c, 22, 30, 46, 2, '#2f8a6a'); for (let x = 23; x < 67; x += 3) box(c, x, 31, 1, 1, '#f2c14e');
  box(c, 24, 32, 42, 52, '#a8342a'); box(c, 22, 32, 4, 52, '#7a2a22'); box(c, 64, 32, 4, 52, '#7a2a22');
  box(c, 23, 36, 2, 44, '#c84a3a'); box(c, 65, 36, 2, 44, '#c84a3a');
  box(c, 36, 36, 18, 8, '#2a2433'); box(c, 37, 37, 16, 6, '#1d3a5a'); for (let x = 39; x < 52; x += 4) box(c, x, 39, 2, 2, '#f2c14e');
  box(c, 29, 47, 32, 35, '#5a1a14'); box(c, 29, 47, 32, 1, '#f2c14e');
  for (let x = 26; x < 64; x += 5) { box(c, x, 33, 3, 3, '#e2452f'); dots(c, [[x + 1, 35]], '#f2c14e'); }
  box(c, 20, 84, 50, 3, '#b8a890'); box(c, 18, 87, 54, 3, '#a89880'); box(c, 16, 90, 58, 2, '#988870');
  // left: red-brick shop with an arcade; right: a pale green shophouse
  box(c, 0, 18, 20, 74, '#b8553a'); for (let y = 20; y < 92; y += 3) { box(c, 0, y, 20, 1, '#9a4430'); for (let x = (y % 2) * 3; x < 20; x += 6) box(c, x, y + 1, 1, 2, '#9a4430'); }
  box(c, 0, 16, 21, 2, '#7a3424'); box(c, 0, 50, 20, 2, '#7a3424'); box(c, 0, 52, 20, 40, '#5a2a1e'); box(c, 2, 56, 16, 34, '#3a1e16'); box(c, 4, 60, 12, 14, '#f2b45e'); box(c, 4, 66, 12, 1, '#c97a3c');
  box(c, 0, 52, 2, 40, '#c8643a'); box(c, 18, 52, 2, 40, '#c8643a');
  box(c, 70, 22, 20, 70, '#9fd0bc'); box(c, 70, 20, 20, 2, '#6a9a88'); box(c, 70, 44, 20, 2, '#6a9a88');
  for (let x = 72; x < 90; x += 6) { box(c, x, 26, 4, 10, '#f6eee0'); box(c, x + 1, 27, 2, 8, '#3a5a6a'); box(c, x, 31, 4, 1, '#f6eee0'); }
  box(c, 70, 46, 20, 46, '#7aa898'); box(c, 72, 50, 16, 20, '#3a4a4a'); box(c, 73, 51, 14, 18, '#f2d8a0'); for (let x = 73; x < 87; x += 2) box(c, x, 51, 1, 18, '#d8b880');
  box(c, 68, 46, 2, 46, '#f6eee0');
  // lantern string across the top, street, kerb
  for (let x = 0; x < 90; x++) { const y = 46 + Math.round(Math.sin(x / 90 * Math.PI) * 2); if (x < 22 || x > 67) dots(c, [[x, y]], '#2a2433'); }
  [[4, 48], [10, 48], [16, 48], [74, 48], [80, 48], [86, 48]].forEach(([x, y]) => { box(c, x, y, 3, 3, '#e2452f'); dots(c, [[x + 1, y + 1]], '#ffd27a'); dots(c, [[x + 1, y + 3]], '#f2c14e'); });
  box(c, 0, 92, 90, 28, '#7c7a80'); box(c, 0, 92, 90, 2, '#b8553a'); for (let y = 98; y < 120; y += 6) box(c, 0, y, 90, 1, '#6e6c72');
  box(c, 0, 108, 90, 1, '#e8e2c8'); for (let x = 2; x < 90; x += 8) box(c, x, 113, 4, 1, '#e8e2c8');
}
function drawDoorGod(c, flip) { pxSprite(c, 13, 26, P => {
  const p = (x, y, w, h, col) => P(flip ? 13 - x - w : x, y, w, h, col);
  const K = '#2a1712', R = '#b8322a', G = '#e8b84a', S = '#f2c7a0', Gn = '#2f8a6a';
  p(0, 0, 13, 26, K); p(1, 1, 11, 24, R); p(1, 1, 11, 1, '#d24a3a');
  p(4, 3, 5, 2, K); p(5, 2, 3, 1, G); p(4, 5, 5, 3, S); p(5, 6, 1, 1, K); p(7, 6, 1, 1, K); p(4, 8, 5, 2, K); p(5, 10, 3, 1, K);
  p(3, 10, 7, 9, G); p(3, 11, 7, 1, Gn); p(4, 13, 5, 1, Gn); p(5, 15, 3, 3, '#3a6ab8'); p(3, 18, 7, 1, Gn);
  p(2, 11, 1, 6, Gn); p(10, 11, 1, 6, Gn);
  p(10, 3, 1, 20, '#8a5a32'); p(9, 2, 3, 2, '#c9c9d0');
  p(4, 19, 2, 4, '#2a3a7a'); p(7, 19, 2, 4, '#2a3a7a'); p(3, 23, 3, 1, K); p(7, 23, 3, 1, K);
  p(flip ? 0 : 11, 12, 1, 3, G);
}); }
function drawDanzai(c) {
  pxSprite(c, 9, 26, p => { p(0, 0, 9, 26, '#7a2a22'); p(1, 1, 7, 24, '#f6e2a8'); p(1, 1, 7, 1, '#fff2c8'); p(1, 24, 7, 1, '#d8bc80'); });
  ['擔', '仔', '麵'].forEach((ch, i) => txt(c, LOCAL(ch), 0, -30 + i * 30, `22px ${PX}`, '#b8322a'));
}
function drawTempleLantern(c) { pxSprite(c, 12, 18, p => {
  const K = '#2a1712', R = '#e0412f', r = '#a42a20', G = '#f2c14e';
  p(5, 0, 2, 2, K); p(3, 2, 6, 2, G); p(3, 3, 6, 1, '#b5862e');
  p(2, 4, 8, 1, R); p(1, 5, 10, 8, R); p(2, 13, 8, 1, R); p(1, 5, 2, 8, '#ff6a4d'); p(9, 5, 2, 8, r);
  p(3, 14, 6, 2, G); p(3, 15, 6, 1, '#b5862e'); p(5, 16, 2, 2, R);
}); txt(c, LOCAL('平安'), 0, -1, `13px ${PX}`, '#ffe08a'); }
function drawCalico(c) { pxSprite(c, 11, 13, p => {
  const K = '#2a2030', Wt = '#fbf7ef', O = '#e8892e', B = '#3a3440', Pk = '#f49ab0';
  sil(p, [[1, 0, 2, 2, Wt], [7, 0, 2, 2, B], [1, 2, 8, 5, Wt], [2, 7, 6, 5, Wt], [8, 9, 2, 3, O]], K);
  p(1, 2, 3, 2, O); p(6, 2, 3, 2, B); p(7, 0, 2, 2, B); p(1, 0, 1, 1, Pk);
  p(3, 4, 1, 1, K); p(6, 4, 1, 1, K); p(4, 5, 2, 1, Pk); p(2, 6, 1, 1, Pk); p(7, 6, 1, 1, Pk);
  p(5, 8, 3, 2, O); p(3, 11, 1, 1, '#e3dacb'); p(6, 11, 1, 1, '#e3dacb');
}); }
function drawMailboxes(c) { pxSprite(c, 14, 18, p => {
  const K = '#1d1d22';
  [[0, '#2f8a4a', '#4ab06a'], [7, '#d8343a', '#f05a5a']].forEach(([x, col, hi]) => {
    p(x + 1, 0, 5, 1, K); p(x, 1, 7, 12, K); p(x + 1, 1, 5, 11, col); p(x + 1, 1, 1, 10, hi);
    p(x + 2, 4, 3, 1, K); p(x + 3, 7, 1, 2, '#f4f4f0'); p(x + 2, 8, 3, 1, '#f4f4f0');
    p(x + 2, 13, 3, 4, K); p(x + 1, 17, 5, 1, K);
  });
}); }
function drawScooter(c) { pxSprite(c, 26, 18, p => {
  const K = '#1d1d22', Wt = '#f4f4f0', Bl = '#2f66b8', Gy = '#9a9aa4';
  pdisc(p, 5, 14, 4, K); pdisc(p, 21, 14, 4, K); pdisc(p, 5, 14, 2, Gy); pdisc(p, 21, 14, 2, Gy);
  p(4, 2, 4, 9, K); p(5, 3, 3, 8, Wt); p(5, 6, 3, 1, Bl);
  p(3, 1, 6, 1, K); p(2, 0, 2, 1, K); p(8, 0, 2, 1, K); p(4, 3, 1, 1, '#ffe08a');
  p(8, 10, 9, 2, K); p(8, 11, 9, 1, Gy);
  p(14, 5, 10, 7, K); p(15, 6, 9, 5, Wt); p(15, 8, 9, 1, Bl); p(23, 7, 1, 2, '#e2452f');
  p(14, 4, 9, 2, '#3a3440');
  pdisc(p, 18, 2, 2, '#f2c14e'); p(16, 2, 5, 1, '#d8a428'); p(19, 1, 1, 1, '#fff2b0');
}); }
function drawLadder(c) { pxSprite(c, 6, 30, p => {
  const Rl = '#c9b25a', r = '#9a8440', K = '#4a3a1a';
  p(0, 0, 2, 30, K); p(4, 0, 2, 30, K); p(0, 0, 1, 30, Rl); p(4, 0, 1, 30, Rl);
  for (let y = 2; y < 30; y += 4) { p(1, y, 4, 1, r); p(0, y - 1, 2, 1, '#e0cc80'); p(4, y - 1, 2, 1, '#e0cc80'); }
}); }

/* ===== Level 9: Lisbon, tram 28 and the Bica funicular ===== */
// The funicular (a trap) leans by FUN_KEEP; its rail in the background is drawn at exactly that slope.
const FUN = { x: 252, y: 188, keep: -6 };
const funRail = x => { const a = FUN.keep * Math.PI / 180, bx = (FUN.x - 32 * Math.sin(a)) / 4, by = (FUN.y + 32 * Math.cos(a)) / 4; return by + (x - bx) * Math.tan(a); };
function azulejo(c, x0, y0, w, h, blue, white) {
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) { const u = x & 3, v = y & 3; c.fillStyle = (u === v || u + v === 3) ? blue : (u === 0 && v === 0 ? blue : white); c.fillRect(x, y, 1, 1); }
}
function bgLisbon(c) {
  bands(c, ['#58aee6','#6cb8ea','#82c3ed','#9aceef','#b4daf0','#cce4ef'], 0, 32);
  dots(c, [[30,4],[31,4],[32,5]], '#ffffff');
  // river and the red suspension bridge
  box(c, 40, 26, 50, 8, '#4a8ab8'); for (let x = 42; x < 90; x += 5) box(c, x, 28 + (x % 3), 3, 1, '#7ab0d8');
  box(c, 40, 24, 50, 2, '#8a9a78');
  box(c, 60, 12, 2, 16, '#c8432e'); box(c, 82, 12, 2, 16, '#c8432e'); box(c, 40, 22, 50, 1, '#c8432e');
  for (let x = 40; x < 90; x++) { const u = x < 61 ? (61 - x) / 21 : x < 83 ? Math.abs(x - 72) / 11 : (x - 83) / 21, y = x < 61 || x >= 83 ? 13 + Math.round(u * 8) : 13 + Math.round((1 - u * u) * 8); dots(c, [[x, y]], '#d8584a'); }
  // the hill: houses above the funicular street, stepping down along it
  const cols = [[0, 22, 16, '#f2b8b0'], [22, 40, 14, '#f4efe2'], [40, 58, 30, '#f2d27a'], [58, 90, 34, '#e8a6a0']];
  cols.forEach(([x0, x1, top, col], i) => {
    for (let x = x0; x < x1; x++) box(c, x, top, 1, Math.round(funRail(x)) - 3 - top, col);
    for (let x = x0 - 1; x < x1 + 1; x++) box(c, x, top - 2, 1, 2, '#c8643a'); box(c, x0, top - 3, x1 - x0, 1, '#a8543a');
    for (let y = top + 3; y < funRail(x1) - 8; y += 7) for (let x = x0 + 3; x < x1 - 3; x += 6) { box(c, x, y, 3, 4, '#2a3a5a'); box(c, x, y + 4, 3, 1, '#ffffff'); }
  });
  box(c, 17, 9, 3, 4, '#c8643a'); box(c, 16, 8, 5, 1, '#a8543a');
  for (let x = 0; x < 90; x++) { const r = Math.round(funRail(x)); box(c, x, r - 3, 1, 4, '#8a8a92'); box(c, x, r, 1, 1, '#3a3a44'); box(c, x, r + 1, 1, 1, '#6a6a74'); if (x % 4 === 0) box(c, x, r - 2, 1, 1, '#9c9ca6'); }
  // lower street: azulejo house fronts, wires for the sardines, the tram line
  for (let x = 0; x < 90; x++) { const r = Math.round(funRail(x)) + 2; box(c, x, r, 1, 96 - r, x < 46 ? '#eef2f8' : '#f6e8c8'); }
  azulejo(c, 0, 64, 46, 32, '#3a74c2', '#eef2f8'); azulejo(c, 46, 62, 44, 34, '#d8a03a', '#f6e8c8');
  for (let x = 0; x < 90; x++) box(c, x, Math.round(funRail(x)) + 2, 1, 2, '#c9c2b0');
  [[6, 74], [20, 74], [34, 74], [52, 72], [66, 74], [80, 74]].forEach(([x, y]) => { box(c, x - 1, y - 1, 6, 9, '#f4f1ea'); box(c, x, y, 4, 7, '#2a3a5a'); box(c, x - 1, y + 7, 6, 1, '#2a2433'); for (let k = 0; k < 6; k += 2) box(c, x - 1 + k, y + 5, 1, 2, '#2a2433'); });
  for (let x = 0; x < 90; x++) dots(c, [[x, 62 + Math.round(Math.sin(x / 90 * Math.PI) * 4)]], '#2a2433');
  box(c, 0, 96, 90, 24, '#a8a4a0'); for (let y = 98; y < 120; y += 3) for (let x = ((y / 3) & 1) * 2; x < 90; x += 4) box(c, x, y, 3, 2, '#b8b4ae');
  box(c, 0, 96, 90, 2, '#d8d2c6'); box(c, 0, 107, 90, 1, '#5a5a62'); box(c, 0, 108, 90, 1, '#d8d2c6'); box(c, 0, 114, 90, 1, '#8a8682');
}
function drawTram(c) { pxSprite(c, 34, 22, p => {
  const K = '#1d1d22', Y = '#f2c230', y = '#c89a20', Wt = '#f4f1e0';
  p(8, 0, 1, 3, K); p(6, 2, 6, 1, K);
  p(1, 3, 32, 15, K); p(2, 4, 30, 2, Wt); p(2, 6, 30, 11, Y); p(2, 16, 30, 1, y);
  for (let x = 4; x < 28; x += 5) { p(x, 7, 4, 4, '#2a3a5a'); p(x, 7, 4, 1, '#5a7ab0'); }
  p(29, 7, 3, 9, '#2a3a5a'); p(29, 7, 3, 1, '#5a7ab0'); p(30, 12, 2, 3, '#f2c230');
  p(2, 12, 26, 1, y); p(14, 12, 3, 5, '#2a3a5a');
  p(30, 4, 3, 2, '#1d1d22'); p(33, 6, 1, 8, K);
  p(4, 18, 10, 2, K); p(20, 18, 10, 2, K); pdisc(p, 7, 19, 2, '#3a3a44'); pdisc(p, 11, 19, 2, '#3a3a44'); pdisc(p, 23, 19, 2, '#3a3a44'); pdisc(p, 27, 19, 2, '#3a3a44');
  p(0, 17, 34, 1, K); p(32, 15, 2, 2, '#ffe08a');
}); txt(c, '28', 54, -26, `bold 9px ${PX}`, '#ffffff'); }
function drawFunicular(c) { pxSprite(c, 24, 16, p => {
  const K = '#1d1d22', Y = '#f2c230', Wt = '#f4f1e0';
  p(1, 1, 22, 12, K); p(2, 2, 20, 2, Wt); p(2, 4, 20, 8, Y); p(2, 11, 20, 1, '#c89a20');
  for (let x = 3; x < 21; x += 4) { p(x, 5, 3, 3, '#2a3a5a'); p(x, 5, 3, 1, '#5a7ab0'); }
  p(0, 0, 3, 1, K); p(21, 0, 3, 1, K); p(11, 0, 2, 1, K);
  p(3, 13, 18, 1, K); pdisc(p, 6, 14, 2, '#3a3a44'); pdisc(p, 18, 14, 2, '#3a3a44');
  p(4, 9, 16, 1, '#e8b020');
}); }
function drawGull(c) { pxSprite(c, 14, 10, p => {
  const K = '#3a3a48', Wt = '#fbfbf8', Gy = '#9aa4b4';
  sil(p, [[2, 1, 4, 4, Wt], [4, 4, 8, 3, Wt], [11, 4, 2, 2, Gy]], K);
  p(5, 4, 7, 2, Gy); p(10, 4, 2, 1, '#2a2a36'); p(0, 3, 2, 1, '#f2c230'); p(0, 4, 1, 1, '#e2452f'); p(3, 2, 1, 1, K);
  p(5, 8, 1, 2, '#e8a07a'); p(8, 8, 1, 2, '#e8a07a');
}); }
function drawSardine(c, body, spot) { pxSprite(c, 14, 9, p => {
  const K = '#2a2433';
  p(6, 0, 1, 2, K);
  sil(p, [[2, 3, 8, 4, body], [1, 4, 1, 2, body], [10, 4, 1, 2, body], [11, 2, 2, 2, body], [11, 6, 2, 2, body]], K);
  p(3, 4, 1, 1, '#ffffff'); p(3, 4, 1, 1, K); p(2, 4, 1, 1, '#ffffff');
  [[5, 4], [7, 5], [9, 4], [6, 6]].forEach(([x, y]) => p(x, y, 1, 1, spot));
  p(3, 6, 6, 1, '#ffffff66');
}); }
function drawFado(c) { pxSprite(c, 18, 11, p => {
  p(2, -2, 1, 2, '#2a2433'); p(15, -2, 1, 2, '#2a2433');
  p(0, 0, 18, 11, '#2a2433'); p(1, 1, 16, 9, '#5a2a3a'); p(1, 1, 16, 1, '#7a3a4a');
}); txt(c, LOCAL('FADO'), 0, 1, `16px ${PX}`, '#ffe8b0'); }
function drawLisbonLamp(c) { pxSprite(c, 8, 15, p => {
  const K = '#2a2433', Y = '#ffe08a';
  p(3, 0, 2, 2, K); p(2, 2, 4, 1, K); p(1, 3, 6, 1, K);
  p(1, 4, 6, 7, K); p(2, 4, 4, 6, Y); p(3, 4, 1, 6, '#fff6d0'); p(1, 7, 6, 1, K);
  p(2, 11, 4, 1, K); p(3, 12, 2, 3, K);
}); }
function drawAzulejoPanel(c) { pxSprite(c, 12, 12, p => {
  p(0, 0, 12, 12, '#d8a03a'); p(1, 1, 10, 10, '#eef2f8');
  [[1, 1], [6, 1], [1, 6], [6, 6]].forEach(([x, y]) => { p(x + 1, y + 2, 3, 1, '#2f66b8'); p(x + 2, y + 1, 1, 3, '#2f66b8'); p(x, y, 1, 1, '#2f66b8'); p(x + 4, y + 4, 1, 1, '#2f66b8'); p(x + 4, y, 1, 1, '#2f66b8'); p(x, y + 4, 1, 1, '#2f66b8'); });
  p(6, 1, 1, 10, '#c8d4e8'); p(1, 6, 10, 1, '#c8d4e8');
}); }

/* ===== Level 10: Hanoi Old Quarter at dusk ===== */
function bgHanoi(c) {
  bands(c, ['#3a2a5a','#4a3266','#64406e','#8a4a6e','#b45a6c','#d8706a','#ec926e','#f4b47c'], 0, 30);
  dots(c, [[12, 3], [40, 5], [66, 2], [84, 7]], '#fff3d0');
  const houses = [[0, 18, 12, '#e8b84a', '#c8963a'], [18, 34, 18, '#a8d0b0', '#86b090'], [34, 52, 8, '#e8a6a0', '#c8867f'], [52, 70, 14, '#e8c45a', '#c8a43a'], [70, 90, 10, '#efe2c4', '#cfc2a4']];
  houses.forEach(([x0, x1, top, col, dk]) => {
    box(c, x0, top, x1 - x0, 100 - top, col); box(c, x0, top - 2, x1 - x0, 2, '#b8553a'); box(c, x0, top, x1 - x0, 1, dk); box(c, x1 - 1, top, 1, 72 - top, dk);
    for (let y = top + 5; y < 62; y += 17) {
      const w = x1 - x0, wx = x0 + (w >> 1) - 3;
      box(c, wx, y, 6, 9, '#3a2a2a'); box(c, wx + 1, y + 1, 4, 8, '#f2b45e'); box(c, wx + 3, y + 1, 1, 8, '#3a2a2a');
      box(c, wx - 2, y, 2, 9, '#3f8a5a'); box(c, wx + 6, y, 2, 9, '#3f8a5a'); for (let k = 1; k < 9; k += 2) { box(c, wx - 2, y + k, 2, 1, '#2f6a46'); box(c, wx + 6, y + k, 2, 1, '#2f6a46'); }
      box(c, wx - 2, y + 9, 10, 1, '#2a2433'); for (let k = 0; k < 10; k += 2) box(c, wx - 2 + k, y + 10, 1, 2, '#2a2433'); box(c, wx - 2, y + 12, 10, 1, '#2a2433');
      dots(c, [[wx - 1, y + 8], [wx + 7, y + 8], [wx, y + 7]], '#3cbf7a'); dots(c, [[wx - 1, y + 7]], '#e2455f');
    }
  });
  // shop fronts with awnings and goods
  const aw = ['#d8343a', '#2f9fd8', '#f2c14e', '#3cbf7a', '#a74fd0'];
  houses.forEach(([x0, x1], i) => {
    box(c, x0, 70, x1 - x0, 4, aw[i]); for (let x = x0; x < x1; x += 2) box(c, x, 73, 1, 2, aw[i]); for (let x = x0 + 1; x < x1; x += 4) box(c, x, 70, 2, 3, '#ffffff55');
    box(c, x0 + 1, 75, x1 - x0 - 2, 25, '#3a2222'); box(c, x0 + 2, 76, x1 - x0 - 4, 10, '#f2b45e');
  });
  for (let k = 0; k < 4; k++) for (let j = 0; j < 3; j++) { const x = 37 + j * 5, y = 78 + k * 2; box(c, x, y, 4, 1, '#efe2b0'); dots(c, [[x + 1, y - 1], [x + 2, y - 1]], '#efe2b0'); }
  [[56, '#e2452f'], [60, '#f2c14e'], [64, '#2f9fd8']].forEach(([x, col]) => { box(c, x, 77, 3, 4, col); dots(c, [[x + 1, 81]], '#f2c14e'); });
  // tangled wires and a pole
  box(c, 46, 18, 2, 82, '#4a4048'); box(c, 43, 24, 8, 1, '#4a4048');
  [[0, 20, 50, 21, 3], [0, 31, 90, 29, 5], [10, 26, 90, 34, 6], [30, 23, 90, 21, 4]].forEach(([x0, y0, x1, y1, sag]) => { for (let x = x0; x < x1; x++) { const u = (x - x0) / (x1 - x0); dots(c, [[x, Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * sag)]], '#241c2a'); } });
  for (let i = 0; i < 16; i++) dots(c, [[42 + Math.floor(hsh(i) * 10), 26 + Math.floor(hsh(i + 9) * 10)]], '#241c2a');
  box(c, 63, 51, 27, 1, '#2a2433'); box(c, 89, 49, 1, 4, '#2a2433');
  // pavement, stools, street
  box(c, 0, 100, 90, 3, '#b8b0a4'); box(c, 0, 103, 90, 17, '#5a5660');
  for (let i = 0; i < 30; i++) dots(c, [[Math.floor(hsh(i * 5) * 90), 104 + Math.floor(hsh(i * 3 + 2) * 16)]], '#6a6670');
  [[30, 96, '#2f7fd0'], [56, 96, '#d8343a'], [62, 97, '#2f7fd0']].forEach(([x, y, col]) => { box(c, x, y, 5, 1, col); box(c, x, y + 1, 1, 3, col); box(c, x + 4, y + 1, 1, 3, col); });
  c.fillStyle = 'rgba(255,190,110,.10)'; c.fillRect(0, 74, 90, 26);
}
function drawSilkLantern(c, col, dark) { pxSprite(c, 10, 18, p => {
  const G = '#e8b84a', K = '#2a1712';
  p(4, 0, 2, 2, K); p(3, 2, 4, 1, G);
  [4, 6, 8, 10, 10, 10, 8, 6, 4].forEach((w, i) => p(5 - w / 2, 3 + i * 1.2 | 0, w, 2, col));
  [[3, 4], [5, 3], [7, 4]].forEach(([x, y0]) => p(x, y0, 1, 10 - Math.abs(x - 5), dark));
  p(1, 6, 1, 4, '#ffffff55'); p(3, 13, 4, 1, G);
  p(4, 14, 2, 1, G); p(4, 15, 2, 3, col);
}); }
function drawBirdCage(c) { pxSprite(c, 12, 18, p => {
  const B = '#c9a45a', b = '#8a6a32', K = '#1d1d22';
  p(5, 0, 2, 2, b); p(4, 2, 4, 1, B); p(2, 3, 8, 1, B); p(1, 4, 10, 1, B);
  p(4, 9, 4, 3, '#7a5a3a'); p(5, 7, 3, 3, '#3a3440'); p(6, 6, 1, 1, '#3a3440'); p(7, 8, 1, 1, '#e2452f'); p(6, 10, 2, 1, '#f4f4f0'); p(8, 8, 1, 1, '#c9a45a');
  p(3, 12, 6, 1, b); p(4, 13, 1, 1, K); p(7, 13, 1, 1, K);
  [1, 4, 7, 10].forEach(x => p(x, 5, 1, 11, B));
  p(1, 16, 10, 2, b); p(1, 16, 10, 1, B); p(1, 10, 10, 1, '#c9a45a88');
}); }
function drawHanoiSign(c, label, size) {
  pxSprite(c, 20, 9, p => { p(3, -2, 1, 2, '#2a2433'); p(16, -2, 1, 2, '#2a2433'); p(0, 0, 20, 9, '#2a2433'); p(1, 1, 18, 7, '#d8343a'); p(1, 1, 18, 1, '#f05a5a'); p(1, 7, 18, 1, '#a42a20'); });
  txt(c, LOCAL(label), 0, 1, `bold ${size}px "Noto Sans TC", sans-serif`, '#ffe066');
}
function drawVendor(c, a) { pxSprite(c, 26, 24, p => {
  const K = '#2a2030', H = '#efe2b0', h = '#c8b880', S = '#e8b48a', Bm = '#c9a45a';
  p(12, 0, 2, 1, h); p(11, 1, 4, 1, H); p(10, 2, 6, 1, H); p(9, 3, 8, 1, H); p(8, 4, 10, 1, h);
  p(10, 5, 6, 3, S); p(11, 6, 1, 1, K); p(14, 6, 1, 1, K); p(12, 7, 2, 1, '#c86a5a');
  sil(p, [[9, 9, 8, 7, '#5a8ad0'], [10, 16, 3, 6, '#2a2a3a'], [14, 16, 3, 6, '#2a2a3a']], K);
  p(9, 9, 8, 1, '#7aa8e8'); p(8, 11, 1, 3, S); p(17, 11, 1, 3, S); p(9, 22, 3, 1, K); p(14, 22, 3, 1, K);
  p(0, 8, 26, 1, Bm); p(0, 9, 26, 1, '#8a6a32');
  [[1, 10], [4, 10], [20, 10], [23, 10]].forEach(([x, y]) => p(x, y, 1, 4, '#8a6a32'));
  [[0, '#e2455f', '#f2c14e'], [19, '#f4f4f0', '#e2455f']].forEach(([x, f1, f2]) => {
    p(x, 16, 7, 4, '#a8794c'); p(x + 1, 20, 5, 1, '#a8794c'); p(x, 17, 7, 1, '#8a5a32');
    p(x, 14, 2, 2, f1); p(x + 2, 13, 2, 2, f2); p(x + 4, 14, 2, 2, f1); p(x + 3, 15, 2, 1, '#3cbf7a'); p(x + 6, 15, 1, 1, '#3cbf7a');
  });
}); }
function drawCub(c) { pxSprite(c, 26, 16, p => {
  const K = '#1d1d22', R = '#b8322a', Gy = '#9a9aa4', Wt = '#e8e8ee';
  pdisc(p, 5, 12, 4, K); pdisc(p, 21, 12, 4, K); pdisc(p, 5, 12, 2, Gy); pdisc(p, 21, 12, 2, Gy);
  p(3, 7, 5, 2, R); p(5, 3, 2, 6, Gy); p(3, 2, 6, 1, K); p(2, 1, 2, 1, K); p(8, 1, 2, 1, K); p(1, 3, 3, 2, '#ffe08a');
  p(7, 6, 3, 5, Wt); p(9, 9, 7, 2, R); p(14, 5, 9, 5, R); p(14, 4, 9, 2, '#2a2433'); p(22, 6, 2, 2, '#e2452f');
  p(15, 9, 7, 1, '#8a2420'); p(11, 11, 6, 1, Gy);
  p(16, 0, 6, 4, '#a8794c'); p(16, 0, 6, 1, '#c89a6a'); p(18, 1, 1, 3, '#8a5a32');
}); }
function drawPhin(c) { pxSprite(c, 10, 14, p => {
  const S = '#c9c9d0', s = '#8a8a96', R = '#d8343a';
  p(4, 0, 2, 1, s); p(2, 1, 6, 1, S); p(2, 2, 6, 2, s); p(1, 4, 8, 1, S);
  p(2, 5, 6, 4, '#e8eef2'); p(2, 6, 6, 2, '#4a2a1a'); p(2, 8, 6, 1, '#f6ead0'); p(2, 5, 1, 4, '#ffffff');
  p(0, 9, 10, 2, R); p(0, 9, 10, 1, '#f05a5a'); p(1, 11, 1, 3, R); p(8, 11, 1, 3, R); p(4, 11, 2, 1, '#a42a20');
}); }

defineChapter({
  key: 'oldtown', order: 3,
  name: { zh: "古都巷弄", en: "Old Town Alleys" },
  blurb: { zh: "老城市的招牌與燈籠，用像素一格格拼回原位。", en: "Signs and lanterns of old cities, pieced back pixel by pixel." },
  style: { zh: "像素風", en: "Pixel art" },
  narrator: { zh: "招財貓", en: "Lucky Cat" },
  song: 'jp',
    comments: {
      far: [{ zh: ["喵…？", "巷子裡的招牌全都歪了，老闆今天先休息。"], en: ["Meow…?", "Every sign in the alley is crooked. Shop's closed today."] }, { zh: ["燈籠亂飄", "招財貓揮手揮到一半停下來：這要怎麼開店？"], en: ["Lanterns adrift", "Lucky Cat stops mid-wave: how do we open like this?"] }],
      close: [{ zh: ["差一格像素", "只差一點點，拉麵已經煮好在等你了。"], en: ["One pixel off", "So close! The ramen is ready and waiting."] }, { zh: ["快對齊了喵", "再一下下，燈籠就要亮起來了。"], en: ["Nearly there, meow", "A moment more and the lanterns will light up."] }],
      pass: [{ zh: ["開店營業！", "勉強對齊，招財貓還是覺得鳥居有點斜。"], en: ["Open for business!", "Lined up, but Lucky Cat thinks the gate's a bit off."] }, { zh: ["及格喵～", "老闆：可以開店了，但別讓客人仔細看。"], en: ["Pass, meow~", "Owner: we can open. Just don't let guests look closely."] }],
      good: [{ zh: ["街道整齊！", "鳥居、燈籠、販賣機排得像明信片一樣。"], en: ["Tidy street!", "Gate, lantern, vending machine: neat as a postcard."] }, { zh: ["好街坊", "招財貓的手揮得特別起勁。"], en: ["Good neighbor", "Lucky Cat is waving extra hard today."] }],
      perfect: [{ zh: ["完美古都♪", "一格像素都不差！招財貓招來了滿滿的福氣。"], en: ["Perfect old town♪", "Not one pixel off! Lucky Cat brings you heaps of luck."] }, { zh: ["京都職人", "連老師傅都點頭：這才叫對齊。"], en: ["Kyoto craftsman", "Even the old master nods: now that's aligned."] }],
    },
  stages: [
    { key: 'jp', title: { zh: "京都黃昏", en: "Kyoto Dusk" }, place: { zh: "日本 京都", en: "Kyoto, Japan" },
      intro: { zh: "像素畫的京都巷子。燈籠和招牌都歪了，招財貓只歪了一點點。", en: "A pixel-art Kyoto alley. The lantern and signs are crooked; Lucky Cat is off by a hair." },
      lowres: true, bg: bgJapan,
      objects: [
      { id: 'torii', name: { zh: '鳥居', en: 'Torii gate' }, x: 180, y: 268, w: 120, h: 104, mag: 11, draw: drawTorii, sfx: 'bell' },
      { id: 'ramen', name: { zh: '拉麵招牌', en: 'Ramen sign' }, x: 72, y: 142, w: 104, h: 48, mag: 7, draw: drawRamen, sfx: 'wood' },
      { id: 'lantern', name: { zh: '紅燈籠', en: 'Red lantern' }, x: 292, y: 160, w: 56, h: 80, mag: 14, draw: drawLantern, sfx: 'pop' },
      { id: 'vend', name: { zh: '自動販賣機', en: 'Vending machine' }, x: 300, y: 390, w: 64, h: 112, mag: 6, draw: drawVending, sfx: 'clunk' },
      { id: 'cat', name: { zh: '招財貓', en: 'Lucky cat' }, x: 80, y: 400, w: 64, h: 72, near: true, draw: drawCat, sfx: 'meow' }
      ] },
    { key: 'oldtown-xian', title: { zh: "西安城牆", en: "Xi'an City Wall" }, place: { zh: "中國 西安", en: "Xi'an, China" },
      intro: { zh: "六百多年的老城牆亮起燈。宮燈、肉夾饃招牌和兵馬俑都歪了。", en: "The 600-year-old wall lights up. The lantern, the roujiamo sign and the clay warrior are all askew." },
      lowres: true, bg: bgXian, animated: true,
      objects: [
      { id: 'lantern', name: { zh: '宮燈', en: 'Palace lantern' }, x: 312, y: 108, w: 64, h: 104, mag: 13, draw: drawPalaceLantern, sfx: 'pop' },
      { id: 'sparrow', name: { zh: '麻雀', en: 'Sparrow' }, x: 80, y: 144, w: 48, h: 40, mag: 9, draw: drawSparrow, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 5)) * 4 * l }), call: 'oldtown_sparrow' },
      { id: 'sign', name: { zh: '肉夾饃招牌', en: 'Roujiamo sign' }, x: 284, y: 344, w: 104, h: 48, mag: 6, draw: drawRoujiamo, sfx: 'wood' },
      { id: 'warrior', name: { zh: '兵馬俑', en: 'Clay warrior' }, x: 64, y: 388, w: 64, h: 120, near: true, draw: drawWarrior, sfx: 'oldtown_clay' }
      ] },
    { key: 'oldtown-istanbul', title: { zh: "伊斯坦堡市集", en: "Istanbul Bazaar" }, place: { zh: "土耳其 伊斯坦堡", en: "Istanbul, Türkiye" },
      intro: { zh: "清真寺的圓頂下，市集的拱門亮起馬賽克燈。街貓才是這裡的老闆。", en: "Under the mosque domes, mosaic lamps glow in the bazaar arch. The street cat runs the place." },
      lowres: true, bg: bgIstanbul, animated: true,
      objects: [
      { id: 'lamp', name: { zh: '馬賽克燈', en: 'Mosaic lamp' }, x: 180, y: 192, w: 56, h: 88, mag: 14, draw: drawMosaicLamp, sfx: 'twinkle' },
      { id: 'kilim', name: { zh: '基里姆掛毯', en: 'Kilim rug' }, x: 48, y: 220, w: 72, h: 104, mag: 9, draw: drawKilim, sfx: 'oldtown_rug' },
      { id: 'lokum', name: { zh: '土耳其軟糖招牌', en: 'Lokum sign' }, x: 304, y: 184, w: 96, h: 48, mag: 5, draw: drawLokum, sfx: 'wood' },
      { id: 'tray', name: { zh: '紅茶托盤', en: 'Tea tray' }, x: 280, y: 392, w: 72, h: 56, near: true, draw: drawCayTray, sfx: 'jingle' },
      { id: 'cat', name: { zh: '街貓', en: 'Street cat' }, x: 84, y: 398, w: 88, h: 52, mag: 11, draw: drawStreetCat, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 2.2)) * 3 * l }), call: 'oldtown_mew' }
      ] },
    { key: 'oldtown-prague', title: { zh: "布拉格鐘樓", en: "Prague Clock Tower" }, place: { zh: "捷克 布拉格", en: "Prague, Czechia" },
      intro: { zh: "六百年的天文鐘。上面兩扇使徒小窗是一組的，轉一扇另一扇也會跟著動。", en: "A 600-year-old astronomical clock. The two apostle windows above it move together." },
      lowres: true, bg: bgPrague, animated: true,
      objects: [
      { id: 'orloj', name: { zh: '天文鐘', en: 'Astronomical clock' }, x: 184, y: 236, w: 96, h: 96, mag: 8, draw: drawOrloj, sfx: 'bell' },
      { id: 'winl', name: { zh: '左使徒窗', en: 'Left apostle window' }, x: 164, y: 160, w: 40, h: 48, mag: 12, draw: c => drawApostleWin(c, '#b8322a'), sfx: 'wood', link: { to: 'winr', k: 0.6 } },
      { id: 'winr', name: { zh: '右使徒窗', en: 'Right apostle window' }, x: 204, y: 160, w: 40, h: 48, mag: 6, draw: c => drawApostleWin(c, '#2f7a4a'), sfx: 'wood' },
      { id: 'puppet', name: { zh: '提線木偶', en: 'Marionette' }, x: 56, y: 288, w: 56, h: 112, mag: 10, draw: drawPuppet, habit: (t, l) => ({ dx: Math.sin(t * 1.6) * 4 * l }), call: 'clack' },
      { id: 'pivo', name: { zh: '啤酒招牌', en: 'Beer sign' }, x: 296, y: 272, w: 80, h: 56, near: true, draw: drawPivo, sfx: 'clunk' }
      ] },
    { key: 'oldtown-seoul', title: { zh: "首爾韓屋", en: "Seoul Hanok" }, place: { zh: "韓國 首爾 北村", en: "Bukchon, Seoul, Korea" },
      intro: { zh: "北村的瓦頂一路排到南山塔。喜鵲停在屋脊上，兩扇格子門要一起扶正。", en: "Tiled roofs run all the way to N Seoul Tower. A magpie sits on the ridge; the two lattice doors move together." },
      lowres: true, bg: bgSeoul, animated: true,
      objects: [
      { id: 'magpie', name: { zh: '喜鵲', en: 'Magpie' }, x: 88, y: 216, w: 64, h: 48, mag: 12, draw: drawMagpie, habit: (t, l) => ({ dx: Math.sin(t * 1.4) * 4 * l, dy: -Math.max(0, Math.sin(t * 4)) * 3 * l }), call: 'oldtown_magpie' },
      { id: 'doorl', name: { zh: '左格子門', en: 'Left lattice door' }, x: 68, y: 348, w: 56, h: 88, mag: 9, draw: drawHanokDoor, sfx: 'oldtown_paper', link: { to: 'doorr', k: 0.5 } },
      { id: 'doorr', name: { zh: '右格子門', en: 'Right lattice door' }, x: 132, y: 348, w: 56, h: 88, mag: 14, draw: drawHanokDoor, sfx: 'oldtown_paper' },
      { id: 'sign', name: { zh: '茶館招牌', en: 'Tea house sign' }, x: 232, y: 332, w: 80, h: 44, mag: 6, draw: drawTeaSign, sfx: 'wood' },
      { id: 'chorong', name: { zh: '青紗燈籠', en: 'Silk lantern' }, x: 316, y: 340, w: 40, h: 80, mag: 10, draw: drawChorong, sfx: 'pop' },
      { id: 'onggi', name: { zh: '醬缸', en: 'Onggi jars' }, x: 268, y: 418, w: 104, h: 60, near: true, draw: drawOnggi, sfx: 'oldtown_clay' }
      ] },
    { key: 'oldtown-chaouen', title: { zh: "舍夫沙萬藍城", en: "Blue Chefchaouen" }, place: { zh: "摩洛哥 舍夫沙萬", en: "Chefchaouen, Morocco" },
      intro: { zh: "整座山城刷成藍色。窗上的兩片百葉是一對，有兩樣東西只歪了一點點。", en: "A mountain town painted blue. The window's two shutters work as a pair, and two things are only a hair off." },
      lowres: true, bg: bgChaouen, animated: true,
      objects: [
      { id: 'lantern', name: { zh: '黃銅燈籠', en: 'Brass lantern' }, x: 180, y: 124, w: 40, h: 72, mag: 13, draw: drawBrassLantern, sfx: 'shimmer' },
      { id: 'pot', name: { zh: '花盆', en: 'Flower pot' }, x: 52, y: 128, w: 48, h: 48, near: true, draw: drawPotFlowers, sfx: 'pop' },
      { id: 'shutl', name: { zh: '左百葉窗', en: 'Left shutter' }, x: 262, y: 120, w: 36, h: 64, mag: 7, draw: c => drawShutter(c, false), sfx: 'wood', link: { to: 'shutr', k: 0.7 } },
      { id: 'shutr', name: { zh: '右百葉窗', en: 'Right shutter' }, x: 330, y: 120, w: 36, h: 64, mag: 11, draw: c => drawShutter(c, true), sfx: 'wood' },
      { id: 'door', name: { zh: '藍色木門', en: 'Blue door' }, x: 56, y: 268, w: 64, h: 104, mag: 10, draw: drawChaouenDoor, sfx: 'clunk' },
      { id: 'plate', name: { zh: '彩繪瓷盤', en: 'Painted plate' }, x: 304, y: 252, w: 48, h: 48, near: true, draw: drawPlate, sfx: 'oldtown_clay' },
      { id: 'donkey', name: { zh: '小毛驢', en: 'Donkey' }, x: 240, y: 416, w: 96, h: 80, mag: 8, draw: drawDonkey, habit: (t, l) => ({ dx: Math.sin(t * 1.1) * 4 * l, dy: -Math.abs(Math.sin(t * 2.2)) * 2 * l }), call: 'oldtown_donkey' }
      ] },
    { key: 'oldtown-venice', title: { zh: "威尼斯水巷", en: "Venice Canals" }, place: { zh: "義大利 威尼斯", en: "Venice, Italy" },
      intro: { zh: "貢多拉划過小橋底下，船夫邊划邊唱。窗邊的綠色百葉是一對。", en: "A gondola glides under the bridge, its gondolier singing. The green shutters move as a pair." },
      lowres: true, bg: bgVenice, animated: true,
      objects: [
      { id: 'shutl', name: { zh: '左綠百葉', en: 'Left shutter' }, x: 24, y: 144, w: 32, h: 60, mag: 9, draw: c => drawVShutter(c, false), sfx: 'wood', link: { to: 'shutr', k: 0.6 } },
      { id: 'shutr', name: { zh: '右綠百葉', en: 'Right shutter' }, x: 84, y: 144, w: 32, h: 60, mag: 5, draw: c => drawVShutter(c, true), sfx: 'wood' },
      { id: 'pigeon', name: { zh: '鴿子', en: 'Pigeon' }, x: 184, y: 172, w: 48, h: 40, mag: 12, draw: drawPigeon, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 10 * l, dy: -Math.max(0, Math.sin(t * 6)) * 2 * l }), call: 'oldtown_coo' },
      { id: 'gelato', name: { zh: '冰淇淋招牌', en: 'Gelato sign' }, x: 52, y: 248, w: 88, h: 44, near: true, draw: drawGelato, sfx: 'pop' },
      { id: 'mask', name: { zh: '嘉年華面具', en: 'Carnival mask' }, x: 304, y: 212, w: 64, h: 48, near: true, draw: drawMask, sfx: 'shimmer' },
      { id: 'pole', name: { zh: '條紋繫船柱', en: 'Mooring pole' }, x: 316, y: 392, w: 24, h: 112, mag: 14, draw: drawPalina, sfx: 'clunk' },
      { id: 'gondola', name: { zh: '貢多拉', en: 'Gondola' }, x: 176, y: 412, w: 136, h: 80, mag: 6, draw: drawGondola, habit: (t, l) => ({ dx: Math.sin(t * 0.6) * 6 * l, dy: Math.sin(t * 1.7) * 2 * l }), call: 'oldtown_sing' }
      ] },
    { key: 'oldtown-tainan', title: { zh: "台南老街", en: "Old Tainan" }, place: { zh: "台灣 台南", en: "Tainan, Taiwan" },
      intro: { zh: "廟口的門神、擔仔麵招牌和紅綠郵筒。兩扇廟門一起動；有一樣東西本來就該斜著。", en: "Door guardians, a noodle sign and twin mailboxes. The temple doors move together, and one thing is meant to lean." },
      lowres: true, bg: bgTainan, animated: true,
      objects: [
      { id: 'sign', name: { zh: '擔仔麵招牌', en: 'Noodle shop sign' }, x: 26, y: 140, w: 36, h: 104, near: true, draw: drawDanzai, sfx: 'wood' },
      { id: 'lantern', name: { zh: '廟口燈籠', en: 'Temple lantern' }, x: 72, y: 152, w: 48, h: 72, mag: 14, draw: drawTempleLantern, sfx: 'pop' },
      { id: 'doorl', name: { zh: '左門神', en: 'Left door guardian' }, x: 154, y: 268, w: 52, h: 104, mag: 8, draw: c => drawDoorGod(c, false), sfx: 'bell', link: { to: 'doorr', k: 0.5 } },
      { id: 'doorr', name: { zh: '右門神', en: 'Right door guardian' }, x: 206, y: 268, w: 52, h: 104, mag: 12, draw: c => drawDoorGod(c, true), sfx: 'bell' },
      { id: 'mail', name: { zh: '紅綠郵筒', en: 'Mailboxes' }, x: 316, y: 336, w: 56, h: 72, near: true, draw: drawMailboxes, sfx: 'clunk' },
      { id: 'cat', name: { zh: '三花貓', en: 'Calico cat' }, x: 160, y: 352, w: 44, h: 52, mag: 10, draw: drawCalico, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 5 * l }), call: 'oldtown_mew' },
      { id: 'scooter', name: { zh: '機車', en: 'Scooter' }, x: 252, y: 428, w: 104, h: 72, mag: 6, draw: drawScooter, sfx: 'beep' },
      { id: 'ladder', name: { zh: '竹梯', en: 'Bamboo ladder' }, x: 68, y: 304, w: 24, h: 120, trap: true, keep: 14.5, trapNote: { zh: '梯子本來就要斜靠：照「一比四」原則，大約斜 15°', en: 'Ladders are meant to lean: the 1-in-4 rule puts them about 15° off upright' }, draw: drawLadder }
      ] },
    { key: 'oldtown-lisbon', title: { zh: "里斯本電車", en: "Lisbon Tram" }, place: { zh: "葡萄牙 里斯本", en: "Lisbon, Portugal" },
      intro: { zh: "28 號電車叮叮駛過磁磚牆，坡上的纜車正在爬坡。節慶的沙丁魚吊飾是一串的。", en: "Tram 28 dings past tiled walls while the funicular climbs the hill. The festival sardines hang on one string." },
      lowres: true, bg: bgLisbon, animated: true,
      objects: [
      { id: 'gull', name: { zh: '海鷗', en: 'Seagull' }, x: 44, y: 32, w: 56, h: 40, mag: 12, draw: drawGull, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 2.6)) * 4 * l }), call: 'oldtown_gull' },
      { id: 'tiles', name: { zh: '花磚畫', en: 'Tile panel' }, x: 40, y: 152, w: 48, h: 48, near: true, draw: drawAzulejoPanel, sfx: 'jingle' },
      { id: 'funicular', name: { zh: '登山纜車', en: 'Funicular' }, x: FUN.x, y: FUN.y, w: 96, h: 64, trap: true, keep: FUN.keep, trapNote: { zh: '里斯本的登山纜車沿著陡坡爬，車身本來就跟著坡斜', en: "Lisbon's funicular climbs a steep street: it is meant to ride the slope" }, draw: drawFunicular },
      { id: 'lamp', name: { zh: '壁燈', en: 'Wall lamp' }, x: 28, y: 248, w: 32, h: 60, near: true, draw: drawLisbonLamp, sfx: 'twinkle' },
      { id: 'sardl', name: { zh: '藍沙丁魚', en: 'Blue sardine' }, x: 100, y: 272, w: 56, h: 36, mag: 9, draw: c => drawSardine(c, '#3a8ad8', '#f2c14e'), sfx: 'pop', link: { to: 'sardr', k: 0.8 } },
      { id: 'sardr', name: { zh: '粉沙丁魚', en: 'Pink sardine' }, x: 184, y: 272, w: 56, h: 36, mag: 13, draw: c => drawSardine(c, '#f08ab0', '#3a8ad8'), sfx: 'pop' },
      { id: 'fado', name: { zh: '法朵招牌', en: 'Fado sign' }, x: 312, y: 268, w: 72, h: 44, mag: 7, draw: drawFado, sfx: 'wood' },
      { id: 'tram', name: { zh: '28 號電車', en: 'Tram 28' }, x: 180, y: 384, w: 136, h: 88, mag: 5, draw: drawTram, sfx: 'oldtown_tram' }
      ] },
    { key: 'oldtown-hanoi', title: { zh: "河內三十六街", en: "Hanoi Old Quarter" }, place: { zh: "越南 河內", en: "Hanoi, Vietnam" },
      intro: { zh: "最後一站：電線糾成一團的老街。兩盞燈籠掛在同一條線上，兩塊招牌掛在同一支架子上。", en: "The last stop: an old street under tangled wires. Two lanterns share a wire, and two signs share a bracket." },
      lowres: true, bg: bgHanoi, animated: true,
      objects: [
      { id: 'lanr', name: { zh: '紅絲燈籠', en: 'Red silk lantern' }, x: 72, y: 120, w: 40, h: 72, mag: 11, draw: c => drawSilkLantern(c, '#d8343a', '#a42a20'), sfx: 'pop', link: { to: 'lany', k: 0.6 } },
      { id: 'lany', name: { zh: '黃絲燈籠', en: 'Yellow silk lantern' }, x: 132, y: 124, w: 40, h: 72, near: true, draw: c => drawSilkLantern(c, '#f2c14e', '#c8963a'), sfx: 'pop' },
      { id: 'cage', name: { zh: '鳥籠', en: 'Songbird cage' }, x: 300, y: 132, w: 48, h: 72, mag: 10, draw: drawBirdCage, habit: (t, l) => ({ dy: Math.sin(t * 1.3) * 3 * l }), call: 'oldtown_tweet' },
      { id: 'pho', name: { zh: '河粉招牌', en: 'Pho sign' }, x: 304, y: 234, w: 80, h: 40, mag: 8, draw: c => drawHanoiSign(c, 'PHỞ', 17), sfx: 'wood', link: { to: 'buncha', k: 0.7 } },
      { id: 'buncha', name: { zh: '烤肉米線招牌', en: 'Bun cha sign' }, x: 304, y: 288, w: 80, h: 40, mag: 14, draw: c => drawHanoiSign(c, 'BÚN CHẢ', 13), sfx: 'wood' },
      { id: 'vendor', name: { zh: '挑花小販', en: 'Flower vendor' }, x: 76, y: 400, w: 104, h: 96, mag: 7, draw: drawVendor, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 8 * l, dy: -Math.abs(Math.sin(t * 3)) * 2 * l }), call: 'oldtown_vendor' },
      { id: 'phin', name: { zh: '越南滴漏咖啡', en: 'Drip coffee' }, x: 184, y: 400, w: 40, h: 56, near: true, draw: drawPhin, sfx: 'oldtown_clay' },
      { id: 'cub', name: { zh: '老機車', en: 'Motorbike' }, x: 276, y: 436, w: 104, h: 64, mag: 5, draw: drawCub, sfx: 'beep' }
      ] },
  ],
});
