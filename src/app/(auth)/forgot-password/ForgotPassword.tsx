'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react'
import Link from 'next/link'

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold text-[#637381] transition-colors hover:text-[#1A1A1A]"
  >
    <ArrowLeft className="h-3.5 w-3.5" />
    Back
  </button>
)

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState<
    'forgot' | 'check-mail' | 'set-password' | 'success'
  >('forgot')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const maskEmail = (email: string) => {
    if (!email.includes('@')) return email
    const [name, domain] = email.split('@')
    return `${name.substring(0, 2)}******@${domain}`
  }

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email) {
      setStatus('error')
      setErrorMessage('Email address is required')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email (e.g. name@domain.com)')
      return
    }

    setStatus('loading')
    setTimeout(() => {
      setStatus('idle')
      setStep('check-mail')
    }, 1000)
  }

  const handleSetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (password.length < 8) {
      setStatus('error')
      setErrorMessage('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setStatus('error')
      setErrorMessage('Passwords do not match')
      return
    }

    setStatus('loading')
    setTimeout(() => {
      setStatus('idle')
      setStep('success')
    }, 1000)
  }

  return (
    <div className="w-full p-6 font-sans text-[#1A1A1A] sm:p-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto flex w-full max-w-130 flex-col items-center rounded-[40px] bg-white p-8 pt-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 sm:pt-20"
      >
        <AnimatePresence mode="wait">
          {step === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex w-full flex-col items-center"
            >
              <BackButton onClick={() => window.history.back()} />

              <h1 className="mb-2 text-center text-[28px] font-bold tracking-tight">
                Forgot Password?
              </h1>
              <p className="mb-10 text-center text-sm text-[#637381]">
                Enter your email and we&apos;ll send you a reset link
              </p>

              <form onSubmit={handleSendReset} className="w-full space-y-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="ml-1 text-[13px] font-bold text-[#1A1A1A]"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#919EAB]" />
                    <input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (status === 'error') setStatus('idle')
                      }}
                      placeholder="Enter email address"
                      className={`w-full rounded-xl border bg-white py-4 pr-4 pl-12 text-[#1A1A1A] placeholder-[#919EAB] transition-all focus:border-[#004D40] focus:ring-2 focus:ring-[#004D40]/20 focus:outline-none ${
                        status === 'error'
                          ? 'border-[#FF5630]'
                          : 'border-[#919EAB]/20'
                      }`}
                    />
                  </div>
                  {status === 'error' && (
                    <p className="ml-1 flex items-center gap-1 text-[12px] font-medium text-[#FF5630]">
                      <AlertCircle className="h-3 w-3" />
                      {errorMessage}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004D40] py-4 font-bold text-white transition-all hover:bg-[#003D33] active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'check-mail' && (
            <motion.div
              key="check-mail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex w-full flex-col items-center"
            >
              <BackButton onClick={() => setStep('forgot')} />

              <h1 className="mb-2 text-center text-[28px] font-bold tracking-tight">
                Check your mail
              </h1>
              <p className="mb-10 max-w-70 text-center text-sm text-[#637381]">
                We sent a password reset link to{' '}
                <span className="font-medium text-[#1A1A1A]">
                  {maskEmail(email)}
                </span>
              </p>

              <button
                type="button"
                onClick={() => setStep('set-password')}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004D40] py-4 font-bold text-white transition-all hover:bg-[#003D33] active:scale-[0.98]"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 'set-password' && (
            <motion.div
              key="set-password"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex w-full flex-col items-center"
            >
              <BackButton onClick={() => setStep('check-mail')} />

              <h1 className="mb-2 text-center text-[28px] font-bold tracking-tight">
                Set a new Password
              </h1>
              <p className="mb-10 text-center text-sm text-[#637381]">
                Must be at least 8 characters
              </p>

              <form onSubmit={handleSetPassword} className="w-full space-y-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="ml-1 text-[13px] font-bold text-[#1A1A1A]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#919EAB]" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (status === 'error') setStatus('idle')
                      }}
                      placeholder="Enter password"
                      className={`w-full rounded-xl border bg-white py-4 pr-12 pl-12 text-[#1A1A1A] placeholder-[#919EAB] transition-all focus:border-[#004D40] focus:ring-2 focus:ring-[#004D40]/20 focus:outline-none ${
                        status === 'error'
                          ? 'border-[#FF5630]'
                          : 'border-[#919EAB]/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-[#919EAB] hover:text-[#454F5B]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="ml-1 text-[13px] font-bold text-[#1A1A1A]"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#919EAB]" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if (status === 'error') setStatus('idle')
                      }}
                      placeholder="Confirm password"
                      className={`w-full rounded-xl border bg-white py-4 pr-12 pl-12 text-[#1A1A1A] placeholder-[#919EAB] transition-all focus:border-[#004D40] focus:ring-2 focus:ring-[#004D40]/20 focus:outline-none ${
                        status === 'error'
                          ? 'border-[#FF5630]'
                          : 'border-[#919EAB]/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      aria-label={
                        showConfirmPassword ? 'Hide password' : 'Show password'
                      }
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-[#919EAB] hover:text-[#454F5B]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="ml-1 flex items-center gap-1 text-[12px] font-medium text-[#FF5630]">
                      <AlertCircle className="h-3 w-3" />
                      {errorMessage}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004D40] py-4 font-bold text-white transition-all hover:bg-[#003D33] active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex w-full flex-col items-center"
            >
              <h1 className="mb-2 text-center text-[28px] font-bold tracking-tight">
                Password Reset
              </h1>
              <p className="mb-10 text-center text-sm text-[#637381]">
                Your password has been successfully reset. Click below to login.
              </p>

              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004D40] py-4 font-bold text-white transition-all hover:bg-[#003D33] active:scale-[0.98]"
              >
                Log in
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-10 text-sm font-medium text-[#637381]">
          Need help?{' '}
          <a
            href="#"
            className="font-bold text-[#1A1A1A] transition-all hover:underline"
          >
            Contact support
          </a>
        </p>
      </motion.div>
    </div>
  )
}
