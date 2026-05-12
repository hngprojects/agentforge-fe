'use server'

import { Calls } from '@/actions/axios'
import { AxiosError } from 'axios'

interface ResetPasswordPayload {
  token: string
  new_password: string
}

interface ResetPasswordResponse {
  message: string
}

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
  try {
    const api = Calls(process.env.NEXT_PUBLIC_API_URL)

    const { data } = await api.post<ResetPasswordResponse>(
      '/api/v1/auth/reset-password',
      payload
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message)
    }
    throw new Error('Failed to reset password. Your link may have expired.')
  }
}
