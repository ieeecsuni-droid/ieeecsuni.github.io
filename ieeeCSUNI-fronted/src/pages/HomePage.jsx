import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  ArrowUpRight,
  Activity,
  Layers,
  ChevronRight,
  Crosshair,
  Code2,
  Terminal,
  Cpu,
  Globe,
  Database,
  Users,
  Network,
  Zap,
  Star,
  ExternalLink,
  BookOpen,
  Award,
  Calendar
} from 'lucide-react'

import { EngineeringButton } from '../components/ui/EngineeringButton'
import { AtmosphereTag } from '../components/ui/AtmosphereTag'
import { ChapterStat } from '../components/ui/ChapterStat'
import { ImpactDashboard } from '../components/ui/ImpactDashboard'
import { projects, events } from '../data'

// ─── Assets ────────────────────────────────────────────────────────
const VIDEO_HERO = '/homepage.vid.mp4'
const F1 = '/F1.png'
const F2 = '/F2.png'
const F3 = '/F3.png'
const F4 = '/F4.png'

// ─── Components ───────────────────────────────────────────────────

const FeatureCard = ({ title, description, icon: Icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="group relative p-8 border border-white/5 bg-white/[0.01] hover:bg-blue-600/[0.02] transition-all duration-700 overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="relative z-10">
      <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-8 group-hover:border-blue-500/40 transition-all">
        <Icon size={20} className="text-white/40 group-hover:text-blue-400" />
      </div>
      <h3 className="text-2xl font-space-grotesk font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-[14px] text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">
        {description}
      </p>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/30 transition-all duration-700" />
  </motion.div>
)

const EventCardLarge = ({ event }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden"
  >
    <div className="relative aspect-video lg:aspect-auto overflow-hidden bg-[#050816]">
      {event.image ? (
        <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
      ) : (
        <div className="w-full h-full flex items-center justify-center opacity-20">
          <Calendar size={80} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
      <div className="absolute top-6 left-6">
        <div className="px-3 py-1 border border-blue-500/40 bg-blue-500/10 backdrop-blur-md">
          <span className="font-space-grotesk text-[10px] font-bold text-blue-400 uppercase tracking-widest">PROXIMO_EVENTO</span>
        </div>
      </div>
    </div>
    <div className="p-10 lg:p-16 flex flex-col justify-center bg-black">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex flex-col">
          <span className="font-ibm-plex text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">FECHA</span>
          <span className="text-xl font-space-grotesk font-bold text-white">{event.date}</span>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div className="flex flex-col">
          <span className="font-ibm-plex text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">LUGAR</span>
          <span className="text-xl font-space-grotesk font-bold text-white">{event.location}</span>
        </div>
      </div>
      <h3 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-white mb-8 tracking-tighter leading-none">
        {event.title}
      </h3>
      <p className="text-lg text-white/40 mb-12 max-w-xl">
        {event.description}
      </p>
      <EngineeringButton to="/eventos">Registrar Participación</EngineeringButton>
    </div>
  </motion.div>
)

const ProjectItem = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group flex flex-col p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all"
  >
    <div className="flex items-start justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black">
          <IconSelector type={project.category} />
        </div>
        <span className="font-ibm-plex text-[10px] text-blue-500/60 uppercase tracking-[0.2em] font-bold">{project.category}</span>
      </div>
      <div className="flex items-center gap-4">
        <ExternalLink size={14} className="text-white/20 group-hover:text-white transition-colors" />
      </div>
    </div>
    <h4 className="text-xl font-space-grotesk font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h4>
    <p className="text-[13px] text-white/30 leading-relaxed mb-8 flex-1">{project.description}</p>
    <div className="flex flex-wrap gap-2">
      {project.tags.map(tag => (
        <span key={tag} className="px-2 py-0.5 border border-white/5 bg-white/[0.02] font-mono text-[9px] text-white/40 uppercase">{tag}</span>
      ))}
    </div>
  </motion.div>
)

const IconSelector = ({ type }) => {
  if (type?.toLowerCase().includes('web')) return <Globe size={14} className="text-blue-500/60" />
  if (type?.toLowerCase().includes('security')) return <Shield size={14} className="text-blue-500/60" />
  if (type?.toLowerCase().includes('ai')) return <Cpu size={14} className="text-blue-500/60" />
  return <Terminal size={14} className="text-blue-500/60" />
}

// ─── Main Content ────────────────────────────────────────────────

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale contrast-125"
        >
          <source src={VIDEO_HERO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]" />
        <div className="absolute inset-0 bg-grid-animated opacity-5" />
      </div>

      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-24 lg:px-40">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <AtmosphereTag className="mb-12">IEEE Computer Society Chapter UNI</AtmosphereTag>
            <h1 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,10rem)] leading-[0.85] tracking-tight uppercase text-white mb-12">
              Building the Future<br />of <span className="text-blue-600">Computing.</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/60 leading-relaxed font-inter max-w-3xl mb-16">
              Comunidad de ingeniería, investigación y sistemas inteligentes en la Universidad Nacional de Ingeniería. Desde Lima para el mundo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <EngineeringButton to="/contacto">Join IEEE CS UNI</EngineeringButton>
              <EngineeringButton to="/eventos" secondary>View Upcoming Events</EngineeringButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Stats Floating */}
      <div className="absolute bottom-20 right-6 md:right-24 lg:right-40 hidden md:block">
        <div className="flex items-center gap-16 border border-white/10 bg-white/[0.01] backdrop-blur-xl px-12 py-8">
          <div className="flex flex-col">
            <span className="font-ibm-plex text-[9px] tracking-[0.3em] text-white/20 uppercase font-bold mb-2">Miembros Activos</span>
            <span className="text-2xl font-space-grotesk font-bold text-white tracking-tighter">120+</span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex flex-col">
            <span className="font-ibm-plex text-[9px] tracking-[0.3em] text-white/20 uppercase font-bold mb-2">Impacto Real</span>
            <span className="text-2xl font-space-grotesk font-bold text-white tracking-tighter">3° IEEE Xtreme</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const AboutSection = () => {
  const features = [
    { title: 'Innovation', description: 'Desarrollamos soluciones tecnológicas reales que impactan en el ecosistema universitario y nacional.', icon: Zap },
    { title: 'Research', description: 'Investigamos en áreas de vanguardia como Inteligencia Artificial, Ciberseguridad y Sistemas Distribuidos.', icon: BookOpen },
    { title: 'Leadership', description: 'Formamos los próximos líderes de la industria tecnológica a través de gestión de proyectos reales.', icon: Award },
  ]

  return (
    <section className="relative py-48 px-6 md:px-24 lg:px-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={F1} alt="" className="w-full h-full object-cover grayscale opacity-5 brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
      <div className="relative z-10 max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const EventsSection = () => {
  const featuredEvent = events.find(e => e.featured) || events[0]

  return (
    <section className="relative py-48 px-6 md:px-24 lg:px-40 bg-white/[0.01] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={F2} alt="" className="w-full h-full object-cover grayscale opacity-5 brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>
      <div className="relative z-10 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div>
            <AtmosphereTag className="mb-10">Actividades y Capacitación</AtmosphereTag>
            <h2 className="text-5xl md:text-8xl font-space-grotesk font-bold text-white tracking-tighter leading-none uppercase">
              Próximos <span className="text-blue-600">Eventos.</span>
            </h2>
          </div>
          <EngineeringButton to="/eventos" secondary>Ver Todos los Eventos</EngineeringButton>
        </div>

        {featuredEvent && <EventCardLarge event={featuredEvent} />}
      </div>
    </section>
  )
}

const ProjectsSection = () => {
  return (
    <section className="relative py-48 px-6 md:px-24 lg:px-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={F3} alt="" className="w-full h-full object-cover grayscale opacity-5 brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
      <div className="relative z-10 max-w-[1700px] mx-auto">
        <div className="max-w-3xl mb-32">
          <AtmosphereTag className="mb-10">Research & Development</AtmosphereTag>
          <h2 className="text-5xl md:text-8xl font-space-grotesk font-bold text-white tracking-tighter leading-none uppercase mb-12">
            Iniciativas y <span className="text-blue-600">Proyectos.</span>
          </h2>
          <p className="text-xl text-white/40 leading-relaxed font-inter">
            No solo estudiamos ingeniería. La construimos. Explora nuestras iniciativas de desarrollo y repositorios técnicos oficiales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {projects.map((p, i) => (
            <ProjectItem key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const GlobalSection = () => {
  return (
    <section className="py-48 px-6 md:px-24 lg:px-40 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <div>
          <AtmosphereTag className="mb-10">Global Network</AtmosphereTag>
          <h2 className="text-5xl md:text-8xl font-space-grotesk font-bold text-white tracking-tighter leading-[0.85] uppercase mb-12">
            From UNI<br />to the <span className="text-blue-600">World.</span>
          </h2>
          <p className="text-xl text-white/40 leading-relaxed font-inter mb-16">
            Pertenecer a IEEE Computer Society te conecta con una red global de más de 400,000 profesionales. Accede a becas, publicaciones internacionales y networking de élite.
          </p>
          <div className="space-y-6 mb-16">
            {[
              { title: 'International Opportunities', desc: 'Networking con ingenieros de Silicon Valley y Europa.' },
              { title: 'Research Paths', desc: 'Respaldo institucional para publicación de papers.' },
              { title: 'Elite Networking', desc: 'Acceso exclusivo a la biblioteca técnica IEEE Xplore.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 transition-all group-hover:scale-150" />
                <div>
                  <h4 className="text-white font-space-grotesk font-bold mb-1">{item.title}</h4>
                  <p className="text-white/30 text-[13px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <EngineeringButton to="/nosotros" secondary>Explorar Oportunidades</EngineeringButton>
        </div>

        <div className="relative aspect-square border border-white/5 bg-black overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="w-[80%] h-[80%] border border-dashed border-white/10 rounded-full flex items-center justify-center"
          >
            <div className="w-[60%] h-[60%] border border-white/5 rounded-full" />
          </motion.div>
          <div className="absolute flex flex-col items-center">
            <Globe size={48} className="text-blue-500/40 mb-6" />
            <span className="font-space-grotesk font-bold text-white tracking-[0.5em] text-[10px] uppercase">Global_Presence</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const JoinSection = () => {
  return (
    <section className="relative py-64 px-6 md:px-24 lg:px-40 text-center border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={F4} alt="" className="w-full h-full object-cover grayscale opacity-10 brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <AtmosphereTag className="mb-12 justify-center">Protocolo de Integración</AtmosphereTag>
        <h2 className="text-5xl md:text-9xl font-space-grotesk font-bold text-white tracking-tighter leading-[0.8] uppercase mb-12">
          Don’t just study engineering.<br /><span className="text-blue-600">Build it with us.</span>
        </h2>
        <p className="text-xl md:text-3xl text-white/30 font-inter mb-20 max-w-2xl">
          Forma parte de la comunidad técnica más importante de la facultad. Desarrolla proyectos reales, compite y lidera.
        </p>
        <div className="flex flex-col sm:flex-row gap-8">
          <EngineeringButton to="/contacto">Unirme al Capítulo</EngineeringButton>
          <EngineeringButton to="/eventos" secondary>Próximos Workshops</EngineeringButton>
        </div>
      </div>
    </section>
  )
}

// ─── Main Page Export ───────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-black text-white selection:bg-blue-600/30 overflow-hidden font-inter">
      <Hero />
      <AboutSection />
      <ImpactDashboard />
      <EventsSection />
      <ProjectsSection />
      <GlobalSection />
      <JoinSection />
    </main>
  )
}