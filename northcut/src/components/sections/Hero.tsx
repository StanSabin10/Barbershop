import { Link } from 'react-router-dom'
import { images } from '../../data/images'

export function Hero() {
  return <section className="hero" id="acasa" aria-labelledby="hero-title">
    <div className="hero-photo"><picture><source media="(max-width: 600px)" srcSet={images.heroMobile} /><img src={images.hero} width="1600" height="1067" alt="Barber finisând cu atenție barba unui client" fetchPriority="high" /></picture></div>
    <div className="container hero-content">
      <p className="eyebrow"><span className="small-line" />BARBERSHOP · PLOIEȘTI</p>
      <h1 id="hero-title" className="display hero-title">PRECIZIE.<br />STIL.<br /><span>ATITUDINE.</span></h1>
      <p className="hero-description">Tunsori moderne, fade-uri precise și servicii de barbering într-un spațiu creat pentru bărbații care pun preț pe detalii.</p>
      <div className="hero-buttons"><Link to="/booking" className="button button-gold">Programează-te</Link><a href="#servicii" className="text-link">Vezi serviciile</a></div>
      <div className="hero-hours"><span>LUNI — SÂMBĂTĂ</span><span>09:00 — 20:00 <small> / Sâmbătă până la 18:00</small></span></div>
    </div>
    <div className="hero-caption" aria-hidden="true">THE ART OF A GOOD CUT.</div>
    <div className="hero-bottom container"><span>PRECIZIE ÎN FIECARE DETALIU.</span><a href="#servicii">DESCOPERĂ NORTHCUT <span>↓</span></a><span>01 / NORTHCUT</span></div>
  </section>
}
