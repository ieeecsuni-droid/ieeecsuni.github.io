import { ChapterStat } from './ChapterStat'
import { Activity, Shield, Cpu, Network } from 'lucide-react'

export function ImpactDashboard() {
  const stats = [
    { value: 120, label: 'Miembros Activos', suffix: '+', icon: Network },
    { value: 25, label: 'Eventos Realizados', suffix: '', icon: Activity },
    { value: 12, label: 'Proyectos I+D', suffix: '', icon: Cpu },
    { value: 4, label: 'Áreas Técnicas', suffix: '', icon: Shield },
  ]

  return (
    <section className="py-24 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-[1700px] mx-auto px-6 md:px-24 lg:px-40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24">
          {stats.map((stat, i) => (
            <div key={i} className="relative">
              <stat.icon size={16} className="absolute -top-8 left-0 text-blue-500/20" />
              <ChapterStat {...stat} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
