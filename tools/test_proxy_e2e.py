"""End-to-end test of the zero-key mentor routing.

Boots tools/proxy_harness.cjs (api/mentor.js verbatim) locally with the key
supplied via env `key_for_ai`, then imports bot_ml.py WITHOUT any local key
exactly the way a published-app user runs it, and proves the model paths
(mentor critique, deck architect) work through the proxy.
"""
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
GUI = os.path.join(ROOT, "public_gui")

# The published-app condition: NO key env var at all, mentor via local harness
# (standing in for the Vercel endpoint). Resolve the real key for the harness.
key_path = os.path.join(ROOT, "groq_key.txt")
assert os.path.exists(key_path), "groq_key.txt (gitignored local key file) missing"
KEY = open(key_path).read().strip()
assert KEY.startswith("gsk_"), f"key file does not look like a Groq key: {KEY[:4]}"

print("1) launching harness ...")
harness = subprocess.Popen(
    ["node", os.path.join("tools", "proxy_harness.cjs"), "3123"],
    cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    env={**os.environ, "key_for_ai": KEY},
)
try:
    time.sleep(1.8)

    os.environ["NEUROML_MENTOR_URL"] = "http://127.0.0.1:3123/api/mentor"
    os.environ.pop("GROQ_API_KEY", None)
    os.chdir(GUI)
    sys.path.insert(0, GUI)

    print("2) importing bot_ml (key-free) ...")
    import bot_ml  # noqa: E402

    assert bot_ml.load_groq_key() == "", "local key must be absent for this test"
    assert bot_ml.groq_api_url().endswith("/api/mentor"), bot_ml.groq_api_url()
    print("   routing URL =", bot_ml.groq_api_url())

    print("3) mentor critique through proxy (openai/gpt-oss-120b) ...")
    r = bot_ml.groq_reward_governor(
        "state: tower HP 100/100/100, elixir 7, two enemy troops advancing left lane",
        "center_back", 0.0)
    print("   source:", r.get("source"), "| critique:", (r.get("critique") or "")[:90])
    assert r.get("source") == "groq_oss_coach", r
    assert r.get("reward_delta") is None, "mentor must never emit reward numbers"

    print("4) deck architect through proxy ...")
    d = bot_ml.groq_deck_builder(["Hog Rider", "Cannon", "Fireball", "Zap",
                                  "Musketeer", "Skeletons", "Valkyrie", "Knight"])
    print("   source:", d.get("source"), "| deck:", d.get("deck"))
    assert d.get("source") == "groq_deck_architect", d
    assert isinstance(d.get("deck"), list) and len(d["deck"]) >= 6, d

    print("5) proxy guard: disallowed model must be rejected ...")
    payload = {"model": "some/bogus-model", "messages": [{"role": "user", "content": "hi"}],
               "max_tokens": 8, "temperature": 0}
    req = urllib.request.Request("http://127.0.0.1:3123/api/mentor",
                                 data=json.dumps(payload).encode())
    try:
        urllib.request.urlopen(req, timeout=10)
        raise SystemExit("bogus model was NOT rejected")
    except urllib.error.HTTPError as e:
        assert e.code == 400, e.code
        print("   bogus model rejected with HTTP 400 as designed")

    print("PROXY_E2E_OK")
finally:
    harness.terminate()
    try:
        harness.wait(timeout=5)
    except Exception:
        harness.kill()
