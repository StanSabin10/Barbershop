import { Link } from 'react-router-dom'
import { site } from '../../data/site'

export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><div><Link className="wordmark" to="/">NORTHCUT</Link><p>{site.tagline}</p></div><div className="footer-social"><span aria-disabled="true" title="Profil demonstrativ">Instagram</span><span aria-disabled="true" title="Profil demonstrativ">TikTok</span></div></div><div className="footer-bottom"><p>Concept project · Designed &amp; developed by Sabin Stan</p><p>© {new Date().getFullYear()} NORTHCUT</p></div></div></footer>
}
