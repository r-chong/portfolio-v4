// app/posts/[slug]/page.tsx
import { format, parseISO } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () =>
    allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find(
        (post) => post._raw.flattenedPath === params.slug
    );
    if (!post) return notFound();

    return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find(
        (post) => post._raw.flattenedPath === params.slug
    );
    if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

    // Parse the MDX file via the useMDXComponent hook.
    const MDXContent = useMDXComponent(post.body.code);

    return (
        <article className='mx-auto max-w-xl py-8'>
            <div className='mb-8 text-center'>
                <time
                    dateTime={post.date}
                    className='mb-1 text-xs text-gray-600'
                >
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
                <h1 className='text-3xl font-bold'>{post.title}</h1>
            </div>
            <div className='prose'>
                <MDXContent />
            </div>
        </article>
    );
};

export default PostLayout;
