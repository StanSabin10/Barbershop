import { Clock3, Scissors } from 'lucide-react'
import { services } from '../../data/services'
import { team } from '../../data/team'
import { formatDate } from '../../lib/schedule'
import type { BookingSelection } from '../../types'

export function BookingSummary({ selection }: { selection: BookingSelection }) {
  const service = services.find(item => item.id === selection.serviceId)
  const barber = team.find(item => item.id === selection.barberId)
  return <aside className="booking-summary" aria-label="Rezumatul programării"><div className="summary-top"><Scissors size={20} strokeWidth={1.4} aria-hidden="true" /><h2>Programarea ta</h2></div><dl>
    <div><dt>Serviciu</dt><dd>{service?.name ?? 'Alege un serviciu'}</dd></div>
    <div><dt>Barber</dt><dd>{barber?.name ?? (selection.barberId === 'any' ? 'Oricare disponibil' : 'Alege un barber')}</dd></div>
    <div><dt>Data</dt><dd>{selection.date ? formatDate(selection.date, true) : 'Alege o dată'}</dd></div>
    <div><dt>Ora</dt><dd>{selection.time || 'Alege o oră'}</dd></div>
  </dl><div className="summary-total"><span>Total</span><strong>{service ? `${service.price} LEI` : '—'}</strong></div>{service && <p className="summary-duration"><Clock3 size={15} aria-hidden="true" />{service.duration} minute</p>}<p className="fine-print summary-note">Programare demo. Datele rămân doar în această pagină și nu sunt trimise sau salvate.</p></aside>
}
