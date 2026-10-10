# SKYFORGE — playable core release

Entry: `/games/skyforge.html`. Target repository: `cameronorr2011-beep/game-website`.
The existing arcade pages and classic game scripts remain intact. All locations
and aircraft geometry are original procedural constructions, not licensed real
aircraft assets or authentic airport/geographic data.

## Run and build

```bash
npm ci --no-audit --no-fund
npm test
npm run build
python -m http.server 8891 --bind 127.0.0.1
# Open http://127.0.0.1:8891/games/skyforge.html
```

Commit `dist/skyforge.js` and its linked license file. Hostinger deploys the
repository root with no server-side Node runtime. Three.js and Sky are bundled
locally. Fonts have a system fallback if Google Fonts is unreachable.
No TypeScript typecheck is configured; source is JavaScript ES modules.

## Implemented

- Fictional SF-172 trainer with modular 3D fuselage, wings, tail, glass, seats,
  yoke, gear/wheels, switch hit areas, moving propeller and control surfaces.
- Cockpit/chase/free cameras; right-drag look and wheel field-of-view zoom.
- Powered 3D IAS, attitude, altitude, turn, heading and vertical-speed gauges
  with state-driven values/needles; panel moving map and engine/fuel/oil data.
- 120 Hz fixed-step simulation with render interpolation, forces, density,
  lift/drag/thrust/gravity, damped angular response, stall lift reduction,
  sideslip, flap drag/lift, trim, gusts, ground contact, steering and braking.
- Starter, ignition, throttle, mixture cutoff/altitude efficiency, RPM response,
  finite fuel/burn, battery/alternator/bus loads, oil indications, lighting,
  explicit engine/electrical failures, engine-out scenario.
- Bounded 2 km procedural terrain tile cache (49 medium/high tiles), near/far
  mesh resolutions, instanced tree/building clusters, hills/mountains, coast,
  animated ocean, four flattened fictional airports, runways, taxi strips,
  hangars, tower, lights, windsocks and airport markers.
- Sky scattering shader, sun/hour lighting, exponential visibility haze,
  instanced layered cloud puffs, local rain particles, altitude-dependent wind.
- Airport/runway/route selection, add/remove waypoints, moving aircraft/map,
  calculated bearing, distance, course error and speed-based ETA.
- Free flight; sequential startup/taxi/takeoff/level/turn/landing training;
  landing challenge; cross-country; timed engine-out emergency. Completion
  logic uses actual flight state and touchdown/stop at the selected airport.
- Keyboard, optional Gamepad API inputs, sensitivity/invert/deadzone controls,
  systems sliders, control reference and pause on focus/visibility loss.
- Hard impact/overspeed/load consequences, stall/low-fuel/bus warnings,
  touchdown quality score, bounded path recording, post-flight report and JSON
  export (`skyforge-flight-report`, version 1).
- Versioned local preferences, completed training stages and last 20 flight
  reports (`skyforge-save-v1`). Invalid JSON/version fails safely to defaults.
- User-activated synthetic engine/wind/rain/click audio with master, engine,
  environment and interface volume controls.

## Flight-model assumptions

SI units internally. Mass = 820 kg + fuel at .72 kg/L; wing area 16.2 m²;
119 kW power, 2,700 maximum RPM. Lift coefficient = .24 + 4.6 × angle of attack
+ flap contribution, capped then reduced beyond stall angle. Drag = parasite
+ induced lift² + flap/sideslip/stall contributions. Propulsive power is converted
to thrust with a low-speed cap and density/mixture efficiency. Atmospheric density
uses an exponential altitude approximation. Body angular response is a damped
coefficient-based approximation, not a full six-degree-of-freedom inertia tensor
solver. Ground friction is load-based with simplified lateral tire damping.
Center of gravity/inertia are implicit fixed tuning rather than adjustable models.
These coefficients have **not** been validated against flight-test data.

## Verification

`npm test` runs the existing Flappy smoke test plus flight regressions for
startup/shutdown, taxi/brakes, takeoff/climb, roll/yaw/flaps, wind/stall response,
actual integrated ground touchdown/crash, fuel exhaustion, engine/electrical
failures, navigation, terrain flattening, deterministic replay and persistence.
The touchdown regression starts immediately above the runway; it is not proof
of a full manually flown approach-to-landing sequence.

Browser scripts (Playwright Page interface):
- `tools/qa-skyforge.mjs`: cold startup via controls, full power, real-time
  takeoff via keyboard, flaps, route editing, report download contents, reload
  persistence and rendering statistics.
- `tools/qa-skyforge-scenarios.mjs`: weather/night dispatch, electrical gauge
  power loss, mixture shutdown/restart, cameras, pause and desktop resolutions.

Initial local headless Chrome medium-renderer measurement: 57 FPS, p95 25.2 ms,
476 draw calls, 83k triangles, 49 tiles during a short runway/takeoff flight.
Selecting Low after boot currently changes resolution/shadows immediately;
terrain tile count applies on the next reload. Results are host/headless-specific,
not a claim of validated performance on typical desktop hardware. Startup and
synchronous tile transitions can be substantially slower than steady-state frames.

## Known limitations / next fidelity work

This is a playable procedural **core**, not the requested completed AAA/high-fidelity
simulator. Full scope still needs further implementation and validation:

- Aircraft/cockpit are visibly modular, not photorealistic; no sourced textures,
  ambient occlusion, water reflections, damage geometry, prop blur or detailed
  rivets/interior furnishings. Glass uses inexpensive transparency.
- No real geography/elevation datasets, rivers/lakes/bridges/roads/industrial
  network, global terrain, or floating-origin system. Airports are simplified.
- Clouds are instanced ellipsoids, not volumetric; no in-flight custom weather
  editor. No validated turbulence/sideslip/crosswind performance model.
- No radio tuning/navigation receiver simulation, separate magnetic compass,
  fuel selector/tanks, retractable gear, or full engine thermodynamics. Radio
  frequencies are explicitly decorative fictional labels, not functional controls.
- No configurable key bindings, multi-axis joystick calibration, or touch flight
  controls. Keyboard/gamepad are the intended flight interface.
- Only one aircraft. Training conditions exist, but every lesson and full
  cross-country/emergency completion has not been flown end-to-end by a human.
- Landing quality is calculated; route completion is a mission condition.
  Fuel/control variation are reported, not separate weighted score categories.
- Storage validation checks version, envelope and settings, not every nested
  archived report field. Logs store at most 30 minutes of one-second path samples.
- GPU context loss pauses and gives a reload recovery notice rather than fully
  reconstructing live GPU resources. Quality changes do not rebuild tile radius.
- Engine/wind audio is synthesized; no sampled prop/startup/warning sound library.
- Loading tile geometry is synchronous; a worker/incremental queue and airport
  instancing would improve streaming spikes and draw-call count.

Before calling this high fidelity: validate aerodynamics/handling against suitable
reference data, expand systems, create quality original cockpit/exterior assets,
complete flight-operation QA, and profile streaming/GPU behavior across real
hardware classes.
