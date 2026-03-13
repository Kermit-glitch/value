/* CrateValue — script.js */

const SB_TO_DB = 27 * 64; // 1728

// ─── utils ────────────────────────────────────────────────
function toDBs(v, u) { return u === 'SB' ? v * SB_TO_DB : v; }
function fmtVal(v, u) { return v > 0 ? `${Number(v).toLocaleString()} ${u}` : '—'; }
function hexRGBA(hex, a) {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}
function parseChance(s) {
  if (!s || s==='?' || s==='UL') return 0;
  return parseFloat(s.replace('%','').replace(',','.')) || 0;
}

// ─── flat item list (regular items only) ──────────────────
function allItems() {
  const out = [];
  crates.forEach(cr => {
    (cr.items||[]).forEach(it => {
      out.push({...it, _crate:cr.crate, _year:cr.year, _col:cr.color, _icon:cr.icon, _type:'item'});
    });
  });
  return out;
}

// ─── find by id (items + cosmetics) ───────────────────────
function findById(id) {
  for (const cr of crates) {
    const it = (cr.items||[]).find(i=>i.id===id);
    if (it) return {...it, _crate:cr.crate, _year:cr.year, _col:cr.color, _icon:cr.icon, _type:'item'};
    const co = (cr.cosmetics||[]).find(c=>c.id===id);
    if (co) return {...co, _crate:cr.crate, _year:cr.year, _col:cr.color, _icon:cr.icon, _type:'cosmetic'};
  }
  return null;
}

// ─── view switching ────────────────────────────────────────
function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('view-'+name)?.classList.add('active');
  document.querySelector(`.nav-link[data-view="${name}"]`)?.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if (name==='values') renderValues();
  if (name==='recent') renderRecent();
  if (name==='home') renderValues(); // home is now values
}
document.querySelectorAll('.nav-link').forEach(a =>
  a.addEventListener('click', e => { e.preventDefault(); switchView(a.dataset.view); })
);


// ─── item card ─────────────────────────────────────────────
function itemCard(it, idx) {
  const cc = it._col || '#3b9fd4';
  const ulTag = it.ul ? `<span class="ul-badge">⚡ UL</span>` : '';
  return `
    <div class="item-card" style="--cc:${cc};--ccl:${hexRGBA(cc,.1)}"
         onclick="openModal('${it.id}')" data-id="${it.id}">
      <div class="ic-top">${ulTag}<div class="ic-name">${it.name}</div></div>
      <div class="ic-crate">${it._icon||'📦'} ${it._crate} · ${it._year}</div>
      <div class="ic-bottom">
        <div class="ic-val">${it.value>0 ? fmtVal(it.value,it.unit) : '<span class="no-val">No value set</span>'}</div>
        <div class="ic-chance">${it.chance}</div>
      </div>
    </div>`;
}

// ─── cosmetic chip ─────────────────────────────────────────
function cosmChip(c) {
  const valued = c.value > 0;
  return `
    <div class="cosm-chip${c.ul?' cosm-ul':''}${valued?' cosm-valued':''}" onclick="openModal('${c.id}')">
      <span class="cosm-name">${c.ul?'⚡ ':''}${c.name}</span>
      <span class="cosm-right">
        ${valued ? `<span class="cosm-price">${fmtVal(c.value,c.unit)}</span>` : ''}
        <span class="cosm-chance">${c.chance}</span>
      </span>
    </div>`;
}

// ─── values view ───────────────────────────────────────────
function buildCrateFilter() {
  const sel = document.getElementById('filterCrate');
  if (sel.options.length > 1) return;
  crates.forEach(cr => {
    const o = document.createElement('option');
    o.value = cr.crate+'||'+cr.year;
    o.textContent = cr.icon+' '+cr.crate+' ('+cr.year+')';
    sel.appendChild(o);
  });
}

function getF() {
  return {
    q:     document.getElementById('searchInput').value.trim().toLowerCase(),
    crate: document.getElementById('filterCrate').value,
    year:  document.getElementById('filterYear').value,
    ul:    document.getElementById('filterUL').value,
    sort:  document.getElementById('sortBy').value,
  };
}

function renderValues() {
  buildCrateFilter();
  const f = getF();
  const container = document.getElementById('crateList');
  const meta = document.getElementById('resultsMeta');
  const filtered = f.q || f.crate || f.year || f.ul;

  if (filtered) {
    let items = allItems();
    if (f.q) items = items.filter(it =>
      it.name.toLowerCase().includes(f.q) ||
      it._crate.toLowerCase().includes(f.q) ||
      (it.notes||[]).some(n=>n.toLowerCase().includes(f.q))
    );
    if (f.crate) {
      const [cn,cy] = f.crate.split('||');
      items = items.filter(it => it._crate===cn && it._year===cy);
    }
    if (f.year) items = items.filter(it => it._year===f.year);
    if (f.ul==='ul')     items = items.filter(it=>it.ul);
    if (f.ul==='normal') items = items.filter(it=>!it.ul);

    if (f.sort==='value-desc') items.sort((a,b)=>toDBs(b.value,b.unit)-toDBs(a.value,a.unit));
    else if (f.sort==='value-asc') items.sort((a,b)=>toDBs(a.value,a.unit)-toDBs(b.value,b.unit));
    else if (f.sort==='chance')    items.sort((a,b)=>parseChance(b.chance)-parseChance(a.chance));
    else if (f.sort==='name')      items.sort((a,b)=>a.name.localeCompare(b.name));

    meta.textContent = `Showing ${items.length} item${items.length!==1?'s':''}`;
    container.innerHTML = items.length===0
      ? `<div class="empty-state"><div class="es-icon">🔍</div><p>No items match your search.</p></div>`
      : `<div class="item-grid">${items.map((it,i)=>itemCard(it,i)).join('')}</div>`;
    return;
  }

  // Default: every crate = its own section
  const totalItems  = crates.reduce((s,cr)=>(s+(cr.items||[]).length),0);
  const totalCosm   = crates.reduce((s,cr)=>(s+(cr.cosmetics||[]).length),0);
  meta.textContent = `${crates.length} crates · ${totalItems.toLocaleString()} items · ${totalCosm.toLocaleString()} cosmetics`;

  container.innerHTML = crates.map((cr, ci) => {
    const items     = cr.items     || [];
    const cosmetics = cr.cosmetics || [];
    const closed    = ci >= 2 ? ' collapsed' : '';

    const itemsHtml = items.length > 0
      ? `<div class="item-grid">${items.map((it,i)=>itemCard(
            {...it, _crate:cr.crate, _year:cr.year, _col:cr.color, _icon:cr.icon}, i
          )).join('')}</div>`
      : `<p class="crate-no-items">No items listed.</p>`;

    const cosmeticsHtml = cosmetics.length > 0 ? `
      <div class="cosm-header">
        <span class="cosm-label">🎨 Cosmetics</span>
        <span class="cosm-count">${cosmetics.length}</span>
      </div>
      <div class="cosm-grid">
        ${cosmetics.map(c=>cosmChip({...c, _crate:cr.crate, _year:cr.year, _col:cr.color, _icon:cr.icon})).join('')}
      </div>` : '';

    return `
      <div class="crate-section" id="cs-${ci}">
        <div class="crate-hdr${closed}" style="--cc:${cr.color}" onclick="toggleCrate(this)">
          <span class="crate-icon">${cr.icon}</span>
          <div class="crate-info">
            <span class="crate-name">${cr.crate}</span>
            <span class="crate-year">${cr.year}</span>
          </div>
          <span class="crate-stats">${items.length} item${items.length!==1?'s':''}${cosmetics.length>0?' · '+cosmetics.length+' cosmetics':''}</span>
          <span class="crate-chev">▼</span>
        </div>
        <div class="crate-body${closed}">
          ${itemsHtml}
          ${cosmeticsHtml}
        </div>
      </div>`;
  }).join('');
}

function toggleCrate(hdr) {
  hdr.classList.toggle('collapsed');
  hdr.nextElementSibling.classList.toggle('collapsed');
}
function clearSearch() {
  document.getElementById('searchInput').value = '';
  renderValues();
}
['searchInput','filterCrate','filterYear','filterUL','sortBy'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', renderValues);
});

// ─── unified modal (items + cosmetics) ────────────────────
function openModal(id) {
  const it = findById(id);
  if (!it) return;
  const cc = it._col || '#3b9fd4';
  const dbEq = toDBs(it.value, it.unit);
  const isCosmetic = it._type === 'cosmetic';

  // Type-specific sections
  const enchantSection = !isCosmetic ? `
    <div class="msec">
      <div class="msec-title">Enchantments</div>
      <div class="enchant-list">
        ${(it.notes||[]).filter(Boolean).length > 0
          ? (it.notes||[]).filter(Boolean).map(n=>`<span class="enchant-chip">${n}</span>`).join('')
          : '<span class="no-val">No enchantments listed.</span>'}
      </div>
    </div>` : '';

  const typeLabel = isCosmetic ? '🎨 Cosmetic' : (it.ul ? '⚡ Ultra Legendary' : 'Standard');

  document.getElementById('itemModalContent').innerHTML = `
    <div class="mhdr" style="border-left:5px solid ${cc}">
      <div class="mhdr-row">
        <div class="mhdr-left">
          <div class="mhdr-name">${it.name}</div>
          <div class="mhdr-tags">
            <span class="ic-crate" style="background:${hexRGBA(cc,.12)};color:${cc}">${it._icon} ${it._crate} · ${it._year}</span>
            ${it.ul?'<span class="ul-badge">⚡ Ultra Legendary</span>':''}
            ${isCosmetic?'<span class="cosm-badge">🎨 Cosmetic</span>':''}
          </div>
        </div>
        <div class="mhdr-right">
          <div class="mhdr-val">${it.value>0?fmtVal(it.value,it.unit):'—'}</div>
          <div class="mhdr-chance">Pull: ${it.chance}</div>
        </div>
      </div>
    </div>
    <div class="mbody">
      <div class="msec">
        <div class="msec-title">Info</div>
        <div class="info-grid">
          <div class="info-cell"><div class="info-lbl">Value</div><div class="info-val">${it.value>0?fmtVal(it.value,it.unit):'—'}</div></div>
          <div class="info-cell"><div class="info-lbl">In DBs</div><div class="info-val">${it.value>0?dbEq.toLocaleString()+' DB':'—'}</div></div>
          <div class="info-cell"><div class="info-lbl">Pull Rate</div><div class="info-val">${it.chance}</div></div>
          <div class="info-cell"><div class="info-lbl">Type</div><div class="info-val">${typeLabel}</div></div>
        </div>
      </div>
      ${enchantSection}
      <div class="msec">
        <div class="msec-title">Price History</div>
        <div class="graph-wrap"><canvas id="graph-${it.id}"></canvas></div>
        <div class="graph-labels" id="glabels-${it.id}"></div>
      </div>
      <div class="msec mactions">
        <button class="btn-sm btn-outline" onclick="openSuggest('${it.id}')">💡 Suggest Price</button>
      </div>
      ${suggestionsHtml(it.id)}
    </div>`;

  document.getElementById('itemModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(()=>drawGraph(it), 80);
}

// ─── price graph ───────────────────────────────────────────
function drawGraph(it) {
  const canvas = document.getElementById('graph-'+it.id);
  const lblEl  = document.getElementById('glabels-'+it.id);
  if (!canvas) return;
  const hist = it.priceHistory||[];
  if (hist.length===0) {
    canvas.style.display='none';
    if (lblEl) lblEl.innerHTML='<span class="no-val">No price history yet.</span>';
    return;
  }
  canvas.style.display='block';
  const W=canvas.offsetWidth||400, H=140;
  canvas.width=W; canvas.height=H;
  const ctx=canvas.getContext('2d');
  const prices=hist.map(h=>toDBs(h.price,h.unit));
  const mn=Math.min(...prices)*.9, mx=Math.max(...prices)*1.1||1;
  const pad={l:8,r:8,t:18,b:8};
  const pw=W-pad.l-pad.r, ph=H-pad.t-pad.b;
  const X=i=>pad.l+(i/(prices.length-1||1))*pw;
  const Y=v=>pad.t+(1-(v-mn)/(mx-mn))*ph;
  const cc=it._col||'#3b9fd4';
  const g=ctx.createLinearGradient(0,pad.t,0,H);
  g.addColorStop(0,hexRGBA(cc,.3)); g.addColorStop(1,hexRGBA(cc,.02));
  ctx.beginPath(); ctx.moveTo(X(0),Y(prices[0]));
  prices.forEach((p,i)=>{ if(i>0) ctx.lineTo(X(i),Y(p)); });
  ctx.lineTo(X(prices.length-1),H); ctx.lineTo(X(0),H); ctx.closePath();
  ctx.fillStyle=g; ctx.fill();
  ctx.beginPath(); ctx.moveTo(X(0),Y(prices[0]));
  prices.forEach((p,i)=>{ if(i>0) ctx.lineTo(X(i),Y(p)); });
  ctx.strokeStyle=cc; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.stroke();
  prices.forEach((p,i)=>{
    ctx.beginPath(); ctx.arc(X(i),Y(p),4,0,Math.PI*2);
    ctx.fillStyle=cc; ctx.fill();
    ctx.strokeStyle='white'; ctx.lineWidth=1.5; ctx.stroke();
  });
  if (lblEl) lblEl.innerHTML=hist.map(h=>`<span>${h.date}</span>`).join('');
}

// ─── suggest price ────────────────────────────────────────
let _sid = null;
function openSuggest(id) {
  _sid = id;
  const it = findById(id); if (!it) return;
  const isCosmetic = it._type === 'cosmetic';
  document.getElementById('suggestModalContent').innerHTML=`
    <div class="suggest-form">
      <div class="sug-title">💡 Suggest a Price</div>
      <div class="sug-item">${isCosmetic?'🎨 ':''}${it.name}</div>
      <div class="form-group">
        <label class="form-lbl">Price</label>
        <div style="display:flex;gap:8px">
          <input class="form-input" type="number" id="sg-price" placeholder="e.g. 5" min="0" style="flex:1"/>
          <select class="filter-select" id="sg-unit" style="width:80px"><option value="DB">DB</option><option value="SB">SB</option></select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-lbl">Reason</label>
        <input class="form-input" type="text" id="sg-reason" placeholder="e.g. recent trade"/>
      </div>
      <div class="form-group">
        <label class="form-lbl">Your Name (optional)</label>
        <input class="form-input" type="text" id="sg-author" placeholder="Anonymous"/>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:8px" onclick="submitSuggest()">Submit →</button>
    </div>`;
  document.getElementById('suggestModal').classList.add('open');
}
function submitSuggest() {
  const price  = parseFloat(document.getElementById('sg-price').value);
  const unit   = document.getElementById('sg-unit').value;
  const reason = document.getElementById('sg-reason').value.trim()||'—';
  const author = document.getElementById('sg-author').value.trim()||'Anonymous';
  if (!price||price<=0) { showToast('Enter a valid price.'); return; }
  if (!communitySuggestions[_sid]) communitySuggestions[_sid]=[];
  communitySuggestions[_sid].push({
    price:`${price} ${unit}`, reason, author,
    date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
  });
  closeModal('suggestModal');
  showToast('✅ Suggestion submitted!');
  if (_sid) openModal(_sid);
}
function suggestionsHtml(id) {
  const s = communitySuggestions[id];
  if (!s||!s.length) return '';
  return `<div class="msec"><div class="msec-title">Community Suggestions</div>
    ${s.map(sg=>`<div class="sug-card"><div class="sug-price">${sg.price}</div><div class="sug-reason">${sg.reason}</div><div class="sug-meta">by ${sg.author} · ${sg.date}</div></div>`).join('')}
  </div>`;
}

// ─── recent changes ────────────────────────────────────────
function renderRecent() {
  const changes=[];
  allItems().forEach(it=>{
    const h=it.priceHistory||[];
    if (h.length>=2) changes.push({it,from:h[h.length-2],to:h[h.length-1]});
  });
  const el=document.getElementById('recentFull');
  el.innerHTML = changes.length===0
    ? `<div class="empty-state"><div class="es-icon">📊</div><p>No recent changes yet.</p></div>`
    : changes.map((c,i)=>`
        <div class="rfc" onclick="openModal('${c.it.id}')" style="animation-delay:${i*.04}s">
          <div class="rfc-name">${c.it.name}</div>
          <div class="rfc-change"><span class="from">${fmtVal(c.from.price,c.from.unit)}</span><span class="arr">▲</span><span class="to">${fmtVal(c.to.price,c.to.unit)}</span></div>
          <div class="rfc-meta">${c.it._icon} ${c.it._crate} · ${c.it._year} · ${c.to.date}</div>
        </div>`).join('');
}

// ─── modals ────────────────────────────────────────────────
function closeModal(id, e) {
  if (e && e.target !== document.getElementById(id)) return;
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow='';
}

// ─── toast ────────────────────────────────────────────────
let _tt=null;
function showToast(msg) {
  const el=document.getElementById('toast');
  el.textContent=msg; el.classList.add('show');
  clearTimeout(_tt); _tt=setTimeout(()=>el.classList.remove('show'),2800);
}

// ─── keyboard ─────────────────────────────────────────────
document.addEventListener('keydown', e=>{
  if (e.key==='Escape') {
    ['itemModal','suggestModal'].forEach(id=>document.getElementById(id)?.classList.remove('open'));
    document.body.style.overflow='';
  }
  if ((e.ctrlKey||e.metaKey)&&e.key==='k') {
    e.preventDefault();
    switchView('values');
    setTimeout(()=>document.getElementById('searchInput')?.focus(),200);
  }
});

// ─── init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', ()=>{ renderValues(); buildCrateFilter(); });