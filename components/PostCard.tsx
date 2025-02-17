'use client';

import { Post } from 'contentlayer/generated';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useCompactMode } from '@/lib/CompactModeContext';

interface PostCardProps {
    post: Post;
    onTagClick?: (tag: string) => void;
}

export default function PostCard({ post, onTagClick }: PostCardProps) {
    const { isCompact } = useCompactMode();

    if (isCompact) {
        return (
            <div className='flex items-center gap-3 py-1'>
                <Link
                    href={
                        `/posts/${post._raw.flattenedPath.replace(
                            'posts/',
                            ''
                        )}` as LinkProps['href']
                    }
                    className='text-blue-600 font-bold underline dark:text-blue-400 hover:underline'
                >
                    {post.title}
                </Link>
                <time className='text-sm text-gray-400 dark:text-gray-400'>
                    {format(parseISO(post.date), 'MMMM d, yyyy')}
                </time>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='group'
        >
            <Link
                href={
                    `/posts/${post._raw.flattenedPath.replace(
                        'posts/',
                        ''
                    )}` as LinkProps['href']
                }
                className='flex justify-between gap-4 p-4 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300'
            >
                <div className='space-y-2 flex-grow'>
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
                    {post.tags && post.tags.length > 0 && (
                        <div
                            className='flex flex-wrap gap-2 pt-2'
                            onClick={(e) => e.preventDefault()}
                        >
                            {/* {post.tags.map((tag, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onTagClick?.(tag);
                                    }}
                                    className='px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all'
                                >
                                    #{tag}
                                </button>
                            ))} */}
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
