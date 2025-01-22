import React from 'react';
import siteMetadata from '@/data/siteMetadata';
import Link, { LinkProps } from 'next/link';
import type { Route } from 'next';
import { Post } from 'contentlayer/generated';

interface ExtendedPost extends Post {
    slug: string;
}
import {
    sortPosts,
    coreContent,
} from '@/node_modules/pliny/utils/contentlayer';
import { formatDate } from '@/node_modules/pliny/utils/formatDate';

const MAX_DISPLAY = 5;

interface BlogPageProps {
    posts: ExtendedPost[];
}

interface MainProps {
    posts: {
        title: string;
        date: string;
        path: Route;
    }[];
}

export function BlogPage({ posts }: BlogPageProps) {
    const sortedPosts = sortPosts(posts);
    const processedPosts = sortedPosts.map((post) => {
        const slug = post.slug;
        const path = `/posts/${slug.replace('posts/', '')}`;
        const content = coreContent(post);
        return {
            title: content.title,
            date: content.date,
            path,
        };
    });
    return <Main posts={processedPosts} />;
}

export default function Main({ posts }: MainProps) {
    return (
        <>
            <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
                    <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
                        Latest
                    </h1>
                    <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
                        {siteMetadata.description}
                    </p>
                </div>
                <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                    {!posts.length && 'No posts found.'}
                    {posts.slice(0, MAX_DISPLAY).map((post) => {
                        const { path, date, title } = post;
                        return (
                            <li key={path} className='py-12'>
                                <article>
                                    <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                                        <dl>
                                            <dt className='sr-only'>
                                                Published on
                                            </dt>
                                            <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                                                <time dateTime={date}>
                                                    {formatDate(
                                                        date,
                                                        siteMetadata.locale
                                                    )}
                                                </time>
                                            </dd>
                                        </dl>
                                        <div className='space-y-5 xl:col-span-3'>
                                            <div className='space-y-6'>
                                                <div>
                                                    <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                                                        <Link
                                                            href={
                                                                path as LinkProps['href']
                                                            }
                                                            className='text-gray-900 dark:text-gray-100'
                                                        >
                                                            {title}
                                                        </Link>
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className='text-base font-medium leading-6'>
                                                <Link
                                                    href={
                                                        path as LinkProps['href']
                                                    }
                                                    className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                                                    aria-label={`Read more: "${title}"`}
                                                >
                                                    Read more &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {posts.length > MAX_DISPLAY && (
                <div className='flex justify-end text-base font-medium leading-6'>
                    <Link
                        href={'/blog' as LinkProps['href']}
                        className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                        aria-label='All posts'
                    >
                        All Posts &rarr;
                    </Link>
                </div>
            )}
        </>
    );
}
