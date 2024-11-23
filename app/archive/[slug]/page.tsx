import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import slugify from 'slugify';
import MDXContent from './MDXContent';

interface BlogPostProps {
  params: { slug: string };
}

// Generate static paths for each post
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((filename) => /\.(md|mdx)$/.test(filename))
    .map((filename) => {
      const slug = slugify(filename.replace(/\.mdx?$/, ''), {
        lower: true,
        strict: true,
      });
      return { slug };
    });
}

export default async function BlogPost({ params }: BlogPostProps) {
  const slug = slugify(params.slug, { lower: true, strict: true });

  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = fs
    .readdirSync(postsDirectory)
    .filter((filename) => /\.(md|mdx)$/.test(filename));
  console.log(filenames);

  // Find the filename that matches the slug
  let matchedFilename: string | null = null;
  for (const filename of filenames) {
    const filenameSlug = slugify(filename.replace(/\.mdx?$/, ''), {
      lower: true,
      strict: true,
    });
    console.log('filenameSlug === slug ', filenameSlug, ' === ', slug);
    if (filenameSlug === slug) {
      matchedFilename = filename;
      break;
    }
  }

  if (!matchedFilename) {
    console.error(`No matching file found for slug: ${slug}`);
    notFound();
  }

  const filePath = path.join(postsDirectory, matchedFilename);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const { data: frontMatter, content } = matter(fileContent);

  let mdxSource: MDXRemoteSerializeResult;
  try {
    mdxSource = await serialize(content, {
      scope: frontMatter,
      parseFrontmatter: true,
    });
  } catch (error) {
    console.error('MDX Serialization Error:', error);
    throw error;
  }

  return (
    <MDXContent frontMatter={frontMatter} mdxSource={mdxSource} />
  );
}
