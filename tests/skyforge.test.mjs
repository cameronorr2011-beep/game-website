import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { wrap } from '../js/skyforge/simulation.mjs';
const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a));
const wrapDegrees = a => wrapAngle(a) * 180 / Math.PI;
import { WORLDS, worldProps } from '../js/skyforge/worlds.mjs';
import { keyboardFlightInput, sceneryCollision, AIRPORTS, AIRCRAFT, AIRCRAFTS, ALL_AIRCRAFTS, aircraftFor, DT, createFlight, stepFlight, navigation, terrainHeight, flightReport, readSave, writeSave, indicatedAirspeed, aerodynamicCoefficients } from '../js/skyforge/simulation.mjs';
const run = (s, seconds, control) => { for (let i = 0; i < Math.round(seconds / DT); i++) { control?.(s); stepFlight(s); assert.ok([s.x,s.y,s.z,s.pitch,s.roll,s.heading,s.airspeed].every(Number.isFinite)); } return s; };
const start = performance.now();
assert.equal(keyboardFlightInput(new Set(['KeyW'])).throttleUp,1);
assert.equal(keyboardFlightInput(new Set(['KeyS'])).brake,1);
assert.equal(keyboardFlightInput(new Set(['KeyA'])).turn,-1);
assert.equal(keyboardFlightInput(new Set(['KeyD'])).turn,1);
assert.equal(keyboardFlightInput(new Set(['ShiftLeft'])).throttleUp,1);
assert.equal(keyboardFlightInput(new Set(['ArrowUp'])).pitch,1,'manual pitch on arrows only');
for(const world of WORLDS)for(const plane of AIRCRAFTS){
  // W adds power; level flight keeps accelerating until climb covers altitude.
  const s=createFlight({world:world.id,aircraft:plane.id,start:'air'});s.controls.throttle=.75;
  s.easyInput={pitch:0,turn:0,brake:0};run(s,4);assert.ok(s.airspeed>35,`${world.id}/${plane.id}: W powers forward`);
  s.easyInput={pitch:1,turn:0,brake:0};const climbFrom=s.y;run(s,5);assert.ok(Math.abs(wrapDegrees(s.pitch))>10,`${world.id}/${plane.id}: pitches up and holds climb attitude`);
  const peak=s.y;s.easyInput={pitch:-.8,turn:0,brake:0};run(s,5);assert.ok(s.y<peak,`${world.id}/${plane.id}: arrows pitch down`);
  const flatheading=s.heading;s.easyInput={pitch:0,turn:-1,brake:0};run(s,3);assert.ok(s.roll<-.2,'A banks left');assert.ok(Math.abs(wrapDegrees(s.heading-flatheading))>20,'A turns left');
  s.easyInput={pitch:0,turn:0,brake:0};run(s,5);assert.ok(Math.abs(s.roll)<.01,'release levels wings');assert.ok(Math.abs(s.vy)<.2,'release holds level flight');assert.equal(s.status,'active');
  const glideSpeed=s.airspeed;s.easyInput={pitch:0,turn:0,brake:1};run(s,4);assert.ok(s.airspeed<glideSpeed-4,'S air-brakes');
  assert.equal(flightReport(s).world,world.id);assert.equal(flightReport(s).controlMode,'easy');
  for(const airport of AIRPORTS)assert.equal(terrainHeight(airport.x,airport.z,world.id),airport.elevation);
}
const easyTaxi=createFlight({world:'city',ready:true});easyTaxi.controls.throttle=0;run(easyTaxi,2);assert.ok(Math.hypot(easyTaxi.vx,easyTaxi.vz)<.1,'easy idle does not drive aircraft');
easyTaxi.controls.throttle=1;run(easyTaxi,5);assert.ok(easyTaxi.airspeed>10,'easy taxi accelerates');easyTaxi.controls.throttle=0;easyTaxi.easyInput={pitch:0,turn:0,brake:1};easyTaxi.controls.brake=1;run(easyTaxi,5);assert.ok(easyTaxi.airspeed<1,'easy brakes stop aircraft');
assert.notEqual(terrainHeight(3000,3000,'beach'),terrainHeight(3000,3000,'apocalypse'));
assert.ok(Math.abs(terrainHeight(9000,30000,'beach')-terrainHeight(9000,28000,'beach'))>40,"beach has real hills");
assert.ok(Math.abs(terrainHeight(-5000,18000,'city')-terrainHeight(-5000,12000,'city'))>120,'city has hills');
assert.ok(Math.abs(terrainHeight(15000,5000,'cyberpunk')-terrainHeight(9000,9000,'cyberpunk'))>50,'cyberpunk has hills');
assert.ok(Math.abs(terrainHeight(9000,30000,'apocalypse')-terrainHeight(11000,30000,'apocalypse'))>40,'apocalypse has hills');
const props=worldProps(1,1,'city',terrainHeight,AIRPORTS),building=props.find(p=>p.type==='building');assert.ok(building);
const collision=createFlight({world:'city',start:'air'});Object.assign(collision,{x:building.x,z:building.z,y:building.y+building.height/2});assert.ok(sceneryCollision(collision));stepFlight(collision);assert.equal(collision.status,'crashed','buildings have collision');

const seaLevel = { airspeed: 50, density: 1.225 }, highAltitude = { airspeed: 50, density: .7 };
assert.equal(indicatedAirspeed(seaLevel), 50);
assert.ok(indicatedAirspeed(highAltitude) < 50, 'IAS decreases at equal true speed as density falls');
const outOfGroundEffect = aerodynamicCoefficients(.1, 0, 0, 100);
const nearGround = aerodynamicCoefficients(.1, 0, 0, .5);
assert.equal(nearGround.cl, outOfGroundEffect.cl, 'ground effect must not invent extra lift');
assert.ok(nearGround.cd < outOfGroundEffect.cd, 'ground effect reduces induced drag');
assert.ok(aerodynamicCoefficients(.5, 0, 0, 100).stalled);
const banked = createFlight({ start: 'air' }); banked.roll = Math.PI / 3; stepFlight(banked);
assert.ok(Math.abs(banked.gLoad - banked.lift / ((AIRCRAFT.dryMass + banked.systems.fuel * AIRCRAFT.fuelDensity) * 9.80665)) < 1e-8, 'load factor uses normal lift, not vertical projection');
const cold = createFlight();
run(cold, 2); assert.equal(cold.systems.engine, false); assert.equal(cold.systems.rpm, 0);
cold.systems.battery = true; cold.systems.ignition = true; cold.systems.starter = true;
run(cold, 1); assert.equal(cold.systems.engine, true); assert.ok(cold.systems.rpm > 500);
cold.systems.starter = false; cold.controls.throttle = .2; run(cold, 12);
assert.ok(cold.z > -670, 'powered trainer taxis');
cold.controls.throttle = 0; cold.controls.brake = 1; run(cold, 8);
assert.ok(Math.hypot(cold.vx,cold.vz) < 1, 'wheel brakes stop taxi');
cold.systems.ignition = false; run(cold, 3); assert.equal(cold.systems.engine, false); assert.ok(cold.systems.rpm < 10);
const takeoff = createFlight({ ready: true }); takeoff.controls.throttle = 1;
run(takeoff, 45, s => { s.controls.elevator = s.airspeed > 26 ? .38 : 0; });
assert.equal(takeoff.status, 'active'); assert.equal(takeoff.grounded, false, 'aircraft can lift off');
assert.ok(takeoff.y > 40, 'aircraft climbs'); assert.ok(takeoff.z > 0);
const left = createFlight({ start: 'air', ready: true }), right = createFlight({ start: 'air', ready: true });
left.controls.aileron = -.25; right.controls.aileron = .25; run(left, 3); run(right, 3);
assert.ok(left.roll < -.1 && right.roll > .1, 'aileron reverses roll response');
const rudder = createFlight({ start: 'air' }); rudder.controls.rudder = .5; run(rudder, 3); assert.ok(rudder.heading > .01, 'rudder affects yaw');
const clean = createFlight({ start: 'air' }), flaps = createFlight({ start: 'air' }); flaps.controls.flaps = 1;
run(clean, 1); run(flaps, 1); assert.ok(flaps.drag > clean.drag, 'flaps add drag'); assert.notEqual(flaps.lift, clean.lift);
const windy = createFlight({ start: 'air', weather: 'breeze' }); run(windy, 10);
const calm = createFlight({ start: 'air' }); run(calm, 10); assert.ok(Math.abs(windy.x - calm.x) > 1, 'wind changes trajectory');
const stall = createFlight({ start: 'air' }); stall.pitch = .6; stall.vz = 20; stall.controls.throttle = 0;
stepFlight(stall); assert.ok(stall.warnings.some(w => w.includes('STALL')));
stall.controls.elevator = -.5; run(stall, 4); assert.ok(stall.pitch < .6, 'nose-down control can recover stall attitude');
const landing = createFlight({ start: 'air', destination: 'SF01' });
landing.x = 0; landing.z = 0; landing.y = 14; landing.vz = 31; landing.vy = -1; landing.pitch = -.02; landing.controls.throttle = 0;
run(landing, 3); assert.ok(landing.touchdown, 'actual ground contact records touchdown');
assert.equal(landing.touchdown.airport, 'SF01'); assert.ok(landing.touchdown.score > 0); assert.notEqual(landing.status, 'crashed');
landing.controls.brake = 1; run(landing, 12); assert.ok(Math.hypot(landing.vx, landing.vz) < 2, 'landed aircraft can stop');
const hard = createFlight({ start: 'air' }); hard.y = 14; hard.z = 0; hard.vy = -10; hard.controls.throttle = 0; run(hard, 1); assert.equal(hard.status, 'crashed');
const failure = createFlight({ mode: 'emergency' }); run(failure, 11); assert.ok(failure.failures.engine); assert.equal(failure.systems.engine, false);
const empty = createFlight({ start: 'air' }); empty.systems.fuel = 0; stepFlight(empty); assert.equal(empty.systems.engine, false);
const bus = createFlight({ ready: true }); bus.failures.electrical = true; stepFlight(bus); assert.equal(bus.systems.voltage, 0); assert.equal(bus.systems.engine, true, 'magneto-like ignition survives bus loss');
const nav = navigation(createFlight()); assert.ok(nav.distance > 10000); assert.ok(nav.bearing > 0 && nav.bearing < 90);
for (const airport of AIRPORTS) assert.equal(terrainHeight(airport.x,airport.z),airport.elevation);
assert.notEqual(terrainHeight(3000,3000), terrainHeight(9000,9000));
const repeatA = createFlight({ start:'air',weather:'breeze' }), repeatB = createFlight({ start:'air',weather:'breeze' }); run(repeatA, 30); run(repeatB, 30); assert.deepEqual(repeatA,repeatB);
const storage = { data: null, getItem() { return this.data; }, setItem(k,v) { this.data=v; } };
assert.equal(readSave(storage), null); storage.data = '{bad'; assert.equal(readSave(storage),null);
writeSave({settings:{quality:'high',sensitivity:1,volume:.3},config:{departure:'SF02'},training:['training-1'],logs:[flightReport(landing)]}, storage);
assert.equal(readSave(storage).config.departure,'SF02'); assert.equal(readSave(storage).logs[0].touchdown.airport,'SF01');
assert.equal(AIRCRAFT.name,'SF-172 Peregrine');
assert.equal(aircraftFor('invalid').id, 'peregrine');
for (const plane of AIRCRAFTS) {
  const s = createFlight({ aircraft: plane.id, ready: true });
  assert.equal(s.aircraft, plane.name); assert.equal(s.systems.fuel, plane.fuelCapacity);
  s.controls.throttle = 1;
  run(s, 45, s => { s.controls.elevator = s.airspeed * 1.94384 > plane.rotateKt ? .38 : 0; });
  assert.equal(s.status, 'active', `${plane.name} survives takeoff`);
  assert.equal(s.grounded, false, `${plane.name} takes off`);
}
const trainerRoll = createFlight({ start: 'air' }), swiftRoll = createFlight({ start: 'air', aircraft: 'swift' });
trainerRoll.controls.aileron = swiftRoll.controls.aileron = .25;
run(trainerRoll, 2); run(swiftRoll, 2); assert.ok(swiftRoll.roll > trainerRoll.roll * 1.3, 'sport racer has different handling');
const race = createFlight({ mode: 'race', departure: 'SF02', runway: '21', aircraft: 'swift' });
assert.equal(race.weather.wind, 0); assert.equal(race.hour, 14);
const stormRace = createFlight({ mode: 'race', weather: 'overcast', hour: 0, customWeather: { wind: 25 } });
assert.equal(stormRace.weather.wind, 0); assert.equal(stormRace.hour, 14, 'race conditions fixed for comparable records');
const initialPosition = [race.x, race.y, race.z];
run(race, 3); assert.deepEqual([race.x,race.y,race.z], initialPosition, 'countdown freezes flight');
// Cross the actual checkpoint planes; wrong order and outside-radius crossings do not score.
race.race.countdown = 0;
function crossGate(s, gate, across = 0) {
  s.x = gate.x - Math.sin(gate.heading) * .1 + Math.cos(gate.heading) * across;
  s.z = gate.z - Math.cos(gate.heading) * .1 - Math.sin(gate.heading) * across;
  s.y = gate.y; s.heading = gate.heading; s.roll = 0; s.pitch = .02;
  s.vx = Math.sin(gate.heading) * 43; s.vz = Math.cos(gate.heading) * 43; s.vy = 0;
  stepFlight(s);
}
crossGate(race, race.race.gates[1]); assert.equal(race.race.next, 0, 'out of order gate rejected');
crossGate(race, race.race.gates[0], 100); assert.equal(race.race.next, 0, 'outside ring rejected');
for (const gate of race.race.gates) crossGate(race, gate);
assert.equal(race.status, 'complete'); assert.equal(race.race.next, 7);
assert.match(flightReport(race).suggestions[0], /Race finished/);
assert.equal(flightReport(race).race.outcome, 'finished'); assert.equal(flightReport(race).aircraftId, 'swift');
const expired = createFlight({ mode: 'race' }); expired.race.countdown = 0; expired.race.elapsed = 120; stepFlight(expired); assert.equal(expired.status, 'failed');
const wreckedRace = createFlight({ mode: 'race' }); wreckedRace.race.countdown = 0; wreckedRace.damage = 1; stepFlight(wreckedRace); assert.equal(wreckedRace.race.outcome, 'crashed');
const localLanding = createFlight({ mode: 'landing', departure: 'SF03', destination: 'SF02' }); assert.equal(localLanding.destination, 'SF03', 'landing challenge targets departure airport');
writeSave({ settings: {}, config: { aircraft: 'swift', mode: 'race' }, training: [], logs: [], records: { 'swift/SF01/36': 63.2, broken: -1 } }, storage);
assert.equal(readSave(storage).config.aircraft, 'swift'); assert.deepEqual(readSave(storage).records, { 'swift/SF01/36': 63.2 });
// Verify SF-X80 Valkyrie jet, aerobatics mode, and autopilot hold
const jet = createFlight({ aircraft: 'valkyrie', world: 'cyberpunk', start: 'air' });
assert.equal(jet.aircraftId, 'valkyrie'); assert.equal(aircraftFor('valkyrie').isJet, true);
jet.controls.throttle = 1; run(jet, 4); assert.ok(jet.airspeed > 48, 'Valkyrie jet accelerates strongly');
jet.autopilot = { enabled: true, heading: .4, altitude: jet.y + 80 };
run(jet, 6); assert.ok(Math.abs(wrapAngle(jet.heading - .4)) < .25, 'Autopilot steers toward target heading');
const aero = createFlight({ mode: 'aerobatics', aircraft: 'valkyrie' });
assert.equal(aero.race.gates.length, 7); assert.notEqual(aero.race.gates[2].y, aero.race.gates[0].y, 'Aerobatics gates vary in altitude');

// Verify real aerodynamic physics in BOTH Fly-By-Wire (assist) and Manual modes:
// 1. Energy conservation: climbing at fixed throttle reduces airspeed compared to diving
const climbPlane = createFlight({ world: 'beach', aircraft: 'swift', start: 'air', assist: false });
const divePlane = createFlight({ world: 'beach', aircraft: 'swift', start: 'air', assist: false });
climbPlane.controls.throttle = divePlane.controls.throttle = .65;
climbPlane.controls.elevator = .35; divePlane.controls.elevator = -.35;
run(climbPlane, 4); run(divePlane, 4);
assert.ok(divePlane.airspeed > climbPlane.airspeed + 12, 'diving accelerates while climbing bleeds airspeed');
assert.ok(climbPlane.y > divePlane.y + 80, 'climb gains altitude while dive loses altitude');

// 2. Fly-By-Wire assist mode uses real aerodynamic lift & G-loads (not hardcoded 1.0G or fake teleportation)
const fbwTurn = createFlight({ world: 'city', aircraft: 'peregrine', start: 'air', assist: true });
fbwTurn.easyInput = { pitch: 0, turn: 1, brake: 0 };
run(fbwTurn, 3);
assert.ok(fbwTurn.lift > 5000, 'FBW assist computes real aerodynamic lift in Newtons');
assert.ok(fbwTurn.gLoad > 1.08, 'banked turn in FBW assist increases G-load to maintain altitude');
assert.ok(Math.abs(fbwTurn.alpha) > .01, 'FBW assist maintains real angle of attack');

// 3. Continuous post-stall lift curve (no sudden cliff discontinuity at stallAlpha)
const preStall = aerodynamicCoefficients(.275, 0, 0, 200);
const justStalled = aerodynamicCoefficients(.285, 0, 0, 200);
assert.equal(preStall.stalled, false); assert.equal(justStalled.stalled, true);
assert.ok(Math.abs(preStall.cl - justStalled.cl) < .15, 'lift coefficient transitions smoothly across stall boundary');
console.log(`SKYFORGE: startup/shutdown, taxi/brakes, takeoff/climb, roll/yaw/flaps, wind/stall, touchdown/crash, systems, navigation, FBW/energy/G-load, jet/autopilot/aerobatics, determinism and saves passed (${(performance.now()-start).toFixed(1)} ms).`);
