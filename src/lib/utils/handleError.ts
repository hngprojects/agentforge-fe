// src/lib/utils/handleError.ts
import { AxiosError } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { ZodError } from 'zod'

type FastApiError = {
  detail:
    | string
    | {
        loc: string[]
        msg: string
        type: string
        input?: string
        ctx?: Record<string, unknown>
      }[]
}

// ─── FastAPI Validation Error ─────────────────────────────────────────────────
const handleFastApiError = (data: FastApiError, status: number): ApiError => {
  const detail = data?.detail

  if (Array.isArray(detail)) {
    return new ApiError(status, detail[0]?.msg ?? 'Validation failed')
  }

  if (typeof detail === 'string') {
    return new ApiError(status, detail)
  }

  return new ApiError(status, 'Something went wrong')
}

// ─── Main Error Handler ───────────────────────────────────────────────────────
export const handleError = (error: unknown): ApiError => {
  if (error instanceof ZodError) {
    return new ApiError(422, error.issues[0]?.message ?? 'Validation failed')
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 500
    const data = error.response?.data
    return handleFastApiError(data, status)
  }

  if (error instanceof ApiError) {
    return error
  }

  return new ApiError(500, 'An unexpected error occurred')
}
