import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

export function useRouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const title = pathname === '/booking' ? 'Programează-te | NORTHCUT Barbershop' : 'NORTHCUT Barbershop | Ploiești'
    const description = pathname === '/booking' ? 'Simulează o programare la NORTHCUT: alege serviciul, barberul, data și ora. Concept frontend, fără transmiterea datelor.' : site.description
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      const url = new URL(canonical.href)
      url.pathname = pathname
      canonical.href = url.toString()
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical.href)
    }
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
}
