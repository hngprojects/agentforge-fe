'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { LoginSchema, type LoginInput } from '@/schemas/auth'
import { useAuth } from '@/hooks/useAuth'
import { GoogleIcon, GitHubIcon } from '@/components/icons'
import { AxiosError } from 'axios'

const font = 'Inter, sans-serif'

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
  if (!hasError) {
    e.currentTarget.style.borderColor = 'hsl(var(--primary))'
    e.currentTarget.style.boxShadow = '0 0 0 3px hsl(var(--primary) / 0.12)'
  }
}
function blurInput(e: React.FocusEvent<HTMLInputElement>, hasError: boolean) {
  if (!hasError) {
    e.currentTarget.style.borderColor = 'hsl(var(--border))'
    e.currentTarget.style.boxShadow = 'none'
  }
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPw, setShowPw] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) })
  const emailRegister = register('email')
  const passwordRegister = register('password')

  const onSubmit = async (data: LoginInput) => {
    setServerError(null)
    try {
      await login(data)
      router.push('/dashboard')
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.status === 403) {
        const detail = err.response.data?.detail
        if (detail === 'Please verify your email before logging in') {
          let email = ''
          try {
            email = JSON.parse(err.config?.data ?? '{}').email ?? ''
          } catch {}
          router.push(`/confirm-email?email=${encodeURIComponent(email)}`)
          return
        }
      }
      setServerError(
        err instanceof Error
          ? err.message
          : 'Invalid credentials. Please try again.'
      )
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: '400px', fontFamily: font }}>
      {/* Heading */}
      <h2
        style={{
          fontFamily: font,
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: '100%',
          color: 'hsl(var(--foreground))',
          textAlign: 'center',
          margin: '0 0 8px',
        }}
      >
        Welcome Back
      </h2>

      <p
        style={{
          fontFamily: font,
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '100%',
          color: 'hsl(var(--muted-foreground))',
          textAlign: 'center',
          margin: '0 0 32px',
        }}
      >
        Enter your details to access your account
      </p>

      {/* OAuth buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '24px',
        }}
      >
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

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
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
            fontWeight: 400,
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

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        {/* Server error */}
        {serverError && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'hsl(var(--destructive) / 0.08)',
              border: '1px solid hsl(var(--destructive) / 0.25)',
              borderRadius: 'var(--radius)',
              fontFamily: font,
              fontSize: '13px',
              color: 'hsl(var(--destructive))',
            }}
          >
            {serverError}
          </div>
        )}

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
              borderColor: errors.email
                ? 'hsl(var(--destructive))'
                : 'hsl(var(--border))',
            }}
            onFocus={(e) => focusInput(e, !!errors.email)}
            {...emailRegister}
            onBlur={(e) => {
              emailRegister.onBlur(e)
              blurInput(e, !!errors.email)
            }}
          />
          {errors.email && (
            <span
              style={{
                fontFamily: font,
                fontSize: '12px',
                color: 'hsl(var(--destructive))',
                marginTop: '4px',
              }}
            >
              {errors.email.message}
            </span>
          )}
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
              autoComplete="current-password"
              placeholder="Enter password"
              style={{
                ...inputBase,
                paddingRight: '42px',
                borderColor: errors.password
                  ? 'hsl(var(--destructive))'
                  : 'hsl(var(--border))',
              }}
              onFocus={(e) => focusInput(e, !!errors.password)}
              {...passwordRegister}
              onBlur={(e) => {
                passwordRegister.onBlur(e)
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
          {errors.password && (
            <span
              style={{
                fontFamily: font,
                fontSize: '12px',
                color: 'hsl(var(--destructive))',
                marginTop: '4px',
              }}
            >
              {errors.password.message}
            </span>
          )}

          {/* Forgot password — right-aligned under field */}
          <Link
            href="/forgot-password"
            style={{
              alignSelf: 'flex-end',
              marginTop: '6px',
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 400,
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
            }}
          >
            Forgot Password?
          </Link>
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
          {isSubmitting ? 'Signing in…' : 'Login'}
        </button>
      </form>

      {/* Sign-up CTA */}
      <p
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontFamily: font,
          fontSize: '13px',
          fontWeight: 400,
          color: 'hsl(var(--muted-foreground))',
        }}
      >
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          style={{
            color: 'hsl(var(--primary))',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Sign up free
        </Link>
      </p>
    </div>
  )
}
