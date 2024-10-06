import Link from 'next/link'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full p-4 text-[#8b4c45] text-m bg-white border-t border-[#d47d6f] mt-auto">
      <div className="container mx-auto flex flex-wrap justify-start items-center">
        <p>© {currentYear} SahilBuilds •</p>
        <Link href="https://mastodon.social/@yourusername" className="ml-2 hover:text-[#d47d6f] transition-colors duration-300">
          Mastodon
        </Link>
        <span className="mx-1">•</span>
        <Link href="https://twitter.com/yourusername" className="hover:text-[#d47d6f] transition-colors duration-300">
          Twitter
        </Link>
        <span className="mx-1">•</span>
        <Link href="https://github.com/yourusername" className="hover:text-[#d47d6f] transition-colors duration-300">
          GitHub
        </Link>
      </div>
    </footer>
  )
}

export default Footer