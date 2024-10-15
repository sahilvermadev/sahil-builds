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
        <div className="flex space-x-4 text-[#8b4c45] text-m">
          <Link href="/" className="hover:text-[#d47d6f] transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-[#d47d6f] transition-colors duration-300">
            About
          </Link>
          <Link href="/archive" className="hover:text-[#d47d6f] transition-colors duration-300">
            Archive
          </Link>
          <Link href="/bookshelf" className="hover:text-[#d47d6f] transition-colors duration-300">
            Bookshelf
          </Link>
          <Link href="/projects" className="hover:text-[#d47d6f] transition-colors duration-300">
            Projects
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header