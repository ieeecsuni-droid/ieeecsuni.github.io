import { Link } from 'react-router-dom'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { footerLinks } from '../../data'
import {
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa'

const socials = [
  { Icon: FaLinkedin,  href: 'https://www.linkedin.com/company/ieee-cs-uni-sb/', title: 'LinkedIn'  },
  { Icon: FaInstagram, href: 'https://www.instagram.com/ieee.cs.uni/',            title: 'Instagram' },
  { Icon: FaYoutube,   href: 'https://www.youtube.com/@IEEE-CS-UNI',              title: 'YouTube'   },
  { Icon: FaTiktok,    href: 'https://www.tiktok.com/@ieee.cs.uni?lang=es-419',   title: 'TikTok'    },
  { Icon: FaWhatsapp,  href: 'https://www.whatsapp.com/channel/0029Vb7ULtl9MF99Felbfi1c', title: 'WhatsApp' },
  { Icon: FaEnvelope,  href: 'mailto:ieeecs@uni.edu.pe',                          title: 'Email'     },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="main-footer"
      className="relative z-10 overflow-hidden"
      style={{ background: 'var(--color-footer-surface)' }}
    >
      {/* ─── Top gradient separator ─── */}
      <div className="footer-gradient-line" />

      {/* ─── Architectural grid overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent)',
        }}
      />

      {/* ─── Ambient directional lighting ─── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '300px',
          background: 'radial-gradient(ellipse at center top, rgba(14, 165, 233, 0.04), transparent 70%)',
        }}
      />

      {/* ─── Main Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* ─── Manifesto Block ─── */}
        <div className="pt-20 pb-16 md:pt-24 md:pb-20">
          <div className="max-w-2xl">
            <h2
              className="text-[28px] md:text-[36px] font-semibold leading-[1.15] tracking-[-0.02em] mb-6"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Construyendo el futuro
              <br />
              <span style={{ color: 'var(--color-text-secondary)' }}>
                desde la ingeniería.
              </span>
            </h2>
            <p
              className="text-[15px] leading-relaxed max-w-md"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Investigación, sistemas y ciberseguridad. Somos el capítulo estudiantil
              de la IEEE Computer Society en la Universidad Nacional de Ingeniería.
            </p>
          </div>
        </div>

        {/* ─── Grid: Identity + Navigation Clusters ─── */}
        <div
          className="py-12 grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8"
          style={{ borderTop: '1px solid var(--color-footer-border)' }}
        >
          {/* Identity column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <IEEECSLogo size={28} />
              <div className="flex flex-col">
                <span
                  className="text-[13px] font-semibold tracking-[0.01em]"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  IEEE Computer Society
                </span>
                <span
                  className="font-mono text-[9px] tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  UNI Student Chapter · Lima, Perú
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-2 mt-4">
              {socials.map(({ Icon, href, title }) => (
                <a
                  key={title}
                  href={href}
                  title={title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-9 h-9 rounded-lg transition-all"
                  style={{
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-muted)',
                    transitionDuration: 'var(--transition-base)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-hover)'
                    e.currentTarget.style.color = 'var(--color-text-primary)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation clusters */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h5
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {col}
              </h5>
              <ul className="flex flex-col gap-3 list-none">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-[13px] no-underline transition-all"
                      style={{
                        color: 'var(--color-text-secondary)',
                        transitionDuration: 'var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-primary)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-secondary)'
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Bottom Bar ─── */}
        <div
          className="py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{ borderTop: '1px solid var(--color-footer-border)' }}
        >
          {/* Terminal metadata block */}
          <div className="flex items-center gap-6">
            <span className="footer-terminal">
              <span className="status-dot" />
              sys.online
            </span>
            <span className="footer-terminal">
              v{year}.1
            </span>
            <span className="footer-terminal">
              node:lima-pe
            </span>
          </div>

          {/* Copyright + external link */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[10px] tracking-wider"
              style={{ color: 'var(--color-text-muted)' }}
            >
              © {year} IEEE CS UNI
            </span>
            <span
              className="hidden md:inline-block w-px h-3"
              style={{ background: 'var(--color-border-subtle)' }}
            />
            <a
              href="https://computer.org"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] tracking-wider no-underline transition-colors"
              style={{
                color: 'var(--color-text-muted)',
                transitionDuration: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent-blue)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}
            >
              computer.org ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}