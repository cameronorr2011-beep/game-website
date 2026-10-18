/**
 * NeuroML mentor proxy — the ONE place a Groq key exists (Vercel env `key_for_ai`).
 *
 * Published apps (Android APK, Electron desktop, portable zip) NEVER hold an API
 * key: every model call from `bot_ml.py` routes through this endpoint. This is a
 * thin OpenAI-format forwarder with a hard model allowlist, a payload cap and a
 * per-IP polite throttle — the deterministic Referee keeps ALL reward authority.
 * Uses only raw Node http primitives (writeHead/end) so the exact same module is
 * testable locally with `tools/proxy_harness.cjs` and on Vercel unchanged.
 */
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const ALLOWED_MODELS = new Set(["qwen/qwen3.8-27b", "openai/gpt-oss-120b"]);
const ALLOWED_EFFORTS = new Set(["low", "medium"]);
const MAX_BODY_BYTES = 1.5 * 1024 * 1024; // 384px JPEG classify thumb ≈ 100 KB; generous
const THROTTLE_WINDOW_MS = 60 * 1000;
const THROTTLE_MAX = 14; // per IP, per window, per lambda instance (best effort)
const hits = new Map();

function send(res, status, body, headers) {
  const h = Object.assign({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }, headers || {});
  res.writeHead(status, h);
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }
  if (req.method !== "POST") {
    return send(res, 405, { error: "POST only" });
  }

  const key = process.env.key_for_ai || process.env.GROQ_API_KEY || "";
  if (!key) {
    return send(res, 503, { error: "mentor proxy not configured" });
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "ip";
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < THROTTLE_WINDOW_MS);
  if (list.length >= THROTTLE_MAX) {
    return send(res, 429, { error: "rate limited — retry in a minute" }, { "Retry-After": "30" });
  }
  list.push(now);
  hits.set(ip, list);

  let raw = "";
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      return send(res, 413, { error: "payload too large" });
    }
    raw += chunk;
  }
  let payload;
  try {
    payload = JSON.parse(raw || "{}");
  } catch {
    return send(res, 400, { error: "invalid JSON" });
  }
  if (!payload || typeof payload !== "object" || !Array.isArray(payload.messages) || !payload.messages.length) {
    return send(res, 400, { error: "expected OpenAI chat payload with messages[]" });
  }
  if (!ALLOWED_MODELS.has(payload.model)) {
    return send(res, 400, { error: "model not allowed" });
  }
  if (!(typeof payload.max_tokens === "number" && payload.max_tokens > 0 && payload.max_tokens <= 2000)) {
    payload.max_tokens = 1000;
  }
  if (typeof payload.temperature !== "number") payload.temperature = 0.0;

  const safe = {
    model: payload.model,
    messages: payload.messages,
    max_tokens: payload.max_tokens,
    temperature: payload.temperature,
  };
  if (ALLOWED_EFFORTS.has(payload.reasoning_effort)) safe.reasoning_effort = payload.reasoning_effort;

  try {
    const upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(safe),
    });
    const text = await upstream.text();
    const headers = {};
    if (upstream.status === 429) headers["Retry-After"] = "20";
    res.writeHead(upstream.status, headers);
    res.end(text);
  } catch (e) {
    send(res, 502, { error: `mentor upstream failed: ${String(e).slice(0, 120)}` });
  }
};
