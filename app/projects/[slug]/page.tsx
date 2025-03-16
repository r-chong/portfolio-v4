// app/projects/[slug]/page.tsx
import { format, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { ProjectCarousel } from './ProjectCarousel';
import LinkButton from '@/components/LinkButton';
import {
    getPostBySlug,
    getAllPosts,
    type MDXProject,
    type ProjectFrontMatter,
} from '@/lib/mdx';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const projects = await getAllPosts<ProjectFrontMatter>('projects');
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const project = await getPostBySlug<ProjectFrontMatter>(
        params.slug,
        'projects'
    );

    if (!project) return notFound();

    const { frontMatter } = project;
    const ogImage =
        frontMatter.imageUrl || frontMatter.images?.[0] || '/og-default.png';

    return {
        title: frontMatter.title,
        description:
            frontMatter.description ||
            `${frontMatter.title} - A project by Reese`,
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

export default async function ProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const project = await getPostBySlug<ProjectFrontMatter>(
        params.slug,
        'projects'
    );

    if (!project) return notFound();

    const { frontMatter, content } = project;

    return (
        <article className='flex flex-col items-center w-full'>
            <div className='container max-w-5xl mb-8 text-center px-4 sm:px-6'>
                <ProjectCarousel post={frontMatter} />
                <h1 className='text-3xl font-bold'>{frontMatter.title}</h1>
                <time
                    dateTime={frontMatter.date}
                    className='mb-4 text-xs text-gray-600 dark:text-gray-400'
                >
                    {format(parseISO(frontMatter.date), 'LLLL d, yyyy')}
                </time>
                {frontMatter.stack && frontMatter.stack.length > 0 && (
                    <div className='mt-4 flex flex-wrap justify-center gap-2'>
                        {frontMatter.stack.map((tech) => (
                            <span
                                key={tech}
                                className='px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md'
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
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
                {frontMatter.projectLink && (
                    <LinkButton href={frontMatter.projectLink}>
                        Project Link
                    </LinkButton>
                )}
                <MDXRemote source={content} />
            </div>
        </article>
    );
}
