import { Github, ArrowUpRight, Terminal, GitMerge } from 'lucide-react'

// ─── Fallback placeholder ───
const PLACEHOLDER = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'

export default function ProjectCard({ project, onClick, index = 0 }) {
  const { title, description, tags, github, link, image, images, category } = project

  // Normalizar imagen
  const displayImage = image || (images && images.length > 0 ? images[0] : PLACEHOLDER)

  return (
    <article
      onClick={onClick}
      className="group relative flex flex-col h-full bg-[#ffffff01] border border-white/[0.04] rounded-sm overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:border-white/[0.15] hover:bg-[#ffffff03]"
    >
      {/* ── LEFT ACCENT BORDER ── */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all duration-700 z-20 pointer-events-none" />

      {/* ── IMAGE SECTION ── */}
      <div className="relative h-48 md:h-56 overflow-hidden flex-shrink-0 bg-[#050816] border-b border-white/[0.04]">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.05] z-10 pointer-events-none" />
        
        <img
          src={displayImage}
          alt={title}
          draggable={false}
          className="w-full h-full object-cover transition-all duration-1000 ease-out grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
          onError={e => { e.currentTarget.src = PLACEHOLDER }}
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent z-10 pointer-events-none" />

        {/* Index Watermark */}
        <span className="absolute top-4 left-5 z-20 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
          PRJ.{String(index + 1).padStart(2, '0')}
        </span>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 right-4 z-20">
            <span className="px-2.5 py-1 border border-white/[0.08] bg-[#050816]/80 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-white/60">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="flex flex-col flex-1 p-6 lg:p-8 relative">
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.15em] text-white/40 uppercase border border-white/[0.04] px-2 py-0.5 bg-white/[0.01]"
            >
              {tag}
            </span>
          ))}
          {(tags?.length ?? 0) > 3 && (
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase border border-white/[0.02] px-2 py-0.5 bg-white/[0.01]">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          className="text-lg md:text-xl font-light text-white/80 group-hover:text-white mb-3 tracking-tight transition-colors duration-300 leading-snug"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          className="text-[13px] text-white/40 leading-relaxed line-clamp-2 flex-1 mb-6"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {description}
        </p>

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
          
          <div className="flex items-center gap-2 text-white/30 group-hover:text-amber-500/80 transition-colors duration-300">
            <GitMerge className="w-4 h-4" />
            <span className="font-mono text-[9px] tracking-widest uppercase">Desarrollo Activo</span>
          </div>

          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.05] transition-all"
                title="Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.05] transition-all"
                title="Ver Proyecto"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {!link && !github && (
              <span className="w-8 h-8 flex items-center justify-center text-white/20" title="Código Privado">
                <Terminal className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}