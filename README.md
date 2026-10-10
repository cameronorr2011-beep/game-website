# ORR GAMZ

Static browser game site. The repository root is the deployable website root: `index.html`, `css/`, and `js/` must be copied directly into Hostinger's `public_html` directory.

## Hostinger Git deployment

Configure Hostinger Git deployment with:

- Repository: `https://github.com/cameronorr2011-beep/game-website.git`
- Branch: `main`
- Deployment directory: `public_html`
- Build command: none (this is a static site)
- Publish/copy source: repository root (`.`), not `game-website/` and not a build directory

Every push to `main` should deploy the repository contents so that `public_html/index.html` exists at the document root. Do not configure a nested destination such as `public_html/game-website`.

The site uses root-relative asset paths (`/css/style.css` and `/js/game.js`) so it works when served from the production domain root.

## SKYFORGE flight simulator

Play at `/games/skyforge.html` (linked from the homepage and games catalog).
Default controls are **W climb, S dive, A/D turn**, **Shift/Ctrl power**, and
**Space brakes**. Easy flight auto-levels when keys are released and starts
already airborne in chase view. Optional manual flight retains stall/trim
behavior; invert only applies there. Old control preferences migrate to the
new non-inverted airborne start.

Select **Beach**, **City**, **Cyberpunk**, or **Apocalypse** before launch.
Worlds have different terrain and scenery (palms/coasts, city grids, neon towers,
craters/ruins). Buildings have collision footprints shared with rendering.
Press **M** for the full terrain map: zoom, drag-pan, find aircraft, view airports,
race checkpoints and recorded path, and click coordinates to add waypoints.
**Change world / plane** returns to the hangar and ends the current flight.

Three selectable fictional aircraft (Peregrine trainer, Swift sport racer, and
Kestrel light explorer) with different power, mass, wings, liveries, and handling.
Use **Hangar / switch plane** to end the current flight and choose another.
Choose **Air race** for a 3-second airborne countdown and seven visible checkpoint
rings: gold is next, cyan is upcoming. Cross in order within 120 seconds; missed
rings must be approached again from the front. Races use clear midday weather;
best times are stored locally per world, flight-control mode, aircraft and departure runway (not an online
leaderboard). Race results are included in `skyforge-flight-report.json`.
Browser QA: `tools/qa-skyforge-race.mjs` checks switching, countdown, keyboard-only
checkpoint flight, full race completion, best-time persistence, and export. `tools/qa-skyforge-worlds.mjs` verifies WASD directions, all four
worlds, three planes, map navigation, export, persistence, and old-save migration.

True 3D procedural scenery, a working cockpit,
flight forces, aircraft systems, airports, route planning, weather, missions,
and local flight reports. This is a simplified playable core, not a validated
high-fidelity or real-world training simulator.

```bash
npm ci --no-audit --no-fund
npm test
npm run build
python -m http.server 8891 --bind 127.0.0.1
```

Vercel: `vercel.json` runs `npm run build` and publishes the generated `public/`
directory. Open `/games/skyforge.html` on the project's assigned domain.
For Hostinger, deploy the committed `dist/` bundle alongside the repository-root
site; no hosting build command is needed. Architecture, implemented systems, browser QA, measured performance,
and explicit limitations: [docs/SKYFORGE.md](docs/SKYFORGE.md).

## PHYCOFRONTIER algae discovery expedition

Play the original 2D exploration game at `/demo/`. It uses a deterministic
Canvas world with twelve connected habitats, keyboard/touch movement, scanning,
sample collection, functional microfluidic processing devices, a specimen
archive, technology unlocks, a world map, outposts, and schema-versioned local
progress. All organism names and traits are fictional game data; the game does
not claim validated biological results or cloud accounts.

```bash
node demo/test_logic.mjs
```

## Local smoke test

```bash
node smoke-test.mjs
```
