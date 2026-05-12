import { NextRequest, NextResponse } from 'next/server'

const BACKEND = (
  process.env.BACKEND_URL ?? 'https://api.staging.agent-forge.hng14.com'
).replace(/\/$/, '')

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('authorization')
    const refreshToken = request.cookies.get('refresh_token')?.value

    const backendRes = await fetch(`${BACKEND}/api/v1/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { authorization: accessToken }),
        ...(refreshToken && { cookie: `refresh_token=${refreshToken}` }),
      },
    })

    const data = await backendRes.json()
    return NextResponse.json(data, { status: backendRes.status })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to connect to backend' },
      { status: 502 }
    )
  }
}
