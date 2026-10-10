import { landscape, worldFor, worldProps } from './worlds.mjs';
// SKYFORGE: educational, fictional trainer. SI units internally; not flight training.
export const DT = 1 / 120;
export const G = 9.80665;
export const AIRCRAFT = Object.freeze({ name: 'SF-172 Peregrine', dryMass: 820, fuelDensity: .72, wingArea: 16.2, span: 11, maxPower: 119000, idleRpm: 750, maxRpm: 2700, stallAlpha: .28, cl0: .24, clAlpha: 4.6, cd0: .032, induced: .058 });
export const AIRCRAFTS = Object.freeze([
  Object.freeze({ ...AIRCRAFT, id: 'peregrine', role: 'Balanced trainer', fuelCapacity: 140, thrustLimit: 2400, rollRate: 1.2, color: 0xc75535, wingHeight: 2.55, rotateKt: 52, description: 'Predictable handling. A good first aircraft.' }),
  Object.freeze({ ...AIRCRAFT, id: 'swift', name: 'SF-220 Swift', role: 'Sport racer', dryMass: 740, wingArea: 13.5, span: 9, maxPower: 164000, cd0: .026, fuelCapacity: 110, thrustLimit: 3100, rollRate: 1.85, color: 0x42bde0, wingHeight: .7, rotateKt: 58, description: 'More power, quicker rolls, low wing. For chasing records.' }),
  Object.freeze({ ...AIRCRAFT, id: 'kestrel', name: 'SF-90 Kestrel', role: 'Light explorer', dryMass: 560, wingArea: 18.5, span: 12.5, maxPower: 82000, cl0: .3, cd0: .04, fuelCapacity: 90, thrustLimit: 1900, rollRate: .95, color: 0xe9b949, wingHeight: 2.55, rotateKt: 43, description: 'Lightweight, slower, and gentle. Great for sightseeing.' }),
]);
export const aircraftFor = id => AIRCRAFTS.find(a => a.id === id) || AIRCRAFTS[0];
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
  return { pitch:has('KeyW')+has('ArrowUp')-has('KeyS')-has('ArrowDown'), turn:has('KeyD')+has('ArrowRight')-has('KeyA')-has('ArrowLeft'), rudder:has('KeyE')-has('KeyQ'), power:has('ShiftLeft')+has('ShiftRight')-has('ControlLeft')-has('ControlRight'), brake:has('Space')+has('KeyB') };
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
  return { x: Math.sin(dir) * speed, z: Math.cos(dir) * speed, y: w.turbulence * (.55 * Math.sin(s.time * 1.7) + .3 * Math.sin(s.time * 3.1)) };
}
export function createFlight(config = {}) {
  const plane = aircraftFor(config.aircraft);
  const a = AIRPORTS.find(a => a.id === config.departure) || AIRPORTS[0];
  const reverse = config.runway === a.runways[1];
  const heading = a.heading + (reverse ? Math.PI : 0);
  const airborne = config.start === 'air' || ['landing', 'emergency', 'race'].includes(config.mode);
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
  if(s.mode==='free'&&s.systems.engine)s.objective=`Explore ${worldFor(s.world).name} — W climbs, S dives, A/D turn. M opens the full map; Hangar changes world or plane.`;
  if (s.mode === 'landing') s.objective = `Land on ${a.name} runway ${s.runway}; target 60–70 kt, shallow descent.`;
  if (s.mode === 'crosscountry') s.objective = `Fly the route and land at ${dest.name}.`;
  if (s.mode === 'emergency') s.objective = 'Engine failure at 10 seconds. Glide at 65 kt, choose a safe landing area.';
  if (s.mode === 'race') {
    // Identical conditions keep per-aircraft/runway personal bests comparable.
    s.weather = { ...WEATHER.clear }; s.hour = 14; s.dayCycle = false;
    const gates = Array.from({ length: 7 }, (_, i) => {
      const along = 350 + i * 450, across = i < 2 ? 0 : Math.sin((i - 1) * .65) * 180;
      return { id: `GATE${i + 1}`, name: `Checkpoint ${i + 1}`, x: x + Math.sin(heading) * along + Math.cos(heading) * across, y: altitude, z: z + Math.cos(heading) * along - Math.sin(heading) * across, heading, radius: 90 };
    });
    s.race = { gates, next: 0, countdown: 3, elapsed: 0, limit: 120, outcome: null };
    s.route = gates.map(g => ({ ...g }));
    s.controls.throttle = .85;
    s.objective = 'RACE — get ready! Fly through the glowing rings in order.';
  }
  return s;
}
function updateSystems(s, dt) {
  const sys = s.systems, c = s.controls, plane = aircraftFor(s.aircraftId);
  const powered = sys.battery && sys.batteryAh > 0 && !s.failures.electrical;
  if (sys.starter && powered && sys.ignition && c.mixture > .15 && sys.fuel > 0 && !s.failures.engine) sys.engine = true;
  if (!sys.ignition || c.mixture < .05 || sys.fuel <= 0 || s.failures.engine) sys.engine = false;
  const targetRpm = sys.engine ? plane.idleRpm + c.throttle * (plane.maxRpm - plane.idleRpm) : 0;
  sys.rpm += (targetRpm - sys.rpm) * Math.min(1, dt * 2);
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
  const stalled = Math.abs(alpha) > stallAngle;
  let cl = clamp(plane.cl0 + plane.clAlpha * alpha + flaps * .65, -1.2, 1.65 + flaps * .4);
  if (stalled) cl *= clamp(1 - (Math.abs(alpha) - stallAngle) * 2.4, .22, 1);
  // Standard approximate induced-drag reduction near a surface; no extra lift.
  const heightRatio = 16 * Math.max(0, agl) / plane.span;
  const groundEffect = clamp(heightRatio ** 2 / (1 + heightRatio ** 2), .15, 1);
  const cd = plane.cd0 + plane.induced * cl ** 2 * groundEffect + flaps * .065 +
    (stalled ? .18 : 0) + .1 * Math.abs(sideslip);
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
  const effectiveness = clamp(pressure / 900, 0, 2);
  const turbulence = s.weather.turbulence;
  // Damped angular moments, static longitudinal stability, and coordinated yaw.
  const desiredQ = (c.elevator * .45 + c.trim * .15 - (s.alpha - .035 - c.flaps * .045) * 1.3) * effectiveness;
  s.q += (desiredQ - s.q) * dt * 3;
  s.p += (c.aileron * plane.rollRate * effectiveness - s.p * 2.8) * dt;
  const turn = G * Math.tan(clamp(s.roll, -1.2, 1.2)) / Math.max(25, horizontalAir);
  const rudderGround = clamp(airspeed / 22, .15, 1.3);
  s.r += ((s.grounded ? c.rudder * rudderGround * .48 : turn + c.rudder * .22 * effectiveness + s.sideslip * .8) - s.r) * dt * 2;
  s.pitch = clamp(s.pitch + s.q * dt + turbulence * Math.sin(s.time * 2.9) * dt * .008, -.9, .9);
  s.roll = wrap(s.roll + s.p * dt + turbulence * Math.sin(s.time * 2.2) * dt * .015);
  s.heading = wrap(s.heading + s.r * dt);
  if (s.grounded) { s.pitch = clamp(s.pitch, 0, airspeed > 20 ? .2 : .015); s.roll *= Math.exp(-dt * 8); }
  const { cl, cd, stalled: stall } = aerodynamicCoefficients(s.alpha, c.flaps, s.sideslip, s.y - surfaceHeight(s.x, s.z, s.world), plane);
  s.lift = pressure * plane.wingArea * cl;
  s.drag = pressure * plane.wingArea * cd;
  const altitudePower = Math.exp(-Math.max(0, s.y) / 11000);
  const mixtureEfficiency = clamp(1 - Math.abs(c.mixture - clamp(1 - s.y / 10000, .45, 1)) * 1.5, 0, 1);
  s.thrust = s.systems.engine ? Math.min(plane.thrustLimit, plane.maxPower * c.throttle * .75 / Math.max(22, airspeed)) * altitudePower * mixtureEfficiency * clamp(s.systems.rpm / 2200, 0, 1) : 0;
  const sinH = Math.sin(airHeading), cosH = Math.cos(airHeading), sinG = Math.sin(gamma), cosG = Math.cos(gamma);
  const liftY = s.lift * Math.cos(s.roll) * cosG;
  const liftHorizontal = -s.lift * Math.cos(s.roll) * sinG;
  const sideForce = s.lift * Math.sin(s.roll) + pressure * plane.wingArea * (c.rudder * .08 - s.sideslip * .35);
  let fx = Math.sin(s.heading) * Math.cos(s.pitch) * s.thrust + sinH * liftHorizontal + cosH * sideForce;
  let fz = Math.cos(s.heading) * Math.cos(s.pitch) * s.thrust + cosH * liftHorizontal - sinH * sideForce;
  let fy = Math.sin(s.pitch) * s.thrust + liftY - mass * G;
  if (airspeed > .1) { fx -= s.drag * ax / airspeed; fy -= s.drag * ay / airspeed; fz -= s.drag * az / airspeed; }
  // Normal airframe load is lift magnitude, not its world-vertical component.
  s.gLoad = s.lift / (mass * G); s.maxG = Math.max(s.maxG, Math.abs(s.gLoad));
  const floor = surfaceHeight(s.x, s.z, s.world) + 1.25;
  if (s.grounded && s.y <= floor + .2 && fy <= 0) {
    fy = 0; s.vy = 0; s.y = floor;
    const speed = Math.hypot(s.vx, s.vz);
    const friction = (c.brake * .55 + .018) * Math.max(0, mass * G - liftY);
    if (speed > .01) { const f = Math.min(friction, speed * mass / dt); fx -= f * s.vx / speed; fz -= f * s.vz / speed; }
    // Tire side force aligns taxi motion with the steerable nose wheel.
    const lateral = s.vx * Math.cos(s.heading) - s.vz * Math.sin(s.heading);
    fx -= lateral * mass * 5 * Math.cos(s.heading); fz += lateral * mass * 5 * Math.sin(s.heading);
  } else { s.grounded = false; s.wasAirborne = true; }
  if(s.assist){
    // Game-style assisted flight: bounded pitch/bank, coordinated turns, no trim wrestling.
    const input=s.easyInput||{pitch:0,turn:0}, speed=Math.hypot(s.vx,s.vz), responsive=plane.rollRate/1.2;
    const targetPitch=clamp(input.pitch,-1,1)*.28,targetBank=clamp(input.turn,-1,1)*.5;
    s.pitch+=(targetPitch-s.pitch)*Math.min(1,dt*2.8);s.roll+=(targetBank-s.roll)*Math.min(1,dt*3*responsive);
    s.p=0;s.q=0;s.r=clamp(input.turn,-1,1)*(s.grounded?.3:.38)*responsive;s.heading=wrap(s.heading+s.r*dt);
    const targetSpeed=s.systems.engine?(s.grounded?0:18)+c.throttle*(plane.maxPower/119000)*45:28;
    const nextSpeed=Math.max(0,speed+(s.systems.engine?(targetSpeed-speed)*.45:-.8)*dt-(s.grounded?c.brake*18*dt:0));
    const canLift=!s.grounded||(nextSpeed*1.94384>plane.rotateKt&&input.pitch>0);
    s.vx=Math.sin(s.heading)*nextSpeed;s.vz=Math.cos(s.heading)*nextSpeed;
    const targetVy=canLift?(s.systems.engine?Math.sin(s.pitch)*nextSpeed:-3):0;
    s.vy+=(targetVy-s.vy)*Math.min(1,dt*3);
    if(canLift){s.grounded=false;s.wasAirborne=true;}
    s.airspeed=nextSpeed;s.gLoad=1;s.alpha=.04;s.damage=Math.max(0,s.damage);
  }else{s.vx += fx / mass * dt; s.vy += fy / mass * dt; s.vz += fz / mass * dt;}
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
  if (!s.assist && (airspeed > 88 || Math.abs(s.gLoad) > 4.4)) s.damage = clamp(s.damage + dt * .05, 0, 1);
  if (s.damage >= 1) s.status = 'crashed';
  s.peakAltitude = Math.max(s.peakAltitude, s.y);
  const controlValues = [c.elevator, c.aileron, c.rudder];
  s.smoothness += controlValues.reduce((sum, v, i) => sum + Math.abs(v - s.previousControls[i]), 0);
  s.previousControls = controlValues;
  s.warnings = [];
    if (!s.assist && stall && airspeed > 15 && !s.grounded) s.warnings.push('STALL — release pull, lower the nose slightly, add full power');
  if (airspeed > 75) s.warnings.push('OVERSPEED');
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
    if (Math.hypot(across, y - gate.y) <= gate.radius) { race.next++; s.waypoint = Math.min(race.next, race.gates.length - 1); }
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
    if (passed[step] && (step !== 3 || s.levelTime > 10)) { s.trainingStep++; s.achievements.push(`training-${step + 1}`); }
    if (s.trainingStep >= 6) { s.status = 'complete'; s.objective = 'Training complete — review your flight report.'; }
  } else if (s.touchdown && s.grounded && Math.hypot(s.vx, s.vz) < 2) {
    const correctDestination = s.touchdown.airport === s.destination && s.waypoint === s.route.length - 1;
    if ((s.mode === 'landing' && correctDestination) || (s.mode === 'crosscountry' && correctDestination) || s.mode === 'emergency') {
      s.status = 'complete'; s.objective = 'Flight complete — review touchdown and navigation performance.';
    }
  }
}
export function flightReport(s) {
  return { format: 'skyforge-flight-report', version: 1, aircraft: s.aircraft, aircraftId: s.aircraftId, world: s.world || 'legacy', controlMode: s.assist ? 'easy' : 'simulation', race: s.race ? { course: `${s.world||'legacy'}/${s.assist?'easy':'simulation'}/${s.departure}/${s.runway}`, checkpoints: s.race.next, total: s.race.gates.length, seconds: s.race.elapsed, outcome: s.race.outcome } : null, fictionalWorld: true, mode: s.mode, status: s.status,
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
