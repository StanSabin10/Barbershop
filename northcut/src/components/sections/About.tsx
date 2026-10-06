import { images } from '../../data/images'
import { values } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { Photo } from '../ui/Photo'

export function About() {
  return <section className="about-section section" id="despre">
    <div className="container about-grid"><div className="about-visual"><Photo src={images.interior} alt="Un spațiu contemporan de barbering, cu materiale naturale și scaune din piele" /><span className="photo-footnote">UN SPAȚIU PENTRU STILUL TĂU.</span></div>
      <div className="about-copy"><SectionHeading number="02" eyebrow="DESPRE NOI" title="Mai mult decât o tunsoare." />
        <p className="body-copy">NORTHCUT este un concept de barbershop contemporan construit în jurul preciziei, confortului și atenției la detalii. De la consultarea inițială până la ultimul finishing, fiecare serviciu este adaptat stilului personal al clientului.</p>
        <div className="values">{values.map(value => <div key={value.title}><h3>{value.title}</h3><p>{value.description}</p></div>)}</div>
      </div>
    </div>
  </section>
}
