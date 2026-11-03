"""Sleep Lab session manager and HTTP surface for the real simulator.

Controls start, pause, resume, stop and reset a background thread that advances the
mechanistic circuit from :mod:`neuro_ml.sleep_circuit`. Every value served to the
browser comes from that simulation; nothing is animated client-side. A terminated
thread is reported as ``stopped``, never as a completed run.
"""
from dataclasses import asdict
import json
import threading
import time
import traceback
import numpy as np
from .sleep_circuit import SleepCircuitConfig, SleepCircuitSimulation

STAGES = ('Wake', 'N1', 'N2', 'N3', 'REM')


class SleepLab:
    """One shared simulation session with explicit lifecycle states."""

    def __init__(self):
        self._lock = threading.Lock()
        self._thread = None
        self._stop = threading.Event()
        self._pause = threading.Event()
        self.state = 'idle'
        self.error = None
        self.sim = None
        self.config = None
        self.started_utc = None
        self.wall_seconds = 0.

    # -- lifecycle ----------------------------------------------------------
    def start(self, config=None):
        with self._lock:
            if self._thread and self._thread.is_alive():
                raise RuntimeError('A simulation is already running; stop or reset first')
            cfg = config or SleepCircuitConfig(duration_s=20., dt_ms=1.)
            self.config = cfg
            self.sim = SleepCircuitSimulation(cfg)
            self.error = None
            self._stop.clear()
            self._pause.clear()
            self.state = 'running'
            self.started_utc = time.time()
            self._thread = threading.Thread(target=self._run, name='sleep-lab', daemon=True)
            self._thread.start()
            return self.status()

    def _run(self):
        started = time.perf_counter()
        try:
            while not self._stop.is_set() and self.sim.time_s < self.config.duration_s:
                if self._pause.is_set():
                    self.state = 'paused'
                    time.sleep(.05)
                    continue
                self.state = 'running'
                self.sim.advance(seconds=min(.5, self.config.duration_s - self.sim.time_s))
            if not self.error:
                self.state = 'stopped' if self._stop.is_set() else 'complete'
        except Exception as error:  # the failure is surfaced, not hidden
            self.state = 'failed'
            self.error = f'{type(error).__name__}: {error}'
            self.error_trace = traceback.format_exc()
        finally:
            self.wall_seconds = time.perf_counter() - started

    def pause(self):
        if self.state not in ('running',):
            raise RuntimeError('Only a running simulation can be paused')
        self._pause.set()
        self.state = 'paused'
        return self.status()

    def resume(self):
        if self.state != 'paused':
            raise RuntimeError('Only a paused simulation can be resumed')
        self._pause.clear()
        self.state = 'running'
        return self.status()

    def stop(self):
        if not self._thread or not self._thread.is_alive():
            self.state = 'stopped' if self.sim else 'idle'
            return self.status()
        self._stop.set()
        self._pause.clear()
        self._thread.join(timeout=10.)
        self.state = 'stopped'
        return self.status()

    def reset(self):
        self.stop()
        self.sim = None
        self.config = None
        self.error = None
        self.state = 'idle'
        self.wall_seconds = 0.
        return self.status()

    # -- reporting ----------------------------------------------------------
    def status(self):
        sim = self.sim
        payload = {'state': self.state, 'error': self.error,
                   'wall_seconds': round(self.wall_seconds, 3)}
        if sim:
            payload.update({'time_s': round(sim.time_s, 3),
                            'duration_s': self.config.duration_s,
                            'fraction': round(min(1., sim.time_s / self.config.duration_s), 4),
                            'stage': sim.hypnogram[-1]['stage'] if sim.hypnogram else None,
                            'neurons': sim.net.n, 'connections': sim.net.edge_count,
                            'simulated_per_wall_second': round(sim.time_s / max(self.wall_seconds, 1e-9), 3)})
        return payload

    def snapshot(self):
        if not self.sim:
            raise RuntimeError('No simulation has been started')
        payload = self.sim.snapshot()
        payload['status'] = self.status()
        payload['provenance'] = {
            'neuron_counts': 'instantiated spiking neurons, not population rates',
            'connections': 'declared rules with literature/assumed provenance',
            'eeg': 'single-dipole-per-population spherical approximation, model units',
            'classifier': 'heuristic thresholds, not a clinical scorer',
        }
        return payload


LAB = SleepLab()

PAGE = r'''<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Neuro-ML · Sleep Lab</title>
<style>
:root{color-scheme:dark}
body{margin:0;background:#0a0f14;color:#dbe9ee;font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
header{padding:22px 4vw;border-bottom:1px solid #21343f;display:flex;flex-wrap:wrap;gap:12px;align-items:baseline}
h1{margin:0;font-size:1.15rem;letter-spacing:.22em;color:#7fe3cf}
header a{color:#8fa8b4;text-decoration:none;font-size:.85rem;border:1px solid #2a4250;padding:6px 10px;border-radius:6px}
main{max-width:1280px;margin:0 auto;padding:18px 4vw 60px}
.warn{border-left:3px solid #e0a458;background:#181208;color:#f0d6ad;padding:10px 14px;border-radius:0 8px 8px 0;font-size:.88rem}
.bar{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
button,select,input{background:#122430;color:#e6f6f3;border:1px solid #2f4b5a;border-radius:8px;padding:9px 12px;font:inherit}
button{cursor:pointer}button:disabled{opacity:.4;cursor:not-allowed}
button.primary{background:#1d6b5f;border-color:#2b8f7f}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px}
section{background:#0f1a23;border:1px solid #21343f;border-radius:12px;padding:16px}
h2{font-size:.85rem;letter-spacing:.16em;color:#7fe3cf;margin:0 0 10px;text-transform:uppercase}
canvas{width:100%;height:180px;background:#081016;border-radius:8px;display:block}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px;font-variant-numeric:tabular-nums}
.stats div{background:#0b151d;border:1px solid #1d2f3a;border-radius:8px;padding:8px 10px}
.stats b{display:block;font-size:1.15rem;color:#bff3e6}
.stats span{font-size:.72rem;color:#8fa8b4;letter-spacing:.08em;text-transform:uppercase}
table{width:100%;border-collapse:collapse;font-size:.82rem}
th,td{text-align:left;padding:5px 6px;border-bottom:1px solid #1b2c37;font-variant-numeric:tabular-nums}
th{color:#8fa8b4;font-weight:600;font-size:.72rem;text-transform:uppercase;letter-spacing:.06em}
.badge{display:inline-block;border-radius:99px;padding:2px 9px;font-size:.72rem;border:1px solid #2f4b5a}
.badge.err{border-color:#e5484d;color:#ffb3b6}
@media(max-width:640px){canvas{height:140px}main{padding:12px 12px 48px}}
</style>
<header><h1>NEURO-ML · SLEEP LAB</h1>
<a href="/">Experiment archive</a><a href="/api/sleep/status">Status API</a></header>
<main>
<p class="warn">Mechanistic spiking circuit. EEG shown is <b>synthetic model output</b> from a
single-dipole-per-population forward model, not recorded EEG. Stages are inferred by a
heuristic classifier and are not clinical scores.</p>
<div class="bar">
  <label>Pressure <input id="pressure" type="number" min="0" max="1" step="0.05" value="0.25" style="width:82px"></label>
  <label>REM drive <input id="rem" type="number" min="0" max="400" step="20" value="0" style="width:82px"></label>
  <label>Duration s <input id="duration" type="number" min="4" max="120" step="2" value="12" style="width:78px"></label>
  <button class="primary" id="start">Start</button>
  <button id="pause">Pause</button><button id="resume">Resume</button>
  <button id="stop">Stop</button><button id="reset">Reset</button>
</div>
<div class="stats" id="stats"></div>
<div class="grid" style="margin-top:16px">
  <section><h2>Estimated hypnogram</h2><canvas id="hypno"></canvas></section>
  <section><h2>Synthetic EEG (Cz, model units)</h2><canvas id="eeg"></canvas></section>
  <section><h2>Population firing rates (Hz)</h2><canvas id="rates"></canvas></section>
  <section><h2>Neuromodulator state (normalized)</h2><canvas id="mods"></canvas></section>
</div>
<section style="margin-top:16px"><h2>Circuits and connection provenance</h2>
<table id="circuits"><thead><tr><th>Population</th><th>Neurons</th><th>Role</th><th>Cell class</th></tr></thead><tbody></tbody></table>
<h2 style="margin-top:16px">Declared connections</h2>
<table id="conns"><thead><tr><th>Source</th><th>Target</th><th>Synapse</th><th>Weight (nS)</th><th>Delay (ms)</th><th>Provenance</th></tr></thead><tbody></tbody></table>
</section>
</main>
<script>
const $=id=>document.getElementById(id);
const state={timer:null};
function line(canvas,series,colors,labels){
  const ctx=canvas.getContext('2d'),w=canvas.width=canvas.clientWidth*devicePixelRatio,h=canvas.height=180*devicePixelRatio;
  ctx.clearRect(0,0,w,h);const all=series.flat();if(!all.length)return;
  let lo=Math.min(...all),hi=Math.max(...all);if(hi-lo<1e-9){hi=lo+1;lo-=1}
  series.forEach((s,i)=>{ctx.beginPath();ctx.strokeStyle=colors[i%colors.length];ctx.lineWidth=1.4*devicePixelRatio;
    s.forEach((v,k)=>{const x=8*devicePixelRatio+k*(w-16*devicePixelRatio)/Math.max(1,s.length-1),
      y=h-8*devicePixelRatio-(v-lo)/(hi-lo)*(h-16*devicePixelRatio);k?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()});
  if(labels){ctx.fillStyle='#6f8794';ctx.font=(11*devicePixelRatio)+'px system-ui';
    labels.forEach((t,i)=>ctx.fillText(t,8*devicePixelRatio,14*devicePixelRatio+i*13*devicePixelRatio))}
}
function stat(k,v){return `<div><span>${k}</span><b>${v}</b></div>`}
async function refresh(){
  const s=await (await fetch('/api/sleep/status')).json();
  $('stats').innerHTML=stat('state',`<span class="${s.error?'badge err':'badge'}">${s.state}</span>`)
    +stat('sim time',`${s.time_s??0} s`)+stat('stage',s.stage??'—')
    +stat('neurons',s.neurons??'—')+stat('connections',s.connections??'—')
    +stat('realtime',`${s.simulated_per_wall_second??0}×`)+(s.error?`<div style="grid-column:1/-1;color:#ffb3b6">${s.error}</div>`:'');
  if(s.state==='running'||s.state==='paused'||s.state==='complete'){
    const d=await (await fetch('/api/sleep/data')).json();
    draw(d);
  }
}
function draw(d){
  const h=d.hypnogram||[];
  line($('hypno'),[h.map(x=>x.index)],['#7fe3cf'],[`${h.length} estimates · 0 Wake 1 N1 2 N2 3 N3 4 REM`]);
  if(d.eeg){const ch=d.eeg.channels.indexOf('Cz');
    line($('eeg'),[d.eeg.samples.map(r=>r[ch<0?0:ch])],['#8fb8ff'],[d.eeg.sample_rate_hz+' Hz decimated'])}
  const t=d.trace||{};if(t.rates){line($('rates'),['cortex_e','tc','vlpo','ach_rem'].map(k=>t.rates[k]||[]),
    ['#7fe3cf','#8fb8ff','#e0a458','#c58fff'],['cortex','thalamus','vlpo','ach_rem'])}
  if(t.modulators){line($('mods'),Object.keys(t.modulators).map(k=>t.modulators[k]),['#7fe3cf','#8fb8ff','#e0a458','#c58fff'],Object.keys(t.modulators))}
  if(d.network&&!$('circuits').dataset.done){$('circuits').dataset.done='1';
    $('circuits').querySelector('tbody').innerHTML=Object.entries(d.network.cells)
      .map(([k,n])=>`<tr><td>${k}</td><td>${n}</td><td>—</td><td>—</td></tr>`).join('');
    $('conns').querySelector('tbody').innerHTML=(d.connections||[]).map(c=>
      `<tr><td>${c.source}</td><td>${c.target}</td><td>${c.synapse}</td><td>${c.weight_ns}</td><td>${c.delay_ms}</td><td>${c.provenance}</td></tr>`).join('')}
}
async function post(path,body){const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},
  body:JSON.stringify(body||{})});if(!r.ok)alert(await r.text());await refresh()}
$('start').onclick=()=>post('/api/sleep/start',{pressure:+$('pressure').value,rem_drive:+$('rem').value,duration_s:+$('duration').value});
$('pause').onclick=()=>post('/api/sleep/pause');$('resume').onclick=()=>post('/api/sleep/resume');
$('stop').onclick=()=>post('/api/sleep/stop');$('reset').onclick=()=>post('/api/sleep/reset');
refresh();setInterval(refresh,1500);
</script></html>'''


def handle_get(path):
    """Return (content_type, bytes) for Sleep Lab routes, or None if not ours."""
    if path in ('/sleep', '/sleep/'):
        return 'text/html; charset=utf-8', PAGE.encode()
    if path == '/api/sleep/status':
        return 'application/json', json.dumps(LAB.status(), allow_nan=False).encode()
    if path == '/api/sleep/data':
        return 'application/json', json.dumps(LAB.snapshot(), allow_nan=False).encode()
    return None


def handle_post(path, body):
    if path == '/api/sleep/start':
        cfg = SleepCircuitConfig(duration_s=float(body.get('duration_s', 12.)),
                                 dt_ms=1., initial_pressure=float(body.get('pressure', .25)),
                                 rem_drive_pa=float(body.get('rem_drive', 0.)),
                                 seed=int(body.get('seed', 7)))
        return LAB.start(cfg)
    if path == '/api/sleep/pause':
        return LAB.pause()
    if path == '/api/sleep/resume':
        return LAB.resume()
    if path == '/api/sleep/stop':
        return LAB.stop()
    if path == '/api/sleep/reset':
        return LAB.reset()
    raise ValueError('Unknown Sleep Lab endpoint: ' + path)
