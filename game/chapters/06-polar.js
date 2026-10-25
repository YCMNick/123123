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
  txt(c, T('北極點', 'NORTH POLE') + ' N 90°00′', -4, -28, '700 12px "Noto Sans TC", sans-serif', '#fff');
  poly(c, [52, -6, -40, -6, -54, 6, -40, 18, 52, 18], '#2f6db3');
  txt(c, T('研究站', 'STATION') + ' 2.3 km', 2, 6, '700 11px "Noto Sans TC", sans-serif', '#fff');
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
    { key: 'polar', title: { zh: "極光夜", en: "Aurora Night" }, place: { zh: "挪威 特羅姆瑟", en: "Tromsø, Norway" },
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
  ],
});
