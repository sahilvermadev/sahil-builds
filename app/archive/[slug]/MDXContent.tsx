'use client';

import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '../../../mdx-components';

interface MDXContentProps {
  frontMatter: any;
  mdxSource: MDXRemoteSerializeResult;
}

export default function MDXContent({ frontMatter, mdxSource }: MDXContentProps) {
  const components = useMDXComponents({});

  return (
    <article className="prose mx-auto p-6">
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}
