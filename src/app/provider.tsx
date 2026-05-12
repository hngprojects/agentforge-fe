'use client'

import { useEffect } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster as Sonner } from '~ui/sonner'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { useAuthStore } from '@/stores/auth-store'
import { refresh, getMe } from '@/lib/api/auth'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 10 * MINUTE,
        staleTime: 1 * MINUTE,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const MINUTE = 1000 * 60

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const { setAccessToken, setUser, clear } = useAuthStore()

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        document.body.style.pointerEvents = 'auto'

        const PUBLIC_PATHS = [
          '/',
          '/login',
          '/register',
          '/pricing',
          '/explore',
          '/confirm-email',
        ]
        const isPublic = PUBLIC_PATHS.some(
          (p) =>
            window.location.pathname === p ||
            window.location.pathname.startsWith(p + '/')
        )

        if (!isPublic) {
          refresh()
            .then(({ access_token }) => {
              setAccessToken(access_token)
              return getMe()
            })
            .then(setUser)
            .catch(() => {
              clear()
              window.location.replace('/login')
            })
        }
      }
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [setAccessToken, setUser, clear])

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressBar
        style="style"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <Sonner richColors expand={true} position="top-right" />
      {children}
    </QueryClientProvider>
  )
}
