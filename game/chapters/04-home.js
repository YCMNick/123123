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
  ],
});
