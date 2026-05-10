'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Eye } from 'lucide-react'
import { LuEyeClosed } from 'react-icons/lu'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { AxiosError } from 'axios'
import { LoginSchema, type LoginInput } from '@/schemas/auth'
import { useAuth } from '@/hooks/useAuth'
import { AuthOAuthButtons } from './AuthOAuthButtons'

export const AuthLoginForm = () => {
  const router = useRouter()
  const { login } = useAuth()

  const [showPw, setShowPw] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [remember, setRemember] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) })

  // eslint-disable-next-line react-hooks/incompatible-library
  const emailValue = watch('email', '')
  const emailValid = !errors.email && emailValue && emailValue.length > 0
  const onSubmit = async (data: LoginInput) => {
    setServerError(null)
    try {
      await login(data)
      // TODO: Implement remember-me functionality
      router.push('/generator')
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const status = err.response?.status
        const detail = err.response?.data?.detail ?? ''
        const message = err.response?.data?.message ?? ''
        const lower = (detail + message).toLowerCase()

        if (
          status === 403 ||
          lower.includes('verify') ||
          lower.includes('confirmed')
        ) {
          let sentEmail = ''
          try {
            sentEmail = JSON.parse(err.config?.data ?? '{}').email ?? ''
          } catch {}
          router.push(`/confirm-email?email=${encodeURIComponent(sentEmail)}`)
          return
        }
        if (
          lower.includes('not found') ||
          lower.includes('no user') ||
          lower.includes('email')
        ) {
          setServerError('Email does not exist.')
          return
        }
        if (
          lower.includes('password') ||
          lower.includes('invalid') ||
          lower.includes('credentials')
        ) {
          setServerError('Wrong password. Please try again.')
          return
        }
      }
      setServerError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 px-10 py-8 shadow-sm">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="mb-6 flex items-center gap-1 text-xs text-black transition-colors hover:text-gray-800"
      >
        <ArrowLeft size={13} /> Back
      </button>

      {/* Heading */}
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-sm text-gray-400">
          Enter your details to access your account.
        </p>
      </div>

      {/* Server error banner */}
      {serverError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-xs text-red-600">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
              className={`w-full rounded-md border bg-white px-3 py-2.5 pr-9 text-sm transition-colors outline-none placeholder:text-gray-300 ${
                errors.email
                  ? 'border-red-400 focus:border-red-400'
                  : emailValid
                    ? 'border-teal-500 focus:border-teal-500'
                    : 'border-gray-300 focus:border-teal-500'
              }`}
            />
            {emailValid && (
              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-teal-500">
                <FaRegCircleCheck size={14} />
              </span>
            )}
          </div>
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500">
              {errors.email.message}
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
              type={showPw ? 'text' : 'password'}
              placeholder="Enter password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
              className={`w-full rounded-md border bg-white px-3 py-2.5 pr-9 text-sm transition-colors outline-none placeholder:text-gray-300 ${
                errors.password
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-gray-300 focus:border-teal-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPw ? <Eye size={14} /> : <LuEyeClosed size={14} />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-xs text-red-500">
              {errors.password.message}
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
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-gray-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-teal-800 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-900 disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Continue'}
        </button>
      </form>

      {/* OAuth */}
      <div className="mt-4">
        <AuthOAuthButtons />
      </div>

      {/* Sign up */}
      <p className="mt-4 text-center text-xs text-black">
        {"Don't Have an Account?"}{' '}
        <Link
          href="/register"
          className="font-semibold text-teal-700 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}
