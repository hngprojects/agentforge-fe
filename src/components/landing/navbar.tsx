'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const getLinkStyle = (href: string) => ({
    ...linkStyle,
    color: pathname === href ? '#0C5D56' : '#0C0E0D',
  })

  return (
    <header className="relative w-full bg-white">
      <nav className="mx-auto flex w-full items-center justify-between self-stretch px-6 py-4 md:px-20 md:py-5">
        {/* Logo - 235x65, gap 4px (your spec) */}
        <Link
          href="/"
          className="flex items-center justify-center outline-hidden focus:outline-hidden focus-visible:outline-hidden"
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
        <ul
          className="hidden items-center min-[973px]:flex"
          style={{ gap: '32px' }}
        >
          <li>
            <Link
              href="/explore"
              className="transition-colors hover:opacity-70 focus:outline-hidden focus-visible:outline-hidden"
              style={getLinkStyle('/explore')}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="transition-colors hover:opacity-70 focus:outline-hidden focus-visible:outline-hidden"
              style={getLinkStyle('/pricing')}
            >
              Pricing
            </Link>
          </li>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Login hidden on mobile */}
          <AuthDialog
            trigger={
              <Button
                variant="ghost"
                className="hidden h-[43px] w-[192px] px-4 font-medium min-[973px]:flex"
                style={{
                  borderRadius: '8px',
                  border: '0.5px solid #A0A5A3',
                  background: '#F6F7F7',
                  color: '#0C0E0D',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                }}
              >
                Log in
              </Button>
            }
          />
          {/* Get Started button - hidden on mobile to match image */}
          <AuthDialog
            trigger={
              <Button
                className="hidden h-[48px] w-[192px] px-4 font-medium min-[973px]:flex"
                style={{
                  borderRadius: '8px',
                  background: '#005F5A',
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                }}
              >
                Get Started
              </Button>
            }
          />

          {/* Mobile Menu Icon */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 min-[973px]:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#0C0E0D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="#0C0E0D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 z-50 flex w-full flex-col border-b border-zinc-200 bg-white px-6 py-4 shadow-lg min-[973px]:hidden">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/explore"
                className="block w-full py-2"
                style={getLinkStyle('/explore')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="block w-full py-2"
                style={getLinkStyle('/pricing')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li className="flex w-full flex-col items-center gap-3 pt-6">
              <AuthDialog
                trigger={
                  <Button
                    className="font-inter h-[43px] w-[192px] rounded-lg border border-[#A0A5A3] bg-[#F6F7F7] text-sm font-medium text-[#0C0E0D]"
                    style={{ gap: '8px', borderWidth: '0.5px' }}
                  >
                    Log in
                  </Button>
                }
              />
              <AuthDialog
                trigger={
                  <Button
                    className="font-inter h-[48px] w-[192px] rounded-lg bg-[#005F5A] text-sm font-medium text-white"
                    style={{ gap: '8px', borderWidth: '0.5px' }}
                  >
                    Get Started
                  </Button>
                }
              />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
