// Checks one world file and draws a contact sheet you can look at.
//   node game/tools/check-chapter.mjs polar            → checks + sheet
//   node game/tools/check-chapter.mjs polar --stage 4  → also full-size pictures of stage 4
//   node game/tools/check-chapter.mjs --all            → every world, no pictures
// Pictures land in test-results/chapters/<key>/. Exit code 1 when there are errors.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const argv = process.argv.slice(2);
const all = argv.includes('--all');
const stageArg = argv.includes('--stage') ? +argv[argv.indexOf('--stage') + 1] : null;
const keys = all
  ? readdirSync(join(root, 'game', 'chapters')).filter(f => /^\d\d-[a-z]+\.js$/.test(f)).map(f => f.replace(/^\d\d-|\.js$/g, ''))
  : [argv.find(a => !a.startsWith('--') && !/^\d+$/.test(a))];
if (!keys[0]) { console.error('usage: node game/tools/check-chapter.mjs <world-key> [--stage N] | --all'); process.exit(2); }

const CJK = /[぀-ヿ㐀-鿿＀-￯]/;
const lenZh = s => [...s].length;
let failed = false;

const browser = await chromium.launch();
for (const key of keys) {
  const out = join(root, 'test-results', 'chapters', key);
  mkdirSync(out, { recursive: true });
  const file = join(out, 'build.html');
  execFileSync('node', [join(root, 'game', 'build.mjs'), '--only', key, '--out', file], { stdio: 'pipe' });
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) pageErrors.push(m.text()); });
  await page.route(/^https?:/, r => r.fulfill({ status: 200, body: '' }));
  // Record every string drawn on a canvas, to catch untranslated text.
  await page.addInitScript(() => {
    window.__drawn = new Set();
    const f = CanvasRenderingContext2D.prototype.fillText, s = CanvasRenderingContext2D.prototype.strokeText;
    CanvasRenderingContext2D.prototype.fillText = function (t, ...a) { window.__drawn.add(String(t)); return f.call(this, t, ...a); };
    CanvasRenderingContext2D.prototype.strokeText = function (t, ...a) { window.__drawn.add(String(t)); return s.call(this, t, ...a); };
  });
  await page.goto('file://' + file);
  await page.waitForFunction(() => window.__chayidu);
  const errors = [], warns = [];
  const E = m => errors.push(m), Wn = m => warns.push(m);

  const raw = await page.evaluate(() => {
    const h = window.__chayidu;
    return { levels: h.levels(), chapters: h.chapters(), comments: h.comments(), kinds: h.soundKinds(), W: h.consts.W, H: h.consts.H };
  });
  const ch = raw.chapters[0], levels = raw.levels, c = raw.comments[ch.key];
  const both = (x, what) => { if (!x || typeof x.zh !== 'string' || typeof x.en !== 'string' || !x.zh.trim() || !x.en.trim()) E(`${what}: needs non-empty { zh, en }`); };
  both(ch.names, 'world name'); both(ch.blurb, 'world blurb'); both(ch.style, 'world style'); both(ch.narrator, 'world narrator');
  if (levels.length !== 10) (all ? E : Wn)(`world has ${levels.length} stages (want 10)`);
  for (const tier of ['far', 'close', 'pass', 'good', 'perfect']) {
    const list = c.tiers[tier] || [];
    if (list.length < 2) E(`comments.${tier}: needs at least 2 lines`);
    list.forEach((x, j) => {
      if (!Array.isArray(x.zh) || x.zh.length !== 2 || !Array.isArray(x.en) || x.en.length !== 2) { E(`comments.${tier}[${j}]: needs zh:[headline, line] and en:[headline, line]`); return; }
      if (lenZh(x.zh[0]) > 14 || lenZh(x.zh[1]) > 30) E(`comments.${tier}[${j}]: zh too long (headline ≤14, line ≤30)`);
      if (x.en[0].length > 26 || x.en[1].length > 72) E(`comments.${tier}[${j}]: en too long (headline ≤26, line ≤72)`);
    });
  }

  const sounds = new Set();
  levels.forEach((L, s) => {
    const at = `stage ${s + 1} (${L.key})`;
    if (!/^[a-z][a-z0-9-]*$/.test(L.key)) E(`${at}: key must be lowercase letters/digits/-`);
    if (levels.filter(x => x.key === L.key).length > 1) E(`${at}: duplicate key`);
    both(L.titles, `${at} title`); both(L.place, `${at} place`); both(L.intro, `${at} intro`);
    if (L.titles?.zh && lenZh(L.titles.zh) > 8) E(`${at}: zh title longer than 8 characters`);
    if (L.titles?.en && L.titles.en.length > 24) E(`${at}: en title longer than 24 characters`);
    const objs = L.objects, play = objs.filter(o => !o.trap), traps = objs.filter(o => o.trap);
    const wantMin = Math.min(9, 3 + Math.floor(s / 2)), wantMax = Math.min(9, 5 + Math.floor(s / 2));
    if (play.length < 3 || play.length > 9) E(`${at}: ${play.length} objects to straighten (allowed 3-9)`);
    else if (s > 0 && (play.length < wantMin || play.length > wantMax)) Wn(`${at}: ${play.length} objects; the ramp suggests ${wantMin}-${wantMax}`);
    const nearN = play.filter(o => o.near).length, wantNear = s >= 5 ? 2 : 1;
    if (nearN < 1 || nearN > 2) E(`${at}: ${nearN} near-straight objects (want ${wantNear})`);
    else if (s > 0 && nearN !== wantNear) Wn(`${at}: ${nearN} near-straight objects (want ${wantNear})`);
    if (traps.length > 1) E(`${at}: at most one trap per stage`);
    if (s >= 3 && s > 0 && !objs.some(o => o.link)) Wn(`${at}: no linked pair (stages 4-10 should have one)`);
    const ids = new Set();
    for (const o of objs) {
      const oa = `${at} · ${o.id}`;
      if (ids.has(o.id)) E(`${oa}: duplicate id`); ids.add(o.id);
      both(o.names, `${oa} name`);
      if (o.names?.zh && lenZh(o.names.zh) > 7) Wn(`${oa}: zh name over 7 characters (it shows in the loupe)`);
      if (o.names?.en && o.names.en.length > 20) Wn(`${oa}: en name over 20 characters (it shows in the loupe)`);
      if (![o.x, o.y, o.w, o.h].every(Number.isFinite)) { E(`${oa}: x/y/w/h must be numbers`); continue; }
      if (o.x - o.w / 2 < 2 || o.x + o.w / 2 > raw.W - 2 || o.y - o.h / 2 < 2 || o.y + o.h / 2 > raw.H - 2) E(`${oa}: box leaves the 360×480 stage`);
      if (Math.min(o.w, o.h) < 20 || o.w * o.h < 1800) E(`${oa}: box ${o.w}×${o.h} is too small to grab on a phone (min side 20, area 1800)`);
      if (o.trap) {
        if (o.call || o.sfx) E(`${oa}: a trap has no sound`);
        if (!Number.isFinite(o.keep) || Math.abs(o.keep) < 2) E(`${oa}: a trap needs keep (its real lean, at least 2°)`);
        continue;
      }
      if (!!o.call === !!o.sfx) E(`${oa}: needs exactly one of call (creature) or sfx (thing)`);
      if (o.call && !raw.kinds.creature.includes(o.call)) E(`${oa}: unknown creature sound '${o.call}'`);
      if (o.sfx && !raw.kinds.thing.includes(o.sfx)) E(`${oa}: unknown thing sound '${o.sfx}'`);
      if (o.call) sounds.add('creature:' + o.call); if (o.sfx) sounds.add('thing:' + o.sfx);
      if (!o.near && !(o.mag >= 4 && o.mag <= 16)) E(`${oa}: mag must be 4-16 (or set near: true)`);
      if (o.habit && !o.call) Wn(`${oa}: moves (habit) but has no creature call`);
      if (o.link) {
        const t = objs.find(x => x.id === o.link.to);
        if (!t) E(`${oa}: link.to '${o.link.to}' does not exist`);
        else if (t.trap || t.link) E(`${oa}: link target must be a plain object (no trap, no link of its own)`);
        if (!(o.link.k >= 0.3 && o.link.k <= 1)) E(`${oa}: link.k must be 0.3-1`);
      }
    }
    for (let a = 0; a < objs.length; a++) for (let b = a + 1; b < objs.length; b++) {
      const p = objs[a], q = objs[b];
      const ix = Math.max(0, Math.min(p.x + p.w / 2, q.x + q.w / 2) - Math.max(p.x - p.w / 2, q.x - q.w / 2));
      const iy = Math.max(0, Math.min(p.y + p.h / 2, q.y + q.h / 2) - Math.max(p.y - p.h / 2, q.y - q.h / 2));
      const share = ix * iy / Math.min(p.w * p.h, q.w * q.h);
      if (share > 0.2) E(`${at}: ${p.id} and ${q.id} overlap ${(share * 100).toFixed(0)}% (max 20%)`);
      else if (share > 0.08) Wn(`${at}: ${p.id} and ${q.id} overlap ${(share * 100).toFixed(0)}%`);
    }
  });

  // Every sound renders, and is audible.
  for (const sk of sounds) {
    const [g, k] = sk.split(':');
    const r = await page.evaluate(([g, k]) => window.__chayidu.renderSound(g, k, 1), [g, k]);
    if (r.bad || r.peak < 0.05 || r.seconds < 0.03 || r.seconds > 1.2) E(`sound ${sk}: peak ${r.peak.toFixed(2)}, ${r.seconds.toFixed(2)}s (want audible, under 1.2s)`);
  }

  // Redrawing a stage must stay cheap: animated stages redraw every frame on a phone.
  for (let i = 0; i < levels.length; i++) {
    const ms = await page.evaluate(i => window.__chayidu.benchScene(i, 40), i);
    // Animated stages redraw every frame; still ones only while you drag.
    const max = levels[i].animated ? 16 : 40;
    if (ms > max) E(`stage ${i + 1}: ${ms.toFixed(1)} ms per frame to draw the objects (max ${max} for a${levels[i].animated ? 'n animated' : ' still'} stage; keep heavy work in bg)`);
    else if (ms > max * 0.5) Wn(`stage ${i + 1}: ${ms.toFixed(1)} ms per frame to draw the objects (max ${max})`);
  }

  // A perfect player clears every stage with 3 stars, in both languages, and the overlays render.
  for (const lang of ['zh', 'en']) {
    await page.evaluate(l => { const h = window.__chayidu; h.setLang(l); h.quiet(true); h.manualClock(true); h.seed(7); h.setDifficulty('hard'); h.resetProgress(); window.__drawn.clear(); }, lang);
    for (let i = 0; i < levels.length; i++) {
      const r = await page.evaluate(i => {
        const h = window.__chayidu; h.start(i);
        const objs = h.levels()[i].objects;
        for (const o of [...objs.filter(o => o.link), ...objs.filter(o => !o.link)]) if (!o.trap) h.setAngle(o.id, o.target);
        for (const o of objs.filter(o => !o.link && !o.trap)) h.setAngle(o.id, o.target);
        h.release(); h.advance(0.5); h.done();
        const st = h.state(); const r = st.lastResult || {};
        const html = document.querySelector('#ovResult').innerText;
        h.home();
        return { win: r.win, stars: r.stars, html };
      }, i);
      if (!r.win || r.stars !== 3) E(`stage ${i + 1} (${lang}): a perfect player did not get 3 stars (win ${r.win}, stars ${r.stars})`);
      if (lang === 'en' && CJK.test(r.html.replace(/中文/g, ''))) E(`stage ${i + 1}: Chinese text on the English result screen: ${r.html.match(/.{0,20}[㐀-鿿].{0,20}/)?.[0]}`);
    }
    for (let i = 0; i < levels.length; i++) await page.evaluate(i => { const h = window.__chayidu; h.scene(i, {}); h.scene(i, { aligned: true }); }, i);
    if (lang === 'en') {
      const [drawn, local] = await page.evaluate(() => [[...window.__drawn], window.__chayidu.localText()]);
      const zh = drawn.filter(t => CJK.test(t) && !local.includes(t));
      if (zh.length) E(`Chinese text drawn on the canvas in English mode (wrap it in T('中文', 'English')): ${zh.slice(0, 6).join(' | ')}`);
    }
  }
  await page.evaluate(() => window.__chayidu.setLang('zh'));

  if (!all) {
    // Contact sheet: each stage scrambled (Chinese) beside aligned with hit boxes (English).
    const tiles = [];
    for (let i = 0; i < levels.length; i++) {
      tiles.push(await page.evaluate(i => { window.__chayidu.setLang('zh'); return window.__chayidu.scene(i, { scale: 0.5 }); }, i));
      tiles.push(await page.evaluate(i => { window.__chayidu.setLang('en'); return window.__chayidu.scene(i, { scale: 0.5, aligned: true, boxes: true }); }, i));
    }
    const sheet = await page.evaluate(async ({ tiles, names }) => {
      const cols = 4, tw = 180, th = 240, pad = 14, rows = Math.ceil(tiles.length / cols);
      const c = document.createElement('canvas'); c.width = cols * tw; c.height = rows * (th + pad);
      const g = c.getContext('2d'); g.fillStyle = '#222'; g.fillRect(0, 0, c.width, c.height);
      for (let k = 0; k < tiles.length; k++) {
        const img = new Image(); img.src = tiles[k]; await img.decode();
        const x = (k % cols) * tw, y = Math.floor(k / cols) * (th + pad);
        g.drawImage(img, x, y + pad, tw, th);
        g.fillStyle = '#fff'; g.font = '11px sans-serif'; g.fillText(names[k >> 1] + (k % 2 ? ' · aligned' : ''), x + 3, y + 11);
      }
      return c.toDataURL('image/png');
    }, { tiles, names: levels.map((L, s) => `${s + 1} ${L.key}`) });
    writeFileSync(join(out, 'sheet.png'), Buffer.from(sheet.split(',')[1], 'base64'));
    if (stageArg) {
      const i = stageArg - 1;
      for (const [name, o, lang] of [['scrambled-zh', {}, 'zh'], ['aligned-en', { aligned: true }, 'en'], ['boxes', { aligned: true, boxes: true }, 'zh']]) {
        const png = await page.evaluate(([i, o, l]) => { window.__chayidu.setLang(l); return window.__chayidu.scene(i, Object.assign({ scale: 2 }, o)); }, [i, o, lang]);
        writeFileSync(join(out, `stage${stageArg}-${name}.png`), Buffer.from(png.split(',')[1], 'base64'));
      }
    }
  }
  for (const m of pageErrors) E('page error: ' + m);
  await page.close();

  console.log(`\n== ${key}: ${levels.length} stages · ${errors.length} errors · ${warns.length} warnings`);
  for (const m of errors) console.log('  ✗ ' + m);
  for (const m of warns) console.log('  · ' + m);
  if (!all) console.log(`  sheet: test-results/chapters/${key}/sheet.png${stageArg ? `  (+ stage${stageArg}-*.png)` : ''}`);
  if (errors.length) failed = true;
}
await browser.close();
process.exit(failed ? 1 : 0);
