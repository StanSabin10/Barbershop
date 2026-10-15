import { useLayoutEffect } from 'react'

export function useScrollReveal() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    elements.forEach(element => element.classList.add('reveal-pending'))

    if (typeof window.IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.remove('reveal-pending')
          observer.unobserve(entry.target)
        })
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })

      const frame = requestAnimationFrame(() => {
        elements.forEach(element => observer.observe(element))
      })

      return () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
        elements.forEach(element => element.classList.remove('reveal-pending'))
      }
    }

    // The preview browser can omit IntersectionObserver; check visibility only while items remain.
    const pending = new Set(elements)
    let frame = 0
    const revealVisible = () => {
      frame = 0
      pending.forEach(element => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          element.classList.remove('reveal-pending')
          pending.delete(element)
        }
      })
      if (pending.size === 0) {
        window.removeEventListener('scroll', scheduleCheck)
        window.removeEventListener('resize', scheduleCheck)
      }
    }
    const scheduleCheck = () => {
      if (frame === 0) frame = requestAnimationFrame(revealVisible)
    }

    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck)
    frame = requestAnimationFrame(() => {
      frame = 0
      scheduleCheck()
    })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleCheck)
      window.removeEventListener('resize', scheduleCheck)
      elements.forEach(element => element.classList.remove('reveal-pending'))
    }
  }, [])
}
