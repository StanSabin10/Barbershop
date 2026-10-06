import { Link } from 'react-router-dom'

export function NotFound() { return <main id="main" className="container not-found"><p className="eyebrow">NORTHCUT · 404</p><h1 className="display">Pagina nu a fost găsită.</h1><p className="body-copy">Întoarce-te la site și descoperă serviciile NORTHCUT.</p><Link to="/" className="button button-gold mt-7">Înapoi la site</Link></main> }
