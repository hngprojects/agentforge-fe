import { Features } from '~/components/landing/features'
import { FinalCTA } from '~/components/landing/final-cta'
import { Footer } from '~/components/landing/footer'
import { Hero } from '~/components/landing/hero'
import { HowItWorks } from '~/components/landing/how-it-works'
import { Navbar } from '~/components/landing/navbar'
import { Pricing } from '~/components/landing/pricing'
import { WhyAgentForge } from '~/components/landing/why-agentforge'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <WhyAgentForge />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  )
}
