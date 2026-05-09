import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { ResetPasswordForm } from './ResetPasswordForm'
import Link from 'next/link'
import { buttonVariants } from '~/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-lg shadow-xs">
        <CardHeader className="items-start">
          <Link
            href="/forgot-password"
            className={`${buttonVariants({ variant: 'ghost', size: 'sm' })} mb-8 flex items-center gap-1`}
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Set a new Password</h1>
            <p className="text-sm text-muted-foreground">
              Enter a new password to reset your password
            </p>
          </div>
          <ResetPasswordForm />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm">
            Need help? <Link href="/support">Contact support</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
