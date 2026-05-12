import Link from 'next/link'

export const AuthNavBar = () => {
  return (
    <header className="w-full shrink-0 bg-white px-8 py-3">
      <Link
        href="/"
        className="flex items-center gap-2 outline-none focus:outline-none"
      >
        <div
          style={{
            borderRadius: '24px',
            background: '#005F5A',
            display: 'flex',
            padding: '10px',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="14"
            viewBox="0 0 6 14"
            fill="none"
          >
            <path
              d="M0.640053 2.5C0.640053 3.36825 0.418743 4.18482 0.0294569 4.89636C0.187604 4.92583 0.350936 4.94126 0.518004 4.94126C1.93242 4.94126 3.07903 3.83512 3.07903 2.47063C3.07903 1.10614 1.93242 0 0.518004 0C0.340542 0 0.167294 0.0174122 0 0.050563C0.40756 0.774457 0.640053 1.61008 0.640053 2.5Z"
              fill="#F6F7F7"
            />
            <path
              d="M2.19272 13.986C4.12275 13.8538 5.64005 12.8044 5.64005 11.5294C5.64005 10.2662 4.14896 9.22447 2.24427 9.07673C2.78348 9.74399 3.14005 10.5558 3.14005 11.5C3.14005 12.474 2.76063 13.3071 2.19272 13.986Z"
              fill="#F6F7F7"
            />
          </svg>
        </div>
        <span className="text-xl leading-none font-bold">
          <span className="text-[#0C0E0D]">AGENT</span>
          <span className="text-[#005F5A]">FORGE</span>
        </span>
      </Link>
    </header>
  )
}
