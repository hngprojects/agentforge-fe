import { NextResponse } from 'next/server'
import { BACKEND_URL } from '@/utils/consts'

export async function GET() {
  const backendRes = await fetch(`${BACKEND_URL}/api/v1/auth/google`)
  const data = await backendRes.json()

  const response = NextResponse.redirect(data.auth_url)

  // Store state in a cookie so the callback page can read it
  response.cookies.set('oauth_state', data.state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10,
    path: '/',
  })

  return response
}
