import assert from 'node:assert/strict';
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
  // Fly an entire race via the same HUD and keyboard controls available to the player.
  await page.getByRole('button',{name:'Enter cockpit'}).click();await page.locator('#flightCanvas').focus();
  const targetAltitude=Number(await page.locator('#alt').innerText()),held=new Set();
  const deadline=Date.now()+135000;let lastTrace=0;const trace=[];
  while(Date.now()<deadline&&await page.locator('#debrief').isHidden()){
    const hud=await page.evaluate(()=>({alt:Number(document.querySelector('#alt').textContent),vs:Number(document.querySelector('#vs').textContent),control:document.querySelector('#controlInfo').textContent,nav:document.querySelector('#navInfo').textContent}));
    if(Date.now()-lastTrace>10000){lastTrace=Date.now();trace.push({hud,objective:await page.locator('#objective').innerText()});}
    const bank=Number(hud.control.match(/BANK (-?\d+)/)?.[1]||0),pitch=Number(hud.control.match(/PITCH (-?\d+)/)?.[1]||0),error=Number(hud.nav.match(/course error (-?\d+)/)?.[1]||0);
    const wantedBank=Math.max(-20,Math.min(20,error)),wantedPitch=Math.max(-8,Math.min(14,(targetAltitude-hud.alt)*.035-hud.vs*.004+3));
    const wanted=new Set();if(bank<wantedBank-2)wanted.add('ArrowRight');if(bank>wantedBank+2)wanted.add('ArrowLeft');if(pitch<wantedPitch-1)wanted.add('ArrowDown');if(pitch>wantedPitch+1)wanted.add('ArrowUp');
    for(const key of held)if(!wanted.has(key)){await page.keyboard.up(key);held.delete(key);}for(const key of wanted)if(!held.has(key)){await page.keyboard.down(key);held.add(key);}
    // Short key taps avoid overcorrecting against the HUD's 150ms refresh interval.
    await page.waitForTimeout(45);
    for(const key of held)await page.keyboard.up(key);held.clear();
    await page.waitForTimeout(160);
  }
  for(const key of held)await page.keyboard.up(key);
  const result=await page.locator('#reportContent').innerText();if(!result.includes('RACE FINISHED')){await import('node:fs/promises').then(fs=>fs.writeFile('.qa/race-trace.json',JSON.stringify(trace,null,2)));}assert.match(result,/RACE FINISHED.*NEW PERSONAL BEST/,JSON.stringify(trace));
  await page.getByRole('button',{name:'Dispatch',exact:true}).click();assert.match(await page.locator('#raceBest').innerText(),/\d+\.\d+s/);
  await page.reload();await page.waitForSelector('[data-boot="ready"]');assert.match(await page.locator('#raceBest').innerText(),/\d+\.\d+s/);
  assert.equal(errors.length,0,errors.join('\n'));
  return{threePlanes:true,hangarSwitching:true,keyboardCheckpoint:true,countdown:true,pauseAndRestart:true,reportExport:true,selectionPersists:true,fullKeyboardRace:true,bestTimePersists:true,result,raceHUD};
}
