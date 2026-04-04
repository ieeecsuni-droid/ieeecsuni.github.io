// src/pages/admin/AdminStats.jsx
// ============================================================
// ZONA ADMIN — Estadísticas del Capítulo
//
// El admin puede ver:
//   - KPIs generales: miembros, eventos, horas, certs
//   - Distribución de horas de voluntariado por miembro
//   - Eventos por mes
//   - Estado de tareas del capítulo
//
// DOCUMENTACIÓN ÚTIL:
//   - Recharts (gráficas React): https://recharts.org/en-US/api
//   - Chart.js con React: https://react-chartjs-2.js.org/
//   - Para exportar CSV: https://www.npmjs.com/package/papaparse
//
// CONECTAR CON BACKEND LARAVEL:
//   GET /api/admin/stats                  → KPIs generales
//   GET /api/admin/stats/hours-by-member  → horas por miembro
//   GET /api/admin/stats/events-by-month  → eventos por mes
//   GET /api/admin/stats/tasks-summary    → resumen estado tareas
//   GET /api/admin/stats/export?format=csv → exportar datos (v2)
//
// Tip Laravel: usa Eloquent aggregates (withCount, withSum) para
// armar los stats eficientemente sin N+1 queries.
// Docs: https://laravel.com/docs/eloquent-relationships#counting-related-models
// ============================================================

import { GlassCard, StatCard, PageHeader, GhostButton } from '../../components/layout/UI'

// ── Mock data — reemplazar con fetch a /api/admin/stats ──
const mockKPIs = {
  totalMiembros:    24,
  miembrosActivos:  19,
  totalEventos:      8,
  horasTotales:    312,
  certsEmitidos:    47,
  tareasAbiertas:    6,
}

// Horas por miembro — GET /api/admin/stats/hours-by-member
const mockHorasMiembro = [
  { name: 'Lucía Vargas',   horas: 38, meta: 40 },
  { name: 'Adrián César',   horas: 28, meta: 40 },
  { name: 'Ana Flores',     horas: 22, meta: 40 },
  { name: 'Carlos Ríos',    horas: 18, meta: 40 },
  { name: 'Marco Torres',   horas: 12, meta: 40 },
  { name: 'Diego Luna',     horas:  8, meta: 40 },
]

// Eventos por mes — GET /api/admin/stats/events-by-month
const mockEventosMes = [
  { mes: 'Ene', count: 0 },
  { mes: 'Feb', count: 1 },
  { mes: 'Mar', count: 3 },
  { mes: 'Abr', count: 2 },
  { mes: 'May', count: 0 },
  { mes: 'Jun', count: 1 },
]

// Tareas por estado — GET /api/admin/stats/tasks-summary
const mockTareasSummary = {
  pending:     4,
  in_progress: 6,
  done:       14,
}
const totalTareas = mockTareasSummary.pending + mockTareasSummary.in_progress + mockTareasSummary.done

// ── Mini bar chart sin librería externa (SVG manual) ──
// En v2 reemplaza con <BarChart> de Recharts para más features
function MiniBarChart({ data, maxVal }) {
  const BAR_W  = 28
  const H      = 80
  const GAP    = 8
  const totalW = data.length * (BAR_W + GAP) - GAP

  return (
    <svg width={totalW} height={H + 20} viewBox={`0 0 ${totalW} ${H + 20}`}>
      {data.map((d, i) => {
        const barH = Math.max(4, (d.count / Math.max(maxVal, 1)) * H)
        const x = i * (BAR_W + GAP)
        const y = H - barH
        return (
          <g key={d.mes}>
            {/* Barra */}
            <rect
              x={x} y={y} width={BAR_W} height={barH}
              rx={4}
              fill={barH > 0 ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.05)'}
            />
            {/* Label mes */}
            <text
              x={x + BAR_W / 2} y={H + 14}
              textAnchor="middle"
              fontSize="10"
              fill="rgba(255,255,255,0.35)"
              fontFamily="var(--font-mono)"
            >
              {d.mes}
            </text>
            {/* Valor encima de barra */}
            {d.count > 0 && (
              <text
                x={x + BAR_W / 2} y={y - 4}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(59,130,246,0.8)"
                fontFamily="var(--font-mono)"
              >
                {d.count}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ── Barra de progreso de horas por miembro ──
function HoraRow({ miembro }) {
  const pct = Math.min(100, Math.round((miembro.horas / miembro.meta) * 100))
  const color = pct >= 100 ? '#4ade80' : pct >= 60 ? '#3b82f6' : '#fbbf24'
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium" style={{ color: '#e8edf5' }}>{miembro.name}</span>
        <span className="text-xs font-mono" style={{ color }}>
          {miembro.horas}h / {miembro.meta}h
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
}

// ── Donut chart SVG para tareas ──
// En v2 usa PieChart de Recharts: https://recharts.org/en-US/api/PieChart
function DonutChart({ pending, in_progress, done, total }) {
  const r = 40
  const cx = 60
  const cy = 60
  const circ = 2 * Math.PI * r

  const pctPending    = pending     / total
  const pctProgress   = in_progress / total
  const pctDone       = done        / total

  // Calcula los segmentos del donut
  const segments = [
    { pct: pctDone,     color: '#4ade80', offset: 0 },
    { pct: pctProgress, color: '#3b82f6', offset: pctDone },
    { pct: pctPending,  color: '#fbbf24', offset: pctDone + pctProgress },
  ]

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {segments.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth="16"
          strokeDasharray={`${s.pct * circ} ${circ}`}
          strokeDashoffset={-s.offset * circ}
          transform="rotate(-90, 60, 60)"
          opacity="0.85"
        />
      ))}
      {/* Texto central */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="#e8edf5" fontFamily="var(--font-sans)">
        {total}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-mono)">
        TAREAS
      </text>
    </svg>
  )
}

export default function AdminStats({ user = { name: 'Admin' }, onNavigate, onLogout }) {
  const handleExportCSV = () => {
    // TODO v2: fetch('/api/admin/stats/export?format=csv')
    //   .then(res => res.blob())
    //   .then(blob => {
    //     const url = URL.createObjectURL(blob)
    //     const a = document.createElement('a')
    //     a.href = url; a.download = 'stats.csv'; a.click()
    //   })
    console.log('Exportar CSV — disponible en v2')
  }

  return (
      <div className="max-w-6xl mx-auto animate-fade-up">
        <PageHeader
          title="Estadísticas"
          subtitle="Vista general del capítulo IEEE CS UNI"
          action={
            <GhostButton onClick={handleExportCSV}>
              ↓ Exportar CSV
            </GhostButton>
          }
        />

        {/* ── KPIs principales ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard label="Miembros activos"   value={mockKPIs.miembrosActivos}  sublabel={`de ${mockKPIs.totalMiembros} registrados`} accent="blue" />
          <StatCard label="Eventos organizados" value={mockKPIs.totalEventos}     sublabel="Este año" accent="green" />
          <StatCard label="Horas voluntariado"  value={`${mockKPIs.horasTotales}h`} sublabel="Total acumulado del capítulo" accent="green" />
          <StatCard label="Certificados emitidos" value={mockKPIs.certsEmitidos}  sublabel="Histórico" accent="amber" />
          <StatCard label="Tareas abiertas"    value={mockKPIs.tareasAbiertas}   sublabel="Pendientes + en progreso" accent="amber" />
          <StatCard label="Tasa de actividad"  value={`${Math.round((mockKPIs.miembrosActivos/mockKPIs.totalMiembros)*100)}%`} sublabel="Miembros con actividad" accent="blue" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* Horas por miembro */}
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>
              Horas de voluntariado por miembro
            </h2>
            <div className="space-y-4">
              {mockHorasMiembro.map(m => <HoraRow key={m.name} miembro={m} />)}
            </div>
            <p className="text-xs mt-4 font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
              // Conectar con GET /api/admin/stats/hours-by-member
            </p>
          </GlassCard>

          {/* Resumen tareas + eventos por mes */}
          <div className="space-y-5">

            {/* Donut tareas */}
            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>Estado de tareas</h2>
              <div className="flex items-center gap-6">
                <DonutChart {...mockTareasSummary} total={totalTareas} />
                <div className="space-y-2">
                  {[
                    { label: 'Completadas', count: mockTareasSummary.done,        color: '#4ade80' },
                    { label: 'En progreso', count: mockTareasSummary.in_progress, color: '#3b82f6' },
                    { label: 'Pendientes',  count: mockTareasSummary.pending,     color: '#fbbf24' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.label}</span>
                      <span className="text-xs font-mono ml-auto" style={{ color: item.color }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs mt-3 font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
                // Conectar con GET /api/admin/stats/tasks-summary
              </p>
            </GlassCard>

            {/* Bar chart eventos por mes */}
            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>Eventos por mes</h2>
              <div className="flex justify-center">
                <MiniBarChart data={mockEventosMes} maxVal={Math.max(...mockEventosMes.map(d => d.count))} />
              </div>
              <p className="text-xs mt-2 font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
                // Conectar con GET /api/admin/stats/events-by-month
                {/* En v2: reemplazar este SVG manual con Recharts BarChart */}
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    
  )
}