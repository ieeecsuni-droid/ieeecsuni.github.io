export function EventCard({ event }) {
  const { type, title, date, time, location, description, tag, emoji, gradient, spotsLeft, spots } = event
  const urgency = spotsLeft <= 5

  return (
    <div className="card-base overflow-hidden group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,130,200,0.15)]">
      {/* Top banner */}
      <div className="p-6 relative overflow-hidden" style={{ background: gradient }}>
        <div className="absolute bottom-[-30px] right-[-30px] w-24 h-24 rounded-full bg-white/[0.03]" />
        <div className="text-4xl mb-3">{emoji}</div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c1)' }} />
          <span className="font-mono text-[10px] tracking-[.15em] uppercase" style={{ color: 'var(--c1)' }}>{type}</span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-white">{title}</h3>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg2)' }}>
            <span>📅</span><span>{date}{time ? ` · ${time}` : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg2)' }}>
            <span>📍</span><span>{location}</span>
          </div>
        </div>
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--fg2)' }}>{description}</p>
        <div className="flex items-center justify-between">
          <span
            className="inline-flex px-3 py-1 rounded-full text-[11px] font-mono"
            style={{ background: 'rgba(0,200,255,0.08)', border: '1px solid rgba(0,200,255,0.2)', color: 'var(--c1)' }}
          >
            {tag}
          </span>
          {spotsLeft !== undefined && (
            <span className={`text-[11px] font-semibold font-mono ${urgency ? 'text-red-400' : ''}`} style={!urgency ? { color: 'var(--fg3)' } : {}}>
              {spotsLeft === 0 ? 'Lleno' : urgency ? `⚡ ${spotsLeft} lugares` : `${spotsLeft}/${spots} lugares`}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
