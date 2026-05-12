import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL ?? 'http://localhost:8000'

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')?.value

  if (!refreshToken) {
    return NextResponse.json({ detail: 'No refresh token' }, { status: 401 })
  }

  const backendRes = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `refresh_token=${refreshToken}`,
    },
  })

  const data = await backendRes.json()
  const response = NextResponse.json(data, { status: backendRes.status })

  const setCookie = backendRes.headers.get('set-cookie')
  if (setCookie) {
    const rewritten = setCookie.replace(/path=\/api\/v1\/auth/i, 'path=/')
    response.headers.set('set-cookie', rewritten)
  }

  return response
}
