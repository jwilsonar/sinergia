import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '#', label: 'Privacidad' },
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'LinkedIn' },
  { href: '/#contact', label: 'Contacto' },
] as const

export function Footer() {
  return (
    <footer className="p-7 px-[5vw] border-t border-white/5 flex items-center justify-between gap-5 flex-wrap">
      <p className="text-[0.8rem] text-fg/55 m-0">© 2026 Sinergia. Todos los derechos reservados.</p>
      <ul className="flex gap-6 list-none m-0 p-0">
        {FOOTER_LINKS.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-[0.8rem] text-fg/55 no-underline transition-colors duration-200 hover:text-fg"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
