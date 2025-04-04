import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import type { MDXPost, PostFrontMatter } from '@/lib/mdx';
import components from '@/components/mdx-components';
import { mdxOptions } from '@/lib/mdx-utils';

interface PostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts<PostFrontMatter>('posts');
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    try {
        const post = await getPostBySlug<MDXPost['frontMatter']>(
            params.slug,
            'posts'
        );

        return {
            title: post.frontMatter.title,
            description: post.frontMatter.description,
            openGraph: {
                title: post.frontMatter.title,
                description: post.frontMatter.description,
                type: 'article',
                publishedTime: post.frontMatter.date,
                authors: ['Your Name'],
                images: post.frontMatter.imageUrl
                    ? [post.frontMatter.imageUrl]
                    : [],
            },
            twitter: {
                card: 'summary_large_image',
                title: post.frontMatter.title,
                description: post.frontMatter.description,
                images: post.frontMatter.imageUrl
                    ? [post.frontMatter.imageUrl]
                    : [],
            },
        };
    } catch (error) {
        return {
            title: 'Post Not Found',
            description: 'The requested post could not be found.',
        };
    }
}

export default async function PostPage({ params }: PostPageProps) {
    try {
        console.log(`Attempting to fetch post with slug: ${params.slug}`);
        const post = await getPostBySlug<MDXPost['frontMatter']>(
            params.slug,
            'posts'
        );
        console.log(`Successfully fetched post: ${post.frontMatter.title}`);
        console.log('Content length:', post.content.length);

        return (
            <article className='prose prose-center dark:prose-invert max-w-none px-4 sm:px-6'>
                <div className='mb-8 text-center'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold font-source-sans-pro mb-4'>
                        {post.frontMatter.title}
                    </h1>
                    <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 font-source-sans-pro'>
                        <time dateTime={post.frontMatter.date}>
                            {new Date(post.frontMatter.date).toLocaleDateString(
                                'en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </time>
                        <span>{post.readingTime}</span>
                    </div>
                </div>
                <div className='mdx-content text-base sm:text-lg'>
                    <MDXRemote
                        source={post.content}
                        components={components}
                        options={mdxOptions}
                    />
                </div>
            </article>
        );
    } catch (error) {
        console.error(
            `Error rendering post page for slug ${params.slug}:`,
            error
        );
        notFound();
    }
}
