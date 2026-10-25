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
  ],
});
