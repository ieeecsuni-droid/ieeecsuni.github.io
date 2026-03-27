import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { FaGit } from 'react-icons/fa6'
import { Icon } from 'lucide-react'
export default function ContactoPage() {
  useScrollReveal()
  const { showToast } = useToast()
  const [form, setForm] = useState({ nombre: '', email: '', carrera: '', ciclo: '', mensaje: '' })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast('✓ Solicitud enviada — te contactaremos pronto.')
      setForm({ nombre: '', email: '', carrera: '', ciclo: '', mensaje: '' })
    }, 900)
  }

  return (
    <main className="pt-16">
      {/* Hero */}
      <section
        className="relative flex flex-col justify-center px-10 md:px-20 overflow-hidden"
        style={{ minHeight: '45vh', paddingTop: 80, paddingBottom: 60 }}
      >
        <Orb className="top-[-200px] right-[-100px] w-[600px] h-[600px]"
             style={{ background: 'radial-gradient(circle, rgba(0,180,255,0.1), transparent 70%)' }} />
        <HeroTag>Únete al capítulo</HeroTag>
        <h1
          className="font-black leading-[.92] tracking-[-0.03em] mb-7"
          style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
        >
          <span style={{ color: 'var(--fg)' }}>¿Quieres</span>
          <span className="block" style={{ color: 'var(--c1)' }}>ser parte?</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed" style={{ color: 'var(--fg2)' }}>
          Completa el formulario y nos pondremos en contacto.
          Estamos abiertos a estudiantes de todas las carreras de la UNI.
        </p>
      </section>

      {/* Form + info */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <div>
            <SectionLabel>Formulario de ingreso</SectionLabel>
            <SectionTitle className="reveal mb-2">Envía tu solicitud.</SectionTitle>
            <p className="text-sm mb-8" style={{ color: 'var(--fg2)' }}>Revisamos solicitudes todos los lunes.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="field-label">Nombre completo *</label>
                  <input className="field-input" type="text" placeholder="Tu nombre" required value={form.nombre} onChange={set('nombre')} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="field-label">Correo universitario *</label>
                  <input className="field-input" type="email" placeholder="tu@uni.edu.pe" required value={form.email} onChange={set('email')} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="field-label">Carrera *</label>
                  <select className="field-input" required value={form.carrera} onChange={set('carrera')}>
                    <option value="">Selecciona tu carrera</option>
                    <option>Ingeniería de Sistemas</option>
                    <option>Ingeniería de Software</option>
                    <option>Ingeniería Eléctrica</option>
                    <option>Ingeniería Electrónica</option>
                    <option>Ingeniería Ciberseguridad</option>
                    <option>Ingeniería de Telecomunicaciones</option>
                    <option>Otra carrera</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="field-label">Ciclo actual *</label>
                  <select className="field-input" required value={form.ciclo} onChange={set('ciclo')}>
                    <option value="">¿En qué ciclo estás?</option>
                    <option>1° – 2°</option>
                    <option>3° – 4°</option>
                    <option>5° – 6°</option>
                    <option>7° – 8°</option>
                    <option>9° – 10°</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="field-label">¿Por qué quieres unirte?</label>
                <textarea
                  className="field-input"
                  placeholder="Cuéntanos sobre tus intereses y qué esperas del capítulo..."
                  rows={5}
                  value={form.mensaje}
                  onChange={set('mensaje')}
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary mt-2 self-start">
                {loading ? 'Enviando...' : 'Enviar solicitud →'}
              </button>
            </form>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-5">
            {/* Contact info */}
            <div className="card-base p-6">
              <h4 className="font-bold text-base mb-4">Contacto directo</h4>
              {[
                { icon: '', label: 'Email', value: 'ieeecs@uni.edu.pe' },
                { icon: '📍', label: 'Ubicación', value: 'UNI, Av. Túpac Amaru 210, Lima' },
                { icon: '⏰', label: 'Atención', value: 'Lun – Vie, 17:00 – 20:00' },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <div className="font-mono text-[10px] tracking-widest uppercase mb-0.5" style={{ color: 'var(--fg3)' }}>{c.label}</div>
                    <div className="text-sm font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="card-base p-6">
              <h4 className="font-bold text-base mb-4">Síguenos</h4>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '💼', name: 'LinkedIn', handle: 'ieee-cs-uni', href: '#' },
                  { icon: '📸', name: 'Instagram', handle: '@ieeecs_uni', href: '#' },
                  { icon: '🎮', name: 'Discord', handle: 'IEEE CS UNI', href: '#' },
                  { Icon: FaGit, name: 'GitHub', handle: 'ieeecs-uni', href: '#' },
                ].map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl no-underline transition-all duration-200"
                    style={{ border: '1px solid var(--border)', color: 'var(--fg2)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--c1)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg2)' }}
                  >
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <div className="text-sm font-semibold">{s.name}</div>
                      <div className="font-mono text-[11px]" style={{ color: 'var(--fg3)' }}>{s.handle}</div>
                    </div>
                    <span className="ml-auto text-xs">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ mini */}
            <div className="card-base p-6">
              <h4 className="font-bold text-base mb-4">Preguntas frecuentes</h4>
              {[
                { q: '¿Tiene algún costo unirse?', a: 'La membresía al capítulo es gratuita. La membresía IEEE es opcional (con descuento estudiantil).' },
                { q: '¿Es obligatorio asistir a todo?', a: 'No. Participas en lo que te interese. Solo pedimos compromiso si asumes un rol en la directiva.' },
                { q: '¿Solo es para Sistemas?', a: 'No, aceptamos a estudiantes de todas las carreras de la UNI.' },
              ].map(f => (
                <div key={f.q} className="mb-4 last:mb-0">
                  <div className="text-sm font-bold mb-1">{f.q}</div>
                  <div className="text-[13px] leading-relaxed" style={{ color: 'var(--fg2)' }}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
