import { Button } from '~/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center text-foreground">
      <h1 className="mb-4 text-4xl font-bold">Welcome to Your New Project</h1>
      <p className="mb-8 text-xl opacity-70">
        This is a lean foundation using Next.js, FastAPI, and Custom JWT.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <a href="/login">Login Demo</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/dashboard">Go to Dashboard</a>
        </Button>
      </div>
    </div>
  )
}
