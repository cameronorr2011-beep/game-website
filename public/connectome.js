import {ConnectomeGraph,PALETTE} from './graph.js';

const $=id=>document.getElementById(id);
const F=n=>n===null||n===undefined?'—':Number(n).toLocaleString('en-US');
const E=v=>String(v===null||v===undefined?'Unavailable':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key=(s)=>E(s).replace(/ /g,'_');
const views={
  explorer:['01 / NETWORK WORKSPACE','Connectome Explorer','Every imported neuron has one source-provided representative point. Aggregate flows account for every directed pair; inspect any cell to reveal its actual connections.'],
  anatomy:['02 / SPATIAL ORGANIZATION','Brain Anatomy','Navigate source-labeled neuropils. Region attribution covers the subset documented in Dataset Integrity.'],
  neurons:['03 / NEURON CATALOGUE','Neuron Explorer','Query real neuron IDs, biological annotations, connected partners and measured connection degrees.'],
  analysis:['04 / NETWORK MEASURES','Connectivity Analysis','Descriptive measures calculated from the imported directed graph; no functional interpretation is inferred.'],
  tracer:['05 / DIRECTED PATHWAYS','Pathway Tracer','Find observed directed synaptic routes between two root IDs, subject to an explicit search budget.'],
  populations:['06 / ANNOTATED POPULATIONS','Population Analysis','Source-provided classes and neuropil-linked populations. A neuron can occur in more than one region.'],
  integrity:['07 / SOURCE AUDIT','Dataset Integrity','Source files, record-level reconciliation, official-derived pair-index crosscheck and explicitly partial regional coverage.'],
  settings:['08 / INSTRUMENT CONTROL','Settings','Display controls and data-source configuration. View filters never alter the stored graph.']
};
const state={view:'explorer',ready:false,status:null,manifest:null,integrity:null,analytics:null,regions:[],graph:null,selected:null,details:null,inspectorTab:'details',edge:null,partners:{},morph:null,region:null,regionCount:null,classFilter:null,minSynapses:1,filterCount:null,neuronFilters:{},neuronPage:1,neuronResults:null,traceSource:'',traceTarget:'',traceHops:4,traceMinimum:1,traceResult:null,neighborhood:null,searchAbort:null,searchTimer:null,searchResults:[],searchIndex:-1,searchSeq:0,pollTimer:null};

async function api(resource,params={},signal){
  const query=new URLSearchParams({resource});for(const [k,v] of Object.entries(params))if(v!==undefined&&v!==null&&v!=='')query.set(k,v);
  const response=await fetch('/api/connectome?'+query.toString(),{signal,cache:'no-store'});
  if(!response.ok){let error;try{error=(await response.json()).error}catch{error=response.statusText}throw Error(error||`HTTP ${response.status}`)}
  return response;
}
async function json(resource,params={},signal){return (await api(resource,params,signal)).json()}
const err=e=>e instanceof Error?e.message:String(e);
let toastTimer;
function toast(message){const el=$('toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,4500)}
function view(view,{push=true}={}){
  if(!views[view])view='explorer';state.view=view;
  document.querySelectorAll('.nav-item').forEach(b=>{const active=b.dataset.view===view;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  const [num,title,description]=views[view];$('view-number').textContent=num;$('view-title').textContent=title;$('view-description').textContent=description;$('breadcrumb-view').textContent=title.toUpperCase();
  $('workspace').className='workspace view-'+view;
  if(push)history.pushState(null,'','#'+view);
  $('sidebar').classList.remove('open');$('menu-toggle').setAttribute('aria-expanded','false');
  renderView();
}
function showInspector(){if(matchMedia('(max-width:1110px)').matches)$('inspector').classList.add('open')}
function hideInspector(){$('inspector').classList.remove('open')}
function setPlaceholder(title,body){const el=$('graph-placeholder');el.hidden=false;el.innerHTML=`<span class="placeholder-symbol">∿</span><strong>${E(title)}</strong><p>${E(body)}</p>`}
function updateStatus(){
  const s=state.status||{};const active=s.active;const header=$('header-status');header.className='header-status';
  if(active){header.classList.add('ready');header.innerHTML='<span class="status-pip"></span>SOURCE-VERIFIED';
    $('status-ribbon').className='status-ribbon'+(s.pending?.stage==='failed'?' error':' warning');
    $('status-ribbon').innerHTML=s.pending?.stage==='failed'?
      `<strong>ACTIVE DATA PRESERVED</strong> · A new import failed: ${E(s.pending.error||'inspect ingestion log')}`:
      `<strong>FAFB v783 / ${F(active.neurons)} NEURONS</strong> · ${F(active.directed_pairs)} directed pairs indexed. ${active.canonical_zenodo_verified?'Original Zenodo source checked.':active.official_pair_asset_crosschecked?'Directed pairs crosschecked against official-derived index; neuropil attribution is partial.':'Canonical pair index not yet crosschecked; neuropil attribution is partial.'}${s.pending?` · New import: ${E(s.pending.stage)} ${F(s.pending.completed)}/${F(s.pending.total)} records`:''}`;
  }else{
    if(s.stage==='failed')header.classList.add('failed');
    header.innerHTML=`<span class="status-pip"></span>${E((s.stage||'NOT CONFIGURED').replaceAll('_',' ').toUpperCase())}`;
    $('status-ribbon').className='status-ribbon'+(s.stage==='failed'?' error':' warning');
    const p=s.pending||{};
    $('status-ribbon').textContent=s.stage==='not_configured'?'NO DATASET CONFIGURED · Import verified FlyWire files to enable the atlas. No demonstration graph is shown.':
      s.stage==='failed'?`IMPORT FAILED · ${p.error||'inspect import status'} · no partial graph is presented as complete`:
      `DATA LIFECYCLE · ${s.stage.toUpperCase()} · ${p.operation||''} · ${F(p.completed)}${p.total?'/'+F(p.total):' records completed (total not provided by source)'}`;
  }
  $('graph-summary').textContent=active?`${F(active.neurons)} neurons / ${F(active.directed_pairs)} pairs`:s.stage.replaceAll('_',' ');
}
async function refreshStatus(){
  try{
    const old=state.ready;state.status=await json('status');updateStatus();
    if(state.status.active&&!old)await loadAtlas();
    else if(state.status.active&&state.manifest&&state.status.active.imported_at!==state.manifest.imported_at){
      // A validated staging database was atomically activated; don't keep an
      // old GPU buffer paired with new API records across dataset versions.
      location.reload();return;
    }
    if(!state.status.active){$('global-search').disabled=true;setPlaceholder(state.status.stage==='not_configured'?'Connectome not configured':`Data ${state.status.stage.replaceAll('_',' ')}`,
      state.status.pending?.error||'Validated source data must be imported before a biological network can be drawn. Use Dataset Integrity for instructions.');renderView()}
    const stage=state.status.pending?.stage||state.status.stage;
    if(!state.pollTimer&&['discovery','downloading','importing','indexing','validating','partially_available'].includes(stage)){
      state.pollTimer=setInterval(refreshStatus,5000);
    }else if(state.pollTimer&&['ready','failed','not_configured'].includes(stage)){
      clearInterval(state.pollTimer);state.pollTimer=null;
    }
  }catch(e){state.status={stage:'failed',pending:{error:err(e)},active:null};updateStatus();setPlaceholder('Data service unavailable',err(e));renderView()}
}
async function loadAtlas(){
  try{
    const [metadata,integrity,analytics,regionData,overview]=await Promise.all([
      json('metadata'),json('integrity'),json('analytics'),json('regions'),api('overview')]);
    state.manifest=metadata.data;state.integrity=integrity.data;state.analytics=analytics;state.regions=regionData.regions;
    if(!state.integrity?.validated)throw Error('Source-to-import reconciliation has not passed');
    const binary=await overview.arrayBuffer();
    try{
      state.graph=new ConnectomeGraph($('brain-canvas'),$('edge-canvas'),$('graph-stage'),{
        onSelect:id=>selectNeuron(id,{focus:false}),onError:msg=>{toast(msg);setPlaceholder('Spatial view unavailable',msg)}
      });
      state.graph.load(binary,analytics.classes,analytics.class_links,analytics.class_centres);
      if(state.graph.count!==state.integrity.imported_neurons)throw Error('Overview point count does not reconcile with imported neurons');
      $('graph-placeholder').hidden=true;
      $('graph-render-count').textContent=`${F(state.graph.count)} / ${F(state.integrity.imported_neurons)} SOURCE POINTS`;
      $('graph-utility-sub').textContent='Drag to pan · Shift-drag to rotate · Scroll/pinch to zoom';
    }catch(e){state.graph=null;setPlaceholder('WebGL view unavailable',err(e)+' All neurons remain searchable and inspectable in the tables.');}
    state.ready=true;$('global-search').disabled=false;
    $('class-legend').innerHTML=analytics.classes.map((c,i)=>`<span class="key"><i class="swatch" style="--swatch:${PALETTE[i%PALETTE.length]}"></i>${E(c.name.replaceAll('_',' '))}</span>`).join('');
    $('legend-note').textContent=`${F(analytics.class_links.length)} aggregated flows account for ${F(state.integrity.directed_pairs)} directed pairs`;
    if(location.search){const param=new URLSearchParams(location.search).get('neuron');if(param&&/^\d+$/.test(param))selectNeuron(param,{focus:true})}
    renderView();renderInspector();
    refreshFilterCount();
  }catch(e){state.ready=false;$('global-search').disabled=true;setPlaceholder('Dataset could not be opened',err(e));toast('Dataset unavailable: '+err(e));renderView()}
}
function cardMetrics(){const i=state.integrity;return `<div class="metrics-strip">
  <div class="metric"><label>Imported neurons</label><strong>${F(i.imported_neurons)}</strong><small>Every ID searchable</small></div>
  <div class="metric"><label>Directed neuron pairs</label><strong>${F(i.directed_pairs)}</strong><small>Weights ≥ 1 retained</small></div>
  <div class="metric"><label>Synaptic contacts</label><strong>${F(i.synaptic_contacts)}</strong><small>Sum of observed pair weights</small></div>
  <div class="metric"><label>Pairs below 5 contacts</label><strong>${F(i.pairs_below_five_synapses)}</strong><small>Present, not thresholded away</small></div>
</div>`}
function optionList(values,selected='',label='All'){return `<option value="">${E(label)}</option>`+values.map(v=>`<option value="${E(v)}" ${v===selected?'selected':''}>${E(v.replaceAll('_',' '))}</option>`).join('')}
const classOptions=()=>optionList(state.analytics?.classes.map(c=>c.name)||[],state.classFilter,'All classes');
const regionOptions=()=>optionList(state.regions.map(r=>r.name),state.region,'Whole brain');
function regionNotice(){return state.integrity?.canonical_zenodo_verified?'Full neuropil assignment from canonical source.':
  `${F(state.integrity?.region_attributed_pairs)} of ${F(state.integrity?.directed_pairs)} pairs have source regional attribution; the remaining ${F(state.integrity?.unattributed_pairs)} still participate in all graph queries.`}
function renderView(){
  const panel=$('content-panel');
  if(!state.ready){
    const command='python -m connectome.ingest fetch-mirrors\npython -m connectome.ingest import --mode shiu --cache data/raw/github';
    panel.innerHTML=`<div class="notice warn"><strong>No connectome records are available in this deployment.</strong> This is an honest not-configured state, not a demonstration network. ${E(state.status?.pending?.error||'')}</div>
      <section class="panel"><div class="panel-title"><h2>Make the data available</h2><span>SOURCE-VERIFIED IMPORT</span></div><p>The deployed atlas ships with a validated compact pair index and compressed annotation database. If the package is missing, rebuild it from the pinned sources below, or point an operator-managed server at a validated full import. For complete per-pair neuropil attribution, use the original Zenodo Feather import documented in README.</p><pre class="command">${E(command)}</pre><p>Then run <code>python -m connectome.export_portable</code>. On Vercel the bundled index works without a separate server; NEUROML_UPSTREAM is an optional override for operators who host their own database.</p><button type="button" class="button ghost" data-view-link="integrity">View source and integrity details</button></section>`;
    return;
  }
  const render={explorer:renderExplorer,anatomy:renderAnatomy,neurons:renderNeurons,analysis:renderAnalysis,tracer:renderTracer,populations:renderPopulations,integrity:renderIntegrity,settings:renderSettings};
  panel.innerHTML=render[state.view]();
  if(state.view==='neurons'&&!state.neuronResults)loadNeuronResults();
  if(state.view==='neurons'&&state.neuronResults)renderNeuronTable();
  if(state.view==='tracer')renderTraceResult();
}
function filterLine(){const c=state.filterCount;return `<div class="filter-count" id="filter-count">${c?
  `<b>${F(c.visible_pairs)}</b> of ${F(c.total_pairs)} directed pairs in selection queries · <span class="filter-hidden">${F(c.hidden_pairs)} hidden by display filter</span>`:
  'Counting exact visibility against the source graph…'}</div>`}
function renderExplorer(){return `${cardMetrics()}<div class="two-col"><section class="panel"><div class="panel-title"><h2>Spatial &amp; classification filters</h2><span>REAL RECORDS</span></div><div class="controls-row">
  <div class="field"><label for="class-filter">Super class</label><select id="class-filter">${classOptions()}</select></div>
  <div class="field"><label for="region-filter">Neuropil</label><select id="region-filter">${regionOptions()}</select></div>
  <div class="field narrow"><label for="weight-filter">Min. contacts</label><select id="weight-filter">${[1,2,3,5,10,20,50,100].map(n=>`<option value="${n}" ${n===state.minSynapses?'selected':''}>${n}</option>`).join('')}</select></div>
  <button type="button" class="button ghost" data-action="clear-filters">Clear</button></div>${filterLine()}
  <p style="margin-top:10px">Neuropil masking changes visible points; minimum contacts changes partner lines and queries. Class flow curves aggregate <em>all</em> imported pairs, even when a selection filter hides them.</p></section>
  <section class="panel"><div class="panel-title"><h2>Reading the network</h2><span>INTERACTION GUIDE</span></div>
  <p>One point per imported neuron at a source-provided representative coordinate. Color = annotated super class. Thin arrows summarize all directed pairs by class; they are not individual axons or activity.</p>
  <p>Select a neuron for its actual inbound and outbound pairs. Only the highest-weight paged connections are drawn at once; the full unfiltered list remains in the inspector and API.</p>
  <div class="notice warn">${E(regionNotice())}</div></section></div>`}
const REGION_GROUPS=[['Central complex',/^(EB|FB|PB|NO)(_|$)/],['Mushroom body',/^(CA|PED|MB|aL|bL|gL)(_|$)/i],['Optic lobe',/^(ME|LA|LO|LOP|AME)(_|$)/],['Olfactory / lateral',/^(AL|LH)(_|$)/],['Other neuropils',/.*/]];
function groupRegions(){const groups=new Map(REGION_GROUPS.map(([name])=>[name,[]]));for(const region of state.regions){const label=REGION_GROUPS.find(([,regex])=>regex.test(region.name))[0];groups.get(label).push(region)}return groups}
function renderAnatomy(){const selected=state.regions.find(r=>r.name===state.region);return `<div class="notice warn">${E(regionNotice())} A selected region contains neurons with at least one source-attributed connection in it; not an inferred soma region.</div>
 <div class="two-col"><section class="panel"><div class="panel-title"><h2>Neuropil directory</h2><span>${F(state.regions.length)} SOURCE REGION CODES</span></div><div class="field" style="margin-bottom:13px"><label for="region-search">Find a region</label><input id="region-search" placeholder="e.g. EB, AL_L, ME_R" aria-label="Filter region directory"></div>
 ${[...groupRegions()].filter(([,list])=>list.length).map(([name,list])=>`<div class="section-rule"></div><h3 class="inspector-subheading">${E(name)} · ${list.length}</h3><div class="region-grid">${list.map(r=>`<button class="region-card ${state.region===r.name?'active':''}" data-region="${E(r.name)}" type="button"><strong>${E(r.name)}</strong><span>${F(r.neurons)} linked neurons</span></button>`).join('')}</div>`).join('')}</section>
 <section class="panel"><div class="panel-title"><h2>${selected?E(selected.name)+' / source coverage':'Select an anatomical region'}</h2><span>NEUROPIL</span></div>${selected?
  `<div class="fact-grid"><div class="fact"><label>Linked neurons</label><strong>${F(selected.neurons)}</strong></div><div class="fact"><label>Attributed contacts</label><strong>${F(selected.presynaptic_contacts)}</strong></div></div>
   <p style="margin-top:14px">Contacts are counted once as presynaptic and once as postsynaptic within this region. Region populations overlap: do not sum them to get a whole-brain census.</p>
   <div class="controls-row"><button type="button" class="button" data-action="browse-region">Browse these neurons</button><button type="button" class="button ghost" data-action="clear-region">Return to whole brain</button></div>`:
  `<p>The directory uses codes from the imported FlyWire regional connection table. Selecting a region highlights its real synaptic participants on the anatomical map and enables population queries.</p><p>Class/group names and neuropil codes are not interchangeable: a neuron's named group is an automatic Codex label; region membership here derives from actual synaptic rows.</p>`}</section></div>`}
function renderNeurons(){const f=state.neuronFilters;return `<section class="panel"><div class="panel-title"><h2>Search the imported population</h2><span>${F(state.integrity.imported_neurons)} IDENTIFIERS</span></div><form id="population-form" class="controls-row">
  <div class="field wide"><label for="neuron-q">ID, type or biological annotation</label><input id="neuron-q" name="q" value="${E(f.q||'')}" placeholder="e.g. KC, MBON, root ID…"></div>
  <div class="field"><label for="neuron-class">Super class</label><select id="neuron-class" name="class">${optionList(state.analytics.classes.map(c=>c.name),f.class,'All classes')}</select></div>
  <div class="field"><label for="neuron-side">Side</label><select id="neuron-side" name="side"><option value="">Both / unavailable</option>${['left','right','center'].map(s=>`<option ${f.side===s?'selected':''}>${s}</option>`).join('')}</select></div>
  <div class="field"><label for="neuron-region">Neuropil-linked</label><select id="neuron-region" name="region">${optionList(state.regions.map(r=>r.name),f.region||'','All regions')}</select></div>
  <div class="field"><label for="neuron-group">Codex group</label><input id="neuron-group" name="group" value="${E(f.group||'')}" placeholder="e.g. ME, LO.LOP"></div>
  <div class="field"><label for="neuron-celltype">Exact cell type</label><input id="neuron-celltype" name="cell_type" value="${E(f.cell_type||'')}" placeholder="e.g. LPLC2"></div>
  <div class="field"><label for="neuron-connected">Connected to ID</label><input id="neuron-connected" name="connected_to" inputmode="numeric" value="${E(f.connected_to||'')}" placeholder="FlyWire root ID"></div>
  <div class="field narrow"><label for="neuron-in">Min. inputs</label><input id="neuron-in" name="min_in" type="number" min="0" value="${E(f.min_in||0)}"></div>
  <div class="field narrow"><label for="neuron-out">Min. outputs</label><input id="neuron-out" name="min_out" type="number" min="0" value="${E(f.min_out||0)}"></div>
  <button type="submit" class="button">Query neurons</button><button type="button" class="button ghost" data-action="clear-neuron-filters">Reset</button></form>
  <p style="margin-top:12px">Every filter is applied to stored neuron, degree or connection records. Neuropil membership is limited to the source-attributed subset.</p></section>
 <section class="panel"><div class="panel-title"><h2>Matching neurons</h2><span>REAL RECORDS · 25 PER PAGE</span></div><div id="neuron-table"><p>Loading real neuron records…</p></div></section>`}
function renderNeuronTable(){const holder=$('neuron-table');if(!holder)return;const d=state.neuronResults;if(!d)return;
  holder.innerHTML=d.error?`<div class="notice error">${E(d.error)}</div>`:
  !d.total?'<div class="notice">No neurons match these exact source-data filters. Try a different ID, name, class or degree.</div>':
  `<p class="counter-note">${F(d.total)} matches · page ${d.page} · ordered by output degree</p><div class="table-wrap"><table><thead><tr><th>Root ID / type</th><th>Classification</th><th>Side</th><th class="num">Input partners</th><th class="num">Output partners</th></tr></thead><tbody>
   ${d.results.map(r=>`<tr><td><button type="button" class="row-button mono" data-neuron="${r.id}">${E(r.id)}</button><br><span class="subtle-text">${E(r.cell_type||r.hemibrain_type)}</span></td><td>${E(r.super_class)}<br><span class="subtle-text">${E(r.group_name)}</span></td><td>${E(r.side)}</td><td class="num">${F(r.in_degree)}</td><td class="num">${F(r.out_degree)}</td></tr>`).join('')}</tbody></table></div>
   <div class="pagination"><button type="button" class="button small ghost" data-page="${d.page-1}" ${d.page<=1?'disabled':''}>Previous</button><span>${F((d.page-1)*d.limit+1)}–${F(Math.min(d.total,d.page*d.limit))} of ${F(d.total)}</span><button type="button" class="button small ghost" data-page="${d.page+1}" ${d.page*d.limit>=d.total?'disabled':''}>Next</button></div>`;
}
async function loadNeuronResults(){
  if(!state.ready)return;
  const holder=$('neuron-table');if(holder)holder.innerHTML='<p>Querying the indexed neuron catalogue…</p>';
  const f={...state.neuronFilters,page:state.neuronPage,limit:25};
  try{state.neuronResults=await json('neurons',f)}catch(e){state.neuronResults={error:err(e)}}
  renderNeuronTable();
}
function bars(items,keyName,keyValue,max,attribute,color){return `<div class="bar-list">${items.map((r,i)=>`<button type="button" class="bar-row" ${attribute}="${E(r[keyName])}" title="Filter by ${E(r[keyName])}"><span>${E(r[keyName].replaceAll('_',' '))}</span><span class="bar-track"><span class="bar-fill" style="width:${Math.max(1,100*r[keyValue]/max).toFixed(2)}%;--bar-color:${color?.(i)||'#74d2b9'}"></span></span><b>${F(r[keyValue])}</b></button>`).join('')}</div>`}
function renderAnalysis(){const a=state.analytics,c=a.calculated,maxIn=Math.max(...a.degree_in.map(r=>r.count),1),maxOut=Math.max(...a.degree_out.map(r=>r.count),1),maxW=Math.max(...a.weight_distribution.map(r=>r.count),1);
  return `${cardMetrics()}<section class="panel"><div class="panel-title"><h2>Directed graph / whole brain</h2><span>CALCULATED · NO THRESHOLD</span></div><div class="analysis-summary"><div><label>Mean in / out degree</label><b>${c.mean_in_degree.toFixed(2)}</b><small>Directed partners per neuron (E / N)</small></div><div><label>Directed density</label><b>${(c.density*100).toFixed(3)}%</b><small>Non-self pairs / N(N − 1)</small></div><div><label>Regional attribution</label><b>${F(state.integrity.region_attributed_pairs)}</b><small>Pairs with source neuropil labels</small></div></div><p>${E(c.density_definition)} Edges with one contact are included. These statistics describe anatomical wiring, not signaling efficacy or brain activity.</p></section>
 <div class="three-col"><div class="chart"><h3>Input partners / neuron</h3>${bars(a.degree_in,'label','count',maxIn,'data-degree-in')}<div class="chart-note">Click a bin to filter the neuron catalogue by minimum input degree.</div></div>
 <div class="chart"><h3>Output partners / neuron</h3>${bars(a.degree_out,'label','count',maxOut,'data-degree-out')}<div class="chart-note">Counts are unique directed partner pairs, not synapses.</div></div>
 <div class="chart"><h3>Contacts / directed pair</h3>${bars(a.weight_distribution,'label','count',maxW,'data-weight-bin',()=>'#e1b87b')}<div class="chart-note">Click a bin to set the view-only minimum contact threshold.</div></div></div>
 <div class="two-col" style="margin-top:14px"><section class="panel"><div class="panel-title"><h2>Highly connected neurons</h2><span>OUT-DEGREE</span></div><div class="table-wrap"><table><thead><tr><th>Root ID / type</th><th class="num">Outputs</th><th class="num">Inputs</th></tr></thead><tbody>${a.highly_connected.slice(0,12).map(r=>`<tr><td><button type="button" class="row-button mono" data-neuron="${r.id}">${E(r.id)}</button><br><span class="subtle-text">${E(r.cell_type||r.super_class)}</span></td><td class="num">${F(r.out_degree)}</td><td class="num">${F(r.in_degree)}</td></tr>`).join('')}</tbody></table></div></section>
 <section class="panel"><div class="panel-title"><h2>Computational scope</h2><span>NO INFERRED FUNCTION</span></div><p><b>Measured:</b> source records and source synapse counts. <b>Calculated:</b> degree, density, histograms and class aggregates. No activity, electrophysiology or synaptic strength was measured by this dataset.</p>
 ${Object.entries(a.unavailable).map(([k,v])=>`<div class="notice"><strong>${E(k.replaceAll('_',' '))}:</strong> ${E(v)}</div>`).join('')}</section></div>`}
function renderTracer(){return `<section class="panel"><div class="panel-title"><h2>Trace an observed pathway</h2><span>DIRECTED · UP TO FOUR HOPS</span></div><p>Enter full root IDs. The search keeps 1-contact pairs by default. If the server's edge/node/time budget is exceeded, it returns <em>incomplete</em>, never a fabricated absence of a route.</p>
 <form id="trace-form" class="controls-row"><div class="field wide"><label for="trace-source">Presynaptic start neuron</label><input id="trace-source" name="source" inputmode="numeric" value="${E(state.traceSource||state.selected||'')}" placeholder="720575940…" required></div>
 <div class="field wide"><label for="trace-target">Postsynaptic destination</label><input id="trace-target" name="target" inputmode="numeric" value="${E(state.traceTarget)}" placeholder="720575940…" required></div>
 <div class="field narrow"><label for="trace-hops">Max. hops</label><select id="trace-hops" name="max_hops">${[1,2,3,4].map(n=>`<option ${state.traceHops===n?'selected':''}>${n}</option>`).join('')}</select></div>
 <div class="field narrow"><label for="trace-minimum">Min. contacts</label><input id="trace-minimum" name="min_synapses" type="number" min="1" max="10000000" value="${state.traceMinimum}"></div><button type="submit" class="button">Trace pathway →</button></form>
 <div class="controls-row" style="margin-top:10px"><button type="button" class="button small ghost" data-action="trace-selected-source" ${state.selected?'':'disabled'}>Selected → start</button><button type="button" class="button small ghost" data-action="trace-selected-target" ${state.selected?'':'disabled'}>Selected → destination</button><span class="counter-note">Source and target IDs are never rounded in JavaScript.</span></div></section>
 <section class="panel"><div class="panel-title"><h2>Pathway result</h2><span>GRAPH QUERY</span></div><div id="trace-result"></div></section>
 <section class="panel"><div class="panel-title"><h2>First- and second-order neighborhood</h2><span>REAL DIRECTED PARTNERS</span></div><p>Select a neuron, then inspect upstream or downstream reach. Large expansions report their explicit safety limit; use the inspector for complete direct partner pagination.</p><div class="controls-row"><button type="button" class="button ghost" data-neighborhood="in" ${state.selected?'':'disabled'}>Explore upstream</button><button type="button" class="button ghost" data-neighborhood="out" ${state.selected?'':'disabled'}>Explore downstream</button></div><div id="neighborhood-result">${state.neighborhood?neighborhoodMarkup(state.neighborhood):''}</div></section>`}
function neighborhoodMarkup(d){return `<div class="notice ${d.incomplete?'warn':''}" style="margin-top:12px">${d.incomplete?E(d.reason):`Expansion examined ${F(d.edges_examined)} real directed pairs at the current threshold.`}</div>${(d.levels||[]).map(l=>`<div class="notice"><strong>${l.hops} hop${l.hops>1?'s':''}:</strong> ${F(l.new_neurons)} newly reached neurons. ${l.sample_is_truncated?'First 30 IDs shown:':'IDs:'} ${l.sample_ids.map(id=>`<button type="button" class="button linkish mono" data-neuron="${id}">${id}</button>`).join(' · ')}</div>`).join('')}`}
function renderTraceResult(){const el=$('trace-result');if(!el)return;const r=state.traceResult;
  if(!r){el.innerHTML='<p>No pathway request yet. Choose a source and destination above, or select a neuron in the graph.</p>';return}
  if(r.error){el.innerHTML=`<div class="notice error">${E(r.error)}</div>`;return}
  if(r.incomplete){el.innerHTML=`<div class="notice warn"><strong>Search incomplete — no absence asserted.</strong> ${E(r.reason)}</div>`;return}
  if(!r.found){el.innerHTML=`<div class="notice">No directed pathway within ${r.max_hops} hops for this filter. ${E(r.note)}</div>`;return}
  el.innerHTML=`<div class="pill good">OBSERVED · ${r.hops} HOP${r.hops===1?'':'S'}</div><div class="path-chain">${r.path.map((id,i)=>`${i?`<span class="arrow">→<small>${F(r.connections[i-1]?.synapse_count)} contacts</small></span>`:''}<button type="button" data-neuron="${id}">${E(id)}</button>`).join('')}</div>
  ${r.connections.length?`<div class="table-wrap"><table><thead><tr><th>Observed directed connection</th><th class="num">Contacts</th></tr></thead><tbody>${r.connections.map(c=>`<tr><td><button type="button" class="row-button mono" data-edge="${c.source},${c.target}">${E(c.source)} → ${E(c.target)}</button></td><td class="num">${F(c.synapse_count)}</td></tr>`).join('')}</tbody></table></div>`:
  '<p>Same neuron: a zero-hop identity is not a synaptic pathway.</p>'}<p class="counter-note">${r.edges_examined!==undefined?`${F(r.edges_examined)} real edges examined · `:''}Minimum ${r.min_synapses||1} contacts per edge.</p>`;
}
function renderPopulations(){const a=state.analytics,maxClass=Math.max(...a.classes.map(x=>x.neurons)),maxRegion=Math.max(...a.regions.map(x=>x.neurons),1);
  return `<div class="notice">Classification is source annotation, not a functional measurement. A neuron may be linked to several neuropils, so region totals are not a disjoint brain census. ${E(regionNotice())}</div>
 <div class="two-col"><section class="panel"><div class="panel-title"><h2>Super classes</h2><span>${F(a.classes.length)} SOURCE LABELS</span></div>${bars(a.classes,'name','neurons',maxClass,'data-pop-class',i=>PALETTE[i%PALETTE.length])}</section>
 <section class="panel"><div class="panel-title"><h2>Synapse-linked neuropils</h2><span>${F(a.regions.length)} SOURCE CODES</span></div><div style="max-height:490px;overflow-y:auto;padding-right:5px">${bars(a.regions,'name','neurons',maxRegion,'data-pop-region',()=>'#8baad8')}</div></section></div>
 <section class="panel"><div class="panel-title"><h2>Coverage accounting</h2><span>NO INFERRED MEMBERSHIP</span></div><div class="fact-grid"><div class="fact"><label>Unique neuron IDs</label><strong>${F(state.integrity.unique_neuron_ids)}</strong></div><div class="fact"><label>Pairs with neuropil rows</label><strong>${F(state.integrity.region_attributed_pairs)}</strong></div></div><p style="margin-top:13px">Population clicks apply filters to actual imported records. The chart counts are calculated by querying source-provided classification or source region rows.</p></section>`}
function integrityRow(name,source,imported,mode='equal'){const okay=source===imported;return `<tr><td>${E(name)}</td><td class="num">${F(source)}</td><td class="num">${F(imported)}</td><td class="num ${okay?'good':'warn'}">${mode==='equal'?(okay?'MATCH':'MISMATCH'):E(mode)}</td></tr>`}
function renderIntegrity(){const i=state.integrity,m=state.manifest,c=i.official_pair_asset_crosscheck;
  return `<div class="notice ${i.canonical_zenodo_verified?'':'warn'}"><strong>${i.canonical_zenodo_verified?'Official source verified':c?.matched?'All directed pairs crosschecked against the official-derived index.':'Source-file import validated · canonical pair index not yet compared.'}</strong> ${E(i.scope)}. ${i.canonical_zenodo_verified?'All regional rows come from the checksum-verified Zenodo source.':'The original Zenodo pair-by-neuropil table was not reimported here. The independently matching aggregate pair graph does not supply missing regional rows.'}</div>
  <div class="two-col"><section class="panel"><div class="panel-title"><h2>Source-to-database reconciliation</h2><span>CHECKED ${E(i.checked_at?.slice(0,10))}</span></div><div class="table-wrap status-table"><table><thead><tr><th>Audit</th><th class="num">Source</th><th class="num">Imported</th><th class="num">Result</th></tr></thead><tbody>
  ${integrityRow('Neuron records',i.source_neurons,i.imported_neurons)}${integrityRow('Directed source rows',i.source_connection_rows,i.imported_connection_rows)}${integrityRow('Neuropil rows',i.source_region_rows,i.imported_region_rows)}</tbody></table></div>
  <div class="notice ${i.record_fingerprint_match?'':'error'}"><strong>Connection record identities:</strong> ${i.record_fingerprint_match?'MATCH — every source ID, direction and weight reconciled by a 128-bit row fingerprint.':'Not reconciled; source and imported records differ.'} Regional rows: ${i.regional_record_fingerprint_match?'match':'mismatch'}.</div>
  <dl class="info-list"><div><dt>Unique neuron IDs</dt><dd>${F(i.unique_neuron_ids)}</dd></div><div><dt>Directed pairs</dt><dd>${F(i.directed_pairs)}</dd></div><div><dt>Synaptic contacts</dt><dd>${F(i.synaptic_contacts)}</dd></div><div><dt>Pairs with 1–4</dt><dd>${F(i.pairs_below_five_synapses)} · kept</dd></div><div><dt>Missing rows</dt><dd>${F(i.missing_connection_rows)}</dd></div><div><dt>Missing references</dt><dd>${F(i.missing_neuron_references)}</dd></div><div><dt>Duplicate nodes / edges</dt><dd>${F(i.duplicate_neuron_records)} / ${F(i.duplicate_connection_records)}</dd></div><div><dt>Regional weight conflicts</dt><dd>${F(i.regional_pair_weight_mismatches)}</dd></div><div><dt>Unplaced neurons</dt><dd>${F(i.neurons_without_representative_position)}</dd></div></dl>
  <div class="notice ${i.validated?'':'error'}"><strong>${i.validated?'Reconciled against the selected files.':'Import does not reconcile.'}</strong> ${i.canonical_zenodo_verified?'Canonical Zenodo checksums also verified.':c?.matched?`All ${F(c.matched_directed_pairs)} aggregate pair records independently match the original official-derived index (fingerprint ${E(c.record_fingerprint)}). Published asset SHA-256: ${E(c.official_derived_asset_sha256)}. The original Feather was checksum-verified during that earlier asset build, not reopened for this export.`:'Original Zenodo Feather file was not accessible during this import; independent pair-index comparison is pending.'}</div></section>
  <section class="panel"><div class="panel-title"><h2>Provenance / scope</h2><span>DATASET CARD</span></div><dl class="info-list"><div><dt>Dataset</dt><dd>${E(m.name)} / v${E(m.version)}</dd></div><div><dt>Organism</dt><dd>${E(m.organism)}</dd></div><div><dt>Coverage</dt><dd>${E(m.coverage)}</dd></div><div><dt>Snapshot</dt><dd>${E(m.snapshot)}</dd></div><div><dt>Release</dt><dd>${E(m.release)}</dd></div><div><dt>Resolution</dt><dd>${E(m.connectivity_resolution)}</dd></div><div><dt>Imported</dt><dd>${E(m.imported_at)}</dd></div><div><dt>License</dt><dd>${E(m.license)}</dd></div></dl>
  <div class="section-rule"></div><p><strong>Connectivity:</strong> ${E(m.source_note)}</p><p><strong>Anatomy:</strong> ${E(m.regional_note)}</p><p><strong>Morphology:</strong> ${E(m.morphology_note)}</p><p><strong>Attribution:</strong> ${E(m.citation)}</p>
  <div class="controls-row"><a class="source-link" href="${E(m.official_connectivity)}" target="_blank" rel="noopener noreferrer">Official Zenodo record ↗</a><a class="source-link" href="${E(m.codex)}" target="_blank" rel="noopener noreferrer">Codex downloads ↗</a></div></section></div>
  <div class="two-col"><section class="panel"><div class="panel-title"><h2>Regional &amp; annotation coverage</h2><span>EXPLICIT OMISSIONS</span></div><dl class="info-list"><div><dt>Attributed pairs</dt><dd>${F(i.region_attributed_pairs)}</dd></div><div><dt>Without region</dt><dd>${F(i.unattributed_pairs)}</dd></div><div><dt>Regional contacts</dt><dd>${F(i.region_attributed_contacts)}</dd></div><div><dt>Annotation rows</dt><dd>${F(i.annotation_rows)}</dd></div><div><dt>Rows outside IDs</dt><dd>${F(i.annotation_rows_outside_neuron_list)}</dd></div><div><dt>IDs lacking annotation</dt><dd>${F(i.neurons_without_cell_annotation)}</dd></div></dl><p style="margin-top:13px">Neuron degree and contact totals come from all pairs. Regional views can cover only pairs with source neuropil rows.</p>${m.limitations.map(v=>`<div class="notice">${E(v)}</div>`).join('')}</section>
  <section class="panel"><div class="panel-title"><h2>Authenticated source files</h2><span>SHA-256 / BYTES</span></div><ul class="file-list">${i.files.map(f=>`<li><span>${E(f.role)} · ${E(f.filename)}<br><span class="subtle-text mono" title="${E(f.sha256)}">sha256:${E(f.sha256?.slice(0,22))}…</span></span><span>${F(f.size_bytes)} B<br>${f.checksum_verified?'<span class="pill good">CHECKED</span>':'<span class="pill warn">UNVERIFIED</span>'}</span></li>`).join('')}</ul></section></div>`}
function renderSettings(){return `<div class="two-col"><section class="panel"><div class="panel-title"><h2>Spatial rendering</h2><span>LOCAL DISPLAY</span></div><div class="settings-group"><div class="field"><label for="projection-select">Projection plane</label><select id="projection-select">${['XY','XZ','YZ'].map(s=>`<option ${state.graph?.plane===['XY','XZ','YZ'].indexOf(s)?'selected':''}>${s}</option>`).join('')}</select></div><p style="margin-top:8px">The camera projects source nanometre coordinates; shift-drag rotates the view without changing the data.</p></div>
  <div class="settings-group"><label for="point-size" class="inline-label">NEURON POINT RADIUS · <span id="point-size-value">${state.graph?.size||2.5}</span> PX</label><input id="point-size" type="range" min="1" max="7" step="0.5" value="${state.graph?.size||2.5}"></div>
  <div class="settings-group"><label class="switchline"><input type="checkbox" id="show-links" ${state.graph?.showLinks?'checked':''}> Show all class-aggregated directed flows at overview zoom</label><p style="margin-top:7px">The flows sum all imported pairs; disabling the rendering does not filter the graph.</p></div>
  <button type="button" class="button ghost" data-action="reset-camera">Reset camera &amp; projection</button></section>
  <section class="panel"><div class="panel-title"><h2>Data infrastructure</h2><span>READ-ONLY IN BROWSER</span></div><p><b>Backend:</b> ${state.status?.active?.storage==='portable-index'?'The validated official-derived pair index serves every directed pair; a checksum-verified, ephemeral SQLite metadata index provides FTS5, source annotations and partial neuropil records.':'A validated local SQLite import serves complete pair queries, FTS5 annotations and regional records.'} Precomputed whole-graph aggregates and a 3.3 MB point buffer reach the browser; 15 million edges do not.</p>
  <p><b>Hosting:</b> The versioned ~107 MB compressed dataset ships with this site and is queried read-only on Vercel. An optional NEUROML_UPSTREAM (HTTPS) can override it for a separately hosted full import. Serverless /tmp is only a checksum-verified extraction cache, never an import destination.</p><p><b>State:</b> ${E(state.status?.stage||'not configured')} · ${state.integrity?.canonical_zenodo_verified?'original Zenodo checked':state.integrity?.official_pair_asset_crosscheck?.matched?'aggregate pairs independently match official-derived index; regional data partial':'canonical pair-index comparison pending'}. Display/query filters never rewrite source rows.</p>
  <a class="source-link" href="/download">Legacy app downloads ↗</a> <span class="micro" style="margin:0 8px">·</span> <a class="source-link" href="/sleep">Separate sleep simulation ↗</a></section></div>`}
function defaultInspector(){return `<div class="empty-inspector"><span class="ring-glyph">◎</span><h2>No neuron selected</h2><p>Search by full root ID or type, click a source neuron in the anatomical map, or open a result in the catalogue.</p><div class="section-rule"></div><p class="mono">${state.ready?`${F(state.integrity.imported_neurons)} neurons<br>${F(state.integrity.directed_pairs)} directed pairs`:'No validated atlas loaded'}</p></div>`}
function inspectorTabs(){return `<div class="inspector-tabs">${[['details','Details'],['incoming','Inputs'],['outgoing','Outputs'],['morphology','Morphology']].map(([id,label])=>`<button type="button" data-inspector-tab="${id}" class="${state.inspectorTab===id?'active':''}">${label}</button>`).join('')}</div>`}
function renderInspector(){const el=$('inspector-content');if(!state.details){el.innerHTML=defaultInspector();return}
  if(state.edge){const e=state.edge;el.innerHTML=`<div class="eyebrow">DIRECTED CONNECTION / SOURCE RECORD</div><h2 class="inspector-title">${E(e.source)} → ${E(e.target)}</h2><p class="inspector-lead">One observed directed neuron pair. Its weight is the count of detected synaptic contacts, not a measured conductance or physiological strength.</p><div class="fact-grid"><div class="fact"><label>Synaptic contacts</label><strong>${F(e.synapse_count)}</strong></div><div class="fact"><label>Unattributed</label><strong>${F(e.unattributed_synapses)}</strong></div></div><div class="section-rule"></div><h3 class="inspector-subheading">Source neuropil rows</h3>${e.neuropils.length?e.neuropils.map(r=>`<div class="partner"><b>${E(r.neuropil)}</b><span class="weight">${F(r.synapses)}</span></div>`).join(''):'<p class="section-note">No neuropil rows were provided for this pair by the imported regional source.</p>'}<div class="notice warn">${E(e.note)}</div><div class="inspector-actions"><button type="button" class="button ghost" data-neuron="${e.source}">Inspect source</button><button type="button" class="button ghost" data-neuron="${e.target}">Inspect target</button><button type="button" class="button subtle" data-action="return-neuron">Back to neuron</button></div><p class="subtle-text">${E(e.provenance)}</p>`;return}
  const n=state.details;const title=n.cell_type||n.hemibrain_type||'Type unavailable';
  let body=`<div class="eyebrow">FAFB 783 / SOURCE NEURON</div><h2 class="inspector-title">${E(title)}</h2><div class="inspector-id"><span>${E(n.id)}</span><button type="button" data-action="copy-id" aria-label="Copy neuron ID">COPY ID</button></div><p class="inspector-lead">${E(n.super_class)} · ${E(n.cell_class)} · ${E(n.side)} side</p>
  <div class="inspector-actions"><button type="button" class="button" data-action="trace-from-selected">Trace from neuron →</button><button type="button" class="button ghost" data-action="browse-connected">Browse partners</button></div>
  <div class="fact-grid"><div class="fact"><label>Input partners</label><strong>${F(n.in_degree)}</strong><span>${F(n.in_synapses)} contacts</span></div><div class="fact"><label>Output partners</label><strong>${F(n.out_degree)}</strong><span>${F(n.out_synapses)} contacts</span></div></div>
  ${inspectorTabs()}<div id="inspector-tab-content"></div>`;
  el.innerHTML=body;renderInspectorTab();
}
function renderInspectorTab(){const el=$('inspector-tab-content'),n=state.details;if(!el||!n)return;
  if(state.inspectorTab==='details'){
    el.innerHTML=`<h3 class="inspector-subheading">Biological annotations</h3><dl class="info-list"><div><dt>Cell type</dt><dd>${E(n.cell_type)}</dd></div><div><dt>Superclass</dt><dd>${E(n.super_class)}</dd></div><div><dt>Class / subclass</dt><dd>${E(n.cell_class)} / ${E(n.sub_class)}</dd></div><div><dt>Codex group</dt><dd>${E(n.group_name)}</dd></div><div><dt>Hemibrain type</dt><dd>${E(n.hemibrain_type)}</dd></div><div><dt>Flow / side</dt><dd>${E(n.flow)} / ${E(n.side)}</dd></div><div><dt>Predicted NT</dt><dd>${E(n.nt_type)} ${n.nt_conf!=null?'('+Number(n.nt_conf).toFixed(2)+')':''}</dd></div><div><dt>Pre / post sites</dt><dd>Unavailable / unavailable</dd></div><div><dt>Anchor (nm)</dt><dd>${[n.x_nm,n.y_nm,n.z_nm].every(v=>v!=null)?[n.x_nm,n.y_nm,n.z_nm].map(F).join(' / '):'Unavailable'}</dd></div><div><dt>Soma (nm)</dt><dd>${[n.soma_x_nm,n.soma_y_nm,n.soma_z_nm].every(v=>v!=null)?[n.soma_x_nm,n.soma_y_nm,n.soma_z_nm].map(F).join(' / '):'Unavailable'}</dd></div></dl>
    <div class="section-rule"></div><h3 class="inspector-subheading">Synapse-linked neuropils</h3>${n.neuropils.length?n.neuropils.slice(0,12).map(r=>`<button class="partner" type="button" data-region="${E(r.region)}"><span><b>${E(r.region)}</b><small>pre ${F(r.presynaptic_contacts)} · post ${F(r.postsynaptic_contacts)}</small></span><span>↗</span></button>`).join(''):'<p class="section-note">No region attribution is present for this neuron in the imported regional source.</p>'}
    <div class="section-rule"></div><h3 class="inspector-subheading">Traceability</h3><p class="section-note">${E(n.provenance.neuron)}. ${E(n.provenance.connections)}. ${E(n.provenance.coordinates)}</p><p class="section-note" style="margin-top:7px">Presynaptic sites are not equivalent to polyadic synapse-contact totals and are intentionally unavailable.</p>`;
  }else if(state.inspectorTab==='morphology'){
    const m=state.morph;el.innerHTML=m?.available?`<h3 class="inspector-subheading">Version-matched source skeleton</h3><canvas id="morph-canvas" height="210" style="width:100%;background:#0a151b;border:1px solid #2b3c42"></canvas><p class="section-note">${E(m.units)} · ${F(m.segments.length)} line segments. ${E(m.provenance)}</p>`:
      `<div class="notice warn">${E(m?.reason||'Checking for version-matched morphology…')}</div><p class="section-note">A representative point is not a morphology. The connectivity table contains no neuron skeletons; no invented arbor is drawn.</p>`;
    if(m?.available)drawMorph(m);
  }else{
    const d=state.partners[state.inspectorTab];el.innerHTML=`<h3 class="inspector-subheading">${state.inspectorTab==='incoming'?'Presynaptic':'Postsynaptic'} partners · actual pairs</h3>${!d?'<p class="section-note">Loading source connections…</p>':d.error?`<div class="notice error">${E(d.error)}</div>`:
      `<p class="section-note">${F(d.total)} pairs meet ≥ ${d.min_synapses} contacts. ${d.total>d.connections.length?'Only the current page is drawn; use pagination to see all.':''}</p><div class="partner-list">${d.connections.map(c=>{const partner=state.inspectorTab==='incoming'?c.source:c.target;return `<div class="partner-entry"><button type="button" class="partner" data-neuron="${partner}"><span><b>${E(c.partner_type||c.partner_group||'Type unavailable')}</b><small>${E(partner)} · ${E(c.partner_class)}</small></span><span class="weight">${F(c.synapse_count)}</span></button><button type="button" class="mini-edge" aria-label="Inspect connection ${c.source} to ${c.target}" data-edge="${c.source},${c.target}">↗</button></div>`}).join('')||'<p class="section-note">No observed partners in this direction for this display filter.</p>'}</div><div class="partner-pagination"><span>${F(d.offset+1)}–${F(d.offset+d.shown)} / ${F(d.total)}</span><span><button type="button" class="button small ghost" data-partner-page="${Math.max(0,d.offset-20)}" ${d.offset<=0?'disabled':''}>Prev</button> <button type="button" class="button small ghost" data-partner-page="${d.offset+20}" ${d.offset+d.shown>=d.total?'disabled':''}>Next</button></span></div>`}`;
  }
}
function drawMorph(m){const canvas=$('morph-canvas');if(!canvas)return;const dpr=Math.min(devicePixelRatio||1,2),w=canvas.clientWidth,h=210;canvas.width=w*dpr;canvas.height=h*dpr;const c=canvas.getContext('2d');c.scale(dpr,dpr);
  const xs=m.segments.flatMap(s=>[s[0][0],s[1][0]]),ys=m.segments.flatMap(s=>[s[0][1],s[1][1]]);if(!xs.length)return;
  const minx=Math.min(...xs),maxx=Math.max(...xs),miny=Math.min(...ys),maxy=Math.max(...ys),span=Math.max((maxx-minx)/(w-28),(maxy-miny)/(h-28),1),cx=(maxx+minx)/2,cy=(maxy+miny)/2;
  c.strokeStyle='#86d4bd';c.globalAlpha=.7;c.lineWidth=1;
  for(const [a,b] of m.segments){c.beginPath();c.moveTo(w/2+(a[0]-cx)/span,h/2-(a[1]-cy)/span);c.lineTo(w/2+(b[0]-cx)/span,h/2-(b[1]-cy)/span);c.stroke()}
}
async function selectNeuron(id,{focus=true}={}){
  if(!state.ready)return;
  const seq=++state.searchSeq;
  state.edge=null;state.morph=null;state.partners={};state.inspectorTab='details';state.details=null;state.selected=String(id);
  $('inspector-content').innerHTML='<p class="section-note" style="padding:25px">Loading neuron annotation and directed partner pages…</p>';showInspector();
  try{
    const n=await json('neuron',{id});if(seq!==state.searchSeq)return;
    state.details=n;state.graph?.select(n.id,{focus});
    state.traceSource=n.id;
    await refreshGraphEdges();if(seq!==state.searchSeq)return;
    renderInspector();if(state.view==='tracer')renderView();
  }catch(e){if(seq!==state.searchSeq)return;state.selected=null;state.details=null;state.graph?.select(null);$('inspector-content').innerHTML=`<div class="notice error">${E(err(e))}</div>`;toast(err(e))}
}
async function refreshGraphEdges(){
  if(!state.selected||!state.details)return;
  const id=state.selected;
  try{
    const [incoming,outgoing]=await Promise.all(['incoming','outgoing'].map(resource=>json(resource,{id,limit:120,min_synapses:state.minSynapses})));
    if(state.selected!==id)return;
    const displayed=[...incoming.connections,...outgoing.connections];state.graph?.setConnections(displayed);
    $('graph-selection').hidden=false;
    $('graph-selection').textContent=`NEURON ${id} · ${F(displayed.length)} of ${F(incoming.total+outgoing.total)} qualifying directed pairs drawn`;
    $('graph-render-count').textContent=`${F(state.integrity.imported_neurons)} POINTS · ${F(displayed.length)} SELECTED LINES`;
  }catch(e){state.graph?.setConnections([]);$('graph-selection').hidden=false;$('graph-selection').textContent='Connection overlay failed: '+err(e)}
}
async function loadPartner(direction,offset=0){if(!state.selected)return;const id=state.selected;
  state.partners[direction]=null;renderInspectorTab();
  try{const d=await json(direction,{id,offset,limit:20,min_synapses:state.minSynapses});if(state.selected!==id)return;state.partners[direction]=d;renderInspectorTab()}
  catch(e){state.partners[direction]={error:err(e)};renderInspectorTab()}
}
async function inspectEdge(source,target){
  showInspector();$('inspector-content').innerHTML='<p class="section-note" style="padding:25px">Retrieving source connection record…</p>';
  try{state.edge=await json('edge',{source,target});renderInspector()}catch(e){state.edge=null;renderInspector();toast(err(e))}
}
async function setRegion(region){
  if(!state.ready)return;
  if(!region){state.region=null;state.regionCount=null;delete state.neuronFilters.region;state.graph?.setMask(null);state.neuronResults=null;renderView();return}
  try{
    const result=await api('region-mask',{region});const mask=new Uint8Array(await result.arrayBuffer());
    state.region=region;state.regionCount=Number(result.headers.get('X-Neurons-In-Region'));
    state.neuronFilters={...state.neuronFilters,region};
    state.graph?.setMask(mask);
    state.neuronResults=null;renderView();toast(`${region}: ${F(state.regionCount)} source-linked neurons`);
  }catch(e){toast('Region unavailable: '+err(e))}
}
async function setThreshold(value){state.minSynapses=Math.max(1,Number(value)||1);state.partners={};state.filterCount=null;renderView();await Promise.all([refreshFilterCount(),refreshGraphEdges()]);if(['incoming','outgoing'].includes(state.inspectorTab))loadPartner(state.inspectorTab,0)}
async function refreshFilterCount(){if(!state.ready)return;try{const count=await json('filter-count',{min_synapses:state.minSynapses});if(count.min_synapses!==state.minSynapses)return;state.filterCount=count;const el=$('filter-count');if(el)el.innerHTML=`<b>${F(count.visible_pairs)}</b> of ${F(count.total_pairs)} directed pairs in selection queries · <span class="filter-hidden">${F(count.hidden_pairs)} hidden by display filter</span>`}catch(e){const el=$('filter-count');if(el)el.textContent='Visibility count unavailable: '+err(e)}}
function applyNeuronFilters(form){const data=Object.fromEntries(new FormData(form).entries());state.neuronFilters=Object.fromEntries(Object.entries(data).filter(([,v])=>v!==''));state.neuronPage=1;state.neuronResults=null;loadNeuronResults()}
async function runTrace(form){const data=Object.fromEntries(new FormData(form).entries());state.traceSource=data.source?.trim()||'';state.traceTarget=data.target?.trim()||'';state.traceHops=Number(data.max_hops);state.traceMinimum=Number(data.min_synapses);
  const el=$('trace-result');if(el)el.innerHTML='<p>Searching the indexed directed graph (real progress is not reported for individual graph queries)…</p>';
  try{state.traceResult=await json('trace',data);state.graph?.setPath(state.traceResult.connections||[])}catch(e){state.traceResult={error:err(e)};state.graph?.setPath([])}renderTraceResult();
}
async function runNeighborhood(direction){if(!state.selected)return;const holder=$('neighborhood-result');if(holder)holder.innerHTML='<p>Expanding observed directed neighbors…</p>';
  try{state.neighborhood=await json('neighborhood',{id:state.selected,direction,hops:2,min_synapses:state.traceMinimum})}catch(e){state.neighborhood={levels:[],incomplete:true,reason:err(e)}}
  if(holder)holder.innerHTML=neighborhoodMarkup(state.neighborhood);
}
function hideSuggestions(){const el=$('search-suggestions');el.hidden=true;el.innerHTML='';$('global-search').setAttribute('aria-expanded','false');state.searchIndex=-1}
async function autocomplete(){const input=$('global-search'),q=input.value.trim(),box=$('search-suggestions');
  state.searchAbort?.abort();if(!q||!state.ready){hideSuggestions();return}
  const controller=new AbortController();state.searchAbort=controller;box.hidden=false;box.innerHTML='<div class="suggestion-msg">Searching imported records…</div>';input.setAttribute('aria-expanded','true');
  try{
    const r=await json('search',{q,limit:8},controller.signal);if(controller.signal.aborted)return;
    state.searchResults=r.results;state.searchIndex=-1;
    box.innerHTML=r.results.length?r.results.map((n,i)=>`<button type="button" class="suggestion" data-search-index="${i}" role="option" aria-selected="false"><span class="swatch" style="width:7px;height:7px;border-radius:50%;background:${PALETTE[Math.max(0,state.analytics.classes.findIndex(c=>c.name===n.super_class))%PALETTE.length]}"></span><span><b>${E(n.cell_type||n.hemibrain_type||n.group_name||'Type unavailable')}</b><small>${E(n.id)} · ${E(n.super_class)}</small></span><span class="pill gray">${F(n.out_degree)} OUT</span></button>`).join(''):
      '<div class="suggestion-msg">No real neuron matches. Try a full ID, cell type, class or Codex group.</div>';
  }catch(e){if(!controller.signal.aborted)box.innerHTML=`<div class="suggestion-msg">Search failed: ${E(err(e))}</div>`}
}
function selectSuggestion(index){const n=state.searchResults[index];if(!n)return;hideSuggestions();$('global-search').value='';view('explorer');selectNeuron(n.id)}
function wireEvents(){
  document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));
  $('menu-toggle').addEventListener('click',()=>{const open=$('sidebar').classList.toggle('open');$('menu-toggle').setAttribute('aria-expanded',String(open))});
  $('inspector-close').addEventListener('click',hideInspector);
  $('zoom-in').addEventListener('click',()=>state.graph?.zoom(1.4));$('zoom-out').addEventListener('click',()=>state.graph?.zoom(.71));$('fit-brain').addEventListener('click',()=>state.graph?.reset());
  $('global-search').addEventListener('input',()=>{clearTimeout(state.searchTimer);state.searchTimer=setTimeout(autocomplete,170)});
  $('global-search').addEventListener('keydown',e=>{
    const list=state.searchResults;if(e.key==='Escape'){hideSuggestions();return}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();state.searchIndex=Math.max(0,Math.min(list.length-1,state.searchIndex+(e.key==='ArrowDown'?1:-1)));$('search-suggestions').querySelectorAll('.suggestion').forEach((b,i)=>{b.classList.toggle('selected',i===state.searchIndex);b.setAttribute('aria-selected',String(i===state.searchIndex))})}
    if(e.key==='Enter'){e.preventDefault();if(list.length)selectSuggestion(state.searchIndex<0?0:state.searchIndex);else{state.neuronFilters={q:$('global-search').value};state.neuronResults=null;view('neurons')}}
  });
  $('search-suggestions').addEventListener('click',e=>{const b=e.target.closest('[data-search-index]');if(b)selectSuggestion(Number(b.dataset.searchIndex))});
  document.addEventListener('click',e=>{if(!e.target.closest('.top-search'))hideSuggestions()});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){e.preventDefault();$('global-search').focus()}});
  window.addEventListener('popstate',()=>view(location.hash.slice(1),{push:false}));
  $('content-panel').addEventListener('submit',e=>{
    if(e.target.id==='population-form'){e.preventDefault();applyNeuronFilters(e.target)}
    if(e.target.id==='trace-form'){e.preventDefault();runTrace(e.target)}
  });
  $('content-panel').addEventListener('input',e=>{
    if(e.target.id==='region-search'){const term=e.target.value.trim().toLowerCase();$('content-panel').querySelectorAll('.region-card').forEach(b=>b.hidden=!b.dataset.region.toLowerCase().includes(term))}
    if(e.target.id==='point-size'){state.graph?.setSize(e.target.value);$('point-size-value').textContent=e.target.value}
  });
  $('content-panel').addEventListener('change',e=>{
    if(e.target.id==='class-filter'){state.classFilter=e.target.value||null;state.graph?.setClass(state.classFilter);renderView()}
    if(e.target.id==='region-filter')setRegion(e.target.value);
    if(e.target.id==='weight-filter')setThreshold(e.target.value);
    if(e.target.id==='projection-select'){state.graph?.setPlane(e.target.value);$('projection-tag').textContent=e.target.value+' / ANATOMICAL NM'}
    if(e.target.id==='show-links')state.graph?.setLinks(e.target.checked);
  });
  $('content-panel').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.viewLink){view(b.dataset.viewLink);return}
    if(b.dataset.neuron){view('explorer');selectNeuron(b.dataset.neuron);return}
    if(b.dataset.edge){const [pre,post]=b.dataset.edge.split(',');inspectEdge(pre,post);return}
    if(b.dataset.region){setRegion(b.dataset.region);return}
    if(b.dataset.page){state.neuronPage=Number(b.dataset.page);loadNeuronResults();return}
    if(b.dataset.neighborhood){runNeighborhood(b.dataset.neighborhood);return}
    if(b.dataset.popClass||b.hasAttribute('data-pop-class')){state.classFilter=b.dataset.popClass;state.graph?.setClass(state.classFilter);view('explorer');return}
    if(b.dataset.popRegion){setRegion(b.dataset.popRegion);view('anatomy');return}
    if(b.dataset.degreeIn||b.hasAttribute('data-degree-in')){state.neuronFilters={min_in:b.dataset.degreeIn.match(/\d+/)?.[0]||0};state.neuronResults=null;view('neurons');return}
    if(b.dataset.degreeOut||b.hasAttribute('data-degree-out')){state.neuronFilters={min_out:b.dataset.degreeOut.match(/\d+/)?.[0]||0};state.neuronResults=null;view('neurons');return}
    if(b.dataset.weightBin||b.hasAttribute('data-weight-bin')){setThreshold(b.dataset.weightBin.match(/\d+/)?.[0]||1);view('explorer');return}
    switch(b.dataset.action){
      case 'clear-filters':state.classFilter=null;state.graph?.setClass(null);setRegion(null);setThreshold(1);break;
      case 'clear-region':setRegion(null);break;
      case 'browse-region':state.neuronFilters={region:state.region};state.neuronResults=null;view('neurons');break;
      case 'clear-neuron-filters':state.neuronFilters={};state.neuronPage=1;state.neuronResults=null;state.region=null;state.graph?.setMask(null);view('neurons');break;
      case 'trace-selected-source':$('trace-source').value=state.selected;break;
      case 'trace-selected-target':$('trace-target').value=state.selected;break;
      case 'reset-camera':state.graph?.setPlane('XY');state.graph?.reset();$('projection-tag').textContent='XY / ANATOMICAL NM';renderView();break;
    }
  });
  $('inspector-content').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.neuron){state.edge=null;selectNeuron(b.dataset.neuron);return}
    if(b.dataset.edge){const [pre,post]=b.dataset.edge.split(',');inspectEdge(pre,post);return}
    if(b.dataset.region){setRegion(b.dataset.region);view('anatomy');hideInspector();return}
    if(b.dataset.inspectorTab){state.inspectorTab=b.dataset.inspectorTab;renderInspector();
      if(['incoming','outgoing'].includes(state.inspectorTab))loadPartner(state.inspectorTab,0);
      if(state.inspectorTab==='morphology'&&state.morph===null){json('morphology',{id:state.selected}).then(m=>{state.morph=m;renderInspectorTab()}).catch(e=>{state.morph={reason:err(e)};renderInspectorTab()})}return}
    if(b.dataset.partnerPage){loadPartner(state.inspectorTab,Number(b.dataset.partnerPage));return}
    switch(b.dataset.action){
      case 'return-neuron':state.edge=null;renderInspector();break;
      case 'copy-id':navigator.clipboard?.writeText(state.selected).then(()=>toast('Root ID copied')).catch(()=>toast('Clipboard unavailable'));break;
      case 'trace-from-selected':state.traceSource=state.selected;state.traceTarget='';view('tracer');hideInspector();break;
      case 'browse-connected':state.neuronFilters={connected_to:state.selected};state.neuronResults=null;view('neurons');hideInspector();break;
    }
  });
}

wireEvents();view(views[location.hash.slice(1)]?location.hash.slice(1):'explorer',{push:false});refreshStatus();
