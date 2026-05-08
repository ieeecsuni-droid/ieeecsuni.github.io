import { useState, useEffect, useRef } from 'react'
import { projects } from '../data/data'
import ProjectCard from '../components/ui/ProjectCard'
import { Github, ExternalLink, X, Layers, Activity, GitCommit, GitPullRequest } from 'lucide-react'

// ─── Modal ───────────────────────────────────────────────────

const ProjectModal = ({ project, onClose }) => {
  const overlayRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const displayImage = project.image || (project.images && project.images.length > 0 ? project.images[0] : 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#050816]/95 backdrop-blur-md"
        onClick={onClose}
        style={{ animation: 'fadeIn 200ms ease forwards' }}
      />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-5xl flex flex-col md:flex-row bg-[#050816] border border-white/[0.1] shadow-2xl overflow-hidden"
        style={{ animation: 'modalIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white bg-black/50 backdrop-blur-sm border border-white/[0.08] transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Image / Visuals */}
        <div className="md:w-[50%] relative min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-white/[0.06] bg-[#030408]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.05] pointer-events-none z-10" />
          
          <img
            src={displayImage}
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
            alt={project.title}
          />
          <div className="absolute inset-0 bg-[#050816]/40 pointer-events-none mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />

          {/* Telemetry overlay */}
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            <span>PROJECT_ID: {project.id || 'N/A'}</span>
            <span>STATUS: DEPLOYED</span>
            <span>ACCESO: PÚBLICO</span>
          </div>
        </div>

        {/* Right: Technical Specs */}
        <div className="md:w-[50%] p-8 md:p-12 flex flex-col bg-[#ffffff02]">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-3.5 h-3.5 text-white/40" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
                {project.category ?? 'DESARROLLO TECNOLÓGICO'}
              </span>
            </div>

            <h2 
              className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight leading-tight"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {project.title}
            </h2>

            <div className="w-8 h-px bg-white/20 mb-6" />

            <p 
              className="text-white/50 text-[14px] leading-relaxed mb-8"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase mb-3">Tecnologías Usadas</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-1 border border-white/[0.06] bg-white/[0.02] text-[10px] font-mono uppercase tracking-widest text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Members / Contributors */}
            {project.members?.length > 0 && (
              <div className="mb-10">
                <h4 className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase mb-3">Contribuidores</h4>
                <div className="flex flex-wrap gap-2">
                  {project.members.map(member => (
                    <div
                      key={member}
                      className="px-3 py-1.5 text-[11px] text-white/60 border border-white/[0.04] bg-white/[0.01]"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="flex gap-4 mt-auto pt-6 border-t border-white/[0.04]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/[0.1] bg-white/[0.02] hover:bg-white text-[10px] font-mono tracking-widest uppercase text-white/70 hover:text-[#050816] hover:border-white transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 bg-white/10 hover:bg-white hover:text-[#050816] text-[10px] font-mono tracking-widest uppercase text-white transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {!project.link && !project.github && (
              <span className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/[0.04] bg-white/[0.01] text-[10px] font-mono tracking-widest uppercase text-white/20">
                Código Privado
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.98) translateY(10px) }
          to   { opacity: 1; transform: scale(1) translateY(0) }
        }
      `}</style>
    </div>
  )
}

// ─── Filter Chip ───────────────────────────────────────────────

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
      {label === 'all' ? 'TODOS' : label}
    </button>
  )
}

// ─── Main Page ─────────────────────────────────────────────────

export default function ProyectosPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')

  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags ?? []))]
  const filtered = filter === 'all' ? projects : projects.filter(p => p.tags?.includes(filter))

  const featuredProject = projects[0] // Treat the first project as the flagship

  return (
    <main className="bg-[#050816] min-h-screen text-white selection:bg-amber-500/30 selection:text-white overflow-x-hidden">
      
      {/* ══ BACKGROUND SYSTEM ══════════════════════════════════ */}
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
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(76,29,149,0.08),_transparent_60%)] pointer-events-none blur-3xl" />
      </div>

      {/* ── HERO: ENGINEERING SHOWCASE ── */}
      <section className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-20 border-b border-white/[0.04]">
        
        {/* ── IMPACTFUL NODE NETWORK BACKGROUND ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
          {/* Vignette mask to blend edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050816_100%)] z-20" />
          
          {/* Central Data Core Topology */}
          <div className="absolute top-[40%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
            {/* Outer system rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-white/[0.04] border-l-amber-500/30 animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[850px] md:h-[850px] rounded-full border border-dashed border-white/[0.02] border-r-violet-500/30 animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full border border-white/[0.02] animate-[spin_60s_linear_infinite]" />
            
            {/* Blueprint Grid Lines (Axes) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[150vh] w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent rotate-45" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -rotate-45" />

            {/* Orbiting Data Nodes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] animate-[spin_30s_linear_infinite]">
               <div className="absolute top-0 left-1/2 w-2.5 h-2.5 md:w-3 md:h-3 bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b] -translate-x-1/2 -translate-y-1/2" />
               <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-white/60 rounded-full -translate-x-1/2 translate-y-1/2" />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[850px] md:h-[850px] animate-[spin_40s_linear_infinite_reverse]">
               <div className="absolute left-0 top-1/2 w-2 h-2 md:w-3 md:h-3 bg-violet-500 rounded-full shadow-[0_0_15px_#8b5cf6] -translate-x-1/2 -translate-y-1/2" />
               <div className="absolute right-1/4 bottom-1/4 w-1.5 h-1.5 bg-amber-500/80 rounded-full shadow-[0_0_8px_#f59e0b]" />
            </div>
            
            {/* Core Radar Pulse */}
            <div className="absolute top-1/2 left-1/2 w-24 h-24 md:w-40 md:h-40 bg-sky-500/10 rounded-full blur-[30px] animate-pulse -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          {/* Subtle Glowing Atmosphere */}
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.06),_transparent_60%)] blur-[100px] z-10" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.04),_transparent_60%)] blur-[100px] z-10" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              R&D Showcase
            </span>
          </div>

          <h1 
            className="mt-2 mb-6 text-[clamp(48px,7vw,100px)] font-light tracking-tight leading-[0.95] text-white uppercase"
            style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}
          >
            INNOVACIÓN<br />
            <span className="text-white/30">Y PROYECTOS.</span>
          </h1>

          <p 
            className="max-w-2xl text-[15px] md:text-[16px] text-white/50 leading-relaxed mb-10"
            style={{ fontFamily: '"Inter", "Satoshi", sans-serif' }}
          >
            Despliegues técnicos y soluciones arquitectónicas desarrolladas por el IEEE Computer Society UNI. Una galería de innovación y capacidad de ingeniería.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 border border-white/[0.04] bg-[#ffffff02] px-8 py-4 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-light" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{projects.length}</span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase">Proyectos Activos</span>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-light" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{allTags.length - 1}</span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase">Technologies</span>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-light flex items-center gap-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> ONLINE
              </span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase">Acceso Global</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECT (FLAGSHIP SYSTEM) ── */}
      {featuredProject && filter === 'all' && (
        <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20 bg-[#ffffff01] border-b border-white/[0.04]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-6 h-px bg-amber-500/50" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-amber-500/70 uppercase">
                Proyecto Destacado
              </span>
            </div>

            <div 
              className="group relative cursor-pointer grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] border border-white/[0.04] bg-[#030408] hover:border-white/[0.15] transition-all duration-500"
              onClick={() => setSelectedProject(featuredProject)}
            >
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all duration-700 z-20 pointer-events-none" />

              <div className="relative h-64 lg:h-[450px] border-b lg:border-b-0 lg:border-r border-white/[0.04] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.05] z-10 pointer-events-none" />
                <img
                  src={featuredProject.image || (featuredProject.images && featuredProject.images.length > 0 ? featuredProject.images[0] : 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800')}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase">R&D Flagship</span>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-between bg-[#ffffff01]">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-2 py-0.5 border border-white/[0.06] bg-white/[0.02] text-[9px] font-mono uppercase tracking-widest text-white/50">
                      {featuredProject.category || 'Proyecto Principal'}
                    </span>
                  </div>
                  <h2 
                    className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight leading-tight group-hover:text-amber-500/90 transition-colors duration-300"
                    style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                  >
                    {featuredProject.title}
                  </h2>
                  <p 
                    className="text-[14px] text-white/50 leading-relaxed mb-8 line-clamp-4"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {featuredProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredProject.tags?.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase border border-white/[0.04] px-2 py-0.5 bg-white/[0.01]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between mt-auto">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase group-hover:text-white transition-colors">
                    Ver Proyecto
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PROJECT GRID ── */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 pb-12 border-b border-white/[0.04]">
            <div>
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-6 h-px bg-white/20" />
                 <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">Desarrollos Activos</span>
               </div>
               <h2 
                 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05] text-white/90"
                 style={{ fontFamily: '"Space Grotesk", sans-serif' }}
               >
                 Proyectos<br /><span className="text-white/30">Recientes.</span>
               </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <FilterChip key={tag} label={tag} isActive={filter === tag} onClick={() => setFilter(tag)} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((project, i) => {
              // Si estamos en "Todos", saltamos el featured project en la grilla para no duplicarlo
              if (filter === 'all' && project.id === featuredProject?.id) return null
              return (
                <ProjectCard 
                  key={project.id ?? i} 
                  project={project} 
                  index={filter === 'all' ? i - 1 : i} 
                  onClick={() => setSelectedProject(project)} 
                />
              )
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/[0.08] bg-[#ffffff01]">
              <GitPullRequest className="w-6 h-6 text-white/20 mb-4" />
              <p className="text-white/40 text-[11px] font-mono uppercase tracking-widest">No se encontraron proyectos.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL ── */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </main>
  )
}