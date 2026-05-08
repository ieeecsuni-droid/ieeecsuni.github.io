import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { navLinks } from '../../data'
import { Menu, X } from 'lucide-react'

const UNILogo = ({ className = '' }) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/d/da/Escudo_UNI.png"
    alt="Logo UNI"
    className={`${className} object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
  />
)

export function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (to) => location.pathname === to

  const scrollTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center border-b transition-all duration-500 ease-out
          ${
            scrolled
              ? 'h-16 bg-[#02040A]/82 backdrop-blur-2xl border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
              : 'h-24 bg-transparent border-transparent'
          }
        `}
      >
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-16 flex items-center justify-between h-full">
          {/* ─── Identity Left ─── */}
          <div className="flex-1 flex justify-start">
            <Link
              to="/"
              className="flex items-center gap-4 group shrink-0 no-underline"
              onClick={scrollTop}
              aria-label="Ir al inicio"
            >
              <div className="flex items-center justify-center transition-all duration-300 group-hover:scale-[1.04] group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.35)]">
                <IEEECSLogo
                  size={scrolled ? 28 : 34}
                  className="text-white/90 group-hover:text-white transition-colors duration-300"
                />
              </div>
            </Link>
          </div>

          {/* ─── Nav Links Center ─── */}
          <ul className="hidden lg:flex items-center gap-10 m-0 p-0 list-none">
            {navLinks.map(({ to, label }) => {
              const active = isActive(to)

              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={scrollTop}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative py-1 text-[10px] font-ibm-plex font-bold uppercase tracking-[0.25em] no-underline transition-all duration-300
                      ${
                        active
                          ? 'text-blue-400'
                          : 'text-white/32 hover:text-white/80'
                      }
                    `}
                  >
                    {label}

                    <span
                      className={`absolute -bottom-2 left-1/2 h-[1px] -translate-x-1/2 bg-blue-400 transition-all duration-300 ease-out
                        ${
                          active
                            ? 'w-full opacity-100'
                            : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                        }
                      `}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* ─── Actions Right ─── */}
          <div className="flex-1 flex justify-end items-center gap-8">
            <a
              href="https://www.uni.edu.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center group no-underline transition-all duration-300"
              aria-label="Visitar sitio web de la UNI"
            >
              <div className="w-9 h-9 border border-white/[0.06] group-hover:border-blue-400/30 transition-all duration-300 flex items-center justify-center bg-white/[0.015] group-hover:bg-white/[0.03]">
                <UNILogo className="w-6 h-6" />
              </div>
            </a>

            <button
              type="button"
              className="lg:hidden p-3 text-white/55 hover:text-white transition-all duration-300 bg-white/[0.04] hover:bg-white/[0.07] active:scale-95"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Panel ─── */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex flex-col transition-all duration-500 ease-[0.16,1,0.3,1]
          ${
            menuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
      >
        <div className="flex items-center justify-between p-10">
          <IEEECSLogo size={32} className="text-blue-500/25" />

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="w-12 h-12 flex items-center justify-center text-white/35 hover:text-white bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-full transition-all duration-300"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 px-12 py-16 flex flex-col justify-center gap-12">
          {navLinks.map(({ to, label }, i) => {
            const active = isActive(to)

            return (
              <motion.div
                key={to}
                initial={false}
                animate={
                  menuOpen
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -24 }
                }
                transition={{
                  delay: menuOpen ? i * 0.075 + 0.15 : 0,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  to={to}
                  className={`block text-5xl font-space-grotesk font-bold tracking-tighter no-underline transition-all duration-300
                    ${
                      active
                        ? 'text-blue-400'
                        : 'text-white/20 hover:text-white'
                    }
                  `}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="p-12 border-t border-white/[0.06]">
          <span className="font-ibm-plex text-[9px] text-white/12 uppercase tracking-[0.5em] font-bold">
            LIMA_UNI // SYSTEMS_OBSERVATORY
          </span>
        </div>
      </div>
    </>
  )
}