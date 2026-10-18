"""NeuroML AI Coach Dashboard v2 — the full brain, live.

Endpoints:
  /            comprehensive dashboard page
  /metrics     ml_metrics.json (cached 1s)
  /coach       last 60 ai_coach.jsonl coach reviews
  /brain       live per-neuron firing + Q-values + equations (reads latest bot decision)
  /shot        live phone screenshot JPEG (cached 1.2s so page stays fast)
  /health      quick status of bot process + adb device
"""
import base64
import io
import json
import os
import subprocess
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer  # threaded: /shot never blocks other endpoints

# Pre-warm the vision module (torch import ~1.5s once) so the FIRST /vision or
# /shot hit isn't slow and the page never looks "perpetually loading".
try:
    import bot_ml
except Exception:
    bot_ml = None

CFG = json.load(open("bot_config.json"))
DEV = CFG["device"]
PORT = 8765

CACHE = {"metrics": "", "coach": "[]", "shot": None, "metrics_t": 0, "coach_t": 0, "shot_t": 0}
CACHE_LOCK = threading.Lock()

PAGE = """<!doctype html><html><head><meta charset="utf-8">
<title>NeuroML — The Full Brain</title>
<style>
:root{--bg:#0b0f14;--card:#151b23;--line:#2a3441;--txt:#e6edf3;--dim:#8b949e;--ok:#3fb950;--bad:#f85149;--blu:#58a6ff;--yel:#d29922}
body{background:var(--bg);color:var(--txt);font-family:Segoe UI,Roboto,sans-serif;margin:0;padding:14px}
h1{margin:0 0 2px;font-size:20px}.sub{color:var(--dim);font-size:12px;margin-bottom:12px}
.grid{display:grid;grid-template-columns:310px 1fr 350px;gap:12px;max-width:1400px}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:12px}
.phone{width:100%;height:560px;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#000}
.phone img{width:100%;height:100%;object-fit:contain}
.kpi{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.kpi div{background:#212a35;border-radius:8px;padding:7px 10px;font-size:18px;font-weight:700}
.kpi div span{display:block;font-size:10px;color:var(--dim);font-weight:400}
canvas{width:100%;height:130px;margin:4px 0}
.eq{font-family:Cascadia Code,Consolas,monospace;font-size:12px;background:#10161d;border:1px solid var(--line);border-radius:8px;padding:8px;color:#9ecbff;white-space:pre-wrap}
.brain{display:flex;gap:6px;align-items:center;justify-content:center}.brain .layer{display:grid;grid-template-columns:repeat(96,1fr);gap:1px}
.dot{width:4px;height:4px;border-radius:50%;transition:background .12s}
.coach{height:210px;overflow-y:auto;font-size:12px;font-family:Consolas,monospace}
.coach div{padding:3px 0;border-bottom:1px solid #212a35}.pun{color:var(--bad)}.men{color:var(--blu)}.ok{color:var(--ok)}
.wl{display:flex;gap:2px;flex-wrap:wrap}.wl i{display:inline-block;width:10px;height:10px;border-radius:2px}
.pill{display:inline-block;background:#212a35;border-radius:6px;padding:2px 8px;font-size:11px;margin:2px}
.dopa{height:230px;overflow-y:auto;font-size:12px;font-family:Consolas,monospace}
.dopa div{display:flex;align-items:center;gap:6px;padding:3px 6px;border-bottom:1px solid #1d2530;border-radius:4px}
.dopa div:nth-child(odd){background:#141a22}
.dopa .bar{display:inline-block;height:9px;border-radius:2px;min-width:2px}
.dopa .pos{color:var(--ok);font-weight:800}.dopa .neg{color:var(--bad);font-weight:800}
.painlist div{padding:2px 6px;font-size:11px;font-family:Consolas,monospace;color:#f0883e}
.dopa .ev{color:var(--txt);flex:1;margin-left:8px}.dopa .t{color:var(--dim);width:70px}
.dopa .big{font-size:13px;border-left:3px solid var(--yel)}
.opp{font-size:12px;color:var(--dim)}.opp b{color:var(--txt)}
.rules{font-size:11px;color:#9ecbff;background:#10161d;border:1px solid var(--line);border-radius:8px;padding:8px;margin-top:6px}
.rules li{margin:2px 0;list-style:none}
</style></head><body>
<h1>NeuroML — The Full Brain</h1>
<div class="sub">38 sensory → 1024-wide × 6-layer residual cortex → 128 limbic → dueling V(s)/A(s,a) → 20 actions · coached live by Groq · <a href="/vision" target="_blank" style="color:#58a6ff">open raw vision overlay ↗</a></div>
<div class="grid" style="grid-template-columns:310px 1fr 360px">
  <div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">PHONE VISION</h2>
      <div class="phone"><img id="shot" src="/vision"></div>
      <div style="font-size:10px;color:var(--dim);margin-top:4px">🔵 my tower HP · 🔴 enemy tower HP · 🟧 unit-scan zones · 🟪 elixir bar · 🟩 affordable card slot · <a href="/vision?fresh=1" target="_blank" style="color:#58a6ff">refresh now ↗</a></div></div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">VISION STATE</h2>
      <div id="vision" style="font-size:12px;color:var(--dim)">waiting…</div></div>
    <div class="card"><h2 style="font-size:12px;color:var(--yel);margin:0 0 6px">⚡ LIVE DOPAMINE FEED (events as they hit the brain)</h2>
      <div class="dopa" id="dopa"><div style="color:var(--dim)">waiting for first reward…</div></div>
      <div style="font-size:10px;color:var(--dim);margin:4px 0 2px">bars scale to the largest |dopamine| in view — red = punishment, gold = pain memory</div>
      <div class="painlist" id="painlist"></div>
      <div class="rules"><b style="color:var(--yel)">GAME RULES the brain is taught:</b>
        <li>⚔️ spell finisher → enemy tower ≤32% HP gets shot, not dropped at bridge</li>
        <li>🛡️ commit discipline → never bridge-drop tanks without support elixir</li>
        <li>🔁 cheap-cycle → 1-2 cost cards saved for defense</li>
        <li>🏰 buildings pull center, never bridge</li></div></div>
  </div>
  <div>
    <div class="card">
      <div class="kpi">
        <div><span>TRAIN STEPS</span><span id="k_steps">-</span></div>
        <div><span>LOSS (MA)</span><span id="k_loss">-</span></div>
        <div><span>TD ERROR</span><span id="k_td">-</span></div>
        <div><span>BUFFER</span><span id="k_buf">-</span></div>
        <div><span>WIN RATE</span><span id="k_wr">-</span></div>
      </div>
      <h2 style="font-size:12px;color:var(--dim)">LOSS CURVE</h2><canvas id="c_loss" width=780 height=130></canvas>
      <h2 style="font-size:12px;color:var(--dim)">EXTREME REWARD HISTORY (tower dmg / wins / losses)</h2><canvas id="c_rw" width=780 height=130></canvas>
      <h2 style="font-size:12px;color:var(--dim)">WIN / LOSS RECORD (last 60)</h2><div class="wl" id="wl"></div>
    </div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">WHAT THE MODEL IS THINKING (live equations)</h2>
      <div class="eq" id="eq">waiting for first battle tick…</div></div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">GROQ COACH (punisher + mentor)</h2>
      <div class="coach" id="feed">waiting…</div></div>
  </div>
  <div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">LIVE NEURON FIRING — 1024-wide × 6-layer cortex (each dot = one real neuron, layer6 = deepest)</h2>
      <div style="font-size:10px;color:var(--dim);margin-bottom:4px">🟢 green = positive activation this tick · 🔴 red = negative activation · dark = quiet neuron</div>
      <div style="font-size:11px;color:var(--dim)">EYES (38 sensory neurons — what each pixel-scan reports)</div>
      <div id="senses" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;font-size:9px;font-family:Consolas,monospace;margin:4px 0"></div>
      <div style="font-size:11px;color:var(--dim)">CORTEX 1 — pattern extraction (first signal mixes)</div>
      <div class="brain"><div class="layer" id="l1" style="grid-template-columns:repeat(96,1fr)"></div></div>
      <div style="font-size:11px;color:var(--dim)">CORTEX 2 — battlefield concepts (pushes, weaknesses form here)</div>
      <div class="brain"><div class="layer" id="l2" style="grid-template-columns:repeat(96,1fr)"></div></div>
      <div style="font-size:11px;color:var(--dim)">CORTEX 3 — deep composition (synergies, trades)</div>
      <div class="brain"><div class="layer" id="l3b" style="grid-template-columns:repeat(96,1fr)"></div></div>
      <div style="font-size:11px;color:var(--dim)">CORTEX 4 — decision abstraction (before value/choice split)</div>
      <div class="brain"><div class="layer" id="l4" style="grid-template-columns:repeat(96,1fr)"></div></div>
      <div style="font-size:11px;color:var(--dim)">DEEP CORTEX (layers 5–6 — abstract decision evidence, feeds V/A)</div>
      <div class="brain"><div class="layer" id="deepcortex" style="grid-template-columns:repeat(96,1fr)"></div></div>
      <div style="font-size:11px;color:var(--dim)">LIMBIC — "how good is this situation" interneurons (feeds V(s))</div>
      <div class="brain"><div class="layer" id="l3" style="grid-template-columns:repeat(96,1fr)"></div></div>
      <div style="font-size:11px;color:var(--dim);margin-top:4px">MOTOR — advantage of each of the 20 moves (top = chosen)</div>
      <div id="motor" style="font-size:10px;font-family:Consolas,monospace;margin-top:2px"></div>
      <div style="font-size:11px;color:var(--dim);margin-top:6px">V(s) dopamine baseline: <span id="vs" style="color:var(--yel)">-</span>
       · advantage spread <span id="asp" style="color:var(--yel)">-</span></div></div>
    <div class="card"><h2 style="font-size:12px;color:#9370db;margin:0 0 6px">SPIKING NUCLEUS — real LIF neurons + STDP (v13 hybrid)</h2>
      <div style="font-size:11px;color:var(--dim)">64 sensory → 20 action LIF neurons · leak, threshold, refractory, adaptation · reward-modulated STDP with eligibility</div>
      <canvas id="c_spike" width=330 height=110 style="height:100px"></canvas>
      <div style="font-size:10px;color:var(--dim);margin:2px 0 6px">action-population spike counts per decision tick (telemetry, sampled)</div>
      <div style="font-size:11px;font-family:Consolas,monospace" id="spk">waiting…</div>
      <div style="font-size:10px;color:var(--dim);margin-top:6px">INTERNAL STATE CHANNELS (computational analogues — bounded, decaying; these are <i>not</i> measurements of subjective feeling)</div>
      <div id="affect" style="font-size:10px;font-family:Consolas,monospace;margin-top:3px"></div>
    </div>
    <div class="card"><h2 style="font-size:12px;color:var(--yel);margin:0 0 6px">📚 GAME MEMORY (distilled story of every match)</h2>
      <div style="font-size:12px" id="gmem">no matches distilled yet…</div>
      <div style="font-size:10px;color:var(--dim);margin-top:4px">Saved to game_memory.json at every match end. Reloaded at startup and fed to the AI coach — the brain remembers what won, even after restart.</div></div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">MEMORY PERSISTENCE</h2>
      <div style="font-size:12px" id="memviz">checking files…</div>
      <div style="font-size:11px;color:var(--dim);margin-top:6px">All files reload automatically at bot start. Downloads keep their brain.</div></div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">OPPONENT MEMORY (what recent enemies played)</h2>
      <div class="opp" id="opp">no opponents recorded yet…</div></div>
  </div>
</div>
<script>
function line(cv,s,color,mirror){const c=cv.getContext('2d');c.clearRect(0,0,cv.width,cv.height);if(!s||!s.length)return;
 const mx=Math.max(...s.map(Math.abs),1e-6);c.beginPath();
 s.forEach((v,i)=>{const x=i/(s.length-1||1)*cv.width;const y=cv.height/2-v/mx*(cv.height/2-6);i?c.lineTo(x,y):c.moveTo(x,y)});
 c.strokeStyle=color;c.lineWidth=2;c.stroke()}
function heat(arr,container,scale){const el=document.getElementById(container);
 if(!el||!arr)return; if(!el.dataset.built){el.innerHTML='';for(let i=0;i<arr.length;i++){const d=document.createElement('i');d.className='dot';d.dataset.i=i;el.appendChild(d)}el.dataset.built=1}
 const kids=el.children;for(let i=0;i<kids.length;i++){const v=arr[i]||0;const t=Math.min(1,Math.abs(v)/(scale||2));
 kids[i].style.background=t<.05?'#2a3441':(v>=0?`rgba(63,185,120,${t})`:`rgba(248,81,73,${t})`)}}
async function poll(){
try{
 const m=await(await fetch('/metrics')).json();
 k_steps.textContent=m.steps; k_buf.textContent=m.buffer;
 k_loss.textContent=m.losses&&m.losses.length?m.losses[m.losses.length-1].toFixed(4):'-';
 k_td.textContent=m.td_errors&&m.td_errors.length?m.td_errors[m.td_errors.length-1].toFixed(3):'-';
 k_wr.textContent=(m.win_rate!=null?m.win_rate+'%':'-');
 const erk=document.getElementById('k_wr');erk.style.color=(m.win_rate>=50?'#3fb950':'#f85149');
 line(c_loss,m.losses&&m.losses.slice(-120),'#3fb950');
 const rw=(m.rewards||[]).filter(v=>Math.abs(v)>=1).slice(-120);line(c_rw,rw,'#d29922');
 const wl=document.getElementById('wl');wl.innerHTML=(m.win_history||[]).slice(-60).map(w=>'<i style="background:'+(w?'#3fb950':'#f85149')+'"></i>').join('');
 const n=m.neurons||{};vs.textContent=n.state_value_V;asp.textContent=n.advantage_spread;
 heat(n.layer1_neurons,'l1',1.5);heat(n.layer2_neurons,'l2',1.5);heat(n.layer3_neurons||n.layer2_neurons,'l3b',1.5);
 heat(n.layer4_neurons||n.layer3_neurons,'l4',1.5);heat(n.layer6_neurons||n.layer5_neurons||n.layer3_neurons,'deepcortex',1.5);heat(n.limbic_neurons,'l3',1.5);
 if(n.sensory_neurons){const se=document.getElementById('senses');
  if(!se.dataset.built){se.innerHTML=n.sensory_neurons.map(s=>'<div title="'+s.sense+'" style="padding:1px 4px;background:#10161d;border-radius:3px;color:'+(s.v>0.5?'#3fb950':(s.v>0.05?'#9ecbff':'#5a6572'))+'">'+s.sense+' <b>'+s.v.toFixed(2)+'</b></div>').join('');se.dataset.built=1}
  else{const kids=se.children;for(let i=0;i<kids.length&&i<n.sensory_neurons.length;i++){const s=n.sensory_neurons[i];const b=kids[i].querySelector('b');if(b){b.textContent=s.v.toFixed(2);kids[i].style.color=(s.v>0.5?'#3fb950':(s.v>0.05?'#9ecbff':'#5a6572'))}}
   kids[0].title=n.sensory_neurons[0].sense}}
 if(n.advantage_neurons&&n.actions_desc){const mt=document.getElementById('motor');
  const mx=Math.max(1,...n.advantage_neurons.map(Math.abs));
  mt.innerHTML=n.actions_desc.map((nm,i)=>{const v=n.advantage_neurons[i]||0;
   const w=Math.round(4+Math.abs(v)/mx*36);
   return '<div style="display:flex;align-items:center;gap:4px;margin:1px 0"><span style="width:88px;color:'+(v>=0?'#3fb950':'#f85149')+'">'+nm+'</span><span style="display:inline-block;height:8px;width:'+w+'px;background:'+(v>=0?'#3fb950':'#f85149')+';border-radius:2px"></span><b style="color:#e6edf3">'+v.toFixed(2)+'</b></div>'}).join('')}
 if(m.dopamine_events&&m.dopamine_events.length){const de=document.getElementById('dopa');
  const view=m.dopamine_events.slice(-40);const mx=Math.max(1,...view.map(e=>Math.abs(e.amount)));
  de.innerHTML=view.reverse().map(e=>{const w=Math.max(2,Math.round(Math.abs(e.amount)/mx*Math.min(120,de.clientWidth*0.18)));
   const col=e.amount>0?'#3fb950':(e.amount<0?'#f85149':'#d29922');
   return '<div><span class="t">'+e.t+'</span><span class="bar" style="width:'+w+'px;background:'+col+'"></span><span class="ev">'+e.event+'</span><span class="'+(e.amount>=0?'pos':'neg')+'">'+(e.amount>=0?'+':'')+e.amount+'</span></div>'}).join('')}
 if(m.pain_channels_top&&m.pain_channels_top.length){const pl=document.getElementById('painlist');
  pl.innerHTML='Σ pain memory (LTD): '+m.pain_channels_top.map(p=>'<div>channel '+p.slot+','+p.spot+' avg '+p.avg+'</div>').join('')}
 if(m.opponent_memory){document.getElementById('opp').innerHTML='known opponents <b>'+m.opponent_memory.known+'</b> · this match pushes <b>'+m.opponent_memory.this_match_pushes+'</b>'}
 if(m.spiking&&m.spiking.ok){
  window._spkHist=window._spkHist||[];window._spkHist.push(m.spiking.action_spikes||0);if(window._spkHist.length>80)window._spkHist.shift();
  line(document.getElementById('c_spike'),window._spkHist,'#9370db');
  document.getElementById('spk').innerHTML=
   'observe '+m.spiking.observe_ms+'ms · sensory spikes '+m.spiking.sensory_spikes+' · motor spikes '+m.spiking.action_spikes+' · inhib '+m.spiking.inh_spikes+'<br>'+
   'mean synaptic weight <b>'+m.spiking.mean_w+'</b> · LTP events <b style="color:#3fb950">'+m.spiking.pot_events+'</b> · LTD events <b style="color:#f85149">'+m.spiking.dep_events+'</b>'+
   (m.spiking.cortex?('<br><span style="color:#9370db">prefrontal deliberation</span>: working memory '+m.spiking.cortex.working_memory+' · vetoes <b style="color:#f85149">'+m.spiking.cortex.vetoes+'</b> · recalls served '+m.spiking.cortex.recalls_served+' · hippocampus '+m.spiking.cortex.hippo_size+' episodes'+(m.spiking.cortex.over_budget?' · <b style="color:#f85149">budget over-run detected</b>':'')):'');
  const aff=m.spiking.affect||{};
  document.getElementById('affect').innerHTML=Object.entries(aff).map(([k,v])=>{
   const w=Math.round(v*54);const col=(k.startsWith('neg')||k==='danger'||k==='frustration')?'#f85149':(k==='confidence'?'#58a6ff':'#3fb950');
   return '<div style="display:flex;align-items:center;gap:5px;margin:1px 0"><span style="width:86px;color:var(--dim)">'+k+'</span><span style="display:inline-block;height:8px;width:'+w+'px;background:'+col+';border-radius:2px"></span>'+v.toFixed(3)+'</div>'}).join('');
 } else if(m.spiking){document.getElementById('spk').textContent='nucleus offline — DQN fallback active'}
 if(m.game_memory&&m.game_memory.games_remembered){const gm=m.game_memory;document.getElementById('gmem').innerHTML=
  '<div style="font-size:20px;font-weight:800;color:#d29922">'+gm.games_remembered+' games remembered</div>'+
  '<div style="margin-top:4px">win rate <b style="color:#3fb950">'+gm.recent_winrate+'%</b> recent · avg dopamine '+gm.avg_dopamine_per_match+'/match</div>'+
  '<div style="margin-top:4px">plays best: <b>'+gm.best_spots.map(x=>x[0]).join(', ')+'</b>'+(gm.avoid_spots.length?' · avoids: <b style="color:#f85149">'+gm.avoid_spots.map(x=>x[0]).join(', ')+'</b>':'')+'</div>'+
  '<div style="margin-top:4px;color:#8b949e">'+gm.towers_destroyed_recent+' towers destroyed · '+gm.enemy_pushes_faced_recent+' pushes faced recently</div>'}
 if(m.thinking){
 eq.textContent=`Q(s,a) = V(s) + A(s,a) − mean(A(s,·))\n target = r + γ·max_a' Q_target(s',a·)   γ=${m.thinking.gamma}\n chosen a=${m.thinking.chosen_action}  Qchosen=${m.thinking.chosen_q}  TD≈${m.thinking.td_error_recent}\n top3 = ${JSON.stringify(m.thinking.q_values_top3)}\n ${m.thinking.equation}\n ${m.thinking.hud}`}
 if(m.vision){const v=m.vision;vision.innerHTML=`elixir <b style="color:#58a6ff">${v.elixir}</b>/10 · affordable slots [${v.affordable_slots}]<br>`+
  `my towers L/R/K: <b>${v.towers.ally_left}/${v.towers.ally_right}/${v.towers.ally_king}</b><br>`+
  `enemy towers L/R: <b style="color:#f85149">${v.towers.enemy_left}/${v.towers.enemy_right}</b><br>`+
  `units on field — me ${v.arena_units.ally_left}/${v.arena_units.ally_right} enemy ${v.arena_units.enemy_left}/${v.arena_units.enemy_right}`}
 const cf=await(await fetch('/coach')).json();
 feed.innerHTML=cf.slice(-50).reverse().map(r=>'<div><span class="pun">'+r.t+'</span> played <b>'+(r.played||'')+'</b> — '+(r.critique||'')+
  (r.reward_delta!=null?' <span class="pun">'+r.reward_delta+'</span>':'')+(r.recommended_spot?' <span class="men">teach:'+r.recommended_spot+'</span>':'')+'</div>').join('');
 shot.src='/vision?'+Date.now();
}catch(e){console.log('poll error',e)}}
async function mem(){
try{
 const h=await(await fetch('/health')).json();
 memviz.textContent=h.mem||'';
}catch(e){}}
setInterval(poll,1500);poll();
setInterval(mem,5000);mem();
</script></body></html>"""


def metrics():
    """Serve ml_metrics.json, backfilled from training.log history when the
    current-run curves are too short to draw an honest trend."""
    try:
        m = json.load(open("ml_metrics.json", encoding="utf-8"))
    except Exception:
        return "{}"
    try:
        losses = m.get("losses") or []
        if len(losses) < 60:
            # training.log format: [ t ] step | loss=..| eps=..| buffer=.
            hist = []
            with open("training.log", encoding="utf-8") as f:
                for line in f:
                    i = line.find("loss=")
                    if i >= 0:
                        try:
                            hist.append(float(line[i + 5:].split()[0].rstrip(",")))
                        except (ValueError, IndexError):
                            pass
            if hist:
                m["losses"] = hist[-120:]
                m["losses_backfilled_from"] = "training.log"
    except Exception:
        pass
    return json.dumps(m)


def coach():
    try:
        lines = open("ai_coach.jsonl", encoding="utf-8").read().splitlines()
        return "[" + ",".join(lines[-60:]) + "]"
    except Exception:
        return "[]"


_shot_lock = threading.Lock()
_shot_cache = {"jpg": None, "t": 0, "vision": None}
_refresh_thread = [None]


def _refresh_background():
    """Start refreshing the cached shot in a daemon thread; /shot always serves
    instantly from the cache and never blocks."""
    if _refresh_thread[0] is not None and _refresh_thread[0].is_alive():
        return
    def work():
        with _shot_lock:
            try:
                img = _screencap()
                # The overlay IS the star: annotate the frame with what the ML
                # recognizes (tower HP boxes, elixir, slots, unit zones).
                # Copy FIRST: vision_overlay mutates the image it draws on.
                try:
                    ov = vision_overlay(img.copy())
                except Exception:
                    import traceback
                    try:
                        open("dash_errors.log", "a").write(
                            f"overlay failed: {traceback.format_exc()}\n")
                    except Exception:
                        pass
                    ov = None
                small = img.copy()
                small.thumbnail((360, 780))
                buf2 = io.BytesIO()
                small.save(buf2, format="JPEG", quality=66)
                _shot_cache["jpg"] = buf2.getvalue()
                if ov is not None:
                    bufov = io.BytesIO()
                    ov.save(bufov, format="JPEG", quality=72)
                    _shot_cache["vision"] = bufov.getvalue()
                _shot_cache["t"] = time.time()
            except Exception:
                import traceback
                try:
                    open("dash_errors.log", "a").write(
                        f"refresh failed: {traceback.format_exc()}\n")
                except Exception:
                    pass
    _refresh_thread[0] = threading.Thread(target=work, daemon=True)
    _refresh_thread[0].start()


def _screencap(retries=1):
    # adb is shared with the bot loop; a concurrent grab can blip — retry once
    for attempt in range(retries + 1):
        try:
            out = subprocess.run(["adb", "-s", DEV, "exec-out", "screencap", "-p"],
                                 capture_output=True, timeout=12)
            if out.stdout and len(out.stdout) > 5000:
                from PIL import Image
                return Image.open(io.BytesIO(out.stdout)).convert("RGB")
        except Exception:
            pass
        if attempt < retries:
            time.sleep(0.8)
    raise RuntimeError("screencap failed after retries")


def _auto_refresher():
    """Continuously refresh the frame cache in the background (~every 2.3s) so
    the phone panel is ALWAYS current — polling never has to wait for a
    screencap, which is what made localhost feel 'perpetually loading'."""
    while True:
        _refresh_background()
        time.sleep(2.3)


def shot(force=False):
    """Instant: always serve the cached frame now (<1ms), and when it's stale
    (>2.2s) kick off a background refresh so the NEXT call gets a newer frame.
    /force=True (/vision) waits for a *fresh* screencap."""
    if force:
        _refresh_background()
        th = _refresh_thread[0]
        if th:
            th.join(timeout=12)
    elif _shot_cache["jpg"] is None or time.time() - _shot_cache["t"] > 2.2:
        _refresh_background()
    if _shot_cache["jpg"] is None:
        from PIL import Image as I
        im = I.new("RGB", (360, 780), (8, 8, 8))
        buf = io.BytesIO()
        im.save(buf, format="JPEG")
        return buf.getvalue()
    return _shot_cache["jpg"]


def vision_bytes(force=False):
    """Serve the recognition-annotated frame. Cached + background-refreshed so
    the page never blocks; ?fresh=1 waits for a brand-new screencap."""
    if force or _shot_cache["vision"] is None or time.time() - _shot_cache["t"] > 2.2:
        _refresh_background()
        th = _refresh_thread[0]
        if th and force:
            th.join(timeout=12)
    if _shot_cache["vision"] is None:
        return shot()  # graceful fallback to the plain frame
    return _shot_cache["vision"]


def vision_overlay(img):
    """Draw the bot's actual pixel-recognition boxes on the image — you SEE what
    the ML sees: tower HP bars, unit scans, elixir bar, card affordability."""
    from PIL import ImageDraw
    # decode via bot_ml scanner results re-computed cheaply here (import once)
    try:
        import bot_ml
    except Exception:
        return img
    W, H_ = img.size
    scale = W / 1080.0
    s = lambda v: int(v * scale)
    d = ImageDraw.Draw(img)

    def draw_bar(xr, yr, is_enemy, max_span, x0_pad=0):
        frac = bot_ml._scan_bar_fraction(img, xr, yr, is_enemy=is_enemy, max_span=max_span)
        color = (255, 80, 80) if is_enemy else (80, 170, 255)
        x0, x1, y0 = s(min(xr)), s(min(xr) + max_span), s(min(yr))
        d.rectangle([x0, y0 - 2, x0 + max_span * scale * frac, y0 + 4], outline=color, width=2)
        d.text((x0, y0 - s(28)), f"{frac:.2f}", fill=color)

    def box(x0, x1, y0, y1, color, label):
        d.rectangle([s(x0), s(y0), s(x1), s(y1)], outline=color, width=2)
        d.text((s(x0), s(y0) - s(22)), label, fill=color)
    try:
        towers = bot_ml.tower_healths(img)
        arena = bot_ml.scan_arena_vision(img)
        elx = bot_ml.elixir_count(img)
        afford = bot_ml.hand_affordability(img, elx)
    except Exception:
        return img
    # Draw everything, downscale for display AFTER drawing (also crops coords safely)
    img.thumbnail((540, 1170))
    d = ImageDraw.Draw(img)
    scale = img.size[0] / 1080.0
    # tower boxes
    box(150, 340, 1360, 1450, (80, 170, 255), "my_L")
    box(740, 920, 1360, 1450, (80, 170, 255), "my_R")
    box(430, 650, 1725, 1758, (80, 170, 255), "king")
    box(150, 340, 370, 435, (255, 80, 80), "en_L")
    box(740, 920, 370, 435, (255, 80, 80), "en_R")
    # elixir bar
    box(228, 948, 2292, 2314, (255, 60, 225), f"elixir {elx}/10")
    # card slot boxes (afford = green, not = gray)
    for i, cx in enumerate([332, 543, 737, 931]):
        c = (60, 220, 120) if i < len(afford) and afford[i] > 0.5 else (150, 150, 150)
        box(cx - 70, cx + 70, 2160, 2340, c, f"slot{i}")
    # arena unit zone boxes
    d.rectangle([s(100), s(480), s(540), s(1650)], outline=(255, 140, 60), width=1)
    d.rectangle([s(540), s(480), s(980), s(1650)], outline=(255, 140, 60), width=1)
    d.text((s(100), s(1660)), f"units E {arena['enemy_left']}/{arena['enemy_right']} A {arena['ally_left']}/{arena['ally_right']}", fill=(255, 140, 60))
    return img


_health_cache = {"data": None, "t": 0}


def health():
    """Cached 4s: the tasklist subprocess made every health poll ~0.6s."""
    if _health_cache["data"] is not None and time.time() - _health_cache["t"] < 4.0:
        return _health_cache["data"]
    items = []
    for f, note in [("ml_policy.pt", "policy weights"), ("ml_replay.json", "replay memories"),
                    ("training.log", "training log"), ("ml_metrics.json", "metrics"),
                    ("my_deck.json", "autonomous deck"), ("groq_key.txt", "Groq key"),
                    ("game_memory.json", "game memory book"), ("opponent_memory.json", "opponent memory")]:
        try:
            s = os.path.getsize(f)
            items.append(f"✔ {note} ({s // 1024} KB)")
        except Exception:
            items.append(f"✖ {note} missing")
    bg = subprocess.run(["tasklist"], capture_output=True).stdout.decode(errors="ignore")
    bot_running = "python.exe" in bg
    data = {"bot": bot_running, "device": DEV, "mem": " ".join(items)}
    _health_cache["data"] = data
    _health_cache["t"] = time.time()
    return data


class H(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def _send(self, body, ctype="text/html"):
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = self.path.split("?")[0]
        if path in ("/", "/index.html"):
            self._send(PAGE.encode())
        elif path == "/metrics":
            self._send(metrics().encode(), "application/json")
        elif path == "/coach":
            self._send(coach().encode(), "application/json")
        elif path == "/shot":
            self._send(shot(), "image/jpeg")
        elif path == "/vision":
            fresh = "fresh=1" in (self.path or "")
            self._send(vision_bytes(force=fresh), "image/jpeg")
        elif path == "/health":
            self._send(json.dumps(health()).encode(), "application/json")
        else:
            self.send_response(404)
            self.end_headers()


if __name__ == "__main__":
    threading.Thread(target=_auto_refresher, daemon=True).start()
    ThreadingHTTPServer(("127.0.0.1", PORT), H).serve_forever()
