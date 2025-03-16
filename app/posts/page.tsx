import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import type { MDXPost } from '@/lib/mdx';

export const metadata: Metadata = {
    title: 'Blog Posts',
    description: 'Read my thoughts on software development, design, and more.',
};

export default async function PostsPage() {
    const posts = await getAllPosts<MDXPost['frontMatter']>('posts');

    return (
        <div className='max-w-4xl mx-auto py-12'>
            <h1 className='text-3xl font-bold mb-8'>Blog Posts</h1>
            <div className='space-y-8'>
                {posts.map((post) => (
                    <article key={post.slug} className='group'>
                        <Link href={`/posts/${post.slug}`}>
                            <div className='space-y-2'>
                                <h2 className='text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                                    {post.frontMatter.title}
                                </h2>
                                {post.frontMatter.description && (
                                    <p className='text-gray-600 dark:text-gray-400'>
                                        {post.frontMatter.description}
                                    </p>
                                )}
                                <div className='flex gap-4 text-sm text-gray-600 dark:text-gray-400'>
                                    <time dateTime={post.frontMatter.date}>
                                        {new Date(
                                            post.frontMatter.date
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                    <span>{post.readingTime}</span>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
