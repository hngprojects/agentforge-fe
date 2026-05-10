import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { ResetPasswordForm } from './ResetPasswordForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
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
            <h1 className="text-2xl font-bold">Set a new Password</h1>
            <p className="text-sm text-muted-foreground">
              Enter a new password
            </p>
          </div>
          <ResetPasswordForm />
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
