// app/page.tsx

import Link from 'next/link';
import { getAllPosts, BlogPost } from '@/lib/posts'; // Adjust the import path as necessary
import path from 'path';
import { Bungee_Shade } from '@next/font/google';

const bungeeShade = Bungee_Shade({ weight: "400", subsets: ["latin"] });

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts: BlogPost[] = posts.slice(0, 5);


  const postsDirectory = path.join(process.cwd(), 'content');

  if (posts.length === 0) {
    return (
      <div className="min-h-screen text-[#8b4c45] relative">

        <div className="container mx-auto px-4 py-8 relative z-10">

          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-normal">Latest Posts</h2>
              <Link href="/archive" className="px-4 py-2 bg-[#d47d6f] text-white rounded hover:bg-[#c26a5c] transition-colors duration-300">
                Read archive
              </Link>
            </div>

            <div className="space-y-4">
              <p className="text-gray-500">No blog posts available.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#011627] relative">

      <div className="container mx-auto px-4 py-8 relative z-10">
      <h1 className={`${bungeeShade.className} text-3xl sm:text-6xl font-bold text-center my-12 relative`}>
          <span className="absolute inset-0 text-[#011627] z-10">new stuff</span>
          <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #011627' }}>new stuff</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-2xl font-bold text-[#011627]`}>Latest Posts</h2>
            <Link href="/archive" className="px-2 py-1 bg-[#011627] text-white font-bold rounded hover:bg-[#b6244f] hover:text-white transition-colors duration-300">
              Read archive
            </Link>
          </div>

          <div className="space-y-4">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/archive/${post.slug}`}
                className="block post-border border-[#d47d6f] p-4 rounded hover:bg-[#d6f5ff] transition-colors duration-300 bg-[#ffffff]"
              >
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <p className="text-sm text-[#000000]">{post.date}</p>
                {post.description && <p className="mt-2 text-gray-700">{post.description}</p>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}