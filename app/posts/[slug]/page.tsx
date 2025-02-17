import { format, parseISO, compareDesc } from 'date-fns';
import { allPosts, allDocuments, isType } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

export const generateStaticParams = async () =>
    allDocuments
        .filter((doc) => doc.type === 'Post')
        .map((doc) => ({
            slug: doc._raw.flattenedPath.replace('posts/', ''),
        }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allDocuments
        .filter(isType(['Post']))
        .find((post) => post._raw.flattenedPath === `posts/${params.slug}`);

    if (!post) return notFound();
    return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
    const post = allDocuments.find(
        (doc) =>
            doc.type === 'Post' &&
            doc._raw.flattenedPath === `posts/${params.slug}`
    );

    if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

    // Sort all posts by date
    const sortedPosts = allDocuments
        .filter((doc) => doc.type === 'Post')
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    // Find current post index
    const currentIndex = sortedPosts.findIndex(
        (p) => p._raw.flattenedPath === `posts/${params.slug}`
    );

    // Get next and previous posts
    const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
    const prevPost =
        currentIndex < sortedPosts.length - 1
            ? sortedPosts[currentIndex + 1]
            : null;

    const MDXContent = useMDXComponent(post.body.code);

    return (
        <article className='mx-auto max-w-xl py-8'>
            <div className='mb-8 text-center'>
                <div className='relative w-full h-[12rem] mb-8 overflow-hidden rounded-2xl'>
                    {/* TODO: add CDN */}
                    {post.imageUrl && (
                        <Image
                            src={post.imageUrl}
                            width={500}
                            height={250}
                            className='w-full h-full object-cover object-center'
                            alt={`Cover image for ${post.title}`}
                            unoptimized
                        />
                    )}
                </div>

                <time
                    dateTime={post.date}
                    className='mb-1 text-xs text-gray-600 dark:text-gray-400'
                >
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
                <h1 className='text-3xl font-bold'>{post.title}</h1>
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
                <MDXContent />
            </div>

            <div className='mt-8 flex justify-between items-center'>
                {prevPost ? (
                    <Link
                        href={
                            `/posts/${prevPost._raw.flattenedPath.replace(
                                'posts/',
                                ''
                            )}` as LinkProps['href']
                        }
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
                        href={
                            `/posts/${nextPost._raw.flattenedPath.replace(
                                'posts/',
                                ''
                            )}` as LinkProps['href']
                        }
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
};

export default PostLayout;
