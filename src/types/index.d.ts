import { ApiError } from 'next/dist/server/api-utils'

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
export type APIResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError }
