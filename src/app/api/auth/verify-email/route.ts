import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_URL } from '@/utils/consts'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ detail: 'Token is required' }, { status: 400 })
  }

  const backendRes = await fetch(
    `${BACKEND_URL}/api/v1/auth/verify-email?token=${encodeURIComponent(token)}`,
    { method: 'GET' }
  )

  const data = await backendRes.json()
  return NextResponse.json(data, { status: backendRes.status })
}
