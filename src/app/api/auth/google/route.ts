import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')?.value
  if (refreshToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  const backendRes = await fetch(`${BACKEND}/api/v1/auth/google`, {
    method: 'GET',
    redirect: 'manual',
  })

  const location = backendRes.headers.get('location')
  if (!location) {
    return NextResponse.json(
      { detail: 'No redirect from backend' },
      { status: 500 }
    )
  }

  const response = NextResponse.redirect(location)

  backendRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      const rewritten = value.replace(/path=\/api\/v1\/auth/i, 'path=/')
      response.headers.append('set-cookie', rewritten)
    }
  })

  return response
}
