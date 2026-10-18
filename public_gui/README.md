# NeuroMLCR — Download & Run in 5 Minutes

NeuroMLCR is an AI + machine-learning Clash Royale player for Android.
It sees the game through your phone's screen, plays matches, gets dopamine
rewards for wins, tower damage, and elixir efficiency, and is coached live by
Groq's gpt-oss-120b model (Punisher + Mentor). Everything it learns is on disk,
so closing/reopening never loses progress.

## What you need

| Thing | Where |
|---|---|
| Windows PC (or Mac, see notes) | any |
| Android phone | same Wi-Fi first, then anywhere |
| Free Groq API key | https://console.groq.com/keys |
| Clash Royale installed + signed in | phone |

## Setup (5 steps)

1. **Double-click `install.bat`** — checks Python, auto-installs torch + tools,
   and downloads adb if missing. If Python is missing it opens the download page
   for you (check "Add Python to PATH" during install, then rerun install.bat).
   It also runs `fetch_brain.py`: when a pretrained brain is published on the
   Releases page it downloads it; otherwise you start with a fresh brain that
   learns from the first match.

2. **Put `groq_key.txt` in this folder** — your free key from console.groq.com/keys
   (one line, starts with `gsk_`).

3. **Double-click `connect_phone.bat`** and follow the prompts:
   - **Same Wi-Fi (easy):** enable *Wireless debugging* in phone Developer
     options, tap "Pair device with pairing code", enter the IP:PORT + code when
     asked, then the connect IP:PORT when asked.
   - **Different Wi-Fi or mobile data (remote):** pair once on the same Wi-Fi
     first, then either (a) forward TCP port 5555 on your router, or (b) install
     Tailscale/ZeroTier on *both* phone and PC and use the phone's VPN IP
     (e.g. `100.x.y.z:5555`). `adb connect` works from any network once paired.
   - Keep the phone screen **on** (Settings → Display → Screen timeout: 10 min).

4. **Double-click `NeuroMLCR.bat`** — launches the AI Coach dashboard in your
   browser at http://127.0.0.1:8765 (live phone view + loss curves + coach feed)
   and starts the brain playing matches.

## What you'll see

- Dashboard: live phone screenshot, neuron firing rates, loss/TD-error curves,
  and the Groq coach feed (critiques + punishments + what it taught the bot).
- On disk: `training.log` (gradient steps), `ml_metrics.json` (counters),
  `bot.log` (live decisions), `ai_coach.jsonl` (coach reviews every ~20s),
  `ml_policy.pt` + `ml_replay.json` (the brain's memory).

## Fair play & safety

- The bot only taps inside Clash Royale; it auto-cancels quit dialogs and never
  opens account/deck-edit screens.
- Automating Clash Royale **violates Supercell's ToS**. Use on an account you
  accept losing.
- All AI features degrade gracefully offline (local pixel sensing + reward).

## Remote (different Wi-Fi / mobile data) details

Option A — Router port-forward: router → NAT/Gaming → forward TCP 5555 →
phone's local IP. Then `adb connect YOUR_PUBLIC_IP:5555` from anywhere.

Option B — VPN (recommended, no port opening): Tailscale on both devices →
`tailscale ip -4` on the phone gives 100.x.y.z → `adb connect 100.x.y.z:5555`.
Works over mobile data, hotel Wi-Fi, school Wi-Fi, anything.

## Files in this folder

- `install.bat` — one-click setup (also fetches the pretrained brain when one is published)
- `fetch_brain.py` — pulls `ml_policy.pt` (+ spiking nucleus state) from the Releases page;
  keeps anything already on disk, never overwrites your brain
- `connect_phone.bat` — phone pairing (same Wi-Fi or remote)
- `NeuroMLCR.bat` — start the brain + dashboard
- `dashboard.py` — AI Coach web dashboard (serves on port 8765)
- `bot_ml.py`, `bot.py` — the RL brain (DQN, 1024×6 residual cortex) and the non-ML bot
- `spiking_core.py` — LIF/STDP nucleus + affective core used by the hybrid brain
- `updater.py` — update code, never memory (`python updater.py --from-dir <fresh_copy>`)
- `federated.py` — opt-in anonymized model export/apply
- `cards.json`, `bot_config.json`, `meta_decks.json`, `my_deck.json` — game data
- `groq_key.txt` — *you create this* with your free API key
