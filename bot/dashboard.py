"""NeuroML AI Coach Dashboard — live localhost view of the learning brain.

Serves on http://127.0.0.1:8765:
  /         dashboard page (phone vision, coach feed, learning curves)
  /metrics  ml_metrics.json
  /coach    last 60 ai_coach.jsonl coach reviews
  /shot     live phone screenshot JPEG (via adb screencap)
"""
import base64
import io
import json
import subprocess
from http.server import BaseHTTPRequestHandler, HTTPServer

CFG = json.load(open("bot_config.json"))
DEV = CFG["device"]
PORT = 8765
PAGE = """<!doctype html><html><head><meta charset="utf-8">
<title>NeuroML AI Coach</title>
<style>
body{background:#0d1117;color:#e6edf3;font-family:Segoe UI,Roboto,sans-serif;margin:0;padding:16px}
h1{margin:0 0 4px;font-size:22px} .sub{color:#8b949e;margin-bottom:14px;font-size:13px}
.grid{display:grid;grid-template-columns:340px 1fr;gap:16px;max-width:1280px}
.card{background:#161b22;border:1px solid #30363d;border-radius:10px;padding:14px}
.phone{width:300px;height:650px;border:1px solid #30363d;border-radius:12px;overflow:hidden;background:#000}
.phone img{width:100%;height:100%;object-fit:contain}
.kpi{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px}
.kpi div{background:#21262d;border-radius:8px;padding:8px 12px;font-size:20px;font-weight:700}
.kpi div span{display:block;font-size:11px;color:#8b949e;font-weight:400}
canvas{width:100%;height:150px;margin-top:6px}
.coach{height:280px;overflow-y:auto;font-size:12.5px;font-family:Consolas,monospace;background:#0d1117;border:1px solid #30363d;border-radius:8px;padding:8px}
.coach .pun{color:#f85149}.coach .men{color:#58a6ff}.coach .ok{color:#3fb950}
.coach div{margin-bottom:6px;border-bottom:1px solid #21262d;padding-bottom:4px}
h2{font-size:14px;color:#8b949e;text-transform:uppercase;letter-spacing:.08em;margin:10px 0 6px}
</style></head><body>
<h1>NeuroML — AI Coach Dashboard</h1>
<div class="sub">Groq OSS coach punishing &amp; mentoring the Dueling Double DQN in real time</div>
<div class="grid">
 <div class="card"><h2>Live phone vision</h2><div class="phone"><img id="shot" src="/shot"></div></div>
 <div>
   <div class="card">
     <div class="kpi">
       <div><span>train steps</span><span id="k_steps">-</span></div>
       <div><span>latest loss</span><span id="k_loss">-</span></div>
       <div><span>TD error</span><span id="k_td">-</span></div>
       <div><span>replay buffer</span><span id="k_buf">-</span></div>
     </div>
     <h2>Training loss (last 120 steps)</h2><canvas id="loss_c" width=800 height=150></canvas>
     <h2>Neuron firing rates (cortical / limbic)</h2><canvas id="neu_c" width=800 height=150></canvas>
   </div>
   <div class="card"><h2>Groq OSS coach — punisher &amp; mentor feed (live)</h2>
     <div class="coach" id="feed">waiting for coach reviews…</div></div>
 </div>
</div>
<script>
function line(cv,series,color){const c=cv.getContext('2d');c.clearRect(0,0,cv.width,cv.height);
 if(!series.length)return;const mx=Math.max(...series.map(Math.abs),1e-6);
 c.beginPath();series.forEach((v,i)=>{const x=i/(series.length-1||1)*cv.width;const y=cv.height/2-v/mx*(cv.height/2-6);
 i?c.lineTo(x,y):c.moveTo(x,y)});c.strokeStyle=color;c.lineWidth=2;c.stroke();
 c.fillStyle='#8b949e';c.font='11px sans-serif';c.fillText('max '+mx.toFixed(3),6,12)}
async function poll(){try{const m=await(await fetch('/metrics')).json();
 k_steps.textContent=m.steps; k_buf.textContent=m.buffer;
 k_loss.textContent=m.losses&&m.losses.length?m.losses[m.losses.length-1].toFixed(4):'-';
 k_td.textContent=m.td_errors&&m.td_errors.length?m.td_errors[m.td_errors.length-1].toFixed(4):'-';
 line(loss_c,m.losses.slice(-120),'#3fb950');
 const nn=m.neurons||{};line(neu_c,[nn.layer1_mean,mn(nn),nn.limbic_mean,nn.state_value_V,
   nn.layer1_mean,mn(nn),nn.limbic_mean,nn.state_value_V],'#58a6ff');
 const cf=await(await fetch('/coach')).json();
 feed.innerHTML=cf.slice(-60).reverse().map(r=>'<div><span class="pun">'+r.t+
  '</span> played <b>'+r.played+'</b> → '+(r.critique||'')+
  (r.reward_delta!=null?' <span class="pun">delta '+r.reward_delta+'</span>':'')+
  (r.recommended_spot?' <span class="men">teach: '+r.recommended_spot+'</span>':'')+'</div>').join('')||'(no coach reviews yet)';
 shot.src='/shot?'+Date.now();
}catch(e){}}
function mn(){return 0}
setInterval(poll,2000);poll();
</script></body></html>"""


def get_metrics():
    try:
        return open("ml_metrics.json").read()
    except Exception:
        return "{}"


def get_coach():
    try:
        lines = open("ai_coach.jsonl", encoding="utf-8").read().splitlines()
        return "[" + ",".join(lines[-60:]) + "]"
    except Exception:
        return "[]"


def get_shot():
    try:
        out = subprocess.run(["adb", "-s", DEV, "exec-out", "screencap", "-p"],
                             capture_output=True, timeout=15)
        im = io.BytesIO(out.stdout)
        from PIL import Image
        img = Image.open(im).convert("RGB")
        img.thumbnail((360, 780))
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=70)
        return buf.getvalue()
    except Exception as e:
        return base64.b64decode("") or b""


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
            self._send(get_metrics().encode(), "application/json")
        elif path == "/coach":
            self._send(get_coach().encode(), "application/json")
        elif path == "/shot":
            self._send(get_shot(), "image/jpeg")
        else:
            self.send_response(404)
            self.end_headers()


if __name__ == "__main__":
    HTTPServer(("127.0.0.1", PORT), H).serve_forever()
