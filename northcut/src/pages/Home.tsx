import { Hero } from '../components/sections/Hero'
import { Services } from '../components/sections/Services'
import { About } from '../components/sections/About'
import { Team } from '../components/sections/Team'
import { Experience } from '../components/sections/Experience'
import { Gallery } from '../components/sections/Gallery'
import { Visit } from '../components/sections/Visit'
import { FinalCTA } from '../components/sections/FinalCTA'

export function Home() {
  return <main id="main"><Hero /><Services /><About /><Team /><Experience /><Gallery /><Visit /><FinalCTA /></main>
}
