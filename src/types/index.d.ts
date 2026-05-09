import { ApiError } from 'next/dist/server/api-utils'

export type APIResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError }
