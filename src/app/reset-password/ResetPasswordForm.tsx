'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock } from 'lucide-react'

import { resetPasswordSchema, type ResetPasswordData } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
  InputGroupButton,
} from '@/components/ui/input-group'
import { useState } from 'react'
import { toast } from 'sonner'
import { resetPassword } from '~/actions/reset-password'
import { useMutation } from '@tanstack/react-query'

interface ResetPasswordFormProps {
  token: string
  setIsSuccess: (value: boolean) => void
}

export function ResetPasswordForm({
  token,
  setIsSuccess,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState<'password' | 'text'>(
    'password'
  )
  const [showConfirmPassword, setShowConfirmPassword] = useState<
    'password' | 'text'
  >('password')

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordData) =>
      resetPassword({
        token: token!,
        new_password: data.password,
      }),
    onSuccess: () => {
      setIsSuccess(true)
    },
    onError: () => {
      toast.error('Failed to reset password. Your link may have expired.')
    },
  })

  function onSubmit(data: ResetPasswordData) {
    mutation.mutate(data)
  }

  function handleShowPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    setShowPassword((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  function handleShowConfirmPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    setShowConfirmPassword((prev) =>
      prev === 'password' ? 'text' : 'password'
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputGroup className="mt-1.5 h-12">
                  <InputGroupInput
                    type={showPassword}
                    placeholder="Enter new password"
                    {...field}
                  />
                  <InputGroupAddon>
                    <InputGroupText>
                      <Lock className="size-4 text-foreground" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      className="hover:bg-transparent"
                      size="icon-xs"
                      aria-label="show password"
                      title="show password"
                      onClick={handleShowPassword}
                    >
                      {showPassword === 'password' ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-8">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <InputGroup className="mt-1.5 h-12">
                  <InputGroupInput
                    type={showConfirmPassword}
                    placeholder="Confirm new password"
                    {...field}
                  />
                  <InputGroupAddon>
                    <Lock className="size-4 text-foreground" />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      className="hover:bg-transparent"
                      size="icon-xs"
                      aria-label="show password"
                      title="show password"
                      onClick={handleShowConfirmPassword}
                    >
                      {showConfirmPassword === 'password' ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-12 h-auto w-full py-3">
          Continue
        </Button>
      </form>
    </Form>
  )
}
