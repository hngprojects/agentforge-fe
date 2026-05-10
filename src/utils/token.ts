// src/lib/tokenStore.ts

import axios from 'axios'

let accessToken: string | null = null

const refreshAccessToken = async (): Promise<string | null> => {
  const baseURL = 'https://api.staging.agent-forge.hng14.com'
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
  getAccessToken: () => accessToken,

  setAccessToken: (token: string) => {
    accessToken = token
    document.cookie = `access_token=${token}; path=/; samesite=strict`
  },

  clearAccessToken: () => {
    accessToken = null
    document.cookie = 'access_token=; path=/; max-age=0'
  },

  refresh: refreshAccessToken,

  isAuthenticated: () => !!accessToken,
}
