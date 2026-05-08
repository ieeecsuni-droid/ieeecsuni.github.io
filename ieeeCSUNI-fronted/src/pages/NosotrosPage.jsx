import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { timeline } from '../data'
import { EngineeringButton } from '../components/ui/EngineeringButton'
import { AtmosphereTag } from '../components/ui/AtmosphereTag'
import mascotaImg from '../../public/mascotaWhos.png'
import FebreroTime from '../../public/febrero2026.jpg'
import { Target, Cpu, Globe, Terminal, Zap, Users, Lightbulb, Crosshair } from 'lucide-react'

const pillars = [
  {
    icon: Target,
    tag: 'VISION',
    title: 'Visión 2026',
    desc: 'Liderar la vanguardia técnica estudiantil en computación a nivel regional.',
  },
  {
    icon: Globe,
    tag: 'NETWORK',
    title: 'Red Global',
    desc: 'Conexión directa con los estándares y profesionales de IEEE Computer Society.',
  },
  {
    icon: Cpu,
    tag: 'R&D',
    title: 'I+D+i UNI',
    desc: 'Investigación aplicada que sale del aula y genera impacto medible.',
  },
  {
    icon: Terminal,
    tag: 'STACK',
    title: 'Full-Stack Mindset',
    desc: 'Dominio técnico desde hardware embebido hasta arquitecturas en la nube.',
  },
]

const values = [
  {
    icon: Zap,
    title: 'Excelencia técnica',
    desc: 'No resolvemos el problema — buscamos la solución más eficiente, elegante y mantenible.',
  },
  {
    icon: Users,
    title: 'Comunidad primero',
    desc: 'El conocimiento individual es limitado. Construimos en equipo y compartimos sin reservas.',
  },
  {
    icon: Lightbulb,
    title: 'Adaptabilidad',
    desc: 'El stack cambia. Los principios sólidos no. Aprendemos rápido y construimos sobre bases.',
  },
]

const legitimacy = [
  { value: 'IEEE', label: 'Organización Madre', note: 'Institute of Electrical and Electronics Engineers' },
  { value: 'UNI', label: 'Casa de Estudios', note: 'Universidad Nacional de Ingeniería — Lima' },
  { value: '12k+', label: 'Comunidad Global', note: 'IEEE Computer Society worldwide members' },
  { value: '2025', label: 'Inicialización', note: 'Capítulo estudiantil activo' },
]

function SectionMeta({ tag, title, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-px bg-blue-500/30" />
        <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-blue-500/60 uppercase font-bold">{tag}</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold tracking-tighter leading-[0.95] text-white">
        {title}
      </h2>
    </div>
  )
}

function PillarCard({ icon: Icon, tag, title, desc, index }) {
  return (
    <div className="group relative flex flex-col p-10 border border-white/[0.04] bg-[#ffffff01] hover:bg-blue-600/[0.02] hover:border-blue-500/20 transition-all duration-700">
      <div className="flex justify-between items-start mb-10 pb-6 border-b border-white/[0.04]">
        <div className="flex items-center gap-4">
          <Icon className="w-5 h-5 text-white/20 group-hover:text-blue-400 transition-colors duration-500" strokeWidth={1.5} />
          <span className="font-ibm-plex text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">{tag}</span>
        </div>
        <span className="font-mono text-[10px] text-white/10">[{String(index + 1).padStart(2, '0')}]</span>
      </div>
      <h4 className="text-2xl font-space-grotesk font-bold text-white/80 group-hover:text-white mb-4 transition-colors">{title}</h4>
      <p className="text-[14px] text-white/40 leading-relaxed font-inter">{desc}</p>
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/0 group-hover:border-blue-500/40 transition-all" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/0 group-hover:border-blue-500/40 transition-all" />
    </div>
  )
}

function ValueCard({ icon: Icon, title, desc, index }) {
  return (
    <div className="group relative p-10 border border-white/[0.04] bg-[#ffffff01] hover:bg-blue-600/[0.02] hover:border-blue-500/20 transition-all duration-700">
      <div className="mb-8 flex justify-between items-center">
        <div className="w-12 h-12 border border-white/[0.06] bg-white/[0.02] flex items-center justify-center group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.05] transition-all duration-700">
          <Icon className="w-5 h-5 text-white/30 group-hover:text-blue-400" strokeWidth={1.5} />
        </div>
        <span className="font-mono text-[10px] text-white/10">V.{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h4 className="text-xl font-space-grotesk font-bold text-white/80 group-hover:text-white mb-4 transition-colors">{title}</h4>
      <p className="text-[14px] text-white/40 leading-relaxed font-inter">{desc}</p>
    </div>
  )
}

function TimelineItem({ item, index, isFeatured, photo }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-16 pb-24 group">
      <div className="absolute -left-[41px] top-2 w-4 h-4 bg-black border border-white/20 group-hover:border-blue-500 flex items-center justify-center transition-colors duration-500 z-10">
        <div className="w-1.5 h-1.5 bg-white/10 group-hover:bg-blue-500 transition-colors duration-500" />
      </div>

      <div className="pt-1">
        <span className="font-mono text-[12px] tracking-[0.2em] text-white/50 uppercase border border-white/[0.08] px-4 py-2 bg-white/[0.02] backdrop-blur-sm">
          {item.year}
        </span>
      </div>

      <div>
        <h4 className="text-2xl md:text-3xl font-space-grotesk font-bold text-white mb-6 tracking-tight">{item.title}</h4>
        <p className="text-[16px] text-white/40 leading-relaxed max-w-2xl font-inter mb-10">{item.desc}</p>

        {isFeatured && photo && (
          <div className="relative w-full max-w-2xl aspect-[21/9] border border-white/[0.08] bg-black overflow-hidden group/photo">
            <img src={photo} alt="" className="w-full h-full object-cover grayscale opacity-40 group-hover/photo:grayscale-0 group-hover/photo:opacity-100 group-hover/photo:scale-105 transition-all duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
          </div>
        )}
      </div>
    </div>
  )
}

export default function NosotrosPage() {
  useScrollReveal()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <main ref={ref} className="bg-black text-white min-h-screen selection:bg-blue-600/30 overflow-hidden font-inter">
      
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-24 pt-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#02040a]" />
          <motion.div style={{ y }} className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-grid-animated opacity-20" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black" />
        </div>

        <div className="relative z-10 w-full max-w-[1700px] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <AtmosphereTag className="mb-12">CORE_PROTOCOL // IDENTITY_MODULE</AtmosphereTag>
            <h1 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,10rem)] leading-[0.85] tracking-tight uppercase text-white mb-12">
              Sobre<br /><span className="text-blue-600">Nosotros.</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mb-12">
              <div className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 transition-all duration-500 group">
                <span className="font-ibm-plex text-[10px] text-blue-500 tracking-[0.3em] block mb-4 uppercase font-bold">Origin.log</span>
                <p className="text-[15px] text-white/40 leading-relaxed font-inter group-hover:text-white/60 transition-colors">
                  Fundado bajo la visión de transformar el rigor académico de la UNI en soberanía tecnológica para el país.
                </p>
              </div>
              <div className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 transition-all duration-500 group">
                <span className="font-ibm-plex text-[10px] text-blue-500 tracking-[0.3em] block mb-4 uppercase font-bold">Objective.sys</span>
                <p className="text-[15px] text-white/40 leading-relaxed font-inter group-hover:text-white/60 transition-colors">
                  Investigar, construir y desplegar sistemas complejos alineados a los estándares de IEEE Computer Society.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative group">
            <div className="aspect-square border border-white/10 bg-white/[0.01] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/40" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-white/40" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
              <img src={mascotaImg} className="w-4/5 h-4/5 object-contain grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-4">
                <div className="flex flex-col">
                  <span className="font-ibm-plex text-[8px] text-white/20 tracking-[0.3em] uppercase">ENTITY_SCANNER_v0.2</span>
                  <span className="font-ibm-plex text-[10px] text-blue-500 font-bold tracking-tight">ANALYZING:PHOENIX_CORE</span>
                </div>
                <Crosshair size={16} className="text-blue-500/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ DIRECTIVE ═════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24 border-b border-white/5 bg-[#ffffff01]">
        <div className="max-w-7xl mx-auto reveal">
          <AtmosphereTag className="mb-16">Core Directive</AtmosphereTag>
          <blockquote className="font-space-grotesk font-bold text-[clamp(1.8rem,5vw,5rem)] leading-[0.95] tracking-tight max-w-6xl">
            <span className="text-white/40">Empoderamos a los mejores estudiantes de ingeniería con </span>
            <span className="text-white">conocimiento técnico de élite, comunidad global </span>
            <span className="text-blue-600">y proyectos que trascienden el aula.</span>
          </blockquote>
        </div>
      </section>

      {/* ══ PILARES ═══════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-[1700px] mx-auto">
          <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
            <SectionMeta tag="Structural Pillars" title={<>Lo que nos<br /><span className="text-blue-600">define.</span></>} />
            <p className="text-white/40 text-lg max-w-md leading-relaxed font-inter lg:text-right">
              Cuatro ejes operacionales que estructuran nuestra identidad como organización técnica universitaria.
            </p>
          </div>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {pillars.map((p, i) => (
              <PillarCard key={p.title} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALORES ═══════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-[1700px] mx-auto">
          <SectionMeta tag="Operating Principles" title={<>Código que<br /><span className="text-blue-600">nos guía.</span></>} className="mb-24" />
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {values.map((v, i) => (
              <ValueCard key={v.title} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ HISTORIA ══════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionMeta tag="System Logs" title={<>Nuestra<br /><span className="text-blue-600">Trayectoria.</span></>} className="mb-32" />
          <div className="relative pl-12 border-l border-white/10">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} isFeatured={i === 0} photo={FebreroTime} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEGITIMIDAD ═══════════════════════════════════════ */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-[1700px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {legitimacy.map((item, i) => (
            <div key={i} className="p-16 flex flex-col">
              <span className="font-space-grotesk text-5xl font-bold text-white mb-4 tracking-tighter">{item.value}</span>
              <span className="font-ibm-plex text-[10px] text-blue-500 tracking-[0.3em] uppercase font-bold mb-2">{item.label}</span>
              <span className="text-xs text-white/20 font-inter">{item.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-7xl mx-auto reveal flex flex-col lg:flex-row items-center justify-between gap-20">
          <div className="max-w-2xl text-center lg:text-left">
            <AtmosphereTag className="mb-10 justify-center lg:justify-start">Initialization</AtmosphereTag>
            <h3 className="font-space-grotesk font-bold text-5xl md:text-7xl text-white mb-8 leading-[0.95]">
              ¿Listo para<br /><span className="text-blue-600">construir con nosotros?</span>
            </h3>
            <p className="text-white/40 text-xl font-inter leading-relaxed">
              Buscamos estudiantes de la UNI con hambre técnica y visión de impacto. Si quieres dejar de ser un usuario para ser un creador, este es el lugar.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8">
            <EngineeringButton to="/contacto">Unirse a la Comunidad</EngineeringButton>
            <EngineeringButton to="/proyectos" secondary>Ver Proyectos</EngineeringButton>
          </div>
        </div>
      </section>

    </main>
  )
}