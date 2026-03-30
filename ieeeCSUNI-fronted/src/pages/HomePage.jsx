import { Link } from 'react-router-dom'
import { useRef } from 'react'
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
  const canvasRef = useRef(null)
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <SectionLabel>Actividades</SectionLabel>
          <SectionTitle>Próximos eventos</SectionTitle>
        </div>
        <Link to="/eventos" className="btn-outline hidden md:inline-flex flex-shrink-0">Ver todos →</Link>
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
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />

      <section className="relative overflow-hidden py-20 px-10 text-center" style={{ background: '#09111f' }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        <div className="absolute pointer-events-none rounded-full"
          style={{
        bottom: -40,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 420,
        height: 280,
        background: 'radial-gradient(ellipse, rgba(229,93,23,0.22) 0%, transparent 70%)',
          }}
        />

        <div className="absolute pointer-events-none rounded-full"
          style={{
        top: -60,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 340,
        height: 280,
        background: 'radial-gradient(ellipse, rgba(26,82,163,0.18) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="relative inline-block mb-8">
        <div className="absolute rounded-full"
          style={{
            inset: -24,
            background: 'radial-gradient(circle, rgba(229,93,23,0.28) 0%, transparent 68%)',
            animation: 'breathe 3.5s ease-in-out infinite',
          }}
        />
        <img src="./codenixLogo.png"
          alt="CODENIX logo featuring a stylized phoenix with blue and orange wings against a dark background, representing innovation and competition in programming"
          style={{
            width: 160,
            height: 160,
            objectFit: 'contain',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 0 24px rgba(229,93,23,0.5)) drop-shadow(0 0 8px rgba(26,82,163,0.4))',
          }}
        />
          </div>

          <div className="inline-flex items-center gap-2 mb-7"
        style={{
          border: '1px solid rgba(229,93,23,0.3)',
          borderRadius: 999,
          padding: '5px 16px',
          background: 'rgba(229,93,23,0.07)',
        }}
          >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
          style={{ background: '#e55d17' }}
        />
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#f07842',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
        }}>
          Próximamente
        </span>
          </div>

          <h2 className="reveal"
        style={{
          fontSize: 'clamp(48px, 9vw, 72px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: 20,
          background: 'linear-gradient(90deg, #2d7dd2 0%, #5a9fd4 30%, #c0c0c0 50%, #e55d17 75%, #f07842 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
          >
        CODENIX
          </h2>

          <p style={{
        fontSize: 15,
        color: 'rgba(255,255,255,0.4)',
        lineHeight: 1.75,
        maxWidth: 360,
        margin: '0 auto 32px',
        letterSpacing: '0.01em',
          }}>
        Practica. Compite. Evoluciona.<br />La plataforma que la UNI necesitaba.
          </p>

          <div className="flex items-center justify-center mb-9 px-4">
        <div className="flex-1 max-w-xs"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(26,82,163,0.6))' }}
        />
        <div className="rounded-full flex-shrink-0"
          style={{ width: 3, height: 3, background: '#1a52a3', margin: '0 8px' }}
        />
        <div className="rounded-full flex-shrink-0"
          style={{ width: 3, height: 3, background: '#e55d17', margin: '0 8px' }}
        />
        <div className="flex-1 max-w-xs"
          style={{ height: 1, background: 'linear-gradient(90deg, rgba(229,93,23,0.6), transparent)' }}
        />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10 px-2">
        {['práctica', 'competencias', 'comunidad'].map((tag, i) => (
          <span key={tag} style={{
            fontSize: 12,
            fontFamily: 'monospace',
            borderRadius: 6,
            padding: '6px 14px',
            border: i === 1 ? '1px solid rgba(229,93,23,0.3)' : '1px solid rgba(255,255,255,0.09)',
            color: i === 1 ? '#f08050' : 'rgba(255,255,255,0.38)',
            whiteSpace: 'nowrap',
          }}>
            {tag}
          </span>
        ))}
          </div>

          <p style={{
        fontSize: 12,
        color: 'rgba(255,255,255,0.2)',
        fontFamily: 'monospace',
        letterSpacing: '0.08em',
          }}>
        IEEE CS UNI · En desarrollo
          </p>
        </div>

        <style>{`
          @keyframes breathe {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.12); opacity: 1; }
          }
        `}</style>
      </section>
        </main>
      )
    }
