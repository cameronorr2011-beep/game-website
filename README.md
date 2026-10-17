# NeuroML (CLASH ML v9)

A neuron-geared Deep Q-Network Clash Royale player that runs on a real Android
phone over Wi-Fi ADB, uses **Full Vision** (5-tower HP bar scanner, active
battlefield unit health-bar tracking, pixel-level card affordability, and
Groq multimodal vision fallback), and punishes its surge neurons via the
**Groq API Damage Judge** whenever our towers take damage or lose.

## What ML is occurring (`NeuroML`)

- **Surge Neuron Architecture (DQN)** built on PyTorch:
  `38 full-vision input neurons → 128 → 128 → 64 limbic interneurons → 20 output neurons`
  (4 card slots × 5 placement zones). Per-layer neuron firing rates are logged
  live to `ml_metrics.json`.
- **Full Vision State Vector (38 dimensions)**:
  - Elixir bar fill (`[0]`) and lane pixel variance (`[1..2]`)
  - Card costs (`[3..6]`) and **true pixel-sensed card slot affordability** from
    the magenta elixir drop badges (`[7..10]`)
  - Match phase (`[11..13]`) and last action (`[14..22]`)
  - **All 5 Tower HP bars** (`[23..27]`): `ally_left`, `ally_right`, `ally_king`,
    `enemy_left`, `enemy_right`, plus alive tower ratios (`[28..29]`)
  - **Active Battlefield Unit Vision** (`[30..37]`): real-time count of enemy
    and friendly unit health bars in left/right lanes and at both bridges
- **Dopamine & Groq Damage Punishment Rules**:
  - **Tower Damage Taken → Immediate Punishment (`-0.45` to `-3.50`, zero positive dopamine)**:
    Whenever our princess or king tower HP drops, NeuroML invokes `groq_damage_punishment()`
    (using `GROQ_API_KEY` or `groq_key.txt` with a deterministic local HP-delta
    baseline) and suppresses any positive reward for that tick.
  - **Match Loss → `-4.0` pure punishment, zero dopamine**
  - **Match Win → `+3.0` dopamine surge**
  - **Enemy Tower Damaged → `+0.4` to `+2.0` dopamine boost**
  - **Elixir Leak at 10 → escalating negative punishment (`-0.1 × ticks`)**
- **Strict App & Wi-Fi Gating**:
  - Runs **only** when `com.supercell.clashroyale` is the foreground app.
  - Automatically pauses when you leave home Wi-Fi and reconnects over ADB when
    the phone returns.

## Watching it learn on disk

```bash
tail -f training.log      # live per-step gradient descent losses
cat ml_metrics.json       # neuron firing rates, vision state, damage_punishments
tail -f bot.log           # live decisions, tower HP readings, and Groq punishments
```

## Groq API Key Setup (Optional Vision Fallback & LLM Damage Judge)

Create `groq_key.txt` in the working directory (git-ignored) or set `GROQ_API_KEY`:
```bash
echo gsk_your_key_here > groq_key.txt
```

## Running

```bash
python bot_ml.py                # runs NeuroML v9 with full vision + gating
python bot_ml.py --build-deck   # prints a role-balanced 8-card deck
```
