import { NextRequest, NextResponse } from 'next/server'

const BACKEND = (
  process.env.BACKEND_URL ?? 'https://api.staging.agent-forge.hng14.com'
).replace(/\/$/, '')

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.json({ detail: 'Token is required' }, { status: 400 })
    }

    const backendRes = await fetch(
      `${BACKEND}/api/v1/auth/verify-email?token=${encodeURIComponent(token)}`,
      { method: 'GET' }
    )

    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to connect to backend' },
      { status: 502 }
    )
  }
}
