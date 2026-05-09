import Link from 'next/link'
import { Button } from '~/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Welcome to your protected area.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Back Home</Link>
      </Button>
    </div>
  )
}
