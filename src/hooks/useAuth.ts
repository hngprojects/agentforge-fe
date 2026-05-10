// lib/hooks/use-auth.ts
'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { login, logout, register, getMe, refresh } from '@/lib/api/auth'
import type { LoginInput, RegisterInput } from '@/schemas/auth'

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
export function useAuth() {
  const { accessToken, user, isAuthenticated, setAccessToken, setUser, clear } =
    useAuthStore()

  const hydrated = useRef(false)

  useEffect(() => {
    if (hydrated.current || isAuthenticated) return
    hydrated.current = true

    refresh()
      .then(({ access_token }) => {
        setAccessToken(access_token)
        return getMe()
      })
      .then(setUser)
      .catch(() => {
        clear()
      })
  }, [isAuthenticated, setAccessToken, setUser, clear])

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
    }
  }, [clear])

  return {
    user,
    accessToken,
    isAuthenticated,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
  }
}
