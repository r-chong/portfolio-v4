import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
// Add other plugins as needed

/**
 * Configuration for MDX processing with math support
 */
export const mdxOptions = {
    mdxOptions: {
        remarkPlugins: [remarkMath] as any[],
        rehypePlugins: [rehypeKatex] as any[],
        format: 'mdx' as const,
        development: process.env.NODE_ENV === 'development',
    },
} as const;

export const mdxOptions: MDXRemoteProps['options'] = {
    ...plugins,
    parseFrontmatter: true,
};
