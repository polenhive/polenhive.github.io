// ================================================
// LÓGICA PRINCIPAL - Navegación entre páginas
// ================================================

let paginaActual = 'home';
let comicActual = null;
let paginaLector = 1;
let modoLector = 'page'; // 'scroll' o 'page'
let musicaActiva = false;

// ---- INICIALIZACIÓN ----

document.addEventListener('DOMContentLoaded', () => {
  renderTicker();
  renderStickers();
  navegarA('home');
});

// ---- NAVEGACIÓN ----

function navegarA(pagina, datos = null) {
  paginaActual = pagina;
  const app = document.getElementById('app');

  app.style.opacity = '0';
  app.style.transform = 'translateY(10px)';

  setTimeout(() => {
    app.innerHTML = '';

    switch (pagina) {
      case 'home':       app.innerHTML = renderHome(); break;
      case 'characters': app.innerHTML = renderPersonajes(); break;
      case 'library':    app.innerHTML = renderLibreria(); break;
      case 'lector':     app.innerHTML = renderLector(datos); break;
    }

    actualizarNavActivo();

    app.style.transition = 'opacity 0.3s, transform 0.3s';
    app.style.opacity = '1';
    app.style.transform = 'translateY(0)';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 150);
}

// ---- HOME ----

function renderHome() {
  const cardsHTML = COMICS.map(c => `
    <div class="comic-card" onclick="navegarA('lector', ${c.id})">
      <img src="${c.imagen}" alt="${c.titulo}" loading="lazy">
      <div class="comic-card-body">
        <div class="comic-card-titulo">${c.titulo}</div>
        <div class="comic-card-capitulo">${c.capitulo}</div>
        <div class="comic-card-fecha">${c.fecha}</div>
        <div class="comic-card-footer">
          <span class="btn-leer">Leer ahora →</span>
          <span class="hearts">${'❤️'.repeat(c.rating)}</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="hero">
      <h1>✨ Últimos Capítulos ✨</h1>
      <p>Nuevos cómics cada viernes 💖</p>
    </div>

    <div class="comics-grid">${cardsHTML}</div>

    <div class="banner-grid">
      <div class="banner-card characters" onclick="navegarA('characters')">
        <span class="banner-card-icon">👥</span>
        <div>
          <div class="banner-card-titulo">PERSONAJES</div>
          <div class="banner-card-sub">¡Conoce a tus personajes favoritos! ✨</div>
        </div>
      </div>
      <div class="banner-card library" onclick="navegarA('library')">
        <span class="banner-card-icon">📚</span>
        <div>
          <div class="banner-card-titulo">LIBRERÍA</div>
          <div class="banner-card-sub">Explora todos los volúmenes y archivos 📖</div>
        </div>
      </div>
    </div>
  `;
}

// ---- PERSONAJES ----

function renderPersonajes() {
  const cardsHTML = PERSONAJES.map(p => `
    <div class="personaje-card">
      <span class="personaje-emoji">${p.emoji}</span>
      <div class="personaje-nombre">${p.nombre}</div>
      <div class="personaje-rol">${p.rol}</div>
      <div class="personaje-desc">${p.descripcion}</div>
    </div>
  `).join('');

  return `
    <div class="hero" style="background: linear-gradient(180deg, #ede9fe 0%, #fce7f3 100%)">
      <h1>💜 MEET THE SQUAD 💜</h1>
      <p>Los personajes que hacen la magia</p>
    </div>
    <div class="personajes-grid">${cardsHTML}</div>
  `;
}

// ---- LIBRERÍA ----

function renderLibreria() {
  const itemsHTML = COMICS.map((c, i) => `
    <div class="libreria-item" onclick="navegarA('lector', ${c.id})">
      <span class="libreria-num">${String(i+1).padStart(2,'0')}</span>
      <div class="libreria-info">
        <div class="libreria-titulo">${c.titulo}</div>
        <div class="libreria-cap">${c.capitulo} · ${c.paginas} páginas</div>
      </div>
      <span>📖</span>
    </div>
  `).join('');

  return `
    <div class="hero" style="background: linear-gradient(180deg, #bae6fd 0%, #ede9fe 100%)">
      <h1>📚 LIBRERÍA</h1>
      <p>Todos los volúmenes y archivos</p>
    </div>
    <div class="seccion-titulo">Todos los cómics</div>
    <div class="libreria-lista">${itemsHTML}</div>
  `;
}

// ---- LECTOR ----

function renderLector(comicId) {
  const comic = COMICS.find(c => c.id === comicId) || COMICS[0];
  comicActual = comic;
  paginaLector = 1;

  return buildLectorHTML(comic);
}

function buildLectorHTML(comic) {
  const porcentaje = Math.round((paginaLector / comic.paginas) * 100);

  // Genera páginas de placeholder (en producción serían imágenes reales)
  const paginasHTML = Array.from({ length: comic.paginas }, (_, i) => `
    <div class="pagina-comic" id="pagina-${i+1}" style="
      display: ${modoLector === 'page' ? (i+1 === paginaLector ? 'flex' : 'none') : 'flex'};
      min-height: 500px;
      background: linear-gradient(135deg, #fff5fb, #f0e8ff);
      border-radius: 16px;
      border: 2px solid rgba(233,30,140,0.15);
      align-items: center;
      justify-content: center;
      font-family: var(--fuente-titulo);
      font-size: 1.5rem;
      color: var(--morado);
      margin-bottom: ${modoLector === 'scroll' ? '1.5rem' : '0'};
      position: relative;
    ">
      <div style="text-align:center">
        <div style="font-size:3rem; margin-bottom:1rem">📄</div>
        <div>Página ${i+1}</div>
        <div style="font-size:0.9rem; color: var(--rosa-fuerte); margin-top:0.5rem">${comic.titulo}</div>
      </div>
      <div style="
        position:absolute; top:1rem; left:1rem;
        background: var(--rosa-fuerte);
        color: white; padding:0.3rem 0.8rem;
        border-radius: 99px; font-size:0.8rem; font-weight:800;
      ">Página ${i+1}</div>
    </div>
  `).join('');

  return `
    <div class="lector-header">
      <div class="lector-titulo-wrap">
        <button class="lector-home-btn" onclick="navegarA('home')">🏠</button>
        <div>
          <div class="lector-titulo">${comic.capitulo}</div>
          <div class="lector-subtitulo">${comic.titulo}</div>
        </div>
      </div>
      <div class="lector-modos">
        <button class="btn-modo ${modoLector==='scroll'?'activo':''}" onclick="cambiarModo('scroll')">📜 Scroll</button>
        <button class="btn-modo ${modoLector==='page'?'activo':''}" onclick="cambiarModo('page')">📄 Página</button>
      </div>
      <div class="lector-acciones">
        <button class="btn-accion" title="Like">❤️</button>
        <button class="btn-accion" title="Guardar">🔖</button>
        <button class="btn-accion" title="Compartir">🔗</button>
      </div>
    </div>

    <div class="lector-progreso">
      <span>Página ${paginaLector} de ${comic.paginas}</span>
      <div class="barra-progreso-wrap">
        <div class="barra-progreso-fill" style="width: ${porcentaje}%"></div>
      </div>
      <span>${porcentaje}%</span>
    </div>

    <div id="lector-contenido" style="
      max-width: 900px; margin: 2rem auto; padding: 0 1.5rem;
      position: relative;
    ">
      ${paginasHTML}

      ${modoLector === 'page' ? `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem; padding-bottom:5rem;">
          <button onclick="cambiarPagina(-1)" style="
            background:${paginaLector > 1 ? 'var(--rosa-fuerte)' : '#e5e7eb'};
            color:white; border:none; width:56px; height:56px;
            border-radius:50%; font-size:1.5rem; cursor:pointer;
            box-shadow: var(--sombra-btn);
          " ${paginaLector <= 1 ? 'disabled' : ''}>‹</button>
          <span style="color:var(--morado); font-weight:700">${paginaLector} / ${comic.paginas}</span>
          <button onclick="cambiarPagina(1)" style="
            background:${paginaLector < comic.paginas ? 'var(--rosa-fuerte)' : '#e5e7eb'};
            color:white; border:none; width:56px; height:56px;
            border-radius:50%; font-size:1.5rem; cursor:pointer;
            box-shadow: var(--sombra-btn);
          " ${paginaLector >= comic.paginas ? 'disabled' : ''}>›</button>
        </div>
      ` : ''}
    </div>
  `;
}

function cambiarPagina(delta) {
  if (!comicActual) return;
  const nueva = paginaLector + delta;
  if (nueva < 1 || nueva > comicActual.paginas) return;
  paginaLector = nueva;
  navegarA('lector', comicActual.id);
}

function cambiarModo(modo) {
  modoLector = modo;
  if (comicActual) navegarA('lector', comicActual.id);
}

// ---- TICKER ----

function renderTicker() {
  const items = [...SITE_CONFIG.anuncio_ticker, ...SITE_CONFIG.anuncio_ticker];
  document.getElementById('ticker-inner').innerHTML =
    items.map(t => `<span>${t}</span>`).join('');
}

// ---- STICKERS FLOTANTES ----

function renderStickers() {
  const stickers = ['🎀', '🌸', '💖', '🦋', '⭐', '🌟', '💜', '🎀'];
  const posiciones = [
    { left: '3%', top: '20%', delay: '0s' },
    { right: '3%', top: '30%', delay: '1s' },
    { left: '4%', bottom: '20%', delay: '2s' },
    { right: '4%', bottom: '25%', delay: '0.5s' },
  ];

  const container = document.getElementById('stickers');
  posiciones.forEach((pos, i) => {
    const el = document.createElement('div');
    el.className = 'sticker';
    el.textContent = stickers[i % stickers.length];
    el.style.cssText = Object.entries(pos).map(([k,v]) => {
      if (k === 'delay') return `animation-delay: ${v}`;
      return `${k}: ${v}`;
    }).join(';');
    container.appendChild(el);
  });
}

// ---- MÚSICA ----

function toggleMusica() {
  musicaActiva = !musicaActiva;
  document.getElementById('btn-musica-texto').textContent =
    musicaActiva ? '🎵 Music ON' : '🎵 Music OFF';
}

// ---- NAVBAR ACTIVO ----

function actualizarNavActivo() {
  document.querySelectorAll('.navbar-nav a').forEach(a => {
    a.classList.remove('activo');
    if (a.dataset.pagina === paginaActual) a.classList.add('activo');
  });
}
