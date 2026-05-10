import { Calls } from '@/actions/axios'

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
  const api = Calls(process.env.PYTHON_BASEURL)
  const { data } = await api.post<ResetPasswordResponse>(
    '/api/v1/auth/reset-password',
    payload
  )
  return data
}
