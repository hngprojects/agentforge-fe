'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Eye } from 'lucide-react'
import { LuEyeClosed } from 'react-icons/lu'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { useAuth } from '@/hooks/useAuth'
import { AuthOAuthButtons } from './authOAuthButtons'
import { LoginSchema } from '@/schemas/auth'

export function AuthLoginForm() {
  const { login } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)

  const clearErrors = () => {
    setEmailError(null)
    setPasswordError(null)
    setGeneralError(null)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setEmail(val)
    setEmailError(null)
    setGeneralError(null)
    setEmailValid(LoginSchema.shape.email.safeParse(val).success)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setPasswordError(null)
    setGeneralError(null)
  }

  const validate = (): boolean => {
    const result = LoginSchema.safeParse({ email, password })
    if (!result.success) {
      const f = result.error.format()
      setEmailError(f.email?._errors[0] ?? null)
      setPasswordError(f.password?._errors[0] ?? null)
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setIsLoading(true)
    clearErrors()

    try {
      await login({ email, password })
      router.push('/generator')
    } catch (err: unknown) {
      const error = err as {
        response?: { status?: number; data?: { message?: string } }
      }
      const msg = error.response?.data?.message ?? ''
      const status = error.response?.status ?? 0
      const lower = msg.toLowerCase()

      if (
        lower.includes('not found') ||
        lower.includes('no user') ||
        lower.includes('email')
      ) {
        setEmailError('Email does not exist')
      } else if (
        lower.includes('verify') ||
        lower.includes('confirmed') ||
        status === 403
      ) {
        setGeneralError(
          'Please verify your email before signing in. Check your inbox for a confirmation link.'
        )
      } else if (
        lower.includes('password') ||
        lower.includes('invalid') ||
        lower.includes('credentials')
      ) {
        setPasswordError('Wrong password')
      } else {
        setGeneralError('Something went wrong. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[500px] space-y-5 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 px-10 py-8">
      {/* Back */}
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="flex items-center gap-1 text-xs text-black transition-colors hover:text-gray-800"
      >
        <ArrowLeft size={13} /> Back
      </button>

      {/* Heading */}
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-sm text-gray-400">
          Enter your details to access your account.
        </p>
      </div>

      {/* General error */}
      {generalError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-xs text-red-600">{generalError}</p>
        </div>
      )}

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-xs font-medium text-black">
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={handleEmailChange}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
            className={`w-full rounded-md border px-3 py-2 pr-9 text-sm transition-colors outline-none placeholder:text-gray-300 ${
              emailError
                ? 'border-red-400 focus:border-red-400'
                : emailValid
                  ? 'border-teal-500 focus:border-teal-500'
                  : 'border-gray-300 focus:border-teal-500'
            }`}
          />
          {emailValid && !emailError && (
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-teal-500">
              <FaRegCircleCheck size={14} />
            </span>
          )}
        </div>
        {emailError && (
          <p id="email-error" className="text-xs text-red-500">
            {emailError}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label htmlFor="password" className="text-xs font-medium text-black">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? 'password-error' : undefined}
            className={`w-full rounded-md border px-3 py-2 pr-9 text-sm transition-colors outline-none placeholder:text-gray-300 ${
              passwordError
                ? 'border-red-400 focus:border-red-400'
                : 'border-gray-300 focus:border-teal-500'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <Eye size={14} /> : <LuEyeClosed size={14} />}
          </button>
        </div>
        {passwordError && (
          <p id="password-error" className="text-xs text-red-500">
            {passwordError}
          </p>
        )}
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-black">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-3.5 w-3.5 accent-black"
            aria-label="Remember me"
          />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="text-xs text-black hover:underline"
          aria-label="Go to forgot password page"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        aria-label="Submit login form"
        className="w-full rounded-md bg-teal-800 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-900 disabled:opacity-60"
      >
        {isLoading ? 'Signing in...' : 'Continue'}
      </button>

      {/* OAuth */}
      <AuthOAuthButtons />

      {/* Sign up */}
      <p className="text-black-500 text-center text-xs">
        {"Don't have an account?"}{' '}
        <Link
          href="/signup"
          aria-label="Go to sign up page"
          className="font-semibold text-teal-700 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}
