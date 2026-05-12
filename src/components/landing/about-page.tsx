'use client'

import React from 'react'
import myPicture from '../../pictures/girl.png'
import myPicture2 from '../../pictures/staff.png'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  User,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Github,
} from 'lucide-react'
// Standardized the path to match your alias structure
import { Button } from '~/components/ui/button'
import Link from 'next/link'

// Added 'export' here to fix the "not exported" error
export const AboutPage = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Pricing', href: '/pricing' },
  ]

  const footerLinks = {
    'Our Services': [
      { name: 'Create Package', href: '#' },
      { name: 'Browse Registry', href: '#' },
      { name: 'GitHub Publishing', href: '#' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Early Access', href: '#' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Press', href: '#' },
    ],
    'Support & Legal': [
      { name: 'GitHub', href: '#' },
      { name: 'Twitter / X', href: '#' },
      { name: 'Linkedin', href: '#' },
      { name: 'Discord', href: '#' },
      { name: 'Product Hunt', href: '#' },
    ],
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-10">
          <div className="flex items-center gap-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004D40]">
                <User className="h-5 w-5 fill-white text-white" />
              </div>
              <span className="text-2xl font-[900] tracking-[0.05em] text-[#004D40]">
                ANVILA
              </span>
            </Link>

            <nav className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[15px] font-semibold text-[#1A1A1A] transition-colors hover:text-[#004D40]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden h-auto rounded-lg border-gray-200 px-10 py-3.5 text-sm font-bold text-[#1A1A1A] shadow-sm sm:flex"
            >
              Button CTA
            </Button>
            <Button className="h-auto rounded-lg bg-[#004D40] px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#004D40]/20 hover:bg-[#003632]">
              Button CTA
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-[1440px] px-10 pt-20 pb-32 lg:pt-32 lg:pb-40">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">
                <div className="h-2 w-2 rounded-full bg-[#FF6B35]" />
                <span className="text-[12px] font-bold tracking-wide text-[#637381]">
                  About Us
                </span>
              </div>
              <h1 className="mb-10 text-6xl leading-[1.05] font-bold tracking-[-0.03em] lg:text-7xl">
                The Standard for Portable Intelligence
              </h1>
              <div className="max-w-xl space-y-8">
                <p className="text-[18px] leading-relaxed text-[#637381]">
                  In the rapidly evolving world of AI, consistency is often the
                  missing piece. Most AI interactions are ephemeral temporary
                  conversations lost in a chat history.
                </p>
                <p className="text-[18px] leading-relaxed text-[#637381]">
                  At Anvila, we believe that an AI&apos;s persona, logic, and
                  skill-set should be more than just a fleeting prompt. They
                  should be permanent, structured, and reusable assets.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square overflow-hidden rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]"
            >
              <Image
                src={myPicture} // Use the imported variable name here
                alt="Portrait of professional woman"
                fill // Use fill since the parent has 'relative' and 'aspect-ratio'
                className="object-cover"
                priority // Since this is in the Hero section, priority helps LCP
              />
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="overflow-hidden bg-[#F8FAFB] py-32 lg:py-48">
          <div className="mx-auto max-w-[1440px] px-10">
            <div className="grid items-center gap-24 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square overflow-hidden rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]"
              >
                <Image
                  src={myPicture2} // Use the imported variable name here
                  alt="Portrait of professional woman"
                  fill // Use fill since the parent has 'relative' and 'aspect-ratio'
                  className="object-fill"
                  priority // Since this is in the Hero section, priority helps LCP
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <h2 className="mb-10 text-5xl font-bold tracking-tight lg:text-6xl">
                  Our Mission
                </h2>
                <div className="space-y-6">
                  <p className="text-[18px] leading-relaxed text-[#637381]">
                    Our mission is to provide the distribution layer for the
                    next generation of AI Agents. We&apos;ve built the
                    &quot;Forge&quot; that transforms natural language
                    descriptions into a standardized architecture.
                  </p>
                  <p className="text-[18px] leading-relaxed text-[#637381]">
                    By packaging an agent&apos;s Identity, Soul, and DNA into a
                    portable file system, we enable developers and creators to
                    build AI that is version controlled, shareable, and ready
                    for deployment.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Build Section */}
        <section className="mx-auto max-w-[1440px] px-10 py-32 lg:py-48">
          <div className="mb-24 text-center">
            <h2 className="text-5xl font-bold tracking-tight lg:text-6xl">
              Why we Build
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex h-full flex-col rounded-[40px] border border-gray-100/50 bg-[#F8FAFB] p-12 shadow-sm"
            >
              <h3 className="mb-6 text-2xl font-bold">
                From Chaos to Structure
              </h3>
              <p className="text-[16px] leading-relaxed text-[#637381]">
                We replace messy, inconsistent prompts with a clean, GitHub
                ready file protocol that ensures every interaction follows a
                predefined logic.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-10 flex h-full flex-col rounded-[40px] bg-[#004D40] p-12 text-white shadow-2xl shadow-[#004D40]/30"
            >
              <h3 className="mb-6 text-2xl font-bold">
                Collaborative Innovation
              </h3>
              <p className="text-[16px] leading-relaxed text-white/80">
                Through our Public Registry, we empower a global community to
                share and build upon the world&apos;s best AI blueprints,
                accelerating the pace of intelligence development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex h-full flex-col rounded-[40px] border border-gray-100/50 bg-[#F8FAFB] p-12 shadow-sm"
            >
              <h3 className="mb-6 text-2xl font-bold">
                Professional Reliability
              </h3>
              <p className="text-[16px] leading-relaxed text-[#637381]">
                We treat AI Agents as digital employees. By standardizing their
                &quot;Instruction Manuals,&quot; we ensure they remain reliable,
                repeatable tools for businesses and developers alike.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#004D40] pt-32 pb-16 text-white">
        <div className="mx-auto max-w-[1440px] px-10">
          <div className="mb-24 grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Link href="/" className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                  <User className="h-5 w-5 fill-white text-white" />
                </div>
                <span className="text-2xl font-[900] tracking-[0.05em]">
                  ANVILA
                </span>
              </Link>
              <p className="mb-10 max-w-sm text-[16px] leading-relaxed text-white/60">
                Builders use Anvila to turn plain descriptions into reusable AI
                agent packages that can be cloned, adapted, published, or kept
                private.
              </p>
              <div className="flex gap-8">
                <Link
                  href="#"
                  className="transform text-white/40 transition-all hover:scale-110 hover:text-white"
                >
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link
                  href="#"
                  className="transform text-white/40 transition-all hover:scale-110 hover:text-white"
                >
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link
                  href="#"
                  className="transform text-white/40 transition-all hover:scale-110 hover:text-white"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link
                  href="#"
                  className="transform text-white/40 transition-all hover:scale-110 hover:text-white"
                >
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-4 lg:col-span-7">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h4 className="mb-10 text-[13px] font-bold tracking-[0.1em] text-white/50 uppercase">
                    {title}
                  </h4>
                  <ul className="space-y-5">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-[15px] text-white/70 transition-colors hover:text-white"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 h-px bg-white/10" />

          <div className="flex flex-col items-center justify-between gap-8 text-[14px] md:flex-row">
            <p className="font-medium text-white/40">
              &copy; {new Date().getFullYear()} Anvila. All rights reserved.
            </p>
            <div className="flex items-center gap-10 text-white/50">
              <Link
                href="#"
                className="font-medium transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
              <Link
                href="#"
                className="font-medium transition-colors hover:text-white"
              >
                Terms of service
              </Link>
              <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
              <Link
                href="#"
                className="font-medium transition-colors hover:text-white"
              >
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
