import { experience } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return <section className="experience-section section"><div className="container"><div className="experience-heading"><SectionHeading number="04" eyebrow="DE CE NORTHCUT" title="Rezultatul contează. Experiența, la fel." /></div><div className="experience-grid">{experience.map((item, index) => <div key={item.title} className="experience-item"><span className="experience-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></div></section>
}
