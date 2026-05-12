'use client'

import { useState } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    message: '',
  })
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setErrorMessage('')

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
      const res = await fetch(`${baseUrl}/api/v1/contact/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullname,
          email: formData.email,
          phone_number: formData.phone,
          message: formData.message,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          data?.detail ?? 'Something went wrong. Please try again.'
        )
      }

      setFormState('success')
      setFormData({ fullname: '', email: '', phone: '', message: '' })
    } catch (err) {
      setFormState('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    }
  }

  const inputClass =
    'h-12 w-full rounded-[6px] border border-[#E4E4E7] bg-white px-4 py-3 text-base outline-none transition-all focus:border-[#005F5A] focus:ring-1 focus:ring-[#005F5A]'

  return (
    <div className="font-inter min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-6 py-12 md:px-20 md:py-24">
        {/* Hero + Form Row */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Left Column */}
          <div className="w-full max-w-xl flex-1">
            <h1 className="mb-6 text-5xl font-medium tracking-tight text-[#0C0E0D] md:text-6xl lg:text-7xl">
              Contact Us
            </h1>
            <p className="text-lg leading-relaxed text-[#52525B] md:text-xl">
              Have questions about the Anvila protocol or need help scaling your
              AI workforce? Our team of architects is ready to assist.
            </p>
          </div>

          {/* Right Column: Form Card */}
          <div
            className="w-full rounded-[12px] border border-[#E6E6E6] bg-[#F6F7F7] lg:max-w-[652px]"
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
            }}
          >
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-medium text-[#0C0E0D] md:text-3xl lg:text-4xl">
                Get in Touch
              </h2>
              <p className="text-base text-[#71717A]">
                You can reach us anytime
              </p>
            </div>

            {/* Success State */}
            {formState === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#005F5A]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0C0E0D]">
                  Message Sent!
                </h3>
                <p className="text-sm text-[#71717A]">
                  Thanks for reaching out. Our team will get back to you within
                  24 hours.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-2 text-sm font-medium text-[#005F5A] underline underline-offset-2 hover:text-[#004D49]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fullname"
                    className="text-sm font-semibold text-[#0C0E0D]"
                  >
                    Enter Fullname
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Enter Fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#0C0E0D]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-[#0C0E0D]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we Help?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[140px] w-full resize-none rounded-xl border border-[#E4E4E7] bg-white p-4 text-base transition-all outline-none focus:border-[#005F5A] focus:ring-1 focus:ring-[#005F5A]"
                  />
                </div>

                {/* Error message */}
                {formState === 'error' && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full rounded-[8px] bg-[#005F5A] text-white transition-colors hover:bg-[#004D49] disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    height: '48px',
                    border: '0.5px solid #005F5A',
                    paddingTop: '12px',
                    paddingRight: '20px',
                    paddingBottom: '12px',
                    paddingLeft: '20px',
                    gap: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {formState === 'loading' ? 'Sending…' : 'Continue'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-32 lg:grid-cols-3">
          {/* Card 1 — Technical Support */}
          <div
            className="flex flex-col"
            style={{
              borderRadius: '12px',
              padding: '30px 20px',
              gap: '28px',
              background: '#FFFFFF',
              border: '1px solid #F1F5F9',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
              minHeight: '234px',
            }}
          >
            <h3 className="text-xl font-semibold text-[#0C0E0D]">
              Technical Support
            </h3>
            <p className="text-sm leading-relaxed text-[#52525B]">
              Struggling with a GitHub sync or the dna.md structure? Our
              developers are here to help you troubleshoot your Forge.
            </p>
            <div className="flex flex-col gap-1 text-sm text-[#0C0E0D]">
              <p className="font-semibold">Response time: Under 24 hours</p>
              <p>Email: support@Anvila.ai</p>
            </div>
          </div>

          {/* Card 2 — Partnerships & Enterprise */}
          <div
            className="flex flex-col"
            style={{
              borderRadius: '12px',
              padding: '30px 20px',
              gap: '28px',
              background: '#005F5A',
              minHeight: '234px',
              color: '#FFFFFF',
            }}
          >
            <h3 className="text-xl font-semibold">Partnerships & Enterprise</h3>
            <p className="text-sm leading-relaxed text-[#E7E7E7]">
              Looking for private registries or custom &quot;Agent DNA&quot; for
              your organization? Let&apos;s build a tailored solution.
            </p>
            <div className="text-sm">
              <p>Email: partners@Anvila.ai</p>
            </div>
          </div>

          {/* Card 3 — Media & Press */}
          <div
            className="flex flex-col sm:col-span-2 lg:col-span-1"
            style={{
              borderRadius: '12px',
              padding: '30px 20px',
              gap: '28px',
              background: '#FFFFFF',
              border: '1px solid #F1F5F9',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
              minHeight: '234px',
            }}
          >
            <h3 className="text-xl font-semibold text-[#0C0E0D]">
              Media & Press
            </h3>
            <p className="text-sm leading-relaxed text-[#52525B]">
              Interested in featuring Anvila&apos;s mission to standardize
              portable intelligence?
            </p>
            <div className="text-sm text-[#0C0E0D]">
              <p>Email: press@Anvila.ai</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
