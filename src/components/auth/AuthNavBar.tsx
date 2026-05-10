import React from 'react'
import Link from 'next/link'

export const AuthNavBar = () => {
  return (
    <header className="w-full shrink-0 bg-white px-8 py-3">
      <Link
        href="/"
        className="flex items-center gap-2 outline-none focus:outline-none"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-800">
          <svg
            width="18"
            height="18"
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
        <span className="text-xl leading-none font-bold">
          <span style={{ color: '#0C0E0D' }}>AGENT</span>
          <span style={{ color: '#005F5A' }}>FORGE</span>
        </span>
      </Link>
    </header>
  )
}
