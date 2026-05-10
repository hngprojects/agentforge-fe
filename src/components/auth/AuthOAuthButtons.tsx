'use client'

import { GoogleIcon, GitHubIcon } from '@/components/icons'

const providers = [
  { provider: 'google', Icon: GoogleIcon },
  { provider: 'github', Icon: GitHubIcon },
] as const

export const AuthOAuthButtons = () => {
  return (
    <div className="space-y-3">
      {/* OR divider */}
      <div className="flex items-center gap-3">
<<<<<<< HEAD
        <div className="flex-1 bg-gray-200" />
        <span className="text-xs font-bold text-black">OR</span>
        <div className="flex-1 bg-gray-200" />
=======
        <div className="h-px flex-1 bg-gray-200" />
        <span className="content-center text-xs font-bold text-black">OR</span>
        <div className="h-px flex-1 bg-gray-200" />
>>>>>>> b582f36 (refactor(auth): componentize auth pages and update styling)
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {providers.map(({ provider, Icon }) => (
          <button
            key={provider}
            type="button"
            onClick={() => {
              window.location.href = `/api/auth/${provider}`
            }}
            className="flex items-center justify-center rounded-md border border-gray-200 py-2.5 transition-all hover:border-teal-500 hover:shadow-[0_0_0_3px_rgba(20,184,166,0.1)]"
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  )
}
