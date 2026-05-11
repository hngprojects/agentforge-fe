'use client'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { useAuth } from '~/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Generator</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Hi, {user?.display_name}. Welcome to your protected area.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Back Home</Link>
      </Button>
    </div>
  )
}
