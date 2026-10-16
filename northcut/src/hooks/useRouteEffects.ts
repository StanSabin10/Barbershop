import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

export function useRouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const isHome = pathname === '/'
    const title = isHome ? site.seoTitle : 'Pagina nu a fost găsită | NORTHCUT'
    const description = isHome
      ? site.description
      : 'Pagina solicitată nu există. Revino pe site-ul NORTHCUT Barbershop Ploiești.'
    const robots = isHome ? 'index,follow' : 'noindex,nofollow'
    const canonicalUrl = `${site.canonicalOrigin}${isHome ? '/' : pathname}`
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', robots)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      canonical.href = canonicalUrl
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
    }
    let frame = 0
    let scrollFrame = 0
    frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        const isSectionAnchor = target?.id === 'echipa' || target?.id === 'galerie' || target?.id === 'contact'
        if (isSectionAnchor) {
          const headerHeight = document.querySelector<HTMLElement>('.header')?.getBoundingClientRect().height ?? 0
          const isDesktopContact = target.id === 'contact' && window.matchMedia('(min-width: 768px)').matches
          const headerOffset = isDesktopContact ? headerHeight - 30 : headerHeight
          const top = Math.max(target.getBoundingClientRect().top + window.scrollY - headerOffset, 0)
          window.scrollTo({ top, left: 0, behavior: 'auto' })
        } else {
          target?.scrollIntoView()
        }
        return
      }

      const start = window.scrollY
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion || start <= 1) {
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
        if (progress < 1) scrollFrame = requestAnimationFrame(step)
      }
      scrollFrame = requestAnimationFrame(step)
    })
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(scrollFrame)
    }
  }, [pathname, hash])
}
