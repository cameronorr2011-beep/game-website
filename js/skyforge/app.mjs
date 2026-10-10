import { createScene } from './scene.mjs';
import { AIRPORTS, WEATHER, DT, clamp, degrees, createFlight, stepFlight, navigation, surfaceHeight, indicatedAirspeed, flightReport, readSave, writeSave } from './simulation.mjs';
const $=id=>document.getElementById(id);
const saved=readSave();
let save=saved||{version:1,settings:{sensitivity:1,invert:false,deadzone:.12,quality:'medium',volume:0},config:{},training:[],logs:[]};
let state=createFlight({start:'air'}),visual=null,active=false,paused=false,accumulator=0,lastTime=0,lastUI=0,frames=[],stats={},reported=false,config={};
const keys=new Set();
let audio=null;
const f=n=>Number(n).toFixed(0),kt=v=>v*1.94384,ft=v=>v*3.28084;
function fillAirports(id){$(id).replaceChildren(...AIRPORTS.map(a=>{const option=document.createElement('option');option.value=a.id;option.textContent=`${a.id} · ${a.name}`;return option;}));}
['departure','destination','mapDestination'].forEach(fillAirports);$('destination').value='SF02';
function runways(){const a=AIRPORTS.find(a=>a.id===$('departure').value);$('runway').replaceChildren(...a.runways.map(r=>{const o=document.createElement('option');o.value=r;o.textContent=`Runway ${r} · ${a.length} m`;return o;}));}
$('departure').addEventListener('change',runways);runways();
for(const id of['mode','start','departure','destination','weather','hour'])if(save.config[id]!==undefined)$(id).value=save.config[id];runways();if(save.config.runway)$('runway').value=save.config.runway;
for(const id of['sensitivity','deadzone','quality','volume'])$(id).value=save.settings[id];$('invert').checked=save.settings.invert;
$('hourLabel').value=`${$('hour').value}:00`;function preset(){const w=WEATHER[$('weather').value];$('wind').value=w.wind;$('windDirection').value=w.direction;$('visibility').value=w.visibility/1000;}preset();
$('weather').addEventListener('change',preset);$('hour').addEventListener('input',()=>{$('hourLabel').value=`${$('hour').value}:00`;});
$('saveInfo').textContent=`Local flight log: ${save.logs.length} flights · training stages completed: ${save.training.length}/6. ${saved?'Preferences restored.':''}`;
function persist(){save.settings={sensitivity:Number($('sensitivity').value),invert:$('invert').checked,deadzone:Number($('deadzone').value),quality:$('quality').value,volume:Number($('volume').value)};save.config=config;return writeSave(save);}
function togglePanel(id){$(id).hidden=!$(id).hidden;}
function togglePause(){if(!active)return;paused=!paused;$('pause').hidden=!paused;keys.clear();}
function applySystem(id){if(!active)return;
  if(id==='starter'){state.systems.starter=true;setTimeout(()=>state.systems.starter=false,1200);}
  else if(id==='throttle')state.controls.throttle=clamp(state.controls.throttle+.1,0,1);
  else if(id==='mixture')state.controls.mixture=state.controls.mixture>.1?0:1;
  else state.systems[id]=!state.systems[id];
  clickSound();updateUI();
}
function setCamera(mode){visual?.setCamera(mode);keys.clear();document.querySelectorAll('[data-camera]').forEach(b=>b.classList.toggle('active',b.dataset.camera===mode));}
function startFlight(){
  config={mode:$('mode').value,start:$('start').value,ready:$('start').value==='ready',departure:$('departure').value,destination:$('destination').value,runway:$('runway').value,weather:$('weather').value,hour:Number($('hour').value),customWeather:{wind:clamp(Number($('wind').value),0,25),direction:clamp(Number($('windDirection').value),0,359),visibility:clamp(Number($('visibility').value),1,40)*1000}};
  state=createFlight(config);active=true;paused=false;reported=false;accumulator=0;keys.clear();setCamera('cockpit');
  ['setup','pause','debrief'].forEach(id=>$(id).hidden=true);['hud','flightInfo','cameraBar'].forEach(id=>$(id).hidden=false);
  $('mapDestination').value=state.destination;persist();updateUI();$('flightCanvas').focus();
}
$('flightForm').addEventListener('submit',e=>{e.preventDefault();startFlight();});
$('pauseToggle').onclick=togglePause;$('resume').onclick=togglePause;$('restart').onclick=startFlight;$('debriefRestart').onclick=startFlight;
function dispatch(){active=false;paused=false;keys.clear();['pause','debrief','hud','flightInfo','cameraBar','systems','mapPanel','controls'].forEach(id=>$(id).hidden=true);$('setup').hidden=false;state=createFlight({start:'air'});$('saveInfo').textContent=`Local flight log: ${save.logs.length} flights · training stages completed: ${save.training.length}/6.`;}
$('dispatch').onclick=dispatch;$('debriefDispatch').onclick=dispatch;
$('mapToggle').onclick=()=>togglePanel('mapPanel');$('helpToggle').onclick=()=>togglePanel('controls');$('systemsToggle').onclick=()=>togglePanel('systems');
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).hidden=true);
document.querySelectorAll('[data-camera]').forEach(b=>b.onclick=()=>setCamera(b.dataset.camera));
document.querySelectorAll('[data-system]').forEach(b=>b.onclick=()=>applySystem(b.dataset.system));
document.querySelectorAll('[data-failure]').forEach(b=>b.onclick=()=>{const key=b.dataset.failure;state.failures[key]=!state.failures[key];updateUI();});
for(const id of['throttle','mixture','trim','flaps'])$(id).addEventListener('input',()=>{state.controls[id]=Number($(id).value);});
for(const id of['sensitivity','deadzone','quality','invert','volume'])$(id).addEventListener('change',()=>{persist();if(id==='quality'&&visual){visual.renderer.setPixelRatio(Math.min(devicePixelRatio,{low:1,medium:1.25,high:1.75}[$('quality').value]));visual.renderer.shadowMap.enabled=$('quality').value!=='low';visual.resize();}});
$('mapDestination').onchange=()=>{state.destination=$('mapDestination').value;const a=AIRPORTS.find(a=>a.id===state.destination);state.route=[{id:a.id,name:a.name,x:a.x,z:a.z}];state.waypoint=0;updateRoute();};
$('addWaypoint').onclick=()=>{const x=Number($('waypointX').value)*1000,z=Number($('waypointZ').value)*1000;if(!Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>100000||Math.abs(z)>100000)return;state.route.splice(Math.max(0,state.route.length-1),0,{id:`WP${state.route.length}`,name:`Waypoint ${state.route.length}`,x,z});updateRoute();};
function updateRoute(){const list=$('routeList');list.replaceChildren();state.route.forEach((p,i)=>{const li=document.createElement('li');li.textContent=`${i===state.waypoint?'→ ':''}${p.name} (${(p.x/1000).toFixed(1)}, ${(p.z/1000).toFixed(1)} km)`;if(state.route.length>1&&i<state.route.length-1){const b=document.createElement('button');b.textContent='Remove';b.onclick=()=>{state.route.splice(i,1);state.waypoint=Math.min(state.waypoint,state.route.length-1);updateRoute();};li.appendChild(b);}list.appendChild(li);});}
const flightKeys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyS','KeyA','KeyD','KeyB','KeyE','KeyF','BracketLeft','BracketRight','KeyC','Digit1','Digit2','Digit3','KeyQ','KeyZ'];
window.addEventListener('keydown',e=>{
  if(['INPUT','SELECT','TEXTAREA','BUTTON'].includes(document.activeElement?.tagName)&&e.code!=='Escape')return;
  if(e.code==='Escape'){e.preventDefault();togglePause();return;}
  if(!active||paused)return;
  if(flightKeys.includes(e.code)){e.preventDefault();keys.add(e.code);}
  if(e.repeat)return;
  if(e.code==='KeyM'){e.preventDefault();togglePanel('mapPanel');}
  if(e.key==='?')togglePanel('controls');
  if(e.code==='KeyE')applySystem('starter');
  if(e.code==='KeyF')state.controls.flaps=state.controls.flaps>=.99?0:Math.min(1,state.controls.flaps+.33);
  if(e.code==='BracketLeft')state.controls.trim=clamp(state.controls.trim-.05,-1,1);
  if(e.code==='BracketRight')state.controls.trim=clamp(state.controls.trim+.05,-1,1);
  if(e.code==='KeyC')setCamera(['cockpit','chase','free'][(['cockpit','chase','free'].indexOf(visual.mode)+1)%3]);
  if(e.code.startsWith('Digit')&&['Digit1','Digit2','Digit3'].includes(e.code))setCamera(['cockpit','chase','free'][Number(e.code.slice(-1))-1]);
});
window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();if(active&&!paused){paused=true;$('pause').hidden=false;}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active){paused=true;keys.clear();$('pause').hidden=false;}});
function inputs(dt){const c=state.controls,sensitivity=save.settings.sensitivity,free=visual.mode==='free';
  let elevator=free?0:(Number(keys.has('ArrowDown'))-Number(keys.has('ArrowUp')))*sensitivity*(save.settings.invert?-1:1);
  let aileron=free?0:(Number(keys.has('ArrowRight'))-Number(keys.has('ArrowLeft')))*sensitivity;
  let rudder=free?0:(Number(keys.has('KeyD'))-Number(keys.has('KeyA')))*sensitivity;
  if(!free){c.throttle=clamp(c.throttle+(Number(keys.has('KeyW'))-Number(keys.has('KeyS')))*dt*.25,0,1);c.brake=keys.has('KeyB')?1:0;}
  const pad=navigator.getGamepads?.()[0];if(pad&&!free){const dz=save.settings.deadzone;const axis=v=>Math.abs(v)>dz?Math.sign(v)*(Math.abs(v)-dz)/(1-dz):0;
    aileron+=axis(pad.axes[0]||0)*sensitivity;elevator+=axis(pad.axes[1]||0)*sensitivity*(save.settings.invert?-1:1);rudder+=axis(pad.axes[2]||0);
    c.throttle=clamp(c.throttle+((pad.buttons[7]?.value||0)-(pad.buttons[6]?.value||0))*dt*.3,0,1);c.brake=Math.max(c.brake,pad.buttons[0]?.value||0);}
  c.elevator+= (clamp(elevator,-1,1)-c.elevator)*Math.min(1,dt*4);c.aileron+=(clamp(aileron,-1,1)-c.aileron)*Math.min(1,dt*4);c.rudder+=(clamp(rudder,-1,1)-c.rudder)*Math.min(1,dt*4);
}
function drawMap(canvas,report=false){const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;
  ctx.fillStyle='#081e26';ctx.fillRect(0,0,w,h);const project=(x,z)=>[w*.25+x/50000*w,h*.88-z/36000*h];
  ctx.strokeStyle='#284955';ctx.lineWidth=1;for(let i=0;i<10;i++){ctx.beginPath();ctx.moveTo(i*w/10,0);ctx.lineTo(i*w/10,h);ctx.moveTo(0,i*h/10);ctx.lineTo(w,i*h/10);ctx.stroke();}
  ctx.strokeStyle='#ceac6c';ctx.beginPath();const dep=AIRPORTS.find(a=>a.id===state.departure);ctx.moveTo(...project(dep.x,dep.z));for(const p of state.route)ctx.lineTo(...project(p.x,p.z));ctx.stroke();
  ctx.strokeStyle='#67c7bd';ctx.lineWidth=2;ctx.beginPath();state.flightPath.forEach((p,i)=>{const v=project(p.x,p.z);i?ctx.lineTo(...v):ctx.moveTo(...v);});ctx.stroke();
  for(const a of AIRPORTS){const[x,y]=project(a.x,a.z);ctx.fillStyle='#d4e4e1';ctx.fillRect(x-4,y-4,8,8);ctx.font='12px monospace';ctx.fillText(a.name,x+10,y+4);}
  const[x,y]=project(state.x,state.z);ctx.save();ctx.translate(x,y);ctx.rotate(state.heading);ctx.fillStyle='#ffffff';ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(-7,8);ctx.lineTo(7,8);ctx.fill();ctx.restore();
  if(!report){const n=navigation(state);$('mapInfo').textContent=`To ${n.target.name}: ${(n.distance/1000).toFixed(2)} km · bearing ${f(n.bearing)}° · ETA ${n.eta===null?'—':f(n.eta/60)+' min'} · ${f(ft(state.y))} ft · ${f(kt(state.airspeed))} kt · ${state.systems.fuel.toFixed(1)} L`;}
}
function updateUI(){if(!active)return;
  const s=state,nav=navigation(s),powered=s.systems.voltage>20;
  $('ias').textContent=f(kt(indicatedAirspeed(s)));$('alt').textContent=f(ft(s.y));$('hdg').textContent=String(Math.round((degrees(s.heading)+360)%360)).padStart(3,'0');$('vs').textContent=f(ft(s.vy)*60);$('rpm').textContent=f(s.systems.rpm);$('fuel').textContent=`${s.systems.fuel.toFixed(1)} L · ${f(s.systems.voltage)} V`;
  $('warnings').textContent=s.warnings.join(' · ');$('objective').textContent=s.objective;
  $('navInfo').textContent=`${nav.target.name} · ${(nav.distance/1000).toFixed(1)} km · BRG ${f(nav.bearing)}° · course error ${f(nav.error)}° · AGL ${f(ft(s.y-surfaceHeight(s.x,s.z)))} ft`;
  $('controlInfo').textContent=`THR ${f(s.controls.throttle*100)}% · PITCH ${f(degrees(s.pitch))}° · BANK ${f(degrees(s.roll))}° · RUD ${f(s.controls.rudder*100)}% · FLAPS ${f(s.controls.flaps*30)}° · TRIM ${f(s.controls.trim*100)}% · GEAR FIXED · ${s.grounded?'GROUND':'AIRBORNE'}`;
  const sorted=[...frames].sort((a,b)=>a-b),mean=frames.reduce((a,b)=>a+b,0)/Math.max(1,frames.length);
  $('perf').textContent=`${mean?(1000/mean).toFixed(0):'—'} FPS · p95 ${sorted[Math.floor(sorted.length*.95)]?.toFixed(1)||'—'} ms · ${stats.drawCalls||0} calls · ${((stats.triangles||0)/1000).toFixed(0)}k triangles · ${stats.chunks||0} terrain tiles`;
  document.querySelectorAll('[data-system]').forEach(b=>{const k=b.dataset.system;const value=s.systems[k];b.classList.toggle('on',value);b.textContent=k==='starter'?'Start engine':`${k.replace(/([A-Z])/g,' $1')} ${value?'ON':'OFF'}`;});
  for(const id of['throttle','mixture','trim'])if(document.activeElement!==$(id))$(id).value=s.controls[id];
  if(document.activeElement!==$('flaps'))$('flaps').value=String([0,.33,.66,1].reduce((a,b)=>Math.abs(b-s.controls.flaps)<Math.abs(a-s.controls.flaps)?b:a));
  $('systemReadouts').textContent=`${s.systems.engine?'ENGINE RUNNING':'ENGINE STOPPED'} · ${f(s.systems.rpm)} RPM · OIL ${f(s.systems.oilPressure)} psi / ${f(s.systems.oilTemp)} °C · BUS ${f(s.systems.voltage)} V · ${s.systems.batteryAh.toFixed(1)} Ah · gauges ${powered?'powered':'OFF'}`;
  if(!$('mapPanel').hidden){drawMap($('mapCanvas'));updateRoute();}
  if(s.status!=='active'&&!reported)showReport();
}
function showReport(){if(!active)return;paused=true;keys.clear();$('pause').hidden=true;$('debrief').hidden=false;
  const report=flightReport(state);if(!reported){save.logs.push(report);save.logs=save.logs.slice(-20);save.training=[...new Set([...save.training,...state.achievements])];persist();reported=true;}
  const result=state.touchdown;const content=$('reportContent');content.replaceChildren();
  const grid=document.createElement('div');grid.className='report-grid';for(const[label,value]of[['Duration',`${(state.time/60).toFixed(1)} min`],['Distance',`${(state.distanceFlown/1000).toFixed(1)} km`],['Fuel',`${state.fuelUsed.toFixed(1)} L`],['Peak altitude',`${f(ft(state.peakAltitude))} ft`],['Landing score',result?`${result.score}/100`:'No touchdown'],['Descent at contact',result?`${result.verticalSpeed.toFixed(1)} m/s`:'—']]){const d=document.createElement('div'),strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=value;small.textContent=label;d.append(strong,small);grid.appendChild(d);}content.appendChild(grid);
  const p=document.createElement('p');p.className='muted';p.textContent=`${state.status.toUpperCase()} · ${report.suggestions.join(' ')}`;content.appendChild(p);drawMap($('reportMap'),true);
}
$('debriefToggle').onclick=showReport;$('pauseDebrief').onclick=showReport;
$('exportReport').onclick=()=>{const blob=new Blob([JSON.stringify(flightReport(state),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='skyforge-flight-report.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
function initAudio(){if(audio)return;const context=new AudioContext(),master=context.createGain(),engine=context.createGain(),env=context.createGain(),osc=context.createOscillator();master.connect(context.destination);engine.connect(master);env.connect(master);osc.type='sawtooth';osc.connect(engine);osc.start();
  const buffer=context.createBuffer(1,context.sampleRate*2,context.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;const noise=context.createBufferSource(),filter=context.createBiquadFilter();noise.buffer=buffer;noise.loop=true;filter.type='lowpass';filter.frequency.value=550;noise.connect(filter);filter.connect(env);noise.start();audio={context,master,engine,env,osc};}
function clickSound(){if(!audio||Number($('volume').value)===0)return;const osc=audio.context.createOscillator(),gain=audio.context.createGain();osc.frequency.value=700;gain.gain.value=Number($('interfaceVolume').value)*.08;osc.connect(gain);gain.connect(audio.master);osc.start();gain.gain.exponentialRampToValueAtTime(.0001,audio.context.currentTime+.05);osc.stop(audio.context.currentTime+.06);}
$('audioToggle').onclick=()=>{initAudio();audio.context.resume();$('volume').value=Number($('volume').value)>0?0:.35;persist();$('audioToggle').textContent=Number($('volume').value)>0?'Audio on':'Audio off';};
function updateAudio(){if(!audio)return;const now=audio.context.currentTime;audio.master.gain.setTargetAtTime(Number($('volume').value),now,.05);audio.engine.gain.setTargetAtTime(state.systems.rpm/2700*Number($('engineVolume').value)*.025,now,.1);audio.osc.frequency.setTargetAtTime(25+state.systems.rpm/30,now,.1);audio.env.gain.setTargetAtTime((state.airspeed/100+state.weather.rain)*Number($('environmentVolume').value)*.035,now,.1);}
$('flightCanvas').addEventListener('webglcontextlost',e=>{e.preventDefault();paused=true;$('bootError').textContent='Graphics context lost. Flight paused; reload to recover. Preferences and completed logs are saved.';$('setup').hidden=false;});
let previous={};
function loop(time){const elapsed=lastTime?Math.min(.1,(time-lastTime)/1000):0;const raw=lastTime?time-lastTime:0;lastTime=time;
  if(active&&!paused){accumulator+=elapsed;let steps=0;while(accumulator>=DT&&steps<12){previous={x:state.x,y:state.y,z:state.z,pitch:state.pitch,roll:state.roll,heading:state.heading};inputs(DT);stepFlight(state,DT);accumulator-=DT;steps++;}}
  if(visual){const freeInput=visual.mode==='free'?{x:Number(keys.has('KeyD'))-Number(keys.has('KeyA')),z:Number(keys.has('KeyW'))-Number(keys.has('KeyS')),y:Number(keys.has('KeyQ'))-Number(keys.has('KeyZ'))}:{};
    let renderState=state;if(active&&!paused&&previous.x!==undefined){const a=accumulator/DT;renderState={...state};for(const k of['x','y','z','pitch','roll','heading'])renderState[k]=previous[k]+(state[k]-previous[k])*a;}
    stats=visual.render(renderState,time/1000,freeInput);}
  if(active&&!paused&&raw>0){frames.push(raw);if(frames.length>300)frames.shift();}
  if(time-lastUI>150){lastUI=time;updateUI();updateAudio();}
  requestAnimationFrame(loop);
}
try{visual=createScene($('flightCanvas'),save.settings.quality,applySystem);document.body.dataset.boot='ready';requestAnimationFrame(loop);
  // State-only automation surface; UI tests still use visible controls.
  window.__skyforge={getState:()=>structuredClone(state),performance:()=>({samples:frames.length,meanMs:frames.reduce((a,b)=>a+b,0)/Math.max(1,frames.length),p95Ms:[...frames].sort((a,b)=>a-b)[Math.floor(frames.length*.95)],...stats}),scene:()=>({meshes:visual.scene.children.length,webgl:visual.renderer.capabilities.isWebGL2,aircraftMeshes:visual.aircraft.children.length}),testAdvance:seconds=>{for(let i=0;i<seconds/DT;i++)stepFlight(state);updateUI();}};
}catch(error){document.body.dataset.boot='error';$('bootError').textContent=`Unable to initialize WebGL: ${error.message}. Enable hardware acceleration and use a modern desktop browser.`;$('launch').disabled=true;console.error(error);}
