Va, este es tu `data.js` listo para copiar y pegar completo:

```js
//
// ================================================
// DATOS DEL SITIO - Edita aquí todo el contenido
// ================================================
//

const SITE_CONFIG = {
  nombre: "Todos Los Gatos Son Pardos ✨",
  
    "🎀 SÍGUEMe EN INSTAGRAM @POLENHIVE 🎀"
  ]
};

const COMICS = [
  {
    id: 1,
    titulo: "¿Quién Mueve al Mundo? ¡Las Chicas! (Who Run The World? Girls!)",
    capitulo: "Capítulo 1",
    imagen: "img/cap-01-cover.jpg",
    slug: "quien-mueve-al-mundo-las-chicas",
    descripcion: "El inicio de Todos Los Gatos Son Pardos.",
  },
  {
    id: 2,
    titulo: "Voto Latino",
    capitulo: "Capítulo 2",
    imagen: "img/cap-02-cover.jpg",
    slug: "voto-latino",
    descripcion: "El drama político empieza a hervir en Nuevo Tigre.",
  },
  {
    id: 3,
    titulo: "Oda al Portero (Ode to the Bouncer)",
    capitulo: "Capítulo 3",
    imagen: "img/cap-03-cover.jpg",
    slug: "oda-al-portero",
    descripcion: "Por fin conocemos la Marmota, y las chicas tienen demasiadas ganas de entrar.",
  }
];

const PERSONAJES = [
  {
    id: "karla",
    nombre: "Karla Pardo",
    nombre_completo: "Karla Pardo, La princesa de Nuevo Tigre",
    rol: "Protagonista",
    subtitulo: "La princesa de Nuevo Tigre",
    img: "img/Karla.png",
    color: "#ff69b4",
    facts: [
      "Edad: 17",
      "Ocupación: Estudiante de la Preparatoria Altavira",
      "Horóscopo: Leo",
      "Cumple: 8 de agosto",
      "Color favorito: Dorado",
      "Comida favorita: tártar de atún",
      "Interés: Música",
      "Relaciones: Heriberto Pardo (Padre), Rufino Pardo (Medio Hermano), Máximo Pardo (Medio Hermano), Katarzyna Mucek (Madre), Diana Trejo (Mejor Amiga)"
    ],
    bio: `Su lugar favorito es su cuarto, porque ahí puede perderse por horas entre partituras y melodías. Toca toda clase de instrumentos desde que era niña y la música se ha convertido en parte de quien es: practica todos los días, compone pequeñas piezas y escucha géneros de todo tipo para encontrar inspiración. Sueña con convertirse en una artista reconocida.`,
    extra: `Su relación con Diana:

Con Diana no siempre todo fue miel sobre hojuelas. A finales de su primer año de preparatoria, las dos quedaron nominadas en un concurso a la “Mejor Vestida”, y lo que empezó como competencia inocente pronto se convirtió en una rivalidad llena de tensión y ganas de demostrar quién merecía el título.

Karla y Diana estaban decididas a ganar… pero al final, la corona terminó en manos de una tal Becky Valderrama.

Y aunque parecía el tipo de momento que rompería cualquier posibilidad de amistad, pasó todo lo contrario. Después de perder, la rivalidad se apagó y entre ellas nació una conexión inesperada. Desde entonces, Diana se convirtió en la persona de confianza de Karla: la acompaña a todos lados, le da opiniones honestas aunque a veces no quiera escucharlas, y es quien la baja a la tierra cuando “se le sube lo Pardo”.`
  },
  {
    id: "diana",
    nombre: "Diana Trejo",
    nombre_completo: "Diana Trejo",
    rol: "Mejor amiga",
    subtitulo: "La mejor amiga con ojo de modista",
    img: "img/Diana.png",
    color: "#c084fc",
    facts: [
      "Edad: 17",
      "Ocupación: Estudiante de la Preparatoria Altavira",
      "Horóscopo: Tauro",
      "Cumple: 30 de abril",
      "Color favorito: Rosa",
      "Comida favorita: Pozole",
      "Interés: Moda",
      "Relaciones: Karla Pardo (Mejor amiga), Máximo Pardo (crush imposible), Familia Trejo (Padres)"
    ],
    bio: `Diana siempre ha tenido buen ojo para la moda. Desde pequeña le gustaba combinar ropa, arreglar prendas viejas y dibujar vestidos en las esquinas de sus cuadernos. Sueña con algún día convertirse en una gran modista y tener su propia marca, aunque sabe que no será fácil. Sus padres son estrictos y esperan que continúe trabajando en el negocio familiar: un almacén de frutas que ha pasado de generación en generación.

La escuela y su amistad con Karla se han convertido en un pequeño espacio de libertad donde puede ser ella misma. A diferencia de Karla, Diana suele ser más tranquila y aterrizada aunque no tiene problema en decir verdades incómodas cuando hace falta.

Desde hace tiempo tiene un crush con Máximo Pardo, el medio hermano de Karla. Cree que es muy buena disimulando, pero en realidad se pone nerviosa cada vez que él aparece cerca.`,
    extra: ""
  },
  {
    id: "maximo",
    nombre: "Máximo Pardo",
    nombre_completo: "Máximo Pardo",
    rol: "Candidato / influencer",
    subtitulo: "El candidato perfecto",
    img: "img/Maximo.png",
    color: "#60a5fa",
    facts: [
      "Edad: 22",
      "Ocupación: Candidato a la presidencia municipal de Nuevo Tigre",
      "Horóscopo: Leo",
      "Cumpleaños: 16 de agosto",
      "Color favorito: Rose Gold",
      "Comida favorita: carne asada",
      "Intereses: fútbol, redes sociales",
      "Relaciones: Heriberto Pardo (padre), Rufino Pardo (medio hermano), Karla Pardo (media hermana), Katarzyna Mucek (madrastra), Diana Trejo (mejor amiga de Karla)"
    ],
    bio: `Máximo siempre quiso ser futbolista. Desde niño soñaba con debutar profesionalmente, pero su padre, Heriberto Pardo, le repetía que “eso es para la prole” y lo empujó a seguir la tradición familiar: la política.

Hoy es el candidato joven del momento: carismático, atractivo y experto en convertir cualquier aparición pública en contenido viral. Está más preocupado por encontrar el ángulo perfecto para un live que por memorizar el reglamento municipal. Habla en eslóganes, posa en cada evento y parece vivir permanentemente en campaña.

Gracias a su encanto en pantalla, acumula más de un millón de seguidores en Meowstagram. Mientras los medios más serios lo critican por su fama de party boy superficial, el mundo del espectáculo lo adora. Sale en revistas, aparece en fiestas exclusivas y siempre encuentra la manera de escapar de los escándalos con una sonrisa perfectamente ensayada.

Pero detrás de toda esa imagen pública, Máximo vive atrapado entre expectativas que nunca eligió. Aunque jamás lo admitiría en voz alta, su padre lo intimida más de lo que inspira. Frente a Heriberto, Máximo vuelve a sentirse como el niño al que le dijeron que sus sueños no eran suficientes.`,
    extra: ""
  }
];

const EXTRAS = {
  arteConceptual: [
    {
      titulo: "Arte conceptual 1",
      img: "img/concept-01.jpg",
      descripcion: "Primer vistazo al mundo visual de Nuevo Tigre."
    },
    {
      titulo: "Arte conceptual 2",
      img: "img/concept-02.jpg",
      descripcion: "Exploración de personajes, props o escenarios."
    },
    {
      titulo: "Arte conceptual 3",
      img: "img/concept-03.jpg",
      descripcion: "Material extra del desarrollo visual."
    }
  ],
  autora: {
    nombre: "Paula Reynoso",
    usuario: "@polenhive",
    email: "polenhive@hotmail.com",
    linkedin: "www.linkedin.com/in/polenhive",
    texto: "Todos Los Gatos Son Pardos nace como un webcomic sobre drama, amistad, clase social, música, política pop y chicas intentando sobrevivir a Nuevo Tigre con estilo."
  },
  proyectosSimilares: [
    {
      titulo: "A la Madre",
      descripcion: "Proyecto animado previo de la autora.",
      img: "img/a-la-madre.jpg"
    },
    {
      titulo: "Próximo proyecto",
      descripcion: "Un nuevo universo en desarrollo.",
      img: "img/proyecto-futuro.jpg"
    }
  ]
};
```



