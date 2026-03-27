export function Button({ children, variant = 'primary', onClick, type = 'button', className = '', disabled = false }) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-outline'
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}
