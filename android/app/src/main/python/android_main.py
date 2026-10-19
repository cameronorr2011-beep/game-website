# android_main.py — on-phone entry point for the FULL NeuroML brain.
#
# The player phone here IS the phone playing Clash Royale: no computer, no ADB,
# no WiFi pairing — the brain sees the screen via MediaProjection
# (CaptureService) and taps via the accessibility service
# (TapAccessibilityService). All learning, the coach (through the maintainer's
# zero-key mentor proxy) and the federated package-exchange loop run exactly as
# on desktop.
import os
import threading
import time
from types import SimpleNamespace

os.environ.setdefault("NEUROML_PHONE_LOCAL", "1")
os.environ.setdefault("NEUROML_DEVICE", "local")

from com.neuroml.app import CaptureService, TapAccessibilityService, BrainService

BRAIN_STATE = {"started": False, "result": ""}
# phase: starting -> waiting_capture -> running ; detail: human-readable failure
_STATE = {"phase": "starting", "detail": ""}


def _log(msg):
    print(f"[android] {msg}", flush=True)


def _fail(msg):
    """Honest OFF + persist the reason (BrainService runs in THIS process, and
    reportError mirrors it into the shared \"nml\" prefs the UI process reads)."""
    BRAIN_STATE["result"] = msg
    _STATE["phase"] = "stopped"
    _STATE["detail"] = msg
    _log(msg)
    if _CTX is not None:
        BrainService.reportError(_CTX, msg)
    return msg


_CTX = None  # Android Context, passed in by BrainService


def run(files_dir, ctx):
    """Called by BrainService on its own thread: starts the dashboard server
    FIRST (so the dashboard page always answers), waits for the capture grant,
    then runs the brain loop."""
    global _CTX
    _CTX = ctx
    if _STATE["phase"] == "running":
        _log("run() called again while already running — reusing the live brain")
        return "running"   # toggling twice must not spawn a second loop/port bind
    os.chdir(files_dir)  # relative paths (bot.log, cr_bot/, cards.json, *.pt)
    BRAIN_STATE["started"] = True
    _STATE["phase"] = "waiting_capture"
    _STATE["detail"] = ""

    # ---- dashboard server in-process: start EARLY --------------------------
    import dashboard

    def _android_screencap(retries=1):
        if _STATE["phase"] != "running":
            raise RuntimeError(
                f"brain is {_STATE['phase']} — {_STATE['detail'] or 'screen capture not granted yet'}")
        if CaptureService.screenshotPng(
                os.path.join(files_dir, "cr_bot", "latest.png"), 5.0):
            from PIL import Image
            return Image.open(
                open(os.path.join(files_dir, "cr_bot", "latest.png"), "rb")).convert("RGB")
        raise RuntimeError("no frame yet (screen capture did not deliver)")

    dashboard._screencap = _android_screencap

    def _android_health():
        if _STATE["phase"] == "running":
            return {"bot": True, "device": "this phone (screen capture)",
                    "mem": "brain data on device"}
        d = {"bot": False, "device": "this phone", "mem": "brain data on device"}
        if _STATE["detail"]:
            d["detail"] = _STATE["detail"]
        return d

    dashboard.health = _android_health

    def _serve():
        try:
            threading.Thread(target=dashboard._auto_refresher, daemon=True).start()
            from http.server import ThreadingHTTPServer
            try:
                httpd = ThreadingHTTPServer(("127.0.0.1", dashboard.PORT), dashboard.H)
            except OSError as e:
                if getattr(e, "errno", None) == 98:  # EADDRINUSE
                    _log("dashboard already serving in this process — reusing it")
                    return
                raise
            httpd.serve_forever()
        except Exception as e:
            _log(f"dashboard problem: {e!r}")
            _fail(f"dashboard server failed: {e!r}")

    threading.Thread(target=_serve, daemon=True, name="neuroml-dashboard").start()
    _log("dashboard server up on 127.0.0.1:8765 (waiting for capture grant…)")

    # ---- wait for the screen-capture grant ---------------------------------
    end = time.time() + 90.0
    while time.time() < end:
        if CaptureService.ready():
            break
        if _STATE["phase"] == "stopped":  # dashboard thread failed → don't hang
            return BRAIN_STATE["result"]
        time.sleep(0.5)
    else:
        return _fail("screen capture not granted — toggle BRAIN OFF and ON, "
                     "then pick Start Now (or Entire screen) in the dialog")

    # ---- import the full brain (can take ~30-60 s on first run) ------------
    _log("importing full brain (torch DQN, spiking nucleus, referee, coach)")
    import bot_ml

    # ---- bridge phone I/O over Chaquopy ------------------------------------
    cfg = bot_ml.CFG
    cfg_w = float(cfg.get("screen", {}).get("w") or 1080)
    cfg_h = float(cfg.get("screen", {}).get("h") or 2340)
    real_w = float(CaptureService.screenW() or cfg_w)
    real_h = float(CaptureService.screenH() or cfg_h)
    sx = (real_w / cfg_w) if cfg_w else 1.0
    sy = (real_h / cfg_h) if cfg_h else 1.0

    shot_path = os.path.join(files_dir, "cr_bot", "latest.png")

    def _capture_async():
        threading.Thread(
            target=lambda: CaptureService.screenshotPng(shot_path, 5.0),
            daemon=True).start()

    def _bridge_screenshot():
        if CaptureService.screenshotPng(shot_path, 5.0):
            return shot_path
        return None

    def _bridge_tap(x, y):
        ok = TapAccessibilityService.tap(int(round(x * sx)), int(round(y * sy)))
        time.sleep(0.4)
        return ok

    def _bridge_sh(*args, timeout=25, **kw):
        # on the desktop this ran `adb -s DEV ...`; on the phone both directions
        # (screencap + input tap) are native bridge calls, other probes are no-ops
        _log(f"sh(neutralized on device): {args!r}")
        return SimpleNamespace(stdout=b"", stderr=b"", returncode=0)

    bot_ml.sh = _bridge_sh
    bot_ml.screenshot = _bridge_screenshot
    bot_ml.screenshot_async = _capture_async
    bot_ml.tap = _bridge_tap
    _log(f"bridge ready {real_w:.0f}x{real_h:.0f} (scale {sx:.3f},{sy:.3f})")
    dashboard._screencap = _android_screencap  # now safely usable

    # ---- the brain loop ----------------------------------------------------
    def _brain():
        try:
            _log("bot main loop starting")
            bot_ml.main()
        except Exception as e:
            _log(f"brain crashed: {e!r}")
            _fail(f"brain: {e!r}")

    threading.Thread(target=_brain, daemon=True, name="neuroml-runner").start()
    _STATE["phase"] = "running"
    _STATE["detail"] = ""
    BRAIN_STATE["result"] = "running"
    BrainService.pythonCrashed = None
    _log("brain + dashboard running (playing the account signed in on this phone)")
    return "running"
