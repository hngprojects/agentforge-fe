'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  Sparkles,
  Box,
  Globe,
  User,
  Github,
} from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { motion } from 'framer-motion'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean(),
})

type LoginFormValues = z.infer<typeof LoginSchema>

const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (values.email === 'error@example.com') {
        toast.error('Login failed', {
          description: 'An error occurred during login',
        })
      } else {
        toast.success('Login success', {
          description: 'Redirecting to workspace',
        })
        setTimeout(() => router.push('/'), 1000)
      }
    })
  }
  const rememberMe = useWatch({ control: form.control, name: 'rememberMe' })
  return (
    <div className="flex min-h-screen bg-[#F8FAFB] font-sans text-[#1A1A1A]">
      {/* Left panel */}
      <div className="relative hidden w-[40%] flex-col justify-between overflow-hidden bg-[#020B0B] p-16 text-white lg:flex">
        <div className="relative z-10">
          <div className="mb-24 flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <User className="h-3.5 w-3.5 fill-black text-black" />
            </div>
            <span className="text-xl font-bold tracking-widest uppercase">
              AgentForge
            </span>
          </div>

          <div className="max-w-md">
            <h1 className="mb-8 text-[48px] leading-[1.1] font-bold tracking-tight">
              Build and publish AI Agents in seconds
            </h1>
            <p className="mb-16 text-[18px] leading-relaxed text-white/50">
              Turn ideas into reusable AI systems and share them with the world
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Sparkles className="h-5 w-5 text-white/40" />
                <span className="text-[16px] font-medium text-white/80">
                  Create powerful AI agents
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Box className="h-5 w-5 text-white/40" />
                <span className="text-[16px] font-medium text-white/80">
                  Auto-Generate system files
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Globe className="h-5 w-5 text-white/40" />
                <span className="text-[16px] font-medium text-white/80">
                  Publish to GitHub and share
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-[60%]">
        <Toaster position="top-center" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full max-w-130 flex-col rounded-[40px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 md:p-16"
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-[28px] font-bold tracking-tight sm:text-[32px]">
              Login
            </h1>
            <p className="text-sm leading-relaxed text-[#637381] sm:text-base">
              Welcome back, you&apos;ve been missed!
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="mb-8 flex flex-col gap-4">
            <Button
              type="button"
              onClick={() => toast.info('Google login initiated')}
              disabled={isLoading}
              variant="outline"
              className="h-12 w-full gap-3 rounded-xl border-[#919EAB]/30 font-semibold text-[#454F5B]"
            >
              <GoogleLogo />
              <span className="mx-1 h-4 w-px bg-[#919EAB]/30" />
              <span>Continue with Google</span>
            </Button>
            <Button
              type="button"
              onClick={() => toast.info('GitHub login initiated')}
              disabled={isLoading}
              variant="outline"
              className="h-12 w-full gap-3 rounded-xl border-[#919EAB]/30 font-semibold text-[#454F5B]"
            >
              <Github className="h-5 w-5" />
              <span className="mx-1 h-4 w-px bg-[#919EAB]/30" />
              <span>Continue with GitHub</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#919EAB]/10" />
            <span className="text-[11px] font-bold tracking-widest text-[#919EAB] uppercase">
              OR
            </span>
            <div className="h-px flex-1 bg-[#919EAB]/10" />
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-[#1A1A1A]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter Email Address"
                        {...field}
                        className={`w-full rounded-xl border px-4 py-3.5 text-sm transition focus:ring-1 focus:ring-[#007B55] ${
                          form.formState.errors.email
                            ? 'border-[#FF5630]'
                            : 'border-[#919EAB]/30'
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-[13px] font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-[#1A1A1A]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isLoading}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter Password"
                          {...field}
                          className={`w-full rounded-xl border px-4 py-3.5 text-sm transition focus:ring-1 focus:ring-[#007B55] ${
                            form.formState.errors.password
                              ? 'border-[#FF5630]'
                              : 'border-[#919EAB]/30'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                          className="absolute inset-y-0 right-3 flex items-center"
                        >
                          {showPassword ? (
                            <Eye className="h-5 w-5 text-gray-400" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[13px] font-medium" />
                  </FormItem>
                )}
              />

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) =>
                      form.setValue('rememberMe', checked)
                    }
                  />
                  <label
                    htmlFor="rememberMe"
                    className="cursor-pointer text-sm font-medium text-[#454F5B]"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#007B55] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#005B54] py-3.5 font-bold text-white transition-all hover:bg-[#004B44]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>

          {/* Magic link */}
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full rounded-xl border-[#919EAB]/30 py-3.5 font-semibold text-[#454F5B]"
            onClick={() => toast.info('Magic link requested')}
          >
            Sign in with magic link
          </Button>

          {/* Sign up */}
          <p className="mt-8 text-center text-sm font-normal text-gray-500">
            Don&apos;t Have An Account?{' '}
            <Link
              href="/register"
              className="ml-1 font-bold text-[#007B55] hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {/* ToS */}
          <p className="mt-10 text-center text-xs leading-relaxed text-gray-400">
            <ShieldCheck className="mr-1 hidden h-4 w-4 align-middle text-gray-400 sm:inline-block" />
            By logging in, you agree to the{' '}
            <a href="#" className="font-bold text-[#007B55] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-bold text-[#007B55] hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
