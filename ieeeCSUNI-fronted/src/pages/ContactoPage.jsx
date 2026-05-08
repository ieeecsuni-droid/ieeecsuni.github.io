import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import { AtmosphereTag } from '../components/ui/AtmosphereTag'
import { EngineeringButton } from '../components/ui/EngineeringButton'
import { 
  Mail, MapPin, Clock, Linkedin, Instagram, Github, 
  Terminal, Server, Shield, Network, Loader2, Database, ChevronRight, Activity, Crosshair, HelpCircle
} from 'lucide-react'

function InputField({ label, type = "text", name, value, onChange, required, placeholder, options }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-ibm-plex text-[10px] tracking-[0.3em] text-white/30 uppercase flex items-center justify-between font-bold">
        <span>{label}</span>
        {required && <span className="text-blue-500/70">*</span>}
      </label>
      
      {type === 'select' ? (
        <div className="relative group">
          <select 
            name={name} 
            required={required} 
            value={value} 
            onChange={onChange}
            className="w-full bg-black border border-white/10 p-4 text-[13px] text-white font-ibm-plex outline-none focus:border-blue-500/40 transition-all appearance-none"
          >
            <option value="" className="bg-black">-- SELECCIONAR --</option>
            {options?.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
          </select>
          <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 rotate-90 pointer-events-none" />
        </div>
      ) : type === 'textarea' ? (
        <textarea 
          name={name} 
          required={required}
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-black border border-white/10 p-4 text-[13px] text-white font-ibm-plex outline-none focus:border-blue-500/40 transition-all min-h-[160px] resize-none placeholder:text-white/10"
        />
      ) : (
        <input 
          name={name} 
          type={type} 
          required={required}
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-black border border-white/10 p-4 text-[13px] text-white font-ibm-plex outline-none focus:border-blue-500/40 transition-all placeholder:text-white/10"
        />
      )}
    </div>
  )
}

function ProtocolTab({ active, label, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-4 p-6 border transition-all duration-700
        ${active 
        ? 'border-blue-500/40 bg-blue-600/10 text-white' 
        : 'border-white/5 bg-white/[0.01] text-white/20 hover:text-white/40 hover:bg-white/[0.02]'
      }`}
    >
      <Icon size={16} className={`${active ? 'text-blue-500' : 'opacity-50'}`} />
      <span className="font-space-grotesk font-bold text-[10px] tracking-[0.25em] uppercase text-center">
        {label}
      </span>
    </button>
  )
}

export default function ContactoPage() {
  useScrollReveal()
  const { showToast } = useToast()
  
  const [activeTab, setActiveTab] = useState('miembro') 
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({ 
    nombre: '', email: '', carrera: '', ciclo: '', 
    tipoEvento: '', fechaProbable: '', areaExperticia: '', mensaje: '' 
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: activeTab,
          nombre:         form.nombre,
          email:          form.email,
          mensaje:        form.mensaje,
          carrera:        form.carrera,
          ciclo:          form.ciclo,
          tipoEvento:     form.tipoEvento,
          fechaProbable:  form.fechaProbable,
          areaExperticia: form.areaExperticia,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.mensaje || 'Error')
      
      showToast('✓ Solicitud enviada exitosamente.')
      setForm({ nombre: '', email: '', carrera: '', ciclo: '', tipoEvento: '', fechaProbable: '', areaExperticia: '', mensaje: '' })
    } catch (error) {
      showToast('× Error al enviar la solicitud.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-black text-white min-h-screen selection:bg-blue-600/30 overflow-hidden font-inter">
      
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative pt-48 pb-32 px-6 md:px-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale opacity-10"
            style={{ 
              backgroundImage: "url('/febrero2026.jpg')",
              filter: 'blur(4px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-animated opacity-5" />
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto w-full flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <AtmosphereTag className="mb-12 justify-center">Communication Gateway v2.4</AtmosphereTag>
            <h1 className="font-space-grotesk font-bold text-[clamp(2.5rem,8vw,10rem)] leading-[0.85] tracking-tight uppercase text-white mb-12">
              Contacto<br /><span className="text-blue-600">Institucional.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-inter max-w-3xl mb-16">
              Punto de acceso estructurado para coordinación técnica, consultas institucionales e integración de talento. Todas las transmisiones están monitoreadas por el sistema.
            </p>
          </motion.div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-12 border border-white/10 bg-white/[0.01] px-12 py-8 backdrop-blur-xl">
            {[
              { val: 'ACTIVO', label: 'Estado del Sistema', color: 'text-emerald-500' },
              { val: 'SECURE', label: 'Protocolo de Encriptación', color: 'text-blue-500/60' },
              { val: 'CANALES', label: 'Tráfico de Red', color: 'text-white/40' },
              { val: '< 24H', label: 'Tiempo de Respuesta', color: 'text-white/40' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className={`font-space-grotesk text-2xl font-bold mb-2 ${stat.color}`}>{stat.val}</span>
                <span className="font-ibm-plex text-[8px] tracking-[0.2em] text-white/20 uppercase font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INTERFACE CORE ═════════════════════════════════════ */}
      <section className="py-48 px-6 md:px-24">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-24 items-start">
          
          {/* FORM CONSOLE */}
          <div className="reveal flex flex-col">
            <div className="flex flex-col md:flex-row mb-1 gap-px bg-white/5 border border-white/5">
              <ProtocolTab active={activeTab === 'miembro'} label="Unirse al Equipo" icon={Network} onClick={() => setActiveTab('miembro')} />
              <ProtocolTab active={activeTab === 'evento'} label="Proponer Evento" icon={Server} onClick={() => setActiveTab('evento')} />
              <ProtocolTab active={activeTab === 'mentor'} label="Ser Mentor" icon={Database} onClick={() => setActiveTab('mentor')} />
            </div>

            <div className="relative bg-white/[0.01] border border-white/5 p-10 md:p-16">
              <div className="absolute top-8 right-10 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-ibm-plex text-[9px] tracking-[0.3em] text-white/20 uppercase font-bold">Transmit_Buffer_v2</span>
              </div>
              
              <div className="mb-16">
                <h3 className="text-3xl font-space-grotesk font-bold text-white mb-4">
                  {activeTab === 'miembro' && "Solicitud de Integración"}
                  {activeTab === 'evento' && "Registro de Iniciativa"}
                  {activeTab === 'mentor' && "Propuesta de Mentoría"}
                </h3>
                <div className="w-12 h-px bg-blue-500/30" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-10 border-b border-white/5">
                  <InputField label="Nombre Completo" name="nombre" required placeholder="Ej. Alan Turing" value={form.nombre} onChange={handleChange} />
                  <InputField label="Correo Institucional" type="email" name="email" required placeholder="usuario@uni.edu.pe" value={form.email} onChange={handleChange} />
                </div>

                <div className="min-h-[100px]">
                  {activeTab === 'miembro' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <InputField 
                        label="Carrera Profesional" type="select" name="carrera" required value={form.carrera} onChange={handleChange}
                        options={['Ingeniería de Ciberseguridad', 'Ingeniería de Sistemas', 'Ingeniería de Software', 'Ingeniería Electrónica', 'Ingeniería Mecatrónica', 'Ingeniería de Telecomunicaciones', 'Otro']}
                      />
                      <InputField 
                        label="Ciclo Académico" type="select" name="ciclo" required value={form.ciclo} onChange={handleChange}
                        options={[...Array(10)].map((_, i) => `${i+1}° Ciclo`)}
                      />
                    </motion.div>
                  )}

                  {activeTab === 'evento' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <InputField 
                        label="Categoría del Evento" type="select" name="tipoEvento" required value={form.tipoEvento} onChange={handleChange}
                        options={['Workshop Técnico', 'Charla Magistral', 'CTF / Hackathon', 'Conferencia']}
                      />
                      <InputField label="Fecha Tentativa" type="date" name="fechaProbable" required value={form.fechaProbable} onChange={handleChange} />
                    </motion.div>
                  )}

                  {activeTab === 'mentor' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <InputField label="Dominio Técnico / Expertise" name="areaExperticia" required placeholder="Ej: Deep Learning, Malware Analysis, Cloud..." value={form.areaExperticia} onChange={handleChange} />
                    </motion.div>
                  )}
                </div>

                <InputField label="Mensaje del Sistema / Detalles" type="textarea" name="mensaje" required placeholder="Describe tu propuesta, intereses o perfil técnico..." value={form.mensaje} onChange={handleChange} />

                <div className="flex justify-end pt-10">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="group relative flex items-center gap-4 px-10 py-5 bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600 hover:border-blue-500 transition-all duration-700 disabled:opacity-50"
                  >
                    <span className="font-space-grotesk font-bold text-[11px] tracking-[0.3em] uppercase text-blue-400 group-hover:text-white transition-colors">
                      {loading ? 'Transmitiendo...' : 'Iniciar Transmisión'}
                    </span>
                    {loading ? (
                      <Loader2 size={16} className="animate-spin text-blue-400 group-hover:text-white" />
                    ) : (
                      <Activity size={16} className="text-blue-400 group-hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* SIDEBAR CHANNELS */}
          <aside className="reveal space-y-12">
            <div className="p-10 border border-white/10 bg-white/[0.01] backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-12">
                <Crosshair size={18} className="text-blue-500/40" />
                <span className="font-ibm-plex text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold">Canales_Oficiales</span>
              </div>
              
              <div className="space-y-10">
                {[
                  { icon: Mail, label: 'Transmisión Email', val: 'ieeecs.uni@gmail.com' },
                  { icon: MapPin, label: 'Coordenadas Físicas', val: 'FIEE - UNI, Pabellón Q' },
                  { icon: Clock, label: 'Ciclo Operativo', val: 'Lun-Vie, 17:00-20:00' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-10 h-10 border border-white/5 flex items-center justify-center bg-black group-hover:border-blue-500/20 transition-all">
                      <item.icon size={16} className="text-white/20 group-hover:text-blue-500/40" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-ibm-plex text-[9px] tracking-[0.2em] uppercase text-white/20 mb-1 font-bold">{item.label}</span>
                      <span className="font-space-grotesk text-lg font-bold text-white/80 group-hover:text-white transition-colors">{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 border border-white/10 bg-white/[0.01] backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-10">
                <Activity size={18} className="text-blue-500/40" />
                <span className="font-ibm-plex text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold">Nodos_Sociales</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { Icon: Linkedin, label: 'Linkedin_Network', link: "https://www.linkedin.com/company/ieee-cs-uni-sb/" },
                  { Icon: Instagram, label: 'Instagram_Feed', link: "https://www.instagram.com/ieee.cs.uni/" },
                  { Icon: Github, label: 'Github_Repository', link: "https://github.com/ieeecsuni-droid" }
                ].map((info, i) => (
                  <a key={i} href={info.link} target='_blank' rel='noopener noreferrer' className="flex items-center justify-between p-4 border border-white/5 bg-black hover:border-blue-500/20 hover:bg-blue-600/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <info.Icon size={14} className="text-white/20 group-hover:text-blue-400" />
                      <span className="font-ibm-plex text-[10px] tracking-[0.2em] text-white/40 group-hover:text-white uppercase font-bold">{info.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-white/10 group-hover:text-white transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-10 border border-white/10 bg-blue-600/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20" />
              <div className="flex items-center gap-4 mb-6">
                <HelpCircle size={18} className="text-blue-500/40" />
                <span className="font-ibm-plex text-[10px] tracking-[0.3em] text-blue-500/60 uppercase font-bold">Query_Assistance</span>
              </div>
              <details className="group/faq cursor-pointer">
                <summary className="font-space-grotesk text-[13px] font-bold text-white/70 flex items-center justify-between list-none uppercase tracking-wider">
                  ¿Acceso exclusivo FIEE? 
                  <ChevronRight size={14} className="text-white/20 group-open/faq:rotate-90 transition-transform" />
                </summary>
                <div className="mt-6 p-4 border border-white/5 bg-black font-inter text-[13px] text-white/40 leading-relaxed">
                  No, el acceso está permitido a estudiantes de todas las facultades de la UNI apasionados por la tecnología y la investigación técnica.
                </div>
              </details>
            </div>
          </aside>
        </div>
      </section>

    </main>
  )
}