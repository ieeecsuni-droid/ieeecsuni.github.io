import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { navLinks } from '../../data'
import { Menu, X } from 'lucide-react'

const UNILogo = ({ className = "" }) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/d/da/Escudo_UNI.png"
    alt="Logo UNI"
    className={`${className} object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity`}
  />
)

export function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (to) => location.pathname === to

  return (
    <>
      {/* ─── Plan V2: System Control Layer (LeetCode Inspired) ─── */}
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-out flex items-center border-b h-16
          ${scrolled
            ? 'bg-[#05070C]/40 backdrop-blur-xl border-white/[0.12] shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
            : 'bg-[#05070C]/80 backdrop-blur-sm border-white/[0.06]'
          }
        `}
      >
        <div className="relative w-full max-w-[1440px] mx-auto px-8 md:px-12 flex items-center h-full">

          {/* ─── Identity Group (Left) ─── */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center no-underline group shrink-0"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <IEEECSLogo size={28} className="text-white" />
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links (Plan V2 - Absolute Centered) */}
          <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 m-0 p-0 list-none">
            {navLinks.map(({ to, label }) => {
              const active = isActive(to)
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`group relative text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 no-underline py-1
                      ${active ? 'text-white' : 'text-white/40 hover:text-white'}
                    `}
                    style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                  >
                    {label}
                    {/* Elegant active indicator (Expanding Blue Line) */}
                    <span
                      className={`absolute -bottom-2.5 left-0 h-[2px] bg-blue-500 transition-transform origin-center duration-300 ease-out
                        ${active ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* ─── Right Actions (Absolute Right) ─── */}
          <div className="flex items-center gap-6 ml-auto">
            <a 
              href="https://www.uni.edu.pe/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center group no-underline transition-all duration-300 ml-4"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/5 group-hover:border-white/20 transition-all flex items-center justify-center bg-white/[0.02]">
                <UNILogo className="w-6 h-6" />
              </div>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors bg-white/5 rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Panel (Plan V2: Full-Screen Terminal) ─── */}
      <div
        className={`fixed inset-0 z-[200] bg-[#05070C] flex flex-col transition-transform duration-500 ease-out
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <div />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-white/50 hover:text-white bg-white/5 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-12 flex flex-col gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-3xl font-bold tracking-tighter no-underline transition-all
                ${isActive(to) ? 'text-blue-500' : 'text-white/40 hover:text-white'}
              `}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>


      </div>
    </>
  )
}
