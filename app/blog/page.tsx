import type {
    Markdown,
    MDX,
    ImageFieldData,
    IsoDateTimeString,
} from 'contentlayer/core';
import { compareDesc, format, parseISO } from 'date-fns'; // date imports
import { allPosts, Post } from 'contentlayer/generated';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import { Route, StaticRoute } from 'nextjs-routes';

type PostLinkModified = {
    type: string;
    title: string;
    date: IsoDateTimeString;
    /** MDX file body */
    body: MDX;
    url: string;
};

function PostCard({ post }: { post: PostLinkModified }) {
    return (
        <Link
            href={post.url as LinkProps['href']}
            // Also works:
            // href={post.url as Route | StaticRoute<"/"> | Omit<Route, 'pathname'>}
            className='flex justify-between gap-4 p-2 pb-8 pt-6 border-b-2 hover:bg-gray-100 cursor-pointer'
        >
            <div className='mb-8'>
                <h2 className='mb-1 text-xl'>
                    <div className='text-gray-800 font-semibold hover:text-blue-900'>
                        {post.title}
                    </div>
                </h2>
                <time
                    dateTime={post.date}
                    className='mb-2 block text-xs text-gray-600'
                >
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
            </div>
            <Image
                src='/space.png'
                width={200}
                height={150}
                alt='test'
                className='rounded-xl'
            />
        </Link>
    );
}

export default function BlogHome() {
    const posts = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
    );

    return (
        <div className='mx-auto max-w-xl py-8'>
            <h1 className='mb-8 text-center text-2xl font-black'>
                Reese&apos;s Blog
            </h1>
            {posts.map((post, idx) => (
                <PostCard key={idx} post={post} />
            ))}
        </div>
    );
}
