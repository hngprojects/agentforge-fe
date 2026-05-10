'use client'

import { Users, Sparkles, Box, Globe } from 'lucide-react'

export function AuthSidePanel() {
  return (
    <div
      className="hidden flex-col lg:flex"
      style={{
        width: '45%',
        minWidth: '45%',
        minHeight: '100vh',
        backgroundColor: '#001312',
        borderRight: '1px solid #1a2d2c',
        padding: '64px',
        fontFamily: 'Inter, sans-serif',
        color: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '96px',
        }}
      >
        <Users size={24} color="#ffffff" />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '27.52px',
            letterSpacing: '0.05em',
            color: '#ffffff',
          }}
        >
          AGENTFORGE
        </span>
      </div>

      {/* Hero copy */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginBottom: '64px',
        }}
      >
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '40px',
            letterSpacing: '0%',
            color: '#ffffff',
            margin: 0,
          }}
        >
          Build and publish AI <br />
          Agents in seconds
        </h1>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '20px',
            letterSpacing: '0%',
            color: '#A1A1AA',
            margin: 0,
            maxWidth: '400px',
          }}
        >
          Turn ideas into reusable AI systems and share them with the world
        </p>
      </div>

      {/* Feature list — pinned to bottom */}
      <div
        style={{
          paddingBottom: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {[
          { icon: Sparkles, label: 'Create powerful AI agents' },
          { icon: Box, label: 'Auto-Generate system files' },
          { icon: Globe, label: 'Publish to GitHub and share' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <Icon size={20} color="#ffffff" strokeWidth={1.5} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                letterSpacing: '0%',
                color: '#F4F4F5',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
