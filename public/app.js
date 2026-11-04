const NAV = [
  ['Overview', '/'], ['Connectome', '/connectome'], ['Neurons', '/neurons'],
  ['Connectivity', '/connectivity'], ['Pathways', '/pathways'], ['Regions', '/regions'],
  ['Statistics', '/statistics'], ['Simulations', '/simulations'], ['Sleep Lab', '/sleep'],
  ['Datasets', '/datasets'], ['Docs', '/documentation'],
];

const state = { manifest: null, overview: null, selected: null };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const fmt = (value) => Number(value ?? 0).toLocaleString('en-US');
const shortId = (value) => value ? `${String(value).slice(0, 9)}…${String(value).slice(-7)}` : '—';
const pageName = location.pathname.replace(/\/+$/, '').split('/').pop() || 'home';

async function getJSON(url) {
  const response = await fetch(url, { cache: 'no-store' });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);
  return body;
}

async function api(op, params = {}) {
  const query = new URLSearchParams({ op, ...params });
  return getJSON(`/api/connectome?${query}`);
}

function shell() {
  const links = NAV.map(([label, href]) => `<a class="${location.pathname.replace(/\/$/, '') === href.replace(/\/$/, '') ? 'active' : ''}" href="${href}">${label}</a>`).join('');
  return `<header class="site-header">
    <a class="brand" href="/"><span class="brand-mark">∿</span><span>NEURO-ML</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav id="site-nav" class="site-nav" aria-label="Primary navigation">${links}</nav>
  </header>
  <main id="page" class="page"></main>
  <footer class="footer page"><p>NEURO-ML · provenance-first computational neuroscience</p><p><a href="/datasets">FAFB v783 provenance</a> · <a href="/documentation">Scientific limits</a></p></footer>`;
}

function metric(label, value, note) {
  return `<div class="stat"><span class="stat-label">${esc(label)}</span><strong class="metric-value">${esc(value)}</strong><span class="stat-note">${esc(note)}</span></div>`;
}

function datasetStats() {
  const c = state.manifest?.counts || {};
  return [
    metric('Proofread neurons', fmt(c.neurons), 'exact root IDs'),
    metric('Directed pairs', fmt(c.directed_pairs), 'unique source → target pairs'),
    metric('Anatomical synapses', fmt(c.anatomical_synapses), 'summed pair multiplicities'),
    metric('Source records', fmt(c.source_connection_records), 'pair × neuropil rows'),
  ].join('');
}

function errorBox(error, action = '') {
  return `<div class="error-box">${esc(error.message || error)}${action ? ` <button class="button small ghost" data-retry="${esc(action)}">Retry</button>` : ''}</div>`;
}

function note(text) { return `<div class="note">${esc(text)}</div>`; }

function drawGraph(canvas, graph, onSelect) {
  if (!canvas || !graph?.nodes?.length) return;
  canvas.__graph = graph; canvas.__onSelect = onSelect;
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 800;
  const height = canvas.clientHeight || 500;
  canvas.width = width * ratio; canvas.height = height * ratio;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const map = new Map(graph.nodes.map((node) => [node.id, node]));
  const points = graph.nodes.map((node) => {
    node.__x = width / 2 + node.x * width * .42;
    node.__y = height / 2 + node.y * height * .42;
    return node;
  });
  ctx.lineWidth = 1;
  for (const edge of graph.edges || []) {
    const a = map.get(edge.source); const b = map.get(edge.target);
    if (!a || !b) continue;
    ctx.strokeStyle = 'rgba(92,225,212,.17)';
    ctx.beginPath(); ctx.moveTo(a.__x, a.__y); ctx.lineTo(b.__x, b.__y); ctx.stroke();
  }
  for (const node of points) {
    const radius = Math.max(2.2, Math.min(8, 2.2 + Math.log10((node.degree || 1) + 1) * 1.5));
    ctx.beginPath(); ctx.fillStyle = node.id === state.selected?.id ? '#e8b66e' : '#5ce1d4';
    ctx.globalAlpha = node.id === state.selected?.id ? 1 : .76;
    ctx.arc(node.__x, node.__y, radius, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  canvas.__graphPoints = points;
  canvas.onclick = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; const y = event.clientY - rect.top;
    let best = null; let distance = Infinity;
    for (const point of points) { const d = Math.hypot(point.__x - x, point.__y - y); if (d < distance) { distance = d; best = point; } }
    if (best && distance < 22) onSelect?.(best.id);
  };
}

function renderHome() {
  $('#page').innerHTML = `<section class="hero">
    <div><p class="eyebrow">Computational neuroscience workspace</p><h1>Explore the brain, connection by connection.</h1>
      <p class="lede">Neuro-ML brings connectome data, neural models, and interactive scientific analysis into one computational neuroscience workspace.</p>
      <div class="button-row"><a class="button primary" href="/connectome">Explore the Connectome <span>↗</span></a><a class="button ghost" href="/sleep">Open Sleep Lab</a></div>
      <p class="data-status" id="home-data-status">FAFB v783 · loading verified deployment asset…</p>
    </div>
    <div class="hero-canvas"><canvas id="home-network" aria-label="Topological view of real FAFB v783 connectome records"></canvas><div class="data-status">Real source edges · deterministic topological layout · not anatomical coordinates</div></div>
  </section>
  <section class="section"><div class="section-heading"><div><p class="eyebrow">Dataset at a glance</p><h2>Adult female fly brain · FAFB v783.0</h2></div><a class="button small ghost" href="/datasets">View provenance</a></div><div class="stats-grid">${datasetStats()}</div></section>
  <section class="section"><div class="section-heading"><div><p class="eyebrow">Research tools</p><h2>One graph, several honest views</h2></div></div><div class="feature-grid">
    <a class="feature-card" href="/connectome"><span class="feature-index">01 / VIEW</span><h3>Connectome Explorer</h3><p>Progressive topological rendering backed by every imported proofread pair and exact root ID.</p></a>
    <a class="feature-card" href="/neurons"><span class="feature-index">02 / FIND</span><h3>Neuron Explorer</h3><p>Search exact or prefix root IDs, inspect degree, synapse totals, and real partners.</p></a>
    <a class="feature-card" href="/connectivity"><span class="feature-index">03 / QUERY</span><h3>Connectivity Analysis</h3><p>Filter directed incoming and outgoing records by an explicit minimum synapse threshold.</p></a>
    <a class="feature-card" href="/pathways"><span class="feature-index">04 / TRACE</span><h3>Pathway Explorer</h3><p>Bounded directed shortest-path search through the imported structural graph.</p></a>
    <a class="feature-card" href="/statistics"><span class="feature-index">05 / MEASURE</span><h3>Network Statistics</h3><p>Degree distributions, count reconciliation, neuropil totals, and coverage checks from the manifest.</p></a>
    <a class="feature-card" href="/sleep"><span class="feature-index">06 / MODEL</span><h3>Sleep Lab</h3><p>Separate, runnable spiking-circuit model with inspectable assumptions and synthetic EEG output.</p></a>
  </div></section>
  <section class="section"><div class="callout integrity"><h3>Structural wiring is not recorded activity</h3><p>The connectome describes which neurons are connected according to the source release. It does not directly record the time-varying electrical activity of a living fly. Sleep Lab output is a computational model with declared assumptions, not an empirical recording or a whole-brain activity reconstruction.</p></div></section>`;
  loadOverview($('#home-network'), $('#home-data-status'));
}

async function loadOverview(canvas, status) {
  try {
    state.overview = await api('overview', { nodes: 220 });
    drawGraph(canvas, state.overview, (id) => { location.href = `/connectome?neuron=${encodeURIComponent(id)}`; });
    if (status) { status.textContent = `${fmt(state.overview.total_nodes)} total nodes queryable · ${fmt(state.overview.rendered_nodes)} rendered in this overview`; status.classList.add('ok'); }
  } catch (error) {
    if (status) { status.textContent = `Live graph unavailable: ${error.message}`; status.classList.add('error'); }
  }
}

function searchMarkup() {
  return `<div class="filter-group"><label for="neuron-search">Root ID search</label><input id="neuron-search" type="text" inputmode="numeric" placeholder="e.g. 720575940…" autocomplete="off"><button id="search-button" class="button small primary" type="button">Search dataset</button></div><div id="search-note" class="data-status">Text annotations are not part of this deployment release; use an exact or prefix root ID.</div><div id="search-results" class="neighbor-list"></div>`;
}

function renderConnectome() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Flagship workspace</p><h1>Connectome Explorer</h1><p>FAFB v783.0 · complete proofread pair index · topology view.</p></div><span class="badge live">● LIVE DATA INDEX</span></div>
  <div class="workspace"><aside class="workspace-panel"><h3>Search & filters</h3>${searchMarkup()}<div class="filter-group"><label for="threshold">Minimum imported synapses</label><div class="range-row"><input id="threshold" type="range" min="1" max="50" value="1"><span id="threshold-value" class="range-value">1</span></div></div><div class="filter-group"><label>Color field</label><select disabled><option>Degree (computed)</option></select></div>${note('Filters operate on imported structural pair records. Cell type, hemisphere, morphology and per-neuron neuropil annotations are unavailable in this release.')}</aside>
    <section class="viewer"><div class="viewer-toolbar"><span class="viewer-chip" id="viewer-count">Loading real graph…</span><span class="viewer-chip">Topology · not anatomy</span></div><canvas id="connectome-canvas" aria-label="Interactive topological graph viewer"></canvas></section>
    <aside id="connectome-inspector" class="workspace-panel inspector"><div class="inspector-empty">Select a node in the graph or search an exact root ID.</div></aside></div>`;
  const threshold = $('#threshold'); threshold.oninput = () => { $('#threshold-value').textContent = threshold.value; };
  $('#search-button').onclick = () => runSearch($('#neuron-search').value, $('#search-results'), selectNeuron);
  $('#neuron-search').onkeydown = (event) => { if (event.key === 'Enter') $('#search-button').click(); };
  loadOverview($('#connectome-canvas'), $('#viewer-count'));
  const id = new URLSearchParams(location.search).get('neuron');
  if (id) selectNeuron(id);
}

async function runSearch(query, target, onSelect) {
  if (!target) return;
  target.innerHTML = '<div class="data-status">Searching the full root-ID index…</div>';
  try {
    const result = await api('search', { q: query, limit: 40 });
    $('#search-note').textContent = result.note;
    target.innerHTML = result.results.length ? result.results.map((row) => `<div class="neighbor"><a href="?neuron=${encodeURIComponent(row.id)}" data-neuron="${esc(row.id)}" class="id">${esc(row.id)}</a><span>${fmt(row.total_degree)} degree</span></div>`).join('') : '<div class="empty">No root IDs matched. Check the exact decimal identifier.</div>';
    $$('[data-neuron]', target).forEach((link) => { link.onclick = (event) => { event.preventDefault(); onSelect(link.dataset.neuron); }; });
  } catch (error) { target.innerHTML = errorBox(error); }
}

function neighborList(title, rows, direction) {
  return `<h3>${title}</h3><div class="neighbor-list">${rows?.length ? rows.map((row) => `<div class="neighbor"><a href="/connectome?neuron=${encodeURIComponent(row.neuron_id)}" class="id">${shortId(row.neuron_id)}</a><span>${fmt(row.synapse_count)} syn</span></div>`).join('') : '<div class="data-status">No imported partners.</div>'}</div>`;
}

function hashY(id) {
  let h = 0;
  for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return ((h % 1000) / 1000 - 0.5) * 1.5;
}

async function selectNeuron(id) {
  const inspector = $('#connectome-inspector');
  if (!inspector) return;
  inspector.innerHTML = '<div class="inspector-empty">Loading exact root ID…</div>';
  try {
    const neuron = await api('neuron', { id, limit: 14 });
    state.selected = neuron;
    const c = neuron.anatomical_synapses;
    inspector.innerHTML = `<p class="eyebrow">Selected neuron</p><h2>Root ID</h2><span class="id">${esc(neuron.id)}</span><div class="button-row"><a class="button small ghost" href="/neurons?neuron=${encodeURIComponent(neuron.id)}">Open record</a><button class="button small" id="copy-id" type="button">Copy ID</button></div><div class="kv"><span>In-degree</span><strong>${fmt(neuron.degree.in)}</strong><span>Out-degree</span><strong>${fmt(neuron.degree.out)}</strong><span>Incoming synapses</span><strong>${fmt(c.in)}</strong><span>Outgoing synapses</span><strong>${fmt(c.out)}</strong></div>${neighborList('Strongest incoming', neuron.incoming, 'incoming')}${neighborList('Strongest outgoing', neuron.outgoing, 'outgoing')}<div class="note">${esc(neuron.annotation_status)}</div>`;
    $('#copy-id').onclick = () => navigator.clipboard?.writeText(neuron.id);
    const graph = { nodes: [{ id: neuron.id, x: 0, y: 0, degree: neuron.degree.in + neuron.degree.out }], edges: [] };
    const partners = [...neuron.incoming.map((x) => ({ id: x.neuron_id, x: -.35, y: hashY(x.neuron_id), degree: x.synapse_count })), ...neuron.outgoing.map((x) => ({ id: x.neuron_id, x: .35, y: hashY(x.neuron_id), degree: x.synapse_count }))];
    graph.nodes.push(...partners); neuron.incoming.forEach((x, i) => graph.edges.push({ source: x.neuron_id, target: neuron.id, weight: x.synapse_count })); neuron.outgoing.forEach((x) => graph.edges.push({ source: neuron.id, target: x.neuron_id, weight: x.synapse_count }));
    drawGraph($('#connectome-canvas'), graph, selectNeuron);
    $('#viewer-count').textContent = `${fmt(neuron.degree.in + neuron.degree.out)} total neighbors · selected ${shortId(neuron.id)}`;
    history.replaceState({}, '', `/connectome?neuron=${encodeURIComponent(neuron.id)}`);
  } catch (error) { inspector.innerHTML = errorBox(error); }
}

function renderNeurons() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Exact identity browser</p><h1>Neuron Explorer</h1><p>Search the complete proofread root-ID list, then open the same record in the connectome workspace.</p></div></div><section class="panel"><div class="result-toolbar"><input id="neurons-query" type="text" inputmode="numeric" placeholder="Exact or prefix root ID"><button id="neurons-run" class="button primary small" type="button">Search</button><span id="neurons-count" class="result-count"></span></div><div id="neurons-note" class="data-status"></div><div class="table-wrap"><table><thead><tr><th>Root ID</th><th>In-degree</th><th>Out-degree</th><th>Total degree</th><th>Annotations</th></tr></thead><tbody id="neurons-table"></tbody></table></div></section><section id="neuron-detail" class="section"></section>`;
  const run = () => runNeuronSearch($('#neurons-query').value);
  $('#neurons-run').onclick = run; $('#neurons-query').onkeydown = (event) => { if (event.key === 'Enter') run(); };
  const queryId = new URLSearchParams(location.search).get('neuron');
  if (queryId) { $('#neurons-query').value = queryId; showNeuronDetail(queryId); } else run();
}

async function runNeuronSearch(query) {
  const table = $('#neurons-table'); table.innerHTML = '<tr><td colspan="5" class="empty">Querying exact source identifiers…</td></tr>';
  try {
    const result = await api('search', { q: query, limit: 80 });
    $('#neurons-note').textContent = result.note; $('#neurons-count').textContent = `${fmt(result.total_matching)} match${result.total_matching === 1 ? '' : 'es'}`;
    table.innerHTML = result.results.length ? result.results.map((row) => `<tr><td><button class="table-button id" data-id="${esc(row.id)}">${esc(row.id)}</button></td><td>${fmt(row.in_degree)}</td><td>${fmt(row.out_degree)}</td><td>${fmt(row.total_degree)}</td><td><span class="badge">not imported</span></td></tr>`).join('') : '<tr><td colspan="5" class="empty">No matching proofread root IDs.</td></tr>';
    $$('[data-id]', table).forEach((button) => { button.onclick = () => showNeuronDetail(button.dataset.id); });
  } catch (error) { table.innerHTML = `<tr><td colspan="5">${errorBox(error)}</td></tr>`; }
}

async function showNeuronDetail(id) {
  const detail = $('#neuron-detail'); if (!detail) return;
  detail.innerHTML = '<div class="panel">Loading exact source record…</div>';
  try {
    const neuron = await api('neuron', { id, limit: 20 }); state.selected = neuron;
    detail.innerHTML = `<div class="panel"><p class="eyebrow">Source-backed record</p><h2>${esc(neuron.id)}</h2><div class="two-col"><div><div class="kv"><span>Dataset</span><strong>FAFB v${esc(neuron.dataset.version)}</strong><span>Incoming degree</span><strong>${fmt(neuron.degree.in)}</strong><span>Outgoing degree</span><strong>${fmt(neuron.degree.out)}</strong><span>Incoming synapses</span><strong>${fmt(neuron.anatomical_synapses.in)}</strong><span>Outgoing synapses</span><strong>${fmt(neuron.anatomical_synapses.out)}</strong></div><div class="button-row"><a class="button small primary" href="/connectome?neuron=${encodeURIComponent(neuron.id)}">Inspect in graph</a><button id="neuron-copy" class="button small" type="button">Copy root ID</button></div></div><div>${note(neuron.annotation_status)}<h3 style="margin-top:22px">Available fields</h3><p class="data-status">${Object.entries(neuron.annotations).map(([key, value]) => `${esc(key)}: ${value == null ? 'unknown' : esc(value)}`).join(' · ')}</p></div></div><div class="two-col" style="margin-top:20px">${neighborList('Strongest inputs', neuron.incoming)}${neighborList('Strongest outputs', neuron.outgoing)}</div></div>`;
    $('#neuron-copy').onclick = () => navigator.clipboard?.writeText(neuron.id); history.replaceState({}, '', `/neurons?neuron=${encodeURIComponent(neuron.id)}`);
  } catch (error) { detail.innerHTML = `<div class="panel">${errorBox(error)}</div>`; }
}

function renderConnectivity() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Directed graph query</p><h1>Connectivity Analysis</h1><p>Inspect actual pair records. Direction, threshold, aggregation rule, and provenance stay visible.</p></div></div><section class="panel"><div class="form-row"><div class="field"><label for="conn-id">Neuron root ID</label><input id="conn-id" type="text" inputmode="numeric" placeholder="720575940…"></div><div class="field"><label for="conn-direction">Direction</label><select id="conn-direction"><option value="outgoing">Outgoing · source → targets</option><option value="incoming">Incoming · sources → target</option></select></div><div class="field"><label for="conn-threshold">Minimum synapses</label><input id="conn-threshold" type="number" min="1" max="10000" value="1"></div></div><div class="button-row" style="margin-top:16px"><button id="conn-run" class="button primary" type="button">Query pair records</button><a class="button ghost" href="/neurons">Find a neuron ID</a></div></section><section id="conn-result" class="section"></section>`;
  const query = new URLSearchParams(location.search); $('#conn-id').value = query.get('neuron') || '';
  $('#conn-run').onclick = runConnections;
  if ($('#conn-id').value) runConnections();
}

async function runConnections() {
  const target = $('#conn-result'); target.innerHTML = '<div class="panel">Querying indexed pair records…</div>';
  try {
    const id = $('#conn-id').value.trim(); const direction = $('#conn-direction').value; const threshold = Math.max(1, Number($('#conn-threshold').value) || 1);
    const result = await api('connections', { id, direction, threshold, limit: 250 });
    target.innerHTML = `<div class="panel"><div class="section-heading"><div><p class="eyebrow">${esc(result.direction)} records</p><h2>${esc(result.source_id)}</h2></div><span class="badge">≥ ${fmt(result.minimum_synapses)} synapses</span></div><p class="data-status">${fmt(result.total_matching)} records match the threshold; ${result.truncated ? 'showing the strongest 250.' : 'all matching records shown.'} Each record is a source-derived neuron pair, not an individual synapse event.</p><div class="table-wrap"><table><thead><tr><th>Source</th><th>Target</th><th>Synapses</th><th>Neuropil</th><th>Direction</th></tr></thead><tbody>${result.records.map((row) => `<tr><td class="id">${esc(row.source)}</td><td class="id">${esc(row.target)}</td><td>${fmt(row.synapse_count)}</td><td>not imported</td><td><span class="badge live">→ directed</span></td></tr>`).join('')}</tbody></table></div></div>`;
  } catch (error) { target.innerHTML = `<div class="panel">${errorBox(error)}</div>`; }
}

function renderPathways() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Graph search</p><h1>Pathway Explorer</h1><p>Find a directed path between two exact proofread neurons. This is a fewest-edge structural path, not a claim about strongest biological signal flow.</p></div></div><section class="panel"><div class="form-row"><div class="field"><label for="path-source">Source root ID</label><input id="path-source" type="text" inputmode="numeric" placeholder="source"></div><div class="field"><label for="path-target">Target root ID</label><input id="path-target" type="text" inputmode="numeric" placeholder="target"></div><div class="field"><label for="path-threshold">Minimum synapses</label><input id="path-threshold" type="number" min="1" max="10000" value="1"></div></div><div class="button-row" style="margin-top:16px"><button id="path-run" class="button primary" type="button">Trace directed path</button><span class="badge">bounded at 10 hops / 100k visited nodes</span></div></section><section id="path-result" class="section"></section>`;
  $('#path-run').onclick = runPathway;
  api('search', { q: '', limit: 2 }).then((data) => { if (data.results.length >= 2) { $('#path-source').value = data.results[0].id; $('#path-target').value = data.results[1].id; } }).catch(() => {});
}

async function runPathway() {
  const target = $('#path-result'); target.innerHTML = '<div class="panel">Searching directed edges…</div>';
  try {
    const result = await api('pathway', { source: $('#path-source').value.trim(), target: $('#path-target').value.trim(), threshold: Math.max(1, Number($('#path-threshold').value) || 1), max_hops: 8 });
    if (!result.found) { target.innerHTML = `<div class="panel"><h2>No path found</h2>${note(result.note)}</div>`; return; }
    target.innerHTML = `<div class="panel"><div class="section-heading"><div><p class="eyebrow">Directed result</p><h2>${result.path.length - 1} edges · ${result.objective}</h2></div><span class="badge live">FOUND</span></div><div class="pathway">${result.path.map((id, index) => `<div class="path-node"><small>${index === 0 ? 'SOURCE' : index === result.path.length - 1 ? 'TARGET' : `STEP ${index}`}</small><a class="id" href="/neurons?neuron=${encodeURIComponent(id)}">${esc(id)}</a>${result.edges[index] ? `<div class="data-status">${fmt(result.edges[index].synapse_count)} synapses</div>` : ''}</div>${index < result.path.length - 1 ? '<span class="path-arrow">→</span>' : ''}`).join('')}</div>${note('The search minimizes directed edge count. Among each frontier it expands higher imported synapse counts first; that tie-break does not make this a weighted signal-flow model.')}</div>`;
  } catch (error) { target.innerHTML = `<div class="panel">${errorBox(error)}</div>`; }
}

function renderRegions() {
  const regions = Object.entries(state.manifest?.neuropil_synapses || {}).sort((a, b) => b[1] - a[1]);
  const total = regions.reduce((sum, [, value]) => sum + value, 0);
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Anatomical context</p><h1>Brain Regions</h1><p>Neuropil labels are present in the imported source summary. Per-neuron neuropil membership and compatible geometry are not part of this deployment asset.</p></div></div><div class="callout integrity">${note('This view reports source-derived aggregate synapse totals only. It does not fabricate spatial anatomy or assign a neuron to a region without source data.')}</div><section class="section"><div class="panel"><div class="section-heading"><div><p class="eyebrow">Aggregate source evidence</p><h2>${fmt(regions.length)} neuropil labels</h2></div><span class="badge">${fmt(total)} synapses summed</span></div><div class="stat-bar">${regions.slice(0, 30).map(([name, value]) => `<div class="bar-line"><span class="mono">${esc(name)}</span><span class="bar-track"><span class="bar-fill" style="width:${Math.max(1, value / regions[0][1] * 100)}%"></span></span><strong>${fmt(value)}</strong></div>`).join('')}</div></div></section><section class="section two-col"><div class="panel"><h2>What is queryable</h2><ul><li>Region label and aggregate source synapse count.</li><li>Global dataset context and source release.</li><li>Region list for reproducible reporting.</li></ul></div><div class="panel"><h2>Not imported</h2><ul><li>Per-neuron neuropil membership.</li><li>Hemisphere and anatomical coordinates.</li><li>Neuropil mesh or neuron morphology.</li></ul></div></section>`;
}

async function renderStatistics() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Computed from the full index</p><h1>Network Statistics</h1><p>Metrics below are empirical descriptors of the selected imported structural graph, not biological mechanisms.</p></div><span class="badge live">CALCULATING</span></div><section id="stats-result" class="panel">Loading graph-wide statistics…</section>`;
  try {
    const data = await api('statistics'); const max = Math.max(...data.degree.histogram.map((row) => row.neurons), 1);
    $('#stats-result').innerHTML = `<div class="section-heading"><div><p class="eyebrow">FAFB v${esc(data.dataset.version)}</p><h2>Count reconciliation</h2></div><span class="badge live">VERIFIED INDEX</span></div><div class="stats-grid">${metric('Neurons', fmt(data.counts.neurons), 'proofread IDs')}${metric('Directed pairs', fmt(data.counts.directed_pairs), 'unique pair records')}${metric('Synapses', fmt(data.counts.anatomical_synapses), 'anatomical multiplicity')}${metric('Weak components', fmt(data.counts.weak_components), 'undirected connectivity')}</div><div class="two-col" style="margin-top:22px"><div><h3>Degree distribution · in + out bins</h3><div class="stat-bar">${data.degree.histogram.map((row) => `<div class="bar-line"><span>${fmt(row.min)}–${fmt(row.max_exclusive - 1)}</span><span class="bar-track"><span class="bar-fill" style="width:${Math.max(1, row.neurons / max * 100)}%"></span></span><strong>${fmt(row.neurons)}</strong></div>`).join('')}</div></div><div><h3>Graph health</h3><div class="kv"><span>Mean in-degree</span><strong>${data.degree.mean_in.toFixed(2)}</strong><span>Mean out-degree</span><strong>${data.degree.mean_out.toFixed(2)}</strong><span>Self-connections</span><strong>${fmt(data.counts.self_connections)}</strong><span>Isolated neurons</span><strong>${fmt(data.counts.isolated_neurons)}</strong><span>Duplicate IDs</span><strong>${fmt(data.validation.duplicate_neuron_ids)}</strong></div></div></div><div class="section"><h3>Annotation coverage</h3><div class="table-wrap"><table><thead><tr><th>Field</th><th>Status</th><th>Records</th></tr></thead><tbody>${Object.entries(data.annotation_coverage).map(([key, value]) => `<tr><td>${esc(key)}</td><td>${esc(value.status)}</td><td>${fmt(value.records)}</td></tr>`).join('')}</tbody></table></div></div>`;
  } catch (error) { $('#stats-result').innerHTML = errorBox(error); }
}

function renderSimulations() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Model laboratory</p><h1>Neural Simulations</h1><p>Structural connectivity and activity modeling are separate layers. Choose the model scope before interpreting an output.</p></div></div><div class="three-col"><div class="panel"><span class="badge live">IMPLEMENTED</span><h2 style="margin-top:14px">Sparse LIF substrate</h2><p>Delayed current-based leaky integrate-and-fire dynamics, seeded noise and optional pair-STDP are implemented in the research package.</p><a class="button small ghost" href="/documentation#simulation">Read model scope</a></div><div class="panel"><span class="badge live">IMPLEMENTED</span><h2 style="margin-top:14px">Sleep Lab circuit</h2><p>A short stateless conductance-based circuit produces model spikes, synthetic EEG and heuristic stage estimates through a real endpoint.</p><a class="button small primary" href="/sleep">Open Sleep Lab</a></div><div class="panel"><span class="badge assumed">EXPLICIT LIMIT</span><h2 style="margin-top:14px">Whole-brain activity</h2><p>The full connectome does not supply membrane parameters, synaptic delays, receptor signs or recorded activity. No full biological activity simulator is claimed.</p><a class="button small ghost" href="/datasets">Inspect provenance</a></div></div><section class="section callout integrity"><h3>Model results are labeled as model results</h3><p>Empirical structural values come from FAFB v783. Simulation activity uses declared parameters, seeds and numerical solvers. It must not be read as a recording or as evidence that the living fly's dynamics have been reconstructed.</p></section>`;
}

function renderDatasets() {
  const d = state.manifest; const c = d.counts; const a = d.asset;
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Data catalog & provenance</p><h1>Datasets</h1><p>Every displayed structural count links to a versioned source release and a hashed deployment asset.</p></div></div><section class="panel"><div class="section-heading"><div><p class="eyebrow">Primary dataset</p><h2>${esc(d.dataset.name)}</h2></div><span class="badge live">IMPORTED · v${esc(d.dataset.version)}</span></div><div class="two-col"><div class="kv"><span>Organism</span><strong>${esc(d.dataset.organism)}</strong><span>Coverage</span><strong>${esc(d.dataset.scope)}</strong><span>License</span><strong>${esc(d.dataset.license)}</strong><span>Neurons</span><strong>${fmt(c.neurons)}</strong><span>Directed pairs</span><strong>${fmt(c.directed_pairs)}</strong><span>Synapses</span><strong>${fmt(c.anatomical_synapses)}</strong></div><div><h3>Source & citation</h3><a class="source-link" href="${esc(d.dataset.source)}" target="_blank" rel="noreferrer">Official Zenodo record ↗</a><a class="source-link" href="https://codex.flywire.ai/" target="_blank" rel="noreferrer">FlyWire Codex ↗</a><p>${esc(d.dataset.citation)}</p><p class="data-status">${esc(d.dataset.connection_definition)}</p></div></div></section><section class="section two-col"><div class="panel"><h2>Deployed query asset</h2><p>${esc(a.format)}</p><div class="kv"><span>File size</span><strong>${(a.bytes / 1048576).toFixed(1)} MB</strong><span>SHA-256</span><strong class="id">${esc(a.sha256)}</strong><span>Orientation</span><strong>rows=targets, columns=sources</strong><span>IDs</span><strong>exact uint64 strings</strong></div><a class="button small ghost" href="/data/flywire-v783.npz" download>Download indexed asset</a></div><div class="panel"><h2>Original source scale</h2><p>The source record is larger than the ordinary application asset. The proofread pair table is 852 MB; the individual-synapse table is 9.5 GB. Neither is silently repackaged into the browser bundle.</p><a class="button small ghost" href="https://zenodo.org/records/10676866" target="_blank" rel="noreferrer">Open source files ↗</a></div></section><section class="section panel"><h2>Validation ledger</h2><div class="table-wrap"><table><thead><tr><th>Check</th><th>Result</th></tr></thead><tbody>${Object.entries(d.validation).map(([key, value]) => `<tr><td>${esc(key)}</td><td>${esc(typeof value === 'object' ? JSON.stringify(value) : value)}</td></tr>`).join('')}</tbody></table></div><h3>Annotation availability</h3><p>${Object.entries(d.annotation_coverage).map(([key, value]) => `<span class="badge">${esc(key)} · ${esc(value.status)}</span>`).join(' ')}</p></section>`;
}

function renderDocumentation() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Methods & interpretation</p><h1>Documentation</h1><p>Use the graph as a reproducible structural dataset, and treat modeled activity as a distinct layer with explicit assumptions.</p></div></div><article class="prose"><section class="panel"><h2>What Neuro-ML contains</h2><p>The public explorer queries the imported FlyWire FAFB v783.0 proofread connectivity release. It preserves exact source root IDs and every directed neuron-pair record after summing the release's neuropil rows. Counts for neurons, pair records, and synapse multiplicity are separate throughout the UI.</p><h2>Graph orientation</h2><p>The canonical matrix is <code>rows = target neurons</code> and <code>columns = source neurons</code>. API responses use explicit <code>source</code> and <code>target</code> fields. Incoming and outgoing tables are transposes of the same imported records; no synthetic edge is added.</p><h2>Thresholds</h2><p>The source release already applies its proofread connectivity criteria. The UI's minimum-synapse control filters the imported pair weights. It cannot recover lower-confidence or omitted synapses from the source archive.</p><h2 id="simulation">Simulation scope</h2><p>Structural weights are anatomical synapse counts, not conductances. The LIF substrate and Sleep Lab choose model parameters that are labeled as literature-derived or assumed. Missing receptor, delay, membrane, morphology and activity data remain missing. Sleep Lab output is not recorded EEG and does not activate all FAFB neurons.</p><h2>Topological rendering</h2><p>The whole graph remains queryable through indexed records. The visualization progressively renders a bounded, deterministic subset of real nodes and edges for responsiveness. Coordinates in the overview are computed graph-layout coordinates, not anatomical positions. The UI states both total and visible counts.</p><h2>Source references</h2><p><a href="https://doi.org/10.1038/s41586-024-07558-y" target="_blank" rel="noreferrer">Dorkenwald et al., Neuronal wiring diagram of an adult brain, Nature 2024 ↗</a><br><a href="https://doi.org/10.5281/zenodo.10676866" target="_blank" rel="noreferrer">FlyWire Whole-brain Connectome Connectivity Data, v783.0 ↗</a><br><a href="https://flywire.ai/" target="_blank" rel="noreferrer">FlyWire project ↗</a></p></section></article>`;
}

function renderAbout() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Project identity</p><h1>About Neuro-ML</h1><p>An interactive computational neuroscience platform for exploring neural connectivity, neural dynamics, and brain-inspired computation.</p></div></div><div class="two-col"><section class="panel"><h2>Research posture</h2><p>Neuro-ML separates published anatomy, computed graph analysis, and exploratory neural models. It does not claim a complete simulation of a living fly, a human whole-brain model, clinical validity, sentience, or recorded activity reconstruction.</p><p>The original HASTY-CR application is archived separately from the scientific runtime. Its application artifacts remain accessible through the project release path.</p><a class="button small ghost" href="/downloads">Application downloads</a></section><section class="panel"><h2>Current release</h2>${datasetStats()}<p style="margin-top:16px">Primary dataset: FlyWire FAFB v783.0. Imported release: CC-BY-4.0. Structural counts are recalculated into the deployment manifest and verified at asset-build time.</p></section></div><section class="section callout integrity"><h3>Scientific integrity rule</h3><p>Every source-derived value is traceable to a release manifest. Every approximation is labeled. When a field is unavailable, the interface says so instead of filling the gap with an invented label.</p></section>`;
}

function renderDownloads() {
  $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Preserved application surface</p><h1>Downloads</h1><p>The original NeuroML game-playing application is retained as a separate archived module while this site focuses on the connectome research workspace.</p></div></div><div class="two-col"><section class="panel"><h2>Release assets</h2><p>Use the maintained GitHub release page for the existing Android and Windows application artifacts. These downloads are not part of the biological connectome runtime.</p><a class="button primary" href="https://github.com/cameronorr2011-beep/game-website/releases" target="_blank" rel="noreferrer">Open NeuroML releases ↗</a></section><section class="panel"><h2>Research package</h2><p>The reproducible Python package, data import pipeline, validation checks and local experiment commands live in the repository documentation.</p><a class="button ghost" href="/documentation">Read documentation</a></section></div><section class="section callout integrity"><h3>Scope boundary</h3><p>Game-policy weights, game observations and rewards are not imported into the fruit-fly connectome or human model. The systems remain separate.</p></section>`;
}

function renderError(message) { $('#page').innerHTML = `<div class="page-title"><div><p class="eyebrow">Neuro-ML</p><h1>Page unavailable</h1><p>${esc(message)}</p></div></div>`; }

async function start() {
  document.body.innerHTML = shell();
  const menu = $('.menu-toggle'); const nav = $('#site-nav');
  menu.onclick = () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); };
  try { state.manifest = await getJSON('/data/manifest.json'); } catch (error) { renderError(`The verified dataset manifest could not load: ${error.message}`); return; }
  try {
    if (pageName === 'home') renderHome();
    else if (pageName === 'connectome') renderConnectome();
    else if (pageName === 'neurons') renderNeurons();
    else if (pageName === 'connectivity') renderConnectivity();
    else if (pageName === 'pathways') renderPathways();
    else if (pageName === 'regions') renderRegions();
    else if (pageName === 'statistics') await renderStatistics();
    else if (pageName === 'simulations') renderSimulations();
    else if (pageName === 'datasets') renderDatasets();
    else if (pageName === 'documentation') renderDocumentation();
    else if (pageName === 'about') renderAbout();
    else if (pageName === 'downloads') renderDownloads();
    else renderHome();
  } catch (error) { renderError(error.message); }
}

start();

let resizeTimer = 0;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    for (const canvas of $$('canvas')) if (canvas.__graphPoints && canvas.__graph) drawGraph(canvas, canvas.__graph, canvas.__onSelect);
  }, 150);
});
