'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { MailOpen, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { verifyEmail } from '@/lib/api/auth'

const font = 'Inter, sans-serif'
const ERR = 'hsl(var(--destructive))'
const ERR_BG = 'hsl(var(--destructive) / 0.07)'
const ERR_BORDER = 'hsl(var(--destructive) / 0.25)'

type PageState = 'verifying' | 'success' | 'error' | 'awaiting'

export default function ConfirmEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email') ?? ''

  const [state, setState] = useState<PageState>(
    token ? 'verifying' : 'awaiting'
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    verifyEmail(token)
      .then(() => {
        setState('success')
        setTimeout(() => router.push('/dashboard'), 2000)
      })
      .catch((err: unknown) => {
        setState('error')
        const msg =
          (err as { response?: { data?: { detail?: string } } })?.response?.data
            ?.detail ?? 'The confirmation link is invalid or has expired.'
        setErrorMessage(msg)
      })
  }, [])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '400px',
        fontFamily: font,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* ── Verifying ── */}
      {state === 'verifying' && (
        <>
          <div style={iconWrapStyle('hsl(var(--muted))')}>
            <Loader2
              size={28}
              color="hsl(var(--muted-foreground))"
              style={{ animation: 'af-spin 0.7s linear infinite' }}
            />
            <style>{`@keyframes af-spin { to { transform: rotate(360deg); } }`}</style>
          </div>
          <h2 style={headingStyle}>Verifying your email…</h2>
          <p style={subStyle}>Hang tight, this will only take a second.</p>
        </>
      )}

      {/* ── Success ── */}
      {state === 'success' && (
        <>
          <div style={iconWrapStyle('hsl(var(--primary) / 0.1)')}>
            <CheckCircle size={28} color="hsl(var(--primary))" />
          </div>
          <h2 style={headingStyle}>Email confirmed!</h2>
          <p style={subStyle}>
            Your account is active. Redirecting you to the dashboard…
          </p>
        </>
      )}

      {/* ── Error ── */}
      {state === 'error' && (
        <>
          <div style={iconWrapStyle(ERR_BG)}>
            <AlertCircle size={28} color={ERR} />
          </div>
          <h2 style={headingStyle}>Link invalid or expired</h2>
          <p style={{ ...subStyle, marginBottom: '24px' }}>{errorMessage}</p>
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: ERR_BG,
              border: `1px solid ${ERR_BORDER}`,
              borderRadius: 'var(--radius)',
              width: '100%',
              boxSizing: 'border-box' as const,
              marginBottom: '24px',
            }}
          >
            <span style={{ fontFamily: font, fontSize: '13px', color: ERR }}>
              Please register again or contact support if the problem persists.
            </span>
          </div>
          <a
            href="/register"
            style={{
              fontFamily: font,
              fontSize: '14px',
              fontWeight: 500,
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
            }}
          >
            ← Back to sign up
          </a>
        </>
      )}

      {/* ── Awaiting (no token — redirected here after register or login 403) ── */}
      {state === 'awaiting' && (
        <>
          <div style={iconWrapStyle('hsl(var(--primary) / 0.1)')}>
            <MailOpen size={28} color="hsl(var(--primary))" />
          </div>

          <h2 style={headingStyle}>Check your email</h2>

          <p style={{ ...subStyle, marginBottom: email ? '4px' : '24px' }}>
            We sent a confirmation link to
          </p>

          {email && (
            <p
              style={{
                fontFamily: font,
                fontWeight: 600,
                fontSize: '14px',
                color: 'hsl(var(--foreground))',
                margin: '0 0 24px',
              }}
            >
              {email}
            </p>
          )}

          <p
            style={{
              fontFamily: font,
              fontSize: '13px',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: '1.6',
              margin: '0 0 32px',
            }}
          >
            Click the link in that email to activate your account. If you
            don&apos;t see it, check your spam folder.
          </p>

          <p
            style={{
              fontFamily: font,
              fontSize: '13px',
              color: 'hsl(var(--muted-foreground))',
            }}
          >
            Wrong email?{' '}
            <a
              href="/register"
              style={{
                color: 'hsl(var(--primary))',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Sign up again
            </a>
          </p>
        </>
      )}
    </div>
  )
}

function iconWrapStyle(bg: string): React.CSSProperties {
  return {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  }
}

const headingStyle: React.CSSProperties = {
  fontFamily: font,
  fontWeight: 700,
  fontSize: '28px',
  color: 'hsl(var(--foreground))',
  margin: '0 0 8px',
}

const subStyle: React.CSSProperties = {
  fontFamily: font,
  fontWeight: 400,
  fontSize: '14px',
  color: 'hsl(var(--muted-foreground))',
  margin: '0 0 8px',
  lineHeight: '1.6',
}
