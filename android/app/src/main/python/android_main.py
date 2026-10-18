# android_main.py — on-phone entry point for the FULL NeuroML brain.
#
# Runs inside the same Android process as the app. The player phone here IS the
# phone playing Clash Royale: no computer, no ADB, no WiFi pairing — the brain
# sees the screen via MediaProjection (CaptureService) and taps via the
# accessibility service (TapAccessibilityService). All learning, the coach
# (through the maintainer's zero-key mentor proxy) and the federated
# package-exchange loop run exactly as on desktop.
import os
import sys
import threading
import time
from types import SimpleNamespace

os.environ.setdefault("NEUROML_PHONE_LOCAL", "1")
os.environ.setdefault("NEUROML_DEVICE", "local")

from com.neuroml.app import CaptureService, TapAccessibilityService, BrainService

BRAIN_STATE = {"started": False, "result": ""}


def _log(msg):
    line = f"[android] {msg}"
    print(line, flush=True)


def wait_capture(timeout_s=90.0):
    """Handle the race where the service starts before the user grants capture."""
    end = time.time() + timeout_s
    while time.time() < end:
        if CaptureService.ready():
            return True
        time.sleep(0.5)
    return False


def run(files_dir):
    """Called by BrainService on its own thread: starts dashboard + brain loops,
    returns immediately (never blocks the service thread)."""
    os.chdir(files_dir)  # relative paths (bot.log, cr_bot/, cards.json, *.pt)
    BRAIN_STATE["started"] = True

    if not wait_capture(90.0):
        BRAIN_STATE["result"] = "screen capture not granted — press Start again after step ①"
        _log(BRAIN_STATE["result"])
        BrainService.pythonCrashed = BRAIN_STATE["result"]
        return BRAIN_STATE["result"]

    _log("importing full brain (torch DQN, spiking nucleus, referee, coach)")
    import bot_ml  # same code as desktop

    # ---- bridge phone I/O over Chaquopy ------------------------------------
    cfg = bot_ml.CFG
    cfg_w = float(cfg.get("screen", {}).get("w") or 1080)
    cfg_h = float(cfg.get("screen", {}).get("h") or 2340)
    real_w = float(CaptureService.screenW() or cfg_w)
    real_h = float(CaptureService.screenH() or cfg_h)
    sx = (real_w / cfg_w) if cfg_w else 1.0
    sy = (real_h / cfg_h) if cfg_h else 1.0

    shot_path = os.path.join(files_dir, "cr_bot", "latest.png")

    def _capture():
        ok = CaptureService.screenshotPng(shot_path, 5.0)
        if not ok:
            _log("capture frame failed")

    def _bridge_screenshot_async():
        threading.Thread(target=_capture, daemon=True).start()

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
    bot_ml.screenshot_async = _bridge_screenshot_async
    bot_ml.tap = _bridge_tap
    _log(f"bridge ready {real_w:.0f}x{real_h:.0f} (scale {sx:.3f},{sy:.3f})")

    # ---- dashboard server in-process ---------------------------------------
    import dashboard

    def _android_screencap(retries=1):
        p = _bridge_screenshot()
        if p:
            from PIL import Image
            return Image.open(open(p, "rb")).convert("RGB")
        raise RuntimeError("no frame yet")

    dashboard._screencap = _android_screencap

    def _android_health():
        return {"bot": True, "device": "this phone (screen capture)", "mem": "brain data on device"}

    dashboard.health = _android_health

    def _serve():
        try:
            threading.Thread(target=dashboard._auto_refresher, daemon=True).start()
            from http.server import ThreadingHTTPServer
            ThreadingHTTPServer(("127.0.0.1", dashboard.PORT), dashboard.H).serve_forever()
        except Exception as e:
            _log(f"dashboard problem: {e!r}")
            BrainService.pythonCrashed = f"dashboard: {e!r}"

    threading.Thread(target=_serve, daemon=True, name="neuroml-dashboard").start()

    # ---- the brain loop ----------------------------------------------------
    def _brain():
        try:
            _log("bot main loop starting")
            bot_ml.main()
        except Exception as e:
            _log(f"brain crashed: {e!r}")
            BrainService.pythonCrashed = f"brain: {e!r}"

    threading.Thread(target=_brain, daemon=True, name="neuroml-runner").start()
    BRAIN_STATE["result"] = "running"
    _log("brain + dashboard running (playing the account signed in on this phone)")
    return "running"
