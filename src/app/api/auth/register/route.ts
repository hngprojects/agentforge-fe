import { NextRequest, NextResponse } from 'next/server'

const BACKEND = (
  process.env.BACKEND_URL ?? 'https://api.staging.agent-forge.hng14.com'
).replace(/\/$/, '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()

    const backendRes = await fetch(`${BACKEND}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Failed to connect to backend' },
      { status: 502 }
    )
  }
}
