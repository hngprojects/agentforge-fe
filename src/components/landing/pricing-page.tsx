'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Navbar } from './navbar'
import { Footer } from './footer'

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
      border: '2px solid #005F5A',
      background: '#005F5A',
      cursor: 'pointer',
    }}
  >
    <span
      style={{
        color: '#F6F7F7',
        fontFamily: 'Geist, Inter, sans-serif',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '28px',
      }}
    >
      Go Private
    </span>
  </button>
)

const CustomPackageButton = () => (
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
      border: '2px solid #005F5A',
      background: '#005F5A',
      cursor: 'pointer',
    }}
  >
    <span
      style={{
        color: '#F6F7F7',
        fontFamily: 'Geist, Inter, sans-serif',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '28px',
      }}
    >
      Custom Package
    </span>
  </button>
)

const plans = [
  {
    name: 'Free Tier',
    price: '0',
    description: 'Perfect for exploring and starting with simple agents',
    button: <StartForFreeButton />,
    features: [
      'Access to Public Registry',
      'Basic agent setup (files & Skills)',
      'Community support',
      'Standard GitHub publishing',
    ],
  },
  {
    name: 'Private Registry',
    price: '500',
    description:
      'For teams needing privacy, control and faster agent generation',
    button: <GoPrivateButton />,
    isPopular: true,
    features: [
      'Private Registry hosting',
      'Advanced agent structure',
      'Prioritized support',
      'Internal team collaboration tools',
      'Private GitHub sync',
    ],
  },
  {
    name: 'Enterprise Package',
    price: 'Custom',
    description: 'Custom solutions for high-scale agent workforce deployments',
    button: <CustomPackageButton />,
    features: [
      'Unlimited private registries',
      'Dedicated agent architect',
      '24/7 Enterprise SLA',
      'Custom integrations & Skills',
      'On-premise deployment options',
    ],
  },
]

const faqs = [
  {
    q: 'Can I change my plan later?',
    a: 'Yes, you can upgrade or downgrade your plan at any time through your dashboard settings. Changes will be reflected in your next billing cycle.',
  },
  {
    q: 'How does the Private Registry work?',
    a: 'A Private Registry allows you to store and manage your agent setup packages securely, accessible only by authorized members of your team or organization.',
  },
  {
    q: 'Is there a setup fee for Enterprise?',
    a: 'Enterprise pricing is tailored to your specific requirements. While there may be a one-time implementation fee, it covers dedicated architecture and integration support.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, bank transfers for enterprise clients, and are working on integrating cryptocurrency payments.',
  },
  {
    q: 'Do you offer a free trial for Private Registry?',
    a: 'Yes, we offer a 14-day free trial for the Private Registry plan so you can experience the full feature set before committing.',
  },
]

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:px-20 md:pt-32 md:pb-24">
        <div className="mb-16 flex flex-col items-center justify-center gap-4">
          <div
            style={{
              display: 'flex',
              padding: '4px 12px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              borderRadius: 24,
              border: '1.5px solid #F1F5F9',
              background: '#F8FAFC',
            }}
          >
            <span
              style={{
                color: '#005F5A',
                fontFamily: 'Geist, Inter, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.08em',
              }}
            >
              PRICING
            </span>
          </div>

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
            Simple, honest pricing
          </h1>
          <p
            style={{
              color: '#52525B',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
              fontSize: 18,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '28px',
              maxWidth: 580,
              margin: 0,
            }}
          >
            Get started with Anvila for free, or upgrade to a Private Registry
            for team collaboration and advanced architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[24px] border border-[#F1F5F9] bg-white p-10 transition-shadow hover:shadow-lg ${plan.isPopular ? 'border-[#0C5D56] ring-1 ring-[#0C5D56]' : ''}`}
            >
              {plan.isPopular && (
                <div
                  className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1"
                  style={{ background: '#FFF1EB' }}
                >
                  <FireIcon />
                  <span className="text-xs font-semibold text-[#ED5F15]">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="mb-2 text-xl font-bold text-[#0C0E0D]">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#52525B]">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#0C0E0D]">
                  {plan.price === 'Custom' ? '' : '$'}
                  {plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-[#71717A]">/mo</span>
                )}
              </div>

              <div className="mb-10">{plan.button}</div>

              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-semibold text-[#0C0E0D]">
                  FEATURES
                </h4>
                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm text-[#52525B]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-20 md:px-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#0C0E0D]">
            Frequently asked questions
          </h2>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="mb-4 overflow-hidden rounded-xl border border-[#E4E4E7] bg-white"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
              >
                <span className="font-semibold text-[#0C0E0D]">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={20} className="text-[#71717A]" />
                ) : (
                  <ChevronDown size={20} className="text-[#71717A]" />
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

      <Footer />
    </main>
  )
}
