/* Real headless-browser smoke test of production static assets + read-only API.
 * npm install --no-audit && node tools/test_connectome_browser.cjs
 * If a validated data/connectome.sqlite exists, also exercises the full graph.
 * Uses the chromium binary distributed via npm; no remote browser download.
 */
const fs=require('fs');
const os=require('os');
const path=require('path');
const zlib=require('zlib');
const {spawn,execFileSync}=require('child_process');
const {chromium:pw}=require('playwright-core');
const Chromium=require('@sparticuz/chromium').default;
const ROOT=path.resolve(__dirname,'..');
const PYTHON=process.env.NEUROML_PYTHON||(
  fs.existsSync(path.join(ROOT,'.venv','bin','python'))?path.join(ROOT,'.venv','bin','python'):'python');
const PORT=8137;
const BASE=`http://127.0.0.1:${PORT}`;
const assert=(condition,message)=>{if(!condition)throw Error(message)};
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function server(port,env={}){
  const process=spawn(PYTHON,['tools/connectome_server.py','--port',String(port)],{cwd:ROOT,env:{...global.process.env,...env},stdio:'pipe'});
  let error='';process.stderr.on('data',d=>error+=d);
  for(let attempt=0;attempt<40;attempt++){
    try{const r=await fetch(`http://127.0.0.1:${port}/api/connectome?resource=status`);if(r.ok)return process}catch{}
    if(process.exitCode!==null)throw Error('server exited: '+error);
    await delay(150);
  }
  process.kill();throw Error('connectome server did not start: '+error);
}
async function main(){
  // @sparticuz ships its NSS libraries in an AL2023 tar; this Debian sandbox
  // does not include them. Extract to a temporary directory, never into Git.
  const bin=path.resolve(path.dirname(require.resolve('@sparticuz/chromium')),'../bin/al2023.tar.br');
  const libdir=fs.mkdtempSync(path.join(os.tmpdir(),'neuroml-chrome-libs-'));
  fs.writeFileSync(path.join(libdir,'libs.tar'),zlib.brotliDecompressSync(fs.readFileSync(bin)));
  execFileSync('tar',['-xf',path.join(libdir,'libs.tar'),'-C',libdir]);
  const browser=await pw.launch({headless:true,executablePath:await Chromium.executablePath(),
    args:[...Chromium.args,'--use-gl=angle','--use-angle=swiftshader','--enable-webgl'],
    ignoreDefaultArgs:['--disable-gpu'],env:{...process.env,LD_LIBRARY_PATH:path.join(libdir,'lib')}});
  let app;
  const errors=[];
  try{
    app=await server(PORT);
    const page=await browser.newPage({viewport:{width:1024,height:768}});
    // A second instance deliberately lacks data. Do not leak the active graph.
    const empty=await server(8138,{NEUROML_DB_PATH:path.join(libdir,'no-atlas.sqlite')});
    try{
      page.on('pageerror',e=>errors.push('empty state: '+e.stack));
      await page.goto('http://127.0.0.1:8138/',{waitUntil:'networkidle'});
      await page.waitForFunction(()=>document.getElementById('graph-placeholder')?.textContent.includes('not configured'),{timeout:10000});
      assert((await page.locator('#graph-placeholder').innerText()).includes('not configured'),'missing DB state is not honest');
      await page.locator('[data-view="settings"]').click();
      assert((await page.locator('#content-panel').innerText()).includes('No connectome records'),'settings should explain missing source');
      console.log('PASS: not-configured deployment state and navigation');
    }finally{empty.kill()}

    const legacy=await fetch(BASE+'/download');
    assert(legacy.ok&&(await legacy.text()).includes('Download NeuroML-Android.apk'),'legacy app download page was lost');
    const sleep=await fetch(BASE+'/api/sleep?seconds=0.5&seed=7');
    const sleepData=await sleep.json();
    assert(sleep.ok&&sleepData.meta?.synapses>0&&sleepData.labels?.scope?.includes('stateless'),
      'existing sleep simulation endpoint was lost or mislabeled');
    const alias=await fetch(BASE+'/connectome');
    assert(alias.ok&&(await alias.text()).includes('FlyWire connectome atlas'),'existing /connectome route was lost');
    console.log('PASS: previous download, sleep simulation and connectome routes remain functional');
    await page.setViewportSize({width:1440,height:900});
    page.on('pageerror',e=>errors.push('pageerror: '+e.stack));
    page.on('console',msg=>{if(msg.type()==='error')errors.push('console: '+msg.text())});
    await page.goto(BASE,{waitUntil:'networkidle'});
    const ready=(await (await fetch(BASE+'/api/connectome?resource=status')).json()).active;
    if(ready){
      await page.waitForFunction(()=>document.getElementById('graph-placeholder').hidden,{timeout:30000});
      assert((await page.locator('#graph-render-count').innerText()).includes('139,255'),'all neuron points not rendered');
      console.log('PASS: 139,255 source points rendered in WebGL');
      const box=await page.locator('#brain-canvas').boundingBox();
      const pickStarted=Date.now();
      await page.mouse.click(box.x+box.width*.52,box.y+box.height*.54);
      await page.locator('.inspector-id').waitFor({timeout:8000});
      console.log(`PASS: a real neuron is selectable directly on the GPU point cloud (${Date.now()-pickStarted}ms including API)`);
      const search=page.locator('#global-search');await search.fill('KC');
      await page.locator('.suggestion').first().waitFor({timeout:8000});
      await page.locator('.suggestion').first().click();
      await page.locator('.inspector-id').waitFor({timeout:8000});
      const selected=(await page.locator('.inspector-id').innerText()).match(/\d{18}/)?.[0];
      assert(selected,'search did not open a real neuron');
      await page.locator('[data-inspector-tab="incoming"]').click();
      await page.locator('.partner-list').waitFor({timeout:8000});
      await page.locator('.partner-entry .mini-edge').first().click();
      await page.locator('.inspector-title').waitFor();
      assert((await page.locator('.inspector-title').innerText()).includes('→'),'real edge inspector not loaded');
      await page.locator('[data-action="return-neuron"]').click();
      await page.locator('[data-inspector-tab="morphology"]').click();
      await page.getByText('No version-matched SWC is configured.').waitFor({timeout:4000}).catch(async()=>{
        assert((await page.locator('#inspector-tab-content').innerText()).includes('No version-matched SWC'),'morphology should say unavailable');
      });
      console.log('PASS: real autocomplete, neuron, incoming pairs, edge inspector and honest morphology state');
      await page.locator('[data-view="explorer"]').click();
      await page.locator('#weight-filter').selectOption('5');
      await page.waitForFunction(()=>document.getElementById('filter-count')?.textContent.includes('12,391,470'),{timeout:10000});
      assert((await page.locator('#filter-count').innerText()).includes('2,700,513'),'5-contact view count incorrect');
      console.log('PASS: exact, view-only threshold reveals omitted count');
      await page.locator('[data-view="anatomy"]').click();
      await page.locator('[data-region="EB"]').first().click();
      await page.waitForFunction(()=>document.getElementById('content-panel')?.textContent.includes('EB / source coverage'));
      console.log('PASS: real region mask and anatomical population');
      await page.locator('[data-view="neurons"]').click();
      await page.locator('#neuron-region').selectOption(''); // remove inherited EB filter
      await page.locator('#neuron-q').fill('LPLC2');
      await page.locator('#population-form button[type="submit"]').click();
      await page.locator('#neuron-table .row-button').first().waitFor({timeout:10000});
      assert((await page.locator('#neuron-table').innerText()).includes('LPLC2'),'population search did not use biological type');
      console.log('PASS: biological population search');
      await page.locator('[data-view="analysis"]').click();
      await page.locator('.chart [data-degree-in="1–4"]').click();
      assert((await page.locator('#view-title').innerText())==='Neuron Explorer','degree chart did not navigate to filtered neurons');
      await page.locator('[data-view="populations"]').click();
      await page.locator('[data-pop-class="optic"]').click();
      assert((await page.locator('#view-title').innerText())==='Connectome Explorer','population chart did not navigate to class filter');
      console.log('PASS: interactive analytics charts and population filters');
      await page.locator('[data-view="tracer"]').click();
      await page.locator('#trace-source').fill('720575940596125868');
      await page.locator('#trace-target').fill('720575940640198784');
      await page.locator('#trace-form button[type="submit"]').click();
      await page.locator('.path-chain').waitFor({timeout:10000});
      assert((await page.locator('#trace-result').innerText()).includes('OBSERVED'),'real route was not traced');
      console.log('PASS: real directed pathway tracing');
      await page.locator('[data-view="integrity"]').click();
      const text=await page.locator('#content-panel').innerText();
      assert(text.includes('15,091,983')&&(ready.official_pair_asset_crosschecked?
        text.includes('official-derived index')&&text.includes('original Feather'):
        text.includes('canonical pair index not yet compared')),'integrity panel missing record-level crosscheck or coverage caveat');
      console.log('PASS: source reconciliation and provenance in UI');
      await page.screenshot({path:path.join(ROOT,'data','test-desktop.png')});
      const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true});
      mobile.on('pageerror',e=>errors.push('mobile: '+e.stack));
      await mobile.goto(BASE,{waitUntil:'networkidle'});
      await mobile.waitForFunction(()=>document.getElementById('graph-placeholder').hidden,{timeout:30000});
      await mobile.locator('#menu-toggle').click();
      await mobile.locator('[data-view="integrity"]').click();
      assert((await mobile.locator('#view-title').innerText())==='Dataset Integrity','mobile navigation failed');
      await mobile.waitForTimeout(350); // allow drawer transition to finish
      assert(!(await mobile.locator('#sidebar').evaluate(e=>e.classList.contains('open'))),'mobile drawer did not close');
      await mobile.screenshot({path:path.join(ROOT,'data','test-mobile.png')});
      await mobile.close();
      console.log('PASS: real WebGL view, navigation, integrity on mobile');
    }else{
      assert((await page.locator('#graph-placeholder').innerText()).includes('not configured'),'not-configured state masqueraded as data');
      assert(await page.locator('#global-search').isDisabled(),'search must be disabled without source data');
      console.log('PASS: not-configured state is explicit');
    }
    assert(!errors.length,errors.join('\n'));
    console.log('BROWSER_SMOKE_OK');
  }finally{
    app?.kill();
    const closed=await Promise.race([browser.close().then(()=>true).catch(()=>false),delay(5000).then(()=>false)]);
    fs.rmSync(libdir,{recursive:true,force:true});
    if(!closed)throw Error('Chromium did not close within five seconds');
  }
}
main().catch(e=>{console.error(e);process.exit(1)});
