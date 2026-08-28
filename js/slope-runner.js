(function () {
  'use strict';

  var canvas = document.getElementById('slopeCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var W = canvas.width;
  var H = canvas.height;
  var state = 'menu';
  var left = false;
  var right = false;
  var last = 0;
  var distance = 0;
  var score = 0;
  var best = 0;
  var speed = 9;
  var playerX = 0;
  var velocityX = 0;
  var obstacles = [];
  var particles = [];
  var reduced = false;
  var storageKey = 'orr-slope-save';

  function get(id) { return document.getElementById(id); }

  try {
    var saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    best = Number(saved.best) || 0;
  } catch (error) {}

  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify({ best: best })); } catch (error) {}
  }

  function updateHud() {
    get('runnerScore').textContent = Math.floor(score);
    get('runnerBest').textContent = Math.floor(best);
    get('runnerHigh').textContent = Math.floor(best);
    get('runnerSpeed').textContent = (speed / 9).toFixed(1) + 'x';
    get('runnerDistance').textContent = Math.floor(distance / 10);
  }

  function makeObstacle(z) {
    return { z: z, x: (Math.random() - 0.5) * 290, width: 34 + Math.random() * 25, hit: false };
  }

  function start() {
    state = 'playing';
    distance = 0;
    score = 0;
    speed = 9;
    playerX = 0;
    velocityX = 0;
    obstacles = [];
    particles = [];
    for (var i = 0; i < 32; i++) obstacles.push(makeObstacle(260 + i * 190 + Math.random() * 90));
    updateHud();
  }

  function finish() {
    state = 'over';
    best = Math.max(best, Math.floor(score));
    save();
    for (var i = 0; i < 26; i++) particles.push({ x: playerX, y: H - 102, vx: (Math.random() - 0.5) * 260, vy: -Math.random() * 220, life: 1 });
    updateHud();
  }

  function project(obstacle) {
    var depth = obstacle.z - distance;
    if (depth < 18) return null;
    var scale = 650 / depth;
    return { x: W / 2 + (obstacle.x - playerX * 0.3) * scale, y: 270 + scale * 2, scale: scale };
  }

  function update(dt) {
    if (state !== 'playing') {
      particles.forEach(function (particle) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vy += 300 * dt;
        particle.life -= dt * 1.8;
      });
      particles = particles.filter(function (particle) { return particle.life > 0; });
      return;
    }

    var direction = (right ? 1 : 0) - (left ? 1 : 0);
    velocityX += direction * 720 * dt;
    velocityX *= Math.pow(0.001, dt);
    playerX += velocityX * dt;
    distance += speed * 60 * dt;
    speed = Math.min(25, speed + dt * 0.16);
    score = distance / 8;

    if (Math.abs(playerX) > 172) { finish(); return; }

    obstacles.forEach(function (obstacle) {
      if (obstacle.hit || Math.abs(obstacle.z - distance) > 32) return;
      if (Math.abs(obstacle.x - playerX) < obstacle.width / 2 + 18) {
        obstacle.hit = true;
        finish();
      }
    });

    var lastObstacle = obstacles[obstacles.length - 1];
    if (lastObstacle && distance > lastObstacle.z - 900) {
      for (var i = 0; i < 12; i++) obstacles.push(makeObstacle(lastObstacle.z + 190 + i * 190 + Math.random() * 90));
    }
    obstacles = obstacles.filter(function (obstacle) { return obstacle.z > distance - 100; });
    if (!reduced && Math.random() < dt * speed * 0.8) particles.push({ x: playerX, y: H - 100, vx: 0, vy: 30, life: 0.6 });
    updateHud();
  }

  function draw() {
    var gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, '#18285c');
    gradient.addColorStop(0.55, '#080e2b');
    gradient.addColorStop(1, '#02030b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    var horizon = 270;
    ctx.strokeStyle = '#42f5d044';
    ctx.lineWidth = 1;
    for (var row = 0; row < 12; row++) {
      var y = horizon + Math.pow(row / 11, 2) * 275;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    for (var column = -8; column <= 8; column++) {
      ctx.beginPath(); ctx.moveTo(W / 2 + column * 18, horizon); ctx.lineTo(W / 2 + column * 105, H); ctx.stroke();
    }

    ctx.fillStyle = '#111b3a';
    ctx.beginPath(); ctx.moveTo(W / 2 - 210, horizon); ctx.lineTo(W / 2 + 210, horizon); ctx.lineTo(W + 160, H); ctx.lineTo(-160, H); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#42f5d0';
    ctx.shadowBlur = reduced ? 0 : 14;
    ctx.shadowColor = '#42f5d0';
    ctx.beginPath(); ctx.moveTo(W / 2 - 210, horizon); ctx.lineTo(-160, H); ctx.moveTo(W / 2 + 210, horizon); ctx.lineTo(W + 160, H); ctx.stroke();
    ctx.shadowBlur = 0;

    obstacles.forEach(function (obstacle) {
      var point = project(obstacle);
      if (!point || point.x < -100 || point.x > W + 100) return;
      var size = Math.max(8, point.scale * obstacle.width);
      ctx.fillStyle = '#ff4f70';
      ctx.shadowBlur = reduced ? 0 : 18;
      ctx.shadowColor = '#ff4f70';
      ctx.fillRect(point.x - size / 2, point.y - Math.max(10, point.scale * 48), size, Math.max(10, point.scale * 48));
      ctx.shadowBlur = 0;
    });

    var playerY = H - 92;
    ctx.save();
    ctx.translate(W / 2, playerY);
    ctx.rotate(velocityX / 800);
    ctx.fillStyle = '#65f5ff';
    ctx.shadowBlur = reduced ? 0 : 28;
    ctx.shadowColor = '#65f5ff';
    ctx.beginPath(); ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-7, -8, 6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    particles.forEach(function (particle) {
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = '#65f5ff';
      ctx.fillRect(W / 2 + particle.x, particle.y, 4, 4);
    });
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('SLOPE', 24, 32);
    if (state !== 'playing') {
      ctx.fillStyle = '#050817dd'; ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center'; ctx.fillStyle = '#65f5ff'; ctx.font = 'bold 48px sans-serif';
      ctx.fillText(state === 'menu' ? 'SLOPE' : state === 'over' ? 'GAME OVER' : 'PAUSED', W / 2, 190);
      ctx.fillStyle = '#fff'; ctx.font = '18px monospace';
      ctx.fillText(state === 'menu' ? 'Press PLAY or Space to start' : state === 'over' ? 'Score ' + Math.floor(score) + ' · Press RESTART' : 'Press PAUSE to resume', W / 2, 235);
      ctx.textAlign = 'left';
    }
  }

  function frame(timestamp) {
    var dt = Math.min(0.033, (timestamp - last) / 1000 || 0);
    last = timestamp;
    update(dt);
    draw();
    requestAnimationFrame(frame);
  }

  function bindHold(id, direction) {
    var button = get(id);
    if (!button) return;
    button.addEventListener('pointerdown', function (event) { event.preventDefault(); window[direction] = true; });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (eventName) {
      button.addEventListener(eventName, function () { window[direction] = false; });
    });
  }

  bindHold('steerLeft', 'left');
  bindHold('steerRight', 'right');
  get('runnerPlay').addEventListener('click', start);
  get('runnerRestart').addEventListener('click', start);
  get('runnerPause').addEventListener('click', function () {
    if (state === 'playing') state = 'paused';
    else if (state === 'paused') state = 'playing';
  });
  document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') left = true;
    if (event.code === 'ArrowRight' || event.code === 'KeyD') right = true;
    if (event.code === 'Space') { event.preventDefault(); if (state !== 'playing') start(); }
    if (event.code === 'KeyP') get('runnerPause').click();
  });
  document.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') left = false;
    if (event.code === 'ArrowRight' || event.code === 'KeyD') right = false;
  });
  updateHud();
  requestAnimationFrame(frame);
}());
