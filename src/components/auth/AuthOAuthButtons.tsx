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
        <div className="flex-1 bg-gray-200" />
        <span className="content-center text-[14px] font-bold text-[#000000]">
          OR
        </span>
        <div className="flex-1 bg-gray-200" />
      </div>

      {/* Buttons */}
      <div className="grid h-[48px] grid-cols-2 gap-6">
        {providers.map(({ provider, Icon }) => (
          <button
            key={provider}
            type="button"
            onClick={() => {
              window.location.href = `/api/auth/${provider}`
            }}
            className="flex items-center justify-center rounded-md border border-gray-200 py-2.5 transition-all"
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  )
}
