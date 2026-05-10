import { NextRequest, NextResponse } from 'next/server'
import { clientRoutes } from './routes'

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request

  const token = request.cookies.get('access_token')?.value
  const isLoggedIn = !!token

  const isProtectedRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/admin')

  const isAuthRoute =
    nextUrl.pathname === '/login' || nextUrl.pathname === '/register'

  const isClientRoute = clientRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isClientRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('Authorization', `Bearer ${token}`)
    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
