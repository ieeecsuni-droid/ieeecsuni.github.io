import { Link } from 'react-router-dom'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { footerLinks } from '../../data'
import { Linkedin, Instagram, Youtube, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'

const socials = [
  { Icon: Linkedin,  href: 'https://www.linkedin.com/company/ieee-cs-uni-sb/', title: 'LinkedIn'  },
  { Icon: Instagram, href: 'https://www.instagram.com/ieee.cs.uni/',            title: 'Instagram' },
  { Icon: Youtube,   href: 'https://www.youtube.com/@IEEE-CS-UNI',              title: 'YouTube'   },
  { Icon: MessageCircle, href: 'https://www.whatsapp.com/channel/0029Vb7ULtl9MF99Felbfi1c', title: 'WhatsApp' },
  { Icon: Mail,      href: 'mailto:ieeecs@uni.edu.pe',                          title: 'Email'     },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="main-footer"
      className="relative z-10 overflow-hidden bg-[#05070C] pt-32 pb-16 border-t border-white/[0.06]"
    >
      {/* ─── Topographic Mesh Background ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        }}
      />

      {/* ─── Ambient Directional Lighting ─── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center top, rgba(37, 99, 235, 0.04), transparent 60%)',
        }}
      />

      {/* ─── Structural Line Divider (Top) ─── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      {/* ─── Main Content ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">

        {/* ─── Editorial Hero Text ─── */}
        <div className="mb-24 max-w-3xl">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-white"
            style={{ fontFamily: '"Space Grotesk", "Geist", sans-serif' }}
          >
            COMPUTER SOCIETY
            <br />
            <span className="text-white/40">RESEARCH • SYSTEMS • SECURITY</span>
          </h2>
          <div className="w-16 h-px bg-white/20 mb-6" />
          <p
            className="text-[13px] md:text-[14px] leading-relaxed max-w-md text-white/50"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Impulsamos la excelencia técnica en la Universidad Nacional de Ingeniería. 
            Construimos software, hardware y profesionales resilientes para la próxima era.
          </p>
        </div>

        {/* ─── Grid: Identity + Navigation Clusters ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16">
          
          {/* Identity Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <IEEECSLogo size={24} className="text-white/80" />
              <div className="flex flex-col">
                <span
                  className="text-[13px] font-bold tracking-tight text-white/90"
                  style={{ fontFamily: '"Space Grotesk", "Geist", sans-serif' }}
                >
                  IEEE COMPUTER SOCIETY
                </span>
                <span
                  className="text-[9px] tracking-[0.18em] uppercase text-white/40 mt-0.5"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  UNI Chapter · Lima, PE
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {socials.map(({ Icon, href, title }) => (
                <a
                  key={title}
                  href={href}
                  title={title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-lg border border-white/[0.06] text-white/40 transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/[0.02]"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Clusters */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h5
                className="text-[10px] tracking-[0.18em] uppercase text-white/30 mb-6"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {col}
              </h5>
              <ul className="flex flex-col gap-4 list-none m-0 p-0">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-[13px] text-white/50 hover:text-white no-underline transition-colors duration-300"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Bottom Bar: Telemetry & Copyright ─── */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
          {/* Terminal metadata block */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span 
                className="text-[10px] tracking-[0.18em] uppercase text-white/60"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                sys.online
              </span>
            </div>
            <span className="text-white/20 text-[10px]">|</span>
            <span 
              className="text-[10px] tracking-[0.18em] uppercase text-white/40"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              v{year}.1
            </span>
            <span className="text-white/20 text-[10px]">|</span>
            <span 
              className="text-[10px] tracking-[0.18em] uppercase text-white/40"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              node:lima-pe
            </span>

            {/* Heartbeat Telemetry (Hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-[2px] ml-4 opacity-30">
              <style>{`
                @keyframes telemetry {
                  0%, 100% { transform: scaleY(0.4); opacity: 0.3; }
                  50% { transform: scaleY(1); opacity: 0.8; }
                }
              `}</style>
              {[1.2, 0.8, 1.5, 0.6, 1.1].map((delay, i) => (
                <div 
                  key={i}
                  className="w-[2px] bg-blue-400 origin-bottom"
                  style={{ 
                    height: '12px',
                    animation: `telemetry ${delay}s ease-in-out infinite`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="flex items-center gap-4">
            <span
              className="text-[10px] tracking-[0.18em] uppercase text-white/40"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              © {year} IEEE CS UNI
            </span>
            <span className="hidden md:inline-block w-px h-3 bg-white/10" />
            <a
              href="https://computer.org"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase text-white/40 hover:text-white transition-colors duration-300 no-underline"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              computer.org <ArrowUpRight size={10} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}