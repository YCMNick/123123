// 第 1 大關 動物奇關 / World 1: Animal Antics (Flat illustration).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== 1-1 Farm morning: flat illustration, living animals ===== */
function bgFarm(c) {
  const R = mulberry(3);
  let g = c.createLinearGradient(0, 0, 0, 300); g.addColorStop(0, '#9fd8f7'); g.addColorStop(1, '#fff1d2');
  c.fillStyle = g; c.fillRect(0, 0, W, 300);
  circ(c, 300, 70, 46, 'rgba(255,211,107,.25)'); circ(c, 300, 70, 34, '#ffd36b');
  [[70, 80, 1], [190, 50, 0.8], [250, 128, 0.6]].forEach(([x, y, s]) => {
    c.fillStyle = 'rgba(255,255,255,.95)';
    [[0, 0, 26], [22, -8, 20], [42, 2, 18], [-20, 4, 16]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(x + dx * s, y + dy * s, r * s, 0, Math.PI * 2); c.fill(); });
  });
  const hill = (y0, amp, col, ph) => { c.beginPath(); c.moveTo(0, H); c.lineTo(0, y0); for (let x = 0; x <= W; x += 20) c.lineTo(x, y0 + Math.sin(x / 70 + ph) * amp); c.lineTo(W, H); c.closePath(); c.fillStyle = col; c.fill(); };
  hill(230, 14, '#b5df8a', 0.5);
  c.fillStyle = '#d9483b'; c.fillRect(24, 200, 86, 70);
  poly(c, [16, 204, 67, 168, 118, 204], '#a8302a');
  c.fillStyle = '#fff6ea'; c.fillRect(52, 230, 30, 40);
  c.strokeStyle = '#fff6ea'; c.lineWidth = 3; c.strokeRect(24, 200, 86, 70);
  c.strokeStyle = '#d9483b'; c.beginPath(); c.moveTo(52, 230); c.lineTo(82, 270); c.moveTo(82, 230); c.lineTo(52, 270); c.stroke();
  c.fillStyle = '#c9cfd6'; c.fillRect(112, 190, 22, 80); ell(c, 123, 190, 11, 9, '#9aa3ad');
  hill(262, 10, '#93cf68', 2);
  c.fillStyle = '#fff8ec'; for (let x = 6; x < W; x += 26) c.fillRect(x, 248, 6, 34);
  c.fillRect(0, 256, W, 5); c.fillRect(0, 270, W, 5);
  hill(300, 8, '#7fc25a', 1);
  for (let i = 0; i < 70; i++) circ(c, R() * W, 310 + R() * 165, 1.6 + R() * 1.4, ['#fff', '#ffd84d', '#ff8fb1'][i % 3]);
  c.strokeStyle = 'rgba(60,120,40,.25)'; c.lineWidth = 1.2;
  for (let i = 0; i < 60; i++) { const x = R() * W, y = 310 + R() * 165; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 2, y - 6); c.moveTo(x, y); c.lineTo(x + 2, y - 6); c.stroke(); }
}
function drawChicken(c, a) {
  const peck = a.live * Math.pow(Math.max(0, Math.sin(a.t * 5)), 6);
  groundShadow(c, 30, 22);
  c.strokeStyle = '#f29a2e'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-4, 16); c.lineTo(-6, 30); c.moveTo(6, 16); c.lineTo(5, 30); c.stroke();
  poly(c, [-22, -2, -32, -18, -26, -6, -34, -8], '#f3e3c3');
  ell(c, -2, 4, 22, 16, '#fffaf0');
  ell(c, -6, 6, 11, 8, '#efe1c4', -0.3);
  c.save(); c.translate(12, -6); c.rotate(peck * 0.9);
  ell(c, 6, -10, 10, 11, '#fffaf0');
  poly(c, [2, -20, 5, -27, 8, -21, 12, -26, 14, -18], '#e8463a');
  poly(c, [15, -11, 24, -8, 15, -5], '#f29a2e');
  ell(c, 13, -2, 3, 4, '#e8463a');
  circ(c, 9, -12, 1.8, '#222');
  c.restore();
}
function drawCow(c, a) {
  const swish = Math.sin(a.t * 3) * 0.6 * a.live + 0.2, chew = Math.sin(a.t * 8) * 1.5 * a.live;
  groundShadow(c, 40, 52);
  c.fillStyle = '#f4f1ea'; [-40, -24, 20, 34].forEach((x) => c.fillRect(x, 10, 10, 30));
  c.fillStyle = '#4a4040'; [-40, -24, 20, 34].forEach((x) => c.fillRect(x, 36, 10, 5));
  c.save(); c.translate(-50, -12); c.rotate(swish);
  c.strokeStyle = '#f4f1ea'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-8, 14, -4, 30); c.stroke();
  ell(c, -4, 32, 4, 6, '#3b3333'); c.restore();
  rr(c, -52, -22, 96, 44, 20); c.fillStyle = '#f7f4ee'; c.fill();
  c.fillStyle = '#2f2b2b';
  [[-30, -10, 13, 9], [2, 4, 12, 10], [-8, -16, 8, 6], [24, -12, 9, 7]].forEach(([x, y, rx, ry]) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0.4, 0, Math.PI * 2); c.fill(); });
  ell(c, -8, 22, 10, 6, '#f6a9b9');
  c.save(); c.translate(46, -14);
  ell(c, -10, -10, 7, 4, '#f7f4ee', -0.5); ell(c, 14, -10, 7, 4, '#f7f4ee', 0.5);
  poly(c, [-4, -16, -8, -26, 0, -18], '#e9dcc2'); poly(c, [8, -16, 12, -26, 4, -18], '#e9dcc2');
  rr(c, -10, -18, 22, 30, 10); c.fillStyle = '#f7f4ee'; c.fill();
  rr(c, -12, 2 + chew * 0.5, 26, 14, 7); c.fillStyle = '#f6a9b9'; c.fill();
  circ(c, -4, 9 + chew * 0.5, 1.8, '#b5606f'); circ(c, 6, 9 + chew * 0.5, 1.8, '#b5606f');
  circ(c, -3, -6, 2.2, '#222'); circ(c, 7, -6, 2.2, '#222');
  c.restore();
}
function drawPig(c, a) {
  const wig = Math.sin(a.t * 10) * a.live, sn = Math.sin(a.t * 6) * a.live;
  groundShadow(c, 28, 34);
  c.fillStyle = '#e88aa0'; [-24, -10, 10, 22].forEach((x) => c.fillRect(x, 12, 8, 16));
  c.strokeStyle = '#e88aa0'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-34, -4); c.bezierCurveTo(-44, -10 + wig * 3, -46, 4, -38, 2 + wig * 2); c.stroke();
  ell(c, -4, 0, 32, 22, '#f7a8b8');
  ell(c, -10, 8, 14, 7, 'rgba(255,255,255,.25)');
  c.save(); c.translate(24, -6);
  poly(c, [-6, -12, -4, -26, 6, -14], '#f48aa0'); poly(c, [6, -14, 14, -24, 16, -10], '#f48aa0');
  circ(c, 4, 0, 15, '#f7a8b8');
  ell(c, 15 + sn, 4, 7, 6, '#f48aa0'); circ(c, 13 + sn, 4, 1.5, '#b3485f'); circ(c, 17 + sn, 4, 1.5, '#b3485f');
  circ(c, 2, -4, 2, '#222'); circ(c, 9, -5, 2, '#222');
  c.restore();
}
function drawSheep(c, a) {
  const hop = Math.max(0, Math.sin(a.t * 3)) * a.live;
  groundShadow(c, 34 + hop * 7, 34 - hop * 6);
  c.fillStyle = '#3b3a44'; [-22, -8, 10, 22].forEach((x) => c.fillRect(x, 12, 6, 22));
  c.fillStyle = '#fbfbf6';
  [[-24, -6, 14], [-10, -14, 15], [8, -14, 15], [22, -6, 14], [-16, 6, 14], [2, 8, 15], [18, 6, 13], [-2, -2, 16]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); });
  c.strokeStyle = 'rgba(160,160,150,.35)'; c.lineWidth = 1.2;
  [[-10, -14, 15], [8, -14, 15], [2, 8, 15]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0.3, 2.2); c.stroke(); });
  c.save(); c.translate(32, -10);
  ell(c, -6, -8, 7, 4, '#3b3a44', -0.6);
  ell(c, 4, 2, 11, 14, '#3b3a44');
  circ(c, 0, -2, 2.2, '#fff'); circ(c, 8, -2, 2.2, '#fff'); circ(c, 0.5, -1.6, 1.1, '#222'); circ(c, 8.5, -1.6, 1.1, '#222');
  circ(c, 2, -13, 8, '#fbfbf6');
  c.restore();
}

defineChapter({
  key: 'animal', order: 1,
  name: { zh: "動物奇關", en: "Animal Antics" },
  blurb: { zh: "每隻動物都有自己的脾氣：沒轉正前會一直動，轉正了就叫給你聽。", en: "Every animal has its own temper: it fidgets until straight, then calls out to you." },
  style: { zh: "扁平插畫", en: "Flat illustration" },
  narrator: { zh: "母雞", en: "Hen" },
  song: 'farm',
    comments: {
      far: [{ zh: ["咯咯咯？！", "大家都還歪著頭等你耶，小豬說牠脖子好痠。"], en: ["Bawk?!", "Everyone's still tilted. Piglet says his neck hurts."] }, { zh: ["農場大亂鬥", "乳牛邊嚼草邊搖頭：這樣不行喔～"], en: ["Barnyard chaos", "Cow shakes her head mid-chew: nope, not like this~"] }],
      close: [{ zh: ["差一點點咯！", "就差最後幾隻，綿羊已經在幫你數羊了。"], en: ["Sooo close!", "Just a few left. Sheep is already counting sheep for you."] }, { zh: ["只差一步", "母雞把蛋都孵好了，你也快好了吧？"], en: ["One more step", "Hen's eggs have hatched. You're almost done too, right?"] }],
      pass: [{ zh: ["過關咯噠！", "大家勉強站好了，但小豬偷偷還在晃。"], en: ["Cleared, cluck!", "Everyone's standing, but Piglet is still wobbling."] }, { zh: ["及格啦～", "乳牛：哞～算你過，下次再站正一點。"], en: ["You passed~", "Cow: moo~ fine, but stand up straighter next time."] }],
      good: [{ zh: ["站得挺直！", "整個農場排排站，連母雞都忘了啄米。"], en: ["Standing tall!", "The whole farm in a neat row. Hen forgot to peck."] }, { zh: ["好農夫", "綿羊說：這麼整齊，今晚可以安心睡了。"], en: ["Great farmer", "Sheep says: this tidy, we'll all sleep well tonight."] }],
      perfect: [{ zh: ["完美牧場♪", "一度都不差！全場動物一起為你合唱咯咯哞哼咩～"], en: ["Perfect pasture♪", "Not one degree off! The whole farm sings for you."] }, { zh: ["動物模範生", "母雞決定把今天第一顆蛋送給你。"], en: ["Model student", "Hen is giving you today's very first egg."] }],
    },
  stages: [
    { key: 'farm', title: { zh: "農場早晨", en: "Farm Morning" }, place: { zh: "台灣 宜蘭", en: "Yilan, Taiwan" },
      intro: { zh: "動物還沒轉正前會一直動。轉正了，牠會叫給你聽，然後乖乖站好。", en: "Animals keep moving until they are straight. Straighten one and it calls out, then stands still." },
      bg: bgFarm, animated: true,
      objects: [
      { id: 'sheep', name: { zh: '綿羊', en: 'Sheep' }, x: 100, y: 290, w: 90, h: 70, mag: 9, draw: drawSheep, habit: (t, l) => ({ dy: -Math.max(0, Math.sin(t * 3)) * 7 * l }), call: 'baa' },
      { id: 'cow', name: { zh: '乳牛', en: 'Cow' }, x: 245, y: 300, w: 120, h: 84, mag: 12, draw: drawCow, call: 'moo' },
      { id: 'chicken', name: { zh: '母雞', en: 'Hen' }, x: 90, y: 405, w: 60, h: 64, near: true, draw: drawChicken, habit: (t, l) => ({ dx: Math.sin(t * 1.2) * 3 * l }), call: 'chick' },
      { id: 'pig', name: { zh: '小豬', en: 'Piglet' }, x: 260, y: 415, w: 84, h: 60, mag: 10, draw: drawPig, habit: (t, l) => ({ dy: -Math.abs(Math.sin(t * 4)) * 2 * l }), call: 'oink' }
      ] },
  ],
});
