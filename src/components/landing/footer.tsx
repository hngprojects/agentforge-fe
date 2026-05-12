'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import Image from 'next/image'

const textStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '100%',
  letterSpacing: '0%',
  color: '#A0A5A3',
  textDecoration: 'none',
}

const ourServices = [
  { title: 'Create Package', href: '#' },
  { title: 'Browse Registry', href: '#' },
  { title: 'GitHub Publishing', href: '#' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Early Access', href: '#' },
]

const company = [
  { title: 'About Us', href: '/about' },
  { title: 'Blog', href: '#' },
  { title: 'Contact', href: '/contact' },
  { title: 'Partners', href: '#' },
  { title: 'Press', href: '#' },
]

const support = [
  { title: 'GitHub', href: '#' },
  { title: 'Twitter/X', href: '#' },
  { title: 'LinkedIn', href: '#' },
  { title: 'Discord', href: '#' },
  { title: 'Product Hunt', href: '#' },
]

export function Footer() {
  return (
    <footer
      className="w-full px-6 pt-16 pb-10 md:px-20 md:pt-20"
      style={{ background: '#0C5D56' }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16">
        {/* Top grid: logo col + 3 link cols */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          {/* Logo + Description */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/images/Logo-1.png"
                alt="Anvila logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                }}
              >
                ANVILA
              </span>
            </div>

            <p style={textStyle}>
              Builders use Anvila to turn plain descriptions into
              publishing-ready agent setup packages that can be reused, cloned,
              and adapted for free.
            </p>

            <div className="flex gap-6">
              <Link
                href="#"
                className="text-[#A0A5A3] transition-colors hover:text-white"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-[#A0A5A3] transition-colors hover:text-white"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-[#A0A5A3] transition-colors hover:text-white"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="#"
                className="text-[#A0A5A3] transition-colors hover:text-white"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Our Services */}
          <div className="flex flex-col gap-5">
            <h4
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#FFFFFF',
              }}
            >
              Our Services
            </h4>
            <div className="flex flex-col gap-4">
              {ourServices.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  style={textStyle}
                  className="transition-colors hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-5">
            <h4
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#FFFFFF',
              }}
            >
              Company
            </h4>
            <div className="flex flex-col gap-4">
              {company.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  style={textStyle}
                  className="transition-colors hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Support & Legal */}
          <div className="flex flex-col gap-5">
            <h4
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#FFFFFF',
              }}
            >
              Support & Legal
            </h4>
            <div className="flex flex-col gap-4">
              {support.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  style={textStyle}
                  className="transition-colors hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
          <p style={textStyle}>© 2024 Anvila. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <Link
              href="#"
              style={textStyle}
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span style={{ color: '#A0A5A3' }}>•</span>
            <Link
              href="#"
              style={textStyle}
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <span style={{ color: '#A0A5A3' }}>•</span>
            <Link
              href="#"
              style={textStyle}
              className="transition-colors hover:text-white"
            >
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
