// app/archive/page.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface BlogPost {
  title: string;
  date: string;
  slug: string;
  description: string;
}

export default function ArchivePage() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(postsDirectory);

  const posts: BlogPost[] = filenames
    .filter((filename) => /\.(md|mdx)$/.test(filename))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, '');
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContent);

      return {
        title: frontMatter.title || slug,
        date: frontMatter.date || '',
        slug,
        description: frontMatter.description || '',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Archive</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border border-[#d47d6f] p-4 rounded hover:bg-[#ffd6cc] transition-colors duration-300">
            <Link href={`/archive/${post.slug}`} className="block">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-sm text-[#a25a4e]">{post.date}</p>
              <p className="mt-2 text-[#8b4c45]">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
