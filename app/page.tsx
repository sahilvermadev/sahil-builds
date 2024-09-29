import Link from 'next/link'

interface BlogPost {
  title: string;
  date: string;
  slug: string;
}

const latestPosts: BlogPost[] = [
  { title: "Hibiclens", date: "September 14, 2024", slug: "hibiclens" },
  { title: "Good Forms", date: "September 13, 2024", slug: "good-forms" },
  { title: "Finding questions and answers about why I like books", date: "September 12, 2024", slug: "why-i-like-books" },
  { title: "The Dev Tools Performance Monitor Panel", date: "September 03, 2024", slug: "dev-tools-performance" },
  { title: "Vibe Check №34", date: "August 24, 2024", slug: "vibe-check-34" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen text-[#8b4c45] relative">
      {/* Background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#ffb3a7] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-8xl sm:text-9xl font-bold text-center my-12 relative">
          <span className="absolute inset-0 text-[#ffeae5] z-10">MY YAP</span>
          <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #8b4c45' }}>MY YAP</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Latest Posts</h2>
            <Link href="/archive" className="px-4 py-2 bg-[#d47d6f] text-white rounded hover:bg-[#c26a5c] transition-colors duration-300">
              Read archive
            </Link>
          </div>

          <div className="space-y-4">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/archive/${post.slug}`} className="block border border-[#d47d6f] p-4 rounded hover:bg-[#ffd6cc] transition-colors duration-300">
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <p className="text-sm text-[#a25a4e]">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
