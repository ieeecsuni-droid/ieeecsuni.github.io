// src/pages/admin/AdminTasks.jsx
// ============================================================
// ZONA ADMIN — Gestión de Tareas del Capítulo
//
// El admin puede:
//   - Ver todas las tareas del capítulo (de todos los miembros)
//   - Crear nuevas tareas y asignarlas a miembros
//   - Editar/eliminar tareas
//   - Cambiar estado de cualquier tarea
//   - Filtrar por proyecto, responsable y estado
//
// DOCUMENTACIÓN ÚTIL:
//   - React state management para forms: https://react.dev/learn/managing-state
//   - Para arrastrar tareas (Kanban v2): https://dndkit.com/
//
// CONECTAR CON BACKEND LARAVEL:
//   GET    /api/admin/tasks                    → todas las tareas
//   POST   /api/admin/tasks                    → crear tarea
//          body: { title, project, assignee_id, due_date, description }
//   PATCH  /api/admin/tasks/:id                → editar tarea
//   PATCH  /api/admin/tasks/:id/status         → cambiar estado
//          body: { status: 'pending' | 'in_progress' | 'done' }
//   DELETE /api/admin/tasks/:id                → eliminar tarea
//   GET    /api/admin/tasks/assignments        → historial de asignaciones
//
// ENTIDADES BACKEND: tasks, task_assignments
// ============================================================

import { useState, useMemo } from 'react'
import {
  GlassCard, Badge, PageHeader, PrimaryButton, GhostButton,
  GlassInput, GlassSelect, EmptyState
} from '../../components/layout/UI'

const mockMiembros = [
  { id: 1, name: 'Carlos Ríos' },
  { id: 2, name: 'Lucía Vargas' },
  { id: 3, name: 'Adrián César' },
  { id: 4, name: 'Marco Torres' },
  { id: 5, name: 'Ana Flores' },
]

// Mock — reemplazar con GET /api/admin/tasks
const mockTareas = [
  { id: 1, title: 'Diseñar landing page IEEE CS',     status: 'in_progress', due: '2025-04-10', project: 'Web IEEE',     responsable: 'Adrián César',  desc: 'Hero, about, eventos, contacto.' },
  { id: 2, title: 'Actualizar README del repo',       status: 'pending',     due: '2025-04-15', project: 'Web IEEE',     responsable: 'Carlos Ríos',   desc: '' },
  { id: 3, title: 'Preparar presentación Xtreme',    status: 'done',        due: '2025-03-30', project: 'IEEE Xtreme',  responsable: 'Lucía Vargas',  desc: 'Diapositivas y guía para el equipo.' },
  { id: 4, title: 'Subir fotos taller a Drive',      status: 'pending',     due: '2025-04-12', project: 'Comunicación', responsable: 'Ana Flores',    desc: '' },
  { id: 5, title: 'Implementar panel de miembros',   status: 'in_progress', due: '2025-05-01', project: 'Web IEEE',     responsable: 'Adrián César',  desc: 'Dashboard + módulo de horas.' },
]

const STATUS_OPTS = [
  { value: 'all',         label: 'Todos los estados' },
  { value: 'pending',     label: 'Pendiente' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'done',        label: 'Completado' },
]

function ModalCrearTarea({ onClose, onCreate }) {
  const [form, setForm] = useState({ title: '', project: '', assignee_id: '', due_date: '', desc: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: POST /api/admin/tasks
    onCreate(form)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6 rounded-2xl"
        style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-sm font-semibold mb-5" style={{ color: '#e8edf5' }}>Nueva tarea</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput label="Título" placeholder="Describe brevemente la tarea"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <GlassInput label="Proyecto" placeholder="Ej. Web IEEE"
              value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} required />
            <GlassInput label="Fecha límite" type="date"
              value={form.due_date} onChange={e => setForm({ ...form, due_date: e.target.value })} />
          </div>
          <GlassSelect
            label="Asignar a"
            value={form.assignee_id}
            onChange={e => setForm({ ...form, assignee_id: e.target.value })}
            options={[{ value: '', label: 'Seleccionar miembro' }, ...mockMiembros.map(m => ({ value: String(m.id), label: m.name }))]}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Descripción</label>
            <textarea
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              placeholder="Detalles adicionales..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8edf5' }}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <PrimaryButton type="submit">Crear tarea</PrimaryButton>
            <GhostButton onClick={onClose}>Cancelar</GhostButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminTasks({ user = { name: 'Admin' }, onNavigate, onLogout }) {
  const [tareas, setTareas]               = useState(mockTareas)
  const [statusFilter, setStatusFilter]   = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  const [showModal, setShowModal]         = useState(false)

  const proyectos = [...new Set(tareas.map(t => t.project))]
  const proyectoOpts = [
    { value: 'all', label: 'Todos los proyectos' },
    ...proyectos.map(p => ({ value: p, label: p })),
  ]

  const filtered = useMemo(() => tareas.filter(t => {
    const s = statusFilter  === 'all' || t.status  === statusFilter
    const p = projectFilter === 'all' || t.project === projectFilter
    return s && p
  }), [tareas, statusFilter, projectFilter])

  const handleStatusChange = (taskId, newStatus) => {
    // TODO: PATCH /api/admin/tasks/:id/status  { status: newStatus }
    setTareas(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }

  const handleDelete = (taskId) => {
    // TODO: DELETE /api/admin/tasks/:id
    setTareas(prev => prev.filter(t => t.id !== taskId))
  }

  const handleCreate = (form) => {
    const responsable = mockMiembros.find(m => String(m.id) === form.assignee_id)?.name || 'Sin asignar'
    setTareas(prev => [...prev, {
      id: Date.now(), title: form.title, project: form.project,
      status: 'pending', due: form.due_date, responsable, desc: form.desc,
    }])
  }

  return (
      <div className="max-w-6xl mx-auto animate-fade-up">
        <PageHeader
          title="Tareas del capítulo"
          subtitle={`${filtered.length} tareas visibles`}
          action={<PrimaryButton onClick={() => setShowModal(true)}>+ Nueva tarea</PrimaryButton>}
        />

        {/* Filtros */}
        <GlassCard className="p-4 mb-5">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-36">
              <GlassSelect label="Estado" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} options={STATUS_OPTS} />
            </div>
            <div className="flex-1 min-w-36">
              <GlassSelect label="Proyecto" value={projectFilter} onChange={e => setProjectFilter(e.target.value)} options={proyectoOpts} />
            </div>
          </div>
        </GlassCard>

        {filtered.length === 0
          ? <EmptyState icon="✅" title="Sin tareas" description="Crea la primera tarea del capítulo." />
          : (
            <div className="space-y-2">
              {filtered.map(t => (
                <GlassCard key={t.id} className="p-4" hover>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-1 h-12 rounded-full flex-shrink-0 mt-0.5"
                      style={{ background: t.status === 'done' ? '#4ade80' : t.status === 'in_progress' ? '#3b82f6' : '#fbbf24' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-1" style={{ color: '#e8edf5' }}>{t.title}</p>
                      <div className="flex flex-wrap gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <span className="font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>{t.project}</span>
                        <span>👤 {t.responsable}</span>
                        {t.due && <span className="font-mono">Límite: {t.due}</span>}
                      </div>
                      {t.desc && <p className="text-xs mt-1.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.desc}</p>}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge status={t.status} />

                      {/* Cambio rápido de estado */}
                      <select
                        value={t.status}
                        onChange={e => handleStatusChange(t.id, e.target.value)}
                        className="text-xs px-2 py-1 rounded-lg outline-none"
                        style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="in_progress">En progreso</option>
                        <option value="done">Completado</option>
                      </select>

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-xs px-2.5 py-1.5 rounded-lg"
                        style={{ background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '1px solid rgba(248,113,113,0.18)' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )
        }
        <p className="text-xs mt-4 text-center font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
          // Vista Kanban con drag & drop (dnd-kit) disponible en v2
        </p>
      </div>
    
  )
}