import { NextRequest, NextResponse } from 'next/server'
import { clientRoutes } from './routes'

export default async function proxy(request: NextRequest) {
  const { nextUrl } = request

  const token = request.cookies.get('access_token')?.value
  const isLoggedIn = !!token

  const isProtectedRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/admin')
  const isClientRoute = clientRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  const AUTH_ROUTES = ['/login', '/register']
  const PUBLIC_ROUTES = [
    '/login',
    '/register',
    '/verify-email',
    '/confirm-email',
    '/auth/google/callback',
  ]

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

  if ((isProtectedRoute || isClientRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLoggedIn && (isProtectedRoute || isClientRoute)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('Authorization', `Bearer ${token}`)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)'],
}
