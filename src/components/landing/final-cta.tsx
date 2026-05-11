'use client'

import { Button } from '~/components/ui/button'
import { AuthDialog } from './auth-dialog'

export function FinalCTA() {
  return (
    <section className="w-full bg-white px-6 py-20 md:px-20 md:py-32">
      <div
        className="mx-auto flex w-full flex-col items-center text-center"
        style={{ maxWidth: '900px', gap: '32px' }}
      >
        <h2
          className="text-4xl font-bold sm:text-4xl md:text-6xl"
          style={{
            fontFamily: 'Inter',
            lineHeight: '1.1',
            color: '#0C0E0D',
            letterSpacing: '-1.5px',
          }}
        >
          Your agent setup, built once and reused forever.
        </h2>

        <p
          style={{
            fontFamily: 'Inter',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '1.6',
            color: '#52525B',
            maxWidth: '600px',
          }}
        >
          Use AgentForge to create, package, and share AI agent setups. No
          technical mess. Just results.
        </p>

        <AuthDialog
          trigger={
            <Button
              className="bg-[#0C5D56] text-white transition-all hover:bg-[#0a4a3f]"
              style={{
                width: '272px',
                height: '56px',
                gap: '10px',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '18px',
                border: 'none',
              }}
            >
              Start building
            </Button>
          }
        />
      </div>
    </section>
  )
}
