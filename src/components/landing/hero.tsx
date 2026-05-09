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
        className="mx-auto flex w-full flex-col items-center justify-center"
        style={{
          maxWidth: '1438px',
          height: '640px',
          padding: '40px 80px',
          gap: '48px',
        }}
      >
        {/* Text section - flex-direction column, gap 24px, align-self stretch */}
        <div
          className="flex w-full flex-col items-center self-stretch"
          style={{ gap: '24px' }}
        >
          <h1
            style={{
              fontFamily: 'Inter',
              fontSize: '72px',
              fontWeight: 500,
              lineHeight: 'normal',
              color: '#0C0E0D',
              textAlign: 'center',
              margin: 0,
            }}
          >
            The Home for Reusable
          </h1>
          <h1
            style={{
              fontFamily: 'Inter',
              fontSize: '64px',
              fontWeight: 500,
              lineHeight: 'normal',
              color: '#0C0E0D',
              textAlign: 'center',
              margin: 0,
            }}
          >
            AI Agent Setups
          </h1>

          <p
            style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              color: '#52525B',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Describe your agent setup in and get a structured package you can
            publish, share, and reuse.
          </p>
        </div>

        {/* Input box - height 77px, padding 16px 24px, gap 10px, centered with headline width */}
        <div
          className="flex w-full items-center"
          style={{
            maxWidth: '800px',
            height: '77px',
            padding: '16px 24px',
            gap: '10px',
            borderRadius: '24px',
            border: '1px solid #E4E4E7',
            background: '#FFFFFF',
            boxShadow: '0 6px 18px -2px rgba(0, 0, 0, 0.10)',
          }}
        >
          <PlusIcon />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Describe your agent setup"
            className="flex-1 bg-transparent outline-none focus:outline-none"
            style={{
              fontFamily: 'Inter',
              fontSize: '20px',
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
                className="flex items-center justify-center outline-none focus:outline-none focus-visible:outline-none"
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

        {/* Career chips - each 186px width, one horizontal row */}
        <div
          className="flex items-center justify-center"
          style={{ gap: '12px' }}
        >
          {CAREER_CHIPS.map((chip) => (
            <button key={chip} type="button" style={chipStyle}>
              {chip}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
