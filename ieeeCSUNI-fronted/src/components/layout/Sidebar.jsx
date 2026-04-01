// src/components/layout/Sidebar.jsx
// ============================================================
// Sidebar compartido entre los tres roles.
// CÓMO PERSONALIZAR:
//   - Cambia `navItems` según el rol (member/admin/user)
//   - El rol activo lo recibes como prop `role`
//   - Conecta `activePath` con useLocation() de react-router-dom
// ============================================================

import { useState } from 'react'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
// Íconos SVG inline (sin dependencia de librería)
// Reemplaza por lucide-react si lo tienes: import { LayoutDashboard } from 'lucide-react'
const icons = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  tasks: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  hours: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  cert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  events: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  stats: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  qr: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/>
      <rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3v3"/><path d="M21 21v.01"/>
      <path d="M12 7v3h3"/><path d="M12 3v.01"/><path d="M12 12v.01"/><path d="M16 12v.01"/>
    </svg>
  ),
  logout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
}

// Navegación por rol
// MODIFICA AQUÍ para agregar/quitar items según permisos
const NAV_BY_ROLE = {
  member: [
    { label: 'Dashboard',    icon: 'dashboard', path: '/member' },
    { label: 'Mis Tareas',   icon: 'tasks',     path: '/member/tasks' },
    { label: 'Voluntariado', icon: 'hours',     path: '/member/hours' },
    { label: 'Certificados', icon: 'cert',      path: '/member/certs' },
    { label: 'Eventos',      icon: 'events',    path: '/member/events' },
  ],
  admin: [
    { label: 'Dashboard',    icon: 'dashboard', path: '/admin' },
    { label: 'Tareas',       icon: 'tasks',     path: '/admin/tasks' },
    { label: 'Voluntariado', icon: 'hours',     path: '/admin/hours' },
    { label: 'Certificados', icon: 'cert',      path: '/admin/certs' },
    { label: 'Eventos',      icon: 'events',    path: '/admin/events' },
    { label: 'Usuarios',     icon: 'users',     path: '/admin/users' },
    { label: 'Estadísticas', icon: 'stats',     path: '/admin/stats' },
  ],
  user: [
    { label: 'Mi Panel',     icon: 'dashboard', path: '/user' },
    { label: 'Check-in QR',  icon: 'qr',        path: '/user/checkin' },
    { label: 'Mis Eventos',  icon: 'events',    path: '/user/events' },
    { label: 'Certificados', icon: 'cert',      path: '/user/certs' },
  ],
}

const ROLE_LABELS = {
  member: 'Miembro',
  admin:  'Administrador',
  user:   'Usuario',
}

// Props:
//   role: 'member' | 'admin' | 'user'
//   activePath: string (ruta actual, conéctalo con useLocation)
//   user: { name: string, email: string, avatar?: string }
//   onNavigate: (path) => void  — conéctalo con useNavigate
//   onLogout: () => void
export default function Sidebar({ role = 'member', activePath = '/', user = {}, onNavigate, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const navItems = NAV_BY_ROLE[role] || NAV_BY_ROLE.member

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full z-40 flex flex-col
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-60'}
      `}
      style={{
        background: 'rgba(7,8,15,0.92)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* ── Logo + colapsar ── */}
      <div className="flex items-center justify-between px-4 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            {/* Badge IEEE CS — mismo estilo que tu landing */}
            <IEEECSLogo size={36} />
            IEEE C
            <span className="text-xs font-light tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>UNI</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {collapsed
              ? <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
              : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* ── Perfil breve ── */}
      {!collapsed && (
        <div className="px-4 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3">
            {/* Avatar con iniciales — reemplaza con <img> si tienes foto */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
            >
              {(user.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate" style={{ color: '#e8edf5' }}>{user.name || 'Usuario'}</p>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>
                {ROLE_LABELS[role]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Navegación ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {navItems.map(item => {
          const isActive = activePath === item.path || activePath.startsWith(item.path + '/')
          return (
            <button
              key={item.path}
              onClick={() => onNavigate?.(item.path)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                transition-all duration-150
                ${isActive ? 'text-white' : ''}
              `}
              style={{
                background: isActive ? 'rgba(59,130,246,0.15)' : 'transparent',
                color: isActive ? '#e8edf5' : 'rgba(255,255,255,0.4)',
                border: isActive ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
              }}
              title={collapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0" style={{ color: isActive ? '#3b82f6' : 'inherit' }}>
                {icons[item.icon]}
              </span>
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {/* Indicador activo a la derecha */}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#3b82f6' }} />
              )}
            </button>
          )
        })}
      </nav>

      {/* ── Logout ── */}
      <div className="px-2 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {icons.logout}
          {!collapsed && <span className="text-sm">Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}
