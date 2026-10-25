# Writing a world for 差一度 / Just One Degree

The game is built from `game/core.html` (engine, UI, sounds, music) and one
file per world in `game/chapters/NN-key.js`. `node game/build.mjs` pastes every
world into the core and writes `public/game/index.html`. **Never edit
`public/game/index.html` by hand**; edit the sources and rebuild.

Each world file runs in its own scope (the build wraps it in `(() => { … })()`),
so any helper you declare is private to that world. A world file contains its
art (functions that draw on a canvas) and one `defineChapter({...})` call.

## Check your work

```
node game/tools/check-chapter.mjs <world-key>             # rules + contact sheet
node game/tools/check-chapter.mjs <world-key> --stage 4   # + full-size pictures of stage 4
```

- Errors (✗) must be fixed. Warnings (·) should be fixed unless you have a reason.
- Look at `test-results/chapters/<key>/sheet.png` every time: each stage is
  shown scrambled (Chinese) and aligned with hit boxes (English). Use
  `--stage N` for a close look. The aligned picture should look *right*: every
  object level and in place, nothing clipped, boxes tightly around the art.
- The checker also plays every stage with a perfect bot in both languages,
  renders every sound, catches Chinese text left on the canvas in English mode,
  and times how long the objects take to draw.

## The stage object

```js
{ key: 'kelp',                                   // unique in the whole game, lowercase
  title: { zh: '海草森林', en: 'Kelp Forest' },   // zh ≤ 8 characters, en ≤ 24
  place: { zh: '美國 加州外海', en: 'Off California, USA' },
  intro: { zh: '…', en: '…' },                   // one or two short sentences: what is special here
  bg: bgKelp,                                    // draws the background once, in 360×480 units
  lowres: true,                                  // optional: bg is drawn on a 90×120 canvas and scaled up (pixel art)
  overlay: ovKelp,                               // optional: drawn over the objects every frame (grain, light). Keep cheap.
  animated: true,                                // set when any object has a habit or draw() uses a.t
  objects: [ … ] }
```

Do not set `time`: times are calibrated by simulation afterwards
(`game/times.json`). Do not set `song`: every stage uses its world's music.

## Objects

```js
{ id: 'seal',                                    // unique within the stage
  name: { zh: '海豹', en: 'Seal' },               // shown in the loupe: zh ≤ 7 chars, en ≤ 20
  x: 120, y: 300,                                // centre, in the 360×480 stage
  w: 90, h: 60,                                  // hit box, centred on x/y. Tight around the art.
  mag: 9,                                        // how far it starts tilted (degrees, 4-16)
  near: true,                                    // instead of mag: starts only ~1° off (the sneaky one)
  draw: drawSeal,                                // draw(c, a) at the origin, unrotated
  habit: (t, l) => ({ dx: Math.sin(t) * 3 * l, dy: 0 }), // optional idle motion, creatures only
  call: 'seal' | sfx: 'bell',                     // exactly one (see Sounds)
  link: { to: 'otherId', k: 0.6 },               // optional: turning this also turns 'otherId' by k×
  trap: true, keep: 4, trapNote: { zh, en },     // optional trap (see Traps)
}
```

- `draw(c, a)`: draw centred on (0, 0), level (the engine rotates it). Stay
  inside the `w × h` box. `a.t` is seconds (for small idle wiggles), `a.live`
  goes from 1 to 0 once the object is aligned: multiply idle motion by it so
  aligned things settle down. The engine wraps each draw in save/restore.
- Draw functions must be **deterministic**: no `Math.random()` (use a fixed
  table or a hash like `Math.sin(i * 12.9898) * 43758.5453 % 1`).
- Keep `draw` cheap. Heavy work (gradients over the whole stage, hundreds of
  shapes, textures) belongs in `bg`, which is drawn once and cached.
- Hit boxes may overlap a little (≤ 8% is fine, > 20% is an error). Leave
  breathing room between objects; a phone finger is ~40 units wide here.
- Objects must not leave the stage (keep 6+ units from the edges).

## Difficulty ramp inside a world (stage 1 already exists)

| stage | objects to straighten | near-straight | links | traps |
|---|---|---|---|---|
| 2 | 4 | 1 | – | – |
| 3 | 4-5 | 1 | – | – |
| 4 | 5 | 1 | 1 pair | – |
| 5 | 5-6 | 1 | 1 pair | optional |
| 6 | 6 | 2 | 1 pair | optional |
| 7 | 6-7 | 2 | 1 pair | optional |
| 8 | 7 | 2 | 1-2 pairs | optional |
| 9 | 7-8 | 2 | 1-2 pairs | optional |
| 10 | 8-9 | 2 | 2 pairs | optional |

- Vary `mag` within a stage (e.g. 5, 7, 9, 12, 14): big tilts are easy to see,
  small ones are the real test. Later stages lean on smaller tilts.
- A link makes sense in the scene: two shutters on one window, two ends of a
  banner, a seesaw's two seats. Name both objects so the toast reads well
  ("Turning Left shutter also turns Right shutter").
- Traps: at most one per stage and two or three per world, from stage 5 on.
  A trap is something that **really is meant to be tilted** (a leaning tower, a
  slide, a ski ramp, a sundial's gnomon). The player wins +200 by leaving it
  alone. `keep` is its true lean in degrees (≥ 2), `trapNote` says why, and must
  be true. If you are not sure of a fact, do not use it.
- One stage per world can use `target` (a non-zero correct angle) only if the
  scene makes it obvious (e.g. a clock's hand pointing at 3); otherwise skip it.

## Sounds (all Q style: cute, short, sine + soft overtone)

- Creatures and characters use `call`, other things use `sfx`. Every
  non-trap object has exactly one. A thing's pitch follows its order in the
  stage, so aligning objects one by one plays a little tune.
- Built in: creatures `chick moo oink baa bubble turtle whale squish clack honk
  camel carousel radio`; things `bell wood pop boing twinkle beep jingle shimmer
  clunk meow`.
- New sounds go in your world file. Prefix the key with your world key so two
  worlds never clash:

```js
const { q, note, puff } = QS;
defineCreatureSound('polar_seal', (ac, o, t) => {
  q(ac, o, t, [[0, 700], [0.08, 1000], [0.3, 760]], 0.32, { vib: [9, 25], vol: 0.4 });
});
defineThingSound('polar_ice', (ac, o, t, r) => {   // r: pitch ratio, multiply your Hz by it
  note(ac, o, t, 2200 * r, 0.12); note(ac, o, t + 0.07, 2900 * r, 0.16, 0.25);
});
```

  `q(ac, out, t, [[time, Hz], …], duration, { vol ≤ 0.45, vib: [rate, depth],
  trem: [rate, depth], attack, hold, over })` glides between the points.
  `note(ac, out, t, Hz, dur, vol)` is a short bell-like note. `puff(ac, out, t,
  dur, filterHz, vol)` is a breath of filtered noise. Keep sounds under ~0.9 s,
  mostly in the 400-3000 Hz range: cute, never harsh or scary.

## Text

- Every word drawn on the canvas goes through `T('中文', 'English')`.
- Text that is genuinely local in the scene (a Japanese shop sign in Kyoto)
  can stay as is in both languages: wrap it in `LOCAL('ラーメン')`.
- Fonts loaded by the page: `Noto Sans TC`, `Noto Serif TC`, `JetBrains Mono`,
  `Bangers`, `Caveat`, `DotGothic16`, `Playfair Display`. A web font may not be
  ready on the very first frame, so always give a fallback family.
- Copy tone: short, warm, a little playful. Traditional Chinese (Taiwan usage).
  English is natural English, not a word-for-word translation. Places are real.

## Shared helpers (from the core)

`W, H` (360, 480) · `T(zh, en)` · `LOCAL(s)` · `QS` (`q, note, puff`) ·
`rr(c, x, y, w, h, r)` rounded-rect path · `txt(c, s, x, y, font, color, align)`
· `ell(c, x, y, rx, ry, fill, rot)` · `circ(c, x, y, r, fill)` ·
`poly(c, [x1, y1, x2, y2, …], fill)` · `groundShadow(c, y, rx)` ·
`pxSprite(c, w, h, fn)` pixel sprite helper · `comicShape(c, path, fill, lw,
shadow)` · `softShadow(c, on)` · `GRAIN` film-grain canvas (360×480, ready before any drawing)
· `KPX` device pixels per unit (for shadow blur sizes) ·
`defineCreatureSound`, `defineThingSound`.

Look at the world's existing stage 1 for its style and helpers, and reuse them.
