// 第 3 大關 古都巷弄 / World 3: Old Town Alleys (Pixel art).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== Level 1: pixel Kyoto ===== */
function bgJapan(c) { // drawn on a 90x120 low-res canvas, scaled up with no smoothing
  const bands = ['#1d1b4f','#2a2263','#3d2874','#5a2e80','#7f3586','#a8437f','#d0586f','#ec7563','#f5965d','#f9b866'];
  bands.forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * 7, 90, 7); });
  c.fillStyle = '#fbc87a'; c.fillRect(0, 70, 90, 10);
  c.fillStyle = '#fff6d8'; [[6,4],[19,9],[33,3],[47,11],[58,5],[84,8],[71,14],[12,17]].forEach(([x, y]) => c.fillRect(x, y, 1, 1));
  c.fillStyle = '#ffe2a0'; for (let y = -9; y <= 9; y++) { const hw = Math.round(Math.sqrt(81 - y * y)); c.fillRect(64 - hw, 44 + y, hw * 2, 1); }
  [47, 50, 52].forEach(y => { c.fillStyle = bands[Math.min(9, Math.floor(y / 7))]; c.fillRect(53, y, 23, 1); });
  for (let y = 31; y < 80; y++) { const half = 2 + Math.round((y - 31) * 0.95); c.fillStyle = '#4b4f93'; c.fillRect(38 - half, y, half, 1); c.fillStyle = '#3a3d79'; c.fillRect(38, y, half, 1); }
  for (let y = 31; y < 45; y++) {
    const half = 2 + Math.round((y - 31) * 0.95);
    for (let x = 38 - half; x < 38 + half; x++) {
      if (y >= 40 && ((x + 60) % 6) >= 6 - (y - 39)) continue;
      c.fillStyle = x < 38 ? '#f4f2ff' : '#cfd2f0'; c.fillRect(x, y, 1, 1);
    }
  }
  c.fillStyle = '#231d48'; c.fillRect(79, 46, 1, 8);
  for (let i = 0; i < 5; i++) { const y = 52 + i * 5, w = (4 + i * 1.5) | 0; c.fillRect(79 - w - 1, y, 2 * w + 3, 1); c.fillRect(79 - w + 1, y + 1, 2 * w - 1, 4); }
  for (let x = 0; x < 90; x++) { const h = 2 + ((x * 7 + 3) % 5) + (x % 11 === 0 ? 3 : 0); c.fillStyle = '#2b2554'; c.fillRect(x, 80 - h, 1, h); }
  c.fillStyle = '#2a2030'; c.fillRect(0, 0, 36, 22); c.fillStyle = '#3d3348'; for (let y = 3; y < 22; y += 4) c.fillRect(0, y, 35, 1);
  c.fillStyle = '#17121d'; c.fillRect(0, 22, 38, 2);
  c.fillStyle = '#5a3a24'; c.fillRect(0, 24, 34, 2);
  c.fillStyle = '#4a301e'; c.fillRect(0, 26, 9, 54); c.fillStyle = '#6b4a30'; for (let x = 1; x < 9; x += 2) c.fillRect(x, 26, 1, 54);
  c.fillStyle = '#17121d'; for (let x = 34; x < 90; x++) c.fillRect(x, 24 + Math.round((x - 34) / 28), 1, 1);
  c.fillStyle = '#5e5a72'; c.fillRect(0, 80, 90, 40);
  for (let r = 0; r < 8; r++) {
    const y = 80 + r * 5;
    c.fillStyle = '#4a4660'; c.fillRect(0, y, 90, 1); c.fillStyle = '#6f6a86'; c.fillRect(0, y + 1, 90, 1);
    c.fillStyle = '#4a4660'; for (let x = (r % 2) * 4; x < 90; x += 8) c.fillRect(x, y, 1, 5);
  }
  c.fillStyle = 'rgba(255,190,110,.16)'; c.fillRect(9, 80, 22, 40);
}
function drawTorii(c) { pxSprite(c, 30, 26, p => {
  const R = '#e2452f', D = '#a82c1e', K = '#2a2030', G = '#f2c14e';
  p(6,5,3,19,R); p(21,5,3,19,R); p(8,5,1,19,D); p(23,5,1,19,D);
  p(5,23,5,3,K); p(20,23,5,3,K);
  p(3,10,24,2,R); p(3,11,24,1,D);
  p(2,3,26,2,R); p(2,4,26,1,D);
  p(1,1,28,2,K); p(0,0,3,2,K); p(27,0,3,2,K); p(3,1,24,1,'#463a4f');
  p(12,5,6,5,K); p(13,6,4,3,G);
}); }
function drawRamen(c) { pxSprite(c, 26, 12, p => {
  p(4,-4,1,4,'#2a2030'); p(21,-4,1,4,'#2a2030');
  p(0,0,26,12,'#3a2114'); p(1,1,24,10,'#d99a55'); p(1,1,24,1,'#eab573'); p(1,5,24,1,'#c7843f'); p(1,8,24,1,'#c7843f');
}); txt(c, LOCAL('ラーメン'), 0, 1, '22px "DotGothic16", monospace', '#3a1608'); }
function drawVending(c) { pxSprite(c, 16, 28, p => {
  const K = '#1b1b2a';
  p(0,0,16,28,K); p(1,1,14,26,'#d8343a'); p(1,1,14,1,'#f0646a');
  p(2,2,12,13,'#bfe3ff');
  const cans = ['#f6d04d','#3cb371','#ff8a3d','#ffffff','#7b5cff','#3cc3ff','#ff5c8a','#f6d04d','#2e8b57','#ff8a3d','#ffffff','#3cc3ff'];
  for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { p(3 + i * 3, 3 + r * 4, 2, 3, cans[r * 4 + i]); p(3 + i * 3, 6 + r * 4, 2, 1, '#8fb4d6'); }
  p(2,15,12,1,K);
  for (let i = 0; i < 4; i++) p(3 + i * 3, 16, 2, 1, '#ffe066');
  p(11,18,3,3,K); p(12,19,1,1,'#ffe066');
  p(2,22,9,4,K); p(3,23,7,2,'#333344');
  p(1,26,14,1,'#a5242a');
}); }
function drawLantern(c) { pxSprite(c, 14, 20, p => {
  const K = '#221a22', R = '#e23b2e', D = '#a3241b', L = '#ff6a4d';
  p(6,-5,2,5,K); p(3,0,8,2,K);
  p(2,2,10,1,R); p(1,3,12,1,R); p(0,4,14,12,R); p(1,16,12,1,R); p(2,17,10,1,R);
  p(1,4,2,12,L);
  [6, 9, 12, 15].forEach(y => p(0, y, 14, 1, D));
  p(3,18,8,2,K);
}); txt(c, LOCAL('祭'), 0, -1, '24px "DotGothic16", monospace', '#fff3d6'); }
function drawCat(c) { pxSprite(c, 16, 18, p => {
  const K = '#2a2030', Wt = '#fbf7ef', Pk = '#f49ab0', Rd = '#e2452f', G = '#f2c14e';
  const sil = [[1,0,3,2],[12,0,3,2],[1,2,14,7],[2,9,12,9],[14,1,2,8]];
  sil.forEach(([x, y, w, h]) => p(x - 1, y - 1, w + 2, h + 2, K));
  sil.forEach(([x, y, w, h]) => p(x, y, w, h, Wt));
  p(2,1,1,1,Pk); p(13,1,1,1,Pk);
  p(4,5,2,1,K); p(10,5,2,1,K); p(7,6,2,1,Pk); p(3,7,1,1,Pk); p(12,7,1,1,Pk);
  p(2,9,12,1,Rd); p(7,10,2,2,G);
  p(4,12,6,4,G); p(5,13,4,2,'#d9a428');
  p(14,1,2,1,'#f0d6dc');
  p(3,16,10,1,'#e3dacb');
}); }

defineChapter({
  key: 'oldtown', order: 3,
  name: { zh: "古都巷弄", en: "Old Town Alleys" },
  blurb: { zh: "老城市的招牌與燈籠，用像素一格格拼回原位。", en: "Signs and lanterns of old cities, pieced back pixel by pixel." },
  style: { zh: "像素風", en: "Pixel art" },
  narrator: { zh: "招財貓", en: "Lucky Cat" },
  song: 'jp',
    comments: {
      far: [{ zh: ["喵…？", "巷子裡的招牌全都歪了，老闆今天先休息。"], en: ["Meow…?", "Every sign in the alley is crooked. Shop's closed today."] }, { zh: ["燈籠亂飄", "招財貓揮手揮到一半停下來：這要怎麼開店？"], en: ["Lanterns adrift", "Lucky Cat stops mid-wave: how do we open like this?"] }],
      close: [{ zh: ["差一格像素", "只差一點點，拉麵已經煮好在等你了。"], en: ["One pixel off", "So close! The ramen is ready and waiting."] }, { zh: ["快對齊了喵", "再一下下，燈籠就要亮起來了。"], en: ["Nearly there, meow", "A moment more and the lanterns will light up."] }],
      pass: [{ zh: ["開店營業！", "勉強對齊，招財貓還是覺得鳥居有點斜。"], en: ["Open for business!", "Lined up, but Lucky Cat thinks the gate's a bit off."] }, { zh: ["及格喵～", "老闆：可以開店了，但別讓客人仔細看。"], en: ["Pass, meow~", "Owner: we can open. Just don't let guests look closely."] }],
      good: [{ zh: ["街道整齊！", "鳥居、燈籠、販賣機排得像明信片一樣。"], en: ["Tidy street!", "Gate, lantern, vending machine: neat as a postcard."] }, { zh: ["好街坊", "招財貓的手揮得特別起勁。"], en: ["Good neighbor", "Lucky Cat is waving extra hard today."] }],
      perfect: [{ zh: ["完美古都♪", "一格像素都不差！招財貓招來了滿滿的福氣。"], en: ["Perfect old town♪", "Not one pixel off! Lucky Cat brings you heaps of luck."] }, { zh: ["京都職人", "連老師傅都點頭：這才叫對齊。"], en: ["Kyoto craftsman", "Even the old master nods: now that's aligned."] }],
    },
  stages: [
    { key: 'jp', title: { zh: "京都黃昏", en: "Kyoto Dusk" }, place: { zh: "日本 京都", en: "Kyoto, Japan" },
      intro: { zh: "像素畫的京都巷子。燈籠和招牌都歪了，招財貓只歪了一點點。", en: "A pixel-art Kyoto alley. The lantern and signs are crooked; Lucky Cat is off by a hair." },
      lowres: true, bg: bgJapan,
      objects: [
      { id: 'torii', name: { zh: '鳥居', en: 'Torii gate' }, x: 180, y: 268, w: 120, h: 104, mag: 11, draw: drawTorii, sfx: 'bell' },
      { id: 'ramen', name: { zh: '拉麵招牌', en: 'Ramen sign' }, x: 72, y: 142, w: 104, h: 48, mag: 7, draw: drawRamen, sfx: 'wood' },
      { id: 'lantern', name: { zh: '紅燈籠', en: 'Red lantern' }, x: 292, y: 160, w: 56, h: 80, mag: 14, draw: drawLantern, sfx: 'pop' },
      { id: 'vend', name: { zh: '自動販賣機', en: 'Vending machine' }, x: 300, y: 390, w: 64, h: 112, mag: 6, draw: drawVending, sfx: 'clunk' },
      { id: 'cat', name: { zh: '招財貓', en: 'Lucky cat' }, x: 80, y: 400, w: 64, h: 72, near: true, draw: drawCat, sfx: 'meow' }
      ] },
  ],
});
