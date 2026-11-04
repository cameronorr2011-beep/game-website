// Anatomical point cloud: every imported record is one GPU point. No sampling.
// All 15M+ pairs stay on the server; class links account for every pair. A selected
// neuron's displayed lines are explicitly paged and never mistaken for all edges.
export const PALETTE = [
  '#8fa9ea', '#70d4bc', '#e6b873', '#b797e6', '#d48fad',
  '#e88584', '#9ec9c2', '#a2c878', '#e4a979', '#bdc8d0',
  '#85ace2', '#bb9a78', '#90ccb5', '#eacb87', '#b7a5d9', '#bdc8d0'
];

const VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 a_pos;
layout(location=1) in float a_class;
layout(location=2) in float a_mask;
uniform vec3 u_center;
uniform float u_scale;
uniform float u_aspect;
uniform vec2 u_pan;
uniform float u_zoom;
uniform vec2 u_angles;
uniform int u_plane;
uniform int u_filter_class;
uniform float u_size;
uniform vec3 u_palette[16];
out vec4 v_color;
void main(){
  vec3 p=(a_pos-u_center)*u_scale;
  if(u_plane==1) p=p.xzy;
  else if(u_plane==2) p=p.yzx;
  float c=cos(u_angles.x), s=sin(u_angles.x);
  float x=c*p.x-s*p.y, y=s*p.x+c*p.y;
  float cp=cos(u_angles.y), sp=sin(u_angles.y);
  float yy=cp*y-sp*p.z, zz=sp*y+cp*p.z;
  gl_Position=vec4((vec2(x/u_aspect, yy)+u_pan)*u_zoom, clamp(zz*.025,-.9,.9), 1.0);
  bool visible=a_mask>.5 && (u_filter_class<0 || int(a_class+.5)==u_filter_class);
  int type=clamp(int(a_class+.5),0,15);
  v_color=vec4(u_palette[type], visible?.76:.045);
  gl_PointSize=u_size*(visible?1.0:.8);
  if(!all(equal(a_pos,a_pos))){gl_Position=vec4(4.,4.,4.,1.);}
}`;
const FRAG = `#version 300 es
precision highp float;
in vec4 v_color;
out vec4 fragColor;
void main(){
  vec2 p=gl_PointCoord*2.0-1.0;
  float r=dot(p,p);
  if(r>1.) discard;
  fragColor=vec4(v_color.rgb,v_color.a*smoothstep(1.,.35,r));
}`;

function program(gl, vertex, fragment){
  const compile=(type,src)=>{
    const shader=gl.createShader(type);gl.shaderSource(shader,src);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));
    return shader;
  };
  const p=gl.createProgram();gl.attachShader(p,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(p,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));
  return p;
}
function colorHex(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)}
const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));

export class ConnectomeGraph {
  constructor(canvas,overlay,stage,{onSelect,onError}){
    this.canvas=canvas;this.overlay=overlay;this.stage=stage;this.onSelect=onSelect;this.onError=onError;
    this.gl=canvas.getContext('webgl2',{alpha:true,antialias:false,premultipliedAlpha:false});
    if(!this.gl)throw Error('WebGL 2 is unavailable. Use search and tabular inspection instead.');
    this.ctx=overlay.getContext('2d');
    const gl=this.gl;
    this.shader=program(gl,VERT,FRAG);
    this.uniform={};
    for(const key of ['center','scale','aspect','pan','zoom','angles','plane','filter_class','size','palette'])this.uniform[key]=gl.getUniformLocation(this.shader,'u_'+key);
    this.buffer=gl.createBuffer();this.vao=gl.createVertexArray();gl.bindVertexArray(this.vao);gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);
    gl.vertexAttribPointer(0,3,gl.FLOAT,false,20,0);gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(1,1,gl.FLOAT,false,20,12);gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(2,1,gl.FLOAT,false,20,16);gl.enableVertexAttribArray(2);
    gl.bindVertexArray(null);
    gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    this.camera={zoom:1,targetZoom:1,panX:0,panY:0,targetPanX:0,targetPanY:0,yaw:0,pitch:0,targetYaw:0,targetPitch:0};
    this.plane=0;this.size=2.5;this.filterClass=-1;this.showLinks=true;this.classLinks=[];this.centres=[];this.selected=null;this.connections=[];this.path=[];
    this.ids=[];this.indices=new Map();this.count=0;this.frame=0;this.mask=null;this.drag=null;this.pointers=new Map();this.rotateMode=false;
    this.palette=new Float32Array(PALETTE.flatMap(colorHex));
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(stage);
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.onError('WebGL context was lost; reload to restore the anatomical view.');});
    this.installControls();this.resize();
  }
  load(buffer,classes,links,centres){
    const dv=new DataView(buffer);
    if(buffer.byteLength<8 || String.fromCharCode(...new Uint8Array(buffer,0,4))!=='NML1')throw Error('Unrecognized overview binary; nothing rendered.');
    const n=dv.getUint32(4,true);
    if(buffer.byteLength!==8+n*24)throw Error(`Incomplete overview: ${buffer.byteLength} bytes for ${n} neurons`);
    this.ids=new Array(n);this.indices=new Map();this.values=new Float32Array(n*5);this.positions=new Float32Array(n*3);this.mask=new Uint8Array(n).fill(1);this.count=n;
    this.min=[Infinity,Infinity,Infinity];this.max=[-Infinity,-Infinity,-Infinity];this.unplaced=0;
    for(let i=0;i<n;i++){
      const off=8+i*24,id=dv.getBigUint64(off,true).toString();
      const xyz=[dv.getFloat32(off+8,true),dv.getFloat32(off+12,true),dv.getFloat32(off+16,true)];
      this.ids[i]=id;this.indices.set(id,i);
      if(xyz.every(Number.isFinite)){
        for(let j=0;j<3;j++){this.min[j]=Math.min(this.min[j],xyz[j]);this.max[j]=Math.max(this.max[j],xyz[j]);this.positions[3*i+j]=xyz[j]}
      }else{this.unplaced++;for(let j=0;j<3;j++)this.positions[3*i+j]=NaN}
      for(let j=0;j<3;j++)this.values[i*5+j]=this.positions[i*3+j];
      this.values[i*5+3]=dv.getUint8(off+20);this.values[i*5+4]=1;
    }
    if(this.unplaced===n)throw Error('No representative anatomical coordinates are available.');
    this.center=this.min.map((v,i)=>(v+this.max[i])/2);
    this.classNames=classes.map(c=>c.name);this.classLinks=links;this.centres=centres;
    const gl=this.gl;gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);gl.bufferData(gl.ARRAY_BUFFER,this.values,gl.DYNAMIC_DRAW);
    this.resize();this.draw();
  }
  setMask(bytes){
    if(!this.count)return;
    if(bytes && bytes.length!==this.count)throw Error('Region mask does not match neuron count');
    this.mask=bytes||new Uint8Array(this.count).fill(1);
    for(let i=0;i<this.count;i++)this.values[i*5+4]=this.mask[i];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer);this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,this.values);
    this.draw();
  }
  setClass(name){this.filterClass=name?this.classNames.indexOf(name):-1;this.draw()}
  setConnections(edges){this.connections=edges||[];this.draw()}
  setPath(edges){this.path=edges||[];this.draw()}
  select(id,{focus=false}={}){
    this.selected=id&&this.indices.has(String(id))?String(id):null;
    if(focus&&this.selected)this.focus(this.selected);
    this.draw();
  }
  focus(id){
    const index=this.indices.get(String(id));if(index===undefined)return;
    const point=this.project(index,true);
    if(point){this.camera.targetPanX=-point[0];this.camera.targetPanY=-point[1];this.camera.targetZoom=Math.max(3,this.camera.targetZoom);this.draw()}
  }
  setPlane(plane){this.plane=['XY','XZ','YZ'].indexOf(plane);if(this.plane<0)this.plane=0;this.camera.targetYaw=0;this.camera.targetPitch=0;this.draw()}
  setSize(value){this.size=clamp(Number(value),1,8);this.draw()}
  setLinks(show){this.showLinks=!!show;this.draw()}
  reset(){Object.assign(this.camera,{targetZoom:1,targetPanX:0,targetPanY:0,targetYaw:0,targetPitch:0});this.draw()}
  zoom(factor){this.camera.targetZoom=clamp(this.camera.targetZoom*factor,.6,32);this.draw()}
  resize(){
    const w=this.stage.clientWidth,h=this.stage.clientHeight;if(!w||!h)return;
    this.w=w;this.h=h;this.dpr=Math.min(devicePixelRatio||1,2);
    for(const canvas of [this.canvas,this.overlay]){canvas.width=Math.round(w*this.dpr);canvas.height=Math.round(h*this.dpr)}
    this.gl.viewport(0,0,this.canvas.width,this.canvas.height);this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);this.draw();
  }
  scale(){
    if(!this.center)return 1;
    const [a,b]=[[0,1],[0,2],[1,2]][this.plane];
    return 1.65/Math.max(this.max[b]-this.min[b],(this.max[a]-this.min[a])/(this.w/this.h),1);
  }
  project(index,raw=false){
    if(index===undefined)return null;
    const xyz=[this.positions[index*3],this.positions[index*3+1],this.positions[index*3+2]];
    if(!xyz.every(Number.isFinite))return null;
    const base=xyz.map((v,i)=>(v-this.center[i])*this.scale());
    const [a,b,d]=[[0,1,2],[0,2,1],[1,2,0]][this.plane];
    const x=Math.cos(this.camera.yaw)*base[a]-Math.sin(this.camera.yaw)*base[b];
    const y=Math.sin(this.camera.yaw)*base[a]+Math.cos(this.camera.yaw)*base[b];
    const yy=Math.cos(this.camera.pitch)*y-Math.sin(this.camera.pitch)*base[d];
    const px=x/(this.w/this.h),py=yy;
    if(raw)return [px,py];
    return [(px+this.camera.panX)*this.camera.zoom*this.w/2+this.w/2,
            this.h/2-(py+this.camera.panY)*this.camera.zoom*this.h/2];
  }
  projectXYZ(xyz){
    if(xyz.some(v=>v==null))return null;
    const base=xyz.map((v,i)=>(v-this.center[i])*this.scale());
    const [a,b,d]=[[0,1,2],[0,2,1],[1,2,0]][this.plane];
    const x=Math.cos(this.camera.yaw)*base[a]-Math.sin(this.camera.yaw)*base[b];
    const y=Math.sin(this.camera.yaw)*base[a]+Math.cos(this.camera.yaw)*base[b];
    const yy=Math.cos(this.camera.pitch)*y-Math.sin(this.camera.pitch)*base[d];
    return [((x/(this.w/this.h)+this.camera.panX)*this.camera.zoom+1)*this.w/2,
            (1-(yy+this.camera.panY)*this.camera.zoom)*this.h/2];
  }
  tick(){
    let moving=false;const c=this.camera;
    for(const [key,target] of [['zoom','targetZoom'],['panX','targetPanX'],['panY','targetPanY'],['yaw','targetYaw'],['pitch','targetPitch']]){
      const delta=c[target]-c[key];if(Math.abs(delta)>.00004){c[key]+=delta*.24;moving=true}else c[key]=c[target]
    }
    this.render();if(moving)this.draw();
  }
  draw(){if(!this.frame)this.frame=requestAnimationFrame(()=>{this.frame=0;this.tick()})}
  render(){
    const gl=this.gl;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    this.ctx.clearRect(0,0,this.w,this.h);
    if(!this.count)return;
    gl.useProgram(this.shader);gl.bindVertexArray(this.vao);
    gl.uniform3fv(this.uniform.center,this.center);gl.uniform1f(this.uniform.scale,this.scale());gl.uniform1f(this.uniform.aspect,this.w/this.h);
    gl.uniform2f(this.uniform.pan,this.camera.panX,this.camera.panY);gl.uniform1f(this.uniform.zoom,this.camera.zoom);
    gl.uniform2f(this.uniform.angles,this.camera.yaw,this.camera.pitch);gl.uniform1i(this.uniform.plane,this.plane);
    gl.uniform1i(this.uniform.filter_class,this.filterClass);
    gl.uniform1f(this.uniform.size,this.size*this.dpr*clamp(Math.pow(this.camera.zoom,.22),.9,2.2));
    gl.uniform3fv(this.uniform.palette,this.palette);gl.drawArrays(gl.POINTS,0,this.count);gl.bindVertexArray(null);
    this.drawOverlay();
  }
  drawOverlay(){
    const ctx=this.ctx;
    if(this.showLinks&&this.camera.zoom<2.35&&!this.path.length){
      // All source-to-target class aggregates (not a "top N" subset).
      const lookup=new Map(this.centres.map(c=>[c.name,c]));
      const max=Math.max(1,...this.classLinks.map(l=>l.pairs));
      for(const link of this.classLinks){
        const a=lookup.get(link.source),b=lookup.get(link.target);if(!a||!b)continue;
        const p=this.projectXYZ([a.x,a.y,a.z]),q=this.projectXYZ([b.x,b.y,b.z]);if(!p||!q)continue;
        const idx=this.classNames.indexOf(link.source),hex=PALETTE[Math.max(0,idx)%PALETTE.length];
        ctx.globalAlpha=.055+.15*Math.log1p(link.pairs)/Math.log1p(max);ctx.strokeStyle=hex;ctx.fillStyle=hex;ctx.lineWidth=.8;
        if(link.source===link.target){ctx.beginPath();ctx.arc(p[0],p[1],7+2*Math.log1p(link.pairs)/Math.log1p(max),-.5,4);ctx.stroke();continue}
        const dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy);
        if(len<5)continue;
        const side=(link.source<link.target?1:-1),bend=Math.min(34,len*.16)*side;
        const cx=(p[0]+q[0])/2-dy/len*bend,cy=(p[1]+q[1])/2+dx/len*bend;
        ctx.beginPath();ctx.moveTo(...p);ctx.quadraticCurveTo(cx,cy,...q);ctx.stroke();
        const tx=(cx+q[0])/2,ty=(cy+q[1])/2;
        this.arrow(ctx,tx,ty,q[0],q[1],hex,4);
      }
      ctx.globalAlpha=1;
    }
    // Actual paged, directed partner connections; never an invented wiring layer.
    for(const edge of this.connections){
      const a=this.project(this.indices.get(edge.source)),b=this.project(this.indices.get(edge.target));
      if(!a||!b)continue;
      const color=edge.source===this.selected?'#74dbc2':'#e9b978';
      ctx.globalAlpha=.3+Math.min(.45,Math.log1p(edge.synapse_count)/15);
      ctx.lineWidth=1+Math.min(2,Math.log1p(edge.synapse_count)/4);ctx.strokeStyle=color;
      ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.stroke();this.arrow(ctx,...a,...b,color,6);
    }
    for(const edge of this.path){
      const a=this.project(this.indices.get(edge.source)),b=this.project(this.indices.get(edge.target));if(!a||!b)continue;
      ctx.globalAlpha=.95;ctx.lineWidth=2.5;ctx.strokeStyle='#e9d19b';ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.stroke();this.arrow(ctx,...a,...b,'#e9d19b',9);
      ctx.beginPath();ctx.arc(b[0],b[1],5,0,Math.PI*2);ctx.fillStyle='#f5dcaa';ctx.fill();
    }
    ctx.globalAlpha=1;
    if(this.selected){const p=this.project(this.indices.get(this.selected));if(p){ctx.strokeStyle='#e9fff3';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p[0],p[1],10,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#e9fff3';ctx.beginPath();ctx.arc(p[0],p[1],2.5,0,Math.PI*2);ctx.fill()}}
  }
  arrow(ctx,x1,y1,x2,y2,color,size){
    const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy);if(len<15)return;
    const ratio=(len-11)/len,px=x1+dx*ratio,py=y1+dy*ratio,a=Math.atan2(dy,dx);
    ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-size*Math.cos(a-.43),py-size*Math.sin(a-.43));ctx.lineTo(px-size*Math.cos(a+.43),py-size*Math.sin(a+.43));ctx.closePath();ctx.fill();
  }
  nearest(x,y){
    if(!this.count)return null;
    let winner=null,best=16*16;
    for(let i=0;i<this.count;i++){
      if(this.mask[i]===0||(this.filterClass>=0&&this.values[i*5+3]!==this.filterClass))continue;
      const p=this.project(i);if(!p)continue;
      const dx=p[0]-x,dy=p[1]-y,dist=dx*dx+dy*dy;
      if(dist<best){best=dist;winner=this.ids[i]}
    }
    return winner;
  }
  installControls(){
    const el=this.canvas,loc=e=>{const r=el.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};
    el.addEventListener('pointerdown',e=>{
      el.setPointerCapture(e.pointerId);const [x,y]=loc(e);this.pointers.set(e.pointerId,[x,y]);
      this.drag={x,y,lastX:x,lastY:y,moved:false,rotate:e.shiftKey||this.rotateMode};
    });
    el.addEventListener('pointermove',e=>{
      if(!this.pointers.has(e.pointerId))return;
      const [x,y]=loc(e),last=this.pointers.get(e.pointerId);this.pointers.set(e.pointerId,[x,y]);
      if(this.pointers.size===2){
        const other=[...this.pointers.entries()].find(([id])=>id!==e.pointerId)?.[1];
        if(other){const prev=Math.hypot(last[0]-other[0],last[1]-other[1]);const now=Math.hypot(x-other[0],y-other[1]);if(prev>10)this.zoom(now/prev)}
        if(this.drag)this.drag.moved=true;return;
      }
      if(!this.drag)return;
      const dx=x-this.drag.lastX,dy=y-this.drag.lastY;
      if(Math.abs(x-this.drag.x)+Math.abs(y-this.drag.y)>4)this.drag.moved=true;
      if(this.drag.rotate){this.camera.targetYaw+=dx*.004;this.camera.targetPitch=clamp(this.camera.targetPitch+dy*.004,-1.2,1.2)}
      else{this.camera.targetPanX+=dx*2/(this.w*this.camera.targetZoom);this.camera.targetPanY-=dy*2/(this.h*this.camera.targetZoom)}
      this.drag.lastX=x;this.drag.lastY=y;this.draw();
    });
    const up=e=>{
      if(!this.pointers.has(e.pointerId))return;
      this.pointers.delete(e.pointerId);
      if(this.drag&&!this.drag.moved&&this.pointers.size===0){const [x,y]=loc(e);const id=this.nearest(x,y);if(id)this.onSelect(id)}
      if(this.pointers.size===0)this.drag=null;
    };
    el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
    el.addEventListener('wheel',e=>{e.preventDefault();this.zoom(e.deltaY>0?.82:1.22)},{passive:false});
  }
}
