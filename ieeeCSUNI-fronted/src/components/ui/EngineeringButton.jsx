import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const cn = (...classes) => classes.filter(Boolean).join(' ')

export const EngineeringButton = ({
  children,
  to = '/',
  href,
  className = '',
  secondary = false,
}) => {
  const navigate = useNavigate()
  const isExternal = Boolean(href)

  const baseClasses = cn(
    'group relative inline-flex items-center justify-center gap-3',
    'overflow-hidden rounded-full',
    'px-6 py-3 md:px-8 md:py-4',
    'font-space-grotesk text-[10px] md:text-xs font-semibold uppercase',
    'tracking-[0.22em] md:tracking-[0.28em]',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    secondary
      ? 'border border-white/10 text-white/70 hover:border-white/25 hover:text-white'
      : 'border border-white/10 bg-white/[0.04] text-white/75 backdrop-blur-md hover:border-blue-400/40 hover:bg-blue-500/[0.08] hover:text-white',
    className
  )

  const handleInternalClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()

    navigate(to)

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
    })
  }

  const content = (
    <>
      <span
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300',
          secondary
            ? 'bg-white/[0.03] group-hover:opacity-100'
            : 'bg-gradient-to-r from-transparent via-blue-400/[0.08] to-transparent group-hover:opacity-100'
        )}
      />

      <span className="relative z-10 whitespace-nowrap">
        {children}
      </span>

      <span className="relative z-10 flex items-center gap-2">
        <span className="h-px w-5 bg-white/20 transition-all duration-300 group-hover:w-7 group-hover:bg-blue-300/80" />

        <ArrowUpRight
          size={14}
          strokeWidth={1.8}
          className="text-white/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-300"
        />
      </span>
    </>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      to={to}
      className={baseClasses}
      onClick={handleInternalClick}
    >
      {content}
    </Link>
  )
}