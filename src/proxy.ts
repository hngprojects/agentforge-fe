import { NextRequest, NextResponse } from 'next/server'

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/verify-email',
  '/confirm-email',
  '/auth/google/callback',
  '/reset-password',
]

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const refreshToken = request.cookies.get('refresh_token')?.value

  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))
  const isPublicRoute =
    pathname === '/' ||
    PUBLIC_ROUTES.filter((r) => r !== '/').some((r) => pathname.startsWith(r))

  if (refreshToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/generator', request.url))
  }

  if (!refreshToken && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)'],
}
