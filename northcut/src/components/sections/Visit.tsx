import { MapPin, Clock3 } from 'lucide-react'
import { hours } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { BookingLink } from '../ui/BookingLink'

export function Visit() {
  return <section className="visit-section section" id="contact"><div className="container visit-grid">
    <div className="hours-section"><p className="eyebrow">06 · TIMP PENTRU TINE</p><h2 className="display">Program</h2><dl className="hours-list">{hours.map(item => <div key={item.day}><dt>{item.day}</dt><dd className={item.time === 'Închis' ? 'closed' : ''}>{item.time}</dd></div>)}</dl><p className="visit-note"><Clock3 size={17} aria-hidden="true" />Pentru a evita timpul de așteptare, recomandăm programarea în avans.</p><BookingLink className="text-link">Programează-te</BookingLink></div>
    <div className="contact-section"><SectionHeading number="07" eyebrow="CONTACT" title="Ne vedem la NORTHCUT." /><a className="location-block" href="https://www.google.com/maps/search/?api=1&query=NORTHCUT+Barbershop+Ploiesti" target="_blank" rel="noopener noreferrer"><MapPin size={22} strokeWidth={1.5} aria-hidden="true" /><p>Ploiești, Prahova, România</p></a><dl className="contact-details"><div><dt>Telefon</dt><dd><a className="contact-link" href="tel:07xx%20xxx%20xxx">07xx xxx xxx</a></dd></div><div><dt>Email</dt><dd><a className="contact-link" href="https://mail.google.com/mail/?view=cm&fs=1&to=hello%40northcut-demo.ro" target="_blank" rel="noopener noreferrer">hello@northcut-demo.ro</a></dd></div><div><dt>Instagram</dt><dd><a className="contact-link" href="https://www.instagram.com/northcut.demo/" target="_blank" rel="noopener noreferrer">@northcut.demo</a></dd></div></dl></div>
  </div></section>
}
