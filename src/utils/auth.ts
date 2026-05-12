export type PasswordStrength = 'weak' | 'fair' | 'medium' | 'strong'

export interface PasswordValidation {
  hasUppercase: boolean
  hasNumber: boolean
  hasMinLength: boolean
}

export const getPasswordValidation = (
  password: string
): PasswordValidation => ({
  hasUppercase: /[A-Z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasMinLength: password.length >= 8,
})

export const getPasswordStrength = (
  validation: PasswordValidation
): PasswordStrength => {
  const passed = Object.values(validation).filter(Boolean).length
  if (passed === 0) return 'weak'
  if (passed === 1) return 'weak'
  if (passed === 2) return 'fair'
  return 'strong'
}
