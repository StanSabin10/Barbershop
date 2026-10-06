import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { site } from '../../data/site'
import { BookingLink } from '../ui/BookingLink'

export function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  return <>
    <a className="skip-link" href="#main">Sari la conținut</a>
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="wordmark" aria-label="NORTHCUT BARBERSHOP — Acasă">NORTHCUT<span>BARBERSHOP</span></Link>
        <nav className="desktop-nav" aria-label="Navigație principală">{site.navigation.map(item => <Link key={item.label} to={item.href}>{item.label}</Link>)}</nav>
        <div className="header-actions"><BookingLink className="button button-gold header-booking">Programează-te</BookingLink>
          <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? 'Închide meniul' : 'Deschide meniul'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Navigație mobilă" hidden={!open}>{site.navigation.map(item => <Link key={item.label} to={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<BookingLink className="button button-gold" onClick={() => setOpen(false)}>Programează-te</BookingLink></nav>
    </header>
  </>
}
