import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function TestMDXPage() {
    // Read a sample MDX file directly
    const filePath = path.join(process.cwd(), 'content/posts/ai.mdx');
    const source = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter and content
    const { data, content } = matter(source);

    // Serialize MDX content
    const mdxSource = await serialize(content, {
        parseFrontmatter: true,
        mdxOptions: {
            development: process.env.NODE_ENV === 'development',
        },
    });

    return (
        <div className='p-8 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>Test MDX Rendering</h1>

            <div className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>Frontmatter</h2>
                <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto'>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>

            <div className='prose dark:prose-invert max-w-none'>
                <h2 className='text-2xl font-semibold mb-4'>Content</h2>
                <MDXRemote {...mdxSource} />
            </div>
        </div>
    );
}
