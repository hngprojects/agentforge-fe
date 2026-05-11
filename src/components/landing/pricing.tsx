'use client'

import { Button } from '~/components/ui/button'
import { AuthDialog } from './auth-dialog'

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#0C5D56" />
    <path
      d="M8 12L11 15L16 9"
      stroke="white"
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
      stroke="#F97316"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Pricing() {
  const cardBaseStyle = {
    width: '100%',
    maxWidth: '397.5px',
    minHeight: '587px',
    borderRadius: '20px',
    borderWidth: '1px',
    padding: '2px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }

  return (
    <section className="w-full bg-white px-6 py-20 md:px-20 md:py-32">
      <div
        className="mx-auto flex w-full flex-col items-center"
        style={{ maxWidth: '1200px', gap: '64px' }}
      >
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className="inline-flex items-center"
            style={{
              padding: '6px 12px',
              gap: '8px',
              borderRadius: '9999px',
              background: '#F4F4F5',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '9999px',
                background: '#EA580C',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 500,
                color: '#52525B',
              }}
            >
              PRICING
            </span>
          </div>
          <h2
            className="text-4xl font-bold md:text-5xl"
            style={{ fontFamily: 'Inter', color: '#0C0E0D', margin: 0 }}
          >
            Simple, honest pricing.
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-8 md:flex-row lg:gap-12">
          {/* Free Card */}
          <div
            style={
              {
                ...cardBaseStyle,
                borderColor: '#D4D4D8',
                background: '#D4D4D8',
              } as React.CSSProperties
            }
          >
            <div className="px-8 py-6">
              <h3 className="text-xl font-semibold text-[#52525B]">Free</h3>
            </div>
            <div
              className="flex flex-1 flex-col bg-white p-8 shadow-sm"
              style={{ borderRadius: '18px' }} // Slightly less than 20px to fit inside with 2px padding
            >
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold text-[#3F3F46]">$ 0</span>
                </div>
                <p className="mt-8 text-lg text-[#A1A1AA]">
                  Always. No credit card required.
                </p>
              </div>

              <AuthDialog
                trigger={
                  <Button className="h-16 w-full rounded-2xl bg-[#E4E4E7] text-lg font-bold text-[#3F3F46] hover:bg-[#D4D4D8]">
                    Start for free
                  </Button>
                }
              />

              <div className="mt-auto flex flex-col gap-6">
                <p className="font-bold text-[#3F3F46]">
                  What&apos;s included:
                </p>
                <ul className="flex flex-col gap-5">
                  <li className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-[#52525B]">
                      Unlimited agent generation
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-[#52525B]">
                      Github auto-publishing
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-[#52525B]">
                      Listed in public registry
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Card */}
          <div
            style={
              {
                ...cardBaseStyle,
                borderColor: '#0C5D56',
                background: '#0C5D56',
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-between px-8 py-6">
              <h3 className="text-xl font-semibold text-white">Professional</h3>
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#71717A]">
                <FireIcon />
                MOST POPULAR
              </div>
            </div>
            <div
              className="flex flex-1 flex-col bg-white p-8 shadow-sm"
              style={{ borderRadius: '18px' }}
            >
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold text-[#3F3F46]">$ 5</span>
                  <span className="text-sm text-[#A1A1AA]">
                    one time payment
                  </span>
                </div>
                <p className="mt-8 text-lg text-[#A1A1AA]">
                  Best for fast agent and operations
                </p>
              </div>

              <AuthDialog
                trigger={
                  <Button className="h-16 w-full rounded-2xl bg-[#0C5D56] text-lg font-bold text-white hover:bg-[#0a4a3f]">
                    Go Private
                  </Button>
                }
              />

              <div className="mt-auto flex flex-col gap-6">
                <p className="font-bold text-[#3F3F46]">
                  Everything in Premium:
                </p>
                <ul className="flex flex-col gap-5">
                  <li className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-[#52525B]">Everything in public</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-[#52525B]">
                      Private GitHub repository
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-[#52525B]">Hidden from registry</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-[#52525B]">
                      Only you can access it
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
