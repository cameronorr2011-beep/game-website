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
from http.server import BaseHTTPRequestHandler, HTTPServer

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
.brain{display:flex;gap:6px;align-items:center;justify-content:center}.brain .layer{display:grid;grid-template-columns:repeat(16,1fr);gap:2px}
.dot{width:8px;height:8px;border-radius:50%;transition:background .2s}
.coach{height:210px;overflow-y:auto;font-size:12px;font-family:Consolas,monospace}
.coach div{padding:3px 0;border-bottom:1px solid #212a35}.pun{color:var(--bad)}.men{color:var(--blu)}.ok{color:var(--ok)}
.wl{display:flex;gap:2px;flex-wrap:wrap}.wl i{display:inline-block;width:10px;height:10px;border-radius:2px}
.pill{display:inline-block;background:#212a35;border-radius:6px;padding:2px 8px;font-size:11px;margin:2px}
</style></head><body>
<h1>NeuroML — The Full Brain</h1>
<div class="sub">38 sensory neurons → 2×128 cortical → 128 limbic → dueling V(s)/A(s,a) → 20 actions · coached live by Groq gpt-oss-120b</div>
<div class="grid">
  <div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">PHONE VISION</h2>
      <div class="phone"><img id="shot" src="/shot"></div></div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">VISION STATE</h2>
      <div id="vision" style="font-size:12px;color:var(--dim)">waiting…</div></div>
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
    <div class="card"><h2 style="font-size:12px;color:var(--dim);margin:0 0 6px">LIVE NEURON FIRING (the biological brain)</h2>
      <div style="font-size:11px;color:var(--dim)">layer1 (64 shown)</div><div class="brain"><div class="layer" id="l1"></div></div>
      <div style="font-size:11px;color:var(--dim)">layer2 (64 shown)</div><div class="brain"><div class="layer" id="l2"></div></div>
      <div style="font-size:11px;color:var(--dim)">limbic interneurons (32 shown)</div><div class="brain"><div class="layer" id="l3"></div></div>
      <div style="font-size:11px;color:var(--dim)">action advantage (20 = 4 slots × 5 zones)</div><div class="brain"><div class="layer" id="l4"></div></div>
      <div style="font-size:11px;color:var(--dim);margin-top:6px">V(s) dopamine baseline: <span id="vs" style="color:var(--yel)">-</span>
       · advantage spread <span id="asp" style="color:var(--yel)">-</span></div></div>
    <div class="card"><h2 style="font-size:12px;color:var(--dim)">MEMORY PERSISTENCE</h2>
      <div style="font-size:12px" id="memviz">checking files…</div>
      <div style="font-size:11px;color:var(--dim);margin-top:6px">All files reload automatically at bot start. Downloads keep their brain.</div></div>
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
async function poll(){try{
 const m=await(await fetch('/metrics')).json();
 k_steps.textContent=m.steps; k_buf.textContent=m.buffer;
 k_loss.textContent=m.losses&&m.losses.length?m.losses[m.losses.length-1].toFixed(4):'-';
 k_td.textContent=m.td_errors&&m.td_errors.length?m.td_errors[m.td_errors.length-1].toFixed(3):'-';
 k_wr.textContent=(m.win_rate!=null?m.win_rate+'%':'-');
 line(c_loss,m.losses&&m.losses.slice(-120),'#3fb950');
 const rw=(m.rewards||[]).filter(v=>Math.abs(v)>=1).slice(-120);line(c_rw,rw,'#d29922');
 const wl=document.getElementById('wl');wl.innerHTML=(m.win_history||[]).slice(-60).map(w=>'<i style="background:'+(w?'#3fb950':'#f85149')+'"></i>').join('');
 const n=m.neurons||{};vs.textContent=n.state_value_V;asp.textContent=n.advantage_spread;
 heat(n.layer1_neurons,'l1',2);heat(n.layer2_neurons,'l2',2);heat(n.limbic_neurons,'l3',2);heat(n.advantage_neurons,'l4',2);
 if(m.thinking){eq.textContent=`Q(s,a) = V(s) + A(s,a) − mean(A(s,·))\\ntarget = r + γ·max_a' Q_target(s',a·)   γ=${m.thinking.gamma}\\nchosen a=${m.thinking.chosen_action}  Qchosen=${m.thinking.chosen_q}  TD≈${m.thinking.td_error_recent}\\ntop3 = ${JSON.stringify(m.thinking.q_values_top3)}\\n${m.thinking.equation}\\n${m.thinking.hud}`}
 if(m.vision){const v=m.vision;vision.innerHTML=`elixir <b style="color:#58a6ff">${v.elixir}</b>/10 · affordable slots [${v.affordable_slots}]<br>`+
  `my towers L/R/K: <b>${v.towers.ally_left}/${v.towers.ally_right}/${v.towers.ally_king}</b><br>`+
  `enemy towers L/R: <b style="color:#f85149">${v.towers.enemy_left}/${v.towers.enemy_right}</b><br>`+
  `units on field — me ${v.arena_units.ally_left}/${v.arena_units.ally_right} enemy ${v.arena_units.enemy_left}/${v.arena_units.enemy_right}`}
 const cf=await(await fetch('/coach')).json();
 feed.innerHTML=cf.slice(-50).reverse().map(r=>'<div><span class="pun">'+r.t+'</span> played <b>'+(r.played||'')+'</b> — '+(r.critique||'')+
  (r.reward_delta!=null?' <span class="pun">'+r.reward_delta+'</span>':'')+(r.recommended_spot?' <span class="men">teach:'+r.recommended_spot+'</span>':'')+'</div>').join('');
 shot.src='/shot?'+Date.now();
}catch(e){}}
async function mem(){try{const h=await(await fetch('/health')).json();
 memviz.textContent=h.mem}else{}}
setInterval(poll,1500);poll();
setInterval(mem,5000);mem();
</script></body></html>"""


def metrics():
    try:
        return open("ml_metrics.json", encoding="utf-8").read()
    except Exception:
        return "{}"


def coach():
    try:
        lines = open("ai_coach.jsonl", encoding="utf-8").read().splitlines()
        return "[" + ",".join(lines[-60:]) + "]"
    except Exception:
        return "[]"


def shot():
    try:
        out = subprocess.run(["adb", "-s", DEV, "exec-out", "screencap", "-p"],
                             capture_output=True, timeout=10)
        from PIL import Image
        img = Image.open(io.BytesIO(out.stdout)).convert("RGB")
        img.thumbnail((360, 780))
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=66)
        return buf.getvalue()
    except Exception:
        from PIL import Image as I
        im = I.new("RGB", (360, 780), (8, 8, 8))
        buf = io.BytesIO()
        im.save(buf, format="JPEG")
        return buf.getvalue()


def health():
    items = []
    for f, note in [("ml_policy.pt", "policy weights"), ("ml_replay.json", "replay memories"),
                    ("training.log", "training log"), ("ml_metrics.json", "metrics"),
                    ("my_deck.json", "autonomous deck"), ("groq_key.txt", "Groq key")]:
        try:
            s = os.path.getsize(f)
            items.append(f"✔ {note} ({s // 1024} KB)")
        except Exception:
            items.append(f"✖ {note} missing")
    bg = subprocess.run(["tasklist"], capture_output=True).stdout.decode(errors="ignore")
    bot_running = "python.exe" in bg
    return {"bot": bot_running, "device": DEV, "mem": " ".join(items)}


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
        elif path == "/health":
            self._send(json.dumps(health()).encode(), "application/json")
        else:
            self.send_response(404)
            self.end_headers()


if __name__ == "__main__":
    HTTPServer(("127.0.0.1", PORT), H).serve_forever()
