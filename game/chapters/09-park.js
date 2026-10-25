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
  rr(c, -60, -25, 120, 50, 8); c.fillStyle = 'rgba(20,8,30,.85)'; c.fill();
  neon(c, () => rr(c, -56, -21, 112, 42, 6), '#ff5ec4', 2.5);
  const fl = Math.sin(a.t * 23) > 0.92 || Math.sin(a.t * 3.1) > 0.97 ? 0.25 : 1;
  c.save(); c.globalAlpha = fl; neonText(c, 'OPEN', -14, 0, '800 22px "JetBrains Mono", monospace', '#ffd166'); c.restore();
  neonText(c, '24H', 34, 1, '700 13px "JetBrains Mono", monospace', '#5ee7ff');
}
function drawRides(c) {
  neon(c, () => { c.beginPath(); c.moveTo(-66, -14); c.lineTo(40, -14); c.lineTo(40, -24); c.lineTo(68, 0); c.lineTo(40, 24); c.lineTo(40, 14); c.lineTo(-66, 14); c.closePath(); }, '#5ee7ff', 2.5);
  neonText(c, 'RIDES', -10, 1, '800 18px "JetBrains Mono", monospace', '#5ee7ff');
}
function drawHorse(c, a) {
  neon(c, () => { c.beginPath(); c.moveTo(0, -60); c.lineTo(0, 60); }, '#ffd166', 2);
  const body = () => { c.beginPath(); c.moveTo(-26, 8); c.quadraticCurveTo(-28, -10, -10, -10); c.lineTo(14, -10); c.quadraticCurveTo(18, -30, 30, -32); c.lineTo(34, -24); c.quadraticCurveTo(26, -20, 24, -6); c.quadraticCurveTo(26, 10, 10, 12); c.lineTo(-14, 12); c.closePath(); };
  body(); c.fillStyle = 'rgba(255,94,196,.18)'; c.fill();
  neon(c, body, '#ff5ec4', 2.5);
  const lg = Math.sin(a.t * 4) * a.live * 0.4;
  [[-18, 12, -0.5 - lg], [-10, 12, 0.4 + lg], [12, 12, -0.3 - lg], [20, 10, 0.6 + lg]].forEach(([x, y, r]) => neon(c, () => { c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(r) * 18, y + Math.cos(r) * 18); }, '#ff5ec4', 2.2));
  neon(c, () => { c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-40, 4, -38, 22); }, '#c77dff', 2.5);
  neon(c, () => { c.beginPath(); c.moveTo(22, -28); c.quadraticCurveTo(12, -24, 10, -12); }, '#c77dff', 2.5);
  circ(c, 28, -27, 1.8, '#fff');
}
function drawIce(c) {
  neon(c, () => { c.beginPath(); c.moveTo(-20, 0); c.lineTo(0, 46); c.lineTo(20, 0); c.closePath(); }, '#ffd166', 2.5);
  neon(c, () => { c.beginPath(); c.moveTo(-12, 8); c.lineTo(6, 26); c.moveTo(12, 8); c.lineTo(-6, 26); }, '#ffd166', 1.4);
  neon(c, () => { c.beginPath(); c.arc(-8, -8, 14, Math.PI * 0.8, Math.PI * 2.1); }, '#ff5ec4', 2.5);
  neon(c, () => { c.beginPath(); c.arc(9, -10, 13, Math.PI * 0.9, Math.PI * 2.2); }, '#5ee7ff', 2.5);
  neon(c, () => { c.beginPath(); c.arc(0, -28, 11, Math.PI, Math.PI * 2); }, '#c77dff', 2.5);
  circ(c, 2, -42, 4, '#ff4a5c');
}
function drawHeart(c) {
  neon(c, () => { c.beginPath(); c.moveTo(0, 2); c.bezierCurveTo(-26, -14, -16, -40, 0, -26); c.bezierCurveTo(16, -40, 26, -14, 0, 2); c.closePath(); }, '#ff4a5c', 2.5);
  neon(c, () => { c.beginPath(); c.moveTo(0, 2); c.quadraticCurveTo(-8, 20, 4, 38); }, '#ffd166', 1.2);
}
function drawTickets(c) {
  neon(c, () => { c.beginPath(); c.moveTo(-70, -26); c.lineTo(70, -26); c.moveTo(-40, -26); c.lineTo(-40, -16); c.moveTo(40, -26); c.lineTo(40, -16); }, '#c77dff', 1.8);
  rr(c, -62, -16, 124, 36, 6); c.fillStyle = 'rgba(20,8,30,.85)'; c.fill();
  neon(c, () => rr(c, -62, -16, 124, 36, 6), '#5ee7ff', 2.2);
  neonText(c, 'TICKETS', 0, 2, '800 18px "JetBrains Mono", monospace', '#ffd166');
}
function drawPrice(c) {
  rr(c, -32, -20, 64, 40, 6); c.fillStyle = 'rgba(20,8,30,.85)'; c.fill();
  neon(c, () => rr(c, -32, -20, 64, 40, 6), '#ff5ec4', 2.2);
  neonText(c, '$5', 0, 1, '800 18px "JetBrains Mono", monospace', '#5ee7ff');
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
  ],
});
