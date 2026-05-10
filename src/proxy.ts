import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export default async function proxy(request: NextRequest) {
  const { nextUrl } = request
  const cookieStore = await cookies()

  const token = cookieStore.get('access_token')
  const isLoggedIn = !!token

  const isProtectedRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/admin')
  const isAuthRoute =
    nextUrl.pathname === '/login' || nextUrl.pathname === '/register'

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
