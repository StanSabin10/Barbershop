export interface Service {
  id: string
  name: string
  price: number
  duration: number
  description: string
}

export interface Barber {
  id: string
  name: string
  firstName: string
  role: string
  specialties: string
  image: string
}

export interface BookingSelection {
  serviceId: string
  barberId: string
  date: string
  time: string
}

export interface ContactDetails {
  name: string
  phone: string
  email: string
  consent: boolean
}
