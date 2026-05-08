import { useState } from 'react'
import { Mail, Check, Instagram, Linkedin, Github, Terminal, Activity, ShieldCheck, User } from 'lucide-react'

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
    <article className="group relative flex flex-col h-full bg-white/[0.01] border border-white/5 transition-all duration-700 hover:border-blue-500/20 hover:bg-blue-600/[0.02]">
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/0 group-hover:border-blue-500/40 transition-all" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/0 group-hover:border-blue-500/40 transition-all" />

      <div className="p-8 md:p-10 flex flex-col flex-1 relative">
        <div className="flex items-start justify-between mb-10 pb-4 border-b border-white/5">
          <div className="flex flex-col gap-1">
            <span className="font-ibm-plex text-[10px] tracking-[0.2em] text-white/20 uppercase font-bold">PERSONNEL_LOG</span>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
               <span className="font-ibm-plex text-[8px] tracking-[0.2em] text-blue-500/50 uppercase font-bold">STATUS_ACTIVE</span>
            </div>
          </div>
          <ShieldCheck size={16} className="text-white/10 group-hover:text-blue-500/40 transition-colors" />
        </div>

        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-20 h-20 shrink-0 bg-black border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay z-10" />
            {photo ? (
              <img 
                src={photo} 
                alt={name} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
            ) : (
              <User size={32} className="text-white/10 group-hover:text-white/30 transition-colors" />
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="text-2xl font-space-grotesk font-bold text-white mb-2 leading-none tracking-tight group-hover:text-blue-500 transition-colors">
              {name}
            </h3>
            <span className="font-ibm-plex text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">
              {role}
            </span>
          </div>
        </div>

        <div className="flex-1 mb-10">
          <p className="text-[14px] text-white/40 leading-relaxed font-inter group-hover:text-white/60 transition-colors">
            {bio}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex gap-3">
            {[
              { icon: Github, link: social?.github },
              { icon: Linkedin, link: social?.linkedin },
              { icon: Instagram, link: social?.instagram }
            ].map((s, i) => s.link && (
              <a key={i} href={s.link} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center border border-white/5 bg-white/[0.01] hover:border-blue-500/30 hover:bg-blue-600/10 text-white/20 hover:text-blue-400 transition-all duration-500">
                <s.icon size={16} />
              </a>
            ))}
          </div>

          <button 
            onClick={handleCopyEmail}
            className={`flex items-center justify-between px-5 py-3 border transition-all duration-500 font-space-grotesk font-bold text-[10px] tracking-[0.2em] ${
              copied 
              ? 'border-emerald-500/40 bg-emerald-600/10 text-emerald-400' 
              : 'border-white/10 bg-black text-white/30 hover:text-white hover:border-blue-500/40'
            }`}
          >
            <span>{copied ? 'EMAIL_COPIADO' : 'CONTACT_CHANNEL'}</span>
            {copied ? <Check size={14} /> : <Mail size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />}
          </button>
        </div>
      </div>
    </article>
  )
}