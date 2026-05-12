'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Eye, Check, X } from 'lucide-react'
import { AxiosError } from 'axios'
import { RegisterSchema, type RegisterInput } from '@/schemas/auth'
import { useAuth } from '@/hooks/useAuth'
import { parseApiError } from '@/lib/api/error'
import { AuthOAuthButtons } from './AuthOAuthButtons'
import { LuEyeClosed } from 'react-icons/lu'

const PW_RULES = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: (v: string) => /[a-z]/.test(v) },
  { label: 'One digit', test: (v: string) => /[0-9]/.test(v) },
]

export const AuthSignUpForm = () => {
  const router = useRouter()
  const { register: registerUser } = useAuth()

  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwValue, setPwValue] = useState('')
  const [pwTouched, setPwTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bannerError, setBannerError] = useState<string | null>(null)
  const [agreed, setAgreed] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange', // ← live validation for confirmPassword mismatch
  })

  const showPwRules = pwTouched && pwValue.length > 0 && !submitted

  // Strength — Strong only when all 4 rules pass
  const score = PW_RULES.filter((r) => r.test(pwValue)).length
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][score]
  const strengthColor =
    score <= 1
      ? 'bg-red-400'
      : score === 2
        ? 'bg-orange-400'
        : score === 3
          ? 'bg-yellow-400'
          : 'bg-teal-500'
  const strengthTextColor =
    score <= 1
      ? 'text-red-400'
      : score === 2
        ? 'text-orange-400'
        : score === 3
          ? 'text-yellow-500'
          : 'text-teal-600'

  const onSubmit = async (data: RegisterInput) => {
    if (!agreed) {
      setBannerError('You must agree to the Terms & Conditions.')
      return
    }
    setBannerError(null)
    setSubmitted(true)
    try {
      await registerUser(data)
      router.push(`/confirm-email?email=${encodeURIComponent(data.email)}`)
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.status === 422) {
        const detail = err.response.data?.detail
        if (Array.isArray(detail)) {
          detail.forEach((d: { loc: string[]; msg: string }) => {
            const field = d.loc.at(-1) as keyof RegisterInput | undefined
            if (field)
              setError(field, {
                message: d.msg.replace(/^Value error,\s*/i, ''),
              })
          })
          setBannerError('Please fix the errors below.')
          return
        }
      }
      setBannerError(parseApiError(err))
    }
  }

  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 px-10 py-8 shadow-sm">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1 text-xs text-black transition-colors hover:text-gray-800"
      >
        <ArrowLeft size={13} /> Back
      </button>

      {/* Heading */}
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
        <p className="text-sm text-gray-400">
          Enter your details to create an account
        </p>
      </div>

      {/* Banner error */}
      {bannerError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-xs text-red-600">{bannerError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Full name */}
        <div className="space-y-1">
          <label
            htmlFor="display_name"
            className="text-[16px] font-medium text-black"
          >
            Full name
          </label>
          <input
            id="display_name"
            type="text"
            autoComplete="name"
            placeholder="Enter full name"
            {...register('display_name')}
            className={`w-full rounded-md border bg-white px-3 py-2.5 text-[16px] transition-colors outline-none placeholder:text-gray-300 ${errors.display_name ? 'border-red-400 focus:border-red-400' : 'border-gray-300 focus:border-teal-500'}`}
          />
          {errors.display_name && (
            <p className="text-xs text-red-500">
              {errors.display_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-[16px] font-medium text-black">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            {...register('email')}
            className={`w-full rounded-md border bg-white px-3 py-2.5 text-[16px] transition-colors outline-none placeholder:text-gray-300 ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-300 focus:border-teal-500'}`}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-[16px] font-medium text-black"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Enter password"
              {...register('password', {
                onChange: (e) => {
                  setPwValue(e.target.value)
                  if (submitted) setSubmitted(false)
                },
              })}
              onFocus={() => setPwTouched(true)}
              className={`w-full rounded-md border bg-white px-3 py-2.5 pr-9 text-[16px] transition-colors outline-none placeholder:text-gray-300 ${errors.password ? 'border-red-400 focus:border-red-400' : 'border-gray-300 focus:border-teal-500'}`}
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

          {/* Strength meter + rules */}
          {pwTouched && pwValue.length > 0 && (
            <div className="mt-2 space-y-1.5">
              {/* 4-segment bar + label */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${score >= i ? strengthColor : 'bg-gray-200'}`}
                  />
                ))}
                {strengthLabel && (
                  <span
                    className={`ml-1 min-w-[42px] text-right text-xs font-medium ${strengthTextColor}`}
                  >
                    {strengthLabel}
                  </span>
                )}
              </div>

              {/* Checklist — only while typing, before submit */}
              {showPwRules && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">
                    {score === 4
                      ? 'Strong password ✓'
                      : 'Weak password. Must contain:'}
                  </p>
                  {PW_RULES.map((rule) => {
                    const passing = rule.test(pwValue)
                    return (
                      <div
                        key={rule.label}
                        className="flex items-center gap-1.5"
                      >
                        {passing ? (
                          <Check
                            size={11}
                            className="text-teal-600"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <X
                            size={11}
                            className="text-red-400"
                            strokeWidth={2.5}
                          />
                        )}
                        <span
                          className={`text-xs ${passing ? 'text-teal-600' : 'text-red-400'}`}
                        >
                          {rule.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {!showPwRules && errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="text-[16px] font-medium text-black"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              className={`w-full rounded-md border bg-white px-3 py-2.5 pr-9 text-[16px] transition-colors outline-none placeholder:text-gray-300 ${errors.confirmPassword ? 'border-red-400 focus:border-red-400' : 'border-gray-300 focus:border-teal-500'}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <Eye size={14} /> : <LuEyeClosed size={14} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-center gap-2 text-xs text-black">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-3.5 w-3.5 accent-black"
          />
          I agree to{' '}
          <Link
            href="/terms"
            className="text-teal-700 underline hover:text-teal-800"
          >
            Terms & Conditions
          </Link>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-teal-800 py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-teal-900 disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      {/* OAuth */}
      <div className="mt-4">
        <AuthOAuthButtons />
      </div>

      {/* Sign in */}
      <p className="mt-4 text-center text-[16px] text-black">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-teal-700 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}
