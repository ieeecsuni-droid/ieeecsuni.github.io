import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { team } from '../data'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { MemberCard } from '../components/ui/MemberCard'

export default function EquipoPage() {
  useScrollReveal()

  return (
    <main className="pt-16">
      {/* Hero */}
      <section
        className="relative flex flex-col justify-center px-10 md:px-20 overflow-hidden"
        style={{ minHeight: '50vh', paddingTop: 80, paddingBottom: 60 }}
      >
        <Orb className="top-[-200px] right-[-100px] w-[600px] h-[600px]"
             style={{ background: 'radial-gradient(circle, rgba(0,180,255,0.1), transparent 70%)' }} />
        <HeroTag>Directiva 2025</HeroTag>
        <h1
          className="font-black leading-[.92] tracking-[-0.03em] mb-7"
          style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
        >
          <span style={{ color: 'var(--fg)' }}>El equipo</span>
          <span className="block" style={{ color: 'var(--c1)' }}>detrás del</span>
          <span className="block" style={{ color: 'var(--fg3)' }}>capítulo.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed" style={{ color: 'var(--fg2)' }}>
          Estudiantes apasionados que donan su tiempo y talento para hacer crecer esta comunidad.
        </p>
      </section>

      {/* Team grid */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Directiva</SectionLabel>
          <SectionTitle className="reveal mb-10">Conoce a nuestro equipo.</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((m, i) => (
              <div key={m.name} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                <MemberCard member={m} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join directiva CTA */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section
        className="py-24 px-10 md:px-20 text-center"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(0,80,120,0.15), transparent)' }}
      >
        <div className="max-w-2xl mx-auto">
          <SectionLabel><span style={{ margin: '0 auto' }}>¿Te animas?</span></SectionLabel>
          <SectionTitle className="reveal mb-5">¿Quieres unirte<br />a la directiva?</SectionTitle>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--fg2)' }}>
            Las elecciones para la directiva 2026 se realizarán en Diciembre.
            Postula y lidera el capítulo junto a los mejores.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contacto" className="btn-primary">Saber más →</Link>
            <Link to="/nosotros" className="btn-outline">Ver requisitos</Link>
          </div>
        </div>
      </section>

      {/* Advisors */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Asesores</SectionLabel>
          <SectionTitle className="reveal mb-10">Guiados por expertos.</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { initials: 'Dr. RC', name: 'Dr. Raúl Castro',   role: 'Asesor Académico',  bio: 'Docente de la Facultad de Ingeniería de Sistemas, Ph.D. en Computer Science por la PUCP. Mentor del capítulo desde 2017.', gradient: 'linear-gradient(135deg,#004466,#001f33)' },
              { initials: 'Mg. PL', name: 'Mg. Patricia León', role: 'Asesora Institucional', bio: 'Investigadora en Sistemas Inteligentes y coordinadora de convenios institucionales con la IEEE a nivel nacional.', gradient: 'linear-gradient(135deg,#004433,#001f19)' },
            ].map(a => (
              <div key={a.name} className="card-base p-6 flex items-center gap-5 reveal">
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: a.gradient, minWidth: 64 }}
                >
                  {a.initials}
                </div>
                <div>
                  <div className="font-bold text-base mb-0.5">{a.name}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--c1)' }}>{a.role}</div>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg2)' }}>{a.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
