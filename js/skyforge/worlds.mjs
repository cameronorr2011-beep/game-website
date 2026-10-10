// Fictional procedural worlds. Shared by physics, scenery, and the terrain map.
export const WORLDS = Object.freeze([
  { id:'beach', name:'Beach', description:'Turquoise ocean, sandy islands, palms and coastal airfields.', ground:0x79a568, sand:0xe6ce94, water:0x168da3, building:0xe9dcc2, accent:0xffa45b, fog:0xb8d8df, hour:14 },
  { id:'city', name:'City', description:'A sprawling skyline, street grids, parks and four regional airports.', ground:0x667966, sand:0xaaa99c, water:0x315d79, building:0x8da2b5, accent:0xf3c86c, fog:0xa6bdcf, hour:15 },
  { id:'cyberpunk', name:'Cyberpunk', description:'Neon towers, glowing avenues and a violet twilight skyline.', ground:0x24203f, sand:0x42374e, water:0x25204a, building:0x36304e, accent:0xff4edf, fog:0x483657, hour:19 },
  { id:'apocalypse', name:'Apocalypse', description:'Ashlands, impact craters and a ruined industrial skyline.', ground:0x756047, sand:0x9f7952, water:0x544937, building:0x615b53, accent:0xff743d, fog:0xb3997b, hour:17 },
]);
export const worldFor = id => WORLDS.find(w=>w.id===id)||WORLDS[0];
export const WORLD_EXTENT = { minX:-15000,maxX:35000,minZ:-10000,maxZ:40000 };
export function landscape(x,z,id='beach') {
  if(id==='city'||id==='cyberpunk') return 35+z*.003+24*Math.sin(x/6000)*Math.cos(z/7000);
  if(id==='apocalypse'){
    const crater=-160*Math.exp(-((x-3500)**2+(z-2500)**2)/1400000);
    return 130+70*Math.sin(x/2100)*Math.cos(z/2400)+35*Math.sin(z/700)+crater;
  }
  return 25+z*.004+65*Math.sin(x/4500)+65*Math.sin(z/3900)+35*Math.sin(x/1700)*Math.sin(z/2200);
}
const seeded=(x,z,i)=>{const n=Math.sin(x*67.13+z*131.71+i*19.19)*43758.5453;return n-Math.floor(n);};
export function worldProps(cx,cz,id,terrain,airports){
  const urban=id==='city'||id==='cyberpunk',ruins=id==='apocalypse',count=urban?64:ruins?32:24,result=[];
  for(let i=0;i<count;i++){
    const x=cx*2000+140+(i%8)*235+(urban?0:seeded(cx,cz,i)*80),z=cz*2000+140+Math.floor(i/8)*235;
    const y=terrain(x,z,id),safe=y>3&&!airports.some(a=>Math.hypot(a.x-x,a.z-z)<1100);
    if(!safe)continue;
    const building=urban||ruins,type=building?'building':'palm';
    const width=building?55+seeded(cx,cz,i+90)*50:9,depth=building?55+seeded(cx,cz,i+91)*50:9;
    const height=urban?55+seeded(cx,cz,i+92)*210:ruins?18+seeded(cx,cz,i+92)*90:18+seeded(cx,cz,i+92)*10;
    result.push({x,y,z,width,depth,height,type,ruined:ruins});
  }
  return result;
}
