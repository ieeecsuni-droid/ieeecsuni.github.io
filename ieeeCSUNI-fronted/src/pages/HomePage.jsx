import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import JuntaDirectiva from '../../public/JuntaDirectiva.jpg'
import MascotaImg from '../../public/mascotaWhere.png'
import { 
  Terminal, 
  Code2, 
  Target, 
  Eye, 
  Cpu,
  ArrowRight,
  Network,
  ArrowUpRight
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────
const heroStats = [
  { number: '50', suffix: '+', label: 'Active Members' },
  { number: '12', suffix: '+', label: 'Core Projects' },
  { number: '1',  suffix: '°', label: 'Years of History' },
  { number: '12', suffix: 'k', label: 'Global Network' },
]

const specializations = [
  {
    icon: Code2,
    tag: 'SWE',
    title: 'Software Engineering',
    desc: 'Arquitectura de sistemas distribuidos, desarrollo backend de alto rendimiento y frameworks de producción.',
  },
  {
    icon: Cpu,
    tag: 'HW',
    title: 'Hardware & Embedded',
    desc: 'Sistemas en tiempo real, microcontroladores, robótica de bajo nivel y diseño electrónico.',
  },
  {
    icon: Terminal,
    tag: 'CP',
    title: 'Competitive Programming',
    desc: 'Algoritmos avanzados, estructuras de datos y entrenamiento riguroso para competencias ICPC.',
  },
  {
    icon: Network,
    tag: 'NET',
    title: 'Networking & Sec',
    desc: 'Infraestructura de redes, enrutamiento avanzado y fundamentos de ciberseguridad ofensiva.',
  },
]

// ─── Helper Components ───────────────────────────────────────────
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

function SectionTitle({ children, className = '' }) {
  return (
    <h2 
      className={`font-light tracking-tight leading-[1.05] text-white ${className}`}
      style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}
    >
      {children}
    </h2>
  )
}

function SpecCard({ icon: Icon, tag, title, desc, index }) {
  return (
    <div className="group relative p-8 rounded bg-white/[0.02] border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.08]">
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex items-start justify-between mb-8">
        <div className="w-12 h-12 rounded bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:border-blue-500/20 group-hover:bg-blue-500/[0.05] transition-all duration-500">
          <Icon className="w-5 h-5 text-white/50 group-hover:text-blue-400 transition-colors duration-500" strokeWidth={1.5} />
        </div>
        <span 
          className="text-[10px] tracking-[0.2em] text-white/20 font-mono"
        >
          [{String(index + 1).padStart(2, '0')}]
        </span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-blue-400/60 transition-colors" />
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{tag}</span>
        </div>
        <h4 
          className="text-lg font-medium text-white/90 mb-3"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          {title}
        </h4>
        <p 
          className="text-[13px] text-white/50 leading-relaxed"
          style={{ fontFamily: '"Inter", "Satoshi", sans-serif' }}
        >
          {desc}
        </p>
      </div>
    </div>
  )
}

function CodeLine({ num, tokens }) {
  return (
    <div className="flex gap-6 leading-relaxed">
      <span className="text-white/20 select-none w-4 text-right flex-shrink-0 text-[11px] pt-[2px]">{num}</span>
      <span className="text-[13px]">
        {tokens.map((token, i) => (
          <span key={i} className={token.c}>{token.t}</span>
        ))}
      </span>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────

export default function HomePage() {
  useScrollReveal()

  return (
    <main className="bg-[#050816] min-h-screen text-white selection:bg-amber-500/30 selection:text-white overflow-hidden">
      
      {/* Global CSS Definitions for background animations */}
      <style>{`
        @keyframes gridPan {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .bg-grid-animated {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPan 10s linear infinite;
        }
      `}</style>

      {/* ══════════════════════════════════════════════
          HERO SECTION (Systems Observatory)
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 lg:px-24 pt-32 pb-12 overflow-hidden">
        
        {/* Environmental Depth Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-animated opacity-[0.05]" />
          <div className="absolute top-0 right-0 w-full h-full mesh-bg opacity-10" />
          
          {/* Central Focus Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(59,130,246,0.03),_transparent_70%)]" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Side: Massive Title Focus */}
          <div className="reveal flex-1 space-y-12 text-center lg:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <span className="w-8 h-px bg-blue-500/30" />
                <span className="technical-label text-blue-400/60 font-medium">IEEE COMPUTER SOCIETY // CAPÍTULO UNI</span>
              </div>
              
              <h1 
                className="text-[clamp(80px,15vw,220px)] font-extralight tracking-[-0.07em] leading-[0.8] text-white"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                IEEE<br />
                <span className="opacity-10">CS</span><br />
                <span className="text-[#8B1D1D] drop-shadow-[0_0_30px_rgba(139,29,29,0.15)]">UNI</span>
              </h1>
            </div>

            <p 
              className="max-w-lg text-[16px] md:text-[18px] text-white/30 leading-relaxed font-light mx-auto lg:mx-0"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Investigamos, construimos y operamos la próxima generación de infraestructura digital bajo estándares globales de ingeniería.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6">
              <Link
                to="/contacto"
                className="group relative px-12 py-6 bg-white/95 text-[#050816] text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ease-out hover:bg-white hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10">Unirse al capítulo</span>
              </Link>
              
              <Link
                to="/proyectos"
                className="group flex items-center gap-4 text-white/40 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-500 hover:text-white"
              >
                <span>Proyectos Core</span>
                <ArrowUpRight className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Right Side: Deconstructed Architectural Panels (Echoing the Title) */}
          <div className="reveal flex-1 w-full relative group">
            <div className="relative h-[500px] lg:h-[600px] flex gap-4 items-center justify-center">
              
              {/* Slice 1: Deep Background Offset */}
              <div className="flex-1 h-[80%] rounded-sm overflow-hidden border border-white/5 relative group/slice transition-all duration-700 hover:h-[85%] hover:border-white/10">
                <img
                  src={JuntaDirectiva}
                  alt=""
                  className="absolute inset-0 w-[300%] max-w-none h-full object-cover grayscale contrast-[1.2] brightness-[0.5] transition-transform duration-1000 group-hover/slice:scale-105"
                  style={{ left: '0%' }}
                />
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
                <div className="absolute bottom-4 left-4 technical-label text-[7px] opacity-20">PANEL_L // 01</div>
              </div>

              {/* Slice 2: Central Staggered Focus */}
              <div className="flex-1 h-[95%] rounded-sm overflow-hidden border border-white/10 relative group/slice transition-all duration-700 -translate-y-8 hover:h-[100%] hover:border-white/20 z-10 shadow-2xl">
                <img
                  src={JuntaDirectiva}
                  alt=""
                  className="absolute inset-0 w-[300%] max-w-none h-full object-cover grayscale contrast-[1.3] brightness-[0.6] transition-transform duration-1000 group-hover/slice:scale-105"
                  style={{ left: '-100%' }}
                />
                {/* Scanning line effect only on the central slice */}
                <div className="absolute top-0 left-0 w-full h-px bg-blue-500/40 animate-[scanline_6s_linear_infinite] z-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-40" />
                <div className="absolute bottom-6 left-4 technical-label text-[7px] opacity-40">CORE_SYNC // 02</div>
              </div>

              {/* Slice 3: Outer Offset */}
              <div className="flex-1 h-[75%] rounded-sm overflow-hidden border border-white/5 relative group/slice transition-all duration-700 translate-y-12 hover:h-[80%] hover:border-white/10">
                <img
                  src={JuntaDirectiva}
                  alt=""
                  className="absolute inset-0 w-[300%] max-w-none h-full object-cover grayscale contrast-[1.2] brightness-[0.4] transition-transform duration-1000 group-hover/slice:scale-105"
                  style={{ left: '-200%' }}
                />
                <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
                <div className="absolute top-4 right-4 technical-label text-[7px] opacity-20 text-right">PANEL_R // 03</div>
              </div>

              {/* Architectural Connector Lines */}
              <div className="absolute -left-12 top-1/2 w-24 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="absolute -right-12 top-1/3 w-24 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            {/* Sub-telemetry block below the panels */}
            <div className="mt-12 flex justify-between items-end border-t border-white/[0.04] pt-6 max-w-md ml-auto">
              <div className="flex gap-8">
                <div>
                  <span className="technical-label block mb-1 text-[8px] opacity-30">IMG_PROCESSING</span>
                  <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">STAGGERED_SLICE_V1</span>
                </div>
                <div>
                  <span className="technical-label block mb-1 text-[8px] opacity-30">NODES</span>
                  <div className="flex gap-1 mt-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1 bg-blue-500/30" />
                    ))}
                  </div>
                </div>
              </div>
              <span className="technical-label text-[9px] text-blue-400/30 tracking-[0.3em]">LIMA_UNI_2025</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS BAR (Strict Rigor)
      ══════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04] md:divide-y-0 divide-y">
            {heroStats.map((stat, i) => (
              <div key={i} className={`py-12 md:py-16 ${i % 2 !== 0 ? 'pl-8 md:pl-12' : 'pr-8 md:pr-12'}`}>
                <div 
                  className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/90 mb-2"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {stat.number}<span className="text-blue-400/70 text-[0.6em] ml-1">{stat.suffix}</span>
                </div>
                <div className="font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MISSION & VISION (Editorial)
      ══════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 px-6 md:px-12 lg:px-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-white/[0.08] to-transparent" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          <div className="reveal">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase block mb-6 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-white/20" />
              Core Directives
            </span>
            <SectionTitle className="text-4xl md:text-5xl lg:text-6xl mb-8">
              Arquitectos<br />
              del Futuro<br />
              <span className="text-white/30 italic">Técnico.</span>
            </SectionTitle>
            <p className="text-white/50 text-[15px] leading-relaxed max-w-md" style={{ fontFamily: '"Inter", sans-serif' }}>
              Nos alejamos de la teoría vacía. Somos un colectivo de ingenieros enfocados en la construcción de infraestructura digital, la seguridad de sistemas y el despliegue de soluciones tangibles que impactan la industria local y global.
            </p>
          </div>

          <div className="reveal reveal-delay-1 space-y-4 pt-0 lg:pt-16">
            {[
              { icon: Target, title: 'Misión', desc: 'Fomentar la excelencia técnica mediante investigación rigurosa, desarrollo intensivo y liderazgo pragmático.' },
              { icon: Eye, title: 'Visión', desc: 'Ser la plataforma de innovación estudiantil más avanzada de Latinoamérica, forjando talento con estándares globales.' }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded bg-[#ffffff02] border border-white/[0.04] flex items-start gap-6 hover:bg-[#ffffff04] hover:border-white/[0.08] transition-colors duration-500">
                <item.icon className="w-5 h-5 text-white/30 group-hover:text-blue-400 transition-colors duration-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-[14px] font-medium text-white/90 mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{item.title}</h4>
                  <p className="text-[13px] text-white/40 leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED OPERATIONS (Horizontal Scroll Carousel)
      ══════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden bg-[#02040a]">
        {/* Decorative background label */}
        <div className="absolute top-10 right-10 pointer-events-none select-none">
          <span className="text-[120px] font-bold text-white/[0.02] leading-none tracking-tighter">OPERATIONS</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-blue-500/60 uppercase block mb-4">Strategic Deployment</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Iniciativas de<br /><span className="text-white/30">alto impacto.</span>
              </h2>
            </div>
            <div className="flex gap-4 mb-2">
              <div className="w-12 h-px bg-white/20 mt-4 hidden md:block" />
              <p className="text-[13px] text-white/40 max-w-xs leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
                Explora nuestras operaciones activas enfocadas en la soberanía tecnológica y el desarrollo de infraestructura crítica.
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="reveal flex overflow-x-auto gap-6 px-6 md:px-12 lg:px-20 pb-12 no-scrollbar cursor-grab active:cursor-grabbing">
          {[
            { tag: 'OPS-01', title: 'Fortaleza Digital', category: 'Security', desc: 'Desarrollo de herramientas de auditoría y hardening para infraestructuras universitarias.' },
            { tag: 'OPS-02', title: 'Nexus Core', category: 'Cloud', desc: 'Implementación de un cluster local de alto rendimiento para entrenamiento de modelos IA.' },
            { tag: 'OPS-03', title: 'Prisma Lab', category: 'Hardware', desc: 'Diseño de arquitecturas abiertas sobre RISC-V para aplicaciones industriales.' },
            { tag: 'OPS-04', title: 'Cibernética UNI', category: 'Research', desc: 'Publicación de papers técnicos sobre optimización de compiladores y sistemas operativos.' },
            { tag: 'OPS-05', title: 'ICPC Sprint', category: 'Training', desc: 'Entrenamiento intensivo de algoritmos para el posicionamiento global de la UNI en competencias.' },
          ].map((op, i) => (
            <div 
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[380px] p-8 bg-white/[0.02] border border-white/[0.06] rounded-sm group hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="px-2 py-1 border border-blue-500/20 bg-blue-500/5 rounded-sm">
                  <span className="font-mono text-[9px] text-blue-400 tracking-widest">{op.tag}</span>
                </div>
                <span className="font-mono text-[9px] text-white/20">/ 2025</span>
              </div>
              
              <div className="mb-8">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] block mb-2">{op.category}</span>
                <h4 className="text-xl font-medium text-white/90 group-hover:text-white transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {op.title}
                </h4>
              </div>

              <p className="text-[13px] text-white/40 leading-relaxed mb-8 min-h-[60px]">
                {op.desc}
              </p>

              <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className={`w-1.5 h-1 ${j <= i % 3 ? 'bg-blue-500/60' : 'bg-white/10'}`} />
                  ))}
                </div>
                <button className="text-[10px] font-mono text-white/20 group-hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                  Ver detalles <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          IMPACT (Editorial Metrics)
      ══════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#0b1120] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase block mb-3">ACTIVE INITIATIVES</span>
              <h2 className="text-3xl md:text-4xl font-light text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Impacto institucional.</h2>
            </div>
            <p className="text-[13px] text-white/40 max-w-xs leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>Capítulo activo desde 2025, con presencia en competencias, laboratorios y comunidad IEEE global.</p>
          </div>
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
            {[
              { value: '50+', label: 'Miembros activos', note: 'Estudiantes seleccionados' },
              { value: '12+', label: 'Proyectos core', note: 'En desarrollo activo' },
              { value: '12k+', label: 'Red global IEEE CS', note: 'Miembros worldwide' },
              { value: '2025', label: 'Año de fundación', note: 'UNI · Lima, Perú' },
            ].map((item, i) => (
              <div key={i} className="p-8 md:p-12 bg-[#ffffff01]">
                <div className="text-4xl md:text-5xl font-light text-white/90 mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{item.value}</div>
                <div className="font-mono text-[9px] tracking-[0.18em] text-white/40 uppercase mb-1">{item.label}</div>
                <div className="text-[11px] text-white/20" style={{ fontFamily: '"Inter", sans-serif' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ECOSYSTEM (Premium Cards)
      ══════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-[#080c18] border-y border-white/[0.04] relative">
        <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(59,130,246,0.03),_transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.04] pb-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4 block">
                Operational Domains
              </span>
              <SectionTitle className="text-4xl md:text-5xl">
                Áreas de<br />
                Investigación
              </SectionTitle>
            </div>
            <Link to="/nosotros" className="group inline-flex items-center gap-2 text-[12px] font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors">
              Explore Structure <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal">
            {specializations.map((item, i) => (
              <SpecCard key={i} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CODENIX (Monolithic Terminal)
      ══════════════════════════════════════════════ */}
      <section className="relative py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="reveal">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-sm border border-white/[0.08] bg-white/[0.02] mb-8">
              <span className="w-2 h-2 bg-[#10b981] animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.15em] text-white/60 uppercase">
                Sub-system: Online
              </span>
            </div>

            <SectionTitle className="text-6xl md:text-7xl lg:text-8xl mb-6">
              CODE<span className="text-white/20">NIX</span>
            </SectionTitle>

            <p className="text-white/50 text-[15px] leading-relaxed mb-10 max-w-md" style={{ fontFamily: '"Inter", sans-serif' }}>
              Nuestra plataforma interna de entrenamiento algorítmico. 
              Un entorno estricto diseñado para elevar la competitividad de nuestros miembros en programación de bajo nivel y resolución de problemas complejos.
            </p>

            <div className="flex flex-wrap gap-2 mb-12">
              {['Dynamic_Programming', 'Graph_Theory', 'Segment_Trees'].map((tag) => (
                <span key={tag} className="font-mono text-[9px] text-white/40 border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-4 max-w-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">BUILD STATUS</span>
                <span className="font-mono text-[10px] text-blue-400/80">IN_PROGRESS</span>
              </div>
              <div className="h-0.5 w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-blue-500/70 w-[45%]" />
              </div>
            </div>
          </div>

          {/* Terminal Block */}
          <div className="reveal reveal-delay-2 relative group">
            {/* Ambient shadow */}
            <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,_rgba(76,29,149,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl pointer-events-none" />

            <div className="relative bg-[#030408] border border-white/[0.06] rounded-md shadow-2xl overflow-hidden">
              {/* Mac-like Header */}
              <div className="flex items-center gap-4 px-4 py-3 border-b border-white/[0.04] bg-white/[0.01]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                  codenix_core.rs
                </span>
              </div>

              {/* Code */}
              <div className="p-6 font-mono text-[13px] space-y-1 bg-transparent">
                <CodeLine num="01" tokens={[{ t: 'use', c: 'text-violet-400' }, { t: ' std::sync::Arc;', c: 'text-white/60' }]} />
                <CodeLine num="02" tokens={[{ t: 'use', c: 'text-violet-400' }, { t: ' uni_cs::talent;', c: 'text-white/60' }]} />
                <CodeLine num="03" tokens={[{ t: '', c: '' }]} />
                <CodeLine num="04" tokens={[
                  { t: 'fn', c: 'text-violet-400' },
                  { t: ' init_sequence', c: 'text-blue-300' },
                  { t: '() -> ', c: 'text-white/60' },
                  { t: 'Result', c: 'text-blue-400' },
                  { t: '<(), Error> {', c: 'text-white/60' },
                ]} />
                <CodeLine num="05" tokens={[
                  { t: '    let', c: 'text-violet-400' },
                  { t: ' cohort', c: 'text-white/80' },
                  { t: ' = talent::', c: 'text-white/60' },
                  { t: 'fetch_elite', c: 'text-blue-300' },
                  { t: '()?;', c: 'text-white/60' },
                ]} />
                <CodeLine num="06" tokens={[{ t: '', c: '' }]} />
                <CodeLine num="07" tokens={[
                  { t: '    while', c: 'text-violet-400' },
                  { t: ' system_active {', c: 'text-white/60' }
                ]} />
                <CodeLine num="08" tokens={[
                  { t: '        codenix::', c: 'text-white/60' },
                  { t: 'push_limits', c: 'text-blue-300' },
                  { t: '(&cohort);', c: 'text-white/60' }
                ]} />
                <CodeLine num="09" tokens={[{ t: '    }', c: 'text-white/60' }]} />
                <CodeLine num="10" tokens={[
                  { t: '    Ok', c: 'text-blue-400' },
                  { t: '(())', c: 'text-white/60' }
                ]} />
                <CodeLine num="11" tokens={[{ t: '}', c: 'text-white/60' }]} />
                
                {/* Prompt Line */}
                <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-3">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-white/30">cargo build --release</span>
                  <span className="w-1.5 h-3 bg-white/50 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MASCOT / CULTURE (Muted presentation)
      ══════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#080c18] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4 block">
              Organizational Culture
            </span>
            <h3 className="text-2xl font-light text-white/90 mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              El Espíritu del Capítulo
            </h3>
            <p className="text-[13px] text-white/40 leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
              Detrás del código hay un equipo humano resiliente. Nuestro fénix representa la reconstrucción técnica, el rigor académico y la voluntad inquebrantable de forjar la mejor organización estudiantil del país.
            </p>
          </div>
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-blue-500/[0.04] blur-2xl rounded-full pointer-events-none" />
            <img
              src={MascotaImg}
              alt="Mascota CS"
              className="relative w-32 h-32 md:w-40 md:h-40 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>
        </div>
      </section>

    </main>
  )
}