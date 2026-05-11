import { Suspense } from 'react'
import GoogleCallbackContent from './content'

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={null}>
      <GoogleCallbackContent />
    </Suspense>
  )
}
