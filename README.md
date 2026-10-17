# NeuroML (CLASH ML v10 — Advanced Dueling Double DQN + PER + Groq VLM)

A neuron-geared reinforcement learning Clash Royale agent that plays on a real
Android phone over Wi-Fi ADB, powered by a **Dueling Double DQN with Residual
Synaptic Cortical Blocks, Prioritized Experience Replay (PER), 3-Step
Bootstrapping, Polyak Soft Target Plasticity**, **Full Vision** (all 5 tower HP
bars + active battlefield unit health bars + pixel card affordability), and
live **Groq VLM (`qwen/qwen3.8-27b`)** vision & tower-damage punishment.

## Advanced ML Architecture (`NeuroML v10`)

1. **Residual Cortical Synaptic Blocks (`SynapticResBlock`)**:
   - `38 full-vision sensory neurons → 128 LayerNorm + SiLU stem → 2 × 128-neuron skip-connected residual cortical blocks` so gradients flow cleanly without vanishing.
2. **Dueling Limbic & Motor Pathways (Wang et al.)**:
   - **Limbic Value Stream $V(s)$** (`128 → 64 → 1`): estimates how good/bad the current board state is overall.
   - **Motor Advantage Stream $A(s, a)$** (`128 → 64 → 20`): estimates the relative advantage of each `(card_slot, placement_zone)` pair.
   - Combined via $Q(s,a) = V(s) + \left(A(s,a) - \frac{1}{|A|}\sum_{a'} A(s,a')\right)$.
3. **Double DQN Target Decoupling (van Hasselt et al.)**:
   - Online policy network picks the best next action $a^* = \arg\max_a Q_{\text{policy}}(s', a)$, while the target network evaluates $Q_{\text{target}}(s', a^*)$ to prevent Q-value overestimation.
4. **Prioritized Experience Replay (PER, Schaul et al.)**:
   - Transitions with large TD error $|\delta_i|$ and severe tower-damage punishments are replayed with higher probability $P(i) \propto |\delta_i|^\alpha$ and corrected with importance-sampling weights $w_i = (N \cdot P(i))^{-\beta}$.
5. **3-Step Bootstrapping (N-Step Returns)**:
   - Accumulates 3-step discounted returns $\sum_{k=0}^{2} \gamma^k r_{t+k} + \gamma^3 Q(s_{t+3}, a^*)$ so delayed tower-damage punishments propagate 3× faster back to the card play that caused them.
6. **Polyak Soft Target Updates**:
   - Every training step smoothly blends target weights: $\theta_{\text{target}} \leftarrow \tau \theta_{\text{policy}} + (1 - \tau)\theta_{\text{target}}$ ($\tau = 0.015$).

## Full Vision & Live Groq VLM (`qwen/qwen3.8-27b`)

- **All 5 Tower HP Bars** (`[23..29]`): `ally_left`, `ally_right`, `ally_king`, `enemy_left`, `enemy_right`, plus alive tower counts.
- **Active Battlefield Unit Scanner** (`[30..37]`): real-time enemy and friendly unit health bars in left/right lanes and at both bridges.
- **True Pixel Card Affordability** (`[7..10]`): reads the pink elixir drop badge under each of the 4 hand slots.
- **Live Groq VLM Damage Judge (`groq_damage_punishment`)**: whenever our towers take damage, sends the board image + HP drop to Groq's multimodal `qwen/qwen3.8-27b` VLM and sentences the surge neurons with an immediate negative punishment (`-0.50` to `-3.50`, zero positive dopamine).
- **Live Groq VLM Screen Classifier (`groq_vision_classify`)**: classifies any `unknown` screen via `qwen/qwen3.8-27b` vision.

## Watching it learn on disk

```bash
tail -f training.log      # step, Huber loss, TD error (td_err), epsilon, buffer size
cat ml_metrics.json       # Dueling V(s), advantage spread, neuron firing rates, punishments
tail -f bot.log           # live decisions, tower HP readings, and Groq VLM judgements
```
