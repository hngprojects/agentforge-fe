import { NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL  ?? 'http://localhost:8000'

export async function GET() {
  const backendRes = await fetch(`${BACKEND}/api/v1/auth/google`)
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
