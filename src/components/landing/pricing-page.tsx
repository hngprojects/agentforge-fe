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
import { AuthDialog } from './auth-dialog'

const CheckIcon = () => (
  <span
    style={{
      display: 'inline-flex',
      width: 20,
      height: 20,
      borderRadius: 9999,
      background: '#0C5D56',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
    >
      <path
        d="M11.7502 0.251116C12.085 0.585938 12.085 1.12969 11.7502 1.46451L4.89308 8.32165C4.55826 8.65647 4.01451 8.65647 3.67969 8.32165L0.251116 4.89308C-0.0837054 4.55826 -0.0837054 4.01451 0.251116 3.67969C0.585938 3.34487 1.12969 3.34487 1.46451 3.67969L4.28772 6.50022L10.5395 0.251116C10.8743 -0.0837054 11.4181 -0.0837054 11.7529 0.251116H11.7502Z"
        fill="white"
      />
    </svg>
  </span>
)

const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M11.7734 7.46667C11.62 7.26667 11.4334 7.09333 11.26 6.92C10.8134 6.52 10.3067 6.23333 9.88003 5.81333C8.8867 4.84 8.6667 3.23333 9.30003 2C8.6667 2.15333 8.11337 2.5 7.64003 2.88C5.91337 4.26667 5.23337 6.71333 6.0467 8.81333C6.07337 8.88 6.10003 8.94667 6.10003 9.03333C6.10003 9.18 6.00003 9.31333 5.8667 9.36667C5.71337 9.43333 5.55337 9.39333 5.4267 9.28667C5.38886 9.25497 5.35722 9.21655 5.33337 9.17333C4.58003 8.22 4.46003 6.85333 4.9667 5.76C3.85337 6.66667 3.2467 8.2 3.33337 9.64667C3.37337 9.98 3.41337 10.3133 3.5267 10.6467C3.62003 11.0467 3.80003 11.4467 4.00003 11.8C4.72003 12.9533 5.9667 13.78 7.3067 13.9467C8.73337 14.1267 10.26 13.8667 11.3534 12.88C12.5734 11.7733 13 10 12.3734 8.48L12.2867 8.30667C12.1467 8 11.7734 7.46667 11.7734 7.46667ZM9.6667 11.6667C9.48003 11.8267 9.17337 12 8.93337 12.0667C8.1867 12.3333 7.44003 11.96 7.00003 11.52C7.79337 11.3333 8.2667 10.7467 8.4067 10.1533C8.52003 9.62 8.3067 9.18 8.22003 8.66667C8.14003 8.17333 8.15337 7.75333 8.33337 7.29333C8.46003 7.54667 8.59337 7.8 8.75337 8C9.2667 8.66667 10.0734 8.96 10.2467 9.86667C10.2734 9.96 10.2867 10.0533 10.2867 10.1533C10.3067 10.7 10.0667 11.3 9.6667 11.6667Z"
      fill="#ED5F15"
    />
  </svg>
)

const StartForFreeButton = () => (
  <button
    style={{
      display: 'flex',
      height: 57,
      padding: '17px 113px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      alignSelf: 'stretch',
      borderRadius: 10,
      border: '2px solid #E4E4E7',
      background: '#E6E6E6',
      cursor: 'pointer',
    }}
  >
    <span
      style={{
        color: '#52525B',
        fontFamily: 'Geist, Inter, sans-serif',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '28px',
      }}
    >
      Start for free
    </span>
  </button>
)

const GoPrivateButton = () => (
  <button
    style={{
      display: 'flex',
      height: 55.65,
      padding: '16px 103px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      alignSelf: 'stretch',
      borderRadius: 10,
      background: '#0C5D56',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    <span
      style={{
        color: '#FFFFFF',
        fontFamily: 'Lato, Inter, sans-serif',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
      }}
    >
      Go Private
    </span>
  </button>
)

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

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What does "one-time per agent" mean?',
      a: 'You pay once to turn a specific agent setup private. No recurring subscriptions.',
    },
    {
      q: 'Can I make a public agent private later?',
      a: 'Yes, upgrade any public agent to professional at any time.',
    },
    {
      q: 'Is there a limit on how many agents I can generate?',
      a: 'No, both plans allow unlimited agent generation.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'All major credit cards, PayPal, and crypto.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Generally no, but contact support for issues.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {}
      <section
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 1440,
          margin: '0 auto',
          padding: '40px 80px',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 48,
          alignSelf: 'stretch',
        }}
      >
        {}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {}
          <div
            style={{
              display: 'flex',
              padding: '6px 12px',
              alignItems: 'center',
              gap: 8,
              borderRadius: 9999,
              border: '0.5px solid #A1A1AA',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: '#EA580C',
              }}
            />
            <span
              style={{
                color: '#52525B',
                fontFamily: 'Geist, Inter, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.08em',
              }}
            >
              PRICING
            </span>
          </div>

          {}
          <h1
            style={{
              color: '#0C0E0D',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
              fontSize: 48,
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '48px',
              margin: 0,
            }}
          >
            Simple, honest pricing.
          </h1>

          {}
          <p
            style={{
              color: '#52525B',
              textAlign: 'center',
              fontFamily: 'Geist, Inter, sans-serif',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '24px',
              maxWidth: 600,
              margin: 0,
            }}
          >
            Public agents are always free. Pay once to go private. No
            subscriptions, no surprises.
          </p>
        </div>

        {}
        <div
          style={{
            display: 'flex',
            padding: '12px 24px',
            alignItems: 'stretch',
            gap: 5,
            alignSelf: 'stretch',
          }}
        >
          {}
          <div
            style={{
              display: 'flex',
              padding: 24,
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 10,
              flex: '1 0 0',
              alignSelf: 'stretch',
              borderRadius: 20,
              border: '1px solid #F0F0F0',
              background: '#FFFFFF',
            }}
          >
            {}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: '1 0 0',
                alignSelf: 'stretch',
              }}
            >
              <span
                style={{
                  color: '#52525B',
                  fontFamily: 'Geist, Inter, sans-serif',
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: '28px',
                }}
              >
                Free
              </span>
            </div>

            {}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span
                style={{
                  color: '#52525B',
                  fontFamily: 'Geist, Inter, sans-serif',
                  fontSize: 36,
                  fontWeight: 600,
                  lineHeight: '44px',
                }}
              >
                $
              </span>
              <span
                style={{
                  color: '#52525B',
                  fontFamily: 'Geist, Inter, sans-serif',
                  fontSize: 36,
                  fontWeight: 600,
                  lineHeight: '44px',
                }}
              >
                0
              </span>
            </div>

            <p
              style={{
                color: '#A1A1AA',
                fontFamily: 'Geist, Inter, sans-serif',
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '24px',
                margin: 0,
              }}
            >
              Always. No credit card required.
            </p>

            <AuthDialog trigger={<StartForFreeButton />} />

            <p
              style={{
                color: '#52525B',
                fontFamily: 'Geist, Inter, sans-serif',
                fontSize: 16,
                fontWeight: 600,
                lineHeight: '24px',
                margin: 0,
                marginTop: 8,
              }}
            >
              What&apos;s included:
            </p>

            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 12,
                alignSelf: 'stretch',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {[
                'Unlimited agent generation',
                'Github auto-publishing',
                'Listed in public registry',
              ].map((t) => (
                <li
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#52525B',
                    fontFamily: 'Geist, Inter, sans-serif',
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: '20px',
                  }}
                >
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {}
          <div
            style={{
              display: 'flex',
              minHeight: 587,
              padding: 2,
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: '1 0 0',
              alignSelf: 'stretch',
              borderRadius: 20,
              border: '1px solid #0C5D56',
              background: '#0C5D56',
            }}
          >
            {}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 22px',
                alignSelf: 'stretch',
              }}
            >
              <span
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Geist, Inter, sans-serif',
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: '30px',
                }}
              >
                Professional
              </span>

              {}
              <div
                style={{
                  display: 'flex',
                  padding: '4px 10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: 20,
                  background: '#FFFFFF',
                }}
              >
                <FireIcon />
                <span
                  style={{
                    color: '#7A7A7A',
                    fontFamily: 'Geist, Inter, sans-serif',
                    fontSize: 10,
                    fontWeight: 400,
                    lineHeight: '16px',
                  }}
                >
                  MOST POPULAR
                </span>
              </div>
            </div>

            {}
            <div
              style={{
                display: 'flex',
                padding: 24,
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 10,
                flex: '1 0 0',
                alignSelf: 'stretch',
                borderRadius: 18,
                background: '#FFFFFF',
              }}
            >
              {}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span
                  style={{
                    color: '#52525B',
                    fontFamily: 'Geist, Inter, sans-serif',
                    fontSize: 36,
                    fontWeight: 600,
                    lineHeight: '44px',
                  }}
                >
                  $
                </span>
                <span
                  style={{
                    color: '#52525B',
                    fontFamily: 'Geist, Inter, sans-serif',
                    fontSize: 36,
                    fontWeight: 600,
                    lineHeight: '44px',
                  }}
                >
                  5
                </span>
                <span
                  style={{
                    color: '#A1A1AA',
                    fontFamily: 'Geist, Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: '24px',
                    width: 280,
                  }}
                >
                  one time payment
                </span>
              </div>

              <p
                style={{
                  color: '#A1A1AA',
                  fontFamily: 'Geist, Inter, sans-serif',
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: '24px',
                  margin: 0,
                }}
              >
                Best for fast agent and operations
              </p>

              <AuthDialog trigger={<GoPrivateButton />} />

              <p
                style={{
                  color: '#52525B',
                  fontFamily: 'Geist, Inter, sans-serif',
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: '24px',
                  margin: 0,
                  marginTop: 8,
                }}
              >
                Everything in Premium:
              </p>

              <ul
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 12,
                  alignSelf: 'stretch',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {[
                  'Everything in public',
                  'Private GitHub repository',
                  'Hidden from registry',
                  'Only you can access it',
                ].map((t) => (
                  <li
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      color: '#52525B',
                      fontFamily: 'Geist, Inter, sans-serif',
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: '20px',
                    }}
                  >
                    <CheckIcon />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {}
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

      {}
      <footer
        className="w-full"
        style={{ background: '#0C5D56', padding: '40px 80px' }}
      >
        <div
          className="mx-auto flex w-full flex-col"
          style={{ maxWidth: 1280, gap: 60 }}
        >
          <div
            className="flex flex-col gap-12 lg:grid lg:gap-12"
            style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}
          >
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
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '1px',
                  }}
                >
                  AGENTFORGE
                </span>
              </div>
              <p style={{ color: '#A0A5A3', fontSize: 14, lineHeight: 1.7 }}>
                Agentforge helps builders turn agents ideas into clean setup
                packages.
              </p>
              <div className="flex gap-4">
                <Link href="#" style={footerLinkStyle}>
                  <Facebook size={20} />
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  <Twitter size={20} />
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  <Linkedin size={20} />
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  <Instagram size={20} />
                </Link>
              </div>
            </div>
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
                  Pricing
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
              </div>
            </div>
            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Support & Legal</h4>
              <div className="flex flex-col gap-3">
                <Link href="#" style={footerLinkStyle}>
                  GitHub
                </Link>
                <Link href="#" style={footerLinkStyle}>
                  Discord
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 md:flex-row">
            <p style={{ color: '#A0A5A3', fontSize: 14 }}>
              © 2024 AgentForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
