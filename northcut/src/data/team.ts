import type { Barber } from '../types'
import { images } from './images'

export const team: Barber[] = [
  { id: 'alex', name: 'Alex Marin', firstName: 'Alex', role: 'Senior Barber', specialties: 'Skin Fade · Classic Cuts · Beard Styling', image: images.alex },
  { id: 'radu', name: 'Radu Stoica', firstName: 'Radu', role: 'Barber', specialties: 'Modern Cuts · Textured Hair · Fade', image: images.radu },
  { id: 'matei', name: 'Matei Tudor', firstName: 'Matei', role: 'Barber', specialties: 'Classic Style · Beard Care · Styling', image: images.matei },
]
