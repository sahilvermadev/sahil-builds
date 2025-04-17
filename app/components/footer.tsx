import Link from 'next/link'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full p-4 text-m border-[#d47d6f] mt-auto">
      <div className="container mx-auto flex flex-wrap justify-center items-center">
        <p>© {currentYear} vrsa</p>
        {/* <Link href="https://mastodon.social/@yourusername" className="ml-2 hover:text-[#d47d6f] transition-colors duration-300">
          Mastodon
        </Link> */}
        <span className="mx-2">•</span>
        <Link href="https://x.com/0xvrsa" className="hover:text-[#d47d6f] transition-colors duration-300">
          Twitter
        </Link>
        <span className="mx-2">•</span>
        <Link href="https://github.com/sahilvermadev" className="hover:text-[#d47d6f] transition-colors duration-300">
          GitHub
        </Link>
      </div>
    </footer>
  )
}

export default Footer