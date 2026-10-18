/**
 * NeuroML desktop — Electron shell for the REAL bot (public_gui code).
 *
 * 1. First-run setup: finds/installs Python + torch, downloads adb.
 * 2. Wi-Fi ADB pairing wizard with the full developer-options walkthrough.
 * 3. Runs bot_ml.py + dashboard.py and shows the live dashboard INSIDE the app
 *    window (real windowed app — never "open localhost in your browser").
 * The dashboard shows the CONNECTED phone's live screen/account; every install
 * pairs its own player phone. No Groq key is ever required (mentor proxy).
 */
const { app, BrowserWindow, ipcMain, shell, dialog } = require("electron");
const { spawn, execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

const RELEASE_ROOT = "https://github.com/cameronorr2011-beep/game-website";
const PYTHON_EMBED_URL =
  "https://www.python.org/ftp/python/3.12.10/python-3.12.10-embed-amd64.zip";
const GET_PIP_URL = "https://bootstrap.pypa.io/get-pip.py";
const ADB_URL =
  "https://dl.google.com/android/repository/platform-tools-latest-windows.zip";
const ADAPTER_SRC = path.join(__dirname, "..", "public_gui");

let win = null;
let botProc = null;
let dashProc = null;

const U = () => app.getPath("userData");
const neuromlDir = () => path.join(U(), "neuroml");
const pyDir = () => path.join(U(), "python312");
const adbDir = () => path.join(U(), "adb");

const send = (stage, detail, pct) => {
  if (win && !win.isDestroyed()) {
    win.webContents.send("progress", { stage, detail, pct });
  }
};

function download(url, destFile) {
  return new Promise((resolve, reject) => {
    const follow = (u, redirects) => {
      if (redirects > 6) return reject(new Error("too many redirects"));
      https
        .get(u, (r) => {
          if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
            r.resume();
            return follow(new URL(r.headers.location, u).href, redirects + 1);
          }
          if (r.statusCode !== 200) return reject(new Error(`HTTP ${r.statusCode} for ${u}`));
          const out = fs.createWriteStream(destFile);
          r.pipe(out);
          out.on("finish", () => out.close(() => resolve(destFile)));
          out.on("error", reject);
        })
        .on("error", reject);
    };
    follow(url, 0);
  });
}

function unzip(zipPath, destDir) {
  // PowerShell built-in Expand-Archive: no native zip dep needed on Windows.
  return new Promise((resolve, reject) => {
    execFile(
      "powershell",
      ["-NoProfile", "-Command", `Expand-Archive -Force -LiteralPath '${zipPath}' -DestinationPath '${destDir}'`],
      { timeout: 300000 },
      (err, stdout, stderr) => (err ? reject(new Error(stderr || String(err))) : resolve())
    );
  });
}

const runFile = (cmd, args, opts = {}) =>
  new Promise((resolve) => {
    execFile(cmd, args, { timeout: 120000, ...opts }, (err, stdout, stderr) =>
      resolve({ ok: !err, code: err ? err.code : 0, stdout: String(stdout || ""), stderr: String(stderr || "") })
    );
  });

async function setupPython() {
  if (await pyWorks(path.join(pyDir(), "python.exe"))) return "embedded";
  if (await pyWorks("python")) return "system";
  if (await pyWorks("py")) return "launcher";

  send("python", "Downloading portable Python (11 MB)…", 10);
  fs.mkdirSync(pyDir(), { recursive: true });
  const z = path.join(U(), "python-embed.zip");
  await download(PYTHON_EMBED_URL, z);
  send("python", "Unpacking Python…", 18);
  await unzip(z, pyDir());
  fs.rmSync(z, { force: true });
  // Embedded python must be allowed to import site-packages
  const pth = fs.readdirSync(pyDir()).find((f) => f.endsWith("._pth"));
  if (pth) {
    fs.writeFileSync(path.join(pyDir(), pth), "python312.zip\n.\nLib\\site-packages\nimport site\n");
  }
  send("python", "Installing pip…", 26);
  const gp = path.join(U(), "get-pip.py");
  await download(GET_PIP_URL, gp);
  await runFile(path.join(pyDir(), "python.exe"), [gp, "--no-warn-script-location"]);
  send("python", "Installing brain runtime: torch (CPU) + Pillow… (this is ~200 MB, once)", 30);
  const pip = ["-m", "pip", "install", "--no-warn-script-location",
    "torch", "--index-url", "https://download.pytorch.org/whl/cpu"];
  const r1 = await runFile(path.join(pyDir(), "python.exe"), pip);
  if (!r1.ok) throw new Error("torch install failed: " + r1.stderr.slice(-300));
  await runFile(path.join(pyDir(), "python.exe"),
    ["-m", "pip", "install", "--no-warn-script-location", "pillow"]);
  return "embedded";
}

async function pyWorks(cmd) {
  try {
    const r = await runFile(cmd, ["-c", "import torch, PIL"]);
    return r.ok;
  } catch {
    return false;
  }
}

function adbExe() {
  const cand = path.join(adbDir(), "platform-tools", "adb.exe");
  return fs.existsSync(cand) ? cand : "adb";
}

async function ensureAdb() {
  if (fs.existsSync(path.join(adbDir(), "platform-tools", "adb.exe"))) return;
  // adb already on PATH? (many devs have it via platform-tools install)
  if ((await runFile("adb", ["version"])).ok) return;
  send("adb", "Downloading Android platform-tools (adb)…", 44);
  fs.mkdirSync(adbDir(), { recursive: true });
  const z = path.join(U(), "platform-tools.zip");
  await download(ADB_URL, z);
  await unzip(z, adbDir());
  fs.rmSync(z, { force: true });
}

function copyBotCode() {
  // Like updater.py: code is refreshed, memory/weights/logs are NEVER touched.
  send("code", "Syncing brain code (weights and memory untouched)…", 48);
  fs.mkdirSync(neuromlDir(), { recursive: true });
  const KEEP = [
    "ml_policy.pt", "ml_target.pt", "ml_replay.json", "spiking_brain.json",
    "ml_metrics.json", "bot.log", "training.log", "ai_coach.jsonl", "mentor.log",
    "groq_key.txt", "bot_config.json", "my_deck.json", "cards.json",
    "meta_decks.json", "federated_package.pt", "federated_incoming",
    "federated_seed_ledger.json", "federated_outbox.json",
  ];
  const keep = (f) => KEEP.includes(f) || f.startsWith(".update_backups");
  for (const f of fs.readdirSync(ADAPTER_SRC)) {
    if (keep(f)) continue;
    const src = path.join(ADAPTER_SRC, f);
    if (!fs.statSync(src).isFile()) continue;
    fs.copyFileSync(src, path.join(neuromlDir(), f));
  }
}

async function configDevice(dev) {
  const cfgPath = path.join(neuromlDir(), "bot_config.json");
  let cfg = {};
  try { cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8")); } catch {}
  cfg.device = dev;
  // learn the connected player phone's real resolution for accurate taps
  const wm = await runFile(adbExe(), ["-s", dev, "shell", "wm", "size"]);
  const m = /(\d+)x(\d+)/.exec(wm.stdout || "");
  if (m) cfg.screen = { w: Number(m[1]), h: Number(m[2]) };
  fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
  return cfg;
}

function startBrain(dev) {
  const py = path.join(pyDir(), "python.exe");
  const cmd = fs.existsSync(py) ? py : "python";
  const env = { ...process.env, NEUROML_DEVICE: dev };
  botProc = spawn(cmd, ["bot_ml.py"], { cwd: neuromlDir(), env, stdio: "ignore" });
  dashProc = spawn(cmd, ["dashboard.py"], { cwd: neuromlDir(), env, stdio: "ignore" });
  botProc.on("exit", (c) => send("brain", `brain process exited (code ${c})`, 100));
}

async function showDashboard(dev) {
  send("brain", "Starting the brain…", 96);
  startBrain(dev);
  setTimeout(() => {
    if (win && !win.isDestroyed()) win.loadURL("http://127.0.0.1:8765");
  }, 2600);
}

// ---------------- IPC surface for the wizard renderer ----------------
ipcMain.handle("state", async () => ({
  hasBotConfig: fs.existsSync(path.join(neuromlDir(), "bot_config.json")),
  running: !!botProc,
}));

ipcMain.handle("prepare", async () => {
  try {
    const pyKind = await setupPython();
    await ensureAdb();
    copyBotCode();
    send("ready", `Python (${pyKind}) + adb + brain code ready`, 55);
    return { ok: true };
  } catch (e) {
    send("error", String(e.message || e), 0);
    return { ok: false, error: String(e.message || e) };
  }
});

ipcMain.handle("adb-pair", async (_e, ipPort, code) => {
  const r = await runFile(adbExe(), ["pair", ipPort, code]);
  return { ok: r.ok, out: (r.stdout + " " + r.stderr).trim().slice(0, 400) };
});

ipcMain.handle("adb-connect", async (_e, dev) => {
  const r1 = await runFile(adbExe(), ["connect", dev]);
  const r2 = await runFile(adbExe(), ["-s", dev, "get-state"]);
  const ok = r1.ok && r2.ok;
  if (ok) {
    await configDevice(dev);
    send("paired", `${dev} connected — this is the player phone`, 92);
  }
  return { ok, out: (r1.stdout + " " + r1.stderr + " " + r2.stdout + " " + r2.stderr).trim().slice(0, 400) };
});

ipcMain.handle("launch", async () => {
  let dev = "";
  try {
    const cfgPath = path.join(neuromlDir(), "bot_config.json");
    dev = JSON.parse(fs.readFileSync(cfgPath, "utf8")).device || "";
  } catch {}
  if (!dev) {
    const r = await runFile(adbExe(), ["devices"]);
    const m = r.stdout.split("\n").find((l) => /\b(device|emulator|unauthorized)\b/.test(l));
    if (m) dev = m.trim().split(/\s+/)[0];
  }
  if (!dev) return { ok: false, error: "no phone connected yet" };
  await showDashboard(dev);
  return { ok: true, device: dev };
});

ipcMain.handle("open-external", (_e, url) => shell.openExternal(url));

function createWin() {
  win = new BrowserWindow({
    width: 1180,
    height: 820,
    backgroundColor: "#0b0f14",
    title: "NeuroML",
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true },
  });
  win.setMenuBarVisibility(false);
  win.loadFile("wizard.html");
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWin);
app.on("window-all-closed", () => {
  try { botProc && botProc.kill(); dashProc && dashProc.kill(); } catch {}
  app.quit();
});
