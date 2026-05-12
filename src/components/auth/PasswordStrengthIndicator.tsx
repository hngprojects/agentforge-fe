import { getPasswordValidation, getPasswordStrength } from '@/utils/auth'
import { CheckCircle, Clock } from 'lucide-react'

const segmentColours: Record<string, string[]> = {
  weak: ['bg-red-500', 'bg-gray-200', 'bg-gray-200', 'bg-gray-200'],
  fair: ['bg-orange-400', 'bg-orange-400', 'bg-gray-200', 'bg-gray-200'],
  medium: ['bg-yellow-400', 'bg-yellow-400', 'bg-yellow-400', 'bg-gray-200'],
  strong: ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500'],
}

const strengthLabels: Record<string, string> = {
  weak: 'Weak',
  fair: 'Fair',
  medium: 'Medium',
  strong: 'Strong',
}

interface Props {
  password: string
}

export default function PasswordStrengthIndicator({ password }: Props) {
  if (!password) return null

  const validation = getPasswordValidation(password)
  const strength = getPasswordStrength(validation)
  const segments = segmentColours[strength]

  const rules = [
    { label: 'Atleast 1 uppercase', met: validation.hasUppercase },
    { label: 'Atleast 1 number', met: validation.hasNumber },
    { label: 'Atleast 8 characters', met: validation.hasMinLength },
  ]

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1">
          {segments.map((colour, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${colour}`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {strengthLabels[strength]}
        </span>
      </div>

      {/* Rules checklist */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          {strength === 'strong'
            ? 'Strong password'
            : 'Weak password. Must contain:'}
        </p>
        {rules.map((rule) => (
          <div key={rule.label} className="flex items-center gap-1.5">
            {rule.met ? (
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span
              className={`text-xs ${rule.met ? 'text-green-500' : 'text-muted-foreground'}`}
            >
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
