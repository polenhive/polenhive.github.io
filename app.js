// ================================================
// LÓGICA PRINCIPAL - Navegación entre páginas
// ================================================

let paginaActual = 'home';
let comicActual = null;
let musicaActiva = false;

document.addEventListener('DOMContentLoaded', () => {
  renderTicker();
  renderStickers();
  navegarA('home');
});

function navegarA(pagina, datos = null) {
  paginaActual = pagina;
  const app = document.getElementById('app');

  app.style.opacity = '0';
  app.style.transform = 'translateY(10px)';

  setTimeout(() => {
    app.innerHTML = '';

    switch (pagina) {
      case 'home':
        app.innerHTML = renderHome();
        break;
      case 'characters':
        app.innerHTML = renderPersonajes();
        break;
      case 'library':
        app.innerHTML = renderExtras();
        break;
      case 'lector':
        app.innerHTML = renderLector(datos);
        break;
    }

    actualizarNavActivo();

    app.style.transition = 'opacity 0.3s, transform 0.3s';
    app.style.opacity = '1';
    app.style.transform = 'translateY(0)';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 150);
}

// ================================================
// HOME / COMIC
// ================================================

function renderHome() {
  const cardsHTML = COMICS.map(c => `
    <div class="comic-card" onclick="navegarA('lector', ${c.id})">
      <img src="${c.imagen}" alt="${c.titulo}" loading="lazy">

      <div class="comic-card-body">
        <div class="comic-card-capitulo">${c.capitulo}</div>
        <div class="comic-card-titulo">${c.titulo}</div>
        <p class="comic-card-desc">${c.descripcion || ''}</p>

        <div class="comic-card-footer">
          <span class="btn-leer">Leer ahora →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="hero">
      <h1>${SITE_CONFIG.nombre}</h1>
      <p>${SITE_CONFIG.tagline || ''}</p>
    </div>

    <div class="comics-grid">
      ${cardsHTML}
    </div>
  `;
}

// ================================================
// PERSONAJES
// ================================================

function renderPersonajes() {
  const cardsHTML = PERSONAJES.map(p => `
    <div class="personaje-card" onclick="openModal('${p.id}')">
      <img
        src="${p.img}"
        alt="${p.nombre}"
        style="
          width:100%;
          height:320px;
          object-fit:cover;
          border-radius:18px;
          margin-bottom:1rem;
        "
      >

      <div class="personaje-nombre">${p.nombre}</div>
      <div class="personaje-rol">${p.subtitulo}</div>
    </div>
  `).join('');

  return `
    <div class="hero" style="background: linear-gradient(180deg, #ede9fe 0%, #fce7f3 100%)">
      <h1>💜 Conoce al Cast 💜</h1>
      <p>Haz click en una tarjeta para ver su ficha</p>
    </div>

    <div class="personajes-grid">
      ${cardsHTML}
    </div>

    <div id="modal" class="modal">
      <div class="modal-content">
        <button id="closeBtn" onclick="closeModal()">✕</button>

        <img
          id="avatar"
          src=""
          alt=""
          style="
            width:100%;
            max-height:420px;
            object-fit:cover;
            border-radius:18px;
            margin-bottom:1rem;
          "
        >

        <h2 id="title"></h2>
        <h3 id="subtitle"></h3>
        <div id="facts"></div>
        <p id="bio"></p>
        <div id="extra"></div>
      </div>
    </div>
  `;
}

function openModal(id) {
  const p = PERSONAJES.find(x => x.id === id);
  if (!p) return;

  document.getElementById('avatar').src = p.img;
  document.getElementById('avatar').alt = p.nombre;
  document.getElementById('title').textContent = p.nombre_completo || p.nombre;
  document.getElementById('subtitle').textContent = p.rol || '';
  document.getElementById('facts').innerHTML = (p.facts || []).map(f => `<p>✦ ${f}</p>`).join('');
  document.getElementById('bio').innerHTML = `<p>${p.bio || ''}</p>`;
  document.getElementById('extra').innerHTML = p.extra ? `<p>${p.extra.replace(/\n/g, '<br>')}</p>` : '';

  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// ================================================
// EXTRAS
// ================================================

function renderExtras() {
  const arteHTML = EXTRAS.arteConceptual.map(a => `
    <div class="extra-card">
      <img src="${a.img}" alt="${a.titulo}">
      <h3>${a.titulo}</h3>
      <p>${a.descripcion}</p>
    </div>
  `).join('');

  const proyectosHTML = (EXTRAS.proyectosSimilares || []).map(p => `
    <div class="extra-card">
      <img src="${p.img}" alt="${p.titulo}">
      <h3>${p.titulo}</h3>
      <p>${p.descripcion}</p>
    </div>
  `).join('');

  return `
    <div class="hero">
      <h1>🎀 Extras 🎀</h1>
      <p>Arte conceptual, contacto y proyectos similares</p>
    </div>

    <div class="seccion-titulo">Arte conceptual</div>
    <div class="extras-grid">
      ${arteHTML}
    </div>

    <div class="contacto-box">
      <h2>Sobre el proyecto</h2>
      <p>${EXTRAS.autora.texto}</p>

      <h2>Contacto</h2>
      <p>${EXTRAS.autora.nombre}</p>
      <p>${EXTRAS.autora.usuario}</p>
      <p>${EXTRAS.autora.email}</p>
      <p>${EXTRAS.autora.linkedin}</p>
    </div>

    <div class="seccion-titulo">Proyectos similares</div>
    <div class="extras-grid">
      ${proyectosHTML}
    </div>
  `;
}

// ================================================
// LECTOR
// ================================================

function renderLector(comicId) {
  const comic = COMICS.find(c => c.id === comicId) || COMICS[0];
  comicActual = comic;
  return buildLectorHTML(comic);
}

function buildLectorHTML(comic) {
  const contenidoHTML = (comic.paginas || []).map((pagina, index) => {
    const multimediaDespues = (comic.multimedia || [])
      .filter(m => m.despuesDePagina === index + 1)
      .map(m => renderMultimedia(m))
      .join('');

    return `
      <div class="pagina-comic" style="margin-bottom:2rem;">
        <img
          src="${pagina}"
          alt="${comic.titulo} página ${index + 1}"
          style="
            width:100%;
            border-radius:18px;
            display:block;
          "
        >
      </div>

      ${multimediaDespues}
    `;
  }).join('');

  const siguiente = COMICS.find(c => c.id === comic.id + 1);

  return `
    <div class="lector-header">
      <div class="lector-titulo-wrap">
        <button class="lector-home-btn" onclick="navegarA('home')">🏠</button>

        <div>
          <div class="lector-titulo">${comic.capitulo}</div>
          <div class="lector-subtitulo">${comic.titulo}</div>
        </div>
      </div>

      ${siguiente ? `
        <button class="btn-modo" onclick="navegarA('lector', ${siguiente.id})">
          Siguiente capítulo →
        </button>
      ` : `
        <button class="btn-modo" onclick="navegarA('home')">
          Volver al inicio
        </button>
      `}
    </div>

    <div
      id="lector-contenido"
      style="
        max-width:900px;
        margin:2rem auto;
        padding:0 1.5rem;
      "
    >
      ${contenidoHTML || `
        <div class="pagina-comic" style="padding:3rem; text-align:center;">
          <h2>Capítulo en preparación</h2>
          <p>Agrega las páginas en data.js dentro del arreglo paginas.</p>
        </div>
      `}
    </div>
  `;
}

function renderMultimedia(m) {
  if (m.tipo === 'video') {
    return `
      <div class="multimedia-box" style="margin:2rem 0;">
        <video controls style="width:100%; border-radius:18px;">
          <source src="${m.src}" type="video/mp4">
          Tu navegador no puede reproducir este video.
        </video>
      </div>
    `;
  }

  if (m.tipo === 'audio') {
    return `
      <div class="multimedia-box" style="margin:2rem 0;">
        <audio controls style="width:100%;">
          <source src="${m.src}">
          Tu navegador no puede reproducir este audio.
        </audio>
      </div>
    `;
  }

  return '';
}

// ================================================
// TICKER
// ================================================

function renderTicker() {
  const ticker = document.getElementById('ticker-inner');
  if (!ticker) return;

  const items = [
    ...(SITE_CONFIG.anuncio_ticker || []),
    ...(SITE_CONFIG.anuncio_ticker || [])
  ];

  ticker.innerHTML = items.map(t => `<span>${t}</span>`).join('');
}

// ================================================
// STICKERS
// ================================================

function renderStickers() {
  const stickers = ['🎀', '🌸', '💖', '🦋', '⭐', '🌟', '💜', '🎀'];

  const posiciones = [
    { left: '3%', top: '20%', delay: '0s' },
    { right: '3%', top: '30%', delay: '1s' },
    { left: '4%', bottom: '20%', delay: '2s' },
    { right: '4%', bottom: '25%', delay: '0.5s' }
  ];

  const container = document.getElementById('stickers');
  if (!container) return;

  posiciones.forEach((pos, i) => {
    const el = document.createElement('div');
    el.className = 'sticker';
    el.textContent = stickers[i % stickers.length];

    el.style.cssText = Object.entries(pos).map(([k, v]) => {
      if (k === 'delay') return `animation-delay: ${v}`;
      return `${k}: ${v}`;
    }).join(';');

    container.appendChild(el);
  });
}

// ================================================
// MÚSICA
// ================================================

function toggleMusica() {
  musicaActiva = !musicaActiva;

  const btn = document.getElementById('btn-musica-texto');
  if (!btn) return;

  btn.textContent = musicaActiva ? '🎵 Music ON' : '🎵 Music OFF';
}

// ================================================
// NAVBAR
// ================================================

function actualizarNavActivo() {
  document.querySelectorAll('.navbar-nav a').forEach(a => {
    a.classList.remove('activo');
    if (a.dataset.pagina === paginaActual) a.classList.add('activo');
  });
}
