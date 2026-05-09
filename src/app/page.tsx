import { Navbar } from '~/components/landing/navbar'
import { Hero } from '~/components/landing/hero'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
    </main>
  )
}
