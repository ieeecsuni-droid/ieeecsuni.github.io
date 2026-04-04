// src/pages/admin/AdminEvents.jsx
// ============================================================
// ZONA ADMIN — Gestión de Eventos
//
// El admin puede:
//   - Ver todos los eventos (pasados y futuros)
//   - Crear nuevos eventos
//   - Abrir/cerrar el check-in de un evento
//   - Ver en tiempo real quién hizo check-in
//   - Configurar si el evento genera certificado automático
//
// DOCUMENTACIÓN ÚTIL:
//   - Laravel Broadcasting (tiempo real): https://laravel.com/docs/broadcasting
//   - Pusher para Laravel Echo: https://pusher.com/docs/channels/getting_started/javascript
//   - Para tiempo real en check-in: usa Laravel Echo + Pusher o Soketi
//
// CONECTAR CON BACKEND LARAVEL:
//   GET    /api/admin/events                    → lista de eventos
//   POST   /api/admin/events                    → crear evento
//   PATCH  /api/admin/events/:id                → editar evento
//   DELETE /api/admin/events/:id                → eliminar evento
//   PATCH  /api/admin/events/:id/checkin/open   → abrir check-in
//   PATCH  /api/admin/events/:id/checkin/close  → cerrar check-in
//   GET    /api/admin/events/:id/attendees       → lista de asistentes
//
// ENTIDADES BACKEND: events, event_attendances
// ============================================================

import { useState } from 'react'
import {
  GlassCard, PageHeader, PrimaryButton, GhostButton,
  GlassInput, GlassSelect, EmptyState
} from '../../components/layout/UI'

// ── Mock data — reemplazar con fetch a /api/admin/events ──
const mockEventos = [
  {
    id: 1,
    name: 'Taller React + TypeScript',
    date: '2025-04-20',
    lugar: 'Sala Cómputo UNI',
    tipo: 'taller',
    checkinOpen: true,
    autoCert: true,
    asistentes: 12,
    capacidad: 30,
    descripcion: 'Introducción práctica a React con TypeScript desde cero.',
  },
  {
    id: 2,
    name: 'Charla Cybersecurity Perú',
    date: '2025-04-28',
    lugar: 'Auditorio UNI',
    tipo: 'charla',
    checkinOpen: false,
    autoCert: false,
    asistentes: 0,
    capacidad: 100,
    descripcion: 'Especialistas del sector comparten tendencias de seguridad local.',
  },
  {
    id: 3,
    name: 'IEEE Xtreme 2025',
    date: '2025-10-18',
    lugar: 'Online — 24h',
    tipo: 'competencia',
    checkinOpen: false,
    autoCert: true,
    asistentes: 0,
    capacidad: 15,
    descripcion: 'Competencia internacional de programación de 24 horas.',
  },
]

const mockAsistentes = {
  1: [
    { id: 1, name: 'Carlos Ríos',   hora: '09:02' },
    { id: 2, name: 'Lucía Vargas',  hora: '09:08' },
    { id: 3, name: 'Adrián César',  hora: '09:15' },
  ],
}

const TIPO_OPTS = [
  { value: 'taller',     label: 'Taller' },
  { value: 'charla',     label: 'Charla' },
  { value: 'competencia',label: 'Competencia' },
  { value: 'hackathon',  label: 'Hackathon' },
  { value: 'reunion',    label: 'Reunión interna' },
]

const TIPO_COLORS = {
  taller:      { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  charla:      { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  competencia: { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  hackathon:   { color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  reunion:     { color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
}

// ── Modal crear evento ──
function ModalCrearEvento({ onClose, onCrear }) {
  const [form, setForm] = useState({
    name: '', date: '', lugar: '', tipo: 'taller',
    capacidad: '', descripcion: '', autoCert: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: POST /api/admin/events
    // const res = await fetch('/api/admin/events', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') },
    //   body: JSON.stringify(form),
    //   credentials: 'include',
    // })
    onCrear(form)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6 rounded-2xl overflow-y-auto max-h-screen"
        style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-sm font-semibold mb-5" style={{ color: '#e8edf5' }}>Nuevo evento</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput label="Nombre del evento" placeholder="Ej. Taller de Git y GitHub"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <GlassInput label="Fecha" type="date"
              value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            <GlassInput label="Capacidad" type="number" placeholder="30"
              value={form.capacidad} onChange={e => setForm({ ...form, capacidad: e.target.value })} />
          </div>
          <GlassInput label="Lugar" placeholder="Ej. Sala Cómputo UNI / Online"
            value={form.lugar} onChange={e => setForm({ ...form, lugar: e.target.value })} required />
          <GlassSelect label="Tipo de evento" value={form.tipo}
            onChange={e => setForm({ ...form, tipo: e.target.value })} options={TIPO_OPTS} />

          {/* Descripción */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Descripción
            </label>
            <textarea
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Describe el evento..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8edf5' }}
            />
          </div>

          {/* Toggle certificado automático */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setForm({ ...form, autoCert: !form.autoCert })}
              className="w-10 h-5 rounded-full relative transition-all"
              style={{ background: form.autoCert ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                style={{ background: form.autoCert ? '#3b82f6' : 'rgba(255,255,255,0.3)', left: form.autoCert ? '22px' : '2px' }}
              />
            </div>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Generar certificado automático al asistir
            </span>
          </label>

          <div className="flex gap-3 pt-2">
            <PrimaryButton type="submit">Crear evento</PrimaryButton>
            <GhostButton onClick={onClose}>Cancelar</GhostButton>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Panel de asistentes de un evento ──
function PanelAsistentes({ evento, asistentes, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm p-6 rounded-2xl"
        style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#e8edf5' }}>Asistentes</h3>
            <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>{evento.name}</p>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-mono"
            style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}
          >
            {asistentes.length} / {evento.capacidad}
          </span>
        </div>

        {asistentes.length === 0
          ? <p className="text-sm text-center py-6" style={{ color: 'rgba(255,255,255,0.3)' }}>Sin asistentes aún</p>
          : (
            <div className="space-y-2">
              {asistentes.map(a => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}
                    >
                      {a.name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#e8edf5' }}>{a.name}</span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {a.hora}
                  </span>
                </div>
              ))}
            </div>
          )
        }

        {/* Nota tiempo real */}
        <p className="text-xs mt-4 text-center font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
          // En v2: actualización en tiempo real con Laravel Echo
        </p>
        <button onClick={onClose} className="w-full mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default function AdminEvents({ user = { name: 'Admin' }, onNavigate, onLogout }) {
  const [eventos, setEventos] = useState(mockEventos)
  const [showCrear, setShowCrear]           = useState(false)
  const [eventoAsistentes, setEventoAsist] = useState(null)

  const toggleCheckin = (eventoId) => {
    // TODO: PATCH /api/admin/events/:id/checkin/open  o  /close
    setEventos(prev => prev.map(e =>
      e.id === eventoId ? { ...e, checkinOpen: !e.checkinOpen } : e
    ))
  }

  const handleCrear = (form) => {
    // En producción el backend devuelve el evento creado con ID
    const nuevo = { ...form, id: Date.now(), asistentes: 0, checkinOpen: false }
    setEventos(prev => [...prev, nuevo])
  }

  return (

      <div className="max-w-6xl mx-auto animate-fade-up">
        <PageHeader
          title="Eventos"
          subtitle={`${eventos.length} eventos registrados`}
          action={<PrimaryButton onClick={() => setShowCrear(true)}>+ Nuevo evento</PrimaryButton>}
        />

        {eventos.length === 0
          ? <EmptyState icon="📅" title="Sin eventos" description="Crea el primer evento del capítulo." action={<PrimaryButton onClick={() => setShowCrear(true)}>+ Crear evento</PrimaryButton>} />
          : (
            <div className="space-y-3">
              {eventos.map(ev => {
                const tc = TIPO_COLORS[ev.tipo] || TIPO_COLORS.taller
                return (
                  <GlassCard key={ev.id} className="p-5" hover>
                    <div className="flex items-start gap-4">
                      {/* Badge tipo */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: tc.bg }}
                      >
                        <span className="text-lg">
                          {ev.tipo === 'taller' ? '🖥️' : ev.tipo === 'charla' ? '🎤' : ev.tipo === 'competencia' ? '🏆' : ev.tipo === 'hackathon' ? '⚡' : '📋'}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-sm font-semibold" style={{ color: '#e8edf5' }}>{ev.name}</p>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-mono"
                            style={{ background: tc.bg, color: tc.color }}
                          >
                            {TIPO_OPTS.find(t => t.value === ev.tipo)?.label || ev.tipo}
                          </span>
                          {ev.autoCert && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>
                              🎖️ Auto-cert
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          <span className="font-mono">{ev.date}</span>
                          <span>·</span>
                          <span>{ev.lugar}</span>
                          <span>·</span>
                          <span>{ev.asistentes}/{ev.capacidad} asistentes</span>
                        </div>
                        {ev.descripcion && (
                          <p className="text-xs mt-1.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{ev.descripcion}</p>
                        )}
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {/* Abrir/cerrar check-in */}
                        <button
                          onClick={() => toggleCheckin(ev.id)}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                          style={
                            ev.checkinOpen
                              ? { background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }
                              : { background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }
                          }
                        >
                          {ev.checkinOpen ? 'Cerrar check-in' : 'Abrir check-in'}
                        </button>

                        {/* Ver asistentes */}
                        <button
                          onClick={() => setEventoAsist(ev)}
                          className="text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}
                        >
                          Ver asistentes
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          )
        }
      </div>
  )
}