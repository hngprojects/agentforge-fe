import { Features } from '~/components/landing/features'
import { Hero } from '~/components/landing/hero'
import { HowItWorks } from '~/components/landing/how-it-works'
import { Navbar } from '~/components/landing/navbar'
import { WhyAgentForge } from '~/components/landing/why-agentforge'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <WhyAgentForge />
    </main>
  )
}
