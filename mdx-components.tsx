// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import React from 'react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrap your MDX content in a div with the `prose` class
    wrapper: ({ children }) => <div className="prose">{children}</div>,
    ...components,
  };
}
