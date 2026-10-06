import { Link } from 'react-router-dom'

export function FinalCTA() {
  return <section className="final-cta section"><div className="container"><p className="eyebrow justify-center">NEXT LOOK. SAME YOU.</p><h2 className="display">E timpul pentru<br />următorul tău look.</h2><p>Alege serviciul, barberul și intervalul potrivit.</p><Link className="button button-gold" to="/booking">Programează-te</Link></div></section>
}
