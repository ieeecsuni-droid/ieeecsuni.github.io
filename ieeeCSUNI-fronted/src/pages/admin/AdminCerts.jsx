// src/pages/admin/AdminCerts.jsx
// ============================================================
// ZONA ADMIN — Gestión de Certificados
//
// El admin puede:
//   - Ver todos los certificados emitidos por el sistema
//   - Generar certificados individuales para un miembro+evento
//   - Generar certificados masivos para todos los asistentes de un evento
//   - Filtrar por tipo y evento
//
// DOCUMENTACIÓN ÚTIL:
//   - jsPDF (generación PDF en frontend): https://artskydj.github.io/jsPDF/docs/
//   - Alternativa: dejar la generación al backend Laravel y solo descargar
//   - Laravel responses para PDF: https://laravel.com/docs/responses#file-downloads
//
// CONECTAR CON BACKEND LARAVEL:
//   GET    /api/admin/certificates                    → lista todos los certs
//   POST   /api/admin/certificates                    → generar cert individual
//          body: { user_id, event_id, type }
//   POST   /api/admin/certificates/bulk              → cert masivo por evento
//          body: { event_id }
//   GET    /api/admin/certificates/:id/download       → descarga el PDF
//   DELETE /api/admin/certificates/:id               → revocar certificado
//
// ENTIDADES BACKEND: certificates, certificate_templates
// ============================================================
 
import { useState, useMemo } from 'react'
import {
  GlassCard, PageHeader, Badge, PrimaryButton,
  GhostButton, GlassSelect, EmptyState
} from '../../components/layout/UI'
 
// ── Mock data — reemplazar con fetch a /api/admin/certificates ──
const mockCerts = [
  { id: 1, miembro: 'Carlos Ríos',   evento: 'Taller React + TS',         tipo: 'evento',       fecha: '2025-03-15', descargado: true  },
  { id: 2, miembro: 'Lucía Vargas',  evento: 'Taller React + TS',         tipo: 'evento',       fecha: '2025-03-15', descargado: false },
  { id: 3, miembro: 'Adrián César',  evento: 'Voluntariado Feria UNI',    tipo: 'voluntariado', fecha: '2025-03-22', descargado: true  },
  { id: 4, miembro: 'Marco Torres',  evento: 'IEEE Xtreme 2024',          tipo: 'competencia',  fecha: '2024-10-19', descargado: false },
  { id: 5, miembro: 'Ana Flores',    evento: 'Charla Cybersecurity',      tipo: 'evento',       fecha: '2025-04-01', descargado: false },
  { id: 6, miembro: 'Carlos Ríos',   evento: 'IEEE Xtreme 2024',          tipo: 'competencia',  fecha: '2024-10-19', descargado: true  },
]
 
// Eventos disponibles para generación masiva
// Conectar con: GET /api/admin/events?has_attendees=true
const mockEventos = [
  { id: 1, name: 'Taller React + TypeScript' },
  { id: 2, name: 'Charla Cybersecurity' },
  { id: 3, name: 'Voluntariado Feria UNI' },
]
 
// Miembros para generación individual
// Conectar con: GET /api/admin/users?role=member&active=true
const mockMiembros = [
  { id: 1, name: 'Carlos Ríos' },
  { id: 2, name: 'Lucía Vargas' },
  { id: 3, name: 'Adrián César' },
  { id: 4, name: 'Marco Torres' },
]
 
const TIPO_COLORS = {
  evento:       { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)',  color: '#3b82f6',  label: 'Evento' },
  voluntariado: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', color: '#4ade80', label: 'Voluntariado' },
  competencia:  { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)', color: '#fbbf24', label: 'Competencia' },
}
 
const TIPO_OPTS = [
  { value: 'all',         label: 'Todos los tipos' },
  { value: 'evento',      label: 'Evento' },
  { value: 'voluntariado',label: 'Voluntariado' },
  { value: 'competencia', label: 'Competencia' },
]
 
const EVENTO_OPTS = [
  { value: 'all', label: 'Todos los eventos' },
  ...mockEventos.map(e => ({ value: String(e.id), label: e.name })),
]
 
// ── Modal: generar certificado individual ──
function ModalIndividual({ onClose, onGenerate }) {
  const [form, setForm] = useState({ user_id: '', event_id: '', type: 'evento' })
 
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: POST /api/admin/certificates
    // const res = await fetch('/api/admin/certificates', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') },
    //   body: JSON.stringify(form),
    //   credentials: 'include',
    // })
    // const cert = await res.json()
    onGenerate(form)
    onClose()
  }
 
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
        <h3 className="text-sm font-semibold mb-5" style={{ color: '#e8edf5' }}>
          Generar certificado individual
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seleccionar miembro */}
          <GlassSelect
            label="Miembro"
            value={form.user_id}
            onChange={e => setForm({ ...form, user_id: e.target.value })}
            options={[{ value: '', label: 'Seleccionar miembro' }, ...mockMiembros.map(m => ({ value: String(m.id), label: m.name }))]}
          />
          {/* Seleccionar evento */}
          <GlassSelect
            label="Evento"
            value={form.event_id}
            onChange={e => setForm({ ...form, event_id: e.target.value })}
            options={[{ value: '', label: 'Seleccionar evento' }, ...mockEventos.map(ev => ({ value: String(ev.id), label: ev.name }))]}
          />
          {/* Tipo de certificado */}
          <GlassSelect
            label="Tipo"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            options={TIPO_OPTS.filter(o => o.value !== 'all')}
          />
          <div className="flex gap-3 pt-2">
            <PrimaryButton type="submit">Generar</PrimaryButton>
            <GhostButton onClick={onClose}>Cancelar</GhostButton>
          </div>
        </form>
      </div>
    </div>
  )
}
 
// ── Modal: certificados masivos ──
function ModalMasivo({ onClose, onGenerate }) {
  const [eventoId, setEventoId] = useState('')
 
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: POST /api/admin/certificates/bulk  { event_id: eventoId }
    // Esto genera un cert para CADA asistente que hizo check-in en el evento
    onGenerate(eventoId)
    onClose()
  }
 
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
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#e8edf5' }}>
          Generación masiva de certificados
        </h3>
        <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Se generará un certificado para cada asistente registrado en el evento.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassSelect
            label="Evento"
            value={eventoId}
            onChange={e => setEventoId(e.target.value)}
            options={[{ value: '', label: 'Seleccionar evento' }, ...mockEventos.map(ev => ({ value: String(ev.id), label: ev.name }))]}
          />
          <div className="flex gap-3 pt-2">
            <PrimaryButton type="submit">Generar para todos</PrimaryButton>
            <GhostButton onClick={onClose}>Cancelar</GhostButton>
          </div>
        </form>
      </div>
    </div>
  )
}
 
export default function AdminCerts({ user = { name: 'Admin' }, onNavigate, onLogout }) {
  const [certs, setCerts]           = useState(mockCerts)
  const [tipoFilter, setTipoFilter] = useState('all')
  const [eventoFilter, setEventoFilter] = useState('all')
  const [showModalInd, setShowModalInd]   = useState(false)
  const [showModalMas, setShowModalMas]   = useState(false)
 
  const filtered = useMemo(() => certs.filter(c => {
    const byTipo   = tipoFilter   === 'all' || c.tipo === tipoFilter
    // Filtra por nombre de evento (en prod filtra por event_id)
    const eventoName = eventoFilter === 'all' ? true : mockEventos.find(e => String(e.id) === eventoFilter)?.name === c.evento
    return byTipo && eventoName
  }), [certs, tipoFilter, eventoFilter])
 
  const handleDownload = (certId) => {
    // TODO: window.open('/api/admin/certificates/' + certId + '/download', '_blank')
    // Laravel: return response()->download(storage_path('certs/' . $cert->file))
    console.log('Descargar cert:', certId)
  }
 
  const handleRevoke = (certId) => {
    // TODO: DELETE /api/admin/certificates/:id
    setCerts(prev => prev.filter(c => c.id !== certId))
  }
 
  return (
      <div className="max-w-6xl mx-auto animate-fade-up">
        <PageHeader
          title="Certificados"
          subtitle={`${certs.length} certificados emitidos en total`}
          action={
            <div className="flex gap-2">
              <GhostButton onClick={() => setShowModalMas(true)}>
                Masivo por evento
              </GhostButton>
              <PrimaryButton onClick={() => setShowModalInd(true)}>
                + Generar individual
              </PrimaryButton>
            </div>
          }
        />
 
        {/* Filtros */}
        <GlassCard className="p-4 mb-5">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-36">
              <GlassSelect label="Tipo" value={tipoFilter} onChange={e => setTipoFilter(e.target.value)} options={TIPO_OPTS} />
            </div>
            <div className="flex-1 min-w-36">
              <GlassSelect label="Evento" value={eventoFilter} onChange={e => setEventoFilter(e.target.value)} options={EVENTO_OPTS} />
            </div>
          </div>
        </GlassCard>
 
        {/* Tabla de certificados */}
        {filtered.length === 0
          ? <EmptyState icon="🎖️" title="Sin resultados" description="Ajusta los filtros o genera nuevos certificados." />
          : (
            <GlassCard className="p-5">
              <div className="space-y-2">
                {filtered.map(c => {
                  const t = TIPO_COLORS[c.tipo] || TIPO_COLORS.evento
                  return (
                    <div
                      key={c.id}
                      className="flex items-center gap-4 p-4 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {/* Ícono tipo */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: t.bg, border: `1px solid ${t.border}` }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                      </div>
 
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: '#e8edf5' }}>{c.miembro}</p>
                        <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.evento}</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{c.fecha}</p>
                      </div>
 
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-mono flex-shrink-0"
                        style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
                      >
                        {t.label}
                      </span>
 
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-mono flex-shrink-0"
                        style={
                          c.descargado
                            ? { background: 'rgba(74,222,128,0.08)', color: '#4ade80' }
                            : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)' }
                        }
                      >
                        {c.descargado ? 'Descargado' : 'Sin descargar'}
                      </span>
 
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleDownload(c.id)}
                          className="text-xs px-2.5 py-1.5 rounded-lg transition-all"
                          style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.25)' }}
                        >
                          ↓ PDF
                        </button>
                        <button
                          onClick={() => handleRevoke(c.id)}
                          className="text-xs px-2.5 py-1.5 rounded-lg transition-all"
                          style={{ background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}
                        >
                          Revocar
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </GlassCard>
          )
        }
      </div>
  )
}