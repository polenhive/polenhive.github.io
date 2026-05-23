import { personajes } from './personajes.js';

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

  const app =
    document.getElementById('app');

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
        app.innerHTML = renderLibreria();
        break;

      case 'lector':
        app.innerHTML = renderLector(datos);
        break;
    }

    actualizarNavActivo();

    app.style.transition =
      'opacity 0.3s, transform 0.3s';

    app.style.opacity = '1';

    app.style.transform = 'translateY(0)';

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }, 150);
}

// ---- HOME ----

function renderHome() {

  if (typeof COMICS === 'undefined') {

    return `
      <div class="hero">
        <h1>✨ Todos Los Gatos Son Pardos ✨</h1>
        <p>Tu webcomic aesthetic 💖</p>
      </div>

      <div class="banner-grid">

        <div
          class="banner-card characters"
          onclick="navegarA('characters')"
        >

          <span class="banner-card-icon">
            👥
          </span>

          <div>

            <div class="banner-card-titulo">
              PERSONAJES
            </div>

            <div class="banner-card-sub">
              Conoce al cast ✨
            </div>

          </div>

        </div>

      </div>
    `;
  }

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

      <h1>✨ Últimos Capítulos ✨</h1>

      <p>Nuevos cómics cada viernes 💖</p>

    </div>

    <div class="comics-grid">
      ${cardsHTML}
    </div>

    <div class="banner-grid">

      <div
        class="banner-card characters"
        onclick="navegarA('characters')"
      >

        <span class="banner-card-icon">
          👥
        </span>

        <div>

          <div class="banner-card-titulo">
            PERSONAJES
          </div>

          <div class="banner-card-sub">
            ¡Conoce a tus personajes favoritos! ✨
          </div>

        </div>

      </div>

      <div
        class="banner-card library"
        onclick="navegarA('library')"
      >

        <span class="banner-card-icon">
          📚
        </span>

        <div>

          <div class="banner-card-titulo">
            LIBRERÍA
          </div>

          <div class="banner-card-sub">
            Explora todos los volúmenes 📖
          </div>

        </div>

      </div>

    </div>
  `;
}

// ---- PERSONAJES ----

function renderPersonajes() {

  const cardsHTML = personajes.map(p => `

    <div
      class="personaje-card"
      onclick="openModal('${p.nombre}')"
    >

      <img
        src="${p.img}"
        alt="${p.nombre}"

        style="
          width:100%;
          height:260px;
          object-fit:cover;
          border-radius:18px;
          margin-bottom:1rem;
        "
      >

      <div class="personaje-nombre">
        ${p.nombre}
      </div>

      <div class="personaje-rol">
        ${p.rol}
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

      <p>Las mamus de Nuevo Tigre</p>

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
            max-height:350px;
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

// ---- MODAL ----

function openModal(nombre) {

  const p =
    personajes.find(
      x => x.nombre === nombre
    );

  if (!p) return;

  document.getElementById('avatar').src =
    p.img;

  document.getElementById('avatar').alt =
    p.nombre;

  document.getElementById('title').textContent =
    p.nombre;

  document.getElementById('subtitle').textContent =
    p.rol;

  document.getElementById('facts').innerHTML =

    p.facts
      .map(f => `<p>✦ ${f}</p>`)
      .join('');

  document.getElementById('bio').textContent =
    p.bio;

  document.getElementById('extra').innerHTML =
    p.extra || '';

  document
    .getElementById('modal')
    .classList.add('open');
}

function closeModal() {

  document
    .getElementById('modal')
    .classList.remove('open');
}

// ---- LIBRERÍA ----

function renderLibreria() {

  if (typeof COMICS === 'undefined') {
    return '';
  }

  const itemsHTML = COMICS.map((c, i) => `

    <div
      class="libreria-item"
      onclick="navegarA('lector', ${c.id})"
    >

      <span class="libreria-num">
        ${String(i + 1).padStart(2, '0')}
      </span>

      <div class="libreria-info">

        <div class="libreria-titulo">
          ${c.titulo}
        </div>

        <div class="libreria-cap">
          ${c.capitulo}
        </div>

      </div>

    </div>

  `).join('');

  return `

    <div class="hero">

      <h1>📚 LIBRERÍA</h1>

    </div>

    <div class="libreria-lista">

      ${itemsHTML}

    </div>

  `;
}

// ---- LECTOR ----

function renderLector(comicId) {

  if (typeof COMICS === 'undefined') {
    return '';
  }

  const comic =
    COMICS.find(c => c.id === comicId)
    || COMICS[0];

  comicActual = comic;

  paginaLector = 1;

  return `
    <div class="hero">

      <h1>${comic.titulo}</h1>

      <p>${comic.capitulo}</p>

    </div>
  `;
}

// ---- CAMBIO DE MODO ----

function cambiarModo(modo) {

  modoLector = modo;

  if (comicActual) {
    navegarA('lector', comicActual.id);
  }
}

// ---- TICKER ----

function renderTicker() {

  const ticker =
    document.getElementById('ticker-inner');

  if (!ticker) return;

  const mensajes = [

    '✨ Nuevos capítulos pronto ✨',

    '💖 Bienvenida a Nuevo Tigre 💖',

    '🎀 Webcomic update 🎀',

    '📚 Lee el nuevo capítulo 📚'

  ];

  ticker.innerHTML =

    [...mensajes, ...mensajes]

      .map(t => `<span>${t}</span>`)

      .join('');
}

// ---- STICKERS ----

function renderStickers() {

  const stickers = [
    '🎀',
    '🌸',
    '💖',
    '🦋'
  ];

  const posiciones = [

    { left: '3%', top: '20%', delay: '0s' },

    { right: '3%', top: '30%', delay: '1s' },

    { left: '4%', bottom: '20%', delay: '2s' },

    { right: '4%', bottom: '25%', delay: '0.5s' },

  ];

  const container =
    document.getElementById('stickers');

  if (!container) return;

  posiciones.forEach((pos, i) => {

    const el =
      document.createElement('div');

    el.className = 'sticker';

    el.textContent =
      stickers[i % stickers.length];

    el.style.cssText =

      Object.entries(pos)

        .map(([k, v]) => {

          if (k === 'delay') {
            return `animation-delay:${v}`;
          }

          return `${k}:${v}`;

        })

        .join(';');

    container.appendChild(el);
  });
}

// ---- NAVBAR ----

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
