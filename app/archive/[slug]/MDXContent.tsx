'use client';

import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '@/mdx-components';
// import 'katex/dist/katex.min.css';

interface MDXContentProps {
  frontMatter: any;
  mdxSource: MDXRemoteSerializeResult;
}

export default function MDXContent({ frontMatter, mdxSource }: MDXContentProps) {
  const components = useMDXComponents({});
  console.log('useMDXComponents:', useMDXComponents);

  return (
    <article className="prose custom-prose mx-auto p-6">
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}