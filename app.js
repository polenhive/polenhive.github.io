// ================================================
// LÓGICA PRINCIPAL - Navegación entre páginas
// ================================================

let paginaActual = 'home';
let comicActual = null;
let paginaLector = 1;
let modoLector = 'page';
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

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }, 150);
}

// ================================================
// HOME
// ================================================

function renderHome() {

  const cardsHTML = COMICS.map(c => `

    <div
      class="comic-card"
      onclick="navegarA('lector', ${c.id})"
    >

      <img
        src="${c.imagen}"
        alt="${c.titulo}"
        loading="lazy"
      >

      <div class="comic-card-body">

        <div class="comic-card-titulo">
          ${c.titulo}
        </div>

        <div class="comic-card-capitulo">
          ${c.capitulo}
        </div>

        <div class="comic-card-fecha">
          ${c.fecha}
        </div>

        <div class="comic-card-footer">

          <span class="btn-leer">
            Leer ahora →
          </span>

          <span class="hearts">
            ${'❤️'.repeat(c.rating)}
          </span>

        </div>

      </div>

    </div>

  `).join('');

  return `

    <div class="hero">

      <h1>
        ✨ ${SITE_CONFIG.nombre} ✨
      </h1>

      <p>
        ${SITE_CONFIG.tagline}
      </p>

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

    <div
      class="personaje-card"
      onclick="openModal('${p.id}')"
    >

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

      <div class="personaje-nombre">
        ${p.nombre}
      </div>

      <div class="personaje-rol">
        ${p.subtitulo}
      </div>

    </div>

  `).join('');

  return `

    <div
      class="hero"

      style="
        background:
        linear-gradient(
          180deg,
          #ede9fe 0%,
          #fce7f3 100%
        )
      "
    >

      <h1>💜 Conoce al Cast 💜</h1>

      <p>
        Haz click para más información
      </p>

    </div>

    <div class="personajes-grid">

      ${cardsHTML}

    </div>

    <div id="modal" class="modal">

      <div class="modal-content">

        <button
          id="closeBtn"
          onclick="closeModal()"
        >
          ✕
        </button>

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

// ================================================
// MODAL PERSONAJES
// ================================================

function openModal(id) {

  const p = PERSONAJES.find(
    x => x.id === id
  );

  if (!p) return;

  document.getElementById('avatar').src =
    p.img;

  document.getElementById('title').textContent =
    p.nombre_completo;

  document.getElementById('subtitle').textContent =
    p.rol;

  document.getElementById('facts').innerHTML =

    p.facts
      .map(f => `<p>✦ ${f}</p>`)
      .join('');

  document.getElementById('bio').innerHTML =
    `<p>${p.bio}</p>`;

  document.getElementById('extra').innerHTML =
    `<p>${p.extra}</p>`;

  document
    .getElementById('modal')
    .classList.add('open');
}

function closeModal() {

  document
    .getElementById('modal')
    .classList.remove('open');
}

// ================================================
// EXTRAS
// ================================================

function renderExtras() {

  const arteHTML = EXTRAS.arteConceptual.map(a => `

    <div class="extra-card">

      <img
        src="${a.img}"
        alt="${a.titulo}"
      >

      <h3>${a.titulo}</h3>

      <p>${a.descripcion}</p>

    </div>

  `).join('');

  return `

    <div class="hero">

      <h1>🎀 Extras 🎀</h1>

      <p>
        Arte conceptual + contacto
      </p>

    </div>

    <div class="extras-grid">

      ${arteHTML}

    </div>

    <div class="contacto-box">

      <h2>
        Contacta a la creadora
      </h2>

      <p>
        ${EXTRAS.autora.nombre}
      </p>

      <p>
        ${EXTRAS.autora.usuario}
      </p>

      <p>
        ${EXTRAS.autora.email}
      </p>

      <p>
        ${EXTRAS.autora.linkedin}
      </p>

    </div>

  `;
}

// ================================================
// LECTOR
// ================================================

function renderLector(comicId) {

  const comic =
    COMICS.find(c => c.id === comicId)
    || COMICS[0];

  comicActual = comic;

  paginaLector = 1;

  return buildLectorHTML(comic);
}

function buildLectorHTML(comic) {

  const paginasHTML =
    Array.from(
      { length: comic.paginas },
      (_, i) => `

      <div
        class="pagina-comic"

        style="
          margin-bottom:2rem;
        "
      >

        <img
          src="img/${comic.slug}/${i + 1}.jpg"

          style="
            width:100%;
            border-radius:18px;
          "
        >

      </div>

    `).join('');

  return `

    <div class="lector-header">

      <button
        class="lector-home-btn"
        onclick="navegarA('home')"
      >
        🏠
      </button>

      <div>

        <div class="lector-titulo">
          ${comic.capitulo}
        </div>

        <div class="lector-subtitulo">
          ${comic.titulo}
        </div>

      </div>

    </div>

    <div
      id="lector-contenido"

      style="
        max-width:900px;
        margin:2rem auto;
        padding:0 1.5rem;
      "
    >

      ${paginasHTML}

    </div>

  `;
}

// ================================================
// TICKER
// ================================================

function renderTicker() {

  const items = [

    ...SITE_CONFIG.anuncio_ticker,

    ...SITE_CONFIG.anuncio_ticker

  ];

  document.getElementById(
    'ticker-inner'
  ).innerHTML =

    items.map(t => `<span>${t}</span>`).join('');
}

// ================================================
// STICKERS
// ================================================

function renderStickers() {

  const stickers = [
    '🎀',
    '🌸',
    '💖',
    '🦋'
  ];

  const posiciones = [

    { left: '3%', top: '20%' },

    { right: '3%', top: '30%' },

    { left: '4%', bottom: '20%' },

    { right: '4%', bottom: '25%' },

  ];

  const container =
    document.getElementById('stickers');

  posiciones.forEach((pos, i) => {

    const el =
      document.createElement('div');

    el.className = 'sticker';

    el.textContent =
      stickers[i % stickers.length];

    el.style.cssText =

      Object.entries(pos)

        .map(([k, v]) => `${k}:${v}`)

        .join(';');

    container.appendChild(el);
  });
}

// ================================================
// MÚSICA
// ================================================

function toggleMusica() {

  musicaActiva = !musicaActiva;

  document.getElementById(
    'btn-musica-texto'
  ).textContent =

    musicaActiva
      ? '🎵 Music ON'
      : '🎵 Music OFF';
}

// ================================================
// NAVBAR
// ================================================

function actualizarNavActivo() {

  document
    .querySelectorAll('.navbar-nav a')

    .forEach(a => {

      a.classList.remove('activo');

      if (a.dataset.pagina === paginaActual) {

        a.classList.add('activo');

      }

    });
}
