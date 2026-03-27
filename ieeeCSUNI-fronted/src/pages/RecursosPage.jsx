import { useScrollReveal } from '../hooks/useScrollReveal'
import { resources } from '../data'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { ResourceCard } from '../components/ui/ResourceCard'

const categories = ['Todo', 'IEEE Xplore', 'Guía de Carrera', 'Competencias', 'Tutoriales', 'Templates', 'Comunidad']

export default function RecursosPage() {
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
        <HeroTag>Biblioteca digital</HeroTag>
        <h1
          className="font-black leading-[.92] tracking-[-0.03em] mb-7"
          style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
        >
          <span style={{ color: 'var(--fg)' }}>Recursos</span>
          <span className="block" style={{ color: 'var(--c1)' }}>& aprendizaje.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed" style={{ color: 'var(--fg2)' }}>
          Materiales curados, guías, tutoriales y acceso a la biblioteca de la IEEE
          para que nunca pares de crecer.
        </p>
      </section>

      {/* Resources grid */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Biblioteca</SectionLabel>
          <SectionTitle className="reveal mb-8">Todo lo que necesitas<br />en un lugar.</SectionTitle>

          {/* Category chips */}
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map(c => (
              <span key={c} className="chip cursor-pointer px-4 py-1.5 text-xs hover:border-[var(--border2)] transition-colors duration-200">{c}</span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r, i) => (
              <div key={r.title} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                <ResourceCard resource={r} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IEEE Xplore spotlight */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section
        className="py-24 px-10 md:px-20"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(0,80,120,0.15), transparent)' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>IEEE Xplore</SectionLabel>
            <SectionTitle className="reveal mb-5">Acceso gratuito<br />a la biblioteca.</SectionTitle>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--fg2)' }}>
              Como miembro del capítulo obtienes acceso a IEEE Xplore Digital Library,
              la mayor base de datos de literatura técnica y científica en electricidad,
              electrónica y computación.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                '5M+ documentos de investigación',
                'Journals, magazines y conference proceedings',
                'Standards y patentes técnicas',
                'Acceso desde cualquier dispositivo',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--fg2)' }}>
                  <span style={{ color: 'var(--c1)', fontSize: 16 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="https://ieeexplore.ieee.org" target="_blank" rel="noreferrer" className="btn-primary">
              Ir a IEEE Xplore →
            </a>
          </div>
          <div
            className="rounded-2xl p-8 flex items-center justify-center"
            style={{ background: 'var(--b2)', border: '1px solid var(--border2)', minHeight: 280 }}
          >
            <div className="text-center">
              <div className="text-7xl mb-4">📚</div>
              <div className="font-mono text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--c1)' }}>IEEE Xplore</div>
              <div className="text-2xl font-black mb-1">5,000,000+</div>
              <div className="text-sm" style={{ color: 'var(--fg2)' }}>documentos técnicos disponibles</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
