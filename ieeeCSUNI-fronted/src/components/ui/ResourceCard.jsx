export function ResourceCard({ resource }) {
  const { category, title, excerpt, emoji, gradient, date } = resource
  return (
    <div className="card-base overflow-hidden cursor-pointer hover:shadow-[0_16px_40px_rgba(0,130,200,0.15)]">
      <div
        className="h-36 flex items-center justify-center text-5xl"
        style={{ background: gradient }}
      >
        {emoji}
      </div>
      <div className="p-5">
        <div className="font-mono text-[10px] tracking-[.12em] uppercase mb-2" style={{ color: 'var(--c1)' }}>
          {category}
        </div>
        <h3 className="text-base font-bold mb-2 leading-snug">{title}</h3>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg2)' }}>{excerpt}</p>
      </div>
      <div
        className="px-5 py-3.5 flex justify-between items-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <span className="font-mono text-[11px]" style={{ color: 'var(--fg3)' }}>{date}</span>
        <span className="text-xs font-semibold" style={{ color: 'var(--c1)' }}>Acceder →</span>
      </div>
    </div>
  )
}
