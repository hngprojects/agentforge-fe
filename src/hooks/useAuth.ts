'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { login, logout, register, getMe, refresh } from '@/lib/api/auth'
import type { LoginInput, RegisterInput } from '@/schemas/auth'
import { AxiosError } from 'axios'

/**
 * Primary auth hook. Use this in all client components — never call the API
 * helpers or the Zustand store directly from a component.
 *
 * @example Login form
 * const { login } = useAuth();
 * await login({ email, password });
 * router.push("/dashboard");
 *
 * @example Show user info
 * const { user } = useAuth();
 * return <p>Hello {user?.display_name}</p>;
 *
 * @example Guard a client component
 * const { isAuthenticated } = useAuth();
 * if (!isAuthenticated) redirect("/login");
 *
 * @example Logout button
 * const { logout } = useAuth();
 * <button onClick={logout}>Sign out</button>
 */

const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/reset-password',
  '/forgot-password',
  '/verify-email',
  '/confirm-email',
]

export function useAuth() {
  const router = useRouter()
  const { accessToken, user, isAuthenticated, setAccessToken, setUser, clear } =
    useAuthStore()
  const pathname = usePathname()
  const hydrated = useRef(false)

  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path))
    if (hydrated.current || isAuthenticated || isPublicPath) return
    hydrated.current = true

    refresh()
      .then(({ access_token }) => {
        setAccessToken(access_token)
        return getMe()
      })
      .then(setUser)
      .catch((err: unknown) => {
        clear()
        // If the refresh cookie belongs to an unverified account, the backend
        // returns 403. Send them to confirm-email; they have no email to pass
        // here since we don't store it, so just redirect without the param.
        if (err instanceof AxiosError && err.response?.status === 403) {
          router.push('/confirm-email')
        } else {
          logout()
        }
      })
  }, [
    isAuthenticated,
    setAccessToken,
    setUser,
    clear,
    router,
    pathname,
    accessToken,
  ])

  const handleRegister = useCallback(async (data: RegisterInput) => {
    return register(data)
  }, [])

  const handleLogin = useCallback(
    async (data: LoginInput) => {
      const { access_token } = await login(data)
      setAccessToken(access_token)
      const me = await getMe()
      setUser(me)
      return me
    },
    [setAccessToken, setUser]
  )

  const handleLogout = useCallback(async () => {
    try {
      await logout()
    } finally {
      clear()
      router.push('/login')
    }
  }, [clear, router])

  return {
    user,
    accessToken,
    isAuthenticated,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
  }
}
