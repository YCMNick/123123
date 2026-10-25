// 第 8 大關 世界奇景 / World 8: World Wonders (Photo).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== Level 3: photographic Pisa ===== */
function bgItaly(c) {
  const R = mulberry(7);
  let g = c.createLinearGradient(0, 0, 0, 340);
  g.addColorStop(0, '#5b8ac6'); g.addColorStop(0.45, '#a8c3df'); g.addColorStop(0.78, '#f0dcbc'); g.addColorStop(1, '#f5c88e');
  c.fillStyle = g; c.fillRect(0, 0, W, 340);
  const rg = c.createRadialGradient(330, 215, 0, 330, 215, 230); rg.addColorStop(0, 'rgba(255,222,160,.85)'); rg.addColorStop(1, 'rgba(255,222,160,0)');
  c.fillStyle = rg; c.fillRect(0, 0, W, 340);
  for (let i = 0; i < 14; i++) {
    const x = 170 + R() * 220, y = 30 + R() * 140, r = 18 + R() * 34;
    c.save(); c.translate(x, y); c.scale(1.9, 0.55);
    const cg = c.createRadialGradient(0, 0, 0, 0, 0, r); cg.addColorStop(0, 'rgba(255,255,255,.55)'); cg.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = cg; c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fill(); c.restore();
  }
  c.fillStyle = 'rgba(120,135,130,.45)'; c.beginPath(); c.moveTo(180, 340);
  for (let x = 180; x <= 360; x += 10) c.lineTo(x, 314 + Math.sin(x * 0.05) * 6 + R() * 3);
  c.lineTo(360, 340); c.closePath(); c.fill();
  // cathedral, softened by haze
  c.save(); c.globalAlpha = 0.78;
  const x0 = 190, x1 = 360, top = 286, base = 338;
  c.fillStyle = '#efe7d6'; c.fillRect(x0, top, x1 - x0, base - top);
  c.beginPath(); c.moveTo(250, top); c.lineTo(296, top - 24); c.lineTo(342, top); c.closePath(); c.fill();
  c.beginPath(); c.ellipse(222, top, 18, 16, 0, Math.PI, 0); c.fill();
  c.fillStyle = 'rgba(120,112,98,.25)'; for (let y = top + 4; y < base; y += 7) c.fillRect(x0, y, x1 - x0, 2);
  c.fillStyle = 'rgba(110,98,80,.4)';
  for (let x = x0 + 6; x < x1 - 8; x += 11) { c.beginPath(); c.moveTo(x, top + 30); c.lineTo(x, top + 20); c.arc(x + 4, top + 20, 4, Math.PI, 0); c.lineTo(x + 8, top + 30); c.closePath(); c.fill(); }
  c.restore();
  g = c.createLinearGradient(0, 334, 0, 410); g.addColorStop(0, '#7da447'); g.addColorStop(1, '#4c7a2a');
  c.fillStyle = g; c.fillRect(0, 334, W, 76);
  for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.05)'; c.beginPath(); c.moveTo(190 + i * 22, 334); c.lineTo(190 + (i + 1) * 22, 334); c.lineTo(150 + (i + 1) * 40, 410); c.lineTo(150 + i * 40, 410); c.closePath(); c.fill(); }
  g = c.createLinearGradient(0, 404, 0, 480); g.addColorStop(0, '#d2bf9f'); g.addColorStop(1, '#a8946f');
  c.fillStyle = g; c.fillRect(0, 404, W, 76);
  c.strokeStyle = 'rgba(90,70,45,.25)'; c.lineWidth = 1;
  for (let y = 410, s = 5; y < 480; y += s, s *= 1.25) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  for (let i = -10; i < 20; i++) { c.beginPath(); c.moveTo(260 + i * 12, 404); c.lineTo(260 + i * 30, 480); c.stroke(); }
  c.fillStyle = 'rgba(30,40,15,.35)'; c.beginPath(); c.ellipse(306, 362, 46, 7, 0, 0, Math.PI * 2); c.fill();
  // ochre wall on the left
  const ww = 190;
  g = c.createLinearGradient(0, 0, ww, 0); g.addColorStop(0, '#b97a40'); g.addColorStop(0.6, '#d59c5e'); g.addColorStop(1, '#e2ad70');
  c.fillStyle = g; c.fillRect(0, 0, ww, H);
  g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(60,30,10,.18)'); g.addColorStop(0.5, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(60,30,10,.22)');
  c.fillStyle = g; c.fillRect(0, 0, ww, H);
  for (let i = 0; i < 2600; i++) { c.fillStyle = R() < 0.5 ? 'rgba(255,240,210,.10)' : 'rgba(70,35,10,.10)'; c.fillRect(R() * ww, R() * H, 1 + R() * 2, 1 + R() * 2); }
  c.strokeStyle = 'rgba(60,30,10,.35)'; c.lineWidth = 0.8; c.beginPath();
  let cx = 24, cy = 226; c.moveTo(cx, cy); for (let i = 0; i < 40; i++) { cx += 0.6 + R() * 1.6; cy += (R() - 0.35) * 3; c.lineTo(cx, cy); } c.stroke();
  c.save(); c.beginPath(); c.moveTo(130, 380); c.bezierCurveTo(165, 372, 182, 392, 172, 420); c.bezierCurveTo(160, 440, 128, 432, 124, 410); c.closePath(); c.clip();
  c.fillStyle = '#9a5236'; c.fillRect(110, 360, 80, 90);
  c.strokeStyle = 'rgba(230,200,170,.6)'; c.lineWidth = 1.2;
  for (let y = 362, r = 0; y < 450; y += 7, r++) { c.beginPath(); c.moveTo(110, y); c.lineTo(190, y); c.stroke(); for (let x = 110 + (r % 2) * 8; x < 190; x += 16) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 7); c.stroke(); } }
  c.restore();
  c.fillStyle = 'rgba(255,225,170,.6)'; c.fillRect(ww - 3, 0, 3, H);
  c.fillStyle = 'rgba(60,30,10,.25)'; c.fillRect(ww, 0, 5, 404);
  c.fillStyle = '#e9dcc0'; c.fillRect(56, 84, 68, 122);
  g = c.createLinearGradient(0, 92, 0, 198); g.addColorStop(0, '#1d140e'); g.addColorStop(1, '#3d2a1c');
  c.fillStyle = g; c.fillRect(62, 92, 56, 108);
  c.fillStyle = 'rgba(240,230,210,.22)'; c.beginPath(); c.moveTo(62, 92); c.lineTo(92, 92); c.quadraticCurveTo(76, 140, 70, 200); c.lineTo(62, 200); c.closePath(); c.fill();
  c.fillStyle = 'rgba(50,25,8,.35)'; c.fillRect(56, 206, 68, 5);
  g = c.createLinearGradient(0, 462, 0, 480); g.addColorStop(0, '#8d7a60'); g.addColorStop(1, '#6e5d46');
  c.fillStyle = g; c.fillRect(0, 462, ww, 18);
}
function ovItaly(c) {
  c.globalAlpha = 0.07; c.drawImage(GRAIN, 0, 0, W, H); c.globalAlpha = 1;
  const v = c.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.78);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(30,15,0,.45)');
  c.fillStyle = v; c.fillRect(0, 0, W, H);
  c.fillStyle = 'rgba(255,170,80,.05)'; c.fillRect(0, 0, W, H);
}
function drawShutter(c, side) {
  const w = 40, h = 115, x = -20, y = -57.5;
  softShadow(c, true); c.fillStyle = '#2f5539'; c.fillRect(x, y, w, h); softShadow(c, false);
  const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#2e5638'); g.addColorStop(0.5, '#3f6e4a'); g.addColorStop(1, '#2a4f34');
  c.fillStyle = g; c.fillRect(x, y, w, h);
  c.strokeStyle = '#1f3a27'; c.lineWidth = 3; c.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
  c.fillStyle = '#2a4b32'; c.fillRect(x, -3, w, 6);
  for (let yy = y + 6; yy < y + h - 6; yy += 6.5) { if (Math.abs(yy) < 6) continue; c.fillStyle = 'rgba(140,190,145,.45)'; c.fillRect(x + 4, yy, w - 8, 1.4); c.fillStyle = 'rgba(10,25,15,.55)'; c.fillRect(x + 4, yy + 1.6, w - 8, 2); }
  c.fillStyle = 'rgba(225,215,190,.2)'; c.fillRect(x + 8, y + 30, 9, 1.2); c.fillRect(x + 20, y + 78, 12, 1); c.fillRect(x + 6, y + 96, 5, 1.4);
  const hx = side === 'L' ? x + w - 3 : x;
  c.fillStyle = '#1a1a1a'; c.fillRect(hx, y + 10, 3, 9); c.fillRect(hx, y + h - 19, 3, 9);
}
function drawGelato(c) {
  c.strokeStyle = '#3a3a3a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-45, -27); c.lineTo(-45, -40); c.moveTo(45, -27); c.lineTo(45, -40); c.stroke();
  softShadow(c, true); rr(c, -65, -27, 130, 54, 8); c.fillStyle = '#f1e7d0'; c.fill(); softShadow(c, false);
  let g = c.createLinearGradient(0, -27, 0, 27); g.addColorStop(0, '#fbf4e4'); g.addColorStop(1, '#e2d4b4');
  c.fillStyle = g; rr(c, -65, -27, 130, 54, 8); c.fill();
  c.strokeStyle = '#b3322a'; c.lineWidth = 3; rr(c, -60, -22, 120, 44, 6); c.stroke();
  txt(c, 'Gelateria', 0, -3, 'italic 700 21px "Playfair Display", Georgia, serif', '#b3322a');
  txt(c, 'ARTIGIANALE · DAL 1962', 0, 13, '700 8px "Playfair Display", Georgia, serif', '#6b4a2a');
  c.fillStyle = '#2c2a2a'; c.beginPath(); c.ellipse(55, 18, 4, 3, 0.4, 0, Math.PI * 2); c.fill();
  g = c.createLinearGradient(-65, -27, 20, 27); g.addColorStop(0, 'rgba(255,255,255,.35)'); g.addColorStop(0.4, 'rgba(255,255,255,0)');
  c.fillStyle = g; rr(c, -65, -27, 130, 54, 8); c.fill();
}
function drawPlaque(c) {
  softShadow(c, true); c.fillStyle = '#ece8e0'; c.fillRect(-70, -23, 140, 46); softShadow(c, false);
  const g = c.createLinearGradient(-70, -23, 70, 23); g.addColorStop(0, '#f7f4ee'); g.addColorStop(1, '#d6d0c4');
  c.fillStyle = g; c.fillRect(-70, -23, 140, 46);
  c.strokeStyle = 'rgba(120,115,105,.25)'; c.lineWidth = 0.8;
  c.beginPath(); c.moveTo(-70, 8); c.bezierCurveTo(-30, -6, 10, 20, 70, -4); c.stroke();
  c.beginPath(); c.moveTo(-20, -23); c.bezierCurveTo(-5, -5, 15, 0, 30, 23); c.stroke();
  txt(c, 'PIAZZA DEI MIRACOLI', 0.6, -3.4, '700 10.5px "Playfair Display", Georgia, serif', 'rgba(255,255,255,.85)');
  txt(c, 'PIAZZA DEI MIRACOLI', 0, -4, '700 10.5px "Playfair Display", Georgia, serif', '#3b3a37');
  txt(c, 'Pisa', 0, 11, 'italic 700 9px "Playfair Display", Georgia, serif', '#6a665e');
  c.fillStyle = '#8f8a80'; [[-63, -16], [63, -16], [-63, 16], [63, 16]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 2, 0, Math.PI * 2); c.fill(); });
}
function drawBoard(c) {
  c.strokeStyle = '#5e3d22'; c.lineWidth = 4; c.beginPath(); c.moveTo(-36, 28); c.lineTo(-42, 50); c.moveTo(36, 28); c.lineTo(42, 50); c.stroke();
  softShadow(c, true); c.fillStyle = '#7a5230'; c.fillRect(-45, -50, 90, 80); softShadow(c, false);
  const g = c.createLinearGradient(-45, 0, 45, 0); g.addColorStop(0, '#6b4527'); g.addColorStop(0.5, '#8d6038'); g.addColorStop(1, '#6b4527');
  c.fillStyle = g; c.fillRect(-45, -50, 90, 80);
  c.fillStyle = '#283029'; c.fillRect(-39, -44, 78, 68);
  const rg = c.createRadialGradient(-8, -14, 4, -8, -14, 50); rg.addColorStop(0, 'rgba(255,255,255,.10)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = rg; c.fillRect(-39, -44, 78, 68);
  const chalk = 'rgba(250,250,240,.92)';
  txt(c, 'Menu', 0, -32, '600 19px Caveat, cursive', chalk);
  c.strokeStyle = 'rgba(250,250,240,.7)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-16, -22); c.lineTo(16, -22); c.stroke();
  [['Spritz', '8'], ['Caffè', '1.5'], ['Gelato', '3']].forEach(([a, b], i) => {
    txt(c, a, -32, -11 + i * 13, '600 13px Caveat, cursive', chalk, 'left');
    txt(c, '€' + b, 32, -11 + i * 13, '600 13px Caveat, cursive', chalk, 'right');
  });
}
function drawBanner(c) {
  c.strokeStyle = '#5a4a3a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-92, -26); c.lineTo(-75, -18); c.moveTo(92, -26); c.lineTo(75, -18); c.stroke();
  const path = () => { c.beginPath(); c.moveTo(-75, -18); c.quadraticCurveTo(0, -14, 75, -18); c.lineTo(75, 14); c.quadraticCurveTo(0, 22, -75, 14); c.closePath(); };
  softShadow(c, true); path(); c.fillStyle = '#f6efe0'; c.fill(); softShadow(c, false);
  const g = c.createLinearGradient(-75, 0, 75, 0); [0, 0.2, 0.4, 0.6, 0.8, 1].forEach((s, i) => g.addColorStop(s, i % 2 ? 'rgba(0,0,0,.07)' : 'rgba(255,255,255,.12)'));
  path(); c.fillStyle = g; c.fill();
  c.save(); path(); c.clip(); c.fillStyle = '#2f8a4f'; c.fillRect(-75, -20, 150, 5); c.fillStyle = '#c8372d'; c.fillRect(-75, 11, 150, 12); c.restore();
  txt(c, 'BENVENUTI A PISA', 0, -1, '700 12.5px "Playfair Display", Georgia, serif', '#1f3528');
}
function drawPisa(c) {
  const hw = 28, top = -86, bot = 112;
  const stops = g => { g.addColorStop(0, '#a99d86'); g.addColorStop(0.28, '#e9dfcb'); g.addColorStop(0.55, '#fbf6ea'); g.addColorStop(0.85, '#d5c9b1'); g.addColorStop(1, '#9b8f78'); return g; };
  softShadow(c, true); c.fillStyle = '#e9dfcb'; c.fillRect(-hw, top, hw * 2, bot - top); c.fillRect(-21, -110, 42, 24); softShadow(c, false);
  c.fillStyle = stops(c.createLinearGradient(-hw, 0, hw, 0)); c.fillRect(-hw, top, hw * 2, bot - top);
  c.fillStyle = stops(c.createLinearGradient(-21, 0, 21, 0)); c.fillRect(-21, -108, 42, 22);
  c.fillStyle = '#8d8270'; c.fillRect(-23, -112, 46, 4);
  const arches = (cols, y0, th, a, dark) => {
    for (let j = 0; j < cols.length - 1; j++) {
      const x1 = cols[j] + 1.3, x2 = cols[j + 1] - 1.3, mx = (x1 + x2) / 2, edge = Math.abs(mx) / hw;
      c.fillStyle = `rgba(${dark},${a * (1 - edge * 0.5)})`;
      c.beginPath(); c.moveTo(x1, y0 + th - 2); c.lineTo(x1, y0 + th * 0.42); c.quadraticCurveTo(mx, y0 + th * 0.1, x2, y0 + th * 0.42); c.lineTo(x2, y0 + th - 2); c.closePath(); c.fill();
    }
  };
  const cols = [-75, -50, -25, 0, 25, 50, 75].map(a => Math.sin(rad(a)) * hw);
  for (let i = 0; i < 7; i++) {
    const y0 = top + i * 26, ground = i === 6, th = ground ? bot - y0 : 26;
    c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(-hw - 1.5, y0 - 1, hw * 2 + 3, 2.2);
    c.fillStyle = 'rgba(80,66,46,.35)'; c.fillRect(-hw, y0 + 1.2, hw * 2, 1.2);
    arches(cols, y0, th, ground ? 0.25 : 0.55, ground ? '110,96,78' : '60,48,34');
  }
  arches([-60, -20, 20, 60].map(a => Math.sin(rad(a)) * 21), -108, 22, 0.55, '60,48,34');
  const sh = c.createLinearGradient(-hw, 0, hw, 0); sh.addColorStop(0, 'rgba(60,45,30,.25)'); sh.addColorStop(0.5, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(60,45,30,.3)');
  c.fillStyle = sh; c.fillRect(-hw, top, hw * 2, bot - top);
  c.fillStyle = 'rgba(255,200,130,.25)'; c.fillRect(hw - 4, top, 4, bot - top);
}

/* ===== Stages 2-10: shared photo-style helpers ===== */
// Objects in this world are painted with gradients and soft shadows, which are slow to
// redraw every frame. sprite() paints an object once per language and pixel density into
// an offscreen canvas and then only stamps that picture.
const SPRITES = new Map();
// The margin is lopsided because softShadow falls down and to the right.
function sprite(id, w, h, fn, lt = 8, rb = 16) {
  return (c, a) => {
    const k = KPX, key = id + '|' + LANG + '|' + k;
    let s = SPRITES.get(key);
    if (!s) {
      if (SPRITES.size > 260) SPRITES.clear();
      s = document.createElement('canvas');
      s.width = Math.ceil((w + lt + rb) * k); s.height = Math.ceil((h + lt + rb) * k);
      const x = s.getContext('2d'); x.setTransform(k, 0, 0, k, (w / 2 + lt) * k, (h / 2 + lt) * k);
      fn(x, a); SPRITES.set(key, s);
    }
    c.drawImage(s, -w / 2 - lt, -h / 2 - lt, s.width / k, s.height / k);
  };
}
// Film grain, vignette and a warm wash, painted once and stamped every frame.
function photoOverlay(id, tint, vig = 0.42) {
  return c => {
    const k = KPX, key = 'ov|' + id + '|' + k;
    let s = SPRITES.get(key);
    if (!s) {
      s = document.createElement('canvas'); s.width = Math.round(W * k); s.height = Math.round(H * k);
      const x = s.getContext('2d'); x.setTransform(k, 0, 0, k, 0, 0);
      x.globalAlpha = 0.07; x.drawImage(GRAIN, 0, 0, W, H); x.globalAlpha = 1;
      const v = x.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.78);
      v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(30,15,0,${vig})`);
      x.fillStyle = v; x.fillRect(0, 0, W, H); x.fillStyle = tint; x.fillRect(0, 0, W, H);
      SPRITES.set(key, s);
    }
    c.drawImage(s, 0, 0, W, H);
  };
}
function lin(c, x0, y0, x1, y1, ...st) { const g = c.createLinearGradient(x0, y0, x1, y1); for (let i = 0; i < st.length; i += 2) g.addColorStop(st[i], st[i + 1]); return g; }
function radl(c, x, y, r, ...st) { const g = c.createRadialGradient(x, y, 0, x, y, r); for (let i = 0; i < st.length; i += 2) g.addColorStop(st[i], st[i + 1]); return g; }
function glow(c, x, y, r, rgb, a) { c.fillStyle = radl(c, x, y, r, 0, `rgba(${rgb},${a})`, 1, `rgba(${rgb},0)`); c.fillRect(x - r, y - r, r * 2, r * 2); }
function puffs(c, R, n, x0, x1, y0, y1, a = 0.5, col = '255,255,255') {
  for (let i = 0; i < n; i++) {
    const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0), r = 16 + R() * 32;
    c.save(); c.translate(x, y); c.scale(1.9, 0.5);
    c.fillStyle = radl(c, 0, 0, r, 0, `rgba(${col},${a})`, 1, `rgba(${col},0)`); c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fill(); c.restore();
  }
}
// A ridge line y = f(x): base plus a few sine waves [freq, amp, phase, ...].
const wave = (base, ...w) => x => { let y = base; for (let i = 0; i < w.length; i += 3) y += Math.sin(x * w[i] + w[i + 2]) * w[i + 1]; return y; };
function ridge(c, f, bottom, fill) { c.beginPath(); c.moveTo(0, bottom); for (let x = 0; x <= W; x += 3) c.lineTo(x, f(x)); c.lineTo(W, bottom); c.closePath(); c.fillStyle = fill; c.fill(); }
function speck(c, R, x, y, w, h, n, a = 0.1, light = '255,240,210', dark = '60,35,15') {
  for (let i = 0; i < n; i++) { c.fillStyle = R() < 0.5 ? `rgba(${light},${a})` : `rgba(${dark},${a})`; c.fillRect(x + R() * w, y + R() * h, 0.8 + R() * 1.6, 0.8 + R() * 1.6); }
}
// Diagonal glass/varnish highlight over a rounded box centred at 0.
function gloss(c, w, h, r = 4, a = 0.3) { c.fillStyle = lin(c, -w / 2, -h / 2, w * 0.15, h / 2, 0, `rgba(255,255,255,${a})`, 0.45, 'rgba(255,255,255,0)'); rr(c, -w / 2, -h / 2, w, h, r); c.fill(); }
function bolt(c, x, y, r = 1.8) { circ(c, x, y, r, '#77705f'); circ(c, x - 0.5, y - 0.5, r * 0.45, 'rgba(255,255,255,.6)'); }
function woodBoard(c, x, y, w, h, r, light, mid, dark) {
  softShadow(c, true); rr(c, x, y, w, h, r); c.fillStyle = mid; c.fill(); softShadow(c, false);
  rr(c, x, y, w, h, r); c.fillStyle = lin(c, x, y, x, y + h, 0, light, 0.55, mid, 1, dark); c.fill();
  c.save(); rr(c, x, y, w, h, r); c.clip(); c.strokeStyle = 'rgba(55,28,10,.2)'; c.lineWidth = 0.7;
  for (let i = 0; i < h / 3.4; i++) { const yy = y + 2 + i * 3.4; c.beginPath(); c.moveTo(x, yy); c.bezierCurveTo(x + w * 0.3, yy + Math.sin(i * 3.1) * 1.4, x + w * 0.7, yy - Math.sin(i * 2.3) * 1.4, x + w, yy + Math.sin(i * 1.7)); c.stroke(); }
  c.restore();
}
function postV(c, x, y0, y1, hw, light, dark) { c.fillStyle = lin(c, x - hw, 0, x + hw, 0, 0, light, 1, dark); c.fillRect(x - hw, y0, hw * 2, y1 - y0); }
const arch = (c, x, y, w, h) => { c.beginPath(); c.moveTo(x - w / 2, y + h); c.lineTo(x - w / 2, y + w / 2); c.arc(x, y + w / 2, w / 2, Math.PI, 0); c.lineTo(x + w / 2, y + h); c.closePath(); };
// Camera on a tripod (56 × 104), shared by several stages.
function drawTripod(c) {
  c.lineCap = 'round';
  c.strokeStyle = '#1f2024'; c.lineWidth = 2.8; c.beginPath(); c.moveTo(0, -24); c.lineTo(-24, 50); c.moveTo(0, -24); c.lineTo(24, 50); c.moveTo(0, -24); c.lineTo(2, 51); c.stroke();
  c.strokeStyle = 'rgba(200,205,215,.55)'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(-1, -20); c.lineTo(-23, 48); c.moveTo(1, -20); c.lineTo(23, 48); c.stroke();
  c.fillStyle = '#3b3d44'; [[-15, 22], [15, 22]].forEach(([x, y]) => c.fillRect(x - 2.5, y, 5, 4));
  c.fillStyle = '#2d2e33'; c.fillRect(-4, -30, 8, 8);
  softShadow(c, true); rr(c, -22, -50, 44, 24, 4); c.fillStyle = '#1c1c21'; c.fill(); softShadow(c, false);
  rr(c, -22, -50, 44, 24, 4); c.fillStyle = lin(c, 0, -50, 0, -26, 0, '#45464f', 1, '#16161a'); c.fill();
  poly(c, [-9, -50, -6, -55, 6, -55, 9, -50], '#2a2b31');
  c.fillStyle = '#5c5e66'; c.fillRect(-20, -45, 9, 1.2); c.fillRect(-20, -42, 9, 1.2);
  circ(c, 6, -38, 10, '#0c0c0f'); circ(c, 6, -38, 7, radl(c, 4, -40, 8, 0, '#6c8fc4', 0.5, '#1b2a4a', 1, '#06080e'));
  circ(c, 3.6, -40.4, 1.8, 'rgba(255,255,255,.75)');
  circ(c, -14, -52, 2.2, '#c23b2b'); c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(-22, -50, 44, 3);
}

/* ===== Stage 2: Great Wall ===== */
function bgWall(c) {
  const R = mulberry(202);
  c.fillStyle = lin(c, 0, 0, 0, 300, 0, '#6585bb', 0.45, '#b7b8c8', 0.75, '#efcda0', 1, '#f5b576'); c.fillRect(0, 0, W, 300);
  glow(c, 70, 178, 180, '255,214,150', 0.9);
  puffs(c, R, 12, 120, 360, 26, 120, 0.5);
  circ(c, 70, 178, 13, 'rgba(255,240,205,.9)');
  const f0 = wave(150, 0.021, 26, 0.6, 0.008, 18, 1.5, 0.06, 4, 0);
  ridge(c, f0, 330, lin(c, 0, 100, 0, 240, 0, 'rgba(150,150,185,.55)', 1, 'rgba(200,180,175,.5)'));
  const f1 = wave(190, 0.013, 16, 1, 0.041, 6, 2), f2 = wave(232, 0.017, 18, 4, 0.05, 4, 1), f3 = wave(276, 0.011, 16, 2.4, 0.037, 5, 0.4);
  ridge(c, f1, 330, lin(c, 0, 160, 0, 300, 0, 'rgba(120,132,168,.8)', 1, 'rgba(178,168,170,.7)'));
  // the Wall riding a ridge: a band with merlons, and watchtowers on the high points
  const wallOn = (f, th, x0, x1, light, dark, towers) => {
    c.beginPath(); c.moveTo(x0, f(x0) + 1); for (let x = x0; x <= x1; x += 2) c.lineTo(x, f(x) - th); for (let x = x1; x >= x0; x -= 2) c.lineTo(x, f(x) + 1); c.closePath();
    c.fillStyle = light; c.fill();
    c.fillStyle = dark; for (let x = x0; x <= x1; x += 2) c.fillRect(x, f(x) - th * 0.35, 2, th * 0.35 + 1);
    for (let x = x0; x < x1; x += th * 0.9) c.fillRect(x, f(x) - th * 1.45, th * 0.45, th * 0.5);
    towers.forEach(tx => { const ty = f(tx), tw = th * 2.4, tt = th * 3.4; c.fillStyle = light; c.fillRect(tx - tw / 2, ty - tt, tw, tt); c.fillStyle = dark; c.fillRect(tx + tw * 0.1, ty - tt, tw * 0.4, tt); c.fillRect(tx - tw * 0.2, ty - tt * 0.7, tw * 0.18, tt * 0.25); });
  };
  wallOn(f0, 2, 150, 300, 'rgba(225,200,185,.55)', 'rgba(120,110,130,.35)', [196, 262]);
  c.fillStyle = lin(c, 0, 158, 0, 204, 0, 'rgba(255,230,200,0)', 0.5, 'rgba(255,230,200,.4)', 1, 'rgba(255,230,200,0)'); c.fillRect(0, 158, W, 46);
  wallOn(f1, 3, 120, 360, 'rgba(214,190,170,.75)', 'rgba(120,110,120,.45)', [176, 300]);
  ridge(c, f2, 330, lin(c, 0, 200, 0, 320, 0, '#7f8c86', 1, '#a19c86'));
  wallOn(f2, 4.5, 0, 360, '#dbbf98', 'rgba(110,88,70,.55)', [62, 214, 330]);
  c.fillStyle = lin(c, 0, 226, 0, 276, 0, 'rgba(255,225,180,0)', 0.5, 'rgba(255,225,180,.42)', 1, 'rgba(255,225,180,0)'); c.fillRect(0, 226, W, 50);
  ridge(c, f3, 340, lin(c, 0, 250, 0, 330, 0, '#5f7a4c', 1, '#3c5432'));
  for (let i = 0; i < 260; i++) { const x = R() * W, y = f3(x) + 4 + R() * 40; c.fillStyle = R() < 0.5 ? 'rgba(30,50,20,.35)' : 'rgba(150,170,90,.25)'; c.beginPath(); c.arc(x, y, 1.5 + R() * 3, 0, Math.PI * 2); c.fill(); }
  // the walkway we stand on, and its back parapet
  c.fillStyle = lin(c, 0, 316, 0, 480, 0, '#c8aa82', 1, '#93775a'); c.fillRect(0, 316, W, 164);
  c.strokeStyle = 'rgba(80,55,35,.28)'; c.lineWidth = 1;
  for (let y = 322, s = 5; y < 480; y += s, s *= 1.18) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  for (let i = -14; i < 26; i++) { c.beginPath(); c.moveTo(300 + i * 9, 316); c.lineTo(300 + i * 34, 480); c.stroke(); }
  speck(c, R, 0, 316, W, 164, 1400, 0.1);
  c.fillStyle = 'rgba(255,215,160,.18)'; c.beginPath(); c.moveTo(0, 316); c.lineTo(140, 316); c.lineTo(0, 470); c.closePath(); c.fill();
  c.fillStyle = lin(c, 0, 288, 0, 318, 0, '#d9bb92', 1, '#a98a66'); c.fillRect(0, 290, W, 28);
  for (let x = 4; x < W; x += 26) { c.fillStyle = lin(c, x, 0, x + 16, 0, 0, '#e8cba1', 1, '#b39572'); c.fillRect(x, 276, 16, 15); c.fillStyle = 'rgba(70,45,25,.35)'; c.fillRect(x + 6, 281, 4, 6); }
  c.fillStyle = 'rgba(80,55,35,.25)'; for (let y = 294; y < 318; y += 5) c.fillRect(0, y, W, 0.9);
  c.fillStyle = 'rgba(60,40,25,.35)'; c.fillRect(0, 316, W, 3);
  speck(c, R, 0, 276, W, 42, 500, 0.12);
  // two tiny hikers far along the wall
  [[118, 228], [128, 229]].forEach(([x, y], i) => { c.fillStyle = i ? '#c0392b' : '#2e4a7a'; c.fillRect(x - 1, y - 6, 2.4, 5); circ(c, x + 0.2, y - 7.4, 1.3, '#3a2a1e'); });
}
function drawWallTower(c) {
  const bw = 52, top = -58, bot = 78;
  softShadow(c, true); c.fillStyle = '#c9a97f'; c.fillRect(-bw, top, bw * 2, bot - top); c.fillRect(-bw - 3, -76, bw * 2 + 6, 20); softShadow(c, false);
  c.fillStyle = lin(c, -bw, 0, bw, 0, 0, '#f1d5a6', 0.4, '#d6b38a', 1, '#8a6f52'); c.fillRect(-bw, top, bw * 2, bot - top);
  for (let y = top + 4, r = 0; y < bot - 20; y += 5, r++) {
    c.fillStyle = 'rgba(90,60,35,.18)'; c.fillRect(-bw, y, bw * 2, 0.9);
    for (let x = -bw + (r % 2) * 5; x < bw; x += 10) c.fillRect(x, y - 4, 0.8, 4);
  }
  c.fillStyle = lin(c, -bw, 0, bw, 0, 0, '#d8cdb8', 1, '#8f8676'); c.fillRect(-bw, bot - 20, bw * 2, 20);
  c.fillStyle = 'rgba(60,50,40,.3)'; for (let y = bot - 14; y < bot; y += 7) c.fillRect(-bw, y, bw * 2, 1); for (let x = -bw + 12; x < bw; x += 22) c.fillRect(x, bot - 20, 1, 20);
  c.fillStyle = lin(c, -bw, 0, bw, 0, 0, '#e9c99c', 1, '#87694c'); c.fillRect(-bw - 3, top - 5, bw * 2 + 6, 6);
  c.fillRect(-bw - 3, -72, bw * 2 + 6, 9);
  for (let i = 0; i < 6; i++) { const x = -bw - 3 + i * 20.4; c.fillRect(x, -78, 11, 7); }
  c.fillStyle = 'rgba(60,40,25,.45)'; for (let i = 0; i < 5; i++) c.fillRect(-bw + 12 + i * 20.4, -70, 3, 5);
  [-30, 0, 30].forEach(x => {
    arch(c, x, -42, 15, 26); c.fillStyle = lin(c, 0, -42, 0, -16, 0, '#24170f', 1, '#4a3221'); c.fill();
    c.fillStyle = 'rgba(255,230,190,.5)'; c.fillRect(x + 7.5, -34, 1.6, 18);
  });
  arch(c, 0, 26, 28, 52); c.fillStyle = lin(c, 0, 26, 0, 78, 0, '#20150d', 1, '#3d2a1b'); c.fill();
  c.strokeStyle = 'rgba(240,220,180,.55)'; c.lineWidth = 2; arch(c, 0, 25, 31, 53); c.stroke();
  c.fillStyle = 'rgba(255,220,160,.45)'; c.fillRect(-bw, top, 3, bot - top);
  c.fillStyle = lin(c, 0, bot - 30, 0, bot, 0, 'rgba(40,25,10,0)', 1, 'rgba(40,25,10,.25)'); c.fillRect(-bw, bot - 30, bw * 2, 30);
}
function drawWallSign(c) {
  postV(c, -52, 8, 35, 4, '#5a371f', '#2e1a0e'); postV(c, 52, 8, 35, 4, '#5a371f', '#2e1a0e');
  softShadow(c, true); rr(c, -75, -35, 150, 46, 5); c.fillStyle = '#6e3f22'; c.fill(); softShadow(c, false);
  rr(c, -75, -35, 150, 46, 5); c.fillStyle = lin(c, 0, -35, 0, 11, 0, '#8a5530', 1, '#5b331b'); c.fill();
  c.strokeStyle = 'rgba(255,244,228,.9)'; c.lineWidth = 1.5; rr(c, -70, -30, 140, 36, 3); c.stroke();
  txt(c, LOCAL('慕田峪长城'), 0, -17, '700 15px "Noto Sans TC", "Noto Sans SC", sans-serif', '#fff8ec');
  txt(c, 'MUTIANYU GREAT WALL', 0, -1, '700 8.5px "Noto Sans TC", Arial, sans-serif', '#fff1dc');
  gloss(c, 150, 46, 5, 0.18);
}
function drawGuideFlag(c) {
  c.fillStyle = lin(c, -29, 0, -23, 0, 0, '#e3e6ea', 0.5, '#8d939b', 1, '#575c64'); c.fillRect(-29, -55, 4, 62); c.fillRect(-29.8, 6, 5.6, 26); c.fillRect(-30.6, 31, 7.2, 26);
  circ(c, -27, -55, 3.4, '#e8c25a'); circ(c, -28, -56, 1.2, 'rgba(255,255,255,.8)');
  const path = () => { c.beginPath(); c.moveTo(-25, -52); c.quadraticCurveTo(5, -58, 35, -50); c.lineTo(35, -10); c.quadraticCurveTo(5, -18, -25, -10); c.closePath(); };
  softShadow(c, true); path(); c.fillStyle = '#f2c230'; c.fill(); softShadow(c, false);
  path(); c.fillStyle = lin(c, -25, 0, 35, 0, 0, '#ffd84a', 0.35, '#f1b81f', 0.7, '#ffd44a', 1, '#e0a516'); c.fill();
  c.save(); path(); c.clip(); c.fillStyle = '#d2342a'; c.fillRect(-25, -19, 60, 12); c.restore();
  txt(c, T('跟我走！', 'Follow me!'), 5, -33, `700 ${T(13, 11)}px "Noto Sans TC", sans-serif`, '#3b2a10');
  c.fillStyle = '#d2342a'; c.beginPath(); c.moveTo(-28, 36); c.quadraticCurveTo(-18, 42, -22, 54); c.lineTo(-25, 52); c.quadraticCurveTo(-22, 44, -28, 40); c.fill();
}
function drawMagpie(c) {
  poly(c, [-4, 2, -31, -7, -31, -2, -3, 8], lin(c, -31, 0, -4, 0, 0, '#2f6e66', 1, '#1b3550'));
  c.strokeStyle = '#2a2a2e'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(1, 12); c.lineTo(-1, 21); c.moveTo(7, 12); c.lineTo(8, 21); c.stroke();
  ell(c, 3, 4, 15, 10, '#17181d', -0.25);
  ell(c, 7, 8, 9, 5.5, '#f4f1ea', -0.25);
  ell(c, -2, 0, 11, 6, '#1d2c3d', -0.3); ell(c, -1, 2, 6.5, 2.8, '#eef0f2', -0.3);
  circ(c, 16, -7, 7.5, '#131419');
  poly(c, [22, -9.5, 30, -6.5, 22, -5], '#1e1e1e');
  circ(c, 18, -8.5, 1.7, '#fff'); circ(c, 18.4, -8.5, 1, '#000');
  ell(c, 13, -11, 4, 1.6, 'rgba(140,170,220,.35)', -0.4); ell(c, 2, -3, 8, 2, 'rgba(120,170,200,.25)', -0.3);
}

/* ===== Stage 3: Statue of Liberty ===== */
function bgLiberty(c) {
  const R = mulberry(303);
  c.fillStyle = lin(c, 0, 0, 0, 272, 0, '#3e5c99', 0.4, '#9a8db0', 0.75, '#efa778', 1, '#f8d098'); c.fillRect(0, 0, W, 272);
  glow(c, 60, 246, 210, '255,205,135', 0.9);
  puffs(c, R, 12, 80, 360, 30, 160, 0.45, '255,236,220');
  // Manhattan, far and hazy
  for (let x = 0; x < 178;) {
    const w = 6 + R() * 10, h = 8 + R() * 30 * (1 - x / 220);
    c.fillStyle = 'rgba(112,100,132,.62)'; c.fillRect(x, 270 - h, w, h);
    c.fillStyle = 'rgba(255,220,160,.45)'; for (let k = 0; k < h / 5; k++) if (R() < 0.4) c.fillRect(x + 1 + R() * (w - 3), 268 - h + k * 5, 1, 1);
    x += w + 0.5;
  }
  c.fillStyle = 'rgba(104,94,128,.7)'; poly(c, [58, 270, 58, 214, 62, 198, 66, 198, 70, 214, 70, 270], 'rgba(104,94,128,.7)'); c.fillRect(63.6, 176, 0.9, 22);
  // the harbour
  c.fillStyle = lin(c, 0, 268, 0, 480, 0, '#e2ad86', 0.25, '#8b90a8', 1, '#253a5c'); c.fillRect(0, 268, W, 212);
  for (let i = 0; i < 260; i++) { const y = 272 + Math.pow(R(), 1.6) * 200, x = 60 + (R() - 0.5) * (20 + (y - 268) * 0.9); c.fillStyle = `rgba(255,${200 + R() * 40 | 0},140,${0.25 + R() * 0.4})`; c.fillRect(x, y, 3 + R() * 10 * (y / 300), 1); }
  for (let i = 0; i < 300; i++) { const y = 272 + R() * 208; c.fillStyle = R() < 0.5 ? 'rgba(255,255,255,.12)' : 'rgba(10,25,50,.18)'; c.fillRect(R() * W, y, 4 + R() * 14 * (y / 300), 1); }
  // Liberty Island and Fort Wood under the statue
  c.fillStyle = '#4f6a3e'; c.beginPath(); c.moveTo(184, 272); c.quadraticCurveTo(200, 258, 230, 258); c.lineTo(310, 257); c.quadraticCurveTo(342, 260, 352, 272); c.closePath(); c.fill();
  for (let i = 0; i < 26; i++) { const x = 196 + R() * 150; circ(c, x, 260 + R() * 4, 3 + R() * 4, R() < 0.5 ? '#3e5a32' : '#6b8048'); }
  poly(c, [222, 264, 238, 252, 262, 248, 286, 252, 302, 264, 262, 268], '#cdb591');
  poly(c, [238, 252, 262, 248, 286, 252, 262, 256], '#e8d2a9');
  c.fillStyle = 'rgba(255,220,160,.35)'; c.fillRect(184, 270, 170, 2);
  // our ferry's railing and deck
  c.fillStyle = lin(c, 0, 440, 0, 480, 0, '#7b8a84', 1, '#52605b'); c.fillRect(0, 444, W, 36);
  c.strokeStyle = 'rgba(30,40,40,.25)'; c.lineWidth = 1; for (let x = -40; x < W; x += 22) { c.beginPath(); c.moveTo(x, 480); c.lineTo(x + 30, 444); c.stroke(); }
  c.fillStyle = '#e9e6dc'; for (let x = 10; x < W; x += 58) c.fillRect(x, 396, 5, 50);
  c.fillStyle = lin(c, 0, 394, 0, 402, 0, '#ffffff', 1, '#c7c3b8'); c.fillRect(0, 394, W, 7);
  c.fillStyle = '#d6d2c6'; c.fillRect(0, 418, W, 3); c.fillRect(0, 432, W, 3);
  c.fillStyle = 'rgba(20,30,40,.25)'; c.fillRect(0, 401, W, 2); c.fillRect(0, 444, W, 3);
}
function drawLiberty(c) {
  // granite pedestal
  softShadow(c, true); c.fillStyle = '#cbb495'; c.fillRect(-30, 58, 60, 42); c.fillRect(-23, 22, 46, 38); softShadow(c, false);
  const stone = (x0, x1) => lin(c, x0, 0, x1, 0, 0, '#f0dbb8', 0.45, '#cdb593', 1, '#86705a');
  c.fillStyle = stone(-30, 30); c.fillRect(-30, 58, 60, 42);
  c.fillStyle = stone(-23, 23); c.fillRect(-23, 26, 46, 34);
  c.fillStyle = stone(-26, 26); c.fillRect(-26, 20, 52, 7); c.fillRect(-27, 55, 54, 4);
  c.fillStyle = 'rgba(70,55,40,.4)'; for (let i = 0; i < 4; i++) c.fillRect(-17 + i * 10, 34, 4, 13);
  c.fillStyle = 'rgba(70,55,40,.22)'; for (let y = 66; y < 100; y += 8) c.fillRect(-30, y, 60, 1);
  // copper-green figure
  const cu = lin(c, -16, 0, 16, 0, 0, '#c4e3cf', 0.35, '#88bfa6', 1, '#3f7563');
  c.fillStyle = cu;
  c.beginPath(); c.moveTo(-14, 20); c.quadraticCurveTo(-13, -10, -9, -38); c.lineTo(9, -38); c.quadraticCurveTo(13, -8, 15, 20); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,70,58,.45)'; c.lineWidth = 0.9;
  [[-8, -30, -10, 18], [-2, -32, -3, 19], [4, -30, 6, 19], [10, -26, 11, 18]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.quadraticCurveTo((a + d) / 2 + 2, (b + e) / 2, d, e); c.stroke(); });
  // raised right arm and torch
  c.fillStyle = cu; c.beginPath(); c.moveTo(-9, -38); c.lineTo(-15, -84); c.lineTo(-9, -85); c.lineTo(-3, -40); c.closePath(); c.fill();
  c.fillStyle = '#5f9a84'; c.fillRect(-15, -90, 7, 6);
  c.fillStyle = radl(c, -11.5, -94, 7, 0, '#fff6c8', 0.5, '#ffc94a', 1, '#e08a1c'); c.beginPath(); c.moveTo(-15.5, -90); c.quadraticCurveTo(-16, -96, -11.5, -100); c.quadraticCurveTo(-7, -96, -7.5, -90); c.closePath(); c.fill();
  glow(c, -11.5, -94, 10, '255,220,120', 0.5);
  // tablet in the left arm
  c.save(); c.translate(11, -24); c.rotate(-0.25); c.fillStyle = lin(c, -4, 0, 4, 0, 0, '#a9d6c0', 1, '#4c8471'); c.fillRect(-4, -8, 8, 16); c.restore();
  // head and crown
  c.fillStyle = '#8ec2aa'; c.beginPath(); c.arc(0, -45, 6, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(40,85,70,.5)'; c.beginPath(); c.arc(1.5, -44, 5, -0.6, 1.8); c.fill();
  c.strokeStyle = '#9ccbb4'; c.lineWidth = 1.6; c.lineCap = 'round';
  for (let i = 0; i < 7; i++) { const a = Math.PI * (1.12 + i * 0.127); c.beginPath(); c.moveTo(Math.cos(a) * 6, -48 + Math.sin(a) * 4); c.lineTo(Math.cos(a) * 13, -48 + Math.sin(a) * 10); c.stroke(); }
  c.fillStyle = 'rgba(255,200,130,.45)'; c.fillRect(-14, -36, 2, 54);
}
function drawLifeRing(c) {
  softShadow(c, true); c.beginPath(); c.arc(0, 0, 33, 0, Math.PI * 2); c.arc(0, 0, 15, 0, Math.PI * 2, true); c.fillStyle = '#eee'; c.fill(); softShadow(c, false);
  for (let i = 0; i < 8; i++) {
    const a0 = -Math.PI / 2 - Math.PI / 8 + i * Math.PI / 4;
    c.beginPath(); c.arc(0, 0, 33, a0, a0 + Math.PI / 4); c.arc(0, 0, 15, a0 + Math.PI / 4, a0, true); c.closePath();
    c.fillStyle = i % 2 ? '#f4f1ea' : '#d8392b'; c.fill();
  }
  c.beginPath(); c.arc(0, 0, 33, 0, Math.PI * 2); c.arc(0, 0, 15, 0, Math.PI * 2, true);
  c.fillStyle = radl(c, -10, -12, 50, 0, 'rgba(255,255,255,.35)', 0.5, 'rgba(255,255,255,0)', 1, 'rgba(0,0,0,.25)'); c.fill();
  c.strokeStyle = '#e8dcc0'; c.lineWidth = 1.6;
  for (let i = 0; i < 4; i++) { const a = Math.PI / 4 + i * Math.PI / 2; c.beginPath(); c.arc(0, 0, 33.5, a - 0.32, a + 0.32); c.stroke(); }
  c.font = '700 6.6px "Noto Sans TC", Arial, sans-serif'; c.fillStyle = '#1d2a3a'; c.textAlign = 'center'; c.textBaseline = 'middle';
  [...'NEW YORK'].forEach((ch, i) => { c.save(); c.rotate((i - 3.5) * 0.13); c.fillText(ch, 0, -24); c.restore(); });
  [...'HARBOR'].forEach((ch, i) => { c.save(); c.rotate(-(i - 2.5) * 0.15); c.fillText(ch, 0, 24); c.restore(); });
}
function drawFerrySign(c) {
  c.fillStyle = '#5c6670'; c.fillRect(-50, 10, 4, 10); c.fillRect(46, 10, 4, 10);
  softShadow(c, true); rr(c, -70, -20, 140, 32, 4); c.fillStyle = '#1d3557'; c.fill(); softShadow(c, false);
  rr(c, -70, -20, 140, 32, 4); c.fillStyle = lin(c, 0, -20, 0, 12, 0, '#284a76', 1, '#162a47'); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.2; rr(c, -66, -16, 132, 24, 2.5); c.stroke();
  txt(c, 'LIBERTY ISLAND', -8, -4, '700 12px "Playfair Display", Georgia, serif', '#ffffff');
  c.fillStyle = '#f2c14e'; c.beginPath(); c.moveTo(48, -9); c.lineTo(58, -4); c.lineTo(48, 1); c.closePath(); c.fill(); c.fillRect(40, -5.5, 9, 3);
  bolt(c, -62, -12, 1.4); bolt(c, 62, -12, 1.4); bolt(c, -62, 4, 1.4); bolt(c, 62, 4, 1.4);
  gloss(c, 140, 32, 4, 0.22);
}
function drawGull(c) {
  const wing = s => { c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(s * 10, -14, s * 33, -6); c.quadraticCurveTo(s * 16, -4, s * 4, 6); c.closePath(); };
  wing(-1); c.fillStyle = lin(c, -33, 0, 0, 0, 0, '#2a2a2a', 0.22, '#9aa3ad', 1, '#d9dde2'); c.fill();
  wing(1); c.fillStyle = lin(c, 0, 0, 33, 0, 0, '#d9dde2', 0.78, '#9aa3ad', 1, '#2a2a2a'); c.fill();
  ell(c, 0, 3, 11, 5, '#f7f5f0'); circ(c, 9, 0, 4.5, '#fbfaf6');
  poly(c, [12.5, -0.5, 18, 1, 12.5, 2.2], '#f2b632'); circ(c, 10, -1, 0.9, '#222');
  poly(c, [-10, 2, -17, 0, -17, 6, -10, 5], '#e9e7e1');
  c.fillStyle = 'rgba(255,190,120,.35)'; ell(c, -2, 4, 9, 3, 'rgba(255,190,120,.3)');
}
function drawPigeon(c) {
  poly(c, [-10, 0, -24, 4, -23, 9, -8, 7], '#5e6470');
  ell(c, -2, 4, 14, 10, lin(c, 0, -6, 0, 14, 0, '#aab2bf', 1, '#7b8391'));
  ell(c, -5, 3, 10, 6, '#8d95a3', -0.2); c.fillStyle = '#4b505a'; c.fillRect(-11, 3, 8, 1.4); c.fillRect(-10, 6, 7, 1.4);
  ell(c, 8, -4, 6.5, 8, lin(c, 0, -10, 0, 4, 0, '#5d8a7c', 0.5, '#8a6aa0', 1, '#9aa2b0'));
  circ(c, 10, -11, 6, '#9aa2b0');
  poly(c, [15, -11.5, 20, -10, 15, -9], '#3a3a3a'); circ(c, 15, -12, 1.4, '#e8e4dc');
  circ(c, 12, -12.5, 1.6, '#e37a2a'); circ(c, 12.2, -12.5, 0.8, '#111');
  c.strokeStyle = '#d0737a'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-2, 13); c.lineTo(-3, 20); c.moveTo(3, 13); c.lineTo(4, 20); c.stroke();
}

/* ===== Stage 4: Big Ben ===== */
function bgLondon(c) {
  const R = mulberry(404);
  c.fillStyle = lin(c, 0, 0, 0, 320, 0, '#6e86b0', 0.45, '#d6a789', 0.8, '#f4be80', 1, '#f8d79c'); c.fillRect(0, 0, W, 320);
  glow(c, 330, 250, 200, '255,210,140', 0.85);
  puffs(c, R, 10, 0, 360, 30, 170, 0.45, '255,232,214');
  // Palace of Westminster, warm and hazy
  const pal = 'rgba(176,128,92,.82)';
  c.fillStyle = pal; c.fillRect(110, 262, 250, 46);
  for (let x = 112; x < 360; x += 9) { c.fillRect(x, 252 + (x % 27 === 4 ? -10 : 0), 2.5, 12 + (x % 27 === 4 ? 10 : 0)); }
  c.fillRect(326, 196, 26, 70); for (let x = 326; x < 352; x += 6) c.fillRect(x, 188, 2.5, 10);
  c.fillStyle = 'rgba(255,214,150,.35)'; for (let y = 270; y < 304; y += 9) for (let x = 116; x < 356; x += 8) c.fillRect(x, y, 2.5, 5);
  // Elizabeth Tower
  const tx = 262;
  c.fillStyle = lin(c, tx - 17, 0, tx + 17, 0, 0, '#e8b47e', 0.5, '#c58d5e', 1, '#8f6040'); c.fillRect(tx - 17, 120, 34, 190);
  c.fillStyle = 'rgba(100,60,35,.35)'; for (let y = 130; y < 300; y += 12) c.fillRect(tx - 17, y, 34, 1.2); for (let x = tx - 12; x < tx + 17; x += 8) c.fillRect(x, 136, 1.4, 160);
  c.fillStyle = lin(c, tx - 20, 0, tx + 20, 0, 0, '#efbd85', 1, '#93633f'); c.fillRect(tx - 20, 84, 40, 40);
  c.fillStyle = radl(c, tx, 104, 15, 0, '#fff7da', 0.7, '#f3dca2', 1, '#b78a52'); c.beginPath(); c.arc(tx, 104, 14, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#2c2218'; c.lineWidth = 1.4; c.beginPath(); c.arc(tx, 104, 14, 0, Math.PI * 2); c.stroke();
  c.lineWidth = 0.6; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; c.beginPath(); c.moveTo(tx + Math.cos(a) * 11, 104 + Math.sin(a) * 11); c.lineTo(tx + Math.cos(a) * 13, 104 + Math.sin(a) * 13); c.stroke(); }
  c.lineWidth = 1.4; c.beginPath(); c.moveTo(tx, 104); c.lineTo(tx + 6, 104); c.moveTo(tx, 104); c.lineTo(tx, 94); c.stroke();
  c.fillStyle = '#9a6a45'; c.fillRect(tx - 22, 80, 44, 5);
  c.fillStyle = lin(c, tx - 15, 0, tx + 15, 0, 0, '#e7b37d', 1, '#8a5c3c'); c.fillRect(tx - 15, 58, 30, 22);
  c.fillStyle = 'rgba(60,35,20,.45)'; for (let i = 0; i < 4; i++) arch(c, tx - 10 + i * 6.6, 62, 4, 14), c.fill();
  c.fillStyle = lin(c, tx - 16, 0, tx + 16, 0, 0, '#c9a37a', 1, '#6e4c33'); c.beginPath(); c.moveTo(tx - 17, 58); c.lineTo(tx, 18); c.lineTo(tx + 17, 58); c.closePath(); c.fill();
  c.fillRect(tx - 1, 6, 2, 14);
  [[tx - 17, 58], [tx + 17, 58]].forEach(([x, y]) => poly(c, [x - 3, y, x, y - 14, x + 3, y], '#a07850'));
  c.fillStyle = 'rgba(255,220,160,.45)'; c.fillRect(tx - 17, 84, 2, 220);
  // the Thames and Westminster Bridge
  c.fillStyle = lin(c, 0, 306, 0, 360, 0, '#d79f74', 1, '#5f6f86'); c.fillRect(0, 306, W, 54);
  for (let i = 0; i < 140; i++) { const y = 308 + R() * 50; c.fillStyle = R() < 0.5 ? 'rgba(255,225,170,.35)' : 'rgba(30,40,60,.2)'; c.fillRect(R() * W, y, 4 + R() * 12, 1); }
  c.fillStyle = '#4b6b52'; c.fillRect(0, 330, W, 7);
  c.fillStyle = 'rgba(30,50,35,.6)'; for (let x = 2; x < W; x += 6) c.fillRect(x, 337, 2, 9); c.fillRect(0, 344, W, 3);
  c.fillStyle = '#c9b18e'; c.fillRect(0, 347, W, 6);
  // pavement and road
  c.fillStyle = lin(c, 0, 353, 0, 430, 0, '#b9ada0', 1, '#8e8478'); c.fillRect(0, 353, W, 77);
  c.strokeStyle = 'rgba(60,50,40,.22)'; c.lineWidth = 1; for (let y = 362, s = 8; y < 428; y += s, s *= 1.15) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  for (let x = -60; x < W + 60; x += 26) { c.beginPath(); c.moveTo(x, 353); c.lineTo(x - 18, 428); c.stroke(); }
  c.fillStyle = '#d8d0c4'; c.fillRect(0, 426, W, 5); c.fillStyle = 'rgba(40,30,20,.35)'; c.fillRect(0, 431, W, 2);
  c.fillStyle = lin(c, 0, 433, 0, 480, 0, '#4d4a48', 1, '#2f2d2c'); c.fillRect(0, 433, W, 47);
  c.fillStyle = 'rgba(255,240,200,.75)'; for (let x = 0; x < W; x += 34) c.fillRect(x, 470, 18, 2.5);
  c.fillStyle = '#f2c94c'; c.fillRect(0, 436, W, 1.6); c.fillRect(0, 439, W, 1.6);
  speck(c, R, 0, 353, W, 127, 900, 0.08);
  // the lamp post that carries the baskets and the street sign
  c.fillStyle = lin(c, 145, 0, 155, 0, 0, '#3c4044', 0.4, '#202326', 1, '#0e0f10'); c.fillRect(146.5, 120, 7, 300);
  c.fillRect(143, 410, 14, 16); c.fillRect(144, 250, 12, 6);
  c.strokeStyle = '#17191b'; c.lineWidth = 2.6; c.beginPath(); c.moveTo(150, 138); c.quadraticCurveTo(132, 128, 112, 140); c.moveTo(150, 138); c.quadraticCurveTo(168, 128, 188, 140); c.stroke();
  c.lineWidth = 1.4; c.beginPath(); c.moveTo(120, 146); c.quadraticCurveTo(140, 134, 150, 150); c.quadraticCurveTo(160, 134, 180, 146); c.stroke();
  poly(c, [140, 120, 160, 120, 156, 98, 144, 98], '#1b1d20'); c.fillStyle = radl(c, 150, 108, 10, 0, 'rgba(255,236,180,.95)', 1, 'rgba(255,200,120,.2)'); c.fillRect(144, 101, 12, 16);
  poly(c, [141, 98, 159, 98, 150, 88], '#1b1d20');
  c.fillStyle = 'rgba(255,220,160,.35)'; c.fillRect(146.5, 120, 1.5, 300);
}
function drawPhoneBox(c) {
  softShadow(c, true); c.fillStyle = '#b8191b'; c.fillRect(-29, -66, 58, 146); softShadow(c, false);
  const red = lin(c, -31, 0, 31, 0, 0, '#e8423a', 0.4, '#c81d1f', 1, '#7e0d10');
  c.fillStyle = red; c.fillRect(-31, 70, 62, 10); c.fillRect(-28, -66, 56, 138);
  c.beginPath(); c.moveTo(-31, -66); c.quadraticCurveTo(0, -86, 31, -66); c.closePath(); c.fill(); c.fillRect(-31, -68, 62, 5);
  rr(c, -22, -62, 44, 9, 1.5); c.fillStyle = '#f7f1e3'; c.fill();
  txt(c, 'TELEPHONE', 0, -57.3, '700 6.6px "Noto Sans TC", Arial, sans-serif', '#1d1d1d');
  for (let r = 0; r < 8; r++) for (let k = 0; k < 3; k++) {
    const x = -20 + k * 13.6, y = -47 + r * 11.5;
    c.fillStyle = lin(c, x, y, x + 12, y + 10, 0, '#f7d7a0', 0.4, '#6d6a72', 1, '#2b2c38'); c.fillRect(x, y, 12.2, 10);
  }
  c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.moveTo(-20, -47); c.lineTo(-6, -47); c.lineTo(-20, 0); c.closePath(); c.fill();
  c.fillStyle = '#2b1a14'; c.fillRect(19, 0, 4, 10);
  c.fillStyle = 'rgba(255,210,160,.35)'; c.fillRect(-28, -66, 2, 136);
}
function drawBus(c) {
  softShadow(c, true); rr(c, -92, -48, 184, 88, 9); c.fillStyle = '#c3191e'; c.fill(); softShadow(c, false);
  rr(c, -92, -48, 184, 88, 9); c.fillStyle = lin(c, 0, -48, 0, 40, 0, '#e8443b', 0.5, '#cc1d22', 1, '#8a1014'); c.fill();
  const glass = (x, y, w, h) => { c.fillStyle = lin(c, x, y, x + w, y + h, 0, '#ffe0a8', 0.35, '#5d6274', 1, '#20232e'); rr(c, x, y, w, h, 2.5); c.fill(); };
  for (let i = 0; i < 6; i++) glass(-84 + i * 26, -40, 22, 20);
  for (let i = 0; i < 5; i++) glass(-84 + i * 26, -6, 22, 20);
  glass(52, -6, 32, 30); glass(76, -40, 12, 20);
  rr(c, 52, -46, 34, 7, 1.5); c.fillStyle = '#121212'; c.fill();
  txt(c, 'Westminster', 69, -42.3, '700 5.4px "Noto Sans TC", Arial, sans-serif', '#ffcf3a');
  c.fillStyle = '#f3efe4'; c.fillRect(-92, -14, 184, 3);
  c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-92, 27, 184, 3);
  [-56, 58].forEach(x => { circ(c, x, 39, 11, '#1a1a1a'); circ(c, x, 39, 5.5, '#8a8d91'); circ(c, x, 39, 2, '#444'); });
  circ(c, 88, 22, 2.6, '#fff1c4');
  c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(-90, -46, 180, 2);
}
function drawBasket(c, hue) {
  c.strokeStyle = '#2b2b2b'; c.lineWidth = 1; c.beginPath(); c.moveTo(0, -31); c.lineTo(-18, -3); c.moveTo(0, -31); c.lineTo(18, -3); c.moveTo(0, -31); c.lineTo(0, -3); c.stroke();
  circ(c, 0, -31, 1.8, '#2b2b2b');
  softShadow(c, true); c.beginPath(); c.arc(0, -2, 22, 0, Math.PI); c.closePath(); c.fillStyle = '#3d2d1f'; c.fill(); softShadow(c, false);
  c.beginPath(); c.arc(0, -2, 22, 0, Math.PI); c.closePath(); c.fillStyle = lin(c, -22, 0, 22, 0, 0, '#5b4532', 1, '#2a1e14'); c.fill();
  c.strokeStyle = 'rgba(150,120,80,.5)'; c.lineWidth = 0.7; for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(0, -2, 6 + i * 4.5, 0.15, Math.PI - 0.15); c.stroke(); }
  const flowers = hue === 'L' ? ['#e23d4a', '#ff7a8a', '#f2f2f2'] : ['#8e4fc6', '#d06ad0', '#ffd54a'];
  for (let i = 0; i < 16; i++) {
    const a = Math.PI + (i + 0.5) * Math.PI / 16, r = 18 + (i % 3) * 3;
    circ(c, Math.cos(a) * r * 1.05, -2 + Math.sin(a) * r * 0.45, 4.2, i % 2 ? '#3f7a34' : '#5b9a43');
  }
  for (let i = 0; i < 13; i++) { const x = -22 + i * 3.7, y = -8 - Math.sin(i * 1.3) * 3 - (i % 2) * 3; circ(c, x, y, 2.6, flowers[i % 3]); circ(c, x - 0.6, y - 0.6, 0.9, 'rgba(255,255,255,.6)'); }
  c.strokeStyle = '#4c8a3a'; c.lineWidth = 1.4;
  [[-20, 2, -24, 26], [-8, 8, -10, 30], [10, 8, 12, 28], [20, 2, 24, 22]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.quadraticCurveTo(a - 4, (b + e) / 2, d, e); c.stroke(); circ(c, d, e, 2.2, flowers[0]); });
}
function drawStreetSign(c) {
  c.fillStyle = '#1a1c1e'; c.fillRect(-4, -20, 8, 40);
  softShadow(c, true); c.fillStyle = '#f7f5ee'; c.fillRect(-63, -18, 126, 34); softShadow(c, false);
  c.fillStyle = lin(c, -63, -18, 63, 16, 0, '#ffffff', 1, '#e1ded4'); c.fillRect(-63, -18, 126, 34);
  c.strokeStyle = '#111'; c.lineWidth = 1.8; c.strokeRect(-59.5, -14.5, 119, 27);
  txt(c, 'BRIDGE STREET', -9, -3, '700 11.5px "Noto Sans TC", Arial, sans-serif', '#111');
  txt(c, 'SW1', 44, -3, '700 10px "Noto Sans TC", Arial, sans-serif', '#c8102e');
  txt(c, 'CITY OF WESTMINSTER', 0, 8.2, '700 5px "Noto Sans TC", Arial, sans-serif', '#c8102e');
  gloss(c, 126, 34, 1, 0.18);
}

/* ===== Stage 5: Sydney Opera House ===== */
function bgSydney(c) {
  const R = mulberry(505);
  c.fillStyle = lin(c, 0, 0, 0, 250, 0, '#545a9a', 0.4, '#c58aa2', 0.75, '#f4a673', 1, '#fbd08e'); c.fillRect(0, 0, W, 250);
  glow(c, 40, 226, 230, '255,200,130', 0.95); circ(c, 40, 226, 12, 'rgba(255,238,200,.9)');
  puffs(c, R, 12, 60, 360, 30, 170, 0.42, '255,214,214');
  // Harbour Bridge, far and hazy
  const steel = 'rgba(78,80,112,.72)';
  c.strokeStyle = steel; c.lineWidth = 2.4;
  const top = x => 236 - 66 * (1 - Math.pow((x - 95) / 73, 2)), bot = x => 240 - 52 * (1 - Math.pow((x - 95) / 73, 2));
  c.beginPath(); for (let x = 22; x <= 168; x += 2) c.lineTo(x, top(x)); c.stroke();
  c.lineWidth = 1.6; c.beginPath(); for (let x = 22; x <= 168; x += 2) c.lineTo(x, bot(x)); c.stroke();
  c.lineWidth = 0.9; for (let x = 26; x < 166; x += 6) { c.beginPath(); c.moveTo(x, top(x)); c.lineTo(x + 3, bot(x + 3)); c.lineTo(x + 6, top(x + 6)); c.stroke(); }
  for (let x = 30; x < 162; x += 8) { c.beginPath(); c.moveTo(x, bot(x)); c.lineTo(x, 236); c.stroke(); }
  c.fillStyle = steel; c.fillRect(-14, 234, 214, 5);
  c.fillStyle = 'rgba(200,160,138,.85)'; c.fillRect(4, 204, 18, 46); c.fillRect(168, 204, 18, 46);
  c.fillStyle = 'rgba(255,220,180,.4)'; c.fillRect(4, 204, 4, 46); c.fillRect(168, 204, 4, 46);
  // harbour water
  c.fillStyle = lin(c, 0, 246, 0, 352, 0, '#efb68e', 0.45, '#7d84a8', 1, '#3a4d74'); c.fillRect(0, 246, W, 106);
  for (let i = 0; i < 260; i++) { const y = 248 + R() * 102; c.fillStyle = R() < 0.55 ? `rgba(255,${210 + R() * 30 | 0},170,.35)` : 'rgba(25,35,70,.22)'; c.fillRect(R() * W, y, 4 + R() * 12 * (y / 260), 1); }
  // the Opera House on Bennelong Point
  poly(c, [184, 300, 360, 294, 360, 310, 180, 310], '#c99f80');
  c.fillStyle = 'rgba(90,60,45,.3)'; for (let y = 302; y < 310; y += 2.5) c.fillRect(182, y, 178, 0.8);
  const shell = (x, base, w, h, dir) => {
    c.beginPath(); c.moveTo(x, base); c.quadraticCurveTo(x + dir * w * 0.15, base - h * 0.9, x + dir * w * 0.82, base - h); c.quadraticCurveTo(x + dir * w * 0.72, base - h * 0.45, x + dir * w, base); c.closePath();
    c.fillStyle = lin(c, x, base - h, x + dir * w, base, 0, '#fff6ea', 0.55, '#f1d7c4', 1, '#c9a294'); c.fill();
    c.strokeStyle = 'rgba(170,120,110,.35)'; c.lineWidth = 0.6;
    for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(x + dir * w * k * 0.18, base); c.quadraticCurveTo(x + dir * w * (0.1 + k * 0.12), base - h * 0.7, x + dir * w * 0.82, base - h); c.stroke(); }
    c.fillStyle = 'rgba(90,55,40,.75)'; c.beginPath(); c.moveTo(x + dir * w * 0.25, base); c.quadraticCurveTo(x + dir * w * 0.55, base - h * 0.35, x + dir * w * 0.72, base); c.closePath(); c.fill();
  };
  [[246, 296, 22, 30, -1], [322, 294, 22, 28, -1], [196, 296, 26, 26, 1], [214, 296, 30, 38, 1], [236, 296, 32, 52, 1], [262, 295, 36, 70, 1], [286, 295, 38, 62, 1], [312, 294, 34, 46, 1], [334, 294, 28, 30, 1], [358, 294, 22, 22, -1]].forEach(s => shell(...s));
  c.fillStyle = 'rgba(255,190,150,.3)'; c.fillRect(184, 292, 176, 3);
  // promenade railing, kiosk and café
  c.fillStyle = '#3d4148'; c.fillRect(0, 343, W, 4); c.fillRect(0, 356, W, 2);
  for (let x = 6; x < W; x += 9) c.fillRect(x, 347, 1.6, 10);
  c.fillStyle = lin(c, 0, 358, 0, 480, 0, '#d9b994', 1, '#a9876a'); c.fillRect(0, 358, W, 122);
  c.strokeStyle = 'rgba(90,60,40,.25)'; c.lineWidth = 1;
  for (let y = 364, s = 6; y < 480; y += s, s *= 1.16) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  for (let i = -8; i < 20; i++) { c.beginPath(); c.moveTo(180 + i * 14, 358); c.lineTo(180 + i * 36, 480); c.stroke(); }
  speck(c, R, 0, 358, W, 122, 900, 0.09);
  // kiosk wall the surfboard leans on
  c.fillStyle = lin(c, 0, 0, 44, 0, 0, '#2c6f73', 1, '#3f8f8f'); c.fillRect(0, 300, 44, 180);
  c.fillStyle = 'rgba(0,0,0,.18)'; for (let y = 306; y < 480; y += 8) c.fillRect(0, y, 44, 1.5);
  c.fillStyle = 'rgba(20,30,30,.35)'; c.fillRect(44, 300, 3, 180);
  for (let i = 0; i < 6; i++) { c.fillStyle = i % 2 ? '#f7efe0' : '#e8504a'; c.beginPath(); c.moveTo(i * 9, 286); c.lineTo(i * 9 + 9, 286); c.lineTo(i * 9 + 11, 304); c.lineTo(i * 9 + 2, 304); c.closePath(); c.fill(); }
  c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(0, 304, 50, 2);
  [150, 258].forEach(x => {
    c.fillStyle = 'rgba(60,40,25,.22)'; c.beginPath(); c.ellipse(x + 6, 448, 30, 5, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#5a5f66'; c.fillRect(x - 1.5, 420, 3, 26); c.fillRect(x - 9, 444, 18, 2.5);
    ell(c, x, 420, 21, 4.5, '#eeeae2'); ell(c, x, 419, 21, 3.4, '#ffffff');
    [-26, 26].forEach(d => { c.fillStyle = '#7a5a3c'; c.fillRect(x + d - 6, 426, 12, 3); c.fillRect(x + d - 6, 429, 2, 16); c.fillRect(x + d + 4, 429, 2, 16); c.fillRect(x + d + (d < 0 ? -6 : 4), 412, 2, 16); });
  });
  c.fillStyle = lin(c, 306, 0, 334, 0, 0, '#9c9ea3', 0.4, '#6c6f75', 1, '#3e4045'); rr(c, 306, 470, 28, 14, 4); c.fill();
}
function drawFerry(c) {
  c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, -40, 22, 22, 3, 'rgba(255,255,255,.5)'); ell(c, 34, 23, 26, 3, 'rgba(255,255,255,.45)');
  softShadow(c, true); poly(c, [-62, 6, 62, 6, 55, 21, -55, 21], '#1f5b3a'); softShadow(c, false);
  poly(c, [-62, 6, 62, 6, 55, 21, -55, 21], lin(c, 0, 6, 0, 21, 0, '#2f7a50', 1, '#163f28'));
  c.fillStyle = '#b8352c'; c.fillRect(-56, 17, 112, 2);
  c.fillStyle = lin(c, 0, -12, 0, 6, 0, '#fbf3df', 1, '#d8ccb0'); c.fillRect(-52, -11, 104, 17);
  c.fillStyle = lin(c, 0, -21, 0, -11, 0, '#fbf3df', 1, '#d8ccb0'); c.fillRect(-38, -21, 76, 10);
  c.fillStyle = '#1f5b3a'; c.fillRect(-54, -12, 108, 2); c.fillRect(-40, -22, 80, 2); c.fillRect(-54, 4, 108, 2);
  c.fillStyle = lin(c, 0, -8, 0, 0, 0, '#ffd9a0', 1, '#4b5a6a');
  for (let x = -48; x < 46; x += 9) c.fillRect(x, -8, 6.5, 8);
  for (let x = -34; x < 32; x += 9) c.fillRect(x, -19, 6.5, 6);
  c.fillStyle = '#fbf3df'; c.fillRect(-12, -27, 24, 6); c.fillStyle = '#4b5a6a'; c.fillRect(-9, -26, 18, 3);
  c.fillStyle = 'rgba(255,200,150,.35)'; c.fillRect(-52, -11, 104, 2);
}
function drawKooka(c) {
  poly(c, [-8, 14, -14, 28, -8, 28, -2, 16], lin(c, 0, 14, 0, 28, 0, '#9c5a2c', 1, '#6a3a1c'));
  c.fillStyle = '#3b2a1e'; c.fillRect(-3, 22, 2, 6); c.fillRect(3, 22, 2, 6);
  ell(c, 0, 8, 13, 16, lin(c, 0, -8, 0, 24, 0, '#f2e7d2', 1, '#d8c6a6'));
  ell(c, -6, 6, 9, 15, lin(c, -14, 0, 2, 0, 0, '#5b4330', 1, '#7d5c40'), 0.15);
  [[-8, 4], [-5, 9], [-9, 12]].forEach(([x, y]) => circ(c, x, y, 1.6, '#5aa5d8'));
  circ(c, 4, -12, 12, lin(c, 0, -24, 0, 0, 0, '#f6efe1', 1, '#e2d4bb'));
  ell(c, 3, -12, 10, 2.6, '#5a3d28');
  c.fillStyle = '#3f2f22'; c.beginPath(); c.moveTo(-6, -22); c.quadraticCurveTo(4, -26, 12, -21); c.lineTo(4, -18); c.closePath(); c.fill();
  poly(c, [12, -15, 29, -11, 12, -9], '#2b2b2b'); poly(c, [12, -10, 27, -10.5, 12, -6.5], '#e8dcc0');
  circ(c, 8, -13, 2, '#1a120c'); circ(c, 8.6, -13.6, 0.7, '#fff');
}
function drawParasol(c, a, b) {
  c.fillStyle = lin(c, -2, 0, 2, 0, 0, '#e9dcc2', 1, '#a8916c'); c.fillRect(-1.6, -28, 3.2, 60);
  const canopy = () => { c.beginPath(); c.moveTo(-46, -6); c.quadraticCurveTo(-30, -30, 0, -31); c.quadraticCurveTo(30, -30, 46, -6); for (let i = 0; i < 8; i++) { const x = 46 - i * 11.5; c.quadraticCurveTo(x - 5.75, 0, x - 11.5, -6); } c.closePath(); };
  softShadow(c, true); canopy(); c.fillStyle = a; c.fill(); softShadow(c, false);
  c.save(); canopy(); c.clip();
  for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? b : a; c.beginPath(); c.moveTo(0, -31); c.lineTo(-46 + i * 11.5, 0); c.lineTo(-46 + (i + 1) * 11.5, 0); c.closePath(); c.fill(); }
  c.fillStyle = lin(c, -46, 0, 46, 0, 0, 'rgba(255,240,210,.35)', 0.5, 'rgba(255,255,255,0)', 1, 'rgba(40,20,10,.3)'); c.fillRect(-46, -32, 92, 32);
  c.restore();
  circ(c, 0, -31, 2.4, '#d9c9a6');
}
function drawQuaySign(c) {
  postV(c, 0, 10, 18, 3, '#777b82', '#3e4146');
  softShadow(c, true); rr(c, -75, -18, 150, 30, 4); c.fillStyle = '#26292e'; c.fill(); softShadow(c, false);
  rr(c, -75, -18, 150, 30, 4); c.fillStyle = lin(c, 0, -18, 0, 12, 0, '#3a3f46', 1, '#1d2024'); c.fill();
  circ(c, -58, -3, 9, '#2e9b4f'); txt(c, 'F', -58, -2.5, '700 11px "Noto Sans TC", Arial, sans-serif', '#fff');
  txt(c, 'Circular Quay', 4, -3, '700 13px "Noto Sans TC", Arial, sans-serif', '#ffffff');
  c.fillStyle = '#f2c14e'; c.beginPath(); c.moveTo(56, -9); c.lineTo(66, -3); c.lineTo(56, 3); c.closePath(); c.fill();
  gloss(c, 150, 30, 4, 0.2);
}
function drawSurfboard(c) {
  const path = () => { c.beginPath(); c.moveTo(0, -75); c.bezierCurveTo(11, -55, 14, -20, 13, 20); c.bezierCurveTo(12, 55, 8, 74, 0, 75); c.bezierCurveTo(-8, 74, -12, 55, -13, 20); c.bezierCurveTo(-14, -20, -11, -55, 0, -75); c.closePath(); };
  softShadow(c, true); path(); c.fillStyle = '#f6e7c4'; c.fill(); softShadow(c, false);
  path(); c.fillStyle = lin(c, -14, 0, 14, 0, 0, '#fff7e2', 0.5, '#f4e1b8', 1, '#c8b28c'); c.fill();
  c.save(); path(); c.clip(); c.fillStyle = '#e8574a'; c.fillRect(-14, -30, 28, 7); c.fillStyle = '#2a8f9a'; c.fillRect(-14, -21, 28, 4); c.restore();
  c.strokeStyle = 'rgba(120,90,60,.5)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(0, -74); c.lineTo(0, 74); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.45)'; c.beginPath(); c.ellipse(-6, -10, 2, 40, 0, 0, Math.PI * 2); c.fill();
}

/* ===== Stage 6: Machu Picchu ===== */
function bgMachu(c) {
  const R = mulberry(606);
  c.fillStyle = lin(c, 0, 0, 0, 240, 0, '#6f97cc', 0.5, '#cfd1d0', 1, '#f6d6a2'); c.fillRect(0, 0, W, 240);
  glow(c, 330, 60, 200, '255,226,170', 0.8);
  puffs(c, R, 10, 0, 360, 30, 120, 0.5);
  ridge(c, wave(176, 0.031, 16, 0, 0.09, 5, 1, 0.011, 18, 2), 320, lin(c, 0, 140, 0, 260, 0, 'rgba(118,132,170,.75)', 1, 'rgba(170,170,180,.6)'));
  ridge(c, wave(214, 0.024, 16, 3, 0.07, 4, 2), 320, lin(c, 0, 180, 0, 300, 0, 'rgba(84,112,104,.85)', 1, 'rgba(120,140,120,.7)'));
  c.fillStyle = lin(c, 0, 220, 0, 270, 0, 'rgba(255,255,255,0)', 0.5, 'rgba(255,250,240,.6)', 1, 'rgba(255,255,255,0)'); c.fillRect(0, 220, W, 50);
  // Huayna Picchu
  const peak = () => { c.beginPath(); c.moveTo(160, 300); c.bezierCurveTo(192, 220, 214, 104, 240, 84); c.quadraticCurveTo(252, 74, 263, 88); c.bezierCurveTo(292, 124, 318, 220, 352, 300); c.closePath(); };
  peak(); c.fillStyle = lin(c, 170, 0, 350, 0, 0, '#86ad62', 0.4, '#4f7d47', 1, '#24452f'); c.fill();
  c.save(); peak(); c.clip();
  for (let i = 0; i < 380; i++) { const x = 170 + R() * 180, y = 84 + R() * 220; circ(c, x, y, 1 + R() * 2.6, R() < 0.55 ? 'rgba(20,45,25,.35)' : 'rgba(170,200,120,.25)'); }
  for (let i = 0; i < 9; i++) { const x = 225 + R() * 60, y = 110 + R() * 120; poly(c, [x, y, x + 6 + R() * 8, y + 4, x + 3, y + 16 + R() * 10], 'rgba(150,145,130,.45)'); }
  c.restore();
  c.beginPath(); c.moveTo(140, 304); c.quadraticCurveTo(196, 200, 248, 304); c.closePath(); c.fillStyle = lin(c, 150, 0, 248, 0, 0, '#9cbe72', 1, '#4f7a46'); c.fill();
  c.fillStyle = lin(c, 0, 250, 0, 300, 0, 'rgba(255,255,255,0)', 0.6, 'rgba(255,252,245,.55)', 1, 'rgba(255,255,255,.2)'); c.fillRect(0, 250, W, 50);
  // the citadel on its saddle
  c.beginPath(); c.moveTo(0, 312); c.lineTo(20, 286); c.quadraticCurveTo(120, 262, 230, 272); c.lineTo(330, 288); c.lineTo(360, 300); c.lineTo(360, 340); c.lineTo(0, 340); c.closePath();
  c.fillStyle = lin(c, 0, 262, 0, 340, 0, '#9cbc6a', 1, '#5f8a45'); c.fill();
  for (let k = 0; k < 7; k++) { const y = 288 + k * 7; c.fillStyle = 'rgba(70,90,50,.45)'; c.fillRect(0, y, 70 - k * 4, 1.4); c.fillStyle = 'rgba(200,220,150,.35)'; c.fillRect(0, y + 1.4, 70 - k * 4, 1.2); }
  c.fillStyle = '#b8c98a'; c.fillRect(120, 282, 70, 10);
  for (let i = 0; i < 46; i++) {
    const x = 34 + R() * 290, y = 272 + R() * 34 + Math.max(0, (x - 230) * 0.15), w = 5 + R() * 11, h = 3 + R() * 5;
    if (x > 118 && x < 192 && y < 294) continue;
    c.fillStyle = '#a49b8c'; c.fillRect(x, y - h, w, h); c.fillStyle = '#d6cdbb'; c.fillRect(x, y - h, w, 1.2); c.fillStyle = 'rgba(50,40,30,.55)'; if (w > 8) c.fillRect(x + w / 2 - 1, y - h + 2, 2, 2.4);
    if (R() < 0.3) poly(c, [x, y - h, x + w / 2, y - h - 4, x + w, y - h], '#c2b8a6');
  }
  // the terrace we stand on
  c.fillStyle = lin(c, 0, 330, 0, 348, 0, '#b3aa98', 1, '#7f7667'); c.fillRect(0, 330, W, 18);
  c.strokeStyle = 'rgba(50,42,32,.45)'; c.lineWidth = 0.9;
  for (let x = 0; x < W;) { const w = 10 + R() * 16; c.strokeRect(x, 330 + (R() < 0.5 ? 0 : 0), w, 9 + R() * 2); c.strokeRect(x + w * 0.5, 339, w, 9); x += w; }
  c.fillStyle = lin(c, 0, 348, 0, 480, 0, '#8fae55', 1, '#4f7631'); c.fillRect(0, 348, W, 132);
  for (let i = 0; i < 520; i++) { const x = R() * W, y = 350 + R() * 130; c.strokeStyle = R() < 0.5 ? 'rgba(40,70,20,.4)' : 'rgba(200,220,120,.35)'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (R() - 0.5) * 3, y - 3 - R() * 4); c.stroke(); }
  // the stall's beam and post the weavings hang from
  c.fillStyle = lin(c, 0, 50, 0, 60, 0, '#8a6038', 1, '#4e3219'); c.fillRect(0, 50, 196, 9);
  postV(c, 189, 50, 332, 4.5, '#7d5531', '#3e2814');
  c.fillStyle = 'rgba(30,20,10,.25)'; c.fillRect(0, 59, 196, 2);
}
function drawWeaving(c, pal) {
  c.fillStyle = lin(c, 0, -45, 0, -39, 0, '#9a7348', 1, '#5c3f22'); rr(c, -35, -45, 70, 5, 2.5); c.fill();
  softShadow(c, true); c.fillStyle = pal[0]; c.fillRect(-30, -41, 60, 76); softShadow(c, false);
  const bands = [6, 4, 10, 4, 14, 4, 10, 4, 6, 14];
  let y = -41;
  bands.forEach((h, i) => {
    c.fillStyle = pal[i % pal.length]; c.fillRect(-30, y, 60, h);
    if (h >= 10) { c.fillStyle = pal[(i + 2) % pal.length]; for (let x = -30 + h / 2; x < 30; x += h) { c.beginPath(); c.moveTo(x, y + 1.5); c.lineTo(x + h / 2 - 1.5, y + h / 2); c.lineTo(x, y + h - 1.5); c.lineTo(x - h / 2 + 1.5, y + h / 2); c.closePath(); c.fill(); } }
    y += h;
  });
  c.fillStyle = lin(c, -30, 0, 30, 0, 0, 'rgba(255,240,210,.18)', 0.5, 'rgba(0,0,0,0)', 1, 'rgba(0,0,0,.2)'); c.fillRect(-30, -41, 60, 76);
  c.strokeStyle = pal[0]; c.lineWidth = 1.2; for (let x = -28; x <= 28; x += 3.5) { c.beginPath(); c.moveTo(x, 35); c.lineTo(x + Math.sin(x) * 0.8, 44); c.stroke(); }
}
function drawLlama(c) {
  c.save(); c.scale(-1, 1);
  const wool = lin(c, 0, -10, 0, 34, 0, '#fbf3e3', 1, '#d9c9ae');
  [[-26, 1], [-14, 0], [6, 1], [17, 0]].forEach(([x, d]) => { c.fillStyle = d ? '#c9b89a' : '#e6d8bf'; c.fillRect(x, 24, 6, 28); c.fillStyle = '#3a2e24'; c.fillRect(x - 0.5, 50, 7, 4); });
  ell(c, -6, 14, 32, 18, wool);
  ell(c, -18, 10, 10, 8, 'rgba(150,100,60,.55)'); ell(c, 4, 20, 8, 5, 'rgba(150,100,60,.45)');
  ell(c, -38, 8, 5, 8, '#efe4cf');
  c.fillStyle = wool; c.beginPath(); c.moveTo(10, 6); c.quadraticCurveTo(14, -16, 18, -36); c.lineTo(32, -38); c.quadraticCurveTo(28, -14, 28, 10); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(150,120,90,.35)'; c.lineWidth = 0.8; for (let i = 0; i < 8; i++) { c.beginPath(); c.arc(-30 + i * 7, 6 + (i % 2) * 6, 3, Math.PI, 0); c.stroke(); }
  ell(c, 27, -41, 9, 7, '#f5ecd9'); ell(c, 35, -38, 6.5, 5, '#d8c6a8');
  circ(c, 38.5, -39, 1, '#4a3a2c');
  [[21, -49, -0.25], [28, -50, 0.15]].forEach(([x, y, r]) => { ell(c, x, y, 2.6, 6.5, '#efe3cc', r); ell(c, x, y + 0.5, 1.2, 4.2, '#d9a6a0', r); });
  [[20, -54, '#e8457a'], [27, -55, '#f2a93b']].forEach(([x, y, col]) => { circ(c, x, y, 2.4, col); });
  circ(c, 28, -43, 1.8, '#1d1712'); circ(c, 28.6, -43.6, 0.6, '#fff');
  c.restore();
}
function drawVizcacha(c) {
  c.strokeStyle = '#3c3530'; c.lineWidth = 3.4; c.lineCap = 'round'; c.beginPath(); c.moveTo(-14, 12); c.quadraticCurveTo(-28, 12, -25, -2); c.quadraticCurveTo(-23, -8, -18, -6); c.stroke();
  ell(c, -3, 7, 16, 13, lin(c, 0, -6, 0, 20, 0, '#b4aa9b', 1, '#8a8072'));
  ell(c, -6, 0, 12, 4, 'rgba(50,40,35,.5)', -0.2);
  ell(c, 9, -4, 9, 8, '#b9b0a2');
  [[5, -16, -0.2], [10, -17, 0.15]].forEach(([x, y, r]) => { ell(c, x, y, 3.2, 8, '#a59a8b', r); ell(c, x, y, 1.6, 5.5, '#d8b0a6', r); });
  circ(c, 12, -6, 1.9, '#141010'); circ(c, 12.6, -6.6, 0.6, '#fff');
  circ(c, 17.5, -2, 1.3, '#4a3a34');
  c.strokeStyle = 'rgba(40,30,25,.6)'; c.lineWidth = 0.5; c.beginPath(); c.moveTo(17, -1); c.lineTo(24, -3); c.moveTo(17, -1); c.lineTo(24, 1); c.stroke();
  ell(c, 6, 18, 5, 2.4, '#8a8072'); ell(c, -8, 19, 6, 2.4, '#8a8072');
}
function drawTrailSign(c) {
  postV(c, -46, 4, 30, 4, '#6b4a2a', '#3a2614'); postV(c, 46, 4, 30, 4, '#6b4a2a', '#3a2614');
  woodBoard(c, -65, -30, 130, 38, 3, '#b07d4c', '#8f6036', '#6a4426');
  txt(c, 'MACHU PICCHU', 0.6, -16.4, '700 13.5px "Playfair Display", Georgia, serif', 'rgba(255,230,190,.45)');
  txt(c, 'MACHU PICCHU', 0, -17, '700 13.5px "Playfair Display", Georgia, serif', '#3a220f');
  txt(c, '2430 m', -16, -1, 'italic 700 9.5px "Playfair Display", Georgia, serif', '#3a220f');
  c.fillStyle = '#3a220f'; c.beginPath(); c.moveTo(34, -5); c.lineTo(44, -1); c.lineTo(34, 3); c.closePath(); c.fill(); c.fillRect(20, -2.2, 15, 2.4);
}

/* ===== Stage 7: Taj Mahal ===== */
function tajSilhouette(c, x, y, s, col) {
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col;
  c.fillRect(-62, -70, 124, 70);
  c.beginPath(); c.moveTo(-24, -82); c.bezierCurveTo(-34, -114, -18, -134, 0, -142); c.bezierCurveTo(18, -134, 34, -114, 24, -82); c.closePath(); c.fill();
  c.fillRect(-26, -84, 52, 16); c.fillRect(-1.2, -160, 2.4, 20);
  [-40, 40].forEach(d => { c.fillRect(d - 9, -84, 18, 14); c.beginPath(); c.arc(d, -84, 9, Math.PI, 0); c.fill(); });
  [-98, 98].forEach(d => { c.fillRect(d - 4.5, -112, 9, 112); c.beginPath(); c.arc(d, -112, 6, Math.PI, 0); c.fill(); });
  c.restore();
}
function bgTaj(c) {
  const R = mulberry(707);
  c.fillStyle = lin(c, 0, 0, 0, 260, 0, '#8299c8', 0.45, '#e2b4bd', 0.8, '#f7cfa6', 1, '#fbe1b7'); c.fillRect(0, 0, W, 260);
  glow(c, 180, 236, 220, '255,226,190', 0.75);
  puffs(c, R, 10, 0, 360, 30, 140, 0.4, '255,226,226');
  c.fillStyle = 'rgba(140,140,120,.5)'; for (let x = 0; x < W; x += 3) c.fillRect(x, 244 - Math.abs(Math.sin(x * 0.13) * 6) - R() * 4, 3, 16);
  // the Taj
  const marble = (x0, x1) => lin(c, x0, 0, x1, 0, 0, '#fff6ea', 0.55, '#f0dfd2', 1, '#c9b3ab');
  [[106, 0.86], [254, 0.86], [80, 1], [280, 1]].forEach(([mx, s]) => {
    const h = 112 * s, base = 246;
    c.fillStyle = marble(mx - 5, mx + 5); c.beginPath(); c.moveTo(mx - 5 * s, base); c.lineTo(mx - 3.6 * s, base - h); c.lineTo(mx + 3.6 * s, base - h); c.lineTo(mx + 5 * s, base); c.closePath(); c.fill();
    c.fillStyle = 'rgba(150,120,110,.55)'; [0.3, 0.58, 0.82].forEach(f => c.fillRect(mx - 6 * s, base - h * f, 12 * s, 2.2 * s));
    c.fillStyle = marble(mx - 6, mx + 6); c.fillRect(mx - 6 * s, base - h - 4 * s, 12 * s, 4 * s); c.beginPath(); c.arc(mx, base - h - 4 * s, 5.5 * s, Math.PI, 0); c.fill(); c.fillRect(mx - 0.5, base - h - 14 * s, 1, 6 * s);
  });
  c.fillStyle = marble(70, 290); c.fillRect(66, 236, 228, 14);
  c.fillStyle = 'rgba(150,115,105,.35)'; for (let x = 72; x < 290; x += 10) { arch(c, x + 4, 239, 5, 9); c.fill(); }
  c.fillStyle = marble(118, 242); c.beginPath(); c.moveTo(118, 238); c.lineTo(118, 178); c.lineTo(128, 168); c.lineTo(232, 168); c.lineTo(242, 178); c.lineTo(242, 238); c.closePath(); c.fill();
  c.fillStyle = marble(150, 210); c.fillRect(150, 162, 60, 76);
  const pointed = (x, y, w, h) => { c.beginPath(); c.moveTo(x - w / 2, y + h); c.lineTo(x - w / 2, y + w * 0.45); c.quadraticCurveTo(x - w / 2, y, x, y - w * 0.12); c.quadraticCurveTo(x + w / 2, y, x + w / 2, y + w * 0.45); c.lineTo(x + w / 2, y + h); c.closePath(); };
  pointed(180, 176, 38, 62); c.fillStyle = lin(c, 0, 172, 0, 238, 0, '#b49a98', 1, '#d9c3bb'); c.fill();
  pointed(180, 196, 22, 42); c.fillStyle = 'rgba(110,80,80,.45)'; c.fill();
  c.strokeStyle = 'rgba(140,110,100,.6)'; c.lineWidth = 1; c.strokeRect(152, 164, 56, 74);
  [[134, 176], [134, 208], [226, 176], [226, 208]].forEach(([x, y]) => { pointed(x, y, 16, 26); c.fillStyle = 'rgba(150,118,112,.55)'; c.fill(); });
  c.fillStyle = marble(154, 206); c.fillRect(154, 148, 52, 20);
  c.beginPath(); c.moveTo(156, 150); c.bezierCurveTo(144, 118, 162, 98, 180, 89); c.bezierCurveTo(198, 98, 216, 118, 204, 150); c.closePath(); c.fillStyle = lin(c, 150, 0, 210, 0, 0, '#fffaf2', 0.5, '#f3e3d6', 1, '#c8afa6'); c.fill();
  c.fillStyle = '#c9a25a'; c.fillRect(179.2, 68, 1.6, 22); circ(c, 180, 80, 2.2, '#d6b066'); circ(c, 180, 73, 1.6, '#d6b066');
  [140, 220].forEach(x => { c.fillStyle = marble(x - 9, x + 9); c.fillRect(x - 9, 152, 18, 16); c.beginPath(); c.arc(x, 152, 9, Math.PI, 0); c.fill(); c.fillRect(x - 0.6, 136, 1.2, 8); });
  // garden walls, lawns, paths, pool and cypresses
  [[0, 74], [286, 74]].forEach(([x, w]) => { c.fillStyle = lin(c, 0, 236, 0, 258, 0, '#c9806a', 1, '#9c5b49'); c.fillRect(x, 238, w, 18); c.fillStyle = 'rgba(255,220,190,.4)'; for (let k = x + 3; k < x + w; k += 9) c.fillRect(k, 232, 5, 6); });
  c.fillStyle = lin(c, 0, 256, 0, 480, 0, '#83a35a', 1, '#4d7434'); c.fillRect(0, 256, W, 224);
  const px = (y, k) => 180 + k * (12 + (y - 256) * 0.27);
  c.fillStyle = lin(c, 0, 256, 0, 480, 0, '#e2b7a0', 1, '#bf8f78');
  c.beginPath(); c.moveTo(px(256, -2.2), 256); c.lineTo(px(256, 2.2), 256); c.lineTo(px(480, 2.2), 480); c.lineTo(px(480, -2.2), 480); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(px(256, -1), 256); c.lineTo(px(256, 1), 256); c.lineTo(px(480, 1), 480); c.lineTo(px(480, -1), 480); c.closePath();
  c.fillStyle = lin(c, 0, 256, 0, 480, 0, '#d9b4b6', 0.5, '#9fb2d0', 1, '#6f87b0'); c.fill();
  c.save(); c.clip(); c.globalAlpha = 0.35; c.translate(0, 512); c.scale(1, -1); tajSilhouette(c, 180, 256, 0.9, '#fff4ea'); c.restore();
  c.fillStyle = 'rgba(255,255,255,.35)'; for (let i = 0; i < 40; i++) { const y = 262 + R() * 210; c.fillRect(px(y, -0.9) + R() * (px(y, 0.9) - px(y, -0.9)), y, 3 + y * 0.02, 0.8); }
  c.fillStyle = 'rgba(40,30,20,.25)'; c.fillRect(110, 334, 146, 6);
  c.fillStyle = lin(c, 0, 312, 0, 322, 0, '#fffaf2', 1, '#efe4d8'); c.fillRect(104, 312, 152, 10);
  c.fillStyle = lin(c, 0, 322, 0, 336, 0, '#e6d8cc', 1, '#bfaea2'); c.fillRect(104, 322, 152, 14);
  c.fillStyle = 'rgba(150,120,110,.35)'; for (let x = 112; x < 252; x += 12) c.fillRect(x, 325, 6, 8);
  c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(104, 312, 152, 1.2);
  for (let k = 0; k < 9; k++) {
    const y = 262 + k * k * 2.8 + k * 6, s = 0.45 + (y - 256) / 120;
    [-1, 1].forEach(d => {
      const x = px(y, d * 2.6) + d * 4 * s;
      c.fillStyle = 'rgba(20,40,20,.25)'; c.beginPath(); c.ellipse(x + 3 * s, y, 6 * s, 1.6 * s, 0, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.moveTo(x, y - 34 * s); c.quadraticCurveTo(x + 7 * s, y - 14 * s, x + 4 * s, y); c.lineTo(x - 4 * s, y); c.quadraticCurveTo(x - 7 * s, y - 14 * s, x, y - 34 * s); c.closePath();
      c.fillStyle = lin(c, x - 6 * s, 0, x + 6 * s, 0, 0, '#3f6a34', 1, '#1d3a20'); c.fill();
    });
  }
  speck(c, R, 0, 256, W, 224, 800, 0.08, '220,240,180', '30,50,20');
}
function drawTajBench(c) {
  softShadow(c, true); c.fillStyle = '#efe5da'; c.fillRect(-66, -8, 132, 10); c.fillRect(-56, 2, 16, 16); c.fillRect(40, 2, 16, 16); softShadow(c, false);
  const m = lin(c, -66, 0, 66, 0, 0, '#fffaf3', 0.6, '#efe3d8', 1, '#cbbcb0');
  c.fillStyle = m; c.fillRect(-66, -8, 132, 10); c.fillRect(-56, 2, 16, 16); c.fillRect(40, 2, 16, 16);
  c.fillStyle = 'rgba(150,120,110,.35)'; c.fillRect(-66, 0, 132, 2); [-48, 48].forEach(x => { arch(c, x, 6, 8, 12); c.fill(); });
  c.strokeStyle = 'rgba(170,150,140,.35)'; c.lineWidth = 0.6; c.beginPath(); c.moveTo(-60, -6); c.bezierCurveTo(-20, -2, 10, -8, 60, -3); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(-66, -8, 132, 1.4);
}
function drawPeacock(c) {
  const train = () => { c.beginPath(); c.moveTo(10, 2); c.quadraticCurveTo(-20, -8, -58, 6); c.quadraticCurveTo(-60, 18, -54, 26); c.quadraticCurveTo(-20, 22, 10, 14); c.closePath(); };
  train(); c.fillStyle = lin(c, -58, 0, 10, 0, 0, '#2c6f4e', 0.6, '#3f8e55', 1, '#2a5f7a'); c.fill();
  c.save(); train(); c.clip();
  c.strokeStyle = 'rgba(200,190,90,.4)'; c.lineWidth = 0.6; for (let i = 0; i < 14; i++) { c.beginPath(); c.moveTo(10, 8); c.lineTo(-60, -6 + i * 2.6); c.stroke(); }
  for (let i = 0; i < 12; i++) { const x = -52 + (i % 6) * 10 + (i > 5 ? 5 : 0), y = i > 5 ? 17 : 7; ell(c, x, y, 3.6, 2.8, '#d9b84a'); ell(c, x, y, 2.6, 2, '#2f8f6a'); ell(c, x + 0.3, y, 1.4, 1.2, '#1b3f8f'); }
  c.restore();
  c.strokeStyle = '#7d7d7d'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(16, 14); c.lineTo(14, 30); c.moveTo(22, 14); c.lineTo(24, 30); c.stroke();
  ell(c, 20, 6, 14, 10, lin(c, 6, 0, 34, 0, 0, '#5a4a2a', 0.4, '#1f4fb0', 1, '#2e78e0'));
  ell(c, 14, 6, 7, 6, 'rgba(160,130,80,.6)');
  c.fillStyle = lin(c, 0, -26, 0, 4, 0, '#2a7fe8', 1, '#1b4fb4'); c.beginPath(); c.moveTo(24, 2); c.quadraticCurveTo(26, -12, 30, -22); c.lineTo(36, -22); c.quadraticCurveTo(34, -10, 34, 4); c.closePath(); c.fill();
  circ(c, 33, -24, 5.5, '#2a7fe8');
  c.fillStyle = '#fff'; c.beginPath(); c.ellipse(34, -24, 2.8, 1.1, -0.2, 0, Math.PI * 2); c.fill();
  circ(c, 34, -24.5, 1.1, '#111');
  poly(c, [38, -25, 43, -23, 38, -21.5], '#8c7b62');
  c.strokeStyle = '#2a4f9a'; c.lineWidth = 0.7; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(32, -29); c.lineTo(27 + i * 2.6, -37); c.stroke(); circ(c, 27 + i * 2.6, -37.5, 1.2, '#2a7fe8'); }
}
function drawPalmSquirrel(c) {
  c.fillStyle = lin(c, -30, -16, -10, 6, 0, '#9c8a72', 1, '#6b5b48'); c.beginPath(); c.moveTo(-10, 4); c.bezierCurveTo(-24, 6, -30, -4, -26, -12); c.bezierCurveTo(-22, -18, -14, -14, -16, -8); c.bezierCurveTo(-18, -4, -14, 0, -8, -2); c.closePath(); c.fill();
  ell(c, 1, 4, 13, 8, lin(c, 0, -4, 0, 12, 0, '#8e7c64', 1, '#c8b8a0'));
  c.strokeStyle = 'rgba(250,245,230,.9)'; c.lineWidth = 1.1; [-1, 1.8, 4.6].forEach(dy => { c.beginPath(); c.moveTo(-10, -1 + dy); c.quadraticCurveTo(1, -6 + dy, 12, -1 + dy); c.stroke(); });
  c.strokeStyle = 'rgba(60,45,30,.6)'; c.lineWidth = 1; [0.4, 3.2].forEach(dy => { c.beginPath(); c.moveTo(-9, -1 + dy); c.quadraticCurveTo(1, -5.4 + dy, 11, -0.6 + dy); c.stroke(); });
  ell(c, 15, 1, 7, 5.5, '#8e7c64'); ell(c, 13, -4, 2, 2.6, '#7a6852');
  circ(c, 17, 0, 1.4, '#111'); circ(c, 17.4, -0.4, 0.5, '#fff'); circ(c, 21.6, 2, 0.9, '#3a2a20');
  c.fillStyle = '#6b5b48'; c.fillRect(8, 10, 3, 4); c.fillRect(-6, 10, 4, 4);
}
function drawTajSign(c) {
  postV(c, -44, 10, 25, 4, '#b06a54', '#7a4334'); postV(c, 44, 10, 25, 4, '#b06a54', '#7a4334');
  softShadow(c, true); rr(c, -65, -25, 130, 38, 3); c.fillStyle = '#f2e6d8'; c.fill(); softShadow(c, false);
  rr(c, -65, -25, 130, 38, 3); c.fillStyle = lin(c, -65, -25, 65, 13, 0, '#fffaf2', 1, '#e0d0c0'); c.fill();
  c.strokeStyle = '#a9483a'; c.lineWidth = 1.3; rr(c, -61, -21, 122, 30, 2); c.stroke();
  for (let x = -54; x <= 54; x += 12) { circ(c, x, -18.5, 1.1, '#2f7a5a'); circ(c, x + 6, 6.5, 1.1, '#2f7a5a'); }
  txt(c, 'TAJ MAHAL', 0, -7, '700 14px "Playfair Display", Georgia, serif', '#7a2a24');
  txt(c, 'AGRA · INDIA', 0, 3.5, '700 6.5px "Playfair Display", Georgia, serif', '#6a5446');
}
function drawInlayPlate(c) {
  c.strokeStyle = '#2a1d16'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(-10, 16); c.lineTo(-17, 29); c.moveTo(10, 16); c.lineTo(17, 29); c.stroke();
  c.fillStyle = '#2a1d16'; c.fillRect(-20, 26, 40, 3.5);
  softShadow(c, true); circ(c, 0, -4, 25, '#f6efe6'); softShadow(c, false);
  circ(c, 0, -4, 25, radl(c, -8, -12, 34, 0, '#ffffff', 0.7, '#f1e9de', 1, '#d6cabd'));
  c.strokeStyle = 'rgba(160,150,140,.35)'; c.lineWidth = 0.5; c.beginPath(); c.moveTo(-22, 2); c.bezierCurveTo(-8, -6, 4, 8, 22, -8); c.stroke();
  c.strokeStyle = '#2f6f5a'; c.lineWidth = 1; c.beginPath(); c.arc(0, -4, 21.5, 0, Math.PI * 2); c.stroke();
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; circ(c, Math.cos(a) * 21.5, -4 + Math.sin(a) * 21.5, 1.1, i % 2 ? '#c0392b' : '#2b5fa0'); }
  c.strokeStyle = '#2f6f5a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, 12); c.lineTo(0, -12); c.stroke();
  [[-1, 4], [1, 0], [-1, -4]].forEach(([d, y]) => ell(c, d * 4.5, y, 4.2, 1.7, '#3f8f5f', d * 0.5));
  [[-1, -8], [1, -8]].forEach(([d, y]) => { circ(c, d * 8, y, 2.4, '#d0525a'); });
  ell(c, 0, -15, 3.4, 5, '#c0392b'); ell(c, -2.6, -14, 2, 4, '#e0606a', -0.4); ell(c, 2.6, -14, 2, 4, '#e0606a', 0.4);
  ell(c, -7, -16, 6, 3, 'rgba(255,255,255,.5)', -0.6);
}
function drawTajFrame(c, night) {
  c.strokeStyle = '#3a2a1a'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 20); c.lineTo(10, 38); c.stroke();
  softShadow(c, true); c.fillStyle = '#b8892f'; c.fillRect(-29, -36, 58, 70); softShadow(c, false);
  c.fillStyle = lin(c, -29, -36, 29, 34, 0, '#f6d77a', 0.4, '#c69a3a', 0.7, '#e8c160', 1, '#8a6420'); c.fillRect(-29, -36, 58, 70);
  c.fillStyle = 'rgba(90,60,20,.35)'; c.fillRect(-22, -29, 44, 56);
  c.fillStyle = night ? lin(c, 0, -27, 0, 25, 0, '#1d2650', 1, '#4a5a8a') : lin(c, 0, -27, 0, 25, 0, '#f2a8a0', 1, '#fbe0b8'); c.fillRect(-20, -27, 40, 52);
  if (night) { circ(c, 10, -18, 3.2, '#fff6d8'); circ(c, 11.3, -18.6, 2.6, '#2a3462'); }
  c.fillStyle = night ? '#355' : '#86a35a'; c.fillRect(-20, 15, 40, 10);
  tajSilhouette(c, 0, 16, 0.14, night ? '#e9ecf6' : '#fffaf2');
  c.strokeStyle = 'rgba(255,240,190,.7)'; c.lineWidth = 0.8; c.strokeRect(-26.5, -33.5, 53, 65);
  [[-29, -36], [29, -36], [-29, 34], [29, 34]].forEach(([x, y]) => circ(c, x, y, 2.6, '#e8c160'));
}

/* ===== Stage 8: Moai at Ahu Tongariki ===== */
// One moai, w × h, base on y = h/2. rim: how much sunrise rims its right edge.
function moaiShape(c, w, h, rim = 0.6, tone = ['#7c6553', '#4b3b30']) {
  const s = w / 64, b = h / 2, t = -h / 2, u = h / 150;
  c.save();
  const body = lin(c, -w / 2, 0, w / 2, 0, 0, tone[0], 0.75, tone[1], 1, '#3c2f27');
  c.fillStyle = body;
  c.beginPath(); c.moveTo(-26 * s, b); c.lineTo(-24 * s, -6 * u); c.lineTo(24 * s, -6 * u); c.lineTo(26 * s, b); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(-20 * s, t + 2 * u); c.lineTo(20 * s, t + 2 * u); c.lineTo(23 * s, -44 * u); c.lineTo(22 * s, -2 * u); c.lineTo(-22 * s, -2 * u); c.lineTo(-23 * s, -44 * u); c.closePath(); c.fill();
  c.fillStyle = 'rgba(25,15,10,.5)'; c.fillRect(-19 * s, -50 * u, 38 * s, 9 * u);
  c.fillStyle = lin(c, -6 * s, 0, 6 * s, 0, 0, 'rgba(255,220,180,.18)', 1, 'rgba(20,10,5,.35)');
  c.beginPath(); c.moveTo(-3.5 * s, -50 * u); c.lineTo(3.5 * s, -50 * u); c.lineTo(8 * s, -22 * u); c.lineTo(-8 * s, -22 * u); c.closePath(); c.fill();
  c.fillStyle = 'rgba(25,15,10,.55)'; c.fillRect(-8 * s, -22 * u, 16 * s, 2 * u); c.fillRect(-6 * s, -14 * u, 12 * s, 2.2 * u);
  c.fillStyle = 'rgba(25,15,10,.3)'; c.fillRect(-24 * s, -40 * u, 3 * s, 26 * u); c.fillRect(21 * s, -40 * u, 3 * s, 26 * u);
  c.fillStyle = 'rgba(20,12,8,.4)'; c.fillRect(-22 * s, -4 * u, 44 * s, 4 * u);
  c.strokeStyle = 'rgba(25,15,10,.45)'; c.lineWidth = 1.6 * s;
  [-1, 1].forEach(d => { c.beginPath(); c.moveTo(d * 21 * s, 4 * u); c.quadraticCurveTo(d * 22 * s, 40 * u, d * 6 * s, 50 * u); c.stroke(); });
  c.lineWidth = 0.8 * s; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-6 * s + i * 1.6 * s, 48 * u); c.lineTo(-2 * s + i * 1.6 * s, 52 * u); c.stroke(); c.beginPath(); c.moveTo(6 * s - i * 1.6 * s, 48 * u); c.lineTo(2 * s - i * 1.6 * s, 52 * u); c.stroke(); }
  if (rim) { c.fillStyle = `rgba(255,196,120,${rim})`; c.fillRect(20 * s, t + 2 * u, 2.4 * s, 40 * u); c.fillRect(23.5 * s, 0, 2.4 * s, b); c.fillRect(-20 * s, t + 2 * u, 40 * s, 1.6 * u); }
  c.restore();
}
function bgMoai(c) {
  const R = mulberry(808);
  c.fillStyle = lin(c, 0, 0, 0, 262, 0, '#3b4c88', 0.42, '#c27b7c', 0.78, '#f6a35c', 1, '#fcd47f'); c.fillRect(0, 0, W, 262);
  glow(c, 232, 252, 240, '255,205,130', 0.95);
  puffs(c, R, 12, 0, 360, 40, 180, 0.4, '255,214,190');
  circ(c, 232, 262, 16, 'rgba(255,240,200,.95)');
  c.fillStyle = lin(c, 0, 260, 0, 322, 0, '#f6b073', 0.35, '#b58a86', 1, '#4c5480'); c.fillRect(0, 260, W, 62);
  for (let i = 0; i < 180; i++) { const y = 262 + R() * 58, x = 232 + (R() - 0.5) * (14 + (y - 258) * 1.4); c.fillStyle = `rgba(255,${215 + R() * 30 | 0},150,${0.3 + R() * 0.5})`; c.fillRect(x, y, 3 + R() * 9, 1); }
  for (let i = 0; i < 120; i++) { c.fillStyle = 'rgba(30,30,60,.2)'; c.fillRect(R() * W, 262 + R() * 58, 4 + R() * 10, 1); }
  c.fillStyle = 'rgba(70,60,80,.75)'; c.beginPath(); c.moveTo(300, 262); c.quadraticCurveTo(330, 236, 360, 240); c.lineTo(360, 262); c.closePath(); c.fill();
  // grass
  c.fillStyle = lin(c, 0, 318, 0, 480, 0, '#a8a047', 0.4, '#6f8a3a', 1, '#3f5a28'); c.fillRect(0, 318, W, 162);
  for (let i = 0; i < 600; i++) { const x = R() * W, y = 330 + R() * 150; c.strokeStyle = R() < 0.5 ? 'rgba(40,60,20,.4)' : 'rgba(250,220,130,.35)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (R() - 0.3) * 4, y - 3 - R() * 5); c.stroke(); }
  [[30, 470, 14], [340, 466, 10], [150, 476, 8]].forEach(([x, y, r]) => { ell(c, x, y, r, r * 0.55, '#3c3530'); ell(c, x - r * 0.2, y - r * 0.2, r * 0.6, r * 0.25, 'rgba(255,200,140,.25)'); });
  // the ahu and the moai behind ours
  c.fillStyle = lin(c, 0, 314, 0, 338, 0, '#7d6b5c', 1, '#4a3d33'); c.fillRect(8, 316, 344, 22);
  c.strokeStyle = 'rgba(30,20,15,.5)'; c.lineWidth = 0.8; for (let x = 8; x < 352;) { const w = 10 + R() * 18; c.strokeRect(x, 316, w, 11); c.strokeRect(x + w / 2, 327, w, 11); x += w; }
  c.fillStyle = 'rgba(255,200,130,.4)'; c.fillRect(8, 316, 344, 2);
  [[244, 128], [288, 142], [330, 122]].forEach(([x, h]) => { c.save(); c.translate(x, 324 - h / 2); moaiShape(c, h * 0.42, h, 0.45, ['#5f4d40', '#3e3129']); c.restore(); });
  c.fillStyle = 'rgba(255,190,120,.12)'; c.fillRect(220, 180, 140, 140);
}
function drawPukao(c) {
  c.translate(0, 2);
  softShadow(c, true); c.fillStyle = '#9c4a35'; c.fillRect(-22, -9, 44, 21); softShadow(c, false);
  c.fillStyle = lin(c, -22, 0, 22, 0, 0, '#c26a4c', 0.6, '#9c4632', 1, '#6e2f22'); c.fillRect(-22, -9, 44, 21);
  ell(c, 0, 12, 22, 4, '#6e2f22');
  ell(c, 0, -9, 22, 6, lin(c, -22, 0, 22, 0, 0, '#d68566', 1, '#a65038'));
  ell(c, 0, -11, 8, 3, '#b45a40'); ell(c, 0, -12, 8, 2.4, '#c96e52');
  for (let i = 0; i < 26; i++) circ(c, -20 + (i * 7.3) % 40, -6 + (i * 5.1) % 17, 0.8, 'rgba(60,20,15,.45)');
  c.fillStyle = 'rgba(255,200,130,.6)'; c.fillRect(19, -8, 2.4, 19);
}
function drawHorse(c) {
  c.save(); c.scale(-1, 1);
  const coat = lin(c, 0, -20, 0, 18, 0, '#9a6038', 1, '#5e3a22');
  c.fillStyle = '#3a2a20'; c.beginPath(); c.moveTo(-38, -10); c.quadraticCurveTo(-50, 6, -44, 24); c.lineTo(-40, 24); c.quadraticCurveTo(-42, 8, -34, -6); c.closePath(); c.fill();
  [[-28, 0.9], [-18, 1], [14, 0.9], [24, 1]].forEach(([x, d]) => { c.fillStyle = d < 1 ? '#5a3820' : '#6e4428'; c.fillRect(x - 3, 6, 6, 32); c.fillStyle = '#2a1e16'; c.fillRect(x - 3.4, 36, 6.8, 5); });
  ell(c, -4, -2, 36, 17, coat);
  c.fillStyle = coat; c.beginPath(); c.moveTo(18, -14); c.quadraticCurveTo(38, -10, 46, 18); c.lineTo(38, 22); c.quadraticCurveTo(30, 4, 14, 6); c.closePath(); c.fill();
  c.fillStyle = '#2e2018'; c.beginPath(); c.moveTo(16, -16); c.quadraticCurveTo(38, -14, 46, 12); c.lineTo(44, 14); c.quadraticCurveTo(34, -8, 16, -11); c.closePath(); c.fill();
  c.fillStyle = lin(c, 38, 0, 54, 0, 0, '#8a5432', 1, '#5e3a22'); c.beginPath(); c.moveTo(37, 12); c.lineTo(47, 9); c.quadraticCurveTo(55, 24, 54, 38); c.quadraticCurveTo(50, 43, 45, 40); c.quadraticCurveTo(40, 26, 37, 12); c.closePath(); c.fill();
  c.fillStyle = '#3e2618'; c.beginPath(); c.moveTo(45, 34); c.quadraticCurveTo(50, 32, 54, 35); c.quadraticCurveTo(54, 41, 48, 42); c.quadraticCurveTo(44, 40, 45, 34); c.closePath(); c.fill();
  c.fillStyle = '#efe4d0'; c.beginPath(); c.moveTo(45, 14); c.lineTo(47, 14); c.lineTo(50, 30); c.lineTo(48, 30); c.closePath(); c.fill();
  circ(c, 42, 20, 1.5, '#120c08'); poly(c, [38, 13, 40, 4, 44, 11], '#5e3a22');
  c.fillStyle = 'rgba(255,200,140,.35)'; c.beginPath(); c.ellipse(-4, -14, 30, 4, 0, Math.PI, 0); c.fill();
  c.restore();
}
function drawTern(c) {
  const wing = s => { c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(s * 12, -15, s * 34, -9); c.quadraticCurveTo(s * 16, -3, s * 4, 5); c.closePath(); };
  wing(-1); c.fillStyle = lin(c, -34, 0, 0, 0, 0, '#1b1d22', 1, '#3d424c'); c.fill();
  wing(1); c.fillStyle = lin(c, 0, 0, 34, 0, 0, '#3d424c', 1, '#1b1d22'); c.fill();
  poly(c, [-8, 2, -22, -3, -14, 4, -22, 9, -8, 6], '#2a2d33');
  ell(c, 0, 3, 11, 4.6, '#f7f5f0'); ell(c, 0, 1, 10, 2.4, '#30343c');
  circ(c, 10, 0, 4.2, '#fbfaf6'); c.fillStyle = '#1b1d22'; c.beginPath(); c.arc(10, 0, 4.2, Math.PI * 1.05, Math.PI * 1.95); c.fill();
  poly(c, [13.5, -0.6, 20, 0.8, 13.5, 1.8], '#1b1d22'); circ(c, 11, -1, 0.8, '#000');
}
function drawRapaSign(c) {
  postV(c, -50, 12, 28, 4, '#6b4a2a', '#3a2614'); postV(c, 50, 12, 28, 4, '#6b4a2a', '#3a2614');
  woodBoard(c, -70, -28, 140, 42, 3, '#a87648', '#865a32', '#62401f');
  txt(c, 'PARQUE NACIONAL', 0, -19, '700 7.5px "Noto Sans TC", Arial, sans-serif', '#f6e8cc');
  txt(c, 'RAPA NUI', 0, -6, '700 15px "Playfair Display", Georgia, serif', '#fff3dc');
  txt(c, 'Ahu Tongariki', 0, 7.5, 'italic 700 8.5px "Playfair Display", Georgia, serif', '#f6e0bc');
}

/* ===== Stage 9: Angkor Wat at sunrise ===== */
function angkorSilhouette(c, col, rimA) {
  c.fillStyle = col;
  c.fillRect(20, 240, 320, 24); c.fillRect(56, 228, 248, 14);
  for (let x = 24; x < 336; x += 8) c.fillRect(x, 236, 4, 4);
  // lotus-bud towers built from stacked, notched tiers
  const tower = (x, base, w, h) => {
    c.fillStyle = col; c.fillRect(x - w / 2 - 2, base - h * 0.3, w + 4, h * 0.3);
    const n = 7, th = h * 0.62 / n;
    for (let k = 0; k < n; k++) {
      const y = base - h * 0.3 - k * th, hw = w / 2 * Math.cos(k / n * 1.25);
      c.fillRect(x - hw, y - th, hw * 2, th + 0.5);
      c.beginPath(); c.moveTo(x - hw - 2, y); c.lineTo(x - hw, y - th * 0.9); c.lineTo(x - hw + 1, y); c.moveTo(x + hw + 2, y); c.lineTo(x + hw, y - th * 0.9); c.lineTo(x + hw - 1, y); c.fill();
      if (rimA) { c.fillStyle = `rgba(255,190,140,${rimA})`; c.fillRect(x - hw, y - 1, hw * 2, 0.9); c.fillStyle = col; }
    }
    c.beginPath(); c.moveTo(x - w * 0.12, base - h * 0.92); c.lineTo(x, base - h); c.lineTo(x + w * 0.12, base - h * 0.92); c.fill();
  };
  tower(100, 242, 20, 56); tower(260, 242, 20, 56); tower(140, 230, 24, 76); tower(220, 230, 24, 76); tower(180, 230, 32, 106);
}
function bgAngkor(c) {
  const R = mulberry(909);
  c.fillStyle = lin(c, 0, 0, 0, 264, 0, '#2f3064', 0.35, '#8a5a8a', 0.72, '#f08a5a', 1, '#fbc36e'); c.fillRect(0, 0, W, 264);
  glow(c, 180, 196, 230, '255,200,120', 0.95); circ(c, 180, 200, 15, 'rgba(255,236,190,.95)');
  puffs(c, R, 10, 0, 360, 30, 150, 0.35, '255,190,190');
  angkorSilhouette(c, '#3d2740', 0.35);
  // palms
  const palm = (x, top, s) => {
    c.strokeStyle = '#21161f'; c.lineWidth = 3 * s; c.beginPath(); c.moveTo(x, 330); c.quadraticCurveTo(x + 4 * s, (330 + top) / 2, x, top); c.stroke();
    c.lineWidth = 1.6 * s; for (let i = 0; i < 18; i++) { const a = -Math.PI + (i / 17) * Math.PI * 1.15 - 0.08, r = (16 + (i % 3) * 3) * s; c.beginPath(); c.moveTo(x, top); c.quadraticCurveTo(x + Math.cos(a) * r * 0.6, top + Math.sin(a) * r * 0.7, x + Math.cos(a) * r, top + Math.sin(a) * r + 4 * s); c.stroke(); }
    circ(c, x, top, 7 * s, '#21161f');
  };
  palm(26, 150, 1.2); palm(62, 196, 0.9); palm(334, 160, 1.15); palm(302, 200, 0.85);
  // the pond, its reflection and lotus pads
  c.fillStyle = lin(c, 0, 262, 0, 340, 0, '#f6b06a', 0.5, '#b07090', 1, '#4a3a68'); c.fillRect(0, 262, W, 78);
  c.save(); c.globalAlpha = 0.32; c.translate(0, 526); c.scale(1, -1); angkorSilhouette(c, '#2a1d38', 0); c.restore();
  c.save(); c.globalAlpha = 0.6; c.fillStyle = 'rgba(255,220,160,.55)'; for (let i = 0; i < 70; i++) c.fillRect(170 + (R() - 0.5) * 30, 266 + R() * 70, 4 + R() * 10, 1); c.restore();
  for (let i = 0; i < 160; i++) { c.fillStyle = R() < 0.5 ? 'rgba(255,220,180,.18)' : 'rgba(30,20,50,.25)'; c.fillRect(R() * W, 264 + R() * 76, 5 + R() * 12, 1); }
  for (let i = 0; i < 18; i++) { const x = R() * W, y = 300 + R() * 38; ell(c, x, y, 6 + R() * 6, 2 + R() * 1.5, R() < 0.5 ? '#2f4a2c' : '#3f5f34'); }
  // the bank
  c.fillStyle = lin(c, 0, 336, 0, 480, 0, '#8a6a44', 1, '#4f3a26'); c.fillRect(0, 336, W, 144);
  c.fillStyle = '#4f6f34'; for (let x = 0; x < W; x += 3) c.fillRect(x, 334 + Math.sin(x * 0.7) * 1.5, 3, 5 + R() * 4);
  speck(c, R, 0, 340, W, 140, 900, 0.1);
  c.strokeStyle = 'rgba(40,25,15,.25)'; c.lineWidth = 1; for (let i = 0; i < 40; i++) { const y = 350 + R() * 128; c.beginPath(); c.moveTo(R() * W, y); c.lineTo(R() * W, y + 1); c.stroke(); }
  // the postcard stall
  postV(c, 6, 320, 480, 3.5, '#7a5634', '#3e2a16'); postV(c, 108, 320, 480, 3.5, '#7a5634', '#3e2a16');
  c.fillStyle = lin(c, 0, 318, 0, 334, 0, '#b88a4a', 1, '#6a4a26'); c.beginPath(); c.moveTo(0, 318); c.lineTo(114, 322); c.lineTo(114, 332); c.lineTo(0, 334); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(60,35,15,.5)'; c.lineWidth = 0.8; for (let x = 4; x < 114; x += 5) { c.beginPath(); c.moveTo(x, 319); c.lineTo(x + 1, 333); c.stroke(); }
  c.fillStyle = lin(c, 0, 334, 0, 480, 0, '#3a2a1c', 1, '#24180f'); c.fillRect(10, 334, 95, 146);
  [['#c0283a', '#f2c14e'], ['#1f6f8b', '#f6e7c8'], ['#2a9d4f', '#f2a93b'], ['#7a1f4f', '#e8457a']].forEach(([a, b], i) => {
    const x = 14 + i * 23; c.fillStyle = a; c.fillRect(x, 344, 19, 30); c.fillStyle = b; for (let k = 0; k < 5; k++) { c.fillRect(x, 347 + k * 6, 19, 1.6); c.fillRect(x + 2 + k * 4, 344, 1.6, 30); }
  });
  c.strokeStyle = '#d9c9a6'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(8, 386); c.quadraticCurveTo(58, 392, 108, 386); c.stroke();
  c.fillStyle = lin(c, 0, 440, 0, 456, 0, '#a07448', 1, '#6a4a2a'); c.fillRect(6, 440, 104, 14);
}
function drawLadder(c) {
  const bamboo = x => { c.fillStyle = lin(c, x - 2.5, 0, x + 2.5, 0, 0, '#e6c983', 0.5, '#c9a45a', 1, '#8a6a32'); c.fillRect(x - 2.5, -75, 5, 150); c.fillStyle = 'rgba(90,60,25,.6)'; for (let y = -64; y < 75; y += 26) c.fillRect(x - 2.8, y, 5.6, 1.6); };
  softShadow(c, true); c.fillStyle = '#c9a45a'; c.fillRect(-13, -75, 5, 150); c.fillRect(8, -75, 5, 150); softShadow(c, false);
  bamboo(-10.5); bamboo(10.5);
  for (let y = -66; y < 72; y += 15) { c.fillStyle = lin(c, 0, y, 0, y + 3, 0, '#dcbd78', 1, '#9a7a3e'); c.fillRect(-8, y, 16, 3); c.fillStyle = 'rgba(70,45,20,.5)'; c.fillRect(-9, y - 0.5, 2, 4); c.fillRect(7, y - 0.5, 2, 4); }
}
function drawTukTuk(c) {
  c.strokeStyle = '#2b2b2b'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(20, 18); c.lineTo(32, 16); c.stroke();
  softShadow(c, true); rr(c, -62, -48, 84, 9, 3); c.fillStyle = '#7b2d3a'; c.fill(); softShadow(c, false);
  rr(c, -62, -48, 84, 9, 3); c.fillStyle = lin(c, 0, -48, 0, -39, 0, '#a43a4a', 1, '#6a2230'); c.fill();
  c.fillStyle = '#e8b84a'; for (let x = -60; x < 22; x += 5) { c.beginPath(); c.arc(x + 2.5, -39, 2.5, 0, Math.PI); c.fill(); }
  c.fillStyle = '#c9c4ba'; c.fillRect(-58, -39, 2.4, 44); c.fillRect(15, -39, 2.4, 44);
  c.fillStyle = '#b02c34'; rr(c, -52, -6, 18, 14, 2); c.fill(); rr(c, -10, -6, 18, 14, 2); c.fill();
  c.fillStyle = lin(c, 0, 4, 0, 24, 0, '#3c63a0', 1, '#22385e'); rr(c, -62, 4, 84, 18, 3); c.fill();
  c.fillStyle = '#e8b84a'; c.fillRect(-62, 9, 84, 1.6);
  circ(c, -34, 34, 13, '#1b1b1b'); circ(c, -34, 34, 6.5, '#a7aab0'); circ(c, -34, 34, 2, '#444');
  c.fillStyle = lin(c, 24, 0, 56, 0, 0, '#d63c34', 1, '#8a1e1e'); c.beginPath(); c.moveTo(24, 22); c.quadraticCurveTo(30, 8, 46, 8); c.lineTo(54, 22); c.closePath(); c.fill();
  c.fillStyle = '#1e1e1e'; rr(c, 28, 4, 18, 5, 2.5); c.fill();
  c.strokeStyle = '#3a3a3a'; c.lineWidth = 2; c.beginPath(); c.moveTo(50, 22); c.lineTo(56, -2); c.lineTo(50, -6); c.stroke();
  circ(c, 57, 2, 3.4, '#fff2c0');
  [[30, 38], [54, 38]].forEach(([x, y]) => { circ(c, x, y, 10, '#1b1b1b'); circ(c, x, y, 5, '#a7aab0'); circ(c, x, y, 1.6, '#444'); });
  c.fillStyle = 'rgba(255,200,140,.4)'; c.fillRect(-62, -48, 84, 1.6);
}
function drawMacaque(c) {
  c.strokeStyle = '#7d6a52'; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(-12, 20); c.quadraticCurveTo(-28, 24, -26, 8); c.stroke();
  ell(c, -3, 10, 14, 16, lin(c, 0, -6, 0, 26, 0, '#a8967a', 1, '#7d6a52'));
  ell(c, -8, 23, 8, 5, '#8a7660'); ell(c, 6, 23, 8, 5, '#8a7660');
  c.strokeStyle = '#8a7660'; c.lineWidth = 4; c.beginPath(); c.moveTo(6, 4); c.quadraticCurveTo(14, 4, 13, -6); c.stroke();
  circ(c, 6, -12, 11, '#9c8a6e'); circ(c, -4, -12, 3.4, '#9c8a6e'); circ(c, -4, -12, 1.8, '#d9a69a');
  ell(c, 9, -10, 6.5, 7, '#e2a596');
  ell(c, 6.5, -13, 1.5, 1.8, '#1a120c'); ell(c, 11.5, -13, 1.5, 1.8, '#1a120c');
  c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(6.6, -14, 0.8, 0.8); c.fillRect(11.6, -14, 0.8, 0.8);
  c.strokeStyle = '#8a4a40'; c.lineWidth = 0.8; c.beginPath(); c.arc(9, -7, 2.4, 0.3, Math.PI - 0.3); c.stroke();
  c.fillStyle = 'rgba(200,180,150,.6)'; c.beginPath(); c.arc(6, -15, 10, Math.PI * 1.1, Math.PI * 1.9); c.lineTo(6, -15); c.fill();
}
function drawLotus(c) {
  ell(c, 0, 9, 30, 7.5, lin(c, -30, 0, 30, 0, 0, '#5a8a3e', 1, '#2f5a26'));
  c.fillStyle = 'rgba(20,40,15,.5)'; c.beginPath(); c.moveTo(0, 9); c.lineTo(22, 4); c.lineTo(24, 8); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(180,220,140,.4)'; c.lineWidth = 0.6; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; c.beginPath(); c.moveTo(0, 9); c.lineTo(Math.cos(a) * 26, 9 + Math.sin(a) * 6); c.stroke(); }
  const petal = (a, len, col) => { c.save(); c.translate(0, 4); c.rotate(a); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-6, -len * 0.55, 0, -len); c.quadraticCurveTo(6, -len * 0.55, 0, 0); c.fillStyle = col; c.fill(); c.restore(); };
  [-1.1, 1.1].forEach(a => petal(a, 15, '#e88aa8'));
  [-0.6, 0.6].forEach(a => petal(a, 18, '#f2a2bc'));
  petal(0, 20, lin(c, 0, -16, 0, 4, 0, '#fff0f4', 1, '#f59ab8'));
  circ(c, 0, 0, 2.6, '#f2c94c');
}
function drawAngkorSign(c) {
  postV(c, -36, 10, 25, 3.5, '#5a371f', '#2e1a0e'); postV(c, 36, 10, 25, 3.5, '#5a371f', '#2e1a0e');
  softShadow(c, true); rr(c, -50, -25, 100, 36, 4); c.fillStyle = '#5b331b'; c.fill(); softShadow(c, false);
  rr(c, -50, -25, 100, 36, 4); c.fillStyle = lin(c, 0, -25, 0, 11, 0, '#7a4a2a', 1, '#4e2b16'); c.fill();
  c.strokeStyle = 'rgba(242,201,76,.85)'; c.lineWidth = 1.2; rr(c, -46, -21, 92, 28, 2.5); c.stroke();
  txt(c, 'ANGKOR WAT', 0, -10, '700 12.5px "Playfair Display", Georgia, serif', '#fff3dc');
  txt(c, 'Siem Reap', 0, 2, 'italic 700 8px "Playfair Display", Georgia, serif', '#f2d7a0');
  gloss(c, 100, 36, 4, 0.15);
}
function drawAngkorCard(c, face) {
  c.strokeStyle = 'rgba(210,200,170,.9)'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(-25, -18); c.lineTo(25, -17); c.stroke();
  softShadow(c, true); c.fillStyle = '#f7f1e3'; c.fillRect(-23, -14, 46, 33); softShadow(c, false);
  c.fillStyle = lin(c, -23, -14, 23, 19, 0, '#fffaf0', 1, '#e9e0cc'); c.fillRect(-23, -14, 46, 33);
  if (!face) {
    c.fillStyle = lin(c, 0, -11, 0, 10, 0, '#f08a5a', 1, '#fbc36e'); c.fillRect(-20, -11, 40, 21);
    c.save(); c.beginPath(); c.rect(-20, -11, 40, 21); c.clip(); c.translate(-20, -11); c.scale(40 / 320, 21 / 140); c.translate(-20, -128); angkorSilhouette(c, '#3d2740', 0); c.restore();
  } else {
    c.fillStyle = lin(c, 0, -11, 0, 10, 0, '#9fb6c8', 1, '#d8d0b8'); c.fillRect(-20, -11, 40, 21);
    c.fillStyle = lin(c, -10, 0, 10, 0, 0, '#a59a86', 1, '#6f6656'); c.beginPath(); c.moveTo(-9, 10); c.lineTo(-9, -6); c.quadraticCurveTo(0, -12, 9, -6); c.lineTo(9, 10); c.closePath(); c.fill();
    c.fillStyle = 'rgba(40,30,20,.55)'; c.fillRect(-6, -3, 4, 1.4); c.fillRect(2, -3, 4, 1.4); c.fillRect(-1, -2, 2, 6);
    c.strokeStyle = 'rgba(40,30,20,.6)'; c.lineWidth = 1; c.beginPath(); c.arc(0, 4, 4, 0.3, Math.PI - 0.3); c.stroke();
  }
  txt(c, face ? 'Bayon' : 'Angkor', 0, 14.5, 'italic 700 6.5px "Playfair Display", Georgia, serif', '#6b4a2a');
  c.fillStyle = lin(c, -3, 0, 3, 0, 0, '#d9b98a', 1, '#9a7a4a'); c.fillRect(-3, -20, 6, 10);
}

/* ===== Stage 10: Mount Fuji and the Chureito Pagoda ===== */
function blossoms(c, R, x0, y0, w, h, n) {
  for (let i = 0; i < n; i++) {
    const x = x0 + R() * w, y = y0 + R() * h, r = 4 + R() * 9;
    c.fillStyle = R() < 0.3 ? 'rgba(232,150,175,.9)' : R() < 0.6 ? 'rgba(248,190,205,.92)' : 'rgba(255,222,230,.92)';
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    if (R() < 0.4) circ(c, x - r * 0.3, y - r * 0.3, r * 0.35, 'rgba(255,245,248,.8)');
  }
}
function bgFuji(c) {
  const R = mulberry(1010);
  c.fillStyle = lin(c, 0, 0, 0, 310, 0, '#3a3f7c', 0.35, '#8a6fa8', 0.68, '#f09a8c', 1, '#fcd3a0'); c.fillRect(0, 0, W, 310);
  glow(c, 30, 270, 220, '255,205,140', 0.85);
  puffs(c, R, 12, 0, 360, 20, 160, 0.38, '255,210,220');
  // Fuji
  const fuji = () => { c.beginPath(); c.moveTo(20, 312); c.quadraticCurveTo(150, 262, 222, 110); c.lineTo(230, 104); c.lineTo(240, 108); c.lineTo(250, 103); c.lineTo(259, 110); c.quadraticCurveTo(330, 262, 420, 312); c.closePath(); };
  fuji(); c.fillStyle = lin(c, 120, 0, 380, 0, 0, '#9a8fc0', 0.5, '#6e6aa0', 1, '#454478'); c.fill();
  c.save(); fuji(); c.clip();
  c.beginPath(); c.moveTo(150, 120); c.lineTo(330, 120); c.lineTo(330, 170);
  for (let x = 330; x >= 150; x -= 6) c.lineTo(x, 150 + Math.abs(Math.sin(x * 0.21)) * 26 + (x % 18 === 0 ? 14 : 0) + Math.abs(x - 240) * 0.1);
  c.closePath(); c.fillStyle = lin(c, 190, 0, 300, 0, 0, '#fff6f4', 0.55, '#f6d6dc', 1, '#c9b4d4'); c.fill();
  c.strokeStyle = 'rgba(150,130,180,.45)'; c.lineWidth = 1;
  for (let k = -4; k <= 4; k++) { c.beginPath(); c.moveTo(240 + k * 3, 108); c.quadraticCurveTo(240 + k * 10, 150, 240 + k * 16, 186); c.stroke(); }
  c.fillStyle = 'rgba(255,170,160,.18)'; c.fillRect(0, 100, W, 100);
  c.restore();
  c.fillStyle = lin(c, 0, 262, 0, 312, 0, 'rgba(255,220,210,0)', 1, 'rgba(255,225,215,.65)'); c.fillRect(0, 262, W, 50);
  // town, trees and the pagoda's hill
  ridge(c, wave(300, 0.05, 4, 0, 0.13, 2, 1), 340, '#4a3f62');
  for (let i = 0; i < 60; i++) { c.fillStyle = `rgba(255,${200 + R() * 40 | 0},140,${0.5 + R() * 0.4})`; c.fillRect(140 + R() * 220, 306 + R() * 26, 1.2, 1.2); }
  c.beginPath(); c.moveTo(0, 290); c.quadraticCurveTo(90, 296, 170, 330); c.lineTo(170, 360); c.lineTo(0, 360); c.closePath(); c.fillStyle = lin(c, 0, 290, 0, 360, 0, '#3e4a3a', 1, '#26301f'); c.fill();
  blossoms(c, R, 120, 300, 70, 40, 40);
  // stone terrace
  c.fillStyle = lin(c, 0, 352, 0, 480, 0, '#a99a92', 1, '#6e625e'); c.fillRect(0, 352, W, 128);
  c.strokeStyle = 'rgba(40,30,30,.3)'; c.lineWidth = 1;
  for (let y = 358, s = 7, r = 0; y < 480; y += s, s *= 1.2, r++) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); for (let x = (r % 2) * 20; x < W; x += 40 + r * 4) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + s); c.stroke(); } }
  speck(c, R, 0, 352, W, 128, 700, 0.08);
  blossoms(c, R, 140, 440, 60, 40, 0);
  for (let i = 0; i < 40; i++) { const x = R() * W, y = 360 + R() * 118; ell(c, x, y, 2, 1.2, 'rgba(250,200,215,.8)', R() * 3); }
  // the dango shop
  c.fillStyle = lin(c, 0, 348, 0, 480, 0, '#5a3a26', 1, '#2e1d12'); c.fillRect(0, 348, 138, 132);
  c.fillStyle = 'rgba(255,200,140,.5)'; c.fillRect(24, 420, 92, 30); c.fillStyle = 'rgba(60,35,20,.6)'; for (let x = 24; x < 116; x += 10) c.fillRect(x, 420, 1.4, 30);
  c.fillStyle = lin(c, 0, 326, 0, 346, 0, '#4a4040', 1, '#262020'); c.beginPath(); c.moveTo(0, 326); c.lineTo(150, 332); c.lineTo(146, 346); c.lineTo(0, 346); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(160,150,150,.45)'; c.lineWidth = 0.9; for (let x = 4; x < 148; x += 7) { c.beginPath(); c.moveTo(x, 327 + x * 0.04); c.lineTo(x, 345); c.stroke(); }
  c.fillStyle = '#8a6a44'; c.fillRect(6, 349, 128, 3);
  // ema rack under the park sign
  postV(c, 172, 284, 382, 3, '#8a5a34', '#4a2e16'); postV(c, 288, 284, 382, 3, '#8a5a34', '#4a2e16');
  c.fillStyle = lin(c, 0, 305, 0, 311, 0, '#8a5a34', 1, '#4a2e16'); c.fillRect(166, 305, 128, 5);
  c.fillStyle = 'rgba(0,0,0,.25)'; ell(c, 230, 382, 66, 5, 'rgba(0,0,0,.2)');
  // the maneki-neko's stool
  c.fillStyle = lin(c, 0, 468, 0, 480, 0, '#9a6a3e', 1, '#5a3a1e'); c.fillRect(150, 468, 50, 12);
  // blossoms framing the top
  c.strokeStyle = '#2a1e22'; c.lineWidth = 3.4; c.beginPath(); c.moveTo(0, 96); c.quadraticCurveTo(60, 84, 128, 66); c.stroke();
  c.lineWidth = 2; c.beginPath(); c.moveTo(70, 85); c.quadraticCurveTo(90, 100, 120, 102); c.moveTo(30, 92); c.lineTo(40, 70); c.stroke();
  blossoms(c, R, -10, 0, 150, 60, 120); blossoms(c, R, 90, 50, 50, 50, 26); blossoms(c, R, 0, 90, 40, 24, 16);
  c.lineWidth = 3; c.beginPath(); c.moveTo(360, 180); c.quadraticCurveTo(330, 210, 318, 250); c.stroke();
  blossoms(c, R, 316, 150, 50, 110, 70);
}
function drawPagoda(c) {
  const ver = x0 => lin(c, -x0, 0, x0, 0, 0, '#ef6a48', 0.5, '#cf412a', 1, '#8a2618');
  c.fillStyle = lin(c, -36, 0, 36, 0, 0, '#c9c0b4', 1, '#7a7068'); c.fillRect(-36, 92, 72, 8);
  let y = 92;
  for (let i = 0; i < 5; i++) {
    const bw = 22 - i * 2.6, bh = 19 - i * 0.8, rw = bw + 14 + (4 - i) * 0.5;
    c.fillStyle = ver(bw); c.fillRect(-bw, y - bh, bw * 2, bh);
    c.fillStyle = 'rgba(40,10,5,.55)'; c.fillRect(-bw * 0.35, y - bh + 4, bw * 0.7, bh - 5);
    c.fillStyle = '#f3e3c0'; c.fillRect(-bw, y - bh, bw * 2, 1.4);
    c.fillStyle = 'rgba(255,220,180,.35)'; c.fillRect(-bw, y - bh, 1.6, bh);
    y -= bh;
    c.fillStyle = '#2f2628'; c.beginPath(); c.moveTo(-rw - 4, y - 5); c.quadraticCurveTo(-rw + 4, y + 1, -bw, y + 1); c.lineTo(bw, y + 1); c.quadraticCurveTo(rw - 4, y + 1, rw + 4, y - 5); c.lineTo(rw - 2, y - 4); c.lineTo(bw - 4, y - 9); c.lineTo(-bw + 4, y - 9); c.lineTo(-rw + 2, y - 4); c.closePath(); c.fill();
    c.fillStyle = 'rgba(200,170,160,.55)'; c.beginPath(); c.moveTo(-rw - 4, y - 5); c.quadraticCurveTo(-rw + 4, y + 1, -bw, y + 1); c.lineTo(bw, y + 1); c.quadraticCurveTo(rw - 4, y + 1, rw + 4, y - 5); c.lineTo(rw + 4, y - 4); c.quadraticCurveTo(rw - 4, y + 2.4, bw, y + 2.4); c.lineTo(-bw, y + 2.4); c.quadraticCurveTo(-rw + 4, y + 2.4, -rw - 4, y - 4); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,200,160,.35)'; c.fillRect(-bw + 4, y - 9, bw * 2 - 8, 1.2);
    y -= 9;
  }
  c.fillStyle = '#5a4a3a'; c.fillRect(-1.6, -98, 3.2, y + 98);
  for (let k = 0; k < 9; k++) ell(c, 0, y - 4 - k * 4.2, 4 - k * 0.15, 1.1, '#8a7a5a');
  circ(c, 0, -96, 2.4, '#c9a25a');
}
function drawShiba(c) {
  c.save(); c.scale(-1, 1);
  const fur = lin(c, 0, -20, 0, 20, 0, '#e8a050', 1, '#c97a32');
  [[-20, 1], [-12, 0], [12, 1], [20, 0]].forEach(([x, d]) => { c.fillStyle = d ? '#c97a32' : '#e09246'; c.fillRect(x - 3, 8, 6, 22); c.fillStyle = '#fbf3e3'; c.fillRect(x - 3, 24, 6, 7); });
  ell(c, -2, 4, 26, 13, fur); ell(c, 2, 10, 18, 5, '#fbefd8');
  c.fillStyle = fur; c.beginPath(); c.arc(-26, -6, 9, 0, Math.PI * 2); c.fill(); circ(c, -26, -6, 4.5, '#fbefd8'); circ(c, -23, -9, 4, '#e8a050');
  c.fillStyle = fur; c.beginPath(); c.moveTo(14, 2); c.quadraticCurveTo(16, -12, 22, -16); c.lineTo(32, -6); c.quadraticCurveTo(28, 4, 24, 8); c.closePath(); c.fill();
  circ(c, 26, -14, 12, fur);
  ell(c, 31, -9, 8, 6, '#fbefd8'); ell(c, 22, -8, 6, 4.5, '#fbefd8');
  poly(c, [16, -20, 18, -33, 25, -24], '#d48a3e'); poly(c, [18, -22, 19, -29, 23, -24], '#f2c6a0');
  poly(c, [26, -24, 32, -34, 34, -21], '#d48a3e'); poly(c, [28, -24, 32, -30, 32, -22], '#f2c6a0');
  circ(c, 38, -11, 2, '#1a1210'); circ(c, 29, -15, 1.8, '#1a1210'); circ(c, 29.6, -15.6, 0.6, '#fff');
  c.strokeStyle = '#1a1210'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(38, -9); c.quadraticCurveTo(35, -5, 32, -7); c.stroke();
  ell(c, 27, -11, 3, 1.8, 'rgba(240,130,120,.45)');
  c.fillStyle = '#c0392b'; c.beginPath(); c.moveTo(17, -6); c.quadraticCurveTo(22, 0, 30, -2); c.lineTo(30, 1); c.quadraticCurveTo(22, 3, 16, -3); c.closePath(); c.fill();
  c.restore();
}
function drawManeki(c) {
  softShadow(c, true); ell(c, 0, 14, 17, 16, '#fbf8f2'); softShadow(c, false);
  ell(c, 0, 14, 17, 16, lin(c, -17, 0, 17, 0, 0, '#ffffff', 1, '#e2ddd2'));
  ell(c, -12, -21, 5, 7, '#fbf8f2', -0.4);
  ell(c, 16, -20, 5.5, 8, lin(c, 0, -28, 0, -12, 0, '#ffffff', 1, '#e8e2d6'), 0.2);
  c.fillStyle = '#f2a0a8'; c.beginPath(); c.arc(16, -24, 2.4, 0, Math.PI * 2); c.fill();
  circ(c, 0, -10, 15, lin(c, -15, -25, 15, 5, 0, '#ffffff', 1, '#e6e0d4'));
  poly(c, [-13, -16, -11, -30, -3, -22], '#fbf8f2'); poly(c, [-11, -18, -10.5, -26, -5, -21], '#f2a0a8');
  poly(c, [13, -16, 11, -30, 3, -22], '#fbf8f2'); poly(c, [11, -18, 10.5, -26, 5, -21], '#f2a0a8');
  ell(c, -8, -18, 4.5, 3.5, '#e88a3a', -0.3); ell(c, 9, -20, 3, 2.4, '#2a2420', 0.3);
  c.strokeStyle = '#2a2420'; c.lineWidth = 1.2; c.beginPath(); c.arc(-5.5, -10, 2.6, Math.PI * 1.1, Math.PI * 1.9); c.moveTo(8, -10); c.arc(5.5, -10, 2.6, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
  circ(c, 0, -6, 1.3, '#f08a96');
  c.lineWidth = 0.6; c.beginPath(); c.moveTo(-6, -5); c.lineTo(-13, -6); c.moveTo(-6, -4); c.lineTo(-13, -3); c.moveTo(6, -5); c.lineTo(13, -6); c.moveTo(6, -4); c.lineTo(13, -3); c.stroke();
  c.fillStyle = '#d8322f'; c.beginPath(); c.ellipse(0, 3.5, 12, 3, 0, 0, Math.PI * 2); c.fill();
  circ(c, 0, 6.5, 3.2, '#f2c14e'); c.fillStyle = 'rgba(120,80,20,.6)'; c.fillRect(-0.4, 6.5, 0.8, 2.6);
  ell(c, -4, 17, 7.5, 9.5, lin(c, 0, 8, 0, 26, 0, '#f6d77a', 1, '#c99a2a'));
  c.strokeStyle = 'rgba(120,80,20,.5)'; c.lineWidth = 0.6; for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(-9, 17 + k * 4); c.lineTo(1, 17 + k * 4); c.stroke(); }
  ell(c, 9, 24, 5, 4.5, '#fbf8f2');
}
function drawEma(c, word) {
  c.strokeStyle = '#c0392b'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, -21); c.lineTo(0, -12); c.stroke();
  const p = () => { c.beginPath(); c.moveTo(-24, -6); c.lineTo(-10, -18); c.lineTo(10, -18); c.lineTo(24, -6); c.lineTo(24, 20); c.lineTo(-24, 20); c.closePath(); };
  softShadow(c, true); p(); c.fillStyle = '#e3c08a'; c.fill(); softShadow(c, false);
  p(); c.fillStyle = lin(c, -24, -18, 24, 20, 0, '#f2d7a6', 1, '#c99c62'); c.fill();
  c.fillStyle = 'rgba(120,70,30,.35)'; c.beginPath(); c.moveTo(-24, -6); c.lineTo(-10, -18); c.lineTo(10, -18); c.lineTo(24, -6); c.lineTo(24, -3); c.lineTo(-24, -3); c.closePath(); c.fill();
  circ(c, 0, -12, 1.6, '#5a3a1e');
  txt(c, LOCAL(word), -6, 6, '700 12px "Noto Serif TC", "Noto Sans TC", serif', '#2a1a10');
  c.strokeStyle = 'rgba(40,25,15,.65)'; c.lineWidth = 0.8;
  for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(13, -1 + k * 0.5); for (let j = 0; j < 5; j++) c.lineTo(13 + (j % 2) * 2.5 - k * 3.6, 1 + j * 3.4); c.stroke(); }
}
function drawNoren(c, word) {
  c.fillStyle = '#1d2a54'; for (let x = -24; x <= 18; x += 14) rr(c, x, -40, 8, 7, 1.5), c.fill();
  softShadow(c, true); c.fillStyle = '#23315e'; c.fillRect(-26, -35, 52, 73); softShadow(c, false);
  c.fillStyle = lin(c, -26, 0, 26, 0, 0, '#2c3d74', 0.6, '#23315e', 1, '#18224a'); c.fillRect(-26, -35, 52, 73);
  txt(c, LOCAL(word), 0, -6, '700 30px "Noto Serif TC", "Noto Sans TC", serif', '#f6f1e6');
  c.strokeStyle = 'rgba(246,241,230,.75)'; c.lineWidth = 0.9;
  for (let x = -26; x <= 26; x += 10) for (let r = 2; r <= 5; r += 3) { c.beginPath(); c.arc(x, 38, r, Math.PI, 0); c.stroke(); }
  c.fillStyle = 'rgba(0,0,0,.18)'; for (let x = -18; x < 26; x += 13) c.fillRect(x, -35, 1, 73);
}
function drawFujiSign(c) {
  woodBoard(c, -65, -22, 130, 40, 3, '#9a6a3e', '#7a4e2a', '#5a3618');
  c.strokeStyle = 'rgba(255,235,200,.35)'; c.lineWidth = 0.8; rr(c, -61, -18, 122, 32, 2); c.stroke();
  txt(c, LOCAL('新倉山浅間公園'), 0, -6, '700 13px "Noto Serif TC", "Noto Sans TC", serif', '#fff4e0');
  txt(c, 'ARAKURAYAMA SENGEN PARK', 0, 8, '700 6.6px "Noto Sans TC", Arial, sans-serif', '#f6e0bc');
}
function drawUguisu(c) {
  poly(c, [-10, 2, -24, -2, -23, 4, -9, 7], '#6b7436');
  ell(c, -1, 2, 13, 8.5, lin(c, 0, -6, 0, 10, 0, '#8f9a48', 1, '#6e7a34'));
  ell(c, 2, 6, 8, 4, '#cfcf9a');
  ell(c, -4, 0, 8, 4.5, '#7a8438', -0.2);
  circ(c, 11, -4, 7, '#8f9a48');
  c.strokeStyle = 'rgba(240,235,190,.8)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(8, -7.5); c.lineTo(15, -6.5); c.stroke();
  circ(c, 13, -5, 1.4, '#1a1a10'); circ(c, 13.4, -5.4, 0.45, '#fff');
  poly(c, [17, -5, 22, -3.6, 17, -2.6], '#4a4430');
  c.strokeStyle = '#6b5a40'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(-2, 10); c.lineTo(-3, 16); c.moveTo(3, 10); c.lineTo(4, 16); c.stroke();
}

/* ===== Sounds for stages 2-10 ===== */
{
  const { q, note, puff } = QS;
  defineCreatureSound('wonder_magpie', (ac, o, t) => [0, 0.11, 0.22].forEach((d, k) => q(ac, o, t + d, [[0, 1500 + k * 60], [0.05, 1250]], 0.08, { attack: 0.004, hold: 0.3, vol: 0.4, over: 0.3 })));
  defineCreatureSound('wonder_pigeon', (ac, o, t) => { q(ac, o, t, [[0, 520], [0.12, 640], [0.3, 560]], 0.32, { vib: [7, 14], vol: 0.42, attack: 0.03 }); q(ac, o, t + 0.36, [[0, 600], [0.2, 480]], 0.22, { vib: [7, 12], vol: 0.38 }); });
  defineCreatureSound('wonder_gull', (ac, o, t) => [0, 0.2].forEach((d, k) => q(ac, o, t + d, [[0, 1500 - k * 100], [0.06, 2000 - k * 100], [0.17, 1350]], 0.17, { vib: [16, 30], vol: 0.38 })));
  defineCreatureSound('wonder_ferry', (ac, o, t) => [0, 0.26].forEach(d => q(ac, o, t + d, [[0, 520], [0.2, 520]], 0.22, { vol: 0.42, over: 0.35, attack: 0.02 })));
  defineCreatureSound('wonder_kooka', (ac, o, t) => [0, 0.1, 0.2, 0.3, 0.42, 0.54].forEach((d, k) => q(ac, o, t + d, [[0, 900 + k * 140], [0.05, 1200 + k * 160], [0.09, 950 + k * 140]], 0.09, { vol: 0.38, over: 0.25 })));
  defineCreatureSound('wonder_llama', (ac, o, t) => q(ac, o, t, [[0, 620], [0.2, 720], [0.55, 640]], 0.6, { vib: [5, 10], trem: [9, 0.35], attack: 0.06, vol: 0.42 }));
  defineCreatureSound('wonder_vizcacha', (ac, o, t) => [0, 0.12].forEach(d => q(ac, o, t + d, [[0, 2100], [0.05, 2700], [0.08, 2300]], 0.08, { attack: 0.004, vol: 0.38 })));
  defineCreatureSound('wonder_peacock', (ac, o, t) => { q(ac, o, t, [[0, 900], [0.12, 1350]], 0.16, { vol: 0.4 }); q(ac, o, t + 0.2, [[0, 1250], [0.3, 820]], 0.32, { vib: [9, 30], vol: 0.42 }); });
  defineCreatureSound('wonder_squirrel', (ac, o, t) => q(ac, o, t, [[0, 2200], [0.2, 2600], [0.36, 2000]], 0.38, { trem: [28, 0.8], vol: 0.4 }));
  defineCreatureSound('wonder_horse', (ac, o, t) => q(ac, o, t, [[0, 900], [0.08, 1400], [0.5, 760]], 0.55, { vib: [18, 50], trem: [14, 0.3], vol: 0.42 }));
  defineCreatureSound('wonder_tern', (ac, o, t) => [0, 0.14, 0.24].forEach((d, k) => q(ac, o, t + d, [[0, 1800 + k * 150], [0.06, 2400 + k * 100], [0.09, 2000]], 0.09, { attack: 0.004, vol: 0.38 })));
  defineCreatureSound('wonder_monkey', (ac, o, t) => { [0, 0.14].forEach(d => q(ac, o, t + d, [[0, 620], [0.08, 820]], 0.1, { vol: 0.42, over: 0.3 })); q(ac, o, t + 0.3, [[0, 1600], [0.08, 2400], [0.2, 1900]], 0.22, { vib: [14, 40], vol: 0.38 }); });
  defineCreatureSound('wonder_tuk', (ac, o, t) => [0, 0.15].forEach(d => q(ac, o, t + d, [[0, 760], [0.1, 740]], 0.11, { vol: 0.42, over: 0.4, attack: 0.005 })));
  defineCreatureSound('wonder_shiba', (ac, o, t) => [0, 0.2].forEach(d => q(ac, o, t + d, [[0, 820], [0.05, 1150], [0.15, 760]], 0.15, { vol: 0.44, over: 0.28 })));
  defineCreatureSound('wonder_uguisu', (ac, o, t) => { q(ac, o, t, [[0, 900], [0.3, 960]], 0.32, { attack: 0.05, vol: 0.4 }); q(ac, o, t + 0.36, [[0, 1700], [0.06, 2300]], 0.1, { vol: 0.4 }); q(ac, o, t + 0.48, [[0, 2100], [0.12, 1700]], 0.14, { vol: 0.4 }); q(ac, o, t + 0.64, [[0, 1500], [0.15, 1250]], 0.18, { vib: [10, 20], vol: 0.38 }); });
  defineThingSound('wonder_stone', (ac, o, t, r) => { q(ac, o, t, [[0, 330 * r], [0.07, 280 * r]], 0.11, { attack: 0.002, hold: 0.05, vol: 0.45, over: 0.3 }); note(ac, o, t + 0.05, 1320 * r, 0.22, 0.2); });
  defineThingSound('wonder_shutter', (ac, o, t, r) => { puff(ac, o, t, 0.035, 3200, 0.5); note(ac, o, t + 0.01, 1900 * r, 0.06, 0.3); puff(ac, o, t + 0.09, 0.03, 2600, 0.4); note(ac, o, t + 0.1, 2400 * r, 0.1, 0.25); });
  defineThingSound('wonder_paper', (ac, o, t, r) => { puff(ac, o, t, 0.08, 2800, 0.35); note(ac, o, t + 0.04, 1760 * r, 0.16, 0.28); });
}
const hop = (sp, amp) => (t, l) => ({ dy: -Math.max(0, Math.sin(t * sp)) * amp * l });
const sway = (sp, ax, ay = 0) => (t, l) => ({ dx: Math.sin(t * sp) * ax * l, dy: Math.sin(t * sp * 2) * ay * l });

defineChapter({
  key: 'wonder', order: 8,
  name: { zh: "世界奇景", en: "World Wonders" },
  blurb: { zh: "用照片記錄的世界地標。有些東西，本來就是斜的。", en: "World landmarks on film. Some things are meant to lean." },
  style: { zh: "寫真風", en: "Photo" },
  narrator: { zh: "比薩斜塔", en: "Leaning Tower" },
  song: 'it',
    comments: {
      far: [{ zh: ["連我都看不下去", "我斜是天生的，其他東西不能也斜啊！"], en: ["Even I can't watch", "I lean by nature. Everything else shouldn't!"] }, { zh: ["觀光客傻眼", "大家拍照時都歪著頭在拍。"], en: ["Tourists stunned", "Everyone tilts their head to take photos."] }],
      close: [{ zh: ["差一點就正了", "再一下下，可以準備拍明信片了。"], en: ["Nearly straight", "A little more, and it's postcard time."] }, { zh: ["快完成了", "斜塔：加油，我斜斜地幫你頂著。"], en: ["Almost done", "Tower: go on, I'll hold things up (at an angle)."] }],
      pass: [{ zh: ["拍照打卡！", "勉強過關，照片要用修圖軟體再轉一下。"], en: ["Photo op!", "Cleared, but the photo needs a little rotating."] }, { zh: ["及格紀念照", "冰淇淋都快融化了，還好你及時完成。"], en: ["Souvenir pass", "The gelato nearly melted. Made it just in time."] }],
      good: [{ zh: ["明信片等級！", "整個廣場整整齊齊，只有我還是斜的（本來就是）。"], en: ["Postcard-grade!", "The whole piazza is neat. Only I lean (as I should)."] }, { zh: ["好眼光", "窗板、招牌都正了，斜塔對你點點頭（斜斜地）。"], en: ["Good eye", "Shutters and signs are straight. The tower nods (sideways)."] }],
      perfect: [{ zh: ["奇景認證♪", "一度都不差，而且你沒有扶正我！真懂我！"], en: ["Wonder-certified♪", "Not one degree off, and you left me leaning! You get me!"] }, { zh: ["世界遺產級", "這次對齊，可以列入世界遺產保護了。"], en: ["Heritage-grade", "This alignment deserves World Heritage protection."] }],
    },
  stages: [
    { key: 'it', title: { zh: "比薩黃金時刻", en: "Pisa Golden Hour" }, place: { zh: "義大利 比薩", en: "Pisa, Italy" },
      intro: { zh: "左窗板會帶動右窗板一起轉。還有：有些東西，本來就是斜的。", en: "The left shutter turns the right one too. And some things are meant to lean." },
      bg: bgItaly, overlay: ovItaly,
      objects: [
      { id: 'banner', name: { zh: '歡迎布條', en: 'Welcome banner' }, x: 275, y: 62, w: 150, h: 40, mag: 7, draw: drawBanner, sfx: 'boing' },
      { id: 'pisa', name: { zh: '比薩斜塔', en: 'Leaning Tower' }, x: 282, y: 250, w: 64, h: 224, trap: true, keep: 3.97, trapNote: { zh: '比薩斜塔本來就是斜的（約 3.97°）', en: 'The Leaning Tower is meant to lean (about 3.97°)' }, draw: drawPisa },
      { id: 'shL', name: { zh: '左窗板', en: 'Left shutter' }, x: 38, y: 145, w: 40, h: 115, mag: 9, link: { to: 'shR', k: 0.6 }, draw: c => drawShutter(c, 'L'), sfx: 'wood' },
      { id: 'shR', name: { zh: '右窗板', en: 'Right shutter' }, x: 142, y: 145, w: 40, h: 115, mag: 6, draw: c => drawShutter(c, 'R'), sfx: 'wood' },
      { id: 'gelato', name: { zh: '冰淇淋招牌', en: 'Gelato sign' }, x: 95, y: 266, w: 130, h: 54, mag: 13, draw: drawGelato, sfx: 'bell' },
      { id: 'plaque', name: { zh: '廣場路牌', en: 'Piazza plaque' }, x: 95, y: 330, w: 140, h: 46, near: true, draw: drawPlaque, sfx: 'bell' },
      { id: 'board', name: { zh: '黑板菜單', en: 'Menu board' }, x: 90, y: 420, w: 90, h: 100, mag: 10, draw: drawBoard, sfx: 'wood' }
      ] },
    { key: 'wonder-wall', title: { zh: '萬里長城', en: 'Great Wall' }, place: { zh: '中國 北京 慕田峪', en: 'Mutianyu, Beijing, China' },
      intro: { zh: '長城順著山脊蜿蜒起伏。山可以彎，招牌可不行。', en: 'The Wall rides the ridges up and down. Mountains may curve; signs may not.' },
      bg: bgWall, overlay: photoOverlay('wall', 'rgba(255,170,80,.05)'), animated: true,
      objects: [
      { id: 'tower', name: { zh: '烽火台', en: 'Watchtower' }, x: 268, y: 238, w: 116, h: 156, mag: 8, draw: sprite('wall-tower', 116, 156, drawWallTower), sfx: 'wonder_stone' },
      { id: 'magpie', name: { zh: '喜鵲', en: 'Magpie' }, x: 80, y: 254, w: 64, h: 44, mag: 13, draw: sprite('wall-magpie', 64, 44, drawMagpie), habit: hop(2.6, 5), call: 'wonder_magpie' },
      { id: 'sign', name: { zh: '景區招牌', en: 'Park sign' }, x: 105, y: 410, w: 150, h: 70, near: true, draw: sprite('wall-sign', 150, 70, drawWallSign), sfx: 'wood' },
      { id: 'flag', name: { zh: '導遊小旗', en: "Guide's flag" }, x: 296, y: 398, w: 72, h: 116, mag: 10, draw: sprite('wall-flag', 72, 116, drawGuideFlag), sfx: 'boing' }
      ] },
    { key: 'wonder-liberty', title: { zh: '自由女神', en: 'Statue of Liberty' }, place: { zh: '美國 紐約', en: 'New York, USA' },
      intro: { zh: '女神高舉火炬，站得筆直。渡輪上的東西就沒那麼穩了。', en: 'Lady Liberty holds her torch high and stands tall. The ferry, less so.' },
      bg: bgLiberty, overlay: photoOverlay('liberty', 'rgba(255,160,90,.05)'), animated: true,
      objects: [
      { id: 'statue', name: { zh: '自由女神像', en: 'Statue of Liberty' }, x: 262, y: 160, w: 76, h: 200, mag: 6, draw: sprite('lib-statue', 76, 200, drawLiberty), sfx: 'shimmer' },
      { id: 'gull', name: { zh: '海鷗', en: 'Seagull' }, x: 112, y: 118, w: 70, h: 40, mag: 12, draw: sprite('lib-gull', 70, 40, drawGull), habit: sway(0.9, 10, 3), call: 'wonder_gull' },
      { id: 'sign', name: { zh: '渡輪指標', en: 'Ferry sign' }, x: 100, y: 375, w: 140, h: 40, near: true, draw: sprite('lib-sign', 140, 40, drawFerrySign), sfx: 'bell' },
      { id: 'pigeon', name: { zh: '鴿子', en: 'Pigeon' }, x: 206, y: 375, w: 50, h: 44, mag: 9, draw: sprite('lib-pigeon', 50, 44, drawPigeon), habit: (t, l) => ({ dx: Math.sin(t * 1.4) * 4 * l, dy: -Math.abs(Math.sin(t * 5)) * 1.5 * l }), call: 'wonder_pigeon' },
      { id: 'ring', name: { zh: '救生圈', en: 'Life ring' }, x: 290, y: 418, w: 70, h: 70, mag: 14, draw: sprite('lib-ring', 70, 70, drawLifeRing), sfx: 'boing' }
      ] },
    { key: 'wonder-bigben', title: { zh: '大笨鐘', en: 'Big Ben' }, place: { zh: '英國 倫敦', en: 'London, UK' },
      intro: { zh: '「大笨鐘」其實是塔裡那口大鐘的名字。左花籃一轉，右花籃也會跟著轉。', en: '"Big Ben" is really the great bell inside the tower. Turn the left basket and the right one follows.' },
      bg: bgLondon, overlay: photoOverlay('london', 'rgba(255,165,80,.05)'), animated: true,
      objects: [
      { id: 'basketL', name: { zh: '左花籃', en: 'Left basket' }, x: 112, y: 172, w: 56, h: 66, mag: 12, link: { to: 'basketR', k: 0.6 }, draw: sprite('ldn-bL', 56, 66, c => drawBasket(c, 'L')), sfx: 'pop' },
      { id: 'basketR', name: { zh: '右花籃', en: 'Right basket' }, x: 188, y: 172, w: 56, h: 66, mag: 7, draw: sprite('ldn-bR', 56, 66, c => drawBasket(c, 'R')), sfx: 'pop' },
      { id: 'phone', name: { zh: '紅色電話亭', en: 'Phone box' }, x: 58, y: 345, w: 66, h: 160, mag: 9, draw: sprite('ldn-phone', 66, 160, drawPhoneBox), sfx: 'bell' },
      { id: 'sign', name: { zh: '路名牌', en: 'Street sign' }, x: 150, y: 318, w: 130, h: 40, near: true, draw: sprite('ldn-sign', 130, 40, drawStreetSign), sfx: 'bell' },
      { id: 'bus', name: { zh: '雙層巴士', en: 'Double-decker' }, x: 252, y: 412, w: 190, h: 100, mag: 6, draw: sprite('ldn-bus', 190, 100, drawBus), habit: (t, l) => ({ dy: Math.sin(t * 26) * 0.5 * l }), call: 'honk' }
      ] },
    { key: 'wonder-sydney', title: { zh: '雪梨歌劇院', en: 'Sydney Opera House' }, place: { zh: '澳洲 雪梨', en: 'Sydney, Australia' },
      intro: { zh: '歌劇院的屋頂像一片片帆。左邊的遮陽傘會帶動右邊那支。', en: 'The Opera House roofs look like sails. The left parasol drags the right one along.' },
      bg: bgSydney, overlay: photoOverlay('sydney', 'rgba(255,150,110,.05)'), animated: true,
      objects: [
      { id: 'ferry', name: { zh: '渡輪', en: 'Ferry' }, x: 110, y: 300, w: 130, h: 54, mag: 8, draw: sprite('syd-ferry', 130, 54, drawFerry), habit: (t, l) => ({ dx: Math.sin(t * 0.5) * 6 * l, dy: Math.sin(t * 1.6) * 1.5 * l }), call: 'wonder_ferry' },
      { id: 'surf', name: { zh: '衝浪板', en: 'Surfboard' }, x: 62, y: 400, w: 30, h: 150, trap: true, keep: -12, trapNote: { zh: '靠在牆邊的衝浪板，本來就要斜斜靠著', en: 'A surfboard propped on a wall is meant to lean' }, draw: sprite('syd-surf', 30, 150, drawSurfboard) },
      { id: 'parL', name: { zh: '左遮陽傘', en: 'Left parasol' }, x: 150, y: 386, w: 96, h: 64, mag: 11, link: { to: 'parR', k: 0.6 }, draw: sprite('syd-pL', 96, 64, c => drawParasol(c, '#1f8a8a', '#f6efe0')), sfx: 'pop' },
      { id: 'parR', name: { zh: '右遮陽傘', en: 'Right parasol' }, x: 258, y: 386, w: 96, h: 64, mag: 7, draw: sprite('syd-pR', 96, 64, c => drawParasol(c, '#e8604f', '#f6efe0')), sfx: 'pop' },
      { id: 'sign', name: { zh: '碼頭指標', en: 'Quay sign' }, x: 160, y: 455, w: 150, h: 36, near: true, draw: sprite('syd-sign', 150, 36, drawQuaySign), sfx: 'bell' },
      { id: 'kooka', name: { zh: '笑翠鳥', en: 'Kookaburra' }, x: 320, y: 442, w: 60, h: 56, mag: 13, draw: sprite('syd-kooka', 60, 56, drawKooka), habit: hop(3, 3), call: 'wonder_kooka' }
      ] },
    { key: 'wonder-machu', title: { zh: '馬丘比丘', en: 'Machu Picchu' }, place: { zh: '秘魯 庫斯科', en: 'Cusco Region, Peru' },
      intro: { zh: '印加古城藏在海拔 2430 公尺的雲裡。兩條掛毯掛在同一根橫木上。', en: 'The Inca citadel hides in the clouds at 2,430 m. The two weavings share one beam.' },
      bg: bgMachu, overlay: photoOverlay('machu', 'rgba(255,190,110,.05)'), animated: true,
      objects: [
      { id: 'weaveL', name: { zh: '左掛毯', en: 'Left weaving' }, x: 55, y: 105, w: 70, h: 90, mag: 10, link: { to: 'weaveR', k: 0.6 }, draw: sprite('mp-wL', 70, 90, c => drawWeaving(c, ['#c0283a', '#f2a93b', '#7a1f4f', '#f6e7c8', '#e8457a'])), sfx: 'wood' },
      { id: 'weaveR', name: { zh: '右掛毯', en: 'Right weaving' }, x: 140, y: 105, w: 70, h: 90, mag: 6, draw: sprite('mp-wR', 70, 90, c => drawWeaving(c, ['#1f6f8b', '#f2c14e', '#c0283a', '#f6e7c8', '#2a9d8f'])), sfx: 'wood' },
      { id: 'vizcacha', name: { zh: '山兔鼠', en: 'Vizcacha' }, x: 60, y: 309, w: 56, h: 44, mag: 14, draw: sprite('mp-vizc', 56, 44, drawVizcacha), habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 2.2)) * 2 * l }), call: 'wonder_vizcacha' },
      { id: 'sign', name: { zh: '步道路牌', en: 'Trail sign' }, x: 85, y: 410, w: 130, h: 60, near: true, draw: sprite('mp-sign', 130, 60, drawTrailSign), sfx: 'wood' },
      { id: 'tripod', name: { zh: '三腳架相機', en: 'Tripod camera' }, x: 184, y: 400, w: 56, h: 108, near: true, draw: sprite('mp-tripod', 56, 108, drawTripod), sfx: 'wonder_shutter' },
      { id: 'llama', name: { zh: '羊駝', en: 'Llama' }, x: 285, y: 398, w: 96, h: 112, mag: 9, draw: sprite('mp-llama', 96, 112, drawLlama), habit: sway(1.1, 2.5, 0.8), call: 'wonder_llama' }
      ] },
    { key: 'wonder-taj', title: { zh: '泰姬瑪哈陵', en: 'Taj Mahal' }, place: { zh: '印度 阿格拉', en: 'Agra, India' },
      intro: { zh: '泰姬瑪哈陵講究左右對稱。左邊的相框一轉，右邊的也跟著轉。', en: 'The Taj Mahal is all about symmetry. Turn the left frame and the right one follows.' },
      bg: bgTaj, overlay: photoOverlay('taj', 'rgba(255,170,140,.05)'), animated: true,
      objects: [
      { id: 'frameL', name: { zh: '左相框', en: 'Left frame' }, x: 45, y: 200, w: 62, h: 76, mag: 9, link: { to: 'frameR', k: 0.7 }, draw: sprite('taj-fL', 62, 76, c => drawTajFrame(c, true)), sfx: 'wood' },
      { id: 'frameR', name: { zh: '右相框', en: 'Right frame' }, x: 315, y: 200, w: 62, h: 76, mag: 5, draw: sprite('taj-fR', 62, 76, c => drawTajFrame(c, false)), sfx: 'wood' },
      { id: 'bench', name: { zh: '大理石長椅', en: 'Marble bench' }, x: 180, y: 298, w: 140, h: 40, mag: 6, draw: sprite('taj-bench', 140, 40, drawTajBench), sfx: 'wonder_stone' },
      { id: 'squirrel', name: { zh: '棕櫚松鼠', en: 'Palm squirrel' }, x: 60, y: 345, w: 60, h: 34, mag: 13, draw: sprite('taj-sq', 60, 34, drawPalmSquirrel), habit: (t, l) => ({ dx: Math.sin(t * 1.7) * 5 * l, dy: -Math.max(0, Math.sin(t * 6)) * 1.5 * l }), call: 'wonder_squirrel' },
      { id: 'sign', name: { zh: '景點石牌', en: 'Plaque' }, x: 85, y: 440, w: 130, h: 50, near: true, draw: sprite('taj-sign', 130, 50, drawTajSign), sfx: 'bell' },
      { id: 'plate', name: { zh: '鑲嵌石盤', en: 'Inlay plate' }, x: 190, y: 445, w: 70, h: 60, near: true, draw: sprite('taj-plate', 70, 60, drawInlayPlate), sfx: 'bell' },
      { id: 'peacock', name: { zh: '孔雀', en: 'Peacock' }, x: 288, y: 420, w: 120, h: 80, mag: 10, draw: sprite('taj-peacock', 120, 80, drawPeacock), habit: sway(0.8, 5), call: 'wonder_peacock' }
      ] },
    { key: 'wonder-moai', title: { zh: '摩艾石像', en: 'Moai' }, place: { zh: '智利 復活節島', en: 'Rapa Nui (Easter Island), Chile' },
      intro: { zh: '東加里基祭壇上站著 15 尊摩艾。轉動戴帽的那尊，頭上的紅石帽也會跟著轉。', en: 'Fifteen moai stand on Ahu Tongariki. Turn the one with the hat and its red topknot turns too.' },
      bg: bgMoai, overlay: photoOverlay('moai', 'rgba(255,160,80,.05)'), animated: true,
      objects: [
      { id: 'tern', name: { zh: '烏領燕鷗', en: 'Sooty tern' }, x: 290, y: 92, w: 70, h: 40, mag: 13, draw: sprite('moai-tern', 70, 40, drawTern), habit: sway(0.8, 9, 3), call: 'wonder_tern' },
      { id: 'pukao', name: { zh: '紅石帽', en: 'Red topknot' }, x: 165, y: 148, w: 50, h: 36, mag: 9, draw: sprite('moai-pukao', 50, 36, drawPukao), sfx: 'wonder_stone' },
      { id: 'moai1', name: { zh: '摩艾石像', en: 'Moai' }, x: 70, y: 250, w: 64, h: 150, near: true, draw: sprite('moai-1', 64, 150, c => moaiShape(c, 64, 150)), sfx: 'wonder_stone' },
      { id: 'moai2', name: { zh: '戴帽摩艾', en: 'Hatted moai' }, x: 165, y: 245, w: 70, h: 160, mag: 6, link: { to: 'pukao', k: 0.8 }, draw: sprite('moai-2', 70, 160, c => moaiShape(c, 70, 160)), sfx: 'wonder_stone' },
      { id: 'sign', name: { zh: '國家公園牌', en: 'Park sign' }, x: 85, y: 420, w: 140, h: 56, near: true, draw: sprite('moai-sign', 140, 56, drawRapaSign), sfx: 'wood' },
      { id: 'tripod', name: { zh: '三腳架相機', en: 'Tripod camera' }, x: 196, y: 404, w: 56, h: 108, mag: 7, draw: sprite('moai-tripod', 56, 108, drawTripod), sfx: 'wonder_shutter' },
      { id: 'horse', name: { zh: '野馬', en: 'Wild horse' }, x: 288, y: 398, w: 120, h: 90, mag: 11, draw: sprite('moai-horse', 120, 90, drawHorse), habit: (t, l) => ({ dy: Math.max(0, Math.sin(t * 1.6)) * 2.5 * l }), call: 'wonder_horse' }
      ] },
    { key: 'wonder-angkor', title: { zh: '吳哥窟', en: 'Angkor Wat' }, place: { zh: '柬埔寨 暹粒', en: 'Siem Reap, Cambodia' },
      intro: { zh: '日出時，吳哥窟的五座塔倒映在池塘裡。兩張明信片夾在同一條線上。', en: "At sunrise, Angkor Wat's five towers sit mirrored in the pond. Two postcards share one string." },
      bg: bgAngkor, overlay: photoOverlay('angkor', 'rgba(255,150,90,.05)'), animated: true,
      objects: [
      { id: 'monkey', name: { zh: '獼猴', en: 'Macaque' }, x: 55, y: 293, w: 60, h: 56, mag: 12, draw: sprite('ang-monkey', 60, 56, drawMacaque), habit: (t, l) => ({ dx: Math.sin(t * 2.4) * 2 * l, dy: -Math.max(0, Math.sin(t * 1.3)) * 3 * l }), call: 'wonder_monkey' },
      { id: 'lotus', name: { zh: '蓮花', en: 'Lotus' }, x: 180, y: 305, w: 64, h: 36, near: true, draw: sprite('ang-lotus', 64, 36, drawLotus), sfx: 'shimmer' },
      { id: 'sign', name: { zh: '景點招牌', en: 'Temple sign' }, x: 300, y: 318, w: 100, h: 50, near: true, draw: sprite('ang-sign', 100, 50, drawAngkorSign), sfx: 'wood' },
      { id: 'cardL', name: { zh: '左明信片', en: 'Left postcard' }, x: 33, y: 405, w: 50, h: 40, mag: 10, link: { to: 'cardR', k: 0.5 }, draw: sprite('ang-cL', 50, 40, c => drawAngkorCard(c, false)), sfx: 'wonder_paper' },
      { id: 'cardR', name: { zh: '右明信片', en: 'Right postcard' }, x: 84, y: 405, w: 50, h: 40, mag: 7, draw: sprite('ang-cR', 50, 40, c => drawAngkorCard(c, true)), sfx: 'wonder_paper' },
      { id: 'ladder', name: { zh: '竹梯', en: 'Bamboo ladder' }, x: 132, y: 385, w: 30, h: 150, trap: true, keep: -14, trapNote: { zh: '梯子要斜靠才安全（約 75°，四比一原則）', en: 'A ladder should lean to be safe (about 75°, the 4-to-1 rule)' }, draw: sprite('ang-ladder', 30, 150, drawLadder) },
      { id: 'tripod', name: { zh: '三腳架相機', en: 'Tripod camera' }, x: 192, y: 402, w: 56, h: 108, mag: 5, draw: sprite('ang-tripod', 56, 108, drawTripod), sfx: 'wonder_shutter' },
      { id: 'tuktuk', name: { zh: '嘟嘟車', en: 'Tuk-tuk' }, x: 287, y: 420, w: 130, h: 100, mag: 9, draw: sprite('ang-tuk', 130, 100, drawTukTuk), habit: (t, l) => ({ dy: Math.sin(t * 22) * 0.5 * l }), call: 'wonder_tuk' }
      ] },
    { key: 'wonder-fuji', title: { zh: '富士山', en: 'Mount Fuji' }, place: { zh: '日本 山梨 富士吉田', en: 'Fujiyoshida, Yamanashi, Japan' },
      intro: { zh: '終點站：富士山和忠靈塔。這裡有兩組連動：一對繪馬、一對門簾。', en: 'Last stop: Mount Fuji and the Chureito Pagoda. Two linked pairs: the ema and the curtains.' },
      bg: bgFuji, overlay: photoOverlay('fuji', 'rgba(255,150,150,.05)'), animated: true,
      objects: [
      { id: 'uguisu', name: { zh: '樹鶯', en: 'Bush warbler' }, x: 62, y: 70, w: 50, h: 36, mag: 14, draw: sprite('fuji-ugu', 50, 36, drawUguisu), habit: hop(2.2, 3), call: 'wonder_uguisu' },
      { id: 'pagoda', name: { zh: '五重塔', en: 'Pagoda' }, x: 95, y: 215, w: 90, h: 200, mag: 6, draw: sprite('fuji-pagoda', 90, 200, drawPagoda), sfx: 'bell' },
      { id: 'sign', name: { zh: '公園木牌', en: 'Park sign' }, x: 230, y: 268, w: 130, h: 44, near: true, draw: sprite('fuji-sign', 130, 44, drawFujiSign), sfx: 'wood' },
      { id: 'emaL', name: { zh: '左繪馬', en: 'Left ema' }, x: 205, y: 330, w: 50, h: 42, mag: 9, link: { to: 'emaR', k: 0.6 }, draw: sprite('fuji-eL', 50, 42, c => drawEma(c, '合格')), sfx: 'wood' },
      { id: 'emaR', name: { zh: '右繪馬', en: 'Right ema' }, x: 258, y: 330, w: 50, h: 42, mag: 5, draw: sprite('fuji-eR', 50, 42, c => drawEma(c, '良縁')), sfx: 'wood' },
      { id: 'norenL', name: { zh: '左門簾', en: 'Left curtain' }, x: 40, y: 392, w: 56, h: 80, mag: 11, link: { to: 'norenR', k: 0.8 }, draw: sprite('fuji-nL', 56, 80, c => drawNoren(c, '団')), sfx: 'pop' },
      { id: 'norenR', name: { zh: '右門簾', en: 'Right curtain' }, x: 98, y: 392, w: 56, h: 80, mag: 7, draw: sprite('fuji-nR', 56, 80, c => drawNoren(c, '子')), sfx: 'pop' },
      { id: 'neko', name: { zh: '招財貓', en: 'Lucky cat' }, x: 175, y: 439, w: 48, h: 60, near: true, draw: sprite('fuji-neko', 48, 60, drawManeki), sfx: 'meow' },
      { id: 'shiba', name: { zh: '柴犬', en: 'Shiba' }, x: 295, y: 438, w: 90, h: 70, mag: 10, draw: sprite('fuji-shiba', 90, 70, drawShiba), habit: hop(3.4, 2.5), call: 'wonder_shiba' }
      ] },
  ],
});
