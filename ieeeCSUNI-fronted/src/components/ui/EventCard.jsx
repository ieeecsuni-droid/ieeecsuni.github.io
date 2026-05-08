import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

// ─── Helpers ───────────────────────────────────────────────────

function getStatusIndicator(spotsLeft, spots) {
  if (spots === undefined || spotsLeft === undefined) return null;
  const isFull = spotsLeft === 0;
  const isUrgent = !isFull && spotsLeft <= 5;
  
  if (isFull) return { color: 'bg-red-500', label: 'AGOTADO' };
  if (isUrgent) return { color: 'bg-amber-500 animate-pulse', label: 'POR LLENAR' };
  return { color: 'bg-white/20', label: 'DISPONIBLE' };
}

// ─── Main Component ──────────────────────────────────────────────

export function EventCard({ event }) {
  const {
    id,
    type,
    title,
    date,
    time,
    location,
    description,
    tag,
    spotsLeft,
    spots,
    featured = false,
    link,
  } = event

  const status = getStatusIndicator(spotsLeft, spots);
  const isFull = spotsLeft === 0;

  if (featured) {
    return (
      <article className="group relative flex flex-col md:flex-row col-span-1 md:col-span-2 lg:col-span-3 rounded-none border border-white/[0.06] bg-[#050816] overflow-hidden transition-all duration-700 ease-out hover:border-white/[0.15]">
        {/* Subtle structural background */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        
        {/* Hero Image Area (Left) */}
        <div className="relative w-full md:w-[45%] lg:w-[50%] min-h-[300px] border-b md:border-b-0 md:border-r border-white/[0.06] overflow-hidden bg-[#0a0f1c]">
          {/* Faux blueprint/image placeholder - in a real app, use event.image */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-amber-500/5 group-hover:from-violet-500/20 group-hover:to-amber-500/10 transition-colors duration-700" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60">Evento Destacado</span>
          </div>
        </div>

        {/* Content Area (Right) */}
        <div className="relative w-full md:w-[55%] lg:w-[50%] p-8 lg:p-12 flex flex-col justify-between bg-white/[0.01]">
          <div>
            <div className="flex justify-between items-start mb-8 pb-4 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">TIPO: {type}</span>
              {status && (
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                  <span className="font-mono text-[9px] tracking-widest text-white/40">{status.label}</span>
                </div>
              )}
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 mb-4 tracking-tight leading-tight" style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}>
              {title}
            </h3>
            
            <p className="text-[14px] text-white/50 leading-relaxed max-w-lg mb-8" style={{ fontFamily: '"Inter", "Satoshi", sans-serif' }}>
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/[0.06]">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-[10px] text-white/40">
              <div className="uppercase tracking-widest">FECHA: <span className="text-white/70">{date} {time}</span></div>
              <div className="uppercase tracking-widest">LUGAR: <span className="text-white/70">{location}</span></div>
              {spots !== undefined && (
                <div className="uppercase tracking-widest">AFORO: <span className="text-white/70">{spots - spotsLeft}/{spots}</span></div>
              )}
            </div>

            <Link
              to={link}
              className={`
                group/btn inline-flex items-center gap-2 px-6 py-3 border text-[11px] font-mono tracking-widest uppercase transition-all duration-300 shrink-0
                ${isFull 
                  ? 'border-white/[0.06] text-white/30 cursor-not-allowed bg-white/[0.01]' 
                  : 'border-white/[0.15] text-white/80 hover:bg-white hover:text-[#050816] hover:border-white'
                }
              `}
            >
              {isFull ? 'CERRADO' : 'INSCRIBIRSE'}
              {!isFull && <ArrowUpRight className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />}
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // STANDARD CARD
  return (
    <article className="group relative flex flex-col p-6 lg:p-8 rounded-none border border-white/[0.04] bg-[#ffffff01] hover:bg-[#ffffff03] hover:border-white/[0.1] transition-all duration-500 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      {/* Subtle bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/30 transition-all duration-700" />

      {/* Header */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/[0.04]">
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">TIPO: {type}</span>
        {status && (
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${status.label === 'DISPONIBLE' ? 'group-hover:bg-amber-500/50' : ''} ${status.color}`} />
            <span className="font-mono text-[9px] tracking-widest text-white/40">{status.label}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-[18px] md:text-[20px] font-medium text-white/70 group-hover:text-white/90 mb-3 tracking-tight transition-colors duration-300" style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}>
          {title}
        </h3>
        
        <p className="text-[13px] text-white/40 leading-relaxed line-clamp-3 mb-6" style={{ fontFamily: '"Inter", "Satoshi", sans-serif' }}>
          {description}
        </p>

        {/* Metadata Footer */}
        <div className="mt-auto pt-5 border-t border-white/[0.04] grid grid-cols-1 gap-2 font-mono text-[9px] tracking-widest text-white/30 uppercase">
          <div className="flex justify-between">
            <span>FECHA:</span>
            <span className="text-white/60">{date}</span>
          </div>
          <div className="flex justify-between">
            <span>LUGAR:</span>
            <span className="text-white/60 truncate max-w-[120px] text-right">{location}</span>
          </div>
        </div>
      </div>
      
      {/* Interactive Overlay linking */}
      {!isFull && (
        <Link to={link} className="absolute inset-0 z-10" aria-label={`Ver detalles de ${title}`} />
      )}
    </article>
  )
}