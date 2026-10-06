import { gallery } from '../../data/gallery'
import { SectionHeading } from '../ui/SectionHeading'
import { Photo } from '../ui/Photo'

export function Gallery() {
  return <section className="section container" id="galerie"><div className="section-top"><SectionHeading number="05" eyebrow="GALERIE" title="Detaliile vorbesc." /><p className="margin-note">ÎN SPATELE<br />FIECĂRUI LOOK.</p></div><div className="gallery-grid">{gallery.map((item, index) => <figure key={item.label} className={item.className}><Photo src={item.image} alt={item.alt} /><figcaption><span>{item.label}</span><span>0{index + 1}</span></figcaption></figure>)}</div><p className="fine-print mt-5">Fotografii de atmosferă, folosite pentru ilustrarea conceptului.</p></section>
}
