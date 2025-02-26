import type { MDXComponents } from 'mdx/types';
import React from 'react';

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    // Define a default wrapper for MDX content
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <div className="prose">{children}</div>
    ),
    ...components, // Merge user-provided components
  };
}
