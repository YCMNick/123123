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
function ovReef(c) { c.globalAlpha = 0.05; c.drawImage(GRAIN, 0, 0, W, H); c.globalAlpha = 1; }
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
  ],
});
