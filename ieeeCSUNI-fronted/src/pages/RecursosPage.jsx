import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { resources } from '../data'
import { ResourceCard } from '../components/ui/ResourceCard'
import { AtmosphereTag } from '../components/ui/AtmosphereTag'
import { EngineeringButton } from '../components/ui/EngineeringButton'
import { Search, X, Terminal, Database, Crosshair, Cpu } from 'lucide-react'

const CATEGORIES = ['Todo', 'IEEE Xplore', 'Guía de Carrera', 'Competencias', 'Tutoriales']

function FilterChip({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 border text-[10px] font-space-grotesk font-bold tracking-[0.2em] uppercase transition-all duration-500
        ${isActive
          ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
          : 'bg-white/[0.02] text-white/30 border-white/5 hover:text-white/80 hover:border-white/20'
        }`}
    >
      {label === 'Todo' ? 'TODOS' : label}
    </button>
  )
}

function EmptyState({ query, onClear }) {
  return (
    <div className="col-span-full py-32 flex flex-col items-center text-center border border-dashed border-white/10 bg-white/[0.01]">
      <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-8 bg-white/[0.02]">
        <Terminal className="w-6 h-6 text-white/20" />
      </div>
      <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-blue-500/60 uppercase mb-4 font-bold">
        QUERY_STATUS: NO_RESULTS_FOUND
      </span>
      <h3 className="font-space-grotesk font-bold text-3xl text-white mb-4 tracking-tight">
        No se encontraron recursos.
      </h3>
      <p className="text-white/40 text-[15px] max-w-sm mb-10 font-inter">
        El parámetro <span className="text-white/60">[{query ? `"${query}"` : 'ACTIVE_FILTER'}]</span> no devolvió resultados en el repositorio actual.
      </p>
      {query && (
        <button
          onClick={onClear}
          className="group inline-flex items-center gap-3 px-8 py-3 border border-white/10 text-[10px] font-space-grotesk font-bold uppercase tracking-[0.2em] text-white/40 hover:bg-white hover:text-black transition-all duration-500"
        >
          <X size={14} /> REINICIAR BÚSQUEDA
        </button>
      )}
    </div>
  )
}

function SectionMeta({ tag, title, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-blue-500/30" />
        <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-blue-500/60 uppercase font-bold">{tag}</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold tracking-tighter leading-[0.95] text-white">
        {title}
      </h2>
    </div>
  )
}

export default function RecursosPage() {
  useScrollReveal()
  const [activeCat, setActiveCat]     = useState('Todo')
  const [searchQuery, setSearchQuery] = useState('')

  const featured = useMemo(() => {
    const f = resources.filter(r => r.featured)
    return f.length >= 2 ? f.slice(0, 3) : resources.slice(0, 3)
  }, [])

  const filtered = useMemo(() => {
    return resources.filter(r => {
      const matchesCat    = activeCat === 'Todo' || r.category === activeCat
      const matchesSearch = !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [activeCat, searchQuery])

  const isSearching = searchQuery.length > 0 || activeCat !== 'Todo'

  return (
    <main className="bg-black text-white min-h-screen selection:bg-blue-600/30 overflow-hidden font-inter">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative pt-48 pb-32 px-6 md:px-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#02040a]" />
          <div className="absolute inset-0 bg-grid-animated opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)]" />
          
          {/* Animated scanning lines */}
          <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-[scanlineDown_10s_linear_infinite]" />
          <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent animate-[scanlineUp_12s_linear_infinite]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <AtmosphereTag className="mb-12 justify-center">Biblioteca de Ingeniería UNI</AtmosphereTag>
            <h1 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,10rem)] leading-[0.85] tracking-tight uppercase text-white mb-12">
              Base de<br /><span className="text-blue-600">Conocimiento.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-inter max-w-3xl mb-16">
              Archivo estructurado de documentación técnica, papers de investigación, herramientas de ciberseguridad y fundamentos de ingeniería avanzada.
            </p>
          </motion.div>

          <div className="reveal w-full max-w-3xl">
            <div className="relative group">
              <div className="absolute -inset-1 bg-blue-500/20 opacity-0 group-focus-within:opacity-100 blur-2xl transition-all duration-700" />
              <div className="relative bg-black border border-white/10 overflow-hidden">
                <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <Database size={14} className="text-blue-500/60" />
                  <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold">Query_Console_v1.0</span>
                </div>
                <div className="flex items-center px-6 py-6 gap-4">
                  <span className="font-mono text-blue-500 font-bold text-lg">{'>'}</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Escribe para buscar en el repositorio..."
                    className="bg-transparent outline-none w-full text-lg font-mono text-white placeholder:text-white/10"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-white/20 hover:text-white transition-colors">
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURED ══════════════════════════════════════════ */}
      {!isSearching && featured.length > 0 && (
        <section className="py-48 px-6 md:px-24 border-b border-white/5">
          <div className="max-w-[1700px] mx-auto">
            <div className="reveal flex items-end justify-between gap-16 mb-24">
              <SectionMeta tag="Curated Collection" title={<>Recursos<br /><span className="text-blue-600">Destacados.</span></>} />
            </div>

            <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {featured.map((r, i) => (
                <div key={r.id} className={i === 0 ? "lg:col-span-2" : "col-span-1"}>
                  <ResourceCard resource={r} featured={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ DATABASE ══════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-[1700px] mx-auto">
          
          <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24 border-b border-white/5 pb-16">
            <div>
              <AtmosphereTag className="mb-10">Repositorio Global</AtmosphereTag>
              <h2 className="font-space-grotesk font-bold text-5xl md:text-7xl text-white mb-4 tracking-tighter">
                {isSearching ? `${filtered.length} Coincidencias` : 'Todos los'} <br /><span className="text-blue-600">Recursos.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map(c => (
                <FilterChip key={c} label={c} isActive={activeCat === c} onClick={() => setActiveCat(c)} />
              ))}
            </div>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {filtered.length > 0 ? (
              filtered.map(r => <ResourceCard key={r.id} resource={r} />)
            ) : (
              <EmptyState query={searchQuery} onClear={() => { setSearchQuery(''); setActiveCat('Todo') }} />
            )}
          </div>
        </div>
      </section>

      {/* ══ MENTORING ═════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-[1700px] mx-auto reveal grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-24 items-center">
          
          <div className="max-w-3xl">
            <AtmosphereTag className="mb-10">Orientación Técnica</AtmosphereTag>
            <h2 className="font-space-grotesk font-bold text-5xl md:text-7xl text-white mb-10 leading-[0.95]">
              ¿Buscas un<br /><span className="text-blue-600">Recurso Específico?</span>
            </h2>
            <p className="text-xl text-white/40 leading-relaxed font-inter mb-12">
              Si no encuentras el paper, herramienta o documentación necesaria, nuestro equipo de ingeniería puede orientarte hacia el material exacto para tu investigación.
            </p>
            <EngineeringButton to="/equipo">Contactar Ingeniería</EngineeringButton>
          </div>

          <div className="relative p-12 border border-white/10 bg-black backdrop-blur-2xl">
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-blue-500/30" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-blue-500/30" />
            <div className="flex items-center gap-4 mb-10">
              <Crosshair size={20} className="text-blue-500/40" />
              <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold">Asesoría_Especializada</span>
            </div>
            <div className="space-y-8">
              {[
                { label: 'Mentoría', val: 'Asesoría Técnica Directa' },
                { label: 'Selección', val: 'Curación por Especialidad' },
                { label: 'Red Global', val: 'Acceso a Papers IEEE' },
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

      <style>{`
        @keyframes scanlineDown {
          0% { transform: translateY(-100%); opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes scanlineUp {
          0% { transform: translateY(100vh); opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
      `}</style>
    </main>
  )
}