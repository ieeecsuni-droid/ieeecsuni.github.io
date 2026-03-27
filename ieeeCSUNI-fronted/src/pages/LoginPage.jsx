import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { IEEECSLogo } from '../assets/IEEECSLogo'
import { Orb } from '../components/ui/HeroElements'

function LoginForm({ onSuccess }) {
  const { login } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      showToast('✓ Sesión iniciada correctamente.')
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9999' }}>
          {error}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="field-label">Correo electrónico</label>
        <input className="field-input" type="email" placeholder="tu@uni.edu.pe" required value={form.email} onChange={set('email')} autoComplete="email" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="field-label">Contraseña</label>
        <input className="field-input" type="password" placeholder="••••••••" required value={form.password} onChange={set('password')} autoComplete="current-password" />
      </div>
      <div className="flex justify-end">
        <span className="text-xs cursor-pointer" style={{ color: 'var(--c1)' }}>¿Olvidaste tu contraseña?</span>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary justify-center mt-2"
        style={{ opacity: loading ? 0.65 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión →'}
      </button>
    </form>
  )
}

function RegisterForm({ onSuccess }) {
  const { register } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirm: '', carrera: '', ciclo: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Las contraseñas no coinciden.'); return }
    setLoading(true)
    try {
      await register(form)
      showToast('✓ ¡Bienvenido/a al capítulo IEEE CS UNI!')
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9999' }}>
          {error}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="field-label">Nombre completo *</label>
        <input className="field-input" type="text" placeholder="Tu nombre" required value={form.nombre} onChange={set('nombre')} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="field-label">Correo universitario *</label>
        <input className="field-input" type="email" placeholder="tu@uni.edu.pe" required value={form.email} onChange={set('email')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="field-label">Contraseña *</label>
          <input className="field-input" type="password" placeholder="min. 6 caracteres" required value={form.password} onChange={set('password')} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="field-label">Confirmar *</label>
          <input className="field-input" type="password" placeholder="repite la contraseña" required value={form.confirm} onChange={set('confirm')} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="field-label">Carrera *</label>
          <select className="field-input" required value={form.carrera} onChange={set('carrera')}>
            <option value="">Tu carrera</option>
            <option>Ing. de Sistemas</option>
            <option>Ing. de Software</option>
            <option>Ing. Eléctrica</option>
            <option>Ing. Electrónica</option>
            <option>Otra</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="field-label">Ciclo *</label>
          <select className="field-input" required value={form.ciclo} onChange={set('ciclo')}>
            <option value="">Ciclo</option>
            <option>1° – 2°</option>
            <option>3° – 4°</option>
            <option>5° – 6°</option>
            <option>7° – 8°</option>
            <option>9° – 10°</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary justify-center mt-2"
        style={{ opacity: loading ? 0.65 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta →'}
      </button>
    </form>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')

  const onSuccess = () => navigate('/dashboard')

  return (
    <main className="pt-16 min-h-screen flex items-center justify-center px-6 py-16 relative">
      {/* Background glows */}
      <Orb className="top-1/4 left-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2"
           style={{ background: 'radial-gradient(circle, rgba(0,150,220,0.08), transparent 70%)' }} />
      <Orb className="bottom-1/4 right-1/4 w-[400px] h-[400px]"
           style={{ background: 'radial-gradient(circle, rgba(0,80,160,0.08), transparent 70%)' }} />

      <div
        className="w-full max-w-md relative z-10 rounded-2xl p-10"
        style={{
          background: 'var(--b2)',
          border: '1px solid var(--border2)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo + title */}
        <div className="flex flex-col items-center mb-8">
          <IEEECSLogo size={56} />
          <div className="text-2xl font-black mt-4 mb-1 tracking-tight">
            {tab === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </div>
          <div className="text-sm text-center" style={{ color: 'var(--fg2)' }}>
            {tab === 'login'
              ? 'Bienvenido/a de vuelta al capítulo'
              : 'Únete al IEEE CS UNI Student Chapter'
            }
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-xl overflow-hidden mb-7"
          style={{ border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}
        >
          {[
            { key: 'login',    label: 'Iniciar sesión' },
            { key: 'register', label: 'Registrarse' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex-1 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer border-none"
              style={{
                background: tab === t.key ? 'linear-gradient(135deg, var(--c3), var(--c2))' : 'transparent',
                color: tab === t.key ? '#fff' : 'var(--fg2)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Form */}
        {tab === 'login'
          ? <LoginForm onSuccess={onSuccess} />
          : <RegisterForm onSuccess={onSuccess} />
        }

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--fg3)' }}>o</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Alt tab link */}
        <p className="text-center text-sm" style={{ color: 'var(--fg2)' }}>
          {tab === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            className="font-semibold cursor-pointer bg-transparent border-none"
            style={{ color: 'var(--c1)' }}
          >
            {tab === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>

        {/* Back to home */}
        <p className="text-center text-xs mt-4" style={{ color: 'var(--fg3)' }}>
          <Link to="/" className="no-underline" style={{ color: 'var(--fg3)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--c1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--fg3)'}
          >
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </main>
  )
}
