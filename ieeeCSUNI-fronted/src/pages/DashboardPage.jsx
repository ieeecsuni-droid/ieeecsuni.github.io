import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { events } from '../data'

const sidebarItems = [
  { icon: '🏠', label: 'Inicio',          id: 'home' },
  { icon: '📅', label: 'Mis eventos',      id: 'events' },
  { icon: '📚', label: 'Recursos',         id: 'resources' },
  { icon: '🏆', label: 'Mis logros',       id: 'achievements' },
  { icon: '👥', label: 'Comunidad',        id: 'community' },
  { icon: '⚙️', label: 'Configuración',   id: 'settings' },
]

function Sidebar({ active, setActive, user, logout }) {
  return (
    <aside
      className="fixed top-16 left-0 w-60 h-[calc(100vh-64px)] flex flex-col py-5 z-10 overflow-y-auto"
      style={{ background: 'var(--b2)', borderRight: '1px solid var(--border)' }}
    >
      {/* User card */}
      <div className="mx-3 mb-5 p-4 rounded-xl" style={{ background: 'rgba(0,100,150,0.15)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--c3), var(--c2))' }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-sm truncate">{user?.name}</div>
            <div className="font-mono text-[10px] truncate" style={{ color: 'var(--c1)' }}>Miembro activo</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="px-3 mb-2">
        <div className="font-mono text-[9px] tracking-widest uppercase px-2 mb-2" style={{ color: 'var(--fg3)' }}>Navegación</div>
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer border-none text-left mb-0.5"
            style={{
              background: active === item.id ? 'rgba(0,150,220,0.15)' : 'transparent',
              color: active === item.id ? 'var(--c1)' : 'var(--fg2)',
              borderLeft: active === item.id ? '2px solid var(--c1)' : '2px solid transparent',
            }}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-auto px-3">
        <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer border-none text-left transition-all duration-150"
          style={{ color: '#ff9999', background: 'transparent' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,80,80,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span className="text-base">↪</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

/* ── Panel views ── */
function HomePanel({ user }) {
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  const dashStats = [
    { icon: '📅', label: 'Eventos inscritos', value: 3, color: 'var(--c1)' },
    { icon: '📚', label: 'Recursos vistos',   value: 12, color: '#f5a800' },
    { icon: '🏆', label: 'Puntos IEEE',        value: 250, color: '#4dffaa' },
    { icon: '👥', label: 'Conexiones',         value: 8, color: '#ff9d6b' },
  ]

  const recentActivity = [
    { icon: '📅', text: <>Te inscribiste a <strong>HackUNI 2025</strong></>, time: 'Hace 2 días' },
    { icon: '📚', text: <>Viste el recurso <strong>Roadmap de carrera</strong></>, time: 'Hace 4 días' },
    { icon: '✅', text: <>Completaste el taller de <strong>React + TypeScript</strong></>, time: 'Hace 1 semana' },
    { icon: '🤝', text: <>Te conectaste con <strong>Diego Mendoza</strong></>, time: 'Hace 2 semanas' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight mb-1">
          {greeting}, <span style={{ color: 'var(--c1)' }}>{user?.name}</span> 👋
        </h1>
        <p className="font-mono text-sm" style={{ color: 'var(--fg2)' }}>
          {now.toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {dashStats.map(s => (
          <div key={s.label} className="card-base p-5">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--fg2)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Two-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6">
        {/* Activity feed */}
        <div className="card-base">
          <div className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="font-bold text-sm">Actividad reciente</span>
            <span className="text-xs cursor-pointer" style={{ color: 'var(--c1)' }}>Ver todo</span>
          </div>
          <div className="px-6 py-2">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 py-3.5" style={{ borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: 'rgba(0,150,220,0.12)' }}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm leading-snug" style={{ color: 'var(--fg2)' }}>{a.text}</div>
                </div>
                <div className="font-mono text-[10px] flex-shrink-0" style={{ color: 'var(--fg3)' }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="flex flex-col gap-5">
          <div className="card-base">
            <div className="px-5 py-4 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="font-bold text-sm">Próximos eventos</span>
              <span className="text-xs cursor-pointer" style={{ color: 'var(--c1)' }}>Ver todos</span>
            </div>
            <div className="px-5 py-2">
              {events.slice(0, 3).map((ev, i) => (
                <div key={ev.id} className="py-3.5" style={{ borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <div className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--c1)' }}>{ev.date}</div>
                  <div className="text-sm font-semibold mb-0.5">{ev.title}</div>
                  <div className="text-xs" style={{ color: 'var(--fg2)' }}>{ev.location}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress card */}
          <div className="card-base p-5">
            <div className="font-bold text-sm mb-4">Progreso del año</div>
            {[
              { label: 'Asistencia a eventos', pct: 75 },
              { label: 'Recursos completados', pct: 40 },
              { label: 'Puntos IEEE acumulados', pct: 60 },
            ].map(p => (
              <div key={p.label} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium">{p.label}</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--c1)' }}>{p.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--b3)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${p.pct}%`, background: 'linear-gradient(90deg, var(--c3), var(--c1))' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EventsPanel() {
  return (
    <div>
      <h2 className="text-xl font-black mb-6">Mis eventos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.slice(0, 4).map(ev => (
          <div key={ev.id} className="card-base overflow-hidden">
            <div className="px-5 py-4 flex items-start gap-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="text-3xl">{ev.emoji}</div>
              <div>
                <div className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--c1)' }}>{ev.type}</div>
                <div className="font-bold text-sm">{ev.title}</div>
              </div>
            </div>
            <div className="px-5 py-3 flex justify-between items-center">
              <span className="text-xs" style={{ color: 'var(--fg2)' }}>{ev.date} · {ev.location}</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(0,200,100,0.1)', color: '#4dffaa', border: '1px solid rgba(0,200,100,0.2)' }}>Inscrito</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to="/eventos" className="btn-outline">Explorar más eventos →</Link>
      </div>
    </div>
  )
}

function SettingsPanel({ user }) {
  return (
    <div>
      <h2 className="text-xl font-black mb-6">Configuración de cuenta</h2>
      <div className="max-w-lg flex flex-col gap-5">
        <div className="card-base p-6">
          <h4 className="font-bold mb-4">Información personal</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Nombre', value: user?.name || '' },
              { label: 'Correo', value: user?.email || '' },
              { label: 'Carrera', value: user?.carrera || 'No especificada' },
            ].map(f => (
              <div key={f.label}>
                <label className="field-label">{f.label}</label>
                <input className="field-input mt-1.5" type="text" defaultValue={f.value} />
              </div>
            ))}
          </div>
          <button className="btn-primary mt-5 text-xs px-6 py-2.5">Guardar cambios</button>
        </div>
        <div className="card-base p-6">
          <h4 className="font-bold mb-4">Cambiar contraseña</h4>
          <div className="flex flex-col gap-3">
            <div><label className="field-label">Contraseña actual</label><input className="field-input mt-1.5" type="password" placeholder="••••••••" /></div>
            <div><label className="field-label">Nueva contraseña</label><input className="field-input mt-1.5" type="password" placeholder="••••••••" /></div>
            <div><label className="field-label">Confirmar nueva</label><input className="field-input mt-1.5" type="password" placeholder="••••••••" /></div>
          </div>
          <button className="btn-primary mt-5 text-xs px-6 py-2.5">Actualizar contraseña</button>
        </div>
      </div>
    </div>
  )
}

function GenericPanel({ id }) {
  const map = {
    resources:    { emoji: '📚', title: 'Recursos',       desc: 'Aquí aparecerán tus recursos guardados y el progreso de tus cursos.' },
    achievements: { emoji: '🏆', title: 'Mis logros',     desc: 'Aquí se mostrarán tus badges, certificados y puntos IEEE acumulados.' },
    community:    { emoji: '👥', title: 'Comunidad',      desc: 'Aquí podrás conectar con otros miembros del capítulo y ver el foro.' },
  }
  const item = map[id] || { emoji: '🔧', title: id, desc: 'Sección en construcción.' }
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-5">{item.emoji}</div>
      <h2 className="text-xl font-black mb-3">{item.title}</h2>
      <p className="text-sm max-w-xs" style={{ color: 'var(--fg2)' }}>{item.desc}</p>
      <div className="mt-4 px-4 py-2 rounded-full font-mono text-xs" style={{ background: 'rgba(0,150,220,0.1)', border: '1px solid var(--border2)', color: 'var(--c1)' }}>
        Próximamente
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState('home')

  if (!user) return <Navigate to="/login" replace />

  const renderPanel = () => {
    switch (activeSection) {
      case 'home':         return <HomePanel user={user} />
      case 'events':       return <EventsPanel />
      case 'settings':     return <SettingsPanel user={user} />
      default:             return <GenericPanel id={activeSection} />
    }
  }

  return (
    <div className="pt-16 min-h-screen" style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <Sidebar active={activeSection} setActive={setActiveSection} user={user} logout={logout} />
      <main className="min-h-[calc(100vh-64px)] px-8 py-8 overflow-y-auto" style={{ marginLeft: 240 }}>
        {renderPanel()}
      </main>
    </div>
  )
}
