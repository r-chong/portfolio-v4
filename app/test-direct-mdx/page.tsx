import { MDXRemote } from 'next-mdx-remote/rsc';
import components from '@/components/mdx-components';

export default async function TestDirectMDXPage() {
    // Simple MDX content
    const mdxContent = `
# This is a test heading

This is a paragraph of text.

- List item 1
- List item 2
- List item 3

## Another heading

This is another paragraph with **bold text** and *italic text*.

[This is a link](https://example.com)
`;

    return (
        <div className='p-8 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>
                Test Direct MDX Rendering
            </h1>

            <div className='prose dark:prose-invert max-w-none'>
                <MDXRemote source={mdxContent} components={components} />
            </div>
        </div>
    );
}
