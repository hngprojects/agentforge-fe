'use client'

import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { ResetPasswordForm } from './ResetPasswordForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { buttonVariants } from '~/components/ui/button'

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
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-[652px] rounded-3xl px-10 py-7 shadow-xs">
        <CardHeader className="mb-6 items-start p-0">
          <Link href="/forgot-password" className={`flex items-center gap-1`}>
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </CardHeader>
        <CardContent className="mx-auto max-w-[492px]">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold">
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
  )
}
