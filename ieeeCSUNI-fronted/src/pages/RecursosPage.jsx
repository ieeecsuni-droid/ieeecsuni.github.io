import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { resources } from '../data'
import { ResourceCard } from '../components/ui/ResourceCard'
import { Search, X, ArrowUpRight, Terminal, Database } from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────

const CATEGORIES = ['Todo', 'IEEE Xplore', 'Guía de Carrera', 'Competencias', 'Tutoriales']

// ─── UI Components ───────────────────────────────────────────

function FilterChip({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border text-[10px] font-mono tracking-[0.15em] uppercase transition-all duration-300
        ${isActive
          ? 'bg-white text-[#050816] border-white'
          : 'bg-transparent text-white/40 border-white/[0.08] hover:text-white/80 hover:border-white/[0.2]'
        }`}
    >
      {label === 'Todo' ? 'TODOS' : label}
    </button>
  )
}

function EmptyState({ query, onClear }) {
  return (
    <div className="col-span-full py-24 flex flex-col items-center text-center border border-dashed border-white/[0.08] bg-[#ffffff01]">
      <div className="w-12 h-12 flex items-center justify-center mb-4">
        <Terminal className="w-6 h-6 text-white/20" />
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
        BÚSQUEDA: {query ? `"${query}"` : 'SIN_FILTROS'}
      </span>
      <h3 className="font-light text-lg text-white/60 mb-2 tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        No se encontraron recursos.
      </h3>
      <p className="text-white/40 text-[13px] max-w-sm mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
        Ajusta tus parámetros de búsqueda o cambia la categoría operativa para recuperar información.
      </p>
      {query && (
        <button
          onClick={onClear}
          className="group inline-flex items-center gap-2 px-6 py-2.5 border border-white/[0.08] text-[10px] font-mono uppercase tracking-[0.15em] text-white/50 hover:bg-white hover:text-[#050816] transition-all"
        >
          <X className="w-3.5 h-3.5 group-hover:text-[#050816]" /> Limpiar Búsqueda
        </button>
      )}
    </div>
  )
}

function SectionMeta({ tag, title, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-white/20" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">{tag}</span>
      </div>
      <h2 
        className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05] text-white/90"
        style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}
      >
        {title}
      </h2>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────

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
    <main className="bg-[#050816] min-h-screen text-white selection:bg-amber-500/30 selection:text-white overflow-hidden">

      {/* ══ BACKGROUND SYSTEM ══════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle engineering grid */}
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
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(76,29,149,0.08),_transparent_60%)] pointer-events-none blur-3xl" />
      </div>

      {/* ══ HERO & COMMAND PALETTE ═════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-20 border-b border-white/[0.04]">
        
        {/* Background Animation (Scanlines) */}
        <style>{`
          @keyframes scanlineDown {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          @keyframes scanlineUp {
            0% { transform: translateY(100vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100%); opacity: 0; }
          }
        `}</style>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
           <div className="absolute top-0 left-[20%] w-[1px] h-[50vh] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" style={{ animation: 'scanlineDown 8s linear infinite' }} />
           <div className="absolute top-0 left-[50%] w-[1px] h-[50vh] bg-gradient-to-b from-transparent via-white/20 to-transparent" style={{ animation: 'scanlineUp 12s linear infinite' }} />
           <div className="absolute top-0 left-[80%] w-[1px] h-[50vh] bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" style={{ animation: 'scanlineDown 10s linear infinite 2s' }} />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          
          <div className="reveal flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                Biblioteca de Ingeniería
              </span>
            </div>

            <h1 
              className="mt-2 mb-6 text-[clamp(48px,7vw,88px)] font-light tracking-tight leading-[1] text-white"
              style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}
            >
              BASE DE<br />
              <span className="text-white/30">CONOCIMIENTO.</span>
            </h1>

            <p 
              className="max-w-xl text-[15px] md:text-[16px] text-white/50 leading-relaxed mb-8"
              style={{ fontFamily: '"Inter", "Satoshi", sans-serif' }}
            >
              Archivo estructurado de documentación técnica, papers de investigación, 
              herramientas de ciberseguridad y fundamentos de ingeniería.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
                SISTEMA OPERATIVO | {resources.length} RECURSOS DISPONIBLES
              </span>
            </div>
          </div>

          <div className="reveal reveal-delay-2 w-full max-w-2xl">
            {/* Command Palette styled Search */}
            <div className="w-full relative group text-left">
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-amber-500/20 to-violet-500/20 opacity-0 group-focus-within:opacity-100 blur-md transition-opacity duration-700 pointer-events-none" />
              <div className="relative bg-[#030408] border border-white/[0.1] shadow-2xl flex flex-col">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                  <Database className="w-4 h-4 text-white/40" />
                  <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                    BUSCAR RECURSOS...
                  </span>
                </div>
                <div className="flex items-center px-4 py-5 gap-3">
                  <span className="font-mono text-amber-500 font-bold">{'>'}</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Escribe para buscar..."
                    className="bg-transparent outline-none w-full text-[13px] font-mono text-white placeholder:text-white/20"
                    spellCheck="false"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-white/40 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ FEATURED RESOURCES ═════════════════════════════════ */}
      {!isSearching && featured.length > 0 && (
        <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20 bg-[#ffffff01] border-b border-white/[0.04]">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex items-end justify-between gap-6 mb-16">
              <SectionMeta tag="Colección Curada" title={<>Recursos<br /><span className="text-white/30">Destacados.</span></>} />
            </div>

            <div className="reveal grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-6 lg:gap-8">
              {featured.map((r, i) => (
                <div key={r.id} className={i === 0 ? "lg:col-span-2" : "col-span-1"}>
                  <ResourceCard resource={r} featured={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ DATABASE EXPLORER ══════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 pb-12 border-b border-white/[0.04]">
            <div>
              {isSearching ? (
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-amber-500/70 uppercase block mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    Resultados de Búsqueda
                  </span>
                  <h2 
                    className="text-3xl md:text-4xl font-light tracking-tight text-white/90"
                    style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                  >
                    {filtered.length} {filtered.length === 1 ? 'RECURSO' : 'RECURSOS'} <span className="text-white/30">ENCONTRADOS.</span>
                  </h2>
                </div>
              ) : (
                <SectionMeta tag="Catálogo Global" title={<>Todos los<br /><span className="text-white/30">Recursos.</span></>} />
              )}
            </div>

            {/* Categorization Filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <FilterChip key={c} label={c} isActive={activeCat === c} onClick={() => setActiveCat(c)} />
              ))}
            </div>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.length > 0 ? (
              filtered.map(r => <ResourceCard key={r.id} resource={r} />)
            ) : (
              <EmptyState query={searchQuery} onClear={() => { setSearchQuery(''); setActiveCat('Todo') }} />
            )}
          </div>
        </div>
      </section>

      {/* ══ TECHNICAL MENTORING CTA ════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20 bg-[#ffffff01] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto reveal flex flex-col md:flex-row items-start md:items-center justify-between gap-16">
          
          <div className="max-w-lg">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4 block">
              Orientación
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90 mb-6"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              ¿No encuentras el<br />
              <span className="text-white/30">recurso correcto?</span>
            </h2>
            <p 
              className="text-[14px] text-white/50 leading-relaxed mb-8"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Nuestros ingenieros senior pueden orientarte hacia la documentación, paper o sistema exacto para tu nivel y objetivo actual de investigación.
            </p>
            
            <Link
              to="/equipo"
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex items-center gap-3 px-6 py-3 border border-white/10 text-[11px] font-mono tracking-widest uppercase text-white/70 hover:bg-white hover:text-[#050816] hover:border-white transition-all duration-300"
            >
              Contactar Ingeniería
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-1 font-mono text-[10px] text-white/30 uppercase tracking-[0.1em] border-l border-white/[0.04] pl-8">
            <div className="py-3 border-b border-white/[0.04] flex justify-between">
              <span>Mentoría</span>
              <span className="text-white/60">Asesoría Directa</span>
            </div>
            <div className="py-3 border-b border-white/[0.04] flex justify-between">
              <span>Selección</span>
              <span className="text-white/60">Por Área Técnica</span>
            </div>
            <div className="py-3 border-b border-white/[0.04] flex justify-between">
              <span>Red de Contactos</span>
              <span className="text-white/60">Comunidad IEEE</span>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}