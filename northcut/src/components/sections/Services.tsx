import { services } from '../../data/services'
import { SectionHeading } from '../ui/SectionHeading'
import { BookingLink } from '../ui/BookingLink'

export function Services() {
  return <section className="section container services-section" id="servicii" aria-labelledby="services-heading">
    <div className="section-top"><div id="services-heading"><SectionHeading number="01" eyebrow="SERVICII" title="Îngrijire fără compromisuri." description="Servicii esențiale de barbering, executate cu atenție la fiecare detaliu." /></div><p className="margin-note">UN LOOK BUN<br />ÎNCEPE CU DETALIILE.</p></div>
    <div className="service-list">{services.map((service, index) => <BookingLink className="service-row" key={service.id}>
      <span className="service-index">0{index + 1}</span><div><h3>{service.name}</h3><p>{service.description}</p></div><span className="service-duration">{service.duration} MIN</span><span className="service-price">{service.price}<small> LEI</small></span>
    </BookingLink>)}</div>
    <div className="section-bottom"><p className="fine-print">Prețuri demonstrative pentru acest concept.</p><BookingLink className="text-link">Rezervă o programare</BookingLink></div>
  </section>
}
