import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { events, achievements } from '../data'
import { HeroTag, StatBar, ScrollHint, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { EventCard } from '../components/ui/EventCard'
import { IEEECSLogo } from '../assets/IEEECSLogo'

const heroStats = [
  { number: '150', suffix: '+', label: 'Miembros activos' },
  { number: '40',  suffix: '+', label: 'Eventos realizados' },
  { number: '8',   suffix: '°', label: 'Años de historia' },
  { number: '12',  suffix: 'k', label: 'Comunidad IEEE' },
]

const pillars = [
  { icon: '🖥️', title: 'Desarrollo técnico',  desc: 'Talleres hands-on de programación, sistemas embebidos, IA y más. Aprendes haciendo.' },
  { icon: '🌐', title: 'Red global IEEE',       desc: 'Acceso a publicaciones, recursos exclusivos y conexiones con profesionales del mundo.' },
  { icon: '🏆', title: 'Competencias',          desc: 'IEEE Xtreme, hackathons y concursos internacionales. Representa a la UNI.' },
  { icon: '🤝', title: 'Comunidad',             desc: 'Networking con estudiantes y profesionales. Mentorías y oportunidades laborales.' },
  { icon: '🔬', title: 'Investigación',         desc: 'Proyectos de investigación aplicada en colaboración con docentes y empresas.' },
  { icon: '📡', title: 'Conferencias',          desc: 'Charlas con expertos de la industria tecnológica local e internacional.' },
]

export default function HomePage() {
  useScrollReveal()

  return (
    <main className="pt-16">
      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-center px-10 md:px-20 overflow-hidden"
        style={{ minHeight: 'calc(100vh - 64px)', paddingTop: 80, paddingBottom: 60 }}
      >
        <Orb className="top-[-200px] right-[-100px] w-[700px] h-[700px]"
             style={{ background: 'radial-gradient(circle, rgba(0,180,255,0.12), transparent 70%)' }} />
        <Orb className="bottom-[-100px] left-[-150px] w-[500px] h-[500px]"
             style={{ background: 'radial-gradient(circle, rgba(0,100,180,0.1), transparent 70%)' }} />

        <HeroTag>Universidad Nacional de Ingeniería · Lima, Perú</HeroTag>

        <h1
          className="font-black leading-[.92] tracking-[-0.03em] mb-7"
          style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}
        >
          <span style={{ color: 'var(--fg)' }}>Computer</span>
          <br />
          <span style={{ color: 'var(--c1)', display: 'block' }}>Society</span>
          <span style={{ color: 'var(--fg3)', display: 'block' }}>UNI</span>
        </h1>

        <p className="max-w-lg text-lg leading-relaxed mb-11" style={{ color: 'var(--fg2)' }}>
          Somos el capítulo estudiantil de la IEEE Computer Society en la UNI.
          Construimos el futuro de la tecnología en Perú, juntos.
        </p>

        <div className="flex gap-4 flex-wrap mb-16">
          <Link to="/login" className="btn-primary">Únete al capítulo →</Link>
          <Link to="/eventos" className="btn-outline">Ver eventos</Link>
        </div>

        <StatBar stats={heroStats} />
        <ScrollHint />
      </section>

      {/* ── WHAT WE DO ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,80,120,0.15), transparent)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Qué hacemos</SectionLabel>
          <SectionTitle className="reveal mb-10">Formamos líderes<br />en tecnología.</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`card-base p-6 reveal reveal-delay-${(i % 4) + 1}`}
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h4 className="font-bold mb-2 text-[15px]">{p.title}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg2)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Logros</SectionLabel>
          <SectionTitle className="reveal mb-10">Nuestro impacto<br />en números.</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <div key={a.label} className={`card-base p-6 text-center reveal reveal-delay-${i + 1}`}>
                <div className="text-4xl mb-3">{a.emoji}</div>
                <div className="text-4xl font-black tracking-tight" style={{ color: 'var(--fg)' }}>
                  {a.number}
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--fg2)' }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS PREVIEW ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,80,120,0.15), transparent)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <SectionLabel>Actividades</SectionLabel>
              <SectionTitle>Próximos eventos</SectionTitle>
            </div>
            <Link to="/eventos" className="btn-outline hidden md:inline-flex">Ver todos →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.slice(0, 3).map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/eventos" className="btn-outline">Ver todos los eventos →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20 text-center relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,150,220,0.12), transparent 70%)', filter: 'blur(20px)' }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="flex justify-center mb-6">
            <IEEECSLogo size={72} />
          </div>
          <SectionLabel><span style={{ margin: '0 auto' }}>¿Listo para empezar?</span></SectionLabel>
          <SectionTitle className="reveal mb-4">Sé parte del<br />capítulo hoy.</SectionTitle>
          <p className="text-base leading-relaxed mb-9" style={{ color: 'var(--fg2)' }}>
            Abierto a todos los estudiantes de la UNI. Sin requisitos previos,
            solo ganas de aprender y crecer.
          </p>
          <Link to="/login" className="btn-primary mx-auto">Crear mi cuenta →</Link>
        </div>
      </section>
    </main>
  )
}
