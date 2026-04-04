// src/pages/admin/AdminVolunteer.jsx
// ============================================================
// ZONA ADMIN — Validación de Horas de Voluntariado
//
// El admin puede:
//   - Ver TODAS las solicitudes de horas (pendientes, aprobadas, rechazadas)
//   - Aprobar o rechazar con comentario
//   - Filtrar por estado y miembro
//   - Ver el progreso de cada miembro hacia su meta anual
//   - Exportar reporte CSV (v2)
//
// DOCUMENTACIÓN ÚTIL:
//   - Para exportar CSV desde Laravel: https://github.com/Maatwebsite/Laravel-Excel
//   - O generación manual: https://laravel.com/docs/responses#file-downloads
//   - papaparse (CSV en frontend v2): https://www.papaparse.com/
//
// CONECTAR CON BACKEND LARAVEL:
//   GET    /api/admin/volunteer-hours              → todas las solicitudes
//          Query params: ?status=pending&user_id=1
//   PATCH  /api/admin/volunteer-hours/:id/approve  → aprobar
//          body: { comentario? }
//   PATCH  /api/admin/volunteer-hours/:id/reject   → rechazar
//          body: { comentario: string (required) }
//   GET    /api/admin/volunteer-hours/export        → exportar CSV (v2)
//   GET    /api/admin/settings?key=volunteer_goal   → meta anual configurable
//   PATCH  /api/admin/settings                      → actualizar meta anual
//          body: { volunteer_goal: 40 }
//
// ENTIDADES BACKEND: volunteer_hours, hour_validations
// ============================================================

import { useState, useMemo } from 'react'
import {
  GlassCard, Badge, PageHeader, GhostButton,
  GlassSelect, StatCard, EmptyState
} from '../../components/layout/UI'

const META_ANUAL = 40 // GET /api/admin/settings?key=volunteer_goal

// Mock — reemplazar con GET /api/admin/volunteer-hours
const mockSolicitudes = [
  { id: 1, miembro: 'Carlos Ríos',   actividad: 'Taller de Python para FCI',        fecha: '2025-04-02', horas: 4, status: 'pending',  comentario: '' },
  { id: 2, miembro: 'Lucía Vargas',  actividad: 'Stand feria tecnológica UNI',      fecha: '2025-04-03', horas: 6, status: 'pending',  comentario: '' },
  { id: 3, miembro: 'Marco Torres',  actividad: 'Soporte técnico congreso FIEE',    fecha: '2025-04-05', horas: 3, status: 'pending',  comentario: '' },
  { id: 4, miembro: 'Adrián César',  actividad: 'Taller de React para miembros',    fecha: '2025-03-15', horas: 3, status: 'approved', comentario: 'Excelente.' },
  { id: 5, miembro: 'Ana Flores',    actividad: 'Diseño de materiales digitales',   fecha: '2025-03-10', horas: 5, status: 'rejected', comentario: 'No aplica como voluntariado del capítulo.' },
  { id: 6, miembro: 'Carlos Ríos',   actividad: 'Reunión de planificación mensual', fecha: '2025-03-22', horas: 2, status: 'approved', comentario: '' },
]

// Progreso por miembro (horas aprobadas) — en prod viene del backend
const mockProgreso = [
  { name: 'Lucía Vargas',  horas: 28 },
  { name: 'Adrián César',  horas: 18 },
  { name: 'Carlos Ríos',   horas: 12 },
  { name: 'Ana Flores',    horas:  6 },
  { name: 'Marco Torres',  horas:  3 },
]

const STATUS_OPTS = [
  { value: 'all',      label: 'Todos' },
  { value: 'pending',  label: 'Pendientes' },
  { value: 'approved', label: 'Aprobadas' },
  { value: 'rejected', label: 'Rechazadas' },
]

const MIEMBRO_OPTS = (solicitudes) => [
  { value: 'all', label: 'Todos los miembros' },
  ...([...new Set(solicitudes.map(s => s.miembro))].map(m => ({ value: m, label: m }))),
]

// ── Fila de solicitud con acciones ──
function SolicitudRow({ s, onApprove, onReject }) {
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [comentario, setComentario]         = useState('')

  return (
    <div
      className="p-4 rounded-xl space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Miembro */}
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}
            >
              {s.miembro.charAt(0)}
            </div>
            <span className="text-xs font-semibold" style={{ color: '#e8edf5' }}>{s.miembro}</span>
          </div>
          <p className="text-sm mb-1 truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.actividad}</p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.fecha}</span>
            <span className="text-sm font-bold font-mono" style={{ color: '#4ade80' }}>{s.horas}h</span>
          </div>
          {/* Comentario existente */}
          {s.comentario && (
            <p className="text-xs mt-1.5 italic" style={{ color: 'rgba(255,255,255,0.3)' }}>
              "{s.comentario}"
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <Badge status={s.status} />
          {/* Acciones solo para pendientes */}
          {s.status === 'pending' && (
            <div className="flex gap-2">
              <button
                onClick={() => onApprove(s.id)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}
              >
                ✓ Aprobar
              </button>
              <button
                onClick={() => setShowRejectForm(!showRejectForm)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}
              >
                ✕ Rechazar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Form rechazo inline */}
      {showRejectForm && (
        <div className="flex gap-2 pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <input
            type="text"
            placeholder="Motivo del rechazo (requerido)..."
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8edf5' }}
          />
          <button
            onClick={() => { onReject(s.id, comentario); setShowRejectForm(false) }}
            className="text-xs px-3 py-2 rounded-lg"
            style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  )
}

export default function AdminVolunteer({ user = { name: 'Admin' }, onNavigate, onLogout }) {
  const [solicitudes, setSolicitudes]     = useState(mockSolicitudes)
  const [statusFilter, setStatusFilter]   = useState('all')
  const [miembroFilter, setMiembroFilter] = useState('all')

  const pendientes = solicitudes.filter(s => s.status === 'pending').length

  const filtered = useMemo(() => solicitudes.filter(s => {
    const byStatus  = statusFilter  === 'all' || s.status  === statusFilter
    const byMiembro = miembroFilter === 'all' || s.miembro === miembroFilter
    return byStatus && byMiembro
  }), [solicitudes, statusFilter, miembroFilter])

  const handleApprove = (id) => {
    // TODO: PATCH /api/admin/volunteer-hours/:id/approve
    setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s))
  }

  const handleReject = (id, comentario) => {
    // TODO: PATCH /api/admin/volunteer-hours/:id/reject  { comentario }
    setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected', comentario } : s))
  }

  const handleExportCSV = () => {
    // TODO v2: fetch('/api/admin/volunteer-hours/export')
    //   Con Laravel Excel: return Excel::download(new HoursExport, 'horas.xlsx')
    //   Docs: https://laravel-excel.com/docs/3.1/exports/
    console.log('Exportar CSV — disponible en v2')
  }

  return (
      <div className="max-w-6xl mx-auto animate-fade-up">
        <PageHeader
          title="Voluntariado"
          subtitle="Validación de horas y progreso del capítulo"
          action={
            <GhostButton onClick={handleExportCSV}>↓ Exportar CSV</GhostButton>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Pendientes"  value={pendientes}                                    accent="amber" />
          <StatCard label="Aprobadas"   value={solicitudes.filter(s => s.status === 'approved').length} accent="green" />
          <StatCard label="Rechazadas"  value={solicitudes.filter(s => s.status === 'rejected').length} accent="red" />
          <StatCard label="Meta anual"  value={`${META_ANUAL}h`} sublabel="Por miembro"       accent="blue" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Lista de solicitudes */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filtros */}
            <GlassCard className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-32">
                  <GlassSelect label="Estado" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} options={STATUS_OPTS} />
                </div>
                <div className="flex-1 min-w-32">
                  <GlassSelect label="Miembro" value={miembroFilter} onChange={e => setMiembroFilter(e.target.value)} options={MIEMBRO_OPTS(solicitudes)} />
                </div>
              </div>
            </GlassCard>

            {filtered.length === 0
              ? <EmptyState icon="⏰" title="Sin solicitudes" description="No hay solicitudes que coincidan con los filtros." />
              : (
                <GlassCard className="p-5">
                  <div className="space-y-3">
                    {filtered.map(s => (
                      <SolicitudRow
                        key={s.id}
                        s={s}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                </GlassCard>
              )
            }
          </div>

          {/* Progreso por miembro */}
          <GlassCard className="p-5 h-fit">
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>
              Progreso por miembro
            </h2>
            <div className="space-y-4">
              {mockProgreso.map(m => {
                const pct   = Math.min(100, Math.round((m.horas / META_ANUAL) * 100))
                const color = pct >= 100 ? '#4ade80' : pct >= 60 ? '#3b82f6' : '#fbbf24'
                return (
                  <div key={m.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium truncate" style={{ color: '#e8edf5' }}>{m.name}</span>
                      <span className="text-xs font-mono ml-2 flex-shrink-0" style={{ color }}>
                        {m.horas}h
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div
                        className="h-1.5 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs mt-4 font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
              // Meta anual configurable via<br/>// PATCH /api/admin/settings
            </p>
          </GlassCard>
        </div>
      </div>
  )
}