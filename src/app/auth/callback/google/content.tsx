'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { publicClient } from '@/lib/axios'

const font = 'Inter, sans-serif'

export default function GoogleCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    console.log('Google callback hit with code and state:', {
      hasCode: !!code,
      hasState: !!state,
    })

    if (!code || !state) {
      console.error('Missing code or state in URL')
      router.push('/login?error=oauth_failed')
      return
    }
    publicClient
      .post('/auth/google/callback', { code, state })
      .then((res) => {
        console.log('Callback API response:', res.status, res.data)
        if (res.data.access_token) {
          router.push('/generator')
        } else {
          console.error('No access token in response')
          router.push('/login?error=oauth_failed')
        }
      })
      .catch((err) => {
        console.error(
          'Callback API error:',
          err.response?.status,
          err.response?.data
        )
        router.push('/login?error=oauth_failed')
      })
  }, [searchParams, router])

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
