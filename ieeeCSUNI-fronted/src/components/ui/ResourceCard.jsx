import { ArrowUpRight, BookOpen, Wrench, GraduationCap, FileText, Terminal, Link2, Database } from 'lucide-react'

// ─── Sistemas de metadata ──────────────────────────────────────

const TYPE_CONFIG = {
  paper:     { icon: FileText,      label: 'PAPER',     style: 'text-violet-400' },
  guide:     { icon: BookOpen,      label: 'GUIDE',     style: 'text-amber-400' },
  tool:      { icon: Wrench,        label: 'TOOL',      style: 'text-amber-400'},
  course:    { icon: GraduationCap, label: 'COURSE',    style: 'text-emerald-400'},
  tutorial:  { icon: Terminal,      label: 'TUTORIAL',  style: 'text-amber-400' },
  reference: { icon: Database,      label: 'REFERENCE', style: 'text-white/60' },
}

const LEVEL_CONFIG = {
  beginner:     { label: 'LVL: BÁSICO',       style: 'text-emerald-400/80' },
  intermediate: { label: 'LVL: INTERMEDIO',   style: 'text-amber-400/80'     },
  advanced:     { label: 'LVL: AVANZADO',     style: 'text-orange-500/80'  },
}

const DEFAULT_CTA = {
  paper:     'Read Document',
  guide:     'View Guide',
  tool:      'Execute Tool',
  course:    'Start Module',
  tutorial:  'Open Tutorial',
  reference: 'Query Resource',
}

// ─── Componente ────────────────────────────────────────────────

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
        group relative flex flex-col h-full rounded-sm border bg-[#ffffff01]
        transition-all duration-500 overflow-hidden
        hover:bg-[#ffffff03]
        ${featured
          ? 'border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-amber-500/40'
          : 'border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] hover:border-white/[0.15]'
        }
      `}
    >
      {/* Left Accent Line on Hover */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all duration-700" />

      {/* Cabecera Técnica */}
      <div className="p-6 lg:p-8 pb-4">
        <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b border-white/[0.04]">
          {/* System Tag */}
          <div className="flex items-center gap-2">
            <span className={`w-1 h-3 ${typeConfig?.style?.split(' ')[0].replace('text-', 'bg-') ?? 'bg-white/40'}`} />
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
              {typeConfig ? `TYPE: ${typeConfig.label}` : `CAT: ${category}`}
            </span>
          </div>

          {featured && (
            <span className="flex-shrink-0 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-amber-500/80 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Prioritized
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          className="text-lg md:text-xl font-light text-white/80 group-hover:text-white mb-3 tracking-tight transition-colors duration-300 leading-snug line-clamp-2"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          {title}
        </h3>
        
        {/* Category explicit tag if it has type */}
        {typeConfig && category && (
           <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase border border-white/[0.04] px-2 py-0.5 bg-white/[0.01]">
             {category}
           </span>
        )}
      </div>

      {/* Cuerpo */}
      <div className="p-6 lg:p-8 pt-2 flex-1 flex flex-col justify-between gap-6">
        <p 
          className="text-[13px] text-white/40 leading-relaxed line-clamp-3"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {excerpt ?? 'Recurso técnico del ecosistema de la base de conocimiento.'}
        </p>

        {/* Metadata Footer */}
        <div className="mt-auto flex flex-col gap-3">
          {levelConfig && (
            <div className="flex justify-between items-center font-mono text-[9px] tracking-widest uppercase text-white/30 border-t border-white/[0.04] pt-4">
              <span>Difficulty</span>
              <span className={levelConfig.style}>{levelConfig.label}</span>
            </div>
          )}

          {/* CTA Terminal Style */}
          <div className="flex items-center justify-between border border-white/[0.06] bg-[#050816] px-4 py-2.5 mt-2 group-hover:border-white/[0.15] transition-colors duration-300">
            <span className="text-[10px] font-mono tracking-[0.15em] text-white/50 group-hover:text-white transition-colors uppercase">
              {ctaLabel}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </a>
  )
}