import { Link } from 'react-router-dom'
import { team } from '../../data/team'
import { SectionHeading } from '../ui/SectionHeading'
import { Photo } from '../ui/Photo'

export function Team() {
  return <section className="section container" id="echipa"><div className="section-top"><SectionHeading number="03" eyebrow="ECHIPA" title="Alege barberul potrivit stilului tău." /><p className="margin-note">TREI STILURI.<br />ACEEAȘI ATENȚIE.</p></div>
    <div className="team-grid">{team.map((barber, index) => <article key={barber.id} className="team-member"><div className="team-photo-wrap"><Photo src={barber.image} alt={`Portret ilustrativ pentru profilul fictiv ${barber.name}`} className={`team-photo team-photo-${barber.id}`} /><span className="team-number">0{index + 1}</span></div><p className="team-role">{barber.role}</p><h3>{barber.name}</h3><p className="team-specialties">{barber.specialties}</p><Link to={`/booking?barber=${barber.id}`} className="text-link">Programează-te cu {barber.firstName}</Link></article>)}</div>
    <p className="fine-print team-demo">Echipă fictivă · Fotografiile sunt ilustrative; persoanele fotografiate nu reprezintă NORTHCUT.</p>
  </section>
}
