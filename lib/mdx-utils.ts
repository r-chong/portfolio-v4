import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import { MDXRemoteProps } from 'next-mdx-remote/rsc';
// Add other plugins as needed

/**
 * Base plugins configuration
 */
const plugins = {
    remarkPlugins: [remarkGfm, remarkBreaks, remarkMath] as any[],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex] as any[],
    format: 'mdx' as const,
    development: process.env.NODE_ENV === 'development',
};

/**
 * Configuration for MDX processing with math support
 */

export const mdxOptions: MDXRemoteProps['options'] = {
    ...plugins,
    parseFrontmatter: true,
};
