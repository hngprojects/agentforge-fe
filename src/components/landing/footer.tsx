'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const footerLinkStyle = {
  color: '#A0A5A3',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

const footerHeadingStyle = {
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: '20px',
}

export function Footer() {
  return (
    <footer
      className="w-full bg-[#005F5A]"
      style={{ padding: '80px 20px 40px' }}
    >
      <div
        className="mx-auto flex w-full flex-col"
        style={{ maxWidth: '1440px', gap: '60px' }}
      >
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Logo and Description */}
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
              style={{ color: '#A0A5A3', fontSize: '15px', lineHeight: '1.6' }}
            >
              Effortlessly create organized GitHub-Ready agent setup files you
              can reuse, publish, and adapt across projects in less time.
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

          {/* Links Grid - 3 columns on mobile? No, the image shows them stacked or in a small grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
            {/* Platform Links */}
            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Platform</h4>
              <div className="flex flex-col gap-3">
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  Create Packages
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  Browse Skills
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  Pricing
                </Link>
              </div>
            </div>

            {/* Company Links */}
            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Company</h4>
              <div className="flex flex-col gap-3">
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Support Links */}
            <div className="flex flex-col">
              <h4 style={footerHeadingStyle}>Support</h4>
              <div className="flex flex-col gap-3">
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  Terms
                </Link>
                <Link
                  href="#"
                  style={footerLinkStyle}
                  className="hover:text-white"
                >
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 md:flex-row">
          <p style={{ color: '#A0A5A3', fontSize: '14px' }}>
            © 2024 AgentForge. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" style={footerLinkStyle} className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" style={footerLinkStyle} className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" style={footerLinkStyle} className="hover:text-white">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
