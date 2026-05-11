// src/lib/tokenStore.ts

import axios from 'axios'

let accessToken: string | null = null

const readAccessTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

const refreshAccessToken = async (): Promise<string | null> => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!baseURL) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set')

  try {
    const { data } = await axios.post(
      `${baseURL}/api/v1/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    )

    const newToken = data.access_token
    tokenStore.setAccessToken(newToken)
    return newToken
  } catch {
    tokenStore.clearAccessToken()
    return null
  }
}

export const tokenStore = {
  getAccessToken: () => {
    if (accessToken == null) accessToken = readAccessTokenFromCookie()
    return accessToken
  },

  setAccessToken: (token: string) => {
    accessToken = token
    const secure = location.protocol === 'https:' ? '; secure' : ''
    document.cookie = `access_token=${token}; path=/; samesite=strict${secure}`
  },

  clearAccessToken: () => {
    accessToken = null
    const secure = location.protocol === 'https:' ? '; secure' : ''
    document.cookie = `access_token=; path=/; samesite=strict${secure}; max-age=0`
  },

  refresh: refreshAccessToken,

  isAuthenticated: () => !!(accessToken ?? readAccessTokenFromCookie()),
}
