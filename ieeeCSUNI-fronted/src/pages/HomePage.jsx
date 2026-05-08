import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  Shield,
  ArrowUpRight,
  Crosshair,
} from 'lucide-react'

// ─── Assets ────────────────────────────────────────────────────────
const VIDEO_HERO = '/homepage.vid.mp4'
const F1 = '/F1.png'
const F2 = '/F2.png'
const F3 = '/F3.png'
const F4 = '/F4.png'

// ─── Helper Components ───────────────────────────────────────────

const EngineeringButton = ({ children, to, className = "", secondary = false }) => (
  <Link
    to={to}
    className={`group relative inline-flex items-center gap-4 md:gap-6 px-6 md:px-10 py-3 md:py-4.5 transition-all duration-700 overflow-hidden ${className}`}
  >
    <div className={`absolute inset-0 transition-all duration-700 ${
      secondary
        ? 'bg-transparent border border-white/10 group-hover:border-blue-500/40'
        : 'bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-blue-600/10 group-hover:border-blue-500/50'
    }`} />

    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    <span className="relative z-10 font-space-grotesk font-bold text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-white/70 group-hover:text-white transition-all duration-500 whitespace-nowrap">
      {children}
    </span>

    <div className="relative z-10 flex items-center shrink-0">
      <div className="w-4 md:w-8 h-[1px] bg-white/10 group-hover:bg-blue-400 group-hover:w-8 md:group-hover:w-12 transition-all duration-700" />
      <ArrowUpRight size={12} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
    </div>

    <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/30 group-hover:border-blue-400 transition-all" />
    <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/30 group-hover:border-blue-400 transition-all" />
  </Link>
)

const AtmosphereTag = ({ children, className = "" }) => (
  <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
    <div className="w-6 md:w-12 h-px bg-blue-500/30" />
    <span className="font-ibm-plex text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.6em] text-blue-500/80 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
      {children}
    </span>
    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500/40 animate-pulse" />
  </div>
)

const FloatingHud = ({ title, data, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
    className={`p-6 md:p-10 border border-white/10 bg-black/60 backdrop-blur-3xl rounded-sm relative group overflow-hidden ${className}`}
  >
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <h4 className="font-ibm-plex text-[9px] md:text-[11px] text-white/40 uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold">
          {title}
        </h4>
        <Crosshair size={12} className="text-blue-500/40" />
      </div>

      <div className="space-y-4 md:space-y-6">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center border-b border-white/[0.03] pb-3 md:pb-4 last:border-0">
            <span className="font-ibm-plex text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.1em] md:tracking-[0.2em]">
              {item.label}
            </span>
            <span className="font-mono text-[10px] md:text-[12px] text-white/70 text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)

const ChapterSection = ({ children, src, alt, coordinate }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative min-h-[80vh] md:min-h-screen flex items-center bg-black overflow-hidden py-48 md:py-64 scroll-mt-24">
      <motion.div style={{ opacity }} className="absolute inset-0 z-0">
        <motion.img
          style={{ y }}
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-[140%] object-cover brightness-[0.5] contrast-[1.15]"
        />

        <div className="absolute inset-0 bg-blue-900/10 mix-blend-screen opacity-40 md:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_black_98%)]" />

        <div className="absolute inset-6 md:inset-20 border border-white/5 pointer-events-none">
          <div className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-[5px] md:text-[7px] text-white/10 uppercase vertical-text tracking-[1em]">
            {coordinate}
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-24 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-32 items-center">
          {children}
        </div>
      </div>
    </section>
  )
}

// ─── Main Content ────────────────────────────────────────────────

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col pt-32 md:pt-48 lg:pt-56 pb-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 scale-105">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="w-full h-full object-cover opacity-80"
        >
          <source src={VIDEO_HERO} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 bg-blue-950/10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-24 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-20 items-center lg:items-start text-center lg:text-left">

          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5 }}
            >
              <AtmosphereTag className="mb-6 md:mb-10 justify-center lg:justify-start lg:hidden">
                LIMA • UNIVERSIDAD NACIONAL DE INGENIERÍA
              </AtmosphereTag>

              <h1 className="font-space-grotesk font-bold text-[clamp(2rem,7.5vw,10rem)] leading-[0.9] md:leading-[0.85] tracking-tight md:tracking-[-0.05em] uppercase text-white mb-8 md:mb-12">
                <span className="block text-white">Ingeniería que sale</span>
                <span className="block text-blue-600">del aula.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="max-w-3xl mx-auto lg:mx-0 space-y-6 md:space-y-10"
            >
              <div className="space-y-4 md:space-y-6">
                <p className="font-inter text-base md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Somos IEEE Computer Society UNI: una comunidad de estudiantes que convierte la teoría en proyectos, competencias, workshops y soluciones técnicas hechas desde la universidad.
                </p>

                <p className="font-inter text-xs md:text-lg text-white/30 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  No venimos a repetir buzzwords. Venimos a programar, investigar, competir, fallar rápido y construir mejor.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
                <EngineeringButton to="/proyectos" className="w-full sm:w-auto justify-center">
                  Ver lo que construimos
                </EngineeringButton>

                <EngineeringButton to="/nosotros" secondary className="w-full sm:w-auto justify-center">
                  Conocer la comunidad
                </EngineeringButton>
              </div>
            </motion.div>
          </div>

          <div className="hidden md:block lg:col-span-3 mt-12 lg:mt-32">
            <FloatingHud
              title="Líneas de trabajo"
              delay={1}
              data={[
                { label: "AI", value: "Modelos y datos" },
                { label: "Security", value: "CTFs y defensa" },
                { label: "Software", value: "Web, APIs, sistemas" },
                { label: "Competitive", value: "Programación competitiva" },
              ]}
            />
          </div>

        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('/cyber-texture.png')] bg-repeat" />
    </section>
  )
}

const Chapter01 = () => {
  return (
    <ChapterSection src={F1} alt="Inteligencia artificial aplicada" coordinate="APRENDIZAJE_TÉCNICO">
      <div className="lg:col-span-7 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8 md:space-y-12"
        >
          <AtmosphereTag className="justify-center lg:justify-start">
            Artificial Intelligence
          </AtmosphereTag>

          <h2 className="font-space-grotesk font-bold text-[clamp(2.5rem,7vw,10rem)] text-white uppercase tracking-tighter leading-[0.85]">
            IA aplicada,<br />no solo <span className="text-blue-600/70">teoría bonita</span>
          </h2>

          <p className="font-inter text-base md:text-2xl text-white/40 leading-relaxed mx-auto lg:mx-0 max-w-xl">
            Trabajamos inteligencia artificial desde lo que sí se puede construir: modelos, datasets, notebooks, papers discutidos en comunidad y prototipos que se puedan explicar técnicamente.
          </p>

          <EngineeringButton to="/recursos" secondary>
            Explorar recursos de IA
          </EngineeringButton>
        </motion.div>
      </div>

      <div className="hidden lg:block lg:col-span-4 lg:col-start-9">
        <FloatingHud
          title="Enfoque técnico"
          data={[
            { label: "ML", value: "Modelado predictivo" },
            { label: "CV", value: "Visión por computadora" },
            { label: "DS", value: "Análisis de datos" },
            { label: "NN", value: "Redes neuronales" },
          ]}
        />
      </div>
    </ChapterSection>
  )
}

const Chapter02 = () => {
  return (
    <ChapterSection src={F2} alt="Ciberseguridad práctica" coordinate="CAPACITACIÓN_PRÁCTICA">
      <div className="lg:col-span-7 lg:col-start-6 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8 md:space-y-12"
        >
          <AtmosphereTag className="justify-center lg:justify-start">
            Cybersecurity
          </AtmosphereTag>

          <h2 className="font-space-grotesk font-bold text-[clamp(2.5rem,7vw,10rem)] text-white uppercase tracking-tighter leading-[0.85]">
            Seguridad que se aprende<br />tocando <span className="text-blue-600/70">sistemas reales</span>
          </h2>

          <p className="font-inter text-base md:text-2xl text-white/40 leading-relaxed mx-auto lg:mx-0 max-w-xl">
            Organizamos espacios para practicar con retos, laboratorios y CTFs. La idea no es memorizar conceptos, sino entender cómo piensa un atacante y cómo responde un buen equipo técnico.
          </p>

          <EngineeringButton to="/eventos" secondary>
            Ver workshops y CTFs
          </EngineeringButton>
        </motion.div>
      </div>

      <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
        <div className="relative p-8 md:p-14 border border-white/10 bg-black/70 backdrop-blur-3xl overflow-hidden text-center lg:text-left">
          <div className="flex items-center gap-6 mb-10 justify-center lg:justify-start">
            <div className="w-12 h-12 border border-blue-500/40 flex items-center justify-center">
              <Shield size={24} className="text-blue-500" />
            </div>

            <div className="h-px w-20 bg-white/15" />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="block font-ibm-plex text-[9px] text-white/25 uppercase mb-3">
                Formato
              </span>
              <div className="font-mono text-xl md:text-2xl text-white">
                LABS
              </div>
            </div>

            <div>
              <span className="block font-ibm-plex text-[9px] text-white/25 uppercase mb-3">
                Dinámica
              </span>
              <div className="font-mono text-xl md:text-2xl text-white">
                CTFs
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChapterSection>
  )
}

const Chapter03 = () => {
  return (
    <ChapterSection src={F3} alt="Desarrollo de software" coordinate="DESARROLLO_REAL">
      <div className="lg:col-span-9 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12 md:space-y-16"
        >
          <AtmosphereTag className="justify-center lg:justify-start">
            Software Engineering
          </AtmosphereTag>

          <h2 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,12rem)] text-white uppercase tracking-tighter leading-[0.8]">
            Software hecho en equipo,<br /><span className="text-blue-600">con estándar técnico</span>
          </h2>

          <p className="font-inter text-xl md:text-2xl text-white/45 mx-auto lg:mx-0 max-w-3xl">
            Construimos proyectos como se trabaja fuera del salón: con repositorios, revisiones, diseño de interfaces, APIs, documentación y decisiones técnicas que se puedan defender.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-16 pt-8">
            {[
              { val: 'UNI', label: 'Base universitaria' },
              { val: '4', label: 'Líneas técnicas' },
              { val: 'Build', label: 'Aprender construyendo' },
            ].map((item, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="font-space-grotesk text-2xl md:text-4xl font-bold text-white mb-1">
                  {item.val}
                </div>
                <div className="font-ibm-plex text-[8px] md:text-[9px] text-white/25 uppercase tracking-widest">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <EngineeringButton to="/proyectos">
              Ver proyectos
            </EngineeringButton>

            <EngineeringButton to="/equipo" secondary>
              Ver equipo
            </EngineeringButton>
          </div>
        </motion.div>
      </div>
    </ChapterSection>
  )
}

const Chapter04 = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen bg-black overflow-hidden flex items-center border-t border-white/10 py-24 md:py-48">
      <div className="absolute inset-0 z-0">
        <img
          src={F4}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-45 grayscale contrast-[1.3]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-24 lg:px-40 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl space-y-16 md:space-y-24"
        >
          <div className="space-y-6 md:space-y-8">
            <AtmosphereTag className="justify-center lg:justify-start">
              Únete a la Comunidad
            </AtmosphereTag>

            <h2 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,12rem)] text-white uppercase tracking-tighter leading-[0.82]">
              Si quieres mejorar,<br /><span className="text-blue-600">construye con otros</span>
            </h2>
          </div>

          <p className="font-inter text-lg md:text-4xl text-white/35 leading-relaxed mx-auto lg:mx-0 max-w-4xl">
            IEEE CS UNI es para estudiantes que quieren exigirse más: participar en proyectos, entrenar para competencias, asistir a workshops y rodearse de gente que también está aprendiendo en serio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8">
            <EngineeringButton to="/contacto" className="w-full sm:w-auto justify-center">
              Quiero participar
            </EngineeringButton>

            <EngineeringButton to="/eventos" secondary className="w-full sm:w-auto justify-center">
              Ver actividades
            </EngineeringButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Main Page Export ───────────────────────────────────────────

export default function HomePage() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="bg-black text-white selection:bg-blue-600/50 selection:text-white font-inter">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[300]"
        style={{ scaleX }}
      />

      <Hero />
      <Chapter01 />
      <Chapter02 />
      <Chapter03 />
      <Chapter04 />

      <style>{`
        body {
          background-color: black;
          overscroll-behavior: none;
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  )
}