import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { useRouteEffects } from './hooks/useRouteEffects'

export default function App() {
  useRouteEffects()
  return <><Header /><Routes><Route path="/" element={<Home />} /><Route path="*" element={<NotFound />} /></Routes><Footer /></>
}
