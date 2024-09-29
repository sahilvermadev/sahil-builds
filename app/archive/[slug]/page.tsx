// app/archive/[slug]/page.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../../mdx-components';

interface BlogPostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((filename) => /\.(md|mdx)$/.test(filename))
    .map((filename) => ({
      slug: filename.replace(/\.mdx?$/, ''),
    }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontMatter, content } = matter(fileContent);
  const mdxSource = await serialize(content, { scope: frontMatter });

  const components = useMDXComponents({});

  return (
    <article className="prose mx-auto p-6">
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}
