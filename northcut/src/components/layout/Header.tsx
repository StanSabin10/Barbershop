import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { site } from '../../data/site'
import { BookingLink } from '../ui/BookingLink'

export function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/') return
    event.preventDefault()
    if (location.hash) {
      navigate('/', { replace: true })
      return
    }

    const start = window.scrollY
    if (start <= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const startedAt = performance.now()
    const duration = 900
    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = progress < .5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      window.scrollTo({ top: Math.round(start * (1 - eased)), left: 0, behavior: 'instant' })
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
  return <>
    <a className="skip-link" href="#main">Sari la conținut</a>
    <header className="header">
      <div className="container header-inner">
        <Link to="/" onClick={handleHomeClick} className="wordmark" aria-label="NORTHCUT BARBERSHOP — Acasă">NORTHCUT<span>BARBERSHOP</span></Link>
        <nav className="desktop-nav" aria-label="Navigație principală">{site.navigation.map(item => <Link key={item.label} to={item.href}>{item.label}</Link>)}</nav>
        <div className="header-actions"><BookingLink className="button button-gold header-booking">Programează-te</BookingLink>
          <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? 'Închide meniul' : 'Deschide meniul'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Navigație mobilă" hidden={!open}>{site.navigation.map(item => <Link key={item.label} to={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<BookingLink className="button button-gold" onClick={() => setOpen(false)}>Programează-te</BookingLink></nav>
    </header>
  </>
}
