// 第 4 大關 生活日常 / World 4: Everyday Life (Pencil sketch).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 4-1 Study afternoon: pencil sketch ===== */
function jit(x, y) { const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return v - Math.floor(v) - 0.5; }
function pencilLine(c, x1, y1, x2, y2, w = 1.1, a = 0.75) {
  c.strokeStyle = `rgba(40,40,45,${a})`; c.lineWidth = w;
  for (let k = 0; k < 2; k++) { const j = k ? 1.4 : -0.9; c.beginPath(); c.moveTo(x1 + jit(x1, y1 + k) * j, y1 + jit(y1, x1 + k) * j); c.lineTo(x2 + jit(x2, y2 + k) * j, y2 + jit(y2, x2 + k) * j); c.stroke(); }
}
function pencilRect(c, x, y, w, h, wgt, a) { pencilLine(c, x, y, x + w, y, wgt, a); pencilLine(c, x + w, y, x + w, y + h, wgt, a); pencilLine(c, x + w, y + h, x, y + h, wgt, a); pencilLine(c, x, y + h, x, y, wgt, a); }
function hatch(c, x, y, w, h, gap = 5, a = 0.18) {
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.strokeStyle = `rgba(40,40,45,${a})`; c.lineWidth = 0.8;
  for (let i = -h; i < w; i += gap) { c.beginPath(); c.moveTo(x + i, y + h); c.lineTo(x + i + h, y); c.stroke(); }
  c.restore();
}
function bgDesk(c) {
  c.fillStyle = '#f5f2ea'; c.fillRect(0, 0, W, H);
  c.globalAlpha = 0.05; c.drawImage(GRAIN, 0, 0, W, H); c.globalAlpha = 1;
  hatch(c, 0, 0, W, 330, 9, 0.07);
  c.fillStyle = 'rgba(255,233,170,.45)'; c.fillRect(150, 30, 70, 120);
  pencilRect(c, 150, 30, 70, 120, 1.2, 0.7); pencilLine(c, 185, 30, 185, 150); pencilLine(c, 150, 90, 220, 90);
  c.fillStyle = '#ebe3d3'; c.fillRect(0, 330, W, 150);
  pencilLine(c, 0, 330, W, 330, 1.6, 0.85); pencilLine(c, 0, 336, W, 336, 1, 0.4);
  c.strokeStyle = 'rgba(120,90,50,.25)'; c.lineWidth = 0.9;
  for (let y = 350; y < H; y += 14) { c.beginPath(); c.moveTo(0, y); for (let x = 0; x <= W; x += 30) c.lineTo(x, y + Math.sin(x / 40 + y) * 2); c.stroke(); }
  c.fillStyle = 'rgba(120,170,110,.35)';
  [[-10, -30], [8, -36], [18, -22], [-18, -18]].forEach(([dx, dy]) => { c.beginPath(); c.ellipse(330 + dx, 300 + dy, 7, 16, dx / 20, 0, Math.PI * 2); c.fill(); });
  pencilRect(c, 316, 300, 28, 30, 1.1, 0.7); hatch(c, 316, 300, 28, 30, 4, 0.2);
}
function drawFrame(c) {
  pencilLine(c, -10, -35, 0, -48, 0.9, 0.6); pencilLine(c, 10, -35, 0, -48, 0.9, 0.6);
  c.fillStyle = '#fbfaf6'; c.fillRect(-45, -35, 90, 70); pencilRect(c, -45, -35, 90, 70, 1.6, 0.9); pencilRect(c, -37, -27, 74, 54, 1, 0.6);
  c.save(); c.beginPath(); c.rect(-37, -27, 74, 54); c.clip();
  c.fillStyle = 'rgba(110,160,210,.45)'; c.fillRect(-37, -27, 74, 54);
  poly(c, [-37, 27, -14, -8, 4, 10, 18, -2, 37, 27], 'rgba(80,110,90,.6)');
  circ(c, 22, -14, 5, 'rgba(255,200,90,.7)');
  c.restore();
}
function drawCalendar(c) {
  c.fillStyle = '#fffdf8'; c.fillRect(-40, -44, 80, 92); pencilRect(c, -40, -44, 80, 92, 1.4, 0.85);
  c.fillStyle = 'rgba(214,72,60,.75)'; c.fillRect(-40, -44, 80, 22);
  c.strokeStyle = 'rgba(40,40,45,.8)'; c.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(-28 + i * 14, -46, 3, 0, Math.PI * 2); c.stroke(); }
  txt(c, 'OCT', 0, -33, '700 13px "Noto Sans TC", sans-serif', '#fff');
  txt(c, '25', 0, 6, '900 40px "Noto Serif TC", serif', 'rgba(40,40,45,.85)');
  txt(c, T('星期日', 'SUNDAY'), 0, 34, '500 11px "Noto Sans TC", sans-serif', 'rgba(40,40,45,.7)');
}
function drawSticky(c) {
  c.fillStyle = 'rgba(255,224,80,.92)'; c.fillRect(-28, -28, 56, 56);
  poly(c, [28, 16, 28, 28, 16, 28], 'rgba(200,160,30,.7)');
  pencilRect(c, -28, -28, 56, 56, 1, 0.5);
  txt(c, T('買牛奶', 'Buy milk'), 0, -6, '700 13px "Noto Sans TC", sans-serif', 'rgba(40,40,45,.85)');
  txt(c, T('還有蛋', 'and eggs'), 0, 12, '500 11px "Noto Sans TC", sans-serif', 'rgba(40,40,45,.7)');
}
function drawBook(c) {
  c.fillStyle = 'rgba(64,110,170,.65)'; c.fillRect(-17, -40, 34, 80); pencilRect(c, -17, -40, 34, 80, 1.4, 0.85);
  pencilLine(c, -17, -30, 17, -30, 1, 0.6); pencilLine(c, -17, 30, 17, 30, 1, 0.6);
  c.save(); c.rotate(-Math.PI / 2); txt(c, T('國語辭典', 'DICTIONARY'), 0, 0, '700 13px "Noto Sans TC", sans-serif', '#fffdf8'); c.restore();
}
function drawLaptop(c) {
  c.fillStyle = '#fbfaf6'; c.fillRect(-55, -40, 110, 66); pencilRect(c, -55, -40, 110, 66, 1.5, 0.9);
  c.fillStyle = 'rgba(40,50,70,.82)'; c.fillRect(-49, -34, 98, 54);
  const cols = ['#7ee2a8', '#ffd479', '#9ecbff', '#ff9fb2'];
  for (let i = 0; i < 6; i++) { c.fillStyle = cols[i % 4]; c.fillRect(-42 + (i % 3) * 6, -28 + i * 8, 22 + ((i * 17) % 40), 3); }
  poly(c, [-62, 26, 62, 26, 68, 40, -68, 40], '#efe9dc');
  pencilLine(c, -62, 26, 62, 26, 1.3, 0.85); pencilLine(c, -68, 40, 68, 40, 1.3, 0.85); pencilLine(c, -62, 26, -68, 40, 1.3, 0.85); pencilLine(c, 62, 26, 68, 40, 1.3, 0.85);
  pencilRect(c, -12, 31, 24, 5, 0.9, 0.6);
}
function drawRuler(c) {
  c.fillStyle = 'rgba(250,236,200,.95)'; c.fillRect(-75, -11, 150, 22); pencilRect(c, -75, -11, 150, 22, 1.3, 0.85);
  c.strokeStyle = 'rgba(40,40,45,.8)'; c.lineWidth = 0.7;
  for (let i = 0; i <= 140; i += 2) {
    const len = i % 10 === 0 ? 8 : i % 5 === 0 ? 6 : 3.5;
    c.beginPath(); c.moveTo(-70 + i, -11); c.lineTo(-70 + i, -11 + len); c.stroke();
    if (i % 20 === 0) txt(c, String(i / 10), -70 + i, 4, '600 7px "JetBrains Mono", monospace', 'rgba(40,40,45,.8)');
  }
  txt(c, 'cm', 64, 5, '600 6px "JetBrains Mono", monospace', 'rgba(40,40,45,.7)');
}

/* ===== shared sketch helpers for stages 2-10 ===== */
const INK = a => `rgba(40,40,45,${a})`;
const PAPER = '#fbfaf6';
// Sketchy outline: the path is drawn twice, the second pass a little offset and lighter.
function sk(c, path, w = 1.2, a = 0.8, fill) {
  if (fill) { c.fillStyle = fill; c.beginPath(); path(c); c.fill(); }
  c.lineJoin = 'round'; c.lineCap = 'round';
  c.strokeStyle = INK(a); c.lineWidth = w; c.beginPath(); path(c); c.stroke();
  c.save(); c.translate(0.7, -0.5); c.strokeStyle = INK(a * 0.35); c.lineWidth = w * 0.7; c.beginPath(); path(c); c.stroke(); c.restore();
}
const skE = (c, x, y, rx, ry, fill, w = 1.2, a = 0.8, rot = 0) => sk(c, p => p.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2), w, a, fill);
const skR = (c, x, y, w, h, r, fill, lw = 1.3, a = 0.85) => sk(c, p => rr(p, x, y, w, h, r), lw, a, fill);
const skP = (c, pts, fill, w = 1.2, a = 0.8, open) => sk(c, p => { p.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) p.lineTo(pts[i], pts[i + 1]); if (!open) p.closePath(); }, w, a, fill);
function ln(c, fn, w = 1, col = INK(0.7)) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); fn(c); c.stroke(); }
function wall(c, col, to, gap = 9, a = 0.06) {
  c.fillStyle = col; c.fillRect(0, 0, W, H);
  c.globalAlpha = 0.05; c.drawImage(GRAIN, 0, 0, W, H); c.globalAlpha = 1;
  if (to) hatch(c, 0, 0, W, to, gap, a);
}
function boards(c, y0, col, step = 16) {
  c.fillStyle = col; c.fillRect(0, y0, W, H - y0);
  c.strokeStyle = 'rgba(120,90,50,.22)'; c.lineWidth = 0.9;
  for (let y = y0 + step; y < H; y += step) { c.beginPath(); c.moveTo(0, y); for (let x = 0; x <= W; x += 30) c.lineTo(x, y + Math.sin(x / 40 + y) * 1.5); c.stroke(); }
  pencilLine(c, 0, y0, W, y0, 1.5, 0.85);
}
function heart(c, x, y, s, fill) {
  c.beginPath(); c.moveTo(x, y + s * 0.9);
  c.bezierCurveTo(x - s * 1.4, y - s * 0.1, x - s * 0.6, y - s * 1.1, x, y - s * 0.35);
  c.bezierCurveTo(x + s * 0.6, y - s * 1.1, x + s * 1.4, y - s * 0.1, x, y + s * 0.9);
  c.fillStyle = fill; c.fill();
}
// Text that must fit its label even before the web font is ready.
function fit(c, s, x, y, maxW, font, col, align = 'center') {
  c.font = font; const w = c.measureText(s).width;
  if (w <= maxW) return txt(c, s, x, y, font, col, align);
  c.save(); c.translate(x, y); c.scale(maxW / w, 1); txt(c, s, 0, 0, font, col, align); c.restore();
}
const hand = (px, wt = 700) => `${wt} ${px}px Caveat, "Noto Sans TC", cursive`;
const sans = (px, wt = 700) => `${wt} ${px}px "Noto Sans TC", sans-serif`;
const RED = 'rgba(214,72,60,.8)', BLUE = 'rgba(64,110,170,.7)', SUN = 'rgba(255,214,90,.85)', LEAF = 'rgba(110,165,100,.65)', WOOD = 'rgba(190,140,85,.6)';

/* ===== 4-2 Kitchen table ===== */
function bgKitchen(c) {
  wall(c, '#f6f2e9', 246);
  const g = c.createRadialGradient(160, 70, 4, 160, 130, 140); g.addColorStop(0, 'rgba(255,220,130,.35)'); g.addColorStop(1, 'rgba(255,220,130,0)');
  c.fillStyle = g; c.fillRect(10, 40, 300, 230);
  // window, hills, clouds
  c.fillStyle = 'rgba(150,200,235,.4)'; c.fillRect(224, 36, 100, 98);
  poly(c, [224, 134, 224, 116, 252, 106, 280, 120, 302, 110, 324, 117, 324, 134], 'rgba(120,170,110,.45)');
  ell(c, 252, 66, 16, 6, 'rgba(255,255,255,.85)'); ell(c, 266, 61, 11, 7, 'rgba(255,255,255,.85)'); ell(c, 304, 92, 12, 5, 'rgba(255,255,255,.75)');
  pencilRect(c, 224, 36, 100, 98, 1.4, 0.85); pencilLine(c, 274, 36, 274, 134, 1, 0.6); pencilLine(c, 224, 85, 324, 85, 1, 0.6);
  skR(c, 216, 134, 116, 8, 2, '#efe6d4', 1.1, 0.8);
  skR(c, 292, 120, 18, 14, 2, 'rgba(200,110,80,.6)', 1, 0.7);
  [[-5, -10, -0.5], [5, -12, 0.4], [0, -16, 0]].forEach(([dx, dy, r]) => ell(c, 301 + dx, 120 + dy, 4, 8, LEAF, r));
  // gingham curtains
  pencilLine(c, 206, 26, 342, 26, 1.6, 0.85);
  for (const [x0, d] of [[210, 1], [338, -1]]) {
    const cur = p => { p.moveTo(x0, 26); p.lineTo(x0 + d * 30, 26); p.quadraticCurveTo(x0 + d * 10, 80, x0 + d * 20, 128); p.lineTo(x0, 128); p.closePath(); };
    c.save(); c.beginPath(); cur(c); c.fillStyle = 'rgba(255,255,255,.75)'; c.fill(); c.clip();
    c.fillStyle = 'rgba(214,72,60,.16)';
    for (let x = x0 - 32; x < x0 + 32; x += 8) c.fillRect(x, 26, 4, 102);
    for (let y = 26; y < 128; y += 8) c.fillRect(x0 - 32, y, 64, 4);
    c.restore();
    sk(c, p => { p.moveTo(x0 + d * 30, 26); p.quadraticCurveTo(x0 + d * 10, 80, x0 + d * 20, 128); p.lineTo(x0, 128); }, 1.1, 0.7);
  }
  // pendant lamp
  pencilLine(c, 160, 0, 160, 42, 1, 0.7);
  skP(c, [142, 42, 178, 42, 194, 66, 126, 66], 'rgba(255,214,90,.6)', 1.3, 0.85);
  skE(c, 160, 68, 8, 4, 'rgba(255,244,200,.95)', 1, 0.6);
  // chair back behind the table
  skR(c, 14, 186, 62, 10, 4, 'rgba(170,120,70,.55)', 1.1, 0.8);
  for (const x of [17, 67]) skR(c, x, 196, 6, 52, 2, 'rgba(170,120,70,.5)', 1, 0.7);
  for (const x of [34, 45, 56]) pencilLine(c, x, 196, x, 246, 0.9, 0.5);
  // floor
  boards(c, 448, '#ebe3d3', 11);
  // table top
  poly(c, [16, 246, 344, 246, 360, 300, 0, 300], '#f3ecdd');
  c.strokeStyle = 'rgba(120,90,50,.14)'; c.lineWidth = 0.8;
  for (const y of [258, 270, 284]) { c.beginPath(); c.moveTo(12, y); c.lineTo(348, y); c.stroke(); }
  pencilLine(c, 16, 246, 344, 246, 1.4, 0.85); pencilLine(c, 16, 246, 0, 300, 1, 0.6); pencilLine(c, 344, 246, 360, 300, 1, 0.6);
  // table legs, then the gingham drop
  for (const x of [34, 314]) skR(c, x, 380, 12, 72, 2, 'rgba(170,120,70,.55)', 1.1, 0.8);
  c.fillStyle = '#fbf8f1'; c.fillRect(0, 300, W, 84);
  c.save(); c.beginPath(); c.rect(0, 300, W, 84); c.clip();
  c.fillStyle = 'rgba(214,72,60,.15)';
  for (let x = 0; x < W; x += 16) c.fillRect(x, 300, 8, 84);
  for (let y = 300; y < 384; y += 16) c.fillRect(0, y, W, 8);
  c.restore();
  for (let x = 0; x < W; x += 20) { c.beginPath(); c.arc(x + 10, 384, 10, 0, Math.PI); c.fillStyle = '#fbf8f1'; c.fill(); c.strokeStyle = INK(0.55); c.lineWidth = 1; c.stroke(); }
  pencilLine(c, 0, 300, W, 300, 1.6, 0.9);
  for (const x of [70, 150, 230, 300]) pencilLine(c, x, 306, x - 4, 382, 0.8, 0.25);
  // dog bowl
  skP(c, [94, 456, 146, 456, 138, 472, 102, 472], 'rgba(64,110,170,.55)', 1.2, 0.85);
  skE(c, 120, 456, 26, 5, 'rgba(230,200,150,.9)', 1, 0.7);
  ln(c, p => { p.moveTo(112, 464); p.lineTo(128, 464); }, 2.4, 'rgba(255,255,255,.9)');
}
function drawClock(c, a) {
  skE(c, 0, 0, 41, 41, 'rgba(214,72,60,.6)', 1.6, 0.9);
  skE(c, 0, 0, 34, 34, '#fffdf8', 1, 0.6);
  c.strokeStyle = INK(0.75); c.lineWidth = 1.2; c.beginPath();
  for (let i = 0; i < 12; i++) { const t = i * Math.PI / 6, r0 = i % 3 ? 29.5 : 27; c.moveTo(Math.sin(t) * r0, -Math.cos(t) * r0); c.lineTo(Math.sin(t) * 32.5, -Math.cos(t) * 32.5); }
  c.stroke();
  [['12', 0, -20], ['3', 21, 0], ['6', 0, 20], ['9', -21, 0]].forEach(([s, x, y]) => txt(c, s, x, y, '700 9px "JetBrains Mono", monospace', INK(0.8)));
  const hnd = (deg, len, w, col) => { const t = deg * Math.PI / 180; ln(c, p => { p.moveTo(-Math.sin(t) * 4, Math.cos(t) * 4); p.lineTo(Math.sin(t) * len, -Math.cos(t) * len); }, w, col); };
  hnd(305, 16, 3, INK(0.85)); hnd(60, 25, 2, INK(0.85)); hnd(Math.floor(a.t) * 6, 27, 1, 'rgba(214,72,60,.9)');
  circ(c, 0, 0, 2.5, INK(0.9));
}
function drawSpices(c) {
  const jars = [[-40, 42, RED, '#fffdf8', T('鹽', 'Salt')], [0, 36, 'rgba(120,170,110,.8)', 'rgba(250,240,215,.95)', T('糖', 'Sugar')], [40, 40, SUN, 'rgba(120,105,90,.55)', T('胡椒', 'Pepper')]];
  for (const [x, h, lid, fill, label] of jars) {
    skR(c, x - 14, 22 - h, 28, h - 6, 5, 'rgba(225,240,245,.6)', 1.2, 0.8);
    c.fillStyle = fill; c.fillRect(x - 11, 16 - h * 0.62, 22, h * 0.62 - 3);
    skR(c, x - 15, 16 - h, 30, 8, 2, lid, 1.2, 0.85);
    skR(c, x - 12, 9 - h * 0.45, 24, 13, 1, '#fffdf8', 0.8, 0.6);
    fit(c, label, x, 15.5 - h * 0.45, 21, hand(11), INK(0.85));
  }
  skR(c, -64, 16, 128, 8, 2, 'rgba(170,120,70,.65)', 1.3, 0.85);
  skP(c, [-50, 24, -42, 24, -50, 28], 'rgba(170,120,70,.65)', 0.9, 0.7); skP(c, [50, 24, 42, 24, 50, 28], 'rgba(170,120,70,.65)', 0.9, 0.7);
}
function drawPlaceSet(c) {
  skR(c, -74, -2, 148, 22, 4, 'rgba(120,170,110,.45)', 1.2, 0.75);
  c.strokeStyle = 'rgba(60,100,60,.28)'; c.lineWidth = 0.8; c.beginPath();
  for (let x = -68; x < 72; x += 6) { c.moveTo(x, 1); c.lineTo(x, 17); }
  c.stroke();
  // tea cup
  sk(c, p => { p.moveTo(-62, -12); p.lineTo(-60, 4); p.quadraticCurveTo(-52, 8, -44, 4); p.lineTo(-42, -12); p.closePath(); }, 1.1, 0.8, '#fffdf8');
  sk(c, p => p.arc(-41, -4, 5, -Math.PI / 2, Math.PI / 2), 1, 0.7);
  ell(c, -52, -12, 10, 2.2, 'rgba(190,150,80,.6)');
  // rice bowl
  sk(c, p => p.ellipse(0, -6, 20, 12, 0, Math.PI, 0), 1, 0.6, '#ffffff');
  for (const [x, y] of [[-8, -10], [0, -14], [7, -9], [-2, -8], [12, -12]]) ell(c, x, y, 1.8, 1, 'rgba(200,200,190,.7)');
  sk(c, p => { p.moveTo(-23, -6); p.quadraticCurveTo(-21, 12, 0, 13); p.quadraticCurveTo(21, 12, 23, -6); p.closePath(); }, 1.2, 0.85, '#fffdf8');
  ln(c, p => { p.moveTo(-20, 1); p.quadraticCurveTo(0, 6, 20, 1); }, 2.4, 'rgba(64,110,170,.55)');
  skR(c, -8, 12, 16, 4, 1, '#fffdf8', 1, 0.7);
  // chopsticks on their rest
  skE(c, 54, 10, 5, 3, 'rgba(214,72,60,.6)', 0.9, 0.6);
  pencilLine(c, 30, 4, 72, 6, 1.6, 0.85); pencilLine(c, 30, 8, 72, 8, 1.6, 0.85);
}
function drawPuppy(c, a) {
  const tan = 'rgba(205,150,90,.72)', cream = 'rgba(250,236,210,.97)', dark = 'rgba(130,85,50,.75)', wag = Math.sin(a.t * 9) * a.live;
  ln(c, p => { p.moveTo(16, 36); p.quadraticCurveTo(32, 32, 32 + wag * 5, 12); }, 6, tan);
  sk(c, p => { p.moveTo(16, 36); p.quadraticCurveTo(32, 32, 32 + wag * 5, 12); }, 0.9, 0.5);
  skE(c, 0, 22, 25, 24, tan, 1.3, 0.85);
  skE(c, 0, 25, 12, 16, cream, 0.8, 0.35);
  pencilLine(c, -8, 30, -10, 42, 0.9, 0.5); pencilLine(c, 8, 30, 10, 42, 0.9, 0.5);
  skE(c, -11, 45, 9, 4, cream, 1, 0.7); skE(c, 11, 45, 9, 4, cream, 1, 0.7);
  skE(c, -22, -16, 8, 15, dark, 1.1, 0.8, 0.35); skE(c, 22, -16, 8, 15, dark, 1.1, 0.8, -0.35);
  skE(c, 0, -20, 23, 20, tan, 1.3, 0.85);
  skE(c, 0, -10, 11, 8, cream, 0.9, 0.5);
  ell(c, 0, -14, 4, 3, INK(0.9));
  ln(c, p => { p.moveTo(0, -11); p.lineTo(0, -7); p.moveTo(-5, -6); p.quadraticCurveTo(0, -3, 5, -6); }, 1, INK(0.7));
  ell(c, 0, -3.5, 3, 3, 'rgba(240,120,130,.85)');
  circ(c, -9, -23, 2.8, INK(0.9)); circ(c, 9, -23, 2.8, INK(0.9)); circ(c, -8, -24, 1, '#fff'); circ(c, 10, -24, 1, '#fff');
  ell(c, -15, -13, 4, 2.4, 'rgba(240,120,130,.35)'); ell(c, 15, -13, 4, 2.4, 'rgba(240,120,130,.35)');
  ln(c, p => { p.moveTo(-15, -1); p.quadraticCurveTo(0, 5, 15, -1); }, 4, 'rgba(214,72,60,.85)');
  circ(c, 0, 5, 3, 'rgba(255,200,70,1)');
  ln(c, p => { p.moveTo(-4, -39); p.lineTo(-2, -45); p.moveTo(1, -40); p.lineTo(3, -46); }, 1, INK(0.6));
}

/* ===== 4-3 Bathroom tiles ===== */
function bgBath(c) {
  wall(c, '#f3f4ef');
  c.fillStyle = 'rgba(150,200,205,.3)'; c.fillRect(0, 0, W, 336);
  c.fillStyle = 'rgba(255,255,255,.45)';
  for (let r = 0; r < 7; r++) for (let k = 0; k < 8; k++) c.fillRect(k * 48 + 6, r * 48 + 6, 12, 2);
  for (let r = 0; r < 7; r++) for (let k = 0; k < 8; k++) if ((r * 3 + k) % 4 === 0) hatch(c, k * 48 + 26, r * 48 + 26, 18, 18, 4, 0.08);
  // the empty slot behind the patterned tile
  c.fillStyle = 'rgba(150,135,110,.45)'; c.fillRect(192, 240, 48, 48);
  for (let i = 0; i < 7; i++) pencilLine(c, 195, 245 + i * 6.5, 237, 245 + i * 6.5, 0.6, 0.3);
  for (let x = 0; x <= W; x += 48) pencilLine(c, x, 0, x, 336, 0.8, 0.45);
  for (let y = 0; y <= 336; y += 48) pencilLine(c, 0, y, W, y, 0.8, 0.45);
  // floor
  c.fillStyle = 'rgba(200,190,175,.35)'; c.fillRect(0, 336, W, 144);
  for (const y of [350, 368, 392, 422, 458]) pencilLine(c, 0, y, W, y, 0.8, 0.35);
  for (let x = -360; x <= 720; x += 60) pencilLine(c, 180 + (x - 180) * 0.45, 336, x, 480, 0.8, 0.3);
  pencilLine(c, 0, 336, W, 336, 1.6, 0.85);
  // bath mat
  skR(c, 16, 420, 112, 40, 6, 'rgba(240,160,170,.45)', 1.2, 0.75);
  for (let x = 26; x < 124; x += 8) pencilLine(c, x, 424, x, 456, 0.7, 0.25);
  // pedestal sink + faucet + soap
  skP(c, [86, 240, 114, 240, 120, 380, 130, 394, 70, 394, 80, 380], PAPER, 1.3, 0.85);
  hatch(c, 104, 250, 12, 130, 4, 0.14);
  sk(c, p => { p.moveTo(28, 214); p.lineTo(172, 214); p.lineTo(170, 222); p.quadraticCurveTo(160, 248, 100, 250); p.quadraticCurveTo(40, 248, 30, 222); p.closePath(); }, 1.4, 0.9, PAPER);
  pencilLine(c, 30, 222, 170, 222, 0.9, 0.5);
  skR(c, 96, 196, 8, 18, 2, 'rgba(200,200,210,.95)', 1, 0.8); skR(c, 96, 194, 20, 7, 3, 'rgba(200,200,210,.95)', 1, 0.8);
  skE(c, 84, 208, 5, 3, 'rgba(200,200,210,.95)', 0.9, 0.7); skE(c, 122, 208, 5, 3, 'rgba(200,200,210,.95)', 0.9, 0.7);
  skR(c, 134, 207, 22, 8, 4, 'rgba(120,180,140,.75)', 1, 0.75);
  // corner caddy with (perfectly straight) bottles
  for (const [x, w, h, col] of [[256, 18, 40, 'rgba(240,160,170,.7)'], [280, 16, 32, 'rgba(120,180,200,.7)'], [302, 20, 44, 'rgba(255,214,90,.75)'], [328, 12, 26, 'rgba(160,140,200,.6)']]) {
    skR(c, x, 246 - h, w, h, 4, col, 1, 0.75); skR(c, x + w / 2 - 3, 240 - h, 6, 7, 1, col, 0.8, 0.6);
  }
  skR(c, 248, 246, 102, 6, 2, 'rgba(200,200,210,.95)', 1.1, 0.85);
  // bathtub with foam
  for (const [x, y, r] of [[176, 328, 9], [196, 324, 11], [214, 330, 8], [306, 326, 10], [326, 322, 12], [344, 330, 7], [230, 330, 6], [292, 331, 7]]) skE(c, x, y, r, r * 0.8, '#ffffff', 0.9, 0.45);
  skR(c, 156, 330, 200, 14, 7, PAPER, 1.5, 0.9);
  sk(c, p => { p.moveTo(162, 344); p.lineTo(350, 344); p.quadraticCurveTo(348, 446, 300, 452); p.lineTo(212, 452); p.quadraticCurveTo(164, 446, 162, 344); p.closePath(); }, 1.4, 0.85, PAPER);
  hatch(c, 312, 352, 30, 84, 4, 0.12);
  for (const x of [204, 300]) skP(c, [x, 450, x + 16, 450, x + 18, 466, x - 2, 466], 'rgba(220,180,90,.8)', 1, 0.8);
}
function drawMirror(c) {
  skR(c, -57, -59, 114, 118, 16, 'rgba(170,120,70,.5)', 1.6, 0.9);
  skR(c, -49, -51, 98, 102, 10, 'rgba(190,222,232,.8)', 1.1, 0.7);
  ln(c, p => { p.moveTo(-34, 26); p.lineTo(6, -34); p.moveTo(-18, 34); p.lineTo(20, -22); }, 3, 'rgba(255,255,255,.85)');
  hatch(c, 18, 18, 26, 28, 4, 0.12);
}
function drawCup(c) {
  pencilLine(c, -3, 4, -10, -16, 2.2, 0.75); skR(c, -15, -27, 8, 12, 2, 'rgba(240,140,160,.8)', 0.9, 0.7);
  pencilLine(c, 3, 4, 9, -18, 2.2, 0.75); skR(c, 6, -28, 8, 12, 2, 'rgba(120,180,140,.85)', 0.9, 0.7);
  skP(c, [-15, -3, 15, -3, 12, 26, -12, 26], 'rgba(120,180,200,.6)', 1.3, 0.85);
  skE(c, 0, -3, 15, 3, 'rgba(160,205,220,.9)', 1, 0.7);
  ln(c, p => { p.moveTo(-11, 10); p.quadraticCurveTo(-6, 6, 0, 10); p.quadraticCurveTo(6, 14, 11, 10); }, 1.2, 'rgba(255,255,255,.8)');
}
function drawTowel(c) {
  skE(c, -42, -56, 4, 4, '#d9d9de', 1, 0.8); skE(c, 42, -56, 4, 4, '#d9d9de', 1, 0.8);
  skR(c, -40, -59, 80, 5, 2.5, 'rgba(205,205,215,.95)', 1.1, 0.85);
  skR(c, -32, -58, 64, 120, 6, 'rgba(140,185,220,.6)', 1.2, 0.75);
  c.strokeStyle = INK(0.4); c.lineWidth = 0.8; c.beginPath();
  for (let x = -28; x <= 28; x += 4) { c.moveTo(x, 62); c.lineTo(x, 66); }
  c.stroke();
  sk(c, p => { p.moveTo(-34, -60); p.quadraticCurveTo(0, -66, 34, -60); p.lineTo(34, 48); p.lineTo(-34, 48); p.closePath(); }, 1.3, 0.85, 'rgba(175,212,236,.95)');
  c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(-34, 28, 68, 5);
  c.fillStyle = 'rgba(214,72,60,.5)'; c.fillRect(-34, 36, 68, 3);
  c.strokeStyle = INK(0.45); c.beginPath();
  for (let x = -32; x <= 32; x += 4) { c.moveTo(x, 48); c.lineTo(x, 53); }
  c.stroke();
  hatch(c, 18, -54, 16, 100, 4, 0.12);
  for (const x of [-20, -6, 8]) pencilLine(c, x, -50, x - 1, 22, 0.6, 0.2);
}
function drawTile(c) {
  c.fillStyle = '#e6f0ee'; c.fillRect(-23, -23, 46, 46);
  c.save(); c.beginPath(); c.rect(-23, -23, 46, 46); c.clip();
  c.strokeStyle = 'rgba(50,90,160,.75)'; c.lineWidth = 1.4;
  for (const [x, y] of [[-23, -23], [23, -23], [23, 23], [-23, 23]]) { c.beginPath(); c.arc(x, y, 10, 0, Math.PI * 2); c.stroke(); }
  c.restore();
  for (let k = 0; k < 4; k++) { const t = k * Math.PI / 2 + Math.PI / 4; ell(c, Math.cos(t) * 9, Math.sin(t) * 9, 7, 3.5, 'rgba(64,110,170,.6)', t); }
  for (let k = 0; k < 4; k++) { const t = k * Math.PI / 2; ell(c, Math.cos(t) * 8, Math.sin(t) * 8, 2.4, 2.4, 'rgba(120,170,110,.8)'); }
  circ(c, 0, 0, 3.5, 'rgba(255,200,70,.95)');
  pencilRect(c, -23, -23, 46, 46, 1.1, 0.75);
}
function drawDuck(c) {
  const Y = 'rgba(255,205,60,.95)';
  sk(c, p => { p.moveTo(-18, 4); p.quadraticCurveTo(-20, 22, 2, 22); p.quadraticCurveTo(24, 22, 26, 6); p.quadraticCurveTo(27, -4, 20, -6); p.quadraticCurveTo(14, 2, 2, 2); p.closePath(); }, 1.3, 0.85, Y);
  skE(c, -8, -9, 13, 13, Y, 1.3, 0.85);
  sk(c, p => { p.moveTo(-19, -9); p.quadraticCurveTo(-28, -8, -26, -3); p.quadraticCurveTo(-22, -1, -17, -4); p.closePath(); }, 1, 0.8, 'rgba(240,140,60,.95)');
  circ(c, -10, -12, 2.2, INK(0.9)); circ(c, -9.3, -12.8, 0.8, '#fff');
  ell(c, -3, -4, 3, 2, 'rgba(240,120,130,.45)');
  sk(c, p => { p.moveTo(4, 8); p.quadraticCurveTo(12, 1, 18, 10); p.quadraticCurveTo(12, 16, 4, 8); }, 1, 0.7, 'rgba(240,180,40,.85)');
  skE(c, -1, -21, 3, 3, 'rgba(255,255,255,.85)', 0.7, 0.4);
}

/* ===== 4-4 Wardrobe ===== */
function bgWardrobe(c) {
  wall(c, '#efe8dc');
  c.fillStyle = 'rgba(205,165,110,.32)'; c.fillRect(22, 0, 316, H);
  for (let x = 74; x < 338; x += 52) pencilLine(c, x, 40, x, 300, 0.8, 0.25);
  c.strokeStyle = 'rgba(140,95,50,.14)'; c.lineWidth = 0.9;
  for (let x = 34; x < 330; x += 26) { c.beginPath(); c.moveTo(x, 44); for (let y = 44; y <= 298; y += 18) c.lineTo(x + Math.sin(y / 30 + x) * 4, y); c.stroke(); }
  c.fillStyle = 'rgba(160,110,60,.42)'; c.fillRect(0, 0, 22, H); c.fillRect(338, 0, 22, H);
  hatch(c, 0, 0, 22, H, 4, 0.22); hatch(c, 338, 0, 22, H, 4, 0.22);
  pencilLine(c, 22, 0, 22, H, 1.4, 0.85); pencilLine(c, 338, 0, 338, H, 1.4, 0.85);
  // top shelf with a hat box and blankets
  skR(c, 44, 6, 62, 24, 4, 'rgba(240,200,200,.75)', 1.2, 0.8); pencilLine(c, 75, 6, 75, 30, 1.6, 0.5);
  skR(c, 248, 12, 74, 9, 3, 'rgba(110,160,210,.55)', 1, 0.75); skR(c, 252, 21, 68, 9, 3, 'rgba(255,214,90,.6)', 1, 0.75);
  skR(c, 22, 30, 316, 9, 1, 'rgba(190,140,85,.65)', 1.2, 0.85);
  c.fillStyle = 'rgba(80,50,20,.08)'; c.fillRect(22, 39, 316, 10);
  // hanging rod
  skR(c, 24, 58, 8, 16, 2, 'rgba(170,170,180,.9)', 1, 0.8); skR(c, 328, 58, 8, 16, 2, 'rgba(170,170,180,.9)', 1, 0.8);
  skR(c, 22, 64, 316, 6, 3, 'rgba(195,195,205,.97)', 1.2, 0.85);
  // the string joining the two mittens
  sk(c, p => { p.moveTo(236, 180); p.quadraticCurveTo(246, 192, 256, 180); }, 1, 0.7);
  // middle shelf and drawers
  c.fillStyle = 'rgba(80,50,20,.07)'; c.fillRect(22, 292, 316, 8);
  skR(c, 22, 300, 316, 12, 1, 'rgba(190,140,85,.7)', 1.3, 0.9);
  sk(c, p => { p.moveTo(232, 326); p.quadraticCurveTo(236, 306, 246, 314); p.lineTo(252, 318); p.quadraticCurveTo(246, 324, 244, 330); p.closePath(); }, 1, 0.8, 'rgba(255,214,90,.9)');
  ln(c, p => { p.moveTo(238, 314); p.lineTo(244, 318); }, 1.6, 'rgba(214,72,60,.7)');
  [[322, T('襪子', 'Socks')], [398, T('冬衣', 'Winter')]].forEach(([y, label]) => {
    skR(c, 32, y, 296, 70, 3, 'rgba(215,180,130,.6)', 1.3, 0.85); skR(c, 160, y + 31, 40, 8, 4, 'rgba(160,160,170,.85)', 1, 0.8); hatch(c, 34, y + 56, 292, 12, 4, 0.1);
    skR(c, 162, y + 10, 36, 14, 1, 'rgba(200,200,208,.9)', 0.9, 0.7); c.fillStyle = '#fffdf6'; c.fillRect(165, y + 12.5, 30, 9);
    fit(c, label, 180, y + 17.5, 28, hand(10), INK(0.8));
  });
  c.fillStyle = 'rgba(160,110,60,.45)'; c.fillRect(22, 470, 316, 10);
}
const SHIRT = p => { p.moveTo(-42, -52); p.lineTo(-14, -60); p.lineTo(0, -50); p.lineTo(14, -60); p.lineTo(42, -52); p.lineTo(36, 70); p.quadraticCurveTo(0, 80, -36, 70); p.closePath(); };
function drawShirt(c) {
  const B = 'rgba(120,165,215,.55)';
  for (const s of [-1, 1]) sk(c, p => { p.moveTo(40 * s, -50); p.lineTo(52 * s, -4); p.lineTo(50 * s, 30); p.lineTo(38 * s, 30); p.lineTo(34 * s, -20); p.closePath(); }, 1.2, 0.8, B);
  sk(c, SHIRT, 1.4, 0.85, B);
  c.save(); c.beginPath(); SHIRT(c); c.clip();
  c.fillStyle = 'rgba(255,255,255,.35)'; for (let x = -40; x < 42; x += 10) c.fillRect(x, -62, 3, 142);
  c.fillStyle = 'rgba(64,110,170,.16)'; for (let y = -56; y < 80; y += 10) c.fillRect(-44, y, 88, 3);
  c.restore();
  ln(c, p => { p.moveTo(-44, -49); p.quadraticCurveTo(-20, -63, 0, -63); p.quadraticCurveTo(20, -63, 44, -49); }, 4, 'rgba(190,140,85,.9)');
  sk(c, p => { p.moveTo(0, -63); p.lineTo(-1, -70); p.quadraticCurveTo(-2, -78, 4, -78); p.quadraticCurveTo(9, -77, 8, -71); }, 1.6, 0.85);
  skP(c, [-14, -60, 0, -50, -9, -42, -19, -55], '#fbfaf6', 1, 0.8); skP(c, [14, -60, 0, -50, 9, -42, 19, -55], '#fbfaf6', 1, 0.8);
  pencilLine(c, 0, -50, 0, 74, 0.9, 0.5);
  for (const y of [-36, -16, 4, 24, 44]) { circ(c, 3, y, 1.9, PAPER); }
  skR(c, -28, -32, 16, 18, 2, null, 0.9, 0.6);
}
function mitten(c, s) {
  const R = 'rgba(214,72,60,.62)';
  sk(c, p => { p.moveTo(15 * s, -38); p.quadraticCurveTo(25 * s, -30, 24.5 * s, 0); p.quadraticCurveTo(24 * s, 40, 26 * s, 56); }, 1, 0.7);
  sk(c, p => { p.moveTo(-15, -30); p.lineTo(-17, 20); p.quadraticCurveTo(-16, 40, 0, 40); p.quadraticCurveTo(16, 40, 17, 20); p.lineTo(15, -30); p.closePath(); }, 1.3, 0.85, R);
  skE(c, 15 * s, 4, 6, 11, R, 1.1, 0.8, 0.25 * s);
  heart(c, -1 * s, 14, 6, 'rgba(255,255,255,.9)');
  c.fillStyle = 'rgba(255,255,255,.75)'; c.fillRect(-16, -16, 32, 4);
  skR(c, -17, -44, 34, 16, 3, '#fbf3e6', 1.2, 0.85);
  c.strokeStyle = INK(0.3); c.lineWidth = 0.8; c.beginPath(); for (let x = -12; x <= 12; x += 4) { c.moveTo(x, -42); c.lineTo(x, -30); } c.stroke();
  skR(c, -4, -60, 8, 20, 2, 'rgba(190,150,100,.95)', 1, 0.8); circ(c, 0, -51, 1.5, INK(0.7));
}
const drawMittenL = c => mitten(c, 1), drawMittenR = c => mitten(c, -1);
function drawSweaters(c) {
  const layer = (y, h, w, col) => {
    skR(c, -w / 2, y, w, h, 5, col, 1.2, 0.8);
    c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 0.8; c.beginPath();
    for (let x = -w / 2 + 8; x < w / 2 - 6; x += 7) { const m = y + h / 2 + 1; c.moveTo(x - 2, m - 2); c.lineTo(x, m + 1); c.lineTo(x + 2, m - 2); }
    c.stroke();
    pencilLine(c, -w / 2 + 6, y + 4, w / 2 - 6, y + 4, 0.7, 0.3);
  };
  layer(9, 21, 110, 'rgba(240,230,210,.97)');
  layer(-11, 20, 104, 'rgba(255,200,80,.72)');
  layer(-30, 19, 96, 'rgba(120,170,110,.62)');
  sk(c, p => { p.moveTo(-14, -30); p.quadraticCurveTo(0, -22, 14, -30); }, 1, 0.7);
}
function drawSleepyCat(c, a) {
  const br = 1 + Math.sin(a.t * 2) * 0.05 * a.live, G = 'rgba(160,160,172,.62)';
  skE(c, 6, 7, 44, 16 * br, G, 1.3, 0.85);
  for (let k = 0; k < 4; k++) ln(c, p => { p.moveTo(-4 + k * 12, -8); p.quadraticCurveTo(-1 + k * 12, -2, -4 + k * 12, 4); }, 1.4, 'rgba(90,90,100,.45)');
  skP(c, [-45, -5, -41, -21, -33, -10], G, 1.1, 0.8); skP(c, [-29, -11, -21, -22, -17, -7], G, 1.1, 0.8);
  skE(c, -32, 2, 16, 13, G, 1.3, 0.85);
  ln(c, p => { p.moveTo(-41, 0); p.quadraticCurveTo(-38, 3, -35, 0); p.moveTo(-29, 0); p.quadraticCurveTo(-26, 3, -23, 0); }, 1.1, INK(0.8));
  ell(c, -32, 6, 2, 1.4, 'rgba(240,130,140,.9)');
  ln(c, p => { p.moveTo(48, 12); p.quadraticCurveTo(30, 26, -10, 19); }, 7, 'rgba(130,130,142,.85)');
  sk(c, p => { p.moveTo(48, 12); p.quadraticCurveTo(30, 26, -10, 19); }, 0.8, 0.5);
  skE(c, -16, 15, 7, 4, '#eeeef2', 1, 0.7);
  if (a.live > 0.05) {
    const z = (a.t * 0.6) % 1;
    c.globalAlpha = a.live * (1 - z);
    txt(c, 'z', 2 + z * 8, -10 - z * 6, hand(12), INK(0.7)); txt(c, 'z', 12 + z * 6, -14 - z * 3, hand(9), INK(0.6));
    c.globalAlpha = 1;
  }
}

/* ===== 4-5 Fridge door ===== */
function bgFridge(c) {
  wall(c, '#f4f0e6', 118, 9, 0.05);
  c.fillStyle = 'rgba(150,200,205,.22)'; c.fillRect(0, 150, 30, H - 150); c.fillRect(330, 150, 30, H - 150);
  for (let y = 150; y < H; y += 24) { pencilLine(c, 0, y, 30, y, 0.7, 0.35); pencilLine(c, 330, y, W, y, 0.7, 0.35); }
  pencilLine(c, 15, 150, 15, H, 0.7, 0.3); pencilLine(c, 345, 150, 345, H, 0.7, 0.3);
  // hanging plant
  pencilLine(c, 72, 0, 60, 26, 0.9, 0.6); pencilLine(c, 72, 0, 84, 26, 0.9, 0.6);
  skR(c, 56, 24, 32, 20, 3, 'rgba(200,110,80,.6)', 1.1, 0.8);
  [[50, 40, 0.4], [44, 54, 0.2], [42, 68, -0.1], [92, 42, -0.4], [98, 56, -0.2], [64, 22, -0.3], [80, 20, 0.3]].forEach(([x, y, r]) => skE(c, x, y, 4.5, 8, LEAF, 0.8, 0.5, r));
  ln(c, p => { p.moveTo(58, 40); p.quadraticCurveTo(44, 50, 42, 72); p.moveTo(86, 40); p.quadraticCurveTo(98, 50, 98, 62); }, 1, 'rgba(90,140,80,.7)');
  // cereal box on top of the fridge
  skR(c, 46, 66, 40, 52, 2, 'rgba(240,170,60,.6)', 1.2, 0.85);
  c.fillStyle = 'rgba(214,72,60,.7)'; c.fillRect(46, 74, 40, 14);
  skE(c, 66, 104, 12, 6, PAPER, 0.9, 0.6);
  // the fridge
  sk(c, p => rr(p, 30, 118, 300, 380, 18), 1.6, 0.9, 'rgba(178,218,206,.55)');
  c.fillStyle = 'rgba(255,255,255,.28)'; c.fillRect(52, 124, 8, 356);
  hatch(c, 312, 132, 16, 348, 4, 0.14);
  pencilLine(c, 30, 226, 330, 226, 1.4, 0.85); pencilLine(c, 30, 230, 330, 230, 1, 0.5);
  skR(c, 37, 140, 7, 66, 3, 'rgba(232,232,236,.95)', 1.1, 0.85); skR(c, 37, 246, 7, 96, 3, 'rgba(232,232,236,.95)', 1.1, 0.85);
  // letter magnets, perfectly straight
  [['H', 206, RED], ['O', 230, BLUE], ['M', 256, 'rgba(110,165,100,.9)'], ['E', 282, 'rgba(240,170,60,.95)']].forEach(([s, x, col]) => txt(c, s, x, 186, '900 22px "Noto Sans TC", sans-serif', col));
  heart(c, 296, 150, 7, 'rgba(240,120,150,.85)');
}
function drawFridgeCat(c, a) {
  const O = 'rgba(240,160,80,.72)', CR = 'rgba(252,240,220,.98)', sw = Math.sin(a.t * 2.4) * a.live;
  ln(c, p => { p.moveTo(40, 18); p.quadraticCurveTo(56, 14, 49 + sw * 3, -10); }, 7, O);
  sk(c, p => { p.moveTo(40, 18); p.quadraticCurveTo(56, 14, 49 + sw * 3, -10); }, 0.8, 0.5);
  sk(c, p => rr(p, -38, -6, 82, 32, 15), 1.3, 0.85, O);
  for (let k = 0; k < 4; k++) ln(c, p => { p.moveTo(2 + k * 10, -5); p.quadraticCurveTo(5 + k * 10, 2, 2 + k * 10, 8); }, 1.4, 'rgba(200,110,50,.45)');
  skP(c, [-50, -11, -46, -27, -36, -17], O, 1.1, 0.8); skP(c, [-31, -17, -22, -27, -19, -11], O, 1.1, 0.8);
  skE(c, -34, -4, 17, 15, O, 1.3, 0.85);
  skE(c, -34, 3, 8, 5, CR, 0.8, 0.4);
  circ(c, -40, -6, 2.2, INK(0.9)); circ(c, -28, -6, 2.2, INK(0.9));
  ln(c, p => { p.moveTo(-43, -8.5); p.lineTo(-37, -8.5); p.moveTo(-31, -8.5); p.lineTo(-25, -8.5); }, 1, INK(0.7));
  ell(c, -34, 0, 2, 1.4, 'rgba(240,130,140,.95)');
  ln(c, p => { p.moveTo(-46, 1); p.lineTo(-55, -1); p.moveTo(-46, 4); p.lineTo(-55, 5); p.moveTo(-22, 1); p.lineTo(-14, -1); }, 0.7, INK(0.5));
  skE(c, -24, 23, 7, 4, CR, 1, 0.7); skE(c, -8, 23, 7, 4, CR, 1, 0.7);
}
function drawPolaroid(c) {
  skR(c, -35, -38, 70, 80, 2, '#fdfcf8', 1.3, 0.85);
  c.save(); c.beginPath(); c.rect(-29, -32, 58, 54); c.clip();
  c.fillStyle = 'rgba(150,200,235,.65)'; c.fillRect(-29, -32, 58, 54);
  c.fillStyle = 'rgba(64,130,190,.55)'; c.fillRect(-29, 0, 58, 10);
  c.fillStyle = 'rgba(240,215,160,.95)'; c.fillRect(-29, 10, 58, 12);
  circ(c, 16, -20, 6, 'rgba(255,200,90,.9)');
  ell(c, -14, -22, 8, 3, 'rgba(255,255,255,.9)');
  for (const [x, col] of [[-10, RED], [2, BLUE]]) { circ(c, x, 2, 3.2, 'rgba(250,215,180,1)'); ln(c, p => { p.moveTo(x, 5); p.lineTo(x, 13); p.moveTo(x - 4, 8); p.lineTo(x + 4, 8); p.moveTo(x, 13); p.lineTo(x - 3, 19); p.moveTo(x, 13); p.lineTo(x + 3, 19); }, 1.6, col); }
  c.restore(); pencilRect(c, -29, -32, 58, 54, 1, 0.7);
  fit(c, T('墾丁！', 'Beach day!'), 0, 32, 62, hand(13), INK(0.8));
  skE(c, 0, -37, 5, 4.5, 'rgba(214,72,60,.9)', 1, 0.8);
}
function drawKidArt(c) {
  skR(c, -56, -44, 112, 90, 1, '#fffdf6', 1.2, 0.8);
  const cr = (col, w, fn) => ln(c, fn, w, col);
  cr('rgba(255,190,40,.9)', 2.4, p => { p.arc(-40, -26, 8, 0, Math.PI * 2); for (let k = 0; k < 8; k++) { const t = k * Math.PI / 4; p.moveTo(-40 + Math.cos(t) * 11, -26 + Math.sin(t) * 11); p.lineTo(-40 + Math.cos(t) * 15, -26 + Math.sin(t) * 15); } });
  cr('rgba(214,72,60,.85)', 2.2, p => { p.moveTo(-26, -4); p.lineTo(-6, -24); p.lineTo(14, -4); p.closePath(); });
  cr('rgba(64,110,170,.8)', 2, p => p.rect(-22, -4, 32, 30));
  cr('rgba(150,100,60,.8)', 2, p => p.rect(-4, 10, 8, 16));
  cr('rgba(255,190,40,.9)', 2, p => p.rect(-17, 2, 8, 8));
  const fig = (x, top, h, col) => cr(col, 2, p => { p.arc(x, top + 4, 4, 0, Math.PI * 2); p.moveTo(x, top + 8); p.lineTo(x, top + h * 0.7); p.moveTo(x - 6, top + 13); p.lineTo(x + 6, top + 13); p.moveTo(x, top + h * 0.7); p.lineTo(x - 4, top + h); p.moveTo(x, top + h * 0.7); p.lineTo(x + 4, top + h); });
  fig(26, -4, 30, 'rgba(64,110,170,.85)'); fig(38, -2, 28, 'rgba(214,72,60,.85)'); fig(48, 8, 18, 'rgba(160,80,200,.8)');
  cr('rgba(90,170,90,.85)', 2, p => { p.moveTo(-52, 32); for (let x = -48; x <= 52; x += 6) p.lineTo(x, x % 12 ? 36 : 29); });
  fit(c, T('我的家', 'MY HOME'), 27, -32, 52, hand(14), 'rgba(160,80,200,.85)');
  heart(c, 0, -42, 5, 'rgba(240,120,150,.95)');
}
function drawWhiteboard(c) {
  skR(c, -52, -56, 104, 104, 5, 'rgba(205,210,215,.9)', 1.4, 0.9);
  skR(c, -46, -50, 92, 92, 3, '#ffffff', 1, 0.6);
  fit(c, T('待辦事項', 'TO DO'), 0, -38, 80, hand(16), 'rgba(64,110,170,.95)');
  ln(c, p => { p.moveTo(-24, -28); p.lineTo(24, -28); }, 1.2, 'rgba(64,110,170,.6)');
  [T('倒垃圾', 'Trash out'), T('買貓砂', 'Cat litter'), T('繳電費', 'Pay bills')].forEach((s, i) => {
    const y = -14 + i * 18; pencilRect(c, -40, y - 5, 10, 10, 1, 0.7); fit(c, s, -24, y, 66, hand(13), INK(0.8), 'left');
  });
  ln(c, p => { p.moveTo(-39, -15); p.lineTo(-35, -10); p.lineTo(-28, -21); }, 1.6, 'rgba(214,72,60,.95)');
  skR(c, -40, 48, 80, 6, 2, 'rgba(190,195,200,.95)', 1, 0.8);
  circ(c, -46, -54, 2.5, RED); circ(c, 46, -54, 2.5, RED);
}
function drawMarker(c) {
  sk(c, p => { p.moveTo(0, -46); p.quadraticCurveTo(3, -32, 0, -20); }, 1, 0.75);
  skR(c, -7, -20, 14, 16, 3, 'rgba(64,110,170,.85)', 1.1, 0.85);
  skR(c, -6, -5, 12, 42, 3, PAPER, 1.2, 0.85);
  c.fillStyle = 'rgba(64,110,170,.6)'; c.fillRect(-6, 8, 12, 9);
  skP(c, [-4, 37, 4, 37, 2, 45, -2, 45], 'rgba(64,110,170,.9)', 1, 0.8);
}
function drawList(c) {
  skR(c, -38, -40, 76, 86, 2, '#fffdf6', 1.2, 0.8);
  c.fillStyle = 'rgba(255,214,90,.85)'; c.fillRect(-38, -40, 76, 9); pencilLine(c, -38, -31, 38, -31, 1, 0.6);
  ln(c, p => { for (const y of [-12, 2, 16, 30]) { p.moveTo(-34, y); p.lineTo(34, y); } }, 0.7, 'rgba(110,160,210,.5)');
  [T('牛奶', 'Milk'), T('雞蛋', 'Eggs'), T('吐司', 'Bread'), T('貓罐頭', 'Cat food')].forEach((s, i) => {
    const y = -18 + i * 14; ln(c, p => p.arc(-28, y, 3, 0, Math.PI * 2), 0.9, INK(0.6)); fit(c, s, -20, y, 54, hand(13), INK(0.85), 'left');
  });
  heart(c, 28, 39, 3.5, 'rgba(240,120,150,.8)');
  skE(c, 0, -42, 6, 4.5, 'rgba(120,170,110,.95)', 1, 0.8);
}

/* ===== 4-6 Bedroom gallery ===== */
function bgBedroom(c) {
  wall(c, '#f7f0e8');
  c.fillStyle = 'rgba(230,170,170,.13)'; for (let x = 0; x < W; x += 24) c.fillRect(x, 0, 12, 330);
  for (let y = 12, r = 0; y < 330; y += 26, r++) for (let x = 6 + (r % 2) * 12; x < W; x += 24) circ(c, x, y, 1.3, 'rgba(214,72,60,.22)');
  // window with a branch outside
  skR(c, 262, 28, 84, 148, 3, 'rgba(160,205,235,.5)', 1.4, 0.85);
  ln(c, p => { p.moveTo(346, 60); p.quadraticCurveTo(310, 80, 284, 130); p.moveTo(318, 76); p.lineTo(306, 54); }, 1.6, 'rgba(110,80,55,.6)');
  [[300, 56, 0.6], [292, 104, -0.5], [312, 90, 0.3], [284, 128, 0.9], [328, 70, -0.3]].forEach(([x, y, r]) => skE(c, x, y, 5, 8, LEAF, 0.8, 0.5, r));
  pencilLine(c, 304, 28, 304, 176, 1, 0.6); pencilLine(c, 262, 100, 346, 100, 1, 0.6);
  pencilLine(c, 250, 22, 356, 22, 1.6, 0.85);
  for (const [x0, d] of [[254, 1], [354, -1]]) sk(c, p => { p.moveTo(x0, 22); p.lineTo(x0 + d * 16, 22); p.quadraticCurveTo(x0 + d * 6, 110, x0 + d * 12, 190); p.lineTo(x0, 190); p.closePath(); }, 1, 0.6, 'rgba(255,236,170,.6)');
  // ribbon and bow that hold the family and baby photos together
  sk(c, p => { p.moveTo(112, 171); p.lineTo(165, 156); p.lineTo(218, 171); }, 1, 0.75);
  skE(c, 158, 154, 7, 4, 'rgba(240,140,160,.85)', 0.9, 0.7, 0.3); skE(c, 172, 154, 7, 4, 'rgba(240,140,160,.85)', 0.9, 0.7, -0.3);
  circ(c, 165, 155, 2.6, 'rgba(214,90,120,.95)');
  // floor, nightstand, headboard, bed
  boards(c, 430, '#ebe2d2', 12);
  skR(c, 278, 331, 72, 90, 3, WOOD, 1.4, 0.9); pencilLine(c, 278, 372, 350, 372, 1, 0.6); circ(c, 314, 352, 2.5, INK(0.7)); circ(c, 314, 394, 2.5, INK(0.7));
  for (const x of [282, 340]) skR(c, x, 421, 6, 18, 1, WOOD, 1, 0.8);
  skE(c, 316, 466, 30, 6, 'rgba(120,165,215,.35)', 1, 0.5);
  sk(c, p => { p.moveTo(18, 330); p.lineTo(18, 270); p.quadraticCurveTo(18, 250, 40, 250); p.lineTo(246, 250); p.quadraticCurveTo(268, 250, 268, 270); p.lineTo(268, 330); p.closePath(); }, 1.5, 0.9, 'rgba(170,120,70,.5)');
  for (let x = 48; x < 250; x += 24) pencilLine(c, x, 262, x, 326, 0.8, 0.35);
  c.fillStyle = PAPER; rr(c, 6, 318, 276, 170, 10); c.fill();
  sk(c, p => rr(p, 6, 318, 276, 170, 10), 1.5, 0.9, 'rgba(120,165,215,.35)');
  c.strokeStyle = 'rgba(64,110,170,.2)'; c.lineWidth = 0.9; c.beginPath();
  for (let x = 40; x < 280; x += 34) { c.moveTo(x, 360); c.lineTo(x, 480); }
  for (let y = 394; y < 480; y += 34) { c.moveTo(8, y); c.lineTo(280, y); }
  c.stroke();
  skR(c, 6, 342, 276, 18, 4, PAPER, 1.2, 0.8);
  // teddy bear, sitting perfectly straight
  const BR = 'rgba(190,140,90,.7)';
  skE(c, 232, 324, 16, 15, BR, 1.1, 0.8); circ(c, 232, 328, 7, 'rgba(240,215,180,.9)');
  skE(c, 220, 296, 5, 5, BR, 1, 0.75); skE(c, 244, 296, 5, 5, BR, 1, 0.75);
  skE(c, 232, 304, 12, 11, BR, 1.1, 0.8);
  circ(c, 228, 302, 1.5, INK(0.9)); circ(c, 236, 302, 1.5, INK(0.9)); ell(c, 232, 307, 2.4, 1.6, INK(0.8));
}
function drawPressed(c) {
  sk(c, p => { p.moveTo(-10, -26); p.lineTo(0, -36); p.lineTo(10, -26); }, 0.9, 0.6);
  skR(c, -27, -26, 54, 62, 2, 'rgba(225,190,110,.8)', 1.5, 0.9);
  skR(c, -20, -19, 40, 48, 1, '#fbf6ea', 1, 0.6);
  ln(c, p => { p.moveTo(0, 24); p.quadraticCurveTo(-3, 8, 1, -6); }, 1.3, 'rgba(90,140,80,.85)');
  skE(c, -6, 12, 6, 2.6, LEAF, 0.7, 0.5, -0.5); skE(c, 6, 4, 6, 2.6, LEAF, 0.7, 0.5, 0.5);
  for (let k = 0; k < 5; k++) { const t = k * Math.PI * 0.4 - Math.PI / 2; ell(c, 1 + Math.cos(t) * 5, -8 + Math.sin(t) * 5, 4.5, 2.8, 'rgba(240,140,170,.8)', t); }
  circ(c, 1, -8, 2.6, 'rgba(255,200,70,1)');
}
function drawSeascape(c) {
  sk(c, p => { p.moveTo(-24, -34); p.lineTo(0, -43); p.lineTo(24, -34); }, 0.9, 0.6);
  skR(c, -61, -34, 122, 76, 2, 'rgba(60,60,65,.75)', 1.4, 0.9);
  skR(c, -55, -28, 110, 64, 1, PAPER, 0.8, 0.5);
  c.save(); c.beginPath(); c.rect(-47, -20, 94, 48); c.clip();
  c.fillStyle = 'rgba(255,190,140,.6)'; c.fillRect(-47, -20, 94, 26);
  c.fillStyle = 'rgba(255,225,160,.6)'; c.fillRect(-47, -6, 94, 12);
  circ(c, 18, 6, 10, 'rgba(255,140,90,.8)');
  c.fillStyle = 'rgba(80,130,190,.65)'; c.fillRect(-47, 6, 94, 22);
  ln(c, p => { for (const [x, y] of [[-30, 12], [6, 16], [24, 11], [-12, 22], [30, 22]]) { p.moveTo(x, y); p.lineTo(x + 10, y); } }, 1, 'rgba(255,255,255,.7)');
  skP(c, [-30, 8, -12, 8, -15, 13, -27, 13], 'rgba(150,100,60,.85)', 0.9, 0.7);
  skP(c, [-21, 7, -21, -10, -12, 7], '#ffffff', 0.9, 0.6);
  ln(c, p => { p.moveTo(-6, -12); p.quadraticCurveTo(-3, -15, 0, -12); p.quadraticCurveTo(3, -15, 6, -12); p.moveTo(30, -16); p.quadraticCurveTo(32, -18, 34, -16); p.quadraticCurveTo(36, -18, 38, -16); }, 1, INK(0.7));
  c.restore(); pencilRect(c, -47, -20, 94, 48, 0.9, 0.6);
}
function drawFamily(c) {
  sk(c, p => { p.moveTo(-20, -24); p.lineTo(0, -34); p.lineTo(20, -24); }, 0.9, 0.6);
  skR(c, -38, -24, 76, 58, 3, 'rgba(170,120,70,.62)', 1.4, 0.9);
  skR(c, -31, -17, 62, 44, 1, 'rgba(200,225,240,.85)', 0.9, 0.6);
  c.save(); c.beginPath(); c.rect(-31, -17, 62, 44); c.clip();
  c.fillStyle = 'rgba(120,170,110,.5)'; c.fillRect(-31, 18, 62, 10);
  const skin = 'rgba(250,215,180,1)';
  skR(c, -21, 0, 14, 28, 5, BLUE, 0.9, 0.7); skE(c, -14, -6, 6, 6, skin, 0.9, 0.7);
  skR(c, -5, 3, 13, 25, 5, RED, 0.9, 0.7); skE(c, 1.5, -3, 5.5, 5.5, skin, 0.9, 0.7);
  ln(c, p => { p.arc(1.5, -4, 6.5, Math.PI, 0); }, 2, 'rgba(110,80,55,.8)');
  skR(c, 12, 12, 11, 16, 4, SUN, 0.9, 0.7); skE(c, 17.5, 7, 5, 5, skin, 0.9, 0.7);
  ln(c, p => { for (const [x, y] of [[-14, -5], [1.5, -2], [17.5, 8]]) { p.moveTo(x - 2, y + 1.5); p.quadraticCurveTo(x, y + 3, x + 2, y + 1.5); } }, 0.8, INK(0.7));
  c.restore();
}
function drawBaby(c) {
  sk(c, p => { p.moveTo(-18, -24); p.lineTo(0, -34); p.lineTo(18, -24); }, 0.9, 0.6);
  skR(c, -31, -24, 62, 58, 4, PAPER, 1.4, 0.9);
  skE(c, 0, 5, 22, 24, 'rgba(255,220,225,.85)', 1, 0.6);
  skE(c, 0, 4, 15, 15, 'rgba(240,150,170,.75)', 1, 0.7);
  skE(c, 0, 7, 11, 11, 'rgba(250,215,180,1)', 0.9, 0.7);
  ln(c, p => { p.moveTo(-6, 5); p.quadraticCurveTo(-4, 7, -2, 5); p.moveTo(2, 5); p.quadraticCurveTo(4, 7, 6, 5); p.moveTo(-2, 11); p.quadraticCurveTo(0, 13, 2, 11); }, 0.9, INK(0.75));
  ell(c, -7, 9, 2.4, 1.5, 'rgba(240,120,130,.45)'); ell(c, 7, 9, 2.4, 1.5, 'rgba(240,120,130,.45)');
  circ(c, 0, -11, 2.5, 'rgba(240,150,170,.95)');
}
function drawPillow(c) {
  sk(c, p => { p.moveTo(-64, -22); p.quadraticCurveTo(0, -14, 64, -22); p.quadraticCurveTo(56, 0, 64, 22); p.quadraticCurveTo(0, 14, -64, 22); p.quadraticCurveTo(-56, 0, -64, -22); p.closePath(); }, 1.4, 0.9, '#fffdf8');
  ln(c, p => { p.moveTo(-50, -12); p.quadraticCurveTo(0, -6, 50, -12); p.moveTo(-50, 12); p.quadraticCurveTo(0, 6, 50, 12); }, 0.8, 'rgba(240,140,160,.5)');
  heart(c, 0, 0, 7, 'rgba(240,140,160,.65)');
  hatch(c, -40, 8, 80, 8, 4, 0.08);
}
const BOWL = p => { p.moveTo(-16, -24); p.bezierCurveTo(-40, -14, -38, 26, -16, 30); p.lineTo(16, 30); p.bezierCurveTo(38, 26, 40, -14, 16, -24); };
function drawFishbowl(c, a) {
  c.save(); c.beginPath(); BOWL(c); c.closePath(); c.clip();
  c.fillStyle = 'rgba(225,240,245,.6)'; c.fillRect(-34, -26, 68, 58);
  c.fillStyle = 'rgba(120,180,220,.45)'; c.fillRect(-34, -12, 68, 44);
  [[-12, 'rgba(200,180,150,.9)'], [-4, 'rgba(160,190,170,.9)'], [5, 'rgba(230,200,170,.9)'], [13, 'rgba(180,170,160,.9)']].forEach(([x, col]) => ell(c, x, 28, 5, 3, col));
  ln(c, p => { p.moveTo(-14, 28); p.quadraticCurveTo(-20, 18, -14, 10); p.quadraticCurveTo(-9, 2, -15, -4); }, 2, 'rgba(90,150,90,.8)');
  const fx = Math.sin(a.t * 0.9) * 10 * a.live, fy = Math.sin(a.t * 1.7) * 3 * a.live + 6, dir = Math.cos(a.t * 0.9) * a.live >= 0 ? 1 : -1;
  c.save(); c.translate(fx, fy); c.scale(dir, 1);
  skP(c, [-7, 0, -15, -6, -14, 6], 'rgba(250,130,60,.9)', 0.8, 0.6);
  skE(c, 0, 0, 9, 6, 'rgba(250,140,60,.95)', 0.9, 0.7);
  skP(c, [-2, -5, 3, -9, 4, -5], 'rgba(250,130,60,.9)', 0.7, 0.5);
  circ(c, 4, -1.5, 1.3, INK(0.9));
  c.restore();
  if (a.live > 0.05) { const bz = (a.t * 18) % 30; ln(c, p => { p.arc(fx + 9 * dir, fy - 6 - bz, 1.8, 0, Math.PI * 2); p.moveTo(fx + 11 * dir + 2, fy - 14 - bz * 0.7); p.arc(fx + 11 * dir, fy - 14 - bz * 0.7, 1.3, 0, Math.PI * 2); }, 0.8, 'rgba(255,255,255,.95)'); }
  c.restore();
  sk(c, BOWL, 1.4, 0.85);
  skE(c, 0, -24, 16, 3.5, null, 1.1, 0.8);
  ln(c, p => { p.moveTo(-24, -6); p.quadraticCurveTo(-27, 6, -22, 16); }, 2.2, 'rgba(255,255,255,.85)');
}

/* ===== 4-7 Supermarket aisle ===== */
function bottle(c, x, base, w, h, col) { skR(c, x, base - h + 10, w, h - 10, 3, col, 1, 0.7); skR(c, x + w * 0.3, base - h, w * 0.4, 11, 1, col, 0.9, 0.6); c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(x + 2, base - h * 0.55, w - 4, h * 0.2); }
function boxP(c, x, base, w, h, col) { skR(c, x, base - h, w, h, 1, col, 1, 0.7); c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(x + 3, base - h * 0.65, w - 6, h * 0.25); }
function bag(c, x, base, w, h, col) { sk(c, p => { p.moveTo(x, base - h); p.lineTo(x + w, base - h); p.quadraticCurveTo(x + w + 3, base - h / 2, x + w, base); p.lineTo(x, base); p.quadraticCurveTo(x - 3, base - h / 2, x, base - h); p.closePath(); }, 1, 0.7, col); c.fillStyle = 'rgba(255,255,255,.55)'; ell(c, x + w / 2, base - h * 0.5, w * 0.3, h * 0.16, 'rgba(255,255,255,.6)'); }
function bgMarket(c) {
  wall(c, '#f2f0ea', 70, 9, 0.05);
  for (const x of [30, 230]) { ell(c, x + 50, 16, 64, 10, 'rgba(255,250,215,.6)'); skR(c, x, 2, 100, 7, 3, '#ffffff', 1, 0.7); }
  pencilLine(c, 120, 0, 120, 18, 0.8, 0.7); pencilLine(c, 240, 0, 240, 18, 0.8, 0.7);
  c.fillStyle = 'rgba(180,185,195,.24)'; c.fillRect(14, 74, 332, 382);
  c.fillStyle = 'rgba(120,125,135,.22)';
  for (let y = 84; y < 452; y += 12) for (let x = 24; x < 340; x += 12) c.fillRect(x, y, 1.4, 1.4);
  // products in the background (all straight)
  bottle(c, 98, 160, 12, 52, 'rgba(120,180,140,.7)'); bottle(c, 112, 160, 12, 46, 'rgba(240,160,170,.7)');
  boxP(c, 232, 160, 30, 58, 'rgba(160,140,200,.6)'); boxP(c, 264, 160, 30, 58, 'rgba(160,140,200,.6)'); boxP(c, 296, 160, 30, 58, 'rgba(160,140,200,.6)'); boxP(c, 24, 160, 6, 40, 'rgba(240,170,60,.6)');
  for (let i = 0; i < 4; i++) bottle(c, 160 + i * 17, 300, 14, 58, ['rgba(255,170,60,.7)', 'rgba(140,200,90,.7)', 'rgba(255,214,90,.75)', 'rgba(240,120,120,.7)'][i]);
  bag(c, 232, 300, 24, 46, 'rgba(255,214,90,.8)'); bag(c, 260, 300, 24, 46, 'rgba(255,214,90,.8)'); bag(c, 288, 300, 24, 46, 'rgba(120,180,220,.7)');
  for (const x of [318]) { skR(c, x, 266, 22, 34, 4, 'rgba(214,72,60,.6)', 1, 0.7); skR(c, x + 2, 260, 18, 7, 2, 'rgba(255,214,90,.8)', 0.9, 0.6); }
  for (const x of [24, 74]) { bag(c, x, 440, 44, 72, 'rgba(245,240,225,.95)'); txt(c, T('米', 'RICE'), x + 22, 400, sans(T(16, 11), 900), 'rgba(214,72,60,.8)'); }
  for (let k = 0; k < 2; k++) for (let i = 0; i < 4; i++) bottle(c, 130 + i * 24, 440 - k * 0, 20, 64, 'rgba(160,205,235,.6)');
  for (const x of [238, 288]) { skR(c, x, 380, 44, 60, 6, 'rgba(120,170,200,.7)', 1, 0.75); skR(c, x + 30, 372, 10, 10, 2, 'rgba(120,170,200,.8)', 0.9, 0.6); c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(x + 6, 398, 32, 16); }
  // shelves
  skR(c, 10, 74, 10, 386, 2, 'rgba(160,165,175,.85)', 1.1, 0.85); skR(c, 340, 74, 10, 386, 2, 'rgba(160,165,175,.85)', 1.1, 0.85);
  skR(c, 10, 66, 340, 10, 2, 'rgba(214,72,60,.6)', 1.2, 0.85);
  for (const y of [160, 300, 440]) {
    skR(c, 14, y, 332, 16, 1, 'rgba(228,230,234,.97)', 1.3, 0.9);
    c.fillStyle = 'rgba(255,236,150,.85)'; c.fillRect(16, y + 3, 328, 10);
  }
  for (const [x, y, p] of [[30, 160, '$59'], [106, 160, '$25'], [236, 160, '$35'], [176, 300, '$29'], [40, 440, '$199'], [150, 440, '$20'], [270, 440, '$89']]) {
    c.fillStyle = '#fffdf8'; c.fillRect(x, y + 4, 30, 8); txt(c, p, x + 15, y + 8.5, '700 7px "JetBrains Mono", monospace', 'rgba(214,72,60,.95)');
  }
  // tape between the two milk cartons
  c.fillStyle = 'rgba(220,190,120,.6)'; c.fillRect(95, 256, 12, 10);
  // shiny floor
  c.fillStyle = 'rgba(210,205,195,.55)'; c.fillRect(0, 456, W, 24); pencilLine(c, 0, 456, W, 456, 1.2, 0.8);
  ln(c, p => { for (const x of [40, 120, 210, 300]) { p.moveTo(x, 464); p.lineTo(x + 30, 464); } }, 1.4, 'rgba(255,255,255,.75)');
}
function drawAisleSign(c) {
  skR(c, -79, -20, 158, 44, 6, 'rgba(64,110,170,.82)', 1.5, 0.9);
  for (const x of [-60, 60]) { ln(c, p => p.arc(x, -21, 3, 0, Math.PI * 2), 1.2, INK(0.8)); }
  skE(c, -56, 2, 15, 15, '#fffdf8', 1.1, 0.8);
  txt(c, '7', -56, 3, '900 20px "Noto Sans TC", sans-serif', 'rgba(64,110,170,1)');
  txt(c, T('零食・飲料', 'Snacks & Drinks'), 14, 2, T(sans(16, 900), sans(13, 800)), '#fffdf8');
}
function drawCereal(c) {
  skR(c, -28, -40, 56, 80, 2, 'rgba(240,170,60,.75)', 1.4, 0.9);
  c.fillStyle = 'rgba(214,72,60,.85)'; c.fillRect(-28, -30, 56, 28);
  txt(c, T('玉米片', 'CORN'), 0, -21, sans(T(13, 13), 900), '#fff');
  txt(c, T('早餐脆片', 'FLAKES'), 0, -9, sans(8, 700), '#ffe9a8');
  for (const [x, y] of [[-8, 13], [0, 9], [8, 12], [-3, 15], [5, 16]]) ell(c, x, y, 4, 2.4, 'rgba(255,214,90,1)', x / 10);
  sk(c, p => { p.moveTo(-18, 18); p.quadraticCurveTo(0, 38, 18, 18); p.closePath(); }, 1.1, 0.8, PAPER);
  hatch(c, 18, -40, 10, 80, 4, 0.15);
}
function can(c, x, y) {
  skR(c, x + 1, y, 28, 22, 3, 'rgba(205,205,212,.95)', 1.1, 0.8);
  c.fillStyle = 'rgba(214,72,60,.7)'; c.fillRect(x + 1, y + 5, 28, 12);
  circ(c, x + 15, y + 11, 4, 'rgba(255,130,100,.95)');
  pencilLine(c, x + 15, y + 6, x + 17, y + 4, 0.9, 0.7);
}
function drawCans(c) { [[-45, 11], [-15, 11], [15, 11], [-30, -11], [0, -11], [-15, -33]].forEach(([x, y]) => can(c, x, y)); }
function drawWobbler(c, a) {
  const b = Math.sin(a.t * 6) * 3 * a.live;
  skR(c, -8, 32, 16, 10, 2, 'rgba(200,205,215,.95)', 1, 0.8);
  ln(c, p => { p.moveTo(0, 32); p.quadraticCurveTo(b + 4, 22, b * 0.6, 10); }, 3, 'rgba(200,225,240,.9)');
  sk(c, p => { p.moveTo(0, 32); p.quadraticCurveTo(b + 4, 22, b * 0.6, 10); }, 0.6, 0.4);
  const x = b * 0.6;
  skE(c, x - 24, -10, 5, 8, 'rgba(255,200,70,.95)', 0.9, 0.7, 0.4); skE(c, x + 24, -10, 5, 8, 'rgba(255,200,70,.95)', 0.9, 0.7, -0.4);
  skE(c, x, -14, 25, 25, '#ffd85e', 1.4, 0.9);
  ln(c, p => { p.moveTo(x - 2, -38); p.lineTo(x - 4, -42); p.moveTo(x + 2, -38); p.lineTo(x + 4, -42); }, 1.2, INK(0.7));
  circ(c, x - 8, -20, 2.6, INK(0.9)); circ(c, x + 8, -20, 2.6, INK(0.9)); circ(c, x - 7, -21, 0.9, '#fff'); circ(c, x + 9, -21, 0.9, '#fff');
  poly(c, [x - 4, -15, x + 4, -15, x, -10], 'rgba(240,140,60,1)');
  ell(c, x - 14, -13, 3.5, 2, 'rgba(240,120,130,.5)'); ell(c, x + 14, -13, 3.5, 2, 'rgba(240,120,130,.5)');
  skR(c, x - 22, -4, 44, 11, 2, 'rgba(214,72,60,.92)', 1, 0.8);
  txt(c, T('特價', 'SALE'), x, 1.5, sans(8, 900), '#fff');
}
function carton(c, free) {
  skR(c, -9, -40, 18, 6, 1, PAPER, 1, 0.8);
  skP(c, [-19, -22, -9, -34, 9, -34, 19, -22], '#f1f1ec', 1.2, 0.85);
  skR(c, -19, -22, 38, 62, 1, PAPER, 1.3, 0.85);
  ell(c, -10, -14, 4, 3, INK(0.55)); ell(c, 9, -16, 3, 2.4, INK(0.55)); ell(c, 4, -8, 2.4, 2, INK(0.5));
  c.fillStyle = 'rgba(64,110,170,.7)'; c.fillRect(-19, 13, 38, 27);
  txt(c, T('鮮奶', 'MILK'), 0, 22, sans(11, 900), '#fff');
  txt(c, '1L', 0, 33, '700 8px "JetBrains Mono", monospace', '#fff');
  c.fillStyle = 'rgba(220,190,120,.65)'; c.fillRect(-23, -2, 46, 10);
  pencilLine(c, -23, -2, 23, -2, 0.7, 0.35); pencilLine(c, -23, 8, 23, 8, 0.7, 0.35);
  if (free) {
    const pts = []; for (let k = 0; k < 20; k++) { const t = k * Math.PI / 10, r = k % 2 ? 6 : 9.5; pts.push(11 + Math.cos(t) * r, -14 + Math.sin(t) * r); }
    skP(c, pts, 'rgba(214,72,60,.95)', 0.8, 0.6);
    txt(c, T('送', 'FREE'), 11, -13.5, sans(T(8, 5.5), 900), '#fff');
  }
}
const drawMilk = c => carton(c, false), drawFreeMilk = c => carton(c, true);
function drawPriceTag(c) {
  skR(c, -35, -14, 70, 28, 2, 'rgba(255,224,80,.98)', 1.2, 0.85);
  txt(c, '$45', -16, -1, '900 15px "JetBrains Mono", monospace', 'rgba(214,72,60,1)');
  txt(c, T('洋芋片', 'Chips'), 18, -5, sans(9), INK(0.85));
  c.fillStyle = INK(0.8); for (let i = 0; i < 12; i++) c.fillRect(6 + i * 2.2, 3, i % 3 ? 1 : 1.6, 7);
}

/* ===== 4-8 Office ===== */
function bgOffice(c) {
  wall(c, '#f1f1ec', 324, 10, 0.05);
  c.fillStyle = 'rgba(170,190,210,.15)'; c.fillRect(0, 0, W, 324);
  // whiteboard with a rising bar chart
  skR(c, 172, 20, 174, 132, 3, 'rgba(205,210,215,.92)', 1.4, 0.9); skR(c, 178, 26, 162, 120, 2, '#ffffff', 1, 0.6);
  fit(c, T('本季業績', 'SALES'), 186, 38, 70, hand(15), 'rgba(64,110,170,.95)', 'left');
  pencilLine(c, 196, 140, 334, 140, 1.1, 0.8); pencilLine(c, 196, 140, 196, 52, 1.1, 0.8);
  [[205, 126, BLUE], [235, 113, LEAF], [265, 100, SUN], [295, 86, RED]].forEach(([x, top, col]) => skR(c, x, top, 18, 140 - top, 1, col, 1, 0.7));
  skR(c, 196, 152, 130, 5, 2, 'rgba(190,195,200,.95)', 1, 0.8);
  // window with blinds
  skR(c, 196, 168, 146, 58, 2, 'rgba(160,205,235,.45)', 1.3, 0.85);
  for (let y = 172; y < 224; y += 6) pencilLine(c, 198, y, 340, y, 0.8, 0.4);
  pencilLine(c, 334, 168, 334, 214, 0.7, 0.5);
  // floor, under-desk shade, pedestal
  c.fillStyle = 'rgba(190,195,205,.38)'; c.fillRect(0, 380, W, 100);
  for (let x = 0; x < W; x += 40) pencilLine(c, x, 382, x - 20, 480, 0.6, 0.15);
  c.fillStyle = 'rgba(40,40,45,.08)'; c.fillRect(20, 382, 320, 92);
  skR(c, 262, 382, 84, 90, 2, 'rgba(228,228,232,.95)', 1.2, 0.85);
  for (const y of [412, 442]) pencilLine(c, 262, y, 346, y, 1, 0.6);
  for (const y of [397, 427, 457]) skR(c, 294, y - 2, 20, 4, 2, 'rgba(160,160,170,.9)', 0.8, 0.6);
  skR(c, 16, 382, 10, 92, 1, 'rgba(205,205,210,.95)', 1, 0.8);
  pencilLine(c, 0, 474, W, 474, 1, 0.4);
  // desk
  poly(c, [0, 324, 360, 324, 360, 372, 0, 372], 'rgba(215,185,140,.55)');
  c.strokeStyle = 'rgba(120,90,50,.14)'; c.lineWidth = 0.8; for (const y of [336, 350, 362]) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  pencilLine(c, 0, 324, W, 324, 1.3, 0.8);
  skR(c, 0, 372, W, 10, 1, 'rgba(190,150,100,.75)', 1.3, 0.9);
  // pen cup, mug, succulent
  skR(c, 10, 340, 18, 22, 2, 'rgba(120,165,215,.7)', 1, 0.8);
  for (const [x, col] of [[14, RED], [19, INK(0.7)], [24, SUN]]) pencilLine(c, x, 340, x + (x - 19) * 0.3, 326, 1.6, 0.8);
  skR(c, 214, 336, 20, 24, 3, PAPER, 1.1, 0.85); sk(c, p => p.arc(236, 347, 5, -Math.PI / 2, Math.PI / 2), 1, 0.7);
  c.fillStyle = 'rgba(214,72,60,.6)'; c.fillRect(214, 342, 20, 4);
  ln(c, p => { p.moveTo(220, 332); p.quadraticCurveTo(216, 326, 221, 320); p.moveTo(228, 332); p.quadraticCurveTo(224, 326, 229, 320); }, 1, INK(0.35));
  skR(c, 338, 346, 16, 16, 2, 'rgba(200,110,80,.6)', 1, 0.8);
  [[-4, -6, -0.5], [4, -6, 0.5], [0, -9, 0]].forEach(([dx, dy, r]) => ell(c, 346 + dx, 346 + dy, 3.5, 7, LEAF, r));
}
function drawPoster(c) {
  skR(c, -57, -39, 114, 78, 1, 'rgba(50,55,65,.85)', 1.3, 0.9);
  c.save(); c.beginPath(); c.rect(-51, -33, 102, 52); c.clip();
  c.fillStyle = 'rgba(160,200,235,.85)'; c.fillRect(-51, -33, 102, 52);
  poly(c, [-51, 19, -14, -20, 8, -2, 24, -14, 51, 19], 'rgba(235,240,245,1)');
  poly(c, [-51, 19, -14, -20, -6, -10, -20, 19], 'rgba(170,180,195,.6)');
  pencilLine(c, -14, -20, -14, -31, 1, 0.8); poly(c, [-14, -31, -4, -28, -14, -25], RED);
  ln(c, p => { p.moveTo(-28, 0); p.quadraticCurveTo(-22, -4, -18, -10); }, 0.8, INK(0.6));
  for (const [x, y] of [[-28, 0], [-18, -10]]) { circ(c, x, y - 4, 1.8, INK(0.85)); pencilLine(c, x, y - 2, x, y + 3, 1.2, 0.85); }
  c.restore();
  txt(c, T('團隊合作', 'TEAMWORK'), 0, 29, T(sans(11, 900), '900 12px "Playfair Display", serif'), '#fbfaf6');
}
function drawEmployee(c) {
  skR(c, -45, -38, 90, 76, 2, 'rgba(225,190,110,.85)', 1.5, 0.9);
  skR(c, -39, -32, 78, 64, 1, '#fffdf6', 0.9, 0.6);
  const lines = T(['本月最佳員工'], ['EMPLOYEE OF', 'THE MONTH']);
  lines.forEach((s, i) => txt(c, s, 0, (lines.length > 1 ? -25 : -23) + i * 8, T(sans(10, 900), sans(7, 900)), 'rgba(214,72,60,.95)'));
  c.save(); c.beginPath(); c.arc(0, 8, 16, 0, Math.PI * 2); c.fillStyle = 'rgba(160,200,235,.6)'; c.fill(); c.clip();
  const O = 'rgba(230,150,80,.85)';
  poly(c, [-12, 0, -9, -9, -3, -3], O); poly(c, [12, 0, 9, -9, 3, -3], O);
  ell(c, 0, 8, 12, 11, O); ell(c, 0, 13, 8, 5.5, '#fdf6ea');
  circ(c, -5, 6, 1.4, INK(0.9)); circ(c, 5, 6, 1.4, INK(0.9)); ell(c, 0, 11, 1.8, 1.3, INK(0.9));
  c.restore(); ln(c, p => p.arc(0, 8, 16, 0, Math.PI * 2), 1.2, INK(0.7));
  const st = []; for (let k = 0; k < 10; k++) { const t = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 2.6 : 6.5; st.push(27 + Math.cos(t) * r, 22 + Math.sin(t) * r); }
  skP(c, st, 'rgba(255,200,60,1)', 0.8, 0.6);
}
function monitor(c, right) {
  skR(c, -6, 28, 12, 14, 1, 'rgba(180,180,188,.95)', 1, 0.8);
  skR(c, -26, 41, 52, 7, 3, 'rgba(180,180,188,.95)', 1.1, 0.85);
  skR(c, -58, -47, 116, 76, 4, PAPER, 1.5, 0.9);
  c.fillStyle = 'rgba(45,55,75,.88)'; c.fillRect(-52, -41, 104, 62);
  if (!right) {
    c.fillStyle = 'rgba(255,255,255,.9)'; c.fillRect(-48, -37, 96, 54);
    c.fillStyle = 'rgba(110,165,100,.8)'; c.fillRect(-48, -37, 96, 7);
    c.fillStyle = 'rgba(255,214,90,.7)'; c.fillRect(-24, -16, 24, 6); c.fillRect(0, 2, 24, 6);
    ln(c, p => { for (let y = -30; y < 17; y += 6) { p.moveTo(-48, y); p.lineTo(48, y); } for (let x = -24; x < 48; x += 24) { p.moveTo(x, -37); p.lineTo(x, 17); } }, 0.6, 'rgba(120,130,150,.4)');
  } else {
    skR(c, -46, -34, 54, 12, 5, 'rgba(255,255,255,.9)', 0.6, 0.3);
    skR(c, -6, -18, 52, 12, 5, 'rgba(126,226,168,.95)', 0.6, 0.3);
    skR(c, -46, -2, 40, 12, 5, 'rgba(255,255,255,.9)', 0.6, 0.3);
    heart(c, 18, 4, 4, 'rgba(240,120,150,.95)');
  }
  circ(c, 50, 25, 1.5, 'rgba(126,226,168,1)');
}
const drawMonitorL = c => monitor(c, false), drawMonitorR = c => monitor(c, true);
function drawKeyboard(c) {
  skR(c, -69, -11, 138, 23, 4, 'rgba(225,226,230,.97)', 1.3, 0.85);
  c.fillStyle = PAPER; c.strokeStyle = INK(0.35); c.lineWidth = 0.7; c.beginPath();
  for (let r = 0; r < 3; r++) for (let k = 0; k < 14; k++) c.rect(-65 + k * 9.2 + (r % 2) * 2, -8 + r * 5, 7.6, 3.8);
  c.rect(-28, 7, 56, 3.2);
  c.fill(); c.stroke();
}
function drawNamePlate(c) {
  skP(c, [-40, 14, -34, -12, 34, -12, 40, 14], 'rgba(110,80,55,.82)', 1.3, 0.9);
  skR(c, -31, -7, 62, 16, 1, 'rgba(225,195,120,.97)', 0.9, 0.7);
  txt(c, T('王經理', 'Manager Wang'), 0, 1, T(sans(10, 900), sans(8.5, 800)), INK(0.9));
}
function drawShiba(c, a) {
  const O = 'rgba(230,150,80,.72)', Wt = 'rgba(252,244,230,.98)', wag = Math.sin(a.t * 8) * a.live;
  c.save(); c.translate(44, -6); c.rotate(wag * 0.25); skE(c, 0, -6, 9, 8, O, 1.2, 0.85); skE(c, 0, -6, 4, 3.5, Wt, 0.8, 0.5); c.restore();
  sk(c, p => rr(p, -30, -8, 80, 34, 16), 1.3, 0.85, O);
  ell(c, 10, 20, 30, 5, Wt);
  skE(c, 40, 24, 9, 4, Wt, 1, 0.75);
  skE(c, -40, 24, 10, 4.5, Wt, 1, 0.75); skE(c, -22, 25, 10, 4.5, Wt, 1, 0.75);
  skP(c, [-52, -12, -48, -29, -40, -18], O, 1.1, 0.8); skP(c, [-30, -19, -22, -29, -18, -10], O, 1.1, 0.8);
  skE(c, -34, -6, 18, 16, O, 1.3, 0.85);
  skE(c, -34, 3, 13, 7, Wt, 0.8, 0.35);
  ln(c, p => { p.moveTo(-43, -6); p.quadraticCurveTo(-40, -9, -37, -6); p.moveTo(-31, -6); p.quadraticCurveTo(-28, -9, -25, -6); }, 1.2, INK(0.85));
  ell(c, -40, -12, 1.8, 1.2, '#fff'); ell(c, -28, -12, 1.8, 1.2, '#fff');
  ell(c, -34, -1, 2.6, 2, INK(0.9));
  ln(c, p => { p.moveTo(-38, 3); p.quadraticCurveTo(-36, 5, -34, 3); p.quadraticCurveTo(-32, 5, -30, 3); }, 0.9, INK(0.7));
  ell(c, -45, 0, 3, 1.8, 'rgba(240,120,130,.4)'); ell(c, -23, 0, 3, 1.8, 'rgba(240,120,130,.4)');
}
function drawGrowthArrow(c) {
  sk(c, p => { p.moveTo(-58, -5); p.lineTo(32, -5); p.lineTo(32, -13); p.lineTo(58, 0); p.lineTo(32, 13); p.lineTo(32, 5); p.lineTo(-58, 5); p.closePath(); }, 1.4, 0.9, 'rgba(214,72,60,.88)');
  ln(c, p => { p.moveTo(-54, -2); p.lineTo(28, -2); }, 1.2, 'rgba(255,255,255,.6)');
}

/* ===== 4-9 Classroom ===== */
function bgClass(c) {
  wall(c, '#f5f1e6');
  c.fillStyle = 'rgba(240,225,190,.25)'; c.fillRect(0, 0, W, 420);
  hatch(c, 0, 0, W, 420, 10, 0.05);
  circ(c, 82, 14, 2, INK(0.8)); circ(c, 278, 14, 2, INK(0.8));
  // blackboard
  skR(c, 14, 60, 254, 184, 3, 'rgba(170,120,70,.68)', 1.5, 0.9);
  skR(c, 21, 67, 240, 168, 1, 'rgba(58,92,78,.93)', 1, 0.6);
  for (const [x, y, rx] of [[70, 150, 40], [200, 210, 50], [140, 100, 30]]) ell(c, x, y, rx, rx * 0.4, 'rgba(255,255,255,.05)');
  const ch = 'rgba(255,255,255,.82)';
  fit(c, T('直角 = 90°', 'Right angle = 90°'), 104, 176, 120, hand(T(17, 16)), ch);
  ln(c, p => { p.moveTo(36, 184); p.lineTo(36, 204); p.lineTo(56, 204); p.moveTo(36, 198); p.lineTo(42, 198); p.lineTo(42, 204); }, 1.4, ch);
  fit(c, T('10/25（日）', 'Sun 10/25'), 222, 222, 72, hand(14), ch);
  // garland with phonetic cards
  sk(c, p => { p.moveTo(24, 72); p.quadraticCurveTo(80, 82, 150, 85); p.quadraticCurveTo(206, 86, 258, 72); }, 1, 0.7);
  skR(c, 196, 88, 40, 44, 3, '#fffdf8', 1.2, 0.8); c.fillStyle = 'rgba(120,170,110,.9)'; c.fillRect(196, 88, 40, 6);
  txt(c, T('ㄇ', 'C'), 216, 113, '900 22px "Noto Sans TC", sans-serif', 'rgba(110,165,100,1)');
  skR(c, 213, 82, 6, 11, 1, 'rgba(190,150,100,.95)', 1, 0.8);
  // chalk tray
  skR(c, 18, 236, 248, 8, 1, 'rgba(170,120,70,.75)', 1.2, 0.85);
  skR(c, 162, 230, 16, 5, 2, '#ffffff', 0.8, 0.6); skR(c, 184, 231, 12, 5, 2, 'rgba(255,214,90,1)', 0.8, 0.6);
  // cabinet
  skR(c, 258, 298, 94, 76, 2, WOOD, 1.3, 0.9); pencilLine(c, 305, 300, 305, 372, 1, 0.6);
  circ(c, 299, 336, 2, INK(0.7)); circ(c, 311, 336, 2, INK(0.7));
  // floor
  boards(c, 420, '#e8dfcc', 14);
  // teacher's desk with books, an apple and the globe's stand
  skR(c, 14, 366, 190, 12, 2, 'rgba(170,120,70,.78)', 1.4, 0.9);
  skR(c, 22, 378, 174, 70, 1, 'rgba(190,140,85,.58)', 1.3, 0.85);
  pencilLine(c, 22, 400, 196, 400, 1, 0.5); circ(c, 109, 389, 2, INK(0.7));
  skR(c, 148, 354, 48, 12, 2, 'rgba(64,110,170,.65)', 1, 0.8); skR(c, 152, 344, 42, 10, 2, 'rgba(214,72,60,.6)', 1, 0.8);
  skE(c, 136, 358, 7, 7, 'rgba(214,72,60,.85)', 1, 0.8); pencilLine(c, 136, 351, 138, 346, 1.1, 0.8); ell(c, 141, 348, 3, 1.6, LEAF, 0.4);
  skE(c, 95, 364, 18, 4, 'rgba(110,80,55,.88)', 1.1, 0.85);
  ln(c, p => { p.moveTo(95, 362); p.quadraticCurveTo(96, 355, 80, 351); }, 2.6, 'rgba(200,160,80,.95)');
  sk(c, p => { p.moveTo(95, 362); p.quadraticCurveTo(96, 355, 80, 351); }, 0.7, 0.6);
  // student desk in front
  skR(c, 160, 444, 196, 10, 2, 'rgba(205,170,120,.88)', 1.4, 0.9);
  skR(c, 168, 454, 180, 30, 1, 'rgba(190,150,100,.6)', 1.3, 0.85);
  skR(c, 320, 434, 30, 10, 1, 'rgba(255,255,255,.95)', 1, 0.7); skR(c, 322, 428, 26, 6, 1, 'rgba(120,170,110,.8)', 0.9, 0.7);
}
function drawMotto(c) {
  ln(c, p => { p.moveTo(-98, -18); p.lineTo(-92, -12); p.moveTo(98, -18); p.lineTo(92, -12); }, 1, INK(0.7));
  sk(c, p => { p.moveTo(-94, -12); p.quadraticCurveTo(0, -8, 94, -12); p.lineTo(94, 14); p.quadraticCurveTo(0, 18, -94, 14); p.closePath(); }, 1.4, 0.9, 'rgba(214,72,60,.82)');
  for (const x of [-60, 0, 60]) pencilLine(c, x, -8, x + 2, 14, 0.6, 0.2);
  txt(c, T('敬業樂群', 'Learn & Grow Together'), 0, 3, T('900 17px "Noto Serif TC", serif', sans(13, 800)), 'rgba(255,232,150,1)');
}
function card(c, ch, col) {
  skR(c, -21, -22, 42, 50, 3, '#fffdf8', 1.3, 0.85);
  c.fillStyle = col; c.fillRect(-21, -22, 42, 7);
  txt(c, ch, 0, 7, '900 26px "Noto Sans TC", sans-serif', col);
  skR(c, -3, -29, 6, 12, 1, 'rgba(190,150,100,.95)', 1, 0.8);
}
const drawCardA = c => card(c, T('ㄅ', 'A'), 'rgba(214,72,60,.9)'), drawCardB = c => card(c, T('ㄆ', 'B'), 'rgba(64,110,170,.95)');
function drawSetSquare(c) {
  sk(c, p => { p.moveTo(-36, 30); p.lineTo(36, 30); p.lineTo(-36, -30); p.closePath(); }, 1.4, 0.9, 'rgba(228,195,125,.92)');
  sk(c, p => { p.moveTo(-27, 22); p.lineTo(4, 22); p.lineTo(-27, -4); p.closePath(); }, 1, 0.7, 'rgba(58,92,78,.93)');
  c.strokeStyle = INK(0.7); c.lineWidth = 0.8; c.beginPath();
  for (let x = -32; x <= 32; x += 4) { c.moveTo(x, 30); c.lineTo(x, (x + 32) % 16 === 0 ? 25 : 27.5); }
  c.stroke();
}
function drawEraser(c) {
  skR(c, -31, -12, 62, 14, 3, 'rgba(64,110,170,.72)', 1.3, 0.85);
  skR(c, -31, 2, 62, 11, 1, 'rgba(90,90,95,.78)', 1.1, 0.8);
  c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(-26, 5, 44, 3);
  ln(c, p => { p.moveTo(-22, -7); p.lineTo(22, -7); }, 1, 'rgba(255,255,255,.45)');
}
function drawAward(c) {
  skR(c, -37, -48, 74, 96, 2, 'rgba(225,190,110,.88)', 1.5, 0.9);
  skR(c, -31, -42, 62, 84, 1, '#fffaf0', 0.9, 0.6);
  pencilRect(c, -27, -38, 54, 76, 0.8, 0.4);
  txt(c, T('獎狀', 'AWARD'), 0, -26, T('900 16px "Noto Serif TC", serif', '900 13px "Playfair Display", serif'), 'rgba(214,72,60,.95)');
  ln(c, p => { for (let y = -12; y <= 18; y += 7) { p.moveTo(-20, y); p.lineTo(y === 18 ? 0 : 20, y); } }, 0.9, INK(0.3));
  poly(c, [12, 30, 8, 42, 14, 38, 16, 42], RED); poly(c, [20, 30, 24, 42, 18, 38, 16, 42], RED);
  skE(c, 16, 28, 8, 8, 'rgba(240,190,70,.95)', 1, 0.75);
}
function drawHamster(c, a) {
  skR(c, -40, 22, 80, 12, 3, 'rgba(120,170,200,.72)', 1.3, 0.85);
  c.fillStyle = 'rgba(240,215,160,.85)'; c.fillRect(-36, 16, 72, 6);
  const sp = a.t * 3 * a.live;
  pencilLine(c, 16, 2, 16, 18, 1.4, 0.7);
  skE(c, 16, 0, 15, 15, 'rgba(255,214,90,.3)', 1.2, 0.8);
  ln(c, p => { for (let k = 0; k < 3; k++) { const t = sp + k * Math.PI / 3; p.moveTo(16 + Math.cos(t) * 14, Math.sin(t) * 14); p.lineTo(16 - Math.cos(t) * 14, -Math.sin(t) * 14); } }, 0.8, INK(0.5));
  const hop = Math.abs(Math.sin(a.t * 3)) * 2 * a.live;
  c.save(); c.translate(-14, 9 - hop);
  skE(c, -6, -8, 3.5, 3.5, 'rgba(240,170,170,.95)', 0.8, 0.7); skE(c, 4, -9, 3.5, 3.5, 'rgba(240,170,170,.95)', 0.8, 0.7);
  skE(c, 0, 0, 13, 10, 'rgba(240,190,120,.97)', 1.2, 0.85);
  ell(c, 3, 4, 7, 4.5, '#fdf6ea');
  circ(c, 6, -3, 1.6, INK(0.9)); ell(c, 12, -1, 1.5, 1.2, 'rgba(240,120,130,1)'); ell(c, 6, 1, 2.6, 1.6, 'rgba(240,120,130,.4)');
  c.restore();
  c.strokeStyle = INK(0.45); c.lineWidth = 0.9; c.beginPath();
  for (let x = -35; x <= 35; x += 7) { c.moveTo(x, 22); c.lineTo(x, -4 - 26 * Math.sqrt(Math.max(0, 1 - (x / 38) ** 2))); }
  c.stroke();
  sk(c, p => { p.moveTo(-38, 22); p.lineTo(-38, -4); p.ellipse(0, -4, 38, 26, 0, Math.PI, 0); p.lineTo(38, 22); }, 1.2, 0.8);
  ln(c, p => p.arc(0, -32, 3, 0, Math.PI * 2), 1.2, INK(0.7));
}
function drawPencilCase(c) {
  skR(c, -50, -12, 100, 26, 11, 'rgba(255,190,200,.8)', 1.3, 0.85);
  pencilLine(c, -42, -5, 40, -5, 1, 0.6);
  c.strokeStyle = INK(0.4); c.lineWidth = 0.7; c.beginPath(); for (let x = -40; x < 40; x += 3) { c.moveTo(x, -7); c.lineTo(x, -3); } c.stroke();
  skR(c, 38, -9, 8, 10, 2, 'rgba(200,200,210,.95)', 0.9, 0.7);
  for (let x = -16; x < 34; x += 10) circ(c, x, 6, 1.8, 'rgba(255,255,255,.9)');
  skE(c, -32, 5, 7, 6, '#fff', 0.9, 0.6);
  skE(c, -35, -3, 2, 4, '#fff', 0.8, 0.5); skE(c, -29, -3, 2, 4, '#fff', 0.8, 0.5);
  circ(c, -34, 5, 0.9, INK(0.9)); circ(c, -30, 5, 0.9, INK(0.9));
}
function drawGlobe(c) {
  ln(c, p => p.arc(0, 0, 37, -Math.PI / 2, Math.PI / 2), 4, 'rgba(200,160,80,.95)');
  sk(c, p => p.arc(0, 0, 37, -Math.PI / 2, Math.PI / 2), 0.7, 0.6);
  pencilLine(c, 0, -41, 0, -30, 1.4, 0.8); pencilLine(c, 0, 30, 0, 41, 1.4, 0.8);
  circ(c, 0, -38, 2.5, INK(0.8)); circ(c, 0, 38, 2.5, INK(0.8));
  skE(c, 0, 0, 30, 30, 'rgba(120,180,220,.8)', 1.4, 0.9);
  c.save(); c.beginPath(); c.arc(0, 0, 30, 0, Math.PI * 2); c.clip();
  poly(c, [-22, -18, -6, -24, -2, -12, -12, -2, -8, 10, -16, 18, -24, 2], 'rgba(120,170,110,.9)');
  poly(c, [4, -20, 20, -16, 26, -2, 16, 4, 20, 16, 8, 22, 6, 6, 0, -6], 'rgba(120,170,110,.9)');
  ln(c, p => { p.ellipse(0, 0, 30, 6, 0, 0, Math.PI); p.moveTo(0, -30); p.ellipse(0, 0, 12, 30, 0, -Math.PI / 2, Math.PI / 2); }, 0.7, 'rgba(255,255,255,.55)');
  c.restore();
}

/* ===== 4-10 Moving day ===== */
function bgMoving(c) {
  wall(c, '#f5f1e8', 328, 9, 0.05);
  for (const x of [26, 180, 334]) circ(c, x, 22, 2.2, INK(0.8));
  // big bare window
  skR(c, 112, 84, 136, 138, 3, 'rgba(160,205,235,.5)', 1.6, 0.9);
  poly(c, [112, 200, 140, 186, 170, 196, 210, 180, 248, 192, 248, 222, 112, 222], 'rgba(200,190,175,.5)');
  for (const [x, y, r] of [[136, 170, 14], [150, 160, 12], [226, 168, 12]]) skE(c, x, y, r, r, 'rgba(120,170,110,.5)', 0.8, 0.4);
  ell(c, 160, 110, 16, 6, 'rgba(255,255,255,.85)'); ell(c, 214, 124, 12, 5, 'rgba(255,255,255,.8)');
  pencilLine(c, 180, 84, 180, 222, 1.1, 0.7); pencilLine(c, 112, 150, 248, 150, 1.1, 0.7);
  skR(c, 104, 222, 152, 8, 2, '#efe6d4', 1.1, 0.8);
  // light switch and outlet
  skR(c, 266, 160, 14, 20, 2, PAPER, 1, 0.7); skR(c, 271, 165, 4, 8, 1, '#e2e2e2', 0.7, 0.5);
  skR(c, 80, 300, 11, 14, 2, PAPER, 0.9, 0.6);
  // floor with sunlight
  boards(c, 328, '#e9dcc4', 18);
  for (let y = 328, r = 0; y < H; y += 18, r++) for (let x = (r % 3) * 50 + 20; x < W; x += 150) pencilLine(c, x, y, x, y + 18, 0.7, 0.25);
  poly(c, [112, 330, 248, 330, 300, 470, 90, 470], 'rgba(255,230,150,.18)');
  skR(c, 0, 322, W, 8, 1, '#f2ecdf', 1, 0.6);
  // a roll of tape left on the floor
  skE(c, 250, 470, 10, 5, 'rgba(220,190,120,.8)', 1, 0.75); skE(c, 250, 469, 4, 2, '#e9dcc4', 0.8, 0.5);
}
function banner(c, word) {
  sk(c, p => { p.moveTo(-77, -20); p.quadraticCurveTo(0, -4, 77, -20); }, 1, 0.7);
  sk(c, p => { p.moveTo(-66, -15); p.quadraticCurveTo(0, -2, 66, -15); p.lineTo(66, 10); p.quadraticCurveTo(0, 24, -66, 10); p.closePath(); }, 1.4, 0.9, 'rgba(255,214,90,.85)');
  for (const x of [-66, 66]) { pencilLine(c, x, -15, x - Math.sign(x) * 3, -19, 0.8, 0.6); }
  txt(c, word, 0, 6, T('900 19px "Noto Sans TC", sans-serif', '900 17px "Noto Sans TC", sans-serif'), 'rgba(214,72,60,.95)');
}
const drawBannerL = c => banner(c, T('歡迎', 'WELCOME')), drawBannerR = c => banner(c, T('回家', 'HOME'));
function drawLamp(c) {
  skE(c, 0, 78, 20, 4.5, 'rgba(90,90,95,.82)', 1.2, 0.85);
  skR(c, -2, -50, 4, 128, 2, 'rgba(150,150,158,.95)', 1, 0.8);
  skR(c, -7, -6, 14, 30, 3, 'rgba(220,235,245,.75)', 0.9, 0.6);
  ln(c, p => { for (const [x, y] of [[-3, -1], [3, 5], [-3, 11], [3, 17]]) { p.moveTo(x + 1.8, y); p.arc(x, y, 1.8, 0, Math.PI * 2); } }, 0.6, INK(0.4));
  skP(c, [-17, -82, 17, -82, 26, -50, -26, -50], 'rgba(255,236,190,.97)', 1.4, 0.9);
  for (const x of [-12, 0, 12]) pencilLine(c, x * 0.75, -80, x, -52, 0.6, 0.25);
}
function drawSofa(c) {
  const M = 'rgba(225,175,80,.68)';
  skR(c, -66, 30, 6, 9, 1, 'rgba(110,80,55,.9)', 1, 0.8); skR(c, 60, 30, 6, 9, 1, 'rgba(110,80,55,.9)', 1, 0.8);
  skR(c, -68, -38, 136, 46, 14, M, 1.4, 0.9);
  pencilLine(c, 0, -34, 0, 4, 0.9, 0.5);
  skR(c, -66, 4, 132, 28, 6, M, 1.4, 0.9); pencilLine(c, 0, 6, 0, 30, 0.9, 0.5);
  skR(c, -80, -14, 20, 46, 9, M, 1.4, 0.9); skR(c, 60, -14, 20, 46, 9, M, 1.4, 0.9);
  skR(c, -50, -20, 26, 24, 7, 'rgba(120,165,215,.8)', 1.1, 0.8);
  ln(c, p => { p.moveTo(-40, -32); p.lineTo(-22, -8); p.moveTo(30, -32); p.lineTo(46, -12); p.moveTo(20, 10); p.lineTo(34, 26); }, 2, 'rgba(255,255,255,.75)');
}
function boxBase(c, w, h) {
  skR(c, -w / 2, -h / 2, w, h, 1, 'rgba(205,165,115,.78)', 1.4, 0.9);
  c.fillStyle = 'rgba(235,215,170,.85)'; c.fillRect(-6, -h / 2, 12, 16);
  pencilLine(c, -6, -h / 2, -6, -h / 2 + 16, 0.7, 0.4); pencilLine(c, 6, -h / 2, 6, -h / 2 + 16, 0.7, 0.4);
  pencilLine(c, -w / 2, -h / 2 + 5, w / 2, -h / 2 + 5, 0.6, 0.3);
}
function drawBoxBottom(c) {
  boxBase(c, 76, 60);
  fit(c, T('廚房', 'KITCHEN'), -4, 10, 58, hand(T(17, 15)), INK(0.9));
  ln(c, p => { for (const x of [22, 30]) { p.moveTo(x, -10); p.lineTo(x, -24); p.moveTo(x - 3, -20); p.lineTo(x, -24); p.lineTo(x + 3, -20); } }, 1.2, INK(0.75));
}
function drawBoxTop(c) {
  boxBase(c, 66, 52);
  skR(c, -26, -4, 52, 18, 2, '#fffdf8', 1, 0.75);
  txt(c, T('易碎', 'FRAGILE'), -5, 5.5, sans(T(10, 8.5), 900), 'rgba(214,72,60,.95)');
  ln(c, p => { p.moveTo(14, -1); p.lineTo(22, -1); p.quadraticCurveTo(22, 6, 18, 6); p.quadraticCurveTo(14, 6, 14, -1); p.moveTo(18, 6); p.lineTo(18, 11); p.moveTo(15, 11); p.lineTo(21, 11); }, 0.9, 'rgba(214,72,60,.95)');
}
function drawRug(c) {
  c.strokeStyle = INK(0.5); c.lineWidth = 0.8; c.beginPath();
  for (let y = -16; y <= 16; y += 4) { c.moveTo(-84, y); c.lineTo(-76, y); c.moveTo(76, y); c.lineTo(84, y); }
  c.stroke();
  skR(c, -76, -20, 152, 40, 2, 'rgba(214,72,60,.48)', 1.4, 0.9);
  c.fillStyle = 'rgba(255,240,210,.65)'; c.fillRect(-64, -9, 128, 18);
  pencilRect(c, -68, -13, 136, 26, 1, 0.55);
  for (const x of [-40, 0, 40]) skP(c, [x - 11, 0, x, -7, x + 11, 0, x, 7], 'rgba(64,110,170,.6)', 0.9, 0.6);
  for (const x of [-20, 20]) circ(c, x, 0, 2, 'rgba(214,72,60,.7)');
}
function drawBoxCat(c, a) {
  const pk = -Math.abs(Math.sin(a.t * 1.2)) * 4 * a.live, K = 'rgba(60,60,66,.88)';
  skP(c, [-34, -4, -42, -22, -26, -26, -20, -4], 'rgba(190,150,100,.8)', 1.2, 0.85);
  skP(c, [34, -4, 42, -22, 26, -26, 20, -4], 'rgba(190,150,100,.8)', 1.2, 0.85);
  c.save(); c.translate(0, pk);
  skP(c, [-17, -24, -14, -38, -4, -30], K, 1.1, 0.8); skP(c, [4, -30, 14, -38, 17, -24], K, 1.1, 0.8);
  skE(c, 0, -16, 18, 15, K, 1.3, 0.9);
  skE(c, 0, -9, 9, 6, '#fbfaf6', 0.8, 0.35);
  circ(c, -7, -19, 3.8, 'rgba(205,225,120,1)'); circ(c, 7, -19, 3.8, 'rgba(205,225,120,1)');
  ell(c, -7, -19, 1.2, 3, INK(0.95)); ell(c, 7, -19, 1.2, 3, INK(0.95));
  ell(c, 0, -11, 1.8, 1.3, 'rgba(240,130,140,1)');
  ln(c, p => { p.moveTo(-10, -9); p.lineTo(-20, -11); p.moveTo(10, -9); p.lineTo(20, -11); }, 0.6, 'rgba(255,255,255,.7)');
  c.restore();
  skR(c, -36, -4, 72, 46, 1, 'rgba(205,165,115,.88)', 1.4, 0.9);
  skE(c, -11, -4, 6, 4, '#fbfaf6', 1, 0.8); skE(c, 11, -4, 6, 4, '#fbfaf6', 1, 0.8);
  fit(c, T('雜物', 'MISC'), 0, 20, 60, hand(17), INK(0.85));
}
function drawMonstera(c) {
  ln(c, p => { for (const [x, y] of [[-14, -26], [12, -32], [-4, -40], [14, -8], [-16, -4]]) { p.moveTo(0, 12); p.quadraticCurveTo(x * 0.3, y * 0.5, x, y); } }, 1.4, 'rgba(90,140,80,.85)');
  for (const [x, y, rx, ry, r] of [[-15, -4, 11, 7, -0.9], [14, -8, 11, 7, 0.8], [-14, -26, 12, 8, -0.6], [12, -32, 12, 8, 0.5], [-3, -40, 10, 7, -0.1]]) {
    skE(c, x, y, rx, ry, 'rgba(90,150,90,.75)', 1, 0.7, r);
    ln(c, p => { p.moveTo(x - Math.cos(r) * rx * 0.8, y - Math.sin(r) * rx * 0.8); p.lineTo(x + Math.cos(r) * rx * 0.8, y + Math.sin(r) * rx * 0.8); }, 0.7, 'rgba(255,255,255,.5)');
  }
  sk(c, p => { p.moveTo(-18, 14); p.lineTo(18, 14); p.lineTo(14, 48); p.lineTo(-14, 48); p.closePath(); }, 1.3, 0.9, 'rgba(200,110,80,.72)');
  skR(c, -20, 10, 40, 7, 2, 'rgba(205,115,85,.85)', 1.1, 0.85);
}

/* ===== Q-style sounds for this world ===== */
const { q, note, puff } = QS;
defineCreatureSound('home_dog', (ac, o, t) => [0, 0.2].forEach((d, k) => { q(ac, o, t + d, [[0, 620 + k * 60], [0.05, 900 + k * 60], [0.14, 640]], 0.15, { vol: 0.42, over: 0.22 }); puff(ac, o, t + d, 0.05, 1400, 0.05); }));
defineCreatureSound('home_cat', (ac, o, t) => q(ac, o, t, [[0, 760], [0.12, 1250], [0.42, 860]], 0.45, { vib: [7, 22], vol: 0.42 }));
defineCreatureSound('home_purr', (ac, o, t) => { q(ac, o, t, [[0, 420], [0.3, 520]], 0.34, { trem: [26, 0.55], vol: 0.4 }); q(ac, o, t + 0.36, [[0, 640], [0.1, 900], [0.26, 760]], 0.28, { vib: [8, 18], vol: 0.36 }); });
defineCreatureSound('home_squeak', (ac, o, t) => [0, 0.17].forEach((d, k) => q(ac, o, t + d, [[0, 1250 - k * 80], [0.04, 1750 - k * 80], [0.12, 1400 - k * 80]], 0.13, { vib: [30, 50], vol: 0.4, over: 0.25 })));
defineCreatureSound('home_fish', (ac, o, t) => { [0, 0.11, 0.24].forEach((d, k) => q(ac, o, t + d, [[0, 420 + k * 140], [0.06, 1000 + k * 260]], 0.07, { attack: 0.004, hold: 0.3, vol: 0.38 })); note(ac, o, t + 0.4, 2093, 0.25, 0.18); });
defineCreatureSound('home_hamster', (ac, o, t) => [0, 0.09, 0.18, 0.36].forEach((d, k) => q(ac, o, t + d, [[0, 2300 + (k % 2) * 200], [0.03, 2900], [0.07, 2500]], 0.07, { attack: 0.003, vol: 0.36 })));
defineThingSound('home_tick', (ac, o, t, r) => { q(ac, o, t, [[0, 1400 * r], [0.03, 1300 * r]], 0.045, { attack: 0.002, hold: 0.1, vol: 0.42, over: 0.25 }); q(ac, o, t + 0.16, [[0, 1050 * r], [0.03, 980 * r]], 0.05, { attack: 0.002, hold: 0.1, vol: 0.42, over: 0.25 }); });
defineThingSound('home_clink', (ac, o, t, r) => { note(ac, o, t, 1568 * r, 0.22, 0.28); note(ac, o, t + 0.06, 2093 * r, 0.2, 0.18); });
defineThingSound('home_fluff', (ac, o, t, r) => { puff(ac, o, t, 0.16, 1200, 0.12); q(ac, o, t + 0.02, [[0, 520 * r], [0.14, 820 * r]], 0.18, { vol: 0.34 }); });
defineThingSound('home_paper', (ac, o, t, r) => { puff(ac, o, t, 0.08, 3200, 0.1); note(ac, o, t + 0.05, 1320 * r, 0.14, 0.3); });
defineThingSound('home_click', (ac, o, t, r) => [0, 0.06, 0.12].forEach((d, k) => q(ac, o, t + d, [[0, (1500 + k * 150) * r], [0.02, (1350 + k * 150) * r]], 0.03, { attack: 0.002, hold: 0.1, vol: 0.38 })));
defineThingSound('home_tile', (ac, o, t, r) => { q(ac, o, t, [[0, 1180 * r], [0.04, 1050 * r]], 0.07, { attack: 0.002, hold: 0.08, vol: 0.42, over: 0.3 }); note(ac, o, t + 0.09, 2360 * r, 0.22, 0.2); });

defineChapter({
  key: 'home', order: 4,
  name: { zh: "生活日常", en: "Everyday Life" },
  blurb: { zh: "書桌、廚房、浴室：強迫症最熟悉的戰場。", en: "Desks, kitchens, bathrooms: a perfectionist's home turf." },
  style: { zh: "鉛筆素描", en: "Pencil sketch" },
  narrator: { zh: "便利貼", en: "Sticky Note" },
  song: 'desk',
    comments: {
      far: [{ zh: ["書房大地震？", "便利貼嚇到快掉下來，尺還躺在地上。"], en: ["Desk-quake?", "Sticky Note almost fell off. The ruler is on the floor."] }, { zh: ["好亂喔", "月曆都不知道今天是幾號了。"], en: ["What a mess", "The calendar doesn't know what day it is anymore."] }],
      close: [{ zh: ["再整理一下", "就差一點，便利貼已經幫你寫好「快完成了」。"], en: ["Tidy a bit more", "Nearly there. Sticky Note already wrote 'almost done'."] }, { zh: ["差一把尺", "拿尺量一量，下次一定可以。"], en: ["One ruler short", "Measure it once more. You'll get it next time."] }],
      pass: [{ zh: ["勉強能看", "可以工作了，但相框好像還在偷偷歪。"], en: ["Good enough", "Workable, but the photo frame is sneakily tilting."] }, { zh: ["及格便利貼", "「整理書房」先打一個勾，下次打兩個。"], en: ["Sticky pass", "One tick on 'tidy the study'. Two next time."] }],
      good: [{ zh: ["清清爽爽！", "坐在這張桌子前，連打字都變快了。"], en: ["Fresh and tidy!", "At this desk, even typing feels faster."] }, { zh: ["整理達人", "辭典說：終於可以好好站著了。"], en: ["Tidy expert", "Dictionary says: finally I can stand up properly."] }],
      perfect: [{ zh: ["完美書房♪", "零誤差！便利貼感動到黏得更緊了。"], en: ["Perfect study♪", "Zero error! Sticky Note is so moved it's even stickier."] }, { zh: ["收納之神", "筆電、尺、月曆一起為你鼓掌（月曆用紙鼓掌）。"], en: ["Tidying god", "Laptop, ruler and calendar applaud (the calendar flaps)."] }],
    },
  stages: [
    { key: 'desk', title: { zh: "書房午後", en: "Study Afternoon" }, place: { zh: "台灣 台北", en: "Taipei, Taiwan" },
      intro: { zh: "強迫症最熟悉的地方。便利貼只歪一點點，你忍得住嗎？", en: "Every perfectionist knows this place. The sticky note is barely tilted. Can you stand it?" },
      bg: bgDesk,
      objects: [
      { id: 'frame', name: { zh: '相框', en: 'Photo frame' }, x: 95, y: 110, w: 90, h: 70, mag: 8, draw: drawFrame, sfx: 'wood' },
      { id: 'calendar', name: { zh: '月曆', en: 'Calendar' }, x: 275, y: 105, w: 80, h: 96, mag: 11, draw: drawCalendar, sfx: 'pop' },
      { id: 'sticky', name: { zh: '便利貼', en: 'Sticky note' }, x: 280, y: 228, w: 56, h: 56, near: true, draw: drawSticky, sfx: 'pop' },
      { id: 'book', name: { zh: '辭典', en: 'Dictionary' }, x: 60, y: 290, w: 34, h: 80, mag: 9, pad: 12, draw: drawBook, sfx: 'wood' },
      { id: 'laptop', name: { zh: '筆電', en: 'Laptop' }, x: 190, y: 385, w: 136, h: 80, mag: 6, draw: drawLaptop, sfx: 'beep' },
      { id: 'ruler', name: { zh: '尺', en: 'Ruler' }, x: 110, y: 452, w: 150, h: 22, mag: 5, pad: 12, draw: drawRuler, sfx: 'wood' }
      ] },
    { key: 'home-kitchen', title: { zh: "廚房餐桌", en: "Kitchen Table" }, place: { zh: "你家廚房", en: "Your kitchen" },
      intro: { zh: "早餐時間。狗狗已經坐好了，桌上的東西也該坐好。", en: "Breakfast time. The puppy is sitting nicely. Now the table should too." },
      bg: bgKitchen, animated: true,
      objects: [
      { id: 'clock', name: { zh: '掛鐘', en: 'Wall clock' }, x: 80, y: 96, w: 84, h: 84, mag: 10, draw: drawClock, sfx: 'home_tick' },
      { id: 'spices', name: { zh: '調味罐架', en: 'Spice shelf' }, x: 270, y: 178, w: 130, h: 56, near: true, draw: drawSpices, sfx: 'home_clink' },
      { id: 'placeset', name: { zh: '餐墊', en: 'Placemat' }, x: 165, y: 272, w: 150, h: 42, mag: 6, draw: drawPlaceSet, sfx: 'home_clink' },
      { id: 'puppy', name: { zh: '小狗', en: 'Puppy' }, x: 285, y: 418, w: 84, h: 100, mag: 13, draw: drawPuppy, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 2.2)) * 3 * l }), call: 'home_dog' }
      ] },
    { key: 'home-bath', title: { zh: "浴室磁磚", en: "Bathroom Tiles" }, place: { zh: "你家浴室", en: "Your bathroom" },
      intro: { zh: "整面磁磚都很整齊，只有一塊花磚……你一定看得到。", en: "Every tile is perfect except one patterned tile. You'll spot it." },
      bg: bgBath, animated: true,
      objects: [
      { id: 'mirror', name: { zh: '鏡子', en: 'Mirror' }, x: 100, y: 96, w: 116, h: 120, mag: 7, draw: drawMirror, sfx: 'shimmer' },
      { id: 'cup', name: { zh: '牙刷杯', en: 'Toothbrush cup' }, x: 58, y: 186, w: 40, h: 56, mag: 12, pad: 12, draw: drawCup, sfx: 'home_clink' },
      { id: 'towel', name: { zh: '毛巾', en: 'Towel' }, x: 286, y: 128, w: 92, h: 132, mag: 9, draw: drawTowel, sfx: 'home_fluff' },
      { id: 'tile', name: { zh: '花磚', en: 'Patterned tile' }, x: 216, y: 264, w: 46, h: 46, near: true, pad: 10, draw: drawTile, sfx: 'home_tile' },
      { id: 'duck', name: { zh: '小黃鴨', en: 'Rubber duck' }, x: 262, y: 306, w: 56, h: 50, mag: 14, draw: drawDuck, habit: (t, l) => ({ dx: Math.sin(t * 1.3) * 2 * l, dy: Math.sin(t * 2.6) * 1.5 * l }), call: 'home_squeak' }
      ] },
    { key: 'home-closet', title: { zh: "衣櫃", en: "The Wardrobe" }, place: { zh: "你的衣櫃", en: "Your closet" },
      intro: { zh: "打開衣櫃：襯衫、手套、毛衣……還有一隻偷睡的貓。", en: "Open the wardrobe: a shirt, mittens, sweaters, and a cat napping where it shouldn't." },
      bg: bgWardrobe, animated: true,
      objects: [
      { id: 'shirt', name: { zh: '襯衫', en: 'Shirt' }, x: 95, y: 140, w: 104, h: 156, mag: 8, draw: drawShirt, sfx: 'home_fluff' },
      { id: 'mittenL', name: { zh: '左手套', en: 'Left mitten' }, x: 210, y: 124, w: 52, h: 120, mag: 11, draw: drawMittenL, link: { to: 'mittenR', k: 0.6 }, sfx: 'jingle' },
      { id: 'mittenR', name: { zh: '右手套', en: 'Right mitten' }, x: 282, y: 124, w: 52, h: 120, mag: 6, draw: drawMittenR, sfx: 'jingle' },
      { id: 'sweaters', name: { zh: '毛衣', en: 'Sweaters' }, x: 100, y: 268, w: 112, h: 62, near: true, draw: drawSweaters, sfx: 'home_fluff' },
      { id: 'cat', name: { zh: '貓咪', en: 'Sleepy cat' }, x: 270, y: 276, w: 104, h: 46, mag: 12, draw: drawSleepyCat, habit: (t, l) => ({ dy: Math.sin(t * 1.6) * 0.8 * l }), call: 'home_purr' }
      ] },
    { key: 'home-fridge', title: { zh: "冰箱門", en: "Fridge Door" }, place: { zh: "你家廚房一角", en: "A corner of your kitchen" },
      intro: { zh: "冰箱門是全家的公告欄。磁鐵吸得住紙，吸不住歪。", en: "The fridge door is the family notice board. Magnets hold the paper, not the angle." },
      bg: bgFridge, animated: true,
      objects: [
      { id: 'cat', name: { zh: '冰箱上的貓', en: 'Cat on top' }, x: 250, y: 90, w: 112, h: 56, mag: 13, draw: drawFridgeCat, habit: (t, l) => ({ dy: Math.sin(t * 1.5) * 0.8 * l }), call: 'home_cat' },
      { id: 'polaroid', name: { zh: '拍立得', en: 'Polaroid' }, x: 100, y: 172, w: 72, h: 84, mag: 9, draw: drawPolaroid, sfx: 'home_paper' },
      { id: 'drawing', name: { zh: '小孩的畫', en: "Kid's drawing" }, x: 110, y: 296, w: 116, h: 96, mag: 6, draw: drawKidArt, sfx: 'home_paper' },
      { id: 'board', name: { zh: '白板', en: 'Whiteboard' }, x: 258, y: 300, w: 104, h: 112, mag: 10, draw: drawWhiteboard, link: { to: 'marker', k: 0.5 }, sfx: 'pop' },
      { id: 'marker', name: { zh: '白板筆', en: 'Marker' }, x: 258, y: 404, w: 24, h: 92, mag: 7, pad: 14, draw: drawMarker, sfx: 'home_click' },
      { id: 'list', name: { zh: '購物清單', en: 'Shopping list' }, x: 105, y: 410, w: 84, h: 96, near: true, draw: drawList, sfx: 'home_paper' }
      ] },
    { key: 'home-gallery', title: { zh: "臥室掛畫", en: "Bedroom Gallery" }, place: { zh: "你的臥室", en: "Your bedroom" },
      intro: { zh: "掛畫牆是強迫症的考場：每一框都要正，連枕頭也是。", en: "A gallery wall is a perfectionist's exam. Every frame counts, and so does the pillow." },
      bg: bgBedroom, animated: true,
      objects: [
      { id: 'pressed', name: { zh: '押花小框', en: 'Pressed flower' }, x: 50, y: 100, w: 56, h: 74, near: true, draw: drawPressed, sfx: 'twinkle' },
      { id: 'seascape', name: { zh: '海景畫', en: 'Seascape' }, x: 165, y: 92, w: 124, h: 86, mag: 5, draw: drawSeascape, sfx: 'wood' },
      { id: 'family', name: { zh: '全家福', en: 'Family photo' }, x: 112, y: 205, w: 78, h: 68, mag: 9, draw: drawFamily, link: { to: 'baby', k: 0.5 }, sfx: 'wood' },
      { id: 'baby', name: { zh: '寶寶照', en: 'Baby photo' }, x: 218, y: 205, w: 64, h: 68, mag: 12, draw: drawBaby, sfx: 'twinkle' },
      { id: 'pillow', name: { zh: '枕頭', en: 'Pillow' }, x: 128, y: 320, w: 132, h: 50, near: true, draw: drawPillow, sfx: 'home_fluff' },
      { id: 'fish', name: { zh: '金魚', en: 'Goldfish' }, x: 312, y: 300, w: 66, h: 62, mag: 7, draw: drawFishbowl, call: 'home_fish' }
      ] },
    { key: 'home-market', title: { zh: "超市貨架", en: "Supermarket Aisle" }, place: { zh: "巷口超市", en: "The corner supermarket" },
      intro: { zh: "貨架是強迫症的天堂……前提是每樣東西都擺正。", en: "Supermarket shelves are a perfectionist's paradise, as long as everything faces front." },
      bg: bgMarket, animated: true,
      objects: [
      { id: 'sign', name: { zh: '走道吊牌', en: 'Aisle sign' }, x: 180, y: 42, w: 160, h: 52, mag: 6, draw: drawAisleSign, sfx: 'bell' },
      { id: 'cereal', name: { zh: '玉米片', en: 'Cereal box' }, x: 62, y: 119, w: 60, h: 82, mag: 11, draw: drawCereal, sfx: 'pop' },
      { id: 'cans', name: { zh: '罐頭塔', en: 'Can pyramid' }, x: 175, y: 126, w: 96, h: 66, near: true, draw: drawCans, sfx: 'clunk' },
      { id: 'wobbler', name: { zh: '小雞廣告牌', en: 'Chick wobbler' }, x: 295, y: 128, w: 66, h: 84, mag: 9, draw: drawWobbler, habit: (t, l) => ({ dx: Math.sin(t * 5) * 2.5 * l }), call: 'chick' },
      { id: 'milk', name: { zh: '鮮奶', en: 'Milk' }, x: 72, y: 258, w: 46, h: 80, mag: 8, draw: drawMilk, link: { to: 'freemilk', k: 0.6 }, sfx: 'pop' },
      { id: 'freemilk', name: { zh: '贈品鮮奶', en: 'Free milk' }, x: 130, y: 258, w: 46, h: 80, mag: 5, draw: drawFreeMilk, sfx: 'pop' },
      { id: 'tag', name: { zh: '價格標籤', en: 'Price tag' }, x: 268, y: 309, w: 72, h: 30, near: true, pad: 12, draw: drawPriceTag, sfx: 'beep' }
      ] },
    { key: 'home-office', title: { zh: "辦公室", en: "The Office" }, place: { zh: "你的辦公室", en: "Your office" },
      intro: { zh: "週一早上，趁老闆還沒進來，先把桌面整理好。", en: "Monday morning. Tidy up before the boss walks in." },
      bg: bgOffice, animated: true,
      objects: [
      { id: 'poster', name: { zh: '勵志海報', en: 'Team poster' }, x: 85, y: 80, w: 116, h: 80, mag: 5, draw: drawPoster, sfx: 'wood' },
      { id: 'arrow', name: { zh: '業績箭頭', en: 'Growth arrow' }, x: 262, y: 95, w: 124, h: 30, trap: true, keep: -24, trapNote: { zh: '業績箭頭本來就該往上斜，扶平就是零成長！', en: 'A growth arrow is meant to point up. Level means zero growth!' }, draw: drawGrowthArrow },
      { id: 'employee', name: { zh: '最佳員工', en: 'Employee award' }, x: 90, y: 180, w: 92, h: 78, mag: 9, draw: drawEmployee, sfx: 'twinkle' },
      { id: 'monL', name: { zh: '左螢幕', en: 'Left monitor' }, x: 105, y: 282, w: 118, h: 96, mag: 7, draw: drawMonitorL, link: { to: 'monR', k: 0.6 }, sfx: 'beep' },
      { id: 'monR', name: { zh: '右螢幕', en: 'Right monitor' }, x: 250, y: 282, w: 118, h: 96, mag: 12, draw: drawMonitorR, sfx: 'beep' },
      { id: 'keyboard', name: { zh: '鍵盤', en: 'Keyboard' }, x: 135, y: 352, w: 140, h: 28, near: true, pad: 10, draw: drawKeyboard, sfx: 'home_click' },
      { id: 'plate', name: { zh: '名牌', en: 'Name plate' }, x: 290, y: 352, w: 84, h: 32, near: true, pad: 10, draw: drawNamePlate, sfx: 'bell' },
      { id: 'shiba', name: { zh: '柴犬', en: 'Shiba' }, x: 185, y: 432, w: 116, h: 60, mag: 10, draw: drawShiba, habit: (t, l) => ({ dy: Math.sin(t * 1.8) * 0.8 * l }), call: 'home_dog' }
      ] },
    { key: 'home-class', title: { zh: "教室黑板", en: "Classroom" }, place: { zh: "你的教室", en: "Your classroom" },
      intro: { zh: "下課十分鐘，值日生要把教室整理好。", en: "Ten-minute break. Whoever is on duty tidies the classroom." },
      bg: bgClass, animated: true,
      objects: [
      { id: 'motto', name: { zh: '班級標語', en: 'Class motto' }, x: 180, y: 32, w: 200, h: 40, mag: 5, draw: drawMotto, sfx: 'home_fluff' },
      { id: 'cardA', name: { zh: '注音卡ㄅ', en: 'Card A' }, x: 80, y: 108, w: 48, h: 58, mag: 10, draw: drawCardA, link: { to: 'cardB', k: 0.5 }, sfx: 'pop' },
      { id: 'cardB', name: { zh: '注音卡ㄆ', en: 'Card B' }, x: 150, y: 112, w: 48, h: 58, mag: 6, draw: drawCardB, sfx: 'pop' },
      { id: 'square', name: { zh: '三角板', en: 'Set square' }, x: 215, y: 170, w: 76, h: 64, mag: 8, draw: drawSetSquare, sfx: 'wood' },
      { id: 'eraser', name: { zh: '板擦', en: 'Board eraser' }, x: 110, y: 222, w: 66, h: 30, near: true, pad: 10, draw: drawEraser, sfx: 'home_fluff' },
      { id: 'award', name: { zh: '獎狀', en: 'Certificate' }, x: 305, y: 115, w: 76, h: 98, mag: 12, draw: drawAward, sfx: 'twinkle' },
      { id: 'hamster', name: { zh: '倉鼠', en: 'Hamster' }, x: 304, y: 262, w: 84, h: 72, mag: 7, draw: drawHamster, call: 'home_hamster' },
      { id: 'globe', name: { zh: '地球儀', en: 'Globe' }, x: 95, y: 316, w: 80, h: 88, trap: true, keep: 23.5, trapNote: { zh: '地軸本來就斜 23.5°，地球儀照著做。', en: "Earth's axis really tilts 23.5°, and globes copy it." }, draw: drawGlobe },
      { id: 'pencils', name: { zh: '鉛筆盒', en: 'Pencil case' }, x: 258, y: 429, w: 104, h: 30, near: true, pad: 10, draw: drawPencilCase, sfx: 'home_click' }
      ] },
    { key: 'home-moving', title: { zh: "搬家日", en: "Moving Day" }, place: { zh: "你的新家", en: "Your new home" },
      intro: { zh: "搬家第一天，箱子還沒拆完，但東西一定要先擺正。", en: "Day one in the new place. The boxes are still taped, but everything goes straight first." },
      bg: bgMoving, animated: true,
      objects: [
      { id: 'bannerL', name: { zh: '左半布條', en: 'Left banner' }, x: 103, y: 42, w: 154, h: 44, mag: 6, draw: drawBannerL, link: { to: 'bannerR', k: 0.6 }, sfx: 'jingle' },
      { id: 'bannerR', name: { zh: '右半布條', en: 'Right banner' }, x: 257, y: 42, w: 154, h: 44, mag: 9, draw: drawBannerR, sfx: 'jingle' },
      { id: 'lamp', name: { zh: '立燈', en: 'Floor lamp' }, x: 50, y: 262, w: 54, h: 166, mag: 11, draw: drawLamp, sfx: 'twinkle' },
      { id: 'sofa', name: { zh: '沙發', en: 'Sofa' }, x: 175, y: 332, w: 160, h: 80, mag: 5, draw: drawSofa, sfx: 'boing' },
      { id: 'boxB', name: { zh: '下面的箱子', en: 'Bottom box' }, x: 305, y: 340, w: 80, h: 62, mag: 7, draw: drawBoxBottom, link: { to: 'boxT', k: 0.6 }, sfx: 'clunk' },
      { id: 'boxT', name: { zh: '上面的箱子', en: 'Top box' }, x: 305, y: 281, w: 70, h: 56, mag: 13, draw: drawBoxTop, sfx: 'home_clink' },
      { id: 'rug', name: { zh: '地毯', en: 'Rug' }, x: 200, y: 432, w: 170, h: 52, near: true, draw: drawRug, sfx: 'home_fluff' },
      { id: 'boxcat', name: { zh: '箱子裡的貓', en: 'Cat in a box' }, x: 60, y: 420, w: 84, h: 86, mag: 8, draw: drawBoxCat, call: 'home_cat' },
      { id: 'plant', name: { zh: '龜背芋', en: 'Monstera' }, x: 322, y: 420, w: 56, h: 100, near: true, draw: drawMonstera, sfx: 'pop' }
      ] },
  ],
});
