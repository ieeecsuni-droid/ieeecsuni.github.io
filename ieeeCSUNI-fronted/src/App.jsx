import { useState, useEffect } from 'react'
import { ToastProvider } from './context/ToastContext'
import Layout from './Layout'
import { AppLoader } from './components/ui/AppLoader'
import './globals.css' 

function App() {
  const [isBooting, setIsBooting] = useState(true)

  // Deshabilitar scroll mientras carga
  useEffect(() => {
    if (isBooting) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isBooting])

  return (
    <ToastProvider>
      {isBooting && <AppLoader onComplete={() => setIsBooting(false)} />}
      <Layout />
    </ToastProvider>
  )
}

export default App