/* ═══════════════════════════════════════════════════════
   CSS TOOLS HUB — MAIN JAVASCRIPT
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ════════════════ UTILITIES ════════════════ */

/** Show toast notification */
function showToast(msg = '✅ Code Copied!') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/** Copy text to clipboard */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => showToast()).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast();
  });
}

/** Format output with HTML + CSS blocks */
function formatHtmlCssOutput(htmlSnippet, cssSnippet) {
  return `<!-- HTML -->
${htmlSnippet}

/* CSS */
${cssSnippet}`;
}

/** Extract HTML and CSS from rendered output block */
function extractHtmlCss(outputText = '') {
  const marker = '\n\n/* CSS */\n';
  const htmlPrefix = '<!-- HTML -->\n';
  if (!outputText.startsWith(htmlPrefix) || !outputText.includes(marker)) {
    return { html: '', css: '' };
  }
  const raw = outputText.slice(htmlPrefix.length);
  const [html, css] = raw.split(marker);
  return { html: (html || '').trim(), css: (css || '').trim() };
}

/** Wire Copy HTML and Copy CSS buttons for one tool */
function bindCopyButtons(htmlBtnId, cssBtnId, codeEl) {
  const htmlBtn = document.getElementById(htmlBtnId);
  const cssBtn = document.getElementById(cssBtnId);
  if (htmlBtn) {
    htmlBtn.addEventListener('click', () => {
      const { html } = extractHtmlCss(codeEl?.textContent || '');
      if (html) copyToClipboard(html);
    });
  }
  if (cssBtn) {
    cssBtn.addEventListener('click', () => {
      const { css } = extractHtmlCss(codeEl?.textContent || '');
      if (css) copyToClipboard(css);
    });
  }
}

/** Load LS value */
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

/** Save LS value */
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

/** Sync color picker ↔ hex input */
function syncColor(pickerId, hexId) {
  const picker = document.getElementById(pickerId);
  const hex    = hexId ? document.getElementById(hexId) : null;
  if (!picker) return;
  picker.addEventListener('input', () => {
    if (hex) hex.value = picker.value;
    triggerChange();
  });
  if (hex) {
    hex.addEventListener('input', () => {
      if (/^#[0-9a-fA-F]{6}$/.test(hex.value)) {
        picker.value = hex.value;
        triggerChange();
      }
    });
  }
}

/** Trigger a generic 'change' on document for tools relying on event delegation */
function triggerChange() {}

/** Inject shared sidebar/topbar on tool pages */
function ensureSharedLayout() {
  const hasSidebar = !!document.getElementById('sidebar');
  if (hasSidebar) return;

  const isToolPage = window.location.pathname.includes('/pages/');
  if (!isToolPage) return;

  const base = '..';
  const sidebarHtml = `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">CSS-Flash</span>
      </div>
      <button class="sidebar-close" id="sidebarClose" aria-label="Close sidebar">✕</button>
    </div>
    <nav class="sidebar-nav">
      <a href="${base}/index.html" class="nav-item">🏠 Home</a>
      <a href="${base}/pages/gradient.html" class="nav-item">🌈 Gradient</a>
      <a href="${base}/pages/box-shadow.html" class="nav-item">🟦 Box Shadow</a>
      <a href="${base}/pages/border-radius.html" class="nav-item">⬛ Border Radius</a>
      <a href="${base}/pages/flexbox.html" class="nav-item">📐 Flexbox</a>
      <a href="${base}/pages/grid.html" class="nav-item">🔲 Grid</a>
      <a href="${base}/pages/animation.html" class="nav-item">✨ Animation</a>
      <a href="${base}/pages/button.html" class="nav-item">🔘 Button</a>
      <a href="${base}/pages/glass.html" class="nav-item">🪟 Glassmorphism</a>
      <a href="${base}/pages/clip-path.html" class="nav-item">✂️ Clip-path</a>
      <a href="${base}/pages/loader.html" class="nav-item">⏳ Loader</a>
    </nav>
    <div class="sidebar-footer">
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <span class="theme-icon">🌙</span>
        <span class="theme-label">Dark Mode</span>
      </button>
    </div>
  </aside>
  <header class="topbar">
    <button class="menu-btn" id="menuBtn" aria-label="Open menu">☰</button>
    <div class="logo">
      <span class="logo-icon">⚡</span>
      <span class="logo-text">CSS-Flash</span>
    </div>
    <button class="theme-toggle-top" id="themeToggleTop" aria-label="Toggle theme">🌙</button>
  </header>`;

  document.body.insertAdjacentHTML('afterbegin', sidebarHtml);
}

ensureSharedLayout();

/* ════════════════ NAVIGATION ════════════════ */

const navItems  = document.querySelectorAll('.nav-item');
const toolCards = document.querySelectorAll('.tool-card');
const sections  = document.querySelectorAll('.tool-section');
const sidebar   = document.getElementById('sidebar');
const overlay   = sidebar ? document.createElement('div') : null;
if (overlay) {
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);
}

// Highlight sidebar link by current URL on multi-page setup
if (navItems.length) {
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  navItems.forEach(n => {
    const href = n.getAttribute('href') || '';
    if (!href || href.startsWith('#')) return;
    const normalizedHref = href.replace('./', '').replace('../', '/');
    const isActive =
      currentPath.endsWith(href) ||
      currentPath.endsWith(normalizedHref) ||
      (href === 'index.html' && /\/$/.test(currentPath));
    if (isActive) n.classList.add('active');
    else n.classList.remove('active');
  });
}

function activateTool(toolId) {
  if (!sections.length) return;
  sections.forEach(s => s.classList.toggle('active', s.id === toolId));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.tool === toolId));
  lsSet('lastTool', toolId);
  // Close sidebar on mobile
  if (window.innerWidth <= 700) closeSidebar();
}

navItems.forEach(n => n.addEventListener('click', e => {
  const toolId = n.dataset.tool;
  const href = n.getAttribute('href') || '';
  const isHashRoute = href.startsWith('#');
  if (toolId && isHashRoute && sections.length > 1) {
    e.preventDefault();
    activateTool(toolId);
  }
}));

toolCards.forEach(c => c.addEventListener('click', e => {
  const href = c.getAttribute('href') || '';
  if (href) return;
  const toolId = c.dataset.tool;
  if (toolId) {
    e.preventDefault();
    activateTool(toolId);
  }
}));

// Mobile sidebar
document.getElementById('menuBtn')?.addEventListener('click', () => {
  if (!sidebar || !overlay) return;
  sidebar.classList.add('open');
  overlay.classList.add('show');
});

function closeSidebar() {
  if (!sidebar || !overlay) return;
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

document.getElementById('sidebarClose')?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', closeSidebar);

// Restore last tool
const lastTool = lsGet('lastTool', 'home');
if (sections.length === 1) {
  activateTool(sections[0].id);
} else if (sections.length > 1) {
  activateTool(lastTool);
}

/* ════════════════ DARK / LIGHT THEME ════════════════ */

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const icon  = dark ? '🌙' : '☀️';
  const label = dark ? 'Dark Mode' : 'Light Mode';
  const ti = document.querySelector('#themeToggle .theme-icon');
  const tl = document.querySelector('#themeToggle .theme-label');
  if (ti) ti.textContent = icon;
  if (tl) tl.textContent = label;
  const tt = document.getElementById('themeToggleTop');
  if (tt) tt.textContent = icon;
  lsSet('darkMode', dark);
}

const savedDark = lsGet('darkMode', true);
applyTheme(savedDark);

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(!isDark);
});

document.getElementById('themeToggleTop')?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(!isDark);
});

/* ═══════════════════════════════════════════════════════
   1. GRADIENT GENERATOR
   ═══════════════════════════════════════════════════════ */
(function gradientTool() {

  const defaults = {
    type: 'linear',
    angle: 135,
    blur: 0,
    colors: [
      { color: '#6c63ff', pos: 0 },
      { color: '#ff6b9d', pos: 100 }
    ]
  };
  let state = lsGet('gradientState', { ...defaults });
  if (!state.colors) state = JSON.parse(JSON.stringify(defaults));

  const preview = document.getElementById('gradientPreview');
  const code    = document.getElementById('gradientCode');
  const angleInput  = document.getElementById('gradAngle');
  const angleVal    = document.getElementById('angleVal');
  const angleGroup  = document.getElementById('angleGroup');
  const colorsContainer = document.getElementById('colorsContainer');
  const addBtn     = document.getElementById('addColorBtn');
  const blurInput  = document.getElementById('gradBlur');
  const blurVal    = document.getElementById('gradBlurVal');
  const segBtns    = document.querySelectorAll('[data-grad-type]');

  if (!preview || !code || !angleInput || !colorsContainer || !addBtn || !segBtns.length) return;
  if (!state.hasOwnProperty('blur')) state.blur = 0;

  function applyState() {
    angleInput.value = state.angle;
    angleVal.textContent = state.angle;
    if (blurInput) { blurInput.value = state.blur; blurVal.textContent = state.blur; }
    segBtns.forEach(b => b.classList.toggle('active', b.dataset.gradType === state.type));
    angleGroup.style.display = state.type === 'radial' ? 'none' : 'flex';
    renderColors();
    renderGradient();
  }

  function renderColors() {
    colorsContainer.innerHTML = '';
    state.colors.forEach((c, idx) => {
      const row = document.createElement('div');
      row.className = 'color-row-wrapper';
      row.innerHTML = `
        <div class="color-row-top">
          <div class="color-inputs-left">
            <input type="color" value="${c.color}" data-idx="${idx}" class="color-picker">
            <input type="text" value="${c.color}" data-idx="${idx}" class="hex-input">
          </div>
          ${state.colors.length > 2 ? `<button class="btn-remove" data-idx="${idx}" title="Remove color">✕</button>` : ''}
        </div>
        <div class="color-pos-label">
          <span>Position</span>
          <span class="color-pos-val">${c.pos}%</span>
        </div>
        <input type="range" min="0" max="100" value="${c.pos}" data-idx="${idx}" class="pos-slider">
      `;
      colorsContainer.appendChild(row);

      // Event Listeners
      const picker = row.querySelector('.color-picker');
      const hex = row.querySelector('.hex-input');
      const slider = row.querySelector('.pos-slider');
      const remove = row.querySelector('.btn-remove');

      picker.addEventListener('input', () => {
        state.colors[idx].color = picker.value;
        hex.value = picker.value;
        renderGradient();
      });

      hex.addEventListener('input', () => {
        if (/^#[0-9a-fA-F]{6}$/.test(hex.value)) {
          state.colors[idx].color = hex.value;
          picker.value = hex.value;
          renderGradient();
        }
      });

      slider.addEventListener('input', () => {
        state.colors[idx].pos = +slider.value;
        row.querySelector('.color-pos-val').textContent = slider.value + '%';
        renderGradient();
      });

      if (remove) {
        remove.addEventListener('click', () => {
          state.colors.splice(idx, 1);
          renderColors();
          renderGradient();
        });
      }
    });
  }

  function renderGradient() {
    // Sort colors by position for standard CSS practice
    const sortedColors = [...state.colors].sort((a, b) => a.pos - b.pos);
    const colorStops = sortedColors.map(c => `${c.color} ${c.pos}%`).join(', ');
    
    const bgValue = state.type === 'linear'
      ? `linear-gradient(${state.angle}deg, ${colorStops})`
      : `radial-gradient(circle, ${colorStops})`;

    preview.style.background = bgValue;
    preview.style.filter = state.blur > 0 ? `blur(${state.blur}px)` : '';

    const blurLine = state.blur > 0 ? `\n  filter: blur(${state.blur}px);` : '';
    const css = `.gradient-box {
  background: ${bgValue};${blurLine}
}`;
    code.textContent = formatHtmlCssOutput('<div class="gradient-box"></div>', css);
    lsSet('gradientState', state);
  }

  angleInput.addEventListener('input', () => {
    state.angle = +angleInput.value;
    angleVal.textContent = state.angle;
    renderGradient();
  });

  segBtns.forEach(b => b.addEventListener('click', () => {
    state.type = b.dataset.gradType;
    segBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    angleGroup.style.display = state.type === 'radial' ? 'none' : 'flex';
    renderGradient();
  }));

  addBtn.addEventListener('click', () => {
    if (state.colors.length >= 8) return; // Limit for UI sanity
    const lastColor = state.colors[state.colors.length - 1];
    state.colors.push({ 
      color: '#ffd93d', 
      pos: Math.min(100, lastColor.pos + 10) 
    });
    renderColors();
    renderGradient();
  });

  if (blurInput) {
    blurInput.addEventListener('input', () => {
      state.blur = +blurInput.value;
      blurVal.textContent = state.blur;
      renderGradient();
    });
  }

  bindCopyButtons('copyGradientHtml', 'copyGradientCss', code);
  document.getElementById('resetGradient').addEventListener('click', () => { state = JSON.parse(JSON.stringify(defaults)); applyState(); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   2. BOX SHADOW GENERATOR
   ═══════════════════════════════════════════════════════ */
(function shadowTool() {

  const defaults = { x: 10, y: 10, blur: 20, spread: 0, color: '#000000', opacity: 30, inset: false };
  let state = lsGet('shadowState', { ...defaults });

  const preview  = document.getElementById('shadowPreview');
  const code     = document.getElementById('shadowCode');
  const sliders  = {
    x: document.getElementById('shadowX'),
    y: document.getElementById('shadowY'),
    blur: document.getElementById('shadowBlur'),
    spread: document.getElementById('shadowSpread'),
    opacity: document.getElementById('shadowOpacity'),
  };
  const vals = {
    x: document.getElementById('shadowXVal'),
    y: document.getElementById('shadowYVal'),
    blur: document.getElementById('shadowBlurVal'),
    spread: document.getElementById('shadowSpreadVal'),
    opacity: document.getElementById('shadowOpacityVal'),
  };
  const colorPicker = document.getElementById('shadowColor');
  const colorHex    = document.getElementById('shadowColorHex');
  const insetCheck  = document.getElementById('shadowInset');
  if (!preview || !code || !sliders.x || !sliders.y || !sliders.blur || !sliders.spread || !sliders.opacity || !vals.x || !vals.y || !vals.blur || !vals.spread || !vals.opacity || !colorPicker || !colorHex || !insetCheck) return;

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function applyState() {
    sliders.x.value = state.x; vals.x.textContent = state.x;
    sliders.y.value = state.y; vals.y.textContent = state.y;
    sliders.blur.value = state.blur; vals.blur.textContent = state.blur;
    sliders.spread.value = state.spread; vals.spread.textContent = state.spread;
    sliders.opacity.value = state.opacity; vals.opacity.textContent = (state.opacity/100).toFixed(2);
    colorPicker.value = state.color; colorHex.value = state.color;
    insetCheck.checked = state.inset;
    render();
  }

  function render() {
    const rgba = hexToRgba(state.color, state.opacity / 100);
    const inset = state.inset ? 'inset ' : '';
    const value = `${inset}${state.x}px ${state.y}px ${state.blur}px ${state.spread}px ${rgba}`;
    preview.style.boxShadow = value;
    code.textContent = formatHtmlCssOutput(
      '<div class="shadow-box">Box</div>',
      `.shadow-box {
  box-shadow: ${value};
}`
    );
    lsSet('shadowState', state);
  }

  Object.entries(sliders).forEach(([key, el]) => {
    el.addEventListener('input', () => {
      state[key] = +el.value;
      vals[key].textContent = key === 'opacity' ? (state.opacity/100).toFixed(2) : state[key];
      render();
    });
  });

  colorPicker.addEventListener('input', () => { state.color = colorPicker.value; colorHex.value = colorPicker.value; render(); });
  colorHex.addEventListener('input', () => {
    if (/^#[0-9a-fA-F]{6}$/.test(colorHex.value)) { state.color = colorHex.value; colorPicker.value = colorHex.value; render(); }
  });
  insetCheck.addEventListener('change', () => { state.inset = insetCheck.checked; render(); });

  bindCopyButtons('copyShadowHtml', 'copyShadowCss', code);
  document.getElementById('resetShadow').addEventListener('click', () => { state = { ...defaults }; applyState(); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   3. BORDER RADIUS GENERATOR
   ═══════════════════════════════════════════════════════ */
(function borderRadiusTool() {

  const defaults = { tl: 20, tr: 20, br: 20, bl: 20, color: '#6c63ff' };
  let state = lsGet('brState', { ...defaults });

  const preview = document.getElementById('borderRadiusPreview');
  const code    = document.getElementById('borderRadiusCode');
  const sliders = {
    tl: document.getElementById('brTL'), tr: document.getElementById('brTR'),
    br: document.getElementById('brBR'), bl: document.getElementById('brBL'),
  };
  const vals = {
    tl: document.getElementById('brTLVal'), tr: document.getElementById('brTRVal'),
    br: document.getElementById('brBRVal'), bl: document.getElementById('brBLVal'),
  };
  const colorPicker = document.getElementById('brColor');
  if (!preview || !code || !sliders.tl || !sliders.tr || !sliders.br || !sliders.bl || !vals.tl || !vals.tr || !vals.br || !vals.bl || !colorPicker) return;

  function applyState() {
    ['tl','tr','br','bl'].forEach(k => { sliders[k].value = state[k]; vals[k].textContent = state[k]; });
    colorPicker.value = state.color;
    render();
  }

  function render() {
    const v = `${state.tl}px ${state.tr}px ${state.br}px ${state.bl}px`;
    preview.style.borderRadius = v;
    preview.style.background = state.color;
    code.textContent = formatHtmlCssOutput(
      '<div class="rounded-box"></div>',
      `.rounded-box {
  width: 160px;
  height: 160px;
  background: ${state.color};
  border-radius: ${v};
}`
    );
    lsSet('brState', state);
  }

  ['tl','tr','br','bl'].forEach(k => {
    sliders[k].addEventListener('input', () => {
      state[k] = +sliders[k].value;
      vals[k].textContent = state[k];
      render();
    });
  });

  colorPicker.addEventListener('input', () => { state.color = colorPicker.value; render(); });

  document.querySelectorAll('[data-br]').forEach(chip => {
    chip.addEventListener('click', () => {
      const [tl,tr,br,bl] = chip.dataset.br.split(',').map(Number);
      state = { ...state, tl, tr, br, bl };
      applyState();
    });
  });

  bindCopyButtons('copyBorderRadiusHtml', 'copyBorderRadiusCss', code);
  document.getElementById('resetBorderRadius').addEventListener('click', () => { state = { ...defaults }; applyState(); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   4. FLEXBOX GENERATOR
   ═══════════════════════════════════════════════════════ */
(function flexTool() {

  const defaults = { direction: 'row', justify: 'flex-start', align: 'stretch', wrap: 'nowrap', gap: 10, count: 4 };
  let state = lsGet('flexState', { ...defaults });

  const preview = document.getElementById('flexPreview');
  const code    = document.getElementById('flexCode');
  const dir     = document.getElementById('flexDirection');
  const jus     = document.getElementById('flexJustify');
  const aln     = document.getElementById('flexAlign');
  const wrp     = document.getElementById('flexWrap');
  const gapR    = document.getElementById('flexGap');
  const gapV    = document.getElementById('flexGapVal');
  const cntR    = document.getElementById('flexCount');
  const cntV    = document.getElementById('flexCountVal');
  if (!preview || !code || !dir || !jus || !aln || !wrp || !gapR || !gapV || !cntR || !cntV) return;

  function applyState() {
    dir.value = state.direction; jus.value = state.justify;
    aln.value = state.align;    wrp.value = state.wrap;
    gapR.value = state.gap;     gapV.textContent = state.gap;
    cntR.value = state.count;   cntV.textContent = state.count;
    render();
  }

  function render() {
    preview.style.flexDirection     = state.direction;
    preview.style.justifyContent    = state.justify;
    preview.style.alignItems        = state.align;
    preview.style.flexWrap          = state.wrap;
    preview.style.gap               = state.gap + 'px';
    // Build items
    preview.innerHTML = '';
    for (let i = 1; i <= state.count; i++) {
      const d = document.createElement('div');
      d.className = 'flex-item';
      d.textContent = i;
      preview.appendChild(d);
    }
    const css =
`.container {
  display: flex;
  flex-direction: ${state.direction};
  justify-content: ${state.justify};
  align-items: ${state.align};
  flex-wrap: ${state.wrap};
  gap: ${state.gap}px;
}`;
    const items = Array.from({ length: state.count }, (_, i) => `  <div class="item">${i + 1}</div>`).join('\n');
    code.textContent = formatHtmlCssOutput(`<div class="container">
${items}
</div>`, css);
    lsSet('flexState', state);
  }

  dir.addEventListener('change', () => { state.direction = dir.value; render(); });
  jus.addEventListener('change', () => { state.justify   = jus.value; render(); });
  aln.addEventListener('change', () => { state.align     = aln.value; render(); });
  wrp.addEventListener('change', () => { state.wrap      = wrp.value; render(); });
  gapR.addEventListener('input', () => { state.gap = +gapR.value; gapV.textContent = state.gap; render(); });
  cntR.addEventListener('input', () => { state.count = +cntR.value; cntV.textContent = state.count; render(); });

  bindCopyButtons('copyFlexHtml', 'copyFlexCss', code);
  document.getElementById('resetFlex').addEventListener('click', () => { state = { ...defaults }; applyState(); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   5. GRID GENERATOR
   ═══════════════════════════════════════════════════════ */
(function gridTool() {

  const defaults = { cols: 3, rows: 3, gap: 12, template: 'repeat({n}, 1fr)' };
  let state = lsGet('gridState', { ...defaults });

  const preview  = document.getElementById('gridPreview');
  const code     = document.getElementById('gridCode');
  const colsR    = document.getElementById('gridCols');
  const colsV    = document.getElementById('gridColsVal');
  const rowsR    = document.getElementById('gridRows');
  const rowsV    = document.getElementById('gridRowsVal');
  const gapR     = document.getElementById('gridGap');
  const gapV     = document.getElementById('gridGapVal');
  const tempSel  = document.getElementById('gridColTemplate');
  if (!preview || !code || !colsR || !colsV || !rowsR || !rowsV || !gapR || !gapV || !tempSel) return;

  function applyState() {
    colsR.value = state.cols; colsV.textContent = state.cols;
    rowsR.value = state.rows; rowsV.textContent = state.rows;
    gapR.value  = state.gap;  gapV.textContent  = state.gap;
    tempSel.value = state.template;
    render();
  }

  function render() {
    const colDef = state.template.replace('{n}', state.cols);
    const rowDef = `repeat(${state.rows}, 1fr)`;
    preview.style.gridTemplateColumns = colDef;
    preview.style.gridTemplateRows    = rowDef;
    preview.style.gap = state.gap + 'px';
    preview.innerHTML = '';
    for (let i = 1; i <= state.cols * state.rows; i++) {
      const d = document.createElement('div');
      d.className = 'grid-item';
      d.textContent = i;
      preview.appendChild(d);
    }
    const css =
`.container {
  display: grid;
  grid-template-columns: ${colDef};
  grid-template-rows: ${rowDef};
  gap: ${state.gap}px;
}`;
    const items = Array.from({ length: state.cols * state.rows }, (_, i) => `  <div class="item">${i + 1}</div>`).join('\n');
    code.textContent = formatHtmlCssOutput(`<div class="container">
${items}
</div>`, css);
    lsSet('gridState', state);
  }

  colsR.addEventListener('input', () => { state.cols = +colsR.value; colsV.textContent = state.cols; render(); });
  rowsR.addEventListener('input', () => { state.rows = +rowsR.value; rowsV.textContent = state.rows; render(); });
  gapR.addEventListener('input',  () => { state.gap  = +gapR.value;  gapV.textContent  = state.gap;  render(); });
  tempSel.addEventListener('change', () => { state.template = tempSel.value; render(); });

  bindCopyButtons('copyGridHtml', 'copyGridCss', code);
  document.getElementById('resetGrid').addEventListener('click', () => { state = { ...defaults }; applyState(); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   6. ANIMATION GENERATOR
   ═══════════════════════════════════════════════════════ */
(function animTool() {

  const defaults = { type: 'fade', duration: 10, easing: 'ease', iteration: 'infinite', color: '#6c63ff' };
  let state = lsGet('animState', { ...defaults });
  let styleTag = null;

  const preview  = document.getElementById('animPreview');
  const code     = document.getElementById('animationCode');
  const typeSel  = document.getElementById('animType');
  const durR     = document.getElementById('animDuration');
  const durV     = document.getElementById('animDurVal');
  const easeSel  = document.getElementById('animEasing');
  const iterSel  = document.getElementById('animIteration');
  const colorP   = document.getElementById('animColor');
  if (!preview || !code || !typeSel || !durR || !durV || !easeSel || !iterSel || !colorP) return;

  function applyState() {
    typeSel.value  = state.type;
    durR.value     = state.duration; durV.textContent = (state.duration / 10).toFixed(1);
    easeSel.value  = state.easing;
    iterSel.value  = state.iteration;
    colorP.value   = state.color;
    render();
  }

  const keyframes = {
    fade: `@keyframes anim-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
    'slide-up': `@keyframes anim-slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}`,
    'slide-left': `@keyframes anim-slide-left {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}`,
    bounce: `@keyframes anim-bounce {
  0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50% { transform: translateY(-30px); animation-timing-function: cubic-bezier(0,0,0.2,1); }
}`,
    rotate: `@keyframes anim-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
    scale: `@keyframes anim-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}`,
    shake: `@keyframes anim-shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}`
  };

  function render() {
    const dur = (state.duration / 10).toFixed(1);
    const animName = `anim-${state.type}`;
    preview.style.background  = state.color;
    preview.style.animation   = `${animName} ${dur}s ${state.easing} ${state.iteration}`;
    
    const css = `.element {
  animation: ${animName} ${dur}s ${state.easing} ${state.iteration};
}

/* Keyframes */
${keyframes[state.type] || ''}`;

    code.textContent = formatHtmlCssOutput('<div class="element"></div>', css);
    lsSet('animState', state);
  }

  typeSel.addEventListener('change',  () => { state.type      = typeSel.value;  render(); });
  durR.addEventListener('input',      () => { state.duration  = +durR.value; durV.textContent = (state.duration/10).toFixed(1); render(); });
  easeSel.addEventListener('change',  () => { state.easing    = easeSel.value;  render(); });
  iterSel.addEventListener('change',  () => { state.iteration = iterSel.value;  render(); });
  colorP.addEventListener('input',    () => { state.color     = colorP.value;   render(); });

  bindCopyButtons('copyAnimationHtml', 'copyAnimationCss', code);
  document.getElementById('resetAnimation').addEventListener('click', () => { state = { ...defaults }; applyState(); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   7. BUTTON GENERATOR
   ═══════════════════════════════════════════════════════ */
(function buttonTool() {

  const defaults = { text: 'Click Me', bg: '#6c63ff', color: '#ffffff', ph: 24, pv: 12, br: 8, fs: 16, bw: 0, bc: '#6c63ff' };
  let state = lsGet('btnState', { ...defaults });

  const preview  = document.getElementById('buttonPreview');
  const code     = document.getElementById('buttonCode');
  if (!preview || !code || !getEl('btnText') || !getEl('btnBg') || !getEl('btnColor') || !getEl('btnPH') || !getEl('btnPV') || !getEl('btnBR') || !getEl('btnFS') || !getEl('btnBW') || !getEl('btnBC')) return;

  function getEl(id) { return document.getElementById(id); }

  function applyState() {
    getEl('btnText').value    = state.text;
    getEl('btnBg').value      = state.bg;    getEl('btnBgHex').value    = state.bg;
    getEl('btnColor').value   = state.color; getEl('btnColorHex').value = state.color;
    getEl('btnPH').value      = state.ph;    getEl('btnPHVal').textContent = state.ph;
    getEl('btnPV').value      = state.pv;    getEl('btnPVVal').textContent = state.pv;
    getEl('btnBR').value      = state.br;    getEl('btnBRVal').textContent = state.br;
    getEl('btnFS').value      = state.fs;    getEl('btnFSVal').textContent = state.fs;
    getEl('btnBW').value      = state.bw;    getEl('btnBWVal').textContent = state.bw;
    getEl('btnBC').value      = state.bc;
    render();
  }

  function render() {
    preview.textContent = state.text;
    Object.assign(preview.style, {
      background:   state.bg,
      color:        state.color,
      padding:      `${state.pv}px ${state.ph}px`,
      borderRadius: `${state.br}px`,
      fontSize:     `${state.fs}px`,
      border:       state.bw > 0 ? `${state.bw}px solid ${state.bc}` : 'none',
    });
    const css =
`.button {
  background: ${state.bg};
  color: ${state.color};
  padding: ${state.pv}px ${state.ph}px;
  border-radius: ${state.br}px;
  font-size: ${state.fs}px;
  border: ${state.bw > 0 ? `${state.bw}px solid ${state.bc}` : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;
}`;
    code.textContent = formatHtmlCssOutput(`<button class="button">${state.text}</button>`, css);
    lsSet('btnState', state);
  }

  // Wire inputs
  getEl('btnText').addEventListener('input', () => { state.text = getEl('btnText').value; render(); });

  [['btnBg','btnBgHex','bg'],['btnColor','btnColorHex','color'],['btnBC',null,'bc']].forEach(([p, h, k]) => {
    getEl(p).addEventListener('input', () => { state[k] = getEl(p).value; if (h) getEl(h).value = state[k]; render(); });
    if (h) getEl(h).addEventListener('input', () => {
      if (/^#[0-9a-fA-F]{6}$/.test(getEl(h).value)) { state[k] = getEl(h).value; getEl(p).value = state[k]; render(); }
    });
  });

  [['btnPH','btnPHVal','ph'],['btnPV','btnPVVal','pv'],['btnBR','btnBRVal','br'],['btnFS','btnFSVal','fs'],['btnBW','btnBWVal','bw']].forEach(([r, v, k]) => {
    getEl(r).addEventListener('input', () => { state[k] = +getEl(r).value; getEl(v).textContent = state[k]; render(); });
  });

  // Hover effect
  const hoverBg = darken(defaults.bg, 15);
  preview.addEventListener('mouseenter', () => { preview.style.opacity = '0.85'; preview.style.transform = 'translateY(-2px)'; });
  preview.addEventListener('mouseleave', () => { preview.style.opacity = '1';    preview.style.transform = 'none'; });

  function darken(hex, pct) {
    const r = Math.max(0, parseInt(hex.slice(1,3),16) - pct);
    const g = Math.max(0, parseInt(hex.slice(3,5),16) - pct);
    const b = Math.max(0, parseInt(hex.slice(5,7),16) - pct);
    return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
  }

  bindCopyButtons('copyButtonHtml', 'copyButtonCss', code);
  document.getElementById('resetButton').addEventListener('click', () => { state = { ...defaults }; applyState(); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   8. GLASSMORPHISM GENERATOR
   ═══════════════════════════════════════════════════════ */
(function glassTool() {

  const defaults = { blur: 12, opacity: 15, border: 30, radius: 16, bg: '#ffffff' };
  let state = lsGet('glassState', { ...defaults });

  const preview = document.getElementById('glassPreview');
  const code    = document.getElementById('glassCode');
  if (!preview || !code || !getEl('glassBlur') || !getEl('glassOpacity') || !getEl('glassBorder') || !getEl('glassRadius') || !getEl('glassBg')) return;

  function getEl(id) { return document.getElementById(id); }

  function hexToRgb(hex) {
    return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
  }

  function applyState() {
    getEl('glassBlur').value    = state.blur;    getEl('glassBlurVal').textContent    = state.blur;
    getEl('glassOpacity').value = state.opacity; getEl('glassOpacityVal').textContent = (state.opacity/100).toFixed(2);
    getEl('glassBorder').value  = state.border;  getEl('glassBorderVal').textContent  = (state.border/100).toFixed(2);
    getEl('glassRadius').value  = state.radius;  getEl('glassRadiusVal').textContent  = state.radius;
    getEl('glassBg').value      = state.bg;
    render();
  }

  function render() {
    const [r,g,b] = hexToRgb(state.bg);
    const bg     = `rgba(${r},${g},${b},${state.opacity/100})`;
    const border = `rgba(${r},${g},${b},${state.border/100})`;
    Object.assign(preview.style, {
      background:       bg,
      backdropFilter:   `blur(${state.blur}px)`,
      WebkitBackdropFilter: `blur(${state.blur}px)`,
      border:           `1px solid ${border}`,
      borderRadius:     `${state.radius}px`,
    });
    const css =
`.glass {
  background: ${bg};
  backdrop-filter: blur(${state.blur}px);
  -webkit-backdrop-filter: blur(${state.blur}px);
  border: 1px solid ${border};
  border-radius: ${state.radius}px;
}`;
    code.textContent = formatHtmlCssOutput('<div class="glass">Glass Card</div>', css);
    lsSet('glassState', state);
  }

  getEl('glassBlur').addEventListener('input',    () => { state.blur    = +getEl('glassBlur').value;    getEl('glassBlurVal').textContent    = state.blur;                          render(); });
  getEl('glassOpacity').addEventListener('input', () => { state.opacity = +getEl('glassOpacity').value; getEl('glassOpacityVal').textContent = (state.opacity/100).toFixed(2);     render(); });
  getEl('glassBorder').addEventListener('input',  () => { state.border  = +getEl('glassBorder').value;  getEl('glassBorderVal').textContent  = (state.border/100).toFixed(2);      render(); });
  getEl('glassRadius').addEventListener('input',  () => { state.radius  = +getEl('glassRadius').value;  getEl('glassRadiusVal').textContent  = state.radius;                       render(); });
  getEl('glassBg').addEventListener('input',      () => { state.bg      = getEl('glassBg').value;                                                                                  render(); });

  bindCopyButtons('copyGlassHtml', 'copyGlassCss', code);
  document.getElementById('resetGlass').addEventListener('click', () => { state = { ...defaults }; applyState(); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   9. CLIP-PATH GENERATOR
   ═══════════════════════════════════════════════════════ */
(function clipTool() {

  const defaults = { clip: 'polygon(50% 0%, 0% 100%, 100% 100%)', color: '#6c63ff' };
  let state = lsGet('clipState', { ...defaults });

  const preview = document.getElementById('clipPreview');
  const code    = document.getElementById('clipCode');
  if (!preview || !code || !document.getElementById('clipColor')) return;

  function applyState() {
    document.getElementById('clipColor').value = state.color;
    render();
  }

  function render() {
    preview.style.clipPath  = state.clip;
    preview.style.background = state.color;
    code.textContent = formatHtmlCssOutput(
      '<div class="clip-shape"></div>',
      `.clip-shape {
  width: 180px;
  height: 180px;
  background: ${state.color};
  clip-path: ${state.clip};
}`
    );
    lsSet('clipState', state);
  }

  document.querySelectorAll('[data-clip]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-clip]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.clip = chip.dataset.clip;
      render();
    });
  });

  document.getElementById('clipColor').addEventListener('input', e => { state.color = e.target.value; render(); });

  bindCopyButtons('copyClipHtml', 'copyClipCss', code);
  document.getElementById('resetClip').addEventListener('click', () => { state = { ...defaults }; applyState(); document.querySelectorAll('[data-clip]').forEach(c => c.classList.remove('active')); });

  applyState();
})();

/* ═══════════════════════════════════════════════════════
   10. LOADER / SPINNER GENERATOR
   ═══════════════════════════════════════════════════════ */
(function loaderTool() {

  const defaults = { type: 'ring', color: '#6c63ff', speed: 10, size: 50 };
  let state = lsGet('loaderState', { ...defaults });

  const preview   = document.getElementById('loaderPreview');
  const code      = document.getElementById('loaderCode');
  const colorP    = document.getElementById('loaderColor');
  const colorHex  = document.getElementById('loaderColorHex');
  const speedR    = document.getElementById('loaderSpeed');
  const speedV    = document.getElementById('loaderSpeedVal');
  const sizeR     = document.getElementById('loaderSize');
  const sizeV     = document.getElementById('loaderSizeVal');
  const typeSel   = document.getElementById('loaderType');
  if (!preview || !code || !colorP || !colorHex || !speedR || !speedV || !sizeR || !sizeV || !typeSel) return;

  function applyState() {
    typeSel.value   = state.type;
    colorP.value    = state.color; colorHex.value   = state.color;
    speedR.value    = state.speed; speedV.textContent = (state.speed / 10).toFixed(1);
    sizeR.value     = state.size;  sizeV.textContent  = state.size;
    render();
  }

  function render() {
    const speed = (state.speed / 10).toFixed(1) + 's';
    const s     = state.size;
    preview.innerHTML = '';
    preview.style.setProperty('--loader-color', state.color);
    preview.style.setProperty('--loader-speed', speed);

    let el, cssText;

    if (state.type === 'ring') {
      el = document.createElement('div');
      el.className = 'spinner-ring';
      el.style.cssText = `width:${s}px;height:${s}px;border-width:${Math.max(3,s/12)}px`;
      cssText =
`.spinner {
  width: ${s}px;
  height: ${s}px;
  border-radius: 50%;
  border: ${Math.max(3,s/12|0)}px solid rgba(108,99,255,0.2);
  border-top-color: ${state.color};
  animation: spin ${speed} linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }`;
    } else if (state.type === 'dots') {
      el = document.createElement('div');
      el.className = 'spinner-dots';
      for (let i=0;i<3;i++) { const sp = document.createElement('span'); el.appendChild(sp); }
      cssText =
`.spinner { display: flex; gap: 8px; }
.spinner span {
  width: ${s/4|0}px; height: ${s/4|0}px;
  border-radius: 50%;
  background: ${state.color};
  animation: bounce ${speed} ease-in-out infinite;
}
.spinner span:nth-child(2) { animation-delay: 0.15s; }
.spinner span:nth-child(3) { animation-delay: 0.30s; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-${s/2}px)} }`;
    } else if (state.type === 'bars') {
      el = document.createElement('div');
      el.className = 'spinner-bars';
      for (let i=0;i<5;i++) {
        const sp = document.createElement('span');
        sp.style.width = `${s/7|0}px`;
        el.appendChild(sp);
      }
      cssText =
`.spinner { display:flex; gap:4px; align-items:flex-end; height:${s}px; }
.spinner span {
  width: ${s/7|0}px;
  background: ${state.color};
  border-radius: 4px;
  animation: bar-pulse ${speed} ease-in-out infinite;
}
@keyframes bar-pulse { 0%,100%{height:${s/4}px} 50%{height:${s}px} }`;
    } else if (state.type === 'dual') {
      el = document.createElement('div');
      el.className = 'spinner-dual';
      el.style.cssText = `width:${s}px;height:${s}px;border-width:${Math.max(3,s/12)}px`;
      cssText =
`.spinner {
  width: ${s}px; height: ${s}px;
  border-radius: 50%;
  border: ${Math.max(3,s/12|0)}px solid transparent;
  border-top-color: ${state.color};
  border-bottom-color: ${state.color};
  animation: spin ${speed} linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }`;
    } else if (state.type === 'ripple') {
      el = document.createElement('div');
      el.className = 'spinner-ripple';
      el.style.cssText = `width:${s}px;height:${s}px`;
      for (let i=0;i<2;i++) {
        const sp = document.createElement('span');
        sp.style.cssText = `inset:0;width:${s}px;height:${s}px`;
        el.appendChild(sp);
      }
      cssText =
`.spinner { position:relative; width:${s}px; height:${s}px; }
.spinner span {
  position:absolute; border-radius:50%; width:100%; height:100%;
  border: 3px solid ${state.color};
  animation: ripple ${speed} ease-out infinite;
}
.spinner span:nth-child(2) { animation-delay: ${parseFloat(speed)/2}s; }
@keyframes ripple { 0%{transform:scale(0);opacity:1} 100%{transform:scale(1);opacity:0} }`;
    }

    if (el) preview.appendChild(el);
    code.textContent = formatHtmlCssOutput('<div class="spinner"></div>', cssText);
    lsSet('loaderState', state);
  }

  typeSel.addEventListener('change', () => { state.type = typeSel.value; render(); });
  colorP.addEventListener('input',   () => { state.color = colorP.value; colorHex.value = state.color; render(); });
  colorHex.addEventListener('input', () => {
    if (/^#[0-9a-fA-F]{6}$/.test(colorHex.value)) { state.color = colorHex.value; colorP.value = state.color; render(); }
  });
  speedR.addEventListener('input', () => { state.speed = +speedR.value; speedV.textContent = (state.speed/10).toFixed(1); render(); });
  sizeR.addEventListener('input',  () => { state.size  = +sizeR.value;  sizeV.textContent  = state.size;                   render(); });

  bindCopyButtons('copyLoaderHtml', 'copyLoaderCss', code);
  document.getElementById('resetLoader').addEventListener('click', () => { state = { ...defaults }; applyState(); });

  applyState();
})();
