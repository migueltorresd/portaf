import { useEffect, useRef, useState } from 'react'

interface Props {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const NAV_LINKS = [
  { href: '#home', label: 'INICIO', num: '01.' },
  { href: '#about', label: 'SOBRE MÍ', num: '02.' },
  { href: '#projects', label: 'PROYECTOS', num: '03.' },
  { href: '#skills', label: 'HABILIDADES', num: '04.' },
  { href: '#contact', label: 'CONTACTO', num: '05.' },
]

export default function Header({ onToggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const navRef = useRef<HTMLElement>(null)

  // Close nav on link click
  const handleLinkClick = (href: string) => {
    setActiveHref(href)
    setMenuOpen(false)
  }

  // Intersection observer for active section
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.35 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header" id="navbar">
      <a className="nav-logo" href="#home">
        &gt; MIGUEL<span>.DEV_</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        aria-label="Abrir navegación"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`site-nav${menuOpen ? ' open' : ''}`}
        id="site-nav"
        aria-label="Navegación principal"
        ref={navRef}
      >
        {NAV_LINKS.map(({ href, label, num }) => (
          <a
            key={href}
            href={href}
            className={activeHref === href ? 'active' : ''}
            onClick={() => handleLinkClick(href)}
          >
            <span>{num}</span> {label}
          </a>
        ))}
      </nav>

      <button
        className="theme-btn"
        id="themeBtn"
        type="button"
        title="Cambiar tema"
        onClick={onToggleTheme}
      >
        <span className="theme-icon" aria-hidden="true" />
      </button>
    </header>
  )
}
