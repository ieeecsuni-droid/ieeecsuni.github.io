// src/components/layout/UI.jsx
// ============================================================
// Primitivas de UI compartidas entre todas las zonas
// ============================================================

const cn = (...classes) => classes.filter(Boolean).join(' ')

const ACCENTS = {
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/25',
    dot: 'bg-blue-400',
    ring: 'focus-visible:ring-blue-400/50',
  },
  green: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/25',
    dot: 'bg-emerald-400',
    ring: 'focus-visible:ring-emerald-400/50',
  },
  amber: {
    text: 'text-amber-300',
    bg: 'bg-amber-500/10',
    border: 'border-amber-300/25',
    dot: 'bg-amber-300',
    ring: 'focus-visible:ring-amber-300/50',
  },
  red: {
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-400/25',
    dot: 'bg-red-400',
    ring: 'focus-visible:ring-red-400/50',
  },
}

const STATUS_MAP = {
  pending: {
    label: 'Pendiente',
    accent: 'amber',
  },
  in_progress: {
    label: 'En progreso',
    accent: 'blue',
  },
  done: {
    label: 'Completado',
    accent: 'green',
  },
  approved: {
    label: 'Aprobado',
    accent: 'green',
  },
  rejected: {
    label: 'Rechazado',
    accent: 'red',
  },
}

// ── GlassCard ──────────────────────────────────────────────

export function GlassCard({
  children,
  className = '',
  onClick,
  hover = false,
  elevated = false,
}) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'border border-white/[0.08]',
        'bg-white/[0.035] backdrop-blur-xl',
        'transition-all duration-300 ease-out',
        elevated && 'shadow-[0_18px_60px_rgba(0,0,0,0.22)]',
        hover &&
          'cursor-pointer hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-[0_20px_70px_rgba(0,0,0,0.28)]',
        onClick &&
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  )
}

// ── StatCard ───────────────────────────────────────────────

export function StatCard({
  label,
  value,
  sublabel,
  accent = 'blue',
  icon,
}) {
  const a = ACCENTS[accent] || ACCENTS.blue

  return (
    <GlassCard hover className="p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
          {label}
        </span>

        {icon && (
          <span
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl border',
              a.bg,
              a.border,
              a.text
            )}
          >
            {icon}
          </span>
        )}
      </div>

      <p className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
        {value}
      </p>

      {sublabel && (
        <p className="mt-1.5 text-sm leading-relaxed text-white/40">
          {sublabel}
        </p>
      )}
    </GlassCard>
  )
}

// ── Badge ──────────────────────────────────────────────────

export function Badge({ status = 'pending', customLabel }) {
  const current = STATUS_MAP[status] || STATUS_MAP.pending
  const a = ACCENTS[current.accent]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'text-[11px] font-mono font-medium uppercase tracking-wider',
        a.bg,
        a.border,
        a.text
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', a.dot)} />
      {customLabel || current.label}
    </span>
  )
}

// ── PageHeader ─────────────────────────────────────────────

export function PageHeader({ title, subtitle, action }) {
  return (
    <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
      <div className="max-w-3xl">
        <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.28em] text-blue-400/80">
          // IEEE CS UNI
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex shrink-0 items-center gap-3">
          {action}
        </div>
      )}
    </header>
  )
}

// ── PrimaryButton ──────────────────────────────────────────

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl',
        'border px-4 py-2.5 text-sm font-semibold',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]',
        disabled
          ? 'cursor-not-allowed border-blue-400/10 bg-blue-500/5 text-blue-300/35'
          : 'border-blue-400/30 bg-blue-500/15 text-blue-300 hover:-translate-y-0.5 hover:border-blue-300/45 hover:bg-blue-500/20 hover:text-blue-200',
        className
      )}
    >
      {children}
    </button>
  )
}

// ── GhostButton ────────────────────────────────────────────

export function GhostButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl',
        'border border-white/10 bg-white/[0.02]',
        'px-4 py-2.5 text-sm font-medium text-white/55',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]',
        disabled
          ? 'cursor-not-allowed opacity-40'
          : 'hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.05] hover:text-white/80',
        className
      )}
    >
      {children}
    </button>
  )
}

// ── EmptyState ─────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  action,
}) {
  return (
    <GlassCard className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-3xl text-white/35">
          {icon}
        </div>
      )}

      <h3 className="text-base font-semibold text-white/70">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/40">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </GlassCard>
  )
}

// ── GlassInput ─────────────────────────────────────────────

export function GlassInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={cn(
          'w-full rounded-xl border border-white/10',
          'bg-white/[0.045] px-4 py-3 text-sm text-slate-100',
          'placeholder:text-white/25',
          'outline-none transition-all duration-300',
          'focus:border-blue-400/45 focus:bg-white/[0.06] focus:ring-2 focus:ring-blue-400/10',
          disabled && 'cursor-not-allowed opacity-45'
        )}
      />
    </div>
  )
}

// ── GlassSelect ────────────────────────────────────────────

export function GlassSelect({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  className = '',
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          'w-full rounded-xl border border-white/10',
          'bg-[#0b1020] px-4 py-3 text-sm text-slate-100',
          'outline-none transition-all duration-300',
          'focus:border-blue-400/45 focus:ring-2 focus:ring-blue-400/10',
          disabled && 'cursor-not-allowed opacity-45'
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}