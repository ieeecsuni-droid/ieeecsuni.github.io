import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data'
import ProjectCard from '../components/ui/ProjectCard'
import { EngineeringButton } from '../components/ui/EngineeringButton'
import { AtmosphereTag } from '../components/ui/AtmosphereTag'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Github, ExternalLink, X, Layers, Activity, GitCommit, GitPullRequest, Crosshair, Cpu, Terminal } from 'lucide-react'

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
        style={{ animation: 'fadeIn 300ms ease forwards' }}
      />

      <div
        className="relative w-full max-w-6xl flex flex-col md:flex-row bg-black border border-white/10 overflow-hidden"
        style={{ animation: 'modalIn 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-blue-500/40 bg-black/50 backdrop-blur-md transition-all duration-300"
        >
          <X size={20} />
        </button>

        <div className="md:w-1/2 relative min-h-[400px] border-b md:border-b-0 md:border-r border-white/10 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 z-10 pointer-events-none" />
          <img src={displayImage} className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" alt={project.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-1">
            <span className="font-ibm-plex text-[10px] tracking-[0.4em] text-blue-500 font-bold uppercase">PROJECT_TELEMETRY</span>
            <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">ID: {project.id || 'SYS_0x99'} // STATUS: ONLINE</span>
          </div>
        </div>

        <div className="md:w-1/2 p-10 md:p-16 flex flex-col bg-white/[0.01]">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <Layers size={14} className="text-blue-500/40" />
              <span className="font-ibm-plex text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold">
                {project.category ?? 'Ingeniería y Desarrollo'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-8 tracking-tighter leading-tight">
              {project.title}
            </h2>

            <div className="w-12 h-px bg-blue-500/30 mb-8" />

            <p className="text-white/40 text-lg leading-relaxed mb-12 font-inter">
              {project.description}
            </p>

            <div className="mb-12">
              <h4 className="font-ibm-plex text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-6 font-bold">Core Stack</h4>
              <div className="flex flex-wrap gap-3">
                {project.tags?.map(t => (
                  <span key={t} className="px-4 py-1.5 border border-white/5 bg-white/[0.02] text-[10px] font-ibm-plex uppercase tracking-widest text-white/60 font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.members?.length > 0 && (
              <div className="mb-12">
                <h4 className="font-ibm-plex text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-6 font-bold">Contributors</h4>
                <div className="flex flex-wrap gap-3">
                  {project.members.map(member => (
                    <span key={member} className="px-4 py-1.5 text-[11px] text-white/40 border border-white/5 bg-white/[0.01] font-inter">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-white/5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 group/btn relative inline-flex items-center justify-center gap-4 px-8 py-4 border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.02] transition-all duration-700">
                <Github size={16} className="text-white/20 group-hover/btn:text-white transition-colors" />
                <span className="font-space-grotesk font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover/btn:text-white">SOURCE_CODE</span>
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 group/btn relative inline-flex items-center justify-center gap-4 px-8 py-4 border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 hover:border-blue-500 transition-all duration-700">
                <ExternalLink size={16} className="text-white group-hover/btn:scale-110 transition-transform" />
                <span className="font-space-grotesk font-bold text-[10px] uppercase tracking-[0.2em] text-white">LIVE_DEPLOYMENT</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.98) translateY(20px) }
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
      className={`px-6 py-2.5 border text-[10px] font-space-grotesk font-bold tracking-[0.2em] uppercase transition-all duration-500
        ${isActive
          ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
          : 'bg-white/[0.02] text-white/30 border-white/5 hover:text-white/80 hover:border-white/20'
        }`}
    >
      {label === 'all' ? 'TODOS' : label}
    </button>
  )
}

// ─── Main Page ─────────────────────────────────────────────────

export default function ProyectosPage() {
  useScrollReveal()
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')

  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags ?? []))]
  const filtered = filter === 'all' ? projects : projects.filter(p => p.tags?.includes(filter))

  const featuredProject = projects[0]

  return (
    <main className="bg-black text-white min-h-screen selection:bg-blue-600/30 overflow-hidden font-inter">
      
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative pt-48 pb-32 px-6 md:px-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#02040a]" />
          <div className="absolute inset-0 opacity-40">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-blue-500/[0.03] animate-[spin_60s_linear_infinite]" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-blue-500/[0.02] animate-[spin_90s_linear_infinite_reverse]" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[150vh] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto w-full flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <AtmosphereTag className="mb-12 justify-center">Showcase de Ingeniería e I+D</AtmosphereTag>
            <h1 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,10rem)] leading-[0.85] tracking-tight uppercase text-white mb-12">
              Innovación<br /><span className="text-blue-600">y Proyectos.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-inter max-w-3xl mb-16">
              Despliegues técnicos y soluciones arquitectónicas desarrolladas por el IEEE Computer Society UNI. Una galería de innovación y capacidad de ingeniería.
            </p>
          </motion.div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-12 border border-white/10 bg-white/[0.01] px-12 py-8 backdrop-blur-xl">
            {[
              { val: projects.length, label: 'Sistemas Activos' },
              { val: allTags.length - 1, label: 'Tecnologías' },
              { val: '24/7', label: 'Monitorización' },
              { val: 'GLOBAL', label: 'Impacto' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-space-grotesk text-3xl font-bold text-white mb-2">{stat.val}</span>
                <span className="font-ibm-plex text-[8px] tracking-[0.2em] text-blue-500/60 uppercase font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED ══════════════════════════════════════════ */}
      {featuredProject && filter === 'all' && (
        <section className="py-48 px-6 md:px-24 border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-[1700px] mx-auto">
            <AtmosphereTag className="mb-16">Flagship Project</AtmosphereTag>
            
            <div 
              className="group relative cursor-pointer grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] border border-white/5 bg-black hover:border-blue-500/20 transition-all duration-700"
              onClick={() => setSelectedProject(featuredProject)}
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/40" />

              <div className="relative h-[400px] lg:h-[600px] border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 z-10" />
                <img src={featuredProject.image || (featuredProject.images && featuredProject.images.length > 0 ? featuredProject.images[0] : PLACEHOLDER)} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="absolute bottom-8 left-8 z-20 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-ibm-plex text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold">R&D_FLAGSHIP_SYSTEM</span>
                </div>
              </div>

              <div className="p-12 lg:p-20 flex flex-col justify-between bg-white/[0.01]">
                <div>
                  <span className="inline-block px-3 py-1 border border-blue-500/20 bg-blue-500/5 text-[9px] font-ibm-plex uppercase tracking-widest text-blue-400 font-bold mb-8">
                    {featuredProject.category || 'Proyecto Principal'}
                  </span>
                  <h2 className="text-4xl lg:text-6xl font-space-grotesk font-bold text-white mb-8 tracking-tighter leading-[0.95] group-hover:text-blue-500 transition-colors duration-500">
                    {featuredProject.title}
                  </h2>
                  <p className="text-lg text-white/40 leading-relaxed mb-12 font-inter line-clamp-4 group-hover:text-white/60 transition-colors">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-12">
                    {featuredProject.tags?.slice(0, 5).map(t => (
                      <span key={t} className="font-ibm-plex text-[9px] tracking-[0.2em] text-white/20 uppercase border border-white/5 px-3 py-1 bg-white/[0.02]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="font-space-grotesk font-bold text-[12px] tracking-[0.2em] text-white/30 group-hover:text-white transition-colors uppercase">Explorar Documentación</span>
                  <Activity size={20} className="text-white/20 group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ GRID ══════════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-[1700px] mx-auto">
          
          <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24 border-b border-white/5 pb-16">
            <div>
              <AtmosphereTag className="mb-10">Repositorio de Proyectos</AtmosphereTag>
              <h2 className="font-space-grotesk font-bold text-5xl md:text-7xl text-white mb-4 tracking-tighter">
                Proyectos<br /><span className="text-blue-600">Recientes.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {allTags.map(tag => (
                <FilterChip key={tag} label={tag} isActive={filter === tag} onClick={() => setFilter(tag)} />
              ))}
            </div>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {filtered.map((project, i) => {
              if (filter === 'all' && project.id === featuredProject?.id) return null
              return (
                <ProjectCard key={project.id ?? i} project={project} index={filter === 'all' ? i : i} onClick={() => setSelectedProject(project)} />
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/10 bg-white/[0.01]">
              <Terminal size={32} className="text-white/10 mb-8" />
              <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold">QUERY_STATUS: NULL_RESPONSE</span>
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <style>{`
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg) } to { transform: translate(-50%, -50%) rotate(360deg) } }
      `}</style>
    </main>
  )
}