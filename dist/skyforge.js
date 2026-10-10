var Eh=0,sc=1,Ah=2;var rc=1,na=2,Bn=3,Zn=0,Dt=1,xn=2,jn=0,Ai=1,oc=2,ac=3,lc=4,Ch=5,ci=100,Rh=101,Ih=102,Ph=103,Lh=104,Dh=200,Uh=201,Nh=202,Fh=203,Ao=204,Co=205,Bh=206,Oh=207,zh=208,kh=209,Vh=210,Gh=211,Hh=212,Wh=213,Xh=214,ia=0,sa=1,ra=2,Ci=3,oa=4,aa=5,la=6,ca=7,ha=0,qh=1,Yh=2,ei=0,$h=1,Zh=2,Jh=3,ua=4,Kh=5,Qh=6,jh=7;var cc=300,Ni=301,Fi=302,da=303,fa=304,Fr=306,hs=1e3,li=1001,Ro=1002,Qt=1003,eu=1004;var Br=1005;var En=1006,pa=1007;var pi=1008;var Cn=1009,hc=1010,uc=1011,As=1012,ma=1013,mi=1014,Rn=1015,Cs=1016,ga=1017,_a=1018,Rs=1020,dc=35902,fc=35899,pc=1021,mc=1022,vn=1023,us=1026,Is=1027,xa=1028,va=1029,gc=1030,ya=1031;var Ma=1033,Or=33776,zr=33777,kr=33778,Vr=33779,Sa=35840,ba=35841,Ta=35842,wa=35843,Ea=36196,Aa=37492,Ca=37496,Ra=37808,Ia=37809,Pa=37810,La=37811,Da=37812,Ua=37813,Na=37814,Fa=37815,Ba=37816,Oa=37817,za=37818,ka=37819,Va=37820,Ga=37821,Ha=36492,Wa=36494,Xa=36495,qa=36283,Ya=36284,$a=36285,Za=36286;var nr=2300,Io=2301,Eo=2302,Wl=2400,Xl=2401,ql=2402;var tu=3200,nu=3201;var Ja=0,iu=1,ti="",Wt="srgb",Ri="srgb-linear",ir="linear",dt="srgb";var wi=7680;var Yl=519,su=512,ru=513,ou=514,_c=515,au=516,lu=517,cu=518,hu=519,Po=35044;var xc="300 es",wn=2e3,sr=2001;var Jn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ml=Math.PI/180,rr=180/Math.PI;function Yn(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function od(n,e){return(n%e+e)%e}function gl(n,e,t){return(1-t)*n+t*e}function Ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function pt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var de=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_n=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-a,p=l*d+c*f+h*g+u*v,C=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){let A=Math.sqrt(T),R=Math.atan2(A,p*C);m=Math.sin(m*R)/A,a=Math.sin(a*R)/A}let y=a*C;if(l=l*m+d*y,c=c*m+f*y,h=h*m+g*y,u=u*m+v*y,m===1-a){let A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),d=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>u){let f=2*Math.sqrt(1+i-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-i-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($c.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),h=2*(a*t-r*s),u=2*(r*i-o*t);return this.x=t+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _l.copy(this).projectOnVector(e),this.sub(_l)}reflect(e){return this.sub(_l.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_l=new I,$c=new _n,Ke=class n{constructor(e,t,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],v=s[0],m=s[3],p=s[6],C=s[1],T=s[4],y=s[7],A=s[2],R=s[5],L=s[8];return r[0]=o*v+a*C+l*A,r[3]=o*m+a*T+l*R,r[6]=o*p+a*y+l*L,r[1]=c*v+h*C+u*A,r[4]=c*m+h*T+u*R,r[7]=c*p+h*y+u*L,r[2]=d*v+f*C+g*A,r[5]=d*m+f*T+g*R,r[8]=d*p+f*y+g*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+i*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=u*v,e[1]=(s*c-h*i)*v,e[2]=(a*i-s*o)*v,e[3]=d*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(xl.makeScale(e,t)),this}rotate(e){return this.premultiply(xl.makeRotation(-e)),this}translate(e,t){return this.premultiply(xl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},xl=new Ke;function vc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function or(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function uu(){let n=or("canvas");return n.style.display="block",n}var Zc={};function ds(n){n in Zc||(Zc[n]=!0,console.warn(n))}function du(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Jc=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kc=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ad(){let n={enabled:!0,workingColorSpace:Ri,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===dt&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===dt&&(s.r=cs(s.r),s.g=cs(s.g),s.b=cs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ti?ir:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ds("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ds("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ri]:{primaries:e,whitePoint:i,transfer:ir,toXYZ:Jc,fromXYZ:Kc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:Jc,fromXYZ:Kc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),n}var rt=ad();function $n(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function cs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var qi,Lo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{qi===void 0&&(qi=or("canvas")),qi.width=e.width,qi.height=e.height;let s=qi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=qi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=or("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=$n(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor($n(t[i]/255)*255):t[i]=$n(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ld=0,fs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Yn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(vl(s[o].image)):r.push(vl(s[o]))}else r=vl(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function vl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Lo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var cd=0,yl=new I,$t=class n extends Jn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=li,s=li,r=En,o=pi,a=vn,l=Cn,c=n.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Yn(),this.name="",this.source=new fs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(yl).x}get height(){return this.source.getSize(yl).y}get depth(){return this.source.getSize(yl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hs:e.x=e.x-Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case Ro:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hs:e.y=e.y-Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case Ro:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=cc;$t.DEFAULT_ANISOTROPY=1;var ut=class n{constructor(e=0,t=0,i=0,s=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(c+1)/2,y=(f+1)/2,A=(p+1)/2,R=(h+d)/4,L=(u+v)/4,N=(g+m)/4;return T>y&&T>A?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=R/i,r=L/i):y>A?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=R/s,r=N/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=L/r,s=N/r),this.set(i,s,r,t),this}let C=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(C)<.001&&(C=1),this.x=(m-g)/C,this.y=(u-v)/C,this.z=(d-h)/C,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Do=class extends Jn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);let s={width:e,height:t,depth:i.depth},r=new $t(s);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:En,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new fs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dn=class extends Do{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ar=class extends $t{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Uo=class extends $t{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Un=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Sn):Sn.fromBufferAttribute(r,o),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qr.copy(i.boundingBox)),Qr.applyMatrix4(e.matrixWorld),this.union(Qr)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hs),jr.subVectors(this.max,Hs),Yi.subVectors(e.a,Hs),$i.subVectors(e.b,Hs),Zi.subVectors(e.c,Hs),ni.subVectors($i,Yi),ii.subVectors(Zi,$i),Mi.subVectors(Yi,Zi);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-Mi.z,Mi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,Mi.z,0,-Mi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-Mi.y,Mi.x,0];return!Ml(t,Yi,$i,Zi,jr)||(t=[1,0,0,0,1,0,0,0,1],!Ml(t,Yi,$i,Zi,jr))?!1:(eo.crossVectors(ni,ii),t=[eo.x,eo.y,eo.z],Ml(t,Yi,$i,Zi,jr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Vn=[new I,new I,new I,new I,new I,new I,new I,new I],Sn=new I,Qr=new Un,Yi=new I,$i=new I,Zi=new I,ni=new I,ii=new I,Mi=new I,Hs=new I,jr=new I,eo=new I,Si=new I;function Ml(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Si.fromArray(n,r);let a=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),l=e.dot(Si),c=t.dot(Si),h=i.dot(Si);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var hd=new Un,Ws=new I,Sl=new I,Kn=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):hd.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ws.subVectors(e,this.center);let t=Ws.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ws,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ws.copy(e.center).add(Sl)),this.expandByPoint(Ws.copy(e.center).sub(Sl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Gn=new I,bl=new I,to=new I,si=new I,Tl=new I,no=new I,wl=new I,ps=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){bl.copy(e).add(t).multiplyScalar(.5),to.copy(t).sub(e).normalize(),si.copy(this.origin).sub(bl);let r=e.distanceTo(t)*.5,o=-this.direction.dot(to),a=si.dot(this.direction),l=-si.dot(to),c=si.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(bl).addScaledVector(to,d),f}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);let i=Gn.dot(this.direction),s=Gn.dot(Gn)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,i,s,r){Tl.subVectors(t,e),no.subVectors(i,e),wl.crossVectors(Tl,no);let o=this.direction.dot(wl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;si.subVectors(this.origin,e);let l=a*this.direction.dot(no.crossVectors(si,no));if(l<0)return null;let c=a*this.direction.dot(Tl.cross(si));if(c<0||l+c>o)return null;let h=-a*si.dot(wl);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ft=class n{constructor(e,t,i,s,r,o,a,l,c,h,u,d,f,g,v,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,h,u,d,f,g,v,m)}set(e,t,i,s,r,o,a,l,c,h,u,d,f,g,v,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,s=1/Ji.setFromMatrixColumn(e,0).length(),r=1/Ji.setFromMatrixColumn(e,1).length(),o=1/Ji.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,v=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d+v*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d-v*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,v=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=v-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-v*u}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ud,e,dd)}lookAt(e,t,i){let s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ri.crossVectors(i,rn),ri.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ri.crossVectors(i,rn)),ri.normalize(),io.crossVectors(rn,ri),s[0]=ri.x,s[4]=io.x,s[8]=rn.x,s[1]=ri.y,s[5]=io.y,s[9]=rn.y,s[2]=ri.z,s[6]=io.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],C=i[3],T=i[7],y=i[11],A=i[15],R=s[0],L=s[4],N=s[8],S=s[12],M=s[1],P=s[5],k=s[9],G=s[13],q=s[2],$=s[6],Y=s[10],V=s[14],W=s[3],fe=s[7],ye=s[11],we=s[15];return r[0]=o*R+a*M+l*q+c*W,r[4]=o*L+a*P+l*$+c*fe,r[8]=o*N+a*k+l*Y+c*ye,r[12]=o*S+a*G+l*V+c*we,r[1]=h*R+u*M+d*q+f*W,r[5]=h*L+u*P+d*$+f*fe,r[9]=h*N+u*k+d*Y+f*ye,r[13]=h*S+u*G+d*V+f*we,r[2]=g*R+v*M+m*q+p*W,r[6]=g*L+v*P+m*$+p*fe,r[10]=g*N+v*k+m*Y+p*ye,r[14]=g*S+v*G+m*V+p*we,r[3]=C*R+T*M+y*q+A*W,r[7]=C*L+T*P+y*$+A*fe,r[11]=C*N+T*k+y*Y+A*ye,r[15]=C*S+T*G+y*V+A*we,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*a*d+i*c*d+s*a*f-i*l*f)+v*(+t*l*f-t*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+i*o*f+r*a*h-i*c*h)+p*(-s*a*h-t*l*u+t*a*d+s*o*u-i*o*d+i*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],C=u*m*c-v*d*c+v*l*f-a*m*f-u*l*p+a*d*p,T=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,y=h*v*c-g*u*c+g*a*f-o*v*f-h*a*p+o*u*p,A=g*u*l-h*v*l-g*a*d+o*v*d+h*a*m-o*u*m,R=t*C+i*T+s*y+r*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/R;return e[0]=C*L,e[1]=(v*d*r-u*m*r-v*s*f+i*m*f+u*s*p-i*d*p)*L,e[2]=(a*m*r-v*l*r+v*s*c-i*m*c-a*s*p+i*l*p)*L,e[3]=(u*l*r-a*d*r-u*s*c+i*d*c+a*s*f-i*l*f)*L,e[4]=T*L,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*L,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*L,e[7]=(o*d*r-h*l*r+h*s*c-t*d*c-o*s*f+t*l*f)*L,e[8]=y*L,e[9]=(g*u*r-h*v*r-g*i*f+t*v*f+h*i*p-t*u*p)*L,e[10]=(o*v*r-g*a*r+g*i*c-t*v*c-o*i*p+t*a*p)*L,e[11]=(h*a*r-o*u*r-h*i*c+t*u*c+o*i*f-t*a*f)*L,e[12]=A*L,e[13]=(h*v*s-g*u*s+g*i*d-t*v*d-h*i*m+t*u*m)*L,e[14]=(g*a*s-o*v*s-g*i*l+t*v*l+o*i*m-t*a*m)*L,e[15]=(o*u*s-h*a*s+h*i*l-t*u*l-o*i*d+t*a*d)*L,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,C=l*c,T=l*h,y=l*u,A=i.x,R=i.y,L=i.z;return s[0]=(1-(v+p))*A,s[1]=(f+y)*A,s[2]=(g-T)*A,s[3]=0,s[4]=(f-y)*R,s[5]=(1-(d+p))*R,s[6]=(m+C)*R,s[7]=0,s[8]=(g+T)*L,s[9]=(m-C)*L,s[10]=(1-(d+v))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements,r=Ji.set(s[0],s[1],s[2]).length(),o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],bn.copy(this);let c=1/r,h=1/o,u=1/a;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,t.setFromRotationMatrix(bn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=wn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s),g,v;if(l)g=r/(o-r),v=o*r/(o-r);else if(a===wn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===sr)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=wn,l=!1){let c=this.elements,h=2/(t-e),u=2/(i-s),d=-(t+e)/(t-e),f=-(i+s)/(i-s),g,v;if(l)g=1/(o-r),v=o/(o-r);else if(a===wn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===sr)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Ji=new I,bn=new ft,ud=new I(0,0,0),dd=new I(1,1,1),ri=new I,io=new I,rn=new I,Qc=new ft,jc=new _n,jt=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Qc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jc.setFromEuler(this),this.setFromQuaternion(jc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};jt.DEFAULT_ORDER="XYZ";var ms=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},fd=0,eh=new I,Ki=new _n,Hn=new ft,so=new I,Xs=new I,pd=new I,md=new _n,th=new I(1,0,0),nh=new I(0,1,0),ih=new I(0,0,1),sh={type:"added"},gd={type:"removed"},Qi={type:"childadded",child:null},El={type:"childremoved",child:null},_t=class n extends Jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new I,t=new jt,i=new _n,s=new I(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ft},normalMatrix:{value:new Ke}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.premultiply(Ki),this}rotateX(e){return this.rotateOnAxis(th,e)}rotateY(e){return this.rotateOnAxis(nh,e)}rotateZ(e){return this.rotateOnAxis(ih,e)}translateOnAxis(e,t){return eh.copy(e).applyQuaternion(this.quaternion),this.position.add(eh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(th,e)}translateY(e){return this.translateOnAxis(nh,e)}translateZ(e){return this.translateOnAxis(ih,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?so.copy(e):so.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Xs,so,this.up):Hn.lookAt(so,Xs,this.up),this.quaternion.setFromRotationMatrix(Hn),s&&(Hn.extractRotation(s.matrixWorld),Ki.setFromRotationMatrix(Hn),this.quaternion.premultiply(Ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sh),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gd),El.child=e,this.dispatchEvent(El),El.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sh),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,e,pd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,md,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};_t.DEFAULT_UP=new I(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Tn=new I,Wn=new I,Al=new I,Xn=new I,ji=new I,es=new I,rh=new I,Cl=new I,Rl=new I,Il=new I,Pl=new ut,Ll=new ut,Dl=new ut,qn=class n{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Tn.subVectors(e,t),s.cross(Tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Tn.subVectors(s,t),Wn.subVectors(i,t),Al.subVectors(e,t);let o=Tn.dot(Tn),a=Tn.dot(Wn),l=Tn.dot(Al),c=Wn.dot(Wn),h=Wn.dot(Al),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Xn.x),l.addScaledVector(o,Xn.y),l.addScaledVector(a,Xn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Pl.setScalar(0),Ll.setScalar(0),Dl.setScalar(0),Pl.fromBufferAttribute(e,t),Ll.fromBufferAttribute(e,i),Dl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Pl,r.x),o.addScaledVector(Ll,r.y),o.addScaledVector(Dl,r.z),o}static isFrontFacing(e,t,i,s){return Tn.subVectors(i,t),Wn.subVectors(e,t),Tn.cross(Wn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),Tn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,a;ji.subVectors(s,i),es.subVectors(r,i),Cl.subVectors(e,i);let l=ji.dot(Cl),c=es.dot(Cl);if(l<=0&&c<=0)return t.copy(i);Rl.subVectors(e,s);let h=ji.dot(Rl),u=es.dot(Rl);if(h>=0&&u<=h)return t.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(ji,o);Il.subVectors(e,r);let f=ji.dot(Il),g=es.dot(Il);if(g>=0&&f<=g)return t.copy(r);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(es,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return rh.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(rh,a);let p=1/(m+v+d);return o=v*p,a=d*p,t.copy(i).addScaledVector(ji,o).addScaledVector(es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},fu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},ro={h:0,s:0,l:0};function Ul(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var We=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=i,rt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=rt.workingColorSpace){if(e=od(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Ul(o,r,e+1/3),this.g=Ul(o,r,e),this.b=Ul(o,r,e-1/3)}return rt.colorSpaceToWorking(this,s),this}setStyle(e,t=Wt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){let i=fu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=cs(e.r),this.g=cs(e.g),this.b=cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return rt.workingToColorSpace(Ht.copy(this),e),Math.round(nt(Ht.r*255,0,255))*65536+Math.round(nt(Ht.g*255,0,255))*256+Math.round(nt(Ht.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.workingToColorSpace(Ht.copy(this),t);let i=Ht.r,s=Ht.g,r=Ht.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Wt){rt.workingToColorSpace(Ht.copy(this),e);let t=Ht.r,i=Ht.g,s=Ht.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(oi),this.setHSL(oi.h+e,oi.s+t,oi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(oi),e.getHSL(ro);let i=gl(oi.h,ro.h,t),s=gl(oi.s,ro.s,t),r=gl(oi.l,ro.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ht=new We;We.NAMES=fu;var _d=0,An=class extends Jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=Yn(),this.name="",this.type="Material",this.blending=Ai,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ao,this.blendDst=Co,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(i.blending=this.blending),this.side!==Zn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ao&&(i.blendSrc=this.blendSrc),this.blendDst!==Co&&(i.blendDst=this.blendDst),this.blendEquation!==ci&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},en=class extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jt,this.combine=ha,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var It=new I,oo=new de,xd=0,Pt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Po,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)oo.fromBufferAttribute(this,t),oo.applyMatrix3(e),this.setXY(t,oo.x,oo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=pt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ln(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ln(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ln(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ln(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Po&&(e.usage=this.usage),e}};var lr=class extends Pt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var cr=class extends Pt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var St=class extends Pt{constructor(e,t,i){super(new Float32Array(e),t,i)}},vd=0,gn=new ft,Nl=new _t,ts=new I,on=new Un,qs=new Un,Ot=new I,Lt=class n extends Jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vc(e)?cr:lr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,i){return gn.makeTranslation(e,t,i),this.applyMatrix4(gn),this}scale(e,t,i){return gn.makeScale(e,t,i),this.applyMatrix4(gn),this}lookAt(e){return Nl.lookAt(e),Nl.updateMatrix(),this.applyMatrix4(Nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new St(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let i=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];qs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(on.min,qs.min),on.expandByPoint(Ot),Ot.addVectors(on.max,qs.max),on.expandByPoint(Ot)):(on.expandByPoint(qs.min),on.expandByPoint(qs.max))}on.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ot));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ot.fromBufferAttribute(a,c),l&&(ts.fromBufferAttribute(e,c),Ot.add(ts)),s=Math.max(s,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<i.count;N++)a[N]=new I,l[N]=new I;let c=new I,h=new I,u=new I,d=new de,f=new de,g=new de,v=new I,m=new I;function p(N,S,M){c.fromBufferAttribute(i,N),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,M),d.fromBufferAttribute(r,N),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[N].add(v),a[S].add(v),a[M].add(v),l[N].add(m),l[S].add(m),l[M].add(m))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let N=0,S=C.length;N<S;++N){let M=C[N],P=M.start,k=M.count;for(let G=P,q=P+k;G<q;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let T=new I,y=new I,A=new I,R=new I;function L(N){A.fromBufferAttribute(s,N),R.copy(A);let S=a[N];T.copy(S),T.sub(A.multiplyScalar(A.dot(S))).normalize(),y.crossVectors(R,S);let P=y.dot(l[N])<0?-1:1;o.setXYZW(N,T.x,T.y,T.z,P)}for(let N=0,S=C.length;N<S;++N){let M=C[N],P=M.start,k=M.count;for(let G=P,q=P+k;G<q;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let s=new I,r=new I,o=new I,a=new I,l=new I,c=new I,h=new I,u=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Pt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,i);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},oh=new ft,bi=new ps,ao=new Kn,ah=new I,lo=new I,co=new I,ho=new I,Fl=new I,uo=new I,lh=new I,fo=new I,mt=class extends _t{constructor(e=new Lt,t=new en){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){uo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Fl.fromBufferAttribute(u,e),o?uo.addScaledVector(Fl,h):uo.addScaledVector(Fl.sub(t),h))}t.add(uo)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ao.copy(i.boundingSphere),ao.applyMatrix4(r),bi.copy(e.ray).recast(e.near),!(ao.containsPoint(bi.origin)===!1&&(bi.intersectSphere(ao,ah)===null||bi.origin.distanceToSquared(ah)>(e.far-e.near)**2))&&(oh.copy(r).invert(),bi.copy(e.ray).applyMatrix4(oh),!(i.boundingBox!==null&&bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,bi)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){let m=d[g],p=o[m.materialIndex],C=Math.max(m.start,f.start),T=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=C,A=T;y<A;y+=3){let R=a.getX(y),L=a.getX(y+1),N=a.getX(y+2);s=po(this,p,e,i,c,h,u,R,L,N),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let C=a.getX(m),T=a.getX(m+1),y=a.getX(m+2);s=po(this,o,e,i,c,h,u,C,T,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){let m=d[g],p=o[m.materialIndex],C=Math.max(m.start,f.start),T=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=C,A=T;y<A;y+=3){let R=y,L=y+1,N=y+2;s=po(this,p,e,i,c,h,u,R,L,N),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let C=m,T=m+1,y=m+2;s=po(this,o,e,i,c,h,u,C,T,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function yd(n,e,t,i,s,r,o,a){let l;if(e.side===Dt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Zn,a),l===null)return null;fo.copy(a),fo.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(fo);return c<t.near||c>t.far?null:{distance:c,point:fo.clone(),object:n}}function po(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,lo),n.getVertexPosition(l,co),n.getVertexPosition(c,ho);let h=yd(n,e,t,i,lo,co,ho,lh);if(h){let u=new I;qn.getBarycoord(lh,lo,co,ho,u),s&&(h.uv=qn.getInterpolatedAttribute(s,a,l,c,u,new de)),r&&(h.uv1=qn.getInterpolatedAttribute(r,a,l,c,u,new de)),o&&(h.normal=qn.getInterpolatedAttribute(o,a,l,c,u,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new I,materialIndex:0};qn.getNormal(lo,co,ho,d.normal),h.face=d,h.barycoord=u}return h}var Je=class n extends Lt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(u,2));function g(v,m,p,C,T,y,A,R,L,N,S){let M=y/L,P=A/N,k=y/2,G=A/2,q=R/2,$=L+1,Y=N+1,V=0,W=0,fe=new I;for(let ye=0;ye<Y;ye++){let we=ye*P-G;for(let le=0;le<$;le++){let Ie=le*M-k;fe[v]=Ie*C,fe[m]=we*T,fe[p]=q,c.push(fe.x,fe.y,fe.z),fe[v]=0,fe[m]=0,fe[p]=R>0?1:-1,h.push(fe.x,fe.y,fe.z),u.push(le/L),u.push(1-ye/N),V+=1}}for(let ye=0;ye<N;ye++)for(let we=0;we<L;we++){let le=d+we+$*ye,Ie=d+we+$*(ye+1),ze=d+(we+1)+$*(ye+1),He=d+(we+1)+$*ye;l.push(le,Ie,He),l.push(Ie,ze,He),W+=6}a.addGroup(f,W,S),f+=W,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Bi(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Xt(n){let e={};for(let t=0;t<n.length;t++){let i=Bi(n[t]);for(let s in i)e[s]=i[s]}return e}function Md(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function yc(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}var Ka={clone:Bi,merge:Xt},Sd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Zt=class extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sd,this.fragmentShader=bd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=Md(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},hr=class extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ai=new I,ch=new de,hh=new de,zt=class extends hr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=rr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ml*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rr*2*Math.atan(Math.tan(ml*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ai.x,ai.y).multiplyScalar(-e/ai.z),ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ai.x,ai.y).multiplyScalar(-e/ai.z)}getViewSize(e,t){return this.getViewBounds(e,ch,hh),t.subVectors(hh,ch)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ml*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ns=-90,is=1,No=class extends _t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new zt(ns,is,e,t);s.layers=this.layers,this.add(s);let r=new zt(ns,is,e,t);r.layers=this.layers,this.add(r);let o=new zt(ns,is,e,t);o.layers=this.layers,this.add(o);let a=new zt(ns,is,e,t);a.layers=this.layers,this.add(a);let l=new zt(ns,is,e,t);l.layers=this.layers,this.add(l);let c=new zt(ns,is,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===wn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===sr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ur=class extends $t{constructor(e=[],t=Ni,i,s,r,o,a,l,c,h){super(e,t,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Fo=class extends Dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ur(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Je(5,5,5),r=new Zt({name:"CubemapFromEquirect",uniforms:Bi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dt,blending:jn});r.uniforms.tEquirect.value=t;let o=new mt(s,r),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=En),new No(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}},an=class extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}},Td={type:"move"},gs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new an,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new an,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new an,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Td)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new an;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},dr=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ii=class extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jt,this.environmentIntensity=1,this.environmentRotation=new jt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},fr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Po,this.updateRanges=[],this.version=0,this.uuid=Yn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Yt=new I,_s=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=pt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ln(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ln(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ln(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ln(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),i=pt(i,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},xs=class extends An{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ss,Ys=new I,rs=new I,os=new I,as=new de,$s=new de,pu=new ft,mo=new I,Zs=new I,go=new I,uh=new de,Bl=new de,dh=new de,pr=class extends _t{constructor(e=new xs){if(super(),this.isSprite=!0,this.type="Sprite",ss===void 0){ss=new Lt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new fr(t,5);ss.setIndex([0,1,2,0,2,3]),ss.setAttribute("position",new _s(i,3,0,!1)),ss.setAttribute("uv",new _s(i,2,3,!1))}this.geometry=ss,this.material=e,this.center=new de(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rs.setFromMatrixScale(this.matrixWorld),pu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),os.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rs.multiplyScalar(-os.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;_o(mo.set(-.5,-.5,0),os,o,rs,s,r),_o(Zs.set(.5,-.5,0),os,o,rs,s,r),_o(go.set(.5,.5,0),os,o,rs,s,r),uh.set(0,0),Bl.set(1,0),dh.set(1,1);let a=e.ray.intersectTriangle(mo,Zs,go,!1,Ys);if(a===null&&(_o(Zs.set(-.5,.5,0),os,o,rs,s,r),Bl.set(0,1),a=e.ray.intersectTriangle(mo,go,Zs,!1,Ys),a===null))return;let l=e.ray.origin.distanceTo(Ys);l<e.near||l>e.far||t.push({distance:l,point:Ys.clone(),uv:qn.getInterpolation(Ys,mo,Zs,go,uh,Bl,dh,new de),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function _o(n,e,t,i,s,r){as.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?($s.x=r*as.x-s*as.y,$s.y=s*as.x+r*as.y):$s.copy(as),n.copy(e),n.x+=$s.x,n.y+=$s.y,n.applyMatrix4(pu)}var Bo=class extends $t{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Qt,h=Qt,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var vs=class extends Pt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ls=new ft,fh=new ft,xo=[],ph=new Un,wd=new ft,Js=new mt,Ks=new Kn,Nn=class extends mt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new vs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,wd)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Un),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ls),ph.copy(e.boundingBox).applyMatrix4(ls),this.boundingBox.union(ph)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Kn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ls),Ks.copy(e.boundingSphere).applyMatrix4(ls),this.boundingSphere.union(Ks)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(Js.geometry=this.geometry,Js.material=this.material,Js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ks.copy(this.boundingSphere),Ks.applyMatrix4(i),e.ray.intersectsSphere(Ks)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ls),fh.multiplyMatrices(i,ls),Js.matrixWorld=fh,Js.raycast(e,xo);for(let o=0,a=xo.length;o<a;o++){let l=xo[o];l.instanceId=r,l.object=this,t.push(l)}xo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new vs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Bo(new Float32Array(s*this.count),s,this.count,xa,Rn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ol=new I,Ed=new I,Ad=new Ke,Pn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Ol.subVectors(i,t).cross(Ed.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Ol),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Ad.getNormalMatrix(e),s=this.coplanarPoint(Ol).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ti=new Kn,Cd=new de(.5,.5),vo=new I,ys=class{constructor(e=new Pn,t=new Pn,i=new Pn,s=new Pn,r=new Pn,o=new Pn){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wn,i=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],C=r[12],T=r[13],y=r[14],A=r[15];if(s[0].setComponents(c-o,f-h,p-g,A-C).normalize(),s[1].setComponents(c+o,f+h,p+g,A+C).normalize(),s[2].setComponents(c+a,f+u,p+v,A+T).normalize(),s[3].setComponents(c-a,f-u,p-v,A-T).normalize(),i)s[4].setComponents(l,d,m,y).normalize(),s[5].setComponents(c-l,f-d,p-m,A-y).normalize();else if(s[4].setComponents(c-l,f-d,p-m,A-y).normalize(),t===wn)s[5].setComponents(c+l,f+d,p+m,A+y).normalize();else if(t===sr)s[5].setComponents(l,d,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(e){Ti.center.set(0,0,0);let t=Cd.distanceTo(e.center);return Ti.radius=.7071067811865476+t,Ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(vo.x=s.normal.x>0?e.max.x:e.min.x,vo.y=s.normal.y>0?e.max.y:e.min.y,vo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(vo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ms=class extends An{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},mh=new ft,$l=new ps,yo=new Kn,Mo=new I,mr=class extends _t{constructor(e=new Lt,t=new Ms){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yo.copy(i.boundingSphere),yo.applyMatrix4(s),yo.radius+=r,e.ray.intersectsSphere(yo)===!1)return;mh.copy(s).invert(),$l.copy(e.ray).applyMatrix4(mh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,v=f;g<v;g++){let m=c.getX(g);Mo.fromBufferAttribute(u,m),gh(Mo,m,l,s,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,v=f;g<v;g++)Mo.fromBufferAttribute(u,g),gh(Mo,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function gh(n,e,t,i,s,r,o){let a=$l.distanceSqToPoint(n);if(a<t){let l=new I;$l.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var hi=class extends $t{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},gr=class extends $t{constructor(e,t,i=mi,s,r,o,a=Qt,l=Qt,c,h=us,u=1){if(h!==us&&h!==Is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},_r=class extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Ss=class n extends Lt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new I,h=new de;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=i+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new St(o,3)),this.setAttribute("normal",new St(a,3)),this.setAttribute("uv",new St(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ln=class n extends Lt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,v=[],m=i/2,p=0;C(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new St(u,3)),this.setAttribute("normal",new St(d,3)),this.setAttribute("uv",new St(f,2));function C(){let y=new I,A=new I,R=0,L=(t-e)/i;for(let N=0;N<=r;N++){let S=[],M=N/r,P=M*(t-e)+e;for(let k=0;k<=s;k++){let G=k/s,q=G*l+a,$=Math.sin(q),Y=Math.cos(q);A.x=P*$,A.y=-M*i+m,A.z=P*Y,u.push(A.x,A.y,A.z),y.set($,L,Y).normalize(),d.push(y.x,y.y,y.z),f.push(G,1-M),S.push(g++)}v.push(S)}for(let N=0;N<s;N++)for(let S=0;S<r;S++){let M=v[S][N],P=v[S+1][N],k=v[S+1][N+1],G=v[S][N+1];(e>0||S!==0)&&(h.push(M,P,G),R+=3),(t>0||S!==r-1)&&(h.push(P,k,G),R+=3)}c.addGroup(p,R,0),p+=R}function T(y){let A=g,R=new de,L=new I,N=0,S=y===!0?e:t,M=y===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;let P=g;for(let k=0;k<=s;k++){let q=k/s*l+a,$=Math.cos(q),Y=Math.sin(q);L.x=S*Y,L.y=m*M,L.z=S*$,u.push(L.x,L.y,L.z),d.push(0,M,0),R.x=$*.5+.5,R.y=Y*.5*M+.5,f.push(R.x,R.y),g++}for(let k=0;k<s;k++){let G=A+k,q=P+k;y===!0?h.push(q,q+1,G):h.push(q+1,q,G),N+=3}c.addGroup(p,N,y===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},bs=class n extends ln{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var cn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),s=0,r=i.length,o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);let h=i[s],d=i[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new de:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new I,s=[],r=[],o=[],a=new I,l=new ft;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(nt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(nt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ts=class extends cn{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new de){let i=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Oo=class extends Ts{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Mc(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return n+e*r+t*o+i*a}}}var So=new I,zl=new Mc,kl=new Mc,Vl=new Mc,zo=class extends cn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new I){let i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(So.subVectors(s[0],s[1]).add(s[0]),c=So);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(So.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=So),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),zl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),kl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),Vl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(zl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),kl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Vl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(zl.calc(l),kl.calc(l),Vl.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function _h(n,e,t,i,s){let r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function Rd(n,e){let t=1-n;return t*t*e}function Id(n,e){return 2*(1-n)*n*e}function Pd(n,e){return n*n*e}function er(n,e,t,i){return Rd(n,e)+Id(n,t)+Pd(n,i)}function Ld(n,e){let t=1-n;return t*t*t*e}function Dd(n,e){let t=1-n;return 3*t*t*n*e}function Ud(n,e){return 3*(1-n)*n*n*e}function Nd(n,e){return n*n*n*e}function tr(n,e,t,i,s){return Ld(n,e)+Dd(n,t)+Ud(n,i)+Nd(n,s)}var xr=class extends cn{constructor(e=new de,t=new de,i=new de,s=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new de){let i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(tr(e,s.x,r.x,o.x,a.x),tr(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ko=class extends cn{constructor(e=new I,t=new I,i=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new I){let i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(tr(e,s.x,r.x,o.x,a.x),tr(e,s.y,r.y,o.y,a.y),tr(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},vr=class extends cn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Vo=class extends cn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yr=class extends cn{constructor(e=new de,t=new de,i=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new de){let i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(er(e,s.x,r.x,o.x),er(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Go=class extends cn{constructor(e=new I,t=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new I){let i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(er(e,s.x,r.x,o.x),er(e,s.y,r.y,o.y),er(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Mr=class extends cn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){let i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(_h(a,l.x,c.x,h.x,u.x),_h(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new de().fromArray(s))}return this}},Zl=Object.freeze({__proto__:null,ArcCurve:Oo,CatmullRomCurve3:zo,CubicBezierCurve:xr,CubicBezierCurve3:ko,EllipseCurve:Ts,LineCurve:vr,LineCurve3:Vo,QuadraticBezierCurve:yr,QuadraticBezierCurve3:Go,SplineCurve:Mr}),Ho=class extends cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zl[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(new Zl[s.type]().fromJSON(s))}return this}},Sr=class extends Ho{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new vr(this.currentPoint.clone(),new de(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){let r=new yr(this.currentPoint.clone(),new de(e,t),new de(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){let a=new xr(this.currentPoint.clone(),new de(e,t),new de(i,s),new de(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Mr(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,s,r,o,a,l),this}absellipse(e,t,i,s,r,o,a,l){let c=new Ts(e,t,i,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ws=class extends Sr{constructor(e){super(e),this.uuid=Yn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let s=e.holes[t];this.holes.push(new Sr().fromJSON(s))}return this}};function Fd(n,e,t=2){let i=e&&e.length,s=i?e[0]*t:n.length,r=mu(n,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=Vd(n,e,r,t)),n.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<s;d+=t){let f=n[d],g=n[d+1];f<a&&(a=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return br(r,o,t,a,l,c,0),o}function mu(n,e,t,i,s){let r;if(s===Qd(n,e,t,i)>0)for(let o=e;o<t;o+=i)r=xh(o/i|0,n[o],n[o+1],r);else for(let o=t-i;o>=e;o-=i)r=xh(o/i|0,n[o],n[o+1],r);return r&&Es(r,r.next)&&(wr(r),r=r.next),r}function Pi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Es(t,t.next)||At(t.prev,t,t.next)===0)){if(wr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function br(n,e,t,i,s,r,o){if(!n)return;!o&&r&&qd(n,i,s,r);let a=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(r?Od(n,i,s,r):Bd(n)){e.push(l.i,n.i,c.i),wr(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=zd(Pi(n),e),br(n,e,t,i,s,r,2)):o===2&&kd(n,e,t,i,s,r):br(Pi(n),e,t,i,s,r,1);break}}}function Bd(n){let e=n.prev,t=n,i=n.next;if(At(e,t,i)>=0)return!1;let s=e.x,r=t.x,o=i.x,a=e.y,l=t.y,c=i.y,h=Math.min(s,r,o),u=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c),g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&js(s,a,r,l,o,c,g.x,g.y)&&At(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Od(n,e,t,i){let s=n.prev,r=n,o=n.next;if(At(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,l,c),g=Math.min(h,u,d),v=Math.max(a,l,c),m=Math.max(h,u,d),p=Jl(f,g,e,t,i),C=Jl(v,m,e,t,i),T=n.prevZ,y=n.nextZ;for(;T&&T.z>=p&&y&&y.z<=C;){if(T.x>=f&&T.x<=v&&T.y>=g&&T.y<=m&&T!==s&&T!==o&&js(a,h,l,u,c,d,T.x,T.y)&&At(T.prev,T,T.next)>=0||(T=T.prevZ,y.x>=f&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&js(a,h,l,u,c,d,y.x,y.y)&&At(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;T&&T.z>=p;){if(T.x>=f&&T.x<=v&&T.y>=g&&T.y<=m&&T!==s&&T!==o&&js(a,h,l,u,c,d,T.x,T.y)&&At(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;y&&y.z<=C;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&js(a,h,l,u,c,d,y.x,y.y)&&At(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function zd(n,e){let t=n;do{let i=t.prev,s=t.next.next;!Es(i,s)&&_u(i,t,t.next,s)&&Tr(i,s)&&Tr(s,i)&&(e.push(i.i,t.i,s.i),wr(t),wr(t.next),t=n=s),t=t.next}while(t!==n);return Pi(t)}function kd(n,e,t,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Zd(o,a)){let l=xu(o,a);o=Pi(o,o.next),l=Pi(l,l.next),br(o,e,t,i,s,r,0),br(l,e,t,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function Vd(n,e,t,i){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*i,l=r<o-1?e[r+1]*i:n.length,c=mu(n,a,l,i,!1);c===c.next&&(c.steiner=!0),s.push($d(c))}s.sort(Gd);for(let r=0;r<s.length;r++)t=Hd(s[r],t);return t}function Gd(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Hd(n,e){let t=Wd(n,e);if(!t)return e;let i=xu(t,n);return Pi(i,i.next),Pi(t,t.next)}function Wd(n,e){let t=e,i=n.x,s=n.y,r=-1/0,o;if(Es(n,t))return t;do{if(Es(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===i))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&gu(s<c?i:r,s,l,c,s<c?r:i,s,t.x,t.y)){let u=Math.abs(s-t.y)/(i-t.x);Tr(t,n)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Xd(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Xd(n,e){return At(n.prev,n,e.prev)<0&&At(e.next,n,n.next)<0}function qd(n,e,t,i){let s=n;do s.z===0&&(s.z=Jl(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Yd(s)}function Yd(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,t*=2}while(e>1);return n}function Jl(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function $d(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function gu(n,e,t,i,s,r,o,a){return(s-o)*(e-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(i-a)}function js(n,e,t,i,s,r,o,a){return!(n===o&&e===a)&&gu(n,e,t,i,s,r,o,a)}function Zd(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Jd(n,e)&&(Tr(n,e)&&Tr(e,n)&&Kd(n,e)&&(At(n.prev,n,e.prev)||At(n,e.prev,e))||Es(n,e)&&At(n.prev,n,n.next)>0&&At(e.prev,e,e.next)>0)}function At(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Es(n,e){return n.x===e.x&&n.y===e.y}function _u(n,e,t,i){let s=To(At(n,e,t)),r=To(At(n,e,i)),o=To(At(t,i,n)),a=To(At(t,i,e));return!!(s!==r&&o!==a||s===0&&bo(n,t,e)||r===0&&bo(n,i,e)||o===0&&bo(t,n,i)||a===0&&bo(t,e,i))}function bo(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function To(n){return n>0?1:n<0?-1:0}function Jd(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&_u(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Tr(n,e){return At(n.prev,n,n.next)<0?At(n,e,n.next)>=0&&At(n,n.prev,e)>=0:At(n,e,n.prev)<0||At(n,n.next,e)<0}function Kd(n,e){let t=n,i=!1,s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function xu(n,e){let t=Kl(n.i,n.x,n.y),i=Kl(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function xh(n,e,t,i){let s=Kl(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function wr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Kl(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Qd(n,e,t,i){let s=0;for(let r=e,o=t-i;r<t;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}var Ql=class{static triangulate(e,t,i=2){return Fd(e,t,i)}},Ei=class n{static area(e){let t=e.length,i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],s=[],r=[];vh(e),yh(i,e);let o=e.length;t.forEach(vh);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,yh(i,t[l]);let a=Ql.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function vh(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function yh(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var Er=class n extends Lt{constructor(e=new ws([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new St(s,3)),this.setAttribute("uv",new St(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,C=t.UVGenerator!==void 0?t.UVGenerator:jd,T,y=!1,A,R,L,N;p&&(T=p.getSpacedPoints(h),y=!0,d=!1,A=p.computeFrenetFrames(h,!1),R=new I,L=new I,N=new I),d||(m=0,f=0,g=0,v=0);let S=a.extractPoints(c),M=S.shape,P=S.holes;if(!Ei.isClockWise(M)){M=M.reverse();for(let ie=0,ne=P.length;ie<ne;ie++){let j=P[ie];Ei.isClockWise(j)&&(P[ie]=j.reverse())}}function G(ie){let j=10000000000000001e-36,Q=ie[0];for(let he=1;he<=ie.length;he++){let ae=he%ie.length,me=ie[ae],Xe=me.x-Q.x,Ge=me.y-Q.y,b=Xe*Xe+Ge*Ge,_=Math.max(Math.abs(me.x),Math.abs(me.y),Math.abs(Q.x),Math.abs(Q.y)),B=j*_*_;if(b<=B){ie.splice(ae,1),he--;continue}Q=me}}G(M),P.forEach(G);let q=P.length,$=M;for(let ie=0;ie<q;ie++){let ne=P[ie];M=M.concat(ne)}function Y(ie,ne,j){return ne||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(ne,j)}let V=M.length;function W(ie,ne,j){let Q,he,ae,me=ie.x-ne.x,Xe=ie.y-ne.y,Ge=j.x-ie.x,b=j.y-ie.y,_=me*me+Xe*Xe,B=me*b-Xe*Ge;if(Math.abs(B)>Number.EPSILON){let H=Math.sqrt(_),X=Math.sqrt(Ge*Ge+b*b),Z=ne.x-Xe/H,De=ne.y+me/H,ue=j.x-b/X,Pe=j.y+Ge/X,Re=((ue-Z)*b-(Pe-De)*Ge)/(me*b-Xe*Ge);Q=Z+me*Re-ie.x,he=De+Xe*Re-ie.y;let oe=Q*Q+he*he;if(oe<=2)return new de(Q,he);ae=Math.sqrt(oe/2)}else{let H=!1;me>Number.EPSILON?Ge>Number.EPSILON&&(H=!0):me<-Number.EPSILON?Ge<-Number.EPSILON&&(H=!0):Math.sign(Xe)===Math.sign(b)&&(H=!0),H?(Q=-Xe,he=me,ae=Math.sqrt(_)):(Q=me,he=Xe,ae=Math.sqrt(_/2))}return new de(Q/ae,he/ae)}let fe=[];for(let ie=0,ne=$.length,j=ne-1,Q=ie+1;ie<ne;ie++,j++,Q++)j===ne&&(j=0),Q===ne&&(Q=0),fe[ie]=W($[ie],$[j],$[Q]);let ye=[],we,le=fe.concat();for(let ie=0,ne=q;ie<ne;ie++){let j=P[ie];we=[];for(let Q=0,he=j.length,ae=he-1,me=Q+1;Q<he;Q++,ae++,me++)ae===he&&(ae=0),me===he&&(me=0),we[Q]=W(j[Q],j[ae],j[me]);ye.push(we),le=le.concat(we)}let Ie;if(m===0)Ie=Ei.triangulateShape($,P);else{let ie=[],ne=[];for(let j=0;j<m;j++){let Q=j/m,he=f*Math.cos(Q*Math.PI/2),ae=g*Math.sin(Q*Math.PI/2)+v;for(let me=0,Xe=$.length;me<Xe;me++){let Ge=Y($[me],fe[me],ae);Oe(Ge.x,Ge.y,-he),Q===0&&ie.push(Ge)}for(let me=0,Xe=q;me<Xe;me++){let Ge=P[me];we=ye[me];let b=[];for(let _=0,B=Ge.length;_<B;_++){let H=Y(Ge[_],we[_],ae);Oe(H.x,H.y,-he),Q===0&&b.push(H)}Q===0&&ne.push(b)}}Ie=Ei.triangulateShape(ie,ne)}let ze=Ie.length,He=g+v;for(let ie=0;ie<V;ie++){let ne=d?Y(M[ie],le[ie],He):M[ie];y?(L.copy(A.normals[0]).multiplyScalar(ne.x),R.copy(A.binormals[0]).multiplyScalar(ne.y),N.copy(T[0]).add(L).add(R),Oe(N.x,N.y,N.z)):Oe(ne.x,ne.y,0)}for(let ie=1;ie<=h;ie++)for(let ne=0;ne<V;ne++){let j=d?Y(M[ne],le[ne],He):M[ne];y?(L.copy(A.normals[ie]).multiplyScalar(j.x),R.copy(A.binormals[ie]).multiplyScalar(j.y),N.copy(T[ie]).add(L).add(R),Oe(N.x,N.y,N.z)):Oe(j.x,j.y,u/h*ie)}for(let ie=m-1;ie>=0;ie--){let ne=ie/m,j=f*Math.cos(ne*Math.PI/2),Q=g*Math.sin(ne*Math.PI/2)+v;for(let he=0,ae=$.length;he<ae;he++){let me=Y($[he],fe[he],Q);Oe(me.x,me.y,u+j)}for(let he=0,ae=P.length;he<ae;he++){let me=P[he];we=ye[he];for(let Xe=0,Ge=me.length;Xe<Ge;Xe++){let b=Y(me[Xe],we[Xe],Q);y?Oe(b.x,b.y+T[h-1].y,T[h-1].x+j):Oe(b.x,b.y,u+j)}}}J(),se();function J(){let ie=s.length/3;if(d){let ne=0,j=V*ne;for(let Q=0;Q<ze;Q++){let he=Ie[Q];Le(he[2]+j,he[1]+j,he[0]+j)}ne=h+m*2,j=V*ne;for(let Q=0;Q<ze;Q++){let he=Ie[Q];Le(he[0]+j,he[1]+j,he[2]+j)}}else{for(let ne=0;ne<ze;ne++){let j=Ie[ne];Le(j[2],j[1],j[0])}for(let ne=0;ne<ze;ne++){let j=Ie[ne];Le(j[0]+V*h,j[1]+V*h,j[2]+V*h)}}i.addGroup(ie,s.length/3-ie,0)}function se(){let ie=s.length/3,ne=0;Ae($,ne),ne+=$.length;for(let j=0,Q=P.length;j<Q;j++){let he=P[j];Ae(he,ne),ne+=he.length}i.addGroup(ie,s.length/3-ie,1)}function Ae(ie,ne){let j=ie.length;for(;--j>=0;){let Q=j,he=j-1;he<0&&(he=ie.length-1);for(let ae=0,me=h+m*2;ae<me;ae++){let Xe=V*ae,Ge=V*(ae+1),b=ne+Q+Xe,_=ne+he+Xe,B=ne+he+Ge,H=ne+Q+Ge;et(b,_,B,H)}}}function Oe(ie,ne,j){l.push(ie),l.push(ne),l.push(j)}function Le(ie,ne,j){lt(ie),lt(ne),lt(j);let Q=s.length/3,he=C.generateTopUV(i,s,Q-3,Q-2,Q-1);E(he[0]),E(he[1]),E(he[2])}function et(ie,ne,j,Q){lt(ie),lt(ne),lt(Q),lt(ne),lt(j),lt(Q);let he=s.length/3,ae=C.generateSideWallUV(i,s,he-6,he-3,he-2,he-1);E(ae[0]),E(ae[1]),E(ae[3]),E(ae[1]),E(ae[2]),E(ae[3])}function lt(ie){s.push(l[ie*3+0]),s.push(l[ie*3+1]),s.push(l[ie*3+2])}function E(ie){r.push(ie.x),r.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return ef(t,i,e)}static fromJSON(e,t){let i=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];i.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Zl[s.type]().fromJSON(s)),new n(i,e.options)}},jd={generateTopUV:function(n,e,t,i,s){let r=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[s*3],h=e[s*3+1];return[new de(r,o),new de(a,l),new de(c,h)]},generateSideWallUV:function(n,e,t,i,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],v=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new de(o,1-l),new de(c,1-u),new de(d,1-g),new de(v,1-p)]:[new de(a,1-l),new de(h,1-u),new de(f,1-g),new de(m,1-p)]}};function ef(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Qn=class n extends Lt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let C=p*d-o;for(let T=0;T<c;T++){let y=T*u-r;g.push(y,-C,0),v.push(0,0,1),m.push(T/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let C=0;C<a;C++){let T=C+c*p,y=C+c*(p+1),A=C+1+c*(p+1),R=C+1+c*p;f.push(T,y,R),f.push(y,A,R)}this.setIndex(f),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(v,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var hn=class n extends Lt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new I,d=new I,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){let C=[],T=p/i,y=0;p===0&&o===0?y=.5/t:p===i&&l===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){let R=A/t;u.x=-e*Math.cos(s+R*r)*Math.sin(o+T*a),u.y=e*Math.cos(o+T*a),u.z=e*Math.sin(s+R*r)*Math.sin(o+T*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(R+y,1-T),C.push(c++)}h.push(C)}for(let p=0;p<i;p++)for(let C=0;C<t;C++){let T=h[p][C+1],y=h[p][C],A=h[p+1][C],R=h[p+1][C+1];(p!==0||o>0)&&f.push(T,y,R),(p!==i-1||l<Math.PI)&&f.push(y,A,R)}this.setIndex(f),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(v,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ar=class n extends Lt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new I,u=new I,d=new I;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){let v=g/s*r,m=f/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){let v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,C=(s+1)*f+g;o.push(v,m,C),o.push(m,p,C)}this.setIndex(o),this.setAttribute("position",new St(a,3)),this.setAttribute("normal",new St(l,3)),this.setAttribute("uv",new St(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Fn=class extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ja,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Cr=class extends Fn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new We(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new We(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new We(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Li=class extends An{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ja,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jt,this.combine=ha,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Wo=class extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xo=class extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function wo(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function tf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Di=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},qo=class extends Di{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wl,endingEnd:Wl}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Xl:r=e,a=2*t-i;break;case ql:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Xl:o=e,l=2*i-t;break;case ql:o=1,l=i+s[1]-s[0];break;default:o=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-t)/(s-t),v=g*g,m=v*g,p=-d*m+2*d*v-d*g,C=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,T=(-1-f)*m+(1.5+f)*v+.5*g,y=f*m-f*v;for(let A=0;A!==a;++A)r[A]=p*o[h+A]+C*o[c+A]+T*o[l+A]+y*o[u+A];return r}},Yo=class extends Di{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(i-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},$o=class extends Di{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},un=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=wo(t,this.TimeBufferType),this.values=wo(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:wo(e.times,Array),values:wo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new $o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case nr:t=this.InterpolantFactoryMethodDiscrete;break;case Io:t=this.InterpolantFactoryMethodLinear;break;case Eo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nr;case this.InterpolantFactoryMethodLinear:return Io;case this.InterpolantFactoryMethodSmooth:return Eo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&tf(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Eo,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let u=a*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){let v=t[u+g];if(v!==t[d+g]||v!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*i,d=o*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};un.prototype.ValueTypeName="";un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=Io;var ui=class extends un{constructor(e,t,i){super(e,t,i)}};ui.prototype.ValueTypeName="bool";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=nr;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Zo=class extends un{constructor(e,t,i,s){super(e,t,i,s)}};Zo.prototype.ValueTypeName="color";var Jo=class extends un{constructor(e,t,i,s){super(e,t,i,s)}};Jo.prototype.ValueTypeName="number";var Ko=class extends Di{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)_n.slerpFlat(r,0,o,c-a,o,c,l);return r}},Rr=class extends un{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Ko(this.times,this.values,this.getValueSize(),e)}};Rr.prototype.ValueTypeName="quaternion";Rr.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends un{constructor(e,t,i){super(e,t,i)}};di.prototype.ValueTypeName="string";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=nr;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var Qo=class extends un{constructor(e,t,i,s){super(e,t,i,s)}};Qo.prototype.ValueTypeName="vector";var jo=class{constructor(e,t,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},vu=new jo,ea=class{constructor(e){this.manager=e!==void 0?e:vu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ea.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ui=class extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Ir=class extends Ui{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Gl=new ft,Mh=new I,Sh=new I,Pr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=Cn,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ys,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Mh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mh),Sh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sh),t.updateMatrixWorld(),Gl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Gl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},jl=class extends Pr{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=rr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Lr=class extends Ui{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new jl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},bh=new ft,Qs=new I,Hl=new I,ec=class extends Pr{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new ut(2,1,1,1),new ut(0,1,1,1),new ut(3,1,1,1),new ut(1,1,1,1),new ut(3,0,1,1),new ut(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Qs.setFromMatrixPosition(e.matrixWorld),i.position.copy(Qs),Hl.copy(i.position),Hl.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Hl),i.updateMatrixWorld(),s.makeTranslation(-Qs.x,-Qs.y,-Qs.z),bh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bh,i.coordinateSystem,i.reversedDepth)}},fi=class extends Ui{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new ec}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Dr=class extends hr{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},tc=class extends Pr{constructor(){super(new Dr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ur=class extends Ui{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new tc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ta=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Sc="\\[\\]\\.:\\/",nf=new RegExp("["+Sc+"]","g"),bc="[^"+Sc+"]",sf="[^"+Sc.replace("\\.","")+"]",rf=/((?:WC+[\/:])*)/.source.replace("WC",bc),of=/(WCOD+)?/.source.replace("WCOD",sf),af=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bc),lf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bc),cf=new RegExp("^"+rf+of+af+lf+"$"),hf=["material","materials","bones","map"],nc=class{constructor(e,t,i){let s=i||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Mt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(nf,"")}static parseTrackName(e){let t=cf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);hf.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Mt.Composite=nc;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var c_=new Float32Array(1);var Th=new ft,Nr=class{constructor(e,t,i=0,s=1/0){this.ray=new ps(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Th.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Th),this}intersectObject(e,t=!0,i=[]){return ic(e,this,i,t),i.sort(wh),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)ic(e[s],this,i,t);return i.sort(wh),i}};function wh(n,e){return n.distance-e.distance}function ic(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let o=0,a=r.length;o<a;o++)ic(r[o],e,t,!0)}}function Tc(n,e,t,i){let s=uf(i);switch(t){case pc:return n*e;case xa:return n*e/s.components*s.byteLength;case va:return n*e/s.components*s.byteLength;case gc:return n*e*2/s.components*s.byteLength;case ya:return n*e*2/s.components*s.byteLength;case mc:return n*e*3/s.components*s.byteLength;case vn:return n*e*4/s.components*s.byteLength;case Ma:return n*e*4/s.components*s.byteLength;case Or:case zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case kr:case Vr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ba:case wa:return Math.max(n,16)*Math.max(e,8)/4;case Sa:case Ta:return Math.max(n,8)*Math.max(e,8)/2;case Ea:case Aa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ca:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ia:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Pa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case La:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Da:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Na:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Fa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ba:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Oa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case za:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ka:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Va:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ga:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ha:case Wa:case Xa:return Math.ceil(n/4)*Math.ceil(e/4)*16;case qa:case Ya:return Math.ceil(n/4)*Math.ceil(e/4)*8;case $a:case Za:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function uf(n){switch(n){case Cn:case hc:return{byteLength:1,components:1};case As:case uc:case Cs:return{byteLength:2,components:1};case ga:case _a:return{byteLength:2,components:4};case mi:case ma:case Rn:return{byteLength:4,components:1};case dc:case fc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Hu(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function gf(n){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let v=u[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var _f=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xf=`#ifdef USE_ALPHAHASH
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
#endif`,vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bf=`#ifdef USE_AOMAP
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
#endif`,Tf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wf=`#ifdef USE_BATCHING
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
#endif`,Ef=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Af=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,If=`#ifdef USE_IRIDESCENCE
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
#endif`,Pf=`#ifdef USE_BUMPMAP
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
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ff=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Of=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,kf=`#define PI 3.141592653589793
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
} // validated`,Vf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Gf=`vec3 transformedNormal = objectNormal;
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
#endif`,Hf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zf=`#ifdef USE_ENVMAP
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
#endif`,Jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif`,Kf=`#ifdef USE_ENVMAP
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
#endif`,Qf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jf=`#ifdef USE_ENVMAP
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
#endif`,ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,np=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ip=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sp=`#ifdef USE_GRADIENTMAP
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
}`,rp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lp=`uniform bool receiveShadow;
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
#endif`,cp=`#ifdef USE_ENVMAP
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
#endif`,hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pp=`PhysicalMaterial material;
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
#endif`,mp=`struct PhysicalMaterial {
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
}`,gp=`
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
#endif`,_p=`#if defined( RE_IndirectDiffuse )
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
#endif`,xp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ep=`#if defined( USE_POINTS_UV )
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
#endif`,Ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ip=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lp=`#ifdef USE_MORPHTARGETS
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
#endif`,Dp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Up=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Np=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zp=`#ifdef USE_NORMALMAP
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
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$p=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,em=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tm=`float getShadowMask() {
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
}`,nm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,im=`#ifdef USE_SKINNING
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
#endif`,sm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rm=`#ifdef USE_SKINNING
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
#endif`,om=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,am=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hm=`#ifdef USE_TRANSMISSION
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
#endif`,um=`#ifdef USE_TRANSMISSION
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
#endif`,dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_m=`uniform sampler2D t2D;
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
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`#include <common>
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
}`,bm=`#if DEPTH_PACKING == 3200
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
}`,Tm=`#define DISTANCE
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
}`,wm=`#define DISTANCE
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Am=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`uniform float scale;
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
}`,Rm=`uniform vec3 diffuse;
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
}`,Im=`#include <common>
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Lm=`#define LAMBERT
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
}`,Dm=`#define LAMBERT
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
}`,Um=`#define MATCAP
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
}`,Nm=`#define MATCAP
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
}`,Fm=`#define NORMAL
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
}`,Bm=`#define NORMAL
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
}`,Om=`#define PHONG
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
}`,zm=`#define PHONG
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
}`,km=`#define STANDARD
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
}`,Vm=`#define STANDARD
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
}`,Gm=`#define TOON
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
}`,Hm=`#define TOON
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
}`,Wm=`uniform float size;
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
}`,Xm=`uniform vec3 diffuse;
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
}`,qm=`#include <common>
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
}`,Ym=`uniform vec3 color;
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
}`,$m=`uniform float rotation;
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
}`,Zm=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:_f,alphahash_pars_fragment:xf,alphamap_fragment:vf,alphamap_pars_fragment:yf,alphatest_fragment:Mf,alphatest_pars_fragment:Sf,aomap_fragment:bf,aomap_pars_fragment:Tf,batching_pars_vertex:wf,batching_vertex:Ef,begin_vertex:Af,beginnormal_vertex:Cf,bsdfs:Rf,iridescence_fragment:If,bumpmap_pars_fragment:Pf,clipping_planes_fragment:Lf,clipping_planes_pars_fragment:Df,clipping_planes_pars_vertex:Uf,clipping_planes_vertex:Nf,color_fragment:Ff,color_pars_fragment:Bf,color_pars_vertex:Of,color_vertex:zf,common:kf,cube_uv_reflection_fragment:Vf,defaultnormal_vertex:Gf,displacementmap_pars_vertex:Hf,displacementmap_vertex:Wf,emissivemap_fragment:Xf,emissivemap_pars_fragment:qf,colorspace_fragment:Yf,colorspace_pars_fragment:$f,envmap_fragment:Zf,envmap_common_pars_fragment:Jf,envmap_pars_fragment:Kf,envmap_pars_vertex:Qf,envmap_physical_pars_fragment:cp,envmap_vertex:jf,fog_vertex:ep,fog_pars_vertex:tp,fog_fragment:np,fog_pars_fragment:ip,gradientmap_pars_fragment:sp,lightmap_pars_fragment:rp,lights_lambert_fragment:op,lights_lambert_pars_fragment:ap,lights_pars_begin:lp,lights_toon_fragment:hp,lights_toon_pars_fragment:up,lights_phong_fragment:dp,lights_phong_pars_fragment:fp,lights_physical_fragment:pp,lights_physical_pars_fragment:mp,lights_fragment_begin:gp,lights_fragment_maps:_p,lights_fragment_end:xp,logdepthbuf_fragment:vp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:Mp,logdepthbuf_vertex:Sp,map_fragment:bp,map_pars_fragment:Tp,map_particle_fragment:wp,map_particle_pars_fragment:Ep,metalnessmap_fragment:Ap,metalnessmap_pars_fragment:Cp,morphinstance_vertex:Rp,morphcolor_vertex:Ip,morphnormal_vertex:Pp,morphtarget_pars_vertex:Lp,morphtarget_vertex:Dp,normal_fragment_begin:Up,normal_fragment_maps:Np,normal_pars_fragment:Fp,normal_pars_vertex:Bp,normal_vertex:Op,normalmap_pars_fragment:zp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Vp,clearcoat_pars_fragment:Gp,iridescence_pars_fragment:Hp,opaque_fragment:Wp,packing:Xp,premultiplied_alpha_fragment:qp,project_vertex:Yp,dithering_fragment:$p,dithering_pars_fragment:Zp,roughnessmap_fragment:Jp,roughnessmap_pars_fragment:Kp,shadowmap_pars_fragment:Qp,shadowmap_pars_vertex:jp,shadowmap_vertex:em,shadowmask_pars_fragment:tm,skinbase_vertex:nm,skinning_pars_vertex:im,skinning_vertex:sm,skinnormal_vertex:rm,specularmap_fragment:om,specularmap_pars_fragment:am,tonemapping_fragment:lm,tonemapping_pars_fragment:cm,transmission_fragment:hm,transmission_pars_fragment:um,uv_pars_fragment:dm,uv_pars_vertex:fm,uv_vertex:pm,worldpos_vertex:mm,background_vert:gm,background_frag:_m,backgroundCube_vert:xm,backgroundCube_frag:vm,cube_vert:ym,cube_frag:Mm,depth_vert:Sm,depth_frag:bm,distanceRGBA_vert:Tm,distanceRGBA_frag:wm,equirect_vert:Em,equirect_frag:Am,linedashed_vert:Cm,linedashed_frag:Rm,meshbasic_vert:Im,meshbasic_frag:Pm,meshlambert_vert:Lm,meshlambert_frag:Dm,meshmatcap_vert:Um,meshmatcap_frag:Nm,meshnormal_vert:Fm,meshnormal_frag:Bm,meshphong_vert:Om,meshphong_frag:zm,meshphysical_vert:km,meshphysical_frag:Vm,meshtoon_vert:Gm,meshtoon_frag:Hm,points_vert:Wm,points_frag:Xm,shadow_vert:qm,shadow_frag:Ym,sprite_vert:$m,sprite_frag:Zm},Se={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},On={basic:{uniforms:Xt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Xt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new We(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Xt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Xt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Xt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new We(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Xt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Xt([Se.points,Se.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Xt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Xt([Se.common,Se.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Xt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Xt([Se.sprite,Se.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:Xt([Se.common,Se.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:Xt([Se.lights,Se.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};On.physical={uniforms:Xt([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var Qa={r:0,b:0,g:0},Oi=new jt,Jm=new ft;function Km(n,e,t,i,s,r,o){let a=new We(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(T){let y=T.isScene===!0?T.background:null;return y&&y.isTexture&&(y=(T.backgroundBlurriness>0?t:e).get(y)),y}function v(T){let y=!1,A=g(T);A===null?p(a,l):A&&A.isColor&&(p(A,1),y=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(T,y){let A=g(y);A&&(A.isCubeTexture||A.mapping===Fr)?(h===void 0&&(h=new mt(new Je(1,1,1),new Zt({name:"BackgroundCubeMaterial",uniforms:Bi(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,L,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Oi.copy(y.backgroundRotation),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Jm.makeRotationFromEuler(Oi)),h.material.toneMapped=rt.getTransfer(A.colorSpace)!==dt,(u!==A||d!==A.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=A,d=A.version,f=n.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new mt(new Qn(2,2),new Zt({name:"BackgroundMaterial",uniforms:Bi(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=rt.getTransfer(A.colorSpace)!==dt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,y){T.getRGB(Qa,yc(n)),i.buffers.color.setClear(Qa.r,Qa.g,Qa.b,y,o)}function C(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,y=1){a.set(T),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(a,l)},render:v,addToRenderList:m,dispose:C}}function Qm(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(M,P,k,G,q){let $=!1,Y=u(G,k,P);r!==Y&&(r=Y,c(r.object)),$=f(M,G,k,q),$&&g(M,G,k,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,y(M,P,k,G),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,P,k){let G=k.wireframe===!0,q=i[M.id];q===void 0&&(q={},i[M.id]=q);let $=q[P.id];$===void 0&&($={},q[P.id]=$);let Y=$[G];return Y===void 0&&(Y=d(l()),$[G]=Y),Y}function d(M){let P=[],k=[],G=[];for(let q=0;q<t;q++)P[q]=0,k[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:G,object:M,attributes:{},index:null}}function f(M,P,k,G){let q=r.attributes,$=P.attributes,Y=0,V=k.getAttributes();for(let W in V)if(V[W].location>=0){let ye=q[W],we=$[W];if(we===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(we=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(we=M.instanceColor)),ye===void 0||ye.attribute!==we||we&&ye.data!==we.data)return!0;Y++}return r.attributesNum!==Y||r.index!==G}function g(M,P,k,G){let q={},$=P.attributes,Y=0,V=k.getAttributes();for(let W in V)if(V[W].location>=0){let ye=$[W];ye===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(ye=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(ye=M.instanceColor));let we={};we.attribute=ye,ye&&ye.data&&(we.data=ye.data),q[W]=we,Y++}r.attributes=q,r.attributesNum=Y,r.index=G}function v(){let M=r.newAttributes;for(let P=0,k=M.length;P<k;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){let k=r.newAttributes,G=r.enabledAttributes,q=r.attributeDivisors;k[M]=1,G[M]===0&&(n.enableVertexAttribArray(M),G[M]=1),q[M]!==P&&(n.vertexAttribDivisor(M,P),q[M]=P)}function C(){let M=r.newAttributes,P=r.enabledAttributes;for(let k=0,G=P.length;k<G;k++)P[k]!==M[k]&&(n.disableVertexAttribArray(k),P[k]=0)}function T(M,P,k,G,q,$,Y){Y===!0?n.vertexAttribIPointer(M,P,k,q,$):n.vertexAttribPointer(M,P,k,G,q,$)}function y(M,P,k,G){v();let q=G.attributes,$=k.getAttributes(),Y=P.defaultAttributeValues;for(let V in $){let W=$[V];if(W.location>=0){let fe=q[V];if(fe===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor)),fe!==void 0){let ye=fe.normalized,we=fe.itemSize,le=e.get(fe);if(le===void 0)continue;let Ie=le.buffer,ze=le.type,He=le.bytesPerElement,J=ze===n.INT||ze===n.UNSIGNED_INT||fe.gpuType===ma;if(fe.isInterleavedBufferAttribute){let se=fe.data,Ae=se.stride,Oe=fe.offset;if(se.isInstancedInterleavedBuffer){for(let Le=0;Le<W.locationSize;Le++)p(W.location+Le,se.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Le=0;Le<W.locationSize;Le++)m(W.location+Le);n.bindBuffer(n.ARRAY_BUFFER,Ie);for(let Le=0;Le<W.locationSize;Le++)T(W.location+Le,we/W.locationSize,ze,ye,Ae*He,(Oe+we/W.locationSize*Le)*He,J)}else{if(fe.isInstancedBufferAttribute){for(let se=0;se<W.locationSize;se++)p(W.location+se,fe.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let se=0;se<W.locationSize;se++)m(W.location+se);n.bindBuffer(n.ARRAY_BUFFER,Ie);for(let se=0;se<W.locationSize;se++)T(W.location+se,we/W.locationSize,ze,ye,we*He,we/W.locationSize*se*He,J)}}else if(Y!==void 0){let ye=Y[V];if(ye!==void 0)switch(ye.length){case 2:n.vertexAttrib2fv(W.location,ye);break;case 3:n.vertexAttrib3fv(W.location,ye);break;case 4:n.vertexAttrib4fv(W.location,ye);break;default:n.vertexAttrib1fv(W.location,ye)}}}}C()}function A(){N();for(let M in i){let P=i[M];for(let k in P){let G=P[k];for(let q in G)h(G[q].object),delete G[q];delete P[k]}delete i[M]}}function R(M){if(i[M.id]===void 0)return;let P=i[M.id];for(let k in P){let G=P[k];for(let q in G)h(G[q].object),delete G[q];delete P[k]}delete i[M.id]}function L(M){for(let P in i){let k=i[P];if(k[M.id]===void 0)continue;let G=k[M.id];for(let q in G)h(G[q].object),delete G[q];delete k[M.id]}}function N(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:C}}function jm(n,e,t){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,i,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function eg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(L){return!(L!==vn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){let N=L===Cs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Cn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Rn&&!N)}function l(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:C,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:A,maxSamples:R}}function tg(n){let e=this,t=null,i=0,s=!1,r=!1,o=new Pn,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let C=r?0:i,T=C*4,y=p.clippingState||null;l.value=y,y=h(g,d,T,f);for(let A=0;A!==T;++A)y[A]=t[A];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=C}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let p=f+v*4,C=d.matrixWorldInverse;a.getNormalMatrix(C),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,y=f;T!==v;++T,y+=4)o.copy(u[T]).applyMatrix4(C,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function ng(n){let e=new WeakMap;function t(o,a){return a===da?o.mapping=Ni:a===fa&&(o.mapping=Fi),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===da||a===fa)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Fo(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}var Ls=4,yu=[.125,.215,.35,.446,.526,.582],Vi=20,wc=new Dr,Mu=new We,Ec=null,Ac=0,Cc=0,Rc=!1,ki=(1+Math.sqrt(5))/2,Ps=1/ki,Su=[new I(-ki,Ps,0),new I(ki,Ps,0),new I(-Ps,0,ki),new I(Ps,0,ki),new I(0,ki,-Ps),new I(0,ki,Ps),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],ig=new I,Us=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){let{size:o=256,position:a=ig}=r;Ec=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ec,Ac,Cc),this._renderer.xr.enabled=Rc,e.scissorTest=!1,ja(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ni||e.mapping===Fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ec=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:En,minFilter:En,generateMipmaps:!1,type:Cs,format:vn,colorSpace:Ri,depthBuffer:!1},s=bu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bu(e,t,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sg(r)),this._blurMaterial=rg(r,e,t)}return s}_compileMaterial(e){let t=new mt(this._lodPlanes[0],e);this._renderer.compile(t,wc)}_sceneToCubeUV(e,t,i,s,r){let l=new zt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Mu),u.toneMapping=ei,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let v=new en({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),m=new mt(new Je,v),p=!1,C=e.background;C?C.isColor&&(v.color.copy(C),e.background=null,p=!0):(v.color.copy(Mu),p=!0);for(let T=0;T<6;T++){let y=T%3;y===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):y===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));let A=this._cubeSize;ja(s,y*A,T>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=C}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Ni||e.mapping===Fi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tu());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new mt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;ja(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,wc)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Su[(s-r-1)%Su.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new mt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Vi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Vi;m>Vi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vi}`);let p=[],C=0;for(let L=0;L<Vi;++L){let N=L/v,S=Math.exp(-N*N/2);p.push(S),L===0?C+=S:L<m&&(C+=2*S)}for(let L=0;L<p.length;L++)p[L]=p[L]/C;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:T}=this;d.dTheta.value=g,d.mipInt.value=T-i;let y=this._sizeLods[s],A=3*y*(s>T-Ls?s-T+Ls:0),R=4*(this._cubeSize-y);ja(t,A,R,3*y,2*y),l.setRenderTarget(t),l.render(u,wc)}};function sg(n){let e=[],t=[],i=[],s=n,r=n-Ls+1+yu.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let l=1/a;o>n-Ls?l=yu[o-n+Ls-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,C=new Float32Array(v*g*f),T=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let R=0;R<f;R++){let L=R%3*2/3-1,N=R>2?0:-1,S=[L,N,0,L+2/3,N,0,L+2/3,N+1,0,L,N,0,L+2/3,N+1,0,L,N+1,0];C.set(S,v*g*R),T.set(d,m*g*R);let M=[R,R,R,R,R,R];y.set(M,p*g*R)}let A=new Lt;A.setAttribute("position",new Pt(C,v)),A.setAttribute("uv",new Pt(T,m)),A.setAttribute("faceIndex",new Pt(y,p)),e.push(A),s>Ls&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function bu(n,e,t){let i=new Dn(n,e,t);return i.texture.mapping=Fr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ja(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function rg(n,e,t){let i=new Float32Array(Vi),s=new I(0,1,0);return new Zt({name:"SphericalGaussianBlur",defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:zc(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Tu(){return new Zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zc(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function wu(){return new Zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function zc(){return`

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
	`}function og(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===da||l===fa,h=l===Ni||l===Fi;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Us(n)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Us(n)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function ag(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&ds("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function lg(n,e,t,i){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,v=0;if(f!==null){let C=f.array;v=f.version;for(let T=0,y=C.length;T<y;T+=3){let A=C[T+0],R=C[T+1],L=C[T+2];d.push(A,R,R,L,L,A)}}else if(g!==void 0){let C=g.array;v=g.version;for(let T=0,y=C.length/3-1;T<y;T+=3){let A=T+0,R=T+1,L=T+2;d.push(A,R,R,L,L,A)}}else return;let m=new(vc(d)?cr:lr)(d,1);m.version=v;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function cg(n,e,t){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){n.drawElements(i,f,r,d*o),t.update(f,i,1)}function c(d,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,d*o,g),t.update(f,i,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function u(d,f,g,v){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,v,0,g);let p=0;for(let C=0;C<g;C++)p+=f[C]*v[C];t.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hg(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function ug(n,e,t){let i=new WeakMap,s=new ut;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let S=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],C=a.morphAttributes.color||[],T=0;f===!0&&(T=1),g===!0&&(T=2),v===!0&&(T=3);let y=a.attributes.position.count*T,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let R=new Float32Array(y*A*4*u),L=new ar(R,y,A,u);L.type=Rn,L.needsUpdate=!0;let N=T*4;for(let M=0;M<u;M++){let P=m[M],k=p[M],G=C[M],q=y*A*4*M;for(let $=0;$<P.count;$++){let Y=$*N;f===!0&&(s.fromBufferAttribute(P,$),R[q+Y+0]=s.x,R[q+Y+1]=s.y,R[q+Y+2]=s.z,R[q+Y+3]=0),g===!0&&(s.fromBufferAttribute(k,$),R[q+Y+4]=s.x,R[q+Y+5]=s.y,R[q+Y+6]=s.z,R[q+Y+7]=0),v===!0&&(s.fromBufferAttribute(G,$),R[q+Y+8]=s.x,R[q+Y+9]=s.y,R[q+Y+10]=s.z,R[q+Y+11]=G.itemSize===4?s.w:1)}}d={count:u,texture:L,size:new de(y,A)},i.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function dg(n,e,t,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var Wu=new $t,Eu=new gr(1,1),Xu=new ar,qu=new Uo,Yu=new ur,Au=[],Cu=[],Ru=new Float32Array(16),Iu=new Float32Array(9),Pu=new Float32Array(4);function Ns(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Au[s];if(r===void 0&&(r=new Float32Array(s),Au[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Nt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function nl(n,e){let t=Cu[e];t===void 0&&(t=new Int32Array(e),Cu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function fg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function pg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Nt(t,e)}}function mg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Nt(t,e)}}function gg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Nt(t,e)}}function _g(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Pu.set(i),n.uniformMatrix2fv(this.addr,!1,Pu),Nt(t,i)}}function xg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Iu.set(i),n.uniformMatrix3fv(this.addr,!1,Iu),Nt(t,i)}}function vg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Ru.set(i),n.uniformMatrix4fv(this.addr,!1,Ru),Nt(t,i)}}function yg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Mg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Nt(t,e)}}function Sg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Nt(t,e)}}function bg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Nt(t,e)}}function Tg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function wg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Nt(t,e)}}function Eg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Nt(t,e)}}function Ag(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Nt(t,e)}}function Cg(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Eu.compareFunction=_c,r=Eu):r=Wu,t.setTexture2D(e||r,s)}function Rg(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||qu,s)}function Ig(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Yu,s)}function Pg(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Xu,s)}function Lg(n){switch(n){case 5126:return fg;case 35664:return pg;case 35665:return mg;case 35666:return gg;case 35674:return _g;case 35675:return xg;case 35676:return vg;case 5124:case 35670:return yg;case 35667:case 35671:return Mg;case 35668:case 35672:return Sg;case 35669:case 35673:return bg;case 5125:return Tg;case 36294:return wg;case 36295:return Eg;case 36296:return Ag;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Rg;case 35680:case 36300:case 36308:case 36293:return Ig;case 36289:case 36303:case 36311:case 36292:return Pg}}function Dg(n,e){n.uniform1fv(this.addr,e)}function Ug(n,e){let t=Ns(e,this.size,2);n.uniform2fv(this.addr,t)}function Ng(n,e){let t=Ns(e,this.size,3);n.uniform3fv(this.addr,t)}function Fg(n,e){let t=Ns(e,this.size,4);n.uniform4fv(this.addr,t)}function Bg(n,e){let t=Ns(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Og(n,e){let t=Ns(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function zg(n,e){let t=Ns(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function kg(n,e){n.uniform1iv(this.addr,e)}function Vg(n,e){n.uniform2iv(this.addr,e)}function Gg(n,e){n.uniform3iv(this.addr,e)}function Hg(n,e){n.uniform4iv(this.addr,e)}function Wg(n,e){n.uniform1uiv(this.addr,e)}function Xg(n,e){n.uniform2uiv(this.addr,e)}function qg(n,e){n.uniform3uiv(this.addr,e)}function Yg(n,e){n.uniform4uiv(this.addr,e)}function $g(n,e,t){let i=this.cache,s=e.length,r=nl(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Wu,r[o])}function Zg(n,e,t){let i=this.cache,s=e.length,r=nl(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||qu,r[o])}function Jg(n,e,t){let i=this.cache,s=e.length,r=nl(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Yu,r[o])}function Kg(n,e,t){let i=this.cache,s=e.length,r=nl(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Xu,r[o])}function Qg(n){switch(n){case 5126:return Dg;case 35664:return Ug;case 35665:return Ng;case 35666:return Fg;case 35674:return Bg;case 35675:return Og;case 35676:return zg;case 5124:case 35670:return kg;case 35667:case 35671:return Vg;case 35668:case 35672:return Gg;case 35669:case 35673:return Hg;case 5125:return Wg;case 36294:return Xg;case 36295:return qg;case 36296:return Yg;case 35678:case 36198:case 36298:case 36306:case 35682:return $g;case 35679:case 36299:case 36307:return Zg;case 35680:case 36300:case 36308:case 36293:return Jg;case 36289:case 36303:case 36311:case 36292:return Kg}}var Pc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Lg(t.type)}},Lc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qg(t.type)}},Dc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],i)}}},Ic=/(\w+)(\])?(\[|\.)?/g;function Lu(n,e){n.seq.push(e),n.map[e.id]=e}function jg(n,e,t){let i=n.name,s=i.length;for(Ic.lastIndex=0;;){let r=Ic.exec(i),o=Ic.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Lu(t,c===void 0?new Pc(a,n,e):new Lc(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new Dc(a),Lu(t,u)),t=u}}}var Ds=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);jg(r,o,this)}}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};function Du(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var e0=37297,t0=0;function n0(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var Uu=new Ke;function i0(n){rt._getMatrix(Uu,rt.workingColorSpace,n);let e=`mat3( ${Uu.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(n)){case ir:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Nu(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+n0(n.getShaderSource(e),a)}else return r}function s0(n,e){let t=i0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function r0(n,e){let t;switch(e){case $h:t="Linear";break;case Zh:t="Reinhard";break;case Jh:t="Cineon";break;case ua:t="ACESFilmic";break;case Qh:t="AgX";break;case jh:t="Neutral";break;case Kh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var el=new I;function o0(){rt.getLuminanceCoefficients(el);let n=el.x.toFixed(4),e=el.y.toFixed(4),t=el.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function a0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gr).join(`
`)}function l0(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function c0(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Gr(n){return n!==""}function Fu(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var h0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uc(n){return n.replace(h0,d0)}var u0=new Map;function d0(n,e){let t=je[e];if(t===void 0){let i=u0.get(e);if(i!==void 0)t=je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Uc(t)}var f0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ou(n){return n.replace(f0,p0)}function p0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function m0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===rc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===na?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Bn&&(e="SHADOWMAP_TYPE_VSM"),e}function g0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ni:case Fi:e="ENVMAP_TYPE_CUBE";break;case Fr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Fi:e="ENVMAP_MODE_REFRACTION";break}return e}function x0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ha:e="ENVMAP_BLENDING_MULTIPLY";break;case qh:e="ENVMAP_BLENDING_MIX";break;case Yh:e="ENVMAP_BLENDING_ADD";break}return e}function v0(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function y0(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=m0(t),c=g0(t),h=_0(t),u=x0(t),d=v0(t),f=a0(t),g=l0(r),v=s.createProgram(),m,p,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gr).join(`
`),p.length>0&&(p+=`
`)):(m=[zu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gr).join(`
`),p=[zu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ei?"#define TONE_MAPPING":"",t.toneMapping!==ei?je.tonemapping_pars_fragment:"",t.toneMapping!==ei?r0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,s0("linearToOutputTexel",t.outputColorSpace),o0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gr).join(`
`)),o=Uc(o),o=Fu(o,t),o=Bu(o,t),a=Uc(a),a=Fu(a,t),a=Bu(a,t),o=Ou(o),a=Ou(a),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===xc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let T=C+m+o,y=C+p+a,A=Du(s,s.VERTEX_SHADER,T),R=Du(s,s.FRAGMENT_SHADER,y);s.attachShader(v,A),s.attachShader(v,R),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function L(P){if(n.debug.checkShaderErrors){let k=s.getProgramInfoLog(v)||"",G=s.getShaderInfoLog(A)||"",q=s.getShaderInfoLog(R)||"",$=k.trim(),Y=G.trim(),V=q.trim(),W=!0,fe=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,R);else{let ye=Nu(s,A,"vertex"),we=Nu(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+$+`
`+ye+`
`+we)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(Y===""||V==="")&&(fe=!1);fe&&(P.diagnostics={runnable:W,programLog:$,vertexShader:{log:Y,prefix:m},fragmentShader:{log:V,prefix:p}})}s.deleteShader(A),s.deleteShader(R),N=new Ds(s,v),S=c0(s,v)}let N;this.getUniforms=function(){return N===void 0&&L(this),N};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,e0)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=t0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=R,this}var M0=0,Nc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Fc(e),t.set(e,i)),i}},Fc=class{constructor(e){this.id=M0++,this.code=e,this.usedTimes=0}};function S0(n,e,t,i,s,r,o){let a=new ms,l=new Nc,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,M,P,k,G){let q=k.fog,$=G.geometry,Y=S.isMeshStandardMaterial?k.environment:null,V=(S.isMeshStandardMaterial?t:e).get(S.envMap||Y),W=V&&V.mapping===Fr?V.image.height:null,fe=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let ye=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,we=ye!==void 0?ye.length:0,le=0;$.morphAttributes.position!==void 0&&(le=1),$.morphAttributes.normal!==void 0&&(le=2),$.morphAttributes.color!==void 0&&(le=3);let Ie,ze,He,J;if(fe){let it=On[fe];Ie=it.vertexShader,ze=it.fragmentShader}else Ie=S.vertexShader,ze=S.fragmentShader,l.update(S),He=l.getVertexShaderID(S),J=l.getFragmentShaderID(S);let se=n.getRenderTarget(),Ae=n.state.buffers.depth.getReversed(),Oe=G.isInstancedMesh===!0,Le=G.isBatchedMesh===!0,et=!!S.map,lt=!!S.matcap,E=!!V,ie=!!S.aoMap,ne=!!S.lightMap,j=!!S.bumpMap,Q=!!S.normalMap,he=!!S.displacementMap,ae=!!S.emissiveMap,me=!!S.metalnessMap,Xe=!!S.roughnessMap,Ge=S.anisotropy>0,b=S.clearcoat>0,_=S.dispersion>0,B=S.iridescence>0,H=S.sheen>0,X=S.transmission>0,Z=Ge&&!!S.anisotropyMap,De=b&&!!S.clearcoatMap,ue=b&&!!S.clearcoatNormalMap,Pe=b&&!!S.clearcoatRoughnessMap,Re=B&&!!S.iridescenceMap,oe=B&&!!S.iridescenceThicknessMap,Te=H&&!!S.sheenColorMap,ke=H&&!!S.sheenRoughnessMap,Ue=!!S.specularMap,xe=!!S.specularColorMap,Ye=!!S.specularIntensityMap,D=X&&!!S.transmissionMap,ce=X&&!!S.thicknessMap,pe=!!S.gradientMap,Ee=!!S.alphaMap,re=S.alphaTest>0,te=!!S.alphaHash,Ce=!!S.extensions,qe=ei;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(qe=n.toneMapping);let ct={shaderID:fe,shaderType:S.type,shaderName:S.name,vertexShader:Ie,fragmentShader:ze,defines:S.defines,customVertexShaderID:He,customFragmentShaderID:J,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Le,batchingColor:Le&&G._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&G.instanceColor!==null,instancingMorph:Oe&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Ri,alphaToCoverage:!!S.alphaToCoverage,map:et,matcap:lt,envMap:E,envMapMode:E&&V.mapping,envMapCubeUVHeight:W,aoMap:ie,lightMap:ne,bumpMap:j,normalMap:Q,displacementMap:d&&he,emissiveMap:ae,normalMapObjectSpace:Q&&S.normalMapType===iu,normalMapTangentSpace:Q&&S.normalMapType===Ja,metalnessMap:me,roughnessMap:Xe,anisotropy:Ge,anisotropyMap:Z,clearcoat:b,clearcoatMap:De,clearcoatNormalMap:ue,clearcoatRoughnessMap:Pe,dispersion:_,iridescence:B,iridescenceMap:Re,iridescenceThicknessMap:oe,sheen:H,sheenColorMap:Te,sheenRoughnessMap:ke,specularMap:Ue,specularColorMap:xe,specularIntensityMap:Ye,transmission:X,transmissionMap:D,thicknessMap:ce,gradientMap:pe,opaque:S.transparent===!1&&S.blending===Ai&&S.alphaToCoverage===!1,alphaMap:Ee,alphaTest:re,alphaHash:te,combine:S.combine,mapUv:et&&v(S.map.channel),aoMapUv:ie&&v(S.aoMap.channel),lightMapUv:ne&&v(S.lightMap.channel),bumpMapUv:j&&v(S.bumpMap.channel),normalMapUv:Q&&v(S.normalMap.channel),displacementMapUv:he&&v(S.displacementMap.channel),emissiveMapUv:ae&&v(S.emissiveMap.channel),metalnessMapUv:me&&v(S.metalnessMap.channel),roughnessMapUv:Xe&&v(S.roughnessMap.channel),anisotropyMapUv:Z&&v(S.anisotropyMap.channel),clearcoatMapUv:De&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:ue&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:ke&&v(S.sheenRoughnessMap.channel),specularMapUv:Ue&&v(S.specularMap.channel),specularColorMapUv:xe&&v(S.specularColorMap.channel),specularIntensityMapUv:Ye&&v(S.specularIntensityMap.channel),transmissionMapUv:D&&v(S.transmissionMap.channel),thicknessMapUv:ce&&v(S.thicknessMap.channel),alphaMapUv:Ee&&v(S.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Q||Ge),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!$.attributes.uv&&(et||Ee),fog:!!q,useFog:S.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ae,skinning:G.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:le,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:qe,decodeVideoTexture:et&&S.map.isVideoTexture===!0&&rt.getTransfer(S.map.colorSpace)===dt,decodeVideoTextureEmissive:ae&&S.emissiveMap.isVideoTexture===!0&&rt.getTransfer(S.emissiveMap.colorSpace)===dt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===xn,flipSided:S.side===Dt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ce&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&S.extensions.multiDraw===!0||Le)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ct.vertexUv1s=c.has(1),ct.vertexUv2s=c.has(2),ct.vertexUv3s=c.has(3),c.clear(),ct}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(C(M,S),T(M,S),M.push(n.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function C(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function T(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){let M=g[S.type],P;if(M){let k=On[M];P=Ka.clone(k.uniforms)}else P=S.uniforms;return P}function A(S,M){let P;for(let k=0,G=h.length;k<G;k++){let q=h[k];if(q.cacheKey===M){P=q,++P.usedTimes;break}}return P===void 0&&(P=new y0(n,M,S,r),h.push(P)),P}function R(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function L(S){l.remove(S)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:A,releaseProgram:R,releaseShaderCache:L,programs:h,dispose:N}}function b0(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function T0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function ku(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Vu(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(u,d,f,g,v,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function a(u,d,f,g,v,m){let p=o(u,d,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,v,m){let p=o(u,d,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||T0),i.length>1&&i.sort(d||ku),s.length>1&&s.sort(d||ku)}function h(){for(let u=e,d=n.length;u<d;u++){let f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function w0(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new Vu,n.set(i,[o])):s>=r.length?(o=new Vu,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function E0(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new We};break;case"SpotLight":t={position:new I,direction:new I,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function A0(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var C0=0;function R0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function I0(n){let e=new E0,t=A0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);let s=new I,r=new ft,o=new ft;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,C=0,T=0,y=0,A=0,R=0,L=0;c.sort(R0);for(let S=0,M=c.length;S<M;S++){let P=c[S],k=P.color,G=P.intensity,q=P.distance,$=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=k.r*G,u+=k.g*G,d+=k.b*G;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(P.sh.coefficients[Y],G);L++}else if(P.isDirectionalLight){let Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let V=P.shadow,W=t.get(P);W.shadowIntensity=V.intensity,W.shadowBias=V.bias,W.shadowNormalBias=V.normalBias,W.shadowRadius=V.radius,W.shadowMapSize=V.mapSize,i.directionalShadow[f]=W,i.directionalShadowMap[f]=$,i.directionalShadowMatrix[f]=P.shadow.matrix,C++}i.directional[f]=Y,f++}else if(P.isSpotLight){let Y=e.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(k).multiplyScalar(G),Y.distance=q,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,i.spot[v]=Y;let V=P.shadow;if(P.map&&(i.spotLightMap[A]=P.map,A++,V.updateMatrices(P),P.castShadow&&R++),i.spotLightMatrix[v]=V.matrix,P.castShadow){let W=t.get(P);W.shadowIntensity=V.intensity,W.shadowBias=V.bias,W.shadowNormalBias=V.normalBias,W.shadowRadius=V.radius,W.shadowMapSize=V.mapSize,i.spotShadow[v]=W,i.spotShadowMap[v]=$,y++}v++}else if(P.isRectAreaLight){let Y=e.get(P);Y.color.copy(k).multiplyScalar(G),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=Y,m++}else if(P.isPointLight){let Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){let V=P.shadow,W=t.get(P);W.shadowIntensity=V.intensity,W.shadowBias=V.bias,W.shadowNormalBias=V.normalBias,W.shadowRadius=V.radius,W.shadowMapSize=V.mapSize,W.shadowCameraNear=V.camera.near,W.shadowCameraFar=V.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=P.shadow.matrix,T++}i.point[g]=Y,g++}else if(P.isHemisphereLight){let Y=e.get(P);Y.skyColor.copy(P.color).multiplyScalar(G),Y.groundColor.copy(P.groundColor).multiplyScalar(G),i.hemi[p]=Y,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let N=i.hash;(N.directionalLength!==f||N.pointLength!==g||N.spotLength!==v||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==C||N.numPointShadows!==T||N.numSpotShadows!==y||N.numSpotMaps!==A||N.numLightProbes!==L)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+A-R,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=L,N.directionalLength=f,N.pointLength=g,N.spotLength=v,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=C,N.numPointShadows=T,N.numSpotShadows=y,N.numSpotMaps=A,N.numLightProbes=L,i.version=C0++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0,m=h.matrixWorldInverse;for(let p=0,C=c.length;p<C;p++){let T=c[p];if(T.isDirectionalLight){let y=i.directional[u];y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(T.isSpotLight){let y=i.spot[f];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(T.isRectAreaLight){let y=i.rectArea[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){let y=i.point[d];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){let y=i.hemi[v];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function Gu(n){let e=new I0(n),t=[],i=[];function s(h){c.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function P0(n){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Gu(n),e.set(s,[a])):r>=o.length?(a=new Gu(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var L0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D0=`uniform sampler2D shadow_pass;
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
}`;function U0(n,e,t){let i=new ys,s=new de,r=new de,o=new ut,a=new Wo({depthPacking:nu}),l=new Xo,c={},h=t.maxTextureSize,u={[Zn]:Dt,[Dt]:Zn,[xn]:xn},d=new Zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:L0,fragmentShader:D0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Lt;g.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new mt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rc;let p=this.type;this.render=function(R,L,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let S=n.getRenderTarget(),M=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),k=n.state;k.setBlending(jn),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let G=p!==Bn&&this.type===Bn,q=p===Bn&&this.type!==Bn;for(let $=0,Y=R.length;$<Y;$++){let V=R[$],W=V.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let fe=W.getFrameExtents();if(s.multiply(fe),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/fe.x),s.x=r.x*fe.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/fe.y),s.y=r.y*fe.y,W.mapSize.y=r.y)),W.map===null||G===!0||q===!0){let we=this.type!==Bn?{minFilter:Qt,magFilter:Qt}:{};W.map!==null&&W.map.dispose(),W.map=new Dn(s.x,s.y,we),W.map.texture.name=V.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();let ye=W.getViewportCount();for(let we=0;we<ye;we++){let le=W.getViewport(we);o.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),k.viewport(o),W.updateMatrices(V,we),i=W.getFrustum(),y(L,N,W.camera,V,this.type)}W.isPointLightShadow!==!0&&this.type===Bn&&C(W,N),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(S,M,P)};function C(R,L){let N=e.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Dn(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(L,null,N,d,v,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(L,null,N,f,v,null)}function T(R,L,N,S){let M=null,P=N.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(P!==void 0)M=P;else if(M=N.isPointLight===!0?l:a,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let k=M.uuid,G=L.uuid,q=c[k];q===void 0&&(q={},c[k]=q);let $=q[G];$===void 0&&($=M.clone(),q[G]=$,L.addEventListener("dispose",A)),M=$}if(M.visible=L.visible,M.wireframe=L.wireframe,S===Bn?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:u[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let k=n.properties.get(M);k.light=N}return M}function y(R,L,N,S,M){if(R.visible===!1)return;if(R.layers.test(L.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===Bn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,R.matrixWorld);let G=e.update(R),q=R.material;if(Array.isArray(q)){let $=G.groups;for(let Y=0,V=$.length;Y<V;Y++){let W=$[Y],fe=q[W.materialIndex];if(fe&&fe.visible){let ye=T(R,fe,S,M);R.onBeforeShadow(n,R,L,N,G,ye,W),n.renderBufferDirect(N,null,G,ye,R,W),R.onAfterShadow(n,R,L,N,G,ye,W)}}}else if(q.visible){let $=T(R,q,S,M);R.onBeforeShadow(n,R,L,N,G,$,null),n.renderBufferDirect(N,null,G,$,R,null),R.onAfterShadow(n,R,L,N,G,$,null)}}let k=R.children;for(let G=0,q=k.length;G<q;G++)y(k[G],L,N,S,M)}function A(R){R.target.removeEventListener("dispose",A);for(let N in c){let S=c[N],M=R.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var N0={[ia]:sa,[ra]:la,[oa]:ca,[Ci]:aa,[sa]:ia,[la]:ra,[ca]:oa,[aa]:Ci};function F0(n,e){function t(){let D=!1,ce=new ut,pe=null,Ee=new ut(0,0,0,0);return{setMask:function(re){pe!==re&&!D&&(n.colorMask(re,re,re,re),pe=re)},setLocked:function(re){D=re},setClear:function(re,te,Ce,qe,ct){ct===!0&&(re*=qe,te*=qe,Ce*=qe),ce.set(re,te,Ce,qe),Ee.equals(ce)===!1&&(n.clearColor(re,te,Ce,qe),Ee.copy(ce))},reset:function(){D=!1,pe=null,Ee.set(-1,0,0,0)}}}function i(){let D=!1,ce=!1,pe=null,Ee=null,re=null;return{setReversed:function(te){if(ce!==te){let Ce=e.get("EXT_clip_control");te?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ce=te;let qe=re;re=null,this.setClear(qe)}},getReversed:function(){return ce},setTest:function(te){te?se(n.DEPTH_TEST):Ae(n.DEPTH_TEST)},setMask:function(te){pe!==te&&!D&&(n.depthMask(te),pe=te)},setFunc:function(te){if(ce&&(te=N0[te]),Ee!==te){switch(te){case ia:n.depthFunc(n.NEVER);break;case sa:n.depthFunc(n.ALWAYS);break;case ra:n.depthFunc(n.LESS);break;case Ci:n.depthFunc(n.LEQUAL);break;case oa:n.depthFunc(n.EQUAL);break;case aa:n.depthFunc(n.GEQUAL);break;case la:n.depthFunc(n.GREATER);break;case ca:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=te}},setLocked:function(te){D=te},setClear:function(te){re!==te&&(ce&&(te=1-te),n.clearDepth(te),re=te)},reset:function(){D=!1,pe=null,Ee=null,re=null,ce=!1}}}function s(){let D=!1,ce=null,pe=null,Ee=null,re=null,te=null,Ce=null,qe=null,ct=null;return{setTest:function(it){D||(it?se(n.STENCIL_TEST):Ae(n.STENCIL_TEST))},setMask:function(it){ce!==it&&!D&&(n.stencilMask(it),ce=it)},setFunc:function(it,fn,Jt){(pe!==it||Ee!==fn||re!==Jt)&&(n.stencilFunc(it,fn,Jt),pe=it,Ee=fn,re=Jt)},setOp:function(it,fn,Jt){(te!==it||Ce!==fn||qe!==Jt)&&(n.stencilOp(it,fn,Jt),te=it,Ce=fn,qe=Jt)},setLocked:function(it){D=it},setClear:function(it){ct!==it&&(n.clearStencil(it),ct=it)},reset:function(){D=!1,ce=null,pe=null,Ee=null,re=null,te=null,Ce=null,qe=null,ct=null}}}let r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,C=null,T=null,y=null,A=null,R=null,L=new We(0,0,0),N=0,S=!1,M=null,P=null,k=null,G=null,q=null,$=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,V=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=V>=1):W.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=V>=2);let fe=null,ye={},we=n.getParameter(n.SCISSOR_BOX),le=n.getParameter(n.VIEWPORT),Ie=new ut().fromArray(we),ze=new ut().fromArray(le);function He(D,ce,pe,Ee){let re=new Uint8Array(4),te=n.createTexture();n.bindTexture(D,te),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ce=0;Ce<pe;Ce++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(ce+Ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return te}let J={};J[n.TEXTURE_2D]=He(n.TEXTURE_2D,n.TEXTURE_2D,1),J[n.TEXTURE_CUBE_MAP]=He(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[n.TEXTURE_2D_ARRAY]=He(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),J[n.TEXTURE_3D]=He(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(n.DEPTH_TEST),o.setFunc(Ci),j(!1),Q(sc),se(n.CULL_FACE),ie(jn);function se(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function Ae(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Oe(D,ce){return u[D]!==ce?(n.bindFramebuffer(D,ce),u[D]=ce,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ce),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function Le(D,ce){let pe=f,Ee=!1;if(D){pe=d.get(ce),pe===void 0&&(pe=[],d.set(ce,pe));let re=D.textures;if(pe.length!==re.length||pe[0]!==n.COLOR_ATTACHMENT0){for(let te=0,Ce=re.length;te<Ce;te++)pe[te]=n.COLOR_ATTACHMENT0+te;pe.length=re.length,Ee=!0}}else pe[0]!==n.BACK&&(pe[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(pe)}function et(D){return g!==D?(n.useProgram(D),g=D,!0):!1}let lt={[ci]:n.FUNC_ADD,[Rh]:n.FUNC_SUBTRACT,[Ih]:n.FUNC_REVERSE_SUBTRACT};lt[Ph]=n.MIN,lt[Lh]=n.MAX;let E={[Dh]:n.ZERO,[Uh]:n.ONE,[Nh]:n.SRC_COLOR,[Ao]:n.SRC_ALPHA,[Vh]:n.SRC_ALPHA_SATURATE,[zh]:n.DST_COLOR,[Bh]:n.DST_ALPHA,[Fh]:n.ONE_MINUS_SRC_COLOR,[Co]:n.ONE_MINUS_SRC_ALPHA,[kh]:n.ONE_MINUS_DST_COLOR,[Oh]:n.ONE_MINUS_DST_ALPHA,[Gh]:n.CONSTANT_COLOR,[Hh]:n.ONE_MINUS_CONSTANT_COLOR,[Wh]:n.CONSTANT_ALPHA,[Xh]:n.ONE_MINUS_CONSTANT_ALPHA};function ie(D,ce,pe,Ee,re,te,Ce,qe,ct,it){if(D===jn){v===!0&&(Ae(n.BLEND),v=!1);return}if(v===!1&&(se(n.BLEND),v=!0),D!==Ch){if(D!==m||it!==S){if((p!==ci||y!==ci)&&(n.blendEquation(n.FUNC_ADD),p=ci,y=ci),it)switch(D){case Ai:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case oc:n.blendFunc(n.ONE,n.ONE);break;case ac:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case lc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ai:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case oc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ac:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}C=null,T=null,A=null,R=null,L.set(0,0,0),N=0,m=D,S=it}return}re=re||ce,te=te||pe,Ce=Ce||Ee,(ce!==p||re!==y)&&(n.blendEquationSeparate(lt[ce],lt[re]),p=ce,y=re),(pe!==C||Ee!==T||te!==A||Ce!==R)&&(n.blendFuncSeparate(E[pe],E[Ee],E[te],E[Ce]),C=pe,T=Ee,A=te,R=Ce),(qe.equals(L)===!1||ct!==N)&&(n.blendColor(qe.r,qe.g,qe.b,ct),L.copy(qe),N=ct),m=D,S=!1}function ne(D,ce){D.side===xn?Ae(n.CULL_FACE):se(n.CULL_FACE);let pe=D.side===Dt;ce&&(pe=!pe),j(pe),D.blending===Ai&&D.transparent===!1?ie(jn):ie(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let Ee=D.stencilWrite;a.setTest(Ee),Ee&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ae(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):Ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function j(D){M!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),M=D)}function Q(D){D!==Eh?(se(n.CULL_FACE),D!==P&&(D===sc?n.cullFace(n.BACK):D===Ah?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ae(n.CULL_FACE),P=D}function he(D){D!==k&&(Y&&n.lineWidth(D),k=D)}function ae(D,ce,pe){D?(se(n.POLYGON_OFFSET_FILL),(G!==ce||q!==pe)&&(n.polygonOffset(ce,pe),G=ce,q=pe)):Ae(n.POLYGON_OFFSET_FILL)}function me(D){D?se(n.SCISSOR_TEST):Ae(n.SCISSOR_TEST)}function Xe(D){D===void 0&&(D=n.TEXTURE0+$-1),fe!==D&&(n.activeTexture(D),fe=D)}function Ge(D,ce,pe){pe===void 0&&(fe===null?pe=n.TEXTURE0+$-1:pe=fe);let Ee=ye[pe];Ee===void 0&&(Ee={type:void 0,texture:void 0},ye[pe]=Ee),(Ee.type!==D||Ee.texture!==ce)&&(fe!==pe&&(n.activeTexture(pe),fe=pe),n.bindTexture(D,ce||J[D]),Ee.type=D,Ee.texture=ce)}function b(){let D=ye[fe];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function B(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function De(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ue(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function oe(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(D){Ie.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Ie.copy(D))}function ke(D){ze.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),ze.copy(D))}function Ue(D,ce){let pe=c.get(ce);pe===void 0&&(pe=new WeakMap,c.set(ce,pe));let Ee=pe.get(D);Ee===void 0&&(Ee=n.getUniformBlockIndex(ce,D.name),pe.set(D,Ee))}function xe(D,ce){let Ee=c.get(ce).get(D);l.get(ce)!==Ee&&(n.uniformBlockBinding(ce,Ee,D.__bindingPointIndex),l.set(ce,Ee))}function Ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},fe=null,ye={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,C=null,T=null,y=null,A=null,R=null,L=new We(0,0,0),N=0,S=!1,M=null,P=null,k=null,G=null,q=null,Ie.set(0,0,n.canvas.width,n.canvas.height),ze.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:se,disable:Ae,bindFramebuffer:Oe,drawBuffers:Le,useProgram:et,setBlending:ie,setMaterial:ne,setFlipSided:j,setCullFace:Q,setLineWidth:he,setPolygonOffset:ae,setScissorTest:me,activeTexture:Xe,bindTexture:Ge,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:B,texImage2D:Re,texImage3D:oe,updateUBOMapping:Ue,uniformBlockBinding:xe,texStorage2D:ue,texStorage3D:Pe,texSubImage2D:H,texSubImage3D:X,compressedTexSubImage2D:Z,compressedTexSubImage3D:De,scissor:Te,viewport:ke,reset:Ye}}function B0(n,e,t,i,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return f?new OffscreenCanvas(b,_):or("canvas")}function v(b,_,B){let H=1,X=Ge(b);if((X.width>B||X.height>B)&&(H=B/Math.max(X.width,X.height)),H<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let Z=Math.floor(H*X.width),De=Math.floor(H*X.height);u===void 0&&(u=g(Z,De));let ue=_?g(Z,De):u;return ue.width=Z,ue.height=De,ue.getContext("2d").drawImage(b,0,0,Z,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+Z+"x"+De+")."),ue}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){n.generateMipmap(b)}function C(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(b,_,B,H,X=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Z=_;if(_===n.RED&&(B===n.FLOAT&&(Z=n.R32F),B===n.HALF_FLOAT&&(Z=n.R16F),B===n.UNSIGNED_BYTE&&(Z=n.R8)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.R8UI),B===n.UNSIGNED_SHORT&&(Z=n.R16UI),B===n.UNSIGNED_INT&&(Z=n.R32UI),B===n.BYTE&&(Z=n.R8I),B===n.SHORT&&(Z=n.R16I),B===n.INT&&(Z=n.R32I)),_===n.RG&&(B===n.FLOAT&&(Z=n.RG32F),B===n.HALF_FLOAT&&(Z=n.RG16F),B===n.UNSIGNED_BYTE&&(Z=n.RG8)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RG8UI),B===n.UNSIGNED_SHORT&&(Z=n.RG16UI),B===n.UNSIGNED_INT&&(Z=n.RG32UI),B===n.BYTE&&(Z=n.RG8I),B===n.SHORT&&(Z=n.RG16I),B===n.INT&&(Z=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),B===n.UNSIGNED_INT&&(Z=n.RGB32UI),B===n.BYTE&&(Z=n.RGB8I),B===n.SHORT&&(Z=n.RGB16I),B===n.INT&&(Z=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),B===n.UNSIGNED_INT&&(Z=n.RGBA32UI),B===n.BYTE&&(Z=n.RGBA8I),B===n.SHORT&&(Z=n.RGBA16I),B===n.INT&&(Z=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),_===n.RGBA){let De=X?ir:rt.getTransfer(H);B===n.FLOAT&&(Z=n.RGBA32F),B===n.HALF_FLOAT&&(Z=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Z=De===dt?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(b,_){let B;return b?_===null||_===mi||_===Rs?B=n.DEPTH24_STENCIL8:_===Rn?B=n.DEPTH32F_STENCIL8:_===As&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===mi||_===Rs?B=n.DEPTH_COMPONENT24:_===Rn?B=n.DEPTH_COMPONENT32F:_===As&&(B=n.DEPTH_COMPONENT16),B}function A(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Qt&&b.minFilter!==En?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function R(b){let _=b.target;_.removeEventListener("dispose",R),N(_),_.isVideoTexture&&h.delete(_)}function L(b){let _=b.target;_.removeEventListener("dispose",L),M(_)}function N(b){let _=i.get(b);if(_.__webglInit===void 0)return;let B=b.source,H=d.get(B);if(H){let X=H[_.__cacheKey];X.usedTimes--,X.usedTimes===0&&S(b),Object.keys(H).length===0&&d.delete(B)}i.remove(b)}function S(b){let _=i.get(b);n.deleteTexture(_.__webglTexture);let B=b.source,H=d.get(B);delete H[_.__cacheKey],o.memory.textures--}function M(b){let _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let X=0;X<_.__webglFramebuffer[H].length;X++)n.deleteFramebuffer(_.__webglFramebuffer[H][X]);else n.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)n.deleteFramebuffer(_.__webglFramebuffer[H]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=b.textures;for(let H=0,X=B.length;H<X;H++){let Z=i.get(B[H]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(B[H])}i.remove(b)}let P=0;function k(){P=0}function G(){let b=P;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),P+=1,b}function q(b){let _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function $(b,_){let B=i.get(b);if(b.isVideoTexture&&me(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&B.__version!==b.version){let H=b.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(B,b,_);return}}else b.isExternalTexture&&(B.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function Y(b,_){let B=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){J(B,b,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function V(b,_){let B=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){J(B,b,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function W(b,_){let B=i.get(b);if(b.version>0&&B.__version!==b.version){se(B,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}let fe={[hs]:n.REPEAT,[li]:n.CLAMP_TO_EDGE,[Ro]:n.MIRRORED_REPEAT},ye={[Qt]:n.NEAREST,[eu]:n.NEAREST_MIPMAP_NEAREST,[Br]:n.NEAREST_MIPMAP_LINEAR,[En]:n.LINEAR,[pa]:n.LINEAR_MIPMAP_NEAREST,[pi]:n.LINEAR_MIPMAP_LINEAR},we={[su]:n.NEVER,[hu]:n.ALWAYS,[ru]:n.LESS,[_c]:n.LEQUAL,[ou]:n.EQUAL,[cu]:n.GEQUAL,[au]:n.GREATER,[lu]:n.NOTEQUAL};function le(b,_){if(_.type===Rn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===En||_.magFilter===pa||_.magFilter===Br||_.magFilter===pi||_.minFilter===En||_.minFilter===pa||_.minFilter===Br||_.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,fe[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,fe[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,fe[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ye[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ye[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,we[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Qt||_.minFilter!==Br&&_.minFilter!==pi||_.type===Rn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ie(b,_){let B=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",R));let H=_.source,X=d.get(H);X===void 0&&(X={},d.set(H,X));let Z=q(_);if(Z!==b.__cacheKey){X[Z]===void 0&&(X[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),X[Z].usedTimes++;let De=X[b.__cacheKey];De!==void 0&&(X[b.__cacheKey].usedTimes--,De.usedTimes===0&&S(_)),b.__cacheKey=Z,b.__webglTexture=X[Z].texture}return B}function ze(b,_,B){return Math.floor(Math.floor(b/B)/_)}function He(b,_,B,H){let Z=b.updateRanges;if(Z.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,H,_.data);else{Z.sort((oe,Te)=>oe.start-Te.start);let De=0;for(let oe=1;oe<Z.length;oe++){let Te=Z[De],ke=Z[oe],Ue=Te.start+Te.count,xe=ze(ke.start,_.width,4),Ye=ze(Te.start,_.width,4);ke.start<=Ue+1&&xe===Ye&&ze(ke.start+ke.count-1,_.width,4)===xe?Te.count=Math.max(Te.count,ke.start+ke.count-Te.start):(++De,Z[De]=ke)}Z.length=De+1;let ue=n.getParameter(n.UNPACK_ROW_LENGTH),Pe=n.getParameter(n.UNPACK_SKIP_PIXELS),Re=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let oe=0,Te=Z.length;oe<Te;oe++){let ke=Z[oe],Ue=Math.floor(ke.start/4),xe=Math.ceil(ke.count/4),Ye=Ue%_.width,D=Math.floor(Ue/_.width),ce=xe,pe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ye),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,Ye,D,ce,pe,B,H,_.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ue),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Pe),n.pixelStorei(n.UNPACK_SKIP_ROWS,Re)}}function J(b,_,B){let H=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=n.TEXTURE_3D);let X=Ie(b,_),Z=_.source;t.bindTexture(H,b.__webglTexture,n.TEXTURE0+B);let De=i.get(Z);if(Z.version!==De.__version||X===!0){t.activeTexture(n.TEXTURE0+B);let ue=rt.getPrimaries(rt.workingColorSpace),Pe=_.colorSpace===ti?null:rt.getPrimaries(_.colorSpace),Re=_.colorSpace===ti||ue===Pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let oe=v(_.image,!1,s.maxTextureSize);oe=Xe(_,oe);let Te=r.convert(_.format,_.colorSpace),ke=r.convert(_.type),Ue=T(_.internalFormat,Te,ke,_.colorSpace,_.isVideoTexture);le(H,_);let xe,Ye=_.mipmaps,D=_.isVideoTexture!==!0,ce=De.__version===void 0||X===!0,pe=Z.dataReady,Ee=A(_,oe);if(_.isDepthTexture)Ue=y(_.format===Is,_.type),ce&&(D?t.texStorage2D(n.TEXTURE_2D,1,Ue,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,Ue,oe.width,oe.height,0,Te,ke,null));else if(_.isDataTexture)if(Ye.length>0){D&&ce&&t.texStorage2D(n.TEXTURE_2D,Ee,Ue,Ye[0].width,Ye[0].height);for(let re=0,te=Ye.length;re<te;re++)xe=Ye[re],D?pe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,xe.width,xe.height,Te,ke,xe.data):t.texImage2D(n.TEXTURE_2D,re,Ue,xe.width,xe.height,0,Te,ke,xe.data);_.generateMipmaps=!1}else D?(ce&&t.texStorage2D(n.TEXTURE_2D,Ee,Ue,oe.width,oe.height),pe&&He(_,oe,Te,ke)):t.texImage2D(n.TEXTURE_2D,0,Ue,oe.width,oe.height,0,Te,ke,oe.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Ue,Ye[0].width,Ye[0].height,oe.depth);for(let re=0,te=Ye.length;re<te;re++)if(xe=Ye[re],_.format!==vn)if(Te!==null)if(D){if(pe)if(_.layerUpdates.size>0){let Ce=Tc(xe.width,xe.height,_.format,_.type);for(let qe of _.layerUpdates){let ct=xe.data.subarray(qe*Ce/xe.data.BYTES_PER_ELEMENT,(qe+1)*Ce/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,qe,xe.width,xe.height,1,Te,ct)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,xe.width,xe.height,oe.depth,Te,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ue,xe.width,xe.height,oe.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?pe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,xe.width,xe.height,oe.depth,Te,ke,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ue,xe.width,xe.height,oe.depth,0,Te,ke,xe.data)}else{D&&ce&&t.texStorage2D(n.TEXTURE_2D,Ee,Ue,Ye[0].width,Ye[0].height);for(let re=0,te=Ye.length;re<te;re++)xe=Ye[re],_.format!==vn?Te!==null?D?pe&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,xe.width,xe.height,Te,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ue,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?pe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,xe.width,xe.height,Te,ke,xe.data):t.texImage2D(n.TEXTURE_2D,re,Ue,xe.width,xe.height,0,Te,ke,xe.data)}else if(_.isDataArrayTexture)if(D){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Ue,oe.width,oe.height,oe.depth),pe)if(_.layerUpdates.size>0){let re=Tc(oe.width,oe.height,_.format,_.type);for(let te of _.layerUpdates){let Ce=oe.data.subarray(te*re/oe.data.BYTES_PER_ELEMENT,(te+1)*re/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,te,oe.width,oe.height,1,Te,ke,Ce)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,Te,ke,oe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,oe.width,oe.height,oe.depth,0,Te,ke,oe.data);else if(_.isData3DTexture)D?(ce&&t.texStorage3D(n.TEXTURE_3D,Ee,Ue,oe.width,oe.height,oe.depth),pe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,Te,ke,oe.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,oe.width,oe.height,oe.depth,0,Te,ke,oe.data);else if(_.isFramebufferTexture){if(ce)if(D)t.texStorage2D(n.TEXTURE_2D,Ee,Ue,oe.width,oe.height);else{let re=oe.width,te=oe.height;for(let Ce=0;Ce<Ee;Ce++)t.texImage2D(n.TEXTURE_2D,Ce,Ue,re,te,0,Te,ke,null),re>>=1,te>>=1}}else if(Ye.length>0){if(D&&ce){let re=Ge(Ye[0]);t.texStorage2D(n.TEXTURE_2D,Ee,Ue,re.width,re.height)}for(let re=0,te=Ye.length;re<te;re++)xe=Ye[re],D?pe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,Te,ke,xe):t.texImage2D(n.TEXTURE_2D,re,Ue,Te,ke,xe);_.generateMipmaps=!1}else if(D){if(ce){let re=Ge(oe);t.texStorage2D(n.TEXTURE_2D,Ee,Ue,re.width,re.height)}pe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Te,ke,oe)}else t.texImage2D(n.TEXTURE_2D,0,Ue,Te,ke,oe);m(_)&&p(H),De.__version=Z.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function se(b,_,B){if(_.image.length!==6)return;let H=Ie(b,_),X=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+B);let Z=i.get(X);if(X.version!==Z.__version||H===!0){t.activeTexture(n.TEXTURE0+B);let De=rt.getPrimaries(rt.workingColorSpace),ue=_.colorSpace===ti?null:rt.getPrimaries(_.colorSpace),Pe=_.colorSpace===ti||De===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let Re=_.isCompressedTexture||_.image[0].isCompressedTexture,oe=_.image[0]&&_.image[0].isDataTexture,Te=[];for(let te=0;te<6;te++)!Re&&!oe?Te[te]=v(_.image[te],!0,s.maxCubemapSize):Te[te]=oe?_.image[te].image:_.image[te],Te[te]=Xe(_,Te[te]);let ke=Te[0],Ue=r.convert(_.format,_.colorSpace),xe=r.convert(_.type),Ye=T(_.internalFormat,Ue,xe,_.colorSpace),D=_.isVideoTexture!==!0,ce=Z.__version===void 0||H===!0,pe=X.dataReady,Ee=A(_,ke);le(n.TEXTURE_CUBE_MAP,_);let re;if(Re){D&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Ye,ke.width,ke.height);for(let te=0;te<6;te++){re=Te[te].mipmaps;for(let Ce=0;Ce<re.length;Ce++){let qe=re[Ce];_.format!==vn?Ue!==null?D?pe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,qe.width,qe.height,Ue,qe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Ye,qe.width,qe.height,0,qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,qe.width,qe.height,Ue,xe,qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Ye,qe.width,qe.height,0,Ue,xe,qe.data)}}}else{if(re=_.mipmaps,D&&ce){re.length>0&&Ee++;let te=Ge(Te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Ye,te.width,te.height)}for(let te=0;te<6;te++)if(oe){D?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Te[te].width,Te[te].height,Ue,xe,Te[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ye,Te[te].width,Te[te].height,0,Ue,xe,Te[te].data);for(let Ce=0;Ce<re.length;Ce++){let ct=re[Ce].image[te].image;D?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,ct.width,ct.height,Ue,xe,ct.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Ye,ct.width,ct.height,0,Ue,xe,ct.data)}}else{D?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ue,xe,Te[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ye,Ue,xe,Te[te]);for(let Ce=0;Ce<re.length;Ce++){let qe=re[Ce];D?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,Ue,xe,qe.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Ye,Ue,xe,qe.image[te])}}}m(_)&&p(n.TEXTURE_CUBE_MAP),Z.__version=X.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Ae(b,_,B,H,X,Z){let De=r.convert(B.format,B.colorSpace),ue=r.convert(B.type),Pe=T(B.internalFormat,De,ue,B.colorSpace),Re=i.get(_),oe=i.get(B);if(oe.__renderTarget=_,!Re.__hasExternalTextures){let Te=Math.max(1,_.width>>Z),ke=Math.max(1,_.height>>Z);X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?t.texImage3D(X,Z,Pe,Te,ke,_.depth,0,De,ue,null):t.texImage2D(X,Z,Pe,Te,ke,0,De,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ae(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,X,oe.__webglTexture,0,he(_)):(X===n.TEXTURE_2D||X>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,X,oe.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(b,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){let H=_.depthTexture,X=H&&H.isDepthTexture?H.type:null,Z=y(_.stencilBuffer,X),De=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=he(_);ae(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,Z,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,De,n.RENDERBUFFER,b)}else{let H=_.textures;for(let X=0;X<H.length;X++){let Z=H[X],De=r.convert(Z.format,Z.colorSpace),ue=r.convert(Z.type),Pe=T(Z.internalFormat,De,ue,Z.colorSpace),Re=he(_);B&&ae(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,Pe,_.width,_.height):ae(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,Pe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Pe,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Le(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let H=i.get(_.depthTexture);H.__renderTarget=_,(!H.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$(_.depthTexture,0);let X=H.__webglTexture,Z=he(_);if(_.depthTexture.format===us)ae(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,X,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,X,0);else if(_.depthTexture.format===Is)ae(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,X,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function et(b){let _=i.get(b),B=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){let H=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){let X=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",X)};H.addEventListener("dispose",X),_.__depthDisposeCallback=X}_.__boundDepthTexture=H}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let H=b.texture.mipmaps;H&&H.length>0?Le(_.__webglFramebuffer[0],b):Le(_.__webglFramebuffer,b)}else if(B){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=n.createRenderbuffer(),Oe(_.__webglDepthbuffer[H],b,!1);else{let X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,Z)}}else{let H=b.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Oe(_.__webglDepthbuffer,b,!1);else{let X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,Z)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(b,_,B){let H=i.get(b);_!==void 0&&Ae(H.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&et(b)}function E(b){let _=b.texture,B=i.get(b),H=i.get(_);b.addEventListener("dispose",L);let X=b.textures,Z=b.isWebGLCubeRenderTarget===!0,De=X.length>1;if(De||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=_.version,o.memory.textures++),Z){B.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[ue]=[];for(let Pe=0;Pe<_.mipmaps.length;Pe++)B.__webglFramebuffer[ue][Pe]=n.createFramebuffer()}else B.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let ue=0;ue<_.mipmaps.length;ue++)B.__webglFramebuffer[ue]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(De)for(let ue=0,Pe=X.length;ue<Pe;ue++){let Re=i.get(X[ue]);Re.__webglTexture===void 0&&(Re.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&ae(b)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ue=0;ue<X.length;ue++){let Pe=X[ue];B.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[ue]);let Re=r.convert(Pe.format,Pe.colorSpace),oe=r.convert(Pe.type),Te=T(Pe.internalFormat,Re,oe,Pe.colorSpace,b.isXRRenderTarget===!0),ke=he(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,Te,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,B.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Oe(B.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),le(n.TEXTURE_CUBE_MAP,_);for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pe=0;Pe<_.mipmaps.length;Pe++)Ae(B.__webglFramebuffer[ue][Pe],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Pe);else Ae(B.__webglFramebuffer[ue],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(_)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let ue=0,Pe=X.length;ue<Pe;ue++){let Re=X[ue],oe=i.get(Re),Te=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Te=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Te,oe.__webglTexture),le(Te,Re),Ae(B.__webglFramebuffer,b,Re,n.COLOR_ATTACHMENT0+ue,Te,0),m(Re)&&p(Te)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ue=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,H.__webglTexture),le(ue,_),_.mipmaps&&_.mipmaps.length>0)for(let Pe=0;Pe<_.mipmaps.length;Pe++)Ae(B.__webglFramebuffer[Pe],b,_,n.COLOR_ATTACHMENT0,ue,Pe);else Ae(B.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,ue,0);m(_)&&p(ue),t.unbindTexture()}b.depthBuffer&&et(b)}function ie(b){let _=b.textures;for(let B=0,H=_.length;B<H;B++){let X=_[B];if(m(X)){let Z=C(b),De=i.get(X).__webglTexture;t.bindTexture(Z,De),p(Z),t.unbindTexture()}}}let ne=[],j=[];function Q(b){if(b.samples>0){if(ae(b)===!1){let _=b.textures,B=b.width,H=b.height,X=n.COLOR_BUFFER_BIT,Z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,De=i.get(b),ue=_.length>1;if(ue)for(let Re=0;Re<_.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,De.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);let Pe=b.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Re=0;Re<_.length;Re++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(X|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(X|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,De.__webglColorRenderbuffer[Re]);let oe=i.get(_[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,B,H,0,0,B,H,X,n.NEAREST),l===!0&&(ne.length=0,j.length=0,ne.push(n.COLOR_ATTACHMENT0+Re),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ne.push(Z),j.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,j)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let Re=0;Re<_.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,De.__webglColorRenderbuffer[Re]);let oe=i.get(_[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,De.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){let _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function he(b){return Math.min(s.maxSamples,b.samples)}function ae(b){let _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function me(b){let _=o.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function Xe(b,_){let B=b.colorSpace,H=b.format,X=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||B!==Ri&&B!==ti&&(rt.getTransfer(B)===dt?(H!==vn||X!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),_}function Ge(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=k,this.setTexture2D=$,this.setTexture2DArray=Y,this.setTexture3D=V,this.setTextureCube=W,this.rebindTextures=lt,this.setupRenderTarget=E,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=ae}function O0(n,e){function t(i,s=ti){let r,o=rt.getTransfer(s);if(i===Cn)return n.UNSIGNED_BYTE;if(i===ga)return n.UNSIGNED_SHORT_4_4_4_4;if(i===_a)return n.UNSIGNED_SHORT_5_5_5_1;if(i===dc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===fc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===hc)return n.BYTE;if(i===uc)return n.SHORT;if(i===As)return n.UNSIGNED_SHORT;if(i===ma)return n.INT;if(i===mi)return n.UNSIGNED_INT;if(i===Rn)return n.FLOAT;if(i===Cs)return n.HALF_FLOAT;if(i===pc)return n.ALPHA;if(i===mc)return n.RGB;if(i===vn)return n.RGBA;if(i===us)return n.DEPTH_COMPONENT;if(i===Is)return n.DEPTH_STENCIL;if(i===xa)return n.RED;if(i===va)return n.RED_INTEGER;if(i===gc)return n.RG;if(i===ya)return n.RG_INTEGER;if(i===Ma)return n.RGBA_INTEGER;if(i===Or||i===zr||i===kr||i===Vr)if(o===dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Sa||i===ba||i===Ta||i===wa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ea||i===Aa||i===Ca)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ea||i===Aa)return o===dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ca)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ra||i===Ia||i===Pa||i===La||i===Da||i===Ua||i===Na||i===Fa||i===Ba||i===Oa||i===za||i===ka||i===Va||i===Ga)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ra)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ia)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pa)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===La)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Da)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ua)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Na)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Fa)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ba)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oa)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===za)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ka)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Va)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ga)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ha||i===Wa||i===Xa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ha)return o===dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Wa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Xa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===qa||i===Ya||i===$a||i===Za)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===qa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ya)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Rs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var z0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,k0=`
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

}`,Bc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new _r(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Zt({vertexShader:z0,fragmentShader:k0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new mt(new Qn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Oc=class extends Jn{constructor(e,t){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,v=typeof XRWebGLBinding<"u",m=new Bc,p={},C=t.getContextAttributes(),T=null,y=null,A=[],R=[],L=new de,N=null,S=new zt;S.viewport=new ut;let M=new zt;M.viewport=new ut;let P=[S,M],k=new ta,G=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let se=A[J];return se===void 0&&(se=new gs,A[J]=se),se.getTargetRaySpace()},this.getControllerGrip=function(J){let se=A[J];return se===void 0&&(se=new gs,A[J]=se),se.getGripSpace()},this.getHand=function(J){let se=A[J];return se===void 0&&(se=new gs,A[J]=se),se.getHandSpace()};function $(J){let se=R.indexOf(J.inputSource);if(se===-1)return;let Ae=A[se];Ae!==void 0&&(Ae.update(J.inputSource,J.frame,c||o),Ae.dispatchEvent({type:J.type,data:J.inputSource}))}function Y(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",V);for(let J=0;J<A.length;J++){let se=R[J];se!==null&&(R[J]=null,A[J].disconnect(se))}G=null,q=null,m.reset();for(let J in p)delete p[J];e.setRenderTarget(T),f=null,d=null,u=null,s=null,y=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(N),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",V),C.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ae=null,Oe=null,Le=null;C.depth&&(Le=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ae=C.stencil?Is:us,Oe=C.stencil?Rs:mi);let et={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(et),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Dn(d.textureWidth,d.textureHeight,{format:vn,type:Cn,depthTexture:new gr(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,Ae),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Ae={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Ae),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Dn(f.framebufferWidth,f.framebufferHeight,{format:vn,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),He.setContext(s),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(J){for(let se=0;se<J.removed.length;se++){let Ae=J.removed[se],Oe=R.indexOf(Ae);Oe>=0&&(R[Oe]=null,A[Oe].disconnect(Ae))}for(let se=0;se<J.added.length;se++){let Ae=J.added[se],Oe=R.indexOf(Ae);if(Oe===-1){for(let et=0;et<A.length;et++)if(et>=R.length){R.push(Ae),Oe=et;break}else if(R[et]===null){R[et]=Ae,Oe=et;break}if(Oe===-1)break}let Le=A[Oe];Le&&Le.connect(Ae)}}let W=new I,fe=new I;function ye(J,se,Ae){W.setFromMatrixPosition(se.matrixWorld),fe.setFromMatrixPosition(Ae.matrixWorld);let Oe=W.distanceTo(fe),Le=se.projectionMatrix.elements,et=Ae.projectionMatrix.elements,lt=Le[14]/(Le[10]-1),E=Le[14]/(Le[10]+1),ie=(Le[9]+1)/Le[5],ne=(Le[9]-1)/Le[5],j=(Le[8]-1)/Le[0],Q=(et[8]+1)/et[0],he=lt*j,ae=lt*Q,me=Oe/(-j+Q),Xe=me*-j;if(se.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Xe),J.translateZ(me),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Le[10]===-1)J.projectionMatrix.copy(se.projectionMatrix),J.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{let Ge=lt+me,b=E+me,_=he-Xe,B=ae+(Oe-Xe),H=ie*E/b*Ge,X=ne*E/b*Ge;J.projectionMatrix.makePerspective(_,B,H,X,Ge,b),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function we(J,se){se===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(se.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let se=J.near,Ae=J.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(Ae=m.depthFar)),k.near=M.near=S.near=se,k.far=M.far=S.far=Ae,(G!==k.near||q!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),G=k.near,q=k.far),k.layers.mask=J.layers.mask|6,S.layers.mask=k.layers.mask&3,M.layers.mask=k.layers.mask&5;let Oe=J.parent,Le=k.cameras;we(k,Oe);for(let et=0;et<Le.length;et++)we(Le[et],Oe);Le.length===2?ye(k,S,M):k.projectionMatrix.copy(S.projectionMatrix),le(J,k,Oe)};function le(J,se,Ae){Ae===null?J.matrix.copy(se.matrixWorld):(J.matrix.copy(Ae.matrixWorld),J.matrix.invert(),J.matrix.multiply(se.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(se.projectionMatrix),J.projectionMatrixInverse.copy(se.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=rr*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(J){return p[J]};let Ie=null;function ze(J,se){if(h=se.getViewerPose(c||o),g=se,h!==null){let Ae=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Oe=!1;Ae.length!==k.cameras.length&&(k.cameras.length=0,Oe=!0);for(let E=0;E<Ae.length;E++){let ie=Ae[E],ne=null;if(f!==null)ne=f.getViewport(ie);else{let Q=u.getViewSubImage(d,ie);ne=Q.viewport,E===0&&(e.setRenderTargetTextures(y,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(y))}let j=P[E];j===void 0&&(j=new zt,j.layers.enable(E),j.viewport=new ut,P[E]=j),j.matrix.fromArray(ie.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(ie.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(ne.x,ne.y,ne.width,ne.height),E===0&&(k.matrix.copy(j.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Oe===!0&&k.cameras.push(j)}let Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=i.getBinding();let E=u.getDepthInformation(Ae[0]);E&&E.isValid&&E.texture&&m.init(E,s.renderState)}if(Le&&Le.includes("camera-access")&&v){e.state.unbindTexture(),u=i.getBinding();for(let E=0;E<Ae.length;E++){let ie=Ae[E].camera;if(ie){let ne=p[ie];ne||(ne=new _r,p[ie]=ne);let j=u.getCameraImage(ie);ne.sourceTexture=j}}}}for(let Ae=0;Ae<A.length;Ae++){let Oe=R[Ae],Le=A[Ae];Oe!==null&&Le!==void 0&&Le.update(Oe,se,c||o)}Ie&&Ie(J,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}let He=new Hu;He.setAnimationLoop(ze),this.setAnimationLoop=function(J){Ie=J},this.dispose=function(){}}},zi=new jt,V0=new ft;function G0(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,yc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,C,T,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,C,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Dt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Dt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let C=e.get(p),T=C.envMap,y=C.envMapRotation;T&&(m.envMap.value=T,zi.copy(y),zi.x*=-1,zi.y*=-1,zi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),m.envMapRotation.value.setFromMatrix4(V0.makeRotationFromEuler(zi)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,C,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*C,m.scale.value=T*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,C){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=C.texture,m.transmissionSamplerSize.value.set(C.width,C.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let C=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(C.matrixWorld),m.nearDistance.value=C.shadow.camera.near,m.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function H0(n,e,t,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(C,T){let y=T.program;i.uniformBlockBinding(C,y)}function c(C,T){let y=s[C.id];y===void 0&&(g(C),y=h(C),s[C.id]=y,C.addEventListener("dispose",m));let A=T.program;i.updateUBOMapping(C,A);let R=e.render.frame;r[C.id]!==R&&(d(C),r[C.id]=R)}function h(C){let T=u();C.__bindingPointIndex=T;let y=n.createBuffer(),A=C.__size,R=C.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,A,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,y),y}function u(){for(let C=0;C<a;C++)if(o.indexOf(C)===-1)return o.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(C){let T=s[C.id],y=C.uniforms,A=C.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let R=0,L=y.length;R<L;R++){let N=Array.isArray(y[R])?y[R]:[y[R]];for(let S=0,M=N.length;S<M;S++){let P=N[S];if(f(P,R,S,A)===!0){let k=P.__offset,G=Array.isArray(P.value)?P.value:[P.value],q=0;for(let $=0;$<G.length;$++){let Y=G[$],V=v(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,k+q,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,q),q+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(C,T,y,A){let R=C.value,L=T+"_"+y;if(A[L]===void 0)return typeof R=="number"||typeof R=="boolean"?A[L]=R:A[L]=R.clone(),!0;{let N=A[L];if(typeof R=="number"||typeof R=="boolean"){if(N!==R)return A[L]=R,!0}else if(N.equals(R)===!1)return N.copy(R),!0}return!1}function g(C){let T=C.uniforms,y=0,A=16;for(let L=0,N=T.length;L<N;L++){let S=Array.isArray(T[L])?T[L]:[T[L]];for(let M=0,P=S.length;M<P;M++){let k=S[M],G=Array.isArray(k.value)?k.value:[k.value];for(let q=0,$=G.length;q<$;q++){let Y=G[q],V=v(Y),W=y%A,fe=W%V.boundary,ye=W+fe;y+=fe,ye!==0&&A-ye<V.storage&&(y+=A-ye),k.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=V.storage}}}let R=y%A;return R>0&&(y+=A-R),C.__size=y,C.__cache={},this}function v(C){let T={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(T.boundary=4,T.storage=4):C.isVector2?(T.boundary=8,T.storage=8):C.isVector3||C.isColor?(T.boundary=16,T.storage=12):C.isVector4?(T.boundary=16,T.storage=16):C.isMatrix3?(T.boundary=48,T.storage=48):C.isMatrix4?(T.boundary=64,T.storage=64):C.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",C),T}function m(C){let T=C.target;T.removeEventListener("dispose",m);let y=o.indexOf(T.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function p(){for(let C in s)n.deleteBuffer(s[C]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var tl=class{constructor(e={}){let{canvas:t=uu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),v=new Int32Array(4),m=null,p=null,C=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,A=!1;this._outputColorSpace=Wt;let R=0,L=0,N=null,S=-1,M=null,P=new ut,k=new ut,G=null,q=new We(0),$=0,Y=t.width,V=t.height,W=1,fe=null,ye=null,we=new ut(0,0,Y,V),le=new ut(0,0,Y,V),Ie=!1,ze=new ys,He=!1,J=!1,se=new ft,Ae=new I,Oe=new ut,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function lt(){return N===null?W:1}let E=i;function ie(x,w){return t.getContext(x,w)}try{let x={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",re,!1),E===null){let w="webgl2";if(E=ie(w,x),E===null)throw ie(w)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let ne,j,Q,he,ae,me,Xe,Ge,b,_,B,H,X,Z,De,ue,Pe,Re,oe,Te,ke,Ue,xe,Ye;function D(){ne=new ag(E),ne.init(),Ue=new O0(E,ne),j=new eg(E,ne,e,Ue),Q=new F0(E,ne),j.reversedDepthBuffer&&d&&Q.buffers.depth.setReversed(!0),he=new hg(E),ae=new b0,me=new B0(E,ne,Q,ae,j,Ue,he),Xe=new ng(y),Ge=new og(y),b=new gf(E),xe=new Qm(E,b),_=new lg(E,b,he,xe),B=new dg(E,_,b,he),oe=new ug(E,j,me),ue=new tg(ae),H=new S0(y,Xe,Ge,ne,j,xe,ue),X=new G0(y,ae),Z=new w0,De=new P0(ne),Re=new Km(y,Xe,Ge,Q,B,f,l),Pe=new U0(y,B,j),Ye=new H0(E,he,j,Q),Te=new jm(E,ne,he),ke=new cg(E,ne,he),he.programs=H.programs,y.capabilities=j,y.extensions=ne,y.properties=ae,y.renderLists=Z,y.shadowMap=Pe,y.state=Q,y.info=he}D();let ce=new Oc(y,E);this.xr=ce,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){let x=ne.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=ne.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(x){x!==void 0&&(W=x,this.setSize(Y,V,!1))},this.getSize=function(x){return x.set(Y,V)},this.setSize=function(x,w,O=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=x,V=w,t.width=Math.floor(x*W),t.height=Math.floor(w*W),O===!0&&(t.style.width=x+"px",t.style.height=w+"px"),this.setViewport(0,0,x,w)},this.getDrawingBufferSize=function(x){return x.set(Y*W,V*W).floor()},this.setDrawingBufferSize=function(x,w,O){Y=x,V=w,W=O,t.width=Math.floor(x*O),t.height=Math.floor(w*O),this.setViewport(0,0,x,w)},this.getCurrentViewport=function(x){return x.copy(P)},this.getViewport=function(x){return x.copy(we)},this.setViewport=function(x,w,O,z){x.isVector4?we.set(x.x,x.y,x.z,x.w):we.set(x,w,O,z),Q.viewport(P.copy(we).multiplyScalar(W).round())},this.getScissor=function(x){return x.copy(le)},this.setScissor=function(x,w,O,z){x.isVector4?le.set(x.x,x.y,x.z,x.w):le.set(x,w,O,z),Q.scissor(k.copy(le).multiplyScalar(W).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(x){Q.setScissorTest(Ie=x)},this.setOpaqueSort=function(x){fe=x},this.setTransparentSort=function(x){ye=x},this.getClearColor=function(x){return x.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(x=!0,w=!0,O=!0){let z=0;if(x){let U=!1;if(N!==null){let K=N.texture.format;U=K===Ma||K===ya||K===va}if(U){let K=N.texture.type,ge=K===Cn||K===mi||K===As||K===Rs||K===ga||K===_a,_e=Re.getClearColor(),Me=Re.getClearAlpha(),Fe=_e.r,Be=_e.g,Ne=_e.b;ge?(g[0]=Fe,g[1]=Be,g[2]=Ne,g[3]=Me,E.clearBufferuiv(E.COLOR,0,g)):(v[0]=Fe,v[1]=Be,v[2]=Ne,v[3]=Me,E.clearBufferiv(E.COLOR,0,v))}else z|=E.COLOR_BUFFER_BIT}w&&(z|=E.DEPTH_BUFFER_BIT),O&&(z|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Re.dispose(),Z.dispose(),De.dispose(),ae.dispose(),Xe.dispose(),Ge.dispose(),B.dispose(),xe.dispose(),Ye.dispose(),H.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",Jt),ce.removeEventListener("sessionend",ks),zn.stop()};function pe(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let x=he.autoReset,w=Pe.enabled,O=Pe.autoUpdate,z=Pe.needsUpdate,U=Pe.type;D(),he.autoReset=x,Pe.enabled=w,Pe.autoUpdate=O,Pe.needsUpdate=z,Pe.type=U}function re(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function te(x){let w=x.target;w.removeEventListener("dispose",te),Ce(w)}function Ce(x){qe(x),ae.remove(x)}function qe(x){let w=ae.get(x).programs;w!==void 0&&(w.forEach(function(O){H.releaseProgram(O)}),x.isShaderMaterial&&H.releaseShaderCache(x))}this.renderBufferDirect=function(x,w,O,z,U,K){w===null&&(w=Le);let ge=U.isMesh&&U.matrixWorld.determinant()<0,_e=$e(x,w,O,z,U);Q.setMaterial(z,ge);let Me=O.index,Fe=1;if(z.wireframe===!0){if(Me=_.getWireframeAttribute(O),Me===void 0)return;Fe=2}let Be=O.drawRange,Ne=O.attributes.position,Ze=Be.start*Fe,ht=(Be.start+Be.count)*Fe;K!==null&&(Ze=Math.max(Ze,K.start*Fe),ht=Math.min(ht,(K.start+K.count)*Fe)),Me!==null?(Ze=Math.max(Ze,0),ht=Math.min(ht,Me.count)):Ne!=null&&(Ze=Math.max(Ze,0),ht=Math.min(ht,Ne.count));let vt=ht-Ze;if(vt<0||vt===1/0)return;xe.setup(U,z,_e,O,Me);let yt,gt=Te;if(Me!==null&&(yt=b.get(Me),gt=ke,gt.setIndex(yt)),U.isMesh)z.wireframe===!0?(Q.setLineWidth(z.wireframeLinewidth*lt()),gt.setMode(E.LINES)):gt.setMode(E.TRIANGLES);else if(U.isLine){let Ve=z.linewidth;Ve===void 0&&(Ve=1),Q.setLineWidth(Ve*lt()),U.isLineSegments?gt.setMode(E.LINES):U.isLineLoop?gt.setMode(E.LINE_LOOP):gt.setMode(E.LINE_STRIP)}else U.isPoints?gt.setMode(E.POINTS):U.isSprite&&gt.setMode(E.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)ds("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),gt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))gt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let Ve=U._multiDrawStarts,wt=U._multiDrawCounts,ot=U._multiDrawCount,nn=Me?b.get(Me).bytesPerElement:1,Xi=ae.get(z).currentProgram.getUniforms();for(let sn=0;sn<ot;sn++)Xi.setValue(E,"_gl_DrawID",sn),gt.render(Ve[sn]/nn,wt[sn])}else if(U.isInstancedMesh)gt.renderInstances(Ze,vt,U.count);else if(O.isInstancedBufferGeometry){let Ve=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,wt=Math.min(O.instanceCount,Ve);gt.renderInstances(Ze,vt,wt)}else gt.render(Ze,vt)};function ct(x,w,O){x.transparent===!0&&x.side===xn&&x.forceSinglePass===!1?(x.side=Dt,x.needsUpdate=!0,Wi(x,w,O),x.side=Zn,x.needsUpdate=!0,Wi(x,w,O),x.side=xn):Wi(x,w,O)}this.compile=function(x,w,O=null){O===null&&(O=x),p=De.get(O),p.init(w),T.push(p),O.traverseVisible(function(U){U.isLight&&U.layers.test(w.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),x!==O&&x.traverseVisible(function(U){U.isLight&&U.layers.test(w.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();let z=new Set;return x.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let K=U.material;if(K)if(Array.isArray(K))for(let ge=0;ge<K.length;ge++){let _e=K[ge];ct(_e,O,U),z.add(_e)}else ct(K,O,U),z.add(K)}),p=T.pop(),z},this.compileAsync=function(x,w,O=null){let z=this.compile(x,w,O);return new Promise(U=>{function K(){if(z.forEach(function(ge){ae.get(ge).currentProgram.isReady()&&z.delete(ge)}),z.size===0){U(x);return}setTimeout(K,10)}ne.get("KHR_parallel_shader_compile")!==null?K():setTimeout(K,10)})};let it=null;function fn(x){it&&it(x)}function Jt(){zn.stop()}function ks(){zn.start()}let zn=new Hu;zn.setAnimationLoop(fn),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(x){it=x,ce.setAnimationLoop(x),x===null?zn.stop():zn.start()},ce.addEventListener("sessionstart",Jt),ce.addEventListener("sessionend",ks),this.render=function(x,w){if(w!==void 0&&w.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),w.parent===null&&w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(w),w=ce.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,w,N),p=De.get(x,T.length),p.init(w),T.push(p),se.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse),ze.setFromProjectionMatrix(se,wn,w.reversedDepth),J=this.localClippingEnabled,He=ue.init(this.clippingPlanes,J),m=Z.get(x,C.length),m.init(),C.push(m),ce.enabled===!0&&ce.isPresenting===!0){let K=y.xr.getDepthSensingMesh();K!==null&&xi(K,w,-1/0,y.sortObjects)}xi(x,w,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(fe,ye),et=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,et&&Re.addToRenderList(m,x),this.info.render.frame++,He===!0&&ue.beginShadows();let O=p.state.shadowsArray;Pe.render(O,x,w),He===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=m.opaque,U=m.transmissive;if(p.setupLights(),w.isArrayCamera){let K=w.cameras;if(U.length>0)for(let ge=0,_e=K.length;ge<_e;ge++){let Me=K[ge];vi(z,U,x,Me)}et&&Re.render(x);for(let ge=0,_e=K.length;ge<_e;ge++){let Me=K[ge];Mn(m,x,Me,Me.viewport)}}else U.length>0&&vi(z,U,x,w),et&&Re.render(x),Mn(m,x,w);N!==null&&L===0&&(me.updateMultisampleRenderTarget(N),me.updateRenderTargetMipmap(N)),x.isScene===!0&&x.onAfterRender(y,x,w),xe.resetDefaultState(),S=-1,M=null,T.pop(),T.length>0?(p=T[T.length-1],He===!0&&ue.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,C.pop(),C.length>0?m=C[C.length-1]:m=null};function xi(x,w,O,z){if(x.visible===!1)return;if(x.layers.test(w.layers)){if(x.isGroup)O=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(w);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||ze.intersectsSprite(x)){z&&Oe.setFromMatrixPosition(x.matrixWorld).applyMatrix4(se);let ge=B.update(x),_e=x.material;_e.visible&&m.push(x,ge,_e,O,Oe.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||ze.intersectsObject(x))){let ge=B.update(x),_e=x.material;if(z&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Oe.copy(x.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Oe.copy(ge.boundingSphere.center)),Oe.applyMatrix4(x.matrixWorld).applyMatrix4(se)),Array.isArray(_e)){let Me=ge.groups;for(let Fe=0,Be=Me.length;Fe<Be;Fe++){let Ne=Me[Fe],Ze=_e[Ne.materialIndex];Ze&&Ze.visible&&m.push(x,ge,Ze,O,Oe.z,Ne)}}else _e.visible&&m.push(x,ge,_e,O,Oe.z,null)}}let K=x.children;for(let ge=0,_e=K.length;ge<_e;ge++)xi(K[ge],w,O,z)}function Mn(x,w,O,z){let U=x.opaque,K=x.transmissive,ge=x.transparent;p.setupLightsView(O),He===!0&&ue.setGlobalState(y.clippingPlanes,O),z&&Q.viewport(P.copy(z)),U.length>0&&kn(U,w,O),K.length>0&&kn(K,w,O),ge.length>0&&kn(ge,w,O),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function vi(x,w,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Dn(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float")?Cs:Cn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));let K=p.state.transmissionRenderTarget[z.id],ge=z.viewport||P;K.setSize(ge.z*y.transmissionResolutionScale,ge.w*y.transmissionResolutionScale);let _e=y.getRenderTarget(),Me=y.getActiveCubeFace(),Fe=y.getActiveMipmapLevel();y.setRenderTarget(K),y.getClearColor(q),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),et&&Re.render(O);let Be=y.toneMapping;y.toneMapping=ei;let Ne=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),He===!0&&ue.setGlobalState(y.clippingPlanes,z),kn(x,O,z),me.updateMultisampleRenderTarget(K),me.updateRenderTargetMipmap(K),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let ht=0,vt=w.length;ht<vt;ht++){let yt=w[ht],gt=yt.object,Ve=yt.geometry,wt=yt.material,ot=yt.group;if(wt.side===xn&&gt.layers.test(z.layers)){let nn=wt.side;wt.side=Dt,wt.needsUpdate=!0,Vs(gt,O,z,Ve,wt,ot),wt.side=nn,wt.needsUpdate=!0,Ze=!0}}Ze===!0&&(me.updateMultisampleRenderTarget(K),me.updateRenderTargetMipmap(K))}y.setRenderTarget(_e,Me,Fe),y.setClearColor(q,$),Ne!==void 0&&(z.viewport=Ne),y.toneMapping=Be}function kn(x,w,O){let z=w.isScene===!0?w.overrideMaterial:null;for(let U=0,K=x.length;U<K;U++){let ge=x[U],_e=ge.object,Me=ge.geometry,Fe=ge.group,Be=ge.material;Be.allowOverride===!0&&z!==null&&(Be=z),_e.layers.test(O.layers)&&Vs(_e,w,O,Me,Be,Fe)}}function Vs(x,w,O,z,U,K){x.onBeforeRender(y,w,O,z,U,K),x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),U.onBeforeRender(y,w,O,z,x,K),U.transparent===!0&&U.side===xn&&U.forceSinglePass===!1?(U.side=Dt,U.needsUpdate=!0,y.renderBufferDirect(O,w,z,U,x,K),U.side=Zn,U.needsUpdate=!0,y.renderBufferDirect(O,w,z,U,x,K),U.side=xn):y.renderBufferDirect(O,w,z,U,x,K),x.onAfterRender(y,w,O,z,U,K)}function Wi(x,w,O){w.isScene!==!0&&(w=Le);let z=ae.get(x),U=p.state.lights,K=p.state.shadowsArray,ge=U.state.version,_e=H.getParameters(x,U.state,K,w,O),Me=H.getProgramCacheKey(_e),Fe=z.programs;z.environment=x.isMeshStandardMaterial?w.environment:null,z.fog=w.fog,z.envMap=(x.isMeshStandardMaterial?Ge:Xe).get(x.envMap||z.environment),z.envMapRotation=z.environment!==null&&x.envMap===null?w.environmentRotation:x.envMapRotation,Fe===void 0&&(x.addEventListener("dispose",te),Fe=new Map,z.programs=Fe);let Be=Fe.get(Me);if(Be!==void 0){if(z.currentProgram===Be&&z.lightsStateVersion===ge)return ve(x,_e),Be}else _e.uniforms=H.getUniforms(x),x.onBeforeCompile(_e,y),Be=H.acquireProgram(_e,Me),Fe.set(Me,Be),z.uniforms=_e.uniforms;let Ne=z.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Ne.clippingPlanes=ue.uniform),ve(x,_e),z.needsLights=xt(x),z.lightsStateVersion=ge,z.needsLights&&(Ne.ambientLightColor.value=U.state.ambient,Ne.lightProbe.value=U.state.probe,Ne.directionalLights.value=U.state.directional,Ne.directionalLightShadows.value=U.state.directionalShadow,Ne.spotLights.value=U.state.spot,Ne.spotLightShadows.value=U.state.spotShadow,Ne.rectAreaLights.value=U.state.rectArea,Ne.ltc_1.value=U.state.rectAreaLTC1,Ne.ltc_2.value=U.state.rectAreaLTC2,Ne.pointLights.value=U.state.point,Ne.pointLightShadows.value=U.state.pointShadow,Ne.hemisphereLights.value=U.state.hemi,Ne.directionalShadowMap.value=U.state.directionalShadowMap,Ne.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Ne.spotShadowMap.value=U.state.spotShadowMap,Ne.spotLightMatrix.value=U.state.spotLightMatrix,Ne.spotLightMap.value=U.state.spotLightMap,Ne.pointShadowMap.value=U.state.pointShadowMap,Ne.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=Be,z.uniformsList=null,Be}function F(x){if(x.uniformsList===null){let w=x.currentProgram.getUniforms();x.uniformsList=Ds.seqWithValue(w.seq,x.uniforms)}return x.uniformsList}function ve(x,w){let O=ae.get(x);O.outputColorSpace=w.outputColorSpace,O.batching=w.batching,O.batchingColor=w.batchingColor,O.instancing=w.instancing,O.instancingColor=w.instancingColor,O.instancingMorph=w.instancingMorph,O.skinning=w.skinning,O.morphTargets=w.morphTargets,O.morphNormals=w.morphNormals,O.morphColors=w.morphColors,O.morphTargetsCount=w.morphTargetsCount,O.numClippingPlanes=w.numClippingPlanes,O.numIntersection=w.numClipIntersection,O.vertexAlphas=w.vertexAlphas,O.vertexTangents=w.vertexTangents,O.toneMapping=w.toneMapping}function $e(x,w,O,z,U){w.isScene!==!0&&(w=Le),me.resetTextureUnits();let K=w.fog,ge=z.isMeshStandardMaterial?w.environment:null,_e=N===null?y.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ri,Me=(z.isMeshStandardMaterial?Ge:Xe).get(z.envMap||ge),Fe=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Be=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ne=!!O.morphAttributes.position,Ze=!!O.morphAttributes.normal,ht=!!O.morphAttributes.color,vt=ei;z.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(vt=y.toneMapping);let yt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,gt=yt!==void 0?yt.length:0,Ve=ae.get(z),wt=p.state.lights;if(He===!0&&(J===!0||x!==M)){let qt=x===M&&z.id===S;ue.setState(z,x,qt)}let ot=!1;z.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==wt.state.version||Ve.outputColorSpace!==_e||U.isBatchedMesh&&Ve.batching===!1||!U.isBatchedMesh&&Ve.batching===!0||U.isBatchedMesh&&Ve.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ve.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ve.instancing===!1||!U.isInstancedMesh&&Ve.instancing===!0||U.isSkinnedMesh&&Ve.skinning===!1||!U.isSkinnedMesh&&Ve.skinning===!0||U.isInstancedMesh&&Ve.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ve.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ve.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ve.instancingMorph===!1&&U.morphTexture!==null||Ve.envMap!==Me||z.fog===!0&&Ve.fog!==K||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ue.numPlanes||Ve.numIntersection!==ue.numIntersection)||Ve.vertexAlphas!==Fe||Ve.vertexTangents!==Be||Ve.morphTargets!==Ne||Ve.morphNormals!==Ze||Ve.morphColors!==ht||Ve.toneMapping!==vt||Ve.morphTargetsCount!==gt)&&(ot=!0):(ot=!0,Ve.__version=z.version);let nn=Ve.currentProgram;ot===!0&&(nn=Wi(z,w,U));let Xi=!1,sn=!1,Gs=!1,Et=nn.getUniforms(),pn=Ve.uniforms;if(Q.useProgram(nn.program)&&(Xi=!0,sn=!0,Gs=!0),z.id!==S&&(S=z.id,sn=!0),Xi||M!==x){Q.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),Et.setValue(E,"projectionMatrix",x.projectionMatrix),Et.setValue(E,"viewMatrix",x.matrixWorldInverse);let Kt=Et.map.cameraPosition;Kt!==void 0&&Kt.setValue(E,Ae.setFromMatrixPosition(x.matrixWorld)),j.logarithmicDepthBuffer&&Et.setValue(E,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Et.setValue(E,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,sn=!0,Gs=!0)}if(U.isSkinnedMesh){Et.setOptional(E,U,"bindMatrix"),Et.setOptional(E,U,"bindMatrixInverse");let qt=U.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),Et.setValue(E,"boneTexture",qt.boneTexture,me))}U.isBatchedMesh&&(Et.setOptional(E,U,"batchingTexture"),Et.setValue(E,"batchingTexture",U._matricesTexture,me),Et.setOptional(E,U,"batchingIdTexture"),Et.setValue(E,"batchingIdTexture",U._indirectTexture,me),Et.setOptional(E,U,"batchingColorTexture"),U._colorsTexture!==null&&Et.setValue(E,"batchingColorTexture",U._colorsTexture,me));let mn=O.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&oe.update(U,O,nn),(sn||Ve.receiveShadow!==U.receiveShadow)&&(Ve.receiveShadow=U.receiveShadow,Et.setValue(E,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(pn.envMap.value=Me,pn.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&w.environment!==null&&(pn.envMapIntensity.value=w.environmentIntensity),sn&&(Et.setValue(E,"toneMappingExposure",y.toneMappingExposure),Ve.needsLights&&Qe(pn,Gs),K&&z.fog===!0&&X.refreshFogUniforms(pn,K),X.refreshMaterialUniforms(pn,z,W,V,p.state.transmissionRenderTarget[x.id]),Ds.upload(E,F(Ve),pn,me)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ds.upload(E,F(Ve),pn,me),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Et.setValue(E,"center",U.center),Et.setValue(E,"modelViewMatrix",U.modelViewMatrix),Et.setValue(E,"normalMatrix",U.normalMatrix),Et.setValue(E,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let qt=z.uniformsGroups;for(let Kt=0,pl=qt.length;Kt<pl;Kt++){let yi=qt[Kt];Ye.update(yi,nn),Ye.bind(yi,nn)}}return nn}function Qe(x,w){x.ambientLightColor.needsUpdate=w,x.lightProbe.needsUpdate=w,x.directionalLights.needsUpdate=w,x.directionalLightShadows.needsUpdate=w,x.pointLights.needsUpdate=w,x.pointLightShadows.needsUpdate=w,x.spotLights.needsUpdate=w,x.spotLightShadows.needsUpdate=w,x.rectAreaLights.needsUpdate=w,x.hemisphereLights.needsUpdate=w}function xt(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(x,w,O){let z=ae.get(x);z.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),ae.get(x.texture).__webglTexture=w,ae.get(x.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:O,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,w){let O=ae.get(x);O.__webglFramebuffer=w,O.__useDefaultFramebuffer=w===void 0};let tt=E.createFramebuffer();this.setRenderTarget=function(x,w=0,O=0){N=x,R=w,L=O;let z=!0,U=null,K=!1,ge=!1;if(x){let Me=ae.get(x);if(Me.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(E.FRAMEBUFFER,null),z=!1;else if(Me.__webglFramebuffer===void 0)me.setupRenderTarget(x);else if(Me.__hasExternalTextures)me.rebindTextures(x,ae.get(x.texture).__webglTexture,ae.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let Ne=x.depthTexture;if(Me.__boundDepthTexture!==Ne){if(Ne!==null&&ae.has(Ne)&&(x.width!==Ne.image.width||x.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(x)}}let Fe=x.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(ge=!0);let Be=ae.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Be[w])?U=Be[w][O]:U=Be[w],K=!0):x.samples>0&&me.useMultisampledRTT(x)===!1?U=ae.get(x).__webglMultisampledFramebuffer:Array.isArray(Be)?U=Be[O]:U=Be,P.copy(x.viewport),k.copy(x.scissor),G=x.scissorTest}else P.copy(we).multiplyScalar(W).floor(),k.copy(le).multiplyScalar(W).floor(),G=Ie;if(O!==0&&(U=tt),Q.bindFramebuffer(E.FRAMEBUFFER,U)&&z&&Q.drawBuffers(x,U),Q.viewport(P),Q.scissor(k),Q.setScissorTest(G),K){let Me=ae.get(x.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+w,Me.__webglTexture,O)}else if(ge){let Me=w;for(let Fe=0;Fe<x.textures.length;Fe++){let Be=ae.get(x.textures[Fe]);E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+Fe,Be.__webglTexture,O,Me)}}else if(x!==null&&O!==0){let Me=ae.get(x.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Me.__webglTexture,O)}S=-1},this.readRenderTargetPixels=function(x,w,O,z,U,K,ge,_e=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=ae.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me){Q.bindFramebuffer(E.FRAMEBUFFER,Me);try{let Fe=x.textures[_e],Be=Fe.format,Ne=Fe.type;if(!j.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w>=0&&w<=x.width-z&&O>=0&&O<=x.height-U&&(x.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+_e),E.readPixels(w,O,z,U,Ue.convert(Be),Ue.convert(Ne),K))}finally{let Fe=N!==null?ae.get(N).__webglFramebuffer:null;Q.bindFramebuffer(E.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(x,w,O,z,U,K,ge,_e=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=ae.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me)if(w>=0&&w<=x.width-z&&O>=0&&O<=x.height-U){Q.bindFramebuffer(E.FRAMEBUFFER,Me);let Fe=x.textures[_e],Be=Fe.format,Ne=Fe.type;if(!j.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ze=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,Ze),E.bufferData(E.PIXEL_PACK_BUFFER,K.byteLength,E.STREAM_READ),x.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+_e),E.readPixels(w,O,z,U,Ue.convert(Be),Ue.convert(Ne),0);let ht=N!==null?ae.get(N).__webglFramebuffer:null;Q.bindFramebuffer(E.FRAMEBUFFER,ht);let vt=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await du(E,vt,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,Ze),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,K),E.deleteBuffer(Ze),E.deleteSync(vt),K}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,w=null,O=0){let z=Math.pow(2,-O),U=Math.floor(x.image.width*z),K=Math.floor(x.image.height*z),ge=w!==null?w.x:0,_e=w!==null?w.y:0;me.setTexture2D(x,0),E.copyTexSubImage2D(E.TEXTURE_2D,O,0,0,ge,_e,U,K),Q.unbindTexture()};let st=E.createFramebuffer(),bt=E.createFramebuffer();this.copyTextureToTexture=function(x,w,O=null,z=null,U=0,K=null){K===null&&(U!==0?(ds("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),K=U,U=0):K=0);let ge,_e,Me,Fe,Be,Ne,Ze,ht,vt,yt=x.isCompressedTexture?x.mipmaps[K]:x.image;if(O!==null)ge=O.max.x-O.min.x,_e=O.max.y-O.min.y,Me=O.isBox3?O.max.z-O.min.z:1,Fe=O.min.x,Be=O.min.y,Ne=O.isBox3?O.min.z:0;else{let mn=Math.pow(2,-U);ge=Math.floor(yt.width*mn),_e=Math.floor(yt.height*mn),x.isDataArrayTexture?Me=yt.depth:x.isData3DTexture?Me=Math.floor(yt.depth*mn):Me=1,Fe=0,Be=0,Ne=0}z!==null?(Ze=z.x,ht=z.y,vt=z.z):(Ze=0,ht=0,vt=0);let gt=Ue.convert(w.format),Ve=Ue.convert(w.type),wt;w.isData3DTexture?(me.setTexture3D(w,0),wt=E.TEXTURE_3D):w.isDataArrayTexture||w.isCompressedArrayTexture?(me.setTexture2DArray(w,0),wt=E.TEXTURE_2D_ARRAY):(me.setTexture2D(w,0),wt=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,w.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,w.unpackAlignment);let ot=E.getParameter(E.UNPACK_ROW_LENGTH),nn=E.getParameter(E.UNPACK_IMAGE_HEIGHT),Xi=E.getParameter(E.UNPACK_SKIP_PIXELS),sn=E.getParameter(E.UNPACK_SKIP_ROWS),Gs=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,yt.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,yt.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Fe),E.pixelStorei(E.UNPACK_SKIP_ROWS,Be),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Ne);let Et=x.isDataArrayTexture||x.isData3DTexture,pn=w.isDataArrayTexture||w.isData3DTexture;if(x.isDepthTexture){let mn=ae.get(x),qt=ae.get(w),Kt=ae.get(mn.__renderTarget),pl=ae.get(qt.__renderTarget);Q.bindFramebuffer(E.READ_FRAMEBUFFER,Kt.__webglFramebuffer),Q.bindFramebuffer(E.DRAW_FRAMEBUFFER,pl.__webglFramebuffer);for(let yi=0;yi<Me;yi++)Et&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ae.get(x).__webglTexture,U,Ne+yi),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ae.get(w).__webglTexture,K,vt+yi)),E.blitFramebuffer(Fe,Be,ge,_e,Ze,ht,ge,_e,E.DEPTH_BUFFER_BIT,E.NEAREST);Q.bindFramebuffer(E.READ_FRAMEBUFFER,null),Q.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(U!==0||x.isRenderTargetTexture||ae.has(x)){let mn=ae.get(x),qt=ae.get(w);Q.bindFramebuffer(E.READ_FRAMEBUFFER,st),Q.bindFramebuffer(E.DRAW_FRAMEBUFFER,bt);for(let Kt=0;Kt<Me;Kt++)Et?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,mn.__webglTexture,U,Ne+Kt):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,mn.__webglTexture,U),pn?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,qt.__webglTexture,K,vt+Kt):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,qt.__webglTexture,K),U!==0?E.blitFramebuffer(Fe,Be,ge,_e,Ze,ht,ge,_e,E.COLOR_BUFFER_BIT,E.NEAREST):pn?E.copyTexSubImage3D(wt,K,Ze,ht,vt+Kt,Fe,Be,ge,_e):E.copyTexSubImage2D(wt,K,Ze,ht,Fe,Be,ge,_e);Q.bindFramebuffer(E.READ_FRAMEBUFFER,null),Q.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else pn?x.isDataTexture||x.isData3DTexture?E.texSubImage3D(wt,K,Ze,ht,vt,ge,_e,Me,gt,Ve,yt.data):w.isCompressedArrayTexture?E.compressedTexSubImage3D(wt,K,Ze,ht,vt,ge,_e,Me,gt,yt.data):E.texSubImage3D(wt,K,Ze,ht,vt,ge,_e,Me,gt,Ve,yt):x.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,K,Ze,ht,ge,_e,gt,Ve,yt.data):x.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,K,Ze,ht,yt.width,yt.height,gt,yt.data):E.texSubImage2D(E.TEXTURE_2D,K,Ze,ht,ge,_e,gt,Ve,yt);E.pixelStorei(E.UNPACK_ROW_LENGTH,ot),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,nn),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Xi),E.pixelStorei(E.UNPACK_SKIP_ROWS,sn),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Gs),K===0&&w.generateMipmaps&&E.generateMipmap(wt),Q.unbindTexture()},this.initRenderTarget=function(x){ae.get(x).__webglFramebuffer===void 0&&me.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?me.setTextureCube(x,0):x.isData3DTexture?me.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?me.setTexture2DArray(x,0):me.setTexture2D(x,0),Q.unbindTexture()},this.resetState=function(){R=0,L=0,N=null,Q.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}};var Hr=class n extends mt{constructor(){let e=n.SkyShader,t=new Zt({name:e.name,uniforms:Ka.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Dt,depthWrite:!1});super(new Je(1,1,1),t),this.isSky=!0}};Hr.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new I},up:{value:new I(0,1,0)}},vertexShader:`
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

		}`};var il=class extends Ii{constructor(){super();let e=new Je;e.deleteAttribute("uv");let t=new Fn({side:Dt}),i=new Fn,s=new fi(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new mt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Nn(e,i,6),a=new _t;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new mt(e,Fs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new mt(e,Fs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new mt(e,Fs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new mt(e,Fs(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new mt(e,Fs(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new mt(e,Fs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Fs(n){return new Li({color:0,emissive:16777215,emissiveIntensity:n})}function Zu(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new Lt,c=0;for(let h=0;h<n.length;++h){let u=n[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<n.length;++d){let f=n[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=n[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=$u(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);let g=$u(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function $u(n){let e,t,i,s=-1,r=0;for(let c=0;c<n.length;++c){let h=n[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new Pt(o,t,i),l=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<t;g++){let v=h.getComponent(d,g);a.setComponent(d+u,g,v)}}else o.set(h.array,l);l+=h.count*t}return s!==void 0&&(a.gpuType=s),a}var _i=.008333333333333333,sl=9.80665,kt=Object.freeze({name:"SF-172 Peregrine",dryMass:820,fuelDensity:.72,wingArea:16.2,span:11,maxPower:119e3,idleRpm:750,maxRpm:2700,stallAlpha:.28,cl0:.24,clAlpha:4.6,cd0:.032,induced:.058}),at=(n,e,t)=>Math.max(e,Math.min(t,n)),ol=n=>n*Math.PI/180,gi=n=>n*180/Math.PI,Gi=n=>Math.atan2(Math.sin(n),Math.cos(n)),Ft=Object.freeze([{id:"SF01",name:"Skyforge Bay",x:0,z:0,elevation:12,heading:0,length:1500,width:38,runways:["36","18"]},{id:"SF02",name:"Pine Valley",x:6500,z:11e3,elevation:185,heading:.6,length:1250,width:34,runways:["03","21"]},{id:"SF03",name:"Cape Aurora",x:-8500,z:16500,elevation:28,heading:-.5,length:1650,width:40,runways:["33","15"]},{id:"SF04",name:"Highland Field",x:15e3,z:22e3,elevation:520,heading:1.2,length:1050,width:30,runways:["07","25"]}]),rl=Object.freeze({clear:{name:"Clear / calm",wind:0,direction:270,gust:0,turbulence:.05,cloud:.12,visibility:28e3,rain:0,temperature:15},breeze:{name:"Coastal breeze",wind:5,direction:280,gust:2,turbulence:.3,cloud:.45,visibility:2e4,rain:0,temperature:18},overcast:{name:"Overcast / rain",wind:7,direction:220,gust:3,turbulence:.5,cloud:1,visibility:9e3,rain:.7,temperature:11},fog:{name:"Morning fog",wind:2,direction:180,gust:.5,turbulence:.1,cloud:.55,visibility:2200,rain:0,temperature:8}});function X0(n,e){let t=95+e*.009+115*Math.sin(n/4500)+100*Math.sin(e/3900),i=1100*Math.exp(-((n-14e3)**2+(e-17e3)**2)/9e7),s=260*Math.sin(n/1700)*Math.sin(e/2200)+85*Math.sin(n/520+e/710),r=18*Math.sin(n/110)*Math.sin(e/150);return t+i+s+r}function Os(n,e){let t=X0(n,e);for(let i of Ft){let s=n-i.x,r=e-i.z,o=s*Math.sin(i.heading)+r*Math.cos(i.heading),a=s*Math.cos(i.heading)-r*Math.sin(i.heading),l=Math.max(Math.abs(o)-i.length/2-160,Math.abs(a)-260);if(l<0)return i.elevation;if(l<450){let c=l/450,h=c*c*(3-2*c);t=i.elevation*(1-h)+t*h}}return t}var Bs=(n,e)=>Math.max(0,Os(n,e));function q0(n,e,t){let i=e-n.x,s=t-n.z;return{along:i*Math.sin(n.heading)+s*Math.cos(n.heading),across:i*Math.cos(n.heading)-s*Math.sin(n.heading)}}function Y0(n,e){return Ft.find(t=>{let i=q0(t,n,e);return Math.abs(i.along)<t.length/2&&Math.abs(i.across)<t.width/2})||null}function $0(n,e){return(gi(Math.atan2(e.x-n.x,e.z-n.z))+360)%360}function al(n){let e=n.route[n.waypoint]||Ft.find(r=>r.id===n.destination)||Ft[1],t=Math.hypot(e.x-n.x,e.z-n.z),i=$0(n,e),s=Math.hypot(n.vx,n.vz);return{target:e,distance:t,bearing:i,error:gi(Gi(ol(i)-n.heading)),eta:s>2?t/s:null}}function Z0(n){let e=n.weather,t=(e.wind+e.gust*Math.sin(n.time*.63+n.y*.002))*(1+Math.max(0,n.y)/12e3),i=ol(e.direction+180);return{x:Math.sin(i)*t,z:Math.cos(i)*t,y:e.turbulence*(.55*Math.sin(n.time*1.7)+.3*Math.sin(n.time*3.1))}}function ll(n={}){let e=Ft.find(d=>d.id===n.departure)||Ft[0],t=n.runway===e.runways[1],i=e.heading+(t?Math.PI:0),s=n.start==="air"||["landing","emergency"].includes(n.mode),r=s?-3e3:-e.length/2+80,o=e.x+Math.sin(i)*r,a=e.z+Math.cos(i)*r,l=s?e.elevation+(n.mode==="landing"?160:750):e.elevation+1.25,c=s||n.ready,h={version:1,aircraft:kt.name,departure:e.id,destination:n.destination||(n.mode==="landing"?e.id:"SF02"),mode:n.mode||"free",runway:n.runway||e.runways[0],route:[],waypoint:0,x:o,y:l,z:a,vx:Math.sin(i)*(s?43:0),vy:s&&n.mode==="landing"?-2:0,vz:Math.cos(i)*(s?43:0),heading:i,pitch:s?.02:0,roll:0,p:0,q:0,r:0,controls:{elevator:0,aileron:0,rudder:0,throttle:c?n.mode==="landing"?.35:.7:0,mixture:1,trim:0,flaps:n.mode==="landing"?.5:0,brake:0},systems:{battery:!!c,ignition:!!c,starter:!1,engine:!!c,rpm:c?1900:0,batteryAh:24,voltage:c?28:0,alternator:!0,fuel:140,oilTemp:20,oilPressure:0,navLights:!0,landingLights:!1,beacon:!0,strobe:!1,panelLights:!1},failures:{engine:!1,electrical:!1},weather:{...rl[n.weather]||rl.clear,...n.customWeather||{}},hour:n.hour??14,dayCycle:!0,damage:0,time:0,grounded:!s,wasAirborne:s,airspeed:s?43:0,alpha:0,sideslip:0,lift:0,drag:0,thrust:0,density:1.225,gLoad:1,warnings:[],flightPath:[],lastPathTime:-1,distanceFlown:0,fuelUsed:0,peakAltitude:l,maxG:1,smoothness:0,previousControls:[0,0,0],touchdown:null,status:"active",objective:"Start the engine, taxi, and explore the fictional archipelago.",trainingStep:0,achievements:[],emergencyTriggered:!1},u=Ft.find(d=>d.id===h.destination)||Ft[1];return h.route=n.route?.length?n.route.map(d=>({...d})):[{id:u.id,name:u.name,x:u.x,z:u.z}],h.mode==="landing"&&(h.objective=`Land on ${e.name} runway ${h.runway}; target 60\u201370 kt, shallow descent.`),h.mode==="crosscountry"&&(h.objective=`Fly the route and land at ${u.name}.`),h.mode==="emergency"&&(h.objective="Engine failure at 10 seconds. Glide at 65 kt, choose a safe landing area."),h}function J0(n,e){let t=n.systems,i=n.controls,s=t.battery&&t.batteryAh>0&&!n.failures.electrical;t.starter&&s&&t.ignition&&i.mixture>.15&&t.fuel>0&&!n.failures.engine&&(t.engine=!0),(!t.ignition||i.mixture<.05||t.fuel<=0||n.failures.engine)&&(t.engine=!1);let r=t.engine?kt.idleRpm+i.throttle*(kt.maxRpm-kt.idleRpm):0;t.rpm+=(r-t.rpm)*Math.min(1,e*2);let o=t.engine&&t.rpm>1e3&&t.alternator&&!n.failures.electrical,a=2+(t.navLights?2:0)+(t.landingLights?7:0)+(t.panelLights?1:0)+(t.starter?100:0);t.batteryAh=at(t.batteryAh+(o?12:s?-a:0)*e/3600,0,24),t.voltage=s?o?28:22+t.batteryAh/12:0;let l=t.engine?(7e-4+i.throttle*.008)*e:0;t.fuel=Math.max(0,t.fuel-l),n.fuelUsed+=l,t.oilTemp+=((t.engine?70+i.throttle*35:n.weather.temperature)-t.oilTemp)*e*.006,t.oilPressure+=((t.engine?20+t.rpm/60:0)-t.oilPressure)*e*2}function Wr(n){return n.airspeed*Math.sqrt(n.density/1.225)}function K0(n,e,t,i){let s=kt.stallAlpha+e*.035,r=Math.abs(n)>s,o=at(kt.cl0+kt.clAlpha*n+e*.65,-1.2,1.65+e*.4);r&&(o*=at(1-(Math.abs(n)-s)*2.4,.22,1));let a=16*Math.max(0,i)/kt.span,l=at(a**2/(1+a**2),.15,1),c=kt.cd0+kt.induced*o**2*l+e*.065+(r?.18:0)+.1*Math.abs(t);return{cl:o,cd:c,stalled:r,groundEffect:l}}function kc(n,e=_i){if(n.status!=="active")return;e=at(e,0,.025);let t=n.controls;for(let Ie of["throttle","mixture","flaps","brake"])t[Ie]=at(t[Ie],0,1);for(let Ie of["elevator","aileron","rudder","trim"])t[Ie]=at(t[Ie],-1,1);n.time+=e,n.dayCycle&&(n.hour=(n.hour+e/3600)%24),n.mode==="emergency"&&n.time>10&&!n.emergencyTriggered&&(n.failures.engine=!0,n.emergencyTriggered=!0),J0(n,e);let i=Z0(n),s=n.vx-i.x,r=n.vy-i.y,o=n.vz-i.z,a=Math.hypot(s,o),l=Math.hypot(a,r);n.airspeed=l;let c=a>.5?Math.atan2(s,o):n.heading,h=Math.atan2(r,Math.max(.5,a));n.alpha=Gi(n.pitch-h),n.sideslip=Gi(c-n.heading),n.density=1.225*Math.exp(-Math.max(0,n.y)/8500)*288.15/(273.15+n.weather.temperature);let u=kt.dryMass+n.systems.fuel*kt.fuelDensity,d=.5*n.density*l**2,f=at(d/900,0,2),g=n.weather.turbulence,v=(t.elevator*.45+t.trim*.15-(n.alpha-.035-t.flaps*.045)*1.3)*f;n.q+=(v-n.q)*e*3,n.p+=(t.aileron*1.2*f-n.p*2.8)*e;let m=sl*Math.tan(at(n.roll,-1.2,1.2))/Math.max(25,a),p=at(l/22,.15,1.3);n.r+=((n.grounded?t.rudder*p*.48:m+t.rudder*.22*f+n.sideslip*.8)-n.r)*e*2,n.pitch=at(n.pitch+n.q*e+g*Math.sin(n.time*2.9)*e*.008,-.9,.9),n.roll=Gi(n.roll+n.p*e+g*Math.sin(n.time*2.2)*e*.015),n.heading=Gi(n.heading+n.r*e),n.grounded&&(n.pitch=at(n.pitch,0,l>20?.2:.015),n.roll*=Math.exp(-e*8));let{cl:C,cd:T,stalled:y}=K0(n.alpha,t.flaps,n.sideslip,n.y-Bs(n.x,n.z));n.lift=d*kt.wingArea*C,n.drag=d*kt.wingArea*T;let A=Math.exp(-Math.max(0,n.y)/11e3),R=at(1-Math.abs(t.mixture-at(1-n.y/1e4,.45,1))*1.5,0,1);n.thrust=n.systems.engine?Math.min(2400,kt.maxPower*t.throttle*.75/Math.max(22,l))*A*R*at(n.systems.rpm/2200,0,1):0;let L=Math.sin(c),N=Math.cos(c),S=Math.sin(h),M=Math.cos(h),P=n.lift*Math.cos(n.roll)*M,k=-n.lift*Math.cos(n.roll)*S,G=n.lift*Math.sin(n.roll)+d*kt.wingArea*(t.rudder*.08-n.sideslip*.35),q=Math.sin(n.heading)*Math.cos(n.pitch)*n.thrust+L*k+N*G,$=Math.cos(n.heading)*Math.cos(n.pitch)*n.thrust+N*k-L*G,Y=Math.sin(n.pitch)*n.thrust+P-u*sl;l>.1&&(q-=n.drag*s/l,Y-=n.drag*r/l,$-=n.drag*o/l),n.gLoad=n.lift/(u*sl),n.maxG=Math.max(n.maxG,Math.abs(n.gLoad));let V=Bs(n.x,n.z)+1.25;if(n.grounded&&n.y<=V+.2&&Y<=0){Y=0,n.vy=0,n.y=V;let Ie=Math.hypot(n.vx,n.vz),ze=(t.brake*.55+.018)*Math.max(0,u*sl-P);if(Ie>.01){let J=Math.min(ze,Ie*u/e);q-=J*n.vx/Ie,$-=J*n.vz/Ie}let He=n.vx*Math.cos(n.heading)-n.vz*Math.sin(n.heading);q-=He*u*5*Math.cos(n.heading),$+=He*u*5*Math.sin(n.heading)}else n.grounded=!1,n.wasAirborne=!0;n.vx+=q/u*e,n.vy+=Y/u*e,n.vz+=$/u*e;let W=n.x,fe=n.z;n.x+=n.vx*e,n.y+=n.vy*e,n.z+=n.vz*e,n.distanceFlown+=Math.hypot(n.x-W,n.z-fe);let ye=Bs(n.x,n.z)+1.25;if(n.y<=ye){if(!n.grounded&&n.wasAirborne){let Ie=Y0(n.x,n.z),ze=Math.max(0,-n.vy),He=Ie?Math.min(Math.abs(gi(Gi(n.heading-Ie.heading))),Math.abs(gi(Gi(n.heading-Ie.heading-Math.PI)))):90;n.touchdown={time:n.time,verticalSpeed:ze,airspeed:l,airport:Ie?.id||null,alignment:He,score:Math.round(at(100-ze*12-He*.8-Math.max(0,l-38)*2-(Ie?0:25),0,100))},ze>6||Math.abs(n.roll)>.45||n.pitch<-.25||Os(n.x,n.z)<0?n.damage=1:ze>3&&(n.damage=Math.max(n.damage,.25))}n.y=ye,n.vy=0,n.grounded=!0,n.damage>=1&&(n.status="crashed")}(l>88||Math.abs(n.gLoad)>4.4)&&(n.damage=at(n.damage+e*.05,0,1)),n.damage>=1&&(n.status="crashed"),n.peakAltitude=Math.max(n.peakAltitude,n.y);let we=[t.elevator,t.aileron,t.rudder];n.smoothness+=we.reduce((Ie,ze,He)=>Ie+Math.abs(ze-n.previousControls[He]),0),n.previousControls=we,n.warnings=[],y&&l>15&&!n.grounded&&n.warnings.push("STALL \u2014 release pull, lower the nose slightly, add full power"),l>75&&n.warnings.push("OVERSPEED"),n.systems.fuel<15&&n.warnings.push("LOW FUEL"),!n.systems.engine&&!n.grounded&&n.warnings.push("ENGINE OFF \u2014 best glide 65 kt, pick a landing area now"),n.systems.voltage<20&&n.warnings.push("ELECTRICAL BUS OFF"),n.damage>0&&n.warnings.push("AIRFRAME DAMAGE"),n.time-n.lastPathTime>=1&&(n.flightPath.push({x:n.x,y:n.y,z:n.z,time:n.time}),n.flightPath.length>1800&&n.flightPath.shift(),n.lastPathTime=n.time),al(n).distance<600&&n.waypoint<n.route.length-1&&n.waypoint++,Q0(n,e)}function Q0(n,e){if(n.status==="crashed"){n.objective="Flight ended: impact / structural limits exceeded. Restart or review debrief.";return}if(n.mode==="training"){let t=["Battery ON, ignition ON, mixture rich, then START.","Taxi: throttle 15\u201325%, rudder steering, brakes. Reach 5 kt.","Takeoff: full power, rotate above 50 kt, climb past 100 ft AGL.","Straight and level: fly 80\u2013110 kt, within \xB15\xB0 bank and \xB12 m/s vertical speed for 10 seconds.","Turn: bank between 15\xB0 and 35\xB0 while airborne.","Return to an airport, land and brake to a stop."],i=n.trainingStep;n.objective=`TRAINING ${Math.min(i+1,6)}/6 \u2014 ${t[i]||"Training complete."}`;let s=n.y-Bs(n.x,n.z),r=[n.systems.engine,n.grounded&&Math.hypot(n.vx,n.vz)>2.6,!n.grounded&&s>30,!n.grounded&&Math.abs(n.roll)<.087&&Math.abs(n.vy)<2&&n.airspeed>41&&n.airspeed<57,!n.grounded&&Math.abs(n.roll)>.26&&Math.abs(n.roll)<.61,n.touchdown?.airport&&n.grounded&&Math.hypot(n.vx,n.vz)<2];i===3&&(n.levelTime=r[3]?(n.levelTime||0)+e:0),r[i]&&(i!==3||n.levelTime>10)&&(n.trainingStep++,n.achievements.push(`training-${i+1}`)),n.trainingStep>=6&&(n.status="complete",n.objective="Training complete \u2014 review your flight report.")}else if(n.touchdown&&n.grounded&&Math.hypot(n.vx,n.vz)<2){let t=n.touchdown.airport===n.destination&&n.waypoint===n.route.length-1;(n.mode==="landing"&&t||n.mode==="crosscountry"&&t||n.mode==="emergency")&&(n.status="complete",n.objective="Flight complete \u2014 review touchdown and navigation performance.")}}function Vc(n){return{format:"skyforge-flight-report",version:1,aircraft:n.aircraft,fictionalWorld:!0,mode:n.mode,status:n.status,durationSeconds:n.time,distanceMeters:n.distanceFlown,fuelUsedLiters:n.fuelUsed,peakAltitudeMeters:n.peakAltitude,maxG:n.maxG,touchdown:n.touchdown,controlVariation:n.smoothness,path:n.flightPath,suggestions:n.touchdown?[n.touchdown.verticalSpeed>2?"Reduce descent rate before touchdown; flare progressively.":"Controlled vertical speed at touchdown.",n.touchdown.alignment>10?"Align with the runway before the flare.":"Good runway alignment."]:["Practice a stabilized approach at 60\u201370 kt.","Keep an airport within gliding range."]}}function Ju(n=globalThis.localStorage){try{let e=JSON.parse(n.getItem("skyforge-save-v1"));if(e?.version!==1||!Array.isArray(e.logs)||!Array.isArray(e.training))return null;let t=e.settings||{};return{version:1,settings:{sensitivity:at(Number(t.sensitivity)||1,.3,2),invert:!!t.invert,deadzone:at(Number(t.deadzone)||.12,.02,.5),quality:["low","medium","high"].includes(t.quality)?t.quality:"medium",volume:at(Number(t.volume)||0,0,1)},config:e.config||{},training:e.training.filter(s=>typeof s=="string"),logs:e.logs.slice(-20),aircraft:kt.name}}catch{return null}}function Ku(n,e=globalThis.localStorage){try{return e.setItem("skyforge-save-v1",JSON.stringify({...n,version:1,logs:n.logs.slice(-20)})),!0}catch{return!1}}var j0=n=>Math.max(0,Math.min(255,Math.round(n))),e_=n=>Math.max(0,Math.sin((n-6)/12*Math.PI)),dn=(n,e={})=>new Fn({color:n,roughness:.65,...e});function Qu(n,e="medium",t=()=>{}){let i=new tl({canvas:n,antialias:!0,powerPreference:"high-performance"});i.setPixelRatio(Math.min(devicePixelRatio,e==="high"?1.75:e==="low"?1:1.25)),i.shadowMap.enabled=e!=="low",i.shadowMap.type=na,i.outputColorSpace=Wt,i.toneMapping=ua;let s=new Ii;s.fog=new dr(10992838,8e-5);let r=new Us(i),o=new il,a=r.fromScene(o,.04);s.environment=a.texture,s.environmentIntensity=.45,o.dispose(),r.dispose();let l=new zt(64,1,.08,28e3),c=new Ir(12443647,3687210,2);s.add(c);let h=new Ur(16772562,3);h.castShadow=!0,h.shadow.mapSize.set(1024,1024),Object.assign(h.shadow.camera,{left:-55,right:55,top:55,bottom:-55,near:1,far:350}),h.shadow.bias=-2e-4,s.add(h,h.target);let u=new Hr;u.scale.setScalar(25e3),s.add(u);let d=u.material.uniforms;d.turbidity.value=4,d.rayleigh.value=1.6,d.mieCoefficient.value=.006,d.mieDirectionalG.value=.8;let f=new Zt({uniforms:{time:{value:0},color:{value:new We(1340042)},light:{value:1}},vertexShader:"uniform float time; varying vec3 wp; varying float wave; void main(){vec3 p=position;p.z+=sin(p.x*.009+time)*.65+cos(p.y*.006+time*.7)*.5;wave=p.z;wp=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"uniform vec3 color;uniform float light;varying vec3 wp;varying float wave;void main(){float glint=pow(max(0.,sin(wp.x*.01+wp.y*.015)),25.);gl_FragColor=vec4((color*(.75+wave*.06)+vec3(glint*.18))*light,1.);}"}),g=new mt(new Qn(7e4,7e4,150,150),f);g.rotation.x=-Math.PI/2,s.add(g);let v=document.createElement("canvas");v.width=256,v.height=256;let m=v.getContext("2d"),p=m.createImageData(256,256);for(let F=0;F<256*256;F++){let ve=F%256,$e=Math.floor(F/256),Qe=Math.sin(ve*12.9898+$e*78.233)*43758.5453%1,xt=j0(165+Qe*38+12*Math.sin(ve*.16)*Math.cos($e*.11));p.data.set([xt,xt,xt,255],F*4)}m.putImageData(p,0,0);let C=new hi(v);C.wrapS=C.wrapT=hs,C.repeat.set(60,60),C.colorSpace=Wt;let T=new Fn({vertexColors:!0,roughness:1,map:C,bumpMap:C,bumpScale:.4}),y=new Map,A=2e3,R=e==="low"?2:3,L=dn(2707255),N=dn(7492410),S=dn(11252398),M=new bs(6,24,5),P=new Je(1,1,1);function k(F,ve){let $e=`${F},${ve}`;if(y.has($e))return;let xt=Math.max(Math.abs(F-Math.floor(G/A)),Math.abs(ve-Math.floor(q/A)))<=1?32:16,tt=new Qn(A,A,xt,xt);tt.rotateX(-Math.PI/2);let st=tt.attributes.position,bt=new Float32Array(st.count*3),x=new We;for(let _e=0;_e<st.count;_e++){let Me=st.getX(_e)+F*A+A/2,Fe=st.getZ(_e)+ve*A+A/2,Be=Os(Me,Fe);st.setY(_e,Be),x.set(Be<4?12363385:Be>1050?12632761:Be>550?7566939:5403467),x.multiplyScalar(.88+.12*Math.sin(Me*.01)*Math.sin(Fe*.009)),x.toArray(bt,_e*3)}tt.setAttribute("color",new Pt(bt,3)),tt.computeVertexNormals();let w=new an,O=new mt(tt,T);O.receiveShadow=!0,w.add(O),w.position.set(F*A+A/2,0,ve*A+A/2);let z=e==="low"?25:70,U=new Nn(M,L,z),K=new Nn(P,S,14),ge=new _t;for(let _e=0;_e<z;_e++){let Me=(Math.sin((F*67+ve*131+_e)*12.9898)*43758.5453%1+1)%1*A-A/2,Fe=(Math.sin((F*29+ve*93+_e)*7.178)*14583.1%1+1)%1*A-A/2,Be=Me+w.position.x,Ne=Fe+w.position.z,Ze=Os(Be,Ne),ht=Ze>8&&Ze<750&&!Ft.some(vt=>Math.hypot(vt.x-Be,vt.z-Ne)<1100);ge.position.set(Me,Ze+12,Fe),ge.scale.setScalar(ht?1:0),ge.updateMatrix(),U.setMatrixAt(_e,ge.matrix)}w.add(U);for(let _e=0;_e<14;_e++){let Me=-400+_e%5*85,Fe=-280+Math.floor(_e/5)*90,Be=Os(Me+w.position.x,Fe+w.position.z),Ne=Be>8&&!Ft.some(Ze=>Math.hypot(Ze.x-Me-w.position.x,Ze.z-Fe-w.position.z)<1e3);ge.position.set(Me,Be+15,Fe),ge.scale.set(Ne?40:0,Ne?30+_e%4*12:0,Ne?35:0),ge.updateMatrix(),K.setMatrixAt(_e,ge.matrix)}w.add(K),s.add(w),y.set($e,{group:w,geo:tt})}let G=0,q=0,$="";function Y(F,ve){G=F,q=ve;let $e=Math.floor(F/A),Qe=Math.floor(ve/A),xt=`${$e},${Qe}`;if(xt!==$){$=xt;for(let[tt,st]of y){let[bt,x]=tt.split(",").map(Number);(Math.abs(bt-$e)>R||Math.abs(x-Qe)>R)&&(s.remove(st.group),st.geo.dispose(),st.group.traverse(w=>{w.isInstancedMesh&&w.dispose()}),y.delete(tt))}for(let tt=-R;tt<=R;tt++)for(let st=-R;st<=R;st++)k($e+tt,Qe+st)}}function V(F,ve,$e,Qe=0,xt=0,tt=0){let st=new mt(ve,$e);return st.position.set(Qe,xt,tt),st.castShadow=!0,st.receiveShadow=!0,F.add(st),st}let W=dn(3159608),fe=dn(15526102),ye=dn(8953002),we=[];for(let F of Ft){let ve=new an;ve.position.set(F.x,F.elevation+.08,F.z),ve.rotation.y=F.heading,s.add(ve),V(ve,new Je(F.width,.12,F.length),W),V(ve,new Je(14,.1,F.length*.65),W,85,0,0),V(ve,new Je(110,.1,180),W,70,0,-F.length*.25);for(let w=-F.length/2+35;w<F.length/2;w+=60)V(ve,new Je(1.2,.03,25),fe,0,.08,w);for(let w of[-1,1])for(let O=-3;O<=3;O++)V(ve,new Je(2,.03,32),fe,O*4,.1,w*(F.length/2-30));for(let w=0;w<4;w++)V(ve,new Je(45,19,42),ye,155,9.5,-F.length*.25+w*65);V(ve,new Je(26,33,24),ye,190,16.5,100);let $e=V(ve,new ln(.3,.3,12,8),fe,55,6,F.length/2-90),Qe=V(ve,new bs(1.5,7,10,1,!0),dn(16742717),55,11,F.length/2-90);Qe.rotation.z=Math.PI/2,we.push({sock:Qe,pole:$e});let xt=new en({color:16767883});for(let w=-F.length/2;w<F.length/2;w+=80)for(let O of[-1,1])V(ve,new hn(.7,6,4),xt,O*(F.width/2+2),.5,w);for(let w=0;w<5;w++)V(ve,new Je(22,.08,1),xt,0,.2,-F.length/2-30-w*35);let tt=document.createElement("canvas");tt.width=512,tt.height=96;let st=tt.getContext("2d");st.fillStyle="#def5ff",st.font="bold 38px sans-serif",st.fillText(`${F.id} \xB7 ${F.name}`,8,62);let bt=new hi(tt),x=new pr(new xs({map:bt,transparent:!0,depthTest:!1}));x.position.set(0,80,0),x.scale.set(230,43,1),ve.add(x)}s.updateMatrixWorld(!0);for(let F of s.children.filter(ve=>ve.isGroup)){let ve=new Map;F.traverse($e=>{if($e.isMesh){let Qe=ve.get($e.material)||[];Qe.push($e),ve.set($e.material,Qe)}});for(let[$e,Qe]of ve){if(Qe.length<3)continue;let xt=Qe.map(bt=>{let x=bt.geometry.clone();return x.applyMatrix4(bt.matrix),x}),tt=Zu(xt);if(xt.forEach(bt=>bt.dispose()),!tt)continue;Qe.forEach(bt=>{F.remove(bt),bt.geometry.dispose()});let st=V(F,tt,$e);st.castShadow=!1}}let le=new an;s.add(le);let Ie=new Cr({color:15263192,metalness:.18,roughness:.3,clearcoat:.7,clearcoatRoughness:.2}),ze=dn(3753292,{roughness:.8}),He=dn(13063477),J=dn(1383198),se=dn(10213091,{transparent:!0,opacity:.14,metalness:.25,roughness:.12,depthWrite:!1}),Ae=V(le,new ln(.55,.7,2.2,20),Ie,0,.8,2.2);Ae.rotation.x=Math.PI/2;let Oe=V(le,new ln(.7,.2,3.3,20),Ie,0,1,-2.35);Oe.rotation.x=Math.PI/2,V(le,new Je(1.65,.24,2),Ie,0,.45,.1),V(le,new Je(1.65,1.35,2),se,0,1.7,.1);function Le(F,ve){let $e=new ws;$e.moveTo(-ve*.5,0),$e.bezierCurveTo(-ve*.55,.08,-ve*.2,.16,ve*.5,.015),$e.bezierCurveTo(ve*.1,-.035,-ve*.35,-.045,-ve*.5,0);let Qe=new Er($e,{depth:F,steps:1,bevelEnabled:!1,curveSegments:16});return Qe.translate(0,0,-F/2),Qe.rotateY(Math.PI/2),Qe.computeVertexNormals(),Qe}V(le,Le(10.8,1.55),Ie,0,2.55,-.25);for(let F of[-1,1])V(le,new Je(.04,.22,1.6),He,F*5.35,2.5,-.25),V(le,new Je(.025,.15,4),He,F*.73,.9,-.8);let et=new Nn(new hn(.012,5,4),dn(10003625,{metalness:.8,roughness:.25}),80),lt=new _t;for(let F=0;F<80;F++)lt.position.set((F%2?1:-1)*.72,.57+Math.floor(F/2)%2*.5,-2.6+Math.floor(F/4)*.24),lt.updateMatrix(),et.setMatrixAt(F,lt.matrix);le.add(et),V(le,new Je(4,.12,1.15),Ie,0,1,-3.1),V(le,new Je(.14,1.7,1.25),Ie,0,1.7,-3.2);let E=[],ie=[];for(let F of[-1,1]){V(le,new Je(.08,.08,3),ze,F*1.8,1.65,-.1).rotation.z=F*.9;let ve=V(le,new Je(2.3,.1,.35),He,F*4.1,2.53,-1.15);E.push(ve);let $e=V(le,new Je(2.1,.1,.4),Ie,F*1.65,2.53,-1.18);ie.push($e),V(le,new Je(.05,1.4,.06),ze,F*.84,1.55,.92).rotation.z=F*.08,V(le,new Je(.05,1.4,.06),ze,F*.84,1.55,-.88),V(le,new Je(.05,.05,1.8),ze,F*.85,2.2,0);let Qe=V(le,new ln(.29,.29,.22,16),J,F*1.1,-.7,-.65);Qe.rotation.z=Math.PI/2,V(le,new Je(.1,.85,.12),Ie,F*.9,-.25,-.65).rotation.z=F*.4,V(le,new Je(.54,.09,.44),ze,F*.43,.03,.42),V(le,new Je(.56,.65,.14),ze,F*.43,.4,-.08).rotation.x=-.13}let ne=V(le,new ln(.23,.23,.18,16),J,0,-.8,2);ne.rotation.z=Math.PI/2,V(le,new ln(.05,.05,.9),ze,0,-.35,2);let j=V(le,new Je(3.7,.1,.35),He,0,1,-3.7),Q=V(le,new Je(.12,1.5,.35),He,0,1.7,-3.83),he=new an;he.position.set(0,1,3.37),le.add(he),V(he,new Je(.15,2.4,.08),ze),V(he,new hn(.22,12,8),Ie,0,0,.1),V(le,new Je(1.62,.74,.16),ze,0,1.15,1.04),V(le,new Je(1.65,.12,.7),ze,0,1.55,1.25);let ae=new fi(14018293,7,4,2);ae.position.set(0,1.75,-.4),le.add(ae);let me=V(he,new Ss(1.2,40),new en({color:6911360,transparent:!0,opacity:.1,side:xn,depthWrite:!1}),0,0,.04),Xe=V(le,new Ar(.2,.027,8,16,Math.PI*1.5),ze,-.43,1.02,.68);Xe.rotation.z=Math.PI*.25,V(le,new ln(.028,.028,.38,8),ze,-.43,1.02,.86).rotation.x=Math.PI/2;let Ge=[],b=[],_=[],B=["IAS","ATT","ALT","TURN","HDG","V/S"];for(let F=0;F<6;F++){let ve=-.65+F%3*.24,$e=1.32-Math.floor(F/3)*.25;V(le,new ln(.106,.106,.035,24),J,ve,$e,.935).rotation.x=Math.PI/2;let Qe=document.createElement("canvas");Qe.width=256,Qe.height=256;let xt=new hi(Qe),tt=V(le,new Ss(.089,24),new en({map:xt}),ve,$e,.914);tt.rotation.y=Math.PI,_.push({canvas:Qe,texture:xt});let st=V(le,new Je(.007,.069,.003),new en({color:15658700}),ve,$e+.025,.908),bt=new an;bt.position.set(ve,$e,.904),le.add(bt),st.position.set(0,.027,0),bt.add(st),b.push(bt);for(let x=0;x<12;x++){let w=x*Math.PI/6,O=V(le,new Je(.005,.012,.002),fe,ve+Math.sin(w)*.076,$e+Math.cos(w)*.076,.907);O.rotation.z=-w}}let H=document.createElement("canvas");H.width=512,H.height=512;let X=H.getContext("2d"),Z=new hi(H),De=V(le,new Qn(.54,.48),new en({map:Z}),.36,1.22,.912);De.rotation.y=Math.PI;for(let[F,ve,$e]of[["battery",-.64,7653608],["ignition",-.4,11913601],["starter",-.16,14723682],["landingLights",.1,15658669],["panelLights",.34,15115385]]){let Qe=V(le,new Je(.12,.065,.055),dn($e),ve,.85,.899);Qe.userData.control=F,Ge.push(Qe)}let ue=V(le,new hn(.055,10,8),ze,.58,.85,.85);ue.userData.control="throttle",Ge.push(ue);let Pe=V(le,new hn(.055,10,8),He,.72,.85,.85);Pe.userData.control="mixture",Ge.push(Pe);let Re=new fi(16758381,0,5);Re.position.set(0,1.9,.5),le.add(Re);let oe=new Lr(16771254,0,300,.28,.6);oe.position.set(0,.3,2.8),oe.target.position.set(0,-1,70),le.add(oe,oe.target);let Te=V(le,new hn(.07,8,6),new en({color:16724770}),0,2.65,-3.2),ke=[];for(let F of[-1,1])ke.push(V(le,new hn(.09,8,6),new en({color:16777215}),F*5.45,2.55,0));let Ue=[];for(let[F,ve]of[[-5.4,16724016],[5.4,3604341],[0,16777215]]){let $e=V(le,new hn(.075,8,6),new en({color:ve}),F,2.58,F?-.3:-3.3);Ue.push($e)}let xe=new Li({color:15790315,transparent:!0,opacity:.7,depthWrite:!1}),Ye=new Nn(new hn(1,8,5),xe,90);s.add(Ye);let D=new _t,ce=new Lt,pe=new Float32Array(1200*3);for(let F=0;F<1200;F++)pe[F*3]=F*71%200-100,pe[F*3+1]=F*37%150,pe[F*3+2]=F*47%200-100;ce.setAttribute("position",new Pt(pe,3));let Ee=new mr(ce,new Ms({color:11192541,size:.2,transparent:!0,opacity:.65}));s.add(Ee);let re="cockpit",te=0,Ce=0,qe=64,ct=.55,it=new I(0,100,0),fn=0,Jt=0,ks=new Nr;n.addEventListener("click",F=>{if(re!=="cockpit")return;let ve=n.getBoundingClientRect();ks.setFromCamera(new de((F.clientX-ve.left)/ve.width*2-1,-(F.clientY-ve.top)/ve.height*2+1),l);let $e=ks.intersectObjects(Ge)[0];$e&&t($e.object.userData.control)}),n.addEventListener("contextmenu",F=>F.preventDefault()),n.addEventListener("pointermove",F=>{F.buttons===2&&(te-=F.movementX*.003,Ce=Math.max(-1,Math.min(.75,Ce-F.movementY*.003)),ct+=F.movementX*.003)}),n.addEventListener("wheel",F=>{F.preventDefault(),qe=Math.max(35,Math.min(90,qe+F.deltaY*.025))},{passive:!1});function zn(F){re=F,te=0,Ce=0,F==="free"&&it.copy(l.position)}function xi(){let F=n.clientWidth,ve=n.clientHeight;i.setSize(F,ve,!1),l.aspect=F/ve,l.updateProjectionMatrix()}window.addEventListener("resize",xi),xi();let Mn=new I,vi=new _n,kn=new I,Vs=new I;function Wi(F,ve,$e={}){let Qe=Math.min(.1,Jt?ve-Jt:.016666666666666666);Jt=ve,Y(F.x,F.z),Mn.set(F.x,F.y,F.z),le.position.copy(Mn),le.rotation.set(-F.pitch,F.heading,-F.roll,"YXZ"),vi.copy(le.quaternion),he.rotation.z+=F.systems.rpm/60*Math.PI*2*Qe,E.forEach((w,O)=>w.rotation.x=(O?1:-1)*F.controls.aileron*.35),ie.forEach(w=>w.rotation.x=F.controls.flaps*.5),j.rotation.x=-F.controls.elevator*.35,Q.rotation.y=F.controls.rudder*.35,Xe.rotation.z=Math.PI*.25-F.controls.aileron*.5,Xe.position.z=.68-F.controls.elevator*.07,Te.visible=F.systems.voltage>20&&F.systems.beacon&&Math.sin(ve*5)>0,ke.forEach(w=>w.visible=F.systems.voltage>20&&F.systems.strobe&&ve%1<.12),me.visible=F.systems.rpm>1e3,ae.intensity=e_(F.hour)*7+.15,Re.intensity=F.systems.voltage>20&&F.systems.panelLights?3:0,oe.intensity=F.systems.voltage>20&&F.systems.landingLights?500:0,Ue.forEach(w=>w.visible=F.systems.voltage>20&&F.systems.navLights);let xt=Math.sin((F.hour-6)/12*Math.PI),tt=Math.max(.025,xt),st=new I(.35,xt,.5).normalize();d.sunPosition.value.copy(st),u.visible=tt>.05,s.background=new We().setRGB(.025+tt*.16,.035+tt*.3,.07+tt*.48),c.intensity=.15+tt*1.9,h.intensity=tt*3,h.position.copy(Mn).addScaledVector(st,180),h.target.position.copy(Mn);let bt=new We().setRGB(.035+tt*.6,.05+tt*.65,.075+tt*.66);s.fog.color.copy(bt),s.fog.density=2.2/F.weather.visibility,i.setClearColor(bt),f.uniforms.time.value=ve,f.uniforms.light.value=.12+tt,g.position.set(F.x,0,F.z),xe.opacity=.25+F.weather.cloud*.6,xe.color.setScalar(.15+tt*.85);for(let w=0;w<90;w++)D.position.set(F.x+(w*1747+ve*9)%15e3-7500,1200+w%4*230,F.z+w*2377%15e3-7500),D.scale.set(130+w%5*35,45+w%4*18,90+w%7*25),D.updateMatrix(),Ye.setMatrixAt(w,D.matrix);if(Ye.instanceMatrix.needsUpdate=!0,Ye.count=Math.floor(F.weather.cloud*90),Ee.visible=F.weather.rain>0,Ee.position.copy(Mn),Ee.visible){for(let w=0;w<1200;w++)pe[w*3+1]=(w*37%150-ve*45%150+150)%150-30;ce.attributes.position.needsUpdate=!0}we.forEach(({sock:w})=>w.rotation.y=ol(F.weather.direction)),re==="cockpit"?(kn.set(-.43,1.65,-.2).applyQuaternion(vi),l.position.copy(Mn).add(kn),l.quaternion.copy(vi).multiply(new _n().setFromEuler(new jt(Ce,Math.PI+te,0,"YXZ")))):re==="chase"?(kn.set(Math.sin(ct)*13,5,-Math.cos(ct)*15).applyQuaternion(vi),Vs.copy(Mn).add(kn),l.position.lerp(Vs,1-Math.exp(-Qe*8)),l.lookAt(Mn.clone().add(new I(0,1,0)))):(it.x+=($e.x||0)*120*Qe,it.y+=($e.y||0)*120*Qe,it.z+=($e.z||0)*120*Qe,l.position.copy(it),l.rotation.set(Ce,te+Math.PI,0,"YXZ")),l.fov=qe,l.updateProjectionMatrix();let x=F.systems.voltage>20;if(b[0].rotation.z=x?-Wr(F)/80*Math.PI*1.7:0,b[1].rotation.z=x?F.roll:0,b[2].rotation.z=x?-F.y/304.8*Math.PI*2:0,b[3].rotation.z=x?-F.r*4:0,b[4].rotation.z=x?F.heading:0,b[5].rotation.z=x?-F.vy/10*Math.PI*.8:0,ve-fn>.2){fn=ve;let w=[`${Math.round(Wr(F)*1.94384)} KT`,`${Math.round(F.pitch*180/Math.PI)} DEG`,`${Math.round(F.y*3.28084)} FT`,`${(F.r*180/Math.PI).toFixed(1)} DEG/S`,`${Math.round((F.heading*180/Math.PI+360)%360)} DEG`,`${Math.round(F.vy*196.85)} FPM`];if(_.forEach(({canvas:O,texture:z},U)=>{let K=O.getContext("2d");K.fillStyle="#101c23",K.fillRect(0,0,256,256),x&&U===1&&(K.save(),K.translate(128,128),K.rotate(F.roll),K.translate(0,F.pitch*150),K.fillStyle="#5b92ad",K.fillRect(-220,-350,440,350),K.fillStyle="#8b6b45",K.fillRect(-220,0,440,350),K.strokeStyle="#f6e5af",K.lineWidth=3,K.beginPath(),K.moveTo(-180,0),K.lineTo(180,0),K.stroke(),K.restore()),K.fillStyle=x?"#cde1d8":"#34464e",K.textAlign="center",K.font="bold 26px monospace",K.fillText(B[U],128,75),K.font="22px monospace",K.fillText(x?w[U]:"OFF",128,195),z.needsUpdate=!0}),X.fillStyle=x?"#081c22":"#040506",X.fillRect(0,0,512,512),x){X.strokeStyle="#2a4e58";for(let z=0;z<512;z+=64)X.beginPath(),X.moveTo(z,0),X.lineTo(z,512),X.moveTo(0,z),X.lineTo(512,z),X.stroke();let O=.017;for(let z of Ft){let U=256+(z.x-F.x)*O,K=260-(z.z-F.z)*O;X.fillStyle="#69d7dd",X.fillRect(U-4,K-4,8,8),X.font="20px monospace",X.fillText(z.id,U+8,K)}X.strokeStyle="#ffd487",X.beginPath(),X.moveTo(256,260);for(let z of F.route)X.lineTo(256+(z.x-F.x)*O,260-(z.z-F.z)*O);X.stroke(),X.save(),X.translate(256,260),X.rotate(F.heading),X.fillStyle="#ffffff",X.beginPath(),X.moveTo(0,-16),X.lineTo(-9,12),X.lineTo(9,12),X.fill(),X.restore(),X.fillStyle="#b8e5dc",X.font="22px monospace",X.fillText(`RPM ${Math.round(F.systems.rpm)} FUEL ${F.systems.fuel.toFixed(1)}L`,12,34),X.fillText(`OIL ${Math.round(F.systems.oilPressure)}psi ${Math.round(F.systems.oilTemp)}C`,12,470),X.fillText("COM 122.80 \xB7 NAV 110.50 (fictional)",12,500)}Z.needsUpdate=!0}return i.render(s,l),{drawCalls:i.info.render.calls,triangles:i.info.render.triangles,chunks:y.size,camera:re}}return{render:Wi,setCamera:zn,resize:xi,renderer:i,camera:l,scene:s,aircraft:le,get mode(){return re}}}var ee=n=>document.getElementById(n),ed=Ju(),Rt=ed||{version:1,settings:{sensitivity:1,invert:!1,deadzone:.12,quality:"medium",volume:0},config:{},training:[],logs:[]},be=ll({start:"air"}),Vt=null,yn=!1,tn=!1,qr=0,Xr=0,ju=0,In=[],Yr={},ul=!1,Gc={},Hi=0,zs=0,Tt=new Set,Bt=null;function t_(n){hl=n}var hl="",Ct=n=>Number(n).toFixed(0),td=n=>n*1.94384,$r=n=>n*3.28084;function n_(n){ee(n).replaceChildren(...Ft.map(e=>{let t=document.createElement("option");return t.value=e.id,t.textContent=`${e.id} \xB7 ${e.name}`,t}))}["departure","destination","mapDestination"].forEach(n_);ee("destination").value="SF02";function Hc(){let n=Ft.find(e=>e.id===ee("departure").value);ee("runway").replaceChildren(...n.runways.map(e=>{let t=document.createElement("option");return t.value=e,t.textContent=`Runway ${e} \xB7 ${n.length} m`,t}))}ee("departure").addEventListener("change",Hc);Hc();for(let n of["mode","start","departure","destination","weather","hour"])Rt.config[n]!==void 0&&(ee(n).value=Rt.config[n]);Hc();Rt.config.runway&&(ee("runway").value=Rt.config.runway);for(let n of["sensitivity","deadzone","quality","volume"])ee(n).value=Rt.settings[n];ee("invert").checked=Rt.settings.invert;ee("hourLabel").value=`${ee("hour").value}:00`;function nd(){let n=rl[ee("weather").value];ee("wind").value=n.wind,ee("windDirection").value=n.direction,ee("visibility").value=n.visibility/1e3}nd();ee("weather").addEventListener("change",nd);ee("hour").addEventListener("input",()=>{ee("hourLabel").value=`${ee("hour").value}:00`});ee("saveInfo").textContent=`Local flight log: ${Rt.logs.length} flights \xB7 training stages completed: ${Rt.training.length}/6. ${ed?"Preferences restored.":""}`;function Jr(){return Rt.settings={sensitivity:Number(ee("sensitivity").value),invert:ee("invert").checked,deadzone:Number(ee("deadzone").value),quality:ee("quality").value,volume:Number(ee("volume").value)},Rt.config=Gc,Ku(Rt)}function Zr(n){ee(n).hidden=!ee(n).hidden}function Wc(){yn&&(tn=!tn,ee("pause").hidden=!tn,Tt.clear())}function Xc(n){yn&&(n==="starter"?(be.systems.starter=!0,setTimeout(()=>be.systems.starter=!1,1200)):n==="throttle"?be.controls.throttle=at(be.controls.throttle+.1,0,1):n==="mixture"?be.controls.mixture=be.controls.mixture>.1?0:1:be.systems[n]=!be.systems[n],o_(),Kr())}function dl(n){Vt?.setCamera(n),Tt.clear(),document.querySelectorAll("[data-camera]").forEach(e=>e.classList.toggle("active",e.dataset.camera===n))}function qc(){Gc={mode:ee("mode").value,start:ee("start").value,ready:ee("start").value==="ready",departure:ee("departure").value,destination:ee("destination").value,runway:ee("runway").value,weather:ee("weather").value,hour:Number(ee("hour").value),customWeather:{wind:at(Number(ee("wind").value),0,25),direction:at(Number(ee("windDirection").value),0,359),visibility:at(Number(ee("visibility").value),1,40)*1e3}},be=ll(Gc),yn=!0,tn=!1,ul=!1,qr=0,Tt.clear(),dl("cockpit"),["setup","pause","debrief"].forEach(n=>ee(n).hidden=!0),["hud","flightInfo","cameraBar"].forEach(n=>ee(n).hidden=!1),ee("mapDestination").value=be.destination,Jr(),Kr(),ee("flightCanvas").focus()}ee("flightForm").addEventListener("submit",n=>{n.preventDefault(),qc()});ee("pauseToggle").onclick=Wc;ee("resume").onclick=Wc;ee("restart").onclick=qc;ee("debriefRestart").onclick=qc;function id(){yn=!1,tn=!1,Tt.clear(),["pause","debrief","hud","flightInfo","cameraBar","systems","mapPanel","controls"].forEach(n=>ee(n).hidden=!0),ee("setup").hidden=!1,be=ll({start:"air"}),ee("saveInfo").textContent=`Local flight log: ${Rt.logs.length} flights \xB7 training stages completed: ${Rt.training.length}/6.`}ee("dispatch").onclick=id;ee("debriefDispatch").onclick=id;ee("mapToggle").onclick=()=>Zr("mapPanel");ee("helpToggle").onclick=()=>Zr("controls");ee("systemsToggle").onclick=()=>Zr("systems");document.querySelectorAll("[data-close]").forEach(n=>n.onclick=()=>ee(n.dataset.close).hidden=!0);document.querySelectorAll("[data-camera]").forEach(n=>n.onclick=()=>dl(n.dataset.camera));document.querySelectorAll("[data-system]").forEach(n=>n.onclick=()=>Xc(n.dataset.system));document.querySelectorAll("[data-failure]").forEach(n=>n.onclick=()=>{let e=n.dataset.failure;be.failures[e]=!be.failures[e],Kr()});for(let n of["throttle","mixture","trim","flaps"])ee(n).addEventListener("input",()=>{be.controls[n]=Number(ee(n).value)});for(let n of["sensitivity","deadzone","quality","invert","volume"])ee(n).addEventListener("change",()=>{Jr(),n==="quality"&&Vt&&(Vt.renderer.setPixelRatio(Math.min(devicePixelRatio,{low:1,medium:1.25,high:1.75}[ee("quality").value])),Vt.renderer.shadowMap.enabled=ee("quality").value!=="low",Vt.resize())});ee("mapDestination").onchange=()=>{be.destination=ee("mapDestination").value;let n=Ft.find(e=>e.id===be.destination);be.route=[{id:n.id,name:n.name,x:n.x,z:n.z}],be.waypoint=0,fl()};ee("addWaypoint").onclick=()=>{let n=Number(ee("waypointX").value)*1e3,e=Number(ee("waypointZ").value)*1e3;!Number.isFinite(n)||!Number.isFinite(e)||Math.abs(n)>1e5||Math.abs(e)>1e5||(be.route.splice(Math.max(0,be.route.length-1),0,{id:`WP${be.route.length}`,name:`Waypoint ${be.route.length}`,x:n,z:e}),fl())};function fl(){let n=ee("routeList");n.replaceChildren(),be.route.forEach((e,t)=>{let i=document.createElement("li");if(i.textContent=`${t===be.waypoint?"\u2192 ":""}${e.name} (${(e.x/1e3).toFixed(1)}, ${(e.z/1e3).toFixed(1)} km)`,be.route.length>1&&t<be.route.length-1){let s=document.createElement("button");s.textContent="Remove",s.onclick=()=>{be.route.splice(t,1),be.waypoint=Math.min(be.waypoint,be.route.length-1),fl()},i.appendChild(s)}n.appendChild(i)})}var i_=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyS","KeyA","KeyD","KeyB","KeyE","KeyF","BracketLeft","BracketRight","KeyC","Digit1","Digit2","Digit3","KeyQ","KeyZ"];window.addEventListener("keydown",n=>{if(!(["INPUT","SELECT","TEXTAREA","BUTTON"].includes(document.activeElement?.tagName)&&n.code!=="Escape")){if(n.code==="Escape"){n.preventDefault(),Wc();return}!yn||tn||(i_.includes(n.code)&&(n.preventDefault(),Tt.add(n.code)),!n.repeat&&(n.code==="KeyM"&&(n.preventDefault(),Zr("mapPanel")),n.key==="?"&&Zr("controls"),n.code==="KeyE"&&Xc("starter"),n.code==="KeyF"&&(be.controls.flaps=be.controls.flaps>=.99?0:Math.min(1,be.controls.flaps+.33)),n.code==="BracketLeft"&&(be.controls.trim=at(be.controls.trim-.05,-1,1)),n.code==="BracketRight"&&(be.controls.trim=at(be.controls.trim+.05,-1,1)),n.code==="KeyC"&&dl(["cockpit","chase","free"][(["cockpit","chase","free"].indexOf(Vt.mode)+1)%3]),n.code.startsWith("Digit")&&["Digit1","Digit2","Digit3"].includes(n.code)&&dl(["cockpit","chase","free"][Number(n.code.slice(-1))-1])))}});window.addEventListener("keyup",n=>Tt.delete(n.code));window.addEventListener("blur",()=>{Tt.clear(),yn&&!tn&&(tn=!0,ee("pause").hidden=!1)});document.addEventListener("visibilitychange",()=>{document.hidden&&yn&&(tn=!0,Tt.clear(),ee("pause").hidden=!1)});function s_(n){let e=be.controls,t=Rt.settings.sensitivity,i=Vt.mode==="free",s=i?0:(Number(Tt.has("ArrowDown"))-Number(Tt.has("ArrowUp")))*t*(Rt.settings.invert?-1:1),r=i?0:(Number(Tt.has("ArrowRight"))-Number(Tt.has("ArrowLeft")))*t,o=i?0:(Number(Tt.has("KeyD"))-Number(Tt.has("KeyA")))*t;i||(e.throttle=at(e.throttle+(Number(Tt.has("KeyW"))-Number(Tt.has("KeyS")))*n*.25,0,1),e.brake=Tt.has("KeyB")?1:0);let a=navigator.getGamepads?.()[0];if(a&&!i){let l=Rt.settings.deadzone,c=h=>Math.abs(h)>l?Math.sign(h)*(Math.abs(h)-l)/(1-l):0;r+=c(a.axes[0]||0)*t,s+=c(a.axes[1]||0)*t*(Rt.settings.invert?-1:1),o+=c(a.axes[2]||0),e.throttle=at(e.throttle+((a.buttons[7]?.value||0)-(a.buttons[6]?.value||0))*n*.3,0,1),e.brake=Math.max(e.brake,a.buttons[0]?.value||0)}e.elevator+=(at(s,-1,1)-e.elevator)*Math.min(1,n*4),e.aileron+=(at(r,-1,1)-e.aileron)*Math.min(1,n*4),e.rudder+=(at(o,-1,1)-e.rudder)*Math.min(1,n*4)}function sd(n,e=!1){let t=n.getContext("2d"),i=n.width,s=n.height;t.fillStyle="#081e26",t.fillRect(0,0,i,s);let r=(c,h)=>[i*.25+c/5e4*i,s*.88-h/36e3*s];t.strokeStyle="#284955",t.lineWidth=1;for(let c=0;c<10;c++)t.beginPath(),t.moveTo(c*i/10,0),t.lineTo(c*i/10,s),t.moveTo(0,c*s/10),t.lineTo(i,c*s/10),t.stroke();t.strokeStyle="#ceac6c",t.beginPath();let o=Ft.find(c=>c.id===be.departure);t.moveTo(...r(o.x,o.z));for(let c of be.route)t.lineTo(...r(c.x,c.z));t.stroke(),t.strokeStyle="#67c7bd",t.lineWidth=2,t.beginPath(),be.flightPath.forEach((c,h)=>{let u=r(c.x,c.z);h?t.lineTo(...u):t.moveTo(...u)}),t.stroke();for(let c of Ft){let[h,u]=r(c.x,c.z);t.fillStyle="#d4e4e1",t.fillRect(h-4,u-4,8,8),t.font="12px monospace",t.fillText(c.name,h+10,u+4)}let[a,l]=r(be.x,be.z);if(t.save(),t.translate(a,l),t.rotate(be.heading),t.fillStyle="#ffffff",t.beginPath(),t.moveTo(0,-12),t.lineTo(-7,8),t.lineTo(7,8),t.fill(),t.restore(),!e){let c=al(be);ee("mapInfo").textContent=`To ${c.target.name}: ${(c.distance/1e3).toFixed(2)} km \xB7 bearing ${Ct(c.bearing)}\xB0 \xB7 ETA ${c.eta===null?"\u2014":Ct(c.eta/60)+" min"} \xB7 ${Ct($r(be.y))} ft \xB7 ${Ct(td(be.airspeed))} kt \xB7 ${be.systems.fuel.toFixed(1)} L`}}function Kr(){if(!yn)return;let n=be,e=al(n),t=n.systems.voltage>20;ee("ias").textContent=Ct(td(Wr(n))),ee("alt").textContent=Ct($r(n.y)),ee("hdg").textContent=String(Math.round((gi(n.heading)+360)%360)).padStart(3,"0"),ee("vs").textContent=Ct($r(n.vy)*60),ee("rpm").textContent=Ct(n.systems.rpm),ee("fuel").textContent=`${n.systems.fuel.toFixed(1)} L \xB7 ${Ct(n.systems.voltage)} V`,hl&&(ee("objective").textContent=hl,hl=""),ee("warnings").textContent=n.warnings.join(" \xB7 "),ee("objective").textContent=n.objective+(n.grounded&&!n.systems.engine?" \u2014 There is no engine power yet: open Aircraft systems, then toggle Battery, Ignition and Start engine, or leave the dispatch screen set to Engine running / runway.":""),ee("navInfo").textContent=`${e.target.name} \xB7 ${(e.distance/1e3).toFixed(1)} km \xB7 BRG ${Ct(e.bearing)}\xB0 \xB7 course error ${Ct(e.error)}\xB0 \xB7 AGL ${Ct($r(n.y-Bs(n.x,n.z)))} ft`,ee("controlInfo").textContent=`THR ${Ct(n.controls.throttle*100)}% \xB7 PITCH ${Ct(gi(n.pitch))}\xB0 \xB7 BANK ${Ct(gi(n.roll))}\xB0 \xB7 RUDDER ${Ct(n.controls.rudder*100)}% \xB7 FLAPS ${Ct(n.controls.flaps*30)}\xB0 \xB7 TRIM ${Ct(n.controls.trim*100)}% \xB7 GEAR FIXED-DOWN \xB7 ${n.grounded?"ON GROUND \u2014 hold B to brake":"AIRBORNE"}`;let i=[...In].sort((r,o)=>r-o),s=In.reduce((r,o)=>r+o,0)/Math.max(1,In.length);ee("perf").textContent=`${s?(1e3/s).toFixed(0):"\u2014"} FPS \xB7 p95 ${i[Math.floor(i.length*.95)]?.toFixed(1)||"\u2014"} ms \xB7 ${Yr.drawCalls||0} calls \xB7 ${((Yr.triangles||0)/1e3).toFixed(0)}k triangles \xB7 ${Yr.chunks||0} terrain tiles`,document.querySelectorAll("[data-system]").forEach(r=>{let o=r.dataset.system,a=n.systems[o];r.classList.toggle("on",a),r.textContent=o==="starter"?"Start engine":`${o.replace(/([A-Z])/g," $1")} ${a?"ON":"OFF"}`});for(let r of["throttle","mixture","trim"])document.activeElement!==ee(r)&&(ee(r).value=n.controls[r]);document.activeElement!==ee("flaps")&&(ee("flaps").value=String([0,.33,.66,1].reduce((r,o)=>Math.abs(o-n.controls.flaps)<Math.abs(r-n.controls.flaps)?o:r))),ee("systemReadouts").textContent=`${n.systems.engine?"ENGINE RUNNING":"ENGINE STOPPED"} \xB7 ${Ct(n.systems.rpm)} RPM \xB7 OIL ${Ct(n.systems.oilPressure)} psi / ${Ct(n.systems.oilTemp)} \xB0C \xB7 BUS ${Ct(n.systems.voltage)} V \xB7 ${n.systems.batteryAh.toFixed(1)} Ah \xB7 gauges ${t?"powered":"OFF"}`,ee("mapPanel").hidden||(sd(ee("mapCanvas")),fl()),n.status!=="active"&&!ul&&Yc()}function Yc(){if(!yn)return;tn=!0,Tt.clear(),ee("pause").hidden=!0,ee("debrief").hidden=!1;let n=Vc(be);ul||(Rt.logs.push(n),Rt.logs=Rt.logs.slice(-20),Rt.training=[...new Set([...Rt.training,...be.achievements])],Jr(),ul=!0);let e=be.touchdown,t=ee("reportContent");t.replaceChildren();let i=document.createElement("div");i.className="report-grid";for(let[r,o]of[["Duration",`${(be.time/60).toFixed(1)} min`],["Distance",`${(be.distanceFlown/1e3).toFixed(1)} km`],["Fuel",`${be.fuelUsed.toFixed(1)} L`],["Peak altitude",`${Ct($r(be.peakAltitude))} ft`],["Landing score",e?`${e.score}/100`:"No touchdown"],["Descent at contact",e?`${e.verticalSpeed.toFixed(1)} m/s`:"\u2014"]]){let a=document.createElement("div"),l=document.createElement("strong"),c=document.createElement("small");l.textContent=o,c.textContent=r,a.append(l,c),i.appendChild(a)}t.appendChild(i);let s=document.createElement("p");s.className="muted",s.textContent=`${be.status.toUpperCase()} \xB7 ${n.suggestions.join(" ")}`,t.appendChild(s),sd(ee("reportMap"),!0)}ee("debriefToggle").onclick=Yc;ee("pauseDebrief").onclick=Yc;ee("exportReport").onclick=()=>{let n=new Blob([JSON.stringify(Vc(be),null,2)],{type:"application/json"}),e=URL.createObjectURL(n),t=document.createElement("a");t.href=e,t.download="skyforge-flight-report.json",t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)};function r_(){if(Bt)return;let n=new AudioContext,e=n.createGain(),t=n.createGain(),i=n.createGain(),s=n.createOscillator();e.connect(n.destination),t.connect(e),i.connect(e),s.type="sawtooth",s.connect(t),s.start();let r=n.createBuffer(1,n.sampleRate*2,n.sampleRate),o=r.getChannelData(0);for(let c=0;c<o.length;c++)o[c]=Math.random()*2-1;let a=n.createBufferSource(),l=n.createBiquadFilter();a.buffer=r,a.loop=!0,l.type="lowpass",l.frequency.value=550,a.connect(l),l.connect(i),a.start(),Bt={context:n,master:e,engine:t,env:i,osc:s}}function o_(){if(!Bt||Number(ee("volume").value)===0)return;let n=Bt.context.createOscillator(),e=Bt.context.createGain();n.frequency.value=700,e.gain.value=Number(ee("interfaceVolume").value)*.08,n.connect(e),e.connect(Bt.master),n.start(),e.gain.exponentialRampToValueAtTime(1e-4,Bt.context.currentTime+.05),n.stop(Bt.context.currentTime+.06)}function a_(){ee("audioToggle").textContent=Bt&&Number(ee("volume").value)>0?"Audio on":"Audio off"}ee("audioToggle").onclick=()=>{r_(),Bt.context.resume(),ee("volume").value=Number(ee("volume").value)>0?0:.35,Jr(),a_()};["pointerdown","keydown"].forEach(n=>document.addEventListener(n,()=>{Bt&&Bt.context.state==="suspended"&&Bt.context.resume()},{capture:!0}));function l_(){if(!Bt)return;let n=Bt.context.currentTime;Bt.master.gain.setTargetAtTime(Number(ee("volume").value),n,.05),Bt.engine.gain.setTargetAtTime(be.systems.rpm/2700*Number(ee("engineVolume").value)*.025,n,.1),Bt.osc.frequency.setTargetAtTime(25+be.systems.rpm/30,n,.1),Bt.env.gain.setTargetAtTime((be.airspeed/100+be.weather.rain)*Number(ee("environmentVolume").value)*.035,n,.1)}ee("flightCanvas").addEventListener("webglcontextlost",n=>{n.preventDefault(),tn=!0,ee("bootError").textContent="Graphics context lost. Flight paused; reload to recover. Preferences and completed logs are saved.",ee("setup").hidden=!1});var cl={};function rd(n){let e=Xr?Math.min(.1,(n-Xr)/1e3):0,t=Xr?n-Xr:0;if(Xr=n,t>0&&(Hi+=t>34?1:0,Hi>60&&(Hi=12),t<=17&&(Hi=Math.max(0,Hi-2))),yn&&!tn){qr+=e;let i=0;for(;qr>=_i&&i<12;)cl={x:be.x,y:be.y,z:be.z,pitch:be.pitch,roll:be.roll,heading:be.heading},s_(_i),kc(be,_i),qr-=_i,i++}if(Vt){let i=Vt.mode==="free"?{x:Number(Tt.has("KeyD"))-Number(Tt.has("KeyA")),z:Number(Tt.has("KeyW"))-Number(Tt.has("KeyS")),y:Number(Tt.has("KeyQ"))-Number(Tt.has("KeyZ"))}:{},s=be;if(yn&&!tn&&cl.x!==void 0){let r=qr/_i;s={...be};for(let o of["x","y","z","pitch","roll","heading"])s[o]=cl[o]+(be[o]-cl[o])*r}Yr=Vt.render(s,n/1e3,i)}if(yn&&!tn&&t>0&&(In.push(t),In.length>300&&In.shift(),Hi>=15&&zs<2&&Vt)){zs++,Hi=0;let i="low",s=ee("quality");Vt.renderer.setPixelRatio(zs===2?Math.max(1,devicePixelRatio*.75):1),Vt.renderer.shadowMap.enabled=zs<2,s.value="low",s.selected=!0,Jr(),t_(`Graphics auto-reduced for smoothness (level ${zs}).`)}n-ju>150&&(ju=n,Kr(),l_()),requestAnimationFrame(rd)}try{Vt=Qu(ee("flightCanvas"),Rt.settings.quality,Xc),document.body.dataset.boot="ready",document.body.dataset.skyforge="surface",requestAnimationFrame(rd),window.__skyforge={getState:()=>structuredClone(be),performance:()=>({samples:In.length,meanMs:In.reduce((n,e)=>n+e,0)/Math.max(1,In.length),p95Ms:[...In].sort((n,e)=>n-e)[Math.floor(In.length*.95)],...Yr}),scene:()=>({meshes:Vt.scene.children.length,webgl:Vt.renderer.capabilities.isWebGL2,aircraftMeshes:Vt.aircraft.children.length}),testAdvance:n=>{for(let e=0;e<n/_i;e++)kc(be);Kr()}}}catch(n){document.body.dataset.boot="error",ee("bootError").textContent=`Unable to initialize WebGL: ${n.message}. Enable hardware acceleration and use a modern desktop browser.`,ee("launch").disabled=!0,console.error(n)}
/*! For license information please see skyforge.js.LEGAL.txt */
