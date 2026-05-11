import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_URL } from '@/utils/consts'

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')?.value
  const accessToken = request.headers.get('authorization')

  const backendRes = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(refreshToken && { cookie: `refresh_token=${refreshToken}` }),
      ...(accessToken && { authorization: accessToken }),
    },
  })

  const data = await backendRes.json()
  const response = NextResponse.json(data, { status: backendRes.status })

  response.cookies.set('refresh_token', '', {
    path: '/',
    maxAge: 0,
  })

  return response
}
