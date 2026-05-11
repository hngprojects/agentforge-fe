import { NextRequest, NextResponse } from 'next/server'
import { BACKEND_URL } from '@/utils/consts'

export async function POST(request: NextRequest) {
  const body = await request.text()

  const backendRes = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })

  const data = await backendRes.json()
  return NextResponse.json(data, { status: backendRes.status })
}
