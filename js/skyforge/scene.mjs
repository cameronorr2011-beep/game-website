import * as T from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { worldFor, worldProps } from './worlds.mjs';
import { AIRPORTS, aircraftFor, terrainHeight, radians, indicatedAirspeed } from './simulation.mjs';
const clampTexture = value => Math.max(0,Math.min(255,Math.round(value)));
const daylight = hour => Math.max(0,Math.sin((hour-6)/12*Math.PI));
const mat = (color, extra = {}) => new T.MeshStandardMaterial({ color, roughness: .65, ...extra });
export function createScene(canvas, quality = 'medium', onInteract = () => {}) {
  const renderer = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, quality === 'high' ? 1.75 : quality === 'low' ? 1 : 1.25));
  renderer.shadowMap.enabled = quality !== 'low'; renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping;
  const scene = new T.Scene(); scene.fog = new T.FogExp2(0xa7bcc6, .00008);
  const pmrem=new T.PMREMGenerator(renderer), room=new RoomEnvironment();
  const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=.45;
  room.dispose();pmrem.dispose();
  const camera = new T.PerspectiveCamera(64, 1, .08, 28000);
  const hemi = new T.HemisphereLight(0xbddfff, 0x38432a, 2); scene.add(hemi);
  const sun = new T.DirectionalLight(0xffedd2, 3); sun.castShadow = true;
  sun.shadow.mapSize.set(1024,1024); Object.assign(sun.shadow.camera, { left:-55,right:55,top:55,bottom:-55,near:1,far:350 }); sun.shadow.bias=-.0002; scene.add(sun,sun.target);
  const sky = new Sky(); sky.scale.setScalar(25000); scene.add(sky);
  const uniforms = sky.material.uniforms; uniforms.turbidity.value=4; uniforms.rayleigh.value=1.6; uniforms.mieCoefficient.value=.006; uniforms.mieDirectionalG.value=.8;
  const waterMaterial = new T.ShaderMaterial({ uniforms:{ time:{value:0},color:{value:new T.Color(0x14728a)},light:{value:1} }, vertexShader:`uniform float time; varying vec3 wp; varying float wave; void main(){vec3 p=position;p.z+=sin(p.x*.009+time)*.65+cos(p.y*.006+time*.7)*.5;wave=p.z;wp=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`, fragmentShader:`uniform vec3 color;uniform float light;varying vec3 wp;varying float wave;void main(){float glint=pow(max(0.,sin(wp.x*.01+wp.y*.015)),25.);gl_FragColor=vec4((color*(.75+wave*.06)+vec3(glint*.18))*light,1.);}` });
  const ocean = new T.Mesh(new T.PlaneGeometry(70000,70000,150,150),waterMaterial); ocean.rotation.x=-Math.PI/2; scene.add(ocean);
  const terrainCanvas=document.createElement('canvas');terrainCanvas.width=256;terrainCanvas.height=256;
  const terrainCtx=terrainCanvas.getContext('2d'),terrainPixels=terrainCtx.createImageData(256,256);
  for(let i=0;i<256*256;i++){const x=i%256,y=Math.floor(i/256),noise=(Math.sin(x*12.9898+y*78.233)*43758.5453)%1;
    const value=clampTexture(165+noise*38+12*Math.sin(x*.16)*Math.cos(y*.11));terrainPixels.data.set([value,value,value,255],i*4);}
  terrainCtx.putImageData(terrainPixels,0,0);const terrainTexture=new T.CanvasTexture(terrainCanvas);terrainTexture.wrapS=terrainTexture.wrapT=T.RepeatWrapping;terrainTexture.repeat.set(60,60);terrainTexture.colorSpace=T.SRGBColorSpace;
  const terrainMaterial = new T.MeshStandardMaterial({ vertexColors:true,roughness:1,map:terrainTexture,bumpMap:terrainTexture,bumpScale:.4 });
  let currentWorld='beach';
  const chunks=new Map(), chunkSize=2000, radius=quality==='low'?2:3;
  const treeMat=mat(0x294f37), trunkMat=mat(0x72533a), buildingMat=mat(0xabb2ae);
  const neonMat=new T.MeshBasicMaterial({color:0xff4edf}),roadMat=mat(0x272c38);
  const treeGeo=new T.ConeGeometry(6,24,5), buildingGeo=new T.BoxGeometry(1,1,1);
  function chunk(cx,cz) {
    const key=`${cx},${cz}`; if(chunks.has(key))return;
    const distance=Math.max(Math.abs(cx-Math.floor(lastX/chunkSize)),Math.abs(cz-Math.floor(lastZ/chunkSize)));
    const n=distance<=1?32:16;
    const geo=new T.PlaneGeometry(chunkSize,chunkSize,n,n); geo.rotateX(-Math.PI/2);
    const p=geo.attributes.position, colors=new Float32Array(p.count*3), color=new T.Color();
    for(let i=0;i<p.count;i++){const x=p.getX(i)+cx*chunkSize+chunkSize/2,z=p.getZ(i)+cz*chunkSize+chunkSize/2,h=terrainHeight(x,z,currentWorld);p.setY(i,h);
      color.set(h<4?worldFor(currentWorld).sand:worldFor(currentWorld).ground);color.multiplyScalar(.88+.12*Math.sin(x*.01)*Math.sin(z*.009));color.toArray(colors,i*3);}
    geo.setAttribute('color',new T.BufferAttribute(colors,3));geo.computeVertexNormals();
    const group=new T.Group();const mesh=new T.Mesh(geo,terrainMaterial);mesh.receiveShadow=true;group.add(mesh);group.position.set(cx*chunkSize+chunkSize/2,0,cz*chunkSize+chunkSize/2);
    const props=worldProps(cx,cz,currentWorld,terrainHeight,AIRPORTS),dummy=new T.Object3D();
    const buildings=props.filter(p=>p.type==='building'),palms=props.filter(p=>p.type==='palm');
    if(buildings.length){const towers=new T.InstancedMesh(buildingGeo,buildingMat,buildings.length),bands=new T.InstancedMesh(buildingGeo,neonMat,buildings.length*3);
      buildings.forEach((p,i)=>{dummy.position.set(p.x-group.position.x,p.y+p.height/2,p.z-group.position.z);dummy.rotation.set(0,0,0);dummy.scale.set(p.width,p.height,p.depth);dummy.updateMatrix();towers.setMatrixAt(i,dummy.matrix);
        for(let j=0;j<3;j++){dummy.position.y=p.y+p.height*(.25+j*.3);dummy.scale.set(p.width+1,2,p.depth+1);dummy.updateMatrix();bands.setMatrixAt(i*3+j,dummy.matrix);}});
      group.add(towers);if(currentWorld==='cyberpunk')group.add(bands);else bands.dispose();
      const streets=new T.InstancedMesh(buildingGeo,roadMat,16);for(let i=0;i<16;i++){const horizontal=i<8;dummy.position.set(horizontal?0:-860+(i-8)*235,terrainHeight(group.position.x,group.position.z,currentWorld)+.4,horizontal?-860+i*235:0);dummy.scale.set(horizontal?2000:16,.6,horizontal?16:2000);dummy.updateMatrix();streets.setMatrixAt(i,dummy.matrix);}group.add(streets);
    }
    if(palms.length){const trunks=new T.InstancedMesh(buildingGeo,trunkMat,palms.length),crowns=new T.InstancedMesh(treeGeo,treeMat,palms.length);
      palms.forEach((p,i)=>{dummy.position.set(p.x-group.position.x,p.y+p.height/2,p.z-group.position.z);dummy.rotation.set(0,0,0);dummy.scale.set(1.4,p.height,1.4);dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);dummy.position.y=p.y+p.height;dummy.scale.set(1.8,.25,1.8);dummy.updateMatrix();crowns.setMatrixAt(i,dummy.matrix);});group.add(trunks,crowns);
    }
    scene.add(group);chunks.set(key,{group,geo});
  }
  let lastX=0,lastZ=0,lastChunk='';
  function stream(x,z){lastX=x;lastZ=z;const cx=Math.floor(x/chunkSize),cz=Math.floor(z/chunkSize),key=`${cx},${cz}`;if(key===lastChunk)return;lastChunk=key;
    for(const[k,c]of chunks){const[a,b]=k.split(',').map(Number);if(Math.abs(a-cx)>radius||Math.abs(b-cz)>radius){scene.remove(c.group);c.geo.dispose();c.group.traverse(object=>{if(object.isInstancedMesh)object.dispose();});chunks.delete(k);}}
    for(let dx=-radius;dx<=radius;dx++)for(let dz=-radius;dz<=radius;dz++)chunk(cx+dx,cz+dz);
  }
  function mesh(parent,geometry,material,x=0,y=0,z=0){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
  const asphalt=mat(0x303638),lineMat=mat(0xece8d6),hangarMat=mat(0x889caa),lights=[];
  for(const a of AIRPORTS){const g=new T.Group();g.position.set(a.x,a.elevation+.08,a.z);g.rotation.y=a.heading;scene.add(g);
    mesh(g,new T.BoxGeometry(a.width,.12,a.length),asphalt);mesh(g,new T.BoxGeometry(14,.1,a.length*.65),asphalt,85,0,0);mesh(g,new T.BoxGeometry(110,.1,180),asphalt,70,0,-a.length*.25);
    for(let z=-a.length/2+35;z<a.length/2;z+=60)mesh(g,new T.BoxGeometry(1.2,.03,25),lineMat,0,.08,z);
    for(const end of[-1,1])for(let i=-3;i<=3;i++)mesh(g,new T.BoxGeometry(2,.03,32),lineMat,i*4,.1,end*(a.length/2-30));
    for(let i=0;i<4;i++)mesh(g,new T.BoxGeometry(45,19,42),hangarMat,155,9.5,-a.length*.25+i*65);
    mesh(g,new T.BoxGeometry(26,33,24),hangarMat,190,16.5,100);
    const pole=mesh(g,new T.CylinderGeometry(.3,.3,12,8),lineMat,55,6,a.length/2-90);
    const sock=mesh(g,new T.ConeGeometry(1.5,7,10,1,true),mat(0xff793d),55,11,a.length/2-90);sock.rotation.z=Math.PI/2;lights.push({sock,pole});
    const lampMat=new T.MeshBasicMaterial({color:0xffdb8b});for(let z=-a.length/2;z<a.length/2;z+=80)for(const side of[-1,1])mesh(g,new T.SphereGeometry(.7,6,4),lampMat,side*(a.width/2+2),.5,z);
    for(let i=0;i<5;i++)mesh(g,new T.BoxGeometry(22,.08,1),lampMat,0,.2,-a.length/2-30-i*35);
    const labelCanvas=document.createElement('canvas');labelCanvas.width=512;labelCanvas.height=96;const ctx=labelCanvas.getContext('2d');ctx.fillStyle='#def5ff';ctx.font='bold 38px sans-serif';ctx.fillText(`${a.id} · ${a.name}`,8,62);const tex=new T.CanvasTexture(labelCanvas);const label=new T.Sprite(new T.SpriteMaterial({map:tex,transparent:true,depthTest:false}));label.position.set(0,80,0);label.scale.set(230,43,1);g.add(label);
  }
  // Merge static airport geometry by material to reduce individual draw calls.
  scene.updateMatrixWorld(true);
  for(const group of scene.children.filter(object=>object.isGroup)){
    const batches=new Map();group.traverse(object=>{if(object.isMesh){const list=batches.get(object.material)||[];list.push(object);batches.set(object.material,list);}});
    for(const[material,objects]of batches){if(objects.length<3)continue;const geometries=objects.map(object=>{const geometry=object.geometry.clone();geometry.applyMatrix4(object.matrix);return geometry;});
      const merged=mergeGeometries(geometries);geometries.forEach(geometry=>geometry.dispose());if(!merged)continue;
      objects.forEach(object=>{group.remove(object);object.geometry.dispose();});const combined=mesh(group,merged,material);combined.castShadow=false;}
  }
  const aircraft=new T.Group();scene.add(aircraft);
  const white=new T.MeshPhysicalMaterial({color:0xe8e5d8,metalness:.18,roughness:.3,clearcoat:.7,clearcoatRoughness:.2}),dark=mat(0x39454c,{roughness:.8}),red=mat(0xc75535),rubber=mat(0x151b1e),glass=mat(0x9bd6e3,{transparent:true,opacity:.14,metalness:.25,roughness:.12,depthWrite:false});
  const nose=mesh(aircraft,new T.CylinderGeometry(.55,.7,2.2,20),white,0,.8,2.2);nose.rotation.x=Math.PI/2;
  const tail=mesh(aircraft,new T.CylinderGeometry(.7,.2,3.3,20),white,0,1,-2.35);tail.rotation.x=Math.PI/2;
  mesh(aircraft,new T.BoxGeometry(1.65,.24,2),white,0,.45,.1);
  mesh(aircraft,new T.BoxGeometry(1.65,1.35,2),glass,0,1.7,.1);
  function airfoil(span,chord){const shape=new T.Shape();shape.moveTo(-chord*.5,0);shape.bezierCurveTo(-chord*.55,.08,-chord*.2,.16,chord*.5,.015);shape.bezierCurveTo(chord*.1,-.035,-chord*.35,-.045,-chord*.5,0);const geometry=new T.ExtrudeGeometry(shape,{depth:span,steps:1,bevelEnabled:false,curveSegments:16});geometry.translate(0,0,-span/2);geometry.rotateY(Math.PI/2);geometry.computeVertexNormals();return geometry;}
  const wing=mesh(aircraft,airfoil(10.8,1.55),white,0,2.55,-.25),wingTips=[],wingStruts=[];
  for(const side of[-1,1]){wingTips.push(mesh(aircraft,new T.BoxGeometry(.04,.22,1.6),red,side*5.35,2.5,-.25));mesh(aircraft,new T.BoxGeometry(.025,.15,4),red,side*.73,.9,-.8);}
  const rivets=new T.InstancedMesh(new T.SphereGeometry(.012,5,4),mat(0x98a4a9,{metalness:.8,roughness:.25}),80),rivetObject=new T.Object3D();
  for(let i=0;i<80;i++){rivetObject.position.set((i%2?1:-1)*.72,.57+(Math.floor(i/2)%2)*.5,-2.6+Math.floor(i/4)*.24);rivetObject.updateMatrix();rivets.setMatrixAt(i,rivetObject.matrix);}aircraft.add(rivets);
  mesh(aircraft,new T.BoxGeometry(4,.12,1.15),white,0,1,-3.1);
  mesh(aircraft,new T.BoxGeometry(.14,1.7,1.25),white,0,1.7,-3.2);
  const ailerons=[],flapMeshes=[];
  for(const side of[-1,1]){const strut=mesh(aircraft,new T.BoxGeometry(.08,.08,3),dark,side*1.8,1.65,-.1);strut.rotation.z=side*.9;wingStruts.push(strut);
    const aileron=mesh(aircraft,new T.BoxGeometry(2.3,.1,.35),red,side*4.1,2.53,-1.15);ailerons.push(aileron);
    const flap=mesh(aircraft,new T.BoxGeometry(2.1,.1,.4),white,side*1.65,2.53,-1.18);flapMeshes.push(flap);
    mesh(aircraft,new T.BoxGeometry(.05,1.4,.06),dark,side*.84,1.55,.92).rotation.z=side*.08;
    mesh(aircraft,new T.BoxGeometry(.05,1.4,.06),dark,side*.84,1.55,-.88);
    mesh(aircraft,new T.BoxGeometry(.05,.05,1.8),dark,side*.85,2.2,0);
    const wheel=mesh(aircraft,new T.CylinderGeometry(.29,.29,.22,16),rubber,side*1.1,-.7,-.65);wheel.rotation.z=Math.PI/2;
    mesh(aircraft,new T.BoxGeometry(.1,.85,.12),white,side*.9,-.25,-.65).rotation.z=side*.4;
    mesh(aircraft,new T.BoxGeometry(.54,.09,.44),dark,side*.43,.03,.42);
    mesh(aircraft,new T.BoxGeometry(.56,.65,.14),dark,side*.43,.4,-.08).rotation.x=-.13;
  }
  const noseWheel=mesh(aircraft,new T.CylinderGeometry(.23,.23,.18,16),rubber,0,-.8,2);noseWheel.rotation.z=Math.PI/2;mesh(aircraft,new T.CylinderGeometry(.05,.05,.9),dark,0,-.35,2);
  const elevator=mesh(aircraft,new T.BoxGeometry(3.7,.1,.35),red,0,1,-3.7);const rudder=mesh(aircraft,new T.BoxGeometry(.12,1.5,.35),red,0,1.7,-3.83);
  const prop=new T.Group();prop.position.set(0,1,3.37);aircraft.add(prop);mesh(prop,new T.BoxGeometry(.15,2.4,.08),dark);mesh(prop,new T.SphereGeometry(.22,12,8),white,0,0,.1);
  mesh(aircraft,new T.BoxGeometry(1.62,.74,.16),dark,0,1.15,1.04);
  mesh(aircraft,new T.BoxGeometry(1.65,.12,.7),dark,0,1.55,1.25);
  const cockpitFill=new T.PointLight(0xd5e6f5,7,4,2);cockpitFill.position.set(0,1.75,-.4);aircraft.add(cockpitFill);
  const propBlur=mesh(prop,new T.CircleGeometry(1.2,40),new T.MeshBasicMaterial({color:0x697580,transparent:true,opacity:.1,side:T.DoubleSide,depthWrite:false}),0,0,.04);
  const yoke=mesh(aircraft,new T.TorusGeometry(.2,.027,8,16,Math.PI*1.5),dark,-.43,1.02,.68);yoke.rotation.z=Math.PI*.25;
  mesh(aircraft,new T.CylinderGeometry(.028,.028,.38,8),dark,-.43,1.02,.86).rotation.x=Math.PI/2;
  const clickable=[],gauges=[],gaugeFaces=[];
  const gaugeLabels=['IAS','ATT','ALT','TURN','HDG','V/S'];
  for(let i=0;i<6;i++){const x=-.65+(i%3)*.24,y=1.32-Math.floor(i/3)*.25;
    mesh(aircraft,new T.CylinderGeometry(.106,.106,.035,24),rubber,x,y,.935).rotation.x=Math.PI/2;
    const faceCanvas=document.createElement('canvas');faceCanvas.width=256;faceCanvas.height=256;const faceTexture=new T.CanvasTexture(faceCanvas);
    const face=mesh(aircraft,new T.CircleGeometry(.089,24),new T.MeshBasicMaterial({map:faceTexture}),x,y,.914);face.rotation.y=Math.PI;
    gaugeFaces.push({canvas:faceCanvas,texture:faceTexture});
    const needle=mesh(aircraft,new T.BoxGeometry(.007,.069,.003),new T.MeshBasicMaterial({color:0xeeeecc}),x,y+.025,.908);
    const pivot=new T.Group();pivot.position.set(x,y,.904);aircraft.add(pivot);needle.position.set(0,.027,0);pivot.add(needle);gauges.push(pivot);
    for(let j=0;j<12;j++){const angle=j*Math.PI/6;const tick=mesh(aircraft,new T.BoxGeometry(.005,.012,.002),lineMat,x+Math.sin(angle)*.076,y+Math.cos(angle)*.076,.907);tick.rotation.z=-angle;}
  }
  const displayCanvas=document.createElement('canvas');displayCanvas.width=512;displayCanvas.height=512;const displayCtx=displayCanvas.getContext('2d');const displayTexture=new T.CanvasTexture(displayCanvas);
  const gps=mesh(aircraft,new T.PlaneGeometry(.54,.48),new T.MeshBasicMaterial({map:displayTexture}),.36,1.22,.912);gps.rotation.y=Math.PI;
  for(const[id,x,color]of[['battery',-.64,0x74c8e8],['ignition',-.4,0xb5c981],['starter',-.16,0xe0aa62],['landingLights',.1,0xeeeead],['panelLights',.34,0xe6a479]]){
    const button=mesh(aircraft,new T.BoxGeometry(.12,.065,.055),mat(color),x,.85,.899);button.userData.control=id;clickable.push(button);
  }
  const throttleLever=mesh(aircraft,new T.SphereGeometry(.055,10,8),dark,.58,.85,.85);throttleLever.userData.control='throttle';clickable.push(throttleLever);
  const mixtureLever=mesh(aircraft,new T.SphereGeometry(.055,10,8),red,.72,.85,.85);mixtureLever.userData.control='mixture';clickable.push(mixtureLever);
  const pointLight=new T.PointLight(0xffb66d,0,5);pointLight.position.set(0,1.9,.5);aircraft.add(pointLight);
  const landingLight=new T.SpotLight(0xffe8b6,0,300,.28,.6);landingLight.position.set(0,.3,2.8);landingLight.target.position.set(0,-1,70);aircraft.add(landingLight,landingLight.target);
  const beacon=mesh(aircraft,new T.SphereGeometry(.07,8,6),new T.MeshBasicMaterial({color:0xff3322}),0,2.65,-3.2);
  const strobes=[];for(const side of[-1,1])strobes.push(mesh(aircraft,new T.SphereGeometry(.09,8,6),new T.MeshBasicMaterial({color:0xffffff}),side*5.45,2.55,0));
  const navLights=[];for(const[x,color]of[[-5.4,0xff3030],[5.4,0x36ff75],[0,0xffffff]]){const light=mesh(aircraft,new T.SphereGeometry(.075,8,6),new T.MeshBasicMaterial({color}),x,2.58,x?-.3:-3.3);navLights.push(light);}
  const cloudMat=new T.MeshLambertMaterial({color:0xf0f0eb,transparent:true,opacity:.7,depthWrite:false});const clouds=new T.InstancedMesh(new T.SphereGeometry(1,8,5),cloudMat,90);scene.add(clouds);
  const dummy=new T.Object3D();
  const rainGeo=new T.BufferGeometry();const rainPositions=new Float32Array(1200*3);for(let i=0;i<1200;i++){rainPositions[i*3]=(i*71%200)-100;rainPositions[i*3+1]=(i*37%150);rainPositions[i*3+2]=(i*47%200)-100;}rainGeo.setAttribute('position',new T.BufferAttribute(rainPositions,3));const rain=new T.Points(rainGeo,new T.PointsMaterial({color:0xaac8dd,size:.2,transparent:true,opacity:.65}));scene.add(rain);
  let mode='cockpit',lookYaw=0,lookPitch=0,zoom=64,orbit=0,freePosition=new T.Vector3(0,100,0),lastDisplay=0,lastRenderTime=0;
  const raycaster=new T.Raycaster();canvas.addEventListener('click',e=>{if(mode!=='cockpit')return;const rect=canvas.getBoundingClientRect();raycaster.setFromCamera(new T.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);const hit=raycaster.intersectObjects(clickable)[0];if(hit)onInteract(hit.object.userData.control);});
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  canvas.addEventListener('pointermove',e=>{if(e.buttons===2){lookYaw-=e.movementX*.003;lookPitch=Math.max(-1,Math.min(.75,lookPitch-e.movementY*.003));orbit+=e.movementX*.003;}});
  canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(35,Math.min(90,zoom+e.deltaY*.025));},{passive:false});
  function setCamera(next){mode=next;lookYaw=0;lookPitch=0;if(next==='free')freePosition.copy(camera.position);}
  function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
  window.addEventListener('resize',resize);resize();
  const raceGroup=new T.Group();scene.add(raceGroup);
  const ringGeometry=new T.TorusGeometry(90,2,6,48),ringMaterials=[new T.MeshBasicMaterial({color:0xebbf78}),new T.MeshBasicMaterial({color:0x8de1e6})];
  let displayedGates=null,displayedPlane=null;
  function updateAircraftAndRace(s){
    if(s.aircraftId!==displayedPlane){displayedPlane=s.aircraftId;const plane=aircraftFor(s.aircraftId),ratio=plane.span/11;red.color.setHex(plane.color);wing.scale.x=ratio;wing.position.y=plane.wingHeight;
      wingTips.forEach((tip,i)=>{tip.position.x=(i?1:-1)*5.35*ratio;tip.position.y=plane.wingHeight-.05;});
      ailerons.forEach((part,i)=>{part.position.x=(i?1:-1)*4.1*ratio;part.position.y=plane.wingHeight-.02;});flapMeshes.forEach(part=>part.position.y=plane.wingHeight-.02);
      wingStruts.forEach(part=>part.visible=plane.wingHeight>2);strobes.forEach((part,i)=>{part.position.x=(i?1:-1)*5.45*ratio;part.position.y=plane.wingHeight;});navLights.forEach((part,i)=>{if(i<2){part.position.x=(i?1:-1)*5.4*ratio;part.position.y=plane.wingHeight;}});
    }
    if(displayedGates!==s.race?.gates){displayedGates=s.race?.gates;raceGroup.clear();
      for(const gate of displayedGates||[]){const ring=new T.Mesh(ringGeometry,ringMaterials[1]);ring.position.set(gate.x,gate.y,gate.z);ring.rotation.y=gate.heading;raceGroup.add(ring);}
    }
    raceGroup.children.forEach((ring,i)=>{ring.visible=i>=s.race.next;ring.material=ringMaterials[i===s.race.next?0:1];});
  }
  const position=new T.Vector3(),bodyQ=new T.Quaternion(),local=new T.Vector3(),target=new T.Vector3();
  function render(s,realTime,freeInput={}) {
    const renderDt=Math.min(.1,lastRenderTime?realTime-lastRenderTime:1/60);lastRenderTime=realTime;
    const world=worldFor(s.world);
    if(currentWorld!==world.id){currentWorld=world.id;for(const c of chunks.values()){scene.remove(c.group);c.geo.dispose();c.group.traverse(o=>{if(o.isInstancedMesh)o.dispose();});}chunks.clear();lastChunk='';}
    canvas.dataset.world=currentWorld;canvas.dataset.aircraft=s.aircraftId;
    buildingMat.color.setHex(world.building);waterMaterial.uniforms.color.value.setHex(world.water);neonMat.color.setHex(world.accent);
    updateAircraftAndRace(s);
    stream(s.x,s.z);position.set(s.x,s.y,s.z);aircraft.position.copy(position);
    aircraft.rotation.set(-s.pitch,s.heading,-s.roll,'YXZ');bodyQ.copy(aircraft.quaternion);
    prop.rotation.z+=s.systems.rpm/60*Math.PI*2*renderDt;ailerons.forEach((a,i)=>a.rotation.x=(i?1:-1)*s.controls.aileron*.35);flapMeshes.forEach(a=>a.rotation.x=s.controls.flaps*.5);elevator.rotation.x=-s.controls.elevator*.35;rudder.rotation.y=s.controls.rudder*.35;yoke.rotation.z=Math.PI*.25-s.controls.aileron*.5;yoke.position.z=.68-s.controls.elevator*.07;
    beacon.visible=s.systems.voltage>20&&s.systems.beacon&&Math.sin(realTime*5)>0;strobes.forEach(l=>l.visible=s.systems.voltage>20&&s.systems.strobe&&realTime%1<.12);
    propBlur.visible=s.systems.rpm>1000;
    cockpitFill.intensity=daylight(s.hour)*7+.15;
    pointLight.intensity=s.systems.voltage>20&&s.systems.panelLights?3:0;landingLight.intensity=s.systems.voltage>20&&s.systems.landingLights?500:0;navLights.forEach(l=>l.visible=s.systems.voltage>20&&s.systems.navLights);
    const elevation=Math.sin((s.hour-6)/12*Math.PI),day=Math.max(.025,elevation);const sunDirection=new T.Vector3(.35,elevation,.5).normalize();uniforms.sunPosition.value.copy(sunDirection);sky.visible=day>.05;
    scene.background=new T.Color().setRGB(.025+day*.16,.035+day*.3,.07+day*.48);hemi.intensity=(world.id==='cyberpunk'?.8:.15)+day*1.9;sun.intensity=day*3;sun.position.copy(position).addScaledVector(sunDirection,180);sun.target.position.copy(position);
    const fogColor=new T.Color().setRGB(.035+day*.6,.05+day*.65,.075+day*.66);fogColor.lerp(new T.Color(world.fog),world.id==='cyberpunk'?.7:.35);scene.fog.color.copy(fogColor);scene.fog.density=2.2/s.weather.visibility;renderer.setClearColor(fogColor);waterMaterial.uniforms.time.value=realTime;waterMaterial.uniforms.light.value=.12+day;
    ocean.position.set(s.x,0,s.z);
    cloudMat.opacity=.25+s.weather.cloud*.6;cloudMat.color.setScalar(.15+day*.85);
    for(let i=0;i<90;i++){dummy.position.set(s.x+((i*1747+realTime*9)%15000)-7500,1200+(i%4)*230,s.z+((i*2377)%15000)-7500);dummy.scale.set(130+(i%5)*35,45+(i%4)*18,90+(i%7)*25);dummy.updateMatrix();clouds.setMatrixAt(i,dummy.matrix);}clouds.instanceMatrix.needsUpdate=true;clouds.count=Math.floor(s.weather.cloud*90);
    rain.visible=s.weather.rain>0;rain.position.copy(position);if(rain.visible){for(let i=0;i<1200;i++)rainPositions[i*3+1]=(i*37%150-realTime*45%150+150)%150-30;rainGeo.attributes.position.needsUpdate=true;}
    lights.forEach(({sock})=>sock.rotation.y=radians(s.weather.direction));
    if(mode==='cockpit'){local.set(-.43,1.65,-.2).applyQuaternion(bodyQ);camera.position.copy(position).add(local);camera.quaternion.copy(bodyQ).multiply(new T.Quaternion().setFromEuler(new T.Euler(lookPitch,Math.PI+lookYaw,0,'YXZ')));}
    else if(mode==='chase'){local.set(Math.sin(orbit)*13,5,-Math.cos(orbit)*15).applyQuaternion(bodyQ);target.copy(position).add(local);camera.position.lerp(target,1-Math.exp(-renderDt*8));camera.lookAt(position.clone().add(new T.Vector3(0,1,0)));}
    else {freePosition.x+=(freeInput.x||0)*120*renderDt;freePosition.y+=(freeInput.y||0)*120*renderDt;freePosition.z+=(freeInput.z||0)*120*renderDt;camera.position.copy(freePosition);camera.rotation.set(lookPitch,lookYaw+Math.PI,0,'YXZ');}
    camera.fov=zoom;camera.updateProjectionMatrix();
    const power=s.systems.voltage>20;gauges[0].rotation.z=power?-indicatedAirspeed(s)/80*Math.PI*1.7:0;gauges[1].rotation.z=power?s.roll:0;gauges[2].rotation.z=power?-s.y/304.8*Math.PI*2:0;gauges[3].rotation.z=power?-s.r*4:0;gauges[4].rotation.z=power?s.heading:0;gauges[5].rotation.z=power?-s.vy/10*Math.PI*.8:0;
    if(realTime-lastDisplay>.2){lastDisplay=realTime;
      const values=[`${Math.round(indicatedAirspeed(s)*1.94384)} KT`,`${Math.round(s.pitch*180/Math.PI)} DEG`,`${Math.round(s.y*3.28084)} FT`,`${(s.r*180/Math.PI).toFixed(1)} DEG/S`,`${Math.round((s.heading*180/Math.PI+360)%360)} DEG`,`${Math.round(s.vy*196.85)} FPM`];
      gaugeFaces.forEach(({canvas,texture},i)=>{const ctx=canvas.getContext('2d');ctx.fillStyle='#101c23';ctx.fillRect(0,0,256,256);
        if(power&&i===1){ctx.save();ctx.translate(128,128);ctx.rotate(s.roll);ctx.translate(0,s.pitch*150);ctx.fillStyle='#5b92ad';ctx.fillRect(-220,-350,440,350);ctx.fillStyle='#8b6b45';ctx.fillRect(-220,0,440,350);ctx.strokeStyle='#f6e5af';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-180,0);ctx.lineTo(180,0);ctx.stroke();ctx.restore();}
        ctx.fillStyle=power?'#cde1d8':'#34464e';ctx.textAlign='center';ctx.font='bold 26px monospace';ctx.fillText(gaugeLabels[i],128,75);ctx.font='22px monospace';ctx.fillText(power?values[i]:'OFF',128,195);texture.needsUpdate=true;});
      displayCtx.fillStyle=power?'#081c22':'#040506';displayCtx.fillRect(0,0,512,512);
      if(power){displayCtx.strokeStyle='#2a4e58';for(let i=0;i<512;i+=64){displayCtx.beginPath();displayCtx.moveTo(i,0);displayCtx.lineTo(i,512);displayCtx.moveTo(0,i);displayCtx.lineTo(512,i);displayCtx.stroke();}
        const scale=.017;for(const a of AIRPORTS){const x=256+(a.x-s.x)*scale,y=260-(a.z-s.z)*scale;displayCtx.fillStyle='#69d7dd';displayCtx.fillRect(x-4,y-4,8,8);displayCtx.font='20px monospace';displayCtx.fillText(a.id,x+8,y);}
        displayCtx.strokeStyle='#ffd487';displayCtx.beginPath();displayCtx.moveTo(256,260);for(const p of s.route)displayCtx.lineTo(256+(p.x-s.x)*scale,260-(p.z-s.z)*scale);displayCtx.stroke();
        displayCtx.save();displayCtx.translate(256,260);displayCtx.rotate(s.heading);displayCtx.fillStyle='#ffffff';displayCtx.beginPath();displayCtx.moveTo(0,-16);displayCtx.lineTo(-9,12);displayCtx.lineTo(9,12);displayCtx.fill();displayCtx.restore();
        displayCtx.fillStyle='#b8e5dc';displayCtx.font='22px monospace';displayCtx.fillText(`RPM ${Math.round(s.systems.rpm)} FUEL ${s.systems.fuel.toFixed(1)}L`,12,34);displayCtx.fillText(`OIL ${Math.round(s.systems.oilPressure)}psi ${Math.round(s.systems.oilTemp)}C`,12,470);displayCtx.fillText('COM 122.80 · NAV 110.50 (fictional)',12,500);}
      displayTexture.needsUpdate=true;}
    renderer.render(scene,camera);
    return { drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,chunks:chunks.size,camera:mode };
  }
  return {render,setCamera,resize,renderer,camera,scene,aircraft,get mode(){return mode;}};
}
