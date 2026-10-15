var No=Object.freeze([{id:"beach",name:"Beach",description:"Turquoise ocean, sandy islands, palms, lighthouses, yachts and coastal airfields.",ground:7972200,sand:15126164,water:1478051,building:15326402,accent:16753755,fog:12114143,hour:14},{id:"city",name:"City",description:"A sprawling skyline, street grids, suspension bridges, parks and four regional airports.",ground:6715750,sand:11184540,water:3235193,building:9282229,accent:15976556,fog:10927567,hour:15},{id:"cyberpunk",name:"Cyberpunk",description:"Neon megatowers, glowing skybridges, orbital beacons and a violet twilight skyline.",ground:2367551,sand:4339534,water:2433098,building:3551310,accent:16731871,fog:4732503,hour:19},{id:"apocalypse",name:"Apocalypse",description:"Ashlands, impact craters, wind-swept ruins, radar dishes and an industrial wasteland.",ground:7692359,sand:10451282,water:5523767,building:6380371,accent:16741437,fog:11770235,hour:17}]),yn=n=>No.find(e=>e.id===n)||No[0],vs={minX:-15e3,maxX:35e3,minZ:-1e4,maxZ:4e4};function kh(n,e,t="beach"){if(t==="city"||t==="cyberpunk"){let i=420*Math.exp(-((n+5e3)**2+(e-18e3)**2)/26e6)+320*Math.exp(-((n-18e3)**2+(e+3e3)**2)/2e7)+zh(n,e,.35);return 35+e*.004+i}if(t==="apocalypse"){let i=-160*Math.exp(-((n-3500)**2+(e-2500)**2)/14e5);return 150+120*Math.sin(n/2100)*Math.cos(e/2400)+55*Math.sin(e/700)+90*Math.sin(n/730)*Math.cos(e/680)+i+Oh(n,e,.65)}return 40+e*.006+90*Math.sin(n/4500)+95*Math.sin(e/3900)+60*Math.sin(n/1700)*Math.sin(e/2200)+zh(n,e,.5)+Oh(n,e,.8)}function Oh(n,e,t){return[[9e3,3e4,3800,900],[28e3,1e4,3200,720],[-8e3,27e3,3600,850],[22e3,3e4,3e3,650]].reduce((r,[s,o,a,l])=>r+l*t*Math.exp(-((n-s)**2+(e-o)**2)/(a*cf)),0)}var cf=45e5*.001;function zh(n,e,t){return t*(140*Math.sin(n/620)*Math.cos(e/560)+90*Math.sin(n/340+e/410)+55*Math.sin(e/290-n/370))}var Wn=(n,e,t)=>{let i=Math.sin(n*67.13+e*131.71+t*19.19)*43758.5453;return i-Math.floor(i)};function Mr(n,e,t,i,r){let s=t==="city"||t==="cyberpunk",o=t==="apocalypse",a=s?64:o?32:24,l=[];for(let c=0;c<a;c++){let h=n*2e3+140+c%8*235+(s?0:Wn(n,e,c)*80),u=e*2e3+140+Math.floor(c/8)*235,d=i(h,u,t);if(!(d>3&&!r.some(w=>Math.hypot(w.x-h,w.z-u)<1100)))continue;let g=s||o,x=g?"building":"palm",m=g?55+Wn(n,e,c+90)*50:9,p=g?55+Wn(n,e,c+91)*50:9,E=s?55+Wn(n,e,c+92)*210:o?18+Wn(n,e,c+92)*90:18+Wn(n,e,c+92)*10;l.push({x:h,y:d,z:u,width:m,depth:p,height:E,type:x,ruined:o})}for(let c=0;c<4;c++){let h=n*2e3+250+Wn(n,e,200+c)*1500,u=e*2e3+250+Wn(n,e,210+c)*1500;if(r.some(f=>Math.hypot(f.x-h,f.z-u)<1300))continue;let d=i(h,u,t);d<-4&&t!=="apocalypse"?l.push({x:h,y:0,z:u,width:8,depth:22,height:7,type:"boat",heading:Wn(n,e,220+c)*Math.PI*2}):d>130&&c<2&&l.push({x:h,y:d,z:u,width:6,depth:6,height:58,type:"turbine",phase:Wn(n,e,230+c)*Math.PI*2})}return l}var Mu=0,Wc=1,Su=2;var Xc=1,Ha=2,Kn=3,di=0,Xt=1,Tn=2,gi=0,$i=1,qc=2,Yc=3,$c=4,bu=5,Ii=100,wu=101,Tu=102,Eu=103,Au=104,Cu=200,Ru=201,Iu=202,Pu=203,da=204,fa=205,Lu=206,Du=207,Uu=208,Nu=209,Fu=210,Bu=211,Ou=212,zu=213,ku=214,Wa=0,Xa=1,qa=2,Zi=3,Ya=4,$a=5,Za=6,Ja=7,Ka=0,Vu=1,Gu=2,xi=0,Hu=1,Wu=2,Xu=3,Qa=4,qu=5,Yu=6,$u=7;var Zc=300,ir=301,rr=302,ja=303,el=304,go=306,kr=1e3,Ri=1001,pa=1002,gn=1003,Zu=1004;var xo=1005;var zn=1006,tl=1007;var Ni=1008;var kn=1009,Jc=1010,Kc=1011,is=1012,nl=1013,Fi=1014,Vn=1015,rs=1016,il=1017,rl=1018,ss=1020,Qc=35902,jc=35899,eh=1021,th=1022,Rn=1023,Vr=1026,os=1027,sl=1028,ol=1029,nh=1030,al=1031;var ll=1033,_o=33776,yo=33777,vo=33778,Mo=33779,cl=35840,hl=35841,ul=35842,dl=35843,fl=36196,pl=37492,ml=37496,gl=37808,xl=37809,_l=37810,yl=37811,vl=37812,Ml=37813,Sl=37814,bl=37815,wl=37816,Tl=37817,El=37818,Al=37819,Cl=37820,Rl=37821,Il=36492,Pl=36494,Ll=36495,Dl=36283,Ul=36284,Nl=36285,Fl=36286;var Ns=2300,ma=2301,ua=2302,Ic=2400,Pc=2401,Lc=2402;var Ju=3200,Ku=3201;var Bl=0,Qu=1,_i="",an="srgb",Ji="srgb-linear",Fs="linear",bt="srgb";var qi=7680;var Dc=519,ju=512,ed=513,td=514,ih=515,nd=516,id=517,rd=518,sd=519,ga=35044;var rh="300 es",On=2e3,Bs=2001;var fi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ec=Math.PI/180,Os=180/Math.PI;function hi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function ct(n,e,t){return Math.max(e,Math.min(t,n))}function hf(n,e){return(n%e+e)%e}function tc(n,e,t){return(1-t)*n+t*e}function qn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Et(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var fe=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},An=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3],d=s[o+0],f=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let m=1-a,p=l*d+c*f+h*g+u*x,E=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){let R=Math.sqrt(w),A=Math.atan2(R,p*E);m=Math.sin(m*A)/R,a=Math.sin(a*A)/R}let v=a*E;if(l=l*m+d*v,c=c*m+f*v,h=h*m+g*v,u=u*m+x*v,m===1-a){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),d=l(i/2),f=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>u){let f=2*Math.sqrt(1+i-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-i-u);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*t-s*r),u=2*(s*i-o*t);return this.x=t+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return nc.copy(this).projectOnVector(e),this.sub(nc)}reflect(e){return this.sub(nc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},nc=new I,Vh=new An,it=class n{constructor(e,t,i,r,s,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],x=r[0],m=r[3],p=r[6],E=r[1],w=r[4],v=r[7],R=r[2],A=r[5],D=r[8];return s[0]=o*x+a*E+l*R,s[3]=o*m+a*w+l*A,s[6]=o*p+a*v+l*D,s[1]=c*x+h*E+u*R,s[4]=c*m+h*w+u*A,s[7]=c*p+h*v+u*D,s[2]=d*x+f*E+g*R,s[5]=d*m+f*w+g*A,s[8]=d*p+f*v+g*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,g=t*u+i*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(r*c-h*i)*x,e[2]=(a*i-r*o)*x,e[3]=d*x,e[4]=(h*t-r*l)*x,e[5]=(r*s-a*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ic.makeScale(e,t)),this}rotate(e){return this.premultiply(ic.makeRotation(-e)),this}translate(e,t){return this.premultiply(ic.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ic=new it;function sh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function zs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function od(){let n=zs("canvas");return n.style.display="block",n}var Gh={};function Gr(n){n in Gh||(Gh[n]=!0,console.warn(n))}function ad(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var Hh=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wh=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uf(){let n={enabled:!0,workingColorSpace:Ji,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===bt&&(r.r=ui(r.r),r.g=ui(r.g),r.b=ui(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===bt&&(r.r=zr(r.r),r.g=zr(r.g),r.b=zr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===_i?Fs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Gr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Gr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ji]:{primaries:e,whitePoint:i,transfer:Fs,toXYZ:Hh,fromXYZ:Wh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:i,transfer:bt,toXYZ:Hh,fromXYZ:Wh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),n}var mt=uf();function ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Sr,xa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Sr===void 0&&(Sr=zs("canvas")),Sr.width=e.width,Sr.height=e.height;let r=Sr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Sr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=zs("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ui(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ui(t[i]/255)*255):t[i]=ui(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},df=0,Hr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=hi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(rc(r[o].image)):s.push(rc(r[o]))}else s=rc(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function rc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?xa.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ff=0,sc=new I,pn=class n extends fi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Ri,r=Ri,s=zn,o=Ni,a=Rn,l=kn,c=n.DEFAULT_ANISOTROPY,h=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=hi(),this.name="",this.source=new Hr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(sc).x}get height(){return this.source.getSize(sc).y}get depth(){return this.source.getSize(sc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kr:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kr:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=Zc;pn.DEFAULT_ANISOTROPY=1;var St=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,v=(f+1)/2,R=(p+1)/2,A=(h+d)/4,D=(u+x)/4,N=(g+m)/4;return w>v&&w>R?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=A/i,s=D/i):v>R?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=A/r,s=N/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=D/s,r=N/s),this.set(i,r,s,t),this}let E=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-x)/E,this.z=(d-h)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_a=class extends fi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);let r={width:e,height:t,depth:i.depth},s=new pn(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:zn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Hr(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yn=class extends _a{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ks=class extends pn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ya=class extends pn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var $n=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Nn):Nn.fromBufferAttribute(s,o),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fo.copy(i.boundingBox)),Fo.applyMatrix4(e.matrixWorld),this.union(Fo)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ms),Bo.subVectors(this.max,Ms),br.subVectors(e.a,Ms),wr.subVectors(e.b,Ms),Tr.subVectors(e.c,Ms),bi.subVectors(wr,br),wi.subVectors(Tr,wr),Gi.subVectors(br,Tr);let t=[0,-bi.z,bi.y,0,-wi.z,wi.y,0,-Gi.z,Gi.y,bi.z,0,-bi.x,wi.z,0,-wi.x,Gi.z,0,-Gi.x,-bi.y,bi.x,0,-wi.y,wi.x,0,-Gi.y,Gi.x,0];return!oc(t,br,wr,Tr,Bo)||(t=[1,0,0,0,1,0,0,0,1],!oc(t,br,wr,Tr,Bo))?!1:(Oo.crossVectors(bi,wi),t=[Oo.x,Oo.y,Oo.z],oc(t,br,wr,Tr,Bo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ri=[new I,new I,new I,new I,new I,new I,new I,new I],Nn=new I,Fo=new $n,br=new I,wr=new I,Tr=new I,bi=new I,wi=new I,Gi=new I,Ms=new I,Bo=new I,Oo=new I,Hi=new I;function oc(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Hi.fromArray(n,s);let a=r.x*Math.abs(Hi.x)+r.y*Math.abs(Hi.y)+r.z*Math.abs(Hi.z),l=e.dot(Hi),c=t.dot(Hi),h=i.dot(Hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var pf=new $n,Ss=new I,ac=new I,Zn=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):pf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ss.subVectors(e,this.center);let t=Ss.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ss,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ac.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ss.copy(e.center).add(ac)),this.expandByPoint(Ss.copy(e.center).sub(ac))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},si=new I,lc=new I,zo=new I,Ti=new I,cc=new I,ko=new I,hc=new I,Ki=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){lc.copy(e).add(t).multiplyScalar(.5),zo.copy(t).sub(e).normalize(),Ti.copy(this.origin).sub(lc);let s=e.distanceTo(t)*.5,o=-this.direction.dot(zo),a=Ti.dot(this.direction),l=-Ti.dot(zo),c=Ti.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(lc).addScaledVector(zo,d),f}intersectSphere(e,t){si.subVectors(e.center,this.origin);let i=si.dot(this.direction),r=si.dot(si)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,i,r,s){cc.subVectors(t,e),ko.subVectors(i,e),hc.crossVectors(cc,ko);let o=this.direction.dot(hc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ti.subVectors(this.origin,e);let l=a*this.direction.dot(ko.crossVectors(Ti,ko));if(l<0)return null;let c=a*this.direction.dot(cc.cross(Ti));if(c<0||l+c>o)return null;let h=-a*Ti.dot(hc);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Mt=class n{constructor(e,t,i,r,s,o,a,l,c,h,u,d,f,g,x,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,h,u,d,f,g,x,m)}set(e,t,i,r,s,o,a,l,c,h,u,d,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/Er.setFromMatrixColumn(e,0).length(),s=1/Er.setFromMatrixColumn(e,1).length(),o=1/Er.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mf,e,gf)}lookAt(e,t,i){let r=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Ei.crossVectors(i,vn),Ei.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Ei.crossVectors(i,vn)),Ei.normalize(),Vo.crossVectors(vn,Ei),r[0]=Ei.x,r[4]=Vo.x,r[8]=vn.x,r[1]=Ei.y,r[5]=Vo.y,r[9]=vn.y,r[2]=Ei.z,r[6]=Vo.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],E=i[3],w=i[7],v=i[11],R=i[15],A=r[0],D=r[4],N=r[8],S=r[12],M=r[1],P=r[5],k=r[9],H=r[13],$=r[2],Y=r[6],X=r[10],oe=r[14],W=r[3],me=r[7],ve=r[11],Ae=r[15];return s[0]=o*A+a*M+l*$+c*W,s[4]=o*D+a*P+l*Y+c*me,s[8]=o*N+a*k+l*X+c*ve,s[12]=o*S+a*H+l*oe+c*Ae,s[1]=h*A+u*M+d*$+f*W,s[5]=h*D+u*P+d*Y+f*me,s[9]=h*N+u*k+d*X+f*ve,s[13]=h*S+u*H+d*oe+f*Ae,s[2]=g*A+x*M+m*$+p*W,s[6]=g*D+x*P+m*Y+p*me,s[10]=g*N+x*k+m*X+p*ve,s[14]=g*S+x*H+m*oe+p*Ae,s[3]=E*A+w*M+v*$+R*W,s[7]=E*D+w*P+v*Y+R*me,s[11]=E*N+w*k+v*X+R*ve,s[15]=E*S+w*H+v*oe+R*Ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+s*l*u-r*c*u-s*a*d+i*c*d+r*a*f-i*l*f)+x*(+t*l*f-t*c*d+s*o*d-r*o*f+r*c*h-s*l*h)+m*(+t*c*u-t*a*f-s*o*u+i*o*f+s*a*h-i*c*h)+p*(-r*a*h-t*l*u+t*a*d+r*o*u-i*o*d+i*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],E=u*m*c-x*d*c+x*l*f-a*m*f-u*l*p+a*d*p,w=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,v=h*x*c-g*u*c+g*a*f-o*x*f-h*a*p+o*u*p,R=g*u*l-h*x*l-g*a*d+o*x*d+h*a*m-o*u*m,A=t*E+i*w+r*v+s*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/A;return e[0]=E*D,e[1]=(x*d*s-u*m*s-x*r*f+i*m*f+u*r*p-i*d*p)*D,e[2]=(a*m*s-x*l*s+x*r*c-i*m*c-a*r*p+i*l*p)*D,e[3]=(u*l*s-a*d*s-u*r*c+i*d*c+a*r*f-i*l*f)*D,e[4]=w*D,e[5]=(h*m*s-g*d*s+g*r*f-t*m*f-h*r*p+t*d*p)*D,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*D,e[7]=(o*d*s-h*l*s+h*r*c-t*d*c-o*r*f+t*l*f)*D,e[8]=v*D,e[9]=(g*u*s-h*x*s-g*i*f+t*x*f+h*i*p-t*u*p)*D,e[10]=(o*x*s-g*a*s+g*i*c-t*x*c-o*i*p+t*a*p)*D,e[11]=(h*a*s-o*u*s-h*i*c+t*u*c+o*i*f-t*a*f)*D,e[12]=R*D,e[13]=(h*x*r-g*u*r+g*i*d-t*x*d-h*i*m+t*u*m)*D,e[14]=(g*a*r-o*x*r-g*i*l+t*x*l+o*i*m-t*a*m)*D,e[15]=(o*u*r-h*a*r+h*i*l-t*u*l-o*i*d+t*a*d)*D,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,g=s*u,x=o*h,m=o*u,p=a*u,E=l*c,w=l*h,v=l*u,R=i.x,A=i.y,D=i.z;return r[0]=(1-(x+p))*R,r[1]=(f+v)*R,r[2]=(g-w)*R,r[3]=0,r[4]=(f-v)*A,r[5]=(1-(d+p))*A,r[6]=(m+E)*A,r[7]=0,r[8]=(g+w)*D,r[9]=(m-E)*D,r[10]=(1-(d+x))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,s=Er.set(r[0],r[1],r[2]).length(),o=Er.set(r[4],r[5],r[6]).length(),a=Er.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Fn.copy(this);let c=1/s,h=1/o,u=1/a;return Fn.elements[0]*=c,Fn.elements[1]*=c,Fn.elements[2]*=c,Fn.elements[4]*=h,Fn.elements[5]*=h,Fn.elements[6]*=h,Fn.elements[8]*=u,Fn.elements[9]*=u,Fn.elements[10]*=u,t.setFromRotationMatrix(Fn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=On,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(i-r),d=(t+e)/(t-e),f=(i+r)/(i-r),g,x;if(l)g=s/(o-s),x=o*s/(o-s);else if(a===On)g=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Bs)g=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=On,l=!1){let c=this.elements,h=2/(t-e),u=2/(i-r),d=-(t+e)/(t-e),f=-(i+r)/(i-r),g,x;if(l)g=1/(o-s),x=o/(o-s);else if(a===On)g=-2/(o-s),x=-(o+s)/(o-s);else if(a===Bs)g=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Er=new I,Fn=new Mt,mf=new I(0,0,0),gf=new I(1,1,1),Ei=new I,Vo=new I,vn=new I,Xh=new Mt,qh=new An,xn=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Xh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qh.setFromEuler(this),this.setFromQuaternion(qh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xn.DEFAULT_ORDER="XYZ";var Wr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},xf=0,Yh=new I,Ar=new An,oi=new Mt,Go=new I,bs=new I,_f=new I,yf=new An,$h=new I(1,0,0),Zh=new I(0,1,0),Jh=new I(0,0,1),Kh={type:"added"},vf={type:"removed"},Cr={type:"childadded",child:null},uc={type:"childremoved",child:null},Rt=class n extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new I,t=new xn,i=new An,r=new I(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Mt},normalMatrix:{value:new it}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ar.setFromAxisAngle(e,t),this.quaternion.multiply(Ar),this}rotateOnWorldAxis(e,t){return Ar.setFromAxisAngle(e,t),this.quaternion.premultiply(Ar),this}rotateX(e){return this.rotateOnAxis($h,e)}rotateY(e){return this.rotateOnAxis(Zh,e)}rotateZ(e){return this.rotateOnAxis(Jh,e)}translateOnAxis(e,t){return Yh.copy(e).applyQuaternion(this.quaternion),this.position.add(Yh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($h,e)}translateY(e){return this.translateOnAxis(Zh,e)}translateZ(e){return this.translateOnAxis(Jh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Go.copy(e):Go.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(bs,Go,this.up):oi.lookAt(Go,bs,this.up),this.quaternion.setFromRotationMatrix(oi),r&&(oi.extractRotation(r.matrixWorld),Ar.setFromRotationMatrix(oi),this.quaternion.premultiply(Ar.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kh),Cr.child=e,this.dispatchEvent(Cr),Cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vf),uc.child=e,this.dispatchEvent(uc),uc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kh),Cr.child=e,this.dispatchEvent(Cr),Cr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,e,_f),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,yf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};Rt.DEFAULT_UP=new I(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Bn=new I,ai=new I,dc=new I,li=new I,Rr=new I,Ir=new I,Qh=new I,fc=new I,pc=new I,mc=new I,gc=new St,xc=new St,_c=new St,ci=class n{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Bn.subVectors(e,t),r.cross(Bn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Bn.subVectors(r,t),ai.subVectors(i,t),dc.subVectors(e,t);let o=Bn.dot(Bn),a=Bn.dot(ai),l=Bn.dot(dc),c=ai.dot(ai),h=ai.dot(dc),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,li.x),l.addScaledVector(o,li.y),l.addScaledVector(a,li.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return gc.setScalar(0),xc.setScalar(0),_c.setScalar(0),gc.fromBufferAttribute(e,t),xc.fromBufferAttribute(e,i),_c.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(gc,s.x),o.addScaledVector(xc,s.y),o.addScaledVector(_c,s.z),o}static isFrontFacing(e,t,i,r){return Bn.subVectors(i,t),ai.subVectors(e,t),Bn.cross(ai).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Bn.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;Rr.subVectors(r,i),Ir.subVectors(s,i),fc.subVectors(e,i);let l=Rr.dot(fc),c=Ir.dot(fc);if(l<=0&&c<=0)return t.copy(i);pc.subVectors(e,r);let h=Rr.dot(pc),u=Ir.dot(pc);if(h>=0&&u<=h)return t.copy(r);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(Rr,o);mc.subVectors(e,s);let f=Rr.dot(mc),g=Ir.dot(mc);if(g>=0&&f<=g)return t.copy(s);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Ir,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Qh.subVectors(s,r),a=(u-h)/(u-h+(f-g)),t.copy(r).addScaledVector(Qh,a);let p=1/(m+x+d);return o=x*p,a=d*p,t.copy(i).addScaledVector(Rr,o).addScaledVector(Ir,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Ho={h:0,s:0,l:0};function yc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var He=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=mt.workingColorSpace){return this.r=e,this.g=t,this.b=i,mt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=mt.workingColorSpace){if(e=hf(e,1),t=ct(t,0,1),i=ct(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=yc(o,s,e+1/3),this.g=yc(o,s,e),this.b=yc(o,s,e-1/3)}return mt.colorSpaceToWorking(this,r),this}setStyle(e,t=an){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){let i=ld[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=zr(e.r),this.g=zr(e.g),this.b=zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return mt.workingToColorSpace(on.copy(this),e),Math.round(ct(on.r*255,0,255))*65536+Math.round(ct(on.g*255,0,255))*256+Math.round(ct(on.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.workingToColorSpace(on.copy(this),t);let i=on.r,r=on.g,s=on.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=mt.workingColorSpace){return mt.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=an){mt.workingToColorSpace(on.copy(this),e);let t=on.r,i=on.g,r=on.b;return e!==an?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ai),this.setHSL(Ai.h+e,Ai.s+t,Ai.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ai),e.getHSL(Ho);let i=tc(Ai.h,Ho.h,t),r=tc(Ai.s,Ho.s,t),s=tc(Ai.l,Ho.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new He;He.NAMES=ld;var Mf=0,Cn=class extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=$i,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=da,this.blendDst=fa,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(i.blending=this.blending),this.side!==di&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==da&&(i.blendSrc=this.blendSrc),this.blendDst!==fa&&(i.blendDst=this.blendDst),this.blendEquation!==Ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ft=class extends Cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Ka,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Gt=new I,Wo=new fe,Sf=0,zt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ga,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Wo.fromBufferAttribute(this,t),Wo.applyMatrix3(e),this.setXY(t,Wo.x,Wo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=qn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Et(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array),r=Et(r,this.array),s=Et(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ga&&(e.usage=this.usage),e}};var Vs=class extends zt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Gs=class extends zt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var It=class extends zt{constructor(e,t,i){super(new Float32Array(e),t,i)}},bf=0,En=new Mt,vc=new Rt,Pr=new I,Mn=new $n,ws=new $n,Kt=new I,kt=class n extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sh(e)?Gs:Vs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new it().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,i){return En.makeTranslation(e,t,i),this.applyMatrix4(En),this}scale(e,t,i){return En.makeScale(e,t,i),this.applyMatrix4(En),this}lookAt(e){return vc.lookAt(e),vc.updateMatrix(),this.applyMatrix4(vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new It(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $n);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];ws.setFromBufferAttribute(a),this.morphTargetsRelative?(Kt.addVectors(Mn.min,ws.min),Mn.expandByPoint(Kt),Kt.addVectors(Mn.max,ws.max),Mn.expandByPoint(Kt)):(Mn.expandByPoint(ws.min),Mn.expandByPoint(ws.max))}Mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Kt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Kt.fromBufferAttribute(a,c),l&&(Pr.fromBufferAttribute(e,c),Kt.add(Pr)),r=Math.max(r,i.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<i.count;N++)a[N]=new I,l[N]=new I;let c=new I,h=new I,u=new I,d=new fe,f=new fe,g=new fe,x=new I,m=new I;function p(N,S,M){c.fromBufferAttribute(i,N),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,M),d.fromBufferAttribute(s,N),f.fromBufferAttribute(s,S),g.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[N].add(x),a[S].add(x),a[M].add(x),l[N].add(m),l[S].add(m),l[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let N=0,S=E.length;N<S;++N){let M=E[N],P=M.start,k=M.count;for(let H=P,$=P+k;H<$;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let w=new I,v=new I,R=new I,A=new I;function D(N){R.fromBufferAttribute(r,N),A.copy(R);let S=a[N];w.copy(S),w.sub(R.multiplyScalar(R.dot(S))).normalize(),v.crossVectors(A,S);let P=v.dot(l[N])<0?-1:1;o.setXYZW(N,w.x,w.y,w.z,P)}for(let N=0,S=E.length;N<S;++N){let M=E[N],P=M.start,k=M.count;for(let H=P,$=P+k;H<$;H+=3)D(e.getX(H+0)),D(e.getX(H+1)),D(e.getX(H+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let r=new I,s=new I,o=new I,a=new I,l=new I,c=new I,h=new I,u=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new zt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},jh=new Mt,Wi=new Ki,Xo=new Zn,eu=new I,qo=new I,Yo=new I,$o=new I,Mc=new I,Zo=new I,tu=new I,Jo=new I,wt=class extends Rt{constructor(e=new kt,t=new Ft){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Zo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],u=s[l];h!==0&&(Mc.fromBufferAttribute(u,e),o?Zo.addScaledVector(Mc,h):Zo.addScaledVector(Mc.sub(t),h))}t.add(Zo)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xo.copy(i.boundingSphere),Xo.applyMatrix4(s),Wi.copy(e.ray).recast(e.near),!(Xo.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(Xo,eu)===null||Wi.origin.distanceToSquared(eu)>(e.far-e.near)**2))&&(jh.copy(s).invert(),Wi.copy(e.ray).applyMatrix4(jh),!(i.boundingBox!==null&&Wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),w=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=E,R=w;v<R;v+=3){let A=a.getX(v),D=a.getX(v+1),N=a.getX(v+2);r=Ko(this,p,e,i,c,h,u,A,D,N),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let E=a.getX(m),w=a.getX(m+1),v=a.getX(m+2);r=Ko(this,o,e,i,c,h,u,E,w,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=E,R=w;v<R;v+=3){let A=v,D=v+1,N=v+2;r=Ko(this,p,e,i,c,h,u,A,D,N),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let E=m,w=m+1,v=m+2;r=Ko(this,o,e,i,c,h,u,E,w,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function wf(n,e,t,i,r,s,o,a){let l;if(e.side===Xt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===di,a),l===null)return null;Jo.copy(a),Jo.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Jo);return c<t.near||c>t.far?null:{distance:c,point:Jo.clone(),object:n}}function Ko(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,qo),n.getVertexPosition(l,Yo),n.getVertexPosition(c,$o);let h=wf(n,e,t,i,qo,Yo,$o,tu);if(h){let u=new I;ci.getBarycoord(tu,qo,Yo,$o,u),r&&(h.uv=ci.getInterpolatedAttribute(r,a,l,c,u,new fe)),s&&(h.uv1=ci.getInterpolatedAttribute(s,a,l,c,u,new fe)),o&&(h.normal=ci.getInterpolatedAttribute(o,a,l,c,u,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new I,materialIndex:0};ci.getNormal(qo,Yo,$o,d.normal),h.face=d,h.barycoord=u}return h}var et=class n extends kt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new It(c,3)),this.setAttribute("normal",new It(h,3)),this.setAttribute("uv",new It(u,2));function g(x,m,p,E,w,v,R,A,D,N,S){let M=v/D,P=R/N,k=v/2,H=R/2,$=A/2,Y=D+1,X=N+1,oe=0,W=0,me=new I;for(let ve=0;ve<X;ve++){let Ae=ve*P-H;for(let ie=0;ie<Y;ie++){let rt=ie*M-k;me[x]=rt*E,me[m]=Ae*w,me[p]=$,c.push(me.x,me.y,me.z),me[x]=0,me[m]=0,me[p]=A>0?1:-1,h.push(me.x,me.y,me.z),u.push(ie/D),u.push(1-ve/N),oe+=1}}for(let ve=0;ve<N;ve++)for(let Ae=0;Ae<D;Ae++){let ie=d+Ae+Y*ve,rt=d+Ae+Y*(ve+1),ht=d+(Ae+1)+Y*(ve+1),Re=d+(Ae+1)+Y*ve;l.push(ie,rt,Re),l.push(rt,ht,Re),W+=6}a.addGroup(f,W,S),f+=W,d+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function sr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function hn(n){let e={};for(let t=0;t<n.length;t++){let i=sr(n[t]);for(let r in i)e[r]=i[r]}return e}function Tf(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function oh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}var Ol={clone:sr,merge:hn},Ef=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,mn=class extends Cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ef,this.fragmentShader=Af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=sr(e.uniforms),this.uniformsGroups=Tf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Hs=class extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ci=new I,nu=new fe,iu=new fe,Qt=class extends Hs{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ec*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(ec*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,nu,iu),t.subVectors(iu,nu)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ec*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Lr=-90,Dr=1,va=class extends Rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Qt(Lr,Dr,e,t);r.layers=this.layers,this.add(r);let s=new Qt(Lr,Dr,e,t);s.layers=this.layers,this.add(s);let o=new Qt(Lr,Dr,e,t);o.layers=this.layers,this.add(o);let a=new Qt(Lr,Dr,e,t);a.layers=this.layers,this.add(a);let l=new Qt(Lr,Dr,e,t);l.layers=this.layers,this.add(l);let c=new Qt(Lr,Dr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===On)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Bs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Ws=class extends pn{constructor(e=[],t=ir,i,r,s,o,a,l,c,h){super(e,t,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ma=class extends Yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ws(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new et(5,5,5),s=new mn({name:"CubemapFromEquirect",uniforms:sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xt,blending:gi});s.uniforms.tEquirect.value=t;let o=new wt(r,s),a=t.minFilter;return t.minFilter===Ni&&(t.minFilter=zn),new va(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},jt=class extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Cf={type:"move"},Xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Cf)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new jt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Xs=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new He(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Qi=class extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},qs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ga,this.updateRanges=[],this.version=0,this.uuid=hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},fn=new I,qr=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=qn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Et(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=qn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=qn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=qn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=qn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array),r=Et(r,this.array),s=Et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Yr=class extends Cn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ur,Ts=new I,Nr=new I,Fr=new I,Br=new fe,Es=new fe,cd=new Mt,Qo=new I,As=new I,jo=new I,ru=new fe,Sc=new fe,su=new fe,Ys=class extends Rt{constructor(e=new Yr){if(super(),this.isSprite=!0,this.type="Sprite",Ur===void 0){Ur=new kt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new qs(t,5);Ur.setIndex([0,1,2,0,2,3]),Ur.setAttribute("position",new qr(i,3,0,!1)),Ur.setAttribute("uv",new qr(i,2,3,!1))}this.geometry=Ur,this.material=e,this.center=new fe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Nr.setFromMatrixScale(this.matrixWorld),cd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Fr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Nr.multiplyScalar(-Fr.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let o=this.center;ea(Qo.set(-.5,-.5,0),Fr,o,Nr,r,s),ea(As.set(.5,-.5,0),Fr,o,Nr,r,s),ea(jo.set(.5,.5,0),Fr,o,Nr,r,s),ru.set(0,0),Sc.set(1,0),su.set(1,1);let a=e.ray.intersectTriangle(Qo,As,jo,!1,Ts);if(a===null&&(ea(As.set(-.5,.5,0),Fr,o,Nr,r,s),Sc.set(0,1),a=e.ray.intersectTriangle(Qo,jo,As,!1,Ts),a===null))return;let l=e.ray.origin.distanceTo(Ts);l<e.near||l>e.far||t.push({distance:l,point:Ts.clone(),uv:ci.getInterpolation(Ts,Qo,As,jo,ru,Sc,su,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ea(n,e,t,i,r,s){Br.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Es.x=s*Br.x-r*Br.y,Es.y=r*Br.x+s*Br.y):Es.copy(Br),n.copy(e),n.x+=Es.x,n.y+=Es.y,n.applyMatrix4(cd)}var Sa=class extends pn{constructor(e=null,t=1,i=1,r,s,o,a,l,c=gn,h=gn,u,d){super(null,o,a,l,c,h,r,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var $r=class extends zt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Or=new Mt,ou=new Mt,ta=[],au=new $n,Rf=new Mt,Cs=new wt,Rs=new Zn,ln=class extends wt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $r(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Rf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $n),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Or),au.copy(e.boundingBox).applyMatrix4(Or),this.boundingBox.union(au)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Or),Rs.copy(e.boundingSphere).applyMatrix4(Or),this.boundingSphere.union(Rs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(Cs.geometry=this.geometry,Cs.material=this.material,Cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rs.copy(this.boundingSphere),Rs.applyMatrix4(i),e.ray.intersectsSphere(Rs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Or),ou.multiplyMatrices(i,Or),Cs.matrixWorld=ou,Cs.raycast(e,ta);for(let o=0,a=ta.length;o<a;o++){let l=ta[o];l.instanceId=s,l.object=this,t.push(l)}ta.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new $r(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Sa(new Float32Array(r*this.count),r,this.count,sl,Vn));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},bc=new I,If=new I,Pf=new it,Xn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=bc.subVectors(i,t).cross(If.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(bc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Pf.getNormalMatrix(e),r=this.coplanarPoint(bc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Xi=new Zn,Lf=new fe(.5,.5),na=new I,Zr=class{constructor(e=new Xn,t=new Xn,i=new Xn,r=new Xn,s=new Xn,o=new Xn){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=On,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],x=s[9],m=s[10],p=s[11],E=s[12],w=s[13],v=s[14],R=s[15];if(r[0].setComponents(c-o,f-h,p-g,R-E).normalize(),r[1].setComponents(c+o,f+h,p+g,R+E).normalize(),r[2].setComponents(c+a,f+u,p+x,R+w).normalize(),r[3].setComponents(c-a,f-u,p-x,R-w).normalize(),i)r[4].setComponents(l,d,m,v).normalize(),r[5].setComponents(c-l,f-d,p-m,R-v).normalize();else if(r[4].setComponents(c-l,f-d,p-m,R-v).normalize(),t===On)r[5].setComponents(c+l,f+d,p+m,R+v).normalize();else if(t===Bs)r[5].setComponents(l,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){Xi.center.set(0,0,0);let t=Lf.distanceTo(e.center);return Xi.radius=.7071067811865476+t,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(na.x=r.normal.x>0?e.max.x:e.min.x,na.y=r.normal.y>0?e.max.y:e.min.y,na.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(na)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Jr=class extends Cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ba=new I,wa=new I,lu=new Mt,Is=new Ki,ia=new Zn,wc=new I,cu=new I,$s=class extends Rt{constructor(e=new kt,t=new Jr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)ba.fromBufferAttribute(t,r-1),wa.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ba.distanceTo(wa);e.setAttribute("lineDistance",new It(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere),ia.applyMatrix4(r),ia.radius+=s,e.ray.intersectsSphere(ia)===!1)return;lu.copy(r).invert(),Is.copy(e.ray).applyMatrix4(lu);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){let p=h.getX(x),E=h.getX(x+1),w=ra(this,e,Is,l,p,E,x);w&&t.push(w)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),p=ra(this,e,Is,l,x,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){let p=ra(this,e,Is,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=ra(this,e,Is,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ra(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(ba.fromBufferAttribute(a,r),wa.fromBufferAttribute(a,s),t.distanceSqToSegment(ba,wa,wc,cu)>i)return;wc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(wc);if(!(c<e.near||c>e.far))return{distance:c,point:cu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var Kr=class extends Cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},hu=new Mt,Uc=new Ki,sa=new Zn,oa=new I,Zs=class extends Rt{constructor(e=new kt,t=new Kr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),sa.copy(i.boundingSphere),sa.applyMatrix4(r),sa.radius+=s,e.ray.intersectsSphere(sa)===!1)return;hu.copy(r).invert(),Uc.copy(e.ray).applyMatrix4(hu);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=c.getX(g);oa.fromBufferAttribute(u,m),uu(oa,m,l,r,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)oa.fromBufferAttribute(u,g),uu(oa,g,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function uu(n,e,t,i,r,s,o){let a=Uc.distanceSqToPoint(n);if(a<t){let l=new I;Uc.closestPointToPoint(n,l),l.applyMatrix4(i);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Pi=class extends pn{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Js=class extends pn{constructor(e,t,i=Fi,r,s,o,a=gn,l=gn,c,h=Vr,u=1){if(h!==Vr&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ks=class extends pn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Qr=class n extends kt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let s=[],o=[],a=[],l=[],c=new I,h=new fe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=i+u/t*r;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new It(o,3)),this.setAttribute("normal",new It(a,3)),this.setAttribute("uv",new It(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Sn=class n extends kt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],u=[],d=[],f=[],g=0,x=[],m=i/2,p=0;E(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new It(u,3)),this.setAttribute("normal",new It(d,3)),this.setAttribute("uv",new It(f,2));function E(){let v=new I,R=new I,A=0,D=(t-e)/i;for(let N=0;N<=s;N++){let S=[],M=N/s,P=M*(t-e)+e;for(let k=0;k<=r;k++){let H=k/r,$=H*l+a,Y=Math.sin($),X=Math.cos($);R.x=P*Y,R.y=-M*i+m,R.z=P*X,u.push(R.x,R.y,R.z),v.set(Y,D,X).normalize(),d.push(v.x,v.y,v.z),f.push(H,1-M),S.push(g++)}x.push(S)}for(let N=0;N<r;N++)for(let S=0;S<s;S++){let M=x[S][N],P=x[S+1][N],k=x[S+1][N+1],H=x[S][N+1];(e>0||S!==0)&&(h.push(M,P,H),A+=3),(t>0||S!==s-1)&&(h.push(P,k,H),A+=3)}c.addGroup(p,A,0),p+=A}function w(v){let R=g,A=new fe,D=new I,N=0,S=v===!0?e:t,M=v===!0?1:-1;for(let k=1;k<=r;k++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;let P=g;for(let k=0;k<=r;k++){let $=k/r*l+a,Y=Math.cos($),X=Math.sin($);D.x=S*X,D.y=m*M,D.z=S*Y,u.push(D.x,D.y,D.z),d.push(0,M,0),A.x=Y*.5+.5,A.y=X*.5*M+.5,f.push(A.x,A.y),g++}for(let k=0;k<r;k++){let H=R+k,$=P+k;v===!0?h.push($,$+1,H):h.push($+1,$,H),N+=3}c.addGroup(p,N,v===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},pi=class n extends Sn{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var bn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);let h=i[r],d=i[r+1]-h,f=(o-h)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new fe:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new I,r=[],s=[],o=[],a=new I,l=new Mt;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new I)}s[0]=new I,o[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(ct(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(ct(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},jr=class extends bn{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new fe){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ta=class extends jr{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function ah(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,r(o,a,d,f)},calc:function(s){let o=s*s,a=o*s;return n+e*s+t*o+i*a}}}var aa=new I,Tc=new ah,Ec=new ah,Ac=new ah,Ea=class extends bn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new I){let i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(aa.subVectors(r[0],r[1]).add(r[0]),c=aa);let u=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(aa.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=aa),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Tc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),Ec.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),Ac.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Tc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Ec.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ac.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(Tc.calc(l),Ec.calc(l),Ac.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function du(n,e,t,i,r){let s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function Df(n,e){let t=1-n;return t*t*e}function Uf(n,e){return 2*(1-n)*n*e}function Nf(n,e){return n*n*e}function Ds(n,e,t,i){return Df(n,e)+Uf(n,t)+Nf(n,i)}function Ff(n,e){let t=1-n;return t*t*t*e}function Bf(n,e){let t=1-n;return 3*t*t*n*e}function Of(n,e){return 3*(1-n)*n*n*e}function zf(n,e){return n*n*n*e}function Us(n,e,t,i,r){return Ff(n,e)+Bf(n,t)+Of(n,i)+zf(n,r)}var Qs=class extends bn{constructor(e=new fe,t=new fe,i=new fe,r=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new fe){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Us(e,r.x,s.x,o.x,a.x),Us(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Aa=class extends bn{constructor(e=new I,t=new I,i=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new I){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Us(e,r.x,s.x,o.x,a.x),Us(e,r.y,s.y,o.y,a.y),Us(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},js=class extends bn{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ca=class extends bn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},eo=class extends bn{constructor(e=new fe,t=new fe,i=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new fe){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Ds(e,r.x,s.x,o.x),Ds(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ra=class extends bn{constructor(e=new I,t=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new I){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Ds(e,r.x,s.x,o.x),Ds(e,r.y,s.y,o.y),Ds(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},to=class extends bn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){let i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return i.set(du(a,l.x,c.x,h.x,u.x),du(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new fe().fromArray(r))}return this}},Nc=Object.freeze({__proto__:null,ArcCurve:Ta,CatmullRomCurve3:Ea,CubicBezierCurve:Qs,CubicBezierCurve3:Aa,EllipseCurve:jr,LineCurve:js,LineCurve3:Ca,QuadraticBezierCurve:eo,QuadraticBezierCurve3:Ra,SplineCurve:to}),Ia=class extends bn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nc[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=i){let o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new Nc[r.type]().fromJSON(r))}return this}},no=class extends Ia{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new js(this.currentPoint.clone(),new fe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let s=new eo(this.currentPoint.clone(),new fe(e,t),new fe(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){let a=new Qs(this.currentPoint.clone(),new fe(e,t),new fe(i,r),new fe(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new to(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,r,s,o,a,l),this}absellipse(e,t,i,r,s,o,a,l){let c=new jr(e,t,i,r,s,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},es=class extends no{constructor(e){super(e),this.uuid=hi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new no().fromJSON(r))}return this}};function kf(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,s=hd(n,0,r,t,!0),o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=Xf(n,e,s,t)),n.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<r;d+=t){let f=n[d],g=n[d+1];f<a&&(a=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return io(s,o,t,a,l,c,0),o}function hd(n,e,t,i,r){let s;if(r===np(n,e,t,i)>0)for(let o=e;o<t;o+=i)s=fu(o/i|0,n[o],n[o+1],s);else for(let o=t-i;o>=e;o-=i)s=fu(o/i|0,n[o],n[o+1],s);return s&&ts(s,s.next)&&(so(s),s=s.next),s}function ji(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ts(t,t.next)||Nt(t.prev,t,t.next)===0)){if(so(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function io(n,e,t,i,r,s,o){if(!n)return;!o&&s&&Jf(n,i,r,s);let a=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(s?Gf(n,i,r,s):Vf(n)){e.push(l.i,n.i,c.i),so(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=Hf(ji(n),e),io(n,e,t,i,r,s,2)):o===2&&Wf(n,e,t,i,r,s):io(ji(n),e,t,i,r,s,1);break}}}function Vf(n){let e=n.prev,t=n,i=n.next;if(Nt(e,t,i)>=0)return!1;let r=e.x,s=t.x,o=i.x,a=e.y,l=t.y,c=i.y,h=Math.min(r,s,o),u=Math.min(a,l,c),d=Math.max(r,s,o),f=Math.max(a,l,c),g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Ls(r,a,s,l,o,c,g.x,g.y)&&Nt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Gf(n,e,t,i){let r=n.prev,s=n,o=n.next;if(Nt(r,s,o)>=0)return!1;let a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,d=o.y,f=Math.min(a,l,c),g=Math.min(h,u,d),x=Math.max(a,l,c),m=Math.max(h,u,d),p=Fc(f,g,e,t,i),E=Fc(x,m,e,t,i),w=n.prevZ,v=n.nextZ;for(;w&&w.z>=p&&v&&v.z<=E;){if(w.x>=f&&w.x<=x&&w.y>=g&&w.y<=m&&w!==r&&w!==o&&Ls(a,h,l,u,c,d,w.x,w.y)&&Nt(w.prev,w,w.next)>=0||(w=w.prevZ,v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&Ls(a,h,l,u,c,d,v.x,v.y)&&Nt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;w&&w.z>=p;){if(w.x>=f&&w.x<=x&&w.y>=g&&w.y<=m&&w!==r&&w!==o&&Ls(a,h,l,u,c,d,w.x,w.y)&&Nt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;v&&v.z<=E;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&Ls(a,h,l,u,c,d,v.x,v.y)&&Nt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Hf(n,e){let t=n;do{let i=t.prev,r=t.next.next;!ts(i,r)&&dd(i,t,t.next,r)&&ro(i,r)&&ro(r,i)&&(e.push(i.i,t.i,r.i),so(t),so(t.next),t=n=r),t=t.next}while(t!==n);return ji(t)}function Wf(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&jf(o,a)){let l=fd(o,a);o=ji(o,o.next),l=ji(l,l.next),io(o,e,t,i,r,s,0),io(l,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function Xf(n,e,t,i){let r=[];for(let s=0,o=e.length;s<o;s++){let a=e[s]*i,l=s<o-1?e[s+1]*i:n.length,c=hd(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Qf(c))}r.sort(qf);for(let s=0;s<r.length;s++)t=Yf(r[s],t);return t}function qf(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Yf(n,e){let t=$f(n,e);if(!t)return e;let i=fd(t,n);return ji(i,i.next),ji(t,t.next)}function $f(n,e){let t=e,i=n.x,r=n.y,s=-1/0,o;if(ts(n,t))return t;do{if(ts(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>s&&(s=u,o=t.x<t.next.x?t:t.next,u===i))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&ud(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){let u=Math.abs(r-t.y)/(i-t.x);ro(t,n)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Zf(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Zf(n,e){return Nt(n.prev,n,e.prev)<0&&Nt(e.next,n,n.next)<0}function Jf(n,e,t,i){let r=n;do r.z===0&&(r.z=Fc(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Kf(r)}function Kf(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,t*=2}while(e>1);return n}function Fc(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Qf(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function ud(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function Ls(n,e,t,i,r,s,o,a){return!(n===o&&e===a)&&ud(n,e,t,i,r,s,o,a)}function jf(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!ep(n,e)&&(ro(n,e)&&ro(e,n)&&tp(n,e)&&(Nt(n.prev,n,e.prev)||Nt(n,e.prev,e))||ts(n,e)&&Nt(n.prev,n,n.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ts(n,e){return n.x===e.x&&n.y===e.y}function dd(n,e,t,i){let r=ca(Nt(n,e,t)),s=ca(Nt(n,e,i)),o=ca(Nt(t,i,n)),a=ca(Nt(t,i,e));return!!(r!==s&&o!==a||r===0&&la(n,t,e)||s===0&&la(n,i,e)||o===0&&la(t,n,i)||a===0&&la(t,e,i))}function la(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function ca(n){return n>0?1:n<0?-1:0}function ep(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&dd(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function ro(n,e){return Nt(n.prev,n,n.next)<0?Nt(n,e,n.next)>=0&&Nt(n,n.prev,e)>=0:Nt(n,e,n.prev)<0||Nt(n,n.next,e)<0}function tp(n,e){let t=n,i=!1,r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function fd(n,e){let t=Bc(n.i,n.x,n.y),i=Bc(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function fu(n,e,t,i){let r=Bc(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function so(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Bc(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function np(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}var Oc=class{static triangulate(e,t,i=2){return kf(e,t,i)}},Yi=class n{static area(e){let t=e.length,i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],s=[];pu(e),mu(i,e);let o=e.length;t.forEach(pu);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,mu(i,t[l]);let a=Oc.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}};function pu(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function mu(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var oo=class n extends kt{constructor(e=new es([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new It(r,3)),this.setAttribute("uv",new It(s,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:ip,w,v=!1,R,A,D,N;p&&(w=p.getSpacedPoints(h),v=!0,d=!1,R=p.computeFrenetFrames(h,!1),A=new I,D=new I,N=new I),d||(m=0,f=0,g=0,x=0);let S=a.extractPoints(c),M=S.shape,P=S.holes;if(!Yi.isClockWise(M)){M=M.reverse();for(let z=0,ee=P.length;z<ee;z++){let J=P[z];Yi.isClockWise(J)&&(P[z]=J.reverse())}}function H(z){let J=10000000000000001e-36,Q=z[0];for(let ge=1;ge<=z.length;ge++){let ce=ge%z.length,_e=z[ce],tt=_e.x-Q.x,je=_e.y-Q.y,b=tt*tt+je*je,_=Math.max(Math.abs(_e.x),Math.abs(_e.y),Math.abs(Q.x),Math.abs(Q.y)),O=J*_*_;if(b<=O){z.splice(ce,1),ge--;continue}Q=_e}}H(M),P.forEach(H);let $=P.length,Y=M;for(let z=0;z<$;z++){let ee=P[z];M=M.concat(ee)}function X(z,ee,J){return ee||console.error("THREE.ExtrudeGeometry: vec does not exist"),z.clone().addScaledVector(ee,J)}let oe=M.length;function W(z,ee,J){let Q,ge,ce,_e=z.x-ee.x,tt=z.y-ee.y,je=J.x-z.x,b=J.y-z.y,_=_e*_e+tt*tt,O=_e*b-tt*je;if(Math.abs(O)>Number.EPSILON){let q=Math.sqrt(_),se=Math.sqrt(je*je+b*b),K=ee.x-tt/q,Te=ee.y+_e/q,pe=J.x-b/se,Pe=J.y+je/se,De=((pe-K)*b-(Pe-Te)*je)/(_e*b-tt*je);Q=K+_e*De-z.x,ge=Te+tt*De-z.y;let le=Q*Q+ge*ge;if(le<=2)return new fe(Q,ge);ce=Math.sqrt(le/2)}else{let q=!1;_e>Number.EPSILON?je>Number.EPSILON&&(q=!0):_e<-Number.EPSILON?je<-Number.EPSILON&&(q=!0):Math.sign(tt)===Math.sign(b)&&(q=!0),q?(Q=-tt,ge=_e,ce=Math.sqrt(_)):(Q=_e,ge=tt,ce=Math.sqrt(_/2))}return new fe(Q/ce,ge/ce)}let me=[];for(let z=0,ee=Y.length,J=ee-1,Q=z+1;z<ee;z++,J++,Q++)J===ee&&(J=0),Q===ee&&(Q=0),me[z]=W(Y[z],Y[J],Y[Q]);let ve=[],Ae,ie=me.concat();for(let z=0,ee=$;z<ee;z++){let J=P[z];Ae=[];for(let Q=0,ge=J.length,ce=ge-1,_e=Q+1;Q<ge;Q++,ce++,_e++)ce===ge&&(ce=0),_e===ge&&(_e=0),Ae[Q]=W(J[Q],J[ce],J[_e]);ve.push(Ae),ie=ie.concat(Ae)}let rt;if(m===0)rt=Yi.triangulateShape(Y,P);else{let z=[],ee=[];for(let J=0;J<m;J++){let Q=J/m,ge=f*Math.cos(Q*Math.PI/2),ce=g*Math.sin(Q*Math.PI/2)+x;for(let _e=0,tt=Y.length;_e<tt;_e++){let je=X(Y[_e],me[_e],ce);Oe(je.x,je.y,-ge),Q===0&&z.push(je)}for(let _e=0,tt=$;_e<tt;_e++){let je=P[_e];Ae=ve[_e];let b=[];for(let _=0,O=je.length;_<O;_++){let q=X(je[_],Ae[_],ce);Oe(q.x,q.y,-ge),Q===0&&b.push(q)}Q===0&&ee.push(b)}}rt=Yi.triangulateShape(z,ee)}let ht=rt.length,Re=g+x;for(let z=0;z<oe;z++){let ee=d?X(M[z],ie[z],Re):M[z];v?(D.copy(R.normals[0]).multiplyScalar(ee.x),A.copy(R.binormals[0]).multiplyScalar(ee.y),N.copy(w[0]).add(D).add(A),Oe(N.x,N.y,N.z)):Oe(ee.x,ee.y,0)}for(let z=1;z<=h;z++)for(let ee=0;ee<oe;ee++){let J=d?X(M[ee],ie[ee],Re):M[ee];v?(D.copy(R.normals[z]).multiplyScalar(J.x),A.copy(R.binormals[z]).multiplyScalar(J.y),N.copy(w[z]).add(D).add(A),Oe(N.x,N.y,N.z)):Oe(J.x,J.y,u/h*z)}for(let z=m-1;z>=0;z--){let ee=z/m,J=f*Math.cos(ee*Math.PI/2),Q=g*Math.sin(ee*Math.PI/2)+x;for(let ge=0,ce=Y.length;ge<ce;ge++){let _e=X(Y[ge],me[ge],Q);Oe(_e.x,_e.y,u+J)}for(let ge=0,ce=P.length;ge<ce;ge++){let _e=P[ge];Ae=ve[ge];for(let tt=0,je=_e.length;tt<je;tt++){let b=X(_e[tt],Ae[tt],Q);v?Oe(b.x,b.y+w[h-1].y,w[h-1].x+J):Oe(b.x,b.y,u+J)}}}Z(),te();function Z(){let z=r.length/3;if(d){let ee=0,J=oe*ee;for(let Q=0;Q<ht;Q++){let ge=rt[Q];Ie(ge[2]+J,ge[1]+J,ge[0]+J)}ee=h+m*2,J=oe*ee;for(let Q=0;Q<ht;Q++){let ge=rt[Q];Ie(ge[0]+J,ge[1]+J,ge[2]+J)}}else{for(let ee=0;ee<ht;ee++){let J=rt[ee];Ie(J[2],J[1],J[0])}for(let ee=0;ee<ht;ee++){let J=rt[ee];Ie(J[0]+oe*h,J[1]+oe*h,J[2]+oe*h)}}i.addGroup(z,r.length/3-z,0)}function te(){let z=r.length/3,ee=0;we(Y,ee),ee+=Y.length;for(let J=0,Q=P.length;J<Q;J++){let ge=P[J];we(ge,ee),ee+=ge.length}i.addGroup(z,r.length/3-z,1)}function we(z,ee){let J=z.length;for(;--J>=0;){let Q=J,ge=J-1;ge<0&&(ge=z.length-1);for(let ce=0,_e=h+m*2;ce<_e;ce++){let tt=oe*ce,je=oe*(ce+1),b=ee+Q+tt,_=ee+ge+tt,O=ee+ge+je,q=ee+Q+je;nt(b,_,O,q)}}}function Oe(z,ee,J){l.push(z),l.push(ee),l.push(J)}function Ie(z,ee,J){_t(z),_t(ee),_t(J);let Q=r.length/3,ge=E.generateTopUV(i,r,Q-3,Q-2,Q-1);T(ge[0]),T(ge[1]),T(ge[2])}function nt(z,ee,J,Q){_t(z),_t(ee),_t(Q),_t(ee),_t(J),_t(Q);let ge=r.length/3,ce=E.generateSideWallUV(i,r,ge-6,ge-3,ge-2,ge-1);T(ce[0]),T(ce[1]),T(ce[3]),T(ce[1]),T(ce[2]),T(ce[3])}function _t(z){r.push(l[z*3+0]),r.push(l[z*3+1]),r.push(l[z*3+2])}function T(z){s.push(z.x),s.push(z.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return rp(t,i,e)}static fromJSON(e,t){let i=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=t[e.shapes[s]];i.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Nc[r.type]().fromJSON(r)),new n(i,e.options)}},ip={generateTopUV:function(n,e,t,i,r){let s=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new fe(s,o),new fe(a,l),new fe(c,h)]},generateSideWallUV:function(n,e,t,i,r,s){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[r*3],f=e[r*3+1],g=e[r*3+2],x=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new fe(o,1-l),new fe(c,1-u),new fe(d,1-g),new fe(x,1-p)]:[new fe(a,1-l),new fe(h,1-u),new fe(f,1-g),new fe(m,1-p)]}};function rp(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){let s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var mi=class n extends kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let E=p*d-o;for(let w=0;w<c;w++){let v=w*u-s;g.push(v,-E,0),x.push(0,0,1),m.push(w/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){let w=E+c*p,v=E+c*(p+1),R=E+1+c*(p+1),A=E+1+c*p;f.push(w,v,A),f.push(v,R,A)}this.setIndex(f),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(x,3)),this.setAttribute("uv",new It(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var cn=class n extends kt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new I,d=new I,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){let E=[],w=p/i,v=0;p===0&&o===0?v=.5/t:p===i&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){let A=R/t;u.x=-e*Math.cos(r+A*s)*Math.sin(o+w*a),u.y=e*Math.cos(o+w*a),u.z=e*Math.sin(r+A*s)*Math.sin(o+w*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(A+v,1-w),E.push(c++)}h.push(E)}for(let p=0;p<i;p++)for(let E=0;E<t;E++){let w=h[p][E+1],v=h[p][E],R=h[p+1][E],A=h[p+1][E+1];(p!==0||o>0)&&f.push(w,v,A),(p!==i-1||l<Math.PI)&&f.push(v,R,A)}this.setIndex(f),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(x,3)),this.setAttribute("uv",new It(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ns=class n extends kt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);let o=[],a=[],l=[],c=[],h=new I,u=new I,d=new I;for(let f=0;f<=i;f++)for(let g=0;g<=r;g++){let x=g/r*s,m=f/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/r),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=r;g++){let x=(r+1)*f+g-1,m=(r+1)*(f-1)+g-1,p=(r+1)*(f-1)+g,E=(r+1)*f+g;o.push(x,m,E),o.push(m,p,E)}this.setIndex(o),this.setAttribute("position",new It(a,3)),this.setAttribute("normal",new It(l,3)),this.setAttribute("uv",new It(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Jn=class extends Cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bl,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ao=class extends Jn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new fe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var er=class extends Cn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bl,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Ka,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Pa=class extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ju,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},La=class extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ha(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function sp(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var tr=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Da=class extends tr{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ic,endingEnd:Ic}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Pc:s=e,a=2*t-i;break;case Lc:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Pc:o=e,l=2*i-t;break;case Lc:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-t)/(r-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,E=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,w=(-1-f)*m+(1.5+f)*x+.5*g,v=f*m-f*x;for(let R=0;R!==a;++R)s[R]=p*o[h+R]+E*o[c+R]+w*o[l+R]+v*o[u+R];return s}},Ua=class extends tr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(i-t)/(r-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}},Na=class extends tr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},wn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ha(t,this.TimeBufferType),this.values=ha(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ha(e.times,Array),values:ha(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Na(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Da(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ns:t=this.InterpolantFactoryMethodDiscrete;break;case ma:t=this.InterpolantFactoryMethodLinear;break;case ua:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ns;case this.InterpolantFactoryMethodLinear:return ma;case this.InterpolantFactoryMethodSmooth:return ua}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&sp(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===ua,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(r)l=!0;else{let u=a*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*i,d=o*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=ma;var Li=class extends wn{constructor(e,t,i){super(e,t,i)}};Li.prototype.ValueTypeName="bool";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=Ns;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var Fa=class extends wn{constructor(e,t,i,r){super(e,t,i,r)}};Fa.prototype.ValueTypeName="color";var Ba=class extends wn{constructor(e,t,i,r){super(e,t,i,r)}};Ba.prototype.ValueTypeName="number";var Oa=class extends tr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(r-t),c=e*a;for(let h=c+a;c!==h;c+=4)An.slerpFlat(s,0,o,c-a,o,c,l);return s}},lo=class extends wn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Oa(this.times,this.values,this.getValueSize(),e)}};lo.prototype.ValueTypeName="quaternion";lo.prototype.InterpolantFactoryMethodSmooth=void 0;var Di=class extends wn{constructor(e,t,i){super(e,t,i)}};Di.prototype.ValueTypeName="string";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=Ns;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var za=class extends wn{constructor(e,t,i,r){super(e,t,i,r)}};za.prototype.ValueTypeName="vector";var ka=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},pd=new ka,Va=class{constructor(e){this.manager=e!==void 0?e:pd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Va.DEFAULT_MATERIAL_NAME="__DEFAULT";var nr=class extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},co=class extends nr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Cc=new Mt,gu=new I,xu=new I,ho=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=kn,this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zr,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;gu.setFromMatrixPosition(e.matrixWorld),t.position.copy(gu),xu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xu),t.updateMatrixWorld(),Cc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Cc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zc=class extends ho{constructor(){super(new Qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=Os*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},uo=class extends nr{constructor(e,t,i=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new zc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},_u=new Mt,Ps=new I,Rc=new I,kc=class extends ho{constructor(){super(new Qt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new fe(4,2),this._viewportCount=6,this._viewports=[new St(2,1,1,1),new St(0,1,1,1),new St(3,1,1,1),new St(1,1,1,1),new St(3,0,1,1),new St(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Ps.setFromMatrixPosition(e.matrixWorld),i.position.copy(Ps),Rc.copy(i.position),Rc.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Rc),i.updateMatrixWorld(),r.makeTranslation(-Ps.x,-Ps.y,-Ps.z),_u.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_u,i.coordinateSystem,i.reversedDepth)}},Ui=class extends nr{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new kc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},fo=class extends Hs{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vc=class extends ho{constructor(){super(new fo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},po=class extends nr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Vc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ga=class extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var lh="\\[\\]\\.:\\/",op=new RegExp("["+lh+"]","g"),ch="[^"+lh+"]",ap="[^"+lh.replace("\\.","")+"]",lp=/((?:WC+[\/:])*)/.source.replace("WC",ch),cp=/(WCOD+)?/.source.replace("WCOD",ap),hp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ch),up=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ch),dp=new RegExp("^"+lp+cp+hp+up+"$"),fp=["material","materials","bones","map"],Gc=class{constructor(e,t,i){let r=i||Lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Lt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(op,"")}static parseTrackName(e){let t=dp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);fp.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Lt.Composite=Gc;Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray];Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var m_=new Float32Array(1);var yu=new Mt,mo=class{constructor(e,t,i=0,r=1/0){this.ray=new Ki(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Wr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yu),this}intersectObject(e,t=!0,i=[]){return Hc(e,this,i,t),i.sort(vu),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Hc(e[r],this,i,t);return i.sort(vu),i}};function vu(n,e){return n.distance-e.distance}function Hc(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let o=0,a=s.length;o<a;o++)Hc(s[o],e,t,!0)}}function hh(n,e,t,i){let r=pp(i);switch(t){case eh:return n*e;case sl:return n*e/r.components*r.byteLength;case ol:return n*e/r.components*r.byteLength;case nh:return n*e*2/r.components*r.byteLength;case al:return n*e*2/r.components*r.byteLength;case th:return n*e*3/r.components*r.byteLength;case Rn:return n*e*4/r.components*r.byteLength;case ll:return n*e*4/r.components*r.byteLength;case _o:case yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vo:case Mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hl:case dl:return Math.max(n,16)*Math.max(e,8)/4;case cl:case ul:return Math.max(n,8)*Math.max(e,8)/2;case fl:case pl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ml:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case _l:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case yl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case vl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case bl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case wl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case El:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Al:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Rl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Il:case Pl:case Ll:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Dl:case Ul:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Nl:case Fl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pp(n){switch(n){case kn:case Jc:return{byteLength:1,components:1};case is:case Kc:case rs:return{byteLength:2,components:1};case il:case rl:return{byteLength:2,components:4};case Fi:case nl:case Vn:return{byteLength:4,components:1};case Qc:case jc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Od(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function yp(n){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var vp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ep=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Rp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Up=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,qp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$p=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,jp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif`,em=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,tm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,im=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,om=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,am=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,um=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,dm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,fm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_m=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ym=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Am=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Rm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Im=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Um=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Om=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ym=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$m=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Zm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Km=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;

		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ng=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ig=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,og=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ag=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ug=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,fg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,pg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_g=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,yg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Eg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ag=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ig=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Lg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Og=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Wg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$g=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ot={alphahash_fragment:vp,alphahash_pars_fragment:Mp,alphamap_fragment:Sp,alphamap_pars_fragment:bp,alphatest_fragment:wp,alphatest_pars_fragment:Tp,aomap_fragment:Ep,aomap_pars_fragment:Ap,batching_pars_vertex:Cp,batching_vertex:Rp,begin_vertex:Ip,beginnormal_vertex:Pp,bsdfs:Lp,iridescence_fragment:Dp,bumpmap_pars_fragment:Up,clipping_planes_fragment:Np,clipping_planes_pars_fragment:Fp,clipping_planes_pars_vertex:Bp,clipping_planes_vertex:Op,color_fragment:zp,color_pars_fragment:kp,color_pars_vertex:Vp,color_vertex:Gp,common:Hp,cube_uv_reflection_fragment:Wp,defaultnormal_vertex:Xp,displacementmap_pars_vertex:qp,displacementmap_vertex:Yp,emissivemap_fragment:$p,emissivemap_pars_fragment:Zp,colorspace_fragment:Jp,colorspace_pars_fragment:Kp,envmap_fragment:Qp,envmap_common_pars_fragment:jp,envmap_pars_fragment:em,envmap_pars_vertex:tm,envmap_physical_pars_fragment:dm,envmap_vertex:nm,fog_vertex:im,fog_pars_vertex:rm,fog_fragment:sm,fog_pars_fragment:om,gradientmap_pars_fragment:am,lightmap_pars_fragment:lm,lights_lambert_fragment:cm,lights_lambert_pars_fragment:hm,lights_pars_begin:um,lights_toon_fragment:fm,lights_toon_pars_fragment:pm,lights_phong_fragment:mm,lights_phong_pars_fragment:gm,lights_physical_fragment:xm,lights_physical_pars_fragment:_m,lights_fragment_begin:ym,lights_fragment_maps:vm,lights_fragment_end:Mm,logdepthbuf_fragment:Sm,logdepthbuf_pars_fragment:bm,logdepthbuf_pars_vertex:wm,logdepthbuf_vertex:Tm,map_fragment:Em,map_pars_fragment:Am,map_particle_fragment:Cm,map_particle_pars_fragment:Rm,metalnessmap_fragment:Im,metalnessmap_pars_fragment:Pm,morphinstance_vertex:Lm,morphcolor_vertex:Dm,morphnormal_vertex:Um,morphtarget_pars_vertex:Nm,morphtarget_vertex:Fm,normal_fragment_begin:Bm,normal_fragment_maps:Om,normal_pars_fragment:zm,normal_pars_vertex:km,normal_vertex:Vm,normalmap_pars_fragment:Gm,clearcoat_normal_fragment_begin:Hm,clearcoat_normal_fragment_maps:Wm,clearcoat_pars_fragment:Xm,iridescence_pars_fragment:qm,opaque_fragment:Ym,packing:$m,premultiplied_alpha_fragment:Zm,project_vertex:Jm,dithering_fragment:Km,dithering_pars_fragment:Qm,roughnessmap_fragment:jm,roughnessmap_pars_fragment:eg,shadowmap_pars_fragment:tg,shadowmap_pars_vertex:ng,shadowmap_vertex:ig,shadowmask_pars_fragment:rg,skinbase_vertex:sg,skinning_pars_vertex:og,skinning_vertex:ag,skinnormal_vertex:lg,specularmap_fragment:cg,specularmap_pars_fragment:hg,tonemapping_fragment:ug,tonemapping_pars_fragment:dg,transmission_fragment:fg,transmission_pars_fragment:pg,uv_pars_fragment:mg,uv_pars_vertex:gg,uv_vertex:xg,worldpos_vertex:_g,background_vert:yg,background_frag:vg,backgroundCube_vert:Mg,backgroundCube_frag:Sg,cube_vert:bg,cube_frag:wg,depth_vert:Tg,depth_frag:Eg,distanceRGBA_vert:Ag,distanceRGBA_frag:Cg,equirect_vert:Rg,equirect_frag:Ig,linedashed_vert:Pg,linedashed_frag:Lg,meshbasic_vert:Dg,meshbasic_frag:Ug,meshlambert_vert:Ng,meshlambert_frag:Fg,meshmatcap_vert:Bg,meshmatcap_frag:Og,meshnormal_vert:zg,meshnormal_frag:kg,meshphong_vert:Vg,meshphong_frag:Gg,meshphysical_vert:Hg,meshphysical_frag:Wg,meshtoon_vert:Xg,meshtoon_frag:qg,points_vert:Yg,points_frag:$g,shadow_vert:Zg,shadow_frag:Jg,sprite_vert:Kg,sprite_frag:Qg},be={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},Qn={basic:{uniforms:hn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:hn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new He(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:hn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:hn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:hn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new He(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:hn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:hn([be.points,be.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:hn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:hn([be.common,be.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:hn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:hn([be.sprite,be.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:hn([be.common,be.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:hn([be.lights,be.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};Qn.physical={uniforms:hn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var zl={r:0,b:0,g:0},or=new xn,jg=new Mt;function e0(n,e,t,i,r,s,o){let a=new He(0),l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(w){let v=w.isScene===!0?w.background:null;return v&&v.isTexture&&(v=(w.backgroundBlurriness>0?t:e).get(v)),v}function x(w){let v=!1,R=g(w);R===null?p(a,l):R&&R.isColor&&(p(R,1),v=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,v){let R=g(v);R&&(R.isCubeTexture||R.mapping===go)?(h===void 0&&(h=new wt(new et(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:sr(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,D,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),or.copy(v.backgroundRotation),or.x*=-1,or.y*=-1,or.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(or.y*=-1,or.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(jg.makeRotationFromEuler(or)),h.material.toneMapped=mt.getTransfer(R.colorSpace)!==bt,(u!==R||d!==R.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new wt(new mi(2,2),new mn({name:"BackgroundMaterial",uniforms:sr(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=mt.getTransfer(R.colorSpace)!==bt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=R,d=R.version,f=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,v){w.getRGB(zl,oh(n)),i.buffers.color.setClear(zl.r,zl.g,zl.b,v,o)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,v=1){a.set(w),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(a,l)},render:x,addToRenderList:m,dispose:E}}function t0(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),s=r,o=!1;function a(M,P,k,H,$){let Y=!1,X=u(H,k,P);s!==X&&(s=X,c(s.object)),Y=f(M,H,k,$),Y&&g(M,H,k,$),$!==null&&e.update($,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,v(M,P,k,H),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,P,k){let H=k.wireframe===!0,$=i[M.id];$===void 0&&($={},i[M.id]=$);let Y=$[P.id];Y===void 0&&(Y={},$[P.id]=Y);let X=Y[H];return X===void 0&&(X=d(l()),Y[H]=X),X}function d(M){let P=[],k=[],H=[];for(let $=0;$<t;$++)P[$]=0,k[$]=0,H[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:H,object:M,attributes:{},index:null}}function f(M,P,k,H){let $=s.attributes,Y=P.attributes,X=0,oe=k.getAttributes();for(let W in oe)if(oe[W].location>=0){let ve=$[W],Ae=Y[W];if(Ae===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Ae=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Ae=M.instanceColor)),ve===void 0||ve.attribute!==Ae||Ae&&ve.data!==Ae.data)return!0;X++}return s.attributesNum!==X||s.index!==H}function g(M,P,k,H){let $={},Y=P.attributes,X=0,oe=k.getAttributes();for(let W in oe)if(oe[W].location>=0){let ve=Y[W];ve===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(ve=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(ve=M.instanceColor));let Ae={};Ae.attribute=ve,ve&&ve.data&&(Ae.data=ve.data),$[W]=Ae,X++}s.attributes=$,s.attributesNum=X,s.index=H}function x(){let M=s.newAttributes;for(let P=0,k=M.length;P<k;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){let k=s.newAttributes,H=s.enabledAttributes,$=s.attributeDivisors;k[M]=1,H[M]===0&&(n.enableVertexAttribArray(M),H[M]=1),$[M]!==P&&(n.vertexAttribDivisor(M,P),$[M]=P)}function E(){let M=s.newAttributes,P=s.enabledAttributes;for(let k=0,H=P.length;k<H;k++)P[k]!==M[k]&&(n.disableVertexAttribArray(k),P[k]=0)}function w(M,P,k,H,$,Y,X){X===!0?n.vertexAttribIPointer(M,P,k,$,Y):n.vertexAttribPointer(M,P,k,H,$,Y)}function v(M,P,k,H){x();let $=H.attributes,Y=k.getAttributes(),X=P.defaultAttributeValues;for(let oe in Y){let W=Y[oe];if(W.location>=0){let me=$[oe];if(me===void 0&&(oe==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),oe==="instanceColor"&&M.instanceColor&&(me=M.instanceColor)),me!==void 0){let ve=me.normalized,Ae=me.itemSize,ie=e.get(me);if(ie===void 0)continue;let rt=ie.buffer,ht=ie.type,Re=ie.bytesPerElement,Z=ht===n.INT||ht===n.UNSIGNED_INT||me.gpuType===nl;if(me.isInterleavedBufferAttribute){let te=me.data,we=te.stride,Oe=me.offset;if(te.isInstancedInterleavedBuffer){for(let Ie=0;Ie<W.locationSize;Ie++)p(W.location+Ie,te.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ie=0;Ie<W.locationSize;Ie++)m(W.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let Ie=0;Ie<W.locationSize;Ie++)w(W.location+Ie,Ae/W.locationSize,ht,ve,we*Re,(Oe+Ae/W.locationSize*Ie)*Re,Z)}else{if(me.isInstancedBufferAttribute){for(let te=0;te<W.locationSize;te++)p(W.location+te,me.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let te=0;te<W.locationSize;te++)m(W.location+te);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let te=0;te<W.locationSize;te++)w(W.location+te,Ae/W.locationSize,ht,ve,Ae*Re,Ae/W.locationSize*te*Re,Z)}}else if(X!==void 0){let ve=X[oe];if(ve!==void 0)switch(ve.length){case 2:n.vertexAttrib2fv(W.location,ve);break;case 3:n.vertexAttrib3fv(W.location,ve);break;case 4:n.vertexAttrib4fv(W.location,ve);break;default:n.vertexAttrib1fv(W.location,ve)}}}}E()}function R(){N();for(let M in i){let P=i[M];for(let k in P){let H=P[k];for(let $ in H)h(H[$].object),delete H[$];delete P[k]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;let P=i[M.id];for(let k in P){let H=P[k];for(let $ in H)h(H[$].object),delete H[$];delete P[k]}delete i[M.id]}function D(M){for(let P in i){let k=i[P];if(k[M.id]===void 0)continue;let H=k[M.id];for(let $ in H)h(H[$].object),delete H[$];delete k[M.id]}}function N(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:N,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:m,disableUnusedAttributes:E}}function n0(n,e,t){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,i,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function i0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(D){return!(D!==Rn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){let N=D===rs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==kn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Vn&&!N)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:v,vertexTextures:R,maxSamples:A}}function r0(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Xn,a=new it,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||r;return r=d,i=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{let E=s?0:i,w=E*4,v=p.clippingState||null;l.value=v,v=h(g,d,w,f);for(let R=0;R!==w;++R)v[R]=t[R];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,v=f;w!==x;++w,v+=4)o.copy(u[w]).applyMatrix4(E,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function s0(n){let e=new WeakMap;function t(o,a){return a===ja?o.mapping=ir:a===el&&(o.mapping=rr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===ja||a===el)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Ma(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var ls=4,md=[.125,.215,.35,.446,.526,.582],cr=20,uh=new fo,gd=new He,dh=null,fh=0,ph=0,mh=!1,lr=(1+Math.sqrt(5))/2,as=1/lr,xd=[new I(-lr,as,0),new I(lr,as,0),new I(-as,0,lr),new I(as,0,lr),new I(0,lr,-as),new I(0,lr,as),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],o0=new I,hs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=o0}=s;dh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),ph=this._renderer.getActiveMipmapLevel(),mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(dh,fh,ph),this._renderer.xr.enabled=mh,e.scissorTest=!1,kl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ir||e.mapping===rr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),dh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),ph=this._renderer.getActiveMipmapLevel(),mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:zn,minFilter:zn,generateMipmaps:!1,type:rs,format:Rn,colorSpace:Ji,depthBuffer:!1},r=_d(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_d(e,t,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=a0(s)),this._blurMaterial=l0(s,e,t)}return r}_compileMaterial(e){let t=new wt(this._lodPlanes[0],e);this._renderer.compile(t,uh)}_sceneToCubeUV(e,t,i,r,s){let l=new Qt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(gd),u.toneMapping=xi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null));let x=new Ft({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),m=new wt(new et,x),p=!1,E=e.background;E?E.isColor&&(x.color.copy(E),e.background=null,p=!0):(x.color.copy(gd),p=!0);for(let w=0;w<6;w++){let v=w%3;v===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[w],s.y,s.z)):v===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[w]));let R=this._cubeSize;kl(r,v*R,w>2?R:0,R,R),u.setRenderTarget(r),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=E}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===ir||e.mapping===rr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=vd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yd());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new wt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;kl(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,uh)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=xd[(r-s-1)%xd.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new wt(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*cr-1),x=s/g,m=isFinite(s)?1+Math.floor(h*x):cr;m>cr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${cr}`);let p=[],E=0;for(let D=0;D<cr;++D){let N=D/x,S=Math.exp(-N*N/2);p.push(S),D===0?E+=S:D<m&&(E+=2*S)}for(let D=0;D<p.length;D++)p[D]=p[D]/E;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:w}=this;d.dTheta.value=g,d.mipInt.value=w-i;let v=this._sizeLods[r],R=3*v*(r>w-ls?r-w+ls:0),A=4*(this._cubeSize-v);kl(t,R,A,3*v,2*v),l.setRenderTarget(t),l.render(u,uh)}};function a0(n){let e=[],t=[],i=[],r=n,s=n-ls+1+md.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ls?l=md[o-n+ls-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,E=new Float32Array(x*g*f),w=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let A=0;A<f;A++){let D=A%3*2/3-1,N=A>2?0:-1,S=[D,N,0,D+2/3,N,0,D+2/3,N+1,0,D,N,0,D+2/3,N+1,0,D,N+1,0];E.set(S,x*g*A),w.set(d,m*g*A);let M=[A,A,A,A,A,A];v.set(M,p*g*A)}let R=new kt;R.setAttribute("position",new zt(E,x)),R.setAttribute("uv",new zt(w,m)),R.setAttribute("faceIndex",new zt(v,p)),e.push(R),r>ls&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function _d(n,e,t){let i=new Yn(n,e,t);return i.texture.mapping=go,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function kl(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function l0(n,e,t){let i=new Float32Array(cr),r=new I(0,1,0);return new mn({name:"SphericalGaussianBlur",defines:{n:cr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Th(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function yd(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Th(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function vd(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Th(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Th(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function c0(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===ja||l===el,h=l===ir||l===rr;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new hs(n)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&r(f)?(t===null&&(t=new hs(n)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function h0(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Gr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function u0(n,e,t,i){let r={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let E=f.array;x=f.version;for(let w=0,v=E.length;w<v;w+=3){let R=E[w+0],A=E[w+1],D=E[w+2];d.push(R,A,A,D,D,R)}}else if(g!==void 0){let E=g.array;x=g.version;for(let w=0,v=E.length/3-1;w<v;w+=3){let R=w+0,A=w+1,D=w+2;d.push(R,A,A,D,D,R)}}else return;let m=new(sh(d)?Gs:Vs)(d,1);m.version=x;let p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function d0(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){n.drawElements(i,f,s,d*o),t.update(f,i,1)}function c(d,f,g){g!==0&&(n.drawElementsInstanced(i,f,s,d*o,g),t.update(f,i,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function u(d,f,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,d,0,x,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*x[E];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function f0(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function p0(n,e,t){let i=new WeakMap,r=new St;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let S=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],w=0;f===!0&&(w=1),g===!0&&(w=2),x===!0&&(w=3);let v=a.attributes.position.count*w,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let A=new Float32Array(v*R*4*u),D=new ks(A,v,R,u);D.type=Vn,D.needsUpdate=!0;let N=w*4;for(let M=0;M<u;M++){let P=m[M],k=p[M],H=E[M],$=v*R*4*M;for(let Y=0;Y<P.count;Y++){let X=Y*N;f===!0&&(r.fromBufferAttribute(P,Y),A[$+X+0]=r.x,A[$+X+1]=r.y,A[$+X+2]=r.z,A[$+X+3]=0),g===!0&&(r.fromBufferAttribute(k,Y),A[$+X+4]=r.x,A[$+X+5]=r.y,A[$+X+6]=r.z,A[$+X+7]=0),x===!0&&(r.fromBufferAttribute(H,Y),A[$+X+8]=r.x,A[$+X+9]=r.y,A[$+X+10]=r.z,A[$+X+11]=H.itemSize===4?r.w:1)}}d={count:u,texture:D,size:new fe(v,R)},i.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function m0(n,e,t,i){let r=new WeakMap;function s(l){let c=i.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var zd=new pn,Md=new Js(1,1),kd=new ks,Vd=new ya,Gd=new Ws,Sd=[],bd=[],wd=new Float32Array(16),Td=new Float32Array(9),Ed=new Float32Array(4);function us(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=Sd[r];if(s===void 0&&(s=new Float32Array(r),Sd[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function qt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Hl(n,e){let t=bd[e];t===void 0&&(t=new Int32Array(e),bd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function g0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function x0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2fv(this.addr,e),Yt(t,e)}}function _0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;n.uniform3fv(this.addr,e),Yt(t,e)}}function y0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4fv(this.addr,e),Yt(t,e)}}function v0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,i))return;Ed.set(i),n.uniformMatrix2fv(this.addr,!1,Ed),Yt(t,i)}}function M0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,i))return;Td.set(i),n.uniformMatrix3fv(this.addr,!1,Td),Yt(t,i)}}function S0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,i))return;wd.set(i),n.uniformMatrix4fv(this.addr,!1,wd),Yt(t,i)}}function b0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function w0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2iv(this.addr,e),Yt(t,e)}}function T0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;n.uniform3iv(this.addr,e),Yt(t,e)}}function E0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4iv(this.addr,e),Yt(t,e)}}function A0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function C0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2uiv(this.addr,e),Yt(t,e)}}function R0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;n.uniform3uiv(this.addr,e),Yt(t,e)}}function I0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4uiv(this.addr,e),Yt(t,e)}}function P0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Md.compareFunction=ih,s=Md):s=zd,t.setTexture2D(e||s,r)}function L0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Vd,r)}function D0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Gd,r)}function U0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||kd,r)}function N0(n){switch(n){case 5126:return g0;case 35664:return x0;case 35665:return _0;case 35666:return y0;case 35674:return v0;case 35675:return M0;case 35676:return S0;case 5124:case 35670:return b0;case 35667:case 35671:return w0;case 35668:case 35672:return T0;case 35669:case 35673:return E0;case 5125:return A0;case 36294:return C0;case 36295:return R0;case 36296:return I0;case 35678:case 36198:case 36298:case 36306:case 35682:return P0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return U0}}function F0(n,e){n.uniform1fv(this.addr,e)}function B0(n,e){let t=us(e,this.size,2);n.uniform2fv(this.addr,t)}function O0(n,e){let t=us(e,this.size,3);n.uniform3fv(this.addr,t)}function z0(n,e){let t=us(e,this.size,4);n.uniform4fv(this.addr,t)}function k0(n,e){let t=us(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function V0(n,e){let t=us(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function G0(n,e){let t=us(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function H0(n,e){n.uniform1iv(this.addr,e)}function W0(n,e){n.uniform2iv(this.addr,e)}function X0(n,e){n.uniform3iv(this.addr,e)}function q0(n,e){n.uniform4iv(this.addr,e)}function Y0(n,e){n.uniform1uiv(this.addr,e)}function $0(n,e){n.uniform2uiv(this.addr,e)}function Z0(n,e){n.uniform3uiv(this.addr,e)}function J0(n,e){n.uniform4uiv(this.addr,e)}function K0(n,e,t){let i=this.cache,r=e.length,s=Hl(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||zd,s[o])}function Q0(n,e,t){let i=this.cache,r=e.length,s=Hl(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Vd,s[o])}function j0(n,e,t){let i=this.cache,r=e.length,s=Hl(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Gd,s[o])}function ex(n,e,t){let i=this.cache,r=e.length,s=Hl(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||kd,s[o])}function tx(n){switch(n){case 5126:return F0;case 35664:return B0;case 35665:return O0;case 35666:return z0;case 35674:return k0;case 35675:return V0;case 35676:return G0;case 5124:case 35670:return H0;case 35667:case 35671:return W0;case 35668:case 35672:return X0;case 35669:case 35673:return q0;case 5125:return Y0;case 36294:return $0;case 36295:return Z0;case 36296:return J0;case 35678:case 36198:case 36298:case 36306:case 35682:return K0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return j0;case 36289:case 36303:case 36311:case 36292:return ex}}var xh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=N0(t.type)}},_h=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tx(t.type)}},yh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},gh=/(\w+)(\])?(\[|\.)?/g;function Ad(n,e){n.seq.push(e),n.map[e.id]=e}function nx(n,e,t){let i=n.name,r=i.length;for(gh.lastIndex=0;;){let s=gh.exec(i),o=gh.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Ad(t,c===void 0?new xh(a,n,e):new _h(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new yh(a),Ad(t,u)),t=u}}}var cs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);nx(s,o,this)}}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function Cd(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var ix=37297,rx=0;function sx(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var Rd=new it;function ox(n){mt._getMatrix(Rd,mt.workingColorSpace,n);let e=`mat3( ${Rd.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(n)){case Fs:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Id(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+sx(n.getShaderSource(e),a)}else return s}function ax(n,e){let t=ox(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function lx(n,e){let t;switch(e){case Hu:t="Linear";break;case Wu:t="Reinhard";break;case Xu:t="Cineon";break;case Qa:t="ACESFilmic";break;case Yu:t="AgX";break;case $u:t="Neutral";break;case qu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Vl=new I;function cx(){mt.getLuminanceCoefficients(Vl);let n=Vl.x.toFixed(4),e=Vl.y.toFixed(4),t=Vl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(So).join(`
`)}function ux(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function dx(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function So(n){return n!==""}function Pd(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ld(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var fx=/^[ \t]*#include +<([\w\d./]+)>/gm;function vh(n){return n.replace(fx,mx)}var px=new Map;function mx(n,e){let t=ot[e];if(t===void 0){let i=px.get(e);if(i!==void 0)t=ot[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return vh(t)}var gx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dd(n){return n.replace(gx,xx)}function xx(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ud(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function _x(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Xc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ha?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Kn&&(e="SHADOWMAP_TYPE_VSM"),e}function yx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ir:case rr:e="ENVMAP_TYPE_CUBE";break;case go:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case rr:e="ENVMAP_MODE_REFRACTION";break}return e}function Mx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ka:e="ENVMAP_BLENDING_MULTIPLY";break;case Vu:e="ENVMAP_BLENDING_MIX";break;case Gu:e="ENVMAP_BLENDING_ADD";break}return e}function Sx(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function bx(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=_x(t),c=yx(t),h=vx(t),u=Mx(t),d=Sx(t),f=hx(t),g=ux(s),x=r.createProgram(),m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(So).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(So).join(`
`),p.length>0&&(p+=`
`)):(m=[Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(So).join(`
`),p=[Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xi?"#define TONE_MAPPING":"",t.toneMapping!==xi?ot.tonemapping_pars_fragment:"",t.toneMapping!==xi?lx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,ax("linearToOutputTexel",t.outputColorSpace),cx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(So).join(`
`)),o=vh(o),o=Pd(o,t),o=Ld(o,t),a=vh(a),a=Pd(a,t),a=Ld(a,t),o=Dd(o),a=Dd(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=E+m+o,v=E+p+a,R=Cd(r,r.VERTEX_SHADER,w),A=Cd(r,r.FRAGMENT_SHADER,v);r.attachShader(x,R),r.attachShader(x,A),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function D(P){if(n.debug.checkShaderErrors){let k=r.getProgramInfoLog(x)||"",H=r.getShaderInfoLog(R)||"",$=r.getShaderInfoLog(A)||"",Y=k.trim(),X=H.trim(),oe=$.trim(),W=!0,me=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,A);else{let ve=Id(r,R,"vertex"),Ae=Id(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+Y+`
`+ve+`
`+Ae)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(X===""||oe==="")&&(me=!1);me&&(P.diagnostics={runnable:W,programLog:Y,vertexShader:{log:X,prefix:m},fragmentShader:{log:oe,prefix:p}})}r.deleteShader(R),r.deleteShader(A),N=new cs(r,x),S=dx(r,x)}let N;this.getUniforms=function(){return N===void 0&&D(this),N};let S;this.getAttributes=function(){return S===void 0&&D(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(x,ix)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=A,this}var wx=0,Mh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Sh(e),t.set(e,i)),i}},Sh=class{constructor(e){this.id=wx++,this.code=e,this.usedTimes=0}};function Tx(n,e,t,i,r,s,o){let a=new Wr,l=new Mh,c=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,M,P,k,H){let $=k.fog,Y=H.geometry,X=S.isMeshStandardMaterial?k.environment:null,oe=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),W=oe&&oe.mapping===go?oe.image.height:null,me=g[S.type];S.precision!==null&&(f=r.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let ve=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ae=ve!==void 0?ve.length:0,ie=0;Y.morphAttributes.position!==void 0&&(ie=1),Y.morphAttributes.normal!==void 0&&(ie=2),Y.morphAttributes.color!==void 0&&(ie=3);let rt,ht,Re,Z;if(me){let ft=Qn[me];rt=ft.vertexShader,ht=ft.fragmentShader}else rt=S.vertexShader,ht=S.fragmentShader,l.update(S),Re=l.getVertexShaderID(S),Z=l.getFragmentShaderID(S);let te=n.getRenderTarget(),we=n.state.buffers.depth.getReversed(),Oe=H.isInstancedMesh===!0,Ie=H.isBatchedMesh===!0,nt=!!S.map,_t=!!S.matcap,T=!!oe,z=!!S.aoMap,ee=!!S.lightMap,J=!!S.bumpMap,Q=!!S.normalMap,ge=!!S.displacementMap,ce=!!S.emissiveMap,_e=!!S.metalnessMap,tt=!!S.roughnessMap,je=S.anisotropy>0,b=S.clearcoat>0,_=S.dispersion>0,O=S.iridescence>0,q=S.sheen>0,se=S.transmission>0,K=je&&!!S.anisotropyMap,Te=b&&!!S.clearcoatMap,pe=b&&!!S.clearcoatNormalMap,Pe=b&&!!S.clearcoatRoughnessMap,De=O&&!!S.iridescenceMap,le=O&&!!S.iridescenceThicknessMap,Me=q&&!!S.sheenColorMap,Je=q&&!!S.sheenRoughnessMap,ze=!!S.specularMap,Se=!!S.specularColorMap,Ke=!!S.specularIntensityMap,U=se&&!!S.transmissionMap,de=se&&!!S.thicknessMap,xe=!!S.gradientMap,Ee=!!S.alphaMap,ae=S.alphaTest>0,ne=!!S.alphaHash,Fe=!!S.extensions,Qe=xi;S.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Qe=n.toneMapping);let Be={shaderID:me,shaderType:S.type,shaderName:S.name,vertexShader:rt,fragmentShader:ht,defines:S.defines,customVertexShaderID:Re,customFragmentShaderID:Z,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ie,batchingColor:Ie&&H._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&H.instanceColor!==null,instancingMorph:Oe&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ji,alphaToCoverage:!!S.alphaToCoverage,map:nt,matcap:_t,envMap:T,envMapMode:T&&oe.mapping,envMapCubeUVHeight:W,aoMap:z,lightMap:ee,bumpMap:J,normalMap:Q,displacementMap:d&&ge,emissiveMap:ce,normalMapObjectSpace:Q&&S.normalMapType===Qu,normalMapTangentSpace:Q&&S.normalMapType===Bl,metalnessMap:_e,roughnessMap:tt,anisotropy:je,anisotropyMap:K,clearcoat:b,clearcoatMap:Te,clearcoatNormalMap:pe,clearcoatRoughnessMap:Pe,dispersion:_,iridescence:O,iridescenceMap:De,iridescenceThicknessMap:le,sheen:q,sheenColorMap:Me,sheenRoughnessMap:Je,specularMap:ze,specularColorMap:Se,specularIntensityMap:Ke,transmission:se,transmissionMap:U,thicknessMap:de,gradientMap:xe,opaque:S.transparent===!1&&S.blending===$i&&S.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ae,alphaHash:ne,combine:S.combine,mapUv:nt&&x(S.map.channel),aoMapUv:z&&x(S.aoMap.channel),lightMapUv:ee&&x(S.lightMap.channel),bumpMapUv:J&&x(S.bumpMap.channel),normalMapUv:Q&&x(S.normalMap.channel),displacementMapUv:ge&&x(S.displacementMap.channel),emissiveMapUv:ce&&x(S.emissiveMap.channel),metalnessMapUv:_e&&x(S.metalnessMap.channel),roughnessMapUv:tt&&x(S.roughnessMap.channel),anisotropyMapUv:K&&x(S.anisotropyMap.channel),clearcoatMapUv:Te&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:pe&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:le&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Je&&x(S.sheenRoughnessMap.channel),specularMapUv:ze&&x(S.specularMap.channel),specularColorMapUv:Se&&x(S.specularColorMap.channel),specularIntensityMapUv:Ke&&x(S.specularIntensityMap.channel),transmissionMapUv:U&&x(S.transmissionMap.channel),thicknessMapUv:de&&x(S.thicknessMap.channel),alphaMapUv:Ee&&x(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Q||je),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Y.attributes.uv&&(nt||Ee),fog:!!$,useFog:S.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:we,skinning:H.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:ie,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Qe,decodeVideoTexture:nt&&S.map.isVideoTexture===!0&&mt.getTransfer(S.map.colorSpace)===bt,decodeVideoTextureEmissive:ce&&S.emissiveMap.isVideoTexture===!0&&mt.getTransfer(S.emissiveMap.colorSpace)===bt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Tn,flipSided:S.side===Xt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Fe&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&S.extensions.multiDraw===!0||Ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(E(M,S),w(M,S),M.push(n.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function E(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function w(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){let M=g[S.type],P;if(M){let k=Qn[M];P=Ol.clone(k.uniforms)}else P=S.uniforms;return P}function R(S,M){let P;for(let k=0,H=h.length;k<H;k++){let $=h[k];if($.cacheKey===M){P=$,++P.usedTimes;break}}return P===void 0&&(P=new bx(n,M,S,s),h.push(P)),P}function A(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function D(S){l.remove(S)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:A,releaseShaderCache:D,programs:h,dispose:N}}function Ex(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Ax(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Nd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Fd(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(u,d,f,g,x,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),e++,p}function a(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?i.push(p):f.transparent===!0?r.push(p):t.push(p)}function l(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?i.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Ax),i.length>1&&i.sort(d||Nd),r.length>1&&r.sort(d||Nd)}function h(){for(let u=e,d=n.length;u<d;u++){let f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Cx(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new Fd,n.set(i,[o])):r>=s.length?(o=new Fd,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Rx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new He};break;case"SpotLight":t={position:new I,direction:new I,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function Ix(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var Px=0;function Lx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Dx(n){let e=new Rx,t=Ix(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);let r=new I,s=new Mt,o=new Mt;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,E=0,w=0,v=0,R=0,A=0,D=0;c.sort(Lx);for(let S=0,M=c.length;S<M;S++){let P=c[S],k=P.color,H=P.intensity,$=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=k.r*H,u+=k.g*H,d+=k.b*H;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],H);D++}else if(P.isDirectionalLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let oe=P.shadow,W=t.get(P);W.shadowIntensity=oe.intensity,W.shadowBias=oe.bias,W.shadowNormalBias=oe.normalBias,W.shadowRadius=oe.radius,W.shadowMapSize=oe.mapSize,i.directionalShadow[f]=W,i.directionalShadowMap[f]=Y,i.directionalShadowMatrix[f]=P.shadow.matrix,E++}i.directional[f]=X,f++}else if(P.isSpotLight){let X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(k).multiplyScalar(H),X.distance=$,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[x]=X;let oe=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,oe.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[x]=oe.matrix,P.castShadow){let W=t.get(P);W.shadowIntensity=oe.intensity,W.shadowBias=oe.bias,W.shadowNormalBias=oe.normalBias,W.shadowRadius=oe.radius,W.shadowMapSize=oe.mapSize,i.spotShadow[x]=W,i.spotShadowMap[x]=Y,v++}x++}else if(P.isRectAreaLight){let X=e.get(P);X.color.copy(k).multiplyScalar(H),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=X,m++}else if(P.isPointLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let oe=P.shadow,W=t.get(P);W.shadowIntensity=oe.intensity,W.shadowBias=oe.bias,W.shadowNormalBias=oe.normalBias,W.shadowRadius=oe.radius,W.shadowMapSize=oe.mapSize,W.shadowCameraNear=oe.camera.near,W.shadowCameraFar=oe.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=Y,i.pointShadowMatrix[g]=P.shadow.matrix,w++}i.point[g]=X,g++}else if(P.isHemisphereLight){let X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(H),X.groundColor.copy(P.groundColor).multiplyScalar(H),i.hemi[p]=X,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let N=i.hash;(N.directionalLength!==f||N.pointLength!==g||N.spotLength!==x||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==E||N.numPointShadows!==w||N.numSpotShadows!==v||N.numSpotMaps!==R||N.numLightProbes!==D)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=v+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=D,N.directionalLength=f,N.pointLength=g,N.spotLength=x,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=E,N.numPointShadows=w,N.numSpotShadows=v,N.numSpotMaps=R,N.numLightProbes=D,i.version=Px++)}function l(c,h){let u=0,d=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){let w=c[p];if(w.isDirectionalLight){let v=i.directional[u];v.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),u++}else if(w.isSpotLight){let v=i.spot[f];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),f++}else if(w.isRectAreaLight){let v=i.rectArea[g];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(w.width*.5,0,0),v.halfHeight.set(0,w.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let v=i.point[d];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){let v=i.hemi[x];v.direction.setFromMatrixPosition(w.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function Bd(n){let e=new Dx(n),t=[],i=[];function r(h){c.camera=h,t.length=0,i.length=0}function s(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Ux(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Bd(n),e.set(r,[a])):s>=o.length?(a=new Bd(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var Nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Bx(n,e,t){let i=new Zr,r=new fe,s=new fe,o=new St,a=new Pa({depthPacking:Ku}),l=new La,c={},h=t.maxTextureSize,u={[di]:Xt,[Xt]:di,[Tn]:Tn},d=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:Nx,fragmentShader:Fx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new kt;g.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new wt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xc;let p=this.type;this.render=function(A,D,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let S=n.getRenderTarget(),M=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),k=n.state;k.setBlending(gi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let H=p!==Kn&&this.type===Kn,$=p===Kn&&this.type!==Kn;for(let Y=0,X=A.length;Y<X;Y++){let oe=A[Y],W=oe.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let me=W.getFrameExtents();if(r.multiply(me),s.copy(W.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/me.x),r.x=s.x*me.x,W.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/me.y),r.y=s.y*me.y,W.mapSize.y=s.y)),W.map===null||H===!0||$===!0){let Ae=this.type!==Kn?{minFilter:gn,magFilter:gn}:{};W.map!==null&&W.map.dispose(),W.map=new Yn(r.x,r.y,Ae),W.map.texture.name=oe.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();let ve=W.getViewportCount();for(let Ae=0;Ae<ve;Ae++){let ie=W.getViewport(Ae);o.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),k.viewport(o),W.updateMatrices(oe,Ae),i=W.getFrustum(),v(D,N,W.camera,oe,this.type)}W.isPointLightShadow!==!0&&this.type===Kn&&E(W,N),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(S,M,P)};function E(A,D){let N=e.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Yn(r.x,r.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,N,d,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,N,f,x,null)}function w(A,D,N,S){let M=null,P=N.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)M=P;else if(M=N.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){let k=M.uuid,H=D.uuid,$=c[k];$===void 0&&($={},c[k]=$);let Y=$[H];Y===void 0&&(Y=M.clone(),$[H]=Y,D.addEventListener("dispose",R)),M=Y}if(M.visible=D.visible,M.wireframe=D.wireframe,S===Kn?M.side=D.shadowSide!==null?D.shadowSide:D.side:M.side=D.shadowSide!==null?D.shadowSide:u[D.side],M.alphaMap=D.alphaMap,M.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,M.map=D.map,M.clipShadows=D.clipShadows,M.clippingPlanes=D.clippingPlanes,M.clipIntersection=D.clipIntersection,M.displacementMap=D.displacementMap,M.displacementScale=D.displacementScale,M.displacementBias=D.displacementBias,M.wireframeLinewidth=D.wireframeLinewidth,M.linewidth=D.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let k=n.properties.get(M);k.light=N}return M}function v(A,D,N,S,M){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Kn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,A.matrixWorld);let H=e.update(A),$=A.material;if(Array.isArray($)){let Y=H.groups;for(let X=0,oe=Y.length;X<oe;X++){let W=Y[X],me=$[W.materialIndex];if(me&&me.visible){let ve=w(A,me,S,M);A.onBeforeShadow(n,A,D,N,H,ve,W),n.renderBufferDirect(N,null,H,ve,A,W),A.onAfterShadow(n,A,D,N,H,ve,W)}}}else if($.visible){let Y=w(A,$,S,M);A.onBeforeShadow(n,A,D,N,H,Y,null),n.renderBufferDirect(N,null,H,Y,A,null),A.onAfterShadow(n,A,D,N,H,Y,null)}}let k=A.children;for(let H=0,$=k.length;H<$;H++)v(k[H],D,N,S,M)}function R(A){A.target.removeEventListener("dispose",R);for(let N in c){let S=c[N],M=A.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var Ox={[Wa]:Xa,[qa]:Za,[Ya]:Ja,[Zi]:$a,[Xa]:Wa,[Za]:qa,[Ja]:Ya,[$a]:Zi};function zx(n,e){function t(){let U=!1,de=new St,xe=null,Ee=new St(0,0,0,0);return{setMask:function(ae){xe!==ae&&!U&&(n.colorMask(ae,ae,ae,ae),xe=ae)},setLocked:function(ae){U=ae},setClear:function(ae,ne,Fe,Qe,Be){Be===!0&&(ae*=Qe,ne*=Qe,Fe*=Qe),de.set(ae,ne,Fe,Qe),Ee.equals(de)===!1&&(n.clearColor(ae,ne,Fe,Qe),Ee.copy(de))},reset:function(){U=!1,xe=null,Ee.set(-1,0,0,0)}}}function i(){let U=!1,de=!1,xe=null,Ee=null,ae=null;return{setReversed:function(ne){if(de!==ne){let Fe=e.get("EXT_clip_control");ne?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),de=ne;let Qe=ae;ae=null,this.setClear(Qe)}},getReversed:function(){return de},setTest:function(ne){ne?te(n.DEPTH_TEST):we(n.DEPTH_TEST)},setMask:function(ne){xe!==ne&&!U&&(n.depthMask(ne),xe=ne)},setFunc:function(ne){if(de&&(ne=Ox[ne]),Ee!==ne){switch(ne){case Wa:n.depthFunc(n.NEVER);break;case Xa:n.depthFunc(n.ALWAYS);break;case qa:n.depthFunc(n.LESS);break;case Zi:n.depthFunc(n.LEQUAL);break;case Ya:n.depthFunc(n.EQUAL);break;case $a:n.depthFunc(n.GEQUAL);break;case Za:n.depthFunc(n.GREATER);break;case Ja:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=ne}},setLocked:function(ne){U=ne},setClear:function(ne){ae!==ne&&(de&&(ne=1-ne),n.clearDepth(ne),ae=ne)},reset:function(){U=!1,xe=null,Ee=null,ae=null,de=!1}}}function r(){let U=!1,de=null,xe=null,Ee=null,ae=null,ne=null,Fe=null,Qe=null,Be=null;return{setTest:function(ft){U||(ft?te(n.STENCIL_TEST):we(n.STENCIL_TEST))},setMask:function(ft){de!==ft&&!U&&(n.stencilMask(ft),de=ft)},setFunc:function(ft,Ln,_n){(xe!==ft||Ee!==Ln||ae!==_n)&&(n.stencilFunc(ft,Ln,_n),xe=ft,Ee=Ln,ae=_n)},setOp:function(ft,Ln,_n){(ne!==ft||Fe!==Ln||Qe!==_n)&&(n.stencilOp(ft,Ln,_n),ne=ft,Fe=Ln,Qe=_n)},setLocked:function(ft){U=ft},setClear:function(ft){Be!==ft&&(n.clearStencil(ft),Be=ft)},reset:function(){U=!1,de=null,xe=null,Ee=null,ae=null,ne=null,Fe=null,Qe=null,Be=null}}}let s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,E=null,w=null,v=null,R=null,A=null,D=new He(0,0,0),N=0,S=!1,M=null,P=null,k=null,H=null,$=null,Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,oe=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=oe>=1):W.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=oe>=2);let me=null,ve={},Ae=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),rt=new St().fromArray(Ae),ht=new St().fromArray(ie);function Re(U,de,xe,Ee){let ae=new Uint8Array(4),ne=n.createTexture();n.bindTexture(U,ne),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Fe=0;Fe<xe;Fe++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,ae):n.texImage2D(de+Fe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ae);return ne}let Z={};Z[n.TEXTURE_2D]=Re(n.TEXTURE_2D,n.TEXTURE_2D,1),Z[n.TEXTURE_CUBE_MAP]=Re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[n.TEXTURE_2D_ARRAY]=Re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Z[n.TEXTURE_3D]=Re(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),te(n.DEPTH_TEST),o.setFunc(Zi),J(!1),Q(Wc),te(n.CULL_FACE),z(gi);function te(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function we(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function Oe(U,de){return u[U]!==de?(n.bindFramebuffer(U,de),u[U]=de,U===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=de),U===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=de),!0):!1}function Ie(U,de){let xe=f,Ee=!1;if(U){xe=d.get(de),xe===void 0&&(xe=[],d.set(de,xe));let ae=U.textures;if(xe.length!==ae.length||xe[0]!==n.COLOR_ATTACHMENT0){for(let ne=0,Fe=ae.length;ne<Fe;ne++)xe[ne]=n.COLOR_ATTACHMENT0+ne;xe.length=ae.length,Ee=!0}}else xe[0]!==n.BACK&&(xe[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(xe)}function nt(U){return g!==U?(n.useProgram(U),g=U,!0):!1}let _t={[Ii]:n.FUNC_ADD,[wu]:n.FUNC_SUBTRACT,[Tu]:n.FUNC_REVERSE_SUBTRACT};_t[Eu]=n.MIN,_t[Au]=n.MAX;let T={[Cu]:n.ZERO,[Ru]:n.ONE,[Iu]:n.SRC_COLOR,[da]:n.SRC_ALPHA,[Fu]:n.SRC_ALPHA_SATURATE,[Uu]:n.DST_COLOR,[Lu]:n.DST_ALPHA,[Pu]:n.ONE_MINUS_SRC_COLOR,[fa]:n.ONE_MINUS_SRC_ALPHA,[Nu]:n.ONE_MINUS_DST_COLOR,[Du]:n.ONE_MINUS_DST_ALPHA,[Bu]:n.CONSTANT_COLOR,[Ou]:n.ONE_MINUS_CONSTANT_COLOR,[zu]:n.CONSTANT_ALPHA,[ku]:n.ONE_MINUS_CONSTANT_ALPHA};function z(U,de,xe,Ee,ae,ne,Fe,Qe,Be,ft){if(U===gi){x===!0&&(we(n.BLEND),x=!1);return}if(x===!1&&(te(n.BLEND),x=!0),U!==bu){if(U!==m||ft!==S){if((p!==Ii||v!==Ii)&&(n.blendEquation(n.FUNC_ADD),p=Ii,v=Ii),ft)switch(U){case $i:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qc:n.blendFunc(n.ONE,n.ONE);break;case Yc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case $c:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case $i:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Yc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $c:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,w=null,R=null,A=null,D.set(0,0,0),N=0,m=U,S=ft}return}ae=ae||de,ne=ne||xe,Fe=Fe||Ee,(de!==p||ae!==v)&&(n.blendEquationSeparate(_t[de],_t[ae]),p=de,v=ae),(xe!==E||Ee!==w||ne!==R||Fe!==A)&&(n.blendFuncSeparate(T[xe],T[Ee],T[ne],T[Fe]),E=xe,w=Ee,R=ne,A=Fe),(Qe.equals(D)===!1||Be!==N)&&(n.blendColor(Qe.r,Qe.g,Qe.b,Be),D.copy(Qe),N=Be),m=U,S=!1}function ee(U,de){U.side===Tn?we(n.CULL_FACE):te(n.CULL_FACE);let xe=U.side===Xt;de&&(xe=!xe),J(xe),U.blending===$i&&U.transparent===!1?z(gi):z(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);let Ee=U.stencilWrite;a.setTest(Ee),Ee&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ce(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):we(n.SAMPLE_ALPHA_TO_COVERAGE)}function J(U){M!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),M=U)}function Q(U){U!==Mu?(te(n.CULL_FACE),U!==P&&(U===Wc?n.cullFace(n.BACK):U===Su?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):we(n.CULL_FACE),P=U}function ge(U){U!==k&&(X&&n.lineWidth(U),k=U)}function ce(U,de,xe){U?(te(n.POLYGON_OFFSET_FILL),(H!==de||$!==xe)&&(n.polygonOffset(de,xe),H=de,$=xe)):we(n.POLYGON_OFFSET_FILL)}function _e(U){U?te(n.SCISSOR_TEST):we(n.SCISSOR_TEST)}function tt(U){U===void 0&&(U=n.TEXTURE0+Y-1),me!==U&&(n.activeTexture(U),me=U)}function je(U,de,xe){xe===void 0&&(me===null?xe=n.TEXTURE0+Y-1:xe=me);let Ee=ve[xe];Ee===void 0&&(Ee={type:void 0,texture:void 0},ve[xe]=Ee),(Ee.type!==U||Ee.texture!==de)&&(me!==xe&&(n.activeTexture(xe),me=xe),n.bindTexture(U,de||Z[U]),Ee.type=U,Ee.texture=de)}function b(){let U=ve[me];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function se(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pe(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function De(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Me(U){rt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),rt.copy(U))}function Je(U){ht.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),ht.copy(U))}function ze(U,de){let xe=c.get(de);xe===void 0&&(xe=new WeakMap,c.set(de,xe));let Ee=xe.get(U);Ee===void 0&&(Ee=n.getUniformBlockIndex(de,U.name),xe.set(U,Ee))}function Se(U,de){let Ee=c.get(de).get(U);l.get(de)!==Ee&&(n.uniformBlockBinding(de,Ee,U.__bindingPointIndex),l.set(de,Ee))}function Ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},me=null,ve={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,E=null,w=null,v=null,R=null,A=null,D=new He(0,0,0),N=0,S=!1,M=null,P=null,k=null,H=null,$=null,rt.set(0,0,n.canvas.width,n.canvas.height),ht.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:te,disable:we,bindFramebuffer:Oe,drawBuffers:Ie,useProgram:nt,setBlending:z,setMaterial:ee,setFlipSided:J,setCullFace:Q,setLineWidth:ge,setPolygonOffset:ce,setScissorTest:_e,activeTexture:tt,bindTexture:je,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:O,texImage2D:De,texImage3D:le,updateUBOMapping:ze,uniformBlockBinding:Se,texStorage2D:pe,texStorage3D:Pe,texSubImage2D:q,texSubImage3D:se,compressedTexSubImage2D:K,compressedTexSubImage3D:Te,scissor:Me,viewport:Je,reset:Ke}}function kx(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return f?new OffscreenCanvas(b,_):zs("canvas")}function x(b,_,O){let q=1,se=je(b);if((se.width>O||se.height>O)&&(q=O/Math.max(se.width,se.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let K=Math.floor(q*se.width),Te=Math.floor(q*se.height);u===void 0&&(u=g(K,Te));let pe=_?g(K,Te):u;return pe.width=K,pe.height=Te,pe.getContext("2d").drawImage(b,0,0,K,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+K+"x"+Te+")."),pe}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){n.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(b,_,O,q,se=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let K=_;if(_===n.RED&&(O===n.FLOAT&&(K=n.R32F),O===n.HALF_FLOAT&&(K=n.R16F),O===n.UNSIGNED_BYTE&&(K=n.R8)),_===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(K=n.R8UI),O===n.UNSIGNED_SHORT&&(K=n.R16UI),O===n.UNSIGNED_INT&&(K=n.R32UI),O===n.BYTE&&(K=n.R8I),O===n.SHORT&&(K=n.R16I),O===n.INT&&(K=n.R32I)),_===n.RG&&(O===n.FLOAT&&(K=n.RG32F),O===n.HALF_FLOAT&&(K=n.RG16F),O===n.UNSIGNED_BYTE&&(K=n.RG8)),_===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(K=n.RG8UI),O===n.UNSIGNED_SHORT&&(K=n.RG16UI),O===n.UNSIGNED_INT&&(K=n.RG32UI),O===n.BYTE&&(K=n.RG8I),O===n.SHORT&&(K=n.RG16I),O===n.INT&&(K=n.RG32I)),_===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(K=n.RGB8UI),O===n.UNSIGNED_SHORT&&(K=n.RGB16UI),O===n.UNSIGNED_INT&&(K=n.RGB32UI),O===n.BYTE&&(K=n.RGB8I),O===n.SHORT&&(K=n.RGB16I),O===n.INT&&(K=n.RGB32I)),_===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),O===n.UNSIGNED_INT&&(K=n.RGBA32UI),O===n.BYTE&&(K=n.RGBA8I),O===n.SHORT&&(K=n.RGBA16I),O===n.INT&&(K=n.RGBA32I)),_===n.RGB&&(O===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),_===n.RGBA){let Te=se?Fs:mt.getTransfer(q);O===n.FLOAT&&(K=n.RGBA32F),O===n.HALF_FLOAT&&(K=n.RGBA16F),O===n.UNSIGNED_BYTE&&(K=Te===bt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function v(b,_){let O;return b?_===null||_===Fi||_===ss?O=n.DEPTH24_STENCIL8:_===Vn?O=n.DEPTH32F_STENCIL8:_===is&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Fi||_===ss?O=n.DEPTH_COMPONENT24:_===Vn?O=n.DEPTH_COMPONENT32F:_===is&&(O=n.DEPTH_COMPONENT16),O}function R(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==gn&&b.minFilter!==zn?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function A(b){let _=b.target;_.removeEventListener("dispose",A),N(_),_.isVideoTexture&&h.delete(_)}function D(b){let _=b.target;_.removeEventListener("dispose",D),M(_)}function N(b){let _=i.get(b);if(_.__webglInit===void 0)return;let O=b.source,q=d.get(O);if(q){let se=q[_.__cacheKey];se.usedTimes--,se.usedTimes===0&&S(b),Object.keys(q).length===0&&d.delete(O)}i.remove(b)}function S(b){let _=i.get(b);n.deleteTexture(_.__webglTexture);let O=b.source,q=d.get(O);delete q[_.__cacheKey],o.memory.textures--}function M(b){let _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let se=0;se<_.__webglFramebuffer[q].length;se++)n.deleteFramebuffer(_.__webglFramebuffer[q][se]);else n.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)n.deleteFramebuffer(_.__webglFramebuffer[q]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let O=b.textures;for(let q=0,se=O.length;q<se;q++){let K=i.get(O[q]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(O[q])}i.remove(b)}let P=0;function k(){P=0}function H(){let b=P;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),P+=1,b}function $(b){let _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function Y(b,_){let O=i.get(b);if(b.isVideoTexture&&_e(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&O.__version!==b.version){let q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(O,b,_);return}}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+_)}function X(b,_){let O=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){Z(O,b,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+_)}function oe(b,_){let O=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){Z(O,b,_);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+_)}function W(b,_){let O=i.get(b);if(b.version>0&&O.__version!==b.version){te(O,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+_)}let me={[kr]:n.REPEAT,[Ri]:n.CLAMP_TO_EDGE,[pa]:n.MIRRORED_REPEAT},ve={[gn]:n.NEAREST,[Zu]:n.NEAREST_MIPMAP_NEAREST,[xo]:n.NEAREST_MIPMAP_LINEAR,[zn]:n.LINEAR,[tl]:n.LINEAR_MIPMAP_NEAREST,[Ni]:n.LINEAR_MIPMAP_LINEAR},Ae={[ju]:n.NEVER,[sd]:n.ALWAYS,[ed]:n.LESS,[ih]:n.LEQUAL,[td]:n.EQUAL,[rd]:n.GEQUAL,[nd]:n.GREATER,[id]:n.NOTEQUAL};function ie(b,_){if(_.type===Vn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===zn||_.magFilter===tl||_.magFilter===xo||_.magFilter===Ni||_.minFilter===zn||_.minFilter===tl||_.minFilter===xo||_.minFilter===Ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,me[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,me[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,me[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ve[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ve[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Ae[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===gn||_.minFilter!==xo&&_.minFilter!==Ni||_.type===Vn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function rt(b,_){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",A));let q=_.source,se=d.get(q);se===void 0&&(se={},d.set(q,se));let K=$(_);if(K!==b.__cacheKey){se[K]===void 0&&(se[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),se[K].usedTimes++;let Te=se[b.__cacheKey];Te!==void 0&&(se[b.__cacheKey].usedTimes--,Te.usedTimes===0&&S(_)),b.__cacheKey=K,b.__webglTexture=se[K].texture}return O}function ht(b,_,O){return Math.floor(Math.floor(b/O)/_)}function Re(b,_,O,q){let K=b.updateRanges;if(K.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,O,q,_.data);else{K.sort((le,Me)=>le.start-Me.start);let Te=0;for(let le=1;le<K.length;le++){let Me=K[Te],Je=K[le],ze=Me.start+Me.count,Se=ht(Je.start,_.width,4),Ke=ht(Me.start,_.width,4);Je.start<=ze+1&&Se===Ke&&ht(Je.start+Je.count-1,_.width,4)===Se?Me.count=Math.max(Me.count,Je.start+Je.count-Me.start):(++Te,K[Te]=Je)}K.length=Te+1;let pe=n.getParameter(n.UNPACK_ROW_LENGTH),Pe=n.getParameter(n.UNPACK_SKIP_PIXELS),De=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let le=0,Me=K.length;le<Me;le++){let Je=K[le],ze=Math.floor(Je.start/4),Se=Math.ceil(Je.count/4),Ke=ze%_.width,U=Math.floor(ze/_.width),de=Se,xe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ke),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Ke,U,de,xe,O,q,_.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,pe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Pe),n.pixelStorei(n.UNPACK_SKIP_ROWS,De)}}function Z(b,_,O){let q=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=n.TEXTURE_3D);let se=rt(b,_),K=_.source;t.bindTexture(q,b.__webglTexture,n.TEXTURE0+O);let Te=i.get(K);if(K.version!==Te.__version||se===!0){t.activeTexture(n.TEXTURE0+O);let pe=mt.getPrimaries(mt.workingColorSpace),Pe=_.colorSpace===_i?null:mt.getPrimaries(_.colorSpace),De=_.colorSpace===_i||pe===Pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let le=x(_.image,!1,r.maxTextureSize);le=tt(_,le);let Me=s.convert(_.format,_.colorSpace),Je=s.convert(_.type),ze=w(_.internalFormat,Me,Je,_.colorSpace,_.isVideoTexture);ie(q,_);let Se,Ke=_.mipmaps,U=_.isVideoTexture!==!0,de=Te.__version===void 0||se===!0,xe=K.dataReady,Ee=R(_,le);if(_.isDepthTexture)ze=v(_.format===os,_.type),de&&(U?t.texStorage2D(n.TEXTURE_2D,1,ze,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,ze,le.width,le.height,0,Me,Je,null));else if(_.isDataTexture)if(Ke.length>0){U&&de&&t.texStorage2D(n.TEXTURE_2D,Ee,ze,Ke[0].width,Ke[0].height);for(let ae=0,ne=Ke.length;ae<ne;ae++)Se=Ke[ae],U?xe&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Se.width,Se.height,Me,Je,Se.data):t.texImage2D(n.TEXTURE_2D,ae,ze,Se.width,Se.height,0,Me,Je,Se.data);_.generateMipmaps=!1}else U?(de&&t.texStorage2D(n.TEXTURE_2D,Ee,ze,le.width,le.height),xe&&Re(_,le,Me,Je)):t.texImage2D(n.TEXTURE_2D,0,ze,le.width,le.height,0,Me,Je,le.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){U&&de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,ze,Ke[0].width,Ke[0].height,le.depth);for(let ae=0,ne=Ke.length;ae<ne;ae++)if(Se=Ke[ae],_.format!==Rn)if(Me!==null)if(U){if(xe)if(_.layerUpdates.size>0){let Fe=hh(Se.width,Se.height,_.format,_.type);for(let Qe of _.layerUpdates){let Be=Se.data.subarray(Qe*Fe/Se.data.BYTES_PER_ELEMENT,(Qe+1)*Fe/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,Qe,Se.width,Se.height,1,Me,Be)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Se.width,Se.height,le.depth,Me,Se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,ze,Se.width,Se.height,le.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?xe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Se.width,Se.height,le.depth,Me,Je,Se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,ze,Se.width,Se.height,le.depth,0,Me,Je,Se.data)}else{U&&de&&t.texStorage2D(n.TEXTURE_2D,Ee,ze,Ke[0].width,Ke[0].height);for(let ae=0,ne=Ke.length;ae<ne;ae++)Se=Ke[ae],_.format!==Rn?Me!==null?U?xe&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,Se.width,Se.height,Me,Se.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,ze,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?xe&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Se.width,Se.height,Me,Je,Se.data):t.texImage2D(n.TEXTURE_2D,ae,ze,Se.width,Se.height,0,Me,Je,Se.data)}else if(_.isDataArrayTexture)if(U){if(de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,ze,le.width,le.height,le.depth),xe)if(_.layerUpdates.size>0){let ae=hh(le.width,le.height,_.format,_.type);for(let ne of _.layerUpdates){let Fe=le.data.subarray(ne*ae/le.data.BYTES_PER_ELEMENT,(ne+1)*ae/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ne,le.width,le.height,1,Me,Je,Fe)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Me,Je,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ze,le.width,le.height,le.depth,0,Me,Je,le.data);else if(_.isData3DTexture)U?(de&&t.texStorage3D(n.TEXTURE_3D,Ee,ze,le.width,le.height,le.depth),xe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Me,Je,le.data)):t.texImage3D(n.TEXTURE_3D,0,ze,le.width,le.height,le.depth,0,Me,Je,le.data);else if(_.isFramebufferTexture){if(de)if(U)t.texStorage2D(n.TEXTURE_2D,Ee,ze,le.width,le.height);else{let ae=le.width,ne=le.height;for(let Fe=0;Fe<Ee;Fe++)t.texImage2D(n.TEXTURE_2D,Fe,ze,ae,ne,0,Me,Je,null),ae>>=1,ne>>=1}}else if(Ke.length>0){if(U&&de){let ae=je(Ke[0]);t.texStorage2D(n.TEXTURE_2D,Ee,ze,ae.width,ae.height)}for(let ae=0,ne=Ke.length;ae<ne;ae++)Se=Ke[ae],U?xe&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Me,Je,Se):t.texImage2D(n.TEXTURE_2D,ae,ze,Me,Je,Se);_.generateMipmaps=!1}else if(U){if(de){let ae=je(le);t.texStorage2D(n.TEXTURE_2D,Ee,ze,ae.width,ae.height)}xe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Me,Je,le)}else t.texImage2D(n.TEXTURE_2D,0,ze,Me,Je,le);m(_)&&p(q),Te.__version=K.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function te(b,_,O){if(_.image.length!==6)return;let q=rt(b,_),se=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+O);let K=i.get(se);if(se.version!==K.__version||q===!0){t.activeTexture(n.TEXTURE0+O);let Te=mt.getPrimaries(mt.workingColorSpace),pe=_.colorSpace===_i?null:mt.getPrimaries(_.colorSpace),Pe=_.colorSpace===_i||Te===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let De=_.isCompressedTexture||_.image[0].isCompressedTexture,le=_.image[0]&&_.image[0].isDataTexture,Me=[];for(let ne=0;ne<6;ne++)!De&&!le?Me[ne]=x(_.image[ne],!0,r.maxCubemapSize):Me[ne]=le?_.image[ne].image:_.image[ne],Me[ne]=tt(_,Me[ne]);let Je=Me[0],ze=s.convert(_.format,_.colorSpace),Se=s.convert(_.type),Ke=w(_.internalFormat,ze,Se,_.colorSpace),U=_.isVideoTexture!==!0,de=K.__version===void 0||q===!0,xe=se.dataReady,Ee=R(_,Je);ie(n.TEXTURE_CUBE_MAP,_);let ae;if(De){U&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Ke,Je.width,Je.height);for(let ne=0;ne<6;ne++){ae=Me[ne].mipmaps;for(let Fe=0;Fe<ae.length;Fe++){let Qe=ae[Fe];_.format!==Rn?ze!==null?U?xe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe,0,0,Qe.width,Qe.height,ze,Qe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe,Ke,Qe.width,Qe.height,0,Qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe,0,0,Qe.width,Qe.height,ze,Se,Qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe,Ke,Qe.width,Qe.height,0,ze,Se,Qe.data)}}}else{if(ae=_.mipmaps,U&&de){ae.length>0&&Ee++;let ne=je(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Ke,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(le){U?xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Me[ne].width,Me[ne].height,ze,Se,Me[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ke,Me[ne].width,Me[ne].height,0,ze,Se,Me[ne].data);for(let Fe=0;Fe<ae.length;Fe++){let Be=ae[Fe].image[ne].image;U?xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe+1,0,0,Be.width,Be.height,ze,Se,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe+1,Ke,Be.width,Be.height,0,ze,Se,Be.data)}}else{U?xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ze,Se,Me[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ke,ze,Se,Me[ne]);for(let Fe=0;Fe<ae.length;Fe++){let Qe=ae[Fe];U?xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe+1,0,0,ze,Se,Qe.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe+1,Ke,ze,Se,Qe.image[ne])}}}m(_)&&p(n.TEXTURE_CUBE_MAP),K.__version=se.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function we(b,_,O,q,se,K){let Te=s.convert(O.format,O.colorSpace),pe=s.convert(O.type),Pe=w(O.internalFormat,Te,pe,O.colorSpace),De=i.get(_),le=i.get(O);if(le.__renderTarget=_,!De.__hasExternalTextures){let Me=Math.max(1,_.width>>K),Je=Math.max(1,_.height>>K);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,K,Pe,Me,Je,_.depth,0,Te,pe,null):t.texImage2D(se,K,Pe,Me,Je,0,Te,pe,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ce(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,se,le.__webglTexture,0,ge(_)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,se,le.__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(b,_,O){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){let q=_.depthTexture,se=q&&q.isDepthTexture?q.type:null,K=v(_.stencilBuffer,se),Te=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=ge(_);ce(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pe,K,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,K,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,K,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Te,n.RENDERBUFFER,b)}else{let q=_.textures;for(let se=0;se<q.length;se++){let K=q[se],Te=s.convert(K.format,K.colorSpace),pe=s.convert(K.type),Pe=w(K.internalFormat,Te,pe,K.colorSpace),De=ge(_);O&&ce(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,De,Pe,_.width,_.height):ce(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De,Pe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Pe,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ie(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=i.get(_.depthTexture);q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y(_.depthTexture,0);let se=q.__webglTexture,K=ge(_);if(_.depthTexture.format===Vr)ce(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0);else if(_.depthTexture.format===os)ce(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function nt(b){let _=i.get(b),O=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){let q=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){let se=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",se)};q.addEventListener("dispose",se),_.__depthDisposeCallback=se}_.__boundDepthTexture=q}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let q=b.texture.mipmaps;q&&q.length>0?Ie(_.__webglFramebuffer[0],b):Ie(_.__webglFramebuffer,b)}else if(O){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=n.createRenderbuffer(),Oe(_.__webglDepthbuffer[q],b,!1);else{let se=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,K)}}else{let q=b.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Oe(_.__webglDepthbuffer,b,!1);else{let se=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,K)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(b,_,O){let q=i.get(b);_!==void 0&&we(q.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&nt(b)}function T(b){let _=b.texture,O=i.get(b),q=i.get(_);b.addEventListener("dispose",D);let se=b.textures,K=b.isWebGLCubeRenderTarget===!0,Te=se.length>1;if(Te||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=_.version,o.memory.textures++),K){O.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[pe]=[];for(let Pe=0;Pe<_.mipmaps.length;Pe++)O.__webglFramebuffer[pe][Pe]=n.createFramebuffer()}else O.__webglFramebuffer[pe]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let pe=0;pe<_.mipmaps.length;pe++)O.__webglFramebuffer[pe]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Te)for(let pe=0,Pe=se.length;pe<Pe;pe++){let De=i.get(se[pe]);De.__webglTexture===void 0&&(De.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&ce(b)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let pe=0;pe<se.length;pe++){let Pe=se[pe];O.__webglColorRenderbuffer[pe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[pe]);let De=s.convert(Pe.format,Pe.colorSpace),le=s.convert(Pe.type),Me=w(Pe.internalFormat,De,le,Pe.colorSpace,b.isXRRenderTarget===!0),Je=ge(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Je,Me,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,O.__webglColorRenderbuffer[pe])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Oe(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),ie(n.TEXTURE_CUBE_MAP,_);for(let pe=0;pe<6;pe++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pe=0;Pe<_.mipmaps.length;Pe++)we(O.__webglFramebuffer[pe][Pe],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Pe);else we(O.__webglFramebuffer[pe],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);m(_)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let pe=0,Pe=se.length;pe<Pe;pe++){let De=se[pe],le=i.get(De),Me=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Me=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Me,le.__webglTexture),ie(Me,De),we(O.__webglFramebuffer,b,De,n.COLOR_ATTACHMENT0+pe,Me,0),m(De)&&p(Me)}t.unbindTexture()}else{let pe=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(pe=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(pe,q.__webglTexture),ie(pe,_),_.mipmaps&&_.mipmaps.length>0)for(let Pe=0;Pe<_.mipmaps.length;Pe++)we(O.__webglFramebuffer[Pe],b,_,n.COLOR_ATTACHMENT0,pe,Pe);else we(O.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,pe,0);m(_)&&p(pe),t.unbindTexture()}b.depthBuffer&&nt(b)}function z(b){let _=b.textures;for(let O=0,q=_.length;O<q;O++){let se=_[O];if(m(se)){let K=E(b),Te=i.get(se).__webglTexture;t.bindTexture(K,Te),p(K),t.unbindTexture()}}}let ee=[],J=[];function Q(b){if(b.samples>0){if(ce(b)===!1){let _=b.textures,O=b.width,q=b.height,se=n.COLOR_BUFFER_BIT,K=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=i.get(b),pe=_.length>1;if(pe)for(let De=0;De<_.length;De++)t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);let Pe=b.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let De=0;De<_.length;De++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),pe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Te.__webglColorRenderbuffer[De]);let le=i.get(_[De]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,le,0)}n.blitFramebuffer(0,0,O,q,0,0,O,q,se,n.NEAREST),l===!0&&(ee.length=0,J.length=0,ee.push(n.COLOR_ATTACHMENT0+De),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ee.push(K),J.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,J)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ee))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pe)for(let De=0;De<_.length;De++){t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,Te.__webglColorRenderbuffer[De]);let le=i.get(_[De]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){let _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ge(b){return Math.min(r.maxSamples,b.samples)}function ce(b){let _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function _e(b){let _=o.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function tt(b,_){let O=b.colorSpace,q=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==Ji&&O!==_i&&(mt.getTransfer(O)===bt?(q!==Rn||se!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),_}function je(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=k,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=oe,this.setTextureCube=W,this.rebindTextures=_t,this.setupRenderTarget=T,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=we,this.useMultisampledRTT=ce}function Vx(n,e){function t(i,r=_i){let s,o=mt.getTransfer(r);if(i===kn)return n.UNSIGNED_BYTE;if(i===il)return n.UNSIGNED_SHORT_4_4_4_4;if(i===rl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Qc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===jc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Jc)return n.BYTE;if(i===Kc)return n.SHORT;if(i===is)return n.UNSIGNED_SHORT;if(i===nl)return n.INT;if(i===Fi)return n.UNSIGNED_INT;if(i===Vn)return n.FLOAT;if(i===rs)return n.HALF_FLOAT;if(i===eh)return n.ALPHA;if(i===th)return n.RGB;if(i===Rn)return n.RGBA;if(i===Vr)return n.DEPTH_COMPONENT;if(i===os)return n.DEPTH_STENCIL;if(i===sl)return n.RED;if(i===ol)return n.RED_INTEGER;if(i===nh)return n.RG;if(i===al)return n.RG_INTEGER;if(i===ll)return n.RGBA_INTEGER;if(i===_o||i===yo||i===vo||i===Mo)if(o===bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===_o)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===yo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===vo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===_o)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===yo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===vo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Mo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===cl||i===hl||i===ul||i===dl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===cl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===hl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ul)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===dl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===fl||i===pl||i===ml)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===fl||i===pl)return o===bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ml)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===gl||i===xl||i===_l||i===yl||i===vl||i===Ml||i===Sl||i===bl||i===wl||i===Tl||i===El||i===Al||i===Cl||i===Rl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===gl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===_l)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===yl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===vl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ml)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Sl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Tl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===El)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Al)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Cl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Rl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Il||i===Pl||i===Ll)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Il)return o===bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Pl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ll)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dl||i===Ul||i===Nl||i===Fl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Dl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ul)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Nl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ss?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Gx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,bh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ks(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new mn({vertexShader:Gx,fragmentShader:Hx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wt(new mi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wh=class extends fi{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new bh,p={},E=t.getContextAttributes(),w=null,v=null,R=[],A=[],D=new fe,N=null,S=new Qt;S.viewport=new St;let M=new Qt;M.viewport=new St;let P=[S,M],k=new Ga,H=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let te=R[Z];return te===void 0&&(te=new Xr,R[Z]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Z){let te=R[Z];return te===void 0&&(te=new Xr,R[Z]=te),te.getGripSpace()},this.getHand=function(Z){let te=R[Z];return te===void 0&&(te=new Xr,R[Z]=te),te.getHandSpace()};function Y(Z){let te=A.indexOf(Z.inputSource);if(te===-1)return;let we=R[te];we!==void 0&&(we.update(Z.inputSource,Z.frame,c||o),we.dispatchEvent({type:Z.type,data:Z.inputSource}))}function X(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",oe);for(let Z=0;Z<R.length;Z++){let te=A[Z];te!==null&&(A[Z]=null,R[Z].disconnect(te))}H=null,$=null,m.reset();for(let Z in p)delete p[Z];e.setRenderTarget(w),f=null,d=null,u=null,r=null,v=null,Re.stop(),i.isPresenting=!1,e.setPixelRatio(N),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",X),r.addEventListener("inputsourceschange",oe),E.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(D),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,Oe=null,Ie=null;E.depth&&(Ie=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=E.stencil?os:Vr,Oe=E.stencil?ss:Fi);let nt={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(nt),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Yn(d.textureWidth,d.textureHeight,{format:Rn,type:kn,depthTexture:new Js(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let we={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,we),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Yn(f.framebufferWidth,f.framebufferHeight,{format:Rn,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Re.setContext(r),Re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function oe(Z){for(let te=0;te<Z.removed.length;te++){let we=Z.removed[te],Oe=A.indexOf(we);Oe>=0&&(A[Oe]=null,R[Oe].disconnect(we))}for(let te=0;te<Z.added.length;te++){let we=Z.added[te],Oe=A.indexOf(we);if(Oe===-1){for(let nt=0;nt<R.length;nt++)if(nt>=A.length){A.push(we),Oe=nt;break}else if(A[nt]===null){A[nt]=we,Oe=nt;break}if(Oe===-1)break}let Ie=R[Oe];Ie&&Ie.connect(we)}}let W=new I,me=new I;function ve(Z,te,we){W.setFromMatrixPosition(te.matrixWorld),me.setFromMatrixPosition(we.matrixWorld);let Oe=W.distanceTo(me),Ie=te.projectionMatrix.elements,nt=we.projectionMatrix.elements,_t=Ie[14]/(Ie[10]-1),T=Ie[14]/(Ie[10]+1),z=(Ie[9]+1)/Ie[5],ee=(Ie[9]-1)/Ie[5],J=(Ie[8]-1)/Ie[0],Q=(nt[8]+1)/nt[0],ge=_t*J,ce=_t*Q,_e=Oe/(-J+Q),tt=_e*-J;if(te.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(tt),Z.translateZ(_e),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ie[10]===-1)Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let je=_t+_e,b=T+_e,_=ge-tt,O=ce+(Oe-tt),q=z*T/b*je,se=ee*T/b*je;Z.projectionMatrix.makePerspective(_,O,q,se,je,b),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Ae(Z,te){te===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(te.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let te=Z.near,we=Z.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(we=m.depthFar)),k.near=M.near=S.near=te,k.far=M.far=S.far=we,(H!==k.near||$!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),H=k.near,$=k.far),k.layers.mask=Z.layers.mask|6,S.layers.mask=k.layers.mask&3,M.layers.mask=k.layers.mask&5;let Oe=Z.parent,Ie=k.cameras;Ae(k,Oe);for(let nt=0;nt<Ie.length;nt++)Ae(Ie[nt],Oe);Ie.length===2?ve(k,S,M):k.projectionMatrix.copy(S.projectionMatrix),ie(Z,k,Oe)};function ie(Z,te,we){we===null?Z.matrix.copy(te.matrixWorld):(Z.matrix.copy(we.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(te.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Os*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(Z){return p[Z]};let rt=null;function ht(Z,te){if(h=te.getViewerPose(c||o),g=te,h!==null){let we=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Oe=!1;we.length!==k.cameras.length&&(k.cameras.length=0,Oe=!0);for(let T=0;T<we.length;T++){let z=we[T],ee=null;if(f!==null)ee=f.getViewport(z);else{let Q=u.getViewSubImage(d,z);ee=Q.viewport,T===0&&(e.setRenderTargetTextures(v,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(v))}let J=P[T];J===void 0&&(J=new Qt,J.layers.enable(T),J.viewport=new St,P[T]=J),J.matrix.fromArray(z.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(z.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(ee.x,ee.y,ee.width,ee.height),T===0&&(k.matrix.copy(J.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Oe===!0&&k.cameras.push(J)}let Ie=r.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){u=i.getBinding();let T=u.getDepthInformation(we[0]);T&&T.isValid&&T.texture&&m.init(T,r.renderState)}if(Ie&&Ie.includes("camera-access")&&x){e.state.unbindTexture(),u=i.getBinding();for(let T=0;T<we.length;T++){let z=we[T].camera;if(z){let ee=p[z];ee||(ee=new Ks,p[z]=ee);let J=u.getCameraImage(z);ee.sourceTexture=J}}}}for(let we=0;we<R.length;we++){let Oe=A[we],Ie=R[we];Oe!==null&&Ie!==void 0&&Ie.update(Oe,te,c||o)}rt&&rt(Z,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),g=null}let Re=new Od;Re.setAnimationLoop(ht),this.setAnimationLoop=function(Z){rt=Z},this.dispose=function(){}}},ar=new xn,Wx=new Mt;function Xx(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,oh(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,E,w,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,E,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let E=e.get(p),w=E.envMap,v=E.envMapRotation;w&&(m.envMap.value=w,ar.copy(v),ar.x*=-1,ar.y*=-1,ar.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),m.envMapRotation.value.setFromMatrix4(Wx.makeRotationFromEuler(ar)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function qx(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,w){let v=w.program;i.uniformBlockBinding(E,v)}function c(E,w){let v=r[E.id];v===void 0&&(g(E),v=h(E),r[E.id]=v,E.addEventListener("dispose",m));let R=w.program;i.updateUBOMapping(E,R);let A=e.render.frame;s[E.id]!==A&&(d(E),s[E.id]=A)}function h(E){let w=u();E.__bindingPointIndex=w;let v=n.createBuffer(),R=E.__size,A=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,R,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,v),v}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let w=r[E.id],v=E.uniforms,R=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let A=0,D=v.length;A<D;A++){let N=Array.isArray(v[A])?v[A]:[v[A]];for(let S=0,M=N.length;S<M;S++){let P=N[S];if(f(P,A,S,R)===!0){let k=P.__offset,H=Array.isArray(P.value)?P.value:[P.value],$=0;for(let Y=0;Y<H.length;Y++){let X=H[Y],oe=x(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,k+$,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,$),$+=oe.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(E,w,v,R){let A=E.value,D=w+"_"+v;if(R[D]===void 0)return typeof A=="number"||typeof A=="boolean"?R[D]=A:R[D]=A.clone(),!0;{let N=R[D];if(typeof A=="number"||typeof A=="boolean"){if(N!==A)return R[D]=A,!0}else if(N.equals(A)===!1)return N.copy(A),!0}return!1}function g(E){let w=E.uniforms,v=0,R=16;for(let D=0,N=w.length;D<N;D++){let S=Array.isArray(w[D])?w[D]:[w[D]];for(let M=0,P=S.length;M<P;M++){let k=S[M],H=Array.isArray(k.value)?k.value:[k.value];for(let $=0,Y=H.length;$<Y;$++){let X=H[$],oe=x(X),W=v%R,me=W%oe.boundary,ve=W+me;v+=me,ve!==0&&R-ve<oe.storage&&(v+=R-ve),k.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=oe.storage}}}let A=v%R;return A>0&&(v+=R-A),E.__size=v,E.__cache={},this}function x(E){let w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function m(E){let w=E.target;w.removeEventListener("dispose",m);let v=o.indexOf(w.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function p(){for(let E in r)n.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}var Gl=class{constructor(e={}){let{canvas:t=od(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,E=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,R=!1;this._outputColorSpace=an;let A=0,D=0,N=null,S=-1,M=null,P=new St,k=new St,H=null,$=new He(0),Y=0,X=t.width,oe=t.height,W=1,me=null,ve=null,Ae=new St(0,0,X,oe),ie=new St(0,0,X,oe),rt=!1,ht=new Zr,Re=!1,Z=!1,te=new Mt,we=new I,Oe=new St,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},nt=!1;function _t(){return N===null?W:1}let T=i;function z(y,F){return t.getContext(y,F)}try{let y={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",ae,!1),T===null){let F="webgl2";if(T=z(F,y),T===null)throw z(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let ee,J,Q,ge,ce,_e,tt,je,b,_,O,q,se,K,Te,pe,Pe,De,le,Me,Je,ze,Se,Ke;function U(){ee=new h0(T),ee.init(),ze=new Vx(T,ee),J=new i0(T,ee,e,ze),Q=new zx(T,ee),J.reversedDepthBuffer&&d&&Q.buffers.depth.setReversed(!0),ge=new f0(T),ce=new Ex,_e=new kx(T,ee,Q,ce,J,ze,ge),tt=new s0(v),je=new c0(v),b=new yp(T),Se=new t0(T,b),_=new u0(T,b,ge,Se),O=new m0(T,_,b,ge),le=new p0(T,J,_e),pe=new r0(ce),q=new Tx(v,tt,je,ee,J,Se,pe),se=new Xx(v,ce),K=new Cx,Te=new Ux(ee),De=new e0(v,tt,je,Q,O,f,l),Pe=new Bx(v,O,J),Ke=new qx(T,ge,J,Q),Me=new n0(T,ee,ge),Je=new d0(T,ee,ge),ge.programs=q.programs,v.capabilities=J,v.extensions=ee,v.properties=ce,v.renderLists=K,v.shadowMap=Pe,v.state=Q,v.info=ge}U();let de=new wh(v,T);this.xr=de,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let y=ee.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=ee.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(y){y!==void 0&&(W=y,this.setSize(X,oe,!1))},this.getSize=function(y){return y.set(X,oe)},this.setSize=function(y,F,V=!0){if(de.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,oe=F,t.width=Math.floor(y*W),t.height=Math.floor(F*W),V===!0&&(t.style.width=y+"px",t.style.height=F+"px"),this.setViewport(0,0,y,F)},this.getDrawingBufferSize=function(y){return y.set(X*W,oe*W).floor()},this.setDrawingBufferSize=function(y,F,V){X=y,oe=F,W=V,t.width=Math.floor(y*V),t.height=Math.floor(F*V),this.setViewport(0,0,y,F)},this.getCurrentViewport=function(y){return y.copy(P)},this.getViewport=function(y){return y.copy(Ae)},this.setViewport=function(y,F,V,G){y.isVector4?Ae.set(y.x,y.y,y.z,y.w):Ae.set(y,F,V,G),Q.viewport(P.copy(Ae).multiplyScalar(W).round())},this.getScissor=function(y){return y.copy(ie)},this.setScissor=function(y,F,V,G){y.isVector4?ie.set(y.x,y.y,y.z,y.w):ie.set(y,F,V,G),Q.scissor(k.copy(ie).multiplyScalar(W).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(y){Q.setScissorTest(rt=y)},this.setOpaqueSort=function(y){me=y},this.setTransparentSort=function(y){ve=y},this.getClearColor=function(y){return y.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(y=!0,F=!0,V=!0){let G=0;if(y){let B=!1;if(N!==null){let he=N.texture.format;B=he===ll||he===al||he===ol}if(B){let he=N.texture.type,ye=he===kn||he===Fi||he===is||he===ss||he===il||he===rl,Ue=De.getClearColor(),Ce=De.getClearAlpha(),qe=Ue.r,$e=Ue.g,We=Ue.b;ye?(g[0]=qe,g[1]=$e,g[2]=We,g[3]=Ce,T.clearBufferuiv(T.COLOR,0,g)):(x[0]=qe,x[1]=$e,x[2]=We,x[3]=Ce,T.clearBufferiv(T.COLOR,0,x))}else G|=T.COLOR_BUFFER_BIT}F&&(G|=T.DEPTH_BUFFER_BIT),V&&(G|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),De.dispose(),K.dispose(),Te.dispose(),ce.dispose(),tt.dispose(),je.dispose(),O.dispose(),Se.dispose(),Ke.dispose(),q.dispose(),de.dispose(),de.removeEventListener("sessionstart",_n),de.removeEventListener("sessionend",_s),Dn.stop()};function xe(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let y=ge.autoReset,F=Pe.enabled,V=Pe.autoUpdate,G=Pe.needsUpdate,B=Pe.type;U(),ge.autoReset=y,Pe.enabled=F,Pe.autoUpdate=V,Pe.needsUpdate=G,Pe.type=B}function ae(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function ne(y){let F=y.target;F.removeEventListener("dispose",ne),Fe(F)}function Fe(y){Qe(y),ce.remove(y)}function Qe(y){let F=ce.get(y).programs;F!==void 0&&(F.forEach(function(V){q.releaseProgram(V)}),y.isShaderMaterial&&q.releaseShaderCache(y))}this.renderBufferDirect=function(y,F,V,G,B,he){F===null&&(F=Ie);let ye=B.isMesh&&B.matrixWorld.determinant()<0,Ue=_r(y,F,V,G,B);Q.setMaterial(G,ye);let Ce=V.index,qe=1;if(G.wireframe===!0){if(Ce=_.getWireframeAttribute(V),Ce===void 0)return;qe=2}let $e=V.drawRange,We=V.attributes.position,at=$e.start*qe,gt=($e.start+$e.count)*qe;he!==null&&(at=Math.max(at,he.start*qe),gt=Math.min(gt,(he.start+he.count)*qe)),Ce!==null?(at=Math.max(at,0),gt=Math.min(gt,Ce.count)):We!=null&&(at=Math.max(at,0),gt=Math.min(gt,We.count));let Pt=gt-at;if(Pt<0||Pt===1/0)return;Se.setup(B,G,Ue,V,Ce);let At,lt=Me;if(Ce!==null&&(At=b.get(Ce),lt=Je,lt.setIndex(At)),B.isMesh)G.wireframe===!0?(Q.setLineWidth(G.wireframeLinewidth*_t()),lt.setMode(T.LINES)):lt.setMode(T.TRIANGLES);else if(B.isLine){let Ve=G.linewidth;Ve===void 0&&(Ve=1),Q.setLineWidth(Ve*_t()),B.isLineSegments?lt.setMode(T.LINES):B.isLineLoop?lt.setMode(T.LINE_LOOP):lt.setMode(T.LINE_STRIP)}else B.isPoints?lt.setMode(T.POINTS):B.isSprite&&lt.setMode(T.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Gr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))lt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ve=B._multiDrawStarts,vt=B._multiDrawCounts,dt=B._multiDrawCount,un=Ce?b.get(Ce).bytesPerElement:1,Si=ce.get(G).currentProgram.getUniforms();for(let dn=0;dn<dt;dn++)Si.setValue(T,"_gl_DrawID",dn),lt.render(Ve[dn]/un,vt[dn])}else if(B.isInstancedMesh)lt.renderInstances(at,Pt,B.count);else if(V.isInstancedBufferGeometry){let Ve=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,vt=Math.min(V.instanceCount,Ve);lt.renderInstances(at,Pt,vt)}else lt.render(at,Pt)};function Be(y,F,V){y.transparent===!0&&y.side===Tn&&y.forceSinglePass===!1?(y.side=Xt,y.needsUpdate=!0,Mi(y,F,V),y.side=di,y.needsUpdate=!0,Mi(y,F,V),y.side=Tn):Mi(y,F,V)}this.compile=function(y,F,V=null){V===null&&(V=y),p=Te.get(V),p.init(F),w.push(p),V.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),y!==V&&y.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let G=new Set;return y.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let he=B.material;if(he)if(Array.isArray(he))for(let ye=0;ye<he.length;ye++){let Ue=he[ye];Be(Ue,V,B),G.add(Ue)}else Be(he,V,B),G.add(he)}),p=w.pop(),G},this.compileAsync=function(y,F,V=null){let G=this.compile(y,F,V);return new Promise(B=>{function he(){if(G.forEach(function(ye){ce.get(ye).currentProgram.isReady()&&G.delete(ye)}),G.size===0){B(y);return}setTimeout(he,10)}ee.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let ft=null;function Ln(y){ft&&ft(y)}function _n(){Dn.stop()}function _s(){Dn.start()}let Dn=new Od;Dn.setAnimationLoop(Ln),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(y){ft=y,de.setAnimationLoop(y),y===null?Dn.stop():Dn.start()},de.addEventListener("sessionstart",_n),de.addEventListener("sessionend",_s),this.render=function(y,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(de.cameraAutoUpdate===!0&&de.updateCamera(F),F=de.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,F,N),p=Te.get(y,w.length),p.init(F),w.push(p),te.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ht.setFromProjectionMatrix(te,On,F.reversedDepth),Z=this.localClippingEnabled,Re=pe.init(this.clippingPlanes,Z),m=K.get(y,E.length),m.init(),E.push(m),de.enabled===!0&&de.isPresenting===!0){let he=v.xr.getDepthSensingMesh();he!==null&&ni(he,F,-1/0,v.sortObjects)}ni(y,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(me,ve),nt=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,nt&&De.addToRenderList(m,y),this.info.render.frame++,Re===!0&&pe.beginShadows();let V=p.state.shadowsArray;Pe.render(V,y,F),Re===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=m.opaque,B=m.transmissive;if(p.setupLights(),F.isArrayCamera){let he=F.cameras;if(B.length>0)for(let ye=0,Ue=he.length;ye<Ue;ye++){let Ce=he[ye];mr(G,B,y,Ce)}nt&&De.render(y);for(let ye=0,Ue=he.length;ye<Ue;ye++){let Ce=he[ye];Do(m,y,Ce,Ce.viewport)}}else B.length>0&&mr(G,B,y,F),nt&&De.render(y),Do(m,y,F);N!==null&&D===0&&(_e.updateMultisampleRenderTarget(N),_e.updateRenderTargetMipmap(N)),y.isScene===!0&&y.onAfterRender(v,y,F),Se.resetDefaultState(),S=-1,M=null,w.pop(),w.length>0?(p=w[w.length-1],Re===!0&&pe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function ni(y,F,V,G){if(y.visible===!1)return;if(y.layers.test(F.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(F);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ht.intersectsSprite(y)){G&&Oe.setFromMatrixPosition(y.matrixWorld).applyMatrix4(te);let ye=O.update(y),Ue=y.material;Ue.visible&&m.push(y,ye,Ue,V,Oe.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||ht.intersectsObject(y))){let ye=O.update(y),Ue=y.material;if(G&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Oe.copy(y.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Oe.copy(ye.boundingSphere.center)),Oe.applyMatrix4(y.matrixWorld).applyMatrix4(te)),Array.isArray(Ue)){let Ce=ye.groups;for(let qe=0,$e=Ce.length;qe<$e;qe++){let We=Ce[qe],at=Ue[We.materialIndex];at&&at.visible&&m.push(y,ye,at,V,Oe.z,We)}}else Ue.visible&&m.push(y,ye,Ue,V,Oe.z,null)}}let he=y.children;for(let ye=0,Ue=he.length;ye<Ue;ye++)ni(he[ye],F,V,G)}function Do(y,F,V,G){let B=y.opaque,he=y.transmissive,ye=y.transparent;p.setupLightsView(V),Re===!0&&pe.setGlobalState(v.clippingPlanes,V),G&&Q.viewport(P.copy(G)),B.length>0&&vi(B,F,V),he.length>0&&vi(he,F,V),ye.length>0&&vi(ye,F,V),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function mr(y,F,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Yn(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?rs:kn,minFilter:Ni,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));let he=p.state.transmissionRenderTarget[G.id],ye=G.viewport||P;he.setSize(ye.z*v.transmissionResolutionScale,ye.w*v.transmissionResolutionScale);let Ue=v.getRenderTarget(),Ce=v.getActiveCubeFace(),qe=v.getActiveMipmapLevel();v.setRenderTarget(he),v.getClearColor($),Y=v.getClearAlpha(),Y<1&&v.setClearColor(16777215,.5),v.clear(),nt&&De.render(V);let $e=v.toneMapping;v.toneMapping=xi;let We=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Re===!0&&pe.setGlobalState(v.clippingPlanes,G),vi(y,V,G),_e.updateMultisampleRenderTarget(he),_e.updateRenderTargetMipmap(he),ee.has("WEBGL_multisampled_render_to_texture")===!1){let at=!1;for(let gt=0,Pt=F.length;gt<Pt;gt++){let At=F[gt],lt=At.object,Ve=At.geometry,vt=At.material,dt=At.group;if(vt.side===Tn&&lt.layers.test(G.layers)){let un=vt.side;vt.side=Xt,vt.needsUpdate=!0,gr(lt,V,G,Ve,vt,dt),vt.side=un,vt.needsUpdate=!0,at=!0}}at===!0&&(_e.updateMultisampleRenderTarget(he),_e.updateRenderTargetMipmap(he))}v.setRenderTarget(Ue,Ce,qe),v.setClearColor($,Y),We!==void 0&&(G.viewport=We),v.toneMapping=$e}function vi(y,F,V){let G=F.isScene===!0?F.overrideMaterial:null;for(let B=0,he=y.length;B<he;B++){let ye=y[B],Ue=ye.object,Ce=ye.geometry,qe=ye.group,$e=ye.material;$e.allowOverride===!0&&G!==null&&($e=G),Ue.layers.test(V.layers)&&gr(Ue,F,V,Ce,$e,qe)}}function gr(y,F,V,G,B,he){y.onBeforeRender(v,F,V,G,B,he),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),B.onBeforeRender(v,F,V,G,y,he),B.transparent===!0&&B.side===Tn&&B.forceSinglePass===!1?(B.side=Xt,B.needsUpdate=!0,v.renderBufferDirect(V,F,G,B,y,he),B.side=di,B.needsUpdate=!0,v.renderBufferDirect(V,F,G,B,y,he),B.side=Tn):v.renderBufferDirect(V,F,G,B,y,he),y.onAfterRender(v,F,V,G,B,he)}function Mi(y,F,V){F.isScene!==!0&&(F=Ie);let G=ce.get(y),B=p.state.lights,he=p.state.shadowsArray,ye=B.state.version,Ue=q.getParameters(y,B.state,he,F,V),Ce=q.getProgramCacheKey(Ue),qe=G.programs;G.environment=y.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(y.isMeshStandardMaterial?je:tt).get(y.envMap||G.environment),G.envMapRotation=G.environment!==null&&y.envMap===null?F.environmentRotation:y.envMapRotation,qe===void 0&&(y.addEventListener("dispose",ne),qe=new Map,G.programs=qe);let $e=qe.get(Ce);if($e!==void 0){if(G.currentProgram===$e&&G.lightsStateVersion===ye)return zi(y,Ue),$e}else Ue.uniforms=q.getUniforms(y),y.onBeforeCompile(Ue,v),$e=q.acquireProgram(Ue,Ce),qe.set(Ce,$e),G.uniforms=Ue.uniforms;let We=G.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(We.clippingPlanes=pe.uniform),zi(y,Ue),G.needsLights=ki(y),G.lightsStateVersion=ye,G.needsLights&&(We.ambientLightColor.value=B.state.ambient,We.lightProbe.value=B.state.probe,We.directionalLights.value=B.state.directional,We.directionalLightShadows.value=B.state.directionalShadow,We.spotLights.value=B.state.spot,We.spotLightShadows.value=B.state.spotShadow,We.rectAreaLights.value=B.state.rectArea,We.ltc_1.value=B.state.rectAreaLTC1,We.ltc_2.value=B.state.rectAreaLTC2,We.pointLights.value=B.state.point,We.pointLightShadows.value=B.state.pointShadow,We.hemisphereLights.value=B.state.hemi,We.directionalShadowMap.value=B.state.directionalShadowMap,We.directionalShadowMatrix.value=B.state.directionalShadowMatrix,We.spotShadowMap.value=B.state.spotShadowMap,We.spotLightMatrix.value=B.state.spotLightMatrix,We.spotLightMap.value=B.state.spotLightMap,We.pointShadowMap.value=B.state.pointShadowMap,We.pointShadowMatrix.value=B.state.pointShadowMatrix),G.currentProgram=$e,G.uniformsList=null,$e}function xr(y){if(y.uniformsList===null){let F=y.currentProgram.getUniforms();y.uniformsList=cs.seqWithValue(F.seq,y.uniforms)}return y.uniformsList}function zi(y,F){let V=ce.get(y);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function _r(y,F,V,G,B){F.isScene!==!0&&(F=Ie),_e.resetTextureUnits();let he=F.fog,ye=G.isMeshStandardMaterial?F.environment:null,Ue=N===null?v.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ji,Ce=(G.isMeshStandardMaterial?je:tt).get(G.envMap||ye),qe=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,$e=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),We=!!V.morphAttributes.position,at=!!V.morphAttributes.normal,gt=!!V.morphAttributes.color,Pt=xi;G.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Pt=v.toneMapping);let At=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,lt=At!==void 0?At.length:0,Ve=ce.get(G),vt=p.state.lights;if(Re===!0&&(Z===!0||y!==M)){let Le=y===M&&G.id===S;pe.setState(G,y,Le)}let dt=!1;G.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==vt.state.version||Ve.outputColorSpace!==Ue||B.isBatchedMesh&&Ve.batching===!1||!B.isBatchedMesh&&Ve.batching===!0||B.isBatchedMesh&&Ve.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ve.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ve.instancing===!1||!B.isInstancedMesh&&Ve.instancing===!0||B.isSkinnedMesh&&Ve.skinning===!1||!B.isSkinnedMesh&&Ve.skinning===!0||B.isInstancedMesh&&Ve.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ve.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ve.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ve.instancingMorph===!1&&B.morphTexture!==null||Ve.envMap!==Ce||G.fog===!0&&Ve.fog!==he||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==pe.numPlanes||Ve.numIntersection!==pe.numIntersection)||Ve.vertexAlphas!==qe||Ve.vertexTangents!==$e||Ve.morphTargets!==We||Ve.morphNormals!==at||Ve.morphColors!==gt||Ve.toneMapping!==Pt||Ve.morphTargetsCount!==lt)&&(dt=!0):(dt=!0,Ve.__version=G.version);let un=Ve.currentProgram;dt===!0&&(un=Mi(G,F,B));let Si=!1,dn=!1,C=!1,j=un.getUniforms(),ue=Ve.uniforms;if(Q.useProgram(un.program)&&(Si=!0,dn=!0,C=!0),G.id!==S&&(S=G.id,dn=!0),Si||M!==y){Q.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),j.setValue(T,"projectionMatrix",y.projectionMatrix),j.setValue(T,"viewMatrix",y.matrixWorldInverse);let Ze=j.map.cameraPosition;Ze!==void 0&&Ze.setValue(T,we.setFromMatrixPosition(y.matrixWorld)),J.logarithmicDepthBuffer&&j.setValue(T,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&j.setValue(T,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,dn=!0,C=!0)}if(B.isSkinnedMesh){j.setOptional(T,B,"bindMatrix"),j.setOptional(T,B,"bindMatrixInverse");let Le=B.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),j.setValue(T,"boneTexture",Le.boneTexture,_e))}B.isBatchedMesh&&(j.setOptional(T,B,"batchingTexture"),j.setValue(T,"batchingTexture",B._matricesTexture,_e),j.setOptional(T,B,"batchingIdTexture"),j.setValue(T,"batchingIdTexture",B._indirectTexture,_e),j.setOptional(T,B,"batchingColorTexture"),B._colorsTexture!==null&&j.setValue(T,"batchingColorTexture",B._colorsTexture,_e));let Ne=V.morphAttributes;if((Ne.position!==void 0||Ne.normal!==void 0||Ne.color!==void 0)&&le.update(B,V,un),(dn||Ve.receiveShadow!==B.receiveShadow)&&(Ve.receiveShadow=B.receiveShadow,j.setValue(T,"receiveShadow",B.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(ue.envMap.value=Ce,ue.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(ue.envMapIntensity.value=F.environmentIntensity),dn&&(j.setValue(T,"toneMappingExposure",v.toneMappingExposure),Ve.needsLights&&ys(ue,C),he&&G.fog===!0&&se.refreshFogUniforms(ue,he),se.refreshMaterialUniforms(ue,G,W,oe,p.state.transmissionRenderTarget[y.id]),cs.upload(T,xr(Ve),ue,_e)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(cs.upload(T,xr(Ve),ue,_e),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&j.setValue(T,"center",B.center),j.setValue(T,"modelViewMatrix",B.modelViewMatrix),j.setValue(T,"normalMatrix",B.normalMatrix),j.setValue(T,"modelMatrix",B.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Le=G.uniformsGroups;for(let Ze=0,pt=Le.length;Ze<pt;Ze++){let xt=Le[Ze];Ke.update(xt,un),Ke.bind(xt,un)}}return un}function ys(y,F){y.ambientLightColor.needsUpdate=F,y.lightProbe.needsUpdate=F,y.directionalLights.needsUpdate=F,y.directionalLightShadows.needsUpdate=F,y.pointLights.needsUpdate=F,y.pointLightShadows.needsUpdate=F,y.spotLights.needsUpdate=F,y.spotLightShadows.needsUpdate=F,y.rectAreaLights.needsUpdate=F,y.hemisphereLights.needsUpdate=F}function ki(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(y,F,V){let G=ce.get(y);G.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),ce.get(y.texture).__webglTexture=F,ce.get(y.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,F){let V=ce.get(y);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0};let yr=T.createFramebuffer();this.setRenderTarget=function(y,F=0,V=0){N=y,A=F,D=V;let G=!0,B=null,he=!1,ye=!1;if(y){let Ce=ce.get(y);if(Ce.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(T.FRAMEBUFFER,null),G=!1;else if(Ce.__webglFramebuffer===void 0)_e.setupRenderTarget(y);else if(Ce.__hasExternalTextures)_e.rebindTextures(y,ce.get(y.texture).__webglTexture,ce.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let We=y.depthTexture;if(Ce.__boundDepthTexture!==We){if(We!==null&&ce.has(We)&&(y.width!==We.image.width||y.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_e.setupDepthRenderbuffer(y)}}let qe=y.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(ye=!0);let $e=ce.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray($e[F])?B=$e[F][V]:B=$e[F],he=!0):y.samples>0&&_e.useMultisampledRTT(y)===!1?B=ce.get(y).__webglMultisampledFramebuffer:Array.isArray($e)?B=$e[V]:B=$e,P.copy(y.viewport),k.copy(y.scissor),H=y.scissorTest}else P.copy(Ae).multiplyScalar(W).floor(),k.copy(ie).multiplyScalar(W).floor(),H=rt;if(V!==0&&(B=yr),Q.bindFramebuffer(T.FRAMEBUFFER,B)&&G&&Q.drawBuffers(y,B),Q.viewport(P),Q.scissor(k),Q.setScissorTest(H),he){let Ce=ce.get(y.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ce.__webglTexture,V)}else if(ye){let Ce=F;for(let qe=0;qe<y.textures.length;qe++){let $e=ce.get(y.textures[qe]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+qe,$e.__webglTexture,V,Ce)}}else if(y!==null&&V!==0){let Ce=ce.get(y.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Ce.__webglTexture,V)}S=-1},this.readRenderTargetPixels=function(y,F,V,G,B,he,ye,Ue=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=ce.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ye!==void 0&&(Ce=Ce[ye]),Ce){Q.bindFramebuffer(T.FRAMEBUFFER,Ce);try{let qe=y.textures[Ue],$e=qe.format,We=qe.type;if(!J.textureFormatReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=y.width-G&&V>=0&&V<=y.height-B&&(y.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+Ue),T.readPixels(F,V,G,B,ze.convert($e),ze.convert(We),he))}finally{let qe=N!==null?ce.get(N).__webglFramebuffer:null;Q.bindFramebuffer(T.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(y,F,V,G,B,he,ye,Ue=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=ce.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ye!==void 0&&(Ce=Ce[ye]),Ce)if(F>=0&&F<=y.width-G&&V>=0&&V<=y.height-B){Q.bindFramebuffer(T.FRAMEBUFFER,Ce);let qe=y.textures[Ue],$e=qe.format,We=qe.type;if(!J.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let at=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,at),T.bufferData(T.PIXEL_PACK_BUFFER,he.byteLength,T.STREAM_READ),y.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+Ue),T.readPixels(F,V,G,B,ze.convert($e),ze.convert(We),0);let gt=N!==null?ce.get(N).__webglFramebuffer:null;Q.bindFramebuffer(T.FRAMEBUFFER,gt);let Pt=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await ad(T,Pt,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,at),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,he),T.deleteBuffer(at),T.deleteSync(Pt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,F=null,V=0){let G=Math.pow(2,-V),B=Math.floor(y.image.width*G),he=Math.floor(y.image.height*G),ye=F!==null?F.x:0,Ue=F!==null?F.y:0;_e.setTexture2D(y,0),T.copyTexSubImage2D(T.TEXTURE_2D,V,0,0,ye,Ue,B,he),Q.unbindTexture()};let ii=T.createFramebuffer(),vr=T.createFramebuffer();this.copyTextureToTexture=function(y,F,V=null,G=null,B=0,he=null){he===null&&(B!==0?(Gr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=B,B=0):he=0);let ye,Ue,Ce,qe,$e,We,at,gt,Pt,At=y.isCompressedTexture?y.mipmaps[he]:y.image;if(V!==null)ye=V.max.x-V.min.x,Ue=V.max.y-V.min.y,Ce=V.isBox3?V.max.z-V.min.z:1,qe=V.min.x,$e=V.min.y,We=V.isBox3?V.min.z:0;else{let Ne=Math.pow(2,-B);ye=Math.floor(At.width*Ne),Ue=Math.floor(At.height*Ne),y.isDataArrayTexture?Ce=At.depth:y.isData3DTexture?Ce=Math.floor(At.depth*Ne):Ce=1,qe=0,$e=0,We=0}G!==null?(at=G.x,gt=G.y,Pt=G.z):(at=0,gt=0,Pt=0);let lt=ze.convert(F.format),Ve=ze.convert(F.type),vt;F.isData3DTexture?(_e.setTexture3D(F,0),vt=T.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(_e.setTexture2DArray(F,0),vt=T.TEXTURE_2D_ARRAY):(_e.setTexture2D(F,0),vt=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,F.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,F.unpackAlignment);let dt=T.getParameter(T.UNPACK_ROW_LENGTH),un=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Si=T.getParameter(T.UNPACK_SKIP_PIXELS),dn=T.getParameter(T.UNPACK_SKIP_ROWS),C=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,At.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,At.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,qe),T.pixelStorei(T.UNPACK_SKIP_ROWS,$e),T.pixelStorei(T.UNPACK_SKIP_IMAGES,We);let j=y.isDataArrayTexture||y.isData3DTexture,ue=F.isDataArrayTexture||F.isData3DTexture;if(y.isDepthTexture){let Ne=ce.get(y),Le=ce.get(F),Ze=ce.get(Ne.__renderTarget),pt=ce.get(Le.__renderTarget);Q.bindFramebuffer(T.READ_FRAMEBUFFER,Ze.__webglFramebuffer),Q.bindFramebuffer(T.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let xt=0;xt<Ce;xt++)j&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ce.get(y).__webglTexture,B,We+xt),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ce.get(F).__webglTexture,he,Pt+xt)),T.blitFramebuffer(qe,$e,ye,Ue,at,gt,ye,Ue,T.DEPTH_BUFFER_BIT,T.NEAREST);Q.bindFramebuffer(T.READ_FRAMEBUFFER,null),Q.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(B!==0||y.isRenderTargetTexture||ce.has(y)){let Ne=ce.get(y),Le=ce.get(F);Q.bindFramebuffer(T.READ_FRAMEBUFFER,ii),Q.bindFramebuffer(T.DRAW_FRAMEBUFFER,vr);for(let Ze=0;Ze<Ce;Ze++)j?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ne.__webglTexture,B,We+Ze):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Ne.__webglTexture,B),ue?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Le.__webglTexture,he,Pt+Ze):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Le.__webglTexture,he),B!==0?T.blitFramebuffer(qe,$e,ye,Ue,at,gt,ye,Ue,T.COLOR_BUFFER_BIT,T.NEAREST):ue?T.copyTexSubImage3D(vt,he,at,gt,Pt+Ze,qe,$e,ye,Ue):T.copyTexSubImage2D(vt,he,at,gt,qe,$e,ye,Ue);Q.bindFramebuffer(T.READ_FRAMEBUFFER,null),Q.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else ue?y.isDataTexture||y.isData3DTexture?T.texSubImage3D(vt,he,at,gt,Pt,ye,Ue,Ce,lt,Ve,At.data):F.isCompressedArrayTexture?T.compressedTexSubImage3D(vt,he,at,gt,Pt,ye,Ue,Ce,lt,At.data):T.texSubImage3D(vt,he,at,gt,Pt,ye,Ue,Ce,lt,Ve,At):y.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,he,at,gt,ye,Ue,lt,Ve,At.data):y.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,he,at,gt,At.width,At.height,lt,At.data):T.texSubImage2D(T.TEXTURE_2D,he,at,gt,ye,Ue,lt,Ve,At);T.pixelStorei(T.UNPACK_ROW_LENGTH,dt),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,un),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Si),T.pixelStorei(T.UNPACK_SKIP_ROWS,dn),T.pixelStorei(T.UNPACK_SKIP_IMAGES,C),he===0&&F.generateMipmaps&&T.generateMipmap(vt),Q.unbindTexture()},this.initRenderTarget=function(y){ce.get(y).__webglFramebuffer===void 0&&_e.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?_e.setTextureCube(y,0):y.isData3DTexture?_e.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?_e.setTexture2DArray(y,0):_e.setTexture2D(y,0),Q.unbindTexture()},this.resetState=function(){A=0,D=0,N=null,Q.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}};var bo=class n extends wt{constructor(){let e=n.SkyShader,t=new mn({name:e.name,uniforms:Ol.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Xt,depthWrite:!1});super(new et(1,1,1),t),this.isSky=!0}};bo.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new I},up:{value:new I(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Wl=class extends Qi{constructor(){super();let e=new et;e.deleteAttribute("uv");let t=new Jn({side:Xt}),i=new Jn,r=new Ui(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let s=new wt(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let o=new ln(e,i,6),a=new Rt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new wt(e,ds(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new wt(e,ds(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new wt(e,ds(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new wt(e,ds(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new wt(e,ds(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new wt(e,ds(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function ds(n){return new er({color:0,emissive:16777215,emissiveIntensity:n})}function Xd(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new kt,c=0;for(let h=0;h<n.length;++h){let u=n[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!r.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<n.length;++d){let f=n[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=n[d].attributes.position.count}l.setIndex(u)}for(let h in s){let u=Wd(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);let g=Wd(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Wd(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){let h=n[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}let o=new e(s),a=new zt(o,t,i),l=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<t;g++){let x=h.getComponent(d,g);a.setComponent(d+u,g,x)}}else o.set(h.array,l);l+=h.count*t}return r!==void 0&&(a.gpuType=r),a}var In=1/120,Xl=9.80665,hr=Object.freeze({name:"SF-172 Peregrine",dryMass:820,fuelDensity:.72,wingArea:16.2,span:11,maxPower:119e3,idleRpm:750,maxRpm:2700,stallAlpha:.28,cl0:.24,clAlpha:4.6,cd0:.032,induced:.058}),wo=Object.freeze([Object.freeze({...hr,id:"peregrine",role:"Balanced trainer",fuelCapacity:140,thrustLimit:2400,rollRate:1.2,color:13063477,wingHeight:2.55,rotateKt:52,description:"Predictable handling. A good first aircraft."}),Object.freeze({...hr,id:"swift",name:"SF-220 Swift",role:"Sport racer",dryMass:740,wingArea:13.5,span:9,maxPower:164e3,cd0:.026,fuelCapacity:110,thrustLimit:3100,rollRate:1.85,color:4373984,wingHeight:.7,rotateKt:58,description:"More power, quicker rolls, low wing. For chasing records."}),Object.freeze({...hr,id:"kestrel",name:"SF-90 Kestrel",role:"Light explorer",dryMass:560,wingArea:18.5,span:12.5,maxPower:82e3,cl0:.3,cd0:.04,fuelCapacity:90,thrustLimit:1900,rollRate:.95,color:15317321,wingHeight:2.55,rotateKt:43,description:"Lightweight, slower, and gentle. Great for sightseeing."})]),Yx=Object.freeze([Object.freeze({...hr,id:"valkyrie",name:"SF-X80 Valkyrie",role:"Twin-tail jet interceptor",dryMass:920,wingArea:14.8,span:9.6,maxPower:245e3,idleRpm:1100,maxRpm:3600,cd0:.021,induced:.048,fuelCapacity:180,thrustLimit:4600,rollRate:2.35,color:9133302,wingHeight:.85,rotateKt:62,isJet:!0,description:"High-thrust swept-wing interceptor with twin tails and glowing afterburner."})]),Eh=Object.freeze([...wo,...Yx]),Bi=n=>Eh.find(e=>e.id===n)||wo[0],Xe=(n,e,t)=>Math.max(e,Math.min(t,n)),ql=n=>n*Math.PI/180,Gn=n=>n*180/Math.PI,yi=n=>Math.atan2(Math.sin(n),Math.cos(n)),Ht=Object.freeze([{id:"SF01",name:"Skyforge Bay",x:0,z:0,elevation:12,heading:0,length:1500,width:38,runways:["36","18"]},{id:"SF02",name:"Pine Valley",x:6500,z:11e3,elevation:185,heading:.6,length:1250,width:34,runways:["03","21"]},{id:"SF03",name:"Cape Aurora",x:-8500,z:16500,elevation:28,heading:-.5,length:1650,width:40,runways:["33","15"]},{id:"SF04",name:"Highland Field",x:15e3,z:22e3,elevation:520,heading:1.2,length:1050,width:30,runways:["07","25"]}]),fs=Object.freeze({clear:{name:"Clear / calm",wind:0,direction:270,gust:0,turbulence:.05,cloud:.12,visibility:28e3,rain:0,temperature:15},breeze:{name:"Coastal breeze",wind:5,direction:280,gust:2,turbulence:.3,cloud:.45,visibility:2e4,rain:0,temperature:18},overcast:{name:"Overcast / rain",wind:7,direction:220,gust:3,turbulence:.5,cloud:1,visibility:9e3,rain:.7,temperature:11},fog:{name:"Morning fog",wind:2,direction:180,gust:.5,turbulence:.1,cloud:.55,visibility:2200,rain:0,temperature:8},storm:{name:"Thunderstorm / gusty",wind:11,direction:245,gust:5,turbulence:.65,cloud:1,visibility:6500,rain:.95,temperature:9}});function $x(n,e){let t=95+e*.009+115*Math.sin(n/4500)+100*Math.sin(e/3900),i=1100*Math.exp(-((n-14e3)**2+(e-17e3)**2)/9e7),r=260*Math.sin(n/1700)*Math.sin(e/2200)+85*Math.sin(n/520+e/710),s=18*Math.sin(n/110)*Math.sin(e/150);return t+i+r+s}function Pn(n,e,t){let i=t?kh(n,e,t):$x(n,e);for(let r of Ht){let s=n-r.x,o=e-r.z,a=s*Math.sin(r.heading)+o*Math.cos(r.heading),l=s*Math.cos(r.heading)-o*Math.sin(r.heading),c=Math.max(Math.abs(a)-r.length/2-160,Math.abs(l)-260);if(c<0)return r.elevation;if(c<450){let h=c/450,u=h*h*(3-2*h);i=r.elevation*(1-u)+i*u}}return i}var ur=(n,e,t)=>Math.max(0,Pn(n,e,t));function qd(n){let e=t=>Number(n.has(t));return{throttleUp:e("KeyW")+e("ShiftLeft")+e("ShiftRight"),throttleDown:e("ControlLeft")+e("ControlRight"),brake:e("KeyS")+e("Space")+e("KeyB"),throttleDownKeyS:e("KeyS"),turn:e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),pitch:e("ArrowUp")-e("ArrowDown"),rudder:e("KeyE")-e("KeyQ"),boost:e("KeyX")}}function Zx(n){let e=Math.floor(n.x/2e3),t=Math.floor(n.z/2e3);return Mr(e,t,n.world,Pn,Ht).some(i=>i.type==="building"&&Math.abs(n.x-i.x)<i.width/2+2&&Math.abs(n.z-i.z)<i.depth/2+2&&n.y<i.y+i.height+1)}function Jx(n,e,t){let i=e-n.x,r=t-n.z;return{along:i*Math.sin(n.heading)+r*Math.cos(n.heading),across:i*Math.cos(n.heading)-r*Math.sin(n.heading)}}function Kx(n,e){return Ht.find(t=>{let i=Jx(t,n,e);return Math.abs(i.along)<t.length/2&&Math.abs(i.across)<t.width/2})||null}function Qx(n,e){return(Gn(Math.atan2(e.x-n.x,e.z-n.z))+360)%360}function Yl(n){let e=n.route[n.waypoint]||Ht.find(s=>s.id===n.destination)||Ht[1],t=Math.hypot(e.x-n.x,e.z-n.z),i=Qx(n,e),r=Math.hypot(n.vx,n.vz);return{target:e,distance:t,bearing:i,error:Gn(yi(ql(i)-n.heading)),eta:r>2?t/r:null}}function jx(n){let e=n.weather,t=(e.wind+e.gust*Math.sin(n.time*.63+n.y*.002))*(1+Math.max(0,n.y)/12e3),i=ql(e.direction+180);return{x:Math.sin(i)*t,z:Math.cos(i)*t,y:e.turbulence*(.55*Math.sin(n.time*1.7)+.3*Math.sin(n.time*3.1))}}function $l(n={}){let e=Bi(n.aircraft),t=Ht.find(f=>f.id===n.departure)||Ht[0],i=n.runway===t.runways[1],r=t.heading+(i?Math.PI:0),s=n.start==="air"||["landing","emergency","race","aerobatics"].includes(n.mode),o=s?-3e3:-t.length/2+80,a=t.x+Math.sin(r)*o,l=t.z+Math.cos(r)*o,c=s?Math.max(t.elevation+(n.mode==="landing"?160:750),ur(a,l,n.world)+200):t.elevation+1.25,h=s||n.ready,u={version:1,world:n.world?yn(n.world).id:void 0,assist:n.assist!==!1&&!!n.world,aircraft:e.name,aircraftId:e.id,departure:t.id,destination:n.mode==="landing"?t.id:n.destination||"SF02",mode:n.mode||"free",runway:n.runway||t.runways[0],route:[],waypoint:0,x:a,y:c,z:l,vx:Math.sin(r)*(s?43:0),vy:s&&n.mode==="landing"?-2:0,vz:Math.cos(r)*(s?43:0),heading:r,pitch:s?.02:0,roll:0,p:0,q:0,r:0,controls:{elevator:0,aileron:0,rudder:0,throttle:h?n.mode==="landing"?.35:.7:0,mixture:1,trim:0,flaps:n.mode==="landing"?.5:0,brake:0},systems:{battery:!!h,ignition:!!h,starter:!1,engine:!!h,rpm:h?1900:0,batteryAh:24,voltage:h?28:0,alternator:!0,fuel:e.fuelCapacity,oilTemp:20,oilPressure:0,navLights:!0,landingLights:!1,beacon:!0,strobe:!1,panelLights:!1},failures:{engine:!1,electrical:!1},weather:{...fs[n.weather]||fs.clear,...n.customWeather||{}},hour:n.hour??yn(n.world).hour,dayCycle:!0,damage:0,time:0,grounded:!s,wasAirborne:s,airspeed:s?43:0,alpha:0,sideslip:0,lift:0,drag:0,thrust:0,density:1.225,gLoad:1,warnings:[],flightPath:[],lastPathTime:-1,distanceFlown:0,fuelUsed:0,peakAltitude:c,maxG:1,smoothness:0,previousControls:[0,0,0],touchdown:null,status:"active",objective:"Start the engine, taxi, and explore the fictional archipelago.",trainingStep:0,achievements:[],emergencyTriggered:!1},d=Ht.find(f=>f.id===u.destination)||Ht[1];if(u.route=n.route?.length?n.route.map(f=>({...f})):[{id:d.id,name:d.name,x:d.x,z:d.z}],u.mode==="free"&&u.systems.engine&&(u.objective=`Explore ${yn(u.world).name} \u2014 W climbs, S dives, A/D turn. M opens the full map; Hangar changes world or plane.`),u.mode==="landing"&&(u.objective=`Land on ${t.name} runway ${u.runway}; target 60\u201370 kt, shallow descent.`),u.mode==="crosscountry"&&(u.objective=`Fly the route and land at ${d.name}.`),u.mode==="emergency"&&(u.objective="Engine failure at 10 seconds. Glide at 65 kt, choose a safe landing area."),u.mode==="race"||u.mode==="aerobatics"){u.weather={...fs.clear},u.hour=14,u.dayCycle=!1;let f=u.mode==="aerobatics",g=Array.from({length:7},(x,m)=>{let p=350+m*(f?480:450),E=m<2?0:Math.sin((m-1)*(f?.95:.65))*(f?260:180),w=f&&m>=1?Math.sin(m*1.15)*95:0;return{id:`GATE${m+1}`,name:`Checkpoint ${m+1}`,x:a+Math.sin(r)*p+Math.cos(r)*E,y:c+w,z:l+Math.cos(r)*p-Math.sin(r)*E,heading:r,radius:f?85:90}});u.race={gates:g,next:0,countdown:3,elapsed:0,limit:120,outcome:null,styleScore:0},u.route=g.map(x=>({...x})),u.controls.throttle=.85,u.objective=f?"AEROBATICS \u2014 fly through the slalom rings at varying altitudes for bonus style points!":"RACE \u2014 get ready! Fly through the glowing rings in order."}return u}function e_(n,e){let t=n.systems,i=n.controls,r=Bi(n.aircraftId),s=t.battery&&t.batteryAh>0&&!n.failures.electrical;t.starter&&s&&t.ignition&&i.mixture>.15&&t.fuel>0&&!n.failures.engine&&(t.engine=!0),(!t.ignition||i.mixture<.05||t.fuel<=0||n.failures.engine)&&(t.engine=!1);let o=t.engine?r.idleRpm+i.throttle*(r.maxRpm-r.idleRpm):0;t.rpm+=(o-t.rpm)*Math.min(1,e*2);let a=t.engine&&t.rpm>1e3&&t.alternator&&!n.failures.electrical,l=2+(t.navLights?2:0)+(t.landingLights?7:0)+(t.panelLights?1:0)+(t.starter?100:0);t.batteryAh=Xe(t.batteryAh+(a?12:s?-l:0)*e/3600,0,24),t.voltage=s?a?28:22+t.batteryAh/12:0;let c=t.engine?(7e-4+i.throttle*.008)*(r.maxPower/hr.maxPower)*e:0;t.fuel=Math.max(0,t.fuel-c),n.fuelUsed+=c,t.oilTemp+=((t.engine?70+i.throttle*35:n.weather.temperature)-t.oilTemp)*e*.006,t.oilPressure+=((t.engine?20+t.rpm/60:0)-t.oilPressure)*e*2}function To(n){return n.airspeed*Math.sqrt(n.density/1.225)}function t_(n,e,t,i,r=hr){let s=r.stallAlpha+e*.035,o=Math.abs(n)>s,a=Xe(r.cl0+r.clAlpha*n+e*.65,-1.2,1.65+e*.4);o&&(a*=Xe(1-(Math.abs(n)-s)*2.4,.22,1));let l=16*Math.max(0,i)/r.span,c=Xe(l**2/(1+l**2),.15,1),h=r.cd0+r.induced*a**2*c+e*.065+(o?.18:0)+.1*Math.abs(t);return{cl:a,cd:h,stalled:o,groundEffect:c}}function Zl(n,e=In){if(n.status!=="active")return;e=Xe(e,0,.025);let t=n.controls,i=Bi(n.aircraftId);if(n.race?.countdown>0){n.race.countdown=Math.max(0,n.race.countdown-e),n.objective=`RACE \u2014 ${Math.ceil(n.race.countdown)||"GO"} \xB7 fly through the gold ring, then follow the cyan rings.`;return}let r={x:n.x,y:n.y,z:n.z};for(let Re of["throttle","mixture","flaps","brake"])t[Re]=Xe(t[Re],0,1);for(let Re of["elevator","aileron","rudder","trim"])t[Re]=Xe(t[Re],-1,1);if(n.time+=e,n.dayCycle&&(n.hour=(n.hour+e/3600)%24),n.mode==="emergency"&&n.time>10&&!n.emergencyTriggered&&(n.failures.engine=!0,n.emergencyTriggered=!0),e_(n,e),n.autopilot?.enabled&&!n.grounded){let Re=yi(n.autopilot.heading-n.heading),Z=n.autopilot.altitude-n.y,te=Xe(Re*1.8,-1,1),we=Xe(Z*.018-n.vy*.08,-.7,.7);n.assist?n.easyInput={pitch:we,turn:te,brake:0}:(t.aileron=Xe((te*.45-n.roll)*1.8,-1,1),t.elevator=Xe(we*.6,-1,1))}let s=jx(n),o=n.vx-s.x,a=n.vy-s.y,l=n.vz-s.z,c=Math.hypot(o,l),h=Math.hypot(c,a);n.airspeed=h;let u=c>.5?Math.atan2(o,l):n.heading,d=Math.atan2(a,Math.max(.5,c));n.alpha=yi(n.pitch-d),n.sideslip=yi(u-n.heading),n.density=1.225*Math.exp(-Math.max(0,n.y)/8500)*288.15/(273.15+n.weather.temperature);let f=i.dryMass+n.systems.fuel*i.fuelDensity,g=.5*n.density*h**2,x=Xe(g/900,0,2),m=n.weather.turbulence,p=(t.elevator*.45+t.trim*.15-(n.alpha-.035-t.flaps*.045)*1.3)*x;n.q+=(p-n.q)*e*3,n.p+=(t.aileron*i.rollRate*x-n.p*2.8)*e;let E=Xl*Math.tan(Xe(n.roll,-1.2,1.2))/Math.max(25,c),w=Xe(h/22,.15,1.3);n.r+=((n.grounded?t.rudder*w*.48:E+t.rudder*.22*x+n.sideslip*.8)-n.r)*e*2,n.pitch=Xe(n.pitch+n.q*e+m*Math.sin(n.time*2.9)*e*.008,-.9,.9),n.roll=yi(n.roll+n.p*e+m*Math.sin(n.time*2.2)*e*.015),n.heading=yi(n.heading+n.r*e),n.grounded&&(n.pitch=Xe(n.pitch,0,h>20?.2:.015),n.roll*=Math.exp(-e*8));let{cl:v,cd:R,stalled:A}=t_(n.alpha,t.flaps,n.sideslip,n.y-ur(n.x,n.z,n.world),i);n.lift=g*i.wingArea*v,n.drag=g*i.wingArea*R;let D=Math.exp(-Math.max(0,n.y)/11e3),N=Xe(1-Math.abs(t.mixture-Xe(1-n.y/1e4,.45,1))*1.5,0,1);n.thrust=n.systems.engine?Math.min(i.thrustLimit,i.maxPower*t.throttle*.75/Math.max(22,h))*D*N*Xe(n.systems.rpm/2200,0,1):0;let S=Math.sin(u),M=Math.cos(u),P=Math.sin(d),k=Math.cos(d),H=n.lift*Math.cos(n.roll)*k,$=-n.lift*Math.cos(n.roll)*P,Y=n.lift*Math.sin(n.roll)+g*i.wingArea*(t.rudder*.08-n.sideslip*.35),X=Math.sin(n.heading)*Math.cos(n.pitch)*n.thrust+S*$+M*Y,oe=Math.cos(n.heading)*Math.cos(n.pitch)*n.thrust+M*$-S*Y,W=Math.sin(n.pitch)*n.thrust+H-f*Xl;h>.1&&(X-=n.drag*o/h,W-=n.drag*a/h,oe-=n.drag*l/h),n.gLoad=n.lift/(f*Xl),n.maxG=Math.max(n.maxG,Math.abs(n.gLoad));let me=ur(n.x,n.z,n.world)+1.25;if(n.grounded&&n.y<=me+.2&&W<=0){W=0,n.vy=0,n.y=me;let Re=Math.hypot(n.vx,n.vz),Z=(t.brake*.55+.018)*Math.max(0,f*Xl-H);if(Re>.01){let we=Math.min(Z,Re*f/e);X-=we*n.vx/Re,oe-=we*n.vz/Re}let te=n.vx*Math.cos(n.heading)-n.vz*Math.sin(n.heading);X-=te*f*5*Math.cos(n.heading),oe+=te*f*5*Math.sin(n.heading)}else n.grounded=!1,n.wasAirborne=!0;if(n.assist){let Re=n.easyInput||{pitch:0,turn:0,brake:0},Z=Math.hypot(n.vx,n.vz),te=i.rollRate/1.2,we=Xe(Re.pitch,-1,1)*.32+(Re.brake&&!n.grounded?-.22:0),Oe=Xe(Re.turn,-1,1)*.5;n.pitch+=(we-n.pitch)*Math.min(1,e*2.8),n.roll+=(Oe-n.roll)*Math.min(1,e*3*te),n.p=0,n.q=0,n.r=Xe(Re.turn,-1,1)*(n.grounded?.3:.38)*te,n.heading=yi(n.heading+n.r*e);let Ie=n.systems.engine?(n.grounded?0:20)+t.throttle*(i.maxPower/119e3)*62:28,nt=Math.max(0,Math.sin(Math.max(0,n.pitch)))*Z*.55,_t=Z+(n.systems.engine?(Ie-Z)*.55-Math.min(nt*.45,Ie*.25):-(3+2.4))*e-(n.grounded?t.brake*22*e:0)-(Re.brake&&!n.grounded?12*e:0),T=n.grounded||Re.brake>0?Math.max(0,_t):Math.max(45,_t),z=!n.grounded||T*1.94384>i.rotateKt&&Re.pitch>=0,ee=n.grounded||z?1:Math.cos(n.pitch);n.vx=ee*Math.sin(n.heading)*T,n.vz=ee*Math.cos(n.heading)*T,n.grounded&&z&&Math.sin(n.pitch)>.08&&(n.vy=Math.sin(n.pitch)*T);let J=z?n.systems.engine?Math.sin(n.pitch)*T+Xe((Ie-Math.max(40,T))*.05,0,14):-3:0,Q=n.assist&&(Re.brake&&!n.grounded||J<0)&&J<-3.5?-3.5:J;n.vy+=(Q-n.vy)*Math.min(1,e*3),z&&(n.grounded=!1,n.wasAirborne=!0),n.airspeed=T,n.gLoad=1,n.alpha=.04,n.damage=Math.max(0,n.damage)}else n.vx+=X/f*e,n.vy+=W/f*e,n.vz+=oe/f*e;let ve=n.x,Ae=n.z;n.x+=n.vx*e,n.y+=n.vy*e,n.z+=n.vz*e,n.distanceFlown+=Math.hypot(n.x-ve,n.z-Ae);let ie=ur(n.x,n.z,n.world)+1.25;if(n.y<=ie){if(!n.grounded&&n.wasAirborne){let Re=Kx(n.x,n.z),Z=Math.max(0,-n.vy),te=Re?Math.min(Math.abs(Gn(yi(n.heading-Re.heading))),Math.abs(Gn(yi(n.heading-Re.heading-Math.PI)))):90;n.touchdown={time:n.time,verticalSpeed:Z,airspeed:h,airport:Re?.id||null,alignment:te,score:Math.round(Xe(100-Z*12-te*.8-Math.max(0,h-38)*2-(Re?0:25),0,100))},Z>6||Math.abs(n.roll)>.45||n.pitch<-.25||Pn(n.x,n.z,n.world)<0?n.damage=1:Z>3&&(n.damage=Math.max(n.damage,.25))}n.y=ie,n.vy=0,n.grounded=!0,n.damage>=1&&(n.status="crashed")}n.world&&Zx(n)&&(n.damage=1,n.status="crashed"),!n.assist&&(h>(i.isJet?135:88)||Math.abs(n.gLoad)>(i.isJet?6.5:4.4))&&(n.damage=Xe(n.damage+e*.05,0,1)),n.damage>=1&&(n.status="crashed"),n.peakAltitude=Math.max(n.peakAltitude,n.y);let rt=[t.elevator,t.aileron,t.rudder];n.smoothness+=rt.reduce((Re,Z,te)=>Re+Math.abs(Z-n.previousControls[te]),0),n.previousControls=rt,n.warnings=[],!n.assist&&A&&h>15&&!n.grounded&&n.warnings.push("STALL \u2014 release pull, lower the nose slightly, add full power"),h>(i.isJet?120:75)&&n.warnings.push("OVERSPEED"),n.systems.fuel<15&&n.warnings.push("LOW FUEL"),!n.systems.engine&&!n.grounded&&n.warnings.push("ENGINE OFF \u2014 best glide 65 kt, pick a landing area now"),n.systems.voltage<20&&n.warnings.push("ELECTRICAL BUS OFF"),n.damage>0&&n.warnings.push("AIRFRAME DAMAGE"),n.time-n.lastPathTime>=1&&(n.flightPath.push({x:n.x,y:n.y,z:n.z,time:n.time}),n.flightPath.length>1800&&n.flightPath.shift(),n.lastPathTime=n.time);let ht=Yl(n);!n.race&&ht.distance<600&&n.waypoint<n.route.length-1&&n.waypoint++,n.race?n_(n,r,e):i_(n,e)}function n_(n,e,t){let i=n.race;if(i.elapsed+=t,n.status==="crashed"){i.outcome="crashed",n.objective="Race ended \u2014 aircraft lost. Try again or change planes in the hangar.";return}if(i.elapsed>=i.limit){n.status="failed",i.outcome="timeout",n.objective="Time expired \u2014 try again and follow the rings in order.";return}let r=i.gates[i.next],s=l=>(l.x-r.x)*Math.sin(r.heading)+(l.z-r.z)*Math.cos(r.heading),o=s(e),a=s(n);if(o<0&&a>=0){let l=-o/(a-o),c=e.x+(n.x-e.x)*l,h=e.y+(n.y-e.y)*l,u=e.z+(n.z-e.z)*l,d=(c-r.x)*Math.cos(r.heading)-(u-r.z)*Math.sin(r.heading),f=Math.hypot(d,h-r.y);f<=r.radius&&(i.styleScore=(i.styleScore||0)+Math.round((1-f/r.radius)*100+Math.abs(n.roll)*80),i.next++,n.waypoint=Math.min(i.next,i.gates.length-1))}if(i.next===i.gates.length)n.status="complete",i.outcome="finished",n.achievements.push("race-finish"),n.objective=`RACE COMPLETE \u2014 ${i.elapsed.toFixed(2)} seconds!`;else{let l=i.gates[i.next],c=Math.hypot(n.x-l.x,n.y-l.y,n.z-l.z);n.objective=`RACE \xB7 ${i.next}/${i.gates.length} rings \xB7 ${(i.limit-i.elapsed).toFixed(1)}s left \xB7 next ${Math.round(c)}m \xB7 ${n.y<l.y-25?"climb toward ring":n.y>l.y+25?"descend toward ring":"hold altitude"}${s(n)>0&&i.next===i.gates.indexOf(r)?" \xB7 missed ring: turn around and approach from the front":""}`}}function i_(n,e){if(n.status==="crashed"){n.objective="Flight ended: impact / structural limits exceeded. Restart or review debrief.";return}if(n.mode==="training"){let t=["Battery ON, ignition ON, mixture rich, then START.","Taxi: throttle 15\u201325%, rudder steering, brakes. Reach 5 kt.","Takeoff: full power, rotate above 50 kt, climb past 100 ft AGL.","Straight and level: fly 80\u2013110 kt, within \xB15\xB0 bank and \xB12 m/s vertical speed for 10 seconds.","Turn: bank between 15\xB0 and 35\xB0 while airborne.","Return to an airport, land and brake to a stop."],i=n.trainingStep;n.objective=`TRAINING ${Math.min(i+1,6)}/6 \u2014 ${t[i]||"Training complete."}`;let r=n.y-ur(n.x,n.z,n.world),s=[n.systems.engine,n.grounded&&Math.hypot(n.vx,n.vz)>2.6,!n.grounded&&r>30,!n.grounded&&Math.abs(n.roll)<.087&&Math.abs(n.vy)<2&&n.airspeed>41&&n.airspeed<57,!n.grounded&&Math.abs(n.roll)>.26&&Math.abs(n.roll)<.61,!!n.touchdown?.airport&&n.grounded&&Math.hypot(n.vx,n.vz)<2];i===3&&(n.levelTime=s[3]?(n.levelTime||0)+e:0),s[i]&&(i!==3||n.levelTime>10)&&(n.trainingStep++,n.achievements.push(`training-${i+1}`)),n.trainingStep>=6&&(n.status="complete",n.objective="Training complete \u2014 review your flight report.")}else if(n.touchdown&&n.grounded&&Math.hypot(n.vx,n.vz)<2){let t=n.touchdown.airport===n.destination&&n.waypoint===n.route.length-1;(n.mode==="landing"&&t||n.mode==="crosscountry"&&t||n.mode==="emergency")&&(n.status="complete",n.objective="Flight complete \u2014 review touchdown and navigation performance.")}}function Ah(n){return{format:"skyforge-flight-report",version:1,aircraft:n.aircraft,aircraftId:n.aircraftId,world:n.world||"legacy",controlMode:n.assist?"easy":"simulation",race:n.race?{course:`${n.world||"legacy"}/${n.assist?"easy":"simulation"}/${n.departure}/${n.runway}`,checkpoints:n.race.next,total:n.race.gates.length,seconds:n.race.elapsed,outcome:n.race.outcome,styleScore:n.race.styleScore||0}:null,fictionalWorld:!0,mode:n.mode,status:n.status,durationSeconds:n.time,distanceMeters:n.distanceFlown,fuelUsedLiters:n.fuelUsed,peakAltitudeMeters:n.peakAltitude,maxG:n.maxG,touchdown:n.touchdown,controlVariation:n.smoothness,path:n.flightPath,suggestions:n.race?[n.race.outcome==="finished"?"Race finished! Try another aircraft or beat your personal best.":"Fly through every ring in order; keep gentle bank and pitch corrections."]:n.touchdown?[n.touchdown.verticalSpeed>2?"Reduce descent rate before touchdown; flare progressively.":"Controlled vertical speed at touchdown.",n.touchdown.alignment>10?"Align with the runway before the flare.":"Good runway alignment."]:["Practice a stabilized approach at 60\u201370 kt.","Keep an airport within gliding range."]}}function Yd(n=globalThis.localStorage){try{let e=JSON.parse(n.getItem("skyforge-save-v1"));if(e?.version!==1||!Array.isArray(e.logs)||!Array.isArray(e.training))return null;let t=e.settings||{};return{version:1,settings:{sensitivity:Xe(Number(t.sensitivity)||1,.3,2),invert:!!t.invert,deadzone:Xe(Number(t.deadzone)||.12,.02,.5),quality:["low","medium","high"].includes(t.quality)?t.quality:"medium",volume:Xe(Number(t.volume)||0,0,1)},config:e.config||{},training:e.training.filter(r=>typeof r=="string"),logs:e.logs.slice(-20),records:Object.fromEntries(Object.entries(e.records||{}).filter(([r,s])=>/^[-a-z0-9/]+$/i.test(r)&&typeof s=="number"&&Number.isFinite(s)&&s>0)),aircraft:hr.name}}catch{return null}}function $d(n,e=globalThis.localStorage){try{return e.setItem("skyforge-save-v1",JSON.stringify({...n,version:1,logs:n.logs.slice(-20)})),!0}catch{return!1}}var r_=n=>Math.max(0,Math.min(255,Math.round(n))),s_=n=>Math.max(0,Math.sin((n-6)/12*Math.PI)),Bt=(n,e={})=>new Jn({color:n,roughness:.65,...e});function Zd(n,e="medium",t=()=>{}){let i=new Gl({canvas:n,antialias:!0,powerPreference:"high-performance"});i.setPixelRatio(Math.min(devicePixelRatio,e==="high"?1.75:e==="low"?1:1.25)),i.shadowMap.enabled=e!=="low",i.shadowMap.type=Ha,i.outputColorSpace=an,i.toneMapping=Qa;let r=new Qi;r.fog=new Xs(10992838,8e-5);let s=new hs(i),o=new Wl,a=s.fromScene(o,.04);r.environment=a.texture,r.environmentIntensity=.48,o.dispose(),s.dispose();let l=new Qt(64,1,.08,28e3),c=new co(12443647,3687210,2);r.add(c);let h=new po(16772562,3);h.castShadow=!0,h.shadow.mapSize.set(1024,1024),Object.assign(h.shadow.camera,{left:-55,right:55,top:55,bottom:-55,near:1,far:350}),h.shadow.bias=-2e-4,r.add(h,h.target);let u=new bo;u.scale.setScalar(25e3),r.add(u);let d=u.material.uniforms;d.turbidity.value=4,d.rayleigh.value=1.6,d.mieCoefficient.value=.006,d.mieDirectionalG.value=.8;let f=new mn({uniforms:{time:{value:0},color:{value:new He(1340042)},light:{value:1}},vertexShader:"uniform float time; varying vec3 wp; varying float wave; void main(){vec3 p=position;p.z+=sin(p.x*.009+time)*.65+cos(p.y*.006+time*.7)*.5+sin((p.x+p.y)*.015+time*1.3)*.25;wave=p.z;wp=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"uniform vec3 color;uniform float light;varying vec3 wp;varying float wave;void main(){float glint=pow(max(0.,sin(wp.x*.01+wp.y*.015)),25.);float foam=smoothstep(.8,1.2,wave)*.12;gl_FragColor=vec4((color*(.75+wave*.06)+vec3(glint*.2+foam))*light,1.);}"}),g=new wt(new mi(7e4,7e4,150,150),f);g.rotation.x=-Math.PI/2,r.add(g);let x=document.createElement("canvas");x.width=256,x.height=256;let m=x.getContext("2d"),p=m.createImageData(256,256);for(let C=0;C<256*256;C++){let j=C%256,ue=Math.floor(C/256),Ne=Math.sin(j*12.9898+ue*78.233)*43758.5453%1,Le=r_(165+Ne*38+12*Math.sin(j*.16)*Math.cos(ue*.11));p.data.set([Le,Le,Le,255],C*4)}m.putImageData(p,0,0);let E=new Pi(x);E.wrapS=E.wrapT=kr,E.repeat.set(60,60),E.colorSpace=an;let w=new Jn({vertexColors:!0,roughness:1,map:E,bumpMap:E,bumpScale:.4}),v="beach",R=new Map,A=2e3,D=e==="low"?2:3,N=Bt(2707255),S=Bt(7492410),M=Bt(11252398),P=new Ft({color:16731871}),k=Bt(2567224),H=Bt(16053488),$=Bt(15228223),Y=new et(1,1,1),X=new pi(9,7,7);function oe(C,j){let ue=`${C},${j}`;if(R.has(ue))return;let Le=Math.max(Math.abs(C-Math.floor(W/A)),Math.abs(j-Math.floor(me/A)))<=1?e==="low"?36:44:16,Ze=new mi(A,A,Le,Le);Ze.rotateX(-Math.PI/2);let pt=Ze.attributes.position,xt=new Float32Array(pt.count*3),Vt=new He;for(let Ye=0;Ye<pt.count;Ye++){let Jt=pt.getX(Ye)+C*A+A/2,Ot=pt.getZ(Ye)+j*A+A/2,Tt=Pn(Jt,Ot,v);pt.setY(Ye,Tt),Vt.set(Tt<4?yn(v).sand:yn(v).ground),Vt.lerp(new He(16777215),Xe(Tt/1400,0,.6)),Vt.multiplyScalar(.88+.12*Math.sin(Jt*.01)*Math.sin(Ot*.009)),Vt.toArray(xt,Ye*3)}Ze.setAttribute("color",new zt(xt,3)),Ze.computeVertexNormals();let st=new jt,Un=new wt(Ze,w);Un.receiveShadow=!0,st.add(Un),st.position.set(C*A+A/2,0,j*A+A/2);let Ct=Mr(C,j,v,Pn,Ht),ke=new Rt,Ge=Ct.filter(Ye=>Ye.type==="building"),Ut=Ct.filter(Ye=>Ye.type==="palm"),ut=Ct.filter(Ye=>Ye.type==="boat"),Zt=Ct.filter(Ye=>Ye.type==="turbine");if(Ge.length){let Ye=new ln(Y,M,Ge.length),Jt=new ln(Y,P,Ge.length*3);Ge.forEach((Tt,Vi)=>{ke.position.set(Tt.x-st.position.x,Tt.y+Tt.height/2,Tt.z-st.position.z),ke.rotation.set(0,0,0),ke.scale.set(Tt.width,Tt.height,Tt.depth),ke.updateMatrix(),Ye.setMatrixAt(Vi,ke.matrix);for(let Uo=0;Uo<3;Uo++)ke.position.y=Tt.y+Tt.height*(.25+Uo*.3),ke.scale.set(Tt.width+1,2,Tt.depth+1),ke.updateMatrix(),Jt.setMatrixAt(Vi*3+Uo,ke.matrix)}),st.add(Ye),v==="cyberpunk"||v==="city"?st.add(Jt):Jt.dispose();let Ot=new ln(Y,k,16);for(let Tt=0;Tt<16;Tt++){let Vi=Tt<8;ke.position.set(Vi?0:-860+(Tt-8)*235,Pn(st.position.x,st.position.z,v)+.4,Vi?-860+Tt*235:0),ke.scale.set(Vi?2e3:16,.6,Vi?16:2e3),ke.updateMatrix(),Ot.setMatrixAt(Tt,ke.matrix)}st.add(Ot)}if(Ut.length){let Ye=new ln(Y,S,Ut.length),Jt=new ln(X,N,Ut.length);Ut.forEach((Ot,Tt)=>{ke.position.set(Ot.x-st.position.x,Ot.y+Ot.height/2,Ot.z-st.position.z),ke.rotation.set(0,0,0),ke.scale.set(1.4,Ot.height,1.4),ke.updateMatrix(),Ye.setMatrixAt(Tt,ke.matrix),ke.position.y=Ot.y+Ot.height,ke.scale.set(1.8,.25,1.8),ke.updateMatrix(),Jt.setMatrixAt(Tt,ke.matrix)}),st.add(Ye,Jt)}if(ut.length){let Ye=new ln(Y,H,ut.length),Jt=new ln(X,$,ut.length);ut.forEach((Ot,Tt)=>{ke.position.set(Ot.x-st.position.x,1.2,Ot.z-st.position.z),ke.rotation.set(0,Ot.heading||0,0),ke.scale.set(Ot.width,2.4,Ot.depth),ke.updateMatrix(),Ye.setMatrixAt(Tt,ke.matrix),ke.position.y=8,ke.scale.set(.3,2,1.1),ke.updateMatrix(),Jt.setMatrixAt(Tt,ke.matrix)}),st.add(Ye,Jt)}if(Zt.length){let Ye=new ln(Y,H,Zt.length);Zt.forEach((Jt,Ot)=>{ke.position.set(Jt.x-st.position.x,Jt.y+Jt.height/2,Jt.z-st.position.z),ke.rotation.set(0,0,0),ke.scale.set(2.2,Jt.height,2.2),ke.updateMatrix(),Ye.setMatrixAt(Ot,ke.matrix)}),st.add(Ye)}r.add(st),R.set(ue,{group:st,geo:Ze})}let W=0,me=0,ve="";function Ae(C,j){W=C,me=j;let ue=Math.floor(C/A),Ne=Math.floor(j/A),Le=`${ue},${Ne}`;if(Le!==ve){ve=Le;for(let[Ze,pt]of R){let[xt,Vt]=Ze.split(",").map(Number);(Math.abs(xt-ue)>D||Math.abs(Vt-Ne)>D)&&(r.remove(pt.group),pt.geo.dispose(),pt.group.traverse(st=>{st.isInstancedMesh&&st.dispose()}),R.delete(Ze))}for(let Ze=-D;Ze<=D;Ze++)for(let pt=-D;pt<=D;pt++)oe(ue+Ze,Ne+pt)}}function ie(C,j,ue,Ne=0,Le=0,Ze=0){let pt=new wt(j,ue);return pt.position.set(Ne,Le,Ze),pt.castShadow=!0,pt.receiveShadow=!0,C.add(pt),pt}let rt=Bt(3159608),ht=Bt(15526102),Re=Bt(8953002),Z=[],te=[],we=new Ft({color:16726831}),Oe=new Ft({color:16774870}),Ie=new Ft({color:8060872,transparent:!0,opacity:.35,depthWrite:!1});for(let C of Ht){let j=new jt;j.position.set(C.x,C.elevation+.08,C.z),j.rotation.y=C.heading,r.add(j),ie(j,new et(C.width,.12,C.length),rt),ie(j,new et(14,.1,C.length*.65),rt,85,0,0),ie(j,new et(110,.1,180),rt,70,0,-C.length*.25);for(let Ct=-C.length/2+35;Ct<C.length/2;Ct+=60)ie(j,new et(1.2,.03,25),ht,0,.08,Ct);for(let Ct of[-1,1]){for(let ke=-3;ke<=3;ke++)ie(j,new et(2,.03,32),ht,ke*4,.1,Ct*(C.length/2-30));for(let ke=0;ke<4;ke++)ie(j,new cn(1.1,6,4),ke<2?Oe:we,-C.width/2-8-ke*3.5,.8,Ct*(C.length/2-140))}for(let Ct=0;Ct<4;Ct++)ie(j,new et(45,19,42),Re,155,9.5,-C.length*.25+Ct*65);ie(j,new et(26,33,24),Re,190,16.5,100);let ue=new jt;ue.position.set(190,34.5,100),j.add(ue);let Ne=ie(ue,new pi(8,42,10,1,!0),Ie,0,0,21);Ne.rotation.x=Math.PI/2,te.push(ue);let Le=ie(j,new Sn(.3,.3,12,8),ht,55,6,C.length/2-90),Ze=ie(j,new pi(1.5,7,10,1,!0),Bt(16742717),55,11,C.length/2-90);Ze.rotation.z=Math.PI/2,Z.push({sock:Ze,pole:Le});let pt=new Ft({color:16767883});for(let Ct=-C.length/2;Ct<C.length/2;Ct+=80)for(let ke of[-1,1])ie(j,new cn(.7,6,4),pt,ke*(C.width/2+2),.5,Ct);for(let Ct=0;Ct<5;Ct++)ie(j,new et(22,.08,1),pt,0,.2,-C.length/2-30-Ct*35);let xt=document.createElement("canvas");xt.width=512,xt.height=96;let Vt=xt.getContext("2d");Vt.fillStyle="#def5ff",Vt.font="bold 38px sans-serif",Vt.fillText(`${C.id} \xB7 ${C.name}`,8,62);let st=new Pi(xt),Un=new Ys(new Yr({map:st,transparent:!0,depthTest:!1}));Un.position.set(0,80,0),Un.scale.set(230,43,1),j.add(Un)}let nt=new jt;r.add(nt);let _t=Bt(15134194,{metalness:.2,roughness:.4}),T=[Bt(16739146),Bt(16760381),Bt(4052688),Bt(11032055)];for(let C=0;C<6;C++){let j=new jt;C<2?(ie(j,new cn(22,16,12),_t,0,0,0).scale.set(1,1,2.8),ie(j,new et(8,5,18),Bt(2635072),0,-22,0)):(ie(j,new cn(18,14,12),T[C%T.length],0,0,0),ie(j,new et(5,4,5),S,0,-23,0)),j.userData={cx:(C-2.5)*3600,cz:C*4200-1500,alt:480+C%3*190,speed:.05+C*.012,radius:900+C*250,isBlimp:C<2},nt.add(j)}r.updateMatrixWorld(!0);for(let C of r.children.filter(j=>j.isGroup&&j!==nt)){let j=new Map;C.traverse(ue=>{if(ue.isMesh&&!te.includes(ue.parent)){let Ne=j.get(ue.material)||[];Ne.push(ue),j.set(ue.material,Ne)}});for(let[ue,Ne]of j){if(Ne.length<3)continue;let Le=Ne.map(xt=>{let Vt=xt.geometry.clone();return Vt.applyMatrix4(xt.matrix),Vt}),Ze=Xd(Le);if(Le.forEach(xt=>xt.dispose()),!Ze)continue;Ne.forEach(xt=>{C.remove(xt),xt.geometry.dispose()});let pt=ie(C,Ze,ue);pt.castShadow=!1}}let z=new jt;r.add(z);let ee=new ao({color:15263192,metalness:.18,roughness:.3,clearcoat:.7,clearcoatRoughness:.2}),J=Bt(3753292,{roughness:.8}),Q=Bt(13063477),ge=Bt(1383198),ce=Bt(10213091,{transparent:!0,opacity:.14,metalness:.25,roughness:.12,depthWrite:!1}),_e=ie(z,new Sn(.55,.7,2.2,20),ee,0,.8,2.2);_e.rotation.x=Math.PI/2;let tt=ie(z,new Sn(.7,.2,3.3,20),ee,0,1,-2.35);tt.rotation.x=Math.PI/2,ie(z,new et(1.65,.24,2),ee,0,.45,.1),ie(z,new et(1.65,1.35,2),ce,0,1.7,.1);function je(C,j){let ue=new es;ue.moveTo(-j*.5,0),ue.bezierCurveTo(-j*.55,.08,-j*.2,.16,j*.5,.015),ue.bezierCurveTo(j*.1,-.035,-j*.35,-.045,-j*.5,0);let Ne=new oo(ue,{depth:C,steps:1,bevelEnabled:!1,curveSegments:16});return Ne.translate(0,0,-C/2),Ne.rotateY(Math.PI/2),Ne.computeVertexNormals(),Ne}let b=ie(z,je(10.8,1.55),ee,0,2.55,-.25),_=[],O=[];for(let C of[-1,1])_.push(ie(z,new et(.04,.22,1.6),Q,C*5.35,2.5,-.25)),ie(z,new et(.025,.15,4),Q,C*.73,.9,-.8);let q=new ln(new cn(.012,5,4),Bt(10003625,{metalness:.8,roughness:.25}),80),se=new Rt;for(let C=0;C<80;C++)se.position.set((C%2?1:-1)*.72,.57+Math.floor(C/2)%2*.5,-2.6+Math.floor(C/4)*.24),se.updateMatrix(),q.setMatrixAt(C,se.matrix);z.add(q),ie(z,new et(4,.12,1.15),ee,0,1,-3.1);let K=ie(z,new et(.14,1.7,1.25),ee,0,1.7,-3.2),Te=new jt;Te.visible=!1,z.add(Te);for(let C of[-1,1]){let j=ie(Te,new et(.12,1.55,1.35),Q,C*1.15,1.65,-3.15);j.rotation.z=-C*.28,ie(Te,new et(.55,.45,2.4),J,C*.95,.75,.2)}let pe=new Ft({color:3718648,transparent:!0,opacity:.85,side:Tn,depthWrite:!1}),Pe=ie(Te,new pi(.42,2.8,16,1,!0),pe,0,.95,-5.1);Pe.rotation.x=-Math.PI/2;let De=ie(Te,new pi(.24,1.8,12,1,!0),new Ft({color:16777215,transparent:!0,opacity:.9,depthWrite:!1}),0,.95,-4.6);De.rotation.x=-Math.PI/2;let le=[],Me=[];for(let C of[-1,1]){let j=ie(z,new et(.08,.08,3),J,C*1.8,1.65,-.1);j.rotation.z=C*.9,O.push(j);let ue=ie(z,new et(2.3,.1,.35),Q,C*4.1,2.53,-1.15);le.push(ue);let Ne=ie(z,new et(2.1,.1,.4),ee,C*1.65,2.53,-1.18);Me.push(Ne),ie(z,new et(.05,1.4,.06),J,C*.84,1.55,.92).rotation.z=C*.08,ie(z,new et(.05,1.4,.06),J,C*.84,1.55,-.88),ie(z,new et(.05,.05,1.8),J,C*.85,2.2,0);let Le=ie(z,new Sn(.29,.29,.22,16),ge,C*1.1,-.7,-.65);Le.rotation.z=Math.PI/2,ie(z,new et(.1,.85,.12),ee,C*.9,-.25,-.65).rotation.z=C*.4,ie(z,new et(.54,.09,.44),J,C*.43,.03,.42),ie(z,new et(.56,.65,.14),J,C*.43,.4,-.08).rotation.x=-.13}let Je=ie(z,new Sn(.23,.23,.18,16),ge,0,-.8,2);Je.rotation.z=Math.PI/2,ie(z,new Sn(.05,.05,.9),J,0,-.35,2);let ze=ie(z,new et(3.7,.1,.35),Q,0,1,-3.7),Se=ie(z,new et(.12,1.5,.35),Q,0,1.7,-3.83),Ke=new jt;Ke.position.set(0,1,3.37),z.add(Ke),ie(Ke,new et(.15,2.4,.08),J),ie(Ke,new cn(.22,12,8),ee,0,0,.1),ie(z,new et(1.62,.74,.16),J,0,1.15,1.04),ie(z,new et(1.65,.12,.7),J,0,1.55,1.25);let U=new Ui(14018293,7,4,2);U.position.set(0,1.75,-.4),z.add(U);let de=ie(Ke,new Qr(1.2,40),new Ft({color:6911360,transparent:!0,opacity:.1,side:Tn,depthWrite:!1}),0,0,.04),xe=ie(z,new ns(.2,.027,8,16,Math.PI*1.5),J,-.43,1.02,.68);xe.rotation.z=Math.PI*.25,ie(z,new Sn(.028,.028,.38,8),J,-.43,1.02,.86).rotation.x=Math.PI/2;let Ee=[],ae=[],ne=[],Fe=["IAS","ATT","ALT","TURN","HDG","V/S"];for(let C=0;C<6;C++){let j=-.65+C%3*.24,ue=1.32-Math.floor(C/3)*.25;ie(z,new Sn(.106,.106,.035,24),ge,j,ue,.935).rotation.x=Math.PI/2;let Ne=document.createElement("canvas");Ne.width=256,Ne.height=256;let Le=new Pi(Ne),Ze=ie(z,new Qr(.089,24),new Ft({map:Le}),j,ue,.914);Ze.rotation.y=Math.PI,ne.push({canvas:Ne,texture:Le});let pt=ie(z,new et(.007,.069,.003),new Ft({color:15658700}),j,ue+.025,.908),xt=new jt;xt.position.set(j,ue,.904),z.add(xt),pt.position.set(0,.027,0),xt.add(pt),ae.push(xt);for(let Vt=0;Vt<12;Vt++){let st=Vt*Math.PI/6,Un=ie(z,new et(.005,.012,.002),ht,j+Math.sin(st)*.076,ue+Math.cos(st)*.076,.907);Un.rotation.z=-st}}let Qe=document.createElement("canvas");Qe.width=512,Qe.height=512;let Be=Qe.getContext("2d"),ft=new Pi(Qe),Ln=ie(z,new mi(.54,.48),new Ft({map:ft}),.36,1.22,.912);Ln.rotation.y=Math.PI;for(let[C,j,ue]of[["battery",-.64,7653608],["ignition",-.4,11913601],["starter",-.16,14723682],["landingLights",.1,15658669],["panelLights",.34,15115385]]){let Ne=ie(z,new et(.12,.065,.055),Bt(ue),j,.85,.899);Ne.userData.control=C,Ee.push(Ne)}let _n=ie(z,new cn(.055,10,8),J,.58,.85,.85);_n.userData.control="throttle",Ee.push(_n);let _s=ie(z,new cn(.055,10,8),Q,.72,.85,.85);_s.userData.control="mixture",Ee.push(_s);let Dn=new Ui(16758381,0,5);Dn.position.set(0,1.9,.5),z.add(Dn);let ni=new uo(16771254,0,300,.28,.6);ni.position.set(0,.3,2.8),ni.target.position.set(0,-1,70),z.add(ni,ni.target);let Do=ie(z,new cn(.07,8,6),new Ft({color:16724770}),0,2.65,-3.2),mr=[];for(let C of[-1,1])mr.push(ie(z,new cn(.09,8,6),new Ft({color:16777215}),C*5.45,2.55,0));let vi=[];for(let[C,j]of[[-5.4,16724016],[5.4,3604341],[0,16777215]]){let ue=ie(z,new cn(.075,8,6),new Ft({color:j}),C,2.58,C?-.3:-3.3);vi.push(ue)}let gr=48,Mi=[];for(let C of[-1,1]){let j=new kt;j.setAttribute("position",new zt(new Float32Array(gr*3),3));let ue=new $s(j,new Jr({color:14874367,transparent:!0,opacity:.55}));ue.frustumCulled=!1,r.add(ue),Mi.push({line:ue,geo:j,side:C,history:[]})}let xr=new er({color:15790315,transparent:!0,opacity:.7,depthWrite:!1}),zi=new ln(new cn(1,8,5),xr,90);r.add(zi);let _r=new Rt,ys=new kt,ki=new Float32Array(1200*3);for(let C=0;C<1200;C++)ki[C*3]=C*71%200-100,ki[C*3+1]=C*37%150,ki[C*3+2]=C*47%200-100;ys.setAttribute("position",new zt(ki,3));let yr=new Zs(ys,new Kr({color:11192541,size:.2,transparent:!0,opacity:.65}));r.add(yr);let ii="cockpit",vr=0,y=0,F=64,V=0,G=new I(0,100,0),B=0,he=0,ye=!1,Ue=new mo;n.addEventListener("click",C=>{if(ii!=="cockpit")return;let j=n.getBoundingClientRect();Ue.setFromCamera(new fe((C.clientX-j.left)/j.width*2-1,-(C.clientY-j.top)/j.height*2+1),l);let ue=Ue.intersectObjects(Ee)[0];ue&&t(ue.object.userData.control)}),n.addEventListener("contextmenu",C=>C.preventDefault()),n.addEventListener("pointermove",C=>{C.buttons===2&&(vr-=C.movementX*.003,y=Math.max(-1,Math.min(.75,y-C.movementY*.003)),V+=C.movementX*.003)}),n.addEventListener("wheel",C=>{C.preventDefault(),F=Math.max(35,Math.min(90,F+C.deltaY*.025))},{passive:!1});function Ce(C){ii=C,vr=0,y=0,C==="free"&&G.copy(l.position)}function qe(){let C=n.clientWidth,j=n.clientHeight;i.setSize(C,j,!1),l.aspect=C/j,l.updateProjectionMatrix()}window.addEventListener("resize",qe),qe();let $e=new jt;r.add($e);let We=new ns(90,2.2,8,48),at=[new Ft({color:15449976}),new Ft({color:9298406})],gt=null,Pt=null;function At(C,j){if(C.aircraftId!==Pt){Pt=C.aircraftId;let ue=Bi(C.aircraftId),Ne=ue.span/11;Q.color.setHex(ue.color),b.scale.x=Ne,b.position.y=ue.wingHeight,_.forEach((Le,Ze)=>{Le.position.x=(Ze?1:-1)*5.35*Ne,Le.position.y=ue.wingHeight-.05}),le.forEach((Le,Ze)=>{Le.position.x=(Ze?1:-1)*4.1*Ne,Le.position.y=ue.wingHeight-.02}),Me.forEach(Le=>Le.position.y=ue.wingHeight-.02),O.forEach(Le=>Le.visible=ue.wingHeight>2),mr.forEach((Le,Ze)=>{Le.position.x=(Ze?1:-1)*5.45*Ne,Le.position.y=ue.wingHeight}),vi.forEach((Le,Ze)=>{Ze<2&&(Le.position.x=(Ze?1:-1)*5.4*Ne,Le.position.y=ue.wingHeight)}),Te.visible=!!ue.isJet,Ke.visible=!ue.isJet,K.visible=!ue.isJet,Mi.forEach(Le=>Le.history.length=0)}if(Te.visible){let ue=.5+C.controls.throttle*1.25+Math.sin(j*42)*.08;Pe.visible=C.systems.engine&&C.controls.throttle>.1,De.visible=Pe.visible,Pe.scale.set(1,ue,1),De.scale.set(1,ue*.85,1)}if(gt!==C.race?.gates){gt=C.race?.gates,$e.clear();for(let ue of gt||[]){let Ne=new wt(We,at[1]);Ne.position.set(ue.x,ue.y,ue.z),Ne.rotation.y=ue.heading,$e.add(Ne)}}C.race&&$e.children.forEach((ue,Ne)=>{ue.visible=Ne>=C.race.next,ue.material=at[Ne===C.race.next?0:1]})}let lt=new I,Ve=new An,vt=new I,dt=new I;function un(C,j,ue={}){let Ne=Math.min(.1,he?j-he:.016666666666666666);he=j;let Le=yn(C.world);if(v!==Le.id){v=Le.id;for(let Ge of R.values())r.remove(Ge.group),Ge.geo.dispose(),Ge.group.traverse(Ut=>{Ut.isInstancedMesh&&Ut.dispose()});R.clear(),ve=""}n.dataset.world=v,n.dataset.aircraft=C.aircraftId,M.color.setHex(Le.building),f.uniforms.color.value.setHex(Le.water),P.color.setHex(Le.accent),At(C,j),Ae(C.x,C.z),lt.set(C.x,C.y,C.z),z.position.copy(lt),z.rotation.set(-C.pitch,C.heading,-C.roll,"YXZ"),Ve.copy(z.quaternion);let Ze=Bi(C.aircraftId),pt=Ze.span*.49,xt=!C.grounded&&(C.airspeed>34||ye||Math.abs(C.roll)>.35);Mi.forEach(Ge=>{if(xt?(vt.set(Ge.side*pt,Ze.wingHeight,-.4).applyQuaternion(Ve).add(lt),Ge.history.unshift(vt.clone()),Ge.history.length>gr&&Ge.history.pop()):Ge.history.length&&Ge.history.pop(),Ge.line.visible=Ge.history.length>1,Ge.line.visible){Ge.line.material.color.setHex(ye?Ze.color:14874367),Ge.line.material.opacity=ye?.82:.45;let Ut=Ge.geo.attributes.position.array;for(let ut=0;ut<gr;ut++){let Zt=Ge.history[Math.min(ut,Ge.history.length-1)];Ut[ut*3]=Zt.x,Ut[ut*3+1]=Zt.y,Ut[ut*3+2]=Zt.z}Ge.geo.attributes.position.needsUpdate=!0}}),te.forEach(Ge=>{Ge.rotation.y=j*1.8}),nt.children.forEach((Ge,Ut)=>{let ut=Ge.userData,Zt=j*ut.speed+Ut;Ge.position.set(ut.cx+Math.sin(Zt)*ut.radius,ut.alt+Math.sin(j*.5+Ut)*12,ut.cz+Math.cos(Zt)*ut.radius),ut.isBlimp&&(Ge.rotation.y=Zt+Math.PI/2)}),Ke.rotation.z+=C.systems.rpm/60*Math.PI*2*Ne,le.forEach((Ge,Ut)=>Ge.rotation.x=(Ut?1:-1)*C.controls.aileron*.35),Me.forEach(Ge=>Ge.rotation.x=C.controls.flaps*.5),ze.rotation.x=-C.controls.elevator*.35,Se.rotation.y=C.controls.rudder*.35,xe.rotation.z=Math.PI*.25-C.controls.aileron*.5,xe.position.z=.68-C.controls.elevator*.07,Do.visible=C.systems.voltage>20&&C.systems.beacon&&Math.sin(j*5)>0,mr.forEach(Ge=>Ge.visible=C.systems.voltage>20&&C.systems.strobe&&j%1<.12),de.visible=C.systems.rpm>1e3&&!Ze.isJet,U.intensity=s_(C.hour)*7+.15,Dn.intensity=C.systems.voltage>20&&C.systems.panelLights?3:0,ni.intensity=C.systems.voltage>20&&C.systems.landingLights?500:0,vi.forEach(Ge=>Ge.visible=C.systems.voltage>20&&C.systems.navLights);let Vt=Math.sin((C.hour-6)/12*Math.PI),st=Math.max(.025,Vt),Un=new I(.35,Vt,.5).normalize();d.sunPosition.value.copy(Un),u.visible=st>.05,r.background=new He().setRGB(.025+st*.16,.035+st*.3,.07+st*.48),c.intensity=(Le.id==="cyberpunk"?.8:.15)+st*1.9,h.intensity=st*3,h.position.copy(lt).addScaledVector(Un,180),h.target.position.copy(lt);let Ct=new He().setRGB(.035+st*.6,.05+st*.65,.075+st*.66);Ct.lerp(new He(Le.fog),Le.id==="cyberpunk"?.7:.35),r.fog.color.copy(Ct),r.fog.density=2.2/C.weather.visibility,i.setClearColor(Ct),f.uniforms.time.value=j,f.uniforms.light.value=.12+st,g.position.set(C.x,0,C.z),xr.opacity=.25+C.weather.cloud*.6,xr.color.setScalar(.15+st*.85);for(let Ge=0;Ge<90;Ge++)_r.position.set(C.x+(Ge*1747+j*9)%15e3-7500,1200+Ge%4*230,C.z+Ge*2377%15e3-7500),_r.scale.set(130+Ge%5*35,45+Ge%4*18,90+Ge%7*25),_r.updateMatrix(),zi.setMatrixAt(Ge,_r.matrix);if(zi.instanceMatrix.needsUpdate=!0,zi.count=Math.floor(C.weather.cloud*90),yr.visible=C.weather.rain>0,yr.position.copy(lt),yr.visible){for(let Ge=0;Ge<1200;Ge++)ki[Ge*3+1]=(Ge*37%150-j*45%150+150)%150-30;ys.attributes.position.needsUpdate=!0}Z.forEach(({sock:Ge})=>Ge.rotation.y=ql(C.weather.direction)),ii==="cockpit"?(vt.set(-.43,1.65,-.2).applyQuaternion(Ve),l.position.copy(lt).add(vt),l.quaternion.copy(Ve).multiply(new An().setFromEuler(new xn(y,Math.PI+vr,0,"YXZ")))):ii==="chase"?(vt.set(Math.sin(V)*13,5,-Math.cos(V)*15).applyQuaternion(Ve),dt.copy(lt).add(vt),l.position.lerp(dt,1-Math.exp(-Ne*8)),l.lookAt(lt.clone().add(new I(0,1,0)))):ii==="flyby"?(l.position.set(C.x+95*Math.sin(Math.floor(j/6)*1.7),Math.max(Si(C.x,C.z,Le.id)+20,C.y+12),C.z+95*Math.cos(Math.floor(j/6)*1.7)),l.lookAt(lt)):(G.x+=(ue.x||0)*120*Ne,G.y+=(ue.y||0)*120*Ne,G.z+=(ue.z||0)*120*Ne,l.position.copy(G),l.rotation.set(y,vr+Math.PI,0,"YXZ")),l.fov=F,l.updateProjectionMatrix();let ke=C.systems.voltage>20;if(ae[0].rotation.z=ke?-To(C)/80*Math.PI*1.7:0,ae[1].rotation.z=ke?C.roll:0,ae[2].rotation.z=ke?-C.y/304.8*Math.PI*2:0,ae[3].rotation.z=ke?-C.r*4:0,ae[4].rotation.z=ke?C.heading:0,ae[5].rotation.z=ke?-C.vy/10*Math.PI*.8:0,j-B>.2){B=j;let Ge=[`${Math.round(To(C)*1.94384)} KT`,`${Math.round(C.pitch*180/Math.PI)} DEG`,`${Math.round(C.y*3.28084)} FT`,`${(C.r*180/Math.PI).toFixed(1)} DEG/S`,`${Math.round((C.heading*180/Math.PI+360)%360)} DEG`,`${Math.round(C.vy*196.85)} FPM`];if(ne.forEach(({canvas:Ut,texture:ut},Zt)=>{let Ye=Ut.getContext("2d");Ye.fillStyle="#101c23",Ye.fillRect(0,0,256,256),ke&&Zt===1&&(Ye.save(),Ye.translate(128,128),Ye.rotate(C.roll),Ye.translate(0,C.pitch*150),Ye.fillStyle="#5b92ad",Ye.fillRect(-220,-350,440,350),Ye.fillStyle="#8b6b45",Ye.fillRect(-220,0,440,350),Ye.strokeStyle="#f6e5af",Ye.lineWidth=3,Ye.beginPath(),Ye.moveTo(-180,0),Ye.lineTo(180,0),Ye.stroke(),Ye.restore()),Ye.fillStyle=ke?"#cde1d8":"#34464e",Ye.textAlign="center",Ye.font="bold 26px monospace",Ye.fillText(Fe[Zt],128,75),Ye.font="22px monospace",Ye.fillText(ke?Ge[Zt]:"OFF",128,195),ut.needsUpdate=!0}),Be.fillStyle=ke?"#081c22":"#040506",Be.fillRect(0,0,512,512),ke){Be.strokeStyle="#2a4e58";for(let ut=0;ut<512;ut+=64)Be.beginPath(),Be.moveTo(ut,0),Be.lineTo(ut,512),Be.moveTo(0,ut),Be.moveTo(0,ut),Be.lineTo(512,ut),Be.stroke();let Ut=.017;for(let ut of Ht){let Zt=256+(ut.x-C.x)*Ut,Ye=260-(ut.z-C.z)*Ut;Be.fillStyle="#69d7dd",Be.fillRect(Zt-4,Ye-4,8,8),Be.font="20px monospace",Be.fillText(ut.id,Zt+8,Ye)}Be.strokeStyle="#ffd487",Be.beginPath(),Be.moveTo(256,260);for(let ut of C.route)Be.lineTo(256+(ut.x-C.x)*Ut,260-(ut.z-C.z)*Ut);Be.stroke(),Be.save(),Be.translate(256,260),Be.rotate(C.heading),Be.fillStyle="#ffffff",Be.beginPath(),Be.moveTo(0,-16),Be.lineTo(-9,12),Be.lineTo(9,12),Be.fill(),Be.restore(),Be.fillStyle="#b8e5dc",Be.font="22px monospace",Be.fillText(`RPM ${Math.round(C.systems.rpm)} FUEL ${C.systems.fuel.toFixed(1)}L`,12,34),Be.fillText(`OIL ${Math.round(C.systems.oilPressure)}psi ${Math.round(C.systems.oilTemp)}C`,12,470),Be.fillText("COM 122.80 \xB7 NAV 110.50 (fictional)",12,500)}ft.needsUpdate=!0}return i.render(r,l),{drawCalls:i.info.render.calls,triangles:i.info.render.triangles,chunks:R.size,camera:ii}}function Si(C,j,ue){return Math.max(0,Pn(C,j,ue))}function dn(){return ye=!ye,ye}return{render:un,setCamera:Ce,resize:qe,toggleSmoke:dn,renderer:i,camera:l,scene:r,aircraft:z,get mode(){return ii},get smoke(){return ye}}}var L=n=>document.getElementById(n),Qd=Yd(),yt=Qd||{version:1,settings:{sensitivity:1,invert:!1,deadzone:.12,quality:"medium",volume:0},config:{},training:[],logs:[]},re=$l({start:"air"}),Wt=null,tn=!1,nn=!1,Oi=0,Eo=0,Jd=0,Hn=[],Co={},Ro=!1,Rh={},dr=0,Ao=0,ti="peregrine",en=new Set,jn={x:0,y:0,active:!1},$t=null;function jd(n){Jl=n}var Jl="",Dt=n=>Number(n).toFixed(0),ef=n=>n*1.94384,ps=n=>n*3.28084;function o_(n){L(n).replaceChildren(...Ht.map(e=>{let t=document.createElement("option");return t.value=e.id,t.textContent=`${e.id} \xB7 ${e.name}`,t}))}L("world").replaceChildren(...No.map(n=>{let e=document.createElement("option");return e.value=n.id,e.textContent=n.name,e}));function tf(){let n=yn(L("world").value);L("worldDescription").textContent=n.description,L("hour").value=n.hour,L("hourLabel").value=`${n.hour}:00`,gs()}L("world").addEventListener("change",tf);L("aircraft").replaceChildren(...wo.map(n=>{let e=document.createElement("option");return e.value=n.id,e.textContent=`${n.name} \xB7 ${n.role}`,e}));function gs(){let n=Bi(ti||L("aircraft").value);L("aircraftCode").textContent=n.name.split(" ")[0],L("aircraftName").textContent=n.name.split(" ").slice(1).join(" "),L("aircraftStats").textContent=`${n.role} \xB7 ${Math.round(n.maxPower/745.7)} hp \xB7 ${n.fuelCapacity} L \xB7 rotate ~${n.rotateKt} kt`,L("aircraftDescription").textContent=n.description,L("jetPreset")?.classList.toggle("active",n.id==="valkyrie");let e=yt.records?.[`${n.id}/${L("world").value}/${L("assist").checked?"easy":"simulation"}/${L("departure").value}/${L("runway").value}`];L("raceBest").textContent=e?`Race personal best: ${e.toFixed(2)}s \xB7 this aircraft / runway`:"Race personal best: no finish yet on this aircraft / runway"}L("aircraft").addEventListener("change",()=>{ti=L("aircraft").value,gs()});L("jetPreset")&&(L("jetPreset").onclick=()=>{ti=ti==="valkyrie"?L("aircraft").value:"valkyrie",gs()});["departure","destination","mapDestination"].forEach(o_);L("destination").value="SF02";function Lh(){let n=Ht.find(e=>e.id===L("departure").value);L("runway").replaceChildren(...n.runways.map(e=>{let t=document.createElement("option");return t.value=e,t.textContent=`Runway ${e} \xB7 ${n.length} m`,t}))}L("departure").addEventListener("change",()=>{Lh(),gs()});Lh();["runway","assist"].forEach(n=>L(n).addEventListener("change",gs));for(let n of["world","aircraft","mode","start","departure","destination","weather","hour"])yt.config[n]!==void 0&&(L(n).value=yt.config[n]);Lh();yt.config.runway&&(L("runway").value=yt.config.runway);Eh.some(n=>n.id===yt.config.aircraft)?(ti=yt.config.aircraft,wo.some(n=>n.id===ti)&&(L("aircraft").value=ti)):(L("aircraft").value="peregrine",ti="peregrine");yt.config.controlsVersion!==2&&(L("start").value="air");L("assist").checked=yt.config.assist!==!1;tf();for(let n of["sensitivity","deadzone","quality","volume"])L(n).value=yt.settings[n];L("invert").checked=!1;L("hourLabel").value=`${L("hour").value}:00`;function nf(){let n=fs[L("weather").value]||fs.clear;L("wind").value=n.wind,L("windDirection").value=n.direction,L("visibility").value=n.visibility/1e3}nf();L("weather").addEventListener("change",nf);L("hour").addEventListener("input",()=>{L("hourLabel").value=`${L("hour").value}:00`});L("saveInfo").textContent=`Local flight log: ${yt.logs.length} flights \xB7 training stages completed: ${yt.training.length}/6. ${Qd?"Preferences restored.":""}`;function Lo(){return yt.settings={sensitivity:Number(L("sensitivity").value),invert:L("invert").checked,deadzone:Number(L("deadzone").value),quality:L("quality").value,volume:Number(L("volume").value)},yt.config=Rh,$d(yt)}function Io(n){L(n).hidden=!L(n).hidden}function Dh(){tn&&(nn=!nn,L("pause").hidden=!nn,en.clear())}function Uh(n){tn&&(n==="starter"?(re.systems.starter=!0,setTimeout(()=>re.systems.starter=!1,1200)):n==="throttle"?re.controls.throttle=Xe(re.controls.throttle+.1,0,1):n==="mixture"?re.controls.mixture=re.controls.mixture>.1?0:1:re.systems[n]=!re.systems[n],h_(),pr())}function Po(n){Wt?.setCamera(n),en.clear(),document.querySelectorAll("[data-camera]").forEach(e=>e.classList.toggle("active",e.dataset.camera===n))}function rf(){if(!Wt)return;let n=Wt.toggleSmoke();L("smokeToggle")&&(L("smokeToggle").textContent=n?"Smoke on":"Smoke off",L("smokeToggle").classList.toggle("active",n))}function sf(){if(!tn)return;let n=!re.autopilot?.enabled;re.autopilot={enabled:n,heading:re.heading,altitude:Math.max(120,re.y)},L("autopilotToggle")&&(L("autopilotToggle").textContent=n?"Autopilot ON":"Autopilot off",L("autopilotToggle").classList.toggle("active",n)),pr()}L("smokeToggle")&&(L("smokeToggle").onclick=rf);L("autopilotToggle")&&(L("autopilotToggle").onclick=sf);function Nh(){let n=ti||L("aircraft").value;Rh={controlsVersion:2,world:L("world").value,assist:L("assist").checked,aircraft:n,mode:L("mode").value,start:L("start").value,ready:L("start").value==="ready",departure:L("departure").value,destination:L("destination").value,runway:L("runway").value,weather:L("weather").value,hour:Number(L("hour").value),customWeather:{wind:Xe(Number(L("wind").value),0,25),direction:Xe(Number(L("windDirection").value),0,359),visibility:Xe(Number(L("visibility").value),1,40)*1e3}},re=$l(Rh),tn=!0,nn=!1,Ro=!1,Oi=0,ms={},Ih="",en.clear(),Po("chase"),L("mapPanel").hidden=!0,rn={x:1e4,z:15e3,span:5e4},Ph="",L("autopilotToggle")&&(L("autopilotToggle").textContent="Autopilot off",L("autopilotToggle").classList.remove("active")),["setup","pause","debrief"].forEach(e=>L(e).hidden=!0),["hud","flightInfo","cameraBar","hudOverlay","touchControls"].forEach(e=>{L(e)&&(L(e).hidden=!1)}),L("mapDestination").value=re.destination,Lo(),pr(),L("flightCanvas").focus()}L("flightForm").addEventListener("submit",n=>{n.preventDefault(),Nh()});L("pauseToggle").onclick=Dh;L("resume").onclick=Dh;L("restart").onclick=Nh;L("debriefRestart").onclick=Nh;function Fh(){tn=!1,nn=!1,en.clear(),["pause","debrief","hud","flightInfo","cameraBar","systems","mapPanel","controls","hudOverlay","touchControls"].forEach(n=>{L(n)&&(L(n).hidden=!0)}),L("setup").hidden=!1,re=$l({start:"air",world:L("world").value,aircraft:ti||L("aircraft").value}),gs(),L("saveInfo").textContent=`Local flight log: ${yt.logs.length} flights \xB7 training stages completed: ${yt.training.length}/6.`}L("dispatch").onclick=Fh;L("debriefDispatch").onclick=Fh;function of(){try{tn&&!Ro&&jl()}catch(n){jd("Debrief unavailable: "+n.message)}Fh(),L("aircraft").focus()}["hangarToggle","pauseHangar","debriefHangar"].forEach(n=>L(n).onclick=of);L("mapToggle").onclick=()=>Io("mapPanel");L("helpToggle").onclick=()=>Io("controls");L("systemsToggle").onclick=()=>Io("systems");document.querySelectorAll("[data-close]").forEach(n=>n.onclick=()=>L(n.dataset.close).hidden=!0);document.querySelectorAll("[data-camera]").forEach(n=>n.onclick=()=>Po(n.dataset.camera));document.querySelectorAll("[data-system]").forEach(n=>n.onclick=()=>Uh(n.dataset.system));document.querySelectorAll("[data-failure]").forEach(n=>n.onclick=()=>{let e=n.dataset.failure;re.failures[e]=!re.failures[e],pr()});for(let n of["throttle","mixture","trim","flaps"])L(n).addEventListener("input",()=>{re.controls[n]=Number(L(n).value)});for(let n of["sensitivity","deadzone","quality","invert","volume"])L(n).addEventListener("change",()=>{Lo(),n==="quality"&&Wt&&(Wt.renderer.setPixelRatio(Math.min(devicePixelRatio,{low:1,medium:1.25,high:1.75}[L("quality").value])),Wt.renderer.shadowMap.enabled=L("quality").value!=="low",Wt.resize())});L("mapDestination").onchange=()=>{if(re.race)return;re.destination=L("mapDestination").value;let n=Ht.find(e=>e.id===re.destination);re.route=[{id:n.id,name:n.name,x:n.x,z:n.z}],re.waypoint=0,Ql()};L("addWaypoint").onclick=()=>{if(re.race)return;let n=Number(L("waypointX").value)*1e3,e=Number(L("waypointZ").value)*1e3;!Number.isFinite(n)||!Number.isFinite(e)||Math.abs(n)>1e5||Math.abs(e)>1e5||(re.route.splice(Math.max(0,re.route.length-1),0,{id:`WP${re.route.length}`,name:`Waypoint ${re.route.length}`,x:n,z:e}),Ql())};var Ih="";function Ql(){let n=JSON.stringify([re.route,re.waypoint]);if(n===Ih)return;Ih=n;let e=L("routeList");e.replaceChildren(),re.route.forEach((t,i)=>{let r=document.createElement("li");if(r.textContent=`${i===re.waypoint?"\u2192 ":""}${t.name} (${(t.x/1e3).toFixed(1)}, ${(t.z/1e3).toFixed(1)} km)`,!re.race&&re.route.length>1&&i<re.route.length-1){let s=document.createElement("button");s.textContent="Remove",s.onclick=()=>{re.route.splice(i,1),re.waypoint=Math.min(re.waypoint,re.route.length-1),Ql()},r.appendChild(s)}e.appendChild(r)})}var fr=["cockpit","chase","free","flyby"],Kd=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyS","KeyA","KeyD","KeyB","KeyE","KeyF","BracketLeft","BracketRight","KeyC","Digit1","Digit2","Digit3","Digit4","KeyQ","KeyZ","ShiftLeft","ShiftRight","ControlLeft","ControlRight","Space","KeyR","KeyT","KeyP"];window.addEventListener("keydown",n=>{if(!(["INPUT","SELECT","TEXTAREA"].includes(document.activeElement?.tagName)&&n.code!=="Escape")){if(document.activeElement?.tagName==="BUTTON"&&Kd.includes(n.code)&&L("flightCanvas").focus(),n.code==="Escape"){n.preventDefault(),Dh();return}!tn||nn||(Kd.includes(n.code)&&(n.preventDefault(),en.add(n.code)),!n.repeat&&(n.code==="KeyM"&&(n.preventDefault(),Io("mapPanel")),n.key==="?"&&Io("controls"),n.code==="KeyR"&&Uh("starter"),n.code==="KeyT"&&rf(),n.code==="KeyP"&&sf(),n.code==="KeyF"&&(re.controls.flaps=re.controls.flaps>=.99?0:Math.min(1,re.controls.flaps+.33)),n.code==="BracketLeft"&&(re.controls.trim=Xe(re.controls.trim-.05,-1,1)),n.code==="BracketRight"&&(re.controls.trim=Xe(re.controls.trim+.05,-1,1)),n.code==="KeyC"&&Po(fr[(fr.indexOf(Wt.mode)+1)%fr.length]),n.code.startsWith("Digit")&&["Digit1","Digit2","Digit3","Digit4"].includes(n.code)&&Po(fr[Number(n.code.slice(-1))-1])))}});window.addEventListener("keyup",n=>en.delete(n.code));window.addEventListener("blur",()=>{en.clear(),tn&&!nn&&(nn=!0,L("pause").hidden=!1)});document.addEventListener("visibilitychange",()=>{document.hidden&&tn&&(nn=!0,en.clear(),L("pause").hidden=!1)});if(L("touchStick")){let n=L("touchStick"),e=L("touchKnob"),t=s=>{if(!jn.active)return;let o=n.getBoundingClientRect(),a=Xe((s.clientX-(o.left+o.width/2))/(o.width/2),-1,1),l=Xe((s.clientY-(o.top+o.height/2))/(o.height/2),-1,1);jn.x=a,jn.y=-l,e.style.transform=`translate(${a*32}px,${l*32}px)`};n.addEventListener("pointerdown",s=>{jn.active=!0,n.setPointerCapture(s.pointerId),t(s)}),n.addEventListener("pointermove",t);let i=()=>{jn.active=!1,jn.x=0,jn.y=0,e.style.transform="translate(0,0)"};n.addEventListener("pointerup",i),n.addEventListener("pointercancel",i);let r=(s,o)=>{let a=L(s);a&&(a.addEventListener("pointerdown",l=>{l.preventDefault(),en.add(o)}),["pointerup","pointercancel","pointerleave"].forEach(l=>a.addEventListener(l,()=>en.delete(o))))};r("touchPowerUp","KeyW"),r("touchBrake","KeyS"),L("touchCam")&&(L("touchCam").onclick=()=>Po(fr[(fr.indexOf(Wt.mode)+1)%fr.length]))}function af(n){let e=re.controls,t=yt.settings.sensitivity,i=Wt.mode==="free",r=qd(en);(r.pitch||r.turn||r.brake||jn.active)&&re.autopilot?.enabled&&(re.autopilot.enabled=!1,L("autopilotToggle")&&(L("autopilotToggle").textContent="Autopilot off",L("autopilotToggle").classList.remove("active")));let s=i?0:(r.pitch+jn.y)*t*(re.assist?1:yt.settings.invert?-1:1),o=i?0:(r.turn+jn.x)*t,a=i?0:r.rudder*t;i||(re.assist?(e.throttle=Xe(e.throttle+r.throttleUp*n*.35-(r.throttleDown+r.throttleDownKeyS)*n*.6,0,1),e.brake=r.brake?1:0):(e.brake=r.brake?1:0,e.throttle=Xe(e.throttle+(r.throttleUp-r.throttleDown)*n*.4,0,1)));let l=navigator.getGamepads?.()[0];if(l&&!i){let c=yt.settings.deadzone,h=u=>Math.abs(u)>c?Math.sign(u)*(Math.abs(u)-c)/(1-c):0;o+=h(l.axes[0]||0)*t,s+=h(l.axes[1]||0)*t*(re.assist?1:yt.settings.invert?-1:1),a+=h(l.axes[2]||0),e.throttle=Xe(e.throttle+((l.buttons[7]?.value||0)-(l.buttons[6]?.value||0))*n*.3,0,1),e.brake=Math.max(e.brake,l.buttons[0]?.value||0)}re.autopilot?.enabled||(re.easyInput={pitch:Xe(s,-1,1),turn:Xe(o,-1,1),brake:r.brake?1:0},e.elevator+=(Xe(s,-1,1)-e.elevator)*Math.min(1,n*4),e.aileron+=(Xe(o,-1,1)-e.aileron)*Math.min(1,n*4),e.rudder+=(Xe(a,-1,1)-e.rudder)*Math.min(1,n*4))}function a_(n,e){let t=L("hudOverlay");if(!t||t.hidden)return;let i=t.getContext("2d"),r=t.width,s=t.height,o=r/2,a=s/2;i.clearRect(0,0,r,s),i.strokeStyle="#8de1e6aa",i.fillStyle="#8de1e6cc",i.lineWidth=1.5,i.font="10px monospace",i.beginPath(),i.moveTo(o-24,a),i.lineTo(o-8,a),i.lineTo(o-4,a+5),i.moveTo(o+24,a),i.lineTo(o+8,a),i.lineTo(o+4,a+5),i.stroke(),i.save(),i.translate(o,a),i.rotate(n.roll);let l=Gn(n.pitch)*4.2;i.strokeStyle="#6ee7b799",i.beginPath(),i.moveTo(-95,l),i.lineTo(-28,l),i.moveTo(28,l),i.lineTo(95,l),i.stroke();for(let d of[-20,-10,10,20]){let f=l-d*4.2;Math.abs(f)>115||(i.beginPath(),i.moveTo(-42,f),i.lineTo(-18,f),i.lineTo(-18,f+(d>0?5:-5)),i.moveTo(42,f),i.lineTo(18,f),i.lineTo(18,f+(d>0?5:-5)),i.stroke(),i.fillText(String(Math.abs(d)),46,f+3))}i.restore();let c=o+Xe(Gn(n.sideslip)*4,-120,120),h=a-Xe(Gn(n.pitch-n.alpha)*4.2,-100,100);i.strokeStyle="#ebbf78dd",i.beginPath(),i.arc(c,h,6,0,Math.PI*2),i.moveTo(c-14,h),i.lineTo(c-6,h),i.moveTo(c+6,h),i.lineTo(c+14,h),i.moveTo(c,h-6),i.lineTo(c,h-13),i.stroke();let u=o+Xe(e.error*2.6,-155,155);i.strokeStyle="#ebbf78",i.beginPath(),i.moveTo(u,22),i.lineTo(u+7,29),i.lineTo(u,36),i.lineTo(u-7,29),i.closePath(),i.stroke(),i.fillStyle="#ebbf78",i.textAlign="center",i.fillText(`${e.target.id||e.target.name} ${(e.distance/1e3).toFixed(1)}km`,u,16)}var rn={x:1e4,z:15e3,span:5e4},Ph="",ei=null,Kl=document.createElement("canvas");Kl.width=280;Kl.height=210;function l_(n){let e=L("mapCanvas").getBoundingClientRect();return{x:rn.x+((n.clientX-e.left)/e.width-.5)*rn.span,z:rn.z-((n.clientY-e.top)/e.height-.5)*rn.span*5/7}}function Bh(n){rn.span=Xe(rn.span*n,2e3,1e5),xs(L("mapCanvas"))}L("mapZoomIn").onclick=()=>Bh(.7);L("mapZoomOut").onclick=()=>Bh(1/.7);L("mapFit").onclick=()=>{rn={x:(vs.minX+vs.maxX)/2,z:(vs.minZ+vs.maxZ)/2,span:7e4},xs(L("mapCanvas"))};L("mapCenter").onclick=()=>{rn.x=re.x,rn.z=re.z,xs(L("mapCanvas"))};L("mapHangar").onclick=of;L("mapCanvas").addEventListener("wheel",n=>{n.preventDefault(),Bh(n.deltaY<0?.8:1.25)},{passive:!1});L("mapCanvas").addEventListener("pointerdown",n=>{ei={px:n.clientX,py:n.clientY,x:rn.x,z:rn.z,moved:!1},L("mapCanvas").setPointerCapture(n.pointerId)});L("mapCanvas").addEventListener("pointermove",n=>{if(!ei)return;let e=L("mapCanvas").getBoundingClientRect(),t=n.clientX-ei.px,i=n.clientY-ei.py;Math.abs(t)+Math.abs(i)>4&&(ei.moved=!0),rn.x=ei.x-t/e.width*rn.span,rn.z=ei.z+i/e.height*rn.span*5/7,xs(L("mapCanvas"))});L("mapCanvas").addEventListener("pointerup",n=>{if(ei&&!ei.moved){let e=l_(n);L("waypointX").value=(e.x/1e3).toFixed(2),L("waypointZ").value=(e.z/1e3).toFixed(2)}ei=null});function xs(n,e=!1){let t=n.getContext("2d"),i=n.width,r=n.height,s=e?{x:1e4,z:15e3,span:7e4}:rn,o=(d,f)=>[i/2+(d-s.x)/s.span*i,r/2-(f-s.z)/s.span*i],a=yn(re.world),l=`${a.id}/${s.x}/${s.z}/${s.span}/${r/i}`;if(l!==Ph){let d=Kl.getContext("2d");for(let f=0;f<210;f++)for(let g=0;g<280;g++){let x=s.x+(g/280-.5)*s.span,m=s.z-(f/210-.5)*s.span*r/i,p=Pn(x,m,re.world),E=Xe((p-30)/900,0,1),w=p<0,v=p>=0&&p<8,R=new He(a.water),A=new He(a.ground).lerp(new He(15987174),E*.55),D=new He(a.sand),N=w?R.clone().lerp(new He(14676213),Xe((p+400)/400,0,.35)):v?D:A.lerp(A.clone(),0),S=(Pn(x+s.span*.003,m,re.world)-p)/s.span*.003,M=1+(w?0:Xe(-S*140,-.35,.5));d.fillStyle=`rgb(${N.r*255*M|0},${N.g*255*M|0},${N.b*255*M|0})`,d.fillRect(g,f,1,1)}if(a.id!=="beach"){d.fillStyle=a.id==="cyberpunk"?"#fb74e7":"#b7a794";for(let f=Math.floor((s.x-s.span/2)/2e3);f<=Math.ceil((s.x+s.span/2)/2e3);f++)for(let g=Math.floor((s.z-s.span*r/i/2)/2e3);g<=Math.ceil((s.z+s.span*r/i/2)/2e3);g++)for(let x of Mr(f,g,a.id,Pn,Ht))x.type==="building"&&d.fillRect(140+(x.x-s.x)/s.span*280,105-(x.z-s.z)/s.span*280,Math.max(1,x.width/s.span*280),Math.max(1,x.depth/s.span*280))}Ph=l}t.drawImage(Kl,0,0,i,r),n.dataset.world=a.id,n.dataset.span=String(s.span),n.dataset.center=`${s.x.toFixed(0)},${s.z.toFixed(0)}`,e||(L("mapTitle").textContent=`${a.name} \xB7 full terrain map`),t.fillStyle="#07151c99",t.fillRect(0,0,i,r),t.strokeStyle="#284955",t.lineWidth=1;for(let d=0;d<10;d++)t.beginPath(),t.moveTo(d*i/10,0),t.lineTo(d*i/10,r),t.moveTo(0,d*r/10),t.lineTo(i,d*r/10),t.stroke();t.strokeStyle="#ceac6c",t.beginPath();let c=Ht.find(d=>d.id===re.departure);t.moveTo(...o(c.x,c.z));for(let d of re.route)t.lineTo(...o(d.x,d.z));t.stroke(),t.strokeStyle="#67c7bd",t.lineWidth=2,t.beginPath(),re.flightPath.forEach((d,f)=>{let g=o(d.x,d.z);f?t.lineTo(...g):t.moveTo(...g)}),t.stroke();for(let d of Ht){let[f,g]=o(d.x,d.z);t.fillStyle="#d4e4e1",t.fillRect(f-4,g-4,8,8),t.font="12px monospace",t.fillText(d.name,f+10,g+4)}re.race&&re.race.gates.forEach((d,f)=>{let[g,x]=o(d.x,d.z);t.strokeStyle=f===re.race.next?"#ebbf78":f<re.race.next?"#688078":"#8de1e6",t.beginPath(),t.arc(g,x,6,0,Math.PI*2),t.stroke(),t.fillStyle=t.strokeStyle,t.fillText(String(f+1),g+8,x)});let[h,u]=o(re.x,re.z);if(t.save(),t.translate(h,u),t.rotate(re.heading),t.fillStyle="#ffffff",t.beginPath(),t.moveTo(0,-12),t.lineTo(-7,8),t.lineTo(7,8),t.fill(),t.restore(),!e){let d=Yl(re);L("mapInfo").textContent=`${a.name} \xB7 view ${(s.span/1e3).toFixed(1)} km \xB7 To ${d.target.name}: ${(d.distance/1e3).toFixed(2)} km \xB7 bearing ${Dt(d.bearing)}\xB0 \xB7 ETA ${d.eta===null?"\u2014":Dt(d.eta/60)+" min"} \xB7 ${Dt(ps(re.y))} ft \xB7 ${Dt(ef(re.airspeed))} kt \xB7 ${re.systems.fuel.toFixed(1)} L`}}function pr(){if(!tn)return;let n=re,e=Yl(n),t=n.systems.voltage>20,i=n.y-ur(n.x,n.z,n.world);if(L("aircraftInfo").textContent=`${n.aircraft} \xB7 ${yn(n.world).name} \xB7 ${n.assist?"EASY WASD / AUTO-LEVEL":"MANUAL FLIGHT"}${n.autopilot?.enabled?" \xB7 AUTOPILOT HOLD":""}`,L("flightCanvas").dataset.world=yn(n.world).id,L("flightCanvas").dataset.aircraft=n.aircraftId,L("raceHUD").hidden=!n.race,n.race){let o=n.race;L("raceHUD").textContent=o.countdown>0?`START IN ${Math.ceil(o.countdown)}`:`RINGS ${o.next}/${o.gates.length} \xB7 TIME ${o.elapsed.toFixed(2)}s / ${o.limit}s${o.styleScore?` \xB7 STYLE ${o.styleScore}`:""}`}L("mapDestination").disabled=!!n.race,L("addWaypoint").disabled=!!n.race,L("ias").textContent=Dt(ef(To(n))),L("alt").textContent=Dt(ps(n.y)),L("hdg").textContent=String(Math.round((Gn(n.heading)+360)%360)).padStart(3,"0"),L("vs").textContent=Dt(ps(n.vy)*60),L("rpm").textContent=Dt(n.systems.rpm),L("fuel").textContent=`${n.systems.fuel.toFixed(1)} L \xB7 ${Dt(n.systems.voltage)} V`,L("gload")&&(L("gload").textContent=`${n.gLoad.toFixed(1)}G`),L("aglHud")&&(L("aglHud").textContent=`${Dt(ps(i))} FT AGL`),a_(n,e),Jl&&(L("objective").textContent=Jl,Jl=""),L("warnings").textContent=n.warnings.join(" \xB7 "),L("objective").textContent=n.objective+(n.grounded&&!n.systems.engine?" \u2014 There is no engine power yet: open Aircraft systems, then toggle Battery, Ignition and Start engine, or leave the dispatch screen set to Engine running / runway.":""),L("navInfo").textContent=`${e.target.name} \xB7 ${(e.distance/1e3).toFixed(1)} km \xB7 BRG ${Dt(e.bearing)}\xB0 \xB7 course error ${Dt(e.error)}\xB0 \xB7 AGL ${Dt(ps(i))} ft`,L("controlInfo").textContent=`THR ${Dt(n.controls.throttle*100)}% \xB7 PITCH ${Dt(Gn(n.pitch))}\xB0 \xB7 BANK ${Dt(Gn(n.roll))}\xB0 \xB7 RUDDER ${Dt(n.controls.rudder*100)}% \xB7 FLAPS ${Dt(n.controls.flaps*30)}\xB0 \xB7 TRIM ${Dt(n.controls.trim*100)}% \xB7 GEAR FIXED-DOWN \xB7 ${n.grounded?"ON GROUND \u2014 hold B to brake":"AIRBORNE"}`;let r=[...Hn].sort((o,a)=>o-a),s=Hn.reduce((o,a)=>o+a,0)/Math.max(1,Hn.length);L("perf").textContent=`${s?(1e3/s).toFixed(0):"\u2014"} FPS \xB7 p95 ${r[Math.floor(r.length*.95)]?.toFixed(1)||"\u2014"} ms \xB7 ${Co.drawCalls||0} calls \xB7 ${((Co.triangles||0)/1e3).toFixed(0)}k triangles \xB7 ${Co.chunks||0} terrain tiles`,document.querySelectorAll("[data-system]").forEach(o=>{let a=o.dataset.system,l=n.systems[a];o.classList.toggle("on",l),o.textContent=a==="starter"?"Start engine":`${a.replace(/([A-Z])/g," $1")} ${l?"ON":"OFF"}`});for(let o of["throttle","mixture","trim"])document.activeElement!==L(o)&&(L(o).value=n.controls[o]);document.activeElement!==L("flaps")&&(L("flaps").value=String([0,.33,.66,1].reduce((o,a)=>Math.abs(a-n.controls.flaps)<Math.abs(o-n.controls.flaps)?a:o))),L("systemReadouts").textContent=`${n.systems.engine?"ENGINE RUNNING":"ENGINE STOPPED"} \xB7 ${Dt(n.systems.rpm)} RPM \xB7 OIL ${Dt(n.systems.oilPressure)} psi / ${Dt(n.systems.oilTemp)} \xB0C \xB7 BUS ${Dt(n.systems.voltage)} V \xB7 ${n.systems.batteryAh.toFixed(1)} Ah \xB7 gauges ${t?"powered":"OFF"}`,L("mapPanel").hidden||(xs(L("mapCanvas")),Ql()),n.status!=="active"&&!Ro&&jl()}function jl(){if(!tn)return;nn=!0,en.clear(),L("pause").hidden=!0,L("debrief").hidden=!1;let n=Ah(re),e=!1;if(!Ro){if(n.race?.outcome==="finished"){yt.records||={};let a=`${re.aircraftId}/${n.race.course}`;(!yt.records[a]||n.race.seconds<yt.records[a])&&(yt.records[a]=n.race.seconds,e=!0)}yt.logs.push(n),yt.logs=yt.logs.slice(-20),yt.training=[...new Set([...yt.training,...re.achievements])],Lo(),Ro=!0}let t=re.touchdown,i=L("reportContent");if(i.replaceChildren(),n.race){let a=document.createElement("p");a.className="race-result",a.textContent=n.race.outcome==="finished"?`RACE FINISHED \xB7 ${n.race.seconds.toFixed(2)}s${e?" \xB7 NEW PERSONAL BEST!":""}`:`RACE ${n.race.outcome?.toUpperCase()||"ENDED"} \xB7 ${n.race.checkpoints}/${n.race.total} rings \xB7 ${n.race.seconds.toFixed(2)}s`,i.appendChild(a)}let r=document.createElement("p");r.textContent=re.aircraft,i.appendChild(r);let s=document.createElement("div");s.className="report-grid";for(let[a,l]of[["Duration",`${(re.time/60).toFixed(1)} min`],["Distance",`${(re.distanceFlown/1e3).toFixed(1)} km`],["Fuel",`${re.fuelUsed.toFixed(1)} L`],["Peak altitude",`${Dt(ps(re.peakAltitude))} ft`],["Landing score",t?`${t.score}/100`:"No touchdown"],["Descent at contact",t?`${t.verticalSpeed.toFixed(1)} m/s`:"\u2014"]]){let c=document.createElement("div"),h=document.createElement("strong"),u=document.createElement("small");h.textContent=l,u.textContent=a,c.append(h,u),s.appendChild(c)}i.appendChild(s);let o=document.createElement("p");o.className="muted",o.textContent=`${re.status.toUpperCase()} \xB7 ${n.suggestions.join(" ")}`,i.appendChild(o),xs(L("reportMap"),!0)}L("debriefToggle").onclick=jl;L("pauseDebrief").onclick=jl;L("exportReport").onclick=()=>{let n=new Blob([JSON.stringify(Ah(re),null,2)],{type:"application/json"}),e=URL.createObjectURL(n),t=document.createElement("a");t.href=e,t.download="skyforge-flight-report.json",t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)};function c_(){if($t)return;let n=new AudioContext,e=n.createGain(),t=n.createGain(),i=n.createGain(),r=n.createOscillator();e.connect(n.destination),t.connect(e),i.connect(e),r.type="sawtooth",r.connect(t),r.start();let s=n.createBuffer(1,n.sampleRate*2,n.sampleRate),o=s.getChannelData(0);for(let c=0;c<o.length;c++)o[c]=Math.random()*2-1;let a=n.createBufferSource(),l=n.createBiquadFilter();a.buffer=s,a.loop=!0,l.type="lowpass",l.frequency.value=550,a.connect(l),l.connect(i),a.start(),$t={context:n,master:e,engine:t,env:i,osc:r}}function h_(){if(!$t||Number(L("volume").value)===0)return;let n=$t.context.createOscillator(),e=$t.context.createGain();n.frequency.value=700,e.gain.value=Number(L("interfaceVolume").value)*.08,n.connect(e),e.connect($t.master),n.start(),e.gain.exponentialRampToValueAtTime(1e-4,$t.context.currentTime+.05),n.stop($t.context.currentTime+.06)}function u_(){L("audioToggle").textContent=$t&&Number(L("volume").value)>0?"Audio on":"Audio off"}L("audioToggle").onclick=()=>{c_(),$t.context.resume(),L("volume").value=Number(L("volume").value)>0?0:.35,Lo(),u_()};["pointerdown","keydown"].forEach(n=>document.addEventListener(n,()=>{$t&&$t.context.state==="suspended"&&$t.context.resume()},{capture:!0}));function d_(){if(!$t)return;let n=$t.context.currentTime;$t.master.gain.setTargetAtTime(Number(L("volume").value),n,.05),$t.engine.gain.setTargetAtTime(re.systems.rpm/2700*Number(L("engineVolume").value)*.025,n,.1),$t.osc.frequency.setTargetAtTime(25+re.systems.rpm/30,n,.1),$t.env.gain.setTargetAtTime((re.airspeed/100+re.weather.rain)*Number(L("environmentVolume").value)*.035,n,.1)}L("flightCanvas").addEventListener("webglcontextlost",n=>{n.preventDefault(),nn=!0,L("bootError").textContent="Graphics context lost. Flight paused; reload to recover. Preferences and completed logs are saved.",L("setup").hidden=!1});var ms={},Ch=0,f_=()=>{let n=Date.now(),e=Ch?Math.min(.1,(n-Ch)/1e3):0;if(Ch=n,tn&&!nn){Oi+=e;let t=0;for(;Oi>=In&&t<12;)ms={x:re.x,y:re.y,z:re.z,pitch:re.pitch,roll:re.roll,heading:re.heading},af(In),Zl(re,In),Oi-=In,t++}tn&&!nn&&pr()};setInterval(f_,50);function lf(n){let e=Eo?Math.min(.1,(n-Eo)/1e3):0,t=Eo?n-Eo:0;if(Eo=n,t>0&&(dr+=t>34?1:0,dr>60&&(dr=12),t<=17&&(dr=Math.max(0,dr-2))),tn&&!nn){Oi+=e;let i=0;for(;Oi>=In&&i<12;)ms={x:re.x,y:re.y,z:re.z,pitch:re.pitch,roll:re.roll,heading:re.heading},af(In),Zl(re,In),Oi-=In,i++}if(Wt){let i=tn&&!nn&&Wt.mode==="free"?{x:Number(en.has("KeyD"))-Number(en.has("KeyA")),z:Number(en.has("KeyW"))-Number(en.has("KeyS")),y:Number(en.has("KeyQ"))-Number(en.has("KeyZ"))}:{},r=re;if(tn&&!nn&&ms.x!==void 0){let s=Oi/In;r={...re};for(let o of["x","y","z","pitch","roll","heading"])r[o]=ms[o]+(re[o]-ms[o])*s}Co=Wt.render(r,n/1e3,i)}if(tn&&!nn&&t>0&&(Hn.push(t),Hn.length>300&&Hn.shift(),dr>=15&&Ao<2&&Wt)){Ao++,dr=0;let i=L("quality");Wt.renderer.setPixelRatio(Ao===2?Math.max(1,devicePixelRatio*.75):1),Wt.renderer.shadowMap.enabled=Ao<2,i.value="low",i.selected=!0,Lo(),jd(`Graphics auto-reduced for smoothness (level ${Ao}).`)}n-Jd>80&&(Jd=n,pr(),d_()),requestAnimationFrame(lf)}try{Wt=Zd(L("flightCanvas"),yt.settings.quality,Uh),document.body.dataset.boot="ready",document.body.dataset.skyforge="surface",requestAnimationFrame(lf),window.__skyforge={getState:()=>structuredClone(re),performance:()=>({samples:Hn.length,meanMs:Hn.reduce((n,e)=>n+e,0)/Math.max(1,Hn.length),p95Ms:[...Hn].sort((n,e)=>n-e)[Math.floor(Hn.length*.95)],...Co}),scene:()=>({meshes:Wt.scene.children.length,webgl:Wt.renderer.capabilities.isWebGL2,aircraftMeshes:Wt.aircraft.children.length}),testAdvance:n=>{for(let e=0;e<n/In;e++)Zl(re);pr()}}}catch(n){document.body.dataset.boot="error",L("bootError").textContent=`Unable to initialize WebGL: ${n.message}. Enable hardware acceleration and use a modern desktop browser.`,L("launch").disabled=!0,console.error(n)}
/*! For license information please see skyforge.js.LEGAL.txt */
