import { format, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    getPostBySlug,
    getAllPosts,
    type MDXPost,
    type PostFrontMatter,
} from '@/lib/mdx';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const posts = await getAllPosts<PostFrontMatter>('posts');
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getPostBySlug<PostFrontMatter>(params.slug, 'posts');

    if (!post) return notFound();

    const { frontMatter } = post;
    const ogImage = frontMatter.imageUrl || '/og-default.png';

    return {
        title: frontMatter.title,
        description:
            frontMatter.description ||
            `Read ${frontMatter.title} - a blog post by Reese`,
        openGraph: {
            title: frontMatter.title,
            description: frontMatter.description,
            type: 'article',
            publishedTime: frontMatter.date,
            authors: ['Reese'],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: frontMatter.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: frontMatter.title,
            description: frontMatter.description,
            images: [ogImage],
        },
    };
}

export default async function PostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getPostBySlug<PostFrontMatter>(params.slug, 'posts');

    if (!post) return notFound();

    const { frontMatter, content, readingTime } = post;

    // Get next and previous posts
    const allPosts = await getAllPosts<PostFrontMatter>('posts');
    const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
    const prevPost =
        currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

    return (
        <article className='mx-auto max-w-xl py-8'>
            <div className='mb-8 text-center'>
                {frontMatter.imageUrl && (
                    <div className='relative w-full h-[12rem] mb-8 overflow-hidden rounded-2xl'>
                        <Image
                            src={frontMatter.imageUrl}
                            width={500}
                            height={250}
                            className='w-full h-full object-cover object-center'
                            alt={`Cover image for ${frontMatter.title}`}
                            priority
                        />
                    </div>
                )}

                <time
                    dateTime={frontMatter.date}
                    className='mb-1 text-xs text-gray-600 dark:text-gray-400'
                >
                    {format(parseISO(frontMatter.date), 'LLLL d, yyyy')}
                </time>
                <h1 className='text-3xl font-bold'>{frontMatter.title}</h1>
                <div className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                    {readingTime}
                </div>
                {frontMatter.tags && frontMatter.tags.length > 0 && (
                    <div className='mt-4 flex flex-wrap justify-center gap-2'>
                        {frontMatter.tags.map((tag) => (
                            <span
                                key={tag}
                                className='px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div
                className='prose dark:prose-invert prose-quoteless prose-neutral dark:prose-neutral max-w-none 
                           prose-h2:text-xl prose-h2:font-semibold
                           prose-h3:text-lg prose-h3:font-semibold
                           prose-p:text-gray-700 dark:prose-p:text-gray-300
                           prose-li:text-gray-700 dark:prose-li:text-gray-300
                           prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                           prose-img:rounded-lg prose-img:shadow-md
                           prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                           prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                           prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg
                           px-4 sm:px-0'
            >
                <MDXRemote source={content} />
            </div>

            <div className='mt-8 flex justify-between items-center'>
                {prevPost ? (
                    <Link
                        href={`/posts/${prevPost.slug}`}
                        className='flex items-center text-gray-400 dark:text-blue-400 hover:underline'
                    >
                        <span className='mr-2'>←</span>
                        <span>Previous Post</span>
                    </Link>
                ) : (
                    <div></div>
                )}
                {nextPost ? (
                    <Link
                        href={`/posts/${nextPost.slug}`}
                        className='flex items-center text-gray-400 dark:text-blue-400 hover:underline'
                    >
                        <span>Next Post</span>
                        <span className='ml-2'>→</span>
                    </Link>
                ) : (
                    <div></div>
                )}
            </div>
        </article>
    );
}
