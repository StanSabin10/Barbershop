interface Props { eyebrow: string; title: string; description?: string; number?: string }

export function SectionHeading({ eyebrow, title, description, number }: Props) {
  return <div className="section-heading">
    <p className="eyebrow">{number && <span className="section-index">{number}</span>}{eyebrow}</p>
    <h2 className="display">{title}</h2>
    {description && <p className="section-description">{description}</p>}
  </div>
}
