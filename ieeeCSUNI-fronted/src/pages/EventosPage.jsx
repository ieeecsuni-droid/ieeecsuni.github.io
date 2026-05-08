import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { events } from '../data'
import { EventCard } from '../components/ui/EventCard'
import { Terminal, ArrowUpRight } from 'lucide-react'
import tuVideo from '../../public/videoplayback.mp4'

const FILTERS = ['Todos', 'Taller', 'Competencia', 'Charla', 'Hackathon', 'Conferencia']

const impactStats = [
  { value: '6+', label: 'Eventos Técnicos' },
  { value: '200+', label: 'Asistentes Promedio' },
  { value: '4', label: 'Líneas de Enfoque' },
  { value: '100%', label: 'Entrada Libre' },
]

function FilterChip({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[10px] font-mono tracking-[0.15em] uppercase transition-all duration-300 border
        ${isActive
          ? 'bg-white text-[#050816] border-white'
          : 'bg-transparent text-white/40 border-white/[0.08] hover:text-white/80 hover:border-white/[0.2]'
        }`}
    >
      {label}
    </button>
  )
}

function EmptyState({ filter }) {
  return (
    <div className="py-24 w-full flex flex-col items-center justify-center border border-dashed border-white/[0.08] bg-[#ffffff01] text-center">
      <div className="w-12 h-12 flex items-center justify-center mb-4">
        <Terminal className="w-6 h-6 text-white/20" />
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
        QUERY: {filter}
      </span>
      <h3 className="font-light text-lg text-white/60 mb-2 tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        No se encontraron eventos.
      </h3>
      <p className="text-white/40 text-[13px] max-w-sm" style={{ fontFamily: '"Inter", sans-serif' }}>
        La categoría solicitada no tiene eventos programados actualmente. Explora otras opciones o revisa nuevamente más adelante.
      </p>
    </div>
  )
}

export default function EventosPage() {
  useScrollReveal()
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered = activeFilter === 'Todos'
    ? events
    : events.filter(e => e.type === activeFilter)

  // Separar el primer evento destacado del resto
  const featuredEvents = filtered.filter(e => e.featured)
  const mainFeatured = featuredEvents.length > 0 ? featuredEvents[0] : null
  const gridEvents = mainFeatured ? filtered.filter(e => e.id !== mainFeatured.id) : filtered

  return (
    <main className="bg-[#050816] text-white min-h-screen selection:bg-amber-500/30 selection:text-white overflow-hidden">
      
      {/* Background Architectural Blueprint System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
          }}
        />
        {/* Timeline Vector (Vertical line) */}
        <div className="absolute left-6 lg:left-20 top-0 bottom-0 w-[1px] bg-white/[0.04] hidden md:block" />
        <div className="absolute right-6 lg:right-20 top-0 bottom-0 w-[1px] bg-white/[0.04] hidden md:block" />
      </div>

      {/* ══ HERO & OPS CENTER ════════════════════════════════════ */}
      <section className="relative z-10 min-h-[85vh] flex items-center pt-32 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden border-b border-white/[0.04]">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            src={tuVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-25 filter grayscale contrast-[1.2]"
          />
          {/* Architectural Overlays */}
          <div className="absolute inset-0 bg-[#050816]/60 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/50 to-transparent pointer-events-none" />
          
          {/* Technical framing lines */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase pointer-events-none">
            REC • LIMA_PE
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          
          <div className="reveal max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                Eventos y Charlas
              </span>
            </div>

            <h1 
              className="text-[clamp(48px,7vw,88px)] font-light tracking-tight leading-[1.05] text-white mb-6"
              style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}
            >
              EVENTOS Y<br />
              <span className="text-white/30">TALLERES.</span>
            </h1>

            <p 
              className="max-w-md text-[15px] md:text-[16px] text-white/50 leading-relaxed mb-10"
              style={{ fontFamily: '"Inter", "Satoshi", sans-serif' }}
            >
              Registro cronológico de eventos académicos, talleres de ingeniería y conferencias de tecnología. Fomentamos el aprendizaje continuo a través de experiencias de alto impacto.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/[0.08] bg-[#ffffff05] backdrop-blur-sm">
              <span className="w-1 h-4 bg-emerald-500" />
              <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase">
                Actividades en curso
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ══ TELEMETRY STRIP ══════════════════════════════════════ */}
      <div className="relative z-10 border-y border-white/[0.04] bg-[#ffffff01]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04] md:divide-y-0 divide-y">
            {impactStats.map((stat, i) => (
              <div key={stat.label} className={`py-10 md:py-12 ${i % 2 !== 0 ? 'pl-8 md:pl-12' : 'pr-8 md:pr-12'}`}>
                <div 
                  className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90 mb-2"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ EVENT TIMELINE ═══════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Timeline Header & Filters */}
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 border-b border-white/[0.04] pb-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4 block flex items-center gap-4">
                <div className="w-6 h-px bg-white/20" />
                Calendario de Actividades
              </span>
              <h2 
                className="text-4xl md:text-5xl font-light tracking-tight text-white/90"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Nuestros<br />
                <span className="text-white/30">Eventos.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map(f => (
                <FilterChip
                  key={f}
                  label={f}
                  isActive={activeFilter === f}
                  onClick={() => setActiveFilter(f)}
                />
              ))}
            </div>
          </div>

          {/* Content Grid */}
          {filtered.length > 0 ? (
            <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Featured Event takes full row if it exists */}
              {mainFeatured && (
                <EventCard event={{ ...mainFeatured, featured: true }} />
              )}
              
              {/* Standard Events flow normally */}
              {gridEvents.map(ev => (
                <EventCard key={ev.id} event={{ ...ev, featured: false }} />
              ))}
            </div>
          ) : (
            <div className="reveal">
              <EmptyState filter={activeFilter} />
            </div>
          )}

        </div>
      </section>

      {/* ══ SUBMIT PROPOSAL ══════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20 bg-[#ffffff01] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto reveal flex flex-col md:flex-row items-center justify-between gap-16">
          
          <div className="max-w-lg">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4 block">
              Participación
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90 mb-6"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Proponer un<br />
              <span className="text-white/30">Nuevo Evento.</span>
            </h2>
            <p 
              className="text-[14px] text-white/50 leading-relaxed mb-8"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Si tienes expertise en arquitectura cloud, seguridad ofensiva, sistemas embebidos o algoritmia avanzada, te brindamos la infraestructura para liderar un workshop.
            </p>
            
            <Link
              to="/contacto"
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex items-center gap-3 px-6 py-3 border border-white/10 text-[11px] font-mono tracking-widest uppercase text-white/70 hover:bg-white hover:text-[#050816] hover:border-white transition-all duration-300"
            >
              Contactar Equipo
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-1 font-mono text-[10px] text-white/30 uppercase tracking-[0.1em] border-l border-white/[0.04] pl-8">
            <div className="py-3 border-b border-white/[0.04] flex justify-between">
              <span>Público</span>
              <span className="text-white/60">Comunidad UNI</span>
            </div>
            <div className="py-3 border-b border-white/[0.04] flex justify-between">
              <span>Logística</span>
              <span className="text-white/60">Facilitada</span>
            </div>
            <div className="py-3 border-b border-white/[0.04] flex justify-between">
              <span>Alcance</span>
              <span className="text-white/60">Red Global IEEE</span>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}