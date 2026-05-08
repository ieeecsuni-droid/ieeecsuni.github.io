import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

export function ChapterStat({ value, label, suffix = "", delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const spring = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  })
  
  const displayValue = useTransform(spring, (current) => Math.floor(current))

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        spring.set(value)
      }, delay * 1000)
    }
  }, [isInView, value, spring, delay])

  return (
    <div ref={ref} className="flex flex-col items-center lg:items-start group">
      <div className="flex items-baseline gap-1">
        <motion.span className="text-4xl md:text-6xl font-space-grotesk font-bold text-white tracking-tighter">
          {displayValue}
        </motion.span>
        <span className="text-xl md:text-2xl font-space-grotesk font-bold text-blue-500/80">{suffix}</span>
      </div>
      <div className="w-8 h-px bg-blue-500/30 my-4 group-hover:w-full transition-all duration-700" />
      <span className="font-ibm-plex text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold">
        {label}
      </span>
    </div>
  )
}
