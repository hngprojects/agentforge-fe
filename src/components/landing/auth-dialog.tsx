'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

type AuthDialogProps = {
  trigger: React.ReactNode
}

export function AuthDialog({ trigger }: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'register'>('register')

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-fg-default">
            {mode === 'register' ? 'Create your account' : 'Welcome back'}
          </DialogTitle>
          <DialogDescription className="text-fg-muted">
            {mode === 'register'
              ? 'Start building AI agents in minutes. No credit card required.'
              : 'Log in to continue building with Agent Forge.'}
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4 pt-2"
          onSubmit={(e) => {
            e.preventDefault()
            // TODO: hook up to FastAPI auth endpoint
          }}
        >
          {mode === 'register' && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" type="text" placeholder="Jane Doe" required />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full bg-teal-900 text-white hover:bg-teal-800"
          >
            {mode === 'register' ? 'Create account' : 'Log in'}
          </Button>
        </form>

        <p className="pt-2 text-center text-sm text-fg-muted">
          {mode === 'register' ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-medium text-teal-800 hover:underline"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              New here?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-medium text-teal-800 hover:underline"
              >
                Create an account
              </button>
            </>
          )}
        </p>
      </DialogContent>
    </Dialog>
  )
}
