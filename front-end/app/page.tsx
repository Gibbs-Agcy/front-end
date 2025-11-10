import { Hero } from './components/sections/hero'
import { Services } from './components/sections/services'
import { TeamPortfolio } from './components/sections/team-portfolio'
import { Testimonials } from './components/sections/testimonials'
import { TechStack } from './components/sections/tech-stack'
import { Contact } from './components/sections/contact'
import { FAQ } from './components/sections/faq'

/**
 * Home page component
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <TeamPortfolio />
      <Testimonials />
      <TechStack />
      <Contact />
      <FAQ />
    </>
  )
}

