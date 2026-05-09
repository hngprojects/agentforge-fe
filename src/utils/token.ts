// src/lib/tokenStore.ts
import axios from 'axios'
import { cookies } from 'next/headers'

type TokenStore = {
  accessToken: string | null
  refreshToken: string | null
}
const cookieStore = await cookies()

const store: TokenStore = {
  accessToken: null,
  refreshToken: null,
}

const baseUrl = ''

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    // refresh_token httpOnly cookie is sent automatically by the browser
    const response = await axios.post(`${baseUrl}/api/v1/refresh`, {
      credentials: 'include', // ← ensures httpOnly cookie is sent
    })

    const data = await response.data
    const newToken = data.access_token

    tokenStore.setAccessToken(newToken)
    return newToken
  } catch {
    tokenStore.clearAccessToken()
    return null
  }
}

export const tokenStore = {
  getAccessToken: () => store.accessToken,
  getRefreshToken: () => {
    const storeToken = cookieStore.get('refresh_token')
    return storeToken || store.refreshToken
  },

  setAccessToken: (token: string) => {
    store.accessToken = token
  },
  setRefreshToken: (token: string) => {
    store.refreshToken = token
    cookieStore.set('refresh_token', token)
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    store.accessToken = accessToken
    store.refreshToken = refreshToken
    cookieStore.set('refresh_token', refreshToken)
  },

  clear: () => {
    store.accessToken = null
    store.refreshToken = null
  },
  clearAccessToken: () => {
    store.accessToken = null
    document.cookie = 'access_token=; path=/; max-age=0'
  },

  refresh: refreshAccessToken,

  isAuthenticated: () => !!store.accessToken,
}
