import { Suspense } from 'react'
import ResetPasswordClient from '~/components/auth/ResetPasswordClient'
import LoadingSpinner from '~/components/miscellaneous/loading-spinner'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordClient />
    </Suspense>
  )
}
