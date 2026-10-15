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
  // Simple wasd: W = climb up (plane advances). Motion verified by actual position change (nav distance shrinks).
  const initial=await page.evaluate(()=>({dist:Number(document.querySelector('#navInfo').textContent.match(/· ([\d.]+) km/)?.[1]),alt:Number(document.querySelector('#alt').textContent)}));
  await page.keyboard.down('KeyW');
  await page.waitForFunction(initial=>Number(document.querySelector('#navInfo').textContent.match(/· ([\d.]+) km/)?.[1])<initial.dist-0.1,initial,{timeout:15000});
  await page.keyboard.up('KeyW');
  const moved=await page.evaluate(()=>({dist:Number(document.querySelector('#navInfo').textContent.match(/· ([\d.]+) km/)?.[1]),alt:Number(document.querySelector('#alt').textContent)}));
  assert.ok(moved.alt>initial.alt+40,'W climbs the plane');assert.ok(moved.dist<initial.dist-.1,'W keeps flying forward');
  // A banks left, D banks right back, release auto-levels.
  await page.keyboard.down('KeyA');await page.waitForFunction(()=>Number(document.querySelector('#controlInfo').textContent.match(/BANK (-?\d+)/)[1])<-15,null,{timeout:5000});await page.keyboard.up('KeyA');
  await page.waitForTimeout(1500);await page.keyboard.down('KeyD');await page.waitForFunction(()=>Number(document.querySelector('#controlInfo').textContent.match(/BANK (-?\d+)/)[1])>15,null,{timeout:5000});await page.keyboard.up('KeyD');
  await page.waitForFunction(()=>Math.abs(Number(document.querySelector('#controlInfo').textContent.match(/BANK (-?\d+)/)[1]))<3,null,{timeout:5000});
  // Simple wasd: S = dive down — altitude/vertical speed should drop.
  await page.keyboard.down('KeyS');await page.waitForFunction(()=>Number(document.querySelector('#vs').textContent)<-120,null,{timeout:9000});
  await page.keyboard.up('KeyS');
  // Map: zoom in/out, fit, center, drag, click waypoint.
  await page.getByRole('button',{name:'Map M',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#mapCanvas').dataset.world===document.querySelector('#world').value);
  const span=Number(await page.locator('#mapCanvas').getAttribute('data-span'));await page.locator('#mapZoomIn').click();assert.ok(Number(await page.locator('#mapCanvas').getAttribute('data-span'))<span);
  await page.locator('#mapFit').click();assert.equal(await page.locator('#mapCanvas').getAttribute('data-span'),'70000');
  await page.locator('#mapCenter').click();const center=await page.locator('#mapCanvas').getAttribute('data-center');
  const box=await page.locator('#mapCanvas').boundingBox();await page.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.6,box.y+box.height*.6,{steps:5});await page.mouse.up();assert.notEqual(await page.locator('#mapCanvas').getAttribute('data-center'),center);
  await page.locator('#mapCanvas').click({position:{x:box.width*.45,y:box.height*.45}});await page.locator('#addWaypoint').click();await page.waitForFunction(()=>document.querySelectorAll('#routeList li').length===2,null,{timeout:3000});assert.equal(await page.locator('#routeList li').count(),2);
  await page.screenshot({path:`.qa/skyforge-${world}-map.png`});
  await page.locator('[data-close="mapPanel"]').click();await page.screenshot({path:`.qa/skyforge-${world}.png`});
  results.push({world,plane,forwardMotion:true,banking:true,brake:true,map:true});await page.locator('#hangarToggle').click();
 }
 await page.reload();await page.waitForSelector('[data-boot="ready"]');assert.equal(await page.locator('#world').inputValue(),'apocalypse');assert.equal(await page.locator('#aircraft').inputValue(),'peregrine');
 await page.getByRole('button',{name:'Enter cockpit'}).click();await page.locator('#debriefToggle').click();
 const event=page.waitForEvent('download');await page.locator('#exportReport').click();const download=await event;assert.equal(download.suggestedFilename(),'skyforge-flight-report.json');let text='';for await(const c of await download.createReadStream())text+=c;const report=JSON.parse(text);assert.equal(report.world,'apocalypse');assert.equal(report.controlMode,'easy');
 await page.locator('#debriefDispatch').click();
 // Old saves must not preserve the confusing old controls/start.
 await page.evaluate(()=>{const value=JSON.parse(localStorage.getItem('skyforge-save-v1'));delete value.config.controlsVersion;value.config.start='cold';value.settings.invert=true;localStorage.setItem('skyforge-save-v1',JSON.stringify(value));});
 await page.reload();await page.waitForSelector('[data-boot="ready"]');assert.equal(await page.locator('#start').inputValue(),'air');assert.equal(await page.locator('#invert').isChecked(),false);
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'dispatch fits mobile width');
 await page.screenshot({path:'.qa/skyforge-mobile-dispatch.png'});
 assert.equal(errors.length,0,errors.join('\n'));return{results,persistence:true,export:true,oldSaveMigration:true,mobileFit:true};
}
