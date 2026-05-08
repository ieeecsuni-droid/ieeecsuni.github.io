import { useState } from 'react'
import { Mail, Check, Instagram, Linkedin, Github, Terminal, Activity } from 'lucide-react'

export function MemberCard({ member }) {
  const { initials, name, role, bio, email, photo, social } = member
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    if (!email) return
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="group relative flex flex-col h-full bg-[#ffffff01] border border-white/[0.04] rounded-sm overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:bg-[#ffffff03]">
      
      {/* ── LEFT ACCENT BORDER ── */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all duration-700 z-20 pointer-events-none" />

      <div className="p-6 md:p-8 flex flex-col flex-1 relative">
        
        {/* ── SYSTEM METADATA HEADER ── */}
        <div className="flex items-start justify-between mb-8 pb-4 border-b border-white/[0.04]">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
              MEMBER PROFILE
            </span>
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-emerald-500/80" />
               <span className="font-mono text-[8px] tracking-widest text-emerald-500/50 uppercase">UNI_MEMBER</span>
            </div>
          </div>
          <Activity className="w-4 h-4 text-white/20" />
        </div>

        {/* ── IDENTITY LAYER ── */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative w-16 h-16 shrink-0 bg-[#030408] border border-white/[0.06] flex items-center justify-center overflow-hidden">
            {photo ? (
              <img 
                src={photo} 
                alt={name} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            ) : (
              <span className="font-mono text-xl text-white/30">{initials}</span>
            )}
            <div className="absolute inset-0 bg-[#050816]/20 mix-blend-multiply pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <h3 
              className="text-lg font-light text-white/90 group-hover:text-white transition-colors tracking-tight leading-snug mb-1"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {name}
            </h3>
            <span className="font-mono text-[10px] tracking-widest text-amber-500/80 uppercase">
              {role}
            </span>
          </div>
        </div>

        {/* ── BIO / DATA PAYLOAD ── */}
        <div className="flex-1 mb-8">
          <p 
            className="text-[13px] text-white/40 leading-relaxed"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {bio}
          </p>
        </div>

        {/* ── COMMUNICATION PROTOCOL ── */}
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex gap-2">
            {social?.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/[0.04] bg-white/[0.01] hover:bg-white hover:text-[#050816] text-white/40 transition-colors">
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {social?.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/[0.04] bg-white/[0.01] hover:bg-white hover:text-[#050816] text-white/40 transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {social?.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/[0.04] bg-white/[0.01] hover:bg-white hover:text-[#050816] text-white/40 transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button 
            onClick={handleCopyEmail}
            className={`flex items-center justify-between px-4 py-2.5 border transition-all duration-300 ${
              copied 
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' 
              : 'border-white/[0.06] bg-[#030408] text-white/40 hover:text-white hover:border-white/[0.2]'
            }`}
          >
            <span className="font-mono text-[9px] tracking-widest uppercase">
              {copied ? 'CORREO_COPIADO' : 'COPIAR_CORREO'}
            </span>
            {copied ? <Check className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />}
          </button>
        </div>

      </div>
    </article>
  )
}