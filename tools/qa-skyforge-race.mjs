import assert from 'node:assert/strict';
import { createFlight } from '../js/skyforge/simulation.mjs';
const D = Math.PI / 180;
const wrap180 = a => { a = ((a % 360) + 360) % 360; return a > 180 ? a - 360 : a; };
export default async function run(page){
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.waitForSelector('[data-boot="ready"]');
  assert.equal(await page.locator('#aircraft option').count(),3);
  await page.locator('#quality').selectOption('low');
  for(const [id,name] of [['swift','SF-220 Swift'],['kestrel','SF-90 Kestrel'],['peregrine','SF-172 Peregrine']]){
    await page.locator('#aircraft').selectOption(id);
    await page.locator('#mode').selectOption('free');
    await page.getByRole('button',{name:'Enter cockpit'}).click();
    assert.match(await page.locator('#aircraftInfo').innerText(),new RegExp(name));
    await page.locator('#hangarToggle').click();
    assert.equal(await page.locator('#setup').isVisible(),true);
  }
  await page.locator('#aircraft').selectOption('swift');
  await page.locator('#mode').selectOption('race');
  await page.locator('#departure').selectOption('SF01');
  await page.locator('#runway').selectOption('36');
  await page.getByRole('button',{name:'Enter cockpit'}).click();
  assert.match(await page.locator('#raceHUD').innerText(),/START IN/);
  await page.locator('#flightCanvas').focus();
  await page.keyboard.down('KeyW');
  await page.waitForFunction(()=>document.querySelector('#raceHUD').textContent.includes('RINGS 1/7'),null,{timeout:20000});
  await page.keyboard.up('KeyW');
  const raceHUD=await page.locator('#raceHUD').innerText();
  assert.match(raceHUD,/RINGS [1-7]\/7.*TIME/);
  await page.getByRole('button',{name:'Pause Esc',exact:true}).click();
  await page.waitForTimeout(200); // Let the throttled HUD render the final pre-pause simulation step.
  const paused=await page.locator('#raceHUD').innerText();await page.waitForTimeout(500);
  assert.equal(await page.locator('#raceHUD').innerText(),paused,'pause freezes race timer');
  await page.getByRole('button',{name:'Restart this flight',exact:true}).click();
  assert.match(await page.locator('#raceHUD').innerText(),/START IN/);
  await page.getByRole('button',{name:'End / debrief',exact:true}).click();
  assert.match(await page.locator('#reportContent').innerText(),/RACE ENDED.*0\/7/);
  const event=page.waitForEvent('download');await page.getByRole('button',{name:'Export flight JSON',exact:true}).click();
  const download=await event;assert.equal(download.suggestedFilename(),'skyforge-flight-report.json');
  let json='';for await(const part of await download.createReadStream())json+=part.toString();const report=JSON.parse(json);
  assert.equal(report.aircraftId,'swift');assert.equal(report.mode,'race');assert.equal(report.race.total,7);assert.equal(report.race.outcome,null);
  await page.getByRole('button',{name:'Dispatch',exact:true}).click();await page.reload();await page.waitForSelector('[data-boot="ready"]');
  assert.equal(await page.locator('#aircraft').inputValue(),'swift');assert.equal(await page.locator('#mode').inputValue(),'race');
  // Fly an entire race via the visible HUD and the keyboard a human would use. Gate
  // geometry is replicated Node-side (same createFlight call the app makes); the
  // aircraft position each tick is derived from the HUD distance/bearing to the ring.
  const model = createFlight({ mode:'race', departure:'SF01', runway:'36', aircraft:'swift', world:'beach', assist:true });
  const gates = model.race.gates, axis = gates[0].heading;
  await page.getByRole('button',{name:'Enter cockpit'}).click();await page.locator('#flightCanvas').focus();
  const held=new Set(),deadline=Date.now()+135000;const trace=[];let loopIters=0,lastNext=-1,turnLock=0,breakout=0;
  while(Date.now()<deadline&&await page.locator('#debrief').isHidden()){
    const hud=await page.evaluate(()=>({
      distKm:Number((document.querySelector('#navInfo').textContent.match(/· ([\d.]+) km/)||[])[1]),
      brg:Number((document.querySelector('#navInfo').textContent.match(/BRG (\d+)/)||[])[1]),
      hdg:Number((document.querySelector('#hdg').textContent.match(/\d+/)||[0])[0]),
      altFt:Number(document.querySelector('#alt').textContent),
      vsFpm:Number(document.querySelector('#vs').textContent),
      next:Number((document.querySelector('#raceHUD').textContent.match(/RINGS (\d)/)||[])[1]||0)
    }));
    if(!(hud.distKm>0)||!(hud.brg>=0)){await page.waitForTimeout(120);continue;}
    // Derive the plane's position from the HUD bearing/distance to the HUD-target ring.
    const nextRaw=Math.min(hud.next||0,6), gRaw=gates[nextRaw], distKm=hud.distKm*1000;
    const px=gRaw.x-Math.sin(hud.brg*D)*distKm, pz=gRaw.z-Math.cos(hud.brg*D)*distKm;
    const axx=Math.sin(axis*D), axz=Math.cos(axis*D), perpx=axz, perpz=-axx;
    const relx=px-gRaw.x, relz=pz-gRaw.z, along=relx*axx+relz*axz, lateral=relx*perpx+relz*perpz;
    // Missed-ring override: HUD always points at the same ring while the race continues,
    // so fly past it to the next ring ourselves (position stays valid — derived from gRaw).
    let next=nextRaw, g=gRaw, brg=hud.brg;
    if(along>60&&nextRaw<6){next=nextRaw+1;g=gates[next];brg=((Math.atan2(g.x-px,g.z-pz)/D)+360)%360;}
    if(next!==lastNext)trace.push({t:Date.now()%100000,next,along:along.toFixed(0),lateral:lateral.toFixed(0)});
    lastNext=next;
    // Axis-line kyber guidance: desired track points along the ring axis with a crab
    // term proportional to the lateral offset, then converge and cross ring after ring.
    const rel2x=px-g.x, rel2z=pz-g.z;
    const lat2=rel2x*perpx+rel2z*perpz, along2=rel2x*axx+rel2z*axz;
    const losBrg=((Math.atan2(g.x-px,g.z-pz)/D)+360)%360;
    const crab=along2>=-260?Math.asin(Math.max(-.45,Math.min(.45,lat2/240))):0;
    // Behind the ring (LOS≈180): steerable-approach = axis heading + crab.
    const desired=along2<-260?(axis/D):losBrg+crab;
    const err=wrap180(desired-hud.hdg);
    if(Math.abs(err)>165)turnLock=err>0?1:-1;
    if(turnLock&&Math.abs(err)<110)turnLock=0;
    const steer=turnLock?(turnLock>0?60:-60):err*1.4;
    const altErr=g.y-(hud.altFt/3.28084), wantVy=Math.max(-4,Math.min(4,altErr*.5)), vy=hud.vsFpm/196.85;
    if(Date.now()-(trace.at(-1)?.t||0)>4000)trace.push({t:Date.now()%100000,next,err:+err.toFixed(0),lat:+lat2.toFixed(0),along:+along2.toFixed(0),vy:+vy.toFixed(1),dist:+distKm.toFixed(0),brg:+brg.toFixed(0)});
    const wanted=new Set();
    if(steer>3)wanted.add('KeyD');else if(steer<-3)wanted.add('KeyA');
    if(vy<wantVy-.9)wanted.add('ArrowUp');else if(vy>wantVy+.9)wanted.add('ArrowDown');
    for(const key of held)if(!wanted.has(key)){await page.keyboard.up(key);held.delete(key);}
    for(const key of wanted)if(!held.has(key)){await page.keyboard.down(key);held.add(key);}
    await page.waitForTimeout(120);
    loopIters++;
  }
  for(const key of held)await page.keyboard.up(key);
  const result=await page.locator('#reportContent').innerText();
  const atExit=await page.evaluate(()=>({hud:document.querySelector('#raceHUD').textContent,obj:document.querySelector('#objective').textContent.slice(0,80),debriefVisible:!document.querySelector('#debrief').hidden,ias:document.querySelector('#ias').textContent,alt:document.querySelector('#alt').textContent}));
  if(!result.includes('RACE FINISHED')){
    await import('node:fs/promises').then(fs=>fs.writeFile('.qa/race-trace.json',JSON.stringify({loopIters,atExit,trace},null,2)));
  }
  assert.match(result,/RACE FINISHED.*NEW PERSONAL BEST/,JSON.stringify(trace));
  await page.getByRole('button',{name:'Dispatch',exact:true}).click();assert.match(await page.locator('#raceBest').innerText(),/\d+\.\d+s/);
  await page.reload();await page.waitForSelector('[data-boot="ready"]');assert.match(await page.locator('#raceBest').innerText(),/\d+\.\d+s/);
  assert.equal(errors.length,0,errors.join('\n'));
  return{threePlanes:true,hangarSwitching:true,keyboardCheckpoint:true,countdown:true,pauseAndRestart:true,reportExport:true,selectionPersists:true,fullKeyboardRace:true,bestTimePersists:true,result,raceHUD};
}
