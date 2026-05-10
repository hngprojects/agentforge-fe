'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { publicClient } from '@/lib/axios'
import { AccessTokenResponseSchema } from '@/schemas/auth'
import { getMe } from '@/lib/api/auth'

const font = 'Inter, sans-serif'

export default function GoogleCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAccessToken, setUser, clear } = useAuthStore()
  const called = useRef(false)

  useEffect(() => {
    if (called.current) return
    called.current = true

    const params = Object.fromEntries(searchParams.entries())

    publicClient
      .get('/auth/google/callback', { params })
      .then((res) => {
        const { access_token } = AccessTokenResponseSchema.parse(res.data)
        setAccessToken(access_token)
        return getMe()
      })
      .then((user) => {
        setUser(user)
        console.log(user)
        router.replace('/dashboard')
      })
      .catch(() => {
        clear()
        router.replace('/login?error=oauth_failed')
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        fontFamily: font,
        backgroundColor: 'hsl(var(--background))',
      }}
    >
      <Loader2
        size={28}
        color="hsl(var(--muted-foreground))"
        style={{ animation: 'af-spin 0.7s linear infinite' }}
      />
      <style>{`@keyframes af-spin { to { transform: rotate(360deg); } }`}</style>
      <p
        style={{
          fontFamily: font,
          fontSize: '14px',
          color: 'hsl(var(--muted-foreground))',
          margin: 0,
        }}
      >
        Signing you in…
      </p>
    </div>
  )
}
