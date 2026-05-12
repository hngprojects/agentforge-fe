import { Suspense } from 'react'
import GithubCallbackContent from './content'

export default function GithubCallbackPage() {
  return (
    <Suspense fallback={null}>
      <GithubCallbackContent />
    </Suspense>
  )
}
