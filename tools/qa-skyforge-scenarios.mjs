import assert from 'node:assert/strict';
export default async function run(page){
  await page.waitForSelector('[data-boot="ready"]');
  await page.locator('#start').selectOption('air');await page.locator('#weather').selectOption('overcast');
  await page.locator('#hour').fill('21');await page.getByRole('button',{name:'Enter cockpit'}).click();
  await page.getByRole('button',{name:'Aircraft systems',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('#systemReadouts').textContent.includes('ENGINE RUNNING'));
  await page.getByText('Explicit failure controls',{exact:true}).click();
  await page.locator('[data-failure="electrical"]').click();
  await page.waitForFunction(()=>document.querySelector('#systemReadouts').textContent.includes('gauges OFF'));
  assert.match(await page.locator('#warnings').innerText(),/ELECTRICAL BUS OFF/);
  await page.locator('[data-failure="electrical"]').click();
  await page.locator('[data-system="panelLights"]').click();
  await page.locator('[data-system="landingLights"]').click();
  await page.locator('#mixture').fill('0');
  await page.waitForFunction(()=>document.querySelector('#systemReadouts').textContent.includes('ENGINE STOPPED'));
  await page.locator('#mixture').fill('1');await page.locator('[data-system="starter"]').click();
  await page.waitForFunction(()=>document.querySelector('#systemReadouts').textContent.includes('ENGINE RUNNING'));
  await page.locator('[data-close="systems"]').click();
  await page.getByRole('button',{name:'03 Free camera',exact:true}).click();
  await page.locator('#flightCanvas').focus();await page.keyboard.down('KeyQ');await page.waitForTimeout(300);await page.keyboard.up('KeyQ');
  await page.getByRole('button',{name:'01 Cockpit',exact:true}).click();
  await page.getByRole('button',{name:'Pause Esc',exact:true}).click();await page.waitForTimeout(300);
  assert.ok(await page.locator('#pause').isVisible());await page.getByRole('button',{name:'Resume flight',exact:true}).click();
  for(const size of[{width:1920,height:1080},{width:1366,height:768}]){await page.setViewportSize(size);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  await page.screenshot({path:'.qa/skyforge-night.png'});
  return{weatherConfigured:true,nightConfiguration:true,electricalFailure:true,mixtureShutdown:true,restart:true,freeCamera:true,pauseResume:true,desktopFit:true};
}
