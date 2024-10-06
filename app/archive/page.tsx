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
        <h1 className="text-8xl m:text-9xl font-bold text-center my-12 relative">
          <span className="absolute inset-0 text-[#d47d6f] z-10">archive</span>
          <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #8b4c45' }}>archive</span>
        </h1>
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-[#d47d6f] text-sm hover:text-[#c26a5c] cursor-pointer transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {years.map((year) => (
            <div key={year} className="mb-12">
              <h2 className="text-3xl font-bold mb-4 pb-2 border-b border-[#d47d6f]">
                {year} <span className="text-xl font-normal text-[#a25a4e]">({postsByYear[year].length} posts)</span>
              </h2>
              <ul className="space-y-4">
                {postsByYear[year].map((post) => (
                  <li key={post.slug}>
                    <Link href={`/archive/${post.slug}`} className="block border border-[#000000] border-4 p-4 rounded hover:bg-[#ffd6cc] transition-colors duration-300">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <p className="text-sm text-[#000000]">{post.date}</p>
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