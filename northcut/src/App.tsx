import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import Booking from './pages/Booking'
import { NotFound } from './pages/NotFound'
import { useRouteEffects } from './hooks/useRouteEffects'

export default function App() {
  useRouteEffects()
  return <><Header /><Routes><Route path="/" element={<Home />} /><Route path="/booking" element={<Booking />} /><Route path="*" element={<NotFound />} /></Routes><Footer /></>
}
