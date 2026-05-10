'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react'
import { RegisterSchema, RegisterInput } from '@/schemas/auth'
import { useAuth } from '@/hooks/useAuth'
import { parseApiError } from '@/lib/api/error'
import { AxiosError } from 'axios'
import { GoogleIcon, GitHubIcon } from '@/components/icons'

const PW_RULES = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: (v: string) => /[a-z]/.test(v) },
  { label: 'One digit', test: (v: string) => /[0-9]/.test(v) },
]

const font = 'Inter, sans-serif'
const ERR = 'hsl(var(--destructive))'
const ERR_BG = 'hsl(var(--destructive) / 0.07)'
const ERR_BORDER = 'hsl(var(--destructive) / 0.25)'

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid hsl(var(--border))',
  borderRadius: 'var(--radius)',
  backgroundColor: '#ffffff',
  fontFamily: font,
  fontSize: '14px',
  fontWeight: 400,
  color: 'hsl(var(--foreground))',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  boxSizing: 'border-box' as const,
}

function focusInput(e: React.FocusEvent<HTMLInputElement>, hasError: boolean) {
  if (hasError) return
  e.currentTarget.style.borderColor = 'hsl(var(--primary))'
  e.currentTarget.style.boxShadow = '0 0 0 3px hsl(var(--primary) / 0.12)'
}
function blurInput(e: React.FocusEvent<HTMLInputElement>, hasError: boolean) {
  if (hasError) return
  e.currentTarget.style.borderColor = 'hsl(var(--border))'
  e.currentTarget.style.boxShadow = 'none'
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <span
      style={{
        fontFamily: font,
        fontSize: '12px',
        color: ERR,
        marginTop: '4px',
      }}
    >
      {message}
    </span>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const { register: registerUser } = useAuth()
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwValue, setPwValue] = useState('')
  const [pwTouched, setPwTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bannerError, setBannerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  })
  const registerDisplayName = register('display_name')
  const registerEmail = register('email')
  const registerPassword = register('password')
  const registerConfirmPassword = register('password')

  const onSubmit = async (data: RegisterInput) => {
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
            if (field) {
              setError(field, {
                message: d.msg.replace(/^Value error,\s*/i, ''),
              })
            }
          })
          setBannerError('Please fix the errors below.')
          return
        }
      }
      setBannerError(parseApiError(err))
    }
  }

  const hasFieldErrors = Object.keys(errors).length > 0
  const showPwRules = pwTouched && pwValue.length > 0 && !submitted

  return (
    <div style={{ width: '100%', maxWidth: '400px', fontFamily: font }}>
      <h2
        style={{
          fontFamily: font,
          fontWeight: 700,
          fontSize: '28px',
          color: 'hsl(var(--foreground))',
          textAlign: 'center',
          margin: '0 0 8px',
        }}
      >
        Create Account
      </h2>
      <p
        style={{
          fontFamily: font,
          fontWeight: 400,
          fontSize: '14px',
          color: 'hsl(var(--muted-foreground))',
          textAlign: 'center',
          margin: '0 0 32px',
        }}
      >
        Enter your details to create an account
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        {/* Banner */}
        {(bannerError || hasFieldErrors) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '10px 14px',
              backgroundColor: ERR_BG,
              border: `1px solid ${ERR_BORDER}`,
              borderRadius: 'var(--radius)',
            }}
          >
            <AlertCircle
              size={15}
              color={ERR}
              style={{ marginTop: '1px', flexShrink: 0 }}
            />
            <span style={{ fontFamily: font, fontSize: '13px', color: ERR }}>
              {bannerError ?? 'Please fix the errors below.'}
            </span>
          </div>
        )}

        {/* Username */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="display_name"
            style={{
              fontFamily: font,
              fontSize: '14px',
              fontWeight: 500,
              color: 'hsl(var(--foreground))',
              marginBottom: '6px',
            }}
          >
            Username
          </label>
          <input
            id="display_name"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            style={{
              ...inputBase,
              borderColor: errors.display_name ? ERR : 'hsl(var(--border))',
            }}
            onFocus={(e) => focusInput(e, !!errors.display_name)}
            {...registerDisplayName}
            onBlur={(e) => {
              registerDisplayName.onBlur(e)
              blurInput(e, !!errors.password)
            }}
          />
          <FieldError message={errors.display_name?.message} />
        </div>

        {/* Email */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="email"
            style={{
              fontFamily: font,
              fontSize: '14px',
              fontWeight: 500,
              color: 'hsl(var(--foreground))',
              marginBottom: '6px',
            }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            style={{
              ...inputBase,
              borderColor: errors.email ? ERR : 'hsl(var(--border))',
            }}
            onFocus={(e) => focusInput(e, !!errors.email)}
            {...registerEmail}
            onBlur={(e) => {
              registerEmail.onBlur(e)
              blurInput(e, !!errors.password)
            }}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Password */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="password"
            style={{
              fontFamily: font,
              fontSize: '14px',
              fontWeight: 500,
              color: 'hsl(var(--foreground))',
              marginBottom: '6px',
            }}
          >
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Enter password"
              style={{
                ...inputBase,
                paddingRight: '42px',
                borderColor: errors.password ? ERR : 'hsl(var(--border))',
              }}
              onFocus={(e) => {
                focusInput(e, !!errors.password)
                setPwTouched(true)
              }}
              {...register('password', {
                onChange: (e) => {
                  setPwValue(e.target.value)
                  if (submitted) setSubmitted(false)
                },
              })}
              onBlur={(e) => {
                registerPassword.onBlur(e)
                blurInput(e, !!errors.password)
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'hsl(var(--muted-foreground))',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                lineHeight: 0,
              }}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Live rules checklist — shown while typing before first submit */}
          {showPwRules && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                marginTop: '8px',
              }}
            >
              {PW_RULES.map((rule) => {
                const passing = rule.test(pwValue)
                return (
                  <div
                    key={rule.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {passing ? (
                      <Check
                        size={12}
                        color="hsl(var(--primary))"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <X size={12} color={ERR} strokeWidth={2.5} />
                    )}
                    <span
                      style={{
                        fontFamily: font,
                        fontSize: '12px',
                        color: passing ? 'hsl(var(--primary))' : ERR,
                      }}
                    >
                      {rule.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* After submit, always show the error message (including backend errors) */}
          {!showPwRules && <FieldError message={errors.password?.message} />}
        </div>

        {/* Confirm Password */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="confirmPassword"
            style={{
              fontFamily: font,
              fontSize: '14px',
              fontWeight: 500,
              color: 'hsl(var(--foreground))',
              marginBottom: '6px',
            }}
          >
            Confirm Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Confirm your password"
              style={{
                ...inputBase,
                paddingRight: '42px',
                borderColor: errors.confirmPassword
                  ? ERR
                  : 'hsl(var(--border))',
              }}
              onFocus={(e) => focusInput(e, !!errors.confirmPassword)}
              {...registerConfirmPassword}
              onBlur={(e) => {
                registerConfirmPassword.onBlur(e)
                blurInput(e, !!errors.password)
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'hsl(var(--muted-foreground))',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                lineHeight: 0,
              }}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FieldError message={errors.confirmPassword?.message} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '11px 16px',
            marginTop: '4px',
            backgroundColor: 'hsl(var(--primary))',
            opacity: isSubmitting ? 0.7 : 1,
            border: 'none',
            borderRadius: 'var(--radius)',
            fontFamily: font,
            fontSize: '15px',
            fontWeight: 600,
            color: 'hsl(var(--primary-foreground))',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.15s, box-shadow 0.15s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting)
              e.currentTarget.style.boxShadow =
                '0 4px 16px hsl(var(--primary) / 0.35)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {isSubmitting && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ animation: 'af-spin 0.7s linear infinite' }}
            >
              <style>{`@keyframes af-spin { to { transform: rotate(360deg); } }`}</style>
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <path
                d="M8 2a6 6 0 016 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
          {isSubmitting ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '24px 0',
        }}
      >
        <div
          style={{
            flex: 1,
            height: '1px',
            backgroundColor: 'hsl(var(--border))',
          }}
        />
        <span
          style={{
            fontFamily: font,
            fontSize: '12px',
            color: 'hsl(var(--muted-foreground))',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          or
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            backgroundColor: 'hsl(var(--border))',
          }}
        />
      </div>

      {/* OAuth */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {(
          [
            {
              label: 'Continue with Google',
              Icon: GoogleIcon,
              provider: 'google',
            },
            {
              label: 'Continue with GitHub',
              Icon: GitHubIcon,
              provider: 'github',
            },
          ] as const
        ).map(({ label, Icon, provider }) => (
          <button
            key={provider}
            type="button"
            onClick={() => {
              window.location.href = `/api/auth/${provider}`
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              padding: '10px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              fontFamily: font,
              fontSize: '14px',
              fontWeight: 500,
              color: 'hsl(var(--foreground))',
              cursor: 'pointer',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--primary))'
              e.currentTarget.style.boxShadow =
                '0 0 0 3px hsl(var(--primary) / 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--border))'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>

      <p
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontFamily: font,
          fontSize: '13px',
          color: 'hsl(var(--muted-foreground))',
        }}
      >
        Already have an account?{' '}
        <Link
          href="/login"
          style={{
            color: 'hsl(var(--primary))',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
