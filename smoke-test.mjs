/*
 * Headless smoke test for js/game.js — run with: node smoke-test.mjs
 * Stubs the DOM/canvas, boots the game, pumps rAF frames, and asserts
 * the real loop: ready -> playing -> gravity -> pipes -> score -> game over -> restart.
 * Deterministic: Math.random is seeded so pipe gaps never overlap the test bird's path.
 */
const pendingRaf = { cb: null };
const docListeners = {};
const winListeners = {};

globalThis.window = globalThis;
globalThis.addEventListener = (type, fn) => { (winListeners[type] ||= []).push(fn); };
globalThis.PointerEvent = function PointerEvent() {};
globalThis.requestAnimationFrame = (cb) => { pendingRaf.cb = cb; return 1; };

const store = {};
globalThis.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
};

const noop = () => {};
const ctx2d = {
  setTransform: noop, fillRect: noop, strokeRect: noop, beginPath: noop,
  arc: noop, ellipse: noop, fill: noop, stroke: noop, fillText: noop,
  strokeText: noop, moveTo: noop, lineTo: noop, closePath: noop,
  save: noop, restore: noop, translate: noop, rotate: noop,
  createLinearGradient: () => ({ addColorStop: noop }),
};
const canvasStub = {
  width: 0, height: 0,
  getContext: () => ctx2d,
};
globalThis.document = {
  getElementById: (id) => (id === 'game' ? canvasStub : null),
  addEventListener: (type, fn) => { (docListeners[type] ||= []).push(fn); },
};

// Seed randomness: gapY = 192.5, so the safe gap spans y 192.5..357.5.
Math.random = () => 0.5;

await import('./js/game.js');

const g = globalThis.__flappy;
if (!g) { console.error('FAIL: game did not boot (no __flappy hook)'); process.exit(1); }

let t = 0;
function pump(seconds, step = 1 / 60) {
  for (let i = 0; i < Math.round(seconds / step); i++) {
    if (!pendingRaf.cb) { console.error('FAIL: no rAF frame scheduled'); process.exit(1); }
    t += step * 1000;
    const cb = pendingRaf.cb;
    pendingRaf.cb = null;
    cb(t);
  }
}
// Keeps the bird centered in the seeded gap: flap whenever it sinks below y=300.
function pumpFlapping(seconds) {
  for (let i = 0; i < Math.round(seconds * 60); i++) {
    if (g.getState() === 'playing' && g.getBirdY() > 300) g.flap();
    pump(1 / 60);
  }
}

function assert(cond, msg) {
  if (!cond) { console.error('FAIL:', msg); process.exit(1); }
  console.log('ok:', msg);
}

// 1. Boots into ready state.
assert(g.getState() === 'ready', 'starts in ready state');

// 2. Keyboard input starts the game (Space via window keydown listener).
winListeners.keydown[0]({ type: 'keydown', code: 'Space', preventDefault: noop });
assert(g.getState() === 'playing', 'Space keydown starts the game');

// 3. Gravity pulls the bird down (after the initial flap impulse rides out).
pump(0.35); // flap impulse carries the bird up for ~0.28s first
const y0 = g.getBirdY();
pump(0.35);
assert(g.getBirdY() > y0, 'bird falls under gravity');

// 4. Pipes spawn and scroll; score increments as they pass.
pumpFlapping(6.5);
assert(g.pipeCount() >= 2, 'pipes spawned and on screen (' + g.pipeCount() + ')');
assert(g.getScore() >= 1, 'score increments when pipes pass (score=' + g.getScore() + ')');

// 5. Stop flapping -> bird hits the floor -> game over, best saved.
pump(2);
assert(g.getState() === 'over', 'game over after hitting the ground');
assert(g.getBest() === g.getScore() && g.getScore() >= 1, 'best score recorded (' + g.getBest() + ')');
assert(store['flappy-best'] === String(g.getBest()), 'best score persisted to localStorage');

// 6. Tap (pointerdown) returns to ready, next tap restarts.
docListeners.pointerdown[0]({ type: 'pointerdown' });
assert(g.getState() === 'ready', 'tap after game over returns to ready');
winListeners.keydown[0]({ type: 'keydown', code: 'Space', preventDefault: noop });
assert(g.getState() === 'playing', 'restart works');

console.log('\nAll smoke tests passed.');
process.exit(0);
