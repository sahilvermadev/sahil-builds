import Link from 'next/link';
import { getAllPosts, BlogPost } from '@/lib/getPosts';
import { Bungee_Shade } from '@next/font/google';

const bungeeShade = Bungee_Shade({ weight: "400", subsets: ["latin"] });

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts: BlogPost[] = posts.slice(0, 5);
  const hasPosts = posts.length > 0;

  return (
    <div className="min-h-screen relative text-[#011627]'">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {hasPosts && (
          <h1 className={`${bungeeShade.className} text-3xl sm:text-6xl font-bold text-center my-12 relative`}>
            <span className="absolute inset-0 text-[#011627] z-10">new stuff</span>
            <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #011627' }}>
              new stuff
            </span>
          </h1>
        )}

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#011627]"></h2>
            <Link href="/archive" className="px-2 py-1 bg-[#011627] text-white font-bold rounded hover:bg-[#b6244f] hover:text-white transition-colors duration-300">
              Read archive
            </Link>
          </div>

          <div className="space-y-4">
            {hasPosts ? (
              latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/archive/${post.slug}`}
                  className="block post-border border-[#d47d6f] p-4 rounded hover:bg-[#d6f5ff] transition-colors duration-300"
                >
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-[#000000]">{post.date}</p>
                  {post.description && <p className="mt-2 text-gray-700">{post.description}</p>}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No blog posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
