/**
 * AdminUsers.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Panel de gestión de usuarios y miembros del capítulo.
 *
 * ROLES del sistema:
 *   • user   → sólo puede ver eventos y sus certificados (zona pública del dashboard)
 *   • member → acceso completo al dashboard: tareas, horas, certs, eventos con docs
 *   • admin  → acceso total incluyendo este panel
 *
 * CONECTAR CON LARAVEL (Sanctum):
 *   - GET  /api/admin/users         → lista paginada de usuarios (query: ?role=&search=&page=)
 *   - GET  /api/admin/users/{id}    → detalle de un usuario
 *   - PUT  /api/admin/users/{id}    → actualizar rol o estado (body: { role, is_active })
 *   - POST /api/admin/users/{id}/promote   → promover user → member
 *   - POST /api/admin/users/{id}/demote    → degradar member → user
 *   - POST /api/admin/users/{id}/deactivate
 *   - POST /api/admin/users/{id}/activate
 *   - DELETE /api/admin/users/{id}  → eliminar (¡soft-delete recomendado en Laravel!)
 *
 * DOCUMENTACIÓN RECOMENDADA:
 *   • Laravel Sanctum (auth):     https://laravel.com/docs/sanctum
 *   • Laravel Policies (permisos):https://laravel.com/docs/authorization
 *   • React Query (fetching):     https://tanstack.com/query/latest
 *   • Headless UI (modales):      https://headlessui.com/
 */

import { useState, useMemo } from 'react'

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: reemplazar con → fetch('/api/admin/users').then(r => r.json())
const MOCK_USERS = [
  {
    id: 1, name: 'Carlos Mendoza', email: 'c.mendoza@uni.pe',
    role: 'admin', is_active: true, joined: '2023-08-10',
    hours: 87, events: 12, avatar: 'CM',
  },
  {
    id: 2, name: 'Lucía Torres', email: 'l.torres@uni.pe',
    role: 'member', is_active: true, joined: '2023-09-01',
    hours: 45, events: 8, avatar: 'LT',
  },
  {
    id: 3, name: 'Diego Paredes', email: 'd.paredes@uni.pe',
    role: 'member', is_active: true, joined: '2024-01-15',
    hours: 22, events: 5, avatar: 'DP',
  },
  {
    id: 4, name: 'Valeria Ríos', email: 'v.rios@uni.pe',
    role: 'user', is_active: true, joined: '2024-02-20',
    hours: 0, events: 2, avatar: 'VR',
  },
  {
    id: 5, name: 'Andrés Soto', email: 'a.soto@uni.pe',
    role: 'user', is_active: false, joined: '2024-03-05',
    hours: 0, events: 0, avatar: 'AS',
  },
  {
    id: 6, name: 'Mariana Vega', email: 'm.vega@uni.pe',
    role: 'member', is_active: true, joined: '2023-11-12',
    hours: 61, events: 10, avatar: 'MV',
  },
  {
    id: 7, name: 'Rodrigo Chávez', email: 'r.chavez@uni.pe',
    role: 'user', is_active: true, joined: '2024-04-01',
    hours: 0, events: 1, avatar: 'RC',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ROLE_META = {
  admin:  { label: 'Admin',   color: 'from-yellow-400 to-orange-400',  bg: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-300' },
  member: { label: 'Member',  color: 'from-blue-400 to-cyan-400',      bg: 'bg-blue-400/10 border-blue-400/30 text-blue-300' },
  user:   { label: 'Usuario', color: 'from-slate-400 to-slate-500',    bg: 'bg-slate-400/10 border-slate-400/30 text-slate-400' },
}

const RoleBadge = ({ role }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${ROLE_META[role]?.bg}`}>
    {ROLE_META[role]?.label ?? role}
  </span>
)

const Avatar = ({ initials, role, size = 'md' }) => {
  const sz = size === 'lg' ? 'w-14 h-14 text-xl' : 'w-9 h-9 text-sm'
  const grad = ROLE_META[role]?.color ?? 'from-slate-400 to-slate-500'
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${grad} flex items-center justify-center font-bold text-white shrink-0`}>
      {initials}
    </div>
  )
}

// ─── Modal: detalle / edición de usuario ─────────────────────────────────────
const UserModal = ({ user, onClose, onSave }) => {
  const [role, setRole] = useState(user.role)
  const [active, setActive] = useState(user.is_active)

  const handleSave = () => {
    // TODO: PUT /api/admin/users/{user.id}  body: { role, is_active: active }
    onSave({ ...user, role, is_active: active })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         onClick={e => e.target === e.currentTarget && onClose()}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1b2a]/90 backdrop-blur-xl shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={user.avatar} role={user.role} size="lg" />
            <div>
              <h2 className="text-white font-semibold text-lg leading-tight">{user.name}</h2>
              <p className="text-slate-400 text-sm">{user.email}</p>
              <p className="text-slate-500 text-xs mt-0.5">Ingresó: {user.joined}</p>
            </div>
          </div>
          <button onClick={onClose}
                  className="text-slate-500 hover:text-white transition-colors text-xl leading-none">✕</button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Horas voluntariado', value: user.hours },
            { label: 'Eventos asistidos',  value: user.events },
          ].map(s => (
            <div key={s.label}
                 className="rounded-xl border border-white/8 bg-white/5 p-3 text-center">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Cambiar rol */}
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Rol</label>
          <div className="flex gap-2">
            {['user', 'member', 'admin'].map(r => (
              <button key={r}
                      onClick={() => setRole(r)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                        ${role === r
                          ? `bg-gradient-to-br ${ROLE_META[r].color} text-white border-transparent shadow-lg`
                          : 'border-white/10 text-slate-400 hover:border-white/20'}`}>
                {ROLE_META[r].label}
              </button>
            ))}
          </div>
          {/* Explicación de cada rol */}
          <p className="text-xs text-slate-500">
            {role === 'user'   && 'Puede ver eventos y descargar sus certificados.'}
            {role === 'member' && 'Acceso al dashboard completo: tareas, horas, certs, documentación de eventos.'}
            {role === 'admin'  && 'Control total del panel, incluido este módulo.'}
          </p>
        </div>

        {/* Estado activo */}
        <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/5 px-4 py-3">
          <div>
            <p className="text-white text-sm font-medium">Cuenta activa</p>
            <p className="text-slate-400 text-xs">Las cuentas inactivas no pueden iniciar sesión</p>
          </div>
          {/* Toggle */}
          <button onClick={() => setActive(a => !a)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300
                    ${active ? 'bg-blue-500' : 'bg-slate-700'}`}>
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300
              ${active ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400
                             hover:border-white/20 hover:text-white transition-all text-sm">
            Cancelar
          </button>
          <button onClick={handleSave}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500
                             text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-lg">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AdminUsers() {
  const [users, setUsers]       = useState(MOCK_USERS)
  const [search, setSearch]     = useState('')
  const [filterRole, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)   // usuario abierto en modal
  const [toast, setToast]       = useState(null)

  // TODO: al montar → fetch('/api/admin/users').then(r => r.json()).then(setUsers)

  const showToast = msg => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Filtrado local (en prod esto lo hace el backend con query params)
  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase())
      const matchRole   = filterRole === 'all' || u.role === filterRole
      return matchSearch && matchRole
    })
  }, [users, search, filterRole])

  // KPIs
  const stats = useMemo(() => ({
    total:   users.length,
    members: users.filter(u => u.role === 'member' || u.role === 'admin').length,
    users:   users.filter(u => u.role === 'user').length,
    inactive:users.filter(u => !u.is_active).length,
  }), [users])

  // Promover user → member
  const promoteToMember = (userId) => {
    // TODO: POST /api/admin/users/{userId}/promote
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: 'member' } : u))
    showToast('✅ Usuario promovido a Member')
  }

  // Guardar cambios desde el modal
  const handleSave = (updated) => {
    // TODO: PUT /api/admin/users/{updated.id}  body: { role: updated.role, is_active: updated.is_active }
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
    showToast('✅ Usuario actualizado')
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-6 space-y-6">

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-green-500/20 border border-green-500/30
                        text-green-300 text-sm px-4 py-3 backdrop-blur-sm animate-fade-in">
          {toast}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <UserModal user={selected} onClose={() => setSelected(null)} onSave={handleSave} />
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <p className="text-slate-400 text-sm mt-1">
          Administra roles, estados y accesos de todos los usuarios del capítulo.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total usuarios', value: stats.total,    icon: '👥', color: 'from-blue-500/20 to-blue-600/10' },
          { label: 'Members activos',value: stats.members,  icon: '🎓', color: 'from-cyan-500/20 to-cyan-600/10' },
          { label: 'Solo usuarios',  value: stats.users,    icon: '👤', color: 'from-slate-500/20 to-slate-600/10' },
          { label: 'Inactivos',      value: stats.inactive, icon: '🔒', color: 'from-red-500/20 to-red-600/10' },
        ].map(k => (
          <div key={k.label}
               className={`rounded-2xl border border-white/8 bg-gradient-to-br ${k.color} p-4`}>
            <p className="text-2xl mb-1">{k.icon}</p>
            <p className="text-2xl font-bold">{k.value}</p>
            <p className="text-slate-400 text-xs mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5
                       text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>

        {/* Filtro de rol */}
        <div className="flex gap-2">
          {[
            { key: 'all',    label: 'Todos' },
            { key: 'admin',  label: 'Admin' },
            { key: 'member', label: 'Members' },
            { key: 'user',   label: 'Usuarios' },
          ].map(f => (
            <button key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-3 py-2 rounded-xl text-sm transition-all border
                      ${filterRole === f.key
                        ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                        : 'border-white/10 text-slate-400 hover:border-white/20'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
        {/* Cabecera */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3
                        border-b border-white/8 text-xs text-slate-500 uppercase tracking-wider">
          <span>Avatar</span>
          <span>Usuario</span>
          <span className="hidden md:block">Horas</span>
          <span>Rol</span>
          <span>Acción</span>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-sm">
            No se encontraron usuarios con ese filtro.
          </div>
        )}

        {filtered.map((u, i) => (
          <div key={u.id}
               className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-3.5
                           transition-colors hover:bg-white/4 cursor-pointer
                           ${i !== filtered.length - 1 ? 'border-b border-white/5' : ''}
                           ${!u.is_active ? 'opacity-50' : ''}`}
               onClick={() => setSelected(u)}>

            {/* Avatar */}
            <Avatar initials={u.avatar} role={u.role} />

            {/* Info */}
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate flex items-center gap-2">
                {u.name}
                {!u.is_active && <span className="text-red-400 text-xs">(inactivo)</span>}
              </p>
              <p className="text-slate-500 text-xs truncate">{u.email}</p>
              <p className="text-slate-600 text-xs">Desde {u.joined}</p>
            </div>

            {/* Horas */}
            <div className="hidden md:block text-center">
              <p className="text-white text-sm font-medium">{u.hours}h</p>
              <p className="text-slate-500 text-xs">voluntariado</p>
            </div>

            {/* Rol */}
            <RoleBadge role={u.role} />

            {/* Botón rápido: promover */}
            {u.role === 'user' && u.is_active ? (
              <button
                onClick={e => { e.stopPropagation(); promoteToMember(u.id) }}
                className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30
                           text-blue-300 hover:bg-blue-500/25 transition-colors whitespace-nowrap">
                ↑ Promover
              </button>
            ) : (
              <button
                onClick={e => { e.stopPropagation(); setSelected(u) }}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10
                           text-slate-400 hover:text-white transition-colors">
                Editar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Info de roles */}
      <div className="grid md:grid-cols-3 gap-3">
        {Object.entries(ROLE_META).map(([key, meta]) => (
          <div key={key}
               className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${meta.color}`} />
              <p className="text-white text-sm font-medium">{meta.label}</p>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              {key === 'user'   && 'Registro básico. Puede ver eventos disponibles, marcar asistencia y descargar sus certificados.'}
              {key === 'member' && 'Acceso al dashboard de miembros: gestión de tareas, horas de voluntariado, documentación de eventos y certificados avanzados.'}
              {key === 'admin'  && 'Control total del sistema. Puede gestionar usuarios, validar horas, crear eventos y generar certificados masivos.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}