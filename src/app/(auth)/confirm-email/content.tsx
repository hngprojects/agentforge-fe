'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { MailOpen, CheckCircle, AlertCircle, Loader2, ArrowLeft, RefreshCw } from 'lucide-react'
import { verifyEmail } from '@/lib/api/auth'

type PageState = 'verifying' | 'success' | 'error' | 'awaiting'

export default function ConfirmEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email') ?? ''

  const [state, setState] = useState<PageState>(token ? 'verifying' : 'awaiting')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    verifyEmail(token)
      .then(() => {
        setState('success')
        setTimeout(() => router.push('/dashboard'), 2500)
      })
      .catch((err: unknown) => {
        setState('error')
        const msg =
          (err as { response?: { data?: { detail?: string } } })?.response?.data
            ?.detail ?? 'The confirmation link is invalid or has expired.'
        setErrorMessage(msg)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* ── Verifying ── */}
        {state === 'verifying' && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
              Verifying your email
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Hang tight, this will only take a second.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:0.2s]" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        {/* ── Success ── */}
        {state === 'success' && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <CheckCircle className="h-9 w-9 text-primary" />
            </div>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
              You&apos;re verified!
            </h1>
            <p className="mb-8 text-base text-muted-foreground leading-relaxed">
              Your account is active. Taking you to the dashboard now…
            </p>
            <div className="w-full rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Email confirmed</p>
                  <p className="text-xs text-muted-foreground">Redirecting to dashboard…</p>
                </div>
                <Loader2 className="ml-auto h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* ── Error ── */}
        {state === 'error' && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertCircle className="h-9 w-9 text-destructive" />
            </div>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
              Link expired
            </h1>
            <p className="mb-6 text-base text-muted-foreground leading-relaxed">
              {errorMessage}
            </p>
            <div className="mb-8 w-full rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-left">
              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm text-destructive leading-relaxed">
                  Confirmation links expire after 24 hours. Please register again or
                  contact support if the problem persists.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <RefreshCw className="h-4 w-4" />
                Register again
              </a>
              <a
                href="/login"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Back to login
              </a>
            </div>
          </div>
        )}

        {/* ── Awaiting ── */}
        {state === 'awaiting' && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <MailOpen className="h-9 w-9 text-primary" />
            </div>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
              Check your inbox
            </h1>
            <p className="mb-1 text-base text-muted-foreground">
              We sent a confirmation link to
            </p>
            {email ? (
              <p className="mb-8 text-base font-semibold text-foreground">
                {email}
              </p>
            ) : (
              <p className="mb-8 text-base text-muted-foreground">your email address.</p>
            )}

            {/* Steps */}
            <div className="mb-8 w-full space-y-3 text-left">
              {[
                { step: '1', text: 'Open the email from us' },
                { step: '2', text: 'Click the confirmation link' },
                { step: '3', text: 'You\'ll be redirected to your dashboard' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 px-4 py-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {step}
                  </div>
                  <p className="text-sm text-foreground">{text}</p>
                </div>
              ))}
            </div>

            <p className="mb-2 text-sm text-muted-foreground">
              Can&apos;t find it? Check your spam folder.
            </p>
            <p className="text-sm text-muted-foreground">
              Wrong email?{' '}
              <a
                href="/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up again
              </a>
            </p>

            <div className="mt-8 w-full border-t border-border pt-6">
              <a
                href="/login"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
