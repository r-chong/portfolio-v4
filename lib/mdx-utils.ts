import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { serialize } from 'next-mdx-remote/serialize';

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

/**
 * Preprocesses MDX content to escape LaTeX backslashes
 */
export function preprocessMDX(content: string): string {
    // Find all <math> and <inlinemath> tags and escape backslashes inside them
    const mathRegex = /(<(math|inlinemath)>)([\s\S]*?)(<\/(math|inlinemath)>)/g;

    return content.replace(
        mathRegex,
        (match, openTag, tagName, content, closeTag) => {
            // Escape backslashes in the content
            const escapedContent = content.replace(/\\/g, '\\\\');
            return openTag + escapedContent + closeTag;
        }
    );
}

/**
 * Serializes MDX content with math support
 */
export async function serializeMDX(content: string) {
    return serialize(content, {
        mdxOptions: {
            development: process.env.NODE_ENV === 'development',
        },
    });
}
