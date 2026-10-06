import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { services } from '../data/services'
import { team } from '../data/team'
import { getBookingDates, formatDate, parseDate, isClosed, dayUnavailable, slotUnavailable, timeSlots } from '../lib/schedule'
import { BookingSteps } from '../components/booking/BookingSteps'
import { BookingSummary } from '../components/booking/BookingSummary'
import { BookingConfirmation } from '../components/booking/BookingConfirmation'
import type { BookingSelection, ContactDetails } from '../types'

const stepTitles = ['Alege serviciul', 'Alege barberul', 'Alege data', 'Alege ora', 'Date de contact']
const stepDescriptions = ['Un serviciu potrivit pentru următorul tău look.', 'Stilul tău, în mâini bune.', 'Găsește o zi care se potrivește programului tău.', 'Intervalele de mai jos sunt demonstrative.', 'Ultimul pas înainte de confirmarea demonstrativă.']
const emptyContact: ContactDetails = { name: '', phone: '', email: '', consent: false }

export default function Booking() {
  const [params] = useSearchParams()
  const [selection, setSelection] = useState<BookingSelection>(() => ({
    serviceId: services.some(item => item.id === params.get('service')) ? params.get('service')! : '',
    barberId: team.some(item => item.id === params.get('barber')) ? params.get('barber')! : '', date: '', time: '',
  }))
  const [contact, setContact] = useState<ContactDetails>(emptyContact)
  const [step, setStep] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDetails | 'availability', string>>>({})
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const previousStep = useRef(0)
  const service = services.find(item => item.id === selection.serviceId)
  const dates = getBookingDates()
  const canContinue = [!!service, !!selection.barberId, !!selection.date, !!selection.time][step] ?? false

  useEffect(() => {
    if (previousStep.current !== step) { titleRef.current?.focus(); previousStep.current = step }
  }, [step])
  useEffect(() => {
    if (confirmed) { window.scrollTo({ top: 0, behavior: 'instant' }); document.getElementById('confirmation-title')?.focus() }
  }, [confirmed])

  function choose(field: keyof BookingSelection, value: string) {
    setSelection(previous => {
      if (previous[field] === value) return previous
      const next = { ...previous, [field]: value, time: field === 'time' ? value : '' }
      if (field === 'serviceId' && previous.date) {
        const nextService = services.find(item => item.id === value)
        if (dayUnavailable(previous.date, nextService?.duration ?? 30)) next.date = ''
      }
      return next
    })
    setErrors({})
  }

  function confirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step !== 4) return
    const nextErrors: typeof errors = {}
    if (contact.name.trim().length < 2) nextErrors.name = 'Introdu un nume de cel puțin 2 caractere.'
    const digits = contact.phone.replace(/[\s()+.-]/g, '')
    if (!/^\d{9,15}$/.test(digits)) nextErrors.phone = 'Introdu un număr de telefon valid (9–15 cifre).'
    if (contact.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) nextErrors.email = 'Introdu o adresă de email validă sau lasă câmpul gol.'
    if (!contact.consent) nextErrors.consent = 'Este necesar acordul pentru simularea programării.'
    if (!service || !selection.barberId || !dates.includes(selection.date) || !timeSlots.includes(selection.time) || slotUnavailable(selection.date, selection.time, service.duration)) nextErrors.availability = 'Intervalul ales nu mai este disponibil. Alege din nou data și ora.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      if (nextErrors.availability) { setSelection(previous => ({ ...previous, date: '', time: '' })); setStep(2) }
      else requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setContact(previous => ({ ...previous, name: previous.name.trim(), phone: previous.phone.trim(), email: previous.email.trim() }))
    setConfirmed(true)
  }

  function reset() {
    setSelection({ serviceId: '', barberId: '', date: '', time: '' })
    setContact(emptyContact); setErrors({}); setStep(0); setConfirmed(false)
    requestAnimationFrame(() => titleRef.current?.focus())
  }

  if (confirmed) return <BookingConfirmation selection={selection} name={contact.name.trim()} onReset={reset} />

  return <main id="main" className="container booking-page"><Link className="text-link back-to-site" to="/">Înapoi la site</Link><div className="booking-intro"><div><p className="eyebrow">NORTHCUT · PROGRAMARE</p><h1 className="display">Programează-te.</h1><p>Alege serviciul, barberul și intervalul potrivit.</p></div><p className="demo-notice"><span>DEMO FRONTEND</span>Nicio rezervare reală. Nicio transmitere de date.</p></div><BookingSteps step={step} onChange={setStep} />
    <div className="booking-layout"><form ref={formRef} noValidate onSubmit={confirm} className="booking-form"><p className="eyebrow">PAS {String(step + 1).padStart(2, '0')} / 05</p><h2 ref={titleRef} tabIndex={-1} className="booking-step-title">{stepTitles[step]}</h2><p className="booking-step-description">{stepDescriptions[step]}</p>{errors.availability && <p className="form-error" role="alert">{errors.availability}</p>}
      {step === 0 && <fieldset><legend className="sr-only">Alege serviciul</legend><div className="booking-services">{services.map(item => <label key={item.id} className={`booking-choice service-choice ${selection.serviceId === item.id ? 'selected' : ''}`}><input type="radio" className="sr-only" name="service" value={item.id} checked={selection.serviceId === item.id} onChange={() => choose('serviceId', item.id)} /><span className="choice-radio" aria-hidden="true" /><span><strong>{item.name}</strong><small>{item.duration} min</small></span><span className="choice-price">{item.price} lei</span></label>)}</div></fieldset>}
      {step === 1 && <fieldset><legend className="sr-only">Alege barberul</legend><div className="booking-barbers">{team.map(item => <label key={item.id} className={`booking-choice barber-choice ${selection.barberId === item.id ? 'selected' : ''}`}><input className="sr-only" type="radio" name="barber" value={item.id} checked={selection.barberId === item.id} onChange={() => choose('barberId', item.id)} /><img src={item.image} alt="" width="64" height="64" /><span><strong>{item.name}</strong><small>{item.role}</small></span><span className="choice-radio" aria-hidden="true" /></label>)}<label className={`booking-choice barber-choice any-barber ${selection.barberId === 'any' ? 'selected' : ''}`}><input className="sr-only" type="radio" name="barber" value="any" checked={selection.barberId === 'any'} onChange={() => choose('barberId', 'any')} /><span className="any-mark" aria-hidden="true">N</span><span><strong>Oricare disponibil</strong><small>Fără preferință de barber</small></span><span className="choice-radio" aria-hidden="true" /></label></div><p className="fine-print">Nume și fotografii ilustrative pentru echipa fictivă.</p></fieldset>}
      {step === 2 && <fieldset><legend className="sr-only">Alege o dată din următoarele 21 de zile</legend><div className="date-grid">{dates.map(date => { const unavailable = dayUnavailable(date, service?.duration ?? 30); return <label key={date} className={`date-choice ${selection.date === date ? 'selected' : ''} ${unavailable ? 'unavailable' : ''}`}><input className="sr-only" type="radio" name="date" value={date} disabled={unavailable} checked={selection.date === date} onChange={() => choose('date', date)} aria-label={`${formatDate(date)}${unavailable ? ', indisponibil' : ''}`} /><span>{new Intl.DateTimeFormat('ro-RO', { weekday: 'short' }).format(parseDate(date))}</span><strong>{parseDate(date).getDate()}</strong><small>{isClosed(date) ? 'Închis' : new Intl.DateTimeFormat('ro-RO', { month: 'short' }).format(parseDate(date))}</small></label> })}</div><p className="fine-print">Următoarele 21 de zile · Duminica este închis. Orele trecute nu pot fi selectate.</p></fieldset>}
      {step === 3 && <fieldset><legend className="sr-only">Alege o oră</legend><p className="chosen-date">{formatDate(selection.date)}</p><div className="time-grid">{timeSlots.map(time => { const unavailable = slotUnavailable(selection.date, time, service?.duration ?? 30); return <label key={time} className={`time-choice ${selection.time === time ? 'selected' : ''} ${unavailable ? 'unavailable' : ''}`}><input className="sr-only" type="radio" name="time" value={time} disabled={unavailable} checked={selection.time === time} onChange={() => choose('time', time)} aria-label={`${time}${unavailable ? ', indisponibil' : ''}`} /><strong>{time}</strong><small>{unavailable ? 'Indisponibil' : 'Disponibil'}</small></label> })}</div><p className="fine-print">Disponibilitate simulată. Intervalele respectă durata serviciului și ora de închidere.</p></fieldset>}
      {step === 4 && <div className="contact-form"><div className="form-field"><label htmlFor="booking-name">Nume <span>*</span></label><input id="booking-name" name="name" type="text" autoComplete="name" required maxLength={80} value={contact.name} onChange={event => setContact({ ...contact, name: event.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Numele tău" />{errors.name && <p id="name-error" className="form-error">{errors.name}</p>}</div><div className="form-field"><label htmlFor="booking-phone">Telefon <span>*</span></label><input id="booking-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={25} value={contact.phone} onChange={event => setContact({ ...contact, phone: event.target.value })} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} placeholder="07xx xxx xxx" />{errors.phone && <p id="phone-error" className="form-error">{errors.phone}</p>}</div><div className="form-field"><label htmlFor="booking-email">Email <span className="optional">opțional</span></label><input id="booking-email" name="email" type="email" autoComplete="email" maxLength={150} value={contact.email} onChange={event => setContact({ ...contact, email: event.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="nume@exemplu.ro" />{errors.email && <p id="email-error" className="form-error">{errors.email}</p>}</div><label className="consent-label"><input name="consent" type="checkbox" required checked={contact.consent} onChange={event => setContact({ ...contact, consent: event.target.checked })} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>Sunt de acord cu folosirea acestor date exclusiv pentru simularea programării.</span></label>{errors.consent && <p id="consent-error" className="form-error">{errors.consent}</p>}</div>}
      <div className="booking-controls">{step > 0 ? <button type="button" className="button button-outline" onClick={() => setStep(step - 1)}>Pasul anterior</button> : <span className="fine-print">5 pași. Un look nou.</span>}{step < 4 ? <button key="continue" type="button" className="button button-gold" disabled={!canContinue} onClick={event => { event.preventDefault(); setStep(step + 1) }}>Continuă</button> : <button key="confirm" type="submit" className="button button-gold">Confirmă programarea</button>}</div>
    </form><BookingSummary selection={selection} /></div>
  </main>
}
