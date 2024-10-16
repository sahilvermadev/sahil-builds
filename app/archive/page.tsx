import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Bungee_Shade } from '@next/font/google';

const bungeeShade = Bungee_Shade({ weight: "400", subsets: ["latin"] });


interface BlogPost {
  title: string;
  date: string;
  slug: string;
  description: string;
}

interface PostsByYear {
  [year: string]: BlogPost[];
}

export default function ArchivePage() {
  const postsDirectory = path.join(process.cwd(), "content");

  if (!fs.existsSync(postsDirectory)) {
    return (
      <div className="min-h-screen text-[#8b4c45] relative">
        <h1 className="text-5xl font-bold mb-8 text-center">The Archives</h1>
        <p className="text-red-500">No blog posts found.</p>
      </div>
    );
  }

  const filenames = fs.readdirSync(postsDirectory);

  const posts: BlogPost[] = filenames
    .filter((filename) => /\.(md|mdx)$/.test(filename))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data: frontMatter } = matter(fileContent);

      let formattedDate = "";
      if (frontMatter.date) {
        const dateObj = new Date(frontMatter.date);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        } else {
          formattedDate = String(frontMatter.date);
        }
      }

      return {
        title: frontMatter.title || slug,
        date: formattedDate || "",
        slug,
        description: frontMatter.description || "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const postsByYear: PostsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as PostsByYear);

  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  const tags = [
    "css", "WordPress", "a11y", "animation", "blogging", "browsers", "code", "comic",
    "community", "davegoeswindows", "design systems", "futurism", "gamedev", "gunpla",
    "hotdrama", "jekyll", "oldgold", "podcasts", "process", "productivity", "prototyping",
    "rails", "review", "ruby", "rwd", "sci-fi", "songcatching", "talks", "tech", "tools",
    "vibecheck", "webcomponents", "webperf",
  ];

  const totalPosts = posts.length;

  return (
    <div className="min-h-screen text-[#011627] relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
      <h1 className={`${bungeeShade.className} text-3xl sm:text-6xl font-bold text-center my-12 relative`}>
          <span className="absolute inset-0 text-[#011627] z-10">archive</span>
          <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #011627' }}>archive</span>
        </h1>
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-[#b6244f] text-sm hover:text-[#011627] cursor-pointer transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {years.map((year) => (
            <div key={year} className="mb-12">
              <h2 className="text-3xl font-bold mb-4 pb-2 border-b border-[#011627]">
                {year} <span className="text-xl font-normal text-[#011627]">({postsByYear[year].length} posts)</span>
              </h2>
              <ul className="space-y-4">
                {postsByYear[year].map((post) => (
                  <li key={post.slug}>
                    <Link href={`/archive/${post.slug}`} className="block post-border border-[#d47d6f] p-4 rounded hover:bg-[#d6f5ff] transition-colors duration-300">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <p className="text-sm text-[#011627]">{post.date}</p>
                      {post.description && <p className="mt-2">{post.description}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}