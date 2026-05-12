import { NextResponse } from 'next/server'

const BACKEND = (
  process.env.BACKEND_URL ?? 'https://api.staging.agent-forge.hng14.com'
).replace(/\/$/, '')

export async function GET() {
  try {
    const backendRes = await fetch(`${BACKEND}/api/v1/auth/google`)
    const data = await backendRes.json()

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status })
    }

    const response = NextResponse.redirect(data.auth_url)

    response.cookies.set('oauth_state', data.state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10,
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to connect to backend' },
      { status: 502 }
    )
  }
}
