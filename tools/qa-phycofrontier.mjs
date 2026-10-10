import assert from 'node:assert/strict';

export default async function run(page) {
  const errors = [];
  const failed = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('requestfailed', request => failed.push(`${request.method()} ${request.url()}`));
  await page.waitForSelector('body[data-game="ready"]');
  await page.evaluate(() => localStorage.removeItem('orr-phycofrontier-save-v1'));
  await page.reload();
  await page.waitForSelector('body[data-game="ready"]');
  assert.equal(await page.locator('#regionName').innerText(), 'Verdant Estuary');
  assert.equal(await page.locator('body').getAttribute('data-archive'), '0');

  await page.locator('#world').focus();
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(900);
  await page.keyboard.up('ArrowRight');
  await page.keyboard.press('f');
  await page.waitForFunction(() => document.querySelector('#objectiveText')?.textContent.includes('collect'));
  await page.keyboard.press('e');
  await page.waitForFunction(() => document.body.dataset.rawSamples === '1');
  const collected = 1;

  await page.evaluate(() => document.querySelector('[data-panel="devices"]').click());
  assert.ok(await page.locator('.device-card h3').filter({ hasText: 'Field Sampler' }).count());
  await page.evaluate(() => document.querySelector('[data-install-device="sorter"]').click());
  assert.equal(await page.locator('[data-install-device="sorter"]').count(), 0);
  await page.evaluate(() => document.querySelector('[data-run-device="device-002"]').click());
  await page.waitForFunction(() => document.querySelector('[data-run-device="device-002"]')?.innerText === 'PROCESS', { timeout: 12000 });
  const processingResult = JSON.parse(await page.evaluate(() => localStorage.getItem('orr-phycofrontier-save-v1'))).samples.map(sample => sample.status);

  if (processingResult.includes('candidate')) {
    await page.evaluate(() => document.querySelector('[data-install-device="isolator"]').click());
    await page.evaluate(() => document.querySelector('[data-run-device="device-003"]').click());
    await page.waitForFunction(() => document.querySelector('[data-run-device="device-003"]')?.innerText === 'PROCESS', { timeout: 14000 });
  }
  await page.evaluate(() => document.querySelector('[data-panel="archive"]').click());
  assert.equal(await page.locator('#panelTitle').innerText(), 'Specimen archive');
  assert.match(await page.locator('#panelBody').innerText(), /fictional, simulated organisms/);
  await page.evaluate(() => document.querySelector('[data-panel="map"]').click());
  assert.equal(await page.locator('.map-region.current').count(), 1);
  await page.evaluate(() => document.querySelector('[data-action="save"]').click());
  await page.waitForFunction(() => document.querySelector('#saveState').textContent.includes('LOCAL SAVE'));

  const saved = await page.evaluate(() => { const s=JSON.parse(localStorage.getItem('orr-phycofrontier-save-v1')); return { archive:s.archive.length, samples:s.samples.length }; });
  await page.screenshot({ path: '.qa/phycofrontier-map.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  const overflow = await page.evaluate(() => ({ width: window.innerWidth, scroll: document.documentElement.scrollWidth, wide: [...document.querySelectorAll('*')].filter(element => element.scrollWidth > element.clientWidth + 1).slice(0, 8).map(element => ({ tag: element.tagName, id: element.id, className: String(element.className), scroll: element.scrollWidth, client: element.clientWidth, rect: Math.round(element.getBoundingClientRect().width) })) }));
  assert.ok(overflow.scroll <= overflow.width + 1, `mobile route has no horizontal overflow: ${JSON.stringify(overflow)}`);
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.reload();
  await page.waitForSelector('body[data-game="ready"]');
  assert.deepEqual(await page.evaluate(() => { const s=JSON.parse(localStorage.getItem('orr-phycofrontier-save-v1')); return { archive:s.archive.length, samples:s.samples.length }; }), saved);
  assert.equal(errors.length, 0, errors.join('\n'));
  assert.equal(failed.length, 0, failed.join('\n'));
  return { boot: true, movement: true, scanned: true, samples: collected, processing: true, map: true, saveRestore: true, mobileNoOverflow: true };
}
