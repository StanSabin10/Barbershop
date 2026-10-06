import type { Service } from '../types'

export const services: Service[] = [
  { id: 'classic', name: 'Tuns Clasic', price: 60, duration: 45, description: 'Tunsoare adaptată fizionomiei și stilului tău.' },
  { id: 'fade', name: 'Skin Fade', price: 70, duration: 50, description: 'Fade precis, tranziții curate și finisaj atent.' },
  { id: 'beard', name: 'Barbă', price: 40, duration: 30, description: 'Contur, styling și finisare profesională.' },
  { id: 'cut-beard', name: 'Tuns + Barbă', price: 90, duration: 70, description: 'Pachet complet pentru un look uniform și bine definit.' },
  { id: 'buzz', name: 'Buzz Cut', price: 45, duration: 30, description: 'Simplu, curat și executat precis.' },
  { id: 'premium', name: 'Premium Session', price: 120, duration: 90, description: 'Tuns, barbă, styling și finishing într-o experiență completă.' },
]
