import { useState, useEffect } from 'react'

const LOADING_MESSAGES = [
  '[ INITIALIZING CORE SYSTEMS ]',
  '[ CONNECTING TO ENGINEERING NETWORK ]',
  '[ MOUNTING UI COMPONENTS ]',
  '[ SYNCHRONIZING DATABASES ]',
  '[ SYSTEM ONLINE ]'
]

export function AppLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // 1. Manejo del progreso (0 a 100 en ~2 segundos)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Incrementos aleatorios para dar sensación de carga real
        return Math.min(prev + Math.random() * 15, 100)
      })
    }, 150)

    // 2. Manejo de los mensajes de consola
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, LOADING_MESSAGES.length - 1))
    }, 450)

    // 3. Secuencia de finalización (Fade out + Unmount)
    const totalDuration = 2500 // Tiempo total antes de hacer fade out
    const timeout = setTimeout(() => {
      setIsFadingOut(true)
      // Esperar a que termine la animación CSS de fade out antes de desmontar
      setTimeout(() => {
        onComplete()
      }, 800)
    }, totalDuration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden transition-all duration-800 ease-in-out
        ${isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}
      `}
    >
      {/* ── Background Atmosphere ── */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.05)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sky-500/20 to-transparent" />
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sky-500/20 to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo Container con Glow */}
        <div className="relative w-24 h-24 mb-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-sky-500/20 blur-2xl animate-pulse" />
          {/* Rotating Brackets/Ring */}
          <svg className="absolute inset-0 w-full h-full text-sky-500/30 animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
          
          <img
            src="/logoIEEECSUNI.png"
            alt="IEEE CS UNI Logo"
            className="w-16 h-16 object-contain relative z-10 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Telemetry Output */}
        <div className="w-64 h-6 mb-4 flex items-center justify-center">
          <span className="font-mono text-[9px] text-sky-400 tracking-widest uppercase opacity-80">
            {LOADING_MESSAGES[messageIndex]}
          </span>
        </div>

        {/* Progress Bar Táctica */}
        <div className="w-64">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-[8px] text-gray-500 tracking-widest">SYS.BOOT</span>
            <span className="font-mono text-[8px] text-sky-500 tracking-widest">{Math.round(progress)}%</span>
          </div>
          
          <div className="h-[2px] w-full bg-white/[0.05] overflow-hidden">
            <div
              className="h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-2 bg-sky-400 blur-[2px] animate-[scan_3s_ease-in-out_infinite]" />
      </div>

    </div>
  )
}
