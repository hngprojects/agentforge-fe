import { AuthNavbar } from '@/components/auth/authNavbar'
import { AuthLoginForm } from '@/components/auth/authLoginForm'

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
      <AuthNavbar />
      <div className="flex flex-1 items-center justify-center overflow-hidden bg-white">
        <AuthLoginForm />
      </div>
    </div>
  )
}
