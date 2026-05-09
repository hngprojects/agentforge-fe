'use client'

import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import GoogleLogo from '~/components/icons/google-logo'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { cn } from '~/utils'

interface AuthPopupProps {
  children: React.ReactNode
  className?: string
}

export const AuthPopup = ({ children, className }: AuthPopupProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="overflow-hidden rounded-[10px] border-none p-0 shadow-2xl sm:max-w-[420px] sm:rounded-[10px]">
        <div className="flex flex-col items-center bg-white p-8 text-center sm:p-10">
          {/* Brand Identity */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="relative flex size-12 items-center justify-center rounded-2xl bg-[#0D5C4E]/5">
              <Image
                src="/images/framelogo.png"
                alt="AgentForge Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#0D5C4E] uppercase">
              AgentForge
            </span>
          </div>

          <DialogHeader className="mb-10 flex flex-col items-center space-y-3">
            <DialogTitle className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
              Start building smarter.
            </DialogTitle>
            <DialogDescription className="max-w-[300px] text-base leading-relaxed text-[#6B7280]">
              Join thousands of developers building reusable AI agent setups.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-4">
            <Button
              variant="outline"
              className="group h-14 w-full gap-4 rounded-2xl border-[#E5E7EB] text-base font-semibold transition-all duration-200 hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              onClick={() => {}}
            >
              <GoogleLogo className="size-6 transition-transform group-hover:scale-105" />
              <span>Continue with Google</span>
            </Button>

            <Button
              variant="outline"
              className="group h-14 w-full gap-4 rounded-2xl border-[#E5E7EB] text-base font-semibold transition-all duration-200 hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              onClick={() => {}}
            >
              <Github className="size-6 transition-transform group-hover:scale-105" />
              <span>Continue with GitHub</span>
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 py-1 text-sm font-bold text-[#0D5C4E] transition-colors hover:text-[#0a4a3f]"
            >
              Use email instead
            </Link>

            <p className="max-w-[280px] text-[11px] leading-normal text-[#9CA3AF]">
              By signing up, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-2 transition-colors hover:text-[#6B7280]"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-2 transition-colors hover:text-[#6B7280]"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthPopup
