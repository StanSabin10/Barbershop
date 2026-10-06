import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { services } from '../../data/services'
import { team } from '../../data/team'
import { formatDate } from '../../lib/schedule'
import type { BookingSelection } from '../../types'

interface Props { selection: BookingSelection; name: string; onReset: () => void }

export function BookingConfirmation({ selection, name, onReset }: Props) {
  const service = services.find(item => item.id === selection.serviceId)
  const barber = team.find(item => item.id === selection.barberId)
  return <main id="main" className="container confirmation-page"><div className="confirmation-mark"><Check size={28} strokeWidth={1.5} aria-hidden="true" /></div><p className="eyebrow">NORTHCUT · DEMO</p><h1 className="display" tabIndex={-1} id="confirmation-title">Programare demonstrativă confirmată</h1><p className="confirmation-intro">{name}, acesta este rezumatul programării tale.</p><dl className="confirmation-details"><div><dt>Serviciu</dt><dd>{service?.name} · {service?.price} lei</dd></div><div><dt>Barber</dt><dd>{barber?.name ?? 'Oricare disponibil'}</dd></div><div><dt>Data</dt><dd>{formatDate(selection.date)}</dd></div><div><dt>Ora</dt><dd>{selection.time}</dd></div><div><dt>Nume</dt><dd>{name}</dd></div></dl><p className="confirmation-note">Aceasta este o demonstrație frontend. În versiunea completă, programarea va fi salvată în baza de date și clientul va primi confirmarea automat.</p><div className="confirmation-actions"><Link to="/" className="button button-gold">Înapoi la site</Link><button type="button" className="button button-outline" onClick={onReset}>Fă altă programare</button></div></main>
}
