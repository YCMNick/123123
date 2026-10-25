// Builds the single-file game public/game/index.html from game/core.html,
// every world in game/chapters/*.js and the calibrated times in game/times.json.
//   node game/build.mjs                 → public/game/index.html
//   node game/build.mjs --out x.html    → another file
//   node game/build.mjs --only polar    → only that world (for authoring and checks)
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : null; };
const out = arg('--out') || join(here, '..', 'public', 'game', 'index.html');
const only = (arg('--only') || '').split(',').filter(Boolean);

const core = readFileSync(join(here, 'core.html'), 'utf8');
const files = readdirSync(join(here, 'chapters')).filter(f => /^\d\d-[a-z]+\.js$/.test(f)).sort();
const picked = only.length ? files.filter(f => only.includes(f.replace(/^\d\d-|\.js$/g, ''))) : files;
if (!picked.length) throw new Error(`no world matches --only ${only.join(',')}`);

// Each world runs in its own scope so its helper names never clash with another world's.
const chapters = picked.map(f => {
  const src = readFileSync(join(here, 'chapters', f), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `/* ---------- game/chapters/${f} ---------- */\n(() => {\n${src.trimEnd()}\n})();`;
}).join('\n');
const times = JSON.stringify(JSON.parse(readFileSync(join(here, 'times.json'), 'utf8')));

// Optional config: game/store.config.json (unlock rules).
const optional = (name, fallback) => { try { return readFileSync(join(here, name), 'utf8').trim(); } catch { return fallback; } };
const storeCfg = JSON.stringify(JSON.parse(optional('store.config.json', '{ "freeAll": true, "price": "USD 4.99", "freeWorlds": 1, "adHours": 24 }')));
const MARKS = { '/*@@TIMES@@*/{}': times, '/*@@CHAPTERS@@*/': chapters, '/*@@STORE@@*/{ freeAll: true, price: \'USD 4.99\', freeWorlds: 1, adHours: 24 }': storeCfg };
let html = core;
for (const [m, v] of Object.entries(MARKS)) { if (html.split(m).length !== 2) throw new Error(`core.html needs exactly one ${m}`); html = html.replace(m, () => v); }
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log(`built ${out} · ${picked.length} worlds · ${(html.length / 1024).toFixed(0)} KB`);
