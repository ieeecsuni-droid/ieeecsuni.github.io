import { Github, ArrowUpRight, Terminal, GitMerge, Layers, Code2 } from 'lucide-react'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'

export default function ProjectCard({ project, onClick, index = 0 }) {
  const { title, description, tags, github, link, image, images, category } = project

  const displayImage = image || (images && images.length > 0 ? images[0] : PLACEHOLDER)

  return (
    <article
      onClick={onClick}
      className="group relative flex flex-col h-full border transition-all duration-700 ease-out cursor-pointer bg-white/[0.01] border-white/5 hover:border-blue-500/20 hover:bg-blue-600/[0.02]"
    >
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/0 group-hover:border-blue-500/40 transition-all" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/0 group-hover:border-blue-500/40 transition-all" />

      <div className="relative h-56 md:h-64 overflow-hidden flex-shrink-0 bg-black border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 z-10 pointer-events-none" />
        
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover transition-all duration-1000 ease-out grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
          onError={e => { e.currentTarget.src = PLACEHOLDER }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

        <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
          <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-white/20 uppercase font-bold">
            ID: {String(index + 1).padStart(3, '0')}
          </span>
          <span className="font-ibm-plex text-[8px] tracking-[0.2em] text-blue-500/60 uppercase font-bold">
            SYSTEM_LOG_A0{index % 9}
          </span>
        </div>

        {category && (
          <div className="absolute top-6 right-6 z-20">
            <span className="px-3 py-1 border border-blue-500/20 bg-black/60 backdrop-blur-md text-[9px] font-ibm-plex uppercase tracking-widest text-blue-400 font-bold">
              {category}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-8 lg:p-10 relative">
        <div className="flex flex-wrap gap-2 mb-6">
          {tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="font-ibm-plex text-[9px] tracking-[0.2em] text-white/20 uppercase border border-white/5 px-2.5 py-1 bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
          {(tags?.length ?? 0) > 3 && (
            <span className="font-ibm-plex text-[9px] tracking-[0.2em] text-white/10 uppercase border border-white/5 px-2 py-1 bg-white/[0.01]">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <h3 className="text-2xl font-space-grotesk font-bold text-white/80 group-hover:text-white mb-4 transition-colors leading-tight">
          {title}
        </h3>

        <p className="text-[14px] text-white/40 leading-relaxed font-inter line-clamp-2 flex-1 mb-8">
          {description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-3 text-white/20 group-hover:text-blue-500/60 transition-colors duration-500">
            <Code2 size={14} />
            <span className="font-ibm-plex text-[9px] tracking-[0.2em] uppercase font-bold">Project_Status: Online</span>
          </div>

          <div className="flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-10 h-10 flex items-center justify-center text-white/20 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all duration-500"
                title="Repository"
              >
                <Github size={16} />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-10 h-10 flex items-center justify-center text-white/20 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all duration-500"
                title="Live Demo"
              >
                <ArrowUpRight size={16} />
              </a>
            )}
            {!link && !github && (
              <div className="w-10 h-10 flex items-center justify-center text-white/10" title="Código Privado">
                <Terminal size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}