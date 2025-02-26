// pages/archive/[slug].tsx
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import { getAllPosts, BlogPost } from '@/lib/getPosts';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import MDXContent from './MDXContent';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'

interface BlogPostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = params;
  const post = getAllPosts().find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postsDirectory = path.join(process.cwd(), 'content');
  
  // Define possible extensions
  const possibleExtensions: string[] = ['.mdx', '.md'];
  let filePath: string | null = null;

  // Search for the file with supported extensions
  for (const ext of possibleExtensions) {
    const potentialPath = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(potentialPath)) {
      filePath = potentialPath;
      break;
    }
  }

  if (!filePath) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data: frontMatter } = matter(fileContent);

  const mdxSource = await serialize(content, {
    scope: frontMatter,
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    },
  });

  return <MDXContent frontMatter={frontMatter} mdxSource={mdxSource} />;
}