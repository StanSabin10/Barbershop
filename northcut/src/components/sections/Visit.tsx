import { MapPin, Clock3 } from 'lucide-react'
import { hours } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { BookingLink } from '../ui/BookingLink'

export function Visit() {
  return <section className="visit-section section" id="contact"><div className="container visit-grid">
    <div className="hours-section"><p className="eyebrow">06 · TIMP PENTRU TINE</p><h2 className="display">Program</h2><dl className="hours-list">{hours.map(item => <div key={item.day}><dt>{item.day}</dt><dd className={item.time === 'Închis' ? 'closed' : ''}>{item.time}</dd></div>)}</dl><p className="visit-note"><Clock3 size={17} aria-hidden="true" />Pentru a evita timpul de așteptare, recomandăm programarea în avans.</p><BookingLink className="text-link">Programează-te</BookingLink></div>
    <div className="contact-section"><SectionHeading number="07" eyebrow="CONTACT" title="Ne vedem la NORTHCUT." /><p className="contact-name">NORTHCUT Barbershop</p><div className="location-block"><MapPin size={22} strokeWidth={1.5} aria-hidden="true" /><p>Ploiești, România<span>MODERN BARBERSHOP</span></p></div><dl className="contact-details"><div><dt>Telefon</dt><dd>07xx xxx xxx</dd></div><div><dt>Email</dt><dd>hello@northcut-demo.ro</dd></div><div><dt>Instagram</dt><dd>@northcut.demo</dd></div></dl><p className="fine-print">Date demonstrative — concept project</p></div>
  </div></section>
}
