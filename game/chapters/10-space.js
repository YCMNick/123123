// 第 10 大關 夜空宇宙 / World 10: Night Sky (Synthwave space).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 10-1 Orbital station: synthwave space ===== */
function bgSpace(c) {
  const R = mulberry(33);
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#07081a'); g.addColorStop(0.6, '#1d0c3a'); g.addColorStop(1, '#0b1630');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 6; i++) {
    const x = R() * W, y = R() * 300, r = 50 + R() * 80;
    const rg = c.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(${R() < 0.5 ? '255,80,200' : '90,120,255'},.16)`); rg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = rg; c.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  for (let i = 0; i < 160; i++) { c.fillStyle = `rgba(255,255,255,${0.25 + R() * 0.75})`; const s = R() < 0.1 ? 2 : 1.1; c.fillRect(R() * W, R() * H, s, s); }
  const ex = 180, ey = 900, er = 520;
  const eg = c.createRadialGradient(ex, ey - 200, 100, ex, ey, er); eg.addColorStop(0, '#2f7dd6'); eg.addColorStop(0.85, '#1b4f9a'); eg.addColorStop(1, '#0c2a55');
  c.beginPath(); c.arc(ex, ey, er, 0, Math.PI * 2); c.fillStyle = eg; c.fill();
  c.save(); c.beginPath(); c.arc(ex, ey, er, 0, Math.PI * 2); c.clip();
  [[80, 400, 60, 18], [230, 395, 80, 22], [330, 420, 50, 16]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, 'rgba(90,170,110,.55)', 0.2));
  [[150, 392, 70, 6], [280, 410, 60, 5]].forEach(([x, y, rx, ry]) => ell(c, x, y, rx, ry, 'rgba(255,255,255,.35)', -0.1));
  c.restore();
  c.beginPath(); c.arc(ex, ey, er + 6, 0, Math.PI * 2); c.lineWidth = 10; c.strokeStyle = 'rgba(120,200,255,.35)'; c.stroke(); c.lineWidth = 3; c.strokeStyle = 'rgba(180,230,255,.7)'; c.stroke();
}
function drawModule(c) {
  const g = c.createLinearGradient(0, -20, 0, 20); g.addColorStop(0, '#e9edf5'); g.addColorStop(0.5, '#b9c2d3'); g.addColorStop(1, '#7d879b');
  rr(c, -60, -20, 120, 40, 8); c.fillStyle = g; c.fill();
  c.fillStyle = '#5a6378'; [-30, 0, 30].forEach((x) => c.fillRect(x - 1, -20, 2, 40));
  [-44, -14, 16, 46].forEach((x) => { circ(c, x, -2, 5, '#20294a'); circ(c, x - 1.5, -3.5, 1.6, '#7fb8ff'); });
  c.fillStyle = '#d6453a'; c.fillRect(-60, -6, 6, 12);
  rr(c, 58, -12, 8, 24, 3); c.fillStyle = '#8a93a6'; c.fill();
  txt(c, 'TW-01', -2, 12, '700 7px "JetBrains Mono", monospace', '#20294a');
}
function drawPanel(c) {
  c.fillStyle = '#9aa3b5'; c.fillRect(-35, -2, 70, 4);
  rr(c, -33, -18, 66, 36, 2); c.fillStyle = '#1f3a8a'; c.fill();
  c.strokeStyle = 'rgba(160,200,255,.6)'; c.lineWidth = 1;
  for (let x = -33; x <= 33; x += 11) { c.beginPath(); c.moveTo(x, -18); c.lineTo(x, 18); c.stroke(); }
  for (let y = -18; y <= 18; y += 9) { c.beginPath(); c.moveTo(-33, y); c.lineTo(33, y); c.stroke(); }
  poly(c, [-33, -18, -10, -18, -33, 4], 'rgba(255,255,255,.18)');
}
function drawAstro(c, a) {
  const wv = Math.sin(a.t * 4) * 0.7 * a.live;
  rr(c, -24, -2, 10, 30, 5); c.fillStyle = '#b9c2d3'; c.fill();
  ell(c, 0, 14, 16, 20, '#f4f6fb');
  rr(c, -12, 4, 24, 16, 4); c.fillStyle = '#c9ced8'; c.fill();
  c.fillStyle = '#d6453a'; c.fillRect(-6, 8, 4, 4); c.fillStyle = '#5ee7ff'; c.fillRect(2, 8, 4, 4);
  c.save(); c.translate(14, 4); c.rotate(-1.2 + wv); rr(c, -4, 0, 8, 22, 4); c.fillStyle = '#f4f6fb'; c.fill(); circ(c, 0, 23, 5, '#e9edf5'); c.restore();
  c.save(); c.translate(-14, 6); c.rotate(0.3); rr(c, -4, 0, 8, 20, 4); c.fillStyle = '#f4f6fb'; c.fill(); c.restore();
  rr(c, -12, 30, 10, 10, 4); c.fillStyle = '#e9edf5'; c.fill(); rr(c, 2, 30, 10, 10, 4); c.fill();
  circ(c, 0, -16, 16, '#f4f6fb'); ell(c, 2, -16, 11, 9, '#20294a'); ell(c, -1, -19, 4, 2.5, 'rgba(127,184,255,.8)', -0.4);
}
function drawRocket(c, a) {
  const f = 0.7 + Math.sin(a.t * 30) * 0.15 + Math.sin(a.t * 17) * 0.1;
  poly(c, [-8, 44, 0, 44 + 22 * f, 8, 44], '#ffb03a'); poly(c, [-4, 44, 0, 44 + 12 * f, 4, 44], '#fff2b0');
  poly(c, [-14, 20, -24, 46, -12, 42], '#d6453a'); poly(c, [14, 20, 24, 46, 12, 42], '#d6453a');
  const g = c.createLinearGradient(-14, 0, 14, 0); g.addColorStop(0, '#b9c2d3'); g.addColorStop(0.5, '#f4f6fb'); g.addColorStop(1, '#8a93a6');
  c.beginPath(); c.moveTo(0, -58); c.quadraticCurveTo(16, -30, 14, 44); c.lineTo(-14, 44); c.quadraticCurveTo(-16, -30, 0, -58); c.closePath(); c.fillStyle = g; c.fill();
  circ(c, 0, -14, 7, '#20294a'); circ(c, -2, -16, 2.2, '#7fb8ff');
  c.fillStyle = '#d6453a'; c.fillRect(-14, 24, 28, 5);
  txt(c, 'TW', 0, 8, '800 9px "JetBrains Mono", monospace', '#20294a');
}
function drawSat(c) {
  c.fillStyle = '#c9ced8'; c.fillRect(-4, 0, 8, 26); rr(c, -16, 24, 32, 8, 2); c.fillStyle = '#8a93a6'; c.fill();
  c.beginPath(); c.ellipse(0, -6, 36, 14, 0, 0, Math.PI); c.closePath(); c.fillStyle = '#e9edf5'; c.fill();
  ell(c, 0, -6, 36, 6, '#b9c2d3');
  c.strokeStyle = '#8a93a6'; c.lineWidth = 2; c.beginPath(); c.moveTo(-24, -4); c.lineTo(0, -30); c.lineTo(24, -4); c.stroke();
  circ(c, 0, -31, 3, '#ff5ec4');
}
function drawScope(c) {
  const g = c.createLinearGradient(0, -14, 0, 14); g.addColorStop(0, '#f4f6fb'); g.addColorStop(1, '#9aa3b5');
  rr(c, -40, -14, 70, 28, 4); c.fillStyle = g; c.fill();
  c.fillStyle = '#c9a54a'; c.fillRect(-40, -14, 16, 28);
  c.beginPath(); c.moveTo(30, -14); c.lineTo(44, -18); c.lineTo(44, 18); c.lineTo(30, 14); c.closePath(); c.fillStyle = '#5a6378'; c.fill();
  c.fillStyle = '#1f3a8a'; c.fillRect(-10, -23, 30, 7); c.fillRect(-10, 16, 30, 7);
}
function drawPatch(c) {
  rr(c, -60, -23, 120, 46, 23); c.fillStyle = '#20294a'; c.fill(); c.lineWidth = 3; c.strokeStyle = '#ffd166'; c.stroke();
  txt(c, 'ORBIT 408 KM', 8, -5, '800 12px "JetBrains Mono", monospace', '#ffd166');
  txt(c, T('地球宇宙 · 第 10 大關', 'EARTH UNIVERSE · WORLD 10'), 8, 10, '500 9px "Noto Sans TC", sans-serif', '#c9ced8');
  circ(c, -42, 0, 10, '#2f7dd6'); ell(c, -44, -2, 4, 3, '#5aa56e');
}

defineChapter({
  key: 'space', order: 10,
  name: { zh: "夜空宇宙", en: "Night Sky" },
  blurb: { zh: "離開地球前的最後一站：無重力也要對齊。", en: "One last stop before leaving Earth: align in zero gravity." },
  style: { zh: "太空合成", en: "Synthwave space" },
  narrator: { zh: "太空人", en: "Astronaut" },
  song: 'space',
    comments: {
      far: [{ zh: ["休士頓，有問題…", "太空站轉來轉去，太空人頭好暈。"], en: ["Houston, problem…", "The station keeps spinning. The astronaut's dizzy."] }, { zh: ["無重力失控", "火箭指向月球以外的地方了。"], en: ["Zero-G chaos", "The rocket is pointing past the Moon."] }],
      close: [{ zh: ["倒數 1…", "只差一點點，對接就要成功了！"], en: ["T-minus 1…", "So close! Docking is about to succeed!"] }, { zh: ["訊號微弱", "太陽能板再轉一下，電就充飽了。"], en: ["Weak signal", "Turn the solar panel a bit more to charge up."] }],
      pass: [{ zh: ["對接成功！", "勉強完成任務，但望遠鏡拍到的星星有點斜。"], en: ["Docked!", "Mission done, but the telescope's stars look tilted."] }, { zh: ["及格任務", "太空人比了個讚（戴著手套看不太出來）。"], en: ["Mission passed", "Thumbs up from the astronaut (hard to see in gloves)."] }],
      good: [{ zh: ["軌道漂亮！", "整座太空站整齊得從地球都看得到。"], en: ["Lovely orbit!", "The station is so tidy you can see it from Earth."] }, { zh: ["優秀組員", "任務徽章閃閃發亮。"], en: ["Top crew", "The mission patch is sparkling."] }],
      perfect: [{ zh: ["宇宙級完美♪", "一度都不差！地球上的人都抬頭為你鼓掌。"], en: ["Cosmic perfect♪", "Not one degree off! All of Earth looks up and claps."] }, { zh: ["傳奇太空人", "你是第一個在無重力下對齊所有東西的人。"], en: ["Space legend", "The first to align everything in zero gravity."] }],
    },
  stages: [
    { key: 'space', title: { zh: "軌道站", en: "Orbital Station" }, place: { zh: "地球軌道 408 km", en: "408 km in orbit" },
      intro: { zh: "最後一站：八件東西、左右太陽能板連動，太空人一直飄。", en: "Last stop: eight objects, linked solar panels, and a floating astronaut." },
      bg: bgSpace, animated: true,
      objects: [
      { id: 'panelL', name: { zh: '左太陽能板', en: 'Left solar panel' }, x: 65, y: 110, w: 70, h: 40, mag: 9, link: { to: 'panelR', k: 0.6 }, draw: drawPanel, sfx: 'twinkle' },
      { id: 'module', name: { zh: '太空站艙段', en: 'Station module' }, x: 180, y: 110, w: 130, h: 50, mag: 6, draw: drawModule, sfx: 'beep' },
      { id: 'panelR', name: { zh: '右太陽能板', en: 'Right solar panel' }, x: 295, y: 110, w: 70, h: 40, mag: 7, draw: drawPanel, sfx: 'twinkle' },
      { id: 'astro', name: { zh: '太空人', en: 'Astronaut' }, x: 180, y: 215, w: 60, h: 80, mag: 14, draw: drawAstro, habit: (t, l) => ({ dx: Math.sin(t * 0.7) * 4 * l, dy: Math.sin(t * 1.2) * 5 * l }), call: 'radio' },
      { id: 'rocket', name: { zh: '火箭', en: 'Rocket' }, x: 60, y: 285, w: 50, h: 120, mag: 10, draw: drawRocket, sfx: 'boing' },
      { id: 'sat', name: { zh: '衛星天線', en: 'Satellite dish' }, x: 300, y: 265, w: 80, h: 70, mag: 12, draw: drawSat, sfx: 'beep' },
      { id: 'scope', name: { zh: '太空望遠鏡', en: 'Space telescope' }, x: 235, y: 335, w: 90, h: 46, mag: 8, draw: drawScope, sfx: 'twinkle' },
      { id: 'patch', name: { zh: '任務徽章', en: 'Mission patch' }, x: 130, y: 420, w: 120, h: 46, near: true, draw: drawPatch, sfx: 'bell' }
      ] },
  ],
});
