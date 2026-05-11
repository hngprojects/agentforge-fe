'use client'

import { useState } from 'react'
import { AuthDialog } from './auth-dialog'

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 12H12M12 12H18M12 12V6M12 12V18"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 20L12 4M6 10L12 4L18 10"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CAREER_CHIPS = [
  'AI Developers & Engineers',
  'Prompt Engineers',
  'No-Code Builders',
  'Founders',
]

// EXACT spec: width 186px, padding 10px, gap 10px, radius 16px, bg #F4F4F5
// Text: Inter 16px weight 500, color #52525B
const chipStyle: React.CSSProperties = {
  display: 'flex',
  width: '186px',
  padding: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '16px',
  background: '#F4F4F5',
  color: '#52525B',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 'normal',
  cursor: 'pointer',
  border: 'none',
  whiteSpace: 'nowrap',
}

export function Hero() {
  const [value, setValue] = useState('')

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: '#FAFAFA',
        backgroundImage:
          'radial-gradient(circle, #D4D4D8 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Outer container per spec: width 1438px, height 640px, padding 40px 80px, gap 48px */}
      <div
        className="mx-auto flex w-full flex-col items-center justify-center px-6 py-12 md:px-20 md:py-24 lg:h-[640px]"
        style={{
          maxWidth: '1438px',
          gap: '48px',
        }}
      >
        {/* Text section - flex-direction column, gap 24px, align-self stretch */}
        <div
          className="flex w-full flex-col items-center self-stretch"
          style={{ gap: '16px' }}
        >
          <h1
            className="text-center text-[32px] font-bold sm:text-5xl md:text-6xl lg:text-[72px]"
            style={{
              fontFamily: 'Inter',
              lineHeight: '1.2',
              color: '#0C0E0D',
              margin: 0,
            }}
          >
            The Home for Reusable
          </h1>
          <h1
            className="text-center text-[28px] font-bold sm:text-5xl md:text-6xl lg:text-[64px]"
            style={{
              fontFamily: 'Inter',
              lineHeight: '1.2',
              color: '#0C0E0D',
              margin: 0,
            }}
          >
            AI Agent Setups
          </h1>

          <p
            className="text-center text-[13px] sm:text-sm"
            style={{
              fontFamily: 'Inter',
              fontWeight: 400,
              lineHeight: '1.5',
              color: '#52525B',
              margin: 0,
              maxWidth: '320px',
            }}
          >
            Describe your agent setup and get a structured package you can
            publish, share, and reuse.
          </p>
        </div>

        {/* Input box */}
        <div
          className="flex w-full items-center px-4 md:px-6"
          style={{
            maxWidth: '800px',
            height: '60px',
            gap: '10px',
            borderRadius: '20px',
            border: '1px solid #E4E4E7',
            background: '#FFFFFF',
            boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <PlusIcon />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Describe your agent setup"
            className="flex-1 bg-transparent text-[16px] outline-hidden focus:outline-hidden md:text-[20px]"
            style={{
              fontFamily: 'Inter',
              fontWeight: 500,
              color: '#0C0E0D',
              border: 'none',
            }}
          />
          <AuthDialog
            trigger={
              <button
                type="button"
                aria-label="Submit"
                className="flex items-center justify-center outline-hidden focus:outline-hidden focus-visible:outline-hidden"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <ArrowUpIcon />
              </button>
            }
          />
        </div>

        {/* Career chips - now wrapping on mobile */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CAREER_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              style={{ ...chipStyle, width: 'auto', minWidth: '160px' }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
