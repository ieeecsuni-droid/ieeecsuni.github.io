// ── HeroTag — animated pill badge shown at top of hero ──────────────────
export function HeroTag({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 rounded-full"
      style={{ border: '1px solid var(--border2)', background: 'rgba(0,170,255,0.06)' }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
        style={{ background: 'var(--c1)' }}
      />
      <span className="font-mono text-[11px] tracking-[.12em] uppercase" style={{ color: 'var(--c1)' }}>
        {children}
      </span>
    </div>
  )
}

// ── StatBar — row of stat boxes ──────────────────────────────────────────
export function StatBar({ stats }) {
  return (
    <div className="flex flex-wrap md:flex-nowrap">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="px-8 py-5"
          style={{
            border: '1px solid var(--border)',
            borderLeft: i === 0 ? '1px solid var(--border)' : 'none',
            borderRadius: i === 0 ? '12px 0 0 12px' : i === stats.length - 1 ? '0 12px 12px 0' : 0,
          }}
        >
          <div className="text-4xl font-black leading-none tracking-tight" style={{ color: 'var(--fg)' }}>
            {s.number}<span style={{ color: 'var(--c1)' }}>{s.suffix}</span>
          </div>
          <div className="font-mono text-[10px] tracking-[.12em] uppercase mt-1" style={{ color: 'var(--fg3)' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── ScrollHint — bouncing scroll indicator ──────────────────────────────
export function ScrollHint() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
    >
      <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
      <div
        className="w-5 h-5 animate-scroll-arrow"
        style={{
          borderRight: '1.5px solid currentColor',
          borderBottom: '1.5px solid currentColor',
          transform: 'rotate(45deg)',
        }}
      />
    </div>
  )
}

// ── Orb — ambient radial glow ────────────────────────────────────────────
export function Orb({ className = '', style = {} }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ filter: 'blur(80px)', ...style }}
    />
  )
}
