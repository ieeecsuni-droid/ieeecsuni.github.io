import { ArrowUpRight, BookOpen, Wrench, GraduationCap, FileText, Terminal, Link2, Database, Shield } from 'lucide-react'

const TYPE_CONFIG = {
  paper:     { icon: FileText,      label: 'PAPER',     style: 'text-blue-400' },
  guide:     { icon: BookOpen,      label: 'GUIDE',     style: 'text-emerald-400' },
  tool:      { icon: Wrench,        label: 'TOOL',      style: 'text-blue-400'},
  course:    { icon: GraduationCap, label: 'COURSE',    style: 'text-indigo-400'},
  tutorial:  { icon: Terminal,      label: 'TUTORIAL',  style: 'text-blue-400' },
  reference: { icon: Database,      label: 'REFERENCE', style: 'text-white/30' },
}

const LEVEL_CONFIG = {
  beginner:     { label: 'LVL: BÁSICO',       style: 'text-emerald-400/60' },
  intermediate: { label: 'LVL: INTERMEDIO',   style: 'text-blue-400/60'     },
  advanced:     { label: 'LVL: AVANZADO',     style: 'text-indigo-500/60'  },
}

const DEFAULT_CTA = {
  paper:     'Read Document',
  guide:     'View Guide',
  tool:      'Execute Tool',
  course:    'Start Module',
  tutorial:  'Open Tutorial',
  reference: 'Query Resource',
}

export function ResourceCard({ resource, featured = false }) {
  const {
    title,
    excerpt,
    link,
    category,
    type,
    level,
    cta,
  } = resource

  const typeConfig  = type  ? TYPE_CONFIG[type]   : null
  const levelConfig = level ? LEVEL_CONFIG[level] : null
  const TypeIcon    = typeConfig?.icon ?? Link2
  const ctaLabel    = cta ?? (type ? DEFAULT_CTA[type] : 'Execute Query')

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex flex-col h-full border
        transition-all duration-700 overflow-hidden
        ${featured
          ? 'bg-blue-600/[0.02] border-blue-500/20 hover:border-blue-500/40'
          : 'bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
        }
      `}
    >
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/0 group-hover:border-blue-500/40 transition-all" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/0 group-hover:border-blue-500/40 transition-all" />

      <div className="p-8 lg:p-10 pb-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className={`w-1 h-3 ${typeConfig?.style?.replace('text-', 'bg-') ?? 'bg-white/20'} opacity-60`} />
            <span className="font-ibm-plex text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">
              {typeConfig ? `TYPE: ${typeConfig.label}` : `CAT: ${category}`}
            </span>
          </div>

          {featured && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-ibm-plex text-[9px] tracking-widest text-blue-500/80 uppercase font-bold">PRIORITIZED</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-space-grotesk font-bold text-white/80 group-hover:text-white mb-4 transition-colors leading-tight">
          {title}
        </h3>
        
        {typeConfig && category && (
           <span className="font-ibm-plex text-[9px] text-white/20 tracking-[0.2em] uppercase border border-white/10 px-2 py-0.5 bg-white/[0.01]">
             {category}
           </span>
        )}
      </div>

      <div className="p-8 lg:p-10 pt-2 flex-1 flex flex-col justify-between gap-8">
        <p className="text-[14px] text-white/40 leading-relaxed font-inter line-clamp-3 group-hover:text-white/50 transition-colors">
          {excerpt ?? 'Recurso técnico estructurado dentro del repositorio institucional.'}
        </p>

        <div className="mt-auto flex flex-col gap-4">
          {levelConfig && (
            <div className="flex justify-between items-center font-ibm-plex text-[9px] tracking-widest uppercase text-white/20 border-t border-white/5 pt-6 font-bold">
              <span>DIFFICULTY_LEVEL</span>
              <span className={levelConfig.style}>{levelConfig.label}</span>
            </div>
          )}

          <div className="relative flex items-center justify-between border border-white/10 bg-black px-5 py-3.5 group-hover:border-blue-500/40 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-700" />
            <span className="relative z-10 text-[10px] font-space-grotesk font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors uppercase">
              {ctaLabel}
            </span>
            <ArrowUpRight className="relative z-10 w-4 h-4 text-white/20 group-hover:text-blue-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </a>
  )
}