import { createContext, useCallback, useContext, useMemo } from 'react'
import { z } from 'zod'

import { APIResult } from '~/types'
import { MessageResponse, TokenResponse } from '~/types/auth'
import { AUTH_PROVIDERS, AuthProviders } from '~/constants/authProviders'
import { tokenStore } from '~/utils/token'
import { handleError } from '~/lib/utils/handleError'
import { LoginSchema, RegisterSchema } from '~/schemas/auth'
import { login, register, logout as logoutApi, getMe } from '~/lib/api/auth'
import { useAuthStore } from '~/stores/auth-store'

type LoginCredentials = z.infer<typeof LoginSchema>
type RegisterCredentials = z.infer<typeof RegisterSchema>

type AuthContextType = {
  loginUser: ({
    loginCredentials,
  }: {
    loginCredentials: LoginCredentials
  }) => Promise<APIResult<TokenResponse>>

  registerUser: ({
    registerCredentials,
  }: {
    registerCredentials: RegisterCredentials
  }) => Promise<APIResult<MessageResponse>>

  loginWithProvider: (provider: AuthProviders) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!baseURL) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set')

  // ← pull actions from store
  const { setAccessToken, setUser, clear } = useAuthStore()

  const registerUser = useCallback(
    async ({
      registerCredentials,
    }: {
      registerCredentials: RegisterCredentials
    }): Promise<APIResult<MessageResponse>> => {
      try {
        RegisterSchema.parse(registerCredentials)
        const result = await register(registerCredentials)
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: handleError(error) }
      }
    },
    []
  )

  const loginUser = useCallback(
    async ({
      loginCredentials,
    }: {
      loginCredentials: LoginCredentials
    }): Promise<APIResult<TokenResponse>> => {
      try {
        LoginSchema.parse(loginCredentials)
        const result = await login(loginCredentials)

        tokenStore.setAccessToken(result.access_token)
        setAccessToken(result.access_token)

        const user = await getMe()
        setUser(user)

        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: handleError(error) }
      }
    },
    [setAccessToken, setUser]
  )

  const logout = useCallback(async () => {
    try {
      await logoutApi()
    } finally {
      tokenStore.clearAccessToken() // ← clears cookie (for middleware)
      clear()                        // ← clears zustand store (token + user + isAuthenticated)
    }
  }, [clear])

  const loginWithProvider = useCallback((provider: AuthProviders) => {
    const validProviders = Object.values(AUTH_PROVIDERS)
    if (!validProviders.includes(provider)) {
      console.error(`Invalid provider: ${provider}`)
      return
    }
    window.location.href = `${baseURL}/api/v1/auth/${provider}`
  }, [])

  const value = useMemo(
    () => ({ loginUser, logout, registerUser, loginWithProvider }),
    [loginUser, logout, registerUser, loginWithProvider]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (ctx == null) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}