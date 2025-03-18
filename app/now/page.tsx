import React from 'react';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import components from '@/components/mdx-components';

export const metadata: Metadata = {
    title: 'Now',
    description: 'Current state of mind.',
};

export default function NowPage() {
    // Read the MDX file
    const filePath = path.join(process.cwd(), 'content', 'now.mdx');
    const fileContents = readFileSync(filePath, 'utf8');

    // Parse the frontmatter
    const { content } = matter(fileContents);

    return (
        <article className='flex flex-col items-center w-full font-georgia'>
            <div className='container max-w-2xl px-4 mx-auto mt-8 sm:px-6 md:mt-12'>
                <div className='prose dark:prose-invert prose-quoteless prose-neutral'>
                    <MDXRemote source={content} components={components} />
                </div>
            </div>
        </article>
    );
}
