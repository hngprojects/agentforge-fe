'use client'

import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { ResetPasswordForm } from './ResetPasswordForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { buttonVariants } from '~/components/ui/button'
import AuthHeader from '~/components/auth/AuthHeader'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      router.replace('/login')
    }
  }, [token, router])

  if (!token) {
    return null
  }

  return (
    <div className="min-h-svh p-4">
      <AuthHeader />
      <div className="mt-20 flex items-center justify-center md:mt-36">
        <Card
          className={`w-full rounded-3xl px-4 py-3 shadow-xs lg:px-10 lg:py-6 ${isSuccess ? 'max-w-[566px]' : 'max-w-[652px]'}`}
        >
          <CardHeader className="mb-6 items-start p-0">
            <Link
              href="/forgot-password"
              className="flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </CardHeader>
          <CardContent className="mx-auto max-w-[492px] px-2">
            <div className="mb-10 text-center">
              <h1 className="text-xl font-bold lg:text-2xl">
                {isSuccess ? 'Password reset' : 'Set a new Password'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isSuccess
                  ? 'Your password has been successfully reset, click below to login.'
                  : 'Enter a new password'}
              </p>
            </div>
            {isSuccess ? (
              <Link
                href="/login"
                className={buttonVariants({ className: 'h-auto w-full py-3' })}
              >
                Log in
              </Link>
            ) : (
              <ResetPasswordForm setIsSuccess={setIsSuccess} token={token} />
            )}
          </CardContent>
          <CardFooter className="mt-8 justify-center">
            <p className="text-sm">
              Need help? <Link href="/support">Contact support</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
