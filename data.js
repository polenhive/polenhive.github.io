// ================================================
// DATOS DEL SITIO - Edita aquí todo el contenido
// ================================================

const SITE_CONFIG = {
  nombre: "CHICA CÓMIC",
  tagline: "Tu mundo de cómics ✨",
  discord: "https://discord.gg/chicacomic",
  anuncio_ticker: [
    "🌟 NUEVO CAPÍTULO CADA VIERNES 🌟",
    "💖 ÚNETE A NUESTRO DISCORD 💖",
    "✨ MERCH PRÓXIMAMENTE ✨",
    "🎀 SÍGUENOS EN INSTAGRAM 🎀"
  ]
};

const COMICS = [
  {
    id: 1,
    titulo: "Corazón de Lotería",
    capitulo: "Capítulo 12",
    fecha: "10 de mayo, 2026",
    imagen: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
    rating: 3,       // número de corazones (1-5)
    slug: "corazon-de-loteria",
    descripcion: "Una historia de amor entre cartas de lotería y destino.",
    paginas: 5
  },
  {
    id: 2,
    titulo: "Glitter Dreams",
    capitulo: "Capítulo 11",
    fecha: "3 de mayo, 2026",
    imagen: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=400&q=80",
    rating: 3,
    slug: "glitter-dreams",
    descripcion: "Donde los sueños brillan más que cualquier diamante.",
    paginas: 4
  },
  {
    id: 3,
    titulo: "Rosa Perfección",
    capitulo: "Capítulo 10",
    fecha: "26 de abril, 2026",
    imagen: "https://images.unsplash.com/photo-1490750967868-88df5691cc8b?w=400&q=80",
    rating: 3,
    slug: "rosa-perfeccion",
    descripcion: "La perfección existe, y huele a rosas.",
    paginas: 6
  }
];

const PERSONAJES = [
  {
    nombre: "Luna",
    rol: "Protagonista",
    descripcion: "Estudiante soñadora que descubre poderes mágicos.",
    emoji: "🌙",
    color: "#ff69b4"
  },
  {
    nombre: "Estrella",
    rol: "Mejor amiga",
    descripcion: "Siempre positiva y llena de energía.",
    emoji: "⭐",
    color: "#c084fc"
  },
  {
    nombre: "Cosmos",
    rol: "Misterioso",
    descripcion: "Nadie sabe de dónde viene, pero todos lo quieren.",
    emoji: "🔮",
    color: "#60a5fa"
  }
];
