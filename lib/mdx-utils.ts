import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
// Add other plugins as needed

import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type { Pluggable } from 'unified';

const plugins = {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeKatex as Pluggable,
    ],
};

export const mdxOptions: MDXRemoteProps['options'] = {
    ...plugins,
    parseFrontmatter: true,
};
