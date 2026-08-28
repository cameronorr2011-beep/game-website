(function(){'use strict';
  var key='orr-cookie-clicker';
  var base={cookies:0,total:0,clicks:0,perClick:1,perSecond:0,levels:{},ach:{},last:Date.now()};
  var state=base;
  try{state=Object.assign({},base,JSON.parse(localStorage.getItem(key)||'{}'));state.levels=state.levels||{};state.ach=state.ach||{}}catch(e){}
  var upgrades=[
    {id:'cursor',name:'Grandma Cursor',description:'+1 cookie per click',cost:25,scale:1.15,type:'click',value:1},
    {id:'oven',name:'Cookie Oven',description:'+2 cookies per second',cost:100,scale:1.18,type:'second',value:2},
    {id:'farm',name:'Cookie Farm',description:'+12 cookies per second',cost:650,scale:1.2,type:'second',value:12},
    {id:'factory',name:'Cookie Factory',description:'+60 cookies per second',cost:4000,scale:1.22,type:'second',value:60},
    {id:'portal',name:'Cookie Portal',description:'+300 cookies per second',cost:25000,scale:1.25,type:'second',value:300}
  ];
  var $=function(id){return document.getElementById(id)};
  function save(){state.last=Date.now();try{localStorage.setItem(key,JSON.stringify(state))}catch(e){}}
  function format(n){if(!isFinite(n))return'0';if(n<1000)return Math.floor(n).toLocaleString();var units=['K','M','B','T','Qa'];var i=-1;while(n>=1000&&i<units.length-1){n/=1000;i++}return n.toFixed(n<10?1:0)+units[++i]}
  function level(u){return state.levels[u.id]||0}
  function cost(u){return u.cost*Math.pow(u.scale,level(u))}
  function perClick(){return state.perClick}
  function perSecond(){return state.perSecond}
  function unlock(id){state.ach[id]=true}
  var away=Math.min(86400,Math.max(0,(Date.now()-(state.last||Date.now()))/1000));
  state.cookies+=perSecond()*away;state.total+=perSecond()*away;
  function render(){
    $('cookies').textContent=format(state.cookies);$('cps').textContent=format(perSecond());$('clicks').textContent=format(state.clicks);$('total').textContent=format(state.total);$('perClick').textContent=format(perClick());
    var list=$('cookieUpgrades');list.innerHTML='';upgrades.forEach(function(u){var b=document.createElement('button');var c=cost(u);b.className='upgrade';b.disabled=state.cookies<c;b.setAttribute('aria-label',u.name+' upgrade, costs '+format(c)+' cookies');b.innerHTML='<span><b>'+u.name+'</b><small>'+u.description+' · LVL '+level(u)+'</small></span><strong>'+format(c)+'</strong>';b.onclick=function(){if(state.cookies>=c){state.cookies-=c;state.levels[u.id]=level(u)+1;if(u.type==='click')state.perClick+=u.value;else state.perSecond+=u.value;unlock('First upgrade');render();save()}};list.appendChild(b)})
  }
  function clickCookie(e){var amount=perClick();state.cookies+=amount;state.total+=amount;state.clicks++;if(state.clicks===1)unlock('First click');if(state.total>=100)unlock('100 cookies');if(state.total>=10000)unlock('10,000 cookies');render();var f=document.createElement('i');f.textContent='+'+format(amount);f.style.left=((e.offsetX||50)-10)+'px';f.style.top=((e.offsetY||50)-10)+'px';$('cookieFloaters').appendChild(f);setTimeout(function(){f.remove()},700)}
  $('cookie').addEventListener('click',clickCookie);$('cookie').addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();clickCookie(e)}});
  $('saveCookies').onclick=function(){save();this.textContent='Saved ✓';setTimeout(function(){$('saveCookies').textContent='Save progress'},1000)};
  $('resetCookies').onclick=function(){if(confirm('Reset all Cookie Clicker progress?')){state=JSON.parse(JSON.stringify(base));save();render()}};
  setInterval(function(){state.cookies+=perSecond();state.total+=perSecond();render()},1000);render();save();
})();