'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Navbar } from './navbar'
import { Button } from '~/components/ui/button'
import { AuthDialog } from './auth-dialog'

/* ────────────────────────────────────────────
   Icons & Sub-components
   ──────────────────────────────────────────── */
const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="#0D9488"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const FireIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C12 2 11 4 11 6C11 8.5 13 10.5 15.5 10.5C18 10.5 20 8.5 20 6C20 6 21 8 21 11C21 15.97 16.97 20 12 20C7.03 20 3 15.97 3 11C3 7 6 3 12 2Z"
      fill="#F97316"
    />
  </svg>
)

/* ────────────────────────────────────────────
   Styles
   ──────────────────────────────────────────── */
const footerLinkStyle: React.CSSProperties = {
  color: '#A0A5A3',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

const footerHeadingStyle: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: '20px',
}

/* ────────────────────────────────────────────
   Main Pricing Page Component
   ──────────────────────────────────────────── */
export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What does "one-time per agent" mean?',
      a: 'This means you pay once to turn a specific agent setup private. There are no recurring subscriptions for that agent.',
    },
    {
      q: 'Can I make a public agent private later?',
      a: 'Yes, you can upgrade any public agent to professional at any time to make it private and unlock exclusive features.',
    },
    {
      q: 'Is there a limit on how many agents I can generate?',
      a: 'No, both plans allow for unlimited agent generation. The main difference is privacy and GitHub repository hosting.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, PayPal, and crypto payments for professional upgrades.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Due to the nature of digital generated assets, we generally do not offer refunds once an agent is generated, but contact support if you have issues.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="flex flex-col items-center px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="mb-6 flex items-center gap-2 rounded-full bg-[#F4F4F5] px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-[#EA580C]" />
          <span className="text-[12px] font-medium tracking-wider text-[#52525B]">
            PRICING
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: '1.2',
            textAlign: 'center',
            color: '#0C0E0D',
          }}
        >
          Simple, honest pricing.
        </h1>
        <p
          className="mt-4 text-center text-[#52525B]"
          style={{ fontFamily: 'Inter', fontSize: '16px', maxWidth: '600px' }}
        >
          Public agents are always free. Pay once to go private. No
          subscriptions, no surprises.
        </p>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:px-20">
        {/* Free Card */}
        <div className="flex-1 overflow-hidden rounded-[20px] border border-[#E4E4E7] bg-white shadow-sm">
          <div className="bg-[#E4E4E7] px-8 py-4">
            <span className="text-[14px] font-semibold text-[#52525B]">
              Free
            </span>
          </div>
          <div className="flex flex-col p-8">
            <div className="mb-8">
              <span
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '36px',
                  lineHeight: '44px',
                  color: '#52525B',
                }}
              >
                $ 0
              </span>
              <p className="mt-6 text-[#71717A]">
                Always. No credit card required.
              </p>
            </div>
            <AuthDialog
              trigger={
                <Button className="h-12 w-full rounded-[10px] bg-[#E4E4E7] font-semibold text-[#52525B] hover:bg-[#D4D4D8]">
                  Start for free
                </Button>
              }
            />
            <div className="mt-10 flex flex-col gap-4">
              <p className="text-[14px] font-semibold text-[#0C0E0D]">
                What&apos;s Included:
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-[#52525B]">
                  <CheckIcon /> Unlimited agent generation
                </li>
                <li className="flex items-center gap-3 text-[#52525B]">
                  <CheckIcon /> Github auto-publishing
                </li>
                <li className="flex items-center gap-3 text-[#52525B]">
                  <CheckIcon /> Listed in public registry
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Card */}
        <div className="flex-1 overflow-hidden rounded-[20px] border border-[#0C5D56] bg-white shadow-lg">
          <div className="flex items-center justify-between bg-[#0C5D56] px-8 py-4">
            <span className="text-[14px] font-semibold text-white">
              Professional
            </span>
            <div className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5">
              <FireIcon />
              <span className="text-[10px] font-bold text-[#71717A]">
                MOST POPULAR
              </span>
            </div>
          </div>
          <div className="flex flex-col p-8">
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '36px',
                    lineHeight: '44px',
                    color: '#52525B',
                  }}
                >
                  $ 5
                </span>
                <span className="text-[12px] text-[#71717A]">
                  one time payment
                </span>
              </div>
              <p className="mt-6 text-[#71717A]">
                Best for fast agent and operations
              </p>
            </div>
            <AuthDialog
              trigger={
                <Button className="h-12 w-full rounded-[10px] bg-[#0C5D56] font-semibold text-white hover:bg-[#094a45]">
                  Go Private
                </Button>
              }
            />
            <div className="mt-10 flex flex-col gap-4">
              <p className="text-[14px] font-semibold text-[#0C0E0D]">
                Everything in Premium:
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-[#52525B]">
                  <CheckIcon /> Everything in public
                </li>
                <li className="flex items-center gap-3 text-[#52525B]">
                  <CheckIcon /> Private GitHub repository
                </li>
                <li className="flex items-center gap-3 text-[#52525B]">
                  <CheckIcon /> Hidden from registry
                </li>
                <li className="flex items-center gap-3 text-[#52525B]">
                  <CheckIcon /> Only you can access it
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Comparison ── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:px-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-[#0C0E0D]">
          Full Comparison
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#E4E4E7]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F9FAFB] text-[14px] font-semibold text-[#52525B]">
                <th className="px-6 py-4">Features</th>
                <th className="px-6 py-4">Standard</th>
                <th className="px-6 py-4">Professional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {[
                ['Agent generation', 'Unlimited', 'Unlimited'],
                ['GitHub publishing', 'check', 'check'],
                ['Public registry listing', 'check', 'check'],
                ['Hidden from registry', 'dash', 'check'],
                ['ZIP download', 'dash', 'check'],
                ['Community templates', 'check', 'check'],
                ['Priority queue', 'check', 'check'],
              ].map(([feature, standard, pro], i) => (
                <tr key={i} className="text-[14px] text-[#52525B]">
                  <td className="px-6 py-4 font-medium text-[#0C0E0D]">
                    {feature}
                  </td>
                  <td className="px-6 py-4">
                    {standard === 'check' ? (
                      <CheckIcon />
                    ) : standard === 'dash' ? (
                      <span className="text-[#A1A1AA]">—</span>
                    ) : (
                      standard
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {pro === 'check' ? <CheckIcon /> : pro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#0C0E0D]">
          Frequently asked
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E4E4E7] bg-white"
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-[#0C0E0D]">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openFaq === i && (
                <div className="border-t border-[#E4E4E7] p-6 text-[#52525B]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="w-full"
        style={{ background: '#0C5D56', padding: '40px 80px 40px 80px' }}
      >
        <div
          className="mx-auto flex w-full flex-col"
          style={{ maxWidth: '1280px', gap: '60px' }}
        >
          <div
            className="flex flex-col gap-12 lg:grid lg:gap-12"
            style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}
          >
            {/* Brand Column */}
            <div className="flex max-w-sm flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="8" r="4" fill="#005F5A" />
                    <path
                      d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
                      stroke="#005F5A"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '1px',
                  }}
                >
                  AGENTFORGE
                </span>
              </div>
              <p
                style={{
                  color: '#A0A5A3',
                  fontSize: '14px',
                  lineHeight: '1.7',
                }}
              >
                Agentforge helps builders turn agents ideas into clean setup
                packages with personality files, skills, and GitHub publishing.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  <Instagram size={20} />
                </Link>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Our Services</h4>
              <div className="flex flex-col gap-3">
                <Link href="#" style={footerLinkStyle}>
                  Create Package
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Browse Registry
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  GitHub Publishing
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Pricing
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Early Access
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Company</h4>
              <div className="flex flex-col gap-3">
                <Link href="#" style={footerLinkStyle}>
                  About Us
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Blog
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Contact
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Partners
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Press
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Support & Legal</h4>
              <div className="flex flex-col gap-3">
                <Link href="#" style={footerLinkStyle}>
                  GitHub
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Twitter / X
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  LinkedIn
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Discord
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Product Hunt
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 md:flex-row">
            <p style={{ color: '#A0A5A3', fontSize: '14px' }}>
              © 2024 AgentForge. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Link href="#" style={footerLinkStyle}>
                Privacy Policy
              </Link>
              <span style={{ color: '#A0A5A3', fontSize: '14px' }}>•</span>
              <Link href="#" style={footerLinkStyle}>
                Terms of service
              </Link>
              <span style={{ color: '#A0A5A3', fontSize: '14px' }}>•</span>
              <Link href="#" style={footerLinkStyle}>
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
