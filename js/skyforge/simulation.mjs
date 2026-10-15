import { landscape, worldFor, worldProps } from './worlds.mjs';
// SKYFORGE: 6-DOF aerodynamic & Fly-By-Wire flight dynamics engine (SI units).
export const DT = 1 / 120;
export const G = 9.80665;
export const AIRCRAFT = Object.freeze({ name: 'SF-172 Peregrine', dryMass: 820, fuelDensity: .72, wingArea: 16.2, span: 11, maxPower: 119000, idleRpm: 750, maxRpm: 2700, stallAlpha: .28, cl0: .24, clAlpha: 4.8, cd0: .03, induced: .054 });
export const AIRCRAFTS = Object.freeze([
  Object.freeze({ ...AIRCRAFT, id: 'peregrine', role: 'Balanced trainer', fuelCapacity: 140, thrustLimit: 2450, rollRate: 1.35, color: 0xc75535, wingHeight: 2.55, rotateKt: 52, description: 'Predictable handling. A good first aircraft.' }),
  Object.freeze({ ...AIRCRAFT, id: 'swift', name: 'SF-220 Swift', role: 'Sport racer', dryMass: 740, wingArea: 13.5, span: 9, maxPower: 168000, cd0: .024, fuelCapacity: 110, thrustLimit: 3200, rollRate: 2.05, color: 0x42bde0, wingHeight: .7, rotateKt: 58, description: 'More power, quicker rolls, low wing. For chasing records.' }),
  Object.freeze({ ...AIRCRAFT, id: 'kestrel', name: 'SF-90 Kestrel', role: 'Light explorer', dryMass: 560, wingArea: 18.5, span: 12.5, maxPower: 84000, cl0: .3, cd0: .036, fuelCapacity: 90, thrustLimit: 1950, rollRate: 1.05, color: 0xe9b949, wingHeight: 2.55, rotateKt: 43, description: 'Lightweight, slower, and gentle. Great for sightseeing.' }),
]);
export const EXTRA_AIRCRAFTS = Object.freeze([
  Object.freeze({ ...AIRCRAFT, id: 'valkyrie', name: 'SF-X80 Valkyrie', role: 'Twin-tail jet interceptor', dryMass: 920, wingArea: 14.8, span: 9.6, maxPower: 265000, idleRpm: 1100, maxRpm: 3600, cd0: .019, induced: .045, fuelCapacity: 180, thrustLimit: 5400, rollRate: 2.6, color: 0x8b5cf6, wingHeight: .85, rotateKt: 62, isJet: true, description: 'High-thrust swept-wing interceptor with twin tails and glowing afterburner.' }),
]);
export const ALL_AIRCRAFTS = Object.freeze([...AIRCRAFTS, ...EXTRA_AIRCRAFTS]);
export const aircraftFor = id => ALL_AIRCRAFTS.find(a => a.id === id) || AIRCRAFTS[0];
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const radians = d => d * Math.PI / 180;
export const degrees = r => r * 180 / Math.PI;
export const wrap = r => Math.atan2(Math.sin(r), Math.cos(r));
export const AIRPORTS = Object.freeze([
  { id: 'SF01', name: 'Skyforge Bay', x: 0, z: 0, elevation: 12, heading: 0, length: 1500, width: 38, runways: ['36', '18'] },
  { id: 'SF02', name: 'Pine Valley', x: 6500, z: 11000, elevation: 185, heading: .6, length: 1250, width: 34, runways: ['03', '21'] },
  { id: 'SF03', name: 'Cape Aurora', x: -8500, z: 16500, elevation: 28, heading: -.5, length: 1650, width: 40, runways: ['33', '15'] },
  { id: 'SF04', name: 'Highland Field', x: 15000, z: 22000, elevation: 520, heading: 1.2, length: 1050, width: 30, runways: ['07', '25'] },
]);
export const WEATHER = Object.freeze({
  clear: { name: 'Clear / calm', wind: 0, direction: 270, gust: 0, turbulence: .05, cloud: .12, visibility: 28000, rain: 0, temperature: 15 },
  breeze: { name: 'Coastal breeze', wind: 5, direction: 280, gust: 2, turbulence: .3, cloud: .45, visibility: 20000, rain: 0, temperature: 18 },
  overcast: { name: 'Overcast / rain', wind: 7, direction: 220, gust: 3, turbulence: .5, cloud: 1, visibility: 9000, rain: .7, temperature: 11 },
  fog: { name: 'Morning fog', wind: 2, direction: 180, gust: .5, turbulence: .1, cloud: .55, visibility: 2200, rain: 0, temperature: 8 },
  storm: { name: 'Thunderstorm / gusty', wind: 11, direction: 245, gust: 5, turbulence: .65, cloud: 1, visibility: 6500, rain: .95, temperature: 9 },
});
export function naturalTerrain(x, z) {
  const coast = 95 + z * .009 + 115 * Math.sin(x / 4500) + 100 * Math.sin(z / 3900);
  const mountain = 1100 * Math.exp(-((x - 14000) ** 2 + (z - 17000) ** 2) / 90000000);
  const ridge = 260 * Math.sin(x / 1700) * Math.sin(z / 2200) + 85 * Math.sin(x / 520 + z / 710);
  const detail = 18 * Math.sin(x / 110) * Math.sin(z / 150);
  return coast + mountain + ridge + detail;
}
export function terrainHeight(x, z, world) {
  let h = world ? landscape(x,z,world) : naturalTerrain(x, z);
  for (const a of AIRPORTS) {
    const dx = x - a.x, dz = z - a.z;
    const along = dx * Math.sin(a.heading) + dz * Math.cos(a.heading);
    const across = dx * Math.cos(a.heading) - dz * Math.sin(a.heading);
    const d = Math.max(Math.abs(along) - a.length / 2 - 160, Math.abs(across) - 260);
    if (d < 0) return a.elevation;
    if (d < 450) { const t = d / 450; const s = t * t * (3 - 2 * t); h = a.elevation * (1 - s) + h * s; }
  }
  return h;
}
export const surfaceHeight = (x, z, world) => Math.max(0, terrainHeight(x, z, world));
export function keyboardFlightInput(keys) {
  const has=k=>Number(keys.has(k));
  return { throttleUp:has('KeyW')+has('ShiftLeft')+has('ShiftRight'), throttleDown:has('ControlLeft')+has('ControlRight'), brake:has('KeyS')+has('Space')+has('KeyB'), throttleDownKeyS:has('KeyS'), turn:has('KeyD')+has('ArrowRight')-has('KeyA')-has('ArrowLeft'), pitch:has('ArrowUp')-has('ArrowDown'), rudder:has('KeyE')-has('KeyQ'), boost:has('KeyX') };
}
export function sceneryCollision(s){
  const cx=Math.floor(s.x/2000),cz=Math.floor(s.z/2000);
  return worldProps(cx,cz,s.world,terrainHeight,AIRPORTS).some(p=>p.type==='building'&&Math.abs(s.x-p.x)<p.width/2+2&&Math.abs(s.z-p.z)<p.depth/2+2&&s.y<p.y+p.height+1);
}
export function runwayPosition(a, x, z) {
  const dx = x - a.x, dz = z - a.z;
  return { along: dx * Math.sin(a.heading) + dz * Math.cos(a.heading), across: dx * Math.cos(a.heading) - dz * Math.sin(a.heading) };
}
export function airportAt(x, z) {
  return AIRPORTS.find(a => { const p = runwayPosition(a, x, z); return Math.abs(p.along) < a.length / 2 && Math.abs(p.across) < a.width / 2; }) || null;
}
export function bearing(from, to) { return (degrees(Math.atan2(to.x - from.x, to.z - from.z)) + 360) % 360; }
export function navigation(s) {
  const target = s.route[s.waypoint] || AIRPORTS.find(a => a.id === s.destination) || AIRPORTS[1];
  const distance = Math.hypot(target.x - s.x, target.z - s.z);
  const course = bearing(s, target);
  const speed = Math.hypot(s.vx, s.vz);
  return { target, distance, bearing: course, error: degrees(wrap(radians(course) - s.heading)), eta: speed > 2 ? distance / speed : null };
}
export function windAt(s) {
  const w = s.weather;
  const speed = (w.wind + w.gust * Math.sin(s.time * .63 + s.y * .002)) * (1 + Math.max(0, s.y) / 12000);
  const dir = radians(w.direction + 180);
  const wx = Math.sin(dir) * speed, wz = Math.cos(dir) * speed;
  // Ridge lift / orographic updraft when wind blows up a terrain slope, plus gentle convective thermals
  let ridgeLift = 0;
  if (speed > .5) {
    const h0 = terrainHeight(s.x, s.z, s.world);
    const hUpwind = terrainHeight(s.x - wx * 4, s.z - wz * 4, s.world);
    const agl = Math.max(0, s.y - Math.max(0, h0));
    ridgeLift = clamp((h0 - hUpwind) * .18 * Math.exp(-agl / 450), -2.5, 4.5);
  }
  const turbY = w.turbulence * (.55 * Math.sin(s.time * 1.7) + .3 * Math.sin(s.time * 3.1));
  return { x: wx, z: wz, y: turbY + ridgeLift };
}
export function createFlight(config = {}) {
  const plane = aircraftFor(config.aircraft);
  const a = AIRPORTS.find(a => a.id === config.departure) || AIRPORTS[0];
  const reverse = config.runway === a.runways[1];
  const heading = a.heading + (reverse ? Math.PI : 0);
  const airborne = config.start === 'air' || ['landing', 'emergency', 'race', 'aerobatics'].includes(config.mode);
  const offset = airborne ? -3000 : -a.length / 2 + 80;
  const x = a.x + Math.sin(heading) * offset, z = a.z + Math.cos(heading) * offset;
  const altitude = airborne ? Math.max(a.elevation + (config.mode === 'landing' ? 160 : 750), surfaceHeight(x,z,config.world)+200) : a.elevation + 1.25;
  const startEngine = airborne || config.ready;
  const s = {
    version: 1, world: config.world ? worldFor(config.world).id : undefined, assist: config.assist !== false && Boolean(config.world), aircraft: plane.name, aircraftId: plane.id, departure: a.id, destination: config.mode === 'landing' ? a.id : config.destination || 'SF02',
    mode: config.mode || 'free', runway: config.runway || a.runways[0], route: [], waypoint: 0,
    x, y: altitude, z, vx: Math.sin(heading) * (airborne ? 43 : 0), vy: airborne && config.mode === 'landing' ? -2 : 0, vz: Math.cos(heading) * (airborne ? 43 : 0),
    heading, pitch: airborne ? .02 : 0, roll: 0, p: 0, q: 0, r: 0,
    controls: { elevator: 0, aileron: 0, rudder: 0, throttle: startEngine ? (config.mode === 'landing' ? .35 : .7) : 0, mixture: 1, trim: 0, flaps: config.mode === 'landing' ? .5 : 0, brake: 0 },
    systems: { battery: Boolean(startEngine), ignition: Boolean(startEngine), starter: false, engine: Boolean(startEngine), rpm: startEngine ? 1900 : 0, batteryAh: 24, voltage: startEngine ? 28 : 0, alternator: true, fuel: plane.fuelCapacity, oilTemp: 20, oilPressure: 0, navLights: true, landingLights: false, beacon: true, strobe: false, panelLights: false },
    failures: { engine: false, electrical: false }, weather: { ...(WEATHER[config.weather] || WEATHER.clear), ...(config.customWeather || {}) },
    hour: config.hour ?? worldFor(config.world).hour, dayCycle: true, damage: 0, time: 0, grounded: !airborne, wasAirborne: airborne, airspeed: airborne ? 43 : 0,
    alpha: 0, sideslip: 0, lift: 0, drag: 0, thrust: 0, density: 1.225, gLoad: 1, warnings: [],
    flightPath: [], lastPathTime: -1, distanceFlown: 0, fuelUsed: 0, peakAltitude: altitude, maxG: 1, smoothness: 0, previousControls: [0, 0, 0],
    touchdown: null, status: 'active', objective: 'Start the engine, taxi, and explore the fictional archipelago.', trainingStep: 0, achievements: [], emergencyTriggered: false,
  };
  const dest = AIRPORTS.find(p => p.id === s.destination) || AIRPORTS[1];
  s.route = config.route?.length ? config.route.map(p => ({ ...p })) : [{ id: dest.id, name: dest.name, x: dest.x, z: dest.z }];
  if(s.mode==='free'&&s.systems.engine)s.objective=`Explore ${worldFor(s.world).name} — W/S power & air-brake, ↑/↓ pitch, A/D bank. M opens the map; Hangar changes world or plane.`;
  if (s.mode === 'training') s.objective = 'TRAINING 1/6 — Start the engine: battery, ignition, then starter.';
  if (s.mode === 'landing') s.objective = `Land on ${a.name} runway ${s.runway}; target 60–70 kt, shallow descent.`;
  if (s.mode === 'crosscountry') s.objective = `Fly the route and land at ${dest.name}.`;
  if (s.mode === 'emergency') s.objective = 'Engine failure at 10 seconds. Glide at 65 kt, choose a safe landing area.';
  if (s.mode === 'race' || s.mode === 'aerobatics') {
    // Identical conditions keep per-aircraft/runway personal bests comparable.
    s.weather = { ...WEATHER.clear }; s.hour = 14; s.dayCycle = false;
    const isAero = s.mode === 'aerobatics';
    const gates = Array.from({ length: 7 }, (_, i) => {
      const along = 350 + i * (isAero ? 480 : 450), across = i < 2 ? 0 : Math.sin((i - 1) * (isAero ? .95 : .65)) * (isAero ? 260 : 180);
      const altOffset = isAero && i >= 1 ? Math.sin(i * 1.15) * 95 : 0;
      return { id: `GATE${i + 1}`, name: `Checkpoint ${i + 1}`, x: x + Math.sin(heading) * along + Math.cos(heading) * across, y: altitude + altOffset, z: z + Math.cos(heading) * along - Math.sin(heading) * across, heading, radius: isAero ? 85 : 90 };
    });
    s.race = { gates, next: 0, countdown: 3, elapsed: 0, limit: 120, outcome: null, styleScore: 0 };
    s.route = gates.map(g => ({ ...g }));
    s.controls.throttle = .85;
    s.objective = isAero ? 'AEROBATICS — fly through the slalom rings at varying altitudes for bonus style points!' : 'RACE — get ready! Fly through the glowing rings in order.';
  }
  return s;
}
function updateSystems(s, dt) {
  const sys = s.systems, c = s.controls, plane = aircraftFor(s.aircraftId);
  const powered = sys.battery && sys.batteryAh > 0 && !s.failures.electrical;
  if (sys.starter && powered && sys.ignition && c.mixture > .15 && sys.fuel > 0 && !s.failures.engine) sys.engine = true;
  if (!sys.ignition || c.mixture < .05 || sys.fuel <= 0 || s.failures.engine) sys.engine = false;
  const targetRpm = sys.engine ? plane.idleRpm + c.throttle * (plane.maxRpm - plane.idleRpm) : 0;
  sys.rpm += (targetRpm - sys.rpm) * Math.min(1, dt * (plane.isJet ? 3.2 : 2.4));
  const alternator = sys.engine && sys.rpm > 1000 && sys.alternator && !s.failures.electrical;
  const loads = 2 + (sys.navLights ? 2 : 0) + (sys.landingLights ? 7 : 0) + (sys.panelLights ? 1 : 0) + (sys.starter ? 100 : 0);
  sys.batteryAh = clamp(sys.batteryAh + (alternator ? 12 : powered ? -loads : 0) * dt / 3600, 0, 24);
  sys.voltage = powered ? alternator ? 28 : 22 + sys.batteryAh / 12 : 0;
  const use = sys.engine ? (.0007 + c.throttle * .008) * (plane.maxPower / AIRCRAFT.maxPower) * dt : 0;
  sys.fuel = Math.max(0, sys.fuel - use); s.fuelUsed += use;
  sys.oilTemp += ((sys.engine ? 70 + c.throttle * 35 : s.weather.temperature) - sys.oilTemp) * dt * .006;
  sys.oilPressure += ((sys.engine ? 20 + sys.rpm / 60 : 0) - sys.oilPressure) * dt * 2;
}
// Equivalent indicated speed follows dynamic pressure, not true/ground speed.
export function indicatedAirspeed(s) { return s.airspeed * Math.sqrt(s.density / 1.225); }
export function aerodynamicCoefficients(alpha, flaps, sideslip, agl, plane = AIRCRAFT) {
  const stallAngle = plane.stallAlpha + flaps * .035;
  const absA = Math.abs(alpha);
  const stalled = absA > stallAngle;
  // Continuous post-stall lift curve: smooth peak at stallAngle, gradual decay into deep stall, no discontinuity
  let cl;
  if (!stalled) {
    cl = clamp(plane.cl0 + plane.clAlpha * alpha + flaps * .65, -1.35, 1.72 + flaps * .4);
  } else {
    const peakCl = clamp(plane.cl0 + plane.clAlpha * Math.sign(alpha) * stallAngle + flaps * .65, -1.35, 1.72 + flaps * .4);
    const excess = absA - stallAngle;
    const postStallFactor = clamp(Math.exp(-excess * 3.2), .22, 1);
    const flatPlate = .95 * Math.sin(2 * alpha);
    cl = peakCl * postStallFactor + flatPlate * (1 - postStallFactor) * .45;
  }
  // Standard approximate induced-drag reduction near a surface; no extra lift.
  const heightRatio = 16 * Math.max(0, agl) / plane.span;
  const groundEffect = clamp(heightRatio ** 2 / (1 + heightRatio ** 2), .15, 1);
  const stallDrag = stalled ? .18 + Math.min(.65, (absA - stallAngle) * 1.4) : 0;
  const cd = plane.cd0 + plane.induced * cl ** 2 * groundEffect + flaps * .065 + stallDrag + .12 * Math.abs(sideslip);
  return { cl, cd, stalled, groundEffect };
}

export function stepFlight(s, dt = DT) {
  if (s.status !== 'active') return;
  dt = clamp(dt, 0, .025);
  const c = s.controls, plane = aircraftFor(s.aircraftId);
  if (s.race?.countdown > 0) {
    s.race.countdown = Math.max(0, s.race.countdown - dt);
    s.objective = `RACE — ${Math.ceil(s.race.countdown) || 'GO'} · fly through the gold ring, then follow the cyan rings.`;
    return;
  }
  const previousPosition = { x: s.x, y: s.y, z: s.z };
  for (const k of ['throttle', 'mixture', 'flaps', 'brake']) c[k] = clamp(c[k], 0, 1);
  for (const k of ['elevator', 'aileron', 'rudder', 'trim']) c[k] = clamp(c[k], -1, 1);
  s.time += dt;
  if (s.dayCycle) s.hour = (s.hour + dt / 3600) % 24;
  if (s.mode === 'emergency' && s.time > 10 && !s.emergencyTriggered) { s.failures.engine = true; s.emergencyTriggered = true; }
  updateSystems(s, dt);

  const wind = windAt(s), ax = s.vx - wind.x, ay = s.vy - wind.y, az = s.vz - wind.z;
  const horizontalAir = Math.hypot(ax, az), airspeed = Math.hypot(horizontalAir, ay);
  s.airspeed = airspeed;
  const airHeading = horizontalAir > .5 ? Math.atan2(ax, az) : s.heading;
  const gamma = Math.atan2(ay, Math.max(.5, horizontalAir));
  s.alpha = wrap(s.pitch - gamma);
  s.sideslip = wrap(airHeading - s.heading);
  s.density = 1.225 * Math.exp(-Math.max(0, s.y) / 8500) * 288.15 / (273.15 + s.weather.temperature);
  const mass = plane.dryMass + s.systems.fuel * plane.fuelDensity;
  const pressure = .5 * s.density * airspeed ** 2;
  // Propeller slipstream blows over the tail surfaces even at low taxi/takeoff speeds
  const propwash = s.systems.engine && !plane.isJet ? c.throttle * 180 : 0;
  const effectiveness = clamp((pressure + propwash) / 780, .08, 2.2);
  const turbulence = s.weather.turbulence;

  // Autopilot outer loop feeds into either Fly-By-Wire assist or manual control surfaces
  if (s.autopilot?.enabled && !s.grounded) {
    const hdgErr = wrap(s.autopilot.heading - s.heading);
    const altErr = s.autopilot.altitude - s.y;
    const apTurn = clamp(hdgErr * 1.9, -1, 1);
    const apPitch = clamp((altErr * .018 - s.vy * .08), -.7, .7);
    if (s.assist) s.easyInput = { pitch: apPitch, turn: apTurn, brake: 0 };
    else { c.aileron = clamp((apTurn * .48 - s.roll) * 1.9, -1, 1); c.elevator = clamp(apPitch * .65, -1, 1); }
  }

  // Fly-By-Wire (FBW) Stability Augmentation System when s.assist is enabled:
  // Computes real elevator/aileron/rudder deflections and auto-trim so the plane flies through
  // the exact same Newtonian aerodynamic force integration as manual flight (real momentum, real G-load, real energy).
  let airbrakeDrag = 0;
  if (s.assist) {
    const input = s.easyInput || { pitch: 0, turn: 0, brake: 0 };
    const responsive = plane.rollRate / 1.2;
    // Racing/aerobatic modes bank harder (54°) so the slalom geometry is flyable at race speed.
    const targetBank = clamp(input.turn, -1, 1) * (s.race ? .95 : .54);
    const bankErr = wrap(targetBank - s.roll);
    c.aileron = clamp(bankErr * 3.2 * responsive - s.p * .55, -1, 1);

    const canRotate = !s.grounded || (airspeed * 1.94384 > plane.rotateKt * .92 && input.pitch >= 0);
    if (s.grounded && !canRotate) {
      c.elevator = 0;
      c.rudder = clamp(input.turn, -1, 1);
    } else {
      const bankSupport = Math.max(.48, Math.cos(s.roll));
      const thrustSinEst = s.systems.engine ? Math.sin(clamp(s.pitch, -.2, .2)) * plane.thrustLimit * c.throttle * .45 : 0;
      const reqLift = Math.max(0, mass * G - thrustSinEst) / bankSupport;
      const reqCl = reqLift / Math.max(220, pressure * plane.wingArea) - c.flaps * .65;
      const levelAlpha = clamp((reqCl - plane.cl0) / plane.clAlpha, -.06, plane.stallAlpha * .78);
      let targetPitch;
      if (Math.abs(input.pitch) > .02) {
        targetPitch = clamp(input.pitch, -1, 1) * .32;
      } else if (input.brake && !s.grounded) {
        // Gentle air-brake descent when holding S in the air without pitch keys
        const desiredVy = -1.6;
        const vyErr = desiredVy - s.vy;
        targetPitch = clamp(levelAlpha + vyErr * .018, -.14, .18);
      } else {
        // Hands-off flight path hold: converge vertical speed to 0 (level flight) while compensating for bank G-load
        const vyErr = -s.vy;
        targetPitch = clamp(levelAlpha + vyErr * .022, -.22, .30);
      }
      // Stall AoA envelope protection in FBW mode
      const maxSafePitch = gamma + plane.stallAlpha * .88;
      targetPitch = Math.min(targetPitch, maxSafePitch);
      const pitchErr = targetPitch - s.pitch;
      const eqElevator = ((s.alpha - .035 - c.flaps * .045) * 1.3 - c.trim * .16) / .52;
      c.elevator = clamp(eqElevator + (pitchErr * 5.2 - s.q * .95) / Math.max(.35, effectiveness), -1, 1);
      c.rudder = clamp(-s.sideslip * 1.5 + input.turn * .2, -1, 1);
    }
    if (input.brake && !s.grounded) airbrakeDrag = .22;
  }

  // Rotational dynamics: pitch (q), roll (p), and coordinated yaw (r)
  const alphaStiffness = s.assist ? 1.3 : 1.05;
  const desiredQ = (c.elevator * .52 + c.trim * .16 - (s.alpha - .035 - c.flaps * .045) * alphaStiffness) * effectiveness;
  s.q += (desiredQ - s.q) * Math.min(1, dt * 4.2);
  s.p += (c.aileron * plane.rollRate * effectiveness - s.p * 3.1) * dt;
  const turn = G * Math.sin(s.roll) * Math.cos(s.pitch) / Math.max(22, horizontalAir);
  const rudderGround = clamp(airspeed / 18, .22, 1.35);
  const yawTarget = s.grounded
    ? (c.rudder + (s.assist ? (s.easyInput?.turn || 0) : c.aileron * .25)) * rudderGround * .55
    : turn + c.rudder * .26 * effectiveness + s.sideslip * .95;
  s.r += (yawTarget - s.r) * Math.min(1, dt * 3.2);

  // Pitch/roll/yaw kinematic coupling (banked elevator pull contributes to heading turn as well as pitch)
  const cosRoll = Math.cos(s.roll), sinRoll = Math.sin(s.roll);
  const dPitch = (s.q * cosRoll - s.r * sinRoll * .15) * dt + turbulence * Math.sin(s.time * 2.9) * dt * (s.assist ? .003 : .008);
  const dHeading = (s.r + s.q * sinRoll * .35) * dt;
  s.pitch = s.assist ? clamp(s.pitch + dPitch, -.65, .65) : wrap(s.pitch + dPitch);
  s.roll = wrap(s.roll + s.p * dt + turbulence * Math.sin(s.time * 2.2) * dt * (s.assist ? .005 : .014));
  s.heading = wrap(s.heading + dHeading);

  const agl = s.y - surfaceHeight(s.x, s.z, s.world);
  if (s.grounded) {
    const maxGroundPitch = airspeed * 1.94384 > plane.rotateKt * .85 ? .24 : .02;
    s.pitch = clamp(s.pitch, -.02, maxGroundPitch);
    s.roll *= Math.exp(-dt * 10);
  }

  const { cl, cd, stalled: stall } = aerodynamicCoefficients(s.alpha, c.flaps, s.sideslip, agl, plane);
  s.lift = pressure * plane.wingArea * cl;
  // Airbrake spoilers in assist mode bleed excess speed cleanly without stalling; near minimum cruise (~43 m/s), spoilers retract
  const spoilerFactor = s.assist && airbrakeDrag > 0 ? clamp((airspeed - 37) / 8, 0, 1) : 1;
  s.drag = pressure * plane.wingArea * (cd + airbrakeDrag * spoilerFactor);

  const altitudePower = Math.exp(-Math.max(0, s.y) / (plane.isJet ? 13500 : 11000));
  const mixtureEfficiency = clamp(1 - Math.abs(c.mixture - clamp(1 - s.y / 10000, .45, 1)) * 1.5, 0, 1);
  const rpmRatio = clamp(s.systems.rpm / (plane.isJet ? 2600 : 2100), 0, 1.15);
  // Prop/jet thrust model with realistic static thrust and high-speed jet ram recovery
  const rawThrust = plane.isJet
    ? plane.thrustLimit * (c.throttle ** 1.1) * (.88 + clamp(airspeed / 95, 0, .35))
    : Math.min(plane.thrustLimit, plane.maxPower * c.throttle * .82 / Math.max(20, airspeed));
  // In FBW assist mode, auto-throttle floor prevents accidental deep-stall when climbing or air-braking
  let effectiveThrottleThrust = s.systems.engine ? rawThrust * altitudePower * mixtureEfficiency * rpmRatio : 0;
  if (s.assist && s.systems.engine && !s.grounded && airspeed < 44) {
    const protectionThrust = plane.thrustLimit * clamp((44 - airspeed) / 8, 0, .95) * altitudePower;
    effectiveThrottleThrust = Math.max(effectiveThrottleThrust, protectionThrust);
  }
  s.thrust = effectiveThrottleThrust;

  const sinH = Math.sin(airHeading), cosH = Math.cos(airHeading), sinG = Math.sin(gamma), cosG = Math.cos(gamma);
  const liftY = s.lift * Math.cos(s.roll) * cosG;
  const liftHorizontal = -s.lift * Math.cos(s.roll) * sinG;
  const sideForce = s.lift * Math.sin(s.roll) + pressure * plane.wingArea * (c.rudder * .08 - s.sideslip * .38);
  let fx = Math.sin(s.heading) * Math.cos(s.pitch) * s.thrust + sinH * liftHorizontal + cosH * sideForce;
  let fz = Math.cos(s.heading) * Math.cos(s.pitch) * s.thrust + cosH * liftHorizontal - sinH * sideForce;
  let fy = Math.sin(s.pitch) * s.thrust + liftY - mass * G;
  if (airspeed > .1) { fx -= s.drag * ax / airspeed; fy -= s.drag * ay / airspeed; fz -= s.drag * az / airspeed; }

  // Normal airframe load is lift magnitude over weight (real banked-turn and pull-up G-load in both modes)
  s.gLoad = s.grounded ? 1 : s.lift / (mass * G);
  s.maxG = Math.max(s.maxG, Math.abs(s.gLoad));

  const floor = surfaceHeight(s.x, s.z, s.world) + 1.25;
  if (s.grounded && s.y <= floor + .2 && fy <= 0) {
    fy = 0; s.vy = 0; s.y = floor;
    const speed = Math.hypot(s.vx, s.vz);
    const brakeInput = Math.max(c.brake, s.assist ? (s.easyInput?.brake || 0) : 0);
    const friction = (brakeInput * .62 + .018) * Math.max(0, mass * G - liftY);
    if (speed > .01) { const f = Math.min(friction, speed * mass / dt); fx -= f * s.vx / speed; fz -= f * s.vz / speed; }
    // Tire side force aligns taxi motion with the steerable nose wheel.
    const lateral = s.vx * Math.cos(s.heading) - s.vz * Math.sin(s.heading);
    fx -= lateral * mass * 5.5 * Math.cos(s.heading); fz += lateral * mass * 5.5 * Math.sin(s.heading);
  } else { s.grounded = false; s.wasAirborne = true; }

  // Integrate Newtonian translational accelerations (shared across both FBW assist and manual simulation!)
  s.vx += fx / mass * dt;
  s.vy += fy / mass * dt;
  s.vz += fz / mass * dt;
  s.airspeed = Math.hypot(s.vx - wind.x, s.vy - wind.y, s.vz - wind.z);

  const oldX = s.x, oldZ = s.z;
  s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
  s.distanceFlown += Math.hypot(s.x - oldX, s.z - oldZ);
  const newFloor = surfaceHeight(s.x, s.z, s.world) + 1.25;
  if (s.y <= newFloor) {
    if (!s.grounded && s.wasAirborne) {
      const airport = airportAt(s.x, s.z);
      const verticalSpeed = Math.max(0, -s.vy);
      const alignment = airport ? Math.min(Math.abs(degrees(wrap(s.heading - airport.heading))), Math.abs(degrees(wrap(s.heading - airport.heading - Math.PI)))) : 90;
      s.touchdown = { time: s.time, verticalSpeed, airspeed, airport: airport?.id || null, alignment, score: Math.round(clamp(100 - verticalSpeed * 12 - alignment * .8 - Math.max(0, airspeed - 38) * 2 - (airport ? 0 : 25), 0, 100)) };
      if (verticalSpeed > 6 || Math.abs(s.roll) > .45 || s.pitch < -.25 || terrainHeight(s.x, s.z, s.world) < 0) s.damage = 1;
      else if (verticalSpeed > 3) s.damage = Math.max(s.damage, .25);
    }
    s.y = newFloor; s.vy = 0; s.grounded = true;
    if (s.damage >= 1) s.status = 'crashed';
  }
  if(s.world&&sceneryCollision(s)){s.damage=1;s.status='crashed';}
  if (!s.assist && (airspeed > (plane.isJet ? 135 : 88) || Math.abs(s.gLoad) > (plane.isJet ? 6.5 : 4.4))) s.damage = clamp(s.damage + dt * .05, 0, 1);
  if (s.damage >= 1) s.status = 'crashed';
  s.peakAltitude = Math.max(s.peakAltitude, s.y);
  const controlValues = [c.elevator, c.aileron, c.rudder];
  s.smoothness += controlValues.reduce((sum, v, i) => sum + Math.abs(v - s.previousControls[i]), 0);
  s.previousControls = controlValues;
  s.warnings = [];
  if (stall && airspeed > 15 && !s.grounded) s.warnings.push('STALL — release pull, lower the nose slightly, add full power');
  if (airspeed > (plane.isJet ? 120 : 75)) s.warnings.push('OVERSPEED');
  if (s.systems.fuel < 15) s.warnings.push('LOW FUEL');
  if (!s.systems.engine && !s.grounded) s.warnings.push('ENGINE OFF — best glide 65 kt, pick a landing area now');
  if (s.systems.voltage < 20) s.warnings.push('ELECTRICAL BUS OFF');
  if (s.damage > 0) s.warnings.push('AIRFRAME DAMAGE');
  if (s.time - s.lastPathTime >= 1) {
    s.flightPath.push({ x: s.x, y: s.y, z: s.z, time: s.time });
    if (s.flightPath.length > 1800) s.flightPath.shift();
    s.lastPathTime = s.time;
  }
  const nav = navigation(s);
  if (!s.race && nav.distance < 600 && s.waypoint < s.route.length - 1) s.waypoint++;
  if (s.race) updateRace(s, previousPosition, dt);
  else updateMission(s, dt);
}
function updateRace(s, previous, dt) {
  const race = s.race;
  race.elapsed += dt;
  if (s.status === 'crashed') { race.outcome = 'crashed'; s.objective = 'Race ended — aircraft lost. Try again or change planes in the hangar.'; return; }
  if (race.elapsed >= race.limit) { s.status = 'failed'; race.outcome = 'timeout'; s.objective = 'Time expired — try again and follow the rings in order.'; return; }
  const gate = race.gates[race.next];
  const signed = p => (p.x - gate.x) * Math.sin(gate.heading) + (p.z - gate.z) * Math.cos(gate.heading);
  const before = signed(previous), after = signed(s);
  if (before < 0 && after >= 0) {
    const t = -before / (after - before), x = previous.x + (s.x - previous.x) * t, y = previous.y + (s.y - previous.y) * t, z = previous.z + (s.z - previous.z) * t;
    const across = (x - gate.x) * Math.cos(gate.heading) - (z - gate.z) * Math.sin(gate.heading);
    const distFromCenter = Math.hypot(across, y - gate.y);
    if (distFromCenter <= gate.radius) {
      race.styleScore = (race.styleScore || 0) + Math.round((1 - distFromCenter / gate.radius) * 100 + Math.abs(s.roll) * 80);
      race.next++; s.waypoint = Math.min(race.next, race.gates.length - 1);
    }
  }
  if (race.next === race.gates.length) {
    s.status = 'complete'; race.outcome = 'finished'; s.achievements.push('race-finish');
    s.objective = `RACE COMPLETE — ${race.elapsed.toFixed(2)} seconds!`;
  } else {
    const target = race.gates[race.next], distance = Math.hypot(s.x - target.x, s.y - target.y, s.z - target.z);
    s.objective = `RACE · ${race.next}/${race.gates.length} rings · ${(race.limit - race.elapsed).toFixed(1)}s left · next ${Math.round(distance)}m · ${s.y < target.y - 25 ? 'climb toward ring' : s.y > target.y + 25 ? 'descend toward ring' : 'hold altitude'}${signed(s) > 0 && race.next === race.gates.indexOf(gate) ? ' · missed ring: turn around and approach from the front' : ''}`;
  }
}
function updateMission(s, dt) {
  if (s.status === 'crashed') { s.objective = 'Flight ended: impact / structural limits exceeded. Restart or review debrief.'; return; }
  if (s.mode === 'training') {
    const descriptions = ['Battery ON, ignition ON, mixture rich, then START.', 'Taxi: throttle 15–25%, rudder steering, brakes. Reach 5 kt.', 'Takeoff: full power, rotate above 50 kt, climb past 100 ft AGL.', 'Straight and level: fly 80–110 kt, within ±5° bank and ±2 m/s vertical speed for 10 seconds.', 'Turn: bank between 15° and 35° while airborne.', 'Return to an airport, land and brake to a stop.'];
    const step = s.trainingStep;
    s.objective = `TRAINING ${Math.min(step + 1, 6)}/6 — ${descriptions[step] || 'Training complete.'}`;
    const agl = s.y - surfaceHeight(s.x, s.z, s.world);
    const passed = [s.systems.engine, s.grounded && Math.hypot(s.vx, s.vz) > 2.6, !s.grounded && agl > 30,
      !s.grounded && Math.abs(s.roll) < .087 && Math.abs(s.vy) < 2 && s.airspeed > 41 && s.airspeed < 57,
      !s.grounded && Math.abs(s.roll) > .26 && Math.abs(s.roll) < .61,
      Boolean(s.touchdown?.airport) && s.grounded && Math.hypot(s.vx, s.vz) < 2];
    if (step === 3) s.levelTime = passed[3] ? (s.levelTime || 0) + dt : 0;
    // Brief grace before auto-crediting stage 1 so a pre-started engine doesn't flash past it on the first tick.
    if (passed[step] && (step !== 3 || s.levelTime > 10) && (step !== 0 || s.time > 1.5)) { s.trainingStep++; s.achievements.push(`training-${step + 1}`); }
    if (s.trainingStep >= 6) { s.status = 'complete'; s.objective = 'Training complete — review your flight report.'; }
  } else if (s.touchdown && s.grounded && Math.hypot(s.vx, s.vz) < 2) {
    const correctDestination = s.touchdown.airport === s.destination && s.waypoint === s.route.length - 1;
    if ((s.mode === 'landing' && correctDestination) || (s.mode === 'crosscountry' && correctDestination) || s.mode === 'emergency') {
      s.status = 'complete'; s.objective = 'Flight complete — review touchdown and navigation performance.';
    }
  }
}
export function flightReport(s) {
  return { format: 'skyforge-flight-report', version: 1, aircraft: s.aircraft, aircraftId: s.aircraftId, world: s.world || 'legacy', controlMode: s.assist ? 'easy' : 'simulation', race: s.race ? { course: `${s.world||'legacy'}/${s.assist?'easy':'simulation'}/${s.departure}/${s.runway}`, checkpoints: s.race.next, total: s.race.gates.length, seconds: s.race.elapsed, outcome: s.race.outcome, styleScore: s.race.styleScore || 0 } : null, fictionalWorld: true, mode: s.mode, status: s.status,
    durationSeconds: s.time, distanceMeters: s.distanceFlown, fuelUsedLiters: s.fuelUsed, peakAltitudeMeters: s.peakAltitude,
    maxG: s.maxG, touchdown: s.touchdown, controlVariation: s.smoothness, path: s.flightPath,
    suggestions: s.race ? [s.race.outcome === 'finished' ? 'Race finished! Try another aircraft or beat your personal best.' : 'Fly through every ring in order; keep gentle bank and pitch corrections.'] : s.touchdown ? [s.touchdown.verticalSpeed > 2 ? 'Reduce descent rate before touchdown; flare progressively.' : 'Controlled vertical speed at touchdown.',
      s.touchdown.alignment > 10 ? 'Align with the runway before the flare.' : 'Good runway alignment.'] : ['Practice a stabilized approach at 60–70 kt.', 'Keep an airport within gliding range.'] };
}
export function readSave(storage = globalThis.localStorage) {
  try {
    const value = JSON.parse(storage.getItem('skyforge-save-v1'));
    if (value?.version !== 1 || !Array.isArray(value.logs) || !Array.isArray(value.training)) return null;
    const settings = value.settings || {};
    const valid = { sensitivity: clamp(Number(settings.sensitivity) || 1, .3, 2), invert: Boolean(settings.invert), deadzone: clamp(Number(settings.deadzone) || .12, .02, .5), quality: ['low', 'medium', 'high'].includes(settings.quality) ? settings.quality : 'medium', volume: clamp(Number(settings.volume) || 0, 0, 1) };
    return { version: 1, settings: valid, config: value.config || {}, training: value.training.filter(v => typeof v === 'string'), logs: value.logs.slice(-20), records: Object.fromEntries(Object.entries(value.records || {}).filter(([key, seconds]) => /^[-a-z0-9/]+$/i.test(key) && typeof seconds === 'number' && Number.isFinite(seconds) && seconds > 0)), aircraft: AIRCRAFT.name };
  } catch { return null; }
}
export function writeSave(save, storage = globalThis.localStorage) {
  try { storage.setItem('skyforge-save-v1', JSON.stringify({ ...save, version: 1, logs: save.logs.slice(-20) })); return true; } catch { return false; }
}
