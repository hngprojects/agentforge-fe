import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

// Public client — no auth, used for login/register/refresh calls
export const publicClient = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // sends the HttpOnly refresh_token cookie
})

// Auth client — injects access token, silently refreshes on 401
export const authClient = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Lazy import to avoid circular deps (store imports axios, axios imports store)
function getAccessToken(): string | null {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAuthStore } = require('@/lib/stores/auth-store')
  return useAuthStore.getState().accessToken
}

function setAccessToken(token: string): void {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAuthStore } = require('@/lib/stores/auth-store')
  useAuthStore.getState().setAccessToken(token)
}

function clearAuth(): void {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAuthStore } = require('@/lib/stores/auth-store')
  useAuthStore.getState().clear()
}

// Request interceptor — attach Bearer token
authClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — on 401, hit the Next.js refresh route handler,
// update the store, and replay the original request once.
let isRefreshing = false
let queue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null = null) {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  queue = []
}

authClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      // Queue concurrent requests while a refresh is in flight
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return authClient(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      // Call the Next.js route handler which proxies to the backend
      // and re-sets the access token cookie server-side
      const { data } = await publicClient.post<{ access_token: string }>(
        '/auth/refresh'
      )
      const newToken = data.access_token

      setAccessToken(newToken)
      processQueue(null, newToken)

      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return authClient(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      clearAuth()
      // Redirect to login — works in client components
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)
