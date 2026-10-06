import type { ComponentPropsWithoutRef } from 'react'
import { site } from '../../data/site'

export function BookingLink({ children, ...attributes }: ComponentPropsWithoutRef<'a'>) {
  return <a {...attributes} href={site.meroBookingUrl} target="_blank" rel="noopener noreferrer">{children}</a>
}
