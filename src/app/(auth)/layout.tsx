import type { ReactNode } from 'react'
import { AuthNavBar } from '@/components/auth/AuthNavBar'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
<<<<<<< HEAD
    <div className="flex h-screen flex-col overflow-hidden bg-[#F4F4F5]">
      <AuthNavBar />
      <div className="flex flex-1 overflow-y-auto bg-white">{children}</div>
=======
    <div className="flex min-h-screen flex-col bg-[#fefeff]">
      <AuthNavBar />
      <div className="flex flex-1 overflow-y-auto">{children}</div>
>>>>>>> b582f36 (refactor(auth): componentize auth pages and update styling)
    </div>
  )
}
