const labels = ['Serviciu', 'Barber', 'Data', 'Ora', 'Contact']

export function BookingSteps({ step, onChange }: { step: number; onChange: (step: number) => void }) {
  return <nav className="booking-steps" aria-label="Pașii programării"><ol>{labels.map((label, index) => <li key={label}><button type="button" disabled={index > step} aria-current={step === index ? 'step' : undefined} onClick={() => onChange(index)}><span className={`step-number ${step === index ? 'current' : index < step ? 'complete' : ''}`}>{String(index + 1).padStart(2, '0')}</span><span>{label}</span></button></li>)}</ol></nav>
}
