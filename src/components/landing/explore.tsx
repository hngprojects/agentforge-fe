'use client'

import { useState } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

type Category =
  | 'All'
  | 'Marketing'
  | 'Development'
  | 'Research'
  | 'Finance'
  | 'Operation'

interface Tag {
  label: string
  color: string
  bgColor: string
}

interface AgentCard {
  title: string
  description: string
  tags: Tag[]
  downloads: string
  category: Category[]
}

const agents: AgentCard[] = [
  {
    title: 'DevOps Sentinel',
    description:
      'Autonomous infrastructural monitoring and incident response agents for modern cloud-native systems',
    tags: [
      { label: 'KUBERNETES', color: '#2563EB', bgColor: '#DBEAFE' },
      { label: 'LOGS', color: '#EA580C', bgColor: '#FFEDD5' },
      { label: 'PHYTONS', color: '#EA580C', bgColor: '#DCFCE7' },
    ],
    downloads: '2,543',
    category: ['All', 'Development'],
  },
  {
    title: 'web Scryer',
    description:
      'Deep-web research agent specialized in academic paper synthesis and data discovery',
    tags: [
      { label: 'KUBERNETES', color: '#0D9488', bgColor: '#DCFCE7' },
      { label: 'LOGS', color: '#0891B2', bgColor: '#CFFAFE' },
      { label: 'PHYTONS', color: '#DC2626', bgColor: '#FEE2E2' },
    ],
    downloads: '2,543',
    category: ['All', 'Research'],
  },
  {
    title: 'Market Plus',
    description:
      'Real-time Sentiment analysis engine. Scanning crypto exchanges and social media',
    tags: [
      { label: 'TRADING', color: '#DB2777', bgColor: '#FCE7F3' },
      { label: 'WEB_SOCKETS', color: '#9333EA', bgColor: '#F3E8FF' },
      { label: 'FINANCE', color: '#005F5A', bgColor: '#E6EFEF' },
    ],
    downloads: '2,543',
    category: ['All', 'Finance'],
  },
  {
    title: 'Biotech Research Assistant',
    description:
      'Literature synthesis, protocol design and data interpretation for life science',
    tags: [
      { label: 'LITERATURE REVIEW', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'INFORMATIC', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'DATA', color: '#005F5A', bgColor: '#E6EFEF' },
    ],
    downloads: '2,543',
    category: ['All', 'Research'],
  },
  {
    title: 'Code Review Specialist',
    description:
      'In-depth code review with security, performance and readability focus',
    tags: [
      { label: 'CODE REVIEW', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'PERFORMANCE', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'FINANCE', color: '#005F5A', bgColor: '#E6EFEF' },
    ],
    downloads: '2,543',
    category: ['All', 'Development'],
  },
  {
    title: 'Spotify Summer Campaign Agent',
    description:
      "Drives Spotify's summer collection marketing with creative precision",
    tags: [
      { label: 'AUDIENCE TARGET', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'SOCIAL-M CONTENT', color: '#005F5A', bgColor: '#E6EFEF' },
    ],
    downloads: '2,543',
    category: ['All', 'Marketing'],
  },
  {
    title: 'Biotech Research Assistant',
    description:
      'Literature synthesis, protocol design and data interpretation for life science',
    tags: [
      { label: 'LITERATURE REVIEW', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'INFORMATIC', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'DATA', color: '#005F5A', bgColor: '#E6EFEF' },
    ],
    downloads: '2,543',
    category: ['All', 'Research'],
  },
  {
    title: 'Code Review Specialist',
    description:
      'In-depth code review with security, performance and readability focus',
    tags: [
      { label: 'CODE REVIEW', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'PERFORMANCE', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'FINANCE', color: '#005F5A', bgColor: '#E6EFEF' },
    ],
    downloads: '2,543',
    category: ['All', 'Development'],
  },
  {
    title: 'Spotify Summer Campaign Agent',
    description:
      "Drives Spotify's summer collection marketing with creative precision",
    tags: [
      { label: 'AUDIENCE TARGET', color: '#005F5A', bgColor: '#E6EFEF' },
      { label: 'SOCIAL-M CONTENT', color: '#005F5A', bgColor: '#E6EFEF' },
    ],
    downloads: '2,543',
    category: ['All', 'Marketing'],
  },
]

const categories: Category[] = [
  'All',
  'Marketing',
  'Development',
  'Research',
  'Finance',
  'Operation',
]

function GitHubIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.272 9.521 21.007C9.521 20.772 9.513 20.14 9.508 19.296C6.726 19.91 6.139 17.966 6.139 17.966C5.685 16.812 5.029 16.504 5.029 16.504C4.121 15.882 5.098 15.895 5.098 15.895C6.101 15.965 6.629 16.926 6.629 16.926C7.521 18.455 8.97 18.014 9.539 17.758C9.631 17.11 9.889 16.67 10.175 16.42C7.955 16.167 5.62 15.3 5.62 11.476C5.62 10.386 6.01 9.494 6.649 8.794C6.546 8.541 6.203 7.524 6.747 6.148C6.747 6.148 7.587 5.878 9.497 7.166C10.31 6.943 11.164 6.832 12.014 6.828C12.864 6.832 13.718 6.943 14.533 7.166C16.44 5.878 17.278 6.148 17.278 6.148C17.824 7.524 17.481 8.541 17.378 8.794C18.02 9.494 18.406 10.386 18.406 11.476C18.406 15.312 16.067 16.163 13.84 16.41C14.196 16.718 14.512 17.326 14.512 18.253C14.512 19.579 14.5 20.649 14.5 21.007C14.5 21.275 14.678 21.587 15.186 21.487C19.157 20.162 22.018 16.416 22.018 12C22.018 6.477 17.523 2 12 2Z"
        fill="#1A1A1A"
      />
    </svg>
  )
}

export function Explore() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filteredAgents =
    activeCategory === 'All'
      ? agents
      : agents.filter((a) => a.category.includes(activeCategory))

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section
        className="flex flex-col items-center px-6 pt-16 pb-12 md:pt-24 md:pb-16"
        style={{ background: '#FFFFFF' }}
      >
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(32px, 5vw, 60px)',
            lineHeight: '1.2',
            letterSpacing: '0%',
            textAlign: 'center',
            color: '#0C0E0D',
            maxWidth: '900px',
          }}
        >
          Explore Reusable AI Agent
          <br />
          Setup Packages
        </h1>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0%',
            textAlign: 'center',
            color: '#52525B',
            maxWidth: '520px',
            marginTop: '20px',
          }}
        >
          Browse public Anvila packages for marketing, development, research,
          finance, and operations. Clone a setup, adapt the files, or use it as
          a starting point for your own agent package.
        </p>
      </section>

      <section
        className="mx-auto w-full px-6 pb-20 md:px-10 xl:px-20"
        style={{ maxWidth: '1280px' }}
      >
        <div
          className="mb-10 flex flex-wrap gap-2 border-b"
          style={{ borderColor: '#E4E4E7' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative cursor-pointer px-4 pb-3 transition-colors"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: activeCategory === cat ? 500 : 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: activeCategory === cat ? '#0C0E0D' : '#71717A',
                background: 'none',
                border: 'none',
              }}
            >
              {cat}
              {activeCategory === cat && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full"
                  style={{ background: '#0C0E0D' }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent, idx) => (
            <div
              key={`${agent.title}-${idx}`}
              className="flex flex-col justify-between rounded-xl border p-6"
              style={{
                borderColor: '#E4E4E7',
                background: '#FFFFFF',
                height: '280px',
              }}
            >
              <div className="flex flex-col gap-3">
                <GitHubIcon />
                <h3
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#0C0E0D',
                  }}
                >
                  {agent.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#52525B',
                  }}
                >
                  {agent.description}
                </p>
              </div>

              <div className="hide_scrollbar mt-4 flex flex-nowrap gap-2 overflow-x-auto">
                {agent.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="shrink-0 truncate px-3 py-1"
                    style={{
                      borderRadius: '8px',
                      background: tag.bgColor,
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      fontSize: '10px',
                      lineHeight: '16px',
                      letterSpacing: '0.5px',
                      color: tag.color,
                      textTransform: 'uppercase',
                      maxWidth: '120px',
                    }}
                    title={tag.label}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="bg-grey mt-3 border"></div>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      fontSize: '16px',
                      color: '#0C0E0D',
                    }}
                  >
                    {agent.downloads}
                  </span>
                  <br />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#71717A',
                      marginLeft: '4px',
                    }}
                  >
                    Downloads
                  </span>
                </div>
                <button
                  className="cursor-pointer px-5 py-2 transition-opacity hover:opacity-90"
                  style={{
                    borderRadius: '6px',
                    background: '#005F5A',
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    border: 'none',
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center px-6 py-16 md:py-20">
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(24px, 4vw, 36px)',
            lineHeight: '44px',
            textAlign: 'center',
            color: '#0C0E0D',
          }}
        >
          Can&apos;t find the setup you need?
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22px',
            textAlign: 'center',
            color: '#52525B',
            maxWidth: '420px',
            marginTop: '12px',
          }}
        >
          Describe the agent setup you want, and Anvila will help you turn it
          into a reusable package with files, Skills, and GitHub-ready
          structure.
        </p>
        <button
          className="mt-8 cursor-pointer px-8 py-3 transition-opacity hover:opacity-90"
          style={{
            borderRadius: '8px',
            background: '#0C5D56',
            color: '#FFFFFF',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            border: 'none',
          }}
        >
          Create your own package
        </button>
      </section>

      <Footer />
    </main>
  )
}
