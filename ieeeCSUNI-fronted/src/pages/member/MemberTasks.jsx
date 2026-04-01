// src/pages/member/MemberTasks.jsx
// ============================================================
// Gestión de tareas del miembro.
// Vista lista con filtros por estado y proyecto.
// La Vista Kanban está planeada para v2.
//
// CONECTAR CON API:
//   GET    /api/member/tasks              → tareas asignadas al miembro
//   POST   /api/tasks                    → crear tarea (si tiene permiso)
//   PATCH  /api/tasks/:id/status         → cambiar estado
//   DELETE /api/tasks/:id                → eliminar (solo owner o admin)
// ============================================================

import { useState, useMemo } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { GlassCard, Badge, PageHeader, GlassSelect, EmptyState } from '../../components/layout/UI'

const mockTareas = [
  { id: 1, title: 'Diseñar landing page IEEE CS',       status: 'in_progress', due: '2025-04-10', project: 'Web IEEE',     responsable: 'Adrián C.' },
  { id: 2, title: 'Actualizar README del repo',         status: 'pending',     due: '2025-04-15', project: 'Web IEEE',     responsable: 'Adrián C.' },
  { id: 3, title: 'Preparar presentación Xtreme',       status: 'done',        due: '2025-03-30', project: 'IEEE Xtreme',  responsable: 'Adrián C.' },
  { id: 4, title: 'Subir fotos del taller a Drive',    status: 'pending',     due: '2025-04-12', project: 'Comunicación', responsable: 'Adrián C.' },
  { id: 5, title: 'Implementar panel de miembros',     status: 'in_progress', due: '2025-05-01', project: 'Web IEEE',     responsable: 'Adrián C.' },
]

const STATUS_OPTS = [
  { value: 'all',         label: 'Todos los estados' },
  { value: 'pending',     label: 'Pendiente' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'done',        label: 'Completado' },
]

const PROJECT_OPTS = [
  { value: 'all', label: 'Todos los proyectos' },
  ...([...new Set(mockTareas.map(t => t.project))].map(p => ({ value: p, label: p }))),
]

export default function MemberTasks({ user = { name: 'Adrián César' }, onNavigate, onLogout }) {
  const [statusFilter, setStatusFilter]   = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')

  const filtered = useMemo(() => mockTareas.filter(t => {
    const byStatus  = statusFilter  === 'all' || t.status  === statusFilter
    const byProject = projectFilter === 'all' || t.project === projectFilter
    return byStatus && byProject
  }), [statusFilter, projectFilter])

  const handleStatusChange = (taskId, newStatus) => {
    // TODO: PATCH /api/tasks/:id/status  { status: newStatus }
    console.log('Cambiar estado tarea', taskId, 'a', newStatus)
  }

  return (
      <div className="max-w-5xl mx-auto animate-fade-up">
        <PageHeader
          title="Mis tareas"
          subtitle={`${filtered.length} tarea${filtered.length !== 1 ? 's' : ''} encontrada${filtered.length !== 1 ? 's' : ''}`}
        />

        {/* ── Filtros ── */}
        <GlassCard className="p-4 mb-5">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-40">
              <GlassSelect
                label="Estado"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                options={STATUS_OPTS}
              />
            </div>
            <div className="flex-1 min-w-40">
              <GlassSelect
                label="Proyecto"
                value={projectFilter}
                onChange={e => setProjectFilter(e.target.value)}
                options={PROJECT_OPTS}
              />
            </div>
          </div>
        </GlassCard>

        {/* ── Lista de tareas ── */}
        {filtered.length === 0
          ? <EmptyState icon="✅" title="Sin tareas" description="No hay tareas que coincidan con los filtros seleccionados." />
          : (
            <div className="space-y-2">
              {filtered.map(t => (
                <GlassCard key={t.id} className="p-4" hover>
                  <div className="flex items-center gap-4">
                    {/* Indicador de color por estado */}
                    <div
                      className="w-1 h-10 rounded-full flex-shrink-0"
                      style={{
                        background: t.status === 'done' ? '#4ade80' : t.status === 'in_progress' ? '#3b82f6' : '#fbbf24'
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-1 truncate" style={{ color: '#e8edf5' }}>{t.title}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="text-xs px-2 py-0.5 rounded font-mono"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                        >
                          {t.project}
                        </span>
                        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          Límite: {t.due}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge status={t.status} />

                      {/* Cambiar estado rápido — solo muestra acciones útiles según estado actual */}
                      {t.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(t.id, 'in_progress')}
                          className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                          style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}
                        >
                          Iniciar
                        </button>
                      )}
                      {t.status === 'in_progress' && (
                        <button
                          onClick={() => handleStatusChange(t.id, 'done')}
                          className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                          style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}
                        >
                          Completar
                        </button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )
        }

        {/* Nota v2 */}
        <p className="text-xs mt-4 text-center font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
          // Vista Kanban disponible en v2
        </p>
      </div>
  )
}
