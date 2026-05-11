import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_URL } from '@/utils/consts'

export async function POST(request: NextRequest) {
  const body = await request.text()

  const backendRes = await fetch(`${BACKEND_URL}/api/v1/auth/google/callback`, {
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
