/**
 * MemberEvents.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Vista de eventos para miembros del capítulo.
 *
 * ¿Qué puede hacer un Member aquí?
 *   • Ver todos los eventos (próximos, en curso, pasados)
 *   • Inscribirse / cancelar inscripción a un evento
 *   • Acceder a la documentación del evento: agenda, materiales, links, speakers
 *   • Ver si el evento otorga certificado automático
 *   • Hacer check-in (si el admin ha abierto el check-in)
 *   • Ver si ya asistió y el estado de su certificado
 *
 * CONECTAR CON LARAVEL (Sanctum):
 *   - GET  /api/member/events                → lista de eventos (próximos primero)
 *   - GET  /api/member/events/{id}           → detalle + documentos + speakers
 *   - POST /api/member/events/{id}/register  → inscribirse
 *   - DELETE /api/member/events/{id}/register → cancelar inscripción
 *   - POST /api/member/events/{id}/checkin   → check-in (requiere que admin lo haya abierto)
 *   - GET  /api/member/events/{id}/materials → lista de archivos adjuntos del evento
 *
 * DOCUMENTACIÓN RECOMENDADA:
 *   • Laravel File Storage:    https://laravel.com/docs/filesystem
 *   • React Router (params):   https://reactrouter.com/en/main/hooks/use-params
 *   • date-fns (fechas):       https://date-fns.org/
 *   • React Query:             https://tanstack.com/query/latest
 */

import { useState, useMemo } from 'react'

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: reemplazar con → fetch('/api/member/events').then(r => r.json())
const MOCK_EVENTS = [
  {
    id: 1,
    title: 'IEEE Xtreme 18.0 — Kickoff Meeting',
    date: '2025-09-05',
    time: '18:00',
    location: 'Aula Magna — UNI',
    type: 'competition',
    status: 'upcoming',
    registered: true,
    checkin_open: false,
    attended: false,
    cert_on_attendance: true,
    capacity: 40,
    enrolled: 28,
    cover_color: 'from-orange-500 to-red-600',
    description:
      'Reunión de organización para la competencia internacional IEEE Xtreme 18.0. Se definirán los equipos, se explicarán las reglas del concurso y se distribuirán los materiales de preparación.',
    tags: ['Competencia', 'CP', 'Obligatorio para participantes'],
    agenda: [
      { time: '18:00', item: 'Bienvenida y presentación del capítulo' },
      { time: '18:15', item: 'Reglas y formato de IEEE Xtreme 18.0' },
      { time: '18:45', item: 'Formación de equipos y estrategia' },
      { time: '19:15', item: 'Materiales y recursos de práctica' },
      { time: '19:40', item: 'Q&A y cierre' },
    ],
    speakers: [
      { name: 'Carlos Mendoza', role: 'Presidente IEEE CS UNI', avatar: 'CM' },
      { name: 'Lucía Torres',   role: 'Encargada de Competencias',  avatar: 'LT' },
    ],
    materials: [
      { name: 'Reglas IEEE Xtreme 18.0', type: 'pdf', url: '#' },
      { name: 'Repositorio de práctica', type: 'link', url: '#' },
      { name: 'Slides de la reunión',    type: 'pdf', url: '#' },
    ],
  },
  {
    id: 2,
    title: 'Workshop: Pentesting con Kali Linux',
    date: '2025-08-22',
    time: '16:00',
    location: 'Lab de Cómputo B — UNI',
    type: 'workshop',
    status: 'upcoming',
    registered: false,
    checkin_open: false,
    attended: false,
    cert_on_attendance: true,
    capacity: 25,
    enrolled: 18,
    cover_color: 'from-green-500 to-emerald-700',
    description:
      'Taller práctico de pentesting usando Kali Linux. Se cubrirán técnicas de reconocimiento, escaneo y explotación básica. Prerequisito: conocimientos básicos de redes y Linux.',
    tags: ['Cybersecurity', 'Hands-on', 'Nivel intermedio'],
    agenda: [
      { time: '16:00', item: 'Setup de entornos virtuales' },
      { time: '16:30', item: 'Reconocimiento con Nmap y herramientas OSINT' },
      { time: '17:15', item: 'Explotación básica con Metasploit' },
      { time: '18:00', item: 'CTF challenge en vivo' },
      { time: '18:45', item: 'Cierre y recursos adicionales' },
    ],
    speakers: [
      { name: 'Diego Paredes', role: 'Líder de Cybersecurity Track', avatar: 'DP' },
    ],
    materials: [
      { name: 'Guía de instalación Kali',     type: 'pdf',  url: '#' },
      { name: 'Cheatsheet Nmap',              type: 'pdf',  url: '#' },
      { name: 'VMs para el workshop',         type: 'link', url: '#' },
      { name: 'Recursos post-workshop (THM)', type: 'link', url: '#' },
    ],
  },
  {
    id: 3,
    title: 'Talk: Machine Learning en Producción',
    date: '2025-07-10',
    time: '17:00',
    location: 'Zoom (online)',
    type: 'talk',
    status: 'past',
    registered: true,
    checkin_open: false,
    attended: true,
    cert_on_attendance: false,
    capacity: 100,
    enrolled: 74,
    cover_color: 'from-purple-500 to-violet-700',
    description:
      'Charla sobre buenas prácticas para llevar modelos de ML a producción: CI/CD para datos, monitoreo de drift y orquestación con Airflow.',
    tags: ['ML', 'MLOps', 'Online'],
    agenda: [
      { time: '17:00', item: 'Introducción a MLOps' },
      { time: '17:30', item: 'Demo: pipeline con MLflow' },
      { time: '18:10', item: 'Monitoreo y alertas en producción' },
      { time: '18:40', item: 'Q&A' },
    ],
    speakers: [
      { name: 'Mariana Vega', role: 'Data Engineer — Startup Fintech Lima', avatar: 'MV' },
    ],
    materials: [
      { name: 'Recording del evento', type: 'link', url: '#' },
      { name: 'Slides MLOps',         type: 'pdf',  url: '#' },
    ],
  },
  {
    id: 4,
    title: 'Hackathon Interno — "Build for UNI"',
    date: '2025-10-18',
    time: '08:00',
    location: 'Pabellón de Sistemas — UNI',
    type: 'hackathon',
    status: 'upcoming',
    registered: false,
    checkin_open: false,
    attended: false,
    cert_on_attendance: true,
    capacity: 60,
    enrolled: 12,
    cover_color: 'from-blue-500 to-indigo-700',
    description:
      'Hackathon de 12 horas para crear soluciones tecnológicas para problemáticas de la UNI. Premios para los 3 primeros equipos y certificados para todos los participantes.',
    tags: ['Hackathon', 'Full day', 'Equipos de 3-4'],
    agenda: [
      { time: '08:00', item: 'Apertura y presentación de retos' },
      { time: '08:30', item: 'Inicio del hackathon' },
      { time: '13:00', item: 'Checkpoint intermedio' },
      { time: '18:00', item: 'Presentaciones finales (3 min/equipo)' },
      { time: '19:30', item: 'Premiación y cierre' },
    ],
    speakers: [],
    materials: [
      { name: 'Bases del hackathon', type: 'pdf',  url: '#' },
      { name: 'Retos disponibles',   type: 'link', url: '#' },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_META = {
  competition: { icon: '🏆', label: 'Competencia' },
  workshop:    { icon: '🛠️',  label: 'Workshop' },
  talk:        { icon: '🎙️', label: 'Charla' },
  hackathon:   { icon: '⚡',  label: 'Hackathon' },
}

const STATUS_META = {
  upcoming: { dot: 'bg-green-400 animate-pulse', label: 'Próximo' },
  ongoing:  { dot: 'bg-yellow-400 animate-pulse', label: 'En curso' },
  past:     { dot: 'bg-slate-500', label: 'Finalizado' },
}

const MaterialIcon = ({ type }) =>
  type === 'pdf'  ? <span>📄</span> :
  type === 'link' ? <span>🔗</span> :
  type === 'video'? <span>🎥</span> : <span>📎</span>

// ─── Card de evento (lista) ───────────────────────────────────────────────────
const EventCard = ({ event, onOpen }) => {
  const occupancy = Math.round((event.enrolled / event.capacity) * 100)

  return (
    <div onClick={() => onOpen(event)}
         className="group rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6
                    transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Banda de color superior */}
      <div className={`h-1.5 bg-gradient-to-r ${event.cover_color}`} />

      <div className="p-5 space-y-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg">{TYPE_META[event.type]?.icon}</span>
              <span className="text-xs text-slate-500">{TYPE_META[event.type]?.label}</span>
              <span className={`inline-flex items-center gap-1.5 text-xs`}>
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_META[event.status]?.dot}`} />
                <span className="text-slate-400">{STATUS_META[event.status]?.label}</span>
              </span>
            </div>
            <h3 className="text-white font-semibold leading-tight text-sm sm:text-base">
              {event.title}
            </h3>
          </div>

          {/* Badges right */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            {event.cert_on_attendance && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10
                               border border-yellow-400/25 text-yellow-300">
                🎓 Cert
              </span>
            )}
            {event.attended && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-400/10
                               border border-green-400/25 text-green-300">
                ✓ Asistí
              </span>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
          <span>📅 {event.date} · {event.time}</span>
          <span>📍 {event.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {event.tags.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-slate-400">
              {t}
            </span>
          ))}
        </div>

        {/* Aforo */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Inscriptos</span>
            <span>{event.enrolled}/{event.capacity}</span>
          </div>
          <div className="h-1 w-full bg-white/8 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${event.cover_color} transition-all`}
                 style={{ width: `${occupancy}%` }} />
          </div>
        </div>

        {/* CTA bottom */}
        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-slate-500">Ver agenda y materiales →</span>
          {event.status === 'upcoming' && (
            <span className={`text-xs px-3 py-1 rounded-lg font-medium
              ${event.registered
                ? 'bg-green-500/15 text-green-300 border border-green-500/30'
                : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'}`}>
              {event.registered ? 'Inscripto' : 'Inscribirme'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Modal de detalle del evento ─────────────────────────────────────────────
const EventModal = ({ event, onClose, onRegister }) => {
  const [tab, setTab] = useState('info') // 'info' | 'agenda' | 'materials'

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <div className="relative w-full sm:max-w-2xl max-h-[92dvh] overflow-y-auto
                      rounded-t-3xl sm:rounded-2xl border border-white/10
                      bg-[#0d1b2a]/95 backdrop-blur-xl shadow-2xl">

        {/* Cover */}
        <div className={`h-28 bg-gradient-to-br ${event.cover_color} relative`}>
          <button onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30
                             backdrop-blur-sm flex items-center justify-center
                             text-white/80 hover:text-white transition-colors text-sm">✕</button>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d1b2a]/95 to-transparent" />
        </div>

        <div className="px-6 pb-6 -mt-6 space-y-4">
          {/* Title block */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span>{TYPE_META[event.type]?.icon}</span>
              <span className="text-xs text-slate-400">{TYPE_META[event.type]?.label}</span>
              {event.cert_on_attendance && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10
                                 border border-yellow-400/25 text-yellow-300">🎓 Otorga certificado</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">{event.title}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
              <span>📅 {event.date} · {event.time}</span>
              <span>📍 {event.location}</span>
              <span>👥 {event.enrolled}/{event.capacity} inscritos</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
            {[
              { key: 'info',      label: 'Info' },
              { key: 'agenda',    label: 'Agenda' },
              { key: 'materials', label: 'Materiales' },
            ].map(t => (
              <button key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-all
                        ${tab === t.key
                          ? 'bg-white/10 text-white font-medium'
                          : 'text-slate-500 hover:text-slate-300'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Info */}
          {tab === 'info' && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-slate-400">
                    {t}
                  </span>
                ))}
              </div>

              {/* Speakers */}
              {event.speakers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Speakers</p>
                  <div className="space-y-2">
                    {event.speakers.map(s => (
                      <div key={s.name}
                           className="flex items-center gap-3 p-3 rounded-xl
                                      border border-white/8 bg-white/3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500
                                        flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {s.avatar}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{s.name}</p>
                          <p className="text-slate-400 text-xs">{s.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: Agenda */}
          {tab === 'agenda' && (
            <div className="space-y-2">
              {event.agenda.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-8">
                  Agenda pendiente de publicar.
                </p>
              )}
              {event.agenda.map((item, i) => (
                <div key={i}
                     className="flex gap-4 items-start p-3 rounded-xl border border-white/6 bg-white/3">
                  <span className="text-xs text-blue-400 font-mono font-medium shrink-0 pt-0.5 w-12">
                    {item.time}
                  </span>
                  <p className="text-slate-300 text-sm">{item.item}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Materiales */}
          {tab === 'materials' && (
            <div className="space-y-2">
              {event.materials.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-8">
                  Los materiales estarán disponibles antes del evento.
                </p>
              )}
              {event.materials.map((m, i) => (
                <a key={i} href={m.url} target="_blank" rel="noreferrer"
                   onClick={e => { if (m.url === '#') e.preventDefault() }}
                   className="flex items-center gap-3 p-3.5 rounded-xl border border-white/8
                              bg-white/3 hover:bg-white/6 transition-colors group">
                  <span className="text-xl"><MaterialIcon type={m.type} /></span>
                  <span className="text-slate-300 text-sm flex-1">{m.name}</span>
                  <span className="text-slate-600 group-hover:text-slate-400 transition-colors text-xs">↗</span>
                </a>
              ))}
              {/* Nota sobre materiales protegidos */}
              <p className="text-xs text-slate-600 text-center pt-1">
                Los materiales sólo están disponibles para miembros registrados.
                {/* TODO: validar con token Sanctum en el header de la descarga */}
              </p>
            </div>
          )}

          {/* CTA principal */}
          <div className="pt-2 space-y-2">
            {event.status === 'upcoming' && !event.attended && (
              <button
                onClick={() => onRegister(event.id)}
                className={`w-full py-3 rounded-xl font-medium text-sm transition-all
                  ${event.registered
                    ? 'bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 shadow-lg'}`}>
                {event.registered ? 'Cancelar inscripción' : 'Inscribirme al evento'}
              </button>
            )}

            {event.checkin_open && !event.attended && (
              <button
                className="w-full py-3 rounded-xl font-medium text-sm
                           bg-gradient-to-r from-green-500 to-emerald-500 text-white
                           hover:opacity-90 transition-opacity shadow-lg">
                ✅ Hacer Check-In
                {/* TODO: POST /api/member/events/{event.id}/checkin */}
              </button>
            )}

            {event.attended && (
              <div className="w-full py-3 rounded-xl text-center text-green-300 text-sm
                              bg-green-500/10 border border-green-500/20">
                ✓ Ya asististe a este evento
                {event.cert_on_attendance && ' — tu certificado está disponible en Mis Certificados'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function MemberEvents() {
  const [events, setEvents]       = useState(MOCK_EVENTS)
  const [filter, setFilter]       = useState('all')    // all | upcoming | past
  const [typeFilter, setType]     = useState('all')
  const [selected, setSelected]   = useState(null)
  const [toast, setToast]         = useState(null)

  // TODO: al montar → fetch('/api/member/events', { headers: { Authorization: `Bearer ${token}` } })

  const showToast = msg => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleRegister = (eventId) => {
    // TODO: POST o DELETE /api/member/events/{eventId}/register
    setEvents(prev => prev.map(e =>
      e.id === eventId
        ? { ...e, registered: !e.registered, enrolled: e.enrolled + (e.registered ? -1 : 1) }
        : e
    ))
    const ev = events.find(e => e.id === eventId)
    showToast(ev?.registered ? '❌ Inscripción cancelada' : '✅ Inscripto al evento')
    setSelected(null)
  }

  const filtered = useMemo(() => {
    return events.filter(e => {
      const matchStatus = filter === 'all' || e.status === filter
      const matchType   = typeFilter === 'all' || e.type === typeFilter
      return matchStatus && matchType
    })
  }, [events, filter, typeFilter])

  // Stats rápidas
  const upcoming   = events.filter(e => e.status === 'upcoming').length
  const registered = events.filter(e => e.registered && e.status === 'upcoming').length
  const attended   = events.filter(e => e.attended).length

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-6 space-y-6">

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-blue-500/20 border border-blue-500/30
                        text-blue-200 text-sm px-4 py-3 backdrop-blur-sm">
          {toast}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <EventModal
          event={selected}
          onClose={() => setSelected(null)}
          onRegister={handleRegister}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Eventos del Capítulo</h1>
        <p className="text-slate-400 text-sm mt-1">
          Inscríbete, accede a la documentación y haz check-in desde aquí.
        </p>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Próximos',     value: upcoming,   icon: '📅' },
          { label: 'Mis inscrips.',value: registered, icon: '✋' },
          { label: 'Asistí',       value: attended,   icon: '✅' },
        ].map(s => (
          <div key={s.label}
               className="rounded-2xl border border-white/8 bg-white/3 p-4 text-center">
            <p className="text-xl mb-1">{s.icon}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Estado */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
          {[
            { key: 'all',      label: 'Todos' },
            { key: 'upcoming', label: 'Próximos' },
            { key: 'past',     label: 'Pasados' },
          ].map(f => (
            <button key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all
                      ${filter === f.key
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-slate-500 hover:text-slate-300'}`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Tipo */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
          {[
            { key: 'all',        label: 'Tipo' },
            { key: 'workshop',   label: '🛠️' },
            { key: 'talk',       label: '🎙️' },
            { key: 'competition',label: '🏆' },
            { key: 'hackathon',  label: '⚡' },
          ].map(f => (
            <button key={f.key}
                    onClick={() => setType(f.key)}
                    title={f.key}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all
                      ${typeFilter === f.key
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-slate-500 hover:text-slate-300'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de eventos */}
      {filtered.length === 0 && (
        <div className="py-20 text-center text-slate-500">
          No hay eventos con ese filtro.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(event => (
          <EventCard key={event.id} event={event} onOpen={setSelected} />
        ))}
      </div>

      {/* Nota de certificados */}
      <div className="rounded-xl border border-yellow-400/15 bg-yellow-400/5 p-4
                      flex items-start gap-3">
        <span className="text-yellow-400 text-xl shrink-0">🎓</span>
        <div>
          <p className="text-yellow-200 text-sm font-medium">Certificados automáticos</p>
          <p className="text-yellow-200/60 text-xs mt-0.5 leading-relaxed">
            Los eventos marcados con el badge <strong>Cert</strong> generan tu certificado
            automáticamente cuando el admin confirma tu asistencia.
            Puedes descargarlo desde <em>Mis Certificados</em>.
          </p>
        </div>
      </div>
    </div>
  )
}