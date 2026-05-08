import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { team } from '../data'
import { MemberCard } from '../components/ui/MemberCard'
import { EngineeringButton } from '../components/ui/EngineeringButton'
import { AtmosphereTag } from '../components/ui/AtmosphereTag'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Activity, Shield, Users, Network, Terminal, Database, ArrowUpRight, Cpu, Crosshair } from 'lucide-react'

function DivisionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 pb-12 border-b border-white/5">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Icon className="w-5 h-5 text-blue-500/40" />
          <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-blue-500/60 uppercase font-bold">System Division</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold tracking-tighter leading-[0.95] text-white">
          {title}
        </h2>
      </div>
      <p className="text-white/30 text-[12px] font-ibm-plex tracking-[0.3em] uppercase font-bold border-l border-white/10 pl-6 max-w-sm">
        {subtitle}
      </p>
    </div>
  )
}

export default function EquipoPage() {
  useScrollReveal()
  const coreInfrastructure = team.slice(0, 4)
  const operationsLogistics = team.slice(4)

  return (
    <main className="bg-black text-white min-h-screen selection:bg-blue-600/30 overflow-hidden font-inter">
      
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative pt-48 pb-32 px-6 md:px-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#02040a]" />
          <div className="absolute inset-0 bg-grid-animated opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_70%)]" />
          
          {/* Animated node graph */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 400 600">
              <motion.path 
                d="M50,500 L150,300 L300,400 L350,150" 
                stroke="white" 
                strokeWidth="0.5" 
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <circle cx="150" cy="300" r="2" fill="#3b82f6" />
              <circle cx="300" cy="400" r="2" fill="#3b82f6" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="max-w-4xl">
            <AtmosphereTag className="mb-12">Human Capital & Technical Leadership</AtmosphereTag>
            <h1 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,10rem)] leading-[0.85] tracking-tight uppercase text-white mb-12">
              Nuestro<br /><span className="text-blue-600">Equipo.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-inter max-w-3xl mb-16">
              Una fuerza distribuida de estudiantes e ingenieros en formación. Estructuramos misiones de investigación tecnológica, desarrollo de sistemas y ciberseguridad avanzada.
            </p>
            
            <div className="flex flex-wrap gap-12 border border-white/10 bg-white/[0.01] px-10 py-6 backdrop-blur-xl inline-flex">
              <div className="flex items-center gap-6">
                <Users size={20} className="text-blue-500/40" />
                <div className="flex flex-col">
                  <span className="font-ibm-plex text-[9px] tracking-[0.2em] text-white/30 uppercase font-bold">Miembros Activos</span>
                  <span className="font-space-grotesk text-2xl font-bold text-white">{team.length} INGENIEROS</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <Network size={20} className="text-blue-500/40" />
                <div className="flex flex-col">
                  <span className="font-ibm-plex text-[9px] tracking-[0.2em] text-white/30 uppercase font-bold">Áreas Técnicas</span>
                  <span className="font-space-grotesk text-2xl font-bold text-white">MULTI-NODE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ LEADERSHIP ══════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-[1700px] mx-auto">
          <DivisionHeader 
            title={<>Directiva y <span className="text-blue-600">Liderazgo.</span></>}
            subtitle="LEADERSHIP_BOARD // MESA_DIRECTIVA"
            icon={Shield}
          />
          <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {coreInfrastructure.map((m, i) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPERATIONS ══════════════════════════════════════════ */}
      {operationsLogistics.length > 0 && (
        <section className="py-48 px-6 md:px-24 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-[1700px] mx-auto">
            <DivisionHeader 
              title={<>Equipos de <span className="text-blue-600">Trabajo.</span></>}
              subtitle="TECHNICAL_UNITS // OPERATIONS"
              icon={Activity}
            />
            <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
              {operationsLogistics.map((m, i) => (
                <MemberCard key={m.name} member={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ ADVISORY ═══════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-24 items-center">
          <div>
            <AtmosphereTag className="mb-12">Protocolo de Asesoría Académica</AtmosphereTag>
            <h2 className="text-5xl md:text-7xl font-space-grotesk font-bold text-white mb-10 tracking-tighter leading-[0.95]">
              Mentoría y<br /><span className="text-blue-600">Asesoría.</span>
            </h2>
            <p className="text-xl text-white/40 leading-relaxed font-inter mb-12 max-w-3xl">
              La arquitectura del ecosistema requiere validación. Buscamos académicos e investigadores dispuestos a fungir como nodos asesores, proveyendo respaldo institucional y guía en investigaciones de alto impacto técnico.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
               <div className="p-8 border border-white/10 bg-white/[0.02] flex items-start gap-6 group hover:border-blue-500/20 transition-all duration-500">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center bg-black group-hover:border-blue-500/40 transition-all">
                    <Shield size={18} className="text-white/20 group-hover:text-blue-400" />
                  </div>
                  <div>
                     <span className="font-ibm-plex text-[10px] tracking-[0.2em] uppercase text-white/60 block mb-2 font-bold text-blue-500/80">Institutional Backing</span>
                     <span className="text-[14px] text-white/30 leading-relaxed">Habilitación de recursos y convenios formales.</span>
                  </div>
               </div>
               <div className="p-8 border border-white/10 bg-white/[0.02] flex items-start gap-6 group hover:border-blue-500/20 transition-all duration-500">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center bg-black group-hover:border-blue-500/40 transition-all">
                    <Database size={18} className="text-white/20 group-hover:text-blue-400" />
                  </div>
                  <div>
                     <span className="font-ibm-plex text-[10px] tracking-[0.2em] uppercase text-white/60 block mb-2 font-bold text-blue-500/80">Research Guidance</span>
                     <span className="text-[14px] text-white/30 leading-relaxed">Mentoría técnica en papers y sistemas avanzados.</span>
                  </div>
               </div>
            </div>

            <EngineeringButton to="/contacto">Contactar para Mentoría</EngineeringButton>
          </div>

          <div className="relative aspect-square border border-white/10 bg-black overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="w-64 h-64 border border-dashed border-blue-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-40 h-40 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            <div className="absolute w-20 h-20 bg-blue-500/10 blur-[40px] rounded-full animate-pulse" />
            
            <div className="absolute bottom-10 right-10 font-ibm-plex text-[9px] text-white/10 tracking-[0.3em] text-right font-bold uppercase">
              BÚSQUEDA_DE_NODOS_ASESORES<br />
              ESTÁNDARES_IEEE_UNI
            </div>
            <Crosshair size={32} className="text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
          </div>
        </div>
      </section>

      {/* ══ RECRUITMENT ═════════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24 bg-white/[0.01] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <Cpu className="w-10 h-10 text-blue-500/40 mb-10" />
          <AtmosphereTag className="mb-12 justify-center">Únete a la Sociedad</AtmosphereTag>
          <h2 className="text-5xl md:text-7xl font-space-grotesk font-bold text-white mb-10 tracking-tighter leading-[0.95]">
            Expande el<br /><span className="text-blue-600">Sistema.</span>
          </h2>
          <p className="text-xl text-white/40 leading-relaxed font-inter mb-16 max-w-2xl">
            Buscamos ingenieros en formación para escalar nuestros proyectos. Si te apasiona la tecnología, la investigación o la gestión de comunidades técnicas, hay un lugar para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <EngineeringButton to="/contacto">Postular como Miembro</EngineeringButton>
            <EngineeringButton to="/proyectos" secondary>Explorar Proyectos</EngineeringButton>
          </div>
        </div>
      </section>

    </main>
  )
}