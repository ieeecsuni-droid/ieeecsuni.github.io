import { Link } from 'react-router-dom'
import { team } from '../data'
import { MemberCard } from '../components/ui/MemberCard'
import { Activity, Shield, Users, Network, Terminal, Database, ArrowUpRight } from 'lucide-react'

// ─── Divisor Arquitectónico ──────────────────────────────────

function DivisionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.04]">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-4 h-4 text-white/30" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">System Division</span>
        </div>
        <h2 
          className="text-3xl md:text-4xl font-light tracking-tight leading-[1.05] text-white/90"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          {title}
        </h2>
      </div>
      <p className="text-white/40 text-[13px] font-mono tracking-widest uppercase border-l border-white/[0.1] pl-4 max-w-xs">
        {subtitle}
      </p>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────

export default function EquipoPage() {
  
  // Dividir al equipo simuladamente en subsistemas para el diseño institucional
  const coreInfrastructure = team.slice(0, 4)
  const operationsLogistics = team.slice(4)

  return (
    <main className="bg-[#050816] text-white min-h-screen overflow-x-hidden">
      
      {/* ══ BACKGROUND TOPOLOGY SYSTEM ════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
          }}
        />
        <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.05),_transparent_60%)] pointer-events-none blur-3xl" />
      </div>

      {/* ── HERO: COLLECTIVE IDENTITY ── */}
      <section className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-20 border-b border-white/[0.04]">
        
        {/* Animated Node Graph Simulation (Background) */}
        <div className="absolute right-0 top-0 w-full h-full max-w-3xl opacity-20 pointer-events-none overflow-hidden z-0 hidden lg:block">
           <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M100,500 L300,300 L600,400 L750,150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
             <path d="M200,100 L300,300 L500,200 L750,150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
             <path d="M300,300 L400,500 L600,400" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
             
             <circle cx="300" cy="300" r="4" fill="#f59e0b" className="animate-pulse" />
             <circle cx="100" cy="500" r="2" fill="#ffffff" />
             <circle cx="600" cy="400" r="3" fill="#8b5cf6" />
             <circle cx="750" cy="150" r="2" fill="#ffffff" />
             <circle cx="200" cy="100" r="2" fill="#ffffff" />
             <circle cx="500" cy="200" r="2" fill="#ffffff" />
             <circle cx="400" cy="500" r="2" fill="#ffffff" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-start relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              Human Capital
            </span>
          </div>

          <h1 
            className="mb-8 text-[clamp(40px,6vw,90px)] font-light tracking-tight leading-[0.95] text-white"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            NUESTRO<br />
            <span className="text-white/30">EQUIPO.</span>
          </h1>

          <p 
            className="max-w-2xl text-[15px] md:text-[17px] text-white/50 leading-relaxed mb-12"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Una fuerza distribuida de estudiantes e ingenieros en formación. Estructuramos misiones de investigación tecnológica, desarrollo de sistemas y ciberseguridad avanzada.
          </p>

          <div className="flex flex-wrap items-center gap-6 border border-white/[0.04] bg-[#ffffff01] px-6 py-4">
            <div className="flex items-center gap-4 pr-6 border-r border-white/[0.08]">
              <Network className="w-4 h-4 text-amber-500" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">Miembros Activos</span>
                <span className="font-mono text-[12px] text-white/80">{team.length} INGENIEROS</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Database className="w-4 h-4 text-violet-500" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">Architecture</span>
                <span className="font-mono text-[12px] text-white/80">MULTI-ÁREA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE INFRASTRUCTURE (Directiva Principal) ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <DivisionHeader 
            title={<>Directiva y <span className="text-white/30">Liderazgo.</span></>}
            subtitle="LEADERSHIP BOARD // MESA DIRECTIVA"
            icon={Shield}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreInfrastructure.map((m, i) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGISTICS & OPERATIONS (Resto del equipo) ── */}
      {operationsLogistics.length > 0 && (
        <section className="relative z-10 py-16 px-6 md:px-12 lg:px-20 bg-[#ffffff01] border-y border-white/[0.04]">
          <div className="max-w-7xl mx-auto">
            <DivisionHeader 
              title={<>Equipos de <span className="text-white/30">Trabajo.</span></>}
              subtitle="ÁREAS TÉCNICAS // OPERACIONES"
              icon={Activity}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {operationsLogistics.map((m, i) => (
                <MemberCard key={m.name} member={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ADVISORY PROTOCOL (Mentores) ── */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-violet-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                Respaldo Académico
              </span>
            </div>
            
            <h2 
              className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05] text-white/90 mb-8"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Mentoría y <br /><span className="text-white/30">Asesoría.</span>
            </h2>
            
            <p className="text-white/40 text-[14px] leading-relaxed mb-10" style={{ fontFamily: '"Inter", sans-serif' }}>
              La arquitectura del ecosistema requiere validación. Buscamos académicos e investigadores dispuestos a fungir como nodos asesores, proveyendo respaldo institucional y guía en investigaciones de alto impacto.
            </p>

            <div className="flex flex-col gap-4 mb-10">
               <div className="p-4 border border-white/[0.06] bg-[#ffffff01] flex items-start gap-4">
                  <div className="p-2 border border-white/[0.04] bg-[#030408]"><Shield className="w-4 h-4 text-white/40" /></div>
                  <div>
                     <span className="font-mono text-[10px] tracking-widest uppercase text-white/70 block mb-1">Institutional Backing</span>
                     <span className="text-[12px] text-white/30">Habilitación de recursos y convenios formales.</span>
                  </div>
               </div>
               <div className="p-4 border border-white/[0.06] bg-[#ffffff01] flex items-start gap-4">
                  <div className="p-2 border border-white/[0.04] bg-[#030408]"><Database className="w-4 h-4 text-white/40" /></div>
                  <div>
                     <span className="font-mono text-[10px] tracking-widest uppercase text-white/70 block mb-1">Research Guidance</span>
                     <span className="text-[12px] text-white/30">Mentoría técnica en papers y sistemas avanzados.</span>
                  </div>
               </div>
            </div>

            <Link 
              to="/contacto"
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex items-center gap-3 px-6 py-3 border border-white/[0.1] bg-white/[0.02] hover:bg-white hover:text-[#050816] text-[10px] font-mono tracking-widest uppercase text-white transition-all duration-300"
            >
              Contactar para Mentoría <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Abstract Interface Graphic */}
          <div className="relative aspect-square border border-white/[0.04] bg-[#030408] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:10px_10px] opacity-[0.03]" />
            <div className="w-48 h-48 border border-dashed border-violet-500/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-32 h-32 border border-white/[0.05] rounded-full animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute w-16 h-16 bg-violet-500/10 blur-[20px] rounded-full animate-pulse" />
            
            <div className="absolute bottom-6 right-6 font-mono text-[8px] text-white/20 tracking-[0.2em] text-right">
              BÚSQUEDA DE ASESORES<br />
              COMUNIDAD IEEE UNI
            </div>
          </div>
        </div>
      </section>

      {/* ── RECRUITMENT NODE (Únete a la directiva) ── */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-20 bg-[#ffffff01] border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <Terminal className="w-6 h-6 text-amber-500/50 mb-6" />
          
          <h2 
            className="text-3xl md:text-5xl font-light tracking-tight leading-[1.05] text-white/90 mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Únete a la <span className="text-white/30">Sociedad.</span>
          </h2>
          
          <p className="text-white/40 text-[14px] leading-relaxed mb-12 max-w-xl" style={{ fontFamily: '"Inter", sans-serif' }}>
            Buscamos ingenieros en formación para escalar nuestros proyectos. Si te apasiona la tecnología, la investigación o la gestión logística, hay un lugar para ti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to="/contacto"
              onClick={() => window.scrollTo(0, 0)} 
              className="inline-flex justify-center items-center px-8 py-3.5 bg-amber-500 text-[#050816] font-mono text-[10px] tracking-widest uppercase hover:bg-amber-400 transition-colors"
            >
              POSTULAR COMO MIEMBRO
            </Link>
            <Link 
              to="/proyectos"
              onClick={() => window.scrollTo(0, 0)} 
              className="inline-flex justify-center items-center px-8 py-3.5 border border-white/[0.1] bg-[#030408] text-white/60 font-mono text-[10px] tracking-widest uppercase hover:border-white/[0.2] hover:text-white transition-all"
            >
              VER PROYECTOS
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}