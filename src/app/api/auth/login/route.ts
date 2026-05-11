import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL  ?? 'http://localhost:8000'

export async function POST(request: NextRequest) {
  const body = await request.text()

  const backendRes = await fetch(`${BACKEND}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
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
