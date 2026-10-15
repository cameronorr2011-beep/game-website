import { WORLDS, worldFor, worldProps, WORLD_EXTENT } from './worlds.mjs';
import { createScene } from './scene.mjs';
import * as T from 'three';
import { keyboardFlightInput, terrainHeight, AIRPORTS, AIRCRAFTS, ALL_AIRCRAFTS, aircraftFor, WEATHER, DT, clamp, degrees, radians, wrap, createFlight, stepFlight, navigation, surfaceHeight, indicatedAirspeed, flightReport, readSave, writeSave } from './simulation.mjs';
const $=id=>document.getElementById(id);
const saved=readSave();
let save=saved||{version:1,settings:{sensitivity:1,invert:false,deadzone:.12,quality:'medium',volume:0},config:{},training:[],logs:[]};
let state=createFlight({start:'air'}),visual=null,active=false,paused=false,accumulator=0,lastTime=0,lastUI=0,frames=[],stats={},reported=false,config={},slowFrames=0,qualityAdapted=0,selectedAircraft='peregrine';
const keys=new Set(),touchInput={x:0,y:0,active:false};
let audio=null;
function showMessage(text){nextMessage=text;}
let nextMessage='';
const f=n=>Number(n).toFixed(0),kt=v=>v*1.94384,ft=v=>v*3.28084;
function fillAirports(id){$(id).replaceChildren(...AIRPORTS.map(a=>{const option=document.createElement('option');option.value=a.id;option.textContent=`${a.id} · ${a.name}`;return option;}));}
$('world').replaceChildren(...WORLDS.map(w=>{const o=document.createElement('option');o.value=w.id;o.textContent=w.name;return o;}));
function refreshWorld(){const w=worldFor($('world').value);$('worldDescription').textContent=w.description;$('hour').value=w.hour;$('hourLabel').value=`${w.hour}:00`;refreshHangar();}
$('world').addEventListener('change',refreshWorld);
$('aircraft').replaceChildren(...AIRCRAFTS.map(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=`${a.name} · ${a.role}`;return o;}));
function refreshHangar(){
  const plane=aircraftFor(selectedAircraft||$('aircraft').value);
  $('aircraftCode').textContent=plane.name.split(' ')[0];
  $('aircraftName').textContent=plane.name.split(' ').slice(1).join(' ');
  $('aircraftStats').textContent=`${plane.role} · ${Math.round(plane.maxPower/745.7)} hp · ${plane.fuelCapacity} L · rotate ~${plane.rotateKt} kt`;
  $('aircraftDescription').textContent=plane.description;
  $('jetPreset')?.classList.toggle('active',plane.id==='valkyrie');
  const best=save.records?.[`${plane.id}/${$('world').value}/${$('assist').checked?'easy':'simulation'}/${$('departure').value}/${$('runway').value}`];
  $('raceBest').textContent=best?`Race personal best: ${best.toFixed(2)}s · this aircraft / runway`:'Race personal best: no finish yet on this aircraft / runway';
}
$('aircraft').addEventListener('change',()=>{selectedAircraft=$('aircraft').value;refreshHangar();});
if($('jetPreset'))$('jetPreset').onclick=()=>{selectedAircraft=selectedAircraft==='valkyrie'?$('aircraft').value:'valkyrie';refreshHangar();};
['departure','destination','mapDestination'].forEach(fillAirports);$('destination').value='SF02';
function runways(){const a=AIRPORTS.find(a=>a.id===$('departure').value);$('runway').replaceChildren(...a.runways.map(r=>{const o=document.createElement('option');o.value=r;o.textContent=`Runway ${r} · ${a.length} m`;return o;}));}
$('departure').addEventListener('change',()=>{runways();refreshHangar();});runways();
['runway','assist'].forEach(id=>$(id).addEventListener('change',refreshHangar));
for(const id of['world','aircraft','mode','start','departure','destination','weather','hour'])if(save.config[id]!==undefined)$(id).value=save.config[id];runways();if(save.config.runway)$('runway').value=save.config.runway;
if(!ALL_AIRCRAFTS.some(a=>a.id===save.config.aircraft)){$('aircraft').value='peregrine';selectedAircraft='peregrine';}
else{selectedAircraft=save.config.aircraft;if(AIRCRAFTS.some(a=>a.id===selectedAircraft))$('aircraft').value=selectedAircraft;}
if(save.config.controlsVersion!==2)$('start').value='air';$('assist').checked=save.config.assist!==false;refreshWorld();
for(const id of['sensitivity','deadzone','quality','volume'])$(id).value=save.settings[id];$('invert').checked=false; // Migrate old inverted preferences: easy WASD is always W=climb.
$('hourLabel').value=`${$('hour').value}:00`;function preset(){const w=WEATHER[$('weather').value]||WEATHER.clear;$('wind').value=w.wind;$('windDirection').value=w.direction;$('visibility').value=w.visibility/1000;}preset();
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
function toggleSmoke(){if(!visual)return;const on=visual.toggleSmoke();if($('smokeToggle')){$('smokeToggle').textContent=on?'Smoke on':'Smoke off';$('smokeToggle').classList.toggle('active',on);}}
function toggleAutopilot(){if(!active)return;const next=!state.autopilot?.enabled;state.autopilot={enabled:next,heading:state.heading,altitude:Math.max(120,state.y)};if($('autopilotToggle')){$('autopilotToggle').textContent=next?'Autopilot ON':'Autopilot off';$('autopilotToggle').classList.toggle('active',next);}updateUI();}
if($('smokeToggle'))$('smokeToggle').onclick=toggleSmoke;
if($('autopilotToggle'))$('autopilotToggle').onclick=toggleAutopilot;
function startFlight(){
  const chosenAircraft=selectedAircraft||$('aircraft').value;
  config={controlsVersion:2,world:$('world').value,assist:$('assist').checked,aircraft:chosenAircraft,mode:$('mode').value,start:$('start').value,ready:$('start').value==='ready',departure:$('departure').value,destination:$('destination').value,runway:$('runway').value,weather:$('weather').value,hour:Number($('hour').value),customWeather:{wind:clamp(Number($('wind').value),0,25),direction:clamp(Number($('windDirection').value),0,359),visibility:clamp(Number($('visibility').value),1,40)*1000}};
  state=createFlight(config);active=true;paused=false;reported=false;accumulator=0;previous={};routeSignature='';keys.clear();setCamera('chase');$('mapPanel').hidden=true;mapView={x:10000,z:15000,span:50000};mapCacheKey='';
  if($('autopilotToggle')){$('autopilotToggle').textContent='Autopilot off';$('autopilotToggle').classList.remove('active');}
  ['setup','pause','debrief'].forEach(id=>$(id).hidden=true);['hud','flightInfo','cameraBar','hudOverlay','touchControls'].forEach(id=>{if($(id))$(id).hidden=false;});
  $('mapDestination').value=state.destination;persist();updateUI();$('flightCanvas').focus();
}
$('flightForm').addEventListener('submit',e=>{e.preventDefault();startFlight();});
$('pauseToggle').onclick=togglePause;$('resume').onclick=togglePause;$('restart').onclick=startFlight;$('debriefRestart').onclick=startFlight;
function dispatch(){active=false;paused=false;keys.clear();['pause','debrief','hud','flightInfo','cameraBar','systems','mapPanel','controls','hudOverlay','touchControls'].forEach(id=>{if($(id))$(id).hidden=true;});$('setup').hidden=false;state=createFlight({start:'air',world:$('world').value,aircraft:selectedAircraft||$('aircraft').value});refreshHangar();$('saveInfo').textContent=`Local flight log: ${save.logs.length} flights · training stages completed: ${save.training.length}/6.`;}
$('dispatch').onclick=dispatch;$('debriefDispatch').onclick=dispatch;
function hangar(){try{if(active&&!reported)showReport();}catch(err){showMessage('Debrief unavailable: '+err.message);}dispatch();$('aircraft').focus();}
['hangarToggle','pauseHangar','debriefHangar'].forEach(id=>$(id).onclick=hangar);
$('mapToggle').onclick=()=>togglePanel('mapPanel');$('helpToggle').onclick=()=>togglePanel('controls');$('systemsToggle').onclick=()=>togglePanel('systems');
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).hidden=true);
document.querySelectorAll('[data-camera]').forEach(b=>b.onclick=()=>setCamera(b.dataset.camera));
document.querySelectorAll('[data-system]').forEach(b=>b.onclick=()=>applySystem(b.dataset.system));
document.querySelectorAll('[data-failure]').forEach(b=>b.onclick=()=>{const key=b.dataset.failure;state.failures[key]=!state.failures[key];updateUI();});
for(const id of['throttle','mixture','trim','flaps'])$(id).addEventListener('input',()=>{state.controls[id]=Number($(id).value);});
for(const id of['sensitivity','deadzone','quality','invert','volume'])$(id).addEventListener('change',()=>{persist();if(id==='quality'&&visual){visual.renderer.setPixelRatio(Math.min(devicePixelRatio,{low:1,medium:1.25,high:1.75}[$('quality').value]));visual.renderer.shadowMap.enabled=$('quality').value!=='low';visual.resize();}});
$('mapDestination').onchange=()=>{if(state.race)return;state.destination=$('mapDestination').value;const a=AIRPORTS.find(a=>a.id===state.destination);state.route=[{id:a.id,name:a.name,x:a.x,z:a.z}];state.waypoint=0;updateRoute();};
$('addWaypoint').onclick=()=>{if(state.race)return;const x=Number($('waypointX').value)*1000,z=Number($('waypointZ').value)*1000;if(!Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>100000||Math.abs(z)>100000)return;state.route.splice(Math.max(0,state.route.length-1),0,{id:`WP${state.route.length}`,name:`Waypoint ${state.route.length}`,x,z});updateRoute();};
let routeSignature='';
function updateRoute(){const signature=JSON.stringify([state.route,state.waypoint]);if(signature===routeSignature)return;routeSignature=signature;const list=$('routeList');list.replaceChildren();state.route.forEach((p,i)=>{const li=document.createElement('li');li.textContent=`${i===state.waypoint?'→ ':''}${p.name} (${(p.x/1000).toFixed(1)}, ${(p.z/1000).toFixed(1)} km)`;if(!state.race&&state.route.length>1&&i<state.route.length-1){const b=document.createElement('button');b.textContent='Remove';b.onclick=()=>{state.route.splice(i,1);state.waypoint=Math.min(state.waypoint,state.route.length-1);updateRoute();};li.appendChild(b);}list.appendChild(li);});}
const cameraModes=['cockpit','chase','free','flyby'];
const flightKeys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyS','KeyA','KeyD','KeyB','KeyE','KeyF','BracketLeft','BracketRight','KeyC','Digit1','Digit2','Digit3','Digit4','KeyQ','KeyZ','ShiftLeft','ShiftRight','ControlLeft','ControlRight','Space','KeyR','KeyT','KeyP'];
window.addEventListener('keydown',e=>{
  if(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName)&&e.code!=='Escape')return;
  if(document.activeElement?.tagName==='BUTTON'&&flightKeys.includes(e.code))$('flightCanvas').focus();
  if(e.code==='Escape'){e.preventDefault();togglePause();return;}
  if(!active||paused)return;
  if(flightKeys.includes(e.code)){e.preventDefault();keys.add(e.code);}
  if(e.repeat)return;
  if(e.code==='KeyM'){e.preventDefault();togglePanel('mapPanel');}
  if(e.key==='?')togglePanel('controls');
  if(e.code==='KeyR')applySystem('starter');
  if(e.code==='KeyT')toggleSmoke();
  if(e.code==='KeyP')toggleAutopilot();
  if(e.code==='KeyF')state.controls.flaps=state.controls.flaps>=.99?0:Math.min(1,state.controls.flaps+.33);
  if(e.code==='BracketLeft')state.controls.trim=clamp(state.controls.trim-.05,-1,1);
  if(e.code==='BracketRight')state.controls.trim=clamp(state.controls.trim+.05,-1,1);
  if(e.code==='KeyC')setCamera(cameraModes[(cameraModes.indexOf(visual.mode)+1)%cameraModes.length]);
  if(e.code.startsWith('Digit')&&['Digit1','Digit2','Digit3','Digit4'].includes(e.code))setCamera(cameraModes[Number(e.code.slice(-1))-1]);
});
window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();if(active&&!paused){paused=true;$('pause').hidden=false;}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active){paused=true;keys.clear();$('pause').hidden=false;}});
// Touch thumbstick and action buttons
if($('touchStick')){
  const stick=$('touchStick'),knob=$('touchKnob');
  const moveStick=e=>{if(!touchInput.active)return;const r=stick.getBoundingClientRect(),dx=clamp((e.clientX-(r.left+r.width/2))/(r.width/2),-1,1),dy=clamp((e.clientY-(r.top+r.height/2))/(r.height/2),-1,1);touchInput.x=dx;touchInput.y=-dy;knob.style.transform=`translate(${dx*32}px,${dy*32}px)`;};
  stick.addEventListener('pointerdown',e=>{touchInput.active=true;stick.setPointerCapture(e.pointerId);moveStick(e);});
  stick.addEventListener('pointermove',moveStick);
  const resetStick=()=>{touchInput.active=false;touchInput.x=0;touchInput.y=0;knob.style.transform='translate(0,0)';};
  stick.addEventListener('pointerup',resetStick);stick.addEventListener('pointercancel',resetStick);
  const bindHold=(id,code)=>{const btn=$(id);if(!btn)return;btn.addEventListener('pointerdown',e=>{e.preventDefault();keys.add(code);});['pointerup','pointercancel','pointerleave'].forEach(ev=>btn.addEventListener(ev,()=>keys.delete(code)));};
  bindHold('touchPowerUp','KeyW');bindHold('touchBrake','KeyS');
  if($('touchCam'))$('touchCam').onclick=()=>setCamera(cameraModes[(cameraModes.indexOf(visual.mode)+1)%cameraModes.length]);
}
function inputs(dt){const c=state.controls,sensitivity=save.settings.sensitivity,free=visual.mode==='free';
  const input=keyboardFlightInput(keys);
  if((input.pitch||input.turn||input.brake||touchInput.active)&&state.autopilot?.enabled){state.autopilot.enabled=false;if($('autopilotToggle')){$('autopilotToggle').textContent='Autopilot off';$('autopilotToggle').classList.remove('active');}}
  let elevator=free?0:(input.pitch+touchInput.y)*sensitivity*(state.assist?1:save.settings.invert?-1:1);
  let aileron=free?0:(input.turn+touchInput.x)*sensitivity;
  let rudder=free?0:input.rudder*sensitivity;
  if(!free){
    if(state.assist){c.throttle=clamp(c.throttle+input.throttleUp*dt*.55-(input.throttleDown+input.throttleDownKeyS)*dt*.65,0,1);c.brake=input.brake?1:0;}
    else{c.brake=input.brake?1:0;c.throttle=clamp(c.throttle+(input.throttleUp-input.throttleDown)*dt*.5,0,1);}
  }
  const pad=navigator.getGamepads?.()[0];if(pad&&!free){const dz=save.settings.deadzone;const axis=v=>Math.abs(v)>dz?Math.sign(v)*(Math.abs(v)-dz)/(1-dz):0;
    aileron+=axis(pad.axes[0]||0)*sensitivity;elevator+=axis(pad.axes[1]||0)*sensitivity*(state.assist?1:save.settings.invert?-1:1);rudder+=axis(pad.axes[2]||0);
    c.throttle=clamp(c.throttle+((pad.buttons[7]?.value||0)-(pad.buttons[6]?.value||0))*dt*.35,0,1);c.brake=Math.max(c.brake,pad.buttons[0]?.value||0);}
  if(!state.autopilot?.enabled){
    state.easyInput={pitch:clamp(elevator,-1,1),turn:clamp(aileron,-1,1),brake:input.brake?1:0};
    const rate=Math.min(1,dt*10);
    c.elevator+=(clamp(elevator,-1,1)-c.elevator)*rate;c.aileron+=(clamp(aileron,-1,1)-c.aileron)*rate;c.rudder+=(clamp(rudder,-1,1)-c.rudder)*rate;
  }
}
function drawHudOverlay(s,nav){
  const canvas=$('hudOverlay');if(!canvas||canvas.hidden)return;
  const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,cx=w/2,cy=h/2;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='#8de1e6aa';ctx.fillStyle='#8de1e6cc';ctx.lineWidth=1.5;ctx.font='10px monospace';
  // Center aircraft bore-sight reference symbol
  ctx.beginPath();ctx.moveTo(cx-24,cy);ctx.lineTo(cx-8,cy);ctx.lineTo(cx-4,cy+5);ctx.moveTo(cx+24,cy);ctx.lineTo(cx+8,cy);ctx.lineTo(cx+4,cy+5);ctx.stroke();
  // Artificial horizon & pitch ladder
  ctx.save();ctx.translate(cx,cy);ctx.rotate(s.roll);
  const py=degrees(s.pitch)*4.2;
  ctx.strokeStyle='#6ee7b799';ctx.beginPath();ctx.moveTo(-95,py);ctx.lineTo(-28,py);ctx.moveTo(28,py);ctx.lineTo(95,py);ctx.stroke();
  for(const deg of[-20,-10,10,20]){
    const y=py-deg*4.2;if(Math.abs(y)>115)continue;
    ctx.beginPath();ctx.moveTo(-42,y);ctx.lineTo(-18,y);ctx.lineTo(-18,y+(deg>0?5:-5));ctx.moveTo(42,y);ctx.lineTo(18,y);ctx.lineTo(18,y+(deg>0?5:-5));ctx.stroke();
    ctx.fillText(String(Math.abs(deg)),46,y+3);
  }
  ctx.restore();
  // Flight Path Vector (velocity vector marker)
  const fpvX=cx+clamp(degrees(s.sideslip)*4,-120,120),fpvY=cy-clamp(degrees(s.pitch-s.alpha)*4.2,-100,100);
  ctx.strokeStyle='#ebbf78dd';ctx.beginPath();ctx.arc(fpvX,fpvY,6,0,Math.PI*2);ctx.moveTo(fpvX-14,fpvY);ctx.lineTo(fpvX-6,fpvY);ctx.moveTo(fpvX+6,fpvY);ctx.lineTo(fpvX+14,fpvY);ctx.moveTo(fpvX,fpvY-6);ctx.lineTo(fpvX,fpvY-13);ctx.stroke();
  // Target waypoint / next race gate director diamond
  const errX=cx+clamp(nav.error*2.6,-155,155);
  ctx.strokeStyle='#ebbf78';ctx.beginPath();ctx.moveTo(errX,22);ctx.lineTo(errX+7,29);ctx.lineTo(errX,36);ctx.lineTo(errX-7,29);ctx.closePath();ctx.stroke();
  ctx.fillStyle='#ebbf78';ctx.textAlign='center';ctx.fillText(`${nav.target.id||nav.target.name} ${(nav.distance/1000).toFixed(1)}km`,errX,16);
}
let mapView={x:10000,z:15000,span:50000},mapCacheKey='',mapDrag=null;
const mapBackground=document.createElement('canvas');mapBackground.width=280;mapBackground.height=210;
function mapCoordinates(e){const r=$('mapCanvas').getBoundingClientRect();return{x:mapView.x+((e.clientX-r.left)/r.width-.5)*mapView.span,z:mapView.z-( (e.clientY-r.top)/r.height-.5)*mapView.span*5/7};}
function mapZoom(factor){mapView.span=clamp(mapView.span*factor,2000,100000);drawMap($('mapCanvas'));}
$('mapZoomIn').onclick=()=>mapZoom(.7);$('mapZoomOut').onclick=()=>mapZoom(1/.7);
$('mapFit').onclick=()=>{mapView={x:(WORLD_EXTENT.minX+WORLD_EXTENT.maxX)/2,z:(WORLD_EXTENT.minZ+WORLD_EXTENT.maxZ)/2,span:70000};drawMap($('mapCanvas'));};
$('mapCenter').onclick=()=>{mapView.x=state.x;mapView.z=state.z;drawMap($('mapCanvas'));};$('mapHangar').onclick=hangar;
$('mapCanvas').addEventListener('wheel',e=>{e.preventDefault();mapZoom(e.deltaY<0?.8:1.25);},{passive:false});
$('mapCanvas').addEventListener('pointerdown',e=>{mapDrag={px:e.clientX,py:e.clientY,x:mapView.x,z:mapView.z,moved:false};$('mapCanvas').setPointerCapture(e.pointerId);});
$('mapCanvas').addEventListener('pointermove',e=>{if(!mapDrag)return;const r=$('mapCanvas').getBoundingClientRect(),dx=e.clientX-mapDrag.px,dy=e.clientY-mapDrag.py;if(Math.abs(dx)+Math.abs(dy)>4)mapDrag.moved=true;mapView.x=mapDrag.x-dx/r.width*mapView.span;mapView.z=mapDrag.z+dy/r.height*mapView.span*5/7;drawMap($('mapCanvas'));});
$('mapCanvas').addEventListener('pointerup',e=>{if(mapDrag&&!mapDrag.moved){const p=mapCoordinates(e);$('waypointX').value=(p.x/1000).toFixed(2);$('waypointZ').value=(p.z/1000).toFixed(2);}mapDrag=null;});
function drawMap(canvas,report=false){const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,view=report?{x:10000,z:15000,span:70000}:mapView;
  const project=(x,z)=>[w/2+(x-view.x)/view.span*w,h/2-(z-view.z)/view.span*w];
  const world=worldFor(state.world),key=`${world.id}/${view.x}/${view.z}/${view.span}/${h/w}`;
  if(key!==mapCacheKey){const bg=mapBackground.getContext('2d');for(let y=0;y<210;y++)for(let x=0;x<280;x++){const wx=view.x+(x/280-.5)*view.span,wz=view.z-(y/210-.5)*view.span*h/w,height=terrainHeight(wx,wz,state.world);
    const shade=clamp((height-30)/900,0,1),isWater=height<0,isSand=height>=0&&height<8;
    const waterColor=new T.Color(world.water),groundColor=new T.Color(world.ground).lerp(new T.Color(0xf3f1e6),shade*.55),sandColor=new T.Color(world.sand);
    const base=isWater?waterColor.clone().lerp(new T.Color(0xdff0f5),clamp((height+400)/400,0,.35)):isSand?sandColor:groundColor.lerp(groundColor.clone(),0);
    const slope=(terrainHeight(wx+view.span*.003,wz,state.world)-height)/view.span*.003;
    const light=1+(isWater?0:clamp(-slope*140,-.35,.5));
    bg.fillStyle=`rgb(${base.r*255*light|0},${base.g*255*light|0},${base.b*255*light|0})`;bg.fillRect(x,y,1,1);}
  if(world.id!=='beach'){bg.fillStyle=world.id==='cyberpunk'?'#fb74e7':'#b7a794';for(let cx=Math.floor((view.x-view.span/2)/2000);cx<=Math.ceil((view.x+view.span/2)/2000);cx++)for(let cz=Math.floor((view.z-view.span*h/w/2)/2000);cz<=Math.ceil((view.z+view.span*h/w/2)/2000);cz++)for(const p of worldProps(cx,cz,world.id,terrainHeight,AIRPORTS)){if(p.type==='building')bg.fillRect(140+(p.x-view.x)/view.span*280,105-(p.z-view.z)/view.span*280,Math.max(1,p.width/view.span*280),Math.max(1,p.depth/view.span*280));}}mapCacheKey=key;}
  ctx.drawImage(mapBackground,0,0,w,h);canvas.dataset.world=world.id;canvas.dataset.span=String(view.span);canvas.dataset.center=`${view.x.toFixed(0)},${view.z.toFixed(0)}`;
  if(!report)$('mapTitle').textContent=`${world.name} · full terrain map`;
  ctx.fillStyle='#07151c99';ctx.fillRect(0,0,w,h);
  ctx.strokeStyle='#284955';ctx.lineWidth=1;for(let i=0;i<10;i++){ctx.beginPath();ctx.moveTo(i*w/10,0);ctx.lineTo(i*w/10,h);ctx.moveTo(0,i*h/10);ctx.lineTo(w,i*h/10);ctx.stroke();}
  ctx.strokeStyle='#ceac6c';ctx.beginPath();const dep=AIRPORTS.find(a=>a.id===state.departure);ctx.moveTo(...project(dep.x,dep.z));for(const p of state.route)ctx.lineTo(...project(p.x,p.z));ctx.stroke();
  ctx.strokeStyle='#67c7bd';ctx.lineWidth=2;ctx.beginPath();state.flightPath.forEach((p,i)=>{const v=project(p.x,p.z);i?ctx.lineTo(...v):ctx.moveTo(...v);});ctx.stroke();
  for(const a of AIRPORTS){const[x,y]=project(a.x,a.z);ctx.fillStyle='#d4e4e1';ctx.fillRect(x-4,y-4,8,8);ctx.font='12px monospace';ctx.fillText(a.name,x+10,y+4);}
  if(state.race)state.race.gates.forEach((g,i)=>{const[x,y]=project(g.x,g.z);ctx.strokeStyle=i===state.race.next?'#ebbf78':i<state.race.next?'#688078':'#8de1e6';ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.stroke();ctx.fillStyle=ctx.strokeStyle;ctx.fillText(String(i+1),x+8,y);});
  const[x,y]=project(state.x,state.z);ctx.save();ctx.translate(x,y);ctx.rotate(state.heading);ctx.fillStyle='#ffffff';ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(-7,8);ctx.lineTo(7,8);ctx.fill();ctx.restore();
  if(!report){const n=navigation(state);$('mapInfo').textContent=`${world.name} · view ${(view.span/1000).toFixed(1)} km · To ${n.target.name}: ${(n.distance/1000).toFixed(2)} km · bearing ${f(n.bearing)}° · ETA ${n.eta===null?'—':f(n.eta/60)+' min'} · ${f(ft(state.y))} ft · ${f(kt(state.airspeed))} kt · ${state.systems.fuel.toFixed(1)} L`;}
}
function updateUI(){if(!active)return;
  const s=state,nav=navigation(s),powered=s.systems.voltage>20,agl=s.y-surfaceHeight(s.x,s.z,s.world);
  $('aircraftInfo').textContent=`${s.aircraft} · ${worldFor(s.world).name} · ${s.assist?'EASY WASD / AUTO-LEVEL':'MANUAL FLIGHT'}${s.autopilot?.enabled?' · AUTOPILOT HOLD':''}`;
  // Mirror the scene's context marker even when the render loop is throttled/dead (headless/QA).
  $('flightCanvas').dataset.world=worldFor(s.world).id;$('flightCanvas').dataset.aircraft=s.aircraftId;
  $('raceHUD').hidden=!s.race;
  if(s.race){const r=s.race;$('raceHUD').textContent=r.countdown>0?`START IN ${Math.ceil(r.countdown)}`:`RINGS ${r.next}/${r.gates.length} · TIME ${r.elapsed.toFixed(2)}s / ${r.limit}s${r.styleScore?` · STYLE ${r.styleScore}`:''}`;}
  $('mapDestination').disabled=Boolean(s.race);$('addWaypoint').disabled=Boolean(s.race);
  $('ias').textContent=f(kt(indicatedAirspeed(s)));$('alt').textContent=f(ft(s.y));$('hdg').textContent=String(Math.round((degrees(s.heading)+360)%360)).padStart(3,'0');$('vs').textContent=f(ft(s.vy)*60);$('rpm').textContent=f(s.systems.rpm);$('fuel').textContent=`${s.systems.fuel.toFixed(1)} L · ${f(s.systems.voltage)} V`;
  if($('gload'))$('gload').textContent=`${s.gLoad.toFixed(1)}G`;
  if($('aglHud'))$('aglHud').textContent=`${f(ft(agl))} FT AGL`;
  drawHudOverlay(s,nav);
  if(nextMessage){$('objective').textContent=nextMessage;nextMessage='';}
  $('warnings').textContent=s.warnings.join(' · ');
  $('objective').textContent=s.objective+(s.grounded&&!s.systems.engine?' — There is no engine power yet: open Aircraft systems, then toggle Battery, Ignition and Start engine, or leave the dispatch screen set to Engine running / runway.':'');
  $('navInfo').textContent=`${nav.target.name} · ${(nav.distance/1000).toFixed(1)} km · BRG ${f(nav.bearing)}° · course error ${f(nav.error)}° · AGL ${f(ft(agl))} ft`;
  $('controlInfo').textContent=`THR ${f(s.controls.throttle*100)}% · PITCH ${f(degrees(s.pitch))}° · BANK ${f(degrees(s.roll))}° · AoA ${degrees(s.alpha).toFixed(1)}° · RUDDER ${f(s.controls.rudder*100)}% · FLAPS ${f(s.controls.flaps*30)}° · TRIM ${f(s.controls.trim*100)}% · GEAR FIXED-DOWN · ${s.grounded?'ON GROUND — hold B to brake':'AIRBORNE'}`;
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
  const report=flightReport(state);let newBest=false;if(!reported){if(report.race?.outcome==='finished'){save.records||={};const key=`${state.aircraftId}/${report.race.course}`;if(!save.records[key]||report.race.seconds<save.records[key]){save.records[key]=report.race.seconds;newBest=true;}}save.logs.push(report);save.logs=save.logs.slice(-20);save.training=[...new Set([...save.training,...state.achievements])];persist();reported=true;}
  const result=state.touchdown;const content=$('reportContent');content.replaceChildren();
  if(report.race){const summary=document.createElement('p');summary.className='race-result';summary.textContent=report.race.outcome==='finished'?`RACE FINISHED · ${report.race.seconds.toFixed(2)}s${newBest?' · NEW PERSONAL BEST!':''}`:`RACE ${report.race.outcome?.toUpperCase()||'ENDED'} · ${report.race.checkpoints}/${report.race.total} rings · ${report.race.seconds.toFixed(2)}s`;content.appendChild(summary);}
  const aircraft=document.createElement('p');aircraft.textContent=state.aircraft;content.appendChild(aircraft);
  const grid=document.createElement('div');grid.className='report-grid';for(const[label,value]of[['Duration',`${(state.time/60).toFixed(1)} min`],['Distance',`${(state.distanceFlown/1000).toFixed(1)} km`],['Fuel',`${state.fuelUsed.toFixed(1)} L`],['Peak altitude',`${f(ft(state.peakAltitude))} ft`],['Landing score',result?`${result.score}/100`:'No touchdown'],['Descent at contact',result?`${result.verticalSpeed.toFixed(1)} m/s`:'—']]){const d=document.createElement('div'),strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=value;small.textContent=label;d.append(strong,small);grid.appendChild(d);}content.appendChild(grid);
  const p=document.createElement('p');p.className='muted';p.textContent=`${state.status.toUpperCase()} · ${report.suggestions.join(' ')}`;content.appendChild(p);drawMap($('reportMap'),true);
}
$('debriefToggle').onclick=showReport;$('pauseDebrief').onclick=showReport;
$('exportReport').onclick=()=>{const blob=new Blob([JSON.stringify(flightReport(state),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='skyforge-flight-report.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
function initAudio(){if(audio)return;const context=new AudioContext(),master=context.createGain(),engine=context.createGain(),env=context.createGain(),osc=context.createOscillator();master.connect(context.destination);engine.connect(master);env.connect(master);osc.type='sawtooth';osc.connect(engine);osc.start();
  const buffer=context.createBuffer(1,context.sampleRate*2,context.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;const noise=context.createBufferSource(),filter=context.createBiquadFilter();noise.buffer=buffer;noise.loop=true;filter.type='lowpass';filter.frequency.value=550;noise.connect(filter);filter.connect(env);noise.start();audio={context,master,engine,env,osc};}
function clickSound(){if(!audio||Number($('volume').value)===0)return;const osc=audio.context.createOscillator(),gain=audio.context.createGain();osc.frequency.value=700;gain.gain.value=Number($('interfaceVolume').value)*.08;osc.connect(gain);gain.connect(audio.master);osc.start();gain.gain.exponentialRampToValueAtTime(.0001,audio.context.currentTime+.05);osc.stop(audio.context.currentTime+.06);}
function refreshAudioToggle(){$('audioToggle').textContent=audio&&Number($('volume').value)>0?'Audio on':'Audio off';}
$('audioToggle').onclick=()=>{initAudio();audio.context.resume();$('volume').value=Number($('volume').value)>0?0:.35;persist();refreshAudioToggle();};
// Browsers block autoplay until user interaction; resume then, not on a timer.
['pointerdown','keydown'].forEach(type=>document.addEventListener(type,()=>{if(audio&&audio.context.state==='suspended')audio.context.resume();},{capture:true}));
function updateAudio(){if(!audio)return;const now=audio.context.currentTime;audio.master.gain.setTargetAtTime(Number($('volume').value),now,.05);audio.engine.gain.setTargetAtTime(state.systems.rpm/2700*Number($('engineVolume').value)*.025,now,.1);audio.osc.frequency.setTargetAtTime(25+state.systems.rpm/30,now,.1);audio.env.gain.setTargetAtTime((state.airspeed/100+state.weather.rain)*Number($('environmentVolume').value)*.035,now,.1);}
$('flightCanvas').addEventListener('webglcontextlost',e=>{e.preventDefault();paused=true;$('bootError').textContent='Graphics context lost. Flight paused; reload to recover. Preferences and completed logs are saved.';$('setup').hidden=false;});
let previous={};
// Background windows throttle requestAnimationFrame to zero, which previously froze
// the whole simulation (black canvas, HUD stuck at spawn). A wall-clock interval
// keeps physics and UI advancing even when the render loop never fires.
let fallbackLast=0;
const STEP_SIM=()=>{const now=Date.now(),elapsed=fallbackLast?Math.min(.1,(now-fallbackLast)/1000):0;fallbackLast=now;if(active&&!paused){accumulator+=elapsed;let steps=0;while(accumulator>=DT&&steps<12){previous={x:state.x,y:state.y,z:state.z,pitch:state.pitch,roll:state.roll,heading:state.heading};inputs(DT);stepFlight(state,DT);accumulator-=DT;steps++;}}if(active&&!paused)updateUI();};
setInterval(STEP_SIM,50);
function loop(time){const elapsed=lastTime?Math.min(.1,(time-lastTime)/1000):0;const raw=lastTime?time-lastTime:0;lastTime=time;
  if(raw>0){slowFrames+=raw>34?1:0;if(slowFrames>60)slowFrames=12;if(raw<=17)slowFrames=Math.max(0,slowFrames-2);}
  if(active&&!paused){accumulator+=elapsed;let steps=0;while(accumulator>=DT&&steps<12){previous={x:state.x,y:state.y,z:state.z,pitch:state.pitch,roll:state.roll,heading:state.heading};inputs(DT);stepFlight(state,DT);accumulator-=DT;steps++;}}
  if(visual){const freeInput=active&&!paused&&visual.mode==='free'?{x:Number(keys.has('KeyD'))-Number(keys.has('KeyA')),z:Number(keys.has('KeyW'))-Number(keys.has('KeyS')),y:Number(keys.has('KeyQ'))-Number(keys.has('KeyZ'))}:{};
    let renderState=state;if(active&&!paused&&previous.x!==undefined){const a=accumulator/DT;renderState={...state};for(const k of['x','y','z','pitch','roll','heading'])renderState[k]=previous[k]+(state[k]-previous[k])*a;}
    stats=visual.render(renderState,time/1000,freeInput);}
    if(active&&!paused&&raw>0){frames.push(raw);if(frames.length>300)frames.shift();
    if(slowFrames>=15&&qualityAdapted<2&&visual){qualityAdapted++;slowFrames=0;const current=$('quality');visual.renderer.setPixelRatio(qualityAdapted===2?Math.max(1,devicePixelRatio*.75):1);visual.renderer.shadowMap.enabled=qualityAdapted<2;current.value='low';current.selected=true;persist();showMessage(`Graphics auto-reduced for smoothness (level ${qualityAdapted}).`);}}
  if(time-lastUI>80){lastUI=time;updateUI();updateAudio();}
  requestAnimationFrame(loop);
}
try{visual=createScene($('flightCanvas'),save.settings.quality,applySystem);document.body.dataset.boot='ready';document.body.dataset.skyforge='surface';requestAnimationFrame(loop);
  // State-only automation surface; UI tests still use visible controls.
  window.__skyforge={getState:()=>structuredClone(state),performance:()=>({samples:frames.length,meanMs:frames.reduce((a,b)=>a+b,0)/Math.max(1,frames.length),p95Ms:[...frames].sort((a,b)=>a-b)[Math.floor(frames.length*.95)],...stats}),scene:()=>({meshes:visual.scene.children.length,webgl:visual.renderer.capabilities.isWebGL2,aircraftMeshes:visual.aircraft.children.length}),testAdvance:seconds=>{for(let i=0;i<seconds/DT;i++)stepFlight(state);updateUI();}};
}catch(error){document.body.dataset.boot='error';$('bootError').textContent=`Unable to initialize WebGL: ${error.message}. Enable hardware acceleration and use a modern desktop browser.`;$('launch').disabled=true;console.error(error);}
