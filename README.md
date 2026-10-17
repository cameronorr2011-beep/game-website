# CLASH ML

A machine-learning Clash Royale bot that plays on a real Android phone over
Wi-Fi ADB, learns from every match with a Deep Q-Network, and writes all its
training traces to disk so you can watch it learn.

## What makes it ML

- **Deep Q-Network (DQN)** built from scratch on PyTorch: 38-value state → 3
  hidden layers → 20 actions (4 card slots × 5 placement zones)
- **Real learning loop**: experience replay buffer, target network with
  periodic sync, epsilon-greedy exploration (decays 1.5%/match), Huber-loss
  backprop every 4 battle ticks
- **Reward shaping**: correct-lane defense +0.5, spending at max elixir +0.3,
  **elixir-leak penalty** (-0.1/tick escalation at 10 elixir), waste penalty
  when spending cheap into an empty field, +3 at match win, +1 survival at
  lobby return
- **Action masking**: the net can never pick a card slot it cannot afford
- **Persistent memory**: everything survives restarts/crashes
  | File | Purpose |
  |---|---|
  | `ml_policy.pt` | trained network weights + epsilon |
  | `ml_replay.json` | up to 5000 (state, action, reward) transitions |
  | `training.log` | one line per training step: step/loss/eps/buffer |
  | `ml_metrics.json` | machine-readable counters (see below) |
  | `bot.log` | every game decision and system event |

## Watching it learn on disk

```bash
tail -f training.log      # live per-step training losses
cat ml_metrics.json       # running counters, action distribution, reward curve
tail -f bot.log           # live decisions: elixir, lane threat, choice, reward
```

Loss going down ≠ nothing; rewards per action trending up and action
distribution shifting away from random are the real signals.

## Requirements

- Windows/PC with `adb` (platform-tools) on PATH
- Android phone on same Wi-Fi, wireless debugging paired
- Python 3.12+, then:
  ```bash
  pip install pillow torch --index-url https://download.pytorch.org/whl/cpu --extra-index-url https://pypi.org/simple
  ```
- Clash Royale installed on the phone, logged into the account you want played

## Connection (one-time)

1. Phone: Settings → Developer options → Wireless debugging → pair
2. `adb pair <IP:port> <code>` (see the phone's pairing dialog)
3. `adb connect <IP>` — device shows in `adb devices`
4. Set `device` in `bot_config.json` to that IP:port

## Running

```bash
python bot_ml.py            # plays autonomously, learns continuously
python bot_ml.py --build-deck   # prints a generated 8-card meta deck
python bot.py               # the non-ML rule-based bot (fallback)
```

To stop: Ctrl+C (memory saves on exit and every checkpoint).

## Safety rails

- Quit-dialog auto-Cancel, BACK-key rate limited to 2, foreground-app check
  with relaunch — it can't wander out of the game
- All taps stay inside the game UI; it never touches Android nav bar,
  settings, or Supercell ID screens
- 90-second stuck watchdog restarts the app instead of tapping randomly

## Honest limitations

- Vision is color-statistics based (elixir bar, lane variance, screen
  classification) — not object detection; odd screens can confuse it
- Opponent card memory slots exist but aren't photo-recognized yet
- Learning needs many matches to show clear improvement
- **Automating Clash Royale violates Supercell's Terms of Service.** Use an
  account you accept losing.

## Files

- `bot_ml.py` — the DQN bot (this README describes it)
- `bot.py` — earlier rule-based bot
- `cards.json`, `bot_config.json` — card DB and tap coordinates
- `training.log`, `ml_metrics.json`, `ml_replay.json`, `ml_policy.pt`, `bot.log` — generated at runtime
