'use client'

import { Button } from '~/components/ui/button'
import { AuthDialog } from './auth-dialog'

type Card = {
  title: string
  description: string
  highlighted?: boolean
}

const CARDS: Card[] = [
  {
    title: 'GitHub-ready packages',
    description:
      'Create a clean repository structure without manually setting up every folder, file and README',
    highlighted: true,
  },
  {
    title: 'Less Setup Time',
    description:
      'Reuse proven setup packages or clone and adapt other setup files.',
  },
  {
    title: 'Easy to Ship',
    description:
      'Publish clean and organized package files. No manual work required.',
  },
  {
    title: 'Cleaner Agent behaviour',
    description:
      "Keep the agent's role, tone, rules, limits, workflow and Skils in one structured package.",
  },
]

export function WhyAgentForge() {
  return (
    <section
      className="relative w-full"
      style={{ background: '#FFFFFF' }}
    >
      <div
        className="mx-auto flex w-full flex-wrap items-center justify-between"
        style={{
          maxWidth: '1440px',
          padding: '80px',
          rowGap: '15px',
        }}
      >
        {/* LEFT: pill + headline + subtext + CTA */}
        <div
          className="flex flex-col"
          style={{ gap: '24px', maxWidth: '520px' }}
        >
          {/* "WHY AGENTFORGE" pill */}
          <div
            className="inline-flex items-center"
            style={{
              padding: '6px 12px',
              gap: '8px',
              borderRadius: '9999px',
              border: '0.5px solid #A1A1AA',
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '9999px',
                background: '#EA580C',
                display: 'inline-block',
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '20px',
                color: '#52525B',
              }}
            >
              WHY AGENTFORGE
            </span>
          </div>

          {/* Headline - 48px weight 500 line-height 48px letter-spacing -1.2px */}
          <h2
            style={{
              fontFamily: 'Inter',
              fontSize: '48px',
              fontWeight: 500,
              lineHeight: '48px',
              letterSpacing: '-1.2px',
              color: '#0C0E0D',
              margin: 0,
            }}
          >
            Setting up AI agents
            <br />
            is still messy.
          </h2>

          {/* Subtext - 17.9px weight 400 line-height 28px color #52525B */}
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: '17.9px',
              fontWeight: 400,
              lineHeight: '28px',
              color: '#52525B',
              margin: 0,
            }}
          >
            Developers and builders still rewrite the same agent setup,
            struggle with scattered prompts, and lack a clear structure for
            files that others can reuse.
          </p>

          {/* Try for Free button - 287px width, padding 16px, radius 8px, bg #0C5D56 */}
          <AuthDialog
            trigger={
              <Button
                className="font-medium text-white hover:opacity-90"
                style={{
                  display: 'flex',
                  width: '287px',
                  padding: '16px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '8px',
                  background: '#0C5D56',
                  fontFamily: 'Inter',
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '24px',
                  height: 'auto',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Try for Free
              </Button>
            }
          />
        </div>

        {/* RIGHT: 2x2 grid of cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{
            maxWidth: '600px',
            width: '100%',
          }}
        >
          {CARDS.map((card, idx) => {
            const isHighlighted = card.highlighted
            // borders to create grid divider lines (matches figma)
            const isLeftCol = idx % 2 === 0
            const isTopRow = idx < 2
            return (
              <div
                key={card.title}
                className="flex flex-col items-center justify-center text-center"
                style={{
                  height: '304.396px',
                  padding: '0 30px',
                  gap: '4px',
                  background: isHighlighted
                    ? 'rgba(16, 191, 171, 0.10)'
                    : '#FFFFFF',
                  borderBottom: isTopRow ? '1px solid #F0F0F0' : 'none',
                  borderRight: isLeftCol ? '1px solid #F0F0F0' : 'none',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '38px',
                    color: '#1C1F25',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: '#52525B',
                    margin: 0,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}