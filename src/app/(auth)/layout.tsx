import type { ReactNode } from 'react'
import { AuthSidePanel } from '@/components/auth/AuthSidePanel'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <AuthSidePanel />

      <main
        style={{
          flex: 1,
          backgroundColor: '#FAF9F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 32px',
        }}
      >
        {children}
      </main>
    </div>
  )
}
