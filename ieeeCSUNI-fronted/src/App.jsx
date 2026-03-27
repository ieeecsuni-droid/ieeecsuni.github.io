import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'

// Pages
import HomePage      from './pages/HomePage'
import NosotrosPage  from './pages/NosotrosPage'
import EventosPage   from './pages/EventosPage'
import RecursosPage  from './pages/RecursosPage'
import EquipoPage    from './pages/EquipoPage'
import ContactoPage  from './pages/ContactoPage'
import LoginPage     from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage  from './pages/NotFoundPage'

// Pages that don't show the main footer
const NO_FOOTER_ROUTES = ['/login', '/dashboard']

function Layout() {
  const { pathname } = useLocation()
  const showFooter = !NO_FOOTER_ROUTES.some(r => pathname.startsWith(r))

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/nosotros"  element={<NosotrosPage />} />
        <Route path="/eventos"   element={<EventosPage />} />
        <Route path="/recursos"  element={<RecursosPage />} />
        <Route path="/equipo"    element={<EquipoPage />} />
        <Route path="/contacto"  element={<ContactoPage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*"          element={<NotFoundPage />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Layout />
      </ToastProvider>
    </AuthProvider>
  )
}
