import axios from 'axios'
import { createContext, useContext } from 'react'
import { z, ZodError } from 'zod'
import { LoginSchema, RegisterSchema } from '~/schemas'
import { APIResult } from '~/types'
import { MessageResponse, TokenResponse } from '~/types/auth'
import { AUTH_PROVIDERS, AuthProviders } from '~/constants/authProviders'
import { tokenStore } from '~/utils/token'

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

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  //register returns a message that a message has been sent to email
  const registerUser = async ({
    registerCredentials,
  }: {
    registerCredentials: RegisterCredentials
  }): Promise<APIResult<MessageResponse>> => {
    try {
      RegisterSchema.parse(registerCredentials)
      const response = await axios.post(`${baseURL}/api/v1/register`, {
        registerCredentials,
      })
      const result = response.data
      return {
        success: true,
        data: result,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: {
            name: 'Validation Error',
            statusCode: 422,
            message: error.errors[0].message,
          },
        }
      }
      return {
        success: false,
        error: {
          name: 'Register User failed',
          statusCode: 500,
          message: (error as Error).message,
        },
      }
    }
  }

  // login returns the
  const loginUser = async ({
    loginCredentials,
  }: {
    loginCredentials: LoginCredentials
  }): Promise<APIResult<TokenResponse>> => {
    try {
      LoginSchema.parse(loginCredentials)
      const response = await axios.post(`${baseURL}/api/v1/login`, {
        loginCredentials,
      })

      const result: TokenResponse = response.data
      tokenStore.setAccessToken(response.data.access_token)
      return {
        success: true,
        data: result,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: {
            name: 'Validation Error',
            statusCode: 422,
            message: error.errors[0].message,
          },
        }
      }

      return {
        success: false,
        error: {
          name: 'Login User Failed',
          statusCode: 500,
          message: (error as Error).message ?? 'Something went wrong',
        },
      }
    }
  }

  const logout = async () => {
    tokenStore.clearAccessToken()
  }

  const loginWithProvider = async (provider: AuthProviders) => {
    try {
      const validProviders = Object.values(AUTH_PROVIDERS)
      if (!validProviders.includes(provider)) {
        console.error(`Invalid provider: ${provider}`)
        return
      }

      window.location.href = `${baseURL}/api/v1/${provider}`
    } catch (error) {
      return {
        success: false,
        error: {
          name: 'Login User Failed',
          statusCode: 500,
          message: (error as Error).message ?? 'Something went wrong',
        },
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ loginUser, logout, registerUser, loginWithProvider }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
