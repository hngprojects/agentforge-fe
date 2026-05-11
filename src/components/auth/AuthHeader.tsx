import Image from 'next/image'

export default function AuthHeader() {
  return (
    <header className="mx-auto flex h-16 max-w-[1360px] items-center md:h-20">
      <div className="flex items-center gap-1.5">
        <Image
          src="/images/agentforge_logo.svg"
          alt="Agentforge logo"
          className="h-7 w-7 md:h-9 md:w-9 lg:h-full lg:w-full"
          loading="eager"
          width={40}
          height={40}
        />
        <p className="text-lg font-bold md:text-2xl">
          AGENT<span className="text-primary">FORGE</span>
        </p>
      </div>
    </header>
  )
}
