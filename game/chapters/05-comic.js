// 第 5 大關 漫畫街角 / World 5: Comic Corners (Comic).
// Art for every stage of this world, then its definition. The whole file runs in
// its own scope: helpers declared here are private to this world.
/* ===== Level 2: comic Paris ===== */
function bgParis(c) {
  c.fillStyle = '#fff3d9'; c.fillRect(0, 0, W, H);
  c.save(); c.beginPath(); c.rect(8, 8, W - 16, 300); c.clip();
  c.fillStyle = '#c4e8fb'; c.fillRect(8, 8, W - 16, 300);
  c.fillStyle = '#8fcdee';
  for (let y = 12, row = 0; y < 306; y += 8, row++) { const r = 0.5 + 2.4 * (1 - y / 306); for (let x = 12 + (row % 2) * 4; x < W - 10; x += 8) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); } }
  c.strokeStyle = 'rgba(17,17,17,.10)'; c.lineWidth = 1.5;
  for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; c.beginPath(); c.moveTo(285 + Math.cos(a) * 140, 150 + Math.sin(a) * 140); c.lineTo(285 + Math.cos(a) * 420, 150 + Math.sin(a) * 420); c.stroke(); }
  const blds = [[8,72,232],[80,58,218],[138,76,238],[214,62,224],[276,84,234]];
  blds.forEach(([x, w, top]) => {
    c.lineWidth = 2.5; c.strokeStyle = '#111';
    c.fillStyle = '#5d6b88'; c.fillRect(x + 12, top - 8, 7, 10); c.strokeRect(x + 12, top - 8, 7, 10);
    c.beginPath(); c.moveTo(x, top + 18); c.lineTo(x + 8, top); c.lineTo(x + w - 8, top); c.lineTo(x + w, top + 18); c.closePath(); c.fillStyle = '#8c9bb8'; c.fill(); c.stroke();
    c.fillStyle = '#f3dfb6'; c.fillRect(x, top + 18, w, 308 - top - 18); c.strokeRect(x, top + 18, w, 308 - top - 18);
    const cols = Math.floor((w - 10) / 16);
    for (let y = top + 26; y < 296; y += 19) {
      for (let i = 0; i < cols; i++) { c.fillStyle = '#6c84b3'; c.fillRect(x + 8 + i * 16, y, 9, 12); c.lineWidth = 1.5; c.strokeRect(x + 8 + i * 16, y, 9, 12); }
      c.beginPath(); c.moveTo(x + 4, y + 14); c.lineTo(x + w - 4, y + 14); c.stroke();
    }
  });
  c.restore();
  c.fillStyle = '#ead2a4'; c.fillRect(8, 308, W - 16, 164);
  c.strokeStyle = 'rgba(17,17,17,.2)'; c.lineWidth = 1.2;
  for (let y = 322, row = 0; y < 472; y += 12, row++) for (let x = 14 + (row % 2) * 8; x < W - 8; x += 16) { c.beginPath(); c.arc(x, y, 7, Math.PI, 0); c.stroke(); }
  c.lineWidth = 3; c.strokeStyle = '#111'; c.beginPath(); c.moveTo(8, 308); c.lineTo(W - 8, 308); c.stroke();
  c.lineWidth = 5; c.strokeRect(8, 8, W - 16, H - 16);
  rr(c, 14, 14, 160, 30, 2); c.fillStyle = '#ffe14d'; c.fill(); c.lineWidth = 2.5; c.stroke();
  txt(c, T('與此同時，在巴黎……', 'Meanwhile, in Paris…'), 24, 29.5, '700 14px "Noto Sans TC", sans-serif', '#111', 'left');
}
function eiffelPath(c) {
  c.beginPath(); c.moveTo(-2, -125); c.lineTo(-5, -96); c.quadraticCurveTo(-9, -50, -17, -22); c.lineTo(-25, -22); c.lineTo(-25, -12); c.lineTo(-20, -12);
  c.quadraticCurveTo(-25, 18, -36, 40); c.lineTo(-46, 40); c.lineTo(-46, 51); c.lineTo(-39, 51); c.quadraticCurveTo(-44, 95, -55, 125); c.lineTo(-31, 125);
  c.quadraticCurveTo(-27, 84, 0, 80); c.quadraticCurveTo(27, 84, 31, 125); c.lineTo(55, 125); c.quadraticCurveTo(44, 95, 39, 51); c.lineTo(46, 51); c.lineTo(46, 40); c.lineTo(36, 40);
  c.quadraticCurveTo(25, 18, 20, -12); c.lineTo(25, -12); c.lineTo(25, -22); c.lineTo(17, -22); c.quadraticCurveTo(9, -50, 5, -96); c.lineTo(2, -125); c.closePath();
}
function drawEiffel(c) {
  comicShape(c, () => eiffelPath(c), '#b07f55');
  c.save(); eiffelPath(c); c.clip();
  c.strokeStyle = 'rgba(17,17,17,.42)'; c.lineWidth = 1.2;
  for (let i = -260; i < 260; i += 10) { c.beginPath(); c.moveTo(i, -130); c.lineTo(i + 260, 130); c.stroke(); c.beginPath(); c.moveTo(i, 130); c.lineTo(i + 260, -130); c.stroke(); }
  c.fillStyle = 'rgba(255,230,190,.3)'; c.fillRect(-60, -130, 52, 260);
  c.restore();
  c.lineWidth = 2.5; c.strokeStyle = '#111'; c.fillStyle = '#7c5232';
  c.fillRect(-25, -22, 50, 10); c.strokeRect(-25, -22, 50, 10);
  c.fillRect(-46, 40, 92, 11); c.strokeRect(-46, 40, 92, 11);
  eiffelPath(c); c.lineWidth = 3; c.stroke();
  c.beginPath(); c.moveTo(0, -125); c.lineTo(0, -133); c.stroke();
}
function drawRue(c) {
  comicShape(c, () => rr(c, -80, -23, 160, 46, 6), '#2f7d4f');
  rr(c, -75, -18, 150, 36, 4); c.fillStyle = '#1f4fa0'; c.fill(); c.lineWidth = 1.5; c.strokeStyle = '#e8f0ff'; c.stroke();
  txt(c, '1er ARRT', 0, -9, '10px Bangers, sans-serif', '#fff');
  txt(c, 'RUE DE RIVOLI', 0, 6, '20px Bangers, sans-serif', '#fff');
}
function drawCafe(c) {
  const aw = () => { c.beginPath(); c.moveTo(-68, -42); c.lineTo(68, -42); c.lineTo(80, -12); for (let x = 80; x > -80; x -= 16) c.quadraticCurveTo(x - 8, -2, x - 16, -12); c.closePath(); };
  comicShape(c, aw, '#fff');
  c.save(); aw(); c.clip(); c.fillStyle = '#e0383e'; for (let x = -80; x < 80; x += 32) c.fillRect(x, -45, 16, 45); c.restore();
  aw(); c.lineWidth = 3; c.strokeStyle = '#111'; c.stroke();
  comicShape(c, () => rr(c, -66, -6, 132, 46, 4), '#1d5a45');
  txt(c, 'CAFÉ', 0, 14, '34px Bangers, sans-serif', '#ffd34d');
  txt(c, '· DEPUIS 1898 ·', 0, 33, '10px Bangers, sans-serif', '#f6e7c1');
}
function drawBubble(c) {
  const p = () => { c.beginPath(); c.ellipse(0, -6, 72, 28, 0, rad(78), rad(60) + Math.PI * 2); c.lineTo(46, 33); c.closePath(); };
  comicShape(c, p, '#fff');
  txt(c, 'BONJOUR !', 0, -5, '28px Bangers, sans-serif', '#111');
}
function drawLamp(c) {
  const G = '#2c4a3b';
  comicShape(c, () => { c.beginPath(); c.moveTo(-14, 75); c.lineTo(14, 75); c.lineTo(9, 60); c.lineTo(4, 58); c.lineTo(3, -40); c.lineTo(-3, -40); c.lineTo(-4, 58); c.lineTo(-9, 60); c.closePath(); }, G);
  comicShape(c, () => { c.beginPath(); c.moveTo(-12, -68); c.lineTo(12, -68); c.lineTo(8, -42); c.lineTo(-8, -42); c.closePath(); }, '#ffe27a');
  comicShape(c, () => { c.beginPath(); c.moveTo(-16, -68); c.lineTo(16, -68); c.lineTo(0, -77); c.closePath(); }, G, 3, false);
  c.strokeStyle = '#111'; c.lineWidth = 2;
  [[-26,-60,-18,-58],[26,-60,18,-58],[-23,-47,-15,-50],[23,-47,15,-50]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); });
  c.fillStyle = G; c.lineWidth = 2; c.fillRect(-6, -42, 12, 5); c.strokeRect(-6, -42, 12, 5); c.fillRect(-6, 20, 12, 5); c.strokeRect(-6, 20, 12, 5);
}
function drawPoster(c) {
  comicShape(c, () => rr(c, -50, -60, 100, 120, 2), '#f6ecd2');
  c.save(); rr(c, -43, -53, 86, 82, 1); c.clip();
  c.fillStyle = '#22305e'; c.fillRect(-45, -55, 90, 90);
  c.fillStyle = '#ff7a59'; c.beginPath(); c.arc(0, 10, 26, Math.PI, 0); c.fill();
  c.strokeStyle = '#ffb27a'; c.lineWidth = 3;
  for (let i = 0; i < 7; i++) { const a = Math.PI + (i + 0.5) * Math.PI / 7; c.beginPath(); c.moveTo(Math.cos(a) * 32, 10 + Math.sin(a) * 32); c.lineTo(Math.cos(a) * 46, 10 + Math.sin(a) * 46); c.stroke(); }
  c.fillStyle = '#3e6fb0'; c.fillRect(-45, 10, 90, 20);
  c.strokeStyle = '#bfe0ff'; c.lineWidth = 2;
  for (let y = 15; y < 30; y += 6) { c.beginPath(); c.moveTo(-45, y); for (let x = -45; x <= 45; x += 10) { c.quadraticCurveTo(x + 2.5, y - 3, x + 5, y); c.quadraticCurveTo(x + 7.5, y + 3, x + 10, y); } c.stroke(); }
  c.restore();
  c.lineWidth = 2.5; c.strokeStyle = '#111'; rr(c, -43, -53, 86, 82, 1); c.stroke();
  txt(c, 'PARIS', 0, 44, '30px Bangers, sans-serif', '#c0392b');
  c.fillStyle = 'rgba(255,240,170,.85)';
  [[-50, -60], [50, -60]].forEach(([x, y]) => { c.save(); c.translate(x, y); c.rotate(x < 0 ? -0.6 : 0.6); c.fillRect(-12, -5, 24, 10); c.restore(); });
}
function drawMona(c) {
  comicShape(c, () => rr(c, -40, -50, 80, 100, 3), '#d9a632');
  c.lineWidth = 2; c.strokeStyle = '#111'; c.fillStyle = '#a87b17'; rr(c, -32, -42, 64, 84, 2); c.fill(); c.stroke();
  c.save(); rr(c, -28, -38, 56, 76, 1); c.clip();
  const g = c.createLinearGradient(0, -38, 0, 38); g.addColorStop(0, '#8fa070'); g.addColorStop(1, '#4d5a35'); c.fillStyle = g; c.fillRect(-30, -40, 60, 80);
  c.fillStyle = '#2e2016'; c.beginPath(); c.ellipse(0, -12, 15, 19, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.moveTo(-26, 40); c.quadraticCurveTo(-24, 6, 0, 4); c.quadraticCurveTo(24, 6, 26, 40); c.closePath(); c.fill();
  c.fillStyle = '#e7bd86'; c.beginPath(); c.ellipse(0, -12, 10, 13, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.moveTo(-8, 8); c.lineTo(8, 8); c.lineTo(0, 18); c.closePath(); c.fill();
  c.beginPath(); c.ellipse(-4, 30, 9, 4, 0.2, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#111'; c.lineWidth = 1.3; c.beginPath(); c.ellipse(0, -12, 10, 13, 0, 0, Math.PI * 2); c.stroke();
  c.beginPath(); c.moveTo(-3.5, -5); c.quadraticCurveTo(0, -3.5, 3.5, -5); c.stroke();
  c.fillStyle = '#111'; c.fillRect(-5, -15, 2.4, 1.6); c.fillRect(2.6, -15, 2.4, 1.6);
  c.restore();
}

defineChapter({
  key: 'comic', order: 5,
  name: { zh: "漫畫街角", en: "Comic Corners" },
  blurb: { zh: "世界各地的街頭，畫成一格一格的漫畫。", en: "Streets around the world, drawn panel by panel." },
  style: { zh: "漫畫風", en: "Comic" },
  narrator: { zh: "對話框", en: "Speech Bubble" },
  song: 'fr',
    comments: {
      far: [{ zh: ["砰！大失敗！", "這一格漫畫畫歪了，作者要重畫了啦！"], en: ["KA-BOOM! Fail!", "This panel's crooked. The artist has to redraw it!"] }, { zh: ["咦咦咦？！", "艾菲爾鐵塔斜得比比薩還厲害。"], en: ["Wha-what?!", "The Eiffel Tower leans more than Pisa now."] }],
      close: [{ zh: ["待續…", "就差一格！下一集一定會成功！"], en: ["To be continued…", "One panel short! Next episode, for sure!"] }, { zh: ["好可惜！", "對話框只來得及說出「Bonj…」"], en: ["So close!", "Speech Bubble only got as far as 'Bonj…'"] }],
      pass: [{ zh: ["過關！咻！", "勉強畫完這一頁，編輯說可以先交稿。"], en: ["Cleared! Whoosh!", "Page done. The editor says submit it for now."] }, { zh: ["及格啦！", "咖啡館招牌還有點斜，但咖啡很香。"], en: ["Passing grade!", "Café sign's a bit off, but the coffee smells great."] }],
      good: [{ zh: ["漂亮的分鏡！", "每一格都整整齊齊，讀者大聲叫好！"], en: ["Nice paneling!", "Every panel lined up. Readers cheer out loud!"] }, { zh: ["巴黎好心情", "路燈亮起來，連蒙娜麗莎都笑得更開了。"], en: ["Happy Paris", "Streetlights glow. Even Mona Lisa smiles wider."] }],
      perfect: [{ zh: ["完美跨頁♪", "一度都不差！這一頁要放進漫畫史冊！"], en: ["Perfect spread♪", "Not one degree off! This page goes into comic history!"] }, { zh: ["Bonjour 冠軍！", "對話框開心到自己變成金色了。"], en: ["Bonjour champ!", "Speech Bubble turned gold with joy."] }],
    },
  stages: [
    { key: 'fr', title: { zh: "巴黎早安", en: "Bonjour Paris" }, place: { zh: "法國 巴黎", en: "Paris, France" },
      intro: { zh: "7 件東西。其中一件只歪了一點點，你看得出來是哪一件嗎？", en: "Seven things. One is only slightly off. Can you spot which?" },
      bg: bgParis,
      objects: [
      { id: 'eiffel', name: { zh: '艾菲爾鐵塔', en: 'Eiffel Tower' }, x: 285, y: 190, w: 110, h: 250, mag: 8, draw: drawEiffel, sfx: 'bell' },
      { id: 'rue', name: { zh: '路牌', en: 'Street sign' }, x: 110, y: 90, w: 160, h: 46, near: true, draw: drawRue, sfx: 'bell' },
      { id: 'cafe', name: { zh: '咖啡館招牌', en: 'Café sign' }, x: 110, y: 200, w: 160, h: 84, mag: 12, draw: drawCafe, sfx: 'pop' },
      { id: 'bubble', name: { zh: '對話框', en: 'Speech bubble' }, x: 110, y: 318, w: 150, h: 70, mag: 16, draw: drawBubble, sfx: 'boing' },
      { id: 'lamp', name: { zh: '路燈', en: 'Streetlight' }, x: 215, y: 370, w: 40, h: 150, mag: 9, pad: 14, draw: drawLamp, sfx: 'boing' },
      { id: 'poster', name: { zh: '海報', en: 'Poster' }, x: 300, y: 400, w: 100, h: 120, mag: 10, draw: drawPoster, sfx: 'pop' },
      { id: 'mona', name: { zh: '名畫', en: 'Masterpiece' }, x: 90, y: 420, w: 80, h: 100, mag: 5, draw: drawMona, sfx: 'wood' }
      ] },
  ],
});
