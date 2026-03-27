import { useScrollReveal } from '../hooks/useScrollReveal'
import { timeline } from '../data'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'

const pillars = [
  { icon: '🎯', title: 'Visión 2025',   desc: 'Ser el capítulo estudiantil de CS más activo de Latinoamérica.' },
  { icon: '🔗', title: 'Afiliación IEEE', desc: 'Miembros de pleno derecho de la mayor organización técnica del mundo.' },
  { icon: '📊', title: 'Impacto real',   desc: 'Proyectos que trascienden el aula y llegan a la industria.' },
  { icon: '🚀', title: 'Innovación',     desc: 'Exploración constante de las últimas tendencias en ciencias de la computación.' },
]

export default function NosotrosPage() {
  useScrollReveal()

  return (
    <main className="pt-16">
      {/* Hero */}
      <section
        className="relative flex flex-col justify-center px-10 md:px-20 overflow-hidden"
        style={{ minHeight: '60vh', paddingTop: 80, paddingBottom: 60 }}
      >
        <Orb className="top-[-200px] right-[-100px] w-[600px] h-[600px]"
             style={{ background: 'radial-gradient(circle, rgba(0,180,255,0.1), transparent 70%)' }} />
        <HeroTag>Nuestra historia · Desde 2016</HeroTag>
        <h1
          className="font-black leading-[.92] tracking-[-0.03em] mb-7"
          style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
        >
          <span style={{ color: 'var(--fg)' }}>Quiénes</span>
          <span className="block" style={{ color: 'var(--c1)' }}>somos.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed" style={{ color: 'var(--fg2)' }}>
          El IEEE CS Student Chapter de la UNI nació en 2016 con una misión clara: conectar
          a los mejores estudiantes de ingeniería con la tecnología de vanguardia.
        </p>
      </section>

      {/* Misión */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div>
            <SectionLabel>Misión</SectionLabel>
            <SectionTitle className="reveal mb-6">
              Ingeniería,<br />comunidad<br />e innovación.
            </SectionTitle>
            <p className="text-base leading-[1.8] mb-4" style={{ color: 'var(--fg2)' }}>
              Somos el capítulo estudiantil oficial de la IEEE Computer Society en la
              Universidad Nacional de Ingeniería. Agrupamos a estudiantes apasionados por
              la computación, sistemas y tecnología.
            </p>
            <p className="text-base leading-[1.8] mb-4" style={{ color: 'var(--fg2)' }}>
              Nuestro objetivo es formar profesionales íntegros capaces de liderar proyectos
              tecnológicos de impacto regional y global.
            </p>
            <p className="text-base leading-[1.8]" style={{ color: 'var(--fg2)' }}>
              Formamos parte de una red de más de 100,000 miembros en todo el mundo, con
              acceso a publicaciones técnicas, conferencias y recursos únicos del ecosistema IEEE.
            </p>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <div key={p.title} className={`card-base p-6 reveal reveal-delay-${i + 1}`}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h4 className="font-bold mb-1.5 text-[15px]">{p.title}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg2)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,80,120,0.15), transparent)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Valores</SectionLabel>
          <SectionTitle className="reveal mb-10">Lo que nos guía.</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Excelencia técnica', desc: 'Buscamos siempre el más alto estándar en todo lo que hacemos: código, diseño, organización.' },
              { icon: '🤲', title: 'Colaboración', desc: 'Creemos que los mejores proyectos nacen de equipos diversos que suman perspectivas.' },
              { icon: '🌱', title: 'Crecimiento continuo', desc: 'El aprendizaje no para. Fomentamos la curiosidad y la mejora constante en cada miembro.' },
            ].map((v, i) => (
              <div key={v.title} className={`card-base p-8 reveal reveal-delay-${i + 1}`}>
                <div className="text-4xl mb-4">{v.icon}</div>
                <h4 className="font-bold text-lg mb-3">{v.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg2)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Historia</SectionLabel>
          <SectionTitle className="reveal mb-12">Nuestra trayectoria.</SectionTitle>

          <div className="relative" style={{ paddingLeft: 32 }}>
            {/* vertical line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5 rounded"
              style={{ background: 'linear-gradient(180deg, var(--c1), var(--c3), transparent)' }}
            />

            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative pb-10 reveal reveal-delay-${(i % 4) + 1}`}
              >
                {/* dot */}
                <div
                  className="absolute flex items-center justify-center"
                  style={{ left: -37, top: 4, width: 20, height: 20, borderRadius: '50%', background: 'var(--b)', border: '2px solid var(--c1)' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--c1)' }} />
                </div>

                <div
                  className="font-mono text-[11px] tracking-[.1em] mb-1.5"
                  style={{ color: 'var(--c1)' }}
                >
                  {item.year}
                </div>
                <div className="text-base font-bold mb-2">{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--fg2)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
