// lib/getPosts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  description?: string;
}

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  const postsDirectory = path.join(process.cwd(), 'content');
  if (!fs.existsSync(postsDirectory)) return [];

  cachedPosts = fs.readdirSync(postsDirectory)
    .filter(file => /\.(md|mdx)$/.test(file))
    .map(file => {
      const slug = file.replace(/\.(md|mdx)$/, '');
      const { data } = matter(fs.readFileSync(path.join(postsDirectory, file), 'utf8'));
      
      const dateObj = new Date(data.date);
      const formattedDate = isNaN(dateObj.getTime())
        ? data.date || ''
        : dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

      return {
        title: data.title || slug,
        date: formattedDate,
        slug,
        description: data.description || '',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return cachedPosts;
}
