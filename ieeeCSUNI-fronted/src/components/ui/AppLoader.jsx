import { useState, useEffect } from 'react'
import { IEEECSLogo } from '../../assets/IEEECSLogo'

export function AppLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Elegant progress simulation
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 20)

    const finishTimeout = setTimeout(() => {
      setIsFadingOut(true)
      setTimeout(onComplete, 800)
    }, 2800)

    return () => {
      clearInterval(timer)
      clearTimeout(finishTimeout)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#05070C] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out
        ${isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
      `}
    >
      {/* ── Subtlest Background Glow ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      {/* ── Minimalist Content ── */}
      <div className="relative flex flex-col items-center gap-12">
        
        {/* Breathing Logo */}
        <div className="relative group">
          {/* Subtle Outer Ring */}
          <div className="absolute -inset-8 border border-white/[0.03] rounded-full scale-110" />
          
          <div className="relative animate-[pulse_4s_ease-in-out_infinite] flex items-center justify-center">
            <IEEECSLogo size={48} className="text-white opacity-90" />
            
            {/* Shimmer Effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          </div>
        </div>

        {/* Minimal Status Block */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/20 tracking-[0.4em] uppercase">
              Initializing
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className="w-1 h-1 bg-white/40 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
          
          {/* Numerical progress - very small and clean */}
          <span className="font-mono text-[9px] text-white/10 tracking-widest">
            {progress.toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-200%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
    </div>
  )
}
