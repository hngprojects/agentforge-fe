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
    <section className="relative w-full bg-white">
      <div
        className="mx-auto flex w-full flex-col items-center gap-12 px-6 py-12 md:px-20 md:py-24 lg:flex-row lg:justify-between lg:gap-20"
        style={{ maxWidth: '1200px' }}
      >
        {/* LEFT: pill + headline + subtext + CTA */}
        <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          {/* "WHY AGENTFORGE" pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-400/50 px-3 py-1.5">
            <span
              className="h-2 w-2 rounded-full bg-orange-600"
              aria-hidden="true"
            />
            <span className="font-inter text-xs font-medium text-zinc-600">
              WHY AGENTFORGE
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-inter mb-6 max-w-[320px] text-[28px] leading-tight font-bold text-[#0C0E0D] sm:max-w-none sm:text-4xl md:text-5xl lg:text-5xl lg:leading-[1.1]">
            Setting up AI agents
            <br className="hidden lg:block" /> is still messy.
          </h2>

          {/* Subtext */}
          <p className="font-inter mb-8 max-w-[320px] text-[14px] leading-relaxed text-zinc-600 sm:max-w-none sm:text-base lg:max-w-[460px] lg:text-lg">
            Developers and builders still rewrite the same agent setup, struggle
            with scattered prompts, and lack a clear structure for files that
            others can reuse.
          </p>

          {/* Desktop CTA button */}
          <div className="hidden lg:block">
            <AuthDialog
              trigger={
                <Button className="font-inter h-14 w-[240px] rounded-xl bg-[#0C5D56] text-lg font-medium text-white hover:bg-[#0a4a3f]">
                  Try for Free
                </Button>
              }
            />
          </div>
        </div>

        {/* RIGHT: 2x2 grid of cards */}
        <div className="w-full lg:w-1/2">
          <div className="grid w-full grid-cols-2 overflow-hidden rounded-2xl border border-zinc-200">
            {CARDS.map((card, idx) => {
              const isHighlighted = card.highlighted
              const isLeftCol = idx % 2 === 0
              const isTopRow = idx < 2
              return (
                <div
                  key={card.title}
                  className="flex flex-col items-center justify-center p-6 text-center sm:p-8"
                  style={{
                    minHeight: '180px',
                    background: isHighlighted
                      ? 'rgba(16, 191, 171, 0.05)'
                      : '#FFFFFF',
                    borderBottom: isTopRow ? '1px solid #E5E7EB' : 'none',
                    borderRight: isLeftCol ? '1px solid #E5E7EB' : 'none',
                  }}
                >
                  <h3 className="font-inter mb-2 text-[15px] font-semibold text-zinc-900 sm:text-lg lg:text-xl">
                    {card.title}
                  </h3>
                  <p className="font-inter text-xs leading-relaxed text-zinc-500 sm:text-sm lg:text-sm">
                    {card.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile CTA button */}
        <div className="mt-2 w-full lg:hidden">
          <AuthDialog
            trigger={
              <Button className="font-inter h-14 w-full rounded-xl bg-[#0C5D56] text-base font-semibold text-white hover:bg-[#0a4a3f]">
                Try for Free
              </Button>
            }
          />
        </div>
      </div>
    </section>
  )
}
