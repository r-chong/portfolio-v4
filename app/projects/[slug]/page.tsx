// app/projects/[slug]/page.tsx
import { format, parseISO } from 'date-fns';
import { allDocuments, isType } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ProjectWriteup } from '@/contentlayer.config';

// Key Fix: MDX file paths include 'projects/' prefix but URL slugs don't
// Example: File path is 'projects/hawkeye' but URL slug is just 'hawkeye'
// Solution: Append 'projects/' when finding posts by slug

// Key command to use in future
// console.log(
//     'allProjectWriteups',
//     allDocuments.filter(isType(['ProjectWriteup']))
// ); // Check if this array has the expected data

// console.log(
//     'posta',
//     allDocuments.filter((doc) => doc.type === 'ProjectWriteup')
// );

export const generateStaticParams = async () =>
    allDocuments
        .filter((doc) => doc.type === 'ProjectWriteup')
        .map((doc) => ({
            slug: doc._raw.flattenedPath.replace('projects/', ''),
        }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allDocuments
        .filter(isType(['ProjectWriteup']))
        .find((post) => post._raw.flattenedPath === `projects/${params.slug}`);

    if (!post) return notFound();

    return { title: post.title };
};

const ProjectWriteupLayout = ({ params }: { params: { slug: string } }) => {
    const post = allDocuments.find(
        (doc) =>
            doc.type === 'ProjectWriteup' &&
            doc._raw.flattenedPath === `projects/${params.slug}`
    );

    if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

    // Parse the MDX file via the useMDXComponent hook.
    const MDXContent = useMDXComponent(post.body.code);

    return (
        <article className='flex flex-col items-center'>
            <div className='mb-8 text-center pointer-events-none select-none'>
                <div className='relative w-full mb-8 overflow-hidden'>
                    <Image
                        src={post.imageUrl}
                        width={1080}
                        height={720}
                        className='object-cover object-center rounded-xl shadow-md'
                        alt={`Image for ${post.title}`}
                        unoptimized
                    />
                </div>

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

export default ProjectWriteupLayout;
