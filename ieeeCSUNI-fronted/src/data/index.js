// ── Events ────────────────────────────────────────────────
export const events = [
  {
    id: 1,
    type: 'Taller',
    title: 'Introducción a React y TypeScript',
    date: '15 Abr 2025',
    time: '18:00 – 21:00',
    location: 'UNI — Sala de Cómputo C',
    description: 'Aprende React con TypeScript desde cero. Proyectos prácticos y mentoría de miembros senior del capítulo.',
    tag: 'Desarrollo Web',
    emoji: '⚛️',
    gradient: 'linear-gradient(135deg, #004f77, #00263d)',
    spots: 30,
    spotsLeft: 12,
  },
  {
    id: 2,
    type: 'Competencia',
    title: 'IEEE Xtreme 19.0 Programming',
    date: 'Oct 2025',
    time: '24 horas continuas',
    location: 'Online',
    description: 'La mayor competencia de programación de 24h. Forma tu equipo y compite contra miles de estudiantes del mundo.',
    tag: 'Competitive Programming',
    emoji: '🏆',
    gradient: 'linear-gradient(135deg, #003050, #001830)',
    spots: 50,
    spotsLeft: 28,
  },
  {
    id: 3,
    type: 'Charla',
    title: 'Cybersecurity en la industria peruana',
    date: 'Por confirmar',
    time: 'Por confirmar',
    location: 'UNI — Auditorio Central',
    description: 'Especialistas del sector comparten su experiencia en seguridad informática y cómo evoluciona el mercado local.',
    tag: 'Ciberseguridad',
    emoji: '🔐',
    gradient: 'linear-gradient(135deg, #002840, #000f1a)',
    spots: 80,
    spotsLeft: 45,
  },
  {
    id: 4,
    type: 'Hackathon',
    title: 'HackUNI 2025',
    date: 'Jun 2025',
    time: '48 horas',
    location: 'UNI — Pabellón H',
    description: '48 horas para construir soluciones tecnológicas a problemas reales del Perú. Premios en efectivo y mentores de empresas.',
    tag: 'Hackathon',
    emoji: '💻',
    gradient: 'linear-gradient(135deg, #1a0050, #0a0030)',
    spots: 60,
    spotsLeft: 8,
  },
  {
    id: 5,
    type: 'Taller',
    title: 'Machine Learning con Python',
    date: 'Mayo 2025',
    time: '17:00 – 20:00',
    location: 'UNI — Lab. Inteligencia Artificial',
    description: 'Desde regresión lineal hasta redes neuronales. Implementación práctica con scikit-learn y PyTorch.',
    tag: 'IA & ML',
    emoji: '🤖',
    gradient: 'linear-gradient(135deg, #003d00, #001500)',
    spots: 25,
    spotsLeft: 3,
  },
  {
    id: 6,
    type: 'Conferencia',
    title: 'Summit Tech UNI 2025',
    date: 'Ago 2025',
    time: '09:00 – 18:00',
    location: 'UNI — Auditorio Principal',
    description: 'El evento anual más grande del capítulo. Ponentes internacionales, workshops simultáneos y networking.',
    tag: 'Conferencia',
    emoji: '🌟',
    gradient: 'linear-gradient(135deg, #4a0000, #1a0000)',
    spots: 200,
    spotsLeft: 120,
  },
]

// ── Team ──────────────────────────────────────────────────
export const team = [
  { initials: 'AE', name: 'Angel Escudero',       role: 'Presidente',         bio: 'Estudiante de ingeniería de telecomunicaciones.',              gradient: 'linear-gradient(135deg,#006699,#003050)' },
  { initials: 'KP', name: 'Kenneth Pecho',  role: 'Vicepresidente',     bio: 'Estudiante de ingeniería electrónica.',     gradient: 'linear-gradient(135deg,#004d80,#002040)' },
  { initials: 'DF', name: 'Denilson Flores',  role: 'Tesorero',           bio: 'Estudiante de ingeniería de telecomunicaciones',                  gradient: 'linear-gradient(135deg,#660033,#330019)' },
  { initials: 'JA', name: 'Juan Aguilar',  role: 'Eventos y Logística',       bio: 'Estudiante de ingeniería de telecomunicaciones.',                       gradient: 'linear-gradient(135deg,#662200,#331100)' },
  { initials: 'AG', name: 'Adrian Guevara', role: 'Webmaster y Secretario General',          bio: 'Estudiante de ingeniería de ciberseguridad.',              gradient: 'linear-gradient(135deg,#440066,#220033)' },
  { initials: 'IB', name: 'Isaac Becerra',   role: 'Relaciones Públicas', bio: 'estudiante de Ingeniería de Ciberseguridad.',            gradient: 'linear-gradient(135deg,#006666,#003333)' },
  { initials: 'JP', name: 'Jesús Pajar',    role: 'Marketing y Publicidad',     bio: 'Estudiante de ingeniería de ciberseguridad.',        gradient: 'linear-gradient(135deg,#336600,#193300)' },
  { initials: 'RV', name: 'Rafael Villavicencio',    role: 'Capacitación',     bio: 'Estudiante de ingeniería electrónica.',        gradient: 'linear-gradient(135deg,#336600,#193500)' },
  { initials: 'JA', name: 'José Ataurima',    role: 'Proyectos de Investigación',     bio: 'Estudiante de ingeniería de sistemas.',        gradient: 'linear-gradient(135deg,#336600,#193200)' },
]
// ── Resources ─────────────────────────────────────────────
export const resources = [
  { category: 'IEEE Xplore',    title: 'Digital Library — 5M+ documentos técnicos',   excerpt: 'Accede a papers, revistas y proceedings de los mejores investigadores del mundo.', emoji: '📚', gradient: 'linear-gradient(135deg,#001a3d,#002d66)', date: 'Disponible siempre' },
  { category: 'Guía de Carrera',title: 'Roadmap: De estudiante a ingeniero senior',    excerpt: 'Guía curada por miembros del capítulo sobre cómo construir tu carrera en tech.',   emoji: '🗺️', gradient: 'linear-gradient(135deg,#002200,#003300)', date: 'Actualizado 2025' },
  { category: 'Competencias',   title: 'Preparación para IEEE Xtreme 2025',             excerpt: 'Repositorio de problemas resueltos, estrategias y recursos de competitive programming.', emoji: '💡', gradient: 'linear-gradient(135deg,#1a0030,#2d0050)', date: 'Actualizado mensual' },
  { category: 'Tutoriales',     title: 'Serie: Machine Learning desde cero',            excerpt: '9 módulos en video sobre ML con Python. Desde álgebra lineal hasta deep learning.',  emoji: '🎬', gradient: 'linear-gradient(135deg,#1a0a00,#2d1500)', date: 'Mar 2025' },
  { category: 'Templates',      title: 'CV y portafolio para ingenieros de software',   excerpt: 'Plantillas revisadas por reclutadores de Google, Meta y startups peruanas.',         emoji: '📄', gradient: 'linear-gradient(135deg,#001a1a,#002d2d)', date: 'Ene 2025' },
  { category: 'Comunidad',      title: 'Slack y Discord del capítulo',                  excerpt: 'Canales de discusión, trabajo, noticias tech y networking estudiantil activo.',       emoji: '💬', gradient: 'linear-gradient(135deg,#1a001a,#2d002d)', date: 'Activo ahora' },
]

// ── Achievements ──────────────────────────────────────────
export const achievements = [
  { emoji: '🥇', number: '3°',   label: 'Lugar IEEE Xtreme Perú 2023' },
  { emoji: '📚', number: '500+', label: 'Recursos en biblioteca digital' },
  { emoji: '🎓', number: '85%',  label: 'Miembros consiguen empleo tech' },
  { emoji: '🌍', number: '20+',  label: 'Países con miembros conectados' },
]

// ── Timeline ──────────────────────────────────────────────
export const timeline = [
  { year: '2016', title: 'Fundación del capítulo',   desc: 'Un grupo de estudiantes de Ing. Sistemas constituye oficialmente el capítulo ante la IEEE.' },
  { year: '2018', title: 'Primera IEEE Xtreme',       desc: 'Participación en la competencia internacional de programación, logrando el top 500 mundial.' },
  { year: '2020', title: 'Adaptación digital',        desc: 'Ante la pandemia, todos los eventos migran al formato online, alcanzando más de 400 asistentes.' },
  { year: '2022', title: '3er lugar nacional',        desc: 'Nuestro equipo obtiene el 3er lugar en IEEE Xtreme Perú, el mejor resultado de la historia del capítulo.' },
  { year: '2024', title: 'Expansión y nuevas alianzas', desc: 'Firmamos convenios con empresas tech y expandimos el programa de mentorías a 40+ estudiantes.' },
]

// ── Nav links ─────────────────────────────────────────────
export const navLinks = [
  { to: '/nosotros',  label: 'Nosotros' },
  { to: '/eventos',   label: 'Eventos' },
  { to: '/recursos',  label: 'Recursos' },
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
