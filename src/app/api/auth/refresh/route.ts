import { NextRequest, NextResponse } from 'next/server'

const BACKEND = (
  process.env.BACKEND_URL ?? 'https://api.staging.agent-forge.hng14.com'
).replace(/\/$/, '')

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refresh_token')?.value

    if (!refreshToken) {
      return NextResponse.json({ detail: 'No refresh token' }, { status: 401 })
    }

    const backendRes = await fetch(`${BACKEND}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: `refresh_token=${refreshToken}`,
      },
    })

    const data = await backendRes.json()
    const response = NextResponse.json(data, { status: backendRes.status })

    const setCookies = backendRes.headers.getSetCookie()
    setCookies.forEach((cookieStr) => {
      const [nameValue] = cookieStr.split(';')
      const [name, value] = nameValue.split('=')

      const options: {
        path: string
        httpOnly: boolean
        secure: boolean
        sameSite: 'lax' | 'strict' | 'none'
        maxAge?: number
      } = {
        path: '/',
        httpOnly: cookieStr.toLowerCase().includes('httponly'),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      }

      const maxAgeMatch = cookieStr.match(/Max-Age=([^;]+)/i)
      if (maxAgeMatch) options.maxAge = parseInt(maxAgeMatch[1])

      response.cookies.set(name.trim(), value.trim(), options)
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to connect to backend' },
      { status: 502 }
    )
  }
}
