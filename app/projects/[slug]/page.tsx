// app/projects/[slug]/page.tsx
import { format, parseISO } from 'date-fns';
import { allProjectWriteups } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { ProjectCarousel } from './ProjectCarousel';
import { useMDXComponent } from 'next-contentlayer/hooks';
import LinkButton from '@/components/LinkButton';

// Debug logging to help identify the issue
console.log(
    'All project writeups:',
    allProjectWriteups.map((doc) => ({
        type: doc.type,
        path: doc._raw.flattenedPath,
    }))
);
console.log(
    'ProjectWriteup documents:',
    allProjectWriteups.map((doc) => ({ path: doc._raw.flattenedPath }))
);

// Key Fix: MDX file paths include 'projects/' prefix but URL slugs don't
// Example: File path is 'projects/hawkeye' but URL slug is just 'hawkeye'
// Solution: Append 'projects/' when finding posts by slug

// Key command to use in future
// console.log(
//     'allProjectWriteups',
//     allProjectWriteups
// ); // Check if this array has the expected data

// console.log(
//     'posta',
//     allProjectWriteups.filter((doc) => doc.type === 'ProjectWriteup')
// );

export const generateStaticParams = async () =>
    allProjectWriteups.map((doc) => ({
        slug: doc._raw.flattenedPath.replace('projects/', ''),
    }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allProjectWriteups.find(
        (post) => post._raw.flattenedPath === `projects/${params.slug}`
    );

    if (!post) return notFound();

    return { title: post.title };
};

const ProjectWriteupLayout = ({ params }: { params: { slug: string } }) => {
    const post = allProjectWriteups.find(
        (post) => post._raw.flattenedPath === `projects/${params.slug}`
    );

    if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

    // Parse the MDX file via the useMDXComponent hook.
    const MDXContent = useMDXComponent(post.body.code);

    return (
        <article className='flex flex-col items-center w-full'>
            <div className='container max-w-5xl mb-8 text-center px-4 sm:px-6'>
                <ProjectCarousel post={post} />
                <h1 className='text-3xl font-bold'>{post.title}</h1>
                <time
                    dateTime={post.date}
                    className='mb-4 text-xs text-gray-600 dark:text-gray-400'
                >
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
            </div>
            <div
                className='prose dark:prose-invert prose-quoteless prose-neutral dark:prose-neutral max-w-xl w-full
                           prose-h2:text-xl prose-h2:font-semibold
                           prose-h3:text-lg prose-h3:font-semibold
                           prose-p:text-gray-700 dark:prose-p:text-gray-300
                           prose-li:text-gray-700 dark:prose-li:text-gray-300
                           prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                           prose-img:rounded-lg prose-img:shadow-md
                           prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                           prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                           prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg
                           px-4 sm:px-0 mx-auto'
            >
                {post.projectLink ? (
                    <LinkButton href={post.projectLink}>
                        Project Link
                    </LinkButton>
                ) : (
                    <></>
                )}
                <MDXContent />
            </div>
        </article>
    );
};

export default ProjectWriteupLayout;
