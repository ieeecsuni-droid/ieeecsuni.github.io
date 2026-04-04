// src/pages/admin/AdminDashboard.jsx
// ============================================================
// Panel de administrador.
// Incluye: stats del capítulo, solicitudes de horas pendientes,
// gestión de usuarios, y reportes de asistencia.
//
// CONECTAR CON API:
//   GET /api/admin/dashboard    → stats generales
//   GET /api/admin/hours?status=pending → solicitudes pendientes
//   PATCH /api/admin/hours/:id/approve  → aprobar
//   PATCH /api/admin/hours/:id/reject   → rechazar
// ============================================================

import { useState } from 'react'
import { GlassCard, StatCard, Badge, PageHeader, PrimaryButton, GhostButton } from '../../components/layout/UI'

const mockStats = {
  totalMiembros:     24,
  solicitudesPend:   5,
  eventosEsteAno:    8,
  certificadosEmit:  47,
}

const mockSolicitudesPend = [
  { id: 1, miembro: 'Carlos Ríos',    actividad: 'Taller de Python para FCI',  fecha: '2025-04-02', horas: 4 },
  { id: 2, miembro: 'Lucía Vargas',   actividad: 'Stand feria tecnológica',     fecha: '2025-04-03', horas: 6 },
  { id: 3, miembro: 'Marco Torres',   actividad: 'Soporte técnico congreso',    fecha: '2025-04-05', horas: 3 },
]

const mockUsuarios = [
  { id: 1, name: 'Carlos Ríos',    email: 'c.rios@uni.edu.pe',    rol: 'member', activo: true,  horas: 12 },
  { id: 2, name: 'Lucía Vargas',   email: 'l.vargas@uni.edu.pe',  rol: 'member', activo: true,  horas: 28 },
  { id: 3, name: 'Marco Torres',   email: 'm.torres@uni.edu.pe',  rol: 'member', activo: false, horas: 6 },
  { id: 4, name: 'Adrián César',   email: 'a.cesar@uni.edu.pe',   rol: 'member', activo: true,  horas: 18 },
]

// ── Componente: fila de solicitud pendiente ──
function HourRequestRow({ req, onApprove, onReject }) {
  const [comentario, setComentario] = useState('')
  const [showReject, setShowReject] = useState(false)

  return (
    <div
      className="p-4 rounded-xl space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold" style={{ color: '#e8edf5' }}>{req.miembro}</p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{req.actividad}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{req.fecha}</span>
            <span className="text-xs font-mono font-semibold" style={{ color: '#4ade80' }}>{req.horas}h</span>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onApprove(req.id)}
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}
          >
            ✓ Aprobar
          </button>
          <button
            onClick={() => setShowReject(!showReject)}
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.22)' }}
          >
            ✕ Rechazar
          </button>
        </div>
      </div>

      {/* Formulario de rechazo con comentario */}
      {showReject && (
        <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <input
            type="text"
            placeholder="Motivo del rechazo..."
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs outline-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#e8edf5',
            }}
          />
          <button
            onClick={() => onReject(req.id, comentario)}
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
          >
            Confirmar rechazo
          </button>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard({ user = { name: 'Admin' }, onNavigate, onLogout }) {
  const [activePath] = useState('/admin')
  const [solicitudes, setSolicitudes] = useState(mockSolicitudesPend)

  const handleApprove = (id) => {
    // TODO: PATCH /api/admin/hours/:id/approve
    setSolicitudes(prev => prev.filter(s => s.id !== id))
    console.log('Aprobar solicitud:', id)
  }

  const handleReject = (id, comentario) => {
    // TODO: PATCH /api/admin/hours/:id/reject  { comentario }
    setSolicitudes(prev => prev.filter(s => s.id !== id))
    console.log('Rechazar solicitud:', id, comentario)
  }

  return (
    
      <div className="max-w-6xl mx-auto animate-fade-up">

        <PageHeader
          title="Panel de administrador"
          subtitle="Gestión general del capítulo IEEE CS UNI"
        />

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Miembros activos"    value={mockStats.totalMiembros}     accent="blue"  sublabel="En el capítulo" />
          <StatCard label="Horas pendientes"    value={mockStats.solicitudesPend}   accent="amber" sublabel="Requieren revisión" />
          <StatCard label="Eventos este año"    value={mockStats.eventosEsteAno}    accent="green" sublabel="Organizados" />
          <StatCard label="Certificados emitidos" value={mockStats.certificadosEmit} accent="green" sublabel="Total histórico" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── Solicitudes de horas pendientes ── */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold" style={{ color: '#e8edf5' }}>
                Horas pendientes de validación
              </h2>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}
              >
                {solicitudes.length} pendientes
              </span>
            </div>

            {solicitudes.length === 0
              ? (
                <div className="py-8 text-center">
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    ✓ Sin solicitudes pendientes
                  </p>
                </div>
              )
              : (
                <div className="space-y-3">
                  {solicitudes.map(s => (
                    <HourRequestRow key={s.id} req={s} onApprove={handleApprove} onReject={handleReject} />
                  ))}
                </div>
              )
            }
          </GlassCard>

          {/* ── Gestión de usuarios ── */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold" style={{ color: '#e8edf5' }}>Miembros</h2>
              <PrimaryButton onClick={() => onNavigate?.('/admin/users')}>
                Gestionar →
              </PrimaryButton>
            </div>

            <div className="space-y-2">
              {mockUsuarios.map(u => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {/* Avatar inicial */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}
                  >
                    {u.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: '#e8edf5' }}>{u.name}</p>
                    <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>
                      {u.horas}h voluntariado
                    </p>
                  </div>

                  {/* Estado activo/inactivo */}
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-mono flex-shrink-0"
                    style={
                      u.activo
                        ? { background: 'rgba(74,222,128,0.1)', color: '#4ade80' }
                        : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }
                    }
                  >
                    {u.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
  )
}
