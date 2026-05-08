import { Link } from 'react-router-dom'
import {
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  MessageCircle,
  ArrowUpRight,
  Github,
} from 'lucide-react'

const socials = [
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/ieee-cs-uni-sb/', title: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/ieee.cs.uni/', title: 'Instagram' },
  { Icon: Youtube, href: 'https://www.youtube.com/@IEEE-CS-UNI', title: 'YouTube' },
  { Icon: Github, href: 'https://github.com/ieee-cs-uni', title: 'GitHub' },
  { Icon: MessageCircle, href: 'https://www.whatsapp.com/channel/0029Vb7ULtl9MF99Felbfi1c', title: 'WhatsApp' },
  { Icon: Mail, href: 'mailto:ieeecs@uni.edu.pe', title: 'Email' },
]

const footerSections = {
  NAVEGACIÓN: [
    { label: 'Inicio', to: '/' },
    { label: 'Proyectos', to: '/proyectos' },
    { label: 'Eventos', to: '/eventos' },
    { label: 'Nosotros', to: '/nosotros' },
  ],
  ÁREAS: [
    { label: 'AI & ML', to: '/recursos' },
    { label: 'Ciberseguridad', to: '/eventos' },
    { label: 'Software', to: '/proyectos' },
    { label: 'Programación competitiva', to: '/proyectos' },
  ],
  COMUNIDAD: [
    { label: 'Únete', to: '/contacto' },
    { label: 'Equipo', to: '/equipo' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contacto', to: '/contacto' },
  ],
}

const scrollTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="main-footer"
      className="relative w-full overflow-hidden border-t border-white/[0.08] bg-[#02040A] text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-blue-500/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-20">
        {/* Top */}
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          {/* Brand */}
          <div>
            <p className="mb-4 text-[10px] font-ibm-plex font-bold uppercase tracking-[0.35em] text-blue-400/80">
              IEEE CS UNI
            </p>

            <h3 className="max-w-xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              IEEE Computer Society
            </h3>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
              Capítulo estudiantil de la Universidad Nacional de Ingeniería.
              Formamos una comunidad enfocada en ingeniería, investigación,
              programación competitiva y construcción de software con impacto.
            </p>

            {/* Social links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map(({ Icon, href, title }) => (
                <a
                  key={title}
                  href={href}
                  title={title}
                  aria-label={title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-white/45 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/[0.08] hover:text-blue-300"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {Object.entries(footerSections).map(([title, links]) => (
              <div key={title}>
                <h4 className="mb-5 text-[10px] font-ibm-plex font-bold uppercase tracking-[0.28em] text-blue-400/80">
                  {title}
                </h4>

                <ul className="space-y-3.5">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        onClick={scrollTop}
                        className="group inline-flex items-center gap-2 text-sm font-medium text-white/48 no-underline transition-colors duration-300 hover:text-white"
                      >
                        <span>{label}</span>
                        <span className="h-px w-0 bg-blue-400/80 transition-all duration-300 group-hover:w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent md:my-14" />

        {/* Bottom */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs text-white/38">
              © {year} IEEE Computer Society • UNI
            </p>
            <p className="mt-1 text-xs text-white/25">
              Lima, Perú · Universidad Nacional de Ingeniería
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://computer.org"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/45 no-underline transition-colors duration-300 hover:text-white"
            >
              Computer Society
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <span className="hidden h-4 w-px bg-white/[0.10] sm:block" />

            <button
              type="button"
              onClick={scrollTop}
              className="text-sm font-medium text-white/45 transition-colors duration-300 hover:text-white"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>

      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </footer>
  )
}