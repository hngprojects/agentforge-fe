'use client'

import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { AuthDialog } from './auth-dialog'

const linkStyle: React.CSSProperties = {
  color: '#0C0E0D',
  fontFamily: 'Inter',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: 'normal',
}

export function Navbar() {
  return (
    <header className="w-full bg-white">
      <nav
        className="mx-auto flex w-full items-center justify-between self-stretch"
        style={{ padding: '20px 80px' }}
      >
        {/* Logo - 235x65, gap 4px (your spec) */}
        <Link
          href="/"
          className="flex items-center justify-center outline-none focus:outline-none focus-visible:outline-none"
          style={{ width: '235px', height: '65px', gap: '4px' }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-800">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" fill="white" />
              <path
                d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            className="leading-none font-bold"
            style={{
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: 700,
            }}
          >
            <span style={{ color: '#0C0E0D' }}>AGENT</span>
            <span style={{ color: '#005F5A' }}>FORGE</span>
          </span>
        </Link>

        {/* Center nav links - 18px Inter weight 500 */}
        <ul className="hidden items-center md:flex" style={{ gap: '32px' }}>
          <li>
            <Link
              href="#"
              className="transition-colors hover:opacity-70 focus:outline-none focus-visible:outline-none"
              style={linkStyle}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="transition-colors hover:opacity-70 focus:outline-none focus-visible:outline-none"
              style={linkStyle}
            >
              Pricing
            </Link>
          </li>
        </ul>

        {/* Right side - both 192x44 per spec */}
        <div className="flex items-center" style={{ gap: '12px' }}>
          {/* Login: 192x44, radius 8px, border 0.5px #A0A5A3, bg #F6F7F7 */}
          <AuthDialog
            trigger={
              <Button
                variant="ghost"
                className="font-medium hover:bg-gray-100"
                style={{
                  width: '192px',
                  height: '44px',
                  borderRadius: '8px',
                  border: '0.5px solid #A0A5A3',
                  background: '#F6F7F7',
                  color: '#0C0E0D',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                Log in
              </Button>
            }
          />
          {/* Get Started: 192x44, radius 16px, bg #005F5A, color #F6F7F7 */}
          <AuthDialog
            trigger={
              <Button
                className="font-medium hover:opacity-90"
                style={{
                  width: '192px',
                  height: '44px',
                  borderRadius: '16px',
                  background: '#005F5A',
                  color: '#F6F7F7',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                Get Started
              </Button>
            }
          />
        </div>
      </nav>
    </header>
  )
}
