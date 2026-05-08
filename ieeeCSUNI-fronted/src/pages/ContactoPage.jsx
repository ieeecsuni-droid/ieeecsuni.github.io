import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import { 
  Mail, MapPin, Clock, Linkedin, Instagram, Github, 
  Terminal, Server, Shield, Network, Loader2, Database, ChevronRight
} from 'lucide-react'

// ─── Componentes de UI Internos ──────────────────────────────

function InputField({ label, type = "text", name, value, onChange, required, placeholder, options }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[9px] tracking-widest text-white/50 uppercase flex items-center justify-between">
        <span>{label}</span>
        {required && <span className="text-blue-500/70">*</span>}
      </label>
      
      {type === 'select' ? (
        <select 
          name={name} 
          required={required} 
          value={value} 
          onChange={onChange}
          className="bg-[#030408] border border-white/[0.08] p-3 md:p-4 rounded-sm text-[13px] text-white/80 font-mono outline-none focus:border-blue-500/50 transition-all appearance-none"
        >
          <option value="">-- SELECCIONAR --</option>
          {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea 
          name={name} 
          required={required}
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
          className="bg-[#030408] border border-white/[0.08] p-3 md:p-4 rounded-sm text-[13px] text-white/80 font-mono outline-none focus:border-blue-500/50 transition-all min-h-[140px] resize-none placeholder:text-white/20"
        />
      ) : (
        <input 
          name={name} 
          type={type} 
          required={required}
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
          className="bg-[#030408] border border-white/[0.08] p-3 md:p-4 rounded-sm text-[13px] text-white/80 font-mono outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
        />
      )}
    </div>
  )
}

function ProtocolTab({ active, label, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center gap-3 p-4 md:p-6 border-b-2 transition-all duration-300 ${
        active 
        ? 'border-blue-500 bg-gradient-to-t from-blue-500/10 to-transparent text-blue-500' 
        : 'border-white/[0.04] bg-[#ffffff01] text-white/40 hover:text-white/80 hover:bg-[#ffffff03]'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'animate-pulse' : ''}`} />
      <span className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase text-center">
        {label}
      </span>
    </button>
  )
}

// ─── Main Page ────────────────────────────────────────────────

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
    <main className="bg-[#050816] text-white min-h-screen overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      
      {/* ══ BACKGROUND SYSTEM ══════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)'
          }}
        />
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03),_transparent_50%)] blur-[100px]" />
      </div>

      {/* ── HERO: COMMUNICATION GATEWAY ── */}
      <section className="relative z-10 pt-48 pb-32 px-6 md:px-12 lg:px-20 border-b border-white/[0.04] overflow-hidden">
        {/* Simple Full-Cover Background (febrero2026) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale opacity-[0.1] transition-opacity duration-1000"
            style={{ 
              backgroundImage: "url('/febrero2026.jpg')",
              filter: 'blur(8px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-transparent to-[#050816]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="reveal flex items-center gap-3 mb-8">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              IEEE CS UNI
            </span>
          </div>

          <h1 
            className="reveal mb-8 text-[clamp(40px,7vw,90px)] font-light tracking-tight leading-[0.95] text-white"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            CONTACTO<br />
            <span className="text-white/30">INSTITUCIONAL.</span>
          </h1>

          <p 
            className="max-w-2xl text-[15px] md:text-[17px] text-white/50 leading-relaxed mb-12"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Punto de acceso estructurado para coordinación técnica, consultas institucionales e integración de talento. Todas las transmisiones están monitoreadas por el sistema.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 border border-white/[0.04] bg-[#ffffff01] px-6 py-4 font-mono text-[9px] tracking-widest text-white/40 uppercase">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/> ESTADO: OPERATIVO</span>
            <span className="hidden md:block w-px h-4 bg-white/20" />
            <span className="flex items-center gap-2"><Terminal className="w-3 h-3 text-white/20" /> CANALES: ACTIVOS</span>
            <span className="hidden md:block w-px h-4 bg-white/20" />
            <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-white/20" /> RESPUESTA: {"<"} 24H</span>
          </div>
        </div>
      </section>

      {/* ── INTERFACE CORE ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 items-start">
          
          {/* LEFT: DATA ENTRY SYSTEM */}
          <div className="flex flex-col">
            
            {/* Protocol Tabs */}
            <div className="flex flex-col md:flex-row mb-12 border border-white/[0.04] bg-[#030408]">
              <ProtocolTab active={activeTab === 'miembro'} label="UNIRSE AL EQUIPO" icon={Network} onClick={() => setActiveTab('miembro')} />
              <ProtocolTab active={activeTab === 'evento'} label="PROPONER EVENTO" icon={Server} onClick={() => setActiveTab('evento')} />
              <ProtocolTab active={activeTab === 'mentor'} label="SER MENTOR" icon={Database} onClick={() => setActiveTab('mentor')} />
            </div>

            {/* Form Interface */}
            <div className="bg-[#ffffff01] border border-white/[0.04] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10">FORM_V2.4</div>
              
              <div className="mb-10">
                <h3 className="text-2xl font-light text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {activeTab === 'miembro' && "Solicitud de Integración"}
                  {activeTab === 'evento' && "Registro de Iniciativa"}
                  {activeTab === 'mentor' && "Propuesta de Mentoría"}
                </h3>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                  COMPLETA LOS DATOS REQUERIDOS
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Core Identity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/[0.04]">
                  <InputField label="NOMBRE COMPLETO" name="nombre" required placeholder="Ej. César Adrian" value={form.nombre} onChange={handleChange} />
                  <InputField label="CORREO INSTITUCIONAL" type="email" name="email" required placeholder="usuario@uni.edu.pe" value={form.email} onChange={handleChange} />
                </div>

                {/* Conditional Payloads */}
                <div className="min-h-[100px]">
                  {activeTab === 'miembro' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                      <InputField 
                        label="CARRERA" type="select" name="carrera" required value={form.carrera} onChange={handleChange}
                        options={['Ingeniería de Ciberseguridad', 'Ingeniería Eléctrica', 'Ingeniería Electrónica', 'Ingeniería de Telecomunicaciones', 'Ingeniería de Sistemas', 'Ingeniería de Software', 'Otro']}
                      />
                      <InputField 
                        label="CICLO ACTUAL" type="select" name="ciclo" required value={form.ciclo} onChange={handleChange}
                        options={[...Array(10)].map((_, i) => `${i+1}° Ciclo`)}
                      />
                    </div>
                  )}

                  {activeTab === 'evento' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                      <InputField 
                        label="TIPO DE EVENTO" type="select" name="tipoEvento" required value={form.tipoEvento} onChange={handleChange}
                        options={['Workshop Técnico', 'Charla / Webinar', 'CTF / Competencia']}
                      />
                      <InputField label="FECHA TENTATIVA" type="date" name="fechaProbable" required value={form.fechaProbable} onChange={handleChange} />
                    </div>
                  )}

                  {activeTab === 'mentor' && (
                    <div className="animate-in fade-in duration-500">
                      <InputField label="ÁREA DE EXPERTISE" name="areaExperticia" required placeholder="Ej: Cloud Computing, Forensics..." value={form.areaExperticia} onChange={handleChange} />
                    </div>
                  )}
                </div>

                {/* Message Payload */}
                <div className="pt-2">
                  <InputField label="MENSAJE O DETALLES" type="textarea" name="mensaje" required placeholder="Describe tu propuesta o intereses..." value={form.mensaje} onChange={handleChange} />
                </div>

                {/* Action */}
                <div className="mt-6 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="group flex items-center gap-3 px-8 py-4 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500 hover:text-[#050816] text-amber-500 font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> ENVIANDO...</>
                    ) : (
                      <><Terminal className="w-4 h-4 group-hover:text-[#050816]" /> ENVIAR SOLICITUD</>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* RIGHT: ALTERNATIVE CHANNELS (SIDEBAR) */}
          <aside className="flex flex-col gap-8">
            
            <div className="bg-[#ffffff01] border border-white/[0.04] p-8">
              <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 mb-8 flex items-center gap-2">
                <Network className="w-3.5 h-3.5" /> Canales Oficiales
              </h4>
              
              <div className="flex flex-col gap-6">
                {[
                  { icon: Mail, label: 'EMAIL', val: 'ieeecs.uni@gmail.com' },
                  { icon: MapPin, label: 'UBICACIÓN', val: 'FIEE - UNI, Pabellón Q' },
                  { icon: Clock, label: 'HORARIO', val: 'Lun-Vie, 17:00-20:00' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-2 bg-[#030408] border border-white/[0.06] h-fit">
                      <item.icon className="w-4 h-4 text-white/40" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-white/30 mb-1">{item.label}</span>
                      <span className="text-[13px] text-white/80" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Protocols */}
            <div className="bg-[#ffffff01] border border-white/[0.04] p-8">
              <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 mb-6 flex items-center gap-2">
                <Server className="w-3.5 h-3.5" /> Redes Sociales
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { Icon: Linkedin, label: 'LINKEDIN', link: "https://www.linkedin.com/company/ieee-cs-uni-sb/" },
                  { Icon: Instagram, label: 'INSTAGRAM', link: "https://www.instagram.com/ieee.cs.uni/" },
                  { Icon: Github, label: 'GITHUB', link: "https://github.com/ieeecsuni-droid" }
                ].map((info, i) => (
                  <a 
                    key={i} 
                    href={info.link} 
                    target='_blank' 
                    rel='noopener noreferrer' 
                    className="flex items-center gap-4 p-3 bg-[#030408] border border-white/[0.04] hover:border-white/[0.15] hover:bg-white/[0.02] transition-colors group"
                  >
                    <info.Icon className="w-4 h-4 text-white/30 group-hover:text-white" />
                    <span className="font-mono text-[10px] tracking-widest text-white/50 group-hover:text-white uppercase">{info.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Console */}
            <div className="bg-[#ffffff01] border border-white/[0.04] p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/30" />
              <h5 className="font-mono text-[10px] tracking-[0.2em] text-blue-500/70 uppercase mb-4">
                PREGUNTAS FRECUENTES
              </h5>
              <details className="group cursor-pointer">
                <summary className="text-[12px] text-white/70 flex items-center justify-between list-none font-medium mb-2">
                  ¿Acceso exclusivo FIEE? 
                  <ChevronRight className="w-3 h-3 text-white/30 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-[11px] text-white/40 leading-relaxed mt-3 p-3 bg-[#030408] border border-white/[0.04]">
                  No, el acceso está permitido a estudiantes de todas las facultades de la UNI apasionados por la tecnología.
                </p>
              </details>
            </div>

          </aside>

        </div>
      </section>

    </main>
  )
}