//
// ================================================
// DATOS DEL SITIO - Edita aquí todo el contenido
// ================================================
//

const SITECONFIG = {
  nombre: "Todos Los Gatos Son Pardos ✨",
  tagline: "Cómic web Y2K / coquette",
  discord: "https://discord.gg/chicacomic",
  anuncioticker: [
    "🌟 NUEVO CAPÍTULO CADA VIERNES 🌟",
    "💖 ÚNETE A NUESTRO DISCORD 💖",
    "✨ MERCH PRÓXIMAMENTE ✨",
    "🎀 SÍGUENOS EN INSTAGRAM 🎀"
  ]
};

// Capítulos — mantengo ids y slugs para no romper rutas internas
const COMICS = [
  {
    id: 1,
    titulo: "¿Quién mueve el mundo? Las Chicas (Who Run The World, Girls)",
    capitulo: "Capítulo 1",
    fecha: "10 de mayo, 2026",
    imagen: "./images/cap-01-cover.jpg",
    // TODO: colocar ./images/cap-01-cover.jpg (recomendado 1200x675)
    rating: 3,
    slug: "corazon-de-loteria", // se conserva para compatibilidad
    descripcion: "introducción",
    paginas: 5
  },
  {
    id: 2,
    titulo: "Voto Latino",
    capitulo: "Capítulo 2",
    fecha: "3 de mayo, 2026",
    imagen: "./images/cap-02-cover.jpg",
    // TODO: colocar ./images/cap-02-cover.jpg (1200x675)
    rating: 3,
    slug: "glitter-dreams",
    descripcion: "—",
    paginas: 4
  },
  {
    id: 3,
    titulo: "Oda al portero (Ode to the Bouncer)",
    capitulo: "Capítulo 3",
    fecha: "26 de abril, 2026",
    imagen: "./images/cap-03-cover.jpg",
    // TODO: colocar ./images/cap-03-cover.jpg (1200x675)
    rating: 3,
    slug: "rosa-perfeccion",
    descripcion: "—",
    paginas: 6
  }
];

// Personajes — nombres y bios reales
const PERSONAJES = [
  {
    nombre: "Karla Pardo",
    rol: "Protagonista",
    descripcion: "Hola Soy Pola.",
    emoji: "🌙",
    color: "#ff69b4"
  },
  {
    nombre: "Diana Trejo",
    rol: "Mejor amiga",
    descripcion: "Hola Soy Pola.",
    emoji: "⭐",
    color: "#c084fc"
  },
  {
    nombre: "Máximo Pardo",
    rol: "Misterioso",
    descripcion: "Hola Soy Pola.",
    emoji: "🔮",
    color: "#60a5fa"
  }
];

