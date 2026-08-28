/* Flappy Bird — simple canvas game. No dependencies. */
(function () {
  'use strict';

  var canvas = document.getElementById('game');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  // --- Tunables (logical 360x640 view, scaled to device) ---
  var W = 360, H = 640;
  var GROUND_H = 90;
  var GRAVITY = 1500;      // px/s^2
  var FLAP_V = -420;       // px/s impulse
  var SPEED = 140;         // world scroll px/s
  var PIPE_W = 60;
  var GAP = 165;
  var SPAWN_EVERY = 1.45;  // seconds between pipes
  var BIRD_R = 13;
  var BIRD_X = 110;
  var MAX_DT = 0.033;

  var READY = 'ready', PLAYING = 'playing', OVER = 'over';

  var state = READY;
  var bird = { y: H * 0.42, v: 0 };
  var pipes = [];
  var score = 0;
  var spawnTimer = 0;
  var elapsed = 0; // total time, for cosmetic animation

  var best = 0;
  try { best = Number(localStorage.getItem('flappy-best')) || 0; } catch (e) { /* storage blocked */ }

  function storeBest() {
    try { localStorage.setItem('flappy-best', String(best)); } catch (e) { /* storage blocked */ }
  }

  function reset() {
    state = READY;
    bird.y = H * 0.42;
    bird.v = 0;
    pipes = [];
    score = 0;
    spawnTimer = 0;
  }

  function flap() {
    if (state === READY) state = PLAYING;
    if (state === PLAYING) {
      bird.v = FLAP_V;
    } else if (state === OVER) {
      reset();
    }
  }

  function spawnPipe() {
    var margin = 70;
    var lo = margin;
    var hi = H - GROUND_H - GAP - margin;
    var gapY = lo + Math.random() * (hi - lo);
    pipes.push({ x: W + PIPE_W, gapY: gapY, passed: false });
  }

  function circleRect(cx, cy, r, rx, ry, rw, rh) {
    var nx = Math.min(Math.max(cx, rx), rx + rw);
    var ny = Math.min(Math.max(cy, ry), ry + rh);
    var dx = cx - nx, dy = cy - ny;
    return dx * dx + dy * dy < r * r;
  }

  function die() {
    state = OVER;
    if (score > best) { best = score; storeBest(); }
  }

  function update(dt) {
    elapsed += dt;
    if (state !== PLAYING) return;

    bird.v += GRAVITY * dt;
    bird.y += bird.v * dt;

    spawnTimer += dt;
    if (spawnTimer >= SPAWN_EVERY) { spawnTimer -= SPAWN_EVERY; spawnPipe(); }

    var floorY = H - GROUND_H;
    var i, p;
    for (i = pipes.length - 1; i >= 0; i--) {
      p = pipes[i];
      p.x -= SPEED * dt;
      if (p.x + PIPE_W <= 0) { pipes.splice(i, 1); continue; }
      if (!p.passed && p.x + PIPE_W < BIRD_X - BIRD_R) { p.passed = true; score++; }
      if (circleRect(BIRD_X, bird.y, BIRD_R, p.x, 0, PIPE_W, p.gapY) ||
          circleRect(BIRD_X, bird.y, BIRD_R, p.x, p.gapY + GAP, PIPE_W, floorY - (p.gapY + GAP))) {
        die();
        return;
      }
    }

    if (bird.y + BIRD_R >= floorY) { bird.y = floorY - BIRD_R; die(); return; }
    if (bird.y - BIRD_R < 0) { bird.y = BIRD_R; bird.v = 0; }
  }

  // --- Drawing ---
  function centerText(txt, y, size, fill, stroke) {
    ctx.font = 'bold ' + size + 'px "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = Math.max(2, size / 12);
      ctx.lineJoin = 'round';
      ctx.strokeText(txt, W / 2, y);
    }
    ctx.fillStyle = fill;
    ctx.fillText(txt, W / 2, y);
  }

  function blob(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.arc(x + r * 0.9, y + 4, r * 0.7, 0, Math.PI * 2);
    ctx.arc(x - r * 0.9, y + 5, r * 0.65, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawClouds() {
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    var cs = [[60, 110, 26], [210, 170, 20], [300, 90, 24], [150, 260, 16]];
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      var cx = (c[0] - elapsed * 12) % (W + 80);
      if (cx < -40) cx += W + 80;
      blob(cx, c[1], c[2]);
    }
  }

  function drawPipes() {
    var floorY = H - GROUND_H;
    for (var i = 0; i < pipes.length; i++) {
      var p = pipes[i];
      var bottomY = p.gapY + GAP;
      ctx.fillStyle = '#22c55e';
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 3;
      // top pipe body + lip
      ctx.fillRect(p.x, -8, PIPE_W, p.gapY + 8);
      ctx.strokeRect(p.x, -8, PIPE_W, p.gapY + 8);
      ctx.fillRect(p.x - 4, p.gapY - 14, PIPE_W + 8, 14);
      ctx.strokeRect(p.x - 4, p.gapY - 14, PIPE_W + 8, 14);
      // bottom pipe body + lip
      ctx.fillRect(p.x, bottomY, PIPE_W, floorY - bottomY + 8);
      ctx.strokeRect(p.x, bottomY, PIPE_W, floorY - bottomY + 8);
      ctx.fillRect(p.x - 4, bottomY, PIPE_W + 8, 14);
      ctx.strokeRect(p.x - 4, bottomY, PIPE_W + 8, 14);
    }
  }

  function drawGround() {
    var gy = H - GROUND_H;
    ctx.fillStyle = '#d97706'; // dirt
    ctx.fillRect(0, gy, W, GROUND_H);
    ctx.fillStyle = '#65a30d'; // grass strip
    ctx.fillRect(0, gy, W, 12);
    ctx.fillStyle = 'rgba(0,0,0,0.08)'; // scrolling stripes
    var off = (elapsed * SPEED * 0.35) % 24;
    for (var x = -off; x < W; x += 24) ctx.fillRect(x, gy + 12, 12, 6);
  }

  function drawBird() {
    var rot = Math.max(-0.45, Math.min(1.1, bird.v / 500));
    ctx.save();
    ctx.translate(BIRD_X, bird.y);
    ctx.rotate(rot);
    // body
    ctx.fillStyle = '#fbbf24';
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, BIRD_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // wing (flaps)
    var wing = Math.sin(elapsed * 14) * 4;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(-4, 2 + wing * 0.4, 7, 4.5 + wing * 0.3, -0.3, 0, Math.PI * 2);
    ctx.fill();
    // eye
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(5, -4, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(6.5, -4, 1.8, 0, Math.PI * 2); ctx.fill();
    // beak
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(9, 1); ctx.lineTo(17, 3); ctx.lineTo(9, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function draw() {
    var sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(1, '#bae6fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    drawClouds();
    drawPipes();
    drawGround();
    drawBird();

    if (state === PLAYING) {
      centerText(String(score), 84, 44, '#fff', '#0f172a');
    } else if (state === READY) {
      centerText('Flappy Bird', H * 0.30, 40, '#fff', '#0f172a');
      centerText('Tap, click or press Space', H * 0.30 + 44, 18, '#0f172a', null);
      if (best > 0) centerText('Best: ' + best, H * 0.30 + 76, 18, '#0f172a', null);
    } else {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
      ctx.fillRect(0, 0, W, H);
      centerText('Game Over', H * 0.34, 38, '#fff', '#0f172a');
      centerText('Score: ' + score, H * 0.34 + 46, 24, '#fde68a', null);
      centerText('Best: ' + best, H * 0.34 + 80, 20, '#fff', null);
      centerText('Tap to try again', H * 0.34 + 122, 16, '#cbd5e1', null);
    }
  }

  // --- Loop ---
  var raf = (typeof window.requestAnimationFrame === 'function')
    ? window.requestAnimationFrame.bind(window)
    : function (cb) { return setTimeout(function () { cb(Date.now()); }, 16); };

  var last = 0;
  function frame(now) {
    var dt = Math.max(0, Math.min((now - last) / 1000, MAX_DT));
    last = now;
    update(dt);
    draw();
    raf(frame);
  }

  // --- Input ---
  function press(e) {
    if (e && e.type === 'keydown') {
      if (e.repeat) return;
      var k = e.code || e.key;
      if (k !== 'Space' && k !== 'ArrowUp' && k !== 'KeyW') return;
      e.preventDefault(); // stop the page from scrolling on Space
    }
    flap();
  }

  if (typeof window.PointerEvent !== 'undefined') {
    document.addEventListener('pointerdown', press);
  } else {
    document.addEventListener('mousedown', press);
    document.addEventListener('touchstart', press, { passive: true });
  }
  window.addEventListener('keydown', press);

  // --- Boot ---
  function fit() {
    var dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  fit();
  reset();
  last = (typeof performance !== 'undefined' && performance.now) ? performance.now() : 0;
  raf(frame);

  // Small hook for smoke tests (harmless in production).
  window.__flappy = {
    flap: flap,
    reset: reset,
    getState: function () { return state; },
    getScore: function () { return score; },
    getBest: function () { return best; },
    getBirdY: function () { return bird.y; },
    pipeCount: function () { return pipes.length; }
  };
})();
