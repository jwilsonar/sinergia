'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const SinergiaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <polygon points="20,2 36.6,11 36.6,29 20,38 3.4,29 3.4,11" fill="none" stroke="#3D8EE8" strokeWidth="2.5" />
    <polygon points="20,9 29.5,14.5 29.5,25.5 20,31 10.5,25.5 10.5,14.5" fill="#3D8EE8" opacity="0.3" />
    <text x="20" y="23.5" textAnchor="middle" fontFamily="inherit" fontWeight="800" fontSize="11" fill="#F0EFE8">S</text>
  </svg>
)

const NAV_LINKS = [
  { href: '/#services', label: 'Servicios', matchPath: null },
  { href: '/team', label: 'Equipo', matchPath: '/team' },
  { href: '/projects', label: 'Proyectos', matchPath: '/projects' },
] as const

export function Nav({ scrollBg = false }: { scrollBg?: boolean }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!scrollBg) return
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [scrollBg])

  const bgClass = scrollBg
    ? scrolled
      ? 'bg-bg/95'
      : 'bg-bg/85'
    : 'bg-[rgba(18,18,18,0.92)]'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5vw] h-[72px] border-b border-white/5 backdrop-blur-md transition-colors duration-300 ${bgClass}`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 text-fg font-extrabold text-[1.1rem] tracking-[-0.02em]"
        aria-label="Sinergia — Inicio"
      >
        <SinergiaLogo />
        Sinergia
      </Link>

      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {NAV_LINKS.map(({ href, label, matchPath }) => {
          const isActive = matchPath ? pathname === matchPath : false
          return (
            <li key={href}>
              <Link
                href={href}
                className={`font-medium text-sm transition-colors duration-200 ${
                  isActive ? 'text-fg' : 'text-fg/55 hover:text-fg'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      <Link
        href="/#contact"
        className="bg-blue text-[#121212] py-2.5 px-5 rounded-lg font-extrabold text-sm transition-all duration-200 hover:bg-[#60A5FA] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(61,142,232,0.35)] inline-block"
      >
        Hablemos
      </Link>
    </nav>
  )
}
