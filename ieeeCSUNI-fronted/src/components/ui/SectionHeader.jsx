export function SectionLabel({ children }) {
  return (
    <div className="sec-label">
      <span>{children}</span>
    </div>
  )
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`sec-title ${className}`}>
      {children}
    </h2>
  )
}
