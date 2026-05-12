import { Suspense } from 'react'
import ConfirmEmailContent from './content'

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmEmailContent />
    </Suspense>
  )
}
