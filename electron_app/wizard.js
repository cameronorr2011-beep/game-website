const $ = (id) => document.getElementById(id);
const setBar = (pct) => { $("bar").style.width = Math.max(0, Math.min(100, pct)) + "%"; };

window.api.onProgress(({ stage, detail, pct }) => {
  $("progtext").textContent = `[${stage}] ${detail}`;
  if (typeof pct === "number") setBar(pct);
});

$("prepBtn").onclick = async () => {
  $("prepBtn").disabled = true;
  $("progtext").textContent = "starting…";
  const r = await window.api.prepare();
  $("progtext").innerHTML = r.ok
    ? '<span class="ok">✓ Python + torch + adb + brain code ready</span>'
    : `<span class="err">✗ ${r.error}</span>`;
  if (r.ok) setBar(55);
  $("prepBtn").disabled = false;
  return r.ok;
};

$("pairBtn").onclick = async () => {
  const addr = $("pairAddr").value.trim();
  const code = $("pairCode").value.trim();
  if (!addr || !code) return;
  $("adbOut").textContent = "pairing…";
  const r = await window.api.pair(addr, code);
  $("adbOut").textContent = r.out || "(no output)";
  $("adbOut").className = r.ok ? "ok" : "err";
};

$("connBtn").onclick = async () => {
  const dev = $("devAddr").value.trim();
  if (!dev) return;
  $("adbOut").textContent = "connecting…";
  const r = await window.api.connect(dev);
  $("adbOut").textContent = r.out || "(no output)";
  $("adbOut").className = r.ok ? "ok" : "err";
  if (r.ok) setBar(96);
};

$("goBtn").onclick = async () => {
  const r = await window.api.launch();
  if (!r.ok) {
    $("adbOut").className = "err";
    $("adbOut").textContent = "cannot start: " + (r.error || "no phone paired yet");
  }
};

document.querySelectorAll("[data-url]").forEach((a) => {
  a.onclick = () => window.api.openExternal(a.dataset.url);
});

// auto-run "prepare" once on first open (idempotent — skips already-installed parts)
(async () => {
  const r = await window.api.prepare();
  if (r.ok) setBar(55);
})();
