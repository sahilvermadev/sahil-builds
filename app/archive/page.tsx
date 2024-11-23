// app/pages/archive.tsx (Adjust the path based on your project structure)

import Link from 'next/link';
import { getAllPosts, BlogPost } from '@/lib/getPosts';
import { Bungee_Shade } from '@next/font/google';
import clsx from 'clsx';

const bungeeShade = Bungee_Shade({ weight: '400', subsets: ['latin'] });

interface PostsByYear {
  [year: string]: BlogPost[];
}

export default function ArchivePage() {
  const posts = getAllPosts();
  const hasPosts = posts.length > 0;

  // Group posts by year
  const postsByYear: PostsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as PostsByYear);

  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  // Dynamic classes based on whether there are posts
  const containerClasses = clsx(
    'min-h-screen relative',
    hasPosts ? 'text-[#011627]' : 'text-[#8b4c45]'
  );

  return (
    <div className={containerClasses}>
      <div className="container mx-auto px-4 py-8 relative z-10">
        {hasPosts ? (
          <h1
            className={`${bungeeShade.className} text-3xl sm:text-6xl font-bold text-center my-12 relative`}
          >
            <span className="absolute inset-0 text-[#011627] z-10">archive</span>
            <span
              className="relative z-0 text-transparent"
              style={{ WebkitTextStroke: '2px #011627' }}
            >
              archive
            </span>
          </h1>
        ) : (
          <h1 className="text-5xl font-bold mb-8 text-center">The Archives</h1>
        )}

        <div className="max-w-2xl mx-auto">
          {hasPosts ? (
            years.map((year) => (
              <div key={year} className="mb-12">
                <h2 className="text-3xl font-bold mb-4 pb-2 border-b border-[#011627]">
                  {year}{' '}
                  <span className="text-xl font-normal text-[#011627]">
                    ({postsByYear[year].length} posts)
                  </span>
                </h2>
                <ul className="space-y-4">
                  {postsByYear[year].map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/archive/${post.slug}`}
                        className="block post-border border-[#d47d6f] p-4 rounded hover:bg-[#d6f5ff] transition-colors duration-300"
                      >
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-sm text-[#011627]">{post.date}</p>
                        {post.description && (
                          <p className="mt-2 text-gray-700">{post.description}</p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-8">The Archives</h1>
              <p className="text-red-500">No blog posts found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
