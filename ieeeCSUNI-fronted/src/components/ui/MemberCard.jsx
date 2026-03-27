export function MemberCard({ member }) {
  const { initials, name, role, bio, gradient } = member
  return (
    <div className="card-base p-7 text-center group">
      <div
        className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-content-center relative overflow-hidden"
        style={{ background: gradient, border: '2px solid rgba(0,170,255,0.25)' }}
      >
        <span
          className="text-2xl font-black text-white relative z-10 w-full text-center"
          style={{ lineHeight: '80px' }}
        >
          {initials}
        </span>
      </div>
      <div className="text-base font-bold mb-1">{name}</div>
      <div
        className="font-mono text-[10px] tracking-[.1em] uppercase mb-3"
        style={{ color: 'var(--c1)' }}
      >
        {role}
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--fg2)' }}>{bio}</p>
    </div>
  )
}
