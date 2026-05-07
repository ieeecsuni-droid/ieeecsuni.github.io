import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { navLinks } from '../../data'

export function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuAnimating, setMenuAnimating] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { closeMenu() }, [location.pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function openMenu() {
    setMenuOpen(true)
    setMenuAnimating(true)
  }

  function closeMenu() {
    setMenuAnimating(false)
    // Wait for exit animation before unmounting
    const timer = setTimeout(() => setMenuOpen(false), 350)
    return () => clearTimeout(timer)
  }

  const isActive = (to) => location.pathname === to

  return (
    <>
      {/* ─── Main Nav Bar ─── */}
      <nav
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-[200] transition-all"
        style={{
          height: '64px',
          background: scrolled
            ? 'var(--color-nav-surface-scrolled)'
            : 'var(--color-nav-surface)',
          borderBottom: `1px solid ${scrolled
            ? 'var(--color-nav-border-scrolled)'
            : 'var(--color-nav-border)'}`,
          backdropFilter: scrolled ? 'blur(16px) saturate(1.2)' : 'blur(8px)',
          transitionDuration: '450ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* ─── Brand Identity ─── */}
          <Link
            to="/"
            className="flex items-center gap-3 no-underline group shrink-0"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="relative">
              <IEEECSLogo size={32} />
              {/* Subtle ambient glow behind logo */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'radial-gradient(circle, var(--color-accent-blue-dim), transparent 70%)',
                  filter: 'blur(8px)',
                  transitionDuration: '600ms',
                }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-[13px] font-semibold tracking-[0.01em] leading-tight"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
              >
                IEEE CS
              </span>
              <span
                className="font-mono text-[9px] tracking-[0.2em] uppercase leading-tight mt-0.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                UNI Chapter
              </span>
            </div>
          </Link>

          {/* ─── Desktop Navigation ─── */}
          <ul className="hidden lg:flex items-center gap-0.5 list-none absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`nav-link ${isActive(to) ? 'nav-link-active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ─── Right Actions ─── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contacto"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-[12px] font-semibold tracking-wide no-underline transition-all"
              style={{
                background: 'var(--color-accent-blue-dim)',
                color: 'var(--color-accent-blue-hover)',
                border: '1px solid rgba(14, 165, 233, 0.12)',
                transitionDuration: 'var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)'
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-accent-blue-dim)'
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.12)'
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Únete
            </Link>
          </div>

          {/* ─── Mobile Menu Toggle ─── */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer border-none transition-all"
            style={{
              background: menuOpen ? 'rgba(255,255,255,0.04)' : 'transparent',
              transitionDuration: 'var(--transition-base)',
            }}
            onClick={() => menuOpen ? closeMenu() : openMenu()}
            aria-label="Menú de navegación"
            aria-expanded={menuOpen}
          >
            {/* Top line */}
            <span
              className="absolute block w-[18px] h-[1.5px] rounded-full transition-all"
              style={{
                background: 'var(--color-text-secondary)',
                transform: menuAnimating
                  ? 'rotate(45deg) translateY(0)'
                  : 'translateY(-4px)',
                transitionDuration: '350ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            {/* Middle line */}
            <span
              className="absolute block w-[18px] h-[1.5px] rounded-full transition-all"
              style={{
                background: 'var(--color-text-secondary)',
                opacity: menuAnimating ? 0 : 1,
                transform: menuAnimating ? 'scaleX(0)' : 'scaleX(1)',
                transitionDuration: '250ms',
              }}
            />
            {/* Bottom line */}
            <span
              className="absolute block w-[18px] h-[1.5px] rounded-full transition-all"
              style={{
                background: 'var(--color-text-secondary)',
                transform: menuAnimating
                  ? 'rotate(-45deg) translateY(0)'
                  : 'translateY(4px)',
                transitionDuration: '350ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu Panel ─── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[198] lg:hidden"
            style={{
              background: 'rgba(3, 7, 18, 0.6)',
              backdropFilter: 'blur(4px)',
              opacity: menuAnimating ? 1 : 0,
              transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={closeMenu}
          />

          {/* Panel */}
          <div
            ref={menuRef}
            className="fixed top-[64px] left-0 right-0 z-[199] lg:hidden"
            style={{
              background: 'var(--color-nav-surface-scrolled)',
              borderBottom: '1px solid var(--color-nav-border-scrolled)',
              transform: menuAnimating ? 'translateY(0)' : 'translateY(-8px)',
              opacity: menuAnimating ? 1 : 0,
              transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Inner content */}
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map(({ to, label }, i) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => { window.scrollTo(0, 0); closeMenu() }}
                  className="group flex items-center gap-3 py-3 px-4 rounded-lg text-[14px] font-medium no-underline transition-all"
                  style={{
                    color: isActive(to)
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-secondary)',
                    background: isActive(to)
                      ? 'var(--color-nav-active-glow)'
                      : 'transparent',
                    transitionDuration: 'var(--transition-base)',
                    transitionDelay: menuAnimating ? `${i * 40}ms` : '0ms',
                    transform: menuAnimating ? 'translateX(0)' : 'translateX(-12px)',
                    opacity: menuAnimating ? 1 : 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(to)) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(to)) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {/* Active indicator line */}
                  {isActive(to) && (
                    <span
                      className="w-[3px] h-5 rounded-full shrink-0"
                      style={{ background: 'var(--color-nav-active-line)' }}
                    />
                  )}
                  {label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <Link
                  to="/contacto"
                  onClick={() => { window.scrollTo(0, 0); closeMenu() }}
                  className="flex items-center justify-center gap-2 py-3 rounded-lg text-[13px] font-semibold no-underline transition-all"
                  style={{
                    background: 'var(--color-accent-blue-dim)',
                    color: 'var(--color-accent-blue-hover)',
                    border: '1px solid rgba(14, 165, 233, 0.12)',
                    transitionDuration: 'var(--transition-base)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  Únete al capítulo
                </Link>
              </div>
            </div>

            {/* Terminal-style footer */}
            <div
              className="px-6 py-3 flex items-center justify-between"
              style={{ borderTop: '1px solid var(--color-border-subtle)' }}
            >
              <span className="footer-terminal">
                <span className="status-dot" />
                sys.nav.ready
              </span>
              <span className="font-mono text-[9px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                IEEE CS UNI © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  )
}
