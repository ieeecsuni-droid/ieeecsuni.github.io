// src/pages/member/MemberCerts.jsx
// ============================================================
// Certificados del miembro.
// Permite ver y descargar certificados disponibles.
//
// CONECTAR CON API:
//   GET /api/member/certificates          → lista de certificados
//   GET /api/member/certificates/:id/pdf  → descarga del PDF
//   En v2: los PDFs vienen de Cloudinary (URL pública)
//   En v1: el backend genera el PDF y lo sirve como blob
// ============================================================+}
import { GlassCard, PageHeader, PrimaryButton, EmptyState } from '../../components/layout/UI'

const TIPO_COLORS = {
  evento:       { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)',  color: '#3b82f6',  label: 'Evento' },
  voluntariado: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', color: '#4ade80', label: 'Voluntariado' },
  competencia:  { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)', color: '#fbbf24', label: 'Competencia' },
}

const mockCerts = [
  { id: 1, titulo: 'Taller de Ciberseguridad UNI', tipo: 'evento',       fecha: '2025-03-15', disponible: true },
  { id: 2, titulo: 'Voluntariado Feria Vocacional', tipo: 'voluntariado', fecha: '2025-03-22', disponible: true },
  { id: 3, titulo: 'IEEE Xtreme 2024',              tipo: 'competencia',  fecha: '2024-10-19', disponible: false },
]

function CertCard({ cert }) {
  const t = TIPO_COLORS[cert.tipo] || TIPO_COLORS.evento

  const handleDownload = () => {
    // TODO: fetch('/api/member/certificates/' + cert.id + '/pdf')
    //       luego crear blob URL y disparar descarga
    console.log('Descargar certificado:', cert.id)
  }

  return (
    <GlassCard className="p-5" hover>
      <div className="flex items-start justify-between gap-4">
        {/* Ícono de certificado decorativo */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: t.bg, border: `1px solid ${t.border}` }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold mb-1 truncate" style={{ color: '#e8edf5' }}>{cert.titulo}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
            >
              {t.label}
            </span>
            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{cert.fecha}</span>
          </div>
        </div>

        {cert.disponible
          ? (
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 transition-all"
              style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar
            </button>
          )
          : (
            <span className="text-xs px-3 py-1.5 rounded-lg flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }}>
              No disponible
            </span>
          )
        }
      </div>
    </GlassCard>
  )
}

export default function MemberCerts({ user = { name: 'Adrián César' }, onNavigate, onLogout }) {
  return (
      <div className="max-w-4xl mx-auto animate-fade-up">
        <PageHeader
          title="Mis certificados"
          subtitle="Descarga los certificados de tu participación en eventos y actividades."
        />

        {mockCerts.length === 0
          ? <EmptyState icon="🎖️" title="Sin certificados aún" description="Participa en eventos para obtener tu primer certificado." />
          : (
            <div className="space-y-3">
              {mockCerts.map(c => <CertCard key={c.id} cert={c} />)}
            </div>
          )
        }
      </div>
  )
}
