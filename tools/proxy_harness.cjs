// Local test harness: serves api/mentor.js verbatim over plain Node http so the
// exact Vercel module can be exercised (routes, allowlist, throttle) without Vercel.
// Usage: node tools/proxy_harness.cjs [port]
const http = require("http");
const handler = require("../api/mentor.js");

const port = Number(process.argv[2] || 3100);
const server = http.createServer((req, res) => {
  Promise.resolve(handler(req, res)).catch((e) => {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: `harness: ${String(e).slice(0, 120)}` }));
  });
});
server.listen(port, () => console.log(`mentor harness on http://127.0.0.1:${port}/api/mentor`));
