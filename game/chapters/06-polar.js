// 第 6 大關 極地冰原 / World 6: Polar Plains (Low poly).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 6-1 Aurora night: low-poly ===== */
function bgPolar(c) {
  const R = mulberry(21);
  const g = c.createLinearGradient(0, 0, 0, 330); g.addColorStop(0, '#071330'); g.addColorStop(1, '#1f4a7a');
  c.fillStyle = g; c.fillRect(0, 0, W, 330);
  for (let i = 0; i < 90; i++) { c.fillStyle = `rgba(255,255,255,${0.3 + R() * 0.6})`; c.fillRect(R() * W, R() * 260, 1.3, 1.3); }
  [['110,255,190', 90, 0], ['150,120,255', 130, 1.5], ['110,255,220', 60, 3]].forEach(([col, y0, ph]) => {
    for (let x = 0; x < W; x += 3) {
      const y = y0 + Math.sin(x / 50 + ph) * 22 + Math.sin(x / 17 + ph) * 6;
      const gg = c.createLinearGradient(0, y - 60, 0, y + 10); gg.addColorStop(0, `rgba(${col},0)`); gg.addColorStop(0.8, `rgba(${col},.35)`); gg.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = gg; c.fillRect(x, y - 60, 3, 70);
    }
  });
  circ(c, 300, 60, 16, '#f3f1e3'); circ(c, 306, 56, 15, '#0d1d40');
  [[-20, 330, 70, 200, 160, 330, '#3b5f8f'], [100, 330, 190, 190, 290, 330, '#2f507c'], [220, 330, 300, 220, 380, 330, '#3a5d8a']].forEach(([x1, y1, x2, y2, x3, y3, col]) => {
    poly(c, [x1, y1, x2, y2, x3, y3], col);
    poly(c, [x2, y2, x3, y3, (x2 + x3) / 2 - 10, y3], 'rgba(10,20,50,.25)');
    poly(c, [x2, y2, x2 - 18, y2 + 30, x2 + 4, y2 + 24, x2 + 20, y2 + 34], '#e9f2ff');
  });
  const cols = ['#eaf2ff', '#d9e6fa', '#c9daf2', '#e1ecfd', '#bfd2ee'], rows = [330, 360, 400, 440, 480];
  for (let r = 0; r < rows.length - 1; r++) for (let x = -60, k = 0; x < W + 60; x += 60, k++) {
    const o = (r % 2) * 30, y0 = rows[r], y1 = rows[r + 1];
    poly(c, [x + o, y0, x + o + 60, y0, x + o + 30, y1], cols[(r * 3 + k) % 5]);
    poly(c, [x + o + 60, y0, x + o + 90, y1, x + o + 30, y1], cols[(r * 2 + k + 2) % 5]);
  }
}
function drawFlag(c, a) {
  c.fillStyle = '#c9ced8'; c.fillRect(-27, -52, 4, 106); circ(c, -25, -54, 3.5, '#e9c34a');
  const pts = [];
  for (let i = 0; i <= 10; i++) pts.push([-23 + i * 5.2, -48 + Math.sin(a.t * 6 - i * 0.7) * i * 0.45]);
  c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); for (let i = 10; i >= 0; i--) c.lineTo(pts[i][0], pts[i][1] + 30); c.closePath(); c.fillStyle = '#e2533f'; c.fill();
  c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y + 12) : c.moveTo(x, y + 12))); for (let i = 10; i >= 0; i--) c.lineTo(pts[i][0], pts[i][1] + 18); c.closePath(); c.fillStyle = '#fff'; c.fill();
}
function drawPolarSign(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-4, -36, 8, 82);
  poly(c, [-52, -40, 40, -40, 54, -28, 40, -16, -52, -16], '#e2533f');
  // Shrink the label to fit the board (English is wider).
  const fit = (s, x, y, px, maxW) => { c.font = `700 ${px}px "Noto Sans TC", sans-serif`; const k = Math.min(1, maxW / c.measureText(s).width); txt(c, s, x, y, `700 ${(px * k).toFixed(2)}px "Noto Sans TC", sans-serif`, '#fff'); };
  fit(T('南極點', 'SOUTH POLE') + ' S 90°00′', -4, -28, 12, 86);
  poly(c, [52, -6, -40, -6, -54, 6, -40, 18, 52, 18], '#2f6db3');
  fit(T('研究站', 'STATION') + ' 2.3 km', 2, 6, 11, 86);
  poly(c, [-12, 46, 12, 46, 7, 40, -7, 40], '#f2f7ff');
}
function drawIgloo(c) {
  poly(c, [-56, 32, -50, 0, -34, -22, -10, -34, 14, -34, 36, -22, 50, 0, 56, 32], '#f2f7ff');
  poly(c, [-10, -34, 14, -34, 36, -22, 50, 0, 56, 32, 10, 32], '#dbe7f8');
  c.strokeStyle = 'rgba(120,150,190,.6)'; c.lineWidth = 1.2;
  [[-52, 14, 52, 14], [-44, -6, 46, -6], [-28, -24, 32, -24], [-30, 14, -28, 32], [0, 14, 0, 32], [30, 14, 30, 32], [-16, -6, -14, 14], [16, -6, 18, 14], [-36, -6, -34, 14], [40, -6, 40, 14], [0, -24, 0, -6]].forEach(([x1, y1, x2, y2]) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); });
  poly(c, [30, 32, 34, 8, 58, 6, 62, 32], '#e6effc'); poly(c, [38, 32, 42, 16, 54, 16, 56, 32], '#2a3f66');
}
function drawPenguin(c, a) {
  const fl = Math.sin(a.t * 8) * 0.5 * a.live;
  poly(c, [-8, 28, -16, 31, -4, 32], '#f29a2e'); poly(c, [8, 28, 16, 31, 4, 32], '#f29a2e');
  ell(c, 0, 4, 18, 26, '#1e2433');
  c.save(); c.translate(-15, -2); c.rotate(0.3 + fl); ell(c, 0, 10, 5, 13, '#1e2433'); c.restore();
  c.save(); c.translate(15, -2); c.rotate(-0.3 - fl); ell(c, 0, 10, 5, 13, '#1e2433'); c.restore();
  ell(c, 0, 8, 12, 19, '#f4f8ff');
  circ(c, 0, -18, 12, '#1e2433'); ell(c, 0, -14, 8, 6, '#f4f8ff');
  circ(c, -4, -19, 2, '#fff'); circ(c, 4, -19, 2, '#fff'); circ(c, -4, -19, 1, '#111'); circ(c, 4, -19, 1, '#111');
  poly(c, [-3, -13, 3, -13, 0, -8], '#f29a2e');
}
function drawSnowman(c) {
  const ball = (y, r) => {
    const pts = []; for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + 0.2; pts.push(Math.cos(an) * r, y + Math.sin(an) * r); }
    poly(c, pts, '#f4f8ff');
    poly(c, [Math.cos(0.2) * r, y + Math.sin(0.2) * r, Math.cos(0.985) * r, y + Math.sin(0.985) * r, Math.cos(1.77) * r, y + Math.sin(1.77) * r, 0, y], 'rgba(150,180,220,.35)');
  };
  ball(30, 24); ball(-6, 18); ball(-34, 13);
  c.strokeStyle = '#6b4a2b'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-14, -8); c.lineTo(-32, -22); c.lineTo(-36, -18); c.moveTo(14, -8); c.lineTo(34, -2); c.lineTo(38, -8); c.stroke();
  poly(c, [-10, -46, 10, -46, 9, -62, -9, -62], '#1e2433'); c.fillStyle = '#1e2433'; c.fillRect(-15, -48, 30, 4); c.fillStyle = '#d6453a'; c.fillRect(-9, -52, 18, 4);
  poly(c, [0, -35, 16, -32, 0, -30], '#ff8a2b');
  circ(c, -5, -38, 1.8, '#1e2433'); circ(c, 5, -38, 1.8, '#1e2433');
  [-12, -4, 4].forEach((y) => circ(c, 0, y, 1.8, '#1e2433'));
  c.fillStyle = '#d6453a'; c.fillRect(-14, -22, 28, 5); c.fillRect(6, -22, 6, 14);
}
function drawSled(c) {
  c.strokeStyle = '#3a3f4f'; c.lineWidth = 3; c.beginPath(); c.moveTo(-56, 14); c.lineTo(46, 14); c.quadraticCurveTo(60, 14, 58, 0); c.stroke();
  c.lineWidth = 2.5; [-40, -10, 20].forEach((x) => { c.beginPath(); c.moveTo(x, 14); c.lineTo(x, 2); c.stroke(); });
  poly(c, [-50, 2, 44, 2, 40, -8, -50, -8], '#b5793f'); poly(c, [-50, -8, 40, -8, 38, -12, -50, -12], '#d3965a');
  poly(c, [-44, -12, -10, -12, -14, -20, -40, -20], '#3f7fc6'); poly(c, [-6, -12, 26, -12, 22, -19, -2, -19], '#e2533f');
}

/* ===== shared low-poly helpers for stages 2-10 ===== */
const { q, note, puff } = QS;
const pr = (i) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
// Fill + hairline stroke in the same colour, so neighbouring facets meet without seams (bg only).
function tri(c, pts, col) { poly(c, pts, col); c.strokeStyle = col; c.lineWidth = 0.8; c.stroke(); }
function lpSky(c, y0, y1, stops) { const g = c.createLinearGradient(0, y0, 0, y1); stops.forEach((s, i) => g.addColorStop(i / (stops.length - 1), s)); c.fillStyle = g; c.fillRect(0, y0, W, y1 - y0); }
function lpStars(c, seed, n, maxY, a = 0.7) { const R = mulberry(seed); for (let i = 0; i < n; i++) { c.fillStyle = `rgba(255,255,255,${0.2 + R() * a})`; const s = R() < 0.15 ? 2 : 1.2; c.fillRect(R() * W, R() * maxY, s, s); } }
// A field of jittered triangles between y0 and y1 (snow, ice, water, cave walls).
function lpField(c, y0, y1, cw, rh, cols, seed, jit = 0.4, x0 = 0, x1 = W) {
  const R = mulberry(seed), nr = Math.max(1, Math.round((y1 - y0) / rh)), nc = Math.ceil((x1 - x0) / cw) + 2, P = [];
  for (let r = 0; r <= nr; r++) {
    const row = [], y = y0 + (y1 - y0) * r / nr, edge = r === 0 || r === nr;
    for (let k = -1; k <= nc; k++) row.push([x0 + k * cw + (r % 2) * cw / 2 + (R() - 0.5) * cw * jit, y + (edge ? 0 : (R() - 0.5) * rh * jit)]);
    P.push(row);
  }
  const pick = () => cols[(R() * cols.length) | 0];
  for (let r = 0; r < nr; r++) for (let k = 0; k < nc + 1; k++) {
    const a = P[r][k], b = P[r][k + 1], d = P[r + 1][k], e = P[r + 1][k + 1];
    if (r % 2 === 0) { tri(c, [a[0], a[1], b[0], b[1], d[0], d[1]], pick()); tri(c, [b[0], b[1], e[0], e[1], d[0], d[1]], pick()); }
    else { tri(c, [a[0], a[1], b[0], b[1], e[0], e[1]], pick()); tri(c, [a[0], a[1], e[0], e[1], d[0], d[1]], pick()); }
  }
}
// A faceted peak: lit left face, shaded right face, optional snow cap.
function lpPeak(c, x1, x2, px, py, by, light, dark, snow = '#eef5ff', snowSh = '#cfdff3') {
  tri(c, [x1, by, px, py, x2, by], light);
  tri(c, [px, py, x2, by, px + (x2 - px) * 0.25, by], dark);
  tri(c, [px, py, x1 + (px - x1) * 0.55, by, px - (px - x1) * 0.15, by], 'rgba(255,255,255,.07)');
  if (snow) {
    const s = 0.3, lx = px + (x1 - px) * s, rx = px + (x2 - px) * s, ly = py + (by - py) * s;
    poly(c, [px, py, lx, ly, lx + (px - lx) * 0.45, ly - 5, px - 2, ly + 5, px + (rx - px) * 0.5, ly - 4, rx, ly], snow);
    poly(c, [px, py, px - 2, ly + 5, px + (rx - px) * 0.5, ly - 4, rx, ly], snowSh);
  }
}
// Snowy spruce: three stacked two-tone triangles.
function lpTree(c, x, y, h, light, dark, snow = '#eef5ff') {
  c.fillStyle = '#4a3527'; c.fillRect(x - 1.5, y - h * 0.12, 3, h * 0.12);
  for (let i = 0; i < 3; i++) {
    const ty = y - h + i * h * 0.26, w = h * (0.14 + i * 0.09), by = ty + h * 0.4;
    poly(c, [x, ty, x - w, by, x, by - h * 0.05], light); poly(c, [x, ty, x + w, by, x, by - h * 0.05], dark);
    if (snow) poly(c, [x, ty, x - w * 0.5, ty + h * 0.2, x - w * 0.1, ty + h * 0.16, x + w * 0.45, ty + h * 0.21], snow);
  }
}
// A faceted n-gon (bodies, stones, snowballs) with a shaded lower-right facet.
function lpOval(c, x, y, rx, ry, n, col, sh, rot = 0.3) {
  const p = []; for (let k = 0; k < n; k++) { const an = rot + k * Math.PI * 2 / n; p.push(x + Math.cos(an) * rx, y + Math.sin(an) * ry); }
  poly(c, p, col);
  if (sh) { const h = Math.floor(n / 2); const s = [x, y]; for (let k = -1; k <= h - 1; k++) s.push(p[((k + n) % n) * 2], p[((k + n) % n) * 2 + 1]); poly(c, s, sh); }
}
function lpRock(c, x, y, rx, ry, col, sh, seed = 1) {
  const p = []; for (let k = 0; k < 7; k++) { const an = Math.PI + k * Math.PI / 6, j = 0.8 + pr(seed + k) * 0.3; p.push(x + Math.cos(an) * rx * j, y + Math.sin(an) * ry * j); }
  poly(c, p, col); poly(c, [x, y - ry * 0.3, p[8], p[9], p[10], p[11], p[12], p[13], x + rx * 0.2, y], sh);
}
// Text that shrinks until it fits maxW.
function fitTxt(c, s, x, y, maxW, size, weight, color, fam = '"Noto Sans TC", sans-serif') {
  let z = size; c.font = `${weight} ${z}px ${fam}`;
  while (z > 5 && c.measureText(s).width > maxW) { z -= 0.5; c.font = `${weight} ${z}px ${fam}`; }
  txt(c, s, x, y, `${weight} ${z}px ${fam}`, color);
}
function glow(c, x, y, r, col) { [1, 0.7, 0.45].forEach((k, i) => circ(c, x, y, r * k, `rgba(${col},${0.12 + i * 0.1})`)); }

/* ----- creatures ----- */
// Arctic fox, sitting, facing right. Winter coat is white, summer coat is brown-grey.
function makeFox(coat, sh, sh2, ear) {
  return (c, a) => {
    const sw = Math.sin(a.t * 3) * 0.25 * a.live;
    ell(c, 0, 28, 30, 3, 'rgba(60,70,110,.18)');
    c.save(); c.translate(-12, 18); c.rotate(sw);
    poly(c, [0, 0, -14, -2, -22, -13, -21, -24, -11, -15, 3, -8], coat); poly(c, [0, 0, -14, -2, -22, -13, -11, -7], sh); poly(c, [-22, -13, -21, -24, -17, -19], '#f7f9fd');
    c.restore();
    poly(c, [-18, 27, -16, 4, -6, -6, 8, -4, 15, 10, 12, 27], coat);
    poly(c, [-18, 27, -16, 4, -4, 14, -2, 27], sh);
    lpOval(c, -8, 16, 11, 11, 7, coat, sh);
    poly(c, [3, 6, 9, 6, 9, 28, 3, 28], sh2); poly(c, [10, 4, 15, 8, 16, 28, 11, 28], coat);
    poly(c, [2, -6, 8, -20, 22, -22, 33, -10, 27, -4, 12, -2], coat);
    poly(c, [12, -2, 27, -4, 33, -10, 20, -10], sh);
    poly(c, [8, -18, 8, -30, 16, -21], coat); poly(c, [9.5, -20, 9.5, -27, 13.5, -21], ear);
    poly(c, [16, -21, 22, -31, 24, -19], coat); poly(c, [17.5, -21, 22, -28, 22.5, -20], ear);
    circ(c, 32.5, -10, 2.2, '#1e2433'); circ(c, 20, -14, 2.1, '#1e2433'); circ(c, 20.7, -14.7, 0.7, '#fff');
  };
}
const drawFoxWinter = makeFox('#fbfcff', '#cdd9ee', '#b5c6e2', '#f2b9b4');
const drawFoxSummer = makeFox('#8d7a68', '#6f5f51', '#5d5046', '#d9a49a');
// Husky, trotting, facing left (toward the trail ahead).
function drawHusky(c, a) {
  const run = Math.sin(a.t * 10) * a.live, G = '#66748a', G2 = '#4c586b', Wt = '#f3f6fb', Ws = '#d3dcea';
  poly(c, [22, -4, 34, -14, 38, -26, 30, -26, 27, -15, 18, -8], G); poly(c, [34, -14, 38, -26, 33, -23], Wt);
  [-20, -10, 14, 23].forEach((x, i) => { const s = run * 4 * (i % 2 ? 1 : -1); poly(c, [x - 3, 6, x + 3, 6, x + 3 + s, 28, x - 3 + s, 28], i % 2 ? Ws : Wt); poly(c, [x - 4 + s, 26, x + 4 + s, 26, x + 4 + s, 30, x - 5 + s, 30], '#3a4150'); });
  poly(c, [-26, -6, 20, -10, 28, -2, 26, 10, -22, 12, -28, 4], G);
  poly(c, [-22, 12, 26, 10, 20, 2, -18, 4], Wt);
  poly(c, [-26, -6, 20, -10, 6, -4], G2);
  poly(c, [-15, -8, -11, -8, -7, 12, -11, 12], '#e2533f'); poly(c, [-24, 0, 16, -5, 16, -1, -24, 4], '#e2533f');
  circ(c, 0, -5, 2, '#f2d36b');
  poly(c, [-22, -4, -30, -18, -22, -27, -12, -22, -8, -10, -14, -2], G);
  poly(c, [-30, -18, -44, -13, -43, -7, -28, -6, -22, -4, -14, -2, -20, -13], Wt);
  poly(c, [-24, -24, -27, -36, -18, -27], G2); poly(c, [-25, -27, -26, -33, -21, -27], '#f2c1bd');
  poly(c, [-16, -25, -12, -36, -9, -22], G);
  circ(c, -43.5, -12, 2.3, '#1e2433'); circ(c, -27, -18, 2.1, '#7cc6ff'); circ(c, -27, -18, 1, '#1e2433');
}
// Polar bear, ambling, facing right.
function drawPolarBear(c, a) {
  const st = Math.sin(a.t * 3) * a.live, B = '#f4efe1', S = '#dcd4bf', S2 = '#c5bca4';
  [[-40, 1], [-24, -1], [16, 1], [30, -1]].forEach(([x, d], i) => { const s = st * 4 * d; poly(c, [x - 7, 4, x + 7, 4, x + 7 + s, 34, x - 8 + s, 34], i % 2 ? B : S); poly(c, [x - 8 + s, 32, x + 8 + s, 32, x + 7 + s, 36, x - 9 + s, 36], S2); });
  poly(c, [-54, 6, -50, -12, -36, -26, -8, -32, 18, -28, 34, -14, 38, 6, 20, 16, -40, 16], B);
  poly(c, [-54, 6, -40, 16, 20, 16, 38, 6, 6, 4, -30, 6], S);
  poly(c, [-36, -26, -8, -32, -14, -18], '#fffaf0');
  circ(c, -55, -2, 4, B);
  c.save(); c.translate(34, -12); c.rotate(Math.sin(a.t * 2) * 0.08 * a.live);
  poly(c, [-6, 6, 0, -10, 12, -14, 22, -8, 27, -2, 26, 4, 10, 8], B);
  poly(c, [10, 8, 26, 4, 27, -2, 14, 0], S);
  lpOval(c, 4, -12, 4, 4, 6, B, S); circ(c, 4, -12, 1.8, '#c7b49a');
  circ(c, 26.5, -1, 2.6, '#1e2433'); circ(c, 14, -6, 1.8, '#1e2433');
  c.restore();
}
// Seal (Weddell-style, spotted), lying on its belly, head up, facing left.
function drawSeal(c, a) {
  const up = Math.sin(a.t * 2.5) * a.live, S = '#7a8aa3', D = '#5d6c84', L = '#aab8cc';
  c.save(); c.translate(36, 12); c.rotate(Math.sin(a.t * 4) * 0.2 * a.live);
  poly(c, [0, 0, 12, -8, 14, -2, 10, 2, 14, 6, 12, 8], D); c.restore();
  poly(c, [-30, 18, -34, 4, -28, -6, -10, -8, 14, -4, 34, 6, 38, 14, 20, 19], S);
  poly(c, [-30, 18, 20, 19, 38, 14, 14, 10, -14, 12], D);
  poly(c, [-6, 10, 2, 2, 8, 18, -2, 20], D);
  [[-4, -2], [8, 2], [20, 6], [0, 6], [-16, 0]].forEach(([x, y]) => lpOval(c, x, y, 2.4, 1.6, 5, '#4d5a70'));
  c.save(); c.translate(-26, -2 + up * 1.5); c.rotate(up * 0.08);
  poly(c, [-6, 6, -12, -6, -8, -14, 2, -16, 8, -8, 6, 6], S);
  poly(c, [-12, -6, -8, -14, 2, -16, -2, -8], L);
  circ(c, -6, -9, 2.4, '#1e2433'); circ(c, 1, -10, 2.4, '#1e2433'); circ(c, -5.4, -9.8, 0.8, '#fff'); circ(c, 1.6, -10.8, 0.8, '#fff');
  lpOval(c, -4, -3.5, 4, 2.8, 6, '#b7c4d6'); circ(c, -4, -5, 1.4, '#1e2433');
  c.strokeStyle = 'rgba(30,36,51,.5)'; c.lineWidth = 0.7; c.beginPath(); c.moveTo(-8, -3); c.lineTo(-15, -5); c.moveTo(-8, -2); c.lineTo(-15, -1); c.moveTo(0, -3); c.lineTo(6, -5); c.stroke();
  c.restore();
}
// Walrus, sitting up on a floe, facing left.
function drawWalrus(c, a) {
  const b = Math.sin(a.t * 2) * a.live, B = '#b98066', S = '#9a6550', L = '#d49c80';
  poly(c, [10, 28, 30, 20, 46, 26, 40, 30], S);
  poly(c, [-30, 28, -34, 6, -26, -12, -8, -20, 14, -14, 32, 2, 38, 22, 26, 30], B);
  poly(c, [-30, 28, 26, 30, 38, 22, 10, 14, -12, 18], S);
  poly(c, [-26, -12, -8, -20, -4, -6, -18, 0], L);
  [[-6, 4], [12, -2], [20, 14], [-16, 12]].forEach(([x, y]) => { c.strokeStyle = 'rgba(110,60,40,.35)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x - 4, y); c.lineTo(x + 4, y + 2); c.stroke(); });
  poly(c, [-22, 24, -34, 30, -18, 30], S);
  c.save(); c.translate(-20, -16 + b); c.rotate(b * 0.05);
  poly(c, [-12, 0, -10, -12, 2, -16, 12, -10, 12, 4, 0, 6], B);
  poly(c, [-10, -12, 2, -16, 0, -8], L);
  poly(c, [-9, 4, -7, 24, -4, 24, -3, 5], '#fbf6ea'); poly(c, [2, 4, 4, 24, 7, 24, 7, 5], '#efe6d2');
  lpOval(c, -6, 2, 7, 5, 7, '#d8a68d'); lpOval(c, 4, 2, 7, 5, 7, '#cd987e');
  circ(c, -4, -8, 1.8, '#1e2433'); circ(c, 6, -8, 1.8, '#1e2433');
  c.fillStyle = 'rgba(60,30,20,.45)'; for (let i = 0; i < 6; i++) c.fillRect(-10 + i * 3.4, 1.5 + (i % 2), 0.9, 0.9);
  c.restore();
}
// Snowy owl, perched, big yellow eyes. The head swivels a little.
function drawOwl(c, a) {
  const tw = Math.sin(a.t * 1.6) * 0.22 * a.live;
  poly(c, [-12, 26, -16, 30, -8, 30], '#3b3f4a'); poly(c, [12, 26, 16, 30, 8, 30], '#3b3f4a');
  lpOval(c, 0, 8, 18, 22, 8, '#f7f9fc', '#dfe6f0', 0.4);
  poly(c, [-18, 4, -22, 22, -12, 26], '#e6ebf3'); poly(c, [18, 4, 22, 22, 12, 26], '#d3dbe7');
  [[-8, 6], [6, 10], [-4, 16], [10, 2], [2, 22], [-12, 14]].forEach(([x, y]) => poly(c, [x - 2.5, y, x + 2.5, y, x, y + 2], '#3d4250'));
  c.save(); c.translate(0, -12); c.rotate(tw);
  lpOval(c, 0, 0, 15, 13, 8, '#fbfcfe', '#e7ecf3', 0.4);
  circ(c, -6, -1, 5, '#f4c430'); circ(c, 6, -1, 5, '#f4c430'); circ(c, -6, -1, 2.3, '#1e2433'); circ(c, 6, -1, 2.3, '#1e2433'); circ(c, -5.2, -2, 0.8, '#fff'); circ(c, 6.8, -2, 0.8, '#fff');
  poly(c, [-2, 3, 2, 3, 0, 7], '#3b3f4a');
  [[-10, -9], [8, -9]].forEach(([x, y]) => poly(c, [x - 2, y, x + 2, y, x, y + 1.6], '#3d4250'));
  c.restore();
}
// Reindeer, standing, facing left; the head bobs as it grazes the air.
function makeReindeer(B, S, N, A) {
  return (c, a) => {
    const nod = Math.sin(a.t * 1.8) * 0.12 * a.live;
    [-22, -12, 16, 26].forEach((x, i) => { poly(c, [x - 3.5, 10, x + 3.5, 10, x + 3, 44, x - 3, 44], i % 2 ? B : S); poly(c, [x - 4, 42, x + 4, 42, x + 4, 46, x - 4, 46], '#2f2620'); });
    poly(c, [-30, 0, -24, -14, 0, -16, 28, -12, 36, -2, 32, 14, -24, 16], B);
    poly(c, [-24, 16, 32, 14, 36, -2, 10, 6, -10, 8], S);
    poly(c, [34, -8, 40, -12, 38, -2], '#efe6d6');
    poly(c, [-30, 0, -24, -14, -18, -14, -16, 12, -26, 14], N);
    c.save(); c.translate(-24, -12); c.rotate(nod);
    poly(c, [-2, 0, -6, -16, -18, -18, -24, -10, -20, -6, -8, -4], B);
    poly(c, [-24, -10, -20, -6, -8, -4, -14, -10], S);
    poly(c, [-6, -16, -2, -20, -1, -14], B);
    circ(c, -23, -9, 2.3, '#1e2433'); circ(c, -11, -13, 1.7, '#1e2433');
    c.strokeStyle = A; c.lineWidth = 2.6; c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath();
    c.moveTo(-9, -17); c.lineTo(-4, -30); c.lineTo(4, -38); c.lineTo(14, -40);
    c.moveTo(-4, -30); c.lineTo(-12, -36); c.moveTo(2, -36); c.lineTo(2, -44); c.moveTo(9, -39); c.lineTo(12, -46);
    c.moveTo(-12, -18); c.lineTo(-15, -30); c.lineTo(-11, -40); c.moveTo(-15, -30); c.lineTo(-21, -34);
    c.stroke();
    c.restore();
  };
}
const drawReindeer = makeReindeer('#8a6a52', '#6e523f', '#efe6d6', '#c9ae86');
const drawSvalReindeer = makeReindeer('#a19584', '#857a6b', '#f1ece2', '#cdb894');
// Rock ptarmigan in white winter plumage, facing left, red comb over the eye.
function drawPtarmigan(c, a) {
  const pk = Math.max(0, Math.sin(a.t * 3)) * a.live;
  poly(c, [14, 0, 24, -4, 24, 4, 16, 8], '#1e2433');
  ell(c, 2, 19, 18, 2.5, 'rgba(10,40,80,.3)');
  lpOval(c, 2, 4, 18, 13, 8, '#f7f9fd', '#cfdbec', 0.2);
  poly(c, [-8, 16, -4, 21, 0, 16], '#f0f3f8'); poly(c, [4, 16, 8, 21, 12, 16], '#e3e9f2');
  c.save(); c.translate(-12, -6); c.rotate(pk * 0.25);
  lpOval(c, 0, 0, 9, 8, 7, '#fbfcfe', '#e6ecf4');
  poly(c, [-8, -1, -14, 1, -8, 3], '#1e2433');
  circ(c, -3, -1.5, 1.8, '#1e2433'); poly(c, [-6, -5, 1, -6, -1, -3.5, -5, -3.5], '#e23b3b');
  c.restore();
}
// Emperor penguin, tall, golden ear patch, facing right; waddles in place.
function drawEmperor(c, a) {
  c.rotate(Math.sin(a.t * 4) * 0.05 * a.live);
  poly(c, [-10, 41, -18, 45, -2, 45], '#2a2d36'); poly(c, [8, 41, 16, 45, 2, 45], '#2a2d36');
  lpOval(c, 0, 8, 19, 36, 10, '#232a3a', '#1a1f2c', 1.2);
  lpOval(c, 4, 12, 13, 30, 10, '#f6f8fc', '#e2e7f0', 1.2);
  poly(c, [6, -16, 14, -10, 16, 4, 10, -6], '#ffe9a6');
  poly(c, [-17, -2, -24, 20, -16, 26, -12, 6], '#1c2231');
  lpOval(c, 2, -30, 10, 10, 7, '#232a3a');
  poly(c, [4, -26, 10, -24, 12, -16, 6, -18], '#f6b73c');
  poly(c, [9, -33, 22, -28, 20, -26, 9, -29], '#2a2d36'); poly(c, [12, -29, 20, -27, 20, -26, 12, -28], '#f08a5d');
  circ(c, 5, -32, 1.6, '#fff');
}
// Emperor chick: grey fluff, black cap, white mask.
function drawEmpChick(c, a) {
  const hop = Math.abs(Math.sin(a.t * 5)) * a.live;
  c.translate(0, -hop * 2);
  poly(c, [-6, 20, -10, 23, -2, 23], '#5b5f68'); poly(c, [6, 20, 10, 23, 2, 23], '#5b5f68');
  lpOval(c, 0, 6, 14, 16, 9, '#b4bac6', '#9aa1af');
  poly(c, [-14, 2, -18, 10, -12, 12], '#a3aab8'); poly(c, [14, 2, 18, 10, 12, 12], '#8f97a6');
  lpOval(c, 0, -11, 10, 9, 8, '#1f2430');
  lpOval(c, 1, -9, 7, 6, 7, '#f7f9fd');
  circ(c, -2, -10, 1.6, '#1e2433'); circ(c, 4, -10, 1.6, '#1e2433');
  poly(c, [-1, -6, 3, -6, 1, -3.5], '#2a2d36');
}
// Adélie penguin: all-black head, white eye-ring, facing right.
function drawAdelie(c, a) {
  const fl = Math.sin(a.t * 8) * 0.5 * a.live;
  poly(c, [-8, 24, -15, 28, -3, 28], '#f2a6a0'); poly(c, [8, 24, 15, 28, 3, 28], '#f2a6a0');
  lpOval(c, 0, 4, 16, 23, 9, '#1e2433', '#161a26', 1.2);
  c.save(); c.translate(-14, -2); c.rotate(0.3 + fl); poly(c, [-3, 0, 3, 0, 2, 20, -4, 16], '#1e2433'); c.restore();
  c.save(); c.translate(14, -2); c.rotate(-0.3 - fl); poly(c, [-3, 0, 3, 0, 4, 16, -2, 20], '#1e2433'); c.restore();
  lpOval(c, 1, 8, 11, 17, 9, '#f6f8fc', '#e1e6ef', 1.2);
  lpOval(c, 0, -17, 11, 10, 8, '#1e2433');
  circ(c, 4, -18, 3, '#fff'); circ(c, 4.6, -18, 1.4, '#1e2433');
  poly(c, [8, -16, 15, -14, 8, -12], '#e85d4a');
}
// Arctic char hanging on the line, wriggling.
function drawFish(c, a) {
  const wr = Math.sin(a.t * 9) * 0.2 * a.live;
  c.strokeStyle = 'rgba(230,240,255,.9)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(0, -26); c.lineTo(0, -16); c.stroke();
  c.save(); c.translate(0, -16); c.rotate(wr);
  poly(c, [0, 0, 7, 8, 8, 24, 3, 32, -3, 32, -8, 24, -7, 8], '#5f7d8c');
  poly(c, [0, 4, 6, 10, 6, 24, 0, 30], '#f08a4b');
  poly(c, [-3, 32, 3, 32, 8, 40, 0, 37, -8, 40], '#4f6b79');
  poly(c, [7, 16, 12, 20, 7, 22], '#e9784a'); poly(c, [-7, 16, -12, 20, -7, 22], '#d9693f');
  circ(c, -2.5, 7, 1.6, '#fff'); circ(c, -2.5, 7, 0.8, '#1e2433');
  [[-4, 16], [-3, 21], [-5, 26]].forEach(([x, y]) => circ(c, x, y, 0.9, '#f6d7a8'));
  c.restore();
}

/* ----- sounds (Q style) ----- */
defineCreatureSound('polar_fox', (ac, o, t) => {
  [0, 0.14].forEach((d, k) => q(ac, o, t + d, [[0, 1100 + k * 120], [0.04, 1700 + k * 120], [0.1, 1250]], 0.11, { vol: 0.4 }));
  q(ac, o, t + 0.3, [[0, 1300], [0.12, 1650], [0.35, 1100]], 0.36, { vib: [9, 30], vol: 0.36 });
});
defineCreatureSound('polar_husky', (ac, o, t) => q(ac, o, t, [[0, 620], [0.15, 960], [0.5, 1010], [0.75, 760]], 0.78, { vib: [6, 18], attack: 0.05, vol: 0.4 }));
defineCreatureSound('polar_seal', (ac, o, t) => [0, 0.18].forEach((d, k) => q(ac, o, t + d, [[0, 700 + k * 60], [0.05, 920 + k * 60], [0.13, 620]], 0.14, { vol: 0.42, over: 0.3 })));
defineCreatureSound('polar_bear', (ac, o, t) => { q(ac, o, t, [[0, 330], [0.15, 420], [0.42, 300]], 0.45, { trem: [16, 0.35], vol: 0.45, over: 0.25 }); puff(ac, o, t + 0.02, 0.18, 700, 0.05); note(ac, o, t + 0.48, 1320, 0.18, 0.2); });
defineCreatureSound('polar_owl', (ac, o, t) => [0, 0.3].forEach((d, k) => q(ac, o, t + d, [[0, 540 - k * 30], [0.06, 590 - k * 30], [0.22, 520 - k * 30]], 0.24, { attack: 0.04, vol: 0.44, over: 0.08 })));
defineCreatureSound('polar_walrus', (ac, o, t) => { q(ac, o, t, [[0, 380], [0.1, 470], [0.35, 340]], 0.38, { vib: [7, 12], vol: 0.45, over: 0.25 }); note(ac, o, t + 0.42, 1240, 0.3, 0.26); });
defineCreatureSound('polar_reindeer', (ac, o, t) => { [0, 0.13, 0.26].forEach((d) => q(ac, o, t + d, [[0, 440], [0.06, 390]], 0.08, { trem: [30, 0.5], vol: 0.42, over: 0.25 })); note(ac, o, t + 0.42, 2600, 0.05, 0.22); note(ac, o, t + 0.52, 2600, 0.05, 0.22); });
defineCreatureSound('polar_emperor', (ac, o, t) => q(ac, o, t, [[0, 800], [0.1, 1020], [0.5, 960], [0.72, 800]], 0.74, { trem: [22, 0.45], vol: 0.4 }));
defineCreatureSound('polar_adelie', (ac, o, t) => { [0, 0.12].forEach((d) => q(ac, o, t + d, [[0, 1000], [0.04, 1260], [0.09, 900]], 0.1, { vol: 0.42, over: 0.3 })); q(ac, o, t + 0.26, [[0, 1100], [0.08, 1400], [0.3, 1000]], 0.32, { trem: [18, 0.4], vol: 0.4 }); });
defineCreatureSound('polar_ptarmigan', (ac, o, t) => [0, 0.1, 0.2, 0.36].forEach((d, k) => q(ac, o, t + d, [[0, 700 + (k === 3 ? 200 : 0)], [0.05, 840], [0.08, 640]], k === 3 ? 0.16 : 0.08, { trem: [40, 0.45], vol: 0.42 })));
defineCreatureSound('polar_chick', (ac, o, t) => [0, 0.18].forEach((d) => q(ac, o, t + d, [[0, 2200], [0.08, 2800], [0.15, 2400]], 0.16, { vol: 0.38 })));
defineCreatureSound('polar_fish', (ac, o, t) => { [0, 0.1].forEach((d, k) => q(ac, o, t + d, [[0, 600 + k * 200], [0.06, 1400 + k * 300]], 0.07, { attack: 0.004, hold: 0.3, vol: 0.4 })); q(ac, o, t + 0.24, [[0, 1200], [0.1, 700], [0.2, 1300]], 0.22, { vib: [20, 60], vol: 0.36 }); });
defineThingSound('polar_ice', (ac, o, t, r) => { note(ac, o, t, 2093 * r, 0.14, 0.3); note(ac, o, t + 0.07, 2794 * r, 0.22, 0.22); });
defineThingSound('polar_snow', (ac, o, t, r) => { puff(ac, o, t, 0.09, 2400, 0.22); q(ac, o, t + 0.05, [[0, 660 * r], [0.12, 880 * r]], 0.16, { vol: 0.36 }); });

/* ===== 6-2 Igloo Village (Nunavut, Canada) ===== */
function smallIgloo(c, x, y, s, lit) {
  poly(c, [x - 22 * s, y, x - 18 * s, y - 12 * s, x - 8 * s, y - 19 * s, x + 8 * s, y - 19 * s, x + 18 * s, y - 12 * s, x + 22 * s, y], '#efeaf8');
  poly(c, [x + 8 * s, y - 19 * s, x + 18 * s, y - 12 * s, x + 22 * s, y, x + 4 * s, y], '#d8d0ec');
  if (lit) { glow(c, x + 12 * s, y - 4 * s, 10 * s, '255,190,110'); poly(c, [x + 8 * s, y, x + 9 * s, y - 7 * s, x + 15 * s, y - 7 * s, x + 16 * s, y], '#ffc978'); }
}
function bgIgloo(c) {
  lpSky(c, 0, 300, ['#232554', '#4b4787', '#9a78b4', '#f0a3b0', '#ffd0a6']);
  lpStars(c, 31, 70, 150, 0.6);
  for (let x = 0; x < W; x += 12) { const y = 120 + Math.sin(x / 60 + 1) * 26, y2 = 120 + Math.sin((x + 12) / 60 + 1) * 26; poly(c, [x, y, x + 12, y2, x + 12, y2 - 46, x, y - 46], `rgba(120,255,200,${0.16 + 0.1 * Math.sin(x / 23)})`); poly(c, [x, y, x + 12, y2, x + 12, y2 - 14, x, y - 14], 'rgba(150,255,215,.22)'); }
  circ(c, 70, 70, 11, '#f8f3e6'); circ(c, 75, 66, 10.5, '#2e2e60');
  glow(c, 200, 300, 120, '255,200,160');
  lpPeak(c, -40, 120, 30, 210, 290, '#6c64a6', '#544d8c', '#f4ecfb', '#d9cfee');
  lpPeak(c, 70, 250, 170, 196, 290, '#7a6fb0', '#5d5596', '#f4ecfb', '#d9cfee');
  lpPeak(c, 200, 400, 310, 220, 290, '#6c64a6', '#544d8c', '#f4ecfb', '#d9cfee');
  lpField(c, 284, 300, 40, 8, ['#c9b9e0', '#d8c6e6', '#bfb1da', '#e6cfe3'], 32, 0.3);
  lpField(c, 298, 480, 46, 30, ['#f6f0fa', '#ece5f6', '#e1d9f1', '#faf3f5', '#d8d0ec', '#efe6f4'], 33, 0.45);
  smallIgloo(c, 30, 302, 0.9, true); smallIgloo(c, 186, 300, 0.6, true); smallIgloo(c, 238, 302, 0.75, false); smallIgloo(c, 342, 303, 0.85, true);
  c.strokeStyle = 'rgba(150,130,190,.35)'; c.lineWidth = 1.2;
  [[0, 470, 150, 380], [6, 476, 156, 386]].forEach(([x1, y1, x2, y2]) => { c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo(80, 440, x2, y2); c.stroke(); });
  for (let i = 0; i < 9; i++) { const x = 330 - i * 11, y = 470 - i * 6 + (i % 2) * 4; ell(c, x, y, 1.8, 1.2, 'rgba(150,130,190,.45)'); }
  poly(c, [228, 437, 296, 437, 262, 441], 'rgba(120,100,170,.18)');
}
function drawBigIgloo(c) {
  const dome = []; for (let k = 0; k <= 8; k++) { const an = Math.PI + k * Math.PI / 8; dome.push(Math.cos(an) * 62, 38 + Math.sin(an) * 76); }
  poly(c, dome, '#f6f3fb');
  poly(c, [0, -38, dome[12], dome[13], dome[14], dome[15], dome[16], dome[17], 0, 38], '#e2dcf0');
  poly(c, [dome[2], dome[3], dome[4], dome[5], dome[6], dome[7], -10, 10], '#ffffff');
  c.save(); c.beginPath(); c.moveTo(dome[0], dome[1]); for (let i = 2; i < dome.length; i += 2) c.lineTo(dome[i], dome[i + 1]); c.closePath(); c.clip();
  c.strokeStyle = 'rgba(140,120,185,.55)'; c.lineWidth = 1.2; c.beginPath();
  for (let r = 0; r < 5; r++) { const y = 38 - (r + 1) * 15; c.moveTo(-70, y); c.lineTo(70, y); for (let k = -4; k <= 4; k++) { const x = k * 16 + (r % 2) * 8; c.moveTo(x, y); c.lineTo(x + 1, y + 15); } }
  c.stroke(); c.restore();
  ell(c, 44, 40, 34, 4, 'rgba(120,100,170,.2)');
  poly(c, [26, 40, 30, 10, 44, 2, 60, 6, 70, 18, 72, 40], '#ece7f6'); poly(c, [44, 2, 60, 6, 70, 18, 72, 40, 52, 40], '#d6cfe9');
  c.strokeStyle = 'rgba(140,120,185,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(29, 22); c.lineTo(71, 24); c.moveTo(44, 2); c.lineTo(44, 22); c.moveTo(58, 24); c.lineTo(58, 40); c.stroke();
  glow(c, 56, 32, 18, '255,190,110');
  poly(c, [44, 40, 46, 26, 52, 21, 60, 21, 66, 26, 67, 40], '#ffb85c'); poly(c, [48, 40, 50, 28, 56, 25, 62, 28, 63, 40], '#ffd890');
  ell(c, 0, 41, 64, 3.5, 'rgba(255,255,255,.9)');
}
function drawInuksuk(c) {
  const st = (pts, col, sh, cap) => { poly(c, pts, col); if (sh) poly(c, sh, 'rgba(40,40,70,.22)'); if (cap) poly(c, cap, '#f8f6fd'); };
  st([-24, 48, -26, 30, -20, 22, -10, 24, -8, 48], '#8a8ca3', [-14, 24, -10, 24, -8, 48, -16, 48]);
  st([8, 48, 10, 24, 20, 22, 26, 30, 24, 48], '#9597ad', [18, 22, 26, 30, 24, 48, 18, 48]);
  st([-30, 22, -28, 12, 26, 10, 30, 20, 2, 23], '#7b7d95', [10, 11, 26, 10, 30, 20, 12, 22], [-28, 12, 26, 10, 22, 8, -24, 9]);
  st([-12, 10, -14, -8, 0, -12, 14, -6, 12, 10], '#a3a5b9', [2, -11, 14, -6, 12, 10, 4, 10]);
  st([-34, -10, -32, -20, 30, -22, 34, -12, 0, -8], '#86889f', [8, -21, 30, -22, 34, -12, 10, -9], [-32, -20, 30, -22, 26, -24, -28, -23]);
  st([-10, -22, -12, -32, 2, -36, 12, -30, 10, -22], '#9a9cb1', [2, -35, 12, -30, 10, -22, 4, -22]);
  st([-8, -36, -9, -44, 0, -49, 8, -44, 7, -36], '#8d8fa6', [1, -48, 8, -44, 7, -36, 2, -36], [-9, -44, 0, -49, 8, -44, 0, -46]);
}
function drawSnowmobile(c, a) {
  const v = Math.sin(a.t * 30) * 0.6 * a.live;
  c.translate(0, v * 0.5);
  c.strokeStyle = '#2f3442'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-34, 20); c.lineTo(-54, 20); c.quadraticCurveTo(-60, 20, -58, 14); c.stroke();
  c.lineWidth = 2.5; c.beginPath(); c.moveTo(-40, 20); c.lineTo(-36, 8); c.stroke();
  rr(c, -12, 8, 66, 16, 7); c.fillStyle = '#2f3442'; c.fill();
  [-4, 12, 28, 44].forEach((x) => circ(c, x, 16, 4.5, '#5a6172'));
  poly(c, [-50, 8, -36, -6, -8, -12, 30, -12, 52, -4, 56, 10, -46, 12], '#e2433a');
  poly(c, [-46, 12, 56, 10, 52, -4, 20, 2, -20, 4], '#b8322c');
  poly(c, [-36, -6, -8, -12, -12, -2, -40, 2], '#ff6a5c');
  poly(c, [-26, -10, -18, -28, -8, -28, -10, -12], 'rgba(160,210,255,.75)');
  poly(c, [-2, -12, 42, -12, 44, -19, 0, -19], '#2a2f3b');
  poly(c, [-44, 4, 54, 2, 54, 5, -45, 7], '#fff');
  circ(c, -47, 4, 3, '#ffe28a');
  c.strokeStyle = '#2a2f3b'; c.lineWidth = 2; c.beginPath(); c.moveTo(-14, -14); c.lineTo(-6, -22); c.lineTo(4, -22); c.stroke();
}

/* ===== 6-3 Sled Team (Alaska, USA) ===== */
function bgSled(c) {
  lpSky(c, 0, 290, ['#5aa5e0', '#8cc7f0', '#cfe8fb', '#eef8ff']);
  [[40, 60, 1], [250, 40, 1.3], [320, 100, 0.8]].forEach(([x, y, s]) => { poly(c, [x - 30 * s, y, x - 14 * s, y - 12 * s, x + 6 * s, y - 16 * s, x + 26 * s, y - 6 * s, x + 34 * s, y], 'rgba(255,255,255,.85)'); poly(c, [x - 30 * s, y, x + 34 * s, y, x + 10 * s, y - 6 * s], 'rgba(220,235,250,.9)'); });
  lpPeak(c, 90, 330, 210, 110, 270, '#9fb8d6', '#7f9cc0');
  lpPeak(c, -60, 160, 50, 160, 270, '#8aa7c9', '#6e8db3');
  lpPeak(c, 240, 420, 330, 170, 270, '#8aa7c9', '#6e8db3');
  lpField(c, 262, 300, 30, 12, ['#e8f1fb', '#dbe8f6', '#f2f7fd'], 41, 0.3);
  for (let i = 0; i < 26; i++) { const x = -8 + i * 15 + pr(i) * 8, h = 34 + pr(i + 40) * 22; lpTree(c, x, 286 + pr(i + 9) * 8, h, '#3f7563', '#2c5a4c'); }
  lpField(c, 292, 480, 44, 30, ['#f4f8fd', '#e7f0fa', '#dbe7f5', '#eef4fb', '#d2e1f2'], 42, 0.45);
  poly(c, [0, 344, 360, 336, 360, 402, 0, 408], 'rgba(150,175,205,.25)');
  c.strokeStyle = 'rgba(120,145,180,.35)'; c.lineWidth = 1.2; [356, 392].forEach((y) => { c.beginPath(); c.moveTo(0, y + 4); c.lineTo(360, y - 4); c.stroke(); });
  for (let i = 0; i < 7; i++) lpTree(c, 350 - (i % 2) * 14 + (i > 3 ? -330 : 0), 470 - (i % 4) * 4, 40 + (i % 3) * 8, '#4a8670', '#346451');
  c.strokeStyle = '#3a4252'; c.lineWidth = 2; c.beginPath(); c.moveTo(40, 374); c.lineTo(236, 374); c.stroke();
  c.strokeStyle = 'rgba(58,66,82,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(60, 374); c.lineTo(66, 386); c.moveTo(166, 374); c.lineTo(172, 386); c.stroke();
}
function drawMushSled(c) {
  c.strokeStyle = '#3a3f4f'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(54, 31); c.lineTo(-36, 31); c.quadraticCurveTo(-52, 31, -52, 18); c.quadraticCurveTo(-52, 6, -40, 4); c.stroke();
  c.lineWidth = 2.5; [-30, -4, 22].forEach((x) => { c.beginPath(); c.moveTo(x, 31); c.lineTo(x, 18); c.stroke(); });
  c.beginPath(); c.moveTo(36, 31); c.lineTo(36, -30); c.quadraticCurveTo(36, -34, 42, -34); c.lineTo(48, -34); c.stroke();
  poly(c, [-40, 18, 38, 18, 38, 13, -40, 13], '#b5793f');
  poly(c, [-34, 13, 32, 13, 30, -10, -12, -14, -32, -6], '#2f6db3');
  poly(c, [-34, 13, 32, 13, 30, 0, -32, 4], '#245a98');
  poly(c, [-12, -14, 30, -10, 26, -16, -8, -20], '#3f86d1');
  c.strokeStyle = '#f2d36b'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-28, -2); c.lineTo(28, -6); c.stroke();
  poly(c, [-6, -18, 8, -18, 6, -26, -4, -26], '#e2533f');
  poly(c, [40, 31, 54, 31, 52, 28, 40, 28], '#2a2f3b');
}
function drawTrailSign(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-4, -26, 8, 66); poly(c, [0, -26, 4, -26, 4, 40, 0, 40], '#5a3d23');
  poly(c, [-54, -13, -40, -32, 48, -32, 48, 6, -40, 6], '#a46a3a'); poly(c, [-54, -13, 48, -13, 48, 6, -40, 6], '#8e5a30');
  poly(c, [-40, -32, 48, -32, 44, -36, -36, -36], '#f4f8fd');
  fitTxt(c, T('往諾姆', 'TO NOME'), 6, -13, 78, 15, 800, '#fff4dc');
  poly(c, [-30, 12, 44, 12, 44, 28, -30, 28], '#d7a35e'); poly(c, [-30, 21, 44, 21, 44, 28, -30, 28], '#c48f4c');
  fitTxt(c, T('艾迪塔羅德步道', 'IDITAROD TRAIL'), 7, 20, 68, 9, 700, '#5a3d23');
  poly(c, [-14, 40, 14, 40, 9, 34, -9, 34], '#f4f8fd');
}
function drawTrailLantern(c, a) {
  const sw = Math.sin(a.t * 2.4) * 0.12 * a.live;
  c.fillStyle = '#5a3d23'; c.fillRect(-22, -50, 6, 102); poly(c, [-19, -50, -16, -50, -16, 52, -19, 52], '#47301b');
  c.fillStyle = '#3a3f4f'; c.fillRect(-22, -52, 40, 4); c.beginPath(); c.moveTo(-16, -44); c.lineTo(-4, -50); c.lineWidth = 2; c.strokeStyle = '#3a3f4f'; c.stroke();
  poly(c, [-24, -54, -14, -54, -16, -50, -22, -50], '#f4f8fd');
  c.save(); c.translate(12, -48); c.rotate(sw);
  c.strokeStyle = '#2a2f3b'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 8); c.stroke();
  glow(c, 0, 22, 18, '255,190,90');
  poly(c, [-7, 8, 7, 8, 9, 13, -9, 13], '#2f3442');
  poly(c, [-7, 13, 7, 13, 6, 30, -6, 30], '#ffd27a'); poly(c, [0, 13, 7, 13, 6, 30, 0, 30], '#ffbd52');
  c.fillStyle = '#2f3442'; c.fillRect(-1, 13, 2, 17); c.fillRect(-8, 30, 16, 4);
  ell(c, 0, 22, 2, 4, '#fff6d8');
  c.restore();
}

/* ===== 6-4 Drifting Iceberg (Antarctic Peninsula) ===== */
function lpCloud(c, x, y, s, a = 0.9) {
  poly(c, [x - 30 * s, y, x - 16 * s, y - 11 * s, x + 2 * s, y - 17 * s, x + 22 * s, y - 9 * s, x + 34 * s, y], `rgba(255,255,255,${a})`);
  poly(c, [x - 30 * s, y, x + 34 * s, y, x + 8 * s, y - 6 * s], `rgba(214,230,246,${a})`);
}
function bgBerg(c) {
  lpSky(c, 0, 250, ['#6fb2e3', '#a3d3f1', '#d8eefb', '#f2faff']);
  lpCloud(c, 60, 70, 1.2); lpCloud(c, 280, 46, 0.9); lpCloud(c, 200, 120, 0.7, 0.7);
  [[110, 150, 1], [140, 136, 0.8], [250, 170, 0.9], [312, 140, 0.7]].forEach(([x, y, s]) => { poly(c, [x - 9 * s, y - 3 * s, x - 3 * s, y, x, y + 2 * s, x + 3 * s, y, x + 9 * s, y - 3 * s, x + 2 * s, y - 1 * s, x, y - 1 * s, x - 2 * s, y - 1 * s], '#f8fbff'); circ(c, x, y, 1.6 * s, '#f8fbff'); });
  lpPeak(c, -50, 130, 40, 160, 246, '#eef5fc', '#bdd1e6', null);
  lpPeak(c, 90, 290, 196, 140, 246, '#f5f9fe', '#c6d8eb', null);
  lpPeak(c, 230, 410, 318, 172, 246, '#eef5fc', '#bdd1e6', null);
  [[40, 160, 28, 196, 46, 186], [196, 140, 180, 182, 200, 172], [196, 140, 214, 176, 206, 186], [318, 172, 336, 206, 324, 200]].forEach((p) => poly(c, p, '#5d6a80'));
  lpField(c, 244, 480, 40, 22, ['#2d7cb0', '#3689bd', '#2a6fa3', '#4596c7', '#327fb4', '#2a74a8'], 51, 0.35);
  const g = c.createLinearGradient(0, 244, 0, 480); g.addColorStop(0, 'rgba(220,240,255,.35)'); g.addColorStop(0.25, 'rgba(220,240,255,0)'); g.addColorStop(1, 'rgba(10,40,80,.25)');
  c.fillStyle = g; c.fillRect(0, 244, W, 236);
  poly(c, [250, 246, 262, 236, 286, 234, 300, 246], '#e9f4fc'); poly(c, [286, 234, 300, 246, 280, 246], '#bcd6ea');
  poly(c, [12, 247, 20, 240, 34, 241, 40, 247], '#e9f4fc');
  // a far expedition ship
  poly(c, [312, 247, 352, 247, 356, 240, 308, 240], '#c8463c'); poly(c, [318, 240, 344, 240, 342, 232, 322, 232], '#f4f6fa'); c.fillStyle = '#2a2f3b'; c.fillRect(330, 226, 3, 6);
  // the iceberg's hidden part, under water
  poly(c, [32, 336, 206, 336, 196, 372, 160, 404, 100, 410, 54, 384], 'rgba(150,226,236,.42)');
  poly(c, [100, 336, 206, 336, 196, 372, 160, 404], 'rgba(110,200,225,.3)');
  c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 1.2;
  [[30, 300, 70], [230, 420, 50], [150, 455, 60], [280, 310, 40], [20, 450, 40]].forEach(([x, y, w]) => { c.beginPath(); c.moveTo(x, y); c.lineTo(x + w, y); c.stroke(); });
}
function drawIceberg(c) {
  poly(c, [-84, 52, -88, 12, -78, -28, -66, -48, -40, -52, 0, -51, 40, -53, 66, -49, 82, -30, 90, 8, 86, 52], '#e3f3fc');
  poly(c, [-66, -48, -40, -52, 0, -51, 40, -53, 66, -49, 52, -40, -54, -40], '#ffffff');
  poly(c, [-88, 12, -78, -28, -66, -48, -54, -40, -60, 0, -70, 52, -84, 52], '#f2f9fe');
  poly(c, [-20, -40, 10, -40, 4, 10, -14, 26], '#d3ebf8');
  poly(c, [30, -40, 52, -40, 66, -49, 82, -30, 90, 8, 86, 52, 40, 52, 46, 0], '#b6dcf2');
  poly(c, [66, -49, 82, -30, 90, 8, 70, -10], '#9fd0ee');
  poly(c, [-50, 52, -44, 30, -30, 22, -16, 30, -10, 52], '#5fb4d8'); poly(c, [-44, 30, -30, 22, -16, 30, -30, 34], '#86c8e6');
  c.strokeStyle = 'rgba(120,180,215,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-60, -20); c.lineTo(30, -24); c.moveTo(-70, 10); c.lineTo(40, 6); c.stroke();
  poly(c, [-90, 52, 92, 52, 84, 56, -86, 56], 'rgba(255,255,255,.9)');
}
function drawFloe(c) {
  poly(c, [-62, -10, -44, -18, 30, -19, 62, -12, 58, -2, -60, 0], '#f7fbff');
  poly(c, [10, -19, 30, -19, 62, -12, 58, -2, 20, -6], '#e1eff9');
  poly(c, [-60, 0, 58, -2, 54, 12, -56, 14], '#93c8e8'); poly(c, [10, -1, 58, -2, 54, 12, 16, 13], '#7ab6de');
  poly(c, [-64, 14, 60, 12, 56, 17, -60, 18], 'rgba(255,255,255,.7)');
}
function drawZodiac(c, a) {
  c.translate(0, Math.sin(a.t * 2) * 1.2 * a.live);
  [[-30, '#e2533f', '#f2c14e'], [-6, '#e2533f', '#3d79c4'], [20, '#e2533f', '#f2c14e']].forEach(([x, coat, hat]) => {
    poly(c, [x - 8, 2, x - 7, -10, x + 7, -10, x + 8, 2], coat);
    lpOval(c, x, -14, 6, 6, 7, '#f1c9a5'); poly(c, [x - 6.5, -16, x - 5, -23, x + 5, -23, x + 6.5, -16], hat); circ(c, x, -23, 2, hat);
    circ(c, x - 2.2, -13, 0.9, '#1e2433'); circ(c, x + 2.2, -13, 0.9, '#1e2433'); circ(c, x - 3.5, -11, 1.1, 'rgba(240,120,110,.5)'); circ(c, x + 3.5, -11, 1.1, 'rgba(240,120,110,.5)');
  });
  poly(c, [-52, 0, -60, -8, -58, -2, -50, 16, 48, 16, 48, 0], '#3a404d');
  poly(c, [-50, 16, 48, 16, 48, 22, -44, 22], '#2b303b');
  poly(c, [-54, 4, 48, 4, 48, 8, -52, 8], '#f08a3c');
  poly(c, [-60, -8, -50, 0, 48, 0, 48, -3, -50, -3], '#4a5160');
  poly(c, [46, -12, 58, -12, 58, 4, 54, 22, 50, 22, 48, 4], '#2a2f3b'); poly(c, [46, -12, 58, -12, 57, -6, 47, -6], '#e8e8ea');
}

/* ===== 6-5 Penguin Parade (Atka Bay, Queen Maud Land) ===== */
function bgParade(c) {
  lpSky(c, 0, 262, ['#3e5590', '#7686b8', '#c9a8bc', '#f5cfa4', '#fbe1b2']);
  lpCloud(c, 70, 120, 1.4, 0.35); lpCloud(c, 250, 80, 1.1, 0.3);
  glow(c, 200, 214, 70, '255,210,150'); circ(c, 200, 214, 15, '#fff3d6');
  [[-10, 236, 120], [96, 230, 240], [230, 238, 370]].forEach(([x1, y, x2]) => {
    poly(c, [x1, 262, x1 + 8, y, x2 - 6, y - 2, x2, 262], '#f5f2f6');
    poly(c, [x2 - 40, y - 1, x2 - 6, y - 2, x2, 262, x2 - 44, 262], '#c9cde6');
    for (let x = x1 + 18; x < x2 - 40; x += 22) poly(c, [x, y + 4, x + 8, y + 4, x + 5, 262], 'rgba(170,175,215,.35)');
  });
  lpField(c, 260, 480, 46, 28, ['#f6f2f2', '#ebeaf3', '#e1e3f0', '#f8ebe0', '#ece3e8', '#dfe2ef'], 61, 0.45);
  for (let i = 0; i < 16; i++) {
    const t = i / 15, x = 340 - t * 280 + Math.sin(i) * 4, y = 274 + t * 22 - t * t * 10, s = 0.45 + t * 0.4;
    ell(c, x, y, 3 * s, 6 * s, '#232a3a'); ell(c, x + 0.8 * s, y + 1 * s, 1.8 * s, 4.2 * s, '#f6f8fc'); circ(c, x, y - 6 * s, 2.3 * s, '#232a3a');
  }
  [[72, 376], [156, 376], [240, 376], [304, 376]].forEach(([x, y]) => poly(c, [x - 14, y, x + 14, y, x - 30, y + 8, x - 58, y + 8], 'rgba(120,120,180,.18)'));
  c.strokeStyle = 'rgba(170,165,200,.35)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-10, 395); c.quadraticCurveTo(160, 380, 370, 392); c.stroke();
  for (let i = 0; i < 20; i++) { const x = 8 + i * 18, y = 386 + Math.sin(i * 1.3) * 3; poly(c, [x, y, x + 3, y - 3, x + 6, y], 'rgba(150,145,190,.35)'); }
}
function drawRouteFlag(c, a) {
  const pts = [];
  for (let i = 0; i <= 8; i++) pts.push([-16 + i * 5, -46 + Math.sin(a.t * 6 - i * 0.8) * i * 0.4]);
  c.fillStyle = '#d9b46a'; c.fillRect(-19, -48, 3.5, 92);
  c.fillStyle = '#b58f4c'; [-30, -6, 18].forEach((y) => c.fillRect(-19.5, y, 4.5, 2));
  c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); for (let i = 8; i >= 0; i--) c.lineTo(pts[i][0], pts[i][1] + 24); c.closePath(); c.fillStyle = '#e2533f'; c.fill();
  c.beginPath(); for (let i = 4; i <= 8; i++) c.lineTo(pts[i][0], pts[i][1] + (i === 4 ? 24 : 0)); for (let i = 8; i >= 4; i--) c.lineTo(pts[i][0], pts[i][1] + 24); c.closePath(); c.fillStyle = 'rgba(0,0,0,.12)'; c.fill();
  poly(c, [-30, 48, -6, 48, -12, 40, -24, 40], '#f4f6fb');
}
function drawCamera(c) {
  c.strokeStyle = '#2f3442'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, 0); c.lineTo(-24, 36); c.moveTo(0, 0); c.lineTo(24, 36); c.moveTo(0, 0); c.lineTo(3, 37); c.stroke();
  c.fillStyle = '#3a3f4f'; c.fillRect(-6, -4, 12, 6);
  poly(c, [-22, -24, 8, -24, 10, -4, -22, -4], '#2a2f3b'); poly(c, [-22, -24, 8, -24, 6, -20, -22, -20], '#454b5c');
  poly(c, [-14, -30, -2, -30, 0, -24, -16, -24], '#2a2f3b');
  rr(c, 8, -21, 24, 14, 3); c.fillStyle = '#3a3f4f'; c.fill();
  c.fillStyle = '#8f949e'; c.fillRect(18, -21, 2, 14); c.fillRect(24, -21, 2, 14); poly(c, [30, -23, 35, -24, 35, -4, 30, -5], '#2a2f3b'); poly(c, [33, -20, 35, -20, 35, -8, 33, -8], '#7fb8e8');
  circ(c, -16, -18, 2, '#e2533f'); poly(c, [-10, -14, 2, -14, 2, -8, -10, -8], '#7fb8e8');
}

/* ===== 6-6 Glacier Cave (Vatnajökull, Iceland) ===== */
const caveMouth = [112, 304, 116, 232, 140, 182, 188, 160, 236, 172, 264, 222, 270, 304];
function bgCave(c) {
  c.fillStyle = '#0b2440'; c.fillRect(0, 0, W, H);
  lpField(c, 0, 330, 34, 30, ['#0f3a66', '#15508a', '#1e67a8', '#2a7fc2', '#3d98d6', '#5ab2e6', '#1a4878', '#7cc6ee'], 71, 0.55);
  const rg = c.createRadialGradient(190, 240, 20, 190, 240, 220); rg.addColorStop(0, 'rgba(190,240,255,.45)'); rg.addColorStop(1, 'rgba(190,240,255,0)');
  c.fillStyle = rg; c.fillRect(0, 0, W, H);
  const tg = c.createLinearGradient(0, 0, 0, 120); tg.addColorStop(0, 'rgba(4,16,36,.55)'); tg.addColorStop(1, 'rgba(4,16,36,0)');
  c.fillStyle = tg; c.fillRect(0, 0, W, 120);
  poly(c, caveMouth, '#eaf7ff');
  c.save(); c.beginPath(); c.moveTo(caveMouth[0], caveMouth[1]); for (let i = 2; i < caveMouth.length; i += 2) c.lineTo(caveMouth[i], caveMouth[i + 1]); c.closePath(); c.clip();
  lpSky(c, 150, 260, ['#bfe2f8', '#eef8ff']);
  lpPeak(c, 110, 230, 160, 222, 262, '#f6fbff', '#d2e6f5', null); lpPeak(c, 170, 290, 238, 214, 262, '#eef6fd', '#c9def0', null);
  lpField(c, 258, 306, 30, 16, ['#ffffff', '#f2f8fd', '#e6f1fa'], 72, 0.3);
  c.restore();
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2; c.beginPath(); c.moveTo(caveMouth[0], caveMouth[1]); for (let i = 2; i < caveMouth.length; i += 2) c.lineTo(caveMouth[i], caveMouth[i + 1]); c.stroke();
  [[120, 300, 20, 480, 120, 480], [262, 300, 360, 470, 262, 480]].forEach((p) => poly(c, p, 'rgba(220,245,255,.07)'));
  lpField(c, 300, 480, 40, 30, ['#2c3644', '#364252', '#3f4c5e', '#27303c', '#4a5a70', '#5d7fa3', '#33404f'], 73, 0.45);
  poly(c, [112, 302, 270, 302, 330, 400, 60, 400], 'rgba(200,235,255,.16)');
  poly(c, [140, 302, 240, 302, 270, 350, 110, 350], 'rgba(220,245,255,.16)');
  for (let i = 0; i < 18; i++) { const x = 6 + i * 20 + pr(i + 3) * 8, h = 8 + pr(i + 7) * 16, y = 6 + Math.abs(i - 9) * 1.4; poly(c, [x - 4, y, x + 4, y, x + pr(i) * 2, y + h], i % 2 ? '#8fd3f5' : '#bfe8fb'); }
  lpRock(c, 52, 330, 46, 28, '#4f8fc0', '#2f6a9c', 9); poly(c, [16, 318, 52, 306, 88, 316, 52, 324], '#8fd0f2'); lpRock(c, 330, 326, 34, 22, '#4f8fc0', '#2f6a9c', 12);
  c.strokeStyle = '#3a2f26'; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(0, 74); c.quadraticCurveTo(45, 92, 90, 90); c.quadraticCurveTo(180, 106, 270, 90); c.quadraticCurveTo(315, 92, 360, 74); c.stroke();
}
function drawHangLantern(c, a) {
  c.rotate(Math.sin(a.t * 2) * 0.1 * a.live);
  c.strokeStyle = '#3a2f26'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0, -32); c.lineTo(0, -22); c.stroke();
  glow(c, 0, 0, 20, '255,196,110');
  poly(c, [-6, -22, 6, -22, 11, -15, -11, -15], '#2f3442'); circ(c, 0, -24, 2.5, '#2f3442');
  poly(c, [-9, -15, 9, -15, 9, 14, -9, 14], '#ffd27a'); poly(c, [0, -15, 9, -15, 9, 14, 0, 14], '#ffbe55');
  c.fillStyle = '#2f3442'; c.fillRect(-10, -15, 2.2, 29); c.fillRect(7.8, -15, 2.2, 29); c.fillRect(-1, -15, 2, 29);
  ell(c, 0, 2, 2.4, 5, '#fff6d8');
  poly(c, [-11, 14, 11, 14, 8, 20, -8, 20], '#2f3442');
}
function drawDangerSign(c) {
  c.fillStyle = '#3a3f4f'; c.fillRect(-38, 6, 5, 28); c.fillRect(32, 6, 5, 28);
  poly(c, [-48, -32, 48, -32, 48, 10, -48, 10], '#f2c230'); poly(c, [-48, -32, 48, -32, 48, -28, -48, -28], '#ffd95a');
  c.strokeStyle = '#2a2f3b'; c.lineWidth = 2; c.strokeRect(-45, -29, 90, 36);
  poly(c, [-31, -24, -20, -4, -42, -4], '#2a2f3b'); poly(c, [-31, -19, -24, -7, -38, -7], '#f2c230');
  poly(c, [-32, -16, -30, -16, -31, -9], '#2a2f3b'); circ(c, -31, -8.5, 0.9, '#2a2f3b');
  fitTxt(c, T('小心落冰', 'FALLING ICE'), 8, -18, 60, 12, 900, '#2a2f3b');
  fitTxt(c, T('請勿靠近冰壁', 'KEEP AWAY FROM WALLS'), 8, -4, 60, 7.5, 700, '#2a2f3b');
  poly(c, [-48, -32, 48, -32, 42, -36, -42, -36], '#eaf6ff');
}
function drawHelmet(c) {
  ell(c, 0, 16, 26, 3, 'rgba(0,0,0,.3)');
  poly(c, [-22, 10, -20, -6, -12, -16, 0, -19, 12, -16, 20, -6, 22, 10], '#e2433a');
  poly(c, [0, -19, 12, -16, 20, -6, 22, 10, 6, 10], '#bf3530');
  poly(c, [-12, -16, 0, -19, -4, -8, -16, -4], '#ff6a5c');
  poly(c, [-26, 10, 26, 10, 24, 14, -24, 14], '#a62d29');
  c.fillStyle = '#2a2f3b'; c.fillRect(-20, 2, 40, 3);
  rr(c, -10, -2, 12, 8, 2); c.fillStyle = '#3a3f4f'; c.fill(); circ(c, -4, 2, 3, '#ffe28a');
  poly(c, [-6, -14, -2, -14, 0, -6, -4, -6], 'rgba(0,0,0,.25)'); poly(c, [4, -14, 8, -13, 9, -6, 5, -6], 'rgba(0,0,0,.25)');
}

/* ===== 6-7 Ice-Fishing Hut (Lake Inari, Finland) ===== */
function bgFish(c) {
  lpSky(c, 0, 232, ['#22376a', '#4f5592', '#9c7fae', '#eba7a2', '#ffd4a6']);
  lpStars(c, 77, 30, 90, 0.5);
  for (let x = 0; x < W; x += 10) { const y = 92 + Math.sin(x / 70 + 2) * 20, y2 = 92 + Math.sin((x + 10) / 70 + 2) * 20; poly(c, [x, y, x + 10, y2, x + 10, y2 - 40, x, y - 40], `rgba(120,255,190,${0.14 + 0.08 * Math.sin(x / 31)})`); }
  lpPeak(c, -60, 160, 60, 176, 222, '#6b6aa0', '#565589', '#e7e2f4', '#c9c3e3');
  lpPeak(c, 170, 400, 300, 168, 222, '#6b6aa0', '#565589', '#e7e2f4', '#c9c3e3');
  for (let i = 0; i < 30; i++) { const x = -6 + i * 12.6 + pr(i + 5) * 6, h = 22 + pr(i + 50) * 18; lpTree(c, x, 230 + pr(i + 2) * 4, h, '#2e4a66', '#22384f', '#dcd6ee'); }
  lpField(c, 228, 480, 46, 28, ['#ece8f4', '#dfdcef', '#d3d3ea', '#f2eaf2', '#c9cbe6', '#f5f0f7'], 81, 0.45);
  poly(c, [26, 236, 40, 226, 54, 236], '#3a3f4f'); c.fillStyle = '#b8442f'; c.fillRect(28, 236, 24, 10);
  poly(c, [300, 238, 312, 230, 324, 238], '#3a3f4f'); c.fillStyle = '#c99a3a'; c.fillRect(302, 238, 20, 8);
  ell(c, 232, 438, 22, 7, '#e9eef8'); ell(c, 232, 438, 17, 5, '#1d3350'); ell(c, 228, 437, 9, 2, 'rgba(120,170,220,.5)');
  ell(c, 40, 470, 16, 5, '#e9eef8'); ell(c, 40, 470, 12, 3.6, '#1d3350');
  ell(c, 332, 296, 12, 4, '#e9eef8'); ell(c, 332, 296, 9, 2.8, '#1d3350');
  c.strokeStyle = 'rgba(140,130,190,.35)'; c.lineWidth = 1.1;
  [[360, 400], [360, 408]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(250, 380, 120, 330); c.stroke(); });
  for (let i = 0; i < 8; i++) ell(c, 150 + i * 10, 470 - i * 4 + (i % 2) * 3, 2, 1.3, 'rgba(140,130,190,.4)');
}
function drawFishHut(c, a) {
  const L = a.live;
  for (let i = 0; i < 3; i++) { const k = ((a.t * 0.5 + i / 3) % 1), r = 3 + k * 4; circ(c, 32 + k * 8 * (0.4 + L * 0.6), -42 - k * 14, r, `rgba(235,235,245,${0.7 - k * 0.6})`); }
  c.fillStyle = '#5a3d23'; c.fillRect(-56, 50, 112, 5); c.fillRect(-60, 55, 120, 3);
  poly(c, [-52, -12, 50, -12, 50, 50, -52, 50], '#c0392b'); poly(c, [20, -12, 50, -12, 50, 50, 20, 50], '#a83226');
  c.strokeStyle = 'rgba(80,20,15,.35)'; c.lineWidth = 1; c.beginPath(); for (let x = -40; x < 50; x += 12) { c.moveTo(x, -10); c.lineTo(x, 50); } c.stroke();
  c.fillStyle = '#f4efe6'; c.fillRect(-52, -12, 3, 62); c.fillRect(47, -12, 3, 62);
  c.fillStyle = '#3a3f4f'; c.fillRect(28, -36, 7, 18);
  poly(c, [-62, -10, -2, -44, 58, -10, 52, -6, -2, -36, -56, -6], '#3a3f4f');
  poly(c, [-64, -11, -2, -48, 60, -11, 56, -8, -2, -42, -60, -8], '#f4f6fb'); poly(c, [-2, -48, 60, -11, 56, -8, -2, -42], '#d8dff0');
  poly(c, [-36, 8, -16, 8, -16, 50, -36, 50], '#6b4a2b'); circ(c, -20, 30, 1.6, '#e8c27a');
  glow(c, 30, 18, 14, '255,200,120');
  poly(c, [18, 6, 42, 6, 42, 28, 18, 28], '#ffd27a'); c.fillStyle = '#f4efe6'; c.fillRect(29, 6, 2, 22); c.fillRect(18, 16, 24, 2);
  c.strokeStyle = '#f4efe6'; c.lineWidth = 2; c.strokeRect(18, 6, 24, 22);
  poly(c, [-54, 50, 52, 50, 56, 46, 30, 44, -20, 46, -56, 46], '#f4f6fb');
}
function drawIceRod(c) {
  c.strokeStyle = '#7a5a3a'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-20, 24); c.lineTo(-20, 2); c.moveTo(-20, 2); c.lineTo(-26, -6); c.moveTo(-20, 2); c.lineTo(-14, -6); c.stroke();
  c.strokeStyle = '#2a2f3b'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(-46, 8); c.lineTo(40, -14); c.stroke();
  c.strokeStyle = '#c99a5a'; c.lineWidth = 5; c.beginPath(); c.moveTo(-46, 8); c.lineTo(-30, 4); c.stroke();
  circ(c, -32, 9, 4.5, '#e2533f'); circ(c, -32, 9, 1.6, '#f4f6fb');
  c.strokeStyle = 'rgba(230,240,255,.95)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-32, 9); c.lineTo(40, -14); c.lineTo(40, 25); c.stroke();
  circ(c, 40, -14, 1.6, '#f2c14e');
}
function drawKickSled(c) {
  c.strokeStyle = '#3a3f4f'; c.lineWidth = 2.6; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath(); c.moveTo(38, 38); c.lineTo(-28, 38); c.quadraticCurveTo(-38, 38, -38, 30); c.stroke();
  c.beginPath(); c.moveTo(-26, 38); c.lineTo(-26, 8); c.moveTo(-4, 38); c.lineTo(-4, 8); c.moveTo(-4, 8); c.lineTo(0, -32); c.lineTo(10, -36); c.stroke();
  c.strokeStyle = '#b8442f'; c.lineWidth = 3.2; c.beginPath(); c.moveTo(-2, -10); c.lineTo(-24, -12); c.stroke();
  poly(c, [-32, 4, -2, 4, -2, 10, -32, 10], '#b8442f'); poly(c, [-32, 4, -2, 4, -4, 1, -30, 1], '#d9614a');
  poly(c, [-30, 1, -6, 1, -8, -4, -26, -4], '#f1e8d6'); poly(c, [-6, 1, -2, -6, -1, -14, -6, -10], '#f1e8d6');
  poly(c, [30, 38, 40, 38, 40, 35, 30, 35], '#2a2f3b');
}
function drawBucket(c) {
  ell(c, 0, 21, 20, 3, 'rgba(60,60,110,.2)');
  poly(c, [-6, -10, -10, -22, -2, -16], '#5f7d8c'); poly(c, [-2, -16, -10, -22, -4, -24, 2, -14], '#4f6b79');
  poly(c, [6, -10, 12, -20, 8, -12], '#e08a4b'); poly(c, [8, -12, 12, -20, 15, -18, 9, -9], '#c97a3d');
  poly(c, [-17, -10, 17, -10, 13, 20, -13, 20], '#9aa6b8'); poly(c, [4, -10, 17, -10, 13, 20, 3, 20], '#7f8ba0');
  c.fillStyle = '#6a768a'; c.fillRect(-16, -4, 32, 2.5); c.fillRect(-14, 12, 28, 2.5);
  ell(c, 0, -10, 17, 3.5, '#5a6578');
  c.strokeStyle = '#4a5466'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-17, -9); c.quadraticCurveTo(0, -30, 17, -9); c.stroke();
}
function drawStormLantern(c, a) {
  const f = 1 + Math.sin(a.t * 11) * 0.08 * a.live;
  glow(c, 0, 2, 16 * f, '255,190,90');
  c.strokeStyle = '#2f3442'; c.lineWidth = 1.6; c.beginPath(); c.arc(0, -18, 8, Math.PI, 0); c.stroke();
  poly(c, [-6, -20, 6, -20, 10, -12, -10, -12], '#b8442f');
  poly(c, [-9, -12, 9, -12, 11, 2, 9, 14, -9, 14, -11, 2], 'rgba(255,225,150,.85)');
  ell(c, 0, 4, 3 * f, 6 * f, '#fff1c4'); ell(c, 0, 6, 1.8, 3, '#ffb347');
  c.fillStyle = '#2f3442'; c.fillRect(-11, -1, 2, 6); c.fillRect(9, -1, 2, 6);
  poly(c, [-12, 14, 12, 14, 14, 26, -14, 26], '#b8442f'); poly(c, [2, 14, 12, 14, 14, 26, 4, 26], '#9a3626');
}

/* ===== 6-8 Research Station (Ross Island, Antarctica) ===== */
function bgStation(c) {
  lpSky(c, 0, 252, ['#3b87d4', '#6eaee8', '#bcdcf8', '#e8f5ff']);
  [[200, 96, 18], [226, 84, 22], [256, 70, 24], [292, 58, 22], [326, 50, 18]].forEach(([x, y, r], i) => { lpOval(c, x, y, r, r * 0.6, 7, `rgba(255,255,255,${0.75 - i * 0.1})`, `rgba(215,228,240,${0.7 - i * 0.1})`); });
  poly(c, [-20, 252, 110, 126, 150, 104, 196, 104, 230, 124, 380, 252], '#e9f1fa');
  poly(c, [196, 104, 230, 124, 380, 252, 240, 252], '#bfd2e7');
  [[150, 104, 132, 150, 146, 142], [172, 106, 160, 170, 176, 150], [206, 112, 214, 166, 222, 150], [110, 126, 84, 186, 98, 178], [240, 140, 266, 200, 252, 196]].forEach((p) => poly(c, p, '#4d5566'));
  poly(c, [150, 104, 196, 104, 188, 110, 158, 110], '#8a91a0');
  lpPeak(c, 250, 420, 340, 190, 252, '#dde8f4', '#b3c7dd', null);
  lpField(c, 250, 480, 44, 26, ['#eef3f9', '#e1e9f3', '#f6f9fc', '#d6e0ec', '#e6edf5', '#cfdbe9'], 91, 0.45);
  [[60, 300, 60, 16], [240, 470, 80, 18], [330, 330, 40, 12], [150, 460, 50, 12]].forEach(([x, y, rx, ry], i) => lpOval(c, x, y, rx, ry, 7, '#6d717c', '#5a5e69', i));
  lpRock(c, 300, 244, 36, 18, '#6d717c', '#555965', 3);
  [[326, 252], [348, 254]].forEach(([x, y]) => { c.fillStyle = '#3f8a5c'; c.fillRect(x - 9, y - 22, 18, 22); ell(c, x, y - 22, 9, 3, '#58a876'); });
  for (let i = 0; i < 7; i++) { const x = 20 + i * 48, y = 316 + Math.sin(i) * 4; c.fillStyle = '#c9a46a'; c.fillRect(x, y - 16, 1.5, 16); poly(c, [x + 1.5, y - 16, x + 10, y - 13, x + 1.5, y - 10], i % 2 ? '#3c9d6a' : '#e2533f'); }
  ell(c, 120, 297, 82, 5, 'rgba(70,90,130,.18)');
}
function drawModule(c) {
  c.fillStyle = '#4a5160'; [-70, -30, 10, 50].forEach((x) => c.fillRect(x - 3, 14, 6, 30));
  c.fillStyle = '#3a404d'; c.fillRect(-78, 14, 156, 4);
  poly(c, [-80, -40, 80, -40, 80, 14, -80, 14], '#e8742f');
  poly(c, [-80, -40, 80, -40, 80, -34, -80, -34], '#c95a20'); poly(c, [40, -34, 80, -34, 80, 14, 40, 14], '#d4652a');
  [-66, -46, -26, -6, 14, 34].forEach((x) => { c.fillStyle = '#f4efe6'; c.fillRect(x - 1, -23, 14, 12); c.fillStyle = '#7fb8e8'; c.fillRect(x + 1, -21, 10, 8); });
  fitTxt(c, T('南極研究站', 'ANTARCTIC STATION'), -10, 2, 100, 8, 800, '#fff3e0', '"JetBrains Mono", monospace');
  poly(c, [62, -26, 76, -26, 76, 14, 62, 14], '#5a606e'); c.fillStyle = '#7fb8e8'; c.fillRect(65, -22, 8, 7);
  poly(c, [-84, -40, 84, -40, 80, -44, -80, -44], '#f4f8fd');
}
function drawAntenna(c, a) {
  c.strokeStyle = '#4a5160'; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(-6, 24); c.lineTo(0, -18); c.lineTo(6, 24);
  for (let y = 18; y > -14; y -= 8) { const w = 6 * (y + 18) / 42; c.moveTo(-w, y); c.lineTo(w, y - 6); }
  c.moveTo(-15, -6); c.lineTo(15, -6); c.moveTo(-11, 4); c.lineTo(11, 4); c.stroke();
  c.fillStyle = '#3a404d'; c.fillRect(-9, 22, 18, 3);
  circ(c, 0, -20, 3, `rgba(255,80,70,${0.6 + 0.4 * Math.sin(a.t * 4) * a.live})`);
}
function drawDish(c) {
  poly(c, [-18, 30, 18, 30, 20, 44, -20, 44], '#8f949e'); poly(c, [4, 30, 18, 30, 20, 44, 6, 44], '#757a86');
  c.fillStyle = '#5a606e'; c.fillRect(-4, -2, 8, 32);
  c.save(); c.translate(0, -12); c.rotate(-0.45);
  const rim = []; for (let k = 0; k <= 10; k++) { const an = Math.PI * k / 10; rim.push(Math.cos(an) * 32, Math.sin(an) * 14); }
  poly(c, rim, '#f4f6fa'); poly(c, [0, 0, ...rim.slice(0, 12)], '#d9dfe8');
  poly(c, [-32, 0, 32, 0, 30, -2, -30, -2], '#c9ced8');
  c.strokeStyle = '#5a606e'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-24, -1); c.lineTo(0, -26); c.lineTo(24, -1); c.stroke();
  circ(c, 0, -27, 3, '#e2533f');
  c.restore();
}
function drawPoleSign(c) {
  c.fillStyle = '#d9d2c2'; c.fillRect(-3, -48, 6, 96); poly(c, [0, -48, 3, -48, 3, 48, 0, 48], '#bdb5a3');
  const arrow = (y, dir, col, s, i) => {
    const x0 = dir > 0 ? -44 : -50, x1 = dir > 0 ? 50 : 44;
    const pts = dir > 0 ? [x0, y, x1 - 8, y, x1, y + 7, x1 - 8, y + 14, x0, y + 14] : [x0, y + 7, x0 + 8, y, x1, y, x1, y + 14, x0 + 8, y + 14];
    poly(c, pts, col); poly(c, [x0 + (dir > 0 ? 0 : 8), y + 10, x1 - (dir > 0 ? 8 : 0), y + 10, x1 - (dir > 0 ? 3 : 0), y + 12, x0 + (dir > 0 ? 0 : 3), y + 12], 'rgba(0,0,0,.12)');
    fitTxt(c, s, (x0 + x1) / 2 + (dir > 0 ? -3 : 3), y + 7.5, 80, 8.5, 800, '#fff', '"Noto Sans TC", sans-serif');
  };
  arrow(-42, 1, '#e2533f', T('南極點 1350 km', 'SOUTH POLE 1350 km'));
  arrow(-24, -1, '#2f6db3', T('紐西蘭基督城 3830 km', 'CHRISTCHURCH 3830 km'));
  arrow(-6, 1, '#3c9d6a', T('台北 11800 km', 'TAIPEI 11800 km'));
  poly(c, [-6, -50, 6, -50, 4, -54, -4, -54], '#f4f8fd');
  ell(c, 0, 48, 16, 3, 'rgba(70,90,130,.25)');
}
function drawMast(c, a) {
  const sp = a.t * (2 + 6 * a.live);
  c.strokeStyle = '#8a909c'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(0, -30); c.lineTo(-20, 58); c.moveTo(0, -30); c.lineTo(20, 58); c.stroke();
  c.fillStyle = '#5a606e'; c.fillRect(-2, -44, 4, 102);
  c.fillStyle = '#f4f6fa'; c.fillRect(2, 6, 16, 18); c.fillStyle = '#c9ced8'; for (let y = 9; y < 24; y += 3) c.fillRect(3, y, 14, 1);
  poly(c, [0, 4, 20, 4, 20, 6, 0, 6], '#8f949e');
  c.fillStyle = '#3a404d'; c.fillRect(-16, -30, 32, 2.5);
  poly(c, [10, -36, 18, -32, 10, -28], '#e2533f'); c.fillRect(-12, -33, 22, 1.6); poly(c, [-14, -36, -10, -32, -14, -28, -12, -32], '#3a404d');
  c.fillStyle = '#3a404d'; c.fillRect(-1, -52, 2, 8);
  for (let k = 0; k < 3; k++) { const an = sp + k * 2.094, x = Math.cos(an) * 11, s = Math.sin(an); c.strokeStyle = '#3a404d'; c.lineWidth = 1; c.beginPath(); c.moveTo(0, -52); c.lineTo(x, -52 + s * 2); c.stroke(); circ(c, x, -52 + s * 2, 3.2, s > 0 ? '#e2533f' : '#b8382c'); }
}
function drawRamp(c) {
  c.strokeStyle = '#8f949e'; c.lineWidth = 1.5; c.beginPath(); [-44, -4, 36].forEach((x) => { c.moveTo(x, -6); c.lineTo(x, -13); }); c.moveTo(-50, -13); c.lineTo(46, -13); c.stroke();
  poly(c, [-54, -6, 54, -6, 54, 2, -54, 2], '#9a7a56'); poly(c, [-54, 2, 54, 2, 52, 8, -54, 8], '#6b4f35');
  c.fillStyle = 'rgba(60,40,20,.4)'; for (let x = -48; x < 54; x += 9) c.fillRect(x, -6, 1.5, 8);
}

/* ===== 6-9 Blizzard (Churchill, Manitoba) ===== */
function flagTree(c, x, y, h) {
  c.strokeStyle = '#4a5462'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - h); c.stroke();
  for (let i = 0; i < 5; i++) { const yy = y - h * 0.25 - i * h * 0.15, w = h * (0.45 - i * 0.07); poly(c, [x, yy - 3, x + w, yy + 1, x, yy + 3], '#55636f'); }
}
function bgBlizz(c) {
  lpSky(c, 0, 300, ['#4c6180', '#7a8ea8', '#a7b6c7', '#c7d2dd']);
  lpPeak(c, -60, 170, 50, 236, 300, '#a3b1c2', '#93a2b5', '#d5dde7', '#c5cfdb');
  lpPeak(c, 130, 420, 290, 226, 300, '#a3b1c2', '#93a2b5', '#d5dde7', '#c5cfdb');
  [[120, 300, 40], [140, 302, 30], [250, 298, 36], [20, 300, 28], [340, 300, 34]].forEach(([x, y, h]) => flagTree(c, x, y, h));
  lpField(c, 296, 480, 46, 28, ['#dfe6ee', '#d3dce6', '#e8eef4', '#c8d2de', '#edf1f6'], 101, 0.45);
  c.strokeStyle = '#2f3540'; c.lineWidth = 1.1;
  [[28, 169, 288, 163, 206], [72, 169, 332, 163, 200]].forEach(([x1, y1, x2, y2, cy]) => { c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo((x1 + x2) / 2, cy, x2, y2); c.stroke(); });
  c.beginPath(); c.moveTo(0, 176); c.quadraticCurveTo(14, 178, 28, 169); c.moveTo(332, 163); c.quadraticCurveTo(346, 170, 360, 172); c.stroke();
  [[244, 362], [292, 348], [340, 356]].forEach(([x, y]) => { poly(c, [x - 4, y, x + 4, y, x + 4, y + 44, x - 4, y + 44], '#6b4a2b'); poly(c, [x, y, x + 4, y, x + 4, y + 44, x, y + 44], '#5a3d23'); poly(c, [x - 5, y, x + 5, y, x + 3, y - 3, x - 3, y - 3], '#f4f7fb'); });
  c.strokeStyle = '#4a3a2c'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(244, 372); c.quadraticCurveTo(268, 380, 292, 368); c.quadraticCurveTo(316, 380, 340, 374); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 1;
  for (let i = 0; i < 60; i++) { const x = pr(i) * 400 - 30, y = pr(i + 99) * 470, l = 14 + pr(i + 7) * 26; c.beginPath(); c.moveTo(x, y); c.lineTo(x + l, y + l * 0.28); c.stroke(); }
  [[60, 470, 90], [300, 476, 120], [180, 330, 60]].forEach(([x, y, w]) => poly(c, [x - w / 2, y, x - w / 4, y - 8, x + w / 3, y - 6, x + w / 2, y], '#f2f5f9'));
}
function ovBlizz(c) {
  for (let i = 0; i < 46; i++) { const x = pr(i + 300) * W, y = pr(i + 400) * H, r = 0.8 + pr(i + 500) * 1.6; c.fillStyle = `rgba(255,255,255,${0.45 + pr(i + 600) * 0.45})`; c.beginPath(); c.ellipse(x, y, r * 1.8, r, 0.28, 0, 6.283); c.fill(); }
  const g = c.createLinearGradient(0, 380, 0, 480); g.addColorStop(0, 'rgba(235,240,246,0)'); g.addColorStop(1, 'rgba(235,240,246,.35)');
  c.fillStyle = g; c.fillRect(0, 380, W, 100);
}
function drawPowerPole(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-3.5, -62, 7, 130); poly(c, [0, -62, 3.5, -62, 3.5, 68, 0, 68], '#553a20');
  c.fillStyle = '#5a3d23'; c.fillRect(-27, -54, 54, 5);
  c.strokeStyle = '#5a3d23'; c.lineWidth = 2; c.beginPath(); c.moveTo(-18, -49); c.lineTo(0, -36); c.lineTo(18, -49); c.stroke();
  [-22, 22].forEach((x) => { poly(c, [x - 2.5, -54, x + 2.5, -54, x + 2, -59, x - 2, -59], '#4f9a7a'); circ(c, x, -59, 2, '#6fc29c'); });
  poly(c, [-28, -54, 28, -54, 25, -57, -25, -57], '#f4f7fb');
  ell(c, 0, 67, 14, 3, '#f2f5f9');
}
function drawCabin(c) {
  poly(c, [-50, -6, 50, -6, 50, 38, -50, 38], '#7a4f30');
  c.strokeStyle = 'rgba(40,20,10,.35)'; c.lineWidth = 1; c.beginPath(); for (let y = 0; y < 38; y += 6) { c.moveTo(-50, y); c.lineTo(50, y); } c.stroke();
  [-52, 48].forEach((x) => { c.fillStyle = '#5e3b22'; c.fillRect(x, -6, 4, 44); });
  c.fillStyle = '#5a606e'; c.fillRect(24, -36, 8, 18);
  poly(c, [-58, -4, 0, -34, 58, -4, 52, -2, 0, -28, -52, -2], '#3a2c22');
  poly(c, [-60, -6, 0, -40, 60, -6, 54, -4, 0, -32, -54, -4], '#f6f8fb'); poly(c, [0, -40, 60, -6, 54, -4, 0, -32], '#d8dfe8');
  poly(c, [22, -38, 34, -38, 33, -35, 23, -35], '#f6f8fb');
  glow(c, -22, 14, 14, '255,200,120');
  c.fillStyle = '#ffd27a'; c.fillRect(-32, 4, 20, 18); c.strokeStyle = '#4a3020'; c.lineWidth = 2; c.strokeRect(-32, 4, 20, 18); c.fillStyle = '#4a3020'; c.fillRect(-23, 4, 2, 18);
  poly(c, [-36, 4, -32, 4, -32, 22, -36, 22], '#2f6db3'); poly(c, [-12, 4, -8, 4, -8, 22, -12, 22], '#2f6db3');
  poly(c, [8, 6, 26, 6, 26, 38, 8, 38], '#4a3020'); circ(c, 22, 22, 1.4, '#e8c27a');
  poly(c, [-54, 38, 54, 38, 50, 32, 30, 34, 0, 30, -30, 33, -50, 32], '#f6f8fb');
}
function drawBearSign(c) {
  c.fillStyle = '#5a606e'; c.fillRect(-36, 10, 5, 28); c.fillRect(31, 10, 5, 28);
  poly(c, [-50, -34, 50, -34, 50, 12, -50, 12], '#f8f9fb');
  poly(c, [-50, -34, 50, -34, 50, -20, -50, -20], '#d63a2f');
  fitTxt(c, T('北極熊警戒區', 'POLAR BEAR ALERT'), 0, -27, 92, 10, 900, '#fff');
  fitTxt(c, T('停！', 'STOP'), -28, -6, 32, 13, 900, '#d63a2f');
  fitTxt(c, T('請勿步行', 'DO NOT WALK'), 19, -10, 50, 7.5, 800, '#2a2f3b');
  fitTxt(c, T('進入此區', 'IN THIS AREA'), 19, 1, 50, 7.5, 800, '#2a2f3b');
  c.strokeStyle = '#2a2f3b'; c.lineWidth = 1.5; c.strokeRect(-48, -32, 96, 42);
  poly(c, [-52, -34, 52, -34, 46, -38, -46, -38], '#f4f7fb');
}
function drawBuggy(c) {
  [-36, 34].forEach((x) => { lpOval(c, x, 20, 14, 14, 10, '#2a2f3b', '#1f232c'); lpOval(c, x, 20, 6, 6, 6, '#8f949e'); });
  poly(c, [-56, 4, 56, 4, 56, 10, -56, 10], '#3a404d');
  poly(c, [-58, -30, 46, -30, 50, -26, 50, 4, -58, 4], '#e9e3d4');
  poly(c, [10, -30, 46, -30, 50, -26, 50, 4, 10, 4], '#d6cfbe');
  for (let x = -52; x < 34; x += 14) { c.fillStyle = '#4a6a8a'; c.fillRect(x, -24, 11, 11); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x, -24, 4, 11); }
  poly(c, [-58, -6, 50, -6, 50, -3, -58, -3], '#2f6db3');
  c.strokeStyle = '#3a404d'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(50, -18); c.lineTo(60, -18); c.moveTo(56, -18); c.lineTo(56, 4); c.moveTo(60, -18); c.lineTo(60, 4); c.stroke();
  poly(c, [-60, -30, 48, -30, 44, -34, -56, -34], '#f4f7fb');
  circ(c, -56, -2, 2.5, '#ffe28a');
}

/* ===== 6-10 Midnight Sun (Longyearbyen, Svalbard) ===== */
function bgMidnight(c) {
  lpSky(c, 0, 212, ['#46599a', '#8378b2', '#d99bb6', '#ffbf98', '#ffe0a4']);
  [[60, 60, 1.4], [300, 90, 1.1], [150, 40, 0.8]].forEach(([x, y, s]) => { poly(c, [x - 40 * s, y, x - 10 * s, y - 6 * s, x + 40 * s, y - 2 * s, x + 50 * s, y + 3 * s], 'rgba(255,190,200,.4)'); });
  glow(c, 250, 150, 60, '255,230,170'); circ(c, 250, 150, 15, '#fff4cf');
  [[-30, 140, 166, 162], [110, 250, 172, 168], [220, 400, 160, 158]].forEach(([x1, x2, ty, ty2], i) => {
    poly(c, [x1, 212, x1 + 34, ty, x2 - 34, ty2, x2, 212], i === 1 ? '#8c6f7c' : '#7d6476');
    poly(c, [x2 - 34, ty2, x2, 212, x2 - 46, 212], '#654f63');
    for (let k = 0; k < 4; k++) { const x = x1 + 40 + k * (x2 - x1 - 80) / 3; poly(c, [x - 5, ty + 6, x + 5, ty + 6, x + 1, 210], 'rgba(245,235,240,.75)'); }
    c.strokeStyle = 'rgba(60,40,60,.25)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x1 + 20, 186); c.lineTo(x2 - 20, 186); c.moveTo(x1 + 10, 198); c.lineTo(x2 - 10, 198); c.stroke();
    poly(c, [x1 + 34, ty, x2 - 34, ty2, x2 - 40, ty2 + 4, x1 + 38, ty + 4], '#f2e6ec');
  });
  lpField(c, 210, 292, 36, 16, ['#7083ba', '#8091c4', '#9a90c2', '#7a88bf', '#b3a3c9', '#8a96c8'], 111, 0.3);
  for (let i = 0; i < 9; i++) { const y = 216 + i * 9, w = 6 + i * 3; poly(c, [250 - w, y, 250 + w, y, 250, y + 4], `rgba(255,225,160,${0.55 - i * 0.04})`); }
  lpField(c, 288, 480, 44, 28, ['#9a9f86', '#8a8f78', '#b0b39a', '#a3a28b', '#7f8570', '#c4bfa6'], 112, 0.45);
  [[40, 300, 50, 10], [330, 470, 60, 12], [200, 330, 40, 8], [300, 430, 34, 8], [130, 470, 44, 8]].forEach(([x, y, rx, ry], i) => lpOval(c, x, y, rx, ry, 7, '#eef0f5', '#d9dde8', i));
  poly(c, [0, 292, 120, 286, 200, 296, 360, 290, 360, 300, 0, 302], '#6f6a5f');
  // old coal-mine cableway trestles on the slope
  [[24, 206, 26], [98, 210, 22]].forEach(([x, y, h]) => { c.strokeStyle = '#4a3a34'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x - 5, y); c.lineTo(x, y - h); c.lineTo(x + 5, y); c.moveTo(x - 3, y - h * 0.5); c.lineTo(x + 3, y - h * 0.5); c.moveTo(x - 6, y - h); c.lineTo(x + 6, y - h); c.stroke(); });
  c.strokeStyle = 'rgba(74,58,52,.6)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(18, 180); c.lineTo(104, 188); c.stroke();
  // the sundial's stone pillar
  poly(c, [213, 460, 233, 460, 235, 478, 211, 478], '#8f8a80'); poly(c, [223, 460, 233, 460, 235, 478, 225, 478], '#77736a'); poly(c, [207, 457, 239, 457, 237, 461, 209, 461], '#a39d92');
  // purple saxifrage and Svalbard poppies
  [[300, 455, '#b05fb8'], [318, 462, '#f2e27a'], [335, 450, '#b05fb8'], [26, 470, '#f2e27a'], [190, 470, '#b05fb8'], [276, 470, '#f2e27a'], [172, 330, '#f2e27a']].forEach(([x, y, col]) => { c.fillStyle = '#5c7a4a'; c.fillRect(x - 0.5, y, 1, 5); for (let k = 0; k < 5; k++) circ(c, x + Math.cos(k * 1.257) * 2.2, y + Math.sin(k * 1.257) * 2.2, 1.6, col); circ(c, x, y, 1, '#fff3c0'); });
}
function makeHouse(wall, shade, roof, buntDir) {
  return (c) => {
    c.fillStyle = '#4a3f38'; [-24, 0, 24].forEach((x) => c.fillRect(x - 2, 30, 4, 8));
    poly(c, [-30, -6, 0, -30, 30, -6, 30, 32, -30, 32], wall); poly(c, [10, -14, 30, -6, 30, 32, 10, 32], shade);
    c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 1; c.beginPath(); for (let y = 0; y < 32; y += 5) { c.moveTo(-30, y); c.lineTo(30, y); } c.stroke();
    poly(c, [-36, -4, 0, -34, 36, -4, 32, -2, 0, -28, -32, -2], roof);
    [[-20, 4], [6, 4]].forEach(([x, y]) => { c.fillStyle = '#f6f2ea'; c.fillRect(x - 1, y - 1, 16, 14); c.fillStyle = '#ffd99a'; c.fillRect(x + 1, y + 1, 12, 10); c.fillStyle = '#f6f2ea'; c.fillRect(x + 6, y + 1, 2, 10); });
    poly(c, [-6, 18, 4, 18, 4, 32, -6, 32], '#f6f2ea'); poly(c, [-4, 20, 2, 20, 2, 32, -4, 32], shade);
    c.strokeStyle = '#3a3f4f'; c.lineWidth = 0.8; c.beginPath();
    const x0 = 0, y0 = -34, x1 = 44 * buntDir, y1 = buntDir > 0 ? -29 : -24;
    c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2, y1 + 4, x1, y1); c.stroke();
    const cols = ['#e2533f', '#f2c14e', '#3d79c4', '#3c9d6a'];
    for (let k = 1; k < 6; k++) { const t = k / 6, x = x0 + (x1 - x0) * t, y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * (y1 + 4) + t * t * y1; poly(c, [x - 2.5, y, x + 2.5, y, x, y + 5], cols[(k + (buntDir > 0 ? 0 : 2)) % 4]); }
  };
}
const drawRedHouse = makeHouse('#c0392b', '#a03024', '#3a3f4f', 1);
const drawGreenHouse = makeHouse('#3c8f6a', '#2f7556', '#3a3f4f', -1);
function drawSvalSign(c) {
  ell(c, 0, 42, 12, 2.5, 'rgba(60,50,40,.25)');
  c.fillStyle = '#8f949e'; c.fillRect(-2.5, 2, 5, 40);
  poly(c, [0, -42, 30, 8, -30, 8], '#d63a2f'); poly(c, [0, -32, 22, 4, -22, 4], '#f8f9fb');
  poly(c, [-13, -2, -12, -8, -6, -12, 4, -12, 8, -16, 12, -14, 13, -10, 10, -8, 10, -2, 7, -2, 6, -6, -4, -6, -6, -2, -9, -2, -9, -5], '#1e2433');
  poly(c, [-26, 12, 26, 12, 26, 30, -26, 30], '#f8f9fb'); c.strokeStyle = '#1e2433'; c.lineWidth = 1; c.strokeRect(-25, 13, 50, 16);
  txt(c, LOCAL('GJELDER HELE'), 0, 18.5, '800 6.5px "Noto Sans TC", sans-serif', '#1e2433');
  txt(c, LOCAL('SVALBARD'), 0, 25, '800 6.5px "Noto Sans TC", sans-serif', '#1e2433');
}
function drawSvalPost(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-3, -54, 6, 106); poly(c, [0, -54, 3, -54, 3, 52, 0, 52], '#553a20');
  const rows = [[T('北極點', 'NORTH POLE') + ' 1310 km', 1, '#f4efe6'], [T('特羅姆瑟', 'TROMSØ') + ' 960 km', -1, '#f2c14e'], [T('奧斯陸', 'OSLO') + ' 2040 km', 1, '#f4efe6'], [T('台北', 'TAIPEI') + ' 7640 km', -1, '#f2c14e']];
  rows.forEach(([s, dir, col], i) => {
    const y = -50 + i * 17, x0 = dir > 0 ? -40 : -46, x1 = dir > 0 ? 46 : 40;
    const pts = dir > 0 ? [x0, y, x1 - 7, y, x1, y + 6.5, x1 - 7, y + 13, x0, y + 13] : [x0, y + 6.5, x0 + 7, y, x1, y, x1, y + 13, x0 + 7, y + 13];
    poly(c, pts, col); poly(c, [x0 + (dir > 0 ? 0 : 7), y + 10, x1 - (dir > 0 ? 7 : 0), y + 10, x1 - (dir > 0 ? 3 : 0), y + 11.5, x0 + (dir > 0 ? 0 : 3), y + 11.5], 'rgba(0,0,0,.1)');
    fitTxt(c, s, (x0 + x1) / 2 + (dir > 0 ? -3 : 3), y + 7, 74, 8, 800, '#3a2a1c');
  });
  ell(c, 0, 52, 14, 2.5, 'rgba(60,50,40,.25)');
}
function drawArmillary(c) {
  c.strokeStyle = '#a87a3a'; c.lineWidth = 2; c.beginPath(); c.arc(0, -2, 20, 0, Math.PI * 2); c.stroke();
  c.strokeStyle = '#c9974a'; c.lineWidth = 2.6; c.beginPath(); c.ellipse(0, -2, 20, 6, 0, 0, Math.PI); c.stroke();
  c.strokeStyle = 'rgba(168,122,58,.55)'; c.lineWidth = 2; c.beginPath(); c.ellipse(0, -2, 20, 6, 0, Math.PI, Math.PI * 2); c.stroke();
  c.strokeStyle = '#5a3d23'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(0, -30); c.lineTo(0, 24); c.stroke();
  poly(c, [0, -34, 4, -27, -4, -27], '#5a3d23');
  poly(c, [-6, 22, 6, 22, 8, 34, -8, 34], '#8a6a3a');
}

defineChapter({
  key: 'polar', order: 6,
  name: { zh: "極地冰原", en: "Polar Plains" },
  blurb: { zh: "極光下的冰雪世界，連企鵝都在等你。", en: "An icy world under the aurora. Even the penguins are waiting." },
  style: { zh: "低多邊形", en: "Low poly" },
  narrator: { zh: "企鵝", en: "Penguin" },
  song: 'polar',
    comments: {
      far: [{ zh: ["凍歪了…", "冰屋快倒了，企鵝只好去跟雪人擠一擠。"], en: ["Frozen crooked…", "The igloo's about to fall. Penguin bunks with Snowman."] }, { zh: ["暴風雪來了", "路標指向四面八方，大家都迷路了。"], en: ["Blizzard!", "Signs point everywhere. Everyone's lost."] }],
      close: [{ zh: ["差一片雪花", "只差一點點，極光已經在天上等你了。"], en: ["One snowflake off", "So close! The aurora is waiting up there."] }, { zh: ["快到了嘎！", "企鵝搖搖擺擺地說：再一下下！"], en: ["Almost, honk!", "Penguin waddles: just a little more!"] }],
      pass: [{ zh: ["安全抵達！", "過關了，但雪人的帽子好像還歪歪的。"], en: ["Safe arrival!", "Cleared, but Snowman's hat still looks tilted."] }, { zh: ["及格冰塊", "企鵝拍拍翅膀：勉強算你過嘎～"], en: ["Ice-cold pass", "Penguin flaps: okay, you pass, honk~"] }],
      good: [{ zh: ["冰原好整齊！", "雪橇、冰屋、路標排排站，連極光都看呆了。"], en: ["Neat tundra!", "Sled, igloo, sign in a row. Even the aurora stares."] }, { zh: ["北極好鄰居", "企鵝決定今晚請你吃魚。"], en: ["Arctic neighbor", "Penguin will treat you to fish tonight."] }],
      perfect: [{ zh: ["完美極光♪", "一度都不差！極光為你跳了一整晚的舞。"], en: ["Perfect aurora♪", "Not one degree off! The aurora dances all night."] }, { zh: ["北極點認證", "路標說：這裡是全世界最正的地方。"], en: ["Pole-certified", "The sign says: straightest place on Earth."] }],
    },
  stages: [
    { key: 'polar', title: { zh: "極光夜", en: "Aurora Night" }, place: { zh: "南極洲 南極點附近", en: "Near the South Pole, Antarctica" },
      intro: { zh: "風很大，旗子一直飄。企鵝在等你把牠轉正。", en: "It is windy, so the flag keeps flapping. Penguin is waiting to be straightened." },
      bg: bgPolar, animated: true,
      objects: [
      { id: 'flag', name: { zh: '旗子', en: 'Flag' }, x: 70, y: 245, w: 60, h: 110, mag: 8, draw: drawFlag, sfx: 'boing' },
      { id: 'sign', name: { zh: '路標', en: 'Signpost' }, x: 230, y: 235, w: 120, h: 90, near: true, draw: drawPolarSign, sfx: 'wood' },
      { id: 'igloo', name: { zh: '冰屋', en: 'Igloo' }, x: 90, y: 385, w: 120, h: 70, mag: 7, draw: drawIgloo, sfx: 'pop' },
      { id: 'penguin', name: { zh: '企鵝', en: 'Penguin' }, x: 178, y: 372, w: 46, h: 64, mag: 13, draw: drawPenguin, habit: (t, l) => ({ dx: Math.sin(t * 4) * 3 * l, dy: -Math.abs(Math.sin(t * 4)) * 2 * l }), call: 'honk' },
      { id: 'snowman', name: { zh: '雪人', en: 'Snowman' }, x: 285, y: 370, w: 70, h: 110, mag: 10, draw: drawSnowman, sfx: 'boing' },
      { id: 'sled', name: { zh: '雪橇', en: 'Sled' }, x: 245, y: 456, w: 120, h: 40, mag: 9, draw: drawSled, sfx: 'jingle' }
      ] },
    { key: 'polar-igloo', title: { zh: '冰屋村', en: 'Igloo Village' }, place: { zh: '加拿大 努納武特', en: 'Nunavut, Canada' },
      intro: { zh: '因紐特人用雪磚蓋冰屋。北極狐跑來湊熱鬧。', en: 'Inuit hunters build igloos from blocks of snow. An arctic fox drops by to watch.' },
      bg: bgIgloo, animated: true,
      objects: [
      { id: 'igloo', name: { zh: '冰屋', en: 'Igloo' }, x: 112, y: 318, w: 140, h: 88, mag: 8, draw: drawBigIgloo, sfx: 'pop' },
      { id: 'inuksuk', name: { zh: '石堆人', en: 'Inuksuk' }, x: 282, y: 262, w: 70, h: 100, near: true, draw: drawInuksuk, sfx: 'clunk' },
      { id: 'fox', name: { zh: '北極狐', en: 'Arctic Fox' }, x: 262, y: 400, w: 70, h: 62, mag: 13, draw: drawFoxWinter, habit: (t, l) => ({ dx: 0, dy: -Math.max(0, Math.sin(t * 3.2)) * 4 * l }), call: 'polar_fox' },
      { id: 'snowmobile', name: { zh: '雪地摩托', en: 'Snowmobile' }, x: 100, y: 430, w: 120, h: 52, mag: 10, draw: drawSnowmobile, sfx: 'beep' },
      ] },
    { key: 'polar-sled', title: { zh: '雪橇隊', en: 'Sled Team' }, place: { zh: '美國 阿拉斯加', en: 'Alaska, USA' },
      intro: { zh: '哈士奇最愛跑了。大家站好，就出發去諾姆！', en: 'Huskies live to run. Line everyone up, then it is off to Nome!' },
      bg: bgSled, animated: true,
      objects: [
      { id: 'sign', name: { zh: '步道路牌', en: 'Trail Sign' }, x: 92, y: 246, w: 110, h: 80, near: true, draw: drawTrailSign, sfx: 'wood' },
      { id: 'lantern', name: { zh: '路燈', en: 'Trail Lamp' }, x: 268, y: 236, w: 52, h: 110, mag: 9, draw: drawTrailLantern, sfx: 'bell' },
      { id: 'lead', name: { zh: '領頭犬', en: 'Lead Dog' }, x: 82, y: 366, w: 90, h: 70, mag: 14, draw: drawHusky, habit: (t, l) => ({ dx: 0, dy: -Math.abs(Math.sin(t * 5)) * 2 * l }), call: 'polar_husky' },
      { id: 'wheel', name: { zh: '哈士奇', en: 'Husky' }, x: 186, y: 366, w: 90, h: 70, mag: 6, draw: drawHusky, habit: (t, l) => ({ dx: 0, dy: -Math.abs(Math.sin(t * 5 + 1)) * 2 * l }), call: 'polar_husky' },
      { id: 'sled', name: { zh: '雪橇', en: 'Dog Sled' }, x: 290, y: 362, w: 110, h: 70, mag: 11, draw: drawMushSled, sfx: 'jingle' },
      ] },
    { key: 'polar-iceberg', title: { zh: '冰山漂流', en: 'Drifting Iceberg' }, place: { zh: '南極半島', en: 'Antarctic Peninsula' },
      intro: { zh: '平頂的冰山在南極外海慢慢漂。企鵝搭便船，海豹在浮冰上睡午覺。', en: 'Flat-topped icebergs drift off Antarctica. A penguin hitches a ride and a seal naps on a floe.' },
      bg: bgBerg, animated: true,
      objects: [
      { id: 'iceberg', name: { zh: '冰山', en: 'Iceberg' }, x: 120, y: 280, w: 180, h: 112, mag: 6, draw: drawIceberg, sfx: 'polar_ice' },
      { id: 'penguin', name: { zh: '阿德利企鵝', en: 'Adélie Penguin' }, x: 146, y: 197, w: 40, h: 58, mag: 13, draw: drawAdelie, habit: (t, l) => ({ dx: Math.sin(t * 3) * 3 * l, dy: -Math.abs(Math.sin(t * 6)) * 1.5 * l }), call: 'polar_adelie' },
      { id: 'floe', name: { zh: '浮冰', en: 'Ice Floe' }, x: 275, y: 374, w: 130, h: 40, mag: 9, draw: drawFloe, link: { to: 'seal', k: 0.7 }, sfx: 'pop' },
      { id: 'seal', name: { zh: '海豹', en: 'Seal' }, x: 275, y: 334, w: 104, h: 40, mag: 11, draw: drawSeal, habit: (t, l) => ({ dx: 0, dy: Math.sin(t * 1.4) * 1.2 * l }), call: 'polar_seal' },
      { id: 'zodiac', name: { zh: '橡皮艇', en: 'Inflatable Boat' }, x: 96, y: 436, w: 124, h: 56, near: true, draw: drawZodiac, sfx: 'boing' },
      ] },
    { key: 'polar-parade', title: { zh: '企鵝列隊', en: 'Penguin Parade' }, place: { zh: '南極 阿特卡灣', en: 'Atka Bay, Antarctica' },
      intro: { zh: '皇帝企鵝排成一列，搖搖擺擺走向海邊。爸爸身邊跟著小企鵝。', en: 'Emperor penguins waddle to the sea in single file. A fluffy chick tags along beside Dad.' },
      bg: bgParade, animated: true,
      objects: [
      { id: 'lead', name: { zh: '領隊企鵝', en: 'Lead Penguin' }, x: 72, y: 330, w: 50, h: 92, mag: 9, draw: drawEmperor, habit: (t, l) => ({ dx: Math.sin(t * 2) * 2 * l, dy: 0 }), call: 'polar_emperor' },
      { id: 'emperor', name: { zh: '皇帝企鵝', en: 'Emperor Penguin' }, x: 156, y: 330, w: 50, h: 92, mag: 6, draw: drawEmperor, habit: (t, l) => ({ dx: Math.sin(t * 2 + 1) * 2 * l, dy: 0 }), call: 'polar_emperor' },
      { id: 'dad', name: { zh: '企鵝爸爸', en: 'Penguin Dad' }, x: 240, y: 330, w: 50, h: 92, mag: 12, draw: drawEmperor, link: { to: 'chick', k: 0.6 }, habit: (t, l) => ({ dx: Math.sin(t * 2 + 2) * 2 * l, dy: 0 }), call: 'polar_emperor' },
      { id: 'chick', name: { zh: '企鵝寶寶', en: 'Penguin Chick' }, x: 304, y: 352, w: 38, h: 48, mag: 14, draw: drawEmpChick, call: 'polar_chick' },
      { id: 'flag', name: { zh: '路線旗', en: 'Route Flag' }, x: 300, y: 228, w: 64, h: 100, mag: 8, draw: drawRouteFlag, sfx: 'boing' },
      { id: 'camera', name: { zh: '攝影機', en: 'Camera' }, x: 84, y: 432, w: 70, h: 76, near: true, draw: drawCamera, sfx: 'beep' },
      ] },
    { key: 'polar-cave', title: { zh: '冰河洞穴', en: 'Glacier Cave' }, place: { zh: '冰島 瓦特納冰川', en: 'Vatnajökull, Iceland' },
      intro: { zh: '夏天的融水在冰河裡沖出洞穴，冬天走進去，整片藍得發光。', en: 'Summer meltwater carves caves into the glacier. In winter you can walk in, and the ice glows blue.' },
      bg: bgCave, animated: true,
      objects: [
      { id: 'lampL', name: { zh: '左邊燈籠', en: 'Left Lantern' }, x: 90, y: 122, w: 42, h: 66, mag: 9, draw: drawHangLantern, link: { to: 'lampR', k: 0.6 }, sfx: 'bell' },
      { id: 'lampR', name: { zh: '右邊燈籠', en: 'Right Lantern' }, x: 270, y: 122, w: 42, h: 66, mag: 6, draw: drawHangLantern, sfx: 'bell' },
      { id: 'ptarmigan', name: { zh: '雷鳥', en: 'Ptarmigan' }, x: 52, y: 288, w: 50, h: 40, mag: 13, draw: drawPtarmigan, habit: (t, l) => ({ dx: Math.sin(t * 1.5) * 2 * l, dy: 0 }), call: 'polar_ptarmigan' },
      { id: 'sign', name: { zh: '警告牌', en: 'Warning Sign' }, x: 274, y: 318, w: 100, h: 74, near: true, draw: drawDangerSign, sfx: 'wood' },
      { id: 'fox', name: { zh: '北極狐', en: 'Arctic Fox' }, x: 92, y: 392, w: 70, h: 62, mag: 11, draw: drawFoxWinter, habit: (t, l) => ({ dx: 0, dy: -Math.max(0, Math.sin(t * 3)) * 4 * l }), call: 'polar_fox' },
      { id: 'helmet', name: { zh: '頭盔', en: 'Helmet' }, x: 250, y: 432, w: 56, h: 40, near: true, draw: drawHelmet, sfx: 'pop' },
      ] },
    { key: 'polar-fishing', title: { zh: '冰釣小屋', en: 'Ice-Fishing Hut' }, place: { zh: '芬蘭 伊納里湖', en: 'Lake Inari, Finland' },
      intro: { zh: '湖面結了厚厚的冰，鑿個洞就能釣魚。馴鹿也走過來看熱鬧。', en: 'The lake freezes thick enough to fish through a hole. A reindeer wanders over to watch.' },
      bg: bgFish, animated: true,
      objects: [
      { id: 'hut', name: { zh: '冰釣小屋', en: 'Fishing Hut' }, x: 96, y: 250, w: 130, h: 120, mag: 6, draw: drawFishHut, sfx: 'wood' },
      { id: 'reindeer', name: { zh: '馴鹿', en: 'Reindeer' }, x: 284, y: 252, w: 90, h: 100, mag: 11, draw: drawReindeer, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 2 * l, dy: 0 }), call: 'polar_reindeer' },
      { id: 'rod', name: { zh: '釣竿', en: 'Fishing Rod' }, x: 192, y: 340, w: 100, h: 50, mag: 8, draw: drawIceRod, link: { to: 'fish', k: 0.6 }, sfx: 'boing' },
      { id: 'fish', name: { zh: '紅點鮭', en: 'Arctic Char' }, x: 232, y: 391, w: 34, h: 54, mag: 13, draw: drawFish, call: 'polar_fish' },
      { id: 'kicksled', name: { zh: '踢雪橇', en: 'Kicksled' }, x: 306, y: 388, w: 80, h: 80, mag: 9, draw: drawKickSled, sfx: 'jingle' },
      { id: 'bucket', name: { zh: '魚桶', en: 'Fish Bucket' }, x: 82, y: 412, w: 44, h: 50, near: true, draw: drawBucket, sfx: 'clunk' },
      { id: 'lamp', name: { zh: '油燈', en: 'Storm Lantern' }, x: 146, y: 430, w: 34, h: 56, near: true, draw: drawStormLantern, sfx: 'bell' },
      ] },
    { key: 'polar-station', title: { zh: '研究站', en: 'Research Station' }, place: { zh: '南極 羅斯島', en: 'Ross Island, Antarctica' },
      intro: { zh: '後面冒煙的是活火山埃里伯斯。企鵝和海豹常來站裡串門子。', en: 'That smoking peak is Mount Erebus, an active volcano. Penguins and seals often drop by.' },
      bg: bgStation, animated: true,
      objects: [
      { id: 'module', name: { zh: '研究站', en: 'Station Module' }, x: 120, y: 250, w: 166, h: 92, mag: 6, draw: drawModule, link: { to: 'antenna', k: 0.6 }, sfx: 'clunk' },
      { id: 'antenna', name: { zh: '天線', en: 'Antenna' }, x: 70, y: 180, w: 40, h: 50, mag: 12, draw: drawAntenna, sfx: 'beep' },
      { id: 'dish', name: { zh: '衛星天線', en: 'Satellite Dish' }, x: 300, y: 192, w: 80, h: 90, mag: 9, draw: drawDish, sfx: 'twinkle' },
      { id: 'ramp', name: { zh: '坡道', en: 'Ramp' }, x: 251, y: 283, w: 110, h: 28, trap: true, keep: 14, trapNote: { zh: '坡道本來就是斜的，雪地車才開得上去', en: 'It is a ramp. It slopes on purpose so vehicles can drive up' }, draw: drawRamp },
      { id: 'signpost', name: { zh: '路標', en: 'Signpost' }, x: 70, y: 372, w: 104, h: 104, near: true, draw: drawPoleSign, sfx: 'wood' },
      { id: 'mast', name: { zh: '氣象桿', en: 'Weather Mast' }, x: 176, y: 384, w: 44, h: 116, near: true, draw: drawMast, sfx: 'shimmer' },
      { id: 'penguin', name: { zh: '阿德利企鵝', en: 'Adélie Penguin' }, x: 282, y: 382, w: 40, h: 58, mag: 14, draw: drawAdelie, habit: (t, l) => ({ dx: Math.sin(t * 3) * 3 * l, dy: -Math.abs(Math.sin(t * 6)) * 1.5 * l }), call: 'polar_adelie' },
      { id: 'seal', name: { zh: '威德爾海豹', en: 'Weddell Seal' }, x: 266, y: 448, w: 104, h: 40, mag: 7, draw: drawSeal, habit: (t, l) => ({ dx: 0, dy: Math.sin(t * 1.4) * 1.2 * l }), call: 'polar_seal' },
      ] },
    { key: 'polar-blizzard', title: { zh: '暴風雪', en: 'Blizzard' }, place: { zh: '加拿大 邱吉爾', en: 'Churchill, Canada' },
      intro: { zh: '邱吉爾號稱北極熊之都。暴風雪裡什麼都看不清，先把東西扶正吧。', en: 'Churchill calls itself the polar bear capital of the world. In a blizzard, straighten things up first.' },
      bg: bgBlizz, overlay: ovBlizz, animated: true,
      objects: [
      { id: 'poleL', name: { zh: '左電線桿', en: 'Left Pole' }, x: 50, y: 228, w: 60, h: 140, mag: 8, draw: drawPowerPole, link: { to: 'poleR', k: 0.5 }, sfx: 'clunk' },
      { id: 'poleR', name: { zh: '右電線桿', en: 'Right Pole' }, x: 310, y: 222, w: 60, h: 140, mag: 5, draw: drawPowerPole, sfx: 'clunk' },
      { id: 'cabin', name: { zh: '小木屋', en: 'Cabin' }, x: 180, y: 258, w: 124, h: 84, near: true, draw: drawCabin, sfx: 'wood' },
      { id: 'owl', name: { zh: '雪鴞', en: 'Snowy Owl' }, x: 292, y: 318, w: 46, h: 62, mag: 13, draw: drawOwl, habit: (t, l) => ({ dx: 0, dy: Math.sin(t * 2.2) * 1 * l }), call: 'polar_owl' },
      { id: 'sign', name: { zh: '警告牌', en: 'Alert Sign' }, x: 82, y: 340, w: 106, h: 80, near: true, draw: drawBearSign, sfx: 'bell' },
      { id: 'bear', name: { zh: '北極熊', en: 'Polar Bear' }, x: 236, y: 414, w: 124, h: 74, mag: 10, draw: drawPolarBear, habit: (t, l) => ({ dx: Math.sin(t * 1.5) * 3 * l, dy: 0 }), call: 'polar_bear' },
      { id: 'buggy', name: { zh: '苔原車', en: 'Tundra Bus' }, x: 74, y: 438, w: 124, h: 70, mag: 6, draw: drawBuggy, sfx: 'beep' },
      ] },
    { key: 'polar-midnight', title: { zh: '午夜太陽', en: 'Midnight Sun' }, place: { zh: '挪威 斯瓦巴 朗伊爾城', en: 'Longyearbyen, Svalbard' },
      intro: { zh: '斯瓦巴的夏天，太陽整晚都不下山，午夜也能看日晷。', en: 'In a Svalbard summer the sun never sets, so the sundial works even at midnight.' },
      bg: bgMidnight, animated: true,
      objects: [
      { id: 'floe', name: { zh: '浮冰', en: 'Ice Floe' }, x: 95, y: 274, w: 130, h: 38, mag: 7, draw: drawFloe, link: { to: 'walrus', k: 0.7 }, sfx: 'polar_ice' },
      { id: 'walrus', name: { zh: '海象', en: 'Walrus' }, x: 95, y: 222, w: 96, h: 64, mag: 12, draw: drawWalrus, habit: (t, l) => ({ dx: 0, dy: Math.sin(t * 1.6) * 1.5 * l }), call: 'polar_walrus' },
      { id: 'red', name: { zh: '紅房子', en: 'Red House' }, x: 219, y: 285, w: 88, h: 76, mag: 5, draw: drawRedHouse, link: { to: 'green', k: 0.5 }, sfx: 'wood' },
      { id: 'green', name: { zh: '綠房子', en: 'Green House' }, x: 307, y: 285, w: 88, h: 76, near: true, draw: drawGreenHouse, sfx: 'wood' },
      { id: 'signpost', name: { zh: '路標', en: 'Signpost' }, x: 58, y: 364, w: 96, h: 110, mag: 9, draw: drawSvalPost, sfx: 'bell' },
      { id: 'reindeer', name: { zh: '斯瓦巴馴鹿', en: 'Svalbard Reindeer' }, x: 162, y: 370, w: 90, h: 100, mag: 10, draw: drawSvalReindeer, habit: (t, l) => ({ dx: Math.sin(t * 0.9) * 2 * l, dy: 0 }), call: 'polar_reindeer' },
      { id: 'warn', name: { zh: '北極熊警告', en: 'Bear Warning' }, x: 300, y: 378, w: 66, h: 88, near: true, draw: drawSvalSign, sfx: 'twinkle' },
      { id: 'fox', name: { zh: '北極狐', en: 'Arctic Fox' }, x: 92, y: 446, w: 70, h: 60, mag: 14, draw: drawFoxSummer, habit: (t, l) => ({ dx: 0, dy: -Math.max(0, Math.sin(t * 3)) * 4 * l }), call: 'polar_fox' },
      { id: 'sundial', name: { zh: '日晷', en: 'Sundial' }, x: 230, y: 424, w: 46, h: 70, trap: true, keep: 12, trapNote: { zh: '日晷的指針要對準北極星，在北緯78度就是斜12度', en: 'A sundial rod points at the North Star, so at 78°N it leans 12°' }, draw: drawArmillary },
      ] },
  ],
});
