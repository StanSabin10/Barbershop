import type { Barber } from '../types'
import { images } from './images'

export const team: Barber[] = [
  { id: 'alex', name: 'Alex Marin', firstName: 'Alex', role: 'Frizer senior', specialties: 'Skin fade · Tunsori clasice · Îngrijirea bărbii', image: images.alex },
  { id: 'radu', name: 'Radu Stoica', firstName: 'Radu', role: 'Frizer', specialties: 'Tunsori moderne · Păr texturat · Degradé', image: images.radu },
  { id: 'matei', name: 'Matei Tudor', firstName: 'Matei', role: 'Frizer', specialties: 'Stil clasic · Îngrijirea bărbii · Coafare', image: images.matei },
]
