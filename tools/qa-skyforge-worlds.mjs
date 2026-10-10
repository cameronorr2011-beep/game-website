import assert from 'node:assert/strict';
export default async function run(page){
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.waitForSelector('[data-boot="ready"]');
 assert.equal(await page.locator('#world option').count(),4);assert.equal(await page.locator('#aircraft option').count(),3);
 assert.equal(await page.locator('#start').inputValue(),'air');assert.equal(await page.locator('#assist').isChecked(),true);
 await page.locator('#quality').selectOption('low');
 const results=[];
 for(const [world,plane] of [['beach','peregrine'],['city','swift'],['cyberpunk','kestrel'],['apocalypse','peregrine']]){
  await page.locator('#world').selectOption(world);await page.locator('#aircraft').selectOption(plane);await page.locator('#mode').selectOption('free');
  await page.getByRole('button',{name:'Enter cockpit'}).click();
  await page.waitForFunction(({world,plane})=>document.querySelector('#flightCanvas').dataset.world===world&&document.querySelector('#flightCanvas').dataset.aircraft===plane,{world,plane});
  const initial=Number(await page.locator('#alt').innerText());
  // No explicit canvas focus: flight keys must work immediately after launching.
  await page.keyboard.down('KeyW');await page.waitForFunction(initial=>Number(document.querySelector('#alt').textContent)>initial+25,initial,{timeout:6000});await page.keyboard.up('KeyW');
  await page.waitForTimeout(800);const peak=Number(await page.locator('#alt').innerText());
  await page.keyboard.down('KeyS');await page.waitForFunction(peak=>Number(document.querySelector('#alt').textContent)<peak-25,peak,{timeout:6000});await page.keyboard.up('KeyS');
  await page.keyboard.down('KeyD');await page.waitForFunction(()=>Number(document.querySelector('#controlInfo').textContent.match(/BANK (-?\d+)/)[1])>15,null,{timeout:4000});await page.keyboard.up('KeyD');
  await page.waitForTimeout(1200);await page.keyboard.down('KeyA');await page.waitForFunction(()=>Number(document.querySelector('#controlInfo').textContent.match(/BANK (-?\d+)/)[1])< -15,null,{timeout:4000});await page.keyboard.up('KeyA');
  await page.waitForFunction(()=>Math.abs(Number(document.querySelector('#controlInfo').textContent.match(/BANK (-?\d+)/)[1]))<3,null,{timeout:4000});
  await page.getByRole('button',{name:'Map M',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#mapCanvas').dataset.world===document.querySelector('#world').value);
  const span=Number(await page.locator('#mapCanvas').getAttribute('data-span'));await page.locator('#mapZoomIn').click();assert.ok(Number(await page.locator('#mapCanvas').getAttribute('data-span'))<span);
  await page.locator('#mapFit').click();assert.equal(await page.locator('#mapCanvas').getAttribute('data-span'),'70000');
  await page.locator('#mapCenter').click();const center=await page.locator('#mapCanvas').getAttribute('data-center');
  const box=await page.locator('#mapCanvas').boundingBox();await page.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.6,box.y+box.height*.6,{steps:5});await page.mouse.up();assert.notEqual(await page.locator('#mapCanvas').getAttribute('data-center'),center);
  await page.locator('#mapCanvas').click({position:{x:box.width*.45,y:box.height*.45}});await page.locator('#addWaypoint').click();await page.waitForFunction(()=>document.querySelectorAll('#routeList li').length===2,null,{timeout:3000});assert.equal(await page.locator('#routeList li').count(),2);
  await page.screenshot({path:`.qa/skyforge-${world}-map.png`});
  await page.locator('[data-close="mapPanel"]').click();await page.screenshot({path:`.qa/skyforge-${world}.png`});
  results.push({world,plane,controls:true,map:true});await page.locator('#hangarToggle').click();
 }
 await page.reload();await page.waitForSelector('[data-boot="ready"]');assert.equal(await page.locator('#world').inputValue(),'apocalypse');assert.equal(await page.locator('#aircraft').inputValue(),'peregrine');
 await page.getByRole('button',{name:'Enter cockpit'}).click();await page.locator('#debriefToggle').click();
 const event=page.waitForEvent('download');await page.locator('#exportReport').click();const download=await event;assert.equal(download.suggestedFilename(),'skyforge-flight-report.json');let text='';for await(const c of await download.createReadStream())text+=c;const report=JSON.parse(text);assert.equal(report.world,'apocalypse');assert.equal(report.controlMode,'easy');
 await page.locator('#debriefDispatch').click();
 // Existing saves must not preserve the confusing old first-run controls/start.
 await page.evaluate(()=>{const value=JSON.parse(localStorage.getItem('skyforge-save-v1'));delete value.config.controlsVersion;value.config.start='cold';value.settings.invert=true;localStorage.setItem('skyforge-save-v1',JSON.stringify(value));});
 await page.reload();await page.waitForSelector('[data-boot="ready"]');assert.equal(await page.locator('#start').inputValue(),'air');assert.equal(await page.locator('#invert').isChecked(),false);
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'dispatch fits mobile width');
 await page.screenshot({path:'.qa/skyforge-mobile-dispatch.png'});
 assert.equal(errors.length,0,errors.join('\n'));return{results,persistence:true,export:true,oldSaveMigration:true,mobileFit:true};
}
