import axios from 'axios'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { z } from 'zod'
import { LoginSchema, RegisterSchema } from '~/schemas'
import { APIResult } from '~/types'
import { MessageResponse, TokenResponse } from '~/types/auth'
import { AUTH_PROVIDERS, AuthProviders } from '~/constants/authProviders'
import { tokenStore } from '~/utils/token'
import { handleError } from '~/lib/utils/handleError'

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

  //register returns a message that a message has been sent to email
  const registerUser = useCallback(
    async ({
      registerCredentials,
    }: {
      registerCredentials: RegisterCredentials
    }): Promise<APIResult<MessageResponse>> => {
      try {
        RegisterSchema.parse(registerCredentials)
        const response = await axios.post(`${baseURL}/api/v1/auth/register`, {
          registerCredentials,
        })
        const result = response.data
        return {
          success: true,
          data: result,
        }
      } catch (error) {
        return {
          success: false,
          error: handleError(error),
        }
      }
    },
    []
  )

  // login returns the
  const loginUser = useCallback(
    async ({
      loginCredentials,
    }: {
      loginCredentials: LoginCredentials
    }): Promise<APIResult<TokenResponse>> => {
      try {
        LoginSchema.parse(loginCredentials)
        const response = await axios.post(`${baseURL}/api/v1/auth/login`, {
          loginCredentials,
        })

        const result: TokenResponse = response.data
        tokenStore.setAccessToken(response.data.access_token)
        return {
          success: true,
          data: result,
        }
      } catch (error) {
        return {
          success: false,
          error: handleError(error),
        }
      }
    },
    []
  )

  const logout = useCallback(async () => {
    tokenStore.clearAccessToken()
  }, [])

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
