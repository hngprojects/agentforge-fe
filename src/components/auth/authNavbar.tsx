'use client'

import Image from 'next/image'

export function AuthNavbar() {
  return (
    <header className="shrink-0 bg-white px-6 py-3">
      <Image src="/images/Logo.png" alt="AgentForge" width={130} height={32} />
    </header>
  )
}
