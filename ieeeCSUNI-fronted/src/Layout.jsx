// src/Layout.jsx
// ============================================================
// Punto de entrada de la app.
// Demo mode: cambia el rol con los botones del header para
// previsualizar cada zona.
//
// EN PRODUCCIÓN:
//   - Elimina los botones de cambio de rol
//   - Conecta `currentUser` con tu sistema de auth (Sanctum)
//   - Usa react-router-dom para el enrutamiento real
//   - El rol viene del JWT / sesión del backend Laravel
//
// RUTAS SUGERIDAS (react-router-dom):
//   /member/*  → DashboardLayout role="member"
//   /admin/*   → DashboardLayout role="admin" (guard: require admin)
//   /user/*    → DashboardLayout role="user"
//   /login     → LoginPage
// ============================================================


import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'

//pages
import HomePage from './pages/HomePage'
import NosotrosPage from './pages/NosotrosPage'
import EventosPage from './pages/EventosPage'
import RecursosPage from './pages/RecursosPage'
import EquipoPage from './pages/EquipoPage'
import ContactoPage from './pages/ContactoPage'
import LoginPage from './pages/LoginPage'
import MemberDashboard from './pages/member/MemberDashboard'
import MemberHours from './pages/member/MemberHours'
import MemberTasks from './pages/member/MemberTasks'
import MemberCerts from './pages/member/MemberCerts'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserDashboard from './pages/user/UserDashboard'
import NotFoundPage from './pages/NotFoundPage'

function Layout() {
  const { pathname } = useLocation()
  const NO_FOOTER_ROUTES = ['/login', '/member', '/admin', '/user']
  const NO_NAVBAR_ROUTES = ['/login', '/member', '/admin', '/user']
  // Verificamos si la ruta actual coincide con las rutas sin footer
  // Usamos startsWith por si hay subrutas en el dashboard
  const isDashboard = !NO_FOOTER_ROUTES.some(r => pathname.startsWith(r))
  const showFooter = !isDashboard

  const isAnotherDashboard = !NO_NAVBAR_ROUTES.some(r => pathname.startsWith(r))
  const showNavbar = !isAnotherDashboard  
  return (
    <>
      { showNavbar && <Navbar /> }
      <main className="min-h-screen">
        <Routes>
          {/* HEROPAGE */}
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/recursos" element={<RecursosPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* MEMBER */}
          <Route path="/member" element={<MemberDashboard/>} />
          <Route path="/member/hours" element={<MemberHours/>} />
          <Route path="/member/tasks" element={<MemberTasks/>} />
          <Route path="/member/certs" element={<MemberCerts/>} />
          {/* ADMIN */}
          <Route path="/admin" element={<AdminDashboard/>} />
          {/* USER */}
          <Route path="/user" element={<UserDashboard/>} />
          {/* NOTFOUNDPAGE 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout