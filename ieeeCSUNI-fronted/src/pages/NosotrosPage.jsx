import { useScrollReveal } from '../hooks/useScrollReveal'
import { timeline } from '../data'
import mascotaImg from '../../public/mascotaWhos.png'
import FebreroTime from '../../public/febrero2026.jpg'
import { Target, Cpu, Globe, Terminal, Zap, Users, Lightbulb, ArrowUpRight } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────

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

// ─── UI Components ──────────────────────────────────────────

function Badge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      <span 
        className="text-[10px] uppercase tracking-[0.2em] text-white/60"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {children}
      </span>
    </div>
  )
}

function SectionMeta({ tag, title, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-white/20" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">{tag}</span>
      </div>
      <h2 
        className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05] text-white/90"
        style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}
      >
        {title}
      </h2>
    </div>
  )
}

function PillarCard({ icon: Icon, tag, title, desc, index }) {
  return (
    <div className="group relative flex flex-col p-8 rounded-none border border-white/[0.04] bg-[#ffffff01] hover:bg-[#ffffff03] hover:border-white/[0.1] transition-all duration-500 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/20 transition-all duration-700" />
      
      <div className="flex justify-between items-start mb-8 pb-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-white/30 group-hover:text-blue-400 transition-colors duration-500" strokeWidth={1.5} />
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">{tag}</span>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-white/20">
          [{String(index + 1).padStart(2, '0')}]
        </span>
      </div>

      <h4 
        className="text-[18px] md:text-[20px] font-medium text-white/70 group-hover:text-white/90 mb-3 tracking-tight transition-colors duration-300"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        {title}
      </h4>
      <p 
        className="text-[13px] text-white/40 leading-relaxed"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {desc}
      </p>
    </div>
  )
}

function ValueCard({ icon: Icon, title, desc, index }) {
  return (
    <div className="group relative p-8 border border-white/[0.04] bg-[#ffffff01] hover:bg-[#ffffff03] hover:border-white/[0.1] transition-all duration-500">
      <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/20 transition-all duration-700" />
      
      <div className="mb-6 flex justify-between items-center">
        <div className="w-10 h-10 border border-white/[0.06] bg-white/[0.02] flex items-center justify-center group-hover:border-blue-500/20 group-hover:bg-blue-500/[0.05] transition-all duration-500">
          <Icon className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors duration-500" strokeWidth={1.5} />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-white/20">V.{String(index + 1).padStart(2, '0')}</span>
      </div>
      
      <h4 
        className="text-[16px] font-medium text-white/80 mb-3 tracking-tight group-hover:text-white transition-colors"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        {title}
      </h4>
      <p 
        className="text-[13px] text-white/40 leading-relaxed"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {desc}
      </p>
    </div>
  )
}

function TimelineItem({ item, index, isFeatured, photo }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 md:gap-12 pb-20 group">
      {/* Observability dot */}
      <div className="absolute -left-[37px] top-1.5 w-3 h-3 bg-[#050816] border border-white/20 group-hover:border-blue-500 flex items-center justify-center transition-colors duration-500">
        <div className="w-1 h-1 bg-white/20 group-hover:bg-blue-500 transition-colors duration-500" />
      </div>

      <div className="pt-1">
        <span className="font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase border border-white/[0.08] px-3 py-1 bg-[#ffffff02]">
          [{item.year}]
        </span>
      </div>

      <div>
        <h4 
          className="text-xl md:text-2xl font-light text-white/90 mb-4 tracking-tight"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          {item.title}
        </h4>
        <p 
          className="text-[14px] text-white/50 leading-relaxed max-w-2xl mb-8"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {item.desc}
        </p>

        {isFeatured && photo && (
          <div className="relative w-full max-w-xl aspect-[21/9] bg-[#0a0f1c] border border-white/[0.06] overflow-hidden group/photo">
            {/* Corner framing */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 z-20 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 z-20 pointer-events-none" />
            
            <img
              src={photo}
              alt="Trayectoria IEEE CS UNI"
              className="w-full h-full object-cover grayscale opacity-60 group-hover/photo:grayscale-0 group-hover/photo:opacity-100 transition-all duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 z-20 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
              ARCHIVE_LOG
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────

export default function NosotrosPage() {
  useScrollReveal()

  return (
    <main className="bg-[#050816] text-white min-h-screen selection:bg-amber-500/30 selection:text-white overflow-hidden">

      {/* Background Architectural Blueprint System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
          }}
        />
      </div>

      {/* ══ HERO (Systems Observatory: Command Center) ══════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-20 border-b border-white/[0.08] overflow-hidden">
        
        {/* Deep Environment Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#02040a]" />
          
          {/* Radar Scanning Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-blue-500/[0.03] rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/[0.02] rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Topographical Mesh (Reference from Learnings) */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,29,29,0.03),transparent_50%)]" />
          
          {/* Vertical Architectural Guides */}
          <div className="absolute top-0 bottom-0 left-[10%] w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
          <div className="absolute top-0 bottom-0 right-[10%] w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
        </div>

        <div className="relative w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-32 items-center py-20">
          
          {/* ── Left Content: The Mission Console ── */}
          <div className="reveal space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase border-l border-white/10 pl-4">
                  CORE_PROTOCOL // IDENTITY_MODULE
                </span>
              </div>

              <h1 
                className="mt-6 mb-6 text-[clamp(28px,4.5vw,48px)] font-light tracking-tight leading-[1.1] text-white"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Acerca de<br />
                <span className="text-white/20">nosotros.</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-sm group hover:border-blue-500/20 transition-all duration-500">
                <span className="font-mono text-[9px] text-blue-400 tracking-[0.2em] block mb-3 uppercase">Origin.log</span>
                <p className="text-[14px] text-white/40 leading-relaxed font-light" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Fundado bajo la visión de transformar el rigor académico de la UNI en soberanía tecnológica para el país.
                </p>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-sm group hover:border-blue-500/20 transition-all duration-500">
                <span className="font-mono text-[9px] text-blue-400 tracking-[0.2em] block mb-3 uppercase">Objective.sys</span>
                <p className="text-[14px] text-white/40 leading-relaxed font-light" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Investigar, construir y desplegar sistemas complejos alineados a los estándares de IEEE Computer Society.
                </p>
              </div>
            </div>

            {/* Tactical Metadata Footer */}
            <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-white/[0.04]">
              {[
                { label: 'NODE_ID', value: 'LIMA_0x01' },
                { label: 'STATUS', value: 'ACTIVE_INIT' },
                { label: 'ACCESS', value: 'UNRESTRICTED' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-white/20 tracking-widest uppercase">{stat.label}</span>
                  <span className="font-mono text-[10px] text-white/60 tracking-tighter">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Content: Entity Containment Frame ── */}
          <div className="reveal relative group">
            <div className="relative w-full aspect-square border border-white/[0.08] bg-white/[0.01] overflow-hidden flex items-center justify-center">
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/40" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/10" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/40" />
              
              {/* Scanning Laser Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scanline_6s_linear_infinite] z-20" />
              
              {/* Internal Framing */}
              <div className="absolute inset-6 border border-white/[0.04]" />
              <div className="absolute inset-12 border border-white/[0.02]" />

              {/* The Entity (Mascot) */}
              <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center translate-y-4">
                {/* Glow behind mascot */}
                <div className="absolute inset-0 bg-blue-500/5 blur-[80px] rounded-full scale-110 group-hover:bg-blue-500/10 transition-colors duration-1000" />
                <img
                  src={mascotaImg}
                  alt="Entity Analysis"
                  className="w-full h-full object-contain grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out select-none"
                  draggable={false}
                />
              </div>

              {/* Bottom Telemetry Block */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/[0.06] pt-4 z-20">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[7px] text-white/20 tracking-widest uppercase">Entity_Scanner_v0.2</span>
                  <span className="font-mono text-[9px] text-blue-500/60 font-bold tracking-tight">ANALYZING:PHOENIX_CORE</span>
                </div>
                <div className="flex gap-1.5 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1 bg-white/20" />
                  ))}
                </div>
              </div>
            </div>

            {/* External telemetry strip */}
            <div className="mt-4 flex justify-between items-center px-4 font-mono text-[8px] text-white/10 tracking-[0.3em] uppercase">
              <span>Security_Clearance: Alpha</span>
              <span>Ref: 2025.UNI.CS</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══ MISSION STATEMENT ═════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20 border-y border-white/[0.04] bg-[#ffffff01]">
        <div className="max-w-7xl mx-auto reveal">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-white/20" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              Core Directive
            </span>
          </div>
          <blockquote 
            className="font-light tracking-tight leading-[1.1] text-[clamp(28px,4vw,56px)] max-w-5xl"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            <span className="text-white/50">Empoderamos a los mejores estudiantes de ingeniería con </span>
            <span className="text-white">conocimiento técnico de élite, comunidad global </span>
            <span className="text-white/60 italic font-light">y proyectos que trascienden el aula.</span>
          </blockquote>
        </div>
      </section>

      {/* ══ PILARES ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
            <SectionMeta tag="Structural Pillars" title={<>Lo que nos<br /><span className="text-white/30">define.</span></>} />
            <p 
              className="text-white/40 text-[14px] max-w-sm leading-relaxed md:text-right"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Cuatro ejes operacionales que estructuran nuestra identidad como organización técnica.
            </p>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04]">
            {pillars.map((p, i) => (
              <PillarCard key={p.title} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALORES ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 md:px-12 lg:px-20 bg-[#ffffff01] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <SectionMeta tag="Operating Principles" title={<>Código que<br /><span className="text-white/30">nos guía.</span></>} />
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
            {values.map((v, i) => (
              <ValueCard key={v.title} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ HISTORIA ══════════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="reveal mb-24">
            <SectionMeta tag="System Logs" title={<>Nuestra<br /><span className="text-white/30">Trayectoria.</span></>} />
          </div>

          <div className="relative pl-8 md:pl-10">
            {/* Timeline Vector Line */}
            <div className="absolute left-0 top-3 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.15] via-white/[0.05] to-transparent" />

            {timeline.map((item, i) => (
              <TimelineItem
                key={item.year || i}
                item={item}
                index={i}
                isFeatured={i === 0}
                photo={FebreroTime}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEGITIMIDAD (Telemetry Strip) ═════════════════════ */}
      <section className="relative z-10 border-y border-white/[0.04] bg-[#ffffff01]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="reveal grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04] md:divide-y-0 divide-y">
            {legitimacy.map((item, i) => (
              <div key={item.label} className={`py-12 md:py-16 ${i % 2 !== 0 ? 'pl-8 md:pl-12' : 'pr-8 md:pr-12'}`}>
                <div 
                  className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90 mb-3"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {item.value}
                </div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">
                  {item.label}
                </div>
                <div className="text-[11px] text-white/20" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto reveal flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          
          <div className="max-w-lg">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4 block">
              Initialization
            </span>
            <h3 
              className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1] text-white/90 mb-4"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              ¿Listo para<br />
              <span className="text-white/30">construir con nosotros?</span>
            </h3>
            <p 
              className="text-white/50 text-[14px] leading-relaxed"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Buscamos estudiantes de la UNI con hambre técnica y visión de impacto. 
              Si quieres dejar de ser un usuario para ser un creador, este es el lugar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="/contacto"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#050816] text-[12px] font-semibold tracking-[0.08em] uppercase hover:bg-white/90 transition-all duration-300 overflow-hidden"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span>Unirse al capítulo</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="/proyectos"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/[0.08] text-white/60 text-[12px] font-semibold tracking-[0.08em] uppercase hover:text-white hover:bg-[#ffffff02] hover:border-white/[0.2] transition-all duration-300"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Ver proyectos
            </a>
          </div>

        </div>
      </section>

    </main>
  )
}