// src/constants/authProviders.ts
export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
  GITHUB: 'github',
} as const

export type AuthProviders = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS]
