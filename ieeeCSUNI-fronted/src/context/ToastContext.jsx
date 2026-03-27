import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="pointer-events-auto px-5 py-3.5 rounded-xl text-sm font-semibold text-white shadow-2xl border animate-slide-in"
            style={{
              background: t.type === 'error' ? 'rgba(180,40,40,0.95)' : 'rgba(0,90,140,0.95)',
              borderColor: t.type === 'error' ? 'rgba(255,100,100,0.3)' : 'rgba(0,200,255,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
