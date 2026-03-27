import { Link } from 'react-router-dom'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { footerLinks } from '../../data'
import { FaLinkedin, FaInstagram, FaDiscord, FaEnvelope } from 'react-icons/fa' 


export function Footer() {
  return (
    <footer
      className="relative z-10 pt-16 pb-8 px-10 md:px-20"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <IEEECSLogo size={40} />
              <div>
                <div className="text-sm font-bold" style={{ color: 'var(--fg)' }}>IEEE CS</div>
                <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg3)' }}>UNI Chapter</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--fg2)' }}>
              Capítulo estudiantil de la IEEE Computer Society en la Universidad Nacional de Ingeniería, Lima, Perú.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                { Icon: FaLinkedin, href: '#', title: 'LinkedIn' },
                { Icon: FaInstagram, href: '#', title: 'Instagram' },
                { Icon: FaDiscord, href: '#', title: 'Discord' },
                { Icon: FaEnvelope, href: 'mailto:ieeecs@uni.edu.pe', title: 'Email' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  title={social.title}
                  target='_blank'
                  rel="noopener noreferrer"
                  className="p-2 border rounded-full text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-colors"
                  
                >
                  <social.Icon className="w-5 h-5" /> {/* Aquí se renderiza el icono con tamaño */}  
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h5 className="text-sm font-bold mb-4 tracking-wide" style={{ color: 'var(--fg)' }}>{col}</h5>
              <ul className="flex flex-col gap-2 list-none">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm no-underline transition-colors duration-200"
                      style={{ color: 'var(--fg2)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--c1)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg2)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span className="font-mono text-[11px]" style={{ color: 'var(--fg3)' }}>
            © {new Date().getFullYear()} IEEE Computer Society — UNI Student Chapter
          </span>
          <span className="font-mono text-[11px]" style={{ color: 'var(--fg3)' }}>
            Lima, Perú · <a href="https://computer.org" target="_blank" rel="noreferrer" style={{ color: 'var(--fg3)' }} onMouseEnter={e => e.currentTarget.style.color='var(--c1)'} onMouseLeave={e => e.currentTarget.style.color='var(--fg3)'}>computer.org</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
