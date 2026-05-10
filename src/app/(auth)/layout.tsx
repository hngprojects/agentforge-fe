import type { ReactNode } from 'react'
import { AuthNavBar } from '@/components/auth/AuthNavBar'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fefeff]">
      <AuthNavBar />
      <div className="flex flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
