import { Link } from 'react-router-dom'
import { Orb } from '../components/ui/HeroElements'

export default function NotFoundPage() {
  return (
    <main className="pt-16 min-h-screen flex items-center justify-center px-6 text-center relative overflow-hidden">
      <Orb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
           style={{ background: 'radial-gradient(circle, rgba(0,150,220,0.1), transparent 70%)' }} />
      <div className="relative z-10">
        <div
          className="font-black mb-4"
          style={{ fontSize: 'clamp(80px, 15vw, 140px)', color: 'var(--b3)', lineHeight: 1, WebkitTextStroke: '2px var(--border2)' }}
        >
          404
        </div>
        <h1 className="text-2xl font-black mb-3">Página no encontrada</h1>
        <p className="text-base mb-8 max-w-sm" style={{ color: 'var(--fg2)' }}>
          La página que buscas no existe o fue movida.
        </p>
        <Link to="/" className="btn-primary mx-auto">Volver al inicio →</Link>
      </div>
    </main>
  )
}
