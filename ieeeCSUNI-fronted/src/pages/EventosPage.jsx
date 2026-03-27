import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { events } from '../data'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { EventCard } from '../components/ui/EventCard'

const FILTERS = ['Todos', 'Taller', 'Competencia', 'Charla', 'Hackathon', 'Conferencia']

export default function EventosPage() {
  useScrollReveal()
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered = activeFilter === 'Todos'
    ? events
    : events.filter(e => e.type === activeFilter)

  return (
    <main className="pt-16">
      {/* Hero */}
      <section
        className="relative flex flex-col justify-center px-10 md:px-20 overflow-hidden"
        style={{ minHeight: '50vh', paddingTop: 80, paddingBottom: 60 }}
      >
        <Orb className="top-[-200px] right-[-100px] w-[600px] h-[600px]"
             style={{ background: 'radial-gradient(circle, rgba(0,180,255,0.1), transparent 70%)' }} />
        <HeroTag>Calendario 2025</HeroTag>
        <h1
          className="font-black leading-[.92] tracking-[-0.03em] mb-7"
          style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
        >
          <span style={{ color: 'var(--fg)' }}>Eventos</span>
          <span className="block" style={{ color: 'var(--c1)' }}>& actividades.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed" style={{ color: 'var(--fg2)' }}>
          Talleres, hackathons, charlas y competencias. Hay algo para cada
          etapa de tu carrera en tecnología.
        </p>
      </section>

      {/* Events grid */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Todos los eventos</SectionLabel>
          <SectionTitle className="reveal mb-8">¿Qué viene?</SectionTitle>

          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap mb-10">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wide transition-all duration-200 cursor-pointer border"
                style={{
                  background: activeFilter === f ? 'rgba(0,150,220,0.2)' : 'rgba(0,100,150,0.08)',
                  borderColor: activeFilter === f ? 'var(--border2)' : 'var(--border)',
                  color: activeFilter === f ? 'var(--c1)' : 'var(--fg2)',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          ) : (
            <div className="text-center py-20" style={{ color: 'var(--fg2)' }}>
              <div className="text-5xl mb-4">📭</div>
              <p className="text-lg font-semibold">No hay eventos de este tipo por ahora.</p>
              <p className="text-sm mt-2">Revisa las otras categorías o vuelve pronto.</p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-14">
            <p className="text-sm mb-4" style={{ color: 'var(--fg2)' }}>
              ¿Quieres inscribirte a un evento? Crea tu cuenta primero.
            </p>
            <Link to="/login" className="btn-primary">Crear cuenta gratis →</Link>
          </div>
        </div>
      </section>

      {/* Propose event */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section
        className="py-24 px-10 md:px-20"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(0,80,120,0.15), transparent)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel><span style={{ margin: '0 auto' }}>¿Tienes una idea?</span></SectionLabel>
          <SectionTitle className="reveal mb-5">Propón un taller<br />o charla.</SectionTitle>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--fg2)' }}>
            Si eres miembro y tienes conocimientos que quieres compartir, ¡queremos escucharte!
            Puedes proponer talleres, charlas o workshops.
          </p>
          <Link to="/contacto" className="btn-outline">Enviar propuesta →</Link>
        </div>
      </section>
    </main>
  )
}
