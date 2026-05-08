import React from 'react'

export const AtmosphereTag = ({ children, className = "" }) => (
  <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
    <div className="w-6 md:w-12 h-px bg-blue-500/30" />
    <span className="font-ibm-plex text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.6em] text-blue-500/80 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
      {children}
    </span>
    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500/40 animate-pulse" />
  </div>
)
