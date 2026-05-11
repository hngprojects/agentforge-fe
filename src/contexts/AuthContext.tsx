'use client'

import {
  createContext,
  useContext,
  type ReactNode,
} from 'react'
import { useAuth } from '~/hooks/useAuth'


// ─── Shape ────────────────────────────────────────────────────────────────────

type AuthContextValue = ReturnType<typeof useAuth>

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)
AuthContext.displayName = 'AuthContext'

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * Wrap your app (or a subtree) with this provider to make auth state and
 * actions available to every child component via `useAuthContext()`.
 *
 * @example
 * // app/layout.tsx
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html>
 *       <body>
 *         <AuthProvider>{children}</AuthProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// ─── Consumer hook ────────────────────────────────────────────────────────────

/**
 * Access the auth context inside any client component.
 * Must be used within an `<AuthProvider>` subtree.
 *
 * @example Login form
 * const { login } = useAuthContext()
 * await login({ email, password })
 * router.push('/dashboard')
 *
 * @example Show user info
 * const { user } = useAuthContext()
 * return <p>Hello {user?.display_name}</p>
 *
 * @example Guard a client component
 * const { isAuthenticated } = useAuthContext()
 * if (!isAuthenticated) redirect('/login')
 *
 * @example Logout button
 * const { logout } = useAuthContext()
 * <button onClick={logout}>Sign out</button>
 */
export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error(
      '`useAuthContext` must be used inside an `<AuthProvider>`.\n' +
        'Make sure you have wrapped your app (or the relevant subtree) with <AuthProvider>.'
    )
  }
  return ctx
}