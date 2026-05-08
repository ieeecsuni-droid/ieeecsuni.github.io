import ieeeWeb from '../../public/projects/ieee-web/p1.png'
import codenix from '../../public/projects/codenix/p1.png'

// ── Events ────────────────────────────────────────────────
export const events = [
  {
    id: 1,
    type: 'Taller',
    title: 'Introducción a la programación con C',
    date: '15 Abr 2025',
    time: '18:00 – 21:00',
    location: 'Virtual-GoogleMeet',
    description: 'Aprende las bases de la programación estructurada con el lenguaje C.',
    tag: 'Programación',
    spots: 30,
    spotsLeft: 30,
    modality: 'Virtual',
    level: 'Básico',
    featured: true,
    link: 'google.com'
  },

]


// ── Team ──────────────────────────────────────────────────
export const team = [
  { initials: 'AE', name: 'Angel Escudero',       role: 'Presidente',         bio: 'Estudiante de ingeniería de telecomunicaciones.',              gradient: 'linear-gradient(135deg,#006699,#003050)', email: 'angel.escudero.s@uni.pe'},
  { initials: 'KP', name: 'Kenneth Pecho',  role: 'Vicepresidente',     bio: 'Estudiante de ingeniería electrónica.',     gradient: 'linear-gradient(135deg,#004d80,#002040)', email:'kenneth.pecho.r@uni.pe' }, 
  { initials: 'DF', name: 'Denilson Flores',  role: 'Tesorero',           bio: 'Estudiante de ingeniería de telecomunicaciones',                  gradient: 'linear-gradient(135deg,#660033,#330019)', email:'denilson.flores.s@uni.pe'},
  { initials: 'JA', name: 'Juan Aguilar',  role: 'Eventos y Logística',       bio: 'Estudiante de ingeniería de telecomunicaciones.',                       gradient: 'linear-gradient(135deg,#662200,#331100)', email:'juan.aguilar.f@uni.pe'},
  { initials: 'AG', name: 'Adrian Guevara', role: 'Webmaster y Secretario General',          bio: 'Estudiante de ingeniería de ciberseguridad.',              gradient: 'linear-gradient(135deg,#440066,#220033)', email:'cesar.guevara.s@uni.pe' },
  { initials: 'IB', name: 'Isaac Becerra',   role: 'Relaciones Públicas', bio: 'estudiante de Ingeniería de Ciberseguridad.',            gradient: 'linear-gradient(135deg,#006666,#003333)', email:'isaac.becerra.c@uni.pe' },
  { initials: 'JP', name: 'Jesús Pajar',    role: 'Marketing y Publicidad',     bio: 'Estudiante de ingeniería de ciberseguridad.',        gradient: 'linear-gradient(135deg,#336600,#193300)', email:'juan.pajar.l@uni.pe' },
  { initials: 'RV', name: 'Rafael Villavicencio',    role: 'Capacitación',     bio: 'Estudiante de ingeniería electrónica.',        gradient: 'linear-gradient(135deg,#336600,#193500)', email:'rafael.villavicencio.v@uni.pe' },
  { initials: 'JA', name: 'José Ataurima',    role: 'Proyectos de Investigación',     bio: 'Estudiante de ingeniería de sistemas.',        gradient: 'linear-gradient(135deg,#336600,#193200)', email:'jose.ataurima.q@uni.pe' },
]
// ── Resources ─────────────────────────────────────────────
export const resources = [
  {
    title: "IEEE Xplore Digital Library",
    category: "IEEE Xplore",
    description: "Acceso a millones de documentos técnicos de alta calidad en ingeniería y computación.", 
    url: "https://ieeexplore.ieee.org/", 
    date: "2026",
    featured: true,
    type: "paper",
    level: "intermediate",
    area: "research",
    cta: 'Leer paper',
  },
  {
    title: "Recopilación de libros gratuitos de programación",
    category: "Programación",
    excerpt: "Una recopilación de más de 100 libros de programación, desde bases hasta frameorks modernos y arquitectura de sistemas.",
    link: "https://librosgratis.dev/", 
    date: "Abril 2026",
    featured: true,
    type: "reference",
    level: "beginner",
    area: "software",
    cta: 'Leer libros',
  },
  {
    title: "USACO: Recursos de programación competitiva",
    category: "Programación Competitiva",
    excerpt: "Guía con problemas para iniciar en la programación competitiva con C++",
    link: "https://usaco.guide/",
    date: "Abril 2026",
    featured: true,
    type: "reference",
    level: "intermediate",
    area: "competitive",
    cta: 'Resolver problemas',
  },
  {
    title: "The Odin Project",
    category: "Desarrollo web",
    excerpt: "Curso completo de desarrollo web fullstack (HTML, CSS, JS, React, NodeJS, Ruby)",
    link: "https://www.theodinproject.com/",
    date: "Abril 2026",
    featured: false,
    type: "course",
    level: "beginner",
    area: "software",
  },
  {
    title: "Repositorio de teoría de programación competitiva",
    category: "Programación Competitiva",
    link: "https://cp-algorithms.com/",
    excerpt: "Programación Competitiva",
    date: "Abril 2026",
    featured: false,
    type: "paper",
    level: "intermediate",
    area: "competitive",
    cta: 'guía de teoría',
  }

]
// ── Achievements ──────────────────────────────────────────
export const achievements = [
  { number: '3°',   label: 'Lugar IEEE Xtreme Perú 2023' },
  { number: '500+', label: 'Recursos en biblioteca digital' },
  { number: '85%',  label: 'Miembros consiguen empleo tech' },
  { number: '20+',  label: 'Países con miembros conectados' },
]

// ── Timeline ──────────────────────────────────────────────
export const timeline = [
  { year: 'Febrero 2026', title: 'Reactivación del capítulo.',   desc: 'Un grupo de estudiantes de FIEE deciden reestructurar el capitulo IEEE CS UNI.' },
]

// ── Nav links ─────────────────────────────────────────────
export const navLinks = [
  { to: '/nosotros',  label: 'Nosotros' },
  { to: '/eventos',   label: 'Eventos' },
  { to: '/recursos',  label: 'Recursos' },
  { to: '/proyectos',  label: 'Proyectos' },
  { to: '/equipo',    label: 'Equipo' },
  { to: '/contacto',  label: 'Contacto' },
]

// ── Footer links ──────────────────────────────────────────
export const footerLinks = {
  'Capítulo': [
    { label: 'Nosotros',  to: '/nosotros' },
    { label: 'Equipo',    to: '/equipo' },
    { label: 'Historia',  to: '/nosotros' },
    { label: 'Únete',     to: '/contacto' },
  ],
  'Actividades': [
    { label: 'Eventos',     to: '/eventos' },
    { label: 'Hackathons',  to: '/eventos' },
    { label: 'Competencias', to: '/eventos' },
    { label: 'Talleres',    to: '/eventos' },
  ],
  'Recursos': [
    { label: 'Biblioteca',  to: '/recursos' },
    { label: 'Tutoriales',  to: '/recursos' },
    { label: 'Templates',   to: '/recursos' },
    { label: 'Comunidad',   to: '/recursos' },
  ],
}
// ── Chapter projects ────────────────────────────────────────── 
export const projects = [
  {
    id: 'ieee-web',
    title: 'IEEE CS UNI Web',
    category: 'Web Dev',
    description:
      'Plataforma web oficial del capítulo estudiantil IEEE Computer Society UNI. Sistema de roles (user / member / admin), gestión de eventos, proyectos y membresías.',
    tags: ['React', 'Vite', 'Tailwind', 'Laravel'],
    github: 'https://github.com/ieeecsuni-droid/ieeecsuni.github.io',
    link: 'https://ieeecsuni-droid.github.io/ieeecsuni.github.io/',
    image: ieeeWeb,
    members: ['Cesar Adrian Guevara Salcedo'],
  },

  {
    id: 'codenix',
    title: 'Codenix',
    category: 'Web Dev',
    description:
      'Plataforma de práctica, competición y comunidad para estudiantes de la UNI. Jueces automáticos, rankings en tiempo real y editorial colaborativo.',
    tags: ['React', 'Laravel', 'Docker'],
    github: 'https://github.com/ieeecs-uni/codenix',
    link: 'https://codenix.ieeecs-uni.com',
    image: codenix,
    members: ['Cesar Adrian Guevara Salcedo'],
  },
];
