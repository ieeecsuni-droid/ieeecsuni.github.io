import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { events } from '../data'
import { EventCard } from '../components/ui/EventCard'
import { EngineeringButton } from '../components/ui/EngineeringButton'
import { AtmosphereTag } from '../components/ui/AtmosphereTag'
import { Terminal, Crosshair, Activity, Layers } from 'lucide-react'
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
      className={`px-6 py-2.5 text-[10px] font-space-grotesk font-bold tracking-[0.2em] uppercase transition-all duration-500 border
        ${isActive
          ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
          : 'bg-white/[0.02] text-white/30 border-white/5 hover:text-white/80 hover:border-white/20'
        }`}
    >
      {label}
    </button>
  )
}

function EmptyState({ filter }) {
  return (
    <div className="py-32 w-full flex flex-col items-center justify-center border border-dashed border-white/10 bg-white/[0.01] text-center">
      <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-8 bg-white/[0.02]">
        <Terminal className="w-6 h-6 text-white/20" />
      </div>
      <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-blue-500/60 uppercase mb-4 font-bold">
        QUERY_STATUS: NO_RESULTS
      </span>
      <h3 className="font-space-grotesk font-bold text-3xl text-white mb-4 tracking-tight">
        Sin eventos registrados.
      </h3>
      <p className="text-white/40 text-[15px] max-w-sm font-inter">
        La categoría <span className="text-white/60">[{filter}]</span> no tiene eventos programados actualmente. Explora otras áreas del sistema.
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

  const featuredEvents = filtered.filter(e => e.featured)
  const mainFeatured = featuredEvents.length > 0 ? featuredEvents[0] : null
  const gridEvents = mainFeatured ? filtered.filter(e => e.id !== mainFeatured.id) : filtered

  return (
    <main className="bg-black text-white min-h-screen selection:bg-blue-600/30 overflow-hidden font-inter">
      
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center pt-32 pb-24 px-6 md:px-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <video
            src={tuVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
          
          <div className="absolute inset-20 border border-white/5 pointer-events-none hidden lg:block" />
          <div className="absolute bottom-12 left-12 font-ibm-plex text-[10px] tracking-[0.4em] text-white/20 uppercase pointer-events-none">
            REC • LIMA_SYS_N01
          </div>
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-3xl">
            <AtmosphereTag className="mb-12">Eventos y Capacitación Técnica</AtmosphereTag>
            <h1 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,10rem)] leading-[0.85] tracking-tight uppercase text-white mb-12">
              Eventos y<br /><span className="text-blue-600">Talleres.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-inter max-w-2xl">
              Registro cronológico de eventos académicos, workshops de ingeniería y conferencias de tecnología. Fomentamos el aprendizaje continuo a través de experiencias de alto impacto.
            </p>
          </motion.div>

          <div className="hidden lg:block">
            <div className="p-10 border border-white/10 bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-blue-500/30" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-blue-500/30" />
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold">System_Activity</span>
                <Activity size={16} className="text-blue-500/40" />
              </div>
              <div className="space-y-6">
                {impactStats.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-ibm-plex text-[9px] text-white/20 uppercase tracking-widest">{stat.label}</span>
                    <span className="font-space-grotesk text-2xl font-bold text-white/80">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE & FILTERS ═══════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-[1700px] mx-auto">
          
          <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24 border-b border-white/5 pb-16">
            <div>
              <AtmosphereTag className="mb-10">Calendario de Actividades</AtmosphereTag>
              <h2 className="font-space-grotesk font-bold text-5xl md:text-7xl text-white mb-4 tracking-tighter">
                Nuestros<br /><span className="text-blue-600">Eventos.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {FILTERS.map(f => (
                <FilterChip key={f} label={f} isActive={activeFilter === f} onClick={() => setActiveFilter(f)} />
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {mainFeatured && (
                <EventCard event={{ ...mainFeatured, featured: true }} />
              )}
              {gridEvents.map(ev => (
                <EventCard key={ev.id} event={{ ...ev, featured: false }} />
              ))}
            </div>
          ) : (
            <EmptyState filter={activeFilter} />
          )}

        </div>
      </section>

      {/* ══ SUBMIT PROPOSAL ══════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-[1700px] mx-auto reveal grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-24 items-center">
          
          <div className="max-w-3xl">
            <AtmosphereTag className="mb-10">Participación Técnica</AtmosphereTag>
            <h2 className="font-space-grotesk font-bold text-5xl md:text-7xl text-white mb-10 leading-[0.95]">
              Proponer un<br /><span className="text-blue-600">Nuevo Evento.</span>
            </h2>
            <p className="text-xl text-white/40 leading-relaxed font-inter mb-12">
              Si tienes expertise en arquitectura cloud, seguridad ofensiva, sistemas embebidos o algoritmia avanzada, te brindamos la infraestructura para liderar un workshop oficial de IEEE Computer Society UNI.
            </p>
            <EngineeringButton to="/contacto">Contactar al Equipo</EngineeringButton>
          </div>

          <div className="relative p-12 border border-white/10 bg-white/[0.01] backdrop-blur-2xl">
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-blue-500/20" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-blue-500/20" />
            <div className="flex items-center gap-4 mb-10">
              <Layers size={20} className="text-blue-500/40" />
              <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold">Requisitos_Mínimos</span>
            </div>
            <div className="space-y-8">
              {[
                { label: 'Público', val: 'Comunidad UNI' },
                { label: 'Logística', val: 'Facilitada por IEEE CS' },
                { label: 'Alcance', val: 'Red Global IEEE' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="font-ibm-plex text-[9px] text-white/20 uppercase tracking-widest">{item.label}</span>
                  <span className="font-mono text-[12px] text-white/70">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}