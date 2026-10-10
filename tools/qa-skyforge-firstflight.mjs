import assert from 'node:assert/strict';
export default async function run(page){
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.waitForSelector('[data-boot="ready"][data-skyforge="surface"]');
  assert.equal(await page.locator('#start').inputValue(),'ready','engine running must be the first-run default');
  await page.getByRole('button',{name:'Enter cockpit'}).click();
  await page.locator('#flightCanvas').focus();
  const objective=await page.locator('#objective').innerText();
  assert.doesNotMatch(objective,/Engine stopped/,'engine-running start must not nag about startup');
  // Only keyboard: hold W through takeoff without opening any panel.
  await page.keyboard.down('KeyW');
  await page.waitForFunction(()=>Number(document.querySelector('#ias').textContent)>45,{timeout:60000});
  await page.keyboard.press('ArrowDown');
  await page.waitForFunction(()=>document.querySelector('#controlInfo').textContent.includes('AIRBORNE'),{timeout:20000});
  await page.keyboard.up('KeyW');
  const throttleText=await page.locator('#controlInfo').innerText();
  assert.match(throttleText,/THR [1-9]/,'throttle should show meaningful power during climb');
  await page.screenshot({path:'.qa/skyforge-firstflight.png'});
  // Audio: toggling the button turns it on (visible label change), engine keeps running.
  await page.getByRole('button',{name:'Audio off',exact:true}).click();
  assert.equal(await page.locator('#audioToggle').innerText(),'Audio on','audio toggle must flip to Audio on');
  assert.doesNotMatch(await page.locator('#systemReadouts').innerText(),/ENGINE STOPPED/,'engine must keep running after audio toggle');
  // Cold & dark must explain what to do instead of looking broken.
  await page.getByRole('button',{name:'Pause Esc',exact:true}).click();
  await page.getByRole('button',{name:'Return to dispatch',exact:true}).click();
  await page.locator('#start').selectOption('cold');
  await page.getByRole('button',{name:'Enter cockpit'}).click();
  await page.locator('#flightCanvas').focus();
  await page.waitForFunction(()=>document.querySelector('#systemReadouts').textContent.includes('ENGINE STOPPED'),{timeout:5000});
  const coldObjective=await page.locator('#objective').innerText();
  assert.match(coldObjective,/Aircraft systems/);
  assert.equal(errors.length,0,errors.join('\n'));
  return{keyboardOnlyTakeoff:true,audioToggle:true,coldDarkExplained:true,objective};
}
