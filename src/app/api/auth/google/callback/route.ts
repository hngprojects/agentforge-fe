import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function GET(request: NextRequest) {
  const search = request.nextUrl.search

  const cookieHeader = request.headers.get('cookie') ?? ''

  const backendRes = await fetch(
    `${BACKEND}/api/v1/auth/google/callback${search}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader, // ← this is what was missing
      },
    }
  )

  const data = await backendRes.json()
  const response = NextResponse.json(data, { status: backendRes.status })

  const setCookie = backendRes.headers.get('set-cookie')
  if (setCookie) {
    const rewritten = setCookie.replace(/path=\/api\/v1\/auth/i, 'path=/')
    response.headers.set('set-cookie', rewritten)
  }

  return response
}
