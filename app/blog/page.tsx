'use client';

import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// export const metadata = {
//     title: 'Blog',
//     description: 'A series of blog posts.',
// };

function PostCard({ post }: { post: Post }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='group'
        >
            <Link
                href={`/posts/${post._raw.flattenedPath.replace('posts/', '')}`}
                className='flex justify-between gap-4 p-4 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300'
            >
                <div className='space-y-2'>
                    <h2 className='text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
                        {post.title}
                    </h2>
                    <time className='text-sm text-gray-600 dark:text-gray-400'>
                        {format(parseISO(post.date), 'LLLL d, yyyy')}
                    </time>
                    {post.description && (
                        <p className='text-gray-600 dark:text-gray-400 line-clamp-2'>
                            {post.description}
                        </p>
                    )}
                    {post.tags && (
                        <div className='flex flex-wrap gap-2 pt-2'>
                            {post.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className='px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                {post.imageUrl && (
                    <div className='relative hidden sm:block flex-shrink-0'>
                        <Image
                            src={post.imageUrl}
                            alt={`Cover image for ${post.title}`}
                            width={160}
                            height={120}
                            className='rounded-lg object-cover transition-transform duration-300'
                        />
                    </div>
                )}
            </Link>
        </motion.div>
    );
}

export default function BlogPage() {
    const posts = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
    );

    return (
        <div className='mx-auto max-w-4xl px-6 py-12'>
            <div className='space-y-8'>
                <div className='space-y-4'>
                    <h1 className='text-3xl font-bold text-center dark:text-gray-100'>
                        Blog
                    </h1>
                    <p className='text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto'>
                        Some thoughts of mine.
                    </p>
                </div>
                <div className='space-y-4'>
                    {posts.map((post, idx) => (
                        <PostCard key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
