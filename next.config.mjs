// next.config.mjs
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include md and mdx files
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Image configuration
  images: {
    domains: ['example.com', 'another-domain.com'], // Add your external image domains here
  },
};

const withMDX = createMDX({
  // Add any MDX-specific options here
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
