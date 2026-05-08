import { Link } from 'react-router-dom'
import { ArrowUpRight, Calendar, MapPin, Users, Clock } from 'lucide-react'

function getStatusIndicator(spotsLeft, spots) {
  if (spots === undefined || spotsLeft === undefined) return null;
  const isFull = spotsLeft === 0;
  const isUrgent = !isFull && spotsLeft <= 5;
  
  if (isFull) return { color: 'bg-red-500', label: 'AGOTADO' };
  if (isUrgent) return { color: 'bg-blue-500 animate-pulse', label: 'CUPOS_CRÍTICOS' };
  return { color: 'bg-emerald-500/40', label: 'ACTIVO' };
}

export function EventCard({ event }) {
  const {
    id,
    type,
    title,
    date,
    time,
    location,
    description,
    spotsLeft,
    spots,
    featured = false,
    link,
  } = event

  const status = getStatusIndicator(spotsLeft, spots);
  const isFull = spotsLeft === 0;

  if (featured) {
    return (
      <article className="group relative flex flex-col lg:flex-row col-span-1 lg:col-span-3 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-blue-500/20 transition-all duration-700 overflow-hidden">
        <div className="relative w-full lg:w-[45%] h-64 lg:h-auto overflow-hidden bg-black">
          <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />
          <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-ibm-plex text-[10px] tracking-[0.3em] uppercase text-white/60 font-bold">EVENTO_DESTACADO</span>
          </div>
          {/* Faux hologram effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/40 animate-[scanline_8s_linear_infinite]" />
          </div>
        </div>

        <div className="relative w-full lg:w-[55%] p-10 lg:p-14 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
              <span className="font-ibm-plex text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">{type}</span>
              {status && (
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                  <span className="font-mono text-[9px] tracking-widest text-white/40">{status.label}</span>
                </div>
              )}
            </div>
            
            <h3 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white mb-6 tracking-tight leading-[0.95]">
              {title}
            </h3>
            
            <p className="text-[15px] text-white/40 leading-relaxed max-w-xl mb-10 font-inter">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-8 border-t border-white/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 font-ibm-plex text-[10px] text-white/20 uppercase tracking-widest font-bold">
              <div className="flex items-center gap-3">
                <Calendar size={12} className="text-blue-500/40" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={12} className="text-blue-500/40" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={12} className="text-blue-500/40" />
                <span className="truncate max-w-[150px]">{location}</span>
              </div>
              {spots !== undefined && (
                <div className="flex items-center gap-3">
                  <Users size={12} className="text-blue-500/40" />
                  <span>{spots - spotsLeft}/{spots} CUPOS</span>
                </div>
              )}
            </div>

            <Link
              to={link}
              className={`
                group/btn relative inline-flex items-center gap-4 px-8 py-4 overflow-hidden transition-all duration-700
                ${isFull 
                  ? 'border border-white/5 text-white/20 cursor-not-allowed' 
                  : 'border border-blue-500/30 text-white/80 hover:text-white hover:border-blue-500 hover:bg-blue-600/10'
                }
              `}
            >
              <span className="relative z-10 font-space-grotesk font-bold text-[10px] uppercase tracking-[0.25em]">
                {isFull ? 'COMPLETO' : 'REGISTRARSE'}
              </span>
              {!isFull && <ArrowUpRight size={14} className="relative z-10 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />}
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group relative flex flex-col p-10 border border-white/5 bg-white/[0.01] hover:bg-blue-600/[0.02] hover:border-blue-500/20 transition-all duration-700">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
        <span className="font-ibm-plex text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">{type}</span>
        {status && (
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
            <span className="font-mono text-[9px] tracking-widest text-white/40">{status.label}</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-2xl font-space-grotesk font-bold text-white/80 group-hover:text-white mb-4 transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-[14px] text-white/40 leading-relaxed line-clamp-3 mb-8 font-inter">
          {description}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
          <div className="flex justify-between items-center font-ibm-plex text-[9px] text-white/20 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-2"><Calendar size={10} /> FECHA:</span>
            <span className="text-white/60">{date}</span>
          </div>
          <div className="flex justify-between items-center font-ibm-plex text-[9px] text-white/20 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-2"><MapPin size={10} /> LUGAR:</span>
            <span className="text-white/60 truncate max-w-[150px]">{location}</span>
          </div>
        </div>
      </div>
      
      {!isFull && (
        <Link to={link} className="absolute inset-0 z-10" />
      )}

      {/* Decorative corner accents on hover */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/0 group-hover:border-blue-500/40 transition-all" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/0 group-hover:border-blue-500/40 transition-all" />
    </article>
  )
}