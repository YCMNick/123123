// 第 7 大關 沙漠綠洲 / World 7: Desert Oasis (Retro poster).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 7-1 Pyramids: retro travel poster ===== */
function bgDesert(c) {
  c.fillStyle = '#f3e3c3'; c.fillRect(0, 0, W, H);
  const bands = ['#f4d7a1', '#f1c27f', '#eda866', '#e88f50'];
  bands.forEach((col, i) => { c.fillStyle = col; c.fillRect(10, 10 + i * 55, W - 20, 55); });
  circ(c, 250, 170, 60, '#f7e9c4');
  [182, 194, 205, 215].forEach((y, i) => { c.fillStyle = bands[Math.min(3, Math.floor((y - 10) / 55))]; c.fillRect(185, y, 130, 3 + i); });
  poly(c, [190, 232, 222, 198, 254, 232], '#c97e4c'); poly(c, [222, 198, 254, 232, 232, 232], '#b56a3e');
  const dune = (y0, amp, col, ph) => { c.beginPath(); c.moveTo(10, H - 10); c.lineTo(10, y0); for (let x = 10; x <= W - 10; x += 10) c.lineTo(x, y0 + Math.sin(x / 60 + ph) * amp); c.lineTo(W - 10, H - 10); c.closePath(); c.fillStyle = col; c.fill(); };
  dune(232, 10, '#e9b36b', 1); dune(300, 16, '#e2a057', 2.2); dune(380, 12, '#d98b48', 0.4);
  c.globalAlpha = 0.08; c.drawImage(GRAIN, 0, 0, W, H); c.globalAlpha = 1;
  txt(c, 'EGYPT', 24, 40, 'italic 700 30px "Playfair Display", Georgia, serif', '#1f2a30', 'left');
  txt(c, 'NILE EXPRESS · 1936', 26, 64, '700 10px "Playfair Display", Georgia, serif', '#1f2a30', 'left');
  c.strokeStyle = '#1f2a30'; c.lineWidth = 2; c.strokeRect(10, 10, W - 20, H - 20);
}
function drawPyramid(c) {
  poly(c, [-70, 48, 0, -50, 70, 48], '#efb46a'); poly(c, [0, -50, 70, 48, 14, 48], '#c9773f');
  c.strokeStyle = 'rgba(80,40,20,.25)'; c.lineWidth = 1;
  for (let k = 1; k < 8; k++) { const y = -50 + k * 12.25, hw = (y + 50) * 0.714; c.beginPath(); c.moveTo(-hw, y); c.lineTo(hw, y); c.stroke(); }
  poly(c, [-6, 48, -6, 36, 6, 36, 6, 48], '#5a3320');
}
function drawCamel(c, a) {
  const st = Math.sin(a.t * 3) * a.live, ch = Math.sin(a.t * 7) * a.live;
  c.fillStyle = '#6e4524';
  [[-30, st], [-18, -st], [16, st], [28, -st]].forEach(([x, s]) => { c.save(); c.translate(x, 8); c.rotate(s * 0.25); c.fillRect(-3, 0, 6, 30); c.restore(); });
  c.beginPath(); c.moveTo(-40, 10); c.quadraticCurveTo(-36, -14, -22, -10); c.quadraticCurveTo(-14, -30, -4, -10); c.quadraticCurveTo(6, -28, 16, -8); c.quadraticCurveTo(34, -6, 34, 12); c.quadraticCurveTo(0, 22, -40, 10); c.closePath(); c.fillStyle = '#8f5a2e'; c.fill();
  c.save(); c.translate(30, -2);
  c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(14, -10, 10, -30); c.lineTo(18, -32); c.quadraticCurveTo(24, -12, 6, 8); c.closePath(); c.fillStyle = '#8f5a2e'; c.fill();
  ell(c, 18, -32 + ch * 0.6, 9, 6, '#8f5a2e'); circ(c, 18, -35, 1.6, '#f3e3c3'); poly(c, [10, -36, 12, -42, 14, -36], '#6e4524');
  c.restore();
  c.strokeStyle = '#6e4524'; c.lineWidth = 2; c.beginPath(); c.moveTo(-40, 8); c.quadraticCurveTo(-48, 14 + st * 4, -46, 22); c.stroke();
  poly(c, [-14, -12, 8, -10, 6, 0, -16, 0], '#2d5c66'); poly(c, [-14, -3, 7, -3, 6, 0, -16, 0], '#c4553b');
}
function drawPalm(c, a) {
  const sw = Math.sin(a.t * 1.6) * 0.12;
  c.strokeStyle = '#8c5a2e'; c.lineWidth = 7; c.beginPath(); c.moveTo(4, 58); c.quadraticCurveTo(-8, 10, 0, -40); c.stroke();
  c.strokeStyle = 'rgba(60,30,10,.4)'; c.lineWidth = 1.5; for (let y = 50; y > -36; y -= 9) { c.beginPath(); c.moveTo(-4, y); c.lineTo(5, y - 3); c.stroke(); }
  c.save(); c.translate(0, -42); c.rotate(sw);
  for (let i = 0; i < 6; i++) {
    const an = -Math.PI / 2 + (i - 2.5) * 0.55;
    c.save(); c.rotate(an); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(20, -14, 38, 6); c.quadraticCurveTo(20, -2, 0, 0); c.fillStyle = i % 2 ? '#2d5c66' : '#3f7a6a'; c.fill(); c.restore();
  }
  circ(c, -3, 4, 4, '#6b4a2b'); circ(c, 4, 5, 4, '#6b4a2b');
  c.restore();
}
function drawCairo(c) {
  c.fillStyle = '#6b4a2b'; c.fillRect(-4, -10, 8, 46);
  poly(c, [-52, -32, 38, -32, 54, -16, 38, 0, -52, 0], '#2d5c66');
  txt(c, 'CAIRO  12 KM', -6, -16, '700 13px "Playfair Display", Georgia, serif', '#f3e3c3');
  poly(c, [44, 6, -30, 6, -42, 16, -30, 26, 44, 26], '#c4553b');
  txt(c, 'GIZA  3 KM', 4, 16, '700 10px "Playfair Display", Georgia, serif', '#f3e3c3');
}
function drawTent(c) {
  poly(c, [-50, 30, 0, -32, 50, 30], '#c4553b'); poly(c, [0, -32, 50, 30, 10, 30], '#9e3f2b');
  c.strokeStyle = 'rgba(243,227,195,.6)'; c.lineWidth = 3;
  [-30, -10, 10, 30].forEach((x) => { c.beginPath(); c.moveTo(0, -32); c.lineTo(x * 1.4, 30); c.stroke(); });
  poly(c, [-10, 30, 0, 4, 10, 30], '#1f2a30');
  c.strokeStyle = '#1f2a30'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, -32); c.lineTo(0, -40); c.stroke(); poly(c, [0, -40, 12, -37, 0, -34], '#e9b36b');
}
function drawMirage(c, a) {
  c.save(); c.globalAlpha = 0.6;
  c.fillStyle = '#bfe3e8'; c.fillRect(-55, 21, 110, 4);
  for (let y = -22; y < 22; y += 4) { const t = (y + 22) / 44, hw = 6 + t * 46, sh = Math.sin(a.t * 4 + y / 4) * 2; c.fillStyle = (y / 4) % 2 ? '#fbf1d6' : '#9fd0d8'; c.fillRect(-hw + sh, y, hw * 2, 2.5); }
  c.restore();
}

defineChapter({
  key: 'desert', order: 7,
  name: { zh: "沙漠綠洲", en: "Desert Oasis" },
  blurb: { zh: "復古旅行海報裡的沙漠。小心，倒影本來就是倒的。", en: "A desert from a vintage travel poster. Careful: reflections are upside down." },
  style: { zh: "復古海報", en: "Retro poster" },
  narrator: { zh: "駱駝", en: "Camel" },
  song: 'desert',
    comments: {
      far: [{ zh: ["沙塵暴！", "金字塔快被吹倒了，駱駝嚼草嚼到忘記吞。"], en: ["Sandstorm!", "The pyramid nearly blew over. Camel forgot to swallow."] }, { zh: ["迷路了…", "海市蜃樓都看不下去，自己先消失了。"], en: ["Lost…", "Even the mirage gave up and vanished."] }],
      close: [{ zh: ["差一粒沙", "再一下下，綠洲就在前面了！"], en: ["One grain off", "A moment more. The oasis is right ahead!"] }, { zh: ["快到開羅了", "路牌說：只剩最後 1 公里！"], en: ["Almost in Cairo", "The sign says: only 1 km to go!"] }],
      pass: [{ zh: ["抵達綠洲！", "勉強過關，但棕櫚樹還在風中搖頭。"], en: ["Oasis reached!", "Cleared, but the palm tree is still shaking its head."] }, { zh: ["及格駱駝", "駱駝慢吞吞地說：嗯…可以…啦…"], en: ["Camel pass", "Camel drawls: hmm… it'll… do…"] }],
      good: [{ zh: ["海報級風景！", "整幅畫面整齊得可以印成旅遊海報。"], en: ["Poster-worthy!", "Neat enough to print as a travel poster."] }, { zh: ["沙漠嚮導", "駱駝願意免費載你一程。"], en: ["Desert guide", "Camel offers you a free ride."] }],
      perfect: [{ zh: ["完美金字塔♪", "一度都不差！法老都從金字塔裡探頭出來看。"], en: ["Perfect pyramid♪", "Not one degree off! The pharaoh peeks out to see."] }, { zh: ["倒影大師", "你連倒影都轉對了，沙漠為你颳起一陣掌聲。"], en: ["Mirage master", "You even got the reflection right. The desert applauds."] }],
    },
  stages: [
    { key: 'desert', title: { zh: "金字塔", en: "Pyramids" }, place: { zh: "埃及 吉薩", en: "Giza, Egypt" },
      intro: { zh: "駱駝會一直嚼東西。還有：倒影本來就是倒著的。", en: "Camel never stops chewing. And: a reflection is supposed to be upside down." },
      bg: bgDesert, animated: true,
      objects: [
      { id: 'cairo', name: { zh: '路牌', en: 'Road sign' }, x: 85, y: 175, w: 110, h: 70, mag: 9, draw: drawCairo, sfx: 'wood' },
      { id: 'palm', name: { zh: '棕櫚樹', en: 'Palm tree' }, x: 305, y: 230, w: 80, h: 120, mag: 8, draw: drawPalm, sfx: 'boing' },
      { id: 'pyramid', name: { zh: '金字塔', en: 'Pyramid' }, x: 140, y: 290, w: 140, h: 100, near: true, draw: drawPyramid, sfx: 'bell' },
      { id: 'camel', name: { zh: '駱駝', en: 'Camel' }, x: 275, y: 360, w: 100, h: 80, mag: 11, draw: drawCamel, habit: (t, l) => ({ dx: Math.sin(t * 1.5) * 3 * l }), call: 'camel' },
      { id: 'tent', name: { zh: '帳篷', en: 'Tent' }, x: 80, y: 395, w: 100, h: 64, mag: 12, draw: drawTent, sfx: 'boing' },
      { id: 'mirage', name: { zh: '海市蜃樓', en: 'Mirage' }, x: 205, y: 442, w: 110, h: 50, mag: 9, target: 180, draw: drawMirage, sfx: 'shimmer' }
      ] },
  ],
});
