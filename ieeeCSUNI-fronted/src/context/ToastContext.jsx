import {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react'

const ToastContext = createContext(null)

const cn = (...classes) => classes.filter(Boolean).join(' ')

const TOAST_CONFIG = {
  success: {
    title: 'Operación completada',
    Icon: CheckCircle2,
    accent: 'text-emerald-300',
    border: 'border-emerald-400/25',
    glow: 'bg-emerald-400/10',
    bar: 'bg-emerald-300',
  },
  error: {
    title: 'Algo salió mal',
    Icon: XCircle,
    accent: 'text-red-300',
    border: 'border-red-400/25',
    glow: 'bg-red-400/10',
    bar: 'bg-red-300',
  },
  warning: {
    title: 'Revisa esto',
    Icon: AlertTriangle,
    accent: 'text-amber-300',
    border: 'border-amber-300/25',
    glow: 'bg-amber-300/10',
    bar: 'bg-amber-300',
  },
  info: {
    title: 'Información',
    Icon: Info,
    accent: 'text-blue-300',
    border: 'border-blue-400/25',
    glow: 'bg-blue-400/10',
    bar: 'bg-blue-300',
  },
}

function ToastCard({ toast, onClose }) {
  const config = TOAST_CONFIG[toast.type] || TOAST_CONFIG.success
  const Icon = config.Icon

  return (
    <div
      className={cn(
        'group pointer-events-auto relative w-[min(380px,calc(100vw-2rem))]',
        'overflow-hidden rounded-2xl border bg-[#050914]/88',
        'px-4 py-4 pr-12 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]',
        'backdrop-blur-2xl',
        'animate-toast-in',
        config.border
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div
        className={cn(
          'pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl',
          config.glow
        )}
      />

      <div className="relative z-10 flex gap-3">
        <div
          className={cn(
            'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]',
            config.accent
          )}
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'font-space-grotesk text-[11px] font-bold uppercase tracking-[0.22em]',
              config.accent
            )}
          >
            {toast.title || config.title}
          </p>

          <p className="mt-1.5 text-sm font-medium leading-relaxed text-white/72">
            {toast.msg}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificación"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-white/30 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
      >
        <X size={15} />
      </button>

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/[0.06]">
        <div
          className={cn('h-full origin-left animate-toast-progress', config.bar)}
          style={{ animationDuration: `${toast.duration}ms` }}
        />
      </div>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((msg, type = 'success', options = {}) => {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`

    const duration = options.duration || 4000

    const newToast = {
      id,
      msg,
      type,
      title: options.title,
      duration,
    }

    setToasts((current) => [...current.slice(-3), newToast])

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      <style>{`
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes toast-progress {
          from {
            transform: scaleX(1);
          }

          to {
            transform: scaleX(0);
          }
        }

        .animate-toast-in {
          animation: toast-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-toast-progress {
          animation-name: toast-progress;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)