import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#ffb3a7] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.2 + 0.1,
            }}
          />
        ))}
      </div>
      <nav className="container mx-auto flex items-center justify-start relative z-10">
        <div className="flex space-x-4 text-[#8b4c45] text-sm">
          <Link href="/" className="hover:text-[#d47d6f] transition-colors duration-300">
            Home
          </Link>
          <Link href="/projects" className="hover:text-[#d47d6f] transition-colors duration-300">
            About
          </Link>
          <Link href="/projects" className="hover:text-[#d47d6f] transition-colors duration-300">
            Archive
          </Link>
          <Link href="/bookshelf" className="hover:text-[#d47d6f] transition-colors duration-300">
            Bookshelf
          </Link>
          <Link href="/projects" className="hover:text-[#d47d6f] transition-colors duration-300">
            Projects
          </Link>
          {/* <Link href="/rss" className="hover:text-[#d47d6f] transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z" />
              <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link> */}
        </div>
      </nav>
    </header>
  )
}

export default Header