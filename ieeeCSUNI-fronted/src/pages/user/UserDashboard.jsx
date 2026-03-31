// src/pages/user/UserDashboard.jsx
// ============================================================
// Zona de usuario básico (rol: user).
// Solo puede:
//   - Ver sus eventos registrados
//   - Hacer check-in a eventos (con QR en v2, botón en v1)
//   - Descargar sus certificados
//
// Esta zona es más ligera que la de miembro.
// Acceso con rol 'user' (estudiante que no es miembro activo aún).
//
// CONECTAR CON API:
//   GET  /api/user/events              → eventos del usuario
//   POST /api/user/events/:id/checkin  → marcar asistencia
//   GET  /api/user/certificates        → certificados disponibles
// ============================================================

import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { GlassCard, StatCard, PageHeader, PrimaryButton } from '../../components/layout/UI'

const mockEventos = [
  { id: 1, name: 'Taller de Ciberseguridad',     date: '2025-04-20', lugar: 'Sala Cómputo UNI', checkinOpen: true,  asistio: false, certDisp: false },
  { id: 2, name: 'Charla: Cybersecurity en Perú', date: '2025-03-15', lugar: 'Auditorio UNI',    checkinOpen: false, asistio: true,  certDisp: true  },
  { id: 3, name: 'IEEE Xtreme 2025',              date: '2025-10-18', lugar: 'Online',           checkinOpen: false, asistio: false, certDisp: false },
]

// ── QRModal — muestra un QR fake (en v2 usa una librería real como qrcode.react) ──
function QRModal({ evento, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs p-6 rounded-2xl text-center"
        style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <p className="text-xs font-mono tracking-widest mb-3" style={{ color: 'rgba(59,130,246,0.8)' }}>
          // CHECK-IN QR
        </p>
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>{evento.name}</h3>

        {/* QR placeholder — v1 usa botón, v2 usa qrcode.react para generar el QR real */}
        {/* En v2: import QRCode from 'qrcode.react'; <QRCode value={`checkin:${evento.id}:${userId}`} /> */}
        <div
          className="w-40 h-40 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{ background: 'white' }}
        >
          <svg viewBox="0 0 100 100" width="120" height="120">
            {/* QR decorativo — reemplazar con qrcode.react en v2 */}
            <rect x="10" y="10" width="30" height="30" fill="none" stroke="#000" strokeWidth="4"/>
            <rect x="15" y="15" width="20" height="20" fill="#000"/>
            <rect x="60" y="10" width="30" height="30" fill="none" stroke="#000" strokeWidth="4"/>
            <rect x="65" y="15" width="20" height="20" fill="#000"/>
            <rect x="10" y="60" width="30" height="30" fill="none" stroke="#000" strokeWidth="4"/>
            <rect x="15" y="65" width="20" height="20" fill="#000"/>
            <rect x="45" y="45" width="8" height="8" fill="#000"/>
            <rect x="57" y="45" width="8" height="8" fill="#000"/>
            <rect x="69" y="45" width="8" height="8" fill="#000"/>
            <rect x="45" y="57" width="8" height="8" fill="#000"/>
            <rect x="69" y="57" width="8" height="8" fill="#000"/>
            <rect x="57" y="69" width="8" height="8" fill="#000"/>
            <rect x="81" y="57" width="8" height="8" fill="#000"/>
            <rect x="81" y="69" width="8" height="8" fill="#000"/>
            <rect x="81" y="81" width="8" height="8" fill="#000"/>
          </svg>
        </div>

        <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Muestra este código al encargado del evento.
        </p>

        {/* Botón alternativo v1: check-in manual sin QR */}
        <button
          className="w-full py-2.5 rounded-xl text-sm font-semibold mb-2"
          style={{ background: 'rgba(59,130,246,0.18)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.35)' }}
          onClick={() => {
            // TODO: POST /api/user/events/:id/checkin
            console.log('Check-in evento:', evento.id)
            onClose()
          }}
        >
          Confirmar asistencia
        </button>
        <button onClick={onClose} className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default function UserDashboard({ user = { name: 'Estudiante' }, onNavigate, onLogout }) {
  const [activePath] = useState('/user')
  const [eventos, setEventos] = useState(mockEventos)
  const [qrEvento, setQrEvento] = useState(null)

  const eventosAsistidos = eventos.filter(e => e.asistio).length
  const certsDisp = eventos.filter(e => e.certDisp).length

  const handleCheckin = (eventoId) => {
    setEventos(prev => prev.map(e => e.id === eventoId ? { ...e, asistio: true, checkinOpen: false } : e))
    setQrEvento(null)
  }

  const handleDownloadCert = (eventoId) => {
    // TODO: fetch('/api/user/certificates/' + eventoId + '/pdf') → blob → descarga
    console.log('Descargar certificado del evento:', eventoId)
  }

  return (
    <DashboardLayout role="user" user={user} activePath={activePath} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="max-w-4xl mx-auto animate-fade-up">

        {qrEvento && (
          <QRModal
            evento={qrEvento}
            onClose={() => setQrEvento(null)}
          />
        )}

        <PageHeader
          title={`Hola, ${user.name.split(' ')[0]} 👋`}
          subtitle="Tu panel de eventos y certificados."
        />

        {/* ── Stats breves ── */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            label="Eventos asistidos"
            value={eventosAsistidos}
            sublabel="Este ciclo"
            accent="blue"
          />
          <StatCard
            label="Certificados disponibles"
            value={certsDisp}
            sublabel="Listos para descargar"
            accent="amber"
          />
        </div>

        {/* ── Eventos ── */}
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>Mis eventos</h2>
          <div className="space-y-3">
            {eventos.map(ev => (
              <div
                key={ev.id}
                className="p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold mb-1 truncate" style={{ color: '#e8edf5' }}>{ev.name}</p>
                    <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {ev.date} · {ev.lugar}
                    </p>

                    {/* Estado de asistencia */}
                    <div className="mt-2">
                      {ev.asistio
                        ? <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>✓ Asististe</span>
                        : ev.checkinOpen
                          ? <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>Check-in abierto</span>
                          : <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Próximamente</span>
                      }
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {/* Check-in — abre modal con QR */}
                    {ev.checkinOpen && !ev.asistio && (
                      <button
                        onClick={() => setQrEvento(ev)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/>
                          <path d="M21 16h-3v3"/><path d="M21 21v.01"/>
                        </svg>
                        Check-in
                      </button>
                    )}

                    {/* Descargar certificado */}
                    {ev.certDisp && (
                      <button
                        onClick={() => handleDownloadCert(ev.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Certificado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Nota QR v2 */}
        <p className="text-xs mt-4 text-center font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
          // QR dinámico con qrcode.react disponible en v2
        </p>
      </div>
    </DashboardLayout>
  )
}
