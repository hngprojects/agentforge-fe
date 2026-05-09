'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  ArrowLeft,
  Loader2,
  Github,
  AlertCircle,
  CheckCircle2,
  Clock,
  Check,
  Sparkles,
  Box,
  Globe,
  User,
} from 'lucide-react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email) {
      setStatus('error')
      setErrorMessage('Email address is required')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email')
      return
    }

    setStatus('loading')

    try {
      // Simulate API call based on TRD
      const response = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage('We could not find an account with this email')
      }
    } catch {
      // Mocking success for demo as per prompt
      setTimeout(() => {
        if (email === 'error@example.com') {
          setStatus('error')
          setErrorMessage('We could not find an account with this email')
        } else {
          setStatus('success')
        }
      }, 1000)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFB] font-sans text-[#1A1A1A]">
      {/* Left Panel: Sidebar (Hidden on mobile) */}
      <div className="relative hidden w-[40%] flex-col justify-between overflow-hidden bg-[#020B0B] p-16 text-white lg:flex">
        <div className="relative z-10">
          <div className="mb-24 flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <User className="h-3.5 w-3.5 fill-black text-black" />
            </div>
            <span className="text-xl font-bold tracking-widest uppercase">
              AgentForge
            </span>
          </div>

          <div className="max-w-md">
            <h1 className="mb-8 text-[48px] leading-[1.1] font-bold tracking-tight">
              Build and publish AI Agents in seconds
            </h1>
            <p className="mb-16 text-[18px] leading-relaxed text-white/50">
              Turn ideas into reusable AI systems and share them with the world
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Sparkles className="h-5 w-5 text-white/40" />
                <span className="text-[16px] font-medium text-white/80">
                  Create powerful AI agents
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Box className="h-5 w-5 text-white/40" />
                <span className="text-[16px] font-medium text-white/80">
                  Auto-Generate system files
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Globe className="h-5 w-5 text-white/40" />
                <span className="text-[16px] font-medium text-white/80">
                  Publish to GitHub and share
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
      </div>

      {/* Right Panel: Form Area */}
      <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-[60%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full max-w-130 flex-col rounded-[40px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 md:p-16"
        >
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <h1 className="mb-3 text-[28px] font-bold tracking-tight sm:text-[32px]">
                  Forgot Password?
                </h1>
                <p className="mb-10 text-center text-sm text-[#637381] sm:text-base">
                  Enter your email and we&apos;ll send you a reset link
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="ml-0.5 text-sm font-semibold text-[#1A1A1A]"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      {status !== 'error' && (
                        <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#919EAB]" />
                      )}
                      <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (status === 'error') setStatus('idle')
                        }}
                        placeholder="Nenna20@yahoo.com"
                        className={`w-full border bg-[#FFFFFF] ${
                          status === 'error'
                            ? 'border-[#FF5630]'
                            : 'border-[#919EAB]/30'
                        } rounded-xl ${status === 'error' ? 'pl-4' : 'pl-12'} py-3.5 pr-12 text-[#1A1A1A] placeholder-[#919EAB] transition-all focus:ring-1 focus:ring-[#007B55] focus:outline-none`}
                      />
                      {status === 'error' && (
                        <AlertCircle className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#FF5630]" />
                      )}
                    </div>
                    {status === 'error' && (
                      <p className="ml-0.5 text-[13px] font-medium text-[#FF5630]">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#005B54] py-3.5 font-bold text-white transition-all hover:bg-[#004B44]"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>

                <div className="mt-8 flex w-full items-center gap-3">
                  <div className="h-px flex-1 bg-[#919EAB]/10" />
                  <span className="text-[11px] font-bold tracking-widest text-[#919EAB]">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-[#919EAB]/10" />
                </div>

                <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#919EAB]/20 py-3.5 font-semibold text-[#454F5B] transition-colors hover:bg-[#F4F6F8]">
                  <Github className="h-5 w-5" />
                  Sign in with GitHub
                </button>

                <Link
                  href="/login"
                  className="mt-8 flex items-center gap-2 font-semibold text-[#007B55] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>

                <p className="mt-12 text-sm text-[#637381]">
                  Need help?{' '}
                  <a
                    href="#"
                    className="font-semibold text-[#007B55] hover:underline"
                  >
                    Contact support
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#E2F5F0]">
                  <div className="relative">
                    <Mail className="h-8 w-8 text-[#00AB55]" />
                    <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-[#E2F5F0] bg-white p-0.5">
                      <Check className="h-3 w-3 stroke-4 text-[#00AB55]" />
                    </div>
                  </div>
                </div>

                <h1 className="mb-3 text-[32px] font-bold tracking-tight">
                  Check your email
                </h1>
                <p className="mb-2 text-center text-[#637381]">
                  We&apos;ve sent a password reset link to
                </p>
                <p className="mb-10 font-bold text-[#1A1A1A]">{email}</p>

                <div className="mb-10 w-full space-y-6 rounded-3xl bg-[#F8FAFB] p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/5 bg-white shadow-sm">
                      <Mail className="h-4 w-4 text-[#00AB55]" />
                    </div>
                    <p className="text-sm font-medium text-[#454F5B]">
                      Open the email and click the link to reset your password
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/5 bg-white shadow-sm">
                      <Clock className="h-4 w-4 text-[#00AB55]" />
                    </div>
                    <p className="text-sm font-medium text-[#454F5B]">
                      The link will expire in 15 minutes
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/5 bg-white shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-[#00AB55]" />
                    </div>
                    <p className="text-sm font-medium text-[#454F5B]">
                      Didn&apos;t receive it? Check your spam folder
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStatus('idle')}
                  className="mb-6 w-full rounded-xl bg-[#005B54] py-3.5 font-bold text-white transition-all hover:bg-[#004B44]"
                >
                  Resend Email
                </button>

                <Link
                  href="/login"
                  className="flex items-center gap-2 font-semibold text-[#007B55] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>

                <p className="mt-8 text-sm text-[#637381]">
                  Need help?{' '}
                  <a
                    href="#"
                    className="font-semibold text-[#007B55] hover:underline"
                  >
                    Contact support
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
