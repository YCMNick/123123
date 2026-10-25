// 第 9 大關 霓虹樂園 / World 9: Neon Park (Neon).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 9-1 Neon night: neon tubes ===== */
function neon(c, path, col, lw = 3) {
  c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
  c.shadowColor = col; c.shadowBlur = 14 * KPX; c.strokeStyle = col; c.lineWidth = lw; path(); c.stroke();
  c.shadowBlur = 0; c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = lw * 0.35; path(); c.stroke();
  c.restore();
}
function neonText(c, s, x, y, font, col) {
  c.save(); c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.shadowColor = col; c.shadowBlur = 12 * KPX; c.fillStyle = col; c.fillText(s, x, y);
  c.shadowBlur = 0; c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 0.7; c.strokeText(s, x, y);
  c.restore();
}
// Glow (shadowBlur) is expensive, so every object is drawn once into a cached
// sprite at the current pixel ratio. The key includes the language (text
// differs) and the web-font state. A rotated drawImage is slow too, so each
// sprite also keeps its last two rotated copies: while an object is not being
// turned, a frame is a plain, unrotated stamp.
const SPR = new Map();
function spr(c, id, w, h, fn, pad = 18) {
  const k = KPX, key = id + '|' + k + '|' + T('zh', 'en') + '|' + (document.fonts ? document.fonts.status : '');
  let s = SPR.get(key);
  if (!s) {
    if (SPR.size > 600) SPR.clear();
    s = document.createElement('canvas');
    s.width = Math.ceil((w + pad * 2) * k); s.height = Math.ceil((h + pad * 2) * k);
    s.cx = (w / 2 + pad) * k; s.cy = (h / 2 + pad) * k; s.rot = [];
    const g = s.getContext('2d'); g.setTransform(k, 0, 0, k, s.cx, s.cy); fn(g);
    SPR.set(key, s);
  }
  const m = c.getTransform(), rk = [m.a, m.b, m.c, m.d].map(v => Math.round(v / k * 2e4)).join(',');
  let r = s.rot.find(x => x.key === rk);
  if (r && r !== s.rot[0]) s.rot = [r, ...s.rot.filter(x => x !== r)];   // most recently used first
  if (!r) {
    const a = m.a / k, b = m.b / k, cc = m.c / k, d = m.d / k, mx = Math.max(s.cx, s.width - s.cx), my = Math.max(s.cy, s.height - s.cy);
    // reuse the older copy's canvas while an object is being turned (no new canvas per frame)
    const cv = s.rot.length > 1 ? s.rot.pop().cv : document.createElement('canvas');
    cv.width = Math.ceil(2 * (Math.abs(a) * mx + Math.abs(cc) * my)) + 2; cv.height = Math.ceil(2 * (Math.abs(b) * mx + Math.abs(d) * my)) + 2;
    const g = cv.getContext('2d'); g.setTransform(a, b, cc, d, cv.width / 2, cv.height / 2); g.drawImage(s, -s.cx, -s.cy);
    r = { key: rk, cv }; s.rot.unshift(r);
  }
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(r.cv, Math.round(m.e - r.cv.width / 2), Math.round(m.f - r.cv.height / 2)); c.restore();
}
function bgNeon(c) {
  let g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0b0618'); g.addColorStop(0.7, '#1d0b33'); g.addColorStop(1, '#0a0614');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(255,255,255,.035)'; c.lineWidth = 1;
  for (let y = 0, r = 0; y < 400; y += 14, r++) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); for (let x = (r % 2) * 14; x < W; x += 28) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 14); c.stroke(); } }
  c.save(); c.globalAlpha = 0.5;
  neon(c, () => { c.beginPath(); c.arc(90, 130, 80, 0, Math.PI * 2); }, '#5ee7ff', 2);
  for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; neon(c, () => { c.beginPath(); c.moveTo(90, 130); c.lineTo(90 + Math.cos(an) * 80, 130 + Math.sin(an) * 80); }, '#5ee7ff', 1); circ(c, 90 + Math.cos(an) * 80, 130 + Math.sin(an) * 80, 4, '#ff5ec4'); }
  neon(c, () => { c.beginPath(); c.moveTo(60, 240); c.lineTo(90, 130); c.lineTo(120, 240); }, '#5ee7ff', 2);
  c.restore();
  for (let x = 0, k = 0; x <= W; x += 18, k++) circ(c, x, 24 + Math.sin(x / 57) * 8, 2.5, ['#ffd166', '#ff5ec4', '#5ee7ff'][k % 3]);
  g = c.createLinearGradient(0, 400, 0, H); g.addColorStop(0, '#1a0d2c'); g.addColorStop(1, '#2a1240');
  c.fillStyle = g; c.fillRect(0, 400, W, 80);
  c.fillStyle = 'rgba(255,94,196,.12)'; c.fillRect(0, 404, W, 2);
}
function drawOpen(c, a) {
  spr(c, 'n-open', 120, 50, c => {
    rr(c, -60, -25, 120, 50, 8); c.fillStyle = 'rgba(20,8,30,.85)'; c.fill();
    neon(c, () => rr(c, -56, -21, 112, 42, 6), '#ff5ec4', 2.5);
    neonText(c, '24H', 34, 1, '700 13px "JetBrains Mono", monospace', '#5ee7ff');
  });
  const fl = Math.sin(a.t * 23) > 0.92 || Math.sin(a.t * 3.1) > 0.97 ? 0.25 : 1;
  c.save(); c.globalAlpha = fl; spr(c, 'n-open-tx', 120, 50, c => neonText(c, 'OPEN', -14, 0, '800 22px "JetBrains Mono", monospace', '#ffd166')); c.restore();
}
function drawRides(c) {
  spr(c, 'n-rides', 140, 50, c => {
    neon(c, () => { c.beginPath(); c.moveTo(-66, -14); c.lineTo(40, -14); c.lineTo(40, -24); c.lineTo(68, 0); c.lineTo(40, 24); c.lineTo(40, 14); c.lineTo(-66, 14); c.closePath(); }, '#5ee7ff', 2.5);
    neonText(c, 'RIDES', -10, 1, '800 18px "JetBrains Mono", monospace', '#5ee7ff');
  });
}
function drawHorse(c, a) {
  const lg = Math.round(Math.sin(a.t * 4) * a.live * 0.4 * 10) / 10;
  spr(c, 'n-horse' + lg, 70, 120, c => {
    neon(c, () => { c.beginPath(); c.moveTo(0, -60); c.lineTo(0, 60); }, '#ffd166', 2);
    const body = () => { c.beginPath(); c.moveTo(-26, 8); c.quadraticCurveTo(-28, -10, -10, -10); c.lineTo(14, -10); c.quadraticCurveTo(18, -30, 30, -32); c.lineTo(34, -24); c.quadraticCurveTo(26, -20, 24, -6); c.quadraticCurveTo(26, 10, 10, 12); c.lineTo(-14, 12); c.closePath(); };
    body(); c.fillStyle = 'rgba(255,94,196,.18)'; c.fill();
    neon(c, body, '#ff5ec4', 2.5);
    [[-18, 12, -0.5 - lg], [-10, 12, 0.4 + lg], [12, 12, -0.3 - lg], [20, 10, 0.6 + lg]].forEach(([x, y, r]) => neon(c, () => { c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(r) * 18, y + Math.cos(r) * 18); }, '#ff5ec4', 2.2));
    neon(c, () => { c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-40, 4, -38, 22); }, '#c77dff', 2.5);
    neon(c, () => { c.beginPath(); c.moveTo(22, -28); c.quadraticCurveTo(12, -24, 10, -12); }, '#c77dff', 2.5);
    circ(c, 28, -27, 1.8, '#fff');
  });
}
function drawIce(c) {
  spr(c, 'n-ice', 60, 100, c => {
    neon(c, () => { c.beginPath(); c.moveTo(-20, 0); c.lineTo(0, 46); c.lineTo(20, 0); c.closePath(); }, '#ffd166', 2.5);
    neon(c, () => { c.beginPath(); c.moveTo(-12, 8); c.lineTo(6, 26); c.moveTo(12, 8); c.lineTo(-6, 26); }, '#ffd166', 1.4);
    neon(c, () => { c.beginPath(); c.arc(-8, -8, 14, Math.PI * 0.8, Math.PI * 2.1); }, '#ff5ec4', 2.5);
    neon(c, () => { c.beginPath(); c.arc(9, -10, 13, Math.PI * 0.9, Math.PI * 2.2); }, '#5ee7ff', 2.5);
    neon(c, () => { c.beginPath(); c.arc(0, -28, 11, Math.PI, Math.PI * 2); }, '#c77dff', 2.5);
    circ(c, 2, -42, 4, '#ff4a5c');
  });
}
function drawHeart(c) {
  spr(c, 'n-heart', 50, 80, c => {
    neon(c, () => { c.beginPath(); c.moveTo(0, 2); c.bezierCurveTo(-26, -14, -16, -40, 0, -26); c.bezierCurveTo(16, -40, 26, -14, 0, 2); c.closePath(); }, '#ff4a5c', 2.5);
    neon(c, () => { c.beginPath(); c.moveTo(0, 2); c.quadraticCurveTo(-8, 20, 4, 38); }, '#ffd166', 1.2);
  });
}
function drawTickets(c) {
  spr(c, 'n-tickets', 140, 52, c => {
    neon(c, () => { c.beginPath(); c.moveTo(-70, -26); c.lineTo(70, -26); c.moveTo(-40, -26); c.lineTo(-40, -16); c.moveTo(40, -26); c.lineTo(40, -16); }, '#c77dff', 1.8);
    rr(c, -62, -16, 124, 36, 6); c.fillStyle = 'rgba(20,8,30,.85)'; c.fill();
    neon(c, () => rr(c, -62, -16, 124, 36, 6), '#5ee7ff', 2.2);
    neonText(c, 'TICKETS', 0, 2, '800 18px "JetBrains Mono", monospace', '#ffd166');
  });
}
function drawPrice(c) {
  spr(c, 'n-price', 64, 40, c => {
    rr(c, -32, -20, 64, 40, 6); c.fillStyle = 'rgba(20,8,30,.85)'; c.fill();
    neon(c, () => rr(c, -32, -20, 64, 40, 6), '#ff5ec4', 2.2);
    neonText(c, '$5', 0, 1, '800 18px "JetBrains Mono", monospace', '#5ee7ff');
  });
}

/* ===== shared neon kit for stages 2-10 ===== */
const { q, note, puff } = QS;
const NC = { pink: '#ff5ec4', cyan: '#5ee7ff', gold: '#ffd166', violet: '#c77dff', red: '#ff4a5c', green: '#7dffb0', orange: '#ff9f5a', white: '#e9fbff', blue: '#7a9bff' };
const INK = 'rgba(20,8,30,.88)';
const FM = '"JetBrains Mono", "Noto Sans TC", monospace';
const FZ = '"Noto Sans TC", sans-serif';
const FB = '"Bangers", "Noto Sans TC", sans-serif';
const SF = () => T(FZ, FM);
const hsh = i => { const v = Math.sin(i * 12.9898) * 43758.5453; return v - Math.floor(v); };
const fr = (a, rate, n) => a.live > 0.02 ? Math.floor(a.t * rate) % n : 0;   // animation frame, 0 once settled
const blink = a => a.live > 0.02 && (a.t * 0.8) % 3 < 0.14 ? 1 : 0;

function nLine(c, pts, col, lw = 2.4) { neon(c, () => { c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); }, col, lw); }
function nCirc(c, x, y, r, col, lw = 2.4, a0 = 0, a1 = Math.PI * 2) { neon(c, () => { c.beginPath(); c.arc(x, y, r, a0, a1); }, col, lw); }
function nEll(c, x, y, rx, ry, col, lw = 2.4) { neon(c, () => { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); }, col, lw); }
function nShape(c, path, col, fill, lw = 2.4) { if (fill) { path(); c.fillStyle = fill; c.fill(); } neon(c, path, col, lw); }
function plate(c, x, y, w, h, r, col, lw = 2.4) { rr(c, x, y, w, h, r); c.fillStyle = INK; c.fill(); neon(c, () => rr(c, x, y, w, h, r), col, lw); }
function fit(c, s, maxW, size, fam, wt = 800) { let z = size; for (;;) { c.font = `${wt} ${z}px ${fam}`; if (z <= 7 || c.measureText(s).width <= maxW) return c.font; z -= 0.5; } }
function label(c, s, x, y, maxW, size, col, fam = SF(), wt = 800) { neonText(c, s, x, y, fit(c, s, maxW, size, fam, wt), col); }
function bulb(c, x, y, r, col) { c.save(); c.globalAlpha = 0.3; circ(c, x, y, r * 2.3, col); c.restore(); circ(c, x, y, r, col); circ(c, x - r * 0.3, y - r * 0.3, r * 0.45, '#fff'); }
function hangers(c, xs, y0, y1, col = NC.violet) { neon(c, () => { c.beginPath(); for (const x of xs) { c.moveTo(x, y0); c.lineTo(x, y1); } }, col, 1.6); }
function eyes(c, xs, y, r, shut) {
  for (const x of xs) {
    if (shut) { c.strokeStyle = '#2a1240'; c.lineWidth = 1.4; c.beginPath(); c.arc(x, y - r * 0.2, r, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
    else { circ(c, x, y, r, '#2a1240'); circ(c, x - r * 0.35, y - r * 0.35, r * 0.4, '#fff'); }
  }
}
// Background pieces (drawn once per stage, so glow is free here).
function sky(c, stops) { const g = c.createLinearGradient(0, 0, 0, H); for (const [p, col] of stops) g.addColorStop(p, col); c.fillStyle = g; c.fillRect(0, 0, W, H); }
function stars(c, n, y1, seed = 1) { for (let i = 0; i < n; i++) { c.globalAlpha = 0.25 + hsh(i * 13 + seed) * 0.6; circ(c, hsh(i * 3 + seed) * W, hsh(i * 7 + seed * 5) * y1, 0.4 + hsh(i * 11 + seed) * 1.1, '#fff'); } c.globalAlpha = 1; }
function glow(c, x, y, r, col, a = 0.35) { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); c.save(); c.globalAlpha = a; c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.restore(); }
function bricks(c, y0, y1, a = 0.035) { c.strokeStyle = `rgba(255,255,255,${a})`; c.lineWidth = 1; for (let y = y0, r = 0; y < y1; y += 14, r++) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); for (let x = (r % 2) * 14; x < W; x += 28) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, Math.min(y + 14, y1)); c.stroke(); } } }
function lights(c, y, amp, step, k0 = 0) {
  const f = x => y + Math.sin(x / 57 + k0) * amp;
  c.strokeStyle = 'rgba(255,255,255,.14)'; c.lineWidth = 1; c.beginPath(); for (let x = 0; x <= W; x += 4) x ? c.lineTo(x, f(x)) : c.moveTo(x, f(x)); c.stroke();
  for (let x = 4, k = 0; x <= W; x += step, k++) bulb(c, x, f(x) + 2.5, 2.2, [NC.gold, NC.pink, NC.cyan][k % 3]);
}
function skyline(c, base, seed, fill, a = 0.5) {
  for (let x = -6, i = 0; x < W; i++) {
    const w = 18 + hsh(i * 5 + seed) * 30, h = 26 + hsh(i * 9 + seed) * 80;
    c.fillStyle = fill; c.fillRect(x, base - h, w - 2, h);
    c.fillStyle = `rgba(255,209,102,${a * 0.35})`;
    for (let wy = base - h + 6; wy < base - 6; wy += 9) for (let wx = x + 4; wx < x + w - 6; wx += 7) if (hsh(wx * 3 + wy * 7 + seed) > 0.55) c.fillRect(wx, wy, 2.5, 3.5);
    x += w;
  }
}
function burst(c, x, y, r, col, n = 18) {
  glow(c, x, y, r * 1.3, col, 0.18);
  for (let k = 0; k < n; k++) {
    const an = k / n * Math.PI * 2 + hsh(k + x) * 0.1, r0 = r * 0.22, r1 = r * (0.78 + hsh(k * 3 + y) * 0.22);
    neon(c, () => { c.beginPath(); c.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); c.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); }, col, 1.3);
    circ(c, x + Math.cos(an) * (r1 + 4), y + Math.sin(an) * (r1 + 4), 1.6, '#fff');
  }
}

/* ----- sounds ----- */
defineCreatureSound('park_bunny', (ac, o, t) => { [0, 0.13].forEach((d, k) => q(ac, o, t + d, [[0, 1800 + k * 300], [0.05, 2600 + k * 300], [0.1, 2100]], 0.1, { vol: 0.38 })); note(ac, o, t + 0.3, 2637, 0.2, 0.2); });
defineCreatureSound('park_pony', (ac, o, t) => { q(ac, o, t, [[0, 900], [0.1, 1500], [0.42, 1100]], 0.46, { trem: [22, 0.55], vol: 0.36 }); [1319, 1568, 2093].forEach((f, k) => note(ac, o, t + 0.48 + k * 0.08, f, 0.22, 0.2)); });
defineCreatureSound('park_giraffe', (ac, o, t) => { q(ac, o, t, [[0, 520], [0.16, 660], [0.5, 560]], 0.55, { vib: [5, 10], attack: 0.05, vol: 0.4 }); note(ac, o, t + 0.56, 1568, 0.2, 0.2); });
defineCreatureSound('park_ghost', (ac, o, t) => q(ac, o, t, [[0, 520], [0.22, 800], [0.65, 470]], 0.7, { vib: [7, 30], attack: 0.08, vol: 0.38 }));
defineCreatureSound('park_bat', (ac, o, t) => [0, 0.08, 0.16].forEach((d, k) => q(ac, o, t + d, [[0, 2500 + k * 200], [0.04, 3000 + k * 200]], 0.05, { attack: 0.003, vol: 0.32 })));
defineCreatureSound('park_duck', (ac, o, t) => [0, 0.16].forEach(d => q(ac, o, t + d, [[0, 1100], [0.04, 1500], [0.12, 1250]], 0.13, { trem: [30, 0.4], vol: 0.4, over: 0.3 })));
defineCreatureSound('park_bear', (ac, o, t) => { q(ac, o, t, [[0, 420], [0.12, 560], [0.3, 480]], 0.32, { vib: [6, 10], vol: 0.42, over: 0.22 }); q(ac, o, t + 0.36, [[0, 600], [0.15, 760]], 0.2, { vol: 0.36 }); });
defineCreatureSound('park_dolphin', (ac, o, t) => [0, 0.12, 0.24].forEach((d, k) => q(ac, o, t + d, [[0, 2000 + k * 250], [0.05, 2900 + k * 250], [0.1, 2400]], 0.1, { vib: [30, 80], vol: 0.34 })));
defineCreatureSound('park_dragon', (ac, o, t) => { q(ac, o, t, [[0, 480], [0.12, 820], [0.4, 600]], 0.42, { trem: [18, 0.45], vol: 0.42, over: 0.25 }); puff(ac, o, t + 0.3, 0.25, 2400, 0.06); note(ac, o, t + 0.5, 1760, 0.2, 0.2); });
defineThingSound('park_ride', (ac, o, t, r) => [1, 1.26, 1.5, 2].forEach((m, k) => note(ac, o, t + k * 0.07, 1047 * r * m, 0.2, 0.22)));
defineThingSound('park_burner', (ac, o, t, r) => { puff(ac, o, t, 0.28, 900, 0.2); q(ac, o, t + 0.05, [[0, 700 * r], [0.3, 1100 * r]], 0.32, { vib: [12, 20], vol: 0.26 }); });
defineThingSound('park_neon', (ac, o, t, r) => { q(ac, o, t, [[0, 1300 * r], [0.12, 1300 * r]], 0.12, { trem: [40, 0.7], vol: 0.25 }); note(ac, o, t + 0.12, 2100 * r, 0.22, 0.26); });
defineThingSound('park_splash', (ac, o, t, r) => { puff(ac, o, t, 0.22, 1800, 0.16); q(ac, o, t + 0.04, [[0, 1600 * r], [0.18, 700 * r]], 0.2, { vol: 0.3 }); });

/* ===== 9-2 Ferris wheel ===== */
const WC = { x: 180, y: 190, R: 125 };
function gondolaArt(c, col, acc, bunny = 0) {
  nLine(c, [0, -28, 0, -16], NC.gold, 1.8); circ(c, 0, -27, 2.4, NC.gold);
  const body = () => rr(c, -21, -14, 42, 34, 10);
  body(); c.fillStyle = INK; c.fill();
  neon(c, () => { c.beginPath(); c.moveTo(-17, -14); c.quadraticCurveTo(0, -24, 17, -14); }, acc, 2);
  neon(c, body, col, 2.4);
  if (bunny) {
    rr(c, -16, -9, 32, 19, 5); c.fillStyle = 'rgba(94,231,255,.14)'; c.fill();
    const ear = (x, r) => { c.save(); c.translate(x, -4); c.rotate(r); ell(c, 0, -6, 2.6, 6.5, '#fff1f8'); ell(c, 0, -6, 1.2, 4.5, '#ff9dd6'); c.restore(); };
    ear(-3.5, -0.15); ear(3.5, bunny === 2 ? 0.7 : 0.15);
    circ(c, 0, 3, 7.5, '#fff1f8'); eyes(c, [-2.8, 2.8], 2.2, 1.2); circ(c, 0, 5, 1.1, NC.pink);
    c.globalAlpha = 0.5; circ(c, -5, 5.5, 1.6, NC.pink); circ(c, 5, 5.5, 1.6, NC.pink); c.globalAlpha = 1;
    neon(c, () => rr(c, -16, -9, 32, 19, 5), acc, 1.2);
  } else {
    for (const x of [-16, 3]) { rr(c, x, -9, 13, 14, 4); c.fillStyle = 'rgba(255,209,102,.16)'; c.fill(); neon(c, () => rr(c, x, -9, 13, 14, 4), acc, 1.2); }
  }
  nLine(c, [-18, 13, 18, 13], acc, 1.2);
  bulb(c, 0, 23, 2, acc);
}
function bgWheel(c) {
  sky(c, [[0, '#060a1d'], [0.5, '#170f3a'], [0.8, '#2a124a'], [1, '#100720']]);
  stars(c, 80, 300, 2);
  c.fillStyle = '#120a2a'; c.beginPath(); c.moveTo(0, 360); for (let x = 0; x <= W; x += 20) c.lineTo(x, 336 - Math.sin(x / 70) * 16 - Math.sin(x / 23) * 4); c.lineTo(W, 400); c.lineTo(0, 400); c.fill();
  skyline(c, 400, 3, '#0e0820', 0.6);
  const { x, y, R } = WC;
  glow(c, x, y, R * 1.25, '#7a3cff', 0.25);
  nLine(c, [x, y, 122, 398, 238, 398, x, y], NC.cyan, 3);
  nLine(c, [140, 330, 220, 330], NC.cyan, 1.6);
  c.save(); c.globalAlpha = 0.65;
  for (let k = 0; k < 24; k++) { const an = k * Math.PI / 12; nLine(c, [x + Math.cos(an) * 20, y + Math.sin(an) * 20, x + Math.cos(an) * (R - 12), y + Math.sin(an) * (R - 12)], k % 2 ? NC.violet : NC.cyan, k % 2 ? 0.9 : 1.4); }
  c.restore();
  nCirc(c, x, y, R - 12, NC.violet, 1.4); nCirc(c, x, y, R, NC.pink, 3); nCirc(c, x, y, 20, NC.gold, 2.4); nCirc(c, x, y, 8, NC.pink, 2);
  for (let k = 0; k < 36; k++) { const an = k * Math.PI / 18; bulb(c, x + Math.cos(an) * R, y + Math.sin(an) * R, 1.8, [NC.gold, NC.cyan, NC.white][k % 3]); }
  // the other gondolas, already level, a bit dimmer
  c.save(); c.globalAlpha = 0.36;
  for (const deg of [0, 30, 90, 120, 150, 180, 240, 270, 300]) {
    const an = deg * Math.PI / 180; c.save(); c.translate(x + Math.cos(an) * R, y + Math.sin(an) * R + 28);
    gondolaArt(c, [NC.cyan, NC.violet, NC.gold][deg / 30 % 3], NC.pink); c.restore();
  }
  c.restore();
  // mall roof the wheel stands on
  let g = c.createLinearGradient(0, 398, 0, H); g.addColorStop(0, '#1d0d33'); g.addColorStop(1, '#0c0618');
  c.fillStyle = g; c.fillRect(0, 398, W, 82);
  nLine(c, [0, 400, W, 400], NC.pink, 2);
  c.fillStyle = 'rgba(94,231,255,.07)'; for (let wx = 8; wx < W; wx += 22) c.fillRect(wx, 412, 14, 60);
}
const drawGondolaPink = c => spr(c, 'w-gp', 50, 56, g => gondolaArt(g, NC.pink, NC.gold));
const drawGondolaGold = c => spr(c, 'w-gg', 50, 56, g => gondolaArt(g, NC.gold, NC.cyan));
function drawGondolaBunny(c, a) { const f = a.live > 0.02 && Math.sin(a.t * 2.3) > 0.7 ? 2 : 1; spr(c, 'w-gb' + f, 50, 56, g => gondolaArt(g, NC.cyan, NC.pink, f)); }
function drawWheelSign(c) {
  spr(c, 'w-sign', 170, 46, c => {
    plate(c, -82, -21, 164, 42, 9, NC.gold, 2.4);
    for (let i = 0; i < 12; i++) { bulb(c, -71 + i * 12.9, -21, 1.6, i % 2 ? NC.pink : NC.white); bulb(c, -71 + i * 12.9, 21, 1.6, i % 2 ? NC.white : NC.pink); }
    label(c, T('摩天輪', 'SKY WHEEL'), 0, 1, 124, 20, NC.pink);
    for (const sx of [-1, 1]) nLine(c, [sx * 70, -5, sx * 70, 5, sx * 70, 0, sx * 65, 0, sx * 75, 0], NC.cyan, 1.4);
  });
}

/* ===== 9-3 Carousel ===== */
function horseArt(c, col, mane, pole = NC.gold) {
  neon(c, () => { c.beginPath(); c.moveTo(0, -66); c.lineTo(0, 66); }, pole, 2.2);
  c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 1; for (let y = -60; y < 62; y += 8) { c.beginPath(); c.moveTo(-2, y); c.lineTo(2, y + 4); c.stroke(); }
  circ(c, 0, -67, 3.5, pole); circ(c, 0, 67, 3.5, pole);
  c.save(); c.scale(1.22, 1.22);
  const body = () => { c.beginPath(); c.moveTo(-26, 8); c.quadraticCurveTo(-28, -10, -10, -10); c.lineTo(14, -10); c.quadraticCurveTo(18, -30, 30, -32); c.lineTo(34, -24); c.quadraticCurveTo(26, -20, 24, -6); c.quadraticCurveTo(26, 10, 10, 12); c.lineTo(-14, 12); c.closePath(); };
  body(); c.fillStyle = col === NC.pink ? 'rgba(255,94,196,.2)' : 'rgba(94,231,255,.2)'; c.fill();
  rr(c, -14, -11, 22, 10, 3); c.fillStyle = 'rgba(255,209,102,.35)'; c.fill();
  neon(c, body, col, 2.2);
  // legs: front pair prancing, back pair down
  for (const [x, y, a1, a2] of [[-18, 12, 0.2, -0.3], [-10, 12, -0.15, 0.3], [12, 12, -1.0, 0.6], [20, 10, -1.25, 0.4]]) {
    neon(c, () => { c.beginPath(); c.moveTo(x, y); const kx = x + Math.sin(-a1) * 10, ky = y + Math.cos(a1) * 10; c.lineTo(kx, ky); c.lineTo(kx + Math.sin(a2) * 9, ky + Math.cos(a2) * 9); }, col, 2);
  }
  neon(c, () => { c.beginPath(); c.moveTo(-12, -11); c.quadraticCurveTo(-1, -19, 8, -11); }, NC.gold, 1.8);
  neon(c, () => { c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-42, 2, -38, 24); c.moveTo(-26, 2); c.quadraticCurveTo(-36, 10, -32, 22); }, mane, 2.2);
  neon(c, () => { c.beginPath(); c.moveTo(24, -30); c.quadraticCurveTo(12, -26, 10, -12); c.moveTo(27, -32); c.quadraticCurveTo(18, -34, 16, -24); }, mane, 2.2);
  neon(c, () => { c.beginPath(); c.moveTo(31, -24); c.lineTo(22, -14); c.lineTo(4, -11); }, NC.gold, 1);
  circ(c, 28, -27, 1.8, '#fff'); circ(c, 22, -14, 1.6, NC.gold);
  c.restore();
}
const drawHorseA = c => spr(c, 'c-ha', 86, 140, g => horseArt(g, NC.pink, NC.violet));
const drawHorseB = c => spr(c, 'c-hb', 86, 140, g => { g.scale(-1, 1); horseArt(g, NC.cyan, NC.gold, NC.pink); });
function drawMirror(c) {
  spr(c, 'c-mirror', 50, 68, c => {
    const g = c.createRadialGradient(-5, -8, 2, 0, 0, 30); g.addColorStop(0, 'rgba(230,200,255,.55)'); g.addColorStop(1, 'rgba(40,16,70,.95)');
    c.beginPath(); c.ellipse(0, 2, 18, 25, 0, 0, Math.PI * 2); c.fillStyle = g; c.fill();
    c.save(); c.clip(); c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-14, 6); c.lineTo(6, -20); c.moveTo(-8, 16); c.lineTo(12, -10); c.stroke(); c.restore();
    nEll(c, 0, 2, 18, 25, NC.gold, 2.4);
    for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2; bulb(c, Math.cos(an) * 22, 2 + Math.sin(an) * 29, 1.4, k % 2 ? NC.pink : NC.white); }
    neon(c, () => { c.beginPath(); c.moveTo(-8, -28); c.lineTo(-5, -34); c.lineTo(0, -29); c.lineTo(5, -34); c.lineTo(8, -28); }, NC.gold, 1.6);
  });
}
function drawSwan(c) {
  spr(c, 'c-swan', 104, 60, c => {
    const boat = () => { c.beginPath(); c.moveTo(-46, -4); c.quadraticCurveTo(-46, 22, -12, 22); c.lineTo(24, 22); c.quadraticCurveTo(40, 20, 38, 4); c.lineTo(-30, 4); c.closePath(); };
    nShape(c, boat, NC.white, 'rgba(24,40,62,.94)', 2.4);
    neon(c, () => { c.beginPath(); c.moveTo(-40, 8); c.quadraticCurveTo(-26, 2, -20, 12); c.quadraticCurveTo(-12, 4, -4, 14); c.quadraticCurveTo(4, 6, 10, 15); }, NC.pink, 1.6);
    neon(c, () => { c.beginPath(); c.moveTo(30, 6); c.bezierCurveTo(48, -6, 24, -20, 34, -26); }, NC.white, 2.6);
    nCirc(c, 38, -24, 4.5, NC.white, 2); poly(c, [42, -26, 50, -23, 42, -21], NC.orange); circ(c, 38, -25, 1.2, '#2a1240');
    neon(c, () => { c.beginPath(); c.moveTo(-46, -4); c.quadraticCurveTo(-50, -18, -40, -22); c.quadraticCurveTo(-34, -22, -36, -16); }, NC.violet, 2);
    nLine(c, [-44, 27, 40, 27], NC.gold, 2);
    for (let i = 0; i < 6; i++) bulb(c, -36 + i * 14, 27, 1.4, i % 2 ? NC.pink : NC.gold);
  });
}
function drawCarouselSign(c) {
  spr(c, 'c-sign', 150, 40, c => {
    plate(c, -73, -18, 146, 36, 8, NC.violet, 2.4);
    label(c, T('旋轉木馬', 'CAROUSEL'), 0, 1, 112, 19, NC.gold);
    for (const sx of [-1, 1]) { bulb(c, sx * 64, 0, 2, NC.pink); }
  });
}
function bgCarousel(c) {
  sky(c, [[0, '#0b0518'], [0.6, '#1f0a35'], [1, '#0a0514']]);
  bricks(c, 150, 410, 0.03);
  glow(c, 180, 260, 200, '#ff5ec4', 0.12);
  // canopy roof
  c.beginPath(); c.moveTo(14, 110); c.quadraticCurveTo(100, 60, 180, 28); c.quadraticCurveTo(260, 60, 346, 110); c.closePath(); c.fillStyle = '#1b0b2e'; c.fill();
  c.save(); c.globalAlpha = 0.8;
  for (let i = 1; i < 10; i++) { const bx = 14 + i * 33.2; nLine(c, [180, 30, bx, 110], i % 2 ? NC.gold : NC.pink, 1.3); }
  c.restore();
  neon(c, () => { c.beginPath(); c.moveTo(14, 110); c.quadraticCurveTo(100, 60, 180, 28); c.quadraticCurveTo(260, 60, 346, 110); }, NC.pink, 2.6);
  nLine(c, [180, 28, 180, 12], NC.gold, 2); poly(c, [180, 10, 196, 15, 180, 20], NC.gold); circ(c, 180, 28, 4, NC.gold);
  c.fillStyle = '#160926'; c.fillRect(14, 110, 332, 36);
  nLine(c, [14, 110, 346, 110], NC.gold, 2); nLine(c, [14, 146, 346, 146], NC.gold, 2);
  for (let x = 22, k = 0; x < 346; x += 14, k++) if (x < 100 || x > 260) bulb(c, x, 128, 2, k % 2 ? NC.pink : NC.white);
  for (let x = 14, k = 0; x < 346; x += 24, k++) { neon(c, () => { c.beginPath(); c.arc(x + 12, 146, 12, 0, Math.PI); }, k % 2 ? NC.cyan : NC.pink, 1.8); bulb(c, x + 12, 160, 2, NC.gold); }
  // centre column
  c.fillStyle = '#140824'; c.fillRect(156, 162, 48, 246);
  nLine(c, [156, 162, 156, 408], NC.gold, 1.4); nLine(c, [204, 162, 204, 408], NC.gold, 1.4);
  for (const yy of [190, 330]) neon(c, () => { c.beginPath(); c.moveTo(180, yy - 12); c.lineTo(192, yy); c.lineTo(180, yy + 12); c.lineTo(168, yy); c.closePath(); }, NC.violet, 1.3);
  // back-row horses
  c.save(); c.globalAlpha = 0.28;
  c.save(); c.translate(124, 240); c.scale(0.55, 0.55); horseArt(c, NC.cyan, NC.gold); c.restore();
  c.save(); c.translate(236, 236); c.scale(-0.55, 0.55); horseArt(c, NC.pink, NC.violet); c.restore();
  c.restore();
  // platform
  c.beginPath(); c.moveTo(6, 408); c.quadraticCurveTo(180, 434, 354, 408); c.lineTo(354, 444); c.quadraticCurveTo(180, 470, 6, 444); c.closePath(); c.fillStyle = '#1b0b2e'; c.fill();
  neon(c, () => { c.beginPath(); c.moveTo(6, 408); c.quadraticCurveTo(180, 434, 354, 408); }, NC.gold, 2.4);
  neon(c, () => { c.beginPath(); c.moveTo(6, 444); c.quadraticCurveTo(180, 470, 354, 444); }, NC.pink, 1.6);
  for (let i = 0; i <= 16; i++) { const t = i / 16, x = (1 - t) * (1 - t) * 6 + 2 * t * (1 - t) * 180 + t * t * 354, y = (1 - t) * (1 - t) * 426 + 2 * t * (1 - t) * 452 + t * t * 426; bulb(c, x, y, 1.8, [NC.gold, NC.cyan, NC.pink][i % 3]); }
  c.fillStyle = '#0a0513'; c.beginPath(); c.moveTo(0, 470); c.quadraticCurveTo(180, 480, 360, 470); c.lineTo(360, 480); c.lineTo(0, 480); c.fill();
}

/* ===== 9-4 Roller coaster ===== */
function carArt(c, col, acc, front, hair) {
  const body = front
    ? () => { c.beginPath(); c.moveTo(-42, -6); c.lineTo(22, -6); c.quadraticCurveTo(44, -6, 44, 10); c.lineTo(44, 14); c.lineTo(-42, 14); c.closePath(); }
    : () => rr(c, -42, -6, 84, 20, 6);
  // riders, arms up
  for (const [x, hc] of [[-22, hair[0]], [8, hair[1]]]) {
    nLine(c, [x - 6, -8, x - 11, -22], NC.white, 1.6); nLine(c, [x + 6, -8, x + 11, -22], NC.white, 1.6);
    circ(c, x, -13, 6.5, '#ffe6f2'); neon(c, () => { c.beginPath(); c.arc(x, -14, 6.8, Math.PI * 1.05, Math.PI * 1.95); }, hc, 2.2);
    c.strokeStyle = '#2a1240'; c.lineWidth = 1.2; c.beginPath(); c.arc(x - 2.4, -13.5, 1.3, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.beginPath(); c.arc(x + 2.4, -13.5, 1.3, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
    ell(c, x, -9.6, 1.8, 2.2, '#c2185b');
  }
  nShape(c, body, col, INK, 2.6);
  nLine(c, [-36, 4, front ? 30 : 36, 4], acc, 1.4);
  if (front) { bulb(c, 40, 6, 2.4, NC.gold); }
  neon(c, () => { c.beginPath(); c.moveTo(-8, -1); c.lineTo(-6, 3); c.lineTo(-2, 3.5); c.lineTo(-5, 6); c.lineTo(-4, 10); c.lineTo(-8, 7.5); c.lineTo(-12, 10); c.lineTo(-11, 6); c.lineTo(-14, 3.5); c.lineTo(-10, 3); c.closePath(); }, NC.gold, 1);
  for (const x of [-28, 28]) { circ(c, x, 18, 5.2, '#12081f'); nCirc(c, x, 18, 5, NC.violet, 1.6); circ(c, x, 18, 1.4, NC.white); }
}
const drawCarFront = c => spr(c, 'r-c1', 92, 48, g => carArt(g, NC.pink, NC.gold, true, [NC.gold, NC.cyan]));
const drawCarBack = c => spr(c, 'r-c2', 92, 48, g => carArt(g, NC.cyan, NC.pink, false, [NC.violet, NC.orange]));
function giraffeArt(c, shut) {
  for (const x of [-12, -4, 8, 15]) nLine(c, [x, 36, x + (x < 0 ? -1 : 1), 62], NC.gold, 2);
  nShape(c, () => { c.beginPath(); c.ellipse(2, 30, 21, 12, 0, 0, Math.PI * 2); }, NC.gold, 'rgba(255,209,102,.16)', 2.4);
  nShape(c, () => { c.beginPath(); c.moveTo(-14, 24); c.lineTo(-13, -40); c.lineTo(-1, -40); c.lineTo(-1, 20); }, NC.gold, 'rgba(255,209,102,.16)', 2.4);
  for (let y = -32, i = 0; y < 18; y += 8, i++) nLine(c, [-1, y, i % 2 ? 4 : 7, y], NC.cyan, 1.2);
  for (const [x, y, r] of [[-8, -26, 2.6], [-6, -8, 2.2], [-9, 8, 2.4], [-4, 28, 3], [8, 26, 2.6], [14, 34, 2.2]]) { c.globalAlpha = 0.75; circ(c, x, y, r, NC.orange); c.globalAlpha = 1; }
  nLine(c, [-11, -50, -12, -60], NC.gold, 1.8); nLine(c, [-3, -50, -2, -60], NC.gold, 1.8); circ(c, -12, -61, 2.4, NC.orange); circ(c, -2, -61, 2.4, NC.orange);
  nShape(c, () => { c.beginPath(); c.ellipse(-12, -45, 13, 8.5, -0.1, 0, Math.PI * 2); }, NC.gold, 'rgba(255,209,102,.22)', 2.4);
  ell(c, 4, -50, 5, 2.4, NC.gold, -0.5);
  eyes(c, [-10], -47, 1.8, shut); circ(c, -23, -44, 1, '#2a1240');
  c.globalAlpha = 0.6; circ(c, -16, -41, 2.2, NC.pink); c.globalAlpha = 1;
  nLine(c, [22, 28, 28, 40], NC.gold, 1.4);
  plate(c, 6, -46, 24, 14, 4, NC.cyan, 1.4); label(c, T('120cm', '120cm'), 18, -38.6, 20, 8, NC.white, FM, 700);
}
function drawGiraffe(c, a) { const s = blink(a); spr(c, 'r-gir' + s, 60, 130, g => giraffeArt(g, s)); }
function drawLoopSign(c) {
  spr(c, 'r-loop', 96, 40, c => {
    plate(c, -44, -17, 88, 34, 8, NC.red, 2.4);
    label(c, T('大迴環！', 'LOOP!'), 0, 1, 68, 19, NC.gold);
    for (const sx of [-1, 1]) nLine(c, [sx * 34, -6, sx * 38, 0, sx * 34, 6], NC.cyan, 1.4);
  });
}
function drawPhoto(c) {
  spr(c, 'r-photo', 96, 66, c => {
    plate(c, -45, -30, 90, 56, 7, NC.cyan, 2.4);
    rr(c, -40, -16, 80, 38, 4); c.fillStyle = 'rgba(122,155,255,.18)'; c.fill();
    label(c, T('拍照區', 'RIDE PHOTO'), 0, -22.5, 70, 9, NC.gold, SF(), 700);
    for (const [x, hc] of [[-22, NC.gold], [0, NC.pink], [22, NC.violet]]) {
      circ(c, x, 6, 7.5, '#ffe6f2'); neon(c, () => { c.beginPath(); c.arc(x, 5, 7.8, Math.PI * 1.05, Math.PI * 1.95); }, hc, 2);
      c.strokeStyle = '#2a1240'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x - 4, 3); c.lineTo(x - 2, 4.5); c.lineTo(x - 4, 6); c.moveTo(x + 4, 3); c.lineTo(x + 2, 4.5); c.lineTo(x + 4, 6); c.stroke();
      ell(c, x, 9.5, 2.2, 2.8, '#c2185b');
      nLine(c, [x - 7, 13, x - 11, 2], NC.white, 1.2); nLine(c, [x + 7, 13, x + 11, 2], NC.white, 1.2);
    }
    nLine(c, [-20, 26, -24, 32, 24, 32, 20, 26], NC.violet, 1.6);
  });
}
function bgCoaster(c) {
  sky(c, [[0, '#050a1c'], [0.55, '#1a0d36'], [0.83, '#2d1046'], [1, '#0e0619']]);
  stars(c, 70, 280, 4);
  glow(c, 280, 360, 160, '#ff5ec4', 0.18);
  c.save(); c.globalAlpha = 0.85; skyline(c, 398, 7, '#120a26', 0.7); c.restore();
  // supports
  c.save(); c.globalAlpha = 0.5;
  for (const [x, y] of [[20, 255], [40, 185], [58, 122], [158, 148], [184, 200], [230, 253], [300, 246]]) nLine(c, [x, y + 8, x, 398], NC.violet, 1.1);
  for (const [x1, y1, x2, y2] of [[20, 330, 40, 270], [40, 270, 58, 200], [158, 260, 184, 230], [184, 300, 230, 330], [230, 300, 300, 330]]) nLine(c, [x1, y1, x2, y2], NC.violet, 0.8);
  c.restore();
  // track: lift hill, drop, loop
  const track = () => { c.beginPath(); c.moveTo(-10, 360); c.lineTo(62, 108); c.quadraticCurveTo(80, 44, 112, 76); c.quadraticCurveTo(160, 140, 200, 238); c.quadraticCurveTo(222, 262, 275, 250); };
  c.save(); c.translate(0, 6); neon(c, track, NC.pink, 1.5); c.restore();
  neon(c, track, NC.cyan, 2.6);
  nCirc(c, 275, 178, 66, NC.pink, 1.5); nCirc(c, 275, 178, 72, NC.cyan, 2.6);
  neon(c, () => { c.beginPath(); c.moveTo(275, 250); c.quadraticCurveTo(330, 252, 370, 200); }, NC.cyan, 2.6);
  for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; bulb(c, 275 + Math.cos(an) * 69, 178 + Math.sin(an) * 69, 1.5, k % 2 ? NC.gold : NC.white); }
  nLine(c, [110, 262, 110, 398], NC.violet, 1.6);
  // station
  let g = c.createLinearGradient(0, 398, 0, H); g.addColorStop(0, '#1c0c30'); g.addColorStop(1, '#0b0616');
  c.fillStyle = g; c.fillRect(0, 398, W, 82);
  nLine(c, [0, 397, W, 397], NC.cyan, 2); nLine(c, [0, 403, W, 403], NC.pink, 1.2);
  c.save(); c.setLineDash([10, 8]); nLine(c, [0, 418, W, 418], NC.gold, 1.6); c.restore();
  c.fillStyle = 'rgba(255,255,255,.04)'; for (let x = 0; x < W; x += 30) c.fillRect(x, 426, 1, 54);
}

/* ===== 9-5 Haunted house ===== */
function ghostArt(c, f) {
  const body = () => { c.beginPath(); c.moveTo(-22, 20); c.lineTo(-22, -8); c.arc(0, -8, 22, Math.PI, 0); c.lineTo(22, 20); for (let i = 0; i < 4; i++) { const x0 = 22 - i * 11; c.quadraticCurveTo(x0 - 5.5, (i + f) % 2 ? 30 : 24, x0 - 11, 20); } c.closePath(); };
  nLine(c, [-21, 6, -29, f ? -2 : 2], '#c9f6ff', 2.4); nLine(c, [21, 6, 29, f ? 2 : -2], '#c9f6ff', 2.4);
  nShape(c, body, '#c9f6ff', 'rgba(210,246,255,.22)', 2.4);
  ell(c, -8, -9, 3.4, 4.8, '#1a0d2c'); ell(c, 8, -9, 3.4, 4.8, '#1a0d2c'); circ(c, -9, -11, 1.3, '#fff'); circ(c, 7, -11, 1.3, '#fff');
  ell(c, 0, 3, 3, 3.6, '#1a0d2c'); ell(c, 0, 4.5, 1.8, 1.6, '#ff8fb8');
  c.globalAlpha = 0.6; ell(c, -14, -1, 3.5, 2, NC.pink); ell(c, 14, -1, 3.5, 2, NC.pink); c.globalAlpha = 1;
}
function drawGhost(c, a) { const f = fr(a, 3, 2); spr(c, 'h-ghost' + f, 64, 76, g => ghostArt(g, f)); }
function batArt(c, f) {
  for (const s of [-1, 1]) nShape(c, () => { c.beginPath(); c.moveTo(s * 6, -4); c.quadraticCurveTo(s * 22, f ? -18 : -12, s * 35, f ? -12 : -6); c.quadraticCurveTo(s * 30, f ? -4 : 0, s * 27, f ? 2 : 6); c.quadraticCurveTo(s * 22, f ? 0 : 2, s * 17, f ? 6 : 10); c.quadraticCurveTo(s * 11, 6, s * 6, 8); c.closePath(); }, NC.violet, 'rgba(199,125,255,.25)', 2);
  poly(c, [-8, -6, -6, -16, -1, -8], NC.violet); poly(c, [8, -6, 6, -16, 1, -8], NC.violet);
  nShape(c, () => { c.beginPath(); c.arc(0, 1, 9, 0, Math.PI * 2); }, NC.violet, '#2b1146', 2.2);
  circ(c, -3.5, -1, 2.4, '#fff'); circ(c, 3.5, -1, 2.4, '#fff'); circ(c, -3.2, -0.6, 1.2, '#1a0d2c'); circ(c, 3.8, -0.6, 1.2, '#1a0d2c');
  poly(c, [-1.6, 4, 1.6, 4, 0, 6.5], '#fff');
  c.globalAlpha = 0.6; circ(c, -6, 3.5, 1.6, NC.pink); circ(c, 6, 3.5, 1.6, NC.pink); c.globalAlpha = 1;
}
function drawBat(c, a) { const f = fr(a, 6, 2); spr(c, 'h-bat' + f, 74, 40, g => batArt(g, f)); }
function shutterArt(c, col) {
  plate(c, -14, -32, 28, 64, 3, col, 2.2);
  c.save(); c.globalAlpha = 0.8; for (let y = -26; y <= 26; y += 6.5) if (Math.abs(y) > 3) nLine(c, [-9, y, 9, y + 2], col, 1); c.restore();
  nLine(c, [-14, 0, 14, 0], NC.green, 1.6);
}
const drawShutterL = c => spr(c, 'h-shl', 30, 66, g => shutterArt(g, NC.violet));
const drawShutterR = c => spr(c, 'h-shr', 30, 66, g => shutterArt(g, NC.violet));
function drawHauntSign(c) {
  spr(c, 'h-sign', 104, 36, c => {
    plate(c, -50, -16, 100, 32, 6, NC.orange, 2.2);
    label(c, T('鬼屋', 'HAUNTED'), 0, 1.5, 80, 20, NC.green, T(FZ, FB), 900);
    for (const sx of [-1, 1]) { circ(c, sx * 42, -16, 2, NC.orange); }
  });
}
function drawTiltHouse(c) {
  spr(c, 'h-tilt', 78, 96, c => {
    nShape(c, () => rr(c, -28, -10, 56, 56, 3), NC.pink, INK, 2.4);
    nShape(c, () => { c.beginPath(); c.moveTo(-36, -8); c.lineTo(0, -44); c.lineTo(36, -8); c.closePath(); }, NC.gold, '#1d0d33', 2.4);
    nCirc(c, 0, -22, 6, NC.cyan, 1.6); nLine(c, [-6, -22, 6, -22], NC.cyan, 0.9);
    plate(c, -30, -2, 60, 16, 3, NC.violet, 1.4);
    label(c, T('傾斜屋', 'TILT HOUSE'), 0, 6.5, 52, 10, NC.gold, SF(), 800);
    nShape(c, () => { c.beginPath(); c.moveTo(-8, 46); c.lineTo(-8, 26); c.arc(0, 26, 8, Math.PI, 0); c.lineTo(8, 46); }, NC.cyan, 'rgba(94,231,255,.15)', 1.8);
    for (const x of [-20, 20]) { rr(c, x - 5, 22, 10, 12, 2); c.fillStyle = 'rgba(255,209,102,.4)'; c.fill(); }
  });
}
function bgHaunted(c) {
  sky(c, [[0, '#06101c'], [0.45, '#170b30'], [0.85, '#1c0d2c'], [1, '#0b0716']]);
  stars(c, 60, 260, 6);
  glow(c, 296, 80, 90, '#fff3c4', 0.35);
  circ(c, 296, 80, 30, '#fff3c4'); c.globalAlpha = 0.25; circ(c, 286, 72, 6, '#e8d79c'); circ(c, 304, 92, 4, '#e8d79c'); circ(c, 306, 70, 3, '#e8d79c'); c.globalAlpha = 1;
  c.fillStyle = '#100a22'; c.beginPath(); c.moveTo(0, 380); for (let x = 0; x <= W; x += 30) c.lineTo(x, 350 - Math.sin(x / 60 + 1) * 18); c.lineTo(W, 420); c.lineTo(0, 420); c.fill();
  // curly tree
  c.save(); c.globalAlpha = 0.55; neon(c, () => { c.beginPath(); c.moveTo(18, 430); c.quadraticCurveTo(10, 330, 30, 280); c.quadraticCurveTo(44, 250, 30, 236); c.moveTo(26, 300); c.quadraticCurveTo(6, 280, 12, 262); c.moveTo(30, 280); c.quadraticCurveTo(64, 270, 70, 284); }, NC.violet, 1.8); c.restore();
  // house
  c.fillStyle = '#150d26'; c.fillRect(100, 152, 160, 256);
  c.beginPath(); c.moveTo(84, 158); c.lineTo(180, 62); c.lineTo(276, 158); c.closePath(); c.fillStyle = '#1c0f31'; c.fill();
  c.strokeStyle = 'rgba(199,125,255,.12)'; c.lineWidth = 1; for (let y = 90; y < 158; y += 10) { const hw = (y - 62) * 0.97; c.beginPath(); c.moveTo(180 - hw, y); c.lineTo(180 + hw, y); c.stroke(); }
  nShape(c, () => { c.beginPath(); c.moveTo(232, 112); c.lineTo(232, 80); c.lineTo(250, 80); c.lineTo(250, 128); }, NC.violet, '#1c0f31', 1.6);
  neon(c, () => { c.beginPath(); c.moveTo(84, 158); c.lineTo(180, 62); c.lineTo(276, 158); }, NC.violet, 2.6);
  neon(c, () => { c.beginPath(); c.moveTo(100, 158); c.lineTo(100, 408); c.moveTo(260, 158); c.lineTo(260, 408); }, NC.green, 2.2);
  glow(c, 180, 118, 26, '#ffd166', 0.5); circ(c, 180, 118, 13, '#3a2410'); nCirc(c, 180, 118, 13, NC.gold, 1.8);
  for (const x of [175, 185]) { ell(c, x, 119, 2.4, 3.2, '#fff4c8'); circ(c, x, 120, 1.2, '#1a0d2c'); }
  // lit window, door
  glow(c, 180, 236, 60, '#ffb347', 0.35);
  let g = c.createLinearGradient(0, 205, 0, 268); g.addColorStop(0, '#ffcf7a'); g.addColorStop(1, '#ff8a4a');
  c.fillStyle = g; c.fillRect(155, 204, 50, 64);
  c.fillStyle = '#2a1640'; c.fillRect(178.5, 204, 3, 64); c.fillRect(155, 234, 50, 3);
  c.fillStyle = 'rgba(42,22,64,.75)'; c.beginPath(); c.arc(168, 252, 8, Math.PI, 0); c.lineTo(176, 268); c.lineTo(160, 268); c.fill(); poly(c, [162, 246, 160, 238, 166, 244], 'rgba(42,22,64,.75)'); poly(c, [174, 246, 176, 238, 170, 244], 'rgba(42,22,64,.75)');
  nLine(c, [154, 203, 206, 203, 206, 269, 154, 269, 154, 203], NC.gold, 1.6);
  c.beginPath(); c.moveTo(158, 408); c.lineTo(158, 362); c.arc(180, 362, 22, Math.PI, 0); c.lineTo(202, 408); c.fillStyle = '#2a1640'; c.fill();
  neon(c, () => { c.beginPath(); c.moveTo(158, 408); c.lineTo(158, 362); c.arc(180, 362, 22, Math.PI, 0); c.lineTo(202, 408); }, NC.orange, 2);
  circ(c, 195, 386, 2.4, NC.gold);
  // fence, ground, mist, pumpkins
  c.fillStyle = '#0c0716'; c.fillRect(0, 410, W, 70);
  c.save(); c.globalAlpha = 0.55;
  for (let x = 6; x < W; x += 16) if (x < 140 || x > 220) nLine(c, [x, 438, x, 418, x + 3, 412, x + 6, 418, x + 6, 438], NC.violet, 1);
  nLine(c, [0, 424, 140, 424], NC.violet, 1); nLine(c, [220, 424, W, 424], NC.violet, 1);
  c.restore();
  for (const [x, y, r] of [[60, 452, 70], [200, 462, 90], [320, 450, 70]]) glow(c, x, y, r, '#cdb8ff', 0.16);
  for (const [x, y, s] of [[40, 452, 1], [124, 460, 0.8], [236, 458, 0.9]]) {
    c.save(); c.translate(x, y); c.scale(s, s);
    glow(c, 0, 0, 26, '#ff9f5a', 0.4);
    nShape(c, () => { c.beginPath(); c.ellipse(0, 0, 15, 11, 0, 0, Math.PI * 2); }, NC.orange, '#5a2a10', 2);
    nLine(c, [0, -11, 2, -16], NC.green, 1.6);
    poly(c, [-8, -3, -4, -6, -3, -1], NC.gold); poly(c, [8, -3, 4, -6, 3, -1], NC.gold);
    neon(c, () => { c.beginPath(); c.arc(0, 1, 6, 0.15 * Math.PI, 0.85 * Math.PI); }, NC.gold, 1.4);
    c.restore();
  }
  c.save(); c.globalAlpha = 0.35; neon(c, () => { c.beginPath(); for (let k = 0; k < 5; k++) { const an = k / 8 * Math.PI / 2; c.moveTo(0, 0); c.lineTo(Math.cos(an) * 60, Math.sin(an) * 60); } for (const r of [18, 34, 50]) { c.moveTo(r, 0); for (let k = 1; k < 5; k++) { const an = k / 8 * Math.PI / 2; c.lineTo(Math.cos(an) * r, Math.sin(an) * r); } } }, NC.white, 0.8); c.restore();
}

/* ===== 9-6 Shooting gallery (water squirters, rubber ducks) ===== */
function duckArt(c, col = NC.gold, target = true) {
  nShape(c, () => { c.beginPath(); c.moveTo(-24, 0); c.lineTo(-27, -9); c.quadraticCurveTo(-16, -4, -10, 0); c.quadraticCurveTo(0, 2, 4, -4); c.arc(11, -9, 10, Math.PI * 0.8, Math.PI * 0.35, false); c.quadraticCurveTo(26, 4, 18, 14); c.quadraticCurveTo(0, 20, -16, 16); c.quadraticCurveTo(-26, 12, -24, 0); c.closePath(); }, col, 'rgba(255,209,102,.22)', 2.4);
  poly(c, [20, -12, 30, -9, 20, -5], NC.orange); neon(c, () => { c.beginPath(); c.moveTo(20, -12); c.lineTo(30, -9); c.lineTo(20, -5); }, NC.orange, 1.2);
  circ(c, 13, -12, 1.9, '#2a1240'); circ(c, 12.4, -12.6, 0.7, '#fff');
  c.globalAlpha = 0.6; circ(c, 15, -6, 2, NC.pink); c.globalAlpha = 1;
  neon(c, () => { c.beginPath(); c.moveTo(-14, 4); c.quadraticCurveTo(-4, 0, 2, 6); c.quadraticCurveTo(-6, 12, -14, 4); }, NC.orange, 1.4);
  if (target) { nCirc(c, -4, 9, 5.2, NC.red, 1.4); circ(c, -4, 9, 2, NC.red); }
}
function drawDuckA(c) { spr(c, 'g-duck', 58, 46, g => duckArt(g)); }
function drawPlush(c) {
  spr(c, 'g-plush', 62, 80, c => {
    nLine(c, [0, -40, 0, -26], NC.white, 1);
    const col = NC.orange, fill = 'rgba(255,159,90,.22)';
    for (const s of [-1, 1]) { nShape(c, () => { c.beginPath(); c.ellipse(s * 15, 14, 5, 8, s * 0.6, 0, Math.PI * 2); }, col, fill, 1.8); nShape(c, () => { c.beginPath(); c.ellipse(s * 8, 32, 6.5, 5, 0, 0, Math.PI * 2); }, col, fill, 1.8); }
    nShape(c, () => { c.beginPath(); c.ellipse(0, 18, 13, 15, 0, 0, Math.PI * 2); }, col, fill, 2.2);
    for (const s of [-1, 1]) nShape(c, () => { c.beginPath(); c.arc(s * 11, -22, 5.5, 0, Math.PI * 2); }, col, fill, 2);
    nShape(c, () => { c.beginPath(); c.arc(0, -11, 14, 0, Math.PI * 2); }, col, fill, 2.4);
    ell(c, 0, -6, 6, 4.5, 'rgba(255,230,200,.5)'); ell(c, 0, -8, 2.2, 1.6, '#2a1240');
    eyes(c, [-5, 5], -13, 1.7);
    c.globalAlpha = 0.6; circ(c, -9, -6, 2.2, NC.pink); circ(c, 9, -6, 2.2, NC.pink); c.globalAlpha = 1;
    poly(c, [0, 4, -7, 0, -7, 8], NC.pink); poly(c, [0, 4, 7, 0, 7, 8], NC.pink); circ(c, 0, 4, 1.8, NC.pink);
    nShape(c, () => { c.beginPath(); for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2 - Math.PI / 2, r = k % 2 ? 2.4 : 5.5; c.lineTo(Math.cos(an) * r, 20 + Math.sin(an) * r); } c.closePath(); }, NC.gold, 'rgba(255,209,102,.5)', 1.2);
  });
}
function scoreArt(c, col, name, digits) {
  plate(c, -40, -22, 80, 44, 6, col, 2.4);
  label(c, name, 0, -12, 64, 9, col, SF(), 800);
  c.save(); c.globalAlpha = 0.12; neonText(c, '88', 0, 7, '800 22px ' + FM, NC.gold); c.restore();
  neonText(c, digits, 0, 7, '800 22px ' + FM, NC.gold);
}
const drawScoreA = c => spr(c, 'g-sa', 84, 48, g => scoreArt(g, NC.cyan, T('藍隊', 'BLUE'), '07'));
const drawScoreB = c => spr(c, 'g-sb', 84, 48, g => scoreArt(g, NC.pink, T('粉紅隊', 'PINK'), '12'));
function drawGallerySign(c) {
  spr(c, 'g-sign', 196, 42, c => {
    plate(c, -94, -18, 188, 36, 8, NC.pink, 2.4);
    label(c, T('射水小鴨', 'SQUIRT-A-DUCK'), 0, 1, 146, 19, NC.gold);
    for (const sx of [-1, 1]) nShape(c, () => { c.beginPath(); c.moveTo(sx * 82, -8); c.quadraticCurveTo(sx * 77, 2, sx * 82, 6); c.quadraticCurveTo(sx * 87, 2, sx * 82, -8); }, NC.cyan, 'rgba(94,231,255,.3)', 1.4);
  });
}
function bgGallery(c) {
  sky(c, [[0, '#13071f'], [0.7, '#1e0a31'], [1, '#0b0515']]);
  c.fillStyle = 'rgba(255,255,255,.025)'; for (let x = 0; x < W; x += 24) c.fillRect(x, 90, 12, 280);
  glow(c, 180, 230, 190, '#ff5ec4', 0.12);
  // awning
  for (let x = 0, k = 0; x < W; x += 30, k++) { c.fillStyle = k % 2 ? '#2a0d36' : '#45123f'; c.fillRect(x, 0, 30, 70); }
  nLine(c, [0, 70, W, 70], NC.pink, 2);
  for (let x = 0, k = 0; x < W; x += 30, k++) { c.beginPath(); c.arc(x + 15, 70, 15, 0, Math.PI); c.fillStyle = k % 2 ? '#2a0d36' : '#45123f'; c.fill(); neon(c, () => { c.beginPath(); c.arc(x + 15, 70, 15, 0, Math.PI); }, k % 2 ? NC.white : NC.pink, 1.6); bulb(c, x + 15, 86, 2, NC.gold); }
  // posts
  for (const x of [12, 348]) { nLine(c, [x, 86, x, 406], NC.gold, 2.6); for (let y = 110; y < 400; y += 34) bulb(c, x, y, 2, NC.pink); }
  // prize shelf
  nLine(c, [30, 286, 330, 286], NC.gold, 1.8);
  c.save(); c.globalAlpha = 0.55;
  const prize = (x, k, y = 272) => {
    if (k === 0) neon(c, () => { c.beginPath(); for (let i = 0; i < 10; i++) { const an = i / 10 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 5 : 11; c.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } c.closePath(); }, NC.gold, 1.6);
    if (k === 1) { nCirc(c, x, y, 10, NC.cyan, 1.6); poly(c, [x - 8, y - 6, x - 4, y - 14, x - 1, y - 8], NC.cyan); poly(c, [x + 8, y - 6, x + 4, y - 14, x + 1, y - 8], NC.cyan); }
    if (k === 2) neon(c, () => { c.beginPath(); c.ellipse(x, y + 2, 12, 7, 0, 0, Math.PI * 2); c.moveTo(x - 12, y + 2); c.lineTo(x - 19, y - 4); c.lineTo(x - 19, y + 8); c.closePath(); }, NC.violet, 1.6);
    if (k === 3) neon(c, () => { c.beginPath(); c.moveTo(x, y + 10); c.bezierCurveTo(x - 14, y, x - 9, y - 12, x, y - 4); c.bezierCurveTo(x + 9, y - 12, x + 14, y, x, y + 10); }, NC.red, 1.6);
  };
  [[44, 0], [86, 1], [130, 2], [232, 3], [276, 1], [318, 0]].forEach(([x, k]) => prize(x, k));
  c.restore();
  // duck pond
  c.fillStyle = 'rgba(20,90,130,.28)'; c.fillRect(24, 336, 312, 56);
  for (const [y, a] of [[354, 0.9], [368, 0.6], [381, 0.4]]) { c.save(); c.globalAlpha = a; neon(c, () => { c.beginPath(); for (let x = 24; x <= 336; x += 4) { const yy = y + Math.sin(x / 9 + y) * 2; x === 24 ? c.moveTo(x, yy) : c.lineTo(x, yy); } }, NC.cyan, 1.4); c.restore(); }
  nLine(c, [20, 392, 340, 392], NC.gold, 2);
  // counter: a ledge with two water squirters, then the front panel
  c.fillStyle = '#2a1446'; c.fillRect(0, 406, W, 16);
  let g = c.createLinearGradient(0, 422, 0, H); g.addColorStop(0, '#22103a'); g.addColorStop(1, '#0d0619');
  c.fillStyle = g; c.fillRect(0, 422, W, 58);
  nLine(c, [0, 406, W, 406], NC.gold, 2.4); nLine(c, [0, 422, W, 422], NC.pink, 1.4);
  c.fillStyle = 'rgba(255,94,196,.06)'; for (let x = 0; x < W; x += 36) c.fillRect(x, 430, 18, 50);
  for (let x = 12, k = 0; x < W; x += 24, k++) bulb(c, x, 440, 1.8, [NC.pink, NC.gold, NC.cyan][k % 3]);
  for (const [x, s, col] of [[44, -1, NC.cyan], [316, 1, NC.pink]]) {
    c.save(); c.translate(x, 402); c.scale(s, 1);
    nLine(c, [0, 4, 0, 12], NC.gold, 2.4); nLine(c, [-8, 12, 8, 12], NC.gold, 2);
    nShape(c, () => { c.beginPath(); c.ellipse(0, -4, 17, 9.5, 0, 0, Math.PI * 2); }, col, 'rgba(40,20,60,.9)', 2);
    nShape(c, () => { c.beginPath(); c.moveTo(15, -4); c.lineTo(27, -12); c.lineTo(27, 4); c.closePath(); }, col, 'rgba(40,20,60,.9)', 1.6);
    nLine(c, [-17, -6, -25, -11], NC.white, 2); circ(c, -7, -7, 1.8, '#fff'); circ(c, -7, -7, 0.9, '#2a1240');
    c.restore();
  }
  c.save(); c.setLineDash([2, 5]); c.globalAlpha = 0.85;
  neon(c, () => { c.beginPath(); c.moveTo(70, 390); c.quadraticCurveTo(80, 348, 86, 360); c.moveTo(290, 390); c.quadraticCurveTo(280, 348, 274, 360); }, NC.cyan, 1.4);
  c.restore();
  for (let k = 0; k < 4; k++) { circ(c, 159 + k * 14, 462, 3, NC.gold); circ(c, 159 + k * 14, 462, 1.2, '#fff'); }
}

/* ===== 9-7 Balloon festival ===== */
function balloonArt(c, col, acc, fill, s = 1) {
  c.save(); c.scale(s, s);
  const env = () => { c.beginPath(); c.moveTo(-9, 28); c.bezierCurveTo(-48, 2, -44, -56, 0, -56); c.bezierCurveTo(44, -56, 48, 2, 9, 28); c.closePath(); };
  const g = c.createRadialGradient(0, -14, 4, 0, -14, 52); g.addColorStop(0, fill); g.addColorStop(1, 'rgba(20,8,30,.6)');
  env(); c.fillStyle = g; c.fill();
  c.save(); env(); c.clip();
  neon(c, () => { c.beginPath(); c.moveTo(0, -56); c.lineTo(0, 30); c.moveTo(-5, 30); c.quadraticCurveTo(-34, -18, 0, -56); c.moveTo(5, 30); c.quadraticCurveTo(34, -18, 0, -56); c.moveTo(-2, 30); c.quadraticCurveTo(-60, -20, 0, -56); c.moveTo(2, 30); c.quadraticCurveTo(60, -20, 0, -56); }, acc, 1.1);
  neon(c, () => { c.beginPath(); c.moveTo(-40, -6); c.quadraticCurveTo(0, 4, 40, -6); }, acc, 2.2);
  c.restore();
  neon(c, env, col, 2.6);
  nLine(c, [-9, 28, -10, 44], NC.white, 1); nLine(c, [9, 28, 10, 44], NC.white, 1);
  ell(c, 0, 33, 5, 7, NC.gold); ell(c, 0, 35, 2.4, 4, '#fff');
  nShape(c, () => rr(c, -11, 44, 22, 14, 3), NC.orange, '#3a1d10', 2);
  nLine(c, [-11, 51, 11, 51], NC.orange, 0.9);
  c.restore();
}
const drawBalloonA = c => spr(c, 'b-a', 100, 140, g => balloonArt(g, NC.pink, NC.gold, 'rgba(255,94,196,.75)', 1.13));
const drawBalloonB = c => spr(c, 'b-b', 92, 124, g => balloonArt(g, NC.cyan, NC.violet, 'rgba(94,231,255,.7)', 1));
function bearBalloonArt(c, shut) {
  const col = '#ffb070', fill = 'rgba(255,176,112,.38)';
  for (const s of [-1, 1]) { nShape(c, () => { c.beginPath(); c.arc(s * 24, -44, 9, 0, Math.PI * 2); }, col, fill, 2.2); circ(c, s * 24, -44, 4, 'rgba(255,94,196,.5)'); }
  nShape(c, () => { c.beginPath(); c.moveTo(-18, 2); c.quadraticCurveTo(-10, 18, -7, 26); c.lineTo(7, 26); c.quadraticCurveTo(10, 18, 18, 2); c.closePath(); }, col, fill, 2);
  const g = c.createRadialGradient(0, -24, 4, 0, -20, 34); g.addColorStop(0, 'rgba(255,200,140,.7)'); g.addColorStop(1, 'rgba(90,40,20,.6)');
  c.beginPath(); c.arc(0, -20, 30, 0, Math.PI * 2); c.fillStyle = g; c.fill(); neon(c, () => { c.beginPath(); c.arc(0, -20, 30, 0, Math.PI * 2); }, col, 2.6);
  ell(c, 0, -10, 12, 9, 'rgba(255,240,220,.85)'); ell(c, 0, -14, 4, 3, '#2a1240');
  c.strokeStyle = '#2a1240'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(0, -11); c.lineTo(0, -8); c.moveTo(-4, -6); c.quadraticCurveTo(0, -3, 4, -6); c.stroke();
  eyes(c, [-10, 10], -25, 2.4, shut);
  c.globalAlpha = 0.6; circ(c, -18, -14, 3.4, NC.pink); circ(c, 18, -14, 3.4, NC.pink); c.globalAlpha = 1;
  nLine(c, [-7, 26, -9, 40], NC.white, 1); nLine(c, [7, 26, 9, 40], NC.white, 1);
  ell(c, 0, 30, 3.5, 5, NC.gold);
  nShape(c, () => rr(c, -10, 40, 20, 13, 3), NC.orange, '#3a1d10', 2);
}
function drawBearBalloon(c, a) { const s = blink(a); spr(c, 'b-bear' + s, 84, 116, g => bearBalloonArt(g, s)); }
function drawBunch(c) {
  spr(c, 'b-bunch', 56, 86, c => {
    for (const [x0, y0] of [[-12, -18], [12, -24], [0, -4]]) nLine(c, [x0, y0 + 13, 0, 26], NC.white, 0.9);
    nLine(c, [0, 26, -2, 34, 2, 40], NC.white, 1);
    for (const [x, y, col, f] of [[12, -24, NC.cyan, 'rgba(94,231,255,.4)'], [-12, -18, NC.pink, 'rgba(255,94,196,.4)'], [0, -4, NC.gold, 'rgba(255,209,102,.4)']]) {
      nShape(c, () => { c.beginPath(); c.ellipse(x, y, 11, 13, 0, 0, Math.PI * 2); }, col, f, 2.2);
      poly(c, [x - 2.5, y + 15, x + 2.5, y + 15, x, y + 12], col); ell(c, x - 4, y - 5, 2.4, 3.6, 'rgba(255,255,255,.7)', -0.4);
    }
    nShape(c, () => { c.beginPath(); c.moveTo(0, 26); c.lineTo(-7, 22); c.lineTo(-7, 30); c.closePath(); c.moveTo(0, 26); c.lineTo(7, 22); c.lineTo(7, 30); c.closePath(); }, NC.violet, 'rgba(199,125,255,.4)', 1.2);
  });
}
function drawFestSign(c) {
  spr(c, 'b-sign', 184, 42, c => {
    plate(c, -88, -18, 176, 36, 8, NC.cyan, 2.4);
    label(c, T('熱氣球嘉年華', 'BALLOON FEST'), 0, 1, 140, 18, NC.pink);
    for (const sx of [-1, 1]) { nEll(c, sx * 78, -2, 4, 5, NC.gold, 1.2); nLine(c, [sx * 78, 3, sx * 78, 8], NC.gold, 0.8); }
  });
}
function drawDateTag(c) {
  spr(c, 'b-date', 92, 34, c => {
    hangers(c, [-30, 30], -17, -11, NC.cyan);
    plate(c, -44, -11, 88, 26, 6, NC.gold, 2);
    label(c, T('7–8 月', 'JUL–AUG'), 0, 2.5, 72, 14, NC.cyan);
  });
}
function bgBalloons(c) {
  sky(c, [[0, '#070a24'], [0.42, '#161a4a'], [0.66, '#3a1e58'], [0.76, '#5c2a5a'], [0.8, '#1a1430'], [1, '#0a1018']]);
  stars(c, 70, 230, 8);
  glow(c, 180, 370, 220, '#ff9f5a', 0.18);
  c.fillStyle = '#1d1640'; c.beginPath(); c.moveTo(0, 360); for (let x = 0; x <= W; x += 15) c.lineTo(x, 330 - Math.abs(Math.sin(x / 48)) * 22 - Math.sin(x / 17) * 4); c.lineTo(W, 380); c.lineTo(0, 380); c.fill();
  c.fillStyle = '#11182c'; c.beginPath(); c.moveTo(0, 384); c.lineTo(120, 376); c.lineTo(250, 374); c.lineTo(W, 380); c.lineTo(W, 400); c.lineTo(0, 400); c.fill();
  let g = c.createLinearGradient(0, 384, 0, H); g.addColorStop(0, '#0f1d22'); g.addColorStop(1, '#070d10');
  c.fillStyle = g; c.fillRect(0, 386, W, 94);
  c.strokeStyle = 'rgba(125,255,176,.08)'; c.lineWidth = 1; for (let i = 0; i < 90; i++) { const x = hsh(i * 3 + 9) * W, y = 392 + hsh(i * 5 + 1) * 86; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 1.5, y - 5); c.stroke(); }
  // far balloons glowing in the dusk
  for (const [x, y, r, col] of [[24, 278, 9, '#ff9f5a'], [148, 346, 7, '#ff5ec4'], [244, 348, 8, '#ffd166'], [340, 214, 10, '#7dffb0'], [180, 64, 11, '#c77dff'], [330, 30, 6, '#ff9f5a']]) {
    glow(c, x, y, r * 3, col, 0.35);
    c.save(); c.globalAlpha = 0.75; ell(c, x, y, r, r * 1.2, col); c.globalAlpha = 1; c.restore();
    c.fillStyle = 'rgba(40,20,10,.9)'; c.fillRect(x - r * 0.25, y + r * 1.45, r * 0.5, r * 0.4);
  }
  // crowd
  for (let i = 0; i < 24; i++) { const x = 6 + i * 15 + hsh(i) * 6, y = 470 - hsh(i * 7) * 6; ell(c, x, y + 14, 8, 12, '#1a1a38'); circ(c, x, y, 5, '#1a1a38'); if (hsh(i * 9) > 0.7) { c.fillStyle = 'rgba(94,231,255,.7)'; c.fillRect(x + 3, y - 10, 3, 5); } }
  for (const x of [82, 278]) nLine(c, [x, 386, x, 470], NC.violet, 1.8);
}

/* ===== 9-8 Water park ===== */
function drawSlide(c) {
  spr(c, 'wp-slide', 204, 36, c => {
    rr(c, -100, -12, 200, 22, 11); c.fillStyle = 'rgba(94,231,255,.16)'; c.fill();
    c.save(); rr(c, -100, -12, 200, 22, 11); c.clip(); c.fillStyle = 'rgba(255,94,196,.28)'; for (let x = -100; x < 110; x += 26) { c.beginPath(); c.moveTo(x, -12); c.lineTo(x + 10, -12); c.lineTo(x, 10); c.lineTo(x - 10, 10); c.fill(); } c.restore();
    neon(c, () => rr(c, -100, -12, 200, 22, 11), NC.cyan, 2.6);
    c.save(); c.setLineDash([8, 7]); nLine(c, [-90, -1, 92, -1], NC.white, 1.2); c.restore();
    nLine(c, [-96, -15, 96, -15], NC.pink, 1.4);
    for (let x = -80; x <= 80; x += 40) bulb(c, x, 13, 1.6, NC.gold);
  });
}
function dolphinArt(c) {
  const body = () => { c.beginPath(); c.moveTo(-38, 4); c.bezierCurveTo(-30, -18, 18, -20, 34, -8); c.quadraticCurveTo(46, -4, 44, 2); c.quadraticCurveTo(30, 5, 26, 9); c.bezierCurveTo(10, 18, -26, 18, -38, 4); c.closePath(); };
  nShape(c, () => { c.beginPath(); c.moveTo(-6, -14); c.quadraticCurveTo(-2, -30, 10, -27); c.quadraticCurveTo(4, -20, 10, -15); c.closePath(); }, NC.blue, 'rgba(122,155,255,.3)', 2);
  nShape(c, () => { c.beginPath(); c.moveTo(-36, 4); c.lineTo(-46, -10); c.lineTo(-40, 3); c.lineTo(-47, 15); c.closePath(); }, NC.blue, 'rgba(122,155,255,.3)', 2);
  nShape(c, body, NC.blue, 'rgba(122,155,255,.28)', 2.6);
  ell(c, -2, 8, 22, 5, 'rgba(255,255,255,.18)');
  eyes(c, [26], -7, 1.9); neon(c, () => { c.beginPath(); c.moveTo(32, 2); c.quadraticCurveTo(38, 4, 42, 1); }, NC.white, 1);
  c.globalAlpha = 0.6; circ(c, 30, -2, 2.2, NC.pink); c.globalAlpha = 1;
  nCirc(c, -8, -12, 4, NC.gold, 1.4); nCirc(c, 12, -13, 4, NC.gold, 1.4);
  c.save(); c.globalAlpha = 0.7; neon(c, () => { c.beginPath(); for (let x = -44; x <= 44; x += 4) { const y = 20 + Math.sin(x / 5) * 1.6; x === -44 ? c.moveTo(x, y) : c.lineTo(x, y); } }, NC.cyan, 1.2); c.restore();
}
const drawDolphin = c => spr(c, 'wp-dol', 96, 60, g => dolphinArt(g));
function drawRubberDuck(c) {
  spr(c, 'wp-duck', 60, 52, c => {
    duckArt(c, NC.gold, false);
    c.save(); c.globalAlpha = 0.7; neon(c, () => { c.beginPath(); for (let x = -28; x <= 28; x += 4) { const y = 19 + Math.sin(x / 4) * 1.4; x === -28 ? c.moveTo(x, y) : c.lineTo(x, y); } }, NC.cyan, 1.2); c.restore();
  });
}
function drawRing(c) {
  spr(c, 'wp-ring', 64, 46, c => {
    c.save(); c.beginPath(); c.ellipse(0, 0, 28, 16, 0, 0, Math.PI * 2); c.ellipse(0, -2, 12, 6, 0, 0, Math.PI * 2); c.clip('evenodd');
    c.fillStyle = 'rgba(255,240,250,.35)'; c.fillRect(-30, -18, 60, 36);
    c.fillStyle = 'rgba(255,74,92,.6)'; for (let k = 0; k < 8; k += 2) { const a0 = k / 8 * Math.PI * 2; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 40, a0, a0 + Math.PI / 4); c.closePath(); c.fill(); }
    c.restore();
    nEll(c, 0, 0, 28, 16, NC.red, 2.4); nEll(c, 0, -2, 12, 6, NC.red, 1.4);
    ell(c, -14, -8, 5, 2, 'rgba(255,255,255,.6)', -0.3);
    c.save(); c.globalAlpha = 0.7; neon(c, () => { c.beginPath(); c.moveTo(-30, 18); c.quadraticCurveTo(0, 24, 30, 18); }, NC.cyan, 1.2); c.restore();
  });
}
function drawKickboard(c) {
  spr(c, 'wp-kick', 72, 36, c => {
    nShape(c, () => rr(c, -32, -12, 64, 22, 10), NC.green, 'rgba(125,255,176,.22)', 2.4);
    for (const x of [-16, 16]) nShape(c, () => { c.beginPath(); c.ellipse(x, -4, 7, 3, 0, 0, Math.PI * 2); }, NC.green, '#0c2030', 1.2);
    nLine(c, [-24, 5, 24, 5], NC.gold, 1.4);
    c.save(); c.globalAlpha = 0.7; neon(c, () => { c.beginPath(); c.moveTo(-34, 15); c.quadraticCurveTo(0, 20, 34, 15); }, NC.cyan, 1.2); c.restore();
  });
}
function drawUmbrella(c) {
  spr(c, 'wp-umb', 84, 120, c => {
    nLine(c, [0, -44, 0, 56], NC.gold, 2); nLine(c, [-10, 57, 10, 57], NC.gold, 2);
    const canopy = () => { c.beginPath(); c.moveTo(-40, -22); c.quadraticCurveTo(0, -66, 40, -22); for (let i = 0; i < 4; i++) { const x0 = 40 - i * 20; c.quadraticCurveTo(x0 - 10, -14, x0 - 20, -22); } c.closePath(); };
    c.save(); canopy(); c.clip(); for (let i = 0; i < 4; i++) { c.fillStyle = i % 2 ? 'rgba(255,255,255,.2)' : 'rgba(255,94,196,.45)'; c.beginPath(); c.moveTo(0, -46); c.lineTo(-40 + i * 20, -14); c.lineTo(-20 + i * 20, -14); c.closePath(); c.fill(); } c.restore();
    neon(c, canopy, NC.pink, 2.6);
    neon(c, () => { c.beginPath(); for (let i = 1; i < 4; i++) { c.moveTo(0, -44); c.lineTo(-40 + i * 20, -22); } }, NC.white, 1);
    circ(c, 0, -46, 3, NC.gold);
    nCirc(c, 0, 50, 4, NC.cyan, 1.2);
  });
}
function drawPoolSign(c) {
  spr(c, 'wp-sign', 108, 42, c => {
    plate(c, -50, -18, 100, 36, 8, NC.cyan, 2.4);
    label(c, T('泳池', 'POOL'), 9, 1, 60, 20, NC.gold);
    neon(c, () => { c.beginPath(); for (const y of [-4, 4]) { c.moveTo(-40, y); c.quadraticCurveTo(-36, y - 4, -32, y); c.quadraticCurveTo(-28, y + 4, -24, y); } }, NC.cyan, 1.4);
  });
}
function drawDepthTag(c) {
  spr(c, 'wp-depth', 90, 34, c => {
    hangers(c, [-28, 28], -17, -11, NC.cyan);
    plate(c, -42, -11, 84, 26, 6, NC.pink, 2);
    label(c, T('水深 1.2M', 'DEPTH 1.2M'), 0, 2.5, 70, 13, NC.white);
  });
}
function bgWater(c) {
  sky(c, [[0, '#041020'], [0.4, '#0d1c3c'], [0.62, '#1c1246'], [1, '#081428']]);
  stars(c, 60, 230, 10);
  for (const x of [232, 310]) nLine(c, [x, 0, x, 41], 'rgba(255,255,255,.35)', 0.8);
  c.save(); c.globalAlpha = 0.6; skyline(c, 300, 11, '#0c1430', 0.6); c.restore();
  // slide tower
  c.fillStyle = '#10142c'; c.fillRect(16, 216, 56, 86);
  nLine(c, [16, 214, 74, 214], NC.gold, 2.4);
  for (const x of [20, 68]) nLine(c, [x, 214, x, 300], NC.cyan, 2);
  c.save(); c.globalAlpha = 0.7; for (let y = 226; y < 300; y += 14) nLine(c, [20, y, 68, y + 12], NC.violet, 0.9); c.restore();
  nLine(c, [20, 214, 20, 190, 68, 190, 68, 214], NC.pink, 1.4); nLine(c, [20, 202, 68, 202], NC.pink, 1);
  nLine(c, [44, 190, 44, 156], NC.white, 1.2); poly(c, [44, 156, 62, 162, 44, 168], NC.pink);
  // splash where the slide ends
  for (let k = 0; k < 7; k++) { const an = -Math.PI * (0.15 + k * 0.1); nLine(c, [258 + Math.cos(an) * 6, 298 + Math.sin(an) * 6, 258 + Math.cos(an) * 16, 298 + Math.sin(an) * 14], NC.white, 1); }
  // pool
  let g = c.createLinearGradient(0, 300, 0, H); g.addColorStop(0, '#0b4a68'); g.addColorStop(1, '#062236');
  c.fillStyle = g; c.fillRect(0, 300, W, 180);
  for (const [x, y] of [[60, 470], [180, 476], [300, 470]]) glow(c, x, y, 70, '#5ee7ff', 0.3);
  for (let k = 0; k < 7; k++) { const y = 318 + k * 24; c.save(); c.globalAlpha = 0.65 - k * 0.06; neon(c, () => { c.beginPath(); for (let x = 0; x <= W; x += 5) { const yy = y + Math.sin(x / 14 + k * 1.7) * 2.5; x ? c.lineTo(x, yy) : c.moveTo(x, yy); } }, NC.cyan, 1.1); c.restore(); }
  nLine(c, [0, 300, W, 300], NC.gold, 2.4);
  for (let x = 6, k = 0; x < W; x += 20, k++) bulb(c, x, 304, 1.5, k % 2 ? NC.white : NC.gold);
}

/* ===== 9-9 Parade floats ===== */
function ribbonArt(c, w, col, s, tcol) {
  const hw = w / 2 - 4;
  hangers(c, [-hw + 12, hw - 12], -24, -18, NC.violet);
  nShape(c, () => { c.beginPath(); c.moveTo(-hw, -18); c.lineTo(hw, -18); c.lineTo(hw - 9, 0); c.lineTo(hw, 18); c.lineTo(-hw, 18); c.lineTo(-hw + 9, 0); c.closePath(); }, col, INK, 2.4);
  label(c, s, 0, 1, w - 52, 20, tcol);
  for (const sx of [-1, 1]) bulb(c, sx * (hw - 20), 0, 2, tcol);
}
const drawParadeBanner = c => spr(c, 'p-ban', 212, 48, g => ribbonArt(g, 212, NC.gold, T('嘉年華遊行', 'PARADE'), NC.pink));
function drawTimeTag(c) {
  spr(c, 'p-time', 106, 34, c => {
    hangers(c, [-36, 36], -17, -11, NC.violet);
    plate(c, -50, -11, 100, 26, 6, NC.cyan, 2);
    label(c, T('今晚 8 點', 'TONIGHT 8PM'), 0, 2.5, 84, 13, NC.gold);
  });
}
function drawJazz(c) {
  spr(c, 'p-jazz', 92, 46, c => {
    plate(c, -44, -20, 88, 40, 8, NC.violet, 2.2);
    label(c, T('爵士', 'JAZZ'), -10, 1, 50, 20, NC.gold, T(FZ, FB), 900);
    neon(c, () => { c.beginPath(); c.moveTo(18, 4); c.lineTo(30, 4); c.moveTo(30, -2); c.lineTo(36, -8); c.lineTo(36, 16); c.lineTo(30, 10); c.closePath(); c.moveTo(22, 4); c.lineTo(22, 0); c.moveTo(26, 4); c.lineTo(26, 0); }, NC.cyan, 1.6);
  });
}
function floatBase(c, w, y, col) {
  nShape(c, () => rr(c, -w / 2, y, w, 12, 4), col, INK, 2);
  for (let x = -w / 2 + 8, k = 0; x < w / 2 - 4; x += 12, k++) bulb(c, x, y + 6, 1.4, k % 2 ? NC.white : col);
  neon(c, () => { c.beginPath(); for (let x = -w / 2; x < w / 2; x += 12) { c.moveTo(x, y + 12); c.arc(x + 6, y + 12, 6, Math.PI, 0, true); } }, NC.violet, 1);
}
function dragonHeadArt(c, shut) {
  floatBase(c, 112, 20, NC.gold);
  neon(c, () => { c.beginPath(); c.moveTo(-8, -26); c.quadraticCurveTo(-22, -34, -28, -42); c.moveTo(2, -28); c.quadraticCurveTo(-8, -38, -10, -46); }, NC.gold, 2.2);
  nShape(c, () => { c.beginPath(); c.moveTo(-30, -14); c.lineTo(-44, -18); c.lineTo(-36, -8); c.lineTo(-50, -6); c.lineTo(-38, 2); c.lineTo(-50, 8); c.lineTo(-34, 12); c.closePath(); }, NC.red, 'rgba(255,74,92,.3)', 1.8);
  const head = () => { c.beginPath(); c.moveTo(-34, 18); c.quadraticCurveTo(-42, -12, -14, -24); c.quadraticCurveTo(10, -34, 28, -20); c.lineTo(48, -12); c.quadraticCurveTo(58, -6, 52, 4); c.lineTo(30, 8); c.quadraticCurveTo(20, 20, -34, 18); c.closePath(); };
  nShape(c, head, NC.green, 'rgba(125,255,176,.22)', 2.6);
  neon(c, () => { c.beginPath(); c.moveTo(30, 6); c.quadraticCurveTo(40, 12, 50, 4); }, NC.white, 1.2);
  neon(c, () => { c.beginPath(); c.moveTo(52, -6); c.quadraticCurveTo(58, -18, 54, -26); c.moveTo(48, 2); c.quadraticCurveTo(56, 10, 54, 16); }, NC.gold, 1.2);
  circ(c, 47, -9, 1.6, '#2a1240');
  nShape(c, () => { c.beginPath(); c.arc(14, -14, 7.5, 0, Math.PI * 2); }, NC.white, '#fff', 1.4);
  if (shut) { c.strokeStyle = '#2a1240'; c.lineWidth = 1.6; c.beginPath(); c.arc(14, -15, 5, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
  else { circ(c, 15.5, -13.5, 4, '#2a1240'); circ(c, 14, -15.5, 1.6, '#fff'); }
  c.globalAlpha = 0.6; circ(c, 18, -2, 3.5, NC.pink); c.globalAlpha = 1;
  neon(c, () => { c.beginPath(); for (const [x, y] of [[-24, -2], [-14, 4], [-4, 8], [-26, 10]]) { c.moveTo(x - 4, y - 3); c.lineTo(x, y + 2); c.lineTo(x + 4, y - 3); } }, NC.gold, 1.1);
}
function drawDragonHead(c, a) { const s = blink(a); spr(c, 'p-dh' + s, 120, 84, g => dragonHeadArt(g, s)); }
function drawDragonTail(c) {
  spr(c, 'p-dt', 110, 70, c => {
    floatBase(c, 104, 18, NC.gold);
    const body = () => { c.beginPath(); c.moveTo(52, 16); c.quadraticCurveTo(40, -18, 16, -6); c.quadraticCurveTo(0, 2, -14, -10); c.quadraticCurveTo(-30, -24, -40, -10); c.quadraticCurveTo(-44, -2, -38, 4); c.quadraticCurveTo(-30, 2, -26, 6); c.quadraticCurveTo(-26, 16, -10, 16); c.closePath(); };
    nShape(c, body, NC.green, 'rgba(125,255,176,.22)', 2.4);
    nShape(c, () => { c.beginPath(); c.moveTo(-40, -10); c.lineTo(-52, -18); c.lineTo(-48, -6); c.lineTo(-56, 0); c.lineTo(-42, 0); c.closePath(); }, NC.red, 'rgba(255,74,92,.35)', 1.6);
    for (const [x, y] of [[36, -10], [22, -10], [-12, -12], [-26, -16]]) poly(c, [x - 4, y + 2, x, y - 7, x + 4, y + 2], NC.red);
    neon(c, () => { c.beginPath(); for (const [x, y] of [[-30, 2], [-18, 6], [-6, 4], [6, 6], [18, 4], [30, 2], [40, 8], [-12, 12], [12, 12], [28, 12]]) { c.moveTo(x - 4, y - 3); c.lineTo(x, y + 2); c.lineTo(x + 4, y - 3); } }, NC.gold, 1.1);
  });
}
function whaleArt(c, f) {
  floatBase(c, 112, 24, NC.cyan);
  if (f) { neon(c, () => { c.beginPath(); c.moveTo(16, -22); c.lineTo(16, -34); c.moveTo(16, -30); c.quadraticCurveTo(8, -38, 4, -32); c.moveTo(16, -30); c.quadraticCurveTo(24, -38, 28, -32); }, NC.cyan, 1.6); circ(c, 4, -30, 1.6, NC.white); circ(c, 28, -30, 1.6, NC.white); }
  const body = () => { c.beginPath(); c.moveTo(-40, 6); c.bezierCurveTo(-36, -26, 44, -30, 46, 2); c.quadraticCurveTo(46, 22, 10, 22); c.lineTo(-24, 22); c.quadraticCurveTo(-38, 20, -40, 6); c.closePath(); };
  nShape(c, () => { c.beginPath(); c.moveTo(-38, 4); c.quadraticCurveTo(-48, -6, -56, -18); c.quadraticCurveTo(-46, -14, -44, -8); c.quadraticCurveTo(-44, -18, -38, -28); c.quadraticCurveTo(-38, -10, -32, 0); c.closePath(); }, NC.blue, 'rgba(122,155,255,.3)', 2);
  nShape(c, body, NC.blue, 'rgba(122,155,255,.28)', 2.6);
  c.save(); body(); c.clip(); ell(c, 8, 22, 40, 10, 'rgba(255,255,255,.2)'); c.restore();
  eyes(c, [26], -4, 2.4);
  neon(c, () => { c.beginPath(); c.moveTo(30, 8); c.quadraticCurveTo(38, 12, 44, 6); }, NC.white, 1);
  c.globalAlpha = 0.6; circ(c, 30, 2, 3, NC.pink); c.globalAlpha = 1;
  neon(c, () => { c.beginPath(); c.moveTo(-6, 6); c.quadraticCurveTo(2, 16, 8, 8); }, NC.blue, 1.4);
}
function drawWhaleFloat(c, a) { const f = a.live > 0.02 && Math.sin(a.t * 1.6) > 0.3 ? 1 : 0; spr(c, 'p-wh' + f, 120, 76, g => whaleArt(g, f)); }
function drawCake(c) {
  spr(c, 'p-cake', 110, 88, c => {
    floatBase(c, 104, 26, NC.pink);
    for (const [w, y, h, col] of [[84, 2, 22, NC.pink], [62, -16, 18, NC.gold], [40, -32, 16, NC.cyan]]) {
      nShape(c, () => rr(c, -w / 2, y, w, h, 4), col, INK, 2.2);
      neon(c, () => { c.beginPath(); c.moveTo(-w / 2 + 2, y + 3); for (let x = -w / 2 + 2; x < w / 2 - 6; x += 8) c.quadraticCurveTo(x + 4, y + 10, x + 8, y + 3); }, NC.white, 1.1);
    }
    for (const x of [-12, 0, 12]) { nLine(c, [x, -32, x, -38], NC.white, 1.6); ell(c, x, -42, 2, 3.2, NC.gold); }
    for (const x of [-30, -10, 10, 30]) circ(c, x, 16, 2.2, NC.red);
  });
}
function bgParade(c) {
  sky(c, [[0, '#0a0619'], [0.5, '#1d0b2e'], [1, '#0d0718']]);
  stars(c, 40, 120, 12);
  // French Quarter facades
  for (const [x0, w, top, fill] of [[0, 130, 110, '#170c29'], [130, 104, 128, '#1b0e30'], [234, 126, 104, '#150a25']]) {
    c.fillStyle = fill; c.fillRect(x0, top, w, 236 - top);
    for (let x = x0 + 12; x < x0 + w - 16; x += 30) for (const [y, h] of [[top + 12, 34], [top + 76, Math.min(36, 232 - top - 76)]]) { c.fillStyle = 'rgba(255,190,110,.32)'; c.fillRect(x, y, 16, h); c.fillStyle = 'rgba(122,60,150,.5)'; c.fillRect(x - 5, y, 4, h); c.fillRect(x + 17, y, 4, h); }
    c.save(); c.globalAlpha = 0.55;
    nLine(c, [x0, top + 54, x0 + w, top + 54], NC.cyan, 1.4); nLine(c, [x0, top + 68, x0 + w, top + 68], NC.cyan, 1);
    neon(c, () => { c.beginPath(); for (let x = x0 + 4; x < x0 + w - 4; x += 8) { c.moveTo(x, top + 68); c.lineTo(x, top + 56); c.moveTo(x + 4, top + 64); c.arc(x + 4, top + 61, 3, Math.PI / 2, Math.PI * 2.5); } }, NC.cyan, 0.7);
    c.restore();
  }
  for (const x of [128, 234]) { nLine(c, [x, 150, x, 164], NC.gold, 1.4); glow(c, x, 168, 16, '#ffd166', 0.5); circ(c, x, 168, 3, NC.gold); }
  lights(c, 28, 6, 18, 1);
  for (const x of [84, 276]) nLine(c, [x, 30, x, 42], 'rgba(255,255,255,.4)', 0.8);
  // street, crowd
  let g = c.createLinearGradient(0, 236, 0, H); g.addColorStop(0, '#1d0e30'); g.addColorStop(1, '#0c0616');
  c.fillStyle = g; c.fillRect(0, 236, W, 244);
  nLine(c, [0, 237, W, 237], NC.gold, 1.6);
  c.save(); c.globalAlpha = 0.5; c.setLineDash([14, 12]); nLine(c, [0, 318, W, 318], NC.gold, 1.2); nLine(c, [0, 428, W, 428], NC.gold, 1.2); c.restore();
  for (let i = 0; i < 70; i++) { const col = [NC.pink, NC.gold, NC.cyan, NC.green, NC.violet][i % 5]; c.globalAlpha = 0.6; c.fillStyle = col; c.save(); c.translate(hsh(i * 3 + 2) * W, 130 + hsh(i * 7 + 3) * 300); c.rotate(hsh(i) * 3); c.fillRect(-1.5, -0.8, 3, 1.6); c.restore(); }
  c.globalAlpha = 1;
  for (let i = 0; i < 22; i++) {
    const x = 8 + i * 16.5 + hsh(i + 4) * 5, y = 462 + hsh(i * 3) * 6;
    ell(c, x, y + 14, 8, 12, '#1c1236'); circ(c, x, y, 5.5, '#1c1236');
    if (i % 3 === 0) { c.strokeStyle = '#1c1236'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x + 4, y + 6); c.lineTo(x + 9, y - 10); c.stroke(); for (let k = 0; k < 5; k++) circ(c, x + 6 + Math.sin(k) * 4, y - 8 + k * 3, 1.4, [NC.gold, NC.green, NC.violet][k % 3]); }
  }
}

/* ===== 9-10 Fireworks finale ===== */
const drawFinaleBanner = c => spr(c, 'f-ban', 204, 48, g => ribbonArt(g, 204, NC.pink, T('閉園煙火', 'GRAND FINALE'), NC.gold));
function drawThanks(c) {
  spr(c, 'f-thx', 112, 34, c => {
    hangers(c, [-38, 38], -17, -11, NC.pink);
    plate(c, -52, -11, 104, 26, 6, NC.cyan, 2);
    label(c, T('謝謝光臨', 'THANK YOU!'), 0, 2.5, 88, 14, NC.white);
  });
}
const drawFinaleHorse = c => spr(c, 'f-horse', 72, 118, g => { g.scale(0.82, 0.82); horseArt(g, NC.pink, NC.gold, NC.cyan); });
function bunnyArt(c, f) {
  const col = '#ffd6ef', fill = 'rgba(255,214,239,.22)';
  for (const s of [-1, 1]) nShape(c, () => { c.beginPath(); c.ellipse(s * 7, -40, 5, 14, s * (f && s > 0 ? 0.5 : 0.12), 0, Math.PI * 2); }, col, fill, 2);
  ell(c, -7, -40, 2, 9, 'rgba(255,94,196,.5)', -0.12); ell(c, 7, -40, 2, 9, 'rgba(255,94,196,.5)', f ? 0.5 : 0.12);
  nShape(c, () => { c.beginPath(); c.ellipse(0, 22, 15, 18, 0, 0, Math.PI * 2); }, col, fill, 2.4);
  for (const s of [-1, 1]) nShape(c, () => { c.beginPath(); c.ellipse(s * 8, 41, 7, 4.5, 0, 0, Math.PI * 2); }, col, fill, 1.8);
  nLine(c, [-13, 16, -24, 8], col, 2.2); nLine(c, [13, 16, 24, f ? 0 : 6], col, 2.2);
  nShape(c, () => { c.beginPath(); for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2 - Math.PI / 2, r = k % 2 ? 2.4 : 5.5; c.lineTo(26 + Math.cos(an) * r, (f ? -4 : 2) + Math.sin(an) * r); } c.closePath(); }, NC.gold, 'rgba(255,209,102,.5)', 1.2);
  nShape(c, () => { c.beginPath(); c.arc(0, -16, 16, 0, Math.PI * 2); }, col, 'rgba(255,214,239,.3)', 2.4);
  eyes(c, [-6, 6], -17, 2.1); ell(c, 0, -11, 2, 1.5, NC.pink);
  c.globalAlpha = 0.6; circ(c, -10, -11, 2.8, NC.pink); circ(c, 10, -11, 2.8, NC.pink); c.globalAlpha = 1;
  poly(c, [0, 3, -7, -1, -7, 7], NC.cyan); poly(c, [0, 3, 7, -1, 7, 7], NC.cyan); circ(c, 0, 3, 1.8, NC.cyan);
}
function drawBunny(c, a) { const f = fr(a, 4, 2); spr(c, 'f-bun' + f, 70, 110, g => bunnyArt(g, f)); }
function drawCart(c) {
  spr(c, 'f-cart', 84, 100, c => {
    const top = () => { c.beginPath(); c.moveTo(-38, -32); c.lineTo(-30, -48); c.lineTo(30, -48); c.lineTo(38, -32); c.closePath(); };
    c.save(); top(); c.clip(); for (let x = -40, k = 0; x < 40; x += 10, k++) { c.fillStyle = k % 2 ? 'rgba(255,255,255,.18)' : 'rgba(255,74,92,.5)'; c.fillRect(x, -50, 10, 20); } c.restore();
    neon(c, top, NC.red, 2.2);
    for (let x = -38, k = 0; x < 38; x += 12.7, k++) neon(c, () => { c.beginPath(); c.arc(x + 6.3, -32, 6.3, 0, Math.PI); }, k % 2 ? NC.white : NC.red, 1.2);
    nLine(c, [-30, -26, -30, 0], NC.gold, 1.6); nLine(c, [30, -26, 30, 0], NC.gold, 1.6);
    rr(c, -30, -2, 60, 30, 3); c.fillStyle = 'rgba(255,209,102,.18)'; c.fill();
    for (let i = 0; i < 26; i++) circ(c, -24 + hsh(i * 3) * 48, 24 - hsh(i * 5 + 1) * 16 - (i % 3) * 2, 2.4 + hsh(i) * 1.4, i % 4 ? '#fff6dc' : NC.gold);
    neon(c, () => rr(c, -30, -2, 60, 30, 3), NC.cyan, 2);
    plate(c, -34, 28, 68, 12, 3, NC.gold, 1.6);
    label(c, T('爆米花', 'POPCORN'), 0, 34.5, 58, 9, NC.red, SF(), 800);
    nLine(c, [-38, 30, -42, 22], NC.white, 1.4);
    for (const x of [-22, 22]) { circ(c, x, 44, 5.5, '#12081f'); nCirc(c, x, 44, 5.2, NC.violet, 1.6); circ(c, x, 44, 1.4, NC.white); }
  });
}
function drawStarBalloon(c) {
  spr(c, 'f-bal', 44, 72, c => {
    neon(c, () => { c.beginPath(); c.moveTo(0, 10); c.quadraticCurveTo(-8, 20, -6, 26); c.quadraticCurveTo(-6, 34, -30, 40); }, NC.white, 1);
    const star = () => { c.beginPath(); for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2 - Math.PI / 2, r = k % 2 ? 9 : 19; c.lineTo(Math.cos(an) * r, -12 + Math.sin(an) * r); } c.closePath(); };
    nShape(c, star, NC.gold, 'rgba(255,209,102,.4)', 2.4);
    poly(c, [-2.5, 10, 2.5, 10, 0, 6], NC.gold);
    eyes(c, [-4, 4], -12, 1.5); neon(c, () => { c.beginPath(); c.arc(0, -9, 2.6, 0.15 * Math.PI, 0.85 * Math.PI); }, '#2a1240', 0.9);
  });
}
function drawPhotoFrame(c) {
  spr(c, 'f-frame', 82, 72, c => {
    plate(c, -38, -32, 76, 60, 6, NC.pink, 2.4);
    rr(c, -30, -24, 60, 36, 3); c.fillStyle = 'rgba(122,155,255,.15)'; c.fill();
    neon(c, () => rr(c, -30, -24, 60, 36, 3), NC.white, 1);
    c.save(); rr(c, -30, -24, 60, 36, 3); c.clip(); burstMini(c, -10, -8, 12, NC.gold); burstMini(c, 14, -2, 9, NC.cyan); c.restore();
    label(c, T('拍照點', 'PHOTO SPOT'), 0, 20, 62, 9, NC.gold, SF(), 800);
    for (const [x, y] of [[-38, -32], [38, -32], [-38, 28], [38, 28]]) bulb(c, x, y, 2, NC.gold);
  });
}
function burstMini(c, x, y, r, col) { neon(c, () => { c.beginPath(); for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2; c.moveTo(x + Math.cos(an) * r * 0.3, y + Math.sin(an) * r * 0.3); c.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } }, col, 1); }
function drawTeacup(c) {
  spr(c, 'f-cup', 88, 58, c => {
    for (const [x, hc] of [[-12, NC.gold], [10, NC.violet]]) { circ(c, x, -16, 6.5, '#ffe6f2'); neon(c, () => { c.beginPath(); c.arc(x, -17, 6.8, Math.PI * 1.05, Math.PI * 1.95); }, hc, 2.2); eyes(c, [x - 2.4, x + 2.4], -16, 1.1, true); }
    nShape(c, () => { c.beginPath(); c.ellipse(0, 23, 40, 5, 0, 0, Math.PI * 2); }, NC.cyan, INK, 1.8);
    nCirc(c, 34, 2, 8, NC.pink, 2.2, -Math.PI / 2, Math.PI / 2);
    const cup = () => { c.beginPath(); c.moveTo(-34, -10); c.lineTo(34, -10); c.quadraticCurveTo(32, 20, 0, 21); c.quadraticCurveTo(-32, 20, -34, -10); c.closePath(); };
    nShape(c, cup, NC.pink, 'rgba(36,10,40,.92)', 2.6);
    for (const [x, y] of [[-20, 0], [0, 6], [20, 0], [-10, 12], [10, 12]]) circ(c, x, y, 2.6, NC.gold);
    nEll(c, 0, -10, 34, 4, NC.pink, 1.6);
  });
}
function bgFinale(c) {
  sky(c, [[0, '#05040f'], [0.5, '#150a2e'], [0.82, '#2a0f3d'], [1, '#0b0614']]);
  stars(c, 60, 260, 14);
  burst(c, 70, 64, 52, NC.gold, 22); burst(c, 292, 74, 60, NC.pink, 24); burst(c, 190, 36, 28, NC.cyan, 14);
  burst(c, 338, 178, 32, NC.violet, 16); burst(c, 26, 178, 30, NC.green, 16);
  for (const [x, y] of [[120, 90], [240, 120], [150, 220], [220, 205]]) { c.globalAlpha = 0.6; circ(c, x, y, 1.4, '#fff'); c.globalAlpha = 1; }
  // park skyline: wheel and coaster in silhouette
  c.save(); c.globalAlpha = 0.35;
  nCirc(c, 104, 300, 70, NC.cyan, 1.6); for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; nLine(c, [104, 300, 104 + Math.cos(an) * 70, 300 + Math.sin(an) * 70], NC.cyan, 0.8); }
  neon(c, () => { c.beginPath(); c.moveTo(196, 400); c.quadraticCurveTo(230, 250, 262, 320); c.quadraticCurveTo(290, 380, 320, 270); c.lineTo(370, 330); }, NC.pink, 1.6);
  c.restore();
  c.fillStyle = '#0d0820'; c.beginPath(); c.moveTo(0, 392); for (let x = 0; x <= W; x += 18) c.lineTo(x, 382 - hsh(x) * 12); c.lineTo(W, 400); c.lineTo(0, 400); c.fill();
  // plaza
  let g = c.createLinearGradient(0, 396, 0, H); g.addColorStop(0, '#1a0c2c'); g.addColorStop(1, '#0a0514');
  c.fillStyle = g; c.fillRect(0, 396, W, 84);
  nLine(c, [0, 397, W, 397], NC.violet, 1.6);
  c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 1; for (let x = -200; x < W + 200; x += 40) { c.beginPath(); c.moveTo(180 + (x - 180) * 0.4, 398); c.lineTo(x, H); c.stroke(); }
  for (const [x, col] of [[70, '#ffd166'], [292, '#ff5ec4']]) glow(c, x, 450, 60, col, 0.16);
  for (const x of [80, 280]) nLine(c, [x, 126, x, 398], NC.violet, 1.8);
  for (const x of [80, 280]) bulb(c, x, 124, 2.6, NC.gold);
}

defineChapter({
  key: 'park', order: 9,
  name: { zh: "霓虹樂園", en: "Neon Park" },
  blurb: { zh: "夜晚的遊樂園，每塊霓虹招牌都在閃。", en: "An amusement park at night. Every neon sign is flickering." },
  style: { zh: "霓虹燈", en: "Neon" },
  narrator: { zh: "旋轉木馬", en: "Carousel Horse" },
  song: 'neon',
    comments: {
      far: [{ zh: ["燈泡短路了", "霓虹燈閃到一半熄掉，木馬也停下來了。"], en: ["Bulbs blew out", "The neon died mid-blink. The carousel stopped too."] }, { zh: ["樂園打烊…", "招牌歪成這樣，客人都找不到入口了。"], en: ["Park closed…", "Signs this crooked, nobody can find the gate."] }],
      close: [{ zh: ["再轉一圈！", "只差一點點，木馬再跑一圈就好了！"], en: ["One more lap!", "So close! Just one more lap of the carousel!"] }, { zh: ["快亮了", "OPEN 招牌已經在偷偷閃了。"], en: ["Almost lit", "The OPEN sign is already sneaking a flicker."] }],
      pass: [{ zh: ["開園囉！", "勉強開園了，但箭頭招牌好像指錯方向。"], en: ["Park's open!", "Open, but the arrow sign points the wrong way."] }, { zh: ["及格門票", "票價 $5，你剛好買到最後一張。"], en: ["Pass ticket", "Tickets are $5. You got the last one."] }],
      good: [{ zh: ["閃閃發亮！", "霓虹燈全亮，整個樂園都在為你閃。"], en: ["Shining bright!", "Every neon is lit. The whole park glows for you."] }, { zh: ["樂園好夥伴", "木馬上下跑得特別開心。"], en: ["Park pal", "The horse is bobbing extra happily."] }],
      perfect: [{ zh: ["完美霓虹♪", "一度都不差！摩天輪為你多轉了一圈。"], en: ["Perfect neon♪", "Not one degree off! The Ferris wheel spins an extra lap."] }, { zh: ["今晚的主角", "全場燈光一起打在你身上！"], en: ["Star of the night", "Every spotlight in the park is on you!"] }],
    },
  stages: [
    { key: 'neon', title: { zh: "霓虹夜", en: "Neon Night" }, place: { zh: "美國 聖塔莫尼卡", en: "Santa Monica, USA" },
      intro: { zh: "旋轉木馬會上下跑。售票招牌會帶動下面的價目牌。", en: "The carousel horse bobs up and down. The ticket sign turns the price tag below it." },
      bg: bgNeon, animated: true,
      objects: [
      { id: 'open', name: { zh: 'OPEN 招牌', en: 'OPEN sign' }, x: 255, y: 80, w: 120, h: 50, mag: 9, draw: drawOpen, sfx: 'twinkle' },
      { id: 'rides', name: { zh: '箭頭招牌', en: 'Arrow sign' }, x: 250, y: 160, w: 140, h: 50, mag: 7, draw: drawRides, sfx: 'twinkle' },
      { id: 'horse', name: { zh: '木馬', en: 'Carousel horse' }, x: 290, y: 280, w: 70, h: 120, mag: 12, draw: drawHorse, habit: (t, l) => ({ dy: Math.sin(t * 2) * 7 * l }), call: 'carousel' },
      { id: 'ice', name: { zh: '冰淇淋', en: 'Ice cream' }, x: 60, y: 330, w: 60, h: 100, mag: 10, draw: drawIce, sfx: 'pop' },
      { id: 'heart', name: { zh: '愛心氣球', en: 'Heart balloon' }, x: 150, y: 330, w: 50, h: 80, near: true, draw: drawHeart, sfx: 'pop' },
      { id: 'tickets', name: { zh: '售票招牌', en: 'Ticket sign' }, x: 190, y: 400, w: 130, h: 44, mag: 8, link: { to: 'price', k: 0.5 }, draw: drawTickets, sfx: 'twinkle' },
      { id: 'price', name: { zh: '價目牌', en: 'Price tag' }, x: 190, y: 448, w: 64, h: 40, mag: 6, draw: drawPrice, sfx: 'bell' }
      ] },
    { key: 'park-wheel', title: { zh: "摩天輪", en: "Ferris Wheel" }, place: { zh: "台灣 台北 大直", en: "Dazhi, Taipei, Taiwan" },
      intro: { zh: "摩天輪的車廂是吊著的，本來就該永遠水平。小兔子那一廂一直晃。", en: "Gondolas hang free, so they should always stay level. The bunny's one keeps swinging." },
      bg: bgWheel, animated: true,
      objects: [
      { id: 'sign', name: { zh: '摩天輪招牌', en: 'Wheel sign' }, x: 180, y: 444, w: 170, h: 46, mag: 8, draw: drawWheelSign, sfx: 'twinkle' },
      { id: 'pink', name: { zh: '粉紅車廂', en: 'Pink gondola' }, x: 72, y: 155, w: 50, h: 56, mag: 13, draw: drawGondolaPink, sfx: 'park_ride' },
      { id: 'bunny', name: { zh: '兔子車廂', en: 'Bunny gondola' }, x: 288, y: 155, w: 50, h: 56, mag: 10, draw: drawGondolaBunny, habit: (t, l) => ({ dx: Math.sin(t * 1.7) * 2.5 * l }), call: 'park_bunny' },
      { id: 'gold', name: { zh: '金色車廂', en: 'Gold gondola' }, x: 242, y: 326, w: 50, h: 56, near: true, draw: drawGondolaGold, sfx: 'park_ride' }
      ] },
    { key: 'park-carousel', title: { zh: "旋轉木馬", en: "Carousel" }, place: { zh: "美國 紐約 布魯克林", en: "Brooklyn, New York, USA" },
      intro: { zh: "兩匹木馬一上一下地跑。中間那面鏡子只歪了一點點。", en: "Two horses bob up and down in turn. The mirror in the middle is only a hair off." },
      bg: bgCarousel, animated: true,
      objects: [
      { id: 'sign', name: { zh: '木馬招牌', en: 'Carousel sign' }, x: 180, y: 128, w: 150, h: 40, mag: 9, draw: drawCarouselSign, sfx: 'twinkle' },
      { id: 'horsea', name: { zh: '粉紅木馬', en: 'Pink horse' }, x: 78, y: 280, w: 90, h: 140, mag: 12, draw: drawHorseA, habit: (t, l) => ({ dy: Math.sin(t * 2) * 7 * l }), call: 'carousel' },
      { id: 'mirror', name: { zh: '鏡子', en: 'Mirror' }, x: 180, y: 256, w: 50, h: 68, near: true, draw: drawMirror, sfx: 'shimmer' },
      { id: 'horseb', name: { zh: '藍色木馬', en: 'Blue horse' }, x: 282, y: 280, w: 90, h: 140, mag: 6, draw: drawHorseB, habit: (t, l) => ({ dy: -Math.sin(t * 2) * 7 * l }), call: 'park_pony' },
      { id: 'swan', name: { zh: '天鵝座椅', en: 'Swan chariot' }, x: 180, y: 384, w: 104, h: 60, mag: 10, draw: drawSwan, sfx: 'park_ride' }
      ] },
    { key: 'park-coaster', title: { zh: "雲霄飛車", en: "Roller Coaster" }, place: { zh: "美國 拉斯維加斯", en: "Las Vegas, USA" },
      intro: { zh: "車頭會拉著後車廂一起轉。長頸鹿在量身高，不准踮腳！", en: "The front car pulls the back car with it. The giraffe checks your height: no tiptoes!" },
      bg: bgCoaster, animated: true,
      objects: [
      { id: 'loop', name: { zh: '大迴環招牌', en: 'Loop sign' }, x: 275, y: 178, w: 96, h: 40, mag: 9, draw: drawLoopSign, sfx: 'park_neon' },
      { id: 'photo', name: { zh: '拍照螢幕', en: 'Photo screen' }, x: 110, y: 234, w: 96, h: 66, near: true, draw: drawPhoto, sfx: 'beep' },
      { id: 'giraffe', name: { zh: '量身高長頸鹿', en: 'Height giraffe' }, x: 322, y: 324, w: 60, h: 130, mag: 13, draw: drawGiraffe, habit: (t, l) => ({ dy: Math.sin(t * 1.4) * 2 * l }), call: 'park_giraffe' },
      { id: 'car1', name: { zh: '車頭', en: 'Front car' }, x: 230, y: 372, w: 92, h: 48, mag: 7, link: { to: 'car2', k: 0.6 }, draw: drawCarFront, sfx: 'park_ride' },
      { id: 'car2', name: { zh: '後車廂', en: 'Back car' }, x: 130, y: 372, w: 92, h: 48, mag: 11, draw: drawCarBack, sfx: 'park_ride' }
      ] },
    { key: 'park-haunted', title: { zh: "鬼屋", en: "Haunted House" }, place: { zh: "美國 加州 安納罕", en: "Anaheim, California, USA" },
      intro: { zh: "一點都不可怕！左窗板會帶動右窗板。旁邊那間小屋，好像本來就是歪的…", en: "Not scary at all! The left shutter turns the right one. That little house next door looks crooked on purpose…" },
      bg: bgHaunted, animated: true,
      objects: [
      { id: 'ghost', name: { zh: '小幽靈', en: 'Little ghost' }, x: 62, y: 206, w: 64, h: 76, mag: 12, draw: drawGhost, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 4 * l, dy: Math.sin(t * 1.8) * 6 * l }), call: 'park_ghost' },
      { id: 'shutl', name: { zh: '左窗板', en: 'Left shutter' }, x: 138, y: 236, w: 30, h: 66, mag: 8, link: { to: 'shutr', k: 0.6 }, draw: drawShutterL, sfx: 'wood' },
      { id: 'shutr', name: { zh: '右窗板', en: 'Right shutter' }, x: 222, y: 236, w: 30, h: 66, mag: 5, draw: drawShutterR, sfx: 'wood' },
      { id: 'bat', name: { zh: '小蝙蝠', en: 'Little bat' }, x: 292, y: 84, w: 74, h: 40, mag: 10, draw: drawBat, habit: (t, l) => ({ dx: Math.sin(t * 1.3) * 5 * l, dy: Math.sin(t * 5) * 3 * l }), call: 'park_bat' },
      { id: 'sign', name: { zh: '鬼屋招牌', en: 'Haunted sign' }, x: 180, y: 314, w: 104, h: 36, near: true, draw: drawHauntSign, sfx: 'park_neon' },
      { id: 'tilt', name: { zh: '傾斜屋', en: 'Tilt house' }, x: 310, y: 378, w: 78, h: 96, trap: true, keep: 7, trapNote: { zh: '傾斜屋本來就故意蓋歪，讓人站不穩', en: 'Tilt houses are built crooked on purpose to throw off your balance' }, draw: drawTiltHouse }
      ] },
    { key: 'park-gallery', title: { zh: "射擊攤", en: "Shooting Gallery" }, place: { zh: "美國 紐約 康尼島", en: "Coney Island, New York, USA" },
      intro: { zh: "用水槍射小鴨，射中有獎！藍隊記分板會帶動粉紅隊的。", en: "Squirt the ducks with water to win a prize! The blue scoreboard turns the pink one." },
      bg: bgGallery, animated: true,
      objects: [
      { id: 'sign', name: { zh: '攤位招牌', en: 'Stall sign' }, x: 180, y: 120, w: 196, h: 42, mag: 10, draw: drawGallerySign, sfx: 'twinkle' },
      { id: 'duck1', name: { zh: '小鴨靶', en: 'Duck target' }, x: 92, y: 340, w: 58, h: 46, mag: 13, draw: drawDuckA, habit: (t, l) => ({ dx: Math.sin(t * 1.1) * 8 * l }), call: 'park_duck' },
      { id: 'scorea', name: { zh: '藍隊記分板', en: 'Blue scoreboard' }, x: 70, y: 206, w: 84, h: 48, mag: 8, link: { to: 'scoreb', k: 0.5 }, draw: drawScoreA, sfx: 'beep' },
      { id: 'plush', name: { zh: '熊熊獎品', en: 'Prize bear' }, x: 180, y: 218, w: 62, h: 80, near: true, draw: drawPlush, sfx: 'boing' },
      { id: 'scoreb', name: { zh: '粉紅記分板', en: 'Pink scoreboard' }, x: 290, y: 206, w: 84, h: 48, mag: 6, draw: drawScoreB, sfx: 'beep' },
      { id: 'duck2', name: { zh: '小鴨靶２', en: 'Duck target 2' }, x: 268, y: 340, w: 58, h: 46, near: true, draw: drawDuckA, habit: (t, l) => ({ dx: -Math.sin(t * 1.1) * 8 * l }), call: 'park_duck' }
      ] },
    { key: 'park-balloons', title: { zh: "熱氣球節", en: "Balloon Festival" }, place: { zh: "台灣 台東 鹿野高台", en: "Luye Highland, Taitung, Taiwan" },
      intro: { zh: "天黑後熱氣球點火發光。大招牌會帶動下面的日期牌。", en: "After dark the balloons light up and glow. The big sign turns the date tag below it." },
      bg: bgBalloons, animated: true,
      objects: [
      { id: 'pink', name: { zh: '粉紅熱氣球', en: 'Pink balloon' }, x: 88, y: 172, w: 100, h: 140, mag: 12, draw: drawBalloonA, sfx: 'park_burner' },
      { id: 'cyan', name: { zh: '藍色熱氣球', en: 'Blue balloon' }, x: 272, y: 146, w: 92, h: 124, near: true, draw: drawBalloonB, sfx: 'park_burner' },
      { id: 'bear', name: { zh: '熊熊熱氣球', en: 'Bear balloon' }, x: 190, y: 268, w: 84, h: 116, mag: 9, draw: drawBearBalloon, habit: (t, l) => ({ dy: Math.sin(t * 1.1) * 5 * l }), call: 'park_bear' },
      { id: 'bunch', name: { zh: '氣球串', en: 'Balloon bunch' }, x: 310, y: 318, w: 56, h: 86, mag: 14, draw: drawBunch, sfx: 'pop' },
      { id: 'sign', name: { zh: '嘉年華招牌', en: 'Festival sign' }, x: 180, y: 404, w: 184, h: 42, mag: 7, link: { to: 'date', k: 0.5 }, draw: drawFestSign, sfx: 'twinkle' },
      { id: 'date', name: { zh: '日期牌', en: 'Date tag' }, x: 180, y: 448, w: 92, h: 34, near: true, draw: drawDateTag, sfx: 'bell' }
      ] },
    { key: 'park-water', title: { zh: "水上樂園", en: "Water Park" }, place: { zh: "新加坡 白沙", en: "Pasir Ris, Singapore" },
      intro: { zh: "泳池招牌會帶動下面的水深牌。滑水道嘛…要不要扶正，你自己想想。", en: "The pool sign turns the depth tag. As for the water slide… think before you straighten it." },
      bg: bgWater, animated: true,
      objects: [
      { id: 'sign', name: { zh: '泳池招牌', en: 'Pool sign' }, x: 270, y: 60, w: 108, h: 42, mag: 9, link: { to: 'depth', k: 0.5 }, draw: drawPoolSign, sfx: 'twinkle' },
      { id: 'depth', name: { zh: '水深牌', en: 'Depth tag' }, x: 270, y: 104, w: 90, h: 34, mag: 6, draw: drawDepthTag, sfx: 'bell' },
      { id: 'umbrella', name: { zh: '海灘傘', en: 'Beach umbrella' }, x: 306, y: 238, w: 84, h: 120, mag: 12, draw: drawUmbrella, sfx: 'boing' },
      { id: 'dolphin', name: { zh: '海豚浮板', en: 'Dolphin float' }, x: 92, y: 372, w: 96, h: 60, mag: 10, draw: drawDolphin, habit: (t, l) => ({ dy: Math.sin(t * 1.6) * 3 * l }), call: 'park_dolphin' },
      { id: 'duck', name: { zh: '小黃鴨', en: 'Rubber duck' }, x: 250, y: 364, w: 60, h: 52, mag: 14, draw: drawRubberDuck, habit: (t, l) => ({ dx: Math.sin(t * 0.8) * 6 * l, dy: Math.sin(t * 2.2) * 2 * l }), call: 'park_duck' },
      { id: 'ring', name: { zh: '游泳圈', en: 'Swim ring' }, x: 170, y: 434, w: 64, h: 46, near: true, draw: drawRing, sfx: 'park_splash' },
      { id: 'kick', name: { zh: '浮板', en: 'Kickboard' }, x: 300, y: 440, w: 72, h: 36, near: true, draw: drawKickboard, sfx: 'park_splash' },
      { id: 'slide', name: { zh: '滑水道', en: 'Water slide' }, x: 150, y: 245, w: 204, h: 36, trap: true, keep: 22, trapNote: { zh: '滑水道本來就要斜，人才滑得下去', en: 'A water slide has to slope, or nobody could slide down' }, draw: drawSlide }
      ] },
    { key: 'park-parade', title: { zh: "遊行花車", en: "Parade Floats" }, place: { zh: "美國 紐奧良", en: "New Orleans, USA" },
      intro: { zh: "龍頭花車會拖著龍尾一起轉，大布條也會帶動下面的時間牌。", en: "The dragon's head float drags its tail along, and the big banner turns the time tag below." },
      bg: bgParade, animated: true,
      objects: [
      { id: 'banner', name: { zh: '遊行布條', en: 'Parade banner' }, x: 180, y: 62, w: 212, h: 48, mag: 8, link: { to: 'time', k: 0.5 }, draw: drawParadeBanner, sfx: 'twinkle' },
      { id: 'time', name: { zh: '時間牌', en: 'Time tag' }, x: 180, y: 106, w: 106, h: 34, near: true, draw: drawTimeTag, sfx: 'bell' },
      { id: 'jazz', name: { zh: '爵士招牌', en: 'Jazz sign' }, x: 70, y: 166, w: 92, h: 46, mag: 11, draw: drawJazz, sfx: 'park_neon' },
      { id: 'dragon', name: { zh: '龍頭花車', en: 'Dragon head float' }, x: 262, y: 258, w: 120, h: 84, mag: 13, link: { to: 'tail', k: 0.6 }, draw: drawDragonHead, habit: (t, l) => ({ dy: Math.sin(t * 2.4) * 2 * l }), call: 'park_dragon' },
      { id: 'tail', name: { zh: '龍尾花車', en: 'Dragon tail float' }, x: 112, y: 266, w: 110, h: 70, mag: 6, draw: drawDragonTail, sfx: 'park_ride' },
      { id: 'whale', name: { zh: '鯨魚花車', en: 'Whale float' }, x: 96, y: 380, w: 120, h: 76, mag: 9, draw: drawWhaleFloat, habit: (t, l) => ({ dy: Math.sin(t * 1.5) * 3 * l }), call: 'whale' },
      { id: 'cake', name: { zh: '蛋糕花車', en: 'Cake float' }, x: 262, y: 376, w: 110, h: 88, near: true, draw: drawCake, sfx: 'park_ride' }
      ] },
    { key: 'park-finale', title: { zh: "煙火終章", en: "Fireworks Finale" }, place: { zh: "台灣 台北 兒童新樂園", en: "Children's Amusement Park, Taipei" },
      intro: { zh: "最後一晚！布條帶動謝謝光臨牌，爆米花車拉著星星氣球。木馬回來謝幕了。", en: "Last night! The banner turns the thank-you tag, and the popcorn cart tugs its star balloon. The horse is back for a bow." },
      bg: bgFinale, animated: true,
      objects: [
      { id: 'banner', name: { zh: '煙火布條', en: 'Finale banner' }, x: 180, y: 148, w: 204, h: 48, mag: 7, link: { to: 'thanks', k: 0.5 }, draw: drawFinaleBanner, sfx: 'twinkle' },
      { id: 'thanks', name: { zh: '謝謝光臨牌', en: 'Thank-you tag' }, x: 180, y: 192, w: 112, h: 34, near: true, draw: drawThanks, sfx: 'bell' },
      { id: 'horse', name: { zh: '旋轉木馬', en: 'Carousel horse' }, x: 58, y: 300, w: 78, h: 118, mag: 11, draw: drawFinaleHorse, habit: (t, l) => ({ dy: Math.sin(t * 2) * 6 * l }), call: 'carousel' },
      { id: 'bunny', name: { zh: '兔子吉祥物', en: 'Bunny mascot' }, x: 304, y: 300, w: 70, h: 110, mag: 13, draw: drawBunny, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 2.6)) * 7 * l }), call: 'park_bunny' },
      { id: 'cart', name: { zh: '爆米花車', en: 'Popcorn cart' }, x: 140, y: 340, w: 84, h: 100, mag: 9, link: { to: 'balloon', k: 0.4 }, draw: drawCart, sfx: 'jingle' },
      { id: 'balloon', name: { zh: '星星氣球', en: 'Star balloon' }, x: 202, y: 254, w: 44, h: 72, near: true, draw: drawStarBalloon, sfx: 'pop' },
      { id: 'frame', name: { zh: '拍照框', en: 'Photo frame' }, x: 236, y: 384, w: 82, h: 72, mag: 5, draw: drawPhotoFrame, sfx: 'park_neon' },
      { id: 'cup', name: { zh: '咖啡杯', en: 'Teacup ride' }, x: 70, y: 436, w: 88, h: 58, mag: 14, draw: drawTeacup, sfx: 'park_ride' }
      ] },
  ],
});
